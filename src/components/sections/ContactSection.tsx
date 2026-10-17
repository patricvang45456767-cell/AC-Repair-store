import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { SiteSettings } from '../../types';
import { Language, translations } from '../../data/translations';
import { createTelUrl, createWhatsAppUrl } from '../../lib/utils';

interface ContactSectionProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings, language, onOpenBooking }) => {
  const t = translations[language];

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>{t.contactBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            {t.contactTitle}
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone Hotline: 0346 3902834 */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center mb-4 border border-cyan-800/50">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t.contactHotlineTitle}
                </span>
                <div className="text-lg font-bold text-white font-display mb-2">
                  {settings.phoneDisplay}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'roman'
                    ? 'Emergency AC breakdown ya same-day schedule k liye foran call karein.'
                    : 'Call for emergency cooling breakdowns or same-day scheduling.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-700">
                <a
                  href={createTelUrl(settings.phoneE164)}
                  className="w-full py-2 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span>{language === 'roman' ? 'Abhi Call Karein' : 'Call Right Now'}</span>
                </a>
              </div>
            </div>

            {/* WhatsApp: 0346 3902834 */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-800/50">
                  <MessageSquare className="w-5 h-5 fill-emerald-400" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t.contactWhatsAppTitle}
                </span>
                <div className="text-lg font-bold text-emerald-400 font-display mb-2">
                  0346 3902834
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'roman'
                    ? 'AC k error code ki photo ya ajeeb awaz ki audio WhatsApp karein.'
                    : 'Send pictures of your AC error code, indoor unit model, or audio of strange noises.'}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-700">
                <a
                  href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>{language === 'roman' ? 'WhatsApp Open Karein' : 'Open WhatsApp'}</span>
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-slate-400 flex items-center justify-center mb-4 border border-slate-700">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {t.contactHoursTitle}
              </span>
              <div className="text-sm font-bold text-white mb-2">
                {settings.openingHours}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'roman'
                  ? 'Server rooms aur commercial shops k liye emergency night dispatch dastiab hai.'
                  : 'Emergency evening calls dispatched for commercial server rooms and vulnerable households.'}
              </p>
            </div>

            {/* Workshop Address */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-slate-400 flex items-center justify-center mb-4 border border-slate-700">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {t.contactAddressTitle}
              </span>
              <div className="text-sm font-bold text-white mb-2">
                {settings.address}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'roman'
                  ? 'Electronics test lab, compressor rebuild workshop aur parts depot.'
                  : 'Electronics test lab, compressor rebuild workshop, and parts depot.'}
              </p>
            </div>

          </div>

          {/* Interactive Map Visual Facade (5 cols) */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
                <div className="text-xs font-bold text-slate-300">
                  {language === 'roman' ? 'Operational Hub & Mobile Routing' : 'Operational Hub & Mobile Routing'}
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Live Dispatch</span>
                </span>
              </div>

              {/* Map representation facade */}
              <div className="relative h-48 w-full rounded-xl bg-slate-950 border border-slate-700 overflow-hidden flex items-center justify-center mb-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Central pin */}
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center animate-ping absolute"></div>
                  <div className="w-8 h-8 rounded-full bg-cyan-600 border-2 border-white flex items-center justify-center text-white shadow-lg relative z-10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-800">
                    ABC Hub • Central Lahore
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-bold text-white">Central Hub & Mobile Service Fleet</div>
                <p className="text-slate-400">
                  Covering all phases of DHA, Gulberg, Johar Town, Bahria Town, Model Town & Cantt.
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold mt-2"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-700">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer text-center"
              >
                {language === 'roman' ? 'Technician Bulayein (On-Site Visit)' : 'Request On-Site Inspection'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
