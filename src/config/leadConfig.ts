/**
 * Lead capture configuration for Er. Sunil Pal website
 */

// If you have deployed your Google Apps Script, you can put the Web App URL here or in .env (VITE_GOOGLE_SHEET_WEBHOOK_URL)
export const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL: string =
  (import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL as string) || '';

export const LEAD_CONFIG = {
  adminEmail: 'sandeepgaud8081@gmail.com',
  primaryPhone: '8127236929',
  secondaryPhone: '8010801624',
  webhookTimeoutMs: 4000, // Max 4 seconds before gracefully falling back so WhatsApp opening is never blocked
};
