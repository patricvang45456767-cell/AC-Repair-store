import React, { useState } from 'react';
import { Snowflake, Sparkles, Droplets, Cpu, Wrench, ArrowDownCircle, Building2, CheckCircle2, Clock, ChevronRight, ShieldCheck, Info } from 'lucide-react';
import { ServiceItem } from '../../types';
import { servicesData } from '../../data/mockData';
import { Language } from '../../data/translations';

interface ServicesGridProps {
  language: Language;
  onSelectService: (serviceId: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ language, onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedService, setExpandedService] = useState<ServiceItem | null>(null);

  const categories = language === 'roman' ? [
    { id: 'all', label: 'Tamam Services' },
    { id: 'repair', label: 'Repair & Gas Leak' },
    { id: 'maintenance', label: 'Deep Jet Wash' },
    { id: 'electronics', label: 'Inverter PCB Board' },
    { id: 'installation', label: 'Fitting & Shifting' },
    { id: 'commercial', label: 'Commercial HVAC' },
  ] : [
    { id: 'all', label: 'All Services' },
    { id: 'repair', label: 'Repair & Troubleshooting' },
    { id: 'maintenance', label: 'Deep Jet Maintenance' },
    { id: 'electronics', label: 'Inverter PCB Board' },
    { id: 'installation', label: 'Installation & Relocation' },
    { id: 'commercial', label: 'Commercial HVAC' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === selectedCategory);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Snowflake':
        return <Snowflake className="w-6 h-6 text-cyan-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-600" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-teal-600" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-purple-600" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-slate-700" />;
      case 'ArrowDownCircle':
        return <ArrowDownCircle className="w-6 h-6 text-rose-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-amber-600" />;
      default:
        return <Wrench className="w-6 h-6 text-cyan-600" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{language === 'roman' ? 'Khasoosi AC Services' : 'Specialized AC Solutions'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            {language === 'roman'
              ? 'Certified Engineers Ki Janib Se AC Services'
              : 'Precision HVAC Services by Certified Engineers'}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'roman'
              ? 'Har kaam me digital manifold gauges, pure refrigerant gas aur zero-mess waterproof covers ka istemal.'
              : 'Every repair adheres to strict engineering procedures. We eliminate guesswork with electronic sensors, dual-stage vacuuming, and upfront price cards.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-cyan-500/60 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-cyan-50 flex items-center justify-center transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-100/70 text-cyan-800 border border-cyan-200">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-slate-900 font-display mb-2 group-hover:text-cyan-700 transition-colors">
                  {service.name}
                </h3>

                {/* Short Description */}
                <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Scope Highlights */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {language === 'roman' ? 'Kaam Ki Tafseel:' : 'Includes Checklist:'}
                  </div>
                  {service.includes.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Estimated Duration */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{service.estimatedDuration}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setExpandedService(service)}
                  className="flex-1 py-2 px-3 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>{language === 'roman' ? 'Tafseel Dekhein' : 'Details & Checklist'}</span>
                </button>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="flex-1 py-2 px-3 text-xs font-bold text-white bg-slate-900 hover:bg-cyan-700 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <span>{language === 'roman' ? 'Book Karein' : 'Book Service'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Service Detail Modal */}
      {expandedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center">
                  {getServiceIcon(expandedService.iconName)}
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 font-display">
                    {expandedService.name}
                  </h3>
                  <span className="text-xs font-bold text-cyan-700 uppercase">
                    {expandedService.category} protocol
                  </span>
                </div>
              </div>
              <button
                onClick={() => setExpandedService(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed mb-6">
              {expandedService.fullDescription}
            </p>

            {/* Symptoms Solved */}
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {language === 'roman' ? 'Yeh Masail Hal Karta Hai:' : 'Symptoms This Resolves:'}
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {expandedService.symptoms.map((sym, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0"></span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete Checklist */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                {language === 'roman' ? 'Technical Checklist:' : 'Technical Execution Checklist:'}
              </h4>
              <div className="space-y-2">
                {expandedService.includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Note & Policy */}
            <div className="p-3 bg-cyan-50/70 border border-cyan-200 rounded-xl text-xs text-cyan-950 mb-6">
              <span className="font-bold">{language === 'roman' ? 'Rate Policy Note: ' : 'Pricing Policy Note: '}</span>
              {expandedService.priceNote}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                {language === 'roman' ? 'Takhmeena Waqt: ' : 'Estimated On-site Time: '}
                <strong className="text-slate-800">{expandedService.estimatedDuration}</strong>
              </div>
              <button
                onClick={() => {
                  const sId = expandedService.id;
                  setExpandedService(null);
                  onSelectService(sId);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                {language === 'roman' ? 'Yeh Service Abhi Book Karein' : 'Book This Service Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
