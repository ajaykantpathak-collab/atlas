# Judge brief — WI-20261013-002

Fresh-context judge. You did NOT build this change.

## Judge protocol (verbatim §8 of the operating prompt)

The agent that wrote the patch never grades it. You must, independently:

1. Re-run G5 in full and at least one behavioral gate (G1 or G6) yourself.
2. Check the diff for: banned phrases ("should work", unexplained
   TODO/FIXME), claims in the plan not backed by a log, pin changes,
   scope creep beyond the plan's file list.
3. Emit harness/receipts/<WI>/judge_verdict.json:

{"work_item": "<WI>", "verdict": "PASS|FAIL",
 "independent_reruns": [{"gate": "G5", "exit": 0}],
 "issues": [{"severity": "blocker|major|minor", "desc": "...",
             "evidence": "file:line or log path"}],
 "ts_utc": "..."}

FAIL -> the builder returns to REWORK with your issue list attached. The
builder may not argue issues away; it may only return new evidence. Two
consecutive FAIL verdicts -> FAILED.

## The plan

```json
{
 "plan": {
  "path": "D:\\platform\\harness\\receipts\\WI-20261013-002\\plan.md",
  "sha256": "98f6a20264db5866e8ab007545ddcb02fbbfc0cc91a014739552112681e1d5cb"
 },
 "files_in_scope": [
  "deploy/backend/its/README.md"
 ],
 "gates_expected": {
  "G1": {
   "applies": "apply",
   "reason": "no mapped test -> corpus pinned suite"
  },
  "G2": {
   "applies": "not_applicable",
   "reason": "no backend .py changed"
  },
  "G3": {
   "applies": "not_applicable",
   "reason": "no backend .py changed"
  },
  "G4": {
   "applies": "not_applicable",
   "reason": "no .py string literals changed"
  },
  "G5": {
   "applies": "apply"
  },
  "G6": {
   "applies": "not_applicable",
   "reason": "its/solver/** unchanged"
  },
  "G7": {
   "applies": "not_applicable",
   "reason": "no backend .py changed — no boot needed"
  },
  "G8": {
   "applies": "not_applicable",
   "reason": "no frontend change"
  },
  "G9": {
   "applies": "not_applicable",
   "reason": "chisel CLI not installed on host — verified 2026-10-13"
  },
  "G10": {
   "applies": "apply",
   "reason": "executes at SOAK state"
  }
 },
 "wi_type": "IMPROVEMENT",
 "citation": "corpus case COR-000001 (parked 2026-10-13): formula-substitution question\nrefuses to model — parity 2026-10-13 matched=18/200, top actionable refusal\nclass 2,884 rows/7d. Solver authors fixing such gaps need a documented\npointer from the solver tree to the corpus mining loop; this README change\nadds it (doc-only; the citation is the corpus case the docs describe how\nto attack)."
}
```

## The plan document

```markdown
# WI — its/README.md: point solvers at the corpus + harness loop

## Type

IMPROVEMENT

## Citation (improvement valve / refactor baseline)

corpus case COR-000001 (parked 2026-10-13): formula-substitution question
refuses to model — parity 2026-10-13 matched=18/200, top actionable refusal
class 2,884 rows/7d. Solver authors fixing such gaps need a documented
pointer from the solver tree to the corpus mining loop; this README change
adds it (doc-only; the citation is the corpus case the docs describe how
to attack).

## Files in scope

- deploy/backend/its/README.md

## Gates expected (applicability matrix)

- G1 : apply            (no mapped test -> corpus pinned suite)
- G2 : not_applicable   (no backend .py changed)
- G3 : not_applicable   (no backend .py changed)
- G4 : not_applicable   (no .py string literals changed)
- G5 : apply
- G6 : not_applicable   (its/solver/** unchanged)
- G7 : not_applicable   (no backend .py changed — no boot needed)
- G8 : not_applicable   (no frontend change)
- G9 : not_applicable   (chisel CLI not installed on host — verified 2026-10-13)
- G10: apply            (executes at SOAK state)

## Approach

1. Append a short "Corpus & improvement loop" section to its/README.md:
   how refusals become corpus cases (harness mine -> corpus add -> pinned
   red check in tests/corpus/) and where the parity baseline lives.
2. Doc-only change; rollback demo restores the file byte-identical.

```

## The diffs

```diff
--- a/deploy/backend/its/README.md
+++ b/deploy/backend/its/README.md
@@ -207,3 +207,19 @@
 - `backend.services.answer_evaluator` (shared with tutor_service)
 - `backend.models.*`, `backend.database` (SQLAlchemy layer)
 - Data files: `tutor_brain/tutor_brain.json`, `services/agent_calibration.json`
+
+---
+
+## Corpus & improvement loop (2026-10-13)
+
+Every refusal the platform emits is telemetry
+(`runtime_data/ops/answer_telemetry.jsonl`); `harness mine --since 7d`
+ranks refusal signatures into `harness/corpus/corpus_candidates.jsonl`,
+and `harness corpus add` pins a case: one line in
+`harness/corpus/cases.jsonl` plus a failing check under
+`backend/tests/corpus/` that runs inside the G1 touched-area gate. Solver
+work that closes a refusal class must cite the case it fixes (red before,
+green after); cases that need real authoring stay `parked` with evidence
+instead of being dropped. The parity baseline for "file layout changed,
+not behavior" proofs lives at `harness/ops/parity_baseline.json`
+(`_work/overhaul/wsb_m2_parity.py`, LLM off).
```

## The gate results (latest VERIFY receipt)

```json
[
 {
  "id": "G5",
  "name": "static scans (control/nan/id/parse/pins/oversize)",
  "ok": true,
  "exit": 0,
  "seconds": 20.7,
  "skipped": false,
  "reason": "",
  "log": "harness/receipts/WI-20261013-002/logs/G5_scans.log",
  "log_sha256": "b169ba7cd52a27289f24776f85a43c0592a0e004bf0ccce78258e559b46e9e32",
  "hard_findings": 0
 },
 {
  "id": "G1",
  "name": "pytest tests/corpus",
  "ok": true,
  "exit": 0,
  "seconds": 11.5,
  "skipped": false,
  "reason": "",
  "log": "harness/receipts/WI-20261013-002/logs/G1_pytest.log",
  "log_sha256": "c55c11d0cbedb60eea494d0e24e7d6c2f0d441d63317d177b192bad1dcb5120e",
  "tests": [
   "tests/corpus"
  ]
 },
 {
  "id": "G2",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "no backend .py changed"
 },
 {
  "id": "G3",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "no backend .py changed"
 },
 {
  "id": "G4",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "no .py string literals changed"
 },
 {
  "id": "G6",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "its/solver/** unchanged"
 },
 {
  "id": "G9",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "chisel CLI not installed on host \u2014 verified 2026-10-13"
 },
 {
  "id": "G7",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "no backend .py changed \u2014 no boot needed"
 },
 {
  "id": "G8",
  "name": "not applicable per plan matrix",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": true,
  "reason": "no frontend change"
 },
 {
  "id": "G10",
  "name": "soak thresholds",
  "ok": true,
  "exit": 0,
  "seconds": 0.0,
  "skipped": false,
  "reason": "",
  "linked": false,
  "note": "executes at SOAK state; VERIFY linked no recent receipt"
 }
]
```

Gate logs live under the paths in each gate entry (relative to D:\platform); read them.

## Your output

Write `harness/receipts/WI-20261013-002/judge_verdict.json` using the schema above, then hand it back to the coordinator.