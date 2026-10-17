import React from 'react';
import { Phone, MessageSquare, ShieldCheck, Sparkles, Clock, CheckCircle2, ArrowRight, Snowflake, AlertCircle, Wrench, Droplets, Zap } from 'lucide-react';
import { SiteSettings } from '../../types';
import { Language, translations } from '../../data/translations';
import { createTelUrl, createWhatsAppUrl } from '../../lib/utils';

interface HeroProps {
  settings: SiteSettings;
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
  onSelectQuickSymptom: (symptom: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  language,
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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 text-xs sm:text-sm font-semibold mx-auto lg:mx-0 w-fit">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{t.heroTrust}</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight font-display leading-[1.15]">
              {t.heroTitle1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {t.heroTitleHighlight}
              </span>{' '}
              {t.heroTitle2}
            </h1>

            {/* Sub-headline */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-7 py-3.5 text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.btnBookInspection}</span>
                <ArrowRight className="w-5 h-5 text-slate-900" />
              </button>

              {/* Call Hotline: 0346 3902834 */}
              <a
                href={createTelUrl(settings.phoneE164)}
                className="w-full sm:w-auto px-6 py-3.5 text-base font-bold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2.5"
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>Call: {settings.phoneDisplay}</span>
              </a>

              {/* WhatsApp: 0346 3902834 */}
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

          {/* Right Column: Quick Issue Selector & Diagnostic Hub */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
                <div>
                  <h3 className="font-bold text-lg text-white font-display flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-cyan-400" />
                    <span>{t.quickSelectorTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{t.quickSelectorSub}</p>
                </div>
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800/60">
                  {t.instantMatch}
                </span>
              </div>

              {/* Problem Buttons */}
              <div className="flex flex-col gap-2.5">
                {quickProblems.map((prob) => {
                  const Icon = prob.icon;
                  return (
                    <button
                      key={prob.label}
                      onClick={() => onSelectQuickSymptom(prob.symptom)}
                      className="w-full text-left p-3.5 rounded-xl bg-slate-900/60 hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 group-hover:bg-cyan-900/50 flex items-center justify-center text-cyan-400 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {prob.label}
                          </div>
                          <div className="text-xs text-slate-400 line-clamp-1">{prob.symptom}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Callout */}
              <div className="mt-4 pt-4 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{t.avgResponse}</span>
                </span>
                <a
                  href="#ai-diagnosis"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>{t.deepAiLink}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
