import React, { useEffect } from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (type) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#080E1E] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-teal-400" />
            ) : (
              <FileText className="w-5 h-5 text-sky-400" />
            )}
            <h3 className="text-lg font-architectural font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions of Service'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>1. Information Collection:</strong> When you submit a project consultation or property enquiry through this website, we collect your name, phone number, email address, and project brief solely to facilitate communication with Er. Sunil Pal.
              </p>
              <p>
                <strong>2. Usage of Information:</strong> Contact details provided are utilized strictly to respond to your construction, house planning, or flat inquiry. We do not sell, rent, or distribute client contact details to third-party telemarketers or external vendors.
              </p>
              <p>
                <strong>3. WhatsApp & Direct Communication:</strong> If you choose to contact us via WhatsApp or phone, conversations are subject to standard telecommunication security. We keep your building requirements confidential.
              </p>
              <p>
                <strong>4. Contact for Privacy Inquiries:</strong> If you wish to update or delete your enquiry records, you may email us directly at{' '}
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-teal-400 underline">
                  {BUSINESS_INFO.email}
                </a>{' '}
                or visit our office at {BUSINESS_INFO.address.shop}, {BUSINESS_INFO.address.building}, {BUSINESS_INFO.address.locality}, Boisar – 401501.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Nature of Website Content:</strong> This website serves as a professional portfolio and contact point for Er. Sunil Pal (Civil Engineer). Visuals labeled as architectural concepts and gallery items illustrate design standards and planning potential; they do not represent past unverified claims.
              </p>
              <p>
                <strong>2. Quotations and Service Contracts:</strong> All construction estimates, bill of quantities (BOQ), architectural drafting fees, and execution timelines are finalized through written agreements following on-site evaluation and mutual consent. Website content does not constitute a unilateral binding contract.
              </p>
              <p>
                <strong>3. Property Assistance:</strong> Inquiries regarding flat sales and rentals in Boisar are handled on an advisory and facilitation basis. Buyers and tenants are encouraged to verify title deeds, municipal sanctions, and ownership records prior to concluding financial transactions.
              </p>
              <p>
                <strong>4. Governing Jurisdiction:</strong> Any matters relating to civil engineering contracts executed with Er. Sunil Pal are subject to the applicable laws and judicial jurisdiction of Palghar / Maharashtra, India.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-xs transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
