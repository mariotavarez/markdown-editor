import { useState, useRef, useEffect } from 'react';
import { Download, Copy, ChevronDown, FileText, FileCode, Check } from 'lucide-react';
import clsx from 'clsx';

interface ExportMenuProps {
  onExportHTML: () => void;
  onExportMarkdown: () => void;
  onCopyHTML: () => Promise<boolean>;
  isDark: boolean;
}

export function ExportMenu({
  onExportHTML,
  onExportMarkdown,
  onCopyHTML,
  isDark,
}: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = async () => {
    const success = await onCopyHTML();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setOpen(false);
  };

  const btnBase = clsx(
    'flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left rounded-md transition-colors',
    isDark
      ? 'text-gray-200 hover:bg-gray-700'
      : 'text-gray-700 hover:bg-gray-100',
  );

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          'border focus:outline-none focus:ring-2 focus:ring-violet-500',
          isDark
            ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50',
        )}
      >
        <Download size={14} />
        Export
        <ChevronDown
          size={12}
          className={clsx('transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          className={clsx(
            'absolute right-0 top-full mt-1.5 w-52 rounded-lg shadow-lg border z-50 overflow-hidden',
            isDark
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200',
          )}
        >
          <div className="p-1">
            <button
              type="button"
              className={btnBase}
              onClick={() => { onExportHTML(); setOpen(false); }}
            >
              <FileCode size={15} className="text-orange-500 flex-shrink-0" />
              Download as HTML
            </button>
            <button
              type="button"
              className={btnBase}
              onClick={() => { onExportMarkdown(); setOpen(false); }}
            >
              <FileText size={15} className="text-blue-500 flex-shrink-0" />
              Download as Markdown
            </button>
            <div className={clsx('my-1 border-t', isDark ? 'border-gray-700' : 'border-gray-100')} />
            <button
              type="button"
              className={btnBase}
              onClick={handleCopy}
            >
              {copied ? (
                <Check size={15} className="text-green-500 flex-shrink-0" />
              ) : (
                <Copy size={15} className="text-violet-500 flex-shrink-0" />
              )}
              {copied ? 'Copied!' : 'Copy HTML to clipboard'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
