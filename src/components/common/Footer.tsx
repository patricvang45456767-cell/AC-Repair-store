import React from 'react';
import { Phone, MessageSquare, Shield, Wrench, Heart, ArrowUp } from 'lucide-react';
import { SiteSettings } from '../../types';
import { Language } from '../../data/translations';
import { createTelUrl, createWhatsAppUrl } from '../../lib/utils';

interface FooterProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, language, onOpenBooking, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand & Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white font-display tracking-tight">
                ABC<span className="text-cyan-400">AIR</span> CARE
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {language === 'roman'
                ? 'Certified AC repair, high-pressure jet wash, inverter motherboard diagnostics aur genuine gas leak testing. Sadiqabad aur qareebi ilaqon mein service availability booking par confirm hoti hai.'
                : 'Professional residential and commercial air conditioning repair, high-pressure jet washing, inverter motherboard diagnostics, and precision refrigerant leak testing.'}
            </p>
            <div className="pt-2 text-xs text-slate-500">
              <strong className="text-slate-300">Policy: </strong>
              {settings.pricePolicy}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'roman' ? 'Ahem Links' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">{language === 'roman' ? 'Tamam Services' : 'All Services'}</a></li>
              <li><a href="#3d-lab" className="text-cyan-300 hover:text-cyan-400 transition-colors font-bold">{language === 'roman' ? '3D Inverter X-Ray Lab' : '3D Inverter Hologram Lab'}</a></li>
              <li><a href="#videos" className="hover:text-cyan-400 transition-colors">{language === 'roman' ? 'Service Video Ads' : 'Service Video Ads'}</a></li>
              <li><a href="#ai-diagnosis" className="hover:text-cyan-400 transition-colors">{language === 'roman' ? 'AI Tashkhees' : 'AI Fault Diagnosis'}</a></li>
              <li><a href="#pricing" className="hover:text-cyan-400 transition-colors">{language === 'roman' ? 'Rates & Policy' : 'Pricing & Policy'}</a></li>
              <li><a href="#coverage" className="hover:text-cyan-400 transition-colors">{language === 'roman' ? 'Service Areas' : 'Service Areas'}</a></li>
              <li><a href="#faqs" className="hover:text-cyan-400 transition-colors">{language === 'roman' ? 'Ahem Sawalat (FAQs)' : 'Helpful FAQs'}</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'roman' ? 'Khasoosi Services' : 'Core Specialties'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>AC Not Cooling & Gas Leak Check</li>
              <li>Master Chemical Jet Wash</li>
              <li>Inverter PCB E6/F1 Error Repair</li>
              <li>Water Leakage & Drainage Flush</li>
              <li>Factory Copper Installation</li>
              <li>Commercial VRF Maintenance</li>
            </ul>
          </div>

          {/* Col 4: Direct Reach */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {language === 'roman' ? 'Rabta Karein' : 'Get in Touch'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-500 block">Hotline:</span>
                <a
                  href={createTelUrl(settings.phoneE164)}
                  className="font-bold text-white hover:text-cyan-400 transition-colors text-sm"
                >
                  {settings.phoneDisplay}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">WhatsApp:</span>
                <a
                  href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  0346 3902834
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Email:</span>
                <span className="text-slate-300">{settings.email}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="text-[11px] text-slate-500 hover:text-slate-300 underline"
                >
                  Dispatcher / Admin Portal
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 ABC Air Care. All rights reserved. Built with precision engineering.
          </div>
          <button
            onClick={scrollToTop}
            className="btn-animated flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer group px-3 py-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
          >
            <span>{language === 'roman' ? 'Wapis Upar' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
