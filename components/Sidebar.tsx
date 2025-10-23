import React from 'react';
import { Page } from '../types';
import { HomeIcon, LightBulbIcon, DocumentTextIcon, TemplateIcon, SunIcon, MoonIcon, ChartBarIcon, QuestionMarkCircleIcon, SparklesIcon, NewspaperIcon, ClipboardListIcon, Logo } from './icons';

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
}

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
            onClick={(e) => {
                e.preventDefault();
                onClick(page);
            }}
            className={`flex items-center px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
                isActive
                    ? 'bg-primary-600 text-white font-semibold shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-slate-700'
            }`}
        >
            {icon}
            <span className="ml-4">{label}</span>
        </a>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isSidebarOpen, setIsSidebarOpen, isDarkMode, setIsDarkMode }) => {
    
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
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
            <aside className={`absolute md:relative z-40 w-64 bg-white dark:bg-slate-800 shadow-xl h-full flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-center items-center">
                    <a href="#" onClick={handleLogoClick} className="h-10 block" aria-label="Go to homepage">
                       <Logo />
                    </a>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavLink page="home" label="Home" icon={<HomeIcon />} currentPage={currentPage} onClick={handleNavigation} />
                    <NavLink page="agent" label="User Story Agent" icon={<LightBulbIcon />} currentPage={currentPage} onClick={handleNavigation} />
                    <NavLink page="meeting" label="Meeting Assistant" icon={<ClipboardListIcon />} currentPage={currentPage} onClick={handleNavigation} />
                    <NavLink page="news" label="Latest News" icon={<NewspaperIcon />} currentPage={currentPage} onClick={handleNavigation} />
                    <NavLink page="assessment" label="Assessment" icon={<ChartBarIcon />} currentPage={currentPage} onClick={handleNavigation} />
                    <NavLink page="quiz" label="Knowledge Quiz" icon={<QuestionMarkCircleIcon />} currentPage={currentPage} onClick={handleNavigation} />
                    <NavLink page="competencies" label="Core Competencies" icon={<DocumentTextIcon />} currentPage={currentPage} onClick={handleNavigation} />
                    <NavLink page="templates" label="Templates" icon={<TemplateIcon />} currentPage={currentPage} onClick={handleNavigation} />
                    <NavLink page="recommendations" label="Recommendations" icon={<SparklesIcon />} currentPage={currentPage} onClick={handleNavigation} />
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