
import React from 'react';

const TemplateLink: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex justify-between items-center border border-slate-200 dark:border-slate-700">
        <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">{description}</p>
        </div>
        <a 
            href="#" 
            onClick={(e) => e.preventDefault()} // In a real app, this would point to a file URL
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
        >
            Download
        </a>
    </div>
);

const ToolsAndTemplatesPage: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Tools & Templates</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Download these templates to kickstart your documentation process. (Note: Download links are placeholders).
            </p>
            <div className="space-y-6">
                <TemplateLink 
                    title="Business Requirements Document (BRD)"
                    description="A comprehensive document detailing the business solution for a project."
                />
                <TemplateLink 
                    title="Use Case Template"
                    description="Describe how a user interacts with a system to achieve a specific goal."
                />
                <TemplateLink 
                    title="Requirements Traceability Matrix (RTM)"
                    description="Map and trace user requirements with test cases to ensure all requirements are met."
                />
                <TemplateLink 
                    title="Stakeholder Analysis Matrix"
                    description="A tool to identify and analyze key stakeholders' interests, influence, and impact."
                />
            </div>
        </div>
    );
};

export default ToolsAndTemplatesPage;