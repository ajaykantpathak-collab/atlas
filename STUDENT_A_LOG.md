# STUDENT A — journey log (demo@dreamapp.in, uid 57c8638c-ee2d-4daa-857d-b345d3fabb37)

Baseline (2026-09-17, before journey):
- XP 2450, level 12 (login) / 25 (dashboard), streak 4, board CISCE, class_level 10
- /api/progress/overview: totalNodes 7, mastered 1, avgMastery 71; Science 3 nodes (72%), Math 2 (63%), English 1 (80%, mastered), SocSci 1 (76%)

## Journey 1 — /learn classes 6,7,8
Flow per node: GET /api/nodes/node (UI detail) → /api/content/nodes/{id}/enrichment → /api/tutor-graph/teach?node_id → /api/content/nodes/{id}/questions?limit=5 → POST /api/tutor-graph/submit (all → 404 unknown question_id, see BUGS).

| class | nodes | detail | enrichment | teach | questions | submit |
|---|---|---|---|---|---|---|
| 6 | c6_math_ch01_001 (Numbers in our everyday life), c6_math_ch01_002 (Natural numbers), c6_physics_ch01_001 (Science) | 200/200/200 | 200 x3 | 200 x3 (diagnostic Q present) | 5/5/5 | 404 x3 |
| 7 | c7_math_ch01_001 (The lakh), c7_math_ch01_002 (place value 6/7-digit), c7_physics_ch01_001 | 200 x3 | 200 x3 | 200 x3 | 5/5/5 | 404 x3 |
| 8 | c8_math_ch10_1 (cross-multiplication), c8_math_ch10_2 (Representative Fraction), c8_physics_ch01_001 | 200 x3 | 200 x3 | 200 x3 | 5/5/5 | 404 x3 |

Mastery before: all sampled nodes masteryProbability 0.0, attempts 0.
Learn frontend: GET /learn → 200 (32KB HTML). Frontend calls /api/nodes/by-class-subject + /api/nodes/node + /api/content/enrichment?subject&class_level&limit=500 (title search only).

## Journey 2 — /practice classes 6-8
(pending)

### Journey 2 results (classes 6-8)
- 3 sessions per class (mathematics, science, english), 6 questions each, 3 rounds = 9 sessions/class band, ~54 questions/class.
- Cumulative accuracy: class 6 = 20/54 (37.0%), class 7 = 17/54 (31.5%), class 8 = 17/52 (32.7%).
- Target ~70% NOT reachable honestly: free-text grader rejects full-sentence correct answers; only terse keyword answers pass (e.g. "socialisation", "Steaming" pass; a full correct explanation fails). Verbatim replay of revealed correct_answer always passes (grading deterministic, no verbatim failure found in 31 learned entries).
- Practice UI (browser): BLOCKED — no input rendered for text questions, Submit permanently disabled (see BUGS). Journey completed via API only.
- Mastery moves: summary mastery_changes show 0.0 -> 1.0 after a single correct answer (corpus:* uuid keys); bkt_p_know updates in submit responses (e.g. 0.113 after 1 wrong).
- Anomalies: 2x 502 Bad Gateway on submit (c8 math, c8 english R1); POST /end → 400 after auto-end (3/3); duplicate questions 3-4x per session.

## Journey 3 — /diagnostic
(pending)

## Journey 4 — /sims-v2
- Catalog page GET 200 (171KB SSR). Only class-10 sims listed (48). Sims for classes 6-12 exist server-side.
- Boot checks (Playwright, 21 sims = 3 per class band): intro gate renders ("YOU ARE... a class N learner"), "Begin the mission!" works, sim boots to interactive "FIRST — A QUESTION!" card with 4 options; clicking an option yields feedback text. No canvas/iframe — DOM-based player. Zero page errors, zero console errors.
- Failures: p3 sims dead for cl 7,8,9,10,12 ("wandered off" page, HTTP 200); catalog lists no non-class-10 sims; corrupted PREVIOUS title "Trigonometric Identiitiessin2a" (c10 ch01 p1).

