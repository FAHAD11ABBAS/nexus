// src/services/moderationService.js
// Advanced Privacy, Moderation & Account Lifecycle Control Service

const MODERATION_KEY = 'nexus_moderation_settings';

const DEFAULT_SETTINGS = {
  blockedUsers: [
    { id: 'user-b1', name: 'SpamNode_99', handle: '@spam_bot', date: '2026-09-10', type: 'permanent' },
  ],
  restrictedUsers: [],
  archivedChats: [],
  defaultSelfDestructTimer: 'off', // 'off' | '1h' | '24h' | '7d'
  accountStatus: 'active', // 'active' | 'deactivated'
  stealthModeEnabled: false,
};

class ModerationService {
  constructor() {
    this.init();
  }

  init() {
    const saved = localStorage.getItem(MODERATION_KEY);
    if (!saved) {
      localStorage.setItem(MODERATION_KEY, JSON.stringify(DEFAULT_SETTINGS));
    }
  }

  getSettings() {
    return JSON.parse(localStorage.getItem(MODERATION_KEY) || JSON.stringify(DEFAULT_SETTINGS));
  }

  blockUser(userId, userName, handle, type = 'permanent') {
    const settings = this.getSettings();
    if (!settings.blockedUsers.some((u) => u.id === userId)) {
      settings.blockedUsers.push({
        id: userId,
        name: userName,
        handle,
        date: new Date().toISOString().split('T')[0],
        type,
      });
      localStorage.setItem(MODERATION_KEY, JSON.stringify(settings));
    }
    return settings.blockedUsers;
  }

  unblockUser(userId) {
    const settings = this.getSettings();
    settings.blockedUsers = settings.blockedUsers.filter((u) => u.id !== userId);
    localStorage.setItem(MODERATION_KEY, JSON.stringify(settings));
    return settings.blockedUsers;
  }

  setSelfDestructDefault(timerOption) {
    const settings = this.getSettings();
    settings.defaultSelfDestructTimer = timerOption;
    localStorage.setItem(MODERATION_KEY, JSON.stringify(settings));
    return settings;
  }

  deactivateAccount() {
    const settings = this.getSettings();
    settings.accountStatus = 'deactivated';
    localStorage.setItem(MODERATION_KEY, JSON.stringify(settings));
    return true;
  }

  deleteAccountPermanently() {
    // Clear local storage and user session data
    localStorage.clear();
    return true;
  }
}

const moderationService = new ModerationService();
export default moderationService;
