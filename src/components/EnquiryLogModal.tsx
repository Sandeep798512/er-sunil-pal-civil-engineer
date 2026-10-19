import React, { useState, useEffect } from 'react';
import { X, Database, Clock, RefreshCw, Trash2, CheckCircle2 } from 'lucide-react';
import { SavedEnquiry } from '../types';
import { getStoredEnquiries } from '../utils/helpers';

interface EnquiryLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryLogModal: React.FC<EnquiryLogModalProps> = ({ isOpen, onClose }) => {
  const [enquiries, setEnquiries] = useState<SavedEnquiry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setEnquiries(getStoredEnquiries());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClear = () => {
    if (window.confirm('Clear local enquiry records stored in this browser session?')) {
      localStorage.removeItem('er_sunil_pal_enquiries_v1');
      setEnquiries([]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-3xl bg-[#080E1E] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-base font-architectural font-bold text-white">
                Recorded Inquiries Database
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Secure Client-Side Enquiry Registry ({enquiries.length} records)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {enquiries.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Clear local logs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {enquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs sm:text-sm">
              <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              No enquiries recorded in this browser session yet.
              <p className="text-[11px] text-slate-500 mt-1">
                Submissions made through the Project Consultation or Property forms appear here with their generated Reference IDs.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-teal-400">
                      {item.id}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-slate-300">
                    <strong className="text-white">Type:</strong>{' '}
                    <span className="uppercase text-teal-300 font-mono text-[11px] font-semibold">
                      {item.type === 'project' ? 'Project Consultation' : 'Property Search'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-300 space-y-1">
                    {Object.entries(item.data).map(([key, val]) => (
                      <div key={key} className="flex">
                        <span className="text-slate-500 w-32 shrink-0">{key}:</span>
                        <span className="text-white truncate">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
          <span>Client-side local storage backup. Form submissions are verified and saved.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
