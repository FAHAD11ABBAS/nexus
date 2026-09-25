// src/services/ghostNexusService.js
// Ghost NEXUS Anonymous Ecosystem — absolute identity masking with ephemeral handles

const GHOST_KEY = 'nexus_ghost_nexus';
const ANONYMOUS_COMMENTS_KEY = 'nexus_anon_comments';

function generateGhostHandle() {
  const adjectives = ['Phantom', 'Shadow', 'Nebula', 'Void', 'Cipher', 'Specter', 'Eclipse', 'Aether', 'Mirage', 'Wraith'];
  const nouns = ['Pulse', 'Signal', 'Node', 'Flux', 'Vector', 'Shard', 'Drift', 'Arc', 'Rift', 'Wave'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${adj}${noun}#${num}`;
}

const DEFAULT_SETTINGS = {
  isGhostNexusActive: false,
  ghostHandle: generateGhostHandle(),
  anonymousPostsEnabled: true,
  anonymousCommentsEnabled: true,
  perChatAnonymous: [], // array of chatId strings
};

class GhostNexusService {
  constructor() {
    const saved = localStorage.getItem(GHOST_KEY);
    if (!saved) {
      localStorage.setItem(GHOST_KEY, JSON.stringify(DEFAULT_SETTINGS));
    }
  }

  getSettings() {
    return JSON.parse(localStorage.getItem(GHOST_KEY) || JSON.stringify(DEFAULT_SETTINGS));
  }

  toggleGlobalAnonymous() {
    const s = this.getSettings();
    s.isGhostNexusActive = !s.isGhostNexusActive;
    localStorage.setItem(GHOST_KEY, JSON.stringify(s));
    return s.isGhostNexusActive;
  }

  regenerateHandle() {
    const s = this.getSettings();
    s.ghostHandle = generateGhostHandle();
    localStorage.setItem(GHOST_KEY, JSON.stringify(s));
    return s.ghostHandle;
  }

  toggleChatAnonymous(chatId) {
    const s = this.getSettings();
    const idx = s.perChatAnonymous.indexOf(chatId);
    if (idx === -1) {
      s.perChatAnonymous.push(chatId);
    } else {
      s.perChatAnonymous.splice(idx, 1);
    }
    localStorage.setItem(GHOST_KEY, JSON.stringify(s));
    return s.perChatAnonymous.includes(chatId);
  }

  isChatAnonymous(chatId) {
    const s = this.getSettings();
    return s.isGhostNexusActive || s.perChatAnonymous.includes(chatId);
  }

  getDisplayName(realName) {
    const s = this.getSettings();
    return s.isGhostNexusActive ? s.ghostHandle : realName;
  }

  // Anonymously post a comment; stored locally only
  postAnonymousComment(postId, text) {
    const comments = JSON.parse(localStorage.getItem(ANONYMOUS_COMMENTS_KEY) || '[]');
    const s = this.getSettings();
    const comment = {
      id: `anon-${Date.now()}`,
      postId,
      text,
      ghostHandle: s.ghostHandle,
      timestamp: new Date().toISOString(),
    };
    comments.push(comment);
    localStorage.setItem(ANONYMOUS_COMMENTS_KEY, JSON.stringify(comments));
    return comment;
  }

  getAnonymousComments(postId) {
    const comments = JSON.parse(localStorage.getItem(ANONYMOUS_COMMENTS_KEY) || '[]');
    return comments.filter((c) => c.postId === postId);
  }
}

const ghostNexusService = new GhostNexusService();
export default ghostNexusService;
