import React from 'react';
import { X, Bookmark, Trash2, ArrowUpRight, BookOpen, Zap } from 'lucide-react';
import { Article } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#0c0e18] text-slate-100 h-full shadow-2xl border-l border-slate-800 flex flex-col">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#090b12]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#ccff00] fill-[#ccff00]" />
            <h3 className="text-base font-bold text-white font-cyber uppercase tracking-wide">
              Lecturas Guardadas
            </h3>
            <span className="text-xs bg-slate-800 text-[#ccff00] font-mono px-2 py-0.5 rounded-full font-bold border border-[#ccff00]/40">
              {bookmarkedArticles.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {bookmarkedArticles.length > 0 ? (
            bookmarkedArticles.map((art) => (
              <div
                key={art.id}
                className="group p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-[#ccff00]/60 hover:shadow-lg transition-all flex flex-col justify-between gap-3"
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                      {art.category}
                    </span>
                    <span className="text-xs text-[#ccff00] font-mono flex items-center gap-0.5">
                      <Zap className="w-3 h-3" />
                      +{art.xpReward} XP
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-slate-800 text-xs font-mono text-slate-500">
                  <span>{art.readTimeMinutes} min de lectura</span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveBookmark(art.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Eliminar de guardados"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 font-bold text-[#ccff00] hover:text-white"
                    >
                      <span>Leer</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-slate-500 font-mono">
              <BookOpen className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-semibold text-slate-300">Aún no tienes artículos guardados</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 font-sans">
                Haz clic en el icono de marcador en cualquier tarjeta para guardarla en tu inventario.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-[#090b12] flex justify-between items-center text-xs font-mono">
            <button
              onClick={onClearAll}
              className="text-slate-400 hover:text-rose-400 transition-colors"
            >
              Vaciar lista
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black rounded-xl font-bold uppercase tracking-wider"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

