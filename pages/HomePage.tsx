import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { Page } from '../types';
import {
  LightBulbIcon,
  DocumentTextIcon,
  TemplateIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  NewspaperIcon,
  ClipboardListIcon,
} from '../components/icons';

interface HomePageProps {
  navigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-12 text-center">
        <p className="mb-4 text-label uppercase text-brand-mid">
          For UK business analysts
        </p>
        <h1 className="text-h1 md:text-display text-ink">
          Welcome to <span className="text-gradient-brand">BA Studio UK</span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-body text-ink-muted">
          Practical AI tools and guidance for everyday business analysis, all in
          one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <FeatureCard
          title="User story agent"
          description="Use AI to analyse, score and refine your user stories against industry good practice."
          icon={<LightBulbIcon />}
          onClick={() => navigate('agent')}
        />
        <FeatureCard
          title="Meeting assistant"
          description="Generate structured agendas and summarise your meeting notes to pull out key actions."
          icon={<ClipboardListIcon />}
          onClick={() => navigate('meeting')}
        />
        <FeatureCard
          title="Latest news"
          description="Get your AI-powered weekly briefing on BA trends, tools and techniques."
          icon={<NewspaperIcon />}
          onClick={() => navigate('news')}
        />
        <FeatureCard
          title="Competency assessment"
          description="Get a personalised development plan from our AI coach based on your self-assessed skills."
          icon={<ChartBarIcon />}
          onClick={() => navigate('assessment')}
        />
        <FeatureCard
          title="Knowledge quiz"
          description="Test your understanding of core BA concepts with an interactive multiple-choice quiz."
          icon={<QuestionMarkCircleIcon />}
          onClick={() => navigate('quiz')}
        />
        <FeatureCard
          title="Core competencies"
          description="Explore fundamental BA skills, from requirements elicitation to stakeholder management."
          icon={<DocumentTextIcon />}
          onClick={() => navigate('competencies')}
        />
        <FeatureCard
          title="Tools and templates"
          description="Download a curated set of templates such as BRDs and use case documents."
          icon={<TemplateIcon />}
          onClick={() => navigate('templates')}
        />
        <FeatureCard
          title="Recommendations"
          description="Explore essential books, websites, podcasts and industry voices to follow."
          icon={<SparklesIcon />}
          onClick={() => navigate('recommendations')}
        />
      </div>
    </div>
  );
};

export default HomePage;
