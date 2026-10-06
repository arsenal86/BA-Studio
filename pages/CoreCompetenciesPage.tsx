import React from 'react';
import { ExternalLinkIcon } from '../components/icons';
import { Card, PageHeader } from '../components/ui';

interface Link {
  label: string;
  href: string;
  type: 'Article' | 'Video' | 'Model';
}

const CompetencyCard: React.FC<{
  title: string;
  children: React.ReactNode;
  links?: Link[];
}> = ({ title, children, links }) => (
  <Card>
    <h2 className="mb-4 text-h2 text-brand-navy">{title}</h2>
    <div className="space-y-4 text-body text-ink">{children}</div>
    {links && links.length > 0 && (
      <div className="mt-6 border-t border-divider pt-4">
        <h3 className="mb-2 text-label uppercase text-ink-muted">
          Related resources
        </h3>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm text-brand-mid underline-offset-4 hover:underline"
              >
                <span className="font-semibold">{link.type}:</span>
                <span>{link.label}</span>
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </Card>
);

const CoreCompetenciesPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Core BA competencies"
        subtitle="The fundamental skills every business analyst builds on, with resources to go deeper."
      />
      <div className="space-y-6">
        <CompetencyCard
          title="Requirements elicitation"
          links={[
            {
              type: 'Article',
              label: 'Guide to Requirements Elicitation Techniques',
              href: 'https://www.modernanalyst.com/Resources/Articles/tabid/115/ID/3129/A-Guide-to-Requirements-Elicitation-Techniques.aspx',
            },
            {
              type: 'Video',
              label: 'Top 5 Elicitation Techniques',
              href: 'https://www.youtube.com/watch?v=s_m-43p9s48',
            },
            {
              type: 'Model',
              label: 'Brainstorming, Interviews, JAD Sessions, Prototyping',
              href: 'https://www.iiba.org/professional-development/babbok/',
            },
          ]}
        >
          <p>
            The practice of collecting requirements from users, customers, and
            other stakeholders. Techniques include interviews, workshops,
            surveys, and document analysis. The goal is to understand the needs
            and constraints for the project.
          </p>
        </CompetencyCard>
        <CompetencyCard
          title="Stakeholder management"
          links={[
            {
              type: 'Article',
              label: 'What is Stakeholder Analysis?',
              href: 'https://www.productplan.com/glossary/stakeholder-analysis/',
            },
            {
              type: 'Video',
              label: 'Stakeholder Analysis Explained',
              href: 'https://www.youtube.com/watch?v=P8K9ABaCv-I',
            },
            {
              type: 'Model',
              label: 'Power/Interest Grid for Stakeholder Prioritization',
              href: 'https://www.mindtools.com/pages/article/newPPM_07.htm',
            },
          ]}
        >
          <p>
            Identifying, analysing and managing relationships with individuals
            or groups who have an interest in the project. Effective stakeholder
            management is crucial for project success, ensuring alignment and
            managing expectations.
          </p>
        </CompetencyCard>
        <CompetencyCard
          title="Business process modelling"
          links={[
            {
              type: 'Article',
              label: 'An Introduction to BPMN',
              href: 'https://camunda.com/bpmn/reference/',
            },
            {
              type: 'Video',
              label: 'BPMN Tutorial for Beginners',
              href: 'https://www.youtube.com/watch?v=OkI-r55bW-E',
            },
            {
              type: 'Model',
              label: 'BPMN, Flowcharts, UML Activity Diagrams',
              href: 'https://www.lucidchart.com/pages/business-process-modeling',
            },
          ]}
        >
          <p>
            Creating graphical representations of an organisation's business
            processes. This helps in understanding the "as-is" state and
            designing the "to-be" state, identifying inefficiencies and
            opportunities for improvement.
          </p>
        </CompetencyCard>
        <CompetencyCard
          title="Solution design and validation"
          links={[
            {
              type: 'Article',
              label: 'The Role of a Solution Architect',
              href: 'https://aws.amazon.com/what-is/solution-architect/',
            },
            {
              type: 'Video',
              label: 'Solution Design in Software Engineering',
              href: 'https://www.youtube.com/watch?v=F01hJ4vj5yY',
            },
            {
              type: 'Model',
              label: 'MoSCoW Method for Prioritization',
              href: 'https://www.productplan.com/glossary/moscow-prioritization/',
            },
          ]}
        >
          <p>
            Defining and documenting a solution that meets the business
            requirements. This involves evaluating options, ensuring the
            solution is feasible, and validating that it delivers the expected
            value.
          </p>
        </CompetencyCard>
        <CompetencyCard
          title="Agile methodologies"
          links={[
            {
              type: 'Article',
              label: 'The Agile Manifesto',
              href: 'https://agilemanifesto.org/',
            },
            {
              type: 'Video',
              label: 'What is Scrum in 9 Minutes?',
              href: 'https://www.youtube.com/watch?v=9TycLR0TqFA',
            },
            {
              type: 'Model',
              label: 'INVEST Criteria for User Stories',
              href: 'https://www.agilealliance.org/glossary/invest/',
            },
          ]}
        >
          <p>
            Understanding and applying iterative development principles, such as
            Scrum or Kanban. This includes writing effective user stories,
            managing a product backlog, and facilitating agile ceremonies to
            deliver value incrementally.
          </p>
        </CompetencyCard>
      </div>
    </div>
  );
};

export default CoreCompetenciesPage;
