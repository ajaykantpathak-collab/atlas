# GOLDEN_BIO.md — Biology one-subject end-to-end golden path + the honest-refusal contract

**Date:** 2026-10-06 · **Owner:** GOLDEN-BIO agent · **Scope:** biology lane only
**Template:** `deploy/backend/tests/physics_e2e_golden.py` (modeled exactly)
**Test:** `deploy/backend/tests/test_bio_e2e_golden.py`
**Env:** real Postgres (`dream_app`), `SOLVER_LLM_MODE=off`, PYTHONPATH=D:/platform/deploy,
zero Docker (one owner-authorized `docker start dream-postgres` after an
environment outage, see below), zero restarts, no LLM. Own test student;
cleanup by user_id (reward_event_log, streak_freezes, mastery_event_log,
mastery_records, review_items, activity_logs, users).

## Why biology's golden path is DIFFERENT from physics

Physics is computational: nearly every board question reduces to a formula,
so the golden path asserts SOLVES. Biology is conceptual: most biology
questions are prose — "why", "explain", "define", "differentiate" — and the
deterministic engine CANNOT grade prose without an LLM. Per platform law it
must never guess and never ship an unverified guess, so the golden path
asserts a DIFFERENT contract, per question type:

> **The biology grading contract (one line):** what the anchored NCERT fact
> table can verify, SOLVES; everything else REFUSES HONESTLY
> (GUIDED_PRACTICE, answer=None, refusal_reason present).
> VERIFIED-wrong is a FAIL for anything; a bare fact noun shipped as the
> answer to a WHY question is also a FAIL (dishonest non-answer).

## Station map (18 stations)

| # | Station | Contract asserted |
|---|---------|-------------------|
| 1a-c | learnpath `get_path(10,"biology","1")` | 12-lesson strand path, next_lesson starts at seq 1, prereq gating advances |
| 2a-b | `select_batch(subject="biology", class_level=10)` | ≥3/5 served in <2 s, distinct ids, every question carries `correct_answer` |
| 3a | factual recall ("powerhouse of the cell?") | SOLVES: VERIFIED, answer=Mitochondria |
| 3b | MCQ with options | SOLVES: VERIFIED, `option (b) Mitochondria` — only when exactly ONE option carries the fact |
| 3c | why-question | HONEST REFUSAL: GUIDED_PRACTICE, answer=None, refusal_reason present |
| 3d | definition ("Define osmosis.") | HONEST EITHER WAY: VERIFIED with the canonical NCERT definition (neurolink concept lane, warm index) OR GUIDED_PRACTICE honest refusal (cold index). FAIL only if verified-but-wrong, non-verified-but-answered, or no refusal reason |
| 3e | why-form of a KNOWN fact | STILL REFUSES (the guard proves the anchor is not leaking into prose) |
| 3f | objective rows (true_false / fill_blank) | grade via `PracticeService._check_answer` against `correct_answer` — right key passes, wrong key fails |
| 4a-d | socratic `genetics_dominance` | 5-move script builds, elicit quotes the wrong answer, iso1 grades 1/4 → retry, 3/4 falls to iso2, payload leaks no keys/values, catalog maps the misconception to biology classes 10-12 |
| 5 | BKT | mastery up on correct (0.000→0.400), down on wrong (→0.169) |
| 6 | SM-2 | review row scheduled, interval ≥1 |
| 7 | XP ledger | exactly-once (replay flagged duplicate) |

## What biology CAN be auto-graded on (verified SOLVES)

1. **Canonical NCERT recall facts with ONE unambiguous answer** — served by
   the new question-side fact anchor `BiologyCognitiveEngine.evaluate_fact_recall`
   (`deploy/backend/its/solver/biology_cognitive_engine.py`), wired at the
   biology branch of the cognitive-domain pre-route in `answer_pipeline.py`
   (route `biology:fact_recall`, gate `ncert_fact_anchor`, lane A):
   - "powerhouse of the cell" → Mitochondria (Cl 11, Ch 8 §8.5.4)
   - "suicidal bags of the cell" → Lysosome (Cl 11, Ch 8 §8.5.4.5)
   - "kitchen of the cell" → Chloroplast (Cl 11, Ch 8 §8.5.3)
   - "control centre / brain of the cell" → Nucleus (Cl 11, Ch 8 §8.5.2)
   - "energy currency of the cell" → ATP (Cl 11, Ch 14 §14.2)
   Adding a fact = one dict entry. The anchor fires ONLY when the question
   (a) matches the canonical phrase, (b) is a factual ask (which/what/name/
   identify/called/known as), (c) is NOT a why/explain/how/compare form,
   and (d) when options exist, EXACTLY ONE option carries the term.
   Zero matches or two-plus matches refuse — never guess.
2. **Numeric biology** (pre-existing): ATP respiration balance sheet,
   cardiac output (CO = HR × SV) — the deterministic bio-energetics routes.
3. **Assertion-Reason MCQs** against the NEET canonical A-R database
   (propositional truth tables + causal link; ≥2 keyword hits required).
4. **Objective-keyed bank rows** — true_false / fill_blank / any question
   with a crisp `correct_answer` — graded by exact deterministic comparison
   in `PracticeService._check_answer` (numeric tolerance, case-insensitive
   strings, order-independent lists). This is the layer that grades the
   served practice batch; it needs no solver.
5. **Numeric-option MCQs** whose stem computes (pre-existing `try_mcq`
   lane: parse ≥3 numeric options → solve stem → promote only if exactly
   one option matches within 1%).

## What biology CANNOT (yet, by design) be auto-graded on — must REFUSE

1. **Why / explain / justify questions** — prose reasoning. The engine
   refuses with GUIDED_PRACTICE and an honest refusal_reason. Deliberate:
   grading free prose deterministically is not trustworthy, and the
   platform bans unverified LLM grading.
2. **Definitions** ("Define osmosis.") — DUAL-CONTRACT, discovered during
   the stability runs: when the enhanced-nodes concept index is warm in
   the process, the neurolink concept pre-route answers with the
   canonical NCERT definition → **VERIFIED: "Osmosis is the net movement
   of water molecules across a selectively permeable membrane…"** — a
   verified retrieval tier (no LLM, no computation), and the RIGHT answer
   to a define question. When the index is cold the question honestly
   refuses (GUIDED_PRACTICE). Both are honest; the golden station accepts
   both and FAILS only a dishonest shape (verified-but-wrong,
   non-verified-but-answered, or neither answer nor refusal reason).
   Empirically: why-forms NEVER take this lane (station 3c/3e green in
   every cache state), so the prose-refusal boundary holds.
3. **Long_answer prose rows** (241 of the 904 class-10 bio bank rows) —
   served for practice, but "correctness" is the rubric layer's job, not
   the solver's; the solver never VERIFIEDs them.
