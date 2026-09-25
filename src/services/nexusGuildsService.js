// src/services/nexusGuildsService.js
// NEXUS Guilds — Decentralized Discord/Telegram Alternative Community Hub (zero-cost client-side)

const GUILDS_STORAGE_KEY = 'nexus_guilds_data_v1';

export const DEFAULT_GUILDS = [
  {
    id: 'guild-devs',
    name: 'NEXUS Autonomous Developers',
    tag: 'DEV-GUILD',
    iconEmoji: '🧑‍💻',
    description: 'Full-stack React, AI Engineering, and Decentralized Open-Core Guild.',
    membersCount: 4890,
    onlineCount: 420,
    roles: ['Core Architect', 'Contributor', 'Member'],
    activeVoiceChannel: {
      name: '🔊 P2P Audio Stage (6 active)',
      speakers: ['Aria Chen', 'Elena Rostova', 'Marcus Vance', 'Alex Chen'],
    },
    channels: [
      { id: 'ch-general', name: '💬 general-chat', type: 'text' },
      { id: 'ch-code', name: '💻 code-snippets', type: 'text' },
      { id: 'ch-voice-stage', name: '🔊 P2P Audio Stage', type: 'voice' },
    ],
    messages: [
      { id: 'm-1', author: 'Aria Chen', role: 'Core Architect', text: 'Welcome to the Autonomous Developer Guild! Check pinned specs for BYOK vault details.', time: '10m ago' },
      { id: 'm-2', author: 'Marcus Vance', role: 'Contributor', text: 'The live code preview iframe in AI Studio is running at 60fps 🔥', time: '5m ago' },
    ],
    pinnedMessages: [
      '📌 Guild Rules: Strict Digital Neutrality, zero spam, open-source contribution focus.',
    ],
  },
  {
    id: 'guild-quantum',
    name: 'Quantum Physics & Philosophy',
    tag: 'QUANTUM',
    iconEmoji: '⚛️',
    description: 'Explorations in Panpsychism, Antikythera mechanics, and Hadal zone biology.',
    membersCount: 3120,
    onlineCount: 290,
    roles: ['Quantum Scholar', 'Observer'],
    activeVoiceChannel: {
      name: '🔊 Socratic Discussion Circle (4 active)',
      speakers: ['Prof. Tanaka', 'Dr. Al-Hassan'],
    },
    channels: [
      { id: 'ch-philosophy', name: '🧠 socratic-discourse', type: 'text' },
      { id: 'ch-voice-quantum', name: '🔊 Socratic Discussion Circle', type: 'voice' },
    ],
    messages: [
      { id: 'm-3', author: 'Prof. Tanaka', role: 'Quantum Scholar', text: 'Does quantum coherence in neural microtubules suggest panpsychism?', time: '12m ago' },
    ],
    pinnedMessages: [
      '📌 Weekly Socratic Discussion starts at 20:00 UTC.',
    ],
  },
];

class NexusGuildsService {
  constructor() {
    this.guilds = this.loadGuilds();
  }

  loadGuilds() {
    try {
      const saved = localStorage.getItem(GUILDS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading guilds:', e);
    }
    this.saveGuilds(DEFAULT_GUILDS);
    return DEFAULT_GUILDS;
  }

  saveGuilds(guilds) {
    this.guilds = guilds;
    try {
      localStorage.setItem(GUILDS_STORAGE_KEY, JSON.stringify(guilds));
    } catch (e) {
      console.error('Failed to save guilds:', e);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus_guilds_updated', { detail: guilds }));
    }
  }

  getGuilds() {
    return this.guilds;
  }

  getGuildById(id) {
    return this.guilds.find((g) => g.id === id) || this.guilds[0];
  }

  sendGuildMessage(guildId, text, author = 'You', role = 'Member') {
    const guilds = this.guilds.map((g) => {
      if (g.id === guildId) {
        const newMsg = {
          id: `m-${Date.now()}`,
          author,
          role,
          text,
          time: 'Just now',
        };
        return {
          ...g,
          messages: [...g.messages, newMsg],
        };
      }
      return g;
    });

    this.saveGuilds(guilds);
    return this.getGuildById(guildId);
  }
}

const nexusGuildsService = new NexusGuildsService();
export default nexusGuildsService;
