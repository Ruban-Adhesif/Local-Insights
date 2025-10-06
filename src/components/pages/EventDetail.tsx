import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Clock, Euro, Star, Users, Calendar, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useApp } from '../../contexts/AppContext';
import { mockEvents } from '../../data/mockData';

export function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Event not found
          </h2>
          <p className="text-gray-600 mb-6">
            The event you are looking for does not exist or has been deleted.
          </p>
          <Button onClick={() => navigate('/discover')}>
            Back to discovery
          </Button>
        </Card>
      </div>
    );
  }

  const isInWishlist = state.wishlist.includes(event.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: event.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: event.id });
    }
  };

  const formatPrice = () => {
    if (event.price.min === 0 && event.price.max === 0) {
      return 'Free';
    }
    if (event.price.min === event.price.max) {
      return `${event.price.min}€`;
    }
    return `${event.price.min}-${event.price.max}€`;
  };

  const formatDate = () => {
    const date = new Date(event.date);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const generateGoogleMapsLink = () => {
    const query = encodeURIComponent(`${event.location.name}, ${event.location.address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  const generateCalendarLink = () => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // +2h
    
    const formatDateForCalendar = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const details = encodeURIComponent(`${event.description}\n\nLocation: ${event.location.name}\nAddress: ${event.location.address}`);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=${details}&location=${encodeURIComponent(event.location.address)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/discover')}
          className="mb-6"
        >
          ← Back to discovery
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event image */}
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="primary">
                  {event.category}
                </Badge>
              </div>
              <button
                onClick={toggleWishlist}
                className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
                  isInWishlist
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart className={`w-6 h-6 ${
                  isInWishlist ? 'fill-current' : ''
                }`} />
              </button>
            </div>

            {/* Event info */}
            <Card>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <span className="font-medium">{formatDate()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3" />
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium">{event.location.name}</div>
                    <div className="text-sm">{event.location.address}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Euro className="w-5 h-5 mr-3" />
                  <span className="font-medium">{formatPrice()}</span>
                </div>
                {event.capacity && (
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-3" />
                    <span className="font-medium">Capacity: {event.capacity} people</span>
                  </div>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {event.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Accessibility */}
              {event.accessibility.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Accessibility</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.accessibility.map((access) => (
                      <Badge key={access} variant="accent">
                        {access.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {event.reviews && event.reviews.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Reviews</h3>
                  <div className="space-y-4">
                    {event.reviews.map((review) => (
                      <div key={review.id} className="border-l-4 border-primary-500 pl-4">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-medium text-gray-900">
                            {review.userName}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-US')}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => window.open(generateGoogleMapsLink(), '_blank')}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on map
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(generateCalendarLink(), '_blank')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to calendar
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: event.title,
                        text: event.description,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      // TODO: Show toast notification
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </Card>

            {/* Organizer */}
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Organizer</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">
                    {event.organizer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {event.organizer.name}
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {event.organizer.type}
                  </div>
                </div>
              </div>
            </Card>

            {/* Rating */}
            {event.rating && (
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {event.rating}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(event.rating!)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    {event.reviews?.length || 0} reviews
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
