import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';
import { faqsData } from '../../data/mockData';
import { SiteSettings } from '../../types';
import { Language } from '../../data/translations';
import { createTelUrl, createWhatsAppUrl } from '../../lib/utils';

interface FAQAccordionProps {
  settings: SiteSettings;
  language: Language;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ settings, language }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const romanFaqs = [
    {
      id: 'faq-1',
      question: 'Kya AC ki gas waqt k sath khud khatam ya burn ho jati hai?',
      answer: 'Nahi! Air conditioning ka refrigeration circuit 100% hermetically sealed (band) loop hota hai. Gas kabhi khud burn ya deplete nahi hoti. Agar aapke AC me gas kam hai tou iska matlab 100% koi physical micro-leak hai. Hamara pehla usool yeh hai k nitrogen se pehle leak dhoond kar theek kia jaye, phir gas bhari jaye.',
    },
    {
      id: 'faq-2',
      question: 'Aapki inspection aur visit fee ka kia hisab hai?',
      answer: 'Hum visit aur digital gauge testing k liye nominal inspection fee lete hain. Lekin jab aap quotation approve kar k kaam karwate hain, tou yeh fee aapke final bill me 100% minus/adjust ho jati hai.',
    },
    {
      id: 'faq-3',
      question: 'Kya Inverter AC k error codes (E1 se E9, F1, P0) repair ho jate hain?',
      answer: 'Jee bilkul! Company centers poora PCB board 25-30 hazar me replace karne ka kehte hain. ABC Air Care ki dedicated electronics lab me motherboard k IPM chips, sensors aur power supply ko component-level par test kar k half rate me warranty k sath repair kia jata hai.',
    },
    {
      id: 'faq-4',
      question: 'Normal water wash aur Master Jet Service me kia farq hai?',
      answer: 'Normal service me sirf plastic jali (filter) dhoya jata hai. ABC Master Jet Service me deewar par waterproof service bag lagaya jata hai, high-pressure jet pump se blower fan aur heat exchanger coils se chiknahat, mitti aur fungal gunk clean kia jata hai.',
    },
    {
      id: 'faq-5',
      question: 'Kya repair aur gas charging par koi warranty milti hai?',
      answer: 'Jee haan! Har leak repair, gas charging aur PCB repair par 90 din ki written warranty di jati hai. Agar 90 din k andar wohi masla dobara aye tou hamara technician free of cost dobara visit kar k fix karta hai.',
    },
    {
      id: 'faq-6',
      question: 'Technician kitni der me mere ghar/office pohanch sakta hai?',
      answer: 'DHA, Gulberg, Johar Town, Bahria Town, Cantt aur Model Town me hamari mobile vans rehti hain. Call ya online booking k baad aam tor par 60 se 90 minutes me technician pohanch jata hai.',
    },
  ];

  const currentFaqs = language === 'roman' ? romanFaqs : faqsData;

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
            <span>{language === 'roman' ? 'Ahem Sawalat' : 'Got Questions?'}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">
            {language === 'roman' ? 'Frequently Asked Questions (Ahem Sawalat)' : 'Frequently Asked Questions'}
          </h2>
          <p className="mt-2 text-slate-600 text-xs sm:text-sm">
            {language === 'roman'
              ? 'Gas leakage, inspection fee, inverter motherboards aur warranty k baray me shaffaf jawabat.'
              : 'Honest answers about refrigerant myths, inspection policies, inverter repairs, and warranties.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {currentFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 bg-cyan-100 text-cyan-700' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              {language === 'roman' ? 'Koi aur sawal ya specific masla hai?' : 'Have a specific fault or question not covered here?'}
            </h4>
            <p className="text-xs text-slate-500">
              {language === 'roman' ? 'Hamare lead technician se direct call ya WhatsApp par baat karein.' : 'Talk directly to our lead technician on call or WhatsApp.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={createTelUrl(settings.phoneE164)}
              className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call: {settings.phoneDisplay}</span>
            </a>
            <a
              href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
