# Atlas — Path to 10/10 (Frontend + Backend)

**Audience:** the model/engineer executing this plan.
**Product:** Atlas — CISCE/CBSE learning platform (Next.js 14 + FastAPI + Postgres + Neo4j + Qdrant + Redis + Nginx, all in Docker Compose).
**Deploy repo (source of truth for running app):** `D:\platform\deploy`
**Canonical repo:** `D:\platform` — mirror every deploy edit back (`scripts/sync-deploy.js` syncs repo → deploy, so edits made only in deploy WILL be overwritten).
**Public URL:** `http://localhost` (nginx :80 → frontend :3000, `/api/` → backends :8000).
**Demo login:** `demo@dreamapp.in` / `demo123` (seeded).
**Audit harness:** `frontend/_audit_pages.js` — Playwright + system Chrome, screenshots → `frontend/_shots/`, logs console errors/page errors/HTTP status.

---

## Where things stand (verified 2026-09-16)

**Done and verified:**
- Atlas brand everywhere: `AtlasMark` (SVG constellation logo) + `AtlasGalaxy` (real 9,010-node corpus canvas). Prism/LearnSphere/Vidyaprep swept. Icons + manifest done.
- 51/51 routes return HTTP 200 anonymously, zero hydration/page errors.
- Corpus live: `/learn` 42 topics w/ titles, `/explore` 300-node force graph, `/lesson` real reader, `/my-world` + `/galaxy` full 3D galaxy, `/exam-prep` real blueprints.
- DB seeded: 3,624 enrichment nodes, ~156k questions, 2,476 class-level items.
- Auth lifecycle verified end-to-end in Docker: send-otp → verify-otp → refresh rotation.
- Fixed: `/practice` SSR 500, `/tutor` hydration, service-layer missing `/api` prefix, parent nav 404s, `/simulations` chip dupes, exam-prep raw filenames.
- Frontend image 469MB (was 10.5GB); backend index warm-up at boot (was 44s cold start).

**The real gap:** several frontend services call API surfaces whose **backend services exist but were never wired to routers**. The work below is mostly *wiring + verification*, not building from scratch.

---

## Phase 0 — Ground rules for the executing model

1. **Loop until done:** after every fix, re-run the affected verification step; after every phase, re-run the full crawl. Do not stop at "no errors" — a page that renders an empty shell because its API 404s is NOT done.
2. Edit in `deploy/`, verify in Docker, **then mirror to `D:\platform`** before committing.
3. `docker cp` patches are ephemeral — after any source fix, rebuild the image (`docker compose -f docker-compose.prod.yml build backend|frontend`) and recreate.
4. Never downgrade verification: use the audit script, look at screenshots, read console output.
5. Demo data may be seeded; never fabricate corpus content.

---

## Phase 1 — Wire the orphaned services (biggest backend gap)

The pattern for each: write a thin FastAPI router under `backend/api/`, mount in `main.py`, keep response shapes exactly matching what the frontend service already parses (read the TS service first — it defines the contract).

### 1a. Diagnostics — `/api/diagnostics/*`
- **Frontend contract:** `frontend/services/diagnostic.service.ts` calls:
  `POST /diagnostics/start`, `POST /diagnostics/{id}/submit`, `GET /diagnostics/{id}/result`,
  `GET /diagnostics/history`, `POST /diagnostics/mutations/replay`,
  `GET /diagnostics/{id}/remediation`, `POST .../remediation/steps/{stepId}/start|complete`
- **Existing engine:** `backend/services/diagnostic_service.py` (~1,300 lines) — `start_diagnostic`, `submit_diagnostic_answer` (IRT adaptive selection), `get_diagnostic_result`, `generate_remediation_path`, `get_misconceptions`. Adapt request/response shapes in the router; do NOT rewrite the engine.
- **Page:** `app/(student)/diagnostic/page.tsx` (already built, KaTeX + framer-motion).
- **Acceptance:** authenticated student can start a diagnostic, answer adaptive questions, get a result with mastery + misconceptions, and start remediation steps — all persisted, reload-safe.

### 1b. Exams — `/api/exams/*`
- **Frontend contract:** `exam.service.ts` calls `/exams/{id}/result`, `/exams/{id}/strategy`, `/exams/{id}/submit`, `/exams/history`.
- **Existing:** `backend/services/exam_service.py::ExamService` (`create_exam`, `submit_exam`, `get_exam_result`, `get_exam_strategy`, `get_time_analysis`) — already mounted under `/api/assessment/exam-sim/*` in `routers/assessment.py`.
- **Fix:** either add an `/api/exams` adapter router that delegates to `ExamService`, or repoint `exam.service.ts` to `/api/assessment/exam-sim/*`. Prefer the adapter if response shapes differ; match exactly.
- **Acceptance:** `/exam`, `/exam-simulator` complete a full timed attempt → submit → result page with real grading + strategy, authenticated.

