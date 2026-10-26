import React from 'react';
import { Film, Phone, ArrowRight } from 'lucide-react';
import { Language } from '../data/translations';
import { SiteSettings } from '../types';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { createTelUrl } from '../lib/utils';

interface VideosPageProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ settings, language, onOpenBooking }) => {
  return (
    <div className="py-12 sm:py-16 bg-slate-900 min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>{language === 'roman' ? 'Service Video Ads' : 'Service Video Ads'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
              {language === 'roman' ? 'Har Service Ki Apni Video' : 'A Dedicated Video for Every Service'}
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'roman'
                ? 'Purani 3 videos hata di gayi hain. Nayi videos har relevant service ke saath alag se add hongi—sab videos ek jagah mix nahi hongi.'
                : 'The previous three videos have been removed. New videos will be placed with their relevant services instead of mixing every video into one gallery.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="zoom">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 sm:p-12 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
              <Film className="h-8 w-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display">
              {language === 'roman' ? 'Nayi Service Videos Jald Add Hongi' : 'New Service Videos Coming Soon'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
              {language === 'roman'
                ? 'Jab nayi videos mil jayengi, har video usi service ke section mein dikhai jayegi jiske liye woh banayi gayi hai.'
                : 'Once the new videos are provided, each one will appear in the matching service section.'}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up">
          <div className="p-8 bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold font-display text-white">
                {language === 'roman' ? 'AC service ya repair book karwani hai?' : 'Need AC service or repair?'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'roman' ? 'Call karein ya technician visit book karein.' : 'Call our team or book a technician visit.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={createTelUrl(settings.phoneE164)}
                className="btn-animated btn-glow-dark px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-slate-700"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{settings.phoneDisplay || 'Call us'}</span>
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="btn-animated btn-glow-cyan px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md font-display"
              >
                <span>{language === 'roman' ? 'Technician Bulayein' : 'Book Visit'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
