import { useState } from 'react';
import { MapPin, Filter, Search, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { InteractiveMap } from '../ui/InteractiveMap';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { mockEvents } from '../../data/mockData';
import type { Event } from '../../types';

export function Map() {
  const { state, dispatch } = useApp();
  const { t } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const categories = [t('discover.all'), t('discover.music'), t('discover.art'), t('discover.food'), t('discover.literature'), t('discover.history')];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === t('discover.all') || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleWishlist = (eventId: string) => {
    if (state.wishlist.includes(eventId)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: eventId });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: eventId });
    }
  };

  const formatPrice = (event: typeof mockEvents[0]) => {
    if (event.price.min === 0 && event.price.max === 0) {
      return 'Free';
    }
    if (event.price.min === event.price.max) {
      return `${event.price.min}€`;
    }
    return `${event.price.min}-${event.price.max}€`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short'
    });
  };

  const openGoogleMaps = (event: typeof mockEvents[0]) => {
    const query = encodeURIComponent(`${event.location.name}, ${event.location.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            {t('map.title')}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {t('map.subtitle')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  placeholder="Search for an event..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 sm:pl-10 text-sm sm:text-base"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-sm sm:text-base"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Map and events list */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Interactive Map */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="p-0 overflow-hidden">
              <InteractiveMap
                events={filteredEvents}
                onEventClick={setSelectedEvent}
                onToggleWishlist={toggleWishlist}
                wishlist={state.wishlist}
                selectedEvent={selectedEvent}
              />
            </Card>
          </div>

          {/* Events list */}
          <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Events ({filteredEvents.length})
            </h3>
            
            {filteredEvents.length === 0 ? (
              <Card className="text-center py-6 sm:py-8">
                <p className="text-gray-500 text-sm sm:text-base">
                  No events found for your search.
                </p>
              </Card>
            ) : (
              <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="p-3 sm:p-4">
                    <div className="flex space-x-2 sm:space-x-3">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-xs sm:text-sm line-clamp-2 mb-1">
                          {event.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mb-1.5 sm:mb-2">
                          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                          <span className="truncate">{event.location.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <Badge variant="primary" size="sm">
                              {event.category}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {formatDate(event.date)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-medium text-gray-900">
                              {formatPrice(event)}
                            </span>
                            <button
                              onClick={() => toggleWishlist(event.id)}
                              className={`p-0.5 sm:p-1 rounded transition-colors ${
                                state.wishlist.includes(event.id)
                                  ? 'text-red-500'
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                                state.wishlist.includes(event.id) ? 'fill-current' : ''
                              }`} />
                            </button>
                          </div>
                        </div>
                        <div className="flex space-x-1.5 sm:space-x-2 mt-1.5 sm:mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 text-xs"
                            onClick={() => window.location.href = `/event/${event.id}`}
                          >
                            Details
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-xs"
                            onClick={() => openGoogleMaps(event)}
                          >
                            <MapPin className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map clusters info */}
        <Card className="mt-6 sm:mt-8">
          <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
            Cultural Activity Zones
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="text-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full mx-auto mb-1.5 sm:mb-2"></div>
              <div className="text-xs sm:text-sm font-medium text-gray-900">Belleville</div>
              <div className="text-xs text-gray-500">Street Art & Galleries</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-accent-500 rounded-full mx-auto mb-1.5 sm:mb-2"></div>
              <div className="text-xs sm:text-sm font-medium text-gray-900">Marais</div>
              <div className="text-xs text-gray-500">Music & Cafés</div>
            </div>
            <div className="text-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-secondary-500 rounded-full mx-auto mb-1.5 sm:mb-2"></div>
              <div className="text-xs sm:text-sm font-medium text-gray-900">Latin Quarter</div>
              <div className="text-xs text-gray-500">Literature & History</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
