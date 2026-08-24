import React from 'react';
import { 
  Clock, 
  Bookmark, 
  CheckCircle2, 
  ArrowUpRight, 
  Brain, 
  Award, 
  History, 
  Sliders, 
  Briefcase, 
  Compass,
  Sparkles
} from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  isRead: boolean;
  onSelect: (article: Article) => void;
  onToggleBookmark: (articleId: string, e: React.MouseEvent) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isBookmarked,
  isRead,
  onSelect,
  onToggleBookmark,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-4 h-4" />;
      case 'Award':
        return <Award className="w-4 h-4" />;
      case 'History':
        return <History className="w-4 h-4" />;
      case 'Sliders':
        return <Sliders className="w-4 h-4" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      case 'Compass':
        return <Compass className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Teoría':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Mecánicas':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Historia':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200/80';
      case 'Principios':
        return 'bg-purple-50 text-purple-800 border-purple-200/80';
      case 'Aplicaciones':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200/80';
      case 'Casos Reales':
        return 'bg-rose-50 text-rose-800 border-rose-200/80';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <article
      onClick={() => onSelect(article)}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-stone-200/90 p-6 hover:border-stone-400 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top subtle decorative accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${article.coverAccent}`} />

      <div>
        {/* Header Metadata */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${getCategoryTheme(article.category)}`}>
            {getCategoryIcon(article.iconName)}
            {article.category}
          </span>

          <div className="flex items-center gap-1.5">
            {isRead && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Leído
              </span>
            )}
            
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' 
                  : 'text-stone-400 hover:text-stone-800 hover:bg-stone-100'
              }`}
              title={isBookmarked ? 'Eliminar de guardados' : 'Guardar para después'}
              aria-label={isBookmarked ? 'Eliminar de guardados' : 'Guardar para después'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-heading leading-snug group-hover:text-amber-900 transition-colors mb-2.5">
          {article.title}
        </h2>

        {/* Subtitle / Summary */}
        <p className="text-stone-600 text-sm leading-relaxed mb-5 line-clamp-3">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-mono"
            >
              #{tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="text-[11px] px-1.5 py-0.5 text-stone-400 font-mono">
              +{article.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Author & Read Action */}
      <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full object-cover border border-stone-200"
            loading="lazy"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-stone-800 truncate max-w-[120px] sm:max-w-[150px]">
              {article.author.name}
            </span>
            <span className="text-[10px] text-stone-400">
              {article.date}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-stone-500 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {article.readTimeMinutes} min
          </span>
          <div className="w-7 h-7 rounded-lg bg-stone-100 group-hover:bg-stone-900 group-hover:text-stone-50 flex items-center justify-center transition-all">
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </article>
  );
};
