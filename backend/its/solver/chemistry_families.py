"""chemistry_families.py -- core deterministic chemistry families (ICSE 6-10 +
bridge to 11-12), batch-15.

Follows the maths2_families typed-row conventions: trigger regex with named
slots, plausibility gates inside compute, 6-tuple return
(value, steps, answer, assumptions, governing_equation, extra_quantities),
and a single dispatcher model_chemistry_families(text) -> ModelResult
(first grounded row wins).  Deterministic only -- no LLM anywhere.

Families:
  equations    EQUATION_BALANCE, EQUATION_BALANCE_CHECK
  language     VALENCY_FROM_FORMULA, CROSSOVER_NAMED, CROSSOVER_STATED
  mole concept MOLE_MASS_ANY, PARTICLES_AVOGADRO, MOLARITY_ANY,
               VOLUME_AT_STP, ATOM_COUNT
  composition  MOLECULAR_MASS, PERCENT_FROM_FORMULA
  gas laws     BOYLE_LAW, CHARLES_LAW, GAY_LUSSAC_LAW, COMBINED_GAS_LAW
  ionic        PH_FROM_OH, PH_TO_OH
  ICSE applied WATER_HARDNESS

(Overlaps deliberately avoided with chemistry2/chemistry3 tables: those own
rows that state atomic/molar masses or equilibrium/thermo data in the text.)
"""

from __future__ import annotations

import math
import re
from fractions import Fraction
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# constants
# --------------------------------------------------------------------------- #

AVOGADRO = 6.022e23
MOLAR_VOLUME_STP = 22.4          # L per mol (ICSE gram-molecular volume)
_KW = 1e-14                      # [H+][OH-] at 25 C

# standard board atomic masses (ICSE/CBSE table values)
ATOMIC_MASS: Dict[str, float] = {
    "H": 1, "He": 4, "Li": 7, "Be": 9, "B": 11, "C": 12, "N": 14, "O": 16,
    "F": 19, "Ne": 20, "Na": 23, "Mg": 24, "Al": 27, "Si": 28, "P": 31,
    "S": 32, "Cl": 35.5, "Ar": 40, "K": 39, "Ca": 40, "Ti": 48, "Cr": 52,
    "Mn": 55, "Fe": 56, "Co": 59, "Ni": 59, "Cu": 63.5, "Zn": 65, "As": 75,
    "Br": 80, "Ag": 108, "Sn": 119, "I": 127, "Ba": 137, "Pt": 195,
    "Au": 197, "Hg": 201, "Pb": 207, "Bi": 209, "U": 238,
}

ELEMENT_NAMES: Dict[str, str] = {
    "hydrogen": "H", "helium": "He", "lithium": "Li", "carbon": "C",
    "nitrogen": "N", "oxygen": "O", "fluorine": "F", "neon": "Ne",
    "sodium": "Na", "magnesium": "Mg", "aluminium": "Al", "aluminum": "Al",
    "silicon": "Si", "phosphorus": "P", "sulphur": "S", "sulfur": "S",
    "chlorine": "Cl", "argon": "Ar", "potassium": "K", "calcium": "Ca",
    "titanium": "Ti", "chromium": "Cr", "manganese": "Mn", "iron": "Fe",
    "cobalt": "Co", "nickel": "Ni", "copper": "Cu", "zinc": "Zn",
    "bromine": "Br", "silver": "Ag", "tin": "Sn", "iodine": "I",
    "barium": "Ba", "platinum": "Pt", "gold": "Au", "mercury": "Hg",
    "lead": "Pb", "bismuth": "Bi", "uranium": "U",
}

# anion valencies for VALENCY_FROM_FORMULA (the NON-queried part)
_ELEMENT_VALENCY: Dict[str, int] = {
    "H": 1, "F": 1, "Cl": 1, "Br": 1, "I": 1, "O": 2, "S": 2, "N": 3,
    "P": 3, "C": 4, "Si": 4,
}

# polyatomic radicals: composition -> valency (charge magnitude)
_RADICALS: List[Tuple[Dict[str, int], int, str]] = [
    ({"O": 1, "H": 1}, 1, "hydroxide OH"),
    ({"N": 1, "O": 3}, 1, "nitrate NO3"),
    ({"N": 1, "O": 2}, 1, "nitrite NO2"),
    ({"H": 1, "C": 1, "O": 3}, 1, "bicarbonate HCO3"),
    ({"H": 1, "S": 1, "O": 4}, 1, "hydrogen sulphate HSO4"),
    ({"Cl": 1, "O": 3}, 1, "chlorate ClO3"),
    ({"Cl": 1, "O": 4}, 1, "perchlorate ClO4"),
    ({"Mn": 1, "O": 4}, 1, "permanganate MnO4"),
    ({"C": 1, "N": 1}, 1, "cyanide CN"),
    ({"C": 2, "H": 3, "O": 2}, 1, "acetate CH3COO"),
    ({"S": 1, "O": 4}, 2, "sulphate SO4"),
    ({"S": 1, "O": 3}, 2, "sulphite SO3"),
    ({"C": 1, "O": 3}, 2, "carbonate CO3"),
    ({"Cr": 1, "O": 4}, 2, "chromate CrO4"),
    ({"Cr": 2, "O": 7}, 2, "dichromate Cr2O7"),
    ({"C": 2, "O": 4}, 2, "oxalate C2O4"),
    ({"S": 2, "O": 3}, 2, "thiosulphate S2O3"),
    ({"P": 1, "O": 4}, 3, "phosphate PO4"),
    ({"P": 1, "O": 3}, 3, "phosphite PO3"),
]

# cations/anions for the named cross-over family (ICSE language of chemistry)
_CATIONS: Dict[str, Tuple[str, int]] = {
    "hydrogen": ("H", 1), "sodium": ("Na", 1), "potassium": ("K", 1),
    "silver": ("Ag", 1), "ammonium": ("NH4", 1), "cuprous": ("Cu", 1),
    "copper(i)": ("Cu", 1), "mercurous": ("Hg", 1), "magnesium": ("Mg", 2),
    "calcium": ("Ca", 2), "barium": ("Ba", 2), "zinc": ("Zn", 2),
    "ferrous": ("Fe", 2), "iron(ii)": ("Fe", 2), "cupric": ("Cu", 2),
    "copper(ii)": ("Cu", 2), "lead": ("Pb", 2), "tin": ("Sn", 2),
    "manganese": ("Mn", 2), "nickel": ("Ni", 2), "ferric": ("Fe", 3),
    "iron(iii)": ("Fe", 3), "aluminium": ("Al", 3), "aluminum": ("Al", 3),
    "chromium": ("Cr", 3),
}
_ANIONS: Dict[str, Tuple[str, int]] = {
    "hydride": ("H", 1), "fluoride": ("F", 1), "chloride": ("Cl", 1),
    "bromide": ("Br", 1), "iodide": ("I", 1), "hydroxide": ("OH", 1),
    "nitrate": ("NO3", 1), "nitrite": ("NO2", 1), "bicarbonate": ("HCO3", 1),
    "hydrogen sulphate": ("HSO4", 1), "hydrogen sulfate": ("HSO4", 1),
    "permanganate": ("MnO4", 1), "cyanide": ("CN", 1),
    "acetate": ("CH3COO", 1), "oxide": ("O", 2), "sulphide": ("S", 2),
    "sulfide": ("S", 2), "carbonate": ("CO3", 2), "sulphate": ("SO4", 2),
    "sulfate": ("SO4", 2), "sulphite": ("SO3", 2), "chromate": ("CrO4", 2),
    "dichromate": ("Cr2O7", 2), "oxalate": ("C2O4", 2),
    "thiosulphate": ("S2O3", 2), "nitride": ("N", 3),
    "phosphate": ("PO4", 3), "phosphite": ("PO3", 3),
}

# --------------------------------------------------------------------------- #
# helpers (maths2 shape)
# --------------------------------------------------------------------------- #

_GATE = (None, [], None, None, None, None)


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join([assumptions] if isinstance(assumptions, str)
                       else assumptions) if assumptions else "")


