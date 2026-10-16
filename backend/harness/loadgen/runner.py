"""runner.py — the asyncio engine behind the load generator.

Ramp design (why warm-up can't poison the percentiles):

  1. WARM-UP PHASE — the first ``warmup_frac`` (10%) of the run, clamped to
     [1s, 60s].  Workers start STAGGERED across this window (worker i starts
     at i/ramp of it), so cold caches / first-hit DB pools land here.
  2. STEADY PHASE — everything after warm-up.  Only steady-phase samples feed
     the endpoint percentile table and the rps/error-rate summary; warm-up
     samples are counted in meta for transparency but never mixed in.

Concurrency is a fixed pool of ``ramp`` asyncio workers, each looping
scenario -> think-time until the deadline (or a shared max-requests cap).

Only stdlib + httpx.  Tests inject an httpx.MockTransport via
``RunConfig.transport`` — no live server required.
"""

from __future__ import annotations

import asyncio
import platform
import random
import time
from dataclasses import dataclass, field
from typing import Dict, List, Optional

import httpx

from backend.harness.loadgen import scenarios as _scenarios
from backend.harness.loadgen.percentiles import summarize
from backend.harness.loadgen.scenarios import (
    LoadState,
    SCENARIO_WEIGHTS,
    SCENARIOS,
    pick_scenario,
)

PHASE_WARMUP = "warmup"
PHASE_STEADY = "steady"

# Statuses that are EXPECTED outcomes of probe scenarios, not service errors:
# 409 = signup probe for an existing email (probe falls back to login).
BENIGN_STATUSES = {409}


@dataclass
class RunConfig:
    base: str = "http://localhost"
    ramp: int = 50                # worker pool size (== target concurrency)
    seconds: float = 600.0        # wall-clock budget
    think_time: float = 0.05      # per-worker pause between iterations
    timeout: float = 15.0         # per-request client timeout
    warmup_frac: float = 0.10     # fraction of `seconds` discarded as warm-up
    warmup_min_s: float = 1.0     # floor on the warm-up window (0 disables)
    max_requests: int = 0         # hard cap on completed requests (0 = none)
    seed: Optional[int] = None    # rng seed for reproducible mixes
    signup_budget: int = 50       # throwaway signup probes per run
    transport: Optional[httpx.AsyncBaseTransport] = None  # tests: MockTransport


@dataclass
class Sample:
    phase: str        # warmup | steady
    endpoint: str     # endpoint template label
    ms: float
    status: int       # HTTP status, or -1 for transport failure
    t: float          # seconds since run start

    @property
    def ok(self) -> bool:
        return self.status >= 0 and (
            self.status < 400 or self.status in BENIGN_STATUSES
        )


@dataclass
class RunResult:
    samples: List[Sample] = field(default_factory=list)
    meta: Dict = field(default_factory=dict)
    report: Dict = field(default_factory=dict)


def _clamp(v: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, v))


async def run_load(cfg: RunConfig) -> RunResult:
    """Execute the mixed load and return raw samples + report dict."""
    if sum(SCENARIO_WEIGHTS.values()) != 100:
        raise ValueError("SCENARIO_WEIGHTS must sum to 100")

    started = time.perf_counter()
    warmup_s = _clamp(cfg.seconds * cfg.warmup_frac, cfg.warmup_min_s, 60.0)
    ramp_s = min(warmup_s, 30.0)
    deadline = started + max(0.5, cfg.seconds)

    samples: List[Sample] = []
    stop = asyncio.Event()

    def record(phase: str, t_rel: float):
        def _rec(endpoint: str, ms: float, status: int) -> None:
            samples.append(Sample(phase, endpoint, ms, status, t_rel))
            if cfg.max_requests and len(samples) >= cfg.max_requests:
                stop.set()
        return _rec

    async def worker(idx: int, client: httpx.AsyncClient, state: LoadState) -> None:
        # stagger worker starts across the ramp window (cold-start isolation)
        delay = (idx / max(1, cfg.ramp)) * ramp_s
        try:
            await asyncio.sleep(delay)
        except asyncio.CancelledError:
            return
        rng = state.rng
        while not stop.is_set():
            now = time.perf_counter()
            if now >= deadline:
                break
            phase = PHASE_WARMUP if now < started + warmup_s else PHASE_STEADY
            name = pick_scenario(rng)
            fn = SCENARIOS[name]
            t_rel = time.perf_counter() - started
            try:
                await fn(client, state, record(phase, t_rel))
            except Exception:  # scenario bug must never kill the worker
                record(phase, t_rel)(f"INTERNAL/{name}", 0.0, -1)
            await asyncio.sleep(cfg.think_time * rng.uniform(0.5, 1.5))

    async with httpx.AsyncClient(
        base_url=cfg.base,
        transport=cfg.transport,
        timeout=cfg.timeout,
        follow_redirects=False,
    ) as client:
        state = LoadState(
            rng=random.Random(cfg.seed),
            signup_budget=cfg.signup_budget,
        )
        workers = [
            asyncio.create_task(worker(i, client, state))
            for i in range(max(1, cfg.ramp))
        ]
        # Race workers against a deadline watcher: whichever ends first (all
        # workers done, max-requests reached, or the wall clock) ends the run.
        watcher = asyncio.create_task(_sleep_until(deadline - started))
        await asyncio.wait(
            list(workers) + [watcher], return_when=asyncio.FIRST_COMPLETED
        )
        stop.set()
        for t in workers:
            t.cancel()
        await asyncio.gather(*workers, return_exceptions=True)
        watcher.cancel()
        await asyncio.gather(watcher, return_exceptions=True)

    elapsed = time.perf_counter() - started
    steady_window = max(0.001, cfg.seconds - warmup_s)
    report = build_report(
        samples,
        base_url=cfg.base,
        ramp=cfg.ramp,
        seconds=cfg.seconds,
        warmup_seconds=round(warmup_s, 3),
        steady_window=steady_window,
        elapsed=round(elapsed, 3),
        seed=cfg.seed,
    )
    meta = report["meta"]
    meta["python"] = platform.python_version()
    meta["httpx"] = httpx.__version__
    return RunResult(samples=samples, meta=meta, report=report)


