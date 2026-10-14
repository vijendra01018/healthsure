import React, { useState } from 'react';
import { Language } from '../types/health';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  PhoneCall,
  RotateCcw,
  Send,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface HealthAssistantProps {
  language: Language;
  onNavigateToArticle?: (articleId: string) => void;
  onNavigateToEmergency?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isUrgent?: boolean;
  timestamp: string;
}

const BODY_REGIONS = [
  { id: 'head_neck', label: { en: 'Head & Neck', te: 'తల మరియు మెడ' } },
  { id: 'chest', label: { en: 'Chest & Breathing', te: 'ఛాతీ మరియు శ్వాస' } },
  { id: 'abdomen', label: { en: 'Abdomen & Stomach', te: 'కడుపు మరియు జీర్ణశయం' } },
  { id: 'pelvis_uro', label: { en: 'Pelvis & Reproductive', te: 'కటి భాగం & మూత్ర వ్యవస్థ' } },
  { id: 'limbs_joints', label: { en: 'Arms, Legs & Joints', te: 'చేతులు, కాళ్ళు & కీళ్ళు' } },
  { id: 'skin_general', label: { en: 'Skin & Whole Body (Fatigue/Fever)', te: 'చర్మం & సాధారణ లక్షణాలు' } }
];

const SEVERITY_LEVELS = [
  { id: 'mild', label: { en: 'Mild (Noticeable but does not disrupt daily routine)', te: 'తేలికపాటి (రోజువారీ పనులకు ఆటంకం కలిగించదు)' }, color: 'text-emerald-400' },
  { id: 'moderate', label: { en: 'Moderate (Disrupts sleep or standard work)', te: 'మధ్యస్థం (పనులు లేదా నిద్రకు ఇబ్బంది కలిగిస్తుంది)' }, color: 'text-amber-400' },
  { id: 'severe', label: { en: 'Severe (Intense, debilitating, or sudden onset)', te: 'తీవ్రమైనది (చాలా తీవ్రంగా, భరించలేని విధంగా ఉంది)' }, color: 'text-rose-400' }
];

const DURATION_OPTIONS = [
  { id: 'hours', label: { en: 'Less than 24 hours (Sudden)', te: '24 గంటల కంటే తక్కువ (హఠాత్తుగా)' } },
  { id: 'few_days', label: { en: 'A few days (2 to 6 days)', te: 'కొన్ని రోజులు (2 నుండి 6 రోజులు)' } },
  { id: 'weeks', label: { en: '1 to 3 weeks', te: '1 నుండి 3 వారాలు' } },
  { id: 'chronic', label: { en: 'Over a month (Persistent / Long-term)', te: 'నెల కంటే ఎక్కువ కాలం' } }
];

const RED_FLAGS = [
  { id: 'chest_pain', label: { en: 'Crushing or radiating chest tightness', te: 'ఛాతీలో తీవ్రమైన నొప్పి లేదా ఒత్తిడి' } },
  { id: 'breathing_trouble', label: { en: 'Severe sudden shortness of breath', te: 'శ్వాస తీసుకోవడంలో తీవ్రమైన ఇబ్బంది' } },
  { id: 'stroke_signs', label: { en: 'Sudden weakness on one side of face/arm or slurred speech', te: 'ముఖం ఒకవైపు వంగిపోవడం లేదా మాట తడబడటం' } },
  { id: 'blood_vomit_stool', label: { en: 'Vomiting blood or dark black tarry stools', te: 'వాంతిలో రక్తం లేదా నల్లటి మలం రావడం' } },
  { id: 'high_fever_confusion', label: { en: 'High persistent fever with stiff neck or confusion', te: 'మెడ నొప్పి లేదా అయోమయంతో కూడిన అధిక జ్వరం' } }
];

