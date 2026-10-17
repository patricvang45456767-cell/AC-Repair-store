import React from 'react';
import {
  Phone,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Clock,
  CheckCircle2,
  ArrowRight,
  Snowflake,
  Droplets,
  Zap,
  Wrench,
  Scale,
  Award,
  ChevronRight
} from 'lucide-react';
import { SiteSettings } from '../types';
import { Language, translations } from '../data/translations';
import { PageId } from '../components/common/Header';
import { DEMO_IMAGES } from '../constants/images';
import { createTelUrl, createWhatsAppUrl } from '../lib/utils';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { ServiceVideoShowcase } from '../components/video/ServiceVideoShowcase';

interface HomePageProps {
  settings: SiteSettings;
  language: Language;
  onNavigate: (page: PageId) => void;
  onOpenBooking: (serviceId?: string) => void;
  onSelectQuickSymptom: (symptom: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  language,
  onNavigate,
  onOpenBooking,
  onSelectQuickSymptom,
}) => {
  const t = translations[language];

  const quickProblems = language === 'roman' ? [
    { label: 'Thandi Hawa Nahi Aarahi', symptom: 'AC chal raha hai lekin thandi hawa nahi arahi, compressor trip ho raha hai', icon: Snowflake, service: 'ac-cooling-issue' },
    { label: 'Andar Se Pani Gir Raha Hai', symptom: 'Indoor unit se deewar aur zameen par pani tapak raha hai', icon: Droplets, service: 'ac-water-leakage' },
    { label: 'Mausami Master Jet Wash', symptom: 'Mitti aur gunk jam gaya hai, badbu aur kam hawa ka throw', icon: Sparkles, service: 'ac-general-service' },
    { label: 'Error Code / Breaker Trip', symptom: 'Display par E6/F1 error code araha hai ya breaker trip ho raha hai', icon: Zap, service: 'inverter-pcb-repair' },
    { label: 'Naya AC Fitting & Piping', symptom: 'Shifting ya naya inverter AC copper piping k sath fit karwana hai', icon: Wrench, service: 'ac-installation' },
  ] : [
    { label: 'Not Cooling / Warm Air', symptom: 'AC blowing warm air, outdoor unit not starting', icon: Snowflake, service: 'ac-cooling-issue' },
    { label: 'Water Leaking Inside', symptom: 'Indoor unit leaking water down the wall', icon: Droplets, service: 'ac-water-leakage' },
    { label: 'Seasonal Jet Wash', symptom: 'Dust buildup, weak airflow and sour smell', icon: Sparkles, service: 'ac-general-service' },
    { label: 'Error Code / Tripping', symptom: 'Inverter error code flashing or breaker tripping', icon: Zap, service: 'inverter-pcb-repair' },
    { label: 'New AC Installation', symptom: 'Need copper piping and wall mounting', icon: Wrench, service: 'ac-installation' },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section with Demo Photo */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs sm:text-sm font-semibold mx-auto lg:mx-0 w-fit">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>{t.heroTrust}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.15]">
                {t.heroTitle1}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {t.heroTitleHighlight}
                </span>{' '}
                {t.heroTitle2}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.heroSubtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.btnBookInspection}</span>
                  <ArrowRight className="w-5 h-5 text-slate-900" />
                </button>

                <a
                  href={createTelUrl(settings.phoneE164)}
                  className="w-full sm:w-auto px-6 py-3.5 text-base font-bold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2.5"
                >
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span>Call: {settings.phoneDisplay}</span>
                </a>

                <a
                  href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 text-base font-bold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 fill-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Proof Points */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
                <div className="flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">{t.heroCheck1}</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">{t.heroCheck2}</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">{t.heroCheck3}</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs text-slate-300 font-medium">{t.heroCheck4}</span>
                </div>
              </div>
            </div>

            {/* Right: Demo Image Showcase & Quick Diagnostic Trigger */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
                <img
                  src={DEMO_IMAGES.heroTechnician}
                  alt="ABC Air Care Certified HVAC Technician with Manifold Gauge"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                
                {/* Floating Tag over Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-3 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">ABC Field Inspection Fleet</div>
                      <div className="text-[11px] text-slate-400">Digital Manifold Testing • 350 PSI Nitrogen</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2 py-1 rounded-md border border-cyan-800">
                    Live Dispatch
                  </span>
                </div>
              </div>

              {/* Quick Issue Selector Widget */}
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
                  <div>
                    <h3 className="font-bold text-sm text-white font-display flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-cyan-400" />
                      <span>{t.quickSelectorTitle}</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigate('ai-diagnosis')}
                    className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t.deepAiLink}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quickProblems.slice(0, 4).map((prob) => {
                    const Icon = prob.icon;
                    return (
                      <button
                        key={prob.label}
                        onClick={() => {
                          onSelectQuickSymptom(prob.symptom);
                          onNavigate('ai-diagnosis');
                        }}
                        className="text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center gap-2.5 cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate text-xs font-semibold text-slate-200">
                          {prob.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4 Core Services with High-Res Demo Images */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>{language === 'roman' ? 'Khasoosi Services' : 'Core Engineering Services'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            {language === 'roman' ? 'ABC Air Care K Asli Kaam Aur Solutions' : 'Real Field Solutions by Certified Technicians'}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'roman'
              ? 'Har kaam digital equipment aur written warranty k sath anjaam dia jata hai. Neeche hamari ahem services mulahiza karein:'
              : 'Every repair uses precision diagnostic sensors and certified factory procedures. Explore our core services below:'}
          </p>
        </div>

        {/* 4 Visual Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Jet Wash */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={DEMO_IMAGES.jetWashService}
                  alt="Deep Chemical Jet Wash Service with Waterproof Bag"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-cyan-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Zero-Mess Jet Bag
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base text-slate-900 font-display mb-1.5 group-hover:text-cyan-700 transition-colors">
                  {language === 'roman' ? 'Deep Chemical Master Jet Wash' : 'Deep Chemical Master Jet Wash'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {language === 'roman'
                    ? 'Waterproof service jacket laga kar indoor unit ka blower wheel aur cooling fins pressure jet se saaf kiye jate hain.'
                    : 'Protective waterproof service jacket prevents room staining while high-pressure jet restores icy airflow.'}
                </p>
                <div className="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-100 inline-block">
                  {language === 'roman' ? 'Blower Wheel Degreased' : 'Blower Degreasing'}
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('services')}
                className="text-xs font-bold text-slate-700 hover:text-cyan-600 cursor-pointer"
              >
                {language === 'roman' ? 'Tafseel Dekhein' : 'Read Specs'}
              </button>
              <button
                onClick={() => onOpenBooking('ac-general-service')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-cyan-600 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                {language === 'roman' ? 'Book Karein' : 'Book Visit'}
              </button>
            </div>
          </div>

          {/* Card 2: Gas Leak & Pressure Testing */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={DEMO_IMAGES.gasLeakRepair}
                  alt="Precision Nitrogen Leak Testing and Valve Service"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  350 PSI Nitrogen Test
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base text-slate-900 font-display mb-1.5 group-hover:text-cyan-700 transition-colors">
                  {language === 'roman' ? 'AC Gas Leak Detection & Refill' : 'Gas Leak Isolation & Refill'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {language === 'roman'
                    ? 'Dry nitrogen pressure se leak dhund kar flare nut tight kia jata hai, phir scale par toal kar pure gas bhari jati hai.'
                    : 'Electronic sniffer and dry nitrogen leak detection before precision-weight charging on digital scale.'}
                </p>
                <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block">
                  {language === 'roman' ? 'Pure R410A / R32 Gas' : 'Digital Scale Gram Weight'}
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('services')}
                className="text-xs font-bold text-slate-700 hover:text-cyan-600 cursor-pointer"
              >
                {language === 'roman' ? 'Tafseel Dekhein' : 'Read Specs'}
              </button>
              <button
                onClick={() => onOpenBooking('ac-cooling-issue')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-cyan-600 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                {language === 'roman' ? 'Book Karein' : 'Book Visit'}
              </button>
            </div>
          </div>

          {/* Card 3: Inverter PCB Repair */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={DEMO_IMAGES.inverterPcbRepair}
                  alt="Inverter PCB Motherboard Electronics Workstation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Electronics Lab
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base text-slate-900 font-display mb-1.5 group-hover:text-cyan-700 transition-colors">
                  {language === 'roman' ? 'Inverter PCB Board E6/F1 Repair' : 'Inverter PCB Motherboard Repair'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {language === 'roman'
                    ? 'Naya board khareedne k bajaye hamara lab IPM chips aur power supply ko component-level par warranty k sath repair karta hai.'
                    : 'Component-level IPM chip & sensor testing in our electronics lab at half the cost of a replacement board.'}
                </p>
                <div className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-100 inline-block">
                  {language === 'roman' ? '50% Bachat + Warranty' : 'Component-Level Micro Soldering'}
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('services')}
                className="text-xs font-bold text-slate-700 hover:text-cyan-600 cursor-pointer"
              >
                {language === 'roman' ? 'Tafseel Dekhein' : 'Read Specs'}
              </button>
              <button
                onClick={() => onOpenBooking('inverter-pcb-repair')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-cyan-600 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                {language === 'roman' ? 'Book Karein' : 'Book Visit'}
              </button>
            </div>
          </div>

          {/* Card 4: Installation & Shifting */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={DEMO_IMAGES.cleanModernAc}
                  alt="Precision AC Installation and Copper Piping"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Factory Alignment
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-base text-slate-900 font-display mb-1.5 group-hover:text-cyan-700 transition-colors">
                  {language === 'roman' ? 'Naya AC Fitting & Copper Piping' : 'Precision AC Installation'}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {language === 'roman'
                    ? 'Laser level se indoor mounting, heavy gauge pure copper pipe aur 500 microns deep vacuuming k sath installation.'
                    : 'Laser-level indoor alignment, heavy-wall copper piping, and dual-stage vacuum pump purging.'}
                </p>
                <div className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block">
                  {language === 'roman' ? '100% Pure Copper Pipe' : 'Laser Balanced Mounting'}
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onNavigate('services')}
                className="text-xs font-bold text-slate-700 hover:text-cyan-600 cursor-pointer"
              >
                {language === 'roman' ? 'Tafseel Dekhein' : 'Read Specs'}
              </button>
              <button
                onClick={() => onOpenBooking('ac-installation')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-cyan-600 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                {language === 'roman' ? 'Book Karein' : 'Book Visit'}
              </button>
            </div>
          </div>

        </div>

        {/* View All Services Link */}
        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('services')}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{language === 'roman' ? 'Tamam Services Ki Tafseel Dekhein' : 'Explore All Specialized Services'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 3 Dedicated Service Video Ads Showcase */}
      <ServiceVideoShowcase
        language={language}
        onOpenBooking={onOpenBooking}
      />

      {/* Interactive AI Diagnostic Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>{language === 'roman' ? 'High-Thinking AI Diagnostic Tool' : 'High-Thinking AI Diagnostic Tool'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
                {language === 'roman'
                  ? 'Ghar Baithe AI Se AC Ka Masla Maloom Karein'
                  : 'Instant AI Fault Diagnosis for Any Inverter AC'}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                {language === 'roman'
                  ? 'Kharab cooling, E6/F1 error codes, ajeeb awazein ya tripping? Hamare AI diagnostic engine me symptom select karein aur fori root cause aur safety advice hasil karein.'
                  : 'Describe your symptom or error code to receive deep thermodynamic fault isolation, safety instructions, and the exact technician action required.'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => onNavigate('ai-diagnosis')}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-cyan-300 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>{language === 'roman' ? 'AI Diagnostic Center Kholein' : 'Launch AI Diagnostics'}</span>
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>{language === 'roman' ? 'Technician Bulayein' : 'Direct Booking'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upfront Pricing Guarantee Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 mb-1">
                  {language === 'roman' ? '100% Visit Fee Discount' : '100% Visit Fee Credit'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'roman'
                    ? 'Technician ki checking fee quote manzoor hone par final bill me 100% adjust hoti hai.'
                    : 'Nominal visit charge is completely credited into your repair bill upon quotation approval.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 mb-1">
                  {language === 'roman' ? '90 Din Ki Service Warranty' : '90-Day Written Warranty'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'roman'
                    ? 'Har repair aur gas charging par written warranty di jati hai. Masla dobara aye tou free fix.'
                    : 'Every repair is backed by an itemized written warranty. Zero hassle, zero extra fees.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 mb-1">
                  {language === 'roman' ? '60 - 90 Minutes Dispatch' : 'Fast Mobile Dispatch'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'roman'
                    ? 'DHA, Gulberg, Johar Town, Bahria Town aur Cantt me priority mobile vans dastiab hain.'
                    : 'Dedicated mobile vans stocked with nitrogen, copper lines, and inverter boards ready to roll.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-600">
              {language === 'roman' ? 'Hamari mukammal rate card aur policy dekhne k liye:' : 'To inspect our transparent itemized rate card:'}
            </span>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-xs font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{language === 'roman' ? 'Mukammal Rates & Policy Page Kholein' : 'View Full Rate Card & Policy'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Preview */}
      <TestimonialsSection language={language} />

      {/* Frequently Asked Questions */}
      <FAQAccordion settings={settings} language={language} />

      {/* Bottom Emergency Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-10 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              {language === 'roman' ? 'Live Helpline Dastiab Hai' : '24/7 Helpline Active'}
            </span>
            <h3 className="text-2xl font-extrabold text-white font-display">
              {language === 'roman' ? 'Kya AC Foran Theek Karwana Hai?' : 'Need Urgent On-Site AC Repair?'}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {language === 'roman'
                ? 'Call karein: 0346 3902834 ya WhatsApp par photo/voice note bhejein.'
                : 'Call our hotline: 0346 3902834 or message our dispatcher on WhatsApp.'}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={createTelUrl(settings.phoneE164)}
              className="flex-1 sm:flex-none px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>0346 3902834</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="flex-1 sm:flex-none px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
            >
              {language === 'roman' ? 'Book Visit' : 'Book Online'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
