import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AppState, UserProfile, Event, Artist, CommunityPost, FilterState } from '../types';

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

type AppAction =
  | { type: 'SET_USER_PROFILE'; payload: UserProfile }
  | { type: 'SET_EVENTS'; payload: Event[] }
  | { type: 'SET_ARTISTS'; payload: Artist[] }
  | { type: 'SET_COMMUNITY_POSTS'; payload: CommunityPost[] }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<FilterState> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  userProfile: null,
  events: [],
  artists: [],
  communityPosts: [],
  wishlist: [],
  filters: {
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    distance: 10,
    priceRange: {
      min: 0,
      max: 100,
    },
    categories: [],
    accessibility: [],
    searchQuery: '',
  },
  loading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return { ...state, userProfile: action.payload };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    case 'SET_ARTISTS':
      return { ...state, artists: action.payload };
    case 'SET_COMMUNITY_POSTS':
      return { ...state, communityPosts: action.payload };
    case 'ADD_TO_WISHLIST':
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(id => id !== action.payload) };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
