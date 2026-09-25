// src/plugins/pluginEngine.js
// Open-Core Modular Plugin Architecture — client-side dynamic micro-plugins engine

const PLUGIN_STORAGE_KEY = 'nexus_installed_plugins_v1';

/**
 * Built-in default micro-plugins for NEXUS Super App
 */
export const BUILTIN_PLUGINS = [
  {
    id: 'quantum-translator',
    name: 'Quantum Neural Translator',
    version: '2.4.0',
    author: 'NEXUS Core AI',
    description: 'Real-time client-side translation across 10+ languages with automatic RTL detection.',
    category: 'AI & Language',
    icon: 'Languages',
    enabled: true,
    isBuiltin: true,
    permissions: ['read_messages', 'ui_overlay'],
    config: { autoTranslate: true, targetLang: 'en' },
  },
  {
    id: 'bio-sentinel-monitor',
    name: 'Bio-Metric Wildlife Sentinel',
    version: '1.8.2',
    author: 'Eco-Sentinel Collective',
    description: 'Tracks endangered species GPS alerts and marine abyss Hadal zone sensor networks.',
    category: 'Cosmic & Bio',
    icon: 'Leaf',
    enabled: true,
    isBuiltin: true,
    permissions: ['explore_feed', 'notifications'],
    config: { alertSeverity: 'high', autoRefreshMin: 15 },
  },
  {
    id: 'cyber-karma-gauge',
    name: 'Decentralized Karma Micro-Gauge',
    version: '3.1.0',
    author: 'NEXUS Reputation DAO',
    description: 'Calculates community trust scores, verified contribution weight, and peer upvotes.',
    category: 'Reputation',
    icon: 'Award',
    enabled: true,
    isBuiltin: true,
    permissions: ['profile', 'karma_write'],
    config: { displayBadgeOnPosts: true, minimumKarmaThreshold: 10 },
  },
  {
    id: 'spacex-launch-tracker',
    name: 'SpaceX & NASA Orbital Gate',
    version: '4.0.1',
    author: 'Deep Space Agency',
    description: 'Live countdowns, orbital telemetry feeds, and JWST deep imagery stream.',
    category: 'Astronomy',
    icon: 'Rocket',
    enabled: true,
    isBuiltin: true,
    permissions: ['astronomy_hub'],
    config: { notifyLaunchMinutes: 30, showStream: true },
  },
  {
    id: 'decoy-panic-defense',
    name: 'Decoy Emergency Field Defense',
    version: '1.0.0',
    author: 'Privacy Sovereignty Lab',
    description: 'Instant Cmd+Shift+P hotkey panic trigger replacing UI with clean notes screen.',
    category: 'Privacy',
    icon: 'ShieldAlert',
    enabled: true,
    isBuiltin: true,
    permissions: ['system_hotkey', 'ui_override'],
    config: { shortcut: 'Cmd+Shift+P', decoyType: 'notes' },
  },
  {
    id: 'smart-watermark-injector',
    name: 'NEXUS Smart Watermark Engine',
    version: '2.0.0',
    author: 'NEXUS Security',
    description: 'Applies cryptographic neon watermarks to shared media assets before export.',
    category: 'Security',
    icon: 'Stamp',
    enabled: true,
    isBuiltin: true,
    permissions: ['media_export'],
    config: { waterMarkText: 'NEXUS Encrypted Asset', opacity: 0.75 },
  },
  {
    id: 'spatial-audio-synthesizer',
    name: 'Spatial WebRTC Audio Equalizer',
    version: '1.2.0',
    author: 'Audio Synthesis Node',
    description: 'Noise suppression and spatial 3D audio enhancement for WebRTC P2P calls.',
    category: 'Communication',
    icon: 'Volume2',
    enabled: false,
    isBuiltin: true,
    permissions: ['webrtc_audio'],
    config: { noiseCancellation: true, spatialMode: 'cinematic' },
  },
];

class PluginEngine {
  constructor() {
    this.plugins = this.loadPlugins();
    this.listeners = new Set();
  }

  loadPlugins() {
    try {
      const saved = localStorage.getItem(PLUGIN_STORAGE_KEY);
      if (saved) {
        const storedPlugins = JSON.parse(saved);
        const merged = [...BUILTIN_PLUGINS];
        storedPlugins.forEach((sp) => {
          const existingIdx = merged.findIndex((p) => p.id === sp.id);
          if (existingIdx !== -1) {
            merged[existingIdx] = { ...merged[existingIdx], ...sp };
          } else {
            merged.push(sp);
          }
        });
        return merged;
      }
    } catch (e) {
      console.warn('Error loading plugin state:', e);
    }
    this.savePlugins(BUILTIN_PLUGINS);
    return BUILTIN_PLUGINS;
  }

  savePlugins(plugins) {
    try {
      localStorage.setItem(PLUGIN_STORAGE_KEY, JSON.stringify(plugins));
    } catch (e) {
      console.error('Failed to save plugins:', e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.plugins));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nexus_plugins_updated', { detail: this.plugins }));
    }
  }

  getPlugins() {
    return this.plugins;
  }

  getEnabledPlugins() {
    return this.plugins.filter((p) => p.enabled);
  }

  isPluginEnabled(id) {
    const p = this.plugins.find((item) => item.id === id);
    return p ? p.enabled : false;
  }

  togglePlugin(id) {
    this.plugins = this.plugins.map((p) => {
      if (p.id === id) {
        return { ...p, enabled: !p.enabled };
      }
      return p;
    });
    this.savePlugins(this.plugins);
    return this.isPluginEnabled(id);
  }

  updatePluginConfig(id, newConfig) {
    this.plugins = this.plugins.map((p) => {
      if (p.id === id) {
        return { ...p, config: { ...p.config, ...newConfig } };
      }
      return p;
    });
    this.savePlugins(this.plugins);
  }

  installCustomPlugin(pluginData) {
    const id = pluginData.id || `custom-${Date.now()}`;
    const newPlugin = {
      id,
      name: pluginData.name || 'Custom Micro-Plugin',
      version: pluginData.version || '1.0.0',
      author: pluginData.author || 'User Registered',
      description: pluginData.description || 'Custom client-side plugin',
      category: pluginData.category || 'Custom',
      icon: pluginData.icon || 'Cpu',
      enabled: true,
      isBuiltin: false,
      permissions: pluginData.permissions || ['custom'],
      config: pluginData.config || {},
      code: pluginData.code || '',
    };

    const existingIdx = this.plugins.findIndex((p) => p.id === id);
    if (existingIdx !== -1) {
      this.plugins[existingIdx] = newPlugin;
    } else {
      this.plugins.push(newPlugin);
    }
    this.savePlugins(this.plugins);
    return newPlugin;
  }

  uninstallPlugin(id) {
    this.plugins = this.plugins.filter((p) => p.id !== id || p.isBuiltin);
    this.savePlugins(this.plugins);
  }

  executeHook(hookName, payload = {}) {
    const enabledPlugins = this.getEnabledPlugins();
    let modifiedPayload = { ...payload };

    enabledPlugins.forEach((plugin) => {
      if (plugin.id === 'quantum-translator' && hookName === 'translate_message') {
        modifiedPayload.translated = true;
      }
      if (plugin.id === 'smart-watermark-injector' && hookName === 'watermark_media') {
        modifiedPayload.watermarkApplied = true;
      }
    });

    return modifiedPayload;
  }
}

const pluginEngine = new PluginEngine();
export default pluginEngine;
