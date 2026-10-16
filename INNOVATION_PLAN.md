# Atlas Innovation Plan — 2026
### RES-1 Research & Innovation Report · October 2026
**Thesis: Atlas is the anti-Gauth.** The photo-solve incumbents (Gauth, Question.AI, Doubtnut) win the *doubt* and lose the *learning* — and 2025–26 research now proves that trade costs real marks. Atlas owns the only architecture in the Indian market where the answer is verified before it is shown and the learning continues after it is shown. Every feature below converts that architectural accident into a product moat.

---

## 1. What the world's best actually do (mechanics, not marketing)

| Product | What the adaptivity actually is | The mechanic Atlas should steal |
|---|---|---|
| **Khanmigo** (Khan Academy) | LLM wrapped in a purpose-built tutoring architecture that enforces Socratic behavior: never hands out answers, offers hints and follow-up questions, one reasoning step at a time; teacher oversight dashboards; K-12 safety guardrails. Recent academic work (TEAS framework, OpenReview) attributes its success to *architecture*, not model choice — "architecture is key (DiCerbo 2025)." | **Decision/wording separation and answer-withholding as an architectural property, not a prompt.** Atlas already has this (`deterministic_orchestrator` + `claude_renderer`, PCR mastery gates) — but doesn't *market* it. |
| **Squirrel AI** (China) | Splits curriculum into "nano-level" knowledge atoms (claims ~30k for middle-school maths; treat as company claims), links them in a prerequisite knowledge graph, and on a wrong answer **traces back through the graph to the root knowledge gap**, not the surface error. MCM profiles students on Mode-of-Thinking / Capability / Method; MIBA builds an *error-cause reconstructed* personal knowledge map. | **Error-cause tracing to root gaps.** Atlas's `misconception_catalog` + DINA engine do this deterministically — but only the *teacher* sees it (teacher-misconceptions page). Squirrel's insight is diagnosis; Atlas's upgrade is making the diagnosis the child's own visible possession. |
| **ALEKS** (McGraw Hill) | Knowledge Space Theory (Falmagne & Doignon): a ~25–35 question adaptive probe narrows the student's feasible knowledge state; students may only learn topics whose prerequisites are met ("ready to learn" fringe); periodic knowledge checks re-verify mastery. | **Only serve what is ready.** Atlas's `kst_path_selector` already targets ~80% predicted success — the same idea. ALEKS wraps it in a *readiness contract* the student understands. Atlas should surface readiness, not just obey it. |
| **MATHia / Cognitive Tutor** (Carnegie Learning) | Model tracing: each student solution step is matched against a cognitive model of expert problem-solving; just-in-time contextual hints and per-step feedback; LiveHint AI extends hints conversationally. IES What Works Clearinghouse lists it as research-based. | **Per-step, in-the-moment intervention.** Atlas's `hint_ladder` (4 rungs, XP costs) is the same DNA. The steal: intervene at the *step where the model diverges*, not after the final answer. |
| **Duolingo** (2025–26) | Birdbrain model serves items at the *edge* of ability. May 2025: hearts → **energy** (25/day free; mixed reception — users felt throttled). **Video Call** (AI conversation) drove retention to an all-time-high **84%**; Max tier (Video Call, roleplay, explain-my-answer) ≈ **9% of subscribers** with bookings doubling. Power-user critique: AI features "killed the soul" of the app. | **Voice conversation is the single biggest engagement unlock of 2025.** And the energy backlash is a warning Atlas's emotional-safety contract should weaponize: *never throttle learning*. |
| **Photomath / Socratic** | Camera-first scan → step-by-step; freemium progressive disclosure (free = answer, Pro = reasoning); Socratic curates concept links. For Indian students the killer use case is **instant doubt resolution at 11 PM** before boards. | **The 11 PM moment is the market.** Nobody owns what happens *after* the answer. |
| **Gauth / Question.AI** (ByteDance) | Free, multi-subject, photo → step-by-step; TikTok-native distribution. 2025 criticism: a cheating epidemic ("the worst I've seen in my entire career" — veteran teacher, KRON4); ~3 in 4 students report AI-adjacent cheating in a single month; **accuracy failures — different answers to the same problem**; schools rewriting homework policy in response. | **Their weakness is Atlas's positioning:** unverified answers at scale. Atlas's `answer_pipeline` returns exactly five truth labels (VERIFIED / VERIFIED_WITH_ASSUMPTIONS / VERIFIED_OFFICIAL / AMBIGUOUS / GUIDED_PRACTICE) and *withholds* when it can't verify. That is now a marketable superpower. |
| **OpenAI Study Mode** (Jul 2025) | Socratic questioning + quizzes instead of answers; accepts uploaded past exams. Signal: even the biggest labs conceded that answer-dumping doesn't retain users. | **Socratic-first is now table stakes; verified Socratic-first is not.** |

## 2. What Indian users complain about (the churn map)

