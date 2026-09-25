// src/i18n/index.js
// i18next configuration with browser language detection, Iraqi Arabic flag correction, and full RTL/LTR support

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';
import esTranslation from './locales/es/translation.json';
import frTranslation from './locales/fr/translation.json';
import zhTranslation from './locales/zh/translation.json';
import deTranslation from './locales/de/translation.json';
import jaTranslation from './locales/ja/translation.json';
import ptTranslation from './locales/pt/translation.json';
import ruTranslation from './locales/ru/translation.json';
import hiTranslation from './locales/hi/translation.json';
import itTranslation from './locales/it/translation.json';

/** Languages that use RTL text direction */
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

/** Supported languages metadata with explicit Iraqi Flag for Arabic (ar) */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية (العراق)', flag: '🇮🇶', dir: 'rtl' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
];

/** Returns 'rtl' or 'ltr' for a given language code */
export const getDirection = (lang) => {
  if (!lang) return 'ltr';
  const baseLang = lang.split('-')[0].toLowerCase();
  return RTL_LANGUAGES.includes(baseLang) ? 'rtl' : 'ltr';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
      es: { translation: esTranslation },
      fr: { translation: frTranslation },
      de: { translation: deTranslation },
      it: { translation: itTranslation },
      zh: { translation: zhTranslation },
      ja: { translation: jaTranslation },
      pt: { translation: ptTranslation },
      ru: { translation: ruTranslation },
      hi: { translation: hiTranslation },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'es', 'fr', 'de', 'it', 'zh', 'ja', 'pt', 'ru', 'hi'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'nexus_lang',
    },
    react: {
      useSuspense: false,
    },
  });

// Automatically sync <html> attributes whenever language changes
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    const dir = getDirection(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = dir;
    localStorage.setItem('nexus_lang', lng);
  }
});

export default i18n;
