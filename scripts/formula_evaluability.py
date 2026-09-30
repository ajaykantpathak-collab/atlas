#!/usr/bin/env python3
"""
How much of the compute-tagged corpus is machine-evaluable?

`question_coverage.py` counts concepts. This asks the different question that
decides the build: if we write ONE generic "parse the givens, evaluate the
stored formula" engine, what fraction of compute-tagged concepts could it
actually solve?

A formula is counted as evaluable-shaped if it is a single assignment
    <identifier> = <expression>
with no prose, no inequalities and no alternatives — i.e. something SymPy can
parse after substituting the `given` values parsed out of the question text.

This is a sizing measurement, not a solver. If the ratio is high, the generic
engine is the highest-leverage build; if it is low, per-family templates win.

Usage: python scripts/formula_evaluability.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORPUS = ROOT / "backend" / "its" / "questions" / "generated"

# identifier = expression, no prose / no '<' '>' / no ';'
ASSIGN = re.compile(r"^[A-Za-z_][A-Za-z_0-9]*\s*=\s*[^=<>;]{3,160}$")
# Things SymPy will choke on even though the shape matches.
BLOCKERS = re.compile(r"\b(if|where|when|after|simplif|only if|terminating|"
                      r"implies|then|unless|maximum|minimum)\b", re.IGNORECASE)


def main() -> int:
    total = 0
    shaped = 0
    evaluable = 0
    examples_shaped_bad: list[str] = []
    examples_good: list[str] = []

    for path in CORPUS.glob("catalog_*.json"):
        try:
            data = json.loads(path.read_text(encoding="utf-8", errors="ignore"))
        except (json.JSONDecodeError, OSError):
            continue
        for concept in data.get("concepts") or []:
            if concept.get("solution_type") != "compute":
                continue
            total += 1
            formula = str(concept.get("formula") or "").strip()
            if not formula or not ASSIGN.match(formula):
                continue
            shaped += 1
            if BLOCKERS.search(formula):
                if len(examples_shaped_bad) < 8:
                    examples_shaped_bad.append(formula)
                continue
            evaluable += 1
            if len(examples_good) < 12:
                examples_good.append(formula)

    pct = (100.0 * evaluable / total) if total else 0.0
    shaped_pct = (100.0 * shaped / total) if total else 0.0
    print(f"compute-tagged concepts      : {total}")
    print(f"assignment-shaped           : {shaped}  ({shaped_pct:.1f}%)")
    print(f"evaluable after blockers    : {evaluable}  ({pct:.1f}%)")
    print(f"\n=> a single generic formula engine could target ~{pct:.0f}% "
          f"of compute-tagged concepts.")
    if examples_good:
        print("\nlooks evaluable:")
        for e in examples_good:
            print(f"  {e}")
    if examples_shaped_bad:
        print("\nassignment-shaped but blocked:")
        for e in examples_shaped_bad:
            print(f"  {e}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
