# WORLD-CLASS PLATFORM — GOAL-BASED BUILD PLAN

## The Mission

Build the world's best K-12 learning platform for Indian students (CISCE/ICSE/ISC).
Not "good enough." Not "competitive." The best. The platform that makes a student
say "I actually understand this now."

## What "World-Class" Means (Concrete, Measurable)

1. **A student who uses this for 30 minutes daily will master their syllabus.**
   Not just "pass" — master. BKT mastery > 80% on every node.

2. **A student who is stuck will get unstuck without being spoon-fed.**
   The Socratic teacher guides them to the answer, never gives it.

3. **A student will WANT to come back tomorrow.**
   Not because of gamification tricks — because they felt themselves get smarter.

4. **A parent will trust this platform.**
   They can see exactly what their child learned, what they struggle with,
   and what to do about it.

5. **A teacher will use this as a tool, not a replacement.**
   It handles the practice and diagnosis so the teacher can focus on teaching.

6. **It works on a ₹10,000 phone with 3G internet.**
   Most Indian students don't have iPhones or fiber. The platform must work for them.

7. **It works offline.**
   Internet drops mid-practice? No problem. Syncs when reconnected.

## The Core Insight

Every ed-tech platform fails at the same place: they're either passive (watch videos)
or shallow (multiple choice quizzes). None actually TEACH. None adapt to the student.
None make the student FEEL their own progress.

Our platform is different because:
- The SOLVER shows every step with the rule and reasoning (not just the answer)
- The SOCRATIC TEACHER guides discovery (not a chatbot that gives answers)
- The DIAGNOSTIC finds the exact gap (not "you got 6/10")
- The MASTERY TRACKING shows real progress (not fake XP bars)
- The ADAPTIVE PATH reorders the curriculum for each student (not one-size-fits-all)

## Architecture Principles

1. **Offline-first.** Everything works without internet. Sync is background.
2. **Mobile-first.** Phone is the primary device. Desktop is enhancement.
3. **One screen, one task.** No cognitive overload. When solving, only solving.
4. **Every interaction has feedback.** No silent state changes.
5. **Math is beautiful.** MathLive renders everything as proper notation.
6. **Progress is always visible.** Students always know where they stand.
7. **The teacher is always watching.** Not surveillance — support. The system
   monitors behavior and intervenes when needed, proactively.
8. **Deterministic where possible, intelligent where needed.** SymPy computes,
   Claude teaches. Never mix them up.

---

## PHASE 1: Backend Foundation
### Goal: Make all 26 v2 services + 37 solver files work together as one system

### 1.1 Shared Base Module
**GOAL:** One consistent data shape across all solvers, services, and APIs.
**CONTEXT:** Currently each solver defines its own SolverResult with different fields.
This makes the registry and API impossible to build cleanly.
**CONSTRAINTS:** Must not break existing solver logic. Must be backward compatible.
**SUCCESS CRITERIA:** Every solver returns the same SolverResult shape. The API
can serialize any solver result without knowing which solver produced it.
**YOU DECIDE:** What fields SolverResult needs (I might be missing some). How to
handle solvers that have extra fields. How to migrate existing solvers cleanly.

