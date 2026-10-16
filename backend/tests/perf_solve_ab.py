"""perf_solve_ab.py — PERF agent (2026-10-03) solve-path before/after A/B.

Measures the effect of the reuse-first-pass fix (_model_problem_cached,
lru_cache + QA-R1 first_pass reuse in its/solver/modeling_layer.py) on the
REAL answer_pipeline.answer() over the 20 corpus bank questions.

  variant FIX  : shipped code — model_problem memoized (lru_cache 512).
  variant NOFIX: pre-fix emulation — model_problem patched to the uncached
                 registry sweep, so EVERY _independent_sweep call (lane A,
                 full sweep, hop-guard, lane C — 4 sites per request) pays
                 the full registry cost, exactly as before the fix.

Both variants run in the SAME process, warm (one dummy answer first), same
ambient load -> the delta is the fix's effect on the solve path.

Run (host, anaconda python):
  cd D:\\platform\\deploy
  set PYTHONPATH=D:\\platform\\deploy
  python backend\\tests\\perf_solve_ab.py --json backend\\tests\\perf_results\\solve_ab.json
"""

from __future__ import annotations

import argparse
import json
import os
import statistics
import sys
import time
from pathlib import Path

sys.path.insert(0, r"D:\platform\deploy")
os.environ.setdefault("CUDA_VISIBLE_DEVICES", "-1")

from backend.harness.loadgen.corpus import QUESTIONS          # noqa: E402
from backend.its.solver import modeling_layer as ml           # noqa: E402
from backend.its.solver.answer_pipeline import answer         # noqa: E402


def run_variant(label: str, questions: list) -> dict:
    """Run the question set TWICE; report the second pass (steady state).

    Pass 1 absorbs per-text lazy compiles and cache fills; pass 2 is the
    production-realistic steady state for repeat traffic."""
    tiers = {}
    for pass_no in (1, 2):
        per_q = []
        t_all = time.perf_counter()
        for i, q in enumerate(questions):
            t0 = time.perf_counter()
            try:
                res = answer(q["text"], q.get("node_id"))
                ms = (time.perf_counter() - t0) * 1000.0
                tier = getattr(res, "label", "") or str(getattr(res, "tier", "?"))
            except Exception as exc:  # keep going; record the failure
                ms = (time.perf_counter() - t0) * 1000.0
                tier = f"ERROR:{type(exc).__name__}"
            per_q.append(round(ms, 1))
            if pass_no == 2:
                tiers[tier] = tiers.get(tier, 0) + 1
            if pass_no == 2:
                print(f"  [{label}] q{i:02d}: {ms:8.1f} ms  {tier}", flush=True)
        total = (time.perf_counter() - t_all) * 1000.0
        if pass_no == 1:
            print(f"  [{label}] pass1 (warm/fill) total {total:.0f} ms",
                  flush=True)
    return {
        "variant": label,
        "n": len(per_q),
        "total_ms": round(total, 1),
        "mean_ms": round(statistics.mean(per_q), 1),
        "median_ms": round(statistics.median(per_q), 1),
        "p95_ms": round(sorted(per_q)[max(0, int(0.95 * len(per_q)) - 1)], 1),
        "max_ms": round(max(per_q), 1),
        "tiers": tiers,
        "per_q_ms": per_q,
    }


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", default=None)
    ap.add_argument("--repeat", type=int, default=1,
                    help="repeat passes per variant (default 1)")
    args = ap.parse_args(argv)

    questions = [dict(q) for q in QUESTIONS]

    print("warm-up answer (lazy dispatcher/regex/verifier compile) ...",
          flush=True)
    t0 = time.perf_counter()
    answer("A train travels 120 km in 2 hours. What is its average speed in km/h?",
           None)
    print(f"  warm-up answer took {(time.perf_counter()-t0)*1000:.0f} ms",
          flush=True)
    # warm the NODE lane too (first node_id fetch loads the node-graph
    # index from disk — one-time; must not land in either variant pass)
    t0 = time.perf_counter()
    answer(questions[0]["text"], questions[0].get("node_id"))
    print(f"  node-lane warm answer took {(time.perf_counter()-t0)*1000:.0f} ms",
          flush=True)
    # warm the GUIDED families (q06/q08/q19 run heavy CAS machinery whose
    # first-hit compile must not land in whichever variant runs first)
    for idx in (6, 8, 19):
        t0 = time.perf_counter()
        answer(questions[idx]["text"], questions[idx].get("node_id"))
        print(f"  guided warm q{idx} took {(time.perf_counter()-t0)*1000:.0f} ms",
              flush=True)

    results = []
    for rep in range(args.repeat):
        # NOFIX first on flipped runs (env FLIP=1): cancels first-hit-compile
        # bias so neither variant systematically absorbs lazy warm costs.
        if os.environ.get("FLIP") == "1":
            orig = ml.model_problem
            ml.model_problem = ml._model_problem_uncached
            try:
                results.append(run_variant(f"NOFIX_r{rep}", questions))
            finally:
                ml.model_problem = orig
            ml._model_problem_cached.cache_clear()
            results.append(run_variant(f"FIX_r{rep}", questions))
            continue
        # FIX: shipped memoized entry — make sure the cache is hot/cleared
        # consistently at pass start (repeat texts then measure the true
        # steady-state, which is what production serves).
        ml._model_problem_cached.cache_clear()
        results.append(run_variant(f"FIX_r{rep}", questions))

        # NOFIX: emulate pre-fix — every sweep runs the full registry.
        orig = ml.model_problem
        ml.model_problem = ml._model_problem_uncached
        try:
            results.append(run_variant(f"NOFIX_r{rep}", questions))
        finally:
            ml.model_problem = orig

    print("\n=== A/B SUMMARY (answer_pipeline.answer, 20 corpus questions) ===")
    for r in results:
        print(f"{r['variant']:<10} total {r['total_ms']:>9.1f} ms   "
              f"mean {r['mean_ms']:>8.1f}  median {r['median_ms']:>8.1f}  "
              f"p95 {r['p95_ms']:>8.1f}  max {r['max_ms']:>9.1f}  tiers {r['tiers']}")

    if args.json:
        Path(args.json).parent.mkdir(parents=True, exist_ok=True)
        Path(args.json).write_text(json.dumps(results, indent=1),
                                   encoding="utf-8")
        print(f"json -> {args.json}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
