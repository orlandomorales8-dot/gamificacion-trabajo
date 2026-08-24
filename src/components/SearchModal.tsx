import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Zap } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = articles.filter((art) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q)) ||
      art.category.toLowerCase().includes(q) ||
      art.sections.some(s => s.heading.toLowerCase().includes(q) || s.paragraphs.some(p => p.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center items-start pt-16 sm:pt-24 px-4">
      {/* Click backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#0d101a] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#0a0d16]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por concepto (MDA, PBL, Flow, Duolingo, Nike, Reglas...)"
            className="w-full bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded font-mono border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          {results.length > 0 ? (
            results.map((art) => (
              <button
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="w-full text-left p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800/80 hover:border-[#ccff00]/60 transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                      {art.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {art.readTimeMinutes} min
                    </span>
                    <span className="text-xs text-[#ccff00] font-mono flex items-center gap-0.5">
                      <Zap className="w-3 h-3" />
                      +{art.xpReward} XP
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 group-hover:text-[#ccff00] transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {art.summary}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#ccff00] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 font-mono">
              <p className="text-sm font-medium">No se encontraron resultados para "{query}"</p>
              <p className="text-xs text-slate-600 mt-1">Prueba con "teoria", "pbl", "historia", "salud" o "forest"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0a0d16] border-t border-slate-800 text-[11px] text-slate-500 flex justify-between px-4 font-mono">
          <span>{results.length} artículos encontrados</span>
          <span>Presiona para leer análisis completo</span>
        </div>
      </div>
    </div>
  );
};

