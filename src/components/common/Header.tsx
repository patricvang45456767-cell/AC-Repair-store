import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, ShieldCheck, Wrench, Shield, ChevronRight, Sparkles, Globe, Home } from 'lucide-react';
import { SiteSettings } from '../../types';
import { Language, translations } from '../../data/translations';
import { createTelUrl, createWhatsAppUrl } from '../../lib/utils';

export type PageId = 'home' | 'services' | 'videos' | 'ai-diagnosis' | 'pricing' | 'coverage' | 'gallery' | 'contact';

interface HeaderProps {
  settings: SiteSettings;
  language: Language;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleLanguage: (lang: Language) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  language,
  currentPage,
  onNavigate,
  onToggleLanguage,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string; highlight?: boolean }[] = [
    { id: 'home', label: t.navHome },
    { id: 'services', label: t.navServices },
    { id: 'videos', label: t.navVideos },
    { id: 'ai-diagnosis', label: t.navAi, highlight: true },
    { id: 'pricing', label: t.navPricing },
    { id: 'coverage', label: t.navCoverage },
    { id: 'gallery', label: t.navGallery },
    { id: 'contact', label: t.navContact },
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 font-sans">
      {/* Emergency Top Banner */}
      {settings.emergencyEnabled && (
        <div className="bg-slate-900 text-white text-xs sm:text-sm py-1.5 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="font-semibold text-cyan-400">{t.emergencyBanner}</span>
              <span className="hidden sm:inline text-slate-300">{t.emergencySub}</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <a
                href={createTelUrl(settings.phoneE164)}
                className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline: {settings.phoneDisplay}</span>
              </a>

              {/* Language Switcher in Top Bar */}
              <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                <Globe className="w-3 h-3 text-cyan-400" />
                <button
                  type="button"
                  onClick={() => onToggleLanguage('roman')}
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                    language === 'roman' ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Roman Urdu
                </button>
                <span className="text-slate-600">|</span>
                <button
                  type="button"
                  onClick={() => onToggleLanguage('en')}
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                    language === 'en' ? 'bg-cyan-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
              </div>

              <button
                onClick={onOpenAdmin}
                className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 border-l border-slate-700 pl-3 cursor-pointer"
                title="Technician / Admin Portal"
              >
                <Shield className="w-3 h-3 text-cyan-400" />
                <span className="hidden md:inline">{t.adminPortal}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div
        className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 border-b border-slate-200 ${
          isScrolled ? 'shadow-md py-2.5' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand: ABC AIR CARE */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-cyan-900 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-cyan-950/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display">
                  ABC<span className="text-cyan-600">AIR</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-cyan-100 text-cyan-800 rounded">
                  CARE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none hidden sm:block">
                {t.brandSubtitle}
              </p>
            </div>
          </button>

          {/* Desktop Multi-Page Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs xl:text-sm cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : link.highlight
                      ? 'text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200'
                      : 'hover:text-cyan-600 hover:bg-slate-100'
                  }`}
                >
                  {link.highlight && (
                    <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-cyan-500 animate-pulse'}`} />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* WhatsApp with 0346 3902834 */}
            <a
              href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all shadow-xs"
              title="WhatsApp: 0346 3902834"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Call to 0346 3902834 */}
            <a
              href={createTelUrl(settings.phoneE164)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-all shadow-xs"
              title={`Call: ${settings.phoneDisplay}`}
            >
              <Phone className="w-4 h-4 text-cyan-600" />
              <span>{settings.phoneDisplay}</span>
            </a>

            {/* Book Service Modal Button */}
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-slate-900 hover:from-cyan-500 hover:to-slate-800 rounded-lg shadow-sm shadow-cyan-900/20 transition-all hover:shadow-md cursor-pointer"
            >
              <span>{t.btnBookInspection}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={() => onToggleLanguage(language === 'roman' ? 'en' : 'roman')}
              className="px-2 py-1 text-[11px] font-bold bg-slate-100 text-slate-800 rounded-lg border border-slate-200 cursor-pointer"
            >
              {language === 'roman' ? 'EN' : 'Roman'}
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="px-2.5 py-1 text-xs font-bold text-white bg-cyan-600 rounded-lg cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-cyan-600" />
                <span className="font-extrabold text-lg text-slate-900">ABC Air Care</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Language Switcher */}
            <div className="my-3 p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-600" />
                Zuban / Language:
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onToggleLanguage('roman')}
                  className={`text-xs font-bold px-2 py-1 rounded-md cursor-pointer ${
                    language === 'roman' ? 'bg-cyan-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  Roman Urdu
                </button>
                <button
                  type="button"
                  onClick={() => onToggleLanguage('en')}
                  className={`text-xs font-bold px-2 py-1 rounded-md cursor-pointer ${
                    language === 'en' ? 'bg-cyan-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="py-2 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.highlight ? (
                      <span className="text-[10px] bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full font-bold">
                        AI Powered
                      </span>
                    ) : (
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-md text-sm cursor-pointer"
              >
                {t.btnBookInspection}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={createTelUrl(settings.phoneE164)}
                  className="py-2.5 px-3 bg-slate-100 text-slate-900 font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs"
                >
                  <Phone className="w-4 h-4 text-cyan-600" />
                  <span>Call: 0346 3902834</span>
                </a>
                <a
                  href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="py-2 text-center text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-500" />
                <span>{t.adminPortal}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
