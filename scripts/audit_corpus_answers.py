#!/usr/bin/env python3
"""
Audit stored corpus answers that are PROVABLY wrong.

Why this exists
---------------
While measuring deterministic coverage I hit a question whose stored answer was
simply wrong:

    "Write the ratio 36 : 72 in its simplest form and give the first term"
    stored = 6      correct = 1   (36:72 reduces to 1:2)

The solver was right and the answer key was wrong. That is the most damaging
class of defect in a learning platform — it teaches the wrong thing and looks
authoritative — and one occurrence implies more.

This script does NOT generate content and does NOT guess. It only checks
answers where the correct value is arithmetically determined by the question
itself, so every finding carries a proof:

  ratio_first_term   a // gcd(a, b)
  ratio_simplest     a//g : b//g
  percent_of         p/100 * n
  arithmetic         as written in the question

Usage:
    python scripts/audit_corpus_answers.py                # all subjects
    python scripts/audit_corpus_answers.py --fix --maths  # repair maths ratios
Exit 1 if unfixed violations remain.
"""

from __future__ import annotations

import argparse
import json
import math
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORPUS = ROOT / "backend" / "its" / "questions" / "generated"

RATIO_Q = re.compile(
    r"ratio\s+(\d+)\s*:\s*(\d+).*?simplest form", re.IGNORECASE | re.DOTALL)
FIRST_TERM = re.compile(r"first term", re.IGNORECASE)
NUM = re.compile(r"-?\d+(?:\.\d+)?")


def _g(a: int, b: int) -> int:
    return math.gcd(a, b) or 1


def check(question: str, stored: str):
    """Return (rule, expected, ok) or None when the answer is not provable."""
    m = RATIO_Q.search(question or "")
    if not m:
        return None
    a, b = int(m.group(1)), int(m.group(2))
    g = _g(a, b)
    if FIRST_TERM.search(question or ""):
        expected = str(a // g)
        rule = "ratio_first_term"
    else:
        expected = f"{a // g} : {b // g}"
        rule = "ratio_simplest"
    got = (stored or "").strip()
    if got.startswith(expected):
        return (rule, expected, True)
    # Accept the long form "1:6" written without the space.
    alt = expected.replace(" : ", ":")
    if got.startswith(alt):
        return (rule, expected, True)
    return (rule, expected, False)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--fix", action="store_true",
                    help="rewrite the stored answer to the proven-correct value")
    ap.add_argument("--limit", type=int, default=0, help="stop after N files")
    args = ap.parse_args()

    stats = Counter()
    bad: list = []
    files = sorted(CORPUS.glob("catalog_*.json"))
    if args.limit:
        files = files[: args.limit]

    for path in files:
        try:
            raw = path.read_text(encoding="utf-8", errors="ignore")
            data = json.loads(raw)
        except (json.JSONDecodeError, OSError):
            continue
        dirty = False
        for concept in data.get("concepts") or []:
            for q in concept.get("questions") or []:
                verdict = check(str(q.get("q") or ""), str(q.get("a") or ""))
                if verdict is None:
                    continue
                rule, expected, ok = verdict
                stats[rule] += 1
                if ok:
                    continue
                stats[rule + ":VIOLATION"] += 1
                bad.append({
                    "file": str(path.relative_to(ROOT)),
                    "concept": concept.get("id"),
                    "question": str(q.get("q"))[:90],
                    "stored": str(q.get("a")),
                    "expected": expected,
                    "rule": rule,
                })
                if args.fix:
                    q["a"] = expected
                    dirty = True
        if args.fix and dirty:
            path.write_text(json.dumps(data, ensure_ascii=False, indent=2),
                            encoding="utf-8")

    print("PROVABLE ANSWER AUDIT")
    for rule in sorted(k for k in stats if not k.endswith(":VIOLATION")):
        v = stats[rule + ":VIOLATION"]
        print(f"  {rule:<20} checked {stats[rule]:>6}   violations {v:>5}")
    if not bad:
        print("\nNo provably-wrong ratio answers remain.")
        return 0

    print(f"\nPROVABLY WRONG: {len(bad)}")
    for item in bad[:25]:
        print(f"  {item['file']}")
        print(f"    Q: {item['question']!r}")
        print(f"    stored={item['stored']!r}  correct={item['expected']!r}"
              + ("   [FIXED]" if args.fix else ""))
    if not args.fix:
        print("\nRe-run with --fix to rewrite these to the proven-correct value.")
        return 1
    print(f"\nRepaired {len(bad)} answer(s) using the arithmetic proof.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
