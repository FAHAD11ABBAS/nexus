// src/services/ghostModeService.js
// Ghost & Stealth Privacy Shield Service for anonymous browsing & communication

const GHOST_STORAGE_KEY = 'nexus_ghost_mode_v1';

class GhostModeService {
  isGhostModeActive() {
    try {
      return localStorage.getItem(GHOST_STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  setGhostMode(active) {
    try {
      localStorage.setItem(GHOST_STORAGE_KEY, active ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to set Ghost Mode:', e);
    }
    return active;
  }

  toggleGhostMode() {
    const current = this.isGhostModeActive();
    return this.setGhostMode(!current);
  }
}

export const ghostModeService = new GhostModeService();
export default ghostModeService;
