<div align="center"> <img src="https://github.com/user-attachments/assets/08d59e7e-d7a9-4951-81ed-d6f8e7fc992c" alt="BA Studio UK Logo" width="200"/> <h1>BA Studio</h1> <p><i>Clarity. Strategy. Solutions.</i></p> <p>An AI-powered toolkit for Business Analysts, featuring a User Story Agent, educational resources, and practical templates to enhance BA skills and productivity.</p> </div>

✨ Key Features
BA Studio is an all-in-one platform designed to support Business Analysts in their day-to-day tasks and professional development.

🤖 User Story Agent: Leverage AI to analyze, score, and refine your user stories against industry best practices like INVEST.

🤝 Meeting Assistant: Generate structured meeting agendas and instantly summarize unstructured notes to extract key decisions and action items.

📰 Latest News & Briefings: Get a personalized, AI-powered weekly intelligence briefing on the latest BA trends, tools, and techniques.

📊 Competency Assessment: Receive a personalized development plan from an AI coach based on your self-assessed skills in core BA competencies.

🧠 Knowledge Quiz: Test your understanding of fundamental BA concepts with an interactive, multiple-choice quiz.

📚 Core Competencies: Explore fundamental BA skills, from requirements elicitation to stakeholder management, with curated resources.

📋 Tools & Templates: Access a collection of downloadable templates for documents like BRDs and Use Cases to kickstart your work.

💡 Curated Recommendations: Discover essential books, websites, podcasts, and industry leaders to follow for continuous learning.

🛠️ Tech Stack
Frontend:(https://react.dev/),(https://www.typescriptlang.org/,(https://www.typescriptlang.org/)), Vite,(https://tailwindcss.com/)

Backend: Netlify Functions

AI: Google Gemini API

🚀 Getting Started
Follow these instructions to set up and run the project on your local machine for development and testing purposes.

Prerequisites
Node.js (version 18 or higher is recommended)

npm (comes with Node.js)

Installation & Setup
**Clone the repository:**bash git clone https://github.com/your-username/ba-studio.git cd ba-studio

Install dependencies:

Bash

npm install
Set up environment variables:

Create a new file named .env in the root of the project.

Add your Google Gemini API key to this file:

GEMINI_API_KEY="YOUR_API_KEY_HERE"
Important: The .env file contains sensitive credentials and should never be committed to version control. Ensure that .env is listed in your .gitignore file.

Run the development server:

Bash

npm run dev
The application will be available at http://localhost:3000.

☁️ Deployment
This project is configured for seamless deployment to Netlify.

Connect your repository to Netlify:

Push your code to a GitHub, GitLab, or Bitbucket repository.

In the Netlify dashboard, create a "New site from Git" and select your repository.

Configure build settings:

Netlify should automatically detect the settings from the netlify.toml file:

Build command: npm run build

Publish directory: dist

Functions directory: netlify/functions

Add environment variables:

In your Netlify site's settings, go to Site configuration > Environment variables.

Add a new variable with the key GEMINI_API_KEY and paste your secret API key as the value. This ensures your key is securely available to the serverless function in the production environment.

Deploy:

Trigger a deploy. Netlify will build the project and deploy the site and serverless functions.

📂 Project Structure
/
├── netlify/
│ └── functions/
│ └── gemini.ts # Serverless function to handle Gemini API calls
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable React components (Sidebar, Footer, etc.)
│ ├── pages/ # Page components for each feature
│ ├── test/ # Test files
│ ├── App.tsx # Main application component and routing logic
│ ├── main.tsx # Application entry point
│ └── index.css # Main CSS file with Tailwind directives
├──.env.example # Example environment file
├──.gitignore # Files to be ignored by Git
├── index.html # Main HTML entry file
├── netlify.toml # Netlify deployment configuration
├── package.json # Project dependencies and scripts
└── vite.config.ts # Vite configuration
