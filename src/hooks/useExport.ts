import { useCallback } from 'react';

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function useExport(markdown: string, html: string) {
  const exportHTML = useCallback(() => {
    const fullDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Exported Markdown</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      color: #1a1a1a;
      line-height: 1.6;
    }
    h1, h2, h3, h4, h5, h6 { margin-top: 1.5em; margin-bottom: 0.5em; }
    h1 { font-size: 2em; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.2em; }
    code { background: #f1f5f9; padding: 0.2em 0.4em; border-radius: 3px; font-size: 0.9em; }
    pre { background: #1e293b; color: #e2e8f0; padding: 1em; border-radius: 6px; overflow-x: auto; }
    pre code { background: transparent; padding: 0; }
    blockquote { border-left: 4px solid #7c3aed; margin: 0; padding-left: 1em; color: #64748b; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #e2e8f0; padding: 0.5em 1em; }
    th { background: #f8fafc; }
    tr:nth-child(even) { background: #f8fafc; }
    a { color: #7c3aed; }
    img { max-width: 100%; }
    hr { border: none; border-top: 2px solid #e2e8f0; margin: 2em 0; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
    downloadFile(fullDocument, 'export.html', 'text/html');
  }, [html]);

  const exportMarkdown = useCallback(() => {
    downloadFile(markdown, 'export.md', 'text/markdown');
  }, [markdown]);

  const copyHTML = useCallback(async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(html);
      return true;
    } catch {
      return false;
    }
  }, [html]);

  return { exportHTML, exportMarkdown, copyHTML };
}
