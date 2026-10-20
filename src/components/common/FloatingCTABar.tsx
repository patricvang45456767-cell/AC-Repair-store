import React from 'react';
import { Phone, MessageSquare, Wrench } from 'lucide-react';
import { SiteSettings } from '../../types';
import { Language } from '../../data/translations';
import { createTelUrl, createWhatsAppUrl } from '../../lib/utils';

interface FloatingCTABarProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: () => void;
}

export const FloatingCTABar: React.FC<FloatingCTABarProps> = ({ settings, language, onOpenBooking }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl animate-page-entrance">
      <div className="grid grid-cols-3 gap-2">
        {/* Direct Call: 0346 3902834 */}
        <a
          href={createTelUrl(settings.phoneE164)}
          className="btn-animated btn-glow-dark flex flex-col items-center justify-center py-2 px-1 bg-slate-900 text-white rounded-xl text-[11px] font-bold group shadow-md"
        >
          <Phone className="w-4 h-4 text-cyan-400 mb-0.5 group-hover-phone-wobble transition-transform" />
          <span>{language === 'roman' ? 'Call Karein' : 'Call Now'}</span>
        </a>

        {/* WhatsApp: 0346 3902834 */}
        <a
          href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-animated btn-glow-emerald flex flex-col items-center justify-center py-2 px-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold group shadow-md"
        >
          <MessageSquare className="w-4 h-4 fill-white mb-0.5 group-hover:scale-125 group-hover:rotate-6 transition-transform" />
          <span>WhatsApp</span>
        </a>

        {/* Book Inspection */}
        <button
          onClick={onOpenBooking}
          className="btn-animated btn-glow-cyan flex flex-col items-center justify-center py-2 px-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[11px] font-bold group shadow-md relative"
        >
          <span className="absolute top-1.5 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <Wrench className="w-4 h-4 text-white mb-0.5 group-hover:rotate-45 transition-transform" />
          <span>{language === 'roman' ? 'Book Karein' : 'Book Visit'}</span>
        </button>
      </div>
    </div>
  );
};
