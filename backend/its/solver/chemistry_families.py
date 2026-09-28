"""chemistry_families.py -- core deterministic chemistry families (ICSE 6-10 +
bridge to 11-12), batch-15.

Follows the maths2_families typed-row conventions: trigger regex with named
slots, plausibility gates inside compute, 6-tuple return
(value, steps, answer, assumptions, governing_equation, extra_quantities),
and a single dispatcher model_chemistry_families(text) -> ModelResult
(first grounded row wins).  Deterministic only -- no LLM anywhere.

Families (TABLE, batch-15):
  equations    EQUATION_BALANCE, EQUATION_BALANCE_CHECK
  language     VALENCY_FROM_FORMULA, CROSSOVER_NAMED, CROSSOVER_STATED
  mole concept MOLE_MASS_ANY, PARTICLES_AVOGADRO, MOLARITY_ANY,
               VOLUME_AT_STP, ATOM_COUNT
  composition  MOLECULAR_MASS, PERCENT_FROM_FORMULA
  gas laws     BOYLE_LAW, CHARLES_LAW, GAY_LUSSAC_LAW, COMBINED_GAS_LAW
  ionic        PH_FROM_OH, PH_TO_OH
  ICSE applied WATER_HARDNESS

Families (TABLE_BOOKS2, batch-16 -- book-grounded completions; scanned
FIRST because they key on data stated in the text that TABLE rows gate on):
  composition  EMPIRICAL_FROM_PERCENT, MOLECULAR_FROM_EMPIRICAL,
               AVG_ATOMIC_MASS, CONC_MASS_PERCENT, MOLE_FRACTION
  stoichiometry LIMITING_REAGENT, PERCENT_YIELD
  solutions    MOLALITY_ANY, NORMALITY_ANY, DILUTION_M1V1,
               TITRATION_NORMALITY
  equilibrium  KP_KC_CONVERT
  redox        OXIDATION_NUMBER
  electrochem  FARADAY_MASS, CELL_POTENTIAL
  kinetics     RATE_ORDER_FROM_DATA, HALF_LIFE_FIRST_ORDER,
               REMAINING_AFTER_HALFLIVES
  organic      ISOMER_COUNT_ALKANE, HOMOLOG_NEXT

STEP CONTRACT: every family emits 5 beats via _beats -- Method (names the
law/rule/relation + why it applies), Substitute (with units), Compute,
Check (substitute back / atom audit), Answer (interpretation).

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


def _beats(method: str, subst: str, comp: str, verify: str,
           interp: str) -> List[str]:
    """5-beat step contract: 1 Method (law/rule/relation + why it applies),
    2 Substitute (with units), 3 Compute, 4 Check (substitute back /
    audit), 5 Answer (interpretation)."""
    return ["Method: " + method,
            "Substitute: " + subst,
            "Compute: " + comp,
            "Check: " + verify,
            "Answer: " + interp]


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
    all_sp = lhs + rhs
    counts = [parse_formula(s) for s in all_sp]
    elems = sorted(set().union(*[set(c) for c in counts]))
    n_l = len(lhs)
    audit = "; ".join(
        e + " " + str(sum(counts[j].get(e, 0) for j in range(n_l)))
        + " = " + str(sum(counts[j].get(e, 0)
                          for j in range(n_l, len(all_sp))))
        for e in elems)
    steps = _beats(
        "law of conservation of mass -- atoms of every element must be "
        "equal on both sides, so only the coefficients are adjusted",
        "atom tally of the skeleton " + " + ".join(lhs) + " -> "
        + " + ".join(rhs),
        "solve the balance conditions for the smallest whole-number "
        "coefficients -> " + out,
        "atom audit with coefficients: " + audit,
        out + " -- atoms conserved, so the equation is chemically valid.")
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
        tallies = "; ".join(
            e + " " + str(sum(c.get(e, 0) for c in cl)) + " = "
            + str(sum(c.get(e, 0) for c in cr)) for e in elems)
        steps = _beats(
            "an equation is balanced exactly when the law of conservation "
            "of mass holds -- atom counts equal on both sides",
            "atom tally LHS vs RHS for " + ", ".join(elems),
            tallies,
            "every element matches on both sides, so no coefficient is "
            "needed",
            "the equation is already balanced as written.")
        return None, steps, "balanced as written", None, "atom count check", \
            {"n_species": len(lhs) + len(rhs)}
    got = balance_equation(lhs, rhs)
    fix = ""
    if got:
        fix = " balanced form: " + _equation_str(lhs, got[0], rhs, got[1])
    steps = _beats(
        "an equation is balanced exactly when atom counts match on both "
        "sides (law of conservation of mass)",
        "atom tally LHS vs RHS for " + ", ".join(elems),
        "mismatches: " + "; ".join(diffs),
        "the unbalanced tallies fail the atom audit" + (fix if fix else ""),
        "the equation as written is NOT balanced.")
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
    rest_units = v * counts[el]
    steps = _beats(
        "valency-balance rule -- a formula is neutral, so the valency "
        "units of the element must cancel those of the partner part",
        f"in {g['f']} ({_composition_str(counts)}): {counts[el]} x {el} "
        f"against the rest carrying {rest_units} valency units",
        f"valency of {el} = {rest_units} / {counts[el]} = {v}",
        f"check: {counts[el]} x {v} = {rest_units} units cancel exactly, "
        f"so {g['f']} is neutral",
        f"valency of {el} in {g['f']} = {v}.")
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
    g2 = math.gcd(cat[1], an[1])
    steps = _beats(
        "cross-over rule -- swap the valencies as subscripts and reduce by "
        "their common factor to give the neutral formula",
        f"{g['cat'].strip()} -> {cat[0]} (valency {cat[1]}); "
        f"{g['an'].strip()} -> {an[0]} (valency {an[1]})",
        f"swap: subscript {an[1] // g2} on {cat[0]}, {cat[1] // g2} on "
        f"{an[0]} -> {f}",
        f"check: charges balance {an[1] // g2} x {cat[1]}+ = "
        f"{cat[1] // g2} x {an[1]}-",
        f"formula = {f}.")
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
    g2 = math.gcd(va, vb)
    steps = _beats(
        "cross-over rule -- swap the stated valencies as subscripts and "
        "reduce to lowest terms",
        f"valency({sym_a}) = {va}, valency({sym_b}) = {vb}",
        f"subscript {vb // g2} on {sym_a}, {va // g2} on {sym_b} -> {f}",
        f"check: {vb // g2} x {va}+ = {va // g2} x {vb}- (charges cancel)",
        f"formula = {f}.")
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
        steps = _beats(
            "mole relation n = m / M links a mass in grams to moles; the "
            "molar mass is the bridge between the two",
            f"m = {mass:g} g of {f}, M({f}) = {M:g} g/mol{src}",
            f"n = {mass:g} / {M:g} = {n:.6g} mol",
            f"check: n x M = {n:.6g} x {M:g} = {n * M:.6g} g = the given "
            f"mass",
            f"{mass:g} g of {f} is n = {n:.6g} mol.")
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
        steps = _beats(
            "mole relation m = n x M converts moles to mass in grams",
            f"n = {n:g} mol of {f}, M({f}) = {M:g} g/mol (standard table)",
            f"m = {n:g} x {M:g} = {mass:.6g} g",
            f"check: m / M = {mass:.6g} / {M:g} = {mass / M:.6g} mol = the "
            f"given moles",
            f"mass = {mass:.6g} g of {f}.")
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
        kp_txt = ("" if k == 1.0 else
                  "; for atom counts multiply by the atoms per molecule")
        steps = _beats(
            "Avogadro relation N = n x N_A converts moles to a particle "
            "count" + kp_txt,
            f"n = {n:g} mol, N_A = 6.022 x 10^23 per mol"
            + ("" if k == 1.0 else f", {int(k)} atoms per {f}"),
            f"N = {n:g} x 6.022e23" + ("" if k == 1.0 else
                                       f" x {int(k)}") + f" = {N:.6g} {kind}",
            f"check: N / N_A" + ("" if k == 1.0 else f" / {int(k)}")
            + f" = {N / AVOGADRO / k:.6g} mol = the given moles",
            f"N = {N:.4g} {kind}.")
        return N, steps, f"N = {N:.4g} {kind}", assum, \
            "N = n x N_A (x atoms per molecule for atom counts)", \
            {"moles": n}
    if np_val:
        N = _sci(np_val)
        if N <= 0:
            return _GATE
        n = N / AVOGADRO
        steps = _beats(
            "Avogadro relation n = N / N_A converts a particle count to "
            "moles",
            f"N = {N:.6g} {kind}, N_A = 6.022 x 10^23 per mol",
            f"n = {N:.6g} / 6.022e23 = {n:.6g} mol",
            f"check: n x N_A = {n:.6g} x 6.022e23 = {n * AVOGADRO:.6g} = "
            f"the given count",
            f"n = {n:.6g} mol.")
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
        steps = _beats(
            "molarity M = n / V counts moles of solute per litre of "
            "solution",
            f"n = {n:g} mol, V = {g['v']} {g['u']} = {vL:g} L",
            f"M = {n:g} / {vL:g} = {M:.6g} mol/L",
            f"check: M x V = {M:.6g} x {vL:g} = {M * vL:.6g} mol = the "
            f"given moles",
            f"molarity = {M:.6g} M.")
        return M, steps, f"M = {M:.6g} mol/L", None, "M = n / V", \
            {"moles": n, "volume_l": vL}
    if g.get("m2"):
        M = _sci(g["m2"])
        if M <= 0 or vL is None:
            return _GATE
        n = M * vL
        steps = _beats(
            "molarity rearranged as n = M x V gives the moles of solute "
            "in a stated volume",
            f"M = {M:g} mol/L, V = {g['v']} {g['u']} = {vL:g} L",
            f"n = {M:g} x {vL:g} = {n:.6g} mol",
            f"check: n / V = {n:.6g} / {vL:g} = {n / vL:.6g} M = the given "
            f"molarity",
            f"n = {n:.6g} mol of solute.")
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
        steps = _beats(
            "to prepare a solution: first n = M x V, then weigh the mass "
            "m = n x molar mass",
            f"M = {M:g} mol/L, V = {g['v']} {g['u']} = {vL:g} L, "
            f"M({g['f']}) = {Mw:g} g/mol",
            f"n = {M:g} x {vL:g} = {M * vL:.6g} mol; m = {M * vL:.6g} x "
            f"{Mw:g} = {mass:.6g} g",
            f"check: m / M({g['f']}) / V = {mass:.6g} / {Mw:g} / {vL:g} = "
            f"{mass / Mw / vL:.6g} M = the given molarity",
            f"weigh out {mass:.6g} g of {g['f']}.")
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
        steps = _beats(
            "gram-molar volume at STP (Avogadro's law): 1 mol of ANY gas "
            "occupies 22.4 L, so V = n x 22.4",
            f"n = {n:g} mol, molar volume = 22.4 L/mol",
            f"V = {n:g} x 22.4 = {V:.6g} L",
            f"check: V / 22.4 = {V:.6g} / 22.4 = "
            f"{V / MOLAR_VOLUME_STP:.6g} mol = the given moles",
            f"volume occupied at STP = {V:.6g} L.")
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
        steps = _beats(
            "at STP every gas occupies 22.4 L per mol; convert the mass "
            "to moles first, then multiply by the molar volume",
            f"m = {mass:g} g of {g['f']}, M({g['f']}) = {Mw:g} g/mol",
            f"n = {mass:g} / {Mw:g} = {n:.6g} mol; V = {n:.6g} x 22.4 = "
            f"{V:.6g} L",
            f"check: V / 22.4 x M = {V / MOLAR_VOLUME_STP * Mw:.6g} g = "
            f"the given mass",
            f"volume occupied at STP = {V:.6g} L.")
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
    biggest = max(ATOMIC_MASS[el] * n for el, n in c.items())
    steps = _beats(
        "molecular mass = sum of the atomic masses, each multiplied by "
        "its subscript in the formula (composition rule)",
        f"atoms in {f}: {_composition_str(c)} (standard table masses)",
        f"M({f}) = {terms} = {Mw:g}",
        f"check: {sum(c.values())} atoms accounted for; every element "
        f"contribution (largest {biggest:g}) is positive and < {Mw:g}",
        f"molecular mass of {f} = {Mw:g}.")
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
    steps = _beats(
        "percentage by mass = (mass of the element in 1 mol / molar mass "
        "of the compound) x 100",
        f"{el}: {c[el]} x {ATOMIC_MASS[el]:g} = {part:g} g in 1 mol; "
        f"M({f}) = {Mw:g} g/mol",
        f"% {el} = ({part:g} / {Mw:g}) x 100 = {pct:.6g}%",
        f"check: ({pct:.6g} / 100) x {Mw:g} = {pct / 100.0 * Mw:.6g} g = "
        f"the {el} mass in 1 mol",
        f"{f} contains {pct:.6g}% {el} by mass.")
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
        # the known partner-state of the unknown kind is needed by the
        # audit check (e.g. V1 when V2 is the unknown)
        pv, pu = knowns[partner]
        p_si = _si_value(kind, pv, pu)
        if p_si is None or p_si <= 0:
            return _GATE
        vals[(kind, other)] = p_si
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
        eq = {"BOYLE": "Boyle's law P1 V1 = P2 V2",
              "CHARLES": "Charles's law V1/T1 = V2/T2",
              "GAY_LUSSAC": "Gay-Lussac's law P1/T1 = P2/T2",
              "COMBINED": "combined gas law P1 V1 / T1 = P2 V2 / T2"}[law]
        why = {"BOYLE": "at constant temperature pressure and volume are "
                        "inversely proportional",
               "CHARLES": "at constant pressure volume is proportional to "
                          "the kelvin temperature",
               "GAY_LUSSAC": "at constant volume pressure is proportional "
                             "to the kelvin temperature",
               "COMBINED": "with n fixed, P, V and T together obey "
                           "P1V1/T1 = P2V2/T2"}[law]

        def _chk() -> str:
            # SI value of the unknown state: result is already kelvin for T,
            # otherwise it carries unit_partner's units
            si_u = result if kind == "T" else \
                _si_value(kind, result, unit_partner)

            def sv(k: str, s: str) -> float:
                return si_u if (k == kind and s == state) else vals[(k, s)]
            if law == "BOYLE":
                a = sv("P", "1") * sv("V", "1")
                b = sv("P", "2") * sv("V", "2")
                return f"P1V1 = {a:.4g} = P2V2 = {b:.4g} (SI)"
            if law == "CHARLES":
                a = sv("V", "1") / sv("T", "1")
                b = sv("V", "2") / sv("T", "2")
                return f"V1/T1 = {a:.4g} = V2/T2 = {b:.4g} (SI)"
            if law == "GAY_LUSSAC":
                a = sv("P", "1") / sv("T", "1")
                b = sv("P", "2") / sv("T", "2")
                return f"P1/T1 = {a:.4g} = P2/T2 = {b:.4g} (SI)"
            a = sv("P", "1") * sv("V", "1") / sv("T", "1")
            b = sv("P", "2") * sv("V", "2") / sv("T", "2")
            return f"P1V1/T1 = {a:.4g} = P2V2/T2 = {b:.4g} (SI)"

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
            answer = f"T{state} = {_fmt(result)} K{extra_ans}"
            steps = _beats(
                f"{eq} -- {why}",
                f"readings (kelvin for T): {sub_s}",
                f"T{state} = T{other} x (ratio of the other state "
                f"variables) = {_fmt(result)} K",
                _chk(),
                answer + ".")
        else:
            answer = f"{kind}{state} = {_fmt(result)} {unit_partner}"
            steps = _beats(
                f"{eq} -- {why}",
                f"readings (kelvin for T): {sub_s}",
                f"{kind}{state} = {kind}{other} x (ratio of the other "
                f"state variables) = {_fmt(result)} {unit_partner}",
                _chk(),
                answer + ".")
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
    nature = "basic" if ph > 7 else ("acidic" if ph < 7 else "neutral")
    steps = _beats(
        "water autoionisation Kw = [H+][OH-] = 1e-14 gives pH + pOH = 14 "
        "at 25 C",
        f"[OH-] = {_fmt(oh)} M",
        f"pOH = -log10({_fmt(oh)}) = {poh:.6g}; pH = 14 - {poh:.6g} = "
        f"{ph:.6g}",
        f"check: [H+] = 10^-pH = {10 ** (-ph):.4g} M and [H+] x [OH-] = "
        f"{10 ** (-ph) * oh:.3g} = 1e-14 = Kw",
        f"pH = {ph:.6g} -- the solution is {nature}.")
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
    steps = _beats(
        "water autoionisation Kw = [H+][OH-] = 1e-14 gives pOH = 14 - pH "
        "and [OH-] = 10^(-pOH)",
        f"pH = {ph:g}",
        f"pOH = 14 - {ph:g} = {poh:g}; [OH-] = 10^-({poh:g}) = "
        f"{oh:.6g} M",
        f"check: [OH-] x 10^-pH = {oh * 10 ** (-ph):.3g} = 1e-14 = Kw",
        f"[OH-] = {oh:.6g} M.")
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
    steps = _beats(
        "hardness is reported as mg of CaCO3 per litre (ppm): every salt "
        "is converted to its CaCO3 equivalent by the molar-mass ratio",
        f"{msalt:g} g of {salt} (M = {Msalt:g}) in {wv:g} {g['wu']} = "
        f"{water_l:g} L of water; M(CaCO3) = 100 g/mol",
        f"CaCO3 equivalent = {msalt:g} x 100 / {Msalt:g} = "
        f"{equiv_g:.6g} g; ppm = {equiv_g * 1000:.6g} mg / {water_l:g} L "
        f"= {ppm:.6g}",
        f"check: ppm x volume / 1000 = {ppm:.6g} x {water_l:g} / 1000 = "
        f"{ppm * water_l / 1000:.6g} g = the CaCO3 equivalent",
        f"hardness = {ppm:.6g} ppm (as CaCO3).")
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
# TABLE_BOOKS2 -- book-grounded completions (batch-16).  Scanned BEFORE
# TABLE: these rows key on data stated in the text (stated masses, given
# percentages, equations with coefficients) that the TABLE rows gate away.
# Same 6-tuple conventions; _GATE marks impossible states.
# --------------------------------------------------------------------------- #

_ALKANE_NAMES = ["methane", "ethane", "propane", "butane", "pentane",
                 "hexane", "heptane", "octane", "nonane", "decane"]
_ALKENE_NAMES = ["ethene", "propene", "butene", "pentene", "hexene"]
_ALKYNE_NAMES = ["ethyne", "propyne", "butyne", "pentyne", "hexyne"]
_ALKANE_ISOMERS = {1: 1, 2: 1, 3: 1, 4: 2, 5: 3, 6: 5, 7: 9, 8: 18,
                   9: 35, 10: 75}

# n-factors (book tables): acids by basicity, bases by acidity
_NFACTOR = {
    "HCl": 1, "HNO3": 1, "CH3COOH": 1, "H2SO4": 2, "H3PO4": 3,
    "H2C2O4": 2, "NaOH": 1, "KOH": 1, "NH4OH": 1, "Ca(OH)2": 2,
    "Ba(OH)2": 2, "Al(OH)3": 3, "Na2CO3": 2, "NaHCO3": 1, "K2CO3": 2,
}

# fixed oxidation numbers (rule set; exceptions -> _GATE)
_ON_FIXED = {
    "H": 1, "Li": 1, "Na": 1, "K": 1, "Rb": 1, "Cs": 1, "Ag": 1,
    "Be": 2, "Mg": 2, "Ca": 2, "Sr": 2, "Ba": 2, "Zn": 2, "Cd": 2,
    "Al": 3, "F": -1, "O": -2,
}
_METALS = {s for s in ATOMIC_MASS} - {
    "H", "He", "B", "C", "N", "O", "F", "Si", "P", "S", "As", "Br", "I"}


def _counts_formula_str(c: Dict[str, int]) -> str:
    """counts -> Hill-order formula string (C, H, then alphabetical)."""
    def key(el: str) -> Tuple[int, str]:
        return (0 if el == "C" else 1 if el == "H" else 2, el)
    return "".join(el + (str(c[el]) if c[el] != 1 else "")
                   for el in sorted(c, key=key))


def _whole_ratio(vals: List[float]) -> Optional[List[int]]:
    """Board-clean mole ratios -> smallest whole numbers (None if none)."""
    if not vals or any(v <= 0 for v in vals):
        return None
    mn = min(vals)
    r = [v / mn for v in vals]
    for s in range(1, 9):
        scaled = [v * s for v in r]
        if all(abs(x - round(x)) <= 0.12 for x in scaled):
            ints = [int(round(x)) for x in scaled]
            g = 0
            for x in ints:
                g = math.gcd(g, x)
            return [x // g for x in ints] if g > 1 else ints
    return None


def _litres(v: float, u: str) -> float:
    u = u.lower()
    return v * (1e-3 if u.startswith(("m", "mi")) else 1.0)


# ---- EMPIRICAL_FROM_PERCENT ------------------------------------------------ #

def _scan_percent_elements(text: str):
    """-> ordered [(symbol, percent)] from '40% carbon' / 'C = 40%' forms."""
    pat = re.compile(
        r"(?:(?P<p1>" + _NUM + r")\s*%\s*(?:of\s+)?(?P<e1>[A-Za-z]{1,12})"
        r"|(?P<e2>[A-Za-z]{1,12})\s*(?:is|=|:)\s*(?P<p2>" + _NUM + r")\s*%)",
        re.I)
    found: List[Tuple[str, float]] = []
    for mm in pat.finditer(text):
        if mm.group("p1") is not None:
            word, pct = mm.group("e1"), mm.group("p1")
        else:
            word, pct = mm.group("e2"), mm.group("p2")
        sym = _resolve_element((word or "").strip().rstrip(","))
        if sym and all(sym != s for s, _ in found):
            found.append((sym, float(pct)))
    return found


def _c_empirical(g, m, text):
    if _stated_mass_guard(text):
        return _GATE
    els = _scan_percent_elements(text)
    if len(els) < 2:
        return _GATE
    tot = sum(p for _s, p in els)
    if not (98.0 <= tot <= 102.0):
        return _GATE            # incomplete/over-complete composition
    moles = [p / ATOMIC_MASS[s] for s, p in els]
    ints = _whole_ratio(moles)
    if not ints:
        return _GATE            # no clean whole-number ratio
    counts = {s: n for (s, _p), n in zip(els, ints)}
    ef = _counts_formula_str(counts)
    Mef = sum(ATOMIC_MASS[el] * n for el, n in counts.items())
    sub = "; ".join(f"{s}: {p:g}% / {ATOMIC_MASS[s]:g} = "
                    f"{p / ATOMIC_MASS[s]:.4g} mol" for s, p in els)
    ratio = " : ".join(f"{p / ATOMIC_MASS[s]:.3f}" for s, p in els)
    back = "; ".join(
        f"{s}: {counts[s] * ATOMIC_MASS[s] / Mef * 100:.2f}%"
        for s, _p in els)
    steps = _beats(
        "empirical-formula rule -- convert each percentage by mass to "
        "moles (% / atomic mass) and reduce the mole ratio to the "
        "smallest whole numbers",
        sub + f" (percentages sum to {tot:g})",
        f"mole ratio {ratio}, divided by the smallest and scaled -> "
        f"{_composition_str(counts)} -> {ef}",
        f"check: % recomputed from {ef}: {back} -- matches the given "
        f"percentages",
        f"empirical formula = {ef}.")
    return None, steps, f"empirical formula = {ef}", None, \
        "n = % / atomic mass; mole ratio reduced to whole numbers", \
        {"percent_sum": tot, "empirical_mass": Mef}


# ---- MOLECULAR_FROM_EMPIRICAL ---------------------------------------------- #

_MOLFROMEMP_RX = (
    r"empirical\s+formula[^.]{0,60}?(?:is|=|:)?\s*(?P<ef>" + _F_TOKEN + r")"
    r"[^.]{0,120}?(?:molar|molecular|gram\s+molecular)\s+mass\s*"
    r"(?:is|=|of|:)?\s*(?P<mw>" + _SCI + r")"
    r"|empirical\s+formula[^.]{0,60}?(?:is|=|:)?\s*(?P<ef2>" + _F_TOKEN + r")"
    r"[^.]{0,80}?vapour\s+density\s*(?:is|=|of|:)?\s*(?P<vd>" + _SCI + r")")


def _c_mol_from_emp(g, m, text):
    ef = g["ef"] or g["ef2"]
    if not ef or not _formula_valid_in_text(ef):
        # re.I lets a lowercase prose word ('of') satisfy F_TOKEN; re-take
        # the token case-sensitively right after the stated words
        fm = re.search(
            r"empirical\s+formula[^.]{0,80}?(?:is|=|:)\s*"
            r"(" + _F_TOKEN + r")", text)
        ef = fm.group(1) if fm else None
    if not ef or not _formula_valid_in_text(ef):
        return _GATE
    mw = _sci(g["mw"]) if g["mw"] else 2.0 * _sci(g["vd"])
    Memp = molar_mass(ef)
    if Memp is None or Memp <= 0 or mw <= 0 or mw < Memp * 0.95:
        return _GATE
    n_f = mw / Memp
    if abs(n_f - round(n_f)) > 0.05 or not (1 <= round(n_f) <= 20):
        return _GATE            # molar mass not a whole multiple
    n_f = int(round(n_f))
    c = parse_formula(ef)
    mf = _counts_formula_str({el: v * n_f for el, v in c.items()})
    Mmol = molar_mass(mf)
    steps = _beats(
        "molecular formula = (empirical formula) x n where n = molar mass "
        "/ empirical-formula mass"
        + (" (vapour density gives M = 2 x VD)" if g["ef2"] else ""),
        f"empirical formula {ef} with M(empirical) = {Memp:g}; "
        f"molar mass = {mw:g} g/mol",
        f"n = {mw:g} / {Memp:g} = {n_f}; multiply subscripts -> "
        f"({ef}){n_f if n_f > 1 else ''} = {mf}",
        f"check: M({mf}) = {Mmol:g} = the stated molar mass {mw:g}",
        f"molecular formula = {mf}.")
    return None, steps, f"molecular formula = {mf}", None, \
        "n = M / M(empirical); scale subscripts", \
        {"n": n_f, "empirical_mass": Memp, "molar_mass": mw}


# ---- AVG_ATOMIC_MASS ------------------------------------------------------- #

def _c_avg_mass(g, m, text):
    if not re.search(r"average\s+(?:atomic|at\.?)\s*mass|atomic\s+mass\s+"
                     r"of\s+(?:the\s+)?element", text, re.I):
        return _GATE
    iso = re.findall(
        r"(\d{1,3})\s*%\s*(?:of\s+)?(?P<f>[A-Z][a-z]?-?\d{0,3})|"
        r"(?P<f2>[A-Z][a-z]?-?\d{0,3})\s*(?:is|=|:)\s*(\d{1,3})\s*%", text)
    entries = []               # (mass_number or 0, abundance, table_mass)
    for pct, f1, f2, pct2 in iso:
        if f1 and pct:
            sym_txt, p = f1, float(pct)
        elif f2 and pct2:
            sym_txt, p = f2, float(pct2)
        else:
            continue
        mm = re.match(r"^([A-Z][a-z]?)(?:-(\d{1,3}))?$", sym_txt.strip())
        if not mm or mm.group(1) not in ATOMIC_MASS:
            continue
        mass = float(mm.group(2)) if mm.group(2) else \
            ATOMIC_MASS[mm.group(1)]
        entries.append((mass, p, mm.group(1),
                        int(mm.group(2)) if mm.group(2) else 0))
    if len(entries) < 2:
        return _GATE
    tot = sum(p for _m, p, _s, _a in entries)
    if not (98.0 <= tot <= 102.0):
        return _GATE
    avg = sum(mnum * p / 100.0 for mnum, p, _s, _a in entries)
    sub = " + ".join(f"{p:g}% x {mnum:g} ({s}-{a if a else round(mnum)})"
                     for mnum, p, s, a in entries)
    steps = _beats(
        "average atomic mass = weighted mean of the isotopic masses by "
        "their percentage abundances",
        sub + f" (abundances sum to {tot:g}%)",
        f"average = {' + '.join(f'{p / 100:.4f} x {mnum:g}' for mnum, p, _s, _a in entries)}"
        f" = {avg:.6g}",
        f"check: the average lies between the lightest "
        f"{min(mnum for mnum, _p, _s, _a in entries):g} and heaviest "
        f"{max(mnum for mnum, _p, _s, _a in entries):g} isotopic mass",
        f"average atomic mass = {avg:.6g} u.")
    return avg, steps, f"average atomic mass = {avg:.6g} u", None, \
        "weighted mean of isotopic masses", \
        {"abundance_sum": tot}


# ---- CONC_MASS_PERCENT ----------------------------------------------------- #

def _c_mass_percent(g, m, text):
    if not re.search(r"mass\s+(?:percent|percentage)|%\s*(?:by\s+mass|"
                     r"w\s*/\s*w)", text, re.I):
        return _GATE
    solv = re.search(r"(?P<w>" + _SCI + r")\s*g(?:rams?)?\s+(?:of\s+)?"
                     r"(?:water|solvent)", text, re.I)
    if not solv:
        return _GATE
    msolv = _sci(solv.group("w"))
    if msolv <= 0:
        return _GATE
    msolute, label = None, "solute"
    for am in re.finditer(r"(?P<n>" + _SCI + r")\s*g(?:rams?)?\s+"
                          r"(?:of\s+)?(?P<f>[A-Za-z][A-Za-z0-9.]*)",
                          text, re.I):
        if solv.start() <= am.start() < solv.end():
            continue           # the solvent statement itself
        tok = am.group("f").rstrip(".")
        if tok.lower() in ("water", "solvent", "solution", "steam", "ice"):
            continue
        v = _sci(am.group("n"))
        if v <= 0:
            continue
        msolute, label = v, tok
        break
    if msolute is None or msolute <= 0:
        return _GATE
    total = msolute + msolv
    pct = msolute / total * 100.0
    steps = _beats(
        "mass percent = (mass of solute / total mass of solution) x 100 "
        "-- a temperature-independent concentration measure",
        f"m(solute {label}) = {msolute:g} g, m(solvent) = {msolv:g} g, "
        f"m(solution) = {total:g} g",
        f"% by mass = ({msolute:g} / {total:g}) x 100 = {pct:.6g}%",
        f"check: ({pct:.6g} / 100) x {total:g} = "
        f"{pct / 100.0 * total:.6g} g = the solute mass",
        f"the solution is {pct:.6g}% {label} by mass.")
    return pct, steps, f"{pct:.6g}% by mass", None, \
        "% = (solute mass / solution mass) x 100", \
        {"solution_mass_g": total}


# ---- MOLE_FRACTION --------------------------------------------------------- #

def _c_mole_fraction(g, m, text):
    if not re.search(r"mole\s+fraction", text, re.I):
        return _GATE
    am = re.search(r"(?P<n1>" + _SCI + r")\s*(?:moles?|mol)\s+(?:of\s+)?"
                   r"(?P<f1>" + _F_TOKEN + r")", text, re.I)
    bm = re.search(r"(?:\b(?:and|with|in)\s+)(?P<n2>" + _SCI + r")\s*"
                   r"(?:moles?|mol)\s+(?:of\s+)?(?P<f2>" + _F_TOKEN + r")",
                   text, re.I)
    if not am:
        return _GATE
    n1 = _sci(am.group("n1"))
    f1 = am.group("f1")
    if bm:
        n2, f2 = _sci(bm.group("n2")), bm.group("f2")
    else:
        n2, f2 = None, None
    if n1 <= 0 or (n2 is not None and n2 <= 0):
        return _GATE
    if n2 is None:
        return _GATE
    x1 = n1 / (n1 + n2)
    x2 = n2 / (n1 + n2)
    who = f1 or "component A"
    askm = re.search(r"mole\s+fraction\s+of\s+(?P<af>" + _F_TOKEN + r")",
                     text, re.I)
    if askm and askm.group("af") and askm.group("af") == f2:
        x1, x2, who = x2, x1, f2 or "component B"
    steps = _beats(
        "mole fraction x = moles of the component / total moles; the two "
        "fractions always sum to 1",
        f"n({f1 or 'A'}) = {n1:g} mol, n({f2 or 'B'}) = {n2:g} mol, "
        f"total = {n1 + n2:g} mol",
        f"x({f1 or 'A'}) = {n1:g} / {n1 + n2:g} = "
        f"{n1 / (n1 + n2):.6g}; x({f2 or 'B'}) = {n2:g} / {n1 + n2:g} = "
        f"{n2 / (n1 + n2):.6g}",
        f"check: x1 + x2 = {x1:.6g} + {x2:.6g} = {x1 + x2:.4g} = 1",
        f"mole fraction of {who} = {x1:.6g}.")
    return x1, steps, f"x({who}) = {x1:.6g}", None, \
        "x_i = n_i / sum(n)", {"x_other": x2}


# ---- LIMITING_REAGENT ------------------------------------------------------ #

_AMOUNT_RX = re.compile(
    r"(?P<n>" + _SCI + r")\s*(?P<unit>moles?|mol|g|grams?)\s+(?:of\s+)?"
    r"(?P<f>" + _F_TOKEN + r")", re.I)


_SPECIES_TOK_RX = re.compile(
    r"(?<![A-Za-z0-9])(?:(\d+)\s+)?"
    r"((?:\((?:[A-Z][a-z]?\d*)+\)\d*|[A-Z][a-z]?\d*)+)"
    r"(?![A-Za-z0-9])")


def _best_species_run(side: str) -> Optional[List[Tuple[int, str]]]:
    """Longest '+'-joined run of (coefficient, species) tokens on one side;
    case-sensitive, so prose words never parse as species; ties -> first run
    (equation sides are stated before trailing units/junk in book prose)."""
    runs: List[List[Tuple[int, str]]] = []
    pos = 0
    last_end = 0
    while pos < len(side):
        m = _SPECIES_TOK_RX.search(side, pos)
        if not m:
            break
        run: List[Tuple[int, str]] = []
        while m:
            run.append((int(m.group(1) or 1), m.group(2)))
            last_end = m.end()
            nxt = re.match(r"\s*\+\s*", side[last_end:])
            if not nxt:
                break
            m = _SPECIES_TOK_RX.match(side, last_end + nxt.end())
        if run:
            runs.append(run)
        pos = last_end
    if not runs:
        return None
    best = max(len(r) for r in runs)
    if best == 1:
        return runs[0]
    return next(r for r in runs if len(r) == best)


def _parse_equation_coeffed(text: str):
    """'2 H2 + O2 -> 2 H2O' (inside prose) -> (lhs, rhs, co_l, co_r) or None.

    Sides are parsed as the longest '+'-joined run of species tokens, so
    wordy prefixes ('In the reaction 2 H2 + O2 -> ...') and unit tails
    ('2 NH3 at 300 K') cannot swallow the equation."""
    for mm in re.finditer(_ARROW_RX, text):
        lhs_run = _best_species_run(text[:mm.start()])
        rhs_raw = text[mm.end():]
        stop = re.search(r"[.,;\n]", rhs_raw)
        rhs_run = _best_species_run(rhs_raw[:stop.start()] if stop
                                    else rhs_raw)
        if not lhs_run or not rhs_run:
            continue
        if not (2 <= len(lhs_run) + len(rhs_run) <= 8):
            continue
        lhs = [f for _c, f in lhs_run]
        rhs = [f for _c, f in rhs_run]
        co_l = [c for c, _f in lhs_run]
        co_r = [c for c, _f in rhs_run]
        if all(_formula_valid_in_text(f) for f in lhs + rhs):
            return lhs, rhs, co_l, co_r
    return None


def _c_limiting(g, m, text):
    if not re.search(r"limiting|formed|produced|obtained|how\s+much|"
                     r"how\s+many", text, re.I):
        return _GATE
    eq = _parse_equation_coeffed(text)
    if not eq:
        return _GATE
    lhs, rhs, co_l, co_r = eq
    amounts = []
    for am in _AMOUNT_RX.finditer(text):
        f = am.group("f")
        if not _formula_valid_in_text(f) or f not in lhs:
            continue
        v = _sci(am.group("n"))
        if v <= 0 or any(f == af for af, _n, _s in amounts):
            continue
        n = v if am.group("unit").lower().startswith("m") \
            else v / molar_mass(f)
        if n is None or n <= 0:
            return _GATE
        amounts.append((f, n, am.start()))
    if len(amounts) < 2:
        return _GATE
    idx = {f: i for i, f in enumerate(lhs)}
    ratios = {f: n / co_l[idx[f]] for f, n, _s in amounts}
    lim = min(ratios, key=ratios.get)
    p = None
    for cand in rhs:
        if re.search(re.escape(cand) + r"\b[^.]{0,40}?(?:formed|produced|"
                     r"obtained)|(?:moles?|mass|grams?|volume)[^.]{0,30}of\s+"
                     + re.escape(cand) + r"\b", text, re.I):
            p = cand
            break
    p = p or rhs[0]
    j = rhs.index(p)
    n_prod = ratios[lim] * co_r[j] / co_l[idx[lim]]
    Mprod = molar_mass(p)
    m_prod = n_prod * Mprod
    audit = "; ".join(f"{f}: {ratios[f]:.4g}" + (" (limiting)" if f == lim
                                                    else "")
                      for f, _n, _s in amounts)
    left_ok = all(n - ratios[lim] * co_l[idx[f]] >= -1e-9
                  for f, n, _s in amounts)
    steps = _beats(
        "stoichiometry of the balanced equation -- the coefficients fix "
        "the mole ratios, and the reactant with the smallest n/coeff "
        "ratio runs out first (limiting reagent)",
        f"equation {_equation_str(lhs, co_l, rhs, co_r)}; given "
        + ", ".join(f"{n:.4g} mol of {f}" for f, n, _s in amounts),
        f"n/coeff ratios: {audit}; product {p}: {ratios[lim]:.4g} x "
        f"{co_r[j]}/{co_l[idx[lim]]} = {n_prod:.4g} mol = "
        f"{n_prod:.4g} x {Mprod:g} = {m_prod:.4g} g",
        f"check: every non-limiting reactant has some left over: "
        f"{'yes' if left_ok else 'no'}; n x M({p}) = {n_prod:.4g} x "
        f"{Mprod:g} = {m_prod:.4g} g consistent",
        f"{lim} is the limiting reagent; it fixes {n_prod:.4g} mol "
        f"({m_prod:.4g} g) of {p}.")
    return n_prod, steps, \
        f"{lim} is limiting; {n_prod:.4g} mol ({m_prod:.4g} g) of {p}", \
        None, "limiting: min(n_i/coeff_i); product from stoichiometric ratio", \
        {"product_moles": n_prod, "product_mass_g": m_prod}


# ---- PERCENT_YIELD --------------------------------------------------------- #

def _c_percent_yield(g, m, text):
    if not re.search(r"yield", text, re.I):
        return _GATE
    am = re.search(r"actual\s+yield[^.,;]{0,30}?(?:is|=|of|:)?\s*(?P<a>"
                   + _SCI + r")\s*g|(?P<a2>" + _SCI + r")\s*g[^.,;]{0,10}?"
                   r"is\s+(?:the\s+)?actual\s+yield", text, re.I)
    tm = re.search(r"theoretical\s+yield[^.,;]{0,30}?(?:is|=|of|:)?\s*"
                   r"(?P<t>" + _SCI + r")\s*g|(?P<t2>" + _SCI + r")\s*g"
                   r"[^.,;]{0,10}?is\s+(?:the\s+)?theoretical\s+yield",
                   text, re.I)
    pm = re.search(r"(?:(?:percent|percentage)\s+yield[^.]{0,20}?"
                   r"(?:is|=|of|:)?|yield\s+of\s+)(?P<p>" + _NUM + r")\s*%"
                   r"|(?P<p2>" + _NUM + r")\s*%\s*yield", text, re.I)
    known = []
    if am:
        known.append(("actual", _sci(am.group("a") or am.group("a2"))))
    if tm:
        known.append(("theoretical", _sci(tm.group("t") or tm.group("t2"))))
    if pm:
        known.append(("percent", float(pm.group("p") or pm.group("p2"))))
    names = {k for k, _v in known}
    if len(known) < 2:
        return _GATE
    get = dict(known)
    if "percent" not in names:
        actual, theo = get["actual"], get["theoretical"]
        if actual <= 0 or theo <= 0 or actual > theo * 1.005:
            return _GATE        # yield above 100% is impossible
        pct = actual / theo * 100.0
        comp = f"{actual:g} / {theo:g} x 100 = {pct:.6g}%"
        chk = (f"({pct:.6g} / 100) x {theo:g} = "
               f"{pct / 100.0 * theo:.6g} g = the actual yield")
        interp = (f"yield = {pct:.6g}% -- "
                  f"{100.0 - pct:.6g}% of the theoretical amount was lost.")
        val, ans = pct, f"percent yield = {pct:.6g}%"
    elif "theoretical" not in names:
        actual, pct = get["actual"], get["percent"]
        if actual <= 0 or not (0 < pct <= 100.5):
            return _GATE
        theo = actual / (pct / 100.0)
        comp = f"{actual:g} / ({pct:g} / 100) = {theo:.6g} g"
        chk = f"{pct:g}% of {theo:.6g} g = {theo * pct / 100:.6g} g = actual"
        interp = f"theoretical (100%) yield = {theo:.6g} g."
        val, ans = theo, f"theoretical yield = {theo:.6g} g"
    else:
        theo, pct = get["theoretical"], get["percent"]
        if theo <= 0 or not (0 < pct <= 100.5):
            return _GATE
        actual = theo * pct / 100.0
        comp = f"{theo:g} x {pct:g} / 100 = {actual:.6g} g"
        chk = (f"({actual:.6g} / {theo:g}) x 100 = "
               f"{actual / theo * 100:.6g}% = the given percent")
        interp = f"expected actual yield = {actual:.6g} g."
        val, ans = actual, f"actual yield = {actual:.6g} g"
    steps = _beats(
        "percent yield = (actual yield / theoretical yield) x 100 -- "
        "the theoretical yield is the stoichiometric maximum",
        "; ".join(f"{k} = {v:g}" + (" g" if k != "percent" else "%")
                  for k, v in known),
        comp,
        chk,
        interp)
    return val, steps, ans, None, \
        "% yield = (actual / theoretical) x 100", dict(known)


# ---- MOLALITY_ANY ---------------------------------------------------------- #

def _c_molality(g, m, text):
    if not re.search(r"molality", text, re.I):
        return _GATE
    ms = re.search(r"(?P<n>" + _SCI + r")\s*(?:moles?|mol)\s+(?:of\s+)?"
                   r"(?P<f1>" + _F_TOKEN + r")", text, re.I)
    gs = re.search(r"(?P<gm>" + _SCI + r")\s*g(?:rams?)?\s+(?:of\s+)?"
                   r"(?P<f2>" + _F_TOKEN + r")", text, re.I)
    ws = re.search(r"(?P<w>" + _SCI + r")\s*(?P<wu>kg|kilograms?|g|grams?)"
                   r"\s+(?:of\s+)?(?:water|solvent)", text, re.I)
    if not ws:
        return _GATE
    wkg = _sci(ws.group("w")) * \
        (1.0 if ws.group("wu").lower().startswith("k") else 1e-3)
    if wkg <= 0:
        return _GATE
    if ms and _formula_valid_in_text(ms.group("f1")):
        n, f = _sci(ms.group("n")), ms.group("f1")
    elif gs and _formula_valid_in_text(gs.group("f2")):
        f = gs.group("f2")
        Mw = molar_mass(f)
        gm = _sci(gs.group("gm"))
        if Mw is None or Mw <= 0 or gm <= 0:
            return _GATE
        n = gm / Mw
    else:
        return _GATE
    if n <= 0:
        return _GATE
    molality = n / wkg
    steps = _beats(
        "molality m = moles of solute per kilogram of SOLVENT "
        "(mass-based, so temperature-independent, unlike molarity)",
        f"n = {n:.6g} mol of {f}, solvent = {ws.group('w')} "
        f"{ws.group('wu')} = {wkg:g} kg",
        f"molality = {n:.6g} / {wkg:g} = {molality:.6g} mol/kg",
        f"check: molality x kg solvent = {molality:.6g} x {wkg:g} = "
        f"{molality * wkg:.6g} mol = the moles taken",
        f"molality = {molality:.6g} mol/kg (m).")
    return molality, steps, f"molality = {molality:.6g} m", None, \
        "m = n / kg solvent", {"solvent_kg": wkg}


# ---- NORMALITY_ANY --------------------------------------------------------- #

def _c_normality(g, m, text):
    if not re.search(r"normality", text, re.I):
        return _GATE
    if re.search(r"neutral\w+|titrat", text, re.I) and \
            len(re.findall(r"\b" + _SCI + r"\s*" + _VU + r"\b", text, re.I)) \
            >= 2:
        return _GATE        # a titration frame: TITRATION_NORMALITY owns it
    mm = re.search(r"(?P<c>" + _SCI + r")\s*(?P<u>[MN])\b\s*(?:solution"
                   r"\s+)?(?:of\s+)?(?P<f>" + _F_TOKEN + r")", text, re.I)
    if not mm or not _formula_valid_in_text(mm.group("f")):
        return _GATE
    f = mm.group("f")
    nf = _NFACTOR.get(f)
    if not nf:
        return _GATE            # n-factor unknown: decline
    c = _sci(mm.group("c"))
    if c <= 0:
        return _GATE
    if mm.group("u").upper() == "M":
        N = c * nf
        steps = _beats(
            "normality N = molarity M x n-factor (basicity of an acid / "
            "acidity of a base = equivalents per mole)",
            f"M = {c:g} M for {f}, n-factor = {nf}",
            f"N = {c:g} x {nf} = {N:g} N",
            f"check: N / n-factor = {N:g} / {nf} = {N / nf:g} M = the "
            f"given molarity",
            f"normality = {N:g} N ({nf} equivalents per mole).")
        return N, steps, f"N = {N:g} N", None, "N = M x n-factor", \
            {"n_factor": nf}
    Mc = c / nf
    steps = _beats(
        "molarity M = normality N / n-factor (equivalents per mole)",
        f"N = {c:g} N for {f}, n-factor = {nf}",
        f"M = {c:g} / {nf} = {Mc:g} M",
        f"check: M x n-factor = {Mc:g} x {nf} = {Mc * nf:g} N = the given "
        f"normality",
        f"molarity = {Mc:g} M.")
    return Mc, steps, f"M = {Mc:g} M", None, "M = N / n-factor", \
        {"n_factor": nf}


# ---- DILUTION_M1V1 --------------------------------------------------------- #

_VU = r"(?:ml|millilitres?|milliliters?|l|litres?|liters?)"


def _c_dilution(g, m, text):
    if not re.search(r"dilut", text, re.I):
        return _GATE
    t1 = re.search(
        r"(?P<v1>" + _SCI + r")\s*(?P<u1>" + _VU + r")\b[^.]{0,40}?of\s+"
        r"(?:a\s+)?(?P<m1>" + _SCI + r")\s*M\b[^.]{0,80}?diluted\s+to"
        r"[^.]{0,30}?(?P<v2>" + _SCI + r")\s*(?P<u2>" + _VU + r")\b",
        text, re.I)
    t2 = re.search(
        r"(?:what\s+)?volume\s+of\s+(?P<m1>" + _SCI + r")\s*M\b[^.]{0,120}?"
        r"(?:prepare|make)[^.]{0,40}?(?P<v2>" + _SCI + r")\s*(?P<u2>" + _VU
        + r")\b\s+(?:of\s+)?(?:a\s+)?(?P<m2>" + _SCI + r")\s*M\b", text, re.I)
    if t1:
        v1 = _litres(_sci(t1.group("v1")), t1.group("u1"))
        v2 = _litres(_sci(t1.group("v2")), t1.group("u2"))
        m1 = _sci(t1.group("m1"))
        if v1 <= 0 or v2 <= 0 or m1 <= 0:
            return _GATE
        m2 = m1 * v1 / v2
        if m2 >= m1:
            return _GATE        # dilution can never raise concentration
        steps = _beats(
            "dilution law M1 V1 = M2 V2 -- adding only solvent leaves the "
            "moles of solute unchanged",
            f"M1 = {m1:g} M, V1 = {t1.group('v1')} {t1.group('u1')} = "
            f"{v1:g} L, V2 = {t1.group('v2')} {t1.group('u2')} = {v2:g} L",
            f"M2 = M1 V1 / V2 = {m1:g} x {v1:g} / {v2:g} = {m2:.6g} M",
            f"check: M1 V1 = {m1 * v1:.6g} = M2 V2 = {m2 * v2:.6g} mol -- "
            f"same moles before and after",
            f"final concentration = {m2:.6g} M (dilution factor "
            f"{v2 / v1:g}).")
        return m2, steps, f"M2 = {m2:.6g} M", None, "M1 V1 = M2 V2", \
            {"dilution_factor": v2 / v1}
    if t2:
        m1 = _sci(t2.group("m1"))
        v2 = _litres(_sci(t2.group("v2")), t2.group("u2"))
        m2 = _sci(t2.group("m2"))
        if m1 <= 0 or v2 <= 0 or m2 <= 0 or m2 >= m1:
            return _GATE        # target must be weaker than the stock
        v1 = m2 * v2 / m1
        steps = _beats(
            "dilution law rearranged as V1 = M2 V2 / M1 -- the stock "
            "solution contributes all of the solute needed",
            f"M1 = {m1:g} M (stock), M2 = {m2:g} M, V2 = "
            f"{t2.group('v2')} {t2.group('u2')} = {v2:g} L",
            f"V1 = {m2:g} x {v2:g} / {m1:g} = {v1:.6g} L",
            f"check: M1 V1 = {m1 * v1:.6g} = M2 V2 = {m2 * v2:.6g} mol",
            f"take {v1 * 1000:.6g} mL of the {m1:g} M stock and dilute to "
            f"{t2.group('v2')} {t2.group('u2')}.")
        return v1, steps, f"V1 = {v1 * 1000:.6g} mL of stock", None, \
            "V1 = M2 V2 / M1", {"stock_volume_l": v1}
    return _GATE


# ---- TITRATION_NORMALITY --------------------------------------------------- #

def _c_titration(g, m, text):
    if not re.search(r"neutral\w+|titrat", text, re.I):
        return _GATE
    askside = (r"(?P<v{n}>" + _SCI + r")\s*(?P<u{n}>" + _VU + r")\b\s+"
               r"(?:of\s+)?(?:a\s+)?(?:(?P<f{n}>" + _F_TOKEN + r")\s+)?"
               r"(?:solution|sol\.)?")
    for given_n, ask_n in (("1", "2"), ("2", "1")):
        gs = dict(n=given_n)
        pat = (r"(?P<v1>" + _SCI + r")\s*(?P<u1>" + _VU + r")\b\s+of\s+"
               r"(?P<c1>" + _SCI + r")\s*(?P<t1>[MN])\s+(?P<f1>" + _F_TOKEN
               + r")" if given_n == "1" else
               r"(?P<v2>" + _SCI + r")\s*(?P<u2>" + _VU + r")\b\s+of\s+"
               r"(?P<c2>" + _SCI + r")\s*(?P<t2>[MN])\s+(?P<f2>" + _F_TOKEN
               + r")")
        mm = re.search(
            pat + r"[^.]{0,100}?(?:neutral\w+|titrat\w+|completely\s+"
            r"reacts?\s+with)[^.]{0,100}?" + askside.format(n=ask_n)
            + r".{0,100}?(?:molarity|normality|concentration|strength)",
            text, re.I)
        if not mm:
            continue
        gd = mm.groupdict()
        gn, an = given_n, ask_n
        fg = gd["f" + gn]
        nf_g = _NFACTOR.get(fg)
        if not nf_g or not _formula_valid_in_text(fg):
            return _GATE
        cg = _sci(gd["c" + gn])
        vg = _litres(_sci(gd["v" + gn]), gd["u" + gn])
        va = _litres(_sci(gd["v" + an]), gd["u" + an])
        if cg <= 0 or vg <= 0 or va <= 0:
            return _GATE
        cgM = cg / nf_g if gd["t" + gn].upper() == "N" else cg
        eq_g = nf_g * cgM * vg
        fa = gd.get("f" + an)
        nf_a = _NFACTOR.get(fa) if fa else None
        if nf_a is None:
            return _GATE        # ask-side n-factor unknown: decline
        Ma = eq_g / (nf_a * va)
        Na = Ma * nf_a
        ask_word = "normality" if re.search(r"normality", text, re.I) \
            else "molarity"
        steps = _beats(
            "neutralisation equivalence -- equivalents of acid = "
            "equivalents of base, i.e. n1 M1 V1 = n2 M2 V2 (titration "
            "relation)",
            f"{gd['v' + gn]} {gd['u' + gn]} of {cg:g} {gd['t' + gn]} "
            f"{fg} (n-factor {nf_g}) vs {gd['v' + an]} {gd['u' + an]} of "
            f"{fa or 'the titrand'} (n-factor {nf_a})",
            f"equivalents given = {nf_g} x {cgM:g} x {vg:g} = {eq_g:.6g}; "
            f"M(ask) = {eq_g:.6g} / ({nf_a} x {va:g}) = {Ma:.6g} M",
            f"check: {nf_a} x {Ma:.6g} x {va:g} = {nf_a * Ma * va:.6g} = "
            f"the acid equivalents",
            f"{'molarity' if ask_word == 'molarity' else 'normality'} of "
            f"the {'ask-side' if not fa else fa} solution: "
            f"{Ma:.6g} M (= {Na:.6g} N).")
        val = Na if ask_word == "normality" else Ma
        return val, steps, \
            (f"N = {Na:.6g} N" if ask_word == "normality"
             else f"M = {Ma:.6g} M"), None, \
            "n1 M1 V1 = n2 M2 V2", {"molarity": Ma, "normality": Na}
    return _GATE


# ---- KP_KC_CONVERT --------------------------------------------------------- #

_R_BAR = 0.0831                # bar L / (mol K), NCERT value


def _c_kp_kc(g, m, text):
    if not re.search(r"\bK[pc]\b", text):
        return _GATE
    eq = _parse_equation_coeffed(text)
    if not eq:
        return _GATE
    lhs, rhs, co_l, co_r = eq
    bal = balance_equation(lhs, rhs)
    if bal:
        co_l, co_r = bal
    dn = sum(co_r) - sum(co_l)
    tm = re.search(r"at\s+(?P<t>" + _SCI + r")\s*K\b", text)
    km = re.search(r"\bKc\b\s*(?:is|=|:)?\s*(?P<kc>" + _SCI + r")", text)
    kpm = re.search(r"\bKp\b\s*(?:is|=|:)?\s*(?P<kp>" + _SCI + r")", text)
    if not tm or not (km or kpm):
        return _GATE
    T = _sci(tm.group("t"))
    if T <= 0:
        return _GATE
    kc = _sci(km.group("kc")) if km else None
    kp = _sci(kpm.group("kp")) if kpm else None
    factor = (_R_BAR * T) ** dn
    if kc is not None:
        kp_v = kc * factor
        comp = (f"Kp = Kc x (RT)^dn = {kc:g} x ({_R_BAR:g} x {T:g})^"
                f"({dn:+d}) = {kp_v:.6g}")
        chk = (f"Kp / (RT)^dn = {kp_v:.6g} / {factor:.6g} = "
               f"{kp_v / factor:.6g} = the given Kc")
        interp = (f"Kp = {kp_v:.6g} bar (dn = {dn:+d}, so "
                  + ("Kp < Kc" if factor < 1 else "Kp > Kc"
                     if factor > 1 else "Kp = Kc") + ").")
        val, ans, given = kp_v, f"Kp = {kp_v:.6g}", "Kc"
    else:
        kc_v = kp / factor
        comp = (f"Kc = Kp / (RT)^dn = {kp:g} / ({_R_BAR:g} x {T:g})^"
                f"({dn:+d}) = {kc_v:.6g}")
        chk = (f"Kc x (RT)^dn = {kc_v:.6g} x {factor:.6g} = "
               f"{kc_v * factor:.6g} = the given Kp")
        interp = (f"Kc = {kc_v:.6g} (dn = {dn:+d}).")
        val, ans, given = kc_v, f"Kc = {kc_v:.6g}", "Kp"
    steps = _beats(
        "equilibrium-constant relation Kp = Kc (RT)^dn with dn = moles of "
        "gaseous products - moles of gaseous reactants (R = 0.0831 bar L "
        "mol-1 K-1)",
        f"{given} given; dn = ({' + '.join(str(c) for c in co_r)})"
        f" - ({' + '.join(str(c) for c in co_l)}) = {dn:+d}; T = {T:g} K",
        comp,
        chk,
        interp)
    return val, steps, ans, ["Kp in bar; R = 0.0831 bar L mol-1 K-1"], \
        "Kp = Kc (RT)^dn", {"dn": dn, "T_K": T}


# ---- OXIDATION_NUMBER ------------------------------------------------------ #

_ON_RX = (
    r"oxidation\s+(?:number|state)\s+of\s+(?:the\s+)?(?P<el>[A-Za-z]{1,12})"
    r"\s+(?:in|of)\s+(?:the\s+)?(?P<sp>[A-Z][A-Za-z0-9().]*\d*)"
    r"\s*\^?\s*(?P<qn>\d{0,2})?(?P<qs>[+-])?")


def _c_oxnum(g, m, text):
    if not re.search(r"oxidation\s+(?:number|state)", text, re.I):
        return _GATE
    el = _resolve_element(g["el"])
    if not el:
        return _GATE
    sp = g["sp"].rstrip(".,;:)")
    qs = g.get("qs") or ""
    qn = g.get("qn") or ""
    peroxide = re.search(r"peroxide|superoxide", text, re.I) is not None
    trials = []
    if qs:
        sign = 1 if qs == "+" else -1
        mag = int(qn) if qn else None
        if mag is not None:
            trials.append((sp, sign * mag))
        # tight notation "Cr2O72-": trailing digits may be the charge
        for k in (2, 1):
            if sp[-k:].isdigit() and len(sp) > k:
                base = sp[:-k]
                trials.append((base, sign * int(sp[-k:])))
    trials.append((sp, 0))
    for base, q in trials:
        counts = parse_formula(base)
        if not counts or el not in counts:
            continue
        if base in ("H2O2", "Na2O2", "K2O2", "Li2O2", "CaO2", "BaO2") \
                or peroxide:
            return _GATE        # per/super-oxide: outside the fixed rules
        if any(e not in _ON_FIXED and e != el for e in counts):
            continue            # a second variable element: not solvable
        others = sum(_ON_FIXED[e] * n for e, n in counts.items() if e != el)
        num = q - others
        den = counts[el]
        if den <= 0 or num % den:
            continue
        val = num // den
        if not (-4 <= val <= 8):
            continue
        if el in _ON_FIXED and val != _ON_FIXED[el]:
            return _GATE        # hydride/oxide exception: decline honestly
        others_str = " + ".join(
            f"{n} x ({_ON_FIXED[e]:+d})" for e, n in sorted(counts.items())
            if e != el) or "0"
        steps = _beats(
            "oxidation-number rule set -- fixed states (H +1, O -2, alkali "
            "+1, alkaline-earth +2, Al +3, F -1) and the sum of oxidation "
            "numbers = the ionic charge",
            f"species {base} with charge {q:+d}; fixed parts: "
            f"{others_str}; {den} x {el}(?)",
            f"{den} x {el} = {q:+d} - ({others if others <= 0 else '+' + str(others)})"
            f" = {num:+d} -> {el} = {val:+d}",
            f"check: {den} x ({val:+d}) + ({others_str}) = "
            f"{den * val + others:+d} = the ion charge {q:+d}",
            f"oxidation number of {el} in {base} = {val:+d}.")
        return float(val), steps, \
            f"oxidation number of {el} in {base} = {val:+d}", None, \
            "sum of oxidation numbers = ionic charge", {"charge": q}
    return _GATE


# ---- FARADAY_MASS ---------------------------------------------------------- #

FARADAY_C = 96500.0            # C per mol of electrons


def _c_faraday(g, m, text):
    if not re.search(r"(?:current|charge)\b", text, re.I) or \
            not re.search(r"deposit\w*|liberat\w*|discharg\w*|electrolysis|"
                          r"electroplat\w*|plated", text, re.I):
        return _GATE
    ci = re.search(r"(?P<i>" + _SCI + r")\s*A\b", text, re.I)
    tm = re.search(r"(?P<t>" + _SCI + r")\s*(?P<tu>s\b|sec\b|seconds?|"
                   r"min\b|minutes?|h\b|hr\b|hours?)", text, re.I)
    fs = re.search(r"(?:through|in|from)\s+(?:a\s+|an\s+)?(?:solution\s+"
                   r"of\s+|electrolyte\s+|molten\s+)?(?P<f>" + _F_TOKEN
                   + r")", text, re.I)
    if not (ci and tm and fs) or not _formula_valid_in_text(fs.group("f")):
        return _GATE
    I = _sci(ci.group("i"))
    tval = _sci(tm.group("t"))
    tu = tm.group("tu").lower()
    tsec = tval * (3600.0 if tu.startswith("h") else
                   60.0 if tu.startswith("m") else 1.0)
    if I <= 0 or tsec <= 0:
        return _GATE
    f = fs.group("f")
    counts = parse_formula(f)
    metal = next((e for e in counts
                  if e in _METALS and valency_in_formula(e, f)), None)
    if metal is None:
        return _GATE
    n_e = valency_in_formula(metal, f)
    M = ATOMIC_MASS[metal]
    mass = M * I * tsec / (n_e * FARADAY_C)
    Z = M / (n_e * FARADAY_C)
    steps = _beats(
        "Faraday's first law m = Z It = M It / (n F) -- the mass "
        "deposited is proportional to the charge; n = electrons per ion "
        "= the valency of the deposited metal",
        f"I = {I:g} A, t = {tval:g} {tm.group('tu')} = {tsec:g} s, "
        f"{metal} from {f} (n = {n_e}), M = {M:g} g/mol, F = 96500 C/mol",
        f"Q = {I:g} x {tsec:g} = {I * tsec:.6g} C; m = {M:g} x "
        f"{I * tsec:.6g} / ({n_e} x 96500) = {mass:.6g} g",
        f"check: moles deposited = Q / (n F) = {I * tsec:.6g} / "
        f"({n_e} x 96500) = {I * tsec / (n_e * FARADAY_C):.6g} mol; x "
        f"{M:g} = {mass:.6g} g back",
        f"mass of {metal} deposited = {mass:.6g} g (electrochemical "
        f"equivalent Z = {Z:.3e} g/C).")
    return mass, steps, f"m = {mass:.6g} g of {metal}", None, \
        "m = Z I t = M I t / (n F)", {"charge_C": I * tsec, "z_eq": Z}


# ---- CELL_POTENTIAL -------------------------------------------------------- #

def _c_cell_potential(g, m, text):
    if not re.search(r"cell\s+potential|e\s*\.?\s*m\s*f|"
                     r"e\s*°?\s*\(?\s*cell", text, re.I):
        return _GATE
    couples = []
    for cm in re.finditer(
            r"[Ee]\s*°?\s*\(\s*(?P<c>[A-Za-z]{1,2}\s*\d*\s*/\s*[A-Za-z]{1,2}"
            r"\s*\d*)\s*\)\s*(?:is|=|:)?\s*(?P<v>[-+]?\s*" + _SCI + r")\s*V",
            text, re.I):
        el = re.match(r"\s*([A-Za-z]{1,2})", cm.group("c")).group(1)
        if all(el != e for e, _v in couples):
            couples.append((el.strip(), _sci(cm.group("v"))))
    if len(couples) < 2:
        return _GATE
    am = re.search(r"(?P<an>[A-Z][a-z]?)\s*(?:acts?\s+as\s+(?:the\s+)?|"
                   r"is\s+the\s+)?anode|anode[^.]{0,20}?(?P<an2>[A-Z][a-z]?)",
                   text)
    an_el = am.group("an") or am.group("an2") if am else None
    if an_el and any(an_el == e for e, _v in couples):
        cat_el, cat_v = next((e, v) for e, v in couples if e != an_el)
        an_v = dict(couples)[an_el]
        assumed = False
    else:
        cat_el, cat_v = max(couples, key=lambda x: x[1])
        an_el, an_v = min(couples, key=lambda x: x[1])
        assumed = True
    ecell = cat_v - an_v
    steps = _beats(
        "standard cell potential E(cell) = E(cathode) - E(anode) -- "
        "reduction potentials are subtracted, never added"
        + (" (the couple with the higher reduction potential is the "
           "cathode, so the cell is spontaneous as assumed)"
           if assumed else ""),
        f"E({cat_el} couple) = {cat_v:+g} V (cathode), E({an_el} couple) "
        f"= {an_v:+g} V (anode)",
        f"E(cell) = {cat_v:+g} - ({an_v:+g}) = {ecell:+.6g} V",
        f"check: E(cell) = higher - lower = {max(cat_v, an_v):+g} - "
        f"({min(cat_v, an_v):+g}) = {ecell:+.6g} V"
        + ("" if ecell > 0 else " -- negative, so the written direction "
           "is non-spontaneous"),
        f"E(cell) = {ecell:+.6g} V"
        + (" -- the cell works as written." if ecell > 0
           else " -- reverse the electrodes for a working cell.")
        if not assumed else
        f"E(cell) = {ecell:+.6g} V -- spontaneous "
        f"({an_el} anode, {cat_el} cathode).")
    return ecell, steps, f"E(cell) = {ecell:+.6g} V", \
        (None if not assumed else
         ["anode/cathode not stated: spontaneous direction assumed"]), \
        "E(cell) = E(cathode) - E(anode)", {"E_cathode": cat_v,
                                            "E_anode": an_v}


# ---- RATE_ORDER_FROM_DATA -------------------------------------------------- #

def _c_rate_order(g, m, text):
    if not re.search(r"\brate\b", text, re.I):
        return _GATE
    xm = None
    mw = (re.search(r"concentration[^.]{0,40}?"
                    r"(?P<w>doubled|tripled|quadrupled|halved)", text, re.I)
          or re.search(r"(?P<w>doubled|tripled|quadrupled|halved)"
                       r"[^.]{0,60}?concentration", text, re.I))
    if mw:
        xm = {"doubled": 2.0, "tripled": 3.0, "quadrupled": 4.0,
              "halved": 0.5}[mw.group("w").lower()]
    else:
        mx = re.search(r"concentration[^.]{0,40}?(?:is\s+)?(?:increased|"
                       r"raised)\s+to\s+(?P<x>" + _NUM + r")\s*times",
                       text, re.I)
        if mx:
            xm = float(mx.group("x"))
    if xm is None or xm <= 0 or xm == 1:
        return _GATE
    if re.search(r"rate[^.]{0,40}?(?:remains?\s+(?:un)?changed|unchanged|"
                 r"does\s+not\s+change|is\s+not\s+affected)", text, re.I):
        y = 1.0
    else:
        my = re.search(r"rate[^.]{0,60}?(?:becomes|increases?|is\s+increased"
                       r"|goes\s+up)\s*(?:to)?\s*(?P<y>" + _NUM
                       + r")\s*times", text, re.I)
        if not my:
            return _GATE
        y = float(my.group("y"))
    if y <= 0:
        return _GATE
    n = math.log(y) / math.log(xm)
    if not (0 <= n <= 4) or abs(n - round(n)) > 0.08:
        return _GATE            # board data are clean integers
    order = int(round(n))
    word = {0: "zero", 1: "first", 2: "second", 3: "third", 4: "fourth"}[order]
    steps = _beats(
        "rate law rate = k [A]^n -- comparing two experiments cancels k, "
        "so n = log(rate ratio) / log(concentration ratio)",
        f"concentration ratio = {xm:g}, rate ratio = {y:g}",
        f"n = log({y:g}) / log({xm:g}) = {n:.4g} = {order}",
        f"check: ({xm:g})^{order} = {xm ** order:.4g} = the observed rate "
        f"ratio",
        f"order of the reaction = {order} ({word} order).")
    return float(order), steps, f"order = {order}", None, \
        "n = log(rate ratio) / log(concentration ratio)", \
        {"x_ratio": xm, "y_ratio": y}


# ---- HALF_LIFE_FIRST_ORDER ------------------------------------------------- #

def _c_half_life(g, m, text):
    if re.search(r"radioactiv|nuclear|decay\s+constant", text, re.I):
        return _GATE            # nuclear decay is physics territory
    if not re.search(r"half[-\s]?life", text, re.I):
        return _GATE
    if re.search(r"after\s+" + _SCI, text, re.I):
        return _GATE        # 'after N minutes' asks a remaining amount
    if not re.search(r"first[-\s]?order|rate\s+constant|\bk\b\s*(?:is|=|:)",
                     text, re.I):
        return _GATE
    ht = re.search(r"half[-\s]?life[^.,;]{0,30}?(?:is|=|of|:)?\s*(?P<t>"
                   + _SCI + r")\s*(?P<tu>s\b|sec\b|seconds?|min\b|minutes?|"
                   r"h\b|hr\b|hours?)?", text, re.I)
    kt = (re.search(r"\bk\s*(?:is|=|:)?\s*(?P<k>" + _SCI + r")\s*"
                    r"(?P<ku>s\s*-?1|min\s*-?1|hr\s*-?1|h\s*-?1|/s|/min|"
                    r"/h)?", text, re.I)
          or re.search(r"rate\s+constant\s*(?:is|=|:)?\s*(?P<k>" + _SCI
                       + r")\s*(?P<ku>s\s*-?1|min\s*-?1|hr\s*-?1|h\s*-?1|"
                         r"/s|/min|/h)?", text, re.I))
    if not ht and not kt:
        return _GATE

    def unit(u, default="min"):
        u = (u or default).lower()
        return 3600.0 if u.startswith("h") else \
            1.0 if u.startswith("s") else 60.0
    if ht and kt:
        return _GATE            # both stated: nothing to solve
    if ht:
        th = _sci(ht.group("t")) * unit(ht.group("tu"))
        if th <= 0:
            return _GATE
        k = 0.693 / th
        steps = _beats(
            "first-order half-life relation t(1/2) = 0.693 / k -- the "
            "half-life is independent of the starting concentration",
            f"t(1/2) = {ht.group('t')} {ht.group('tu') or 'min'} = "
            f"{th:g} s",
            f"k = 0.693 / {th:g} = {k:.6g} per s",
            f"check: k x t(1/2) = {k:.6g} x {th:g} = {k * th:.6g} = 0.693",
            f"rate constant k = {k:.6g} s^-1.")
        return k, steps, f"k = {k:.6g} per unit time", None, \
            "t(1/2) = 0.693 / k", {"half_life_s": th}
    k = _sci(kt.group("k"))
    if k <= 0:
        return _GATE
    th = 0.693 / k
    ushow = kt.group("ku") or "min"
    steps = _beats(
        "first-order half-life relation t(1/2) = 0.693 / k -- independent "
        "of the starting concentration",
        f"k = {k:g} {ushow}",
        f"t(1/2) = 0.693 / {k:g} = {th:.6g}",
        f"check: k x t(1/2) = {k:g} x {th:.6g} = {k * th:.4g} = 0.693",
        f"half-life t(1/2) = {th:.6g}.")
    return th, steps, f"t(1/2) = {th:.6g}", None, "t(1/2) = 0.693 / k", \
        {"k": k}


# ---- REMAINING_AFTER_HALFLIVES --------------------------------------------- #

def _c_decay_fraction(g, m, text):
    if re.search(r"radioactiv|nuclear", text, re.I):
        return _GATE
    if not re.search(r"half[-\s]?life", text, re.I) or \
            not re.search(r"after\s+", text, re.I):
        return _GATE
    ht = re.search(r"half[-\s]?life[^.,;]{0,30}?(?:is|=|of|:)?\s*(?P<t>"
                   + _SCI + r")\s*(?P<tu>s\b|sec\b|seconds?|min\b|minutes?|"
                   r"h\b|hr\b|hours?)", text, re.I)
    at = re.search(r"after\s+(?P<t>" + _SCI + r")\s*(?P<tu>s\b|sec\b|"
                   r"seconds?|min\b|minutes?|h\b|hr\b|hours?|hal(?:ves|"
                   r"lives))", text, re.I)
    if not ht or not at:
        return _GATE

    def sec(u):
        u = u.lower()
        return 3600.0 if u.startswith("h") else \
            1.0 if u.startswith("s") else 60.0
    th = _sci(ht.group("t")) * sec(ht.group("tu"))
    if at.group("tu").lower().startswith("hal"):
        t = float(_sci(at.group("t"))) * th
    else:
        t = _sci(at.group("t")) * sec(at.group("tu"))
    if th <= 0 or t < 0:
        return _GATE
    n_halves = t / th
    frac = 0.5 ** n_halves
    a0m = re.search(r"(?P<a0>" + _SCI + r")\s*(?P<u0>g(?:rams?)?|mol(?:es?)?"
                    r"|M)\b\s+(?:of\s+)?(?P<f0>" + _F_TOKEN + r")", text,
                    re.I)
    if a0m:
        a0 = _sci(a0m.group("a0"))
        left = a0 * frac
        body = (f"amount left = {a0:g} {a0m.group('u0')} x {frac:.6g} = "
                f"{left:.6g} {a0m.group('u0')}")
        interp = (f"{left:.6g} {a0m.group('u0')} of "
                  f"{a0m.group('f0') or 'the reactant'} remains "
                  f"({frac * 100:.4g}%).")
        val, ans = left, (f"{left:.6g} {a0m.group('u0')} left "
                          f"({frac * 100:.4g}%)")
    else:
        body = f"fraction left = (1/2)^{n_halves:.6g} = {frac:.6g}"
        interp = (f"fraction remaining = {frac:.6g} "
                  f"({frac * 100:.4g}% of the initial amount).")
        val, ans = frac, f"fraction = {frac:.6g} ({frac * 100:.4g}%)"
    steps = _beats(
        "first-order decay: each half-life halves the amount, so "
        "remaining = initial x (1/2)^(t / t(1/2))",
        f"t(1/2) = {ht.group('t')} {ht.group('tu')}, t = "
        f"{at.group('t')} {at.group('tu')} -> "
        f"{n_halves:g} half-lives",
        body,
        f"check: after {n_halves:g} more half-lives the fraction would "
        f"halve again to {frac * 0.5:.6g}; (1/2)^({n_halves:g}) x 2 = "
        f"{frac * 2:.6g} = the previous step -- consistent",
        interp)
    return val, steps, ans, None, \
        "remaining = initial x (1/2)^(t / t(1/2))", \
        {"n_halflives": n_halves}


# ---- ISOMER_COUNT_ALKANE --------------------------------------------------- #

def _c_isomers(g, m, text):
    if not re.search(r"isomer", text, re.I):
        return _GATE
    fm = re.search(r"\bC(\d{1,2})H(\d{1,2})\b", text)
    nm = None
    if not fm:
        nm = next((n for n in _ALKANE_NAMES
                   if re.search(r"\b" + n + r"\b", text, re.I)), None)
        if not nm:
            return _GATE
        n = _ALKANE_NAMES.index(nm) + 1
    else:
        n = int(fm.group(1))
    if not (1 <= n <= 10):
        return _GATE
    h = 2 * n + 2
    cnt = _ALKANE_ISOMERS[n]
    label = f"C{n}H{h}" + (f" ({nm})" if nm else "")
    steps = _beats(
        "alkane structural isomers share the formula CnH2n+2 but differ "
        "in carbon skeleton; the counts follow the standard enumeration "
        "(C4:2, C5:3, C6:5, C7:9, C8:18)",
        f"{label}: alkane rule check 2 x {n} + 2 = {h}",
        f"isomers of C{n}H{h} from the standard count: {cnt}",
        f"check: C{n}H{h} satisfies the alkane rule, so the alkane "
        f"enumeration (not alkene/alkyne) applies",
        f"{cnt} structural isomers.")
    return float(cnt), steps, f"{cnt} isomers", None, \
        "standard alkane CnH2n+2 isomer enumeration", {"n_carbons": n}


# ---- HOMOLOG_NEXT ---------------------------------------------------------- #

def _c_homolog(g, m, text):
    if not re.search(r"homolog|next\s+(?:member|higher)", text, re.I):
        return _GATE
    fm = re.search(r"\bC(\d{1,2})H(\d{1,2})\b", text)
    if fm:
        n, h = int(fm.group(1)), int(fm.group(2))
        off = h - 2 * n
        if off not in (2, 0, -2):
            return _GATE        # not a simple hydrocarbon series
        series = {2: "alkane", 0: "alkene", -2: "alkyne"}[off]
        N = n + 1
        H = 2 * N + off
        formula = f"C{N}H{H}"
        steps = _beats(
            "homologous series rule -- consecutive members differ by one "
            f"CH2 (14 u); the {series} formula is C n H 2n{off:+d}",
            f"given member C{n}H{h} ({series}: H - 2 x C = {off:+d})",
            f"n -> {N}; H = 2 x {N}{off:+d} = {H}; next member = "
            f"{formula}",
            f"check: {H} - 2 x {N} = {off:+d} (same series) and "
            f"{formula} - C{n}H{h} = CH2 (14 u)",
            f"next homologue = {formula}.")
        return None, steps, f"next homologue = {formula}", None, \
            "series formula + CH2 increment", {"n_from": n, "n_to": N}
    # named series: alkane list starts at C1 (methane), alkene/alkyne at C2
    for names, off, n0 in ((_ALKANE_NAMES, 2, 1), (_ALKENE_NAMES, 0, 2),
                           (_ALKYNE_NAMES, -2, 2)):
        idx = next((i for i, nm in enumerate(names)
                    if re.search(r"\b" + nm + r"\b", text, re.I)), None)
        if idx is None:
            continue
        n = n0 + idx
        N, H = n + 1, 2 * (n + 1) + off
        formula = f"C{N}H{H}"
        nxt = names[idx + 1] if idx + 1 < len(names) else formula
        steps = _beats(
            "homologous series rule -- consecutive named members differ "
            f"by CH2; the {names[0].rstrip('aneene')}-series formula is "
            f"C n H 2n{off:+d}",
            f"given member {names[idx]} (C{n}H{2 * n + off})",
            f"next member: {n} -> {N} carbons = {nxt} ({formula})",
            f"check: {formula} - C{n}H{2 * n + off} = CH2 (14 u) and the "
            f"series rule holds",
            f"next homologue = {nxt} ({formula}).")
        return None, steps, f"next homologue = {nxt} ({formula})", None, \
            "series formula + CH2 increment", {"n_from": n, "n_to": N}
    return _GATE


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
    steps = _beats(
        "total atoms in one formula unit = sum of the subscript counts "
        "(composition counting)",
        f"{f} = {_composition_str(c)}",
        f"total = {' + '.join(str(n) for n in c.values())} = {total}",
        f"check: re-reading the subscripts of {f} gives the same "
        f"{' + '.join(str(n) for n in c.values())} = {total}",
        f"{total} atoms in one formula unit of {f}.")
    return float(total), steps, f"{total} atoms in one {f}", None, \
        "sum of subscript counts", None


# patch the placeholder row
TABLE = [(fid, rx, _c_atom_count if compute is None else compute)
         for fid, rx, compute in TABLE]


# batch-16 book-grounded rows; scanned BEFORE TABLE (stated-data precedence)
TABLE_BOOKS2 = [
    ("MOLECULAR_FROM_EMPIRICAL", _MOLFROMEMP_RX, _c_mol_from_emp),
    ("EMPIRICAL_FROM_PERCENT", r"%", _c_empirical),
    ("AVG_ATOMIC_MASS", r"average\s+atomic\s+mass|abundance", _c_avg_mass),
    ("CONC_MASS_PERCENT", r"mass\s+(?:percent|percentage)|%\s*w\s*/\s*w",
     _c_mass_percent),
    ("MOLE_FRACTION", r"mole\s+fraction", _c_mole_fraction),
    ("LIMITING_REAGENT", r"limiting|formed|produced|obtained|how\s+much|"
                         r"how\s+many", _c_limiting),
    ("PERCENT_YIELD", r"yield", _c_percent_yield),
    ("MOLALITY_ANY", r"molality", _c_molality),
    ("NORMALITY_ANY", r"normality", _c_normality),
    ("DILUTION_M1V1", r"dilut", _c_dilution),
    ("TITRATION_NORMALITY", r"neutral\w+|titrat", _c_titration),
    ("KP_KC_CONVERT", r"\bK[pc]\b", _c_kp_kc),
    ("OXIDATION_NUMBER", _ON_RX, _c_oxnum),
    ("FARADAY_MASS", r"current|charge|electrolysis|deposit", _c_faraday),
    ("CELL_POTENTIAL", r"cell\s+potential|e\s*m\s*f|e\s*°?\s*\(?\s*cell",
     _c_cell_potential),
    ("RATE_ORDER_FROM_DATA", r"order\s+of\s+(?:the\s+)?reaction|"
                             r"reaction\s+order|rate\s+law", _c_rate_order),
    ("HALF_LIFE_FIRST_ORDER", r"half[-\s]?life", _c_half_life),
    ("REMAINING_AFTER_HALFLIVES", r"half[-\s]?life", _c_decay_fraction),
    ("ISOMER_COUNT_ALKANE", r"isomer", _c_isomers),
    ("HOMOLOG_NEXT", r"homolog|next\s+(?:member|higher)", _c_homolog),
]


def model_chemistry_families(text: str) -> ModelResult:
    """Dispatcher: scan the typed chemistry table, first grounded hit wins.

    Trigger regexes are deterministic; each compute applies its own
    plausibility gates and a gate refusal simply continues the scan.
    Never calls an LLM.
    """
    norm = _normalize(text)
    for fid, pattern, compute in TABLE_BOOKS2 + TABLE:
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
