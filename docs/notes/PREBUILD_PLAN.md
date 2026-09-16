# PREBUILD PLAN — DREAM_APP / CISCE Learning Platform

Date: 2026-09-15. Source: live code inspection (git working tree, not just HEAD).

---

## 1. TL;DR — honest chances

**Verdict: the app is NOT full-stack runnable today.** The frontend is ~90%
self-sufficient (local data, Next API routes, sims engine all client-side),
but the FastAPI backend **cannot boot** — `backend/routers/__init__.py`
imports `backend.api.student_sync`, a file that does not exist (only a stale
`.pyc` remains). The previous agent deleted `api/student_shim.py` and pointed
the import at a file it never created.

**Realistic assessment:**

| Area | State | Confidence it works |
|---|---|---|
| Frontend build/dev server | 85+ pages, PWA, i18n — heavy but real | High |
| Sims (sims_v2) | 108 MB of hand-built sim defs, classes 1–12 | High (client-side only) |
| Backend boot | ImportError on `student_sync` | **0% until fixed** |
| Backend once booted | Dual router layer, some dup prefixes shadow each other | Medium |
| Auth flow | Both `/api/auth` routers mounted; first wins | Medium |
| Tutor / practice / progress | Routers exist; several parallel impls (v1/v2/v3) | Medium |
| Homework, exams, socratic | Frontend services call endpoints that are NOT mounted | **Broken by design** |
| Prod deploy | docker-compose.prod has 2 backends + nginx + frontend; rewrite hardcodes `localhost:8001` | Needs work |

**Honest chance it "just works" end-to-end as-is: ~10%.** With a focused
fix list (below), a demo-able full-stack state is very achievable — the
pieces mostly exist, the wiring is the problem.

---

## 2. System topology

```
┌───────────────────────────── BROWSER ─────────────────────────────┐
│ Next.js app (frontend/) — 85 page.tsx files                        │
│   Route groups: (auth) (student) (teacher) (parent) (admin)        │
│   Plus: premium/* duplicate app, and ~15 experiment pages          │
└──────┬─────────────────────────────────┬──────────────────────────┘
       │ /api/local/* /api/public/*      │ all other /api/*
       │ /api/tts /api/c68/*             │ (next.config rewrite)
       ▼                                 ▼
┌──────────────────────┐      ┌─────────────────────────────────────┐
│ Next API routes       │      │ FastAPI backend (backend/main.py)   │
│ (BFF — local JSON,    │      │  :8001                              │
│  markerParser, tutor  │      │  18 routers mounted:                │
│  sessions in-memory)  │      │   routers/  auth content assessment │
└──────────────────────┘      │            tutor progress           │
       │                      │            achievements graph solver│
       │                      │   api/      verified_practice       │
       │                      │            competency_tutor practice│
       │                      │            enhanced_nodes           │
       │                      │            intelligence its_tutor   │
       │                      │            teacher_analytics        │
       │                      │            analytics accessibility  │
       │                      │            student_sync  ← MISSING  │
       │                      └──────┬──────────┬──────────┬────────┘
       │                             │          │          │
       ▼                             ▼          ▼          ▼
  frontend/data,              postgres  neo4j   redis   qdrant
  content files,              (+sqlite  (graph  (cache) (+clickhouse,
  SIM_INDEX.json               fallback) fallback)      langfuse —
                               backend_local.db          analytics)
```

**Key wiring rule:** `next.config` `rewrites()` sends every `/api/*` that
isn't a local route file to `http://localhost:8001` — **hardcoded**, not
env-driven. In prod this must be handled by nginx or the rewrite breaks.

---

## 3. Page → data map

### 3.1 Auth (`app/(auth)`)
| Page | Calls | Source |
|---|---|---|
| login, signup | `authService` → `/api/auth/*` | backend `routers/auth.py` AND `api/auth.py` both mounted (dup prefix) |
| forgot-password, verify-email | contain mock/placeholder paths | partial |

### 3.2 Student core (`app/(student)`)
| Page | What it does | Data source |
|---|---|---|
| galaxy | Landing/world map w/ Companion, DailyExperiment | `authStore` + world components — mostly client-side |
| learn, learn/[topicId] | Lesson browsing | `lib/api` → `/nodes`, `/content`, `/mastery` — **note: lib/api calls legacy unprefixed paths (`/nodes/..`) that match the DELETED api/nodes.py** — likely broken |
| practice | Question practice | `lib/api` + `offlineCache` |
| practice/deterministic | Verified practice | `api/verified_practice.py` `/api/practice/deterministic` — mounted, OK |
| sims-v2, sims-v2/[id] | Simulation catalog + player | **local**: `components/sims_v2` SIM_INDEX + `masteryStore` — no backend needed |
| simulations, simulations/[id] | Older sim system | `gameRegistry` — local |
| tutor | Main AI tutor (1617 ln) | REST `/api/tutor/ask` + WS `/api/tutor/its/ws` → `api/tutor.py` (mounted) |
| socratic-tutor | Socratic flow | `useAnalytics`, authStore — socratic.service calls `/api/socratic/*` — **no such router** |
| competency-tutor | Graph tutor | relative `/api/tutor-graph/*` → `api/competency_tutor.py` — mounted, OK |
| ai-tutor | 5-line stub | nothing |
| solver | STEM solver | own `./solver/api` module → `/api/solver/*` (dup-mounted) |
| diagnostic | Diagnostic test | `diagnostic.service` — check its base; `api/diagnostic.py` was **deleted** |
| exam, exam/[id], exam-simulator | Exam flows | `assessment.service` → `/api/assessment/*` (dup-mounted); `exam.service` calls `/api/exams` — **no router** |
| progress | Dashboard | `progress.service` → `/api/progress/*` (dup-mounted) |
| achievements | Badges | authStore + UI — service exists → `/api/achievements` (dup) |
| homework | Homework UI (1929 ln) | **All backend calls commented out** — mock data; `api/homework.py` never mounted |
| junior, junior-simple | Class 1–5 world | self-contained components |
| explore, cognitive, holistic, portfolio, videos, study-*, coding-playground, sandbox, offline, onboarding, settings | Mostly UI/mock or local-store driven | mixed — several flagged mock |

### 3.3 Teacher / parent / admin
| Page | Data |
|---|---|
| teacher-dashboard | `/api/teacher-analytics/overview` → `api/teacher_analytics.py` — mounted, OK |
| teacher-overview | `teacher.service` (no api calls found in service — likely mock) |
| parent-overview, parent-dashboard, parent-portal | mock/local |
| admin-dashboard | mock/local |
| (admin) group | admin pages |

### 3.4 Duplicate + experimental surface
- `app/premium/*` — a full **parallel copy** of auth+student app (login,
  learn, practice, exam, tutor, progress, achievements…). Two apps in one.
- `app/atlas`, `atlas-v2`, `lumen`, `world`, `my-world`, `organism`,
  `3d-lab`, `play`, `showcase`, `sim-test`, `game-test`, `riv-test`,
  `dragon-inspect`, `topic-map`, `welcome`, `lesson`, `dashboard` —
  experiments/demos; some are large (lumen engine modified in this diff).
- `app/_archive/*` — dead pages kept in-tree.

---

## 4. Backend service map

`backend/routers/` (8 files, "v2" surface) vs `backend/api/` (18 files,
older surface). **Eight prefixes collide** — FastAPI registers
`routers/*` first, so the `api/*` versions of auth/content/assessment/
progress/achievements/graph/solver are shadowed where paths overlap.

| Prefix | routers/ | api/ | Status |
|---|---|---|---|
| /api/auth | auth.py | auth.py | COLLIDES |
| /api/content | content.py | content.py | COLLIDES |
| /api/assessment | assessment.py | assessment.py | COLLIDES |
| /api/progress | progress.py | progress.py | COLLIDES |
| /api/achievements | achievements.py | achievements.py | COLLIDES |
| /api/graph | graph.py | graph.py | COLLIDES |
| /api/solver | solver.py | solver.py | COLLIDES |
| /api/tutor | tutor.py | — | OK |
| /api/tutor/its | — | tutor.py | OK |
| /api/tutor-graph | — | competency_tutor.py | OK |
| /api/practice | — | practice.py | OK |
| /api/practice/deterministic | — | verified_practice.py | OK |
| /api/nodes | — | enhanced_nodes.py | OK |
| /api/intelligence | — | intelligence.py | OK |
| /api/teacher-analytics | — | teacher_analytics.py | OK |
| /api/analytics | — | analytics.py | OK (extended in this diff) |
| /api/accessibility | — | accessibility.py | OK |
| /api/homework | — | homework.py | **NOT mounted (broken imports)** |
| /api/student_sync | — | — | **imported but MISSING → boot fails** |

