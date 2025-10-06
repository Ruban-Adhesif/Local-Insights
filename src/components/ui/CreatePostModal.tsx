import React, { useState } from 'react';
import { X, Image, Star, MessageCircle, User } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Badge } from './Badge';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { mockEvents } from '../../data/mockData';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

export function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const { t } = useTheme();
  const { dispatch } = useApp();
  const [postType, setPostType] = useState<'recommendation' | 'review' | 'interview'>('recommendation');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'Vous',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
      type: postType,
      title: title.trim(),
      content: content.trim(),
      images: images.length > 0 ? images : undefined,
      eventId: selectedEvent || undefined,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: [],
    };

    // Add to community posts
    dispatch({ type: 'SET_COMMUNITY_POSTS', payload: [newPost] });
    
    // Reset form
    setTitle('');
    setContent('');
    setSelectedEvent('');
    setImages([]);
    
    onPostCreated?.();
    onClose();
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('createPost.title')}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Type de post
            </label>
            <div className="flex space-x-3">
              {(['recommendation', 'review', 'interview'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPostType(type)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                    postType === type
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
                  }`}
                >
                  {type === 'recommendation' && <Star className="w-4 h-4" />}
                  {type === 'review' && <MessageCircle className="w-4 h-4" />}
                  {type === 'interview' && <User className="w-4 h-4" />}
                  <span className="text-sm font-medium">{getTypeLabel(type)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Event Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Événement lié (optionnel)
            </label>
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="block w-full rounded-lg border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Aucun événement</option>
              {mockEvents.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <Input
              label="Titre"
              placeholder="Donnez un titre à votre post..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Contenu
            </label>
            <textarea
              placeholder="Partagez votre expérience, vos recommandations ou vos avis..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="block w-full rounded-lg border-gray-300 dark:border-dark-600 dark:bg-dark-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Images (optionnel)
            </label>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Image className="w-4 h-4" />
                <span>Ajouter une image</span>
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Fonctionnalité à venir
              </span>
            </div>
          </div>

          {/* Preview */}
          {(title || content) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Aperçu
              </label>
              <Card className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50"
                    alt="Vous"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">Vous</span>
                      <Badge variant={getTypeColor(postType) as any} size="sm">
                        {getTypeLabel(postType)}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Aujourd'hui
                    </div>
                  </div>
                </div>
                {title && (
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h3>
                )}
                {content && (
                  <p className="text-gray-700 dark:text-gray-300">
                    {content}
                  </p>
                )}
              </Card>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!title.trim() || !content.trim()}
            >
              Publier
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
