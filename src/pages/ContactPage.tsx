import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ExternalLink,
  Wrench,
  AlertCircle,
  RotateCw
} from 'lucide-react';
import { Language, translations } from '../data/translations';
import { SiteSettings } from '../types';
import { createTelUrl, createWhatsAppUrl } from '../lib/utils';
import { submitServiceRequest } from '../lib/api';
import { servicesData } from '../data/mockData';

interface ContactPageProps {
  settings: SiteSettings;
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, language }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceId, setServiceId] = useState('ac-cooling-issue');
  const [areaText, setAreaText] = useState(settings.serviceAreas[0] || 'DHA');
  const [acType, setAcType] = useState('inverter');
  const [brandModel, setBrandModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeWindow, setPreferredTimeWindow] = useState('anytime');
  const [consentGiven, setConsentGiven] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successCode, setSuccessCode] = useState<string | null>(null);

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMsg(language === 'roman' ? 'Apna pura naam likhein.' : 'Please enter your name.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 9) {
      setErrorMsg(language === 'roman' ? 'Durust mobile number darj karein.' : 'Please enter a valid phone number.');
      return;
    }

    if (!problemDescription.trim()) {
      setErrorMsg(language === 'roman' ? 'AC ka masla mukhtasaran batayein.' : 'Please describe the AC problem.');
      return;
    }

    setLoading(true);
    try {
      const selectedServiceObj = servicesData.find((s) => s.id === serviceId);
      const res = await submitServiceRequest({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        serviceId,
        serviceLabel: selectedServiceObj ? selectedServiceObj.name : 'General Inspection',
        areaText,
        acType,
        brandModel: brandModel.trim() || 'Not specified',
        problemDescription: problemDescription.trim(),
        preferredDate: preferredDate || undefined,
        preferredTimeWindow,
        consentGiven,
      });

      if (res.success) {
        setSuccessCode(res.refCode);
      } else {
        setErrorMsg('Submission failed. Please call 0346 3902834 directly.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5" />
            <span>{t.contactBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            {t.contactTitle}
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.contactSubtitle}
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card: 0346 3902834 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t.contactHotlineTitle}
                </span>
                <div className="text-xl font-extrabold text-slate-900 font-display mb-2">
                  0346 3902834
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'roman'
                    ? 'Emergency AC cooling breakdown ya fori on-site inspection k liye 24/7 helpline.'
                    : 'Direct helpline for emergency air conditioner breakdowns and same-day dispatch.'}
                </p>
              </div>
              <a
                href={createTelUrl(settings.phoneE164)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call Hotline (0346 3902834)</span>
              </a>
            </div>

            {/* WhatsApp Card: 0346 3902834 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 fill-emerald-600 text-emerald-600" />
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t.contactWhatsAppTitle}
                </span>
                <div className="text-xl font-extrabold text-emerald-600 font-display mb-2">
                  0346 3902834
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {language === 'roman'
                    ? 'AC k error code ki photo ya problem ki audio WhatsApp par share karein.'
                    : 'Send photos of error codes or voice notes describing the fault.'}
                </p>
              </div>
              <a
                href={createWhatsAppUrl(settings.whatsappE164, settings.whatsappPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Open WhatsApp (0346 3902834)</span>
              </a>
            </div>

            {/* Address & Hours */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">{t.contactAddressTitle}</strong>
                  <span>{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <Clock className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">{t.contactHoursTitle}</strong>
                  <span>{settings.openingHours}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Online Service Request Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {successCode ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-800 text-xs font-mono font-bold rounded-full">
                  Reference Code: {successCode}
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                  {language === 'roman' ? 'Request Successfully Receive Ho Gayi!' : 'Request Successfully Received!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {language === 'roman'
                    ? 'Hamara dispatcher foran 0346 3902834 se aapko call ya WhatsApp kar k visit time confirm karega.'
                    : 'Our dispatcher will call or WhatsApp you shortly from 0346 3902834 to confirm technician dispatch.'}
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSuccessCode(null);
                      setProblemDescription('');
                    }}
                    className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    {language === 'roman' ? 'Nayi Request Submit Karein' : 'Submit Another Request'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block mb-1">
                    {language === 'roman' ? 'Online Booking Form' : 'Online Booking Form'}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                    {language === 'roman' ? 'Technician Inspection Visit Book Karein' : 'Schedule an Inspection Visit'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'roman'
                      ? 'Neeche details bharein, hamari team foran phone ya WhatsApp par confirmation degi.'
                      : 'Fill out the form below. We verify every appointment before technician dispatch.'}
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.fieldName}
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Asif Mehmood"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.fieldPhone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. 0300 1234567"
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.fieldService}
                      </label>
                      <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none"
                      >
                        {servicesData.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                        <option value="general-inquiry">Not sure / Full Diagnostic Check</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.fieldArea}
                      </label>
                      <select
                        value={areaText}
                        onChange={(e) => setAreaText(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none"
                      >
                        {settings.serviceAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.fieldAcType}
                      </label>
                      <select
                        value={acType}
                        onChange={(e) => setAcType(e.target.value)}
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none"
                      >
                        <option value="inverter">Split DC Inverter</option>
                        <option value="split">Conventional Non-Inverter</option>
                        <option value="floor-standing">Floor Standing Unit</option>
                        <option value="cassette">Ceiling Cassette</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t.fieldBrand}
                      </label>
                      <input
                        type="text"
                        value={brandModel}
                        onChange={(e) => setBrandModel(e.target.value)}
                        placeholder="e.g. Gree 1.5T Fairy, Haier DC..."
                        className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t.fieldProblem}
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      placeholder="e.g. Thandi hawa nahi arahi, pani tapak raha hai, E6 error code araha hai..."
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-900">
                    <span className="font-bold">ABC Air Care Guarantee: </span>
                    <span>100% of the nominal visit inspection fee is credited into your final invoice upon approved service.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 font-bold text-white bg-slate-900 hover:bg-cyan-700 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <RotateCw className="w-4 h-4 animate-spin text-cyan-400" />
                        <span>{t.btnSubmitting}</span>
                      </>
                    ) : (
                      <>
                        <Wrench className="w-4 h-4 text-cyan-400" />
                        <span>{t.btnSubmitBooking}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
