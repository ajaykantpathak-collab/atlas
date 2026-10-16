#!/usr/bin/env python3
"""backend/workers/main.py — the worker process entry point.

Run as:  ``python -m backend.workers.main``  (deploy/worker.Dockerfile CMD)

A single-threaded poll loop (WORKER_POLL_SECONDS, default 1s) that claims
jobs from the postgres queue (workers/jobs.py) and dispatches them through
a handler registry.  Designed to run as its OWN container alongside the
API replicas — heavy or scheduled work never blocks a request path.

Handlers (registry below; each receives the payload dict, returns a
JSON-safe dict recorded in the job row):

  embed_rebuild       re-run the qdrant embed pipeline
                      (backend/content_parsers/load_to_qdrant_v2 — the
                      existing pipeline entry; dev-hardcoded paths are
                      overridden from env, see the handler)
  content_reindex     force-rebuild the enhanced-nodes index
                      (services/enhanced_nodes.load_index(force=True))
  compliance_fulfil   fulfil a data export/erasure request
                      (modules/compliance/fulfilment.process_request)
  nightly_selfprobe   run the planted-attack/health probe suite against
                      localhost and record the results to disk
  weekly_digest       compose+send the weekly WhatsApp parent digest for
                      every linked (parent, child) pair — idempotent per
                      ISO week per child (digest_sent_log marker);
                      scheduled by THIS loop (one enqueue attempt per UTC
                      day, heavy-window gated), see
                      maybe_enqueue_weekly_digest
  daily_nudge         short WhatsApp nudge for linked children with zero
                      quiz activity today who were active in the last 7
                      days — anti-spam stop after 3 consecutive silent-day
                      nudges (nudge_sent_log marker); idempotent per UTC
                      day per child; scheduled daily like weekly_digest
  renewal_notice      ONE WhatsApp renewal notice per (parent,
                      entitlement) whose paid plan expires within 7 days
                      (renewal_notice_log marker) — honest no-op when
                      payments are unconfigured; scheduled daily like
                      weekly_digest
  account_purge       hard-delete every users/students row (and their
                      learning rows) whose deletion_purge_at has passed —
                      the 30-day tail of POST /api/auth/delete-account
                      (WS-LEGAL); scheduled daily like the digest limbs,
                      heavy-window gated

Operational behaviour:
  * SIGTERM/SIGINT -> graceful: stop claiming, finish the in-flight job,
    exit 0.  Tested in backend/tests/test_worker_jobs.py.
  * Per-job timeout WORKER_JOB_TIMEOUT_S (default 600) — the job is
    marked failed and the loop moves on.  (Python threads cannot be
    killed; a truly wedged handler eventually dies with the container.
    Stale-claim recovery covers the crash case.)
  * Every failure is captured into the jobs row (error + attempts) and
    retried with backoff up to max_attempts.

Enqueueing (from anywhere with DATABASE_URL):
    from backend.workers import jobs
    jobs.enqueue("content_reindex", {"reason": "corpus sync"})
"""
from __future__ import annotations

import logging
import os
import signal
import socket
import subprocess
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from concurrent.futures import TimeoutError as _FutureTimeout
from datetime import datetime, timedelta, timezone

from backend.workers import jobs

log = logging.getLogger("atlas.worker")

POLL_SECONDS = float(os.environ.get("WORKER_POLL_SECONDS", "1"))
JOB_TIMEOUT_S = float(os.environ.get("WORKER_JOB_TIMEOUT_S", "600"))
STALE_AFTER_S = float(os.environ.get("WORKER_STALE_AFTER_S", "900"))
WORKER_ID = os.environ.get(
    "WORKER_ID", f"{socket.gethostname()}-{os.getpid()}")
PROBE_BASE_URL = os.environ.get("WORKER_PROBE_BASE_URL",
                                "http://localhost:8000")
STATE_DIR = os.environ.get("WORKER_STATE_DIR", "/app/cbse_data/worker_state")

