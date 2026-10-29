import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, MessageSquare, AlertCircle, Calendar, Clock, Wrench, ShieldCheck, ArrowRight, RotateCw, MapPin } from 'lucide-react';
import { SiteSettings, ServiceRequest } from '../../types';
import { servicesData } from '../../data/mockData';
import { submitServiceRequest } from '../../lib/api';
import { Language, translations } from '../../data/translations';
import { createTelUrl, createWhatsAppUrl } from '../../lib/utils';

interface BookServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialServiceId?: string;
  initialNotes?: string;
  settings: SiteSettings;
}

export const BookServiceModal: React.FC<BookServiceModalProps> = ({
  isOpen,
  onClose,
  language,
  initialServiceId = '',
  initialNotes = '',
  settings,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceId, setServiceId] = useState(initialServiceId || 'ac-cooling-issue');
  const [areaText, setAreaText] = useState(settings.serviceAreas[0] || 'DHA');
  const [customArea, setCustomArea] = useState('');
  const [acType, setAcType] = useState('inverter');
  const [brandModel, setBrandModel] = useState('');
  const [problemDescription, setProblemDescription] = useState(initialNotes || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeWindow, setPreferredTimeWindow] = useState('anytime');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ refCode: string; message: string } | null>(null);

  const t = translations[language];

  // Sync initial props
  useEffect(() => {
    if (initialServiceId) setServiceId(initialServiceId);
    if (initialNotes) setProblemDescription(initialNotes);
  }, [initialServiceId, initialNotes]);

  const todayStr = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMsg(language === 'roman' ? 'Apna pura naam likhein.' : 'Please enter your full name (minimum 2 characters).');
      return;
    }

    if (!customerPhone.trim() || customerPhone.trim().length < 9) {
      setErrorMsg(language === 'roman' ? 'Durust mobile number likhein (maslan: 0300 1234567).' : 'Please enter a valid phone number (minimum 9 digits).');
      return;
    }

    if (!problemDescription.trim()) {
      setErrorMsg(language === 'roman' ? 'AC ka masla mukhtasaran batayein.' : 'Please describe the observed AC problem.');
      return;
    }

    if (!consentGiven) {
      setErrorMsg(language === 'roman' ? 'Rabtay ki ijazat k check box ko tick karein.' : 'Please agree to allow our dispatcher to contact you.');
      return;
    }

    const finalArea = areaText === 'Other' && customArea.trim() ? customArea.trim() : areaText;
    const selectedServiceObj = servicesData.find((s) => s.id === serviceId);
    const serviceLabel = selectedServiceObj ? selectedServiceObj.name : 'General Service Inspection';

    setLoading(true);

    try {
      const response = await submitServiceRequest({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        serviceId,
        serviceLabel,
        areaText: finalArea,
        acType,
        brandModel: brandModel.trim() || 'Not specified',
        problemDescription: problemDescription.trim(),
        preferredDate: preferredDate || undefined,
        preferredTimeWindow,
        additionalNotes: additionalNotes.trim() || undefined,
        honeypot,
        consentGiven,
      });

      if (response.success) {
        setSuccessData({
          refCode: response.refCode,
          message: response.message,
        });
      } else {
        setErrorMsg(language === 'roman' ? 'Request submit nahi ho saki. Baraye meharbani direct call karein.' : 'Failed to submit request. Please try calling directly.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with server.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessData(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-page-entrance border border-slate-100">
        
        {/* Close Button with animated rotate */}
        <button
          onClick={handleResetAndClose}
          className="btn-animated absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer group"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>

        {/* If Success */}
        {successData ? (
          <div className="py-4 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold mb-1">
                Reference Code: {successData.refCode}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                {t.successTitle}
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed pt-1">
                {successData.message}
              </p>
            </div>

            {/* Next Steps Accordion */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <span className="font-bold text-slate-900 block">{t.successNextSteps}</span>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="font-bold text-cyan-600">1.</span>
                <span>{t.step1}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="font-bold text-cyan-600">2.</span>
                <span>{t.step2}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="font-bold text-cyan-600">3.</span>
                <span>{t.step3}</span>
              </div>
            </div>

            {/* Instant Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={createWhatsAppUrl(
                  settings.whatsappE164,
                  `Assalam o Alaikum ABC Air Care, maine abhi request #${successData.refCode} submit ki hai for ${customerName}. Baraye meharbani confirm karein.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Pe Confirm Karein</span>
              </a>

              <a
                href={createTelUrl(settings.phoneE164)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>Call Hotline (0346 3902834)</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 uppercase tracking-wider mb-1">
                <Wrench className="w-4 h-4" />
                <span>{t.modalBadge}</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                {t.modalTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t.modalSubtitle}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field for anti-spam (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_url_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.fieldName}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
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

              {/* Row 2: Service Type and Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.fieldService}
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-600"
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
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-600"
                  >
                    {settings.serviceAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                    <option value="Other">Other / Doosra Ilqa</option>
                  </select>
                </div>
              </div>

              {/* If "Other" area selected */}
              {areaText === 'Other' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'roman' ? 'Apna Ilqa / Town Likhein' : 'Specify Your Area / Town'}
                  </label>
                  <input
                    type="text"
                    value={customArea}
                    onChange={(e) => setCustomArea(e.target.value)}
                    placeholder="e.g. 20 Wala Adda, Railway Road, Arain Colony..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-cyan-600"
                  />
                </div>
              )}

              {/* Row 3: AC Type and Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.fieldAcType}
                  </label>
                  <select
                    value={acType}
                    onChange={(e) => setAcType(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-600"
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
                    placeholder="e.g. Gree 1.5 Ton Fairy, Haier DC..."
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-600"
                  />
                </div>
              </div>

              {/* Problem Description */}
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
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-cyan-600"
                />
              </div>

              {/* Row 4: Date & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.fieldDate}
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-cyan-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.fieldTime}
                  </label>
                  <select
                    value={preferredTimeWindow}
                    onChange={(e) => setPreferredTimeWindow(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-cyan-600"
                  >
                    <option value="anytime">As soon as possible / Anytime</option>
                    <option value="morning">Subah / Morning (9 AM - 1 PM)</option>
                    <option value="afternoon">Dopahar / Afternoon (1 PM - 5 PM)</option>
                    <option value="evening">Shaam / Evening (5 PM - 9 PM)</option>
                  </select>
                </div>
              </div>

              {/* Transparent Fee Notice */}
              <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-900">
                <span className="font-bold">ABC Air Care Guarantee: </span>
                <span>
                  {language === 'roman'
                    ? 'Technician ki visit fee final repair invoice me 100% adjust hoti hai.'
                    : '100% of the nominal visit inspection fee is credited into your final invoice upon approved service.'}
                </span>
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="consent" className="text-xs text-slate-600">
                  {t.fieldConsent}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-animated btn-glow-cyan w-full py-3.5 px-6 font-bold text-white bg-slate-900 hover:bg-cyan-700 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm group"
              >
                {loading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>{t.btnSubmitting}</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
                    <span>{t.btnSubmitBooking}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
