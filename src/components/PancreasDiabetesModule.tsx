import React, { useState } from 'react';
import { Language } from '../types/health';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Copy,
  FileText,
  HelpCircle,
  Microscope,
  Stethoscope
} from 'lucide-react';

interface PancreasDiabetesModuleProps {
  language: Language;
  onNavigateToArticle?: (articleId: string) => void;
}

const MEDICAL_TESTS = [
  {
    name: 'HbA1c (Glycated Hemoglobin)',
    type: 'Blood Test',
    summary: 'Measures the percentage of your red blood cells that have glucose-coated hemoglobin.',
    whatItTellsYou: 'Reflects your 2 to 3 month weighted average blood sugar level (Normal: < 5.7%, Prediabetes: 5.7–6.4%, Diabetes: ≥ 6.5%).',
    whatItCannotTellYou: 'Does not show day-to-day acute blood glucose spikes or rapid low-sugar hypoglycemia events.'
  },
  {
    name: 'Fasting Plasma Glucose (FPG)',
    type: 'Blood Test (8-hour fast)',
    summary: 'Measures baseline circulating blood sugar after an overnight fast.',
    whatItTellsYou: 'Assesses whether baseline hepatic glucose output is appropriately regulated by basal insulin (Normal: 70–99 mg/dL).',
    whatItCannotTellYou: 'Cannot show how your body handles post-meal sugar surges or long-term glycemic trends.'
  },
  {
    name: 'Serum Lipase & Amylase',
    type: 'Blood Test',
    summary: 'Measures concentrations of pancreatic digestive enzymes that leak into the bloodstream when tissue is damaged.',
    whatItTellsYou: 'Lipase elevated to 3 times or more above the upper reference limit strongly indicates acute pancreatitis.',
    whatItCannotTellYou: 'Cannot distinguish the underlying cause (e.g. gallstones vs alcohol) and does not quantify the percentage of permanent chronic tissue scarring.'
  },
  {
    name: 'Abdominal Ultrasound & Contrast CT / MRI',
    type: 'Diagnostic Imaging',
    summary: 'Non-invasive imaging modalities visualizing pancreatic parenchyma, pancreatic duct dilation, cysts, and gallstones.',
    whatItTellsYou: 'Detects structural enlargement, pseudocysts, calcifications, necrosis, and biliary duct blockages.',
    whatItCannotTellYou: 'Does not directly measure microscopic endocrine hormonal function or insulin secretion capacity.'
  }
];

