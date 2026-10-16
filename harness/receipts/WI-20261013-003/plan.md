# WI — DEMO-4 fail-closed acceptance: seeded control byte must block promotion

## Type

REFACTOR

## Citation (improvement valve / refactor baseline)

Parity baseline harness/ops/parity_baseline.json (matched=18/200, stored
2026-10-13). No its/solver/** file is touched by this scope, so the parity
baseline is trivially preserved; this work item exists to prove the
fail-closed property (DEMO-4 of the operating prompt): a deliberately
seeded \x08 control byte in a served-tree file must make G5 red and block
promotion with exit code 2. The seed is removed after the catch is
recorded.

## Files in scope

- deploy/backend/its/README.md

## Gates expected (applicability matrix)

- G1 : apply            (corpus pinned suite fallback)
- G2 : not_applicable   (no backend .py changed)
- G3 : not_applicable   (no backend .py changed)
- G4 : not_applicable   (no .py literals changed)
- G5 : apply            (this is the gate under test)
- G6 : not_applicable   (its/solver/** unchanged)
- G7 : not_applicable   (no backend .py changed)
- G8 : not_applicable   (no frontend change)
- G9 : not_applicable   (chisel CLI not installed on host — verified 2026-10-13)
- G10: apply            (executes at SOAK state)

## Approach

1. Seed one \x08 byte into the README (the 2026-10-12 physics_families.py
   boot-blocker class).
2. verify -> G5 must catch it, exit code 2, promotion blocked.
3. Remove the seed; REWORK receipt documents the removal.
