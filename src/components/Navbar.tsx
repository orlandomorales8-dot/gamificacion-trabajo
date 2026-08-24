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
    <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <a 
              href="#inicio" 
              className="flex items-center gap-2.5 group"
              onClick={() => onSelectCategory('Todos')}
            >
              <div className="w-10 h-10 rounded-xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-xs group-hover:bg-amber-700 transition-colors">
                <Gamepad2 className="w-5 h-5 text-amber-300 transition-transform group-hover:rotate-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-stone-900 font-serif-heading">
                  Gamifica<span className="text-amber-700">.</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-500">
                  Pensamiento Lúdico & UX
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
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
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-stone-900 text-stone-50 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
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
              className="flex items-center gap-2 px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg text-sm transition-colors border border-stone-200/60 bg-stone-50/50"
              title="Buscar artículos"
              aria-label="Buscar artículos"
            >
              <Search className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline text-xs text-stone-500">Buscar...</span>
              <kbd className="hidden lg:inline text-[10px] bg-stone-200/70 text-stone-600 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>

            {/* Bookmarks Counter */}
            <button
              onClick={onOpenBookmarks}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200/60 bg-stone-50/50"
              title="Artículos Guardados"
              aria-label="Artículos Guardados"
            >
              <Bookmark className="w-4 h-4 text-stone-700" />
              {stats.bookmarkedIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {stats.bookmarkedIds.length}
                </span>
              )}
            </button>

            {/* Reader Level Badge / XP Tracker */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-stone-200">
              <div className="flex flex-col items-end text-right">
                <span className="text-[11px] font-semibold text-stone-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  Nivel {currentLevel.level}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  {stats.xp} XP
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-800">
                <Sparkles className="w-4 h-4 text-amber-700" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
              aria-label="Alternar menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#faf9f6] px-4 pt-3 pb-5 space-y-3">
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
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === link.category
                    ? 'bg-stone-900 text-stone-50'
                    : 'text-stone-700 bg-stone-100/70'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-semibold text-stone-800">
                {stats.readArticleIds.length} de 6 artículos leídos
              </span>
            </div>
            <span className="text-xs font-bold text-amber-700 font-mono bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
              {stats.xp} XP
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
