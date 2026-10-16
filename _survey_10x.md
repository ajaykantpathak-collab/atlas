# 10/10 ROADMAP SURVEY — `D:\platform` (READ-ONLY)

**Date:** 2026-09-27 · **HEAD:** `4e5968f1` "feat: rebuild neo4j graph from enhanced-nodes corpus + full sim inventory"
**Working tree:** 13,306 uncommitted entries (`git status --porcelain | Measure-Object` → 13306)
**Method:** PowerShell read-only enumeration only — `Get-ChildItem`, `Get-Content`, `Select-String`, `Get-FileHash`, `Compare-Object`, JSON parse. No `node_modules`, no `sync-deploy`, no writes other than this file.

Every number below is a measured count. Where something could not be measured it says **not measurable** — no guesses.

---

## 0. Scorecard

| # | Area | Verdict | Headline evidence |
|---|------|---------|-------------------|
| 1 | Routes | **Fails** | 95 `page.tsx`, **15 are test/dev/archive stubs** + **4 are 5-line redirect shims**; `frontend/middleware.ts` is a 12-line pass-through with zero auth |
| 2 | Student learning loop | **Strong on practice, absent on learn** | Practice = 3,061-line page with SM-2 interleave, 2-wrong rescue, "why you were wrong" — `app/(student)/practice/page.tsx:429-444, 646-678, 2113-2225, 2031-2070`. Learn = 1,279 lines, **no** review interleave, **no** stuck-rescue |
| 3 | Story mode | **Structurally missing governance** | Story "beats" are `string[]` (`components/story/StoryMode.tsx:1684`); `Enrichment` has no objective/board/tier/audit fields (`:68-83`); **0** hits for `learningObjective\|boardRef\|boardProof\|examRef\|cbseRef\|auditTrail` across 3,001 sim files |
| 4 | Sims | **High volume, no metadata spine** | 3,815 SimDefs / 3,001 files; beats 2,859 (75%), discovery 3,450 (90%), predict 2,088 (55%), observe 2,089 (55%); **0** zero-challenge sims; **0** empty `validate` strings of 14,197; only **4 files** carry `tier:`, **14** carry `objective:` |
| 5 | Backend | **Correctness gaps, no observability** | 255 endpoints, **123 with no auth dependency**; 3 broken `Settings` properties; hardcoded credential `api/analytics.py:31`; **no `@app.exception_handler`**; 6 confirmed N+1 sites |
| 6 | Duplication | **Severe** | 2 `SimPlayer.tsx` (1,172 vs 1,212 lines, 95.6% identical, one is **0-import dead code**); `sims_v2/types.ts` ≡ `engine/types.ts` (same SHA-256); 56/56 chem sims forked; 4 `.raw` orphan twins in `lib/` |

---

## 1. ROUTES

### 1.1 Counts

| Metric | Count |
|---|---|
| `frontend/app/**/page.tsx` | **95** |
| `frontend/app/**/layout.tsx` | **9** |
| error boundaries | `app/error.tsx`, `app/(student)/error.tsx`, `app/premium/error.tsx` |

Route groups (by first path segment):

| Group | pages |
|---|---|
| `(student)` | **44** |
| `premium/(student)` | 9 |
| `(auth)` | 5 |
| `(teacher)` | 3 |
| `_archive` | 3 |
| `premium/(auth)` | 2 |
| `premium` (root) | 2 |
| `(parent)` | 1 |
| root `app/page.tsx` | 1 |
| 25 ungrouped single-page dirs (`atlas`, `play`, `lumen`, `lesson`, `showcase`, `world`, `my-world`, `topic-map`, `organism`, `welcome`, `3d-lab`, …) | 25 |

Layouts: `(admin)`, `(auth)`, `(parent)`, `(student)`, `(teacher)`, `app/layout.tsx`, `premium/(auth)`, `premium/(student)`, `premium`.

**Note:** `(admin)/layout.tsx` exists but `(admin)` holds **0 pages** — `/admin-dashboard` and `/teacher-portal` sit outside the group and never get admin chrome.

### 1.2 JUNK / DEV / TEST ROUTES THAT MUST NOT SHIP (15)

| Route URL | File | lines | bytes | Why it must go |
|---|---|---|---|---|
| `/game-test` | `app/game-test/page.tsx` | 317 | 12,319 | Header comment `:3-5` — "Games — full game library across classes 1–5": dev harness, not product |
| `/riv-test` | `app/riv-test/page.tsx` | 45 | 2,043 | "Dog Characters — Pick One" asset probe with `loading.../OK/ERROR` text (`:6-28`) |
| `/sim-test` | `app/sim-test/page.tsx` | 724 | 78,687 | Mounts raw `components/simulations/class1/*` games (`:8-12`) — pre-v2 debug player |
| `/junior-simple` | `app/junior-simple/page.tsx` | **5** | 117 | Pure `redirect('/junior')` shim (`:1-5`) |
| `/story-visuals-preview` | `app/story-visuals-preview/page.tsx` | 135 | 6,810 | "Standalone preview for the Story Mode visual layer" (`:9-13`) |
| `/atlas-v2` | `app/atlas-v2/page.tsx` | **5** | 111 | Pure `redirect('/atlas')` shim (`:1-5`) |
| `/atlas-landing` | `app/_archive/atlas-landing/page.tsx` | 1,645 | 66,329 | Dead archived landing page, 66 KB to the client |
| `/learn-c68` | `app/_archive/learn-c68/page.tsx` | 437 | 17,419 | Archived duplicate of the learn page |
| `/test-sim` | `app/_archive/test-sim/page.tsx` | 124 | 8,822 | Archived test page |
| `/unregister-sw` | `app/unregister-sw/page.tsx` | 39 | 1,445 | Docstring `:3-10`: "Visit localhost:3000/unregister-sw ONCE" — deletes every SW/cache |
| `/logout` | `app/logout/page.tsx` | 26 | 621 | Logout as a client page, not a server action |
| `/dragon-inspect` | `app/dragon-inspect/page.tsx` | 47 | 1,692 | Rive asset inspector (`useRive` + `useStateMachineInput`) |
| `/lesson` | `app/lesson/page.tsx` | 217 | 9,181 | Ungrouped orphan lesson page, no nav entry |
| `/showcase` | `app/showcase/page.tsx` | 369 | 18,520 | Ungrouped gallery page |
| `/topic-map` | `app/topic-map/page.tsx` | 72 | 2,310 | 72-line stub superseded by `app/(student)/galaxy` |

