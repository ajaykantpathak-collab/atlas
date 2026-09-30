#!/usr/bin/env python3
"""Prove the formula-bank lane works against the REAL 5,520-formula bank.

Fixtures prove the code shape; only the real bank proves the lane is worth
anything. This loads backend/formulas/**.yaml, reports how many entries are
actually solvable after LaTeX conversion, then asks questions the bank should
be able to answer.

Usage: python scripts/verify_formula_bank.py
"""
from __future__ import annotations

import importlib.util
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

spec = importlib.util.spec_from_file_location(
    "gs", str(ROOT / "backend" / "ai" / "generic_solver.py"))
gs = importlib.util.module_from_spec(spec)
sys.modules["gs"] = gs
spec.loader.exec_module(gs)

# Questions phrased the way a student would, using names that appear in the bank.
CASES = [
    "Using the population growth rate given N_initial = 100, "
    "N_final = 150, t = 5, find r",
    "Using ohm law given V = 12, R = 4, find I",
]


def main() -> int:
    t0 = time.time()
    bank = gs.get_formula_bank(build=True)
    print(f"bank warmed in {time.time()-t0:.1f}s: {len(bank)} solvable "
          f"entries (of 5,520 loaded)")

    failures = 0
    for question in CASES:
        cands = bank.candidates(question, limit=5)
        names = [c["name"] for c in cands[:3]]
        out = gs.solve_from_bank(question)
        ok = out.matched
        print(f"  {'OK  ' if ok else 'MISS'} {question[:62]!r}")
        print(f"        candidates={names}")
        if ok:
            print(f"        answer={out.answer!r} via {out.steps[0][:60]!r}")
        if not ok:
            failures += 1

    # A question with no math must be a miss, never a fabricated answer.
    junk = gs.solve_from_bank("Tell me about the French Revolution")
    print(f"  {'OK  ' if not junk.matched else 'FAIL'} unrelated question -> "
          f"{'miss' if not junk.matched else 'answered anyway'}")
    if junk.matched:
        failures += 1

    print("\nBANK LANE OK" if not failures else f"\n{failures} bank-lane issue(s)")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
