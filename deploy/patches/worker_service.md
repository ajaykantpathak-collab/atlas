# PATCH: worker service + metrics endpoint (A6-OPS, 2026-10-02)

Coordinator-appliable patch. **Nothing in this file is auto-applied** — the
coordinator copies the blocks below. Applies to:

- `deploy/docker-compose.prod.yml` (add one service)
- `deploy/backend/main.py` (3 lines: import, include_router, middleware)

New files this patch depends on (already in the tree):

- `deploy/worker.Dockerfile` — worker image (same base as backend, CMD `python -m backend.workers.main`)
- `deploy/backend/workers/{__init__,jobs,main}.py` — postgres-backed job queue + poll loop
- `deploy/backend/modules/metrics/{__init__,router,middleware}.py` — `/metrics` + request middleware
- `deploy/backend/modules/compliance/fulfilment.py` — export/erasure fulfilment

---

## 1. Compose: add the worker service

Append this service to `deploy/docker-compose.prod.yml` (anywhere in
`services:`; end of file before `networks:` reads clean). It reuses the
existing `backend-env` YAML anchor, so it inherits DATABASE_URL,
COMPLIANCE_DATABASE_URL, redis/neo4j/qdrant env, etc.

```yaml
  # ── Background worker (jobs queue + compliance fulfilment) ──
  worker:
    build:
      context: .
      dockerfile: worker.Dockerfile
    container_name: dream-worker
    restart: unless-stopped
    volumes:
      # content corpora for content_reindex (read-only, same as backends)
      - ./content:/app/content:ro
      - ./organized:/app/organized:ro
      # writable runtime data: worker state (selfprobe results) +
      # compliance export files land here
      - ${RUNTIME_DATA_HOST:-D:/platform/runtime_data}:/app/cbse_data
      # embed_rebuild inputs (add more jsonl mounts if the pipeline needs
      # them; the three below match what the backends already mount)
      - ./parsed_output/enrichment.jsonl:/app/parsed_output/enrichment.jsonl:ro
      - ../parsed_output/diagnostics.jsonl:/app/parsed_output/diagnostics.jsonl:ro
      - ../parsed_output/misconceptions.jsonl:/app/parsed_output/misconceptions.jsonl:ro
      # HF weights shared with the backends (embed_rebuild model load)
      - hf_cache:/app/hf_cache
    environment:
      <<: *backend-env
      WORKER_ID: dream-worker
      # Poll loop / timeouts (defaults in code; pin them for visibility)
      WORKER_POLL_SECONDS: "1"
      WORKER_JOB_TIMEOUT_S: "600"
      WORKER_STALE_AFTER_S: "900"
      # embed_rebuild: qdrant loader constants are env-overridden by the
      # handler (the module hardcodes dev paths)
      EMBED_REBUILD_QDRANT_URL: http://qdrant:6333
      EMBED_REBUILD_OUTPUT_DIR: /app/parsed_output
      # Set "stub" to no-op embed_rebuild until model weights are verified
      # in this container; remove once first real run is green.
      WORKER_EMBED_REBUILD_MODE: stub
      # Where selfprobe writes results + where exports land (writable mount)
      WORKER_STATE_DIR: /app/cbse_data/worker_state
      COMPLIANCE_EXPORT_DIR: /app/cbse_data/compliance_exports
      # selfprobe target: hit backend-1 directly, not the nginx LB
      WORKER_PROBE_BASE_URL: http://backend-1:8000
    depends_on:
      postgres:
        condition: service_healthy
      db-init:
        condition: service_completed_successfully
    # deliberately NO dependency on backend-1: the worker must keep
    # fulfilling compliance jobs even while the API is restarting;
    # nightly_selfprobe records backend-outage probes as failures instead
    # of the container being blocked from starting.
    networks:
      - dream-net
```

Notes:
- No `ports:` — the worker serves no HTTP.
- No `healthcheck:` — supervision is `restart: unless-stopped`; a worker
  crash-loop shows up in `docker ps` restart counts.
