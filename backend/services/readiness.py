"""readiness.py — liveness vs readiness, explicitly.

  /health (liveness):  is the process up?            -> compose restart gate
  /ready   (readiness): has THIS worker finished its
  heavy warm (nodes index, concept index, model)
  so it can serve student traffic without paying
  boot cost?                                          -> traffic-shaping gate

Design rule: /ready gates ONLY on process-local state.  External
dependencies (postgres/redis/qdrant/neo4j/clickhouse) are REPORTED in the
detail payload but never flip readiness — a dependency blip must not
restart-loop a healthy worker (that's what /health's own service checks are
for, and what the platform health page surfaces).
"""
from __future__ import annotations

import threading
import time
from typing import Any, Dict

_LOCK = threading.Lock()
_STATE: Dict[str, Any] = {
    "started_at": time.time(),
    "warm_done": False,
    "components": {},
}


def mark(component: str, ok: bool, detail: str = "") -> None:
    with _LOCK:
        _STATE["components"][component] = {
            "ok": bool(ok), "detail": detail[:120], "at": time.time()}
        if component in ("nodes_index", "concept_index", "model"):
            _STATE["warm_done"] = all(
                _STATE["components"].get(c, {}).get("ok")
                for c in ("nodes_index", "concept_index", "model"))


def snapshot() -> Dict[str, Any]:
    with _LOCK:
        snap = {
            "started_at": _STATE["started_at"],
            "uptime_s": round(time.time() - _STATE["started_at"], 1),
            "warm_done": bool(_STATE["warm_done"]),
            "components": dict(_STATE["components"]),
        }
    # live, cheap externals (reported, not gating)
    snap["externals"] = _probe_externals()
    return snap


def is_ready() -> bool:
    with _LOCK:
        return bool(_STATE["warm_done"])


def _probe_externals() -> Dict[str, bool]:
    out: Dict[str, bool] = {}
    try:
        from backend.database import get_sync_engine
        from sqlalchemy import text

        with get_sync_engine().connect() as cx:
            cx.execute(text("SELECT 1"))
        out["postgres"] = True
    except Exception:  # noqa
        out["postgres"] = False
    return out
