import React, { useState, useRef, useEffect } from 'react';
import { Language, TextSize, UserRole, NotificationItem } from '../types/health';
import { UI_TEXT } from '../data/translations';
import { ORGANS_DATA } from '../data/organsData';
import { HEALTH_ARTICLES } from '../data/healthArticles';
import { MEDICAL_SERVICES } from '../data/hospitalsData';
import {
  Activity,
  Bell,
  CheckCircle2,
  ChevronDown,
  Globe,
  Heart,
  Menu,
  Moon,
  Search,
  Sliders,
  Type,
  User,
  X
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  textSize: TextSize;
  onTextSizeChange: (size: TextSize) => void;
  highContrast: boolean;
  onHighContrastToggle: () => void;
  currentRole: UserRole;
  onNavigate: (page: string, params?: any) => void;
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  textSize,
  onTextSizeChange,
  highContrast,
  onHighContrastToggle,
  currentRole,
  onNavigate,
  onToggleMobileMenu
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showAccessMenu, setShowAccessMenu] = useState<boolean>(false);

  const searchRef = useRef<HTMLDivElement | null>(null);

  // Sample Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Blood Donor System Alert',
      message: 'Verified emergency request for O- Red Cells posted by Osmania General Hospital.',
      timestamp: '15m ago',
      type: 'donor_update',
      read: false
    },
    {
      id: 'notif-2',
      title: 'New Clinical Education Article',
      message: 'Demystifying HbA1c and Serum Lipase for metabolic screening has been added.',
      timestamp: '2h ago',
      type: 'info',
      read: false
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Autocomplete matching items
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();

    const matches: Array<{ id: string; title: string; category: string; target: string; targetId?: string }> = [];

    // Organs
    ORGANS_DATA.forEach((org) => {
      if ((org.name.en + ' ' + org.name.te).toLowerCase().includes(q)) {
        matches.push({
          id: `org-${org.id}`,
          title: org.name[language],
          category: 'Human Body Organ',
          target: 'body_explorer',
          targetId: org.id
        });
      }
    });

    // Articles
    HEALTH_ARTICLES.forEach((art) => {
      if ((art.title.en + ' ' + art.title.te).toLowerCase().includes(q)) {
        matches.push({
          id: `art-${art.id}`,
          title: art.title[language],
          category: 'Health Article',
          target: 'library',
          targetId: art.id
        });
      }
    });

    // Hospitals
    MEDICAL_SERVICES.forEach((hosp) => {
      if ((hosp.name + ' ' + hosp.city).toLowerCase().includes(q)) {
        matches.push({
          id: `hosp-${hosp.id}`,
          title: hosp.name,
          category: hosp.type,
          target: 'hospitals'
        });
      }
    });

    return matches.slice(0, 6);
  }, [searchQuery, language]);

  // Click outside search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearchResult = (result: any) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onNavigate(result.target, { targetId: result.targetId });
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 rounded-xl text-slate-400 hover:text-white md:hidden hover:bg-slate-900 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Wordmark (Single text element with clean icon, follows Top Bar Contract) */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group text-left whitespace-nowrap shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>MediGuide</span>
                <span className="text-cyan-400 font-mono text-sm">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 tracking-wide font-medium">
                Better Health. Together.
              </span>
            </div>
          </button>
        </div>

        {/* Center: Search Bar with Autocomplete */}
        <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              placeholder={UI_TEXT[language].searchPlaceholder}
              className="w-full pl-10 pr-8 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl z-50 space-y-1">
              <div className="text-[10px] uppercase font-mono text-slate-400 px-2 py-1">
                Suggested Matches
              </div>
              {searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSearchResult(item)}
                  className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 transition-colors flex items-center justify-between text-xs"
                >
                  <span className="text-white font-medium truncate max-w-[260px]">{item.title}</span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Controls: Notifications, Accessibility, Language, Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors relative"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center font-mono">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-white">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkNotificationsRead}
                      className="text-[11px] text-cyan-400 hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/70 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{n.timestamp}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Accessibility Quick Menu (Text Size & Contrast) */}
          <div className="relative">
            <button
              onClick={() => setShowAccessMenu(!showAccessMenu)}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1"
              aria-label="Accessibility options"
              title="Text size & contrast"
            >
              <Type className="w-4 h-4" />
            </button>

            {showAccessMenu && (
              <div className="absolute right-0 mt-2 w-56 p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 space-y-3">
                <div className="text-xs font-bold text-white border-b border-slate-800 pb-2">
                  Accessibility Controls
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-mono">Text Size</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onTextSizeChange('normal')}
                      className={`flex-1 py-1 rounded text-xs font-medium border ${textSize === 'normal' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => onTextSizeChange('large')}
                      className={`flex-1 py-1 rounded text-xs font-medium border ${textSize === 'large' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                    >
                      A+
                    </button>
                    <button
                      onClick={() => onTextSizeChange('xlarge')}
                      className={`flex-1 py-1 rounded text-xs font-medium border ${textSize === 'xlarge' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                    >
                      A++
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-300">High Contrast</span>
                  <button
                    onClick={onHighContrastToggle}
                    className={`text-[11px] px-2 py-0.5 rounded border ${highContrast ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                  >
                    {highContrast ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Selector (EN / TE) */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-lg transition-colors ${language === 'en' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('te')}
              className={`px-2 py-1 rounded-lg transition-colors ${language === 'te' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              తె
            </button>
          </div>

          {/* Profile Shortcut */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
          >
            <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 text-xs font-bold">
              {currentRole === 'donor' ? 'D' : currentRole === 'clinician' ? 'C' : 'U'}
            </div>
            <span className="hidden lg:inline text-xs font-medium">
              {currentRole === 'donor' ? 'Blood Donor' : currentRole === 'clinician' ? 'Clinician' : 'Explorer'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