# Heavy jobs (full-corpus indexing / embed rebuilds) starved the 10GB host VM
# on 2026-10-03 and took the whole stack down. They now run ONLY inside their
# window (default 02:00-05:00 local container time); enqueues outside the
# window are deferred to the next window start, never dropped and never run
# on-demand. WORKER_ALLOW_HEAVY=1 overrides for a supervised manual run.
# weekly_digest is included per owner law (worker scheduled jobs only in the
# 02:00-05:00 window): the per-child loop is light, but it is LOOP-scheduled
# batch work and must never fire mid-day on demand. FOOLPROOF-MESSAGING
# (2026-10-05): the digest kinds are MESSAGE sends, not heavy compute —
# they move to their own IST EVENING send window (18:00-21:00 IST, env
# WORKER_SEND_WINDOW_IST) so parents are never pinged by the heavy-window
# clock, and heavy jobs keep the compute window to themselves.
# account_purge rides HEAVY_KINDS not because it is compute-heavy (it is a
# few indexed deletes) but because it is LOOP-SCHEDULED batch DB work —
# owner law keeps all of that in the 02:00-05:00 window.
HEAVY_KINDS = {"content_reindex", "embed_rebuild", "account_purge",
               "norm_text_backfill", "bank_preroute"}
SEND_KINDS = {"weekly_digest", "daily_nudge", "renewal_notice"}
HEAVY_WINDOW = os.environ.get("WORKER_HEAVY_WINDOW", "02:00-05:00")
SEND_WINDOW_IST = os.environ.get("WORKER_SEND_WINDOW_IST", "18:00-21:00")
ALLOW_HEAVY_NOW = os.environ.get("WORKER_ALLOW_HEAVY", "") == "1"


def _window_bounds(now, window: str):
    """Return (window_open: bool, next_start) for HH:MM-HH:MM in `now`'s tz."""
    try:
        start_s, end_s = window.split("-", 1)
        sh, sm = (int(x) for x in start_s.split(":", 1))
        eh, em = (int(x) for x in end_s.split(":", 1))
    except Exception:
        return True, now  # unparseable window: fail OPEN, log once
    start_t = now.replace(hour=sh, minute=sm, second=0, microsecond=0)
    end_t = now.replace(hour=eh, minute=em, second=0, microsecond=0)
    if start_t <= end_t:
        if start_t <= now < end_t:
            return True, now
        nxt = start_t if now < start_t else start_t + timedelta(days=1)
        return False, nxt
    # overnight window (e.g. 22:00-05:00)
    if now >= start_t or now < end_t:
        return True, now
    return False, start_t


def _heavy_window_bounds(now: datetime):
    """Return (window_open: bool, next_start: datetime) for HH:MM-HH:MM."""
    return _window_bounds(now, HEAVY_WINDOW)


def _ist_now() -> datetime:
    return datetime.now(timezone.utc).astimezone(
        timezone(timedelta(hours=5, minutes=30)))


def _guard_send_window(kind: str, job_id: str) -> bool:
    """True = run it. False = deferred to the IST evening send window."""
    if kind not in SEND_KINDS:
        return True
    now = _ist_now()
    open_now, next_start = _window_bounds(now, SEND_WINDOW_IST)
    if open_now:
        return True
    jobs.defer(job_id, next_start.astimezone(timezone.utc),
               note=f"[deferred: send window {SEND_WINDOW_IST} IST]")
    log.warning("job %s (%s) deferred to send window %s IST (next start %s)",
                job_id, kind, SEND_WINDOW_IST,
                next_start.isoformat(timespec="minutes"))
    return False


def _guard_heavy(kind: str, job_id: str) -> bool:
    """True = run it. False = deferred to the heavy window."""
    if kind not in HEAVY_KINDS or ALLOW_HEAVY_NOW:
        return True
    now = datetime.now(timezone.utc).astimezone()
    open_now, next_start = _heavy_window_bounds(now)
    if open_now:
        return True
    jobs.defer(job_id, next_start.astimezone(timezone.utc),
               note=f"[deferred: heavy window {HEAVY_WINDOW}]")
    log.warning("job %s (%s) deferred to heavy window %s (next start %s)",
                job_id, kind, HEAVY_WINDOW, next_start.isoformat(timespec="minutes"))
    return False


