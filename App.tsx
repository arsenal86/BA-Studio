import React, { useState, useEffect } from 'react';
import { Page } from './types';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import CoreCompetenciesPage from './pages/CoreCompetenciesPage';
import ToolsAndTemplatesPage from './pages/ToolsAndTemplatesPage';
import UserStoryAgentPage from './pages/UserStoryAgentPage';
import CompetencyAssessmentPage from './pages/CompetencyAssessmentPage';
import KnowledgeQuizPage from './pages/KnowledgeQuizPage';
import RecommendationsPage from './pages/RecommendationsPage';
import LatestNewsPage from './pages/LatestNewsPage';
import MeetingAssistantPage from './pages/MeetingAssistantPage';
import Footer from './components/Footer';
import { MenuIcon, CloseIcon, Logo } from './components/icons';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Dark mode toggle logic
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (!('theme' in localStorage)) {
                setIsDarkMode(e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage navigate={setCurrentPage} />;
            case 'agent':
                return <UserStoryAgentPage />;
            case 'competencies':
                return <CoreCompetenciesPage />;
            case 'templates':
                return <ToolsAndTemplatesPage />;
            case 'assessment':
                return <CompetencyAssessmentPage />;
            case 'quiz':
                return <KnowledgeQuizPage />;
            case 'recommendations':
                return <RecommendationsPage />;
            case 'news':
                return <LatestNewsPage />;
            case 'meeting':
                return <MeetingAssistantPage />;
            default:
                return <HomePage navigate={setCurrentPage} />;
        }
    };
    
    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentPage('home');
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
            <Sidebar 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="md:hidden bg-white dark:bg-slate-800 shadow-md p-4 flex justify-between items-center z-20">
                    <a href="#" onClick={handleLogoClick} className="h-8 block" aria-label="Go to homepage">
                       <Logo />
                    </a>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-600 dark:text-slate-300">
                        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
                    {renderPage()}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;