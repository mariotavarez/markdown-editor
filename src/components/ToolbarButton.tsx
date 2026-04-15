import React, { useState } from 'react';
import clsx from 'clsx';

interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function ToolbarButton({
  onClick,
  title,
  children,
  active = false,
  className,
}: ToolbarButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={title}
        className={clsx(
          'flex items-center justify-center w-8 h-8 rounded transition-colors duration-100',
          'text-gray-600 dark:text-gray-300',
          'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
          'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1',
          active && 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300',
          className,
        )}
      >
        {children}
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none">
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
            {title}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
        </div>
      )}
    </div>
  );
}
