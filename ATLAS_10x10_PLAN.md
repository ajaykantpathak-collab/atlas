# ATLAS 10/10 PLAN — Full Frontend + Backend (Lumen + Premium Preserved)

> Constraint: NEVER delete `/lumen`, `LumenCosmos`, `components/premium/*`.
> They are the soul. Upgrade around them. `deploy/` is the ONLY Docker tree.

## 0. Frozen assets (no deletes, no renames)

| Asset | Path | Rule |
|---|---|---|
| Lumen Lab | `app/lumen/page.tsx` + `lumen.css` + `components/lumen/*` (13 files) | FROZEN. Only a11y/perf/Enter-path polish |
| Landing cosmos | `app/page.tsx` + `components/landing/LumenCosmos.tsx` + `lumenCosmosScene.js` + shaders/Galaxy/AtlasCore/Astra | FROZEN. Only perf/scrim tune |
| Premium system | `components/premium/*` (15 files) + `app/premium/**` (16 pages) | FROZEN. USE MORE in student app, code-split three.js |
| Corpus | `deploy/content/enhanced_nodes_md/` 15368 files, 10979 nodes, 101812 diagnostics | APPEND-ONLY per CONTENT_AUTHORING_SPEC |
| Trust arch | VERIFIED / MODEL / RUBRIC / GUIDED + validator stack | NON-NEGOTIABLE |

## 1. Scores today (live 2026-09-26)

- Backend 8.2/10 — systems 9, hardening 6.5. Healthy docker, 59s index, 17.5GB image, auth name mismatch, Mock OTP, no TLS/backups, 13462 dirty files.
- Frontend 7.1/10 — vision 8.5, health 6. ignoreBuildErrors:true, 344KB ts errors, _*.js pollution, dead routes, teaching 12/24.
- Landing (Lumen+premium) 9/10 — keep, integrate + perf-guard.
- Overall 7.7/10 → 10/10 = trust 10 + completeness 9.5 + polish 9.5 + ops 10.

## 2. Definition of 10/10

FRONTEND 10 = tsc 0 + build clean 4GB heap + Lighthouse 90+ on /, /lumen, /learn, /practice + Lumen 60fps + fallback static + PremiumLoader/Skeleton everywhere + no dead routes + offline Story + Hindi toggle + tier badge + audit trail.

BACKEND 10 = pytest green + p95 enrichment <300ms + health <50ms + image <2.5GB + boot <25s + auth canonical + OTP pluggable + CORS locked + 50r/s limit + nightly backups + Sentry + JSON logs + Alembic only.

## 2a. AMENDED 2026-09-27 — the scorecard above is necessary but NOT sufficient

Verification of the §1/§2 claims on 2026-09-27 found the criteria measure
**build, tooling and ops only**. They cannot see a wrong number. On that day
three live defects existed that would still be present in a build scoring
tsc 0 + a 2GB image + Lighthouse 95:

1. `users.streak_days` never decays, so a child who quit a month ago was shown
   a live "20-day streak" that silently collapsed to 1 on their return.
2. The parent "streak broken" alert could never fire (it gated on a counter
   that only ever grew) — the product's re-engagement trigger was dead.
3. `longest_streak` was a copy of the current streak: an invented "personal
   best" presented as a measurement.

**A plan that reports 10/10 while the app lies to students is not 10/10.**
The four gates below make that impossible to hide. They are additions, not
replacements: §1 and §2 still apply.

### Gate A — Data honesty (blocks release)

Every user-visible number must be traceable to a real column **and** have an
explicit decay/state model. Standing question, asked per metric
(streak, mastery, XP, goals, badges, leaderboard):

> Who WRITES this value, and WHO DECAYS it? If decay only happens on the next
> write, the stored value is not a current value and must never be rendered as
> one.

Rules:
- No value may be rendered that the database cannot substantiate. `None`/null
  when unknown — never a plausible substitute (`longest_streak = current`).
- A failed read must return `unknown`, never `0`. Zero is a real measurement;
  conflating it with an error tells a student they have no streak.
- One day boundary per domain, matching the writer. No mixing naive
  `date.today()` with `datetime.now(timezone.utc).date()` in the same metric.
- `services/streak_state.py` is the reference implementation of this pattern.

Enforced by: `backend/tests/test_honesty_*.py` (behavioural + wiring tests,
mutation-verified so that reverting a guard turns a named test red).

### Gate B — Reachability (blocks release)

Every module under `backend/services/` must be reachable from a router mounted
in `main.py`. A service no route imports is dead code shipped in the image.

