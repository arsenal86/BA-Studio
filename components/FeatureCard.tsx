import React from 'react';
import { cardClasses } from './ui';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cardClasses('panel', true, 'text-center')}
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-pill bg-surface-100 text-brand-teal">
        {icon}
      </div>
      <h3 className="mb-2 text-h3 text-brand-navy">{title}</h3>
      <p className="text-body text-ink-muted">{description}</p>
    </button>
  );
};

export default FeatureCard;
