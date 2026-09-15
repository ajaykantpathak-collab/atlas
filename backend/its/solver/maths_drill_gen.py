"""maths_drill_gen.py -- infinite fresh maths drill variants.

When a maths concept's own pool has been served through for a student
(the POOL_CAP round-robin starts repeating), tutor.py's drill consult
asks this module for a fresh, deterministic variant of the same
concept family instead of replaying the pool.

Design (binding):
  - Seeded + deterministic: the variant index is picked by hashing
    (student_id, concept_id, serve_count, probe_j) through sha256 -- no
    random at serve time, identical on every interpreter/restart.  The
    same student never sees a repeated variant until the family's tier
    space is exhausted, then selection cycles.
  - Every generator computes its answer EXACTLY (ints / terminating
    decimals via Fractions).  Parameter grids are constructed so every
    variant in the space terminates -- parameters that could produce a
    non-terminating answer (thirds, pi except as 22/7 with multiples
    of 7, unsquared trig surds) are never drawn.
  - TIER GRIDS ARE GLOBALLY DISJOINT per family: the number ranges the
    easy/grade/hard grids draw from never overlap, so a question text
    belongs to exactly one variant of exactly one tier.  (The tests
    sweep the full space to prove both injectivity and strict tier
    size growth.)
  - Answer strings match grade_numeric's contract: the graded value is
    the FIRST number in the answer string ("x = 6", "0.375", "-31").
    Fraction-form answers are always rendered as terminating decimals
    and the question says so.
  - CBSE-realistic wording: Indian names, rupees, cricket, classrooms,
    banks -- in the style of the generated question banks.

Registry: concept -> family is title-keyword + class-band based
(family_for) with an explicit priority order.  A concept that matches
no family yields None and the tutor falls back to its pool behaviour
(fail-open).
"""

from __future__ import annotations

import hashlib
from fractions import Fraction
from itertools import combinations, combinations_with_replacement
from typing import Callable, Dict, List, Optional, Tuple

__all__ = [
    "FAMILIES", "family_for", "make_drill", "consult", "render_variant",
    "variant_count", "tier_counts", "variant_size", "family_summary",
]

# --------------------------------------------------------------------- #
# deterministic helpers
# --------------------------------------------------------------------- #
_TIER_ORDER = ("easy", "grade", "hard")


def _h(*parts) -> int:
    """Stable 64-bit hash of the selection key.  hashlib (NOT Python's
    hash(), which is salted per interpreter) so selection is identical
    across interpreters and processes."""
    digest = hashlib.sha256("\x1f".join(
        str(p) for p in parts).encode("utf-8")).digest()
    return int.from_bytes(digest[:8], "big")


def _decode(v: int, sizes) -> Tuple[int, ...]:
    """Mixed-radix decode of variant index v over grid sizes (each
    digit < its grid size).  Injective by construction."""
    out = []
    for s in reversed(sizes):
        v, r = divmod(v, s)
        out.append(r)
    return tuple(reversed(out))


def _dec(fr: Fraction) -> str:
    """Exact terminating-decimal string for a Fraction whose
    denominator is 2^a * 5^b (callers guarantee it by construction)."""
    fr = Fraction(fr)
    n, d = fr.numerator, fr.denominator
    p2 = p5 = 0
    x = d
    while x % 2 == 0:
        x //= 2
        p2 += 1
    while x % 5 == 0:
        x //= 5
        p5 += 1
    if x != 1:                       # never happens with our grids
        raise ValueError("non-terminating fraction reached _dec")
    m = max(p2, p5)
    scaled = n * (10 ** m) // d
    sign = "-" if scaled < 0 else ""
    s = str(abs(scaled)).rjust(m + 1, "0")
    out = s if m == 0 else s[:-m] + "." + s[-m:]
    if "." in out:
        out = out.rstrip("0").rstrip(".")
    return sign + (out or "0")


def _inr(n: int) -> str:
    """Indian-grouping rupee amount: 120000 -> Rs 1,20,000 style."""
    s = str(abs(int(n)))
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        parts = []
        while len(head) > 2:
            parts.insert(0, head[-2:])
            head = head[:-2]
        if head:
            parts.insert(0, head)
        s = ",".join(parts + [tail])
    return ("-" if int(n) < 0 else "") + "\u20b9" + s


def _ordinal(n: int) -> str:
    if 10 <= n % 100 <= 20:
        suf = "th"
    else:
        suf = {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suf}"


def _quad_text(a: int, b: int, c: int) -> str:
    """Render ax^2 + bx + c = 0 with clean signs (a >= 1)."""
    s = "x^2" if a == 1 else f"{a}x^2"
    if b == 1:
        s += " + x"
    elif b == -1:
        s += " - x"
    elif b:
        s += f" + {b}x" if b > 0 else f" - {abs(b)}x"
    if c:
        s += f" + {c}" if c > 0 else f" - {abs(c)}"
    return s + " = 0"


def _pow_text(exps: List[Tuple[int, int]]) -> str:
    """'2^3 x 3 x 5' style prime factorisation text (exponent 1 shown
    bare, exponent 0 omits the prime)."""
    parts = []
    for prime, e in exps:
        if e == 1:
            parts.append(str(prime))
        elif e > 1:
            parts.append(f"{prime}^{e}")
    return " x ".join(parts)


def _gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return a


def _isqrt(n: int) -> int:
    r = int(n ** 0.5)
    while r * r > n:
        r -= 1
    while (r + 1) * (r + 1) <= n:
        r += 1
    return r


def _name(i: int) -> str:
    return _NAMES[i % len(_NAMES)]


_NAMES = ["Aarav", "Priya", "Vihaan", "Ananya", "Rohan", "Ishita",
          "Kabir", "Meera", "Arjun", "Divya", "Ravi", "Sana"]

# the final step carries the answer as a bare "= N" computation so the
# hint ladder's L2 number guard strips it (the answer must not leak at
# level 2; L3 reveals everything and flags the reveal)
_STEP_END = "= {0}"


def _out(q: str, ans_str: str, ans_input: str, steps: List[str]) -> dict:
    """Uniform generator payload.  `a` is the graded answer string: its
    FIRST number must be the graded value (grade_numeric contract).
    `solution` is the full worked solution used for display; `steps`
    feeds the worked-example fading view and the hint ladder."""
    steps = [s for s in steps if s and s.strip()]
    solution = "\n".join(steps) if steps else ans_str
    return {"q": q, "a": ans_str, "ans_input": ans_input,
            "steps": steps, "solution": solution}


# --------------------------------------------------------------------- #
# family registry:  fid -> keyword / class-band / per-tier layouts
# --------------------------------------------------------------------- #
# tiers: tier -> [(kind, sizes)]; the concatenated layouts tile the
# tier's variant range [lo, hi); sizes' product must equal the kind's
# slice.  KIND_RENDER[(fid, kind)](params, tier) renders the question.
FAMILIES: Dict[str, dict] = {}
KIND_RENDER: Dict[Tuple[str, str], Callable] = {}


def _register(fid: str, kw: Tuple[str, ...], cls_band: Tuple[int, int],
              tiers: Dict[str, List[Tuple[str, tuple]]],
              note: str = "") -> None:
    flat: List[Tuple[str, tuple, int, int, str]] = []
    ranges: Dict[str, Tuple[int, int]] = {}
    lo = 0
    for tier in _TIER_ORDER:
        start = lo
        for kind, sizes in (tiers.get(tier) or []):
            n = 1
            for s in sizes:
                n *= s
            flat.append((kind, tuple(sizes), lo, n, tier))
            lo += n
        ranges[tier] = (start, lo)
    FAMILIES[fid] = {"kw": kw, "cls": cls_band, "tiers": tiers,
                     "flat": flat, "ranges": ranges, "total": lo,
                     "note": note}


def _kind(fid: str, kind: str):
    def deco(fn):
        KIND_RENDER[(fid, kind)] = fn
        return fn
    return deco


def family_for(title: str, cls: Optional[int]) -> Optional[str]:
    """The drill family for a concept (title-keyword + class band), or
    None.  FAMILIES iterates in explicit priority order (more specific
    families first), fixed at import by _order_families."""
    t = str(title or "").lower()
    for fid, fam in FAMILIES.items():
        lo, hi = fam["cls"]
        if cls is not None and not (lo <= cls <= hi):
            continue
        for kw in fam["kw"]:
            if kw in t:
                return fid
    return None


def render_variant(fid: str, v: int) -> Optional[dict]:
    """Render variant v (its tier comes from where it sits in the
    family's tiled range)."""
    fam = FAMILIES.get(fid)
    if fam is None:
        return None
    for kind, sizes, off, n, tier in fam["flat"]:
        if off <= v < off + n:
            params = _decode(v - off, sizes)
            item = KIND_RENDER[(fid, kind)](params, tier)
            item["tier"] = tier
            item["family"] = fid
            item["variant"] = v
            return item
    return None


