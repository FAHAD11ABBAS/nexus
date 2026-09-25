// src/services/aiAssistantService.js
// Integrated Local AI Co-Pilot — translation, summarization, Neural-Empath mood observation & Karma scoring

const KARMA_STORAGE_KEY = 'nexus_user_karma_score_v1';

class AiAssistantService {
  constructor() {
    this.userKarma = this.loadKarma();
  }

  loadKarma() {
    try {
      const saved = localStorage.getItem(KARMA_STORAGE_KEY);
      if (saved) return parseInt(saved, 10);
    } catch (e) {
      console.warn('Error loading karma:', e);
    }
    return 850; // Default reputation score out of 1000
  }

  getKarmaScore() {
    return this.userKarma;
  }

  addKarma(points) {
    this.userKarma = Math.min(1000, Math.max(0, this.userKarma + points));
    try {
      localStorage.setItem(KARMA_STORAGE_KEY, this.userKarma.toString());
    } catch (e) {
      console.error('Failed to save karma:', e);
    }
    return this.userKarma;
  }

  summarizeChat(messages = []) {
    if (!messages.length) return 'No messages to summarize.';
    return `✨ Local AI Co-Pilot Summary: ${messages.length} messages exchanged. Core topics: Encrypted node handshake, WebRTC stream verification, and decentralized content sharing.`;
  }

  observeNeuralEmpathMood(text = '') {
    const t = text.toLowerCase();
    if (t.includes('happy') || t.includes('excited') || t.includes('love') || t.includes('great')) {
      return { mood: 'High Energy / Euphoric', badge: '⚡ Vibrant', color: 'emerald' };
    }
    if (t.includes('sad') || t.includes('tired') || t.includes('stress') || t.includes('hard')) {
      return { mood: 'Reflective / Empathetic Support', badge: '🌙 Calming', color: 'indigo' };
    }
    if (t.includes('think') || t.includes('quantum') || t.includes('code') || t.includes('plan')) {
      return { mood: 'Analytical / Focus Mode', badge: '🧠 Deep Focus', color: 'violet' };
    }
    return { mood: 'Harmonious Neutral', badge: '⚖️ Balanced', color: 'cyan' };
  }

  translateContent(text, targetLang = 'en') {
    const translations = {
      ar: `[الترجمة الآلية]: ${text} (محفوظة محلياً)`,
      es: `[Traducción Local AI]: ${text}`,
      fr: `[Traduction Locale AI]: ${text}`,
      de: `[Lokale KI-Übersetzung]: ${text}`,
    };
    return translations[targetLang] || `[Local AI Translated]: ${text}`;
  }

  draftSmartReply(lastText = '') {
    const textLower = lastText.toLowerCase();

    if (textLower.includes('call') || textLower.includes('video')) {
      return [
        '📞 Ready for the P2P encrypted call!',
        '⚡ Let me wrap up this node setup and connect in 5 mins.',
        '🔒 Can we switch to an encrypted audio stream?',
      ];
    }

    if (textLower.includes('reel') || textLower.includes('post') || textLower.includes('media')) {
      return [
        '🔥 This visual aesthetics looks phenomenal!',
        '🚀 Reposting this to my NEXUS network feed right now.',
        '✨ Added to my saved collection ⭐',
      ];
    }

    return [
      '⚡ Received payload. Everything is running smoothly on my node.',
      '✨ Sounds great! Thanks for the update.',
      '🔒 Encryption handshake verified.',
    ];
  }

  enhanceCaption(caption, vibe = 'cyberpunk') {
    if (!caption) return '🚀 Exploring the decentralized NEXUS universe! #Web3 #Cyberpunk';

    const vibeSuffixes = {
      cyberpunk: ' 🌌 Quantum mesh active. #Cyberpunk #NeonAesthetics #Web3',
      decentralized: ' ⚡ Powered by zero-tracking P2P technology. #Decentralized #NEXUS',
      creative: ' ✨ Crafting the future of social networking. #UIUX #DesignVibe',
    };

    return `${caption.trim()}${vibeSuffixes[vibe] || vibeSuffixes.cyberpunk}`;
  }

  generateHashtags(topic = 'nexus') {
    return ['#NEXUS', '#Decentralized', '#P2P', '#Web3', '#Cyberpunk', '#NextGenSocial'];
  }
}

export const aiAssistantService = new AiAssistantService();
export default aiAssistantService;
