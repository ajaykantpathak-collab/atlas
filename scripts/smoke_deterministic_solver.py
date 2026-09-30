#!/usr/bin/env python3
"""
Live smoke test for the DETERMINISTIC tutor path (no LLM, no DB, no Docker).

The point: `TutorService.quick_question` is a ~200KB six-layer funnel
(pattern_solver -> missing-value -> ComputeEngine -> TemplateEngine ->
Orchestrator -> RoutingService). Before optimising or extending it, prove the
zero-cost layers actually solve questions against TODAY'S data.

This imports and calls the real modules. It is intentionally separate from
pytest because it is slow (spaCy model load) and because importing
`backend.*` triggers the heavy package chain that crashes collection on this
box (see pytest.ini).

Usage:  python scripts/smoke_deterministic_solver.py
Exit 1 if no question is solved deterministically.
"""

from __future__ import annotations

import sys
import time
import traceback
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

CASES = [
    ("what is 15% of 200", "30"),
    ("solve 2x + 5 = 15", "5"),
    ("find the area of a circle with radius 7", None),
    ("calculate 45% of 360", "162"),
    ("what is 12 times 12", "144"),
    ("solve x squared equals 16", None),
    ("compute the hypotenuse of a 3 by 4 triangle", "5"),
]


def check() -> int:
    t0 = time.time()
    try:
        from backend.ai.pattern_solver import solve
    except Exception:
        print("IMPORT FAILED: backend.ai.pattern_solver")
        traceback.print_exc()
        return 2
    load_s = time.time() - t0
    print(f"import ok in {load_s:.1f}s\n")

    solved = 0
    for question, expected in CASES:
        t = time.time()
        try:
            result = solve(question)
        except Exception as exc:
            print(f"  ERROR  {question!r}: {type(exc).__name__}: {exc}")
            continue
        dt = (time.time() - t) * 1000
        if result is None or not getattr(result, "matched", False):
            print(f"  miss   {question!r}  ({dt:.0f}ms)")
            continue
        answer = getattr(result, "answer", None)
        qtype = getattr(result, "question_type", "?")
        solved += 1
        note = ""
        if expected is not None:
            try:
                ok = str(expected) in str(answer).replace(" ", "")
                note = "  [expected %s: %s]" % (
                    expected,
                    "OK" if ok else "MISMATCH",
                )
            except Exception:
                note = "  [could not compare]"
        print(f"  HIT    {question!r} -> {answer!r}  ({qtype}, {dt:.0f}ms){note}")

    total = len(CASES)
    print(f"\n{solved}/{total} solved deterministically, 0 LLM calls")
    if solved == 0:
        print("FAIL: the zero-cost path cannot solve anything today")
        return 1
    if solved < total:
        print(
            f"NOTE: {total - solved} question(s) fell through. That is the "
            "funnel working as designed (it degrades to the next layer), but "
            "it is also the exact traffic that reaches an LLM."
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(check())
