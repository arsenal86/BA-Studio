import React from 'react';
import { cx } from './cx';

const control =
  'w-full rounded-sm border border-ink-muted bg-surface-100 px-4 py-2 text-body text-ink placeholder:text-ink-muted disabled:bg-surface-200 disabled:cursor-not-allowed';

export const FieldLabel: React.FC<
  React.LabelHTMLAttributes<HTMLLabelElement>
> = ({ className, ...rest }) => (
  <label
    className={cx('mb-2 block text-small font-semibold text-ink', className)}
    {...rest}
  />
);

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...rest }, ref) => (
  <input ref={ref} className={cx(control, className)} {...rest} />
));
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...rest }, ref) => (
  <textarea ref={ref} className={cx(control, className)} {...rest} />
));
Textarea.displayName = 'Textarea';
