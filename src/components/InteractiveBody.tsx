import React, { useState } from 'react';
import { ORGANS_DATA } from '../data/organsData';
import { OrganInfo, Language } from '../types/health';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Info,
  Layers,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface InteractiveBodyProps {
  language: Language;
  onNavigateToArticle?: (articleId: string) => void;
}

export const InteractiveBody: React.FC<InteractiveBodyProps> = ({
  language,
  onNavigateToArticle
}) => {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedOrgan, setSelectedOrgan] = useState<OrganInfo>(ORGANS_DATA[0]);
  const [activeTab, setActiveTab] = useState<'visual' | 'textual'>('visual');
  const [hoveredOrganId, setHoveredOrganId] = useState<string | null>(null);

  const t = language;

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs tracking-wider uppercase font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>Anatomical Systems Explorer</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {language === 'te' ? 'మానవ శరీర అవయవాల అన్వేషణ' : 'Interactive Human Body Explorer'}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {language === 'te'
              ? 'ముందు మరియు వెనుక శరీర భాగాలపై నొక్కి అవయవాలు, లక్షణాలు మరియు జాగ్రత్తలను తెలుసుకోండి.'
              : 'Select body regions to examine vital organs, homeostatic functions, and clinical warning signs.'}
          </p>
        </div>

        {/* View Toggle and Accessibility Mode */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          {/* Visual / Accessible Text View */}
          <div className="flex items-center p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'visual' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'చిత్ర రూపం' : 'Visual Mode'}</span>
            </button>
            <button
              onClick={() => setActiveTab('textual')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'textual' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'జాబితా రూపం' : 'Accessible List'}</span>
            </button>
          </div>

          {activeTab === 'visual' && (
            <div className="flex items-center p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setView('front')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  view === 'front' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {language === 'te' ? 'ముందు భాగం (Front)' : 'Anterior (Front)'}
              </button>
              <button
                onClick={() => setView('back')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  view === 'back' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {language === 'te' ? 'వెనుక భాగం (Back)' : 'Posterior (Back)'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Explorer Area */}
      {activeTab === 'visual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Center: Interactive SVG Body Canvas */}
          <div className="lg:col-span-6 xl:col-span-5 p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col items-center relative overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {/* View Badge */}
            <div className="flex items-center justify-between w-full mb-3 z-10 text-xs text-slate-400">
              <span className="font-mono uppercase tracking-wider text-cyan-400">
                {view === 'front' ? 'Anterior Perspective' : 'Posterior Perspective'}
              </span>
              <button
                onClick={() => setView(view === 'front' ? 'back' : 'front')}
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors py-1 px-2 rounded bg-slate-900 border border-slate-800"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'te' ? 'భాగం మార్చండి' : 'Flip View'}</span>
              </button>
            </div>

            {/* Anatomical Schematic SVG */}
            <div className="relative w-full max-w-[340px] aspect-[400/520] select-none z-10">
              <svg
                viewBox="0 0 400 520"
                className="w-full h-full filter drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                aria-label={`Human body anatomical model showing ${view} view`}
              >
                <defs>
                  <linearGradient id="bodyOutlineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
                  </linearGradient>
                  <radialGradient id="hotspotGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#0284c7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Silhouette Contours */}
                {/* Head */}
                <ellipse cx="200" cy="65" rx="34" ry="42" fill="#091528" stroke="url(#bodyOutlineGrad)" strokeWidth="1.5" />
                {/* Neck */}
                <path d="M 188 105 L 188 120 L 212 120 L 212 105 Z" fill="#091528" stroke="url(#bodyOutlineGrad)" strokeWidth="1.2" />
                {/* Torso & Shoulders */}
                <path
                  d="M 140 135 C 160 120 240 120 260 135 C 285 150 270 200 265 240 C 260 280 250 320 240 340 L 160 340 C 150 320 140 280 135 240 C 130 200 115 150 140 135 Z"
                  fill="#0c1a32"
                  stroke="url(#bodyOutlineGrad)"
                  strokeWidth="1.5"
                />
                {/* Arms */}
                <path
                  d="M 135 140 C 110 180 100 240 95 300 C 92 330 90 360 85 390 C 80 405 85 415 92 410 C 100 400 105 340 115 280 C 122 230 130 190 138 160"
                  fill="#081326"
                  stroke="url(#bodyOutlineGrad)"
                  strokeWidth="1.2"
                />
                <path
                  d="M 265 140 C 290 180 300 240 305 300 C 308 330 310 360 315 390 C 320 405 315 415 308 410 C 300 400 295 340 285 280 C 278 230 270 190 262 160"
                  fill="#081326"
                  stroke="url(#bodyOutlineGrad)"
                  strokeWidth="1.2"
                />
                {/* Pelvis & Legs */}
                <path
                  d="M 160 340 L 150 430 L 140 500 C 138 515 155 515 158 500 L 175 420 L 195 360 L 205 360 L 225 420 L 242 500 C 245 515 262 515 260 500 L 250 430 L 240 340 Z"
                  fill="#0c1a32"
                  stroke="url(#bodyOutlineGrad)"
                  strokeWidth="1.5"
                />

                {/* Sub-structures: Ribcage Wireframe Guide */}
                <path d="M 170 150 C 185 140 215 140 230 150" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                <path d="M 165 170 C 185 160 215 160 235 170" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                <path d="M 162 190 C 185 180 215 180 238 190" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                <path d="M 165 210 C 185 200 215 200 235 210" stroke="#1e3a5f" strokeWidth="1" strokeDasharray="3 3" fill="none" />

                {/* Spine on Back View */}
                {view === 'back' && (
                  <line x1="200" y1="110" x2="200" y2="340" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
                )}

                {/* Interactive Organ Hotspots */}
                {ORGANS_DATA.map((organ) => {
                  const coords = view === 'front' ? organ.coordinates.front : organ.coordinates.back;
                  if (!coords) return null;
                  const isSelected = selectedOrgan.id === organ.id;
                  const isHovered = hoveredOrganId === organ.id;

                  return (
                    <g
                      key={organ.id}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => setSelectedOrgan(organ)}
                      onMouseEnter={() => setHoveredOrganId(organ.id)}
                      onMouseLeave={() => setHoveredOrganId(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${organ.name[language]} hotspot`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedOrgan(organ);
                        }
                      }}
                    >
                      {/* Outer pulse when selected or hovered */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={coords.cx}
                          cy={coords.cy}
                          r={coords.r + 8}
                          fill="none"
                          stroke={isSelected ? '#00f2fe' : '#38bdf8'}
                          strokeWidth="1.5"
                          opacity={isSelected ? 0.8 : 0.4}
                          className="animate-pulse"
                        />
                      )}

                      {/* Main Glow Fill */}
                      <circle
                        cx={coords.cx}
                        cy={coords.cy}
                        r={coords.r}
                        fill={isSelected ? 'url(#hotspotGlow)' : isHovered ? 'rgba(56, 189, 248, 0.4)' : 'rgba(2, 132, 199, 0.25)'}
                        stroke={isSelected ? '#38bdf8' : isHovered ? '#06b6d4' : '#0369a1'}
                        strokeWidth={isSelected ? '2' : '1'}
                      />

                      {/* Hotspot Target Crosshair / Center Core */}
                      <circle
                        cx={coords.cx}
                        cy={coords.cy}
                        r="3.5"
                        fill={isSelected ? '#ffffff' : '#38bdf8'}
                      />

                      {/* Floating Tooltip Label on Hover/Selected */}
                      {(isSelected || isHovered) && (
                        <g>
                          <rect
                            x={coords.cx > 200 ? coords.cx - 120 : coords.cx + 15}
                            y={coords.cy - 12}
                            width="105"
                            height="24"
                            rx="4"
                            fill="#030712"
                            stroke="#0ea5e9"
                            strokeWidth="1"
                          />
                          <text
                            x={coords.cx > 200 ? coords.cx - 68 : coords.cx + 67}
                            y={coords.cy + 4}
                            fill="#e0f2fe"
                            fontSize="10"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {organ.name[language].split(' ')[0]}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Organ Selector Strip below diagram */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 z-10 w-full pt-3 border-t border-slate-800/80">
              {ORGANS_DATA.map((organ) => {
                const isSelected = selectedOrgan.id === organ.id;
                return (
                  <button
                    key={organ.id}
                    onClick={() => setSelectedOrgan(organ)}
                    className={`text-xs px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {organ.name[language]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Organ Information Panel */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-md">
              {/* Organ Title & Biological System */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono tracking-wider text-cyan-400 uppercase">
                    {selectedOrgan.system}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-0.5">
                    {selectedOrgan.name[t]}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedOrgan.location[t]}</span>
                  </p>
                </div>

                {selectedOrgan.relatedArticleId && (
                  <button
                    onClick={() => onNavigateToArticle?.(selectedOrgan.relatedArticleId!)}
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{language === 'te' ? 'వ్యాసం చదవండి' : 'Read Full Article'}</span>
                  </button>
                )}
              </div>

              {/* Function & Role */}
              <div className="mt-5 space-y-4">
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-1.5">
                    {language === 'te' ? 'ప్రధాన విధులు మరియు పాత్ర' : 'Physiological Function'}
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
                    {selectedOrgan.function[t]}
                  </p>
                </div>

                {/* Common Conditions */}
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">
                    {language === 'te' ? 'సాధారణ సమస్యలు మరియు పరిస్థితులు' : 'Common Clinical Conditions'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedOrgan.commonConditions[t].map((cond, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/30 border border-slate-800/60 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{cond}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prevention & Wellness Information */}
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{language === 'te' ? 'నివారణ మరియు ఆరోగ్య సూచనలు' : 'Prevention & Wellness Strategies'}</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedOrgan.prevention[t].map((tip, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 flex items-start gap-2 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/30"
                      >
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span className="leading-normal">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Urgent Warning Signs Box */}
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50">
                  <h4 className="text-xs uppercase font-mono tracking-wider text-rose-300 mb-2 flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{language === 'te' ? 'అత్యవసర హెచ్చరిక సంకేతాలు' : 'Urgent Warning Signs Requiring Prompt Evaluation'}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedOrgan.urgentSymptoms[t].map((symptom, idx) => (
                      <li key={idx} className="text-xs text-rose-200 flex items-start gap-2">
                        <span className="text-rose-400 font-bold shrink-0">!</span>
                        <span className="leading-normal">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Accessible Text-Based List Alternative (WCAG AA Compliance) */
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white">
              {language === 'te' ? 'అన్ని శరీర వ్యవస్థల వివరాల జాబితా' : 'Complete Anatomical Systems Directory (Screen Reader Accessible)'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {language === 'te'
                ? 'స్క్రీన్ రీడర్ల కోసం సులభంగా చదవగలిగే పూర్తి సమాచార జాబితా.'
                : 'Linear text breakdown designed for accessible navigation without graphical dependency.'}
            </p>
          </div>

          <div className="space-y-6">
            {ORGANS_DATA.map((organ) => (
              <div
                key={organ.id}
                className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      {organ.system}
                    </span>
                    <h4 className="text-lg font-semibold text-white">{organ.name[t]}</h4>
                  </div>
                  {organ.relatedArticleId && (
                    <button
                      onClick={() => onNavigateToArticle?.(organ.relatedArticleId!)}
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>{language === 'te' ? 'వ్యాసం' : 'Read Article'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-300">
                  <strong className="text-slate-100 font-medium">Location: </strong>
                  {organ.location[t]}
                </div>

                <div className="text-xs text-slate-300">
                  <strong className="text-slate-100 font-medium">Function: </strong>
                  {organ.function[t]}
                </div>

                <div>
                  <strong className="text-xs text-slate-100 font-medium">Common Conditions: </strong>
                  <span className="text-xs text-slate-400">
                    {organ.commonConditions[t].join(', ')}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 text-xs text-rose-200">
                  <strong className="text-rose-300">When to seek urgent evaluation: </strong>
                  {organ.urgentSymptoms[t].join(' | ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
