# ATLAS LEARNING DESIGN — The 10/10 Teaching Program
### Per-subject pedagogy × asset integration × emotional safety
*Owner directive 2026-10-03: every subject gets its own plan; doodles/sims/sandboxes/diagrams get defined jobs; one cohesive program; learning fun, easy, never scary.*

---

## 0. The one idea

School teaches subjects as if they were all the same thing: *read → memorise → reproduce → be judged*.
Atlas teaches each subject **the way the subject actually works**, inside **one** mastery spine, and
moves every scary school ritual (tests, red marks, ranks, "weak student") into game mechanics the
child controls.

**The spine (identical for every subject):**

```
HOOK → SEE → PLAY → TRY → REPAIR → PROVE → OWN
```

| Moment | What the child experiences | Asset that owns it |
|---|---|---|
| **HOOK** | "Why should I care?" — a 30-second hook | **Doodle card** (visual joke/curiosity gap) |
| **SEE** | "So that's what it is" — the idea, plain words | **Story Mode scene 1-2** (ELI5) |
| **PLAY** | "Let me poke it" — no stakes interaction | **Sim / Sandbox** (subject-specific, below) |
| **TRY** | "I think I've got it" — instant-graded, tiny stakes | **Practice** (deterministic, adaptive ladder) |
| **REPAIR** | "I missed something — show me the exact gap" | **Journey REMEDIATE** + Misconception bundle |
| **PROVE** | "I can do this for real now" — honest check | **Diagnostic / Chapter test** (framed as check-up) |
| **OWN** | "This star is mine" — visible, permanent | **Galaxy star lights up** + mastery ledger |

Children never see school's sequence (teach → test → rank). They see a game's sequence
(meet → play → try → get better → win the star). The state machine already exists
(PROBE→TEACH→PRACTICE→REMEDIATE→CHALLENGE→MASTERED); this maps human moments onto it.

**The anti-scariness contract (product-wide, non-negotiable):**
1. **No red X.** Wrong answers get "what the examiner wanted that you missed" + one-click Repair. (Examiner mode already returns this framing.)
2. **Check-up, not test.** Diagnostics are named Check-ups in kid words already; scores are "6 of 6 checks strong", never percentages-in-red.
3. **Retry is free and instant.** Every PROVE can be retaken; only the best attempt feeds mastery.
4. **Streaks forgive.** A missed day freezes the streak (freeze tokens earned by goals), never resets to zero. Zero is the quit-trigger; we never show it.
5. **Mastery is private.** Percentage mastery is shown to the child as star brightness, to parents as growth ("moved from 40%→55% this week"), never as class rank or comparison.
6. **Difficulty is invisible.** The adaptive ladder silently moves easy→medium→hard; the child only sees friendlier or spicier questions ("spice level"), never "you failed easy mode".

---

## 1. Subject plans — how each subject is ACTUALLY learned

Every cluster below answers: what does learning this subject *feel like* when done right,
what is the loop, which asset plays which moment, and what "MASTERED" means. These are
pedagogy-blueprints, not feature lists.

---

### 1.1 MATHEMATICS (+ Applied Maths, Statistics)
**How it's learned:** maths is a *skill*, like swimming — you learn by doing graded reps on a
ladder, not by reading. Understanding arrives *through* the hands, then gets named.

