import React from 'react';
import { Button, Modal } from './ui';

interface GuidanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RatingLevel: React.FC<{
  level: number;
  title: string;
  children: React.ReactNode;
}> = ({ level, title, children }) => (
  <div className="flex gap-4">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border border-brand-mid text-small font-semibold text-brand-mid">
      {level}
    </span>
    <div>
      <h3 className="text-h3 text-brand-navy">{title}</h3>
      <p className="mt-1 text-body text-ink-muted">{children}</p>
    </div>
  </div>
);

const GuidanceModal: React.FC<GuidanceModalProps> = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Rating level guidance"
    footer={<Button onClick={onClose}>Got it</Button>}
  >
    <div className="space-y-6">
      <p className="text-body text-ink">
        Use these definitions to help you rate your proficiency level for each
        competency. Be honest with your assessment to get the most valuable
        feedback.
      </p>

      <RatingLevel level={1} title="Beginner">
        You have theoretical knowledge but little to no practical experience.
        You require full supervision and step-by-step guidance to perform tasks.
      </RatingLevel>

      <RatingLevel level={2} title="Novice">
        You have some practical experience but only on basic tasks. You
        understand the &quot;what&quot; but not always the &quot;why&quot; and
        require frequent support.
      </RatingLevel>

      <RatingLevel level={3} title="Intermediate">
        You can work independently on most common tasks and can apply principles
        effectively. You may need guidance on complex or unusual situations.
      </RatingLevel>

      <RatingLevel level={4} title="Advanced">
        You can handle complex tasks and situations independently and
        proactively. You are able to guide and mentor others in this area.
      </RatingLevel>

      <RatingLevel level={5} title="Expert">
        You are a go-to person for this competency, capable of handling novel
        and highly complex challenges. You can teach the subject at a deep level
        and contribute to shaping best practices.
      </RatingLevel>
    </div>
  </Modal>
);

export default GuidanceModal;
