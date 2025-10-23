import React from 'react';
import { XIcon, ExternalLinkIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="p-4 md:p-6 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex justify-center items-center space-x-6">
                <a href="https://x.com/BAStudioUK" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary-500 transition-colors">
                    <XIcon />
                    <span className="ml-2">@BAStudioUK on X</span>
                </a>
                <a href="https://promptbase.com/profile/bastudiouk?via=Bastudiouk" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary-500 transition-colors">
                    <ExternalLinkIcon />
                    <span className="ml-2">Author Profile on PromptBase</span>
                </a>
            </div>
            <p className="mt-4">© {new Date().getFullYear()} BA Studio. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;