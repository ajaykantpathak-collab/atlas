## 4. Allow/Deny (no agent deletes Lumen/premium)

DENY (never delete/rename): app/lumen/**, app/page.tsx LumenCosmos import, components/lumen/**, components/landing/LumenCosmos.tsx + lumenCosmosScene.js, components/premium/**, app/premium/**, content/enhanced_nodes_md/**, components/story/StoryMode.tsx (surgical only).

ALLOW: app/(student)/learn/*, practice/*, review/*, components/learn/*, practice/*, lib/boardAnswer.ts, lib/examReady.ts, backend/services/*, backend/api/*, deploy/* config, scripts/*, .github/workflows/*, tailwind.config.*, messages/*.

## 5. Acceptance gate (10/10)

- [ ] tsc 0, build <4GB heap, Lighthouse 90+ on 4 routes
- [ ] /, /lumen, /premium identical-or-better (engine untouched, premium reused)
- [ ] Story: Objective + Board proof + tier badge + audit trail
- [ ] Practice interleaves review, stuck-rescue after 2 wrongs
- [ ] Diagnostics C6-C10 no 400, results persist
- [ ] Image <2.5GB, boot <25s, p95 <300ms, backups nightly
- [ ] Auth canonical, OTP pluggable, CORS locked, Sentry live
- [ ] git clean, tag v10.0, HANDOFF updated

## 5b. New hygiene (Batch 1 — 2026-09-26)

- `pre-10x` tag created on master (4e5968f1). Rollback: `git reset --hard pre-10x`.
- Containers healthy x9, baseline: 10979 nodes / 3257 companions / 101812 diagnostics.
- `_*.js/_*.log/_*.txt` harnesses are UNTRACKED (gitignored via *.log, never committed except _archive) — keep in place for verify-sweep, do NOT delete until Batch 4. Only 101 tracked `_archive` raws remain.
- `sync-deploy --check` timed out on the full tree — `--quick` added. It now skips the sha1 only when the SIZE already differs (a guaranteed copy). Same-size files are still hashed, because a same-length content edit is routine and size-only would report it "in sync". `--quick` is rejected without `--check` (exit 2).
- **Deploy-only data is now protected by ALLOWLIST, not denylist.** `SYNCABLE.content` names the only four trees that may be deleted. Everything else under `deploy/content` is deploy-owned and never removed — including `cisce`, `cisce_nodes_md`, `cisce_nodes_v2` (Qdrant `nodes` collection, `backend/services/qdrant_service.py:92`) and `index`, `nodes`, `practice_variants`. A blind mirror would have deleted 14,635 live files. A denylist fails open (a NEW corpus is unprotected); the allowlist fails closed.
- Sync fails closed two ways: an empty/absent source tree skips the delete pass entirely (`content/` is 100% gitignored, so CI can see it empty), and a blocked tree aborts the WHOLE run before any write, so `deploy/` is never half-updated.
- 49 files remain genuinely pending deletion (NOT run, awaiting review): 47 `doodle_cards/class1{0,1,2}/*.png` English art that exists only in deploy (~24MB, unrecoverable if deleted) + 2 `enhanced_nodes_md/_quarantine_wronggrade/c6_biology_ch06_00{1,2}.md` quarantined on purpose. Run `node scripts/list-pending-deletes.js` (READ-ONLY) before any real sync.
- Token gate is a RATCHET: 78,624 raw-hex occurrences pre-exist (canvas/three material params, generated sims). `scripts/check-tokens.js` fails only on GROWTH vs `scripts/tokens-baseline.json`. Also deny-lists new files under `components/{lumen,premium}` via `scripts/frozen-surfaces.json` (39 files locked).
- `frontend/tsconfig.json` no longer includes `.next-mobile*/types` (134 stale gitignored files inflating every typecheck).
- `validateGoal` fails closed on missing keys. Audited all 5 call sites: **0 confirmed breakages** (`_audit_validategoal.md`).
- ALL sync-deploy runs in Batch 1 used `--check` (dry run). **No files were deleted.**
- `typecheck-gate` baseline LOCKED: **112 type errors** (not 0) in **1053s**. `npm run typecheck:gate` fails only on GROWTH. 23 of the 112 are in the DEAD `sims_v2/SimPlayer.tsx` (0 importers) - deleting it removes ~20% of the debt for free. Top codes: TS2307 (22, module not found), TS2339 (22, no such member), TS2322 (17), TS2739 (16), TS2345 (14).

## 5c. Amendments (user-approved, 2026-09-27)

These four override text elsewhere in this file and in `BATCH_PLAN.md`.

1. **Every batch verifies itself. "ONE rebuild at end" is retired.** Section 3
   here and the `BATCH_PLAN.md` header both said one rebuild at the end. That is
   now forbidden: each batch must end with `npm run typecheck:gate` (the
   112-error ratchet) AND a dev build, plus `python -m pytest backend/tests`
   when it touches the backend. A single final rebuild concentrates every
   failure into one step that cannot be bisected, and it is how the 17.5GB image
   and the 112 type errors were allowed to accumulate unnoticed.
2. **Backup scope is BOTH content trees, and the unversioned surface is far
   larger than the corpus.** `scripts/backup.sh` DOES NOT EXIST - Batch 2 item 5
   is still to be written, so this is a spec edit, not a code fix. It must cover
   `content/cbse_nodes_md` AND `content/cisce_nodes_*`, because `deploy/` is
   **wholesale gitignored (`.gitignore:70`) -> 0 tracked files**. The corpus is
   not the only loss: `docker-compose.prod.yml`, `Dockerfile.*`, `nginx.conf`
   and `.env.production` exist only on this disk and are unrecoverable.
3. **CISCE mount stays FROZEN until generation completes.** The corpus is still
   generating - do NOT mount or sync `cisce_nodes_v2` yet. The allowlist in 5b
   already prevents sync from deleting the CISCE trees; the freeze additionally
   prevents a partial-generation snapshot from being promoted.
4. **CISCE is not "58% absent" - it is unparseable, and needs parser wiring in
   Batch 2.** Corrected root cause: `_FILENAME_PATTERNS`
   (`backend/services/enhanced_nodes.py:107-114`) match only `_cbse_`/`_ch`/`_u`.
   CISCE filenames (`c10_bio_icse_01_001.md`) match NONE -> `parse_filename`
   returns `None` -> every file is skipped SILENTLY. 5,487 + 9,433 nodes have
   existed on disk and have NEVER been served. A fix needs (a) a board token,
   (b) a chapter-token shape, and (c) `get_md_dir()` (L759-760) becoming a LIST,
   because one directory per board no longer holds.

## 5d. Batch 1 security pass - recorded done (2026-09-27)

- **3 IDORs closed** (`/api/analytics/student/{id}/stats`, `.../timeline`,
  `/api/intelligence/confidence/{id}`) plus **1 anonymous WRITE**
  (`POST /api/intelligence/confidence`) and **13 anonymous teacher-dashboard
  aggregates** (`/overview` was already gated) now behind `_require_staff`. The
  guard is `backend/deps.py:require_self_or_staff`, which RETURNS the scoped id
  so the check and the data access can never disagree; a mismatch is **403, not
  404** - a differing 404 would confirm which student ids exist.
- `CLICKHOUSE_PASSWORD` **default removed**: it embedded a real credential in
  source and fail-opened (server and client silently came up on the same
  published password whenever the env var was unset).
- **SQL injection closed** on every f-string ClickHouse interpolation via
  `_safe_id` (`^[A-Za-z0-9_-]{1,64}$`). The ClickHouse HTTP interface takes the
  query as a URL string with no bind-parameter channel, so refusing malformed
  ids is the only honest defence.
- **Event loop unblocked**: `_ch_query`/`_ch_query_json` are synchronous urllib
  calls awaited directly from `async def` handlers, so a slow ClickHouse stalled
  every other request. Added `_ch_query_async`/`_ch_query_json_async` via
  `asyncio.to_thread` and converted all 11 call sites. `/health` offloaded too
  and documented as intentionally unauthenticated.
- **No frontend caller exists** for any of the three IDOR endpoints (verified by
  `findstr` across the frontend tree), so locking them cannot break the UI;
  `fetchWithAuth` attaches bearer tokens globally for future callers.
- **New file `pytest.ini`, and `-p no:faulthandler` in it is load-bearing.**
  pytest's built-in faulthandler plus the solver import chain (`scipy` via
  `backend/solvers/core_calculus_engine`) kills the interpreter with
  `0xc0000139 STATUS_ENTRYPOINT_NOT_FOUND` before a single test is collected,
  with no traceback - the run looks like a silent crash. This repo had NO pytest
  config before. Suite is `backend/tests/test_idor_guards.py`, **34 tests**, and
  it was mutation-verified: deleting a `Depends(require_self_or_staff)` turns
  exactly 2 named tests red. The wiring assertions read endpoint signatures, so
  removing a guard fails the build instead of silently re-opening a hole.
- Open follow-up for Batch 2: `subject_summary`'s `{subject}` is now `_safe_id`
  guarded, but subject values are free text in ClickHouse - if a real subject id
  ever contains a dot or space, revisit with a whitelist rather than loosening
  the regex.



---

# DreamApp - 10/10 Roadmap

**Rollback:** `git reset --hard pre-10x` | **Baseline:** 9 containers, 10,979 nodes, 3,257 companions, 101,812 diagnostics
**Evidence base:** `_survey_10x.md` (measured counts), `_audit_syncdeploy.md` (F1-F11), `_audit_validategoal.md` (5 call sites)

Every number below is MEASURED. Unknowables are marked NOT-MEASURABLE and are
themselves Phase 0 work. **13,306 uncommitted entries** in the working tree - the
single largest risk to this whole plan.

## 0. Principles

1. **In-place only.** `deploy/` is bound to named volumes (Postgres, Neo4j, Qdrant). A clean rebuild breaks data.
2. **Never delete without a dry run.** `node scripts/list-pending-deletes.js` is read-only; run it first, every time.
3. **Fail closed.** A gate that cannot prove "clean" says BLOCKED, it does not pass.
4. **Ratchets, not zeros.** Both gates fail on GROWTH against a locked baseline. A gate demanding zero on a legacy tree is a gate everyone learns to ignore.
5. **Frozen surfaces.** Lumen and Premium are reused, never re-skinned (`scripts/frozen-surfaces.json`).
6. **Measure, then optimise.** No perf work without a before/after number.
7. **Commit early and often.** 13k uncommitted entries is an unacceptable risk posture.

## 1. Scorecard

| # | Dimension | Now | Target | Blocking evidence |
|---|---|---|---|---|
| 1 | Correctness | 5 | 10 | 112 type errors; typecheck takes 1053s |
| 2 | Teaching quality | 9 | 10 | Practice is 10/10; `learn/[topicId]` has NO rescue and NO review interleave |
| 3 | Sim fidelity | 8 | 10 | 3,815 sims, 0 broken, but `tier:` on 4, `objective:` on 14 |
| 4 | Deploy safety | 9 | 10 | Allowlist shipped; 49 files still unresolved |
| 5 | Performance | 4 | 10 | 7 N+1 sites; blocking `urllib` = 10s event-loop stalls |
| 6 | Design system | 5 | 10 | 78,624 raw hex |
| 7 | Security | 3 | 10 | **123 of 255 endpoints unauthenticated; 3 live IDORs** |
| 8 | Data integrity | 8 | 10 | Protected; backups unverified by restore |
| 9 | Observability | 2 | 10 | 43 bare `except: pass`; no global exception handler |
| 10 | DX / maintainability | 3 | 10 | 3 parallel surfaces per concern; 77KB dead SimPlayer |

## 2. Phase 0 - Make the repo trustworthy (2 days)

*Do nothing else until this is done. 13k uncommitted entries can lose a day of work.*

- [ ] Commit or stash the working tree; get `git status` to a known state
- [ ] Re-tag `pre-10x` once clean
- [ ] Confirm the 112-error baseline is committed alongside the gate
- [ ] **Measure** the NOT-MEASURABLE items: does `validate_sims.mjs` pass? does prod set `PLATFORM_CORS_ORIGINS`? real p95?
- [ ] Resolve the 49 pending files (47 PNGs + 2 quarantined MDs) - upstream, accept, or keep

**Gate:** clean tree, committed baseline, the 4 unknowns answered.

## 3. Phase 1 - Security (3 days) - HIGHEST RISK

*Live IDORs on student data outrank everything else.*

- [ ] `api/analytics.py:94` and `:116` - `GET /student/{student_id}/stats|timeline` - any caller reads any student
- [ ] `api/intelligence.py:519` - `GET /confidence/{student_id}` - same shape
- [ ] Add auth to the 123 unauthenticated endpoints (start: solver 24, intelligence 15, verified_practice 15, analytics 13, practice 10, graph 10)
- [ ] `api/student_sync.py:160,170` - anonymous reaches a stateful POST
- [ ] Remove the hardcoded credential `api/analytics.py:30-31` (`dream_ch_2024`)
- [ ] Fix the `.env` prefix drift: `CORS_ORIGINS` and `JWT_SECRET` in `.env` are **silently ignored** (config uses `env_prefix="PLATFORM_"`)
- [ ] Fix the 3 broken `Settings` properties that raise `AttributeError` (`JWT_EXPIRE_MINUTES`, `FRONTEND_URL`, +1)
- [ ] Lock CORS to real production origins

**Gate:** 255/255 endpoints authenticated or explicitly public; 0 IDORs; no secrets in source.

## 4. Phase 2 - Performance (4 days)

- [ ] Record a real Lighthouse + p95 baseline BEFORE changing anything
- [ ] Kill the 7 N+1 loops: `dashboard.py:858-879` (4+ queries/child), `:1076` (1/student when the ids are in hand), `:1086`+`:1108` (same student fetched TWICE), `:1140`, `streak_service.py:1016` (iterates EVERY student in the DB), `tutor_service.py:3325/3349`, `practice.py:2087`
- [ ] Move blocking `urllib.request.urlopen` (`analytics.py:43,61,79`) off the event loop - 10s stalls, on an unauthenticated surface
- [ ] Cache `verified_practice.py:183-186` (re-reads and re-parses every corpus book per request, no cache, unlike `_load_book` at `:72-85`)
- [ ] Fix the other sync `open()` calls in async routes: `enhanced_nodes.py:68` (hot path), `teacher_analytics.py:94,128,175`, `student_sync.py:204`, `verified_practice.py:677`
- [ ] Lumen: static fallback below 30 FPS (do NOT rebuild Lumen)
- [ ] Build heap <4GB; boot <25s; p95 <300ms; image payload <2.5GB

**Gate:** Lighthouse 90+ on 4 routes and p95 <300ms, with before/after recorded.

## 5. Phase 3 - Correctness and DX (4 days)

- [ ] Delete `components/sims_v2/SimPlayer.tsx` - **0 importers**, 77KB, and behind the live engine on 3 teaching features. Removes 23 of 112 type errors free
- [ ] Delete the 19 junk routes (`game-test` 317 lines, `riv-test`, `sim-test`, `junior-simple`, `story-visuals-preview`, `_archive`...) - ~3,860 lines and ~232KB out of the bundle
- [ ] Add auth to `middleware.ts` (currently a 12-line pass-through; all 44 student routes are client-side protected only)
- [ ] Unify the byte-identical `sims_v2/types.ts` / `engine/types.ts` pair (same SHA-256 - will drift on first edit)
- [ ] Consolidate the 3 parallel surfaces per concern (parent: 3; teacher: 4; premium: 9)
- [ ] Fix the other 89 type errors; re-lock the baseline lower as you go

**Gate:** `typecheck:gate` at 0 errors; one SimPlayer; no junk routes in the build.

## 6. Phase 4 - Teaching (5 days)

*The engine is excellent. This is the loop around it, and the metadata spine.*

- [ ] Port the 2-wrong rescue + SM-2 interleave from `practice/page.tsx` into `learn/[topicId]/page.tsx` (currently 1,279 lines with ZERO rescue/srs symbols)
- [ ] Give `QuestionCard.tsx` (882 lines) the "why" logic - it has zero occurrences of why/explanation/misconception/remediation
- [ ] Add `learningObjective` + `boardRef` + `tier` + `auditTrail` to `SimDef` and `Enrichment`. Today: 0 hits for these across 3,001 sim files; `tier:` on 4 files, `objective:` on 14
- [ ] Change story beats from `string[]` (`StoryMode.tsx:1684`) to typed objects - the current type makes a per-beat objective *impossible*
- [ ] Extend `validate_sims.mjs` with a required-field check (the harness already exists)
- [ ] Give the 692 `generated/` sims beats/predict/observe/reflect (18% of the corpus ships with 1 of 5 phases)
- [ ] Commit `score_sims.mjs` output for the full corpus (quality JSON covers 176 of 3,815 = 4.6%)

**Gate:** `objective:` and `tier:` on all 3,815 sims; `learn/` has a rescue lane.

## 7. Phase 5 - Observability and data (3 days)

- [ ] Add `@app.exception_handler` + request-ID middleware
- [ ] Remove the 43 bare `except Exception: pass` blocks (`student_sync.py` is worst: 0 HTTPException across 5 endpoints, 9 blanket catches)
- [ ] Sentry live with real error reporting
- [ ] Nightly backups verified BY RESTORE on a scratch instance
- [ ] Investigate the 2 dead routers: `api/exams_adapter.py` (20KB) and `api/_assessment_sessions.py` (4.5KB) declare 0 decorators yet are mounted at `main.py:244`

**Gate:** an injected error is visible in Sentry; a backup has been restored.

## 8. Phase 6 - Design system (3 days)

- [ ] Ratchet raw hex down from 78,624. Largest: `canvasLab.tsx` 1,294, `11_geo_gen.ts` 830, `c6_12_gameRegistry.ts` 788
- [ ] Treat canvas/three/pixi material params separately - they are legitimate, not drift
- [ ] Lock component variants; stop new one-offs
- [ ] Premium components reused, never duplicated (`KnowledgeGraph3D` and `TiltCard` are each duplicated and divergent)

**Gate:** raw hex trending down weekly; baseline re-locked lower.

## 9. Phase 7 - Ship (1 day)

- [ ] Full gate green: tsc 0, build, Lighthouse 90+, tests, drift check
- [ ] `git tag v10.0`, HANDOFF updated
- [ ] Post-deploy smoke test on /, /lumen, /premium, and one student flow

## 10. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| 13,306 uncommitted entries lost or half-committed | **Critical** | Phase 0 first, before anything else |
| IDORs on student data remain live | **Critical** | Phase 1 is first for this reason |
| A real `sync-deploy` runs before the 49 files are resolved | **High** | `list-pending-deletes.js` first; 47 PNGs unrecoverable |
| Fixing one SimPlayer, shipping the other | **High** | Delete the dead copy, verify 0 importers |
| Typecheck too slow (1053s) to run per-commit | Medium | Widen the ratchet to nightly+pre-merge, not per-save |
| Perf work with no baseline | Medium | Phase 2 gate requires before/after numbers |
| Lumen/Premium rebuilt by accident | Medium | `frozen-surfaces.json` denies new files |

## 11. What "10/10" is not

Not "zero open issues." It is: every gate green, every claim backed by a
measurement, a clean tree, and a rollback tag. Gates that fail loudly beat a
perfect score on paper.

**Highest-value work, in order:** commit the tree, close the 3 IDORs, delete
dead SimPlayer + 19 junk routes, kill the N+1s, add the metadata spine.