**Loop:**
- **HOOK:** doodle card — the trap/magic of the concept ("why does 0.999… = 1?").
- **SEE:** Story scene with ONE worked pattern, narrated step-by-step (deterministic solver's steps ARE the story).
- **PLAY:** **Sandbox** — parameter sliders on the solver ("drag a, b and watch the parabola"). Maths sims = *equation playgrounds*; we generate them from solver families automatically (each solver family's parameters → slider set).
- **TRY:** Practice ladder — 5-question sets, each next question ±1 difficulty, seeded from the same solver family (infinite fresh variants, never memorisable).
- **REPAIR:** the solver's step list highlights the EXACT step where the student's method diverged (we have step verification; show "your step 2 vs the correct step 2").
- **PROVE:** Check-up = 6 unseen problems, mixed types of the same family.
- **OWN:** star lights; the family joins the child's "I can do this" shelf.

**MASTERED =** solves an *unseen* variant of the family cold, under time, with steps.
**Asset jobs:** sims=equation playgrounds (auto-generated), diagrams=geometry/graph visuals, doodles=concept traps, sandbox=free formula play, examiner=step-grading.
**Exists today:** solvers (156 families), step verification, adaptive practice, story, journey. **Build:** parametric sandbox auto-generation from solver families; step-divergence view in repair.

---

### 1.2 PHYSICS & CHEMISTRY (Physical sciences)
**How it's learned:** the universe is a *machine you're allowed to poke*. Understanding = intuition
about the model first, formalism second. Formula-first teaching is why kids hate physics.

**Loop:**
- **HOOK:** doodle — the impossible-seeming fact ("a feather and a hammer, vacuum, who wins?").
- **SEE:** Story scene sets the phenomenon in a story frame.
- **PLAY:** **Sim is the star here** — the #1 moment. Phenomenon sims: projectile launcher, gas chamber, circuit builder, titration bench, equilibrium mixer. The child *predicts-then-checks* (sim asks "what do you think happens?" before running — prediction → outcome is the learning engine).
- **SEE(2):** now the formula — Story scene 3-4 connects the played phenomenon to the equation, deriving ONE step at a time.
- **TRY:** numerical ladder from the deterministic solvers (c12 physics' 35 families, chemistry's reaction families) — numbers always come with the sim intuition already in place.
- **REPAIR:** sim re-run with the student's wrong value highlighted ("you assumed frictionless — watch what friction does").
- **PROVE:** Check-up mixes 1 sim-prediction + 3 numericals + 1 concept question.
- **OWN:** star; the sim stays unlocked as a toy.

**MASTERED =** predicts the phenomenon correctly AND computes it.
**Asset jobs:** sims=the phenomenon (predict-then-check mode), diagrams=circuit/ray/apparatus labels, doodles=misconception traps, sandbox=variable slam, examiner=numerical marking.
**Exists today:** 663 sims (sim index), solver families, practice. **Build:** wrap sims in predict-then-check; link sim → practice family explicitly (finishing a sim spawns the practice set).

---

### 1.3 BIOLOGY & BIOTECHNOLOGY (Life sciences)
**How it's learned:** biology is *systems and names* — you learn it by seeing structures,
labelling, and telling processes as stories. It's the most visual subject; text-first teaching buries it.

**Loop:**
- **HOOK:** doodle — the gross/wow fact ("your gut has a second brain").
- **SEE:** Story scenes walk the process as a journey (food's journey, blood's circuit).
- **PLAY:** **Diagram-first interactions** — label-the-diagram as a drag game (mitochondria, nephron, leaf cross-section); process sims (photosynthesis toggler, cell division runner) for the dynamic ones.
- **TRY:** Practice = definition matching + process sequencing + "what if X breaks" system questions (node-family engine serves corpus-grounded facts).
- **REPAIR:** mislabelled parts re-quiz immediately in isolation (spaced, tiny).
- **PROVE:** Check-up = one full diagram label + 5 process questions.
- **OWN:** star + the labelled diagram joins a "Field Guide" the child collects.

**MASTERED =** can label the structure cold AND narrate the process AND answer one transfer question ("what if the nephron's loop were shorter?").
**Asset jobs:** diagrams=THE core asset (label games), doodles=wow-hooks, sims=dynamic processes, story=narration, sandbox=dissection-style explorers.
**Exists today:** 4,411 diagram masters, family engine, stories. **Build:** label-game component fed by diagram index + node facts; Field Guide collection page.

---

### 1.4 HISTORY, CIVICS/POLITICAL SCIENCE, SOCIOLOGY, LEGAL STUDIES
**How it's learned:** these are *narratives + lenses*. History is a story you can argue with; civics
is rules of a game you're inside; sociology is noticing your own life as data. Story Mode was BORN for these.

**Loop:**
- **HOOK:** doodle — the strange detail ("the Salt March walked 385 km — why not take a train?").
- **SEE:** Story IS the lesson — 6 scenes of narrative with real figures, dates embedded in plot.
- **PLAY:** **Timeline builder** (drag events into order — wrong slots bounce), **perspective switcher** (same event as ruler/subject/british officer — a "lenses" sim), **match the amendment to its story**.
- **TRY:** Practice = chronology, cause-effect chains, "which lens" questions, source snippets with one inference question each (exam skill, but framed as detective work).
- **REPAIR:** the story scene where the confusion happens re-plays with the correct link highlighted.
- **PROVE:** Check-up = narrate (short answer, examiner-graded on key points) + 4 objective.
- **OWN:** star; events join the child's timeline wall (a personal museum that grows).

**MASTERED =** can narrate the arc, place events cold, and answer one "why did it matter" question.
**Asset jobs:** story=THE lesson (these subjects get 6 full scenes always), doodles=strange-detail hooks, sims=timeline/perspective, examiner=short-answer key-point grading.
**Exists today:** story engine, examiner key-point grading, node facts. **Build:** timeline drag component; perspective-switcher sim (one generic, content-driven).

---

### 1.5 GEOGRAPHY & ENVIRONMENTAL SCIENCE
**How it's learned:** geography is *spatial reasoning + systems* — maps in the head, cause-chains
(rain → river → crop → city). It's learned through places, not paragraphs.

**Loop:**
- **HOOK:** doodle — the map oddity ("this Indian state is larger than the UK").
- **SEE:** Story scene = a journey across the physical feature (ride the monsoon wind).
- **PLAY:** **Map games** — drag-the-feature onto a map, climate-graph puzzler, "which way does the river flow" sim; layer-toggling atlas sandbox (rainfall over population over crops).
- **TRY:** Practice = locate, explain-the-cause, compare-two-regions (family engine + diagram labels).
- **REPAIR:** the map region mis-placed pulses until re-placed correctly.
- **PROVE:** Check-up = one map task + one cause-chain + 3 facts.
- **OWN:** star; regions visited join a "Travel Log" (the child has BEEN to the Deccan, met the monsoon).

**MASTERED =** locates features cold, explains one full cause-chain, reads one climate graph.
**Asset jobs:** maps/diagrams=core, sims=systems (monsoon, water cycle), story=journey frame, doodles=oddities.
**Build:** SVG map-game component (India outline + feature layer) — one generic engine, region data per chapter.

---

### 1.6 ECONOMICS, ACCOUNTANCY, BUSINESS STUDIES, ENTREPRENEURSHIP, CA
**How it's learned:** money subjects are *simulations of real life* — the fastest way to teach a
market is to run one. Commerce kids learn by DOING trades, ledgers, pitch decks.

**Loop:**
- **HOOK:** doodle — the money paradox ("why is water cheap and diamonds dear?").
- **SEE:** Story scene = a character running a stall/startup hitting exactly this concept.
- **PLAY:** **The sims that matter most in the product** — market price sim (set supply/demand, watch price), ledger game (post entries, balance the books), business-cycle sim, budget sandbox. These exist as concepts in sims already; commerce needs its own set.
- **TRY:** Practice = numericals (economics/accountancy solver families exist: 17+13 econ, 10 acc) + "what would you do" decision MCQs.
- **REPAIR:** the ledger re-posts the wrong entry in red-free amber with the rule beside it.
- **PROVE:** Check-up = one mini-case ("Riya's juice stand — find her profit") + numericals.
- **OWN:** star; the child's running business sim saves state (their stall grows over the year — persistent meta-game).

**MASTERED =** solves the numerical cold AND makes the right call in one unseen scenario.
**Asset jobs:** sims=core (market/ledger), story=business-case frame, doodles=paradoxes, sandbox=budget play.
**Build:** market sim + ledger game + persistent "my venture" meta-game (one sim, per-chapter params).

---

### 1.7 ENGLISH & HINDI (+ grammar)
**How it's learned:** languages are *acquired by exposure + production with feedback*, not by
rules-first. Reading volume does the heavy lifting; the rule engines handle precision.

**Loop:**
- **HOOK:** doodle — the language joke ("why is 'gh' in 'ghost' silent-ish but not in 'go'?").
- **SEE:** Story scene = the chapter text retold simply (the literature chapters ARE stories already).
- **PLAY:** **Word-craft games** — grammar transforms as puzzles (voice/narration converters = drag-the-word), homophone duels, vocabulary bolt-on games; Hindi: वाक्य-रचना puzzles.
- **TRY:** Practice = the grammar rule engines (already built: voice, narration, articles, degrees, error-spotting, modals) + comprehension Qs on the chapter + writing prompts.
- **REPAIR:** the exact rule ("since + point, for + duration") re-shown on THE sentence they got wrong.
- **PROVE:** Check-up = 1 short writing task (examiner-graded on points) + grammar set.
- **OWN:** star; words mastered join a "Word Vault"; pieces of writing collect into a Portfolio.

**MASTERED =** applies the rule in an unseen sentence AND writes one clean paragraph.
**Asset jobs:** story=text engagement, rule engines=TRY, examiner=writing feedback, doodles=language jokes, sandbox=sentence-builder.
**Exists today:** grammar engines (6-11), examiner grading, stories. **Build:** sentence-builder sandbox; Word Vault collection.

---

### 1.8 COMPUTER SCIENCE, IP, COMPUTER APPLICATIONS
**How it's learned:** code is learned **by breaking things**. CS kids should be typing from day one.

**Loop:**
- **HOOK:** doodle — the programmer joke ("a programmer's wife says: buy bread; if they have eggs, buy 12… he returns with 12 breads").
- **SEE:** Story scene = the concept as a mini-story (a loop as a daily chore).
- **PLAY:** **Sandbox IS the lesson** — live code editor with runnable snippets per concept (the /sandbox surface exists — fill it with per-node starter code + challenges: "make it print 1-10", "now backwards").
- **TRY:** Practice = predict-the-output (deterministic, verifyable) + fix-the-bug + write-the-snippet (auto-checked).
- **REPAIR:** the bug is highlighted with the error message explained in kid words.
- **PROVE:** Check-up = 2 outputs + 1 fix + 1 write.
- **OWN:** star + snippets join "My Codebook".

**MASTERED =** writes an unseen 5-line snippet cold.
**Asset jobs:** sandbox=core, doodles=jokes, practice=predict/fix.
**Build:** per-node snippet challenges wired into the existing sandbox; output-predictor checker.

---

### 1.9 PSYCHOLOGY, HOME SCIENCE, MASS MEDIA, PHYSICAL EDUCATION (People & self subjects)
**How it's learned:** these are *reflection + experiment* subjects — the child's own life is the lab.

**Loop:**
- **HOOK:** doodle — the relatable fact ("your brain edits memories every time you recall them").
- **SEE:** Story scene = a day-in-a-life scenario demonstrating the concept.
- **PLAY:** **Self-experiments** — mini-inventories/streaks ("track your sleep 3 days, plot it"), media-log games, reaction-time sim (PE).
- **TRY:** Practice = term-definition matching + case vignettes ("which defence mechanism is Riya using?").
- **REPAIR:** the vignette re-reads with the correct cue highlighted.
- **PROVE:** Check-up = one real mini-experiment writeup (examiner-graded) + objective set.
- **OWN:** star + the personal experiment log grows into "My Lab Notes".

**Asset jobs:** story=vignettes, sims=self-experiments, doodles=relatable hooks.
**Build:** vignette-practice generator (family engine serves these), experiment-log page.

---

## 2. The asset system — one grid, no orphans

| Asset | Its ONE job | Appears at | Count today | Gap |
|---|---|---|---|---|
| **Doodle cards** | The HOOK (curiosity gap / joke / trap) | HOOK, always first | mounted at runtime | auto-assign per node (doodle↔node map) |
| **Story Mode** | SEE + the lesson frame (esp. humanities) | SEE | live | per-subject scene emphasis (history=full 6, maths=pattern-demo) |
| **Sims** | PLAY the phenomenon/system | PLAY | 663 components | predict-then-check wrapper; commerce/geo sets |
| **Sandboxes** | Free exploration, no goal | PLAY (2nd beat) | /sandbox live | per-subject sandbox types (code, formula, map, budget) |
| **Diagrams** | Structure capture → label games | SEE+PLAY (bio/geo) | 4,411 masters | label-game engine |
| **Practice engine** | TRY on the ladder | TRY | live, adaptive | family→practice auto-linking per subject plan |
| **Deterministic solvers** | Step-truth + repair detail | TRY+REPAIR | 156 families | step-divergence view |
| **Node-family engine** | Corpus-grounded fact answers | TRY (fact subjects) | 87 combos | Hindi stopword list to extend to Hindi |
| **Diagnostics** | PROVE (check-up framing) | PROVE | fixed, completes | per-subject composition rules (below) |
| **Examiner** | Short-answer/writing grading | PROVE+REPAIR | live | nothing — promote it |
| **Galaxy** | OWN — visible mastery | OWN | live | star brightness = mastery shade |
| **Journey + BKT** | The invisible brain sequencing all of it | everywhere | live, E2E-proven | per-subject transition tuning |
| **Misconception Lab** | Teacher sees the repair queue | REPAIR | live | nothing |
| **Junior games (1-5)** | Same spine, game-native | all | live | same patterns as classes grow up |

**Diagnostic composition per subject (PROVE is not one-size):**
- maths/app/stats: 6 unseen problems
- phy/chem: 1 sim-prediction + 3 numerical + 2 concept
- bio/biotech: 1 diagram-label + 5 process/fact
- hist/civ/soc/leg: 1 narrate (examiner) + 4 chronology/cause
- geo/env: 1 map + 1 cause-chain + 3 fact
- commerce: 1 mini-case + 3 numerical + 1 decision
- languages: 1 writing (examiner) + 4 grammar rule items + 1 comprehension
- CS: 2 predict + 1 fix + 1 write
- people subjects: 1 vignette-case + 4 terms

---

## 3. The child's day (coherence across subjects)

A 20-minute Atlas session is a **mission**, never a syllabus:

0. **Warm-up retrieval** (90 sec) — 2 quick questions on PAST topics, chosen by the
   spaced-review queue (below). Retrieval of yesterday's material is the single
   highest-utility technique in the literature (Dunlosky 2013: practice testing +
   distributed practice are the only two HIGH-utility techniques).
1. **Today's Mission** (1 topic, chosen by the CHILD from 2-3 journey-frontier options —
   autonomy per self-determination theory; journey+BKT pre-sorts the best options,
   repair-first) — 8 min: HOOK→SEE→PLAY
2. **Ladder** (practice set on the same topic, with worked-example FADING: rep 1 shows
   all steps, rep 2 hides one, rep 3 is cold — cognitive-load theory's
   worked-example effect) — 6 min: TRY→REPAIR
3. **Star check** — 3 min: PROVE if the ladder was strong (else tomorrow), star lights
4. **Free play** — 3 min: any unlocked sim/sandbox toy

Weekly rhythm: 5 mission days + 1 Check-up day (chapter-sized, INTERLEAVED across the
chapter's families — interleaving beats blocked practice for discrimination, especially
in maths, even though it feels harder: a desirable difficulty) + 1 free-explore day.
Streak freezes protect the rhythm (the ethical answer to Duolingo's loss-aversion
streaks: keep the retention mechanic, drop the guilt mechanics their own critics call
"streak creep"). The galaxy visibly grows; the parent digest reports growth, never
rank. Teachers see the repair queue, not a leaderboard.

Weekly rhythm: 5 mission days + 1 Check-up day (chapter-sized) + 1 free-explore day.
Streak freezes protect the rhythm. The galaxy visibly grows; the parent digest reports
growth, never rank. Teachers see the repair queue, not a leaderboard.

---

## 4. What to build, in order (the gap-closing plan)

**Phase V1 — make the spine visible (2 weeks of work):**
1. `predict-then-check` wrapper component for sims (universal; content = sim params)
2. Label-game engine for diagrams (bio/geo first — biggest diagram inventory)
3. Diagnostic composition rules per subject (server-side assembler; examiner + objective mixers already exist)
4. Doodle↔node auto-assignment (doodle index exists; map by subject/chapter)
5. Step-divergence view in practice repair (solver steps vs student answer)

**Phase V1.5 — evidence engines (1 week, interleaves with V1):**
5b. Spaced-review queue service (BKT decay → 2-question warm-up per mission)
5c. Worked-example fading in the practice ladder (solver steps hidden per rep)
5d. Feynman teach-back activity (voice capture → MIS feedback) for the CHALLENGE state
5e. Mission choice UI (2-3 frontier options; journey already computes the frontier)

**Phase V2 — subject flavor (3 weeks):**
6. Sandbox types: formula sliders (auto from solver families), code challenges (CS), map game (geo), market/ledger sim (commerce), sentence builder (languages)
7. Timeline builder + perspective switcher (humanities)
8. Word Vault / Field Guide / Codebook / My-Lab-Notes collection pages (one generic "collection" component, themed)
9. Journey transition tuning per subject (e.g., languages need more TRY reps before PROVE)

**Phase V3 — polish of feeling (1 week):**
10. Streak freezes, spice-level language, star-brightness mastery, growth-only parent digest
11. Copy sweep in kid words across all surfaces ("Check-up", "spice", "repair")
12. Hindi: extend family engine (stopword list) so Hindi subjects enter the same spine

**Non-goals:** no leaderboards, no time pressure on PLAY/SEE, no percentage-in-red anywhere.

---

---

## 5. Research grounding — why this design, and what the science forced in

The design above was stress-tested against the learning-science literature and the
leading live systems (Khan Academy/Khanmigo, Duolingo, ALEKS, MATHia). What it already
had, and what the evidence forced in:

**Already aligned (kept):**
- **Mastery learning + BKT journey** — Bloom's 2-sigma finding (1:1 tutoring + mastery
  puts the average tutored student above 98% of a conventional class) is the explicit
  goal; our ITS + per-family journey is the tutoring architecture. The tutor guides
  Socratically (hint ladder) and never just hands answers — Khanmigo's core rule.
