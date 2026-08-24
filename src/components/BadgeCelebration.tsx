import React, { useEffect } from 'react';
import { Award, Sparkles, X, Trophy } from 'lucide-react';
import { Badge } from '../types';

interface BadgeCelebrationProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeCelebration: React.FC<BadgeCelebrationProps> = ({ badge, onClose }) => {
  useEffect(() => {
    if (badge) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-short">
      <div className="bg-stone-900 text-white rounded-2xl p-4 shadow-2xl border border-amber-500/40 flex items-start gap-3.5 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/20 rounded-full blur-xl pointer-events-none" />

        <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-md">
          <Trophy className="w-5 h-5 animate-pulse" />
        </div>

        <div className="flex-1 pr-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-amber-400 mb-0.5">
            <Sparkles className="w-3 h-3" />
            ¡Insignia Desbloqueada!
          </div>
          <h4 className="text-sm font-bold font-serif-heading text-white">
            {badge.title}
          </h4>
          <p className="text-xs text-stone-300 leading-snug mt-0.5">
            {badge.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-stone-400 hover:text-white p-1"
          aria-label="Cerrar notificación"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
