# TEACHING_LAYER_GAPS.md — the teaching-layer gap report

**Auditor:** PEDAGOGY-AUDIT (pedaudit) · **Date:** 2026-09-21 · **Target:** production http://localhost:3001 (Atlas)
**Method:** fresh-signup browser walks (headless Chromium via Playwright, persistent profiles per class) as a Class 6 student, plus code-level verification of every teaching surface (lesson, practice, review, chapter-test, diagnostic, parent, achievements, exam-prep). Evidence screenshots + DOM text dumps: `D:\platform\_pedaudit\shots\c6\`. Harness: `D:\platform\_pedaudit\` (auditor-only tooling, no product code touched).
**Scope note:** Class 9 and Class 12 fresh-signup walks were blocked mid-audit by a live production outage of the API layer (see [PEDAGOGY-AUDIT][P0 API-OUTAGE] in BUGS.md); the Class 6 walk completed, and class-band differences were verified in code (class-blind banks/defaults) rather than in two more live sessions. Cross-references: prior `CHILD_EXPERIENCE_GAPS.md` walk (same day) and BUGS.md `## CHILD-LENS` entries — overlaps are cited, not re-filed.

---

## Scorecard (each dimension 0–2: absent / partial / strong)

| # | Dimension | Score /2 | One-line verdict |
|---|-----------|----------|------------------|
| 1 | Goal clarity | **1** | Mission briefing on dashboard; zero objectives inside a lesson or session |
| 2 | Placement & prior knowledge | **1** | Prereq machinery exists; the diagnostic that should place you is class-blind and its results vanish |
| 3 | Cognitive load | **1** | Genuine worked-example fading; raw LaTeX in options, full-wall text, timer pressure |
| 4 | Retrieval & spacing | **1.5** | Real SM-2 review surface; never interleaved into practice |
| 5 | Feedback quality | **1.5** | Rich authored feedback in practice; diagnostic feedback is canned and third-person |
| 6 | Metacognition | **1** | Honest self-check in lesson quizzes; no confidence calibration anywhere a child answers |
| 7 | Error as learning | **1.5** | Misconception panel + prereq detours; a correct answer can be graded wrong with no explanation |
| 8 | Motivation | **1** | Streak/XP/star machinery; every reward measures attendance, none measures understanding |
| 9 | Help-seeking protocol | **0.5** | Tutors exist on demand; nothing ever intervenes when a child is actually stuck |
| 10 | Transfer | **0.5** | Sims gesture at the real world; no teach-someone missions, no off-screen tasks |
| 11 | Language of learning | **1** | Owl and lesson voice are lovely; the machinery speaks "diagnostic/remediation/nodes" |
| 12 | Board relevance | **1** | Exam-prep exists for 10/12; the year/marks provenance in the DB never reaches a child |
| | **TOTAL** | **12 / 24** | Solid skeleton, missing the teaching layer that makes it a tutor |

---

## 1. Goal clarity — 1/2 (partial)

**What works.** The dashboard leads with `TODAY'S BRIEFING — MON, 21 SEPT · CLASS 6 · CBSE` and a single numbered mission ("01 / TODAY'S MISSION — Light your first star", `components/dashboard/CommandBriefing.tsx`), plus a settable daily goal (`/api/engagement/goal`). A fresh child is told, in one line, what today is for. Screenshot: `shots/c6/05_dashboard_settled.png`.

**What's missing.**
- **Lessons have no objectives.** Grep for "You will learn / By the end / In this lesson" across `components/learn/*` and `app/(student)/learn/*` returns nothing. A child opens a Story cold — no "what you'll be able to do", no "why this matters", no "where it showed up in exams". The lesson's own tabs (Overview / Diagnostics / Remediation / Scope) are machinery sections, not goals.
- **The mission is a shrug.** Day-one mission copy is "All sky. No stars yet. Pick any topic and make it yours tonight" — autonomy without direction. Meanwhile the 18 "Continue Learning" cards all say `MEDIUM · ~30 min` with truncated definition-sentences as titles ("Materials are substances used to create objects, and matter", "The 'plot'", "A government") — a child cannot form a goal from these (`05_dashboard_settled.txt` lines 67–266; duplicates too: "Materials" twice, civics ch11 twice).
- **No closure.** A session ends with points + a mastery delta; nothing asks or states "today you learned X".

