# Atlas — Authenticated End-to-End Crawl Report (Phase 2)

**Plan:** `docs/ATLAS_10x10_PLAN.md` Phase 2 — the authenticated crawl that was never run.
**Executed:** 2026-09-16, 15:31–16:24 UTC (baseline run 15:31, final re-run 16:11 after wiring agents landed `/api/diagnostics` + `/api/v1/junior` routers and recreated both backends mid-audit).
**Harness:** `_audit_authed.js` (Playwright + system Chrome) — logs in through the **real `/login` UI form** with `demo@dreamapp.in` / `demo123` (UI login succeeded on every run; no token injection needed), then crawls **every route enumerated from `app/**/page.tsx`** with screenshot + console-error + page-error + HTTP-status + API-4xx/5xx capture. Supplemental probes: `_audit_probes_final.js` (WS frame capture, POST body capture, deep flow checks).
**Machine-readable artifacts:** `_shots_authed/report.json` (per-route), `_shots_authed/flows.json` (flows), `_shots_authed/probes_final.json`, 101 PNGs — copied to `D:\platform\frontend\_audit_artifacts\` (deploy-side `_` files are wiped by `scripts/sync-deploy.js`; repo side is canonical).

**Important environment context:**
- Docker Desktop daemon was down at start (whole stack cold-started); it also crashed once mid-audit and was restarted. Backends were recreated by concurrent wiring agents twice during the audit (~16:05 with new `diagnostics.py` + `junior.py` routers, again ~16:21). Anomalies flagged "deploy-window noise" below stem from this.
- The **frontend image is stale** relative to deploy source: the running bundle still contains the old `AuthGuard` role-home map (`student: '/socratic-tutor'`) while source has been fixed to `student: '/tutor'` (`components/AuthGuard.tsx:40`). Frontend was NOT rebuilt (per ground rules).

---

## 1. Totals

| Metric | Count |
|---|---|
| Routes enumerated from `app/**/page.tsx` | **83** (75 static + 8 dynamic) |
| HTTP 200 | 83/83 document loads (0 non-200) |
| Clean pass (200 + renders + zero errors) | **68** |
| Intended redirect | **2** (`/ai-tutor`→`/tutor`, `/unregister-sw`→`/lumen`) |
| Role-gated bounce incl. `/socratic-tutor` itself (expected gating, broken landing due to stale image) | **5** |
| Render-with-defect (200 but real console/API defects) | **8** = 6 real (`/learn/[topicId]`, `/junior`, `/junior-simple`, `/premium/offline`, `/teacher-overview` API-404, exam dynamic-placeholder 404s) + 2 deploy-window noise (`/premium/achievements` 502, `/premium/dashboard` loading spinner — both clean in baseline, API re-verified 200) |
| Pending-wiring (renders, backend surface absent/empty) | **6** |
| Interactive flows | practice PASS (with persistence defects), tutor FAIL (no reply; crash in baseline), progress PASS, achievements PASS, diagnostic PASS (now persisted), exam-simulator PARTIAL, junior PASS |

Per-route details: see `report.json` + screenshots. Route-by-route rollup:

**Clean (68):** `/` `/dashboard` `/learn` `/explore` `/lesson` `/practice` `/practice/deterministic` `/quizzes` `/simulations` `/sims-v2` `/solver` `/exam` `/exam-prep` `/homework` `/portfolio` `/videos` `/study-groups` `/study-tools` `/coding-playground` `/sandbox` `/cognitive` `/holistic` `/galaxy` `/my-world` `/atlas` `/atlas-v2` `/3d-lab` `/lumen` `/organism` `/settings` `/settings/accessibility` `/onboarding` `/offline` `/achievements` `/progress` `/tutor` `/tutoring` `/competency-tutor` `/welcome` `/world` `/play` `/showcase` `/topic-map` `/login` `/signup` `/forgot-password` `/verify-email` `/parent-overview` `/parent-dashboard` `/junior` `/junior-simple`* `/sims-v2/[id]` `/simulations/[id]` `/premium` `/premium/login` `/premium/signup` `/premium/dashboard`* `/premium/practice` `/premium/progress` `/premium/settings` `/premium/achievements`* `/premium/learn` `/premium/exam` `/premium/tutor` `/dragon-inspect` `/game-test` `/riv-test` `/sim-test` — *asterisk = had baseline-only noise (see §5).

**Defect render (7):** `/socratic-tutor`, `/teacher-dashboard`, `/admin-dashboard`, `/parent-portal`, `/teacher-portal` (stale-image bounce chain), `/learn/[topicId]` (Topic Not Found), `/junior` (SVG path console error).

---

## 2. REAL defects (evidence-backed, not wiring-dependent)

### D1. Dashboard → "Continue Learning" → Start = "Topic Not Found" (kills the core student loop) — HIGH
- Dashboard cards link `/learn/{nodeId}` (`components/dashboard/ContinueLearning.tsx:24`) with real recommended ids (`/api/content/recommended` → `c10_eng_003_01`, `c10_math_002_01`…).
- `/learn/c10_eng_003_01` renders **"Topic Not Found — API error 404: no enhanced node 'c10_eng_003_01'"**.
- Evidence: 404 `GET /api/content/nodes/{id}/enrichment` (×2), 404 `GET /api/nodes/node?node_id=…`, 404 `GET /api/tutor-graph/teach?node_id=…` (final run, `report.json`); DB: `enrichment_node` table has **0 rows** (the "3,624 seeded enrichment nodes" are not in this table), `knowledge_nodes` has 7.
- Note: `/lesson` (which reads `/api/nodes/by-class-subject`) works — `/learn/[topicId]` reads a different, empty data source. Data-source mismatch, needs either a seed or repointing.

### D2. `/tutor` — sending a message gets no reply; WS contract mismatch (was a hard crash in baseline) — HIGH
- Frame capture (final): page sends `{"user_query":"What is a polynomial?","mastery":0.3,"subject":"Mathematics",…}` — **no `type` field**; backend `backend/api/tutor.py:466 tutor_websocket` only handles `type: ask|hint|explain_step|its_*` and replies `{"type":"error","message":"Unknown message type: None"}`.
- Baseline run: that frame was appended as a message with `content: data.text = undefined` → `renderMath(undefined)` → `TypeError: Cannot read properties of undefined (reading 'split')` (`app/(student)/tutor/page.tsx:306,1164`) → full-page React ErrorBoundary "Something went wrong". In the final run the page no longer crashed but hung on "Tutor soch raha hai…" with no reply — the contract mismatch stands either way.
- Two adjacent bugs visible in the same capture: WS URL is `ws://localhost:8001/api/tutor/its/ws?user_id=undefined` — **bypasses nginx :80** (hardcoded 8001 fallback in `TUTOR_WS_URL`) and **`user_id` is literally `undefined`** (`effectiveUserId` unresolved).
- LLM status (Phase 3 documentation): container env has `GEMINI_API_KEY=` and `DEEPSEEK_API_KEY=` **declared but empty** → even after the contract fix, replies will come from the backend's rule-based `_fallback_hint` **heuristic, not an LLM**. Do not claim LLM behavior.

