"""mcq_generator.py -- deterministic, misconception-tagged MCQ assembly.

Takes a VERIFIED computation -- slot values, a relation id and the
correct answer -- and emits a 4-option MCQ.  Every wrong option is
computed by replaying a NAMED student misconception against the same
numbers (no LLM, no randomness in the distractor math):

    conceptual           wrong formula / operation for the relation
    partial_computation  stopped after finishing only part of the chain
    sign_error           flipped the sign of a term (or of the result)
    inversion            divided or averaged where the relation adds
    unit_error           skipped or doubled a unit / percent conversion
    off_by_one           off-by-one slip on the final figure

Distractor plausibility: every candidate must be distinct from the
correct answer, distinct from the other picks, inside a spread band
relative to the answer and the given magnitudes, and never more than
two orders of magnitude away from the answer.

Option formatting is uniform (comma-grouped once any option reaches
10,000) and the correct letter rotates deterministically with the
payload, so a batch never pins the key to one position.

The batch driver varies the base numbers with the same clean-factor
pattern as surface_renderer.vary() (a seeded rng per item, integers
stay integers), validates every item, and returns only the MCQs that
pass every rule.
"""

from __future__ import annotations

import itertools
import math
import random
import zlib
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.relation_binder import RELATIONS

# --------------------------------------------------------------------------- #
# Error pattern registry
# --------------------------------------------------------------------------- #

ERROR_TYPES: Tuple[str, ...] = (
    "conceptual", "partial_computation", "sign_error",
    "inversion", "unit_error", "off_by_one")

_MISCONCEPTIONS: Dict[str, str] = {
    "conceptual": "used the wrong formula or operation",
    "partial_computation": "stopped after completing only part of the steps",
    "sign_error": "flipped a sign while applying the relation",
    "inversion": "divided or averaged where the relation adds or multiplies",
    "unit_error": "skipped or doubled a unit / percent conversion",
    "off_by_one": "off-by-one slip on the final figure",
}

# relation-specific candidate hooks: the generic patterns below already
# cover additive relations; multiplicative/percent relations get precise
# replay formulas so the distractor matches the real classroom slip
_CONCEPT_HOOKS: Dict[str, List] = {
    # used x10 where the relation needs x100
    "roi": [lambda v: v["ebit"] / v["cap"] * 10],
}
_UNIT_HOOKS: Dict[str, List] = {
    # reported the fraction, forgot the percent conversion
    "roi": [lambda v: v["ebit"] / v["cap"]],
}
_INVERSION_HOOKS: Dict[str, List] = {
    # divided where the relation multiplies: cap/ebit instead of ebit/cap
    "roi": [lambda v: v["cap"] / v["ebit"] * 100],
}
_PARTIAL_HOOKS: Dict[str, List] = {
    # processed only the capital side of the chain (missed the EBIT term)
    "roi": [lambda v: v["cap"] / 100],
}

# --------------------------------------------------------------------------- #
# Small numeric helpers
# --------------------------------------------------------------------------- #


def _get_relation(relation_id: str) -> Optional[Dict[str, Any]]:
    for relation in RELATIONS:
        if relation["id"] == relation_id:
            return relation
    return None


def _distinct(a: float, b: float) -> bool:
    """Distinct beyond float noise."""
    return abs(a - b) > 1e-6 * max(1.0, abs(a), abs(b))


def _plausible(correct: float, d: float,
               values: Dict[str, float]) -> bool:
    """Spread gate: near the answer's neighbourhood, never absurd."""
    if not math.isfinite(d):
        return False
    if not _distinct(d, correct):
        return False
    inputs = max((abs(v) for v in values.values()), default=0.0)
    band = max(abs(correct) * 2.0, inputs * 0.5, 50.0)
    if abs(d - correct) > band:
        return False
    if correct != 0 and abs(d) > abs(correct) * 100 + 1000:
        return False
    return True


def _fmt(value: float, commas: bool = False) -> str:
    """Uniform option text: ints stay ints, decimals collapse to <=2dp."""
    v = float(value)
    if abs(v - round(v)) < 1e-9 * max(1.0, abs(v)):
        n = int(round(v))
        return f"{n:,}" if commas else str(n)
    return f"{v:.2f}".rstrip("0").rstrip(".")


def _money_text(value: float) -> str:
    return _fmt(value, abs(value) >= 1000)


