export interface JobProfile {
  id: string;
  title: string;
  salary: number;
  category: string;
  disposable: { label: string; amount: number }[];
  evolution: {
    steps: {
      year: number;
      taskBreakdown: { label: string; pct: number }[];
      pctAi: number;
    }[];
    newTitle: string;
    salaryIncreasePct: number;
    skills: string[];
  };
}

// Salary data sourced from BLS OEWS (May 2024), Glassdoor, Salary.com, Indeed, PayScale — June 2026
// All figures are US national median or mean for entry/junior level
export const jobProfiles: JobProfile[] = [
  {
    id: "junior-accountant",
    title: "Junior Accountant",
    salary: 57252,
    category: "Finance",
    disposable: [
      { label: "Unused subscriptions", amount: 15 },
      { label: "Dining out", amount: 25 },
      { label: "Miscellaneous", amount: 10 },
    ],
    evolution: {
      steps: [
        {
          year: 2024,
          taskBreakdown: [
            { label: "Data Entry", pct: 70 },
            { label: "Analysis", pct: 30 },
          ],
          pctAi: 10,
        },
        {
          year: 2025,
          taskBreakdown: [
            { label: "Data Entry", pct: 30 },
            { label: "Analysis", pct: 70 },
          ],
          pctAi: 40,
        },
        {
          year: 2027,
          taskBreakdown: [
            { label: "AI Anomaly Auditing", pct: 60 },
            { label: "Strategic Advisory", pct: 40 },
          ],
          pctAi: 80,
        },
      ],
      newTitle: "AI Anomaly Auditor & Strategic Advisor",
      salaryIncreasePct: 38,
      skills: [
        "Prompt Engineering for Auditing",
        "Python for Data Validation",
      ],
    },
  },
  {
    id: "copywriter",
    title: "Copywriter",
    salary: 63409,
    category: "Marketing",
    disposable: [
      { label: "Software subscriptions", amount: 20 },
      { label: "Coffee shop", amount: 20 },
      { label: "Courses not started", amount: 15 },
    ],
    evolution: {
      steps: [
        {
          year: 2024,
          taskBreakdown: [
            { label: "Blog writing", pct: 50 },
            { label: "Social media copy", pct: 30 },
            { label: "Email campaigns", pct: 20 },
          ],
          pctAi: 15,
        },
        {
          year: 2025,
          taskBreakdown: [
            { label: "AI-edited content", pct: 50 },
            { label: "Strategy & tone", pct: 30 },
            { label: "Performance analysis", pct: 20 },
          ],
          pctAi: 45,
        },
        {
          year: 2027,
          taskBreakdown: [
            { label: "AI Content Strategy", pct: 50 },
            { label: "Brand Voice Direction", pct: 30 },
            { label: "Multi-channel Orchestration", pct: 20 },
          ],
          pctAi: 70,
        },
      ],
      newTitle: "AI Content Strategist & Brand Voice Director",
      salaryIncreasePct: 30,
      skills: [
        "LLM Prompt Architecture",
        "Content Analytics & SEO",
      ],
    },
  },
  {
    id: "graphic-designer",
    title: "Graphic Designer",
    salary: 55000,
    category: "Creative",
    disposable: [
      { label: "Stock asset subscriptions", amount: 18 },
      { label: "Delivery food", amount: 22 },
      { label: "Unused cloud storage", amount: 10 },
    ],
    evolution: {
      steps: [
        {
          year: 2024,
          taskBreakdown: [
            { label: "Layout & templates", pct: 45 },
            { label: "Asset creation", pct: 35 },
            { label: "Client revisions", pct: 20 },
          ],
          pctAi: 15,
        },
        {
          year: 2025,
          taskBreakdown: [
            { label: "AI-assisted design", pct: 40 },
            { label: "Creative direction", pct: 35 },
            { label: "Asset curation", pct: 25 },
          ],
          pctAi: 40,
        },
        {
          year: 2027,
          taskBreakdown: [
            { label: "AI Design System Mgmt", pct: 45 },
            { label: "Creative Strategy", pct: 35 },
            { label: "Brand Experience Design", pct: 20 },
          ],
          pctAi: 65,
        },
      ],
      newTitle: "AI Creative Director & Design Systems Lead",
      salaryIncreasePct: 35,
      skills: [
        "Generative AI Tooling (Midjourney, DALL-E)",
        "Design System Architecture",
      ],
    },
  },
  {
    id: "paralegal",
    title: "Paralegal",
    salary: 55000,
    category: "Legal",
    disposable: [
      { label: "Legal research tools", amount: 25 },
      { label: "Lunch out", amount: 20 },
      { label: "Parking/commute", amount: 15 },
    ],
    evolution: {
      steps: [
        {
          year: 2024,
          taskBreakdown: [
            { label: "Document review", pct: 55 },
            { label: "Research", pct: 25 },
            { label: "Filing & admin", pct: 20 },
          ],
          pctAi: 15,
        },
        {
          year: 2025,
          taskBreakdown: [
            { label: "AI-assisted review", pct: 40 },
            { label: "Case strategy", pct: 35 },
            { label: "Client coordination", pct: 25 },
          ],
          pctAi: 40,
        },
        {
          year: 2027,
          taskBreakdown: [
            { label: "AI Legal Analysis", pct: 45 },
            { label: "Case Strategy", pct: 35 },
            { label: "Client Advisory", pct: 20 },
          ],
          pctAi: 65,
        },
      ],
      newTitle: "AI Legal Analyst & Case Strategist",
      salaryIncreasePct: 32,
      skills: [
        "Legal AI Tool Management (CoCounsel, Harvey)",
        "Data-Driven Case Analytics",
      ],
    },
  },
  {
    id: "software-tester",
    title: "Software Tester (QA)",
    salary: 65000,
    category: "Technology",
    disposable: [
      { label: "Dev tool subscriptions", amount: 20 },
      { label: "Cloud credits unused", amount: 15 },
      { label: "Coffee & snacks", amount: 15 },
    ],
    evolution: {
      steps: [
        {
          year: 2024,
          taskBreakdown: [
            { label: "Manual testing", pct: 60 },
            { label: "Test case writing", pct: 25 },
            { label: "Bug reporting", pct: 15 },
          ],
          pctAi: 10,
        },
        {
          year: 2025,
          taskBreakdown: [
            { label: "Automated test scripts", pct: 45 },
            { label: "AI test generation", pct: 35 },
            { label: "Results analysis", pct: 20 },
          ],
          pctAi: 45,
        },
        {
          year: 2027,
          taskBreakdown: [
            { label: "AI Test Architecture", pct: 45 },
            { label: "Quality Strategy", pct: 35 },
            { label: "DevSecOps Integration", pct: 20 },
          ],
          pctAi: 70,
        },
      ],
      newTitle: "AI QA Architect & Quality Strategist",
      salaryIncreasePct: 28,
      skills: [
        "AI Test Automation (Playwright + AI)",
        "CI/CD Pipeline Management",
      ],
    },
  },
  {
    id: "data-entry-clerk",
    title: "Data Entry Clerk",
    salary: 38000,
    category: "Administration",
    disposable: [
      { label: "Music/streaming", amount: 12 },
      { label: "Vending snacks", amount: 18 },
      { label: "Phone plan extras", amount: 20 },
    ],
    evolution: {
      steps: [
        {
          year: 2024,
          taskBreakdown: [
            { label: "Manual data entry", pct: 80 },
            { label: "Data verification", pct: 15 },
            { label: "Report generation", pct: 5 },
          ],
          pctAi: 10,
        },
        {
          year: 2025,
          taskBreakdown: [
            { label: "Data validation", pct: 45 },
            { label: "Exception handling", pct: 35 },
            { label: "Process optimization", pct: 20 },
          ],
          pctAi: 50,
        },
        {
          year: 2027,
          taskBreakdown: [
            { label: "Data Pipeline Management", pct: 45 },
            { label: "Quality Assurance", pct: 30 },
            { label: "Process Automation Design", pct: 25 },
          ],
          pctAi: 75,
        },
      ],
      newTitle: "Data Pipeline Manager & Automation Specialist",
      salaryIncreasePct: 42,
      skills: [
        "Low-Code Automation Tools",
        "SQL & Data Validation",
      ],
    },
  },
];

export function getProfileById(id: string): JobProfile | undefined {
  return jobProfiles.find((p) => p.id === id);
}

export function searchProfiles(query: string): JobProfile[] {
  const q = query.toLowerCase();
  return jobProfiles.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
