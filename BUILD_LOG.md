# Build Log

All commands executed during the development of Evolve.ai.

---

## 2026-06-23

### Phase 0 — Repository & Project Scaffold

```powershell
# Clone empty repo
git clone https://github.com/Amitk003/Evolve-ai.git

# Install pnpm globally via npm.cmd
& "C:\Program Files\nodejs\npm.cmd" i -g pnpm

# Scaffold Next.js (used npx due to pnpm build restrictions)
& "C:\Program Files\nodejs\npx.cmd" create-next-app@latest temp-scaffold --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# Move scaffold to parent, delete temp
Copy-Item -Recurse -Force temp-scaffold\* .
Remove-Item -Recurse -Force temp-scaffold

# Install additional deps
& "C:\Program Files\nodejs\npm.cmd" install framer-motion lucide-react @fontsource-variable/plus-jakarta-sans

# Fix package name
edit package.json "temp-scaffold" → "evolve-ai"

# Create folder structure
New-Item -ItemType Directory -Path src\components, src\data, src\lib, src\app\timeline, src\app\financials, src\app\api\evolve -Force

# Write .env.example

# Initial commit
git add -A
git commit -m "chore: initial Next.js project scaffold with Tailwind v4, Plus Jakarta Sans, framer-motion, lucide"

# Push main
git branch -M main
git push -u origin main
```

### Phase 1 — Design System

```powershell
git checkout -b phase-1-design-system

# Files created:
# - src/app/globals.css (design tokens, CSS variables, animations)
# - src/app/layout.tsx (root layout with NavBar, ScrollPrompt)
# - src/components/ButtonPill.tsx
# - src/components/ButtonGhostFlat.tsx
# - src/components/GhostInput.tsx
# - src/components/DashedDivider.tsx
# - src/components/NavBar.tsx
# - src/components/ScrollPrompt.tsx
# - src/components/SplitScreen.tsx
# - src/components/TimelineView.tsx
# - src/data/profiles.ts (6 job profiles)
# - src/app/page.tsx (Reality Check input)
# - src/app/timeline/page.tsx (Evolution timeline)
# - src/app/financials/page.tsx (Financial impact)
# - src/app/api/evolve/route.ts (API endpoint)
# - src/lib/gemini.ts (Gemini client + fallback)
# - .env.local
# - .env.example

# Fix TypeScript:
edit TimelineView.tsx ease → "easeOut" as const

# Build verification
npx.cmd next build  # ✓ Compiled successfully

git add -A
git commit -m "feat: complete design system + all core UI pages and components"
git push -u origin phase-1-design-system
```

### Phase 5 — Animations & Polish

```powershell
git checkout -b phase-5-animations-polish

# Files created:
# - src/components/PageTransition.tsx (AnimatePresence wrapper)
# - src/components/CharReveal.tsx (character-by-character reveal)
# - src/components/AnimatedCounter.tsx (eased number counter)

# Updated:
# - src/app/page.tsx (CharReveal headline)
# - src/app/timeline/page.tsx (CharReveal title)
# - src/app/financials/page.tsx (CharReveal + AnimatedCounter)
# - src/components/TimelineView.tsx (type fix)

npx.cmd next build  # ✓ Compiled successfully

git add -A
git commit -m "feat: animations, page transitions, char reveal, animated counters"
git push -u origin phase-5-animations-polish
```

### Phase 6 — Documentation

```powershell
git checkout -b phase-6-documentation

# Files created:
# - BUILD_LOG.md (this file)
# - ARCHITECTURE.md
# - DEMO_SCRIPT.md
# - Updated README.md

git add -A
git commit -m "docs: add README, BUILD_LOG, ARCHITECTURE, DEMO_SCRIPT"
git push -u origin phase-6-documentation
```

---

## Dependencies Installed

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.2.9 | React framework |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | React DOM rendering |
| framer-motion | ^12.40.0 | Animations |
| lucide-react | ^1.21.0 | Icons |
| @fontsource-variable/plus-jakarta-sans | ^5.2.8 | Variable font |
| tailwindcss | ^4.3.1 | Utility CSS |
| @tailwindcss/postcss | ^4.3.1 | PostCSS plugin |
| typescript | ^5.9.3 | Type checking |

## Dependencies Not Installed (Out of Scope per PRD)

- Plaid / bank API integration
- User authentication / login
- Database (no SQLite, Postgres, etc.)
- Course purchasing APIs (Udemy, Coursera)
