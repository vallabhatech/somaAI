/**
 * Language detection utility
 * Detects Hindi (Devanagari script) vs English
 */

export const detectLanguage = (text) => {
  // Check for Devanagari script characters (Hindi)
  const devanagariRegex = /[\u0900-\u097F]/;
  return devanagariRegex.test(text) ? 'hi' : 'en';
};

export const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी'
};

const languageUtils = {
  detectLanguage,
  SUPPORTED_LANGUAGES
};

export default languageUtils;
