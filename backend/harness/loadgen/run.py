"""run.py — CLI entry point for the Atlas load generator (A5-HARDENING, Phase B).

Usage (post-ship, against the live stack — run by the coordinator):

  cd /d/platform/deploy   # any dir with `backend` importable works too
  python -m backend.harness.loadgen.run \
      --base http://localhost --ramp 50 --seconds 600 \
      --json backend/harness/load_baseline.json

Offline dry-run (no server needed — completes with 100% connect errors,
exit 0 because --fail-threshold 1 disables the error gate):

  python -m backend.harness.loadgen.run --base http://127.0.0.1:9 \
      --ramp 5 --seconds 30 --fail-threshold 1 --max-requests 500 \
      --json /tmp/loadgen_dryrun.json

Exit codes:  0 = ran clean   2 = steady error rate above --fail-threshold
             1 = generator itself crashed (bug — fix before trusting output)
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
import time
from pathlib import Path

# Direct-file invocation (python backend/harness/loadgen/run.py): put the
# deploy root on sys.path so `backend.harness.loadgen...` imports resolve.
if __package__ in (None, ""):
    sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

from backend.harness.loadgen.runner import (  # noqa: E402
    RunConfig,
    format_table,
    run_load,
)


def _parse_args(argv=None) -> argparse.Namespace:
    p = argparse.ArgumentParser(
        prog="backend.harness.loadgen.run",
        description="Mixed-workload load generator for the Atlas platform "
        "(70%% content GETs / 15%% solve / 10%% tutor / 5%% auth+progress).",
    )
    p.add_argument("--base", default="http://localhost",
                   help="base URL, e.g. http://localhost (default)")
    p.add_argument("--ramp", type=int, default=50,
                   help="worker pool size = target concurrency (default 50)")
    p.add_argument("--seconds", type=float, default=600.0,
                   help="wall-clock run budget (default 600)")
    p.add_argument("--think-time", type=float, default=0.05,
                   help="mean per-worker pause between iterations (default 0.05s)")
    p.add_argument("--timeout", type=float, default=15.0,
                   help="per-request client timeout (default 15s; solve uses 45s)")
    p.add_argument("--warmup-frac", type=float, default=0.10,
                   help="fraction of the run discarded as warm-up (default 0.10)")
    p.add_argument("--max-requests", type=int, default=0,
                   help="stop after N completed requests (0 = time-bounded only)")
    p.add_argument("--seed", type=int, default=None,
                   help="rng seed for a reproducible traffic mix")
    p.add_argument("--signup-budget", type=int, default=50,
                   help="max throwaway signup probes this run creates (default 50)")
    p.add_argument("--json", default=None, metavar="PATH",
                   help="write the load_baseline.json-shaped report here")
    p.add_argument("--fail-threshold", type=float, default=0.5,
                   help="exit 2 if steady error rate exceeds this (1.0 = never)")
    return p.parse_args(argv)


def main(argv=None) -> int:
    args = _parse_args(argv)
    cfg = RunConfig(
        base=args.base,
        ramp=max(1, args.ramp),
        seconds=max(0.5, args.seconds),
        think_time=max(0.0, args.think_time),
        timeout=max(1.0, args.timeout),
        warmup_frac=min(max(args.warmup_frac, 0.0), 0.9),
        max_requests=max(0, args.max_requests),
        seed=args.seed,
        signup_budget=max(0, args.signup_budget),
    )
    t0 = time.perf_counter()
    result = asyncio.run(run_load(cfg))
    table = format_table(result.report)
    print(table)

    json_path = args.json
    if json_path:
        path = Path(json_path)
        if path.parent and str(path.parent) not in ("", "."):
            os.makedirs(path.parent, exist_ok=True)
        path.write_text(
            json.dumps(result.report, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"\nreport written -> {path}")

    err_rate = result.report["summary"]["error_rate_steady"] or 0.0
    print(f"done in {time.perf_counter() - t0:.1f}s "
          f"(steady error rate {err_rate * 100:.2f}%)")
    if err_rate > args.fail_threshold:
        print(f"FAIL: steady error rate {err_rate:.3f} > threshold "
              f"{args.fail_threshold}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        raise SystemExit(130)
