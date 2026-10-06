import React from 'react';
import { Link } from 'react-router-dom';
import { buttonClasses } from '../components/ui';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center animate-fade-in">
      <p className="text-label uppercase text-brand-mid">Error 404</p>
      <h1 className="mt-2 text-display text-brand-navy">Page not found</h1>
      <p className="mt-4 mb-8 max-w-md text-body text-ink-muted">
        The page you were looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" className={buttonClasses('primary')}>
        Back to the homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
