# Evolve.ai — Don't predict the end of your career. Finance its evolution.

## The Problem

"AI will take your job" is everywhere. But no one tells you *what* to do about it or *how* you'd pay for the skills you need. People are frozen by fear, not laziness.

## The Solution

Evolve.ai is a predictive financial co-pilot that shows you exactly how AI will reshape your role — and finds money in your current spending to fund retraining.

**3 screens, 60 seconds, one clear path:**

1. **Reality Check** — Pick your job (Junior Accountant, Copywriter, etc.), enter your salary. See how AI will transform your tasks across 3 years.
2. **Timeline** — A visual evolution map showing what to learn, when, and why.
3. **Financials** — Split-screen comparison of your current salary vs. your evolved role, with a micro-budget generator that identifies disposable spending to redirect toward a Future-Proof Fund.

## Built With

TypeScript, Next.js 16, Tailwind v4, React 19, Framer Motion, Lucide Icons, Gemini 2.5 Flash API, BLS / Glassdoor / Salary.com salary data

## Key Technical Highlights

- **Zero backend state** — no database, no auth, no banking API. All data flows through a single API endpoint that combines hardcoded profiles with optional AI generation.
- **Gemini 2.5 Flash integration** — when an API key is set, the app generates custom evolution paths per job title. Without one, it falls back to curated data.
- **Micro-budget generator** — analyzes real-world spending buckets (subscriptions, dining out, unused services) and lets users allocate savings to retraining with one click.
- **Custom animation system** — character-by-character text reveal, eased salary counters, canvas particle background — no animation library bloat.

## How It Works

```
User picks job → /api/evolve?job=X&salary=Y 
                  → Returns { profile + evolution }
                  → Timeline page renders evolution steps
                  → Financials page renders salary split + budget allocator
```

## Why It Matters

AI anxiety is real but specific. People don't fear AI in general — they fear losing *their* job. Evolve.ai makes it personal: pick your role, see your path, find the money to get there.

## Links

- **Demo** — `npm run dev` then visit `http://localhost:3000`
- **Architecture** — [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **Demo Script** — [`DEMO_SCRIPT.md`](./DEMO_SCRIPT.md) (3-minute walkthrough)