On 2026-09-27 this gate would have failed for three subsystems:
`services/streak_service.py` (1,091 lines), `AuthService.get_children_for_parent`
and the streak grace-day/freeze engine — all written against an imagined
schema, all never mounted. Two of them crash on first use: `streak_service`
used `async with get_db()` on an async generator (`TypeError`), and
`get_children_for_parent` selected `UserModel.full_name` / `UserModel.grade`,
which do not exist on the model (`name` / `class_level`).

Enforced by: `backend/tests/test_service_reachability.py`.

### Gate C — Enforced bars (replaces aspiration)

- The build bar is the **delta gate**: `npm run typecheck:gate` must report
  `delta +0, new: 0` against the committed baseline (112 errors as of
  2026-09-27). "tsc 0" is the goal, not the gate.
- `typescript.ignoreBuildErrors: true` (`next.config.js:25`) silently hides
  EVERY future type regression. It may be set to `false` only in the same
  commit that takes the count to 0. It must never be flipped to silence a
  red build.
- Backend: `pytest backend/tests` green, with the faulthandler workaround in
  `pytest.ini` retained (solver import chain crashes the interpreter before
  collection).

### Gate D — Measurements must be recorded, not assumed

Boot time, `/health` latency, enrichment p95, image size and Lighthouse scores
require a running stack. Each must be **pasted into this file with the date,
the command and the machine** before its box may be checked. An unverifiable
criterion stays UNCHECKED — it is never assumed satisfied. (As of 2026-09-27
the Docker daemon is intentionally not running, so all ops criteria are
formally unchecked rather than passed.)

## 2b. SEQUENCING RULE — fix all code first, Docker last

**Order of operations (binding):**

1. Code fixes + tests, against the repo. No Docker.
2. Re-verify per batch: `python -m pytest backend/tests` + `npm run typecheck:gate`.
3. Only then bring up Docker, rebuild images, and run the ops measurements.
4. Record those measurements in §5. Do not start Docker to "check something
   quickly" mid-fix — the host carries other active work, and a rebuild
   mid-session is a regression risk for it.

Rationale: `docker compose build` is a long, disruptive operation on a shared
host. Deferring it means the expensive, environment-mutating step happens
once, on a tree whose code is already verified.

## 3. Open code defects (fixable without Docker)

| # | Item | Where | State |
|---|---|---|---|
| 1 | `UserModel.full_name` / `UserModel.grade` do not exist | `services/auth_service.py:914-915` | fixed 2026-09-27 |
| 2 | No HTTP rate limiter (50r/s) | `main.py` | fixed 2026-09-27 (dependency-free limiter) |
| 3 | Logs are not structured JSON | `main.py` | fixed 2026-09-27 (env-gated) |
| 4 | Sentry not wired | `main.py` | fixed 2026-09-27 (opt-in via `SENTRY_DSN`) |
| 5 | 68 `_*.js` scratch files in `frontend/` root | `frontend/_*.js` | open — needs approval (outside the `.py` cleanup scope) |
| 6 | `ignoreBuildErrors: true` | `next.config.js:25` | open by design until tsc = 0 (Gate C) |
| 7 | Alembic absent (schema via `init_db` / `create_all`) | repo | open — needs a baseline migration, a project of its own |
| 8 | 13,318 dirty files | repo | open — a commit is the fix, not deletion |

## 4. Blocked on the user (cannot be closed by code)

- **LLM API key** (Gemini/Groq/OpenAI-compatible) — until provided, `/tutor` is
  misconception-aware heuristics and must be labelled as such, never as an LLM.
- **WhatsApp/SMS provider creds** — OTP still defaults to `MockWhatsAppSender`,
  which prints codes to the backend log.
- **TLS certificate** — `deploy/nginx.conf` serves `listen 80` only.
- **Backup host/schedule** — a manual `scripts/backup_db.ps1` exists but is
  outside the deploy tree and is not scheduled.

## 5. Recorded measurements (Gate D — fill in, do not assume)

| Criterion | Target | Measured | Command / date | Status |
|---|---|---|---|---|
| pytest | green | 80 passed | `python -m pytest backend/tests` 2026-09-27 | PASS |
| typecheck | delta +0 | 112 err, baseline 112, new 0 | `npm run typecheck:gate` 2026-09-27 | PASS (Gate C bar) |
| image (backend) | <2.5GB | — | needs Docker | UNCHECKED |
| boot | <25s | — | needs Docker | UNCHECKED |
| /health | <50ms | — | needs Docker | UNCHECKED |
| enrichment p95 | <300ms | — | needs Docker | UNCHECKED |
| Lighthouse /, /lumen, /learn, /practice | 90+ | — | needs running stack | UNCHECKED |

### Test inventory (2026-09-27, 80 passing)

