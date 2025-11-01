
import React from 'react';

// A reusable component for each section
const ResourceSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6 pb-2 border-b-2 border-primary-500/50">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    </div>
);

// A reusable card for each resource
const ResourceCard: React.FC<{ title: string; description: string; href: string; author?: string }> = ({ title, description, href, author }) => (
    <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 border border-slate-200 dark:border-slate-700 group"
    >
        <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400 group-hover:underline">{title}</h3>
        {author && <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{author}</p>}
        <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </a>
);

// The main page component
const RecommendationsPage: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">Curated BA Resources</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                A handpicked list of resources to help you grow as a Business Analyst, stay current, and connect with the community.
            </p>

            {/* Essential Reading Section */}
            <ResourceSection title="Essential Reading">
                <ResourceCard 
                    title="BABOK Guide v3"
                    author="IIBA"
                    description="The globally recognized standard for the practice of business analysis. An essential reference."
                    href="https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/"
                />
                <ResourceCard 
                    title="User Stories Applied"
                    author="Mike Cohn"
                    description="A practical guide to writing user stories, with detailed examples and strategies."
                    href="https://www.mountaingoatsoftware.com/books/user-stories-applied"
                />
                <ResourceCard 
                    title="The Lean Startup"
                    author="Eric Ries"
                    description="Introduces principles of continuous innovation and how to build a sustainable business."
                    href="http://theleanstartup.com/"
                />
            </ResourceSection>

            {/* Websites & Blogs Section */}
            <ResourceSection title="Websites & Blogs">
                 <ResourceCard 
                    title="BA Times"
                    description="Provides articles, webinars, and templates covering all aspects of business analysis."
                    href="https://www.batimes.com/"
                />
                <ResourceCard 
                    title="Blackmetric BA Digest"
                    description="An insightful magazine and blog providing articles, templates, and perspectives on business analysis."
                    href="https://www.blackmetric.com/ba-digest/"
                />
                <ResourceCard 
                    title="Bridging the Gap"
                    description="Offers practical advice, career resources, and training for aspiring and established BAs."
                    href="https://www.bridging-the-gap.com/"
                />
                <ResourceCard 
                    title="Modern Analyst"
                    description="A premier online community and resource portal for business analysts."
                    href="https://www.modernanalyst.com/"
                />
            </ResourceSection>
            
            {/* Industry Voices (LinkedIn) */}
            <ResourceSection title="Industry Voices to Follow">
                <ResourceCard 
                    title="Adriana Girdler"
                    description="Productivity and project management expert with a focus on practical BA skills. (LinkedIn)"
                    href="https://www.linkedin.com/in/adrianagirdler/"
                />
                <ResourceCard 
                    title="Kent J. McDonald"
                    description="Author and speaker focused on analysis, agile, and product management. (LinkedIn)"
                    href="https://www.linkedin.com/in/kentjmcdonald/"
                />
                <ResourceCard 
                    title="Laura Brandenburg"
                    description="Founder of Bridging the Gap, shares insightful career advice for BAs. (LinkedIn)"
                    href="https://www.linkedin.com/in/laurabrandenburg/"
                />
            </ResourceSection>

            {/* Communities & Forums Section */}
            <ResourceSection title="Communities & Forums">
                <ResourceCard 
                    title="IIBA Community"
                    description="Official forums from the IIBA, allowing members to discuss trends, ask questions, and network."
                    href="https://www.iiba.org/members/iiba-community-network/"
                />
                <ResourceCard 
                    title="r/BusinessAnalysis"
                    description="A Reddit community for discussing all things related to business analysis, from career advice to technique deep-dives."
                    href="https://www.reddit.com/r/BusinessAnalysis/"
                />
                <ResourceCard 
                    title="Young Business Analysts"
                    description="A community for aspiring and early-career BAs to network, share knowledge, and find support. (LinkedIn)"
                    href="https://www.linkedin.com/company/young-business-analysts/"
                />
            </ResourceSection>

            {/* Podcasts Section */}
            <ResourceSection title="Podcasts">
                <ResourceCard 
                    title="BA on the Go"
                    description="Yulia Kosarenko shares interviews and tips for business analysts on the move."
                    href="https://whychange.libsyn.com/"
                />
                <ResourceCard 
                    title="Inside Business Analysis"
                    description="Listen to the real-world stories of how business analysis is carried out and delivered."
                    href="https://www.youtube.com/@InsideBusinessAnalysis"
                />
                 <ResourceCard 
                    title="Mastering Business Analysis"
                    description="Interviews with leaders in the field, covering a wide range of analysis topics."
                    href="https://masteringbusinessanalysis.com/"
                />
                <ResourceCard 
                    title="This is Product Management"
                    description="While product-focused, it offers invaluable insights for BAs working closely with PMs."
                    href="https://www.thisisproductmanagement.com/"
                />
            </ResourceSection>

             {/* Events & Webinars */}
            <ResourceSection title="Events & Webinars">
                <ResourceCard 
                    title="BA World Events"
                    description="A series of global conferences for Business Analysts, often with virtual attendance options."
                    href="https://www.baworld.com/"
                />
                <ResourceCard 
                    title="IIBA Webinars"
                    description="The International Institute of Business Analysis hosts frequent online events for members and the public."
                    href="https://www.iiba.org/professional-development/webinars/"
                />
                 <ResourceCard 
                    title="ProjectManagement.com"
                    description="Offers a vast library of on-demand webinars, many of which are relevant to BAs."
                    href="https://www.projectmanagement.com/webinars/webinarMainOnDemand.cfm"
                />
            </ResourceSection>
        </div>
    );
};

export default RecommendationsPage;