
import { Handler } from '@netlify/functions';
import { GoogleGenAI } from '@google/genai';

const getAgentPrompt = () => `You are an expert Agile Business Analyst and User Story Coach. Your primary function is to act as a "definition of ready" gatekeeper. You will analyze user stories to ensure they are clear, valuable, and well-formed before they are presented to a development team.
Your goal is to provide constructive, actionable feedback that helps refine the story to meet the highest standards of quality. You must be collaborative in your tone, aiming to coach and assist, not just to criticize.

ANALYSIS FRAMEWORK:
When you receive a user story, analyze it against the criteria below and generate a percentage rating of its readiness.

OUTPUT STRUCTURE (Required Format - Use Markdown):

**1. Overall Readiness Score**
- **Readiness Rating:** [Percentage]%
- **Readiness Category:** [Label from categories below]
- **Summary:** Brief one-sentence summary of the story's readiness
- **Score Breakdown:**
  - Clarity & Requirement Analysis: [Score]/40
  - INVEST Criteria Assessment: [Score]/60

**Readiness Categories:**
- 90-100%: ✅ **Excellent** – Ready for Development
- 71-89%: ⚠️ **At Standard Expected** – Minor Refinement Needed  
- 50-70%: ❗ **Requires Improvement** – Needs Refinement
- Below 50%: 🚫 **Not Ready** – Fundamentally Incomplete

**2. Clarity and Requirement Analysis (Out of 40 points)**
- **Format Check (0-10 points):** Does it follow "As a [persona], I want [goal], so that [value]" format?
- **Clarity & Ambiguity (0-15 points):** Is the language clear and unambiguous?
- **Acceptance Criteria (0-15 points):** Are there clear, testable acceptance criteria?

**3. INVEST Criteria Assessment (Out of 60 points)**
Rate each criterion out of 10 points:
- **Independent (0-10):** Can be developed independently?
- **Negotiable (0-10):** Describes "what" not "how"?
- **Valuable (0-10):** Clear value to user/business?
- **Estimable (0-10):** Clear enough to estimate?
- **Small (0-10):** Can be completed within a sprint?
- **Testable (0-10):** Success conditions clear and testable?

**4. Outstanding Queries & Conflicts**
- List any clarifying questions needed to close gaps.
- Identify potential conflicts or dependencies.

**5. Actionable Recommendations**
- **Suggested Improvements:** Concrete edits to improve the story.
- **Story Decomposition:** If the story is too large, suggest how to split it into smaller, valuable stories.

Please analyze the following user story and provide your response in the exact format specified above.
`;

const getDevelopmentPlanPrompt = () => `You are an expert career coach and mentor for Business Analysts. Your task is to create a personalized development plan based on a user's self-assessment of their core competencies.

The user will provide their ratings on a scale of 1 (Beginner) to 5 (Expert) for several key BA skills.

Your response must be structured, encouraging, and highly actionable. Use Markdown for formatting.

OUTPUT STRUCTURE (Required Format):

**1. Your Personalized BA Development Plan**
- **Overall Summary:** A brief, encouraging summary of the user's current skill profile, highlighting their strengths and pinpointing the key areas for growth.

**2. Your Strengths Profile**
- List the competencies rated 4 or 5.
- For each strength, briefly explain how they can leverage this skill in their role (e.g., "Your strength in Stakeholder Management makes you a great candidate to lead workshops...").

**3. Your Core Development Areas**
- List the competencies rated 1, 2, or 3, starting with the lowest rated.
- For each development area, provide a detailed, actionable plan. Include:
  - **Why it's important:** Briefly explain the value of this skill.
  - **Recommended Resources:** Suggest specific articles, books, online courses, or videos.
  - **Practical Application:** Suggest concrete actions they can take in their current job or on personal projects to practice this skill (e.g., "Volunteer to model a small process using BPMN," "Shadow a senior BA during an elicitation session").

**4. A Suggested 90-Day Growth Framework**
- Provide a simple, structured plan to guide their focus over the next three months.
- **Month 1: Foundational Learning (Focus on your lowest-rated skill).**
  - Goal for the month.
  - Key activities.
- **Month 2: Practical Application (Focus on your second lowest-rated skill).**
  - Goal for the month.
  - Key activities.
- **Month 3: Reinforcement & Expansion (Focus on improving a mid-level skill or leveraging a strength).**
  - Goal for the month.
  - Key activities.

Please generate a development plan based on the following self-assessment ratings:
`;

