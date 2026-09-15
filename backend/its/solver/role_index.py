"""role_index.py — Deterministic role-phrase binding (the "maths way".

Numbers in textbook problems are ACCOMPANIED BY THEIR ROLE NAMES:
"principal of 10000", "rate of 10 percent", "current of 2 A",
"radius 7", "specific heat 4186", "the 10th term". Solving does not
require statistical guessing - it requires:

    1. NER: the 1-3 content words before each number name the role
    2. INDEX: role-phrase -> (equation, variable) slots, built from
       the variable descriptions (exact lookup after light stemming)
    3. INTERSECTION: the equation where every role hits a distinct
       slot and the question target hits the remaining one is unique
       - {current, resistance, ask voltage} is Ohm's law, full stop
    4. Deterministic extras: unit-family unique binds (kg -> mass
       slot), constant echoes (G = ..., h = ...), coordinate tuples
       ((0,0) and (3,4) -> x1,y1,x2,y2), grammar patterns, and
       positional residue (one leftover number, one empty slot)

Anything this layer cannot bind falls through to the statistical
constraint solver. Lookup + intersection = milliseconds.
"""

from __future__ import annotations

import functools
import re
from dataclasses import dataclass
from typing import Dict, List, Optional, Set, Tuple

STOPWORDS = {
    "of", "the", "a", "an", "or", "and", "in", "from", "by", "to",
    "for", "per", "is", "are", "was", "were", "its", "with", "at",
    "on", "as", "be", "been", "when", "what", "find", "calculate",
    "compute", "determine", "derive", "how", "much", "many", "does",
    "will", "can", "it", "this", "that", "their", "his", "her",
}


def _stem(word: str) -> str:
    for suf in ("ing", "ed", "es", "s"):
        if word.endswith(suf) and len(word) > len(suf) + 2:
            return word[: -len(suf)]
    return word


def _content_words(text: str) -> List[str]:
    return [_stem(w) for w in re.findall(r"[a-z]+", text.lower())
            if _stem(w) not in STOPWORDS and len(w) > 1]


# --------------------------------------------------------------------------- #
# Index construction
# --------------------------------------------------------------------------- #

@dataclass
class SlotRef:
    eq_id: str
    var: str


class RoleIndex:
    """phrase -> slots, built from variable descriptions."""

    def __init__(self) -> None:
        self.graph = None
        self.index: Dict[str, Set[Tuple[str, str]]] = {}

    def _ensure(self) -> None:
        if self.graph is not None:
            return
        from backend.its.solver.graph_loader import build_canonical_graph
        from backend.its.solver.variable_registry import (
            NON_TARGET_SYMBOLS, describe)

        self.graph, _ = build_canonical_graph()
        for eq_id, eq in self.graph.equations.items():
            for var in eq.variables:
                if var in NON_TARGET_SYMBOLS:
                    continue
                desc, _fam = describe(var, eq_id)
                words = _content_words(desc)
                # every contiguous n-gram (1..3) of the description
                for n in (1, 2, 3):
                    for i in range(len(words) - n + 1):
                        phrase = " ".join(words[i:i + n])
                        self.index.setdefault(phrase, set()).add(
                            (eq_id, var))

    # ------------------------------------------------------------------ #
    def lookup(self, role: str) -> Set[Tuple[str, str]]:
        """Exact lookup with graceful shortening: 'specific heat
        capacity' -> 'specific heat' -> 'specific' -> 'heat'."""
        words = _content_words(role)
        for n in (3, 2, 1):
            if len(words) < n:
                continue
            phrase = " ".join(words[-n:])
            hits = self.index.get(phrase)
            if hits:
                return hits
        return set()


# --------------------------------------------------------------------------- #
# NER: number + preceding role window
# --------------------------------------------------------------------------- #

_NUM_RE = re.compile(r"-?\d+(?:\.\d+)?(?:e[+-]?\d+)?", re.IGNORECASE)
_ORDINAL_RE = re.compile(r"\b(\d+)(?:st|nd|rd|th)\b", re.IGNORECASE)


@dataclass
class Mention:
    value: float
    role: str            # stemmed role window ('' when none)
    start: int
    end: int
    family: str = ""     # unit family when known (from quantity parser)


