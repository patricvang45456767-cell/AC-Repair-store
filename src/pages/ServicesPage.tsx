import React, { useState } from 'react';
import {
  Wrench,
  Snowflake,
  Sparkles,
  Droplets,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Scale,
  Zap,
  Info,
  Film
} from 'lucide-react';
import { Language } from '../data/translations';
import { DEMO_IMAGES } from '../constants/images';
import { servicesData } from '../data/mockData';
import { ServiceVideoShowcase } from '../components/video/ServiceVideoShowcase';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface ServicesPageProps {
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ language, onOpenBooking }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = language === 'roman' ? [
    { id: 'all', label: 'Tamam Services' },
    { id: 'maintenance', label: 'Jet Wash & Service' },
    { id: 'repair', label: 'Gas Leak & Cooling Repair' },
    { id: 'electronics', label: 'Inverter PCB Motherboards' },
    { id: 'installation', label: 'Fitting & Copper Piping' },
  ] : [
    { id: 'all', label: 'All Services' },
    { id: 'maintenance', label: 'Deep Jet Wash' },
    { id: 'repair', label: 'Gas Leak & Repair' },
    { id: 'electronics', label: 'Inverter PCB Repair' },
    { id: 'installation', label: 'Installation & Piping' },
  ];

  const getServiceImage = (id: string) => {
    switch (id) {
      case 'ac-general-service':
        return DEMO_IMAGES.jetWashService;
      case 'ac-cooling-issue':
        return DEMO_IMAGES.gasLeakRepair;
      case 'inverter-pcb-repair':
        return DEMO_IMAGES.inverterPcbRepair;
      case 'ac-installation':
        return DEMO_IMAGES.cleanModernAc;
      default:
        return DEMO_IMAGES.heroTechnician;
    }
  };

  const filteredServices = selectedFilter === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === selectedFilter);

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Banner Header */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3 animate-float-subtle">
              <Wrench className="w-3.5 h-3.5 text-cyan-600" />
              <span>{language === 'roman' ? 'Specialized AC Services' : 'Complete Engineering Catalog'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
              {language === 'roman' ? 'ABC Air Care Ki Khasoosi Services' : 'Precision HVAC & AC Repair Services'}
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {language === 'roman'
                ? 'Tukkay k baghair, digital manifold gauges aur certified equipment k sath mukammal inspection aur repair. Har kaam par 90 din ki written warranty.'
                : 'Factory-standard procedures using certified nitrogen pressure rigs, dual-stage vacuuming, and digital refrigerant weighing. Every job includes an itemized 90-day warranty.'}
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`btn-animated px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-slate-900 text-white shadow-md btn-glow-dark'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Detailed Services Grid with Demo Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service, idx) => {
            const imgSrc = getServiceImage(service.id);
            return (
              <ScrollReveal key={service.id} animation="fade-up" delay={idx * 100}>
                <div
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden card-interactive shadow-sm flex flex-col justify-between h-full group"
                >
                  <div>
                    {/* Visual Header Image */}
                    <div className="relative h-60 sm:h-72 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={service.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                          {service.badge || service.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                          {service.name}
                        </h3>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-8 space-y-6">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {service.fullDescription}
                      </p>

                      {/* Symptoms Addressed */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-cyan-600" />
                          <span>{language === 'roman' ? 'Yeh Kharabiyan Hal Karta Hai:' : 'Observed Symptoms Solved:'}</span>
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {service.symptoms.map((sym, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0"></span>
                              <span>{sym}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Scope Checklist */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                          {language === 'roman' ? 'Technical Kaam Ka Checklist:' : 'Technical Scope Checklist:'}
                        </h4>
                        <div className="space-y-2">
                          {service.includes.map((inc, i) => (
                            <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{inc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pricing Policy Box */}
                      <div className="p-3.5 bg-cyan-50/80 border border-cyan-200 rounded-xl text-xs text-cyan-950 flex items-start gap-2.5">
                        <Scale className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block mb-0.5">{language === 'roman' ? 'Shaffaf Rate Policy:' : 'Pricing Policy Note:'}</strong>
                          <span>{service.priceNote}</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{language === 'roman' ? 'Estimated Time: ' : 'Turnaround: '} <strong>{service.estimatedDuration}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {['ac-general-service', 'ac-cooling-issue', 'inverter-pcb-repair'].includes(service.id) && (
                        <button
                          onClick={() => {
                            const elem = document.getElementById('service-videos');
                            if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="btn-animated flex-1 sm:flex-none px-4 py-2.5 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          title="Watch Ad Video"
                        >
                          <Film className="w-3.5 h-3.5 text-cyan-700" />
                          <span>{language === 'roman' ? 'Video Ad' : 'Watch Ad'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => onOpenBooking(service.id)}
                        className="btn-animated btn-glow-dark flex-1 sm:flex-none px-6 py-2.5 bg-slate-900 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <span>{language === 'roman' ? 'Yeh Service Book Karein' : 'Book This Service'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* 3 Live Service Video Ads */}
        <div id="service-videos">
          <ScrollReveal animation="fade-up">
            <ServiceVideoShowcase
              language={language}
              onOpenBooking={onOpenBooking}
            />
          </ScrollReveal>
        </div>

        {/* Bottom Help Banner */}
        <ScrollReveal animation="fade-up">
          <div className="p-8 bg-gradient-to-r from-slate-900 to-cyan-950 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 hidden sm:flex">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-white font-display">
                  {language === 'roman' ? 'Samajh nahi araha k AC ko konsi service chahiye?' : 'Not sure which exact service your AC needs?'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {language === 'roman'
                    ? 'General Diagnostic Visit book karein, technician digital gauges k sath checkup karega.'
                    : 'Book a Diagnostic Inspection visit. 100% of the nominal visit fee is credited into your final invoice.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('general-inquiry')}
              className="btn-animated btn-glow-cyan w-full sm:w-auto px-6 py-3 font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2 text-sm group cursor-pointer"
            >
              <span>{language === 'roman' ? 'General Checkup Book Karein' : 'Book Diagnostic Check'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