def make_drill(student_id: str, concept_id: str, title: str,
               cls: Optional[int], serve_count: int,
               tier_pref: Optional[str], seen,
               last_q: Optional[str] = None) -> Optional[dict]:
    """Pick + render the next drill variant for a concept.

    The variant index is picked by hashing (student_id, concept_id,
    serve_count, probe) -- the first probe whose variant has not been
    served to this student yet wins, so no variant repeats until the
    tier's space is exhausted; then selection cycles deterministically
    (seen is reset, and an immediate repeat of the last question is
    skipped).  `seen` is the caller's persisted per-(student, concept)
    served-variant record -- a dict {variant_str: True} (preferred, O(1)
    membership) or a list of variant strings; it is MUTATED in place.
    Returns the rendered drill item, or None when the concept matches
    no family."""
    fid = family_for(title, cls)
    if fid is None:
        return None
    fam = FAMILIES[fid]
    tier = tier_pref if tier_pref in _TIER_ORDER else "grade"
    lo, hi = fam["ranges"][tier]
    size = max(1, hi - lo)
    # the serve's start point is a pure hash of (student, concept,
    # serve_count); the probe walk then scans the whole tier
    # CONTIGUOUSLY (start + j) % size, so `size` probes cover every
    # index exactly once -- no-repeat-until-exhaustion is structural,
    # never a probabilistic scan
    start = _h(student_id, concept_id, serve_count) % size
    v = None
    for j in range(size):
        cand = lo + (start + j) % size
        if str(cand) not in seen:
            v = cand
            break
    if v is None:
        # tier space exhausted: cycle -- reset the seen record and take
        # the base draw, skipping the question served last
        seen.clear()
        for j in range(size):
            cand = lo + (start + j) % size
            item = render_variant(fid, cand)
            if item is not None and item["q"] != last_q:
                v = cand
                break
        if v is None:
            v = lo + start % size
    key = str(v)
    if isinstance(seen, dict):
        seen[key] = True
    else:
        seen.append(key)
    item = render_variant(fid, v)
    if item is None:
        if isinstance(seen, dict):
            seen.pop(key, None)
        else:
            seen.pop()
        return None
    return item


def variant_count(fid: str) -> int:
    return FAMILIES[fid]["total"]


# canonical relation per family: the hint ladder's L1/L2 identity line
FAMILY_FORMULAS = {
    "linear": "ax + b = c  =>  x = (c - b) / a",
    "percentages": "part = percent/100 x whole",
    "ratio": "share = (ratio part / total parts) x amount",
    "lcm_hcf": "HCF = lowest powers of common primes; "
               "LCM = highest powers of all primes",
    "simple_interest": "SI = P x R x T / 100; Amount = P + SI",
    "area_perimeter": "rect A = l x w, P = 2(l + w); tri A = 1/2 b h; "
                      "circle A = pi r^2, C = 2 pi r",
    "exponents_roots": "a^m x a^n = a^(m+n); sqrt(a^2) = a",
    "fractions": "a/b of Q = a x Q / b; add/subtract via the LCM of "
                 "denominators",
    "quadratics": "D = b^2 - 4ac; roots = (-b +/- sqrt(D)) / 2a",
    "ap": "a_n = a + (n - 1)d; S_n = n/2 (2a + (n - 1)d)",
    "triangles": "a^2 + b^2 = c^2; similar triangles: AB/PQ = BC/QR",
    "coordinate": "d = sqrt((x2-x1)^2 + (y2-y1)^2); midpoint and "
                  "section formula",
    "trigonometry": "sin^2 A + cos^2 A = 1; sin 30 = 1/2, cos 60 = 1/2, "
                    "tan 45 = 1",
    "statistics": "mean = sum / n; median = middle of ordered data; "
                  "mode = most frequent value",
    "probability": "P(E) = favourable outcomes / total outcomes",
}


def consult(concept_id: str, title: str, student_id: str,
            serve_count: int, cls: Optional[int],
            tier_pref: Optional[str] = None, seen=None,
            last_q: Optional[str] = None) -> Optional[dict]:
    """The tutor-facing entry point (same contract as
    numericals_drill_gen.consult): one fresh drill item for the concept
    family, or None when no family matches.  `seen` is the caller's
    persisted per-(student, concept) served-variant record (dict
    preferred, list tolerated); it is mutated in place so no variant
    repeats until the tier space is exhausted."""
    item = make_drill(student_id, concept_id, title, cls, serve_count,
                      tier_pref, seen if seen is not None else {},
                      last_q=last_q)
    if item is None:
        return None
    formula = FAMILY_FORMULAS.get(item.get("family") or "")
    if formula:
        item["formula"] = formula
    return item


def _numbers_in(text: str) -> List[float]:
    import re
    out = []
    for m in re.finditer(r"-?\d[\d,]*(?:\.\d+)?", str(text or "")):
        try:
            out.append(float(m.group(0).replace(",", "")))
        except ValueError:
            continue
    return out


def variant_size(fid: str, item: dict) -> float:
    """Difficulty size metric for gate (d): the biggest number the
    problem shows or asks for.  Trigonometry's question numbers are
    pinned to the standard angles, so its metric is the answer value
    (which scales with the tier coefficient)."""
    if fid == "trigonometry":
        vals = _numbers_in(item.get("ans_input", ""))
        return max((abs(v) for v in vals), default=0.0)
    vals = _numbers_in(item.get("q", "")) + \
        _numbers_in(item.get("ans_input", ""))
    return max((abs(v) for v in vals), default=0.0)


def tier_counts(fid: str) -> Dict[str, int]:
    return {t: hi - lo for t, (lo, hi) in FAMILIES[fid]["ranges"].items()}


def family_summary() -> Dict[str, dict]:
    return {fid: {"tiers": tier_counts(fid), "total": variant_count(fid),
                  "class_band": list(fam["cls"]), "note": fam["note"]}
            for fid, fam in FAMILIES.items()}


# ===================================================================== #
# CLASSES 6-8 FAMILIES
# ===================================================================== #

# ---- linear equations (ax + b = c / variables on both sides) -------- #
# tier grids disjoint via the coefficient a: 2..5 / 6..9 / 10..14
_register("linear", ("linear equation", "one variable", "two-step",
                     "two step", "both sides", "balancing",
                     "setting up an equation", "what equation",
                     "equations with brackets", " ax + b"), (7, 10), {
    "easy": [("axb", (4, 8, 6))],
    "grade": [("axb", (4, 13, 24)), ("both", (4, 13, 24))],
    "hard": [("axb", (5, 27, 83)), ("both", (5, 27, 83))],
}, "linear equations ax+b=c and ax+b=dx+e")


def _lin_coeffs(tier, ia, ix, ib):
    if tier == "easy":
        return 2 + ia, 2 + ix, 1 + ib
    if tier == "grade":
        return 6 + ia, 3 + ix, 2 + ib
    return 10 + ia, 4 + ix, 17 + ib


@_kind("linear", "axb")
def _lin_axb(p, tier):
    a, x, b = _lin_coeffs(tier, p[0], p[1], p[2])
    c = a * x + b
    q = f"Solve for x: {a}x + {b} = {c}.  What is x?"
    return _out(q, f"x = {x}", str(x), [
        f"{a}x + {b} = {c}",
        f"{a}x = {c} - {b} = {c - b}",
        f"x = {c - b} / {a}",
        _STEP_END.format(x)])


@_kind("linear", "both")
def _lin_both(p, tier):
    a, x, b = _lin_coeffs(tier, p[0], p[1], p[2])
    d = a - 2
    e = b + (a - d) * x
    q = f"Solve for x: {a}x + {b} = {d}x + {e}.  What is x?"
    return _out(q, f"x = {x}", str(x), [
        f"{a}x + {b} = {d}x + {e}",
        f"{a}x - {d}x = {e} - {b}",
        f"{a - d}x = {(a - d) * x}",
        _STEP_END.format(x)])


# ---- percentages ------------------------------------------------------#
# tier grids disjoint via N: 20x(1..8) / 20x(9..40) / 40x(21..100)
_PCT_X_E = [10, 20, 25, 50]
_PCT_X_G = [5, 15, 25, 35, 45, 65, 75, 85]
_PCT_X_H = [15, 25, 35, 45, 55, 75, 95]
_PCT_XG_E = [10, 50]
_PCT_XG_G = [10, 20, 25, 30]
_PCT_XG_H = [10, 20, 30, 50]
_PCT_CTX = {
    "of": ["Find {x}% of {N2}.",
           "A school has {N} students and {x}% of them play cricket.  "
           "How many students play cricket?",
           "A shopkeeper had {N} pens and sold {x}% of them.  How many "
           "pens did he sell?"],
    "grow": ["A library had {N} books and the collection then grew by "
             "{x}%.  How many books are there now?",
             "The entry fee was {N2} and was increased by {x}%.  What "
             "is the new fee?",
             "A batsman's score rose by {x}% from {N} runs after a "
             "revision.  What is the new score?"],
    "shrink": ["A jacket marked {N2} is sold at a {x}% discount.  "
               "What is the sale price?",
               "A town had {N} people and its population fell by {x}%.  "
               "What is the population now?",
               "The price of a bicycle fell by {x}% from {N2}.  What "
               "is the price now?"],
}


def _pct_N(tier, iN):
    if tier == "easy":
        return 20 * (1 + iN % 8)
    if tier == "grade":
        return 20 * (9 + iN % 32)
    return 40 * (21 + iN % 80)


def _pct_render(kind, x, N, ic):
    part = x * N // 100
    ctx = _PCT_CTX[kind][ic % len(_PCT_CTX[kind])]
    q = ctx.format(x=x, N=N, N2=_inr(N))
    if kind == "of":
        ans = part
        a = str(part)
        steps = [f"{x}% of {N} = {x}/100 x {N} = {x * N}/100",
                 _STEP_END.format(part)]
    elif kind == "grow":
        ans = N + part
        a = str(ans)
        steps = [f"Increase = {x}% of {N} = {part}",
                 f"New value = {N} + {part}",
                 _STEP_END.format(ans)]
    else:
        ans = N - part
        a = str(ans)
        steps = [f"Decrease = {x}% of {N} = {part}",
                 f"New value = {N} - {part}",
                 _STEP_END.format(ans)]
    return _out(q, a, str(ans), steps)


