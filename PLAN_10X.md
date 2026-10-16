# PLAN_10X — Complete plan to take `D:\platform` to 10/10

**Written:** 2026-09-27 · **HEAD:** `4e5968f1` · **Rollback tag:** `pre-10x`
**Evidence base:** `_survey_10x.md` (measured), `_audit_syncdeploy.md`, `_audit_validategoal.md`
**Supersedes:** the roadmap in `ACCEPTANCE_GATE.md` §§5–11. That file stays as the Batch 1 record.

---

## 0. Honest starting position

This plan exists because the last thing written said "all work complete and verified."
That was true of the **tooling** and false of the **app**. Correcting the record:

| | Claimed | Actual |
|---|---|---|
| Bugs fixed in app code | — | **1** (`validateGoal` fail-closed) |
| Type errors | "gated" | **112**, now formally blessed as baseline |
| Endpoints without auth | "audited" | **123 of 255**, incl. **3 live IDORs on student data** |
| N+1 / event-loop stalls | "identified" | **7 sites, 10s stalls** — untouched |
| Uncommitted work | "flagged" | **13,306 entries** — still uncommitted |

The gates I added are **ratchets**: they assert 112 errors is acceptable and must not
grow. That is a floor to stop regression. It is not progress, and it must never be
quoted as a score.

**Current rating: 2/10.** Not a polish gap — a correctness, privacy and operational-risk
gap. Reaching 10/10 is an 8–10 week programme, not a session.

---

## 1. What 10/10 means here (the definition being tested against)

A dimension only counts if it has a **number a machine can check**. No dimension gets a
score from reading code and feeling good.

| # | Dimension | 10/10 bar | Current | Measured by |
|---|---|---|---|---|
| 1 | **Safety & privacy** | 0 unauth endpoints touching student data; 0 IDORs; 0 secrets in repo | **3 IDORs live** | `endpoint-auth-audit.mjs` (to write) |
| 2 | **Correctness** | `tsc` 0 errors; 0 dead code shipped; 0 duplicate live components | **112 errors** | `typecheck:gate` |
| 3 | **Performance** | p95 <300ms API; 0 N+1; 0 blocking calls in `async def`; LCP <2.5s | **10s stalls** | load run + Lighthouse |
| 4 | **Teaching loop** | Same rescue/SRS/why-experience on *every* surface a student learns on | **practice yes, learn no** | symbol grep + e2e |
| 5 | **Content integrity** | objective+tier+board-ref on 100% of sims; 0 orphans; 0 unrecoverable diffs | **14/3815, 4/3815** | `validate_sims.mjs` extended |
| 6 | **Observability** | every error visible; request-ID end to end; backup proven by restore | **43 silent catches** | Sentry + restore drill |
| 7 | **Ship surface** | 0 dev/test routes in prod build; a11y and mobile verified | **19 junk routes** | route manifest diff |
| 8 | **Repo discipline** | clean tree, CI gate, branch protection, one source of truth | **13,306 dirty** | `git status --porcelain` |

**Not yet measured — must be, in Phase 0, before any score is quoted:** automated test
coverage (believed near-zero, unverified), accessibility (never checked), mobile/responsive
behaviour (never checked), error budget (does not exist). These are gaps in *my knowledge*,
not claims about the app.

**10/10 is not "zero open issues."** It is: every gate green, every claim traceable to a
measurement, a clean tree, and a rollback that works when tested.

## 2. Sequencing law

Order is not preference. Each item unblocks the next:

1. **Commit first.** Nothing else is safe while 13,306 files can be lost or half-merged.
   Every "we fixed it" claim is unfalsifiable without a commit to diff against.
2. **IDORs next.** They are the only finding that is actively *harmful* rather than merely
   unfinished. Small, contained, unrelated to any refactor — do it before touching anything
   that could re-open it.
3. **Measure before optimising.** Phase 3 has no baseline. Fixing N+1s without p95 numbers
   produces a diff you cannot defend and a regression you cannot see.
