import React from 'react';
import { Box, Wrench, Snowflake, Cpu, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { Language } from '../data/translations';
import { SiteSettings } from '../types';
import { FuturisticACExperience } from '../components/three3d/FuturisticACExperience';
import { FuturisticBackgroundField } from '../components/three3d/FuturisticBackgroundField';
import { createTelUrl } from '../lib/utils';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface ThreeDLabPageProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
}

export const ThreeDLabPage: React.FC<ThreeDLabPageProps> = ({
  settings,
  language,
  onOpenBooking,
}) => {
  return (
    <div className="relative py-12 sm:py-16 bg-slate-950 text-white min-h-screen overflow-hidden">
      {/* 3D Background Floating Constellation */}
      <FuturisticBackgroundField />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Page Header with ScrollReveal fade-down */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-lg animate-float-subtle">
              <Box className="w-4 h-4 text-cyan-400" />
              <span>{language === 'roman' ? 'Futuristic 3D Engineering Lab' : 'Futuristic 3D Engineering Lab'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              {language === 'roman'
                ? 'Inverter AC Ka 3D Interactive Model & X-Ray'
                : 'Interactive 3D Inverter AC Holographic Model'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {language === 'roman'
                ? 'Neeche diye gaye 3D model ko mouse ya touch se 360° ghumayein. Exploded view me Blower, Copper Coils aur Inverter PCB k internal components ki live telemetry check karein.'
                : 'Experience next-generation HVAC visualization. Rotate 360°, expand the exploded X-Ray assembly, and inspect the high-velocity cross-flow turbine, copper manifold loops, and inverter microcontrollers in real time.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Hero 3D WebGL Model Viewer with ScrollReveal zoom */}
        <ScrollReveal animation="zoom">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-2 sm:p-4 shadow-2xl backdrop-blur-xs card-interactive-cyber">
            <FuturisticACExperience
              language={language}
              onOpenBooking={onOpenBooking}
              className="w-full"
            />
          </div>
        </ScrollReveal>

        {/* 4 Interactive Component Deep Dives with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          
          {/* Card 1: Turbine Blower */}
          <ScrollReveal animation="fade-up" delay={50}>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3 shadow-lg card-interactive h-full group">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                Component 01
              </div>
              <h4 className="font-bold text-base text-white font-display group-hover:text-cyan-300 transition-colors">
                {language === 'roman' ? 'Cross-Flow Turbine Blower' : 'Cross-Flow Turbine Impeller'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'roman'
                  ? '16 curved blades jo high velocity airflow banate hain. Mitti jamne par hawa band ho jati hai, jise Master Jet Wash se bilkul naya banaya jata hai.'
                  : 'Balanced multi-vane cylindrical turbine restoring optimal air velocity and whisper-quiet indoor operation.'}
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2: Copper Manifold */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3 shadow-lg card-interactive h-full group">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Snowflake className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Component 02
              </div>
              <h4 className="font-bold text-base text-white font-display group-hover:text-emerald-300 transition-colors">
                {language === 'roman' ? 'Pure Copper Manifold Loops' : 'Copper Refrigerant Circuit'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'roman'
                  ? '350 PSI dry nitrogen hold test se leak verify kiye baghair hum kabhi gas nahi bhartay. Digital scale se accurate gram weight charging.'
                  : 'Seamless copper U-bends tested under 350 PSI dry nitrogen before charging factory-specified R410A/R32 refrigerant.'}
              </p>
            </div>
          </ScrollReveal>

          {/* Card 3: Inverter PCB */}
          <ScrollReveal animation="fade-up" delay={250}>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all space-y-3 shadow-lg card-interactive h-full group">
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800/80 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                Component 03
              </div>
              <h4 className="font-bold text-base text-white font-display group-hover:text-purple-300 transition-colors">
                {language === 'roman' ? 'Inverter Motherboard PCB' : 'Smart Inverter IPM Driver'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'roman'
                  ? 'E6, F1, P0 error codes ka component level repair. Naya board 28,000 ka khareedne k bajaye 50% kam kharche me 90 din warranty fix.'
                  : 'Microcontroller & IPM gate driver circuit testing in our electronics lab, eliminating costly full motherboard replacements.'}
              </p>
            </div>
          </ScrollReveal>

          {/* Card 4: Aluminum Fins */}
          <ScrollReveal animation="fade-up" delay={350}>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3 shadow-lg card-interactive h-full group">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                Component 04
              </div>
              <h4 className="font-bold text-base text-white font-display group-hover:text-cyan-300 transition-colors">
                {language === 'roman' ? 'Hydrophilic Aluminum Fins' : 'Hydrophilic Cooling Matrix'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'roman'
                  ? 'Blue-fin anti-corrosion coating jo nami aur condensation ko foran drain karti hai aur indoor room me badbu paida nahi hone deti.'
                  : 'Corrosion-resistant hydrophilic fin array designed for rapid moisture shedding and long-term thermodynamic efficiency.'}
              </p>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom Booking & Hotline Callout with ScrollReveal */}
        <ScrollReveal animation="zoom">
          <div className="p-8 bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl card-interactive-cyber">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold font-display text-white">
                {language === 'roman'
                  ? 'Apne Inverter AC ki inspection ya repair k liye call karein:'
                  : 'Ready to book precision engineering service for your AC?'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'roman'
                  ? 'Direct Call Hotline: 0346 3902834 ya WhatsApp par baat karein.'
                  : 'Direct Hotline: 0346 3902834 or message us on WhatsApp.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={createTelUrl(settings.phoneE164 || '+923463902834')}
                className="btn-animated btn-glow-dark px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all shadow-md group"
              >
                <Phone className="w-4 h-4 text-cyan-400 group-hover-phone-wobble transition-transform" />
                <span>0346 3902834</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="btn-animated btn-glow-cyan px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer group"
              >
                <span>{language === 'roman' ? 'Technician Bulayein' : 'Book Technician'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
