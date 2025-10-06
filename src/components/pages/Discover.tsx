import { useState, useEffect } from 'react';
import { Heart, MapPin, Clock, Euro, Star, Filter, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { mockEvents, mockArtists } from '../../data/mockData';
import type { Event } from '../../types';

export function Discover() {
  const { state, dispatch } = useApp();
  const { t } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch({ type: 'SET_EVENTS', payload: mockEvents });
    dispatch({ type: 'SET_ARTISTS', payload: mockArtists });
  }, [dispatch]);

  const categories = [t('common.all'), t('discover.music'), t('discover.art'), t('discover.food'), t('discover.literature'), t('discover.history')];
  const spotlightArtists = mockArtists.filter(artist => artist.isSpotlight);

  const filteredEvents = state.events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tous' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleWishlist = (eventId: string) => {
    if (state.wishlist.includes(eventId)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: eventId });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: eventId });
    }
  };

  const formatPrice = (event: Event) => {
    if (event.price.min === 0 && event.price.max === 0) {
      return t('common.free');
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t('discover.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('discover.subtitle')}
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder={t('discover.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>{t('common.filters')}</span>
            </Button>
          </div>

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

        {spotlightArtists.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Spotlight Artists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spotlightArtists.map((artist) => (
                <Card key={artist.id} hover className="text-center">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-2">{artist.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{artist.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {artist.genre.map((genre) => (
                      <Badge key={genre} variant="primary" size="sm">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Events ({filteredEvents.length})
            </h2>
          </div>

          {filteredEvents.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t('discover.noResults')}
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} hover className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <button
                      onClick={() => toggleWishlist(event.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                        state.wishlist.includes(event.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${
                        state.wishlist.includes(event.id) ? 'fill-current' : ''
                      }`} />
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

                    {event.rating && (
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(event.rating!)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">
                          {event.rating} ({event.reviews?.length || 0} reviews)
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => window.location.href = `/event/${event.id}`}
                    >
                      {t('common.details')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
