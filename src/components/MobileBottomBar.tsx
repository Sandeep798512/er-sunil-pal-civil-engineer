import React from 'react';
import { Phone, MessageSquare, Send, Compass } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { createWhatsAppUrl } from '../utils/helpers';

interface MobileBottomBarProps {
  onOpenConsultation: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenConsultation }) => {
  const whatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.primaryPhone,
    'Hello Er. Sunil Pal, I am visiting your website and would like to enquire about your civil engineering services.'
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#070D1E]/95 backdrop-blur-md border-t border-slate-800/90 px-3 py-2.5 shadow-2xl safe-area-pb">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* Direct Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.primaryPhone}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 active:bg-slate-800 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-teal-400 mb-0.5" />
          <span className="text-[10px] font-bold text-white tracking-wide">Call Now</span>
        </a>

        {/* WhatsApp Direct Action */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 active:bg-emerald-900 active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-bold text-emerald-200 tracking-wide">WhatsApp</span>
        </a>

        {/* Discuss Project Button */}
        <button
          type="button"
          onClick={onOpenConsultation}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-gradient-to-r from-teal-400 to-teal-300 text-slate-950 active:scale-95 transition-all shadow-md shadow-teal-950/40"
        >
          <Compass className="w-4 h-4 text-slate-950 mb-0.5" />
          <span className="text-[10px] font-bold text-slate-950 tracking-wide">Consult</span>
        </button>
      </div>
    </div>
  );
};
