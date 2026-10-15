import React from 'react';
import { SocialLinks } from './SocialLinks';

interface BrandIdentityProps {
  currentLang: 'en' | 'ar';
}

export const BrandIdentity: React.FC<BrandIdentityProps> = ({ currentLang }) => {
  // Title and subtitle according to brand guidelines
  const brandName = currentLang === 'ar' ? 'كراميل' : 'Caramel';
  const subtitle = currentLang === 'ar' ? 'شنط وملابس حريمي' : 'BAGS & FASHION';
  const tagline =
    currentLang === 'ar'
      ? 'أناقة راقية وتصاميم عصرية مختارة بعناية'
      : 'Elegance Redefined in Leather & Couture';

  const logoAltText =
    currentLang === 'ar'
      ? 'شعار كراميل شنط وملابس حريمي - فستان سهرة وحقيبة جلدية فاخرة'
      : "Caramel Bags & Fashion official brand emblem featuring an evening gown and luxury leather handbag";

  return (
    <section className="caramel-brand-center" aria-label="Caramel Brand Identity">
      {/* Central Logo Container */}
      <div className="brand-logo-frame">
        <picture>
          <source srcSet="/assets/caramel-logo.avif" type="image/avif" />
          <source srcSet="/assets/caramel-logo.webp" type="image/webp" />
          <source srcSet="/assets/caramel-logo.png" type="image/png" />
          <img
            src="/assets/caramel-logo.jpg"
            alt={logoAltText}
            className="brand-logo-img"
            width="210"
            height="260"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      {/* Tasteful Typography Hierarchy */}
      <div className="brand-title-wrap">
        <h1 className="brand-title">{brandName}</h1>
        <div className="brand-subtitle-badge" aria-label={subtitle}>
          <span>{subtitle}</span>
        </div>
        <p className="brand-tagline">{tagline}</p>
      </div>

      {/* Exactly Three Social Links */}
      <SocialLinks currentLang={currentLang} />
    </section>
  );
};
