export interface UserProfile {
  id: string;
  name: string;
  email: string;
  interests: string[];
  budget: 'low' | 'medium' | 'high';
  accessibility: string[];
  mood: 'explorer' | 'relaxed' | 'adventurous' | 'social';
  language: 'fr' | 'en' | 'es';
  location?: {
    lat: number;
    lng: number;
    city: string;
  };
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    city: string;
  };
  category: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  accessibility: string[];
  image: string;
  organizer: {
    name: string;
    type: 'venue' | 'artist' | 'organization';
  };
  tags: string[];
  capacity?: number;
  soldOut?: boolean;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  genre: string[];
  socialLinks: {
    instagram?: string;
    spotify?: string;
    website?: string;
  };
  upcomingEvents: string[];
  isSpotlight: boolean;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: 'recommendation' | 'review' | 'interview';
  title: string;
  content: string;
  images?: string[];
  eventId?: string;
  date: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  date: string;
}

export interface FilterState {
  dateRange: {
    start: string;
    end: string;
  };
  distance: number;
  priceRange: {
    min: number;
    max: number;
  };
  categories: string[];
  accessibility: string[];
  searchQuery: string;
}

export interface AppState {
  userProfile: UserProfile | null;
  events: Event[];
  artists: Artist[];
  communityPosts: CommunityPost[];
  wishlist: string[];
  filters: FilterState;
  loading: boolean;
  error: string | null;
}