def _pct_common(kind):
    tiers = {"easy": None, "grade": None, "hard": None}
    if kind == "of":
        tiers = {"easy": (4, 8, 2), "grade": (8, 32, 3), "hard": (7, 80, 3)}
        xs = {"easy": _PCT_X_E, "grade": _PCT_X_G, "hard": _PCT_X_H}
    else:
        tiers = {"easy": (2, 8, 2), "grade": (4, 32, 3), "hard": (4, 80, 3)}
        xs = {"easy": _PCT_XG_E, "grade": _PCT_XG_G, "hard": _PCT_XG_H}
    return tiers, xs


def _pct_make(kind, xtable):
    def render(p, tier):
        tiers, xs = _pct_common(kind)
        sizes = tiers[tier]
        ix, iN, ic = p[0], p[1], p[2]
        x = xs[tier][ix % len(xs[tier])]
        return _pct_render(kind, x, _pct_N(tier, iN), ic)
    return render


_register("percentages", ("percent", "%"), (6, 8), {
    "easy": [("of", (4, 8, 2)), ("grow", (2, 8, 2)), ("shrink", (2, 8, 2))],
    "grade": [("of", (8, 32, 3)), ("grow", (4, 32, 3)), ("shrink", (4, 32, 3))],
    "hard": [("of", (7, 80, 3)), ("grow", (4, 80, 3)), ("shrink", (4, 80, 3))],
}, "x% of N, percentage increase/decrease/discount")

for _k in ("of", "grow", "shrink"):
    KIND_RENDER[("percentages", _k)] = _pct_make(_k, None)


# ---- ratio / proportion -----------------------------------------------#
# divide: tier grids disjoint via k (multiplier): 2..6 / 7..16 / 17..36
# unitary: disjoint via rate bands: 8..20 step4 / 22..35 / 40..55
_RATIO_PAIRS_ALL = [(1, 2), (2, 3), (3, 4), (4, 5), (2, 5), (3, 5),
                    (1, 3), (1, 4), (5, 6), (3, 7)]
_UNITARY_CTX = ["rice", "wheat", "sugar", "dal"]


@_kind("ratio", "divide")
def _ratio_divide(p, tier):
    pairs = _RATIO_PAIRS_ALL[:4] if tier == "easy" else _RATIO_PAIRS_ALL
    (a, b) = pairs[p[0] % len(pairs)]
    k = (2 + p[1] % 5) if tier == "easy" else (
        (7 + p[1] % 10) if tier == "grade" else (17 + p[1] % 20))
    A = (a + b) * k
    n1, n2 = _name(p[0] + p[1]), _name(p[0] + p[1] + 3)
    q = (f"Divide {_inr(A)} between {n1} and {n2} in the ratio "
         f"{a} : {b}.  What is the larger share?")
    large = b * k
    return _out(q, _inr(large), str(large), [
        f"Total parts = {a} + {b} = {a + b}",
        f"One part = {A} / {a + b} = {k}",
        f"Larger share = {b} x {k}",
        _STEP_END.format(large)])


@_kind("ratio", "unitary")
def _ratio_unitary(p, tier):
    if tier == "easy":
        q1, rate, q2 = 2 + p[0] % 4, (8, 12, 16, 20)[p[1] % 4], 2 + p[2] % 4
    elif tier == "grade":
        q1, rate, q2 = 6 + p[0] % 4, 22 + p[1] % 14, 2 + p[2] % 8
    else:
        q1, rate, q2 = 3 + p[0] % 8, 40 + p[1] % 16, 6 + p[2] % 12
    c1 = q1 * rate
    c2 = q2 * rate
    item = _UNITARY_CTX[p[3] % len(_UNITARY_CTX)]
    q = (f"If {q1} kg of {item} costs {_inr(c1)}, what is the cost of "
         f"{q2} kg of the same {item}?")
    return _out(q, _inr(c2), str(c2), [
        f"Cost of 1 kg = {c1} / {q1} = {rate}",
        f"Cost of {q2} kg = {q2} x {rate}",
        _STEP_END.format(c2)])


_register("ratio", ("ratio", "proportion"), (6, 8), {
    "easy": [("divide", (4, 5)), ("unitary", (4, 4, 4, 2))],
    "grade": [("divide", (10, 10)), ("unitary", (4, 14, 8, 3))],
    "hard": [("divide", (10, 20)), ("unitary", (8, 16, 12, 4))],
}, "divide an amount in a ratio, unitary-method proportion")


# ---- LCM / HCF from prime factors --------------------------------------#
# plain: disjoint via the HCF h: 2..5 / 6..9 / 10..25
# primes: disjoint via the exponent of 2: 1..2 / 3..4 / 5..6
def _hcf_plain_pairs(hs, mns):
    return sorted({(h * m, h * n) for h in hs for (m, n) in mns})


_HCF_MNS_E = [(2, 3), (3, 4), (2, 5), (3, 5)]
_HCF_MNS_G = _HCF_MNS_E + [(4, 5), (5, 6)]
_HCF_E = _hcf_plain_pairs([2, 3, 4, 5], _HCF_MNS_E)
_HCF_G = _hcf_plain_pairs([6, 7, 8, 9], _HCF_MNS_G)
_HCF_H = _hcf_plain_pairs(list(range(10, 26)), _HCF_MNS_G)


@_kind("lcm_hcf", "hcf_plain")
def _lcm_hcf_hp(p, tier):
    return _hcf_plain(p, tier, "hcf")


@_kind("lcm_hcf", "lcm_plain")
def _lcm_hcf_lp(p, tier):
    return _hcf_plain(p, tier, "lcm")


def _hcf_plain(p, tier, ask):
    pairs = {"easy": _HCF_E, "grade": _HCF_G, "hard": _HCF_H}[tier]
    a, b = pairs[p[0] % len(pairs)]
    h = _gcd(a, b)
    if ask == "hcf":
        q = f"Find the HCF of {a} and {b}."
        ans = h
        steps = [f"{a} = {h} x {a // h} and {b} = {h} x {b // h}",
                 _STEP_END.format(h)]
    else:
        q = f"Find the LCM of {a} and {b}."
        ans = a * b // h
        steps = [f"HCF({a}, {b}) = {h}",
                 f"LCM = {a} x {b} / {h} = {a * b}/{h}",
                 _STEP_END.format(ans)]
    return _out(q, str(ans), str(ans), steps)


def _hcf_primes(p, tier, ask):
    if tier == "easy":
        pp, pq, pr = 1 + p[0] % 2, 1 + p[1] % 2, p[2] % 2
        ps, pt, pu = 1 + p[3] % 2, 1 + p[4] % 2, 1
    elif tier == "grade":
        pp, pq, pr = 3 + p[0] % 2, 1 + p[1] % 3, p[2] % 3
        ps, pt, pu = 3 + p[3] % 2, 1 + p[4] % 3, 1
    else:
        pp, pq, pr = 5 + p[0] % 2, 2 + p[1] % 2, 1
        ps, pt, pu = 5 + p[3] % 2, 2 + p[4] % 2, 2
    ta = _pow_text([(2, pp), (3, pq), (5, pr)])
    tb = _pow_text([(2, ps), (3, pt), (7, pu)])
    if ask == "hcf":
        h = (2 ** min(pp, ps)) * (3 ** min(pq, pt))
        q = (f"The prime factorisations of two numbers are "
             f"A = {ta} and B = {tb}.  Find the HCF of A and B.")
        steps = ["Common primes: 2 and 3; take the lowest power of each",
                 f"HCF = 2^{min(pp, ps)} x 3^{min(pq, pt)}",
                 _STEP_END.format(h)]
        ans = h
    else:
        ans = (2 ** max(pp, ps)) * (3 ** max(pq, pt)) * (5 ** pr) \
            * (7 ** pu)
        q = (f"The prime factorisations of two numbers are "
             f"A = {ta} and B = {tb}.  Find the LCM of A and B.")
        steps = ["Take the highest power of every prime that appears",
                 f"LCM = 2^{max(pp, ps)} x 3^{max(pq, pt)} x 5^{pr} "
                 f"x 7^{pu}",
                 _STEP_END.format(ans)]
    return _out(q, str(ans), str(ans), steps)


@_kind("lcm_hcf", "hcf_primes")
def _lcm_hcf_hpr(p, tier):
    return _hcf_primes(p, tier, "hcf")


@_kind("lcm_hcf", "lcm_primes")
def _lcm_hcf_lpr(p, tier):
    return _hcf_primes(p, tier, "lcm")


_register("lcm_hcf", ("hcf", "lcm", "highest common", "lowest common",
                      "common factor", "prime factor"), (6, 10), {
    "easy": [("hcf_plain", (len(_HCF_E),)), ("lcm_plain", (len(_HCF_E),)),
             ("hcf_primes", (2, 2, 2, 2, 2, 1)),
             ("lcm_primes", (2, 2, 2, 2, 2, 1))],
    "grade": [("hcf_plain", (len(_HCF_G),)), ("lcm_plain", (len(_HCF_G),)),
              ("hcf_primes", (2, 3, 3, 2, 3, 1)),
              ("lcm_primes", (2, 3, 3, 2, 3, 1))],
    "hard": [("hcf_plain", (len(_HCF_H),)), ("lcm_plain", (len(_HCF_H),)),
             ("hcf_primes", (2, 2, 1, 2, 2, 1)),
             ("lcm_primes", (2, 2, 1, 2, 2, 1))],
}, "HCF/LCM of two numbers and from prime factorisations")


# ---- simple interest ----------------------------------------------------#
# tier grids disjoint via P: 1000x(2..10) / 500x(42..78) / 500x(80..140)
_SI_CTX = ["deposits {P} in a bank at {R}% per annum simple interest",
           "borrows {P} from a co-operative society at {R}% per annum "
           "simple interest",
           "puts {P} into a post-office scheme that pays {R}% per annum "
           "simple interest"]
