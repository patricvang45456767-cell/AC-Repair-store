import React, { useState } from 'react';
import {
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  ArrowRight,
  ShieldCheck,
  Truck,
  Compass
} from 'lucide-react';
import { Language } from '../data/translations';
import { SiteSettings } from '../types';
import { createTelUrl } from '../lib/utils';

interface CoveragePageProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: () => void;
}

export const CoveragePage: React.FC<CoveragePageProps> = ({ settings, language, onOpenBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const zones = settings.serviceAreas.map((name) => ({
    name,
    eta: language === 'roman' ? 'Booking par confirm' : 'Confirm on booking',
    status: language === 'roman' ? 'Sadiqabad area' : 'Sadiqabad area',
  }));

  const filteredZones = zones.filter((z) =>
    z.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'roman' ? 'Service Areas & Route Coverage' : 'Service Coverage Areas'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            {language === 'roman' ? 'Aapke Ilqay Me ABC Mobile Vans' : 'Fast Mobile Technician Coverage'}
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'roman'
              ? 'ABC Air Care ka pata 20 Wala Adda, Al Makkah Hotel ke qareeb, Sadiqabad hai. Visit ka waqt call ya WhatsApp par confirm hota hai.'
              : 'ABC Air Care is based at 20 Wala Adda near Al Makkah Hotel, Sadiqabad. Visit times are confirmed by phone or WhatsApp.'}
          </p>
        </div>

        {/* Coverage Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 font-display">
                {language === 'roman' ? 'Sadiqabad Mein AC Service' : 'AC Service in Sadiqabad'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'roman'
                  ? 'Appointment confirm hone ke baad technician aapke AC ke maslay ke mutabiq zaroori tools ke sath visit karega.'
                  : 'After your appointment is confirmed, a technician will visit with tools appropriate for the AC service you requested.'}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'roman' ? 'Visit ka waqt booking par confirm hoga' : 'Visit time confirmed on booking'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'roman' ? 'Call ya WhatsApp par visit confirm karein' : 'Confirm your visit by call or WhatsApp'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'roman' ? '100% Visit Fee Final Bill Me Adjust' : '100% Visit Fee Credited into Approved Service'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{language === 'roman' ? 'Apne Ilqay Me Technician Bulayein' : 'Request Dispatch in Your Area'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Searchable Zones */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search area (e.g. 20 Wala Adda, Railway Road, Arain Colony)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-cyan-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
              {filteredZones.map((z, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedArea(z.name)}
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                    selectedArea === z.name
                      ? 'bg-cyan-600 text-white border-cyan-600 shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-sm truncate">{z.name}</div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      selectedArea === z.name ? 'bg-cyan-700 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {z.status}
                    </span>
                  </div>

                  <div className={`flex items-center justify-between text-[11px] ${selectedArea === z.name ? 'text-cyan-100' : 'text-slate-500'}`}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{language === 'roman' ? 'Visit: ' : 'Visit: '}{z.eta}</span>
                    </span>
                    <span>{language === 'roman' ? 'Call par confirm' : 'Confirm by phone'}</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedArea && (
              <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-2xl flex items-center justify-between text-xs">
                <span className="text-cyan-950">
                  {language === 'roman' ? 'Selected Area: ' : 'Selected Area: '}
                  <strong>{selectedArea}</strong>
                </span>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-1.5 bg-slate-900 text-white font-bold rounded-lg cursor-pointer hover:bg-cyan-600 transition-colors"
                >
                  {language === 'roman' ? 'Abhi Dispatch Karein →' : 'Confirm Dispatch →'}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