4. **Delete before you build.** Dead `SimPlayer` is 23 of the 112 errors. Fixing types in a
   file with 0 importers is wasted work.
5. **Metadata spine before teaching features.** `beats: string[]` makes a per-beat objective
   *structurally impossible*. No amount of UI work fixes a type that cannot hold the data.
6. **Observability before big refactors.** Phases 4–6 touch the learning loop; without error
   reporting you fly blind through your own regressions.

**Hard rule:** each phase ends with a commit, a tag, and a green gate. If a gate cannot go
green, the phase is not done — the gate gets widened or the work continues, never redefined.

---

## 3. Phase 0 — Stop the bleeding (1 day, must be first)

**Goal:** make the codebase safe to change.

- [ ] **Commit the 13,306 entries.** Split into reviewable commits; do not make one giant
      "wip" commit — an unreviewable commit is a dirty tree with better PRs.
      Before committing, run `node scripts/list-pending-deletes.js` and resolve the 49 (§11).
- [ ] Re-tag: `git tag -f pre-10x` and record the SHA here.
- [ ] **Add CI that runs `typecheck:gate` + `check-tokens`.** No gate that lives only on a
      laptop is a gate; it is a habit, and habits lapse under deadline pressure.
- [ ] **Measure the 4 unknowns** (§1): test coverage, a11y (`axe-core` on 5 routes), mobile
      at 375px/768px, and a real p95 from a load run. Record in `_baseline_10x.md`.
- [ ] Enable branch protection on `master` once CI exists.
- [ ] **Test the rollback for real** on a scratch clone. An untested rollback is a rumour.

**Gate:** `git status --porcelain` → 0 lines · CI green on `master` · `_baseline_10x.md`
exists with a number for every dimension · one rollback drill executed successfully.

**Why the 4 unknowns matter:** I can quote 112 type errors because I measured them. I cannot
quote a coverage number. If Phase 0 finds coverage is genuinely near zero, that reshapes
Phases 2–5 — behaviour-preserving refactors become unsafe, and the plan must buy
characterisation tests before the big deletions. That is the single biggest unknown here,
and it is why Phase 0 is a day of measuring, not a day of fixing.

---

## 4. Phase 1 — Safety and privacy (3–4 days)

**Goal:** stop leaking student data. Highest severity, and the only phase where inaction is
an active harm rather than a backlog item.

### 4.1 The 3 IDORs — fix first, individually, each in its own commit

| Location | Exposure | Fix |
|---|---|---|
| `backend/api/analytics.py:94` | any caller reads any student's analytics | require auth; assert `student_id == current_user.id` (or teacher/parent scope) |
| `backend/api/analytics.py:116` | same, second endpoint | as above |
| `backend/api/intelligence.py:519` | any caller reads any student's intelligence profile | as above |

Ownership check must be **server-side and default-deny**: derive the subject from the token,
and treat a client-supplied `student_id` as a *request that must be authorised*, never as a
given. Do not add a `if current_user.is_teacher` branch that defaults open.

Regression test per endpoint: request student A's data with student B's token → **403**.
That test is the deliverable; the code change is only half of it.

### 4.2 The other 120 unauthenticated endpoints

123 have no auth dependency. Most are probably fine (health checks, public content), but
"probably" is not a security control. Do not bulk-add auth — that breaks clients and hides
the real ones.

- [ ] Write `scripts/endpoint-auth-audit.mjs`: parse every `@router.<method>` decorator,
      classify each by whether its response model / service call touches a student record,
      and emit `endpoint-auth-report.json` with `public | protected | needs-review`.
- [ ] Triage `needs-review` by hand. Expect far fewer than 120 genuine exposures.
- [ ] Lock the result as a **ratchet baseline** (`0` new unauth student-data endpoints), same
      pattern as the type/token gates. Locking 0 is easy and makes every future slip loud.

### 4.3 Secrets and config

