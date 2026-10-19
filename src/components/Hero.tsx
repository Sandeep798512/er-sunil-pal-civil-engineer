import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, MapPin, Phone, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { BuildingLayersBackground } from './BuildingLayersBackground';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreServices: () => void;
}

const FULL_HEADLINE = 'Thoughtful Design. Strong Foundations. Lasting Spaces.';

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreServices }) => {
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing phase: type letter-by-letter
      if (charCount < FULL_HEADLINE.length) {
        timeoutId = setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, 45); // Typing speed per character
      } else {
        // Complete headline typed: pause for exactly 5 seconds (5000ms)
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 5000);
      }
    } else {
      // Deleting phase: smoothly backspace
      if (charCount > 0) {
        timeoutId = setTimeout(() => {
          setCharCount((prev) => Math.max(0, prev - 1));
        }, 18); // Fast backspacing speed
      } else {
        // Pause briefly after erasing, then start typing again
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
        }, 350);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [charCount, isDeleting]);

  // Split headline dynamically preserving gradient and colors
  const part1 = FULL_HEADLINE.slice(0, Math.min(charCount, 19));
  const part2 = charCount > 19 ? FULL_HEADLINE.slice(19, Math.min(charCount, 39)) : '';
  const part3 = charCount > 39 ? FULL_HEADLINE.slice(39, charCount) : '';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-20 lg:pb-8 overflow-hidden bg-[#070D1E]"
    >
      {/* 3D Exploded Architectural Building Layers Animation in Background */}
      <BuildingLayersBackground />

      {/* Background Architectural Blueprint Grid & Subtle Lighting Vignette */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Engineering Coordinate Watermark */}
      <div className="hidden lg:block absolute top-24 right-10 text-[10px] font-mono tracking-widest text-slate-500/50 uppercase select-none pointer-events-none">
        LAT 19.8021° N / LON 72.7533° E • BOISAR - 401501
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions with Motion */}
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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wider uppercase mb-3.5 sm:mb-4 w-fit shadow-lg shadow-black/40 backdrop-blur-md"
            >
              <Compass className="w-3.5 h-3.5 text-teal-400 animate-spin-slow" />
              <span>Civil Engineering & Construction</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              <span className="text-slate-400 font-normal">Boisar, MH</span>
            </motion.div>

            {/* Main Editorial Headline with Dynamic Typewriter Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              aria-label={FULL_HEADLINE}
              className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-architectural font-bold text-white tracking-tight leading-[1.18] mb-3 sm:mb-4 drop-shadow-md min-h-[2.4em] sm:min-h-[2.4em]"
            >
              <span className="sr-only">{FULL_HEADLINE}</span>
              <span aria-hidden="true">
                {part1 || '\u200B'}
                {part2 && (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-200 to-slate-200">
                    {part2}
                  </span>
                )}
                {part3 && <span>{part3}</span>}
                <span className="inline-block w-[3px] h-[0.82em] bg-teal-400 ml-1.5 align-middle animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
              </span>
            </motion.h1>

            {/* Supporting Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-5 max-w-xl"
            >
              Professional civil construction work, precision house planning, and trusted flat sale & rental assistance led by{' '}
              <strong className="text-white font-semibold">Er. Sunil Pal</strong>. Grounded in structural integrity, accurate drafting, and practical execution in the Boisar region.
            </motion.p>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-5"
            >
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow-xl shadow-teal-950/50 hover:shadow-teal-400/30 active:scale-95 transition-all"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all active:scale-95 backdrop-blur-md"
              >
                <span>Explore Our Services</span>
              </button>
            </motion.div>

            {/* Factual Core Service Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-800/80"
            >
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/30 transition-colors backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-teal-950/80 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Civil Construction</div>
                  <div className="text-[10px] text-slate-400">Residential & Sites</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 transition-colors backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">House Planning</div>
                  <div className="text-[10px] text-slate-400">Layouts & Drawings</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-colors backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">Flat Sale & Rental</div>
                  <div className="text-[10px] text-slate-400">Boisar Assistance</div>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Premium Architectural Showcase Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Architectural Framing & Corner Accents */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/90 shadow-2xl group">
              
              {/* High-Resolution Architectural Photography */}
              <div className="relative h-60 sm:h-72 lg:h-[260px] xl:h-[300px] w-full overflow-hidden bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Contemporary architectural residential design concept in Boisar"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  fetchPriority="high"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E] via-[#070D1E]/20 to-transparent" />
                
                {/* Architectural Concept Label */}
                <div className="absolute top-3 left-3 bg-[#070D1E]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] uppercase font-mono tracking-wider text-teal-300 border border-teal-500/40 shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-teal-400" />
                  <span>Architectural Design Standard</span>
                </div>

                {/* 3D Blueprint Indicator Pill */}
                <div className="absolute top-3 right-3 bg-[#070D1E]/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-slate-400 border border-slate-800">
                  RCC Grid: M20 / Fe500
                </div>
              </div>

              {/* Information & Direct Office Access Bar */}
              <div className="p-3.5 sm:p-4 bg-gradient-to-b from-[#0A1329] to-[#070D1E] border-t border-slate-800">
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="text-[11px] font-mono text-teal-400 uppercase tracking-wider font-semibold">
                      Er. Sunil Pal Practice Office
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                      Sodhi Residency, Vrindavan Nagari
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Paam, Boisar – 401501
                    </div>
                  </div>

                  <a
                    href={`tel:${BUSINESS_INFO.primaryPhone}`}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/20 border border-teal-500/50 text-teal-300 text-xs font-bold hover:bg-teal-500/30 transition-colors shadow-md"
                    title="Direct phone connection"
                  >
                    <Phone className="w-3 h-3 text-teal-400" />
                    <span>{BUSINESS_INFO.primaryPhone}</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2.5 border-t border-slate-800/80">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    Shop No. 7, Bldg No. 10B
                  </span>
                  <span className="text-teal-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Boisar • Palghar • Tarapur
                  </span>
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
