# CRITIQUE, IMPROVEMENTS & RESTRUCTURED PLAN

---

## 1. CRITIQUE — What's Missing, Over-Engineered, or Naive

### 1.1 Fatal Strategic Naivety

**CORE INSIGHT IS WRONG.** The plan states "Every ed-tech platform fails at the same place: they're passive or shallow." This is factually incorrect. BYJU's, Khan Academy, and Unacademy all have adaptive elements, diagnostic systems, and interactive components. They fail for different reasons — none of them fail at "not teaching." They fail because:

- BYJU's: content quality degraded at scale, aggressive upselling destroyed trust, offline doesn't work
- Khan Academy: doesn't map to Indian syllabus, English-only, feels foreign to Indian students
- Unacademy: teacher-quality variability, expensive, passive video-watching model

The plan author doesn't understand WHY the competition fails, and therefore doesn't know what to actually build differently.

**"WORLD-CLASS" IS A DISTRACTION.** No student, parent, or teacher cares whether something is "world-class." They care whether it helps Priya pass her ISC exams. Every "world-class" claim in the plan should be replaced with concrete student outcomes. World-class is an internal quality bar, not a marketing position.

### 1.2 Over-Engineering

**47 components across 13 phases is a death march.** The plan will take 18-24 months to build at this scope, and by then the market will have moved. Successful ed-tech products (Photomath, Quizlet) have 5-10 core features, not 47. Indian ed-tech starts lean and adds features based on user behavior, not theoretical completeness.

**Phase 1 has 26 "v2 services" and 37 solver files as a starting point.** This is massive technical debt from day one. How many of these 37 solvers actually work? How many are broken? The plan doesn't mention auditing existing code before building infrastructure around it. You cannot build a registry around 37 solvers if you haven't verified 5 of them work correctly.

**Neo4j + Qdrant + Postgres + Redis + Socket.io + 26 services.** For what? A skill graph with ~200 nodes doesn't need Neo4j — a normalized Postgres adjacency table handles it with simpler queries and fewer operational headaches. Qdrant adds complexity for a feature (semantic search) that isn't the core differentiator. Every database is operational complexity that will fail at 2am when a student is trying to study.

**BKT + IRT + AFM — three knowledge tracing models.** The plan says "YOU DECIDE how to combine them." This is deferring a hard decision to an AI code generator. In production, having three competing mastery signals creates confusing UI ("Derivatives: BKT says 72%, IRT says 58%, AFM says 81% — which one do I show?"). Pick one, validate it, iterate.

**Phase 9: 915+ simulations.** The plan acknowledges many have TypeScript errors and factual inaccuracies, but doesn't say "audit and fix before embedding." Embedding broken simulations in lessons is worse than not having simulations at all — a student learning incorrect physics is actively damaged, not just unhelped.

### 1.3 Naive Assumptions About Indian Students

**"A student who uses this for 30 minutes daily will master their syllabus."** This is the most naive sentence in the document. A Class 12 ISC student has 5-6 subjects, coaching classes, homework from school, and exam pressure. 30 minutes daily on a single platform is aspirational fantasy. The realistic goal is: 15 minutes, 4 days a week, for the subjects where the student is struggling. Design for the realistic scenario.

**"The teacher is always watching. Not surveillance — support."** This is exactly surveillance to a 15-year-old Indian student who already feels scrutinized by parents and teachers. The framing needs to change entirely: "Your teacher can see where you need help and reach out." Not "the system is watching." The student's perception determines adoption, not the developer's intent.

**"It works on a ₹10,000 phone with 3G."** A ₹10,000 phone in India is a 2-3 year old Android with 2-3GB RAM, an outdated chipset, and an Android version 2-3 releases behind current. 3G in India means 1-3 Mbps with frequent drops. The plan mentions this as a constraint but doesn't design for it — React, MathLive, KaTeX, D3 visualizations, and real-time WebSockets will crash or burn through data on this hardware. This requires actual engineering decisions, not just a bullet point.

**Offline is treated as a feature, not a requirement.** In India, offline isn't "internet drops mid-practice." It's "the student's house has no internet at all." The entire app must be usable as a standalone application. The plan says this, but Phase 11 is the LAST phase — meaning for the first 6-8 months, the app is useless for 40%+ of target users.

**Voice input for Class 1-2 is mentioned but not prioritized.** Young children can't type. This is the single biggest barrier for Classes 1-5. It should be in the MVP, not a Phase 9 add-on.

### 1.4 Missing the Parent Reality

Indian parents don't want dashboards. They want:

1. To know: "Is my child actually learning, or just playing on the phone?"
2. To know: "What should I do to help them?"
3. To know: "How are they doing compared to their peers?"
4. One action: "I can check in 30 seconds"

