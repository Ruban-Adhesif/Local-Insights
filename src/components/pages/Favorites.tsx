import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Star, User, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { mockCommunityPosts } from '../../data/mockData';

export function Favorites() {
  const { state, dispatch } = useApp();
  const { state: authState } = useAuth();
  const { t } = useTheme();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedLikes = localStorage.getItem('localInsights_likedPosts');
    if (savedLikes) {
      setLikedPosts(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'SET_COMMUNITY_POSTS', payload: mockCommunityPosts });
  }, [dispatch]);

  const handleLike = (postId: string) => {
    if (!authState.isAuthenticated) return;
    
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      
      localStorage.setItem('localInsights_likedPosts', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'primary';
      case 'review': return 'accent';
      case 'interview': return 'secondary';
      default: return 'secondary';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'recommendation': return t('community.recommendation');
      case 'review': return t('community.review');
      case 'interview': return t('community.interview');
      default: return type;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEventTitle = (eventId: string) => {
    const event = state.events.find(e => e.id === eventId);
    return event ? event.title : 'Event not found';
  };

  const favoritePosts = state.communityPosts.filter(post => likedPosts.has(post.id));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link to="/community">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t('favorites.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('favorites.subtitle')}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <Card className="p-6 dark:bg-dark-800">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {favoritePosts.length}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {favoritePosts.length === 1 ? t('favorites.countSingle') : t('favorites.count')}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {favoritePosts.length === 0 ? (
            <Card className="text-center py-12 dark:bg-dark-800">
              <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('favorites.empty')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('favorites.emptyDesc')}
              </p>
              <Link to="/community">
                <Button variant="primary">
                  {t('favorites.discover')}
                </Button>
              </Link>
            </Card>
          ) : (
            favoritePosts.map((post) => (
              <Card key={post.id} className="p-6 dark:bg-dark-800">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {post.userName}
                      </h3>
                      <Badge variant={getTypeColor(post.type) as any} size="sm">
                        {getTypeLabel(post.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {post.eventId && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Related event: {getEventTitle(post.eventId)}
                      </span>
                    </div>
                  </div>
                )}

                {post.images && post.images.length > 0 && (
                  <div className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {post.comments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Comments ({post.comments.length})
                    </h4>
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <div className="w-8 h-8 bg-gray-200 dark:bg-dark-700 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm text-gray-900 dark:text-white">
                                {comment.userName}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(comment.date)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-red-500"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="text-sm">{post.likes + 1}</span>
                    </button>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
