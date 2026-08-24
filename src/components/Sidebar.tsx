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
  X
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
    }, 600);
  };

  const getCategoryCount = (category: string) => {
    if (category === 'Todos') return articles.length;
    return articles.filter((a) => a.category === category).length;
  };

  const currentLevelProgress = Math.min(100, Math.round((stats.readArticleIds.length / 6) * 100));

  return (
    <aside className="space-y-6">
      
      {/* 1. Interactive Search Box */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
        <label htmlFor="sidebar-search" className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
          Buscar en el Blog
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="sidebar-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar conceptos, PBL, Duolingo..."
            className="w-full pl-9.5 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1"
              aria-label="Limpiar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-[11px] text-stone-500 mt-2">
            Filtrando por: <span className="font-semibold text-stone-800">"{searchQuery}"</span>
          </p>
        )}
      </div>

      {/* 2. Categorías List with badges */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-stone-400" />
            Categorías
          </h3>
          <span className="text-[11px] text-stone-400 font-mono">6 Temas</span>
        </div>

        <div className="space-y-1">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count = getCategoryCount(category);
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-stone-50 font-semibold shadow-2xs'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                    isSelected ? 'bg-stone-800 text-amber-300' : 'bg-stone-100 text-stone-500'
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
      <div className="bg-gradient-to-br from-amber-900/5 via-stone-50 to-amber-950/5 rounded-2xl p-5 border border-amber-200/70 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                Rango de Lector
              </h4>
              <p className="text-[11px] text-stone-500 font-mono">{stats.levelTitle}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-800 font-mono bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
            {stats.xp} XP
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 my-3">
          <div className="flex justify-between text-[11px] text-stone-600">
            <span>Progreso de lectura</span>
            <span className="font-semibold">{stats.readArticleIds.length} / 6 leídos ({currentLevelProgress}%)</span>
          </div>
          <div className="w-full bg-stone-200/80 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${currentLevelProgress}%` }}
            />
          </div>
        </div>

        {/* Unlocked Badges count */}
        <div className="pt-3 border-t border-amber-200/40 flex items-center justify-between text-xs">
          <span className="text-stone-600 text-[11px]">Insignias desbloqueadas:</span>
          <span className="font-bold text-stone-800">
            {stats.badges.filter((b) => b.unlocked).length} de {stats.badges.length}
          </span>
        </div>
      </div>

      {/* 4. Interactive Newsletter Subscription */}
      <div className="bg-stone-900 text-stone-50 rounded-2xl p-5 border border-stone-800 shadow-md">
        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <Mail className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Boletín Exclusivo</span>
        </div>

        <h3 className="text-base font-bold font-serif-heading text-white mb-1.5">
          El Manifiesto Lúdico
        </h3>

        <p className="text-xs text-stone-400 leading-relaxed mb-4">
          Recibe cada dos semanas ensayos profundos sobre diseño de mecánicas, modelos psicológicos y casos de estudio reales.
        </p>

        {subscribed ? (
          <div className="p-3 bg-emerald-950/60 border border-emerald-700/50 rounded-xl flex items-center gap-2.5 text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <p className="font-semibold">¡Suscripción confirmada!</p>
              <p className="text-[11px] text-emerald-400/80">Te hemos enviado el primer compendio en PDF.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className="w-full px-3 py-2 bg-stone-800/90 border border-stone-700 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
              {newsletterError && (
                <p className="text-[11px] text-rose-400 mt-1">{newsletterError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer disabled:opacity-50"
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
            <p className="text-[10px] text-stone-500 text-center">
              Sin spam. Cancela cuando quieras en 1 clic.
            </p>
          </form>
        )}
      </div>

      {/* 5. Mini Glosario Rápido */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
            Glosario Esencial
          </h3>
          <span className="text-[10px] text-stone-400">Toca para ver</span>
        </div>

        <div className="space-y-1.5">
          {GLOSSARY_TERMS.map((item) => {
            const isOpen = expandedGlossary === item.term;
            return (
              <div key={item.term} className="border border-stone-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedGlossary(isOpen ? null : item.term)}
                  className="w-full flex items-center justify-between p-2 text-left text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  <span className="font-mono text-amber-900">{item.term}</span>
                  <span className="text-stone-400 text-xs">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-3 pb-2.5 pt-1 text-[11px] text-stone-600 bg-stone-50/50 leading-relaxed border-t border-stone-100">
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
