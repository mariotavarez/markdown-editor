# markdown-editor

> Write markdown. See it live. Export anywhere.

![React 19](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript 5.7](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript)
![Tailwind v4](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=flat-square&logo=tailwindcss)
![Vite 6.2](https://img.shields.io/badge/Vite-6.2-646cff?style=flat-square&logo=vite)

![ Demo](.github/demo.gif)

A polished, real-time markdown editor with split-pane preview, formatting toolbar, and one-click export — built entirely with modern web standards.

---

## Features

- **Split-pane layout** — editor on the left, live preview on the right with a draggable resizer
- **Live preview** — renders markdown to styled HTML in real-time via `marked`
- **Formatting toolbar** — Bold, Italic, H1/H2/H3, Link, Image, Inline Code, Code Block, Blockquote, Unordered List, Ordered List, Horizontal Rule, Table
- **Cursor-aware insertions** — wraps selected text or inserts with a placeholder when nothing is selected
- **Dark / Light mode** — toggle in the header, persisted to `localStorage`
- **Word & char count** — live stats (words, characters, chars without spaces, line count) in the status bar
- **Export as HTML** — downloads a fully self-contained HTML file with embedded styles
- **Export as Markdown** — downloads the raw `.md` file
- **Copy HTML** — copies rendered HTML to clipboard with visual confirmation
- **Fullscreen modes** — expand editor-only or preview-only via the header controls
- **Sample content** — "Load example" fills the editor with a rich markdown showcase
- **Line numbers** — monospace editor with synchronized line numbers
- **Keyboard shortcuts** — see table below

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` / `Cmd+B` | Bold |
| `Ctrl+I` / `Cmd+I` | Italic |
| `Ctrl+K` / `Cmd+K` | Insert link |
| `Tab` | Indent (2 spaces) |

---

## Quick Start

```bash
git clone https://github.com/mariotavarez/markdown-editor.git
cd markdown-editor
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Tech Stack

| Package | Version | Role |
|---------|---------|------|
| `react` | ^19.0.0 | UI framework |
| `typescript` | ^5.7.0 | Type safety |
| `vite` | ^6.2.0 | Dev server & bundler |
| `tailwindcss` | ^4.1.0 | Utility-first styling |
| `@tailwindcss/vite` | ^4.1.0 | Tailwind v4 Vite plugin |
| `marked` | ^12.0.0 | Markdown → HTML parsing |
| `lucide-react` | ^0.468.0 | Icons |
| `clsx` | ^2.1.0 | Conditional classnames |

---

## Project Structure

```
src/
├── components/
│   ├── Editor.tsx           # Textarea with line numbers
│   ├── Preview.tsx          # Styled HTML output
│   ├── Toolbar.tsx          # Formatting button row
│   ├── ToolbarButton.tsx    # Icon button with tooltip
│   ├── StatusBar.tsx        # Word / char / line stats
│   ├── Header.tsx           # Title, theme toggle, export
│   └── ExportMenu.tsx       # Export dropdown
├── hooks/
│   ├── useMarkdown.ts       # Parse markdown with marked
│   ├── useEditor.ts         # Editor state & keyboard shortcuts
│   ├── useTheme.ts          # Dark/light with localStorage
│   └── useExport.ts         # File download & clipboard
├── utils/
│   ├── insertMarkdown.ts    # Cursor-aware markdown insertion
│   └── wordCount.ts         # Stats computation
├── data/
│   └── sampleContent.ts     # Rich sample document
├── App.tsx
└── main.tsx
```

---

## License

MIT © Mario Tavarez
