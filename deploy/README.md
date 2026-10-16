# deploy/ — production bundle

Everything the running app needs, nothing else. Upload this folder to the
server and run compose.

## What's inside

| Path | Purpose |
|---|---|
| `backend/` | FastAPI app — routers, api (mounted), services, models, schemas, `its/` (tutor/solver/competency/questions), `ai/`, `solvers/`, `tutor_brain/`, `formulas/`, `implicit_rules/`, `_cache/` (tutor_students.json) |
| `frontend/` | Next.js source — app/, components/ (incl. sims_v2 + world), lib/, stores/, services/, i18n/, messages/, public/, data/, configs |
| `content/` | `enhanced_nodes_md/` (13,487 files — full sync with repo corpus incl. 89 new grammar/composition nodes for classes 6–12), `nodes/`, `index/` |
| `cbse_data/` | empty runtime dir — `INTERACTIONS_PATH` + intelligence-bus `events.jsonl` write here |
| `tools/` | `load_graph_neo4j.py` (rebuild Neo4j from `content/enhanced_nodes_md`), `build_doodle_content.py` |
| `Dockerfile.backend` | `gunicorn backend.main:app` |
| `Dockerfile.frontend` | deps → build → standalone runner (needs `output:'standalone'`, set in next.config.js) |
| `docker-compose.yml` | base infra: postgres, neo4j, redis, qdrant, clickhouse, langfuse |
| `docker-compose.prod.yml` | full stack + db-init + 2×backend + frontend + nginx |
| `nginx.conf` | LB on :80 — `/api/*` → backend pool, `/` → frontend |
| `alembic.ini` | migrations |
| `.env.production.example` | fill → `.env.production` on the server |

## Deliberately excluded

- `__pycache__/`, `tests/`, `scripts/`, `.pytest_cache` — dev-only
- `content/doodle_cards/` (4.8G) — 9,010 PNGs, **not wired into any page yet**
  (`DoodleCard.tsx` has zero imports). Add when the feature ships.
- Source corpora (`cbse_data/` raw, `organized/`, `ncert_books/`, `hindi*/`,
  `parsed_output/`, `pipeline_output/`) — build-time only
- Orphaned unmounted `api/*.py` files (achievements, auth, exam, nodes,
  sim, story, whatsapp, etc.) — superseded by `routers/` equivalents,
  kept in the repo as dead surface
- Any `.env` with real values — secrets never ship; fill `.env.production`
  on the server

## Sims

37 hand-authored grammar/composition `SimDef` files live under
`components/sims_v2/classN/v3w/` (gram_*, comp_*) — registered in each
class's `v3w_index.ts`. All `tsc --strict` clean. Node IDs resolve to the
`content/enhanced_nodes_md` corpus (c6–c12 `gram`/`comp` subjects).

## Run

```bash
cp .env.production.example .env.production   # fill secrets
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
docker compose -f docker-compose.prod.yml logs -f db-init backend-1
```

`db-init` creates all tables + seeds achievements, then exits. Both backends
wait for it. Nginx serves :80 — frontend on `/`, API on `/api/*`.

## Fixed since last review

- All 24 dead solver files now satisfy the registry contract (`SOLVER_REGISTRY`
  + `NODE_MAP` or complete regen versions). Boot no longer logs
  "no SOLVER_REGISTRY" warnings.
- `chem/class1_chem_solver._parse` rewritten — section toggles were eaten by
  the node regex; FIB/matching/TF/mcq/short_answer now grade correctly.
- `api/practice.py submit_answer` now emits `student_answer` + `hint_request`
  to the intelligence bus — remediation/misconception persistence fires on
  the real grading path, not just the interaction-log endpoint.
- `services/intelligence_bus.py` no longer hardcodes `D:\platform\cbse_data`
  — resolves `cbse_data/` relative to the bundle (or `DREAM_DATA` env).
- `services/teacher.service.ts` read `localStorage.authToken` — never set;
  now reads `token` → `auth_token` like every other service.
- Secrets removed: `.env.production` and `backend/.env` deleted; only
  `.example`/`.template` placeholders ship.

## Fixed since last review (round 2)

