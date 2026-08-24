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
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Article, ReaderStats } from '../types';

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
        return 'text-base sm:text-base leading-relaxed';
      case 'lg':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'md':
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex justify-center items-start p-0 sm:p-4 md:p-6 transition-opacity">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Reading Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative z-10 w-full max-w-4xl bg-[#faf9f6] min-h-screen sm:min-h-[auto] sm:max-h-[92vh] sm:rounded-3xl shadow-2xl border border-stone-300/80 flex flex-col overflow-y-auto overflow-x-hidden"
      >
        {/* Top Reading Progress Bar */}
        <div className="sticky top-0 left-0 right-0 h-1.5 bg-stone-200 z-30">
          <div
            className="h-full bg-amber-600 transition-all duration-150"
            style={{ width: `${readProgress}%` }}
          />
        </div>

        {/* Modal Sticky Top Header Bar */}
        <div className="sticky top-1.5 z-20 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-950 px-2.5 py-1.5 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver a Artículos</span>
          </button>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            {/* Font Size controls */}
            <div className="hidden sm:flex items-center bg-stone-100 rounded-lg p-0.5 border border-stone-200 text-xs">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1 rounded ${fontSize === 'sm' ? 'bg-white shadow-2xs font-bold text-stone-900' : 'text-stone-500'}`}
                title="Texto pequeño"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('md')}
                className={`px-2 py-1 rounded ${fontSize === 'md' ? 'bg-white shadow-2xs font-bold text-stone-900' : 'text-stone-500'}`}
                title="Texto normal"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1 rounded ${fontSize === 'lg' ? 'bg-white shadow-2xs font-bold text-stone-900' : 'text-stone-500'}`}
                title="Texto grande"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2 rounded-lg border transition-colors text-xs flex items-center gap-1.5 ${
                isBookmarked 
                  ? 'bg-amber-100/80 text-amber-900 border-amber-300' 
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
              title={isBookmarked ? 'Guardado en marcadores' : 'Guardar en marcadores'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-700' : ''}`} />
              <span className="hidden md:inline">{isBookmarked ? 'Guardado' : 'Guardar'}</span>
            </button>

            {/* Share / Copy button */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs flex items-center gap-1.5 transition-colors"
              title="Copiar enlace"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden md:inline">{copied ? 'Copiado' : 'Compartir'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-200/70 rounded-xl transition-colors"
              aria-label="Cerrar artículo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <article className="px-5 sm:px-10 lg:px-16 py-8 sm:py-12 max-w-3xl mx-auto w-full">
          
          {/* Article Header Metadata */}
          <div className="mb-8 pb-8 border-b border-stone-200/80">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-900 text-stone-50">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                {article.readTimeMinutes} min de lectura
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 font-mono">
                <Sparkles className="w-3 h-3 text-amber-700" />
                +{article.xpReward} XP
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-950 font-serif-heading leading-[1.15] mb-4">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed mb-6">
              {article.subtitle}
            </p>

            {/* Author card */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{article.author.name}</h4>
                  <p className="text-xs text-stone-500">{article.author.role}</p>
                </div>
              </div>
              <div className="text-xs text-stone-400 font-mono">
                Publicado el {article.date}
              </div>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="my-8 p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-3">
              <BookOpen className="w-4 h-4 text-amber-700" />
              Puntos Clave del Ensayo
            </h3>
            <ul className="space-y-2.5">
              {article.takeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-800 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Sections */}
          <div className={`space-y-10 text-stone-800 font-normal ${getFontSizeClass()}`}>
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif-heading tracking-tight pt-2">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-stone-700 leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Key Points List */}
                {section.keyPoints && (
                  <div className="my-4 pl-4 border-l-2 border-stone-300 space-y-2">
                    {section.keyPoints.map((point, kIdx) => (
                      <p key={kIdx} className="text-sm sm:text-base text-stone-800 font-medium">
                        • {point}
                      </p>
                    ))}
                  </div>
                )}

                {/* Styled Quote */}
                {section.quote && (
                  <figure className="my-6 p-6 bg-stone-100/80 rounded-2xl border-l-4 border-amber-700">
                    <Quote className="w-6 h-6 text-amber-700/60 mb-2" />
                    <blockquote className="text-base sm:text-lg font-serif italic text-stone-900 mb-2">
                      "{section.quote.text}"
                    </blockquote>
                    <figcaption className="text-xs font-bold text-stone-600 font-mono">
                      — {section.quote.author}
                    </figcaption>
                  </figure>
                )}

                {/* Highlight Callout Box */}
                {section.highlightBox && (
                  <div className="my-6 p-5 bg-white border border-stone-200 rounded-2xl shadow-xs">
                    {section.highlightBox.tag && (
                      <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-900 text-white mb-2">
                        {section.highlightBox.tag}
                      </span>
                    )}
                    <h4 className="text-base font-bold text-stone-900 mb-1">
                      {section.highlightBox.title}
                    </h4>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {section.highlightBox.description}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive Comprehension Quiz */}
          {article.quiz && (
            <div className="my-12 p-6 sm:p-8 bg-stone-900 text-stone-50 rounded-3xl border border-stone-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <Brain className="w-4 h-4" />
                  Comprueba tu Comprensión
                </span>
                <span className="text-xs text-stone-400 font-mono">+30 XP Extra</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-white mb-5">
                {article.quiz.question}
              </h3>

              <div className="space-y-2.5 mb-5">
                {article.quiz.options.map((option, oIdx) => {
                  const isSelected = selectedQuizOption === oIdx;
                  const isCorrect = oIdx === article.quiz?.correctAnswer;
                  
                  let optionStyles = 'bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-800';
                  if (quizSubmitted) {
                    if (isCorrect) {
                      optionStyles = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'bg-rose-950 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-amber-900/40 border-amber-500 text-amber-200 ring-1 ring-amber-500';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedQuizOption(oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl text-sm border transition-all flex items-start gap-3 ${optionStyles}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-stone-700/60 flex items-center justify-center text-xs font-bold shrink-0">
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
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
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
          <div className="my-8 p-6 bg-stone-100 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  {isRead ? 'Lectura completada' : '¿Terminaste de leer el artículo?'}
                </h4>
                <p className="text-xs text-stone-500">
                  {isRead ? `Has ganado +${article.xpReward} XP para tu nivel de lector.` : 'Registra tu progreso para ganar puntos de experiencia e insignias.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onMarkAsRead(article)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                isRead
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isRead ? 'text-emerald-600' : 'text-amber-400'}`} />
              {isRead ? 'Leído ✓' : 'Marcar como Leído'}
            </button>
          </div>

          {/* References Section */}
          <div className="pt-8 border-t border-stone-200 text-xs text-stone-500">
            <h4 className="font-bold uppercase tracking-wider text-stone-700 mb-3">
              Referencias y Bibliografía
            </h4>
            <ul className="space-y-1.5 font-mono text-[11px]">
              {article.references.map((ref, idx) => (
                <li key={idx}>[{idx + 1}] {ref}</li>
              ))}
            </ul>
          </div>

          {/* Previous / Next Article Navigation Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-stone-200">
            {prevArticle ? (
              <button
                onClick={() => onNavigateToArticle(prevArticle)}
                className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all text-left flex items-start gap-3 group"
              >
                <ChevronLeft className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:-translate-x-1 transition-transform shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Artículo Anterior</span>
                  <p className="text-sm font-bold text-stone-900 font-serif-heading group-hover:text-amber-900 line-clamp-1">
                    {prevArticle.title}
                  </p>
                </div>
              </button>
            ) : <div />}

            {nextArticle && (
              <button
                onClick={() => onNavigateToArticle(nextArticle)}
                className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all text-right flex items-start justify-end gap-3 group sm:col-start-2"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Siguiente Artículo</span>
                  <p className="text-sm font-bold text-stone-900 font-serif-heading group-hover:text-amber-900 line-clamp-1">
                    {nextArticle.title}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-transform shrink-0 mt-0.5" />
              </button>
            )}
          </div>

        </article>

      </div>
    </div>
  );
};