def _infer_target(relation: Optional[Dict[str, Any]],
                  values: Dict[str, float]) -> Optional[str]:
    """The ask slot: whichever relation target the givens can solve."""
    if relation is None:
        return None
    for target in relation["asks"]:
        try:
            v = relation["solve"](dict(values), target)
        except Exception:
            continue
        if isinstance(v, (int, float)) and math.isfinite(v):
            return target
    return None


# --------------------------------------------------------------------------- #
# Error pattern candidate generators (deterministic)
# --------------------------------------------------------------------------- #


def _generic_conceptual(correct: float,
                        values: Dict[str, float]) -> List[float]:
    if not values:
        return []
    vs = sorted(values.values())
    # adds every given; or multiplies the two largest givens
    return [sum(vs), vs[-1] * vs[-2]]


def _generic_partial(correct: float,
                     values: Dict[str, float]) -> List[float]:
    # drop one given from the chain: the work stops halfway
    total = sum(values.values())
    out = []
    for k in sorted(values, key=lambda k: abs(values[k])):
        out.append(total - values[k])
    return out


def _solve_flips(values: Dict[str, float],
                 relation: Optional[Dict[str, Any]]) -> List[float]:
    """Re-run the relation with one given's sign flipped."""
    out: List[float] = []
    if relation is None:
        return out
    for k in sorted(values, key=lambda k: -abs(values[k])):
        mod = dict(values)
        mod[k] = -mod[k]
        for target in relation["asks"]:
            try:
                v = relation["solve"](dict(mod), target)
            except Exception:
                continue
            if isinstance(v, (int, float)) and math.isfinite(v):
                out.append(float(v))
                break
    return out


def _generic_sign(correct: float, values: Dict[str, float],
                  relation: Optional[Dict[str, Any]]) -> List[float]:
    flips = _solve_flips(values, relation)
    pos = correct >= 0
    same = [v for v in flips if (v >= 0) == pos]
    other = [v for v in flips if (v >= 0) != pos]
    # prefer same-sign flips, then opposite-sign flips, then the bare negation
    return same + other + [-correct]


def _generic_inversion(correct: float,
                       values: Dict[str, float]) -> List[float]:
    if len(values) < 2:
        return []
    vs = sorted(values.values())
    # averaged the two givens where the relation adds/multiplies them
    return [(vs[-1] + vs[-2]) / 2]


def _generic_unit(correct: float,
                  values: Dict[str, float]) -> List[float]:
    # classic conversion slips on the result (percent, x10, halved)
    return [correct * 100, correct / 100, correct * 2, correct / 2,
            correct * 10, correct / 10]


def _generic_off_by_one(correct: float,
                        values: Dict[str, float]) -> List[float]:
    return [correct + 1, correct - 1, correct + 2, correct - 2]


def _hooks(relation_id: Optional[str], table: Dict[str, List],
           values: Dict[str, float]) -> List[float]:
    out: List[float] = []
    for fn in table.get(relation_id or "", []):
        try:
            v = fn(values)
        except Exception:
            continue
        if isinstance(v, (int, float)) and math.isfinite(v):
            out.append(float(v))
    return out


def _cands_conceptual(correct, values, relation):
    rid = relation["id"] if relation else None
    return (_generic_conceptual(correct, values)
            + _hooks(rid, _CONCEPT_HOOKS, values))


def _cands_partial(correct, values, relation):
    rid = relation["id"] if relation else None
    return _hooks(rid, _PARTIAL_HOOKS, values) \
        + _generic_partial(correct, values)


def _cands_sign(correct, values, relation):
    return _generic_sign(correct, values, relation)


def _cands_inversion(correct, values, relation):
    rid = relation["id"] if relation else None
    return (_hooks(rid, _INVERSION_HOOKS, values)
            + _generic_inversion(correct, values))


def _cands_unit(correct, values, relation):
    rid = relation["id"] if relation else None
    return _hooks(rid, _UNIT_HOOKS, values) + _generic_unit(correct, values)


def _cands_off_by_one(correct, values, relation):
    return _generic_off_by_one(correct, values)


_PATTERN_GENERATORS = {
    "conceptual": _cands_conceptual,
    "partial_computation": _cands_partial,
    "sign_error": _cands_sign,
    "inversion": _cands_inversion,
    "unit_error": _cands_unit,
    "off_by_one": _cands_off_by_one,
}


