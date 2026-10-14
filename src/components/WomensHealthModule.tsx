import React, { useState, useEffect } from 'react';
import { Language } from '../types/health';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Heart,
  HelpCircle,
  Lock,
  Sparkles,
  Trash2
} from 'lucide-react';

interface WomensHealthModuleProps {
  language: Language;
  onNavigateToArticle?: (articleId: string) => void;
}

const CYCLE_PHASES = [
  {
    phase: 'Menstrual Phase (Days 1–5)',
    desc: {
      en: 'The uterine lining (endometrium) sheds as estrogen and progesterone levels decline.',
      te: 'ఈస్ట్రోజెన్ మరియు ప్రొజెస్టెరాన్ హార్మోన్ల స్థాయిలు తగ్గడంతో రక్తస్రావం జరుగుతుంది.'
    },
    hormoneFocus: 'Low Estrogen & Progesterone'
  },
  {
    phase: 'Follicular Phase (Days 1–13)',
    desc: {
      en: 'FSH (Follicle Stimulating Hormone) signals ovarian follicles to mature, gradually elevating estrogen.',
      te: 'అండాశయాల్లో అండం పరిపక్వం చెందడం మరియు ఈస్ట్రోజెన్ క్రమంగా పెరగడం ప్రారంభమవుతుంది.'
    },
    hormoneFocus: 'Rising Estrogen'
  },
  {
    phase: 'Ovulation Window (Around Day 14)',
    desc: {
      en: 'A rapid surge in Luteinizing Hormone (LH) triggers the release of a mature egg into the fallopian tube.',
      te: 'LH హార్మోన్ ఒక్కసారిగా పెరిగి పరిపక్వ అండం విడుదలవుతుంది.'
    },
    hormoneFocus: 'LH Surge Peak'
  },
  {
    phase: 'Luteal Phase (Days 15–28)',
    desc: {
      en: 'The ruptured follicle transforms into the corpus luteum, producing progesterone to prepare the uterus.',
      te: 'ప్రొజెస్టెరాన్ హార్మోన్ గర్భాశయ గోడలను సిద్ధం చేస్తుంది.'
    },
    hormoneFocus: 'High Progesterone'
  }
];