### 1.3 Redirect shims inflating the route count (4 more, 5 lines each)

`/ai-tutor` → `/tutor` · `/socratic-tutor` → `/tutor` · `/tutoring` → `/tutor` · `/competency-tutor` → `/competency-tutor`
Evidence: `app/(student)/ai-tutor/page.tsx:1-5`; same 5-line shape in `socratic-tutor/page.tsx`, `tutoring/page.tsx`, `competency-tutor/page.tsx`.

**Junk total: 19 routes — ≈3,860 lines, ≈232 KB of client source.**

### 1.4 Auth posture at the routing layer

- `frontend/middleware.ts:5-7` — `return NextResponse.next();`. Comment `:4` "Simple pass-through middleware". **No route-level auth anywhere.**
- `frontend/app/(student)/layout.tsx:16-27` — `PWAProvider` + `StudentDock` only. **No `getCurrentUser`, no redirect guard.** All 44 student routes are client-side protected only.

---

### 1.5 Product-surface duplication in routes (measured line counts)

| Concern | A | B | C | D |
|---|---|---|---|---|
| learn | `(student)/learn` **476** | `premium/(student)/learn` 209 | | |
| practice | `(student)/practice` **3,061** | `premium/(student)/practice` 215 | | |
| progress | `(student)/progress` 237 | `premium/(student)/progress` 234 | | |
| dashboard | `dashboard` 260 | `premium/dashboard` 384 | | |
| parent | `parent-dashboard` 490 | `parent-portal` 150 | `(parent)/parent-overview` **923** | |
| teacher | `teacher-portal` 247 | `(teacher)/teacher-dashboard` 167 | `(teacher)/teacher-overview` **1,021** | `(teacher)/teacher-assignments` 551 |
| tutor | `(student)/tutor` **1,834** | `premium/(student)/tutor` 270 | | |
| exam | `(student)/exam` **2,314** | `premium/(student)/exam` 207 | | |
| sims | `(student)/simulations` 416 | `(student)/sims-v2` 353 | `[id]` v1 279 / v2 210 | |

Three parallel surfaces per concern (parent, teacher, premium) is the root cause of "which one is real?" ambiguity. **Measured duplication, not speculation.**

---

## 2. STUDENT LEARNING LOOP

Files read: `frontend/app/(student)/**` (practice, learn, review, exam, junior, diagnostics), `components/learn/**` (9 files), `components/practice/**` (3 files), `frontend/lib/srs.ts`, `frontend/lib/bkt.ts`, `frontend/lib/masteryStore.ts`.

### 2.1 Does practice interleave spaced repetition? — **YES, genuinely.**

| Step | Evidence |
|---|---|
| SRS algorithm exists and is real SM-2 | `frontend/lib/srs.ts:19-55` — `sm2Update()` with EF/interval/repetitions, EF floor 1.3 at `:38`; `getDailyReviewQueue()` `:57-61`; `getRetentionRate()` `:73-86`; `getReviewStreak()` `:88-107` |
| Scheduler is server-side | `backend/routers/progress.py` — `GET /review/queue`, `POST /review/answer`, `GET /review/stats` |
| Practice fetches the **real due queue** | `app/(student)/practice/page.tsx:435` `api.get('/api/progress/review/queue')`; `:437` `items.slice(0, 2)` |
| Interleaved **mid-session**, not a separate mode | `:646-655` — a review card surfaces *before questions 3 and 5* (`reviewServed < reviewItems.length && currentIndex % 2 === 1`) |
| Grades go to the real scheduler | `:665-678` — `submitReviewGrade` POSTs `/api/progress/review/answer` |
| Honest labelling in the UI | `:2605-2614` doc; `:2638` `🔁 Spaced repeat — you saw this N days ago`; `:2675` "be honest — it sets your next review" |
| Separate focused mode also exists | `app/(student)/review/page.tsx` (383 lines); `:15-16` "the queue is the real SM-2 table"; `:266` `data-testid="review-why"` |

**Verdict: strongest part of the codebase. Do not touch.**

### 2.2 "Stuck-rescue" after 2 wrong answers? — **YES on practice. NO anywhere else.**

`app/(student)/practice/page.tsx`:
- `:69-72` — "Two wrongs in a row open the 'Stuck?' rescue card (hint → watch-it-solved → easier practice)"; `RESCUE_ADVANCE_MS = 60000`
- `:3007` — `showRescue={wrongStreak >= 2}`; wired at `:2838`
- `:2113-2225` — `RescueCard`, three escalating supports: (1) `rescue-hint` (`:2166-2193`) via `fetchRescueHint(topic)`, (2) `rescue-watch` (`:2203`) worked walkthrough, (3) `rescue-easier` (`:2225`) fresh session on the same topic
- `:621-628` — auto-advance backs off to 60 s while the card is open, "so the rescue steps are actually usable"
- Second, always-available lane: `:1395-1437` "I don't get it" hint (`idontgetit-hint`), independent of wrong-streak

**Gap:** `app/(student)/learn/[topicId]/page.tsx` (1,279 lines) has **no** `rescue`, **no** `stuck`, **no** `srs` symbol. A `Select-String 'review|srs|rescue|stuck'` returns only 6 hits, all related-node plumbing: `:188`, `:310` (`f.review_node_ids`), `:905-907`. **A student stuck in the lesson has no rescue lane — the loop only closes on the practice route.**

### 2.3 Feedback on WHY an answer was wrong? — **YES, three layers, one honest degradation.**

| Layer | Evidence |
|---|---|
| Explanation + model answer | `practice/page.tsx:1945-1968` — `aria-label="Explanation"`, `feedback.explanation`, `feedback.modelAnswer` |
| Misconception / remediation / revisit | `:2031-2070` — `role="note"`, `aria-label="Why this went wrong"`; renders `Common mix-up:`, `How to fix it:`, `Revisit:` chips → `/learn/{slug}` |
| §5 self-explanation (student names the trap) | `:254` comment, `:681` "the child names the trap that caught them. Logged…", `:1822`, `:1986-2010` |
| Hinglish/EN toggle | `:1855` `hinglishExplanations`, `:1904` |
| **Honest degradation** | `:579-583` — no API explanation → generic fallback string, **not** invented pedagogy |