_NUM = r"-?\d+(?:\.\d+)?"
_SCI = (r"\d+(?:\.\d+)?(?:\s*[x\u00d7*]\s*10\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|\s*[eE]\s*[-+]?\d+)?")


def _fmt(v: float) -> str:
    if v is not None and abs(v - round(v)) < 1e-9 and abs(v) < 1e15:
        return f"{round(v):g}"
    return f"{v:.6g}"


def _sci(s: str) -> float:
    """'3.0 x 10^23' / '6e-5' / '2.5' -> float."""
    v = re.sub(r"\s+", "", (s or "").replace("\u00d7", "x"))
    v = v.replace("x10^", "e").replace("x10**", "e").replace("x10", "e")
    return float(v)


def _normalize(text: str) -> str:
    """Unicode fold: subscripts, minus, arrows, middle dots."""
    t = (text or "").replace("\u2212", "-").replace("\u2013", "-")
    t = t.replace("\u2019", "'").replace("\u00d7", "x")
    t = re.sub(r"[\u2080-\u2089]",
               lambda m_: chr(ord(m_.group(0)) - 0x2080 + 0x30), t)
    t = t.replace("\u207a", "+").replace("\u207b", "-")
    t = (t.replace("\u2192", "->").replace("\u27f6", "->")
         .replace("\u21cc", "<->").replace("\u21c4", "<->"))
    t = t.replace("\u00b7", ".").replace("\u22c5", ".")
    return t


_SUB = str.maketrans("0123456789", "₀₁₂₃₄₅₆₇₈₉")


def _sub(n: int) -> str:
    """123 -> unicode subscript string (for pretty equation output)."""
    return str(n).translate(_SUB)


# --------------------------------------------------------------------------- #
# formula parsing
# --------------------------------------------------------------------------- #

# a candidate formula token: element symbols with counts, parens, hydrate dot
_F_TOKEN = (r"(?:(?:\((?:[A-Z][a-z]?\d*)+\)\d*|[A-Z][a-z]?\d*)+)"
            r"(?:\.\d*[A-Za-z(][A-Za-z0-9()]*)*")
_FORMULA_RX = r"(?<![A-Za-z0-9])(?P<f>" + _F_TOKEN + r")(?![A-Za-z0-9])"


def _parse_counts(seg: str) -> Optional[Dict[str, int]]:
    """Parse one formula segment (no hydrate dot) -> element counts."""
    counts: Dict[str, int] = {}
    pos = 0
    while pos < len(seg):
        if seg[pos] == "(":
            depth, end = 1, pos + 1
            while end < len(seg) and depth:
                if seg[end] == "(":
                    depth += 1
                elif seg[end] == ")":
                    depth -= 1
                end += 1
            if depth:
                return None
            inner = _parse_counts(seg[pos + 1:end - 1])
            if inner is None:
                return None
            rest = seg[end:]
            mm = re.match(r"\d+", rest)
            mult = int(mm.group(0)) if mm else 1
            for k, v in inner.items():
                counts[k] = counts.get(k, 0) + v * mult
            pos = end + (len(mm.group(0)) if mm else 0)
        else:
            em = re.match(r"([A-Z][a-z]?)(\d*)", seg[pos:])
            if not em or not em.group(1):
                return None
            el, n = em.group(1), int(em.group(2) or 1)
            counts[el] = counts.get(el, 0) + n
            pos += em.end()
    return counts


def parse_formula(f: str) -> Optional[Dict[str, int]]:
    """'CuSO4.5H2O' -> {'Cu':1,'S':1,'O':9,'H':10}; None if unparseable or
    contains an element outside the atomic-mass table."""
    if not f:
        return None
    s = f.strip().strip(",")
    total: Dict[str, int] = {}
    # hydrate notation: leading multiplier on the part AFTER the dot.
    # A leading digit on the FIRST part is a reaction coefficient, not a
    # formula ("3H2" in a skeleton) -> reject.
    parts = [p for p in re.split(r"\.(?=\d*[A-Za-z(])", s) if p]
    if not parts:
        return None
    for idx, part in enumerate(parts):
        pm = re.match(r"^(\d+)\s*(?=[A-Z(])", part)
        if pm and idx == 0:
            return None
        mult = int(pm.group(1)) if pm else 1
        seg = part[pm.end():] if pm else part
        seg = re.sub(r"[^A-Za-z0-9()]", "", seg)
        if not seg:
            return None
        c = _parse_counts(seg)
        if c is None:
            return None
        for k, v in c.items():
            total[k] = total.get(k, 0) + v * mult
    if not total or any(el not in ATOMIC_MASS for el in total):
        return None
    return total


def _formula_valid_in_text(token: str) -> bool:
    """Token looks like a real formula (parses, all elements known)."""
    c = parse_formula(token)
    return c is not None and sum(c.values()) >= 1


def molar_mass(f: str) -> Optional[float]:
    c = parse_formula(f)
    if c is None:
        return None
    return sum(ATOMIC_MASS[el] * n for el, n in c.items())


def _atom_count(f: str) -> int:
    c = parse_formula(f)
    return sum(c.values()) if c else 0


def _composition_str(c: Dict[str, int]) -> str:
    return ", ".join(f"{el} x {n}" for el, n in sorted(c.items()))


def _stated_mass_guard(text: str) -> bool:
    """True when the text STATES a molar/atomic mass value: the ask is then
    not a from-table lookup (chemistry2 owns those rows)."""
    return bool(re.search(
        r"(?:molar|molecular|atomic)\s+mass[^.]{0,40}?(?:is|=|:)\s*"
        + _NUM, text, re.I))


# --------------------------------------------------------------------------- #
# equation parsing and balancing (exact rational nullspace)
# --------------------------------------------------------------------------- #

_ARROW_RX = r"(?:->|<->|=)"


def _split_species(side: str) -> List[str]:
    out = []
    for tok in side.split("+"):
        tok = tok.strip()
        if tok:
            out.append(tok)
    return out


def _parse_equation(text: str) -> Optional[Tuple[List[str], List[str]]]:
    """Find 'A + B -> C + D' in text; all species must parse as formulas."""
    for m in re.finditer(
            r"(?P<lhs>[A-Za-z0-9().\s+]{3,80}?)\s*" + _ARROW_RX +
            r"\s*(?P<rhs>[A-Za-z0-9().\s+]{3,80}?)(?=[.,;\n]|$)", text):
        lhs, rhs = _split_species(m.group("lhs")), _split_species(m.group("rhs"))
        if len(lhs) + len(rhs) < 2 or len(lhs) + len(rhs) > 8:
            continue
        if all(_formula_valid_in_text(s) for s in lhs + rhs):
            return lhs, rhs
    return None


def _nullspace_1d(rows: List[List[Fraction]]) -> Optional[List[Fraction]]:
    """Return the single nullspace vector when dim == 1, else None."""
    if not rows:
        return None
    ncols = len(rows[0])
    mat = [row[:] for row in rows]
    pivot_cols: List[int] = []
    r = 0
    for c in range(ncols):
        pr = None
        for rr in range(r, len(mat)):
            if mat[rr][c] != 0:
                pr = rr
                break
        if pr is None:
            continue
        mat[r], mat[pr] = mat[pr], mat[r]
        pv = mat[r][c]
        mat[r] = [x / pv for x in mat[r]]
        for rr in range(len(mat)):
            if rr != r and mat[rr][c] != 0:
                f = mat[rr][c]
                mat[rr] = [a - f * b for a, b in zip(mat[rr], mat[r])]
        pivot_cols.append(c)
        r += 1
        if r == len(mat):
            break
    free = [c for c in range(ncols) if c not in pivot_cols]
    if len(free) != 1:
        return None                     # no or multi-dimensional nullspace
    fc = free[0]
    v = [Fraction(0)] * ncols
    v[fc] = Fraction(1)
    for i, pc in enumerate(pivot_cols):
        v[pc] = -mat[i][fc]
    return v


