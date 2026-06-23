# Evolve.ai

**Track:** Money, Jobs & AI — Will AI Steal My Future?

> Don't predict the end of your career. Finance its evolution.

Evolve.ai is a predictive financial co-pilot that transforms AI career anxiety into a micro-budgeted financial roadmap to become the AI-augmented worker of tomorrow.

## Repository

- **GitHub:** [https://github.com/Amitk003/Evolve-ai](https://github.com/Amitk003/Evolve-ai)
- **Live Site:** *Not yet deployed — run locally with `npm run dev`*

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and add your Gemini API key:

```bash
GEMINI_API_KEY=your_key_here
```

The app works fully without an API key — it falls back to hardcoded evolution data.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion, CSS animations |
| Icons | Lucide React |
| Font | Plus Jakarta Sans (variable) |
| AI (optional) | Gemini 2.5 Flash |

---

## Project Structure

```
src/
├── app/
│   ├── api/evolve/route.ts   # Gemini LLM API endpoint
│   ├── financials/page.tsx    # Split-screen financial impact
│   ├── timeline/page.tsx      # Career evolution timeline
│   ├── globals.css            # Design tokens + global styles
│   ├── layout.tsx             # Root layout with NavBar
│   └── page.tsx               # "Reality Check" input screen
├── components/
│   ├── AnimatedCounter.tsx    # Eased number counter
│   ├── ButtonGhostFlat.tsx    # Flat ghost text button
│   ├── ButtonPill.tsx         # Pill button (filled/ghost/outlined)
│   ├── CharReveal.tsx         # Character-by-character text reveal
│   ├── DashedDivider.tsx      # Section separator
│   ├── GhostInput.tsx         # Bottom-border input field
│   ├── NavBar.tsx             # Top navigation with letter stagger
│   ├── PageTransition.tsx     # AnimatePresence page wrapper
│   ├── ScrollPrompt.tsx       # Animated scroll indicator
│   ├── SplitScreen.tsx        # Static vs Evolved financial comparison
│   └── TimelineView.tsx       # Vertical career timeline
├── data/
│   └── profiles.ts            # 6 hardcoded job profiles
└── lib/
    └── gemini.ts              # Gemini API client + fallback
```

---

## Design System

Inspired by the **ORYZO AI** aesthetic — warm dark minimalism.

| Token | Value | Usage |
|-------|-------|-------|
| Studio Black | `#100904` | Page canvas |
| Warm Cream | `#ffedd7` | All text, borders |
| Cork Shadow | `#40372e` | Dashed dividers |
| Dark Cork | `#382416` | Filled button bg |
| Burnt Sienna | `#dc5000` | Hairline accent |
| Grey Brown | `#6c5f51` | Muted text |
| Static Red | `#8b1a1a` | Static path (financial) |
| Evolved Green | `#1a6b3c` | Evolved path (financial) |

Typography uses **Plus Jakarta Sans Variable** at every scale from 10px to 51px.

---

## Branches

| Branch | Description |
|--------|-------------|
| `main` | Stable production |
| `phase-0-setup` | Next.js scaffold + deps |
| `phase-1-design-system` | Design tokens, components, base layout |
| `phase-5-animations-polish` | Animations, transitions, counters |
| `phase-6-documentation` | Docs (you are here) |

---

## License

MIT
