import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <h1 className="text-8xl font-bold text-primary-600">404</h1>
            <h2 className="text-3xl font-semibold mt-6 mb-4 text-slate-800 dark:text-slate-100">Page Not Found</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md">
                Oops! It seems like the page you were trying to reach doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-colors duration-200"
            >
                Go Back to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
