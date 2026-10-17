import React, { useState } from 'react';
import {
  Sparkles,
  Cpu,
  AlertTriangle,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  RotateCw,
  Wrench,
  Search,
  BookOpen,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Language, translations } from '../data/translations';
import { requestAIDiagnosis } from '../lib/api';
import { DEMO_IMAGES } from '../constants/images';

interface AIDiagnosisPageProps {
  language: Language;
  presetSymptom?: string;
  onBookWithDiagnosis: (serviceId: string, problemDetails: string) => void;
}

export const AIDiagnosisPage: React.FC<AIDiagnosisPageProps> = ({
  language,
  presetSymptom = '',
  onBookWithDiagnosis,
}) => {
  const t = translations[language];

  const defaultProblem = language === 'roman'
    ? 'Indoor blower chal raha hai lekin thandi hawa nahi arahi, outdoor compressor 3 minute chal kar trip ho jata hai'
    : 'Indoor blower blowing warm room air, outdoor compressor humming and cutting out';

  const [symptom, setSymptom] = useState(presetSymptom || defaultProblem);
  const [acType, setAcType] = useState('split');
  const [brand, setBrand] = useState('Gree 1.5 Ton Fairy Inverter');
  const [roomSize, setRoomSize] = useState('Master Bedroom (14x16 ft)');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [codeSearch, setCodeSearch] = useState('');

  // Quick Error Codes Table
  const errorCodes = [
    { code: 'E6', brand: 'Gree / EcoStar', meaning: 'Indoor & Outdoor Communication Cable Fault / Inverter IPM Signal Loss', action: 'Inspect 4-core communication signal voltage; PCB IPM chip check.' },
    { code: 'F1', brand: 'Haier DC Inverter', meaning: 'IPM Module Over-Current or Thermal Protection Shutdown', action: 'Check outdoor heat sink paste, wash choked condenser, test compressor windings.' },
    { code: 'EC', brand: 'Dawlance / Midea', meaning: 'Refrigerant Leakage Detection (Zero cooling delta)', action: 'High pressure dry nitrogen test at 350 PSI to isolate flare nut micro-leak.' },
    { code: 'H6', brand: 'Gree Inverter', meaning: 'Indoor DC Blower Motor Locked / Hall Sensor Drift', action: 'Check indoor fan motor bearing and PCB motor drive circuit.' },
    { code: 'P0', brand: 'Orient T3 Inverter', meaning: 'Inverter Board High Voltage / IPM Surge Protection', action: 'Check supply voltage stability; replace degraded PCB capacitors.' },
    { code: 'E3', brand: 'Kenwood / Pel', meaning: 'Indoor Evaporator Temperature Sensor Resistance Open', action: 'Test thermistor resistance with digital multimeter (5k/10k ohm).' },
  ];

  const filteredCodes = errorCodes.filter(
    (e) =>
      e.code.toLowerCase().includes(codeSearch.toLowerCase()) ||
      e.brand.toLowerCase().includes(codeSearch.toLowerCase()) ||
      e.meaning.toLowerCase().includes(codeSearch.toLowerCase())
  );

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

    try {
      const res = await requestAIDiagnosis({
        problem: symptom,
        acType,
        brand,
        symptom,
        roomSize,
        notes: additionalNotes,
      });

      if (res.success && res.diagnosis) {
        setDiagnosisResult(res.diagnosis);
      } else {
        setDiagnosisResult(res.error || 'Diagnostic evaluation completed.');
      }
    } catch {
      setDiagnosisResult('Diagnostic evaluation completed.');
    } finally {
      setLoading(false);
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

    const problemSummary = `AI Diagnostic Case: ${symptom} (${brand || 'AC'}, Type: ${acType})`;
    onBookWithDiagnosis(serviceId, problemSummary);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
            <span>High-Thinking HVAC Diagnostic Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display">
            {language === 'roman' ? 'AI Se AC Ka Masla Maloom Karein' : 'AI AC Fault Diagnostic Center'}
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'roman'
              ? 'Compressor behavior, error codes, gas leakage aur capacitor tripping ka mukammal scientific tajziya. Neeche apna masla darj karein:'
              : 'Our high-thinking diagnostic engine evaluates refrigerant pressure curves, inverter IPM signals, and thermistor resistance drift to explain why your AC is failing.'}
          </p>
        </div>

        {/* Diagnostic Form & Result Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 pb-5 border-b border-slate-200 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white shadow-xs">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 font-display">
                  {language === 'roman' ? 'AC Ki Kharabi Batayein' : 'Describe the Fault'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'roman' ? 'Inverter & Conventional Systems' : 'Inverter & Conventional Units'}
                </p>
              </div>
            </div>

            <form onSubmit={handleRunDiagnosis} className="space-y-5">
              {/* Common Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {language === 'roman' ? 'Common Masla Chunein:' : 'Quick Select Symptom:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {commonSymptomPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setSymptom(preset)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all text-left cursor-pointer ${
                        symptom === preset
                          ? 'bg-cyan-600 text-white border-cyan-600 font-semibold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-cyan-400 hover:bg-cyan-50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'roman' ? 'Kharabi Ki Tafseel *' : 'Observed Fault Description *'}
                </label>
                <textarea
                  rows={3}
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder="e.g. Indoor blows warm air, E6 error on screen, compressor makes humming sound..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none"
                  required
                />
              </div>

              {/* System Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === 'roman' ? 'AC Ki Type' : 'AC Type'}
                  </label>
                  <select
                    value={acType}
                    onChange={(e) => setAcType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none"
                  >
                    <option value="split">Split DC Inverter (1 - 2 Ton)</option>
                    <option value="conventional">Conventional Split (Non-Inverter)</option>
                    <option value="floor-standing">Floor Standing Cabinet AC</option>
                    <option value="cassette">Ceiling Cassette Unit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === 'roman' ? 'Brand / Model' : 'Brand & Model'}
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Gree, Haier, Dawlance, Kenwood"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Room Size */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'roman' ? 'Kamray Ka Size / Location' : 'Room Size & Sunlight'}
                </label>
                <input
                  type="text"
                  value={roomSize}
                  onChange={(e) => setRoomSize(e.target.value)}
                  placeholder="e.g. Top floor bedroom (14x16 ft), direct afternoon sun"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !symptom.trim()}
                className="w-full py-3.5 px-6 font-bold text-white bg-slate-900 hover:bg-cyan-700 disabled:opacity-50 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {loading ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>{language === 'roman' ? 'AI Tajziya Kar Raha Hai...' : 'Analyzing Diagnostics...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{language === 'roman' ? 'Masla Analyze Karein (Run AI)' : 'Analyze Problem Now (AI)'}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Diagnostic Result */}
          <div className="lg:col-span-6 bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl min-h-[480px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  <h4 className="font-bold text-white text-base font-display">
                    {language === 'roman' ? 'Engineering Diagnostic Report' : 'Diagnostic Engineering Report'}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ABC Air Care Protocol</span>
                </div>
              </div>

              {loading && (
                <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
                    <Cpu className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      {language === 'roman' ? 'AI High-Thinking Mode Chalu Hai...' : 'AI High-Thinking Mode Processing...'}
                    </h5>
                    <p className="text-xs text-cyan-400 mt-1 animate-pulse">
                      {language === 'roman'
                        ? 'Thermodynamics aur refrigerant parameters calculate ho rahe hain...'
                        : 'Simulating refrigerant phase-change curves & electrical schematics...'}
                    </p>
                  </div>
                </div>
              )}

              {!loading && !diagnosisResult && (
                <div className="py-20 text-center text-slate-400 space-y-3">
                  <Cpu className="w-12 h-12 text-slate-700 mx-auto" />
                  <h5 className="font-bold text-slate-300 text-sm">
                    {language === 'roman' ? 'Koi Masla Select Nahi Hua' : 'No Active Diagnostic Query'}
                  </h5>
                  <p className="text-xs max-w-sm mx-auto text-slate-400 leading-relaxed">
                    {language === 'roman'
                      ? 'Left side se symptom select karein ya khud likh kar "Run AI" dabayein.'
                      : 'Select a symptom on the left or type your problem description and click Analyze.'}
                  </p>
                </div>
              )}

              {!loading && diagnosisResult && (
                <div className="space-y-4 text-xs sm:text-sm text-slate-200">
                  <div className="p-3 bg-cyan-950/60 border border-cyan-800/80 rounded-xl text-cyan-300 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">{language === 'roman' ? 'Masla:' : 'Evaluated Issue:'} </span>
                      <span>{symptom}</span>
                    </div>
                  </div>

                  <div className="prose prose-invert prose-xs max-w-none space-y-3 leading-relaxed whitespace-pre-line text-slate-300">
                    {diagnosisResult}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {language === 'roman'
                    ? 'Digital manifold gauge se physical checkup zaruri hai.'
                    : 'Physical gauge testing required for certified warranty repair.'}
                </span>
              </div>

              <button
                onClick={handleBookFromDiagnosis}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>{language === 'roman' ? 'Yeh Repair Visit Book Karein' : 'Book This Repair Visit'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Quick Error Code Reference Database */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-cyan-600 text-xs font-bold uppercase tracking-wider mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Inverter Error Codes Database</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-display">
                {language === 'roman' ? 'AC Error Codes Ki Maloomat' : 'Common Inverter Fault Codes Reference'}
              </h3>
            </div>

            {/* Code Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={codeSearch}
                onChange={(e) => setCodeSearch(e.target.value)}
                placeholder="Search error (e.g. E6, F1, EC)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="pb-3 pr-4">Code</th>
                  <th className="pb-3 pr-4">Brand</th>
                  <th className="pb-3 pr-4">Root Meaning</th>
                  <th className="pb-3">Recommended Technician Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCodes.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 pr-4 font-extrabold text-cyan-700 font-mono text-sm">
                      {item.code}
                    </td>
                    <td className="py-3 pr-4 font-semibold text-slate-900">
                      {item.brand}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">
                      {item.meaning}
                    </td>
                    <td className="py-3 text-slate-600">
                      {item.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