The Parent Dashboard in Phase 8 is over-engineered for this. A WhatsApp bot that sends a weekly message: "Priya practiced 4 times this week. She's good at derivatives, struggling with integration. Here are 5 questions — ask her to try them this weekend." — would be more effective than any dashboard.

### 1.5 Missing the Teacher Reality

Indian teachers (especially in CISCE schools) are overworked, underpaid, and technologically conservative. They don't want dashboards, heatmaps, or analytics tools. They want:

1. "Give me 5 practice questions on chain rule for my 40 students"
2. "Tell me which 8 students need help with calculus"
3. "Generate a worksheet on quadratic equations"
4. "I don't want to learn a new system — make it WhatsApp or nothing"

The Teacher Dashboard in Phase 8 solves problems the teacher doesn't have. The feature teachers actually need is a worksheet generator that works via WhatsApp.

### 1.6 The Competition Gets Wrong What We Can Get Right

The plan never identifies specific competitive gaps. Here are the real ones:

- **BYJU's**: Content is generic, not mapped to specific school textbooks. A student doing "Derivatives" on BYJU's might be learning something slightly different from what their school teaches. Tight coupling to the actual ISC textbook (ML Agarwal, etc.) is the moat.
- **BYJU's**: Parent communication is spammy and transactional. A WhatsApp-first parent relationship is the moat.
- **Unacademy**: Live classes are expensive, passive, and don't adapt to individual pace. Self-paced with adaptive difficulty is the moat.
- **Photomath**: Brilliant solver, zero practice, no mastery, no curriculum alignment. The solver + practice + curriculum alignment combination is the moat.
- **ALL of them**: No real offline mode. A PWA that actually works offline on 2GB RAM phones is the moat.

---

## 2. BETTER TOOLS — What Genuinely Improves Student Outcomes

### 2.1 ADD: Tesseract.js + Pix2Tex (ONNX runtime) for photo input

**WHY:** The #1 thing Indian students do when they're stuck: they take a photo of the problem and search for it. This is the acquisition funnel. If a student can open the app, point their camera at a textbook problem, and see a step-by-step solution in 5 seconds, they will use the app. Every. Single. Day.

**OUTCOME IMPACT:** Removes friction between "I'm stuck" and "I understand." The 5-second path to help is the entire engagement loop. No other feature matters if this doesn't work.

**Note:** Use ONNX runtime, not cloud APIs. It works offline, costs nothing, and respects privacy.

### 2.2 ADD: PWA with aggressive IndexedDB caching and Cache API

**WHY:** 40-60% of Indian students have unreliable or no internet at home. The app must be 100% functional after the first download. Every lesson, every practice question, every solver must be available offline.

**OUTCOME IMPACT:** Transforms the addressable market from "students with internet" to "every student with a smartphone." This alone is a 3x market expansion.

**Implementation:** Cache-first service worker. Pre-cache the student's current week's curriculum on first open. Don't cache 915 simulations — cache the 20-30 relevant to current topics.

### 2.3 ADD: WhatsApp Business API for parent-teacher-student communication

**WHY:** WhatsApp has 700M+ users in India. It's the only app that parents, teachers, AND students all use comfortably. Push notifications have <5% open rate on Android in India. WhatsApp messages have 98% open rate.

**OUTCOME IMPACT:**
- Parent engagement: weekly summary via WhatsApp instead of a dashboard nobody opens
- Teacher assignments: "Your math teacher assigned 5 questions on quadratic equations" via WhatsApp
- Student reminders: "Your 3 reviews are due today" via WhatsApp
- Doubt resolution: student can send a photo of a problem via WhatsApp and get a solution back

**This is the engagement channel. Not push notifications. Not email. WhatsApp.**

### 2.4 ADD: Service Worker Background Sync for offline actions

**WHY:** When a student solves 10 problems offline, all 10 mastery updates need to sync when connectivity returns. Without background sync, data is lost or conflicts arise.

**OUTCOME IMPACT:** Students in low-connectivity areas don't lose their work. Mastery data is accurate. Parents see timely updates.

### 2.5 ADD: Anki-style SM-2 spaced repetition (already mentioned, but needs elevation)

**WHY:** This is the single most evidence-based learning technique in existence. Every other feature is nice. Spaced repetition is proven to improve long-term retention by 200-300%. The plan mentions SM-2 but buries it in Phase 5. It should be the CORE of the practice engine, not a scheduling add-on.

**OUTCOME IMPACT:** Direct, measurable improvement in exam performance. Students forget 80% of what they learn within 2 weeks without spaced review. SM-2 fixes this.

### 2.6 ADD: ProseMirror or Slate for rich lesson content

