export type InsertAction =
  | 'bold'
  | 'italic'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'link'
  | 'image'
  | 'code'
  | 'codeblock'
  | 'blockquote'
  | 'ul'
  | 'ol'
  | 'hr'
  | 'table';

interface InsertResult {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

function wrapSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string,
  placeholder: string,
): InsertResult {
  const selected = value.slice(start, end);
  const text = selected.length > 0 ? selected : placeholder;
  const newValue = value.slice(0, start) + before + text + after + value.slice(end);
  const newStart = start + before.length;
  const newEnd = newStart + text.length;
  return { value: newValue, selectionStart: newStart, selectionEnd: newEnd };
}

function insertAtLineStart(
  value: string,
  start: number,
  end: number,
  prefix: string,
): InsertResult {
  // Find the beginning of the first selected line
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  // Find the end of the last selected line
  const lineEnd = value.indexOf('\n', end);
  const actualLineEnd = lineEnd === -1 ? value.length : lineEnd;

  const selectedLines = value.slice(lineStart, actualLineEnd).split('\n');
  const prefixed = selectedLines.map((line) => prefix + line).join('\n');
  const newValue = value.slice(0, lineStart) + prefixed + value.slice(actualLineEnd);

  const newStart = lineStart + prefix.length;
  const newEnd = lineStart + prefixed.length;
  return { value: newValue, selectionStart: newStart, selectionEnd: newEnd };
}

function insertBlock(
  value: string,
  start: number,
  _end: number,
  block: string,
): InsertResult {
  // Ensure we insert on a new line
  const before = value.slice(0, start);
  const after = value.slice(start);
  const needsLeadingNewline = before.length > 0 && !before.endsWith('\n\n');
  const needsTrailingNewline = after.length > 0 && !after.startsWith('\n');

  const leading = needsLeadingNewline
    ? before.endsWith('\n')
      ? '\n'
      : '\n\n'
    : '';
  const trailing = needsTrailingNewline ? '\n' : '';

  const newValue = before + leading + block + trailing + after;
  const insertPos = before.length + leading.length;
  return {
    value: newValue,
    selectionStart: insertPos,
    selectionEnd: insertPos + block.length,
  };
}

export function insertMarkdown(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  action: InsertAction,
): InsertResult {
  switch (action) {
    case 'bold':
      return wrapSelection(value, selectionStart, selectionEnd, '**', '**', 'bold text');

    case 'italic':
      return wrapSelection(value, selectionStart, selectionEnd, '_', '_', 'italic text');

    case 'h1':
      return insertAtLineStart(value, selectionStart, selectionEnd, '# ');

    case 'h2':
      return insertAtLineStart(value, selectionStart, selectionEnd, '## ');

    case 'h3':
      return insertAtLineStart(value, selectionStart, selectionEnd, '### ');

    case 'blockquote':
      return insertAtLineStart(value, selectionStart, selectionEnd, '> ');

    case 'ul':
      return insertAtLineStart(value, selectionStart, selectionEnd, '- ');

    case 'ol':
      return insertAtLineStart(value, selectionStart, selectionEnd, '1. ');

    case 'link': {
      const selected = value.slice(selectionStart, selectionEnd);
      const linkText = selected || 'link text';
      const inserted = `[${linkText}](https://example.com)`;
      const newValue =
        value.slice(0, selectionStart) + inserted + value.slice(selectionEnd);
      // Select the URL part for easy replacement
      const urlStart = selectionStart + linkText.length + 3; // after "[text]("
      const urlEnd = urlStart + 'https://example.com'.length;
      return {
        value: newValue,
        selectionStart: urlStart,
        selectionEnd: urlEnd,
      };
    }

    case 'image': {
      const selected = value.slice(selectionStart, selectionEnd);
      const altText = selected || 'alt text';
      const inserted = `![${altText}](https://example.com/image.png)`;
      const newValue =
        value.slice(0, selectionStart) + inserted + value.slice(selectionEnd);
      const urlStart = selectionStart + altText.length + 4; // after "![alt]("
      const urlEnd = urlStart + 'https://example.com/image.png'.length;
      return {
        value: newValue,
        selectionStart: urlStart,
        selectionEnd: urlEnd,
      };
    }

    case 'code':
      return wrapSelection(value, selectionStart, selectionEnd, '`', '`', 'code');

    case 'codeblock': {
      const selected = value.slice(selectionStart, selectionEnd);
      const codeContent = selected || 'code here';
      const block = `\`\`\`\n${codeContent}\n\`\`\``;
      return insertBlock(value, selectionStart, selectionEnd, block);
    }

    case 'hr': {
      const block = '---';
      return insertBlock(value, selectionStart, selectionEnd, block);
    }

    case 'table': {
      const block = `| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |`;
      return insertBlock(value, selectionStart, selectionEnd, block);
    }

    default:
      return { value, selectionStart, selectionEnd };
  }
}
