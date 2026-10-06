import React from 'react';
import { cx } from './cx';

export type AlertVariant = 'error' | 'info' | 'success';

const variants: Record<AlertVariant, { box: string; title: string }> = {
  error: { box: 'bg-danger-surface border-danger', title: 'text-danger' },
  info: { box: 'bg-surface-200 border-divider', title: 'text-brand-navy' },
  success: { box: 'bg-success-surface border-success', title: 'text-success' },
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  className,
}) => (
  <div
    role={variant === 'error' ? 'alert' : 'status'}
    className={cx(
      'rounded-md border p-4 text-body text-ink',
      variants[variant].box,
      className
    )}
  >
    {title && (
      <p className={cx('font-semibold', variants[variant].title)}>{title}</p>
    )}
    <div className={cx(title && 'mt-1')}>{children}</div>
  </div>
);

export default Alert;
