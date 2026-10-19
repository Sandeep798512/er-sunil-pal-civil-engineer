import React from 'react';
import { Compass, ShieldCheck, Coins, MessageSquareCode, Award } from 'lucide-react';
import { OUR_APPROACH } from '../data/content';

export const OurApproach: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Compass className="w-5 h-5 text-teal-400" />;
      case 1:
        return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 2:
        return <Coins className="w-5 h-5 text-amber-400" />;
      case 3:
        return <MessageSquareCode className="w-5 h-5 text-emerald-400" />;
      default:
        return <Award className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <section className="relative py-20 lg:py-24 bg-[#070D1E] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Professional Ethics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-architectural font-bold text-white mb-5">
            Our Engineering Approach
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We adhere to factual, practical principles that prioritize structural longevity, cost transparency, and honest communication over marketing hype.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OUR_APPROACH.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 hover:bg-slate-900/90 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center mb-5">
                {getIcon(index)}
              </div>
              <h3 className="text-base font-bold font-architectural text-white mb-2.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Factual Disclaimer */}
        <div className="mt-12 text-center text-xs text-slate-400 max-w-2xl mx-auto border-t border-slate-800/80 pt-6">
          <p>
            <strong>Engineering Transparency:</strong> Er. Sunil Pal provides professional services according to agreed project contracts. We publish verified engineering details and do not fabricate testimonials or speculative claims.
          </p>
        </div>

      </div>
    </section>
  );
};
