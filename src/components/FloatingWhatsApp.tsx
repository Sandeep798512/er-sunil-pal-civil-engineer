import React, { useState } from 'react';
import { MessageSquare, X, Send, Compass, Building2, Home } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { createWhatsAppUrl } from '../utils/helpers';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultUrl = createWhatsAppUrl(
    BUSINESS_INFO.primaryPhone,
    'Hello Er. Sunil Pal, I would like to consult with you regarding a project / property requirement in Boisar.'
  );

  const quickOptions = [
    {
      title: 'House Planning & Layout',
      message: 'Hello Er. Sunil Pal, I would like to consult about House Planning and Floor Plan drawings for my plot.',
      icon: <Compass className="w-3.5 h-3.5 text-teal-400" />
    },
    {
      title: 'Civil Construction Work',
      message: 'Hello Er. Sunil Pal, I have a residential civil construction requirement and would like to discuss scope and feasibility.',
      icon: <Building2 className="w-3.5 h-3.5 text-sky-400" />
    },
    {
      title: 'Flat Sale / Rental in Boisar',
      message: 'Hello Er. Sunil Pal, I am inquiring about available flat sale or rental options in the Boisar / Paam area.',
      icon: <Home className="w-3.5 h-3.5 text-emerald-400" />
    }
  ];

  return (
    <div className="fixed bottom-16 sm:bottom-20 lg:bottom-6 right-3 sm:right-5 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-2xl bg-[#091126] border border-teal-500/40 shadow-2xl overflow-hidden animate-fade-in text-white">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-teal-900/60 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                SP
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#091126]" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Er. Sunil Pal</div>
                <div className="text-[10px] text-teal-300 font-mono">Civil Engineer • Online via WhatsApp</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close WhatsApp popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#080E1E]">
            <p className="text-xs text-slate-300 leading-relaxed">
              Select your topic below to open a pre-filled WhatsApp message directly to <strong>+91 {BUSINESS_INFO.primaryPhone}</strong>:
            </p>

            <div className="space-y-2">
              {quickOptions.map((opt, idx) => {
                const url = createWhatsAppUrl(BUSINESS_INFO.primaryPhone, opt.message);
                return (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/40 text-xs text-slate-200 transition-colors group"
                  >
                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0">
                      {opt.icon}
                    </div>
                    <span className="truncate group-hover:text-teal-300 font-medium">{opt.title}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2 text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
              * Note: Clicking will open WhatsApp on your device. Please review and tap the "Send" button in WhatsApp to dispatch your message.
            </div>

            <a
              href={defaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-emerald-950/40"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Open Blank WhatsApp Chat</span>
            </a>
          </div>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all duration-300 active:scale-95"
        aria-label="Chat with Er. Sunil Pal on WhatsApp"
        aria-expanded={isOpen}
      >
        <MessageSquare className="w-5 h-5 fill-slate-950" />
        <span className="hidden sm:inline font-semibold">WhatsApp Er. Sunil Pal</span>
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
        </span>
      </button>

    </div>
  );
};
