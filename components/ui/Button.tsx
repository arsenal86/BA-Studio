import React from 'react';
import { cx } from './cx';
import Spinner from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold text-body transition-colors disabled:cursor-not-allowed';

const variants: Record<ButtonVariant, string> = {
  primary:
    'rounded-md px-4 py-2 bg-brand-mid text-on-brand hover:bg-brand-navy disabled:bg-surface-200 disabled:text-ink-muted',
  secondary:
    'rounded-md px-4 py-2 border border-ink-muted bg-surface-100 text-ink hover:bg-surface-200 disabled:text-ink-muted',
  ghost:
    'rounded-md px-4 py-2 text-ink hover:bg-surface-200 disabled:text-ink-muted',
  link: 'rounded-sm text-brand-mid underline-offset-4 hover:underline disabled:text-ink-muted disabled:no-underline',
};

/** Class string for elements that must look like a button (e.g. an <a>). */
export const buttonClasses = (
  variant: ButtonVariant = 'primary',
  fullWidth = false,
  className?: string
) => cx(base, variants[variant], fullWidth && 'w-full', className);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  /** Text shown next to the spinner while loading. */
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  loadingText,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}) => (
  <button
    type={type}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    className={buttonClasses(variant, fullWidth, className)}
    {...rest}
  >
    {loading ? (
      <>
        <Spinner size="sm" label={loadingText ?? 'Loading'} />
        {loadingText ?? children}
      </>
    ) : (
      children
    )}
  </button>
);

export default Button;
