import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Star, User, Calendar, Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { CreatePostModal } from '../ui/CreatePostModal';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { mockCommunityPosts, mockEvents } from '../../data/mockData';

export function Community() {
  const { state, dispatch } = useApp();
  const { t } = useTheme();
  const { state: authState } = useAuth();
  const [selectedType, setSelectedType] = useState<'all' | 'recommendation' | 'review' | 'interview'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [showComments, setShowComments] = useState<Set<string>>(new Set());
  const [newComments, setNewComments] = useState<Record<string, string>>({});

  // Load liked posts from localStorage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('localInsights_likedPosts');
    if (savedLikes) {
      setLikedPosts(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'SET_COMMUNITY_POSTS', payload: mockCommunityPosts });
  }, [dispatch]);

  const filteredPosts = state.communityPosts.filter(post => 
    selectedType === 'all' || post.type === selectedType
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getEventTitle = (eventId?: string) => {
    if (!eventId) return null;
    const event = mockEvents.find(e => e.id === eventId);
    return event?.title;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'recommendation': return t('community.recommendation');
      case 'review': return t('community.review');
      case 'interview': return t('community.interview');
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'primary';
      case 'review': return 'accent';
      case 'interview': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleLike = (postId: string) => {
    if (!authState.isAuthenticated) return;
    
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      
      // Save to localStorage
      localStorage.setItem('localInsights_likedPosts', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  const handleComment = (postId: string) => {
    if (!authState.isAuthenticated) return;
    
    setShowComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleAddComment = (postId: string) => {
    const comment = newComments[postId];
    if (!comment?.trim() || !authState.isAuthenticated) return;

    // Add comment to the post
    const updatedPosts = state.communityPosts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now().toString(),
          userName: authState.user?.name || 'User',
          content: comment,
          date: new Date().toISOString().split('T')[0],
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });

    dispatch({ type: 'SET_COMMUNITY_POSTS', payload: updatedPosts });
    setNewComments(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('community.title')}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300">
                        {t('community.subtitle')}
                      </p>
            </div>
                    <Button
                      variant="primary"
                      onClick={() => setIsCreateModalOpen(true)}
                      className="mt-4 sm:mt-0 flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{t('community.createPost')}</span>
                    </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: t('common.all') },
                      { id: 'recommendation', label: t('community.recommendation') },
                      { id: 'review', label: t('community.review') },
                      { id: 'interview', label: t('community.interview') },
                    ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No content found for this filter.
              </p>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="p-6">
                {/* Post header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {post.userName}
                      </h3>
                      <Badge variant={getTypeColor(post.type) as any} size="sm">
                        {getTypeLabel(post.type)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                  </div>
                </div>

                {/* Post content */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Event link */}
                {post.eventId && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">
                        Related event: {getEventTitle(post.eventId)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Images */}
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

                {/* Comments */}
                {post.comments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Comments ({post.comments.length})
                    </h4>
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-sm text-gray-900">
                                {comment.userName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.date)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center space-x-6 mb-4">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        likedPosts.has(post.id)
                          ? 'text-red-500'
                          : 'text-gray-600 dark:text-gray-300 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                    </button>
                    <button 
                      onClick={() => handleComment(post.id)}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments.length}</span>
                    </button>
                  </div>

                  {/* Comment Section */}
                  {showComments.has(post.id) && (
                    <div className="space-y-3">
                      {authState.isAuthenticated && (
                        <div className="flex space-x-3">
                          <input
                            type="text"
                            placeholder={t('community.addComment')}
                            value={newComments[post.id] || ''}
                            onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                            disabled={!newComments[post.id]?.trim()}
                          >
{t('community.publish')}
                          </Button>
                        </div>
                      )}
                      {!authState.isAuthenticated && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
{t('community.loginToComment')}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Call to action */}
        <Card className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('community.shareExperience')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('community.shareExperienceDesc')}
          </p>
          <Button 
            variant="primary"
            onClick={() => setIsCreateModalOpen(true)}
          >
            {t('community.createPost')}
          </Button>
        </Card>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onPostCreated={() => {
            // Refresh posts or show success message
          }}
        />
      </div>
    </div>
  );
}