`components/practice/FeedbackSystem.tsx` (539 lines) adds a progressive hint ladder — `:334-342` derives a short hint from the explanation's first sentence; `:502-531` collapsible `hint-panel` with `aria-expanded`/`aria-controls`.
`components/learn/QuickQuiz.tsx` (887 lines) closes the loop to prereqs — `:11-14` "missed question → misconception → prereq lesson → prereq sim"; `:344` `fixIt` from `remediation.prereqIds`; `:51` imports `fetchNodeRemediation`.

**Gap:** `components/practice/QuestionCard.tsx` (882 lines) has **zero** occurrences of `why|explanation|misconception|remediation` — the "why" logic lives only in `FeedbackSystem.tsx` and inside the 3,061-line page. QuestionCard is a pedagogy dead-end.

---

## 3. STORY MODE

Files: `frontend/components/story/StoryMode.tsx` (**2,477 lines / 106,197 bytes**) and `frontend/components/story/visuals.tsx` (28,967 bytes). Route: `app/(student)/learn/[topicId]/story/page.tsx`.

### 3.1 Does each beat carry a learning objective? — **NO. The beat type is a bare string.**

```ts
// components/story/StoryMode.tsx:1684
function BeatCards({ beats }: { beats: string[] }) {
```
`beats` is `string[]`, rendered as an ordered list with a numeric chip and `RichText` (`:1687-1701`), `aria-label="Walkthrough"`. The data type makes a per-beat objective, mastery claim, or success criterion **impossible**.

The upstream contract confirms it. `interface Enrichment` (`:68-83`, "as served by `GET /api/content/nodes/{id}/enrichment`") carries exactly:
`node_id, title, subject, class_level, chapter, definition, text_walkthrough, eli5, common_misconception, diagnostic_questions, on_failure, examples, cognitive_level, difficulty`.
No `objective`. No `success_criteria`. No `prereq`. No `exam_weight`.

### 3.2 Board-exam proof / reference? — **NO. Zero occurrences corpus-wide.**

`Select-String 'learningObjective|boardRef|boardProof|examRef|cbseRef|auditTrail'` over all **3,001** sim files under `components/sims_v2/**` (excluding `tools/`) → **0 matches**. Same pattern over `StoryMode.tsx` → 0 matches.

The only CBSE-adjacent strings in `StoryMode.tsx` are comments (`:1416` "exactly the sections a CBSE board…", `:1117` "§10 transfer"). No board reference is ever rendered.

### 3.3 Tier badge? — **NO. 4 files out of 3,001 (0.1%).**

`Select-String '(?<![A-Za-z])tier\s*:'` → only:
`class11/v3/c11_ps_ch17_p1.ts` · `class11/v3/c11_ps_ch17_p2.ts` · `class12/v3/c12_geo_ch15_p1.ts` · `generated/10_geo_gen.ts`

The *type* supports it — `sims_v2/engine/types.ts:140` "difficulty tier — BKT adapts which challenges surface" — but the field is populated 4 times in 3,815 SimDefs.

`objective:` is marginally better at **14 files (0.37%)**: `class11/v3/c11_biotech_ch12_p1.ts`, `class12/v3/c12_app_ch10_p2.ts`, `c12_bs_ch04_p1.ts`, `c12_hist_ch05_p2.ts`, `c12_hs_ch06_p1.ts`, 5 × `class12/v3w/*`, 4 × `generated/*_gen.ts`.

### 3.4 Audit trail? — **NO. Structurally absent.**

No `auditTrail`/provenance field exists in `Enrichment` (`:68-83`), in `sims_v2/engine/types.ts`, in any sim file, or in `story/visuals.tsx`. Nothing records which corpus version, generator run, or reviewer produced a beat. The nearest artifact is `sims_v2/SIMS_V2_QUALITY.json` (`"generatedAt": "2026-09-13"`) — a corpus-level snapshot, not per-beat provenance.

### 3.5 What Story Mode *does* have (credit where due)

| Capability | Evidence |
|---|---|
| 5-scene arc | `IdeaScene :1342`, `ExampleScene :1424`, `ExploreScene :1630`, `CheckScene :1988`, `YourTurnSection :1825` |
| In-page sim embed, honest fallback | `SimEmbedCard :1711-1724` — `ResizeObserver` width tracking; "a failed fetch degrades to a rich card… never a dead frame, never a wrong-subject guess" |
| Cloze/blank construction | `:318-376` `BLANKABLE_NUMBER_RE`, `blankVocab`, `buildYourTurnSteps` |
| Confidence self-report | `ConfidenceChips :2221` |
| Teach-it-back (retrieval) | `TeachItCard :2374` |
| "Today I learned" | `TodayILearnedCard :2264` |
| CBSE *part* labels (not proof) | `BoardPartRow :1588` |
| Diagrams derived, never invented | `:101-103`, `:288` `heroTimelineFrom` — "deterministic splitting only, nothing invented" |

**Summary: pedagogical scaffolding is excellent; pedagogical governance (objective, board proof, tier, audit) does not exist at all.**

## 4. SIMS

### 4.1 File counts under `frontend/components/sims_v2/`

| Directory | `.ts` files |
|---|---|
| class1 / class2 / class3 / class4 / class5 | 4 / 5 / 5 / 5 / 5 |
| class6 / class7 / class8 / class9 | 199 / 198 / 189 / 190 |
| class10 | 290 |
| class11 | 929 |
| class12 | 887 |
| `generated/` | 93 |
| `engine/` | 10 |
| `shared/` | 2 |
| `tools/` | 0 (`.mjs`/`.py`/`.json` only) |
| **TOTAL `.ts`** | **3,014** |

Sim-definition files (excl. `engine/`, `tools/`, `shared/`): **3,001**; declaring a `SimDef` type: **2,989**.
**SimDef objects** (by `classLevel:` occurrences): **3,123 in `classN/` + 692 in `generated/` = 3,815.**

`engine/` (13 files): `beats.tsx` 18,445 · `canvasLab.tsx` **445,153** · `diagrams.ts` **359,518** · `generators.ts` 33,277 · `lab3d.tsx` 67,416 · `lab3d_keys.ts` 1,976 · `lexgen.ts` 7,162 · `OwlMascot.tsx` 3,956 · `shuffle.ts` 757 · `SimPlayer.tsx` 79,955 · `sim_components.gen.ts` 113,095 · `theme.ts` 3,656 · `types.ts` 13,087.

