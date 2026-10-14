import React from 'react';
import { Language, UserRole } from '../types/health';
import { UI_TEXT } from '../data/translations';
import { DnaCanvas } from './DnaCanvas';
import {
  Activity,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Droplet,
  Heart,
  Hospital,
  Layers,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users
} from 'lucide-react';

interface DashboardHomeProps {
  language: Language;
  onNavigate: (page: string, params?: any) => void;
  currentRole: UserRole;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  language,
  onNavigate,
  currentRole
}) => {
  const t = UI_TEXT[language];

  return (
    <div className="space-y-8">
      {/* Hero Section: Futuristic DNA Banner & Interactive Stage */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 shadow-2xl">
        {/* Ambient Top Glow and Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center relative z-10">
          {/* Hero Left Content */}
          <div className="p-6 sm:p-10 lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Next-Gen Healthcare Education</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Human-Centered AI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* Quick Action Highlights */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('assistant')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Stethoscope className="w-4 h-4" />
                <span>{language === 'te' ? 'లక్షణాల విశ్లేషణ ప్రారంభించండి' : 'Start Symptom Guidance'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('body_explorer')}
                className="px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>{language === 'te' ? 'శరీర అవయవాలను అన్వేషించండి' : 'Explore Human Body'}</span>
              </button>
            </div>

            {/* Safety & Educational Badge */}
            <div className="pt-3 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.educationalDisclaimer}</span>
            </div>
          </div>

          {/* Hero Right: Interactive 3D Glowing DNA Canvas / Imagery */}
          <div className="lg:col-span-5 h-64 sm:h-80 lg:h-96 relative flex items-center justify-center p-4">
            {/* Background Medical Visual Asset */}
            <img
              src="/src/assets/images/hero_dna_medical_1791968618082.jpg"
              alt="Futuristic Holographic DNA Double-Helix in Medical Laboratory"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-screen"
              referrerPolicy="no-referrer"
            />
            {/* Real-time Canvas Double Helix Overlay */}
            <div className="relative z-10 w-full h-full">
              <DnaCanvas interactive={true} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3 Prominent Action Cards (Required in Section 3C) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Understand My Symptoms */}
        <div
          onClick={() => onNavigate('assistant')}
          className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-900/90 transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {t.actionSymptomsTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.actionSymptomsDesc}
            </p>
          </div>
          <div className="text-xs text-cyan-400 font-medium flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
            <span>{language === 'te' ? 'మార్గదర్శి తెరవండి' : 'Launch Symptom Assistant'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Explore the Human Body */}
        <div
          onClick={() => onNavigate('body_explorer')}
          className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-teal-500/60 hover:bg-slate-900/90 transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-800/80 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
              {t.actionBodyTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.actionBodyDesc}
            </p>
          </div>
          <div className="text-xs text-teal-400 font-medium flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
            <span>{language === 'te' ? 'అవయవాల మ్యాప్ చూడండి' : 'Open Anatomical Visualizer'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Find Blood Donors / Donation Services */}
        <div
          onClick={() => onNavigate('donor_connect')}
          className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-rose-500/60 hover:bg-slate-900/90 transition-all cursor-pointer group shadow-lg flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-950 border border-rose-800/80 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <Droplet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
              {t.actionDonorTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.actionDonorDesc}
            </p>
          </div>
          <div className="text-xs text-rose-400 font-medium flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
            <span>{language === 'te' ? 'రక్తదాత నెట్‌వర్క్' : 'View Verified Requests'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Domain Modules Spotlight Grid (Women's Health, Pancreas/Diabetes, Health Library, Medical Services) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            {language === 'te' ? 'ప్రత్యేక ఆరోగ్య విభాగాలు' : 'Specialized Healthcare Modules'}
          </h2>
          <span className="text-xs font-mono text-cyan-400">
            Evidence-Based Literacy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Women's Health Spotlight */}
          <div
            onClick={() => onNavigate('womens_health')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-950 border border-violet-800 text-violet-400 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                  {language === 'te' ? 'మహిళల ఆరోగ్యం & హార్మోన్లు' : "Women's Health & Endocrine Education"}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Menstrual cycle phases, private cycle estimation, PCOS vs thyroid distinguishing factors, and pregnancy warning signs.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-violet-400 pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">Private & Local Storage Only</span>
              <span className="font-semibold flex items-center gap-1">Explore Module →</span>
            </div>
          </div>

          {/* Pancreas & Diabetes Spotlight */}
          <div
            onClick={() => onNavigate('pancreas_diabetes')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {language === 'te' ? 'క్లోమం మరియు మధుమేహం' : 'Pancreas Health & Diabetes Diagnostics'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Insulin mechanisms, HbA1c & Lipase lab test interpretations, acute pancreatitis emergency signs, and doctor checklists.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-cyan-400 pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">Clinical Test Guide</span>
              <span className="font-semibold flex items-center gap-1">Explore Module →</span>
            </div>
          </div>

          {/* Organ & Tissue Donation Spotlight */}
          <div
            onClick={() => onNavigate('organ_donation')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/40 hover:bg-slate-900/80 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 text-teal-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  {language === 'te' ? 'అవయవ & కణజాల దానం' : 'Organ, Cornea & Stem Cell Donation'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Learn about brain death vs circulatory donation, cornea banking in 6 hours, DATRI stem cells, and NOTTO official registry access.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-teal-400 pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">Official NOTTO Alignment</span>
              <span className="font-semibold flex items-center gap-1">Explore Module →</span>
            </div>
          </div>

          {/* Hospitals & Blood Banks Spotlight */}
          <div
            onClick={() => onNavigate('hospitals')}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 hover:bg-slate-900/80 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800 text-rose-400 flex items-center justify-center shrink-0">
                <Hospital className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                  {language === 'te' ? 'ఆసుపత్రులు & బ్లడ్ బ్యాంకులు' : 'Find Hospitals & 24/7 Trauma Centers'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Locate verified hospitals, licensed blood transfusion banks, and direct emergency hotline connections across cities and PIN codes.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-rose-400 pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">Verified Emergency Desk</span>
              <span className="font-semibold flex items-center gap-1">View Directory →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
