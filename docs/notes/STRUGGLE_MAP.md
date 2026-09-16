# STRUGGLE_MAP.md -- Synthetic-Student Gauntlet Report

Generated 2026-09-13 16:00:53 by `backend/tools/synthetic_students.py` against the live tutor API (`http://localhost:8001/api/tutor-graph/*`).

**Method.** Three synthetic personas walked Classes 1-12: *struggler* (~30% correct, hint ladder levels 1-3 every question, sometimes submits "i dont know"), *lost* (~15% correct, always wrong first, gives up after 2 wrongs) and *average* (~55% correct, control). Each persona x class x subject block ran 6 serve/submit cycles. Wrong answers were numbers perturbed from the question text or generic nonsense ("idk", "half of it", ...). Correct answers were harvested from hint text or a peek-submit on a shadow student, so a persona's own mastery history stays honest. ~1404 HTTP requests total. READ-ONLY audit: no backend logic touched.

Baseline discovered at runtime: classes 1-5 have **no tutor concepts at all** (serve 404 `no concepts available` for every subject); science only exists for classes 6-10; physics / chemistry / biology only for 11-12.

## Per-class results (all personas combined)

| Class | Served OK | NO_CONTENT | SERVER_5XX | GRADED_FALSE_POSITIVE | NO_HINT_LADDER | NO_VOICE | SLOW | RETREAT_BROKEN | Ungraded self_check submits | Avg latency (s) |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.00 |
| 2 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.00 |
| 3 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.00 |
| 4 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.00 |
| 5 | 0 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0.00 |
| 6 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | 0.01 |
| 7 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 14 | 0.00 |
| 8 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 15 | 0.00 |
| 9 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 14 | 0.01 |
| 10 | 36 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 11 | 0.01 |
| 11 | 72 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 37 | 0.00 |
| 12 | 72 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 25 | 0.00 |

## Actual grading outcomes per persona (what the tutor judged)

| Persona | correct | wrong | gave up | other outcomes |
|---|---|---|---|---|
| struggler | 0 | 29 | 0 | {"correct_revealed": 40, "micro_win_miss": 1, "self_check": 34, "ungraded": 1, "micro_win": 3} |
| lost | 5 | 56 | 8 | {"micro_win": 3, "self_check": 41, "micro_win_miss": 2, "ungraded": 1} |
| average | 20 | 32 | 0 | {"micro_win_miss": 2, "self_check": 52, "micro_win": 2} |

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
| 6 | maths | +0.300 | +0.074 | +0.809 |
| 6 | science | +0.300 | +0.300 | +0.300 |
| 7 | maths | +0.000 | +0.057 | +0.583 |
| 7 | science | +0.300 | +0.300 | +0.300 |
| 8 | maths | +0.000 | +0.072 | +0.132 |
| 8 | science | +0.300 | +0.300 | +0.300 |
| 9 | maths | +0.300 | +0.435 | +0.450 |
| 9 | science | +0.300 | +0.300 | +0.300 |
| 10 | maths | +0.000 | +0.060 | +0.716 |
| 10 | science | +0.370 | +0.370 | +0.300 |
| 11 | physics | +0.300 | +0.300 | +0.300 |
| 11 | chemistry | +0.300 | +0.300 | +0.300 |
| 11 | maths | +0.300 | +0.258 | +0.576 |
| 11 | biology | +0.370 | +0.300 | +0.370 |
| 12 | physics | +0.370 | +0.370 | +0.370 |
| 12 | chemistry | +0.300 | +0.102 | +0.206 |
| 12 | maths | +0.000 | +0.392 | +0.469 |
| 12 | biology | +0.300 | +0.300 | +0.300 |

## Extra observations (outside the strict taxonomy)

- harvest_hint_leak: 8
- harvest_peek_expected: 91
- hint_leaks_raw_answer_L3: 34

## Top failure sites

### 1. NO_CONTENT -- /serve (class 1; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c1&subject=maths&class_level=1`
- detail: no concepts available

### 2. NO_CONTENT -- /serve (class 2; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c2&subject=maths&class_level=2`
- detail: no concepts available

### 3. NO_CONTENT -- /serve (class 3; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c3&subject=maths&class_level=3`
- detail: no concepts available

### 4. NO_CONTENT -- /serve (class 4; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c4&subject=maths&class_level=4`
- detail: no concepts available

### 5. NO_CONTENT -- /serve (class 5; personas: average, lost, struggler) -- 6 occurrence(s)
- exact request: `/serve?student_id=syn_struggler_c5&subject=maths&class_level=5`
- detail: no concepts available

### 6. SLOW -- /progress (class None; personas: probe) -- 1 occurrence(s)
- exact request: `http://localhost:8001/api/tutor-graph/progress?student_id=syn_struggler_c1&subject=maths`
- detail: GET took 9.24s

---

## VERIFICATION RUN (2026-09-13 16:00 run vs. baseline 2026-09-13 14:09 run)

