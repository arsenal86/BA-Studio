
import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700"
        >
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-slate-900 mb-4 mx-auto text-primary-600 dark:text-primary-400">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-center">{description}</p>
        </div>
    );
};

export default FeatureCard;