### 1c. Teacher — `/api/teacher/*`
- **Frontend contract:** `teacher.service.ts` calls `/teacher/classes`, `/teacher/classes/{id}/students`, `/teacher/classes/{id}/progress`, `/teacher/assignments`, `/teacher/worksheets`, `/teacher/worksheets/{id}`, `.../performance`, `.../printable`, `.../send-whatsapp`.
- **Existing:** `worksheet_service.py` (~2,000 lines: `create_worksheet`, `get_worksheet`, `generate_printable`, `send_to_class`, `get_class_performance`). Dashboard data exists at `/api/dashboard/teacher/{id}` and `/api/teacher-analytics/*`.
- **Work:** create `api/teacher.py`. Worksheets = thin wrap of `worksheet_service`. Classes/assignments may need minimal tables — check `models/` for existing class/assignment models before creating any.
- **Acceptance:** `/teacher-overview` + `/teacher-dashboard` show real classes/students; a worksheet can be generated and printed; no 404s on page load.

### 1d. Junior — `/api/v1/junior/*`
- **Frontend contract:** `junior.service.ts` calls `/v1/junior/students/{id}` and `.../progress`.
- **Existing:** `junior_service.py` — full activity engine (multiplication/addition generators, hints, badges, celebrations, story problems, flash cards, spelling, counting, listen-repeat, GK).
- **Acceptance:** `/junior` serves real generated activities for the logged-in child, badges/celebrations fire, progress persists.

### 1e. Parent
- Check `parent.service`/page calls; backend has `/api/dashboard/parent/{id}`, `my-children`, `link-child` in auth. Wire whatever the page needs; if `ParentStudentLinkModel` rows are needed, seed one demo parent↔student link.
- **Acceptance:** `/parent-overview` shows a real child's mastery/activity, not empty state.

---

## Phase 2 — Authenticated end-to-end audit (the crawl that was never run)

1. Extend `_audit_pages.js` (or write `_audit_authed.js`): perform login via `demo@dreamapp.in`/`demo123` through the real `/login` UI (or inject the token into zustand-persist localStorage — check `stores/authStore.ts` persist key), then crawl **all** authenticated routes with screenshots.
2. Required flows to exercise with real interactions, not just page loads:
   - `/practice` — start a session, submit an answer, end session
   - `/diagnostic` — complete a mini diagnostic
   - `/exam-simulator` — start → answer → finish
   - `/tutor` — send a message, get a reply (see Phase 3: will be heuristic without LLM key — document which)
   - `/progress`, `/achievements` — verify real numbers, not zeros
3. Fix everything found. Repeat until clean.

---

## Phase 3 — Intelligence layer (tutor is currently heuristic)

- `GEMINI_API_KEY`, `FREELLM_*`, `GROQ_API_KEY` are all **empty** in container env. Tutor uses `services/llm_client.py` → falls back to `_fallback_hint` (rule-based).
- **Blocked on user:** needs an API key. Ask for one; put it in `.env` (never commit), wire `GEMINI_API_KEY: ${GEMINI_API_KEY}` — already plumbed in compose.
- Without a key: document honestly that tutor = misconception-aware heuristics; do not claim it's an LLM.
- Real OTP sender: `MockWhatsAppSender` prints codes to backend logs. Needs provider creds — also user-blocked; leave mock + document.

---

## Phase 4 — Product coherence (fun + premium, per user ask)

Route sprawl is real — six tutor pages, three exam pages, two atlas pages. Consolidate:
1. Pick canonical experiences: `/tutor`, `/exam`, `/learn`, `/practice`, `/my-world`. Redirect (`next.config` redirects or page-level `redirect()`) the variants: `/ai-tutor`,`/socratic-tutor`,`/competency-tutor`,`/tutoring` → `/tutor`; `/exam-prep`,`/exam-simulator` → keep but unify nav; `/atlas`,`/atlas-v2` → keep one showcase.
2. Nav audit: every sidebar/nav link must resolve (parent nav bug was this class of bug).
3. Student fun layer (already partially present — XP, streaks, mastery rings, celebrations): verify it's wired to real progress data, not static.
4. Empty states: every page that can be empty needs a designed empty state with a next action (junior + teacher already have them — match that pattern).

---

## Phase 5 — Hardening + ship

1. Fix build warnings: dynamic dep in `frontend/lib/c6_12_gameRegistry.ts`; 2.63MB PWA chunk not precached; service-worker >500KB Babel warning.
2. Anonymous 401 console noise on `/practice`/`/exam-simulator`: if the desired UX is no console errors, gate the fetch on auth state (already in `authStore`) instead of firing and catching.
3. `docker system df` sanity — keep images lean; `.dockerignore` is already correct, don't regress it.
4. Final full crawl (anonymous + authenticated), all screenshots reviewed, zero unexplained console errors.
5. Mirror everything to `D:\platform`, run `node scripts/sync-deploy.js --check`, commit, refresh `_KEEP` bundle (`git bundle create` → `D:\_KEEP\platform_bundle_full.git`).

---

## Definition of done (10/10)

- [ ] Every route: HTTP 200, screenshot reviewed, zero console/page errors — **anonymous AND authenticated**
- [ ] Diagnostics, exams, worksheets, junior activities, teacher classes, parent view: real data end-to-end
- [ ] Tutor replies: real LLM (key provided) or documented heuristic fallback
- [ ] No dead nav links, no route sprawl confusion, designed empty states everywhere
- [ ] Build clean (no new warnings), images lean, all 8 containers healthy
- [ ] Repo↔deploy synced, committed, bundle refreshed

## Known blockers needing the user

- LLM API key (Gemini/Groq/OpenAI-compatible) for real tutor replies
- WhatsApp/SMS provider creds for real OTP delivery