_SI_R = [3, 4, 5, 6, 7, 8, 9, 10, 12]


def _si_render(p, tier, ask_amount):
    if tier == "easy":
        P = 1000 * (2 + p[0] % 9)
        R = [4, 5, 6, 8][p[1] % 4]
        T = 1 + p[2] % 3
        ic = p[3] % 2
    elif tier == "grade":
        P = 500 * (42 + p[0] % 37)
        R = _SI_R[p[1] % 9]
        T = 1 + p[2] % 5
        ic = p[3] % 3
    else:
        P = 500 * (80 + p[0] % 61)
        R = _SI_R[p[1] % 9]
        T = 2 + p[2] % 7
        ic = p[3] % 3
    si = P * R * T // 100
    name = _name(p[3] + P)
    ctx = _SI_CTX[ic % len(_SI_CTX)].format(P=_inr(P), R=R)
    if ask_amount:
        ans = P + si
        q = (f"{name} {ctx}.  Find the total amount after {T} years.")
        steps = [f"SI = P x R x T / 100 = {P} x {R} x {T} / 100 = {si}",
                 f"Amount = {P} + {si}",
                 _STEP_END.format(ans)]
    else:
        ans = si
        q = (f"{name} {ctx}.  Find the simple interest earned in "
             f"{T} years.")
        steps = [f"SI = P x R x T / 100 = {P} x {R} x {T} / 100",
                 _STEP_END.format(si)]
    return _out(q, _inr(ans), str(ans), steps)


def _si_kind(ask_amount):
    def render(p, tier):
        return _si_render(p, tier, ask_amount)
    return render


_register("simple_interest", ("simple interest",), (7, 8), {
    "easy": [("si", (9, 4, 3, 2)), ("amt", (9, 4, 3, 2))],
    "grade": [("si", (37, 9, 5, 3)), ("amt", (37, 9, 5, 3))],
    "hard": [("si", (61, 9, 7, 3)), ("amt", (61, 9, 7, 3))],
}, "SI = PRT/100 and amount")

KIND_RENDER[("simple_interest", "si")] = _si_kind(False)
KIND_RENDER[("simple_interest", "amt")] = _si_kind(True)


# ---- area / perimeter -----------------------------------------------------#
# rect: disjoint via length bands 3..7 / 8..17 / 18..37
# tri: disjoint via base bands {4..10} / {12..20} / {22..38} (even)
# circle: disjoint via radius bands {7,14} / {21,28,35} / {42..70}
def _area_rect(p, tier, kind):
    if tier == "easy":
        l, w = 3 + p[0] % 5, 2 + p[1] % 5
        rate = (10, 15)[p[2] % 2] if len(p) > 2 else 10
    elif tier == "grade":
        l, w = 8 + p[0] % 10, 7 + p[1] % 10
        rate = (10, 15, 20)[p[2] % 3] if len(p) > 2 else 10
    else:
        l, w = 18 + p[0] % 20, 17 + p[1] % 20
        rate = (15, 20, 25)[p[2] % 3] if len(p) > 2 else 15
    if kind == "area":
        ans = l * w
        q = (f"A rectangular classroom is {l} m long and {w} m wide.  "
             f"Find its area.")
        steps = [f"Area = length x width = {l} x {w}",
                 _STEP_END.format(ans)]
        unit = " sq m"
    elif kind == "peri":
        ans = 2 * (l + w)
        q = (f"A rectangular park is {l} m long and {w} m wide.  "
             f"Find its perimeter.")
        steps = [f"Perimeter = 2 x (length + width) = 2 x ({l} + {w})",
                 _STEP_END.format(ans)]
        unit = " m"
    else:
        peri = 2 * (l + w)
        ans = peri * rate
        q = (f"A rectangular field is {l} m long and {w} m wide.  Find "
             f"the cost of fencing it at {_inr(rate)} per metre.")
        steps = [f"Perimeter = 2 x ({l} + {w}) = {peri} m",
                 f"Cost = {peri} x {rate}",
                 _STEP_END.format(ans)]
        unit = ""
    return _out(q, str(ans) + unit, str(ans), steps)


def _area_tri(p, tier):
    if tier == "easy":
        b, h = (4, 6, 8, 10)[p[0] % 4], 3 + p[1] % 6
    elif tier == "grade":
        b, h = (12, 14, 16, 18, 20)[p[0] % 5], 9 + p[1] % 12
    else:
        b, h = (22, 24, 26, 28, 30, 32, 34, 36, 38)[p[0] % 9], \
            21 + p[1] % 30
    ans = b * h // 2
    q = (f"Find the area of a triangle with base {b} cm and height "
         f"{h} cm.")
    return _out(q, f"{ans} sq cm", str(ans), [
        f"Area = 1/2 x base x height = 1/2 x {b} x {h}",
        _STEP_END.format(ans)])


_AR_R = {"easy": (7, 14), "grade": (21, 28, 35),
         "hard": (42, 49, 56, 63, 70)}


def _area_circle(p, tier, kind):
    rs = _AR_R[tier]
    r = rs[p[0] % len(rs)]
    ic = p[1] % 3
    if kind == "area":
        ans = 22 * r * r // 7
        shape = ("circular park", "circular pond", "circular garden")[ic]
        q = (f"Find the area of a {shape} whose radius is {r} m.  "
             f"(Take pi = 22/7)")
        steps = [f"Area = pi x r^2 = 22/7 x {r} x {r}",
                 _STEP_END.format(ans)]
        unit = " sq m"
    else:
        ans = 44 * r // 7
        shape = ("circular track", "circular ring", "round table "
                 "edge")[ic]
        q = (f"Find the circumference of a {shape} of radius {r} m.  "
             f"(Take pi = 22/7)")
        steps = [f"Circumference = 2 x pi x r = 2 x 22/7 x {r}",
                 _STEP_END.format(ans)]
        unit = " m"
    return _out(q, str(ans) + unit, str(ans), steps)


_register("area_perimeter", ("area", "perimeter", "circumference"),
          (6, 10), {
    "easy": [("rect_area", (5, 5)), ("rect_peri", (5, 5)),
             ("tri_area", (4, 6)), ("circ_area", (2, 3)),
             ("circ_circ", (2, 3))],
    "grade": [("rect_area", (10, 10)), ("rect_peri", (10, 10)),
              ("rect_fence", (10, 10, 3)), ("tri_area", (5, 12)),
              ("circ_area", (3, 3)), ("circ_circ", (3, 3))],
    "hard": [("rect_area", (20, 20)), ("rect_peri", (20, 20)),
             ("rect_fence", (20, 20, 3)), ("tri_area", (9, 30)),
             ("circ_area", (5, 3)), ("circ_circ", (5, 3))],
}, "rectangle/triangle areas and perimeters, circles with pi = 22/7")

for _k in ("area", "peri", "fence"):
    KIND_RENDER[("area_perimeter",
                 {"area": "rect_area", "peri": "rect_peri",
                  "fence": "rect_fence"}[_k])] = \
        (lambda kk: (lambda p, tier: _area_rect(p, tier, kk)))(_k)
KIND_RENDER[("area_perimeter", "tri_area")] = \
    lambda p, tier: _area_tri(p, tier)
KIND_RENDER[("area_perimeter", "circ_area")] = \
    lambda p, tier: _area_circle(p, tier, "area")
KIND_RENDER[("area_perimeter", "circ_circ")] = \
    lambda p, tier: _area_circle(p, tier, "circ")


# ---- exponents / roots ------------------------------------------------------#
# pw: disjoint via a bands 2..9 (m=2) / 2..9 (m=3) / 10..14 (m 2..3)
# sq/cb: disjoint via root bands; law: disjoint via base bands
@_kind("exponents_roots", "pw")
def _exp_power(p, tier):
    if tier == "easy":
        a, m = 2 + p[0] % 8, 2
    elif tier == "grade":
        a, m = 2 + p[0] % 8, 3
    else:
        a, m = 10 + p[0] % 5, 2 + p[1] % 2
    ans = a ** m
    q = f"Evaluate {a}^{m}."
    return _out(q, str(ans), str(ans), [
        f"{a}^{m} = " + " x ".join([str(a)] * m),
        _STEP_END.format(ans)])


@_kind("exponents_roots", "sq")
def _exp_sqrt(p, tier):
    n = (4 + p[0] % 6) if tier == "easy" else (
        (10 + p[0] % 8) if tier == "grade" else (18 + p[0] % 13))
    ans = n * n
    return _out(f"Find the square root of {ans}.", str(n), str(n), [
        f"{n}^2 = {ans}, so the square root of {ans} is {n}",
        _STEP_END.format(n)])


@_kind("exponents_roots", "cb")
def _exp_cbrt(p, tier):
    n = (2 + p[0] % 5) if tier == "easy" else (
        (7 + p[0] % 5) if tier == "grade" else (12 + p[0] % 5))
    ans = n ** 3
    return _out(f"Find the cube root of {ans}.", str(n), str(n), [
        f"{n}^3 = {ans}, so the cube root of {ans} is {n}",
        _STEP_END.format(n)])


@_kind("exponents_roots", "law")
def _exp_law(p, tier):
    if tier == "easy":
        a, m, n = 2 + p[0] % 4, 2 + p[1] % 2, 2 + p[2] % 2
    elif tier == "grade":
        a, m, n = 6 + p[0] % 4, 2 + p[1] % 3, 2 + p[2] % 3
    else:
        a, m, n = 10 + p[0] % 3, 2 + p[1] % 5, 2 + p[2] % 5
    ans = a ** (m + n)
    q = f"Using the law a^m x a^n = a^(m+n), evaluate {a}^{m} x {a}^{n}."
    return _out(q, str(ans), str(ans), [
        f"{a}^{m} x {a}^{n} = {a}^({m} + {n}) = {a}^{m + n}",
        _STEP_END.format(ans)])


