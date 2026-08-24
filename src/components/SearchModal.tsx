import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Tag } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex justify-center items-start pt-16 sm:pt-24 px-4">
      {/* Click backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#faf9f6] rounded-2xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por concepto (MDA, PBL, Flow, Duolingo, Nike...)"
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-2 py-1 rounded font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {results.length > 0 ? (
            results.map((art) => (
              <button
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="w-full text-left p-3.5 rounded-xl bg-white hover:bg-amber-50/50 border border-stone-200/80 hover:border-amber-300 transition-all flex items-start justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                      {art.category}
                    </span>
                    <span className="text-xs text-stone-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {art.readTimeMinutes} min
                    </span>
                  </div>
                  <h4 className="text-sm font-bold font-serif-heading text-stone-900 group-hover:text-amber-900">
                    {art.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-1">
                    {art.summary}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-stone-400">
              <p className="text-sm font-medium">No se encontraron resultados para "{query}"</p>
              <p className="text-xs text-stone-400 mt-1">Prueba con "teoria", "pbl", "historia", "salud" o "forest"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100/70 border-t border-stone-200 text-[11px] text-stone-500 flex justify-between px-4">
          <span>{results.length} artículos encontrados</span>
          <span>Navega y haz clic para leer el artículo completo</span>
        </div>
      </div>
    </div>
  );
};
