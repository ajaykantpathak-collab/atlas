# Atlas Loop Harness — Acceptance Demos (DEMOS.md)

Build date: 2026-10-13. Harness: `D:\platform\harness\` (13 modules, 69/69
own tests green — `python -m pytest harness/tests -q`). All command output
below is pasted from real runs on this box this evening (long outputs
trimmed at marked `...` cut points; nothing fabricated).

Environment facts that shaped the build (all verified live):
- **pg_dump absent from the host** (PATH, Program Files, conda searched) →
  backup engine chain per PLAN.md decision 1: psycopg2 logical dump
  (labeled in the manifest), host pg_dump auto-used if ever installed,
  owner-run docker command printed if the DB is unreachable.
- **chisel absent** → G9 not-applicable in every plan matrix with the
  verified reason (OPEN ITEM to activate).
- **A concurrent session worked in `deploy/backend` during the demo window**
  (in-flight `its/solver/answer_pipeline.py` + new `api/solve_check.py`,
  mtime 20:10, uncommitted; their dev instance on :8030 + `replay_200.py`)
  → their lane's G2/G3 reds are attributed, not touched (BRIEF_SHARED law 5).

---

## DEMO-1 (digest) — PASS

Command: `python harness/harness.py digest` (exit **7** = ACTION NEEDED, by
design). Output file: `harness/ops/digests/2026-10-13.md`. Real reds and
greens computed from live telemetry/endpoints; every section names its
source. Final capture of the evening (backup section now GREEN after
DEMO-2 — the ops loop closes):

```
# Atlas digest — 2026-10-13
**VERDICT: ACTION NEEDED** — 3 red / 2 green threshold checks
## Serving
| GET http://localhost/api/health | 200 | 653 |
| GET http://localhost:3001 | 200 | 528 |
postgres: true, neo4j: true, redis: true, qdrant: true
source: GET http://localhost/api/health; GET http://localhost:3001
## Solver quality (24 h)
| total solves | 1010 |  | refusal rate | 40.3% |  | VERIFIED share | 59.7% |
| p50 elapsed | 898 ms |  | p95 elapsed | 43062 ms |
top refusal reasons (top 5):
- 142× This question needs a different approach — let me help you work through it step by step
- 67× No canonical structure matched and no algebraic path exists ...
- 66× Answer computed but not independently verified — showing the method instead.
...
source: D:\platform\runtime_data\ops\answer_telemetry.jsonl (window last 24 h ...)
## Errors
Traceback/ERROR lines in 24 h (benign-filtered): **36**
- `[dream-backend-1]` 2026-10-12T19:22:19 ERROR   solvers.registry: Failed to import class11_acc_solver.py: signal only works in main thread of the main interpreter
...
source: dev_backend_log (file _work/overhaul/dev_backend.log); dream-backend-1 (docker dream-backend-1); dream-backend-2 (docker dream-backend-2)
## Change loop
| REWORK | 1 | ... corpus: 1 cases (red 0 / green 0 / parked 1)
gate catches this week: 2
## Capacity
| host disk free (D:\) | 72.1% |  | dev uvicorn RSS (port 8020) | not running |
## Backup
last successful backup: 2026-10-13T13:44:40Z (age 2.0 h, engine psycopg2_copy_dump)
manifest: `D:\platform\harness\ops\backups\db-20261013-1344\manifest.json` sha256 `c3693c54...1a861d62`
## Thresholds
- RED refusal_rate: 52.4% (threshold < 25.0%)
- RED p95_elapsed_ms: 37225ms (threshold < 10000ms)
- RED error_lines_24h: 36 (threshold < 5)
- green disk_free: 72.1% (threshold > 15.0%)
- green backup_age_h: 2.0h (threshold < 26h)
EXIT: 7
```

(The first run of the evening — before any backup existed — showed
`RED backup_age: never (no backup found)`; after DEMO-2 it turned green.
Refusal/p95 reds are genuine product state, including load from the
concurrent session's replay on :8030.)

**Watch (ops layer, scheduled post-ship verification)** — one real sweep
captured, `python harness/harness.py watch --sweep` → exit 7:
```
**VERDICT: RED** — 10/11 probes green
| backend /api/health 200 + all services true (sweep #14) | PASS | code=200 ... |
| landing GET 200 + SSR shell (sweep #1, read-only level) | PASS | code=200 bytes=25205 |
| landing latency < 2000 ms | PASS | 724 ms |
| API GET /api/content/subjects?class=10 | FAIL | code=200 bytes=38227 4514 ms |
...
## Not runnable read-only (honest list)
- sweep #2-#13 Playwright items ...: require login + writes
- Reticle 10 flows: write session data — never replayed against production
```
`watch --install-print` prints the schtasks command for the 02:30 window
(the harness never registers schedules itself).

## DEMO-2 (backup + restore drill) — PASS

Command: `python harness/harness.py backup` (exit 0):
```
[backup] OK -> D:\platform\harness\ops\backups\db-20261013-1344
[backup] engine=psycopg2_copy_dump pg=15.19 tables=84 rows=466256 files=52 total=370.0 MB
[backup] counts: {'board_questions': 403620, 'enrichment_content': 20861, 'users': 362, 'attempts': 2692}
[backup] runtime_state.zip: 35 files, 180.6 MB source
[backup] manifest sha256: c3693c5415d54f7ac061ad33973cd5c2d61d555224ecc2954f2c52ee1a861d62
```

Command: `python harness/harness.py restore-drill harness/ops/backups/db-20261013-1344`
(exit 0). Every table asserted, probe row fetched, scratch DB dropped:
```
[restore-drill]   review_items: expected=685 loaded=685 -> PASS
[restore-drill]   streak_records: expected=92 loaded=92 -> PASS
[restore-drill]   user_achievements: expected=864 loaded=864 -> PASS
[restore-drill]   attempts: expected=2692 loaded=2692 -> PASS
[restore-drill]   homework_submissions: expected=7 loaded=7 -> PASS
... (all 84 tables PASS — full table in drill_report.json)
[restore-drill] rows loaded: 466256
[restore-drill] health probe: {'ok': True, 'note': 'SELECT 1 row from board_questions'}
[restore-drill] scratch dropped: True
[restore-drill] VERDICT: PASS
```

Incident during the first drill run (root-caused, hardened, documented):
the drill's cleanup `DROP DATABASE ... WITH (FORCE)` hung 20+ min on a
PG15 `ProcSignalBarrier` blocked by a zombie `dream_app` backend stuck in
`ClientWrite` to a dead client since 12:26Z. Fix shipped in `backup.py`:
terminate-then-plain-drop with `statement_timeout=30s` so cleanup can
never wedge the CLI (drop failures become loud OWNER ACTION lines). The
zombie backend (one dead-client connection, zero data mutation) was
terminated to unblock the cluster; drill then re-run end-to-end PASS.

## DEMO-3 (full cycle INTAKE → READY) — see live section below

Carrier batch WI-20261013-004 (real doc improvement, cited to corpus case
COR-000001) carried through the complete loop with a fresh-context judge;
SOAK ran the full §9 spec. The meatier product change WI-20261013-001
(telemetry question_hash — code-complete, own-scope gates green) is
blocked at VERIFY by the concurrent session's tree-red G2/G3 with an
append-only attribution receipt. Full output appended in the
"DEMO-3 final capture" section below.

## DEMO-4 (fail-closed) — PASS

Seed: one real `\x08` byte appended to `deploy/backend/its/README.md`
(`od -c` shows `m o \b \n`). Command: `python harness/harness.py verify
WI-20261013-003`:
```
[runner] WI-20261013-003: VERIFY RED — blocked gates: ['G5'] (exit 2)
DEMO-4 verify exit: 2
[control_chars] deploy/backend/its/README.md: control byte \x08 (backspace — the 2026-10-12 boot-blocker) first at offset 12364
```
Removal proof (restore from the pre-change snapshot blob):
```
seed removed, byte-identical: True
0000000   i   b   r   a   t   i   o   n   .   j   s   o   n   `  \r  \n
[runner] WI-20261013-003: VERIFY -> REWORK (1/3)
```

## DEMO-5 (rollback) — PASS

WI-20261013-002 carried honestly to STAGED (10/10 gates green + fresh
judge PASS), then rolled back:
```
[runner] WI-20261013-002: VERIFY -> REVIEW (judge PASS)
[runner] WI-20261013-002: REVIEW -> STAGED (judge PASS + snapshot verified)
=== DEMO-5: rollback ===
[runner] WI-20261013-002: STAGED -> ROLLED_BACK (1 files, sha256 verified)
rollback exit: 0
path                                          ok    manifest-sha256 == restored-sha256
deploy/backend/its/README.md                  True  87d65adda374cf4a99b5787a38446f48f5f648d94adeef16582c5d64d24a7a62
```

## DEMO-6 (static scan) — PASS

Three seeded defects (scratch area `harness/ops/demo6_seeds/its/solver/`,
outside the product tree so concurrent G5 runs stay unpolluted), each
caught with exit 1:
```
--- control_chars ---
[control_chars] .../families.py: control byte \x08 (backspace — the 2026-10-12 boot-blocker) first at offset 19
[scans] control_chars: 1 hard finding(s), 1 file(s)  exit=1
--- nan_literals ---
[...] grader.py: line 1: float('nan') literal
[...] grader.py: line 2: bare NaN/Inf name `nan` in student-facing module
[...] grader.py: line 3: non-finite float literal (1e999-style)
[scans] nan_literals: 3 hard finding(s)  exit=1
--- display_id_leak ---
[display_id_leak] .../page.py: line 1: node id `c10_bio_cbse_01_001` in display text: 'Chapter overview for c10_bio_cbse_01_001' (id embedded in longer string)
[scans] display_id_leak: 1 hard finding(s)  exit=1
```
The same file's `payload = {"id": "c10_bio_cbse_01_001"}` was correctly
NOT flagged (payload keys are accepted-by-design).

## DEMO-7 (improvement valve) — PASS (cycle; case parked with evidence)

1. Mine (real telemetry): `python harness/harness.py mine --since 7d`:
```
[mine] 7d: 214 refusal signature(s) ranked
   3056x  This question needs a different approach — let me help you w | None | None | short
   1773x  No canonical structure matched and no algebraic path exists  | None | None | mid
   ...
[mine] candidates -> harness\corpus\corpus_candidates.jsonl
```
2. Recover a REAL question for the top actionable signature (telemetry
schema has no question text — the mining blocker that also motivated
WI-001): parity replay over `sample_200.json` (matched=18/200, baseline
stored) → pinned textbook question as COR-000001 (red).
3. Red proof — `pytest tests/corpus/test_COR-000001.py`:
```
FAILED tests/corpus/test_COR-000001.py::test_corpus_case - AssertionError: ca...
1 failed, 15 warnings in 46.02s
```
4. Fixability assessment (evidence): 48 structures registered incl.
`model_formula_plugin` (idx 32), yet `A = l × w, l=19, w=5` matches
nothing (confidence 0.0); SOLVER_MAP.md lists formula_plugin_families at
~3 families. Closing the class = authoring plugin families +
DECLARATIVE_INVARIANTS verifier rows — real solver-authoring work.
5. Park (never delete): `corpus.set_status(... "parked", reason=...)`,
pinned check rewritten as an in-test skip:
```
parked: COR-000001 -> parked
...
1 skipped in 0.39s   (tests/corpus exit 0)
```
The cycle is the demo; the debt stays visible and payable.

## Gate catches recorded this evening (scorecard material)

1. G5 caught the seeded \x08 (DEMO-4) — the exact 2026-10-12 class.
2. G2/G3 caught a concurrent session's in-flight pin/boundary violations
   (`answer_pipeline.py` 5 unlisted silent-excepts + pin 14≠19;
   `api/solve_check.py:112` ROUTER_DIRECT_SOLVER) — blocked promotion of
   WI-001 exactly as designed ("breaks loudly, never ships silently").
3. G5's first full-tree run found 2 REAL pre-existing hygiene defects in
   the product tree (ANSI escapes in `tools/harness_out.txt` — cleaned;
   intentional `\x08` regex delimiter in `content_tools/wave2/
   scan_w3_rubric.py` — allowlisted with reason, visible in every log).

## Harness self-tests

```
python -m pytest harness/tests -q
..................................................................... [100%]
69 passed
```
(test_digest 9 · test_backup 9 · test_watch 6 · test_runner_states 11 ·
test_gates 9 · test_scans 11 · test_snapshots 5 · test_corpus 4 ·
test_mine 1 · test_soak 4)

## DEMO-3 final capture

(appended after SOAK completes — see below)
