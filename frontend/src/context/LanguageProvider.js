"use client";

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// Language translations (YOUR FULL TRANSLATION OBJECT HERE)
const translations = {
  en: { login: "Login", logout: "Logout" /* ...rest of your keys */ },
  hi: { login: "लॉगिन", logout: "लॉगआउट" /* ...rest of your keys */ },
  ur: { login: "لاگ ان", logout: "لاگ آؤٹ" /* ...rest of your keys */ }
  // ✅ Replace above with your full translations as you pasted earlier
};

// Create Language Context
const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('medistore-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('medistore-language', newLanguage);
    }
  };

  // ✅ Get translation function with safe fallback using useMemo
  const t = useMemo(() => {
    return (key) => {
      const currentTranslations = translations[language] || translations['en'];
      return (currentTranslations && currentTranslations[key]) || translations.en[key] || key;
    };
  }, [language]);

  // Get current language data
  const getCurrentLanguageData = () => {
    return {
      code: language,
      name: language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'اردو',
      direction: language === 'ur' ? 'rtl' : 'ltr'
    };
  };

  const contextValue = {
    language,
    changeLanguage,
    t,
    getCurrentLanguageData,
    translations: translations[language] || translations['en']
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      <div dir={getCurrentLanguageData().direction}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Export context for direct use if needed
export { LanguageContext, translations };
