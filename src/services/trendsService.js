// src/services/trendsService.js
// Client-side trend and content intelligence engine supporting socio-cultural discourses, healthcare, parenting, and global trends.

class TrendsService {
  constructor() {
    this.categories = [
      { id: 'all', label: '🔥 All Trends', icon: 'Sparkles' },
      { id: 'trends', label: '🌐 Global & Politics', icon: 'Globe' },
      { id: 'ideologies', label: '⚖️ Ideologies & Discourse', icon: 'Scale' },
      { id: 'lifestyle', label: '💄 Lifestyle & Healthcare', icon: 'HeartHandshake' },
      { id: 'family', label: '👨‍👩‍👧 Family & Parenting', icon: 'Users' },
      { id: 'knowledge', label: '🔬 Science & Tech', icon: 'BookOpen' },
    ];

    this.trendItems = [
      // Global Trends & Politics
      {
        id: 'tr-101',
        category: 'trends',
        title: 'Global Energy Transition Accord 2026',
        subtitle: '194 Nations Sign Decentralized Grid Memorandum',
        stats: '248.5k posts',
        tag: 'GlobalAffairs',
        author: 'NEXUS Global Wire',
        verified: true,
        verificationType: 'official',
        summary: 'Delegates agree on zero-carbon decentralized power grids, driving clean energy transition across Europe, Asia, and the Americas.',
        neutralityNote: 'Digital Neutrality Verified: Unbiased summary of official diplomatic resolutions.',
        upvotes: 1420,
        commentsCount: 312,
        time: '2h ago',
      },
      {
        id: 'tr-102',
        category: 'trends',
        title: 'Cyber-Diplomacy & Autonomous AI Norms',
        subtitle: 'UN High Council debate on AI sovereignty',
        stats: '189.2k posts',
        tag: 'DiplomacyAI',
        author: 'Elena Rostova',
        verified: true,
        verificationType: 'scholar',
        summary: 'International policy experts analyze multi-polar regulation on autonomous agent operations in public infrastructure.',
        neutralityNote: 'Balanced multi-perspective synthesis.',
        upvotes: 980,
        commentsCount: 145,
        time: '4h ago',
      },

      // Ideologies & Societal Dynamics
      {
        id: 'tr-201',
        category: 'ideologies',
        title: 'Modern Feminism & Economic Autonomy in 2026',
        subtitle: 'Navigating Leadership, Family Balance, and Self-Realization',
        stats: '310.4k posts',
        tag: 'ModernFeminism',
        author: 'Dr. Sarah Al-Mansoor',
        verified: true,
        verificationType: 'scholar',
        summary: 'A deep look into contemporary feminist discourse: structural workplace equity, maternity freedoms, and financial independence.',
        neutralityNote: 'Strict Neutral Guardrail: Focuses on socio-economic research, dialogue, and mutual empowerment.',
        upvotes: 3410,
        commentsCount: 890,
        time: '1h ago',
      },
      {
        id: 'tr-202',
        category: 'ideologies',
        title: 'Masculinity, Redpill Awareness & Male Mental Health',
        subtitle: 'Re-evaluating Duty, Purpose, Fitness, and Emotional Resilience',
        stats: '275.8k posts',
        tag: 'MasculinityAwareness',
        author: 'Captain Marcus Vance',
        verified: true,
        verificationType: 'creator',
        summary: 'Discussions on self-discipline, mentorship for young men, physical vitality, and overcoming isolation in modern society.',
        neutralityNote: 'Strict Neutral Guardrail: Promotes constructive personal responsibility, physical wellness, and respectful brotherhood.',
        upvotes: 2890,
        commentsCount: 740,
        time: '3h ago',
      },
      {
        id: 'tr-203',
        category: 'ideologies',
        title: 'Societal Dynamics: The Future of Modern Relationships',
        subtitle: 'Bridging Ideological Gaps for Healthy Partnerships',
        stats: '198.1k posts',
        tag: 'SocietalDynamics',
        author: 'Sophia & David Chen',
        verified: true,
        verificationType: 'creator',
        summary: 'Relationship therapists explore how empathy, shared core values, and open communication harmonize modern expectations.',
        neutralityNote: 'Balanced perspective fostering mutual understanding.',
        upvotes: 1850,
        commentsCount: 420,
        time: '5h ago',
      },

      // Lifestyle, Fashion, Beauty & Healthcare
      {
        id: 'tr-301',
        category: 'lifestyle',
        title: 'Aesthetic Cyber-Fashion & Sustainable Streetwear',
        subtitle: 'Futuristic silhouettes with eco-conscious smart fabrics',
        stats: '142.0k posts',
        tag: 'CyberFashion2026',
        author: 'Aria Takahashi',
        verified: true,
        verificationType: 'creator',
        summary: 'Neomorphic minimalist designs combine metallic accents with recycled thermal textiles.',
        neutralityNote: 'Lifestyle & Design Trends.',
        upvotes: 2150,
        commentsCount: 180,
        time: '6h ago',
      },
      {
        id: 'tr-302',
        category: 'lifestyle',
        title: 'Doctor Medical Circle: Preventative Health & Bio-Optimization',
        subtitle: 'Evidence-Based Longevity Routines & Clinical Nutrition',
        stats: '412.3k posts',
        tag: 'MedicalKnowledge',
        author: 'Dr. Tariq Al-Hassan, M.D.',
        verified: true,
        verificationType: 'doctor',
        summary: 'Board-certified physicians share peer-reviewed advice on cardiovascular health, glucose stability, and circadian rhythm optimization.',
        neutralityNote: 'Verified Medical Circle: Content reviewed by certified healthcare professionals.',
        upvotes: 4890,
        commentsCount: 920,
        time: '30m ago',
      },

      // Family, Parenting, Mothers & Fathers
      {
        id: 'tr-401',
        category: 'family',
        title: 'Mothers Circle: Early Childhood Emotional Intelligence',
        subtitle: 'Nurturing Resilience, Mindful Parenting, and Screen-Time Boundaries',
        stats: '165.7k posts',
        tag: 'MothersCircle',
        author: 'Amira Benali',
        verified: true,
        verificationType: 'creator',
        summary: 'Mothers exchange practical strategies for gentle discipline, nutrition for toddler immunity, and balanced self-care.',
        neutralityNote: 'Parenting Support Hub.',
        upvotes: 1980,
        commentsCount: 450,
        time: '2h ago',
      },
      {
        id: 'tr-402',
        category: 'family',
        title: 'Fathers Guild: Active Fatherhood & Hands-On Guidance',
        subtitle: 'Building Life Skills, Adventure, and Strong Bond with Children',
        stats: '134.2k posts',
        tag: 'FathersGuild',
        author: 'Lucas Meyer',
        verified: true,
        verificationType: 'creator',
        summary: 'Fathers share experiences on active involvement, teaching financial literacy early, and balancing demanding careers with family time.',
        neutralityNote: 'Fatherhood Community Hub.',
        upvotes: 1760,
        commentsCount: 310,
        time: '4h ago',
      },

      // Knowledge & Science
      {
        id: 'tr-501',
        category: 'knowledge',
        title: 'Quantum Computing Break-Through in Room Temperature Superconductors',
        subtitle: 'Zero resistance at 15°C achieved by international research team',
        stats: '520.1k posts',
        tag: 'QuantumPhysics',
        author: 'Prof. Akira Tanaka',
        verified: true,
        verificationType: 'scholar',
        summary: 'Peer-reviewed research paper demonstrates ambient-pressure superconductivity with potential to revolutionize global energy grids.',
        neutralityNote: 'Academic & Technical Research.',
        upvotes: 6120,
        commentsCount: 1250,
        time: '1h ago',
      },
    ];
  }

  getCategories() {
    return this.categories;
  }

  getTrends(categoryId = 'all', searchQuery = '') {
    let filtered = this.trendItems;

    if (categoryId !== 'all') {
      filtered = filtered.filter((item) => item.category === categoryId);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q)
      );
    }

    return filtered;
  }

  upvoteTrend(id) {
    const item = this.trendItems.find((t) => t.id === id);
    if (item) {
      item.upvotes += 1;
      return item.upvotes;
    }
    return 0;
  }
}

const trendsService = new TrendsService();
export default trendsService;
