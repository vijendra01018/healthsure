import React from 'react';
import { Language, UserRole } from '../types/health';
import {
  AlertTriangle,
  Award,
  Bell,
  Clock,
  Droplet,
  ExternalLink,
  Hospital,
  PhoneCall,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface RightPanelProps {
  language: Language;
  currentRole: UserRole;
  onNavigate: (page: string) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  language,
  currentRole,
  onNavigate
}) => {
  return (
    <aside className="w-full xl:w-80 space-y-4">
      {/* 24/7 Immediate Emergency Action Banner */}
      <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-900/60 shadow-md space-y-2.5">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase font-mono tracking-wider">
          <PhoneCall className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>Immediate Emergency</span>
        </div>
        <p className="text-xs text-rose-200 leading-relaxed">
          For acute chest crushing pain, breathing arrest, or stroke signs:
        </p>
        <a
          href="tel:108"
          className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
        >
          <span>Dial 108 (India Ambulance)</span>
        </a>
      </div>

      {/* User Profile Card */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold text-xs font-mono">
              AS
            </div>
            <div>
              <div className="text-xs font-bold text-white">Arjun Sharma</div>
              <div className="text-[10px] text-slate-400 font-mono">ID: MG-75567540</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="text-[10px] text-cyan-400 hover:underline font-mono"
          >
            Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Blood Group</span>
            <strong className="text-cyan-300 font-mono text-sm">O+ (Rh Pos)</strong>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Donations</span>
            <strong className="text-emerald-300 font-mono text-sm">4 Recorded</strong>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
          <span>Active Role:</span>
          <span className="text-slate-200 capitalize font-medium">{currentRole}</span>
        </div>
      </div>

      {/* Donation Status & Recovery Widget */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Droplet className="w-3.5 h-3.5 text-cyan-400" />
            <span>Donation Health</span>
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            Eligible
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Last Recorded:</span>
            <span className="font-mono text-slate-200">2026-08-20</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Cooldown Type:</span>
            <span className="text-slate-200">Whole Blood (84d)</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span className="text-slate-400">Status:</span>
            <span className="text-emerald-400 font-semibold">Eligible to consider requests</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('donor_connect')}
          className="w-full py-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-400 rounded-xl text-xs font-medium transition-colors text-center"
        >
          Open Donor Portal
        </button>
      </div>

      {/* Quick Links to Authorized Portals */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3 backdrop-blur-md">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
          Authorized Medical Services
        </span>

        <div className="space-y-1.5 text-xs">
          <button
            onClick={() => onNavigate('hospitals')}
            className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 text-slate-200 hover:text-white transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Hospital className="w-3.5 h-3.5 text-cyan-400" />
              <span>Find Nearby Blood Banks</span>
            </div>
            <span className="text-slate-500">→</span>
          </button>

          <a
            href="https://notto.mohfw.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/40 text-slate-200 hover:text-white transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-teal-400" />
              <span>NOTTO Organ Registry</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>

      {/* Sample Data Disclaimer Note */}
      <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-[10px] text-slate-500 leading-tight">
        * Sample demonstration data: Clinical readings and alerts shown are for college project evaluation purposes.
      </div>
    </aside>
  );
};
