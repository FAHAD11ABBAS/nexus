// src/services/privacyService.js
// NEXUS Absolute Privacy, Ghost & Security Suite
// Extends existing ghostNexusService with enhanced features

const PRIVACY_KEY = 'nexus_privacy_v1';

const DEFAULT_SETTINGS = {
  // Ghost Mode (enhanced)
  ghostModeEnabled: false,
  ghostHandle: generateGhostHandle(),

  // Read Receipts
  globalReadReceipts: true,
  perChatReadReceipts: {}, // { chatId: boolean }

  // PIN Lock
  pinEnabled: false,
  pinHash: null, // simple hash of PIN
  pinAttempts: 0,
  pinLockedUntil: null,
  biometricEnabled: false,

  // Panic Vault
  panicDecoyContent: 'calculator', // calculator | notes | weather
  panicCustomMessage: 'Quick Calculator',

  // Wipe History
  lastWipeDate: null,
};

function generateGhostHandle() {
  const adj = ['Phantom', 'Shadow', 'Nebula', 'Void', 'Cipher', 'Specter', 'Eclipse', 'Aether', 'Mirage', 'Wraith', 'Quantum', 'Stealth', 'Obsidian', 'Neon'];
  const nouns = ['Pulse', 'Signal', 'Node', 'Flux', 'Vector', 'Shard', 'Drift', 'Arc', 'Rift', 'Wave', 'Ghost', 'Core', 'Nexus', 'Zero'];
  const a = adj[Math.floor(Math.random() * adj.length)];
  const n = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${a}${n}#${num}`;
}

// Simple hash for PIN (not cryptographic - simulation only)
function hashPin(pin) {
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

class PrivacyService {
  getSettings() {
    try {
      const raw = localStorage.getItem(PRIVACY_KEY);
      if (!raw) {
        localStorage.setItem(PRIVACY_KEY, JSON.stringify(DEFAULT_SETTINGS));
        return { ...DEFAULT_SETTINGS };
      }
      return JSON.parse(raw);
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  save(settings) {
    localStorage.setItem(PRIVACY_KEY, JSON.stringify(settings));
  }

  // ── Ghost Mode ──
  isGhostMode() {
    return this.getSettings().ghostModeEnabled;
  }

  toggleGhostMode() {
    const s = this.getSettings();
    s.ghostModeEnabled = !s.ghostModeEnabled;
    if (s.ghostModeEnabled) {
      s.ghostHandle = generateGhostHandle();
    }
    this.save(s);
    return s;
  }

  regenerateHandle() {
    const s = this.getSettings();
    s.ghostHandle = generateGhostHandle();
    this.save(s);
    return s.ghostHandle;
  }

  getGhostHandle() {
    return this.getSettings().ghostHandle;
  }

  // ── Read Receipts ──
  getGlobalReadReceipts() {
    return this.getSettings().globalReadReceipts;
  }

  toggleGlobalReadReceipts() {
    const s = this.getSettings();
    s.globalReadReceipts = !s.globalReadReceipts;
    this.save(s);
    return s.globalReadReceipts;
  }

  getChatReadReceipt(chatId) {
    const s = this.getSettings();
    if (chatId in s.perChatReadReceipts) return s.perChatReadReceipts[chatId];
    return s.globalReadReceipts;
  }

  toggleChatReadReceipt(chatId) {
    const s = this.getSettings();
    const current = chatId in s.perChatReadReceipts ? s.perChatReadReceipts[chatId] : s.globalReadReceipts;
    s.perChatReadReceipts[chatId] = !current;
    this.save(s);
    return s.perChatReadReceipts[chatId];
  }

  // ── PIN Lock ──
  isPinEnabled() {
    return this.getSettings().pinEnabled;
  }

  setupPin(pin) {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) return false;
    const s = this.getSettings();
    s.pinEnabled = true;
    s.pinHash = hashPin(pin);
    s.pinAttempts = 0;
    s.pinLockedUntil = null;
    this.save(s);
    return true;
  }

  verifyPin(pin) {
    const s = this.getSettings();
    if (!s.pinEnabled) return true;

    // Check lockout
    if (s.pinLockedUntil && Date.now() < s.pinLockedUntil) {
      const remaining = Math.ceil((s.pinLockedUntil - Date.now()) / 1000);
      return { success: false, locked: true, remainingSeconds: remaining };
    }

    if (hashPin(pin) === s.pinHash) {
      s.pinAttempts = 0;
      s.pinLockedUntil = null;
      this.save(s);
      return { success: true };
    }

    s.pinAttempts += 1;
    if (s.pinAttempts >= 5) {
      s.pinLockedUntil = Date.now() + 60000; // 1 minute lockout
      s.pinAttempts = 0;
    }
    this.save(s);
    return { success: false, locked: false, attemptsLeft: 5 - s.pinAttempts };
  }

  removePin() {
    const s = this.getSettings();
    s.pinEnabled = false;
    s.pinHash = null;
    s.pinAttempts = 0;
    s.pinLockedUntil = null;
    this.save(s);
  }

  toggleBiometric() {
    const s = this.getSettings();
    s.biometricEnabled = !s.biometricEnabled;
    this.save(s);
    return s.biometricEnabled;
  }

  // ── Panic Vault ──
  getPanicSettings() {
    const s = this.getSettings();
    return { decoyContent: s.panicDecoyContent, customMessage: s.panicCustomMessage };
  }

  updatePanicSettings(decoyContent, customMessage) {
    const s = this.getSettings();
    s.panicDecoyContent = decoyContent;
    s.panicCustomMessage = customMessage;
    this.save(s);
  }

  // ── One-Trace Data Wipe ──
  async performFullWipe() {
    // Clear all localStorage
    const keysToPreserve = ['nexus_lang']; // Keep language preference
    const preserved = {};
    for (const key of keysToPreserve) {
      preserved[key] = localStorage.getItem(key);
    }

    localStorage.clear();

    // Restore preserved keys
    for (const [key, value] of Object.entries(preserved)) {
      if (value) localStorage.setItem(key, value);
    }

    // Clear all IndexedDB databases
    const databases = ['nexus_office_db', 'nexus_studio_db'];
    for (const dbName of databases) {
      try {
        await new Promise((resolve, reject) => {
          const req = indexedDB.deleteDatabase(dbName);
          req.onsuccess = resolve;
          req.onerror = reject;
        });
      } catch (e) {
        console.warn(`Failed to delete IndexedDB: ${dbName}`, e);
      }
    }

    // Re-initialize privacy settings with wipe date
    const freshSettings = {
      ...DEFAULT_SETTINGS,
      lastWipeDate: new Date().toISOString(),
    };
    localStorage.setItem(PRIVACY_KEY, JSON.stringify(freshSettings));

    return true;
  }

  getLastWipeDate() {
    return this.getSettings().lastWipeDate;
  }
}

const privacyService = new PrivacyService();
export default privacyService;