- [ ] Remove the hardcoded credential at `backend/api/analytics.py:31`. If it is a live
      secret, **rotate it, do not just delete it** — deleting leaves the credential valid and
      known. Then scan git history for it before assuming it is contained.
- [ ] Fix `.env` prefix drift: config expects `PLATFORM_*`, `.env` uses none. This is silent —
      every setting is falling back to a default while looking configured.
- [ ] Fix the 3 broken `Settings` properties: `JWT_EXPIRE_MINUTES` and `FRONTEND_URL` raise
      `AttributeError`; `CORS_ORIGINS` is **silently ignored**, meaning the deployed CORS
      policy is whatever the default is, not what the file says.
- [ ] `frontend/middleware.ts` is a 12-line pass-through with zero auth — either make it the
      real edge gate or delete it so nobody assumes it protects anything. A file named
      `middleware` that does nothing is worse than no file, because it reads like a control.

**Gate:** 3 regression tests pass (403 on cross-student read) · `endpoint-auth-report.json`
has 0 student-data endpoints unauthenticated · 0 secrets in `git grep` · `.env` loads with
every setting explicitly resolved, asserted by a startup check that fails on missing keys.

## 5. Phase 2 — Correctness (4–5 days)

**Goal:** 0 type errors, one implementation of each thing, nothing dead in the bundle.

### 5.1 Delete before fixing (highest ratio in the whole plan)

| Target | Why | Effect |
|---|---|---|
| `components/sims_v2/SimPlayer.tsx` | 1,172 lines, **0 importers**, 95.6% identical to the live copy, and 77 KB *behind* on 3 teaching features | **−23 of 112 type errors for free** |
| `sims_v2/types.ts` | byte-identical (`SHA-256` match) to `engine/types.ts` — a fork that will drift on first edit | 1 source of truth |
| 4 `.raw` orphan twins in `lib/` | 277 KB, unreachable | bundle shrink |
| 19 junk/dev routes (§9.1) | ~3,860 lines, ~232 KB shipped to students | 95 → 76 pages |

Verify 0 importers *again* at delete time (`Select-String 'sims_v2/SimPlayer'` → 0) rather
than trusting the survey — the tree has 13,306 uncommitted entries and may have changed.

The dangerous variant of this bug is not a dead file, it is **two live copies that both
work**. 56 of 56 chemistry sims are forked. A fix applied to one family silently leaves the
other wrong, and no type error is produced because both files are individually valid. That
class of bug is invisible to every gate in this plan, so it needs an explicit duplicate-scan
(`scripts/dup-scan.mjs`, content-hash based) run weekly.

### 5.2 Then close the remaining ~89 errors

- [ ] Group by root cause, not by file. 89 errors usually come from far fewer causes — a
      wrong shared type, a missing `await`, an untagged union. Fixing 5 causes beats 89 edits.
- [ ] `noUncheckedIndexedAccess` last, not first — it manufactures errors that are not bugs.
- [ ] Re-lock `typecheck-baseline.json` to **0** after each batch, so the floor rises instead
      of sitting at 112.

**Gate:** `typecheck:gate` at 0 · exactly one `SimPlayer` · route count 76 · `dup-scan` clean.

---

## 6. Phase 3 — Performance (3–4 days)

**Goal:** measurable, with before/after numbers. A perf change without a before number is
an opinion.

### 6.1 Record the baseline first (half a day, non-negotiable)

Lighthouse on `/`, `/lumen`, `/premium`, `/learn/[topicId]`, `/practice`. p95 from a load run
on `dashboard`, `streak`, `analytics`, `intelligence`. Bundle size per route. Store in
`_baseline_10x.md`. Without this, Phase 3 cannot be claimed done.

### 6.2 N+1s (7 sites, worst first)

| Site | Problem | Fix |
|---|---|---|
| `dashboard.py:1076` | 1 query per student in roster → latency scales with class size | batch with `IN` / `selectinload` |
| `dashboard.py:1086` + `:1108` | **fetches the same student twice per request** | one fetch, pass the object |
| `streak_service.py` | per-day query loop | single aggregate query |