**Research principle.** Advance organizers and goal setting: learning improves when learners know what they're expected to achieve and why before instruction (Ausubel 1968; Locke & Latham 2002; Hattie & Timperley 2007 feed-up).

**Intervention (buildable).** Every lesson header gets a 3-line brief assembled from fields that already exist in the enrichment corpus: `definition` (rewritten as "By the end you can…"), `scope_boundary` ("You do NOT need…"), and the chapter's board_questions count ("Asked in board exams every year — see the chapter test"). Add a 10-line `LessonBrief` component to `learn/[topicId]/page.tsx` above the fold; the API `/api/content/nodes/{id}/enrichment` already returns every field. Parallel: make TODAY'S MISSION name a concrete node ("Light your first star: What is a sentence?") instead of "pick any topic" — the recommendation API already returns one.

---

## 2. Placement & prior knowledge — 1/2 (partial)

**What works.** The plumbing for placement is real: `/diagnostic` per-subject, `/api/graph/prerequisites/{id}` + `PrereqFixList` blocks a lesson's quiz behind prereq gaps (`components/learn/PrereqFixList.tsx`, `learn/[topicId]/page.tsx`), and the practice engine serves difficulty off a per-student posterior (`services/practice_service.py`).

**What's broken (this is the audit's central finding).**
- **The placement instrument is class-blind.** The diagnostic's chapter chips are the hardcoded array `["Algebra","Geometry","Trigonometry","Calculus"]` for every class (`app/(student)/diagnostic/page.tsx` line 30) and its fallback item bank is a static object literal (lines 262–330) with polynomials, quadratics, slope/intercept. A fresh **Class 6** child got: `2x+5=13`, "Which equation has slope 2…", `(x+3)(x−2)` expanded, `x²−5x+6=0` — Class 9/10 CBSE content — scored 20%, and was shown "Needs Practice: Quadratic Equations". Screenshots: `shots/c6/07b_diag_chapters.png`, `shots/c6/10_diag_q*.png`, results `shots/c6/31_diag_results.png`. The child's measured "level" is a measurement error, and every downstream adaptation keys off it.
- **Results are unreachable.** After finishing, any navigation loses the results screen — `/diagnostic` reopens on the intro; there is no results history, no "your level" surface. Server-side the data exists (`useDiagnosticResult(sessionId)`, GET per-session) — the UI just never surfaces it again.
- **Cold-start recommendations ignore the student.** A zero-data account receives `MEDIUM` cards from every subject with no prereq gate and no diagnostic routing (dashboard Continue Learning; the "recommendations offline" hard-fail state on first load, `04_post_signup_first_screen.png`).
- (Prior walk overlap: signup → dashboard skips the 5-step /onboarding tour entirely — [CHILD-LENS][P2 ONBOARDING-ORPHANED].)

**Research principle.** Placement before instruction: new learning anchored to assessed prior knowledge (Ausubel; mastery learning — Kulik, Kulik & Bangert 1990). A mis-placed adaptive system adapts precisely to the wrong level.

**Intervention (buildable).** (a) Drive the diagnostic bank from `board_questions`/enrichment filtered by the signup `class_level` the account already carries — columns `class_level`, `subject`, `chapter` exist and are indexed (`models/enrichment.py:106–121`); keep the static bank only as offline fallback, labeled "offline practice set". (b) Persist + surface results: a `/diagnostic/results/[sessionId]` page reading the existing GET result endpoint, linked from dashboard briefing ("Your level: Fractions — start here"). (c) Cold-start rule: zero-data accounts get "take the 5-minute level-finder" as mission #1, not MEDIUM topic cards.

---

## 3. Cognitive load — 1/2 (partial)