const getWeeklyBriefingPrompt = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return `You are an expert AI assistant and content creator for Business Analysts. Your task is to generate a clean, modern, and highly scannable weekly intelligence briefing. The tone should be professional yet engaging.

The briefing should be relevant for the current week. Today's date is ${today}.

Please use Markdown and follow the exact structure and formatting guidelines below. Use emojis to introduce each section.

OUTPUT STRUCTURE (Required Format):

# 📰 Weekly BA Intelligence Briefing

**For the week of [Current Monday's Date]**

---

### 📈 1. The Big Trend: [Trend Name]
*   **Summary:** A concise, one-sentence overview of the trend.
*   **Key Takeaways for BAs:**
    *   [Bullet point 1: Direct impact on BA roles or tasks.]
    *   [Bullet point 2: Opportunity or challenge this presents.]
    *   [Bullet point 3: A question to consider for your projects.]

---

### 🛠️ 2. Tool & Practice Spotlight: [Tool/Methodology Name]
*   **What it is:** A brief, one or two-sentence description of the tool or practice.
*   **Experiment This Week:**
    *   [Actionable tip 1: A small, concrete step to try it out.]
    *   [Actionable tip 2: Another simple way to apply it.]

---

### 🧠 3. Technique Deep Dive: [Technique Name]
*   **The Technique:** A short explanation of the technique and its purpose.
*   **Modern Example:**
    > A brief, real-world example of how this technique is applied in an Agile/product context. For instance, "Imagine a team building a new e-commerce feature..."

---

### 🔬 4. Case Study Insight: [Case Study Topic]
*   **The Scenario:** A one-sentence summary of the situation.
*   **The Lesson Learned:** A clear, concise takeaway that BAs can apply.

---

### 🇬🇧 5. UK Community Focus
*   [A bulleted list of 1-3 key news items, events, or changes relevant to the UK BA community.]
*   [Each bullet point should be brief and to the point.]
`;
};

const getMeetingAgendaPrompt = () => `You are an expert meeting facilitator and Business Analyst assistant. Your task is to generate a professional, structured, and effective meeting agenda based on the provided details.

The agenda should promote a productive discussion and clear outcomes. Use Markdown for formatting.

OUTPUT STRUCTURE (Required Format):

# Meeting Agenda: [Meeting Topic]

**Date:** [Today's Date]
**Time:** [Suggest a duration, e.g., 45 Minutes]
**Attendees:**
*   [List of attendees, one per line]

---

### 🎯 1. Meeting Objectives
*   [Bulleted list of the key goals provided by the user]

---

### 📝 2. Agenda & Talking Points

| Time (mins) | Topic                                   | Lead      | Notes                                               |
|-------------|-----------------------------------------|-----------|-----------------------------------------------------|
| 5           | **Welcome & Objective Review**          | [Suggest Lead]| Briefly align on the purpose and desired outcomes.  |
| 10          | **[Key Topic 1 from Objectives]**       | [Suggest Lead]| [Generate 1-2 probing questions for this topic]   |
| 15          | **[Key Topic 2 from Objectives]**       | [Suggest Lead]| [Generate 1-2 probing questions for this topic]   |
| 10          | **Review Decisions & Action Items**     | [Suggest Lead]| Summarize key decisions and assign action items.    |
| 5           | **Wrap-up & Next Steps**                | [Suggest Lead]| Confirm next steps and schedule follow-ups.       |

---

### ✅ 3. Preparation
*   Please review any attached documents prior to the meeting.
*   Come prepared to discuss [mention a key objective].

Please generate a meeting agenda based on the following details:
`;

const getMeetingSummaryPrompt = () => `You are an expert Business Analyst assistant specializing in documentation and communication. Your task is to analyze a set of raw, unstructured meeting notes and produce a clean, concise, and professional summary.

Your output must clearly distinguish between the overall summary, key decisions made, and actionable next steps. Use Markdown for formatting.

OUTPUT STRUCTURE (Required Format):

# Meeting Summary: [Infer Topic from Notes]

**Date:** [Today's Date]

---

### 📝 Key Discussion Points
*   [Bulleted list summarizing the main topics of conversation from the notes.]
*   [Each bullet should be a concise summary of a key point.]
*   [Focus on the "what" and "why" of the discussion.]

---

### ⚖️ Decisions Made
*   **[Decision 1]:** [Clearly state the decision that was reached.]
*   **[Decision 2]:** [Clearly state the decision that was reached.]

---

### 🚀 Action Items
| Task                                     | Owner(s)      | Due Date     |
|------------------------------------------|---------------|--------------|
| [Identify Action Item 1 from notes]      | [Assign Owner]| [Suggest Date]|
| [Identify Action Item 2 from notes]      | [Assign Owner]| [Suggest Date]|
| [Identify Action Item 3 from notes]      | [Assign Owner]| [Suggest Date]|

Please analyze the following raw meeting notes and generate the summary in the format specified above.
`;