4. **The why-form of a known fact** ("Why are mitochondria called the
   powerhouse of the cell?") — the fact anchor's why-guard keeps this at
   GUIDED even though the topic is anchored, because a bare noun is not an
   answer to a reason question. Asserted by station 3e.
5. **short_answer prose rows from the batch** ("Name the two female
   gonads and their hormones") — graded by exact-match against
   `correct_answer` in the practice layer; paraphrases will grade wrong,
   which is why the Socratic repair loop, not the solver, owns retries.

## Known edge (documented, not fixed — outside biology golden scope)

The pre-existing ATP/cardiac pre-route branches (answer_pipeline
`biology:bio_energetics`, `biology:cardiac_output`) fire on keyword stems
without a why-guard; a hypothetical "Why is ATP produced in respiration?"
could receive the balance sheet as a VERIFIED non-answer. The fact-recall
lane added here is guarded; hardening the numeric branches the same way is
a one-line follow-up for the next biology-lane batch.

## Environment incident during the build (root-caused)

Mid-run-2 the Docker Desktop daemon (WSL `docker-desktop` VM) stopped,
taking `dream-postgres` with it — stations 3f/5/6/7 of run 2 failed with
`ConnectionRefused` (nothing listening on 5432), NOT code regressions: the
same stations passed run 1 and the code is unchanged between runs. The
Docker engine itself was WEDGED (backend log: "still waiting for init
control API … after 56m"), so launching Docker Desktop alone was not
enough; the standard un-wedge (quit Docker Desktop → `wsl --shutdown` →
relaunch; no other WSL distros existed) brought the engine up in ~30 s.
The owner authorized the DB-restore scope: only `dream-postgres` was
started manually (Docker's restart policy revived the other infra
containers with it); `dream-backend-1/2` and any frontend were NOT
started — backends remain the coordinator's ship lane.

## Failures encountered during the build (root-caused, all resolved)

1. **3a/3b factual recall + MCQ stayed GUIDED (run 1 FAIL).**
   Root cause: the ONLY curated biology anchor (`NEET_AR_DATABASE` in
   `biology_cognitive_engine.py`) keys on ANSWER-side terms — the
   mitochondria entry needs "mitochondria" IN the question text, but the
   canonical recall question withholds exactly that word. The engine had
   the knowledge and no reachable path to it (`evaluate_concept_query`
   was never wired; the pre-route covered only ATP balance + cardiac
   output). Fix: question-side `NCERT_FACT_RECALL` table +
   `evaluate_fact_recall` with the four honesty gates above, wired into
   the existing biology pre-route branch. No other lane touched.
2. **4c "payload leaks" (run 1 FAIL) — the TEST was the bug.** The leak
   check searched the student payload for the substring "answer", which
   matches the natural-language word "answered" in the elicit turn
   ("You answered 3/4. …"). The payload machinery is correct: `payload()`
   strips the `answer` KEY from every move. Fix: assert (a) no move dict
   carries an `answer` key, and (b) the correct VALUE ("1/4", "0.25",
   "25%") never appears in student-facing text, while quoting the
   STUDENT's wrong answer remains allowed (it is pedagogy, not a leak).
3. **Run-to-run flake on station 3d (runs 3 vs 4).** "Define osmosis."
   flipped between GUIDED and VERIFIED across processes. Root cause: the
   neurolink concept lane (`stage=neurolink_concept`) answers from the
   enhanced-nodes corpus index, which is available only when the index
   load succeeds in that process (warm cache); cold → the same question
   falls through to the honest guided refusal. Deterministic GIVEN the
   index state; the index state is environmental. Fix: station 3d became
   the dual-contract above (accept VERIFIED-correct or honest refusal;
   fail dishonest shapes). Verified: a 3×3 isolated probe matrix gave
   identical results within each index state before the fix, and both
   post-fix full runs are green.
4. **Orphaned test student (run 2).** The Postgres outage hit run 2
   BETWEEN station 3e and the finally-cleanup, so run 2's student row
   survived (every cleanup DELETE hit a dead DB and rolled back). The
   orphan (uid 8c9fe31c…) was removed manually; all post-fix runs cleaned
   their own students — verified 0 leftovers at the end.
5. **Cleanup-list bug found while removing the orphan:**
   `mastery_event_log` keys on `student_id`, not `user_id` — the test's
   cleanup statement was silently no-op-ing on that table. Fixed in the
   test (`WHERE student_id = :u`); all other tables key on `user_id`
   (`users` on `id`).

## Final results (two consecutive green runs, exit 0, post-fix)

```
===== RUN A (student 60a95329-40ae-4f04-83f7-7bbe93fb4093) =====
[PASS] 1a learnpath exists: 12 lessons
[PASS] 1b next_lesson starts at lesson 1: first=Life processes
[PASS] 1c gating advances after done: next=Autotrophic nutrition
[PASS] 2a batch serves biology: 5/5 in 571ms; types=['short_answer']; 5/5 carry correct_answer
[PASS] 2b distinct ids: 5 questions
[PASS] 3a factual recall SOLVES (powerhouse): VERIFIED: Mitochondria
[PASS] 3b MCQ-with-options SOLVES (fact+options): VERIFIED: option (b) Mitochondria
[PASS] 3c why-question refuses honestly: GUIDED_PRACTICE: answer=None, refusal='This question needs a different approach — let me help you w'
[PASS] 3d definition: verified-correct OR honest refusal: VERIFIED path: 'Osmosis is the net movement of water molecules across a selectively pe' (canonical)
[PASS] 3e why-form of a known fact still refuses: GUIDED_PRACTICE: answer=None
[PASS] 3f objective rows grade via correct_answer: tf key='True' right=True wrong=False; fb key='principle' right=True wrong=False
[PASS] 4a socratic genetics dialogue builds: 5 moves kinds=['elicit', 'isolate', 'isolate', 'retry', 'handoff']; elicit quotes the wrong answer
[PASS] 4b socratic grading 1/4 right, 3/4 falls through: iso1 1/4 -> True (retry); iso1 3/4 -> False (iso2); iso2 false -> True (retry)
[PASS] 4c socratic payload hides answer keys: key_leak=False, value_leaks=none
[PASS] 4d catalog maps genetics_dominance to biology: entry=yes, subjects=['biology'], classes=[10, 11, 12]
[PASS] 5 BKT moves up+down: 0.000 -> 0.400 -> 0.169 (orm=None, asyncpg=None)
[PASS] 6 SM-2 review scheduled: row=yes, interval=1, reps=1
[PASS] 7 XP exactly-once: first=True, replay dup=True
=== GOLDEN PATH: 18/18 stations pass ===

===== RUN B (student bbd986f2-c857-41d9-ad69-c4bde02a5c2a): identical, 18/18 =====
```

Post-run hygiene: 0 leftover `BiologyE2E Student` rows in `users`.
Infra containers healthy; backends/frontends untouched.
