"""prewarm.py — Wave 9.8 L3: session prewarm.

`prewarm_node(node_id, context)` enqueues a `session_prewarm` job on the
existing postgres job-queue seam (backend.workers.jobs.enqueue — the same
queue practice/worker jobs ride; there is no Redis queue in this stack).
The worker then runs the route-only step + bank lookup over the node's
top-50 bank stems so shared caches (structure route cache, centroids,
bank embedding npz) are warm before the student hits a hard stem.

Contract: fire-and-forget on the request path — NEVER awaited, NEVER
raised. When the queue (DB) is unavailable this is a silent no-op.
"""

from __future__ import annotations

import logging
import threading
import time

log = logging.getLogger(__name__)

_TOP_N = 50

# node prewarm is idempotent but each enqueue is a job row — cap repeats
# per process hour so a page-refresh loop can't flood the queue.
_SEEN: dict[str, float] = {}
_SEEN_LOCK = threading.Lock()
_SEEN_TTL_S = 3600.0


def prewarm_node(node_id: str, context: dict | None = None) -> None:
    """Fire-and-forget: enqueue the node prewarm job, swallow every
    failure. Callers never await and never see an exception."""
    try:
        if not node_id:
            return
        now = time.monotonic()
        with _SEEN_LOCK:
            last = _SEEN.get(node_id, 0.0)
            if now - last < _SEEN_TTL_S:
                return
            _SEEN[node_id] = now
        from backend.workers import jobs
        jobs.enqueue("session_prewarm",
                     {"node_id": node_id, "context": context or {}},
                     job_id=f"prewarm-{node_id}")
    except Exception as e:  # noqa: BLE001 — fire-and-forget contract
        log.debug("prewarm_node(%s) no-op: %s", node_id,
                  type(e).__name__)


def run_node_prewarm(node_id: str, context: dict | None = None,
                     top_n: int = _TOP_N) -> dict:
    """Worker-side body: route-only + bank lookup over the node's
    top-N bank stems. Pure warm — no serving decisions."""
    from sqlalchemy import text as _text
    from backend.its.solver.bank_answer import _engine, lookup
    from backend.its.solver.modeling_layer import model_problem
    started = time.monotonic()
    rows = []
    try:
        with _engine().connect() as cx:
            rows = list(cx.execute(_text(
                "SELECT id, question_text FROM board_questions "
                "WHERE board <> 'QUARANTINED' "
                "AND norm_text IS NOT NULL "
                "AND :nid = ANY(node_tags) "
                "ORDER BY id LIMIT :lim"),
                {"nid": node_id, "lim": top_n}))
    except Exception as e:  # noqa: BLE001
        log.warning("session_prewarm bank select failed: %s", e)
        return {"node_id": node_id, "stems": 0, "error": str(e)}
    warmed = 0
    for r in rows:
        try:
            model_problem(r.question_text or "")
        except Exception:  # noqa: BLE001
            pass
        try:
            lookup(r.question_text or "",
                   context={"board": (context or {}).get("board"),
                            "class_level": (context or {}).get(
                                "class_level"),
                            "subject": (context or {}).get("subject")})
        except Exception:  # noqa: BLE001
            pass
        warmed += 1
    return {"node_id": node_id, "stems": warmed,
            "elapsed_s": round(time.monotonic() - started, 1)}
