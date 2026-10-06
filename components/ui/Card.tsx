import React from 'react';
import { cx } from './cx';

export type CardVariant = 'panel' | 'plain';

const variants: Record<CardVariant, string> = {
  // Raised panel on the page background: surface-200, border not shadow.
  panel: 'bg-surface-200 border border-divider',
  // Bordered card on surface-100, for content inside a panel.
  plain: 'bg-surface-100 border border-divider',
};

/** Class string for cards rendered as links or buttons. */
export const cardClasses = (
  variant: CardVariant = 'panel',
  interactive = false,
  className?: string
) =>
  cx(
    'rounded-md p-6',
    variants[variant],
    interactive &&
      'block w-full text-left transition-colors hover:border-brand-mid cursor-pointer',
    className
  );

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const Card: React.FC<CardProps> = ({
  variant = 'panel',
  className,
  ...rest
}) => <div className={cardClasses(variant, false, className)} {...rest} />;

export default Card;
