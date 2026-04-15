import clsx from 'clsx';

interface PreviewProps {
  html: string;
  isDark: boolean;
}

export function Preview({ html, isDark }: PreviewProps) {
  return (
    <div
      className={clsx(
        'flex-1 overflow-y-auto px-8 py-6',
        isDark ? 'bg-gray-900' : 'bg-gray-50',
      )}
    >
      <div
        className={clsx('prose max-w-none', isDark ? 'prose-dark' : 'prose-light')}
        style={
          isDark
            ? ({
                '--prose-body': '#d1d5db',
                '--prose-headings': '#f9fafb',
                '--prose-links': '#a78bfa',
                '--prose-code': '#e2e8f0',
                '--prose-pre-bg': '#0f172a',
                '--prose-quote-border': '#7c3aed',
                '--prose-quote-color': '#9ca3af',
                '--prose-th-bg': '#1e293b',
                '--prose-td-border': '#374151',
                '--prose-hr': '#374151',
              } as React.CSSProperties)
            : ({
                '--prose-body': '#374151',
                '--prose-headings': '#111827',
                '--prose-links': '#7c3aed',
                '--prose-code': '#1e293b',
                '--prose-pre-bg': '#1e293b',
                '--prose-quote-border': '#7c3aed',
                '--prose-quote-color': '#6b7280',
                '--prose-th-bg': '#f8fafc',
                '--prose-td-border': '#e2e8f0',
                '--prose-hr': '#e2e8f0',
              } as React.CSSProperties)
        }
        dangerouslySetInnerHTML={{ __html: html || '<p class="empty-message">Nothing to preview yet…</p>' }}
      />
    </div>
  );
}

// We inject global prose styles via a <style> tag in the parent
import React from 'react';