- **Retrieval practice (testing effect)** — TRY and PROVE are retrievals, not rereads.
  Rereading/highlighting/summarising rate LOW utility; we build none of them.
- **Duolingo's retention math without its guilt** — streaks (+60% commitment) kept as
  loss-aversion design, streak freezes kept, but no leagues, no guilt notifications
  (the "streak creep" critique is a design law here).
- **Khan-style mastery levels** — star brightness = Attempted → Familiar → Proficient →
  Mastered (we name them Sprout → Growing → Strong → Star for kids).
- **ALEKS-style frontier** — "next-best topic" from the prerequisite graph = the
  knowledge-space "ready to learn" edge.

**Forced in by the evidence (this pass):**
1. **Spaced-review queue** — distributed practice is top-tier utility and was missing.
   Every mission opens with 2 retrieval questions from past topics, scheduled by BKT
   decay (review before the forgetting curve drops the star's brightness).
2. **Interleaving in PROVE** — chapter check-ups mix families rather than blocking;
   evidence says discrimination/transfer improve even when it feels harder.
3. **Self-explanation / Feynman teach-back** — the CHALLENGE state activity: the child
   explains the topic in their own words (voice capture already exists) and gets
   "what a teacher would ask next" feedback. Explaining is the strongest OWN-state
   act; it also feeds the misconception engine (what they fail to articulate).
4. **Worked-example fading** — the TRY ladder starts with the solver's full worked
   steps and fades them across reps (completion problems → cold), per cognitive-load
   theory. Plain problem-sets from rep 1 waste the worked-example effect.
5. **Mission choice (autonomy)** — 2-3 journey-frontier options per day; autonomy +
   competence + relatedness (class constellation grows together, no leaderboard) is
   self-determination theory, the strongest known intrinsic-motivation frame.

**Deliberately rejected:** leaderboards (rank = fear), hearts/lives (punishment),
time pressure on PLAY/SEE (flow needs safety), badges-for-attendance (rewards for
showing up corrupt the signal — rewards attach to mastery only).

*One spine, nine flavors, every asset with one job, nothing scary anywhere — and every
beat backed by the strongest evidence in the literature.*
