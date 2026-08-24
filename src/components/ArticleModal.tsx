import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Sparkles, 
  BookOpen, 
  Check, 
  Copy, 
  Quote, 
  Brain, 
  ArrowLeft,
  Zap,
  Tag
} from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  allArticles: Article[];
  isBookmarked: boolean;
  isRead: boolean;
  onClose: () => void;
  onToggleBookmark: (articleId: string) => void;
  onMarkAsRead: (article: Article) => void;
  onNavigateToArticle: (article: Article) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  allArticles,
  isBookmarked,
  isRead,
  onClose,
  onToggleBookmark,
  onMarkAsRead,
  onNavigateToArticle,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reset quiz & scroll when article changes
  useEffect(() => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setReadProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [article?.id]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  // Track modal reading scroll progress
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const progress = Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100));
    setReadProgress(progress);
  };

  if (!article) return null;

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '#' + article.slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-sm sm:text-base leading-relaxed';
      case 'lg':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'md':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  const getAcidTheme = (color: string) => {
    switch (color) {
      case 'lime':
        return {
          pill: 'bg-[#ccff00]/15 text-[#ccff00] border-[#ccff00]/50 shadow-[0_0_10px_rgba(204,255,0,0.25)]',
          border: 'border-[#ccff00]/40',
          text: 'text-[#ccff00]',
          bar: 'bg-[#ccff00]',
        };
      case 'cyan':
        return {
          pill: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.25)]',
          border: 'border-cyan-500/40',
          text: 'text-cyan-400',
          bar: 'bg-cyan-400',
        };
      case 'purple':
        return {
          pill: 'bg-purple-500/15 text-purple-400 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.25)]',
          border: 'border-purple-500/40',
          text: 'text-purple-400',
          bar: 'bg-purple-400',
        };
      case 'amber':
        return {
          pill: 'bg-amber-500/15 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.25)]',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          bar: 'bg-amber-400',
        };
      case 'rose':
        return {
          pill: 'bg-pink-500/15 text-pink-400 border-pink-500/50 shadow-[0_0_10px_rgba(236,72,153,0.25)]',
          border: 'border-pink-500/40',
          text: 'text-pink-400',
          bar: 'bg-pink-400',
        };
      case 'emerald':
      default:
        return {
          pill: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.25)]',
          border: 'border-emerald-500/40',
          text: 'text-emerald-400',
          bar: 'bg-emerald-400',
        };
    }
  };

  const acidTheme = getAcidTheme(article.acidColor || 'lime');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-start p-0 sm:p-4 md:p-6 transition-opacity">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Reading Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative z-10 w-full max-w-4xl bg-[#0c0e17] text-slate-100 min-h-screen sm:min-h-[auto] sm:max-h-[92vh] sm:rounded-3xl shadow-2xl border border-slate-800 flex flex-col overflow-y-auto overflow-x-hidden"
      >
        {/* Top Reading Progress Bar */}
        <div className="sticky top-0 left-0 right-0 h-1.5 bg-slate-900 z-30">
          <div
            className="h-full bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.6)] transition-all duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        {/* Modal Sticky Top Header Bar */}
        <div className="sticky top-1.5 z-20 bg-[#0c0e17]/95 backdrop-blur-xl border-b border-slate-800/90 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#ccff00]" />
            <span className="hidden sm:inline">Volver</span>
          </button>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Font Size controls */}
            <div className="hidden sm:flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'sm' ? 'bg-slate-800 font-bold text-[#ccff00]' : 'text-slate-400'}`}
                title="Texto pequeño"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'md' ? 'bg-slate-800 font-bold text-[#ccff00]' : 'text-slate-400'}`}
                title="Texto normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded-lg ${fontSize === 'lg' ? 'bg-slate-800 font-bold text-[#ccff00]' : 'text-slate-400'}`}
                title="Texto grande"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-xl border transition-colors text-xs font-mono flex items-center gap-1.5 ${
                isBookmarked 
                  ? 'bg-slate-900 text-[#ccff00] border-[#ccff00]/60 shadow-[0_0_10px_rgba(204,255,0,0.2)]' 
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Guardado en marcadores' : 'Guardar en marcadores'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#ccff00]' : ''}`} />
              <span className="hidden md:inline">{isBookmarked ? 'Guardado' : 'Guardar'}</span>
            </button>

            {/* Share / Copy button */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Copiar enlace"
            >
              {copied ? <Check className="w-4 h-4 text-[#ccff00]" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span className="hidden md:inline">{copied ? 'Copiado' : 'Compartir'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
              aria-label="Cerrar artículo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Realistic Video Game Cover Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover object-center opacity-75"
          />
          {/* Cyber scanline effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e17] via-[#0c0e17]/60 to-transparent" />

          {/* Banner bottom chips */}
          <div className="absolute bottom-6 left-5 sm:left-10 right-5 sm:right-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md border ${acidTheme.pill}`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                {article.readTimeMinutes} min de lectura
              </span>
            </div>

            <span className="flex items-center gap-1 text-xs font-mono font-bold text-[#ccff00] bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-[#ccff00]/40 shadow-[0_0_12px_rgba(204,255,0,0.25)]">
              <Zap className="w-3.5 h-3.5 text-[#ccff00]" />
              +{article.xpReward} XP
            </span>
          </div>
        </div>

        {/* Article Body Content */}
        <article className="px-5 sm:px-10 lg:px-16 py-6 sm:py-8 max-w-3xl mx-auto w-full">
          
          {/* Article Header Metadata */}
          <div className="mb-8 pb-8 border-b border-slate-800">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading leading-[1.12] mb-4">
              {article.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-6">
              {article.subtitle}
            </p>

            {/* Author card */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{article.author.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">{article.author.role}</p>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Publicado el {article.date}
              </div>
            </div>
          </div>

          {/* Key Takeaways Box in Acid Neon Theme */}
          <div className="my-8 p-6 bg-slate-900/90 border border-slate-800 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/10 rounded-full blur-xl pointer-events-none" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ccff00] flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#ccff00]" />
              Puntos Clave del Ensayo
            </h3>
            <ul className="space-y-2.5">
              {article.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] mt-2 shrink-0 shadow-[0_0_6px_rgba(204,255,0,0.8)]" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className={`space-y-10 text-slate-200 font-normal ${getFontSizeClass()}`}>
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight pt-2 border-b border-slate-800/80 pb-2">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Key Points List */}
                {section.keyPoints && (
                  <div className="my-4 pl-4 border-l-2 border-[#ccff00]/60 space-y-2 bg-slate-900/40 p-3 rounded-r-xl">
                    {section.keyPoints.map((point, kIdx) => (
                      <p key={kIdx} className="text-sm sm:text-base text-slate-200 font-medium">
                        • {point}
                      </p>
                    ))}
                  </div>
                )}

                {/* Styled Quote */}
                {section.quote && (
                  <figure className="my-6 p-6 bg-slate-900/80 rounded-2xl border-l-4 border-cyan-400 border-t border-r border-b border-slate-800 shadow-lg">
                    <Quote className="w-6 h-6 text-cyan-400 mb-2" />
                    <blockquote className="text-base sm:text-lg italic text-slate-100 mb-2 font-serif">
                      "{section.quote.text}"
                    </blockquote>
                    <figcaption className="text-xs font-mono font-bold text-cyan-400">
                      — {section.quote.author}
                    </figcaption>
                  </figure>
                )}

                {/* Highlight Callout Box */}
                {section.highlightBox && (
                  <div className="my-6 p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
                    {section.highlightBox.tag && (
                      <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 mb-2">
                        {section.highlightBox.tag}
                      </span>
                    )}
                    <h4 className="text-base font-bold text-white mb-1">
                      {section.highlightBox.title}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {section.highlightBox.description}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive Comprehension Quiz */}
          {article.quiz && (
            <div className="my-12 p-6 sm:p-8 bg-[#090b12] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#ccff00]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#ccff00]">
                  <Brain className="w-4 h-4 text-[#ccff00]" />
                  Comprueba tu Comprensión
                </span>
                <span className="text-xs font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">+30 XP Extra</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-5">
                {article.quiz.question}
              </h3>

              <div className="space-y-2.5 mb-5">
                {article.quiz.options.map((option, oIdx) => {
                  const isSelected = selectedQuizOption === oIdx;
                  const isCorrect = oIdx === article.quiz?.correctAnswer;
                  
                  let optionStyles = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      optionStyles = 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'bg-rose-950 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-slate-800 border-[#ccff00] text-white shadow-[0_0_10px_rgba(204,255,0,0.25)]';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedQuizOption(oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl text-sm border transition-all flex items-start gap-3 ${optionStyles}`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isSelected ? 'bg-[#ccff00] text-black' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="pt-0.5 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={selectedQuizOption === null}
                  onClick={() => {
                    setQuizSubmitted(true);
                    if (selectedQuizOption === article.quiz?.correctAnswer) {
                      onMarkAsRead(article);
                    }
                  }}
                  className="w-full py-3 bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] disabled:opacity-40 cursor-pointer"
                >
                  Verificar Respuesta
                </button>
              ) : (
                <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  selectedQuizOption === article.quiz.correctAnswer
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/50'
                    : 'bg-rose-950/80 text-rose-300 border border-rose-700/50'
                }`}>
                  <p className="font-bold mb-1">
                    {selectedQuizOption === article.quiz.correctAnswer ? '¡Excelente deducción!' : 'Respuesta incorrecta:'}
                  </p>
                  <p>{article.quiz.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Mark as read completion trigger */}
          <div className="my-8 p-6 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-[#ccff00]/40 text-[#ccff00] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(204,255,0,0.2)]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isRead ? 'Lectura completada' : '¿Terminaste de leer el artículo?'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isRead ? `Has ganado +${article.xpReward} XP para tu nivel de lector.` : 'Registra tu progreso para ganar puntos de experiencia e insignias.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onMarkAsRead(article)}
              className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                isRead
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                  : 'bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isRead ? 'text-emerald-400' : 'text-black'}`} />
              {isRead ? 'Leído ✓' : 'Marcar como Leído'}
            </button>
          </div>

          {/* References Section */}
          <div className="pt-8 border-t border-slate-800 text-xs text-slate-400">
            <h4 className="font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
              Referencias y Bibliografía
            </h4>
            <ul className="space-y-1.5 font-mono text-[11px] text-slate-500">
              {article.references.map((ref, idx) => (
                <li key={idx}>[{idx + 1}] {ref}</li>
              ))}
            </ul>
          </div>

          {/* Previous / Next Article Navigation Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-slate-800">
            {prevArticle ? (
              <button
                onClick={() => onNavigateToArticle(prevArticle)}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:shadow-lg transition-all text-left flex items-start gap-3 group cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-[#ccff00] group-hover:-translate-x-1 transition-transform shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Artículo Anterior</span>
                  <p className="text-sm font-bold text-white group-hover:text-[#ccff00] line-clamp-1">
                    {prevArticle.title}
                  </p>
                </div>
              </button>
            ) : <div />}

            {nextArticle && (
              <button
                onClick={() => onNavigateToArticle(nextArticle)}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:shadow-lg transition-all text-right flex items-start justify-end gap-3 group sm:col-start-2 cursor-pointer"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Siguiente Artículo</span>
                  <p className="text-sm font-bold text-white group-hover:text-[#ccff00] line-clamp-1">
                    {nextArticle.title}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#ccff00] group-hover:translate-x-1 transition-transform shrink-0 mt-0.5" />
              </button>
            )}
          </div>

        </article>

      </div>
    </div>
  );
};

