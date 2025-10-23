
import React, { useState, useEffect, useRef } from 'react';
import { analyzeUserStory } from '../services/geminiService';

declare var marked: {
    parse(markdown: string): string;
};

const ExampleStory: React.FC<{ text: string; onClick: (text: string) => void }> = ({ text, onClick }) => (
    <button
        onClick={() => onClick(text)}
        className="w-full text-left p-3 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm text-slate-700 dark:text-slate-300"
    >
        {text}
    </button>
);


const UserStoryAgentPage: React.FC = () => {
    const [userStory, setUserStory] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const outputRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleAnalyze = async () => {
        if (!userStory.trim()) {
            setError('Please enter a user story to analyze.');
            return;
        }
        if (userStory.length > 5000) {
            setError('User story is too long. Please keep it under 5000 characters.');
            return;
        }

        setIsLoading(true);
        setError('');
        setAnalysisResult('');

        try {
            const result = await analyzeUserStory(userStory);
            setAnalysisResult(result);
        } catch (err: any) {
            setError(`Analysis failed: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (analysisResult && outputRef.current) {
            outputRef.current.innerHTML = marked.parse(analysisResult);
        }
    }, [analysisResult]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleAnalyze();
        }
    };
    
    const loadExample = (story: string) => {
        setUserStory(story);
        textareaRef.current?.focus();
    }
    
    const exampleStories = [
        "As a customer, I want to view my order history, so that I can track my past purchases.",
        "As a shopper, I want to filter products by color.",
        "The system should let users upload a profile picture."
    ];

    return (
        <div className="flex flex-col h-full animate-fade-in">
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">User Story Agent</h1>
                <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Enter a user story below and our AI agent will provide a detailed quality analysis.</p>
            </div>
            
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Panel */}
                <div className="flex flex-col bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Your User Story</h2>
                    <div className="flex-grow flex flex-col">
                        <textarea
                            ref={textareaRef}
                            value={userStory}
                            onChange={(e) => setUserStory(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="e.g., As a registered user, I want to reset my password, so that I can regain access to my account if I forget it."
                            className="w-full flex-grow p-4 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            disabled={isLoading}
                        ></textarea>
                        <div className="text-right text-sm text-slate-500 dark:text-slate-400 mt-2">
                           {userStory.length} / 5000
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Or, try an example:</h3>
                        <div className="space-y-2">
                           {exampleStories.map((story, index) => (
                               <ExampleStory key={index} text={story} onClick={loadExample} />
                           ))}
                        </div>
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading || !userStory.trim()}
                        className="mt-6 w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </>
                        ) : (
                            'Analyze Story (Ctrl+Enter)'
                        )}
                    </button>
                </div>

                {/* Output Panel */}
                <div className="flex flex-col bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">Analysis Report</h2>
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                    <div className="flex-grow overflow-y-auto prose dark:prose-invert max-w-none prose-headings:text-primary-600 dark:prose-headings:text-primary-400 prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-li:marker:text-primary-500">
                        {isLoading && !analysisResult && (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-slate-500">Generating analysis...</p>
                            </div>
                        )}
                        {!isLoading && !analysisResult && !error && (
                            <div className="flex items-center justify-center h-full text-center text-slate-500">
                                <p>Your analysis report will appear here.</p>
                            </div>
                        )}
                        <div ref={outputRef}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserStoryAgentPage;