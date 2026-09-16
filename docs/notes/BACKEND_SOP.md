# Prism Platform — Backend SOP & Troubleshooting Guide

**Version:** 2.0 | **Last updated:** 2026-09-01
**Purpose:** How to read, run, debug, and fix this backend. Read this before touching anything.

---

## 1. What This System Is

Two repos, one platform. **Know the difference:**

| Repo | Role | What lives there |
|------|------|------------------|
| `D:\dream_app` | **The App** (what you launch) | Frontend (Next.js), slim backend (auth, tutor, progress, exams), user-facing services |
| `D:\platform` | **The Engine Room** | Solver infrastructure (117 services), content data (`cbse_data/`), all `ai/` solvers, test suites, generators |

**Key relationship:** `backend/ai/` folders in both repos are byte-identical (60 files, synced). Do not edit one without copying to the other. `backend/services/` diverges BY DESIGN — dream has app services, platform has engine services.

**The unified entry point:** `D:\platform\backend\solver_facade.py` — ALL solving goes through it. Never call a solver directly.

---

## 2. Architecture (30-Second Version)

```
Frontend (dream_app)
    │  /api/solver/v2/* (one router)
    ▼
SolverFacade (platform/backend/solver_facade.py)
    │  registry + circuit breakers + fallback chain
    ├─► pattern_solver     (priority 10 — instant patterns)
    ├─► step_chainer       (priority 20 — structured SymPy math)
    ├─► solver_v2          (priority 30 — physics/chem/accounts)
    ├─► jee_neet_solver    (priority 40 — decomposition)
    └─► solver_router      (priority 90 — full pipeline, LLM last)
    │
    ▼  all normalized to
Contracts (platform/backend/contracts.py)
    │  SolutionResult — 21 fields, every solver returns THIS
    ▼
Intelligence Bus (services/intelligence_bus.py)
    │  events → state → remediation/gap queries
    ▼
Hint Ladder (services/hint_ladder.py)
       4 rungs: nudge (free) → formula (-5XP) → worked (-10XP) → solution (-20XP)
```

**Invariants — never break these:**
1. The facade NEVER raises. Errors are data (`result.success=False`, `result.error`).
2. Every solve returns `SolutionResult` — 21 fields, same shape everywhere.
3. All `class_level` values are STRINGS (`"1_5"`, `"6"`, `"12"`). Never ints.
4. Solver success ≠ student success. Two different events (`solve_attempt` vs `student_answer`).
5. A broken intelligence subscriber never breaks the solve path (failures isolated in the bus).

---

## 3. Running Everything

```bash
# Databases (Postgres, Redis, Neo4j, Qdrant)
cd D:\dream_app && docker compose up -d postgres redis neo4j qdrant

# Backend (the app)
start_backend.bat
# or: python -m backend.init_db && python -m uvicorn backend.main:app --reload --port 8000

# Frontend
start_frontend.bat
# or: cd frontend && npm run dev

# Health checks
curl http://localhost:8000/health
curl http://localhost:8000/api/solver/v2/health   # circuit breaker states
```

**URLs:** Frontend http://localhost:3000 | API http://localhost:8000 | Docs http://localhost:8000/docs
**Demo login:** demo@dreamapp.in / demo123

---

## 4. The Test Suite (run these after ANY change)

```bash
cd D:\platform\backend

python test_jee_advanced.py        # 8 JEE problems        — MUST be ALL PASS
python test_notorious_problems.py  # 12 tricky problems   — MUST be ALL PASS
python test_neet.py                # 13 NEET problems     — MUST be ALL PASS
python test_breaking.py            # malformed/NaN/Inf    — MUST be ALL PASS (7)
python test_property.py 3          # 552 property solves  — 0 crashes, 0 nondeterminism
```

**TypeScript check (frontend):**
```bash
cd D:\dream_app\frontend
npx tsc --noEmit    # core app must show 0 errors
# (simulation components have known errors — that's generated content, not app code)
```

---

## 5. Troubleshooting — Symptom → Fix

