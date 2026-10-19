import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/content';

interface ProcessTimelineProps {
  onStartDiscussion: () => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ onStartDiscussion }) => {
  return (
    <section id="process" className="relative py-20 lg:py-28 bg-[#091024] border-t border-slate-800">
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
            <span>Structured Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-architectural font-bold text-white mb-5">
            Our Working Process
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            A disciplined, four-phase engineering approach ensuring clarity, structural precision, and predictable delivery for your construction or planning project.
          </p>
        </motion.div>

        {/* 4-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Subtle Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-28 left-12 right-12 h-0.5 bg-gradient-to-r from-teal-500/20 via-teal-500/40 to-teal-500/20 -z-0" />

          {PROCESS_STEPS.map((stepItem, idx) => (
            <motion.div
              key={stepItem.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative z-10 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 transition-all duration-300 shadow-xl group"
            >
              <div>
                {/* Step Number & Header */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-300 to-teal-600">
                    {stepItem.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-teal-500/30 flex items-center justify-center text-teal-400 font-mono text-xs">
                    P{idx + 1}
                  </div>
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-teal-400 mb-1">
                  Phase {stepItem.step}
                </div>
                <h3 className="text-lg font-architectural font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                  {stepItem.title}
                </h3>
                <div className="text-xs font-semibold text-slate-300 mb-3">
                  {stepItem.summary}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {stepItem.description}
                </p>
              </div>

              {/* Deliverables / Scope Checklist */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Key Scope:
                </div>
                <div className="space-y-1.5">
                  {stepItem.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process CTA Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <button
            type="button"
            onClick={onStartDiscussion}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900 border border-teal-500/40 text-teal-300 hover:bg-teal-950/60 hover:border-teal-400 text-sm font-bold transition-all shadow-md active:scale-95"
          >
            <span>Begin Step 01: Schedule Initial Discussion</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