**WHY:** Markdown is fine for authoring, but lessons need interactive elements embedded in-line: practice questions, simulations, hints, collapsible sections. Markdown can't express this well. ProseMirror gives you a Notion-like block editor that renders beautifully on mobile.

**OUTCOME IMPACT:** Lessons that are actually interactive, not walls of text with embedded iframes. Mobile-friendly by default.

### 2.7 ADD: DuckDB WASM for client-side analytics

**WHY:** Instead of querying the server for every mastery calculation, run BKT/IRT locally in the browser. DuckDB WASM is a full SQL engine that runs in the browser at near-native speed. It means mastery updates happen instantly, no network round-trip, no server load.

**OUTCOME IMPACT:** Instant feedback on mobile with poor connectivity. Zero server cost for computation.

### 2.8 CUT: Neo4j. Use Postgres with recursive CTEs.

**WHY:** Neo4j is operationally complex (cluster management, memory tuning, backup). A skill graph with ~200 nodes is trivially handled by Postgres recursive CTEs for prerequisite traversal. The queries are simpler, the stack is simpler, and you avoid a major failure mode.

**OUTCOME IMPACT:** Same functionality, fewer things to break at 2am.

### 2.9 CUT: Qdrant. Use Postgres full-text search.

**WHY:** Semantic search over 2000 lessons is not a performance problem. Postgres `tsvector` handles this well. Qdrant adds a service, a deployment, and another failure domain.

**OUTCOME IMPACT:** Same search quality, simpler infrastructure.

### 2.10 ADD: React Native or Flutter for the mobile app

**WHY:** The plan assumes Next.js PWA is sufficient for mobile. It's not. PWAs on Android have inconsistent service worker support (especially on budget phones with Chrome disabled or outdated). A native wrapper (Capacitor) or a proper React Native app gives you: push notifications that actually work, file system access for offline content, camera integration that's reliable, and performance that's 2-3x better on 2GB RAM devices.

**OUTCOME IMPACT:** App actually works reliably on the phones students actually have.

### 2.11 ADD: Simple streak counter with "grace days" and "makeup sessions"

**WHY:** Not XP. Not levels. A streak counter. But with grace days (students inevitably miss a day) and makeup sessions (catching up). The plan correctly identifies that real engagement comes from feeling progress, but gamification with XP and levels feels childish to Class 10-12 students.

**OUTCOME IMPACT:** Habit formation without the cringe factor. A 14-year-old doesn't want "XP" — they want to not lose their streak.

---

## 3. IMPROVED PROMPTS

The plan's prompt template has several problems:
1. It's too permissive ("YOU DECIDE everything") — produces inconsistent, over-engineered code
2. It doesn't specify the student's actual context (device, network, language, exam pressure)
3. It doesn't include the competition comparison
4. It asks Fable-5 to solve product strategy questions it shouldn't be solving

### 3.1 Improved Template

```
GOAL: [One sentence on what the student achieves that they couldn't before]
STUDENT CONTEXT: [Age, class, device (Android 11, 2GB RAM), network (3G, drops frequently), 
language preference, exam timeline (ISC 2026 in 8 months), typical study session (15 min 
after school)]
PARENT CONTEXT: [What they care about, what they check, how they communicate]
TEACHER CONTEXT: [What they need, what they already use, their tech comfort level]
COMPETITION COMPARISON: [What BYJU's/Photomath/Unacademy do here and where they fail]
EXISTING CODE: [What actually works, what's broken, what's been tested]
CONSTRAINTS: 
  - Must work offline (no network calls for core functionality)
  - Must load in <3s on 3G
  - Must fit in 100MB total app size
  - Must work on Android 10+
  - Must not require account creation to try (friction kills conversion)
SUCCESS CRITERIA: [Measurable student outcome, not "feels magical"]
WHAT NOT TO BUILD: [Specific things this component should NOT include]
```

### 3.2 Example: Improved Prompt for Phase 4.1 (Solver Page)

```
GOAL: A Class 11 student takes a photo of a calculus problem from their ML Agarwal textbook 
and sees a step-by-step solution that helps them understand the method, not just copy the answer.

STUDENT CONTEXT: 16 years old, Class 11 ISC, preparing for ISC 2026, has Android 11 phone 
with 2GB RAM, 3G network that drops 3-4 times per hour, studies 15-20 min per session after 
school and coaching. Speaks Hindi and English. Struggles most with "where do I start?" — 
knows formulas but can't identify which rule to apply. Gets answers from friends/Google 
but doesn't understand them.

PARENT CONTEXT: Mother, college-educated, checks homework occasionally via WhatsApp. Cares 
about exam scores. Willing to pay ₹500-800/month if she sees improvement.

TEACHER CONTEXT: Maths teacher at CISCE school, 25 students per class, uses WhatsApp for 
assignments, doesn't use any ed-tech tools currently.

COMPETITION COMPARISON:
- BYJU's: video explanation, not interactive, requires login, doesn't solve specific textbook 
  problems, video is 5-10 min — too long for "I just want to understand this one problem"
- Photomath: excellent step-by-step solver, but doesn't map to ISC syllabus, no practice, 
  no mastery tracking, English-only
- Toppr: has solver, requires login, shows answer after timer expires (frustrating)

EXISTING CODE: 16 solvers in solvers/ directory — NOT TESTED. Unknown which work. 
solver_registry.py exists but incomplete. YAML files define problem types and step types. 
SymPy is available for computation. MathLive is installed but not integrated.

CONSTRAINTS:
  - Core solve flow: open camera → snap → see solution in <5 seconds (on 3G)
  - Must work without login (show mastery locally via IndexedDB)
  - Step display: show 1 step at a time, student taps "next" to reveal — don't show 
    all steps at once (overwhelming, encourages copying)
  - Each step shows: the rule being applied, the formula, the before→after transformation, 
    and a 1-sentence explanation in HINGLISH (not formal English)
  - After solution: "Try similar problem" button → generates a variation
  - After 3 correct similar problems: mastery indicator updates locally
  - If solver fails: "I can't solve this yet — tap here to ask a teacher" (triggers Socratic 
    teacher or queues for human review)
  - Total app bundle for this feature: <50KB additional
  - Camera capture must work on Android 10+ with standard CameraX API

SUCCESS CRITERIA:
  - Student takes photo → solution in <5s (measured)
  - Student reports "I understand how to do this now" (in-app feedback: "Was this helpful? 
    Yes/No/Partially")
  - >60% of students who use solver once return within 3 days
  - Each step takes <2 seconds to render on 2GB RAM device

WHAT NOT TO BUILD:
  - No "watch a video" alternative for the same problem
  - No XP/points/levels for solving
  - No social sharing
  - No login wall before first use
  - No cloud processing of images (privacy, latency, cost)
```

### 3.3 Specific Prompt Problems in the Original Plan

| Original Prompt Issue | Why It's Bad | Fix |
|---|---|---|
| "YOU DECIDE: architecture, UX, features" | Delegates product decisions to AI. Fable-5 will build something impressive but possibly wrong for students. | Replace with "YOU DECIDE: technical approach only. UX must be validated against [specific student context]." |
| No mention of device specs | Code will be built for developer devices, not student devices | Add device constraints to every prompt |
| No mention of data costs | Code may work but consume 50MB per session | Add "total data per session must be <5MB" |
| "Make this better than anything that exists" | Vague, leads to over-engineering | Replace with "Beat Photomath on [specific metric] for ISC students" |
| No error/failure cases | Code handles happy path only | Add "Handle: camera denied, no storage, solve fails, network drops, student taps 'I don't know'" |
| No mention of Hindi/Hinglish | Code will be English-only | Add "All UI text and explanations must be available in Hinglish" |

---

## 4. MISSING COMPONENTS — What the Plan Missed Entirely

### 4.1 PHOTO PROBLEM INPUT (Camera → Solve)

**WHY MISSED:** The plan treats math input as a keyboard problem (MathLive). But 70%+ of Indian students will use their CAMERA, not their keyboard, to input problems. They're holding a physical textbook. They will photograph it.

**WHAT IT NEEDS:**
- Camera capture with crop/rotate (textbook pages aren't flat)
- On-device OCR for math (Tesseract.js + Pix2Tex ONNX)
- LaTeX output → SymPy → solver pipeline
- Handwriting recognition for step input (student writes answer by hand, app checks it)

**STUDENT OUTCOME:** The 5-second path from "I'm stuck" to "I understand." This is the entire engagement loop.

### 4.2 HOMEWORK HELP FLOW (The Real Use Case)

**WHY MISSED:** The plan is structured around "learning paths" and "mastery tracking" — abstract concepts. The real use case is: "I have homework due tomorrow and I don't understand question 3." The app needs to be optimized for this flow, not for "daily mastery progression."

**WHAT IT NEEDS:**
- "Today's homework" view: shows textbook page numbers, specific problems
- Solve → understand → practice similar → done
- Works in 10 minutes, not 30
- Parent gets a message: "Priya completed her maths homework, 8/10 correct"

**STUDENT OUTCOME:** Homework gets done. Understanding happens. Parent is satisfied. This is the retention loop.

### 4.3 WHATSAPP BOT (The Real Engagement Channel)

**WHY MISSED:** The plan builds dashboards, notifications, and in-app messaging. Indian students and parents live on WhatsApp. The engagement channel IS WhatsApp.

**WHAT IT NEEDS:**
- Daily reminder: "Priya, 3 reviews are due today. Tap to start."
- Weekly parent summary: "Priya: 4 sessions, mastered derivatives, needs help with integration"
- Teacher broadcasts: "Class 11A: Complete exercises 5.2-5.5 by Friday"
- Student can send a photo → gets solution back via WhatsApp
- Student can ask "explain integration" → gets a short explanation

**STUDENT/PARENT OUTCOME:** No app to open. No login. Just WhatsApp. This is where 90% of engagement happens.

### 4.4 VOICE INPUT (For Classes 1-5)

**WHY MISSED:** A Class 2 student cannot type. The plan mentions voice input in Phase 9 as a "Junior World" feature, but it's not in the core math input system (Phase 3.1). It should be.

**WHAT IT NEEDS:**
- Voice-to-math: "x squared plus two x plus one" → x² + 2x + 1
- Works with Indian English accents (not just US English)
- Works offline (Whisper tiny or Vosk)
- For Classes 1-2: voice navigation entirely ("next question", "help", "I'm done")

**STUDENT OUTCOME:** Classes 1-5 students can use the app independently. This opens up the full K-5 market.

### 4.5 "ASK A TEACHER" ESCALATION PATH

**WHY MISSED:** The Socratic teacher is AI. It will sometimes fail, give wrong answers, or not understand the question. When it fails, the student is stuck. The plan doesn't account for this.

**WHAT IT NEEDS:**
- "I still don't get it" button → queues question for a real teacher
- Real teachers (hired remotely, ₹200-300/hour) answer within 30 minutes
- Not every question needs this — probably 5-10% of sessions
- Student gets WhatsApp notification when teacher responds

**STUDENT OUTCOME:** Never truly stuck. Always has a path to understanding. This is the trust signal that makes parents willing to pay.

### 4.6 WORKED EXAMPLE SYSTEM ("Show Me How")

**WHY MISSED:** The solver shows steps, but sometimes a student needs to SEE a complete worked example before attempting. The plan doesn't include worked examples as a distinct feature.

**WHAT IT NEEDS:**
- "Show me a worked example of this type" → generates a fresh problem + complete step-by-step solution
- Student reads it, then gets their own problem
- Worked examples fade out as mastery increases (fading is proven to improve learning)

**STUDENT OUTCOME:** Students who learn from examples (most Indian students) get what they need. Students who learn by doing (some) skip straight to practice.

### 4.7 TEACHER WORKSHEET GENERATOR (WhatsApp-native)

**WHY MISSED:** The Teacher Dashboard in Phase 8 is complex. What teachers actually want is: "Give me a worksheet on quadratic equations for my Class 9 students." The deliverable shouldn't be a dashboard — it should be a WhatsApp message with a PDF.

**WHAT IT NEEDS:**
- Teacher sends WhatsApp message: "Worksheet: quadratic equations, Class 9, 10 questions"
- System generates PDF, sends back via WhatsApp
- Teacher distributes to class WhatsApp group
- When students submit answers (photo), system auto-grades and sends report

**TEACHER OUTCOME:** A tool they actually use, delivered on the platform they already use, in 30 seconds. This is adoption.

### 4.8 PEER COMPARISON (Class-level, Anonymous)

**WHY MISSED:** Indian students are highly motivated by peer comparison, but the plan has zero social features. Not leaderboards (toxic), but: "70% of your class got this problem right. You got it right too!" or "3 students in your class are also practicing derivatives today."

**WHAT IT NEEDS:**
- Anonymous, class-level only (no public leaderboards)
- Shows effort, not just ability: "You practiced 5 days this week — more than 60% of your class"
- Shows improvement, not just raw scores: "You improved 15% this month — top 20% of your class"

**STUDENT OUTCOME:** Motivation through belonging, not competition. Feels supportive, not demoralizing.

### 4.9 DATA USAGE MONITOR

**WHY MISSED:** The plan says "works on 3G" but doesn't monitor data consumption. A student on a ₹24/day data plan (common in India) will be horrified to find the app used 80MB in a 15-minute session.

**WHAT IT NEEDS:**
- Show data usage per session: "This session used 2.3MB"
- Option to download content on WiFi for offline use
- Compress all images, lazy-load everything, never download unused content

**STUDENT/PARENT OUTCOME:** No surprise data bills. Confidence that the app is affordable to use daily.

### 4.10 ERROR REPORTING WITH REWARD

**WHY MISSED:** Phase 13.2 has a content feedback loop, but it's passive. Indian students will find errors — wrong solutions, broken simulations, confusing questions. They should be REWARDED for finding them, not just thanked.

**WHAT IT NEEDS:**
- "Report an error" button on every problem/solution
- If confirmed: student gets "Contributor" badge + streak bonus
- Students who find 5+ errors get named in the app's acknowledgments
- This turns students into free QA

**STUDENT OUTCOME:** Engaged in the platform's quality. Gets recognition. Platform gets better content.

---

## 5. RUTHLESS CUTS

These components should be CUT because they don't improve student outcomes. They're there because they sound impressive.

### 5.1 CUT: Phase 12.2 — Multilingual Support (as a major phase)

**WHY:** Start in English + Hinglish only. Adding full i18n infrastructure for 22 languages before validating the product with one language is premature. The text overlay architecture mentioned is over-engineered. Most Indian students are comfortable with Hinglish. Add other languages when you have users requesting them.

**REPLACEMENT:** Hardcode Hinglish + English toggle. Add Tamil/Telugu/Marathi when you have 10,000 users in those states requesting it.

### 5.2 CUT: Phase 8.3 — Skill Tree Visualization (D3/Canvas interactive graph)

**WHY:** A force-directed graph of 100+ nodes is technically impressive, operationally fragile, and cognitively overwhelming for a 15-year-old. What does a student DO with a skill tree? Click on "derivatives" and see a mastery percentage? They already see that in their dashboard. The skill tree is a developer's idea of what gamification looks like. It's not what students find motivating.

**REPLACEMENT:** Simple progress bars grouped by topic. Mastered (green) / In Progress (yellow) / Not Started (gray). That's it.

### 5.3 CUT: Phase 9.2 — 915+ Simulations

**WHY:** The plan admits many are broken. Embedding broken simulations is worse than not having simulations. 915 simulations for the full K-12 syllabus is unnecessary — a student in Class 11 needs ~30-40 simulations for their specific syllabus. Build 20 excellent, verified simulations for high-impact topics (projectile motion, circuits, optics) and expand from there.

**REPLACEMENT:** Curate 20-30 simulations for the highest-impact topics. Verify each one. Embed only in relevant lessons. Build more based on student usage data.

### 5.4 CUT: Phase 10.2 — Exam Strategy Coach (as a separate system)

**WHY:** The plan has "Exam Strategy Coach" as both Phase 10.2 AND part of Phase 2.4 (Tutor API). It's duplicated, and as a standalone system it's over-engineered. Exam strategy is conversation — it's what the Socratic teacher does when a student says "I have my ISC exam in 2 weeks." It doesn't need its own engine.

**REPLACEMENT:** Integrate exam strategy into the Socratic teacher's context. When exam mode is activated, the teacher adapts its guidance.

### 5.5 CUT: Phase 13.1 — Platform Analytics (as a major phase)

**WHY:** The analytics described (which questions are bad, where students drop off) are V2 concerns. In V1, you need: did the student solve the problem? Was it correct? How long did it take? That's 3 fields. Build the full analytics platform after you have 1,000+ active students generating data worth analyzing.

**REPLACEMENT:** Minimal event tracking: solve attempt (correct/incorrect/time), session start/end, feature usage. 5 event types. Log to Postgres. Analyze with SQL.

### 5.6 CUT: Phase 6.2 — Proactive Intervention (auto-popup teacher)

**WHY:** The plan says the teacher "pops up" when the student gets 3 wrong answers. This will feel like surveillance to a teenager. Every Indian student already has parents and teachers correcting them all day. The last thing they want is the APP also correcting them. Intervention should be student-initiated, not app-initiated.

**REPLACEMENT:** After a wrong answer, show a subtle, dismissible prompt: "Stuck? I can help." The student chooses to engage. Never interrupt without consent.

### 5.7 CUT: BKT + IRT + AFM (three knowledge tracing models)

**WHY:** The plan says "YOU DECIDE how to combine them." This is a product-decision punt. Three competing mastery scores create confusing UI ("My algebra mastery is 72%/81%/59% — which is real?"). Pick one model (BKT is best for curriculum-structured subjects like math), validate it, and iterate. IRT is better for standardized testing. AFM is for group models. You don't need all three for a single student.

**REPLACEMENT:** BKT only. Simple. Understandable. Proven.

### 5.8 CUT: Phase 9.1 — "Choose-your-own" lesson branching

**WHY:** Students don't want to choose their learning path. They want to be told what to do. "Choose-your-own" sounds student-centric but actually creates decision fatigue. A student who opens the app wants one thing: "What should I do today?" The adaptive engine decides. The student follows.

**REPLACEMENT:** Linear lesson flow with adaptive branching based on mastery, not student choice.

### 5.9 CUT: XP/Levels/Achievements System

**WHY:** The plan correctly notes "not gamification tricks" but then includes XP ("You earned 85 XP!"), levels, and achievements throughout. XP feels childish to Class 8+ students. They've been on Duolingo and know it's fake. The real motivator is: "I understand something I didn't yesterday" and "I didn't break my streak."

**REPLACEMENT:** Streak counter (with grace days) + mastery progress bars. No XP, no levels, no badges.

### 5.10 CUT: The 26 "v2 services" architecture

**WHY:** The plan starts with 26 existing services and builds a registry around them. This implies the services already exist but need integration. The more likely reality: most of them are broken, untested, or over-engineered. Don't build a plugin system around 26 services — build 5 services that work.

**REPLACEMENT:** Start with 3-4 core services (solve, practice, tutor, sync). Build a plugin system only when you have >10 plugins to manage.

---

## 6. BATCH STRATEGY — Optimal Build Order

### PHILOSOPHY

Build the smallest thing that makes a student come back tomorrow. Every batch must produce a testable, usable feature. No batch should be "infrastructure that other batches depend on" — every batch should deliver student value.

### BATCH 1: CORE SOLVER (4 weeks) — "Can I get help with my homework?"

**Deliverable:** A student opens the app, takes a photo of a math problem, and sees a step-by-step solution.

**Components:**
- Camera capture → OCR pipeline (Tesseract.js + Pix2Tex ONNX)
- LaTeX ↔ SymPy bridge (Phase 1.3)
- 5 working solvers (not 37 — pick the 5 most common ISC Class 9-12 topics)
- Solver page with progressive step display (Phase 4.1, 4.2)
- Basic mastery tracking (Postgres table: student_id, topic_id, attempts, correct)
- Offline cache of solved problems (IndexedDB)
- Simple student profile (name, class, subjects)

**Parallel tracks:**
- Content team: audit 5 solvers, verify they work, write YAML definitions
- Frontend: MathLive integration, camera component, step display component
- Backend: FastAPI with one `/solve` endpoint, Postgres schema

**Success criteria:** 10 beta students use solver for homework → 7 return the next day.

---

### BATCH 2: PRACTICE ENGINE (3 weeks) — "Can I practice and get better?"

**Deliverable:** A student gets 5 adaptive practice questions, gets immediate feedback, and sees their progress.

**Components:**
- Question generator (5 topics, 50 variations each = 250 questions to start)
- Practice session (start → answer → feedback → next question)
- Adaptive difficulty (simple: 3 correct → harder, 2 wrong → easier)
- SM-2 spaced repetition scheduler
- Streak counter (with grace days)
- Mastery progress bar (simple: percentage of recent questions correct per topic)
- "Try another" after solving (batch 1 feature, finish here)

**Parallel tracks:**
- Content: generate 250 practice questions for 5 topics
- Frontend: practice session UI, question card, feedback animations
- Backend: practice API, session management, SM-2 implementation

**Success criteria:** Students who practice 3+ sessions show measurable improvement on the same topic's questions (more correct, faster).

---

### BATCH 3: SOCRATIC TEACHER (2 weeks) — "Can I ask for help?"

**Deliverable:** A student stuck on a problem can chat with an AI teacher that guides without giving answers.

**Components:**
- Tutor chat interface (Phase 6.3) — WhatsApp-style bubbles, math rendering
- System prompt for Claude (Phase 6.1) — Socratic, curriculum-aware, Hinglish
- Student context injection (current topic, mastery, struggle history)
- "Explain this step simpler" button on solver steps
- Graceful failure handling ("I don't know how to explain this — try asking your school teacher")

**DO NOT build proactive intervention (CUT).** Student-initiated only.

**Success criteria:** Student asks for help → gets a response that helps them understand → solves the problem independently.

---

### BATCH 4: HOMEWORK FLOW + PARENT (3 weeks) — "Can my parents see what I'm doing?"

**Deliverable:** Full homework loop + parent engagement via WhatsApp.

**Components:**
- Homework view: "Today's problems from Chapter 5" mapped to ISC textbook
- WhatsApp bot (Phase 4, new): daily reminders, weekly parent summary, student can send photo → get solution
- Parent view: simple — child's streak, topics practiced, one thing to help with
- Photo solve via WhatsApp (student sends photo, gets solution in chat)

**NOT building:** Full parent dashboard (CUT). WhatsApp messages only.

**Success criteria:** Parent receives and opens weekly WhatsApp summary. >30% of parents reply or take action (ask child to practice weak topic).

---

### BATCH 5: DIAGNOSTIC (2 weeks) — "What am I actually weak at?"

**Deliverable:** 15-question adaptive diagnostic with visual report.

**Components:**
- Diagnostic flow (Phase 7.1) — adaptive question selection, <15 questions
- Gap identification (concept vs procedural vs computation)
- Remediation path (specific practice problems, not generic "review algebra")
- Visual report (skill heatmap, not skill tree)

**CUT:** Complex graph visualization. Simple bar chart + text.

**Success criteria:** Student takes diagnostic → gets report → starts remediation → mastery improves in identified gap within 1 week.

---

### BATCH 6: TEACHER TOOLS (2 weeks) — "Can my teacher use this?"

**Deliverable:** Worksheet generator + class overview via WhatsApp.

**Components:**
- Teacher WhatsApp bot: send topic → get PDF worksheet
- Auto-grading: students submit answers via photo → teacher gets report
- Class overview (simple): which topics the class is struggling with

**CUT:** Full teacher dashboard (Phase 8.4). WhatsApp only.

**Success criteria:** 5 teachers use the worksheet generator → send worksheets to their classes → students solve them on the app.

---

### BATCH 7: EXAM PREP (2 weeks) — "Am I ready for ISC?"

**Deliverable:** Timed practice with real ISC papers + strategy coaching.

**Components:**
- Exam simulator (Phase 10.1): real ISC specimen papers, timer, marking scheme
- Exam strategy: integrated into Socratic teacher, not separate system
- Post-exam report: where marks were lost, what to practice

**Success criteria:** Students who take 2+ simulated exams score higher on actual school exams (self-reported).

---

### BATCH 8: JUNIOR WORLD (2 weeks) — "Can Class 1-5 students use this?"

**Deliverable:** Voice-first, game-like interface for young learners.

**Components:**
- Voice input (speech-to-math) — Whisper tiny ONNX model, offline
- Voice navigation: "next question", "help", "I'm done"
- Simplified UI: big buttons, minimal text, Sheru mascot as guide
- Parent view: same as batch 4

**CUT:** Complex game world (Phase 9.3's "world map"). Simple progression: level 1 → level 2 → level 3. That's enough.

---

### BATCH 9: PERFORMANCE + OFFLINE (2 weeks) — "Does it actually work?"

**Deliverable:** App that works on 2GB RAM, 3G, offline.

**Components:**
- Bundle audit: measure, reduce, lazy-load
- Image compression: WebP, responsive srcsets
- Service worker: cache-first, pre-cache current week's content
- Background sync: queue mastery updates when offline
- Data usage indicator: show MB consumed per session
- Performance monitoring: track load time, solve time, crash rate

**Success criteria:** App loads in <3s on 3G. Session uses <5MB data. 0 crashes on Android 10-13 for 1 week of beta testing.

---

### BATCH 10: ACCESSIBILITY + POLISH (2 weeks)

**Deliverable:** WCAG AA + final polish.

**Components:**
- Screen reader support (math equations via MathML)
- Dyslexia-friendly font option
- Colorblind-safe palette
- Reduced motion option
- Keyboard navigation

**CUT:** Full multilingual i18n. English + Hinglish is enough for V1.

---

### WHAT CAN BE PARALLELIZED

| Parallel Track | When | Independence |
|---|---|---|
| Content team (audit solvers, write questions, map to syllabus) | Batch 1 start | Fully independent of code |
| WhatsApp bot setup | Batch 1 end | Depends on having student data |
| Teacher recruitment (for "Ask a Teacher") | Batch 3 start | Independent |
| School partnerships (for beta testing) | Batch 1 start | Independent |
| Accessibility audit | Batch 9 | Depends on UI being stable |

### WHAT MUST BE SEQUENTIAL

- Batch 2 (practice) needs Batch 1 (solver) to work — can't practice without solving
- Batch 3 (tutor) needs Batch 1 (solver) for context injection
- Batch 4 (homework) needs Batch 1 (solver) + Batch 2 (practice)
- Exam prep needs mastery data from Batch 2
- Junior World needs core solver working

---

## SUMMARY: THE 10 THINGS THAT MATTER

If you build nothing else, build these 10 things in this order:

| Priority | Feature | Why |
|---|---|---|
| 1 | Photo → solve → step-by-step | This is the acquisition and retention loop |
| 2 | Works offline | 40%+ of users have no reliable internet |
| 3 | Works on 2GB RAM, 3G | Most users have this hardware |
| 4 | Practice with spaced repetition | Proven to improve retention 2-3x |
| 5 | WhatsApp engagement | Only channel that actually reaches parents and students |
| 6 | Hinglish support | Students don't read formal English well |
| 7 | "Explain simpler" + Socratic teacher | The adaptive teaching layer |
| 8 | Diagnostic with actionable remediation | Students and parents need to know what to fix |
| 9 | Teacher worksheet generator | Teacher adoption = student adoption |
| 10 | Data usage transparency | Parents on limited data plans need this |

**Everything else is V2.** Ship these 10 things. Test with 500 students. Then decide what to build next based on what they actually use.