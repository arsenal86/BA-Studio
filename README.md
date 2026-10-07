<div align="center">
  <img src="public/brand/ba-studio-uk-logo.svg" alt="BA Studio UK" width="200" />
  <h1>BA Studio UK</h1>
  <p>Practical AI tools and guidance for UK business analysts.</p>
  <p><a href="https://bastudiouk.netlify.app">bastudiouk.netlify.app</a></p>
</div>

## Features

| Tool                  | Route              | What it does                                                                            |
| --------------------- | ------------------ | --------------------------------------------------------------------------------------- |
| User story agent      | `/agent`           | Analyses, scores and refines a user story against good practice such as INVEST.         |
| Meeting assistant     | `/meeting`         | Generates a structured agenda, or summarises raw notes into decisions and actions.      |
| Latest news           | `/news`            | Produces a weekly AI briefing on BA trends, tools and techniques.                       |
| Competency assessment | `/assessment`      | Turns a self-assessment of five core competencies into a personalised development plan. |
| Knowledge quiz        | `/quiz`            | Multiple-choice quiz on core BA concepts, with explanations.                            |
| Core competencies     | `/competencies`    | Guide to fundamental BA skills, with links to further reading.                          |
| Tools and templates   | `/templates`       | Templates such as BRDs and use cases. Download links are placeholders for now.          |
| Recommendations       | `/recommendations` | Books, websites, podcasts, communities and people to follow.                            |

The first four use Google Gemini through a Netlify function. The rest are static content.

## Tech stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite 7](https://vite.dev/), [React Router 7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), driven by the BA Studio UK design system (see [Design system](#design-system))
- **Backend:** [Netlify Functions](https://docs.netlify.com/functions/overview/) (`netlify/functions/gemini.ts`)
- **AI:** [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`) via `@google/genai`
- **Rendering AI output:** `marked` for markdown, sanitised with `DOMPurify`
- **Testing:** [Vitest](https://vitest.dev/) and React Testing Library
- **Analytics:** Microsoft Clarity, injected into production builds only

## Getting started

### Prerequisites

- Node.js 22.16 or later, and npm 11 (see `engines` in `package.json`)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/), to run the AI function locally: `npm install -g netlify-cli`
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/arsenal86/BA-Studio.git
   cd BA-Studio
   npm install
   ```

2. Create a `.env` file from the example and add your Gemini API key:

   ```bash
   cp .env.example .env
   ```

   `.env` is git-ignored. Never commit a real key.

3. Start the app with the function running:

   ```bash
   netlify dev
   ```

   Open http://localhost:8888. Netlify Dev serves the Gemini function and proxies the Vite dev server (port 3001).

   `npm run dev` starts the frontend on its own at http://localhost:3001. The pages load, but the AI tools fail because nothing is serving `/.netlify/functions/gemini`.

### Scripts

| Command            | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `netlify dev`      | Run the app and the Gemini function locally |
| `npm run dev`      | Run the frontend only                       |
| `npm run build`    | Production build to `dist/`                 |
| `npm run preview`  | Preview the production build                |
| `npx vitest run`   | Run the tests                               |
| `npx tsc --noEmit` | Type-check                                  |
| `npm run lint`     | Lint with ESLint                            |
| `npm run format`   | Format with Prettier                        |

## Design system

All UI uses the **BA Studio UK** design system: https://claude.ai/artifact/T8dX7AjnDi1hPjActcJTa7

- **Tokens:** `src/styles/tokens.css` holds the colour tokens for light (`:root`) and dark (`.dark`) themes. `src/index.css` maps them to Tailwind utilities such as `bg-surface-100`, `text-ink` and `text-brand-navy`. **Tailwind's default palette is switched off**, so classes like `bg-slate-100` produce no styles.
- **Components:** shared UI lives in `components/ui/`: Button, Card, PageHeader, Input, Textarea, Alert, Spinner, Modal, SegmentedControl, Tag and MarkdownOutput. Use these before writing new markup.
- **Type:** Montserrat, with a type scale from `text-display` to `text-label`.
- **Copy:** plain UK English, with sentence case for headings and buttons.

[`CLAUDE.md`](CLAUDE.md) has the full rules.

## The Gemini function

The browser never sees the API key. All AI calls go through one Netlify function, `netlify/functions/gemini.ts`, which:

- accepts a `POST` with a `mode` (`analyzeUserStory`, `generateMeetingAgenda`, `summarizeMeetingNotes`, `generateDevelopmentPlan` or `generateWeeklyBriefing`) and that mode's parameters
- validates input before calling Gemini, returning `400` for missing, malformed or oversized input (user stories are capped at 5,000 characters)
- returns a generic `500` message on failure, and logs the details on the server only

It reads the key from `GEMINI_API_KEY`, falling back to `API_KEY`.

## Deployment

The site deploys to Netlify. `netlify.toml` sets the build:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`
- A catch-all redirect to `index.html`, so client-side routes work on refresh

Under **Site configuration › Environment variables** in Netlify, set `GEMINI_API_KEY` to your key. Each pull request gets a deploy preview.

> Netlify deploys **every file** in `netlify/functions/` as a function. Keep tests and helpers out of that folder. The function tests live in `src/test/geminiFunction.test.ts`.

## Project structure

```
/
├── App.tsx                  # App shell, theme toggle and routes
├── components/
│   ├── ui/                  # Design-system components (Button, Card, Modal…)
│   ├── BrandLogo.tsx        # Logo (light) and wordmark (dark)
│   ├── Sidebar.tsx, Footer.tsx, FeatureCard.tsx, GuidanceModal.tsx
│   └── icons.tsx            # Line icons
├── pages/                   # One component per route, plus NotFoundPage
├── netlify/functions/
│   └── gemini.ts            # Serverless function for all Gemini calls
├── public/
│   ├── brand/               # Logo from the design system
│   └── favicon.svg
├── src/
│   ├── main.tsx             # Entry point (BrowserRouter)
│   ├── index.css            # Tailwind entry: token mapping, type scale, markdown styles
│   ├── styles/tokens.css    # Design tokens (light and dark)
│   └── test/                # Vitest tests
├── types.ts
├── index.html
├── netlify.toml
├── vite.config.ts
├── vitest.config.ts
├── CLAUDE.md                # Guidance for AI-assisted changes
└── .env.example
```
