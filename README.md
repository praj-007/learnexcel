# MBA Excel Mastery — LearnExcel

Fully interactive web app for MBA students to master 25+ practical Excel formulas through real business datasets (Sales, Finance, HR, Operations).

**Live prototype features:**
- 8 structured learning modules
- Interactive business examples (SUMIF regional analysis, NPV calculator, HR metrics)
- 6-question quiz engine with instant feedback + confetti
- **Formula Mastery Lab** with guided step-by-step exercises
- Powerful **Formula Playground**: 4 editable datasets, live formula evaluation (SUMIF family, COUNTIFS, VLOOKUP, aggregates, SUMPRODUCT etc.), CSV export, Focus Mode, quick examples

Built as a scalable Next.js foundation for future expansion (user progress, real .xlsx import/export via SheetJS, AI tutor, accounts, etc.).

## Tech Stack (current)
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion + Sonner (toasts)
- Pure client-side formula engine (easily swappable for full parser later)
- localStorage progress tracking

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Key Interactions (ported from the original HTML prototype)
- Click any curriculum card → lesson modal with "Try it live" buttons
- Edit any cell in the Playground table → live data model updates
- Type or pick a formula → instant evaluation
- Switch datasets, reset, export CSV
- Guided Practice flows with answer checking
- Full-screen Focus Mode for the sandbox
- Quizzes submit + scoring

## Future Roadmap (see original plan in footer)
- Real Excel engine (Formula.js / handsontable + SheetJS)
- User accounts + synced progress (Supabase / Drizzle)
- Downloadable .xlsx practice files per module
- More formulas + visualization examples
- Deploy to Vercel (already perfect fit)

## Branch Naming (per project convention)
Short, no slashes/dots, ≤20 chars (e.g. `feat-playground`, `add-auth`).

## License
Internal prototype for educational use.

Built with ❤️ for future business leaders.
