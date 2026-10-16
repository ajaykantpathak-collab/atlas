# GOLDEN_CHEM.md — Chemistry one-subject end-to-end golden path

**Date:** 2026-10-06 · **Owner:** GOLDEN-CHEM agent · **Scope:** chemistry lane only
**Template:** `deploy/backend/tests/physics_e2e_golden.py` (modeled exactly)
**Test:** `deploy/backend/tests/test_chem_e2e_golden.py`
**Env:** real Postgres (`dream_app`), `SOLVER_LLM_MODE=off`, PYTHONPATH=D:/platform/deploy,
zero Docker, zero restarts, no LLM. Own test student; cleanup by user_id.

## Final results (two consecutive green runs, exit 0)

```
student 5e169ffe-c376-4021-9381-348064fcb1c4        (run A)          (run B: a7b76a33-…)
[PASS] 1a learnpath exists: 10 lessons                              PASS
[PASS] 1b next_lesson starts at lesson 1: A chemical change         PASS
[PASS] 1c gating advances after done: A chemical equation           PASS
[PASS] 2a batch serves chemistry: 5/5 (~200ms; short_answer/fill_blank/true_false)
[PASS] 2b distinct ids: 5 questions                                 PASS
[PASS] 5 BKT moves up+down: 0.000 -> 0.400 -> 0.169 (orm_error=None)
[PASS] 6 SM-2 review scheduled: row=yes, interval=1, reps=1         PASS
[PASS] 7 XP exactly-once: first=True, replay dup=True               PASS
[PASS] 3a solver n=m/M mole verified: VERIFIED: 1 mol               PASS
[PASS] 3b solver balances H2+O2->H2O: VERIFIED: 2 H2 + O2 -> 2 H2O; tally LHS=RHS={H:4, O:2}
[PASS] 4 socratic mole_concept_error builds: 5 moves [elicit, isolate, isolate, retry, handoff]
=== GOLDEN PATH: 11/11 stations pass ===  (cleanup: removed 5 rows)
```

Both post-hardening runs: **11/11, exit 0, cleanup green** (users,
mastery_records, review_items, reward_event_log, mastery_state removed by
user/student id; streak_freezes and mastery_event_log had 0 rows and are also
in the cleanup list).

## Station notes (chemistry-specific)

- **Learnpath** — `get_path(10, "chemistry", 1)` returns 10 lessons for
  Chemical Reactions & Equations (`c10_chem_cbse_01_001…`); prereq gating
  advances correctly.
- **Practice** — `select_batch(subject="chemistry", class_level=10)` serves a
  real mixed-type session in ~0.2 s.
- **Grading / mole** — `"How many moles are in 98 g of H2SO4 (molar mass 98
  g/mol)?"` → **VERIFIED: 1 mol** (98/98, n = m/M family, MOLE_MASS_ANY).
- **Grading / balance + the KNOWN ISSUE verdict** — `"Balance: H2 + O2 -> H2O"`
  → **VERIFIED: "balanced equation: 2 H2 + O2 -> 2 H2O"**.
  **Verdict: the SOLVER OUTPUT IS CORRECT CHEMISTRY — the original needle
  test was the bug.** 2 H2 + O2 -> 2 H2O is the canonical smallest-whole-number
  balancing (4 H and 2 O on each side). No solver fix was needed. The test was
  fixed to judge like an examiner instead of needle-matching naively:
  1. normalized needle `2h2+o2->2h2o` (strips the "balanced equation: " prose
     prefix and whitespace), and
  2. an independent atom-audit: re-parse the solver's own output with
     `parse_formula` and require LHS = RHS per element (H: 4 = 4, O: 2 = 2).
- **Socratic** — `build_sequence("mole_concept_error", "2", <mole q>, "1 mol")`
  builds the full 5-move script; elicit quotes the wrong answer, two isolating
  questions carry server-side answer keys, retry + handoff close the script.
- **BKT** — on chemistry node `c10_chem_cbse_03_010` (from the served batch):
  mastery 0.000 → 0.400 (correct) → 0.169 (wrong); both stores clean
  (`orm_error=None`, `duplicate=False`).
- **SM-2 / Rewards** — review row scheduled at interval 1; XP exactly-once via
  the ledger replay gate.

## Failures encountered during the build (root-caused, all resolved)

| # | Symptom | Root cause | Fix | Status |
|---|---------|-----------|-----|--------|
| 1 | `3b` FAIL: tally `LHS=None` | Test fed the prose prefix `"balanced equation: "` into the formula parser (test bug, not solver bug — solver output was correct chemistry) | Strip prose before `->` (`lhs.split(":")[-1]`) + examiner atom-audit; documented above | FIXED (test-side) |
| 2 | One mid-build run: stations 5/6/7 FAIL with "no users row", FK violations, "User not found" | Transient: the test student's `users` row was invisible to fresh sessions right after commit, during a window when sibling golden agents (maths/bio) were hammering the shared Postgres; every later DB write then FK-safely skipped | Hardened creation block: verify visibility in a FRESH session, retry once, abort honestly if still invisible (no fail-walk on a phantom student) | FIXED (hardened; 2 subsequent runs green) |
| 3 | Physics-template evidence printed `orm=None, asyncpg=None` | Those keys don't exist on `record_assessment`'s return (`duplicate`/`mastery`/`orm_error` are the honest keys) | Chemistry test reports `orm_error` + `duplicate` | FIXED (cosmetic) |

## Cleanup contract

`_cleanup()` deletes, per test student: `reward_event_log`, `streak_freezes`,
`review_items`, `mastery_records`, `users` (user_id-keyed) plus the live-store
tables `mastery_state` and `mastery_event_log` (student_id-keyed). Final runs
each removed 5 rows; a leftover sweep found zero `chem-e2e-*` / `phy-e2e-*`
users and user count unchanged (358 before/after).

## Run command

```
cd D:\platform\deploy\backend
DATABASE_URL="postgresql+asyncpg://dream_user:at_-A518N1wtwyd6P-_sAWwlAGT9bdsAuoT@127.0.0.1:5432/dream_app" \
PYTHONPATH=D:/platform/deploy python tests/test_chem_e2e_golden.py
```

Next step (owner directive 2026-10-06): one-class-at-a-time board-question
depth passes over the chemistry solver, class 9 first — see the per-class
bug-table documents that follow this file in `content_tools/pedagogy/`.

## Postscript (2026-10-06 late): class-9 depth pass changed solver lanes

The class-9 board battery (`CHEM_CLASS9_BOARD.md`) landed five solver fixes
(PAL temperature-template gate, `_c_moles` formula-tail bite, particles
formula-split, particles ask-precision, latent-heat J/g, neurolink value-ask
guard). Golden stations re-verified offline post-fix: learnpath 10 lessons +
gating ok, socratic 5-move build ok, and the three grading anchors
(mole 1 mol, balance 2 H2 + O2 -> 2 H2O, plus physics V=IR 6 Ω) all VERIFIED.
DB stations (2a/2b/5/6/7) need Postgres — **pending live re-check** when the
owner brings the database back; re-run `tests/test_chem_e2e_golden.py` then.
