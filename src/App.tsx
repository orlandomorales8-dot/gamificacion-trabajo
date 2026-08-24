import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ArticleGrid } from './components/ArticleGrid';
import { Sidebar } from './components/Sidebar';
import { ArticleModal } from './components/ArticleModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { SearchModal } from './components/SearchModal';
import { BadgeCelebration } from './components/BadgeCelebration';
import { Footer } from './components/Footer';
import { ARTICLES, INITIAL_BADGES } from './data/articles';
import { Article, ReaderStats, Badge } from './types';

const STATS_STORAGE_KEY = 'gamifica_reader_stats_v1';

export default function App() {
  // 1. Initial State with localStorage hydration
  const [stats, setStats] = useState<ReaderStats>(() => {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return {
      xp: 0,
      level: 1,
      levelTitle: 'Lector Novato',
      readArticleIds: [],
      bookmarkedIds: [],
      completedQuizzes: [],
      badges: INITIAL_BADGES,
    };
  });

  // 2. Active view & modal state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [unlockedBadgeToast, setUnlockedBadgeToast] = useState<Badge | null>(null);

  // Sync stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Handle URL hash on initial load (e.g., #duolingo-nike-run-club)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const matched = ARTICLES.find((a) => a.slug === hash || a.id === hash);
      if (matched) {
        setSelectedArticle(matched);
      }
    }
  }, []);

  // Global Keyboard shortcuts: Cmd+K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update URL hash when article modal opens/closes
  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    window.history.replaceState(null, '', `#${article.slug}`);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    window.history.replaceState(null, '', window.location.pathname);
  };

  // Toggle bookmarking
  const handleToggleBookmark = (articleId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setStats((prev) => {
      const isBookmarked = prev.bookmarkedIds.includes(articleId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedIds.filter((id) => id !== articleId)
        : [...prev.bookmarkedIds, articleId];

      return {
        ...prev,
        bookmarkedIds: newBookmarks,
      };
    });
  };

  const handleRemoveBookmark = (articleId: string) => {
    setStats((prev) => ({
      ...prev,
      bookmarkedIds: prev.bookmarkedIds.filter((id) => id !== articleId),
    }));
  };

  const handleClearAllBookmarks = () => {
    setStats((prev) => ({
      ...prev,
      bookmarkedIds: [],
    }));
  };

  // Mark article as read + calculate XP + check badge unlocks
  const handleMarkAsRead = (article: Article) => {
    if (stats.readArticleIds.includes(article.id)) {
      return;
    }

    setStats((prev) => {
      const newReadIds = [...prev.readArticleIds, article.id];
      const newXp = prev.xp + article.xpReward;
      
      // Determine new rank
      let newLevel = 1;
      let newTitle = 'Lector Novato';
      if (newXp >= 500) {
        newLevel = 4;
        newTitle = 'Maestro Ludólogo';
      } else if (newXp >= 300) {
        newLevel = 3;
        newTitle = 'Diseñador Senior';
      } else if (newXp >= 100) {
        newLevel = 2;
        newTitle = 'Analista Lúdico';
      }

      // Check badge triggers
      let newlyUnlockedBadge: Badge | null = null;
      const updatedBadges = prev.badges.map((badge) => {
        if (badge.unlocked) return badge;

        let shouldUnlock = false;
        if (badge.id === 'first-read' && newReadIds.length >= 1) {
          shouldUnlock = true;
        } else if (badge.id === 'theory-master' && article.id === 'art-1-teoria') {
          shouldUnlock = true;
        } else if (badge.id === 'pbl-architect' && article.id === 'art-2-elementos') {
          shouldUnlock = true;
        } else if (badge.id === 'historian' && article.id === 'art-3-historia') {
          shouldUnlock = true;
        } else if (badge.id === 'case-analyst' && article.id === 'art-6-ejemplos') {
          shouldUnlock = true;
        } else if (badge.id === 'grand-ludologist' && newReadIds.length >= 6) {
          shouldUnlock = true;
        }

        if (shouldUnlock) {
          const unlockedBadge = { ...badge, unlocked: true, unlockedAt: new Date().toISOString() };
          newlyUnlockedBadge = unlockedBadge;
          return unlockedBadge;
        }
        return badge;
      });

      if (newlyUnlockedBadge) {
        setUnlockedBadgeToast(newlyUnlockedBadge);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        levelTitle: newTitle,
        readArticleIds: newReadIds,
        badges: updatedBadges,
      };
    });
  };

  const bookmarkedArticles = ARTICLES.filter((a) => stats.bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col font-sans">
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        stats={stats}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchQuery('');
        }}
        activeCategory={selectedCategory}
      />

      {/* 2. Hero Section */}
      <HeroSection
        onExplore={() => {
          const el = document.getElementById('articulos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('articulos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Main Content Container: Grid (left) + Sidebar (right) */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Grid: 8 Cols on Large Screens */}
          <div className="lg:col-span-8 space-y-8">
            <ArticleGrid
              articles={ARTICLES}
              bookmarkedIds={stats.bookmarkedIds}
              readArticleIds={stats.readArticleIds}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectArticle={handleOpenArticle}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>

          {/* Interactive Sidebar: 4 Cols on Large Screens */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                articles={ARTICLES}
                stats={stats}
                onSelectArticle={handleOpenArticle}
              />
            </div>
          </div>

        </div>
      </main>

      {/* 4. Reading Modal / Overlay Reader */}
      <ArticleModal
        article={selectedArticle}
        allArticles={ARTICLES}
        isBookmarked={selectedArticle ? stats.bookmarkedIds.includes(selectedArticle.id) : false}
        isRead={selectedArticle ? stats.readArticleIds.includes(selectedArticle.id) : false}
        onClose={handleCloseArticle}
        onToggleBookmark={(id) => handleToggleBookmark(id)}
        onMarkAsRead={handleMarkAsRead}
        onNavigateToArticle={handleOpenArticle}
      />

      {/* 5. Bookmarks Slide-over Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedArticles={bookmarkedArticles}
        onSelectArticle={handleOpenArticle}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllBookmarks}
      />

      {/* 6. Quick Search Dialog / Command Palette */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleOpenArticle}
      />

      {/* 7. Badge Unlock Toast Celebration */}
      <BadgeCelebration
        badge={unlockedBadgeToast}
        onClose={() => setUnlockedBadgeToast(null)}
      />

      {/* 8. Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenArticleBySlug={(slug) => {
          const art = ARTICLES.find((a) => a.slug === slug);
          if (art) handleOpenArticle(art);
        }}
      />

    </div>
  );
}
