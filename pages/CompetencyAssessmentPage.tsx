import React, { useState } from 'react';
import GuidanceModal from '../components/GuidanceModal';
import { InformationCircleIcon } from '../components/icons';
import {
  Alert,
  Button,
  Card,
  MarkdownOutput,
  PageHeader,
  Spinner,
} from '../components/ui';

const competencies = [
  'Requirements elicitation',
  'Stakeholder management',
  'Business process modelling',
  'Solution design and validation',
  'Agile methodologies',
];

const ratingLabels: { [key: number]: string } = {
  1: 'Beginner',
  2: 'Novice',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Expert',
};

const CompetencySlider: React.FC<{
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
}> = ({ name, value, onChange }) => {
  return (
    <Card padding="md">
      <label htmlFor={name} className="block text-h3 text-brand-navy">
        {name}
      </label>
      <div className="mt-2 flex items-center gap-4">
        <input
          id={name}
          type="range"
          min="1"
          max="5"
          value={value}
          aria-valuetext={ratingLabels[value]}
          onChange={(e) => onChange(name, parseInt(e.target.value))}
          className="w-full cursor-pointer"
        />
        <span className="w-28 shrink-0 text-center font-semibold text-brand-mid">
          {ratingLabels[value]}
        </span>
      </div>
    </Card>
  );
};

const CompetencyAssessmentPage: React.FC = () => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>(
    competencies.reduce((acc, curr) => ({ ...acc, [curr]: 3 }), {})
  );
  const [developmentPlan, setDevelopmentPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRatingChange = (name: string, value: number) => {
    setRatings((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError('');
    setDevelopmentPlan('');

    try {
      const response = await fetch('/.netlify/functions/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: 'generateDevelopmentPlan',
          ratings: ratings,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDevelopmentPlan(data.result);
    } catch (err: any) {
      setError(`Failed to generate plan: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const allRated = Object.keys(ratings).length === competencies.length;

  return (
    <div className="flex h-full flex-col animate-fade-in">
      <PageHeader
        title="Competency self-assessment"
        subtitle="Rate your proficiency in each area to get a personalised development plan from our AI coach."
      >
        <Button
          variant="link"
          className="mt-4"
          onClick={() => setIsModalOpen(true)}
        >
          <InformationCircleIcon className="h-5 w-5" />
          How should I rate myself?
        </Button>
      </PageHeader>

      <div className="grid flex-grow grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input panel */}
        <div className="flex flex-col">
          <div className="space-y-4">
            {competencies.map((name) => (
              <CompetencySlider
                key={name}
                name={name}
                value={ratings[name]}
                onChange={handleRatingChange}
              />
            ))}
          </div>
          <Button
            className="mt-6"
            fullWidth
            onClick={handleGeneratePlan}
            disabled={!allRated}
            loading={isLoading}
            loadingText="Generating your plan…"
          >
            Generate my development plan
          </Button>
        </div>

        {/* Output panel */}
        <Card className="flex flex-col">
          <h2 className="mb-4 text-h3 text-brand-navy">
            Your personalised plan
          </h2>
          {error && (
            <Alert variant="error" title="Error" className="mb-4">
              {error}
            </Alert>
          )}
          <div className="flex-grow overflow-y-auto">
            {isLoading && !developmentPlan && (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-ink-muted">
                <Spinner size="lg" className="text-brand-mid" />
                <p>
                  Our AI coach is reviewing your assessment and putting together
                  your plan…
                </p>
              </div>
            )}
            {!isLoading && !developmentPlan && !error && (
              <div className="flex h-full items-center justify-center text-center text-ink-muted">
                <p>Your development plan will appear here once generated.</p>
              </div>
            )}
            {developmentPlan && <MarkdownOutput markdown={developmentPlan} />}
          </div>
        </Card>
      </div>

      <GuidanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CompetencyAssessmentPage;