| File | Tests | Covers |
|---|---|---|
| `test_idor_guards.py` | 34 | Batch 1: IDOR guards, staff gating, `_safe_id` |
| `test_streak_read_model.py` | 21 | Gate A: decay, honest states, wiring, dead-engine safety |
| `test_observability.py` | 19 | §3 items 2-4: 429 path, burst/window, JSON log shape |
| `test_service_reachability.py` | 6 | Gate B: unwired-service baseline + observability wiring |

## 6. Next action — Docker, and only Docker

Code work is done for this pass. Per §2b the next step is the one remaining
code change that **cannot be verified without a build**, followed by the ops
measurements:

1. `Dockerfile.backend` is still effectively single-stage (`FROM
   python:3.12-slim`, then `COPY backend/` and `COPY content/`) despite a
   "Multi-stage build" comment at line 2. Rewriting it blind risks the deploy
   path on a shared host, so it is deliberately deferred until Docker can
   verify it. This is the 17.5GB image item.
2. Bring up the stack, record boot / `/health` / p95 / image size into §5.
## 7. Audit findings — 2026-09-27 (visual flow + routes + types)

### Type errors: 114 → 81, and 0 outside parked scope

| Fix | Detail |
|---|---|
| `components/sims_v2/SimPlayer.tsx` | Orphaned duplicate of `engine/SimPlayer.tsx`; 22 imports of non-existent modules, 24 errors. Quarantined as `.orphan.bak` (untracked → deletion would be permanent). |
| `components/sims_v2/types.ts` | Orphan importing `./lexgen` (lives in `engine/`). Quarantined. |
| `lib/sanitize.ts` | `Config` is a type-only export; the namespace form is unavailable under a default import. **Types only — no sanitization rule was touched.** |
| `tsconfig.json` | `target: es5` → `ES2020` (Set/Map iteration). |
| `exam/page.tsx` | `Section` was `'A' \| 'B'` while `secId()` falls back to `'C'`. Third-section questions could never match the section-progress comparison and **vanished from the child's section breakdown**. Widened, plus the two `Record<Section,…>` initializers. |
| `play/page.tsx` | `GameData` has no `title`, so the key was dropped by `JSON.stringify` and the parent's game record showed a blank name. |
| `practice/page.tsx` | `sanitizeHtml` was **called but never imported** → `ReferenceError` on the core practice loop, invisible to CI because of `ignoreBuildErrors`. |

The 81 remaining are all in `components/simulations/c6_12*` (parked by
instruction). Those are live code — `sims_v2/engine/sim_components.gen.ts` is a
generated registry of dynamic `import()`s into them — with 12+ distinct root
causes that each need a decision about intent.

### Routes (`scripts/audit_routes.py`, static, no Docker)

- **0 dead links** across 95 routes. The 2026-09-16 "nav 404s" class is resolved.
- **9 routes should probably not ship:**
  `/_archive/atlas-landing`, `/_archive/learn-c68`, `/_archive/test-sim`
  (tsconfig-excluded, but Next.js still builds and serves them),
  `/sim-test`, `/riv-test`, `/dragon-inspect`, `/story-visuals-preview`,
  `/unregister-sw`, `/coding-playground`.
- Confirmed sprawl: 3–4 tutor variants, 2 exam, 2 atlas.
- The script had three of its own bugs (Windows separators, an anchored
  route-group regex, and bare `replace(` matching `String.replace`) that
  produced false "dead links" including all 4 premium links. Each was caught
  with a control test. **Trust the control test, not the first number.**

### Visual flow

| Item | State |
|---|---|
| KaTeX | **Fixed** — `practice` and `tutor` rendered KaTeX without `katex.min.css`; maths was unstyled on two core surfaces. |
| Cold start | **Fixed** — the app had **0** `loading.tsx` across 95 routes and no Suspense boundary, so navigation showed a blank screen. Added `app/(student)/loading.tsx` using the existing `Skeleton` primitives. |
| 404 | **Fixed** — 0 `not-found.tsx`; added a designed global one. |
| Timer off for class ≤ 8 | **Not implemented anywhere.** The only `classLevel <= 8` uses select junior *content*. This is a pedagogy rule needing a product decision on where it applies. |
| Confidence chips | No frontend code posts to `/api/confidence` yet. The BATCH_PLAN note (post only when logged in, localStorage as anonymous fallback) is still unimplemented. |
| Hindi toggle | **Already implemented — earlier "missing" note was WRONG.** `components/LanguageSwitcher` + `LanguageProvider` + `IntlProviderBridge` with `messages/en.json` (16KB) and `messages/hi.json` (25KB). Mounted in dashboard, learn, practice, the premium layout and StoryMode. I had grepped for the non-existent name "HindiToggle" and concluded it was absent. |
| Class band | **Fixed.** Junior is 1-5, normal from 6. Three gates disagreed (8, 8, 7) so classes 6-8 were served the junior chapter list, junior tutor chips and the Junior Mode door. Now centralised in `lib/classBands.ts` and enforced by `scripts/check_class_bands.mjs` (mutation-verified: fails at 8, passes at 5). |
| Tier badge | No badge in the student UI (one match, in a deterministic test page). |
| Offline Story / Lighthouse / 60fps | **Unverifiable without a running stack** — parked behind the Docker-last rule. |