def _pattern_candidates(error_type: str, correct: float,
                        values: Dict[str, float],
                        relation: Optional[Dict[str, Any]]) -> List[float]:
    """All raw candidates a named misconception produces (unfiltered)."""
    gen = _PATTERN_GENERATORS.get(error_type)
    if gen is None:
        return []
    out = []
    for v in gen(correct, values, relation):
        if isinstance(v, (int, float)) and math.isfinite(v):
            out.append(float(v))
    return out


def _fillers(correct: float,
             values: Dict[str, float]) -> List[Tuple[float, str]]:
    """Last-resort candidates (labelled by nearest error family) so a
    pathological-but-valid computation still yields 3 options."""
    m = max((abs(v) for v in values.values()), default=0.0)
    if m <= 0:
        m = abs(correct) if abs(correct) > 0 else 10.0
    c = correct
    return [
        (c * 1.5, "unit_error"), (c * 0.75, "unit_error"),
        (c + m * 0.1, "partial_computation"),
        (c - m * 0.1, "partial_computation"),
        (c * 2.0, "unit_error"), (c * 0.5, "unit_error"),
        (c + 1, "off_by_one"), (c - 1, "off_by_one"),
        (c + 2, "off_by_one"), (c - 2, "off_by_one"),
        (m * 0.5 + c, "partial_computation"),
        (c - m * 0.25, "sign_error"),
    ]


def _candidate_pool(correct: float, values: Dict[str, float],
                    relation: Optional[Dict[str, Any]]
                    ) -> List[Tuple[float, str]]:
    """One plausible, distinct candidate per error pattern, in priority
    order, topped up with fillers when the patterns come up short."""
    pool: List[Tuple[float, str]] = []
    used: List[float] = []

    def fresh(v: float) -> bool:
        return all(_distinct(v, u) for u in used + [correct])

    for et in ERROR_TYPES:
        for v in _pattern_candidates(et, correct, values, relation):
            if _plausible(correct, v, values) and fresh(v):
                pool.append((v, et))
                used.append(v)
                break
    for v, et in _fillers(correct, values):
        if len(pool) >= 6:
            break
        if _plausible(correct, v, values) and fresh(v):
            pool.append((v, et))
            used.append(v)
    return pool


# --------------------------------------------------------------------------- #
# Public API: distractors
# --------------------------------------------------------------------------- #


def generate_distractors(correct: float, values: dict,
                         relation_id: str) -> List[Tuple[float, str]]:
    """Exactly 3 plausible wrong values as (value, error_type) pairs.

    Deterministic; every value differs from `correct` and from the other
    picks, and every value passes the spread gate.
    """
    correct = float(correct)
    vals = {k: float(v) for k, v in dict(values or {}).items()}
    relation = _get_relation(relation_id)
    pool = _candidate_pool(correct, vals, relation)
    return pool[:3]


def _length_cv(texts: List[str]) -> float:
    """Population coefficient of variation of option text lengths."""
    lens = [len(t) for t in texts]
    mean = sum(lens) / len(lens)
    if mean <= 0:
        return 0.0
    var = sum((n - mean) ** 2 for n in lens) / len(lens)
    return (var ** 0.5) / mean


def _select_distractors(correct: float, values: Dict[str, float],
                        relation: Optional[Dict[str, Any]]
                        ) -> Tuple[List[Tuple[float, str]], bool]:
    """Pick 3 distractors whose formatted option lengths stay plausible
    (cv < 0.40 across all four options) while keeping error-type
    diversity.  Falls back through deterministic combos."""
    pool = _candidate_pool(correct, values, relation)
    commas = abs(correct) >= 10000 or any(
        abs(v) >= 10000 for v, _ in pool)
    if len(pool) < 3:
        return pool, commas

    def cv_ok(idxs) -> bool:
        texts = [_fmt(correct, commas)] + \
                [_fmt(pool[i][0], commas) for i in idxs]
        return _length_cv(texts) < 0.40

    diverse = [c for c in itertools.combinations(range(len(pool)), 3)
               if len({pool[i][1] for i in c}) == 3]
    for c in diverse:
        if cv_ok(c):
            return [pool[i] for i in c], commas
    for c in itertools.combinations(range(len(pool)), 3):
        if cv_ok(c):
            return [pool[i] for i in c], commas
    if diverse:
        return [pool[i] for i in diverse[0]], commas
    return pool[:3], commas


# --------------------------------------------------------------------------- #
# Public API: single MCQ
# --------------------------------------------------------------------------- #

