#!/usr/bin/env python3
"""
Deep audit of the family map over ALL concepts, without ground truth.

WHY THIS EXISTS
---------------
The 2,427 unlabelled maths concepts have no family label to check against --
that absence is the whole reason map_families.py exists. So "accuracy" cannot
be measured directly. What CAN be measured honestly is whether each concept's
label is INTERNALLY CONSISTENT.

SPLIT-HALF VALIDATION
  Every concept holds several questions. Label it twice, independently:
      A = classify(questions[:k//2])
      B = classify(questions[k//2:])
  If the questions in a concept are homogeneous (which they should be, since
  a concept is one topic), A and B must agree. Disagreement means the label
  is riding on one or two incidental keywords -- exactly the failure mode that
  produced the ~55% first pass. Agreement is a real, falsifiable signal that
  does not require external labels.

ALSO REPORTED
  * confidence margin (top score minus runner-up); 0 means a coin flip
  * fallback usage (other_arithmetic / int_ops-by-rule)
  * the weakest concepts, printed with their questions for human review

Usage: python scripts/audit_family_map.py [--review 40]
"""
from __future__ import annotations

import argparse
import collections
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

from map_families import (  # noqa: E402
    GENERIC, LEX, RULES, ARITH, classify, iter_concepts, norm, score,
)


def labelled(qs):
    """classify() but also return the margin, so we can rank confidence."""
    for q in qs:
        for rx, fam in RULES:
            if rx.search(norm(q)):
                return fam, 99.0            # rule fired: treat as certain
    sc = collections.Counter()
    for q in qs:
        sc.update(score(q))
    specific = {f: v for f, v in sc.items() if f not in GENERIC}
    if not specific:
        if any(ARITH.match(q) for q in qs):
            return "int_ops", 2.0
        return "other_arithmetic", 0.0
    ranked = sorted(specific.values(), reverse=True)
    top = ranked[0]
    tied = [f for f, v in specific.items() if v == top]
    second = ranked[1] if len(ranked) > 1 else 0.0
    return min(tied), top - second


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--review", type=int, default=40)
    args = ap.parse_args()

    rows = list(iter_concepts("math"))
    n = len(rows)
    agree = 0
    tested = 0
    margins = []
    fallback = 0
    weak = []
    dist = collections.Counter()

    for f, c, qs in rows:
        full, margin = labelled(qs)
        dist[full] += 1
        margins.append(margin)
        if full in ("other_arithmetic",):
            fallback += 1
        k = len(qs)
        if k >= 4:
            half = k // 2
            a, _ = labelled(qs[:half])
            b, _ = labelled(qs[half:])
            tested += 1
            if a == b == full:
                agree += 1
            else:
                weak.append((str(c.get("id", "")), a, b, full, margin, qs))
        else:
            weak.append((str(c.get("id", "")), None, None, full, margin, qs))

    print("=" * 68)
    print("SPLIT-HALF VALIDATION  (all concepts, no ground truth needed)")
    print("=" * 68)
    print("concepts total            :", n)
    print("tested (>=4 questions)    :", tested)
    if tested:
        print("full-label agreed w/ both : %d  (%.1f%%)" % (
            agree, agree / tested * 100.0))
        print("DISAGREED (weak labels)   : %d  (%.1f%%)" % (
            tested - agree, (tested - agree) / tested * 100.0))
    print()
    print("fallback (other_arithmetic):", fallback,
          " (%.1f%%)" % (fallback / max(1, n) * 100))
    m_sorted = sorted(margins)
    print("confidence margin  min/med/max: %.1f / %.1f / %.1f" % (
        m_sorted[0], m_sorted[len(m_sorted) // 2], m_sorted[-1]))
    zero = sum(1 for m in margins if m == 0.0)
    print("zero-margin (coin flip)   :", zero,
          " (%.1f%%)" % (zero / max(1, n) * 100))
    print("families in use           :", len(dist))
    print()

    print("=" * 68)
    print("WEAKEST CONCEPTS FOR HUMAN REVIEW")
    print("=" * 68)
    weak.sort(key=lambda r: (r[4], str(r[3])))
    for cid, a, b, full, margin, qs in weak[:args.review]:
        split = ("A=%s B=%s" % (a, b)) if a and b else "(too few questions)"
        print("[margin %.1f] %-16s full=%-22s %s" % (margin, cid[:16], full, split))
        for q in qs[:3]:
            print("      -", q[:96])
    return 0


if __name__ == "__main__":
    sys.exit(main())
