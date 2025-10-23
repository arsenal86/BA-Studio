import React from 'react';

interface Link {
    label: string;
    href: string;
    type: 'Article' | 'Video' | 'Model';
}

const CompetencyCard: React.FC<{ title: string; children: React.ReactNode; links?: Link[] }> = ({ title, children, links }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">{title}</h3>
        <div className="text-slate-600 dark:text-slate-300 space-y-3">{children}</div>
        {links && links.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Related Resources</h4>
                <ul className="space-y-2">
                    {links.map((link, index) => (
                        <li key={index}>
                            <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline">
                                <span className="font-semibold mr-2">{link.type}:</span>
                                <span>{link.label}</span>
                                <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

const CoreCompetenciesPage: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Core BA Competencies</h1>
            <div className="space-y-6">
                <CompetencyCard 
                    title="Requirements Elicitation"
                    links={[
                        { type: 'Article', label: 'Guide to Requirements Elicitation Techniques', href: 'https://www.modernanalyst.com/Resources/Articles/tabid/115/ID/3129/A-Guide-to-Requirements-Elicitation-Techniques.aspx' },
                        { type: 'Video', label: 'Top 5 Elicitation Techniques', href: 'https://www.youtube.com/watch?v=s_m-43p9s48' },
                        { type: 'Model', label: 'Brainstorming, Interviews, JAD Sessions, Prototyping', href: 'https://www.iiba.org/professional-development/babbok/' }
                    ]}
                >
                    <p>The practice of collecting requirements from users, customers, and other stakeholders. Techniques include interviews, workshops, surveys, and document analysis. The goal is to understand the needs and constraints for the project.</p>
                </CompetencyCard>
                <CompetencyCard 
                    title="Stakeholder Management"
                    links={[
                        { type: 'Article', label: 'What is Stakeholder Analysis?', href: 'https://www.productplan.com/glossary/stakeholder-analysis/' },
                        { type: 'Video', label: 'Stakeholder Analysis Explained', href: 'https://www.youtube.com/watch?v=P8K9ABaCv-I' },
                        { type: 'Model', label: 'Power/Interest Grid for Stakeholder Prioritization', href: 'https://www.mindtools.com/pages/article/newPPM_07.htm' }
                    ]}
                >
                    <p>Identifying, analyzing, and managing relationships with individuals or groups who have an interest in the project. Effective stakeholder management is crucial for project success, ensuring alignment and managing expectations.</p>
                </CompetencyCard>
                <CompetencyCard 
                    title="Business Process Modeling"
                    links={[
                        { type: 'Article', label: 'An Introduction to BPMN', href: 'https://camunda.com/bpmn/reference/' },
                        { type: 'Video', label: 'BPMN Tutorial for Beginners', href: 'https://www.youtube.com/watch?v=OkI-r55bW-E' },
                        { type: 'Model', label: 'BPMN, Flowcharts, UML Activity Diagrams', href: 'https://www.lucidchart.com/pages/business-process-modeling' }
                    ]}
                >
                    <p>Creating graphical representations of an organization's business processes. This helps in understanding the "as-is" state and designing the "to-be" state, identifying inefficiencies and opportunities for improvement.</p>
                </CompetencyCard>
                <CompetencyCard 
                    title="Solution Design & Validation"
                    links={[
                        { type: 'Article', label: 'The Role of a Solution Architect', href: 'https://aws.amazon.com/what-is/solution-architect/' },
                        { type: 'Video', label: 'Solution Design in Software Engineering', href: 'https://www.youtube.com/watch?v=F01hJ4vj5yY' },
                        { type: 'Model', label: 'MoSCoW Method for Prioritization', href: 'https://www.productplan.com/glossary/moscow-prioritization/' }
                    ]}
                >
                   <p>Defining and documenting a solution that meets the business requirements. This involves evaluating options, ensuring the solution is feasible, and validating that it delivers the expected value.</p>
                </CompetencyCard>
                 <CompetencyCard 
                    title="Agile Methodologies"
                    links={[
                        { type: 'Article', label: 'The Agile Manifesto', href: 'https://agilemanifesto.org/' },
                        { type: 'Video', label: 'What is Scrum in 9 Minutes?', href: 'https://www.youtube.com/watch?v=9TycLR0TqFA' },
                        { type: 'Model', label: 'INVEST Criteria for User Stories', href: 'https://www.agilealliance.org/glossary/invest/' }
                    ]}
                 >
                    <p>Understanding and applying iterative development principles, such as Scrum or Kanban. This includes writing effective user stories, managing a product backlog, and facilitating agile ceremonies to deliver value incrementally.</p>
                </CompetencyCard>
            </div>
        </div>
    );
};

export default CoreCompetenciesPage;