### 1.2 Solver Registry
**GOAL:** A plugin system where adding a new solver file automatically makes it
available to the API. Zero manual wiring.
**CONTEXT:** 16 solver files in D:\platform\backend\solvers\ with SOLVER_REGISTRY
dicts. 16 question generators. YAML definitions for step types and problem types.
**CONSTRAINTS:** Must auto-discover new solvers without code changes. Must handle
solvers that fail to import gracefully (don't crash the whole registry).
**SUCCESS CRITERIA:** Drop a new solver_solvername.py file → it's immediately
available via the API. No restart needed (or clean restart).
**YOU DECIDE:** How discovery works (filesystem scan? importlib? entry points?).
How to handle versioning. How to handle solver dependencies (calculus engine).

### 1.3 LaTeX ↔ SymPy Bridge
**GOAL:** Students type math naturally (via MathLive), backend understands it.
**CONTEXT:** MathLive outputs LaTeX. SymPy needs Python notation. Need bidirectional
conversion (LaTeX→SymPy for input, SymPy→LaTeX for display).
**CONSTRAINTS:** Must handle: fractions, exponents, roots, integrals, matrices,
Greek letters, absolute values, piecewise functions. Must be fast (<10ms).
**SUCCESS CRITERIA:** Student types "\frac{x^2+1}{x-1}" → solver receives
"(x**2+1)/(x-1)". Solver returns "x**3/3" → student sees "x³/3".
**YOU DECIDE:** Whether to use sympy.latex() or build custom renderer. How to
handle edge cases (implicit multiplication, etc.).

### 1.4 Student State Tracker
**GOAL:** The system knows what each student is doing RIGHT NOW and how they're
feeling about it. This is what enables the proactive Socratic teacher.
**CONTEXT:** Students solve problems, practice, take diagnostics. Each action
produces signals: time spent, wrong answers, hesitation patterns, retry counts.
**CONSTRAINTS:** Must work in real-time (WebSocket or polling). Must persist
state so it survives page refresh. Must be privacy-respecting (no unnecessary data).
**SUCCESS CRITERIA:** The system can answer: "Is Priya struggling right now?
With what? For how long? What should the teacher do about it?"
**YOU DECIDE:** What signals to track. How to detect struggle vs careless errors
vs exploration. How to represent student emotional/cognitive state. What
intervention triggers to define.

### 1.5 Adaptive Learning Path Engine
**GOAL:** Each student gets a personalized curriculum path, not a fixed sequence.
**CONTEXT:** CISCE has prerequisites (calculus needs algebra, physics needs calculus).
BKT tracks mastery per node. IRT tracks ability. Neo4j has the prerequisite graph.
**CONSTRAINTS:** Must respect CISCE syllabus structure. Must not skip prerequisites
unless mastery is confirmed. Must adapt when new gaps are discovered.
**SUCCESS CRITERIA:** Student who is weak at algebra gets routed to algebra
review before calculus. Student who masters algebra fast gets accelerated to
calculus. Path updates as mastery changes.
**YOU DECIDE:** The pathfinding algorithm (topological sort? greedy? graph search?).
How to balance "review weak areas" vs "learn new topics". How to handle students
who want to jump ahead.

### 1.6 Mastery Sync Engine
**GOAL:** Every learning action (solve, practice, diagnostic) updates mastery in
real-time using BKT + IRT + AFM.
**CONTEXT:** knowledge_tracing.py already implements all three models. Currently
not wired to anything.
**CONSTRAINTS:** Must be fast (<100ms per update). Must handle concurrent updates.
Must produce mastery dashboard data efficiently.
**SUCCESS CRITERIA:** Student solves a problem correctly → mastery bar moves
in real-time on their screen. Parent sees updated mastery within minutes.
**YOU DECIDE:** How to combine BKT/IRT/AFM predictions into one "mastery score".
How often to recompute. How to handle conflicting signals.

### 1.7 Diagnostic Engine
**GOAL:** Find the EXACT gap, not just "you got 6/10".
**CONTEXT:** CISCE nodes have prerequisites and sub-skills. Student state tracker
has behavior data. Question generators can produce targeted questions.
**CONSTRAINTS:** Must complete in <15 questions (not 50). Must identify root cause
(concept gap vs procedural gap vs computation gap). Must produce actionable
remediation, not just a score.
**SUCCESS CRITERIA:** "You understand the concept of derivatives (thinking questions
correct) but you have a procedural gap in the chain rule (you keep applying product
rule instead). Practice 3 chain rule problems, then re-test."
**YOU DECIDE:** The probing algorithm. How to distinguish concept vs procedural
vs computation gaps. How to generate the remediation path. When to stop diagnosing.

### 1.8 Exam Strategy Coach
**GOAL:** Teach students HOW to take exams, not just the content.
**CONTEXT:** ISC exams have specific patterns (marks distribution, time limits,
question types). Student mastery data shows strengths/weaknesses.
**CONSTRAINTS:** Must be ISC-specific (not generic exam tips). Must adapt to
student's individual strengths.
**SUCCESS CRITERIA:** "You have 3 hours for 80 marks. Your strongest area is
calculus (90% mastery), weakest is probability (40%). Optimal strategy: attempt
calculus questions first (45 min), then algebra (30 min), attempt probability
last and don't spend more than 15 min. Skip the hardest probability question."
**YOU DECIDE:** How to model time allocation. How to simulate exam pressure.
How to coach question selection during practice exams.

---

## PHASE 2: Backend API Layer
### Goal: Expose everything through clean, documented, typed APIs

### 2.1 API App Structure
**GOAL:** A single FastAPI app that serves all routers with proper middleware,
error handling, and documentation.
**CONTEXT:** 7 routers needed (solver, practice, diagnostic, tutor, mastery,
content, auth). Existing dream_app has routers we can learn from but not reuse
directly (different service layer).
**CONSTRAINTS:** Must use Pydantic v2 schemas. Must have OpenAPI docs. Must
handle errors gracefully (no stack traces to frontend).
**SUCCESS CRITERIA:** Frontend can call any endpoint and get a typed response.
API docs at /docs are complete and usable. Errors are human-readable.
**YOU DECIDE:** Middleware strategy (CORS, auth, rate limiting). How to handle
WebSocket connections for real-time features. How to structure the app for
horizontal scaling.

