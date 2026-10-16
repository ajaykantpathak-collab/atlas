# GOLDEN-MATHS — one-subject end-to-end golden path (CBSE maths)

Run: 2026-10-06 20:58 | result: **16/16 stations pass**

Template: `tests/physics_e2e_golden.py`. Live Postgres, no LLM
(`SOLVER_LLM_MODE=off`), throwaway student, cleanup verified.

| # | Station | Result | Evidence |
|---|---------|--------|----------|
| 1 | 1a maths learnpath exists | PASS | 12 lessons |
| 2 | 1b next_lesson starts at lesson 1 | PASS | first=The Fundamental Theorem of Arithmetic st |
| 3 | 1c gating advances after done | PASS | next=The Highest Common Factor (HCF) of two o |
| 4 | 2a batch serves maths | PASS | 5/5 in 365ms; types={'short_answer'} |
| 5 | 2b distinct ids | PASS | 5 questions |
| 6 | 2c batch stays in the maths lane | PASS | nodes=['c10_math_cbse_03_005', 'c10_math_cbse_05_008', 'c10_math_cbse_08_006'] |
| 7 | 3a quadratic roots verified | PASS | VERIFIED: [-1/2, 3] |
| 8 | 3b AP 10th term verified | PASS | VERIFIED: 29 |
| 9 | 3c coordinate geometry verified | PASS | VERIFIED: 5 |
| 10 | 3d trig ratio verified | PASS | VERIFIED: cos A = 4/5 |
| 11 | 4a socratic sign_flip dialogue builds | PASS | 5 moves; elicit quotes the wrong answer |
| 12 | 4b socratic isolate move grades | PASS | iso1 graded correct=True, next=retry |
| 13 | 5 BKT moves up+down on maths node | PASS | 0.000 -> 0.400 -> 0.169 (dup=False, orm_error=None) |
| 14 | 6 SM-2 review scheduled | PASS | row=yes, interval=1, reps=1 |
| 15 | 7 XP exactly-once | PASS | first=True, replay dup=True |
| 16 | 8 cleanup green | PASS | residual rows: {'reward_event_log': 0, 'streak_freezes': 0, 'review_items': 0, 'mastery_records': 0, 'users': 0} |

## Failures

None — every station green.

## How to run

```bash
cd D:/platform/deploy/backend
DATABASE_URL=postgresql+asyncpg://dream_user:...@127.0.0.1:5432/dream_app \
PYTHONPATH=D:/platform/deploy SOLVER_LLM_MODE=off \
python tests/test_maths_e2e_golden.py   # exit 0 = all green
```

Zero Docker. Creates its own student, verifies cleanup left zero
residual rows across reward_event_log / streak_freezes /
review_items / mastery_records / users, exit code 0 on green.

## Fixes applied during bring-up

- Station 8 (cleanup verify): the `users` table is keyed by its
  PK `id`, not `user_id` — a uniform `WHERE user_id` loop threw
  ProgrammingError on the users count. Fixed with a per-table
  column map (users→id, all ledger/progress tables→user_id).
- Station 5 evidence: `record_assessment` returns
  `duplicate`/`mastery`/`orm_error` (the physics template's
  `orm_written`/`asyncpg_written` keys are stale — always None);
  evidence now reports the real keys.

## Out-of-lane notes

- No maths-solver bug found: all four board-numerical grading
  stations (quadratic, AP, coordinate geometry, trig) shipped
  VERIFIED on first probe. No edits to maths-lane solver
  families were needed.
