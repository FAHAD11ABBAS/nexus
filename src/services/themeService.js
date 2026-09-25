// src/services/themeService.js
// Persistent Glassmorphism & Neon Customization Engine via localStorage

const THEME_STORAGE_KEY = 'nexus_theme_customizer_v1';

export const THEME_PRESETS = [
  {
    id: 'neon-green',
    name: 'Neon Green Singularity',
    primary: '#10b981', // emerald / neon green
    primaryGlow: '0 0 20px rgba(16, 185, 129, 0.4)',
    accent: '#34d399',
    badgeBorder: 'border-emerald-500 shadow-emerald-500/50',
    badgeText: 'text-emerald-400',
    bgGlass: 'rgba(15, 23, 42, 0.85)',
    blurAmount: '16px',
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Violet Matrix',
    primary: '#8b5cf6', // violet
    primaryGlow: '0 0 20px rgba(139, 92, 246, 0.4)',
    accent: '#a78bfa',
    badgeBorder: 'border-purple-500 shadow-purple-500/50',
    badgeText: 'text-purple-400',
    bgGlass: 'rgba(26, 16, 60, 0.85)',
    blurAmount: '16px',
  },
  {
    id: 'quantum-amber',
    name: 'Quantum Solar Amber',
    primary: '#f59e0b', // amber
    primaryGlow: '0 0 20px rgba(245, 158, 11, 0.4)',
    accent: '#fbbf24',
    badgeBorder: 'border-amber-500 shadow-amber-500/50',
    badgeText: 'text-amber-400',
    bgGlass: 'rgba(45, 26, 10, 0.85)',
    blurAmount: '16px',
  },
  {
    id: 'electric-cyan',
    name: 'Electric Cyan Pulse',
    primary: '#06b6d4', // cyan
    primaryGlow: '0 0 20px rgba(6, 182, 212, 0.4)',
    accent: '#22d3ee',
    badgeBorder: 'border-cyan-500 shadow-cyan-500/50',
    badgeText: 'text-cyan-400',
    bgGlass: 'rgba(10, 30, 45, 0.85)',
    blurAmount: '16px',
  },
  {
    id: 'obsidian-stealth',
    name: 'Obsidian Stealth Mode',
    primary: '#64748b', // slate
    primaryGlow: '0 0 20px rgba(100, 116, 139, 0.4)',
    accent: '#94a3b8',
    badgeBorder: 'border-slate-500 shadow-slate-500/50',
    badgeText: 'text-slate-300',
    bgGlass: 'rgba(5, 5, 10, 0.95)',
    blurAmount: '24px',
  },
];

class ThemeService {
  constructor() {
    this.currentTheme = this.loadTheme();
  }

  loadTheme() {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error loading theme:', e);
    }
    return THEME_PRESETS[0]; // Neon Green default
  }

  getTheme() {
    return this.currentTheme;
  }

  setTheme(presetId) {
    const preset = THEME_PRESETS.find((p) => p.id === presetId) || THEME_PRESETS[0];
    this.currentTheme = preset;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preset));
    } catch (e) {
      console.error('Failed to save theme:', e);
    }
    this.applyCSSVariables(preset);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus_theme_changed', { detail: preset }));
    }
    return preset;
  }

  applyCSSVariables(theme) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--nexus-primary', theme.primary);
    root.style.setProperty('--nexus-glow', theme.primaryGlow);
    root.style.setProperty('--nexus-bg-glass', theme.bgGlass);
    root.style.setProperty('--nexus-blur', theme.blurAmount);
  }
}

const themeService = new ThemeService();
export default themeService;