_SLOT_NAMES: Dict[str, str] = {
    "opening": "opening capital", "closing": "closing capital",
    "profit": "profit", "drawings": "drawings",
    "addcap": "additional capital", "ebit": "EBIT",
    "cap": "capital employed", "roi": "return on investment (%)",
}

_FORMULAS: Dict[str, Dict[str, str]] = {
    "closing_capital": {
        "closing": "closing capital = opening capital + profit "
                   "- drawings + additional capital",
        "profit": "profit = closing capital - opening capital "
                  "- additional capital + drawings",
        "drawings": "drawings = closing capital - opening capital "
                    "- additional capital + profit",
        "opening": "opening capital = closing capital - profit "
                   "+ drawings - additional capital",
    },
    "roi": {
        "roi": "return on investment (%) = EBIT / capital employed x 100",
        "ebit": "EBIT = ROI% / 100 x capital employed",
        "cap": "capital employed = EBIT / (ROI% / 100)",
    },
}

_TARGET_NOUNS: Dict[Tuple[str, str], str] = {
    ("closing_capital", "closing"): "the closing capital",
    ("closing_capital", "profit"): "the profit earned during the year",
    ("closing_capital", "drawings"):
        "the drawings (amount withdrawn) during the year",
    ("closing_capital", "opening"): "the opening capital",
    ("roi", "roi"): "the return on investment (ROI) in percent",
    ("roi", "ebit"): "the EBIT",
    ("roi", "cap"): "the capital employed",
}


def _join_and(parts: List[str]) -> str:
    if not parts:
        return ""
    if len(parts) == 1:
        return parts[0]
    return ", ".join(parts[:-1]) + " and " + parts[-1]


def _b_closing_closing(v: Dict[str, float]) -> Optional[str]:
    if "opening" not in v:
        return None
    clauses = ["started with an opening capital of "
               f"Rs. {_money_text(v['opening'])}"]
    if "profit" in v:
        clauses.append(f"made a profit of Rs. {_money_text(v['profit'])}")
    if "drawings" in v:
        clauses.append(f"withdrew Rs. {_money_text(v['drawings'])}")
    if "addcap" in v:
        clauses.append("introduced additional capital of "
                       f"Rs. {_money_text(v['addcap'])}")
    return "A business " + _join_and(clauses)


def _b_closing_profit(v: Dict[str, float]) -> Optional[str]:
    if "closing" not in v or "opening" not in v:
        return None
    clauses = ["started with an opening capital of "
               f"Rs. {_money_text(v['opening'])}",
               "ended the year with a closing capital of "
               f"Rs. {_money_text(v['closing'])}"]
    if "drawings" in v:
        clauses.append(f"withdrew Rs. {_money_text(v['drawings'])}")
    if "addcap" in v:
        clauses.append("introduced additional capital of "
                       f"Rs. {_money_text(v['addcap'])}")
    return "A business " + _join_and(clauses)


def _b_closing_drawings(v: Dict[str, float]) -> Optional[str]:
    if "closing" not in v or "opening" not in v:
        return None
    clauses = ["started with an opening capital of "
               f"Rs. {_money_text(v['opening'])}"]
    if "profit" in v:
        clauses.append(f"made a profit of Rs. {_money_text(v['profit'])}")
    if "addcap" in v:
        clauses.append("introduced additional capital of "
                       f"Rs. {_money_text(v['addcap'])}")
    clauses.append("ended the year with a closing capital of "
                   f"Rs. {_money_text(v['closing'])}")
    return "A business " + _join_and(clauses)


def _b_closing_opening(v: Dict[str, float]) -> Optional[str]:
    if "closing" not in v:
        return None
    clauses = []
    if "profit" in v:
        clauses.append(f"made a profit of Rs. {_money_text(v['profit'])}")
    if "drawings" in v:
        clauses.append(f"withdrew Rs. {_money_text(v['drawings'])}")
    if "addcap" in v:
        clauses.append("introduced additional capital of "
                       f"Rs. {_money_text(v['addcap'])}")
    clauses.append("ended the year with a closing capital of "
                   f"Rs. {_money_text(v['closing'])}")
    return "A business " + _join_and(clauses)


def _b_roi_roi(v: Dict[str, float]) -> Optional[str]:
    if "ebit" not in v or "cap" not in v:
        return None
    return (f"A firm earned an EBIT of Rs. {_money_text(v['ebit'])} on a "
            f"capital employed of Rs. {_money_text(v['cap'])}")