- **Post-exam churn is structural:** industry analysis of PW, Vedantu, Doubtnut, Unacademy, Allen notes *"students complete exams and immediately churn; no product mechanism for retention"* (BYJU'S master dossier, Scribd). The batch/lecture model has no loop between doubt and mastery.
- **Batch-level doubt resolution is a persistent complaint** (Quora threads on PW batches like Prayas/Yakeen: doubts get lost in thousands-strong live classes). Doubt UX is the acquisition surface; doubt *closure* is the retention surface — and it doesn't exist.
- **PW's own complaint boards** (Voxya, G2) cluster on logistics and content delivery, not learning outcomes — meaning no competitor is even *rated* on whether learning happened.
- **Doubtnut's entire product is OCR doubt utility** — one-shot, no memory of your doubt, no follow-up. It acquires and forgets.
- **Parents are the buyers but are blind** between tests; every big app's parent surface is a marks dashboard, which conflicts with what actually retains a stressed teenager.

## 3. The 2024–2026 science base (what changed)

1. **The Harvard AI-tutor RCT (Kestin et al., *Scientific Reports*, June 2025; n=194):** a custom AI tutor with pedagogical guardrails — prompting students to reason *before* revealing answers — produced **more than 2× the learning gains of Harvard's active-learning classroom, in ~18% less time**. The gains came from the guardrails, not the model. This is the single most important citation for Atlas: it validates *exactly* the PCR-gated, think-first architecture Atlas already runs.
2. **The counterfactual — MIT "Your Brain on ChatGPT" (June 2025):** EEG-monitored LLM users showed the **lowest brain engagement, weakest memory of their own work, and accumulating "cognitive debt."** Copy-paste answers literally cost neural effort. This is the evidence that Gauth-style UX *harms* the student — the public-health argument for Atlas.
3. **Pretesting / errorful generation (Pan et al.; 2025 modeling work):** guessing *before* learning — even wrongly — substantially enhances memory, because **prediction-making is the mechanism** of the testing effect. Telling learners this ("wrong guesses grow memory") **amplifies the effect** (metacognitive awareness). Pretests help most when subsequent instruction is weak — i.e., they compensate for exactly the teaching-quality variance in Indian classrooms.
4. **Hypercorrection effect (2025 replications):** the errors students hold with **highest confidence are the ones most likely to be permanently corrected** after feedback — surprise mediates it. But high-confidence errors **can return after long delays** — correction must be *spaced* or it decays. Atlas's review engine (doubling intervals) is the cure; doubts and confident errors are the highest-yield targets.
5. **Doer effect (~20 studies, 2026 synthesis):** active generation + AI-graded quizzing beats reading, consistently. And a 2025 benchmark of "pedagogical safety" in AI tutors (arXiv, Sep 2026) confirms RCT-grade AI tutors now *match or beat* active-learning baselines — but only the guardrailed ones.
6. **Duolingo's energy backlash (2025)** is the engagement caution: gating *effort* (hearts) and even gating *time* (energy) reads as punishment. Atlas's streak-freeze philosophy — never punish a slip — is now evidenced, not just ethical.

**Strategy consequence:** the science says the winning loop is *predict → generate → be surprised → correct → space*. Atlas is the only Indian product whose engines already implement every stage. The plan below just makes students *feel* it.

---

## 4. Ten features, ranked

**Scoring:** Learning impact (1–5) × Buildability on existing engines (1–5) × Differentiation (1–5). Build sizes: S ≤ 1 dev-week, M ≤ 3 dev-weeks, L > 3.

| Rank | Feature | Impact | Build | Diff | Total | Size |
|---|---|---|---|---|---|---|
| 1 | Doubt-to-Mission converter | 5 | 5 | 5 | **15** | S/M |
| 2 | Anti-Gauth reveal (PCR-gated photo-solve) | 5 | 4 | 5 | **14** | M |
| 3 | Teach-It-Back ("Main sikhata hoon") | 5 | 4 | 5 | **14** | M |
| 4 | Guess-First hooks | 4 | 5 | 4 | **13** | S |
| 5 | Trap Jungle (misconception family tree) | 4 | 4 | 5 | **13** | M |
| 6 | Bolo: voice-first tutor sessions | 4 | 3 | 5 | **12** | M/L |
| 7 | Board Barometer (exam-readiness forecast) | 4 | 4 | 4 | **12** | M |
| 8 | Dinner-Table WhatsApp card for parents | 3 | 5 | 4 | **12** | S/M |
| 9 | Sarthi: agentic revision planner | 4 | 3 | 4 | **11** | M |
| 10 | Interleaved boss battles + visible mastery deltas | 3 | 5 | 3 | **11** | S/M |

---

### #1 — Doubt-to-Mission converter · **S/M** (15/15)
**What it is.** Every doubt that enters Atlas — photo, typed, or spoken — ends not at the answer but at a *staged mission*. When the answer resolves to a corpus node, Atlas silently opens that node's journey at PROBE, schedules the spaced re-probe, and injects a 3-item micro-mission into the next day's quest: *"Last night's doubt, finished properly — 3 minutes."* One auto-mission per day, one-tap dismiss (emotional safety: it's an invitation, never a debt).

**Why it wins.** The 11 PM doubt is the entire Indian market (Photomath/Doubtnut evidence), and every incumbent ends at the answer — Doubtnut has *no memory* of your doubt. Yet a doubt is the highest-value learning event a student ever generates: it is, definitionally, a confident error, and the **hypercorrection effect (2025)** says confident errors are the ones most permanently fixable by feedback — with the caveat that they **return unless re-probed at spacing**, which is precisely what the mission schedules. It also attacks the documented Indian churn cliff ("no product mechanism for retention" after the exam moment): the doubt becomes a loop, not a transaction.

**Engine mapping (all exists).**
- `its/routing/routing_service_semantic.py` — doubt → node (class-aware; only auto-mission above the routing confidence threshold; AMBIGUOUS-labeled doubts don't spawn missions).
- `its/solver/answer_pipeline.py` — truth label decides mission framing: VERIFIED → "never ask this again" mission; GUIDED_PRACTICE → mission = finish the guided path.
- `its/solver/misconception_catalog.py` — if the student's attempt hit a catalog misconception, the mission's first item is that family's remediation item.
- `modules/journey/engine.py` — open `JourneyState` row at PROBE with `INITIAL_P=0.3`; the existing row-locked write path makes concurrent doubt+mission writes safe.
- `modules/review/engine.py` — `review_schedule` row on that node (doubts enter the 1→2→4→8→16-day ladder).
- `its/engagement/quest_service.py` — `DailyQuest` gains one `QuestItem(kind="doubt_closure")`, deterministic per (student, day) like existing items.
- Frontend: `components/solve/VerifiedAnswerCard.tsx` gets the closing line: **"You're one probe away from never asking this again."**

**Risk.** Mission spam → hard cap 1/day + dismiss; node-confidence gate keeps junk missions at zero. Telemetry: `its_attempt_log` already records the attempt; add `mission_source="doubt"` to measure the funnel.

---

### #2 — Anti-Gauth reveal: PCR-gated photo-solve · **M** (14)
**What it is.** Photo doubts still get verified answers — but the *reveal* is gated by the student's own mastery of the matched node (PCR, which already exists): `p_known < 0.4` → hint ladder only, no answer; `0.4–0.7` → prerequisite refresher + guided steps with the last step blank; `> 0.7` → full verified solution + the assumptions audit card. A student can always earn the reveal by showing an attempt ("I've tried — here's my work"), graded on the spot by `examiner_mode` against the corpus's authored marking points. The answer is never paywalled; it is *effort-gated*.

**Why it wins.** This is the Harvard Kestin RCT turned into UX: gains doubled **because** the tutor forced reasoning before revealing. It is also the MIT cognitive-debt finding inverted: every forced attempt is measurable brain engagement Gauth never asks for. And it is the differentiation wedge, verbatim from 2025 coverage: Gauth gives *different answers to the same problem*; schools call it a cheating epidemic. Atlas's five truth labels and `independent_verifier` mean Atlas can literally print its audit trail on the answer card. "Verified twice, or we tell you we don't know" is a slogan no competitor can copy without rebuilding their stack.

**Engine mapping.**
- `services/photo_input.py` + `services/vision_extract.py` — unchanged ingestion.
- `its/solver/answer_pipeline.py` — lanes A–D + truth labels unchanged; add a *reveal policy* stage that reads `p_known`.
- `p_known` source: `modules/journey/engine.py` (persisted `bkt_p`) via `services/mastery_sync.py` `BKTModel` — one mastery math, as designed.
- `services/hint_ladder.py` — the 4 rungs (NUDGE → FORMULA → …) with XP costs already implement effort-pricing; rung 4 = guided steps with blanks, powered by `services/worked_examples.py` fading.
- `services/examiner_mode.py` — "I've tried" path: grade attempt vs authored `MARKING_POINTS`/`DIAGNOSTIC_ANSWER_N`, return the CopyWorthy diff; a real attempt unlocks the full solution.
- `its/tutoring/socratic_engine_pcr.py` — the mastery-band policy already specified (<0.4 hints only, 0.4–0.7 prerequisite-first, >0.7 reveal) — this feature is *wiring it into the photo surface*.
- Frontend: `components/tutor/HintLadder.tsx`, `VerdictCard.tsx`, `AskResponseCard.tsx`, `components/solve/VerifiedAnswerCard.tsx` all exist; add the assumptions-audit expandable.

**Risk.** Students who want the raw answer bounce to Gauth. Mitigation: the "I've tried" gate is generous (any photographed attempt counts; grader is encouraging, never red), and the attempt-rate is the metric to watch in the A/B (`rule_ab_tester.py`). Never gate on *correctness* — only on *evidence of trying* (emotional-safety contract).

---

### #3 — Teach-It-Back ("Main sikhata hoon") · **M** (14)
**What it is.** After a TEACH phase (or on any MASTERED node), the student switches seats: they explain the concept in their own words — typed or spoken — and Atlas *grades their teaching*: a coverage map against the node's authored marking points ("You covered 2 of 4 points. Rani missed one: …"), then exactly one Socratic question aimed at the missed point. Framed as a Teaching Score out of stars, never marks; the mascot celebrates what they covered.

**Why it wins.** Generation + self-explanation are the most replicated effects in the literature, and the Kestin RCT's guardrails are precisely "make the student produce the language." The grading loop is the differentiator: Khanmigo *asks* Socratic questions but never *grades the student's own explanation against an authored key*, because it has no corpus. Atlas has **14,236 CBSE + 9,431 CISCE authored files whose answer keys are already parsed into marking points** by `examiner_mode.py`. Deterministic, non-LLM grading of open prose is a capability no Indian competitor and few global ones possess. It also generates the substance for #8 (parent card: "ask them to teach you photosynthesis tonight").

**Engine mapping.**
- Content side: `services/examiner_mode.py` marking-point extraction (COMPETENCY_QUESTION/CISCE_BOARD `MARKING_POINTS`, CBSE `DIAGNOSTIC_ANSWER_N`) — reused **in reverse**: coverage of points = quality of teaching.
- Matching side: `services/cross_encoder_grader.py` for semantic point-coverage (booleans only — *decision*, not wording), `services/answer_evaluator_v3.py` for keyword-exact hits, `services/llm_grader.py` only to emit the coverage decision, `claude_renderer` to word it (decision/wording separation preserved — the LLM never computes).
- Voice: `services/tutor_voice.py` phrase-matcher (80k authored phrasings across ~4.7k nodes) classifies the explanation's intent; `its/orator/tts.py` speaks the feedback with teaching-aware chunking.
- Follow-up: `its/tutoring/socratic_state_machine.py` fires the single missed-point question; a good answer promotes the journey (`PROMOTE_P=0.75`), a poor one schedules the point into `modules/review/engine.py`.
- Frontend: `components/tutor/TeachCard.tsx` already exists as the surface — this feature gives it its grader.

**Risk.** Prose-grading false positives → coverage booleans are confidence-gated; below threshold the engine falls back to a check question rather than a verdict. Language: launch English-medium first (Hindi content waves are parked by owner decision) with a hi-IN voice readout.

---

### #4 — Guess-First hooks · **S** (13)
**What it is.** Every new topic opens with a 10-second, no-stakes prediction — one tap on an MCQ, slider, or doodle — *before* any teaching. The reveal line is always curious, never red: "You guessed B. Your brain was halfway there — here's the part nobody guesses." Every hook also carries the awareness line the research says doubles the effect: **"Wrong guesses make memory stronger."**

**Why it wins.** The pretesting effect: errorful prediction before instruction enhances memory, works through the *act of predicting*, and is amplified when learners are told it works (Pan et al.). It compensates most where instruction is weakest — a direct answer to Indian teaching-quality variance. And it is free: the journey's PROBE state already asks a diagnostic-grade question first. This feature is a *reframe*, which is why it's ranked #4 on score: the highest evidence-per-rupee build on the list.

**Engine mapping.**
- `modules/journey/engine.py` PROBE state — exists verbatim; add a `pretest` framing flag and a curiosity template per misconception family in `misconception_catalog.py`.
- `modules/learning/router.py` `/api/learning/hook` — already returns the hook payload; attach the guess widget + `DoodleCard`/`sims_v2` visual.
- `its/diagnosis/state_4d_builder.py` — confidence signal on the guess feeds the affective dimension (a confident wrong guess is a hypercorrection target — tag it for the TEACH reveal).
- `its/engagement/quest_service.py` — composer rule: every session opens with a guess (guarantees "no two consecutive sessions of identical shape", P3.3's acceptance).

**Risk.** Emotional safety: a wrong guess must never render as an X. Copy review against the safety contract is the only gate.

---

### #5 — Trap Jungle: the misconception family tree the child owns · **M** (13)
**What it is.** A child-facing world where the 20 misconception families are "trap creatures" living in a jungle map. Traps the *child has personally hit and conquered* (journey REMEDIATE completions) are shown tamed — with the date and the doubt that spawned them. Prerequisite links are drawn: "the Traps behind this trap." Untamed traps show, in one line, the exact future error they cause. The teacher page (`teacher-misconceptions`) already exists; this is the same data wearing the child's clothes.

**Why it wins.** Squirrel AI built error-cause reconstruction and pointed it at teachers; nobody has ever given the *child* a visible, ownable map of their own error lineage. It converts remediation (the most stigmatizing moment in edtech) into collection mechanics — while the emotional-safety contract holds because there are no marks, no ranks, only "tamed/roaming". The hypercorrection evidence says confident traps are the best targets; the visible tree makes the child *want* to target them.

**Engine mapping.**
- `its/solver/misconception_catalog.py` — the 20-family deterministic catalog is the jungle's species list; each family gets art + one-line "future error" copy.
- Misconception lanes in `its/tutoring/spiral_service.py` and `socratic_pipeline_integrated.py` — already produce the capture events; write `trap_captured` to `its_attempt_log` context.
- `modules/journey/engine.py` — REMEDIATE→passed = "tamed"; `MASTERED` re-probe lapse = trap "roams again" (honest — the science says errors return; the jungle *shows* it).
- `services/mastery_passport.py` — "traps conquered" already computed; the jungle is its spatial rendering.
- `its/agents/meta_brain.py` — nightly misconception discovery grows the species list behind flags.
- Frontend: new page under `app/my-world/`, art direction consistent with `components/gamification` + VidyaMascot as guide; reuse `topic-map`/`world` map primitives.

**Risk.** 20 families is thin against 23k+ files — launch with the families that have real capture volume (telemetry tells us which), and let Meta-Brain grow the list. Art cost is the main budget line; use the mascot + procedural layout before commissioning creatures.

---

### #6 — Bolo: voice-first tutor sessions · **M/L** (12)
**What it is.** Complete P4.1: every tutor session narratable over WebSocket with teaching-aware chunking (the Orator already waits during PROBE phases — a property no TTS bolt-on has), in en-IN and hi-IN. Phase 2 adds push-to-talk voice input; the student *speaks* answers and doubts.

**Why it wins.** Duolingo's Video Call is the best-evidenced engagement launch of 2025–26: **84% all-time-high retention**, Max at ~9% of subscribers with bookings doubling — voice conversation, not gamification, moved the number. For India the fit is stronger: voice suits younger students, low typing fluency, and Hindi-medium learners; 2026 trend scans converge on voice + multimodal as *the* tutoring interface; and no Indian competitor has a voice tutor grounded in verified content — Khanmigo doesn't ship Indian-language voice at all.

**Engine mapping.**
- `its/orator/tts.py` — built: teaching-aware chunking, unit emphasis, deterministic cache keys, edge-tts adapter + offline stub. Remaining: REST/WS endpoint + frontend playback (the exact P4.1 remainder).
- WS protocol (mounted today as `its_start` / `its_input` / `its_report`): add `{type:"audio_out", cache_key, phase}` server frames keyed to state-machine phases (PROBE frames pause for the student's answer — the chunker already knows phase boundaries), and `{type:"audio_in"}` for push-to-talk. REST fallback: `GET /api/tutor/its/audio?cache_key=` hits the deterministic TTS cache.
- `services/tutor_voice.py` — intent classification over the tutor-brain corpus keeps spoken replies deterministic-templated; `claude_renderer` words them. The LLM still never computes.
- `its/diagnosis/state_4d_builder.py` — hesitation/pause signals from voice timing enrich the affective dimension (frustration → sim/debate switch is P3.3's existing rule).

**Risk.** STT accuracy on Indian accents and code-mixed Hinglish is the genuinely hard part — **de-risk by shipping playback-only first** (half the value, zero STT risk), then push-to-talk for structured answers (MCQ letters, numbers) before free speech. TTS cost is bounded by the existing deterministic cache.

---

### #7 — Board Barometer: exam-readiness forecast · **M** (12)
**What it is.** A weekly, private, per-subject forecast: "If the board were today: 74–82%. Do these 5 ready topics → 78–86%." The five are the KST-ready nodes with the highest marginal band impact; one tap composes the matching mock from 253,456 board questions and grades it examiner-style with the CopyWorthy diff.

**Why it wins.** It attacks the documented churn cliff ("churn immediately after exams; no retention mechanism") by giving the *outcome* a live, moving number — parents buy outcomes, students need agency. ALEKS's 30-year-old lesson applies: readiness-limited study feels honest because it *is* — Atlas's `kst_path_selector` targets ~80% predicted success, so every recommended node is a probable win, which the emotional-safety contract requires. No Indian app converts a mastery engine into a *forecast*; they all show last week's marks.

**Engine mapping.**
- `services/mastery_passport.py` — already assembles per-subject mastery bars + an exam-readiness score from existing tables; the barometer is its weekly, forecast-shaped rendering.
- `its/diagnosis/knowledge_tracing.py` + `modules/journey/engine.py` (`bkt_p`) — the mastery surface; MASTERED counts feed the band.
- `its/diagnosis/kst_path_selector.py` — the "do these next" fringe, ranked by band-delta (information-weighted: `question_selector.irt_information` already computes item information).
- `services/paper_generator.py` + `paper_mode_service.py` + `board_questions` (253,456 rows, 115 combos) — the mock; `services/examiner_mode.py` the grading.
- `services/display_scrub.py` — enforce zero node-ids in the forecast copy.

**Risk.** Band calibration is a trust product: publish intervals, back-test against past board papers before launch, and never show ranks or class comparisons (private to child + linked parent).

---

### #8 — Dinner-Table WhatsApp card · **S/M** (12)
**What it is.** One WhatsApp per week, per linked parent, in Hinglish, auto-composed from the child's real week: one trap conquered (celebration), one mission coming up (specific), and one question the parent can ask at dinner ("Ask them *why* the sky is blue — they can teach you now 🌟"). Enforced copy rules: no marks, no ranks, no red, no comparison to other children.

**Why it wins.** Parents are the payers in Indian edtech and are structurally blind between tests — every incumbent's parent surface is a marks dashboard that adolescents experience as surveillance. This is the first parent surface built on the *emotional-safety contract*, and it has real substance to report because #3 (Teach-It-Back) and #5 (Trap Jungle) generate genuine stories. WhatsApp is where Indian parents already are — `whatsapp_service.py` already supports Meta Cloud + Twilio with offline-capable queues.

**Engine mapping.**
- `services/whatsapp_service.py` — transport, templates, webhooks (exists).
- `services/misconception_analytics.py` + `its/diagnosis/state_4d_builder.py` (temporal) — the weekly digest facts.
- `services/mastery_passport.py` — celebration + mission selection.
- `services/display_scrub.py` — the copy firewall (no ids, no marks).
- Auth: send only to the OTP-verified linked parent (`services/auth_service.py`).

**Risk.** Message fatigue and privacy: one message/week hard cap; parental opt-in at onboarding; a "pause briefs" reply keyword.

---

### #9 — Sarthi: the agentic revision planner · **M** (11)
**What it is.** The student names an exam and a date (board, JEE/NEET, or Friday's class test). Sarthi plans the countdown from live data — journey states, review due-loads, KST readiness, check-up recipes — and *re-plans every night*: miss a day and the plan compresses instead of scolding (the streak-freeze philosophy applied to planning). Every plan item is executable in one tap because it *is* a DailyQuest.

**Why it wins.** Agentic planning is the confirmed 2026 shift (OpenAI Study Mode accepts past papers; agentic-tutor literature = plan/personalize/retrieve/assess). Indian students juggle school + coaching + self-study, and every static timetable (PW-style schedules) breaks the first missed day and then punishes. The differentiation is architectural: because plans are constrained by deterministic engines (only KST-ready nodes, capped review load, IRT-targeted items), Sarthi can be agentic *and auditable* — no LLM ever decides *what* to study, only how to phrase it.

**Engine mapping.**
- `services/learnpath.py` + `routers/learnpath.py` — path composition (exists).
- `services/next_best_lesson.py`, `its/diagnosis/kst_path_selector.py`, `modules/review/engine.py` due-load — the constraints.
- `its/engagement/quest_service.py` — plans compile to `DailyQuest`s (the executable unit exists).
- `its/agents/meta_brain.py` nightly cron (README P1.6) — the re-plan trigger; proposals ship behind A/B flags (`services/rule_ab_tester.py`).
- `services/readiness.py` + `services/exam_service.py` — exam dates and countdown state.

**The nightly loop, concretely.** At 02:00 the cron runs one pure function per student: **inputs** = exam date + daily-minutes budget, all `JourneyState` rows (`bkt_p`, state), `review_schedule` due counts for the next 72h, the KST fringe (ready nodes, ~80% predicted success), and the class's check-up recipe cadence. **Constraints (hard, deterministic):** every over-due review is served within 48h (spacing is non-negotiable); new-topic slots draw only from the KST fringe ranked by board-weight × band-delta; daily minutes never exceeded; ≥1 slot/week is a boss or Teach-It-Back (generation). **Output:** the next 7 `DailyQuest`s, each item carrying a one-line audit string ("review: lapse risk 2 days overdue", "new: ready now, board-weight high", "challenge: theta+1"). Missed yesterday → the allocator compresses *new* topics first and never drops reviews — the replan absorbs slips instead of punishing them. The LLM appears nowhere in the loop; `claude_renderer` only words the nightly summary message.

**Risk.** Agentic overreach is a trust risk — plans are proposals with a visible "why this?" audit line per item; the deterministic constraint set keeps worst cases boring.

---

### #10 — Interleaved boss battles + visible mastery deltas · **S/M** (11)
**What it is.** Two completions of planned Phase-3 items. (a) The weekly boss (already seeded per student+week) becomes an *interleaving gauntlet* with a fixed recipe: **60%** items from topics touched this week (shuffled across topics — never two from the same node consecutively), **25%** look-alike pairs drawn from the student's own captured misconception families (the discrimination moment: same-looking problem, different family), **15%** spaced re-probes of MASTERED nodes (the honest "errors return" check). The boss's HP is literally the student's aggregate `bkt_p` over the week's nodes, so "damaging the boss" = *demonstrating* mastery, and a lost boss auto-stages a comeback session (P3.7) rather than a wall. (b) Session end prints the BKT delta: **"+12% Quadratic Equations"** — progress made visible without leaderboards.

**Why it wins.** Interleaving is top-tier utility in the Dunlosky et al. review, and quest_service already IRT-filters items to a 70–85% predicted-success band (Birdbrain's edge-of-ability trick, already ours). Visible deltas are the emotionally-safe substitute for rank movement — the child sees *their own* line go up, which is the only comparison the safety contract allows.

**Engine mapping.** `its/engagement/quest_service.py` boss composer; `services/question_selector.py` (IRT expected-gain selection exists); `modules/journey/engine.py` persisted `bkt_p` for deltas; `components/tutor/ProgressPanel.tsx` for the delta card. README P3.7/P3.8 acceptance criteria are this feature's definition of done.

**Risk.** Minimal — it is planned work re-scoped for interleaving. Watch boss difficulty (a lost boss must trigger a comeback session, never a wall: P3.7's comeback mechanic).

---

## 5. Three signature moments

**SM-1 — "The doubt that becomes a mission."** *(Feature #1)*
11:40 PM. Class 10. A photographed surds problem. The card comes back: **VERIFIED** — steps, plus a folded "why you can trust this" strip showing the independent re-solve. Then the closing line: *"You're one probe away from never asking this again."* One tap → the phone goes quiet. Next evening the dashboard has one mission waiting: the same node, three items, three minutes, ending in a small taming animation in the Trap Jungle. Four days later a single re-probe: *"Still got it?"* — the exact spacing the hypercorrection literature demands. No Indian edtech product continues *after* the answer; the moment a student notices the app remembered their doubt — and closed it — is the moment Gauth becomes uninstallable.

**SM-2 — "Grade my teaching."** *(Feature #3)*
The node is MASTERED. A new button glows: **"Ab sikhao"** (now you teach). The student explains photosynthesis in their own words — typed on the bus, or spoken to the phone. Seconds later, a coverage map, not a mark: two of four teaching points starred with their own words quoted back ("…chlorophyll catches light" ★), one point missing — and exactly one Socratic question about *that* point, nothing else. Fix it, and the fourth star lands with the mascot's cheer. That night, the parent's WhatsApp card reads: *"Ask her to teach you photosynthesis at dinner — she's now good enough to grade you."* A child being *certified as a teacher* by a deterministic engine — from her own corpus-backed explanation — is a moment no answers-app can imitate, because it requires the marking-point corpus the incumbents don't have.

**SM-3 — "Walk your Trap Jungle."** *(Feature #5)*
The child opens their jungle and sees a creature they've never seen before — *Sign-Flip Sprite*, the misconception behind tomorrow's topic — linked by a dotted root-line to a trap they already tamed last month ("Integer Iceberg — tamed 12 Sept"). The line under the sprite: *"This is the trap that makes students write (a−b)² = a² − b². You haven't met it yet. You will."* It isn't shame — there are no red marks anywhere in the jungle — it is *foreknowledge*: the child gets to meet their own future error before it costs them marks in a board exam. Squirrel AI sells this map to teachers; Atlas hands it to the twelve-year-old. That inversion is the whoa.

---

## 6. 90-day build order

**Phase 1 — Close the doubt loop (Days 1–30).** Ships the retention story. *(Staffing: one full-stack dev on #1/#2 wiring; one content dev on #4 copy + safety review.)*
- **W1–2:** #4 Guess-First hooks (S) + the trust strip on `VerifiedAnswerCard` (assumptions audit — first slice of #2's reveal policy). Copy-review both against the emotional-safety contract.
- **W2–4:** #1 Doubt-to-Mission end-to-end: routing-confidence gate → journey PROBE row → `review_schedule` row → `DailyQuest` injection (cap 1/day) → mission telemetry tag.
- **W4:** #2 slice 1 — PCR-gated reveal on the *photo* surface with the existing hint ladder and the "I've tried" examiner-graded gate.
- **Gate G1 (Meta-Brain A/B, `rule_ab_tester`):** ≥30% of resolvable doubts spawn missions; ≥60% of spawned missions completed next day; ≥50% attempt-before-reveal rate on gated photo doubts; **zero hallucinated answers in audit** (fail-closed invariant untouched).

**Phase 2 — Make them the teacher (Days 31–60).** Ships the differentiation story. *(Staffing: full-stack dev on #3/#5; content dev sourcing pilot marking points; designer on jungle art direction.)*
- **W5–6:** #3 Teach-It-Back MVP — text input, English-medium, 10 pilot nodes with rich marking points; coverage booleans via `cross_encoder_grader`, fallback-to-question below confidence.
- **W6–7:** #5 Trap Jungle v1 — child page over the 20-family catalog with capture telemetry; launch families with real volume only.
- **W7–8:** #7 Board Barometer v1 (Class-10 Maths + Science only) with back-tested bands; #8 WhatsApp parent card v1 (weekly, opt-in, copy firewall on).
- **Gate G2:** Teach-It-Back coverage grading agrees with human grading on ≥90% of pilot explanations; forecast back-test error ≤ one band on withheld board papers; parent-card opt-out < 5%.

**Phase 3 — Voice and foresight (Days 61–90).** Ships the 2026 story. *(Staffing: backend dev on WS/TTS + Sarthi cron; frontend dev on boss gauntlet + delta card; both on hardening.)*
- **W9–10:** #6 Bolo phase 1 — WS narration end-to-end (P4.1 remainder), en-IN + hi-IN, playback only; deterministic cache warm.
- **W10–12:** #10 interleaved boss + mastery-delta card; #9 Sarthi MVP — exam countdown, nightly re-plan via Meta-Brain cron, behind flags.
- **W12–13:** Hardening: golden-file tests for the journey state machine (P1.7), Prometheus metrics per agent proposal (P5.4), load-safe TTS cache.
- **Gate G3:** Narrated-session completion ≥ +25% vs text-only arm; Sarthi audit shows 100% of planned items are KST-ready or review-due; all ten features flag-gated with a weekly Meta-Brain effectiveness report.

**North-star metric:** mastered nodes per weekly-active student (from `JourneyState`). **Guardrails:** attempt-before-reveal rate, mission completion rate, D7 retention, parent brief opt-out — and the invariant that `answer_pipeline` never shipped an unverified answer, checked weekly from audit trails.

---

## 7. Sources

**Adaptive-tutoring mechanics**
- Khanmigo Socratic behavior and guardrails: [HomeschoolFox AI tools guide](https://homeschoolfox.com), [timtis.com on Socratic guardrails](https://www.timtis.com), [TEAS: Trusted Educational AI Standard Framework (OpenReview)](https://openreview.net), [Sal Khan on Possible podcast](https://www.possible.fm), [Economy Insights, Nov 2025](https://www.economyinsights.com)
- Squirrel AI nano-granularity, knowledge-graph error tracing, MCM/MIBA: [CNR, Oct 2026](https://www.cnr.cn/shanghai/tt/20261001/t20261001_527831235.shtml), [Zhihu analysis](https://zhuanlan.zhihu.com/p/2032702223185097653), [Sohu](https://www.sohu.com/a/316241578_153054), [CELTSC](http://www.celtsc.org/info/index_wy/140), [Baidu Baike](https://baike.baidu.com/item/%E6%9D%BE%E9%BC%A0AI/22365914)
- ALEKS Knowledge Space Theory mechanics: [ALEKS PPL practice guides](https://claude.codespeedy.com), KST = Falmagne & Doignon (UC Irvine)
- MATHia model tracing: [Carnegie Learning](https://www.carnegielearning.com), [Cognitive Tutor — Wikipedia](https://en.wikipedia.org/wiki/Cognitive_tutor), [CMU PACT Center (Koedinger et al.)](https://pact.cs.cmu.edu), [EDM Ritter et al. on MATHia X](https://www.educationaldatamining.org)

**Engagement & doubt UX**
- Duolingo energy rollout: [daily.dev, May 2025](https://daily.dev); Birdbrain: [Post*Shift](https://postshift.com); Video Call / 84% retention / Max ~9%: [Investing.com — Citi 2026 TMT](https://www.investing.com), [TIKR](https://tikr.com), [AInvest scale data](https://ainvest.com); power-user critique: [Generative AI Pub](https://generativeai.pub)
- Photomath/Socratic doubt UX and the 11 PM Indian use case: [Navneet Edu](https://navneetedu.ai), [HomeworkMarket](https://homeworkmarket.us)
- Gauth/Question.AI scale and criticism: [KRON4, Sep 2025 — cheating "off the charts"](https://www.kron4.com), accuracy failures and TikTok-native use: [Lemon8 roundups](https://www.lemon8-app.com)
- OpenAI Study Mode: [eWeek, Jul 2025](https://www.eweek.com); agentic-tutor trend: [SSRN multimodal agentic AI survey](https://papers.ssrn.com)

**Indian market**
- Post-exam churn, "no product mechanism for retention": [BYJU'S master dossier (Scribd)](https://www.scribd.com); PW IPO (Nov 2025) covered by Univest and standard IPO-review analyses; PW complaints: [Voxya](https://voxya.com), [G2 reviews](https://www.g2.com); batch-doubt concerns: Quora threads on PW batches (Prayas/Yakeen); Doubtnut OCR positioning: Journal of Multidisciplinary Research, Nov 2025

**Cognitive science 2024–2026**
- Kestin et al., *Scientific Reports* (Jun 2025), Harvard AI-tutor RCT (>2× active-learning gains): as summarized by [mental-momentum research review](https://research.mental-momentum.ai) and [arXiv 2609 pedagogical-safety benchmark](https://arxiv.org)
- MIT "Your Brain on ChatGPT" cognitive-debt EEG study (Jun 2025): [StudyFinds](https://studyfinds.com), [Indian Express](https://indianexpress.com)
- Pretesting effect + metacognitive awareness (Pan et al.): [OSF](https://osf.io); prediction-as-mechanism (2025): Springer Nature communities; doer-effect synthesis (~20 studies): [explainx.ai, Aug 2026](https://explainx.ai)
- Hypercorrection effect 2025 replication and decay caveat: [Saha, Sep 2026 review](https://swapnanilsaha.com); refutation-text hypercorrection (Dunlosky et al.)
- Retrieval vs restudy meta-effects: [ResearchGate](https://www.researchgate.net/publication/382878137); Play-store review mining method papers: [IEEE 2024](https://ieeexplore.ieee.org/document/10725684), [PMC 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11103409), [Wiley CPE](https://onlinelibrary.wiley.com/doi/10.1002/cpe.6800)

*Engine names cited in this plan refer to: `D:\platform\deploy\backend\its\` (README build plan), `modules\journey\engine.py`, `modules\review\engine.py`, `modules\learning\router.py`, `services\*.py`, and `deploy\frontend\components\*` — all verified present in the deploy tree on 2026-10-03.*
