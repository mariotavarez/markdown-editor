import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Image,
  Code,
  Quote,
  List,
  ListOrdered,
  Minus,
  Table,
  FileCode,
} from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { InsertAction } from '../utils/insertMarkdown';

interface ToolbarProps {
  onAction: (action: InsertAction) => void;
  isDark: boolean;
}

interface ToolbarItem {
  action: InsertAction;
  icon: React.ReactNode;
  title: string;
  shortcut?: string;
}

const TOOLBAR_GROUPS: ToolbarItem[][] = [
  [
    { action: 'bold', icon: <Bold size={15} />, title: 'Bold (Ctrl+B)' },
    { action: 'italic', icon: <Italic size={15} />, title: 'Italic (Ctrl+I)' },
  ],
  [
    { action: 'h1', icon: <Heading1 size={15} />, title: 'Heading 1' },
    { action: 'h2', icon: <Heading2 size={15} />, title: 'Heading 2' },
    { action: 'h3', icon: <Heading3 size={15} />, title: 'Heading 3' },
  ],
  [
    { action: 'link', icon: <Link size={15} />, title: 'Link (Ctrl+K)' },
    { action: 'image', icon: <Image size={15} />, title: 'Image' },
  ],
  [
    { action: 'code', icon: <Code size={15} />, title: 'Inline Code' },
    { action: 'codeblock', icon: <FileCode size={15} />, title: 'Code Block' },
    { action: 'blockquote', icon: <Quote size={15} />, title: 'Blockquote' },
  ],
  [
    { action: 'ul', icon: <List size={15} />, title: 'Unordered List' },
    { action: 'ol', icon: <ListOrdered size={15} />, title: 'Ordered List' },
  ],
  [
    { action: 'hr', icon: <Minus size={15} />, title: 'Horizontal Rule' },
    { action: 'table', icon: <Table size={15} />, title: 'Table' },
  ],
];

import React from 'react';

export function Toolbar({ onAction }: ToolbarProps) {
  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex-wrap">
      {TOOLBAR_GROUPS.map((group, gi) => (
        <React.Fragment key={gi}>
          {gi > 0 && (
            <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />
          )}
          {group.map((item) => (
            <ToolbarButton
              key={item.action}
              onClick={() => onAction(item.action)}
              title={item.title}
            >
              {item.icon}
            </ToolbarButton>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
