import { Link, useLocation } from 'react-router-dom';
import { Heart, MapPin, Users, User, LogOut, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeControls } from '../ui/ThemeControls';
import { AuthModal } from '../ui/AuthModal';
import { useApp } from '../../contexts/AppContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const { state } = useApp();
  const { t } = useTheme();
  const { state: authState, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const navigation = [
    { name: t('nav.discover'), href: '/discover', icon: MapPin },
    { name: t('nav.map'), href: '/map', icon: MapPin },
    { name: t('nav.community'), href: '/community', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <Link to="/" className="flex items-center space-x-3">
                    <img 
                      src="/logo.svg" 
                      alt="Local Insights Logo" 
                      className="w-8 h-8"
                    />
                    <span className="font-display font-semibold text-xl text-gray-900 dark:text-white">
                      Local Insights
                    </span>
                  </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Controls */}
            <ThemeControls />
            
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.wishlist.length}
                </span>
              )}
            </Link>

            {/* Profile */}
            {authState.isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <img
                  src={authState.user?.avatar}
                  alt={authState.user?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {authState.user?.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="p-2"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                {t('nav.login')}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
