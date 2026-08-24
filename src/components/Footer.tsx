import React from 'react';
import { Gamepad2, ArrowUp, BookOpen, ExternalLink, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/articles';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenArticleBySlug: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenArticleBySlug }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-stone-950 flex items-center justify-center font-bold">
                <Gamepad2 className="w-5 h-5 text-stone-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif-heading">
                Gamifica<span className="text-amber-500">.</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Publicación abierta sobre la teoría formal de juegos, dinámicas de comportamiento, 
              modelo MDA y arquitectura de engagement ético.
            </p>
            <div className="text-[11px] text-stone-500 font-mono">
              ISSN 2984-1029 • Edición Digital 2024
            </div>
          </div>

          {/* Col 2: Ensayos Esenciales */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              Ensayos Clave
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onOpenArticleBySlug('teoria-de-la-gamificacion')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Teoría y Modelo MDA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenArticleBySlug('elementos-relevantes-pbl-narrativa')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  La Tríada PBL y Narrativa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenArticleBySlug('historia-y-evolucion-de-la-gamificacion')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Historia: De Nick Pelling a 2024
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenArticleBySlug('ejemplos-reales-duolingo-nike-run-club-forest')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Análisis: Duolingo, Nike & Forest
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categorías */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Ejes Temáticos
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      const el = document.getElementById('articulos');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Marco Académico y Referencias */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Fundamentos Académicos
            </h4>
            <div className="space-y-2 text-[11px] text-stone-400 leading-relaxed">
              <p>• Deci & Ryan (Teoría de la Autodeterminación)</p>
              <p>• Robin Hunicke et al. (Framework MDA 2004)</p>
              <p>• Mihaly Csíkszentmihályi (Teoría del Flow)</p>
              <p>• Yu-kai Chou (Marco Octalysis)</p>
              <p>• Karl M. Kapp (The Gamification of Learning)</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Gamifica — Todos los derechos reservados. Diseñado con estándares de accesibilidad y tipografía editorial.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
