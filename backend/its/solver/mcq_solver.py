"""mcq_solver.py -- option verification for numeric MCQs.

Many bank questions carry their options inline ("(a) 0.0001 (b) 0.001 ...")
and are otherwise computable stems.  The zero-wrong-answer way to answer
them deterministically:

  1. parse >= 3 numeric options (fewer risks false positives),
  2. solve the stem with the ordinary pipeline,
  3. promote to VERIFIED only if EXACTLY ONE option matches the computed
     value within tolerance; zero or two-plus matches stays guided.

A stem that does not compute can never be promoted, and a wrong engine
answer can never be promoted either (it would not match any option --
it just stays guided).
"""

from __future__ import annotations

import re
from typing import Dict, Optional, Tuple

_NUM = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"
_VAL = (r"(" + _NUM + r")(?:\s*/\s*(" + _NUM + r")|"
        r"\s*[eE]\s*([+-]?\d+)|\s*x\s*10\s*(?:\^|\*\*)?\s*([+-]?\d+))?")

# option enumerators used by CBSE/ICSE banks: (a) A) a. A. [a]
_OPT_SEP = r"(?:\(\s*([a-dA-D])\s*\)|\[?\b([a-dA-D])[\)\.\]]\s*)"

_MCQ_OPTIONS = re.compile(
    _OPT_SEP + r"\s*(?:" + chr(8364) + r"|\brs\.?\s*|Rs\.?\s*)?" + _VAL,
    re.I)

_STEM_STRIP = re.compile(
    r"(\(" + r"\s*[a-dA-D]\s*\)|\b[a-dA-D][\)\.])(?!\w)", re.I)

_TOL_REL = 0.01  # option match tolerance (1%)


def _parse_value(groups) -> Optional[float]:
    """groups = (base, frac_den, e_exp, x10_exp) from _VAL."""
    base_s, frac_s, e_s, x10_s = groups
    if base_s is None:
        return None
    try:
        base = float(base_s.replace(",", ""))
    except ValueError:
        return None
    if frac_s is not None:
        den = float(frac_s.replace(",", ""))
        if den == 0:
            return None
        return base / den
    if e_s is not None:
        return base * (10.0 ** int(e_s))
    if x10_s is not None:
        return base * (10.0 ** int(x10_s))
    return base


def parse_numeric_options(text: str) -> Optional[Dict[str, float]]:
    """Extract letter -> value options; None when this is not a numeric MCQ."""
    opts: Dict[str, float] = {}
    for m in _MCQ_OPTIONS.finditer(text):
        letter = (m.group(1) or m.group(2) or "").lower()
        if not letter:
            continue
        g = m.groups()[2:]  # skip letter groups
        g = (g[0], g[1], g[2], g[3])
        v = _parse_value(g)
        if v is None:
            continue
        opts.setdefault(letter, v)
    if len(opts) < 3:
        return None
    return opts


def split_stem(text: str) -> Tuple[str, bool]:
    """Cut the stem at the first option marker."""
    m = re.search(r"(\(\s*[a-dA-D]\s*\)|\b[a-dA-D][\)\.]\s+)", text)
    if not m:
        return text, False
    return text[:m.start()].strip(), True


def match_options(value: float, opts: Dict[str, float],
                  tol: float = _TOL_REL) -> Tuple[str, int]:
    """Return (letters, count) of options within tolerance of value."""
    hits = []
    for letter, ov in opts.items():
        ref = abs(ov) if ov != 0 else 1.0
        if abs(value - ov) <= tol * ref:
            hits.append(letter)
    return ",".join(sorted(hits)), len(hits)


def try_mcq(text: str, solve) -> Optional[object]:
    """Attempt MCQ option verification.

    solve: callable(stem) -> PipelineResult from answer_pipeline (the core
    solver, without MCQ re-entry).  Returns a promotion dict or None:

        {"option": "b", "value": <float>, "core": <PipelineResult>}
    """
    opts = parse_numeric_options(text)
    if opts is None:
        return None
    stem, _ = split_stem(text)
    if len(stem) < 30:
        return None
    core = solve(stem)
    if core is None or core.label != "VERIFIED" or core.numeric is None:
        return None
    letters, n = match_options(core.numeric, opts)
    if n != 1:
        return None
    letter = letters
    return {"option": letter, "value": opts[letter], "core": core}