# ---------------------------------------------------------------------------
# Handlers
# ---------------------------------------------------------------------------
def embed_rebuild(payload: dict) -> dict:
    """Re-run the existing qdrant embedding pipeline.

    The pipeline entry is backend/content_parsers/load_to_qdrant_v2.py
    (module-level ``main()``).  It carries dev-hardened constants —
    ``QDRANT_URL = http://localhost:6333`` and
    ``OUTPUT_DIR = D:\\platform\\parsed_output`` — which are wrong inside
    the container, so the handler overrides them from env before calling:
      EMBED_REBUILD_QDRANT_URL   (default http://qdrant:6333)
      EMBED_REBUILD_OUTPUT_DIR   (default /app/parsed_output)
    Set WORKER_EMBED_REBUILD_MODE=stub to skip the pipeline (records a
    TODO result) — used in tests/dev without model weights.
    """
    mode = os.environ.get("WORKER_EMBED_REBUILD_MODE", "auto").lower()
    if mode == "stub":
        return {"stub": True, "todo": "wire GPU/model weights into the "
                "worker image, then unset WORKER_EMBED_REBUILD_MODE"}
    from backend.content_parsers import load_to_qdrant_v2 as loader
    loader.QDRANT_URL = os.environ.get("EMBED_REBUILD_QDRANT_URL",
                                       "http://qdrant:6333")
    loader.OUTPUT_DIR = os.environ.get(
        "EMBED_REBUILD_OUTPUT_DIR", "/app/parsed_output")
    started = time.monotonic()
    # main() is script-shaped (prints, returns None); call it in-process so
    # the job row can capture duration + the loader's own exit conditions.
    loader.main()
    return {"pipeline": "load_to_qdrant_v2",
            "elapsed_s": round(time.monotonic() - started, 1)}


def content_reindex(payload: dict) -> dict:
    """Force-rebuild the enhanced-nodes singleton index from the corpora."""
    from backend.services.enhanced_nodes import load_index
    started = time.monotonic()
    index = load_index(force=True)
    count = index.node_count() if hasattr(index, "node_count") else None
    return {"node_count": count,
            "elapsed_s": round(time.monotonic() - started, 1)}


def compliance_fulfil(payload: dict) -> dict:
    """Fulfil a data export / erasure request (GDPR/DPDP Art.15/17)."""
    from backend.modules.compliance.fulfilment import process_request
    request_id = payload.get("request_id")
    if not request_id:
        raise ValueError("compliance_fulfil payload requires request_id")
    return process_request(request_id)


def norm_text_backfill(payload: dict) -> dict:
    """Wave 9.8 L3: chunked norm_text backfill (heavy-window heavy job).
    payload {dry_run: true} produces the read-only preview."""
    from backend.workers.norm_backfill import handler
    return handler(payload)


def bank_preroute(payload: dict) -> dict:
    """Wave 9.8 L3: route-only pre-route over the bank (heavy-window)."""
    from backend.workers.preroute import handler
    return handler(payload)


def session_prewarm(payload: dict) -> dict:
    """Wave 9.8 L3: node prewarm — route-only + bank lookup over the
    node's top-50 bank stems. Light (50 stems); deliberately NOT a
    heavy-window kind — prewarm must land before the student does."""
    from backend.services.prewarm import run_node_prewarm
    return run_node_prewarm((payload or {}).get("node_id") or "",
                            (payload or {}).get("context"))


#: unauthenticated probes: (name, method, path, expected statuses).
#: Validated live 2026-10-02: health/ready -> 200, the three attack
#: probes -> 401.  /openapi.json was dropped: its generation is slow
#: enough to trip the 10s probe timeout and it is not security-relevant.
_PROBES = [
    ("health", "GET", "/api/health", {200}),
    ("ready", "GET", "/ready", {200}),
    ("attack: unauth /api/auth/me -> 401/403", "GET", "/api/auth/me",
     {401, 403}),
    ("attack: unauth /api/compliance/consent -> 401/403", "GET",
     "/api/compliance/consent", {401, 403}),
    ("attack: unauth data-request POST -> 401/403", "POST",
     "/api/compliance/data-request", {401, 403}),
]


