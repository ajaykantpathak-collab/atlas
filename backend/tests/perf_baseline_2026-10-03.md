# Atlas Performance Baseline — 2026-10-03 (PERF agent)

Controlled, incremental load baseline against production `http://localhost` (nginx :80),
run from inside `dream-backend-1` (`PYTHONPATH=/app`), stage reporting per protocol.

**Box:** 8 logical cores, 40GB RAM, D: on slow HDD. Docker VM (WSL2) hosts postgres / redis /
neo4j / qdrant / clickhouse / backends; frontend is a native `next start` on the host (:3001).
Backend VM budget: 10GB.

**Driver:** `deploy/backend/tests/perf_stage_driver.py` (asyncio + httpx, per-endpoint
nearest-rank percentiles via `backend.harness.loadgen.percentiles`). Mix per mission:
60% GET (/, /api/health, /api/content/subjects, /learn), 25% authed `POST /api/practice/start`
(3 pre-created accounts `perf_baseline_{1,2,3}@example.com`), 15% `POST
/api/practice/deterministic/solve` (20 real bank questions from `compq_bank` corpus).
Host sampler: `deploy/backend/tests/perf_host_sampler.ps1` (10s cadence: CPU%, free RAM,
vmmemWSL / node / docker-backend working sets). Raw artifacts in
`deploy/backend/tests/perf_results/` (`stage1.json`, `warmup.json`, `solve_ab*.json`,
`host_samples*.csv`).

---

## 1. Warm-up (10 iterations per key route, through nginx)

| route | trajectory (ms, it1→it10) | steady floor |
|---|---|---|
| GET / | 252 317 228 280 102 270 345 249 168 383 | ~250-380 (stale container, see §6.1) |
| GET /api/health | 597 **15004 7505** 1514 146 2272 2722 890 2348 85 | 85-2700, spikes 7.5-15s (see §5) |
| GET /api/content/subjects | 71 86 24 35 **6650** 212 73 31 20 24 | 20-70 warm |
| GET /learn | 132 108 171 270 136 420 362 385 428 542 | ~130-540 |
| POST /api/practice/start | 2187 2546 1770 2610 1521 2661 2237 2755 1652 2403 | **flat ~1.5-2.8s every call** (docstring target: <200ms) |
| POST /api/practice/deterministic/solve | **17099** 8843 359 16 362 441 264 454 **8317** 115 | 16ms-8.3s (cold import 17s; per-unique-text sweep ~1.2s) |

Warm-up findings: (a) solve cold start pays ~17s of lazy imports (MiniLM loads **twice**
during import); (b) `/api/practice/start` does not improve with warm-up — its ~2.3s is
per-call compute (5× IRT `select_next` + DB flush), not cold start; (c) `/api/health`
multi-second spikes come from its 4 **sequential** service probes (§5).

## 2. Ramp stages

### Stage 1 — 5 users / 60s (elapsed window 94.1s incl. shutdown grace)

| endpoint | reqs | errs | err% | rps | p50 | p75 | p95 | p99 | max |
|---|---|---|---|---|---|---|---|---|---|
| **OVERALL** | 127 | 6 | **4.72%** | 1.4 | 301ms | 2194ms | **9693ms** | 45024ms | 45054ms |
| GET / | 36 | 0 | 0% | | 247 | 335 | 454 | 507 | 507 |
| POST /api/practice/start | 26 | 0 | 0% | | 2694 | 3013 | 5193 | 6211 | 6211 |
| POST .../deterministic/solve | 26 | 5 | **19.2%** | | 2108 | 4351 | **45024** | 45054 | 45054 |
| GET /api/content/subjects | 17 | 1 | 5.9% | | 24 | 91 | 15005 | — | 15005 |
| GET /learn | 11 | 0 | 0% | | 240 | 301 | 661 | 661 | 661 |
| GET /api/health | 11 | 0 | 0% | | 161 | 539 | 1116 | 1116 | 1116 |

All 6 errors were client timeouts (status −1): 5× solve at the 45s client timeout, 1×
subjects at 15s.

**STOP CONDITION TRIPPED (p95 9.7s > 5s, err 4.7% > 1%).**

### Ceiling

> **The box sustains ~5 concurrent users of this mix (≈1.4 rps) before the p95/error
> stop conditions trip.** Stages 2 (10u) and 3 (20u) were NOT run: the protocol stop
> condition fired at stage 1, and re-running/staging up under the conditions documented
> in §6 would only re-measure the confound. During the stage the host read **100% CPU**,
> vmmemWSL grew **7.2GB → 12.0GB**, free host RAM fell 8.8GB → 3.6GB.

