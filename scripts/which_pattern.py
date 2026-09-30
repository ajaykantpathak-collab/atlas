#!/usr/bin/env python3
"""
Name the pattern that CLAIMS a question, and why it produced what it did.

"the answer is wrong" is not actionable. This walks ALL_PATTERNS in the exact
order the solver tries them and reports, for a given question:
  * which patterns .match(), in order  -> who wins
  * the winning pattern's formula, answer_template, extracted variables
  * whether its value is concrete
so a wrong answer points at a file and line instead of a mystery.

Usage:
    python scripts/which_pattern.py "If cos(A) = 24/26, find sec(A)"
    python scripts/which_pattern.py --file bad_questions.txt
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))


def report(question: str) -> None:
    from backend.ai.nlp_parser import parse_question
    from backend.ai.structural_patterns import ALL_PATTERNS
    from backend.ai import pattern_solver as ps

    parsed = parse_question(question)
    print(f"\nQ: {question!r}")
    hits = []
    for idx, pattern in enumerate(ALL_PATTERNS):
        try:
            if pattern.match(parsed):
                hits.append((idx, pattern))
        except Exception:
            continue
    if not hits:
        print("   no pattern matched (falls through to the generic funnel)")
        return

    print(f"   {len(hits)} pattern(s) matched; the FIRST one wins:")
    for rank, (idx, pattern) in enumerate(hits[:4]):
        cls = type(pattern)
        try:
            line = Path(ps.__file__).resolve()  # placeholder, replaced below
        except Exception:
            line = None
        import inspect
        try:
            src_file = inspect.getsourcefile(cls)
            _l, lineno = inspect.getsourcelines(cls)
            where = f"{Path(src_file).name}:{lineno}"
        except Exception:
            where = "?"
        print(f"     [{rank}] #{idx} {cls.__name__}  ({where})  concept={getattr(cls, 'concept', '?')!r}")
        if rank > 0:
            break  # only the winner matters, plus a peek at the runner-up
        try:
            extracted = pattern.extract(parsed, question)
            print(f"          matched={getattr(extracted, 'matched', None)} "
                  f"missing={dict(getattr(extracted, 'missing', {}) or {})}")
            print(f"          formula={getattr(extracted, 'formula', None)!r}")
            print(f"          answer_template={getattr(extracted, 'answer_template', None)!r}")
            print(f"          variables={dict(getattr(extracted, 'variables', {}) or {})}")
        except Exception as exc:
            print(f"          extract() raised {type(exc).__name__}: {exc}")

    # What the solver actually returns for it.
    r = ps.solve(question)
    print(f"   solve() -> matched={getattr(r, 'matched', None)} "
          f"type={getattr(r, 'question_type', None)!r} "
          f"answer={str(getattr(r, 'answer', None))[:90]!r}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("question", nargs="*")
    ap.add_argument("--file")
    args = ap.parse_args()
    if args.file:
        for line in Path(args.file).read_text(encoding="utf-8").splitlines():
            if line.strip():
                report(line.strip())
    else:
        # nargs="*" splits on spaces, so rejoin: the question is ONE argument.
        report(" ".join(args.question))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
