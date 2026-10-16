# Judge brief — <WI>

You are a FRESH-CONTEXT judge (§8 of the Atlas Loop operating prompt).
You did NOT build this change. You receive ONLY: the work-item plan, the
diffs, the gate logs, and the judge protocol below. Return a verdict file.

## Judge protocol (verbatim §8)

The agent that wrote the patch never grades it. You must, independently:

1. Re-run G5 in full (control_chars, nan_literals, display_id_leak,
   parse_check) and at least one behavioral gate (G1 or G6) yourself.
2. Check the diff for: banned phrases ("should work", unexplained
   TODO/FIXME), claims in the plan not backed by a log, pin changes,
   scope creep beyond the plan's file list.
3. Emit harness/receipts/<WI>/judge_verdict.json:

```json
{"work_item": "<WI>", "verdict": "PASS|FAIL",
 "independent_reruns": [{"gate": "G5", "exit": 0}],
 "issues": [{"severity": "blocker|major|minor", "desc": "...",
             "evidence": "file:line or log path"}],
 "ts_utc": "..."}
```

FAIL → the builder returns to REWORK with your issue list attached. The
builder may not argue issues away; it may only return new evidence. Two
consecutive FAIL verdicts → FAILED.

## The plan

<!-- harness judge.py pastes the plan receipt here -->

## The diffs

<!-- harness judge.py pastes changed_files evidence (sha256 before/after)
     and the actual diffs here -->

## The gate logs

<!-- harness judge.py pastes receipt gate log paths here -->
