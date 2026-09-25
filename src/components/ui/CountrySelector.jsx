// src/components/ui/CountrySelector.jsx
// Searchable country picker with flags and auto-detect location integration

import { useState } from 'react';
import { Search, Check, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import useLocation from '@/hooks/useLocation';

const POPULAR_COUNTRIES = [
  { name: 'United States', code: 'US', flag: '🇺🇸', dialCode: '+1' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦', dialCode: '+966' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪', dialCode: '+971' },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬', dialCode: '+20' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧', dialCode: '+44' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪', dialCode: '+49' },
  { name: 'France', code: 'FR', flag: '🇫🇷', dialCode: '+33' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸', dialCode: '+34' },
  { name: 'China', code: 'CN', flag: '🇨🇳', dialCode: '+86' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵', dialCode: '+81' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷', dialCode: '+55' },
  { name: 'India', code: 'IN', flag: '🇮🇳', dialCode: '+91' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦', dialCode: '+1' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺', dialCode: '+61' },
  { name: 'Russia', code: 'RU', flag: '🇷🇺', dialCode: '+7' },
  { name: 'Global Citizen', code: 'UN', flag: '🌐', dialCode: '+0' },
];

export default function CountrySelector({
  value,
  onChange,
  showDialCode = false,
  className = '',
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { detectLocation, loading: detecting } = useLocation();

  const selected =
    POPULAR_COUNTRIES.find((c) => c.name === value || c.code === value) ||
    POPULAR_COUNTRIES[0];

  const filtered = POPULAR_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search)
  );

  const handleAutoDetect = async (e) => {
    e.stopPropagation();
    const detected = await detectLocation();
    if (detected?.country) {
      onChange(detected.country, detected.countryCode);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-border/80 hover:border-nexus-primary/50 text-nexus-text text-sm transition-all shadow-inner focus:outline-none focus:ring-1 focus:ring-nexus-primary"
        >
          <span className="flex items-center gap-2 truncate">
            <span className="text-lg">{selected.flag}</span>
            <span className="truncate">{selected.name}</span>
            {showDialCode && (
              <span className="text-xs text-nexus-muted font-mono">
                ({selected.dialCode})
              </span>
            )}
          </span>
          <span className="text-nexus-muted text-xs ms-1">▾</span>
        </button>

        {/* Auto Detect Button */}
        <button
          type="button"
          onClick={handleAutoDetect}
          disabled={detecting}
          title={t('auth.detectLocation')}
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-nexus-card border border-nexus-border/70 hover:border-nexus-secondary/60 text-nexus-secondary hover:text-white text-xs font-medium transition-all shadow-sm disabled:opacity-50"
        >
          {detecting ? (
            <div className="w-3.5 h-3.5 border-2 border-nexus-secondary border-t-transparent rounded-full animate-spin" />
          ) : (
            <Sparkles size={14} className="text-nexus-accent animate-pulse" />
          )}
          <span className="hidden sm:inline">
            {detecting ? t('auth.detecting') : t('auth.detectLocation')}
          </span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full start-0 mt-1.5 w-full max-h-60 overflow-hidden rounded-2xl glass-card border border-nexus-primary/30 z-50 shadow-2xl flex flex-col animate-fade-in">
            {/* Search Input */}
            <div className="p-2 border-b border-white/10 flex items-center gap-2">
              <Search size={14} className="text-nexus-muted ms-1" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="w-full bg-transparent text-xs text-nexus-text placeholder-nexus-dim outline-none"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="overflow-y-auto max-h-48 py-1">
              {filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    onChange(c.name, c.code);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                    selected.code === c.code
                      ? 'bg-nexus-primary/20 text-nexus-secondary font-semibold'
                      : 'text-nexus-text hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{c.flag}</span>
                    <span>{c.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-nexus-dim font-mono">
                      {c.dialCode}
                    </span>
                    {selected.code === c.code && <Check size={14} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
