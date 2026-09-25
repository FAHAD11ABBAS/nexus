// src/components/layout/BottomNav.jsx
// Animated glassmorphism bottom navigation bar with 5 tabs

import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Compass, Clapperboard, MessageCircle, Settings as SettingsIcon } from 'lucide-react';

const NAV_ITEMS = [
  {
    id:    'nav-home',
    to:    '/',
    icon:  Home,
    labelKey: 'nav.home',
    exact: true,
  },
  {
    id:    'nav-explore',
    to:    '/explore',
    icon:  Compass,
    labelKey: 'nav.explore',
  },
  {
    id:    'nav-reels',
    to:    '/reels',
    icon:  Clapperboard,
    labelKey: 'nav.reels',
    center: true, // Special center accent pill
  },
  {
    id:    'nav-chat',
    to:    '/chat',
    icon:  MessageCircle,
    labelKey: 'nav.chat',
  },
  {
    id:    'nav-settings',
    to:    '/settings',
    icon:  SettingsIcon,
    labelKey: 'nav.settings',
  },
];

// Center Reels tab — floating accent pill
function ReelsTab({ item, isActive, label }) {
  const Icon = item.icon;
  return (
    <NavLink
      id={item.id}
      to={item.to}
      aria-label={label}
      className="relative flex flex-col items-center justify-center -mt-5 group"
    >
      {/* Outer glow ring */}
      <div
        className={[
          'absolute inset-0 rounded-full transition-all duration-300',
          isActive ? 'bg-nexus-gradient opacity-30 blur-md scale-110' : 'opacity-0',
        ].join(' ')}
      />

      {/* Pill button */}
      <div
        className={[
          'relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300',
          'shadow-nexus ring-1',
          isActive
            ? 'bg-nexus-gradient ring-purple-400/30 scale-105'
            : 'bg-nexus-card ring-nexus-border group-hover:bg-nexus-primary/20 group-hover:ring-nexus-primary/40',
        ].join(' ')}
      >
        <Icon
          size={24}
          strokeWidth={isActive ? 2 : 1.75}
          className={[
            'transition-all duration-200',
            isActive ? 'text-white drop-shadow-lg' : 'text-nexus-muted group-hover:text-nexus-secondary',
          ].join(' ')}
        />
      </div>

      {/* Label */}
      <span
        className={[
          'mt-1.5 text-[10px] font-semibold tracking-wide transition-colors duration-200',
          isActive ? 'text-gradient' : 'text-nexus-dim group-hover:text-nexus-muted',
        ].join(' ')}
      >
        {label}
      </span>
    </NavLink>
  );
}

// Standard nav tab
function NavTab({ item, isActive, label }) {
  const Icon = item.icon;
  return (
    <NavLink
      id={item.id}
      to={item.to}
      end={item.exact}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      className="relative flex flex-col items-center justify-center gap-1 pt-2 pb-1 group flex-1"
    >
      {/* Icon wrapper */}
      <div
        className={[
          'relative p-2 rounded-xl transition-all duration-200',
          isActive
            ? 'bg-nexus-primary/15'
            : 'group-hover:bg-white/5',
        ].join(' ')}
      >
        <Icon
          size={22}
          strokeWidth={isActive ? 2.25 : 1.75}
          className={[
            'transition-all duration-200',
            isActive
              ? 'text-nexus-secondary drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]'
              : 'text-nexus-dim group-hover:text-nexus-muted',
          ].join(' ')}
        />

        {/* Active dot indicator */}
        {isActive && (
          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-nexus-secondary shadow-[0_0_6px_rgba(168,85,247,1)]" />
        )}
      </div>

      {/* Label */}
      <span
        className={[
          'text-[10px] font-medium tracking-wide transition-colors duration-200 leading-none',
          isActive ? 'text-nexus-secondary' : 'text-nexus-dim group-hover:text-nexus-muted',
        ].join(' ')}
      >
        {label}
      </span>
    </NavLink>
  );
}

export default function BottomNav() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <nav
      id="bottom-nav"
      aria-label="Main Navigation"
      className="fixed bottom-0 inset-x-0 z-50 glass-dark border-t border-white/5"
      style={{ height: 'var(--bottomnav-h)' }}
    >
      {/* Subtle top highlight line */}
      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-nexus-primary/40 to-transparent" />

      <div className="flex items-end justify-around h-full px-2 max-w-2xl mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.to
            : pathname.startsWith(item.to);
          const label = t(item.labelKey);

          if (item.center) {
            return (
              <ReelsTab key={item.id} item={item} isActive={isActive} label={label} />
            );
          }

          return (
            <NavTab key={item.id} item={item} isActive={isActive} label={label} />
          );
        })}
      </div>
    </nav>
  );
}
