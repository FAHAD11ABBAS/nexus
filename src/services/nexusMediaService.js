// src/services/nexusMediaService.js
// NEXOS Media Empire — Live TV Channels & Subtitled Cinema Catalog (zero-cost client-side)

export const DEFAULT_TV_CHANNELS = [
  {
    id: 'tv-1',
    name: 'NEXUS Global Tech Wire 24/7',
    category: 'tech',
    country: 'Global 🌐',
    badge: 'LIVE HD',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    viewers: '42.8k',
  },
  {
    id: 'tv-2',
    name: 'Deep Space Telemetry Stream',
    category: 'space',
    country: 'NASA / ESA 🚀',
    badge: 'LIVE 4K',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    viewers: '89.1k',
  },
];

export const DEFAULT_SUBTITLED_MOVIES = [
  {
    id: 'mov-1',
    title: 'Hadith of the Stars: Interstellar Odyssey',
    subtitles: ['Arabic 🇮🇶', 'English 🇺🇸', 'French 🇫🇷'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    rating: '4.9 ★',
    year: '2026',
    synopsis: 'A groundbreaking sci-fi cinematic journey exploring quantum entanglement across deep space.',
  },
];

class NexusMediaService {
  getTVChannels() {
    return DEFAULT_TV_CHANNELS;
  }

  getMovies() {
    return DEFAULT_SUBTITLED_MOVIES;
  }
}

const nexusMediaService = new NexusMediaService();
export default nexusMediaService;