export const HealthAssistant: React.FC<HealthAssistantProps> = ({
  language,
  onNavigateToArticle,
  onNavigateToEmergency
}) => {
  const [activeMode, setActiveMode] = useState<'guided' | 'ai_chat'>('guided');

  // Guided Questionnaire State
  const [step, setStep] = useState<number>(1);
  const [selectedRegion, setSelectedRegion] = useState<string>('head_neck');
  const [symptomText, setSymptomText] = useState<string>('');
  const [duration, setDuration] = useState<string>('few_days');
  const [severity, setSeverity] = useState<string>('mild');
  const [selectedRedFlags, setSelectedRedFlags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: language === 'te'
        ? "నమస్తే! నేను మెడిగైడ్ AI హెల్త్ ఎడ్యుకేషన్ అసిస్టెంట్‌ని. మీరు మీ ఆరోగ్య ప్రశ్నలు, వైద్య పరీక్షలు, క్లోమం ఆరోగ్యం లేదా రక్తదానం గురించి నన్ను అడగవచ్చు. (గమనిక: నేను వైద్య నిర్ధారణ చేయలేను, అత్యవసర సమయాల్లో వైద్యుడిని సంప్రదించండి)."
        : "Hello! I am MediGuide AI Healthcare Educational Guide. Ask me about symptoms, medical terminology, pancreas health, women's wellness, or blood donation eligibility.\n\n*Important Safety Note: I provide educational information only and cannot diagnose diseases or prescribe medications.*",
      timestamp: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Handle Red Flag Toggles
  const toggleRedFlag = (id: string) => {
    setSelectedRedFlags((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const hasUrgentFlags = selectedRedFlags.length > 0 || severity === 'severe';

  const resetForm = () => {
    setStep(1);
    setSymptomText('');
    setSelectedRedFlags([]);
    setSeverity('mild');
    setDuration('few_days');
    setIsSubmitted(false);
  };

  // Submit Chat Query to Express Server (/api/chat)
  const handleSendChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isAiLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const currentInput = chatInput.trim();
    setChatInput('');
    setIsAiLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          language,
          context: `User selected body region: ${selectedRegion}`
        })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: data.reply || 'Thank you for your question. Please consult a qualified doctor for clinical evaluation.',
        isUrgent: data.isUrgent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      // Local safety response on failure
      const fallbackMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: language === 'te'
          ? "క్షమించండి, సర్వర్ స్పందించడం లేదు. మీ లక్షణాలు తీవ్రంగా ఉంటే దయచేసి వెంటనే సమీపంలోని ఆసుపత్రికి వెళ్ళండి లేదా 108 కు కాల్ చేయండి."
          : "Educational Guide note: Symptoms should always be reviewed by a licensed clinician. If you are experiencing sudden, severe discomfort or chest pain, seek immediate emergency care.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-wider uppercase font-mono">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Educational Symptom Guidance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {language === 'te' ? 'మెడిగైడ్ హెల్త్ అసిస్టెంట్' : 'MediGuide Health Assistant'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {language === 'te'
              ? 'సరళమైన ప్రశ్నల ద్వారా మీ ఆరోగ్య సంకేతాలను అర్థం చేసుకోండి మరియు తగిన సూచనలు పొందండి.'
              : 'Evaluate symptoms in clear steps, spot critical warning signs, or discuss health terms.'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs font-medium self-stretch sm:self-auto">
          <button
            onClick={() => setActiveMode('guided')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeMode === 'guided'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'లక్షణాల ప్రశ్నావళి' : 'Guided Questionnaire'}</span>
          </button>
          <button
            onClick={() => setActiveMode('ai_chat')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeMode === 'ai_chat'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'AI మార్గదర్శి సంభాషణ' : 'Ask AI Health Guide'}</span>
          </button>
        </div>
      </div>

      {/* Guided Questionnaire Mode */}
      {activeMode === 'guided' ? (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md">
          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono flex items-center justify-center font-bold">
                    {step}
                  </span>
                  <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                    {language === 'te' ? `దశ ${step} / 4` : `Step ${step} of 4`}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 w-8 rounded-full transition-all ${
                        s <= step ? 'bg-cyan-400' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Affected Body Area */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {language === 'te' ? '1. ఏ శరీర భాగంలో సమస్య ఉంది?' : '1. Which area of the body is primarily affected?'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {language === 'te'
                      ? 'మీకు అసౌకర్యం లేదా లక్షణాలు ఉన్న శరీర భాగాన్ని ఎంచుకోండి.'
                      : 'Select the primary anatomical zone where your symptoms are localized.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {BODY_REGIONS.map((region) => {
                      const isSelected = selectedRegion === region.id;
                      return (
                        <button
                          key={region.id}
                          type="button"
                          onClick={() => setSelectedRegion(region.id)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white'
                              : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="font-semibold text-sm">{region.label[language]}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>{language === 'te' ? 'తదుపరి దశ' : 'Continue to Details'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Symptom Description & Duration */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {language === 'te' ? '2. మీ లక్షణాన్ని వివరించండి' : '2. Describe your symptom and how long it has lasted'}
                  </h3>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      {language === 'te' ? 'లక్షణం ఏమిటి? (ఉదా: తలనొప్పి, కడుపుబ్బరం, అలసట)' : 'What symptom are you experiencing? (e.g. sharp headache, abdominal bloating, fatigue)'}
                    </label>
                    <textarea
                      value={symptomText}
                      onChange={(e) => setSymptomText(e.target.value)}
                      placeholder={language === 'te' ? 'మీ లక్షణాన్ని ఇక్కడ రాయండి...' : 'Type your symptoms in plain words...'}
                      rows={3}
                      className="w-full p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      {language === 'te' ? 'ఎంత కాలంగా ఈ లక్షణం ఉంది?' : 'How long have you had this symptom?'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {DURATION_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDuration(opt.id)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all ${
                            duration === opt.id
                              ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                              : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt.label[language]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                    >
                      {language === 'te' ? 'వెనుకకు' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-2"
                    >
                      <span>{language === 'te' ? 'తీవ్రతను ఎంచుకోండి' : 'Rate Severity'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Severity Rating */}
              {step === 3 && (
                <div className="space-y-5">
                  <h3 className="text-base sm:text-lg font-semibold text-white">
                    {language === 'te' ? '3. నొప్పి లేదా లక్షణం తీవ్రత ఎంత?' : '3. How severe is the symptom?'}
                  </h3>

                  <div className="space-y-3">
                    {SEVERITY_LEVELS.map((lvl) => {
                      const isSelected = severity === lvl.id;
                      return (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => setSeverity(lvl.id)}
                          className={`w-full p-4 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-slate-950/80 border-cyan-500 shadow-sm'
                              : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className={`font-semibold text-sm ${lvl.color}`}>
                            {lvl.id.toUpperCase()}: {lvl.label[language]}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/70 text-xs text-slate-400 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      {language === 'te'
                        ? 'తేలికపాటి లక్షణాలు సాధారణంగా విశ్రాంతితో తగ్గుతాయి. తీవ్రమైన మరియు ఆకస్మిక లక్షణాలకు వెంటనే వైద్యుల పరిశీలన అవసరం.'
                        : 'Mild symptoms can often be tracked for a short period, whereas severe or incapacitating pain should never be ignored.'}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                    >
                      {language === 'te' ? 'వెనుకకు' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs flex items-center gap-2"
                    >
                      <span>{language === 'te' ? 'అత్యవసర తనిఖీ' : 'Check Red Flags'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Red Flag Screen */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50">
                    <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                      <AlertOctagon className="w-5 h-5 text-rose-400" />
                      <span>{language === 'te' ? '4. అత్యవసర హెచ్చరిక లక్షణాలు ఏమైనా ఉన్నాయా?' : '4. Critical Warning Signs / Red-Flag Check'}</span>
                    </h3>
                    <p className="text-xs text-rose-200 mt-1">
                      {language === 'te'
                        ? 'క్రింది వాటిలో ఏవైనా లక్షణాలు ఉంటే టిక్ చేయండి. ఇవి తక్షణ అత్యవసర వైద్య సంరక్షణ అవసరమైన సంకేతాలు.'
                        : 'Please select any of the following if present. These symptoms require immediate clinical care rather than waiting.'}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {RED_FLAGS.map((rf) => {
                      const isChecked = selectedRedFlags.includes(rf.id);
                      return (
                        <label
                          key={rf.id}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-rose-950/40 border-rose-500/80 text-white'
                              : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleRedFlag(rf.id)}
                            className="w-4 h-4 rounded text-rose-500 focus:ring-rose-400 border-slate-700 bg-slate-900"
                          />
                          <span className="text-xs sm:text-sm font-medium">{rf.label[language]}</span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex justify-between pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                    >
                      {language === 'te' ? 'వెనుకకు' : 'Back'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(true)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg"
                    >
                      <span>{language === 'te' ? 'మార్గదర్శకత్వాన్ని పొందండి' : 'Generate Educational Guidance'}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Educational Guidance Summary Output */
            <div className="space-y-6">
              {/* Emergency Banner if Red Flags or Severe */}
              {hasUrgentFlags ? (
                <div className="p-5 rounded-xl bg-rose-950/50 border-2 border-rose-600/80 text-rose-100 space-y-3">
                  <div className="flex items-center gap-2.5 text-rose-400 font-bold text-base">
                    <AlertTriangle className="w-6 h-6 animate-pulse" />
                    <span>
                      {language === 'te'
                        ? 'అత్యవసర వైద్య పరిశీలన అవసరం!'
                        : 'URGENT: Immediate Medical Evaluation Advised'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-200 leading-relaxed">
                    {language === 'te'
                      ? 'మీరు పేర్కొన్న తీవ్రమైన లక్షణాలు లేదా హెచ్చరిక సంకేతాలు తక్షణ అత్యవసర సహాయం అవసరమైనవి కావచ్చు. ఏమాత్రం ఆలస్యం చేయకుండా అత్యవసర విభాగానికి వెళ్ళండి.'
                      : 'Based on your reported high-severity or red-flag symptoms, do not delay seeking immediate clinical assessment at the nearest emergency department or call emergency ambulance services.'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="tel:108"
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{language === 'te' ? '108 అత్యవసర సేవలకు కాల్ చేయండి' : 'Call 108 Emergency Ambulance'}</span>
                    </a>
                    {onNavigateToEmergency && (
                      <button
                        onClick={onNavigateToEmergency}
                        className="px-4 py-2 bg-slate-900 border border-rose-500/50 hover:bg-rose-950/50 text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        {language === 'te' ? 'సమీప ఆసుపత్రులను చూడండి' : 'Find Nearest Emergency Centers'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-200 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div className="text-xs">
                    <strong>{language === 'te' ? 'సాధారణ విద్యా విశ్లేషణ: ' : 'Routine Educational Guidance: '}</strong>
                    {language === 'te'
                      ? 'ప్రస్తుతం అత్యవసర సంకేతాలు గుర్తించబడలేదు. అయితే లక్షణాలు కొనసాగితే వైద్యుడిని సంప్రదించండి.'
                      : 'No immediate red-flag indicators detected in your selection. Consult a physician if symptoms do not resolve naturally.'}
                  </div>
                </div>
              )}

              {/* Educational Possibilities & General Causes */}
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400">
                  {language === 'te' ? 'సాధారణ కారణాలు (వైద్య నిర్ధారణ కాదు)' : 'General Educational Insights (Not a Medical Diagnosis)'}
                </h4>
                <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                  <p>
                    {language === 'te'
                      ? `మీరు ఎంచుకున్న శరీర భాగం మరియు లక్షణాల ఆధారంగా (${symptomText || 'లక్షణం'}), ఇవి తేలికపాటి తాత్కాలిక సమస్యలు, జీవక్రియ హెచ్చుతగ్గులు, కండరాల ఒత్తిడి లేదా ఇన్ఫెక్షన్ల వల్ల సంభవించవచ్చు.`
                      : `Symptoms localized to the selected region (${selectedRegion.replace('_', ' ')}: "${symptomText || 'general discomfort'}") can stem from a wide range of factors, including transient inflammation, physiological stress, metabolic changes, or localized muscular strain.`}
                  </p>
                  <p className="text-slate-400 text-[11px] italic">
                    {language === 'te'
                      ? '* గమనిక: ఏ AI సాధనం కూడా నేరుగా వ్యాధులను నిర్ధారించలేదు లేదా మందులను సూచించలేదు.'
                      : '* Note: Online tools cannot replace clinical palpation, laboratory blood tests, or diagnostic imaging performed by a licensed physician.'}
                  </p>
                </div>
              </div>

              {/* Questions to Discuss with your Healthcare Provider */}
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400">
                  {language === 'te' ? 'మీ వైద్యుడితో చర్చించవలసిన ముఖ్యమైన ప్రశ్నలు' : 'Recommended Questions to Ask Your Doctor'}
                </h4>
                <ul className="text-xs text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{language === 'te' ? 'ఈ లక్షణాల ఖచ్చితమైన మూలకారణాన్ని తెలుసుకోవడానికి ఏ నిర్దిష్ట పరీక్షలు (రక్త పరీక్షలు, స్కానింగ్) అవసరం?' : 'What diagnostic tests (e.g. CBC, metabolic panel, or imaging) would you recommend to clarify the cause?'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{language === 'te' ? 'ఈ సమస్యను నివారించడానికి జీవనశైలి లేదా ఆహారంలో ఎలాంటి మార్పులు చేయాలి?' : 'Are there non-pharmacological dietary or ergonomic modifications that can support recovery?'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{language === 'te' ? 'ఎంత సమయం వరకు లక్షణాలు తగ్గకపోతే మిమ్మల్ని మళ్ళీ సంప్రదించాలి?' : 'Over what timeframe should I expect improvement before coming in for follow-up evaluation?'}</span>
                  </li>
                </ul>
              </div>

              {/* Reset / Start Over */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'మళ్ళీ ప్రారంభించండి' : 'Start New Assessment'}</span>
                </button>

                {onNavigateToArticle && (
                  <button
                    type="button"
                    onClick={() => onNavigateToArticle('art-medical-tests-explained')}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'te' ? 'వైద్య పరీక్షల గైడ్ చదవండి' : 'Read Medical Tests Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Interactive AI Chat Mode (Connected to /api/chat) */
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col h-[520px]">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 mb-4">
            {chatMessages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    isAssistant ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isAssistant
                        ? msg.isUrgent
                          ? 'bg-rose-950/50 border border-rose-600/80 text-rose-100'
                          : 'bg-slate-950/80 border border-slate-800 text-slate-200'
                        : 'bg-cyan-600 text-white rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                    <div className="text-[10px] text-slate-500 text-right mt-1.5 font-mono">
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isAiLoading && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 p-2 font-mono">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>{language === 'te' ? 'పరిశీలిస్తోంది...' : 'Reviewing medical education sources...'}</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-3 border-t border-slate-800">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={
                language === 'te'
                  ? 'ఆరోగ్య విద్య ప్రశ్నను ఇక్కడ అడగండి...'
                  : 'Ask about symptoms, medical terms, or lab tests (English or Telugu)...'
              }
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isAiLoading || !chatInput.trim()}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0"
            >
              <span>{language === 'te' ? 'పంపండి' : 'Send'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
