# FILE_MAP.md — Everything the App Needs, and What Is / Isn't Mounted

Generated 2026-09-15. Companion to BUILD_STATUS.md. Use this to segregate
"must ship" from "dormant" from "trash".

---

## 1. RUNTIME WIRING (what actually serves traffic right now)

```
Browser ──► Next.js frontend  :3000  (frontend/)
              │  next.config.js rewrite: /api/* → http://localhost:8001/api/*
              ▼
           FastAPI backend    :8001  (backend/main.py — started via backend/run_local.bat, SQLite mode)
                                    │
                                    ├── Neo4j   :7687  (Docker container neo4j-atlas — knowledge graph)
                                    ├── Redis   :6379  (Docker)
                                    ├── Qdrant  :6333  (Docker, optional)
                                    └── SQLite  D:/platform/backend_local.db  (run_local mode;
                                        Postgres only if PLATFORM_DATABASE_URL set — see .env)
```

- Frontend API client: `frontend/lib/api.ts` (API_BASE = `NEXT_PUBLIC_API_URL` or `http://localhost:8001`).
- Next.js also serves some /api routes ITSELF from `frontend/app/api/`:
  - `frontend/app/api/c68/nodes/route.ts` (class 6–8 node fallback data)
  - `frontend/app/api/local/enrichment/route.ts`, `frontend/app/api/local/tutor/route.ts`
  - `frontend/app/api/public/*` (solver-demo, flashcard, search, topics)
  - `frontend/app/api/tts/route.ts`
- ⚠ `start_backend.bat` is STALE: it targets `D:\dream_app` (different checkout) on port **8000**.
  The real entry is `backend/run_local.bat` → port **8001**. Deploy equivalent: `deploy/start_backend_prod.bat`.

## 2. BACKEND — MOUNTED vs UNMOUNTED

`backend/main.py` mounts exactly 15 routers (via `backend/routers/__init__.py`):

| Prefix | Source file |
|---|---|
| /api/auth | backend/routers/auth.py |
| /api/content | backend/routers/content.py |
| /api/assessment | backend/routers/assessment.py |
| /api/tutor | backend/routers/tutor.py |
| /api/progress | backend/routers/progress.py |
| /api/achievements | backend/routers/achievements.py |
| /api/graph | backend/routers/graph.py |
| /api/solver | backend/routers/solver.py |
| /api/practice/deterministic | backend/api/verified_practice.py |
| /api/tutor-graph | backend/api/competency_tutor.py |
| /api/practice | backend/api/practice.py |
| /api/nodes | backend/api/enhanced_nodes.py |
| /api/intelligence | backend/api/intelligence.py |
| /api/tutor/its | backend/api/tutor.py |
| /api/teacher-analytics | backend/api/teacher_analytics.py |

### UNMOUNTED routers (exist on disk, NOT importable by the running app — 404 if called)
None of these are imported by anything mounted (verified by grep). All orphaned:

| File | Prefix | Status |
|---|---|---|
| backend/api/nodes.py | /api/nodes | SHADOWED — same prefix as enhanced_nodes.py; old version |
| backend/api/analytics.py | /api/analytics | **BROKEN CONTRACT — frontend calls it (see §4)** |
| backend/api/homework.py | /api/homework | **BROKEN CONTRACT — frontend calls it (see §4)** |
| backend/api/exam.py | /api/exam | frontend exam.service calls /api/student/* instead — mismatch |
| backend/api/junior.py | /api/junior | dormant (junior classes content is frontend-bundled) |
| backend/api/mastery.py | /api/mastery | dormant — mastery flows through /api/progress + BKT store |
| backend/api/quest.py | /api/quest | dormant |
| backend/api/questions.py | /api/questions | dormant |
| backend/api/sim.py | /api/sim | dormant — sims are frontend-bundled (sims_v2) |
| backend/api/story.py | /api/story | dormant |
| backend/api/subskills.py | /api/subskills | dormant |
| backend/api/accessibility.py | /api/accessibility | frontend calls /api/student/a11y-prefs — mismatch |
| backend/api/dashboard.py | /api/dashboard | dormant (teacher dashboard uses teacher-analytics) |
| backend/api/diagnostic.py | /api/diagnostic | dormant |
| backend/api/teacher.py | (no prefix) | dormant — superseded by teacher_analytics |
| backend/api/whatsapp.py | /whatsapp | dormant webhook |

## 3. DATA / CONTENT STORES (what the app reads and writes)

### Backend runtime stores
- `cbse_data/question_bank.db` — **THE question bank** (40 MB SQLite). Read at runtime by the
  mounted `/api/practice/deterministic` router (verified_practice.py) and solver modules
  (adoption.py, answer_pipeline.py, form_compiler.py, ms_compiler.py). DO NOT ARCHIVE.
- `parsed_output/enrichment.jsonl` — node enrichment served by `/api/content/nodes/<id>/enrichment`
  (read at runtime by graph_service / tutor_service / solver_pipeline).
- `backend/ai/` — **AI solver stack, runtime**: llm_client, key_pool, deepseek_router, solvers,
  evaluator chain + vector caches `_question_embeddings.npy`, `_pattern_embeddings.npy`,
  `_question_bank_cache.json` (9 MB), `_question_index.json` (3 MB). Imported by mounted
  routers/solver.py + tutor_service, drill_service, solver_pipeline, spiral_service.
  ⚠ `deploy/backend/ai/` holds a STALE COPY of the caches — sync or delete to avoid drift.
- `backend/solvers/` + `backend/solvers_regen/` — per-subject solver packages
  (acc, appmath, bio, english, evs, geo, hindi, histciv, …). Runtime.
- `organized/` — ⚠ **RUNTIME lesson content, not build-time** (v1 of this map was wrong):
  `backend/services/content_service.py` serves `/api/content/nodes/<id>` and `/content`
  from `ORGANIZED_CONTENT_DIR` (default `D:\platform\organized`), reading
  `organized/<subject>/classN/content_nodes/<node_id>.md`. DO NOT ARCHIVE.
- `backend/_cache/tutor_students.json` — **BKT mastery persistence** (all student state; atomic .tmp write)
- `backend/_cache/enhanced_nodes_index.json` — node index used by graph loader + nodes API
- `backend/_cache/spiral_review.json`, `band_11_12_*.json` — spiral review + repair logs
- `backend/its/competency/` — **1,247 JSON files**: per-chapter catalogs (curiosity engines),
  NODE_GRAPH_VALIDATION.json, CLASS6..12_NODE_DEPTH.json, SIM_NODE_MAP.json,
  GENERATED_INDEX.json, REF_REPAIR_LOG.json, REVIEW_NEEDED.json (216 authoring queue)
- `backend/its/questions/generated/` — generated catalogs + `mcq_humanities.json`
  (**the 8,570-entry MCQ distractor store** consulted by tutor.py at pool-load)
- `backend/its/solver/formula_graph.json` — formula dependency graph
- `backend/tutor_brain/tutor_brain.json` — tutor brain KB
- `backend/formulas/{biology,chemistry,physics,mathematics,cisce}` — formula banks
- `backend/implicit_rules/{chemistry,mathematics,physics}` — implicit-solve rules
- Drill generators (maths 572,547 variants / numericals 12,807) are CODE-SEEDED —
  `backend/its/solver/maths_drill_gen.py`, `numericals_drill_gen.py` — no data files needed.
- Backend source packages: `backend/its/{agents,tutoring,solver,competency,questions,routing,retrieval,
  diagnosis,engagement,evolution,formula_graph,orator,parsing,tests}`

### Graph (Neo4j)
- Loader: `backend/tools/load_graph_neo4j.py`
- ⚠ **SOURCE OF NODE CONTENT LIVES OUTSIDE THE REPO:**
  `C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache` (MD_DIR in the loader).
  Copy/move this into the repo if you segregate machines — the graph can't be rebuilt without it.
- `content/enhanced_nodes_md/`, `content/nodes/`, `content/index/` — in-repo node content copies
  (used by content APIs / enhanced_nodes_md rendering)

### Frontend data
- `frontend/components/sims_v2/` — SIM_INDEX.json (3,018 entries), NODE_GRAPH.json,
  SIM_NODE_MAP_V2.json, LEGACY_SIM_MAP.json, SIMS_V2_QUALITY.json,
  `class1..class12/` authored sims, `generated/` (85 gen_*.ts SimDef files + loaders.ts),
  `engine/`
- `frontend/data/sim_to_cbse_node_mapping.json`, `frontend/data/games/`
- `frontend/lib/` — api.ts, bkt.ts, masteryStore.ts, offlineCache.ts, topicGraph.ts, realContent.ts, etc.
- `frontend/messages/` + `frontend/i18n/` — translations (next-intl)
- `frontend/public/` — PWA assets (manifest, sw.js, rive, kenney/emoji/lottie assets)

### Doodle cards (9,010 PNGs)
- `content/doodle_cards/class6..class12/*.png` + per-class `classN_index.json`
  + `doodle_content_classN.json` (extracted node content backing the cards)
- ⚠ **Not reachable by the web app**: they sit outside `frontend/public/`, and
  `frontend/components/doodle/DoodleCard.tsx` currently has ZERO imports — no page shows cards yet.
  Either move to `frontend/public/doodle_cards/` or serve via an API route + wire DoodleCard into pages.
- Pipeline (regeneration): `backend/tools/build_doodle_content.py` →
  `frontend/components/doodle/DoodleCard.tsx` / `doodle_card_template.html` →
  `frontend/scripts/export_doodle_cards.mjs` (Playwright)

### Source corpora (build-time only — NOT needed at runtime)
- `cbse_data/nodes/by_class/split/` — canonical 21,518-node dataset (93 files, per DATA_INVENTORY.md);
  source of truth for pipelines/graph rebuilds. Keep, but not needed to serve.
- `cbse_data/` rest — raw CBSE textbook corpus (huge); includes `question_bank.db` (runtime, see §3)
  and `cross_board/mappings/subject_corrections.json` (pipeline refs).
- `ncert_books/`, `refs/`, `hindi/`, `hindi_devanagari/` — downloads & language sources
- `parsed_output/` — pipeline outputs; `enrichment.jsonl` is RUNTIME (see §3), rest build-time
- `competency_pipeline/`, `pipeline_output/`, `cbse_coverage_output*/` — pipeline outputs
- `content/index/v2/question_bank_c6_12.json` (34 MB) — **NO live reader found** in backend or
  frontend code; appears to be a legacy/derived duplicate of question_bank.db. Verify, then archive.
- `content/index/content_index.json`, `node_index.json`, `graph.json` — referenced only by
  archived tooling today; frontend content calls go through the backend instead. Verify, then archive.

### Config / infra
- `.env` (keys: NEO4J_*, GEMINI_API_KEY, GEMINI_MODEL, DEEPSEEK_*, GLM_*, REDIS_URL, …),
  `.env.example`, `.env.local`, `.env.template`
- `docker-compose.yml` / `docker-compose.prod.yml`, `Dockerfile.backend`, `Dockerfile.frontend`,
  `nginx.conf`, `deploy/` (README, build_frontend.bat, start_backend_prod.bat),
  `.github/workflows/ci.yml`
- `alembic.ini` + `backend/init_db.py` — DB migrations/init
- Scratch/state docs at repo root: BUILD_STATUS.md, STRUGGLE_MAP.md, FILE_MAP.md (this file), etc.

## 4. REAL BREAKS FOUND BY THIS AUDIT (frontend → 404s)

These frontend calls have NO mounted backend handler today:
1. `frontend/services/analytics.service.ts` → `/api/analytics/events|llm-costs|misconceptions|socratic-stats`
   — fix: mount `backend/api/analytics.py` in main.py.
2. `frontend/app/(student)/homework/page.tsx` → `/api/homework/*`
   — fix: mount `backend/api/homework.py`.
3. `AccessibilityProvider` + onboarding → `/api/student/a11y-prefs`, `/api/student/onboarding`
   — backend has `/api/accessibility` (different prefix); needs a shim or remount.
4. `frontend/lib/offlineCache.ts` → `/api/sync/<store>` — no handler anywhere.
5. exam.service expects `/api/student/exams...` but exam.py serves `/api/exam/...`.

Everything else the frontend calls IS mounted and live (auth, content, graph, progress,
achievements, practice, practice/deterministic, solver, tutor, tutor-graph/*, teacher-analytics).

## 5. SEGREGATION CHEAT-SHEET

**Must ship (runtime):** backend/ (minus _archive), frontend/ (minus node_modules/.next),
**cbse_data/question_bank.db**, **parsed_output/enrichment.jsonl**, **organized/** (lesson content),
content/doodle_cards (once wired), content/nodes+index+enhanced_nodes_md, backend_local.db OR Postgres,
.env, docker-compose + Dockerfiles, deploy/ (but delete the stale deploy/backend/ai cache copies),
.github/workflows/ci.yml.

**Must keep to rebuild the graph:** C:/Users/Alesha4285/Desktop/enhanced_nodes/md_cache ⚠,
cbse_data/nodes/by_class/split/ (canonical 21,518 nodes),
backend/tools/load_graph_neo4j.py, backend/its/competency/, frontend/components/sims_v2/*MAP*.json.

**Build-time only (can archive to cold storage):** cbse_data/ EXCEPT question_bank.db,
ncert_books/, refs/, hindi*/, parsed_output/ EXCEPT enrichment.jsonl, pipeline_output/,
cbse_coverage_output*/, competency_pipeline/, *_drafts*, _qbank_gen, _redteam, redteam_*,
organized/* EXCEPT the content_nodes trees served by content_service (verify before archiving any subject).

**Orphaned code (delete or park behind a decision):** the 16 unmounted api files in §2 —
except analytics.py + homework.py (fix the contract and mount), accessibility.py (remount under
/api/student or shim), exam.py (align prefix with exam.service).

**Known stale trash:** start_backend.bat (points at D:\dream_app), root-level *_tmp*, logs
(*.log), screenshots/, gen_batch*.py one-offs, platform_backend.py (duplicate entry?),
backend/_uvicorn_restart_*.log.