Mechanism (diagnosed): the solve path's registry sweeps are CPU-bound Python (~1.2s per
uncached sweep; up to 4 sweep sites per request) queued on the bounded solve pool
(`SOLVE_POOL_WORKERS=4` per uvicorn worker, `UVICORN_WORKERS=2` per backend); under even
5 concurrent users the pool saturates, tails stack past 45s, and every other request on
that worker behind the GIL degrades (subjects 15s timeout, health spikes). This is a
per-request CPU pathology, not a capacity wall — see §5 for the fix.

### Controllability caveats (IMPORTANT for comparing against a future baseline)

- Another agent's repair wave ran **during** the baseline:
  `python -m backend.tests.bank_norm_repair --table board_questions_repairtest ...`
  inside dream-backend-1 consumed a steady core before/during/after stage 1 (peak
  container CPU read 628-1618% with bursty torch work; two instances observed).
- The host is a shared agent workstation: ZCode/Devin sessions + a `semantic_qa.py build`
  job add ~45-100% ambient host CPU in bursts.
- Stage-1 numbers are therefore the honest "production conditions on this box tonight",
  not a single-tenant capacity ceiling.

## 3. Mandated hotspot verification — `_model_problem_cached` (solve path)

The reuse-first-pass fix **is live in production containers** (both dream-backend-1/2;
`lru_cache(maxsize=512)` + QA-R1 one-pass registry sweep in
`its/solver/modeling_layer.py`). Measured effect, same process:

| measurement | before (uncached sweep) | after (shipped cache) | gain |
|---|---|---|---|
| one `model_problem` registry sweep, warm | 1208.5 ms | **0.047 ms** per cache hit (incl. deepcopy) | **~25,700×** |
| `answer_pipeline.answer()` over the 20-question bank set, steady-state pass, same process | total 36,346.8 ms · p95 6,712 ms · max 20,639 ms | total **20,515.9 ms** · p95 **5,325 ms** · max **5,704 ms** | **1.77× total, 3.6× worst-question** |
| bulk path (16/20 bank questions, VERIFIED_FROM_NODE), run-2 medians | 81 ms | **49 ms** | 1.65× |

Pipeline context: `_independent_sweep` is called at up to 4 sites per `answer()`
(lane A, full sweep, hop-guard probe, lane C). Pre-fix every site paid the full registry
sweep; post-fix sites 2-4 are cache hits. On the computed lane the first sweep per
*unique* text is irreducible (~1.2 s warm); repeat texts are pure hits. Methodology notes:
A/B ran both variants in one process (order flipped across runs, per-variant pass 2
reported as steady state; node-lane + guided-family warm-ups isolated first-hit compiles).
Artifacts: `perf_results/solve_ab.json`, `solve_ab2.json`, `solve_ab3.json`.

Side finding: three GUIDED_PRACTICE questions cost 5.7-20.6 s even post-fix (heavy CAS
families, e.g. `core_calculus_engine` overflow warnings) — these dominate the solve tail
more than the registry sweep does.

## 4. Additional fix shipped this session (deploy/backend, not yet in prod images)

**`/api/health` — parallel probes + 1s TTL cache** (`deploy/backend/main.py`).

- Before (measured on production, old code): sequential probes stack — warmup saw
  **7.5 s and 15.0 s** responses; tonight 5 of 8 production probes exceeded 25 s under
  load; design worst case 3 × 5 s timeouts + qdrant ≈ 20 s. This also flaps the Docker
  healthcheck (dream-backend-1 went `unhealthy` during the session).
- After (this diff): probes run concurrently (`asyncio.gather`, independent) → worst case
  ≈ one 5 s probe timeout; a 1 s TTL snapshot absorbs probe storms (nginx, load tests,
  orchestrator sweeps) at one check-round per second. Response shape unchanged; `cached:
  true` added on hits only. Verified parse/AST-checked in `deploy/backend/main.py`; dev
  instance measurement below.
- Measured after (dev :8010, new code, same box, minutes after the before-samples):
  warm probes **6.7-168 ms** (`cached: true` served within the 1 s TTL window);
  8-probe concurrent burst max **0.99 s** vs **2.03 s** on production's old code in the
  same window; degraded-path worst case drops from the observed **7.5-15 s+ (prod, old:
  warmup iterations 2-3; 5 of 8 probes > 25 s under stage-1-adjacent load; Docker
  healthcheck flapped to `unhealthy`)** to a structural ceiling of ~one probe timeout
  (5 s) with 1 s-stale snapshots in between. Calm-window latency is parity (both fast);
  the fix removes the stacking failure mode, not the happy path.

