import { marked } from "marked";
import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import GuidanceModal from "../components/GuidanceModal";
import { InformationCircleIcon } from "../components/icons";

const competencies = [
  "Requirements Elicitation",
  "Stakeholder Management",
  "Business Process Modeling",
  "Solution Design & Validation",
  "Agile Methodologies",
];

const ratingLabels: { [key: number]: string } = {
  1: "Beginner",
  2: "Novice",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

const CompetencySlider: React.FC<{
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
}> = ({ name, value, onChange }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
      <label
        htmlFor={name}
        className="block text-lg font-semibold text-slate-800 dark:text-slate-200"
      >
        {name}
      </label>
      <div className="flex items-center mt-3">
        <input
          id={name}
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={(e) => onChange(name, parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer"
          style={{ accentColor: "var(--color-primary-500)" }}
        />
        <span className="ml-4 w-28 text-center text-primary-600 dark:text-primary-400 font-semibold">
          {ratingLabels[value]}
        </span>
      </div>
    </div>
  );
};

const CompetencyAssessmentPage: React.FC = () => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>(
    competencies.reduce((acc, curr) => ({ ...acc, [curr]: 3 }), {}),
  );
  const [developmentPlan, setDevelopmentPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRatingChange = (name: string, value: number) => {
    setRatings((prev) => ({ ...prev, [name]: value }));
  };

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError("");
    setDevelopmentPlan("");

    try {
      const response = await fetch("/.netlify/functions/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode: "generateDevelopmentPlan",
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

  useEffect(() => {
    const updateOutput = async () => {
      if (developmentPlan && outputRef.current) {
        const parsed = await marked.parse(developmentPlan);
        const sanitizedHtml = DOMPurify.sanitize(parsed);
        outputRef.current.innerHTML = sanitizedHtml;
      }
    };
    updateOutput();
  }, [developmentPlan]);

  const allRated = Object.keys(ratings).length === competencies.length;

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Competency Self-Assessment
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Rate your proficiency in each area to receive a personalized
          development plan from our AI coach.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
        >
          <InformationCircleIcon />
          <span className="ml-2 font-semibold">How should I rate myself?</span>
        </button>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
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
          <button
            onClick={handleGeneratePlan}
            disabled={isLoading || !allRated}
            className="mt-6 w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating Your Plan...
              </>
            ) : (
              "Generate My Development Plan"
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold mb-4">Your Personalized Plan</h2>
          {error && (
            <div
              className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 rounded-md"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          <div className="flex-grow overflow-y-auto prose dark:prose-invert max-w-none prose-headings:text-primary-600 dark:prose-headings:text-primary-400 prose-strong:text-slate-800 dark:prose-strong:text-slate-100 prose-li:marker:text-primary-500">
            {isLoading && !developmentPlan && (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                <svg
                  className="animate-spin h-8 w-8 text-primary-500 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <p>
                  Our AI coach is analyzing your assessment and crafting your
                  personalized plan...
                </p>
              </div>
            )}
            {!isLoading && !developmentPlan && !error && (
              <div className="flex items-center justify-center h-full text-center text-slate-500">
                <p>Your development plan will appear here once generated.</p>
              </div>
            )}
            <div ref={outputRef}></div>
          </div>
        </div>
      </div>
      <GuidanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CompetencyAssessmentPage;
