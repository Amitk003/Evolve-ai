const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export interface EvolutionResponse {
  steps: {
    year: number;
    taskBreakdown: { label: string; pct: number }[];
    pctAi: number;
  }[];
  newTitle: string;
  salaryIncreasePct: number;
  skills: string[];
}

const FALLBACK: EvolutionResponse = {
  steps: [
    {
      year: 2024,
      taskBreakdown: [
        { label: "Current core tasks", pct: 70 },
        { label: "Emerging AI tools", pct: 30 },
      ],
      pctAi: 15,
    },
    {
      year: 2025,
      taskBreakdown: [
        { label: "AI-assisted work", pct: 55 },
        { label: "Strategic oversight", pct: 45 },
      ],
      pctAi: 45,
    },
    {
      year: 2027,
      taskBreakdown: [
        { label: "AI Strategy & Direction", pct: 60 },
        { label: "Creative Problem Solving", pct: 40 },
      ],
      pctAi: 70,
    },
  ],
  newTitle: "AI-Augmented Professional",
  salaryIncreasePct: 30,
  skills: ["AI Tool Proficiency", "Strategic Thinking"],
};

export async function getEvolution(
  jobTitle: string,
  salary: number
): Promise<EvolutionResponse> {
  if (!GEMINI_API_KEY) {
    console.warn("No GEMINI_API_KEY set — using fallback evolution data");
    return FALLBACK;
  }

  try {
    const prompt = `Given the job title "${jobTitle}" with current salary $${salary}, predict the evolution of this role due to AI. Return ONLY valid JSON (no markdown, no code fences) with this exact structure:
{
  "steps": [
    {
      "year": 2024,
      "taskBreakdown": [{"label": "Task name", "pct": percentage}],
      "pctAi": percentage_of_tasks_handled_by_AI
    },
    {
      "year": 2025,
      "taskBreakdown": [{"label": "Task name", "pct": percentage}],
      "pctAi": percentage_of_tasks_handled_by_AI
    },
    {
      "year": 2027,
      "taskBreakdown": [{"label": "Task name", "pct": percentage}],
      "pctAi": percentage_of_tasks_handled_by_AI
    }
  ],
  "newTitle": "The evolved job title after AI augmentation",
  "salaryIncreasePct": expected_salary_increase_percentage,
  "skills": ["exactly 2 specific micro-skills needed"]
}

Each step should have 2-3 task breakdown items that sum to 100%. Skills should be 2 specific, actionable micro-skills.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", response.status, await response.text());
      return FALLBACK;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) return FALLBACK;

    // Clean potential markdown fences
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed: EvolutionResponse = JSON.parse(cleaned);
    return parsed;
  } catch (err) {
    console.error("Gemini fetch error:", err);
    return FALLBACK;
  }
}
