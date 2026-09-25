// src/services/nexusAcademyService.js
// NEXUS Academy — Autonomous Learning Management System (LMS), Quizzes & Certificate Generator

const ACADEMY_STORAGE_KEY = 'nexus_academy_progress_v1';

export const COURSES_CATALOG = [
  {
    id: 'course-web3',
    title: 'Full-Stack Decentralized Web Development',
    category: 'engineering',
    iconEmoji: '💻',
    level: 'Intermediate',
    duration: '6 Modules',
    description: 'Master React, Open-Core plugin architecture, P2P WebRTC calls, and zero-cost client state.',
    modules: [
      { id: 'm-1', title: '1. Modular Plugin Engine Architecture', status: 'completed' },
      { id: 'm-2', title: '2. P2P Encrypted Handshakes & WebRTC Streams', status: 'in-progress' },
      { id: 'm-3', title: '3. Local Storage Cryptographic State Machine', status: 'locked' },
    ],
    quiz: {
      question: 'What is the primary advantage of an Open-Core Client-Side Architecture in NEXUS?',
      options: [
        'Zero server-side financial maintenance costs & absolute client sovereignty',
        'Slower response times across mobile nodes',
        'Requires continuous cloud database subscriptions',
      ],
      correctAnswer: 0,
    },
  },
  {
    id: 'course-ai',
    title: 'Autonomous AI Engineering & Poly-Engine Design',
    category: 'ai',
    iconEmoji: '🧠',
    level: 'Advanced',
    duration: '8 Modules',
    description: 'BYOK API vault integration, Socratic reasoning engines, and local LLM prompt engineering.',
    modules: [
      { id: 'm-4', title: '1. BYOK API Key Encryption & Vault Architecture', status: 'completed' },
      { id: 'm-5', title: '2. Socratic Dialectical Reasoning Models', status: 'completed' },
    ],
    quiz: {
      question: 'How does BYOK (Bring-Your-Own-Key) preserve user privacy and lower platform costs?',
      options: [
        'Keys are routed through expensive proxy servers',
        'Keys are encrypted locally in the browser with direct client-to-API requests',
        'Keys are publicly shared in the feed',
      ],
      correctAnswer: 1,
    },
  },
  {
    id: 'course-quantum',
    title: 'Quantum Physics & Consciousness Philosophy',
    category: 'science',
    iconEmoji: '⚛️',
    level: 'Scholar',
    duration: '5 Modules',
    description: 'Explore Hadal Hadal Hadal Hadal zone extremophiles, Antikythera mechanics, and Panpsychism.',
    modules: [
      { id: 'm-6', title: '1. Antikythera Mechanism Astronomical Alignment', status: 'completed' },
      { id: 'm-7', title: '2. Panpsychism & Quantum Microtubule Coherence', status: 'completed' },
    ],
    quiz: {
      question: 'What does the Dark Forest solution to the Fermi Paradox suggest?',
      options: [
        'Civilizations remain silent to avoid technological predation',
        'Stars are made of dark matter',
        'Aliens have visited Earth openly',
      ],
      correctAnswer: 0,
    },
  },
];

class NexusAcademyService {
  constructor() {
    this.progress = this.loadProgress();
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem(ACADEMY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading academy progress:', e);
    }
    return {
      completedCourses: ['course-web3', 'course-ai'],
      certificates: [
        {
          id: 'cert-101',
          courseTitle: 'Autonomous AI Engineering & Poly-Engine Design',
          studentName: 'NEXUS Scholar Node',
          issueDate: new Date().toLocaleDateString(),
          hash: '0x9948271a',
        },
      ],
    };
  }

  saveProgress(progress) {
    this.progress = progress;
    try {
      localStorage.setItem(ACADEMY_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save academy progress:', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus_academy_updated', { detail: progress }));
    }
  }

  getProgress() {
    return this.progress;
  }

  issueCertificate(courseTitle) {
    const cert = {
      id: `cert-${Date.now()}`,
      courseTitle,
      studentName: 'NEXUS Certified Node',
      issueDate: new Date().toLocaleDateString(),
      hash: `0x${Math.random().toString(16).substring(2, 10)}`,
    };

    const updatedCerts = [...this.progress.certificates, cert];
    this.saveProgress({ ...this.progress, certificates: updatedCerts });
    return cert;
  }
}

const nexusAcademyService = new NexusAcademyService();
export default nexusAcademyService;
