import React from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
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
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const navItems: { to: string; label: string; Icon: typeof HomeIcon }[] = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/agent', label: 'User story agent', Icon: LightBulbIcon },
  { to: '/meeting', label: 'Meeting assistant', Icon: ClipboardListIcon },
  { to: '/news', label: 'Latest news', Icon: NewspaperIcon },
  { to: '/assessment', label: 'Assessment', Icon: ChartBarIcon },
  { to: '/quiz', label: 'Knowledge quiz', Icon: QuestionMarkCircleIcon },
  { to: '/competencies', label: 'Core competencies', Icon: DocumentTextIcon },
  { to: '/templates', label: 'Templates', Icon: TemplateIcon },
  { to: '/recommendations', label: 'Recommendations', Icon: SparklesIcon },
];

const NavLink: React.FC<{
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ to, label, icon, onClick }) => (
  <RouterNavLink
    to={to}
    end={to === '/'}
    onClick={onClick}
    className={({ isActive }) =>
      cx(
        'group flex items-center gap-4 rounded-md px-4 py-2 text-body transition-colors',
        isActive
          ? 'active bg-surface-200 font-semibold text-brand-mid'
          : 'text-ink hover:bg-surface-200'
      )
    }
  >
    <span className="text-brand-teal group-[.active]:text-brand-mid">
      {icon}
    </span>
    <span>{label}</span>
  </RouterNavLink>
);

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isDarkMode,
  setIsDarkMode,
}) => {
  const handleNavigation = () => {
    setIsSidebarOpen(false); // Close sidebar on mobile after navigation
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
          <Link
            to="/"
            onClick={handleNavigation}
            className="block rounded-sm"
            aria-label="Go to homepage"
          >
            <BrandLogo className="h-24" />
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              label={label}
              icon={<Icon />}
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
