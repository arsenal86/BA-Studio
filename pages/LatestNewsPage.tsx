import React, { useState } from 'react';
import { NewspaperIcon } from '../components/icons';
import {
  Alert,
  Button,
  Card,
  MarkdownOutput,
  PageHeader,
  Spinner,
} from '../components/ui';

const LatestNewsPage: React.FC = () => {
  const [briefing, setBriefing] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateBriefing = async () => {
    setIsLoading(true);
    setError('');
    setBriefing('');

    try {
      const response = await fetch('/.netlify/functions/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'generateWeeklyBriefing',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBriefing(data.result);
    } catch (err: any) {
      setError(`Failed to generate briefing: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <PageHeader
        align="center"
        title="Latest news and briefings"
        subtitle="Your AI-powered weekly briefing on BA trends, tools and techniques."
      />

      <Card className="flex min-h-[60vh] flex-col">
        {error && (
          <Alert variant="error" title="Error" className="mb-4">
            {error}
          </Alert>
        )}
        <div className="flex-grow overflow-y-auto">
          {isLoading && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-ink-muted">
              <Spinner size="lg" className="text-brand-mid" />
              <p>Generating this week's briefing. This may take a moment.</p>
            </div>
          )}
          {!isLoading && !briefing && !error && (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-pill bg-surface-100 text-brand-teal">
                <NewspaperIcon className="h-8 w-8" />
              </div>
              <h2 className="mb-2 text-h2 text-brand-navy">
                Stay ahead of the curve
              </h2>
              <p className="mb-6 max-w-xl text-body text-ink-muted">
                Get the latest on industry trends, new tools, technique deep
                dives, case study insights and UK community news.
              </p>
              <Button onClick={handleGenerateBriefing}>
                Generate this week's briefing
              </Button>
            </div>
          )}
          {briefing && <MarkdownOutput markdown={briefing} />}
        </div>
        {!isLoading && briefing && (
          <div className="mt-6 border-t border-divider pt-4 text-center">
            <Button variant="link" onClick={handleGenerateBriefing}>
              Generate a new briefing
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LatestNewsPage;