**What works.** `WorkedExampleFading` is a textbook implementation of example fading: Watch it solved → Finish it yourself (steps hidden, reveal one at a time) → On your own (`components/learn/WorkedExample.tsx`, `/api/content/nodes/{id}/scaffold`, 3 authored problems per node). Practice shows one question at a time, 5-question sessions.

**What's missing.**
- **Raw LaTeX in answer options.** MCQ options rendered literally: `$y = 2x + 3$` (transcript `shots/c6/20_diag_wrongA_transcript.txt` Q2). Question stems use KaTeX; option strings bypass it. For an 11-year-old this is extraneous noise layered on intrinsic load; it also guarantees the option text compare in `QuickQuiz.pickOption` (`.trim()` equality) breaks for authored `$…$` answers.
- **Unmetered text walls.** Lesson Overview renders the full authored walkthrough via `AuthoredText` in one scroll; no section gating or progress markers; `learn/[topicId]/page.tsx` has no length handling (prior walk: ELI5 verbatim-duplicates the definition, truncated prereq strings — [CHILD-LENS][P3 LESSON-CHROME-ADULTS]).
- **Timer as threat.** The diagnostic runs a ~3:00 countdown with an alarm glyph at the top of every question for all classes (`shots/c6/10_diag_q05.png`) — pressure with no pedagogical function in a placement test.
- Sign-up aging: a Class 6 account sees Class 12 topics in /learn and a Class 10 graph in /explore (already filed [CHILD-LENS][P1 LEARN-C6-SEES-C12], [P1 EXPLORE-EMPTY-THEN-C10]) — the ultimate age-inappropriate load.

**Research principle.** Cognitive Load Theory (Sweller): worked-example and completion effects reduce extraneous load; segmenting and age-appropriate presentation manage intrinsic load (Mayer).

**Intervention (buildable).** (a) Render options through the same KaTeX path as stems — the practice page already imports `katex` (line 10); factor a `renderOption()` used by QuickQuiz and diagnostic. (b) Gate diagnostic timer off for classes 1–8 (one conditional). (c) Segment lesson Overview into collapsible sections keyed on the corpus's own section headers (marker_parser already parses them server-side).

---

## 4. Retrieval & spacing — 1.5/2 (partial→strong)

**What works.** `/review` is a genuine SM-2 spaced-repetition session: due items from `GET /api/progress/review/queue`, grading via `POST /api/progress/review/answer`, the next interval shown as the card's verdict, honest 10-item session cap (`app/(student)/review/page.tsx` header docs + implementation). Practice is retrieval (no re-reading prompts). The dashboard briefing carries a "REVIEW RADAR" row and the dashboard polls the review queue.

**What's missing.**
- **Spacing never meets practice.** A 5-question practice session is single-topic; the SM-2 queue is a separate place the child must choose to visit. No interleaving of due items into the practice flow, no interleaving across topics within a session (`services/practice_service.py` selects per-topic; `question_selector.py` optimizes information, not variety).
- **Blocked-practice experience.** Successive same-template questions in one topic; the corpus has the material for discriminating-similar-concepts sets but nothing composes them.
- Chapter tests exist (good) but are one-shot events, not resurfaced on a schedule after the first attempt.

**Research principle.** Testing effect (Roediger & Karpicke 2006), distributed practice (Cepeda 2006), interleaving (Rohrer & Taylor 2007): the platform implements the first two in isolated silos; the combination is where durable retention comes from.

**Intervention (buildable).** Splice 2 of every 5 practice questions from the due review queue: `/api/practice/start` gains `includeReview: true`, or the frontend composes the session from both existing endpoints before starting. Zero new models; the review page's card renderer can be reused inline. Mark review items visually ("spaced repeat — you saw this 9 days ago") so the schedule is legible.

---

## 5. Feedback quality — 1.5/2 (partial)