### 2.2 Solver API
**GOAL:** Frontend can list problem types, render forms, solve, and generate
questions — all through clean API calls.
**CONTEXT:** Registry has all solvers. YAML has form definitions. Question
generators produce infinite variations.
**CONSTRAINTS:** Solve must return in <2 seconds. Generate must return in <500ms.
Must handle malformed input gracefully.
**YOU DECISION:** How to structure the solve request (one endpoint or per-subject?).
How to stream step-by-step output (all at once or progressive?). How to cache
generated questions.

### 2.3 Practice API
**GOAL:** Frontend can start a practice session, submit answers, get feedback,
and see progress — all adaptive.
**CONTEXT:** Question selector uses IRT. Mastery sync updates on each answer.
SM-2 schedules reviews.
**CONSTRAINTS:** Must feel instant (no loading between questions). Must adapt
difficulty after each answer.
**YOU DECIDE:** Session management (stateless or stateful?). How to handle
interruptions (student closes app mid-session). How to balance topics in a session.

### 2.4 Tutor API (The Socratic Teacher)
**GOAL:** The ONLY endpoint that calls Claude in real-time. Must feel like
talking to a brilliant, patient teacher who never gives up on you.
**CONTEXT:** socratic_engine_v2.py exists with 5-level questioning. Student
state tracker knows what the student is struggling with. Solver can verify
math. Knowledge graph knows prerequisites and connections.
**CONSTRAINTS:** Must NEVER give the direct answer. Must adapt to student's
level and emotional state. Must remember conversation context. Must be fast
enough to feel conversational (<3 second response). Must handle the student
saying "I don't know" or "I give up" gracefully.
**SUCCESS CRITERIA:** Student says "I don't get integration by parts" →
teacher asks "What do you know about reversing the product rule?" →
student says "nothing" → teacher says "Let's start there. The product rule
says d/dx[uv] = u'v + uv'. If we reverse it..." → guides step by step.
**YOU DECIDE:** The system prompt for Claude. How to inject student context
(mastery, current topic, struggle history). How to detect when to escalate
from guiding to explaining. How to handle off-topic questions. How to make
the teacher feel like a person, not a bot.

