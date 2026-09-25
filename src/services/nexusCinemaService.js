// src/services/nexusCinemaService.js
// NEXUS Cinema & Live Stream Hub — Zero-Ad Open-Source Media Vault & Live Stream Curation

const CINEMA_BOOKMARKS_KEY = 'nexus_cinema_bookmarks_v1';

export const CINEMA_CATALOG = [
  {
    id: 'cin-1',
    title: 'The Hadal Abyss: Exploration of Mariana Trench',
    category: 'documentary',
    duration: '42:10',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    posterEmoji: '🌊',
    description: 'Autonomous ROVs cataloguing deep-sea Hadal zone extremophiles at 11,000m depth.',
    views: '142.5k',
    rating: '4.9 ★',
    tags: ['Ocean', 'Abyss', 'Documentary'],
  },
  {
    id: 'cin-2',
    title: 'Elysia Domes 2089: Mars Colonization Blueprint',
    category: 'scifi',
    duration: '28:45',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    posterEmoji: '🔴',
    description: 'Interplanetary engineering documentary outlining pressurized geodesic biospheres on Mars.',
    views: '320.1k',
    rating: '5.0 ★',
    tags: ['Mars', 'FutureTech', 'SciFi'],
  },
  {
    id: 'cin-3',
    title: 'NASA JWST Deep Field 4K Cosmic Stream',
    category: 'live',
    duration: 'LIVE 24/7',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    posterEmoji: '🌌',
    description: 'Continuous ultra-deep space imagery telemetry feed from the James Webb Space Telescope.',
    views: '89.4k watching',
    rating: '4.8 ★',
    tags: ['NASA', 'JWST', 'LiveFeed'],
  },
  {
    id: 'cin-4',
    title: 'Quantum Computing & Room Temperature Superconductors',
    category: 'educational',
    duration: '35:20',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    posterEmoji: '⚛️',
    description: 'Academic lecture on ambient-pressure superconductivity and 10,000-qubit processors.',
    views: '210.8k',
    rating: '4.9 ★',
    tags: ['Quantum', 'Physics', 'Education'],
  },
];

class NexusCinemaService {
  constructor() {
    this.bookmarks = this.loadBookmarks();
  }

  loadBookmarks() {
    try {
      const saved = localStorage.getItem(CINEMA_BOOKMARKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading cinema bookmarks:', e);
    }
    return [];
  }

  saveBookmarks(bookmarks) {
    this.bookmarks = bookmarks;
    try {
      localStorage.setItem(CINEMA_BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save cinema bookmarks:', e);
    }
    return this.bookmarks;
  }

  toggleBookmark(movieId) {
    let updated;
    if (this.bookmarks.includes(movieId)) {
      updated = this.bookmarks.filter((id) => id !== movieId);
    } else {
      updated = [...this.bookmarks, movieId];
    }
    this.saveBookmarks(updated);
    return updated.includes(movieId);
  }

  isBookmarked(movieId) {
    return this.bookmarks.includes(movieId);
  }

  getCatalog(category = 'all', query = '') {
    let result = CINEMA_CATALOG;
    if (category !== 'all') {
      result = result.filter((m) => m.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }
}

const nexusCinemaService = new NexusCinemaService();
export default nexusCinemaService;