### 4.2 Phase coverage (per SimDef)

| Segment | SimDefs | `beats` | `discovery` | `predict` | `observe` | `reflect` | has `challenges` | `challenges: []` |
|---|---|---|---|---|---|---|---|---|
| class1–9 | 1,017 | 763 (75%) | 832 (82%) | 542 (53%) | 545 (54%) | **1,017 (100%)** | 1,017 | **0** |
| class10–12 | 2,096 | **2,096 (100%)** | 1,926 (92%) | 1,546 (74%) | 1,544 (74%) | **2,096 (100%)** | 2,096 | **0** |
| `generated/` | 692 | **0 (0%)** | 692 (100%) | **0** | **0** | **0** | 692 | **0** |
| **TOTAL** | **3,815** | **2,859 (75%)** | **3,450 (90%)** | **2,088 (55%)** | **2,089 (55%)** | **3,113 (82%)** | **3,805** | **0** |

- **Zero-challenge sims: 0.** Every one of the 3,805 SimDefs declares `challenges`; **none** is `[]`.
- `generated/*_gen.ts` is the outlier: 692 SimDefs with `discovery` but **no beats, no predict, no observe, no reflect**. Header: "GENERATED by `backend/its/competency/simdef_compiler.py`… compiled from a teaching node's own diagnostics". 692 sims at 0% of the 5-phase pedagogy.
- `reflect` is on 3,113 of 3,815 — the 692 `generated/` sims are the entire gap.
- class1–9 is the other real gap: **475 SimDefs have `discovery` but no `predict`**, **472 have no `observe`**.

### 4.3 `validate` string audit

| Metric | Count |
|---|---|
| `validate: "<string>"` literals across all sim files | **14,197** |
| Empty `validate: ""` | **0** |
| Files with a `type: 'interact'` challenge but no `validate:` | **0** |
| Files with the loose word `interact` but no `validate:` (comment-inclusive) | 713 — false positives, the word appears in prose |

The type system already forces it: `engine/types.ts:88` `labTask?: { … validate: string; … }`; `:97` `validate: string; // validateGoal string`; `:168` `validate: string; // e.g. 'clock:hour=9,mins=0' | 'tray:count=12'`.
**Interact-validation integrity is real and enforced. This is not the thing to fix.**

### 4.4 Generator / validator scripts — `components/sims_v2/tools/*.mjs`

| Script | bytes | What it does |
|---|---|---|
| `validate_sims.mjs` | 19,579 | **The quality gate.** Transpiles `.ts/.tsx` via a `typescript` require-hook, stubs every non-relative and `@/` import, loads `LABS`/`WIDGETS`/`GENERATORS`/`LEXGEN`, then *executes* every SimDef. Exit 0 = no errors. Flags `--json`, `--class N`, `--new-only` |
| `score_sims.mjs` | 11,152 | 10.0-point rubric: structure 1.5 · teaching 2.0 (beats 1.0, ≥2 beat types 0.5, beats valid 0.5) · diagnostics 2.0 (per challenge: nodeId/hint/misconception/keyed distractors 0.25 each) · remediation 1.5 · world 1.5 · phases 1.0 (discovery 0.5, observe+predict 0.5) · retest 0.5. **Hard errors cap a sim at 4.0** |
| `build_simdefs.mjs` | 51,771 | Deterministic `md_cache` → v3 SimDef generator, classes 6–12. Deep-merges authored overlays (`authored_content.json` + `tools/authored/*.json` shards). `--dry --class N`; idempotent; never touches hand-authored files |
| `wrap_masters.mjs` | 24,275 | Wraps each `c6_12`/`c6_12_new` master in the v3 adaptive shell; generates beats + misconception-keyed challenges from the master's own `NODE_X` constants → `classN/v3w/<Comp>.ts` |
| `build_simindex.mjs` | 4,022 | Metadata-only registry → `SIM_INDEX.json` (1,154,729 bytes) so routes resolve `id → {t,c,s,n,ch}` instead of statically importing ~2,374 SimDef modules. Splits on `export const` (junior roots like `class1/maths.ts` hold many SimDefs) |
| `build_worldgraph.mjs` | 5,854 | Lays the 9,010-node corpus out as a 3D galaxy → `components/world/GALAXY.json`; class rings × subject sectors, per-chapter spirals, deterministic |
| `inject_predict.py` | 9,803 | Regex-injects `predict` blocks keyed on subject (market/ledger/election/sampler/projectile/lens …) |

**What `validate_sims.mjs` actually checks** (all `err()` call sites):
- interact validate well-formed (`:137`); target is a real widget or lab (`:139`); every key exists in the widget/lab state map (`:145`); goal value inside the slider range (`:152`)
- question non-empty (`:159`); ≥1 option (`:167`); answer present (`:168`); **answer must be in options** (`:169`); no duplicate options (`:170`)
- every `reveals` key has remediation steps (`:176`); interact without validate (`:184`); math_input without answer (`:187`); subpart with empty parts (`:189`)
- **prose answers rejected** (`:195` "add options[]"); placeholder `Steps: N` rejected (`:197`)
- mission widget exists (`:211`); scaffold problem + ≥2 steps (`:216-217`); **faded step without `blankAnswer` is uncompletable** (`:219`)
- every `case.decision` has ≥2 options, **at least one non-misconception path**, an outcome on every option (`:224-226`)
- dissect ≥2 spots, spot answer in its options (`:230-232`); build answer present (`:234`); drill kinds registered and count ≥1 (`:237-238`)
- discovery: answer in options, no duplicates, ≥2 options (`:245-247`)
- meta: title, classLevel, **`!def.challenges?.length` → 'no challenges'** (`:253-255`)
- explore lab/widget exists (`:260-262`); predict `verifyWidget` exists (`:268`)
- **generators fuzzed over 200 seeds** for degenerate/ambiguous items (`:298`)

**Environment drift in the tools:** `validate_sims.mjs:25-26` and `build_simdefs.mjs:23-24` both default to a machine-specific absolute path
`C:\Users\Alesha4285\Desktop\enhanced_nodes\md_cache` (overridable by `SIM_MD_CACHE`). The corpus all 3,815 SimDefs derive from lives outside the repo. *Whether CI exports `SIM_MD_CACHE` is not measurable without executing the scripts — out of scope for a read-only survey.*

