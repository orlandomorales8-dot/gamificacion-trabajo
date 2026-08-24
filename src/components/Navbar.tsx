import React, { useState } from 'react';
import { 
  Gamepad2, 
  Bookmark, 
  Search, 
  Sparkles, 
  Menu, 
  X, 
  BookOpen,
  Award
} from 'lucide-react';
import { ReaderStats } from '../types';

interface NavbarProps {
  stats: ReaderStats;
  onOpenBookmarks: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  onOpenBookmarks,
  onOpenSearch,
  onSelectCategory,
  activeCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLevelInfo = (xp: number) => {
    if (xp >= 500) return { level: 4, name: 'Maestro Ludólogo', progress: 100 };
    if (xp >= 300) return { level: 3, name: 'Diseñador Senior', progress: ((xp - 300) / 200) * 100 };
    if (xp >= 100) return { level: 2, name: 'Analista Lúdico', progress: ((xp - 100) / 200) * 100 };
    return { level: 1, name: 'Lector Novato', progress: (xp / 100) * 100 };
  };

  const currentLevel = getLevelInfo(stats.xp);

  const navLinks = [
    { name: 'Inicio', category: 'Todos', anchor: '#inicio' },
    { name: 'Teoría', category: 'Teoría', anchor: '#articulos' },
    { name: 'Mecánicas', category: 'Mecánicas', anchor: '#articulos' },
    { name: 'Historia', category: 'Historia', anchor: '#articulos' },
    { name: 'Casos Reales', category: 'Casos Reales', anchor: '#articulos' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0c14]/90 backdrop-blur-xl border-b border-slate-800/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <a 
              href="#inicio" 
              className="flex items-center gap-3 group"
              onClick={() => onSelectCategory('Todos')}
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#ccff00]/40 text-[#ccff00] flex items-center justify-center shadow-[0_0_15px_-3px_rgba(204,255,0,0.3)] group-hover:border-[#ccff00] group-hover:shadow-[0_0_25px_0_rgba(204,255,0,0.5)] transition-all">
                <Gamepad2 className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider text-white font-cyber flex items-center">
                  GAMIFICA<span className="text-[#ccff00] animate-pulse">.</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-slate-400">
                  Game Design & UX Lab
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.category;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    onSelectCategory(link.category);
                    const el = document.getElementById('articulos');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono transition-all ${
                    isActive
                      ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border border-transparent hover:border-slate-700'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Search, Bookmarks, Gamification Level */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl text-xs transition-colors border border-slate-800 bg-slate-900/80 hover:border-slate-700"
              title="Buscar artículos"
              aria-label="Buscar artículos"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline text-xs text-slate-400 font-mono">Buscar...</span>
              <kbd className="hidden lg:inline text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>

            {/* Bookmarks Counter */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors border border-slate-800 bg-slate-900/80 hover:border-slate-700"
              title="Artículos Guardados"
              aria-label="Artículos Guardados"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              {stats.bookmarkedIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ccff00] text-black text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(204,255,0,0.6)] font-mono">
                  {stats.bookmarkedIds.length}
                </span>
              )}
            </button>

            {/* Reader Level Badge / XP Tracker */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2.5 border-l border-slate-800">
              <div className="flex flex-col items-end text-right">
                <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1 font-mono uppercase tracking-wide">
                  <Award className="w-3.5 h-3.5 text-[#ccff00]" />
                  LVL {currentLevel.level}
                </span>
                <span className="text-[10px] text-cyan-400 font-mono font-semibold">
                  {stats.xp} XP
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#ccff00]/30 flex items-center justify-center text-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.15)]">
                <Sparkles className="w-4 h-4 text-[#ccff00]" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
              aria-label="Alternar menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0a0c14] px-4 pt-3 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onSelectCategory(link.category);
                  setMobileMenuOpen(false);
                  const el = document.getElementById('articulos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left px-3 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider ${
                  activeCategory === link.category
                    ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.4)]'
                    : 'text-slate-300 bg-slate-900 border border-slate-800'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#ccff00]" />
              <span className="text-xs font-semibold text-slate-300">
                {stats.readArticleIds.length} de 6 leídos
              </span>
            </div>
            <span className="text-xs font-bold text-[#ccff00] font-mono bg-slate-900 px-2 py-0.5 rounded border border-[#ccff00]/40">
              {stats.xp} XP
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
