import React, { useState } from 'react';
import { 
  Search, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  Tag, 
  BookOpen, 
  ArrowRight,
  HelpCircle,
  X,
  Zap,
  Flame,
  Trophy
} from 'lucide-react';
import { Article, ReaderStats } from '../types';
import { CATEGORIES, GLOSSARY_TERMS } from '../data/articles';

interface SidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  articles: Article[];
  stats: ReaderStats;
  onSelectArticle: (article: Article) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  articles,
  stats,
  onSelectArticle,
}) => {
  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Glossary accordion state
  const [expandedGlossary, setExpandedGlossary] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setNewsletterError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 500);
  };

  const getCategoryCount = (category: string) => {
    if (category === 'Todos') return articles.length;
    return articles.filter((a) => a.category === category).length;
  };

  const currentLevelProgress = Math.min(100, Math.round((stats.readArticleIds.length / 6) * 100));

  return (
    <aside className="space-y-6">
      
      {/* 1. Interactive Search Box */}
      <div className="bg-[#0e111a] rounded-2xl p-5 border border-slate-800 shadow-xl">
        <label htmlFor="sidebar-search" className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          Buscador de Ensayos
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="sidebar-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar MDA, PBL, Duolingo, Flow..."
            className="w-full pl-9.5 pr-8 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00]/40 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-1 rounded font-mono"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-[11px] text-slate-400 mt-2 font-mono">
            Filtrando por: <span className="font-semibold text-[#ccff00]">"{searchQuery}"</span>
          </p>
        )}
      </div>

      {/* 2. Categorías List with badges */}
      <div className="bg-[#0e111a] rounded-2xl p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            Categorías
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">6 Temas</span>
        </div>

        <div className="space-y-1">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count = getCategoryCount(category);
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                  isSelected
                    ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                    isSelected ? 'bg-black/30 text-black font-bold' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Meta-Gamification: Tu Progreso de Lector */}
      <div className="bg-[#0e111a] rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#ccff00]/40 text-[#ccff00] flex items-center justify-center shadow-[0_0_10px_rgba(204,255,0,0.2)]">
              <Trophy className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-cyber tracking-wider">
                {stats.levelTitle}
              </h4>
              <p className="text-[11px] text-cyan-400 font-mono">Nivel {stats.level}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#ccff00] font-mono bg-slate-900 px-2.5 py-1 rounded-md border border-[#ccff00]/40">
            {stats.xp} XP
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 my-3">
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Progreso de lectura</span>
            <span className="font-semibold text-[#ccff00]">{stats.readArticleIds.length} / 6 ({currentLevelProgress}%)</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-[#ccff00] via-cyan-400 to-[#ccff00] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(204,255,0,0.5)]"
              style={{ width: `${currentLevelProgress}%` }}
            />
          </div>
        </div>

        {/* Unlocked Badges count */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 text-[11px]">Insignias desbloqueadas:</span>
          <span className="font-bold text-[#ccff00]">
            {stats.badges.filter((b) => b.unlocked).length} de {stats.badges.length}
          </span>
        </div>
      </div>

      {/* 4. Interactive Newsletter Subscription */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0e111a] to-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-2 text-cyan-400">
          <Mail className="w-4 h-4" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Boletín Exclusivo</span>
        </div>

        <h3 className="text-sm font-bold font-heading text-white mb-1.5">
          El Manifiesto Lúdico
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Recibe cada dos semanas ensayos profundos sobre diseño de mecánicas, modelos psicológicos y casos de estudio reales.
        </p>

        {subscribed ? (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl flex items-center gap-2.5 text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">¡Suscripción confirmada!</p>
              <p className="text-[11px] text-emerald-400/80">Te hemos enviado el primer compendio de análisis.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2.5">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-all font-sans"
              />
              {newsletterError && (
                <p className="text-[11px] text-rose-400 mt-1">{newsletterError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Procesando...</span>
              ) : (
                <>
                  <span>Suscribirse gratis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
            <p className="text-[10px] text-slate-500 text-center font-mono">
              Sin spam. Cancela cuando quieras en 1 clic.
            </p>
          </form>
        )}
      </div>

      {/* 5. Mini Glosario Rápido */}
      <div className="bg-[#0e111a] rounded-2xl p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            Glosario Esencial
          </h3>
          <span className="text-[10px] text-slate-500 font-mono">Toca para ver</span>
        </div>

        <div className="space-y-1.5">
          {GLOSSARY_TERMS.map((item) => {
            const isOpen = expandedGlossary === item.term;
            return (
              <div key={item.term} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950">
                <button
                  onClick={() => setExpandedGlossary(isOpen ? null : item.term)}
                  className="w-full flex items-center justify-between p-2.5 text-left text-xs font-semibold text-slate-200 hover:bg-slate-900 transition-colors"
                >
                  <span className="font-mono text-[#ccff00]">{item.term}</span>
                  <span className="text-cyan-400 text-xs font-mono">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-3 pb-2.5 pt-1 text-[11px] text-slate-400 bg-slate-900/60 leading-relaxed border-t border-slate-800 font-sans">
                    {item.definition}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
};