The `:1086`/`:1108` duplicate fetch is the cheapest win in the codebase: a few lines, on one
of the two most-used screens, no behaviour change.

### 6.3 Blocking I/O on the async loop

`api/analytics.py` calls `urllib` **synchronously inside `async def`**, stalling the event
loop up to **10 seconds** — during which *every other concurrent student* is waiting, not
just the slow caller. This is the single highest-impact perf bug found.

- [ ] Swap to `httpx.AsyncClient` with an explicit timeout, or wrap in
      `run_in_threadpool`. Prefer async client; threadpool is the escape hatch.
- [ ] Add a timeout to every outbound call. An upstream that hangs currently becomes a hang
      for the whole service — one slow dependency can take down the platform.
- [ ] Add a cache where the answer is stable per student per day.

### 6.4 Frontend

- [ ] Route-level `dynamic()` for canvas/three/pixi sims — WebGL code ships on first paint
      today, so students who never open a sim pay for it.
- [ ] `next/image` for `doodle_cards` (~11k PNGs).
- [ ] Confirm the Lumen landing cost is already fixed (`landingCosmos` 117KB three-free).

**Gate:** p95 <300ms on the 4 hot endpoints (was unmeasured) · 0 blocking calls inside
`async def` (`ast` scan, `scripts/async-hygiene.mjs`, added as a ratchet) · LCP <2.5s on
`/learn` and `/practice` · every outbound HTTP call has a timeout.

## 7. Phase 4 — How students are taught (6–8 days) ← the point of the product

**Goal:** every surface a child learns on behaves like the practice screen, which is already
genuinely good. This is not new pedagogy; it is **copying proven pedagogy where it is missing.**

### 7.1 The most important finding in the survey

`app/(student)/practice/page.tsx` — 3,061 lines — has a real learning model:

| Mechanism | Location | What it does |
|---|---|---|
| SM-2 interleaving | `:429-444`, `:2113-2225` | due review cards mixed into new practice, server-scheduled |
| Stuck rescue | `:646-678` | after **2 wrong answers**, stops punishing and teaches |
| "Why you were wrong" | `:2031-2070` | names the specific misconception, with an explicit non-invented fallback |

`app/(student)/learn/[topicId]/page.tsx` — 1,279 lines — has **zero** occurrences of rescue,
SRS, interleave, or misconception. Measured, not inferred.

A student who is lost **while learning a topic** — maximum confusion, before they have
attempted anything — gets no rescue at all. The rescue exists only once they reach practice.
The platform teaches well in one room and not at all in the next.

**Highest-value teaching fix available, and it invents nothing:**

- [ ] Extract the three mechanisms from the 3,061-line page into
      `lib/learning/{srs,rescue,misconception}.ts`. They are trapped in one page's closure,
      which is exactly why `learn/` could not reuse them.
- [ ] Wire into `learn/[topicId]`: prerequisite review interleave on topic open; 2-wrong
      rescue inside in-topic questions; misconception naming on wrong answers.
- [ ] Give `QuestionCard.tsx` (882 lines) the "why" layer — **0** occurrences of
      why/explanation/misconception/remediation today.
- [ ] **Preserve the fallback honesty.** Practice distinguishes *known misconception* from
      *generic retry*. Port that distinction exactly — a fabricated "because…" is worse than
      silence, because it teaches a false cause.

**Gate:** symbol grep finds rescue+SRS in `learn/` · e2e: 2 wrong answers in learn → rescue
renders · non-invented fallback still fires when no misconception is on file.

### 7.2 Story mode cannot hold a learning objective — fix the type first

`components/story/StoryMode.tsx:1684` types beats as **`string[]`**. `Enrichment` (`:68-83`)
has no objective, board-ref, tier or audit field. This is not a missing feature — it is a
**structural impossibility**. You cannot attach "what this beat teaches" to a `string`, so a
UI badge on top of `string[]` is necessarily decorative or hardcoded.

