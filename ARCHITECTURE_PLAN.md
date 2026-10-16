# Atlas — Architecture & Segregation Plan (2026-10-02)

Mandate: clean up the codebase, segregate it properly, and build a harness so
the app **cannot crash on launch** and **performs under load**. This plan is
the contract. Every phase has acceptance criteria; nothing is "done" until
its criteria pass on production.

---

## 0. Where we are (measured facts)

| Fact | Evidence |
|---|---|
| FastAPI monolith, 309 routes, THREE API generations layered (`api/`, `routers/`, legacy `ai/` lanes) | route inventory |
| Deterministic engine (`its/solver/`) + legacy AI lanes (`ai/pattern_solver` 165 broad excepts, `TemplateEngine`, `ComputeEngine`) coexist; tutor already deterministic-first | fixed 2026-10-02 |
| 5 data stores (postgres, redis, neo4j, qdrant, clickhouse), 4 credential drifts this week | health audits |
| No worker tier: self-evolution loop, embed rebuilds, re-indexing run INSIDE request workers | main.py lifespan |
| Per-worker in-memory singletons (20k-node index ≈ 80s load, repertoire, caches) × 8 processes | gunicorn config |
| Launch safety was luck: one missing `Any` import crash-looped the fleet; only the healthcheck noticed | 2026-10-02 incident |
| No load baseline, no metrics, no alerting; neo4j outage found by an agent probe, not a page | audits |
| root/ vs deploy/ drift, 3 CI workflows, auth optional-by-default, 19 junk routes | owner survey + fixes |

What is SOLID and stays untouched: the truth engine's contract (fail-closed,
planted-gate 9/9), bank/node lanes, repertoire, content corpus (100% of honest
bars), the slim-image deploy path, /ready gating.

---

## PHASE A — LAUNCH HARNESS (crash-proof by construction)

**A1. `backend/harness/launch_check.py`** — one gate, run BEFORE gunicorn binds:
1. full `import backend.main` (catches every NameError/ImportError class)
2. route manifest: count + stable-hash of all registered routes vs committed
   `harness/routes_manifest.json` (unexpected loss/gain = fail)
3. dependency probes: postgres SELECT 1, redis PING, neo4j RETURN 1,
   qdrant /collections, each with 3s timeout
4. content gate: nodes index loads, node_count ≥ 19,000
5. solver self-test: the planted-attack suite (9 cases) must pass in-process
6. registers readiness components; exits non-zero with the failing step named

**A2. Wiring:** Dockerfile CMD becomes `python -m backend.harness.launch_check
&& gunicorn …`; compose healthcheck already gates on /ready; CI runs
launch_check on every build. A bad image can never serve — it fails fast,
loud, with the reason.

**A3. Route manifest committed + drift-gated** (extends the existing sync
gate): route surface changes become deliberate, reviewed diffs.

**A4. Import-boundary lint** (`harness/boundaries.py`, run in CI):
- `ai/legacy/*` may not import from `its/solver/*` or `services/*`
- `api/*`, `routers/*` reach the solver only via `services/solver_facade`
- no router imports another router's internals

Acceptance A: a deliberately broken build (bad import / missing dep / dropped
routes) fails launch_check locally, in CI, and never goes healthy in compose.

---

## PHASE B — LOAD HARNESS (performance is a measured guarantee)

**B1. `harness/loadgen/`** — asyncio generator, realistic student mix:
- 70% content GETs (learn/enrichment/diagram/doodle/sim assets)
- 15% solve POSTs (mix: numeric, bank-hit, prose)
- 10% tutor reply flow (authed session)
- 5% auth + progress writes
- ramp 1 → 50 concurrent, 10-min soak; per-endpoint p50/p95/p99 + error rate

**B2. Baseline on production, saved to `harness/load_baseline.json`.**

**B3. Tuning from evidence**, in order of suspicion: solve pool sizing vs
replica count, static asset cache headers (diagrams/doodles/sims are
immutable — hard-cache), gzip/brotli, uvicorn worker count vs 10GB memory cap,
warm-path coverage of top endpoints.

Acceptance B: at 50 concurrent — solve p95 < 800 ms, content p95 < 200 ms,
zero 5xx over the soak, no pool saturation events.

---

## PHASE C — SEGREGATION (one surface, quarantined legacy, deliberate auth)

**C1. One solve contract.** `POST /api/solve` with `mode: text|image|page|
voice`; the existing 7 solve-ish endpoints become thin deprecated shims
(308 + same response), then deleted after frontend migration. Frontend
updated in the same wave.

**C2. Legacy lane quarantine.** `ai/pattern_solver`, `template_engine`,
`ComputeEngine` prose paths, `orchestrator_steps` move under `ai/legacy/`
behind `ENABLE_LEGACY_AI=0` (default off). The tutor's deterministic-first
layer already replaced their role; the flag exists only for rollback.

