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
  Sparkles,
  Zap
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
        return <Brain className="w-3.5 h-3.5" />;
      case 'Award':
        return <Award className="w-3.5 h-3.5" />;
      case 'History':
        return <History className="w-3.5 h-3.5" />;
      case 'Sliders':
        return <Sliders className="w-3.5 h-3.5" />;
      case 'Briefcase':
        return <Briefcase className="w-3.5 h-3.5" />;
      case 'Compass':
        return <Compass className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const getAcidTheme = (color: string) => {
    switch (color) {
      case 'lime':
        return {
          badge: 'bg-[#ccff00]/15 text-[#ccff00] border-[#ccff00]/50 shadow-[0_0_10px_rgba(204,255,0,0.2)]',
          glowHover: 'group-hover:border-[#ccff00]/70 group-hover:shadow-[0_0_25px_-5px_rgba(204,255,0,0.3)]',
          xp: 'text-[#ccff00]',
          accentBar: 'bg-[#ccff00]',
        };
      case 'cyan':
        return {
          badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
          glowHover: 'group-hover:border-cyan-400/70 group-hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.3)]',
          xp: 'text-cyan-400',
          accentBar: 'bg-cyan-400',
        };
      case 'purple':
        return {
          badge: 'bg-purple-500/15 text-purple-400 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
          glowHover: 'group-hover:border-purple-400/70 group-hover:shadow-[0_0_25px_-5px_rgba(168,85,247,0.3)]',
          xp: 'text-purple-400',
          accentBar: 'bg-purple-400',
        };
      case 'amber':
        return {
          badge: 'bg-amber-500/15 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
          glowHover: 'group-hover:border-amber-400/70 group-hover:shadow-[0_0_25px_-5px_rgba(245,158,11,0.3)]',
          xp: 'text-amber-400',
          accentBar: 'bg-amber-400',
        };
      case 'rose':
        return {
          badge: 'bg-pink-500/15 text-pink-400 border-pink-500/50 shadow-[0_0_10px_rgba(236,72,153,0.2)]',
          glowHover: 'group-hover:border-pink-400/70 group-hover:shadow-[0_0_25px_-5px_rgba(236,72,153,0.3)]',
          xp: 'text-pink-400',
          accentBar: 'bg-pink-400',
        };
      case 'emerald':
      default:
        return {
          badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
          glowHover: 'group-hover:border-emerald-400/70 group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)]',
          xp: 'text-emerald-400',
          accentBar: 'bg-emerald-400',
        };
    }
  };

  const acidTheme = getAcidTheme(article.acidColor || 'lime');

  return (
    <article
      onClick={() => onSelect(article)}
      className={`group relative flex flex-col justify-between bg-[#0e111a] rounded-2xl border border-slate-800/90 hover:border-slate-600 transition-all duration-300 cursor-pointer overflow-hidden ${acidTheme.glowHover}`}
    >
      {/* Top Graphic Banner with Realistic Game Cover */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        {/* Acid gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[#0e111a] via-[#0e111a]/40 to-transparent`} />

        {/* Top bar indicators inside image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${acidTheme.badge}`}>
            {getCategoryIcon(article.iconName)}
            {article.category}
          </span>

          <div className="flex items-center gap-1.5">
            {isRead && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00] bg-black/70 backdrop-blur-md border border-[#ccff00]/40 px-2 py-0.5 rounded-md font-mono">
                <CheckCircle2 className="w-3 h-3 text-[#ccff00]" />
                Leído
              </span>
            )}
            
            <button
              onClick={(e) => onToggleBookmark(article.id, e)}
              className={`p-1.5 rounded-lg backdrop-blur-md transition-colors border ${
                isBookmarked 
                  ? 'text-[#ccff00] bg-black/80 border-[#ccff00]/60' 
                  : 'text-slate-300 bg-black/50 border-slate-700/60 hover:text-white hover:bg-black/80'
              }`}
              title={isBookmarked ? 'Eliminar de guardados' : 'Guardar para después'}
              aria-label={isBookmarked ? 'Eliminar de guardados' : 'Guardar para después'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#ccff00]' : ''}`} />
            </button>
          </div>
        </div>

        {/* XP Badge in corner */}
        <div className="absolute bottom-2.5 right-3 z-10">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-black/80 backdrop-blur-md text-white border border-slate-700/80 px-2 py-0.5 rounded-md">
            <Zap className={`w-3 h-3 ${acidTheme.xp}`} />
            <span className={acidTheme.xp}>+{article.xpReward} XP</span>
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="text-lg sm:text-xl font-bold text-white font-heading leading-snug group-hover:text-[#ccff00] transition-colors mb-2">
            {article.title}
          </h2>

          {/* Subtitle / Summary */}
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 font-normal">
            {article.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono group-hover:border-slate-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 text-slate-500 font-mono">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer: Author & Read Action */}
        <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-7 h-7 rounded-full object-cover border border-slate-700"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-200 truncate max-w-[110px] sm:max-w-[140px]">
                {article.author.name}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {article.date}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {article.readTimeMinutes} min
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 group-hover:bg-[#ccff00] group-hover:text-black group-hover:border-[#ccff00] flex items-center justify-center transition-all shadow-xs">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

