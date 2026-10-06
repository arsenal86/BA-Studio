import React, { useState, useRef } from 'react';
import {
  Alert,
  Button,
  Card,
  FieldLabel,
  MarkdownOutput,
  PageHeader,
  Textarea,
} from '../components/ui';

const ExampleStory: React.FC<{
  text: string;
  onClick: (text: string) => void;
}> = ({ text, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(text)}
    className="w-full rounded-sm border border-divider bg-surface-100 p-2 text-left text-small text-ink transition-colors hover:border-brand-mid"
  >
    {text}
  </button>
);

const UserStoryAgentPage: React.FC = () => {
  const [userStory, setUserStory] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAnalyze = async () => {
    if (!userStory.trim()) {
      setError('Please enter a user story to analyse.');
      return;
    }
    if (userStory.length > 5000) {
      setError(
        'User story is too long. Please keep it under 5,000 characters.'
      );
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysisResult('');

    try {
      const response = await fetch('/.netlify/functions/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'analyzeUserStory',
          userStory: userStory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data.result);
    } catch (err: any) {
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const loadExample = (story: string) => {
    setUserStory(story);
    textareaRef.current?.focus();
  };

  const exampleStories = [
    'As a customer, I want to view my order history, so that I can track my past purchases.',
    'As a shopper, I want to filter products by colour.',
    'The system should let users upload a profile picture.',
  ];

  return (
    <div className="flex h-full flex-col animate-fade-in">
      <PageHeader
        title="User story agent"
        subtitle="Enter a user story and our AI agent will give you a detailed quality analysis."
      />

      <div className="grid flex-grow grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input panel */}
        <Card className="flex flex-col">
          <h2 className="mb-4 text-h3 text-brand-navy">Your user story</h2>
          <div className="flex flex-grow flex-col">
            <FieldLabel htmlFor="user-story" className="sr-only">
              User story
            </FieldLabel>
            <Textarea
              id="user-story"
              ref={textareaRef}
              value={userStory}
              onChange={(e) => setUserStory(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. As a registered user, I want to reset my password, so that I can regain access to my account if I forget it."
              className="min-h-48 flex-grow resize-none"
              disabled={isLoading}
            />
            <div className="mt-2 text-right text-small text-ink-muted">
              {userStory.length} / 5000
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 text-label uppercase text-ink-muted">
              Or try an example
            </h3>
            <div className="space-y-2">
              {exampleStories.map((story, index) => (
                <ExampleStory key={index} text={story} onClick={loadExample} />
              ))}
            </div>
          </div>
          <Button
            className="mt-6"
            fullWidth
            onClick={handleAnalyze}
            disabled={!userStory.trim()}
            loading={isLoading}
            loadingText="Analysing…"
          >
            Analyse story (Ctrl+Enter)
          </Button>
        </Card>

        {/* Output panel */}
        <Card className="flex flex-col">
          <h2 className="mb-4 text-h3 text-brand-navy">Analysis report</h2>
          {error && (
            <Alert variant="error" title="Error" className="mb-4">
              {error}
            </Alert>
          )}
          <div className="flex-grow overflow-y-auto">
            {isLoading && !analysisResult && (
              <div className="flex h-full items-center justify-center text-ink-muted">
                <p>Generating analysis…</p>
              </div>
            )}
            {!isLoading && !analysisResult && !error && (
              <div className="flex h-full items-center justify-center text-center text-ink-muted">
                <p>Your analysis report will appear here.</p>
              </div>
            )}
            {analysisResult && <MarkdownOutput markdown={analysisResult} />}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserStoryAgentPage;
