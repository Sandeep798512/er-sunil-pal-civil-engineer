import React from 'react';
import { motion } from 'framer-motion';
import { Compass, MapPin, Phone, Mail, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

export const AboutEngineer: React.FC = () => {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#070D1E] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Professional Portrait Placeholder & Office Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer architectural frame with 3D shadow */}
              <div className="rounded-3xl p-1 bg-gradient-to-br from-teal-500/30 via-slate-700/40 to-blue-500/20 shadow-2xl">
                
                <div className="rounded-2xl bg-[#091126] overflow-hidden border border-slate-800 p-6 sm:p-8 flex flex-col items-center text-center">
                  
                  {/* Real Portrait Photo with Architectural Border */}
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-slate-900 border-2 border-teal-500/50 p-1.5 shadow-xl shadow-teal-950/40 mb-6 flex items-center justify-center group">
                    <img
                      src="/images/er-sunil.jpeg"
                      alt="Er. Sunil Pal — Civil Engineer"
                      className="w-full h-full rounded-full object-cover object-[center_20%] shadow-inner group-hover:scale-105 transition-transform duration-500"
                      loading="eager"
                    />

                    <div
                      className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 w-8 h-8 rounded-full bg-teal-500 border-2 border-[#091126] flex items-center justify-center text-slate-950 font-bold text-xs shadow-lg"
                      title="Verified Civil Engineer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <h3 className="text-2xl font-architectural font-bold text-white mb-1">
                    Er. Sunil Pal
                  </h3>
                  <div className="text-sm font-mono text-teal-400 uppercase tracking-widest mb-4">
                    Civil Engineer
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs mb-6">
                    Practicing Civil Engineer offering residential construction oversight, technical house planning, and flat sale & rental assistance in Boisar.
                  </p>

                  {/* Direct Contact Cards */}
                  <div className="w-full space-y-2.5 pt-5 border-t border-slate-800 text-left">
                    <a
                      href={`tel:${BUSINESS_INFO.primaryPhone}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors text-xs text-slate-300 hover:text-white active:scale-98"
                    >
                      <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400">Primary Contact</div>
                        <div className="font-mono font-medium text-white">{BUSINESS_INFO.primaryPhone}</div>
                      </div>
                    </a>

                    <a
                      href={`tel:${BUSINESS_INFO.secondaryPhone}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors text-xs text-slate-300 hover:text-white active:scale-98"
                    >
                      <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                      <div>
                        <div className="text-[10px] text-slate-400">Secondary Contact</div>
                        <div className="font-mono font-medium text-white">{BUSINESS_INFO.secondaryPhone}</div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors text-xs text-slate-300 hover:text-white active:scale-98"
                    >
                      <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                      <div className="truncate">
                        <div className="text-[10px] text-slate-400">Official Email</div>
                        <div className="font-mono text-white truncate">{BUSINESS_INFO.email}</div>
                      </div>
                    </a>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Verified Professional Statement */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Professional Profile</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-architectural font-bold text-white mb-6 leading-tight">
              Civil Engineering Practice Grounded in Practical Precision
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                <strong>Er. Sunil Pal</strong> operates an independent civil engineering and property consultancy based in <strong>Boisar, Maharashtra</strong>. With a core focus on residential construction, custom house plan drafting, and local real estate assistance, our practice is designed to provide clients with direct, personal engineering guidance.
              </p>
              <p>
                Rather than navigating through distant intermediaries or commissioned agents, clients work directly with Er. Sunil Pal to conceptualize room layouts, assess site conditions, supervise physical brick-and-mortar execution, or identify suitable flats for purchase and rent in the Boisar-Palghar industrial corridor.
              </p>
              <p>
                Every project is handled with high attention to structural measurements, sensible material selection, and clear, transparent communication at every milestone.
              </p>
            </div>

            {/* Verified Address & Office Information */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono text-teal-400 uppercase tracking-wider">Office Location</div>
                  <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                    {BUSINESS_INFO.address.full}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Situated in Vrindavan Nagari, Paam, conveniently accessible for residents across Boisar, Tarapur, and surrounding talukas.
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  <span className="text-slate-300 font-medium">Visiting Hours:</span> {BUSINESS_INFO.operatingHours}
                </div>
                <a
                  href={BUSINESS_INFO.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-bold active:scale-95 transition-all"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
