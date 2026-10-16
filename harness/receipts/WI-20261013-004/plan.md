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
