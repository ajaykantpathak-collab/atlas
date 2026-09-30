#!/usr/bin/env python3
"""Probe the YAML formula banks: how many, and of what shape?

`backend/its/formula_graph/builder.py` documents "6,062 formulas, 5,520 useful"
in `backend/formulas/**/*.yaml` (32 banks, ~3.3MB). The generic solver currently
sees only the 1,771 evaluable formulas carried on the question corpus's
concepts, so this measures what the bank adds.

Usage: python scripts/formula_bank_probe.py
"""
from __future__ import annotations

import sys
import time
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))


def main() -> int:
    from backend.its.formula_graph.builder import load_formulas

    t0 = time.time()
    formulas, failed = load_formulas(ROOT / "backend" / "formulas")
    print(f"loaded {len(formulas)} formulas in {time.time()-t0:.1f}s "
          f"({len(failed)} failed files)")

    banks = ROOT / "backend" / "formulas"
    print(f"yaml banks: {len(list(banks.rglob('*.yaml')))}")

    domains = Counter(getattr(f, "domain", "?") for f in formulas)
    print("\ntop domains:")
    for d, c in domains.most_common(12):
        print(f"  {c:>5}  {d}")

    with_expr = [f for f in formulas if getattr(f, "latex", None)]
    print(f"\nwith a latex/expression: {len(with_expr)}")

    print("\nsamples:")
    for f in formulas[:6]:
        print(f"  id={getattr(f, 'formula_id', '?')}")
        print(f"     name={str(getattr(f, 'name', ''))[:60]}")
        print(f"     expr={str(getattr(f, 'latex', ''))[:70]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
