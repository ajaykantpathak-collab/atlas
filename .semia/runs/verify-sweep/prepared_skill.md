---
name: verify-sweep
description: Run the full Atlas acceptance verification sweep on production :3001 — 14-point product checklist plus per-class curriculum probes. Use after any deploy, before declaring fixes shipped, when the owner asks for verification, or to re-check that previously fixed items still hold.
---

# Atlas Verify Sweep

Acceptance testing of production **http://localhost:3001**. Verify only — fix
nothing. Every item: PASS/FAIL + screenshot/log evidence into
`screenshots/verify_<date>/` and a table appended to BUGS.md `## PROD-VERIFY`.

## Setup
Playwright from `frontend/node_modules`. Personas: fresh signup (Class 10),
teacher@dreamapp.in/demo123, parent@dreamapp.in/demo123. Wait 6-10s hydration
per page. NEVER judge pages by curl — SSR shells lie.

## The checklist (capture screenshot per item)
1. Landing (cosmos background, gold copy, real stats) — 1440 + 390
2. Fresh signup → auto-login → dashboard shows the NEW student (no hang)
3. Command Briefing: ONE mission grounded in real data; honest zeros for new users
4. Galaxy: sky renders, HUD "X of 9,099 stars lit", star-tap → panel → Story/Practice
5. Story Mode (3 nodes, one per band): all scenes, eli5 hook, quick check grades,
   finish shows XP+mastery; 390px no overflow
6. Practice: session starts class-pinned, textarea AND MCQ answerable, grades,
   streak shows real days
7. Doubt loop: resolvable question → answer + Story link opens; garbage → honest
   refusal, no fabricated link
8. Security: student B → 403 on student A's practice; student token → 403 teacher
   APIs; logged-out /teacher-overview redirects to login
9. Teacher: login → /teacher-assignments → create assignment → student sees it in
   /homework → submit → teacher sees real completion
10. Engagement: set daily goal → answers count → goal-complete bell notification;
    parent digest renders real weekly data
11. Hindi toggle: chrome strings flip to हिंदी on dashboard/story and back
12. Adaptive: wrong answers steer next-question difficulty (capture responses)
13. Chapter test + pre-board: chapter test completes with report + Story links;
    c10 pre-board renders sections/marks (logged-in — the API 401s logged out)
14. Health & latency: /api/health all-true; 8 key requests <2s each

## Per-class curriculum probes
For each class 6-12: one Story completes, one practice session serves on-grade
questions, one diagnostic completes (15 answers → results), chapter-test catalog
non-empty. Compare against `CURRICULUM_GAPS.md` — new failures = [REGRESSION]
entries; known authoring gaps = skip (already [blocked-owner]).

## Output
Acceptance table (item | pass/fail | evidence path) → BUGS.md. Final tally =
pass count / total + every failure with repro. Failures are the ship-blocker
list — name them loudly.