def extract_mentions(text: str, quantities=None) -> List[Mention]:
    """Numbers with their local role window. When quantulum3 quantities
    are supplied, their unit families ride along for direct binding."""
    mentions: List[Mention] = []
    used_spans = []

    if quantities:
        for q in quantities:
            if q.surface:
                m = re.search(re.escape(q.surface), text)
                if m:
                    used_spans.append((m.start(), m.end(), q))

    consumed = set()
    for m in _NUM_RE.finditer(text):
        # inside a captured quantity span only the digit run at the
        # surface START is the value; later digits in the surface are
        # unit exponents (the trailing 2 in 'm/s2', the 2 in 'km/h2')
        # and must never become standalone number mentions -- the
        # phantom duplicates made the positional-residue rule bind two
        # roles to one real value ('accelerates from rest at 2 m/s2'
        # binding u=2 AND a=2, v came out 12 instead of 10)
        span = next(((s, e, _q) for s, e, _q in used_spans
                     if s <= m.start() < e), None)
        if span is not None:
            s, e, q = span
            if m.start() <= s + 1:      # the surface's leading value
                mentions.append(Mention(float(m.group(0)), "", m.start(),
                                        m.end(), q.family))
            consumed.add(m.start())
            continue
        # a 1-2 digit run glued to a preceding letter/slash is a unit
        # exponent ('m/s2', 'm2', 'ms2'), never a value ('Rs500' with
        # its 3-digit run stays a value)
        if (m.start() > 0 and re.fullmatch(r"\d{1,2}", m.group(0))
                and re.match(r"[A-Za-z/]", text[m.start() - 1])):
            continue
        val = m.group(0)
        mentions.append(Mention(float(val), "", m.start(), m.end()))

    # role window: up to 4 content words before the number
    for ment in mentions:
        prefix = text[max(0, ment.start - 60): ment.start]
        words = _content_words(prefix)
        ment.role = " ".join(words[-4:]) if words else ""

    # ordinals ("the 10th term")
    for m in _ORDINAL_RE.finditer(text):
        if any(m.start() >= s and m.start() < e for s, e, _q in used_spans):
            continue
        prefix = text[max(0, m.start() - 40): m.start]
        words = _content_words(prefix)
        mentions.append(Mention(float(m.group(1)),
                                " ".join(words[-3:]), m.start(), m.end()))
    return mentions


# --------------------------------------------------------------------------- #
# Binding rules (all deterministic)
# --------------------------------------------------------------------------- #

_GIVEN_ECHO_RE = re.compile(
    r"\b([A-Za-z])\s*=\s*(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)", re.IGNORECASE)

# standard single-letter constant notation -> canonical symbols
_CONSTANT_ECHO = {
    "G": ("G_const",), "c": ("c_light",), "h": ("h_planck",),
    "e": ("e_charge",), "R": ("R_gas",), "N": ("N_avogadro",),
    "k": ("k_B", "k_e"), "F": ("F_faraday",),
}

_COORD_RE = re.compile(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)")


def _unit_family_binds(eq, mentions, bound: Dict[str, float]) -> None:
    """Bind by unit family when exactly one slot has that family."""
    from backend.its.solver.variable_registry import describe

    slots = [v for v in eq.variables if v not in bound]
    fam_slots: Dict[str, List[str]] = {}
    for v in slots:
        _d, fam = describe(v, eq.eq_id)
        if fam:
            fam_slots.setdefault(fam, []).append(v)
    for ment in mentions:
        if ment.value in bound.values() and ment.family == "":
            continue
        if not ment.family or ment.family in ("dimensionless", "other", ""):
            continue
        cands = fam_slots.get(ment.family, [])
        if len(cands) == 1 and cands[0] not in bound:
            bound[cands[0]] = ment.value
            ment.family = ""  # consumed


def resolve_target(text: str, index: RoleIndex) -> Optional[str]:
    """The question's target variable: symbol echo first, then the
    longest role phrase from the question that hits exactly the slots
    of some variable (any slot set works - intersection prunes)."""
    m = re.search(
        r"(?:find|calculate|compute|determine|what\s+is|value\s+of)\s+"
        r"(?:the\s+)?(?:value\s+of\s+)?([A-Za-z][A-Za-z0-9_]*)\s*[?.]?\s*$",
        text.strip(), re.IGNORECASE)
    if m:
        tok = _stem(m.group(1).lower())
        vars_present = {v for eq in index.graph.equations.values()
                        for v in eq.variables}
        for v in vars_present:
            if _stem(v.lower().rstrip("_")) == tok or v.lower() == tok:
                return v

    qwords = _content_words(text.lower().split("find")[-1]
                            if "find" in text.lower() else text)
    best: Tuple[int, Optional[str]] = (0, None)
    for n in (3, 2, 1):
        for i in range(len(qwords) - n + 1):
            phrase = " ".join(qwords[i:i + n])
            for eq_id, var in index.index.get(phrase, ()):
                # prefer longer matches (n) - first hit at this n wins
                if n > best[0]:
                    best = (n, var)
        if best[1] is not None:
            return best[1]
    return best[1]


