"""solver_telemetry.py — per-solve telemetry loop + latency SLO (batch-3).

Continuous counters (verified / refused / family counts / latency) replacing
point-in-time audits. Thread-safe, in-process, zero dependencies. The
SLO check logs an alert line when the p95 of the last window exceeds the
budget — rigor must never cost responsiveness.
"""
from __future__ import annotations

import threading
import time
from collections import Counter, deque
from typing import Any, Dict

_LOCK = threading.Lock()
_LATENCY_WINDOW = deque(maxlen=500)          # last 500 solve latencies (ms)
_SLO_BUDGET_MS = 2000                        # per-solve budget (alert threshold)
_SLO_ALERT_COOLDOWN_S = 300
_last_slo_alert = 0.0

_FAMILY_COUNTS: Counter = Counter()
_STATUS_COUNTS: Counter = Counter()
_REFUSAL_REASONS: Counter = Counter()
_TOTALS = {"solves": 0, "verified": 0, "refused": 0, "withheld": 0}


def record(route: str, *, verified: bool = False, refused: bool = False,
           withheld: bool = False, refusal_reason: str = "",
           latency_ms: float = 0.0) -> None:
    """Record one solve. `route` is the family/structure id.
    verified=False + refused=False + withheld=False counts as UNKNOWN,
    NOT as verified (the independent-audit fix)."""
    global _last_slo_alert
    with _LOCK:
        _TOTALS["solves"] += 1
        if refused:
            _TOTALS["refused"] += 1
            _REFUSAL_REASONS[refusal_reason or "unspecified"] += 1
        elif withheld:
            _TOTALS["withheld"] += 1
        elif verified:
            _TOTALS["verified"] += 1
        else:
            _TOTALS.setdefault("unknown", 0)
            _TOTALS["unknown"] += 1
        _FAMILY_COUNTS[route or "unrouted"] += 1
        if latency_ms:
            _LATENCY_WINDOW.append(latency_ms)
            if len(_LATENCY_WINDOW) >= 50:
                p95 = _p95()
                now = time.time()
                if (p95 > _SLO_BUDGET_MS
                        and now - _last_slo_alert > _SLO_ALERT_COOLDOWN_S):
                    _last_slo_alert = now
                    import logging
                    logging.getLogger("solver.slo").warning(
                        '{"alert":"latency_slo_exceeded","p95_ms":%.0f,'
                        '"budget_ms":%d}', p95, _SLO_BUDGET_MS)


def _p95() -> float:
    if not _LATENCY_WINDOW:
        return 0.0
    vals = sorted(_LATENCY_WINDOW)
    return vals[int(len(vals) * 0.95) - 1] if len(vals) >= 20 else vals[-1]


def snapshot() -> Dict[str, Any]:
    """Live dashboard payload: verified/refused/family counts + latency."""
    with _LOCK:
        return {
            "totals": dict(_TOTALS),
            "latency": {"p50_ms": _pct(50), "p95_ms": _pct(95),
                        "budget_ms": _SLO_BUDGET_MS,
                        "window": len(_LATENCY_WINDOW)},
            "top_families": _FAMILY_COUNTS.most_common(10),
            "refusal_reasons": _REFUSAL_REASONS.most_common(5),
            "slo_breach_active": _p95() > _SLO_BUDGET_MS,
        }


def _pct(p: int) -> float:
    if not _LATENCY_WINDOW:
        return 0.0
    vals = sorted(_LATENCY_WINDOW)
    return vals[min(len(vals) - 1, int(len(vals) * p / 100))]
