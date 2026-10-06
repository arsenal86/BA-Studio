import React from 'react';
import { cx } from './cx';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  eyebrow?: string;
  align?: 'left' | 'center';
  children?: React.ReactNode;
  className?: string;
}

/** Page title block: optional label eyebrow, h1 title and subtitle. */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  children,
  className,
}) => (
  <header
    className={cx('mb-8', align === 'center' && 'text-center', className)}
  >
    {eyebrow && (
      <p className="mb-2 text-label uppercase text-brand-mid">{eyebrow}</p>
    )}
    <h1 className="text-h2 md:text-h1 text-brand-navy">{title}</h1>
    {subtitle && (
      <p
        className={cx(
          'mt-2 max-w-3xl text-body text-ink-muted',
          align === 'center' && 'mx-auto'
        )}
      >
        {subtitle}
      </p>
    )}
    {children}
  </header>
);

export default PageHeader;
