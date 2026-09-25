// src/services/knowledgeService.js
// NEXUS Global Knowledge, Industry, Commerce & Arts

const KNOWLEDGE_KEY = 'nexus_knowledge_v1';

const BOOK_CATALOG = [
  { id: 'b1', title: 'The Art of War', author: 'Sun Tzu', category: 'Philosophy', year: -500, pages: 68, language: 'Chinese (translated)', rating: 4.8, description: 'Ancient Chinese military treatise on strategy and tactics.' },
  { id: 'b2', title: 'Meditations', author: 'Marcus Aurelius', category: 'Philosophy', year: 180, pages: 254, language: 'Greek (translated)', rating: 4.9, description: 'Personal writings of the Roman Emperor on Stoic philosophy.' },
  { id: 'b3', title: 'The Republic', author: 'Plato', category: 'Philosophy', year: -375, pages: 420, language: 'Greek (translated)', rating: 4.7, description: 'Socratic dialogue on justice, the ideal state, and philosopher kings.' },
  { id: 'b4', title: 'One Thousand and One Nights', author: 'Various', category: 'Literature', year: 850, pages: 1200, language: 'Arabic', rating: 4.9, description: 'Collection of Middle Eastern folk tales compiled over centuries.' },
  { id: 'b5', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', year: 2011, pages: 443, language: 'English', rating: 4.7, description: 'A brief history of humankind from the Stone Age to the present.' },
  { id: 'b6', title: 'The Wealth of Nations', author: 'Adam Smith', category: 'Economics', year: 1776, pages: 1152, language: 'English', rating: 4.5, description: 'Foundational work on free-market economics and capitalism.' },
  { id: 'b7', title: 'Al-Muqaddimah', author: 'Ibn Khaldun', category: 'History', year: 1377, pages: 1384, language: 'Arabic', rating: 4.9, description: 'Pioneering work on historiography, sociology, and economics.' },
  { id: 'b8', title: 'Dune', author: 'Frank Herbert', category: 'Science Fiction', year: 1965, pages: 688, language: 'English', rating: 4.8, description: 'Epic science fiction novel set in a distant future.' },
  { id: 'b9', title: 'The Divine Comedy', author: 'Dante Alighieri', category: 'Literature', year: 1320, pages: 798, language: 'Italian (translated)', rating: 4.8, description: 'Allegorical journey through Hell, Purgatory, and Paradise.' },
  { id: 'b10', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', category: 'Literature', year: 1866, pages: 671, language: 'Russian (translated)', rating: 4.7, description: 'Psychological exploration of guilt, morality, and redemption.' },
  { id: 'b11', title: 'The Lean Startup', author: 'Eric Ries', category: 'Business', year: 2011, pages: 336, language: 'English', rating: 4.4, description: 'Methodology for developing businesses and products efficiently.' },
  { id: 'b12', title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', year: 2008, pages: 464, language: 'English', rating: 4.6, description: 'Handbook of agile software craftsmanship.' },
];

const PHILOSOPHY_QUOTES = [
  { id: 'q1', text: 'The unexamined life is not worth living.', author: 'Socrates', era: 'Ancient Greek' },
  { id: 'q2', text: 'I think, therefore I am.', author: 'René Descartes', era: 'Modern' },
  { id: 'q3', text: 'The only thing I know is that I know nothing.', author: 'Socrates', era: 'Ancient Greek' },
  { id: 'q4', text: 'He who has a why to live can bear almost any how.', author: 'Friedrich Nietzsche', era: 'Modern' },
  { id: 'q5', text: 'Knowledge is power.', author: 'Francis Bacon', era: 'Renaissance' },
  { id: 'q6', text: 'The mind is everything. What you think you become.', author: 'Buddha', era: 'Ancient' },
  { id: 'q7', text: 'Man is condemned to be free.', author: 'Jean-Paul Sartre', era: 'Existentialism' },
  { id: 'q8', text: 'Do not seek to have events happen as you want them to, but instead want them to happen as they do happen.', author: 'Epictetus', era: 'Stoic' },
  { id: 'q9', text: 'The journey of a thousand miles begins with one step.', author: 'Lao Tzu', era: 'Ancient Chinese' },
  { id: 'q10', text: 'No man ever steps in the same river twice, for it is not the same river and he is not the same man.', author: 'Heraclitus', era: 'Pre-Socratic' },
  { id: 'q11', text: 'Patience is the key to relief.', author: 'Ali ibn Abi Talib', era: 'Islamic Golden Age' },
  { id: 'q12', text: 'Seek knowledge from the cradle to the grave.', author: 'Prophet Muhammad ﷺ', era: 'Islamic' },
];

const JOB_LISTINGS = [
  { id: 'j1', title: 'Senior React Developer', company: 'NEXUS Corp', location: 'Remote', type: 'Full-time', salary: '$120K-160K', skills: ['React', 'TypeScript', 'Node.js'], posted: '2d ago' },
  { id: 'j2', title: 'AI/ML Research Engineer', company: 'Quantum Labs', location: 'San Francisco', type: 'Full-time', salary: '$150K-200K', skills: ['Python', 'PyTorch', 'NLP'], posted: '1d ago' },
  { id: 'j3', title: 'Blockchain Developer', company: 'CryptoVerse', location: 'Dubai', type: 'Full-time', salary: '$130K-170K', skills: ['Solidity', 'Web3.js', 'Ethereum'], posted: '3d ago' },
  { id: 'j4', title: 'UX/UI Designer', company: 'Aether Design', location: 'London', type: 'Contract', salary: '£80K-110K', skills: ['Figma', 'Design Systems', 'Prototyping'], posted: '5d ago' },
  { id: 'j5', title: 'DevOps Engineer', company: 'CloudNexus', location: 'Berlin', type: 'Full-time', salary: '€90K-120K', skills: ['Kubernetes', 'AWS', 'Terraform'], posted: '1d ago' },
  { id: 'j6', title: 'Data Analyst', company: 'InfoPulse', location: 'Baghdad', type: 'Full-time', salary: '$40K-60K', skills: ['SQL', 'Python', 'Tableau'], posted: '4d ago' },
  { id: 'j7', title: 'Freelance Content Writer', company: 'MediaFlow', location: 'Remote', type: 'Freelance', salary: '$30-60/hr', skills: ['SEO', 'Copywriting', 'Research'], posted: '2d ago' },
  { id: 'j8', title: 'Mobile App Developer', company: 'AppForge', location: 'Tokyo', type: 'Full-time', salary: '¥10M-14M', skills: ['React Native', 'Swift', 'Kotlin'], posted: '6d ago' },
];

const INDUSTRY_SECTORS = [
  { id: 'ind1', name: 'Technology & Software', icon: '💻', growth: '+12.4%', jobs: '4.2M', description: 'Cloud, AI/ML, cybersecurity, SaaS, and enterprise platforms.' },
  { id: 'ind2', name: 'Manufacturing & Industry', icon: '🏭', growth: '+3.8%', jobs: '12.1M', description: 'Automotive, aerospace, electronics, and smart manufacturing.' },
  { id: 'ind3', name: 'Agriculture & Food', icon: '🌾', growth: '+2.1%', jobs: '1.1B', description: 'Precision farming, agritech, food processing, and sustainability.' },
  { id: 'ind4', name: 'Energy & Renewables', icon: '⚡', growth: '+8.7%', jobs: '67M', description: 'Solar, wind, hydrogen, nuclear, and energy storage systems.' },
  { id: 'ind5', name: 'Healthcare & Biotech', icon: '🧬', growth: '+7.2%', jobs: '59M', description: 'Pharmaceuticals, medical devices, telemedicine, and genomics.' },
  { id: 'ind6', name: 'Finance & FinTech', icon: '🏦', growth: '+9.1%', jobs: '28M', description: 'Digital banking, blockchain, insurance tech, and payments.' },
  { id: 'ind7', name: 'Construction & Real Estate', icon: '🏗️', growth: '+4.5%', jobs: '220M', description: 'Smart buildings, green construction, and proptech innovation.' },
  { id: 'ind8', name: 'Retail & E-Commerce', icon: '🛍️', growth: '+11.3%', jobs: '350M', description: 'Online marketplaces, D2C brands, and omnichannel retail.' },
];

const NEWS_ARTICLES = [
  { id: 'n1', title: 'Global AI Summit Concludes with Ethics Framework Agreement', category: 'Technology', region: 'Global', source: 'NEXUS News Wire', time: '2h ago', neutral: true },
  { id: 'n2', title: 'Renewable Energy Investments Surpass $500B Globally', category: 'Energy', region: 'Global', source: 'Green Pulse', time: '4h ago', neutral: true },
  { id: 'n3', title: 'New Archaeological Discovery in Mesopotamia Reveals Ancient Trade Routes', category: 'History', region: 'Middle East', source: 'Heritage Today', time: '6h ago', neutral: true },
  { id: 'n4', title: 'Quantum Computing Milestone: 1000-Qubit Processor Achieved', category: 'Technology', region: 'North America', source: 'Tech Pulse', time: '8h ago', neutral: true },
  { id: 'n5', title: 'Global Education Initiative Launches Free STEM Courses in 40 Languages', category: 'Education', region: 'Global', source: 'EduWorld', time: '10h ago', neutral: true },
  { id: 'n6', title: 'Space Tourism Companies Report Record Bookings', category: 'Space', region: 'Global', source: 'Orbit News', time: '12h ago', neutral: true },
  { id: 'n7', title: 'Mediterranean Diet Study Shows 30% Reduction in Heart Disease Risk', category: 'Health', region: 'Europe', source: 'MedHealth', time: '1d ago', neutral: true },
  { id: 'n8', title: 'Self-Driving Vehicle Regulations Harmonized Across 12 Nations', category: 'Transport', region: 'Global', source: 'AutoPulse', time: '1d ago', neutral: true },
];

const ARTS_GALLERY = [
  { id: 'a1', title: 'Digital Renaissance', category: 'Digital Art', artist: 'Studio Aether', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400' },
  { id: 'a2', title: 'Neon Couture SS27', category: 'Fashion', artist: 'Void Collective', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400' },
  { id: 'a3', title: 'Urban Decay Series', category: 'Photography', artist: 'Kai Lens', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400' },
  { id: 'a4', title: 'Geometric Horizons', category: 'Architecture', artist: 'PolyForm Studio', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400' },
  { id: 'a5', title: 'Calligraphy in Motion', category: 'Calligraphy', artist: 'Noor Al-Khat', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400' },
  { id: 'a6', title: 'Synth Dreams Exhibition', category: 'Music Art', artist: 'Waveform Labs', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400' },
];

const DEFAULT_DATA = {
  bookmarks: [],
  readingProgress: {},
  savedJobs: [],
  newsFilters: { category: 'all', region: 'all' },
};

class KnowledgeService {
  getData() {
    try {
      const raw = localStorage.getItem(KNOWLEDGE_KEY);
      if (!raw) { this.save(DEFAULT_DATA); return { ...DEFAULT_DATA }; }
      return JSON.parse(raw);
    } catch { return { ...DEFAULT_DATA }; }
  }

  save(data) { localStorage.setItem(KNOWLEDGE_KEY, JSON.stringify(data)); }

  // Library
  getBooks() { return BOOK_CATALOG; }
  searchBooks(q) {
    const query = q.toLowerCase();
    return BOOK_CATALOG.filter((b) => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query) || b.category.toLowerCase().includes(query));
  }
  toggleBookmark(bookId) {
    const data = this.getData();
    const idx = data.bookmarks.indexOf(bookId);
    if (idx >= 0) data.bookmarks.splice(idx, 1);
    else data.bookmarks.push(bookId);
    this.save(data);
    return data.bookmarks;
  }
  getBookmarks() { return this.getData().bookmarks; }

  // Philosophy
  getQuotes() { return PHILOSOPHY_QUOTES; }

  // Careers
  getJobs() { return JOB_LISTINGS; }
  searchJobs(q) {
    const query = q.toLowerCase();
    return JOB_LISTINGS.filter((j) => j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query) || j.skills.some((s) => s.toLowerCase().includes(query)));
  }
  toggleSaveJob(jobId) {
    const data = this.getData();
    const idx = data.savedJobs.indexOf(jobId);
    if (idx >= 0) data.savedJobs.splice(idx, 1);
    else data.savedJobs.push(jobId);
    this.save(data);
    return data.savedJobs;
  }

  // Industry
  getSectors() { return INDUSTRY_SECTORS; }

  // News
  getNews() { return NEWS_ARTICLES; }
  getFilteredNews(category = 'all', region = 'all') {
    return NEWS_ARTICLES.filter((n) => {
      const catMatch = category === 'all' || n.category === category;
      const regMatch = region === 'all' || n.region === region;
      return catMatch && regMatch;
    });
  }

  // Arts
  getArtsGallery() { return ARTS_GALLERY; }
}

const knowledgeService = new KnowledgeService();
export default knowledgeService;