def _b_roi_ebit(v: Dict[str, float]) -> Optional[str]:
    if "roi" not in v or "cap" not in v:
        return None
    return (f"A firm's return on investment is {_fmt(v['roi'])}% on a "
            f"capital employed of Rs. {_money_text(v['cap'])}")


def _b_roi_cap(v: Dict[str, float]) -> Optional[str]:
    if "ebit" not in v or "roi" not in v:
        return None
    return (f"A firm earned an EBIT of Rs. {_money_text(v['ebit'])} and "
            f"its return on investment is {_fmt(v['roi'])}%")


_QUESTION_BUILDERS: Dict[Tuple[str, str], Any] = {
    ("closing_capital", "closing"): _b_closing_closing,
    ("closing_capital", "profit"): _b_closing_profit,
    ("closing_capital", "drawings"): _b_closing_drawings,
    ("closing_capital", "opening"): _b_closing_opening,
    ("roi", "roi"): _b_roi_roi,
    ("roi", "ebit"): _b_roi_ebit,
    ("roi", "cap"): _b_roi_cap,
}


def _tail(relation_id: str, target: Optional[str], topic: str,
          class_level: int) -> str:
    verb = "Calculate" if int(class_level) >= 9 else "Find"
    noun = _TARGET_NOUNS.get((relation_id, target or ""))
    if noun is None:
        noun = f"the required value ({topic})"
    return f"{verb} {noun}."


def _question_text(relation: Optional[Dict[str, Any]], relation_id: str,
                   values: Dict[str, float], target: Optional[str],
                   topic: str, class_level: int) -> str:
    builder = _QUESTION_BUILDERS.get((relation_id, target or ""))
    body = builder(values) if builder else None
    if body is None:
        given = _join_and([f"{_SLOT_NAMES.get(k, k)} = "
                            f"Rs. {_money_text(v)}"
                            for k, v in sorted(values.items())])
        body = f"Given {given}." if given else "Given the values below."
    return f"{body} {_tail(relation_id, target, topic, class_level)}"


def _explanation(relation_id: str, target: Optional[str],
                 values: Dict[str, float], correct: float, commas: bool,
                 topic: str) -> str:
    given = _join_and([f"{_SLOT_NAMES.get(k, k)} = {_fmt(v, commas)}"
                       for k, v in sorted(values.items())])
    formula = _FORMULAS.get(relation_id, {}).get(target or "")
    name = _SLOT_NAMES.get(target or "", "the required value")
    ans = _fmt(correct, commas)
    if formula:
        return (f"Given: {given}. Apply: {formula}. Substituting the "
                f"given values, {name} = {ans}.")
    return (f"Given: {given}. Apply the {topic} relation to the given "
            f"values; {name} = {ans}.")


def generate_mcq(relation_id: str, values: dict, correct_answer: float,
                 class_level: int, topic: str) -> dict:
    """Build one 4-option MCQ from a verified computation.

    Returns {question, options: {a,b,c,d}, correct: letter,
    error_types: {letter: {error_type, misconception}}, explanation}.
    error_types covers exactly the three distractor letters; the correct
    letter rotates deterministically with the payload.
    """
    correct = float(correct_answer)
    if not math.isfinite(correct):
        raise ValueError("correct_answer must be finite")
    vals = {k: float(v) for k, v in dict(values or {}).items()}
    relation = _get_relation(relation_id)
    target = _infer_target(relation, vals)
    distractors, commas = _select_distractors(correct, vals, relation)
    if len(distractors) < 3:
        for v, et in _fillers(correct, vals):
            if len(distractors) >= 3:
                break
            distractors.append((v, et))
    if len(distractors) < 3:
        raise ValueError("could not build 3 distractors for this input")

    payload = repr([relation_id, sorted(vals.items()), round(correct, 6)])
    pos = zlib.crc32(payload.encode("utf-8")) % 4
    letters = "abcd"
    options: Dict[str, str] = {}
    error_types: Dict[str, Dict[str, str]] = {}
    di = 0
    for i, letter in enumerate(letters):
        if i == pos:
            options[letter] = _fmt(correct, commas)
            continue
        value, et = distractors[di]
        di += 1
        options[letter] = _fmt(value, commas)
        error_types[letter] = {"error_type": et,
                               "misconception": _MISCONCEPTIONS[et]}
    return {
        "question": _question_text(relation, relation_id, vals, target,
                                   topic, class_level),
        "options": options,
        "correct": letters[pos],
        "error_types": error_types,
        "explanation": _explanation(relation_id, target, vals, correct,
                                    commas, topic),
        "relation_id": relation_id,
        "class_level": int(class_level),
        "topic": topic,
    }