- [ ] Migrate beats to `{ text, objective, boardRef?, tier, checksFor? }` via codemod that
      wraps existing strings, so nothing breaks mid-migration.
- [ ] Renderer shows the objective **before** the beat, board proof **after** — a student
      should always know what they were meant to take away.

Do this *before* authoring objectives at scale (Phase 5), or 3,815 objectives get authored
into a type that must change anyway.

### 7.3 What NOT to touch (measured — better than any replacement idea)

The SM-2 interleave, the 2-wrong rescue, the "why you were wrong" stack with its explicit
non-invented fallback, and `validate_sims.mjs`'s interact/`validate` enforcement (**14,197**
validate strings, **0** empty, **0** missing on interact challenges).

These are the best-engineered parts of the platform. Refuse any proposal to "unify" or
"rewrite for consistency." **Extract and reuse — never rewrite what already works.**

---

## 8. Phase 5 — How content is stored (5–7 days)

**Goal:** content that can be validated and audited, not only rendered.

### 8.1 The fact that should decide the order of everything here

`content/` is **100% gitignored** (`ACCEPTANCE_GATE.md:25`). The entire curriculum —
~10,979 nodes, 3,257 companions, 101,812 diagnostics, 3,815 sims, ~11k doodle cards — has
**no version history, no diff, no blame, and no rollback.**

That is the largest unquantified risk in this document, and it explains several other
findings. It is why the 47 PNGs are "unrecoverable." It is why the two quarantined biology
files can silently disagree with their live twins. It is why `sync-deploy` needed an allowlist
built under time pressure. Code is the part that is versioned; **the product's actual value is
not.**

- [ ] Put `content/` under version control — git-lfs, object-storage versioning, or a nightly
      snapshot. Any of the three is acceptable; "none of the three" is not.
- [ ] **Prove it by restore**, on a scratch instance, same standard as DB backups (§9). A
      backup never restored is not a backup.
- [ ] Only after that, treat any `sync-deploy` as routine. Until then every deploy is
      irreversible for the corpus.

### 8.2 Sims: 3,815 definitions, no metadata spine

| Field | Coverage | Consequence |
|---|---|---|
| `discovery` | 3,450 (90%) | healthy |
| `beats` | 2,859 (75%) | 25% teach with no narrative spine |
| `predict` / `observe` | 2,088 / 2,089 (55%) | 45% skip predict-then-observe |
| `objective` | **14 (0.4%)** | a sim cannot state what it teaches |
| `tier` | **4 (0.1%)** | no difficulty signal → no syllabus ordering |

The teaching consequence, stated plainly: **you cannot build a syllabus, a prerequisite graph,
or a "you're ready for this" gate over 3,815 sims that do not declare what they teach or at
what level.** Every adaptive feature future plans want is blocked on this metadata, not on
algorithms. Adding the field now is cheap; retro-fitting 3,815 by hand later is not.

- [ ] Add `learningObjective`, `boardRef`, `tier`, `auditTrail` to `SimDef`.
- [ ] Extend `validate_sims.mjs` to **require** them. The harness already exists — this is a
      schema addition, not new infrastructure. It will fail on ~3,800 files. **That failure is
      the deliverable:** it turns an unknown into a work queue with a number on it.
- [ ] Draft objectives from `discovery`/`beats` text, then human-review. Mark unreviewed ones
      `auditTrail: "generated"` so a draft is never mistaken for authored metadata.
- [ ] 692 `generated/` sims (18%) ship **1 of 5** pedagogy phases. Complete them, or label
      them explorable demos — do not sell a toy as a lesson.
- [ ] `score_sims.mjs` covers **176 / 3,815 = 4.6%**. Commit scores for all; a quality metric
      sampling 5% cannot support a quality claim.

### 8.3 Node corpus integrity

