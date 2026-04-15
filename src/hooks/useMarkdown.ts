import { useMemo } from 'react';
import { marked } from 'marked';

// Configure marked for safe and full-featured rendering
marked.setOptions({
  gfm: true,
  breaks: false,
});

export function useMarkdown(source: string): string {
  const html = useMemo(() => {
    try {
      const result = marked.parse(source);
      // marked.parse can return string | Promise<string>; with no async option it's always string
      return result as string;
    } catch {
      return '<p style="color:red">Error parsing markdown.</p>';
    }
  }, [source]);

  return html;
}
