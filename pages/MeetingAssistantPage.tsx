import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Card,
  FieldLabel,
  Input,
  MarkdownOutput,
  PageHeader,
  SegmentedControl,
  Textarea,
} from '../components/ui';

type ToolMode = 'agenda' | 'summary';

const modeOptions: { value: ToolMode; label: string }[] = [
  { value: 'agenda', label: 'Agenda generator' },
  { value: 'summary', label: 'Notes summariser' },
];

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

  const handleGenerate = async () => {
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      let body;
      if (mode === 'agenda') {
        if (!topic.trim() || !objectives.trim()) {
          throw new Error('Meeting topic and objectives are required.');
        }
        body = { mode: 'generateMeetingAgenda', topic, objectives, attendees };
      } else {
        if (!notes.trim()) {
          throw new Error('Meeting notes cannot be empty.');
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

  const isGenerateDisabled =
    mode === 'agenda' ? !topic.trim() || !objectives.trim() : !notes.trim();

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
    <div className="flex h-full flex-col animate-fade-in">
      <PageHeader
        align="center"
        title="Meeting assistant"
        subtitle="Speed up your meeting prep and follow-up with AI."
      />

      <div className="mb-6 flex justify-center">
        <SegmentedControl
          label="Meeting tool"
          options={modeOptions}
          value={mode}
          onChange={setMode}
        />
      </div>

      <div className="grid flex-grow grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input panel */}
        <Card className="flex flex-col">
          <h2 className="mb-4 text-h3 text-brand-navy">
            {mode === 'agenda'
              ? '1. Provide meeting details'
              : '1. Paste your raw notes'}
          </h2>

          {mode === 'agenda' ? (
            <div className="space-y-4">
              <div>
                <FieldLabel htmlFor="meeting-topic">Meeting topic</FieldLabel>
                <Input
                  id="meeting-topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Q3 project kick-off"
                />
              </div>
              <div>
                <FieldLabel htmlFor="meeting-objectives">
                  Key objectives
                </FieldLabel>
                <Textarea
                  id="meeting-objectives"
                  value={objectives}
                  onChange={(e) => setObjectives(e.target.value)}
                  placeholder="One per line"
                  rows={4}
                  className="resize-y"
                />
              </div>
              <div>
                <FieldLabel htmlFor="meeting-attendees">
                  Attendees (optional)
                </FieldLabel>
                <Input
                  id="meeting-attendees"
                  type="text"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  placeholder="Comma-separated"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-grow flex-col">
              <FieldLabel htmlFor="meeting-notes" className="sr-only">
                Meeting notes
              </FieldLabel>
              <Textarea
                id="meeting-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your unstructured meeting notes here…"
                className="flex-grow resize-none"
                disabled={isLoading}
                rows={10}
              />
            </div>
          )}

          <Button
            className="mt-6"
            fullWidth
            onClick={handleGenerate}
            disabled={isGenerateDisabled}
            loading={isLoading}
            loadingText="Generating…"
          >
            {mode === 'agenda' ? 'Generate agenda' : 'Generate summary'}
          </Button>
        </Card>

        {/* Output panel */}
        <Card className="flex flex-col">
          <h2 className="mb-4 text-h3 text-brand-navy">
            2. AI-generated output
          </h2>
          {error && (
            <Alert variant="error" title="Error" className="mb-4">
              {error}
            </Alert>
          )}
          <div className="flex-grow overflow-y-auto">
            {isLoading && !result && (
              <div className="flex h-full items-center justify-center text-ink-muted">
                <p>Generating output…</p>
              </div>
            )}
            {!isLoading && !result && !error && (
              <div className="flex h-full items-center justify-center text-center text-ink-muted">
                <p>Your generated {mode} will appear here.</p>
              </div>
            )}
            {result && <MarkdownOutput markdown={result} />}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MeetingAssistantPage;