### 2.5 Mastery API
**GOAL:** Frontend can display mastery dashboards, skill trees, and review
schedules for students, parents, and teachers.
**CONTEXT:** knowledge_tracing.py has all the data. Neo4j has the graph.
**CONSTRAINTS:** Must aggregate efficiently (don't query 1000 nodes individually).
Must support different views (student sees own progress, parent sees child,
teacher sees class).
**YOU DECIDE:** How to aggregate mastery across topics/subjects. How to compute
"recommended next" efficiently. How to handle real-time updates vs cached views.

### 2.6 Content API
**GOAL:** Frontend can browse subjects, topics, lessons, and search content.
**CONTEXT:** CISCE content in Neo4j + Qdrant. Lessons in markdown.
**CONSTRAINTS:** Search must be fast (<200ms). Lessons must be cacheable.
**YOU DECIDE:** How to structure lesson content (markdown? structured JSON?
both?). How to embed simulations in lessons. How to handle bilingual content.

### 2.7 Parent & Teacher API
**GOAL:** Parents see insights, teachers see class management tools.
**CONTEXT:** Student mastery data, activity logs, diagnostic reports.
**CONSTRAINTS:** Privacy — parents see their child only, teachers see their
class only. Must produce actionable insights, not just data dumps.
**SUCCESS CRITERIA:** Parent gets: "Priya mastered Derivatives this week
(45%→82%). She's struggling with Integration. Root cause: weak algebra.
Recommended: 20 min algebra review this weekend. I've prepared 5 questions."
**YOU DECIDE:** How to generate insights (rules? LLM? both?). How to handle
report scheduling (weekly email? real-time dashboard?). How to alert on
concerning patterns (no practice for 3 days, mastery dropping).

---

## PHASE 3: Frontend Foundation
### Goal: Build the core infrastructure that every page needs

### 3.1 Math Input System
**GOAL:** A student aged 6-18 can input any math expression effortlessly.
**CONTEXT:** MathLive is installed (or needs installing). KaTeX is installed.
Backend has LaTeX↔SymPy bridge. Different problem types need different keypads.
**CONSTRAINTS:** Must work on mobile (thumb-friendly). Must work offline.
Must handle: fractions, exponents, roots, integrals, matrices, Greek letters,
absolute values, piecewise functions. Must show live preview.
**SUCCESS CRITERIA:** A Class 6 student can type "x² + 2x + 1" in under 5
seconds. A Class 12 student can type a 3×3 matrix in under 10 seconds. No
student ever sees "x**2" — they see "x²".
**YOU DECIDE:** The component architecture. How to customize the keypad per
problem type. How to handle voice input for Class 1-2. How to handle photo
input (Pix2Tex). How to make it feel delightful, not functional.

### 3.2 State Management Architecture
**GOAL:** A clean state architecture that handles online/offline, real-time
updates, and optimistic UI.
**CONTEXT:** Zustand installed. React Query installed. Socket.io installed.
Backend has WebSocket support (to be built).
**CONSTRAINTS:** Must work offline (local-first). Must sync when online.
Must handle conflicts (student solved offline, then syncs).
**YOU DECIDE:** What goes in Zustand vs React Query vs local storage.
How to structure the offline sync queue. How to handle optimistic updates
that fail. How to manage auth state.

### 3.3 Navigation System
**GOAL:** Navigation that works for both mobile (bottom bar) and desktop (sidebar).
**CONTEXT:** Next.js 14 App Router. Pages: dashboard, solve, practice, learn,
diagnostic, tutor, exam, simulations, achievements, settings, junior, parent.
**CONSTRAINTS:** Mobile-first. Bottom nav for phone, sidebar for desktop.
Must be thumb-reachable on mobile. Must show streak/XP in nav (always visible).
**YOU DECIDE:** The navigation pattern. How to handle role-based nav (student
vs parent vs teacher). How to make transitions feel smooth. How to handle
deep linking.

### 3.4 Design System
**GOAL:** A consistent visual language that feels premium but not intimidating.
**CONTEXT:** Existing premium components (Aurora, particles, shaders) are
impressive but over-the-top for daily use. Need a system that's beautiful
but gets out of the way.
**CONSTRAINTS:** Must work on low-end screens (not everyone has Retina).
Must support dark mode. Must be accessible (WCAG AA). Must feel Indian (not
a copy of Western apps).
**YOU DECIDE:** The color palette. Typography (which fonts? Hindi support?).
Spacing system. Component variants. Animation principles. How to make it
feel Indian without being kitschy.

---

## PHASE 4: The Solver Experience (Our Differentiator)
### Goal: The best math-solving experience in any Indian app. Period.

### 4.1 Solver Page
**GOAL:** A student picks a problem type, inputs values, and gets a
step-by-step solution that makes them UNDERSTAND, not just copy.
**CONTEXT:** Backend solver API returns steps with rule names, formulas,
before/after, and explanations. YAML defines input forms. MathLive handles
input. Renderers handle diagrams.
**CONSTRAINTS:** Must feel instant (<2s solve). Must work on mobile. Must
show steps progressively (not all at once — that's overwhelming). Must have
"try another" for infinite practice. Must show mastery update after solving.
**SUCCESS CRITERIA:** Student solves "Find derivative of x·sin(x)" → sees:
  Step 1: "This is a product of two functions. Product rule: d/dx[uv] = u'v + uv'"
  Step 2: "u = x, v = sin(x)"
  Step 3: "u' = 1, v' = cos(x)"
  Step 4: "f'(x) = 1·sin(x) + x·cos(x) = sin(x) + x·cos(x)"
  Step 5: "Verification: numerical check at 100 points — PASS"
  → Student thinks "Oh, THAT'S how the product rule works!"
  → Clicks "Try another" → gets x·cos(x) → applies the same steps → learns the pattern
**YOU DECIDE:** The UX flow (how many clicks to solve?). How to animate
steps (stagger? typewriter? slide-in?). How to show the thinking question
(before or after the form?). How to integrate diagrams. How to make "try
another" feel rewarding. What happens when the solver fails. How to show
verification. How to connect to mastery. What I haven't thought of that
would make this magical.

### 4.2 Step-by-Step Solution Display
**GOAL:** Each step is a mini-lesson, not just a line of math.
**CONTEXT:** Solver returns steps with: rule name, formula, before→after,
explanation, optional hint, optional visual.
**CONSTRAINTS:** Must be readable on mobile. Must not overwhelm (one step
at a time, not a wall of text). Must allow "explain this step simpler" (calls
tutor API). Must allow "why this rule?" (shows the rule derivation).
**YOU DECIDE:** How to render each step. How to handle the "explain simpler"
interaction. How to show the visual. How to make steps feel like a story,
not a list.

### 4.3 Thinking Question Component
**GOAL:** Before the input form, test if the student knows WHAT math to apply.
**CONTEXT:** YAML problem types have thinking questions with options and
correct answers. This is the competency test.
**CONSTRAINTS:** Must not block the student (wrong answer → explain, then
proceed). Must be quick (one tap). Must teach, not just test.
**YOU DECIDE:** How to present it (card? modal? inline?). How to handle
wrong answers (explain then proceed, or require correct?). How to track
thinking question performance for competency scoring.

---

## PHASE 5: The Practice Experience
### Goal: Adaptive practice that feels like a game, teaches like a tutor

### 5.1 Practice Session
**GOAL:** Student opens practice → gets 5 questions at their level →
immediate feedback → mastery updates → wants to do more.
**CONTEXT:** Question selector uses IRT. Question generators produce
infinite variations. Mastery sync updates BKT/IRT/AFM. SM-2 schedules reviews.
**CONSTRAINTS:** Must feel instant (no loading between questions). Must
adapt difficulty after each answer. Must balance competency/standard 50/50.
Must respect review schedule (include due reviews).
**SUCCESS CRITERIA:** Student gets 3 right → questions get harder. Gets
one wrong → next question is slightly easier. After 5 questions: "You earned
85 XP! Mastery: Derivatives 67%→73%. Come back tomorrow for your review
(2 questions scheduled)."
**YOU DECIDE:** The session structure (fixed 5? variable? time-based?).
How to show progress during session. How to handle the transition between
questions. How to make feedback feel rewarding, not punishing. How to
integrate the Socratic teacher (offer help after wrong answer?). How to
handle streaks and XP. What makes a student want "one more round."

### 5.2 Question Card
**GOAL:** One question, beautifully presented, easy to answer.
**CONTEXT:** Questions have: text, marks, difficulty, competency/standard
badge, Bloom's level, optional diagram, input fields.
**CONSTRAINTS:** Must work on mobile. Must show all relevant info without
clutter. Must handle both numeric and expression answers.
**YOU DECIDE:** The card layout. How to show the competency context (story,
data table, etc.) without overwhelming. How to handle multi-part questions.
How to show marks and difficulty. How to make it feel like a challenge,
not a test.

### 5.3 Feedback System
**GOAL:** After answering, the student feels something — joy (correct),
curiosity (wrong), or determination (almost).
**CONTEXT:** Solver can show correct solution. Mastery sync shows progress.
Tutor can offer to help.
**CONSTRAINTS:** Must be immediate (<200ms). Must be emotional, not just
informational. Must teach from mistakes.
**YOU DECIDE:** The animation for correct/incorrect. How to show the correct
solution (overlay? inline? modal?). How to offer Socratic help. How to show
mastery change. How to handle "almost right" (partial credit). How to make
wrong answers feel like learning opportunities, not failures.

---

## PHASE 6: The Socratic Teacher
### Goal: An AI teacher that guides discovery, never spoon-feeds

### 6.1 Teacher Persona
**GOAL:** The teacher feels like a real person — brilliant, patient, encouraging,
with a teaching style adapted to each student.
**CONTEXT:** Claude API (the only real-time LLM call). Student state tracker
knows the student's history. Knowledge graph knows the curriculum.
**CONSTRAINTS:** Must NEVER give the direct answer. Must adapt tone to
student (encouraging for struggling, challenging for advanced). Must remember
the full conversation. Must be curriculum-aware. Must know when the student
is frustrated and adjust.
**SUCCESS CRITERIA:** A student says "I hate integration, I'll never get it."
Teacher responds: "I understand. Integration feels like guessing. But what
if I told you it's just running derivatives in reverse? You already mastered
derivatives last week — 82% mastery. You CAN do this. Let's try one together.
What's the derivative of x²?" → student says "2x" → "Perfect. So what
function has derivative 2x?" → student says "x²?" → "Exactly! That's ALL
integration is — asking 'what function has this derivative?' You just did
your first integral."
**YOU DECIDE:** The system prompt that makes Claude a teacher, not a
chatbot. How to inject student context (mastery, history, current topic,
emotional state). How to enforce "never give the answer" (prompt engineering?
output filtering?). How to handle the student asking non-academic questions.
How to make the teacher feel consistent across sessions. How to handle the
teacher making mistakes (it's an LLM, it will sometimes).

### 6.2 Proactive Intervention
**GOAL:** The teacher doesn't wait to be asked — it intervenes when the
student is struggling.
**CONTEXT:** Student state tracker detects struggle patterns. Teacher can
pop up in any context (solver, practice, lesson).
**CONSTRAINTS:** Must not be annoying (don't interrupt every mistake). Must
be genuinely helpful (not "keep trying!"). Must be dismissible.
**SUCCESS CRITERIA:** Student gets 3 wrong answers on chain rule problems
→ teacher appears: "I notice chain rule is giving you trouble. Want me to
walk you through it? It'll take 2 minutes." → student says yes → Socratic
dialogue begins.
**YOU DECIDE:** When to intervene (threshold? pattern?). How to present
the intervention (toast? modal? sidebar?). How to make it feel supportive,
not surveilled. How to handle the student declining help.

### 6.3 Tutor Chat Interface
**GOAL:** A chat interface that feels like talking to a teacher on WhatsApp.
**CONTEXT:** Students in India use WhatsApp. The chat should feel familiar.
**CONSTRAINTS:** Must work on mobile. Must show typing indicator. Must
handle math rendering in messages. Must allow sharing of solver steps.
**YOU DECIDE:** The chat UI (bubbles? cards? mixed?). How to render math
in chat. How to handle long responses. How to show the teacher "thinking."
How to let the student share a problem they're stuck on.

---

## PHASE 7: The Diagnostic Experience
### Goal: Find the exact gap and fix it, in under 15 questions

### 7.1 Diagnostic Flow
**GOAL:** Student opens diagnostic → answers adaptive questions → gets a
precise report with remediation path.
**CONTEXT:** Diagnostic engine uses IRT for question selection, BKT for
mastery, question generators for targeted questions.
**CONSTRAINTS:** Must complete in <15 questions. Must identify root cause
(concept/procedural/computation). Must produce actionable remediation.
**SUCCESS CRITERIA:** Report says: "Calculus: 58% mastery. Strong: limits
(90%), continuity (85%). Weak: differentiation (45%), integration (30%).
Root cause: procedural gap in chain rule → affects both differentiation
and integration. Remediation: 1) Review chain rule lesson (10 min),
2) Practice 5 chain rule problems, 3) Re-test. Estimated time to mastery:
2 hours."
**YOU DECIDE:** The flow (linear? branching?). How to show progress
("Question 3 of ~10"). How to handle the adaptive difficulty. How to
present the report (visual? text? both?). How to make the remediation
path actionable (one-click start?).

### 7.2 Diagnostic Report
**GOAL:** A visual report that shows exactly where the student stands and
what to do next.
**CONTEXT:** Skill tree data from Neo4j. Mastery data from BKT. Remediation
from diagnostic engine.
**CONSTRAINTS:** Must be understandable by students AND parents. Must be
actionable (not just "you're weak at X" but "do Y to fix it").
**YOU DECIDE:** The visualization (skill tree? radar chart? heatmap?).
How to show root cause vs symptom. How to present the remediation path.
How to make it feel encouraging, not demoralizing.

---

## PHASE 8: The Mastery Dashboard
### Goal: Students see their growth, parents see insights, teachers see class

### 8.1 Student Dashboard
**GOAL:** The first thing a student sees. Makes them feel proud of progress
and excited to continue.
**CONTEXT:** Mastery data, streak, XP, level, review schedule, recent activity.
**CONSTRAINTS:** Must load in <1 second. Must work on mobile. Must not feel
like a grade report (encouraging, not judgmental).
**SUCCESS CRITERIA:** Student opens app → sees: "🔥 7-day streak! You're on
fire. Mastery: Maths 78% ↑, Physics 65% →. Today's goal: 1 practice session
(5 questions). You have 2 reviews due. Last session: +85 XP, 4/5 correct."
→ feels motivated to practice.
**YOU DECIDE:** The layout. What to show first (streak? mastery? recommendation?).
How to show trends (up/down arrows? sparklines?). How to make "recommended
next" feel like a helpful suggestion, not a command. How to handle new users
(no data yet). How to make it feel different from a school grade portal.

### 8.2 Skill Tree Visualization
**GOAL:** An interactive map of everything the student knows, is learning,
and needs to learn.
**CONTEXT:** Neo4j has the knowledge graph. BKT has mastery per node.
**CONSTRAINTS:** Must handle 100+ nodes without lag. Must be navigable on
mobile (pinch zoom, pan). Must show prerequisites and unlocks.
**YOU DECIDE:** The visualization technology (D3? custom SVG? canvas?).
How to layout nodes (force-directed? hierarchical?). How to show mastery
(color? size? icon?). How to handle click interactions. How to show
prerequisite relationships. How to make it feel like a game map, not a
flowchart.

### 8.3 Parent Dashboard
**GOAL:** Parents see real insights and actionable recommendations, not
just data.
**CONTEXT:** Student mastery, activity, diagnostic reports. Claude can
generate insights.
**CONSTRAINTS:** Must be simple (many parents aren't tech-savvy). Must be
actionable. Must respect privacy. Must support multiple children.
**SUCCESS CRITERIA:** Parent opens dashboard → sees: "Priya practiced 4
times this week (good!). She mastered Derivatives (45%→82%, excellent
progress!). She's struggling with Integration — root cause is algebra gaps.
Recommendation: 20 min algebra review this weekend. [Start 5-question
algebra review] button." → parent clicks button → Priya gets the review
queued.
**YOU DECIDE:** What to show parents vs what to hide. How to generate
insights (rules? LLM? both?). How to handle alerts (no practice, mastery
dropping). How to make it feel supportive, not surveillance. How to handle
parents who want to be more vs less involved.

### 8.4 Teacher Dashboard
**GOAL:** Teachers see class-wide patterns and can assign targeted work.
**CONTEXT:** Class mastery data, individual student data, question generators.
**CONSTRAINTS:** Must handle 40+ students. Must allow custom assignments.
Must show class-wide gaps.
**SUCCESS CRITERIA:** Teacher opens dashboard → sees heatmap: "60% of class
struggling with chain rule" → clicks "Assign chain rule practice" →
generates 5 questions per student at their individual level → students get
notification.
**YOU DECIDE:** The class visualization (heatmap? distribution? both?).
How to handle assignments (custom? auto-generated?). How to identify
students who need help. How to track assignment completion.

---

## PHASE 9: The Learning Experience
### Goal: Lessons that build intuition, with simulations and interactive elements

### 9.1 Lesson Page
**GOAL:** A lesson that combines text, simulation, and practice into one
flow that builds understanding.
**CONTEXT:** CISCE content in markdown. 915+ simulations. Solver for
practice. Tutor for help.
**CONSTRAINTS:** Must work on mobile. Must not be a wall of text. Must be
interactive. Must connect to mastery.
**SUCCESS CRITERIA:** Student opens "Projectile Motion" lesson → reads 2
paragraphs → interacts with simulation (drag angle slider, see trajectory)
→ answers "what angle gives max range?" → gets feedback → reads next
section → solves a practice problem → mastery updates → lesson complete.
**YOU DECIDE:** The lesson structure (linear? branching? choose-your-own?).
How to embed simulations. How to integrate practice. How to handle
different learning speeds. How to connect to the Socratic teacher. How to
make it feel like an experience, not a textbook.

### 9.2 Simulation Integration
**GOAL:** 915+ simulations are audited, fixed, mapped to topics, and
embedded in lessons.
**CONTEXT:** Simulations in D:\dream_app\frontend\components\simulations\.
Many have TypeScript errors. Some are factually wrong. Need audit + fix.
**CONSTRAINTS:** Must work on mobile. Must load fast. Must be factually
accurate. Must be pedagogically useful (not just pretty).
**YOU DECIDE:** The audit strategy (automated? manual? both?). How to fix
broken simulations. How to map simulations to CISCE nodes. How to embed
them in lessons. How to handle simulations that don't exist for a topic
(generate new ones? skip?).

### 9.3 Junior World (Class 1-5)
**GOAL:** A game-like world where young children learn through play.
**CONTEXT:** Mascots (Sheru the dog, Rive owl). Gamification components.
Simple simulations. Voice input support.
**CONSTRAINTS:** Must be usable by a 6-year-old (minimal reading, big
buttons, voice guidance). Must be fun, not "educational" (kids smell
educational games and hate them). Must show progress to parents.
**SUCCESS CRITERIA:** A 7-year-old opens the app → Sheru says "Welcome
back! Ready for an adventure?" → child taps a level on the world map →
plays a 5-minute math game → earns stars → returns to map → sees next
level unlocked → wants to play again.
**YOU DECIDE:** The game design (what makes it fun?). The world map
structure. How to integrate learning into games. How to use voice for
instructions. How to handle difficulty progression. How to make parents
feel good about screen time.

---

## PHASE 10: Exam Preparation
### Goal: Real exam simulation with strategy coaching

### 10.1 Exam Simulator
**GOAL:** Simulate real ISC exam conditions with full papers, timers, and
marking schemes.
**CONTEXT:** ISC specimen papers, marking schemes, question generators.
**CONSTRAINTS:** Must feel like a real exam (no hints, timer running, no
backtracking in some modes). Must use real ISC marking schemes.
**SUCCESS CRITERIA:** Student takes a 3-hour simulated ISC Maths exam →
gets scored with real marking scheme → sees where they lost marks → gets
strategy coaching for next time.
**YOU DECIDE:** The exam interface (full screen? locked down?). How to
generate full papers. How to grade with marking schemes. How to show
results. How to integrate strategy coaching.

### 10.2 Exam Strategy Coach
**GOAL:** Teach students how to maximize their score through strategy.
**CONTEXT:** Student mastery data, ISC exam patterns, time management.
**CONSTRAINTS:** Must be personalized (based on student's strengths).
**YOU DECIDE:** How to model time allocation. How to teach question
selection. How to simulate pressure. How to track strategy improvement
over time.

---

## PHASE 11: Offline & Performance
### Goal: Works on ₹10,000 phones with 3G, offline-capable

### 11.1 Offline Architecture
**GOAL:** Everything works without internet. Sync is invisible.
**CONTEXT:** next-pwa installed. Zustand for state. Local storage for cache.
**CONSTRAINTS:** Practice, solving, lessons must work offline. Mastery
updates queue and sync. Must handle conflicts gracefully.
**YOU DECIDE:** What to cache locally (questions? lessons? solver?).
How to handle the sync queue. How to resolve conflicts (server wins?
client wins? merge?). How to show online/offline status. How to handle
large content (don't download all 915 simulations at once).

### 11.2 Performance Optimization
**GOAL:** Fast on low-end devices. Load time <3 seconds on 3G.
**CONTEXT:** 981 components is too many. Many are probably unused.
**CONSTRAINTS:** Must work on 2GB RAM phones. Must work on 3G.
**YOU DECIDE:** What to lazy-load. What to code-split. How to optimize
images. How to reduce bundle size. How to measure and monitor performance.

---

## PHASE 12: Accessibility & Inclusion
### Goal: Every student can learn, regardless of ability

### 12.1 Accessibility System
**GOAL:** WCAG AA compliant. Usable by students with visual, motor, and
cognitive impairments.
**CONTEXT:** Existing components may not be accessible.
**CONSTRAINTS:** Must support screen readers. Must support keyboard
navigation. Must support voice input. Must support dyslexia-friendly fonts.
Must support colorblind-safe colors. Must support reduced motion.
**YOU DECIDE:** How to implement each accessibility feature. How to make
it toggleable (student chooses). How to test accessibility. How to handle
math accessibility (screen reader for equations?).

### 12.2 Multilingual Support
**GOAL:** Content available in English and Hindi (minimum), with architecture
for regional languages.
**CONTEXT:** bilingual.ts exists. Hindi content generation exists.
**CONSTRAINTS:** Must not double the content size (shared structure, language
overlay). Must handle math notation in all languages. Must handle RTL if
needed (Urdu).
**YOU DECIDE:** The i18n architecture. How to handle content that's only in
one language. How to let students switch languages mid-session. How to
handle the Socratic teacher in Hindi.

---

## PHASE 13: Analytics & Quality
### Goal: The platform improves itself over time

### 13.1 Platform Analytics
**GOAL:** Know which questions are bad, which solvers fail, where students
drop off.
**CONTEXT:** Student interactions, solver results, question performance.
**CONSTRAINTS:** Must be privacy-respecting. Must be actionable.
**YOU DECIDE:** What to track. How to detect bad questions (high failure
rate ≠ hard, might be unclear). How to detect solver failures. How to
identify dropout points. How to A/B test changes.

### 13.2 Content Feedback Loop
**GOAL:** Students can report issues, system improves.
**CONTEXT:** Students will find errors (wrong answer, unclear question,
broken simulation).
**CONSTRAINTS:** Must be easy (one tap). Must be tracked. Must be actionable.
**YOU DECIDE:** How to collect feedback (report button? thumbs down?).
How to triage (auto-validate with solver? manual review?). How to fix and
deploy. How to credit students who find errors (gamification?).

---

## GENERATION ORDER

Each phase is generated by Fable-5 with GOAL-BASED prompts (not file specs).
Fable-5 decides the architecture, UX, and features. We provide goals,
context, constraints, and success criteria.

```
Phase 1:  Backend Foundation        (8 components) — Fable-5
Phase 2:  Backend API Layer         (7 routers)    — Fable-5
Phase 3:  Frontend Foundation       (4 systems)    — Fable-5
Phase 4:  Solver Experience         (3 components) — Fable-5
Phase 5:  Practice Experience       (3 components) — Fable-5
Phase 6:  Socratic Teacher          (3 components) — Fable-5
Phase 7:  Diagnostic Experience     (2 components) — Fable-5
Phase 8:  Mastery Dashboard         (4 components) — Fable-5
Phase 9:  Learning Experience       (3 components) — Fable-5
Phase 10: Exam Preparation          (2 components) — Fable-5
Phase 11: Offline & Performance     (2 components) — Fable-5
Phase 12: Accessibility             (2 components) — Fable-5
Phase 13: Analytics                 (2 components) — Fable-5
```

## HOW TO PROMPT FABLE-5

For each component, the prompt is:

```
GOAL: [what this should achieve]
CONTEXT: [what exists, what APIs are available, what tools are installed]
CONSTRAINTS: [no paid services, must integrate with X, must work on mobile]
STUDENT PERSONA: [who uses this, what they struggle with]
SUCCESS CRITERIA: [what makes this world-class]
YOU DECIDE: [architecture, UX, features, everything I haven't thought of]

Make this better than anything that exists. Think about what would make
an Indian student say "this actually helps me." Don't just build what I
described — build what I SHOULD have described.
```
