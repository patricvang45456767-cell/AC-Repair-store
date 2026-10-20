import React from 'react';
import {
  Scale,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  Phone
} from 'lucide-react';
import { Language } from '../data/translations';
import { SiteSettings } from '../types';
import { createTelUrl } from '../lib/utils';
import { ScrollReveal } from '../components/common/ScrollReveal';

interface PricingPageProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ settings, language, onOpenBooking }) => {
  const rateCards = [
    {
      category: language === 'roman' ? 'Deep Master Jet Wash Services' : 'Deep Master Jet Wash Services',
      items: [
        { name: '1.0 Ton & 1.5 Ton Split AC Master Jet Wash', price: 'Rs. 2,200', note: 'Includes waterproof service jacket bag on wall, degreasing chemical, outdoor coil wash.' },
        { name: '2.0 Ton Split Inverter Master Jet Wash', price: 'Rs. 2,800', note: 'High velocity blower wheel cleaning, drainage siphon sanitization.' },
        { name: '2.0 - 4.0 Ton Floor Standing Cabinet AC', price: 'Rs. 4,500', note: 'Dual centrifugal blower dismantling and high-pressure chemical wash.' },
        { name: 'Multi-Unit Home Bundle (3 or more ACs)', price: 'Special 15% Off', note: 'Full house seasonal maintenance bundle discount.' },
      ],
    },
    {
      category: language === 'roman' ? 'Gas Leak Testing & Refrigerant Charging' : 'Gas Leak Testing & Refrigerant Charging',
      items: [
        { name: 'Diagnostic Inspection & Manifold Gauge Test', price: 'Rs. 1,000 - 1,500', note: '100% credited into your final invoice upon approved service.' },
        { name: 'Dry Nitrogen High-Pressure Leak Test (350 PSI)', price: 'Rs. 2,000 - 2,500', note: 'Isolates exact coil or flare nut micro-leak before charging gas.' },
        { name: 'Flare Nut Replacement & Brazing Repair', price: 'Rs. 1,500 - 2,500', note: 'Silver braze torch repair with refrigeration oil seal.' },
        { name: 'Pure R410A / R32 Refrigerant Gas Refill', price: 'Charged by Digital Scale Weight', note: 'Weighed in grams on digital scale according to factory outdoor label plate.' },
      ],
    },
    {
      category: language === 'roman' ? 'Inverter PCB Board Repair (Electronics Lab)' : 'Inverter PCB Board Repair (Electronics Lab)',
      items: [
        { name: 'Inverter Board Diagnostic Bench Test', price: 'Rs. 1,000', note: 'Oscilloscope and multimeter IPM signal check (Adjusted in repair bill).' },
        { name: 'E6 / F1 / IPM Module Component Repair', price: 'Rs. 4,500 - 8,500', note: 'Save 50-70% compared to buying a Rs. 28,000 brand new motherboard. 90-day warranty.' },
        { name: 'Sensor & Thermistor Harness Replacement', price: 'Rs. 1,800 - 2,500', note: 'Calibrated factory thermistor resistance match.' },
      ],
    },
    {
      category: language === 'roman' ? 'AC Installation & Shifting' : 'AC Installation & Shifting',
      items: [
        { name: 'Split AC Wall Mounting & Installation', price: 'Rs. 3,500 - 4,000', note: 'Laser level indoor bracket, outdoor heavy angle mounting, vacuuming.' },
        { name: 'Safe AC Dismantling (Refrigerant Pump-down)', price: 'Rs. 2,000', note: 'Refrigerant safely stored inside compressor with zero gas loss.' },
        { name: 'Heavy Gauge Copper Pipe with Aeroflex Insulation', price: 'Per RFT Market Rate', note: '100% pure seamless copper tube.' },
      ],
    },
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with ScrollReveal fade-down */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 animate-float-subtle">
              <Scale className="w-3.5 h-3.5" />
              <span>{language === 'roman' ? '100% Shaffaf Rate Card' : 'Transparent Pricing Standards'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
              {language === 'roman' ? 'Upfront Rates & Inspection Policy' : 'Itemized Upfront Pricing Card'}
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {language === 'roman'
                ? 'Koi chhupe hue kharche ya baad me izafay nahi. Kaam shuru hone se pehle written estimate aur 100% visit fee credit.'
                : 'Never worry about arbitrary inflated estimates. We provide clear, itemized pricing and adjust our inspection fee into your final invoice.'}
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Core Guarantee Pillars with 3D Flip-up Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal animation="flip-up" delay={50}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm card-interactive h-full group">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-cyan-700 transition-colors">
                {language === 'roman' ? '100% Visit Fee Discount' : '100% Visit Fee Credit'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'roman'
                  ? 'Technician ki visit fee (Rs. 1,000 - 1,500) quote approve hone par final repair bill me 100% deduct ho jati hai.'
                  : 'A nominal transit fee applies for digital gauge diagnostics, which is 100% credited into your final invoice when service is approved.'}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="flip-up" delay={150}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm card-interactive h-full group">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-cyan-700 transition-colors">
                {language === 'roman' ? 'Gas Weight K Hisab Se Charge Hogi' : 'Refrigerant Weighed on Digital Scale'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'roman'
                  ? 'Hawa me teer chalaye baghair, digital electronic scale par toal kar pure R410A/R32 gas grams me bhari jati hai.'
                  : 'Never pay for arbitrary top-ups. We weigh exact grams on calibrated digital scales matching your AC factory plate.'}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="flip-up" delay={250}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm card-interactive h-full group">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-emerald-700 transition-colors">
                {language === 'roman' ? '90 Din Ki Written Warranty' : '90-Day Written Service Warranty'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'roman'
                  ? 'Har repair aur gas charging par written invoice aur 90 din warranty milti hai. Masla aye tou free re-visit.'
                  : 'Every job is protected by a 90-day written guarantee. If the same issue recurs within 90 days, we fix it with zero extra visit charge.'}
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Pricing Tables with ScrollReveal */}
        <div className="space-y-8">
          {rateCards.map((category, idx) => (
            <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm card-interactive">
                <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
                  <h3 className="font-bold text-base sm:text-lg font-display">
                    {category.category}
                  </h3>
                  <span className="text-xs text-cyan-400 font-semibold">ABC Certified Standard</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors group">
                      <div>
                        <div className="font-bold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors">{item.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.note}</div>
                      </div>
                      <div className="font-extrabold text-sm sm:text-base text-cyan-800 shrink-0">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Action Callout with Animated Buttons */}
        <ScrollReveal animation="zoom">
          <div className="p-8 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl card-interactive-cyber border border-slate-800">
            <div>
              <h3 className="text-xl font-bold font-display">
                {language === 'roman' ? 'Kya aapko kisi specific kaam ka estimate chahiye?' : 'Need a formal estimate for your office or residence?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {language === 'roman'
                  ? 'Call karein: 0346 3902834 ya online inspection visit request submit karein.'
                  : 'Call our hotline: 0346 3902834 or request a technician inspection online.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={createTelUrl(settings.phoneE164)}
                className="btn-animated btn-glow-dark px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-slate-700 group shadow-md"
              >
                <Phone className="w-4 h-4 text-cyan-400 group-hover-phone-wobble transition-transform" />
                <span>0346 3902834</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="btn-animated btn-glow-cyan px-6 py-3 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg group"
              >
                <span>{language === 'roman' ? 'Technician Bulayein' : 'Book Inspection'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
