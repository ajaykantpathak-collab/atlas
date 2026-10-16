# STUDENT B LOG — class-12 elective sweep (2026-09-17)

Login: aarav.demo@dreamapp.in (Aarav Sharma, uid d3058339-cff2-4101-abf9-525be8f454e9, seeded class_level 10).
Second login for isolation tests: stu.b2@dreamapp.in (Student B2, uid f9c34abf-67ee-4e0d-ae75-a6c977dec611).
Parent: parent@dreamapp.in (Demo Parent, uid 455afc09-5253-44ba-8df6-d936eb2d87c1, linked to Aarav).

Working dir: D:\platform\student_b\ (token.txt, token2.txt, token_parent.txt, check_node.py, check_remediation.py, diag_driver.py, exam_driver.py, practice_driver.py, tutor_driver.py + result JSONs).

## Journey results

### J1. Class-12 electives — 2 nodes each (acc, bs, cs, psy, bio, math; legal DOES NOT EXIST in corpus — B14)
12/12 nodes: /learn HTTP 200, node record OK, sims present, definition/walkthrough/common_misconception OK, prereq chains resolve (47/47 edges).
Defects: eli5+examples+on_failure null on ALL c12 (B06); enrichment diagnostic_questions all null-question (B03); graph prereq API empty (B05).
Per-subject: acc OK | bs OK | cs OK | psy OK | bio OK | math OK (content renders; data gaps above).