def nightly_selfprobe(payload: dict) -> dict:
    """Run the planted-attack + health probe suite against localhost.

    Uses the live HTTP surface (PROBE_BASE_URL) with urllib — no auth, no
    test client.  Results are RECORDED, not raised: a red probe must be
    visible in the morning, not silently retried into oblivion.  The job
    only fails if the results cannot be persisted.
    """
    import json as _json
    import urllib.error
    import urllib.request

    results = []
    for name, method, path, expected in _PROBES:
        entry = {"probe": name, "method": method, "path": path,
                 "expected": sorted(expected), "ts": _utcnow_iso()}
        try:
            req = urllib.request.Request(
                PROBE_BASE_URL.rstrip("/") + path, method=method,
                data=b"{}" if method == "POST" else None,
                headers={"Content-Type": "application/json"} if method == "POST" else {})
            with urllib.request.urlopen(req, timeout=10) as resp:
                entry["status"] = resp.status
        except urllib.error.HTTPError as exc:  # 4xx/5xx: expected statuses apply
            entry["status"] = exc.code
        except Exception as exc:
            entry["status"] = None
            entry["error"] = f"{type(exc).__name__}: {exc}"[:200]
        entry["ok"] = entry.get("status") in expected
        results.append(entry)

    summary = {
        "base_url": PROBE_BASE_URL,
        "ran_at": _utcnow_iso(),
        "probes": results,
        "all_ok": all(r["ok"] for r in results),
        "failures": [r["probe"] for r in results if not r["ok"]],
    }
    _write_state("selfprobe_latest.json", summary)
    return summary


def _write_state(filename: str, data: dict) -> str:
    """Persist worker state best-effort (writable mount in prod)."""
    os.makedirs(STATE_DIR, exist_ok=True)
    path = os.path.join(STATE_DIR, filename)
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        import json as _json
        _json.dump(data, fh, indent=2, default=str)
    os.replace(tmp, path)
    return path


def _utcnow_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def weekly_digest(payload: dict) -> dict:
    """Weekly WhatsApp parent digest for every linked (parent, child) pair.

    Thin sync wrapper: the compose+send loop is async
    (services/whatsapp_digest.run_weekly_digest) because send_child_digest
    walks the async request-path models.  The run creates its own session
    via the platform AsyncSessionLocal and is IDEMPOTENT per ISO week per
    child (digest_sent_log marker is the source of truth), so this job can
    be re-attempted daily without ever double-sending.  One child failing
    never aborts the run — the summary carries per-child results.

    Payload: {"iso_week": "2026-W40"} optional override (tests / supervised
    backfill).  WHATSAPP_MOCK=1 (the default posture) composes + logs,
    sends nothing.
    """
    import asyncio
    from backend.services.whatsapp_digest import run_weekly_digest

    summary = asyncio.run(run_weekly_digest(iso_week=payload.get("iso_week")))
    # Morning-visibility copy next to selfprobe results (best-effort; the
    # job row's result column is the durable record).
    try:
        _write_state("weekly_digest_latest.json", summary)
    except Exception:
        log.warning("weekly_digest state write failed", exc_info=True)
    return summary


def daily_nudge(payload: dict) -> dict:
    """Daily WhatsApp nudge for linked children who have not practised
    TODAY but were active in the last 7 days.

    Thin sync wrapper: the decision+send loop is async
    (services/whatsapp_digest.run_daily_nudges).  Anti-spam law lives in
    the nudge_sent_log marker: dormant accounts (>7d) are never nudged,
    and after 3 consecutive silent-day nudges without any activity the
    child is left alone until they practise again.  Idempotent per UTC
    day per child — re-attempts skip already-served children.  WHATSAPP_MOCK=1
    (the default posture) composes + logs, sends nothing.
    """
    import asyncio
    from backend.services.whatsapp_digest import run_daily_nudges

    summary = asyncio.run(run_daily_nudges())
    try:
        _write_state("daily_nudge_latest.json", summary)
    except Exception:
        log.warning("daily_nudge state write failed", exc_info=True)
    return summary