_register("exponents_roots",
          ("exponent", "power", "square root", "cube root",
           "square numbers", "cube numbers", "squares", "cubes"),
          (6, 8), {
    "easy": [("pw", (8,)), ("sq", (6,)), ("cb", (5,)), ("law", (4, 2, 2))],
    "grade": [("pw", (8,)), ("sq", (8,)), ("cb", (5,)), ("law", (4, 3, 3))],
    "hard": [("pw", (5, 2)), ("sq", (13,)), ("cb", (5,)),
             ("law", (3, 5, 5))],
}, "powers, square/cube roots, exponent laws")


# ---- fractions -----------------------------------------------------------------#
# arith: disjoint via denominator bands {2,4} / {5,8,10} / {16,20,25,40}
# of_qty: disjoint via k bands 2..7 / 8..18 / 19..40
def _smooth_fracs(d1s, d2s, ops):
    """All (n1/d1, n2/d2, op) with 2/5-smooth denominators -> every
    result terminates.  Deterministic enumeration; texts embed the four
    numbers + op, so distinct entries never collide."""
    out = []
    for op in ops:
        for d1 in d1s:
            for d2 in d2s:
                for n1 in range(1, d1):
                    for n2 in range(1, d2):
                        out.append((n1, d1, n2, d2, op))
    return out


_FR_E = _smooth_fracs((2, 4), (2, 4), ("+", "-"))
_FR_G = _smooth_fracs((5, 8, 10), (5, 8, 10), ("+", "-"))
_FR_H = _smooth_fracs((16, 20, 25, 40), (16, 20, 25, 40), ("+", "-"))
_FR_E_M = _smooth_fracs((2, 4), (2, 4), ("x",))
_FR_G_M = _smooth_fracs((5, 8, 10), (5, 8, 10), ("x",))
_FR_H_M = _smooth_fracs((16, 20, 25, 40), (16, 20, 25, 40), ("x",))
_FR_DS = (3, 4, 5, 8)
_FR_DS_H = (4, 5, 8, 10)


@_kind("fractions", "of")
def _frac_of(p, tier):
    if tier == "easy":
        d, n, k, ic = _FR_DS[p[0] % 4], 1 + p[1] % 2, 2 + p[2] % 6, \
            p[3] % 2
    elif tier == "grade":
        d, n, k, ic = _FR_DS[p[0] % 4], 1 + p[1] % 2, 8 + p[2] % 11, \
            p[3] % 2
    else:
        d = _FR_DS_H[p[0] % 4]
        n = min(1 + p[1] % 3, d - 1)
        k, ic = 19 + p[2] % 22, p[3] % 2
    Q = d * k
    ans = n * k
    ctx = ("A ribbon {Q} cm long is cut into {d} equal pieces.  What is "
           "the length of {n}/{d} of the ribbon in cm?",
           "Out of {Q} sweets shared equally among {d} friends, how "
           "many sweets are {n}/{d} of the total?")[ic]
    q = ctx.format(Q=Q, d=d, n=n)
    return _out(q, str(ans), str(ans), [
        f"{n}/{d} of {Q} = {n} x {Q} / {d} = {n * Q}/{d}",
        _STEP_END.format(ans)])


@_kind("fractions", "arith")
def _frac_arith(p, tier):
    table = {"easy": _FR_E, "grade": _FR_G, "hard": _FR_H}[tier]
    n1, d1, n2, d2, op = table[p[0] % len(table)]
    f1, f2 = Fraction(n1, d1), Fraction(n2, d2)
    res = f1 + f2 if op == "+" else f1 - f2
    ans = _dec(res)
    m = f1.denominator * f2.denominator // _gcd(f1.denominator,
                                                f2.denominator)
    q = (f"{op.capitalize()}: {n1}/{d1} {op} {n2}/{d2} = ?  (give your "
         f"answer as a decimal)")
    return _out(q, ans, ans, [
        f"LCM of {d1} and {d2} is {m}",
        f"{n1}/{d1} = {n1 * m // d1}/{m} and "
        f"{n2}/{d2} = {n2 * m // d2}/{m}",
        f"= {res} = {ans}"])


@_kind("fractions", "mul")
def _frac_mul(p, tier):
    table = {"easy": _FR_E_M, "grade": _FR_G_M, "hard": _FR_H_M}[tier]
    n1, d1, n2, d2, _op = table[p[0] % len(table)]
    res = Fraction(n1, d1) * Fraction(n2, d2)
    ans = _dec(res)
    q = (f"Multiply: {n1}/{d1} x {n2}/{d2} = ?  (give your answer as a "
         f"decimal)")
    return _out(q, ans, ans, [
        f"{n1}/{d1} x {n2}/{d2} = "
        f"{n1 * n2}/{d1 * d2}",
        f"= {res} = {ans}"])


_register("fractions", ("fraction",), (6, 8), {
    "easy": [("of", (4, 2, 6, 2)), ("arith", (len(_FR_E),)),
             ("mul", (len(_FR_E_M),))],
    "grade": [("of", (4, 2, 11, 2)), ("arith", (len(_FR_G),)),
              ("mul", (len(_FR_G_M),))],
    "hard": [("of", (4, 3, 22, 2)), ("arith", (len(_FR_H),)),
             ("mul", (len(_FR_H_M),))],
}, "fraction of a quantity, add/subtract/multiply fractions")


# ===================================================================== #
# CLASSES 9-10 FAMILIES
# ===================================================================== #

# ---- quadratics -------------------------------------------------------------#
# roots drawn from disjoint bands per tier:
#   easy: 1..6   grade: -12..-1 U 7..12   hard: -20..-13 U 13..20
def _quad_roots(tier):
    if tier == "easy":
        return list(range(1, 7))
    if tier == "grade":
        return list(range(-12, 0)) + list(range(7, 13))
    return list(range(-20, -12)) + list(range(13, 21))


def _quad_pairs(rs, distinct, a_vals):
    out = []
    for a in a_vals:
        for i, r1 in enumerate(rs):
            for r2 in (rs[i + 1:] if distinct else rs[i:]):
                out.append((a, r1, r2))
    return out


def _linfac(r: int) -> str:
    if r == 0:
        return "x"
    return f"(x - {r})" if r > 0 else f"(x + {abs(r)})"


@_kind("quadratics", "fac")
def _quad_factor(p, tier):
    pairs = _quad_pairs(_quad_roots(tier), False, [1])
    a, r1, r2 = pairs[p[0] % len(pairs)]
    b, c = -(r1 + r2), r1 * r2
    large = max(r1, r2)
    q = (f"Solve by factorisation: {_quad_text(1, b, c)}.  "
         f"What is the larger root?")
    return _out(q, f"the larger root is {large}", str(large), [
        f"Factorise: {_linfac(r1)}{_linfac(r2)} = 0",
        f"x = {r1} or x = {r2}",
        _STEP_END.format(large)])


@_kind("quadratics", "form")
def _quad_formula(p, tier):
    avs = [1] if tier == "easy" else ([1, 2, 3] if tier == "grade"
                                      else [2, 3, 4])
    combos = _quad_pairs(_quad_roots(tier), True, avs)
    a, r1, r2 = combos[p[0] % len(combos)]
    b, c = -a * (r1 + r2), a * r1 * r2
    disc = b * b - 4 * a * c          # perfect square > 0 by design
    large = max(r1, r2)
    rt = _isqrt(disc)
    q = (f"Solve using the quadratic formula: {_quad_text(a, b, c)}.  "
         f"What is the larger root?")
    return _out(q, f"the larger root is {large}", str(large), [
        f"D = b^2 - 4ac = ({b})^2 - 4 x {a} x ({c}) = {disc}",
        f"x = ({-b} + {rt}) / {2 * a} or ({-b} - {rt}) / {2 * a}",
        _STEP_END.format(large)])


@_kind("quadratics", "disc")
def _quad_disc(p, tier):
    if tier == "easy":
        a, half = 1, 9
    elif tier == "grade":
        a, half = 2 + p[0] % 2, 12
    else:
        a, half = 4 + p[0] % 6, 15
    b = p[1] % (2 * half + 1) - half
    c = p[2] % (2 * half + 1) - half
    if tier == "easy":
        b, c = 1 + p[1] % 9, 1 + p[2] % 9
    d = b * b - 4 * a * c
    q = f"Find the discriminant of {_quad_text(a, b, c)}."
    return _out(q, f"D = {d}", str(d), [
        f"D = b^2 - 4ac = ({b})^2 - 4 x {a} x ({c})",
        f"= {b * b} - {4 * a * c}",
        _STEP_END.format(d)])


@_kind("quadratics", "zero")
def _quad_zero(p, tier):
    if tier == "easy":
        avs, rr = (1,), range(2, 10)
    elif tier == "grade":
        avs, rr = (2, 3), list(range(-8, 0)) + list(range(1, 9))
    else:
        avs, rr = (4, 5, 6), list(range(-12, 0)) + list(range(1, 13))
    combos = [(a, r) for a in avs for r in rr]
    a, r1 = combos[p[0] % len(combos)]
    b, c = -2 * a * r1, a * r1 * r1
    q = (f"The equation {_quad_text(a, b, c)} has two equal roots.  "
         f"What is the repeated root?")
    return _out(q, f"x = {r1}", str(r1), [
        "D = b^2 - 4ac = 0, so both roots are equal",
        f"x = -b / 2a = {-b} / {2 * a}",
        _STEP_END.format(r1)])


