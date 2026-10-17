import React from 'react';
import { PhoneCall, SearchCheck, FileCheck, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language, translations } from '../../data/translations';

interface ProcessStepsProps {
  language: Language;
  onOpenBooking: () => void;
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ language, onOpenBooking }) => {
  const t = translations[language];

  const steps = language === 'roman' ? [
    {
      num: '01',
      title: 'Online Request Ya Direct Call',
      desc: 'Form bharein ya direct 0346 3902834 par call karein. Apna masla aur munasib time slot chunein.',
      icon: PhoneCall,
      highlight: 'Fawri Jawab',
    },
    {
      num: '02',
      title: 'On-Site Diagnostic Checkup',
      desc: 'Hamara certified technician digital manifold gauges aur multimeters k sath unit ki checking karta hai.',
      icon: SearchCheck,
      highlight: 'Sahi Tashkhees',
    },
    {
      num: '03',
      title: 'Pehle Se Rate & Fee Discount',
      desc: 'Kaam shuru hone se pehle clear rate bataya jata hai. Inspection fee final bill me 100% adjust hoti hai.',
      icon: FileCheck,
      highlight: 'Koi Hidden Charges Nahi',
    },
    {
      num: '04',
      title: 'Tasalli Bakhsh Kaam & Warranty',
      desc: 'Genuine parts aur deep vacuuming k sath kaam complete kia jata hai, sath 90 din ki written warranty milti hai.',
      icon: CheckCircle2,
      highlight: '90 Din Ki Guarantee',
    },
  ] : [
    {
      num: '01',
      title: 'Submit Request or Call',
      desc: 'Book in 60 seconds online or call 0346 3902834. Select your AC symptoms and preferred time slot.',
      icon: PhoneCall,
      highlight: 'Instant Acknowledgment',
    },
    {
      num: '02',
      title: 'On-Site Diagnostic Check',
      desc: 'Our certified technician arrives with digital manifold gauges, multimeters, and leak sniffers to inspect your unit.',
      icon: SearchCheck,
      highlight: 'Accurate Diagnosis',
    },
    {
      num: '03',
      title: 'Upfront Estimate & Fee Credit',
      desc: 'You receive an exact written cost breakdown before any work begins. 100% of the nominal visit fee is credited into your repair bill.',
      icon: FileCheck,
      highlight: 'Zero Hidden Charges',
    },
    {
      num: '04',
      title: 'Precision Work & Warranty',
      desc: 'Work is executed using genuine parts and factory vacuum protocols, followed by temperature delta testing and written warranty.',
      icon: CheckCircle2,
      highlight: '90-Day Guarantee',
    },
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>{t.processBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            {t.processTitle}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.processSubtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 hover:border-cyan-500/50 transition-all hover:shadow-lg flex flex-col justify-between relative group"
              >
                {/* Big Step Number in Background */}
                <span className="text-5xl font-extrabold text-slate-200 group-hover:text-cyan-100 transition-colors absolute top-4 right-4 select-none">
                  {step.num}
                </span>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="inline-block text-[11px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded mb-2">
                    {step.highlight}
                  </span>

                  <h3 className="text-base font-bold text-slate-900 font-display mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-cyan-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 hidden sm:flex">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white font-display">
                {t.processCtaTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {t.processCtaSub}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-3 font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span>{t.btnBookInspection}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
