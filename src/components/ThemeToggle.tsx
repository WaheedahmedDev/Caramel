import React, { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from './Icons';

interface ThemeToggleProps {
  currentLang: 'en' | 'ar';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentLang }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check saved theme or system preference
    const saved = localStorage.getItem('caramel-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      // Default is light (Warm Ivory luxury palette)
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('caramel-theme', nextTheme);
  };

  const labelEn = theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  const labelAr = theme === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع الفاتح';
  const textEn = theme === 'light' ? 'Dark' : 'Light';
  const textAr = theme === 'light' ? 'ليلي' : 'نهاري';

  return (
    <button
      type="button"
      className="luxury-pill-btn"
      onClick={toggleTheme}
      aria-label={currentLang === 'ar' ? labelAr : labelEn}
      title={currentLang === 'ar' ? labelAr : labelEn}
      id="theme-toggle-btn"
    >
      {theme === 'light' ? <MoonIcon aria-hidden="true" /> : <SunIcon aria-hidden="true" />}
      <span>{currentLang === 'ar' ? textAr : textEn}</span>
    </button>
  );
};