export const WomensHealthModule: React.FC<WomensHealthModuleProps> = ({
  language,
  onNavigateToArticle
}) => {
  const [activeTab, setActiveTab] = useState<'education' | 'cycle_tracker' | 'pcos_thyroid' | 'pregnancy'>('education');

  // Local-only optional period tracking state
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(() => {
    return localStorage.getItem('mg_cycle_last_date') || '';
  });
  const [cycleLengthDays, setCycleLengthDays] = useState<number>(() => {
    const val = localStorage.getItem('mg_cycle_length');
    return val ? parseInt(val, 10) : 28;
  });
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (lastPeriodDate) {
      localStorage.setItem('mg_cycle_last_date', lastPeriodDate);
      localStorage.setItem('mg_cycle_length', String(cycleLengthDays));
    }
  }, [lastPeriodDate, cycleLengthDays]);

  const handleClearCycleData = () => {
    localStorage.removeItem('mg_cycle_last_date');
    localStorage.removeItem('mg_cycle_length');
    setLastPeriodDate('');
    setCycleLengthDays(28);
    setIsSaved(false);
  };

  // Projected next cycle estimate
  const nextEstimatedDate = lastPeriodDate
    ? (() => {
        const d = new Date(lastPeriodDate);
        d.setDate(d.getDate() + cycleLengthDays);
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      })()
    : null;

  return (
    <div className="space-y-6">
      {/* Header Banner with High-Fidelity Asset */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="p-6 md:col-span-7 z-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-cyan-400" />
              <span>Evidence-Based Healthcare Guidance</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {language === 'te' ? 'మహిళల ఆరోగ్యం మరియు హార్మోన్ల సమతుల్యత' : "Women's Health & Hormonal Wellness"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {language === 'te'
                ? 'ఋతుచక్రం, హార్మోన్ల మార్పులు, పిసిఒఎస్ (PCOS), థైరాయిడ్ ప్రభావాలు మరియు గర్భధారణ సంరక్షణపై గౌరవప్రదమైన మరియు సురక్షితమైన సమాచారం.'
                : 'A respectful, private educational guide demystifying menstrual cycles, endocrine pathways, PCOS awareness, thyroid connections, and pregnancy health.'}
            </p>
          </div>
          <div className="md:col-span-5 h-48 md:h-full relative overflow-hidden bg-slate-950">
            <img
              src="/src/assets/images/womens_health_wellness_1791968617976.jpg"
              alt="Artistic scientific diagram of female endocrine hormonal pathways"
              className="w-full h-full object-cover object-center opacity-80 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/90 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('education')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'education'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'te' ? 'ఋతుచక్రం మరియు హార్మోన్లు' : 'Menstrual Cycle & Hormones'}
          </button>
          <button
            onClick={() => setActiveTab('cycle_tracker')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'cycle_tracker'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'ఐచ్ఛిక సైకిల్ ట్రాకర్' : 'Private Cycle Estimator'}</span>
          </button>
          <button
            onClick={() => setActiveTab('pcos_thyroid')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'pcos_thyroid'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'te' ? 'PCOS & థైరాయిడ్ అవగాహన' : 'PCOS vs Thyroid Dynamics'}
          </button>
          <button
            onClick={() => setActiveTab('pregnancy')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'pregnancy'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'te' ? 'గర్భధారణ మరియు హెచ్చరికలు' : 'Pregnancy Signs & Red Flags'}
          </button>
        </div>
      </div>

      {/* Tab 1: Menstrual Cycle Education */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{language === 'te' ? 'ఋతుచక్రంలోని నాలుగు దశలు' : 'The Four Biological Phases of the Menstrual Cycle'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'te'
                ? 'ఒక మహిళ శరీరంలో జరిగే సహజమైన హార్మోన్ల మార్పులు శరీరాన్ని, శక్తిని మరియు మనస్సును ఎలా ప్రభావితం చేస్తాయో తెలుసుకోండి.'
                : 'The menstrual cycle is an orchestrated biofeedback feedback loop between the hypothalamus, pituitary gland, and ovaries.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {CYCLE_PHASES.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{p.phase}</span>
                    <span className="font-mono text-[11px] text-cyan-400">{p.hormoneFocus}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{p.desc[language]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* When to Consult a Clinician */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400">
              {language === 'te' ? 'వైద్యుడిని ఎప్పుడు సంప్రదించాలి?' : 'When to Consult an Obstetrician/Gynecologist'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{language === 'te' ? 'ఋతుక్రమం 90 రోజుల కంటే ఎక్కువ కాలం రాకపోవడం (గర్భవతి కానప్పుడు).' : 'Cycles absent for more than 90 days when not pregnant (secondary amenorrhea).'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{language === 'te' ? 'రక్తస్రావం 7 రోజుల కంటే ఎక్కువ కాలం నిరంతరంగా కొనసాగడం.' : 'Menstrual bleeding lasting continuously for more than 7 consecutive days.'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{language === 'te' ? 'తీవ్రమైన కడుపు నొప్పి మరియు రోజువారీ కార్యకలాపాలు చేయలేకపోవడం.' : 'Debilitating menstrual cramps (dysmenorrhea) unresponsive to simple over-the-counter analgesia.'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{language === 'te' ? 'రెండు ఋతుచక్రాల మధ్యలో అకారణంగా రక్తస్రావం కనిపించడం.' : 'Bleeding or spotting between scheduled menstrual periods or following intimacy.'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Optional Private Cycle Tracker */}
      {activeTab === 'cycle_tracker' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
          {/* Privacy Guarantee Notice */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3">
            <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs text-cyan-200">
              <strong className="text-white">{language === 'te' ? 'వ్యక్తిగత గోప్యతా హామీ: ' : 'Privacy Protection Guarantee: '}</strong>
              {language === 'te'
                ? 'మీరు నమోదు చేసే సమాచారం కేవలం మీ కంప్యూటర్/ఫోన్ బ్రౌజర్‌లో మాత్రమే ఉంటుంది (Local Storage). ఎలాంటి డేటా బయటకు పంపబడదు.'
                : 'This tracking tool operates strictly within your local browser storage. No reproductive data is transmitted to external servers or cloud accounts. You can delete it anytime below.'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  {language === 'te' ? 'చివరి పీరియడ్ ప్రారంభమైన తేదీ' : 'First Day of Last Menstrual Period'}
                </label>
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => {
                    setLastPeriodDate(e.target.value);
                    setIsSaved(true);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  {language === 'te' ? 'సగటు సైకిల్ రోజుల వ్యవధి (సాధారణంగా 28 రోజులు)' : 'Average Cycle Length (Days, usually 21–35)'}
                </label>
                <input
                  type="number"
                  min={21}
                  max={45}
                  value={cycleLengthDays}
                  onChange={(e) => {
                    setCycleLengthDays(parseInt(e.target.value, 10) || 28);
                    setIsSaved(true);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>

              {lastPeriodDate && (
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleClearCycleData}
                    className="px-3 py-2 rounded-lg bg-slate-950 border border-rose-900/40 text-rose-300 hover:bg-rose-950/40 text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'te' ? 'డేటాను తొలగించండి' : 'Clear My Stored Data'}</span>
                  </button>
                  {isSaved && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{language === 'te' ? 'సేవ్ చేయబడింది' : 'Saved to browser'}</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Projected Estimation Card */}
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {language === 'te' ? 'అంచనా తేదీ' : 'Educational Projection'}
                </span>
                <h4 className="text-lg font-bold text-white mt-1">
                  {language === 'te' ? 'తదుపరి పీరియడ్ అంచనా' : 'Estimated Next Cycle Window'}
                </h4>
                {nextEstimatedDate ? (
                  <div className="mt-4 p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60">
                    <div className="text-xs text-slate-400">{language === 'te' ? 'అంచనా ప్రారంభ తేదీ:' : 'Approximate Next Start:'}</div>
                    <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">{nextEstimatedDate}</div>
                    <div className="text-[11px] text-slate-400 mt-2">
                      {language === 'te'
                        ? 'ఈ అంచనా కేవలం క్యాలెండర్ లెక్కింపు మాత్రమే. ఒత్తిడి, నిద్ర మరియు ఆరోగ్యం వల్ల తేదీలు మారవచ్చు.'
                        : 'Calculated as Day 1 + Cycle Length. Physiological variations of ±3 to 5 days are medically normal.'}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-xs text-slate-400 italic">
                    {language === 'te'
                      ? 'అంచనాను చూడటానికి ఎడమవైపున మీ చివరి పీరియడ్ తేదీని నమోదు చేయండి.'
                      : 'Enter your last period start date on the left to view educational estimates.'}
                  </div>
                )}
              </div>

              <div className="mt-4 text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                {language === 'te'
                  ? '* గమనిక: సైకిల్ ట్రాకర్ గర్భనిరోధక సాధనం కాదు.'
                  : '* Note: Cycle calculators are not reliable contraceptive tools. Always consult a family planning specialist.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: PCOS vs Thyroid */}
      {activeTab === 'pcos_thyroid' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              {language === 'te' ? 'PCOS మరియు థైరాయిడ్ మధ్య వ్యత్యాసాలు' : 'Understanding PCOS vs Thyroid-Driven Irregularities'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'te'
                ? 'క్రమం తప్పిన పీరియడ్స్ చాలా కారణాల వల్ల సంభవించవచ్చు. లక్షణాల ఆధారంగా మాత్రమే నిర్ధారణ చేయలేము.'
                : 'Menstrual irregularity is a non-specific symptom that requires objective endocrine lab panels (TSH, free T4, Total Testosterone, LH/FSH ratio) rather than online guesswork.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PCOS Column */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-cyan-300">Polycystic Ovary Syndrome (PCOS)</h4>
                <span className="text-[11px] font-mono text-slate-400">Metabolic/Endocrine</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Core Triad (Rotterdam):</strong> Infrequent ovulation, elevated androgen markers (acne, excess facial/body hair), and polycystic morphology on pelvic ultrasound.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Metabolic Link:</strong> Strongly associated with cellular insulin resistance and metabolic syndrome.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Key Clinical Tests:</strong> Serum Free & Total Testosterone, DHEAS, Fasting Insulin, Pelvic Sonography.</span>
                </li>
              </ul>
            </div>

            {/* Thyroid Column */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-amber-300">Thyroid Hormone Dysregulation</h4>
                <span className="text-[11px] font-mono text-slate-400">Thyroid Gland (TSH)</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Hypothyroidism (Underactive):</strong> High TSH, sluggish metabolism, dry skin, fatigue, cold intolerance, heavy/frequent bleeding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Hyperthyroidism (Overactive):</strong> Low TSH, palpitations, unexpected weight loss, heat intolerance, scanty or skipped periods.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Key Clinical Tests:</strong> High-sensitivity Serum TSH, Free T3, Free T4, Anti-TPO antibodies.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Pregnancy Signs & Red Flags */}
      {activeTab === 'pregnancy' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              {language === 'te' ? 'గర్భధారణ సంరక్షణ మరియు అత్యవసర హెచ్చరికలు' : 'Pregnancy Health & Urgent Warning Signs'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'te'
                ? 'గర్భధారణ సమయంలో ఎలాంటి లక్షణాలు సాధారణమో మరియు ఏ లక్షణాలు తక్షణ వైద్య సహాయం అవసరమైనవో తెలుసుకోండి.'
                : 'Recognizing obstetric red flags enables early maternal and fetal protection.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60 space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{language === 'te' ? 'తక్షణ అత్యవసర వైద్య సంరక్షణ అవసరమైన సంకేతాలు' : 'Urgent Obstetric Symptoms Requiring Emergency Care'}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-rose-200">
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/40">
                <strong>Severe Preeclampsia Signs:</strong> Persistent unremitting headache, visual disturbances (spots or blurring), or severe upper right quadrant pain under ribs.
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/40">
                <strong>Vaginal Bleeding:</strong> Any bright red bleeding with or without severe cramping or tissue passage.
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/40">
                <strong>Sudden Fluid Leakage:</strong> Uncontrolled fluid gush before 37 weeks (premature rupture of membranes).
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/40">
                <strong>Reduced Fetal Movement:</strong> Noticeable decrease or cessation in usual fetal kicks/movements in the third trimester.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
