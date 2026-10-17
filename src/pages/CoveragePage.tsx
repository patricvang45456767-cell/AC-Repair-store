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

  const zones = [
    { name: 'DHA Phase 1 to 9 & Raya', eta: '45 - 60 mins', status: 'Priority Hub', vans: 3 },
    { name: 'Gulberg (I, II, III, IV, V)', eta: '40 - 55 mins', status: 'Central Hub', vans: 2 },
    { name: 'Johar Town & PIA Society', eta: '45 - 60 mins', status: 'Active Van', vans: 2 },
    { name: 'Cantt, Cavalry & Falcon Complex', eta: '45 - 60 mins', status: 'Active Van', vans: 2 },
    { name: 'Model Town & Garden Town', eta: '40 - 50 mins', status: 'Active Van', vans: 2 },
    { name: 'Bahria Town & Canal Gardens', eta: '60 - 80 mins', status: 'Southern Hub', vans: 2 },
    { name: 'WAPDA Town & PCSIR', eta: '50 - 65 mins', status: 'Active Van', vans: 1 },
    { name: 'Faisal Town & Township', eta: '45 - 60 mins', status: 'Active Van', vans: 1 },
    { name: 'Valencia, Lake City & Bahria Orchard', eta: '60 - 75 mins', status: 'Active Van', vans: 1 },
    { name: 'Askari (1 through 11)', eta: '50 - 65 mins', status: 'Active Van', vans: 1 },
  ];

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
              ? 'Hamari mobile vans pure Lahore k ahem ilqon me har waqt digital tools aur spare parts k sath active rehti hain.'
              : 'Our fleet of mobile service vans are stocked with nitrogen cylinders, copper lines, and inverter motherboards across prime Lahore sectors.'}
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
                {language === 'roman' ? 'Mobile Fleet Dispatch System' : 'Dedicated Mobile Van Fleet'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'roman'
                  ? 'Aam technicians ki tarah hum motor cycle par chhota sa bag lekar nahi aate. Hamari dedicated mobile van me complete high-pressure jet pump, 350 PSI dry nitrogen, digital vacuum pump aur leak sniffers rehte hain.'
                  : 'Unlike informal workers on motorbikes, our certified vans carry complete industrial jet pumps, dual-stage vacuum stations, dry nitrogen, and factory copper line kits.'}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'roman' ? 'Average Arrival Time: 45 - 75 Minutes' : 'Average Response Time: 45 - 75 Mins'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'roman' ? 'Emergency Night Support for Server Rooms' : 'Emergency Priority Support for Sensitive Sites'}</span>
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
                placeholder="Search town, sector, or phase (e.g. DHA, Gulberg, Johar Town)..."
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
                      <span>ETA: {z.eta}</span>
                    </span>
                    <span>{z.vans} Active Vans</span>
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