- **Homework mounted for real**: `Homework`/`HomeworkQuestion`/
  `HomeworkSubmission` models added to `database.py` (the legacy shim was
  re-exporting names that didn't exist); `api/homework.py` mounted —
  7 routes (`create`, `student/{id}`, `{id}`, `{id}/submit`,
  `{id}/result`, `overdue/{id}`, `{id}/reminder`). The student homework
  page now fetches the real list + submits to server-side grading;
  mock data remains only as the logged-out/offline fallback.
- **Dashboard mounted**: `api/dashboard.py` (student/parent/teacher
  endpoints) was written but never wired into the app. Now mounted; the
  parent-overview page fetches `/api/dashboard/parent/{id}` +
  `/api/dashboard/student/{child_id}` + `/api/homework/student/{id}`
  instead of pure hardcoded arrays.
- **Old database.py corruption fixed**: `Student.solver_executions` had
  stray relationship args (`"Homework","HomeworkQuestion",...` pasted in)
  that broke the whole model shim — every `from database import` router
  silently lost its models. Fixed, plus `SolverExecution.student` got its
  missing `back_populates`.
- **Boot ~10x faster**: `ai/deepseek_router.py` imported
  `sentence_transformers` (→ torch) at module level; moved inside the
  lazy `_get_embedder`. `import backend.main` went ~150s → ~13s.
- 3 null-byte dev scripts removed (`content_parsers/_pattern_*.py`),
  12 dead `.ts.raw` source dumps removed from `frontend/`.
- All fixes mirrored back into the main repo (`D:\platform\backend`,
  `D:\platform\frontend`).

## Fixed since last review (round 3 — structural)

- **Sim data left the webpack graph.** All 3,306 SimDefs emit to
  `frontend/public/sims/*.json` at prebuild (`scripts/emit-sim-json.js`)
  and are fetched at play time — ~80MB of generated object-literal
  TypeScript no longer compiled by webpack. `component:` refs serialize
  to `componentId` and resolve through the generated
  `sim_components.gen.ts` registry (next/dynamic). `next build` now
  completes on a default heap — it OOM'd at 4–12GB before.
- **Real auth exists now.** `/api/auth/send-otp`, `/verify-otp`,
  `/refresh` were called by the frontend but had NO mounted endpoints —
  the OTP service code existed, nothing routed it. Mounted on
  `routers/auth.py`; login/signup now issue refresh tokens and
  `/refresh` rotates them (refresh_tokens table). Parent endpoints:
  `/link-child` + `/my-children` via `parent_student_links`.
- **Tutor state → Postgres.** `tutor_students.json` (per-container,
  whole-file rewrite, multi-worker clobber risk) replaced by
  `tutor_student_states` rows via `services/tutor_store.DbTutorStore`
  — per-student upserts; legacy JSON imports once on first use;
  `FileTutorStore` remains for tests/DB-outage fallback.
- **deploy is a build output.** `scripts/sync-deploy.js` mirrors
  repo→deploy (`backend/`, `frontend/`, `content/`); run
  `node scripts/sync-deploy.js --check` for drift, plain to apply.
  Deploy-owned config (Dockerfiles, compose, README) is untouched.
- **Alembic works.** `backend/db/migrations/` (env.py + template)
  exists now — `alembic revision --autogenerate` verified against the
  live metadata. `init_db`'s create_all still covers new tables.
- **Identity bridge.** `services/identity_bridge.ensure_student_row` is
  the canonical users→students mirror used by homework + practice —
  one place owns the two-schema seam.
- Dead api duplicates (`api/{auth,assessment,content,graph,progress,
  achievements,solver}.py`) — superseded by `routers/` — moved to
  `backend/_archive/api_legacy/`; a deploy-only `api/teacher.py`
  preserved there too.
- `next.config.js`: `output:'standalone'` added (Dockerfile stage 3
  copies it — was silently broken) and rewrites now honour
  `INTERNAL_API_URL` build arg (compose sets backend-1:8000).

## Known wiring gaps (pre-launch)

- Sim mastery syncs via `POST /api/progress/sim-result` (BKT + bus) and
  `POST /api/progress/mastery/batch` hydrates the client on sim mount —
  localStorage remains the offline cache, server is authoritative.
- Parent dashboard / homework still render demo fallbacks when the API
  is unreachable or the user is logged out — intentional, so the page
  never shows a blank screen.
- `enhanced_nodes` index rebuilds on first boot (~80s over the 13k-file
  corpus) — the lifespan warms it in a background thread.
- Homework endpoints derive identity from `get_current_user` — done.
  Remaining hardening: teacher-facing class management (`api/teacher.py`
  in `_archive`) was never mounted; port deliberately if needed.
- OTP dispatch uses `MockWhatsAppSender` (prints to console) until a
  real WhatsApp/SMS provider is wired in `services/auth_service.py`.