`SIMS_V2_QUALITY.json` self-reports `"totalPlayable": 176`, `"scope": "…Class 1-6 generator-driven sims"`, perClass 29+19+24+25+25+54 = 176, verdicts PERFECT 106 / GOOD 70 / THIN 0 / BROKEN 0. **The quality JSON covers 176 of 3,815 SimDefs (4.6%).** `score_sims.mjs` exists to close that gap but its output is not committed for the full corpus.

---
## 5. BACKEND

Scanned: `backend/api/**` (23 files), `backend/routers/**` (9 files), `backend/services/**` (**105 files, 2,274,034 bytes**), `backend/config.py`, `backend/deps.py`, `backend/security.py`, `backend/main.py`.

### 5.1 Endpoint count — **255 `@router.*` decorators**

| File | endpoints | File | endpoints |
|---|---|---|---|
| `routers/solver.py` | **24** | `routers/auth.py` | 13 |
| `routers/progress.py` | 23 | `api/analytics.py` | 14 |
| `routers/content.py` | 15 | `api/verified_practice.py` | 15 |
| `routers/assessment.py` | 11 | `api/intelligence.py` | 15 |
| `routers/graph.py` | 10 | `api/teacher.py` | 11 |
| `routers/tutor.py` | 10 | `api/diagnostics.py` | 10 |
| `routers/achievements.py` | 4 | `api/practice.py` | 10 |
| `api/accessibility.py` | 4 | `api/competency_tutor.py` | 8 |
| `api/assignments.py` | 6 | `api/dashboard.py` | 6 |
| `api/chapter_tests.py` | 5 | `api/enhanced_nodes.py` | 6 |
| `api/engagement.py` | 7 | `api/homework.py` | 7 |
| `api/junior.py` | 5 | `api/preboard.py` | 4 |
| `api/student_sync.py` | 5 | `api/teacher_analytics.py` | 1 |
| `api/tutor.py` | 6 | `api/exams_adapter.py` | **0** |
| `api/_assessment_sessions.py` | **0** | `api/__init__.py`, `routers/__init__.py` | 0 |

Plus 2 hand-written routes in `main.py`: `/health` + `/api/health` (`:252-279`) and `/` (`:282-289`). **Total HTTP surface: 258.**

Dead/odd routers: `api/exams_adapter.py` (20,283 bytes) and `api/_assessment_sessions.py` (4,500 bytes) declare **0** `@router` decorators yet both are imported (`main.py:37-67`) and mounted (`main.py:244`). Their route definitions must be produced another way, or the mount is a no-op.

### 5.2 Auth handling — **132 of 255 endpoints have an auth dependency; 123 do not (48%)**

The dependency surface itself is well built: `backend/deps.py:13-47` `get_current_user` (bearer → JWT → DB lookup → `is_active` check → 403 on deactivated), `:50-64` `get_current_user_optional`, `:67-76` `require_role(role)` with an `admin` bypass. `backend/security.py` uses bcrypt (72-byte truncation at `:17`, `:25`) and PyJWT with settings-driven algorithm.

| Router | total | auth dep | **NO AUTH** |
|---|---|---|---|
| `routers/solver.py` | 24 | 0 | **24** |
| `api/intelligence.py` | 15 | 0 | **15** |
| `api/verified_practice.py` | 15 | 0 | **15** |
| `api/analytics.py` | 14 | 1 | **13** |
| `api/practice.py` | 10 | 0 | **10** |
| `routers/graph.py` | 10 | 0 | **10** |
| `api/competency_tutor.py` | 8 | 0 | **8** |
| `routers/auth.py` | 13 | 6 | 7 (register/login/verify/reset — expected) |
| `api/tutor.py` | 6 | 0 | **6** |
| `api/enhanced_nodes.py` | 6 | 0 | **6** |
| `api/accessibility.py` | 4 | 0 | **4** |
| `routers/tutor.py` | 10 | 7 | 3 |
| `api/content.py` | 15 | 14 | 1 |
| `api/dashboard.py` | 6 | 5 | 1 |
| `progress`, `assessment`, `teacher`, `diagnostics`, `homework`, `assignments`, `engagement`, `achievements`, `chapter_tests`, `preboard`, `junior`, `student_sync`, `teacher_analytics` | 94 | 94 | **0** |

Concrete unauthenticated exposure (measured):
- `api/analytics.py:94` `GET /api/analytics/student/{student_id}/stats` — **IDOR**: any caller reads any student's analytics.
- `api/analytics.py:116` `GET /api/analytics/student/{student_id}/timeline` — same shape.
- `api/intelligence.py:519` `GET /api/intelligence/confidence/{student_id}` — same shape.
- `api/student_sync.py:160,170` uses `get_current_user_optional` then `_student_id(user)` — anonymous callers still reach a stateful `POST /api/sync/{action_type}`.

### 5.3 CORS

`backend/main.py:212-218` — `CORSMiddleware(allow_origins=settings.cors_origins_list, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])`.
`config.py:187-194` — `cors_origins` defaults to `"http://localhost:3000,http://localhost:5173"`, split by `cors_origins_list`.

**Env drift, measured:** `config.py:34-40` sets `env_prefix="PLATFORM_"` and `env_file=(".env", ".env.local", ".env.development", ".env.production")`. The repo `.env` defines **unprefixed** keys: `CLICKHOUSE_URL`, `CLICKHOUSE_PASSWORD`, `JWT_SECRET`, `JWT_ALGORITHM`, `JWT_EXPIRE_MINUTES`, `CORS_ORIGINS`. Only `.env.local` uses the prefix (`PLATFORM_ENV`, `PLATFORM_DATABASE_URL`, `PLATFORM_JWT_SECRET`).
⇒ **`CORS_ORIGINS` and `JWT_SECRET` in `.env` are silently ignored**; CORS falls back to the localhost default unless the deploy exports `PLATFORM_CORS_ORIGINS`.

### 5.4 Secrets and env drift

