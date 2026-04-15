export interface TextStats {
  words: number;
  chars: number;
  lines: number;
  charsNoSpaces: number;
}

export function getTextStats(text: string): TextStats {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const lines = text === '' ? 0 : text.split('\n').length;
  const words =
    text.trim() === ''
      ? 0
      : text
          .trim()
          .split(/\s+/)
          .filter((w) => w.length > 0).length;

  return { words, chars, lines, charsNoSpaces };
}
