
import React, { useState, useEffect, useRef } from 'react';
import { generateWeeklyBriefing } from '../services/geminiService';

declare var marked: {
    parse(markdown: string): string;
};

const LatestNewsPage: React.FC = () => {
    const [briefing, setBriefing] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const outputRef = useRef<HTMLDivElement>(null);

    const handleGenerateBriefing = async () => {
        setIsLoading(true);
        setError('');
        setBriefing('');

        try {
            const result = await generateWeeklyBriefing();
            setBriefing(result);
        } catch (err: any) {
            setError(`Failed to generate briefing: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (briefing && outputRef.current) {
            outputRef.current.innerHTML = marked.parse(briefing);
        }
    }, [briefing]);

    return (
        <div className="animate-fade-in max-w-5xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Latest News & Briefings</h1>
                <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Your AI-powered weekly intelligence briefing on BA trends, tools, and techniques.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 min-h-[60vh] flex flex-col">
                {error && (
                    <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md mb-4" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}
                
                <div className="flex-grow overflow-y-auto prose dark:prose-invert max-w-none prose-headings:text-primary-600 dark:prose-headings:text-primary-400 prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-li:marker:text-primary-500">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                            <svg className="animate-spin h-8 w-8 text-primary-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p>Generating this week's briefing... This may take a moment.</p>
                        </div>
                    )}

                    {!isLoading && !briefing && !error && (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                             <div className="w-16 h-16 flex items-center justify-center bg-primary-100 dark:bg-slate-900 rounded-full mb-6">
                                <svg className="w-8 h-8 text-primary-600 dark:text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 6h6m-6 4h6m4-11h2m-2 4h2m-2 4h2M9 3v2m6 13V9" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Stay Ahead of the Curve</h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-xl mb-6">
                                Click the button to get the latest intelligence on industry trends, new tools, deep-dive techniques, case study insights, and UK community news.
                            </p>
                             <button
                                onClick={handleGenerateBriefing}
                                disabled={isLoading}
                                className="bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                            >
                                Generate This Week's Briefing
                            </button>
                        </div>
                    )}
                    
                    <div ref={outputRef}></div>
                </div>

                {!isLoading && briefing && (
                     <div className="mt-6 text-center border-t border-slate-200 dark:border-slate-700 pt-4">
                        <button
                            onClick={handleGenerateBriefing}
                            className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                        >
                            Generate a new briefing
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestNewsPage;