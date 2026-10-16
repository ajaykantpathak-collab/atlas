# CHILD EXPERIENCE GAPS — childlens audit of Atlas (prod :3001)

**Lens:** a child psychologist + UX researcher walking the app as real Indian schoolchildren — fresh signups for **Class 6 (age ~11), Class 9 (age ~14), Class 12 (age ~16-17)**.
**Owner's question being answered throughout:** *"children don't know what they're doing, or how it's helping them."*
**Date:** 2026-09-21. **No code changes made.** Product defects are filed in `BUGS.md` under `[CHILD-LENS]`.

**Method:** three real fresh signups (Class 6, 9, 12) driven through the live product with headless Chrome; every screen screenshotted and its visible text + every link captured. Follow-up walks completed a lesson interaction, a practice session, and a diagnostic. Copy cross-checked against source (`deploy/frontend/app/(student)/...`, `deploy/frontend/components/dashboard/...`).

**Evidence:** `D:\platform\_shots\childlens\` — `c6\`, `c6_mobile\`, `c6_explore\`, `c6_lesson\`, `c6_quiz\`, `c6_practice3\`, `c6_diagfull\`, `c6_explore2\`, `c6_after2\`, `c9\`, `c9_explore\`, `c12\`, `c12_explore\` (PNG + `.txt` visible-text + `.links.json` per step).

---

## 0. The one-paragraph answer

Atlas is built and worded **for the adults who audit it, not the children who use it**. A child who signs up is dropped into an "Atlas Command Center" with **three competing first actions**, a mission whose button leads to a screen that says **"Building knowledge graph… 0 nodes"** and then shows **Class 10 content to every class**, a "Learn" page showing **Ohm's Law and Lens formula to an 11-year-old**, a diagnostic whose Start button **silently refuses to work** until a hidden second selection is made, a lesson whose big gold **"Start Learning" button opens a chatbot** that greets a Class 6 child with the Class 12 phrase *"Derivatives samajh nahi aaye"* and a **fabricated "Mastery: 30%"**, and — worst of all — after the child's first real practice session the app's headline reaction is *"chemistry is trailing at 0%."* Nowhere in the entire journey does the app ever tell a child, in child words, **what to do, why it matters for school, or what they can now do that they couldn't before.** The one genuinely child-designed surface (`/junior`, pastel mascot, big targets) is **orphaned — nothing links to it.**

---

## 1. CLASS 6 — the walked journey (age ~11)

| # | Screen (evidence) | What the child experiences | Verdict: do they know what/why/next? |
|---|---|---|---|
| 1 | `/signup` (`c6\01-02`) | Clean form, Student/Teacher/Parent tiles, Board + Class dropdown. Class dropdown **defaults to Class 10**; a distracted 11-year-old can create a Class-10 account in one tap. Side panel copy is for parents ("AI-powered… Diagnose gaps. Master concepts. Score higher."). | **Mostly yes.** One trap: the class default. |
| 2 | Create Account → `/dashboard` (`c6\03-04`) | Lands straight on "Atlas Command Center". No welcome, no tour — the 5-step `/onboarding` exists but **nothing on earth links to it** (signup hard-routes to `/dashboard`). Child sees: TODAY'S BRIEFING "Light your first star… Explore the map", THE STATE OF YOU (STREAK/XP/STARS LIT 0 of 9,099/MASTERY 0%), DAILY GOAL, then **18 "Start" cards**, Mastery Map, This Week, Recent Activity, Achievements. | **Partially.** The star metaphor is charming and understandable. But there are **three competing "first things"**: the mission button ("Explore the map"), 18 identical Start cards, and "Take your first diagnostic" buried at the very bottom. An 11-year-old cannot rank them. No nav bar exists to anywhere else (26 links on the whole page: explore, galaxy, achievements, lesson cards). |
| 3 | Mission CTA → `/explore` (`c6_explore\01`, `c6_explore2\01`) | "Knowledge Graph — **0 nodes · 0 links** — Building knowledge graph…" for ~10 seconds, then a map of **300 Class-10 topics** ("Photosynthesis… Contraception… IUPAC nomenclature… Horace Danby") — because `explore/page.tsx` hard-codes `useState(10)`. The class picker is bare digits `1 2 3 … 12` with no label and no indication of what's selected. | **NO.** The app's very first promised action dead-ends in an empty loading state, then shows other children's (Class 10's) content. This is the single worst first-run beat in the product. |
| 4 | `/learn` (`c6\07`) | "Explore Your Knowledge Universe — 42 topics available. Click any topic to see full enrichment content." Content: **Ohm's Law, Lens formula, Nuclear Fission, Electromagnetic Induction** — Class 12 physics for an 11-year-old (`learn/page.tsx` also `useState(10)`). Every card carries Bloom tags **"apply / understand / analyze"** and "medium". | **NO.** A C6 child recognizes nothing; the tags are teacher-training vocabulary. Give-up risk here is near-certain if they arrive via the "Browse all" link. |
| 5 | Lesson page `/learn/c6_math_ch01_001` (`c6_lesson\01`) | Genuinely good content for a child: title, "What you'll learn", Story Mode, WARM-UP CHECK, "See it happen" simulations, worked examples, prerequisites. But: header shows raw tags **"medium / understand"**; tabs read **"Overview / Diagnostics / Remediation / Scope"**; "No doodle card exported for this node yet." (pipeline message shown to the child); the **"Simple Explanation (ELI5)" is word-for-word identical to the definition above it**; Prerequisites/This Unlocks rows are truncated mid-sentence ("Comparing numbers is the process of d…"). | **Yes for content, no for chrome.** The lesson itself a child can follow; the surrounding labels ("Remediation", "node", Bloom tags, broken ELI5) tell them this isn't really made for them. |
| 6 | Clicks "Start Learning" (`c6_quiz\02`) | The big gold primary button → **navigates to `/tutor`**, a Hinglish chat: "Socratic Tutor — Good evening, Scholar! — Mathematics · Class 6 · **Mastery: 30%**" with suggested chips **"Derivatives samajh nahi aaye / Hint do / Example dikhao"**. Mastery 30% is a **hard-coded default** (`useState(masteryProp ?? 0.3)`) — the child has answered zero questions and every other page says 0%. "Derivatives" is Class 12 math. The entire tutor is Hinglish even though the child never chose Hindi. | **NO.** The child wanted the lesson; they got a chat that starts with a word they've never seen, claiming they're 30% competent at something they never did. |
| 7 | `/practice` (`c6\08-11`, `c6_practice3`) | Focused and calm: "Mathematics — 5 questions • Instant feedback • **Adaptive difficulty** — Start Practice →". Q1 can be open-ended ("write two different equivalent fractions… Explain how you know…") with the Submit button **disabled until typing, no instruction**; typing and submitting works, feedback tone is good ("Not quite — let's learn this together!"). Session results screen exists (🏆/💪/📚 + accuracy + mastery cell). Chapter labels are meaningless numbers ("Chapter 3", "Chapter 10"). | **Mostly yes.** This is the best-designed loop for a child. Jargon: "Adaptive difficulty", "Mastery". |
| 8 | `/diagnostic` (`c6\06`, `c6_diagfull\01-02`) | "🎯 Ready? We'll find out what you know… ⏱️ This will take about 15 minutes… Start Diagnostic." Child taps Mathematics → a second hidden step appears ("Select Chapter: **Algebra / Geometry / Trigonometry / Calculus**" — the same four for every class); until a chapter is also picked, **Start Diagnostic is grey and does nothing, with no reason shown** (`canStart = subject && chapter`). In-session: **countdown timer (3:00)** with alarm icon per question, "Subskill: Linear Equations" pill, tiny ✕ exit. Actually only **5 questions**, not 15 minutes. Results screen copy: "Your Diagnostic Results — Overall Mastery — Excellent!/Good Progress/Let's Build Up — Your Learning Plan — **Start Remediation**." | **NO at the door, partial inside.** "Tap Start → nothing happens" is the classic child-give-up moment. "Remediation" is special-education vocabulary. The unexplained countdown reads as danger, not challenge. |
| 9 | `/progress` (`c6\12`) | "THE FULL REPORT — Every number, Test — Mastery, activity and **retention** — measured from your real answer history… Nothing estimated." Then eight subject bars, each "N **nodes tracked** / 0% / N not started". "Review Queue — smart scheduling will bring it back right before you would forget it." Study Calendar (18 weeks). **"Take your first diagnostic" appears three separate times** on one screen. | **NO.** It's a report about the database, not about the child. Nothing says what the child can *do*; every line is a zero plus an instruction to go run a diagnostic. |
| 10 | `/achievements` (`c6\13`) | 24 locked badges — including **duplicates**: "First Steps" twice, "Week Warrior" twice with *conflicting* definitions (14-day "review streak" vs 7-day "streak"), "Topic Tamer" and "Concept Builder" with the identical description ("Master 10 knowledge nodes"), "Month Master" ≈ "Monthly Dedication". Jargon: "spaced-repetition reviews", "knowledge nodes", "board-level exam". "Speed Demon — Answer 10 questions in under 5 seconds each" rewards racing, not thinking. | **Mixed.** Badge art + XP motivates, but duplicates read as fake, and several badges push the wrong behavior (speed) or use adult words. |
| 11 | `/my-galaxy` (`c6\14`) | "YOUR GALAXY — 0 of **9,099** stars lit — gold = mastered · faint = not yet — an honest sky." Defaults to **ALL classes 1-12** (tabs exist but the child's own class isn't preselected). | **Partially.** The metaphor lands, but 9,099 stars of which ~380 are "mine" makes day one feel infinite; the legend is poetry a child can't parse. |
| 12 | Dashboard after first real practice (`c6_after2\01`) | Mission flips to: "**chemistry is trailing at 0%.** Lowest of your subjects right now — one focused session moves the needle." Below: "REVIEW RADAR — 1 topic is due for review — **clear them before they slip**". MASTERY still **0%** ("No reading yet — a diagnostic sets the baseline") even though the child just answered questions. One genuine positive: "↗ XP UP 2 — THAT'S MOMENTUM". | **NO — and this is the emotional low point.** The child did the thing the app asked; the app answered with a deficit headline ("trailing at 0%"), a threat-shaped reminder ("before they slip"), and a mastery meter that refuses to move. This is where "how is this helping me?" dies. |
| 13 | `/junior` (`c6\15`) | Pastel sky, elephant mascot, "Aaj hum kya seekhenge?", four big friendly cards (Maths/English/Science/GK), star counter. **Orphaned: no link from any page.** The "Hing" toggle wears a padlock with no explanation. | The right design for this age — and unreachable. |

---

## 2. CLASS 9 — the walked journey (age ~14)

Journey identical through signup/dashboard/practice/diagnostic/progress (see §1); class-specific deltas:

| # | Screen (evidence) | What the child experiences | Verdict |
|---|---|---|---|
| 1 | Dashboard (`c9\04`) | Continue Learning correctly serves **Class 9 nodes** (Cartesian coordinate system, Cell Theory, Plate tectonics) — the recommendation engine is class-aware, unlike /learn and /explore. Same "Light your first star" mission. | **Yes for next step, no for why.** Nothing connects these topics to Class 9 exams, school, or goals. |
| 2 | `/exam-prep` (`c9\08`) | "Pre-Board Simulator — Full CBSE-pattern board papers **for classes 10 and 12**…" CLASS toggle offers only **Class 10 / Class 12**, and the state logic deliberately maps every sub-10 class to 10 (`myClass < 10 ? 10 : myClass`). A Class 9 child sees Maths "3h, 80 marks, 38 questions" board papers presented as *their* exam prep, with no line saying "this is a Class 10 paper for practice". | **NO.** A 14-year-old concludes either (a) "my exam is 3h/80 marks" (false for C9) or (b) "I'm looking at someone else's exam" (why?). |
| 3 | `/diagnostic` (`c9\05`) | Same four math chapters (Algebra/Geometry/Trigonometry/Calculus) — for C9 "Algebra" is at least plausible, but the list is still class-blind, and the same hidden second-step + disabled Start gate applies. | **No at entry.** |
| 4 | `/homework` (`c9\09`) | "Homework — Assignments from your teachers… No homework right now." Honest empty state, clear purpose. | **Yes** — one of the few screens a child fully understands. |
| 5 | Progress / Achievements / Galaxy | Identical to C6 findings — a wall of "0 nodes mastered" in "nodes tracked" language. | **No.** |

**C9 verdict:** the content engine finally speaks this child's language, but the framing (galaxy mission, board papers without a label, deficit dashboard) still never says *why any of this matters for the Class 9 year they're actually living*.

---

## 3. CLASS 12 — the walked journey (age ~16-17)

| # | Screen (evidence) | What the child experiences | Verdict |
|---|---|---|---|
| 1 | Dashboard (`c12\03`) | Correct C12 subjects (Accounts, Biotechnology, Business Studies…). But the mission for a boards-in-months 17-year-old is "**Light your first star. Pick any topic and make it yours tonight.**" — no mention of boards, syllabus completion, or time left. | **Partially.** Not confusing, but tonally younger than the user; misses the one "why" this age actually has. |
| 2 | `/exam-prep` (`c12\06`, `c12_explore\02`) | Pre-Board Simulator **defaults to Class 10 papers** for a Class 12 account (the toggle is there but the default ignores `myClass` unless ≥10… `myClass === 12` keeps 12 — however the walked C12 account saw Class-10 Mathematics/Science/Social-Science papers first, i.e. the default landing shows C10). Intro paragraph is examiner-speak: "internal choice where the question bank supports it", "graded scorecard with section and chapter breakdowns". | **Partially.** Content right one tap away; default and wording wrong. |
| 3 | `/exam` (`c12\07`) | "Board Exam Simulator — Real-time simulator for CBSE Board Exams." Mathematics 80 marks · 3h · 2 Sections; Physics 70 · 3h… Clean, understandable, appropriately serious. | **Yes.** Best age-fit screen of the whole audit. |
| 4 | `/chapter-test` (`c12\12`) | SUBJECT/CLASS/QUESTIONS/TIMER pickers (Untimed option exists — good). But chapter names are machine-generated node titles: "**A Relation R On A Set A**", "**A Matrix**", "**A Determinant**", "**A Real-Valued Function (F)**". | **Partially.** A C12 student deciphers these, but they read as database rows, and "327 questions in the bank" is pipeline-speak. |
| 5 | `/explore` (`c12_explore\01`) | Same hard-coded Class 10 graph (Photosynthesis, IUPAC nomenclature) for a C12 student. | **No.** |
| 6 | `/progress` (`c12\10`) | Same zero-wall in "nodes tracked" language; no projection to boards ("at this pace you'll cover X% by Feb"), no exam-score bridge. | **No.** The single biggest missed "why it matters" for this age. |

---

## 4. Answers to the seven audit questions (cross-class)

### Q1. Do they know what they're doing?
Only inside the Practice loop and the lesson body. Everywhere else the app speaks dashboard: "Command Center", "Briefing", "Mastery", "nodes tracked", "Review Radar". The three structural failures:
1. **No guided first run** — onboarding is orphaned; signup drops the child into a stats page with three competing CTAs.
2. **Wrong-class content on the two "browse everything" surfaces** (/learn, /explore both `useState(10)`).
3. **Dead-affordance moments** — diagnostic Start silently disabled; lesson "Start Learning" goes to a chat; practice Submit disabled with no cue.

### Q2. Do they know why it matters?
Almost never, in child language. The connections to school/exams/goals exist implicitly (class-correct recommendations, board simulators) but no screen ever says "this is in your syllabus", "your test is next month", or "you'll be able to do X". The mission system's only known frames are "Light your first star" (why? because stars) and "chemistry is trailing at 0%" (why? because deficit). Class 12 — the one class with an obvious, self-chosen "why" (boards) — gets the most juvenile framing. C9 is shown C10 board papers with no explanation. Homework is the only surface where the school connection is explicit.

### Q3. Do they know if it's helping?
**No.** After a real practice session: dashboard mastery stays 0% ("a diagnostic sets the baseline" — meaningless to a child who just answered questions), the headline mission becomes a deficit ("trailing at 0%"), and the review reminder is threat-shaped ("before they slip"). Progress framing is 100% numeric (percent, XP, nodes) — **never ability-based** ("you can now…"). The one growth moment the app does produce ("↗ XP UP 2 — THAT'S MOMENTUM") is immediately buried under the deficit headline. The practice results screen (🏆 + accuracy + mastery cell) is the sole "you did it" artifact, and it doesn't say what the child can now *do*. There is a telling exception that proves the rule: the practice feedback used to display "Mastery: 71% → 0% ↓71%" (the code comment admits it); the BKT fix removed the number, but nothing replaced it with a human sentence.

### Q4. Do they know what to do next?
- After signup: three rival next-steps, no ranking.
- After the mission CTA: a broken/empty screen.
- After a lesson: "Start Learning" (= tutor) vs "Take Quiz" (= inline quick practice, which hung on "Picking a verified question…" during the walk).
- After a practice session: results screen has no next-step CTA; the dashboard's answer is "chemistry is trailing".
- After a diagnostic: "Start Remediation" — a word no child can act on.
- Global: there is **no persistent navigation** — a child on /practice, /progress or a lesson has no visible way to any other surface except the browser back button (links.json evidence: practice page has exactly one link, "Skip to content").

### Q5. Cognitive load & age-fit
- **/learn and /explore for C6-9: fatally mis-aged** (C10/C12 content, Bloom tags, digit-only class pickers).
- Lesson pages are text-dense (definition appears three times; long paragraphs); a struggling C6 reader gives up at "What you'll learn" unless Story Mode is the default.
- Dashboard density is adult-manageable but number-heavy for 11 (five stat tiles with four jargon labels each).
- Reading level of chrome copy ("measured from your real answer history against the official syllabus. Nothing estimated.") is ~grade 10+.
- Tap targets are good in /junior and /practice; the diagnostic's ✕ exit and the galaxy's class digits are small.
- Mobile (`c6_mobile\`): dashboard header wraps/clips ("Atlas Command Center" behind the bell, "Your galaxy" truncated); rest of the journey is responsive but equally jargon-dense.
- Hinglish tutor copy is warm but is forced on children who chose EN.

### Q6. Emotional journey map (one practice session, Class 6)
```
signup ──► curious ("Light your first star" ✦)
       ──► confused (3 rival first-steps, no tour)
       ──► frustrated (Explore → "0 nodes… Building…" then C10 content)   [WORST]
       ──► confused-again (/learn = Class 12 physics)
       ──► curious (lesson content ✦)
       ──► disoriented (Start Learning → Hinglish chat, "Derivatives", fake 30%)
       ──► focused (practice ✦)
       ──► stuck (open-ended Q1, Submit dead, no instruction)
       ──► reassured (feedback tone, 🏆 results ✦)
       ──► deflated (dashboard: "chemistry is trailing at 0%", "before they slip", mastery still 0%)  [RISK: CHURN]
       ──► anxious, if diagnostic attempted (15-minute warning, hidden 2nd step, dead button, countdown)
       ──► lost (progress wall of zeros in "node" language)
       ──► (never sees /junior — the one place designed for them)
```
Pointless-feeling moments: the zero-wall progress page; duplicated badges (fake wall); "XP UP 2 — THAT'S MOMENTUM" (2 XP for 5 questions makes the economy feel meaningless); the galaxy of 9,099 stars when ~380 belong to your year.

### Q7. Vocabulary audit (every adult term a child meets → child replacement)

| Term the child sees | Where | Child-friendly replacement |
|---|---|---|
| Diagnostic / "Take your first diagnostic" | dashboard, progress, diagnostic, achievements | **"Check-up quiz"** (+ one line: "a tiny quiz so the app knows where to start") |
| Start Remediation | diagnostic results CTA | **"Let's fix the tricky bits"** / "Start my practice plan" |
| Mastery (0%, Mastery ⭐, Avg Mastery) | dashboard, practice, tutor, progress | **"How much I've got"** or per-skill strength stars |
| Baseline ("a diagnostic sets the baseline") | dashboard, progress | "Your first score — we'll compare later" |
| node(s) / tracked nodes / knowledge nodes / "0 of 9,099" | dashboard, progress, achievements, galaxy | **"topics"**; scope to the child's class ("0 of 380 Class 6 topics") |
| Enrichment content | /learn intro | "extra cool stuff when you're ready" |
| Review Queue / due for review / smart scheduling / spaced-repetition reviews / "clear them before they slip" | progress, dashboard, achievements | **"Practice again before you forget"** / "Don't forget these!" |
| Review Radar | dashboard | "Don't Forget!" |
| Adaptive difficulty | /practice | "Questions that adjust to you" |
| Subskill: Linear Equations | diagnostic question | "Topic: …" or drop |
| apply / understand / analyze (Bloom tags), "medium" | /learn, lesson header | hide, or "Practice / Think / Challenge"; hide difficulty until there's data |
| Chapter 80 / "Chapter 3" bare numbers | dashboard cards, practice | chapter **names** |
| XP / LV (undefined) | everywhere | fine for age 10+ but define once: "XP = points you earn when you practice" |
| retention | progress subtitle | "how much you remember" |
| Live data (chrome badge) | dashboard header | remove (it reassures auditors, not children) |
| "an honest sky" / "gold = mastered · faint = not yet" | /my-galaxy legend | "Bright = you've got it · dim = not yet" |
| Available offline | /diagnostic | remove (meaningless online) |
| "This will take about 15 minutes" | /diagnostic | "5 quick questions" (that's what it is) |
| Socratic Tutor | /tutor header | "Your Guide" + one line: "I ask questions so YOU find the answer" |
| Simple Explanation (ELI5) | lesson | "In simple words" (and actually simplify it) |
| Story Mode "A guided retelling — hook, idea, trap, checks" | lesson | "Story time — watch out for the twist!" ("trap" → "twist") |
| "No doodle card exported for this node yet." | lesson | hide the card entirely until content exists |
| Overview / Diagnostics / Remediation / Scope (lesson tabs) | lesson | "Learn / Check-up / Fix-it / What's inside" |
| Prerequisites | lesson | "Before this, know…" |
| board-level exam / "questions in the bank" / "internal choice where the question bank supports it" | achievements, chapter-test, exam-prep | "board exam style" / drop bank/pipeline language |
| "Derivatives samajh nahi aaye" (suggested chip, C6!) | /tutor | subject- and class-aware starter chips |
| 9,099 / 327 questions in the bank / 300 nodes · 895 links | galaxy, chapter-test, explore | your-class numbers only; hide graph telemetry |
| Hing 🔒 (locked language toggle, no explanation) | /junior | either unlock or one line "Hinglish coming soon" |

---

## 5. Prioritized child-experience fixes

Each: **what**, **where**, **why it matters to a child**. P0 = a child cannot successfully start; P1 = a child cannot feel success; P2 = trust/fit erosion; P3 = polish.

| Pri | Fix | Where | Why it matters to a child |
|---|---|---|---|
| **P0** | **Kill the wrong-class defaults.** `/learn` and `/explore` hard-code `useState(10)`; sync both to `user.class_level` on load (same pattern STUDENT-C9 already filed for /learn), label the picker with the class name, and lock under-14s to their class band by default. | `deploy/frontend/app/(student)/learn/page.tsx`, `explore/page.tsx` | An 11-year-old who sees Ohm's Law concludes "this app is not for me" within 10 seconds — the exact failure the owner fears. |
| **P0** | **Fix the diagnostic door.** One tap to start (subject only; chapter auto-picked per class), button shows *why* it's disabled, replace "15 minutes" with "5 quick questions", rename the results CTA "Start Remediation" → "Start my practice plan", and make the timer count **up** (or remove) for C6-9. | `diagnostic/page.tsx` (`canStart`, chapters array, timer) | "I tapped it and nothing happened" is the single most common child give-up trigger; the countdown converts a friendly check-up into a test. |
| **P0** | **Give every fresh signup ONE next step.** Route signup → the (already built) `/onboarding`, and end it by dropping the child directly into the first lesson of *their* class; until that ships, make the dashboard mission CTA a class-correct lesson (not /explore) and demote the other CTAs. | `app/(auth)/signup/page.tsx` (router.push), `dashboard`, `CommandBriefing.tsx` | Children don't rank competing CTAs; they stall. The mission currently points at the emptiest screen in the product. |
| **P1** | **Lead with growth, never deficit, in a child's first week.** Day-one mission must never be "X is trailing at 0%"; reframe to what they did/ can do next ("You answered 5 questions — tomorrow, beat 3!"). Mastery should visibly move after practice (even "+2%"), or display "Keep going — your check-up score unlocks after 10 answers". | `CommandBriefing.tsx` (mission generator), `ReviewQueueCard.tsx`, dashboard STATE OF YOU | The moment after effort is when a child decides whether the app "works". Deficit framing + a stuck meter teaches them their effort did nothing. |
| **P1** | **Make progress ability-shaped.** Add one sentence to the practice results and progress page: "You can now…" / "New: you can split fractions two ways" — generated from the nodes touched. Replace "nodes tracked" copy with topics; scope counts to the child's class. | `practice` results component, `progress/page.tsx` | Numbers don't tell a child they grew; "you can now do X" does. This is the cheapest possible answer to "how is it helping me?" |
| **P1** | **Fix the lesson's buttons.** "Start Learning" must scroll to/open the lesson (not `/tutor`); the tutor gets its own clearly-labeled "Ask your Guide" button; "Take Quiz" quick-practice loader needs a state, not an infinite "Picking a verified question…". | `learn/[topicId]/page.tsx` (Link href="/tutor") | The primary button on a lesson lying about its destination breaks trust and strands C6 children in a Class-12-worded chat. |
| **P1** | **De-fabricate the tutor.** Remove the `?? 0.3` mastery default (show nothing until data), make starter chips class/subject-aware (never "Derivatives" below C10), and respect the EN language choice with a Hinglish opt-in. | `tutor/page.tsx` | A fake "Mastery: 30%" contradicts the platform's own "Nothing estimated" promise and confuses a child who has answered nothing. |
| **P2** | **Ship the child mode to the children.** Put a visible "Junior mode" card on the dashboard for C6-7 (the surface already exists at `/junior`), and explain the padlock on "Hing" or remove it. | dashboard + `junior/page.tsx` | The best-designed child surface in the product is unreachable by the only users it fits. |
| **P2** | **Clean the badge wall.** De-duplicate (First Steps ×2, Week Warrior ×2 with conflicting definitions, Topic Tamer = Concept Builder, Month Master ≈ Monthly Dedication), drop "Speed Demon" (speed-rewarding) or reframe as a fluency badge, translate "spaced-repetition reviews". | achievements data + page | Children notice fake walls; a badge that rewards rushing undermines the "think, don't race" message. |
| **P2** | **Label exam surfaces honestly by class.** C9 seeing C10 pre-board papers needs one line: "These are Class 10 board papers — early practice for your boards next year"; C12's default should be Class 12. | `exam-prep/page.tsx` (`myClass < 10 ? 10 : …`) | Prevents both the "my exam is 3h/80 marks" false belief and the "this isn't mine" shrug. |
| **P2** | **Say why it matters, once per subject, in child words.** One line on lesson and chapter surfaces: "This is in your CBSE Class 6 syllabus — it usually shows up in the mid-term." Class 12 additionally gets time-to-boards framing. | lesson header, dashboard briefing | This is the missing answer to "why am I here?" for every age band. |
| **P3** | **Lesson chrome cleanup.** Fix the ELI5 section to actually differ from the definition (the derive_eli5 output is currently identical); hide empty Doodle Cards; stop truncating Prerequisites/"This Unlocks" mid-sentence; rename tabs (Diagnostics/Remediation/Scope); hide raw "medium/understand" tags. | `learn/[topicId]/page.tsx`, eli5 pipeline | The content is good; the chrome keeps telling the child it wasn't made for them. |
| **P3** | **Signup class default** should be "pick your class" (or remembered), never silently Class 10; galaxy should open on the child's own class tab with "9,099" scoped to their year. | `signup/page.tsx`, `my-galaxy` | One unnoticed dropdown mis-ages the entire product for that child. |
| **P3** | **Mobile header fit** (Command Center wraps behind bell; "Your galaxy" clipped). | dashboard header | First impression on the device most Indian children actually own. |

---

## 6. Pointers for fixers

- Wrong class defaults: `learn/page.tsx` `const [classLevel, setClassLevel] = useState(10)`; `explore/page.tsx` `const [classLevel, setClassLevel] = useState<number>(10)`.
- Diagnostic gate: `diagnostic/page.tsx:818` `const canStart = subject !== "" && chapter !== ""`; results CTA strings "Start Remediation" / "Retake Diagnostic" in the same file's i18n map (~line 86).
- Lesson → tutor: `learn/[topicId]/page.tsx` `<Link href="/tutor" className="btn-primary"> Start Learning` (primary action slot).
- Tutor defaults: `tutor/page.tsx` `const [mastery, setMastery] = useState(masteryProp ?? 0.3)`; chips `s_derivatives: 'Derivatives samajh nahi aaye'` (hardcoded i18n map).
- Deficit mission: `components/dashboard/CommandBriefing.tsx` (`trailingTitle/trailingSub` strings); review threat: dashboard review radar row ("clear them before they slip").
- Orphans: zero references to `/onboarding` or `/junior` anywhere in `app/` or `components/` (grep-verified).
- Duplicated badges: achievements page data (First Steps ×2, Week Warrior ×2, Topic Tamer/Concept Builder identical).
- Practice is the model to copy from: single focused CTA, honest empty states, warm feedback strings already exist (`practice/page.tsx` `encouragingMessages`).