### 5.1 "No module named 'backend'"
**Cause:** Wrong working directory or path.
**Fix:** Run from `D:\platform` (not `D:\platform\backend`), or ensure the script has:
```python
sys.path.insert(0, r"D:\platform")          # for backend.* imports
sys.path.insert(0, r"D:\platform\backend")  # for direct imports
```

### 5.2 "attempted relative import with no known parent package"
**Cause:** A module uses `from .x import y` but was run directly.
**Fix:** Import it as a package member (`from backend.ai.x import y`) or add the dual-import fallback like `solver_router.py` has.

### 5.3 Solver returns `success=False, error="circuit open"`
**Cause:** A backend failed 3× consecutively → circuit breaker tripped (60s cooldown).
**Fix:** Wait 60s, or check `GET /api/solver/v2/health` to see which backend tripped. If it keeps tripping, the backend has a real bug — check Section 5.8.

### 5.4 Solve is slow (> 5 seconds)
**Cause:** SymPy pathological expression (e.g. `x**1000`, huge strings), or cold cache.
**Fix:**
- Check `solver_path` in the result — see which backends were tried.
- The solution cache (`services/solution_cache.py`) makes repeat solves instant. First solve is compute.
- If a specific step type is always slow, add its inputs to the timeout guard in `solver_engine.py`.

### 5.5 Empty response from Claude API
**Cause:** `max_tokens` too low — the model spends the entire budget on thinking, returns no text.
**Fix:** Use `max_tokens=64000+` for content generation, `128000` for large batches. See `_gen_hindi_cisce.py` for the working pattern.

### 5.6 `TypeError: '<' not supported between instances of 'int' and 'str'`
**Cause:** Mixed class_level types (`"1_5"` string vs `6` int) being sorted.
**Fix:** ALWAYS use `key=str` when sorting class levels: `sorted(classes, key=str)`. All new code must treat class_level as a string.

### 5.7 Intelligence shows 0% error rate but students are failing
**Cause:** Conflating solver success with student success (the classic bug).
**Fix:** Student outcomes must emit `student_answer` events (`emit_student_answer()`), NOT reuse solve events. Solver events only track usage/time.

### 5.8 A solver backend is broken (how to find and fix)
1. `GET /api/solver/v2/health` → find the tripped backend.
2. Look at its adapter in `solver_facade.py` (each adapter has the backend_id).
3. Run that backend directly to reproduce:
   ```python
   from backend.ai.step_chainer import StepChainer
   chainer = StepChainer(timeout=15)
   exec = chainer.solve_single_step('differentiate_at_point', {'expression': 'x**2', 'var': 'x', 'point': '1'})
   print(exec.result)
   ```
4. Fix the underlying module (in `ai/` — remember to sync BOTH repos).
5. Re-run `python test_property.py 1` for a quick check, then the full suite.

### 5.9 Frontend type errors after backend changes
**Cause:** Contract drift — frontend types no longer match backend responses.
**Fix:** Regenerate TypeScript from the canonical contracts:
```bash
cd D:\platform\backend
python contracts.py --export-ts > D:\dream_app\frontend\types\solver-contracts.d.ts
```
Never hand-edit `solver-contracts.d.ts`.

### 5.10 PostgreSQL not running / tables missing
**Cause:** Docker not started, or intelligence tables not created.
**Fix:**
```bash
docker compose up -d postgres
python -m backend.init_db   # creates all 44 tables including 11 intelligence tables
```
The 11 intelligence tables (`enrichment_node`, `interaction_outcome`, `misconception`, etc.) are registered in `backend/models/__init__.py` via `services/intelligence_schema.py`.

---

## 6. Data Map (where everything lives)

```
D:\platform\
├── cbse_data\
│   ├── nodes\by_subject\        # knowledge graph nodes (all boards/subjects)
│   ├── enrichment\              # enrichment markers (hindi_cisce_c*.marker etc.)
│   ├── hindi_cisce\             # CISCE Hindi: syllabus, summary, topics\
│   ├── synthetic_students\      # generated personas + interactions
│   ├── intelligence_updates\    # self-evolving loop output + events.jsonl
│   └── solution_cache\          # cached solutions (solutions.jsonl)
├── hindi\                       # CBSE Hindi source (English content)
├── hindi_devanagari\            # converted to pure Devanagari (in progress)
└── backend\
    ├── contracts.py             # THE canonical models — single source of truth
    ├── solver_facade.py         # THE unified solver entry point
    ├── ai\                      # 60 solver modules (SYNCED with dream_app)
    ├── services\                # 130 services (engine + app)
    ├── solvers\                 # 150+ subject-specific solvers
    ├── routers\                 # API routers (solver.py has /v2/* unified)
    └── test_*.py                # the test suite
```

