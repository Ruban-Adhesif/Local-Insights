import type { Event, Artist, CommunityPost } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Concert Jazz Intime - Sarah Chen',
    description: 'Une soirée jazz intimiste avec la talentueuse Sarah Chen et son trio. Découvrez des standards revisités et des compositions originales dans une ambiance chaleureuse.',
    date: '2024-01-15',
    time: '20:00',
    location: {
      name: 'Le Petit Jazz Club',
      address: '15 Rue de la Musique, 75011 Paris',
      lat: 48.8566,
      lng: 2.3522,
      city: 'Paris'
    },
    category: 'Musique',
    price: {
      min: 15,
      max: 25,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible', 'hearing-loop'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    organizer: {
      name: 'Le Petit Jazz Club',
      type: 'venue'
    },
    tags: ['jazz', 'intime', 'trio', 'standards'],
    capacity: 80,
    rating: 4.8,
    reviews: [
      {
        id: '1',
        userName: 'Marie L.',
        rating: 5,
        comment: 'Une soirée magique ! Sarah Chen est une artiste exceptionnelle.',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: '2',
    title: 'Exposition Street Art - Quartier Belleville',
    description: 'Découvrez les dernières créations des artistes street art de Belleville. Visite guidée gratuite avec les artistes eux-mêmes.',
    date: '2024-01-18',
    time: '14:00',
    location: {
      name: 'Galerie de la Rue',
      address: '42 Rue de Belleville, 75019 Paris',
      lat: 48.8722,
      lng: 2.3767,
      city: 'Paris'
    },
    category: 'Art',
    price: {
      min: 0,
      max: 0,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    organizer: {
      name: 'Collectif Belleville Art',
      type: 'organization'
    },
    tags: ['street-art', 'gratuit', 'visite-guidée', 'belleville'],
    rating: 4.6
  },
  {
    id: '3',
    title: 'Atelier Cuisine Italienne Authentique',
    description: 'Apprenez les secrets de la cuisine italienne avec Chef Marco. Pasta fraîche, risotto et tiramisu au programme !',
    date: '2024-01-20',
    time: '18:30',
    location: {
      name: 'Cucina di Marco',
      address: '8 Rue des Lombards, 75004 Paris',
      lat: 48.8566,
      lng: 2.3522,
      city: 'Paris'
    },
    category: 'Cuisine',
    price: {
      min: 45,
      max: 65,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    organizer: {
      name: 'Cucina di Marco',
      type: 'venue'
    },
    tags: ['cuisine', 'italienne', 'atelier', 'pasta'],
    capacity: 12,
    rating: 4.9
  },
  {
    id: '4',
    title: 'Soirée Poésie Slam - Open Mic',
    description: 'Venez partager vos textes ou simplement écouter lors de cette soirée slam ouverte à tous. Ambiance conviviale garantie !',
    date: '2024-01-22',
    time: '19:30',
    location: {
      name: 'Café des Arts',
      address: '23 Rue de la Poésie, 75005 Paris',
      lat: 48.8506,
      lng: 2.3444,
      city: 'Paris'
    },
    category: 'Littérature',
    price: {
      min: 5,
      max: 8,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible', 'hearing-loop'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    organizer: {
      name: 'Café des Arts',
      type: 'venue'
    },
    tags: ['slam', 'poésie', 'open-mic', 'convivial'],
    rating: 4.7
  },
  {
    id: '5',
    title: 'Visite Nocturne - Cimetière du Père Lachaise',
    description: 'Découvrez les secrets et légendes du plus célèbre cimetière de Paris lors d\'une visite nocturne guidée.',
    date: '2024-01-25',
    time: '20:00',
    location: {
      name: 'Cimetière du Père Lachaise',
      address: '16 Rue du Repos, 75020 Paris',
      lat: 48.8614,
      lng: 2.3933,
      city: 'Paris'
    },
    category: 'Histoire',
    price: {
      min: 12,
      max: 18,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    organizer: {
      name: 'Paris Mystères',
      type: 'organization'
    },
    tags: ['histoire', 'nocturne', 'légendes', 'visite-guidée'],
    rating: 4.5
  },
  {
    id: '6',
    title: 'Festival de Musique Électronique - Nuit Blanche',
    description: 'Une nuit entière dédiée à la musique électronique avec les meilleurs DJs de la scène parisienne. Ambiance garantie jusqu\'au petit matin !',
    date: '2024-01-28',
    time: '22:00',
    location: {
      name: 'Le Trianon',
      address: '80 Boulevard de Rochechouart, 75018 Paris',
      lat: 48.8847,
      lng: 2.3406,
      city: 'Paris'
    },
    category: 'Musique',
    price: {
      min: 25,
      max: 35,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1571266028243-e68f8570c9e2?w=400',
    organizer: {
      name: 'Le Trianon',
      type: 'venue'
    },
    tags: ['électronique', 'DJ', 'nuit-blanche', 'festival'],
    capacity: 500,
    rating: 4.3
  },
  {
    id: '7',
    title: 'Atelier Poterie - Céramique Contemporaine',
    description: 'Initiez-vous à la poterie avec des techniques modernes. Créez votre propre pièce unique sous la guidance d\'un artisan expérimenté.',
    date: '2024-01-30',
    time: '14:00',
    location: {
      name: 'Atelier Terre & Feu',
      address: '12 Rue de la Poterie, 75013 Paris',
      lat: 48.8322,
      lng: 2.3556,
      city: 'Paris'
    },
    category: 'Art',
    price: {
      min: 35,
      max: 45,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    organizer: {
      name: 'Atelier Terre & Feu',
      type: 'venue'
    },
    tags: ['poterie', 'céramique', 'atelier', 'artisanat'],
    capacity: 8,
    rating: 4.7
  },
  {
    id: '8',
    title: 'Dégustation de Vins Naturels - Cave Authentique',
    description: 'Découvrez les vins naturels de petits producteurs français. Dégustation commentée par un sommelier passionné.',
    date: '2024-02-02',
    time: '19:00',
    location: {
      name: 'Cave des Artisans',
      address: '28 Rue des Vignes, 75012 Paris',
      lat: 48.8444,
      lng: 2.3778,
      city: 'Paris'
    },
    category: 'Cuisine',
    price: {
      min: 20,
      max: 30,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400',
    organizer: {
      name: 'Cave des Artisans',
      type: 'venue'
    },
    tags: ['vin', 'dégustation', 'naturel', 'sommelier'],
    capacity: 20,
    rating: 4.8
  },
  {
    id: '9',
    title: 'Lecture Théâtrale - Auteurs Contemporains',
    description: 'Des comédiens lisent des extraits d\'œuvres d\'auteurs contemporains. Un moment d\'intimité avec la littérature d\'aujourd\'hui.',
    date: '2024-02-05',
    time: '20:30',
    location: {
      name: 'Théâtre de l\'Épée de Bois',
      address: '100 Rue de Tolbiac, 75013 Paris',
      lat: 48.8222,
      lng: 2.3556,
      city: 'Paris'
    },
    category: 'Littérature',
    price: {
      min: 8,
      max: 12,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible', 'hearing-loop'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    organizer: {
      name: 'Théâtre de l\'Épée de Bois',
      type: 'venue'
    },
    tags: ['lecture', 'théâtre', 'contemporain', 'intimité'],
    capacity: 60,
    rating: 4.6
  },
  {
    id: '10',
    title: 'Visite Guidée - Paris Révolutionnaire',
    description: 'Parcourez les lieux emblématiques de la Révolution française. Une plongée dans l\'histoire avec un guide passionné.',
    date: '2024-02-08',
    time: '15:00',
    location: {
      name: 'Place de la Bastille',
      address: 'Place de la Bastille, 75011 Paris',
      lat: 48.8532,
      lng: 2.3694,
      city: 'Paris'
    },
    category: 'Histoire',
    price: {
      min: 15,
      max: 20,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    organizer: {
      name: 'Paris Historique',
      type: 'organization'
    },
    tags: ['révolution', 'histoire', 'visite-guidée', 'bastille'],
    capacity: 25,
    rating: 4.9
  },
  {
    id: '11',
    title: 'Concert Acoustique - Chanson Française',
    description: 'Une soirée dédiée à la chanson française avec des artistes émergents. Guitare, voix et émotions au rendez-vous.',
    date: '2024-02-10',
    time: '20:00',
    location: {
      name: 'Le Café de la Danse',
      address: '5 Passage Louis-Philippe, 75011 Paris',
      lat: 48.8566,
      lng: 2.3667,
      city: 'Paris'
    },
    category: 'Musique',
    price: {
      min: 12,
      max: 18,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible', 'hearing-loop'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    organizer: {
      name: 'Le Café de la Danse',
      type: 'venue'
    },
    tags: ['chanson-française', 'acoustique', 'émergent', 'intimité'],
    capacity: 120,
    rating: 4.5
  },
  {
    id: '12',
    title: 'Exposition Photo - Paris Secret',
    description: 'Découvrez un Paris méconnu à travers l\'objectif de photographes locaux. Des clichés qui révèlent la beauté cachée de la capitale.',
    date: '2024-02-12',
    time: '10:00',
    location: {
      name: 'Galerie Photo Paris',
      address: '45 Rue de Rivoli, 75004 Paris',
      lat: 48.8566,
      lng: 2.3522,
      city: 'Paris'
    },
    category: 'Art',
    price: {
      min: 0,
      max: 0,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    organizer: {
      name: 'Galerie Photo Paris',
      type: 'venue'
    },
    tags: ['photographie', 'paris', 'gratuit', 'local'],
    rating: 4.4
  },
  {
    id: '13',
    title: 'Atelier Pâtisserie - Macarons Parisiens',
    description: 'Apprenez à confectionner les célèbres macarons parisiens avec un chef pâtissier. Technique, saveurs et créativité au programme.',
    date: '2024-02-15',
    time: '14:30',
    location: {
      name: 'École de Pâtisserie Paris',
      address: '67 Rue de la Paix, 75002 Paris',
      lat: 48.8667,
      lng: 2.3333,
      city: 'Paris'
    },
    category: 'Cuisine',
    price: {
      min: 55,
      max: 70,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    organizer: {
      name: 'École de Pâtisserie Paris',
      type: 'venue'
    },
    tags: ['pâtisserie', 'macarons', 'chef', 'technique'],
    capacity: 10,
    rating: 4.8
  },
  {
    id: '14',
    title: 'Soirée Contes - Légendes Urbaines',
    description: 'Plongez dans l\'univers des légendes urbaines parisiennes. Un conteur vous emmène dans les mystères de la ville lumière.',
    date: '2024-02-18',
    time: '19:00',
    location: {
      name: 'Café des Contes',
      address: '89 Rue de la Folie-Méricourt, 75011 Paris',
      lat: 48.8667,
      lng: 2.3667,
      city: 'Paris'
    },
    category: 'Littérature',
    price: {
      min: 6,
      max: 10,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible', 'hearing-loop'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    organizer: {
      name: 'Café des Contes',
      type: 'venue'
    },
    tags: ['contes', 'légendes', 'urbain', 'mystère'],
    capacity: 40,
    rating: 4.7
  },
  {
    id: '15',
    title: 'Visite Archéologique - Crypte Notre-Dame',
    description: 'Explorez la crypte archéologique de Notre-Dame et découvrez 2000 ans d\'histoire de Paris sous vos pieds.',
    date: '2024-02-20',
    time: '16:00',
    location: {
      name: 'Crypte Archéologique Notre-Dame',
      address: '7 Parvis Notre-Dame, 75004 Paris',
      lat: 48.8566,
      lng: 2.3522,
      city: 'Paris'
    },
    category: 'Histoire',
    price: {
      min: 8,
      max: 12,
      currency: 'EUR'
    },
    accessibility: ['wheelchair-accessible'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    organizer: {
      name: 'Musée de l\'Archéologie',
      type: 'organization'
    },
    tags: ['archéologie', 'notre-dame', 'crypte', 'histoire'],
    capacity: 30,
    rating: 4.6
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    bio: 'Pianiste et compositrice de jazz, Sarah Chen mélange tradition et modernité dans ses compositions originales.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300',
    genre: ['Jazz', 'Blues', 'Soul'],
    socialLinks: {
      instagram: '@sarahchenjazz',
      spotify: 'https://open.spotify.com/artist/sarahchen',
      website: 'https://sarahchen.com'
    },
    upcomingEvents: ['1'],
    isSpotlight: true
  },
  {
    id: '2',
    name: 'Marco Rossi',
    bio: 'Chef italien passionné, Marco partage son amour pour la cuisine traditionnelle italienne à travers ses ateliers.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    genre: ['Cuisine', 'Italienne'],
    socialLinks: {
      instagram: '@chefmarco',
      website: 'https://cucinadimarco.com'
    },
    upcomingEvents: ['3'],
    isSpotlight: true
  },
  {
    id: '3',
    name: 'Luna Poetry',
    bio: 'Artiste slam et poétesse, Luna crée des ponts entre les mots et les émotions dans ses performances touchantes.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    genre: ['Poésie', 'Slam', 'Performance'],
    socialLinks: {
      instagram: '@lunapoetry',
      website: 'https://lunapoetry.fr'
    },
    upcomingEvents: ['4'],
    isSpotlight: false
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    userName: 'Marie Dubois',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
    type: 'recommendation',
    title: 'Concert Jazz Intime - Un moment magique !',
    content: 'J\'ai assisté au concert de Sarah Chen hier soir et c\'était absolument magnifique ! L\'ambiance était intimiste, la musique touchante. Je recommande vivement à tous les amateurs de jazz.',
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'],
    eventId: '1',
    date: '2024-01-11',
    likes: 12,
    comments: [
      {
        id: '1',
        userName: 'Pierre M.',
        content: 'Merci pour le partage ! Je vais y aller la semaine prochaine.',
        date: '2024-01-11'
      }
    ]
  },
  {
    id: '2',
    userName: 'Sophie Martin',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
    type: 'interview',
    title: 'Interview exclusive : Sarah Chen nous parle de sa passion',
    content: 'Rencontre avec Sarah Chen, la talentueuse pianiste de jazz qui nous dévoile ses sources d\'inspiration et ses projets futurs.',
    date: '2024-01-08',
    likes: 25,
    comments: []
  }
];
