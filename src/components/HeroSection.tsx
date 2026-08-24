import React from 'react';
import { Sparkles, Compass, BookOpen, Zap, Target, Flame } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onSelectCategory: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onSelectCategory }) => {
  return (
    <section id="inicio" className="relative py-12 md:py-18 border-b border-slate-800/80 overflow-hidden">
      {/* Subtle grid and cyber glow accents */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          
          {/* Tag / Eyebrow with Acid Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-[#ccff00]/40 text-[#ccff00] text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(204,255,0,0.15)]">
            <Zap className="w-3.5 h-3.5 text-[#ccff00] animate-bounce-short" />
            <span>Laboratorio de Gamificación & Psicología Lúdica</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-[1.08] mb-6">
            La arquitectura de la motivación, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-cyan-400 to-purple-400">mecánicas lúdicas</span> y retención.
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl">
            Explora los modelos psicológicos y las mecánicas de videojuegos que impulsan el comportamiento humano: el marco formal <strong className="text-white">MDA</strong>, la tríada <strong className="text-[#ccff00]">PBL</strong>, el canal de <strong className="text-cyan-400">Flow</strong> y el análisis de casos líderes de la industria.
          </p>

          {/* Action buttons & Quick Tags */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ccff00] text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#b8e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] active:scale-98 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-black" />
              Explorar las 6 Publicaciones
            </button>
            
            <button
              onClick={() => onSelectCategory('Casos Reales')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-mono font-semibold uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              Casos Reales: Duolingo, Nike & Forest
            </button>
          </div>

          {/* Key Metric Highlights in Cyber Cards */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-10 pt-8 border-t border-slate-800 max-w-xl">
            <div className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-3 sm:p-4">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#ccff00] font-cyber">6</span>
              <span className="text-[11px] text-slate-400 font-mono">Ensayos Clave</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-3 sm:p-4">
              <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 font-cyber">MDA+PBL</span>
              <span className="text-[11px] text-slate-400 font-mono">Modelos Teóricos</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-3 sm:p-4">
              <span className="block text-2xl sm:text-3xl font-extrabold text-purple-400 font-cyber">100%</span>
              <span className="text-[11px] text-slate-400 font-mono">XP Interactivo</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

