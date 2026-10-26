import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertOctagon,
  Wrench,
  ShieldCheck,
  ArrowRight,
  ZoomIn,
  Cpu
} from 'lucide-react';
import { Language } from '../data/translations';
import { DEMO_IMAGES } from '../constants/images';
import { beforeAfterData } from '../data/mockData';

interface GalleryPageProps {
  language: Language;
  onOpenBooking: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ language, onOpenBooking }) => {
  const visualCases = [
    {
      title: language === 'roman' ? 'Deep Chemical Master Jet Wash' : 'Deep Master Jet Wash with Protective Bag',
      category: 'Maintenance',
      image: DEMO_IMAGES.jetWashService,
      before: language === 'roman' ? 'Indoor blower wheel par fungal gunk aur mitti jami hui thi; hawa ka throw 60% kamzor tha aur sour badbu thi.' : 'Blower wheel choked with mold & mud; airflow velocity reduced by 60%.',
      after: language === 'roman' ? 'Waterproof jacket laga kar high pressure jet se mukammal degrease kia; brand-new jaisi icy cooling aur taaza hawa wapis agayi.' : 'Restored 100% full CFM airflow throw with antimicrobial fin foam sanitization.',
      tag: 'Zero-Mess Wash'
    },
    {
      title: language === 'roman' ? 'Precision Nitrogen Leak Detection' : 'Nitrogen Leak Isolation & Valve Service',
      image: DEMO_IMAGES.gasLeakRepair,
      category: 'Gas Leakage',
      before: language === 'roman' ? 'Suction pipe par barf jam rahi thi, compressor 3 minute me cut-off ho jata tha aur 40 PSI gas pressure tha.' : 'Frost on thin line; refrigerant leaking constantly from cracked flare union.',
      after: language === 'roman' ? '350 PSI dry nitrogen se leak trace kar k brass flare re-torque kia; scale par toal kar exact factory grams pure R410A bhari.' : 'Rock solid 350 PSI pressure hold test passed; precision-weighed digital charging.',
      tag: '350 PSI Hold'
    },
    {
      title: language === 'roman' ? 'Inverter Motherboard PCB Lab Repair' : 'Inverter PCB IPM & Power Supply Repair',
      image: DEMO_IMAGES.inverterPcbRepair,
      category: 'Electronics',
      before: language === 'roman' ? 'Display par E6 communication aur F1 error code flash kar raha tha; company center ne Rs. 28,000 naye board ka manga.' : 'E6/F1 communication failure; compressor silent on start.',
      after: language === 'roman' ? 'Electronics lab me faulty IPM microchip aur capacitors replace kiye; aadhe kharche me 90 din warranty k sath fix kia.' : 'Tested on oscilloscope & repaired at 50% lower cost with 90-day warranty.',
      tag: 'Lab Verified'
    },
    {
      title: language === 'roman' ? 'Laser-Level AC Installation & Piping' : 'Modern Split AC Installation & Vacuuming',
      image: DEMO_IMAGES.acInstallation,
      category: 'Installation',
      before: language === 'roman' ? 'Aam technician ne purana AC kholte waqt gas uda di thi aur indoor unit tedha laga dia tha jisse pani tapak raha tha.' : 'Improper non-level mounting causing indoor water pooling and vibration hum.',
      after: language === 'roman' ? 'Laser spirit level se mounting, pure copper pipe routing aur two-stage vacuum pump se 500 microns deep evacuation.' : 'Laser balanced indoor bracket; flawless drainage slope and whisper-quiet operation.',
      tag: '100% Pure Copper'
    },
    {
      title: language === 'roman' ? 'Andar Pani Tapakne Ka Hal' : 'Indoor AC Water-Leak Diagnosis',
      image: DEMO_IMAGES.waterLeakage,
      category: 'Water Leakage',
      before: language === 'roman' ? 'Drain pipe block honay ya unit ka level theek na honay se deewar par pani tapak raha tha.' : 'A blocked drain or incorrect indoor-unit level caused water to drip down the wall.',
      after: language === 'roman' ? 'Drain line saaf kar ke slope aur tray check ki, phir controlled water-flow test se drainage verify ki.' : 'The drain path, slope, and tray were checked, then verified with a controlled water-flow test.',
      tag: 'Drainage Restored'
    },
    {
      title: language === 'roman' ? 'Commercial HVAC Preventive Service' : 'Commercial HVAC Preventive Maintenance',
      image: DEMO_IMAGES.commercialHvac,
      category: 'Commercial HVAC',
      before: language === 'roman' ? 'Heavy-use condenser coils par mitti jamne se airflow aur cooling performance kam ho rahi thi.' : 'Dust-loaded condenser coils were restricting airflow and reducing cooling performance.',
      after: language === 'roman' ? 'Coils, airflow, electrical connections aur operating readings inspect kar ke service report tayyar ki.' : 'Coils, airflow, electrical connections, and operating readings were inspected and documented.',
      tag: 'System Health Check'
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'roman' ? 'Asli Kaam K Proofs' : 'Real Field Engineering Showcase'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            {language === 'roman' ? 'Asli Kaam, Behtareen Results' : 'Real Work, Proven Results'}
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'roman'
              ? 'Koi hawai daaway nahi. Dekhein hamare certified technicians kis tarah field me AC problems hal karte hain.'
              : 'Explore real on-site diagnostic case studies, before/after thermal performance, and our certified workshop standard.'}
          </p>
        </div>

        {/* 4 Case Studies with Demo Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visualCases.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden group">
                  <img
                    src={c.image}
                    alt={c.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  <span className="absolute top-4 left-4 px-3 py-1 bg-cyan-600 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                    {c.tag}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-1">
                      {c.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-white font-display">
                      {c.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Defect Box */}
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-1">
                      <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                      <span>{language === 'roman' ? 'Asal Kharabi (Before):' : 'The Defect (Before):'}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {c.before}
                    </p>
                  </div>

                  {/* Fix Box */}
                  <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-cyan-900 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{language === 'roman' ? 'ABC Technician Ka Solution (After):' : 'Our Engineering Solution (After):'}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {c.after}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>90-Day Written Warranty</span>
                </span>

                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2 bg-slate-900 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {language === 'roman' ? 'Book Visit' : 'Book Similar Service'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certified Equipment Standard Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              {language === 'roman' ? 'Standardized Equipment' : 'Standardized Equipment'}
            </span>
            <h3 className="text-2xl font-extrabold font-display">
              {language === 'roman' ? 'Hamare Technicians K Tools Aur Equipment' : 'What Every ABC Mobile Service Van Carries'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'roman'
                ? 'Har mobile van me standard factory-approved tools rehte hain taake aapka AC baghair kisi nuqsan k sahi tareeqay se repair ho.'
                : 'Every mobile van is audited weekly to ensure zero compromises on safety, accuracy, and cleanliness.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <div className="font-extrabold text-cyan-400 text-sm">350 PSI</div>
              <div className="font-bold text-white">Dry Nitrogen Rig</div>
              <div className="text-slate-400 text-[11px]">Coil leak isolation</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <div className="font-extrabold text-cyan-400 text-sm">500 Microns</div>
              <div className="font-bold text-white">Two-Stage Vacuum</div>
              <div className="text-slate-400 text-[11px]">Moisture eradication</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <div className="font-extrabold text-cyan-400 text-sm">Digital Scale</div>
              <div className="font-bold text-white">Pure Gas Weighing</div>
              <div className="text-slate-400 text-[11px]">Gram-accuracy charge</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-1">
              <div className="font-extrabold text-cyan-400 text-sm">ESD Workstation</div>
              <div className="font-bold text-white">Oscilloscope Lab</div>
              <div className="text-slate-400 text-[11px]">IPM component repair</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
