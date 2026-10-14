/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, TextSize, UserRole } from './types/health';
import { UI_TEXT } from './data/translations';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { RightPanel } from './components/RightPanel';
import { DashboardHome } from './components/DashboardHome';
import { HealthAssistant } from './components/HealthAssistant';
import { InteractiveBody } from './components/InteractiveBody';
import { WomensHealthModule } from './components/WomensHealthModule';
import { PancreasDiabetesModule } from './components/PancreasDiabetesModule';
import { DonorConnectModule } from './components/DonorConnectModule';
import { OrganDonationModule } from './components/OrganDonationModule';
import { HealthLibrary } from './components/HealthLibrary';
import { HospitalsDirectory } from './components/HospitalsDirectory';
import { UserProfileView } from './components/UserProfileView';
import { SettingsView } from './components/SettingsView';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [navParams, setNavParams] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Language state
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('mg_lang') as Language) || 'en';
  });

  // Text size state
  const [textSize, setTextSize] = useState<TextSize>(() => {
    return (localStorage.getItem('mg_text_size') as TextSize) || 'normal';
  });

  // High contrast state
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('mg_high_contrast') === 'true';
  });

  // User role state
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return (localStorage.getItem('mg_user_role') as UserRole) || 'explorer';
  });

  // Persist preferences
  useEffect(() => {
    localStorage.setItem('mg_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('mg_text_size', textSize);
  }, [textSize]);

  useEffect(() => {
    localStorage.setItem('mg_high_contrast', String(highContrast));
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('mg_user_role', currentRole);
  }, [currentRole]);

  // Navigate handler with optional parameters
  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    setNavParams(params || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Text scale class mapping
  const getTextSizeClass = () => {
    if (textSize === 'large') return 'text-[1.05rem]';
    if (textSize === 'xlarge') return 'text-[1.15rem]';
    return 'text-sm';
  };

  return (
    <div className={`min-h-screen bg-[#050b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 ${getTextSizeClass()}`}>
      {/* Top Clinical Safety & Emergency Banner */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 py-1.5 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span className="truncate max-w-4xl">
          {UI_TEXT[language].emergencyBanner}
        </span>
      </div>

      {/* Main Sticky Navbar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        textSize={textSize}
        onTextSizeChange={setTextSize}
        highContrast={highContrast}
        onHighContrastToggle={() => setHighContrast(!highContrast)}
        currentRole={currentRole}
        onNavigate={handleNavigate}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Workspace: Sidebar + Center Content + Desktop Right Panel */}
      <div className="max-w-[1520px] w-full mx-auto flex-1 flex items-start px-2 sm:px-4 lg:px-6 py-4 sm:py-6 gap-6">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          language={language}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Center Main Stage Content */}
        <main className="flex-1 min-w-0 pb-16 md:pb-6">
          {currentPage === 'home' && (
            <DashboardHome
              language={language}
              onNavigate={handleNavigate}
              currentRole={currentRole}
            />
          )}

          {currentPage === 'assistant' && (
            <HealthAssistant
              language={language}
              onNavigateToArticle={(articleId) => handleNavigate('library', { targetId: articleId })}
              onNavigateToEmergency={() => handleNavigate('hospitals')}
            />
          )}

          {currentPage === 'body_explorer' && (
            <InteractiveBody
              language={language}
              onNavigateToArticle={(articleId) => handleNavigate('library', { targetId: articleId })}
            />
          )}

          {currentPage === 'womens_health' && (
            <WomensHealthModule
              language={language}
              onNavigateToArticle={(articleId) => handleNavigate('library', { targetId: articleId })}
            />
          )}

          {currentPage === 'pancreas_diabetes' && (
            <PancreasDiabetesModule
              language={language}
              onNavigateToArticle={(articleId) => handleNavigate('library', { targetId: articleId })}
            />
          )}

          {currentPage === 'donor_connect' && (
            <DonorConnectModule
              language={language}
              onNavigateToHospitals={() => handleNavigate('hospitals')}
            />
          )}

          {currentPage === 'organ_donation' && (
            <OrganDonationModule
              language={language}
            />
          )}

          {currentPage === 'library' && (
            <HealthLibrary
              language={language}
              initialArticleId={navParams?.targetId}
              onClearInitialArticle={() => setNavParams(null)}
            />
          )}

          {currentPage === 'hospitals' && (
            <HospitalsDirectory
              language={language}
            />
          )}

          {currentPage === 'profile' && (
            <UserProfileView
              language={language}
              currentRole={currentRole}
              onRoleChange={setCurrentRole}
            />
          )}

          {currentPage === 'settings' && (
            <SettingsView
              language={language}
              onLanguageChange={setLanguage}
              textSize={textSize}
              onTextSizeChange={setTextSize}
              highContrast={highContrast}
              onHighContrastToggle={() => setHighContrast(!highContrast)}
            />
          )}

          {/* On Mobile: Display Right Panel Widgets Below Main Content */}
          <div className="block xl:hidden mt-8 pt-8 border-t border-slate-800/80">
            <RightPanel
              language={language}
              currentRole={currentRole}
              onNavigate={handleNavigate}
            />
          </div>
        </main>

        {/* Desktop Right-Side Information Panel */}
        <div className="hidden xl:block shrink-0">
          <RightPanel
            language={language}
            currentRole={currentRole}
            onNavigate={handleNavigate}
          />
        </div>
      </div>

      {/* Footer (Clean unboxed typography with zero-pill discipline) */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 px-4 sm:px-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">MediGuide AI</span>
            <span aria-hidden="true">·</span>
            <span>Better Health. Together.</span>
            <span aria-hidden="true">·</span>
            <span>College Academic Project</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => handleNavigate('library')} className="hover:text-slate-200 transition-colors">
              Health Library
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNavigate('donor_connect')} className="hover:text-slate-200 transition-colors">
              Donor Recovery Guidelines
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNavigate('settings')} className="hover:text-slate-200 transition-colors">
              Accessibility
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNavigate('profile')} className="hover:text-slate-200 transition-colors">
              Privacy Notice
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
