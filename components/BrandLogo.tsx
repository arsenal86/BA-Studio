import React from 'react';
import { cx } from './ui';

/**
 * BA Studio UK lock-up from the design system (public/brand/).
 * The SVG only works on white, so dark mode and compact spaces use a type
 * wordmark until the design system has a reversed or horizontal logo.
 */
export const Wordmark: React.FC<{ className?: string }> = ({ className }) => (
  <span
    className={cx(
      'inline-flex items-center gap-2 font-bold text-h3 tracking-wide text-ink',
      className
    )}
  >
    BA STUDIO
    <span className="text-label text-brand-mid">UK</span>
  </span>
);

const BrandLogo: React.FC<{ className?: string }> = ({ className }) => (
  <>
    <img
      src="/brand/ba-studio-uk-logo.svg"
      alt="BA Studio UK"
      className={cx('w-auto dark:hidden', className)}
    />
    <span className="hidden dark:inline-flex">
      <Wordmark />
    </span>
  </>
);

export default BrandLogo;
