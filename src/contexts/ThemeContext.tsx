import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'fr' | 'en';
type Theme = 'light' | 'dark';

interface ThemeState {
  language: Language;
  theme: Theme;
}

type ThemeAction =
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'TOGGLE_THEME' };

const initialState: ThemeState = {
  language: 'fr',
  theme: 'light',
};

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

interface ThemeContextType {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Translations
const translations = {
  fr: {
    // Navigation
    'nav.discover': 'Découvrir',
    'nav.map': 'Carte',
    'nav.community': 'Communauté',
    'nav.wishlist': 'Ma liste',
    'nav.login': 'Se connecter',
    
    // Home
    'home.title': 'Découvrez la culture locale',
    'home.subtitle': 'Construisez rapidement une vie culturelle personnalisée avec des recommandations locales fiables pour les nouveaux arrivants et voyageurs.',
    'home.createProfile': 'Créer mon profil culturel',
    'home.localDiscovery': 'Découverte locale',
    'home.localDiscoveryDesc': 'Trouvez des événements et lieux authentiques près de chez vous',
    'home.independentArtists': 'Artistes indépendants',
    'home.independentArtistsDesc': 'Découvrez des talents locaux et soutenez la scène artistique',
    'home.community': 'Communauté',
    'home.communityDesc': 'Connectez-vous avec d\'autres passionnés de culture',
    'home.trending': 'En ce moment à Paris',
    
    // Onboarding
    'onboarding.interests': 'Quels sont vos centres d\'intérêt ?',
    'onboarding.interestsDesc': 'Sélectionnez au moins un domaine qui vous passionne',
    'onboarding.budget': 'Quel est votre budget ?',
    'onboarding.budgetDesc': 'Cela nous aide à vous proposer des événements adaptés',
    'onboarding.accessibility': 'Besoins d\'accessibilité',
    'onboarding.accessibilityDesc': 'Sélectionnez vos besoins spécifiques (optionnel)',
    'onboarding.mood': 'Quel est votre mood ?',
    'onboarding.moodDesc': 'Décrivez votre état d\'esprit pour des recommandations personnalisées',
    'onboarding.step': 'Étape',
    'onboarding.of': 'sur',
    'onboarding.back': 'Retour',
    'onboarding.next': 'Suivant',
    'onboarding.finish': 'Terminer',
    
    // Budget options
    'budget.low': 'Budget serré',
    'budget.lowDesc': 'Gratuit et événements à petit prix',
    'budget.medium': 'Budget modéré',
    'budget.mediumDesc': 'Événements jusqu\'à 30€',
    'budget.high': 'Budget confortable',
    'budget.highDesc': 'Tous types d\'événements',
    
    // Accessibility
    'accessibility.wheelchair': 'Accès fauteuil roulant',
    'accessibility.hearing': 'Boucle magnétique',
    'accessibility.visual': 'Aides visuelles',
    'accessibility.quiet': 'Espace calme',
    
    // Mood
    'mood.explorer': 'Explorateur',
    'mood.explorerDesc': 'J\'aime découvrir de nouveaux endroits',
    'mood.relaxed': 'Détendu',
    'mood.relaxedDesc': 'Je préfère les activités calmes',
    'mood.adventurous': 'Aventurier',
    'mood.adventurousDesc': 'Je cherche l\'aventure et l\'inattendu',
    'mood.social': 'Social',
    'mood.socialDesc': 'J\'aime rencontrer de nouvelles personnes',
    
    // Interests
    'interest.music': 'Musique',
    'interest.art': 'Art',
    'interest.food': 'Cuisine',
    'interest.literature': 'Littérature',
    'interest.photography': 'Photographie',
    'interest.gaming': 'Gaming',
    
    // Common
    'common.free': 'Gratuit',
    'common.details': 'Voir les détails',
    'common.search': 'Rechercher...',
    'common.filters': 'Filtres',
    'common.all': 'Tous',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    
    // Community
    'community.title': 'Communauté Local Insights',
    'community.subtitle': 'Découvrez les recommandations, avis et interviews de notre communauté',
    'community.createPost': 'Créer un post',
    'community.recommendation': 'Recommandation',
    'community.review': 'Avis',
    'community.interview': 'Interview',
    'community.like': 'J\'aime',
    'community.comment': 'Commenter',
    'community.addComment': 'Ajouter un commentaire...',
    'community.publish': 'Publier',
    'community.loginToComment': 'Connectez-vous pour commenter',
    'community.shareExperience': 'Partagez votre expérience',
    'community.shareExperienceDesc': 'Avez-vous assisté à un événement récemment ? Partagez votre avis avec la communauté !',
    
    // Favorites
    'favorites.title': 'Mes Favoris',
    'favorites.subtitle': 'Vos posts préférés de la communauté',
    'favorites.count': 'posts favoris',
    'favorites.countSingle': 'post favori',
    'favorites.empty': 'Aucun favori pour le moment',
    'favorites.emptyDesc': 'Likez des posts dans la communauté pour les voir apparaître ici',
    'favorites.discover': 'Découvrir la communauté',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.register': 'Inscription',
    'auth.name': 'Nom',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.loginButton': 'Se connecter',
    'auth.registerButton': 'S\'inscrire',
    'auth.noAccount': 'Pas de compte ? Créez-en un',
    'auth.alreadyAccount': 'Déjà un compte ? Connectez-vous',
    'auth.fillFields': 'Veuillez remplir tous les champs obligatoires',
    'auth.enterName': 'Veuillez entrer votre nom',
    'auth.passwordLength': 'Le mot de passe doit contenir au moins 6 caractères',
    'auth.loginError': 'Email ou mot de passe incorrect',
    'auth.registerError': 'Cet email est déjà utilisé ou erreur lors de l\'inscription',
    'auth.generalError': 'Une erreur est survenue',
    
    // Create Post Modal
    'createPost.title': 'Créer un post',
    'createPost.type': 'Type de post',
    'createPost.selectEvent': 'Sélectionner un événement (optionnel)',
    'createPost.titlePlaceholder': 'Titre de votre post',
    'createPost.contentPlaceholder': 'Partagez votre expérience...',
    'createPost.submit': 'Publier',
    'createPost.cancel': 'Annuler',
    
    // Discover Page
    'discover.title': 'Découvrez les événements',
    'discover.subtitle': 'Trouvez des expériences culturelles qui vous correspondent',
    'discover.searchPlaceholder': 'Rechercher des événements...',
    'discover.filters': 'Filtres',
    'discover.categories': 'Catégories',
    'discover.all': 'Tous',
    'discover.music': 'Musique',
    'discover.art': 'Art',
    'discover.food': 'Cuisine',
    'discover.literature': 'Littérature',
    'discover.history': 'Histoire',
    'discover.noResults': 'Aucun événement trouvé',
    
    // Map Page
    'map.title': 'Carte des événements',
    'map.subtitle': 'Découvrez les événements culturels près de chez vous',
    
    // Wishlist Page
    'wishlist.title': 'Ma liste de souhaits',
    'wishlist.subtitle': 'événement sauvegardé',
    'wishlist.subtitlePlural': 'événements sauvegardés',
    'wishlist.empty': 'Votre liste de souhaits est vide',
    'wishlist.emptyDesc': 'Ajoutez des événements à votre liste pour les retrouver facilement',
    'wishlist.exportCalendar': 'Exporter vers le calendrier',
    'wishlist.clearAll': 'Tout effacer',
    
    // Event Detail
    'event.details': 'Détails de l\'événement',
    'event.addToWishlist': 'Ajouter à ma liste',
    'event.removeFromWishlist': 'Retirer de ma liste',
    'event.share': 'Partager',
    'event.location': 'Lieu',
    'event.date': 'Date',
    'event.time': 'Heure',
    'event.price': 'Prix',
    'event.description': 'Description',
    'event.organizer': 'Organisateur',
    
  },
  en: {
    // Navigation
    'nav.discover': 'Discover',
    'nav.map': 'Map',
    'nav.community': 'Community',
    'nav.wishlist': 'My list',
    'nav.login': 'Login',
    
    // Home
    'home.title': 'Discover local culture',
    'home.subtitle': 'Quickly build a personalized cultural life with reliable local recommendations for newcomers and travelers.',
    'home.createProfile': 'Create my cultural profile',
    'home.localDiscovery': 'Local discovery',
    'home.localDiscoveryDesc': 'Find authentic events and places near you',
    'home.independentArtists': 'Independent artists',
    'home.independentArtistsDesc': 'Discover local talents and support the art scene',
    'home.community': 'Community',
    'home.communityDesc': 'Connect with other culture enthusiasts',
    'home.trending': 'Trending in Paris',
    
    // Onboarding
    'onboarding.interests': 'What are your interests?',
    'onboarding.interestsDesc': 'Select at least one area that interests you',
    'onboarding.budget': 'What is your budget?',
    'onboarding.budgetDesc': 'This helps us suggest suitable events for you',
    'onboarding.accessibility': 'Accessibility needs',
    'onboarding.accessibilityDesc': 'Select your specific needs (optional)',
    'onboarding.mood': 'What is your mood?',
    'onboarding.moodDesc': 'Describe your state of mind for personalized recommendations',
    'onboarding.step': 'Step',
    'onboarding.of': 'of',
    'onboarding.back': 'Back',
    'onboarding.next': 'Next',
    'onboarding.finish': 'Finish',
    
    // Budget options
    'budget.low': 'Tight budget',
    'budget.lowDesc': 'Free and low-cost events',
    'budget.medium': 'Moderate budget',
    'budget.mediumDesc': 'Events up to €30',
    'budget.high': 'Comfortable budget',
    'budget.highDesc': 'All types of events',
    
    // Accessibility
    'accessibility.wheelchair': 'Wheelchair accessible',
    'accessibility.hearing': 'Hearing loop',
    'accessibility.visual': 'Visual aids',
    'accessibility.quiet': 'Quiet space',
    
    // Mood
    'mood.explorer': 'Explorer',
    'mood.explorerDesc': 'I like discovering new places',
    'mood.relaxed': 'Relaxed',
    'mood.relaxedDesc': 'I prefer calm activities',
    'mood.adventurous': 'Adventurous',
    'mood.adventurousDesc': 'I seek adventure and the unexpected',
    'mood.social': 'Social',
    'mood.socialDesc': 'I like meeting new people',
    
    // Interests
    'interest.music': 'Music',
    'interest.art': 'Art',
    'interest.food': 'Food',
    'interest.literature': 'Literature',
    'interest.photography': 'Photography',
    'interest.gaming': 'Gaming',
    
    // Common
    'common.free': 'Free',
    'common.details': 'View details',
    'common.search': 'Search...',
    'common.filters': 'Filters',
    'common.all': 'All',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Community
    'community.title': 'Local Insights Community',
    'community.subtitle': 'Discover recommendations, reviews and interviews from our community',
    'community.createPost': 'Create post',
    'community.recommendation': 'Recommendation',
    'community.review': 'Review',
    'community.interview': 'Interview',
    'community.like': 'Like',
    'community.comment': 'Comment',
    'community.addComment': 'Add a comment...',
    'community.publish': 'Publish',
    'community.loginToComment': 'Login to comment',
    'community.shareExperience': 'Share your experience',
    'community.shareExperienceDesc': 'Have you attended an event recently? Share your review with the community!',
    
    // Favorites
    'favorites.title': 'My Favorites',
    'favorites.subtitle': 'Your favorite posts from the community',
    'favorites.count': 'favorite posts',
    'favorites.countSingle': 'favorite post',
    'favorites.empty': 'No favorites yet',
    'favorites.emptyDesc': 'Like posts in the community to see them appear here',
    'favorites.discover': 'Discover community',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.name': 'Name',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.loginButton': 'Log in',
    'auth.registerButton': 'Sign up',
    'auth.noAccount': 'No account? Create one',
    'auth.alreadyAccount': 'Already have an account? Log in',
    'auth.fillFields': 'Please fill in all required fields',
    'auth.enterName': 'Please enter your name',
    'auth.passwordLength': 'Password must be at least 6 characters',
    'auth.loginError': 'Incorrect email or password',
    'auth.registerError': 'This email is already used or registration error',
    'auth.generalError': 'An error occurred',
    
    // Create Post Modal
    'createPost.title': 'Create post',
    'createPost.type': 'Post type',
    'createPost.selectEvent': 'Select an event (optional)',
    'createPost.titlePlaceholder': 'Your post title',
    'createPost.contentPlaceholder': 'Share your experience...',
    'createPost.submit': 'Publish',
    'createPost.cancel': 'Cancel',
    
    // Discover Page
    'discover.title': 'Discover events',
    'discover.subtitle': 'Find cultural experiences that match you',
    'discover.searchPlaceholder': 'Search events...',
    'discover.filters': 'Filters',
    'discover.categories': 'Categories',
    'discover.all': 'All',
    'discover.music': 'Music',
    'discover.art': 'Art',
    'discover.food': 'Food',
    'discover.literature': 'Literature',
    'discover.history': 'History',
    'discover.noResults': 'No events found',
    
    // Map Page
    'map.title': 'Events map',
    'map.subtitle': 'Discover cultural events near you',
    
    // Wishlist Page
    'wishlist.title': 'My wishlist',
    'wishlist.subtitle': 'saved event',
    'wishlist.subtitlePlural': 'saved events',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDesc': 'Add events to your list to find them easily',
    'wishlist.exportCalendar': 'Export to calendar',
    'wishlist.clearAll': 'Clear all',
    
    // Event Detail
    'event.details': 'Event details',
    'event.addToWishlist': 'Add to my list',
    'event.removeFromWishlist': 'Remove from my list',
    'event.share': 'Share',
    'event.location': 'Location',
    'event.date': 'Date',
    'event.time': 'Time',
    'event.price': 'Price',
    'event.description': 'Description',
    'event.organizer': 'Organizer',
    
    // Onboarding
    'onboarding.interests': 'What are your interests?',
    'onboarding.interestsDesc': 'Select at least one area that interests you',
    'onboarding.budget': 'What is your budget?',
    'onboarding.budgetDesc': 'This helps us suggest suitable events',
    'onboarding.accessibility': 'Accessibility needs?',
    'onboarding.accessibilityDesc': 'Select the options that apply to you',
    'onboarding.mood': 'What is your mood?',
    'onboarding.moodDesc': 'How do you like to discover culture?',
    
    // Interests
    'interest.music': 'Music',
    'interest.art': 'Art',
    'interest.food': 'Food',
    'interest.literature': 'Literature',
    'interest.photography': 'Photography',
    'interest.gaming': 'Gaming',
    
    // Budget
    'budget.low': 'Tight budget',
    'budget.lowDesc': 'Free and low-cost events',
    'budget.medium': 'Moderate budget',
    'budget.mediumDesc': 'Events up to €30',
    'budget.high': 'Comfortable budget',
    'budget.highDesc': 'All types of events',
    
    // Accessibility
    'accessibility.wheelchair': 'Wheelchair accessible',
    'accessibility.hearing': 'Hearing loop',
    'accessibility.visual': 'Visual aids',
    'accessibility.quiet': 'Quiet space',
    
    // Mood
    'mood.explorer': 'Explorer',
    'mood.explorerDesc': 'I like to discover new places',
    'mood.relaxed': 'Relaxed',
    'mood.relaxedDesc': 'I prefer calm activities',
    'mood.adventurous': 'Adventurous',
    'mood.adventurousDesc': 'I seek adventure and the unexpected',
    'mood.social': 'Social',
    'mood.socialDesc': 'I like meeting new people',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
    if (savedLanguage) {
      dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage });
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', state.theme);
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', state.language);
  }, [state.language]);

  const t = (key: string): string => {
    return translations[state.language][key as keyof typeof translations[typeof state.language]] || key;
  };

  return (
    <ThemeContext.Provider value={{ state, dispatch, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
