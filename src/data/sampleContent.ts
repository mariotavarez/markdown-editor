export const sampleContent = `# Welcome to Markdown Editor

> Write markdown. See it live. Export anywhere.

---

## Features Overview

This editor supports **all standard markdown features** with *real-time* preview. Here's what you can do:

### Text Formatting

You can write **bold text**, *italic text*, ~~strikethrough~~, and even \`inline code\`.

Combine them: **_bold and italic_** or \`**code won't render bold**\`.

### Lists

Unordered list:
- React 19 with concurrent features
- TypeScript 5.7 strict mode
- Tailwind CSS v4 with Vite plugin
- Vite 6.2 for blazing fast HMR

Ordered list:
1. Open the editor
2. Type your markdown
3. See the live preview
4. Export as HTML or Markdown

Nested list:
- Frontend
  - React
  - TypeScript
  - Tailwind CSS
- Tooling
  - Vite
  - ESLint
  - Git

### Code Blocks

JavaScript example:

\`\`\`javascript
const editor = {
  name: 'markdown-editor',
  version: '1.0.0',
  features: ['split-pane', 'live-preview', 'export'],
};

function parseMarkdown(input) {
  return marked.parse(input);
}
\`\`\`

TypeScript example:

\`\`\`typescript
interface EditorState {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

function insertMarkdown(
  state: EditorState,
  before: string,
  after: string,
  placeholder: string
): string {
  const selected = state.value.slice(state.selectionStart, state.selectionEnd);
  const text = selected || placeholder;
  return before + text + after;
}
\`\`\`

### Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

> Nested blockquotes work too:
>
> > This is a nested blockquote inside the outer quote.

### Tables

| Feature | Status | Notes |
|---------|--------|-------|
| Split pane | ✅ Done | Resizable divider |
| Toolbar | ✅ Done | 11 formatting actions |
| Live preview | ✅ Done | Powered by marked |
| Dark mode | ✅ Done | Persisted in localStorage |
| Export HTML | ✅ Done | Full document download |
| Export MD | ✅ Done | Raw markdown download |
| Copy HTML | ✅ Done | Clipboard API |
| Word count | ✅ Done | Live stats in status bar |

### Links and Images

Visit [GitHub](https://github.com) for source code hosting.

Check the [marked documentation](https://marked.js.org) for markdown parsing details.

![Placeholder Image](https://via.placeholder.com/600x200/6d28d9/ffffff?text=Markdown+Editor)

### Horizontal Rules

Use three dashes, asterisks, or underscores:

---

***

___

### Heading Levels

# H1 — Main Title
## H2 — Section Header
### H3 — Subsection
#### H4 — Smaller heading
##### H5 — Even smaller
###### H6 — Smallest heading

---

*Happy writing! Use the toolbar above for quick formatting or keyboard shortcuts: **Ctrl+B** for bold, **Ctrl+I** for italic, **Ctrl+K** for link.*
`;
