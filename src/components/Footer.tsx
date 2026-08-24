import React from 'react';
import { Gamepad2, ArrowUp, BookOpen, ExternalLink, Zap } from 'lucide-react';
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
    <footer className="bg-[#07090f] text-slate-400 pt-16 pb-12 border-t border-slate-800/80 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#ccff00]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Manifesto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#ccff00] text-black flex items-center justify-center font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                <Gamepad2 className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-cyber">
                GAMIFICA<span className="text-[#ccff00]">.</span>DEV
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Publicación abierta sobre la teoría formal de juegos, dinámicas de comportamiento, 
              modelo MDA y arquitectura de engagement ético.
            </p>
            <div className="text-[11px] text-cyan-400 font-mono flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-[#ccff00]" />
              Edición Cyberpunk 2026 • Blog Gamificado
            </div>
          </div>

          {/* Col 2: Ensayos Esenciales */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#ccff00]" />
              Ensayos Clave
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li>
                <button
                  onClick={() => onOpenArticleBySlug('teoria-de-la-gamificacion')}
                  className="hover:text-[#ccff00] transition-colors text-left cursor-pointer"
                >
                  Teoría y Modelo MDA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenArticleBySlug('elementos-relevantes-pbl-narrativa')}
                  className="hover:text-[#ccff00] transition-colors text-left cursor-pointer"
                >
                  La Tríada PBL y Narrativa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenArticleBySlug('historia-y-evolucion-de-la-gamificacion')}
                  className="hover:text-[#ccff00] transition-colors text-left cursor-pointer"
                >
                  Historia: De Nick Pelling a 2024
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenArticleBySlug('ejemplos-reales-duolingo-nike-run-club-forest')}
                  className="hover:text-[#ccff00] transition-colors text-left cursor-pointer"
                >
                  Análisis: Duolingo, Nike & Forest
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categorías */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Ejes Temáticos
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      const el = document.getElementById('articulos');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#ccff00] transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Marco Académico y Referencias */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 mb-4">
              Fundamentos Académicos
            </h4>
            <div className="space-y-2 text-[11px] text-slate-400 leading-relaxed font-mono">
              <p className="text-slate-300">• Deci & Ryan (Autodeterminación)</p>
              <p>• Robin Hunicke et al. (Framework MDA)</p>
              <p>• Mihaly Csíkszentmihályi (Teoría del Flow)</p>
              <p>• Yu-kai Chou (Marco Octalysis)</p>
              <p>• Karl M. Kapp (Gamification of Learning)</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} GAMIFICA.DEV — Blog interactivo de diseño y mecánicas lúdicas.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#ccff00] hover:border-[#ccff00]/40 transition-colors cursor-pointer"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

