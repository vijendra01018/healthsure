import React, { useState } from 'react';
import { Language, UserRole } from '../types/health';
import {
  CheckCircle2,
  Heart,
  Lock,
  Shield,
  Trash2,
  User,
  UserCheck
} from 'lucide-react';

interface UserProfileViewProps {
  language: Language;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  language,
  currentRole,
  onRoleChange
}) => {
  const [userName, setUserName] = useState<string>('Arjun Sharma');
  const [userEmail, setUserEmail] = useState<string>('circuitzsouthern@gmail.com');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDeletedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDeleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all locally stored health data (cycle tracking, donor profiles, search history)? This cannot be undone.')) {
      localStorage.clear();
      setDeletedSuccess(true);
      setTimeout(() => setDeletedSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Account & Security</span>
        <h2 className="text-2xl font-bold text-white">
          {language === 'te' ? 'నా ప్రొఫైల్ & గుర్తింపు' : 'My Health Profile & Preferences'}
        </h2>
        <p className="text-xs text-slate-400">
          {language === 'te'
            ? 'మీ ఖాతా వివరాలు, ఎంచుకున్న పాత్ర మరియు గోప్యతా నియంత్రణలను నిర్వహించండి.'
            : 'Manage role-based permissions, privacy consents, and local data retention.'}
        </p>
      </div>

      {/* Role Switcher */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Role-Based Access Control (RBAC)</span>
        </h3>
        <p className="text-xs text-slate-300">
          Switch roles to test different user workflows (Public Health Explorer, Voluntary Blood Donor, or Verified Healthcare Partner).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'explorer',
              title: 'Public Explorer',
              desc: 'General health education, anatomy exploration & symptom inquiries.'
            },
            {
              id: 'donor',
              title: 'Registered Donor',
              desc: 'Eligibility tracking, recovery cooldowns, voluntary verified requests.'
            },
            {
              id: 'clinician',
              title: 'Healthcare Partner',
              desc: 'Hospital verification desk simulation, blood bank protocols.'
            }
          ].map((r) => {
            const isSelected = currentRole === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => onRoleChange(r.id as UserRole)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-md text-white'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold text-xs text-cyan-300">{r.title}</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-normal">{r.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Profile Info Form */}
      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Profile Identification</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Display Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Settings updated successfully</span>
            </span>
          )}
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium ml-auto transition-colors"
          >
            Save Profile
          </button>
        </div>
      </form>

      {/* Privacy and Data Deletion */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>Privacy & Data Self-Determination</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          MediGuide AI strictly prioritizes data minimization. In accordance with healthcare privacy standards, you can wipe all locally cached tracking sessions with a single click.
        </p>

        {deletedSuccess ? (
          <div className="text-xs text-emerald-400 font-medium p-3 rounded-lg bg-emerald-950/40 border border-emerald-800">
            ✓ All local session data and tracking records have been permanently cleared.
          </div>
        ) : (
          <button
            type="button"
            onClick={handleDeleteAllData}
            className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-900 text-rose-200 hover:bg-rose-900/60 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete All My Stored Health Data</span>
          </button>
        )}
      </div>
    </div>
  );
};
