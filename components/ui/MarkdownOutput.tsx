import React, { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { cx } from './cx';

/** Renders AI-generated markdown, sanitised, in the design system's type scale. */
const MarkdownOutput: React.FC<{ markdown: string; className?: string }> = ({
  markdown,
  className,
}) => {
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(markdown, { async: false })),
    [markdown]
  );
  return (
    <div
      className={cx('markdown-output', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownOutput;