## Journey 5 — classes 9,10 (practice + learn, ~50% target)
- 12 sessions (2 rounds x 3 subjects x 2 classes), 6 Q each.
- Cumulative accuracy: class 9 = 13/36 (36.1%), class 10 = 13/36 (36.1%). Target ~50% approximated (strict free-text grader caps honest accuracy; same finding as classes 6-8).
- Learn flow (6 nodes): c10 canonical nodes (c10_bio_cbse_01_001 Life processes, c10_chem_cbse_01_001 A chemical change, c10_math_cbse_01_001 Fundamental Theorem of Arithmetic) all detail+teach 200. Class 9: listed IDs c9_math_ch01_001/c9_physics_ch01_001 404 on /api/nodes/node; real ID c9_math_ch1_1 works (heterogeneous id scheme, listing/detail mismatch continues).

## Journey 6 — classes 11,12 (~30% target, remediation loop)
- 6 sessions (mathematics/physics/chemistry x 2 classes), 5 of 6 answers deliberately wrong: realized accuracy 0.0-16.7%.
- Learn flow: c11/c12 canonical nodes (Sets, Measurement, Chemistry; Relations and Functions, Electric charge, A solution) detail/teach/questions all 200.
- Remediation loop: NOT PRESENT. Wrong submits return no misconception/prereq payload; review queue empty despite SM2 next_review set; graph prerequisites empty; analytics misconceptions []; solver remediation flags raw "ch12" with no linkage. Filed.

## Journey 7 — /exam-simulator + /exam
- /exam-simulator redirects 307 → /exam.
- UI: paper list renders (ISC Maths/Physics/Chemistry) but "Start Exam" HARD-CRASHES on all three papers (TypeError: reading 'en'). No exam can be taken in the UI.
- exam-sim API: start OK but questions:[] delivered; answer/status → 404 session not found; finish fabricates grade F with 5/5 "answered". Only subject "math" has data (classes 10/12); other subjects 404.
- assessment exams: detail has no questions; submit vacuous 0/80; result/strategy 404 EXAM_NOT_FOUND; history empty post-submit.

## Journey 8 — /progress, /achievements, /dashboard (deltas)
- Demo student: XP 2450 → 2450 (unchanged), level 12 vs 25 depending on surface, streak 4 → 4, progress/overview identical to baseline, weeklyChange 0 across subjects.
- Achievements: 0 unlocked of 24 after the full journey; stats counters unlocked_count 0 + locked_count 0 ≠ total 24.
- Per-class students: analytics records raw events (c6: 73 answered/25 correct) but dashboard shows XP 0, level 1, streak 0, last_active None, mastery_by_topic [] and /api/progress/mastery/{topic} reads 0.0/0 attempts for topics practice explicitly updated. Progress pipeline is write-disconnected end to end.

## Journey 9 — /my-world
- Galaxy renders (9,099-star spiral, class filter chips, badges list). Shows "0 / 9,099 stars lit", "0 day streak" (dashboard says 4), "0/10 badges" (achievements says 24), 0 topics mastered — consistent with the frozen pipeline, and internally contradictory with sibling pages.

## Final tallies (questions answered per class by STUDENT A)
- c6: 54 Q across 9 sessions, cumulative 37.0% | c7: 54 Q, 31.5% | c8: 52 Q, 32.7%
- c9: 36 Q, 36.1% | c10 (demo): 36 Q, 36.1% | c11: 18 Q wrong-heavy, 16.7% | c12: 18 Q wrong-heavy, 5.6%
- Targets ~70/50/30% honestly unreachable: the free-text grader only accepts terse keyword answers (full correct explanations marked wrong; verbatim revealed answers always pass).

# ================= PASS 2 (2026-09-17 17:45 - 19:00) =================

