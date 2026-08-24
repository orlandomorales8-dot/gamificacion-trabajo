import React from 'react';
import { X, Bookmark, Trash2, ArrowUpRight, BookOpen } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#faf9f6] h-full shadow-2xl border-l border-stone-300 flex flex-col">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-700 fill-amber-700" />
            <h3 className="text-lg font-bold font-serif-heading text-stone-900">
              Lecturas Guardadas
            </h3>
            <span className="text-xs bg-amber-100 text-amber-800 font-mono px-2 py-0.5 rounded-full font-bold">
              {bookmarkedArticles.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
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
                className="group p-4 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between gap-3"
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                >
                  <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700 mb-1.5">
                    {art.category}
                  </span>
                  <h4 className="text-sm font-bold font-serif-heading text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {art.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-400">
                  <span>{art.readTimeMinutes} min de lectura</span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRemoveBookmark(art.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Eliminar de guardados"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        onSelectArticle(art);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 font-semibold text-stone-900 group-hover:text-amber-800"
                    >
                      <span>Leer</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-stone-400">
              <BookOpen className="w-10 h-10 mx-auto text-stone-300 mb-3" />
              <p className="text-sm font-semibold text-stone-600">Aún no tienes artículos guardados</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto mt-1">
                Haz clic en el icono de marcador en cualquier tarjeta para leerla más tarde.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-white flex justify-between items-center text-xs">
            <button
              onClick={onClearAll}
              className="text-stone-500 hover:text-rose-600 font-medium transition-colors"
            >
              Vaciar lista
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-semibold"
            >
              Cerrar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