def renewal_notice(payload: dict) -> dict:
    """ONE WhatsApp renewal notice per (parent, entitlement) whose paid
    plan expires within ``window_days`` (default 7).

    Thin sync wrapper around services/whatsapp_digest.run_renewal_notices.
    Only parents with at least one linked child are considered;
    idempotent per (parent, entitlement_id) via renewal_notice_log.
    Honest no-op ({"checked": 0, "reason": "payments unconfigured"}) when
    Razorpay keys are absent — never an error, never a lie.

    Payload: {"window_days": 7} optional override (tests / supervised
    runs).
    """
    import asyncio
    from backend.services.whatsapp_digest import run_renewal_notices

    summary = asyncio.run(run_renewal_notices(
        window_days=payload.get("window_days")))
    try:
        _write_state("renewal_notice_latest.json", summary)
    except Exception:
        log.warning("renewal_notice state write failed", exc_info=True)
    return summary


def account_purge(payload: dict) -> dict:
    """Hard-delete accounts past their deletion recovery window (WS-LEGAL).

    Thin sync wrapper around
    services/account_lifecycle.run_account_purge — deletes the residual
    rows (learning records, links, tokens, student + user rows) of every
    account whose deletion_purge_at has passed.  Scheduled once per UTC
    day under a deterministic job id, heavy-window gated like every other
    loop-scheduled batch job.
    """
    import asyncio
    from backend.services.account_lifecycle import run_account_purge

    summary = asyncio.run(run_account_purge())
    try:
        _write_state("account_purge_latest.json", summary)
    except Exception:
        log.warning("account_purge state write failed", exc_info=True)
    return summary


# ---------------------------------------------------------------------------
# Weekly digest scheduling
#
# nightly_selfprobe precedent (patches/worker_service.md §4): enqueued
# externally (host cron / compose-of-run), deliberately not wired into the
# loop.  The digest needs in-process reliability instead — a missed week is
# a silent product gap — so the trigger lives HERE, but stays humble:
#   * at most ONE enqueue attempt per UTC day, under the deterministic id
#     weekly_digest-<isoweek>-<yyyymmdd> (the jobs row is the
#     already-attempted-today marker; job_exists is a cheap PK probe),
#   * the digest_sent_log marker table is the source of truth for what was
#     actually delivered — daily re-attempts skip already-served children,
#   * a Monday crash retries Tuesday (same ISO week, unserved children go),
#     which a single weekly fire-and-forget could not recover from,
#   * _guard_send_window defers every attempt outside the IST evening
#     send window (18:00-21:00 IST, env WORKER_SEND_WINDOW_IST) — digest
#     kinds are MESSAGE sends and left HEAVY_KINDS so the compute window
#     never pings parents at odd hours (FOOLPROOF-MESSAGING 2026-10-05).
# ---------------------------------------------------------------------------
DIGEST_SCHED_CHECK_S = float(
    os.environ.get("WORKER_DIGEST_SCHED_CHECK_S", "3600"))


def weekly_digest_job_id(now: datetime | None = None) -> str:
    from backend.services.whatsapp_digest import iso_week_tag
    now = now or datetime.now(timezone.utc)
    return f"weekly_digest-{iso_week_tag(now)}-{now:%Y%m%d}"


def maybe_enqueue_weekly_digest(now: datetime | None = None) -> str | None:
    """Enqueue today's weekly_digest attempt if not already queued.

    Returns the job id, or None when today's attempt already exists (or
    the queue is unreachable — logged, retried on the next check).  Never
    raises: scheduling must never take the poll loop down.
    """
    try:
        jid = weekly_digest_job_id(now)
        if jobs.job_exists(jid):
            return None
        return jobs.enqueue("weekly_digest", {}, job_id=jid)
    except Exception:
        log.exception("weekly_digest scheduling attempt failed; will retry")
        return None


# ---------------------------------------------------------------------------
# Daily digest-limb scheduling (BUILD_ORDER 2.5.4) — the weekly digest's
# law, generalised: daily_nudge / renewal_notice are LOOP-scheduled batch
# work, so each gets ONE deterministic-id enqueue attempt per UTC day (the
# jobs row is the already-attempted-today marker; job_exists is a cheap PK
# probe), every attempt is heavy-window gated like the weekly digest, and
# the marker tables inside each run (nudge_sent_log / renewal_notice_log)
# are the source of truth for what actually sends.
# ---------------------------------------------------------------------------
DIGEST_LIMB_KINDS = ("daily_nudge", "renewal_notice")

