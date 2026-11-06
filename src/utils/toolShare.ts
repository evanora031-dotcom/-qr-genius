import type { Language } from '../types';

export type ShareableTool = 'url' | 'wifi' | 'whatsapp' | 'business';

const TOOL_PATHS: Record<ShareableTool, string> = {
  url: '/tools/url',
  wifi: '/tools/wifi',
  whatsapp: '/tools/whatsapp',
  business: '/tools/business-vcard'
};

/**
 * Share the public tool page, never user-entered QR content (which may include
 * Wi-Fi passwords, contact details, or other sensitive data).
 */
export function getToolShareUrl(tool: ShareableTool, lang: Language): string {
  const localePrefix = lang === 'en' ? '' : `/${lang}`;
  return `https://getqrgenius.com${localePrefix}${TOOL_PATHS[tool]}`;
}