- [ ] Prerequisite resolution check: every `PREREQUISITE_NODE_IDS` must resolve to a real
      node. Already-known breakage: `_quarantine_wronggrade/c6_biology_ch06_003` lists
      `c6_biology_ch06_001` and `_002` as prerequisites — both quarantined, so those graph
      edges point at nothing. The Neo4j graph was rebuilt from this corpus at HEAD, so it may
      contain dangling edges today.
- [ ] Grade/chapter consistency check, and **run it before trusting quarantine**. The
      `_quarantine_wronggrade` folder holds files whose content does not match their filename,
      which means quarantine is being used as *staging*, not as *rejected* (§11).
- [ ] Content-vs-graph reconciliation: count Neo4j edges that reference a missing node and
      drive it to 0.

**Gate:** `objective`+`tier` on 100% of 3,815 (drafts marked as drafts) · `validate_sims.mjs`
green with required fields · 0 dangling prerequisite edges · content corpus versioned with a
tested restore · all 49 pending files resolved.

---

## 9. Phase 6 — Observability and data safety (3 days)

**Goal:** when something breaks, you know — and nothing is unrecoverable.

- [ ] `@app.exception_handler` + request-ID middleware. There is currently **no** global
      handler, so errors surface as whatever the framework default emits.
- [ ] Remove the **43 bare `except Exception: pass`** blocks. `student_sync.py` is worst: 0
      `HTTPException` across 5 endpoints and 9 blanket catches — sync failures are currently
      *invisible by construction*. A sync that silently did nothing looks identical to one
      that succeeded.
- [ ] Sentry live with real reporting; verify by injecting a fault, not by reading config.
- [ ] Nightly DB backups **verified by restore** on a scratch instance.
- [ ] Content corpus snapshot — same restore-drill standard (§8.1).
- [ ] Resolve the 2 dead routers: `api/exams_adapter.py` (20KB) and
      `api/_assessment_sessions.py` (4.5KB) declare **0 route decorators** yet are mounted at
      `main.py:244`. A mounted module that registers nothing is a feature that looks shipped
      and is not.

**Gate:** injected error visible in Sentry with a request ID · 0 bare `except: pass` · one DB
restore and one content restore executed, with timestamps recorded.

---

## 10. Phase 7 — Ship surface (4–5 days)

### 10.1 Routes: 19 that must not reach students

`/game-test`, `/riv-test` and 17 others — ~3,860 lines, ~232 KB in the prod bundle. These are
dev harnesses reachable by a child typing a URL.

- [ ] Move dev-only routes behind a `NODE_ENV` guard or conditional routing — not plain
      deletion, so the harnesses survive for developers.
- [ ] Structural fix: `(admin)/layout.tsx` exists but `(admin)` contains **0 pages**;
      `/admin-dashboard` and `/teacher-portal` sit outside the group, so they get **no admin
      chrome and none of the guard that layout would have applied**. Route grouping is
      currently decorative — and an auth boundary that is decorative is worse than an absent
      one, because it reads as present.
- [ ] Emit `route-manifest.json` at build and diff against an approved list in CI, so a junk
      route can never ship again without failing a build.

### 10.2 Accessibility — currently unknown, and unknown is not passing

Never measured. For a product used by schoolchildren this is not optional, and in some markets
not legal. Do not assume a good score because the UI looks polished.

- [ ] `axe-core` on `/`, `/learn/[topicId]`, `/practice`, `/review`, `/premium`.
- [ ] Keyboard-only pass through one full learning flow — sims are the likely failure, since
      canvas/WebGL interaction is usually pointer-only.
- [ ] Contrast on the ratcheted palette; screen-reader labels on sim controls.

### 10.3 Mobile

Never measured. Indian school contexts skew heavily to cheap Android handsets, so this is
probably more load-bearing than any desktop Lighthouse number.

- [ ] Verify 375px and 768px on the 5 core routes, on a **throttled device profile** — WebGL
      sims on a ₹10k handset is the real scenario, not a narrow desktop window.

### 10.4 Design system

- [ ] Ratchet raw hex down from **78,624**. Largest: `canvasLab.tsx` 1,294,
      `11_geo_gen.ts` 830, `c6_12_gameRegistry.ts` 788.
