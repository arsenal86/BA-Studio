import { marked } from 'marked';
import React, { useState, useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';

type ToolMode = 'agenda' | 'summary';

const ToolToggle: React.FC<{ mode: ToolMode; setMode: (mode: ToolMode) => void }> = ({ mode, setMode }) => {
    return (
        <div className="flex justify-center mb-6">
            <div className="relative flex w-full max-w-sm p-1 bg-slate-200 dark:bg-slate-700 rounded-full">
                <span
                    className={`absolute top-1 bottom-1 left-1 w-1/2 bg-white dark:bg-slate-900 rounded-full shadow-md transition-transform duration-300 ease-in-out`}
                    style={{ transform: mode === 'agenda' ? 'translateX(0%)' : 'translateX(100%)' }}
                ></span>
                <button
                    onClick={() => setMode('agenda')}
                    className={`relative w-1/2 p-2 text-center font-semibold rounded-full z-10 transition-colors ${mode === 'agenda' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}
                >
                    Agenda Generator
                </button>
                <button
                    onClick={() => setMode('summary')}
                    className={`relative w-1/2 p-2 text-center font-semibold rounded-full z-10 transition-colors ${mode === 'summary' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}
                >
                    Note Summarizer
                </button>
            </div>
        </div>
    );
};

const MeetingAssistantPage: React.FC = () => {
    const [mode, setMode] = useState<ToolMode>('agenda');
    
    // Agenda state
    const [topic, setTopic] = useState('');
    const [objectives, setObjectives] = useState('');
    const [attendees, setAttendees] = useState('');

    // Summary state
    const [notes, setNotes] = useState('');

    // Common state
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const outputRef = useRef<HTMLDivElement>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        setResult('');

        try {
            let body;
            if (mode === 'agenda') {
                if (!topic.trim() || !objectives.trim()) {
                    throw new Error("Meeting topic and objectives are required.");
                }
                body = { mode: 'generateMeetingAgenda', topic, objectives, attendees };
            } else {
                if (!notes.trim()) {
                    throw new Error("Meeting notes cannot be empty.");
                }
                body = { mode: 'summarizeMeetingNotes', notes };
            }

            const response = await fetch('/.netlify/functions/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setResult(data.result);
        } catch (err: any) {
            setError(`Failed to generate: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (result && outputRef.current) {
            const sanitizedHtml = DOMPurify.sanitize(marked.parse(result));
            outputRef.current.innerHTML = sanitizedHtml;
        }
    }, [result]);

    const isGenerateDisabled = () => {
        if (isLoading) return true;
        if (mode === 'agenda') return !topic.trim() || !objectives.trim();
        return !notes.trim();
    }
    
    // Reset inputs when mode changes
    useEffect(() => {
        setTopic('');
        setObjectives('');
        setAttendees('');
        setNotes('');
        setError('');
        setResult('');
    }, [mode]);

    return (
        <div className="flex flex-col h-full animate-fade-in">
            <div className="mb-6 text-center">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Meeting Assistant</h1>
                <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">Streamline your meeting prep and follow-up with AI.</p>
            </div>
            
            <ToolToggle mode={mode} setMode={setMode} />

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Panel */}
                <div className="flex flex-col bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">{mode === 'agenda' ? '1. Provide Meeting Details' : '1. Paste Your Raw Notes'}</h2>
                    
                    {mode === 'agenda' ? (
                        <div className="space-y-4">
                            <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="Meeting Topic (e.g., Q3 Project Kick-off)" className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                            <textarea value={objectives} onChange={e => setObjectives(e.target.value)} placeholder="Key Objectives (one per line)..." rows={4} className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg resize-y focus:ring-2 focus:ring-primary-500 focus:outline-none"></textarea>
                            <input type="text" value={attendees} onChange={e => setAttendees(e.target.value)} placeholder="Attendees (comma-separated, optional)" className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                        </div>
                    ) : (
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Paste your unstructured meeting notes here..."
                            className="w-full flex-grow p-4 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            disabled={isLoading}
                            rows={10}
                        ></textarea>
                    )}

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerateDisabled()}
                        className="mt-6 w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            mode === 'agenda' ? '✨ Generate Agenda' : '📄 Generate Summary'
                        )}
                    </button>
                </div>

                {/* Output Panel */}
                <div className="flex flex-col bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">2. AI-Generated Output</h2>
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}
                    <div className="flex-grow overflow-y-auto prose dark:prose-invert max-w-none prose-headings:text-primary-600 dark:prose-headings:text-primary-400 prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-li:marker:text-primary-500">
                        {isLoading && !result && (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-slate-500">Generating output...</p>
                            </div>
                        )}
                        {!isLoading && !result && !error && (
                            <div className="flex items-center justify-center h-full text-center text-slate-500">
                                <p>Your generated {mode} will appear here.</p>
                            </div>
                        )}
                        <div ref={outputRef}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingAssistantPage;