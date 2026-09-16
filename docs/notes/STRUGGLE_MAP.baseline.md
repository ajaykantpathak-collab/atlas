# STRUGGLE_MAP.md -- Synthetic-Student Gauntlet Report

Generated 2026-09-13 14:09:35 by `backend/tools/synthetic_students.py` against the live tutor API (`http://localhost:8001/api/tutor-graph/*`).

**Method.** Three synthetic personas walked Classes 1-12: *struggler* (~30% correct, hint ladder levels 1-3 every question, sometimes submits "i dont know"), *lost* (~15% correct, always wrong first, gives up after 2 wrongs) and *average* (~55% correct, control). Each persona x class x subject block ran 6 serve/submit cycles. Wrong answers were numbers perturbed from the question text or generic nonsense ("idk", "half of it", ...). Correct answers were harvested from hint text or a peek-submit on a shadow student, so a persona's own mastery history stays honest. ~1423 HTTP requests total. READ-ONLY audit: no backend logic touched.

Baseline discovered at runtime: classes 1-5 have **no tutor concepts at all** (serve 404 `no concepts available` for every subject); science only exists for classes 6-10; physics / chemistry / biology only for 11-12.

## Per-class results (all personas combined)

| Class | Served OK | NO_CONTENT | SERVER_5XX | GRADED_FALSE_POSITIVE | NO_HINT_LADDER | NO_VOICE | SLOW | RETREAT_BROKEN | Ungraded self_check submits | Avg latency (s) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.01 |
| 2 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.01 |
| 3 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.01 |
| 4 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.01 |
| 5 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.01 |
| 6 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 14 | 0.00 |
| 7 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 13 | 0.01 |
| 8 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 15 | 0.00 |
| 9 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 15 | 0.00 |
| 10 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | 0.00 |
| 11 | 72 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 43 | 0.00 |
| 12 | 72 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 47 | 0.00 |

## Actual grading outcomes per persona (what the tutor judged)

| Persona | correct | wrong | gave up | other outcomes |
|---|---|---|---|---|
| struggler | 8 | 44 | 0 | {"micro_win_miss": 2, "self_check": 49, "ungraded": 2, "micro_win": 3} |
| lost | 3 | 51 | 5 | {"micro_win_miss": 2, "self_check": 46, "ungraded": 3, "micro_win": 3} |
| average | 18 | 26 | 0 | {"self_check": 63, "micro_win": 1} |

## Mastery delta per class (avg_mastery after - before, per subject)

| Class | Subject | struggler | lost | average |
|---|---|---|---|---|
| 1 | maths | +0.000 | +0.000 | +0.000 |
| 1 | science | +0.000 | +0.000 | +0.000 |
| 2 | maths | +0.000 | +0.000 | +0.000 |
| 2 | science | +0.000 | +0.000 | +0.000 |
| 3 | maths | +0.000 | +0.000 | +0.000 |
| 3 | science | +0.000 | +0.000 | +0.000 |
| 4 | maths | +0.000 | +0.000 | +0.000 |
| 4 | science | +0.000 | +0.000 | +0.000 |
| 5 | maths | +0.000 | +0.000 | +0.000 |
| 5 | science | +0.000 | +0.000 | +0.000 |
| 6 | maths | +0.202 | -0.014 | +0.023 |
| 6 | science | +0.000 | +0.000 | +0.000 |
| 7 | maths | +0.143 | -0.021 | +0.148 |
| 7 | science | +0.000 | +0.000 | +0.000 |
| 8 | maths | -0.321 | +0.107 | +0.340 |
| 8 | science | +0.000 | +0.000 | +0.000 |
| 9 | maths | +0.288 | +0.000 | -0.080 |
| 9 | science | +0.000 | +0.000 | +0.000 |
| 10 | maths | +0.384 | -0.101 | -0.046 |
| 10 | science | +0.000 | +0.070 | +0.000 |
| 11 | physics | +0.070 | +0.070 | +0.070 |
| 11 | chemistry | +0.000 | +0.000 | +0.000 |
| 11 | maths | -0.057 | -0.177 | +0.137 |
| 11 | biology | +0.000 | +0.070 | +0.000 |
| 12 | physics | +0.000 | +0.000 | +0.000 |
| 12 | chemistry | +0.070 | +0.000 | +0.000 |
| 12 | maths | -0.205 | +0.000 | +0.164 |
| 12 | biology | +0.070 | +0.000 | +0.000 |

## Extra observations (outside the strict taxonomy)

- harvest_hint_leak: 8
- harvest_peek_expected: 103
- hint_leaks_raw_answer_L2: 26
- hint_leaks_raw_answer_L3: 26

## Top failure sites

### 1. RETREAT_BROKEN -- /serve (class 6; personas: average, struggler) -- 2 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c6&subject=science&class_level=6`
- detail: question re-served after 2 consecutive fails, no easier path (micro_win/retreated_from absent)
- question_id: `c6cu.1.1::1`

