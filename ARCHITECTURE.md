# Architecture

## Overview

Evolve.ai is a **3-page Next.js App Router** application with zero backend state. All data is either hardcoded (job profiles, spending) or retrieved from the Gemini 2.5 Flash API (with a hardcoded fallback).

```
User Input → / (Reality Check)
                ↓ (select job + salary)
             /timeline (Evolution Timeline)
                ↓ (view evolution)
             /financials (Split-Screen Financial Impact)
```

---

## Data Flow

```
┌──────────────┐     ┌──────────────────┐     ┌───────────────────┐
│  page.tsx     │────▶│ timeline/page.tsx │────▶│ financials/page.tsx│
│  (Reality     │     │ (Timeline + Steps)│     │ (SplitScreen +    │
│   Check)      │     │                  │     │  Budget Allocator) │
└──────┬───────┘     └──────────────────┘     └───────────────────┘
       │                       │                       │
       │ searchProfiles()      │ getProfileById()      │ getProfileById()
       ▼                       ▼                       ▼
   ┌────────┐           ┌──────────────┐        ┌──────────────┐
   │ profiles.ts        │ profiles.ts  │        │ profiles.ts  │
   │ (hardcoded)        │ (hardcoded)  │        │ (hardcoded)  │
   └────────┘           └──────┬───────┘        └──────┬───────┘
                               │ (fallback)             │ (fallback)
                               ▼                        ▼
                         ┌──────────┐           ┌──────────┐
                         │ gemini.ts│           │ gemini.ts│
                         │ (optional│           │ (optional│
                         │  API)    │           │  API)    │
                         └──────────┘           └──────────┘
```

## Key Design Decisions

### 1. No Real Banking Integration

Per PRD: **"FAKE IT."** The spending pie chart is purely hardcoded. The "Allocate to Evolve Fund" button just animates a CSS transition on the SVG circle.

### 2. Hardcoded Job Profiles

6 profiles are defined in `src/data/profiles.ts`. Each includes:
- Current title & salary
- Disposable spending buckets
- Full evolution data (3 time steps, task breakdowns, new title, skills)

### 3. LLM Integration (Optional)

The Gemini 2.5 Flash client in `src/lib/gemini.ts`:
- Sends a structured JSON prompt
- Parses the response and returns typed data
- Falls back to hardcoded data if no API key is set or API call fails
- The API route at `src/app/api/evolve/route.ts` uses `?job=title&salary=number`

Currently the app **always uses the hardcoded profiles** (the API route is not called by the pages). The LLM integration is ready for future enhancement.

### 4. Design System

Colors, typography, spacing, and radii are defined as **CSS custom properties** in `globals.css` and mirrored in Tailwind's `@theme inline` block for utility class usage.

---

## Component Tree

```
RootLayout
├── NavBar (fixed top, letter-stagger animation)
├── PageTransition (AnimatePresence wrapper)
│   ├── HomePage
│   │   ├── CharReveal (headline)
│   │   ├── GhostInput (search + salary)
│   │   └── ButtonPill (submit)
│   ├── TimelinePage
│   │   ├── CharReveal (title)
│   │   ├── TimelineView
│   │   │   └── TimelineStep (per year)
│   │   └── ButtonPill (nav to financials)
│   └── FinancialsPage
│       ├── CharReveal (title)
│       ├── AnimatedCounter (salary increase)
│       └── SplitScreen
│           ├── StaticPath (red)
│           ├── EvolvedPath (green)
│           ├── PieChart (SVG)
│           └── ButtonPill (allocate)
└── ScrollPrompt (fixed bottom)
```

---

## Route Design

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Reality Check input with autocomplete |
| `/timeline?job=X&salary=Y` | Static | Evolution timeline for selected job |
| `/financials?job=X&salary=Y` | Static | Split-screen financial impact |
| `/api/evolve?job=X&salary=Y` | Dynamic | Gemini API proxy (not used by pages) |

---

## Animation System

| Animation | Implementation | Trigger |
|-----------|---------------|---------|
| Page transitions | `PageTransition` (framer-motion) | Route change |
| Character reveal | `CharReveal` (IntersectionObserver + CSS transitions) | Scroll into view |
| Salary counter | `AnimatedCounter` (requestAnimationFrame + eased lerp) | Page mount |
| Split-screen reveal | CSS `clip-path` animation | Page mount |
| Nav letter stagger | CSS `fadeIn` with per-character delay | Page load |
| Pie chart morph | SVG `stroke-dasharray` CSS transition | Button click |
| Scroll prompt | CSS opacity transition | Window scroll > 100px |
