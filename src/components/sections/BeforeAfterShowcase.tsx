import React from 'react';
import { Sparkles, CheckCircle2, AlertOctagon, Wrench } from 'lucide-react';
import { beforeAfterData } from '../../data/mockData';
import { Language } from '../../data/translations';

interface BeforeAfterShowcaseProps {
  language: Language;
}

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({ language }) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'roman' ? 'Asli Kaam K Nataij' : 'Technical Work Standards'}</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-display">
            {language === 'roman' ? 'Asli Kaam, Behtareen Results' : 'Real Work, Real Engineering Results'}
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed">
            {language === 'roman'
              ? 'Koi hawai batein nahi. Dekhein hamare certified technicians kis tarah field me AC problems hal karte hain.'
              : "We don't use stock photos or make generic claims. Here is how our technicians isolate and resolve real field failures."}
          </p>
        </div>

        {/* 3 Case Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beforeAfterData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800/60 inline-block mb-3">
                  {item.category}
                </span>

                <h3 className="text-lg font-bold text-white font-display mb-3">
                  {item.title}
                </h3>

                {/* Problem vs Solution comparison */}
                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-1">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>{language === 'roman' ? 'Asal Kharabi (Masla):' : 'The Defect:'}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.problem}
                    </p>
                    <div className="text-[11px] text-slate-400 mt-1 italic">
                      {language === 'roman' ? 'Pehle Ki Halat:' : 'Condition:'} {item.beforeDesc}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-900/60">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{language === 'roman' ? 'ABC Technician Ka Hal:' : 'Our Engineering Fix:'}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {item.solution}
                    </p>
                    <div className="text-[11px] text-cyan-300 mt-1 font-semibold">
                      {language === 'roman' ? 'Kaam K Baad:' : 'After Result:'} {item.afterDesc}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-cyan-400" />
                  <span>ABC Verified Case</span>
                </span>
                <span className="text-emerald-400 font-bold">100% Tested</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