def solve_by_intersection(text: str, quantities=None) -> Optional[Dict]:
    """Deterministic role-index intersection solve. Returns a result
    dict compatible with the constraint solver, or None."""
    index = RoleIndex()
    index._ensure()
    graph = index.graph

    mentions = extract_mentions(text, quantities)
    target = resolve_target(text, index)
    if target is None or not mentions:
        return None

    # Candidate equations: those containing the target var
    cand_eqs = [eq for eq in graph.equations.values()
                if target in eq.variables]

    results = []
    for eq in cand_eqs:
        slots = list(eq.variables)
        if target not in slots or len(slots) < 2:
            continue
        bound: Dict[str, float] = {}
        working = list(mentions)

        # 1. constant echoes: '(G = 6.67e-11)' -> G_const
        for cm in _GIVEN_ECHO_RE.finditer(text):
            letter = cm.group(1)
            if letter.upper() in _CONSTANT_ECHO or letter in _CONSTANT_ECHO:
                for sym in _CONSTANT_ECHO.get(letter, ()) + (
                        _CONSTANT_ECHO.get(letter.upper(), ())):
                    if sym in slots and sym not in bound:
                        bound[sym] = float(cm.group(2))
                        break

        # 2. coordinate tuples -> coordinate slots (x1,y1,x2,y2...)
        coords = _COORD_RE.findall(text)
        coord_vars = [v for v in ("x1", "y1", "x2", "y2") if v in slots]
        if len(coords) >= 2 and len(coord_vars) == 4:
            (x1, y1), (x2, y2) = coords[0], coords[1]
            bound.update({"x1": float(x1), "y1": float(y1),
                          "x2": float(x2), "y2": float(y2)})

        # 3. unit-family unique binds
        _unit_family_binds(eq, working, bound)

        # 4. role-index binds (longest role phrase wins; slot must be free)
        role_hits = 0
        for ment in working:
            if not ment.role:
                continue
            hits = index.lookup(ment.role)
            in_eq = [(e, v) for (e, v) in hits
                     if e == eq.eq_id and v in slots and v not in bound
                     and v != target]
            if len(in_eq) == 1:
                bound[in_eq[0][1]] = ment.value
                role_hits += 1

        # 4.5 grammar patterns (temperature difference, part/whole, ...)
        try:
            from backend.its.solver.quantity_parser import (STRUCTURAL_HINTS,
                                                            structural_bindings)

            import re as _re

            for pattern, roles in STRUCTURAL_HINTS:
                gm = _re.search(pattern, text, _re.IGNORECASE)
                if not gm:
                    continue
                for var, g in roles.items():
                    if var in slots and var not in bound and var != target:
                        bound[var] = float(gm.group(g))
        except Exception:
            pass

        # 4.6 state phrases: 'from rest' / 'at rest' / 'dropped' mean
        # the initial velocity is ZERO.  Without this deterministic
        # bind the leftover number (the acceleration) used to fill the
        # u slot by positional residue and v came out u+a*t instead
        # of a*t.
        if ("u" in slots and "u" not in bound and "u" != target
                and re.search(r"\b(?:from|at)\s+rest\b|\bdropped\b",
                              text, re.I)):
            bound["u"] = 0.0

        # 5. positional residue: leftover numbers -> free slots
        used_vals = set(bound.values())
        leftover = [m for m in working if m.value not in used_vals]
        free_slots = [v for v in slots if v != target and v not in bound]
        if len(leftover) == 1 and len(free_slots) == 1:
            bound[free_slots[0]] = leftover[0].value
        elif (len(leftover) == len(free_slots) and len(leftover) > 1
                and len({m.value for m in leftover}) == 1):
            # symmetric equal values (4 ohm, 4 ohm -> R1, R2): fill in order
            for v in free_slots:
                bound[v] = leftover[0].value
        n_residue = sum(1 for v in slots
                        if v != target and v not in bound)

        free = [v for v in slots if v != target and v not in bound]
        if free:
            continue  # intersection incomplete for this equation

        path = graph.find_solve_path(dict(bound), target)
        if path is None or path.final_value is None:
            continue
        # plausibility gate: impossible values never surface
        try:
            from backend.its.solver.variable_registry import (
                describe as _desc_fn, plausible as _plausible)
            _dsc, _fam2 = _desc_fn(target, eq.eq_id)
            if not _plausible(target, _fam2, path.final_value):
                continue
        except Exception:
            pass

        # Rank: fully role-bound equations beat residue guesses; then
        # equation specificity (shared content words with the text)
        text_words = set(_content_words(text))
        desc_words = set(_content_words(eq.description))
        specificity = len(text_words & desc_words) / max(1, len(desc_words))
        results.append({
            "target": target, "value": path.final_value,
            "eq_id": eq.eq_id, "knowns": bound,
            "score": 10 * role_hits - 3 * n_residue + specificity,
            "specificity": specificity,
            "role_hits": role_hits, "n_residue": n_residue,
            "steps": [f"role-index intersection: bound {bound}, "
                      f"target '{target}' via {eq.eq_id}",
                      *[f"step {s['step']}: {s['equation']} -> "
                        f"{s['solved_for']} = {s['value']:.6g}"
                        for s in path.steps]],
        })

    if not results:
        return None
    results.sort(key=lambda r: -r["score"])
    best = results[0]
    # A unique-equation match beats ties by construction; require some
    # specificity so we never fire on a bare coincidence
    if best["specificity"] < 0.05 and len(results) > 1:
        return None
    return best


@functools.lru_cache(maxsize=1)
def get_role_index() -> RoleIndex:
    idx = RoleIndex()
    idx._ensure()
    return idx
