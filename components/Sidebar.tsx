import React from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import { HomeIcon, LightBulbIcon, DocumentTextIcon, TemplateIcon, SunIcon, MoonIcon, ChartBarIcon, QuestionMarkCircleIcon, SparklesIcon, NewspaperIcon, ClipboardListIcon, Logo } from './icons';

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
}

const CustomNavLink: React.FC<{
    to: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
}> = ({ to, label, icon, onClick }) => {
    return (
        <RouterNavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                `flex items-center px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
                    isActive
                        ? 'bg-primary-600 text-white font-semibold shadow-lg'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-slate-700'
                }`
            }
        >
            {icon}
            <span className="ml-4">{label}</span>
        </RouterNavLink>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen, isDarkMode, setIsDarkMode }) => {
    
    const handleNavigation = () => {
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
            <aside className={`absolute md:relative z-40 w-64 bg-white dark:bg-slate-800 shadow-xl h-full flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-center items-center">
                    <Link to="/" onClick={handleNavigation} className="h-10 block" aria-label="Go to homepage">
                       <Logo />
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <CustomNavLink to="/" label="Home" icon={<HomeIcon />} onClick={handleNavigation} />
                    <CustomNavLink to="/agent" label="User Story Agent" icon={<LightBulbIcon />} onClick={handleNavigation} />
                    <CustomNavLink to="/meeting" label="Meeting Assistant" icon={<ClipboardListIcon />} onClick={handleNavigation} />
                    <CustomNavLink to="/news" label="Latest News" icon={<NewspaperIcon />} onClick={handleNavigation} />
                    <CustomNavLink to="/assessment" label="Assessment" icon={<ChartBarIcon />} onClick={handleNavigation} />
                    <CustomNavLink to="/quiz" label="Knowledge Quiz" icon={<QuestionMarkCircleIcon />} onClick={handleNavigation} />
                    <CustomNavLink to="/competencies" label="Core Competencies" icon={<DocumentTextIcon />} onClick={handleNavigation} />
                    <CustomNavLink to="/templates" label="Templates" icon={<TemplateIcon />} onClick={handleNavigation} />
                    <CustomNavLink to="/recommendations" label="Recommendations" icon={<SparklesIcon />} onClick={handleNavigation} />
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                     <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                        {isDarkMode ? <SunIcon /> : <MoonIcon />}
                        <span className="ml-3 text-slate-700 dark:text-slate-200">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;