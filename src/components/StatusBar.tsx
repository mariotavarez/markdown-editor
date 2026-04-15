import { TextStats } from '../utils/wordCount';
import clsx from 'clsx';

interface StatusBarProps {
  stats: TextStats;
  isDark: boolean;
}

export function StatusBar({ stats, isDark }: StatusBarProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-4 px-4 py-1.5 text-xs border-t select-none',
        isDark
          ? 'bg-gray-900 border-gray-700 text-gray-500'
          : 'bg-gray-50 border-gray-200 text-gray-500',
      )}
    >
      <Stat label="Words" value={stats.words} />
      <div className="h-3 w-px bg-gray-300 dark:bg-gray-700" />
      <Stat label="Chars" value={stats.chars} />
      <div className="h-3 w-px bg-gray-300 dark:bg-gray-700" />
      <Stat label="Chars (no spaces)" value={stats.charsNoSpaces} />
      <div className="h-3 w-px bg-gray-300 dark:bg-gray-700" />
      <Stat label="Lines" value={stats.lines} />
      <div className="ml-auto text-gray-400 dark:text-gray-600">
        Ctrl+B Bold · Ctrl+I Italic · Ctrl+K Link
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <span className="flex items-center gap-1">
      <span className="text-gray-400 dark:text-gray-600">{label}:</span>
      <span className="font-medium tabular-nums">{value.toLocaleString()}</span>
    </span>
  );
}