# --------------------------------------------------------------------------- #
# Public API: validation
# --------------------------------------------------------------------------- #


def validate_mcq(mcq: dict,
                 position_history: Optional[List[str]] = None
                 ) -> Tuple[bool, List[str]]:
    """Rule stack for a generated item.

    - exactly 4 options keyed a-d
    - exactly one correct option, and it must exist
    - no "all/none of the above (or these)" phrasing
    - option length variance (cv of the four text lengths) < 40%
    - all option values distinct
    - with position_history: the key must not repeat across a batch
    """
    issues: List[str] = []
    options = mcq.get("options")
    if not isinstance(options, dict) or \
            sorted(options) != ["a", "b", "c", "d"]:
        issues.append("must have exactly 4 options keyed a, b, c, d")
        options = options if isinstance(options, dict) else {}
    correct = mcq.get("correct")
    keys = correct if isinstance(correct, list) else (
        [correct] if isinstance(correct, str) else [])
    if len(keys) != 1 or keys[0] not in options:
        issues.append("must mark exactly one correct option that exists")

    texts = {k: str(v) for k, v in options.items()}
    joined = " | ".join(texts.values()).lower()
    for phrase in ("all of the above", "none of the above",
                   "all of these", "none of these"):
        if phrase in joined:
            issues.append(f"forbidden option text: '{phrase}'")

    nums: Dict[str, float] = {}
    for k in sorted(texts):
        try:
            nums[k] = float(texts[k].replace(",", "").strip())
        except ValueError:
            issues.append(f"option {k} is not a plain number: {texts[k]!r}")
    vals = list(nums.values())
    dup = False
    for i in range(len(vals)):
        for j in range(i + 1, len(vals)):
            if not _distinct(vals[i], vals[j]):
                dup = True
    if dup:
        issues.append("duplicate option values")

    if len(texts) == 4:
        cv = _length_cv([texts[k] for k in sorted(texts)])
        if cv >= 0.40:
            issues.append(f"option length variance too high: {cv:.2f}")

    if position_history:
        hist = list(position_history)
        if len(hist) >= 2 and len(set(hist)) == 1 and keys \
                and keys[0] == hist[0]:
            issues.append(
                "correct option always at the same position across the batch")

    return (len(issues) == 0, issues)


# --------------------------------------------------------------------------- #
# Public API: batch driver (vary() number pattern + validation gate)
# --------------------------------------------------------------------------- #


def _vary_values(base: Dict[str, float], seed: int) -> Dict[str, float]:
    """Deterministic fresh numbers: same clean-factor pattern as
    surface_renderer.vary(); integers stay integers."""
    rng = random.Random(seed)
    factors = [2, 3, 4, 0.5, 1.5, 0.25]
    out: Dict[str, float] = {}
    for k in sorted(base):
        v = float(base[k])
        f = rng.choice(factors)
        nv = v * f
        if v.is_integer():
            nv = round(nv) if abs(nv - round(nv)) < 1e-9 else round(nv * 2) / 2
        out[k] = float(nv)
    return out


def generate_mcq_batch(relation_id: str, base_values: List[dict],
                       topic: str, count: int,
                       class_level: int = 8) -> List[dict]:
    """Vary the base numbers, build MCQs, validate, return only valid ones.

    Fewer than `count` items can come back when variants cannot execute
    or fail validation -- the gate never ships a broken item.
    """
    relation = _get_relation(relation_id)
    if relation is None or not base_values or count <= 0:
        return []
    base_seed = zlib.crc32(relation_id.encode("utf-8"))
    out: List[dict] = []
    positions: List[str] = []
    attempts = 0
    limit = max(count * 12, 40)
    while len(out) < count and attempts < limit:
        base = base_values[len(out) % len(base_values)]
        vals = _vary_values(base, base_seed + attempts)
        attempts += 1
        target = _infer_target(relation, vals)
        if target is None:
            continue
        try:
            correct = float(relation["solve"](dict(vals), target))
        except Exception:
            continue
        if not math.isfinite(correct) or abs(correct) >= 1e15:
            continue
        mcq = generate_mcq(relation_id, vals, correct, class_level, topic)
        ok, _issues = validate_mcq(mcq, position_history=positions)
        if not ok:
            continue
        positions.append(mcq["correct"])
        out.append(mcq)
    return out
