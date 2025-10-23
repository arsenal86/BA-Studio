import React from 'react';
import FeatureCard from '../components/FeatureCard';
import { Page } from '../types';
import { LightBulbIcon, DocumentTextIcon, TemplateIcon, ChartBarIcon, QuestionMarkCircleIcon, SparklesIcon, NewspaperIcon, ClipboardListIcon } from '../components/icons';

interface HomePageProps {
    navigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
    return (
        <div className="animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Welcome to <span className="bg-gradient-to-r from-primary-500 to-accent-400 bg-clip-text text-transparent">BA Studio</span></h1>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">Your all-in-one platform for Business Analyst essentials, powered by cutting-edge AI.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <FeatureCard 
                    title="User Story Agent"
                    description="Leverage AI to analyze, score, and refine your user stories against industry best practices."
                    icon={<LightBulbIcon />}
                    onClick={() => navigate('agent')}
                />
                 <FeatureCard 
                    title="Meeting Assistant"
                    description="Generate structured agendas and summarize your meeting notes to extract key actions."
                    icon={<ClipboardListIcon />}
                    onClick={() => navigate('meeting')}
                />
                 <FeatureCard 
                    title="Latest News"
                    description="Get your AI-powered weekly intelligence briefing on BA trends, tools, and techniques."
                    icon={<NewspaperIcon />}
                    onClick={() => navigate('news')}
                />
                <FeatureCard 
                    title="Competency Assessment"
                    description="Get a personalized development plan from our AI coach based on your self-assessed skills."
                    icon={<ChartBarIcon />}
                    onClick={() => navigate('assessment')}
                />
                 <FeatureCard 
                    title="Knowledge Quiz"
                    description="Test your understanding of core BA concepts with our interactive, multiple-choice quiz."
                    icon={<QuestionMarkCircleIcon />}
                    onClick={() => navigate('quiz')}
                />
                <FeatureCard 
                    title="Core Competencies"
                    description="Explore fundamental BA skills, from requirements elicitation to stakeholder management."
                    icon={<DocumentTextIcon />}
                    onClick={() => navigate('competencies')}
                />
                <FeatureCard 
                    title="Tools & Templates"
                    description="Access a curated collection of downloadable templates like BRDs and Use Case documents."
                    icon={<TemplateIcon />}
                    onClick={() => navigate('templates')}
                />
                 <FeatureCard 
                    title="Curated Recommendations"
                    description="Explore essential books, websites, podcasts, and industry leaders to follow."
                    icon={<SparklesIcon />}
                    onClick={() => navigate('recommendations')}
                />
            </div>
        </div>
    );
};

export default HomePage;