**What works (better than most production apps).** Practice wrong answers surface: authored explanation + correct answer, the node's `common_misconception` ("Common mix-up: …"), authored `remediation` ("How to fix it: …"), and "Revisit" links into `learn/[slug]` (`app/(student)/practice/page.tsx` ~1659–1700, aria-label "Why this went wrong"). Free-text answers get a board-style model answer readout from the authored marking scheme (`POST /api/practice/{id}/submit`) and, on correct answers, the CopyWorthy diff of student vs model. Lesson QuickQuiz: wrong MCQ → MisconceptionPanel + PrereqFixList + retry (`components/learn/QuickQuiz.tsx` 828–880). Chapter test reports per-node breakdown with Story links.

**What's missing.**
- **Diagnostic results feedback is canned and third-person.** "Misconceptions Identified — Linear Equations: *Students often get signs wrong when moving terms across*" (`31_diag_results.png`) — static template copy shown to every child regardless of what they answered; no connection to the child's actual wrong picks, and no action attached other than "Start Remediation".
- **Self-explanation is never requested.** Nowhere does the product ask "why was your answer wrong?" or "which trap did you fall into?" — the feedback tells; the child never explains.
- **Remediation path is an orphan.** The results CTA "Start Remediation" leads to client-side `REMEDIATION_TEMPLATES` (diagnostic page line 503) and, once navigated away, the results and path are unrecoverable (see §2).

**Research principle.** Formative feedback needs feed-up/feed-back/feed-forward (Hattie & Timperley 2007); self-explanation produces measurable gains (Chi et al. 1994).

**Intervention (buildable).** Two additions to the practice/quiz wrong-answer card: (1) one-tap self-explanation — "What happened? A) I misread B) I used the wrong rule C) I guessed" — log choice to the practice submit payload (misconception fields already exist server-side); (2) make the diagnostic results misconceptions personal by rendering the per-question wrong answers' own authored misconceptions (each diagnostic item already maps to a subskill with authored misconception text in the corpus) instead of the static template.

---

## 6. Metacognition — 1/2 (partial)

**What works.** The lesson diagnostic's free-text flow makes the child grade themselves against the authored answer — "I had it right / I missed it", with the honest nudge "Graded against the authored answer — be honest with yourself" (`QuickQuiz.tsx` 700–741). That is real calibration practice. The review session's honest schedule verdict supports accurate self-monitoring.

**What's missing.**
- **No confidence calibration anywhere a child answers.** Grep for confidence/sure-unsure in practice, chapter-test, diagnostic UI: zero hits. Children answer every question with no chance to say "sure"/"unsure" before the reveal, so the product can't distinguish a lucky right answer from a known one — and can't show the child their own miscalibration.
- **No reflection artifacts.** Nothing like "what did I learn today"; session end is points + mastery delta (practice) or a percentage ring (diagnostic). The galaxy metaphor ("stars lit") is the closest thing to a durable learning artifact and it measures visits, not understanding.
- Dashboard deficit framing after effort (mission: "chemistry is trailing at 0%… one focused session moves the needle" while mastery reads 0%) actively mismeasures the child's own progress perception — already filed [CHILD-LENS][P2 DASHBOARD-DEFICIT-MISSION].

