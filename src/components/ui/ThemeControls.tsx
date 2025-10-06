import { Sun, Moon, Globe } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeControls() {
  const { state, dispatch } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      {/* Language selector */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1"
          onClick={() => dispatch({ 
            type: 'SET_LANGUAGE', 
            payload: state.language === 'fr' ? 'en' : 'fr' 
          })}
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">
            {state.language === 'fr' ? 'EN' : 'FR'}
          </span>
        </Button>
      </div>

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        className="p-2"
      >
        {state.theme === 'light' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
