import React from 'react';
import { Sparkles, Compass, BookOpen, Layers } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onSelectCategory: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onSelectCategory }) => {
  return (
    <section id="inicio" className="relative py-12 md:py-16 border-b border-stone-200/80 overflow-hidden">
      {/* Subtle geometric pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl">
          
          {/* Tag / Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-900 text-xs font-semibold mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Publicación Especializada en Diseño Conductual y Lúdico</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 font-serif-heading leading-[1.12] mb-6">
            La arquitectura de la motivación y la <span className="italic font-normal text-amber-800">gamificación</span>.
          </h1>

          {/* Subtitle / Paragraph */}
          <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-normal mb-8 max-w-2xl">
            Un compendio reflexivo y riguroso sobre cómo los principios del juego, 
            el modelo MDA y las dinámicas PBL transforman la interacción humana en productos de alta retención.
          </p>

          {/* Action buttons & Quick Tags */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 text-stone-50 text-sm font-semibold hover:bg-stone-800 transition-all shadow-xs hover:shadow-md active:scale-98"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              Explorar las 6 Publicaciones
            </button>
            
            <button
              onClick={() => onSelectCategory('Casos Reales')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-50 hover:text-stone-950 transition-all"
            >
              <Compass className="w-4 h-4 text-stone-500" />
              Casos Reales: Duolingo, Nike & Forest
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-stone-200/60 max-w-xl">
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-stone-900 font-serif-heading">6</span>
              <span className="text-xs text-stone-500 font-medium">Ensayos Fundamentales</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-stone-900 font-serif-heading">MDA & PBL</span>
              <span className="text-xs text-stone-500 font-medium">Modelos y Frameworks</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-bold text-stone-900 font-serif-heading">100%</span>
              <span className="text-xs text-stone-500 font-medium">Lectura Interactiva</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