| Finding | Evidence |
|---|---|
| **Hardcoded ClickHouse password default** | `api/analytics.py:31` `CH_PASSWORD = os.environ.get("CLICKHOUSE_PASSWORD", "dream_ch_2024")` — a working credential in source, not a placeholder |
| Hardcoded ClickHouse user | `api/analytics.py:30` `CH_USER = os.environ.get("CLICKHOUSE_USER", "dream_user")` |
| Placeholder JWT secret in source | `config.py:82-86` default `"change-me-in-production-use-a-real-secret-key-please"` — guarded only when `env == production` (`:292-305`) |
| Placeholder Neo4j password, **no validator** | `config.py:140-143` `neo4j_password` default `"change-me-in-production"` |
| `__repr__` / `model_dump` masking — done right | `config.py:364-382` masks 6 secrets in `__repr__`; `:384-393` `model_dump` excludes them |
| Env prefix mismatch | see §5.3 — `.env`'s `CORS_ORIGINS` / `JWT_SECRET` never reach `Settings` |

### 5.5 Broken `Settings` properties (will raise `AttributeError`)

`config.py` declares the field `access_token_expire_minutes` (`:88`), but:
- `config.py:277-279` — `def JWT_EXPIRE_MINUTES(self): return self.jwt_expire_minutes`. `Select-String 'jwt_expire_minutes' config.py` returns **only lines 278 and 279** — no such field exists.
- `config.py:286-287` — `def FRONTEND_URL(self): return self.frontend_url`. Same grep: **only lines 286, 287**. No such field exists.
- `config.py:250-267` — `FREELLM_API_URL/KEY/MODEL`, `GEMINI_API_KEY`, `GROQ_API_KEY` are all `getattr(self, "<name>", "")`, and the underlying `freellm_*` / `gemini_*` / `groq_*` fields are **never declared on the model**. With `extra="ignore"` (`config.py:38`) they can never be populated by pydantic either — they silently return `""`.

Note the asymmetry: `jwt_secret` has a production guard (`config.py:292-305`); `neo4j_password` (`config.py:140-143`) has **none**.

### 5.6 Error-handling consistency — **inconsistent, and there is no global handler**

`Select-String 'exception_handler|add_middleware' backend/main.py` returns **only** the CORS import (`:10`) and the CORS registration (`:212-213`). **No `@app.exception_handler`, no `RequestValidationError` handler, no `HTTPException` handler, no request-ID/logging middleware.** Every unhandled exception becomes a bare 500 with a stack trace in the log and nothing structured for the client.

| File | `HTTPException(` | `except Exception` | bare `except Exception: pass` |
|---|---|---|---|
| `api/practice.py` | 12 | **39** | **13** |
| `api/intelligence.py` | 13 | **28** | 1 |
| `api/competency_tutor.py` | 9 | 17 | **8** |
| `api/student_sync.py` | **0** | 9 | 1 |
| `routers/solver.py` | 4 | 4 | **3** |
| `api/dashboard.py` | 15 | 10 | 1 |
| `api/verified_practice.py` | 24 | 1 | 1 |
| `api/analytics.py` | 2 | 5 | 0 |

**43 bare `except Exception: pass` blocks** across `backend/api/**` + `backend/routers/**`. `api/student_sync.py` is the worst: **zero** `HTTPException` across 5 endpoints, 9 blanket catches. The best files fail loud (`verified_practice.py:74-83` raises `HTTPException(404, …)`); the worst fail silent.

### 5.7 p95-relevant risks

#### 5.7.1 N+1 queries (all confirmed by reading the loop bodies)

| Site | Cost |
|---|---|
| `api/dashboard.py:858-879` | `for student_id in enroll_rows:` → `select(User)` (`:859-861`) + `_get_service_progress` (`:870`) + `_get_service_xp` (`:874`) + `_get_service_streak` (`:878`) = **≥4 round trips per child**; `_get_service_progress` itself runs a `mastery_records ⋈ knowledge_nodes` join |
| `api/dashboard.py:1076-1079` | `for sid in student_ids:` → `select(Student).where(Student.id == sid)` — one query per student, when the id list is already in hand (`:1071`) |
| `api/dashboard.py:1086-1090` **and** `:1108-1112` | `await _get_service_progress(db, s.id)` is called **twice for the same student** in one request (subject overviews, then struggling list) — pure duplicated work |
| `api/dashboard.py:1140-1146` | `for sid in student_ids[:30]:` → one `ActivityLog` query per student (capped at 30, still 30 sequential round trips) |
| `services/streak_service.py:1016-1023` | `for sid in student_ids:` where `student_ids` = **every student in the DB** (`:1012-1013`) → 2 queries each. This is the monthly grace-day reset |
| `services/tutor_service.py:3325`, `:3349` | `for pid in prereq_ids[:10]:` / `for cs_pid in cs_prereqs[:5]:` — per-prereq query inside the tutor path |
| `api/practice.py:2087` | `for m in res.scalars().all():` inside the answer-submit path |

Every one is a sequential `await` in an `async def`, so latency scales linearly with roster size. A teacher with 200 students pays ~200+ round trips on one dashboard request.

#### 5.7.2 Sync / blocking calls inside `async def` endpoints

