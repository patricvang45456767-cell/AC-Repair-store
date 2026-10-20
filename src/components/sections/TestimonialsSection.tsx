import React from 'react';
import { Star, ShieldCheck, CheckCircle } from 'lucide-react';
import { testimonialsData } from '../../data/mockData';
import { Language } from '../../data/translations';
import { ScrollReveal } from '../common/ScrollReveal';

interface TestimonialsSectionProps {
  language: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ language }) => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with ScrollReveal fade-down */}
        <ScrollReveal animation="fade-down">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3 animate-float-subtle">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              <span>{language === 'roman' ? 'Verified Customer Reviews' : 'Verified Customer Reviews'}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              {language === 'roman' ? 'Hamare Mutma\'in Customers Ki Raaye' : 'Trusted by Homeowners & Offices'}
            </h2>
            <p className="mt-2 text-slate-600 text-xs sm:text-sm">
              {language === 'roman'
                ? 'Asli feedback aur tajarbaat ABC Air Care ki services k baray me.'
                : 'Genuine experiences from customers across our active service sectors.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials 3 Column Grid with Staggered ScrollReveal and 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((item, idx) => (
            <ScrollReveal key={item.id} animation="fade-up" delay={idx * 120}>
              <div
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative card-interactive h-full group"
              >
                <div>
                  {/* Rating Stars with Scale Pop */}
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform" />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1.5">5.0</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                    "{item.comment}"
                  </p>
                </div>

                {/* Author & Service Badge */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <span>{item.customerName}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-600 inline group-hover:scale-125 transition-transform" />
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.area} • <span className="font-medium text-slate-700">{item.acModel}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-100 group-hover:border-cyan-300 transition-colors">
                    {item.serviceProvided}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
