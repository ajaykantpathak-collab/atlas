#!/usr/bin/env python3
"""
Deterministic-solver hit rate against REAL corpus questions, by subject.

Why this exists
---------------
`scripts/question_coverage.py` measures coverage statically from metadata
(41.4% of compute-tagged concepts are converted). That is a claim about
*intent*. This measures what the zero-cost layers actually do with the question
text that exists in the corpus right now.

It answers three questions, not one:
  1. MATCHED   - a deterministic layer produced an answer
  2. WRONG     - a deterministic layer produced an answer that DISAGREES with
                 the stored answer. This is the dangerous bucket: a confident
                 wrong answer is far worse than an honest fall-through, and
                 nothing else in the stack measures it.
  3. MISSED    - fell through to a later layer (possibly a paid LLM)

Only zero-cost layers are exercised:
  * backend.ai.pattern_solver   (spaCy + structural patterns + SymPy)
  * backend.ai.template_engine  (TemplateEngine, physics/numerical templates)
Deliberately NOT called: ComputeEngine.attempt_with_llm and Orchestrator, which
can reach a provider. This measures the free path only.

Usage:
    python scripts/smoke_subject_coverage.py --per-subject 25
    python scripts/smoke_subject_coverage.py --per-subject 25 --verbose
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

# subject -> filename fragment. "history" lives under `social` in this corpus.
# maths is included as the control: its concepts are marked
# `converted_to_compute: false` across the board, yet the free layers solve it
# correctly. That inversion is the whole point of running it.
SUBJECTS = {
    "maths": "maths",
    "physics": "physics",
    "chemistry": "chemistry",
    "history": "social",
}

NUM = re.compile(r"-?\d+(?:\.\d+)?")


def numeric_tokens(text: str) -> list[float]:
    return [float(m) for m in NUM.findall(str(text))]


def answers_agree(solver_answer: str, stored: str, rel_tol: float = 0.02):
    """True/False if comparable, None when the stored answer is not numeric.

    A miss must not be scored as WRONG, and a non-numeric stored answer (a
    history date, a definition) can only ever be a MISS here.
    """
    a = numeric_tokens(solver_answer)
    b = numeric_tokens(stored)
    if not b or not a:
        return None
    sa, sb = a[-1], b[-1]
    denom = max(abs(sb), 1e-9)
    return abs(sa - sb) / denom <= rel_tol


def load_questions(subject: str, per_subject: int):
    """-> [(question_text, stored_answer, concept_id)]"""
    out = []
    files = sorted(CORPUS.glob(f"catalog_*{SUBJECTS[subject]}*.json"))
    if not files:
        return out
    for path in files:
        if len(out) >= per_subject:
            break
        try:
            data = json.loads(path.read_text(encoding="utf-8", errors="ignore"))
        except (json.JSONDecodeError, OSError):
            continue
        for concept in data.get("concepts", []) or []:
            for q in concept.get("questions", []) or []:
                text, ans = q.get("q"), q.get("a")
                if text and ans is not None:
                    out.append((str(text), str(ans), str(concept.get("id", "?"))))
                if len(out) >= per_subject:
                    break
            if len(out) >= per_subject:
                break
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--per-subject", type=int, default=25)
    ap.add_argument("--verbose", action="store_true")
    args = ap.parse_args()

    t0 = time.time()
    from backend.ai.pattern_solver import solve as pattern_solve
    print(f"loaded pattern_solver in {time.time() - t0:.1f}s\n")

    try:
        from backend.ai.template_engine import TemplateEngine
    except Exception as exc:
        print(f"TemplateEngine unavailable: {exc}")
        TemplateEngine = None

    grand = Counter()
    for subject in SUBJECTS:
        rows = load_questions(subject, args.per_subject)
        if not rows:
            print(f"{subject.upper():<10} no questions found")
            continue
        tally = Counter()
        examples = {"MATCHED": [], "WRONG": [], "MISSED": []}
        for text, stored, cid in rows:
            got, layer = None, ""
            try:
                r = pattern_solve(text)
                if r is not None and getattr(r, "matched", False):
                    got, layer = str(getattr(r, "answer", "")), "pattern"
            except Exception:
                pass
            if got is None and TemplateEngine is not None:
                try:
                    if TemplateEngine.detect_numerical(text):
                        sol = TemplateEngine.solve(text, subject=subject)
                        if sol and getattr(sol, "matched", False):
                            got, layer = str(getattr(sol, "final_answer", "")), "template"
                except Exception:
                    pass

            if got is None:
                verdict = "MISSED"
            else:
                agree = answers_agree(got, stored)
                verdict = "MATCHED" if agree else "WRONG"
                if agree is None:
                    verdict = "MISSED"
            tally[verdict] += 1
            if len(examples[verdict]) < 3:
                examples[verdict].append(
                    f"[{layer or '-'}] Q={text[:56]!r} stored={stored!r}"
                    + (f" got={got!r}" if got else "")
                )
            if args.verbose and verdict != "MISSED":
                print(f"   {verdict:<7} {text[:58]!r} -> {got!r} (stored {stored!r})")

        total = sum(tally.values())
        grand.update(tally)
        print(f"{subject.upper():<10} matched {tally['MATCHED']}/{total}"
              f"   wrong {tally['WRONG']}   missed {tally['MISSED']}")
        for verdict in ("WRONG", "MATCHED", "MISSED"):
            for line in examples[verdict]:
                print(f"     {verdict:<7} {line}")
        print()

    total = sum(grand.values())
    print("=" * 66)
    if total:
        print(f"ALL SUBJECTS  matched {grand['MATCHED']}/{total} "
              f"({100*grand['MATCHED']/total:.1f}%)   "
              f"wrong {grand['WRONG']}   missed {grand['MISSED']}")
        if grand["WRONG"]:
            print(f"  !! {grand['WRONG']} confident-but-wrong answers. A wrong answer is")
            print("     worse than a fall-through: fix these before shipping the layer.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
