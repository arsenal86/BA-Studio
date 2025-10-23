
import React from 'react';
import { CloseIcon } from './icons';

interface GuidanceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RatingLevel: React.FC<{ level: number, title: string, children: React.ReactNode }> = ({ level, title, children }) => (
    <div>
        <h4 className="font-bold text-lg text-primary-600 dark:text-primary-400">
            <span className="inline-block w-6 text-center mr-2 border border-primary-500 rounded-full">{level}</span> {title}
        </h4>
        <p className="mt-1 ml-9 text-slate-600 dark:text-slate-300">{children}</p>
    </div>
);

const GuidanceModal: React.FC<GuidanceModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-transform duration-300 scale-95 animate-modal-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rating Level Guidance</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
                        <CloseIcon />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto space-y-6">
                    <p className="text-slate-700 dark:text-slate-300">Use these definitions to help you rate your proficiency level for each competency. Be honest with your assessment to get the most valuable feedback.</p>
                    
                    <RatingLevel level={1} title="Beginner">
                        You have theoretical knowledge but little to no practical experience. You require full supervision and step-by-step guidance to perform tasks.
                    </RatingLevel>
                    
                    <RatingLevel level={2} title="Novice">
                        You have some practical experience but only on basic tasks. You understand the "what" but not always the "why" and require frequent support.
                    </RatingLevel>

                    <RatingLevel level={3} title="Intermediate">
                        You can work independently on most common tasks and can apply principles effectively. You may need guidance on complex or unusual situations.
                    </RatingLevel>

                    <RatingLevel level={4} title="Advanced">
                        You can handle complex tasks and situations independently and proactively. You are able to guide and mentor others in this area.
                    </RatingLevel>

                    <RatingLevel level={5} title="Expert">
                        You are a go-to person for this competency, capable of handling novel and highly complex challenges. You can teach the subject at a deep level and contribute to shaping best practices.
                    </RatingLevel>
                </div>
                <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-right rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Got it
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes modal-in {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-modal-in {
                    animation: modal-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default GuidanceModal;