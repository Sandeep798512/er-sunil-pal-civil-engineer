import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { ServiceType, ContactFormData } from '../types';
import { isValidIndianPhone, saveEnquiryToStorage, createWhatsAppUrl } from '../utils/helpers';

interface ContactSectionProps {
  preselectedService?: ServiceType;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    service: preselectedService || 'civil-construction',
    location: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const serviceLabels: Record<ServiceType, string> = {
    'civil-construction': 'Civil Construction Work',
    'house-planning': 'House Planning & Building Plans',
    'flat-sale-rental': 'Flat Sale & Rental Assistance',
    'general-consultation': 'General Engineering Consultation',
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

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

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide a brief outline of your requirement.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const record = saveEnquiryToStorage('project', formData);
      setSubmittedRef(record.id);
      setIsSubmitting(false);
    }, 500);
  };

  const formattedWhatsAppUrl = submittedRef
    ? createWhatsAppUrl(
        BUSINESS_INFO.primaryPhone,
        `Hello Er. Sunil Pal,\n\nI have sent a Project Consultation Enquiry [Ref: ${submittedRef}]:\n- Service: ${serviceLabels[formData.service]}\n- Name: ${formData.fullName}\n- Phone: ${formData.phone}${formData.location ? `\n- Location: ${formData.location}` : ''}\n- Details: ${formData.message}\n\nPlease let me know when we can discuss this.`
      )
    : '';

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#070D1E] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Engineering Consultation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-architectural font-bold text-white mb-5">
            Discuss Your Project With Er. Sunil Pal
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Have a residential construction plan, house drawing requirement, or property query in Boisar? Reach out directly to initiate your technical review.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Direct Contact & Office Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
              
              <h3 className="text-xl font-architectural font-bold text-white">
                Contact Information
              </h3>

              {/* Phone Numbers */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Direct Phone Lines:
                </div>

                <a
                  href={`tel:${BUSINESS_INFO.primaryPhone}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 transition-colors group active:scale-98"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-teal-400 font-mono uppercase tracking-wider">Primary Number</div>
                    <div className="text-sm font-bold text-white font-mono group-hover:text-teal-300 transition-colors">
                      {BUSINESS_INFO.phones[0].display}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${BUSINESS_INFO.secondaryPhone}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 transition-colors group active:scale-98"
                >
                  <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-sky-400 font-mono uppercase tracking-wider">Secondary Number</div>
                    <div className="text-sm font-bold text-white font-mono group-hover:text-sky-300 transition-colors">
                      {BUSINESS_INFO.phones[1].display}
                    </div>
                  </div>
                </a>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Email Address:
                </div>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 transition-colors group active:scale-98"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">Official Inquiries</div>
                    <div className="text-sm font-mono text-white group-hover:text-amber-300 transition-colors truncate">
                      {BUSINESS_INFO.email}
                    </div>
                  </div>
                </a>
              </div>

              {/* Office Address */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Office Location:
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                    <div className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white block font-medium mb-0.5">Er. Sunil Pal Civil Engineer Office</strong>
                      Shop No. 7, Building No. 10B, Sodhi Residency, Vrindavan Nagari, Paam, Boisar – 401501, Maharashtra.
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      9:30 AM – 8:30 PM (Mon-Sat)
                    </span>
                    <a
                      href={BUSINESS_INFO.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-bold"
                    >
                      <span>Get Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Interactive Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-10 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl">
              
              {submittedRef ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-architectural font-bold text-white mb-2">
                    Consultation Request Recorded
                  </h3>
                  <p className="text-sm font-mono text-teal-400 mb-4">
                    Reference ID: <span className="underline font-bold">{submittedRef}</span>
                  </p>
                  <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Your requirement for <strong>{serviceLabels[formData.service]}</strong> has been received by Er. Sunil Pal.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={formattedWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-950/50 active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Forward Directly via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedRef(null);
                        setFormData({
                          fullName: '',
                          phone: '',
                          email: '',
                          service: 'civil-construction',
                          location: '',
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-5 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold border border-slate-700 transition-colors active:scale-95"
                    >
                      Send Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  
                  <div>
                    <h3 className="text-xl font-architectural font-bold text-white mb-1">
                      Project Consultation Form
                    </h3>
                    <p className="text-xs text-slate-400">
                      Fill in your specifications to arrange an engineering review or quote.
                    </p>
                  </div>

                  {/* Service Selection Dropdown */}
                  <div>
                    <label htmlFor="serviceSelect" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Primary Service Required *
                    </label>
                    <select
                      id="serviceSelect"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as ServiceType })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-teal-400 text-base sm:text-sm"
                    >
                      <option value="civil-construction">Civil Construction Work</option>
                      <option value="house-planning">House Planning & Building Plans</option>
                      <option value="flat-sale-rental">Flat Sale & Rental Assistance</option>
                      <option value="general-consultation">General Consultation / Site Assessment</option>
                    </select>
                  </div>

                  {/* Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="contactName" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        placeholder="e.g. Anand More"
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
                      <label htmlFor="contactPhone" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        id="contactPhone"
                        placeholder="e.g. 7030399100"
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

                  {/* Email & Plot Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="contactEmail" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        id="contactEmail"
                        placeholder="e.g. client@gmail.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-white placeholder-slate-500 focus:outline-none text-base sm:text-sm ${
                          errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-teal-400'
                        }`}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contactLocation" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Project / Plot Location
                      </label>
                      <input
                        type="text"
                        id="contactLocation"
                        placeholder="e.g. Boisar, Paam, Tarapur, Palghar"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 text-base sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Message / Brief */}
                  <div>
                    <label htmlFor="contactMessage" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Brief Description of Requirement *
                    </label>
                    <textarea
                      id="contactMessage"
                      rows={4}
                      placeholder="e.g. Plot size is 1200 sq.ft. Need G+1 house planning and structural estimate..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 border text-white placeholder-slate-500 focus:outline-none text-base sm:text-sm resize-none ${
                        errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-teal-400'
                      }`}
                    />
                    {errors.message && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </div>
                    )}
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
                          <span>Submit Project Consultation Request</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-400 text-center">
                    All enquiries are handled directly by Er. Sunil Pal. Strictly confidential engineering discussion.
                  </div>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
