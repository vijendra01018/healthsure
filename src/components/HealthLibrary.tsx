import React, { useState, useMemo } from 'react';
import { HEALTH_ARTICLES } from '../data/healthArticles';
import { HealthArticle, Language } from '../types/health';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Search,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface HealthLibraryProps {
  language: Language;
  initialArticleId?: string | null;
  onClearInitialArticle?: () => void;
}

const CATEGORIES = [
  { id: 'all', label: { en: 'All Categories', te: 'అన్ని విభాగాలు' } },
  { id: 'diabetes_pancreas', label: { en: 'Pancreas & Diabetes', te: 'క్లోమం & మధుమేహం' } },
  { id: 'women', label: { en: "Women's Health", te: 'మహిళల ఆరోగ్యం' } },
  { id: 'donation', label: { en: 'Blood & Organ Donation', te: 'రక్త & అవయవ దానం' } },
  { id: 'tests', label: { en: 'Medical Tests Explained', te: 'వైద్య పరీక్షల వివరణ' } },
  { id: 'first_aid', label: { en: 'First Aid & Emergency', te: 'ప్రథమ చికిత్స' } }
];

export const HealthLibrary: React.FC<HealthLibraryProps> = ({
  language,
  initialArticleId,
  onClearInitialArticle
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(initialArticleId || null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const t = language;

  // Selected article object
  const activeArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return HEALTH_ARTICLES.find((a) => a.id === selectedArticleId) || null;
  }, [selectedArticleId]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return HEALTH_ARTICLES.filter((article) => {
      if (selectedCategory !== 'all' && article.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const titleMatches = (article.title.en + ' ' + article.title.te).toLowerCase().includes(q);
      const summaryMatches = (article.summary.en + ' ' + article.summary.te).toLowerCase().includes(q);
      const factsMatches = article.keyFacts.en.some((f) => f.toLowerCase().includes(q));

      return titleMatches || summaryMatches || factsMatches;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* If an article is open in detailed reading view */}
      {activeArticle ? (
        <div className="space-y-6">
          {/* Breadcrumb / Back button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedArticleId(null);
                onClearInitialArticle?.();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'లైబ్రరీకి తిరిగి వెళ్ళండి' : 'Back to Library'}</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-xs text-slate-400 truncate max-w-sm">
              {activeArticle.title[t]}
            </span>
          </div>

          {/* Article Full Container */}
          <article className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-md space-y-6">
            {/* Unboxed Metadata (Zero-pill discipline) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-400 uppercase font-mono tracking-wider">
                {activeArticle.category.replace('_', ' ')}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{activeArticle.readTime}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Reviewed: {activeArticle.reviewDate}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              {activeArticle.title[t]}
            </h1>

            {/* Verified Clinical Reviewer Credential */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400">Medically Reviewed by: </span>
                <strong className="text-white">{activeArticle.reviewedBy}</strong>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-sm text-cyan-100 leading-relaxed">
              {activeArticle.summary[t]}
            </div>

            {/* Key Facts */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{language === 'te' ? 'ముఖ్యమైన వాస్తవాలు' : 'Key Clinical Facts & Mechanisms'}</span>
              </h2>
              <div className="space-y-2.5">
                {activeArticle.keyFacts[t].map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-3 leading-relaxed"
                  >
                    <span className="text-cyan-400 font-mono font-bold mt-0.5">•</span>
                    <span>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Signs Box */}
            {activeArticle.warningSigns[t].length > 0 && (
              <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-900/60 space-y-2.5">
                <h3 className="text-xs uppercase font-mono tracking-wider text-rose-300 flex items-center gap-2 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{language === 'te' ? 'అత్యవసర హెచ్చరిక సంకేతాలు' : 'Urgent Warning Signs Requiring Immediate Care'}</span>
                </h3>
                <ul className="space-y-1.5">
                  {activeArticle.warningSigns[t].map((ws, idx) => (
                    <li key={idx} className="text-xs text-rose-200 flex items-start gap-2 leading-relaxed">
                      <span className="text-rose-400 font-bold shrink-0">!</span>
                      <span>{ws}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reputable Medical References */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Reputable Scientific Citations & Guidelines
              </h4>
              <ul className="space-y-1">
                {activeArticle.references.map((ref, idx) => (
                  <li key={idx} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="text-slate-600">[{idx + 1}]</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      ) : (
        /* Library Directory View */
        <div className="space-y-6">
          {/* Header */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Reviewed Medical Education</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  {language === 'te' ? 'ఆరోగ్య సమాచార నిధి' : 'Health Education Library'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {language === 'te'
                    ? 'నిపుణులచే సమీక్షించబడిన కథనాలు, వ్యాధుల నివారణ, వైద్య పరీక్షలు మరియు అత్యవసర జాగ్రత్తలు.'
                    : 'Evidence-based articles reviewed by verified clinicians, cross-referenced with WHO, CDC, and ICMR.'}
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'te' ? 'కథనాలలో శోధించండి...' : 'Search articles, tests, symptoms...'}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800 overflow-x-auto text-xs font-medium">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.label[t]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all cursor-pointer flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-cyan-400 uppercase font-mono tracking-wider">
                      {article.category.replace('_', ' ')}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {article.title[t]}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {article.summary[t]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] truncate max-w-[180px]">
                    {article.reviewedBy.split(',')[0]}
                  </span>
                  <span className="text-cyan-400 group-hover:underline font-medium">
                    {language === 'te' ? 'చదవండి' : 'Read Article →'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-sm">
              No articles found matching "{searchQuery}". Try searching for "pancreas", "diabetes", "pcos", or "blood".
            </div>
          )}
        </div>
      )}
    </div>
  );
};