def _to_ints(v: List[Fraction]) -> Optional[List[int]]:
    den = 1
    for x in v:
        den = den * x.denominator // math.gcd(den, x.denominator)
    ints = [int(x * den) for x in v]
    g = 0
    for x in ints:
        g = math.gcd(g, abs(x))
    if g == 0:
        return None
    return [x // g for x in ints]


def balance_equation(lhs: List[str], rhs: List[str]
                     ) -> Optional[Tuple[List[int], List[int]]]:
    """Small-integer coefficients making atoms balance, or None."""
    species = lhs + rhs
    counts = [parse_formula(s) for s in species]
    elems = sorted(set().union(*[set(c) for c in counts]))
    n_l = len(lhs)
    # balance condition: A_L . v_L - A_R . v_R = 0 (rhs columns negated)
    rows = [[Fraction(counts[j].get(e, 0)) * (1 if j < n_l else -1)
             for j in range(len(species))] for e in elems]
    v = _nullspace_1d(rows)
    if v is None:
        return None
    ints = _to_ints(v)
    if ints is None or any(x == 0 for x in ints):
        return None
    if any(x < 0 for x in ints):
        if all(x <= 0 for x in ints):
            ints = [-x for x in ints]
        else:
            return None
    # exact verification
    for e in elems:
        tot_l = sum(ints[j] * counts[j].get(e, 0) for j in range(len(lhs)))
        tot_r = sum(ints[len(lhs) + j] * counts[len(lhs) + j].get(e, 0)
                    for j in range(len(rhs)))
        if tot_l != tot_r:
            return None
    return ints[:len(lhs)], ints[len(lhs):]


def _equation_str(lhs: List[str], co_l: List[int], rhs: List[str],
                  co_r: List[int]) -> str:
    def term(n: int, s: str) -> str:
        return (f"{n} " if n != 1 else "") + s
    return (" + ".join(term(c, s) for c, s in zip(co_l, lhs))
            + " -> " + " + ".join(term(c, s) for c, s in zip(co_r, rhs)))


# --------------------------------------------------------------------------- #
# cross-over formula builder
# --------------------------------------------------------------------------- #

def crossover(cat: Tuple[str, int], an: Tuple[str, int]) -> str:
    (cs, cv), (af, av) = cat, an
    g = math.gcd(cv, av)
    n_c, n_a = av // g, cv // g

    def is_radical(f: str) -> bool:
        return len(parse_formula(f) or {}) > 1

    def part(sym: str, n: int) -> str:
        if n > 1 and is_radical(sym):
            return "(" + sym + ")" + str(n)
        return sym + (str(n) if n > 1 else "")
    return part(cs, n_c) + part(af, n_a)


# --------------------------------------------------------------------------- #
# valency computation from a formula
# --------------------------------------------------------------------------- #

def valency_in_formula(el: str, f: str) -> Optional[int]:
    """Valency (charge magnitude) of element el inside formula f."""
    counts = parse_formula(f)
    if not counts or el not in counts or counts[el] <= 0:
        return None
    rest = dict(counts)
    n_el = rest.pop(el)
    # try to explain the rest as ONE radical (times its count)
    for comp, val, _name in _RADICALS:
        for mult in range(1, 12):
            trial = dict(comp)
            for k in trial:
                trial[k] *= mult
            if trial == rest:
                got = val * mult / n_el
                return int(got) if got == int(got) and 1 <= got <= 6 else None
    # else: rest is a single element with a known anion valency
    if len(rest) == 1:
        (oy, oy_n), = rest.items()
        base = _ELEMENT_VALENCY.get(oy)
        if base and oy_n:
            got = base * oy_n / n_el
            return int(got) if got == int(got) and 1 <= got <= 6 else None
    return None


def _resolve_element(word: str) -> Optional[str]:
    w = word.strip().rstrip(",.?:;")
    if w.capitalize() in ELEMENT_NAMES:
        return ELEMENT_NAMES[w.capitalize()]
    if w.lower() in ELEMENT_NAMES:
        return ELEMENT_NAMES[w.lower()]
    if w in ATOMIC_MASS:
        return w
    if len(w) <= 2 and w[:1].isupper() and w in ATOMIC_MASS:
        return w
    return None


# --------------------------------------------------------------------------- #
# 1. EQUATION_BALANCE
# --------------------------------------------------------------------------- #


def _c_balance(g, m, text):
    eq = _parse_equation(text)
    if not eq:
        return _GATE
    lhs, rhs = eq
    got = balance_equation(lhs, rhs)
    if not got:
        return _GATE             # unbalanceable / multi-solution: decline
    co_l, co_r = got
    out = _equation_str(lhs, co_l, rhs, co_r)
    steps = [
        "count atoms of each element on both sides (skeleton: "
        + " + ".join(lhs) + " -> " + " + ".join(rhs) + "),",
        "solve the atom-balance conditions for the smallest whole-number "
        "coefficients:",
        "balanced equation: " + out,
    ]
    return None, steps, "balanced equation: " + out, None, \
        "atoms of each element: LHS = RHS", {"n_species": len(lhs) + len(rhs)}


# --------------------------------------------------------------------------- #
# 2. EQUATION_BALANCE_CHECK
# --------------------------------------------------------------------------- #


def _c_balance_check(g, m, text):
    eq = _parse_equation(text)
    if not eq:
        return _GATE
    lhs, rhs = eq
    cl = [parse_formula(s) for s in lhs]
    cr = [parse_formula(s) for s in rhs]
    elems = sorted(set().union(*[set(c) for c in cl + cr]))
    diffs = []
    for e in elems:
        tl = sum(c.get(e, 0) for c in cl)
        tr = sum(c.get(e, 0) for c in cr)
        if tl != tr:
            diffs.append(f"{e}: {tl} vs {tr}")
    if not diffs:
        steps = ["atom tally both sides: every element ("
                 + ", ".join(elems) + ") is equal on both sides.",
                 "the equation is already balanced."]
        return None, steps, "balanced as written", None, "atom count check", \
            {"n_species": len(lhs) + len(rhs)}
    got = balance_equation(lhs, rhs)
    fix = ""
    if got:
        fix = " balanced form: " + _equation_str(lhs, got[0], rhs, got[1])
    steps = [
        "atom tally LHS vs RHS -> mismatches: " + "; ".join(diffs) + ".",
        "the equation as written is NOT balanced." + (fix if fix else ""),
    ]
    return None, steps, "not balanced (" + "; ".join(diffs) + ")" + fix, \
        None, "atom count check", {"n_species": len(lhs) + len(rhs)}


# --------------------------------------------------------------------------- #
# 3. VALENCY_FROM_FORMULA
# --------------------------------------------------------------------------- #


def _c_valency(g, m, text):
    el = _resolve_element(g["el"])
    if not el or not _formula_valid_in_text(g["f"]):
        return _GATE
    v = valency_in_formula(el, g["f"])
    if v is None:
        return _GATE
    counts = parse_formula(g["f"])
    steps = [
        f"in {g['f']} ({_composition_str(counts)}), the other part carries a "
        f"fixed combining power; total valency units must cancel:",
        f"valency of {el} x {counts[el]} = valency-units of the rest, so "
        f"valency of {el} = {v}.",
    ]
    return float(v), steps, f"valency of {el} in {g['f']} = {v}", None, \
        "valency units cancel in a neutral formula", \
        {"el_count": counts[el], "valency": v}


# --------------------------------------------------------------------------- #
# 4. CROSSOVER_NAMED  (aluminium sulphate -> Al2(SO4)3)
# --------------------------------------------------------------------------- #


def _norm_name(s: str) -> str:
    s = re.sub(r"\s+", " ", s.strip().lower())
    s = re.sub(r"\(\s*", "(", s)
    s = re.sub(r"\s*\)", ")", s)
    return s


_AN_NAMES = sorted(_ANIONS, key=len, reverse=True)
_CROSSOVER_NAMED_RX = (
    r"(?:write\s+(?:down\s+)?the\s+|what\s+is\s+the\s+|give\s+the\s+|"
    r"the\s+)?(?:chemical\s+|molecular\s+)?formula(?:\s+of|\s+for)?\s+"
    r"(?:the\s+)?(?P<cat>[A-Za-z]+\s*(?:\(\s*[IVXivx]{1,4}\s*\))?)\s+"
    r"(?P<an>" + "|".join(re.escape(n) for n in _AN_NAMES) + r")\b")


def _c_crossover_named(g, m, text):
    cat = _CATIONS.get(_norm_name(g["cat"]))
    an = _ANIONS.get(_norm_name(g["an"]))
    if not cat or not an:
        return _GATE
    f = crossover(cat, an)
    steps = [
        f"{g['cat'].strip()} -> {cat[0]} (valency {cat[1]}); "
        f"{g['an'].strip()} -> {an[0]} (valency {an[1]}).",
        f"cross-over rule: swap the valencies as subscripts and reduce by "
        f"the common factor -> {f}.",
    ]
    return None, steps, f"formula = {f}", None, "cross-over of valencies", \
        {"cat_valency": cat[1], "an_valency": an[1]}


# --------------------------------------------------------------------------- #
# 5. CROSSOVER_STATED  (valency of A is a, of B is b -> formula)
# --------------------------------------------------------------------------- #

_CROSSOVER_STATED_RX = (
    r"valency\s+of\s+(?:(?:element|elements|metal|non-metal|radical)\s+)?"
    r"(?P<a>[A-Za-z]{1,12})\s+(?:is|=|:)\s*(?P<va>[1-6])\b"
    r".{0,140}?valency\s+of\s+(?:(?:element|elements|metal|non-metal|radical)"
    r"\s+)?(?P<b>[A-Za-z]{1,12})\s+(?:is|=|:)\s*(?P<vb>[1-6])\b"
    r".{0,180}?(?:write|give|what)\b.{0,40}?formula")


def _c_crossover_stated(g, m, text):
    def resolve(word: str) -> Optional[str]:
        sym = _resolve_element(word)
        if sym:
            return sym
        # abstract textbook labels ("element A has valency 3") are fine:
        # the cross-over is arithmetic on the stated valencies
        if len(word) == 1 and word.isupper():
            return word
        return None
    sym_a, sym_b = resolve(g["a"]), resolve(g["b"])
    if not sym_a or not sym_b or sym_a == sym_b:
        return _GATE
    va, vb = int(g["va"]), int(g["vb"])
    f = crossover((sym_a, va), (sym_b, vb))
    steps = [
        f"{sym_a} has valency {va}; {sym_b} has valency {vb}.",
        f"cross-over: subscripts {vb} on {sym_a} and {va} on {sym_b}, "
        f"reduced to lowest terms -> {f}.",
    ]
    return None, steps, f"formula = {f}", None, "cross-over of valencies", \
        {"va": va, "vb": vb}


# --------------------------------------------------------------------------- #
# 6. MOLE_MASS_ANY  (n = m/M, both directions)
# --------------------------------------------------------------------------- #

# explicit ask words: mode (a) needs a moles ask, mode (b) a mass ask
_MOLES_ASK_RX = re.compile(
    r"number\s+of\s+moles|how\s+many\s+moles|"
    r"(?:calculate|find|determine|compute)\b[^.]{0,30}?moles?\b|"
    r"moles?\b[^.]{0,20}?(?:in|present|contained|formed|produced)", re.I)
_MASS_ASK_RX = re.compile(r"\bmass\b|weigh", re.I)

_MOLE_MASS_RX = (
    r"(?:(?P<m>" + _SCI + r")\s*g(?:rams?)?\b(?:\s+of\s+|\s+)(?P<f1>" + _F_TOKEN + r")"
    r"|(?P<n>" + _SCI + r")\s*(?:moles?|mol)\b(?:\s+of\s+|\s+)(?P<f2>" + _F_TOKEN + r"))")


def _c_mole_mass(g, m, text):
    mm = None
    stm = re.search(r"molar\s+mass[^.]{0,40}?(?:is|=|:)\s*(" + _SCI + r")",
                    text, re.I)
    if stm:
        mm = _sci(stm.group(1))
    if g["f1"]:
        if not _MOLES_ASK_RX.search(text):
            return _GATE
        if not _formula_valid_in_text(g["f1"]):
            return _GATE
        f = g["f1"]
        mass = _sci(g["m"])
        M = mm if mm is not None else molar_mass(f)
        if M is None or M <= 0 or mass <= 0:
            return _GATE
        n = mass / M
        src = " (given)" if mm is not None else \
            " (standard atomic-mass table)"
        steps = [
            f"molar mass of {f} = {M:g} g/mol{src},",
            f"n = mass / molar mass = {mass:g} / {M:g} = {n:.6g} mol.",
        ]
        return n, steps, f"n = {n:.6g} mol", None, "n = m / M", \
            {"molar_mass": M, "mass_g": mass}
    if g["f2"]:
        if not _MASS_ASK_RX.search(text):
            return _GATE
        if not _formula_valid_in_text(g["f2"]):
            return _GATE
        f = g["f2"]
        n = _sci(g["n"])
        M = mm if mm is not None else molar_mass(f)
        if M is None or M <= 0 or n <= 0:
            return _GATE
        mass = n * M
        steps = [
            f"molar mass of {f} = {M:g} g/mol,",
            f"mass = n x M = {n:g} x {M:g} = {mass:.6g} g.",
        ]
        return mass, steps, f"mass = {mass:.6g} g", None, "m = n x M", \
            {"molar_mass": M, "moles": n}
    return _GATE


# --------------------------------------------------------------------------- #
# 7. PARTICLES_AVOGADRO
# --------------------------------------------------------------------------- #

_PARTICLES_RX = (
    # (a) "number of molecules in 2 moles of CO2" / "atoms in 0.5 mol H2SO4"
    r"(?:number\s+of\s+)?(?P<kind>molecules|atoms|ions)\b"
    r"(?:\s+(?:of|in)\s+(?P<f1>" + _F_TOKEN + r"))?"
    r"(?:\s+(?:are\s+)?(?:there\s+)?(?:in|contained\s+in|present\s+in))?\s*"
    r"(?P<n>" + _SCI + r")\s*(?:moles?|mol)\b"
    r"(?:\s+of\s+(?P<f4>" + _F_TOKEN + r"))?"
    # (b) "moles in 1.2044 x 10^24 molecules of CO2"
    r"|(?P<np>" + _SCI + r")\s*(?P<kind2>molecules|atoms|ions)\b"
    r"(?:\s+of\s+(?P<f2>" + _F_TOKEN + r"))?[^.]{0,80}?"
    r"(?:number\s+of\s+)?(?:moles?|mol)\b"
    # (c) "number of moles in 1.2 x 10^24 molecules of CO2"
    r"|(?:number\s+of\s+)?(?:moles?|mol)\b[^.]{0,50}?"
    r"(?:in|contained\s+in|present\s+in)\s*(?P<np2>" + _SCI + r")\s*"
    r"(?P<kind3>molecules|atoms|ions)\b(?:\s+of\s+(?P<f3>" + _F_TOKEN + r"))?")


def _c_particles(g, m, text):
    kind = g["kind"] or g["kind2"] or g.get("kind3")
    f = g["f1"] or g.get("f4") or g["f2"] or g.get("f3")
    np_val = g["np"] or g.get("np2")
    if g["n"]:
        n = _sci(g["n"])
        if n <= 0:
            return _GATE
        k = 1.0
        assum = None
        if kind == "atoms" and f:
            if not _formula_valid_in_text(f):
                return _GATE
            k = float(_atom_count(f))
            assum = (f"each {f} molecule contains {int(k)} atoms "
                     f"(counted from the formula)")
        N = n * AVOGADRO * k
        steps = [f"N = n x Avogadro number = {n:g} x 6.022 x 10^23",
                 f"N = {N:.6g} {kind}."]
        if k != 1.0:
            steps.insert(1, f"atoms = molecules x atoms-per-molecule "
                            f"(x {int(k)}).")
        return N, steps, f"N = {N:.4g} {kind}", assum, \
            "N = n x N_A (x atoms per molecule for atom counts)", \
            {"moles": n}
    if np_val:
        N = _sci(np_val)
        if N <= 0:
            return _GATE
        n = N / AVOGADRO
        steps = [
            f"n = N / N_A = {N:.6g} / 6.022 x 10^23 = {n:.6g} mol.",
        ]
        return n, steps, f"n = {n:.6g} mol", None, "n = N / N_A", \
            {"particles": N}
    return _GATE


# --------------------------------------------------------------------------- #
# 8. MOLARITY_ANY  (M = n/V, both directions + mass-to-prepare)
# --------------------------------------------------------------------------- #

_VOLUNIT = r"(?P<u>ml|millilitres?|milliliters?|litres?|liters?|l)\b"
_MOLARITY_ASK = re.compile(r"molarity|concentration", re.I)


def _c_molarity(g, m, text):
    vL = None
    if g.get("u"):
        u = g["u"].lower()
        v = _sci(g["v"]) if g.get("v") else None
        if v is None or v <= 0:
            return _GATE
        vL = v * (0.001 if u.startswith(("ml", "m")) else 1.0)
    if g.get("n"):
        # branch (a) is generically worded: demand a molarity/concentration ask
        if not _MOLARITY_ASK.search(text):
            return _GATE
        n = _sci(g["n"])
        if n <= 0 or vL is None:
            return _GATE
        M = n / vL
        steps = [
            f"convert volume: V = {g['v']} {g['u']} = {vL:g} L,",
            f"molarity = moles / volume(L) = {n:g} / {vL:g} = {M:.6g} M.",
        ]
        return M, steps, f"M = {M:.6g} mol/L", None, "M = n / V", \
            {"moles": n, "volume_l": vL}
    if g.get("m2"):
        M = _sci(g["m2"])
        if M <= 0 or vL is None:
            return _GATE
        n = M * vL
        steps = [
            f"convert volume: V = {g['v']} {g['u']} = {vL:g} L,",
            f"moles = M x V = {M:g} x {vL:g} = {n:.6g} mol.",
        ]
        return n, steps, f"n = {n:.6g} mol", None, "n = M x V", \
            {"molarity": M, "volume_l": vL}
    if g.get("f") and g.get("m3"):
        if not _formula_valid_in_text(g["f"]):
            return _GATE
        M = _sci(g["m3"])
        if M <= 0 or vL is None:
            return _GATE
        Mw = molar_mass(g["f"])
        mass = M * vL * Mw
        steps = [
            f"moles needed = M x V = {M:g} x {vL:g} = {M * vL:.6g} mol,",
            f"mass = moles x molar mass = {M * vL:.6g} x {Mw:g} = "
            f"{mass:.6g} g.",
        ]
        return mass, steps, f"mass = {mass:.6g} g", None, \
            "mass = M x V x molar mass", {"molarity": M, "volume_l": vL,
                                          "molar_mass": Mw}
    return _GATE


_MOLARITY_RX = (
    # (a) n moles ... in/dissolved in V ml -> molarity
    r"(?P<n>" + _SCI + r")\s*(?:moles?|mol)\b[^.]{0,50}?"
    r"(?:dissolved\s+in|in|made\s+up\s+to|diluted\s+to)\s+(?P<v>" + _SCI + r")\s*"
    r"(?P<u>ml|millilitres?|milliliters?|litres?|liters?|l)\b"
    # (b) moles in V ml of M solution
    r"|(?:moles?\s+(?:of\s+)?(?:solute\s+)?(?:are\s+)?(?:in|present\s+in)\s+"
    r"|how\s+many\s+moles\s+(?:of\s+solute\s+)?(?:are\s+)?in\s+)"
    r"(?P<v2>" + _SCI + r")\s*(?P<u2>ml|millilitres?|milliliters?|litres?|"
    r"liters?|l)\b\s+of\s+(?:a\s+)?(?P<m2>" + _SCI + r")\s*M\b"
    # (c) mass of FORMULA to prepare V ml of M solution
    r"|mass\s+of\s+(?P<f>" + _F_TOKEN + r")[^.]{0,80}?(?:prepare|make|need)"
    r"[^.]{0,60}?(?P<v3>" + _SCI + r")\s*(?P<u3>ml|millilitres?|milliliters?|"
    r"litres?|liters?|l)\b\s+(?:of\s+)?(?:a\s+)?(?P<m3>" + _SCI + r")\s*M\b")


def _c_molarity_dispatch(g, m, text):
    gg = dict(g)
    if gg.get("v2"):
        gg["v"], gg["u"], gg["m2"] = gg["v2"], gg["u2"], gg["m2"]
    elif gg.get("v3"):
        gg["v"], gg["u"], gg["m3"] = gg["v3"], gg["u3"], gg["m3"]
        if not re.search(r"prepare|make|need", text, re.I):
            return _GATE
    return _c_molarity(gg, m, text)


# --------------------------------------------------------------------------- #
# 9. VOLUME_AT_STP  (V = n x 22.4 L)
# --------------------------------------------------------------------------- #

_STP_ASK_RX = re.compile(r"\bSTP\b|standard\s+temperature\s+and\s+pressure",
                         re.I)
_VOLUME_ASK_RX = re.compile(r"volume|occup", re.I)


def _c_volume_stp(g, m, text):
    if not (_STP_ASK_RX.search(text) and _VOLUME_ASK_RX.search(text)):
        return _GATE
    if g["n"]:
        n = _sci(g["n"])
        if n <= 0:
            return _GATE
        V = n * MOLAR_VOLUME_STP
        steps = [f"at STP, 1 mol of any gas occupies {MOLAR_VOLUME_STP:g} L "
                 f"(gram molar volume),",
                 f"V = n x 22.4 = {n:g} x 22.4 = {V:.6g} L."]
        return V, steps, f"V = {V:.6g} L", None, "V = n x 22.4 L", \
            {"moles": n}
    if g["m"]:
        if not _formula_valid_in_text(g["f"]):
            return _GATE
        mass = _sci(g["m"])
        Mw = molar_mass(g["f"])
        if mass <= 0 or Mw is None or Mw <= 0:
            return _GATE
        n = mass / Mw
        V = n * MOLAR_VOLUME_STP
        steps = [
            f"molar mass of {g['f']} = {Mw:g} g/mol, n = {mass:g}/{Mw:g} = "
            f"{n:.6g} mol,",
            f"V = n x 22.4 = {n:.6g} x 22.4 = {V:.6g} L.",
        ]
        return V, steps, f"V = {V:.6g} L", None, "V = (m/M) x 22.4 L", \
            {"moles": n, "molar_mass": Mw}
    return _GATE


_VOLUME_STP_RX = (
    r"(?:volume\s+(?:is\s+)?occupied\s+by|occupied\s+by|what\s+volume\s+"
    r"(?:is\s+occupied\s+by|will\s+(?:be\s+)?occupied\s+by|does)\s+)"
    r"(?P<n>" + _SCI + r")\s*(?:moles?|mol)\b(?:\s+of\s+(?P<f1>" + _F_TOKEN + r"))?"
    r"|(?P<m>" + _SCI + r")\s*g(?:rams?)?\b(?:\s+of\s+)?(?P<f>" + _F_TOKEN + r")"
    r"[^.]{0,80}?(?:volume|occup)[^.]{0,40}?(?:at\s+|under\s+)?STP\b")


# --------------------------------------------------------------------------- #
# 10. MOLECULAR_MASS  (from formula, standard table)
# --------------------------------------------------------------------------- #


def _c_mol_mass(g, m, text):
    if _stated_mass_guard(text):
        return _GATE            # mass stated in text: not a table lookup
    f = g["f"]
    c = parse_formula(f)
    if c is None or not _formula_valid_in_text(f):
        return _GATE
    Mw = molar_mass(f)
    terms = " + ".join(f"{n} x {ATOMIC_MASS[el]:g}" for el, n in sorted(c.items()))
    steps = [
        f"atoms in {f}: {_composition_str(c)}.",
        f"molecular mass = {terms} = {Mw:g}.",
    ]
    return Mw, steps, f"molecular mass of {f} = {Mw:g}", None, \
        "sum of atomic masses", {"n_atoms": float(_atom_count(f))}


_MOLMASS_RX = (
    r"(?:molecular\s+mass|formula\s+mass|molar\s+mass|"
    r"gram\s+(?:molecular|formula)\s+mass|relative\s+(?:molecular|formula)"
    r"\s+mass)\s+(?:of\s+(?:the\s+)?(?:compound\s+|substance\s+|gas\s+)?)?"
    r"(?P<f>" + _F_TOKEN + r")(?!\s*(?:is|=)\s*[-+]?\d)")


# --------------------------------------------------------------------------- #
# 11. PERCENT_FROM_FORMULA
# --------------------------------------------------------------------------- #


def _c_percent_formula(g, m, text):
    if _stated_mass_guard(text):
        return _GATE
    el = _resolve_element(g["el"])
    f = g["f"]
    if not el or not _formula_valid_in_text(f):
        return _GATE
    c = parse_formula(f)
    if el not in c:
        return _GATE
    Mw = molar_mass(f)
    part = c[el] * ATOMIC_MASS[el]
    pct = part / Mw * 100.0
    if not (0 < pct <= 100):
        return _GATE
    steps = [
        f"molar mass of {f} = {Mw:g}; mass from {el} = {c[el]} x "
        f"{ATOMIC_MASS[el]:g} = {part:g}.",
        f"% {el} = ({part:g}/{Mw:g}) x 100 = {pct:.6g}%.",
    ]
    return pct, steps, f"% of {el} in {f} = {pct:.6g}%", None, \
        "% = (atoms x atomic mass / molar mass) x 100", \
        {"molar_mass": Mw, "mass_contribution": part}


_PERCENT_RX = (
    r"(?:percentage|percent)(?:\s+by\s+mass)?(?:\s+composition)?\s+of\s+"
    r"(?P<el>[A-Za-z]{1,12})\s+(?:in|by\s+mass\s+in|of)\s+(?:the\s+)?"
    r"(?:compound\s+)?(?P<f>" + _F_TOKEN + r")\b(?!\s*(?:is|=)\s*[-+]?\d)")


# --------------------------------------------------------------------------- #
# 12-15. GAS LAWS (any-solve)
# --------------------------------------------------------------------------- #

_P_UNIT = r"(?:atm|cm\s*Hg|mm\s*Hg|mmHg|cmHg|torr|kPa|Pa|bar|pascals?|atmospheres?)"
_V_UNIT = r"(?:ml|millilitres?|milliliters?|l|litres?|liters?|cm3|cm\u00b3|m3|m\u00b3)"
_T_UNIT = r"(?:K\b|kelvin|\u00b0?\s*C\b|degrees?\s*C|celsius)"

_P_FACT: Dict[str, float] = {"atm": 101325.0, "cm hg": 13332.24,
                             "cmhg": 13332.24, "mm hg": 133.3224,
                             "mmhg": 133.3224, "torr": 133.3224,
                             "kpa": 1000.0, "pa": 1.0, "bar": 100000.0,
                             "pascal": 1.0, "pascals": 1.0,
                             "atmosphere": 101325.0, "atmospheres": 101325.0}
_V_FACT: Dict[str, float] = {"ml": 1e-3, "millilitre": 1e-3,
                             "millilitres": 1e-3, "milliliter": 1e-3,
                             "milliliters": 1e-3, "l": 1.0, "litre": 1.0,
                             "litres": 1.0, "liter": 1.0, "liters": 1.0,
                             "cm3": 1e-3, "cm\u00b3": 1e-3, "m3": 1000.0,
                             "m\u00b3": 1000.0}


def _si_value(kind: str, v: float, unit: str) -> Optional[float]:
    """Value in the kind's SI base (Pa / m3 / K); None if not convertible."""
    u = re.sub(r"\s+", "", unit.lower()).rstrip(".")
    if kind == "T":
        return _to_kelvin(v, unit)
    table = _P_FACT if kind == "P" else _V_FACT
    for key, f in table.items():
        if re.sub(r"\s+", "", key) == u:
            return v * f
    return None


def _gas_quantity_regexes():
    """Slot regexes, in scan order: explicit state number, word-labeled,
    then contextual/bare (state assigned by order of appearance)."""
    num = _SCI
    pvt_u = r"(?P<u>" + _P_UNIT + r"|" + _V_UNIT + r"|" + _T_UNIT + r")"
    kind_w = r"(?P<kind>pressure|volume|temperature)"
    pvt_k = r"(?P<kind>[PVT])"
    out = [
        # explicit: P1 = 2 atm / V2 is 500 mL / T1=300 K
        re.compile(pvt_k + r"\s*[1\u2081]\b[^0-9]{0,24}?(?:is|=|of|:)?\s*"
                   r"(?P<v>" + num + r")\s*" + pvt_u, re.I),
        re.compile(pvt_k + r"\s*[2\u2082]\b[^0-9]{0,24}?(?:is|=|of|:)?\s*"
                   r"(?P<v>" + num + r")\s*" + pvt_u, re.I),
        # word-labeled initial/original
        re.compile(r"(?:initial|initially|original|originally|first)\s+"
                   + kind_w + r"\s*(?:of|=|is|:)?\s*(?P<v>" + num + r")\s*"
                   + pvt_u, re.I),
        # "pressure is reduced to 2 atm" / "temperature rises to 450 K" -> final
        re.compile(kind_w + r"\s+(?:is\s+)?"
                   r"(?:reduced|increased|raised|lowered|changed|brought|"
                   r"rises?|drops?|falls?|cools?|heated|cooled)\s+to\s+"
                   r"(?P<v>" + num + r")\s*" + pvt_u, re.I),
        # contextual bare: "occupies 500 mL", "at 1 atm", "at 300 K"
        re.compile(r"(?:occup\w+|filled\s+in|collected\s+in|has\s+a\s+volume\s+of)\s+"
                   r"(?P<v>" + num + r")\s*(?P<u>" + _V_UNIT + r")", re.I),
        re.compile(r"(?:at|pressure\s+of)\s+(?P<v>" + num + r")\s*"
                   r"(?P<u>" + _P_UNIT + r")", re.I),
        re.compile(r"(?:at|temperature\s+of)\s+(?P<v>" + num + r")\s*"
                   r"(?P<u>" + _T_UNIT + r")", re.I),
        # plain bare: "volume of 500 mL", "the pressure is 2 atm"
        re.compile(r"(?:the\s+)?" + kind_w + r"\s+(?:of\s+)?(?:is\s+|=|:)?\s*"
                   r"(?P<v>" + num + r")\s*" + pvt_u, re.I),
    ]
    return out


_GAS_SLOT_RX = _gas_quantity_regexes()
# scan order -> state index (None = order-assigned)
_GAS_SLOT_STATE = ["1", "2", "1", "2", None, None, None, None]

_KIND_MAP = {"pressure": "P", "volume": "V", "temperature": "T",
             "P": "P", "V": "V", "T": "T"}

_ASK_KIND_RX = re.compile(
    r"(?:find|calculate|determine|compute|what\s+(?:is|will|was))\s+(?:the\s+)?"
    r"(?:new\s+|final\s+|initial\s+|resulting\s+)?"
    r"(?P<kind>pressure|volume|temperature)\b"
    r"|(?:find|calculate|determine|compute)\s+(?:the\s+)?"
    r"(?P<kind2>[PVT])\s*(?P<st2>[12\u2081\u2082])\b", re.I)


def _kind_from_unit(u: str) -> str:
    """Infer P/V/T from the unit string (contextual slot regexes carry no
    kind group)."""
    un = re.sub(r"\s+", "", u.lower()).rstrip(".")
    if un in ("k", "kelvin", "c", "celsius"):
        return "T"
    if un in _P_FACT:
        return "P"
    if un in _V_FACT:
        return "V"
    return ""


def _gas_scan(text: str):
    """-> (knowns dict label->(value, unit), unknown (kind,state) or None)."""
    knowns: Dict[str, Tuple[float, str]] = {}
    spans = []

    def add(kind: str, state: Optional[str], val: float, unit: str,
            start: int, end: int):
        if not kind:
            return
        if state is None:
            taken = {lbl[1] for lbl in knowns if lbl[0] == kind}
            state = "1" if "1" not in taken else "2"
        lbl = kind + state
        if lbl not in knowns:
            knowns[lbl] = (val, unit)
            spans.append((start, end))

    for rx, st in zip(_GAS_SLOT_RX, _GAS_SLOT_STATE):
        for mm in rx.finditer(text):
            if any(s <= mm.start() < e for s, e in spans):
                continue
            kd = mm.groupdict()
            kind_raw = kd.get("kind")
            if kind_raw in ("P", "V", "T"):
                kind = kind_raw
            elif kind_raw:
                kind = _KIND_MAP.get(kind_raw.lower(), "")
            else:
                kind = _kind_from_unit(kd["u"])
            add(kind, st, _sci(kd["v"]), kd["u"].lower(),
                mm.start(), mm.end())

    unknown = None
    am = _ASK_KIND_RX.search(text)
    if am:
        if am.group("kind"):
            kind = _KIND_MAP[am.group("kind").lower()]
            st = None
        else:
            kind = am.group("kind2").upper()
            st = "1" if am.group("st2") in ("1", "\u2081") else "2"
        if kind:
            if st and kind + st in knowns:
                pass                    # that state is already known
            elif st:
                unknown = (kind, st)
            elif kind + "1" in knowns:
                unknown = (kind, "2")
            elif kind + "2" in knowns:
                unknown = (kind, "1")
    return knowns, unknown


_LAW_GATE = {
    "BOYLE": re.compile(r"boyle|constant\s+temperature|isothermal", re.I),
    "CHARLES": re.compile(r"charles|constant\s+pressure|isobaric", re.I),
    "GAY_LUSSAC": re.compile(r"gay[\s-]*lussac|constant\s+volume|isochoric",
                             re.I),
    "COMBINED": re.compile(r"combined\s+gas", re.I),
}


def _to_kelvin(v: float, unit: str) -> Optional[float]:
    u = unit.lower().strip()
    if u.endswith("k"):
        return v
    if u.endswith("c"):
        return v + 273.0
    return None


def _c_gas_law(law: str):
    def compute(g, m, text):
        knowns, unknown = _gas_scan(text)
        if unknown is None:
            return _GATE
        kind, state = unknown
        other = "1" if state == "2" else "2"
        partner = kind + other
        if partner not in knowns:
            return _GATE
        needed: Dict[str, str] = {}
        if law == "BOYLE":
            needed = {"P": ("1", "2"), "V": ("1", "2")}
        elif law == "CHARLES":
            needed = {"V": ("1", "2"), "T": ("1", "2")}
        elif law == "GAY_LUSSAC":
            needed = {"P": ("1", "2"), "T": ("1", "2")}
        else:
            needed = {"P": ("1", "2"), "V": ("1", "2"), "T": ("1", "2")}
        # every needed slot (except the unknown itself) must be known
        missing = []
        for k, (s1, s2) in needed.items():
            for s in (s1, s2):
                lbl = k + s
                if lbl not in knowns and lbl != kind + state:
                    missing.append(lbl)
        if missing:
            return _GATE
        # law gate: explicit law/constancy words; combined also accepts
        # all-three-kinds readings
        if law == "COMBINED":
            if not (_LAW_GATE["COMBINED"].search(text)
                    or len({lbl[0] for lbl in knowns}) >= 3):
                return _GATE
        elif not _LAW_GATE[law].search(text):
            return _GATE
        # SI-normalise every factor so mixed units within a kind are safe
        vals = {}
        for k in needed:
            if k == kind:
                continue
            for s in ("1", "2"):
                v, u = knowns[k + s]
                si = _si_value(k, v, u)
                if si is None or si <= 0:
                    return _GATE
                vals[(k, s)] = si
        val_partner, unit_partner = knowns[partner]
        if val_partner is None or val_partner <= 0:
            return _GATE
        # per-law factor: unknown = partner x f
        if law == "BOYLE":
            # P1 V1 = P2 V2 -> X_s = X_o * other_o / other_s
            o = "V" if kind == "P" else "P"
            f = vals[(o, other)] / vals[(o, state)]
        elif law in ("CHARLES", "GAY_LUSSAC"):
            # V1/T1 = V2/T2 (and P1/T1 = P2/T2) -> X_s = X_o * other_s/other_o
            o = ("T" if kind == "V" else "V") if law == "CHARLES" \
                else ("T" if kind == "P" else "P")
            f = vals[(o, state)] / vals[(o, other)]
        else:
            # P1 V1 / T1 = P2 V2 / T2; numerator kinds {P,V}, denominator {T}
            num = [k for k in ("P", "V") if k != kind]
            if kind in ("P", "V"):
                f = 1.0
                for k in num:
                    f *= vals[(k, other)] / vals[(k, state)]
                f *= vals[("T", state)] / vals[("T", other)]
            else:
                f = 1.0
                for k in num:
                    f *= vals[(k, state)] / vals[(k, other)]
        result = val_partner * f
        eq = {"BOYLE": "P1 V1 = P2 V2",
              "CHARLES": "V1/T1 = V2/T2",
              "GAY_LUSSAC": "P1/T1 = P2/T2",
              "COMBINED": "P1 V1 / T1 = P2 V2 / T2"}[law]
        readings = []
        for lbl in sorted(knowns):
            v, u = knowns[lbl]
            if lbl[0] == "T":
                kv = _to_kelvin(v, u)
                readings.append(f"{lbl}={_fmt(kv)} K")
            else:
                readings.append(f"{lbl}={_fmt(v)} {u}")
        sub_s = "  ".join(readings)
        if kind == "T":
            given_c = any(u.lower().rstrip(".").endswith("c")
                          for (_v, u) in knowns.values())
            extra_ans = (f" (= {_fmt(result - 273.0)} degree C)"
                         if given_c else "")
            steps = [
                f"{eq}; kelvin readings: {sub_s}.",
                f"T{state} = T{other} x (ratio of the other state variables)"
                f" = {_fmt(result)} K{extra_ans}.",
            ]
            answer = f"T{state} = {_fmt(result)} K{extra_ans}"
        else:
            steps = [
                f"{eq}; readings: {sub_s}.",
                f"{kind}{state} = {kind}{other} x (ratio of the other state "
                f"variables) = {_fmt(result)} {unit_partner}.",
            ]
            answer = f"{kind}{state} = {_fmt(result)} {unit_partner}"
        t_extra = {("t_" + lbl): _to_kelvin(v, u)
                   for lbl, (v, u) in knowns.items() if lbl[0] == "T"}
        return result, steps, answer, None, eq, t_extra
    return compute


_GAS_LAW_ANY_RX = re.compile(
    r"\b(?:gas|pressure|volume|temperature)\b", re.I)


def _c_gas_dispatch(law):
    def compute(g, m, text):
        if not _GAS_LAW_ANY_RX.search(text):
            return _GATE
        return _c_gas_law(law)(g, m, text)
    return compute


# --------------------------------------------------------------------------- #
# 16-17. pH <-> [OH-]
# --------------------------------------------------------------------------- #


def _c_ph_from_oh(g, m, text):
    if not re.search(r"(?:find|calculate|what)\b[^.]{0,30}?pH\b", text, re.I):
        return _GATE
    oh = _sci(g["oh"])
    if oh <= 0 or oh > 100:
        return _GATE
    poh = -math.log10(oh)
    ph = 14.0 - poh
    steps = [
        f"pOH = -log10([OH-]) = -log10({_fmt(oh)}) = {poh:.6g},",
        f"pH = 14 - pOH = 14 - {poh:.6g} = {ph:.6g}.",
    ]
    return ph, steps, f"pH = {ph:.6g}", None, \
        "pOH = -log10[OH-]; pH + pOH = 14", {"poh": poh}


def _c_ph_to_oh(g, m, text):
    if not re.search(
            r"(?:find|calculate|determine|what\s+is)\b[^.]{0,40}?"
            r"(?:\[\s*OH\s*-?\s*\]|OH\s*-|hydroxide)", text, re.I):
        return _GATE
    ph = float(g["ph"])
    if not (0 <= ph <= 14):
        return _GATE
    poh = 14.0 - ph
    oh = 10 ** (-poh)
    steps = [
        f"pOH = 14 - pH = 14 - {ph:g} = {poh:g},",
        f"[OH-] = 10^(-pOH) = 10^(-{poh:g}) = {oh:.6g} M.",
    ]
    return oh, steps, f"[OH-] = {oh:.6g} M", None, \
        "pOH = 14 - pH; [OH-] = 10^(-pOH)", {"poh": poh}


# --------------------------------------------------------------------------- #
# 18. WATER_HARDNESS (ICSE applied arithmetic)
# --------------------------------------------------------------------------- #


def _c_hardness(g, m, text):
    if not _formula_valid_in_text(g["salt"]):
        return _GATE
    salt = g["salt"]
    c = parse_formula(salt)
    if not ("Ca" in c or "Mg" in c):
        return _GATE
    msalt = _sci(g["m"])
    wv = _sci(g["w"])
    wu = g["wu"].lower()
    if msalt <= 0 or wv <= 0:
        return _GATE
    water_l = wv * (1.0 if wu.startswith("l") else 1e-3)
    Msalt = molar_mass(salt)
    if Msalt is None or Msalt <= 0:
        return _GATE
    M_caco3 = 100.0
    equiv_g = msalt * M_caco3 / Msalt
    ppm = equiv_g * 1000.0 / water_l
    steps = [
        f"molar masses: {salt} = {Msalt:g}, CaCO3 = {M_caco3:g}.",
        f"CaCO3 equivalent of {msalt:g} g {salt} = {msalt:g} x "
        f"{M_caco3:g}/{Msalt:g} = {equiv_g:.6g} g.",
        f"water volume = {wv:g} {g['wu']} = {water_l:g} L; hardness = "
        f"({equiv_g:.6g} x 1000 mg) / {water_l:g} L = {ppm:.6g} ppm.",
    ]
    return ppm, steps, f"hardness = {ppm:.6g} ppm (as CaCO3)", \
        ["1 L of water taken as 1000 g; hardness expressed as mg CaCO3 per "
         "litre"], "ppm = (CaCO3-equivalent mg) / litres", \
        {"caco3_equiv_g": equiv_g, "molar_mass_salt": Msalt}


_HARDNESS_RX = (
    r"(?:degree\s+of\s+)?hardness\b.{0,200}?(?P<m>" + _SCI + r")\s*g(?:rams?)?\b"
    r"(?:\s+of\s+)?(?P<salt>" + _F_TOKEN + r")[^.]{0,120}?"
    r"(?:in|dissolved\s+in|added\s+to)\s+(?P<w>" + _SCI + r")\s*"
    r"(?P<wu>ml|millilitres?|milliliters?|litres?|liters?|l|g|grams?)\b"
    r"[^.]{0,40}?(?:of\s+)?water")


# --------------------------------------------------------------------------- #
# The table: (id, regex, compute)
# --------------------------------------------------------------------------- #

TABLE = [
    # ---- language of chemistry ----
    ("VALENCY_FROM_FORMULA",
     r"valency\s+(?:of\s+)?(?P<el>[A-Za-z]{1,12})\s+(?:in|of)\s+"
     r"(?P<f>" + _F_TOKEN + r")\b",
     _c_valency),
    ("CROSSOVER_NAMED", _CROSSOVER_NAMED_RX, _c_crossover_named),
    ("CROSSOVER_STATED", _CROSSOVER_STATED_RX, _c_crossover_stated),

    # ---- equations ----
    ("EQUATION_BALANCE_CHECK",
     r"(?:is|are|check|verify|state\s+whether|whether|test)\b[^.]{0,60}?"
     r"balanc\w+",
     _c_balance_check),
    ("EQUATION_BALANCE",
     r"(?:balance|balancing|write\s+the\s+balanced)\b",
     _c_balance),

    # ---- mole concept ----
    ("MOLE_MASS_ANY", _MOLE_MASS_RX, _c_mole_mass),
    ("PARTICLES_AVOGADRO", _PARTICLES_RX, _c_particles),
    ("MOLARITY_ANY", _MOLARITY_RX, _c_molarity_dispatch),
    ("VOLUME_AT_STP", _VOLUME_STP_RX, _c_volume_stp),
    ("ATOM_COUNT",
     r"(?:how\s+many\s+(?:total\s+)?atoms|number\s+of\s+atoms)\s+"
     r"(?:are\s+)?(?:there\s+|present\s+)*in\s+(?:one\s+|a\s+|an\s+)?"
     r"(?:(?:molecule|formula\s+unit)\s+of\s+)?"
     r"(?P<f>" + _F_TOKEN + r")\b",
     None),          # filled below

    # ---- composition ----
    ("MOLECULAR_MASS", _MOLMASS_RX, _c_mol_mass),
    ("PERCENT_FROM_FORMULA", _PERCENT_RX, _c_percent_formula),

    # ---- gas laws ----
    ("BOYLE_LAW", r"\b(?:gas|pressure|volume)\b", _c_gas_dispatch("BOYLE")),
    ("CHARLES_LAW", r"\b(?:gas|volume|temperature)\b",
     _c_gas_dispatch("CHARLES")),
    ("GAY_LUSSAC_LAW", r"\b(?:gas|pressure|temperature)\b",
     _c_gas_dispatch("GAY_LUSSAC")),
    ("COMBINED_GAS_LAW", r"\b(?:gas|pressure|volume|temperature)\b",
     _c_gas_dispatch("COMBINED")),

    # ---- ionic ----
    ("PH_FROM_OH",
     r"(?:\[?\s*OH\s*-?\s*\]?|hydroxide\s+ion\s+concentration|"
     r"hydroxide\s+concentration)"
     r"[^.]{0,40}?(?:is|=|of|:)?\s*(?P<oh>" + _SCI + r")\s*M\b",
     _c_ph_from_oh),
    ("PH_TO_OH",
     r"pH\s+(?:of\s+[^.]{0,40}?)?(?:is|=)\s*(?P<ph>" + _NUM + r")\b",
     _c_ph_to_oh),

    # ---- ICSE applied ----
    ("WATER_HARDNESS", _HARDNESS_RX, _c_hardness),
]


def _c_atom_count(g, m, text):
    f = g["f"]
    c = parse_formula(f)
    if c is None or not _formula_valid_in_text(f):
        return _GATE
    total = sum(c.values())
    steps = [
        f"{f} = {_composition_str(c)}.",
        f"total atoms = {' + '.join(str(n) for n in c.values())} = {total}.",
    ]
    return float(total), steps, f"{total} atoms in one {f}", None, \
        "sum of subscript counts", None


# patch the placeholder row
TABLE = [(fid, rx, _c_atom_count if compute is None else compute)
         for fid, rx, compute in TABLE]


def model_chemistry_families(text: str) -> ModelResult:
    """Dispatcher: scan the typed chemistry table, first grounded hit wins.

    Trigger regexes are deterministic; each compute applies its own
    plausibility gates and a gate refusal simply continues the scan.
    Never calls an LLM.
    """
    norm = _normalize(text)
    for fid, pattern, compute in TABLE:
        try:
            m = re.search(pattern, norm, re.I)
        except re.error:
            continue
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, norm)
        except Exception:
            continue
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {})
    return _no("CHEMISTRY_FAMILIES", "no chemistry family matched")
