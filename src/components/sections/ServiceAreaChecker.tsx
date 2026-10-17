import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Clock, Phone, AlertCircle, ArrowRight } from 'lucide-react';
import { SiteSettings } from '../../types';
import { Language, translations } from '../../data/translations';

interface ServiceAreaCheckerProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: () => void;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ settings, language, onOpenBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const t = translations[language];

  const filteredAreas = settings.serviceAreas.filter((a) =>
    a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="coverage" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Context */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.coverageBadge}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              {t.coverageTitle}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {t.coverageSubtitle}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-cyan-600" />
                <span>{t.coverageResponseTime}</span>
              </div>
              <p className="text-slate-500">
                {language === 'roman'
                  ? 'Khasoosi coverage areas me emergency AC breakdown par fori technician ravana kia jata hai.'
                  : 'In prime coverage zones, emergency breakdown requests receive priority routing.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'roman' ? 'Apne Ilqay Me Service Book Karein' : 'Book Service in Your Area'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Area Search & List */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs">
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.coverageSearchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
              {filteredAreas.map((area, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedArea(area)}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                    selectedArea === area
                      ? 'bg-cyan-600 text-white border-cyan-600 font-bold'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${selectedArea === area ? 'text-white' : 'text-emerald-600'}`} />
                    <span>{area}</span>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                    selectedArea === area ? 'bg-cyan-700 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {language === 'roman' ? 'Active' : 'Covered'}
                  </span>
                </div>
              ))}
            </div>

            {selectedArea && (
              <div className="mt-4 p-3 bg-cyan-100/70 border border-cyan-200 rounded-xl flex items-center justify-between text-xs">
                <span className="text-cyan-900">
                  {language === 'roman' ? 'Selected Area: ' : 'Selected Area: '}
                  <strong>{selectedArea}</strong>
                </span>
                <button
                  onClick={onOpenBooking}
                  className="font-bold text-cyan-800 hover:text-cyan-950 underline"
                >
                  {language === 'roman' ? 'Technician Bulayein →' : 'Schedule Dispatch →'}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
