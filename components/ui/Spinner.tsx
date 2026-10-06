import React from 'react';
import { cx } from './cx';

interface SpinnerProps {
  size?: 'sm' | 'lg';
  className?: string;
  label?: string;
}

const sizes = {
  sm: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 border-4',
};

/** Indeterminate loading indicator. Inherits colour from its parent. */
const Spinner: React.FC<SpinnerProps> = ({
  size = 'sm',
  className,
  label = 'Loading',
}) => (
  <span
    role="status"
    aria-label={label}
    className={cx(
      'inline-block shrink-0 animate-spin rounded-pill border-current border-t-transparent',
      sizes[size],
      className
    )}
  />
);

export default Spinner;