# Loop-scheduled once-per-UTC-day batch kinds.  The digest limbs are the
# precedent; account_purge (WS-LEGAL) uses the same mechanism — one
# deterministic-id enqueue attempt per day, the jobs row as the
# already-attempted marker.  Message kinds stay in SEND_KINDS (evening IST
# window); account_purge is in HEAVY_KINDS (02:00-05:00 window).
DAILY_BATCH_KINDS = DIGEST_LIMB_KINDS + ("account_purge",)


def daily_limb_job_id(kind: str, now: datetime | None = None) -> str:
    """Deterministic per-day id, e.g. 'daily_nudge-20261004'."""
    now = now or datetime.now(timezone.utc)
    return f"{kind}-{now:%Y%m%d}"


def maybe_enqueue_daily_limb(kind: str,
                             now: datetime | None = None) -> str | None:
    """Enqueue today's ``kind`` (daily_nudge / renewal_notice) attempt if
    not already queued.  Returns the job id, or None when today's attempt
    already exists (or the queue is unreachable — logged, retried on the
    next check).  Never raises: scheduling must never take the poll loop
    down.
    """
    try:
        jid = daily_limb_job_id(kind, now)
        if jobs.job_exists(jid):
            return None
        return jobs.enqueue(kind, {}, job_id=jid)
    except Exception:
        log.exception("%s scheduling attempt failed; will retry", kind)
        return None


HANDLERS = {
    "embed_rebuild": embed_rebuild,
    "content_reindex": content_reindex,
    "compliance_fulfil": compliance_fulfil,
    "nightly_selfprobe": nightly_selfprobe,
    "weekly_digest": weekly_digest,
    "daily_nudge": daily_nudge,
    "renewal_notice": renewal_notice,
    "account_purge": account_purge,
    # Wave 9.8 L3: norm_text backfill + bank pre-route (heavy window)
    "norm_text_backfill": norm_text_backfill,
    "bank_preroute": bank_preroute,
    "session_prewarm": session_prewarm,
}