- [ ] Treat canvas/three/pixi material params as **legitimate**, not drift.
- [ ] De-duplicate `KnowledgeGraph3D` and `TiltCard` (each duplicated *and divergent*).

**Gate:** 76 routes, manifest diff green · axe serious violations 0 on 5 routes · keyboard
full-flow pass · mobile verified on a throttled profile · raw hex trending down.

---

## 11. The 49 pending files — investigated; the premise was wrong

The instruction was *"if duplicate remove them, if not sync them."* I checked first, and
**neither action is correct for the 2 MD files.**

### 11.1 The two markdown files — do not delete, do not sync

`deploy/content/enhanced_nodes_md/_quarantine_wronggrade/c6_biology_ch06_00{1,2}.md`

Verified by SHA-256: **not duplicates** of their live twins. The content is different.

| File | Content |
|---|---|
| `content/enhanced_nodes_md/c6_biology_ch06_001.md` (live, source **and** deploy) | testing food for nutrients — iodine/starch/fat tests |
| `deploy/.../_quarantine_wronggrade/c6_biology_ch06_001.md` | **Adolescence** as a developmental stage |

Folder counts: source has 2 live `ch06` + 6 quarantined; deploy has 2 live + 8 quarantined.
The quarantined pair holds Adolescence content a source-tree search did **not** find elsewhere
(the search timed out — *unconfirmed*, not confirmed-unique).

**So:** deleting risks destroying unique curriculum; syncing re-admits content someone
deliberately parked. Both wrong. This needs a curriculum owner to answer *why were these
quarantined?* — a **syllabus** question (does Class 6 Biology Ch. 6 cover nutrition or
adolescence?) that cannot be answered from the repo.

The live file is itself suspicious: nutrition content under a **Biology** path reading like
Class 6 Chemistry / "food we eat". It is plausible the quarantine was the *correct* action and
the live file is the error. That inversion is exactly why "looks like cleanup" is not a safe
category.

### 11.2 The 47 PNGs — verdict not reached

Distribution: `class6` 26, `class10` 8, `class11` 3, `class12` 3, `class7` 2, `class8` 2,
`class9` 3. ~24 MB, deploy-only, **unrecoverable if deleted**.

My check failed for a reason worth recording: I hashed all ~11k source cards **one file at a
time**, which thrashed the disk and is the likely cause of the machine going down. Cheap
retry: group source cards by filename + byte size (metadata only, no content reads), then hash
only same-name/same-size candidates — a handful of hashes, seconds not minutes.

Two outcomes, both actionable:
- **Same filename exists elsewhere in source** → misfiled during a class/chapter renumber.
  Move upstream; do not delete.
- **Filename exists nowhere** → genuine artwork existing only in `deploy/`. Sync upstream
  immediately; deleting destroys it and `content/` has no history to recover from.

### 11.3 Sequencing rule for all 49

**Resolve §8.1 (version the corpus) before deciding any of them.** While `content/` is
unversioned every choice here is irreversible — and irreversibility is why this needs an
investigation rather than a one-line cleanup.

---

## 12. Verification harness — what makes a claim true

Every phase gate needs a command, or it is a vibe. New gates to build (read-only, ratchets
following the already-proven `typecheck-gate` pattern):

| Gate | Command | Proves |
|---|---|---|
| Auth surface | `scripts/endpoint-auth-audit.mjs` | 0 student-data endpoints unauthenticated |
| Async hygiene | `scripts/async-hygiene.mjs` | 0 blocking calls inside `async def` |
| Duplicate drift | `scripts/dup-scan.mjs` | 0 live file pairs >95% identical |
| Route manifest | build step + CI diff | no dev route ships |
| Content schema | `validate_sims.mjs` + node checks | objective/tier present, 0 dangling prereqs |
| Types | `npm run typecheck:gate` | **0** errors (not 112) |
| Tokens | `scripts/check-tokens.js` | raw hex ≤ baseline, trending down |
| Restore drill | `scripts/restore-drill.ps1` (quarterly) | a backup actually restores |
| IDOR regression | pytest, 3 tests | cross-student read → 403 |