_register("quadratics", ("quadratic", "discriminant", "nature of root",
                         "factorization", "factorisation"), (9, 10), {
    "easy": [("fac", (21,)), ("form", (15,)), ("disc", (1, 9, 9)),
             ("zero", (8,))],
    "grade": [("fac", (171,)), ("form", (459,)), ("disc", (2, 25, 25)),
              ("zero", (32,))],
    "hard": [("fac", (136,)), ("form", (360,)), ("disc", (6, 31, 31)),
             ("zero", (72,))],
}, "quadratic roots by factorisation/formula, discriminant sign picked "
   "deliberately (D>0 / D=0 kinds; the disc kind exercises any sign)")


# ---- arithmetic progressions ---------------------------------------------------#
# disjoint via the first term a: 1..10 / (-20..-1 U 11..30) / 31..70
def _ap_a(tier, ia):
    if tier == "easy":
        return 1 + ia % 10
    if tier == "grade":
        return (11 + ia % 20) if ia % 40 < 20 else (-1 - ia % 20)
    return 31 + ia % 40


def _ap_d(tier, id_):
    if tier == "easy":
        return 2 + id_ % 4
    if tier == "grade":
        return 2 + id_ % 11
    return 13 + id_ % 7


def _ap_terms(a, d, k=4):
    return ", ".join(str(a + i * d) for i in range(k))


@_kind("ap", "nth")
def _ap_nth(p, tier):
    a, d = _ap_a(tier, p[0]), _ap_d(tier, p[1])
    n = (3 + p[2] % 8) if tier == "easy" else (
        (3 + p[2] % 18) if tier == "grade" else (21 + p[2] % 20))
    ans = a + (n - 1) * d
    q = (f"Find the {_ordinal(n)} term of the AP: {_ap_terms(a, d)}, ...")
    return _out(q, f"{ans} (the {_ordinal(n)} term)", str(ans), [
        f"a = {a}, d = {d}",
        f"a_n = a + (n - 1)d = {a} + ({n} - 1) x {d}",
        _STEP_END.format(ans)])


@_kind("ap", "sum")
def _ap_sum(p, tier):
    a, d = _ap_a(tier, p[0]), _ap_d(tier, p[1])
    if tier == "easy":
        n = (4, 6, 8)[p[2] % 3]
    elif tier == "grade":
        n = (4, 6, 8, 10, 12, 14, 16)[p[2] % 7]
    else:
        n = tuple(range(8, 31, 2))[p[2] % 12]
    s = n * (2 * a + (n - 1) * d) // 2      # n even -> exact
    q = (f"Find the sum of the first {n} terms of the AP: "
         f"{_ap_terms(a, d)}, ...")
    return _out(q, f"S = {s}", str(s), [
        "S_n = n/2 x (2a + (n - 1)d)",
        f"= {n}/2 x (2 x {a} + ({n} - 1) x {d})",
        _STEP_END.format(s)])


@_kind("ap", "which")
def _ap_which(p, tier):
    a, d = _ap_a(tier, p[0]), _ap_d(tier, p[1])
    n = (5 + p[2] % 6) if tier == "easy" else (
        (5 + p[2] % 21) if tier == "grade" else (6 + p[2] % 25))
    t = a + (n - 1) * d
    q = (f"Which term of the AP: {_ap_terms(a, d)}, ... is equal to "
         f"{t}?")
    return _out(q, f"the {_ordinal(n)} term", str(n), [
        f"a_n = a + (n - 1)d = {t}",
        f"{t} = {a} + (n - 1) x {d}  =>  (n - 1) x {d} = {t - a}",
        f"n - 1 = {(t - a) // d}",
        _STEP_END.format(n)])


_register("ap", ("arithmetic progression", " ap"), (9, 10), {
    "easy": [("nth", (10, 4, 8)), ("sum", (10, 4, 3)),
             ("which", (10, 4, 6))],
    "grade": [("nth", (40, 11, 18)), ("sum", (40, 11, 7)),
              ("which", (40, 11, 21))],
    "hard": [("nth", (40, 7, 20)), ("sum", (40, 7, 12)),
             ("which", (40, 7, 25))],
}, "AP nth term, sum of n terms (n even -> exact), which-term")


# ---- triangles (Pythagoras triples, similar-triangle ratios) --------------------#
_PYTH_TRIPLES = [(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25),
                 (20, 21, 29), (9, 40, 41), (12, 35, 37)]
_SIM_PAIRS = [(1, 2), (2, 3), (3, 4), (2, 5), (3, 5), (4, 5), (1, 3),
              (1, 5), (5, 6), (3, 7)]


@_kind("triangles", "hyp")
def _tri_hyp(p, tier):
    ks = {"easy": (1,), "grade": (2, 3), "hard": (4, 5, 6, 7, 8)}[tier]
    (x, y, z) = _PYTH_TRIPLES[p[0] % len(_PYTH_TRIPLES)]
    k = ks[p[1] % len(ks)]
    a, b, c = x * k, y * k, z * k
    q = (f"A right-angled triangle has legs {a} cm and {b} cm.  "
         f"Find the length of its hypotenuse (in cm).")
    return _out(q, f"{c} cm", str(c), [
        f"{a}^2 + {b}^2 = {a * a} + {b * b} = {c * c}",
        _STEP_END.format(c)])


@_kind("triangles", "leg")
def _tri_leg(p, tier):
    ks = {"easy": (1,), "grade": (2, 3), "hard": (4, 5, 6, 7, 8)}[tier]
    (x, y, z) = _PYTH_TRIPLES[p[0] % len(_PYTH_TRIPLES)]
    k = ks[p[1] % len(ks)]
    a, b, c = x * k, y * k, z * k
    q = (f"The hypotenuse of a right-angled triangle is {c} cm and "
         f"one leg is {b} cm.  Find the other leg (in cm).")
    return _out(q, f"{a} cm", str(a), [
        f"{a}^2 + {b}^2 = {c}^2 (Pythagoras)",
        f"{a}^2 = {c * c} - {b * b} = {c * c - b * b}",
        _STEP_END.format(a)])


@_kind("triangles", "sim")
def _tri_sim(p, tier):
    pairs = _SIM_PAIRS[:5] if tier == "easy" else _SIM_PAIRS
    ms = {"easy": (1,), "grade": (1, 2, 3, 4), "hard": (2, 3, 4, 5, 6)}[
        tier]
    t = (1 + p[2] % 5) if tier == "easy" else (
        (6 + p[2] % 8) if tier == "grade" else (14 + p[2] % 16))
    (pq, qr) = pairs[p[0] % len(pairs)]
    m = ms[p[1] % len(ms)]
    AB, PQ = pq * m, qr * m
    BC, QRt = pq * t, qr * t
    q = (f"Triangle ABC is similar to triangle PQR.  If AB = {AB} cm, "
         f"PQ = {PQ} cm and BC = {BC} cm, find QR (in cm).")
    return _out(q, f"{QRt} cm", str(QRt), [
        f"AB/PQ = BC/QR  =>  {AB}/{PQ} = {BC}/QR",
        f"QR = {BC} x {PQ} / {AB}",
        _STEP_END.format(QRt)])


_register("triangles", ("pythagoras", "similar triangle", "similarity",
                        "shadow"), (7, 10), {
    "easy": [("hyp", (4, 1)), ("leg", (4, 1)), ("sim", (5, 1, 5))],
    "grade": [("hyp", (7, 2)), ("leg", (7, 2)), ("sim", (10, 4, 8))],
    "hard": [("hyp", (7, 5)), ("leg", (7, 5)), ("sim", (10, 5, 16))],
}, "Pythagorean triples and similar-triangle ratio sides")


# ---- coordinate geometry ---------------------------------------------------------#
# primitive Pythagorean deltas only (non-proportional pairs): with the
# tier-disjoint k bands, (delta, k) -> (dx, dy) stays injective
_COORD_DELTAS = [(3, 4), (5, 12), (8, 15), (7, 24), (20, 21)]


@_kind("coordinate", "dist")
def _coord_distance(p, tier):
    if tier == "easy":
        x1, y1, ks = 1 + p[0] % 6, 1 + p[1] % 6, (1,)
    elif tier == "grade":
        x1, y1, ks = -6 + p[0] % 12, -6 + p[1] % 12, (2, 3)
    else:
        x1, y1, ks = -12 + p[0] % 20, -12 + p[1] % 20, (4, 5, 6)
    dx0, dy0 = _COORD_DELTAS[p[2] % len(_COORD_DELTAS)]
    k = ks[p[3] % len(ks)]
    sgn = 1 if p[4] % 2 == 0 else -1
    dx, dy = dx0 * k, dy0 * k * sgn
    x2, y2 = x1 + dx, y1 + dy
    dist = k * _isqrt(dx0 * dx0 + dy0 * dy0)
    q = (f"Find the distance between the points A({x1}, {y1}) and "
         f"B({x2}, {y2}).")
    return _out(q, f"{dist} units", str(dist), [
        "d = sqrt((x2 - x1)^2 + (y2 - y1)^2)",
        f"= sqrt(({dx})^2 + ({dy})^2) = sqrt({dx * dx + dy * dy})",
        _STEP_END.format(dist)])


