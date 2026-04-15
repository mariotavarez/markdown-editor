import { useState, useRef, useCallback } from 'react';
import { insertMarkdown, InsertAction } from '../utils/insertMarkdown';

export function useEditor(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyAction = useCallback((action: InsertAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const result = insertMarkdown(value, selectionStart, selectionEnd, action);

    setValue(result.value);

    // Restore focus and selection after React re-render
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  }, [value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const ctrl = e.ctrlKey || e.metaKey;

      if (ctrl && e.key === 'b') {
        e.preventDefault();
        applyAction('bold');
        return;
      }
      if (ctrl && e.key === 'i') {
        e.preventDefault();
        applyAction('italic');
        return;
      }
      if (ctrl && e.key === 'k') {
        e.preventDefault();
        applyAction('link');
        return;
      }

      // Handle Tab key for indentation
      if (e.key === 'Tab') {
        e.preventDefault();
        const textarea = e.currentTarget;
        const { selectionStart, selectionEnd } = textarea;
        const newValue =
          value.slice(0, selectionStart) + '  ' + value.slice(selectionEnd);
        setValue(newValue);
        requestAnimationFrame(() => {
          textarea.setSelectionRange(selectionStart + 2, selectionStart + 2);
        });
      }
    },
    [applyAction, value],
  );

  return {
    value,
    setValue,
    textareaRef,
    applyAction,
    handleKeyDown,
  };
}