Deleted-in-working-tree (still in git index): dashboard, diagnostic, exam,
junior, mastery, nodes, quest, questions, sim, story, student_shim,
subskills, teacher, whatsapp (14 files). Frontend services that called
these (exam.service→/api/exams, junior.service, diagnostic.service,
exam.service→/api/students) are now dead ends.

`backend/services/` has ~130 files with heavy duplication:
answer_evaluator v1/v2/v3, socratic_pipeline v2/v3, tutor_service v1/v2,
routing_service v1/v2, progress_service v1/v2, plus ~25 `_gen_*` one-off
generators committed into the package.

---

## 5. Data layer

| Store | Role | Required? |
|---|---|---|
| Postgres | users, progress, content (sqlite fallback `backend_local.db` present) | soft-required |
| Neo4j | knowledge graph (`graph_sqlite_fallback` exists) | optional |
| Redis | cache/sessions | optional |
| Qdrant | embeddings/RAG | optional |
| ClickHouse | analytics events (`_ch_query_json`, returns zeros when down) | optional |
| Langfuse | LLM tracing | optional |
| Local JSON/content | `components/sims_v2` (108 MB), `public/data`, `markerParser` enrichment, `content/`, `refs/` (73), `cbse_data` (22k files), `ncert_books` (1.1k), `parsed_output` (3.3k), `organized` (9.7k) | frontend-primary |

Health endpoint reports all five stores; the app is designed to degrade
to sqlite/in-memory.

---

## 6. What the last agent actually changed (the real diff)

- **Deleted** 14 `backend/api/*.py` routers (dashboard, diagnostic, exam,
  junior, mastery, nodes, quest, questions, sim, story, student_shim,
  subskills, teacher, whatsapp).
- **Rewired** `routers/__init__.py` + `main.py`: `student_router` +
  `sync_router` → `student_sync_router` — but never created
  `api/student_sync.py` → **ImportError, backend dead**.
- **Extended** `api/analytics.py` (~190 lines: events, mastery-distribution
  aggregates matching `analytics.service.ts` shapes, ClickHouse-backed with
  zero-fill fallback — reasonable work).
- **Modified** ~100+ `components/sims_v2/class6-8` sim defs, lumen engine
  files, `learn/[topicId]`, `my-world`.
- Left `its/tests/test_enhanced_nodes.py` importing a deleted module.

---

## 7. Fix order to reach "full-stack ready"

1. **Boot blocker** — create `backend/api/student_sync.py` (port the
   deleted `student_shim.py` from git: `git show HEAD:backend/api/student_shim.py`)
   or revert the import to `student_shim`. 30-min fix.
2. **Decide the router surface** — keep ONE implementation per prefix
   (`routers/` looks newer; the `api/` duplicates are shadowed anyway —
   either delete them or make the split intentional).
3. **Kill or wire dead frontend services** — exam.service (`/api/exams`),
   socratic.service (`/api/socratic`), homework.service (`/api/homework`),
   diagnostic/junior/teacher services. Either mount ported routers or
   strip the pages to honest "coming soon".
4. **lib/api legacy paths** — `/nodes`, `/questions`, `/mastery`, `/sim`,
   `/story`, `/dashboard` calls match the deleted v1 routers; repoint to
   `/api/*` equivalents or restore the modules.
5. **Deploy** — `next.config` rewrite hardcodes `localhost:8001`; use env
   var; confirm nginx `/api` split in `docker-compose.prod.yml`.
6. **Prune the page surface** — pick ONE app shell (premium/* vs (student)/*
   duplicates), archive experiments under `app/_archive` or a feature flag.
7. **Services cleanup** — pick winner per duplicated service version;
   move `_gen_*` scripts out of `services/`.

## 8. Repo hygiene (this session)

- All untracked scratch files moved to `_trash/` (reversible — nothing
  deleted). `cbse_data/` stayed at root (locked by a running process).
- Root still holds ~40 committed report/scratchpad `.md` files — move to
  `docs/` or `_trash/` when convenient.
