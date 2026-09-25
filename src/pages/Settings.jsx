// src/pages/Settings.jsx
// Futuristic Settings page with language selector, RTL toggle, privacy controls, and adaptive performance

import { useTranslation } from 'react-i18next';
import {
  Globe,
  Shield,
  LogOut,
  Check,
  Radio,
  RefreshCw,
  MapPin,
  Flame,
  Bell,
  Send,
  Zap,
  Ghost,
  Wifi,
  Battery,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { SUPPORTED_LANGUAGES, getDirection } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { useGhostMode } from '@/context/GhostModeContext';
import useAdaptivePerformance from '@/hooks/useAdaptivePerformance';
import Avatar from '@/components/ui/Avatar';

import { useState } from 'react';
import AccountLifecycleModal from '@/components/profile/AccountLifecycleModal';
import GhostAnonymousModal from '@/components/ghost/GhostAnonymousModal';
import PrivacySovereigntyPanel from '@/components/privacy/PrivacySovereigntyPanel';
import { Palette, ShieldAlert, Fingerprint } from 'lucide-react';
import ghostNexusService from '@/services/ghostNexusService';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { currentUser, userProfile, logout } = useAuth();
  const { permissionStatus, requestPermission, triggerTestPush } = useNotifications();
  const { isGhostActive, toggleGhostMode } = useGhostMode();
  const {
    batteryLevel,
    isCharging,
    networkType,
    isDataSaverActive,
    toggleDataSaver,
    recommendedQuality,
  } = useAdaptivePerformance();

  const [showLifecycleModal, setShowLifecycleModal] = useState(false);
  const [showGhostModal, setShowGhostModal] = useState(false);
  const [showPrivacyPanel, setShowPrivacyPanel] = useState(false);
  const [ghostSettings, setGhostSettings] = useState(ghostNexusService.getSettings());
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('nexus_theme_preset') || 'cyber'
  );

  const THEMES = [
    { id: 'cyber', name: 'Cyberpunk Dark', color: 'from-indigo-600 to-purple-600' },
    { id: 'glass', name: 'Neon Glass', color: 'from-cyan-500 to-blue-600' },
    { id: 'emerald', name: 'Emerald Matrix', color: 'from-emerald-500 to-teal-700' },
    { id: 'solarized', name: 'Solarized Gold', color: 'from-amber-500 to-orange-600' },
    { id: 'pure_dark', name: 'Pure Midnight', color: 'from-slate-900 to-black' },
  ];

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('nexus_theme_preset', themeId);
    toast.success(`Theme updated to ${THEMES.find((t) => t.id === themeId)?.name}! 🎨`);
  };

  const currentLang = i18n.language || 'en';

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    const dir = getDirection(code);
    document.documentElement.lang = code;
    document.documentElement.dir = dir;
    toast.success(`Language set to ${SUPPORTED_LANGUAGES.find((l) => l.code === code)?.name || code}`);
  };

  const handleClearCache = () => {
    localStorage.removeItem('nexus_mock_messages');
    toast.success('Local cache & ephemeral messages cleared');
  };

  const handleRequestPushPermission = async () => {
    const res = await requestPermission();
    if (res === 'granted') {
      toast.success('Web Push Notifications enabled!');
    } else {
      toast.error(`Push notification status: ${res}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fade-in pb-20">
      {/* Profile summary card */}
      <div className="glass-card border border-nexus-primary/30 p-5 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            src={userProfile?.avatar}
            name={userProfile?.username || currentUser?.email || 'NEXUS User'}
            size="lg"
            isOnline={true}
            isVerified={true}
            verificationType="creator"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">
                {userProfile?.username || currentUser?.email?.split('@')[0] || 'Cybernaut'}
              </h2>
              <span className="badge text-[10px] text-white">Verified Node</span>
            </div>
            <p className="text-xs text-nexus-muted">
              {currentUser?.email || 'guest@nexus.io'}
            </p>
            {userProfile?.country && (
              <div className="flex items-center gap-1 mt-1 text-[11px] text-nexus-secondary">
                <MapPin size={12} />
                <span>{userProfile.country}</span>
              </div>
            )}
          </div>
        </div>

        {currentUser && (
          <button
            onClick={() => {
              logout();
              toast('Signed out from NEXUS node');
            }}
            className="p-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">{t('auth.signOut')}</span>
          </button>
        )}
      </div>

      {/* Theme Customization Section */}
      <div className="glass-card border border-nexus-border/60 p-5 rounded-3xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
            <Palette size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Neon Theme Customization</h3>
            <p className="text-xs text-nexus-muted">Persistent color palette preset</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`p-3 rounded-2xl border text-start transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-nexus-surface border-indigo-500 text-white shadow-lg'
                    : 'bg-nexus-surface/40 border-nexus-border/50 text-nexus-muted hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${theme.color}`} />
                  <span className="text-xs font-bold">{theme.name}</span>
                </div>
                {isSelected && <Check size={14} className="text-indigo-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Adaptive Data & Battery Saver Section */}
      <div className="glass-card border border-nexus-border/60 p-5 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-nexus-cyan/20 text-nexus-cyan">
              <Zap size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Adaptive Data & Battery Saver
              </h3>
              <p className="text-xs text-nexus-muted">
                Auto-tunes video streaming quality based on network & battery level
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-nexus-surface border border-nexus-border text-nexus-cyan font-mono uppercase">
            {recommendedQuality} Bandwidth
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {/* Status Indicators */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Battery size={16} className={batteryLevel <= 20 ? 'text-rose-400' : 'text-emerald-400'} />
                <span className="text-xs font-semibold text-white">Battery</span>
              </div>
              <span className="text-xs font-mono text-nexus-dim">{batteryLevel}% {isCharging ? '⚡' : ''}</span>
            </div>

            <div className="p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi size={16} className="text-nexus-cyan" />
                <span className="text-xs font-semibold text-white">Network</span>
              </div>
              <span className="text-xs font-mono uppercase text-nexus-cyan">{networkType}</span>
            </div>
          </div>

          {/* Toggle Data Saver */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50">
            <div>
              <p className="text-xs font-semibold text-white">Data Saver Mode</p>
              <p className="text-[11px] text-nexus-muted">Compress video reels & media downloads</p>
            </div>
            <button
              onClick={() => {
                const nextState = toggleDataSaver();
                toast.success(nextState ? 'Data Saver Enabled 📉' : 'Data Saver Disabled 🚀');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isDataSaverActive
                  ? 'bg-nexus-cyan text-black shadow-nexus-sm'
                  : 'bg-nexus-surface border border-nexus-border text-nexus-muted hover:text-white'
              }`}
            >
              {isDataSaverActive ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>

      {/* Push & Realtime Notifications Section */}
      <div className="glass-card border border-nexus-border/60 p-5 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-nexus-secondary/20 text-nexus-secondary">
              <Bell size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Push Notifications & Service Worker
              </h3>
              <p className="text-xs text-nexus-muted">
                Firebase Cloud Messaging (FCM) & Web Push API background alerts
              </p>
            </div>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-mono uppercase ${
              permissionStatus === 'granted'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
            }`}
          >
            {permissionStatus}
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {/* Permission row */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50">
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-nexus-accent" />
              <div>
                <p className="text-xs font-semibold text-white">
                  Browser Push Permission
                </p>
                <p className="text-[11px] text-nexus-muted">
                  Allow background system popups for messages and calls
                </p>
              </div>
            </div>
            <button
              onClick={handleRequestPushPermission}
              disabled={permissionStatus === 'granted'}
              className="px-3.5 py-1.5 rounded-xl bg-nexus-gradient text-white text-xs font-bold shadow-nexus-sm disabled:opacity-50"
            >
              {permissionStatus === 'granted' ? 'Enabled' : 'Enable'}
            </button>
          </div>

          {/* Test push trigger row */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50">
            <div className="flex items-center gap-3">
              <Send size={18} className="text-nexus-cyan" />
              <div>
                <p className="text-xs font-semibold text-white">
                  Send Test Notification
                </p>
                <p className="text-[11px] text-nexus-muted">
                  Simulate an incoming encrypted message push notification
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                triggerTestPush('message');
                toast.success('Test push alert dispatched!');
              }}
              className="px-3 py-1.5 rounded-xl border border-nexus-cyan text-nexus-cyan text-xs font-bold hover:bg-nexus-cyan/10 transition-colors"
            >
              Trigger Test
            </button>
          </div>
        </div>
      </div>

      {/* Language & Direction Section */}
      <div className="glass-card border border-nexus-border/60 p-5 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-nexus-primary/20 text-nexus-secondary">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {t('settings.languageSection')}
              </h3>
              <p className="text-xs text-nexus-muted">
                Multi-language support with automatic RTL layout switching
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-nexus-surface border border-nexus-border text-nexus-cyan font-mono">
            {currentLang.toUpperCase()} · {getDirection(currentLang).toUpperCase()}
          </span>
        </div>

        {/* 10 Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = currentLang.startsWith(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 text-start group ${
                  isActive
                    ? 'bg-nexus-primary/25 border-nexus-secondary shadow-nexus-sm'
                    : 'bg-nexus-surface/50 border-nexus-border/60 hover:bg-nexus-surface/90 hover:border-nexus-primary/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl select-none">{lang.flag}</span>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-nexus-secondary transition-colors">
                      {lang.nativeName}
                    </div>
                    <div className="text-[11px] text-nexus-muted">
                      {lang.name}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/40 text-nexus-dim">
                    {lang.dir}
                  </span>
                  {isActive ? (
                    <div className="w-5 h-5 rounded-full bg-nexus-secondary flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-nexus-border group-hover:border-nexus-muted" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Privacy & Security Section */}
      <div className="glass-card border border-nexus-border/60 p-5 rounded-3xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-nexus-cyan/20 text-nexus-cyan">
            <Shield size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {t('settings.privacySection')}
            </h3>
            <p className="text-xs text-nexus-muted">
              Zero tracking, ephemeral storage & peer-to-peer architecture
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Ghost Mode Privacy Shield */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50">
            <div className="flex items-center gap-3">
              <Ghost size={18} className="text-purple-400" />
              <div>
                <p className="text-xs font-semibold text-white">Ghost Stealth Mode</p>
                <p className="text-[11px] text-nexus-muted">Suppress online presence & read receipts</p>
              </div>
            </div>
            <button
              onClick={toggleGhostMode}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isGhostActive
                  ? 'bg-purple-600 text-white shadow-nexus-sm'
                  : 'bg-nexus-surface border border-nexus-border text-nexus-muted hover:text-white'
              }`}
            >
              {isGhostActive ? 'Active 👻' : 'Enable'}
            </button>
          </div>

          {/* Ghost NEXUS Anonymous Mode Launcher */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-950/30 border border-purple-500/30">
            <div className="flex items-center gap-3">
              <Ghost size={18} className={ghostSettings.isGhostNexusActive ? 'text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'text-purple-600'} />
              <div>
                <p className="text-xs font-semibold text-white flex items-center gap-2">
                  Ghost NEXUS Anonymous Mode
                  {ghostSettings.isGhostNexusActive && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-purple-600/40 text-purple-300 border border-purple-500/40">ACTIVE</span>
                  )}
                </p>
                <p className="text-[11px] text-nexus-muted">
                  {ghostSettings.isGhostNexusActive ? `Identity: ${ghostSettings.ghostHandle}` : 'Mask identity for anonymous posting & messaging'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowGhostModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:bg-purple-600 hover:text-white text-xs font-bold transition-all"
            >
              Open
            </button>
          </div>

          {/* Privacy Sovereignty Suite Launcher */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50">
            <div className="flex items-center gap-3">
              <Fingerprint size={18} className="text-indigo-400" />
              <div>
                <p className="text-xs font-semibold text-white">Privacy Sovereignty Suite</p>
                <p className="text-[11px] text-nexus-muted">Read receipts, zero-trace wipe, blocked list & lifecycle controls</p>
              </div>
            </div>
            <button
              onClick={() => setShowPrivacyPanel(true)}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-all"
            >
              Manage
            </button>
          </div>

          {/* Account Lifecycle & Moderation Controls Launcher */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50">
            <div className="flex items-center gap-3">
              <ShieldAlert size={18} className="text-rose-400" />
              <div>
                <p className="text-xs font-semibold text-white">Account Moderation & Controls</p>
                <p className="text-[11px] text-nexus-muted">Blocked list, self-destruct presets & account deletion</p>
              </div>
            </div>
            <button
              onClick={() => setShowLifecycleModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600 hover:text-white text-xs font-bold transition-all"
            >
              Manage
            </button>
          </div>

          {/* WebRTC P2P status */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50">
            <div className="flex items-center gap-3">
              <Radio size={18} className="text-nexus-cyan" />
              <div>
                <p className="text-xs font-semibold text-white">
                  {t('settings.p2pTitle')}
                </p>
                <p className="text-[11px] text-nexus-muted">
                  {t('settings.p2pDesc')}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              ACTIVE
            </span>
          </div>

          {/* Clear cache */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-nexus-surface/50 border border-nexus-border/50">
            <div className="flex items-center gap-3">
              <RefreshCw size={18} className="text-nexus-gold" />
              <div>
                <p className="text-xs font-semibold text-white">
                  {t('settings.clearCache')}
                </p>
                <p className="text-[11px] text-nexus-muted">
                  Reset local mock conversations and temporary media
                </p>
              </div>
            </div>
            <button
              onClick={handleClearCache}
              className="px-3 py-1.5 rounded-xl border border-nexus-border hover:border-nexus-gold/60 text-nexus-gold text-xs font-semibold transition-all hover:bg-nexus-gold/10"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Account Lifecycle Modal */}
      <AccountLifecycleModal
        isOpen={showLifecycleModal}
        onClose={() => setShowLifecycleModal(false)}
      />

      {/* System Information */}
      <div className="p-4 text-center">
        <p className="text-xs font-mono text-nexus-dim">
          {t('settings.version')}
        </p>
        <p className="text-[10px] text-nexus-dim/70 mt-1">
          Peer-to-Peer Signaling via STUN · Firebase Firestore Realtime · WebRTC
        </p>
      </div>

      {/* Ghost NEXUS Anonymous Modal */}
      <GhostAnonymousModal
        isOpen={showGhostModal}
        onClose={() => {
          setShowGhostModal(false);
          setGhostSettings(ghostNexusService.getSettings());
        }}
      />

      {/* Privacy Sovereignty Panel */}
      <PrivacySovereigntyPanel
        isOpen={showPrivacyPanel}
        onClose={() => setShowPrivacyPanel(false)}
      />
    </div>
  );
}


