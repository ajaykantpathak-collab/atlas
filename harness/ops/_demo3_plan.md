# WI — solve telemetry: privacy-preserving question_hash

## Type

IMPROVEMENT

## Citation (improvement valve / refactor baseline)

telemetry mining blocker, verified live 2026-10-13: `harness mine --since 7d`
ranked 214 refusal signatures from runtime_data/ops/answer_telemetry.jsonl,
but the solve-row schema carries NO question text and NO question hash
(fields: text_len only — sample rows at lines 39572/37170, refusal clusters
3056x "needs a different approach" / 1773x "No canonical structure
matched"). Corpus mining cannot group identical questions; candidates had
to be recovered by replaying sample_200 stems. This change adds a stable
sha256-based question_hash (16 hex, whitespace-normalized, lowercase) so
future mining groups by actual question while keeping the file
scrub-safe (no raw text, privacy property preserved per the existing
comment in record_solve).

## Files in scope

- deploy/backend/services/answer_telemetry.py
- deploy/backend/tests/test_answer_telemetry.py

## Gates expected (applicability matrix)

- G1 : apply            (new tests/test_answer_telemetry.py maps to the changed service)
- G2 : apply            (backend .py changed)
- G3 : apply            (backend .py changed)
- G4 : apply            (services/ strings changed — docstrings + code)
- G5 : apply
- G6 : not_applicable   (its/solver/** untouched; modeling_layer unchanged)
- G7 : apply            (backend .py changed — dev boot + health)
- G8 : not_applicable   (no frontend change)
- G9 : not_applicable   (chisel CLI not installed on host — verified 2026-10-13)
- G10: apply            (executes at SOAK state)

## Approach

1. Add `_question_hash(text)` helper (sha256 of whitespace-normalized
   lowercase text, first 16 hex; None for empty) to services/answer_telemetry.py
   and emit `question_hash` in record_solve rows.
2. New tests/test_answer_telemetry.py (mirrors the CL-06 capture pattern):
   hash present + 16 hex; stable under case/whitespace variation; None for
   empty text; raw text never present in the row.
3. Rollback: snapshot covers both files; the new test file deletes on
   rollback.
