import React, { useState } from 'react';
import { X, Copy, Check, Code2, Eye, FileCode2, Sparkles, Monitor } from 'lucide-react';
import { Article } from '../types';

interface HtmlExporterModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlExporterModal: React.FC<HtmlExporterModalProps> = ({
  article,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [themeMode, setThemeMode] = useState<'dark-cyber' | 'clean-light'>('dark-cyber');

  if (!isOpen || !article) return null;

  // Generate clean embeddable HTML and CSS
  const generateEmbedCode = () => {
    if (themeMode === 'dark-cyber') {
      return `<!-- ==========================================
  ENTRADA DE BLOG GAMIFICADA (CYBERPUNK / GAMING THEME)
  Listo para insertar en cualquier contenedor web o CMS.
  Totalmente responsive, semántico y auto-contenido.
=========================================== -->
<div class="gamifica-post-container">
  <style>
    /* Estilos del Contenedor de la Entrada */
    .gamifica-post-container {
      --bg-main: #0c0e17;
      --bg-card: #121524;
      --border-color: #1e2438;
      --neon-lime: #ccff00;
      --neon-cyan: #00f0ff;
      --neon-purple: #c084fc;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.7;
      border-radius: 20px;
      border: 1px solid var(--border-color);
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
      max-width: 860px;
      margin: 2rem auto;
      overflow: hidden;
      box-sizing: border-box;
    }

    .gamifica-post-container * {
      box-sizing: border-box;
    }

    /* Portada / Header */
    .gamifica-hero {
      position: relative;
      height: 320px;
      overflow: hidden;
      background-color: #05070c;
    }

    .gamifica-hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.75;
      display: block;
    }

    .gamifica-hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, var(--bg-main) 0%, rgba(12, 14, 23, 0.4) 60%, transparent 100%);
    }

    .gamifica-badges-bar {
      position: absolute;
      bottom: 20px;
      left: 24px;
      right: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      z-index: 2;
    }

    .gamifica-badge-cat {
      background: rgba(204, 255, 0, 0.15);
      color: var(--neon-lime);
      border: 1px solid rgba(204, 255, 0, 0.4);
      padding: 4px 12px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .gamifica-badge-xp {
      background: rgba(0, 0, 0, 0.7);
      color: var(--neon-lime);
      border: 1px solid rgba(204, 255, 0, 0.4);
      padding: 4px 12px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: bold;
      box-shadow: 0 0 10px rgba(204, 255, 0, 0.2);
    }

    /* Contenido Principal */
    .gamifica-body {
      padding: 32px 36px;
    }

    @media (max-width: 640px) {
      .gamifica-body {
        padding: 20px;
      }
      .gamifica-hero {
        height: 220px;
      }
    }

    .gamifica-title {
      font-size: 2rem;
      font-weight: 900;
      color: #ffffff;
      line-height: 1.2;
      margin: 0 0 12px 0;
      letter-spacing: -0.02em;
    }

    .gamifica-subtitle {
      font-size: 1.125rem;
      color: var(--text-muted);
      margin: 0 0 24px 0;
      font-weight: 400;
    }

    /* Autor y Metadatos */
    .gamifica-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .gamifica-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .gamifica-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--neon-cyan);
      object-fit: cover;
    }

    .gamifica-author-name {
      font-size: 0.9rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }

    .gamifica-author-role {
      font-size: 0.75rem;
      color: var(--neon-cyan);
      font-family: var(--font-mono);
      margin: 2px 0 0 0;
    }

    .gamifica-date {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    /* Caja de Puntos Clave */
    .gamifica-takeaways {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-left: 4px solid var(--neon-lime);
      border-radius: 14px;
      padding: 20px 24px;
      margin: 28px 0;
    }

    .gamifica-takeaways-title {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--neon-lime);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 0 0 12px 0;
    }

    .gamifica-takeaways ul {
      margin: 0;
      padding-left: 18px;
      color: var(--text-main);
      font-size: 0.95rem;
    }

    .gamifica-takeaways li {
      margin-bottom: 8px;
    }

    /* Secciones de Contenido */
    .gamifica-section {
      margin-top: 36px;
    }

    .gamifica-h2 {
      font-size: 1.45rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0 0 14px 0;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 8px;
    }

    .gamifica-p {
      color: #cbd5e1;
      font-size: 1rem;
      margin-bottom: 16px;
    }

    /* Citas de Diseño */
    .gamifica-quote {
      background: rgba(0, 240, 255, 0.05);
      border-left: 4px solid var(--neon-cyan);
      border-radius: 0 12px 12px 0;
      padding: 18px 24px;
      margin: 24px 0;
      border-top: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .gamifica-quote blockquote {
      margin: 0 0 8px 0;
      font-style: italic;
      font-size: 1.05rem;
      color: #ffffff;
    }

    .gamifica-quote figcaption {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--neon-cyan);
      font-weight: bold;
    }

    /* Cajas Destacadas */
    .gamifica-callout {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 20px;
      margin: 24px 0;
    }

    .gamifica-callout-tag {
      display: inline-block;
      background: rgba(192, 132, 252, 0.15);
      color: var(--neon-purple);
      border: 1px solid rgba(192, 132, 252, 0.4);
      padding: 2px 8px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .gamifica-callout h4 {
      margin: 0 0 6px 0;
      color: #ffffff;
      font-size: 1.05rem;
    }

    .gamifica-callout p {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    /* Referencias */
    .gamifica-references {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid var(--border-color);
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .gamifica-references-title {
      font-size: 0.8rem;
      color: #ffffff;
      text-transform: uppercase;
      margin: 0 0 10px 0;
    }
  </style>

  <!-- Portada Visual -->
  <header class="gamifica-hero">
    <img class="gamifica-hero-img" src="${article.coverImage}" alt="${article.title}" />
    <div class="gamifica-hero-overlay"></div>
    <div class="gamifica-badges-bar">
      <span class="gamifica-badge-cat">${article.category}</span>
      <span class="gamifica-badge-xp">+${article.xpReward} XP • ${article.readTimeMinutes} MIN</span>
    </div>
  </header>

  <!-- Cuerpo del Ensayo -->
  <main class="gamifica-body">
    <h1 class="gamifica-title">${article.title}</h1>
    <p class="gamifica-subtitle">${article.subtitle}</p>

    <!-- Meta Información -->
    <div class="gamifica-meta">
      <div class="gamifica-author">
        <img class="gamifica-avatar" src="${article.author.avatar}" alt="${article.author.name}" />
        <div>
          <p class="gamifica-author-name">${article.author.name}</p>
          <p class="gamifica-author-role">${article.author.role}</p>
        </div>
      </div>
      <div class="gamifica-date">Publicado: ${article.date}</div>
    </div>

    <!-- Puntos Clave -->
    <aside class="gamifica-takeaways">
      <div class="gamifica-takeaways-title">⚡ Puntos Clave del Ensayo</div>
      <ul>
        ${article.takeaways.map((t) => `<li>${t}</li>`).join('\n        ')}
      </ul>
    </aside>

    <!-- Secciones del Artículo -->
    ${article.sections
      .map(
        (sec) => `
    <section class="gamifica-section">
      <h2 class="gamifica-h2">${sec.heading}</h2>
      ${sec.paragraphs.map((p) => `<p class="gamifica-p">${p}</p>`).join('\n      ')}

      ${
        sec.quote
          ? `
      <figure class="gamifica-quote">
        <blockquote>"${sec.quote.text}"</blockquote>
        <figcaption>— ${sec.quote.author}</figcaption>
      </figure>`
          : ''
      }

      ${
        sec.highlightBox
          ? `
      <div class="gamifica-callout">
        ${sec.highlightBox.tag ? `<span class="gamifica-callout-tag">${sec.highlightBox.tag}</span>` : ''}
        <h4>${sec.highlightBox.title}</h4>
        <p>${sec.highlightBox.description}</p>
      </div>`
          : ''
      }
    </section>`
      )
      .join('\n')}

    <!-- Referencias y Bibliografía -->
    <footer class="gamifica-references">
      <div class="gamifica-references-title">Referencias y Bibliografía</div>
      <ol style="padding-left: 18px; margin: 0;">
        ${article.references.map((r) => `<li style="margin-bottom: 4px;">${r}</li>`).join('\n        ')}
      </ol>
    </footer>
  </main>
</div>`;
    } else {
      // Clean Light Theme
      return `<!-- ==========================================
  ENTRADA DE BLOG (ESTILO EDITORIAL MINIMALISTA LIGHT)
=========================================== -->
<div class="editorial-blog-entry">
  <style>
    .editorial-blog-entry {
      --bg: #ffffff;
      --text: #1a202c;
      --text-muted: #4a5568;
      --border: #e2e8f0;
      --accent: #0f172a;
      --brand: #2563eb;
      --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      line-height: 1.7;
      max-width: 820px;
      margin: 2rem auto;
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      overflow: hidden;
    }

    .editorial-blog-entry * { box-sizing: border-box; }
    .editorial-cover { width: 100%; height: 300px; object-fit: cover; }
    .editorial-inner { padding: 36px 40px; }
    .editorial-tag { display: inline-block; background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-bottom: 12px; }
    .editorial-title { font-size: 2.2rem; font-weight: 800; color: var(--accent); margin: 0 0 12px 0; line-height: 1.2; }
    .editorial-subtitle { font-size: 1.15rem; color: var(--text-muted); margin: 0 0 24px 0; }
    .editorial-meta { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 14px 0; margin-bottom: 28px; font-size: 0.85rem; color: var(--text-muted); }
    .editorial-takeaways { background: #f8fafc; border-left: 4px solid var(--brand); border-radius: 8px; padding: 20px; margin: 24px 0; }
    .editorial-takeaways h4 { margin: 0 0 10px 0; font-size: 0.85rem; text-transform: uppercase; color: var(--brand); }
    .editorial-h2 { font-size: 1.5rem; font-weight: 700; color: var(--accent); margin: 32px 0 14px 0; }
    .editorial-p { margin-bottom: 16px; font-size: 1rem; color: #334155; }
    .editorial-quote { background: #f1f5f9; border-left: 4px solid var(--accent); padding: 16px 20px; margin: 20px 0; font-style: italic; border-radius: 0 8px 8px 0; }
  </style>

  <img class="editorial-cover" src="${article.coverImage}" alt="${article.title}" />
  
  <div class="editorial-inner">
    <span class="editorial-tag">${article.category} • ${article.readTimeMinutes} MIN</span>
    <h1 class="editorial-title">${article.title}</h1>
    <p class="editorial-subtitle">${article.subtitle}</p>

    <div class="editorial-meta">
      <div><strong>${article.author.name}</strong> (${article.author.role})</div>
      <div>${article.date}</div>
    </div>

    <div class="editorial-takeaways">
      <h4>Conclusiones Principales</h4>
      <ul style="margin:0; padding-left: 20px;">
        ${article.takeaways.map((t) => `<li>${t}</li>`).join('')}
      </ul>
    </div>

    ${article.sections
      .map(
        (s) => `
      <h2 class="editorial-h2">${s.heading}</h2>
      ${s.paragraphs.map((p) => `<p class="editorial-p">${p}</p>`).join('')}
      ${s.quote ? `<blockquote class="editorial-quote">"${s.quote.text}" — ${s.quote.author}</blockquote>` : ''}
    `
      )
      .join('')}
  </div>
</div>`;
    }
  };

  const codeSnippet = generateEmbedCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-center p-3 sm:p-6">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl bg-[#0c0e17] text-slate-100 rounded-2xl shadow-2xl border border-slate-800 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#080a10]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-[#ccff00]/40 text-[#ccff00] flex items-center justify-center shadow-[0_0_15px_rgba(204,255,0,0.2)]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-cyber tracking-wide flex items-center gap-2">
                Generador HTML + CSS Limpio
                <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/80 px-2 py-0.5 rounded-full">
                  Embed Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Código auto-contenido listo para pegar en WordPress, Webflow, React o HTML plano.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-3 bg-[#0a0d15] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'code'
                    ? 'bg-slate-800 text-[#ccff00] font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5" />
                Código HTML & CSS
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'preview'
                    ? 'bg-slate-800 text-cyan-400 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Vista Previa Live
              </button>
            </div>

            {/* Theme switcher */}
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
              <button
                onClick={() => setThemeMode('dark-cyber')}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  themeMode === 'dark-cyber'
                    ? 'bg-[#ccff00]/15 text-[#ccff00] font-bold border border-[#ccff00]/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cyber Dark (Ácido)
              </button>
              <button
                onClick={() => setThemeMode('clean-light')}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  themeMode === 'clean-light'
                    ? 'bg-white text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Clean Editorial Light
              </button>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] flex items-center gap-1.5 active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? '¡Copiado al portapapeles!' : 'Copiar Código Completo'}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#06080e]">
          {activeTab === 'code' ? (
            <div className="relative">
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[55vh]">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          ) : (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-y-auto max-h-[55vh]">
              <div
                dangerouslySetInnerHTML={{
                  __html: codeSnippet,
                }}
              />
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#080a10] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 px-5">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
            Incluye tipografía, variables CSS, layout responsive y metadatos SEO.
          </span>
          <span>{codeSnippet.length} caracteres</span>
        </div>
      </div>
    </div>
  );
};