## 5. Dev-instance measurements (:8010, `dev_verify.cmd`, killed after)

- Boot on this HDD + contended box: app import ≈ 9 min (HF model checks at 23:52,
  listening ~00:35; a first boot attempt was lost with its parent shell — relaunched
  detached via `Start-Process`). Cold first `/api/health`: 6.8-8.4 s (cold DB pools +
  first neo4j handshake — orthogonal to the fix).
- Health before/after numbers: see §4.
- Dev instance killed (PIDs 20580/15460); nothing left listening on :8010.

## 6. Findings register

### 6.1 BLOCKER — production nginx serves the RETIRED frontend container
`nginx.conf` proxies the catch-all to `host.docker.internal:3001`, which Docker Desktop
forwards to **host loopback** — where the retired `dream-frontend` container's published
port (**127.0.0.1:3001**) wins over the native server's wildcard bind (0.0.0.0:3001).
Consequences observed: `/learning/checkup` (page added after the image was built) returns
**404 in production** through :80 but 200 on the native server; tonight the stale
container additionally hung (12 s timeouts) under host CPU pressure while the native
server served 70 ms. **Fix (coordinator, no restarts by PERF): `docker stop
dream-frontend`** — the native fe_serve on 0.0.0.0:3001 takes over immediately; or remove
its `127.0.0.1:3001` publish in compose. Until then, page-route baselines measure the
stale container, not the shipped frontend.

### 6.2 `/api/practice/start` costs ~2.3 s every call (docstring target <200 ms)
`start_session` runs `QuestionSelector.select_next` 5× (one per pre-generated question)
+ DB flush. Quick win candidates: parallelize the 4 non-first selections, or pre-generate
lazily. Not attempted (behavior-sensitive; the solve path and health were higher value).

### 6.3 Solve cold start pays ~17 s (first request per worker)
Lazy imports load MiniLM **twice** (two loaders: `semantic_matcher.py` — capped at
`torch.set_num_threads(1)`, and `services/embedding_service.py` — **not capped**). Preload
at worker boot (gunicorn `--preload` already exists; extend `PRELOAD_WARM`) and cap torch
threads in `embedding_service.py`.

### 6.4 Multi-tenant box
Content-wave repair jobs (`bank_norm_repair`) run inside dream-backend-1 during perf
windows; host runs concurrent agent sessions. Any future capacity ceiling must be measured
with a claimed-quiet box (fleet-manager lock), else the ceiling is the other tenants'.

## 7. Top 3 scaling recommendations (real deployment)

1. **Move the corpus + caches off the HDD onto NVMe (or tmpfs for the index).** The
   node-graph index load on first node-lane answer took **384 s** on this disk; every
   backend restart re-pays multi-minute cold loads and `ENHANCED_NODES_FAST_FINGERPRINT`
   rebuilds. NVMe cuts cold-start minutes to seconds and removes the 12GB vmmemWSL
   allocation spikes seen under load. (Also: give the Docker VM a hard memory cap; it
   ballooned 7.2→12.0GB during one 5-user stage.)
2. **Fix the solve path's CPU economics before adding users**: keep `_model_problem_cached`
   (measured 25,700× per hit, 1.77× end-to-end); prewarm the solver at boot (kills the
   17 s first-solve); cap `torch.set_num_threads(1)` in `services/embedding_service.py`;
   audit the 5.7-20.6 s GUIDED CAS families; consider one dedicated solve process (not
   threads — the GIL serializes the sweeps anyway) so solve CPU can be capped and
   scheduled away from the request path.
3. **Make health cheap and fleet-safe, and pin routing to the frontend you ship**:
   ship the parallel+cached `/api/health` (§4); stop the retired `dream-frontend`
   container so nginx serves the native build (§6.1); run content-repair waves on a
   staging instance, never inside the serving backend. Together these remove the two
   failure modes that produced tonight's 404s, 25 s probes, and unhealthy flapping at
   *five* concurrent users.

## 8. Raw artifacts

- `deploy/backend/tests/perf_stage_driver.py` — stage/warmup driver
- `deploy/backend/tests/perf_solve_ab.py` — solve-path A/B harness
- `deploy/backend/tests/perf_host_sampler.ps1` — host resource sampler
- `deploy/backend/tests/perf_results/` — stage1.json, warmup.json, solve_ab{,2,3}.json,
  host_samples.csv (stage-1 window), host_samples2.csv, dev8010 logs, health probes