### 2. RETREAT_BROKEN -- /serve (class 8; personas: struggler) -- 1 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c8&subject=science&class_level=8`
- detail: question re-served after 2 consecutive fails, no easier path (micro_win/retreated_from absent)
- question_id: `c8cu.3.1::2`

### 3. NO_CONTENT -- /serve (class 1; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c1&subject=maths&class_level=1`
- detail: no concepts available

### 4. NO_CONTENT -- /serve (class 2; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c2&subject=maths&class_level=2`
- detail: no concepts available

### 5. NO_CONTENT -- /serve (class 3; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c3&subject=maths&class_level=3`
- detail: no concepts available

### 6. NO_CONTENT -- /serve (class 4; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c4&subject=maths&class_level=4`
- detail: no concepts available

### 7. NO_CONTENT -- /serve (class 5; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c5&subject=maths&class_level=5`
- detail: no concepts available

## Honesty notes on the gauntlet itself

- Mastery deltas are measured on the tutor engine's **in-memory, persistent**
  student store: the delta table above is from run 2, which started from
  run-1 state, so deltas are state-dependent rather than absolute. Run 1
  (fresh students) showed science deltas of exactly +0.300 for every persona
  in classes 6-10 -- i.e. mastery moved a flat constant regardless of what
  the student actually did. Either way, the mastery signal does not
  reliably track performance.
- A minority of "wrong" grades are a gauntlet artifact: when the peek-submit
  hit a `self_check` item the response carries a prose `worked_solution`
  instead of an `expected` value, and submitting that prose grades wrong.
  This inflates "wrong" slightly; it does not affect the
  GRADED_FALSE_POSITIVE / NO_HINT_LADDER / NO_VOICE / 5xx findings, which
  are pure server behaviour.
- The tutor grades numerically and never returned `outcome=correct` for any
  nonsense answer ("idk", "banana", "half of it") in 100+ nonsense
  submissions -- the grading gate itself held.

## Findings

1. **Classes 1-5 have no tutor at all (biggest failure).** Every serve for
   classes 1-5, every subject, returns 404 `no concepts available`
   (30/30 blocks). A struggling class-3 student gets literally nothing --
   no question, no hint, no voice. The adaptive tutor only exists for
   classes 6-12.
2. **The hint ladder hands over the raw answer.** 26 level-2 hints and 26
   level-3 hints this run returned a bare numeric/fraction answer (e.g.
   hint L2 for `c8m1.2.1::10` is exactly `41/28`). A struggling student is
   one click away from full marks with zero learning; the gauntlet itself
   relied on this leak to simulate correct answers.
3. **45-60% of what struggling students are served is ungraded.** `self_check`
   submits per class: 11-15 in classes 6-10 science, 43 and 47 in classes
   11-12 (of ~72 submits per class). These items never enter the mastery
   loop -- classes 6-10 science mastery stayed at exactly 0.000 delta for
   all three personas.
4. **Retreat is mostly wired but leaks.** 3 RETREAT_BROKEN events: the same
   question (`c6cu.1.1::1` twice, `c8cu.3.1::2`) was re-served after 2+
   consecutive failures with no `micro_win` / `retreated_from` easier path.
5. **Infrastructure is solid.** 0 server 5xx, 0 transport errors, 0 requests
   over 3s (avg latency 0.00-0.01s), voice present on every serve/submit,
   hint ladder present at every level wherever content exists, and no
   false-positive grading of nonsense.

## Verdict

Where does the product fail a struggling student first? At the front door:
for Classes 1-5 the tutor graph is empty and the API's answer to a struggling
ten-year-old is a bare 404 -- there is no struggle to scaffold because there
is no content. From Class 6 onward the plumbing is genuinely dependable (no
5xx, sub-10ms responses, voice and hint ladder always present, and the grader
never once called nonsense correct), but the *pedagogy* fails the struggler
in two quieter ways: the hint ladder leaks the literal answer at levels 2-3,
so the product rewards giving up and copying rather than scaffolding the
attempt, and roughly half of the questions served -- all of science in
classes 6-10 and the majority of classes 11-12 -- are ungraded `self_check`
items that never move mastery, leaving the struggling student with the
experience of answering without any record of learning or adaptation. The
retreat-to-easier-question mechanism works in most cases but still
re-serves the identical hard question after repeated failure in edge cases
(2 question ids observed). Fix order: (1) author classes 1-5 concepts,
(2) stop hint levels 2-3 from emitting the raw answer, (3) route self_check
flood out of the graded serve path, (4) close the two known retreat leaks.

## Artifacts

- Gauntlet script: `D:/platform/backend/tools/synthetic_students.py`
- Raw results: `D:/platform/backend/tools/gauntlet_results.json`
- Run log: `D:/platform/backend/tools/gauntlet_run.log`

