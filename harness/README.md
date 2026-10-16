# Atlas Loop Harness — runbook

Tooling for two jobs: (1) telling the owner every morning how the app is
doing and proving the data survives loss, (2) forcing every agent-driven
change through gates, receipts, judge, soak — fail-closed, rollback in one
command. The harness NEVER deploys, never restarts Docker, never writes to
production. Its terminal state is READY; `ship-confirm` is owner-only.

All commands run from `D:\platform` in Git Bash:

    python harness/harness.py <command>

## A day in the life (ops layer)

1. **Morning:** `python harness/harness.py digest`
   → `harness/ops/digests/YYYY-MM-DD.md` — one screen: serving, solver
   quality (24 h), errors, change loop, capacity, backup. Exit 7 means
   ACTION NEEDED (some threshold is red); the RED lines name the value and
   the threshold so you can act without re-deriving anything.
2. **Night (02:00–05:00 window, owner registers once):**
   - `python harness/harness.py watch --install-print` prints the exact
     `schtasks` command for the nightly post-ship probe sweep (the harness
     never registers schedules by itself).
   - `python harness/harness.py backup` — DB dump + runtime-state zip +
     sha256 manifest + retention (14 daily / 4 weekly). Engine chain:
     host pg_dump → psycopg2 logical dump → prints the owner-run docker
     command if the DB is unreachable.
3. **After any backup:** `python harness/harness.py restore-drill
   harness/ops/backups/db-<stamp>` — restores into a scratch database
   `atlas_restore_drill_<ts>` (NEVER the live one), asserts row counts for
   every table against the manifest, probes a row, drops the scratch DB.
   A backup that has not passed a drill is a rumor.

## A batch through the change loop

    python harness/harness.py new WI-20261014-001 --title "..." --lanes deploy/backend/its/solver/x.py
    # write the plan (templates/plan_template.md — citation is MANDATORY:
    # IMPROVEMENT cites a corpus case or telemetry row; REFACTOR cites the
    # parity baseline; the applicability matrix declares expected gates)
    python harness/harness.py plan WI-20261014-001 --plan plan.md
    python harness/harness.py snapshot WI-20261014-001     # pre-change blobs
    python harness/harness.py advance WI-20261014-001 --to IMPLEMENT
    # ... edit files (deploy/ only) ...
    python harness/harness.py verify WI-20261014-001        # G1..G10
    # fresh-context judge (judge.py builds the brief; the judge re-runs G5
    # + one behavioral gate itself and writes judge_verdict.json)
    python harness/harness.py review WI-20261014-001 --verdict harness/receipts/WI-.../judge_verdict.json
    python harness/harness.py advance WI-20261014-001 --to STAGED
    python harness/harness.py soak WI-20261014-001          # boots/reuses :8020
    python harness/harness.py advance WI-20261014-001 --to READY
    # OWNER ships (outside the harness), then records it:
    python harness/harness.py ship-confirm WI-20261014-001 --manifest <ship manifest>

- **verify** runs cheap gates first (G5 static), boot last (G7) — a seeded
  defect fails fast. Exit 2 = red/blocked; the WI sits in VERIFY with the
  red receipt; recover via `advance --to REWORK` (max 3, then FAILED).
- **rollback** (legal from STAGED/SOAK/READY): restores every snapshot
  file byte-identical, prints the sha256 table, writes the ROLLED_BACK
  receipt.
- **status** re-verifies the whole receipt chain (hash links + gate-log
  sha256); a broken chain is a tamper alert (exit 6).

## Gates (G1–G10) — what they wrap

G1 touched-area pytest (falls back to the pinned corpus suite; if neither
maps it BLOCKS) · G2 PIN_TOTALS monotonic · G3 boundaries import lint ·
G4 antislop scrub on new/changed solver strings (slop_gate.gate_text) ·
G5 static scans (control chars incl. \x08/\x00/\x1b, NaN literals, node-id
display leaks, pin increases, oversize, parse) · G6 solver parity vs
baseline (changed stems need `harness/receipts/<WI>/G6_causes.txt` lines
`stem_id: cause`) · G7 dev boot + health · G8 frontend Reticle ·
G9 chisel diff-impact (requires the chisel CLI on PATH; absent ⇒ matrix
must declare N/A with the reason) · G10 soak (executes at SOAK).

## The improvement valve

`harness mine --since 7d` ranks refusal signatures from
`runtime_data/ops/answer_telemetry.jsonl` into
`harness/corpus/corpus_candidates.jsonl`. Enrich a candidate with a real
`question_text` (replay stems from `_work/overhaul/sample_200.json`), then
`corpus --add --from ...` pins it: a case line in
`harness/corpus/cases.jsonl` + a failing check in
`deploy/backend/tests/corpus/`. An IMPROVEMENT plan may not pass PLAN
without citing a case or telemetry row; VERIFY proves red-before /
green-after. Cases are append-only; superseded ⇒ `parked` with reason.

## Exit codes

0 ok · 2 gate/soak red or blocking SKIPPED · 3 illegal transition ·
4 missing evidence/receipt/snapshot · 5 judge FAIL · 6 tamper alert ·
7 ops threshold breach (digest/watch).