export const PancreasDiabetesModule: React.FC<PancreasDiabetesModuleProps> = ({
  language,
  onNavigateToArticle
}) => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'conditions' | 'tests' | 'doctor_checklist'>('anatomy');
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  const sampleDoctorQuestions = [
    'Based on my latest HbA1c and fasting blood sugar, what are my individualized glycemic targets?',
    'Should I be screened for pancreatic enzyme insufficiency or gallbladder micro-stones given my digestive symptoms?',
    'How do my daily nutrition, physical activity, and sleep patterns influence my insulin sensitivity?',
    'What specific warning signs (such as persistent upper abdominal pain or sudden unexplainable weight change) require immediate clinical re-evaluation?'
  ];

  const handleCopyQuestions = () => {
    navigator.clipboard.writeText(sampleDoctorQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n'));
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5" />
          <span>Endocrine & Metabolic Literacy</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {language === 'te' ? 'క్లోమము మరియు మధుమేహ ఆరోగ్యం' : 'Pancreas Health & Diabetes Education'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {language === 'te'
                ? 'క్లోమము విధులు, ఇన్సులిన్ పనితీరు, టైప్ 1 మరియు టైప్ 2 మధుమేహం, క్లోమశోథ (Pancreatitis) మరియు వైద్య పరీక్షల సరళమైన వివరణ.'
                : 'Understand pancreatic architecture, insulin-glucose regulation, diagnostic tests (HbA1c, Lipase, Imaging), and prepared questions for your doctor.'}
            </p>
          </div>

          {onNavigateToArticle && (
            <button
              onClick={() => onNavigateToArticle('art-pancreas-diabetes')}
              className="px-4 py-2 rounded-xl bg-cyan-950/60 border border-cyan-800 text-cyan-300 hover:text-white text-xs font-medium transition-colors whitespace-nowrap"
            >
              {language === 'te' ? 'పూర్తి వ్యాసం చదవండి' : 'Read Full Clinical Article'}
            </button>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 pt-3 border-t border-slate-800 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('anatomy')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'anatomy' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'te' ? 'క్లోమము & ఇన్సులిన్ విధులు' : 'Pancreas & Insulin Biology'}
          </button>
          <button
            onClick={() => setActiveTab('conditions')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'conditions' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'te' ? 'డయాబెటిస్ & ప్యాంక్రియాటైటిస్' : 'Diabetes vs Pancreatitis'}
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'tests' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'వైద్య పరీక్షల వివరణ' : 'Medical Tests Explained'}</span>
          </button>
          <button
            onClick={() => setActiveTab('doctor_checklist')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'doctor_checklist' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'వైద్యుని కోసం ప్రశ్నలు' : 'Questions for Your Doctor'}</span>
          </button>
        </div>
      </div>

      {/* Acute Pancreatitis Warning Banner */}
      <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
        <div className="text-xs text-rose-200 leading-relaxed">
          <strong className="text-white uppercase font-mono tracking-wider">
            {language === 'te' ? 'అత్యవసర హెచ్చరిక: ' : 'Critical Pancreatic Warning: '}
          </strong>
          {language === 'te'
            ? 'కడుపు పైభాగంలో ప్రారంభమై వీపు వైపు వ్యాపించే తీవ్రమైన మరియు నిరంతర నొప్పి, వాంతులు మరియు జ్వరం ఉంటే తక్షణమే అత్యవసర విభాగానికి వెళ్ళండి. ఇది అక్యూట్ ప్యాంక్రియాటైటిస్ సంకేతం కావచ్చు.'
            : 'Sudden, severe, unremitting upper abdominal pain radiating to the back accompanied by persistent vomiting or fever requires emergency clinical care. Do not wait for symptoms to subside.'}
        </div>
      </div>

      {/* Tab 1: Anatomy & Insulin */}
      {activeTab === 'anatomy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Dual Functional Architecture</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The pancreas is an elongated organ nestled in the "C-loop" of the duodenum behind the stomach. It operates with two synchronized systems:
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-cyan-300">1. Exocrine Gland (95% of tissue):</strong> Synthesizes digestive juice containing alkaline bicarbonate and enzymes (Amylase for carbs, Lipase for dietary fats, Proteases for proteins) to neutralize gastric acid.
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <strong className="text-teal-300">2. Endocrine Islets (Islets of Langerhans):</strong> Synthesizes vital hormones directly into bloodstream. Beta cells release <em>Insulin</em> to lower blood sugar; Alpha cells release <em>Glucagon</em> to raise blood sugar when fasting.
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>How Insulin Regulates Blood Glucose</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When carbohydrates are digested into simple glucose in the gut, blood sugar rises. In response, beta cells secrete insulin, which functions like a molecular key:
            </p>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Cellular Entry:</strong> Insulin binds to tyrosine kinase cell receptors, translocating GLUT4 glucose transporters to cell surfaces to allow energy uptake.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Glycogen Storage:</strong> Directs liver and skeletal muscle cells to store surplus glucose as glycogen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Inhibits Lipolysis:</strong> Signals fat cells to store fatty acids, preventing premature fat breakdown into ketone bodies.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Diabetes vs Pancreatitis */}
      {activeTab === 'conditions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono uppercase text-cyan-400">Autoimmune</span>
            <h4 className="text-base font-bold text-white">Type 1 Diabetes</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Occurs when the immune system mistakenly attacks pancreatic beta cells, causing absolute insulin deficiency.
            </p>
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <strong>Management:</strong> Exogenous insulin replacement (multiple daily injections or insulin pump) and continuous glucose monitoring.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono uppercase text-teal-400">Metabolic</span>
            <h4 className="text-base font-bold text-white">Type 2 Diabetes</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cells become progressively resistant to insulin, forcing the pancreas to produce more until beta cell exhaustion occurs.
            </p>
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <strong>Management:</strong> Nutrition, aerobic and strength exercise, oral insulin-sensitizing agents, GLP-1 agonists, and insulin when indicated.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono uppercase text-rose-400">Inflammatory</span>
            <h4 className="text-base font-bold text-white">Pancreatitis & EPI</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Premature activation of digestive enzymes inside the pancreas itself causing auto-digestion. Gallstones and heavy alcohol are primary triggers.
            </p>
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <strong>Management:</strong> Hospitalization, intravenous hydration, pain control, enzyme replacement therapy (PERT) for EPI.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Medical Tests Demystified */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEDICAL_TESTS.map((test, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">{test.name}</h4>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    {test.type}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{test.summary}</p>
                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-emerald-200">
                    <strong className="text-emerald-400">What it tells you: </strong>
                    {test.whatItTellsYou}
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/30 text-amber-200">
                    <strong className="text-amber-400">What it CANNOT tell you: </strong>
                    {test.whatItCannotTellYou}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Questions for Your Doctor */}
      {activeTab === 'doctor_checklist' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-cyan-400" />
                <span>Doctor Consultation Checklist</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Take these structured questions to your next appointment with your primary physician or endocrinologist.
              </p>
            </div>
            <button
              onClick={handleCopyQuestions}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            >
              {copiedChecklist ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedChecklist ? 'Copied to Clipboard!' : 'Copy Checklist'}</span>
            </button>
          </div>

          <div className="space-y-2.5 pt-2">
            {sampleDoctorQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-200"
              >
                <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 font-mono flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
