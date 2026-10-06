import React from 'react';
import { XIcon, ExternalLinkIcon } from './icons';

const footerLink =
  'flex items-center gap-2 rounded-sm text-ink-muted transition-colors hover:text-brand-mid';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-divider bg-surface-100 p-4 text-center text-small text-ink-muted md:p-6">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <a
          href="https://x.com/BAStudioUK"
          target="_blank"
          rel="noopener noreferrer"
          className={footerLink}
        >
          <XIcon className="h-5 w-5" />
          <span>@BAStudioUK on X</span>
        </a>
        <a
          href="https://promptbase.com/profile/bastudiouk?via=Bastudiouk"
          target="_blank"
          rel="noopener noreferrer"
          className={footerLink}
        >
          <ExternalLinkIcon className="h-5 w-5" />
          <span>Author profile on PromptBase</span>
        </a>
      </div>
      <p className="mt-4">
        © {new Date().getFullYear()} BA Studio UK. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
