import React from 'react';
import { GlobeIcon } from './Icons';

interface LanguageToggleProps {
  currentLang: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'ar' : 'en';
    onLanguageChange(nextLang);
  };

  const labelEn = currentLang === 'en' ? 'التبديل إلى العربية' : 'Switch to English';
  const displayLabel = currentLang === 'en' ? 'العربية' : 'English';

  return (
    <button
      type="button"
      className="luxury-pill-btn"
      onClick={toggleLanguage}
      aria-label={labelEn}
      title={labelEn}
      id="language-toggle-btn"
    >
      <GlobeIcon aria-hidden="true" />
      <span>{displayLabel}</span>
    </button>
  );
};
