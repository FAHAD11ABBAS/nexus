// src/services/localizationService.js
// Multi-Language Full-Coverage Engine & Layout Direction Manager

import i18n, { SUPPORTED_LANGUAGES, getDirection } from '@/i18n';

class LocalizationService {
  getSupportedLanguages() {
    return SUPPORTED_LANGUAGES;
  }

  getCurrentLanguage() {
    return i18n.language?.split('-')[0] || 'en';
  }

  getCurrentFlag() {
    const lang = this.getCurrentLanguage();
    const item = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
    return item ? item.flag : '🌐';
  }

  isRTL() {
    const lang = this.getCurrentLanguage();
    return getDirection(lang) === 'rtl';
  }

  setLanguage(code) {
    i18n.changeLanguage(code);
    const dir = getDirection(code);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = code;
      document.documentElement.dir = dir;
      localStorage.setItem('nexus_lang', code);
    }
    return { code, dir };
  }
}

const localizationService = new LocalizationService();
export default localizationService;
