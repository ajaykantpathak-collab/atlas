# ── Worker Dockerfile (production) ─────────────────────────────
# Background-jobs container (A6-OPS, 2026-10-02): same base + deps as the
# API image, but runs the worker poll loop instead of gunicorn — no port,
# no HTTP healthcheck (see compose patch: restart: unless-stopped is the
# supervision; the jobs table is the work contract).
#
# Build (from deploy/):
#   docker build -f worker.Dockerfile -t dream-worker .

FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Same system deps as Dockerfile.backend (psycopg2 build + curl for debug)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Requirements first for layer caching (identical layer hash with the
# backend image when requirements.txt is unchanged)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Application code (backend/ only — the worker imports no frontend assets)
COPY backend/ ./backend/
RUN mkdir -p ./cbse_data

# Poll loop tuning (defaults in code; overridable via compose environment)
ENV WORKER_POLL_SECONDS=1 \
    WORKER_JOB_TIMEOUT_S=600 \
    WORKER_STALE_AFTER_S=900 \
    PRELOAD_WARM=0

# No EXPOSE, no HTTP healthcheck: the worker serves no HTTP.  Liveness is
# "process up" (docker restart policy) + jobs-table heartbeat in future.
CMD ["python", "-m", "backend.workers.main"]
