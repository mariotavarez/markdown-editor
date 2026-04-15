import React, { useRef } from 'react';
import clsx from 'clsx';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  isDark: boolean;
}

export function Editor({ value, onChange, onKeyDown, textareaRef, isDark }: EditorProps) {
  const lineCountRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineCountRef.current) {
      lineCountRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="flex flex-1 overflow-hidden relative">
      {/* Line numbers */}
      <div
        ref={lineCountRef}
        className={clsx(
          'select-none overflow-hidden flex-shrink-0 text-right font-mono text-xs leading-6 py-4 px-2',
          'text-gray-400 dark:text-gray-600',
          isDark ? 'bg-gray-950' : 'bg-gray-50',
          'border-r border-gray-200 dark:border-gray-700',
        )}
        style={{ width: '3rem' }}
      >
        {lineNumbers.map((n) => (
          <div key={n} className="h-6">
            {n}
          </div>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onScroll={handleScroll}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        className={clsx(
          'flex-1 resize-none outline-none font-mono text-sm leading-6 py-4 px-4',
          'placeholder:text-gray-400 dark:placeholder:text-gray-600',
          isDark
            ? 'bg-gray-950 text-gray-100 caret-violet-400'
            : 'bg-white text-gray-900 caret-violet-600',
        )}
        placeholder="Start writing markdown here..."
      />
    </div>
  );
}
