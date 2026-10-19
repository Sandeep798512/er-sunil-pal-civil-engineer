import React from 'react';
import { Phone, Mail, MapPin, Compass, ArrowUp, ExternalLink, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';
import { ServiceType } from '../types';

interface FooterProps {
  onSelectService: (service: ServiceType) => void;
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService, onOpenPolicy }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#gallery' },
    { label: 'Process', href: '#process' },
    { label: 'About the Engineer', href: '#about' },
    { label: 'Property Enquiry Desk', href: '#property-enquiry' },
    { label: 'Frequently Asked Questions', href: '#faq' },
    { label: 'Project Consultation', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#050A14] border-t border-slate-800/80 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-teal-500/30 flex items-center justify-center">
                <Compass className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <span className="font-architectural text-lg font-bold text-white block">
                  Er. Sunil Pal
                </span>
                <span className="text-[11px] font-mono text-teal-400 uppercase tracking-widest block -mt-1">
                  Civil Engineer
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Professional civil construction execution, architectural house planning, and flat sale & rental assistance in Boisar and the Palghar industrial belt.
            </p>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Grounded in Engineering Precision & Integrity</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-teal-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-bold">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(s.id)}
                    className="text-left text-slate-300 hover:text-teal-300 transition-colors focus:outline-none"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="#property-enquiry"
                  className="text-slate-300 hover:text-teal-300 transition-colors"
                >
                  Flat Buy / Rent Enquiry Desk
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="text-slate-300 hover:text-teal-300 transition-colors"
                >
                  4-Phase Project Workflow
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Verified Office Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 font-bold">
              Office & Contact
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  {BUSINESS_INFO.address.full}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <div className="space-x-2">
                  <a
                    href={`tel:${BUSINESS_INFO.primaryPhone}`}
                    className="text-white hover:text-teal-300 font-mono transition-colors"
                  >
                    {BUSINESS_INFO.primaryPhone}
                  </a>
                  <span className="text-slate-500">•</span>
                  <a
                    href={`tel:${BUSINESS_INFO.secondaryPhone}`}
                    className="text-white hover:text-teal-300 font-mono transition-colors"
                  >
                    {BUSINESS_INFO.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-white hover:text-amber-300 font-mono transition-colors truncate"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-medium"
              >
                <span>View Office on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} <strong>Er. Sunil Pal (Civil Engineer)</strong>. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-teal-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">|</span>
            <button
              type="button"
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-teal-300 transition-colors"
            >
              Terms of Service
            </button>
            <span className="text-slate-700">|</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
