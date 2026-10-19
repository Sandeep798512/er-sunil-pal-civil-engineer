import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Key, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { PropertyEnquiryData } from '../types';
import { BUSINESS_INFO } from '../data/content';
import { isValidIndianPhone, saveEnquiryToStorage, createWhatsAppUrl } from '../utils/helpers';

export const PropertyEnquiry: React.FC = () => {
  const [formData, setFormData] = useState<PropertyEnquiryData>({
    enquiryType: 'Buy',
    locationPreference: 'Vrindavan Nagari / Paam',
    budgetRange: '₹15L - ₹25L',
    propertyType: '1 BHK',
    fullName: '',
    phone: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PropertyEnquiryData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const buyBudgetOptions = [
    'Under ₹15 Lakhs',
    '₹15L - ₹25L',
    '₹25L - ₹40L',
    '₹40L - ₹60L',
    '₹60L +',
  ];

  const rentBudgetOptions = [
    '₹4,000 - ₹7,000 / month',
    '₹7,000 - ₹12,000 / month',
    '₹12,000 - ₹18,000 / month',
    '₹18,000 + / month',
  ];

  const locationOptions = [
    'Vrindavan Nagari / Paam (Near Office)',
    'Boisar Station Area',
    'Tarapur Road',
    'Boisar East',
    'Boisar West',
    'Palghar Road',
    'Other / Any Good Locality in Boisar',
  ];

  const propertyTypeOptions = [
    '1 RK Flat',
    '1 BHK Flat',
    '2 BHK Flat',
    '3 BHK Flat',
    'Row House / Bungalow',
    'Commercial Shop / Office Space',
    'Residential Plot / Land',
  ];

  const handleEnquiryTypeChange = (type: 'Buy' | 'Rent') => {
    setFormData((prev) => ({
      ...prev,
      enquiryType: type,
      budgetRange: type === 'Buy' ? '₹15L - ₹25L' : '₹7,000 - ₹12,000 / month',
    }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyEnquiryData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!isValidIndianPhone(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const record = saveEnquiryToStorage('property', formData);
      setSubmittedRef(record.id);
      setIsSubmitting(false);
    }, 500);
  };

  const formattedWhatsAppUrl = submittedRef
    ? createWhatsAppUrl(
        BUSINESS_INFO.primaryPhone,
        `Hello Er. Sunil Pal,\n\nI have submitted a Property Enquiry [Ref: ${submittedRef}]:\n- Type: ${formData.enquiryType}\n- Property: ${formData.propertyType}\n- Location: ${formData.locationPreference}\n- Budget: ${formData.budgetRange}\n- Name: ${formData.fullName}\n- Phone: ${formData.phone}${formData.notes ? `\n- Details: ${formData.notes}` : ''}\n\nPlease share available options in Boisar.`
      )
    : '';

  return (
    <section id="property-enquiry" className="relative py-20 lg:py-28 bg-[#091024] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Key className="w-3.5 h-3.5" />
            <span>Dedicated Property Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-architectural font-bold text-white mb-5">
            Flat Sale & Rental Assistance
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Looking to purchase or rent a flat in Boisar? Submit your exact criteria below. We match you with verified, genuine options in Sodhi Residency, Vrindavan Nagari, and nearby neighborhoods.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-10"
        >
          {submittedRef ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-architectural font-bold text-white mb-2">
                Property Enquiry Received
              </h3>
              <p className="text-sm font-mono text-teal-400 mb-4">
                Reference ID: <span className="underline font-bold">{submittedRef}</span>
              </p>
              <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Er. Sunil Pal will review matching {formData.enquiryType.toLowerCase()} opportunities for <strong>{formData.propertyType}</strong> in <strong>{formData.locationPreference}</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={formattedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/50 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp Now</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setFormData({
                      enquiryType: 'Buy',
                      locationPreference: 'Vrindavan Nagari / Paam',
                      budgetRange: '₹15L - ₹25L',
                      propertyType: '1 BHK',
                      fullName: '',
                      phone: '',
                      notes: '',
                    });
                  }}
                  className="w-full sm:w-auto px-5 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold border border-slate-700 transition-colors active:scale-95"
                >
                  Submit Another Enquiry
                </button>
              </div>

              <div className="mt-8 text-xs text-slate-500">
                You can also call directly at <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="text-teal-400 underline font-bold">{BUSINESS_INFO.primaryPhone}</a>.
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Enquiry Type Selector: Buy or Rent */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  I am looking to:
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => handleEnquiryTypeChange('Buy')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                      formData.enquiryType === 'Buy'
                        ? 'bg-teal-400 text-slate-950 border-teal-300 shadow-md shadow-teal-950/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Buy Property</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEnquiryTypeChange('Rent')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                      formData.enquiryType === 'Rent'
                        ? 'bg-teal-400 text-slate-950 border-teal-300 shadow-md shadow-teal-950/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    <Key className="w-4 h-4" />
                    <span>Rent Property</span>
                  </button>
                </div>
              </div>

              {/* Grid: Property Type & Preferred Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="propertyType" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Property Configuration *
                  </label>
                  <select
                    id="propertyType"
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400 text-base sm:text-sm"
                  >
                    {propertyTypeOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="locationPreference" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Preferred Location / Area *
                  </label>
                  <select
                    id="locationPreference"
                    value={formData.locationPreference}
                    onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400 text-base sm:text-sm"
                  >
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc} className="bg-slate-900 text-white">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budgetRange" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Budget Range ({formData.enquiryType === 'Buy' ? 'Purchase Budget' : 'Monthly Rent'}) *
                </label>
                <select
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400 text-base sm:text-sm"
                >
                  {(formData.enquiryType === 'Buy' ? buyBudgetOptions : rentBudgetOptions).map((b) => (
                    <option key={b} value={b} className="bg-slate-900 text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="propFullName" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    id="propFullName"
                    placeholder="e.g. Ramesh Sharma"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-white placeholder-slate-500 focus:outline-none text-base sm:text-sm ${
                      errors.fullName ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-teal-400'
                    }`}
                  />
                  {errors.fullName && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="propPhone" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Mobile Number (WhatsApp Enabled) *
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    id="propPhone"
                    placeholder="e.g. 9820012345"
                    value={formData.phone}
                    maxLength={10}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-white placeholder-slate-500 focus:outline-none text-base sm:text-sm font-mono ${
                      errors.phone ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-teal-400'
                    }`}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label htmlFor="propNotes" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Specific Requirements or Timeline (Optional)
                </label>
                <textarea
                  id="propNotes"
                  rows={3}
                  placeholder="e.g. Looking for ready-to-move flat with lift in Sodhi Residency / immediate rental requirement..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 text-base sm:text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-teal-400 hover:bg-teal-300 disabled:bg-slate-700 text-slate-950 font-bold text-base transition-all shadow-lg shadow-teal-950/40 active:scale-98"
                >
                  {isSubmitting ? (
                    <span>Validating & Recording...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Property Enquiry</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                Your contact details are used strictly to provide relevant property updates from Er. Sunil Pal's office.
              </div>

            </form>
          )}

        </motion.div>

      </div>
    </section>
  );
};