### D3. `/practice` — session UX works end-to-end but nothing persists server-side — HIGH
- UX PASS: Start Practice → real question → select option → Submit → "Correct! ✓ +10 points, Mastery: 0% → 8%" → auto-advance → summary screen.
- Baseline evidence (request bodies + backend traceback captured):
  - `POST /api/practice/start` body has **no `student_id`** → backend pydantic default `student_id="demo"` → backend writes `'demo'` (not the JWT user's UUID) into `attempts.student_id` (uuid column) → `ValueError: badly formed hexadecimal UUID string` → SQLAlchemy `PendingRollbackError` → **500 on every `POST /api/practice/{id}/submit`**; GET session 404s because the session never commits. (`docker logs dream-backend-1` 15:48/15:49, SQL params show `'student_id': 'demo'`.)
  - `POST /api/practice/session` → **405** (page calls a route the backend never implemented; page comments call it "legacy session POST" — `app/(student)/practice/page.tsx:544`).
- Final re-run (backend updated by wiring agents): 500 is gone (rollback fix landed), but submit is now a clean **404** — the session still never persists; summary is computed client-side only. Root cause (student_id resolution) still open.
- Local-only quirk noticed: summary counts unanswered questions as incorrect (accuracy 100% with 1/5 correct after answering 1 of 5).

### D4. `/socratic-tutor` bounces an AUTHENTICATED student to `/login` (stale frontend image) — MEDIUM
- Chain: any page whose AuthGuard rejects the student role redirects to the **old** student home `/socratic-tutor` (running bundle `chunks/24859-*.js`: `{student:"/socratic-tutor",…}`), and the running `/socratic-tutor` page's AuthGuard then pushes to `/login` — so `/teacher-dashboard`, `/admin-dashboard`, `/parent-portal`, `/teacher-portal` all strand a logged-in student on `/login`.
- Source already fixed twice (`components/AuthGuard.tsx:40` student→`/tutor`; `app/(student)/socratic-tutor/page.tsx` is now a `redirect('/tutor')` stub) — **the frontend image just needs a rebuild**. The role-gating itself is correct behavior (demo user is a student; only student routes should render).
- Related seed gap: no teacher/parent accounts exist in DB (only `demo@dreamapp.in` student + 1 anonymous student row), so the teacher/parent experience cannot be verified with a real role account.

### D5. `/premium/offline` — client TypeError — MEDIUM
- `TypeError: o.filter is not a function` at chunk load → page renders without its list (baseline crawl, `report.json`).

### D6. `/premium/learn` + `/premium/exam` — dead links to non-existent routes — MEDIUM
- Baseline: 10× RSC-prefetch 404 `/premium/learn/{uuid}` (route `[topicId]` doesn't exist), 3× 404 `/premium/exam/{id}`. Cards render then dead-end.
- Also cosmetic: `/api/achievements` (and `/api/practice/health` etc.) answer `307 → same path + "/"` — harmless but noisy.

### D7. `/junior` — console error on load — LOW
- `Error: <path> attribute d: Expected moveto path command ('M' or 'm'), "undefined"` — a chart renders an SVG path from data that is still absent (junior progress API only became available mid-audit; see P3).

### D8. Leftover brand/theme on `/diagnostic` — LOW
- Page still brands itself **"LearnPath"** with the old indigo/purple theme and a "LearnPath L" logo — only page in `app/**` still containing the string. Atlas sweep missed it. `/teacher-overview` also shows a hardcoded teacher persona "Rajesh Kumar" (with "Demo Student" as display name) instead of the authenticated identity.

---

## 3. Interactive flows (required by the plan)

| Flow | Result | Detail |
|---|---|---|
| `/practice` start→answer→end | **PASS (UX) / FAIL (persistence)** | Full session works; see D3 for the 500→404 persistence defect + 405. |
| `/diagnostic` mini diagnostic | **PASS — and now wired** | Baseline: 100% client-side engine (zero API calls — real adaptive questions, KaTeX, timer, but nothing persisted). Final run: `POST /api/diagnostics/start` → **200** (router landed mid-audit); question served from backend path. Subject→chapter→Start gate works (button disabled until both chosen — correct UX). Remaining: verify submit/result/remediation end-to-end once wiring agents finish (acceptance criteria of Phase 1a). |
| `/exam-simulator` start→answer→finish | **PENDING-WIRING (data gap)** | List renders 3 real seeded exams (Science/Maths Pre-Board 2025 + 1). Opening `cbse10_sci_preboard1` → designed empty state **"No questions available"** — `GET /api/assessment/exams/{id}` returns `sections: []` while `board_questions` holds 182k rows. Exams need question sections seeded/assembled before a timed attempt can run (Phase 1b remainder). |
| `/junior` activity | **PASS (UX) / PENDING (persistence)** | Home renders ("Aaj hum kya seekhenge?" + Maths/English/Science/GK). Maths opens a real generated activity ("26 − 15 = ?" listen-and-answer). Still zero backend calls — the new `GET /api/v1/junior/students/{id}/progress` (200) is not consumed by the page yet. Badge/celebration/persistence wiring outstanding (Phase 1d remainder). |
| `/tutor` send→reply | **FAIL** | No reply (was: crash). WS contract mismatch + empty LLM key. See D2. **The reply engine is the heuristic fallback, not an LLM** — documented per Phase 3. |
| `/progress` real numbers | **PASS** | Live from user profile: Total XP **2,450**, Level **25** (50/100 to 26), Day Streak **4**, "Live data" badge; no console errors. Mastery 0% and "0 of 0 nodes mastered" are TRUE zeros — DB has 0 attempts/mastery/diagnostic rows for the demo student (verified via psql), and the page shows designed next actions ("Take your first diagnostic →"). |
| `/achievements` real numbers | **PASS (real zeros)** | 0 earned / 24 locked / 0 badge XP / 0% wall — consistent with DB (`achievements` = 24 definition rows, no unlock/progress rows; API returns `progress: 0, unlocked: false` for all). Numbers update from real activity once practice persistence (D3) is fixed. |

---

## 4. Pending-wiring register (expected failures, tagged not blocking)

| Area | State at audit end |
|---|---|
| `/api/diagnostics/*` (Phase 1a) | **Router LIVE** (`diagnostics.py` mounted, start→200). Finish verifying submit/result/remediation. |
| `/api/exams/*` (Phase 1b) | Adapter/router not present; existing `/api/assessment/exams` serves list+detail; **exam sections/questions empty** — seed or assemble from `board_questions`. |
| `/api/teacher/*` (Phase 1c) | Not present. `/teacher-overview` renders with designed empty state but `GET /api/teacher/classes?teacherId=…` → **404** (2 calls). |
| `/api/v1/junior/*` (Phase 1d) | Router LIVE (`junior.py`, progress → 200) but the page doesn't call it yet. |
| Parent (Phase 1e) | `/parent-overview` renders clean; `parent_student_links` empty — needs a seeded demo parent↔student link to show real child data. |
| `/premium/tutor` | Baseline: `GET /api/tutor/sessions` 404 (backend has no sessions endpoints — `tutor.service.ts` contract). Final run: clean render. |

---

## 5. Environment noise (not defects)

- `/premium/achievements`: one 502 on `/api/achievements` during the final crawl — backends were being recreated by wiring agents at that moment; API verified 200 immediately after.
- `/premium/dashboard`: stuck on its "Loading…" spinner in the final crawl screenshot — same deploy window; baseline run was clean.
- `/learn/[topicId]` with placeholder id `demo` (baseline): page spins forever instead of showing the designed "Topic Not Found" state it shows for real-but-unknown ids.
- `/junior-simple`: 4× RSC-prefetch 404 for `/junior/crossword|quiz|drag-drop` — dev page links to routes that don't exist (arguably a real dead-link bug, low priority).
- Docker daemon itself crashed once mid-audit and was restarted; all 8 containers recovered healthy on their own.

---

## 6. Reproduce

```
cd D:\platform\deploy\frontend
node _audit_authed.js crawl    # ~8.5 min, all 83 routes -> _shots_authed/report.json
node _audit_authed.js flows    # ~2 min, interactive flows -> _shots_authed/flows.json
node _audit_probes_final.js    # ~25 s, WS frames + POST bodies + deep probes -> probes_final.json
```
Login is through the real `/login` form (falls back to `dream-auth` localStorage injection if the UI path ever fails). Canonical copies of the harness live in `D:\platform\frontend\` because `scripts/sync-deploy.js` deletes untracked `_`-files in deploy (this wiped the first copy mid-audit).
