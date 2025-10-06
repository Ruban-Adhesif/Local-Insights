import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Heart, MapPin, Clock, Euro } from 'lucide-react';
import type { Event } from '../../types';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
  onToggleWishlist?: (eventId: string) => void;
  wishlist?: string[];
  selectedEvent?: Event | null;
}

function MapEvents({ events, onEventClick, onToggleWishlist, wishlist = [], selectedEvent }: {
  events: Event[];
  onEventClick?: (event: Event) => void;
  onToggleWishlist?: (eventId: string) => void;
  wishlist?: string[];
  selectedEvent?: Event | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedEvent) {
      map.setView([selectedEvent.location.lat, selectedEvent.location.lng], 15);
    }
  }, [selectedEvent, map]);

  return (
    <>
      {events.map((event) => {
        const isInWishlist = wishlist.includes(event.id);
        const isSelected = selectedEvent?.id === event.id;
        
        const formatPrice = () => {
          if (event.price.min === 0 && event.price.max === 0) {
            return 'Gratuit';
          }
          if (event.price.min === event.price.max) {
            return `${event.price.min}€`;
          }
          return `${event.price.min}-${event.price.max}€`;
        };

        const formatDate = () => {
          const date = new Date(event.date);
          return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
          });
        };

        return (
          <Marker
            key={event.id}
            position={[event.location.lat, event.location.lng]}
            eventHandlers={{
              click: () => onEventClick?.(event),
            }}
          >
            <Popup className="custom-popup">
              <div className="w-64">
                <div className="relative mb-3">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist?.(event.id);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
                      isInWishlist
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                  </button>
                  <Badge 
                    variant="primary" 
                    className="absolute bottom-2 left-2"
                  >
                    {event.category}
                  </Badge>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="space-y-1 mb-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDate()} à {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{event.location.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Euro className="w-3 h-3 mr-1" />
                    {formatPrice()}
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  size="sm"
                  className="w-full"
                  onClick={() => onEventClick?.(event)}
                >
                  Voir les détails
                </Button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export function InteractiveMap({ 
  events, 
  onEventClick, 
  onToggleWishlist, 
  wishlist = [], 
  selectedEvent 
}: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <Card className="h-96 flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </Card>
    );
  }

  // Centre de Paris
  const center: [number, number] = [48.8566, 2.3522];

  return (
    <div className="h-96 w-full rounded-xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents
          events={events}
          onEventClick={onEventClick}
          onToggleWishlist={onToggleWishlist}
          wishlist={wishlist}
          selectedEvent={selectedEvent}
        />
      </MapContainer>
    </div>
  );
}