- `hf_cache` is the existing external volume (`deploy_hf_cache`).
- Worker DB access uses the SAME `DATABASE_URL` as the backends (the jobs
  table lives in the main `dream_app` DB; the compliance DB comes from
  `COMPLIANCE_DATABASE_URL` via the `backend-env` anchor).

## 2. main.py: mount /metrics + request-metrics middleware

Three additions to `deploy/backend/main.py` (coordinator applies):

```python
# (a) imports — next to the other observability imports (~line 17)
from backend.modules.metrics.middleware import install_metrics_middleware
from backend.modules.metrics.router import router as metrics_router

# (b) register the middleware — AFTER install_heavy_rate_limit(app)
#     (line ~289) so it sits OUTSIDE the limiters and 429s are counted.
#     Keep it BEFORE/after CORS either way; CORS never short-circuits.
install_metrics_middleware(app)

# (c) mount the route — next to the other include_router calls (~line 400)
app.include_router(metrics_router)
```

Env additions (optional, in `backend-env` anchor if desired):
- `METRICS_ENABLED=false` disables the middleware (endpoint still serves).
- `/metrics` is already rate-limit-exempt (`_EXEMPT_PREFIXES` in
  `observability.py`) and is NOT proxied by nginx today (frontend 404s
  it) — scraping must target `127.0.0.1:8001` / `:8002` per replica.

## 3. Ship steps (order matters)

```bash
cd /d/platform/deploy

# 1. build both images (one build per batch)
docker compose -f docker-compose.prod.yml --env-file .env.production build worker backend-1 backend-2

# 2. apply the main.py edits (step 2 above), then recreate backends
docker compose -f docker-compose.prod.yml --env-file .env.production up -d backend-1 backend-2

# 3. start the worker (first run also creates the jobs table via
#    init_queue() at boot; idempotent)
docker compose -f docker-compose.prod.yml --env-file .env.production up -d worker

# 4. verify
curl -s http://127.0.0.1:8001/metrics | head          # exposition parses
docker logs dream-worker --tail 20                    # "worker ... up (poll=1.0s ...)"
docker exec dream-postgres psql -U dream_user -d dream_app -c '\d jobs'   # queue table exists

# 5. smoke: enqueue a real job end-to-end
docker exec dream-backend-1 python -c \
  "from backend.workers import jobs; print(jobs.enqueue('content_reindex', {'reason':'ship smoke'}))"
docker logs dream-worker --tail 5                     # job done line

# 6. (optional) compliance fulfilment end-to-end with a synthetic request
SID=$(docker exec dream-postgres psql -U dream_user -d dream_app -t -A -c "SELECT id FROM students LIMIT 1")
docker exec dream-postgres psql -U atlas_compliance -d atlas_compliance \
  -c "INSERT INTO data_requests (id, user_id, kind, status) VALUES ('smoke-req-1', '$SID', 'export', 'received');"
docker exec dream-backend-1 python -c \
  "from backend.workers import jobs; print(jobs.enqueue('compliance_fulfil', {'request_id':'smoke-req-1'}))"
sleep 5
docker exec dream-postgres psql -U atlas_compliance -d atlas_compliance \
  -c "SELECT status, notes FROM data_requests WHERE id='smoke-req-1';"   # done + export path
docker exec dream-worker ls -la /app/cbse_data/compliance_exports/       # export_*.json present

# 7. live compliance DB read-only check (tables exist) — also works pre-ship:
curl -s http://127.0.0.1:8001/api/compliance/policy   # 200 + JSON proves atlas_compliance reachable
```

## 4. Enqueueing jobs (operational reference)

```python
from backend.workers import jobs
jobs.enqueue("content_reindex", {"reason": "corpus sync"})          # index rebuild
jobs.enqueue("embed_rebuild", {})                                   # qdrant pipeline
jobs.enqueue("compliance_fulfil", {"request_id": "<uuid>"})         # GDPR/DPDP
jobs.enqueue("nightly_selfprobe", {})                               # probe suite
```

Scheduled nightly probe: add a host cron or compose-of-run
(`docker compose run --rm worker python -c "from backend.workers import
jobs; jobs.enqueue('nightly_selfprobe', {})"`) — deliberately not wired
into the worker loop to keep the loop single-purpose.