| Site | Call | Effect |
|---|---|---|
| `api/analytics.py:43-44`, `:61-62`, `:79-80` | `urllib.request.urlopen(req, timeout=10)` — **blocking** I/O, reached from `async def analytics_health()` (`:75`), `student_stats` (`:96`) and every other analytics route via `_ch_query` / `_ch_query_json` | Up to **10 s of event-loop block per request**, on an unauthenticated surface |
| `api/verified_practice.py:183-186` | `async def library():` → `for path in sorted(CORPUS_DIR.glob("*.json")): json.loads(path.read_text())` | Reads and JSON-parses **every corpus book, synchronously, per request** — no cache (unlike `_load_book`'s `_cache` at `:72-85`) |
| `api/verified_practice.py:677` | sync `open()` inside an async route | same class |
| `api/enhanced_nodes.py:68` | `with open(_SIM_INDEX_PATH)` in the sims lookup | on the `/sims-v2` hot path |
| `api/teacher_analytics.py:94`, `:128`, `:175` | three sync `open()` reads per request | teacher dashboard path |
| `api/student_sync.py:204` | `with open(_SYNC_LOG, "a")` append | write on the offline-sync hot path |
| `api/verified_practice.py:52` | `time.sleep(2)` — **not** in a request; it is in the boot warm-up thread (`:67-68`) | acceptable, though `_warm_solver` then runs a MiniLM solve + embed warmup on a GIL-holding thread |
| `main.py:118-120` | `_warm_nodes(); _warm_model(); _warm_engine()` run **inline before `yield`** | The comments at `:110-117` say this was deliberate ("every request hung… 100-timeout rows"); the cost is the worker does not accept traffic for the whole warmup, and the Dockerfile timeout was raised to 600 s. A documented trade — flagging, not blaming. |

---

| `api/student_sync.py` | **0** | 9 | 1 |
| `routers/solver.py` | 4 | 4 | **3** |
| `api/dashboard.py` | 15 | 10 | 1 |
| `api/verified_practice.py` | 24 | 1 | 1 |
| `api/analytics.py` | 2 | 5 | 0 |

**43 bare `except Exception: pass` blocks** across `backend/api/**` + `backend/routers/**`. `api/student_sync.py` is the worst: **zero** `HTTPException` across 5 endpoints, 9 blanket catches. The best files fail loud (`verified_practice.py:74-83` raises `HTTPException(404, …)`); the worst fail silent.

## 6. DUPLICATION

### 6.1 The two `SimPlayer.tsx` files — confirmed, quantified

| | `components/sims_v2/SimPlayer.tsx` | `components/sims_v2/engine/SimPlayer.tsx` |
|---|---|---|
| Bytes | 77,020 | 79,955 |
| Lines | **1,172** | **1,212** |
| File hash | `148D2D7A…` | `6B9A673A…` |
| `export function SimPlayer` at | line **463** | line **502** |
| `interface SimPlayerProps` at | line 46 | line 46 (identical) |
| Header comment at | line 3 | line 3 (identical) |

`Compare-Object` over the two files: **52 differing lines total — 5 present only in the root copy, 47 only in the engine copy.** So **1,167 of the root file's 1,172 lines (99.6%) appear verbatim in the engine file**; the engine file is the superset by 45 net lines.

#### Diverging regions (all inside `TeachScreen`)

| Region | Root copy | Engine copy | What differs |
|---|---|---|---|
| state | `:81-83` `const [idx,setIdx]…; const slide = def.teaching[idx];` | `:81-87` adds `const [recalling, setRecalling] = useState(false);` (`:85`) and clamps `def.teaching[Math.min(idx, len-1)]` (`:87`) | engine adds a **junior "say it back" recall beat** |
| TTS effect | `:85-88` deps `[idx, junior, slide]` | `:89-93` deps `[idx, junior, slide, recalling, def.reflect]`; speaks `def.reflect.prompts[0]` when recalling (`:90`) | engine adds recall narration |
| recall card UI | **absent** | `:95-120` — full-screen card, "🗣️ / Tell me back!", the reflect prompt, a `SpeakButton`, "I can say it! 🎤" and "Hmm, show me again 🔁" | **26 lines present only in the engine copy** |
| slide body | `:108` `<p …>{slide.text}</p>` | `:126-137` — IIFE extracting the first ≥4-char term from `slide.title`, wrapping every case-insensitive occurrence in `<strong className="bg-white/20">` | engine adds a **keyword spotlight** |
| next button | `:145-146` `last ? onDone() : setIdx(i => i + 1)`, label `{last ? (def.explore ? "Let's Play! 🎮" : "Let's Go! 🚀") : 'Next →'}` | `:145-147` same, but `last ? (junior && def.reflect?.prompts?.length ? setRecalling(true) : onDone())` and label `… ? 'Tell me! 🗣️' : …` | engine routes juniors into the recall card |
| TTS language | **absent** | `:508` `useEffect(() => { speechManager.setLang(def.subject === 'hindi' ? 'hi' : 'en'); }, [def.subject]);` | engine sets `hi-IN` for Hindi sims |

#### Which one is live?

`Select-String 'SimPlayer'` over `app/`, `components/`, `lib/` returns **3 import sites, all of them the engine copy**:
- `app/(student)/sims-v2/[id]/page.tsx:7` → `@/components/sims_v2/engine/SimPlayer` (used at `:170`)
- `components/learn/InlineSim.tsx:15` → `@/components/sims_v2/engine/SimPlayer` (used at `:98`)
- `components/story/StoryMode.tsx:1625-1626` → `dynamic(() => import('@/components/sims_v2/engine/SimPlayer')…)` (used at `:1793`)

**`components/sims_v2/SimPlayer.tsx` has ZERO importers.** It is 77 KB of dead code that is a strict subset of the engine file — and it is *behind* on all three teaching improvements. The safe move is delete-and-verify (`tsc --noEmit | grep sims_v2/SimPlayer`), not a merge.

### 6.2 Byte-identical file pair

`components/sims_v2/types.ts` and `components/sims_v2/engine/types.ts` are both 13,087 bytes and both hash to `B462B83230A76018C8C110CE6597898A937257282ECD7C6B6213DE0D3341ADFA`. **Identical to the byte.** Any edit must be applied twice or the two will drift.

### 6.3 Other duplicated components (grouped by basename across `components/` and `lib/`)

| Basename | Copies | Sizes | Notes |
|---|---|---|---|
| `KnowledgeGraph3D.tsx` | `components/premium/` + `components/prism/` | 5,510 / 14,506 | divergent, both live |
| `TiltCard.tsx` | `components/` + `components/premium/` | 3,144 / 2,442 | divergent |
| `SimulationEngine.ts` | `lib/game-engine/` + `lib/sim-framework/` | 17,294 / 8,618 | two sim engines |
| `SimulationRegistry.ts` | `lib/c68/` + `lib/sim-framework/` | 44,439 / 1,323 | two sim registries |
| `MasteryStore.ts` | `lib/game-engine/MasteryStore.ts` + `lib/masteryStore.ts` | 3,861 / 9,557 | two mastery stores |
| `lab3d` | `sims_v2/engine/lab3d.tsx` + `components/world/lab3d/Lab3D.tsx` | 67,416 / 1,856 | — |
| `science.ts` | `sims_v2/class6/science.ts` + `sims_v2/shared/science.ts` | 97,730 / 15,302 (667 vs 179 lines) | overlap not quantified |

### 6.4 The largest fork: `components/simulations/c6_12` vs `c6_12_chem_upgraded`

`components/simulations/**` = **1,034** `.ts`/`.tsx` files. `c6_12` alone = **734 files / 58,016,014 bytes** (732 top-level `.tsx`).
`c6_12_chem_upgraded` = **56 files / 5,600,672 bytes**, and **56 of its 56 basenames also exist in `c6_12`** — a 100% name-overlapping fork. Sample divergence (same filename, different implementations):

| File | `c6_12` | `c6_12_chem_upgraded` | delta |
|---|---|---|---|
| `C9_ChemistryCovalentbondingSim.tsx` | 9,004 | 117,069 | **+108,065** |
| `C9_ChemistryAcidraincompositionandcausesSim.tsx` | 75,071 | 101,896 | +26,825 |
| `C8_ChemistryWaterpropertiesandcompositionSim.tsx` | 76,768 | 93,133 | +16,365 |
| `C9_ChemistrySoftwaterandhardwaterSim.tsx` | 91,109 | 106,643 | +15,534 |

Class 1–5 game packs are likewise forked per class: `AnimalsGame.tsx` class1/2 (36,133 / 42,309), `PlantsGame.tsx` class1/2/3 (36,418 / 42,862 / 41,997), `NumbersGame.tsx` class2/3/4 (37,201 / 38,305 / 39,830), plus `AddSubGame`, `MulDivGame`, `WaterGame`, `MeasurementGame`, `PatternsGame`, `ComputerBasicsGame`. These are *intentional* per-class forks, but nothing marks them as such and nothing checks them for drift.

### 6.5 Orphan `.raw` twins in `frontend/lib/`

| `.raw` | bytes | live sibling | bytes |
|---|---|---|---|
| `offlineCache.ts.raw` | 20,304 | `offlineCache.ts` | 19,495 |
| `offlineManager.ts.raw` | 65,733 | `offlineManager.tsx` | 63,266 |
| `performance.ts.raw` | 27,063 | `performance.tsx` | 25,650 |
| `theme.ts.raw` | 87,541 | `theme.tsx` | 85,276 |

**277,641 bytes** of near-duplicate source sitting in the import path tree with no import referencing `.raw`.

---

## 7. NOT MEASURABLE (explicitly out of reach, read-only)

| Question | Why |
|---|---|
| Does `validate_sims.mjs` currently pass? | Requires executing Node + the `typescript` transpile-hook (`tools/…:31-100`) — running tooling, out of scope |
| Does `score_sims.mjs` currently pass? | Same |
| Is production actually setting `PLATFORM_CORS_ORIGINS` / `PLATFORM_JWT_SECRET`? | A recursive scan of `deploy/` timed out; the answer lives in the runtime env, not the repo |
| Are the two `SimPlayer.tsx` files behaviourally identical for juniors? | Requires runtime rendering |
| Real p95 latency | Needs a load run; the "100-timeout rows" history in `main.py:110-117` is a comment, not a reproducible measurement |
| Bundle size / build output | Requires `next build`; forbidden here |
| Whether the `.raw` twins are referenced from outside `frontend/lib/` | A repo-wide scan over 13,306 uncommitted entries exceeds the read timeout |

---

## 8. ONE-PAGE PRIORITISED READ

| Rank | Fix | Why first | Measurable target |
|---|---|---|---|
| 1 | Delete the 19 junk routes (§1.2, §1.3) | 0 risk, ~3,860 lines and ~232 KB gone from the client bundle | 95 → 76 `page.tsx` |
| 2 | Delete `components/sims_v2/SimPlayer.tsx` (§6.1) | 0 importers; removes 77 KB that is *behind* the live engine on 3 teaching features | `Select-String 'sims_v2/SimPlayer'` → 0 |
| 3 | Add `learningObjective` + `boardRef` + `tier` + `auditTrail` to `SimDef` and `Enrichment` (§3, §4) | The single biggest "10/10 vs not" gap. `validate_sims.mjs` already has the harness — one new required-field check | `tier:` 4 → 3,815 files; `objective:` 14 → 3,815 |
| 4 | Add auth to the 123 unauthenticated endpoints (§5.2) | `analytics.py:94/:116` and `intelligence.py:519` are live IDORs on student data | 132/255 → 255/255 |
| 5 | Fix the 3 broken `Settings` properties and the `.env` prefix drift (§5.3, §5.5) | `JWT_EXPIRE_MINUTES` / `FRONTEND_URL` raise `AttributeError`; `CORS_ORIGINS` is silently ignored | 0 properties referencing undeclared fields |
| 6 | Kill the 7 N+1 loops in `dashboard.py` / `streak_service.py` (§5.7.1) | Roster-size-proportional latency on the two most-used dashboards | `dashboard.py:1076` = 1 query, not N |
| 7 | Move the blocking `urllib` calls in `api/analytics.py` off the event loop (§5.7.2) | 10 s event-loop stalls per request | 0 blocking calls in `async def` |
| 8 | Add `@app.exception_handler` + request-ID middleware (§5.6) | 43 silent `except Exception: pass` blocks are currently invisible | 1 global handler; 43 bare passes removed |
| 9 | Add the 2-wrong rescue + review interleave to `learn/[topicId]` (§2.2) | The learning loop is 10/10 on practice and 0/10 on learn | `Select-String 'rescue' learn/[topicId]/page.tsx` → >0 |
| 10 | Give the 692 `generated/` sims beats/predict/observe/reflect (§4.2) | 18% of the corpus ships with 1 of 5 pedagogy phases | `generated/` beats 0% → ≥75% |
| 11 | Delete the 4 `.raw` twins; unify `types.ts` (§6.2, §6.5) | 277 KB + one byte-identical file pair that will drift on the first edit | 4 `.raw` files gone; 1 copy of `types.ts` |
| 12 | Commit `score_sims.mjs` output for the full corpus (§4.4) | The quality JSON covers 176 of 3,815 SimDefs (4.6%) | 4.6% → 100% |

### Leave alone

- The SM-2 interleave + 2-wrong rescue in `app/(student)/practice/page.tsx` (§2.1, §2.2) — measured, honest-labelled, server-scheduled.
- The "why you were wrong" stack (§2.3) — three layers with an explicit non-invented fallback.
- `validate_sims.mjs`'s interact/`validate` enforcement (§4.3) — 14,197 validate strings, 0 empty, 0 missing on interact challenges.

These are better than anything being proposed to replace them.

---

*End of survey. No file in `D:\platform` was created, modified, or deleted other than this document.*
