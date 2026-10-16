# Atlas — Google Play store listing copy

Paste-ready text for the Play Console "Store listing" tab. All claims are
grounded in the shipped product (deterministic solver, plans table, corpus
counts) — keep them true when the product changes.

| Field | Value | Limit |
|---|---|---|
| App name | `Atlas Learning` | 30 chars |
| Short description | see below | 80 chars |
| Full description | see below | 4000 chars |

**Short description (78/80 chars):**

```
Verified answers for CBSE & CISCE, classes 6-12. Learn smarter, free to start.
```

**Full description (2928/4000 chars):**

```
Atlas is the study app for CBSE and CISCE (ICSE & ISC), classes 6–12 — built around one promise: the answer you see has been verified.

WHY ATLAS

Most study apps guess. Atlas doesn't. Every solution comes from a deterministic solving engine that re-executes the problem step by step against the official syllabus corpus — 20,000+ curriculum topics mapped concept-by-concept. Atlas never hallucinates an answer, and when a step is machine-assisted, it says so right in the UI. Your trust is earned in the product, not claimed in ads.

WHAT'S INSIDE

• Verified step-by-step solutions — every answer re-executed, never recalled
• Mastery engine — every attempt updates a live mastery score per topic, so you always know what to revise next
• Your learning path — a personalised route through the syllabus, driven by what you actually know, not a fixed chapter list
• The Lab — predict → play → check science simulations with retrieval beats that make concepts stick
• Learn through games — diagram labelling, quizzes and missions built on the real syllabus corpus
• Board-pattern papers — generate a practice paper on the exam pattern, with a full answer key
• The Cosmos — see your whole syllabus as a living concept map and explore how topics connect
• Command center — streaks, achievements and honest progress tracked live against your account
• Classes 6–12 — CBSE and CISCE (ICSE & ISC), aligned chapter-by-chapter, with 2.5 lakh+ board-style practice questions across 100+ class–subject combinations

HOW IT WORKS

Pick a topic. Work a short mission. Commit to your answer before the solution opens — even a wrong guess makes the right answer stick. Atlas re-executes each step in front of you, you say whether it landed, and your mastery map updates. Study in honest sessions of ten focused minutes, not ten distracted hours.

FREE TO START

Classes 6–8 are fully free. Classes 9–12 get 3 learning missions every day, free. Optional Scholar and Topper upgrades unlock premium simulations and unlimited practice — purchased on our website, never pushed at you inside the app. There are no ads, and your data is never sold.

HONEST BY DESIGN

• We show you when something is machine-assisted
• Your mastery numbers come from your real practice — nothing is inflated
• No ads. No data sold. Ever.
• Encrypted in transit — and you can request a full export or deletion of your data at any time

GOOD TO KNOW

• Atlas needs a free account (so your progress is truly yours) and an internet connection
• Maths, Science, Physics, Chemistry, Biology, Social Science, English, Hindi and more — classes 6–12, CBSE and ICSE/ISC boards
• Built for daily practice: short missions, honest feedback, visible mastery
• Parents and teachers: progress lives in the student's account — nothing is shared with third parties

Download Atlas, pick a topic you got wrong this week, and see every step. Master it. Move on.

Atlas — Learn smarter.
```

Subject list above mirrors the served class/subject map (classes 6–12; CBSE
Hindi included; Sanskrit/Urdu out of scope). Trim it if the shipped subject
map changes.

---

## Screenshot captions (already rendered on the frames)

| # | File | Caption | Source route |
|---|---|---|---|
| 1 | `screenshots/screenshot-1-home.png` | Your learning home | `/` |
| 2 | `screenshots/screenshot-2-dashboard.png` | Track your mastery | `/dashboard` |
| 3 | `screenshots/screenshot-3-lab.png` | Solve with a step-by-step tutor | `/learning/lab` |
| 4 | `screenshots/screenshot-4-games.png` | Learn through games | `/learning/games` |

Order in Play Console: 1, 3, 4, 2 (lead with the signed-in-looking rich
screens; the dashboard capture shows the signed-out gate — see note).

## Honesty notes (owner)

- Screenshot 2 shows the **signed-out** dashboard ("Sign in to open your
  command center") — an honest state, but if you want a signed-in capture on
  submission day, run `tools/capture_screens.js` from a profile that is
  already logged in (it reuses the same Chromium and re-frames via
  `python tools/make_branding.py frames`).
- "2.5 lakh+ practice questions" = 253,456 rows in `board_questions` across
  115 class/subject combos (platform data manifest). "20,000+ topics" matches
  the landing page's own claim (corpus: 14,236 CBSE + 9,431 CISCE node files).
- Purchases are **not** in the Play build v1 (Play Billing policy sequencing,
  README-STORE §7) — hence "purchased on our website".
- New personal Play accounts must run a **closed test with 12+ testers for
  14 days** before production access — start that track on day one (see
  README-STORE §9 checklist).
