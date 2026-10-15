import React, { useState } from 'react';
import { WhatsAppIcon, AlertCircleIcon, CloseIcon } from './Icons';
import {
  WHATSAPP_CHAT_CONFIG,
  getDirectWhatsAppChatUrl,
  isPlaceholder,
} from '../config/socialLinks';

interface FloatingWhatsAppChatProps {
  currentLang: 'en' | 'ar';
}

export const FloatingWhatsAppChat: React.FC<FloatingWhatsAppChatProps> = ({
  currentLang,
}) => {
  const [showNotice, setShowNotice] = useState(false);

  const isConfigured = !isPlaceholder(WHATSAPP_CHAT_CONFIG.phoneNumberDigits);
  const chatUrl = isConfigured ? getDirectWhatsAppChatUrl(currentLang) : '#';

  const tooltipText =
    currentLang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat with us';
  const ariaLabelText =
    currentLang === 'ar'
      ? 'محادثة مباشرة عبر واتساب مع كراميل'
      : 'Chat directly with Caramel on WhatsApp';

  const handleClick = (e: React.MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault();
      setShowNotice(true);
    }
  };

  return (
    <>
      <aside
        className="caramel-floating-chat-wrap"
        aria-label="Direct WhatsApp Contact"
      >
        <a
          href={chatUrl}
          target={isConfigured ? '_blank' : undefined}
          rel={isConfigured ? 'noopener noreferrer' : undefined}
          onClick={handleClick}
          className="caramel-floating-whatsapp-btn"
          aria-label={ariaLabelText}
          id="floating-whatsapp-chat-btn"
        >
          <WhatsAppIcon size={30} aria-hidden="true" />
          <span className="floating-whatsapp-tooltip" role="tooltip">
            {tooltipText}
          </span>
        </a>
      </aside>

      {/* Safety toast notice if phone number is not configured */}
      {showNotice && (
        <aside
          className="placeholder-toast floating-chat-notice"
          role="status"
          aria-live="polite"
        >
          <AlertCircleIcon className="toast-icon" />
          <div className="toast-content">
            <div className="toast-title">
              {currentLang === 'ar' ? 'رقم الواتساب' : 'WhatsApp Contact'}
            </div>
            <p>
              {currentLang === 'ar'
                ? 'لم يتم ضبط رقم محادثة الواتساب بعد. يمكنك تعديله في ملف src/config/socialLinks.ts.'
                : 'Direct WhatsApp chat phone number is not configured yet. Update your real phone number in src/config/socialLinks.ts.'}
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
    </>
  );
};