@_kind("coordinate", "midx")
def _coord_midx(p, tier):
    if tier == "easy":
        x1, ux = 1 + p[0] % 8, 1 + p[1] % 5
        y1, vy = 1 + p[2] % 8, 1 + p[3] % 5
    elif tier == "grade":
        x1, ux = -8 + p[0] % 8, 1 + p[1] % 8
        y1, vy = -8 + p[2] % 8, 1 + p[3] % 8
    else:
        x1, ux = 10 + p[0] % 16, 1 + p[1] % 12
        y1, vy = 10 + p[2] % 16, 1 + p[3] % 12
    x2, y2 = x1 + 2 * ux, y1 + 2 * vy
    ans = x1 + ux
    q = (f"A({x1}, {y1}) and B({x2}, {y2}) are two points.  Find the "
         f"x-coordinate of the midpoint of AB.")
    return _out(q, f"x = {ans}", str(ans), [
        "Midpoint = ((x1 + x2)/2, (y1 + y2)/2)",
        f"x-coordinate = ({x1} + {x2}) / 2",
        _STEP_END.format(ans)])


_SEC_RATIOS = [(1, 2), (2, 1), (1, 3), (3, 1), (2, 3), (3, 2), (1, 4),
               (4, 1)]


@_kind("coordinate", "secx")
def _coord_section(p, tier):
    if tier == "easy":
        x1, y1 = 1 + p[1] % 8, 1 + p[2] % 6
        u, v = 1 + p[3] % 4, 1 + p[4] % 4
    elif tier == "grade":
        x1, y1 = -8 + p[1] % 8, -6 + p[2] % 6
        u, v = 1 + p[3] % 6, 1 + p[4] % 5
    else:
        x1, y1 = 12 + p[1] % 18, 10 + p[2] % 16
        u, v = 1 + p[3] % 8, 1 + p[4] % 7
    (m, n) = _SEC_RATIOS[p[0] % len(_SEC_RATIOS)]
    s = m + n
    x2, y2 = x1 + s * u, y1 + s * v
    ans = x1 + m * u
    q = (f"Find the x-coordinate of the point that divides the line "
         f"segment joining A({x1}, {y1}) and B({x2}, {y2}) internally "
         f"in the ratio {m} : {n}.")
    return _out(q, f"x = {ans}", str(ans), [
        "x = (m x2 + n x1) / (m + n)",
        f"= ({m} x {x2} + {n} x {x1}) / {s}",
        _STEP_END.format(ans)])


_register("coordinate", ("distance between two points",
                         "distance of a point", "section formula",
                         "midpoint", "dividing a segment", "cartesian",
                         "coordinates of a point"), (9, 10), {
    "easy": [("dist", (6, 6, 5, 1, 2)), ("midx", (8, 5, 8, 5))],
    "grade": [("dist", (12, 12, 5, 2, 2)), ("midx", (8, 8, 8, 8)),
              ("secx", (8, 8, 6, 6, 5))],
    "hard": [("dist", (20, 20, 5, 3, 2)), ("midx", (16, 12, 16, 12)),
             ("secx", (8, 18, 16, 8, 7))],
}, "distance formula (Pythagorean-friendly), midpoint, section formula")


# ---- trigonometry (standard angles, identity verification) ------------------------#
# Every atom is RATIONAL by construction (squares kill the surds).  Tier
# atom SLICES are disjoint: easy 0..5, grade 6..11, hard 12..17.
_TRIG_ATOMS = [
    ("sin 30°", Fraction(1, 2)), ("cos 60°", Fraction(1, 2)),
    ("tan 45°", Fraction(1, 1)), ("cot 45°", Fraction(1, 1)),
    ("sin 90°", Fraction(1, 1)), ("cos 0°", Fraction(1, 1)),
    ("sin^2 30°", Fraction(1, 4)), ("cos^2 60°", Fraction(1, 4)),
    ("sin^2 45°", Fraction(1, 2)), ("cos^2 45°", Fraction(1, 2)),
    ("sin^2 60°", Fraction(3, 4)), ("cos^2 30°", Fraction(3, 4)),
    ("tan^2 45°", Fraction(1, 1)), ("sin^2 0°", Fraction(0, 1)),
    ("cos^2 90°", Fraction(0, 1)), ("tan^2 60°", Fraction(3, 1)),
    ("sec^2 45°", Fraction(2, 1)), ("cosec^2 45°", Fraction(2, 1)),
]
_TRIG_SLICE = {"easy": _TRIG_ATOMS[0:6], "grade": _TRIG_ATOMS[6:12],
               "hard": _TRIG_ATOMS[12:18]}
_TRIG_KS = {"easy": (1,), "grade": (2, 3, 4), "hard": (5, 6, 7, 8, 9)}


@_kind("trigonometry", "one")
def _trig_single(p, tier):
    atoms = _TRIG_SLICE[tier]
    k = _TRIG_KS[tier][p[0] % len(_TRIG_KS[tier])]
    expr, val = atoms[p[1] % len(atoms)]
    res = k * val
    ans = _dec(res)
    show = expr if k == 1 else f"{k} x {expr}"
    q = f"Evaluate: {show}  (give your answer as a decimal if needed)"
    steps = [f"{expr} = {_dec(val)}"]
    steps.append(f"{show} = {k} x {_dec(val)}" if k != 1
                 else f"= {_dec(val)}")
    steps.append(_STEP_END.format(ans))
    return _out(q, ans, ans, steps)


@_kind("trigonometry", "pair")
def _trig_pair(p, tier):
    atoms = _TRIG_SLICE[tier]
    i, j, iop = p[0] % len(atoms), p[1] % len(atoms), p[2] % 2
    (e1, v1), (e2, v2) = atoms[i], atoms[j]
    op = "+" if iop == 0 else "x"
    res = v1 + v2 if op == "+" else v1 * v2
    ans = _dec(res)
    q = (f"Evaluate: {e1} {op} {e2}  (give your answer as a decimal if "
         f"needed)")
    return _out(q, ans, ans, [
        f"{e1} = {_dec(v1)} and {e2} = {_dec(v2)}",
        f"{_dec(v1)} {op} {_dec(v2)}",
        _STEP_END.format(ans)])


@_kind("trigonometry", "id")
def _trig_identity(p, tier):
    ang = ("30", "45", "60")[p[0] % 3]
    if tier == "easy":
        expr, ans = f"sin^2 {ang}° + cos^2 {ang}°", 1
    elif tier == "grade":
        expr, ans = f"2 x (sin^2 {ang}° + cos^2 {ang}°)", 2
    else:
        expr, ans = f"7 x (sin^2 {ang}° + cos^2 {ang}°) - 3", 4
    q = (f"Using the identity sin^2 A + cos^2 A = 1, evaluate: {expr}  "
         f"(give your answer as a decimal if needed)")
    return _out(q, str(ans), str(ans), [
        f"sin^2 {ang}° + cos^2 {ang}° = 1",
        _STEP_END.format(ans)])


_register("trigonometry", ("trigonometr",), (9, 10), {
    "easy": [("one", (1, 6)), ("pair", (6, 6, 2)), ("id", (3,))],
    "grade": [("one", (3, 6)), ("pair", (6, 6, 2)), ("id", (3,))],
    "hard": [("one", (5, 6)), ("pair", (6, 6, 2)), ("id", (3,))],
}, "standard-angle values kept rational via squares, identity checks")


# ---- statistics (mean / median / mode from generated datasets) ---------------------#
def _mean_offsets(n, span):
    """Sorted n-tuples of offsets summing to 0 -> every dataset has an
    exact integer mean and is shown canonically (sorted)."""
    return [t for t in
            combinations_with_replacement(range(-span, span + 1), n)
            if sum(t) == 0]


_OFF5 = _mean_offsets(5, 6)          # easy datasets (5 values)
_OFF7 = _mean_offsets(7, 4)          # grade/hard datasets (7 values)


@_kind("statistics", "mean")
def _stats_mean(p, tier):
    offs, N = (_OFF5, len(_OFF5)) if tier == "easy" else (_OFF7,
                                                          len(_OFF7))
    m = (10 + p[0] % 31) if tier == "easy" else (
        (10 + p[0] % 51) if tier == "grade" else (61 + p[0] % 88))
    off = offs[p[1] % N]
    vals = sorted(m + o for o in off)
    name = _name(p[2] + m)
    n = len(vals)
    q = (f"The runs scored by {name} in {n} innings are: "
         f"{', '.join(map(str, vals))}.  Find the mean runs scored.")
    return _out(q, f"mean = {m}", str(m), [
        f"Sum = {' + '.join(map(str, vals))} = {m * n}",
        f"Mean = {m * n} / {n}",
        _STEP_END.format(m)])


def _take(gen, start, count, pred=None):
    """Lazily take `count` items after skipping `start` matching ones
    (never materialises the full combination space).  Used only at
    import time to precompute the per-tier dataset lists."""
    out: List = []
    skipped = 0
    for item in gen:
        if pred is not None and not pred(item):
            continue
        if skipped < start:
            skipped += 1
            continue
        out.append(item)
        if len(out) >= count:
            break
    return out


# median/mode dataset lists are precomputed ONCE (per-render lazy skips
# over million-combination spaces would be far too slow); disjoint
# value ranges per tier keep every dataset text unique to one tier
_MED_RNG = {"easy": range(1, 14), "grade": range(14, 40),
            "hard": range(40, 99)}
_MEDO = {"easy": _take(combinations(_MED_RNG["easy"], 5), 0, 300),
         "grade": _take(combinations(_MED_RNG["grade"], 5), 5000, 800),
         "hard": _take(combinations(_MED_RNG["hard"], 5), 500000, 1500)}
_MEDE = {"easy": _take(combinations(_MED_RNG["easy"], 6), 0, 300,
                       pred=(lambda t_: (t_[2] + t_[3]) % 2 == 0)),
         "grade": _take(combinations(_MED_RNG["grade"], 6), 5000, 800,
                        pred=(lambda t_: (t_[2] + t_[3]) % 2 == 0)),
         "hard": _take(combinations(_MED_RNG["hard"], 6), 500000, 1500,
                       pred=(lambda t_: (t_[2] + t_[3]) % 2 == 0))}


