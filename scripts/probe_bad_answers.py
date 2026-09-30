#!/usr/bin/env python3
"""Probe the specific corpus questions known to produce bad answers.

A 1,200-question lab tells you a count; this tells you WHY, one question at a
time, in seconds. Use it while fixing; use the lab to prove the fix.
"""
import importlib.util
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

CASES = [
    # a=11, d=8, nth term 123 -> n = (123-11)/8 + 1 = 15. Verified by
    # enumeration (11,19,...,115,123). This previously asserted "13", which
    # was arithmetically wrong: the solver was right, the expectation was the bug.
    ("How many terms are in the AP 11, 19, 27, ... up to 123", "15"),
    ("If cos(A) = 24/26, find sec(A). (give the fraction)", "13/12"),
    ("Given sin(A) = 12/20 and cos(A) = 16/20, find tan(A)", "3/4"),
    ("Point P divides the segment joining (0, 0) and (3, 6) in the ratio 1:2, find the x-coordinate of P", "1"),
    ("For a right triangle with legs 20 and 21 and hypotenuse, find the ratio of the smaller leg to the hypotenuse", "20/29"),
]

out_path = Path(r"D:\platform\_probe_out.log")
lines = []
from backend.ai.pattern_solver import solve

for q, expected in CASES:
    r = solve(q)
    got = str(getattr(r, "answer", None)) if r else None
    ok = bool(r and r.matched) and got is not None and expected.replace("/", "") in str(got).replace("/", "").replace(" ", "")
    lines.append(f"{'OK  ' if ok else 'BAD '} {q[:66]!r}")
    lines.append(f"      expected~{expected!r}  got={got!r}")
out_path.write_text("\n".join(lines), encoding="utf-8")
print("\n".join(lines))