**Research principle.** Judgments of learning and calibration training (Dunlosky & Rawson; Zimmerman's SRL cycle): prediction→outcome→feedback loops beat outcome alone.

**Intervention (buildable).** Add a two-button confidence chip ("Not sure yet / I've got this") to the practice question card before submit; send it in the existing `POST /api/practice/{sid}/submit` body; at session end show one calibration line ("2 of your 3 'got this' were right — your confidence meter is honest") and route "sure-but-wrong" items into the review queue (the scheduler accepts the answer post anyway).

---

## 7. Error as learning — 1.5/2 (partial)

**What works.** Wrong answers are mined when the corpus allows: misconception panel, fix-it prereq detour (PrereqFixList pulls the prerequisite chain from the graph API), retry-in-place, and an honest fallback when authors supplied no remediation ("no remediation recipe exists for this question yet" — never invented). The engine also eases difficulty after 2 consecutive wrongs (`practice_service.py` `EASIER_THRESHOLD = 2`).

**What's broken.**
- **The engine can mark a correct answer wrong with no explanation.** In the Class 6 diagnostic, the numeric question `x²−5x+6=0` was answered `2` — a correct root — and graded wrong (`31_diag_results.png`, "Quadratic Equations 0% · 0 of 1 correct"). Strict string equality on free-text answers (the same `===` pattern as `QuickQuiz` MCQ compare) rejects equivalent forms ("2" vs "x=2" vs "2 or 3"). A child punished for a right answer with zero feedback is worse than no diagnostic.
- **Personal errors aren't mined.** Misconception text is per-subskill generic; nothing records *this child's* recurring error type across sessions, so the "Common mix-up" never becomes "YOUR mix-up".
- Difficulty adaptation is invisible to the child (questions quietly get easier) — missed opportunity to normalize struggle.

**Research principle.** Errors are learning opportunities when surfaced, explained, and retried (meta-analytic support for errorful learning with feedback; Kapur's productive failure). Punishing correct-but-unexpected answers teaches learned helplessness.

**Intervention (buildable).** (a) Normalize free-text answers before compare (strip "x=", accept any root of the equation for multi-root items, trim/case-fold, `$…$` strip) — one utility in `lib/`, used by diagnostic grading and QuickQuiz. (b) Persist per-student misconception tallies (table + two endpoints; the practice submit response already carries `misconception`) and render "Your mix-ups this week" on the dashboard.

---

## 8. Motivation — 1/2 (partial)

**What works.** The galaxy metaphor is genuinely motivating and class-scoped ("CLASS 6 UNIVERSE — 0/434 stars lit", `shots/c6/40_galaxy.png`); the owl companion's script is warm and failure-normalizing ("I keep the maps, remember your victories, and never judge a wrong answer"); XP, streak, daily goal, mastery rings give visible state; the briefing honestly narrates zeros ("No streak yet — today starts one").

**What's missing.**
- **Every reward measures attendance or volume, none measures understanding.** Achievement criteria: "Complete your first lesson", "7-day streak", 30-day streak, "answer 10 questions in under 5 seconds each" (Speed Demon — rewards racing) (`services/achievement_service.py`, `init_db.py`). The badge wall also contains duplicates with conflicting definitions (already filed [CHILD-LENS][P2 ACHIEVEMENTS-DUPLICATE-BADGES]).
- **Celebration ≠ understanding.** The practice end screen celebrates "+points" and a mastery arrow; the diagnostic celebrates a ring. Neither ever says what the child can now *do*.
- **No autonomy inside a session** (no choice of mode/difficulty/topic flavor), and relevance framing (real-world uses, board connections) is absent from the loop (see §12).

**Research principle.** Self-Determination Theory (Deci & Ryan): sustained motivation needs autonomy, competence (visible growth in skill), relevance. Rewards for completion undermine the target behavior when the target is learning (mastery orientation, Dweck).

**Intervention (buildable).** Add one mastery-grounded achievement tier computed from data already tracked ("First concept mastered", "5 concepts at mastery — you can now teach them", per-subject "board-ready" badges at ≥80% chapter-test score) and re-skin the session-end screen to lead with the capability ("You can now solve two-step equations") with points demoted to a footnote. Both are template + query work against `progress/mastery`.

---

## 9. Help-seeking protocol — 0.5/2 (weak)

**What works.** Help *is* available on demand: /tutor (Socratic), /solver, in-lesson worked examples with step reveal, the hint affordances inside sims. The owl frames asking as safe.

**What's missing — the protocol.** Nothing detects being stuck and nothing intervenes:
- `consecutive_wrong` only re-selects easier questions (`practice_service.py` 377–383); the child sees no hint offer, no worked example, no tutor hand-off — just an easier next question.
- No frustration/stuck detection is wired anywhere: the 4D student-state model with `frustration_level` and strategy hints like `low_mastery_high_frustration -> support_and_scaffold` exists only as an unshipped code-generator draft (`services/_gen_state.py` — a script that generates a service; no router imports it).
- Parent alerts fire on `streak_broken` / `low_mastery` after the fact (`api/dashboard.py` 937–945) — no in-session escalation path, and nothing tells the child *how* to get help.

**Research principle.** Adaptive help-seeking: effective ITSs budget help and prompt it after failure patterns (Aleven, Roll & Koedinger); un-requested help at the moment of repeated failure is the difference between productive and unproductive struggle.

**Intervention (buildable).** A "Stuck?" card in the practice/quiz wrong-answer state after 2 consecutive misses, with three buttons that all already exist: "See a hint" (`/api/content/nodes/{id}/scaffold` steps), "Watch it solved" (`WorkedExampleFading` stage 1), "Ask the tutor" (`/tutor?topic={nodeId}` — deep-link param already accepted). Frontend-only for v1; backend just needs the consecutive-wrong count in the session payload it already returns.

---

## 10. Transfer — 0.5/2 (weak)

**What works.** Sims gesture at the world: Circuit Lab as "Today's Experiment", scenario copy like "explain to your grandmother how to use a UPI payment app" inside sim missions (`components/sims_v2/`). The galaxy owl frames learning as an exploration.

**What's missing.**
- No teach-someone mission anywhere: no child-facing artifact ("explain photosynthesis to your parent, then mark what they got wrong"), no parent-side acknowledgment loop even though the parent portal already renders the child's attempts (`app/parent-dashboard/page.tsx`).
- No off-screen tasks: nothing sends a child to their kitchen/notebook; practice is 100% in-app tapping.
- Sims are a separate destination ("Start exploring" → /sims-v2) disconnected from the lesson/practice loop — the transfer moment after a lesson doesn't exist.

**Research principle.** Transfer-appropriate processing and learning-by-teaching (Fiorella & Mayer 2013): explaining to another person produces deeper structure than restudying; proximal real-world application cements retention.

**Intervention (buildable).** End-of-chapter "Teach it" card: 3 authored prompts from the node's `examples`/`eli5` fields, a self-check list ("Could they answer your 3 questions?"), and a "marked as taught" flag posting to the existing progress/activity endpoint so it appears in the child's streak and the parent's digest. One component + one boolean column.

---

## 11. Language of learning — 1/2 (partial)

**What works.** Two registers are excellent: the galaxy owl ("Sleep consolidates whatever we learn now — free overnight revision, courtesy of your brain") and the lesson worked-example stages ("Watch it solved / Finish it yourself / On your own"). Practice feedback says "Not quite — let's learn this together!"

**What's broken.** The machinery nouns leak everywhere a child looks:
- "Take your **first diagnostic**", "**Start Diagnostic**", "Subskill: Linear Equations", "Your **Remediation** Path", "**Start Remediation**", tabs "**Diagnostics / Remediation / Scope**", "Recommended next **nodes** from your live progress", "0 of 379 **tracked nodes** mastered", "Powered by the official Atlas syllabus graph — 9,099 **nodes**, tracked honestly", difficulty chip "**MEDIUM**", the literal checkbox glyph "**✅ Available offline**" under "Ready?" on the diagnostic intro (`shots/c6/06_diagnostic_intro.png`), "0% **% mastery**" (double %), and `[math]` placeholder strings in results ("Solve for [math]: [math]…", `31_diag_results.txt`).
- None of these are translated for the 6th-grader they are shown to; several are production string bugs, not just style (%% duplication, [math]).

**Research principle.** Learner-centered language: interface copy should name the learner's action and object, not the system's data model; unreadable copy raises extraneous load and excludes younger users (readability/audience-adaptation effects).

**Intervention (buildable).** One copy pass over ~20 high-traffic strings into child voice: diagnostic→"level-finder"/"find my level", mastery→"stars"/"strength", remediation→"fix-it plan", nodes→"topics", "Available offline"→delete. Fix `%%`, `[math]`, and lowercase "civics" while in there. All strings are centralized (diagnostic `STRINGS`/i18n objects at diagnostic/page.tsx 101–219, briefing strings in CommandBriefing) — an afternoon of edits.

---

## 12. Board relevance — 1/2 (partial)

**What works.** The account is board-aware ("CLASS 6 · CBSE" in the briefing); exam-prep serves full CBSE-pattern papers for classes 10 and 12 with honest empty states for others; chapter tests are drawn from the 147k-question `board_questions` bank; the study plan references real board timelines ("CBSE board papers typically begin mid-February").

**What's missing.**
- **Provenance never reaches the child.** `board_questions` carries `year` ("for past papers", `models/enrichment.py:134`) and per-question marks — but no practice/lesson UI shows "CBSE 2019 · 3 marks" on a question or "this topic appeared in 4 of the last 5 years". The single strongest relevance signal the dataset supports is unexposed.
- **The lesson's "exam" tab was relabeled "Diagnostics"** (`learn/[topicId]/page.tsx` 584) — there is no board view on any lesson page for any class.
- Sub-10 classes get no exam framing at all (and exam-prep silently maps every sub-10 class to Class 10 papers — [CHILD-LENS][P2 EXAM-PREP-SILENT-CLASS-MAP]).

**Research principle.** Perceived utility drives effort (Eccles & Wigfield expectancy-value); exam washback can be harnessed honestly by showing where school learning shows up in the real exam.

**Intervention (buildable).** (a) When a served practice/chapter-test question's source row has `year`/marks, render a provenance chip ("CBSE 2023 · 3 marks") — the join is already made server-side by the question selector; add two fields to the responses. (b) Restore a real "Board" tab on lessons: per-topic board-question counts by year (a GROUP BY over `node_tags`/chapter that `board_questions` already supports) with links into chapter-test.

---

## Production defects found during this audit (details in BUGS.md → `## PEDAGOGY-AUDIT`)

- **[P0] Both backends hung → full API outage** during the audit (startup deadlock after MiniLM load; health flapping; `docker exec` unresponsive). The audit's remaining live walks (c9/c12) were blocked by this.
- **[P1] `/api/content/enrichment` 502s in production** (list + search variants) — the /learn Knowledge Graph browse is dead ("API error 500 / 0 topics available", `shots/c6/50_learn_list.png`).
- **[P1] Class-blind diagnostic bank** (quadratics/slope served to Class 6; hardcoded chapter chips) + **correct quadratic root graded wrong**.
- **[P2] Diagnostic results vanish** after navigation; remediation path orphaned with it.
- **[P2] String/render defects:** "20% % mastery", `[math]` placeholders, raw `$…$` LaTeX in options, generic "Signup failed. Please try again." masking server-side email-domain validation errors.
- **[P3] Fresh-user dashboard first-paint hard-fails** two sections ("Recommendations are offline right now / Weekly activity is offline right now") before recovering on reload — the app's opening move is an error message.

## The 5 highest-impact missing interventions (learning impact ÷ build effort, ranked)

1. **Class-aware placement, end to end** (§2): diagnostic items from `board_questions` filtered by the account's class; durable results page by sessionId; cold-start mission = the level-finder. Fixes the audit's worst finding (C6 scored on C10 algebra) and every adaptation downstream of it. *Medium effort, foundational.*
2. **"Stuck?" protocol after 2 consecutive wrongs** (§9): inline hint → worked example → tutor hand-off, all existing endpoints/components. *Low effort, high marginal learning gain per stuck moment.*
3. **Confidence chip + self-explanation tap** (§6, §5): sure/unsure before submit; "which trap was it?" after a wrong MCQ; calibration line at session end. *Low effort; builds the metacognitive loop the platform entirely lacks.*
4. **Interleave the SM-2 queue into practice** (§4): 2 of 5 questions from due reviews, visibly labeled. *Low effort; converts two silos into one spacing engine.*
5. **Child-language + render fix pass** (§11, §3): ~20 strings to child voice, fix %%/[math]/LaTeX-in-options, drop the diagnostic timer under class 9. *Lowest effort; removes the "this isn't for me / this is broken" reaction at every step.*

*Next tier (report only): board-year provenance chips (§12), teach-it transfer missions (§10), mastery-grounded achievements and capability-led celebration screens (§8), lesson objective briefs (§1).*
