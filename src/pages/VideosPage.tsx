import React from 'react';
import { Film, ShieldCheck, Phone, MessageSquare, ArrowRight, Play, Wrench } from 'lucide-react';
import { Language } from '../data/translations';
import { SiteSettings } from '../types';
import { ServiceVideoShowcase } from '../components/video/ServiceVideoShowcase';
import { createTelUrl, createWhatsAppUrl } from '../lib/utils';

interface VideosPageProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ settings, language, onOpenBooking }) => {
  return (
    <div className="py-12 sm:py-16 bg-slate-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>{language === 'roman' ? 'Live Services Video Ads' : 'Official Service Video Ads'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
            {language === 'roman' ? 'ABC Air Care Ki Service Video Ads' : 'Watch Our Service Ads & Field Work'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'roman'
              ? 'Neeche di gayi 3 mukhtalif video ads me hamare certified technicians k kaam ka tareeqa kar, high-pressure jet wash, 350 PSI dry nitrogen testing aur inverter motherboards ka live review dekhein.'
              : 'Explore our 3 dedicated service video ads highlighting our zero-mess jet wash protocol, certified nitrogen leak isolation, and component-level inverter PCB diagnostics.'}
          </p>
        </div>

        {/* Embedded 3 Video Ad Player Showcase */}
        <div className="bg-slate-950/60 rounded-3xl border border-slate-800 p-2 sm:p-6 shadow-2xl">
          <ServiceVideoShowcase
            language={language}
            onOpenBooking={onOpenBooking}
          />
        </div>

        {/* Technical Video Checklist Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Video Ad #1 Standards
            </div>
            <h4 className="font-bold text-base text-white font-display">
              Zero-Mess Jet Wash Protocol
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'roman'
                ? 'Waterproof catch bag indoor unit par fit ki jati hai. Sara ganda pani bucket me drain hota hai baghair deewar ya carpet kharab kiye.'
                : 'Custom waterproof catch bag collects 100% of the slurry runoff directly into a drainage bucket with zero splatter.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Video Ad #2 Standards
            </div>
            <h4 className="font-bold text-base text-white font-display">
              350 PSI Nitrogen Testing
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'roman'
                ? 'Gas leak ko soap water aur electronic halogen sniffer se dhund kar pehle brazing aur flare repair hota hai, phir scale par toal kar gas bhari jati hai.'
                : 'Zero gas waste. We guarantee leak isolation under 350 PSI dry nitrogen before precision digital scale charging.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Video Ad #3 Standards
            </div>
            <h4 className="font-bold text-base text-white font-display">
              Inverter Motherboard Lab Fix
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'roman'
                ? 'Rs. 28,000 naya board khareedne k bajaye hamara lab IPM chips aur capacitors repair karta hai half price me with 90-day warranty.'
                : 'Component-level micro-soldering restores factory inverter performance at half the replacement cost.'}
            </p>
          </div>
        </div>

        {/* Direct Booking & Hotline Callout */}
        <div className="p-8 bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold font-display text-white">
              {language === 'roman' ? 'In me se kisi bhi service k liye abhi technician bulayein:' : 'Book any of these certified services today:'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'roman'
                ? 'Call karein: 0346 3902834 ya WhatsApp par baat karein.'
                : 'Call our hotline: 0346 3902834 or message our dispatcher on WhatsApp.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={createTelUrl(settings.phoneE164)}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-slate-700"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>0346 3902834</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md font-display"
            >
              <span>{language === 'roman' ? 'Technician Bulayein' : 'Book Visit'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
