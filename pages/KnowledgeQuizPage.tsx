
import React, { useState, useMemo } from 'react';

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

const quizData: QuizQuestion[] = [
    {
        question: "Which of the following is NOT a letter in the INVEST acronym for user stories?",
        options: ["Independent", "Negotiable", "Valuable", "Simple"],
        correctAnswer: "Simple",
        explanation: "The INVEST acronym stands for Independent, Negotiable, Valuable, Estimable, Small, and Testable. 'Simple' is not part of it."
    },
    {
        question: "What is the primary purpose of a Business Requirements Document (BRD)?",
        options: [
            "To detail the technical design of the software.",
            "To outline the business solution for a project, including goals and objectives.",
            "To create a daily plan for the development team.",
            "To test the application's user interface."
        ],
        correctAnswer: "To outline the business solution for a project, including goals and objectives.",
        explanation: "A BRD focuses on the 'what' from a business perspective, detailing the problems to be solved and the required business outcomes, not the technical 'how'."
    },
    {
        question: "In BPMN, what shape typically represents a task or activity?",
        options: ["Diamond", "Circle", "Rectangle with rounded corners", "Arrow"],
        correctAnswer: "Rectangle with rounded corners",
        explanation: "A rectangle with rounded corners represents a task, which is a unit of work performed within a business process."
    },
    {
        question: "Which elicitation technique is most effective for gathering requirements from a large, geographically dispersed group of stakeholders?",
        options: ["Interviews", "Workshops", "Surveys/Questionnaires", "Observation"],
        correctAnswer: "Surveys/Questionnaires",
        explanation: "Surveys are an excellent tool for collecting standardized information from a large number of people, regardless of their location."
    },
    {
        question: "The 'Power/Interest Grid' is a model used for what purpose?",
        options: ["Analyzing project risks", "Prioritizing stakeholders", "Modeling business processes", "Estimating user stories"],
        correctAnswer: "Prioritizing stakeholders",
        explanation: "The Power/Interest Grid helps categorize stakeholders based on their level of influence (power) and level of concern (interest) to determine how to manage them."
    },
    {
        question: "What does the 'T' in INVEST stand for?",
        options: ["Technical", "Tiny", "Traceable", "Testable"],
        correctAnswer: "Testable",
        explanation: "A good user story must be Testable, meaning there are clear acceptance criteria to verify when it's done."
    },
    {
        question: "Which Agile ceremony is held at the end of a sprint to demonstrate the work completed?",
        options: ["Daily Stand-up", "Sprint Retrospective", "Sprint Review", "Backlog Refinement"],
        correctAnswer: "Sprint Review",
        explanation: "The Sprint Review is a meeting where the development team shows what they accomplished during the sprint to stakeholders, who provide feedback."
    }
];

const KnowledgeQuizPage: React.FC = () => {
    const [shuffledQuestions] = useState(() => [...quizData].sort(() => Math.random() - 0.5));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    const currentQuestion = useMemo(() => shuffledQuestions[currentQuestionIndex], [currentQuestionIndex, shuffledQuestions]);

    const handleAnswerSelect = (answer: string) => {
        if (showFeedback) return;
        setSelectedAnswer(answer);
    };

    const handleCheckAnswer = () => {
        if (!selectedAnswer) return;

        if (selectedAnswer === currentQuestion.correctAnswer) {
            setScore(prev => prev + 1);
        }
        setShowFeedback(true);
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setQuizFinished(true);
        }
    };
    
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setShowFeedback(false);
        setQuizFinished(false);
        shuffledQuestions.sort(() => Math.random() - 0.5) // Re-shuffle
    };

    if (quizFinished) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quiz Complete!</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
                        You scored <span className="font-bold text-primary-600 dark:text-primary-400">{score}</span> out of <span className="font-bold">{shuffledQuestions.length}</span>
                    </p>
                    <button
                        onClick={handleRestart}
                        className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">BA Knowledge Quiz</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
            </p>
            
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">{currentQuestion.question}</h2>

                <div className="space-y-4">
                    {currentQuestion.options.map((option) => {
                        const isSelected = selectedAnswer === option;
                        const isCorrect = currentQuestion.correctAnswer === option;
                        let buttonClass = "bg-slate-100 dark:bg-slate-700 hover:bg-primary-100 dark:hover:bg-slate-600";
                        if (showFeedback) {
                            if (isCorrect) {
                                buttonClass = "bg-green-200 dark:bg-green-800 border-green-500";
                            } else if (isSelected) {
                                buttonClass = "bg-red-200 dark:bg-red-800 border-red-500";
                            }
                        } else if (isSelected) {
                            buttonClass = "bg-primary-200 dark:bg-primary-800 border-primary-500";
                        }
                        
                        return (
                            <button
                                key={option}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={showFeedback}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${buttonClass} ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {showFeedback && (
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-slate-700 rounded-lg border border-blue-200 dark:border-blue-600 animate-fade-in">
                        <h3 className="font-bold text-blue-800 dark:text-blue-200">Explanation</h3>
                        <p className="text-blue-700 dark:text-blue-300 mt-1">{currentQuestion.explanation}</p>
                    </div>
                )}
                
                <div className="mt-8 text-right">
                    {!showFeedback ? (
                        <button
                            onClick={handleCheckAnswer}
                            disabled={!selectedAnswer}
                            className="px-8 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                        >
                            Check Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors animate-pulse"
                        >
                            {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KnowledgeQuizPage;