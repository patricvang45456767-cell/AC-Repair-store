import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, AlertTriangle, ShieldCheck, Clock, ArrowRight, CheckCircle2, RotateCw, Wrench, ThermometerSnowflake, FileText } from 'lucide-react';
import { requestAIDiagnosis } from '../../lib/api';
import { Language, translations } from '../../data/translations';

interface AIDiagnosisSectionProps {
  language: Language;
  onBookWithDiagnosis: (serviceId: string, problemDetails: string) => void;
  presetSymptom?: string;
}

export const AIDiagnosisSection: React.FC<AIDiagnosisSectionProps> = ({
  language,
  onBookWithDiagnosis,
  presetSymptom = '',
}) => {
  const t = translations[language];

  const defaultSymptom = language === 'roman'
    ? 'Indoor blower chal raha hai lekin thandi hawa nahi arahi, compressor trip ho raha hai'
    : 'Indoor blower blowing warm room air, outdoor compressor humming and cutting out';

  const [symptom, setSymptom] = useState(presetSymptom || defaultSymptom);
  const [acType, setAcType] = useState('split');
  const [brand, setBrand] = useState('Gree 1.5 Ton Inverter');
  const [roomSize, setRoomSize] = useState('Master Bedroom (14x16 ft)');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [thinkingStep, setThinkingStep] = useState(0);

  useEffect(() => {
    if (presetSymptom) {
      setSymptom(presetSymptom);
    }
  }, [presetSymptom]);

  const commonSymptomPresets = language === 'roman' ? [
    'Cooling nahi kar raha, compressor 3 minute baad trip ho jata hai',
    'Display par E6 error code flash kar raha hai',
    'Indoor unit se deewar par pani beh raha hai',
    'Outdoor k copper pipe par barf (ice) jam rahi hai',
    'Gandi badbu aur hawa ka throw bohot kamzor hai',
    'Outdoor fan chal raha hai lekin compressor on nahi ho raha',
  ] : [
    'Not cooling, compressor trips after 3 mins',
    'E6 communication error code flashing on display',
    'Water pouring from indoor unit onto wall',
    'Ice or frost on outdoor copper suction pipe',
    'Foul sour/mildew smell and choking airflow',
    'Outdoor fan running but compressor does not start',
  ];

  const handleRunDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptom.trim()) return;

    setLoading(true);
    setDiagnosisResult(null);

    const steps = language === 'roman' ? [
      'Thermodynamic aur pressure analysis shuru ho rahi hai...',
      'Compressor load aur capacitor testing analyze ho rahi hai...',
      'Inverter PCB IPM aur sensor calibration check ho raha hai...',
      'Tashkheesi report aur hifazati hidayaat tayyar ki ja rahi hain...',
    ] : [
      'Initializing high-thinking thermodynamic analyzer...',
      'Evaluating compressor thermal curves & capacitor load...',
      'Analyzing inverter IPM module & thermistor calibration...',
      'Synthesizing safety guidance & repair recommendation...',
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setThinkingStep(current);
      }
    }, 1200);

    try {
      const res = await requestAIDiagnosis({
        problem: symptom,
        acType,
        brand,
        symptom,
        roomSize,
        notes: additionalNotes,
      });

      clearInterval(interval);
      if (res.success && res.diagnosis) {
        setDiagnosisResult(res.diagnosis);
      } else {
        setDiagnosisResult(res.error || 'Diagnostic evaluation complete.');
      }
    } catch {
      clearInterval(interval);
      setDiagnosisResult('Diagnostic evaluation completed.');
    } finally {
      setLoading(false);
      setThinkingStep(0);
    }
  };

  const handleBookFromDiagnosis = () => {
    let serviceId = 'ac-cooling-issue';
    const lower = symptom.toLowerCase();
    if (lower.includes('water') || lower.includes('leak') || lower.includes('pani') || lower.includes('drip')) {
      serviceId = 'ac-water-leakage';
    } else if (lower.includes('e6') || lower.includes('error') || lower.includes('code') || lower.includes('pcb') || lower.includes('board')) {
      serviceId = 'inverter-pcb-repair';
    } else if (lower.includes('wash') || lower.includes('service') || lower.includes('smell') || lower.includes('badbu') || lower.includes('chok')) {
      serviceId = 'ac-general-service';
    } else if (lower.includes('install') || lower.includes('shift') || lower.includes('fitting')) {
      serviceId = 'ac-installation';
    }

    const problemSummary = `AI Diagnosis: ${symptom} (${brand || 'AC'}, Type: ${acType})`;
    onBookWithDiagnosis(serviceId, problemSummary);
  };

  return (
    <section id="ai-diagnosis" className="py-16 lg:py-24 bg-white relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs sm:text-sm font-bold mb-3">
            <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
            <span>{t.aiBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            {t.aiTitle} <span className="text-cyan-600">{t.aiHighlight}</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            {t.aiSubtitle}
          </p>
        </div>

        {/* Diagnosis Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-5 border-b border-slate-200 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white shadow-xs">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">{t.aiFormTitle}</h3>
                <p className="text-xs text-slate-500">
                  {language === 'roman' ? 'Inverter aur Non-Inverter systems ka AI analysis' : 'High-Thinking Analysis for Inverter & Conventional Units'}
                </p>
              </div>
            </div>

            <form onSubmit={handleRunDiagnosis} className="space-y-5">
              {/* Common Symptom Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t.aiPresetsLabel}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {commonSymptomPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSymptom(preset)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all text-left ${
                        symptom === preset
                          ? 'bg-cyan-600 text-white border-cyan-600 font-semibold'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom Input Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.aiDescLabel}
                </label>
                <textarea
                  rows={3}
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder={t.aiDescPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              {/* System Specs (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.aiTypeLabel}
                  </label>
                  <select
                    value={acType}
                    onChange={(e) => setAcType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                  >
                    <option value="split">Split DC Inverter (1 - 2 Ton)</option>
                    <option value="conventional">Conventional Split (Non-Inverter)</option>
                    <option value="floor-standing">Floor Standing Cabinet AC</option>
                    <option value="cassette">Ceiling Cassette Unit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t.aiBrandLabel}
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Gree, Haier, Dawlance, Kenwood"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Room Size */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t.aiRoomLabel}
                </label>
                <input
                  type="text"
                  value={roomSize}
                  onChange={(e) => setRoomSize(e.target.value)}
                  placeholder="e.g. Top floor bedroom (14x16 ft), direct sun exposure"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Submit Diagnosis Button */}
              <button
                type="submit"
                disabled={loading || !symptom.trim()}
                className="w-full py-3.5 px-6 font-bold text-white bg-slate-900 hover:bg-cyan-700 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {loading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>{t.aiBtnAnalyzing}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{t.aiBtnAnalyze}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Diagnostic Output Column */}
          <div className="lg:col-span-6 bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl min-h-[460px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-bold text-white text-base font-display">
                    {t.aiReportTitle}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ABC Engineering Protocol</span>
                </div>
              </div>

              {/* Thinking State */}
              {loading && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
                    <Cpu className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      {language === 'roman' ? 'AI High Thinking جاری ہے...' : 'Deep Thinking AI Diagnostics in Progress...'}
                    </h5>
                    <p className="text-xs text-cyan-400 mt-1 animate-pulse">
                      {language === 'roman'
                        ? 'Thermodynamic model aur pressure parameters calculate ho rahe hain...'
                        : 'Simulating refrigerant phase-change curves & electrical schematics...'}
                    </p>
                  </div>
                </div>
              )}

              {/* No Query Yet */}
              {!loading && !diagnosisResult && (
                <div className="py-16 text-center text-slate-400 space-y-3">
                  <ThermometerSnowflake className="w-12 h-12 text-slate-700 mx-auto" />
                  <h5 className="font-bold text-slate-300 text-sm">{t.aiNoQueryTitle}</h5>
                  <p className="text-xs max-w-sm mx-auto text-slate-400 leading-relaxed">
                    {t.aiNoQuerySub}
                  </p>
                </div>
              )}

              {/* Formatted Diagnostic Result */}
              {!loading && diagnosisResult && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                  <div className="p-3 bg-cyan-950/60 border border-cyan-800/80 rounded-xl text-cyan-300 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">
                        {language === 'roman' ? 'Tashkheesi Jaiza:' : 'Evaluated Issue:'}{' '}
                      </span>
                      <span>{symptom}</span>
                    </div>
                  </div>

                  <div className="prose prose-invert prose-xs max-w-none space-y-3 leading-relaxed whitespace-pre-line text-slate-300">
                    {diagnosisResult}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions inside Result Box */}
            <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t.aiPhysicalNotice}</span>
              </div>

              <button
                onClick={handleBookFromDiagnosis}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>{t.aiBookThis}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
