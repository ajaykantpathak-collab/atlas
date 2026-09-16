# FINAL BUILD PLAN — Merged (Our Plan + Claude's Improvements)

## Principles
- ADDITIVE ONLY. Never ruin existing data or working systems.
- Keep: Neo4j, Qdrant, 915 sims, 3 mastery models, 26 services, achievements, bilingual.
- Add Claude's genuinely new capabilities (photo input, WhatsApp, voice, worked examples, ask-a-teacher, data monitor, error reporting).
- Replace only where Claude's idea is clearly better.
- Improve prompts with Claude's better template (device specs, Hinglish, failure cases, "what not to build").
- Build in batches to avoid OOM. Each batch wires existing systems + adds new capability.
- Use Fable-5 for critical code, Opus for content/mappings.
- 10 parallel API calls per batch.

## What We Keep (Existing Assets)
- Neo4j curriculum graph (loaded, working)
- Qdrant embeddings (loaded, working)
- 915 simulations (audit + fix, keep the good ones)
- BKT + IRT + AFM (all three, pick BKT for primary display)
- 26 v2 services (audit, wire into API, fix broken ones)
- Achievements system (keep for Class 1-8, optional for 9-12)
- Bilingual content (English + Hindi, architecture for more)
- 37 solver files (audit, fix syntax, standardize result shape)
- 16 question generators (audit, fix, validate against solvers)
- YAML step types, problem types, node mappings (keep, verify)
- All premium UI components (Aurora, particles, shaders, TiltCard, etc.)
- All renderers (Diagram, Flowchart, Molecular3D, CodeEditor, etc.)
- All mascots (Sheru, AtlasDragon, RiveOwl, AtlasPuppy)
- Existing frontend pages (61 pages, 981 components)
- MathLive, KaTeX, D3, Plotly, Three.js, Framer Motion, Zustand, React Query

## What We Add (Claude's Genuinely New Capabilities)
1. Photo → Solve (camera + Tesseract.js + Pix2Tex ONNX) — new input path, doesn't replace MathLive
2. WhatsApp bot — new engagement channel, doesn't replace dashboards
3. Voice input for Class 1-5 (Whisper tiny ONNX, offline) — new input path
4. "Ask a Teacher" escalation — human fallback when AI fails
5. Worked examples with fading — "Show me how" before practice
6. Data usage monitor — transparency for limited data plans
7. Error reporting with reward — students find errors, get contributor badge
8. Teacher worksheet generator via WhatsApp — new teacher tool
9. Peer comparison (anonymous, class-level) — motivation through belonging
10. Streak with grace days + makeup sessions — better than raw streak
11. DuckDB WASM for client-side mastery — instant feedback, offline
12. ProseMirror/Slate for interactive lessons — better than markdown for embedded elements