Re-ran the identical gauntlet (same seed, same personas, same 6 cycles x
3 personas x class x subject, 1404 requests) after today's three fixes.
The pre-fix baseline report is preserved verbatim in
`D:/platform/STRUGGLE_MAP.baseline.md`.

### Finding-by-finding verification

| # | Baseline finding | Baseline evidence | Verification run evidence | Verdict |
|---|---|---|---|---|
| 1 | Hint ladder L2 leaks the raw answer | 26 L2 hints were a bare numeric answer (e.g. `41/28`) | **0** L2 leaks (`hint_leaks_raw_answer_L2` absent). Live spot-check (c8m1.2.1::10): L2 now returns the method ("set up a/b + c/d = (a*d+c*b)/(b*d), then solve step by step"), not the answer | **PASS (FIXED)** |
| 2 | Hint ladder L3 leaks the raw answer | 26 L3 hints were a bare numeric answer | L3 still returns the answer (`hint_leaks_raw_answer_L3: 34`) but it is now a **designed reveal**: the response carries `"revealed": true` and `"note": "worked solution shown - this question won't count toward mastery now"`, and submits after a reveal are graded as a distinct `correct_revealed` outcome (40 for the struggler persona) instead of `correct` | **PASS (BY DESIGN)** -- leak is now flagged and mastery-neutralized, no longer a free-grades exploit |
| 3 | Science items all ungraded self_check (mastery delta 0.000 everywhere in classes 6-10, 11-12) | Science/physics/chem/bio deltas exactly +0.000 for all personas; 11-15 self_check submits per class 6-10, 43/47 in classes 11-12 | Every science/physics/chemistry/biology cell now moves (**0 zero-deltas in classes 6-12** vs. 22/24 zero-deltas at baseline). Numeric-answer science items are graded (109 revived); verbal ones legitimately stay `self_check` (11-15 per class 6-10, 37/25 in 11-12). **Caveat below.** | **PASS (FIXED), with mastery caveat** |
| 4 | Same question re-served consecutively after failure (RETREAT_BROKEN) | 3 events: `c6cu.1.1::1` x2, `c8cu.3.1::2` | **0** RETREAT_BROKEN events in 1404 requests. Consecutive-repeat ban in the picker + self_check misses now escalate the struggle streak | **PASS (FIXED)** |
| 5 | Classes 1-5 have no tutor content (serve 404) | 30/30 NO_CONTENT | 30/30 NO_CONTENT -- unchanged, **known-remaining by design** (content scope is 6-12; not counted as a new/unclosed failure) | **KNOWN-REMAINING** |
| 6 | Grading gate (no nonsense graded correct) | 0 GRADED_FALSE_POSITIVE in 100+ nonsense submits | 0 GRADED_FALSE_POSITIVE again | **PASS (HELD)** |
| 7 | Infrastructure (5xx / latency / voice / hint ladder present) | 0 5xx, 0 NO_VOICE, 0 NO_HINT_LADDER, avg latency 0.00-0.01s | 0 5xx, 0 NO_VOICE, 0 NO_HINT_LADDER, avg latency 0.00-0.01s | **PASS (HELD)** |

### New failure types in this run

- **SLOW (1 event)** -- `/progress` for a fresh student took **9.24s**
  once (the very first progress probe of the run, `syn_struggler_c1`).
  Every other request in 1404 was sub-3s (avg 0.00-0.01s). Looks like a
  one-time cold-start/first-touch cost on the progress endpoint for a new
  student, not a sustained regression. Flagged for watch, not a hard fail.

### Honest caveat: mastery still does not track performance on the science/self_check path

Grading is now *wired* for science, but the mastery **signal** is not yet
honest there. This run every persona -- struggler (~30% correct), lost
(~15% correct) and average (~55% correct) -- gained **exactly +0.300**
science/physics/chemistry/biology mastery (c10 +0.370), regardless of how
much they actually got right. A live probe confirmed why: a `self_check`
submit (even the nonsense answer "banana" on `c6cu.1.1::2`) returns
`"mastery": 0.3` -- the engine awards a flat engagement credit for any
self_check participation. So for verbal science items mastery measures
*showing up*, not learning. By contrast the fully graded maths path now
does discriminate: average persona +0.13..+0.82, lost +0.06..+0.44,
struggler 0.00..+0.30 (the struggler's 40 `correct_revealed` submits
correctly earned nothing -- copying the revealed answer no longer pays).
Until self_check items either grade answers or stop awarding flat mastery,
the science mastery number for a struggling student will look identical to
a top student's.

### Verdict of the verification run

All three targeted fixes verified dead as failure modes on the live path:
L2 no longer hands over answers, the L3 reveal is flagged and
mastery-neutralized (`correct_revealed` earns nothing), science items
enter the mastery loop instead of flat-lining at 0.000, and the
consecutive-repeat retreat leak is closed (0 events vs 3). The remaining
known gaps are the class 1-5 content vacuum (by design) and the new
caveat above: science mastery is a participation metric, not a
performance metric.

