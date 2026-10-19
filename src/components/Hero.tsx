import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, MapPin, Phone, Building2, Box, Image as ImageIcon } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { ThreeBuildingViewer } from './ThreeBuildingViewer';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreServices }) => {
  const [heroViewMode, setHeroViewMode] = useState<'3d' | 'photo'>('3d');

  return (
    <section
      id="home"
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-[#070D1E]"
    >
      {/* Background Architectural Blueprint Grid & Radial Glow */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Engineering Coordinate Watermark */}
      <div className="hidden lg:block absolute top-32 right-12 text-[10px] font-mono tracking-widest text-slate-500/40 uppercase select-none pointer-events-none">
        LAT 19.8021° N / LON 72.7533° E • BOISAR - 401501
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions with Framer Motion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Professional Identity Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-6 w-fit shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
              <span>Civil Engineering & Construction</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              <span className="text-slate-400 font-normal">Boisar, MH</span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-architectural font-bold text-white tracking-tight leading-[1.15] mb-6"
            >
              Thoughtful Design.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-200 to-slate-200">
                Strong Foundations.
              </span>{' '}
              Lasting Spaces.
            </motion.h1>

            {/* Supporting Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              Professional civil construction work, precision house planning, and trusted flat sale & rental assistance led by{' '}
              <strong className="text-white font-semibold">Er. Sunil Pal</strong>. Grounded in structural integrity, accurate drafting, and practical execution in the Boisar region.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            >
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-lg shadow-teal-900/30 hover:shadow-teal-400/20 active:scale-98 transition-all"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 rounded-lg transition-all active:scale-98"
              >
                <span>Explore Our Services</span>
              </button>
            </motion.div>

            {/* Factual Core Service Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80"
            >
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 hover:border-teal-500/30 transition-colors">
                <div className="w-8 h-8 rounded-md bg-teal-950/60 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Civil Construction</div>
                  <div className="text-[11px] text-slate-400">Residential & Sites</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 hover:border-sky-500/30 transition-colors">
                <div className="w-8 h-8 rounded-md bg-sky-950/60 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">House Planning</div>
                  <div className="text-[11px] text-slate-400">Layouts & Drawings</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/60 hover:border-emerald-500/30 transition-colors">
                <div className="w-8 h-8 rounded-md bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">Flat Sale & Rental</div>
                  <div className="text-[11px] text-slate-400">Boisar Assistance</div>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: 3D WebGL / Photo Switcher Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* View Mode Switcher Pills */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setHeroViewMode('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    heroViewMode === '3d'
                      ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-950/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Interactive 3D Model</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHeroViewMode('photo')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    heroViewMode === 'photo'
                      ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-950/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Architectural Photo</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-teal-400 uppercase hidden sm:inline">
                Touch / Drag to Orbit
              </span>
            </div>

            {/* Interactive 3D Model View */}
            {heroViewMode === '3d' ? (
              <ThreeBuildingViewer />
            ) : (
              /* High-Res Photo View */
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    alt="Contemporary residential architecture design concept"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    fetchPriority="high"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/30 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#070D1E]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider text-teal-300 border border-teal-500/30">
                    Architectural Concept Visualization
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-b from-[#0A1329] to-[#070D1E] border-t border-slate-800">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="text-xs font-mono text-teal-400 uppercase tracking-wider">Er. Sunil Pal Office</div>
                      <div className="text-sm font-semibold text-white">Sodhi Residency, Vrindavan Nagari</div>
                      <div className="text-xs text-slate-400">Paam, Boisar – 401501</div>
                    </div>
                    <a
                      href={`tel:${BUSINESS_INFO.primaryPhone}`}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-semibold hover:bg-teal-900/80 transition-colors"
                      title="Direct phone connection"
                    >
                      <Phone className="w-3 h-3 text-teal-400" />
                      <span>{BUSINESS_INFO.primaryPhone}</span>
                    </a>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80">
                    <span className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      Shop No. 7, Bldg No. 10B
                    </span>
                    <span className="text-teal-400/90 font-medium">
                      Direct Civil Engineer
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Office Badge Overlay */}
            <div className="mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Shop No. 7, Bldg 10B, Sodhi Residency, Boisar</span>
              </span>
              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="text-teal-400 hover:text-teal-300 font-mono font-bold"
              >
                {BUSINESS_INFO.primaryPhone}
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
