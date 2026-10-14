import React from 'react';
import { Language, TextSize } from '../types/health';
import { Bell, Eye, Globe, Sliders, Type } from 'lucide-react';

interface SettingsViewProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  textSize: TextSize;
  onTextSizeChange: (size: TextSize) => void;
  highContrast: boolean;
  onHighContrastToggle: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  language,
  onLanguageChange,
  textSize,
  onTextSizeChange,
  highContrast,
  onHighContrastToggle
}) => {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Personalization</span>
        <h2 className="text-2xl font-bold text-white">
          {language === 'te' ? 'అనువర్తన సెట్టింగ్‌లు' : 'Platform & Accessibility Settings'}
        </h2>
        <p className="text-xs text-slate-400">
          {language === 'te'
            ? 'అక్షరాల పరిమాణం, అధిక కాంట్రాస్ట్ మరియు భాష ప్రాధాన్యతలను మార్చుకోండి.'
            : 'Configure font legibility, contrast preferences, and system language.'}
        </p>
      </div>

      {/* Language Preference */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>Language (భాష)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              language === 'en'
                ? 'bg-cyan-950/40 border-cyan-500 text-white font-medium shadow-sm'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-semibold text-cyan-300">English</div>
            <div className="text-[11px] text-slate-400 mt-0.5">International English</div>
          </button>

          <button
            type="button"
            onClick={() => onLanguageChange('te')}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              language === 'te'
                ? 'bg-cyan-950/40 border-cyan-500 text-white font-medium shadow-sm'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-semibold text-cyan-300">తెలుగు (Telugu)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">ప్రాంతీయ భాషా మార్గదర్శి</div>
          </button>
        </div>
      </div>

      {/* Accessibility: Text Size & Contrast */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Type className="w-4 h-4 text-cyan-400" />
          <span>Accessibility & Visual Ergonomics</span>
        </h3>

        {/* Text Size Controls */}
        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Display Text Scale</label>
          <div className="flex items-center gap-2">
            {[
              { id: 'normal', label: 'Default (100%)', sample: 'A' },
              { id: 'large', label: 'Large (115%)', sample: 'A+' },
              { id: 'xlarge', label: 'Extra Large (130%)', sample: 'A++' }
            ].map((ts) => (
              <button
                key={ts.id}
                type="button"
                onClick={() => onTextSizeChange(ts.id as TextSize)}
                className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                  textSize === ts.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {ts.label}
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast Toggle */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-white">Enhanced Contrast Mode</div>
            <div className="text-[11px] text-slate-400">Boosts element borders and typography contrast for high legibility.</div>
          </div>
          <button
            type="button"
            onClick={onHighContrastToggle}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              highContrast
                ? 'bg-cyan-600 text-white border-cyan-500'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {highContrast ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
};
