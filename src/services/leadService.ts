import { ContactFormData, PropertyEnquiryData } from '../types';
import { generateEnquiryId, saveEnquiryToStorage, createWhatsAppUrl } from '../utils/helpers';
import { DEFAULT_GOOGLE_SHEET_WEBHOOK_URL, LEAD_CONFIG } from '../config/leadConfig';

export interface LeadPayload {
  id: string;
  referenceId: string;
  type: 'Project Consultation' | 'Property Enquiry';
  leadType: 'Project Consultation' | 'Property Enquiry';
  name: string;
  clientName: string;
  fullName: string;
  phone: string;
  email?: string;
  service: string;
  projectType: string;
  serviceOrType: string;
  location?: string;
  siteLocation?: string;
  budget?: string;
  message: string;
  requirement: string;
  messageOrNotes: string;
  timestamp: string;
}

export interface LeadSubmissionResult {
  id: string;
  waUrl: string;
  syncedToSheet: boolean;
}

const serviceLabels: Record<string, string> = {
  'civil-construction': 'Civil Construction Work',
  'house-planning': 'House Planning & Building Plans',
  'flat-sale-rental': 'Flat Sale & Rental Assistance',
  'general-consultation': 'General Engineering Consultation',
};

/**
 * Sends lead data to the Google Sheets & Email Webhook.
 * Uses mode: 'no-cors' and text/plain to avoid CORS preflight issues with Google Apps Script.
 */
export const dispatchLeadToGoogleSheet = async (payload: LeadPayload): Promise<boolean> => {
  const webhookUrl = DEFAULT_GOOGLE_SHEET_WEBHOOK_URL.trim();

  // If no webhook URL is configured yet, record locally and succeed gracefully
  if (!webhookUrl) {
    console.info('Google Sheet Webhook URL not configured yet. Lead preserved in local register:', payload.id);
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), LEAD_CONFIG.webhookTimeoutMs);

    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch (err) {
    console.warn('Google Sheet webhook sync notice (lead saved locally):', err);
    return false;
  }
};

/**
 * Submits a Project Consultation form:
 * 1. Generates unique reference ID (e.g. PRJ-261031-1234)
 * 2. Saves to local digital register (localStorage)
 * 3. Dispatches asynchronously to Google Sheet + Email webhook
 * 4. Generates formatted international WhatsApp link
 */
export const submitProjectLead = async (formData: ContactFormData): Promise<LeadSubmissionResult> => {
  const refId = generateEnquiryId('PRJ');
  const timestamp = new Date().toISOString();
  const resolvedService = serviceLabels[formData.service] || formData.service;
  const clientName = formData.fullName.trim();
  const phone = formData.phone.trim();
  const location = formData.location.trim() || undefined;
  const message = formData.message.trim();

  const payload: LeadPayload = {
    id: refId,
    referenceId: refId,
    type: 'Project Consultation',
    leadType: 'Project Consultation',
    name: clientName,
    clientName,
    fullName: clientName,
    phone,
    email: formData.email.trim() || undefined,
    service: resolvedService,
    projectType: resolvedService,
    serviceOrType: resolvedService,
    location,
    siteLocation: location,
    budget: 'Discussion Required',
    message,
    requirement: message,
    messageOrNotes: message,
    timestamp,
  };

  // 1. Local backup save (synchronous, fail-proof)
  saveEnquiryToStorage('project', formData, refId);

  // 2. Dispatch to Google Sheet + Email Alert (with timeout protection)
  const syncedToSheet = await dispatchLeadToGoogleSheet(payload);

  // 3. Build WhatsApp text
  const waText = `Hello Er. Sunil Pal,\n\nI have submitted a Project Consultation Enquiry [Ref: ${refId}]:\n- Service: ${payload.serviceOrType}\n- Client Name: ${payload.clientName}\n- Mobile: ${payload.phone}${payload.location ? `\n- Location: ${payload.location}` : ''}${payload.email ? `\n- Email: ${payload.email}` : ''}\n- Requirement: ${payload.messageOrNotes}\n\nPlease let me know when we can discuss this.`;

  const waUrl = createWhatsAppUrl(LEAD_CONFIG.primaryPhone, waText);

  return {
    id: refId,
    waUrl,
    syncedToSheet,
  };
};

/**
 * Submits a Property Enquiry form (Buy/Rent in Boisar):
 * 1. Generates unique reference ID (e.g. PROP-261031-5678)
 * 2. Saves to local digital register
 * 3. Dispatches asynchronously to Google Sheet + Email webhook
 * 4. Generates formatted international WhatsApp link
 */
export const submitPropertyLead = async (formData: PropertyEnquiryData): Promise<LeadSubmissionResult> => {
  const refId = generateEnquiryId('PROP');
  const timestamp = new Date().toISOString();
  const resolvedService = `${formData.enquiryType} - ${formData.propertyType}`;
  const clientName = formData.fullName.trim();
  const phone = formData.phone.trim();
  const location = formData.locationPreference;
  const budget = formData.budgetRange;
  const message = formData.notes.trim() || `Property Enquiry: ${formData.enquiryType} ${formData.propertyType} in ${formData.locationPreference}`;

  const payload: LeadPayload = {
    id: refId,
    referenceId: refId,
    type: 'Property Enquiry',
    leadType: 'Property Enquiry',
    name: clientName,
    clientName,
    fullName: clientName,
    phone,
    service: resolvedService,
    projectType: resolvedService,
    serviceOrType: resolvedService,
    location,
    siteLocation: location,
    budget,
    message,
    requirement: message,
    messageOrNotes: message,
    timestamp,
  };

  // 1. Local backup save
  saveEnquiryToStorage('property', formData, refId);

  // 2. Dispatch to Google Sheet + Email Alert
  const syncedToSheet = await dispatchLeadToGoogleSheet(payload);

  // 3. Build WhatsApp text
  const waText = `Hello Er. Sunil Pal,\n\nI have submitted a Property Enquiry [Ref: ${refId}]:\n- Requirement Type: ${formData.enquiryType}\n- Configuration: ${formData.propertyType}\n- Preferred Area: ${formData.locationPreference}\n- Budget Range: ${formData.budgetRange}\n- Client Name: ${payload.clientName}\n- Mobile: ${payload.phone}${formData.notes ? `\n- Specific Notes: ${formData.notes}` : ''}\n\nPlease share available verified property options in Boisar.`;

  const waUrl = createWhatsAppUrl(LEAD_CONFIG.primaryPhone, waText);

  return {
    id: refId,
    waUrl,
    syncedToSheet,
  };
};
