import React, { useState } from 'react';
import { DEVELOPER_CONFIG, isPlaceholder } from '../config/socialLinks';
import { AlertCircleIcon, CloseIcon } from './Icons';

interface FooterProps {
  currentLang: 'en' | 'ar';
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const [showNotice, setShowNotice] = useState(false);
  const currentYear = new Date().getFullYear();

  const isDevConfigured = !isPlaceholder(DEVELOPER_CONFIG.url);
  const devUrl = isDevConfigured ? DEVELOPER_CONFIG.url : '#';

  const devName = currentLang === 'ar' ? DEVELOPER_CONFIG.nameAr : DEVELOPER_CONFIG.nameEn;
  const devAriaLabel =
    currentLang === 'ar'
      ? `زيارة موقع المطور ${DEVELOPER_CONFIG.nameAr}`
      : `Visit developer profile of ${DEVELOPER_CONFIG.nameEn}`;

  const handleDevClick = (e: React.MouseEvent) => {
    if (!isDevConfigured) {
      e.preventDefault();
      setShowNotice(true);
    }
  };

  const copyrightText =
    currentLang === 'ar'
      ? `© ${currentYear} كراميل — جميع الحقوق محفوظة.`
      : `© ${currentYear} Caramel — All rights reserved.`;

  return (
    <footer className="caramel-footer" role="contentinfo">
      <div className="footer-content-wrap">
        <p className="footer-copyright-line">{copyrightText}</p>
        <p className="footer-developer-line">
          <span>{currentLang === 'ar' ? 'تم التطوير بواسطة ' : 'Developed by '}</span>
          <a
            href={devUrl}
            target={isDevConfigured ? '_blank' : undefined}
            rel={isDevConfigured ? 'noopener noreferrer' : undefined}
            onClick={handleDevClick}
            className="footer-developer-link"
            aria-label={devAriaLabel}
            id="developer-credit-link"
          >
            {devName}
          </a>
        </p>
      </div>

      {/* Safety notice if developer URL is still a placeholder */}
      {showNotice && (
        <aside
          className="placeholder-toast footer-dev-notice"
          role="status"
          aria-live="polite"
        >
          <AlertCircleIcon className="toast-icon" />
          <div className="toast-content">
            <div className="toast-title">
              {currentLang === 'ar' ? 'رابط المطور' : 'Developer URL'}
            </div>
            <p>
              {currentLang === 'ar'
                ? 'رابط المطور ما زال افتراضياً. يمكنك تغييره إلى حسابك على GitHub أو معرض أعمالك في src/config/socialLinks.ts.'
                : 'Developer destination is still a placeholder. Update your GitHub or portfolio in src/config/socialLinks.ts.'}
            </p>
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={() => setShowNotice(false)}
            aria-label={currentLang === 'ar' ? 'إغلاق الإشعار' : 'Close notification'}
          >
            <CloseIcon />
          </button>
        </aside>
      )}
    </footer>
  );
};
