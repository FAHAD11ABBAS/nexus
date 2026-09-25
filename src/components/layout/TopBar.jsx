// src/components/layout/TopBar.jsx
// Sticky glassmorphism header: NEXUS logo + AI Studio + Mail + Maps + Library + Cinema + Guilds + Academy + News + Hub + Pages + Plugins + Theme + Panic Defense + Ghost Stealth + Web3 Wallet + Notifications + Language Switcher

import { useState } from 'react';
import { Bell, Coins, Ghost, Cpu, Palette, ShieldAlert, Sparkles, GitBranch, Rocket, Tv, Users, GraduationCap, Newspaper, Mail, Compass, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import NotificationCenterModal from '@/components/notifications/NotificationCenterModal';
import NexusWalletModal from '@/components/wallet/NexusWalletModal';
import PluginRegistryModal from '@/components/plugins/PluginRegistryModal';
import ThemeCustomizerModal from '@/components/theme/ThemeCustomizerModal';
import AIHubModal from '@/components/ai/AIHubModal';
import NexusHubModal from '@/components/hub/NexusHubModal';
import NexusPagesModal from '@/components/hub/NexusPagesModal';
import NexusCinemaModal from '@/components/omniverse/NexusCinemaModal';
import NexusGuildsModal from '@/components/omniverse/NexusGuildsModal';
import NexusAcademyModal from '@/components/omniverse/NexusAcademyModal';
import NexusNewsModal from '@/components/omniverse/NexusNewsModal';

import NexusWorkspaceModals from '@/components/sovereign/NexusWorkspaceModals';
import NexusNavigationModals from '@/components/sovereign/NexusNavigationModals';
import NexusLibraryModals from '@/components/sovereign/NexusLibraryModals';
import NexusMediaModals from '@/components/sovereign/NexusMediaModals';

import { useNotifications } from '@/context/NotificationContext';
import { useGhostMode } from '@/context/GhostModeContext';

export default function TopBar() {
  const { t } = useTranslation();
  const { unreadCount } = useNotifications();
  const { isGhostActive, toggleGhostMode } = useGhostMode();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isPluginsOpen, setIsPluginsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  // Omniverse Modals State
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [isGuildsOpen, setIsGuildsOpen] = useState(false);
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  // Sovereign Universe Modals State
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const triggerPanicMode = () => {
    window.dispatchEvent(new CustomEvent('nexus_toggle_panic'));
  };

  return (
    <>
      <header
        id="topbar"
        className="fixed top-0 inset-x-0 z-50 glass-dark border-b border-white/5"
        style={{ height: 'var(--topbar-h)' }}
      >
        <div className="flex items-center justify-between h-full px-3 max-w-2xl mx-auto">

          {/* ── NEXUS Wordmark ── */}
          <div className="flex items-center gap-2 select-none">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="absolute inset-0 rounded-lg bg-nexus-gradient animate-pulse-glow" />
              <div className="absolute inset-0.5 rounded-[6px] bg-nexus-bg flex items-center justify-center">
                <span className="text-xs font-black text-gradient tracking-tighter">NX</span>
              </div>
            </div>
            <span className="text-xl font-black tracking-widest text-gradient hidden sm:block">
              NEXUS
            </span>
          </div>

          {/* ── Right Action Cluster ── */}
          <div className="flex items-center gap-1">
            {/* NEXUS AI Studio Launcher */}
            <button
              onClick={() => setIsAiStudioOpen(true)}
              title="NEXUS AI Studio Poly-Engine Hub"
              className="p-1.5 rounded-xl text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 transition-all active:scale-95 shadow-sm shadow-emerald-500/20"
            >
              <Sparkles size={17} />
            </button>

            {/* NEXOS Mail & Workspace */}
            <button
              onClick={() => setIsWorkspaceOpen(true)}
              title="NEXOS Mail, Meet & Cloud Drive"
              className="p-1.5 rounded-xl text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 transition-all active:scale-95"
            >
              <Mail size={17} />
            </button>

            {/* NEXOS Maps & Navigation */}
            <button
              onClick={() => setIsNavOpen(true)}
              title="NEXOS Maps, GPS & Satellite Intelligence"
              className="p-1.5 rounded-xl text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20 transition-all active:scale-95"
            >
              <Compass size={17} />
            </button>

            {/* NEXUS Multilingual Library */}
            <button
              onClick={() => setIsLibraryOpen(true)}
              title="NEXUS Multilingual Library & Philosophy"
              className="p-1.5 rounded-xl text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 transition-all active:scale-95 hidden xs:block"
            >
              <BookOpen size={17} />
            </button>

            {/* NEXUS Cinema & Stream Hub */}
            <button
              onClick={() => setIsCinemaOpen(true)}
              title="NEXUS Cinema & Live Stream Vault"
              className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all active:scale-95 hidden sm:block"
            >
              <Tv size={17} />
            </button>

            {/* Emergency Decoy Panic Screen */}
            <button
              onClick={triggerPanicMode}
              title="Emergency Decoy Panic Screen (Cmd+Shift+P)"
              className="p-1.5 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all active:scale-95"
            >
              <ShieldAlert size={17} />
            </button>

            {/* Ghost Mode Privacy Shield Toggle */}
            <button
              onClick={toggleGhostMode}
              title={isGhostActive ? 'Ghost Stealth Shield Active' : 'Activate Ghost Shield'}
              className={`p-1.5 rounded-xl transition-all duration-200 border flex items-center gap-1 ${
                isGhostActive
                  ? 'bg-purple-500/25 border-purple-500/50 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                  : 'text-nexus-muted border-transparent hover:text-white hover:bg-white/5'
              }`}
            >
              <Ghost size={17} className={isGhostActive ? 'animate-bounce text-purple-300' : ''} />
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Sovereign Workspace Modals */}
      <NexusWorkspaceModals isOpen={isWorkspaceOpen} onClose={() => setIsWorkspaceOpen(false)} />
      <NexusNavigationModals isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <NexusLibraryModals isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />

      {/* Omniverse Modals */}
      <NexusCinemaModal isOpen={isCinemaOpen} onClose={() => setIsCinemaOpen(false)} />
      <NexusGuildsModal isOpen={isGuildsOpen} onClose={() => setIsGuildsOpen(false)} />
      <NexusAcademyModal isOpen={isAcademyOpen} onClose={() => setIsAcademyOpen(false)} />
      <NexusNewsModal isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />

      {/* NEXUS AI Studio Modal */}
      <AIHubModal isOpen={isAiStudioOpen} onClose={() => setIsAiStudioOpen(false)} />

      {/* NEXUS Hub Repository Modal */}
      <NexusHubModal
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        onLaunchPages={() => {
          setIsHubOpen(false);
          setIsPagesOpen(true);
        }}
      />

      {/* NEXUS Pages Modal */}
      <NexusPagesModal isOpen={isPagesOpen} onClose={() => setIsPagesOpen(false)} />

      {/* Plugin Registry Modal */}
      <PluginRegistryModal isOpen={isPluginsOpen} onClose={() => setIsPluginsOpen(false)} />

      {/* Theme Customizer Modal */}
      <ThemeCustomizerModal isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />

      {/* Notification Center Modal */}
      <NotificationCenterModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

      {/* Web3 Wallet Modal */}
      <NexusWalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
    </>
  );
}
