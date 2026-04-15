import { Sun, Moon, Maximize2, Minimize2, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { ExportMenu } from './ExportMenu';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onLoadSample: () => void;
  onExportHTML: () => void;
  onExportMarkdown: () => void;
  onCopyHTML: () => Promise<boolean>;
  fullscreenPane: 'editor' | 'preview' | null;
  onToggleFullscreen: (pane: 'editor' | 'preview') => void;
}

export function Header({
  theme,
  onToggleTheme,
  onLoadSample,
  onExportHTML,
  onExportMarkdown,
  onCopyHTML,
  fullscreenPane,
  onToggleFullscreen,
}: HeaderProps) {
  const isDark = theme === 'dark';

  const iconBtn = clsx(
    'flex items-center justify-center w-8 h-8 rounded-md transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-violet-500',
    isDark
      ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-700'
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100',
  );

  return (
    <header
      className={clsx(
        'flex items-center gap-3 px-4 py-2.5 border-b',
        isDark
          ? 'bg-gray-900 border-gray-700'
          : 'bg-white border-gray-200',
      )}
    >
      {/* Logo + title */}
      <div className="flex items-center gap-2 mr-2">
        <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">M</span>
        </div>
        <span
          className={clsx(
            'font-semibold text-sm tracking-tight',
            isDark ? 'text-white' : 'text-gray-900',
          )}
        >
          markdown-editor
        </span>
      </div>

      <div className="flex-1" />

      {/* Load sample */}
      <button
        type="button"
        onClick={onLoadSample}
        className={clsx(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors border',
          'focus:outline-none focus:ring-2 focus:ring-violet-500',
          isDark
            ? 'text-gray-300 border-gray-600 hover:bg-gray-700'
            : 'text-gray-600 border-gray-200 hover:bg-gray-50',
        )}
      >
        <BookOpen size={13} />
        Load example
      </button>

      {/* Fullscreen toggles */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onToggleFullscreen('editor')}
          title={fullscreenPane === 'editor' ? 'Exit fullscreen editor' : 'Fullscreen editor'}
          className={clsx(iconBtn, fullscreenPane === 'editor' && (isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'))}
        >
          {fullscreenPane === 'editor' ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>

      {/* Theme toggle */}
      <button
        type="button"
        onClick={onToggleTheme}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={iconBtn}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Export menu */}
      <ExportMenu
        onExportHTML={onExportHTML}
        onExportMarkdown={onExportMarkdown}
        onCopyHTML={onCopyHTML}
        isDark={isDark}
      />
    </header>
  );
}
