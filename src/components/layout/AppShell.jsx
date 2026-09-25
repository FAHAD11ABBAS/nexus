// src/components/layout/AppShell.jsx
// Main layout shell: TopBar + scrollable content area + BottomNav + DecoyPanicModal + UniversalCommandBar + All Sovereign Modals

import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import DecoyPanicModal from '@/components/privacy/DecoyPanicModal';
import UniversalCommandBar from '@/components/ai/UniversalCommandBar';
import AIHubModal from '@/components/ai/AIHubModal';
import PluginRegistryModal from '@/components/plugins/PluginRegistryModal';
import ThemeCustomizerModal from '@/components/theme/ThemeCustomizerModal';
import NexusHubModal from '@/components/hub/NexusHubModal';
import NexusPagesModal from '@/components/hub/NexusPagesModal';
import NexusCinemaModal from '@/components/omniverse/NexusCinemaModal';
import NexusGuildsModal from '@/components/omniverse/NexusGuildsModal';
import NexusAcademyModal from '@/components/omniverse/NexusAcademyModal';
import NexusNewsModal from '@/components/omniverse/NexusNewsModal';

import NexusWorkspaceModals from '@/components/sovereign/NexusWorkspaceModals';
import NexusNavigationModals from '@/components/sovereign/NexusNavigationModals';
import NexusLibraryModals from '@/components/sovereign/NexusLibraryModals';

import themeService from '@/services/themeService';

export default function AppShell({ children }) {
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);
  const [isPluginsOpen, setIsPluginsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  // Omniverse Modals State
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [isGuildsOpen, setIsGuildsOpen] = useState(false);
  const [isAcademyOpen, setIsAcademyOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);

  // Sovereign Universe Modals State
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [workspaceInitialTab, setWorkspaceInitialTab] = useState('mail');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navInitialTab, setNavInitialTab] = useState('maps');
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  useEffect(() => {
    // Apply saved theme CSS variables on app init
    const initialTheme = themeService.getTheme();
    themeService.applyCSSVariables(initialTheme);

    const handlePanicToggle = () => {
      setIsPanicActive((prev) => !prev);
    };

    window.addEventListener('nexus_toggle_panic', handlePanicToggle);
    return () => window.removeEventListener('nexus_toggle_panic', handlePanicToggle);
  }, []);

  return (
    <div className="relative flex flex-col min-h-dvh bg-[#0a0a12] overflow-hidden">
      {/* Ambient background orbs — purely decorative */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="orb orb-primary absolute -top-40 -start-40 animate-float" />
        <div
          className="orb orb-accent absolute top-1/3 -end-32 animate-float"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="orb orb-cyan absolute bottom-1/4 start-1/4 animate-float"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* ── Sticky Top Bar ── */}
      <TopBar />

      {/* ── Scrollable Page Content ── */}
      <main
        id="main-content"
        className="relative z-10 flex-1 overflow-y-auto"
        style={{
          paddingTop: 'var(--topbar-h)',
          paddingBottom: 'var(--bottomnav-h)',
        }}
      >
        {children}
      </main>

      {/* ── Fixed Bottom Navigation ── */}
      <BottomNav />

      {/* Floating Universal Command Bar (Cmd+K / Ctrl+K) */}
      <UniversalCommandBar
        onOpenAiStudio={() => setIsAiStudioOpen(true)}
        onOpenPlugins={() => setIsPluginsOpen(true)}
        onOpenTheme={() => setIsThemeOpen(true)}
        onOpenHub={() => setIsHubOpen(true)}
        onOpenPages={() => setIsPagesOpen(true)}
        onOpenCinema={() => setIsCinemaOpen(true)}
        onOpenGuilds={() => setIsGuildsOpen(true)}
        onOpenAcademy={() => setIsAcademyOpen(true)}
        onOpenNews={() => setIsNewsOpen(true)}
        onOpenWorkspace={(tab = 'mail') => {
          setWorkspaceInitialTab(tab);
          setIsWorkspaceOpen(true);
        }}
        onOpenNav={(tab = 'maps') => {
          setNavInitialTab(tab);
          setIsNavOpen(true);
        }}
        onOpenLibrary={() => setIsLibraryOpen(true)}
      />

      {/* Sovereign Workspace Modals */}
      <NexusWorkspaceModals isOpen={isWorkspaceOpen} onClose={() => setIsWorkspaceOpen(false)} initialTab={workspaceInitialTab} />
      <NexusNavigationModals isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} initialTab={navInitialTab} />
      <NexusLibraryModals isOpen={isLibraryOpen} onClose={() => setIsLibraryOpen(false)} />

      {/* Omniverse Modals */}
      <NexusCinemaModal isOpen={isCinemaOpen} onClose={() => setIsCinemaOpen(false)} />
      <NexusGuildsModal isOpen={isGuildsOpen} onClose={() => setIsGuildsOpen(false)} />
      <NexusAcademyModal isOpen={isAcademyOpen} onClose={() => setIsAcademyOpen(false)} />
      <NexusNewsModal isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />

      {/* AI Studio Modal */}
      <AIHubModal isOpen={isAiStudioOpen} onClose={() => setIsAiStudioOpen(false)} />

      {/* NEXUS Hub Code Repository Modal */}
      <NexusHubModal
        isOpen={isHubOpen}
        onClose={() => setIsHubOpen(false)}
        onLaunchPages={() => {
          setIsHubOpen(false);
          setIsPagesOpen(true);
        }}
      />

      {/* NEXUS Pages Gateway Modal */}
      <NexusPagesModal isOpen={isPagesOpen} onClose={() => setIsPagesOpen(false)} />

      {/* Plugin Registry Modal */}
      <PluginRegistryModal isOpen={isPluginsOpen} onClose={() => setIsPluginsOpen(false)} />

      {/* Theme Customizer Modal */}
      <ThemeCustomizerModal isOpen={isThemeOpen} onClose={() => setIsThemeOpen(false)} />

      {/* Emergency Decoy Panic Modal */}
      <DecoyPanicModal isPanicActive={isPanicActive} onDeactivatePanic={() => setIsPanicActive(false)} />
    </div>
  );
}
