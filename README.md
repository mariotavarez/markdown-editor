<div align="center">

# MarkFlow

**Write in Markdown. See it rendered. Ship it anywhere.**

A distraction-free Markdown editor with a live split-pane preview, toolbar shortcuts, and one-click export to HTML or `.md` — all in the browser, no account required.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

![ Demo](.github/demo.gif)

</div>

---

## What is MarkFlow?

A Markdown editor that gets out of the way. Type on the left, see a pixel-perfect rendered preview on the right — live, with zero lag. Toolbar buttons handle the formatting you always forget the syntax for. Export when you're done.

Built to showcase a clean React 19 component architecture with custom hooks, dark theming, and precise TypeScript 5.7 typing.

```bash
git clone https://github.com/mariotavarez/markdown-editor.git
cd markdown-editor && npm install && npm run dev
```

---

## Features

- **Split-pane editor** — editor and preview side by side, both scrollable independently
- **Live preview** — renders as you type with full CommonMark support
- **Formatting toolbar** — Bold, Italic, Heading, Link, Code, Code Block, Blockquote, List
- **Dark / Light theme** — toggle with one click, persisted in localStorage
- **Export to HTML** — downloads a standalone `.html` file with inline styles
- **Export to Markdown** — downloads the raw `.md` source file
- **Status bar** — word count, character count, line count, read time estimate
- **Keyboard shortcuts** — `Ctrl+B` bold, `Ctrl+I` italic, `Ctrl+K` link, and more

---

## Quick Start

```bash
git clone https://github.com/mariotavarez/markdown-editor.git
cd markdown-editor
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Structure

```
src/
├── components/
│   ├── Header.tsx          # app header with theme toggle and export menu
│   ├── Toolbar.tsx         # formatting button row
│   ├── ToolbarButton.tsx   # individual toolbar button with tooltip
│   ├── Editor.tsx          # textarea with tab-key handling
│   ├── Preview.tsx         # rendered HTML preview pane
│   ├── ExportMenu.tsx      # dropdown with HTML and Markdown export options
│   └── StatusBar.tsx       # word/char/line count + read time
├── hooks/
│   ├── useEditor.ts        # cursor position, tab insertion, undo stack
│   ├── useMarkdown.ts      # Markdown-to-HTML rendering
│   ├── useExport.ts        # download-as-HTML and download-as-MD logic
│   └── useTheme.ts         # dark/light toggle with localStorage persistence
└── data/sampleContent.ts   # default document shown on first load
```

---

## Toolbar Shortcuts

| Button | Keyboard | Inserts |
|--------|----------|---------|
| **Bold** | `Ctrl+B` | `**text**` |
| *Italic* | `Ctrl+I` | `*text*` |
| Heading | — | `## text` |
| Link | `Ctrl+K` | `[text](url)` |
| Inline code | — | `` `code` `` |
| Code block | — | ` ```\ncode\n``` ` |
| Blockquote | — | `> text` |
| List item | — | `- text` |

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 5.7 | Strict type safety |
| Tailwind CSS | v4 | Vite plugin — zero config |
| Lucide React | 0.344 | Toolbar icons |
| Vite | 6.2 | Build tool |

---

## License

MIT © [Mario Tavarez](https://github.com/mariotavarez)
