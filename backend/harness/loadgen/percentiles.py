"""percentiles.py — latency statistics for the load generator.

Pure functions, no I/O: deliberately tiny so the percentile math can be
proven in-test against known distributions (test_loadgen_smoke.py) before
any real numbers are trusted.

Convention: NEAREST-RANK percentiles on the sorted sample list —
p X is the value at index ceil(X/100 * N) (1-based).  For N=100 samples
1..100 this gives p50=50 and p95=95 exactly, which is the property the
tests pin down.
"""

from __future__ import annotations

import math
from typing import Dict, Iterable, List, Sequence

DEFAULT_PCTS = (50, 75, 95, 99)


def nearest_rank(sorted_values: Sequence[float], pct: float) -> float:
    """Nearest-rank percentile of an ALREADY-SORTED sequence.

    pct=0 -> minimum, pct=100 -> maximum.  Raises ValueError on an empty
    sequence (silent zeros have a way of becoming dashboards).
    """
    if not sorted_values:
        raise ValueError("nearest_rank() needs at least one sample")
    if pct <= 0:
        return sorted_values[0]
    if pct >= 100:
        return sorted_values[-1]
    rank = math.ceil((pct / 100.0) * len(sorted_values))
    idx = max(0, min(len(sorted_values) - 1, rank - 1))
    return float(sorted_values[idx])


def percentiles(
    values: Iterable[float], pcts: Sequence[float] = DEFAULT_PCTS
) -> Dict[float, float]:
    """Nearest-rank percentiles of an unsorted sample collection."""
    sorted_vals: List[float] = sorted(float(v) for v in values)
    return {p: nearest_rank(sorted_vals, p) for p in pcts}


def summarize(
    samples_ms: Iterable[float],
    *,
    errors: int = 0,
    window_seconds: float | None = None,
    pcts: Sequence[float] = DEFAULT_PCTS,
) -> Dict[str, float]:
    """One endpoint's latency/error block: count, mean, max, p50..p99,
    error rate and (optionally) achieved rps over ``window_seconds``."""
    vals: List[float] = [float(v) for v in samples_ms]
    count = len(vals)
    if count == 0:
        out: Dict[str, float] = {
            "requests": 0,
            "errors": float(errors),
            "error_rate": 1.0 if errors else 0.0,
            "mean_ms": 0.0,
            "max_ms": 0.0,
        }
        for p in pcts:
            out[f"p{p:g}_ms"] = 0.0
        if window_seconds:
            out["rps"] = 0.0
        return out

    pcts_map = percentiles(vals, pcts)
    total_err = float(errors)
    out = {
        "requests": count,
        "errors": total_err,
        "error_rate": total_err / count if count else 0.0,
        "mean_ms": sum(vals) / count,
        "max_ms": max(vals),
    }
    for p, v in pcts_map.items():
        out[f"p{p:g}_ms"] = v
    if window_seconds and window_seconds > 0:
        out["rps"] = count / window_seconds
    return out