### J2. Remediation loop (wrong → misconception panel → prereq link → prereq lesson → retry)
- Chain data intact: every tested node has 6 diagnostics with q+a; all 47 prereq edges resolve (learn 200 + enrichment 200 + record 200 + prereq diagnostics present).
- Misconception per-item text missing on several nodes (B04).
- Server-side diagnostic misconception engine returns 0 misconceptions in all sessions (corroborates STUDENT-A #49).
- /learn page grades diagnostics client-side; posts only /api/practice/deterministic/check.
- VERDICT: loop works in-page via enrichment data; broken in /diagnostic (B02 unanswerable questions).

### J3. Diagnostics ×3 (D1 acc c12, D2 acc c12 retake, D3 psy c12)
- Retake works; history accumulates (4 sessions incl. probe; totalCount, completedAt, scores).
- ALL scores 0.0 — grading broken for c12 electives (B02). Percentile varies (11.1 / 15.6) but score never moves.
- Misconceptions: 0 in every session. Remediation plans generated (9-10 steps acc, 2 psy) with generic skillNames ("Ch04", "psychology").

### J4. Exams ×2 (closest-possible-to-electives: exam-sim acc c12 blocked; /api/exams CS c12 + Mathematics c12)
- exam-sim: session lost across backend-1/2 (404) + status 500 crash (B08) → 0/2 attempts possible.
- /exam UI: only maths/physics/chemistry, class=10 hardcoded (B10); catalog papers 404 at detail (B09).
- /api/exams custom CS c12 + Math c12: full flow OK but grading vacuous 0.0 (B11); strategy endpoint topic-appropriate.

### J5. Practice persistence + per-student isolation
- Persistence PASS: start → 3 submits (graded, 2.2-3.2s each) → end → GET session shows completed/3 answered; summary has mastery_changes.
- Isolation FAIL: B2 reads AND writes Aarav's sessions (B07).
- Progress dashboard/overview/mastery show only legacy c10 track; practice mastery_changes not visible there.

### J6. Parent view
- /parent-overview 200; dashboard shows Aarav (mastery 69.2 legacy, xp 0, streak 0, alerts accurate).
- weekly_practice_minutes 0 + weekly-activity all zeros despite same-day activity (B13).

### J7. Class-11 electives 1 node each (acc, biotech, cs, psy, hs)
5/5 render OK; only eli5 missing (examples/on_failure present — better than c12); diagnostics complete via node record; prereqs resolve.

### J8. Tutor ×3 (acc, psy, cs c12)
- acc: 200, routed to c12_acc_cbse_02_011, answer on-topic (hidden goodwill).
- psy: 502/504 ×3 (49-120s). cs: 502/504 ×3. No literature-cross-routing observed (acc answer was correct subject), but reliability failure (B12).

## Bug tally: 14 filed (B01-B14 in BUGS.md OPEN).

## Deep sweep (second pass)

### Teacher surfaces
- Student token gets HTTP 200 on /api/teacher/classes, /assignments, /worksheets, /teacher-analytics/overview (no role check; payloads empty today) → B15.
- /teacher-overview prod HTML still hardcodes "Rajesh Kumar"/"RK" header despite [fixed-ui] claim → B15 (regression/not-shipped).
- teacher-analytics source is "tutor_students.json", has_data:false "no_student_data_yet" — no real roster/analytics data exists.

### Portfolio / study-tools / my-world
- Portfolio endpoints all empty: activity [], heatmap [], review queue 0, achievements 0/24 unlocked (dead pipeline, consistent with B13).
- Study-tools class-content: CS c12 serves BIOLOGY genetics ladders/derivations (item header literally "SUBJECT: Biology") and every item duplicated 3x (acc 50→17 unique, psy 9→3, cs 15→5) → B16.
- /my-world galaxy: permanent "0 / 9,099 stars lit", 0 badges, level 0 — pipeline never writes, so the flagship visual is dead-on-arrival for real students.

### Adversarial inputs
- Practice: empty/whitespace answers accepted and consume graded attempts; 1000-char and Hindi+XSS+SQLi strings graded fine (no crash) → B17(c).
- Diagnostics: explanation field is literal string "null" on every graded answer; timeSpentSeconds:-999 accepted → B17(a,b).
- Double-submit: second submit 400 "Session is completed" (session had auto-completed) — benign.
- Two tabs: concurrent practice starts unbounded (5/5 201s, no resume of active session) — hygiene note, not filed.
- Psychology c12 diagnostics 5/5 UNANSWERABLE (grader states correctAnswer "B"/"C"; selecting that exact option → is_correct:false) → B02-ext.

### Latency smells
- GET /api/nodes/node (learn-page data): bimodal 0.01s vs 16-105s vs 502/504@95-184s; proven backend split: backend-1 0.1s, backend-2 37.6s same request → B18.
- /api/tutor/ask psy/cs: 502/504 at 15-120s, 3/3 failures (B12).
- /api/practice/start: 5.4-8.5s (LLM assembly) — tolerable but slow.
- /api/health 0.03s. Enrichment endpoint fast. Parent dashboard fast.

## FINAL TALLY: 19 bug lines filed to BUGS.md OPEN (B01-B14, B15-B18, B02-ext). Journeys covered: J1-J8 complete + teacher/portfolio/study-tools/my-world deep pass + adversarial + latency.

## PASS 3 (2026-09-17 late)

### Regression watch vs [fixed-*] claims
- /practice/end idempotency: REGRESSED (second end → 400) → B19
- Anonymous practice/start: REGRESSED (201, no auth) → B20
- Practice dedup: REGRESSED (2 unique texts in 5 slots) → B21 (+ home-science leak into science → B22)
- Answer-key leak fix: HOLDING (correct_answer/model_answer/explanation null)
- Corpus fallback /api/content/nodes/{id}: HOLDING (c6/c8/c10/c12 all 200)
- Level agreement login vs dashboard: HOLDING (xp 30 → level 1 both)
- Graph stats: 200 ok. NOTE: Aarav's XP went 0 → 30 during pass 3 — practice marks DO write XP now, though streak/weekly-activity remain zero.

### Classes 6-9 depth (26 nodes: math/english/civ; sci/geo/hist endpoints flaky — backend hangs)
- /learn 200, node records + diagnostics 6/6 q+a on all nodes; prereq chains resolve.
- Graph prerequisites CLASS-SPLIT: c7-9 real edges (17-50), c6 zero (and c11/c12 zero) → B05-ext.
- eli5 null corpus-wide (c6-9 too) → B06-ext; examples/on_failure null only on c12.
- enrichment diagnostic_questions null 6/6 on every c6-9 node → B03-ext.
- c6-9 math question banks: 100% short_answer/long_answer (no MCQs in samples).
- Free-text grader exact-match only: verbatim=correct, fair paraphrase=incorrect → B23.
- c6 diagnostics: 4/6 answerable, 2/6 unanswerable (format drift), C10-* questions in grade-6 pool → B24.

### Browser (Playwright on prod :80; dev :3000 wedged — listening but hangs, not student-facing)
- Login works; /learn/c12_acc renders fully (needs 30-60s patience due to B18); all data calls 200.
- /my-world renders all-zeros in real browser (0/9,099 stars, 0 badges) — consistent with dead pipeline.
- /parent-overview renders Aarav + 73% mastery in real browser (good).
- /teacher-overview renders to LOGGED-OUT visitor with hardcoded "Rajesh Kumar" header, no login redirect → B27 (screenshot shots/s6-teacher-unauth.png).
- /portfolio: renders, no achievements data (pipeline).
- Service worker: NONE registered anywhere (layout.tsx purge switch); /offline page shows 193MB/500MB "6 items downloaded" — facade → B26.

### Coding playground
- /coding-playground live on prod; "Run Code" is fake: Math.random()>.3 pass + canned outputs + XP awards → B25.

## PASS 3 TALLY: 12 more lines (B19-B27 + B03/B05/B06-ext). TOTAL STUDENT-B: 31 lines in BUGS.md OPEN.
