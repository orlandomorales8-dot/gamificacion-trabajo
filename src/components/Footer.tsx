import React from 'react';
import { Gamepad2, ArrowUp, BookOpen, Zap, Mail, User, GraduationCap, Building2 } from 'lucide-react';
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

        {/* Professional & Academic Accreditation Card */}
        <div className="my-10 p-5 rounded-2xl bg-[#0b0e1a] border border-slate-800/90 shadow-[0_4px_25px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#ccff00]" />
          
          {/* Author & Academic Info */}
          <div className="flex items-start sm:items-center gap-4 pl-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 text-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.15)]">
              <User className="w-6 h-6" />
            </div>

            <div className="space-y-1 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-white font-cyber tracking-wide">
                  Orlando Morales Muñoz
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30 font-bold uppercase">
                  Autor del Blog
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-sans">
                <a 
                  href="mailto:orlandomorales8@gmail.com" 
                  className="flex items-center gap-1.5 hover:text-[#ccff00] transition-colors text-slate-300 font-mono"
                  title="Enviar correo a Orlando Morales Muñoz"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>orlandomorales8@gmail.com</span>
                </a>

                <span className="hidden sm:inline text-slate-700">•</span>

                <div className="flex items-center gap-1.5 text-slate-300">
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Electiva de gamificación — Docente: <strong>Jhon Sandoval</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* University Badge / Logo Placeholder */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0">
            {/* University Logo Placeholder */}
            <div className="w-9 h-9 rounded-lg bg-white/5 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="https://www.ibero.edu.co/wp-content/uploads/2022/04/cropped-favicon-32x32.png" 
                alt="Logo Ibero Colombia" 
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling;
                  if (fallback) (fallback as HTMLElement).style.display = 'flex';
                }}
              />
              <div style={{ display: 'none' }} className="w-full h-full items-center justify-center text-[#ccff00] font-bold text-xs font-cyber">
                <Building2 className="w-4 h-4" />
              </div>
            </div>

            <div className="text-left font-mono">
              <div className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1">
                <span>Universidad Ibero</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">COL</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                Corporación Universitaria Iberoamericana
              </p>
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

