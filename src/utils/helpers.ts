import { SavedEnquiry, ContactFormData, PropertyEnquiryData } from '../types';

export const sanitizeIndianPhone = (phone: string): string => {
  return phone.replace(/\D/g, '').replace(/^91/, '').slice(-10);
};

export const isValidIndianPhone = (phone: string): boolean => {
  const cleaned = sanitizeIndianPhone(phone);
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const createWhatsAppUrl = (phone: string, text: string): string => {
  const cleanedPhone = phone.replace(/\D/g, '');
  const internationalNumber = cleanedPhone.startsWith('91') ? cleanedPhone : `91${cleanedPhone}`;
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(text)}`;
};

export const generateEnquiryId = (prefix: string = 'ESP'): string => {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${dateStr}-${randomPart}`;
};

const STORAGE_KEY = 'er_sunil_pal_enquiries_v1';

export const saveEnquiryToStorage = (
  type: 'project' | 'property',
  data: ContactFormData | PropertyEnquiryData
): SavedEnquiry => {
  const id = generateEnquiryId(type === 'project' ? 'PRJ' : 'PROP');
  const record: SavedEnquiry = {
    id,
    timestamp: new Date().toISOString(),
    type,
    data,
  };

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existingList: SavedEnquiry[] = existingRaw ? JSON.parse(existingRaw) : [];
    existingList.unshift(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingList.slice(0, 50)));
  } catch (err) {
    console.warn('Unable to persist enquiry to localStorage:', err);
  }

  return record;
};

export const getStoredEnquiries = (): SavedEnquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