async def _sleep_until(delay: float) -> None:
    await asyncio.sleep(max(0.0, delay))


# --------------------------------------------------------------------------- #
# Report — the load_baseline.json shape
# --------------------------------------------------------------------------- #
def _endpoint_row(samples: List[Sample], steady_window: float) -> Dict:
    steady = [s for s in samples if s.phase == PHASE_STEADY]
    errs = sum(1 for s in steady if not s.ok)
    row = {
        "endpoint": steady[0].endpoint if steady else samples[0].endpoint,
        "requests": len(steady),
        "errors": errs,
        "error_rate": round(errs / len(steady), 6) if steady else None,
        "rps": round(len(steady) / steady_window, 4) if steady else 0.0,
    }
    stats = summarize(
        [s.ms for s in steady],
        errors=errs,
        window_seconds=steady_window if steady else None,
    )
    for key in ("p50_ms", "p75_ms", "p95_ms", "p99_ms", "mean_ms", "max_ms"):
        row[key] = round(stats[key], 3)
    return row


def build_report(
    samples: List[Sample],
    *,
    base_url: str,
    ramp: int,
    seconds: float,
    warmup_seconds: float,
    steady_window: float,
    elapsed: float,
    seed=None,
) -> Dict:
    """Assemble the load_baseline.json-shaped report (steady phase only)."""
    steady = [s for s in samples if s.phase == PHASE_STEADY]
    warmup_n = len(samples) - len(steady)

    by_endpoint: Dict[str, List[Sample]] = {}
    for s in steady:
        by_endpoint.setdefault(s.endpoint, []).append(s)

    endpoints = [
        _endpoint_row(rows, steady_window)
        for rows in by_endpoint.values()
    ]
    endpoints.sort(key=lambda r: -r["requests"])

    errs = sum(1 for s in steady if not s.ok)
    overall = summarize(
        [s.ms for s in steady], errors=errs, window_seconds=steady_window
    ) if steady else {}

    summary = {
        "requests_total": len(samples),
        "requests_steady": len(steady),
        "errors_steady": errs,
        "error_rate_steady": round(errs / len(steady), 6) if steady else None,
        "rps_steady": round(len(steady) / steady_window, 4),
        "p50_ms": round(overall.get("p50_ms", 0.0), 3),
        "p75_ms": round(overall.get("p75_ms", 0.0), 3),
        "p95_ms": round(overall.get("p95_ms", 0.0), 3),
        "p99_ms": round(overall.get("p99_ms", 0.0), 3),
    }

    return {
        "meta": {
            "tool": "backend.harness.loadgen",
            "base_url": base_url,
            "ramp": ramp,
            "seconds": seconds,
            "warmup_seconds": warmup_seconds,
            "elapsed_seconds": elapsed,
            "seed": seed,
            "warmup_samples": warmup_n,
            "scenario_weights": dict(SCENARIO_WEIGHTS),
        },
        "summary": summary,
        "endpoints": endpoints,
    }


# --------------------------------------------------------------------------- #
# Human table
# --------------------------------------------------------------------------- #
def format_table(report: Dict) -> str:
    eps = report.get("endpoints", [])
    s = report.get("summary", {})
    lines = [
        f"loadgen — {report['meta']['base_url']}  "
        f"(ramp={report['meta']['ramp']}, seconds={report['meta']['seconds']:g}, "
        f"warmup={report['meta']['warmup_seconds']:g}s)",
        f"steady: {s.get('requests_steady', 0)} reqs, "
        f"{s.get('rps_steady', 0):.1f} rps, errors "
        f"{s.get('errors_steady', 0)} ({(s.get('error_rate_steady') or 0) * 100:.2f}%)"
        f"  |  p50 {s.get('p50_ms', 0):.0f}ms  p95 {s.get('p95_ms', 0):.0f}ms"
        f"  p99 {s.get('p99_ms', 0):.0f}ms",
        "",
        f"{'endpoint':<46}{'reqs':>7}{'errs':>6}{'err%':>7}{'rps':>8}"
        f"{'p50':>8}{'p75':>8}{'p95':>9}{'p99':>9}",
        "-" * 108,
    ]
    for r in eps:
        err_pct = (r["error_rate"] or 0) * 100
        lines.append(
            f"{r['endpoint']:<46}{r['requests']:>7}{r['errors']:>6}"
            f"{err_pct:>6.1f}%{r['rps']:>8.1f}"
            f"{r['p50_ms']:>8.0f}{r['p75_ms']:>8.0f}{r['p95_ms']:>9.0f}{r['p99_ms']:>9.0f}"
        )
    if not eps:
        lines.append("(no steady-phase samples — run longer than the warm-up window)")
    return "\n".join(lines)
