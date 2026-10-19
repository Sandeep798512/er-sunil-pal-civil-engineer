import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Layers } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';
import { Lightbox } from './Lightbox';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Residential', 'Planning & Layout', 'Modern Elevation'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-20 lg:py-28 bg-[#080E1E] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Design Portfolio & References</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-architectural font-bold text-white mb-5">
            Architectural & Planning Gallery
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Curated architectural design inspirations, technical planning layouts, and structural execution methodologies reflecting contemporary residential standards.
          </p>

          <div className="mt-4 inline-block text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3.5 py-1.5 rounded-lg border border-slate-800">
            Note: Displays architectural & planning concepts reflecting design capability and engineering standards.
          </div>
        </motion.div>

        {/* Filter Tabs with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 active:scale-95 ${
                activeCategory === cat
                  ? 'bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-900/30'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedItem(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
                className="group relative rounded-2xl overflow-hidden bg-slate-900/90 border border-slate-800 hover:border-teal-500/60 shadow-lg cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 active:scale-98"
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080E1E] via-[#080E1E]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#080E1E]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] uppercase font-mono tracking-wider text-teal-300 border border-teal-500/30">
                    {item.category}
                  </div>

                  {/* Expand Icon Button */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 text-slate-300 group-hover:text-teal-300 group-hover:bg-teal-950/80 border border-slate-700 flex items-center justify-center transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-5 bg-gradient-to-b from-[#0B142A] to-[#080E1E]">
                  <h3 className="text-base font-architectural font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.specifications.slice(0, 2).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {spec}
                      </span>
                    ))}
                    {item.specifications.length > 2 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/50 text-slate-400">
                        +{item.specifications.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <Lightbox
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onNavigate={(newItem) => setSelectedItem(newItem)}
        />
      )}
    </section>
  );
};
