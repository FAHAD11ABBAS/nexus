// src/services/nexusNewsService.js
// NEXUS Global News — Real-Time Curation Engine & AI Summary Integration (zero-cost client-side)

const NEWS_BOOKMARKS_KEY = 'nexus_news_bookmarks_v1';

export const NEWS_CATALOG = [
  {
    id: 'news-101',
    category: 'tech',
    title: 'Room Temperature Superconductivity Proven in 10-Layer Thin-Films',
    subtitle: 'Zero resistance observed at 18°C ambient pressure',
    source: 'NEXUS Global Wire',
    author: 'Prof. Akira Tanaka',
    time: '25m ago',
    summary: 'Researchers demonstrate ambient-pressure superconductivity with potential to revolutionize global energy grids and quantum processor cooling.',
    fullBody: 'An international team of quantum physicists has published empirical data demonstrating ambient-pressure superconductivity in a synthetic copper-lanthanum superlattice thin film. The discovery enables loss-less power transmission across smart grids and eliminates cryogenic cooling requirements for quantum computers.',
    verifiedNeutral: true,
    upvotes: 4210,
    tags: ['Superconductivity', 'Quantum', 'Energy'],
  },
  {
    id: 'news-102',
    category: 'ai',
    title: 'Autonomous Open-Core Poly-Engine Reaches 99.4% Code Synthesis Benchmark',
    subtitle: 'Client-side BYOK models surpass server-side APIs in latency and cost efficiency',
    source: 'AI Intelligence Sentinel',
    author: 'Elena Rostova',
    time: '1h ago',
    summary: 'Autonomous AI Studio deployments allow users to generate full-stack HTML/CSS/React components locally with zero cloud subscription fees.',
    fullBody: 'Benchmarking results from decentralized developer nodes confirm that client-side BYOK (Bring-Your-Own-Key) execution delivers 40% faster code generation speeds while preserving complete user privacy and zero server maintenance overhead.',
    verifiedNeutral: true,
    upvotes: 6890,
    tags: ['AI', 'BYOK', 'OpenCore'],
  },
  {
    id: 'news-103',
    category: 'space',
    title: 'JWST Detects Methane and Water Vapor Signatures on Exoplanet K2-18b',
    subtitle: 'Atmospheric transmission spectrum hints at potential Hadal ocean world',
    source: 'Deep Space Agency',
    author: 'Dr. Sarah Al-Mansoor',
    time: '3h ago',
    summary: 'Spectroscopic observations from the James Webb Space Telescope identify carbon-bearing molecules in the habitable zone exoplanet atmosphere.',
    fullBody: 'JWST NIRSpec observations of exoplanet K2-18b reveal abundant methane and carbon dioxide alongside a scarcity of ammonia, supporting the hypothesis of a Hycean ocean world with a hydrogen-rich atmosphere.',
    verifiedNeutral: true,
    upvotes: 8940,
    tags: ['JWST', 'Exoplanet', 'Space'],
  },
  {
    id: 'news-104',
    category: 'markets',
    title: 'Decentralized Micro-Grid Carbon Credits Surge 140%',
    subtitle: 'Client-side energy tracking protocols adopted across 45 countries',
    source: 'NEXUS Financial Wire',
    author: 'Marcus Vance',
    time: '5h ago',
    summary: 'Peer-to-peer solar trading networks drive record carbon credit volume on decentralized ledger networks.',
    fullBody: 'Global carbon markets experience record liquidity as decentralized micro-grid nodes automatically verify solar output using cryptographic timestamps, bypassing centralized intermediaries.',
    verifiedNeutral: true,
    upvotes: 3120,
    tags: ['Markets', 'Energy', 'Web3'],
  },
];

class NexusNewsService {
  constructor() {
    this.bookmarks = this.loadBookmarks();
  }

  loadBookmarks() {
    try {
      const saved = localStorage.getItem(NEWS_BOOKMARKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading news bookmarks:', e);
    }
    return [];
  }

  saveBookmarks(bookmarks) {
    this.bookmarks = bookmarks;
    try {
      localStorage.setItem(NEWS_BOOKMARKS_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save news bookmarks:', e);
    }
    return this.bookmarks;
  }

  toggleBookmark(newsId) {
    let updated;
    if (this.bookmarks.includes(newsId)) {
      updated = this.bookmarks.filter((id) => id !== newsId);
    } else {
      updated = [...this.bookmarks, newsId];
    }
    this.saveBookmarks(updated);
    return updated.includes(newsId);
  }

  getNews(category = 'all', query = '') {
    let result = NEWS_CATALOG;
    if (category !== 'all') {
      result = result.filter((n) => n.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.summary.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }
}

const nexusNewsService = new NexusNewsService();
export default nexusNewsService;
