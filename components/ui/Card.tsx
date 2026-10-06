import React from 'react';
import { cx } from './cx';

export type CardVariant = 'panel' | 'plain';
export type CardPadding = 'md' | 'lg';

const variants: Record<CardVariant, string> = {
  // Raised panel on the page background: surface-200, border not shadow.
  panel: 'bg-surface-200 border border-divider',
  // Bordered card on surface-100, for content inside a panel.
  plain: 'bg-surface-100 border border-divider',
};

// Padding is a prop rather than a className override: two padding utilities
// on one element resolve by stylesheet order, not class order.
const paddings: Record<CardPadding, string> = {
  md: 'p-4', // space-3
  lg: 'p-6', // space-4, the design system's card padding
};

/** Class string for cards rendered as links or buttons. */
export const cardClasses = (
  variant: CardVariant = 'panel',
  interactive = false,
  className?: string,
  padding: CardPadding = 'lg'
) =>
  cx(
    'rounded-md',
    paddings[padding],
    variants[variant],
    interactive &&
      'block w-full transition-colors hover:border-brand-mid cursor-pointer',
    className
  );

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

const Card: React.FC<CardProps> = ({
  variant = 'panel',
  padding = 'lg',
  className,
  ...rest
}) => (
  <div className={cardClasses(variant, false, className, padding)} {...rest} />
);

export default Card;