## What We Improve (Claude's Better Ideas)
- Prompts: add device specs, Hinglish, failure cases, "what not to build"
- Offline: make it day-1 priority, not last phase
- Performance: real engineering for 2GB RAM / 3G, not just a bullet point
- Parent communication: ADD WhatsApp (don't cut dashboard)
- Teacher tools: ADD WhatsApp worksheet generator (don't cut dashboard)
- Session design: 15-min sessions, not 30-min fantasy
- Framing: "Your teacher can see where you need help" not "the system is watching"
- Proactive intervention: keep it but make it subtle and dismissible

## What We Do NOT Cut
- Neo4j (keep, data loaded)
- Qdrant (keep, embeddings loaded)
- 915 sims (audit + fix, keep good ones)
- 3 mastery models (keep all, BKT for display)
- 26 v2 services (wire them in)
- Skill tree visualization (keep, it's a differentiator)
- XP/levels/achievements (keep, especially for Class 1-8)
- Multilingual (keep English + Hindi, architecture for more)
- Proactive intervention (keep, make it subtle)
- Choose-your-own lesson branching (keep, but adaptive engine decides default)

---

## BUILD BATCHES

### BATCH 1: Backend Foundation + Core Solver (Fable-5)
**Wire existing + add new:**
- Shared SolverResult base (standardize all 37 solvers)
- LaTeX ↔ SymPy bridge (bidirectional)
- Solver registry (auto-discover, plugin system)
- FastAPI app with /api/solver/solve, /api/solver/types
- Postgres schema (students, attempts, mastery, sessions)
- Audit + fix 5 priority solvers (calculus, algebra, trig, physics mechanics, chem stoichiometry)
- Photo input pipeline (Tesseract.js + Pix2Tex ONNX → LaTeX → SymPy)
- Offline cache strategy (what to cache, how)
- JWT auth (simple, from existing dream_app pattern)

### BATCH 2: Practice Engine (Fable-5)
**Wire existing + add new:**
- Question selector (IRT-based, from existing knowledge_tracing.py)
- Practice session API (start, submit, feedback, next)
- SM-2 spaced repetition scheduler (from existing srs.ts, move logic to backend too)
- Adaptive difficulty (3 correct → harder, 2 wrong → easier)
- Streak counter with grace days + makeup sessions
- Mastery progress bar (BKT for display, IRT/AFM for backend)
- "Try another" after solving
- Worked examples with fading ("Show me how" → example → own problem → fade)
- DuckDB WASM for client-side mastery (instant feedback offline)

### BATCH 3: Socratic Teacher (Fable-5 for code, Opus for prompts)
**Wire existing + add new:**
- Tutor chat interface (WhatsApp-style bubbles, math rendering)
- System prompt for Claude (Socratic, curriculum-aware, Hinglish)
- Student context injection (mastery, current topic, struggle history)
- "Explain this step simpler" button on solver steps
- Proactive intervention (subtle, dismissible — "Stuck? I can help.")
- "Ask a Teacher" escalation (queue for human teacher, WhatsApp notification)
- Graceful failure handling ("I don't know — try asking your school teacher")
- Session memory (conversation context, student history)
- Grounding in CISCE content (retrieve relevant lesson, cite it)

### BATCH 4: Homework Flow + WhatsApp (Fable-5)
**Wire existing + add new:**
- Homework view (today's problems mapped to ISC textbook chapters)
- WhatsApp bot (daily reminders, weekly parent summary, photo solve via WhatsApp)
- Parent view (simple — child's streak, topics practiced, one thing to help with)
- Photo solve via WhatsApp (student sends photo → gets solution in chat)
- Teacher broadcasts via WhatsApp ("Class 11A: Complete exercises 5.2-5.5 by Friday")
- Error reporting button on every problem/solution (with reward for confirmed errors)

### BATCH 5: Diagnostic (Fable-5)
**Wire existing + add new:**
- Diagnostic flow (adaptive question selection, <15 questions)
- Gap identification (concept vs procedural vs computation)
- Remediation path (specific practice problems, not generic "review algebra")
- Visual report (skill heatmap + skill tree, both views)
- One-click start remediation from report

### BATCH 6: Teacher Tools (Fable-5)
**Wire existing + add new:**
- Teacher WhatsApp bot (send topic → get PDF worksheet)
- Auto-grading (students submit photos → teacher gets report)
- Class overview dashboard (which topics class is struggling with)
- Custom assignments (pick specific problem types)
- Student flags (who needs help)
- Worksheet generator (from question generators, PDF output)

### BATCH 7: Mastery Dashboard (Fable-5)
**Wire existing + add new:**
- Student dashboard (streak, mastery, recommended next, recent activity)
- Skill tree visualization (interactive, D3/Canvas, mastery-colored)
- Parent dashboard (insights, actionable recommendations, alerts)
- Peer comparison (anonymous, class-level, effort + improvement)
- Data usage monitor (MB per session, WiFi download option)

### BATCH 8: Learning Experience (Fable-5)
**Wire existing + add new:**
- Lesson page (text + simulation + practice in one flow)
- ProseMirror/Slate for interactive lessons (embedded elements)
- Simulation audit + fix (TypeScript check, factual check, node mapping)
- Simulation embedding in lessons (only verified ones)
- Junior World (Class 1-5: voice-first, Sheru mascot, simple progression)
- Voice input (Whisper tiny ONNX, offline, Indian English accents)
- Voice navigation for Class 1-2 ("next question", "help", "I'm done")

### BATCH 9: Exam Prep (Fable-5)
**Wire existing + add new:**
- Exam simulator (real ISC specimen papers, timer, marking scheme)
- Exam strategy (integrated into Socratic teacher context)
- Post-exam report (where marks lost, what to practice)
- Pressure simulation (real conditions, no hints, timer)

### BATCH 10: Performance + Offline + Accessibility (Fable-5)
**Wire existing + add new:**
- Bundle audit (measure, reduce, lazy-load)
- Service worker (cache-first, pre-cache current week's content)
- Background sync (queue mastery updates when offline)
- Image compression (WebP, responsive srcsets)
- Performance monitoring (load time, solve time, crash rate)
- WCAG AA (screen reader, keyboard nav, reduced motion)
- Dyslexia-friendly font option
- Colorblind-safe palette
- Math accessibility (MathML for screen readers)
- Mobile optimization (2GB RAM, 3G, touch-first)

---

## GENERATION STRATEGY
- Each batch: 10 parallel Fable-5 API calls (code tasks) + Opus calls (content/mapping tasks)
- Each component gets goal-based prompt with Claude's improved template
- Each batch must pass: Python syntax check, TypeScript build, integration test
- Move API key to environment variable (SECURITY FIX)
- Write all new code to D:\platform (additive, never touch D:\cisce or D:\dream_app data)
