import React, { useState, useEffect } from 'react';
import { FashionParallax } from './components/FashionParallax';
import { BrandIdentity } from './components/BrandIdentity';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageToggle } from './components/LanguageToggle';
import { Footer } from './components/Footer';
import { FloatingWhatsAppChat } from './components/FloatingWhatsAppChat';

export const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    // Check saved language or browser preference
    const saved = localStorage.getItem('caramel-lang') as 'en' | 'ar' | null;
    if (saved && (saved === 'en' || saved === 'ar')) {
      handleLanguageChange(saved);
    } else {
      handleLanguageChange('en');
    }
  }, []);

  const handleLanguageChange = (nextLang: 'en' | 'ar') => {
    setLang(nextLang);
    localStorage.setItem('caramel-lang', nextLang);
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="caramel-app-container">
      {/* Layered luxury ambient lighting, studio spotlight & grain texture */}
      <div className="caramel-ambient-bg" aria-hidden="true">
        <div className="caramel-ambient-glow" />
        <div className="caramel-dynamic-spotlight" />
        <div className="caramel-grain-overlay" />
      </div>

      {/* Top Navigation & Controls */}
      <header className="caramel-header">
        <div className="caramel-header-actions">
          <LanguageToggle currentLang={lang} onLanguageChange={handleLanguageChange} />
          <ThemeToggle currentLang={lang} />
        </div>
      </header>

      {/* Main Interactive Fashion Editorial Stage */}
      <main id="main-content" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <FashionParallax>
          <BrandIdentity currentLang={lang} />
        </FashionParallax>
      </main>

      {/* Luxury Footer with Dynamic Year & Developer Credit */}
      <Footer currentLang={lang} />

      {/* Floating WhatsApp Contact Button at Bottom Left */}
      <FloatingWhatsAppChat currentLang={lang} />
    </div>
  );
};

export default App;
