import React from 'react';
import { DollarSign, ShieldAlert, CheckCircle, Scale, FileText, HelpCircle } from 'lucide-react';
import { SiteSettings } from '../../types';
import { Language, translations } from '../../data/translations';

interface PricingPolicyBannerProps {
  settings: SiteSettings;
  language: Language;
}

export const PricingPolicyBanner: React.FC<PricingPolicyBannerProps> = ({ settings, language }) => {
  const t = translations[language];

  return (
    <section id="pricing" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <span>{t.pricingBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {t.pricingTitle}
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm">
            {settings.pricePolicy}
          </p>
        </div>

        {/* 3 Core Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              {t.pricingCard1Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.pricingCard1Desc}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              {t.pricingCard2Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.pricingCard2Desc}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">
              {t.pricingCard3Title}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.pricingCard3Desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
