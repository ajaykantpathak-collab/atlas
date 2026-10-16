# ATLAS LAUNCH-FIX BATCH — 6-AGENT FLEET PROMPT (v1, 2026-10-15)

Hand this to a fresh coordinator session as-is. Source findings:
`D:\platform\AUDIT_PACKAGE_2026-10-15.md` (+ evidence root
`D:\platform\_work\audit_2026_10_15\`). Six fixers, six disjoint FILE
lanes, one ship. The batch's success metric is one number: **verified-wrong
on the 150-stem novel battery drops from 6.7% toward <1%**, plus the four
criticals closed, with every fix proven by a before/after re-run.

## 0. PRE-FLIGHT (coordinator, before dispatching anyone)

1. **Reconcile the tree.** As of 2026-10-13 a concurrent session left
   in-flight uncommitted work (`its/solver/answer_pipeline.py`, new
   `api/solve_check.py`) that made G2 (silent-pass pins) and G3
   (boundaries) red. Check current state first: run
   `cd deploy/backend && POSTGRES_URL=sqlite+aiosqlite:///:memory:
   python -m pytest tests/test_wsa_no_silent_pass.py tests/test_boundaries.py -q`.
   If still red: the owning lane of this batch claims those files, lands
   the pin/boundary obligations properly (stage-tag or allowlist with
   reasons; route solve_check through `backend.services.*`), and records
   the attribution. Never weaken a pin to get green.
2. **Safety net.** `python harness/harness.py backup` (proven drill-PASS
   engine) before any edits. The restore drill may be re-run any time.
3. **BEFORE numbers** (coordinator captures into
   `_work/fix_2026_10_15/BEFORE.md`): battery verified-wrong % (from
   `laneA/battery.jsonl` verdicts), unauth-probe results
   (`laneB/unauth_probe.json`), IDOR repro result (`laneB/idor.py`),
   `npx tsc --noEmit` error count, Reticle status, G2/G3 status.
4. **Dev instance** up on :8020 per `_work/overhaul/dev_instance.md`
   protocol. Load-test ONLY :8020. `SOLVER_LLM_MODE=off` everywhere.

## 1. LAWS (unchanged, violating = void)

- BRIEF_SHARED.md laws 1-10 + AGENTS.md ship discipline. **deploy/ is the
  only tree that ships.** Frontend changes need a rebuild (ship step).
- **Agents never touch Docker/restarts.** The coordinator performs ONE
  ship at batch end (docker-cp all changed files + one launch_check
  manifest regen + one restart per backend, health-gated) only after
  every lane is green on the dev instance. No mid-batch restarts.
- **TDD:** every fix lands with a failing-test-first test under
  `deploy/backend/tests/` (new files named `test_fix<lane>_*.py`) or a
  Reticle/FE check.
- **Claim ledger:** claim in `BUGS.md` before editing:
  `## [LAUNCH-FIX-<lane>] 2026-10-15 — <title>` with
  `- [claimed-fix<lane>-<slug>]` lines; retag `[fixed-...]` with evidence.
  A failed Edit means someone else owns it — stop, report collision.
- **Solver laws:** verifier law (data rows, never hand-written `_v_*`);
  slop-gate law (all new serving paths through `answer()`); pins only go
  down; node IDs never in display text; no secrets in source.
- **No new heavyweight deps; no LLM calls; no heavy jobs outside
  02:00-05:00; supplements read-only; parked content waves stay parked
  (report-only).**
- **Timebox:** 4h hard per lane. Honest "not covered" list beats overflow.
- Max 6 concurrent agents (this batch = exactly 6, one wave).

## 2. THE SIX LANES (disjoint by FILE; a file may have exactly one owner)

### Lane F1 — SECURITY & ACCESS (`deploy/backend/api/**` auth/ownership surface + `content_parsers/load_to_neo4j.py`)
1. **IDOR (CRIT):** ownership check on
   `GET /api/students/{id}/exams/history` (path id == current_user or
   linked parent/teacher relationship) + audit EVERY sibling
   `{student_id}` route in the same file family; add the same guard.
   Test: two-account matrix ported from `laneB/idor.py` as a pytest.
2. **Guest-200 → 401 (MED):** the 5 routes from laneB
   (`/api/exams/history`, `tutor-graph/progress`, `student/onboarding`,
   `student/a11y-prefs`, `students/{id}/exams/history`). Test each.
3. **Secret literal (MED):** `NEO4J_PASSWORD` hardcoded in
   `content_parsers/load_to_neo4j.py:23` → env with safe default + note.
4. Re-run the full unauth probe (`unauth_probe.json` route list) — zero
   NEW leaks vs audit, the 5 named ones fixed.
Exit gate: `test_fixf1_*.py` green + both probe suites clean on dev.

### Lane F2 — SOLVER TRUTH (`deploy/backend/its/**` — solver + tutoring)
The three verified-wrong mechanisms from §3 of the audit, each with its
own fix, TDD, using `laneA/battery.jsonl` as the standing corpus:
1. **Fabricated check strings (worst finding):** strip/suppress any
   "independent check" line unless a second-path check actually executed.
   Add a telemetry flag when a check runs so this is measurable.
2. **`VERIFIED_FROM_NODE` stem↔node gate:** semantic similarity floor
   before the verified tier; below floor → demote to `bank_similar`
   exemplar with the honest label. Tune the floor against battery.jsonl
   (the 6 known mismatches must demote; true matches must not).
3. **Confidence floor / second path** on the computed-wrong families:
   `DEP_SLM` (120,000 years), `NUMBER_COMPARE` (55 vs 15), competency
   routes (KE 900J + fabricated residual). Fail to GUIDED instead of
   stamping VERIFIED on low confidence.
4. **`teach_loop.concept` wrong-subject binding:** same-class
   same-subject constraint on node binding.
5. If pre-flight step 1 assigned you the pin/boundary obligations:
   land them here (this lane owns `its/solver/answer_pipeline.py`).
Exit gate: the 10 known verified-wrong cases (m30/p21/a05 + the 6
`VERIFIED_FROM_NODE` + Rowlatt) each get a pinned corpus check
(`harness corpus add` pattern, `deploy/backend/tests/corpus/`) — red
before, green after; parity baseline not regressed (G6, LLM off).

### Lane F3 — FRONTEND & API DRIFT (`deploy/frontend/**` + ONE backend file: the recommendations/class-default route)
1. **next ≥ 14.2.10** (GHSA-gp8f-8m3g-qvj9) + `npm audit` re-run.
2. **11 tsc errors → 0** (`LivingWorld` module, tuple arity) + add
   `tsc --noEmit` to the pre-ship checklist.
3. **API path drift:** FE calls `/api/next-best`, `/api/practice/review`,
   `/api/engagement/weekly-digest` → 404. Grep both trees, align paths
   (fix FE callers to the real backend routes, or add thin backend
   aliases if the FE surface is right — your call, one pattern, all three).
4. **Wrong-class recommendations:** class-3 dashboard must not serve
   `/learn/c12_*` nodes — filter by `class_level` in the recommendation
   route (your ONE backend file) + FE regression check.
5. **Onboarding CTA:** hand-repro the fresh-signup journey (audit item 4
   — "may strand new users"); find and fix the non-advancing CTA; prove
   with a saved Playwright/Reticle-style flow.
6. **`/teacher` 404** (unlinked): link or route it.
Exit gate: `npm run build` + `npm run verify` (Reticle 10/10, ICE 1.1)
green with `NEXT_DIST_DIR` isolation; tsc 0.

### Lane F4 — INFRA, RESILIENCE & CUSTODY (`docker-compose.prod.yml`, `deploy/Dockerfile*`, nginx conf, `workers/main.py` + shard scheduling, `requirements.txt`, `harness/backup.py` integration, git organization)
1. **Container limits (HIGH):** `mem_limit`/`cpus` for backends/worker/
   postgres/redis/qdrant sized to the 19.5GB host (backends ≈3GB each).
2. **Preroute shards → 02:00-05:00 window only** (they caused 12s logins
   and the 503 wall). Extend the existing worker window guard.
3. **Off-host backups (CRIT):** wire `harness backup` + a scheduled
   off-host copy step; rclone/robocopy to any configured target; if no
   target credentials exist, ship the script + print the exact owner
   command (owner runs it). Prove the restore drill still passes
   (scratch-DB safe).
4. **/metrics hardening (MED):** not public on :80 (nginx internal or
   bearer).
5. **Pins (LOW):** `qdrant:latest` → digest/`15`-style pin; 5 loose pins
   in requirements.
6. **Git custody (CRIT prep):** organize the 9,117 uncommitted paths into
   a clean commit series (code vs data vs evidence; `.gitignore` right),
   write `GIT_PUSH_RUNBOOK.md` with the exact owner commands for creating
   the private remote and pushing. Do NOT create remotes or push yourself.
Exit gate: compose config validates; window guard test; drill PASS;
runbook present. (Container limit/shard changes activate at ship.)

### Lane F5 — CONTENT & DATA HYGIENE (`deploy/content/**` + DB-data fix scripts under `deploy/backend/tools/` as NEW files)
1. **Bank meta-text leak:** the c12 phy TEG row whose `correct_answer`
   carries meta-text — fix the row(s) via a rerunnable idempotent script
   + guard test (scan bank for the pattern; audit said 1 confirmed, find
   any siblings).
2. **c12 accountancy 0 chapter-test chapters:** author chapter-test banks
   from the existing accountancy corpus nodes (generator-assisted,
   misconception-style, matching c6-c12 patterns) until testReady.
3. **Junior place-value wrong-grade diagram** (audit C15): re-verify
   against the current 215-game set; fix the mapping if still wrong.
4. **Trust-copy relabel PREP (do not apply):** write
   `_work/fix_2026_10_15/TRUST_COPY_DELTAS.md` — exact string changes
   ("from board papers" → "authored question bank" etc.) for owner
   approval; `board_questions.year` is NULL×403,620 and real-PYQ
   ingestion is a program, not a batch.
Exit gate: scripts idempotent + tested; accountancy banks serve a
complete chapter test on the dev instance; content-only diffs elsewhere.

### Lane F6 — INDEPENDENT VERIFICATION GATE (read-only on product; owns `_work/fix_2026_10_15/` only)
Dispatched last, after F1-F5 report. Re-runs the audit's instruments and
writes `AFTER.md` — the batch's verdict:
1. **Battery re-run:** the 150 novel stems (`laneA/battery.jsonl`) against
   the dev instance, LLM off; verdict table per stem; verified-wrong %,
   guided %, leaks 0 required. TARGET: <1% verified-wrong (or report the
   achieved number honestly with the residual list).
2. **Security re-probe:** `idor.py` matrix + 379-route unauth probe.
3. **Build gates:** Reticle 10/10, tsc 0, G2 pins + G3 boundaries + the
   corpus suite (incl. F2's new pinned checks) all green.
4. Write `BEFORE_AFTER.md`: per-finding fixed/not-fixed/partially, with
   command output per line. This file is what the coordinator reads
   before the single ship. FAIL anything → the lane that owns it fixes;
   F6 re-verifies. No "should work".

## 3. EXPLICITLY OUT OF SCOPE (owner-provided or owner-decision — list, don't attempt)

Private remote creation/push (runbook only) · off-host target credentials ·
domain/DNS/HTTPS · legal entity, `[PLACEHOLDER]` fills, `/refund`,
`/grievance`, sub-processor naming · Razorpay keys + any
`require_premium`/monetization gate flip · signup-409 trade-off ·
real PYQ ingestion · Hindi solver lane · chemistry/commerce computed
lanes · chapter-test steering feature · i18n wiring of 20 surfaces ·
langfuse deployment · funnel events table (next batch) · anything that
weakens a pin, bypasses the slop gate, or edits parked waves.

## 4. SHIP (coordinator, once)

All six lanes green on dev + F6's AFTER verdict clean → ONE ship per
AGENTS.md: docker-cp every changed backend file (stale-copy rule: diff
repo↔container first, pull if newer), frontend rebuild with the verified
`NEXT_DIST_DIR`, one manifest regen (`launch_check --update`), one
health-gated restart per backend, then post-ship: Reticle against :3001,
digest, watch --sweep, and the battery spot-check (20 stems) on prod.
Report ships with per-lane reports + F6's BEFORE_AFTER + BUGS.md
retags. If any lane is red at timebox: ship only the green lanes'
files, list the rest as OPEN with owners.

## 5. REPORT STANDARD

Per lane: What changed / Evidence (before→after numbers, test names,
log paths) / Files touched / Items filed to other lanes / Self-review /
Not covered. Claims without numbers are not evidence. Structure per
BRIEF_SHARED.md. The coordinator's final report opens with the batch
scorecard: verified-wrong %, criticals closed 4/4, probes clean Y/N,
Reticle, tsc, pins status.
