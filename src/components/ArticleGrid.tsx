import React, { useState } from 'react';
import { 
  Filter, 
  Grid, 
  Layers, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Bookmark, 
  ArrowUpDown 
} from 'lucide-react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';
import { CATEGORIES } from '../data/articles';

interface ArticleGridProps {
  articles: Article[];
  bookmarkedIds: string[];
  readArticleIds: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (id: string, e: React.MouseEvent) => void;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  bookmarkedIds,
  readArticleIds,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectArticle,
  onToggleBookmark,
}) => {
  const [filterView, setFilterView] = useState<'all' | 'unread' | 'read' | 'saved'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'time' | 'xp'>('default');

  // Filter pipeline
  let filtered = articles.filter((art) => {
    // 1. Category filter
    if (selectedCategory !== 'Todos' && art.category !== selectedCategory) {
      return false;
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = art.title.toLowerCase().includes(q);
      const inSummary = art.summary.toLowerCase().includes(q);
      const inTags = art.tags.some((t) => t.toLowerCase().includes(q));
      const inAuthor = art.author.name.toLowerCase().includes(q);
      const inSections = art.sections.some(
        (s) =>
          s.heading.toLowerCase().includes(q) ||
          s.paragraphs.some((p) => p.toLowerCase().includes(q))
      );
      if (!inTitle && !inSummary && !inTags && !inAuthor && !inSections) {
        return false;
      }
    }

    // 3. Status filter
    if (filterView === 'saved' && !bookmarkedIds.includes(art.id)) {
      return false;
    }
    if (filterView === 'read' && !readArticleIds.includes(art.id)) {
      return false;
    }
    if (filterView === 'unread' && readArticleIds.includes(art.id)) {
      return false;
    }

    return true;
  });

  // Sort pipeline
  if (sortBy === 'time') {
    filtered = [...filtered].sort((a, b) => a.readTimeMinutes - b.readTimeMinutes);
  } else if (sortBy === 'xp') {
    filtered = [...filtered].sort((a, b) => b.xpReward - a.xpReward);
  }

  return (
    <section id="articulos" className="space-y-6">
      
      {/* Category Pills Bar & Sub-Filters */}
      <div className="flex flex-col gap-4 pb-3 border-b border-slate-800/80">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
              Colección de Ensayos
            </h2>
            <span className="text-xs font-mono text-cyan-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
              {filtered.length} de {articles.length}
            </span>
          </div>

          {/* Quick status tabs: Todos, Por Leer, Leídos, Guardados */}
          <div className="flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setFilterView('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterView === 'all'
                  ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterView('unread')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterView === 'unread'
                  ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Por leer
            </button>
            <button
              onClick={() => setFilterView('read')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterView === 'read'
                  ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Leídos ({readArticleIds.length})
            </button>
            <button
              onClick={() => setFilterView('saved')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterView === 'saved'
                  ? 'bg-[#ccff00] text-black font-bold shadow-[0_0_10px_rgba(204,255,0,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Guardados ({bookmarkedIds.length})
            </button>
          </div>
        </div>

        {/* Categories horizontally scrollable badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-slate-900 text-[#ccff00] border-[#ccff00]/60 shadow-[0_0_12px_rgba(204,255,0,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Articles */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              isBookmarked={bookmarkedIds.includes(article.id)}
              isRead={readArticleIds.includes(article.id)}
              onSelect={onSelectArticle}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        /* Empty Search / Filter State */
        <div className="py-16 px-4 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-[#ccff00] flex items-center justify-center mx-auto mb-3 border border-slate-700">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading mb-1">
            No se encontraron artículos
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mb-4">
            No hay publicaciones que coincidan con los filtros seleccionados o tu término de búsqueda.
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              onSelectCategory('Todos');
              setFilterView('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#ccff00] text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}

    </section>
  );
};
