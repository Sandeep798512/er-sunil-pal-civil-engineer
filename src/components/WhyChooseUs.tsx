import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ShieldCheck, FileText, MapPin, Maximize2, Key } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/content';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-teal-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-amber-400" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-emerald-400" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5 text-purple-400" />;
      case 'Key':
        return <Key className="w-5 h-5 text-teal-300" />;
      default:
        return <UserCheck className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <section className="relative py-20 lg:py-24 bg-[#070D1E] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Engineering Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-architectural font-bold text-white mb-5">
            Why Work With Er. Sunil Pal
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Constructing a home or purchasing property is a major milestone. We provide clear, factual guidance backed by civil engineering fundamentals and local knowledge.
          </p>
        </motion.div>

        {/* 6 Feature Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5 font-architectural group-hover:text-teal-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Local Boisar Engineering Banner with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B152D] to-slate-900 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 shrink-0 mt-1">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-teal-400 uppercase tracking-wider">Local Presence</div>
              <div className="text-base sm:text-lg font-bold text-white">Based at Sodhi Residency, Vrindavan Nagari, Paam, Boisar</div>
              <div className="text-xs text-slate-300 mt-1">Accessible for on-site visits across Boisar, Tarapur industrial belt, and surrounding Palghar taluka.</div>
            </div>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs sm:text-sm font-bold border border-teal-500/40 transition-colors active:scale-95"
          >
            Schedule Office Visit
          </a>
        </motion.div>

      </div>
    </section>
  );
};
