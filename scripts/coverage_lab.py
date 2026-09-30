#!/usr/bin/env python3
"""
Three-lane coverage lab, with a no-regression gate.

Runs the EXISTING deterministic path (pattern_solver) and the NEW generic lanes
(expression / formula / retrieval) over the same real corpus sample and reports
baseline vs generic matched/wrong, plus a per-lane breakdown.

THE GATE (the point of the script)
----------------------------------
`--gate` fails if the generic path is WORSE on either axis:

    generic.matched >= baseline.matched   AND   generic.wrong <= baseline.wrong

The defect class being fixed is "confident wrong answer", and adding three
solvers can easily trade one for a miss in reverse. Ground truth is the `a`
stored on each corpus question; nothing is trusted because the solver said so.

Usage:
    python scripts/coverage_lab.py --per-subject 40
    python scripts/coverage_lab.py --per-subject 40 --gate
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
CORPUS = ROOT / "backend" / "its" / "questions" / "generated"

SUBJECTS = {
    "maths": "maths", "physics": "physics", "chemistry": "chemistry",
    "history": "social", "biology": "biology", "accountancy": "accountancy",
}

NUM = re.compile(r"-?\d+(?:\.\d+)?")


def numbers(text) -> list:
    try:
        return [float(m) for m in NUM.findall(str(text))]
    except (TypeError, ValueError):
        return []


def agree(got, stored, rel_tol=0.02):
    """None when not comparable — a prose answer has no number to compare."""
    a, b = numbers(got), numbers(stored)
    if not a or not b:
        return None
    return abs(a[-1] - b[-1]) / max(abs(b[-1]), 1e-9) <= rel_tol


def load(fragment, per_subject):
    """A SPREAD sample, not the first N questions of the first file.

    The first version stopped as soon as it had `per_subject` rows, so for
    maths it only ever read the head of `catalog_class*_maths_ch101.json` —
    one question family (HCF/LCM). It then reported the expression lane as
    contributing 0 matches when its forms ("Solve for x: ...", "Find the value
    of the polynomial ...") appear further into the corpus. That is a sampling
    artefact, and reporting it as a fact about the lane would be wrong.
    """
    collected: list = []
    for path in sorted(CORPUS.glob(f"catalog_*{fragment}*.json"))[:60]:
        try:
            data = json.loads(path.read_text(encoding="utf-8", errors="ignore"))
        except (json.JSONDecodeError, OSError):
            continue
        for concept in data.get("concepts") or []:
            for q in concept.get("questions") or []:
                text, ans = q.get("q"), q.get("a")
                if text and ans is not None:
                    collected.append({
                        "q": str(text), "a": str(ans),
                        "formula": str(concept.get("formula") or ""),
                    })
    if not collected:
        return collected
    if len(collected) <= per_subject:
        return collected
    # Even stride across the whole subject so every question family appears.
    stride = max(1, len(collected) // per_subject)
    spread = collected[::stride][:per_subject]
    # Top up if the stride landed short.
    i = 0
    while len(spread) < per_subject and i < len(collected):
        if collected[i] not in spread:
            spread.append(collected[i])
        i += 1
    return spread


def classify_failure(got, stored):
    """Why did this answer miss? This IS the parser fix list.

    Naming the failure mode beats staring at hundreds of wrong answers and
    guessing which rule is missing.
    """
    g, s = str(got or ""), str(stored or "")
    if not g.strip():
        return "empty_answer"
    gn, sn = numbers(g), numbers(s)
    if gn and not sn:
        return "numeric_but_expected_prose"
    if not gn and sn:
        return "non_numeric_but_expected_number"
    if gn and sn:
        a, b = gn[-1], sn[-1]
        if b != 0 and abs(a - b) / abs(b) > 0.5:
            return "wrong_value_off_by_2x_or_more"
        return "wrong_value_small_delta"
    return "prose_mismatch"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--per-subject", type=int, default=40,
                    help="0 = every question in the corpus (slow, honest)")
    ap.add_argument("--gate", action="store_true")
    ap.add_argument("--skip-baseline", action="store_true",
                    help="skip pattern_solver; it runs ~26 q/s and otherwise "
                         "dominates runtime on a full-corpus run")
    ap.add_argument("--failures", type=int, default=0,
                    help="show N examples per failure mode")
    args = ap.parse_args()
    per = args.per_subject if args.per_subject > 0 else 10**9

    t0 = time.time()
    from backend.ai.generic_solver import ProseIndex, solve_all
    from backend.ai.pattern_solver import solve as pattern_solve
    print(f"imports in {time.time()-t0:.1f}s; building prose index...")

    t0 = time.time()
    index = ProseIndex.from_corpus()
    print(f"prose index: {len(index.entries)} entries in {time.time()-t0:.1f}s\n")

    base_tot, gen_tot, lanes = Counter(), Counter(), Counter()
    failure_modes = Counter()
    examples: dict = {}
    wrong_examples = []

    for subject, frag in SUBJECTS.items():
        rows = load(frag, per)
        if not rows:
            print(f"{subject.upper():<12} no questions")
            continue
        b, g = Counter(), Counter()
        for row in rows:
            # --- baseline: what the app serves today ---
            got = None
            if not args.skip_baseline:
                try:
                    r = pattern_solve(row["q"])
                    if r is not None and getattr(r, "matched", False):
                        got = str(getattr(r, "answer", ""))
                except Exception:
                    pass
            if got is None:
                b["missed"] += 1
            else:
                v = agree(got, row["a"])
                b["matched" if v else "wrong"] += 1
                if v is False and len(wrong_examples) < 6:
                    wrong_examples.append(
                        f"[{subject} BASELINE] {row['q'][:50]!r} "
                        f"stored={row['a']!r} got={got!r}")

            # --- generic: the three lanes ---
            out = solve_all(row["q"], formula=row["formula"], prose_index=index)
            if not out.matched:
                g["missed"] += 1
            else:
                if out.lane == "retrieval":
                    # HONEST SCORING. The prose index is built from the same
                    # corpus being tested, so a self-hit is leakage, not
                    # retrieval skill. Anything the index could have found by
                    # reading the answer key off the very question under test
                    # is DISCARDED, and the remaining hit must match the
                    # stored text rather than being waved through.
                    self_hit = out.answer.strip() == row["a"].strip()
                    if self_hit:
                        g["leaked"] += 1
                        continue
                    v = agree(out.answer, row["a"])
                else:
                    v = agree(out.answer, row["a"])
                g["matched" if v else "wrong"] += 1
                lanes[out.lane] += 1
                if v is False:
                    mode = classify_failure(out.answer, row["a"])
                    failure_modes[mode] += 1
                    if len(examples.setdefault(mode, [])) < max(args.failures, 3):
                        examples[mode].append(
                            f"  [{out.lane}] {row['q'][:74]!r}\n"
                            f"      stored={row['a']!r} got={out.answer!r}\n"
                            f"      formula={row['formula'][:64]!r}")
                if v is False and len(wrong_examples) < 12:
                    wrong_examples.append(
                        f"[{subject} {out.lane}] {row['q'][:50]!r} "
                        f"stored={row['a']!r} got={out.answer!r}")

        base_tot.update(b)
        gen_tot.update(g)
        tot = sum(b.values())
        print(f"{subject.upper():<12} baseline {b['matched']}/{tot} wrong {b['wrong']}"
              f"   |   generic {g['matched']}/{tot} wrong {g['wrong']}")

    print(f"\n{'='*72}")
    print(f"BASELINE  matched {base_tot['matched']}  wrong {base_tot['wrong']}  "
          f"missed {base_tot['missed']}")
    print(f"GENERIC   matched {gen_tot['matched']}  wrong {gen_tot['wrong']}  "
          f"missed {gen_tot['missed']}  leaked {gen_tot['leaked']}")
    print("by lane: " + (", ".join(f"{k}={v}" for k, v in lanes.most_common()) or "none"))
    if failure_modes:
        print("\nWRONG-ANSWER FAILURE MODES (this is the parser fix list):")
        for mode, count in failure_modes.most_common(12):
            print(f"  {count:>6}  {mode}")
        if args.failures:
            print("\nexamples:")
            for mode, lines in examples.items():
                print(f"--- {mode}")
                for line in lines:
                    print(line)
    if gen_tot["leaked"]:
        print("  ^ 'leaked' = the retrieval index already contained this exact")
        print("    question AND its answer. Self-lookups are not evidence.")
    if wrong_examples:
        print("\nWRONG ANSWERS (each is a student being misled):")
        for w in wrong_examples:
            print("  " + w)

    if args.gate:
        ok_m = gen_tot["matched"] >= base_tot["matched"]
        ok_w = gen_tot["wrong"] <= base_tot["wrong"]
        print(f"\nGATE  matched {'PASS' if ok_m else 'FAIL'} "
              f"({gen_tot['matched']} vs {base_tot['matched']})   "
              f"wrong {'PASS' if ok_w else 'FAIL'} "
              f"({gen_tot['wrong']} vs {base_tot['wrong']})")
        if not (ok_m and ok_w):
            return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
