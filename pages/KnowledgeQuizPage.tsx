import React, { useState, useMemo } from 'react';
import { Alert, Button, Card, PageHeader, cx } from '../components/ui';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    question:
      'Which of the following is NOT a letter in the INVEST acronym for user stories?',
    options: ['Independent', 'Negotiable', 'Valuable', 'Simple'],
    correctAnswer: 'Simple',
    explanation:
      "The INVEST acronym stands for Independent, Negotiable, Valuable, Estimable, Small, and Testable. 'Simple' is not part of it.",
  },
  {
    question:
      'What is the primary purpose of a Business Requirements Document (BRD)?',
    options: [
      'To detail the technical design of the software.',
      'To outline the business solution for a project, including goals and objectives.',
      'To create a daily plan for the development team.',
      "To test the application's user interface.",
    ],
    correctAnswer:
      'To outline the business solution for a project, including goals and objectives.',
    explanation:
      "A BRD focuses on the 'what' from a business perspective, detailing the problems to be solved and the required business outcomes, not the technical 'how'.",
  },
  {
    question: 'In BPMN, what shape typically represents a task or activity?',
    options: ['Diamond', 'Circle', 'Rectangle with rounded corners', 'Arrow'],
    correctAnswer: 'Rectangle with rounded corners',
    explanation:
      'A rectangle with rounded corners represents a task, which is a unit of work performed within a business process.',
  },
  {
    question:
      'Which elicitation technique is most effective for gathering requirements from a large, geographically dispersed group of stakeholders?',
    options: [
      'Interviews',
      'Workshops',
      'Surveys/Questionnaires',
      'Observation',
    ],
    correctAnswer: 'Surveys/Questionnaires',
    explanation:
      'Surveys are an excellent tool for collecting standardised information from a large number of people, regardless of their location.',
  },
  {
    question: "The 'Power/Interest Grid' is a model used for what purpose?",
    options: [
      'Analysing project risks',
      'Prioritizing stakeholders',
      'Modelling business processes',
      'Estimating user stories',
    ],
    correctAnswer: 'Prioritizing stakeholders',
    explanation:
      'The Power/Interest Grid helps categorise stakeholders based on their level of influence (power) and level of concern (interest) to determine how to manage them.',
  },
  {
    question: "What does the 'T' in INVEST stand for?",
    options: ['Technical', 'Tiny', 'Traceable', 'Testable'],
    correctAnswer: 'Testable',
    explanation:
      "A good user story must be Testable, meaning there are clear acceptance criteria to verify when it's done.",
  },
  {
    question:
      'Which Agile ceremony is held at the end of a sprint to demonstrate the work completed?',
    options: [
      'Daily Stand-up',
      'Sprint Retrospective',
      'Sprint Review',
      'Backlog Refinement',
    ],
    correctAnswer: 'Sprint Review',
    explanation:
      'The Sprint Review is a meeting where the development team shows what they accomplished during the sprint to stakeholders, who provide feedback.',
  },
];

type OptionState = {
  isSelected: boolean;
  isCorrect: boolean;
  showFeedback: boolean;
};

/**
 * Classes for one answer option, before and after the answer is checked.
 * Right and wrong differ in weight and tint as well as hue, so the state does
 * not rely on telling red from green.
 */
const optionClasses = ({
  isSelected,
  isCorrect,
  showFeedback,
}: OptionState): string => {
  if (!showFeedback) {
    return isSelected
      ? 'border-brand-mid bg-surface-100 font-semibold text-ink'
      : 'border-divider bg-surface-100 text-ink hover:border-brand-mid';
  }
  if (isCorrect)
    return 'border-success bg-success-surface font-semibold text-ink';
  if (isSelected) return 'border-danger bg-danger-surface text-ink';
  return 'border-divider bg-surface-100 text-ink-muted';
};

const KnowledgeQuizPage: React.FC = () => {
  const [shuffledQuestions] = useState(() =>
    [...quizData].sort(() => Math.random() - 0.5)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = useMemo(
    () => shuffledQuestions[currentQuestionIndex],
    [currentQuestionIndex, shuffledQuestions]
  );

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
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
    shuffledQuestions.sort(() => Math.random() - 0.5); // Re-shuffle
  };

  if (quizFinished) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center animate-fade-in">
        <Card className="w-full max-w-md">
          <h2 className="mb-4 text-h2 text-brand-navy">Quiz complete</h2>
          <p className="mb-6 text-body text-ink">
            You scored <span className="font-bold text-brand-mid">{score}</span>{' '}
            out of <span className="font-bold">{shuffledQuestions.length}</span>
          </p>
          <Button fullWidth onClick={handleRestart}>
            Try again
          </Button>
        </Card>
      </div>
    );
  }

  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <PageHeader
        title="BA knowledge quiz"
        eyebrow={`Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`}
      />

      <Card>
        <h2 className="mb-6 text-h3 text-ink">{currentQuestion.question}</h2>
        <div className="space-y-4" role="radiogroup" aria-label="Answers">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = currentQuestion.correctAnswer === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={cx(
                  'w-full rounded-md border-2 p-4 text-left text-body transition-colors',
                  optionClasses({ isSelected, isCorrect, showFeedback }),
                  showFeedback ? 'cursor-default' : 'cursor-pointer'
                )}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <Alert
            variant={
              selectedAnswer === currentQuestion.correctAnswer
                ? 'success'
                : 'error'
            }
            title={
              selectedAnswer === currentQuestion.correctAnswer
                ? 'Correct'
                : 'Not quite'
            }
            className="mt-6 animate-fade-in"
          >
            {currentQuestion.explanation}
          </Alert>
        )}

        <div className="mt-8 flex justify-end">
          {!showFeedback ? (
            <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>
              Check answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {isLastQuestion ? 'Finish quiz' : 'Next question'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default KnowledgeQuizPage;
