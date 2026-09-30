"""Extra sizing: how many formulas exist BEYOND the compute-tagged set?

`formula_evaluability.py` answers "how much can one generic engine solve?"
and it filters on `solution_type == 'compute'` first. That filter is itself
suspect: `solution_type` is MISSING on ~68% of concepts, so any concept that
carries a perfectly good formula but no type tag was being counted as nothing.

This reports both populations:

    compute-tagged        the original, deliberately narrow denominator
    formula present       EVERY concept carrying a formula, tagged or not

Usage: python scripts/formula_inventory.py
"""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CORPUS = ROOT / "backend" / "its" / "questions" / "generated"

ASSIGN = re.compile(r"^[A-Za-z_][A-Za-z_0-9]*\s*=\s*[^=<>;]{3,160}$")
PROSE_TAIL = re.compile(
    r"(?:,\s*where\b.*$)|(?:;.*$)|(\s+where\b.*$)|(\s+after\b.*$)",
    re.IGNORECASE | re.DOTALL,
)
BLOCKERS = re.compile(
    r"\b(if|where|then|implies|only|after|before|maximum|minimum|"
    r"simplif\w*|terminating)\b", re.IGNORECASE)


def evaluable(formula: str) -> bool:
    text = (formula or "").strip()
    if not text:
        return False
    text = PROSE_TAIL.sub("", text).strip()
    if not text or BLOCKERS.search(text):
        return False
    if "=" not in text:
        return False
    lhs, _, rhs = text.partition("=")
    if not lhs.strip() or not rhs.strip() or "=" in rhs:
        return False
    return bool(re.fullmatch(r"[A-Za-z_][A-Za-z_0-9]*", lhs.strip()))


def main() -> int:
    concepts = 0
    has_type = 0
    has_formula = 0
    eval_formula = 0
    untagged_with_evaluable = 0
    by_type = Counter()
    eval_by_type = Counter()

    for path in CORPUS.glob("catalog_*.json"):
        try:
            data = json.loads(path.read_text(encoding="utf-8", errors="ignore"))
        except (json.JSONDecodeError, OSError):
            continue
        for concept in data.get("concepts") or []:
            concepts += 1
            stype = concept.get("solution_type")
            if stype:
                has_type += 1
            by_type[str(stype)] += 1
            if concept.get("formula"):
                has_formula += 1
                if evaluable(str(concept["formula"])):
                    eval_formula += 1
                    eval_by_type[str(stype)] += 1
                    if not stype:
                        untagged_with_evaluable += 1

    print(f"concepts (all)                : {concepts}")
    print(f"  have solution_type          : {has_type} ({100*has_type/concepts:.1f}%)")
    print(f"  have ANY formula            : {has_formula} ({100*has_formula/concepts:.1f}%)")
    print(f"  formula is machine-evaluable : {eval_formula} "
          f"({100*eval_formula/concepts:.1f}% of all concepts)")
    print()
    print(f"evaluable formulas on UNTAGGED concepts (invisible to the old count): "
          f"{untagged_with_evaluable}")
    print(f"  -> old headline (compute only) : {eval_by_type['compute']}")
    print(f"  -> real headroom               : {eval_formula}")
    print()
    print("evaluable formulas by solution_type:")
    for t, c in eval_by_type.most_common(8):
        print(f"  {c:>6}  {t}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
