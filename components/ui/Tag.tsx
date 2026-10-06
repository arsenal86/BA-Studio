import React from 'react';
import { cx } from './cx';

/** Small capitalised label, echoing the tracked "UK" in the logo. */
const Tag: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <span
    className={cx(
      'inline-flex items-center rounded-sm bg-surface-200 px-2 py-1 text-label uppercase text-brand-navy',
      className
    )}
  >
    {children}
  </span>
);

export default Tag;