### Gate A sweep — the other student-visible metrics (2026-09-27)

Same lens: who WRITES this, and WHO DECAYS it? Streak was metric one; these
were next. Four real defects, all in `api/dashboard.py`.

| Metric | Defect | Fix |
|---|---|---|
| **Overall mastery** | A **flat mean over topics**. One stray topic at 0% dragged a child with deep work elsewhere down — and this number gates an **URGENT** parent alert (`< 30%` → "very low mastery, extra support may be needed"). | Attempt-weighted in `services/honesty_metrics.weighted_overall_mastery`; flat mean only as a no-attempts fallback. |
| **Overall mastery (no data)** | No mastery records returned `0.0`, so a child who never practised saw a confident **"0% mastery"** headline. | `overall` is now `None`; `mastery_overall` is `Optional[float]` (the frontend contract already typed it `number \| null`). The parent path coerces to 0.0 only behind `has_mastery_data`. |
| **Weekly practice minutes** | `// 60` floored, so a real **30-second session displayed as "0 minutes"**; and the `except` returned a bare `0`, so a failed query looked identical to "did not practise" — which can fire a parent worry. | `honesty_metrics.rounded_minutes` (half-up, and explicitly not Python's banker's `round(0.5)==0`) plus a `measured: bool` flag surfaced as `ChildProgressSummary.weekly_practice_measured`. |
| **XP ladder** | Hardcoded `100` while `progress_service.XP_PER_LEVEL` is the real source. Correct today, silent drift tomorrow — the same class as the junior bands. | Imports `XP_PER_LEVEL`; `total_xp % 100` no longer exists. |
| **`topic_id`** | Carried a knowledge **node** id under a key named `topic_id`. | `node_id` is now emitted alongside, documented. |

Verified: 99 pytest green (was 55), and **mutation-verified** — reverting the
weighting to a flat mean turns exactly 5 named tests red. One of my own tests
was wrong initially (`round(0.5)` is `0` in Python), which is why the rounding
is now explicit half-up with a boundary test.

### Gate A sweep, part 2 — review queue, badges, leaderboard (2026-09-27)

| Metric | Defect | Fix |
|---|---|---|
| **Review retention** | `routers/progress.py` derived the value with a **falsy** check: `if not resp.retention_rate:` → a GENUINE 0% retention was overwritten with `accuracy * 100`. A real measurement was replaced by a different, usually more flattering one. Same for `streak`. | `retention_rate: Optional[float] = None`, `streak: Optional[int] = None`; derivation only on `is None` **and** only from a non-empty source. The client already guarded on `retention != null`. |
| **Badges** | If **both** read paths (AchievementService and the `Achievement` table fallback) failed, the response was an empty payload with `total_earned=0` — the child saw "0 badges earned" rather than "we could not load". | `read_ok` is set only by a path that actually succeeded, and surfaced as `AchievementsResponse.source_readable`. |
| **Leaderboard** | **Does not exist** — nothing to audit. The only `rank` is `rank_in_class` on exam summaries, and Qdrant's ranking is retrieval, not a student-facing board. Closed honestly rather than inventing a surface. |
| **`ReviewItem` collision** | **Open, deliberately.** Three different shapes share the name: the SM-2 record (`types/index.ts`), the due-review projection (`lib/game-engine/analytics/types.ts`), and a third the parked sims expect (`id`/`easeFactor`/`dueDate`). `lib/srs.ts` re-exports the first as `SRSItem`, which is why the compiler calls them incompatible. Not fixed: renaming would churn the 60 parked sim files and would not resolve the third shape. Pinned by a test that documents it as unresolved. |

Mutation-verified: reverting the review-stats derivation turns exactly 2 named
tests red. **106 pytest green** (from 55 at the start of this work).

Gate A now covers streak, mastery, XP, daily goals, weekly minutes, review
retention and badges. Two audit lessons worth keeping:
- `Get-ChildItem <dir> -Include *.py` **without `-Recurse` silently returns
  nothing**. It made an "achievements endpoint does not exist" reading that was
  simply a broken glob.
- A falsy check on a measurement (`if not retention_rate:`) is a substitute
  waiting to happen. Compare against `None` explicitly.

### Still untouched
TLS, nightly backups, real OTP provider, LLM key, Alembic, the 68 `_*.js`
files, the 13,318 dirty files, the 9 routes that should not ship.





