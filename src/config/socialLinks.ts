/**
 * ==============================================================================
 * CARAMEL — SOCIAL LINKS & CONTACT CONFIGURATION
 * ==============================================================================
 */

export interface SocialDestination {
  id: 'instagram' | 'tiktok' | 'whatsapp';
  name: string;
  nameAr: string;
  url: string;
  ariaLabelEn: string;
  ariaLabelAr: string;
  tooltipEn: string;
  tooltipAr: string;
  isConfigured: () => boolean;
}

export interface WhatsAppChatConfig {
  /** Direct chat phone number digits only (e.g. '201122971812' for Egypt) */
  phoneNumberDigits: string;
  defaultMessageEn: string;
  defaultMessageAr: string;
}

export interface DeveloperConfig {
  nameEn: string;
  nameAr: string;
  /** Developer portfolio, GitHub, or contact URL */
  url: string;
}

/** Official Caramel WhatsApp Channel (opens from the central icon) */
export const WHATSAPP_CHANNEL_URL =
  'https://whatsapp.com/channel/0029VbBsrrB7oQhfGT7zsH0R';

/** Floating WhatsApp Direct Chat Configuration (opens from the bottom-left floating button) */
export const WHATSAPP_CHAT_CONFIG: WhatsAppChatConfig = {
  phoneNumberDigits: '',
  defaultMessageEn: 'Hello Caramel! I would like to inquire about your bags & fashion collection.',
  defaultMessageAr: 'مرحباً كراميل! أود الاستفسار عن كولكشن الشنط والملابس.',
};

/** Developer Credit Configuration (clickable in the footer) */
export const DEVELOPER_CONFIG: DeveloperConfig = {
  nameEn: 'Waheed',
  nameAr: 'وحيد',
  // REPLACE with your real portfolio, GitHub, or personal URL
  url: 'https://www.facebook.com/share/1dBWectEMA/',
};

export const SOCIAL_CONFIG = {
  instagramUrl: 'https://www.instagram.com/caramel20261?rpxt=bmh0cmF5MmlpcWQ2',
  tiktokUrl: 'https://www.tiktok.com/@caramel2226?_r=1&_t=ZS-9AZcTM4qbsv',
  whatsappChannelUrl: WHATSAPP_CHANNEL_URL,
};

/** Checks whether a given URL or phone number is still using an unconfigured placeholder */
export function isPlaceholder(val: string): boolean {
  if (!val) return true;
  return (
    val.includes('YOUR_USERNAME') ||
    val.includes('201XXXXXXXXX') ||
    val.includes('XXXXXXXXX') ||
    val.trim() === ''
  );
}

/** Builds the direct WhatsApp wa.me URL with pre-filled greeting */
export function getDirectWhatsAppChatUrl(lang: 'en' | 'ar'): string {
  const digits = WHATSAPP_CHAT_CONFIG.phoneNumberDigits.replace(/\D/g, '');
  if (isPlaceholder(digits)) {
    return `https://wa.me/${WHATSAPP_CHAT_CONFIG.phoneNumberDigits}`;
  }
  const msg =
    lang === 'ar'
      ? WHATSAPP_CHAT_CONFIG.defaultMessageAr
      : WHATSAPP_CHAT_CONFIG.defaultMessageEn;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}

/** Exactly three central social destinations (Instagram, TikTok, WhatsApp Channel) */
export const SOCIAL_LINKS: SocialDestination[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    nameAr: 'إنستغرام',
    url: SOCIAL_CONFIG.instagramUrl,
    ariaLabelEn: 'Visit Caramel on Instagram',
    ariaLabelAr: 'زيارة كراميل على إنستغرام',
    tooltipEn: 'Follow on Instagram',
    tooltipAr: 'تابعنا على إنستغرام',
    isConfigured: () => !isPlaceholder(SOCIAL_CONFIG.instagramUrl),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    nameAr: 'تيك توك',
    url: SOCIAL_CONFIG.tiktokUrl,
    ariaLabelEn: 'Follow Caramel on TikTok',
    ariaLabelAr: 'متابعة كراميل على تيك توك',
    tooltipEn: 'Watch on TikTok',
    tooltipAr: 'شاهدنا على تيك توك',
    isConfigured: () => !isPlaceholder(SOCIAL_CONFIG.tiktokUrl),
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Channel',
    nameAr: 'قناة واتساب',
    url: SOCIAL_CONFIG.whatsappChannelUrl,
    ariaLabelEn: 'Join our WhatsApp Channel',
    ariaLabelAr: 'انضم إلى قناة كراميل على واتساب',
    tooltipEn: 'Join our WhatsApp Channel',
    tooltipAr: 'قناة كراميل على واتساب',
    isConfigured: () => !isPlaceholder(SOCIAL_CONFIG.whatsappChannelUrl),
  },
];