**NEVER run scripts that modify existing data files.** Generation scripts must only write NEW files in NEW locations. This is a hard rule.

---

## 7. Key Files (what each one does)

| File | Role |
|------|------|
| `contracts.py` | Canonical Pydantic models. Every API response shape. `--export-ts` generates frontend types. |
| `solver_facade.py` | ONE entry point for all solving. Registry, circuit breakers, fallback chain. Never raises. |
| `services/hint_ladder.py` | 4-rung progressive hints with misconception detection + XP costs. |
| `services/intelligence_bus.py` | Event bus + state. Closes the learning loop. Powers `/v2/intelligence`. |
| `services/solution_cache.py` | Two-layer solution cache (memory + JSONL disk). |
| `services/synthetic_student.py` | Generates student personas for self-play. |
| `services/self_evolving_loop.py` | Analyzes interactions → strategy updates, misconceptions, gaps. |
| `ai/step_chainer.py` | Structured math solving (SymPy) with step chaining. |
| `ai/problem_types.py` | 183 problem type definitions. |
| `ai/step_types.py` | 184 step type definitions (universal math operations). |
| `routers/solver.py` | All solver endpoints. `/v2/*` are unified; legacy delegate to the facade. |

---

## 8. The v2 API (the official interface)

| Endpoint | What it does |
|----------|-------------|
| `POST /api/solver/v2/solve/step` | Solve one structured step → `SolutionResult` |
| `POST /api/solver/v2/solve/problem` | Solve multi-step problem → `SolutionResult` |
| `POST /api/solver/v2/solve/free-text` | Free text with full fallback chain → `SolutionResult` |
| `POST /api/solver/v2/identify` | Question → category + form fields → `IdentifyResult` |
| `POST /api/solver/v2/hint` | Wrong answer → next hint rung (misconception-aware) |
| `POST /api/solver/v2/show-another` | Same problem, new numbers (infinite practice) |
| `GET /api/solver/v2/problem-types` | Problem type catalog |
| `GET /api/solver/v2/health` | Backend + circuit breaker states |
| `GET /api/solver/v2/intelligence` | Live concept gaps + top misconceptions |
| `GET /api/solver/v2/intelligence/remediation/{id}` | What to teach this student next |

Legacy endpoints (`/solve/step`, `/solve/problem`, `/identify`, `/final/*`) still work — they delegate to the same facade.

---

## 9. Adding a New Solver Backend

1. Create an adapter class in `solver_facade.py`:
```python
@register
class MyBackend(SolverBackend):
    backend_id = "my_solver"
    tier = SolverTier.DETERMINISTIC
    priority = 25  # between step_chainer(20) and solver_v2(30)
    subjects = {"maths"}  # empty = all subjects

    def solve_step(self, step_type_id, inputs) -> SolutionResult:
        # ... your logic ...
        # MUST return SolutionResult — never raise
```
2. The `@register` decorator adds it to the chain automatically.
3. Run `python test_property.py 1` — your backend must not break any property.
4. Done. The facade handles fallback, circuit breaking, and events.

---

## 10. Launch Checklist

Before launch, ALL of these must pass:

- [ ] `python test_jee_advanced.py` → ALL PASS
- [ ] `python test_notorious_problems.py` → ALL PASS
- [ ] `python test_neet.py` → ALL PASS
- [ ] `python test_breaking.py` → ALL PASS
- [ ] `python test_property.py 3` → 0 crashes, 0 nondeterminism, 0 timeouts
- [ ] `npx tsc --noEmit` (frontend) → 0 core errors
- [ ] `GET /health` → 200
- [ ] `GET /api/solver/v2/health` → all backends, no circuits open
- [ ] Postgres running, `python -m backend.init_db` completed (44 tables)
- [ ] Content data present (`cbse_data/nodes/`, `cbse_data/enrichment/`)
- [ ] Demo login works (demo@dreamapp.in / demo123)
- [ ] One end-to-end solve: identify → form → solve → hint → show-another

