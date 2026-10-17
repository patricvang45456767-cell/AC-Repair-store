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
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Direct Call: 0346 3902834 */}
        <a
          href={createTelUrl(settings.phoneE164)}
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-900 text-white rounded-xl text-[11px] font-bold shadow-xs active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-cyan-400 mb-0.5" />
          <span>{language === 'roman' ? 'Call Karein' : 'Call Now'}</span>
        </a>

        {/* WhatsApp: 0346 3902834 */}
        <a
          href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-600 text-white rounded-xl text-[11px] font-bold shadow-xs active:scale-95 transition-transform"
        >
          <MessageSquare className="w-4 h-4 fill-white mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Book Inspection */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-2 px-1 bg-cyan-600 text-white rounded-xl text-[11px] font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
        >
          <Wrench className="w-4 h-4 text-white mb-0.5" />
          <span>{language === 'roman' ? 'Book Karein' : 'Book Visit'}</span>
        </button>
      </div>
    </div>
  );
};
