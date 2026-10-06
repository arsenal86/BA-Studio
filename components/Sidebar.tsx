import React from 'react';
import { Page } from '../types';
import {
  HomeIcon,
  LightBulbIcon,
  DocumentTextIcon,
  TemplateIcon,
  SunIcon,
  MoonIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  NewspaperIcon,
  ClipboardListIcon,
} from './icons';
import BrandLogo from './BrandLogo';
import { Button, cx } from './ui';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const navItems: { page: Page; label: string; Icon: typeof HomeIcon }[] = [
  { page: 'home', label: 'Home', Icon: HomeIcon },
  { page: 'agent', label: 'User story agent', Icon: LightBulbIcon },
  { page: 'meeting', label: 'Meeting assistant', Icon: ClipboardListIcon },
  { page: 'news', label: 'Latest news', Icon: NewspaperIcon },
  { page: 'assessment', label: 'Assessment', Icon: ChartBarIcon },
  { page: 'quiz', label: 'Knowledge quiz', Icon: QuestionMarkCircleIcon },
  { page: 'competencies', label: 'Core competencies', Icon: DocumentTextIcon },
  { page: 'templates', label: 'Templates', Icon: TemplateIcon },
  { page: 'recommendations', label: 'Recommendations', Icon: SparklesIcon },
];

const NavLink: React.FC<{
  page: Page;
  label: string;
  icon: React.ReactNode;
  currentPage: Page;
  onClick: (page: Page) => void;
}> = ({ page, label, icon, currentPage, onClick }) => {
  const isActive = currentPage === page;
  return (
    <a
      href="#"
      aria-current={isActive ? 'page' : undefined}
      onClick={(e) => {
        e.preventDefault();
        onClick(page);
      }}
      className={cx(
        'flex items-center gap-4 rounded-md px-4 py-2 text-body transition-colors',
        isActive
          ? 'bg-surface-200 font-semibold text-brand-mid'
          : 'text-ink hover:bg-surface-200'
      )}
    >
      <span className={isActive ? 'text-brand-mid' : 'text-brand-teal'}>
        {icon}
      </span>
      <span>{label}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  setCurrentPage,
  isSidebarOpen,
  setIsSidebarOpen,
  isDarkMode,
  setIsDarkMode,
}) => {
  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleNavigation('home');
  };

  return (
    <>
      <div
        className={cx(
          'fixed inset-0 z-30 bg-overlay transition-opacity md:hidden',
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <aside
        className={cx(
          'absolute z-40 flex h-full w-64 flex-shrink-0 flex-col border-r border-divider bg-surface-100 transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isSidebarOpen ? 'translate-x-0 shadow-overlay' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-center border-b border-divider p-6">
          <a
            href="#"
            onClick={handleLogoClick}
            className="block rounded-sm"
            aria-label="Go to homepage"
          >
            <BrandLogo className="h-24" />
          </a>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map(({ page, label, Icon }) => (
            <NavLink
              key={page}
              page={page}
              label={label}
              icon={<Icon />}
              currentPage={currentPage}
              onClick={handleNavigation}
            />
          ))}
        </nav>
        <div className="border-t border-divider p-4">
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
