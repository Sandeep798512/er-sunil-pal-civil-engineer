/**
 * Lead capture configuration for Er. Sunil Pal website
 */

// Deployed Google Apps Script Web App URL for Er. Sunil Pal website lead capture
export const DEFAULT_GOOGLE_SHEET_WEBHOOK_URL: string =
  (import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL as string) ||
  'https://script.google.com/macros/s/AKfycby2jBSWaEbVTRS5-4a6dDyRe_el_KcPOqBme2YNKgi-aPRV0OcUr9bSynEHEUkD6qy8/exec';

export const LEAD_CONFIG = {
  adminEmail: 'softer7985@gmail.com',
  primaryPhone: '8127236929',
  secondaryPhone: '8010801624',
  webhookTimeoutMs: 4000, // Max 4 seconds before gracefully falling back so WhatsApp opening is never blocked
};
