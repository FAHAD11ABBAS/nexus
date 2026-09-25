// src/components/ui/LanguageSwitcher.jsx
// Compact topbar language switcher with dropdown for all 10 supported languages

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, getDirection } from '@/i18n';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLang = i18n.language?.split('-')[0] || 'en';

  const currentObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const handleSelect = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = getDirection(code);
    document.documentElement.lang = code;
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        id="language-switcher-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language.label')}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-nexus-text transition-all"
      >
        <span className="text-sm select-none">{currentObj.flag}</span>
        <span className="uppercase text-[11px] font-mono">{currentObj.code}</span>
        <span className="text-nexus-dim text-[10px]">▾</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full end-0 mt-2 w-48 max-h-64 overflow-y-auto glass-card border border-nexus-primary/30 rounded-2xl p-1.5 z-50 shadow-2xl animate-fade-in text-start">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                    isActive
                      ? 'bg-nexus-primary/20 text-nexus-secondary font-bold'
                      : 'text-nexus-text hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base select-none">{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  {isActive && <Check size={14} />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
