import React, { useState } from 'react';
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  AlertCircleIcon,
  CloseIcon,
} from './Icons';
import {
  SOCIAL_LINKS,
  SocialDestination,
} from '../config/socialLinks';

interface SocialLinksProps {
  currentLang: 'en' | 'ar';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ currentLang }) => {
  const [activeToast, setActiveToast] = useState<{
    platformName: string;
    messageEn: string;
    messageAr: string;
  } | null>(null);

  const handleClick = (e: React.MouseEvent, dest: SocialDestination) => {
    // Check if destination is unconfigured or a placeholder
    const isReady = dest.isConfigured();

    if (!isReady) {
      e.preventDefault();
      setActiveToast({
        platformName: currentLang === 'ar' ? dest.nameAr : dest.name,
        messageEn: `The ${dest.name} profile link has not been configured yet. Update your real URL in src/config/socialLinks.ts.`,
        messageAr: `لم يتم ضبط رابط حساب ${dest.nameAr} بعد. يُرجى إضافة الرابط الحقيقي في ملف src/config/socialLinks.ts.`,
      });
      return;
    }
  };

  const getResolvedUrl = (dest: SocialDestination): string => {
    return dest.url;
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'instagram':
        return <InstagramIcon aria-hidden="true" />;
      case 'tiktok':
        return <TikTokIcon aria-hidden="true" />;
      case 'whatsapp':
        return <WhatsAppIcon aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <>
      <nav
        className="social-buttons-container"
        aria-label={currentLang === 'ar' ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}
      >
        {SOCIAL_LINKS.map((dest) => {
          const isConfigured = dest.isConfigured();
          const href = isConfigured ? getResolvedUrl(dest) : '#';
          const ariaLabel = currentLang === 'ar' ? dest.ariaLabelAr : dest.ariaLabelEn;
          const tooltip = currentLang === 'ar' ? dest.tooltipAr : dest.tooltipEn;

          return (
            <a
              key={dest.id}
              href={href}
              id={`social-btn-${dest.id}`}
              className={`social-action-btn social-btn-${dest.id}`}
              onClick={(e) => handleClick(e, dest)}
              target={isConfigured ? '_blank' : undefined}
              rel={isConfigured ? 'noopener noreferrer' : undefined}
              aria-label={ariaLabel}
            >
              {getIcon(dest.id)}
              <span className="social-tooltip" role="tooltip">
                {tooltip}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Luxury safety toast for placeholder destinations */}
      {activeToast && (
        <aside
          className="placeholder-toast"
          role="status"
          aria-live="polite"
          id="social-placeholder-toast"
        >
          <AlertCircleIcon className="toast-icon" />
          <div className="toast-content">
            <div className="toast-title">{activeToast.platformName}</div>
            <p>{currentLang === 'ar' ? activeToast.messageAr : activeToast.messageEn}</p>
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={() => setActiveToast(null)}
            aria-label={currentLang === 'ar' ? 'إغلاق الإشعار' : 'Close notification'}
          >
            <CloseIcon />
          </button>
        </aside>
      )}
    </>
  );
};
