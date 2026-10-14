import React from 'react';
import { Language } from '../types/health';
import { UI_TEXT } from '../data/translations';
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  Droplet,
  Heart,
  Home,
  Hospital,
  Layers,
  Settings,
  Shield,
  Stethoscope,
  User,
  Users,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: Language;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  language,
  isMobileOpen,
  onCloseMobile
}) => {
  const t = UI_TEXT[language];

  const menuItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'assistant', label: t.navHealthAssistant, icon: Stethoscope },
    { id: 'body_explorer', label: t.navBodyExplorer, icon: Activity },
    { id: 'womens_health', label: t.navWomensHealth, icon: Heart },
    { id: 'pancreas_diabetes', label: t.navPancreasDiabetes, icon: Layers },
    { id: 'donor_connect', label: t.navDonorConnect, icon: Droplet },
    { id: 'organ_donation', label: t.navOrganDonation, icon: Award },
    { id: 'library', label: t.navHealthLibrary, icon: BookOpen },
    { id: 'hospitals', label: t.navFindHospitals, icon: Hospital },
    { id: 'profile', label: t.navMyProfile, icon: User },
    { id: 'settings', label: t.navSettings, icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Navigation Panel */}
      <aside
        className={`fixed md:sticky top-0 md:top-[61px] left-0 h-full md:h-[calc(100vh-61px)] w-64 bg-slate-950/95 md:bg-slate-950/70 border-r border-slate-800/80 p-4 flex flex-col justify-between z-50 md:z-30 transition-transform duration-300 backdrop-blur-md overflow-y-auto ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-4">
          {/* Mobile Header with close button */}
          <div className="flex items-center justify-between md:hidden pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white text-sm">MediGuide AI Navigation</span>
            </div>
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Safety & College Project Accreditation */}
        <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-2">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-[11px] text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Educational Platform</span>
            </div>
            <p className="leading-tight text-[10px]">
              Academic prototype for medical literacy and voluntary donation facilitation.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Sticky Bottom Bar (Essential 4 shortcuts for quick thumb navigation) */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-slate-950/95 border-t border-slate-800 backdrop-blur-md flex items-center justify-around z-40 md:hidden px-2">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentPage === 'home' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onNavigate('assistant')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentPage === 'assistant' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Assistant</span>
        </button>
        <button
          onClick={() => onNavigate('body_explorer')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentPage === 'body_explorer' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Body</span>
        </button>
        <button
          onClick={() => onNavigate('donor_connect')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentPage === 'donor_connect' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Droplet className="w-4 h-4" />
          <span>Donors</span>
        </button>
        <button
          onClick={() => {
            onNavigate('library');
            onCloseMobile();
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentPage === 'library' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Library</span>
        </button>
      </div>
    </>
  );
};
