import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ArrowRight, Compass } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { createWhatsAppUrl } from '../utils/helpers';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on resize or escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#gallery' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Property Enquiry', href: '#property-enquiry' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const defaultWhatsAppUrl = createWhatsAppUrl(
    BUSINESS_INFO.primaryPhone,
    `Hello Er. Sunil Pal, I visited your website and would like to discuss a project / property requirement.`
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070D1E]/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/30 py-3.5'
            : 'bg-gradient-to-b from-[#070D1E]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Architectural Brand Logo */}
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-lg p-1"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-slate-900 to-[#0A162D] border border-teal-500/30 flex items-center justify-center shadow-md group-hover:border-teal-400 transition-colors">
                <svg
                  className="w-6 h-6 text-teal-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21h18" />
                  <path d="M6 21V7l6-4 6 4v14" />
                  <path d="M10 11h4" />
                  <path d="M10 16h4" />
                </svg>
                <div className="absolute -bottom-1 -right-1 text-[9px] font-bold bg-teal-600/90 text-white px-1 rounded border border-teal-400/40">
                  SP
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-architectural text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-teal-300 transition-colors">
                  Er. Sunil Pal
                </span>
                <span className="text-[11px] font-medium tracking-widest uppercase text-teal-400/90 -mt-0.5">
                  Civil Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 rounded-md transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-teal-300 px-3 py-2 rounded-lg border border-slate-700/60 bg-slate-900/40 hover:border-teal-500/40 transition-colors"
                title="Call 7030399100"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>{BUSINESS_INFO.primaryPhone}</span>
              </a>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="relative inline-flex items-center justify-center gap-2 px-4 py-2 text-xs xl:text-sm font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 rounded-lg transition-all shadow-md shadow-teal-900/30 hover:shadow-teal-500/20 active:scale-95"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="p-2 text-teal-400 bg-slate-900/70 border border-slate-700/80 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Call Er. Sunil Pal"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-200 bg-slate-900/70 border border-slate-700/80 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#080E1E] border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-slate-900 border border-teal-500/30 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="font-architectural text-base font-bold text-white">Er. Sunil Pal</div>
                  <div className="text-[10px] text-teal-400 uppercase tracking-widest">Civil Engineer</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="mt-6 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3.5 py-2.5 text-sm font-medium text-slate-200 hover:text-teal-300 hover:bg-slate-800/60 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              ))}
            </nav>
          </div>

          {/* Drawer Actions */}
          <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-3 px-4 text-center text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors shadow-lg shadow-teal-900/40"
            >
              Discuss Your Project
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-teal-300"
              >
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                <span>Call Now</span>
              </a>
              <a
                href={defaultWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 hover:bg-emerald-900/50"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Office: Sodhi Residency, Vrindavan Nagari, Paam, Boisar
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
