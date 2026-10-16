# ATLAS — FULL PERSONAL PRODUCT AUDIT
*Auditor: coordinator (direct browser walk, 1440px + 390px, production :3001, fresh Class 10 signup + teacher + parent personas). 17 surfaces captured; 5 minor console issues (404s + one 401). Evidence: `frontend/_shots/audit/`.*

## Verdict
The product has crossed from "working" to "coherent". One P1 regression (pre-board 401 in the browser), one copy-level brand break (signup says "ICSE & ISC"), and a set of presentation/polish improvements below. Nothing else blocks.

## P1 — fix immediately
1. **Pre-Board Simulator shows "No papers" to logged-in Class 10 students** — `GET /api/preboard/papers?class_level=10` → 401 from the browser (verified logged-in). The API works with an explicit token (ADAPT verified), so the exam-prep page is calling without attaching the auth header (raw fetch instead of lib/api `getAuthToken()`), or the route's auth check rejects the same-origin proxy path. Fix the page to use `api.get`; verify papers render for c10/c12.

## Brand/copy
2. **Signup page advertises "AI-powered learning for CBSE, ICSE & ISC"** and "knowledge graph spanning CBSE, ICSE & ISC" — contradicts the landing's CBSE-only "never wrong" positioning and the c10fix removal of ISC branding from the exam simulator. Rewrite signup copy to CBSE-only.
3. **Primary CTA "Start learning free"** — text touches the button border at 1440px; add horizontal padding.

## Presentation improvements (existing screens)
4. **Dashboard — Daily Goal appears twice** (once in the STATE OF YOU strip as "No goal yet — set one below", once as its own card directly below). Merge: keep the dedicated card, drop the strip duplicate.
5. **Dashboard — Command Briefing + Study Plan**: the briefing ("Light your first star") is excellent; when the STUDYPLAN weekly grid ships it should sit directly under the briefing, not below Continue Learning — mission → plan → content is the right reading order.
6. **Galaxy (new student)** — beautiful and honest, but a 0-star sky gives no entry point. Add a "Start here" beacon on the star matching the briefing mission, so the sky itself answers "what do I do first?". Constellation labels collide in clusters (English: Hornbill/Kaleidoscope/Flamingo/Snapshots overlap; "ECONOMICSCOMPUTER SCIENCE" is fused) — thin out labels beyond a zoom threshold.
7. **Practice landing** — clean, but shows only "Mathematics" with no chapter/topic choice or difficulty hint. Add the chapter picker (or at least "Ch 1 · Real Numbers" context) and a one-line "how it works" for first-timers (5 questions, instant feedback, adaptive).
8. **Pre-board empty state** — for visitors/new students it says "No pre-board papers available for this class yet" — after fixing the 401, signed-in c10/c12 students must see the 3 papers; keep the honest empty state only for classes without papers.
9. **Landing "Start learning free" CTA** duplicates the nav "Start learning" — fine, but the hero secondary "Explore the cosmos →" is the more distinctive tap; consider promoting it visually.
10. **Focus/accessibility**: focus ring is now gold (good); verify keyboard traversal on the briefing and galaxy HUD next pass.

## Content presentation (the teaching layer, beyond the 4 running agents)
11. Story screens should state the board relevance inline on the HOOK: "Asked in CBSE 2019 · 3 marks" (data exists in board_questions) — relevance is the strongest motivator and the data is already there.
12. End-of-Story "Today I learned" revision card — a keepable summary artifact (retrieval practice + notes), currently sessions end at XP only.
13. Confidence calibration on checks ("Sure" / "Just guessing" before reveal) — trains exam temperament and separates lucky-right from confident-wrong.

## Console cleanup
14. 404s: `galaxy.json` (missing in deploy/frontend/public — copy it), one 404 on /signup (resource TBD), one 404 after learn/electric-current navigation; 401 on exam-prep (item 1). Target: zero console errors sitewide.

## What is genuinely excellent (keep, don't touch)
- Cosmos landing with honest positioning and real stats
- Command Briefing: honest zeros phrased with intent; ONE mission, one click deep
- Mastery Map with per-subject tracked-node counts; "straight from your answer history"
- Galaxy: honest sky legend, class filters, Open Dashboard
- Story Mode: hook → idea → trap → check sequence, gold system, mobile-clean
- Practice landing clarity ("5 questions · Instant feedback · Adaptive difficulty", "Online — Live questions")
- Teacher/parent surfaces: honest, staff-guarded, real data

## Reproduction pointers
- P1: login → /exam-prep → network shows `401 /api/preboard/papers?class_level=10` while page renders "No pre-board papers available"
- Copy: /signup hero copy lines 2-3
- Duplicate goal: /dashboard (STATE OF YOU strip vs DAILY GOAL card)
