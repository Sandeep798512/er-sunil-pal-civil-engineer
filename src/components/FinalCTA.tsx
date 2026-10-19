import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { createWhatsAppUrl } from '../utils/helpers';

export const FinalCTA: React.FC = () => {
  const whatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.primaryPhone,
    'Hello Er. Sunil Pal, I am planning a project and would like to arrange an engineering discussion.'
  );

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#091024] to-[#060B18] border-t border-slate-800 overflow-hidden">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <span>Start Your Planning Today</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-architectural font-bold text-white tracking-tight leading-tight mb-6"
        >
          Planning a New Space?{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-200 to-slate-200 block sm:inline">
            Let's Discuss Your Project.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          From civil construction execution to precision house plans and Boisar flat assistance, Er. Sunil Pal provides dedicated engineering clarity from day one.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <a
            href={`tel:${BUSINESS_INFO.primaryPhone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-base transition-all shadow-xl shadow-teal-950/50 hover:shadow-teal-400/30 active:scale-95"
          >
            <Phone className="w-5 h-5" />
            <span>Call {BUSINESS_INFO.primaryPhone}</span>
          </a>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-teal-500/40 text-teal-300 font-semibold text-base transition-all shadow-lg active:scale-95"
          >
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>WhatsApp Enquiry</span>
          </a>
        </motion.div>

        {/* Factual Address reminder */}
        <div className="inline-flex items-center gap-2 text-xs text-slate-400">
          <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
          <span>Office: Shop No. 7, Bldg No. 10B, Sodhi Residency, Vrindavan Nagari, Paam, Boisar – 401501</span>
        </div>

      </div>
    </section>
  );
};