# ---------------------------------------------------------------------------
# Execution + loop
# ---------------------------------------------------------------------------
class Worker:
    """Poll loop with graceful shutdown and per-job timeout."""

    def __init__(self, worker_id: str | None = None,
                 handlers: dict | None = None):
        self.worker_id = worker_id or WORKER_ID
        self.handlers = handlers if handlers is not None else HANDLERS
        self.stop_event = threading.Event()
        self.last_signal: int | None = None
        self._current: dict | None = None
        # weekly-digest scheduler: monotonic timestamp of the last check
        # (the check itself is a cheap PK probe, gated to once per hour)
        self._last_digest_sched = 0.0
        # daily digest limbs: same hourly gate, one timestamp per kind
        self._last_limb_sched: dict[str, float] = {}
        # 2 threads: a timed-out (unkillable) handler must not starve the
        # next job.  Job execution itself stays serial-by-convention.
        self._pool = ThreadPoolExecutor(max_workers=2,
                                        thread_name_prefix="atlas-worker")

    # -- signals -------------------------------------------------------- #
    def install_signal_handlers(self) -> None:
        for sig in (signal.SIGTERM, signal.SIGINT):
            try:
                signal.signal(sig, self._handle_signal)
            except (ValueError, OSError):  # non-main thread / unsupported
                log.warning("could not install handler for %s", sig)

    def _handle_signal(self, signum, _frame) -> None:
        """SIGTERM/SIGINT: request a graceful stop (finish current job)."""
        self.last_signal = int(signum)
        log.info("worker %s received signal %s — draining", self.worker_id,
                 signum)
        self.stop_event.set()

    # -- job execution --------------------------------------------------- #
    def run_job(self, job: dict) -> None:
        """Execute one claimed job with timeout + error capture."""
        jid, kind = job["id"], job["kind"]
        if not _guard_heavy(kind, jid) or not _guard_send_window(kind, jid):
            self._current = None
            return
        self._current = job
        handler = self.handlers.get(kind)
        try:
            if handler is None:
                jobs.fail(jid, f"no handler registered for kind {kind!r}",
                          permanent=True)  # retrying a typo kind never helps
                return
            try:
                future = self._pool.submit(handler, job.get("payload") or {})
                result = future.result(timeout=JOB_TIMEOUT_S)
            except _FutureTimeout:
                jobs.fail(jid, f"timeout after {JOB_TIMEOUT_S:.0f}s")
                log.error("job %s (%s) timed out", jid, kind)
                return
            except Exception:
                import traceback
                jobs.fail(jid, traceback.format_exc())
                log.exception("job %s (%s) failed", jid, kind)
                return
            jobs.complete(jid, result)
            log.info("job %s (%s) done: %s", jid, kind,
                     str(result)[:200])
        except Exception:
            # Queue I/O itself broke (DB down): log loud, keep the loop alive.
            log.exception("queue bookkeeping failed for job %s", jid)
        finally:
            self._current = None

    # -- weekly digest scheduling ---------------------------------------- #
    def _sched_weekly_digest_tick(self) -> None:
        """At most once per DIGEST_SCHED_CHECK_S: enqueue today's
        weekly_digest attempt.  Only when this worker actually runs that
        handler (custom registries in tests / single-purpose workers never
        touch the queue for it).  Never raises."""
        if "weekly_digest" not in self.handlers:
            return
        now = time.monotonic()
        if now - self._last_digest_sched < DIGEST_SCHED_CHECK_S:
            return
        self._last_digest_sched = now
        jid = maybe_enqueue_weekly_digest()
        if jid:
            log.info("scheduled weekly digest attempt %s", jid)

    # -- daily digest-limb scheduling ------------------------------------- #
    def _sched_digest_limbs_tick(self) -> None:
        """At most once per DIGEST_SCHED_CHECK_S per limb: enqueue today's
        daily_nudge / renewal_notice attempts.  Only for handlers this
        worker actually runs (custom registries in tests / single-purpose
        workers never touch the queue for them).  Never raises."""
        if not any(k in self.handlers for k in DAILY_BATCH_KINDS):
            return
        now = time.monotonic()
        for kind in DAILY_BATCH_KINDS:
            if kind not in self.handlers:
                continue
            if now - self._last_limb_sched.get(kind, 0.0) \
                    < DIGEST_SCHED_CHECK_S:
                continue
            self._last_limb_sched[kind] = now
            jid = maybe_enqueue_daily_limb(kind)
            if jid:
                log.info("scheduled %s attempt %s", kind, jid)

    # -- loop ------------------------------------------------------------ #
    def poll_once(self) -> bool:
        """Claim + run at most one job.  Returns True if a job was run."""
        if self.stop_event.is_set():
            return False
        job = jobs.claim(self.worker_id)
        if job is None:
            return False
        self.run_job(job)
        return True

    def run_loop(self, poll_seconds: float | None = None) -> int:
        """Claim-execute-sleep until stopped.  Returns jobs processed.

        Graceful: a set stop_event prevents NEW claims; the in-flight job
        (claimed before the signal) always runs to completion.
        """
        poll = float(poll_seconds if poll_seconds is not None
                     else POLL_SECONDS)
        processed = 0
        jobs.init_queue()
        requeued = jobs.requeue_stale(STALE_AFTER_S)
        if requeued:
            log.warning("requeued %d stale job(s)", requeued)
        log.info("worker %s up (poll=%.1fs, timeout=%.0fs)", self.worker_id,
                 poll, JOB_TIMEOUT_S)
        while not self.stop_event.is_set():
            try:
                self._sched_weekly_digest_tick()
                self._sched_digest_limbs_tick()
                did = self.poll_once()
            except Exception:
                log.exception("poll cycle failed; sleeping and retrying")
                did = False
            if not did:
                # Sleep interruptibly so SIGTERM exits within ~0.1s.
                if self.stop_event.wait(poll):
                    break
                continue
            processed += 1
        log.info("worker %s stopped after %d job(s)", self.worker_id,
                 processed)
        return processed


def main() -> int:
    logging.basicConfig(
        level=os.environ.get("LOG_LEVEL", "INFO"),
        format="%(asctime)s %(levelname)-7s %(name)s: %(message)s")
    worker = Worker()
    worker.install_signal_handlers()
    try:
        worker.run_loop()
        return 0
    except Exception:
        log.exception("worker crashed")
        return 1
    finally:
        worker._pool.shutdown(wait=False)


if __name__ == "__main__":
    sys.exit(main())