---

## 11. If You're Stuck

1. Re-read Section 5 (Symptom → Fix).
2. Run the test suite — failures name the exact module.
3. `GET /api/solver/v2/health` shows which backend is unhealthy.
4. The `solver_path` field in any result shows which backends were tried.
5. `services/intelligence_bus.py` events log: `cbse_data/intelligence_updates/events.jsonl`.
6. Still stuck after 3 attempts on one file? Send the error to FableCoder MCP for resolution.

---

## 12. Scalability & Capacity

### Capacity (measured math, not vibes)

| Setup | Concurrent active students | Bottleneck |
|---|---|---|
| Dev (1 uvicorn worker) | ~300-500 | SymPy CPU, 1 core |
| Production (4-8 workers) | ~2,000-5,000 | GIL (threads unblock loop, don't parallelize SymPy) |
| + process-pool + Redis + N boxes | 10,000+ | Budget |

Basis: cold solve ~500ms CPU → 1 core ≈ 7k solves/hr; students ~15 solves/hr at 25% duty cycle; cache hits multiply 2-5x.

### The two rules that keep it scalable

1. **CPU-bound endpoints are plain `def`, never `async def`.**
   FastAPI runs plain `def` endpoints in a thread pool → SymPy never
   blocks the event loop → one slow solve never stalls other requests.
   (Measured: 6 parallel solves = 0.26s vs 1.32s sequential, same answers.)
   If you add a solve endpoint, make it `def`.

2. **Intelligence state persists to DB, replays on startup.**
   `services/intelligence_persistence.py` writes events to the
   InteractionOutcome/Misconception tables and every worker replays
   the same rows at startup → all workers share one state (fixes the
   per-process split bug). DB down = graceful in-memory degradation.

### Remaining scale work (in priority order)

1. ~~Process-pool solver~~ **DONE** — see adaptive routing below.
2. Redis-backed solution cache — replaces per-process memory layer for multi-instance.
3. Load test (locust) — find the real wall, tune `DB_POOL_SIZE` / thread pool.
4. Read replicas for content browsing traffic.

### Adaptive solve routing (measured, not guessed)

`services/process_solver_pool.py` routes each cache-miss solve by its
MEASURED cost (rolling EMA per step type):

| Solve weight | Route | Why |
|---|---|---|
| Light (EMA < 400ms) | in-thread | IPC/pickling overhead beats compute — pool measured SLOWER for light solves |
| Heavy (EMA > 400ms) | process pool | N-core parallelism, GIL bypassed |

First solve of any type runs in-thread and gets timed; heavy types
graduate to the pool automatically. `GET /api/solver/v2/health` shows
live routing counts and which types are heavy.

Stuck-worker safety: a hung pool worker can't be interrupted, so 3
consecutive timeouts kill and recreate the whole pool; after 2 failed
restarts the app falls back to in-thread permanently (degraded
parallelism, never downtime).

**Test-suite note:** run the test files individually — combined runs
can exceed output/timeout windows (test_breaking's random-input test
alone runs ~178s) and produce truncated/misleading verdicts.

---

## 13. Database Module Wiring (read before editing DB code)

There are TWO database files — this trips everyone once:

| File | What it is |
|---|---|
| `backend/database.py` | The REAL models — 44 tables (loaded as `_database_flat`) |
| `backend/database/__init__.py` | Package that creates the engine, then re-exports `_database_flat`'s Base/models |

`backend.database.Base` resolves to the **flat file's Base** (the package overrides it). All models — including the 11 intelligence tables — attach to THAT Base. If you add a model, put it in `database.py` and re-export it in `database/__init__.py` if routers need it.

Sync vs async:
- **Request path**: async engine (`asyncpg`) via `async_session`.
- **Background writers** (intelligence persistence): `get_sync_engine()` (psycopg2, lazy, small pool). Never use it on the request hot path.
