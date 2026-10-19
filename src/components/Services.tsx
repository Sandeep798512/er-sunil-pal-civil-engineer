import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Compass, Home, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data/content';
import { ServiceType } from '../types';
import { createWhatsAppUrl } from '../utils/helpers';

interface ServicesProps {
  onSelectService: (serviceId: ServiceType) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Home':
        return <Home className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#091024] border-t border-slate-800/80">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-architectural font-bold text-white mb-5">
            Engineering & Property Services
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Professional civil construction work, architectural building planning, and transparent property assistance—delivered with direct engineering accountability.
          </p>
        </motion.div>

        {/* 3 Core Services Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const whatsAppUrl = createWhatsAppUrl(
              BUSINESS_INFO.primaryPhone,
              `Hello Er. Sunil Pal, I am interested in inquiring about "${service.title}". Please provide more details.`
            );

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative flex flex-col justify-between bg-slate-900/80 border border-slate-700/80 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-teal-950/40"
              >
                {/* Image & Overlay */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-800">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Service Number Badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-lg bg-[#070D1E]/90 backdrop-blur-md border border-slate-700 flex items-center justify-center text-teal-400 font-mono text-xs font-bold">
                    0{index + 1}
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-teal-500/20 backdrop-blur-md border border-teal-500/40 flex items-center justify-center text-teal-300">
                    {getIcon(service.iconName)}
                  </div>

                  {/* Title Overlay on Image Bottom */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400">
                      {service.tagline}
                    </span>
                    <h3 className="text-xl font-architectural font-bold text-white group-hover:text-teal-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-8">
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                        Scope & Highlights:
                      </div>
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-slate-800 space-y-2.5">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.id)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-98"
                    >
                      <span>Enquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 text-xs font-medium border border-slate-700 transition-colors active:scale-98"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Discussion</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center text-xs text-slate-400 max-w-xl mx-auto bg-slate-900/60 p-3 rounded-xl border border-slate-800"
        >
          All service discussions and technical reviews are conducted directly by Er. Sunil Pal. Detailed scope estimates are prepared after evaluating your project specifications.
        </motion.div>

      </div>
    </section>
  );
};
