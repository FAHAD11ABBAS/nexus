// src/services/communityService.js
// Telegram-style Broadcast Channels & Encrypted Super Communities Service

const STORAGE_CHANNELS_KEY = 'nexus_broadcast_channels_v1';

const INITIAL_CHANNELS = [
  {
    id: 'ch_official',
    type: 'broadcast', // 'broadcast' | 'supergroup'
    title: '⚡ NEXUS Official Signals',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    description: 'Official core updates, feature releases, and quantum mesh alerts.',
    subscribersCount: 142800,
    isSubscribed: true,
    owner: 'NEXUS Core',
    posts: [
      {
        id: 'cp_1',
        author: 'NEXUS Core',
        text: '🚀 NEXUS Super App Expansion Pack is live! Experience Web3 Tipping, Telegram-style Broadcast Channels, AI Co-Pilot, and Ghost Privacy Shield.',
        time: '1h ago',
        views: '45.2k',
      },
      {
        id: 'cp_2',
        author: 'NEXUS Core',
        text: '⚡ Decentralized node latency has reached a new record low of 1.2ms across all edge clusters.',
        time: '5h ago',
        views: '89.1k',
      },
    ],
  },
  {
    id: 'ch_neotokyo',
    type: 'broadcast',
    title: '🌌 Neo Tokyo Cyber Briefing',
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=150',
    description: 'Daily photography, visual vibe presets, and cyberpunk aesthetics from Tokyo.',
    subscribersCount: 68400,
    isSubscribed: false,
    owner: '@neonomad',
    posts: [
      {
        id: 'cp_3',
        author: '@neonomad',
        text: 'Night neon lights photography series #402 uploaded to Reels.',
        time: '3h ago',
        views: '18.4k',
      },
    ],
  },
  {
    id: 'ch_quantum_devs',
    type: 'supergroup',
    title: '💻 Quantum Developers Guild',
    avatar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150',
    description: 'Encrypted super group for Web3 engineers, P2P signaling, and AI builders.',
    subscribersCount: 24500,
    isSubscribed: true,
    owner: 'Elena Rostova',
    pinnedNotice: '📌 Anti-Spam Moderation Enforced: Zero self-promo or unverified links.',
    posts: [
      {
        id: 'cp_4',
        author: 'Aria Chen',
        text: 'Check out the new WebRTC data channel bandwidth specs in the docs!',
        time: '30m ago',
        views: '5.6k',
      },
    ],
  },
];

class CommunityService {
  getChannels() {
    try {
      const raw = localStorage.getItem(STORAGE_CHANNELS_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_CHANNELS_KEY, JSON.stringify(INITIAL_CHANNELS));
        return INITIAL_CHANNELS;
      }
      return JSON.parse(raw);
    } catch (e) {
      return INITIAL_CHANNELS;
    }
  }

  toggleSubscribe(channelId) {
    const channels = this.getChannels();
    const updated = channels.map((ch) => {
      if (ch.id === channelId) {
        const nextSub = !ch.isSubscribed;
        return {
          ...ch,
          isSubscribed: nextSub,
          subscribersCount: nextSub ? ch.subscribersCount + 1 : ch.subscribersCount - 1,
        };
      }
      return ch;
    });

    localStorage.setItem(STORAGE_CHANNELS_KEY, JSON.stringify(updated));
    return updated;
  }
}

export const communityService = new CommunityService();
export default communityService;
