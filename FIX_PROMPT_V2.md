# ATLAS FIX BATCH v2 — FINISH (6 agents max, crisp)

Context: `AUDIT_PACKAGE_2026-10-15.md` + `BUGS.md` [LAUNCH-FIX-F*] entries.
v1 landed F1/F3/F5 nearly complete; F2/F4 files exist but unverified/unretagged;
F6 (verification gate) never ran; live proofs blocked by the Docker outage.

## STEP 0 — OWNER (before dispatch): restore Docker Desktop daemon.
Prod :80 + postgres :5432 are DOWN right now (daemon npipe gone since
~20:35 2026-10-15). Nothing else proceeds without it. FE :3001 (native) is up.

## LANES (dispatch 2-5 in parallel once step 0 clears; 1 and 6 are sequential)

**R1 — Verify & retag F4 (infra).** Files already landed: compose mem/cpus
(11 entries), preroute window guard + `test_fixf4_preroute_window.py`,
off-host backup wiring, `GIT_PUSH_RUNBOOK.md`, pins. Run its tests, validate
`docker compose config`, restore-drill one backup, retag all claims
`[fixed-fixf4-*]` in BUGS.md with test output. 45 min cap.

**R2 — Finish F2 (solver truth) — the batch metric.** Artifacts exist
(`_work/fix_2026_10_15/f2/`, `tests/corpus/test_COR-000002..011`,
`tests/test_fixf2_solver_truth.py`) but nothing is retagged. Run the suites;
if red, fix to green (LLM off, pins only down, route through answer());
prove the 10 verified-wrong stems red→green via the pinned checks; retag
`[fixed-fixf2-*]`; write F2_REPORT.md. 2h cap.

**R3 — Live-proof backlog (one agent, all saved scripts).** In
`_work/fix_2026_10_15/`: `f1_unauth_probe.py --idor`,
`f3_drift_routes_probe.py`, `f3_live_class_recs_probe.py`,
`f3_onboard_repro` E2E leg, `f5_ct_verify.py` (13/13 accountancy catalog +
15q solve on :8020). Run each against a fresh dev instance (:8020, boot
per dev_instance.md), paste results into BUGS.md retags. 90 min cap.

**R4 — Two dropped handoffs.** (a) ClickHouse secret
`content_parsers/setup_clickhouse_analytics.py:35` hardcoded password → env
chain + refuse-to-run + extend `test_fixf1_secrets.py` (file is free — F1
waived it). (b) `public/data/games/c1_CountingGame.json` slides[3]: bar
values 40/60 contradict "14 vs 9" text → fix bars. TDD where testable. 45 min.

**R5 — F6 verification gate (dispatch after R1-R4 green).** Re-run: battery
(150 stems, `laneA/battery.jsonl`, LLM off) → verified-wrong % target <1%;
idor matrix; 379-route unauth probe; Reticle 10/10 (`npm run verify`); tsc
0; G2+G3+corpus suites. Write `_work/fix_2026_10_15/AFTER.md` +
`BEFORE_AFTER.md` (per-finding fixed/not, command output per line).

**R6 — SHIP (coordinator-only, after R5 clean).** One health-gated ship per
AGENTS.md (stale-copy rule, FE rebuild, one manifest regen, one restart per
backend), then post-ship: digest, watch --sweep, 20-stem battery spot-check
on prod. If any lane red at timebox: ship green lanes' files only, list OPEN.

## LAWS (same as v1, abridged)
deploy/ only · agents never touch Docker/restarts · TDD every fix ·
claim/retag in BUGS.md · pins only down · no LLM calls · heavy jobs
02:00-05:00 only · parked waves untouched · timeboxes hard · no "should work".

## OUT (owner): domain/legal, Razorpay keys + gate flips, PYQ ingestion,
Hindi/chemistry lanes, steering feature, i18n wiring, langfuse, git remote
creation (runbook exists).
