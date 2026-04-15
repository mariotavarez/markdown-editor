import { useState, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { StatusBar } from './components/StatusBar';
import { useTheme } from './hooks/useTheme';
import { useEditor } from './hooks/useEditor';
import { useMarkdown } from './hooks/useMarkdown';
import { useExport } from './hooks/useExport';
import { getTextStats } from './utils/wordCount';
import { sampleContent } from './data/sampleContent';

const INITIAL_VALUE = `# Hello, Markdown!

Start typing here, or click **Load example** to see all features.

Type \`**bold**\` or press **Ctrl+B** to make text bold.
`;

type FullscreenPane = 'editor' | 'preview' | null;

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const { value, setValue, textareaRef, applyAction, handleKeyDown } = useEditor(INITIAL_VALUE);
  const html = useMarkdown(value);
  const { exportHTML, exportMarkdown, copyHTML } = useExport(value, html);
  const stats = getTextStats(value);
  const [fullscreenPane, setFullscreenPane] = useState<FullscreenPane>(null);

  // Resizable divider state
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(50);
  const isDragging = useRef(false);

  const handleToggleFullscreen = (pane: 'editor' | 'preview') => {
    setFullscreenPane((prev) => (prev === pane ? null : pane));
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setSplitPercent(Math.min(80, Math.max(20, pct)));
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  const editorWidth =
    fullscreenPane === 'preview'
      ? '0%'
      : fullscreenPane === 'editor'
      ? '100%'
      : `${splitPercent}%`;

  const previewWidth =
    fullscreenPane === 'editor'
      ? '0%'
      : fullscreenPane === 'preview'
      ? '100%'
      : `${100 - splitPercent}%`;

  return (
    <>
      {/* Global prose styles injected once */}
      <style>{PROSE_STYLES}</style>

      <div
        className={clsx(
          'flex flex-col h-full',
          isDark ? 'bg-gray-950' : 'bg-white',
        )}
      >
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          onLoadSample={() => setValue(sampleContent)}
          onExportHTML={exportHTML}
          onExportMarkdown={exportMarkdown}
          onCopyHTML={copyHTML}
          fullscreenPane={fullscreenPane}
          onToggleFullscreen={handleToggleFullscreen}
        />

        <Toolbar onAction={applyAction} isDark={isDark} />

        {/* Main split pane area */}
        <div ref={containerRef} className="flex flex-1 overflow-hidden">
          {/* Editor pane */}
          <div
            className={clsx(
              'flex flex-col overflow-hidden transition-all duration-200',
              isDark ? 'bg-gray-950' : 'bg-white',
              fullscreenPane === 'preview' && 'hidden',
            )}
            style={{ width: editorWidth }}
          >
            <div
              className={clsx(
                'flex items-center justify-between px-4 py-1 text-xs font-medium border-b',
                isDark
                  ? 'bg-gray-900 border-gray-700 text-gray-500'
                  : 'bg-gray-50 border-gray-200 text-gray-400',
              )}
            >
              <span>EDITOR</span>
              <button
                type="button"
                onClick={() => handleToggleFullscreen('preview')}
                className={clsx(
                  'px-1.5 py-0.5 rounded text-xs transition-colors',
                  isDark ? 'hover:bg-gray-700 hover:text-gray-300' : 'hover:bg-gray-200 hover:text-gray-600',
                )}
                title="Fullscreen preview"
              >
                Preview only →
              </button>
            </div>
            <Editor
              value={value}
              onChange={setValue}
              onKeyDown={handleKeyDown}
              textareaRef={textareaRef}
              isDark={isDark}
            />
          </div>

          {/* Resizable divider */}
          {!fullscreenPane && (
            <div
              onMouseDown={handleMouseDown}
              className={clsx(
                'w-1 flex-shrink-0 cursor-col-resize group relative',
                isDark ? 'bg-gray-700 hover:bg-violet-600' : 'bg-gray-200 hover:bg-violet-400',
                'transition-colors duration-150',
              )}
            >
              <div className={clsx(
                'absolute inset-y-0 -left-1 -right-1',
              )} />
            </div>
          )}

          {/* Preview pane */}
          <div
            className={clsx(
              'flex flex-col overflow-hidden transition-all duration-200',
              fullscreenPane === 'editor' && 'hidden',
            )}
            style={{ width: previewWidth }}
          >
            <div
              className={clsx(
                'flex items-center justify-between px-4 py-1 text-xs font-medium border-b',
                isDark
                  ? 'bg-gray-800 border-gray-700 text-gray-500'
                  : 'bg-gray-100 border-gray-200 text-gray-400',
              )}
            >
              <span>PREVIEW</span>
              {fullscreenPane === 'preview' && (
                <button
                  type="button"
                  onClick={() => setFullscreenPane(null)}
                  className={clsx(
                    'px-1.5 py-0.5 rounded text-xs transition-colors',
                    isDark ? 'hover:bg-gray-700 hover:text-gray-300' : 'hover:bg-gray-200 hover:text-gray-600',
                  )}
                >
                  ← Back to split
                </button>
              )}
            </div>
            <Preview html={html} isDark={isDark} />
          </div>
        </div>

        <StatusBar stats={stats} isDark={isDark} />
      </div>
    </>
  );
}

// Scoped prose styles for the preview pane
const PROSE_STYLES = `
  .prose {
    color: var(--prose-body);
    font-size: 0.9375rem;
    line-height: 1.7;
    max-width: none;
  }
  .prose .empty-message {
    color: #9ca3af;
    font-style: italic;
  }
  .prose p { margin: 0.75em 0; }
  .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
    color: var(--prose-headings);
    font-weight: 700;
    line-height: 1.3;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  .prose h1 { font-size: 2em; border-bottom: 2px solid var(--prose-hr); padding-bottom: 0.3em; }
  .prose h2 { font-size: 1.5em; border-bottom: 1px solid var(--prose-hr); padding-bottom: 0.2em; }
  .prose h3 { font-size: 1.25em; }
  .prose h4 { font-size: 1.1em; }
  .prose h5 { font-size: 1em; }
  .prose h6 { font-size: 0.875em; }

  .prose a { color: var(--prose-links); text-decoration: underline; text-underline-offset: 2px; }
  .prose a:hover { opacity: 0.8; }

  .prose strong { font-weight: 700; color: var(--prose-headings); }
  .prose em { font-style: italic; }
  .prose del { text-decoration: line-through; opacity: 0.6; }

  .prose code {
    background: rgba(100,100,120,0.15);
    color: var(--prose-code);
    padding: 0.15em 0.4em;
    border-radius: 4px;
    font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
    font-size: 0.875em;
  }
  .prose pre {
    background: var(--prose-pre-bg);
    color: #e2e8f0;
    padding: 1em 1.25em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1em 0;
    font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
    font-size: 0.875em;
    line-height: 1.6;
  }
  .prose pre code {
    background: transparent;
    padding: 0;
    color: inherit;
    font-size: inherit;
  }

  .prose blockquote {
    border-left: 4px solid var(--prose-quote-border);
    color: var(--prose-quote-color);
    margin: 1em 0;
    padding: 0.25em 1em;
    font-style: italic;
    background: rgba(124,58,237,0.05);
    border-radius: 0 4px 4px 0;
  }
  .prose blockquote p { margin: 0.25em 0; }

  .prose ul, .prose ol { padding-left: 1.5em; margin: 0.75em 0; }
  .prose ul { list-style-type: disc; }
  .prose ol { list-style-type: decimal; }
  .prose li { margin: 0.25em 0; }
  .prose li > ul, .prose li > ol { margin: 0.25em 0; }
  .prose ul ul { list-style-type: circle; }
  .prose ul ul ul { list-style-type: square; }

  .prose table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    font-size: 0.9em;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid var(--prose-td-border);
  }
  .prose th {
    background: var(--prose-th-bg);
    font-weight: 600;
    text-align: left;
    padding: 0.6em 1em;
    border: 1px solid var(--prose-td-border);
    color: var(--prose-headings);
  }
  .prose td {
    padding: 0.5em 1em;
    border: 1px solid var(--prose-td-border);
  }
  .prose tr:nth-child(even) td { background: rgba(100,100,120,0.05); }

  .prose hr {
    border: none;
    border-top: 2px solid var(--prose-hr);
    margin: 1.5em 0;
  }

  .prose img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin: 0.5em 0;
  }
`;