**C3. Auth default-on.** Router-level dependency with an explicit PUBLIC
allowlist (health/ready/docs/auth/content-static). Every route now either
authed or on the reviewed list — kills the "123 unauthenticated" class
permanently.

**C4. Kill list.** 19 junk routes deleted (survey list + route-reference
audit), each with a frontend-coverage proof.

**C5. One routers tree.** `api/` + `routers/` merge into `routers/` grouped by
module; `main.py` shrinks to an app factory (~60 lines). No behaviour change —
route-for-route identical, verified by the A3 manifest.

Acceptance C: route count 309 → ≤ 200 with a green route-reference audit;
every endpoint authed-or-allowlisted; legacy lanes flagged off with zero
serving regressions (verify sweep).

---

## PHASE D — WORKER TIER + OPERATIONS

**D1. Worker container** (same image, different CMD): consumes a postgres
jobs table. Owns: self-evolution, embed rebuilds, content/diagram/sim
re-indexing, nightly self-probe. API process keeps ONLY request work.
**D2. Metrics + alerting:** /metrics (Prometheus), Grafana dashboard,
alerts on 5xx-rate, p95, pool saturation, readiness flaps, dependency down.
**D3. Staging profile + backup drill:** `--profile staging` on the same box;
postgres dump restore proven once, scripted forever.

Acceptance D: zero background work in the API process (verified by process
inspection + load test during a rebuild-job run); alerts page on an injected
failure; restore drill passes.

---

## PHASE E — DATA-STORE RATIONALIZATION (evidence-based)

Measure per-store query traffic for one week (D2 metrics). Then:
- clickhouse: evict unless something real queries it (batch-export instead)
- neo4j: evict from the hot path if only galaxy-viz uses it (materialize to
  postgres/json); keep only if a live feature needs graph queries
- target end-state: **postgres + redis + qdrant**, each with a measured job

Acceptance E: each remaining store shows real request-path traffic; evicted
stores' features pass the verify sweep.

---

## Sequencing & risk

| Phase | Depends on | Risk | Rollback |
|---|---|---|---|
| A (harness) | nothing | near-zero | unwrap CMD |
| B (load) | A | zero (measurement) | none needed |
| C (segregation) | A manifest | medium (route surface) | routes are shims; flag off |
| D (worker/ops) | A | low | containers optional |
| E (stores) | D metrics | medium | data retained, re-point |

Order is strict: A → B → C → D → E. A and B make every later change safe and
measurable; C removes the mess; D and E keep it that way.

## Explicitly out of scope (decided)

- No microservices, no Kubernetes (compose + 2 replicas is honest here)
- No physical re-packaging of the whole tree (logical boundaries + lint
  instead — a big-bang move is weeks of risk for zero user value)
- Language content stays parked

---

## PHASE F — THE REBUILD (outer shell first, manifest-driven strangler)

**Trigger:** after the diagram wave freezes (JUNB + DIAG-LAST close).

**F0. `CODEBASE_MANIFEST.md` is the contract.** Every file gets one of:
KEEP / MIGRATE / QUARANTINE / DELETE. The manifest + `manifest.json`
(module map) are committed; structure changes are manifest diffs.

**F1. The outer shell (build this first, ship nothing else until it gates):**
- `core/app_factory.py` — main.py shrinks to a factory
- `harness/launch_check.py` + `routes_manifest.json` (Phase A, now load-bearing)
- `core/` (db, settings, observability, readiness)
- exactly ONE migrated route (health) with manifest parity proven

**F2. Module migration in batches** — content → assessment → tutor → solver
surface. After EACH batch: manifest hash identical + verify sweep green.
Any batch that can't prove parity is reverted, not debugged forward.

**F3. Quarantine + kill list** (ai/legacy flag-off, 19 junk routes, auth
default-on) once routers are merged.

**F4. Workers + metrics + staging** (Phase D content) land on the new shell.

Why strangler, not big-bang: the current app SERVES students. The shell
replaces load-bearing walls one room at a time, with the manifest and the
route manifest as the proof each room moved safely. Big-bang rewrites are
how the three-generation mess we're cleaning started.

## GOVERNANCE (the operating rhythm that keeps it clean)

- Every wave closes with: manifest diff + postmortem (1 page) + ADR if an
  architectural choice was made
- Route/module surface changes only via manifest diff (reviewed)
- Dependency lockfile + canary deploys land in Phase A/B (cheap, world-class)
- The backlog (`_diag_natural.json`, language wave, filter-skipped nodes)
  is documented and owner-gated — never auto-resumed