## Regression checks of PASS-1 [fixed] items — ALL HOLDING
- /api/content/nodes/{id} now 200; tutor-graph/submit now 200; correct_answer emptied; levels consistent (25/25); enrichment examples/on_failure/difficulty populated. Residual: eli5 still None corpus-wide (sampled 4 nodes).
- Pipeline partial fix: demo XP 2450→2858 (LV 25→29), achievements counters now sum — but c6 student's practice→mastery/streak path STILL dead (re-filed as UPDATE line).

## PASS2-1 Sims content (14 sims walked across 6/8/10/12)
- Flows work: intro gate → question (4 options, green/red highlight) → "Let's learn!" → learn slide → "Let's Play!" → MISSION challenges with sliders/inputs + "Check ✅" → "Not yet — adjust and check again." feedback. No console/page errors on working sims.
- c10 bio misgrade confirmed (samosa question: wrong answer keyed green) + PREVIOUS nav chip "Flower" (class 6/7 topic) on class-10 biology — filed with screenshots.
- Subject gaps: classes 6/8 have ONLY math sims (sci/chem/bio slugs → wandered-off page); c12 phy/chem/bio live with correct slugs.

## PASS2-2 Teacher surfaces
- RBAC GAP: student token gets 200 on /api/teacher/classes (real rosters), /classes/{id}/students (other students' PII: names, emails, roll numbers), teacher-analytics, analytics/overview; /teacher-overview fully renders for a student.
- /teacher-overview: brand row still hardcodes "RK Rajesh Kumar" (top bar shows Demo Student); class progress API = fabricated zeros + fake 6-week trend; "3 Struggling students" contradicts 0% Avg Mastery; Analytics tab renders a STUDENT Socratic Tutor chat (hardcoded "Class 11 · Mastery: 30%", Hinglish).

## PASS2-3 Parent surfaces
- Created parent.a@dreamapp.in (role parent), linked c6 child via /api/auth/link-child (works).
- /api/dashboard/parent/{id}: fabricated urgent alerts (low_mastery 0%, streak_broken) + trend "declining" with zero data; contradicts page's "No weak areas yet".
- /parent-dashboard page reads a dead legacy "games" store: 0 Total Attempts / "No attempts yet" despite 73 answers that day.
- Parent login redirects to the student /dashboard.

## PASS2-4 Auth/session edges
- Backend good: garbage/tampered tokens 401; refresh token rotates (reuse → 401 revoked).
- UI broken: no logout control anywhere; hidden /logout route does NOT clear dream-auth; after /logout the dashboard still shows the previous session's live data.
- Corrupt/expired token: ghost dashboard ("Good evening, Scholar") + 401/404 console spam, no redirect.
- Account switch via login form works (demo → c6 shows correct LV 1 identity).

## PASS2-5 Latency/console
- Page loads 5-9s domcontentloaded+settle on all 21 routes; /my-world loads (earlier networkidle timeout was the galaxy's continuous animation, not a hang).
- Worker seizure: 11+8 gunicorn WORKER TIMEOUT/SIGKILL events in 60 min; while wedged even /api/health hangs 45-90s (reproduced 4x 90s curls + 2x 45s); recovery mid-stream. Root cause matches claimed tutor-graph/ask entry; blast radius filed with docker-logs evidence ("Loading weights 0/103" inline loads in tutor/diagnostic/practice handlers).

## PASS 2 new bug lines appended to BUGS.md: 12
(c10 bio misgrade; sim nav "Flower"; junior science sim gaps; teacher RBAC/PII; teacher identity; teacher fake progress+trend; teacher analytics=tutor chat; parent dead store; parent fabricated alerts; parent role routing; logout no-op; ghost-dashboard on bad token; [UPDATE] pipeline partial fix; worker-seizure blast radius)

# ================= PASS 3 (2026-09-17 19:00 - 20:00) =================

## PASS3-1 Regression watch on Pass-1 BLOCKERS — REGRESSION CONFIRMED
- Served frontend bundles are byte-identical to Pass 1 (practice page-a0c4fb25708094b8.js: 0 textarea refs; exam page-bc05964b47159a12.js still crashes "reading 'en'"). Backend-only fixes landed (questions array 5 → old bundle now shows "Question 1 of 5"). Filed [REGRESSION] fix-not-deployed.
- Fresh evidence of off-class pool leak: demo (class 10) received a class-12 marginal-cost/total-cost calculus item (topic chip Ch07).

## PASS3-2 First-run experience
- /login has "Start your map free" link → /signup (4 fields incl. class select Class 1-12) → auto-login → /dashboard. Works mechanically (class honored, uid created).
- BLOCKER: GET /api/dashboard/student/{uid} → 404 "Student '<uid>' not found" for brand-new uids (0.2s, reproducible) while same-day-older students get 200 → new student's dashboard hangs forever on "Loading your command center…" with no greeting/class/XP. Two fresh accounts confirmed.
- No onboarding flow at all; GET /api/student/onboarding returns {"onboarding":{}}.

## PASS3-3 Profile/settings/notifications
- /settings hardcodes persona "Aarav Sharma / aarav@example.com / Delhi Public School" for EVERY user (demo signed in).
- Edit Profile button: no form appears (0 inputs); no profile-mutation API exists.
- Notifications tab: 6 toggles with zero backend notification endpoints (decorative).
- Sign Out: lands on /lumen (separate "Lumen Lab" astronomy toy) instead of login; session dropped on arrival.
- Privacy/2FA/Devices/Delete Account + Accessibility Score 92/100: static mockups.

## PASS3-4 My-world interactions — healthy
- Class chips, canvas, badge list all respond; "Constellations Unlocked / Season: winter · Time: dawn" present; no console errors. (0/9099 stars still the pipeline bug.)

## PASS3-5 Study-tools (6 tools)
- All render raw corpus markdown/JSON with internal node IDs (NODE_ID/SYLLABUS headers, escaped JSON, bare id lists).
- Counts: Formula Bank advertised 16 → 0 items (empty tool); Flashcards 52 → 11; Glossary 47 → 28.
- Class-10 view serves class-12 Commerce content (Schedule III, goodwill valuation).

## PASS3-6 Dead-link audit — CLEAN
- 58 unique rendered links across 12 main routes probed: all 200 (redirect-followed). /games and /profile 404s from Pass 2 are NOT linked anywhere — phantom routes, not student-facing.

## PASS 3 new bug lines: 8
(REGRESSION fix-not-deployed; practice pool off-class; first-run dashboard 404 BLOCKER; no onboarding; settings hardcoded persona + dead Edit Profile; notifications hollow; Sign Out → /lumen; privacy/accessibility mockups; study-tools raw dumps; study-tools counts/off-class)

## CORRECTION (owner directive, 2026-09-17 ~20:00)
- The PASS-3 "REGRESSION" headline was WRONG in attribution: I had tested the FROZEN production server :3001, which by owner directive still runs the pre-fix build until the single final rebuild. The chunk hashes I cited are :3001's; fixes exist in source and on dev :3000.
- BUGS.md line retagged: [STUDENT-A][REGRESSION] → [NOT-A-REGRESSION - :3001 frozen pending final rebuild; fixes live on :3000/source], with :3000 retest results appended to the same line.
- Re-verification against :3000 (dev build):
  - /practice: PASS — textarea input rendered, "Chapter 9"/"Easy" English chips, class-10 trig Assertion-Reason question (correct class). Minor: page unstyled during dev-CSS compile; mastery row shows "0 Days" for demo (other surfaces say 4) — flagged to fixer.
  - /exam: PASS — "Start Exam" renders the live 16-question paper with 3h timer, sections, review flags; NO crash.
- Both Pass-1 UI blockers are FIXED on :3000/source.

## STANDING RULE (from owner, all future passes)
- Test pages against http://localhost:3000 ONLY (dev build with current fixes). :3001 is the frozen production container, rebuild-pending — do NOT file frontend regressions against it. APIs via :80/:8001 unchanged.