@_kind("statistics", "medo")
def _stats_medo(p, tier):
    vals = sorted(_MEDO[tier][p[0] % len(_MEDO[tier])])
    ans = vals[2]
    q = f"Find the median of the data: {', '.join(map(str, vals))}."
    return _out(q, f"median = {ans}", str(ans), [
        "Data is already ordered; n = 5 (odd)",
        "Median = the 3rd value",
        _STEP_END.format(ans)])


@_kind("statistics", "mede")
def _stats_mede(p, tier):
    vals = sorted(_MEDE[tier][p[0] % len(_MEDE[tier])])
    ans = (vals[2] + vals[3]) // 2
    q = f"Find the median of the data: {', '.join(map(str, vals))}."
    return _out(q, f"median = {ans}", str(ans), [
        "n = 6 (even); median = average of the 3rd and 4th values",
        f"= ({vals[2]} + {vals[3]}) / 2",
        _STEP_END.format(ans)])


def _mode_sets(tier):
    """(m0, combo) datasets: one unique mode value occurring 3x plus 4
    distinct other values, so the mode is always unambiguous.  Value
    bands are disjoint across tiers.  Built once at import."""
    if tier == "easy":
        m0s, rng, count = range(2, 10), range(10, 25), 120
    elif tier == "grade":
        m0s, rng, count = range(30, 45), range(10, 25), 400
    else:
        m0s, rng, count = range(50, 75), range(25, 99), 700
    out = []
    for m0 in m0s:
        for combo in _take(combinations([x for x in rng if x != m0], 4),
                           0, count):
            out.append((m0, combo))
    return out


_MODE = {t: _mode_sets(t) for t in _TIER_ORDER}


@_kind("statistics", "mode")
def _stats_mode(p, tier):
    sets = _MODE[tier]
    m0, combo = sets[p[0] % len(sets)] if sets \
        else (3, (10, 11, 12, 13))
    vals = sorted(list(combo) + [m0] * 3)
    q = f"Find the mode of the data: {', '.join(map(str, vals))}."
    return _out(q, f"mode = {m0}", str(m0), [
        f"{m0} occurs 3 times; every other value occurs once",
        _STEP_END.format(m0)])


_register("statistics", ("mean", "median", "mode", "statistic"),
          (7, 10), {
    "easy": [("mean", (31, len(_OFF5), 4)), ("medo", (len(_MEDO["easy"]),)),
             ("mede", (len(_MEDE["easy"]),)),
             ("mode", (len(_MODE["easy"]),))],
    "grade": [("mean", (51, len(_OFF7), 4)), ("medo", (len(_MEDO["grade"]),)),
              ("mede", (len(_MEDE["grade"]),)),
              ("mode", (len(_MODE["grade"]),))],
    "hard": [("mean", (88, len(_OFF7), 4)), ("medo", (len(_MEDO["hard"]),)),
             ("mede", (len(_MEDE["hard"]),)),
             ("mode", (len(_MODE["hard"]),))],
}, "mean/median/mode of exact integer datasets")


# ---- probability (terminating decimals only) ----------------------------------------#
# coin-k event lists are disjoint per tier: easy k in {1,2}, grade k=3,
# hard k=4; die events slice disjointly; two-dice kind is hard-only.
_COINS = {
    1: [("it shows heads", Fraction(1, 2)),
        ("it shows tails", Fraction(1, 2))],
    2: [("exactly one head shows", Fraction(2, 4)),
        ("at least one head shows", Fraction(3, 4)),
        ("both show tails", Fraction(1, 4)),
        ("at least one tail shows", Fraction(3, 4)),
        ("both show heads", Fraction(1, 4))],
    3: [("exactly two heads show", Fraction(3, 8)),
        ("at least one head shows", Fraction(7, 8)),
        ("all three show heads", Fraction(1, 8)),
        ("no head shows", Fraction(1, 8)),
        ("at least two heads show", Fraction(1, 2)),
        ("exactly one head shows", Fraction(3, 8))],
    4: [("exactly two heads show", Fraction(6, 16)),
        ("exactly three heads show", Fraction(4, 16)),
        ("at least one tail shows", Fraction(15, 16)),
        ("all four show heads", Fraction(1, 16))],
}
_COINS_FLAT = {"easy": [(1, i) for i in range(len(_COINS[1]))]
               + [(2, i) for i in range(len(_COINS[2]))],
               "grade": [(3, i) for i in range(len(_COINS[3]))],
               "hard": [(4, i) for i in range(len(_COINS[4]))]}
_CARDS = [("a spade", Fraction(13, 52)), ("a heart", Fraction(13, 52)),
          ("a club", Fraction(13, 52)), ("a diamond", Fraction(13, 52)),
          ("a red card", Fraction(26, 52)),
          ("a black card", Fraction(26, 52)),
          ("neither a heart nor a diamond", Fraction(26, 52)),
          ("a card that is not a spade", Fraction(39, 52))]
_DIE1 = [("an even number", Fraction(3, 6)),
         ("an odd number", Fraction(3, 6)),
         ("a number at most 3", Fraction(3, 6)),
         ("a number at least 4", Fraction(3, 6)),
         ("a prime number (2, 3 or 5)", Fraction(3, 6)),
         ("the number 7", Fraction(0, 6)),
         ("a number from 1 to 6", Fraction(6, 6))]
_DIE2 = [("the sum is even", Fraction(18, 36)),
         ("the sum is odd", Fraction(18, 36))]


@_kind("probability", "coins")
def _prob_coins(p, tier):
    flat = _COINS_FLAT[tier]
    k, ev = flat[p[0] % len(flat)]
    phrase, val = _COINS[k][ev]
    num = ("A fair coin", "Two fair coins", "Three fair coins",
           "Four fair coins")[k - 1]
    toss = "is tossed" if k == 1 else "are tossed together"
    q = (f"{num} {toss}.  What is the probability that {phrase}?  "
         f"(give your answer as a decimal)")
    ans = _dec(val)
    fav, tot = val.numerator, val.denominator
    step1 = (f"Favourable outcomes = {fav}; total outcomes = 2^{k} = "
             f"{tot}" if tot > 1 else
             "Certain event: every outcome is favourable")
    return _out(q, ans, ans, [step1, _STEP_END.format(ans)])


@_kind("probability", "die")
def _prob_die(p, tier):
    lo, hi = (0, 4) if tier == "easy" else (4, 7)   # disjoint slices
    phrase, val = _DIE1[p[0] % (hi - lo) + lo]
    q = (f"A fair die is rolled once.  What is the probability of "
         f"getting {phrase}?  (give your answer as a decimal)")
    ans = _dec(val)
    return _out(q, ans, ans, [
        f"Favourable outcomes = {val.numerator}; total outcomes = "
        f"{val.denominator}",
        _STEP_END.format(ans)])


@_kind("probability", "die2")
def _prob_die2(p, tier):
    phrase, val = _DIE2[p[0] % len(_DIE2)]
    q = (f"Two fair dice are rolled together (36 possible outcomes).  "
         f"What is the probability that {phrase}?  (give your answer "
         f"as a decimal)")
    ans = _dec(val)
    return _out(q, ans, ans, [
        f"Favourable outcomes = {val.numerator}; total outcomes = "
        f"{val.denominator}",
        _STEP_END.format(ans)])


@_kind("probability", "cards")
def _prob_cards(p, tier):
    phrase, val = _CARDS[p[0] % len(_CARDS)]
    q = (f"One card is drawn at random from a well-shuffled standard "
         f"deck.  What is the probability that it is {phrase}?  (give "
         f"your answer as a decimal)")
    ans = _dec(val)
    return _out(q, ans, ans, [
        "A standard deck has 52 cards; favourable = "
        f"{val.numerator}",
        f"P = {val.numerator}/52 = {ans}",
        _STEP_END.format(ans)])


_register("probability", ("probability", "chance"), (7, 10), {
    "easy": [("coins", (len(_COINS_FLAT["easy"]),)), ("die", (4,))],
    "grade": [("coins", (len(_COINS_FLAT["grade"]),)), ("die", (3,)),
              ("cards", (8,))],
    "hard": [("coins", (len(_COINS_FLAT["hard"]),)), ("die2", (2,))],
}, "coins/dice/cards events whose probabilities terminate as decimals")


# --------------------------------------------------------------------- #
# sanity at import: every registered (fid, kind) has a renderer, and
# keyword ties resolve by explicit priority (more specific/simple
# families first -- e.g. "Ratios to Percents" must hit the ratio
# family, a "Quadratic Equation" title must never hit the linear one)
# --------------------------------------------------------------------- #
_FAMILY_PRIORITY = [
    "simple_interest", "lcm_hcf", "exponents_roots", "fractions",
    "area_perimeter", "ratio", "percentages", "triangles", "statistics",
    "probability", "quadratics", "ap", "coordinate", "trigonometry",
    "linear",
]


def _order_families() -> None:
    ordered = [f for f in _FAMILY_PRIORITY if f in FAMILIES]
    ordered += [f for f in FAMILIES if f not in ordered]
    reordered = {fid: FAMILIES[fid] for fid in ordered}
    FAMILIES.clear()
    FAMILIES.update(reordered)


def _check_registry() -> None:
    _order_families()
    missing = []
    for fid, fam in FAMILIES.items():
        for tier, layouts in fam["tiers"].items():
            for kind, _sizes in layouts:
                if (fid, kind) not in KIND_RENDER:
                    missing.append((fid, kind))
    if missing:
        raise RuntimeError(f"drill kinds without renderers: {missing}")


_check_registry()
