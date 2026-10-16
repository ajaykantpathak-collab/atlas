# WI-<id> — <title>

## Type

IMPROVEMENT

## Citation (improvement valve / refactor baseline)

IMPROVEMENT: cite >= 1 corpus case id (COR-xxxxxx) or telemetry row
(file + line/ts) this change addresses.
REFACTOR: cite the parity baseline file preserved
(harness/ops/parity_baseline.json) and the behavior invariant kept.

## Files in scope

- deploy/backend/its/solver/example.py

## Gates expected (applicability matrix)

- G1 : apply
- G2 : apply            (backend .py changed)
- G3 : apply            (backend .py changed)
- G4 : apply            (solver/routers/services strings changed)
- G5 : apply
- G6 : apply            (its/solver/** changed)
- G7 : apply            (backend .py changed — dev boot)
- G8 : not_applicable   (no frontend change)
- G9 : not_applicable   (chisel CLI not installed on host — verified <date>)
- G10: apply            (via SOAK)

## Approach

1. What changes, in order.
2. Which test proves it.
3. Rollback note (snapshot covers every file above).