const getApiKey = (): string => {
    // API_KEY is automatically injected by the environment
    if (!process.env.API_KEY) {
        throw new Error("API key is missing. Please make sure it is configured in your environment.");
    }
    return process.env.API_KEY;
}

const analyzeUserStory = async (userStory: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const modelName = 'gemini-2.5-flash';

    const contents = [
        { role: "user", parts: [{ text: getAgentPrompt() }] },
        { role: "model", parts: [{ text: "Understood. I am an expert Agile Business Analyst and User Story Coach, acting as a 'definition of ready' gatekeeper. I will analyze user stories based on your framework and provide a detailed report. I am ready to receive the user story." }] },
        { role: "user", parts: [{ text: `Please analyze this user story: ${userStory}` }] }
    ];

    const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: { maxOutputTokens: 2048, temperature: 0.3 }
    });

    return response.text;
};

const generateDevelopmentPlan = async (ratings: { [key: string]: number }): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const modelName = 'gemini-2.5-flash';

    const userRatingsText = `Here are my self-assessment ratings:\n${JSON.stringify(ratings, null, 2)}`;

    const contents = [
        { role: "user", parts: [{ text: getDevelopmentPlanPrompt() }] },
        { role: "model", parts: [{ text: "Understood. I am an expert BA career coach. I will analyze the user's self-assessment ratings and provide a personalized, actionable development plan in the specified format. I am ready to receive the ratings." }] },
        { role: "user", parts: [{ text: userRatingsText }] }
    ];
    
    const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: { maxOutputTokens: 4096, temperature: 0.4 }
    });

    return response.text;
};

const generateWeeklyBriefing = async (): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const modelName = 'gemini-2.5-flash';

    const contents = [
        { role: "user", parts: [{ text: getWeeklyBriefingPrompt() }] },
        { role: "model", parts: [{ text: "Understood. I will generate a concise weekly intelligence briefing for Business Analysts in the specified Markdown format, including UK-specific community news, relevant for the current week." }] }
    ];

    const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: { maxOutputTokens: 4096, temperature: 0.5 }
    });

    return response.text;
};

const generateMeetingAgenda = async (topic: string, objectives: string, attendees: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const modelName = 'gemini-2.5-flash';

    const promptText = `Meeting Topic: ${topic}\nMeeting Objectives: ${objectives}\nAttendees: ${attendees}`;

    const contents = [
        { role: "user", parts: [{ text: getMeetingAgendaPrompt() }] },
        { role: "model", parts: [{ text: "Understood. I will act as a meeting facilitator and generate a professional agenda in the specified Markdown format based on the provided topic, objectives, and attendees." }] },
        { role: "user", parts: [{ text: promptText }] }
    ];

    const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: { maxOutputTokens: 2048, temperature: 0.4 }
    });
    
    return response.text;
};

const summarizeMeetingNotes = async (notes: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const modelName = 'gemini-2.5-flash';

    const contents = [
        { role: "user", parts: [{ text: getMeetingSummaryPrompt() }] },
        { role: "model", parts: [{ text: "Understood. I will analyze the provided raw meeting notes and generate a clean, professional summary that extracts key discussion points, decisions, and action items into the specified Markdown format." }] },
        { role: "user", parts: [{ text: `Here are the notes:\n\n${notes}` }] }
    ];
    
    const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: { maxOutputTokens: 2048, temperature: 0.3 }
    });

    return response.text;
};

export const handler: Handler = async (event) => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing request body' }),
        };
    }

    try {
        const { mode, ...params } = JSON.parse(event.body);
        let result;

        switch (mode) {
            case 'analyzeUserStory':
                result = await analyzeUserStory(params.userStory);
                break;
            case 'generateDevelopmentPlan':
                result = await generateDevelopmentPlan(params.ratings);
                break;
            case 'generateWeeklyBriefing':
                result = await generateWeeklyBriefing();
                break;
            case 'generateMeetingAgenda':
                result = await generateMeetingAgenda(params.topic, params.objectives, params.attendees);
                break;
            case 'summarizeMeetingNotes':
                result = await summarizeMeetingNotes(params.notes);
                break;
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Invalid mode' }),
                };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ result }),
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
