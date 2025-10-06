import { Heart, MapPin, Clock, Euro, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { mockEvents } from '../../data/mockData';

export function Wishlist() {
  const { state, dispatch } = useApp();
  const { t } = useTheme();

  const wishlistEvents = mockEvents.filter(event => 
    state.wishlist.includes(event.id)
  );

  const removeFromWishlist = (eventId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: eventId });
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
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const generateCalendarLink = (event: typeof mockEvents[0]) => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    
    const formatDateForCalendar = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const details = encodeURIComponent(`${event.description}\n\nLieu: ${event.location.name}\nAdresse: ${event.location.address}`);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=${details}&location=${encodeURIComponent(event.location.address)}`;
  };

  const exportToCalendar = () => {
    // For a real application, we would generate an ICS file
    // Here we open Google Calendar for each event
    wishlistEvents.forEach(event => {
      window.open(generateCalendarLink(event), '_blank');
    });
  };

  if (wishlistEvents.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('wishlist.empty')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t('wishlist.emptyDesc')}
            </p>
            <Button 
              variant="primary"
              onClick={() => window.location.href = '/discover'}
            >
              {t('discover.title')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {wishlistEvents.length} saved event{wishlistEvents.length > 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button 
              variant="outline"
              onClick={exportToCalendar}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Export to calendar
            </Button>
            <Button 
              variant="primary"
              onClick={() => window.location.href = '/discover'}
            >
              Discover more
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistEvents.map((event) => (
            <Card key={event.id} hover className="overflow-hidden">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(event.id)}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
                <Badge 
                  variant="primary" 
                  className="absolute bottom-4 left-4"
                >
                  {event.category}
                </Badge>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {formatDate(event.date)} à {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location.name}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Euro className="w-4 h-4 mr-2" />
                    {formatPrice(event)}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => window.location.href = `/event/${event.id}`}
                  >
                    View details
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open(generateCalendarLink(event), '_blank')}
                    className="px-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Your list summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">
                {wishlistEvents.length}
              </div>
              <div className="text-sm text-gray-600">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600">
                {new Set(wishlistEvents.map(e => e.category)).size}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">
                {wishlistEvents.filter(e => e.price.min === 0).length}
              </div>
              <div className="text-sm text-gray-600">Free</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
