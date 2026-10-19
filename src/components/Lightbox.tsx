import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ item, items, onClose, onNavigate }) => {
  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIndex]);
  }, [currentIndex, items, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % items.length;
    onNavigate(items[nextIndex]);
  }, [currentIndex, items, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleNext, handlePrev, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Image Preview"
    >
      {/* Background backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#091024] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {item.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {currentIndex + 1} of {items.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image & Controls Area */}
        <div className="relative flex-1 bg-black/60 flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[460px]">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[60vh] w-auto max-w-full object-contain mx-auto select-none"
          />

          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 p-2.5 rounded-full bg-slate-900/80 hover:bg-teal-500 hover:text-slate-950 text-white border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Previous image (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 p-2.5 rounded-full bg-slate-900/80 hover:bg-teal-500 hover:text-slate-950 text-white border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Next image (Right Arrow)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Details */}
        <div className="p-5 bg-slate-900/90 border-t border-slate-800 overflow-y-auto">
          <h3 className="text-base sm:text-lg font-architectural font-bold text-white mb-1.5">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Info className="w-3 h-3 text-teal-400" />
              Technical Elements:
            </span>
            {item.specifications.map((spec, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="mt-2 text-[10px] text-slate-500 italic">
            * Conceptual & architectural design reference illustrating residential engineering standards.
          </div>
        </div>

      </div>
    </div>
  );
};
