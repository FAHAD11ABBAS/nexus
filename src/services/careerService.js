// src/services/careerService.js
// Multi-Disciplinary Knowledge & Free Career/Job Gigs Board service

const STORAGE_KEY = 'nexus_career_gigs';

const DEFAULT_GIGS = [
  {
    id: 'gig-1',
    title: 'Senior Web3 React & Tailwind Developer',
    company: 'NeoTokyo Labs',
    location: 'Remote Global',
    type: 'Full-Time',
    category: 'Engineering',
    pay: '120k - 160k NX / Year',
    postedBy: '@neotokyo_hr',
    verified: true,
    verificationType: 'official',
    description: 'Lead front-end architecture for next-gen decentralized social and encryption protocols.',
    tags: ['React', 'TailwindCSS', 'Web3', 'Encryption'],
    applicantsCount: 14,
    date: '1 day ago',
  },
  {
    id: 'gig-2',
    title: 'Medical AI Content Specialist & Reviewer',
    company: 'HealthNexus Global',
    location: 'Remote',
    type: 'Contract',
    category: 'Healthcare',
    pay: '60 NX / Hour',
    postedBy: '@dr_tariq',
    verified: true,
    verificationType: 'doctor',
    description: 'Review peer-written medical content, health bio-optimization studies, and wellness recommendations for accuracy.',
    tags: ['Medicine', 'Healthcare', 'Research', 'AI'],
    applicantsCount: 8,
    date: '2 days ago',
  },
  {
    id: 'gig-3',
    title: 'Creative Reels & UI Aesthetic Designer',
    company: 'Quantum Studios',
    location: 'Hybrid / Remote',
    type: 'Freelance',
    category: 'Design',
    pay: '2,500 NX / Project',
    postedBy: '@aria_design',
    verified: true,
    verificationType: 'creator',
    description: 'Design futuristic glassmorphism UI templates, motion graphics, and micro-animations for social campaigns.',
    tags: ['UI/UX', 'Motion', 'Figma', 'Glassmorphism'],
    applicantsCount: 22,
    date: '3 hours ago',
  },
  {
    id: 'gig-4',
    title: 'Socio-Cultural Researcher & Policy Analyst',
    company: 'Ethical Dynamics Institute',
    location: 'Remote',
    type: 'Part-Time',
    category: 'Research',
    pay: '45 NX / Hour',
    postedBy: '@elena_policy',
    verified: true,
    verificationType: 'scholar',
    description: 'Conduct balanced qualitative research on digital discourse, modern workplace equity, and parenting trends.',
    tags: ['Ethics', 'Sociology', 'Policy', 'Research'],
    applicantsCount: 5,
    date: 'Just now',
  },
];

class CareerService {
  constructor() {
    this.init();
  }

  init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_GIGS));
    }
  }

  getGigs(category = 'All', searchQuery = '') {
    const gigs = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DEFAULT_GIGS));
    return gigs.filter((gig) => {
      const matchesCat = category === 'All' || gig.category === category;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        gig.title.toLowerCase().includes(q) ||
        gig.company.toLowerCase().includes(q) ||
        gig.description.toLowerCase().includes(q) ||
        gig.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }

  createGig(newGigData) {
    const gigs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newGig = {
      id: `gig-${Date.now()}`,
      postedBy: '@nexus_user',
      verified: true,
      verificationType: 'creator',
      applicantsCount: 0,
      date: 'Just now',
      ...newGigData,
    };
    gigs.unshift(newGig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gigs));
    return newGig;
  }

  applyToGig(gigId) {
    const gigs = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const gig = gigs.find((g) => g.id === gigId);
    if (gig) {
      gig.applicantsCount = (gig.applicantsCount || 0) + 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gigs));
      return gig.applicantsCount;
    }
    return 0;
  }
}

const careerService = new CareerService();
export default careerService;
