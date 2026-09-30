#!/usr/bin/env python3
"""
Size the authoring job: how many catalogue concepts are COMPUTATIONAL vs
DECLARATIVE?

WHY THIS MATTERS
----------------
The existing deterministic solver (backend/its/solver/formula_registry.py)
works by dimension matching: extract quantities with units -> find the formula
whose input dimensions are satisfied and whose output matches the asked
dimension -> apply -> validate. It explicitly states "No regex. No text
pattern matching."

That path only exists for questions that ASK FOR A VALUE. A question that
says "state the formula for the area of a circle" or "define a tangent"
has no dimensions to match and no value to compute -- the registry marks
such nodes `None` (conceptual) and they need retrieval instead.

So the catalogue cannot be routed until we know the split. This counts it.

CLASSIFICATION (deterministic, no LLM)
  COMPUTATIONAL : asks for a quantity -- find/compute/calculate/evaluate/
                  what is the value/verify by computing/solve
  DECLARATIVE   : asks for knowledge -- state/write/define/name/list/explain/
                  prove/why/is it/which of the following
  MIXED         : contains both (a concept whose questions are not uniform)

Usage: python scripts/split_computational.py
"""
from __future__ import annotations

import collections
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CORPUS = ROOT / "backend" / "its" / "questions"

COMPUTE_RE = re.compile(
    r"\b(find|compute|calculate|evaluate|determine|solve|write|verify by computing|"
    r"how many|how much|how far|what is the value|work out)\b", re.I)
DECLARE_RE = re.compile(
    r"\b(state|define|definition|name|list|explain|prove|why|"
    r"which of the following|what is the definition|give an example|"
    r"describe|justify|is it|true or false|why or why not)\b", re.I)


def kind_of(questions):
    comp = sum(1 for q in questions if COMPUTE_RE.search(q))
    decl = sum(1 for q in questions if DECLARE_RE.search(q))
    comp_only = comp > 0 and decl == 0
    decl_only = decl > 0 and comp == 0
    if comp_only:
        return "COMPUTATIONAL"
    if decl_only:
        return "DECLARATIVE"
    return "MIXED"


def main() -> int:
    stats = collections.Counter()
    per_half = collections.defaultdict(collections.Counter)
    examples = collections.defaultdict(list)
    total = 0

    for path in sorted(CORPUS.rglob("*.json")):
        if "math" not in path.name.lower():
            continue
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue
        for c in data.get("concepts", []):
            qs = [str(q["q"]) for q in (c.get("questions") or []) if q.get("q")]
            if not qs:
                continue
            total += 1
            k = kind_of(qs)
            stats[k] += 1
            half = "labelled(has family)" if c.get("family") else "unlabelled(text only)"
            per_half[half][k] += 1
            if len(examples[k]) < 4:
                examples[k].append(qs[0][:92])

    print("=" * 70)
    print("CATALOGUE QUESTION-TYPE SPLIT  (maths)")
    print("=" * 70)
    print("concepts with question text:", total)
    for k in ("COMPUTATIONAL", "DECLARATIVE", "MIXED"):
        v = stats[k]
        print("  %-14s %5d  (%5.1f%%)" % (k, v, v / max(1, total) * 100))
    print()
    for half, c in per_half.items():
        print(" ", half)
        for k, v in c.most_common():
            print("      %-14s %5d" % (k, v))
    print()
    for k in ("COMPUTATIONAL", "DECLARATIVE", "MIXED"):
        print("--- %s examples ---" % k)
        for e in examples[k]:
            print("   ", e)
    return 0


if __name__ == "__main__":
    sys.exit(main())
