import React from 'react';
import { Card, PageHeader, buttonClasses } from '../components/ui';

const TemplateLink: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 className="text-h3 text-brand-navy">{title}</h2>
      <p className="mt-1 text-body text-ink-muted">{description}</p>
    </div>
    <a
      href="#"
      onClick={(e) => e.preventDefault()} // In a real app, this would point to a file URL
      className={buttonClasses('primary', false, 'shrink-0')}
    >
      Download
    </a>
  </Card>
);

const ToolsAndTemplatesPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Tools and templates"
        subtitle="Download these templates to kick-start your documentation. (Download links are placeholders for now.)"
      />
      <div className="space-y-4">
        <TemplateLink
          title="Business requirements document (BRD)"
          description="A comprehensive document detailing the business solution for a project."
        />
        <TemplateLink
          title="Use case template"
          description="Describe how a user interacts with a system to achieve a specific goal."
        />
        <TemplateLink
          title="Requirements traceability matrix (RTM)"
          description="Map and trace user requirements to test cases to make sure every requirement is met."
        />
        <TemplateLink
          title="Stakeholder analysis matrix"
          description="Identify and analyse key stakeholders' interests, influence and impact."
        />
      </div>
    </div>
  );
};

export default ToolsAndTemplatesPage;