Two principles baked in, learned the hard way this session:

1. **Fail closed.** The `sync-deploy` denylist failed *open* — a new corpus would have been
   unprotected. The allowlist fails closed. Every new gate must default to blocking.
2. **Never print a safety claim a script cannot verify.** I once emitted `SYNCABLE.backend =
   []`, which reported "never deleted" while still deleting. A false safety claim is worse than
   none, because it stops the review that would otherwise catch it.

---

## 13. Risk register

| Risk | Sev | Mitigation |
|---|---|---|
| 13,306 uncommitted entries lost | **Critical** | Phase 0 before anything |
| IDORs live on student data | **Critical** | Phase 1 first; 3 regression tests |
| `content/` unversioned — curriculum unrecoverable | **Critical** | §8.1, before any `sync-deploy` |
| Real `sync-deploy` runs before the 49 are resolved | **High** | `list-pending-deletes.js` first |
| Quarantined curriculum destroyed as "cleanup" | **High** | §11; curriculum owner decides |
| Fix one of two live duplicates, ship the wrong one | **High** | `dup-scan.mjs` weekly |
| Typecheck 1053s → cannot run per-commit | Med | ratchet on pre-merge + nightly |
| Refactors unsafe if test coverage ≈ 0 | Med | Phase 0 measures it; buy tests first |
| Lumen/Premium rebuilt by accident | Med | `frozen-surfaces.json` (39 files) |
| Bulk-adding auth breaks clients and masks real exposures | Med | classify, triage, then fix |

---

## 14. Explicit non-goals

- **Not** rewriting the SM-2 / rescue / misconception stack — measured as excellent.
- **Not** a redesign. Lumen, `/`, `/premium` are frozen surfaces.
- **Not** 3,815 hand-authored objectives. Draft → review → label as draft.
- **Not** auth on all 123 endpoints blind. Classify, then fix real exposures.
- **Not** raising `noUncheckedIndexedAccess` early — it manufactures non-bugs.
- **Not** calling a ratchet a fix. A baseline of 112 means 112 known defects.

---

## 15. Effort, and the order that matters

| Phase | Days | Dimension |
|---|---|---|
| 0 Foundation | 1 | repo discipline |
| 1 Safety | 3–4 | **privacy** |
| 2 Correctness | 4–5 | types / dead code |
| 3 Performance | 3–4 | p95 / N+1 |
| 4 **Teaching** | 6–8 | **how students learn** |
| 5 **Content** | 5–7 | **how content is stored** |
| 6 Observability | 3 | operability |
| 7 Ship surface | 4–5 | routes / a11y / mobile |
| **Total** | **~29–37 days** | ≈ 8–10 weeks elapsed |

Parallelisable: Phases 2–3 run beside 4–5; a11y and mobile are independent; content versioning
(§8.1) is independent of everything and should start in **week 1**, because it is the
precondition for treating any deploy as safe.

**If only three things ever happen:** commit the tree (Phase 0) → close the 3 IDORs with
regression tests → put `content/` under version control.

Those three are chosen for one reason: they are the only items on this list whose failure
mode is **unrecoverable** rather than merely expensive — lost work, exposed children's data,
and a curriculum that cannot be restored. Everything else on this plan is real, and worth
doing, and survivable if it slips. Those three are not.

---

## 16. Status

Plan written 2026-09-27 against `4e5968f1`. **No phase has been executed.** The only app-code
change made so far is the `validateGoal` fail-closed fix from Batch 1.

Numbers here come from `_survey_10x.md`, which was measured read-only. Where a number could
not be measured, this document says so rather than estimating — see the four unknowns in §1
and the unconfirmed items in §11. Re-measure before quoting any of them as current, because
13,306 uncommitted entries mean the tree can move under the plan.







