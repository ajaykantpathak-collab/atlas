# Atlas Loop Build Plan (coordinator working plan, 2026-10-13)

Source brief: `HARNESS_BUILD_PROMPT v2` (ATLAS LOOP). Wave order per §13 is law:
ops layer FIRST, then runner/gates, scans/corpus, snapshots/soak, judge/docs, demos.

## Environment facts (surveyed 2026-10-13)

- pg_dump / psql / chisel: NOT on host PATH (searched PATH, Program Files, conda).
- psycopg2 2.x + asyncpg + httpx + pytest + psutil present (Python 3.13.9).
- Postgres reachable at 127.0.0.1:5432 (db `dream_app`, user `dream_user`,
  URL in `_work/overhaul/.dburl.txt`); prod healthy on :80 and :3001.
- Telemetry: `runtime_data/ops/answer_telemetry.jsonl`, 39,269 rows, schema has
  NO question text/hash → mining clusters by (refusal_reason, subject, stage,
  text_len) signature; representative question recovered via sample_200 replay.
- 24h real numbers at survey: 936 rows, refusal 38.5% (RED), p95 45.3s (RED),
  disk 72% free (GREEN) — DEMO-1 has real reds and greens.
- Port 8020 free; boot recipe `bash _work/overhaul/boot_dev.sh` (~90-120s).
- `wsb_m2_parity.py <out.json>` runs from anywhere, LLM-free.
- G1 anchors exist: `tests/test_wsa_no_silent_pass.py`, `tests/test_boundaries.py`,
  `tests/test_ovhF_telemetry.py`; no `tests/corpus/` yet (DEMO-7 creates it).
- slop_gate public API: `gate_text(text, audience) -> (clean, flags)`.

## Documented deviations / decisions (all additive, none weaken a §2 constraint)

1. **Backup engines (pg_dump absent):** engine chain = host pg_dump (if ever
   present) → psycopg2 logical dump (schema DDL from catalogs + COPY CSV data,
   engine labeled in manifest) → print owner-approved docker exec command.
   Backup artifact is a directory `db-YYYYMMDD-HHMM/` (schema.sql.gz,
   data/*.csv.gz, runtime_state.zip, manifest.json). Restore-drill proves
   fidelity by row counts + probes. Never targets the live DB (name guard).
2. **G9 (chisel absent):** applicability matrix marks N/A with the verified
   reason until chisel is installed; recorded in plan receipts. OPEN ITEM.
3. **Reticle in watch:** never against production (writes session data). Runs
   only if `watch.reticle_dev_url` is configured (a dev FE); otherwise listed
   SKIPPED-with-reason in every watch report.
4. **Fleet:** coordinator builds directly, sequential, wave order preserved
   (concurrency 1 ≤ 2 cap). One MANDATORY fresh-context dispatch: the §8 judge
   (builder/judge separation) for DEMO-3.
5. **Digest verdict:** any threshold red → ACTION NEEDED (exit 7); else any
   unreachable source or ≥90%-of-limit value → DEGRADED (exit 0); else HEALTHY.

## Wave checklist

- [x] [W0-O1] digest.py + tests + real run — DEMO-1 PASS (exit 7, real reds)
- [x] [W0-O2] backup.py + restore-drill + tests — DEMO-2 PASS (84/84 tables)
- [x] [W0-O1b] watch.py + tests + --install-print — real sweep captured (10/11)
- [x] [W1-A] runner.py + templates + test_runner_states (11/11)
- [x] [W1-B] gates.py + test_gates (9/9) — G6 timeout calibrated to the
      repo's real parity runtime (2270s fleet log; 2700s budget, documented)
- [x] [W2-C] scans.py + corpus.py + mine.py + tests (26 tests)
- [x] [W2-D] snapshots.py + soak.py + tests (9 tests)
- [x] [W3-E] judge.py + README.md runbook
- [x] [W3-F] DEMO-4 (\x08 blocks, exit 2), DEMO-5 (STAGED->rollback
      byte-identical), DEMO-6 (3 seeded defects caught), DEMO-7 (mine ->
      pin red -> park with evidence). DEMO-3: carrier WI-20261013-004
      through judge-PASS STAGED; SOAK running; product change WI-001
      blocked by concurrent session's tree-red G2/G3 (attribution receipt).
- [x] Final: 69/69 harness tests green, self-review pass, DEMOS.md, report

## Incidents found & handled during the build (all documented)

1. PG15 ProcSignalBarrier hang on DROP DATABASE WITH (FORCE) — zombie
   dream_app backend stuck in ClientWrite (dead client) blocked the
   barrier cluster-wide. Fixed: terminate-then-drop + statement_timeout.
2. G5 full-tree scan found 2 real pre-existing hygiene defects (ANSI junk
   cleaned; intentional \x08 regex allowlisted with reason).
3. Receipt tamper-alert on own chain: G7 pinned a live boot log that kept
   growing (uvicorn writes into it). Fixed: live/frozen log split +
   append-only correction receipt mechanism.
4. Parity reality: 2270s for 200 stems — G6 600s default would red every
   solver batch forever; per-gate budget added (documented deviation).
5. pytest exits 5 on module-level skips — parked corpus cases now use
   in-test skips so the G1 fallback suite stays runnable.

