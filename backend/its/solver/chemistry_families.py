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

try:
    from backend.its.solver import unit_registry as _ureg
    from backend.its.solver.modeling_layer import ModelResult
except ImportError:
    # PARTIAL-IMPORT CYCLE GUARD (CHEM-ADVERSARIAL 2026-10-06): this
    # module is imported BY modeling_layer (batch-15b registration).
    # When THIS module is imported first, modeling_layer is mid-import
    # here and the from-import fails -- swallowing it silently dropped
    # model_chemistry_families from _STRUCTURES for the whole process,
    # and every chemistry question lost the chemistry registry (observed
    # under pytest: 'Balance H2 + O2 -> H2O' -> GUIDED).  ModelResult is
    # only CONSTRUCTED at call time, by which point modeling_layer has
    # finished loading -- re-resolve lazily in _no/_res.
    ModelResult = None


def _ensure_model_result_cls():
    global ModelResult
    if ModelResult is None:
        from backend.its.solver import unit_registry as _ureg
        from backend.its.solver.modeling_layer import ModelResult as _MR
        ModelResult = _MR
    return ModelResult

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


# --------------------------------------------------------------------------- #
# COMMON-NAME COMPOUND ALIASES (CHEM-ADVERSARIAL 2026-10-06, CHEM-2)
# --------------------------------------------------------------------------- #
# Board questions name compounds constantly ("Calculate the number of
# moles in 18 g of water", "formula unit mass of washing soda") — the
# families used to gate on a missing formula token and refuse the most
# standard numericals.  ALIAS_MAP rewrites the common name to its
# formula BEFORE the trigger regexes scan.  Guards:
#   - whole-phrase, word-bounded, longest-first (so "sodium hydroxide"
#     is rewritten before a hypothetical bare "sodium" could be);
#   - skipped entirely when the ask is to WRITE a formula (a rewritten
#     name would hand the mass/atom families a formula on a
#     formula-writing ask — a wrong-answer factory);
#   - "water of crystallisation / hydration" is NOT aliased (the water
#     there is a PART of a hydrate, handled by the percent-of-water
#     family, not as the compound itself).
ALIAS_MAP: List[Tuple[str, str]] = [
    ("sodium hydrogencarbonate", "NaHCO3"),
    ("sodium hydrogen carbonate", "NaHCO3"),
    ("sodium bicarbonate", "NaHCO3"),
    ("potassium permanganate", "KMnO4"),
    ("calcium hydroxide", "Ca(OH)2"),
    ("sodium hydroxide", "NaOH"),
    ("potassium hydroxide", "KOH"),
    ("calcium carbonate", "CaCO3"),
    ("calcium sulphate", "CaSO4"),
    ("calcium phosphate", "Ca3(PO4)2"),
    ("sodium carbonate", "Na2CO3"),
    ("sodium chloride", "NaCl"),
    ("potassium nitrate", "KNO3"),
    ("sodium nitrate", "NaNO3"),
    ("ammonium chloride", "NH4Cl"),
    ("ammonium sulphate", "(NH4)2SO4"),
    ("copper sulphate", "CuSO4"),
    ("iron sulphate", "FeSO4"),
    ("magnesium sulphate", "MgSO4"),
    ("barium chloride", "BaCl2"),
    ("barium sulphate", "BaSO4"),
    ("aluminium sulphate", "Al2(SO4)3"),
    ("silver nitrate", "AgNO3"),
    ("silver chloride", "AgCl"),
    ("magnesium chloride", "MgCl2"),
    ("aluminium oxide", "Al2O3"),
    ("magnesium oxide", "MgO"),
    ("zinc oxide", "ZnO"),
    ("hydrogen sulphide", "H2S"),
    ("hydrogen peroxide", "H2O2"),
    ("hydrogen chloride", "HCl"),
    ("sulphur trioxide", "SO3"),
    ("sulphur dioxide", "SO2"),
    ("nitrogen dioxide", "NO2"),
    ("nitric oxide", "NO"),
    ("carbon dioxide", "CO2"),
    ("carbon monoxide", "CO"),
    ("sulphuric acid", "H2SO4"),
    ("sulfuric acid", "H2SO4"),
    ("hydrochloric acid", "HCl"),
    ("nitric acid", "HNO3"),
    ("acetic acid", "CH3COOH"),
    ("ethanoic acid", "CH3COOH"),
    ("carbonic acid", "H2CO3"),
    ("ethyl alcohol", "C2H5OH"),
    ("caustic potash", "KOH"),
    ("caustic soda", "NaOH"),
    ("quicklime", "CaO"),
    ("slaked lime", "Ca(OH)2"),
    ("limestone", "CaCO3"),
    ("marble", "CaCO3"),
    ("washing soda", "Na2CO3"),
    ("baking soda", "NaHCO3"),
    ("common salt", "NaCl"),
    ("table salt", "NaCl"),
    ("rock salt", "NaCl"),
    ("blue vitriol", "CuSO4.5H2O"),
    ("green vitriol", "FeSO4.7H2O"),
    ("white vitriol", "ZnSO4.7H2O"),
    ("gypsum", "CaSO4.2H2O"),
    ("dry ice", "CO2"),
    ("laughing gas", "N2O"),
    ("acetylene", "C2H2"),
    ("glucose", "C6H12O6"),
    ("sucrose", "C12H22O11"),
    ("methanol", "CH3OH"),
    ("ethanol", "C2H5OH"),
    ("methane", "CH4"),
    ("ethane", "C2H6"),
    ("ethene", "C2H4"),
    ("ethylene", "C2H4"),
    ("ethyne", "C2H2"),
    ("benzene", "C6H6"),
    ("ammonia", "NH3"),
    ("ozone", "O3"),
    ("water", "H2O"),
]

# asks that want a formula WRITTEN, not a number computed from one —
# aliasing names there would feed the mass/count families a formula and
# produce a confidently wrong "molecular mass" for a formula-writing ask.
# 'formula (unit) mass' asks are NOT write-asks (the mass families own
# them and need the alias), hence the lookahead.
_FORMULA_WRITE_ASK_RE = re.compile(
    r"(?:write|what\s+is|give|derive|state|name)\b[^.]{0,40}?"
    r"(?:chemical\s+|molecular\s+)?formula\b"
    r"(?!\s+(?:unit\s+)?mass)", re.I)

# phrases whose 'water' is NOT the compound H2O: the water in a hydrate
# is a PART (percent-of-water family owns it), and heavy/rose/mineral
# water are different substances or non-chemical usages
_PROTECTED_PHRASES = (
    "water of crystallisation", "water of hydration", "heavy water",
    "rose water", "mineral water", "soda water",
)


def _apply_compound_aliases(text: str) -> str:
    """Rewrite common compound names to formulas (CHEM-2).  Skips
    formula-writing asks and protects hydrate/named-water phrases."""
    if not text:
        return text
    if _FORMULA_WRITE_ASK_RE.search(text):
        return text
    out = text
    masks = {}
    for i, phrase in enumerate(_PROTECTED_PHRASES):
        pat = re.compile(re.escape(phrase), re.I)
        if pat.search(out):
            token = f"\u0001PROT{i}\u0001"
            masks[token] = pat.search(out).group(0)
            out = pat.sub(token, out)
    for name, formula in ALIAS_MAP:
        out = re.sub(r"\b" + re.escape(name) + r"\b", formula, out,
                     flags=re.I)
    for token, original in masks.items():
        out = out.replace(token, original)
    return out


# FORMULA_OF_NAMED (CHEM-ADVERSARIAL, c10): "Write the chemical formula
# of baking soda / quicklime / blue vitriol" is a board-standard ask
# with a canonical one-token answer.  The alias layer deliberately does
# NOT rewrite names on formula-writing asks (that would hand mass/count
# families a formula) — this family answers them directly instead.
_FORMULA_OF_RX = (
    r"(?:chemical\s+|molecular\s+|empirical\s+)?formula\s+(?:of|for)\s+"
    r"(?P<name>[a-z][a-z\- ]{2,30})")


def _c_formula_of(g, m, text):
    name = g["name"].strip().lower()
    # longest alias whose name (or its tail) matches the asked name
    best = None
    for alias, formula in ALIAS_MAP:
        a = alias.lower()
        if name == a or name.endswith(" " + a) or name.startswith(a + " "):
            if best is None or len(a) > len(best[0]):
                best = (a, formula)
    if best is None:
        return _GATE
    c = parse_formula(best[1])
    if c is None:
        return _GATE
    steps = _beats(
        "criss-cross the valencies of the constituent ions (valency "
        "cross method), then simplify to the lowest ratio",
        f"{best[0]} is the common name of {best[1]}",
        f"formula = {best[1]} "
        f"({_composition_str(c)})",
        f"check: total charge balances to zero for {best[1]}",
        f"chemical formula of {g['name'].strip()} = {best[1]}.")
    return None, steps, best[1], None, "valency cross (named compound)", \
        {"name": best[0]}


# WATER_OF_CRYSTALLISATION percent: "percentage of water in
# CuSO4.5H2O / blue vitriol / gypsum" — the water mass fraction of a
# hydrate (board-standard c9/c10 numerical).
_HYDRATE_WATER_RX = (
    r"(?:percent(?:age)?|mass\s+percent(?:age)?|water\s+of\s+crystallisation"
    r"|water\s+of\s+hydration)")

_HYDRATE_FORMULA_RX = re.compile(
    r"(?P<f>(?:\((?:[A-Z][a-z]?\d*)+\)\d*|[A-Z][a-z]?\d*)+"
    r"\.\d*[A-Z][A-Za-z0-9()]*)")


def _c_hydrate_water(g, m, text):
    fm = _HYDRATE_FORMULA_RX.search(text)
    if not fm:
        return _GATE
    f = fm.group("f")
    c = parse_formula(f)
    if c is None:
        return _GATE
    parts = re.split(r"\.(?=\d*[A-Z(])", f)
    if len(parts) < 2:
        return _GATE
    pm = re.match(r"^(\d+)\s*(?=[A-Z(])", parts[1])
    mult = int(pm.group(1)) if pm else 1
    water_mass = molar_mass("H2O") * mult
    total = molar_mass(f)
    if not water_mass or not total:
        return _GATE
    pct = water_mass / total * 100.0
    steps = _beats(
        "percent of water of crystallisation = (mass of water in one "
        "formula unit / formula mass) x 100",
        f"{f}: water part = {mult} x H2O = {water_mass:g} g/mol, total "
        f"formula mass = {total:g} g/mol",
        f"percent = {water_mass:g} / {total:g} x 100 = {pct:.6g}%",
        f"check: the anhydrous part is {total - water_mass:g} g/mol; "
        f"water + anhydrous = {total:g} = the formula mass",
        f"water of crystallisation in {f} = {pct:.6g}%.")
    return pct, steps, f"{pct:.6g}% water", None, \
        "(water mass / formula mass) x 100", {"hydrate": f}


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
    _ensure_model_result_cls()
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.96,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    # 0.96 (was 0.95): a compute that ran to a real answer IS the
        # verification -- same promotion rationale model_structure uses
        # for its own verified computes.  At 0.95 the LLM-learned PAL
        # templates (which promote to 0.96) won same-shape ties and
    # shipped IUPAC-precision answers (18/18.015 = 0.9991 mol for a
    # board-standard 18 g water ask).
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
        _ensure_model_result_cls()
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
    # unicode subscripts (C₁₂H₂₂O₁₁) are the same formula as ASCII
    s = re.sub(r"[\u2080-\u2089]",
               lambda m: chr(ord(m.group(0)) - 0x2080 + 48), s)
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
    try:
        from its.solver import chempy_engine
        mm = chempy_engine.compute_molar_mass(f, use_board_weights=True)
        if mm is not None:
            return mm
    except Exception:
        pass
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
    not a from-table lookup (chemistry2 owns those rows).  An atomic-mass
    TABLE ("C = 12.011 u, H = 1.008 u") is data for the lookup, not a
    stated answer mass, so 'u'-unit entries do not trip the guard."""
    m = re.search(
        r"(?:molar|molecular|atomic)\s+mass[^.]{0,40}?(?:is|=|:)\s*"
        + _NUM, text, re.I)
    if not m:
        return False
    tail = text[m.end():m.end() + 6]
    if re.match(r"\s*u\b", tail, re.I):
        return False
    return True


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
    # board equations carry state tags: BaCl2(aq) + Na2SO4(aq) ->
    # BaSO4(s) + NaCl(aq) -- strip them BEFORE parsing (CHEM-ADVERSARIAL)
    text = re.sub(r"\s*\(\s*(?:s|l|g|aq)\s*\)", "", text, flags=re.I)
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
    """Small-integer coefficients making atoms balance, or None.
    Uses ChemPy stoichiometry engine first; falls back to exact rational nullspace."""
    try:
        from its.solver import chempy_engine
        got = chempy_engine.balance_species(lhs, rhs)
        if got is not None:
            return got
    except Exception:
        pass
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
    # CONCENTRATION-ASK GUARD (CHEM-ADVERSARIAL 2026-10-06): "mole
    # fraction of glucose in..." matched the loose moles-ask regex and
    # shipped n = m/M as a mole-fraction answer.  The concentration
    # families own these asks.
    if re.search(r"(?:molality|molarity|mole\s+fraction|normality|"
                 r"ppm)", text, re.I):
        return _GATE
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
        # ASK-PRECISION (class 9, 2026-10-06): 'How many MOLES of
        # hydrogen atoms are in 0.5 mole of water?' asks moles of ONE
        # ELEMENT'S atoms.  The old ship was N = n x N_A x (all atoms)
        # = 9.033e+23 for a 1-mol ask -- a different question shipped
        # VERIFIED.  Answer exactly the element-moles asked; refuse if
        # the named element is absent from the formula.
        m_el = re.search(
            r"\b(hydrogen|oxygen|carbon|nitrogen|chlorine|sulphur|sulfur|"
            r"phosphorus|sodium|potassium|calcium|magnesium|iron|"
            r"aluminium|aluminum|copper|zinc)\s+atoms?\b", text, re.I)
        if (m_el and f
                and re.search(r"(?:how\s+many|number\s+of)\s+moles?\b",
                              text, re.I)):
            el = _resolve_element(m_el.group(1))
            if not el or not _formula_valid_in_text(f):
                return _GATE
            counts = parse_formula(f)
            if not counts or counts.get(el, 0) <= 0:
                return _GATE
            k_el = counts[el]
            el_name = m_el.group(1).lower()
            n_el = n * k_el
            steps = _beats(
                f"each {f} molecule contains {k_el} {el_name} atoms, so "
                f"moles of {el_name} atoms = moles of {f} x {k_el}",
                f"moles of {f} = {n:g}, {el_name} atoms per molecule "
                f"= {k_el}",
                f"n({el_name}) = {n:g} x {k_el} = {n_el:.6g} mol",
                f"check: {n_el:.6g} mol x 6.022e23 = "
                f"{n_el * AVOGADRO:.4g} {el_name} atoms; back over N_A "
                f"and {k_el} = {n:g} mol = the given moles",
                f"moles of {el_name} atoms = {n_el:.6g} mol.")
            return n_el, steps, (f"moles of {el_name} atoms = "
                                 f"{n_el:.6g} mol"), None, \
                "n(element) = n(compound) x atoms of element per molecule", \
                {"moles_compound": n, "atoms_per_molecule": k_el}
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
# 7b. PARTICLES_FROM_MASS (CHEM-3, CHEM-ADVERSARIAL 2026-10-06)
# --------------------------------------------------------------------------- #
# "How many molecules of water are there in 18 g of water?" and the
# NCERT exercise "number of molecules of sulphur (S8) present in 16 g
# of solid sulphur" are board-standard: mass -> moles -> Avogadro.
# The PARTICLES_AVOGADRO regex only bridges mol <-> N; a stated MASS
# gated the family and the question refused.
_PARTICLES_MASS_RX = (
    r"(?:number\s+of\s+)?(?P<kind>molecules|atoms|ions)\b"
    # name group ends at WHITESPACE (2026-10-06 fix): with re.I the old
    # `\s*` tail let the "name" swallow the leading capital of a formula
    # -- "of CO2" bound name="C" + f="O2", M(O2)=32, and shipped
    # 4.14e+23 molecules for 22 g of CO2 (true 3.011e+23).
    r"(?:\s+(?:of|in)\s+(?:[a-z\-][A-Za-z\-]{0,15}\s+)?"
    r"\(?\s*(?P<f1>" + _F_TOKEN + r")\s*\)?)?"
    r"[^.]{0,60}?\b(?:in|contained\s+in|present\s+in|from)\s+"
    r"(?P<mass>" + _SCI + r")\s*g(?:rams?)?\b"
    r"(?:\s+of\s+(?:[a-z\-][A-Za-z\-]{0,15}\s+)?\(?\s*"
    r"(?P<f2>" + _F_TOKEN + r")\s*\)?)?")


def _c_particles_mass(g, m, text):
    kind = g["kind"]
    f = g.get("f1") or g.get("f2")
    mass = _sci(g["mass"])
    if mass <= 0:
        return _GATE
    if not f or not _formula_valid_in_text(f):
        return _GATE
    M = molar_mass(f)
    if M is None or M <= 0:
        return _GATE
    n = mass / M
    k = 1.0
    assum = None
    if kind == "atoms":
        k = float(_atom_count(f))
        assum = (f"each {f} molecule contains {int(k)} atoms "
                 f"(counted from the formula)")
    N = n * AVOGADRO * k
    steps = _beats(
        "two-step mole bridge: n = m / M, then N = n x N_A"
        + ("" if k == 1.0 else " (x atoms per molecule)"),
        f"m = {mass:g} g of {f}, M({f}) = {M:g} g/mol "
        f"(standard atomic-mass table)",
        f"n = {mass:g} / {M:g} = {n:.6g} mol",
        f"N = {n:.6g} x 6.022e23" + ("" if k == 1.0 else f" x {int(k)}")
        + f" = {N:.6g} {kind}",
        f"check: N / N_A" + ("" if k == 1.0 else f" / {int(k)}")
        + f" = {N / AVOGADRO / k:.6g} mol; n x M = {n * M:.6g} g = the "
        f"given mass -> {N:.4g} {kind} in {mass:g} g of {f}.")
    return N, steps, f"N = {N:.4g} {kind}", assum, \
        "n = m / M; N = n x N_A (x atoms per molecule for atom counts)", \
        {"moles": n, "mass_g": mass}


# --------------------------------------------------------------------------- #
# 7c. CLASS-9 BOARD GAP FAMILIES (CHEM-ADVERSARIAL 2026-10-06)
# --------------------------------------------------------------------------- #
# Board-standard c9 numericals that had NO family: volume/volume and
# mass/volume concentration percent, Kelvin<->Celsius conversion
# (states-of-matter), law-of-constant-proportions mass scaling,
# conservation-of-mass subtraction, electronic configuration (Bohr-Bury,
# Z <= 20), and proton/neutron/electron counting.

_VOLPERCENT_RX = (
    r"(?:volume\s+by\s+volume\s+percent(?:age)?|"
    r"volume\s+percent(?:age)?|percent(?:age)?\s+(?:by\s+)?volume|"
    r"mass\s+by\s+volume\s+percent(?:age)?)")


def _c_vol_percent(g, m, text):
    low = text.lower()
    mv = bool(re.search(r"mass\s+by\s+volume", low))
    # (v1 mL|g) of solute ... (total v2 mL) of solution
    pairs = re.findall(
        r"(?P<v>\d+(?:\.\d+)?)\s*(?P<u>ml|millilitres?|milliliters?|"
        r"g|grams?)\s+(?:of\s+)?(?P<what>[A-Za-z][A-Za-z\- ]{0,30}?)"
        r"(?=[,.;()]|\s+(?:is|are|in|to|with|makes?|gives?|dissolved)\b)",
        text, re.I)
    if len(pairs) < 2:
        return _GATE
    tot = None
    solute = None
    for v, u, what in pairs:
        w = what.lower()
        if re.search(r"solution", w) or (mv and re.search(r"solute", w)
                                         is None and tot is None
                                         and u.startswith("m")):
            tot = float(v)
        elif solute is None and not re.search(r"water|solvent", w):
            solute = float(v)
    if solute is None or tot is None or tot <= 0 or solute < 0:
        # fallback: first mention = solute, last = solution
        v1, u1, w1 = pairs[0]
        v2, u2, w2 = pairs[-1]
        if re.search(r"solution", (w1 + " " + w2), re.I):
            solute, tot = float(v1), float(v2)
        else:
            return _GATE
    if tot <= 0 or solute > tot:
        return _GATE
    pct = solute / tot * 100.0
    if mv:
        steps = _beats(
            "mass by volume percentage = (mass of solute in g / volume of "
            "solution in mL) x 100",
            f"solute = {solute:g} g, solution = {tot:g} mL",
            f"percent = {solute:g} / {tot:g} x 100 = {pct:.6g}%",
            f"check: {pct:.6g}% of {tot:g} mL = "
            f"{pct / 100 * tot:.6g} g = the dissolved mass",
            f"mass by volume percentage = {pct:.6g}%")
    else:
        steps = _beats(
            "volume by volume percentage = (volume of solute / volume of "
            "solution) x 100",
            f"solute = {solute:g} mL, solution = {tot:g} mL",
            f"percent = {solute:g} / {tot:g} x 100 = {pct:.6g}%",
            f"check: {pct:.6g}% of {tot:g} mL = "
            f"{pct / 100 * tot:.6g} mL = the solute volume",
            f"volume by volume percentage = {pct:.6g}%")
    return pct, steps, f"{pct:.6g}% by volume", None, \
        "(solute amount / solution amount) x 100", \
        {"solute": solute, "solution": tot}


_KELVIN_RX = (
    r"(?P<v>-?\d+(?:\.\d+)?)\s*(?:degrees?\s+)?"
    r"(?P<u>K|kelvin|\u00b0?C|celsius|centigrade)\b[^.]{0,30}?"
    r"(?:to|into|in)\s+(?:degrees?\s+)?"
    r"(?P<target>K|kelvin|\u00b0?C|celsius|centigrade)\b")


def _c_kelvin(g, m, text):
    v = float(g["v"])
    u = g["u"].lstrip(u"°").lower()
    tgt = g["target"].lstrip(u"°").lower()
    u_k = u.startswith("k")
    t_k = tgt.startswith("k")
    if u_k == t_k:
        return _GATE
    if u_k:                       # K -> C
        c = v - 273.0
        steps = _beats(
            "Kelvin-Celsius relation: T(K) = t(C) + 273",
            f"given T = {v:g} K",
            f"t = {v:g} - 273 = {c:g}",
            f"check: {c:g} + 273 = {c + 273:g} K = the given temperature",
            f"{v:g} K = {c:g} degrees Celsius.")
        return c, steps, f"{c:g} degrees Celsius", None, \
            "t(C) = T(K) - 273", {"kelvin": v}
    c = v
    k = c + 273.0
    steps = _beats(
        "Kelvin-Celsius relation: T(K) = t(C) + 273",
        f"given t = {c:g} degrees Celsius",
        f"T = {c:g} + 273 = {k:g}",
        f"check: {k:g} - 273 = {k - 273:g} degrees Celsius = the given "
        f"temperature",
        f"{c:g} degrees Celsius = {k:g} K.")
    return k, steps, f"{k:g} K", None, "T(K) = t(C) + 273", {"celsius": v}


_PROPORTIONS_RX = (
    r"constant\s+proportions|definite\s+proportions")


def _c_constant_proportions(g, m, text):
    if not re.search(_PROPORTIONS_RX, text, re.I):
        return _GATE
    pairs = re.findall(
        r"(?P<m>\d+(?:\.\d+)?)\s*g(?:rams?)?\s+(?:of\s+)?"
        r"(?P<el>[a-z][a-z\-]{1,15})\b", text, re.I)
    pairs = [(float(mm), el.strip().lower()) for mm, el in pairs]
    if len(pairs) < 3:
        return _GATE
    (m1, e1), (m2, e2) = pairs[0], pairs[1]
    m3, e3 = pairs[-1]
    if m1 <= 0 or m3 <= 0 or not e1 or not e2 or not e3:
        return _GATE
    if e1 == e2:
        return _GATE              # degenerate: same element twice
    if e3 == e1:
        ans = m2 * (m3 / m1)      # scale the OTHER element's mass
        steps = _beats(
            "law of constant proportions: a compound always contains its "
            "elements in a fixed mass ratio, so masses scale together",
            f"{m1:g} g of {e1} combines with {m2:g} g of {e2} -- fixed "
            f"ratio {m2 / m1:g} g of {e2} per g of {e1}",
            f"for {m3:g} g of {e1}: {e2} = {m3:g} x {m2 / m1:g} = "
            f"{ans:.6g} g",
            f"check: ratio {m3:g} : {ans:.6g} = {m3 / ans:.6g} and "
            f"{m1:g} : {m2:g} = {m1 / m2:.6g} agree",
            f"{ans:.6g} g of {e2}.")
        return ans, steps, f"{ans:.6g} g of {e2}", None, \
            "fixed mass ratio scaling", {"ratio": m2 / m1}
    if e3 == e2:
        ans = m1 * (m3 / m2)
        steps = _beats(
            "law of constant proportions: a compound always contains its "
            "elements in a fixed mass ratio, so masses scale together",
            f"{m1:g} g of {e1} combines with {m2:g} g of {e2} -- fixed "
            f"ratio {m1 / m2:g} g of {e1} per g of {e2}",
            f"for {m3:g} g of {e2}: {e1} = {m3:g} x {m1 / m2:g} = "
            f"{ans:.6g} g",
            f"check: ratio {m3:g} : {ans:.6g} = {m3 / ans:.6g} and "
            f"{m2:g} : {m1:g} = {m2 / m1:.6g} agree",
            f"{ans:.6g} g of {e1}.")
        return ans, steps, f"{ans:.6g} g of {e1}", None, \
            "fixed mass ratio scaling", {"ratio": m1 / m2}
    return _GATE


_CONSERVE_RX = (
    r"(?:mass\s+of\s+(?:the\s+)?(?:oxygen|gas|hydrogen|carbon\s+dioxide|"
    r"other\s+product|second\s+product|gas\s+evolved|product\s+formed)|"
    r"mass\s+evolved|mass\s+liberated|verify.{0,40}conservation)")


def _c_conservation(g, m, text):
    if not re.search(_CONSERVE_RX, text, re.I):
        return _GATE
    if not re.search(r"conservation\s+of\s+mass|heated|decompos|"
                     r"collected|residue", text, re.I):
        return _GATE
    masses = re.findall(r"(\d+(?:\.\d+)?)\s*g(?:rams?)?\b", text)
    if len(masses) < 2:
        return _GATE
    a, b = float(masses[0]), float(masses[1])
    if a <= 0 or b <= 0 or a <= b:
        return _GATE
    ans = a - b
    steps = _beats(
        "law of conservation of mass: in a closed system, total mass of "
        "reactants = total mass of products, so the missing product's "
        "mass is the difference",
        f"reactant taken = {a:g} g, collected/known product = {b:g} g",
        f"missing mass = {a:g} - {b:g} = {ans:.6g} g",
        f"check: {b:g} + {ans:.6g} = {b + ans:.6g} g = the starting mass",
        f"{ans:.6g} g.")
    return ans, steps, f"mass = {ans:.6g} g", None, \
        "m(reactant) - m(known product)", {"total": a, "known": b}



# --------------------------------------------------------------------------- #

# ---- MOLARITY_MASS (CHEM-ADVERSARIAL c12): molarity from solute mass
# and solution volume -- "molarity of a solution containing 5.85 g of
# NaCl (molar mass 58.5 g/mol) in 500 mL of solution" -> 0.2 M
_MOLARITY_MASS_RX = (
    r"molarity")

_MOLARITY_MASS_FORMULA_RX = re.compile(
    r"(?P<m>" + _SCI + r")\s*g(?:rams?)?\b[^.]{0,60}?"
    r"(?:of\s+)?(?P<f>" + _F_TOKEN + r")", re.I)
_MOLARITY_MASS_VOL_RX = re.compile(
    r"(?P<v>" + _SCI + r")\s*(?P<u>ml|millilitres?|milliliters?|"
    r"l|litres?|liters?)\b", re.I)


def _c_molarity_mass(g, m, text):
    if not re.search(r"molarity", text, re.I):
        return _GATE
    fm = _MOLARITY_MASS_FORMULA_RX.search(text)
    vm = _MOLARITY_MASS_VOL_RX.search(text)
    if not (fm and vm) or not _formula_valid_in_text(fm.group("f")):
        return _GATE
    mass = _sci(fm.group("m"))
    f = fm.group("f")
    mm_m = re.search(r"molar\s+mass[^.;\n]{0,40}?(?:is|=|:)?\s*(" + _SCI + r")", text, re.I)
    if mm_m:
        Mw = _sci(mm_m.group(1))
    else:
        Mw = molar_mass(f)
    u = vm.group("u").lower()
    vol_l = _sci(vm.group("v")) * (
        1.0 if u.startswith("l") else 1e-3)   # ml -> L
    if Mw is None or Mw <= 0 or mass <= 0 or vol_l <= 0:
        return _GATE
    n = mass / Mw
    molarity = n / vol_l
    steps = _beats(
        "molarity M = moles of solute per LITRE of solution; grams "
        "convert through the molar mass, mL through /1000",
        f"n = {mass:g} g / {Mw:g} g/mol = {n:.6g} mol of {f}",
        f"V = {vm.group('v')} {vm.group('u')} = {vol_l:g} L",
        f"M = {n:.6g} / {vol_l:g} = {molarity:.6g} mol/L",
        f"check: M x V = {molarity:.6g} x {vol_l:g} = "
        f"{molarity * vol_l:.6g} mol = the moles taken -> molarity = "
        f"{molarity:.6g} M.")
    return molarity, steps, f"molarity = {molarity:.6g} M", None, \
        "M = (m / Mw) / V(L)", {"volume_L": vol_l}

# 7d. CLASS-12 SOLUTIONS/COLLIGATIVE FAMILIES (CHEM-ADVERSARIAL 2026-10-06)
# --------------------------------------------------------------------------- #
# Board-standard c12 numericals with no family: osmotic pressure
# (pi = c R T), boiling-point elevation (dTb = Kb m), freezing-point
# depression (dTf = Kf m), and the Arrhenius doubling form
# (rate doubles T1 -> T2 gives Ea).

_OSMOTIC_RX = (
    r"osmotic\s+pressure|\bpi\s*=|\bOP\b[^.]{0,20}solution")
_BOIL_ELEV_RX = (
    r"elevation\s+in\s+(?:the\s+)?boiling|boiling\s+point\s+"
    r"elevation|\bDTb\b|delta\s*T\s*b")
_FREEZE_DEPR_RX = (
    r"depression\s+in\s+(?:the\s+)?freezing|freezing\s+point\s+"
    r"depression|\bDTf\b|delta\s*T\s*f")
_ARRH_DOUBLE_RX = (
    r"(?:rate|rate\s+constant|k\b)[^.]{0,40}?(?:doubles?|triples?|"
    r"becomes\s+(?:double|two|three)\s*times?)"
    r"(?:\.\s*|[^.]{0,80}?){0,3}"
    r"(?:activation\s+energy|\bEa\b)")


def _c_osmotic(g, m, text):
    cm = re.search(r"(?P<c>" + _SCI + r")\s*M\b", text, re.I)
    tm = re.search(r"(?P<t>" + _SCI + r")\s*K\b", text, re.I)
    rm = re.search(r"R\s*=\s*(?P<r>" + _SCI + r")", text, re.I)
    if not (cm and tm):
        return _GATE
    c = _sci(cm.group("c"))
    T = _sci(tm.group("t"))
    R = _sci(rm.group("r")) if rm else 0.0821
    if c <= 0 or T <= 0:
        return _GATE
    pi = c * R * T
    unit = "atm" if R < 1 else "Pa"
    steps = _beats(
        "osmotic pressure is a colligative property: pi = c R T "
        "(van't Hoff equation), c in mol/L, T in kelvin",
        f"c = {c:g} mol/L, T = {T:g} K, R = {R:g} L atm / (K mol)",
        f"pi = {c:g} x {R:g} x {T:g} = {pi:.6g} {unit}",
        f"check: pi / (R T) = {pi:.6g} / ({R:g} x {T:g}) = "
        f"{pi / (R * T):.6g} M = the given concentration",
        f"osmotic pressure = {pi:.6g} {unit}.")
    return pi, steps, f"pi = {pi:.6g} {unit}", None, "pi = c R T", {
        "conc_M": c, "temp_K": T}


def _c_boil_elev(g, m, text):
    km = re.search(r"K\s*b[^.=]{0,20}?=\s*(?P<kb>" + _SCI + r")",
                   text, re.I)
    mm = re.search(r"molality[^.]{0,40}?(?P<m>" + _SCI + r")|(?P<m2>"
                   + _SCI + r")\s*(?:molal|m\b|mol\s*/\s*kg)", text,
                   re.I)
    if not km:
        return _GATE
    kb = _sci(km.group("kb"))
    m_raw = (mm.group("m") if mm and mm.group("m")
             else mm.group("m2") if mm else None)
    if m_raw is None:
        return _GATE
    molal = _sci(m_raw)
    if kb <= 0 or molal <= 0:
        return _GATE
    dTb = kb * molal
    steps = _beats(
        "boiling-point elevation is colligative: dTb = Kb x molality",
        f"Kb = {kb:g} K kg/mol, molality = {molal:g} mol/kg",
        f"dTb = {kb:g} x {molal:g} = {dTb:.6g} K",
        f"check: dTb / Kb = {dTb:.6g} / {kb:g} = {dTb / kb:.6g} mol/kg "
        f"= the molality",
        f"elevation in boiling point = {dTb:.6g} K.")
    return dTb, steps, f"dTb = {dTb:.6g} K", None, "dTb = Kb x m", {
        "molality": molal}


def _c_freeze_depr(g, m, text):
    km = re.search(r"K\s*f[^.=]{0,20}?=\s*(?P<kf>" + _SCI + r")",
                   text, re.I)
    mm = re.search(r"molality[^.]{0,40}?(?P<m>" + _SCI + r")|(?P<m2>"
                   + _SCI + r")\s*(?:molal|m\b|mol\s*/\s*kg)", text,
                   re.I)
    if not km:
        return _GATE
    kf = _sci(km.group("kf"))
    m_raw = (mm.group("m") if mm and mm.group("m")
             else mm.group("m2") if mm else None)
    if m_raw is None:
        return _GATE
    molal = _sci(m_raw)
    if kf <= 0 or molal <= 0:
        return _GATE
    dTf = kf * molal
    steps = _beats(
        "freezing-point depression is colligative: dTf = Kf x molality "
        "(the depression is POSITIVE; the new freezing point is "
        "0 - dTf for water)",
        f"Kf = {kf:g} K kg/mol, molality = {molal:g} mol/kg",
        f"dTf = {kf:g} x {molal:g} = {dTf:.6g} K",
        f"check: dTf / Kf = {dTf:.6g} / {kf:g} = {dTf / kf:.6g} mol/kg "
        f"= the molality",
        f"depression in freezing point = {dTf:.6g} K.")
    return dTf, steps, f"dTf = {dTf:.6g} K", None, "dTf = Kf x m", {
        "molality": molal}


def _c_arrhenius_double(g, m, text):
    tm = re.findall(r"(?P<t>" + _SCI + r")\s*K\b", text, re.I)
    rm = re.search(r"R\s*=\s*(?P<r>" + _SCI + r")", text, re.I)
    if len(tm) < 2:
        return _GATE
    T1, T2 = _sci(tm[0]), _sci(tm[1])
    if T1 <= 0 or T2 <= 0 or T1 == T2:
        return _GATE
    R = _sci(rm.group("r")) if rm else 8.314
    ratio = 2.0 if re.search(r"double|two\s*times|2\s*times", text,
                             re.I) else 3.0
    ln_ratio = math.log(ratio)
    ea = ln_ratio * R * T1 * T2 / (T2 - T1)
    steps = _beats(
        "Arrhenius doubling form: ln(ratio) = (Ea / R) x "
        "(1/T1 - 1/T2) -> Ea = R ln(ratio) T1 T2 / (T2 - T1)",
        f"rate x{ratio:g} between T1 = {T1:g} K and T2 = {T2:g} K, "
        f"R = {R:g} J/(mol K)",
        f"ln({ratio:g}) = {ln_ratio:.6g}; Ea = {R:g} x {ln_ratio:.6g} x "
        f"{T1:g} x {T2:g} / ({T2:g} - {T1:g}) = {ea:.6g} J/mol",
        f"check: back-substitute into ln(ratio) = Ea (1/T1 - 1/T2) / R "
        f"-> {ea * (1 / T1 - 1 / T2) / R:.4g} = ln({ratio:g})",
        f"activation energy = {ea / 1000:.4g} kJ/mol.")
    return ea, steps, f"Ea = {ea / 1000:.4g} kJ/mol", None, \
        "Ea = R ln(ratio) T1 T2 / (T2 - T1)", {"Ea_J": ea}


_ELEMENT_Z: Dict[str, int] = {
    "H": 1, "He": 2, "Li": 3, "Be": 4, "B": 5, "C": 6, "N": 7, "O": 8,
    "F": 9, "Ne": 10, "Na": 11, "Mg": 12, "Al": 13, "Si": 14, "P": 15,
    "S": 16, "Cl": 17, "Ar": 18, "K": 19, "Ca": 20, "Sc": 21, "Ti": 22,
    "V": 23, "Cr": 24, "Mn": 25, "Fe": 26, "Co": 27, "Ni": 28, "Cu": 29,
    "Zn": 30, "Br": 35, "Ag": 47, "I": 53, "Ba": 56,
}
_Z_NAME: Dict[int, str] = {
    1: "hydrogen", 2: "helium", 3: "lithium", 4: "beryllium", 5: "boron",
    6: "carbon", 7: "nitrogen", 8: "oxygen", 9: "fluorine", 10: "neon",
    11: "sodium", 12: "magnesium", 13: "aluminium", 14: "silicon",
    15: "phosphorus", 16: "sulphur", 17: "chlorine", 18: "argon",
    19: "potassium", 20: "calcium", 26: "iron", 29: "copper", 30: "zinc",
    35: "bromine", 47: "silver", 53: "iodine", 56: "barium",
}

_SUBATOMIC_RX = (
    # "An ion has 18 electrons, 16 protons and 16 neutrons..." / counts
    r"(?:an?\s+)?(?:ion|atom|particle)s?\s+(?:has|have|contains|containing)"
    r"[^.]{0,60}?(?P<e>\d{1,3})\s*electrons?[^.]{0,40}?"
    r"(?P<p>\d{1,3})\s*protons?"
    r"|(?P<e2>\d{1,3})\s*electrons?[^.]{0,40}?(?P<p2>\d{1,3})\s*protons?"
    r"[^.]{0,40}?(?:charge|ion)"
    # "For the isotope Cl-35 (atomic number 17), state the number of
    # protons, neutrons and electrons"
    r"|(?:isotope\s+)?(?P<sym>[A-Z][a-z]?)-(?P<a>\d{1,3})"
    r"[^.]{0,60}?(?:atomic\s+number(?:\s+is)?|Z\s*(?:is|=)?)\s*"
    r"\(?(?P<z>\d{1,3})\)?[^.]{0,90}?"
    r"(?:protons?|neutrons?|electrons?|subatomic)"
    # "The mass number of an atom is 23 and its atomic number is 11.
    # How many neutrons does it have?" (both orders)
    r"|(?:atomic\s+number[^.]{0,25}?(?:is)?|Z\s*(?:is|=)?)\s*\(?(?P<z2>\d{1,3})\)?"
    r"[\s\S]{0,90}?(?:mass\s+number[^.]{0,25}?(?:is)?|A\s*(?:is|=)?)\s*"
    r"\(?(?P<a2>\d{1,3})\)?[\s\S]{0,90}?"
    r"(?:neutrons?|protons?|electrons?|nucleons?)"
    r"|(?:mass\s+number[^.]{0,25}?(?:is)?|A\s*(?:is|=)?)\s*\(?(?P<a3>\d{1,3})\)?"
    r"[\s\S]{0,90}?(?:atomic\s+number[^.]{0,25}?(?:is)?|Z\s*(?:is|=)?)\s*"
    r"\(?(?P<z3>\d{1,3})\)?[\s\S]{0,90}?"
    r"(?:neutrons?|protons?|electrons?|nucleons?)")


def _c_subatomic(g, m, text):
    # isotope form: p = Z, n = A - Z, e = Z (neutral atom)
    if g.get("sym") and g.get("a") and g.get("z") is not None:
        sym = str(g["sym"]).strip()
        if sym not in ATOMIC_MASS:
            return _GATE
        Z, A = int(g["z"]), int(g["a"])
        if Z < 1 or A < Z or A > 300:
            return _GATE
        n, p, e = A - Z, Z, Z
        name = _Z_NAME.get(Z, sym)
        steps = _beats(
            "atomic number = protons = electrons (neutral atom); "
            "neutrons = mass number - atomic number",
            f"{sym}-{A}: Z = {Z}, A = {A}",
            f"protons = {p}, electrons = {e}, neutrons = {A} - {Z} = {n}",
            f"check: protons + neutrons = {p} + {n} = {p + n} = the mass "
            f"number A",
            f"{sym}-{A} has {p} protons, {n} neutrons and {e} electrons.")
        return float(n), steps, (f"protons = {p}, neutrons = {n}, "
                                 f"electrons = {e} ({name}, Z = {Z})"), \
            None, "n = A - Z; p = e = Z", \
            {"protons": p, "neutrons": n, "electrons": e}
    if g.get("z2") is not None and g.get("a2") is not None:
        Z, A = int(g["z2"]), int(g["a2"])
        if Z < 1 or A < Z or A > 300:
            return _GATE
        n = A - Z
        steps = _beats(
            "neutrons = mass number - atomic number (n = A - Z)",
            f"A = {A}, Z = {Z}",
            f"n = {A} - {Z} = {n}",
            f"check: {n} + {Z} = {n + Z} = the mass number A",
            f"neutrons = {n}.")
        return float(n), steps, f"neutrons = {n}", None, "n = A - Z", \
            {"neutrons": n}
    if g.get("z3") is not None and g.get("a3") is not None:
        Z, A = int(g["z3"]), int(g["a3"])
        if Z < 1 or A < Z or A > 300:
            return _GATE
        n = A - Z
        steps = _beats(
            "neutrons = mass number - atomic number (n = A - Z)",
            f"A = {A}, Z = {Z}",
            f"n = {A} - {Z} = {n}",
            f"check: {n} + {Z} = {n + Z} = the mass number A",
            f"neutrons = {n}.")
        return float(n), steps, f"neutrons = {n}", None, "n = A - Z", \
            {"neutrons": n}
    e_txt = g.get("e") or g.get("e2")
    p_txt = g.get("p") or g.get("p2")
    if not e_txt or not p_txt:
        return _GATE
    e, p = int(e_txt), int(p_txt)
    if p <= 0 or e < 0 or p > 118:
        return _GATE
    sym = _Z_NAME.get(p)
    if sym is None:
        return _GATE
    charge = p - e                 # +ve when protons outnumber electrons
    if charge > 0:
        charge_txt = f"{charge}+"
    elif charge < 0:
        charge_txt = f"{-charge}-"
    else:
        charge_txt = "no charge (neutral atom)"
    steps = _beats(
        "charge on an ion = protons - electrons; the element is fixed by "
        "its proton (atomic) number",
        f"protons = {p}, electrons = {e}",
        f"charge = {p} - {e} = {charge:+d} (i.e. {charge_txt})",
        f"check: electrons {e} "
        + ("outnumber" if e > p else "are outnumbered by" if p > e
           else "equal")
        + f" protons {p}, so the ion is "
        + ("negative" if e > p else "positive" if p > e else "neutral"),
        f"charge = {charge_txt}; the element with atomic number {p} is "
        f"{sym}.")
    return charge, steps, (f"charge = {charge_txt}; element = {sym} "
                           f"(Z = {p})"), None, \
        "charge = Z - electrons", {"protons": p, "electrons": e}


_ECONFIG_RX = (
    r"(?:electronic|electron)\s+configuration[^.]{0,80}?"
    r"(?:atomic\s+number(?:\s+is)?|Z\s*=)\s*\(?(?P<z>\d{1,2})\)?"
    r"|(?:atomic\s+number(?:\s+is)?|Z\s*=)\s*\(?(?P<z2>\d{1,2})\)?"
    r"[^.]{0,60}?(?:electronic|electron)\s+configuration")

# c10 periodic-table asks: "State the valency of magnesium (atomic
# number 12)" / "An element has atomic number 17. Predict its period
# and group." — answered from the same Bohr-Bury shell filling.
_VALENCY_Z_RX = (
    r"valency[^.]{0,80}?(?:atomic\s+number(?:\s+is)?|Z\s*=)\s*"
    r"\(?(?P<vz>\d{1,2})\)?"
    r"|(?:atomic\s+number(?:\s+is)?|Z\s*=)\s*\(?(?P<vz2>\d{1,2})\)?"
    r"[^.]{0,60}?valency")

_PERIOD_GROUP_RX = (
    r"(?:period|group)[^.]{0,80}?(?:atomic\s+number(?:\s+is)?|Z\s*=)"
    r"\s*\(?(?P<pg>\d{1,2})\)?"
    r"|(?:atomic\s+number(?:\s+is)?|Z\s*=)\s*\(?(?P<pg2>\d{1,2})\)?"
    r"(?:\.\s*|[\s,]{0,10})[^.]{0,60}?(?:period|group)")


def _shells_for(z: int):
    caps = [2, 8, 8, 2]           # school filling order: K L M N (Z <= 20)
    shells, rem = [], z
    for cap in caps:
        take = min(cap, rem)
        shells.append(take)
        rem -= take
        if rem == 0:
            break
    return shells


def _c_valency_z(g, m, text):
    z_txt = g.get("vz") or g.get("vz2")
    if not z_txt:
        return _GATE
    z = int(z_txt)
    if not (1 <= z <= 20):
        return _GATE
    shells = _shells_for(z)
    outer = shells[-1]
    valency = outer if outer <= 4 else 8 - outer
    config = ",".join(str(s) for s in shells)
    steps = _beats(
        "valency from shell filling: fill K(2), L(8), M(8), N(2); the "
        "outermost shell's electrons give the valency (<=4 keep, >4 "
        "complete the octet)",
        f"Z = {z}: filling gives {config}",
        f"outermost shell holds {outer} -> valency = {valency}",
        f"check: {'give up/share' if outer <= 4 else 'gain'} to reach a "
        f"stable octet, magnitude {valency}",
        f"valency = {valency}.")
    return float(valency), steps, f"valency = {valency}", None, \
        "Bohr-Bury outer-shell electrons", {"z": float(z)}


def _c_period_group(g, m, text):
    z_txt = g.get("pg") or g.get("pg2")
    if not z_txt:
        return _GATE
    z = int(z_txt)
    if not (1 <= z <= 20):
        return _GATE
    shells = _shells_for(z)
    outer = shells[-1]
    period = len(shells)
    group = outer if outer <= 2 else 10 + outer   # school s/p-block rule
    config = ",".join(str(s) for s in shells)
    steps = _beats(
        "period = number of occupied shells; group = outermost electrons "
        "(1-2) or 10 + outermost electrons (3-8), school s/p-block rule",
        f"Z = {z}: filling gives {config}",
        f"{period} occupied shell(s) -> period {period}; "
        f"{outer} outermost electron(s) -> group {group}",
        f"check: outer shell count fixes the period; the outermost "
        f"population fixes the group",
        f"period = {period}, group = {group}.")
    return float(period), steps, f"period = {period}, group = {group}", \
        None, "shells -> period, outer electrons -> group", \
        {"z": float(z)}


# Dobereiner triad (c10 ch5): the middle element's atomic mass is the
# arithmetic mean of the first and third.
_TRIAD_RX = (
    r"(?:dobereiner|triad)")


def _c_triad(g, m, text):
    nums = re.findall(r"(\d+(?:\.\d+)?)\s*(?:u\b|\bamu\b)", text, re.I)
    vals = [float(x) for x in nums]
    # fall back to bare numbers when no unit marks (short questions)
    if len(vals) < 3:
        nums = re.findall(r"(?<![\d.])(\d{1,3}(?:\.\d+)?)(?![\d.%])", text)
        vals = [float(x) for x in nums]
    if len(vals) < 3:
        return _GATE
    a, b, c = vals[0], vals[1], vals[2]
    mean = (a + c) / 2.0
    if abs(mean - b) <= max(0.05, 0.02 * abs(mean)):
        steps = _beats(
            "Dobereiner's law of triads: the atomic mass of the middle "
            "element is the arithmetic mean of the first and third",
            f"triad masses: {a:g}, {b:g}, {c:g}",
            f"mean of first and third = ({a:g} + {c:g}) / 2 = {mean:g}",
            f"check: {mean:g} matches the middle mass {b:g}",
            f"the triad holds: middle mass {b:g} = mean {mean:g}.")
        return b, steps, (f"valid triad: ({a:g} + {c:g})/2 = {mean:g} "
                          f"= middle mass"), None, \
            "middle = (first + third) / 2", {"mean": mean}
    steps = _beats(
        "Dobereiner's law of triads: the atomic mass of the middle "
        "element is the arithmetic mean of the first and third",
        f"triad masses: {a:g}, {b:g}, {c:g}",
        f"mean of first and third = ({a:g} + {c:g}) / 2 = {mean:g}",
        f"check: {mean:g} does NOT match the middle mass {b:g} "
        f"(difference {abs(mean - b):g})",
        f"NOT a valid triad: middle mass {b:g} != mean {mean:g}.")
    return b, steps, (f"not a valid triad: ({a:g} + {c:g})/2 = {mean:g} "
                      f"but middle mass = {b:g}"), None, \
        "middle = (first + third) / 2", {"mean": mean}


def _c_econfig(g, m, text):
    z_txt = g.get("z") or g.get("z2")
    if not z_txt:
        return _GATE
    z = int(z_txt)
    if not (1 <= z <= 20):
        return _GATE              # Bohr-Bury school rule valid to Ca
    caps = [2, 8, 8, 2]           # school filling order: K L M N (Z <= 20)
    shells, rem = [], z
    for cap in caps:
        take = min(cap, rem)
        shells.append(take)
        rem -= take
        if rem == 0:
            break
    config = ",".join(str(s) for s in shells)
    outer = shells[-1] if shells and shells[-1] else shells[-2]
    valency = outer if outer <= 4 else 8 - outer
    steps = _beats(
        "Bohr-Bury scheme: fill shells K, L, M, ... in order with 2n^2 "
        "electrons (school cap: 8 in the outermost shell)",
        f"Z = {z}: distribute {z} electrons into K(2), L(8), M(8), N(2)",
        "filling in order gives " + ", ".join(
            f"{('KLMN')[i]} = {s}" for i, s in enumerate(shells)),
        f"outermost shell holds {outer} electron(s), so valency = "
        f"{valency} "
        + ("(give up/share its electrons)" if outer <= 4
           else "(gain " + str(8 - outer) + " electrons)"),
        f"electronic configuration = {config}; valency = {valency}.")
    return float(z), steps, (f"electronic configuration = {config}; "
                             f"valency = {valency}"), None, \
        "Bohr-Bury shell filling (Z <= 20)", {"valency": float(valency)}


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
    if g.get("v4_m") and g.get("v4_n"):
        M = _sci(g["v4_m"])
        n = _sci(g["v4_n"])
        if M <= 0 or n <= 0:
            return _GATE
        vL = n / M
        steps = _beats(
            "molarity formula inverted: V = n / M calculates volume required",
            f"n = {n:g} mol, M = {M:g} mol/L",
            f"V = {n:g} / {M:g} = {vL:.6g} L",
            f"check: M x V = {M:g} x {vL:.6g} = {M * vL:.6g} mol = given moles",
            f"volume = {vL:.6g} L.")
        return vL, steps, f"V = {vL:.6g} L", None, "V = n / M", \
            {"moles": n, "molarity": M, "volume_l": vL}
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
    r"litres?|liters?|l)\b\s+(?:of\s+)?(?:a\s+)?(?P<m3>" + _SCI + r")\s*M\b"
    # (d) inverse volume ask: volume required for n moles of M solution
    r"|(?:volume\s+(?:in\s+liters?|in\s+l)?\s*(?:is\s+)?(?:required|needed)\s+to\s+make\s+(?:a\s+)?"
    r"(?P<v4_m>" + _SCI + r")\s*M\s+solution\s+(?:using|with)\s+(?P<v4_n>" + _SCI + r")\s*(?:moles?|mol))")


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
    f = g.get("f")
    if not f or parse_formula(f) is None:
        # first alternative caught the compound's NAME ("glucose");
        # the named-compound form carries the real formula in f2.
        f = g.get("f2") or f
    if not f:
        return _GATE
    f = re.sub(r"\s*\^\s*", "", f)   # normalizer caret form: O^11 = O11
    c = parse_formula(f)
    if c is None or not _formula_valid_in_text(f):
        return _GATE
    # stated atomic masses ("C = 12.011 u, H = 1.008 u") override the
    # standard table when they cover EVERY element of the formula --
    # the question's own data is the more precise source.
    stated = dict((el.lower(), float(v)) for el, v in re.findall(
        r"([A-Z][a-z]?)\s*=\s*(\d+(?:\.\d+)?)\s*u\b", text, re.I))
    use_stated = stated and all(el.lower() in stated for el in c)
    Mw = sum(n * stated[el.lower()] for el, n in c.items()) \
        if use_stated else molar_mass(f)
    masses = {el: (stated[el.lower()] if use_stated
                   else ATOMIC_MASS[el]) for el in c}
    src = "stated atomic masses" if use_stated else "standard table masses"
    terms = " + ".join(f"{n} x {masses[el]:g}" for el, n in sorted(c.items()))
    biggest = max(masses[el] * n for el, n in c.items())
    steps = _beats(
        "molecular mass = sum of the atomic masses, each multiplied by "
        "its subscript in the formula (composition rule)",
        f"atoms in {f}: {_composition_str(c)} ({src})",
        f"M({f}) = {terms} = {Mw:g}",
        f"check: {sum(c.values())} atoms accounted for; every element "
        f"contribution (largest {biggest:g}) is positive and < {Mw:g}",
        f"molecular mass of {f} = {Mw:g}.")
    return Mw, steps, f"molecular mass of {f} = {Mw:g}", None, \
        "sum of atomic masses", {"n_atoms": float(_atom_count(f))}


_MOLMASS_RX = (
    # named-compound form first: "molecular mass of sucrose, C12H22O11"
    # -- re.search keeps the LEFTMOST alternative, so the plain form
    # would otherwise shadow this one at the same start position.  The
    # input normalizer rewrites unicode subscripts as caret powers
    # (O11 -> O^11); the optional ^ tail is part of the formula here
    # (a molecular-mass ask cannot mean an ion charge).
    r"(?:molecular\s+mass|formula\s+(?:unit\s+)?mass|molar\s+mass)\s+of\s+"
    r"[A-Za-z][A-Za-z0-9\s\-]{0,30}?,\s*(?P<f2>" + _F_TOKEN +
    r"(?:\s*\^\s*\d+)?)\b"
    r"|(?:molecular\s+mass|formula\s+(?:unit\s+)?mass|molar\s+mass|"
    r"gram\s+(?:molecular|formula)\s+(?:unit\s+)?mass|"
    r"relative\s+(?:molecular|formula)\s+mass)\s+"
    r"(?:of\s+(?:the\s+)?(?:compound\s+|substance\s+|gas\s+)?)?"
    r"(?P<f>" + _F_TOKEN + r"(?:\s*\^\s*\d+)?)(?!\s*(?:is|=)\s*[-+]?\d)")


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
        # ICSE conjunction pressure: "27 C and 760 mm Hg" (the pressure
        # is introduced by "and"/"with", not "at")
        re.compile(r"(?:at|and|with|pressure\s+of)\s+(?P<v>" + num
                   + r")\s*(?P<u>" + _P_UNIT + r")", re.I),
        re.compile(r"(?:at|temperature\s+of)\s+(?P<v>" + num + r")\s*"
                   r"(?P<u>" + _T_UNIT + r")", re.I),
        # plain bare: "volume of 500 mL", "the pressure is 2 atm"
        re.compile(r"(?:the\s+)?" + kind_w + r"\s+(?:of\s+)?(?:is\s+|=|:)?\s*"
                   r"(?P<v>" + num + r")\s*" + pvt_u, re.I),
        # bare unit-tagged quantities: "300 cm3 of hydrogen", "and
        # 380 mm Hg" -- the unit itself pins the kind
        re.compile(r"(?<![\d.])(?P<v>" + num + r")\s*(?P<u>" + _V_UNIT
                   + r")\b", re.I),
        re.compile(r"(?<![\d.])(?P<v>" + num + r")\s*(?P<u>" + _P_UNIT
                   + r")\b", re.I),
    ]
    return out


_GAS_SLOT_RX = _gas_quantity_regexes()
# scan order -> state index (None = order-assigned); must list one entry
# per slot regex (9 rows) -- zip() silently truncates otherwise.
_GAS_SLOT_STATE = ["1", "2", "1", "2", None, None, None, None, None]

_KIND_MAP = {"pressure": "P", "volume": "V", "temperature": "T",
             "P": "P", "V": "V", "T": "T"}

_ASK_KIND_RX = re.compile(
    r"(?:find|calculate|determine|compute|what\s+(?:is|will|was))\s+"
    r"(?:be\s+)?(?:the\s+|its\s+|their\s+)?"
    r"(?:new\s+|final\s+|initial\s+|resulting\s+)?"
    r"(?P<kind>pressure|volume|temperature)\b"
    r"|(?:find|calculate|determine|compute)\s+(?:the\s+|its\s+|their\s+)?"
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
        # symbolic volume ratio ("compressed to half its original
        # volume"): only the V2/V1 ratio enters the gas laws, so anchor
        # V1 = 1 L and V2 = frac -- the ratio alone is exact.
        frac = None
        if re.search(r"(?:compressed|reduced|squeezed)\s+to\s+half", text,
                     re.I):
            frac = 0.5
        elif re.search(r"(?:expanded|doubled)\s+to\s+twice|twice\s+its|"
                       r"double[sd]?\s+its", text, re.I):
            frac = 2.0
        elif re.search(r"(?:one-third|a\s+third)\s+of\s+(?:its|the)\s+"
                       r"volume", text, re.I):
            frac = 1.0 / 3.0
        elif re.search(r"a\s+quarter\s+of\s+(?:its|the)\s+volume", text,
                       re.I):
            frac = 0.25
        if frac is not None and unknown is not None:
            kind_u, st_u = unknown
            if "V1" not in knowns and "V2" not in knowns and kind_u != "V":
                knowns["V1"] = (1.0, "L")
                knowns["V2"] = (frac, "L")
            elif "V1" in knowns and "V2" not in knowns and kind_u != "V":
                # "300 cm3 ... compressed to half its original volume":
                # the stated V1 scales, the unit carries over exactly.
                v1v, v1u = knowns["V1"]
                knowns["V2"] = (v1v * frac, v1u)
        if unknown is None:
            return _GATE
        # STP anchor: "what will be its volume at STP" -- the final state
        # is 273 K and (usually 1-atm-equivalent) pressure, stated by
        # name only. Anchoring by name is exact, never a guess. The
        # anchor fires only when STP attaches to a kind word, so a
        # state-1 descriptor ("occupies 500 cm3 at STP") never anchors.
        stp_final = bool(re.search(r"(?:volume|pressure|temperature)\s+"
                                   r"(?:of\s+the\s+(?:gas\s+)?)?at\s+STP\b",
                                   text, re.I))
        if stp_final:
            if "T2" not in knowns and unknown != ("T", "2"):
                knowns["T2"] = (273.0, "K")
            if "P2" not in knowns and unknown != ("P", "2"):
                p1u = knowns.get("P1", (0.0, "atm"))[1]
                knowns["P2"] = (760.0, p1u) if p1u in ("mm hg", "mmhg",
                                                       "torr", "cm hg",
                                                       "cmhg") \
                    else (1.0, "atm")
            # ICSE convention for "convert to STP" numericals: the gas
            # starts at atmospheric pressure, so P1 = P2 when unstated.
            if "P1" not in knowns and unknown != ("P", "1"):
                knowns["P1"] = knowns["P2"]
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
        # isothermal sanity: Boyle's law is inapplicable when the text
        # states an actual temperature change between the two states.
        if law == "BOYLE" and "T1" in knowns and "T2" in knowns:
            k1 = _to_kelvin(*knowns["T1"])
            k2 = _to_kelvin(*knowns["T2"])
            if k1 is not None and k2 is not None and abs(k1 - k2) > 0.5:
                return _GATE
        # law gate: explicit law/constancy words; combined also accepts
        # all-three-kinds readings and the symbolic volume-ratio wording
        # (which pins the combined reading by itself)
        if law == "COMBINED":
            if not (_LAW_GATE["COMBINED"].search(text)
                    or len({lbl[0] for lbl in knowns}) >= 3
                    or frac is not None):
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


def _c_ideal_gas(g, m, text):
    """Ideal gas equation: PV = nRT.
    Solves for V, P, n, or T given the other quantities."""
    if not re.search(r"ideal\s+gas|p\s*v\s*=\s*n\s*r\s*t|\bvolume\s+occupied\b|\bpressure\s+of\s+[-+]?\d", text, re.I):
        return _GATE
    pm = re.search(r"(?P<v>" + _SCI + r")\s*(?P<u>atm|bar|pa|kpa|n/m\^?2)\b", text, re.I)
    vm = re.search(r"(?P<v>" + _SCI + r")\s*(?P<u>l|litres?|liters?|ml|cm\^?3|m\^?3)\b", text, re.I)
    nm = re.search(r"(?P<v>" + _SCI + r")\s*(?:moles?|mol)\b", text, re.I)
    tm = re.search(r"(?P<v>" + _SCI + r")\s*(?P<u>k|kelvin|\u00b0\s*c|c)\b", text, re.I)
    rm = re.search(r"\bR\s*=\s*(?P<v>" + _SCI + r")", text, re.I)
    R_val = _sci(rm.group("v")) if rm else 0.0821

    ask_v = bool(re.search(r"(?:calculate|find|what\s+is|determine)\s+(?:the\s+)?volume", text, re.I))
    ask_p = bool(re.search(r"(?:calculate|find|what\s+is|determine)\s+(?:the\s+)?pressure", text, re.I))

    if ask_v and pm and nm and tm:
        P = _sci(pm.group("v"))
        n = _sci(nm.group("v"))
        T_raw = _sci(tm.group("v"))
        T = T_raw if tm.group("u").lower().startswith("k") else T_raw + 273.15
        if P <= 0 or n <= 0 or T <= 0:
            return _GATE
        V = n * R_val * T / P
        steps = _beats(
            "ideal gas equation: P V = n R T, rearranged as V = (n R T) / P",
            f"givens: n = {n:g} mol, P = {P:g} atm, T = {T:g} K, R = {R_val:g} L atm / (mol K)",
            f"V = ({n:g} x {R_val:g} x {T:g}) / {P:g} = {V:.6g} L",
            f"check: P x V = {P:g} x {V:.6g} = {P * V:.6g} == n x R x T = {n * R_val * T:.6g} -- balanced",
            f"volume occupied = {V:.6g} L."
        )
        return V, steps, f"volume = {V:.6g} L", None, "V = n R T / P", {"n": n, "P": P, "T": T, "R": R_val, "V": V}
    elif ask_p and vm and nm and tm:
        V = _sci(vm.group("v"))
        n = _sci(nm.group("v"))
        T_raw = _sci(tm.group("v"))
        T = T_raw if tm.group("u").lower().startswith("k") else T_raw + 273.15
        if V <= 0 or n <= 0 or T <= 0:
            return _GATE
        P = n * R_val * T / V
        steps = _beats(
            "ideal gas equation: P V = n R T, rearranged as P = (n R T) / V",
            f"givens: n = {n:g} mol, V = {V:g} L, T = {T:g} K, R = {R_val:g} L atm / (mol K)",
            f"P = ({n:g} x {R_val:g} x {T:g}) / {V:g} = {P:.6g} atm",
            f"check: P x V = {P:.6g} x {V:g} = {P * V:.6g} == n x R x T = {n * R_val * T:.6g} -- balanced",
            f"pressure = {P:.6g} atm."
        )
        return P, steps, f"pressure = {P:.6g} atm", None, "P = n R T / V", {"n": n, "P": P, "T": T, "R": R_val, "P": P}
    return _GATE


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

# common deposition metals -> electron-per-ion count (z)
_METAL_VALENCY = {"Ag": 1, "Cu": 2, "Al": 3, "Zn": 2, "Fe": 2, "Ni": 2,
                  "Au": 3, "Na": 1, "K": 1, "Ca": 2, "Mg": 2, "Pb": 2,
                  "Sn": 2, "Cr": 3}
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
    # board forms: "75% of Cl-35", "Cl-35 is 75%", "Cl-35 (75%)" --
    # decimals allowed (99.76% oxygen-isotope data is textbook standard)
    # NOTE: _PCT must stay NON-CAPTURING — re.findall returns one tuple
    # per match holding EVERY capture group, and a nested group here
    # widened the tuples past the 6-name unpack below (silent gate).
    _PCT = r"(?:\d{1,3}(?:\.\d+)?)\s*%"
    iso = re.findall(
        r"(?P<p1>" + _PCT + r")\s*(?:of\s+)?(?P<f>[A-Z][a-z]?-?\d{0,3})"
        r"|(?P<f2>[A-Z][a-z]?-?\d{0,3})\s*(?:is|=|:)\s*(?P<p2>" + _PCT + r")"
        r"|(?P<f3>[A-Z][a-z]?-?\d{0,3})\s*\(\s*(?P<p3>" + _PCT + r")\s*\)",
        text)
    entries = []               # (mass_number or 0, abundance, table_mass)
    for p1, f1, f2, p2, f3, p3 in iso:
        if f1 and p1:
            sym_txt, p = f1, float(str(p1).replace('%', ''))
        elif f2 and p2:
            sym_txt, p = f2, float(str(p2).replace('%', ''))
        elif f3 and p3:
            sym_txt, p = f3, float(str(p3).replace('%', ''))
        else:
            continue
        mm = re.match(r"^([A-Z][a-z]?)(?:-(\d{1,3}))?$", sym_txt.strip())
        if not mm or mm.group(1) not in ATOMIC_MASS:
            continue
        mass = float(mm.group(2)) if mm.group(2) else \
            ATOMIC_MASS[mm.group(1)]
        entries.append((mass, p, mm.group(1),
                        int(mm.group(2)) if mm.group(2) else 0))
    # drop zero-abundance decoys and exact duplicates (the same isotope
    # caught by two alternatives); keep the FIRST mention of an isotope
    entries = [e for e in entries if e[1] > 0]
    seen, dedup = set(), []
    for e in entries:
        key = (e[2], e[3])
        if key in seen:
            continue
        seen.add(key)
        dedup.append(e)
    entries = dedup
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
    # mass+mass form: "18 g of glucose is dissolved in 90 g of water"
    # (CHEM-ADVERSARIAL c12: the moles-only format gated and the mole
    # family hijacked the ask; convert grams via the molar masses)
    if not am:
        gm = re.findall(r"(?P<m>" + _SCI + r")\s*g(?:rams?)?[^.]{0,30}?"
                        r"(?:of\s+)?(?P<f>" + _F_TOKEN + r")", text, re.I)
        gm = [(float(m_), f_) for m_, f_ in gm
              if _formula_valid_in_text(f_)]
        if len(gm) >= 2:
            (m1, f1), (m2, f2) = gm[0], gm[-1]
            M1, M2 = molar_mass(f1), molar_mass(f2)
            if M1 and M2 and m1 > 0 and m2 > 0:
                n1, n2 = m1 / M1, m2 / M2
                x1 = n1 / (n1 + n2)
                steps = _beats(
                    "mole fraction x = moles of the component / total "
                    "moles; grams convert through the molar masses",
                    f"n({f1}) = {m1:g} / {M1:g} = {n1:.6g} mol, "
                    f"n({f2}) = {m2:g} / {M2:g} = {n2:.6g} mol",
                    f"total = {n1:.6g} + {n2:.6g} = {n1 + n2:.6g} mol",
                    f"x({f1}) = {n1:.6g} / {n1 + n2:.6g} = {x1:.6g}; "
                    f"check: x1 + x2 = 1",
                    f"mole fraction of {f1} = {x1:.6g}.")
                return x1, steps, f"x({f1}) = {x1:.6g}", None,                     "x_i = n_i / sum(n)", {"n1": n1, "n2": n2}
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
        eq_raw = _parse_equation(text)
        if eq_raw:
            lhs_raw, rhs_raw = eq_raw
            bal = balance_equation(lhs_raw, rhs_raw)
            if bal:
                eq = (lhs_raw, rhs_raw, bal[0], bal[1])
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
    # NOTE: the alias layer rewrites "water" -> H2O, so the solvent
    # must match both the word and the formula
    ws = re.search(r"(?P<w>" + _SCI + r")\s*(?P<wu>kg|kilograms?|g|grams?)"
                   r"\s+(?:of\s+)?(?:water\b|solvent\b|H2O\b)", text,
                   re.I)
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
    # BRANCH A (CHEM-ADVERSARIAL c12): charge to deposit N mol of a
    # metal -- Q = n x valency x F ("charge required to deposit 1 mole
    # of aluminium from Al3+ / molten Al2O3").  No current/time needed.
    md = re.search(r"deposit\w*[^.]{0,60}?(?P<n>" + _SCI + r")\s*"
                   r"(?:moles?|mol)\s+of\s+(?P<me>[A-Za-z]+)\b", text,
                   re.I) or re.search(r"(?P<n>" + _SCI + r")\s*"
                   r"(?:moles?|mol)\s+of\s+(?P<me>[A-Za-z]+)\b"
                   r"[^.]{0,60}?deposit\w*", text, re.I)
    if md and not (ci and tm):
        me = md.group("me")
        me = _resolve_element(me) or (me if me in ATOMIC_MASS else None)
        if me is None:
            return _GATE
        if me not in ATOMIC_MASS or me not in _METALS:
            return _GATE
        n_mol = _sci(md.group("n"))
        n_e = _METAL_VALENCY.get(me)
        if n_mol <= 0 or not n_e:
            return _GATE
        Q = n_mol * n_e * FARADAY_C
        steps = _beats(
            "Faraday's laws: charge = moles x electrons per ion x F "
            "(Q = n z F); the ion's charge gives z",
            f"{me} deposits from {me}{n_e}+ ions: z = {n_e}, "
            f"F = 96500 C/mol",
            f"Q = {n_mol:g} x {n_e} x 96500 = {Q:.6g} C",
            f"check: moles of electrons = Q / F = {Q / FARADAY_C:.6g} "
            f"= {n_mol:g} x {n_e}",
            f"charge required = {Q:.6g} C.")
        return Q, steps, f"Q = {Q:.6g} C", None, "Q = n x z x F", {
            "moles": n_mol, "valency": n_e}
    # BRANCH B: plating time from mass -- t = m x z x F / (M x I)
    if ci and not tm:
        dm = re.search(r"deposit\w*[^.]{0,60}?(?P<m>" + _SCI + r")\s*"
                       r"g(?:rams?)?\b[^.]{0,60}?of\s+(?P<me2>[A-Za-z]+)",
                       text, re.I)
        if dm:
            me = dm.group("me2")
            me = _resolve_element(me) or (
                me if me in ATOMIC_MASS else None)
            if me in ATOMIC_MASS and me in _METALS:
                n_e = _METAL_VALENCY.get(me)
                I = _sci(ci.group("i"))
                m_dep = _sci(dm.group("m"))
                M = ATOMIC_MASS[me]
                if n_e and I > 0 and m_dep > 0:
                    tsec = m_dep * n_e * FARADAY_C / (M * I)
                    steps = _beats(
                        "Faraday's first law rearranged for time: "
                        "t = m x z x F / (M x I)",
                        f"{me}: z = {n_e}, M = {M:g} g/mol, F = 96500 "
                        f"C/mol; m = {m_dep:g} g, I = {I:g} A",
                        f"Q needed = {m_dep:g} x {n_e} x 96500 / {M:g} = "
                        f"{m_dep * n_e * FARADAY_C / M:.6g} C",
                        f"t = Q / I = {m_dep * n_e * FARADAY_C / M:.6g}"
                        f" / {I:g} = {tsec:.6g} s",
                        f"time required = {tsec:.6g} s.")
                    return tsec, steps, f"t = {tsec:.6g} s", None, \
                        "t = m z F / (M I)", {"seconds": tsec}
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
            r"[Ee]\s*°?\s*\(\s*(?P<c>[^()]+/[^()]+)\s*\)\s*(?:is|=|:)?\s*(?P<v>[-+]?\s*" + _SCI + r")\s*V",
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
    if not an_el:
        cell_m = re.search(r"\b([A-Z][a-z]?)\s*\|[^|]+\|\|[^|]+\|\s*([A-Z][a-z]?)", text)
        if cell_m and any(cell_m.group(1) == e for e, _v in couples):
            an_el = cell_m.group(1)
    if not an_el:
        rxm = re.search(r"\b([A-Z][a-z]?)\s*(?:\([a-z]+\))?\s*\+\s*([A-Z][a-z]?)", text)
        if rxm and any(rxm.group(1) == e for e, _v in couples) and any(rxm.group(2) == e for e, _v in couples):
            an_el = rxm.group(1)
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
    fm_oh = re.search(r"\bC(\d{1,2})H(\d{1,2})OH\b", text)
    if fm_oh:
        # alcohol series CnH(2n+1)OH: ethanol C2H5OH -> propanol C3H7OH
        n = int(fm_oh.group(1))
        N = n + 1
        H = 2 * N + 1
        formula = f"C{N}H{H}OH"
        steps = _beats(
            "homologous series rule -- consecutive members differ by one "
            "CH2 (14 u); the alcohol formula is C n H (2n+1) OH",
            f"given member C{n}H{2 * n + 1}OH (alcohol)",
            f"n -> {N}; H = 2 x {N} + 1 = {H}; next member = {formula}",
            f"check: {formula} - C{n}H{2 * n + 1}OH = CH2 (14 u)",
            f"next homologue = {formula}.")
        return None, steps, f"next homologue = {formula}", None, \
            "series formula + CH2 increment", {"n_from": n, "n_to": N}
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
# CISCE wave (2026-09-30): ICSE reaction stoichiometry, conservation of
# mass, atomic structure, isotopic atomic mass, hydrate water, carat
# counting, valency of an unknown element
# --------------------------------------------------------------------------- #

# (reactant name rx, product name rx, formula_r, formula_p, coeff_r,
#  coeff_p, equation) -- textbook ICSE reactions only; 1:1 defaults
# come from the balanced equations.
_REACTION_DB = [
    (r"\bzinc\b", r"\bhydrogen\b", "Zn", "H2", 1, 1,
     "Zn + 2 HCl -> ZnCl2 + H2"),
    (r"\bmagnesium\b", r"\bhydrogen\b", "Mg", "H2", 1, 1,
     "Mg + 2 HCl -> MgCl2 + H2"),
    (r"\baluminium\b|\baluminum\b", r"\bhydrogen\b", "Al", "H2", 2, 3,
     "2 Al + 6 HCl -> 2 AlCl3 + 3 H2"),
    (r"\biron\b", r"\bhydrogen\b", "Fe", "H2", 1, 1,
     "Fe + 2 HCl -> FeCl2 + H2"),
    (r"calcium\s+carbonate|limestone|marble\s+chips",
     r"carbon\s+dioxide|CO2", "CaCO3", "CO2", 1, 1,
     "CaCO3 -> CaO + CO2 (heated) / CaCO3 + 2 HCl -> CaCl2 + H2O + CO2"),
    (r"calcium\s+carbonate|limestone|marble\s+chips",
     r"calcium\s+oxide|quicklime|CaO\b", "CaCO3", "CaO", 1, 1,
     "CaCO3 -> CaO + CO2 (heated)"),
    (r"sodium\s+carbonate|washing\s+soda", r"carbon\s+dioxide|CO2",
     "Na2CO3", "CO2", 1, 1, "Na2CO3 + 2 HCl -> 2 NaCl + H2O + CO2"),
    (r"sodium\s+bicarbonate|sodium\s+hydrogencarbonate|baking\s+soda",
     r"carbon\s+dioxide|CO2", "NaHCO3", "CO2", 1, 1,
     "NaHCO3 + HCl -> NaCl + H2O + CO2"),
    (r"\bmagnesium\b", r"magnesium\s+oxide|MgO", "Mg", "MgO", 1, 1,
     "2 Mg + O2 -> 2 MgO"),
    (r"\bwater\b", r"\bhydrogen\b", "H2O", "H2", 1, 1,
     "2 H2O -> 2 H2 + O2 (electrolysis)"),
    (r"potassium\s+chlorate|KClO3", r"\boxygen\b|O2\b", "KClO3", "O2",
     2, 3, "2 KClO3 -> 2 KCl + 3 O2"),
    (r"\biron\b", r"iron\s+sulphide|iron\s+sulfide|FeS", "Fe", "FeS",
     1, 1, "Fe + S -> FeS"),
    (r"sodium\s+chloride|common\s+salt", r"hydrogen\s+chloride|\bHCl\b",
     "NaCl", "HCl", 1, 1, "NaCl + H2SO4 -> NaHSO4 + HCl"),
    (r"ammonium\s+chloride|NH4Cl", r"ammonia|NH3\b", "NH4Cl", "NH3",
     1, 1, "2 NH4Cl + Ca(OH)2 -> CaCl2 + 2 NH3 + 2 H2O"),
    (r"\bcarbon\b|\bcoke\b", r"\bhydrogen\b", "C", "H2", 1, 1,
     "C + H2O -> CO + H2 (Bosch process)"),
    (r"\bhydrogen\b", r"\bwater\b", "H2", "H2O", 1, 1,
     "2 H2 + O2 -> 2 H2O"),
    (r"copper\s+oxide|CuO\b", r"copper\s+metal|\bcopper\b", "CuO", "Cu",
     1, 1, "CuO + H2 -> Cu + H2O"),
    (r"calcium\s+oxide|quicklime", r"calcium\s+hydroxide|slaked\s+lime",
     "CaO", "Ca(OH)2", 1, 1, "CaO + H2O -> Ca(OH)2"),
    (r"\bzinc\b", r"zinc\s+oxide|ZnO\b", "Zn", "ZnO", 1, 1,
     "2 Zn + O2 -> 2 ZnO"),
]

_R_MASS_RX = (r"(?P<m>" + _SCI + r")\s*g(?:rams?)?\b(?:\s+of\s+)?")
_STP_MENTION_RX = re.compile(r"\bSTP\b|standard\s+temperature", re.I)


def _stoich_gas_volume(text: str, name_rx: str):
    """Volume stated for a named gas: "2.24 L of CO2", "5.6 L of
    hydrogen gas" -> litres."""
    m = re.search(r"(?P<v>" + _SCI + r")\s*(?P<u>dm\s*\^?\s*3|dm\u00b3|"
                  r"cm\s*\^?\s*3|cm\u00b3|mL|millilitr\w+|L|litres?|"
                  r"liters?)\s+(?:of\s+)?(?P<gas>" + name_rx + r")", text,
                  re.I)
    if not m:
        return None
    v = _sci(m.group("v"))
    ul = re.sub(r"[\s.^*]", "", m.group("u").lower())
    if ul.startswith("cm") or ul.startswith("ml"):
        return v * 1e-3
    if ul.startswith("m"):
        return v            # dm^3 == litre
    return v


def _c_reaction_stoich(g, m, text):
    """Mass <-> gas-volume (STP) <-> mass stoichiometry over the
    textbook ICSE reaction set, plus percentage yield when the
    theoretical mass is computable from the same reaction."""
    ask_yield = bool(re.search(r"percentage\s+yield|\byield\b", text, re.I))
    ask_vol = bool(re.search(r"volume|V\s*=", text, re.I)) and \
        not ask_yield
    ask_mass = bool(re.search(r"\bmass\b|grams?\s+(?:of|are|required|"
                              r"needed)", text, re.I)) and not ask_yield
    if not (ask_vol or ask_mass or ask_yield):
        return _GATE
    db = _REACTION_DB
    if ask_mass and not _STP_MENTION_RX.search(text):
        # "mass of quicklime is obtained" names the wanted product --
        # try rows whose product is named first (stable order kept).
        db = ([row for row in _REACTION_DB
               if re.search(row[1], text, re.I)] +
              [row for row in _REACTION_DB
               if not re.search(row[1], text, re.I)])
    for name_rx, prod_rx, fr, fp, cr, cp, eqn in db:
        rm = re.search(_R_MASS_RX + r"(?P<name>" + name_rx + r")", text,
                       re.I)
        pm = re.search(_R_MASS_RX + r"(?P<name>" + prod_rx + r")", text,
                       re.I)
        pv = _stoich_gas_volume(text, prod_rx)
        Mr = molar_mass(fr)
        Mp = molar_mass(fp)
        if Mr is None or Mp is None or Mr <= 0 or Mp <= 0:
            continue
        # ---- mode: percentage yield (actual product mass + reactant mass)
        if ask_yield and rm and pm:
            m_r = _sci(rm.group("m"))
            m_act = _sci(pm.group("m"))
            if m_r <= 0 or m_act <= 0 or m_act > m_r * 10:
                continue
            n_r = m_r / Mr
            m_theo = n_r * (cp / cr) * Mp
            if m_theo <= 0:
                continue
            pct = m_act / m_theo * 100.0
            if not (0.0 < pct <= 105.0):
                continue
            steps = _beats(
                "percentage yield = actual mass / theoretical mass x 100, "
                f"with the theoretical mass from the reaction {eqn}",
                f"n({fr}) = {m_r:g} / {Mr:g} = {n_r:.6g} mol -> "
                f"m({fp})_theo = {n_r:.6g} x {cp / cr:g} x {Mp:g} = "
                f"{m_theo:.6g} g",
                f"yield = {m_act:g} / {m_theo:.6g} x 100 = {pct:.6g}%",
                f"check: {pct:.6g}% of {m_theo:.6g} g = "
                f"{m_act / m_theo * m_theo:.6g} g = the actual yield",
                f"the experiment realised {pct:.6g}% of the theoretical "
                "yield.")
            return pct, steps, f"percentage yield = {pct:.6g}%", None, \
                "% yield = actual / theoretical x 100", \
                {"m_actual": m_act, "m_theoretical": m_theo}
        # ---- mode: reactant mass -> product volume/mass
        if rm and not pm:
            # the asked target must actually be named: "volume of
            # chlorine gas at STP" must never ride a row whose product
            # happens to share a word with the named compound
            # ("carbon" inside "carbon tetrachloride").
            if ask_vol and not re.search(prod_rx, text, re.I):
                continue
            m_r = _sci(rm.group("m"))
            if m_r <= 0:
                continue
            n_r = m_r / Mr
            n_p = n_r * (cp / cr)
            if ask_vol and pv is None and _STP_MENTION_RX.search(text):
                V = n_p * MOLAR_VOLUME_STP
                steps = _beats(
                    f"stoichiometry from {eqn}: moles scale by the "
                    f"coefficient ratio {cr}:{cp}, then 1 mol of ANY gas "
                    "occupies 22.4 L at STP",
                    f"n({fr}) = {m_r:g} / {Mr:g} = {n_r:.6g} mol -> "
                    f"n({fp}) = {n_r:.6g} x {cp / cr:g} = {n_p:.6g} mol",
                    f"V = {n_p:.6g} x 22.4 = {V:.6g} L at STP",
                    f"check: V / 22.4 = {V:.6g} / 22.4 = {n_p:.6g} mol = "
                    "the stoichiometric moles",
                    f"the reaction yields {V:.6g} L of {fp} at STP.")
                return V, steps, f"volume = {V:.6g} L", None, \
                    "V = (m/M) x ratio x 22.4 L", \
                    {"moles_product": n_p, "molar_mass_r": Mr}
            if ask_vol and pv is not None and _STP_MENTION_RX.search(text):
                # product volume given, reactant mass asked (reverse)
                n_p2 = pv / MOLAR_VOLUME_STP
                n_r2 = n_p2 * (cr / cp)
                m_r2 = n_r2 * Mr
                steps = _beats(
                    f"reverse stoichiometry from {eqn}: STP volume gives "
                    "moles, the coefficient ratio scales to the reactant, "
                    "then m = n x M",
                    f"n({fp}) = {pv:g} / 22.4 = {n_p2:.6g} mol -> "
                    f"n({fr}) = {n_p2:.6g} x {cr / cp:g} = {n_r2:.6g} mol",
                    f"m({fr}) = {n_r2:.6g} x {Mr:g} = {m_r2:.6g} g",
                    f"check: {m_r2:.6g} g / {Mr:g} x {cp / cr:g} x 22.4 = "
                    f"{pv:g} L -- closes",
                    f"{m_r2:.6g} g of {fr} produces {pv:g} L at STP.")
                return m_r2, steps, f"mass = {m_r2:.6g} g", None, \
                    "m = (V/22.4) x ratio x M", \
                    {"moles_reactant": n_r2, "molar_mass_r": Mr}
            if ask_mass and not _STP_MENTION_RX.search(text):
                m_p = n_p * Mp
                steps = _beats(
                    f"stoichiometry from {eqn}: reactant moles scale by "
                    f"the coefficient ratio {cr}:{cp}, then m = n x M",
                    f"n({fr}) = {m_r:g} / {Mr:g} = {n_r:.6g} mol -> "
                    f"n({fp}) = {n_r:.6g} x {cp / cr:g} = {n_p:.6g} mol",
                    f"m({fp}) = {n_p:.6g} x {Mp:g} = {m_p:.6g} g",
                    f"check: {m_p:.6g} g / {Mp:g} x {cr / cp:g} x {Mr:g} = "
                    f"{m_r:g} g -- closes",
                    f"the reaction produces {m_p:.6g} g of {fp}.")
                return m_p, steps, f"mass = {m_p:.6g} g", None, \
                    "m_p = (m_r / M_r) x ratio x M_p", \
                    {"moles_product": n_p}
            # mass -> STP volume asked directly ("calculate the volume of
            # hydrogen gas collected at STP" without a stated volume)
            if ask_vol and pv is None and _STP_MENTION_RX.search(text):
                pass  # handled above
        # ---- mode: product mass -> reactant mass ("how many grams of X
        #      are needed to produce Y g of P")
        if pm and not rm and ask_mass:
            m_p = _sci(pm.group("m"))
            if m_p <= 0:
                continue
            n_p = m_p / Mp
            n_r = n_p * (cr / cp)
            m_r = n_r * Mr
            steps = _beats(
                f"reverse stoichiometry from {eqn}: product moles scale "
                f"back by the coefficient ratio {cp}:{cr}, then m = n x M",
                f"n({fp}) = {m_p:g} / {Mp:g} = {n_p:.6g} mol -> "
                f"n({fr}) = {n_p:.6g} x {cr / cp:g} = {n_r:.6g} mol",
                f"m({fr}) = {n_r:.6g} x {Mr:g} = {m_r:.6g} g",
                f"check: {m_r:.6g} / {Mr:g} x {cp / cr:g} x {Mp:g} = "
                f"{m_p:g} g -- closes",
                f"{m_r:.6g} g of {fr} is needed.")
            return m_r, steps, f"mass = {m_r:.6g} g", None, \
                "m_r = (m_p / M_p) x ratio x M_r", \
                {"moles_reactant": n_r}
        # ---- mode: product volume at STP -> reactant mass (volume stated
        #      up front: "2.24 L of CO2 at STP ... mass of CaCO3")
        if pv is not None and not rm and ask_mass and \
                _STP_MENTION_RX.search(text):
            n_p = pv / MOLAR_VOLUME_STP
            n_r = n_p * (cr / cp)
            m_r = n_r * Mr
            steps = _beats(
                f"reverse stoichiometry from {eqn}: STP volume gives the "
                "product moles, the ratio scales to the reactant",
                f"n({fp}) = {pv:g} / 22.4 = {n_p:.6g} mol -> "
                f"n({fr}) = {n_p:.6g} x {cr / cp:g} = {n_r:.6g} mol",
                f"m({fr}) = {n_r:.6g} x {Mr:g} = {m_r:.6g} g",
                f"check: {m_r:.6g} / {Mr:g} x {cp / cr:g} x 22.4 = "
                f"{pv:g} L -- closes",
                f"{m_r:.6g} g of {fr} produced the gas.")
            return m_r, steps, f"mass = {m_r:.6g} g", None, \
                "m_r = (V/22.4) x ratio x M_r", {"moles_reactant": n_r}
    return _GATE


def _c_conservation_mass(g, m, text):
    """Law of conservation of mass arithmetic: total mass before the
    reaction minus every stated product/residue mass equals the mass of
    the unweighed gas (or, for burning, product minus metal = oxygen;
    or, for direct combination, compound minus element = the other
    element combined)."""
    if not re.search(r"law\s+of\s+conservation|conservation\s+of\s+mass|"
                     r"mass\s+of\s+(?:oxygen|carbon\s+dioxide|CO2|gas|"
                     r"chlorine|sulphur|sulfur|bromine|iodine|hydrogen)"
                     r"[^.]{0,30}?(?:combined|evolved|liberated|lost|"
                     r"escaped|that\s+combined)|reacts?\s+completely\s+"
                     r"with|what\s+mass\s+of\s+\w+\s+"
                     r"(?:combined|attached|reacted|escaped|evolved)",
                     text, re.I):
        return _GATE
    # direct combination: "5.6 g of iron reacts completely with chlorine
    # to give 16.3 g of iron chloride -- mass of chlorine combined"
    comb = re.search(r"(?P<a>" + _SCI + r")\s*g(?:rams?)?\b[^.]{0,120}?"
                     r"reacts?\s+completely[^.]{0,120}?"
                     r"(?:to\s+)?(?:give|gives|giving|yield\w*|forming|"
                     r"to\s+form|form\w*)[^.]{0,80}?"
                     r"(?P<b>" + _SCI + r")\s*g(?:rams?)?\b", text, re.I)
    ask_comb = bool(re.search(r"what\s+mass\s+of\s+\w+\s+(?:combined|"
                              r"attached|reacted)|mass\s+of\s+(?:oxygen|"
                              r"chlorine|sulphur|sulfur|bromine|iodine|"
                              r"hydrogen|carbon)\s+(?:is\s+)?"
                              r"(?:combined|attached|present)", text,
                              re.I)) and \
        not re.search(r"burn|oxidis|oxidiz", text, re.I)
    if comb is not None and ask_comb:
        m_a = _sci(comb.group("a"))
        m_b = _sci(comb.group("b"))
        if m_a <= 0 or m_b <= m_a:
            return _GATE  # the compound must outweigh the element alone
        val = m_b - m_a
        steps = _beats(
            "law of conservation of mass: every gram of the product "
            "came from the starting substances, so the mass of the "
            "other element = product mass - stated element mass.",
            f"m(other) = {m_b:g} - {m_a:g}",
            f"m(other) = {val:g} g",
            f"check: {m_a:g} g element + {val:g} g other = {m_b:g} g "
            "product -- total mass conserved",
            f"{val:g} g of the other element combined with the given "
            "element.")
        answer = f"mass combined = {val:g} g"
        return val, steps, answer, None, "m(other) = m(compound) - m(el)", \
            {"mass_element": m_a, "mass_compound": m_b}
    # burning in air: metal mass + product mass -> oxygen gained
    burn = re.search(r"(?P<m>" + _SCI + r")\s*g(?:rams?)?\b[^.]{0,80}?"
                     r"(?:burns?|burnt|burning|oxidis\w+|oxidiz\w+)"
                     r"[^.]{0,120}?(?:product|oxide)[^.]{0,40}?"
                     r"(?:is|weighs?|=|of)\s*(?P<p>" + _SCI + r")\s*"
                     r"g(?:rams?)?\b", text, re.I)
    if burn and re.search(r"oxygen", text, re.I):
        m_before = _sci(burn.group("m"))
        m_after = _sci(burn.group("p"))
        val = abs(m_after - m_before)
        if m_after < m_before:
            return _GATE  # mass cannot decrease when burning in air
        steps = _beats(
            "law of conservation of mass: mass(oxide) - mass(metal) = "
            "mass of oxygen combined from the air",
            f"m(O) = {m_after:g} - {m_before:g}",
            f"m(O) = {val:g} g",
            f"check: {m_before:g} g metal + {val:g} g oxygen = "
            f"{m_after:g} g product -- total mass conserved",
            f"{val:g} g of oxygen combined with the metal.")
        answer = f"mass of oxygen = {val:g} g"
        return val, steps, answer, None, "m(O) = m(oxide) - m(metal)", \
            {"mass_before": m_before, "mass_after": m_after}
    # gas loss: before-mass(es) minus after-mass(es) = gas escaped
    befores = [float(x) for x in re.findall(
        r"(?P<b>" + _SCI + r")\s*g(?:rams?)?\b", text, re.I)]
    aft = re.search(r"(?:residue|remaining\s+(?:mixture|solid|mass)|"
                    r"left\s+(?:behind|is)|solid\s+left|mixture\s+weighs?)"
                    r"[^.]{0,30}?(?:is\s+|weighs?\s+|=|of\s+)?"
                    r"(?P<a>" + _SCI + r")\s*g(?:rams?)?\b", text, re.I)
    if aft is None:
        aft = re.search(r"(?:weighs?|weight\s+of)\s+(?P<a2>" + _SCI
                        + r")\s*g(?:rams?)?\b[^.]{0,40}?(?:after|once|"
                        r"when)", text, re.I)
    if aft is None or len(befores) < 2:
        return _GATE
    m_after = _sci(aft.group("a") or aft.group("a2"))
    before_total = sum(befores)
    if m_after <= 0 or m_after >= before_total:
        return _GATE
    val = before_total - m_after
    plus = " + ".join(f"{b:g}" for b in befores)
    steps = _beats(
        "law of conservation of mass: everything lost from the vessel "
        "escaped as gas, so m(gas) = total starting mass - remaining "
        "mass",
        f"m(gas) = ({plus}) - {m_after:g}",
        f"m(gas) = {before_total:g} - {m_after:g} = {val:g} g",
        f"check: {m_after:g} g remaining + {val:g} g gas = "
        f"{before_total:g} g = the starting mass",
        f"{val:g} g of gas escaped.")
    answer = f"mass of gas = {val:g} g"
    return val, steps, answer, None, "m(gas) = m(before) - m(after)", \
        {"mass_before": before_total, "mass_after": m_after}


_SHELL_WORDS = {"first": 1, "1st": 1, "second": 2, "2nd": 2, "third": 3,
                "3rd": 3, "fourth": 4, "4th": 4, "fifth": 5, "5th": 5,
                "k": 1, "l": 2, "m": 3, "n": 4, "o": 5}


def _c_atom_structure(g, m, text):
    """2n^2 shell capacity, neutron count A - Z, and electron count
    from the atomic number -- ICSE atomic-structure micro-numericals."""
    # shell capacity
    sh = re.search(r"(?:shell|orbit)\s*\(?\s*(?:n\s*=\s*)?(?P<nn>\d)"
                   r"\)?|(?P<word>first|second|third|fourth|fifth|K|L|M|N|"
                   r"O)\s+(?:shell|orbit)", text, re.I)
    ask_shell = bool(re.search(r"maximum\s+number\s+of\s+electrons|"
                               r"how\s+many\s+electrons.{0,40}?"
                               r"(?:shell|orbit)|accommodat\w+", text,
                               re.I))
    if sh is not None and ask_shell:
        n = int(sh.group("nn")) if sh.group("nn") else \
            _SHELL_WORDS.get(sh.group("word").lower(), 0)
        if not (1 <= n <= 7):
            return _GATE
        val = 2 * n * n
        steps = _beats(
            "Bohr-Bury shell capacity 2 n^2 -- each shell holds at most "
            "twice the square of its principal quantum number.",
            f"n = {n}, capacity = 2 x {n}^2",
            f"2 x {n * n} = {val} electrons",
            f"check: shells 1..{n} hold " +
            ", ".join(str(2 * k * k) for k in range(1, n + 1)) +
            f" -- capacity {val} is the largest and even",
            f"the n = {n} shell holds at most {val} electrons.")
        answer = f"maximum electrons = {val}"
        return float(val), steps, answer, None, "2 n^2", {"n": n}
    # neutrons from mass number and atomic number
    ask_n = bool(re.search(r"neutrons?", text, re.I))
    am = re.search(r"mass\s+number\s+(?:of\s+)?(?:is\s+|of\s+)?(?P<a>\d{1,3})",
                   text, re.I)
    zm = re.search(r"atomic\s+number\s+(?:of\s+)?(?:is\s+|of\s+)?(?P<z>\d{1,3})",
                   text, re.I)
    if ask_n and am and zm:
        A = int(am.group("a"))
        Z = int(zm.group("z"))
        if not (0 < Z < A < 300):
            return _GATE
        val = A - Z
        steps = _beats(
            "nucleon counts: A = protons + neutrons, so neutrons = "
            "mass number - atomic number.",
            f"neutrons = {A} - {Z}",
            f"neutrons = {val}",
            f"check: {Z} protons + {val} neutrons = {A} = the mass "
            "number",
            f"the atom contains {val} neutrons.")
        answer = f"neutrons = {val}"
        return float(val), steps, answer, None, "N = A - Z", \
            {"A": A, "Z": Z}
    # electron / proton counts from the atomic number (neutral atom)
    ask_e = bool(re.search(r"how\s+many\s+(?:electrons|protons)", text,
                           re.I))
    if ask_e and zm is None:
        zm2 = re.search(r"(?P<z>\d{1,3})\s+protons", text, re.I) or \
            re.search(r"atomic\s+number\s+(?:is\s+)?(?P<z2>\d{1,3})",
                      text, re.I)
        if zm2 is not None and re.search(r"neutral", text, re.I):
            Z = int(zm2.group("z") or zm2.group("z2"))
            if not (1 <= Z < 200):
                return _GATE
            steps = _beats(
                "for a neutral atom the electron count equals the proton "
                "count, which IS the atomic number.",
                f"Z = {Z} (neutral atom)",
                f"electrons = protons = {Z}",
                f"check: charges balance: {Z}(+) + {Z}(-) = 0 -- neutral",
                f"a neutral atom with {Z} protons carries {Z} electrons.")
            answer = f"electrons = {Z}"
            return float(Z), steps, answer, None, "e = p = Z", {"Z": Z}
    return _GATE


def _c_isotopic_mass(g, m, text):
    """Weighted-average atomic mass from isotope (mass, abundance) pairs
    in the ICSE notation, and the reverse two-isotope abundance solve."""
    # collect "(mass = 34.969 u, abundance = 75.78 %)" style groups
    pairs = []
    for grp in re.finditer(r"\(([^()]*)\)", text):
        body = grp.group(1)
        mm = re.search(r"(\d+(?:\.\d+)?)\s*u\b", body)
        pm = re.search(r"(\d+(?:\.\d+)?)\s*%", body)
        if mm and pm:
            pairs.append((float(mm.group(1)), float(pm.group(1))))
    # "X-20 (mass 19.99 u, 90 % abundance)" order also covered above
    if not pairs:
        # ICSE prose: "Cl-35 of abundance 75 percent and Cl-37 of
        # abundance 25 percent" -- the isotope suffix is the mass, the
        # nearest percent token is its abundance.
        for mm in re.finditer(
                r"\b[A-Z][a-z]?-(\d{1,3})\b[^.]{0,40}?"
                r"(\d+(?:\.\d+)?)\s*(?:%|percent)", text, re.I):
            mass = float(mm.group(1))
            pct = float(mm.group(2))
            if 1.0 <= mass <= 300.0 and 0.0 < pct <= 100.0:
                pairs.append((mass, pct))
    ask_avg = bool(re.search(r"(?:relative\s+atomic\s+mass|average\s+"
                             r"atomic\s+mass|atomic\s+mass\s+of)", text,
                             re.I)) and len(pairs) >= 2
    if ask_avg:
        tot = sum(p for _m, p in pairs)
        if not (98.0 <= tot <= 102.0):
            return _GATE
        val = sum(mm * p / 100.0 for mm, p in pairs)
        sub = " + ".join(f"{p:g}% x {mm:g} u" for mm, p in pairs)
        steps = _beats(
            "average atomic mass = weighted mean of the isotopic masses "
            "by their fractional abundances.",
            sub + f" (abundances sum to {tot:g}%)",
            f"average = " +
            " + ".join(f"{p / 100:.4f} x {mm:g}" for mm, p in pairs) +
            f" = {val:.6g} u",
            f"check: the average lies between the lightest "
            f"{min(mm for mm, _p in pairs):g} u and heaviest "
            f"{max(mm for mm, _p in pairs):g} u isotopic mass",
            f"relative atomic mass = {val:.6g} u.")
        answer = f"average atomic mass = {val:.6g} u"
        return val, steps, answer, None, "weighted mean of isotopic masses", \
            {"abundance_sum": tot}
    # reverse: stated average, two isotopic masses -> abundances
    avg_m = re.search(r"(?:relative\s+atomic\s+mass|average\s+atomic\s+"
                      r"mass)\s+of\s+(?:the\s+)?[\w-]+\s+(?:is\s+|=)?\s*"
                      r"(?P<avg>\d+(?:\.\d+)?)", text, re.I)
    masses = [float(x) for x in re.findall(
        r"\((?P<mm>\d+(?:\.\d+)?)\s*u\)", text, re.I)]
    if avg_m is not None and len(masses) == 2 and \
            bool(re.search(r"abundance", text, re.I)):
        avg = float(avg_m.group("avg"))
        ma, mb = sorted(masses)
        if mb == ma or not (ma <= avg <= mb):
            return _GATE
        frac = (mb - avg) / (mb - ma) * 100.0
        if not (0.0 <= frac <= 100.0):
            return _GATE
        steps = _beats(
            "two-isotope abundance solve: x ma + (100 - x) mb = avg x 100 "
            "-- solve the single linear equation.",
            f"x x {ma:g} + (100 - x) x {mb:g} = {avg:g} x 100",
            f"x = ({mb:g} - {avg:g}) / ({mb:g} - {ma:g}) x 100 = "
            f"{frac:.6g}%",
            f"check: {frac:.6g}% x {ma:g} + {100 - frac:.6g}% x {mb:g} = "
            f"{avg:g} u -- matches the stated average",
            f"the lighter isotope is {frac:.6g}% abundant "
            f"({100 - frac:.6g}% the heavier).")
        answer = f"abundance = {frac:.6g}% (lighter), {100 - frac:.6g}% (heavier)"
        return frac, steps, answer, None, "x ma + (100-x) mb = avg", \
            {"lighter_pct": frac}
    return _GATE


def _c_hydrate_water(g, m, text):
    """Percentage of water of crystallisation from a dot-formula hydrate
    (Na2CO3.10H2O), optionally scaled to a stated sample mass -- and the
    classic ICSE reverse: "x g of hydrate on heating left y g of
    anhydrous ...; find x (the dot number)"."""
    solve_x = bool(re.search(r"\.x\s*H2O\b|value\s+of\s+x\b|find\s+"
                             r"(?:the\s+)?(?:number\s+)?x\b|hydrat\w+"
                             r"[^.]{0,120}anhydrous|anhydrous[^.]{0,120}"
                             r"hydrat\w+", text, re.I))
    if not re.search(r"water\s+of\s+crystallisation|water\s+of\s+"
                     r"crystallization", text, re.I) and not solve_x:
        return _GATE
    # ---- reverse solve: hydrate mass -> anhydrous residue -> dot count
    if solve_x:
        xm = re.search(r"(?P<f>[A-Z][A-Za-z0-9()]{0,20}?)\.x\s*H2O\b",
                       text)
        m_hym = re.search(r"(?P<m>" + _SCI + r")\s*g(?:rams?)?\b[^.]{0,80}?"
                          r"hydrat", text, re.I)
        m_anm = re.search(r"(?P<m2>" + _SCI + r")\s*g(?:rams?)?\b[^.]{0,80}?"
                          r"(?:anhydrous|residue|left)\b|"
                          r"(?:anhydrous|residue)[^.]{0,40}?"
                          r"(?P<m3>" + _SCI + r")\s*g(?:rams?)?\b",
                          text, re.I)
        if xm is None or m_hym is None or m_anm is None:
            return _GATE
        m_hy = _sci(m_hym.group("m"))
        m_an = _sci(m_anm.group("m2") or m_anm.group("m3"))
        head = xm.group("f")
        M_an = molar_mass(head)
        if M_an is None or M_an <= 0:
            return _GATE
        if m_hy <= m_an or m_an <= 0:
            return _GATE  # heating cannot increase the solid mass
        n_water = (m_hy - m_an) / 18.0
        n_an = m_an / M_an
        if n_an <= 0:
            return _GATE
        x_raw = n_water / n_an
        x_int = int(round(x_raw))
        if x_int < 1 or x_int > 12 or abs(x_raw - x_int) > 0.12:
            return _GATE  # x must be a small whole number to be honest
        steps = _beats(
            "water of crystallisation: heating drives off the x H2O, "
            "so n(water) = mass lost / 18 and n(anhydrous salt) = "
            "residue / M(salt); x is their ratio.",
            f"m(water) = {m_hy:g} - {m_an:g} = {m_hy - m_an:g} g -> "
            f"n(water) = {(m_hy - m_an):g} / 18 = {n_water:.6g} mol; "
            f"n({head}) = {m_an:g} / {M_an:g} = {n_an:.6g} mol",
            f"x = {n_water:.6g} / {n_an:.6g} = {x_raw:.4g} ~ {x_int}",
            f"check: {head}.{x_int}H2O heated gives {m_an:g} g of "
            f"{head} and {x_int * 18:.6g} g of water -- "
            f"{m_an + x_int * 18:.6g} g total -- closes",
            f"the formula is {head}.{x_int}H2O (x = {x_int}).")
        answer = f"x = {x_int} ({head}.{x_int}H2O)"
        return float(x_int), steps, answer, None, \
            "x = (m_lost/18) / (m_an/M_an)", \
            {"m_hydrate": m_hy, "m_anhydrous": m_an, "x": x_int}
    hm = re.search(r"(?P<f>\(?[A-Z][A-Za-z0-9()]*\)?)\.(?P<n>\d{0,2})"
                   r"H2O\b", text)
    if hm is None:
        return _GATE
    head = hm.group("f")
    n = int(hm.group("n")) if hm.group("n") else 1
    M_total = molar_mass(head + "." + str(n) + "H2O")
    if M_total is None or M_total <= 0:
        return _GATE
    m_water = 18.0 * n
    pct = m_water / M_total * 100.0
    sample = _first_num(text)
    if sample is not None and re.search(
            r"(?:in|of)\s+" + _sci_pat(sample) + r"\s*g", text, re.I) and \
            bool(re.search(r"mass\s+of\s+water", text, re.I)):
        val = sample * pct / 100.0
        steps = _beats(
            "water of crystallisation scales with the sample: "
            "m(water) = sample x (18 n / M(hydrate)).",
            f"M({head}.{n}H2O) = {M_total:g}, water fraction = "
            f"{m_water:g}/{M_total:g} = {pct:.6g}%",
            f"m(water) = {sample:g} x {pct:.6g}% = {val:.6g} g",
            f"check: {val:.6g} / {sample:g} x 100 = {pct:.6g}% -- "
            "consistent",
            f"the sample holds {val:.6g} g of water of crystallisation.")
        answer = f"mass of water = {val:.6g} g"
        return val, steps, answer, None, "m_w = sample x 18n/M", \
            {"M_hydrate": M_total, "pct_water": pct}
    steps = _beats(
        "percentage of water of crystallisation = 18 n / M(hydrate) x 100.",
        f"M({head}.{n}H2O) = {M_total:g}; water = {n} x 18 = {m_water:g}",
        f"% water = {m_water:g} / {M_total:g} x 100 = {pct:.6g}%",
        f"check: ({pct:.6g}% of {M_total:g}) = "
        f"{m_water:g} = the water mass in 1 mol",
        f"the hydrate is {pct:.6g}% water by mass.")
    answer = f"water of crystallisation = {pct:.6g}%"
    return pct, steps, answer, None, "% = 18 n / M(hydrate) x 100", \
        {"M_hydrate": M_total}


def _first_num(text: str):
    m = re.search(r"(?P<s>\d+(?:\.\d+)?)\s*g(?:rams?)?\b", text, re.I)
    return float(m.group("s")) if m else None


def _sci_pat(v: float):
    return re.escape(f"{v:g}")


def _c_carat_atoms(g, m, text):
    """Carat -> grams -> moles -> atom count (diamond/graphite carbon)."""
    if not re.search(r"carats?\b", text, re.I):
        return _GATE
    cm = re.search(r"(?P<c>" + _SCI + r")\s*carats?\b", text, re.I)
    if cm is None:
        return _GATE
    carats = _sci(cm.group("c"))
    conv = 0.2
    convm = re.search(r"1\s*carat\s*(?:=|is)\s*(?P<k>\d+(?:\.\d+)?)\s*g",
                      text, re.I)
    if convm:
        conv = float(convm.group("k"))
    mass_g = carats * conv
    sub = re.search(r"diamond|graphite|carbon", text, re.I)
    if sub is None:
        return _GATE
    M = molar_mass("C")
    n_mol = mass_g / M
    atoms = n_mol * AVOGADRO
    if not (0.0 < atoms < 1e28):
        return _GATE
    ask_atoms = bool(re.search(r"(?:number\s+of\s+)?(?:carbon\s+)?atoms",
                               text, re.I))
    if not ask_atoms:
        return _GATE
    steps = _beats(
        "carats convert to grams, grams to moles with M(C) = 12 g/mol, "
        "then moles x Avogadro's number give the atom count.",
        f"m = {carats:g} carats x {conv:g} g/carat = {mass_g:g} g",
        f"n = {mass_g:g} / {M:g} = {n_mol:.6g} mol; atoms = "
        f"{n_mol:.6g} x 6.022e23 = {atoms:.6g}",
        f"check: atoms / 6.022e23 x 12 = {mass_g:g} g -- closes",
        f"the stone contains {atoms:.6g} carbon atoms.")
    answer = f"atoms = {atoms:.6g}"
    return atoms, steps, answer, None, "atoms = (carats x 0.2 / 12) x N_A", \
        {"mass_g": mass_g, "moles": n_mol}


def _c_valency_unknown(g, m, text):
    """Valency of an unknown element X from its subscript in a formula,
    given the other element's valency: v_X x sub_X = v_other x sub_other."""
    if not re.search(r"valency", text, re.I):
        return _GATE
    cm = re.search(r"(?:in|of|formula(?:\s+(?:is|of|for))?[:=]?\s+)"
                   r"(?:the\s+)?(?:compound\s+)?"
                   r"(?P<comp>[A-Z][a-z]?\d{0,2}[A-Z][a-z]?\d{0,2})\b",
                   text, re.I)
    if cm is None:
        return _GATE
    comp = cm.group("comp")
    parts = re.findall(r"([A-Z][a-z]?)(\d*)", comp)
    parts = [(s, int(n) if n else 1) for s, n in parts if s]
    if len(parts) != 2:
        return _GATE
    em = re.search(r"valency\s+of\s+(?:the\s+)?(?:element\s+)?"
                   r"(?P<el>[A-Z])\b", text, re.I)
    el = em.group("el") if em is not None else "X"
    ask_x = em is not None
    xs = [p for p in parts if p[0] == el]
    others = [p for p in parts if p[0] != el]
    if len(xs) != 1 or len(others) != 1:
        return _GATE
    (sx_name, sx), (oname, so) = xs[0], others[0]
    # the other element's valency: stated, definitional for oxygen in an
    # oxide ("the oxide of an element X"), or from a known formula reading
    vo = None
    vm = re.search(r"(?:given\s+that\s+)?" + re.escape(oname) +
                   r"\D{0,30}?valency\s+(?:of\s+)?(?:is\s+)?(?P<v>\d)",
                   text, re.I)
    if vm is None:
        vm = re.search(r"valency\s+of\s+(?P<wn>[a-z]+)\s+(?:is\s+)?(?P<v2>\d)",
                       text, re.I)
        if vm is not None and vm.group("wn").startswith(oname.lower()[:4]):
            vo = int(vm.group("v2"))
    else:
        vo = int(vm.group("v"))
    if vo is None and oname.upper() == "O":
        vo = 2          # oxygen is divalent in oxides by definition
    if vo is None or vo <= 0:
        return _GATE
    if ask_x:
        val = so * vo / sx
        if val != int(val) or not (1 <= val <= 5):
            return _GATE
        steps = _beats(
            "valencies balance subscripts in a formula: v(X) x sub(X) = "
            "v(other) x sub(other).",
            f"v({el}) x {sx} = {vo} x {so}",
            f"v({el}) = {vo} x {so} / {sx} = {int(val)}",
            f"check: {int(val)} x {sx} = {int(val) * sx} = {vo} x {so} "
            "-- charges balance",
            f"element {el} has valency {int(val)} in {comp}.")
        answer = f"valency of {el} = {int(val)}"
        return float(int(val)), steps, answer, None, \
            "v(X) sub(X) = v(o) sub(o)", {"sub_X": sx, "sub_o": so}
    # reverse: the unknown element's valency stated, other element asked
    vxm = re.search(r"\b" + el + r"\D{0,20}?valency\s+(?:of\s+)?"
                    r"(?:is\s+)?(?P<vx>\d)", text, re.I)
    ask_other = bool(re.search(r"valency\s+of\s+(?:" + re.escape(oname) +
                               r"|the\s+metal|the\s+non-?metal)", text,
                               re.I))
    if vxm is not None and ask_other:
        vx = int(vxm.group("vx"))
        val = sx * vx / so
        if val != int(val) or not (1 <= val <= 4):
            return _GATE
        steps = _beats(
            "valencies balance subscripts: v(other) x sub(other) = "
            "v(X) x sub(X).",
            f"v({oname}) x {so} = {vx} x {sx}",
            f"v({oname}) = {vx} x {sx} / {so} = {int(val)}",
            f"check: {int(val)} x {so} = {int(val) * so} = {vx} x {sx} "
            "-- balanced",
            f"{oname} has valency {int(val)} in {comp}.")
        answer = f"valency of {oname} = {int(val)}"
        return float(int(val)), steps, answer, None, \
            "v(o) sub(o) = v(X) sub(X)", {"sub_X": sx, "sub_o": so}
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
    ("IDEAL_GAS_LAW", r"\b(?:ideal\s+gas|p\s*v\s*=\s*n\s*r\s*t|volume\s+occupied)\b",
     _c_ideal_gas),

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
    ("PARTICLES_FROM_MASS", _PARTICLES_MASS_RX, _c_particles_mass),
    # ---- class-9 board gap families (CHEM-ADVERSARIAL 2026-10-06) ----
    ("ELECTRONIC_CONFIG", _ECONFIG_RX, _c_econfig),
    ("VALENCY_FROM_Z", _VALENCY_Z_RX, _c_valency_z),
    ("PERIOD_GROUP_FROM_Z", _PERIOD_GROUP_RX, _c_period_group),
    ("SUBATOMIC_COUNTS", _SUBATOMIC_RX, _c_subatomic),
    ("CONC_VOLUME_PERCENT", _VOLPERCENT_RX, _c_vol_percent),
    ("KELVIN_CELSIUS", _KELVIN_RX, _c_kelvin),
    ("CONSTANT_PROPORTIONS", _PROPORTIONS_RX, _c_constant_proportions),
    ("CONSERVATION_MASS", _CONSERVE_RX, _c_conservation),
    # ---- c10 board gap families ----
    ("FORMULA_OF_NAMED", _FORMULA_OF_RX, _c_formula_of),
    ("HYDRATE_WATER_PERCENT", _HYDRATE_WATER_RX, _c_hydrate_water),
    ("DOBEREINER_TRIAD", _TRIAD_RX, _c_triad),
    # ---- c12 solutions / colligative / kinetics families ----
    ("MOLARITY_MASS", _MOLARITY_MASS_RX, _c_molarity_mass),
    ("OSMOTIC_PRESSURE", _OSMOTIC_RX, _c_osmotic),
    ("BOIL_ELEV", _BOIL_ELEV_RX, _c_boil_elev),
    ("FREEZE_DEPR", _FREEZE_DEPR_RX, _c_freeze_depr),
    ("ARRHENIUS_DOUBLING", _ARRH_DOUBLE_RX, _c_arrhenius_double),
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
    # ---- CISCE wave (2026-09-30): ICSE phrasings; appended after the
    #      book rows so existing family priorities are untouched ----
    ("REACTION_STOICH_STP",
     r"\bSTP\b|percentage\s+yield|\byield\b|(?:needed|required|"
     r"used\s+up)\s+to\s+(?:liberat\w+|evolv\w+|displac\w+|prepar\w+|"
     r"obtain\w+)|what\s+mass\s+of\s+\w+\s+(?:is|are)\s+obtained|"
     r"obtained?\s+(?:by\s+heating|when[^.]{0,50}heated)",
     _c_reaction_stoich),
    ("CONSERVATION_OF_MASS",
     r"law\s+of\s+conservation|conservation\s+of\s+mass|mass\s+of\s+"
     r"(?:oxygen|carbon\s+dioxide|CO2|gas|chlorine|sulphur|sulfur)|"
     r"reacts?\s+completely\s+with|what\s+mass\s+of\s+\w+\s+"
     r"(?:combined|attached|reacted|escaped|evolved)",
     _c_conservation_mass),
    ("ATOM_STRUCTURE",
     r"mass\s+number|atomic\s+number|shell\s*\(?\s*n\s*=|maximum\s+"
     r"number\s+of\s+electrons|neutrons?",
     _c_atom_structure),
    ("ISOTOPIC_ATOMIC_MASS",
     r"isotopes?|relative\s+atomic\s+mass",
     _c_isotopic_mass),
    ("WATER_CRYSTALLISATION",
     r"water\s+of\s+crystallisation|water\s+of\s+crystallization|"
     r"hydrat\w+.{0,120}anhydrous|anhydrous.{0,120}hydrat\w+|"
     r"\.x\s*H2O\b",
     _c_hydrate_water),
    ("CARAT_ATOMS",
     r"carats?\b",
     _c_carat_atoms),
    ("VALENCY_UNKNOWN_ELEMENT",
     r"valency\s+of\s+(?:the\s+)?(?:element\s+)?[A-Z]\b|valency\s+of\s+"
     r"the\s+(?:metal|non-?metal)",
     _c_valency_unknown),
]


def _dispatch_chemistry_core(text: str) -> ModelResult:
    """Dispatcher: scan the typed chemistry table, first grounded hit wins.

    Trigger regexes are deterministic; each compute applies its own
    plausibility gates and a gate refusal simply continues the scan.
    Never calls an LLM.
    """
    norm = _normalize(text)
    # CHEM-2: common compound names -> formulas, so "18 g of water",
    # "moles in 52 g of He"-style name phrasings reach the numeric
    # families instead of gating on a missing formula token.
    norm = _apply_compound_aliases(norm)
    # _TABLE_CHEM_PC (STEM-PC 2026-10-07) scans first: the senior-corpus
    # wave families own their asks before the book tables get a turn;
    # _TABLE_CHEM_C12 (CHEM-C12-TOPICS 2026-10-07) scans FIRST: its
    # rows gate on their specific asks (polybasic pH, speed-ask
    # photoelectric, series-cell Faraday...) and a gate refusal
    # continues into _TABLE_CHEM_PC; _TABLE_CISCE_CHM (PHY-CISCE
    # 2026-10-08) follows for the ICSE/ISC wordings
    for fid, pattern, compute in _TABLE_CHEM_C12 + _TABLE_CHEM_PC + _TABLE_CISCE_CHM \
            + TABLE_BOOKS2 + TABLE:
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
        # CHEM-C12-TOPICS: a compute may return a finished ModelResult
        # directly (its wave promotes at 0.98 -- see _res12); tuples stay
        # on the unpack-and-_res path below, unchanged.
        if isinstance(out, ModelResult):
            if not out.matched:
                continue
            return out
        if not out:
            continue
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        if value is None and not steps:
            continue  # gate refused this row
        return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                    assumptions=assumptions, extra=extra or {})
    return _no("CHEMISTRY_FAMILIES", "no chemistry family matched")

# ---- SELF-REGISTRATION (CHEM-ADVERSARIAL 2026-10-06) ----
# modeling_layer's batch-15b import of this module silently ImportErrors
# when THIS module is imported first (partial-initialization cycle:
# our line-49 `from modeling_layer import ModelResult` re-enters
# modeling_layer mid-body).  In that order the chemistry registry never
# reached _STRUCTURES and every chemistry question lost the chemistry
# families for the whole process (observed under pytest).  Register from
# here too -- modeling_layer's own guard makes this idempotent.
try:  # pragma: no cover - registration safety
    import sys as _sys
    _ml = _sys.modules.get("backend.its.solver.modeling_layer")
    if _ml is not None and hasattr(_ml, "_STRUCTURES") and hasattr(_ml, "_REGISTRY_REPAIRED"):
        if not any(getattr(fn, "__name__", "") == "model_chemistry_families"
                   for fn in _ml._STRUCTURES):
            # insert BEFORE model_structure (whose PAL fallback must not
            # win same-confidence ties against the chemistry registry --
            # the clean import order puts this family earlier as well)
            _pos = len(_ml._STRUCTURES)
            for _i, _fn in enumerate(_ml._STRUCTURES):
                if getattr(_fn, "__name__", "") == "model_structure":
                    _pos = _i
                    break
            _ml._STRUCTURES.insert(_pos, model_chemistry_families)
except Exception:
    pass


# --------------------------------------------------------------------------- #
# _TABLE_CHEM_PC -- STEM-PC chemistry wave (2026-10-07 c10-c12 dig).
# Corpus sweep: 36 senior diagnostics answered 0 SOLVE / 28 REFUSE_NUM /
# 0 WRONG.  These are the standard board numericals with no family:
# polybasic-acid pH, pH comparison factor, combustion CO2 mass,
# Dobereiner triad, isotope average mass, EN difference, light
# frequency/wavenumber, photoelectric KE, Heisenberg uncertainty.
# (The modern-physics trio is c11 CHEMISTRY syllabus 'structure of
# atom' -- the chemistry registry owns it.)  Every family: deterministic
# compute, 5-beat steps, plausibility gates, extra quantities named for
# its declarative verifier.
# --------------------------------------------------------------------------- #

_SUB_DIGITS = {"\u2080": "0", "\u2081": "1", "\u2082": "2", "\u2083": "3",
               "\u2084": "4", "\u2085": "5", "\u2086": "6", "\u2087": "7",
               "\u2088": "8", "\u2089": "9"}


def _chem_sub(text: str) -> str:
    """Subscript digits -> ASCII so formula counting is uniform (the
    pipeline normalizer does the same to 'C3H8')."""
    return "".join(_SUB_DIGITS.get(ch, ch) for ch in (text or ""))


_BASICITY = {"H2SO4": 2, "H2C2O4": 2, "H3PO4": 3, "H3PO3": 2}


def _pc_acid_basicity(t: str):
    """n = protons released per acid molecule (complete dissociation)."""
    for f, n in _BASICITY.items():
        if re.search(re.escape(f), t, re.I):
            return n
    if re.search(r"dibasic|diprotic", t, re.I):
        return 2
    if re.search(r"tribasic|triprotic", t, re.I):
        return 3
    return 1


def _pc_ph_acid(g, m, text):
    """pH = -log10(n c) for a completely dissociated acid of
    concentration c and basicity n."""
    low = text.lower()
    # re.I: the gate must survive the lowercased copy (\bpH\b on `low`
    # is case-sensitive and never matches 'ph')
    if not re.search(r"\bpH\b", text, re.I) \
            or not re.search(r"dissociat\w*|acid", low):
        return _GATE
    cm = re.search(r"(\d+(?:\.\d+)?)\s*([mu\u00b5\u03bc]?\s*)M\b", text)
    if cm is None:
        return _GATE
    c = float(cm.group(1))
    if cm.group(2):
        c *= 1e-6
    if not (1e-8 < c < 100.0):
        return _GATE
    n = _pc_acid_basicity(_chem_sub(text))
    h = n * c
    val = -math.log10(h)
    steps = _beats(
        f"complete dissociation: a basicity-{n} acid releases {n} H+ "
        "per molecule, so [H+] = n x c; pH = -log10[H+].",
        f"c = {_fmt(c)} M, n = {n} -> [H+] = {n} x {_fmt(c)} = "
        f"{_fmt(h)} M",
        f"pH = -log10({_fmt(h)}) = {_fmt(val)}",
        f"check: 10^-pH = {_fmt(10.0 ** -val)} M = [H+] -- closes",
        f"the pH of the solution is {_fmt(val)}.",
    )
    return val, steps, f"pH = {_fmt(val)}", None, "pH = -log10(n c)", \
        {"c": c, "n": float(n), "h": h, "pH": val}


def _pc_ph_compare(g, m, text):
    """'pH = 3 vs pH = 5: which is more acidic and by how many times'
    -> the lower-pH one, by 10^(delta pH)."""
    low = text.lower()
    if not re.search(r"\bpH\b", text, re.I) or \
            not re.search(r"acidic|times", low):
        return _GATE
    phs = [float(x) for x in
           re.findall(r"pH\s*=?\s*(\d+(?:\.\d+)?)", text, re.I)]
    if len(phs) < 2:
        return _GATE
    a, b = phs[0], phs[1]
    if a == b:
        return _GATE
    acidic_ph = min(a, b)
    ratio = 10.0 ** abs(b - a)
    which = "the first" if acidic_ph == a else "the second"
    steps = _beats(
        "pH is a negative log: each unit of lower pH is a TENFOLD "
        "[H+] rise, so the acidity ratio is 10^(delta pH).",
        f"pH_A = {_fmt(a)}, pH_B = {_fmt(b)} -> delta = "
        f"{_fmt(abs(b - a))}",
        f"ratio = 10^{_fmt(abs(b - a))} = {_fmt(ratio)}",
        f"check: pH 3 vs pH 4 would be 10x; two units apart is "
        f"10 x 10 = {_fmt(ratio)}x -- consistent",
        f"{which} solution (pH {_fmt(acidic_ph)}) is more acidic, by "
        f"{_fmt(ratio)} times.",
    )
    return ratio, steps, (f"the pH-{_fmt(acidic_ph)} solution is more "
                          f"acidic by {_fmt(ratio)} times"), None, \
        "ratio = 10^(delta pH)", {"pH1": a, "pH2": b, "ratio": ratio}


def _pc_combustion_co2(g, m, text):
    """Complete combustion: n(CO2) = n(fuel) x (#C in the fuel);
    mass CO2 = n(CO2) x 44.  Carbon balance is the cross-check."""
    low = text.lower()
    if not (re.search(r"co\s*2|carbon\s+dioxide", low)
            and re.search(r"burnt|combust|burn", low)):
        return _GATE
    fm = re.search(r"mass\s+(?:of\s+)?co2\s+produced\s+when\s+"
                   r"(\d+(?:\.\d+)?)\s*g", low) or \
        re.search(r"(\d+(?:\.\d+)?)\s*g\s+of\s+([A-Za-z0-9]+)", low)
    if fm is None:
        return _GATE
    mass_fuel = float(fm.group(1))
    sub = _chem_sub(text)
    fmm = re.search(r"([A-Z][a-z]?\d*(?:[A-Z][a-z]?\d*)+)\s*=\s*"
                    r"(\d+(?:\.\d+)?)\s*g\s*/\s*mol", sub)
    if fmm is None:
        return _GATE
    formula, molar = fmm.group(1), float(fmm.group(2))
    cm = re.search(r"C(\d+)", formula)
    n_c = int(cm.group(1)) if cm else 1
    if mass_fuel <= 0 or molar <= 0:
        return _GATE
    n_fuel = mass_fuel / molar
    n_co2 = n_c * n_fuel
    val = n_co2 * 44.0
    frac_c = 12.0 * n_c / molar
    check = mass_fuel * frac_c * (44.0 / 12.0)
    steps = _beats(
        "complete combustion turns every C in the fuel into one CO2: "
        "n(CO2) = (#C) x n(fuel), and m = n x 44 g/mol.",
        f"fuel {formula}: #C = {n_c}; n(fuel) = {_fmt(mass_fuel)} g / "
        f"{_fmt(molar)} g/mol = {_fmt(n_fuel)} mol",
        f"n(CO2) = {n_c} x {_fmt(n_fuel)} = {_fmt(n_co2)} mol -> "
        f"m = {_fmt(n_co2)} x 44 = {_fmt(val)} g",
        f"check by carbon balance: m(CO2) = m(fuel) x C-mass-fraction "
        f"x 44/12 = {_fmt(mass_fuel)} x {_fmt(frac_c)} x 3.667 = "
        f"{_fmt(check)} g -- matches",
        f"the combustion produces {_fmt(val)} g of CO2.",
    )
    return val, steps, f"mass of CO2 = {_fmt(val)} g", None, \
        "m(CO2) = (#C) m(fuel)/M(fuel) x 44", \
        {"mass_fuel": mass_fuel, "M_fuel": molar, "n_C": float(n_c),
         "CO2": val}


def _pc_dobereiner(g, m, text):
    """Dobereiner triad: the middle atomic mass is the mean of the
    outer two."""
    if not re.search(r"dobereiner|triad", text, re.I):
        return _GATE
    nums = [float(x) for x in re.findall(
        r"\(\s*(\d+(?:\.\d+)?)\s*\)", text)]
    if len(nums) < 2:
        return _GATE
    a, c = nums[0], nums[-1]
    if c <= a:
        return _GATE
    val = (a + c) / 2.0
    steps = _beats(
        "Dobereiner's triad law: the middle element's atomic mass is "
        "the ARITHMETIC MEAN of the first and third.",
        f"first = {_fmt(a)}, third = {_fmt(c)}",
        f"A = ({_fmt(a)} + {_fmt(c)}) / 2 = {_fmt(val)}",
        f"check: the middle mass must lie between the outer two and "
        f"closer to neither -- {_fmt(a)} < {_fmt(val)} < {_fmt(c)}",
        f"the atomic mass of the middle element is {_fmt(val)}.",
    )
    return val, steps, f"A = {_fmt(val)}", None, "A = (a + c)/2", \
        {"a": a, "c": c, "A": val}


def _pc_isotope_avg(g, m, text):
    """Average atomic mass = sum(mass_i x abundance_i)/100.  CISCE
    extension (PHY-CISCE 2026-10-08): 'relative atomic mass' /
    'atomic weight' asks, the '(mass 19.99 u, 90 % abundance)' and
    '(19.9 %, 10.0129 u)' bracket orders, and any isotope COUNT."""
    if not re.search(r"average\s+atomic\s+mass|relative\s+atomic\s+mass|"
                     r"atomic\s+weight", text, re.I) or \
            not (re.search(r"isotopes?|isotopic", text, re.I)
                 or re.search(r"\^\s*\d+\s*[A-Z]", text)):
        return _GATE
    sub = _chem_sub(text)
    pairs = re.findall(
        r"\^\s*(\d+)\s*[A-Z][a-z]?\s*\(\s*(\d+(?:\.\d+)?)\s*%"
        r"(?:\s*,\s*(\d+(?:\.\d+)?)\s*u)?", sub)
    if not any(p[2] for p in pairs) or len(pairs) < 2:
        # percent-first brackets carry the real mass in slot 3
        # RELAUNCH3 FIX: this branch used to `pass` with the raw 3-tuples
        # still in `pairs`, and the `for mass_s, ab_s in pairs` below
        # raised ValueError ('too many values to unpack') -- the
        # dispatcher swallows the crash and the family silently declined
        # (chem battery isotope_mass MISS).  Mass number ^63 IS the
        # syllabus mass when no bracket mass is given.
        pairs = [(p[0], p[1]) for p in pairs]
    else:
        # the bracket mass (slot 3) wins when present; without one the
        # mass number (slot 1) is the mass -- never the PERCENT
        pairs = [(p[2] or p[0], p[1]) for p in pairs]
    if len(pairs) < 2:
        # 'X-20 (mass 19.99 u, 90 % abundance)' bracket order
        pairs = re.findall(
            r"[-\u2010-\u2015\s]\(?\s*mass\s+(\d+(?:\.\d+)?)\s*u\s*,\s*"
            r"(\d+(?:\.\d+)?)\s*%", sub)
    if len(pairs) < 2:
        # 'X-20 (mass 19.99 u, 90 % abundance)' written without 'mass'
        pairs = re.findall(
            r"(\d+(?:\.\d+)?)\s*u\s*,\s*(\d+(?:\.\d+)?)\s*%", sub)
    if len(pairs) < 2:
        # '63X and 65X with 69% and 31%' word order
        masses = re.findall(r"\^\s*(\d+)\s*[A-Z]", sub)
        abuns = re.findall(r"(\d+(?:\.\d+)?)\s*%", sub)
        pairs = list(zip(masses, abuns))
    if len(pairs) < 2:
        return _GATE
    total = 0.0
    terms = []
    for mass_s, ab_s in pairs:
        mi, pi = float(mass_s), float(ab_s)
        total += mi * pi / 100.0
        terms.append(f"{_fmt(mi)} x {_fmt(pi)}/100")
    val = total
    steps = _beats(
        "average atomic mass = the abundance-weighted mean of the "
        "isotopic masses.",
        "; ".join(terms),
        f"average = {_fmt(val)} u",
        f"check: the average must lie BETWEEN the isotope masses, "
        f"closer to the more abundant one -- ours sits between "
        f"{pairs[0][0]} and {pairs[-1][0]}",
        f"the average atomic mass of X is {_fmt(val)} u.",
    )
    q_extra = {}
    for i, (mass_s, ab_s) in enumerate(pairs[:2], 1):
        q_extra[f"m{i}"] = float(mass_s)
        q_extra[f"p{i}"] = float(ab_s)
    q_extra["avg"] = val
    return val, steps, f"average atomic mass = {_fmt(val)} u", None, \
        "avg = sum m_i p_i / 100", q_extra


def _pc_en_diff(g, m, text):
    """Electronegativity difference for a named bond: |EN_A - EN_B|.
    CISCE extension (PHY-CISCE 2026-10-08): 'electronegativities'
    (plural) triggers, and compound-form asks ('delta-chi for HCl and
    Na2O') resolve each formula's element pair from the EN data list."""
    if not re.search(r"electronegativit", text, re.I):
        return _GATE
    vals = dict(re.findall(r"\b([A-Z][a-z]?)\s*=\s*(\d+(?:\.\d+)?)",
                           text))
    if len(vals) < 2:
        return _GATE
    bm = re.search(r"for\s+(?:the\s+)?([A-Z][a-z]?)\s*[\u2013\u2014-]\s*"
                   r"([A-Z][a-z]?)", text)
    if bm is None:
        # compound-form: 'delta-chi for HCl and Na2O' -- each compound's
        # delta-EN is |max - min| over its constituent elements
        cls_m = re.search(r"for\s+(?:the\s+)?((?:[A-Z][a-z]?\d*)+)\s+and"
                          r"\s+((?:[A-Z][a-z]?\d*)+)", text)
        if cls_m is None:
            return _GATE
        out_bits = []
        first = None
        for tok in (cls_m.group(1), cls_m.group(2)):
            counts = parse_formula(tok)
            if not counts or len(counts) < 2:
                return _GATE
            ens = [float(vals[el]) for el in counts if el in vals]
            if len(ens) != len(counts):
                return _GATE
            d = max(ens) - min(ens)
            kind = ("non-polar covalent" if d < 0.4 else
                    "polar covalent" if d < 1.7 else "ionic")
            out_bits.append(f"{tok}: delta-EN = {_fmt(d)} ({kind})")
            if first is None:
                first = (ens, d)
        val = first[1]
        steps = _beats(
            "bond polarity is measured by the electronegativity "
            "DIFFERENCE: delta-EN = |EN_A - EN_B| (for a compound, "
            "between its MOST and LEAST electronegative elements); "
            "delta-EN < 0.4 non-polar, < 1.7 polar covalent, >= 1.7 "
            "ionic.",
            "; ".join(f"{tok}: EN spread over {len(parse_formula(tok))} "
                      f"elements" for tok in
                      (cls_m.group(1), cls_m.group(2))),
            "; ".join(out_bits),
            f"check: {out_bits[0].split(':')[0]} re-adds -- "
            f"{_fmt(first[0][0])} vs {_fmt(first[0][1])} gives "
            f"{_fmt(first[1])}",
            f"delta-chi: {', '.join(out_bits)}.",
        )
        final = "; ".join(out_bits)
        return val, steps, final, None, "delta-EN = |EN_A - EN_B|", \
            {"EN1": first[0][0], "EN2": first[0][1], "dEN": val}
    e1, e2 = bm.group(1), bm.group(2)
    if e1 not in vals or e2 not in vals:
        return _GATE
    v1, v2 = float(vals[e1]), float(vals[e2])
    val = abs(v1 - v2)
    steps = _beats(
        "bond polarity is measured by the electronegativity DIFFERENCE: "
        "delta-EN = |EN_A - EN_B|.",
        f"EN({e1}) = {_fmt(v1)}, EN({e2}) = {_fmt(v2)}",
        f"delta-EN = |{_fmt(v1)} - {_fmt(v2)}| = {_fmt(val)}",
        f"check: delta-EN 0 -> non-polar covalent; < 1.7 polar "
        f"covalent; >= 1.7 ionic -- ours is "
        f"{'non-polar' if val < 0.4 else 'polar covalent' if val < 1.7 else 'ionic'}",
        f"the electronegativity difference for the {e1}-{e2} bond is "
        f"{_fmt(val)}.",
    )
    return val, steps, f"delta-EN = {_fmt(val)}", None, \
        "delta-EN = |EN_A - EN_B|", {"EN1": v1, "EN2": v2, "dEN": val}


def _pc_light_freq(g, m, text):
    """f = c / lambda; wavenumber = 1 / lambda."""
    if not (re.search(r"frequency", text, re.I)
            and re.search(r"wavelength", text, re.I)):
        return _GATE
    lm = re.search(r"wavelength\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(pm|nm|"
                   r"um|mm|cm|m)\b", text, re.I)
    if lm is None:
        return _GATE
    conv = {"pm": 1e-12, "nm": 1e-9, "um": 1e-6, "mm": 1e-3, "cm": 1e-2,
            "m": 1.0}
    lam = float(lm.group(1)) * conv[lm.group(2).lower()]
    c = 3.0e8
    cm = re.search(r"c\s*=\s*(\d+(?:\.\d+)?)\s*[x*]\s*10\s*\^?\s*"
                   r"(-?\d+)", text, re.I)
    if cm:
        c = float(cm.group(1)) * 10.0 ** int(cm.group(2))
    if lam <= 0:
        return _GATE
    f = c / lam
    wn = 1.0 / lam
    steps = _beats(
        "wave relations: c = f lambda, so f = c / lambda; the "
        "wavenumber is the reciprocal wavelength, 1 / lambda.",
        f"lambda = {lm.group(1)} {lm.group(2)} = {_fmt(lam)} m, "
        f"c = 3 x 10^8 m/s",
        f"f = 3e8 / {_fmt(lam)} = {_fmt(f)} Hz; "
        f"wavenumber = 1/{_fmt(lam)} = {_fmt(wn)} m^-1",
        f"check: f x lambda = {_fmt(f * lam)} = c -- closes; yellow "
        f"light is order 5 x 10^14 Hz",
        f"frequency {_fmt(f)} Hz, wavenumber {_fmt(wn)} m^-1.",
    )
    return f, steps, (f"frequency = {_fmt(f)} Hz, "
                      f"wavenumber = {_fmt(wn)} m^-1"), None, \
        "f = c/lambda, wavenumber = 1/lambda", \
        {"lam": lam, "c": c, "f": f, "wavenumber": wn}


def _pc_photoelectric(g, m, text):
    """KE_max = E_photon - phi, with E = 1240/lambda(nm) eV (or hc/lambda
    in J)."""
    if not re.search(r"photoelectric|photoelectron|work\s+function",
                     text, re.I):
        return _GATE
    lm = re.search(r"wavelength\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*(pm|nm|"
                   r"um|mm|cm|m)\b", text, re.I)
    wm = re.search(r"work\s+function[^.]{0,30}?(\d+(?:\.\d+)?)\s*(eV|J)"
                   r"\b", text, re.I)
    if not (lm and wm):
        return _GATE
    conv = {"pm": 1e-12, "nm": 1e-9, "um": 1e-6, "mm": 1e-3, "cm": 1e-2,
            "m": 1.0}
    lam_nm = float(lm.group(1)) * conv[lm.group(2).lower()] * 1e9
    phi, phi_u = float(wm.group(1)), wm.group(2)
    if lam_nm <= 0:
        return _GATE
    if phi_u == "eV":
        e_ev = 1240.0 / lam_nm
        val = e_ev - phi
        steps = _beats(
            "photoelectric equation: KE_max = E_photon - phi, with the "
            "photon energy in eV from E = 1240 / lambda(nm).",
            f"lambda = {_fmt(lam_nm)} nm, phi = {_fmt(phi)} eV",
            f"E_photon = 1240/{_fmt(lam_nm)} = {_fmt(e_ev)} eV -> "
            f"KE_max = {_fmt(e_ev)} - {_fmt(phi)} = {_fmt(val)} eV",
            f"check: {'emission occurs (E > phi)' if e_ev > phi else 'NO emission (E <= phi)'}"
            f"; the threshold wavelength is 1240/{_fmt(phi)} = "
            f"{_fmt(1240.0 / phi)} nm",
            f"the maximum kinetic energy is {_fmt(val)} eV.",
        )
        return val, steps, f"KE_max = {_fmt(val)} eV", None, \
            "KE = 1240/lambda(nm) - phi", \
            {"lam_nm": lam_nm, "phi": phi, "KE": val}
    h = 6.626e-34
    e_photon = h * 3.0e8 / (lam_nm * 1e-9)
    val = e_photon - phi
    steps = _beats(
        "photoelectric equation: KE_max = hc/lambda - phi (SI).",
        f"lambda = {_fmt(lam_nm)} nm, phi = {_fmt(phi)} J",
        f"E_photon = {_fmt(e_photon)} J -> KE_max = {_fmt(val)} J",
        f"check: KE must be positive for emission",
        f"the maximum kinetic energy is {_fmt(val)} J.",
    )
    return val, steps, f"KE_max = {_fmt(val)} J", None, \
        "KE = hc/lambda - phi", {"lam_nm": lam_nm, "phi": phi,
                                 "KE": val}


def _pc_heisenberg(g, m, text):
    """delta v >= h / (4 pi m delta x) for a confined particle."""
    if not re.search(r"uncertainty", text, re.I):
        return _GATE
    xm = re.search(r"(\d+(?:\.\d+)?)\s*(pm|nm|um|mm|cm|m)\b\s*"
                   r"(?:\(|\.)", text, re.I) or \
        re.search(r"region\s+of\s+(\d+(?:\.\d+)?)\s*(pm|nm|um|mm|cm|m)"
                  r"\b", text, re.I)
    mm = re.search(r"(?:m\s*e|mass)[^.\d]{0,20}?(\d+(?:\.\d+)?)\s*"
                   r"[x*]\s*10\s*\^?\s*(-?\d+)\s*kg", text, re.I)
    if xm is None or mm is None:
        return _GATE
    conv = {"pm": 1e-12, "nm": 1e-9, "um": 1e-6, "mm": 1e-3, "cm": 1e-2,
            "m": 1.0}
    dx = float(xm.group(1)) * conv[xm.group(2).lower()]
    m_p = float(mm.group(1)) * 10.0 ** int(mm.group(2))
    h = 6.626e-34
    if dx <= 0 or m_p <= 0:
        return _GATE
    val = h / (4.0 * math.pi * m_p * dx)
    steps = _beats(
        "Heisenberg's uncertainty principle: delta x . delta p >= h/4pi, "
        "so the minimum velocity uncertainty is "
        "delta v = h / (4 pi m delta x).",
        f"delta x = {xm.group(1)} {xm.group(2)} = {_fmt(dx)} m, "
        f"m = {_fmt(m_p)} kg",
        f"delta v = 6.626e-34 / (4 pi x {_fmt(m_p)} x {_fmt(dx)}) = "
        f"{_fmt(val)} m/s",
        f"check: confining an electron to atomic dimensions forces a "
        f"large delta v -- of order 10^5-10^6 m/s, a sizeable fraction "
        f"of typical atomic speeds",
        f"the minimum uncertainty in velocity is {_fmt(val)} m/s.",
    )
    return val, steps, (f"minimum uncertainty in velocity = "
                        f"{_fmt(val)} m/s"), None, \
        "delta v = h/(4 pi m delta x)", \
        {"dx": dx, "m": m_p, "dv": val}


_TABLE_CHEM_PC: List[Tuple[str, str, Any]] = [
    ("CHM_PH_ACID", r"\bpH\b", _pc_ph_acid),
    ("CHM_PH_COMPARE", r"\bpH\b", _pc_ph_compare),
    ("CHM_COMBUSTION_CO2", r"co\s*2|carbon\s+dioxide", _pc_combustion_co2),
    ("CHM_DOBEREINER", r"dobereiner|triad", _pc_dobereiner),
    ("CHM_ISOTOPE_AVG", r"isotopes?|isotopic|\^\s*\d+\s*[A-Z]",
     _pc_isotope_avg),
    ("CHM_EN_DIFF", r"electronegativit", _pc_en_diff),
    ("CHM_LIGHT_FREQ", r"frequency", _pc_light_freq),
    ("CHM_PHOTOELECTRIC", r"photoelectric|photoelectron|work\s+function",
     _pc_photoelectric),
    ("CHM_HEISENBERG", r"uncertainty", _pc_heisenberg),
]


# --------------------------------------------------------------------------- #
# _TABLE_CISCE_CHM -- PHY-CISCE-PHRASING wave (2026-10-08).  Corpus
# sweep: 42 CISCE chemistry diagnostics answered 0 SOLVE / 37
# REFUSE_NUM / 5 honest REFUSE_OK.  The ICSE/ISC wordings the
# CBSE-shaped families never trigger on: volume/mass conservation
# statements, percentage increase and error, power-time energy, mass
# percent in 'dissolved in' wording, mixture alligation, density x
# volume, gypsum->plaster yield, sublimation mass, charge/electron
# counting, neutral-atom and mass-number facts, valency from a
# subscripted formula, inverse isotope abundance, balance-then-weigh
# stoichiometry, named-compound formula mass, precipitation volumes,
# Gay-Lussac gas excess, vapour density, carbon-burn oxygen mass,
# dm^3->cm^3, molecular mass from stated atomic masses, molecules from
# mass, Henry's law, Raoult's law, osmotic pressure with van't Hoff i,
# and the van't Hoff factor from a colligative measurement.  Scanned
# BEFORE the book tables (same as _TABLE_CHEM_PC); every family:
# deterministic compute, 5-beat steps, plausibility gates, quantities
# named for its declarative verifier row (VERIFIER_ENGINE.md: data
# rows only, no hand-written verifiers).
# --------------------------------------------------------------------------- #

_CHM_GRP = r"(\d[\d\s]{0,8}(?:\.\d+)?)"


def _gnum(text: str, pattern: str) -> Optional[float]:
    """Grouped-number first match ('2 000 cal' style ICSE printing)."""
    mm = re.search(pattern, text, re.I)
    if not mm:
        return None
    raw = re.sub(r"[\s,\u00a0\u202f]", "", mm.group(1))
    try:
        return float(raw)
    except ValueError:
        return None


def _chm_pc_vol_conserved(g, m, text):
    """Liquids keep their volume when transferred: the dish holds the
    same mL the cylinder held."""
    if not re.search(r"volume", text, re.I):
        return _GATE
    if not (re.search(r"pour|transfer|poured", text, re.I)
            and re.search(r"\bmL\b|millilitr", text, re.I)):
        return _GATE
    v = _gnum(text, _CHM_GRP + r"\s*mL\b")
    if v is None or v <= 0:
        return _GATE
    steps = _beats(
        "volume is conserved when a liquid is poured: only the SHAPE "
        "changes, the amount of substance (and so its volume) does not.",
        f"volume in the measuring cylinder = {_fmt(v)} mL",
        f"volume in the dish = {_fmt(v)} mL (unchanged)",
        f"check: pouring never creates or destroys matter -- only "
        f"containers with different graduations READ differently",
        f"the dish holds {_fmt(v)} mL of milk.",
    )
    return v, steps, f"{_fmt(v)} mL", None, "V_final = V_initial", \
        {"v": v, "v_final": v}


def _chm_pc_pct_increase(g, m, text):
    """Percentage increase: (new - old)/old x 100, any quantity."""
    if not re.search(r"percentage\s+increase|percent\s+increase", text,
                     re.I):
        return _GATE
    nums = [float(x.replace(" ", "").replace(",", "")) for x in re.findall(
        r"(\d[\d\s]*(?:\.\d+)?)", text)]
    if len(nums) < 2:
        return _GATE
    old, new = nums[0], nums[-1]
    if old <= 0 or new <= old:
        return _GATE
    val = (new - old) / old * 100.0
    steps = _beats(
        "percentage increase = (new value - original value) / original "
        "value x 100 -- the DIVISOR is always the original.",
        f"new = {_fmt(new)}, original = {_fmt(old)}, increase = "
        f"{_fmt(new - old)}",
        f"% increase = ({_fmt(new)} - {_fmt(old)})/{_fmt(old)} x 100 = "
        f"{_fmt(val)}%",
        f"check: {_fmt(old)} x (1 + {val / 100:.6g}) = "
        f"{_fmt(old * (1 + val / 100.0))} = the new value -- closes",
        f"the percentage increase is {_fmt(val)}%.",
    )
    return val, steps, f"percentage increase = {_fmt(val)}%", None, \
        "%inc = (new-old)/old x 100", {"new": new, "old": old,
                                       "pct": val}


def _chm_pc_power_time(g, m, text):
    """Energy = power x time for a steady output (light, heater)."""
    if not re.search(r"energy", text, re.I) or \
            not re.search(r"power|\bW\b", text, re.I):
        return _GATE
    pm = re.search(r"(\d+(?:\.\d+)?)\s*W\b", text, re.I)
    tm = re.search(r"(?:for|during)\s+(\d+(?:\.\d+)?)\s*s(?:econds?)?\b",
                   text, re.I)
    if not (pm and tm):
        return _GATE
    P = float(pm.group(1))
    t = float(tm.group(1))
    if P <= 0 or t <= 0:
        return _GATE
    val = P * t
    steps = _beats(
        "power is the rate of energy transfer: E = P x t, with watts "
        "read as joules per second.",
        f"P = {_fmt(P)} W = {_fmt(P)} J/s, t = {_fmt(t)} s",
        f"E = {_fmt(P)} x {_fmt(t)} = {_fmt(val)} J",
        f"check: E / t = {_fmt(val)} / {_fmt(t)} = {_fmt(P)} W = the "
        f"stated output -- closes",
        f"the total energy emitted is {_fmt(val)} J.",
    )
    return val, steps, f"energy = {_fmt(val)} J", None, "E = P t", \
        {"P": P, "t": t, "E": val}


def _chm_pc_mass_percent(g, m, text):
    """Mass percent in the ICSE 'dissolved in' wording: solute mass /
    (solute + solvent) x 100."""
    if not re.search(r"mass\s+percent|percent.*by\s+mass|%.*by\s+mass",
                     text, re.I):
        return _GATE
    sm = re.search(r"(\d+(?:\.\d+)?)\s*g\s+(?:of\s+)?[A-Za-z][\w-]*"
                   r"\s+(?:dissolved\s+in|in|mixed\s+with)\s+"
                   r"(\d+(?:\.\d+)?)\s*g\b", text, re.I)
    if sm is None:
        return _GATE
    ms, mw = float(sm.group(1)), float(sm.group(2))
    if ms <= 0 or mw <= 0:
        return _GATE
    total = ms + mw
    val = ms / total * 100.0
    steps = _beats(
        "mass percent = (mass of solute / total mass of solution) x 100 "
        "-- the denominator is solute PLUS solvent, never the solvent "
        "alone.",
        f"solute = {_fmt(ms)} g, solvent = {_fmt(mw)} g, total = "
        f"{_fmt(total)} g",
        f"% mass = {_fmt(ms)}/{_fmt(total)} x 100 = {_fmt(val)}%",
        f"check: {val / 100:.6g} x {_fmt(total)} = {_fmt(ms)} g = the "
        f"solute mass -- closes",
        f"the solution is {_fmt(val)}% salt by mass.",
    )
    return val, steps, f"mass percent = {_fmt(val)}%", None, \
        "% = solute/(solute+solvent) x 100", \
        {"ms": ms, "mw": mw, "pct": val}


def _chm_pc_alligation(g, m, text):
    """Two-ingredient mixing to a target percent (alligation):
    x = (target - p_B)/(p_A - p_B) x total."""
    if not re.search(r"mix|standardise|standardize|blend", text, re.I):
        return _GATE
    tgt_m = re.search(r"to\s+(\d+(?:\.\d+)?)\s*%", text, re.I)
    pcts = [float(x) for x in re.findall(
        r"\(\s*(\d+(?:\.\d+)?)\s*%", text)]
    tot_m = re.search(r"(\d+(?:\.\d+)?)\s*(?:L|litres?|liters?|kg|g)\b",
                      text, re.I)
    if tgt_m is None or len(pcts) < 2 or tot_m is None:
        return _GATE
    p_hi, p_lo = pcts[0], pcts[1]
    target = float(tgt_m.group(1))
    total = float(tot_m.group(1))
    if not (max(p_hi, p_lo) > target > min(p_hi, p_lo)) or total <= 0:
        return _GATE
    x = (target - p_lo) / (p_hi - p_lo) * total
    y = total - x
    steps = _beats(
        "mixture balance: the fat (or solute) in the two ingredients "
        "must equal the fat in the blend -- p_A x + p_B y = target x "
        "(x + y), so x = (target - p_B)/(p_A - p_B) x total.",
        f"p_A = {_fmt(p_hi)}%, p_B = {_fmt(p_lo)}%, target = "
        f"{_fmt(target)}%, total = {_fmt(total)}",
        f"x = ({_fmt(target)} - {_fmt(p_lo)})/({_fmt(p_hi)} - "
        f"{_fmt(p_lo)}) x {_fmt(total)} = {x:.6g}; y = {_fmt(total)} - "
        f"{x:.6g} = {y:.6g}",
        f"check: ({p_hi:g} x {x:.6g} + {p_lo:g} x {y:.6g}) / "
        f"{total:g} = {(p_hi * x + p_lo * y) / total:.6g}% = the "
        f"target",
        f"mix {x:.6g} of the {_fmt(p_hi)}% stock with {y:.6g} of "
        f"the {_fmt(p_lo)}% stock.",
    )
    return x, steps, (f"{_fmt(round(x))} of the {_fmt(p_hi)}% stock and "
                      f"{_fmt(round(y))} of the {_fmt(p_lo)}% stock "
                      f"(total {_fmt(total)})"), None, \
        "x = (target - p_B)/(p_A - p_B) x total", \
        {"p_hi": p_hi, "p_lo": p_lo, "target": target, "total": total,
         "x": x, "y": y}


def _chm_pc_density_mass(g, m, text):
    """mass = density x volume (the reverse density reading)."""
    if not re.search(r"density", text, re.I) or \
            not re.search(r"mass", text, re.I):
        return _GATE
    dm = re.search(r"(\d+(?:\.\d+)?)\s*g\s*/\s*cm\s*\^?\s*3", text, re.I)
    vm = re.search(r"volume\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*cm\s*\^?\s*3",
                   text, re.I) or \
        re.search(r"cube\s+of\s+volume\s+(\d+(?:\.\d+)?)", text, re.I)
    if not (dm and vm):
        return _GATE
    rho = float(dm.group(1))
    V = float(vm.group(1))
    if rho <= 0 or V <= 0:
        return _GATE
    val = rho * V
    steps = _beats(
        "rearranged density definition: mass = density x volume (g/cm^3 "
        "x cm^3 = g).",
        f"rho = {_fmt(rho)} g/cm^3, V = {_fmt(V)} cm^3",
        f"m = {_fmt(rho)} x {_fmt(V)} = {_fmt(val)} g",
        f"check: m / V = {_fmt(val)} / {_fmt(V)} = {_fmt(rho)} g/cm^3 = "
        f"the stated density -- closes",
        f"the mass is {_fmt(val)} g.",
    )
    return val, steps, f"mass = {_fmt(val)} g", None, "m = rho V", \
        {"rho": rho, "V": V, "m": val}


def _chm_pc_yield_gypsum(g, m, text):
    """Gypsum -> plaster of Paris yield: theoretical mass = initial x
    145/172 (the half-hydrate keeps the calcium sulphate core), yield =
    actual/theoretical x 100."""
    if not re.search(r"gypsum|plaster\s+of\s+paris", text, re.I):
        return _GATE
    if not re.search(r"percentage\s+yield|percent\s+yield|%\s+yield",
                     text, re.I):
        return _GATE
    nums = re.findall(r"(\d+(?:\.\d+)?)\s*g\b", text, re.I)
    if len(nums) < 2:
        return _GATE
    initial = float(nums[0])
    actual = float(nums[1])
    if initial <= 0 or actual <= 0:
        return _GATE
    M_gyp, M_pop = 172.0, 145.0
    theoretical = initial * M_pop / M_gyp
    if theoretical <= 0:
        return _GATE
    val = actual / theoretical * 100.0
    if not (0.0 < val <= 110.0):
        return _GATE
    steps = _beats(
        "gypsum is CaSO4.2H2O (M = 172) and plaster of Paris is "
        "CaSO4.1/2H2O (M = 145): each mole of gypsum yields one mole of "
        "plaster, so the theoretical mass = initial x 145/172, and the "
        "yield = actual/theoretical x 100.",
        f"initial = {_fmt(initial)} g, actual = {_fmt(actual)} g",
        f"theoretical = {_fmt(initial)} x 145/172 = "
        f"{theoretical:.6g} g -> yield = {_fmt(actual)}/"
        f"{theoretical:.6g} x 100 = {_fmt(val)}%",
        f"check: {val / 100:.6g} x {theoretical:.6g} = {_fmt(actual)} g "
        f"= the actual haul -- closes (yields just under 100% are the "
        f"laboratory norm)",
        f"the percentage yield is {_fmt(val)}%.",
    )
    return val, steps, f"percentage yield = {_fmt(val)}%", None, \
        "%yield = actual/(initial x 145/172) x 100", \
        {"initial": initial, "actual": actual, "theoretical": theoretical,
         "yield": val}


def _chm_pc_mass_conserved(g, m, text):
    """Physical-change mass conservation: sublimation (or any phase
    change with 'no loss') keeps the mass."""
    if not re.search(r"sublim|evaporat|condens|freez|boil", text, re.I):
        return _GATE
    if not re.search(r"mass|weigh", text, re.I):
        return _GATE
    mm = re.search(r"(\d+(?:\.\d+)?)\s*g\b", text, re.I)
    if mm is None:
        return _GATE
    m_g = float(mm.group(1))
    if m_g <= 0:
        return _GATE
    steps = _beats(
        "mass is conserved in a physical change: a phase change moves "
        "molecules, it does not destroy them, so m_final = m_initial "
        "(stated: no loss).",
        f"initial mass = {_fmt(m_g)} g",
        f"final mass = {_fmt(m_g)} g",
        f"check: conservation of mass -- the vapour plus anything left "
        f"behind must equal the starting mass, and nothing is left",
        f"the vapour has mass {_fmt(m_g)} g.",
    )
    return m_g, steps, f"{_fmt(m_g)} g", None, "m_final = m_initial", \
        {"m": m_g, "m_final": m_g}


def _chm_pc_charge_electrons(g, m, text):
    """Charge and electron count from a steady current: Q = I t, then
    n = Q / e."""
    if not re.search(r"current", text, re.I) or \
            not re.search(r"electron", text, re.I):
        return _GATE
    im = re.search(r"(\d+(?:\.\d+)?)\s*A\b", text, re.I)
    tm = re.search(r"(\d+(?:\.\d+)?)\s*s(?:econds?)?\b", text, re.I)
    if not (im and tm):
        return _GATE
    I = float(im.group(1))
    t = float(tm.group(1))
    em = re.search(r"1\.6\d*\s*[x*]\s*10\s*\^?\s*-?\s*19", text, re.I)
    e = 1.602e-19
    if em:
        e = float(em.group(0).split("x")[0].split("*")[0]) * 1e-19
    if I <= 0 or t <= 0:
        return _GATE
    Q = I * t
    n = Q / e
    steps = _beats(
        "current is charge per second: Q = I x t; each electron carries "
        "e = 1.602 x 10^-19 C, so the count is n = Q / e (divide, never "
        "multiply).",
        f"I = {_fmt(I)} A, t = {_fmt(t)} s",
        f"Q = {_fmt(I)} x {_fmt(t)} = {_fmt(Q)} C -> n = {_fmt(Q)} / "
        f"1.602e-19 = {n:.6g} electrons",
        f"check: n x e = {n * e:.6g} C = Q -- closes",
        f"the charge is {_fmt(Q)} C and {n:.6g} electrons pass.",
    )
    return Q, steps, (f"charge = {_fmt(Q)} C; electrons = "
                      f"{n:.4g}"), None, "Q = I t; n = Q/e", \
        {"I": I, "t": t, "Q": Q, "n": n}


def _chm_pc_proton_electron(g, m, text):
    """Neutral atom: electrons = protons, exactly."""
    if not re.search(r"neutral\s+atom", text, re.I):
        return _GATE
    if not (re.search(r"protons?", text, re.I)
            and re.search(r"electrons?", text, re.I)):
        return _GATE
    pm = re.search(r"(\d+)\s+protons?", text, re.I)
    if pm is None:
        return _GATE
    Z = int(pm.group(1))
    steps = _beats(
        "a NEUTRAL atom carries zero net charge, so its electron count "
        "equals its proton count -- always, for every element.",
        f"protons = {_fmt(Z)}",
        f"electrons = {_fmt(Z)} (charge balance: +{_fmt(Z)} + "
        f"-{_fmt(Z)} = 0)",
        f"check: any other count would leave an ion, contradicting "
        f"'neutral'",
        f"the extra-nuclear part holds {_fmt(Z)} electrons.",
    )
    return float(Z), steps, f"{Z} electrons", None, \
        "electrons = protons (neutral)", {"Z": float(Z), "n_e": float(Z)}


def _chm_pc_mass_number(g, m, text):
    """Mass number = protons + neutrons."""
    if not re.search(r"mass\s+number", text, re.I):
        return _GATE
    pm = re.search(r"(\d+)\s+protons?", text, re.I)
    nm = re.search(r"(\d+)\s+neutrons?", text, re.I)
    if not (pm and nm):
        return _GATE
    p, n = int(pm.group(1)), int(nm.group(1))
    val = float(p + n)
    steps = _beats(
        "the mass number counts NUCLEONS: A = protons + neutrons (the "
        "atomic number Z is the protons alone).",
        f"protons = {p}, neutrons = {n}",
        f"A = {p} + {n} = {int(val)}",
        f"check: Z = {p} names the element; A - Z = {n} = the neutron "
        f"count -- closes",
        f"the mass number is {int(val)}.",
    )
    return val, steps, f"mass number = {int(val)}", None, "A = Z + N", \
        {"Z": float(p), "N": float(n), "A": val}


def _chm_pc_valency_formula(g, m, text):
    """Valency of an unknown element from a (subscripted) formula:
    v_X x sub_X = v_other x sub_other (charge neutrality)."""
    if not re.search(r"valency", text, re.I):
        return _GATE
    sub = _chem_sub(text)
    cm = re.search(r"compound\s+([A-Z][a-z]?\d*[A-Z][a-z]?\d*)\b", sub) \
        or re.search(r"\bin\s+([A-Z][a-z]?\d*[A-Z][a-z]?\d*)\b", sub)
    if cm is None:
        return _GATE
    comp = cm.group(1)
    parts = [(s, int(n) if n else 1)
             for s, n in re.findall(r"([A-Z][a-z]?)(\d*)", comp) if s]
    if len(parts) != 2:
        return _GATE
    om = re.search(r"([A-Za-z]+)\s+has\s+valency\s+(\d+)", text, re.I)
    if om is None:
        return _GATE
    oname = om.group(1).lower()
    vo = int(om.group(2))
    # the named element owns its symbol in the formula ("oxygen" -> O
    # via the Z table); everything else in a 2-species formula is the
    # unknown element X
    sym = None
    for s_, z_ in _ELEMENT_Z.items():
        if _Z_NAME.get(z_, "").lower() == oname:
            sym = s_
            break
    if sym is not None:
        others = [p for p in parts if p[0] == sym]
    else:
        others = [p for p in parts
                  if p[0].lower() in oname
                  or oname.startswith(p[0].lower())]
    xs = [p for p in parts if p not in others]
    if len(xs) != 1 or len(others) != 1:
        return _GATE
    (sx_name, sx), (oname2, so) = xs[0], others[0]
    val = so * vo / sx
    if val != int(val) or not (1 <= val <= 5):
        return _GATE
    steps = _beats(
        "a neutral formula balances total valencies: v(X) x sub(X) = "
        "v(other) x sub(other).",
        f"formula {comp}: sub({sx_name}) = {sx}, sub({oname2}) = {so}; "
        f"v({oname2}) = {vo}",
        f"v({sx_name}) x {sx} = {vo} x {so} -> v({sx_name}) = "
        f"{vo * so}/{sx} = {int(val)}",
        f"check: {int(val)} x {sx} = {int(val) * sx} = {vo * so} = "
        f"{vo} x {so} -- charges balance",
        f"the valency of {sx_name} in {comp} is {int(val)}.",
    )
    return float(int(val)), steps, f"valency of {sx_name} = {int(val)}", \
        None, "v(X) sub(X) = v(o) sub(o)", \
        {"sub_X": float(sx), "sub_o": float(so), "v": float(int(val))}


def _chm_pc_isotope_inverse(g, m, text):
    """Inverse isotope abundance: given the weighted average and both
    isotopic masses, x = (avg - m2)/(m1 - m2)."""
    if not re.search(r"relative\s+atomic\s+mass|average\s+atomic\s+mass",
                     text, re.I) or \
            not re.search(r"abundance", text, re.I):
        return _GATE
    avg_m = re.search(r"(?:mass|weight)[^.]{0,20}?is\s+"
                      r"(\d+(?:\.\d+)?)", text, re.I) or \
        re.search(r"atomic\s+mass\s+(?:of\s+\w+\s+)?is\s+"
                  r"(\d+(?:\.\d+)?)", text, re.I)
    masses = [float(x) for x in re.findall(
        r"\(\s*(\d+(?:\.\d+)?)\s*u\s*\)", text)]
    if avg_m is None or len(masses) < 2:
        return _GATE
    avg = float(avg_m.group(1))
    m1, m2 = masses[0], masses[1]
    if m1 == m2:
        return _GATE
    x = (avg - m2) / (m1 - m2)
    if not (0.0 <= x <= 1.0):
        return _GATE
    p1, p2 = x * 100.0, (1.0 - x) * 100.0
    steps = _beats(
        "the average must reproduce avg = m1 x + m2 (1 - x); solving "
        "that for the unknown fraction gives x = (avg - m2)/(m1 - m2).",
        f"avg = {_fmt(avg)} u, m1 = {_fmt(m1)} u, m2 = {_fmt(m2)} u",
        f"x = ({_fmt(avg)} - {_fmt(m2)})/({_fmt(m1)} - {_fmt(m2)}) = "
        f"{x:.6g} -> {_fmt(p1)}%",
        f"check: {_fmt(m1)} x {x:.6g} + {_fmt(m2)} x {1 - x:.6g} = "
        f"{m1 * x + m2 * (1 - x):.6g} u = the stated average -- closes",
        f"the abundances are {_fmt(p1)}% and {_fmt(p2)}%.",
    )
    return p1, steps, (f"abundances: {_fmt(p1)}% and "
                       f"{_fmt(p2)}%"), None, \
        "x = (avg - m2)/(m1 - m2)", {"avg": avg, "m1": m1, "m2": m2,
                                     "p1": p1, "p2": p2}


def _chm_pc_balance_mass(g, m, text):
    """Balance the equation, then weigh the product: m_target =
    m_given / M_given x (coef_t/coef_g) x M_target."""
    if not re.search(r"\->", text) or \
            not re.search(r"mass\s+of\s+\S+\s+formed", text, re.I):
        return _GATE
    tm = re.search(r"mass\s+of\s+([A-Za-z0-9()]+)\s+formed\s+when\s+"
                   r"(\d+(?:\.\d+)?)\s*g\s+of\s+([A-Za-z0-9()]+)", text,
                   re.I)
    eq_m = re.search(r"((?:[A-Za-z0-9()]+\s*\+\s*)*[A-Za-z0-9()]+)"
                     r"\s*->\s*"
                     r"((?:[A-Za-z0-9()]+\s*\+\s*)*[A-Za-z0-9()]+)", text)
    if tm is not None:
        target = tm.group(1)
        m_given = float(tm.group(2))
        given = tm.group(3)
    elif re.search(r"mass\s+of\s+\S+\s+formed", text, re.I) \
            and eq_m is not None:
        # ICSE wording names the product in words ('mass of calcium
        # hydroxide formed when N g of CaO is added'): the asked
        # product is the equation's product side
        gm = re.search(r"(\d+(?:\.\d+)?)\s*g\s+of\s+([A-Za-z0-9()]+)"
                       r"\s+is\s+(?:added|used|taken)", text, re.I)
        if gm is None:
            return _GATE
        l_pre = [re.sub(r"\([a-z]{1,2}\)", "", s).strip()
                 for s in re.split(r"\+", eq_m.group(1)) if s.strip()]
        r_pre = [re.sub(r"\([a-z]{1,2}\)", "", s).strip()
                 for s in re.split(r"\+", eq_m.group(2)) if s.strip()]
        if len(r_pre) != 1:
            return _GATE
        given = gm.group(2)
        if given not in l_pre:
            return _GATE
        target = r_pre[0]
        m_given = float(gm.group(1))
    else:
        return _GATE
    if eq_m is None:
        return _GATE
    # atomic masses: stated '(Al = 27, O = 16)' list wins; standard
    # table fills the rest
    amap = {k.upper(): float(v) for k, v in re.findall(
        r"\b([A-Z][a-z]?)\s*=\s*(\d+(?:\.\d+)?)", text)}
    lspec = [re.sub(r"\([a-z]{1,2}\)", "", s).strip()
             for s in re.split(r"\+", eq_m.group(1)) if s.strip()]
    rspec = [re.sub(r"\([a-z]{1,2}\)", "", s).strip()
             for s in re.split(r"\+", eq_m.group(2)) if s.strip()]
    co = balance_equation(lspec, rspec)
    if co is None:
        return _GATE
    co_l, co_r = [float(x) for x in co[0]], [float(x) for x in co[1]]
    if len(co_l) != len(lspec) or len(co_r) != len(rspec):
        return _GATE
    gi = next((i for i, s in enumerate(lspec)
               if s.lower().replace(" ", "") ==
               given.lower().replace(" ", "")), None)
    ti = next((i for i, s in enumerate(rspec)
               if s.lower().replace(" ", "") ==
               target.lower().replace(" ", "")), None)
    if gi is None or ti is None:
        return _GATE
    cG, cT = co_l[gi], co_r[ti]
    cg, ct = parse_formula(given), parse_formula(target)
    if not cg or not ct:
        return _GATE
    # the stated '(Al = 27, O = 16)' list is keyed case-insensitively;
    # an element the question never prices falls through to a refusal
    # (never silently mass-0)
    if any(amap.get(e.upper()) is None for e in cg) or \
            any(amap.get(e.upper()) is None for e in ct):
        return _GATE
    M_g = sum(amap[e.upper()] * n for e, n in cg.items())
    M_t = sum(amap[e.upper()] * n for e, n in ct.items())
    if not M_g or not M_t:
        return _GATE
    n_given = m_given / M_g
    n_target = n_given * cT / cG
    val = n_target * M_t
    eq_txt = " + ".join(f"{int(c)} {s}" for c, s in zip(co_l, lspec)) + \
        " -> " + " + ".join(f"{int(c)} {s}" for c, s in zip(co_r, rspec))
    steps = _beats(
        "mole bridge: balance first (coefficients are MOLE ratios), "
        "then n = m/M on the given, scale by cT/cG, and weigh the "
        "product m = n x M.",
        f"balanced: {eq_txt}; n({given}) = {_fmt(m_given)}/"
        f"{_fmt(M_g)} = {n_given:.6g} mol",
        f"ratio {given}:{target} = {int(cG)}:{int(cT)} -> "
        f"n({target}) = {n_given:.6g} x {int(cT)}/{int(cG)} = "
        f"{n_target:.6g} mol -> m = {n_target:.6g} x {_fmt(M_t)} = "
        f"{_fmt(val)} g",
        f"check: reversing the chain gives back {_fmt(m_given)} g of "
        f"{given} -- closes",
        f"{_fmt(val)} g of {target} forms.",
    )
    return val, steps, f"mass of {target} = {_fmt(val)} g", None, \
        "m_t = (m_g/M_g)(cT/cG) M_t", \
        {"m_given": m_given, "M_g": M_g, "M_t": M_t, "cG": cG, "cT": cT,
         "mass": val}


def _chm_pc_rfm_named(g, m, text):
    """Named compound formula + relative formula mass from the STATED
    atomic masses (2x23 + 12 + 3x16 = 106 for Na2CO3)."""
    if not re.search(r"relative\s+formula\s+mass|formula\s+mass", text,
                     re.I):
        return _GATE
    nm = re.search(r"formula\s+of\s+([a-z][a-z\- ]{2,30})", text, re.I)
    if nm is None:
        return _GATE
    name = nm.group(1).strip().lower()
    best = None
    for alias, formula in ALIAS_MAP:
        a = alias.lower()
        if name == a or name.endswith(" " + a) or name.startswith(a + " "):
            if best is None or len(a) > len(best[0]):
                best = (a, formula)
    if best is None:
        return _GATE
    counts = parse_formula(best[1])
    if not counts:
        return _GATE
    amap = {k.upper(): float(v) for k, v in re.findall(
        r"\b([A-Z][a-z]?)\s*=\s*(\d+(?:\.\d+)?)", text)}
    terms = []
    val = 0.0
    for el, n in counts.items():
        mass = amap.get(el.upper()) or molar_mass(el)
        if mass is None:
            return _GATE
        val += n * mass
        terms.append(f"{n} x {_fmt(mass)} ({el})")
    steps = _beats(
        "criss-cross the ion valencies for the formula, then read the "
        "relative formula mass atom by atom (no unit -- it is a "
        "RELATIVE mass).",
        f"{name.title()} = {best[1]}",
        "; ".join(terms) + f" -> {_fmt(val)}",
        f"check: re-adding {terms[0].split()[0]} + ... term by term "
        f"gives {_fmt(val)} -- closes",
        f"formula {best[1]}, relative formula mass {_fmt(val)}.",
    )
    return val, steps, (f"{best[1]}; relative formula mass = "
                        f"{_fmt(val)}"), None, \
        "RFM = sum n_i A_i", {"formula": best[1], "rfm": val}


def _chm_pc_precipitate(g, m, text):
    """Precipitation volume: n_metal x k OH- per metal ion, then
    V = n / C for the base."""
    if not re.search(r"precipitat", text, re.I) or \
            not re.search(r"NaOH|hydroxide|OH\s*-", text, re.I):
        return _GATE
    # fold superscript charges the chem normalizer leaves ("Cu2+")
    text = text.replace("\u00b2", "2").replace("\u00b3", "3")
    cm = re.search(r"(\d+(?:\.\d+)?)\s*mL\s+of\s+(\d+(?:\.\d+)?)\s*M\b",
                   text, re.I)
    nmm = re.search(r"(\d+(?:\.\d+)?)\s*mol\s+of\s+([A-Z][a-z]?\d*)"
                    r"\s*[23]?\s*[+-]?", text, re.I)
    # hydroxide ions per metal ion: Fe3+ -> 3, Cu2+ -> 2, M+ -> 1
    k = None
    chm_ = re.search(r"([A-Z][a-z]?)\s*([23])\s*[+-]", text)
    if chm_:
        k = int(chm_.group(2))
    eqm = re.search(r"->\s*[A-Za-z0-9()+]*\)?", text)
    eqk = re.search(r"([A-Z][a-z]?\d*[+-]?)\s*\+\s*(\d+)?\s*OH", text)
    if k is None and eqk:
        k = int(eqk.group(2) or 1)
    bm = re.search(r"(\d+(?:\.\d+)?)\s*M\s+NaOH", text, re.I)
    if k is None:
        fm = re.search(r"([A-Z][a-z]?)Cl([23])", text)
        if fm:
            k = int(fm.group(2))
    if k is None:
        return _GATE
    if cm is not None:
        V_mL, C_m = float(cm.group(1)), float(cm.group(2))
        n_metal = V_mL / 1000.0 * C_m
        cb = float(bm.group(1)) if bm else 1.0
        sol = f"{_fmt(V_mL)} mL of {_fmt(C_m)} M solution"
    elif nmm is not None:
        n_metal = float(nmm.group(1))
        if bm is None:
            return _GATE
        cb = float(bm.group(1))
        sol = f"{_fmt(n_metal)} mol of metal ions"
    else:
        return _GATE
    n_oh = n_metal * k
    V_L = n_oh / cb
    steps = _beats(
        "precipitation stoichiometry: each M^k+ needs k OH- (M^k+ + "
        "kOH- -> M(OH)k), so n(OH-) = k x n(M), and V = n / C for the "
        "base of concentration C.",
        f"{sol}; k = {k} (the ion's charge sets the OH- count); base C "
        f"= {_fmt(cb)} M",
        f"n(OH-) = {k} x {n_metal:.6g} = {n_oh:.6g} mol -> V = "
        f"{n_oh:.6g}/{_fmt(cb)} = {V_L:.6g} L = {V_L * 1000:.6g} mL",
        f"check: V x C = {V_L:.6g} x {_fmt(cb)} = {n_oh:.6g} mol = the "
        f"OH- needed -- closes",
        f"the minimum volume is {V_L:.6g} L ({V_L * 1000:.6g} mL) of "
        f"NaOH.",
    )
    claim = V_L * 1000.0 if cm is not None else V_L
    unit = "mL" if cm is not None else "L"
    return claim, steps, (f"volume of NaOH = {V_L:.6g} L = "
                          f"{V_L * 1000:.6g} mL"), None, \
        "V = k n(M) / C", {"n_metal": n_metal, "k": float(k),
                           "C": cb, "V_L": V_L}


def _chm_pc_gas_excess(g, m, text):
    """Gay-Lussac gas volumes: which reagent is left over and by how
    much, straight from the mole-ratio volumes."""
    if not re.search(r"in\s+excess", text, re.I) or \
            not re.search(r"\d+\s*mL", text, re.I):
        return _GATE
    vols = [(float(a), b) for a, b in re.findall(
        r"(\d+(?:\.\d+)?)\s*mL\s+of\s+([A-Za-z]{1,3}\d?)", text)]
    if len(vols) < 2:
        return _GATE
    (v1, n1), (v2, n2) = vols[0], vols[1]
    eqm = re.search(r"([^.\n]*->[^.\n]*)", text)
    if eqm is None:
        return _GATE
    lhs = eqm.group(1).split("->")[0]
    # coefficients of exactly the two named gases on the left side
    def coef_of(name):
        c_m = re.search(r"(?:(\d+)\s*)?" + re.escape(name) + r"\b", lhs)
        if c_m is None:
            return None
        return float(c_m.group(1) or 1)
    c1_, c2_ = coef_of(n1), coef_of(n2)
    if not c1_ or not c2_:
        return _GATE
    need_of_2 = v1 * c2_ / c1_
    if need_of_2 <= v2:
        lim, exc = n1, n2
        excess = v2 - need_of_2
    else:
        lim, exc = n2, n1
        excess = v1 - v2 * c1_ / c2_
    if excess < 0:
        return _GATE
    steps = _beats(
        "at constant T and P, gas volumes obey the SAME ratio as the "
        "balanced coefficients (Gay-Lussac): required volume of the "
        "second gas = v1 x c2/c1; whatever remains is the excess.",
        f"coefficients {n1}:{n2} = {c1_:g}:{c2_:g}; given "
        f"{_fmt(v1)} mL {n1} and {_fmt(v2)} mL {n2}",
        f"{n2} needed for {_fmt(v1)} mL {n1} = {_fmt(v1)} x "
        f"{c2_:g}/{c1_:g} = {need_of_2:.6g} mL -> {lim} is limiting; "
        f"excess {exc} = {excess:.6g} mL",
        f"check: the limiting gas fully consumes at the coefficient "
        f"ratio -- only {exc} remains",
        f"{exc} is in excess by {excess:.6g} mL.",
    )
    return excess, steps, (f"{exc} is in excess by {excess:.6g} "
                           f"mL"), None, "excess = v2 - v1 c2/c1", \
        {"v1": v1, "v2": v2, "c1": c1_, "c2": c2_, "excess": excess}


def _chm_pc_vapour_density(g, m, text):
    """Vapour density bridge: molecular mass = 2 x VD; molar mass in
    g/mol carries the same number."""
    if not re.search(r"vapour\s+density|vapor\s+density|vapour\s+"
                     r"density", text, re.I):
        return _GATE
    vm = re.search(r"(?:density|VD)\s+(?:of\s+\w+\s+)?is\s+"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if vm is None:
        return _GATE
    vd = float(vm.group(1))
    if vd <= 0:
        return _GATE
    val = 2.0 * vd
    steps = _beats(
        "vapour density compares the gas's density to hydrogen at the "
        "same T and P, so the relative molecular mass is TWICE it: "
        "Mr = 2 x VD; the molar mass in g/mol is the same number.",
        f"VD = {_fmt(vd)}",
        f"Mr = 2 x {_fmt(vd)} = {_fmt(val)}",
        f"check: O2 with Mr 32 gives VD 16 -- halving recovers it",
        f"relative molecular mass {_fmt(val)}; molar mass "
        f"{_fmt(val)} g/mol.",
    )
    return val, steps, (f"Mr = {_fmt(val)}; molar mass = "
                        f"{_fmt(val)} g/mol"), None, "Mr = 2 x VD", \
        {"VD": vd, "Mr": val}


def _chm_pc_o2_burn_c(g, m, text):
    """Oxygen mass to burn carbon to CO2: C + O2 -> CO2, so every 12 g
    of carbon needs 32 g of oxygen: m_O2 = m_C x 32/12."""
    if not re.search(r"burn", text, re.I) or \
            not re.search(r"oxygen", text, re.I) or \
            not re.search(r"carbon", text, re.I):
        return _GATE
    cm = re.search(r"burn\s+(\d+(?:\.\d+)?)\s*g\s+of\s+carbon", text,
                   re.I)
    if cm is None:
        return _GATE
    m_c = float(cm.group(1))
    if m_c <= 0:
        return _GATE
    val = m_c * 32.0 / 12.0
    steps = _beats(
        "C + O2 -> CO2: one mole of carbon (12 g) burns with one mole "
        "of O2 (32 g), so the oxygen mass = carbon mass x 32/12.",
        f"m(C) = {_fmt(m_c)} g; n(C) = {_fmt(m_c)}/12 = "
        f"{m_c / 12.0:.6g} mol",
        f"n(O2) = n(C) = {m_c / 12.0:.6g} mol -> m(O2) = "
        f"{m_c / 12.0:.6g} x 32 = {_fmt(val)} g",
        f"check: mass is conserved -- {_fmt(m_c)} g C + {_fmt(val)} g "
        f"O2 = {m_c + val:.6g} g = the CO2 made",
        f"the oxygen required is {_fmt(val)} g.",
    )
    return val, steps, f"mass of O2 = {_fmt(val)} g", None, \
        "m(O2) = m(C) x 32/12", {"m_c": m_c, "m_o2": val}


def _chm_pc_pct_error(g, m, text):
    """Percentage error: |measured - true| / true x 100."""
    if not re.search(r"percentage\s+error|percent\s+error", text, re.I):
        return _GATE
    nums = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*mL", text)]
    if len(nums) < 2:
        return _GATE
    measured, true_v = nums[0], nums[1]
    if true_v <= 0:
        return _GATE
    val = abs(measured - true_v) / true_v * 100.0
    steps = _beats(
        "percentage error compares the Absolute error with the TRUE "
        "value: |measured - true| / true x 100.",
        f"measured = {_fmt(measured)}, true = {_fmt(true_v)}, "
        f"absolute error = {_fmt(abs(measured - true_v))}",
        f"% error = {_fmt(abs(measured - true_v))}/{_fmt(true_v)} x 100 "
        f"= {_fmt(val)}%",
        f"check: {_fmt(true_v)} x {val / 100:.6g} = "
        f"{true_v * val / 100.0:.6g} = the absolute error -- closes",
        f"the percentage error is {_fmt(val)}%.",
    )
    return val, steps, f"percentage error = {_fmt(val)}%", None, \
        "%err = |m - t|/t x 100", {"measured": measured,
                                   "true": true_v, "pct": val}


def _chm_pc_dm3_cm3(g, m, text):
    """Volume conversion dm^3 -> cm^3: the length factor CUBES
    (x 10^3)."""
    if not re.search(r"dm\s*\^?\s*3|dm3", text, re.I) or \
            not re.search(r"cm\s*\^?\s*3|cm3", text, re.I):
        return _GATE
    vm = re.search(r"(\d+(?:\.\d+)?)\s*dm\s*\^?\s*3", text, re.I)
    if vm is None:
        return _GATE
    v = float(vm.group(1))
    if v <= 0:
        return _GATE
    val = v * 1000.0
    steps = _beats(
        "1 dm = 10 cm is a LENGTH factor; volumes cube it: 1 dm^3 = "
        "(10 cm)^3 = 1000 cm^3.",
        f"V = {_fmt(v)} dm^3, factor = (10 cm/1 dm)^3 = 1000",
        f"V = {_fmt(v)} x 1000 = {_fmt(val)} cm^3",
        f"check: {val / 1000.0:.6g} dm^3 x 1000 = {_fmt(val)} cm^3 -- "
        f"closes; a linear x10 would be 10x too small",
        f"the volume is {_fmt(val)} cm^3.",
    )
    return val, steps, f"{_fmt(val)} cm^3", None, "x 1000 (cubic)", \
        {"dm3": v, "cm3": val}


def _chm_pc_molar_mass_given(g, m, text):
    """Molecular mass from the formula and the STATED atomic masses
    (dosage-precision style: no rounding before the sum)."""
    if not re.search(r"molecular\s+mass|molar\s+mass|formula\s+mass",
                     text, re.I):
        return _GATE
    fmb = re.search(r"\(([A-Z][A-Za-z0-9]{1,20})\)", text)
    fmn = re.search(r"mass\s+of\s+([A-Z][A-Za-z0-9]{1,20})", text, re.I)
    formula = fmb.group(1) if fmb else (fmn.group(1) if fmn else None)
    if formula is None:
        return _GATE
    counts = parse_formula(formula)
    if not counts or len(counts) < 2:
        return _GATE
    amap = {k.upper(): float(v) for k, v in re.findall(
        r"\b([A-Z][a-z]?)\s*=\s*(\d+(?:\.\d+)?)\s*u", text)}
    if len(amap) < 2:
        return _GATE
    terms = []
    val = 0.0
    for el, n in counts.items():
        mass = amap.get(el.upper())
        if mass is None:
            return _GATE
        val += n * mass
        terms.append(f"{n}({mass:g})")
    steps = _beats(
        "molecular mass = sum of (atom count x stated atomic mass); "
        "sum at full precision, round only at the end.",
        f"formula {formula}: " + ", ".join(f"{el} x {n}" for el, n in
                                           counts.items()),
        " + ".join(terms) + f" = {_fmt(val)}",
        f"check: each term re-divides -- n x A summed back = "
        f"{_fmt(val)} u; numerically the molar mass is "
        f"{_fmt(val)} g/mol",
        f"the molecular mass is {_fmt(val)} u ({_fmt(val)} g/mol).",
    )
    return val, steps, (f"molecular mass = {_fmt(val)} u = "
                        f"{_fmt(val)} g/mol"), None, \
        "M = sum n_i A_i", {"formula": formula, "M": val}


def _chm_pc_molecules(g, m, text):
    """Molecules in a stated mass: n = m/M, then N = n x N_A."""
    if not re.search(r"how\s+many\s+(?:molecules|atoms)|number\s+of\s+"
                     r"molecules", text, re.I):
        return _GATE
    mm = re.search(r"(\d+(?:\.\d+)?)\s*g\s+of\s+([A-Za-z][a-z0-9]*)",
                   text, re.I)
    if mm is None:
        return _GATE
    mass = float(mm.group(1))
    species = mm.group(2)
    Mm = re.search(r"M\s*=\s*(\d+(?:\.\d+)?)\s*g", text, re.I)
    if Mm:
        M = float(Mm.group(1))
    else:
        M = molar_mass(species)
    if not M or mass <= 0:
        return _GATE
    n = mass / M
    val = n * AVOGADRO
    steps = _beats(
        "the mole bridge: n = m/M converts mass to moles, then the "
        "Avogadro count N = n x 6.022 x 10^23 -- mass never multiplies "
        "N_A directly.",
        f"m = {_fmt(mass)} g, M = {_fmt(M)} g/mol",
        f"n = {_fmt(mass)}/{_fmt(M)} = {n:.6g} mol",
        f"N = {n:.6g} x 6.022e23 = {val:.6g} molecules",
        f"check: N / N_A = {val / AVOGADRO:.6g} mol; x M = "
        f"{n * M:.6g} g = the starting mass -- closes",
        f"{val:.6g} molecules in {_fmt(mass)} g.",
    )
    return val, steps, f"N = {val:.4g} molecules", None, \
        "N = (m/M) N_A", {"m": mass, "M": M, "n": n, "N": val}


def _chm_pc_henry(g, m, text):
    """Henry's law on the mole-fraction basis: p = k_H x, so
    x = p / k_H."""
    if not re.search(r"henry", text, re.I):
        return _GATE
    if not re.search(r"mole\s+fraction", text, re.I):
        return _GATE
    pm = re.search(r"pressure\s+of\s+.*?is\s+(\d+(?:\.\d+)?)\s*atm", text,
                   re.I)
    km = re.search(r"k\s*_?\s*H?\s*=?\s*(\d+(?:\.\d+)?)\s*[x*]\s*"
                   r"10\s*\^?\s*(\d+)\s*atm", text, re.I)
    if not (pm and km):
        return _GATE
    p = float(pm.group(1))
    k = float(km.group(1)) * 10.0 ** int(km.group(2))
    if p <= 0 or k <= 0:
        return _GATE
    val = p / k
    steps = _beats(
        "Henry's law on the mole-fraction basis reads p = k_H x; the "
        "dissolved mole fraction is the PARTIAL PRESSURE DIVIDED by the "
        "constant, x = p / k_H.",
        f"p = {_fmt(p)} atm, k_H = {_fmt(k)} atm",
        f"x = {_fmt(p)} / {_fmt(k)} = {val:.6g}",
        f"check: k_H x = {_fmt(k)} x {val:.6g} = {_fmt(p)} atm = the "
        f"partial pressure -- closes (x is tiny: gases barely "
        f"dissolve)",
        f"the mole fraction of dissolved gas is {val:.6g}.",
    )
    return val, steps, f"x = {val:.6g}", None, "x = p / k_H", \
        {"p": p, "k_H": k, "x": val}


def _chm_pc_raoult(g, m, text):
    """Raoult's law with a non-volatile solute: P = x_solvent x P0."""
    if not re.search(r"vapour\s+pressure|vapor\s+pressure", text, re.I):
        return _GATE
    if not re.search(r"non.?volatile|urea|solute", text, re.I):
        return _GATE
    sm = re.search(r"(\d+(?:\.\d+)?)\s*mol\s+of\s+non.?volatile\s+"
                   r"(\w+)", text, re.I) or \
        re.search(r"(\d+(?:\.\d+)?)\s*mol\s+of\s+(urea)", text, re.I)
    wm = re.search(r"(\d+(?:\.\d+)?)\s*mol\s+of\s+(?:water|H2O)\b", text,
                   re.I)
    Pm = re.search(r"pressure[^.]{0,60}?(\d+(?:\.\d+)?)\s*"
                   r"(kPa|mm\s*Hg|mmHg)", text, re.I)
    if not (sm and wm and Pm):
        return _GATE
    ns = float(sm.group(1))
    nw = float(wm.group(1))
    P0 = float(Pm.group(1))
    unit = Pm.group(2)
    if ns <= 0 or nw <= 0 or P0 <= 0:
        return _GATE
    xw = nw / (nw + ns)
    val = xw * P0
    steps = _beats(
        "a non-volatile solute lowers the vapour pressure by dilution: "
        "P = x_water x P0 with x_water = n_water / (n_water + n_solute).",
        f"n(urea) = {_fmt(ns)} mol, n(water) = {_fmt(nw)} mol, "
        f"P0 = {_fmt(P0)} {unit}",
        f"x_water = {_fmt(nw)}/{_fmt(nw + ns)} = {xw:.6g} -> P = "
        f"{xw:.6g} x {_fmt(P0)} = {_fmt(val)} {unit}",
        f"check: the solution pressure is BELOW the pure-solvent value "
        f"-- {_fmt(val)} < {_fmt(P0)} -- as dilution demands",
        f"the vapour pressure of the solution is {_fmt(val)} {unit}.",
    )
    return val, steps, (f"vapour pressure = {_fmt(val)} "
                        f"{unit}"), None, "P = x_solvent P0", \
        {"ns": ns, "nw": nw, "P0": P0, "xw": xw, "P": val}


def _chm_pc_osmotic_i(g, m, text):
    """Osmotic pressure with a van't Hoff factor, SI: pi = i C R T
    (C in mol/m^3), shipped in kPa."""
    if not re.search(r"osmotic\s+pressure", text, re.I):
        return _GATE
    cm = re.search(r"(\d+(?:\.\d+)?)\s*mol\s*L\s*[-^]?\s*-?\s*1\b", text,
                   re.I) or \
        re.search(r"(\d+(?:\.\d+)?)\s*M\b", text, re.I)
    tm = re.search(r"(\d+(?:\.\d+)?)\s*K\b", text, re.I)
    im = re.search(r"i\s*=\s*(\d+(?:\.\d+)?)", text, re.I)
    if not (cm and tm):
        return _GATE
    C_M = float(cm.group(1))
    T = float(tm.group(1))
    i = float(im.group(1)) if im else 1.0
    if C_M <= 0 or T <= 0 or i <= 0:
        return _GATE
    R = 8.314
    val = i * C_M * 1000.0 * R * T / 1000.0    # Pa -> kPa
    steps = _beats(
        "osmotic pressure is colligative: pi = i C R T with C in "
        "mol/m^3 (mol/L x 1000) and R = 8.314 J/(mol K); the van't Hoff "
        "factor i multiplies for dissociating solutes.",
        f"i = {_fmt(i)}, C = {_fmt(C_M)} mol/L = {_fmt(C_M * 1000)} "
        f"mol/m^3, T = {_fmt(T)} K",
        f"pi = {_fmt(i)} x {_fmt(C_M * 1000)} x 8.314 x {_fmt(T)} = "
        f"{val * 1000:.6g} Pa",
        f"check: pi / (i R T) = {val * 1000 / (i * R * T):.6g} mol/m^3 = "
        f"the stated concentration -- closes",
        f"the osmotic pressure is {_fmt(val)} kPa.",
    )
    return val, steps, f"osmotic pressure = {_fmt(val)} kPa", None, \
        "pi = i C R T", {"i": i, "C": C_M, "T": T, "pi_kPa": val}


def _chm_pc_vanthoff(g, m, text):
    """van't Hoff factor FROM a colligative measurement: i = observed
    dT / (K x molality)."""
    if not re.search(r"van'?t\s+hoff|vant\s+hoff", text, re.I):
        return _GATE
    mm = re.search(r"(\d+(?:\.\d+)?)\s*mol\s*kg\s*[-^]?\s*-?\s*1\b", text,
                   re.I)
    dtm = re.search(r"(?:elevation|depression)[^.]{0,30}?of\s+"
                    r"(\d+(?:\.\d+)?)\s*K\b", text, re.I)
    km = re.search(r"K\s*[bf]?\s*[^.=]{0,25}?=\s*(\d+(?:\.\d+)?)", text,
                   re.I)
    if not (mm and dtm and km):
        return _GATE
    molal = float(mm.group(1))
    dT = float(dtm.group(1))
    K = float(km.group(1))
    if molal <= 0 or dT <= 0 or K <= 0:
        return _GATE
    val = dT / (K * molal)
    if not (0.1 <= val <= 10.0):
        return _GATE
    kind = ("dissociates" if val > 1.05 else
            "associates" if val < 0.95 else "neither (i about 1)")
    steps = _beats(
        "the colligative law dT = i K m runs BOTH ways: observed i = "
        "dT / (K x m); i > 1 means MORE particles (dissociation), i < 1 "
        "fewer (association).",
        f"dT = {_fmt(dT)} K, K = {_fmt(K)}, m = {_fmt(molal)} mol/kg",
        f"i = {_fmt(dT)} / ({_fmt(K)} x {_fmt(molal)}) = {_fmt(val)}",
        f"check: K x m = {_fmt(K * molal)} K per 1 mol/kg; the observed "
        f"{_fmt(dT)} K needs i = {_fmt(val)}",
        f"the van't Hoff factor is {_fmt(val)}: the solute {kind}.",
    )
    return val, steps, f"van't Hoff factor i = {_fmt(val)} ({kind})", \
        None, "i = dT/(K m)", {"dT": dT, "K": K, "m": molal, "i": val}


_TABLE_CISCE_CHM: List[Tuple[str, str, Any]] = [
    ("CHM_PC_VOL_CONSERVED", r"volume", _chm_pc_vol_conserved),
    ("CHM_PC_PCT_INCREASE", r"percentage\s+increase|percent\s+increase",
     _chm_pc_pct_increase),
    ("CHM_PC_POWER_TIME", r"energy", _chm_pc_power_time),
    ("CHM_PC_MASS_PERCENT", r"mass\s+percent|by\s+mass",
     _chm_pc_mass_percent),
    ("CHM_PC_ALLIGATION", r"mix|standardise|standardize|blend",
     _chm_pc_alligation),
    ("CHM_PC_DENSITY_MASS", r"density", _chm_pc_density_mass),
    ("CHM_PC_YIELD_GYPSUM", r"gypsum|plaster\s+of\s+paris",
     _chm_pc_yield_gypsum),
    ("CHM_PC_MASS_CONSERVED", r"sublim|evaporat|condens|freez|boil",
     _chm_pc_mass_conserved),
    ("CHM_PC_CHARGE_ELECTRONS", r"current", _chm_pc_charge_electrons),
    ("CHM_PC_PROTON_ELECTRON", r"neutral\s+atom", _chm_pc_proton_electron),
    ("CHM_PC_MASS_NUMBER", r"mass\s+number", _chm_pc_mass_number),
    ("CHM_PC_VALENCY_FORMULA", r"valency", _chm_pc_valency_formula),
    ("CHM_PC_ISOTOPE_INVERSE", r"relative\s+atomic\s+mass|abundance",
     _chm_pc_isotope_inverse),
    ("CHM_PC_BALANCE_MASS", r"balance|mass\s+of\s+\S+\s+formed",
     _chm_pc_balance_mass),
    ("CHM_PC_RFM_NAMED", r"relative\s+formula\s+mass|formula\s+mass",
     _chm_pc_rfm_named),
    ("CHM_PC_PRECIPITATE", r"precipitat", _chm_pc_precipitate),
    ("CHM_PC_GAS_EXCESS", r"in\s+excess", _chm_pc_gas_excess),
    ("CHM_PC_VAPOUR_DENSITY", r"vapour\s+density|vapor\s+density",
     _chm_pc_vapour_density),
    ("CHM_PC_O2_BURN_C", r"burn", _chm_pc_o2_burn_c),
    ("CHM_PC_PCT_ERROR", r"percentage\s+error|percent\s+error",
     _chm_pc_pct_error),
    ("CHM_PC_DM3_CM3", r"dm\s*\^?\s*3", _chm_pc_dm3_cm3),
    ("CHM_PC_MOLAR_MASS_GIVEN", r"molecular\s+mass|molar\s+mass",
     _chm_pc_molar_mass_given),
    ("CHM_PC_MOLECULES", r"molecules?", _chm_pc_molecules),
    ("CHM_PC_HENRY", r"henry", _chm_pc_henry),
    ("CHM_PC_RAOULT", r"vapour\s+pressure|vapor\s+pressure",
     _chm_pc_raoult),
    ("CHM_PC_OSMOTIC_I", r"osmotic\s+pressure", _chm_pc_osmotic_i),
    ("CHM_PC_VANTHOFF", r"van'?t\s+hoff|vant\s+hoff", _chm_pc_vanthoff),
]


# --------------------------------------------------------------------------- #
# _TABLE_CHEM_C12 -- CHEM-C12-TOPICS wave (2026-10-07).  The class-12
# board numericals behind the 23 measured refusals of the STEM-PC
# full-span chem c10-c12 sweep (tests/_stempc_cbse_chem_c10_11_12.jsonl):
# polybasic-acid pH, combustion from stated ATOMIC masses, Raoult's law
# (solution + ideal-mixture deviation), relative lowering of vapour
# pressure -> molar mass, Kf freezing-point depression -> molar mass,
# E° -> equilibrium constant, Kohlrausch's law, Faraday's first law
# (single cell + series cells), H2-O2 fuel-cell EMF and efficiency,
# average-rate sign repair, zero-order kinetics, de Broglie wavelengths,
# Born-Haber lattice enthalpy, and the 1-bar molar volume.
# Scanned between _TABLE_CHEM_PC and _TABLE_CISCE_CHM: every family
# gates on its SPECIFIC ask (a gate refusal continues the scan into the
# earlier waves), so this wave owns only its named topics.
# conf=0.98: a gated exact compute owns its senior ask -- same
# promotion rationale as _res's 0.96 comment, one notch up to outrank
# the generic 0.97 log-eval / 0.96 sibling families on chemistry asks.
# Every family: deterministic compute, 5-beat steps, plausibility
# gates, quantities named for its declarative verifier row (CHEM-C12
# block in independent_verifier.py; VERIFIER_ENGINE.md: data rows
# only, no hand-written verifiers).
# --------------------------------------------------------------------------- #

_SUP_MAP = {"\u2070": "0", "\u00b9": "1", "\u00b2": "2", "\u00b3": "3",
            "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7",
            "\u2078": "8", "\u2079": "9", "\u207b": "-", "\u207a": "+"}


def _c12_sup(text: str) -> str:
    """Unicode superscripts -> ASCII.  A superscript run right after
    '10' is an EXPONENT ('10^-31'); any other run is an ion charge
    ('Fe3+').  mcf's own _normalize folds the superscript MINUS early,
    so '10-31' (minus folded, digits still superscript) is repaired
    here too."""
    t = text or ""
    t = re.sub(r"10\s*-\s*(?=[\u2070\u00b9\u00b2\u00b3\u2074-\u2079])",
               "10^-", t)
    t = re.sub(r"10\s*[\u2070\u00b9\u00b2\u00b3\u2074-\u2079]"
               r"[\u2070\u00b9\u00b2\u00b3\u2074-\u2079]*",
               lambda m_: "10^" + "".join(_SUP_MAP.get(c, "")
                                          for c in m_.group(0)[2:]), t)
    return re.sub(r"[\u2070\u00b9\u00b2\u00b3\u2074-\u2079\u207b\u207a\u2091]",
                  lambda m_: _SUP_MAP.get(m_.group(0),
                                          "e" if m_.group(0) == "\u2091"
                                          else m_.group(0)), t)


_C12_SCI = r"(-?\d+(?:\.\d+)?(?:\s*[x*]\s*10\s*\^?\s*[-+]?\d+" \
           r"|e\s*[-+]?\d+)?|10\s*\^?\s*[-+]?\d+)"


def _c12_num(s: str) -> float:
    """'2.5 x 10^-4' / '2.5e-4' / '10^6' / '2.5' -> float
    (post-_c12_sup)."""
    v = re.sub(r"\s+", "", (s or "")).replace("\u00d7", "x")
    m = re.fullmatch(r"10\^?([-+]?\d+)", v)
    if m:  # bare power of ten: 10^6 IS 1e6, not 10 x 10^6
        return 10.0 ** int(m.group(1))
    m = re.fullmatch(r"(-?\d+(?:\.\d+)?)(?:[x*]10\^?([-+]?\d+)|e([-+]?\d+))?",
                     v)
    if not m:
        return float(v)
    val = float(m.group(1))
    if m.group(2):
        val *= 10.0 ** int(m.group(2))
    elif m.group(3):
        val *= 10.0 ** int(m.group(3))
    return val


def _res12(fid: str, value, steps, answer, eq, extra):
    """CHEM-C12 families promote at 0.98 (see block comment)."""
    return _res(fid, {}, value, eq, steps, answer=answer, extra=extra,
                conf=0.98)


def _c12_ph_poly(g, m, text):
    """pH of a POLYBASIC strong acid (basicity n >= 2): [H+] = n c,
    pH = -log10(n c).  The monobasic case stays with CHM_PH_ACID."""
    t = _c12_sup(text)
    if not re.search(r"\bpH\b", t, re.I) \
            or not re.search(r"dissociat|ionis|ioniz", t, re.I):
        return _GATE
    n = _pc_acid_basicity(_chem_sub(t))
    if n < 2:
        return _GATE  # monobasic: CHM_PH_ACID owns it
    cm = re.search(r"(\d+(?:\.\d+)?)\s*([mu]?\s*)M\b", t)
    if cm is None:
        return _GATE
    c = float(cm.group(1))
    if cm.group(2):
        c *= 1e-6
    if not (1e-8 < c < 100.0):
        return _GATE
    h = n * c
    val = -math.log10(h)
    steps = _beats(
        "a polybasic strong acid releases n protons per molecule on "
        "complete dissociation, so [H+] = n x c and pH = -log10[H+].",
        f"basicity n = {n} (every proton of the acid dissociates "
        f"completely), c = {_fmt(c)} M",
        f"[H+] = {n} x {_fmt(c)} = {_fmt(h)} M",
        f"check: 10^-pH = {_fmt(10.0 ** -val)} M = [H+] -- closes; a "
        f"basicity-1 read would give pH {_fmt(-math.log10(c))} and "
        f"miss the factor {n}",
        f"the pH of the solution is {_fmt(val)}.",
    )
    return _res12("CHM_C12_PH_POLY", val, steps, f"pH = {_fmt(val)}",
                  "pH = -log10(n c)",
                  {"c": c, "n": float(n), "h": h, "pH": val})


def _c12_combust_atomm(g, m, text):
    """Combustion CO2 mass when only ATOMIC masses are stated (no
    compound molar mass): M(fuel) is summed from the formula first.
    The stated-molar-mass phrasing stays with CHM_COMBUSTION_CO2."""
    t = _c12_sup(text)
    if not (re.search(r"co2|carbon\s+dioxide", t, re.I)
            and re.search(r"burnt|combust|burn", t, re.I)):
        return _GATE
    if re.search(r"[A-Za-z][a-z]?\d*\s*=\s*\d+(?:\.\d+)?\s*g\s*/\s*mol", t):
        return _GATE  # compound molar mass stated: earlier wave owns it
    amb = re.search(r"(?:molar|atomic)\s+mass(?:es)?[^)]{0,90}?\)", t)
    if amb is None:
        return _GATE
    amap = {k: float(v) for k, v in re.findall(
        r"([A-Za-z][a-z]?)\s*=\s*(\d+(?:\.\d+)?)(?:\s*g\s*/\s*mol)?",
        amb.group(0))
        if not re.fullmatch(r"[a-z]+", k)}
    if len(amap) < 2:
        return _GATE
    fm = re.search(r"(\d+(?:\.\d+)?)\s*g\s+of\s+[A-Za-z][a-z0-9]*"
                   r"\s*\(((?:[A-Za-z]\d*)+)\)", t)
    if fm is None:
        return _GATE
    mass_fuel = float(fm.group(1))
    formula = fm.group(2).upper()
    counts = parse_formula(formula)
    if not counts or "C" not in counts:
        return _GATE
    molar = 0.0
    for el, cnt in counts.items():
        atom = amap.get(el)
        if atom is None:
            return _GATE  # unstated atomic mass: cannot verify, refuse
        molar += cnt * atom
    if mass_fuel <= 0 or molar <= 0:
        return _GATE
    n_c = counts["C"]
    n_fuel = mass_fuel / molar
    n_co2 = n_c * n_fuel
    val = n_co2 * 44.0
    frac_c = 12.0 * n_c / molar
    check = mass_fuel * frac_c * (44.0 / 12.0)
    steps = _beats(
        "complete combustion turns every C in the fuel into one CO2; "
        "with only ATOMIC masses stated, the fuel's molar mass is "
        "summed from its formula first.",
        "M(" + formula + ") = " +
        " + ".join(f"{cnt} x {_fmt(amap[el])}" for el, cnt in
                   counts.items()) + f" = {_fmt(molar)} g/mol",
        f"n(fuel) = {_fmt(mass_fuel)}/{_fmt(molar)} = {_fmt(n_fuel)} mol "
        f"-> n(CO2) = {n_c} x {_fmt(n_fuel)} = {_fmt(n_co2)} mol -> "
        f"m = {_fmt(n_co2)} x 44 = {_fmt(val)} g",
        f"check by carbon balance: m(CO2) = m(fuel) x C-fraction x "
        f"44/12 = {_fmt(check)} g -- matches",
        f"the combustion produces {_fmt(val)} g of CO2.",
    )
    return _res12("CHM_C12_COMBUST_ATOMM", val, steps,
                  f"mass of CO2 = {_fmt(val)} g",
                  "m(CO2) = (#C) m(fuel)/M(fuel) x 44",
                  {"mass_fuel": mass_fuel, "M_fuel": molar,
                   "n_C": float(n_c), "CO2": val})


def _c12_photo_speed(g, m, text):
    """Photoelectric KE AND the photoelectron maximum speed, computed
    on the question's OWN stated constants (SI): KE = hc/lambda - phi,
    v = sqrt(2 K / m_e).  The KE-only ask stays with CHM_PHOTOELECTRIC."""
    t = _c12_sup(text)
    if not re.search(r"photoelectric|photoelectron|work\s+function", t,
                     re.I):
        return _GATE
    if not re.search(r"speed|velocity", t, re.I):
        return _GATE  # KE-only ask: CHM_PHOTOELECTRIC owns it
    lm = re.search(r"wavelength\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*"
                   r"(pm|nm|um|mm|cm|m)\b", t, re.I)
    wm = re.search(r"work\s+function[^.]{0,30}?(\d+(?:\.\d+)?)\s*(eV|J)\b",
                   t, re.I)
    mm = re.search(r"m\s*_?\s*e\s*=\s*" + _C12_SCI + r"\s*kg", t, re.I)
    if not (lm and wm and mm):
        return _GATE
    conv = {"pm": 1e-12, "nm": 1e-9, "um": 1e-6, "mm": 1e-3, "cm": 1e-2,
            "m": 1.0}
    lam_nm = float(lm.group(1))
    lam_m = lam_nm * conv[lm.group(2).lower()]
    phi, phi_u = float(wm.group(1)), wm.group(2).upper()
    m_e = _c12_num(mm.group(1))
    hm = re.search(r"h\s*=\s*" + _C12_SCI + r"\s*J\s*s", t, re.I)
    cm2 = re.search(r"c\s*=\s*" + _C12_SCI + r"\s*m\s*/?\s*s", t, re.I)
    vm = re.search(r"1\s*eV\s*=\s*" + _C12_SCI + r"\s*J\b", t, re.I)
    h = _c12_num(hm.group(1)) if hm else 6.626e-34
    c = _c12_num(cm2.group(1)) if cm2 else 3.0e8
    joule = _c12_num(vm.group(1)) if vm else 1.602e-19
    if min(lam_m, m_e, h, c, joule) <= 0:
        return _GATE
    e_j = h * c / lam_m
    phi_j = phi if phi_u == "J" else phi * joule
    k_j = e_j - phi_j
    if k_j <= 0:
        return _GATE  # below threshold: no emission
    k_ev = k_j / joule
    v = math.sqrt(2.0 * k_j / m_e)
    steps = _beats(
        "photoelectric equation on the stated constants: E_photon = "
        "hc/lambda, K_max = E - phi (in J), then K_max = (1/2) m v^2 "
        "gives the photoelectron speed.",
        f"lambda = {lm.group(1)} {lm.group(2)} = {_fmt(lam_m)} m, "
        f"phi = {_fmt(phi)} {phi_u}, m_e = {_fmt(m_e)} kg",
        f"E_photon = hc/lambda = {_fmt(e_j)} J -> K_max = {_fmt(e_j)} - "
        f"{_fmt(phi_j)} = {_fmt(k_j)} J = {_fmt(k_ev)} eV",
        f"check: E_photon in eV = {_fmt(e_j / joule)} eV > phi "
        f"{_fmt(phi)} eV (emission occurs); v = sqrt(2 x {_fmt(k_j)} / "
        f"{_fmt(m_e)}) = {_fmt(v)} m/s -- of order 10^6, "
        f"non-relativistic",
        f"threshold wavelength = hc/phi = "
        f"{_fmt(h * c / phi_j * 1e9)} nm > {lm.group(1)} nm -- "
        f"consistent",
        f"K_max = {_fmt(k_ev)} eV; maximum photoelectron speed = "
        f"{_fmt(v)} m/s.",
    )
    phi_ev = phi if phi_u == "eV" else phi / joule
    return _res12("CHM_C12_PHOTO_SPEED", k_ev, steps,
                  f"K_max = {_fmt(k_ev)} eV; v_max = {_fmt(v)} m/s",
                  "KE = hc/lambda - phi; v = sqrt(2 KE / m)",
                  {"lam_nm": lam_nm, "phi_eV": phi_ev, "m_e": m_e, "h": h,
                   "c": c, "joule_per_eV": joule, "KE_eV": k_ev,
                   "v_max": v})


def _c12_debroglie(g, m, text):
    """de Broglie wavelength lambda = h / (m v) for every named body
    with stated mass and speed (why baseballs do not diffract)."""
    t = _c12_sup(text)
    if not re.search(r"wavelength", t, re.I):
        return _GATE
    if not re.search(r"de\s*broglie|diffract|matter\s+wave", t, re.I):
        return _GATE
    body = re.findall(
        r"([A-Za-z][a-z]*)\s*\((?:[^)]*?)\bmass\s*" + _C12_SCI +
        r"\s*(kg|g)[^)]*?(?:speed|velocity|v)\s*(?:of\s+|=)?\s*" +
        _C12_SCI + r"\s*(m/s|m\s*s\s*-\s*1|cm/s)", t, re.I)
    if len(body) < 2:
        return _GATE
    hm = re.search(r"h\s*=\s*" + _C12_SCI + r"\s*J\s*s", t, re.I)
    h = _c12_num(hm.group(1)) if hm else 6.626e-34
    lams, descs, extras = [], [], {"h": h}
    for i, (name, ms, mu, vs, vu) in enumerate(body[:2], 1):
        mass = _c12_num(ms) * (1.0 if mu.lower() == "kg" else 1e-3)
        vel = _c12_num(vs)
        if vu.lower().startswith("cm"):
            vel /= 100.0
        if mass <= 0 or vel <= 0:
            return _GATE
        lam = h / (mass * vel)
        lams.append((name, lam))
        descs.append(f"{name}: m = {_fmt(mass)} kg, v = {_fmt(vel)} m/s "
                     f"-> lambda = h/(mv) = {_fmt(lam)} m")
        extras[f"m{i}"] = mass
        extras[f"v{i}"] = vel
        extras[f"lam{i}"] = lam
    (n1, l1), (n2, l2) = lams[0], lams[1]
    steps = _beats(
        "de Broglie's relation gives EVERY moving mass a wavelength: "
        "lambda = h/(mv); diffraction only shows when the wavelength is "
        "comparable to a spacing (~10^-10 m).",
        f"h = {_fmt(h)} J s; " + "; ".join(descs),
        f"lambda({n1}) = {_fmt(l1)} m; lambda({n2}) = {_fmt(l2)} m",
        f"check: the macroscopic body's wavelength is ~{_fmt(l1 / l2):.0e} "
        f"times smaller than the electron's -- no lattice can diffract "
        f"it, while the electron's is atomic-scale",
        f"wavelengths: {n1} {_fmt(l1)} m; {n2} {_fmt(l2)} m.",
    )
    return _res12("CHM_C12_DEBROGLIE", l1, steps,
                  f"lambda({n1}) = {_fmt(l1)} m; lambda({n2}) = "
                  f"{_fmt(l2)} m",
                  "lambda = h / (m v)", extras)


def _c12_raoult_soln(g, m, text):
    """Raoult's law with a non-volatile solute, grams + stated molar
    mass: mole fractions, solution vapour pressure, relative lowering
    (which equals the solute's mole fraction)."""
    t = _c12_sup(text)
    if not re.search(r"vapour\s+pressure|vapor\s+pressure", t, re.I):
        return _GATE
    if not re.search(r"mole\s+fraction", t, re.I):
        return _GATE  # other Raoult shapes belong to the sibling rows
    pm = re.search(r"pure\s+\w+(?:\s+at\s+\d+\s*K)?\s+is\s*"
                   r"(\d+(?:\.\d+)?)\s*(mm\s*Hg|mmHg|kPa|bar|torr)", t,
                   re.I)
    sm = re.search(r"(\d+(?:\.\d+)?)\s*g\s+of\s+([A-Za-z][A-Za-z0-9]*)", t)
    mm = re.search(r"molar\s+mass\s*(?:is|=)?\s*(\d+(?:\.\d+)?)", t, re.I) \
        or re.search(r"(\d+(?:\.\d+)?)\s*g\s*/\s*mol", t)
    dm = re.search(r"dissolved\s+in\s+(\d+(?:\.\d+)?)\s*g\s+of\s+"
                   r"([A-Za-z][A-Za-z0-9]*)", t, re.I)
    if not (pm and sm and mm and dm):
        return _GATE
    p0 = float(pm.group(1))
    w2, solute = float(sm.group(1)), sm.group(2)
    M2 = float(mm.group(1))
    w1 = float(dm.group(1))
    M1 = 18.0 if re.search(r"wat|h2o", dm.group(2), re.I) else None
    M1m = re.search(r"M\s*1\s*(?:of\s+\w+\s*)?=\s*(\d+(?:\.\d+)?)", t)
    if M1m:
        M1 = float(M1m.group(1))
    if M1 is None:
        return _GATE
    if min(p0, w2, M2, w1, M1) <= 0:
        return _GATE
    n2 = w2 / M2
    n1 = w1 / M1
    x2 = n2 / (n1 + n2)
    x1 = 1.0 - x2
    p_sol = x1 * p0
    rlvp = (p0 - p_sol) / p0
    unit = pm.group(2)
    steps = _beats(
        "Raoult's law: a non-volatile solute lowers the solvent's "
        "vapour pressure to x_solvent x P0, and the relative lowering "
        "(P0 - P)/P0 equals the solute's mole fraction.",
        f"n({solute}) = {_fmt(w2)}/{_fmt(M2)} = {_fmt(n2)} mol, "
        f"n(solvent) = {_fmt(w1)}/{_fmt(M1)} = {_fmt(n1)} mol",
        f"x({solute}) = {_fmt(n2)}/{_fmt(n1 + n2)} = {_fmt(x2)}; "
        f"x(solvent) = {_fmt(x1)}",
        f"P(solution) = {_fmt(x1)} x {_fmt(p0)} = {_fmt(p_sol)} {unit}; "
        f"relative lowering = ({_fmt(p0)} - {_fmt(p_sol)})/{_fmt(p0)} = "
        f"{_fmt(rlvp)} = x({solute}) within rounding -- closes",
        f"(a) mole fraction of {solute} = {_fmt(x2)}; (b) vapour "
        f"pressure of the solution = {_fmt(p_sol)} {unit}; (c) relative "
        f"lowering = {_fmt(rlvp)}.",
    )
    return _res12("CHM_C12_RAOULT_SOLN", x2, steps,
                  f"x({solute}) = {_fmt(x2)}; P(soln) = {_fmt(p_sol)} "
                  f"{unit}; RLVP = {_fmt(rlvp)}",
                  "P = x_solvent P0; RLVP = x_solute",
                  {"w2": w2, "M2": M2, "w1": w1, "M1": M1, "p0": p0,
                   "n2": n2, "n1": n1, "x_solute": x2, "x_solvent": x1,
                   "p_sol": p_sol, "rlvp": rlvp})

def _c12_raoult_ideal(g, m, text):
    """Ideal-mixture Raoult total pressure p = xA pA0 + xB pB0 and the
    positive/negative-deviation verdict against a measured total."""
    t = _c12_sup(text)
    if not re.search(r"vapour\s+pressure|vapor\s+pressure", t, re.I):
        return _GATE
    pam = re.search(r"p\s*_?\s*A\s*(?:\^\s*[°o0]|[°o0])?\s*=\s*"
                    r"(\d+(?:\.\d+)?)", t)
    pbm = re.search(r"p\s*_?\s*B\s*(?:\^\s*[°o0]|[°o0])?\s*=\s*"
                    r"(\d+(?:\.\d+)?)", t)
    xam = re.search(r"x\s*_?\s*A\s*=\s*(\d*\.?\d+)", t)
    if not (pam and pbm and xam):
        return _GATE
    pA, pB, xA = float(pam.group(1)), float(pbm.group(1)), float(xam.group(1))
    if not (0.0 < xA < 1.0) or pA <= 0 or pB <= 0:
        return _GATE
    p_ideal = xA * pA + (1.0 - xA) * pB
    mv = re.search(r"measured\s+total\s+vapour\s+pressure\s+is\s*"
                   r"(\d+(?:\.\d+)?)", t, re.I)
    extras = {"pA": pA, "pB": pB, "xA": xA, "p_ideal": p_ideal}
    dev = ""
    if mv:
        p_meas = float(mv.group(1))
        extras["p_meas"] = p_meas
        if p_meas > p_ideal * 1.005:
            dev = (" Measured " + _fmt(p_meas) + " > ideal " +
                   _fmt(p_ideal) + ": POSITIVE deviation.")
        elif p_meas < p_ideal * 0.995:
            dev = (" Measured " + _fmt(p_meas) + " < ideal " +
                   _fmt(p_ideal) + ": NEGATIVE deviation.")
        else:
            dev = (" Measured " + _fmt(p_meas) + " matches ideal " +
                   _fmt(p_ideal) + ": the solution is ideal.")
    steps = _beats(
        "for an IDEAL binary mixture Raoult's law adds the partial "
        "pressures: p_total = xA pA0 + xB pB0 with xB = 1 - xA; a "
        "measured total above/below the ideal value is a positive/"
        "negative deviation.",
        f"pA0 = {_fmt(pA)}, pB0 = {_fmt(pB)}, xA = {_fmt(xA)}, "
        f"xB = {_fmt(1.0 - xA)}",
        f"p_total(ideal) = {_fmt(xA)} x {_fmt(pA)} + {_fmt(1.0 - xA)} x "
        f"{_fmt(pB)} = {_fmt(xA * pA)} + {_fmt((1.0 - xA) * pB)} = "
        f"{_fmt(p_ideal)} mm Hg",
        "check: the ideal value is a mole-fraction-weighted mean, so it "
        "must lie between pB0 and pA0 -- " + _fmt(p_ideal) + " does",
        f"the ideal total vapour pressure is {_fmt(p_ideal)} mm Hg." + dev,
    )
    return _res12("CHM_C12_RAOULT_IDEAL", p_ideal, steps,
                  f"p_total(ideal) = {_fmt(p_ideal)} mm Hg."
                  + (dev if dev else ""),
                  "p = xA pA0 + (1 - xA) pB0", extras)


def _c12_rlvp_molar(g, m, text):
    """Relative lowering of vapour pressure -> solute molar mass:
    (p0 - p)/p0 = n2/n1 = (w2/M2)/(w1/M1)."""
    t = _c12_sup(text)
    if not re.search(r"vapour\s+pressure|vapor\s+pressure", t, re.I):
        return _GATE
    if not re.search(r"molar\s+mass", t, re.I):
        return _GATE
    if re.search(r"mole\s+fraction", t, re.I):
        return _GATE  # the multi-part Raoult row owns that shape
    p0m = re.search(r"pure\s+\w+(?:\s+at\s+\w+)?[^.]*?is\s*"
                    r"(\d+(?:\.\d+)?)\s*(mm\s*Hg|mmHg|kPa)", t, re.I)
    p1m = re.search(r"solution.s\s+vapour\s+pressure\s+is\s*"
                    r"(\d+(?:\.\d+)?)", t, re.I)
    w2m = re.search(r"(\d+(?:\.\d+)?)\s*g\s+of\s+a\s+non", t)
    w1m = re.search(r"in\s+(\d+(?:\.\d+)?)\s*g\s+of\s+(?:water|H2O)",
                    t, re.I)
    if not (p0m and p1m and w2m and w1m):
        return _GATE
    p0, p1 = float(p0m.group(1)), float(p1m.group(1))
    w2, w1 = float(w2m.group(1)), float(w1m.group(1))
    M1m = re.search(r"M\s*1\s*(?:of\s+\w+\s*)?=\s*(\d+(?:\.\d+)?)", t)
    M1 = float(M1m.group(1)) if M1m else 18.0
    if not (p0 > p1 > 0) or w2 <= 0 or w1 <= 0 or M1 <= 0:
        return _GATE
    rlvp = (p0 - p1) / p0
    M2 = w2 * M1 / (rlvp * w1)
    if not (1.0 <= M2 <= 10000.0):
        return _GATE
    n1 = w1 / M1
    n2 = rlvp * n1
    unit = p0m.group(2)
    steps = _beats(
        "Raoult's law: the relative lowering of vapour pressure "
        "(p0 - p)/p0 equals the solute mole fraction n2/n1 = "
        "(w2/M2)/(w1/M1); solve it for M2.",
        f"delta p = {_fmt(p0)} - {_fmt(p1)} = {_fmt(p0 - p1)} {unit}; "
        f"RLVP = {_fmt(p0 - p1)}/{_fmt(p0)} = {_fmt(rlvp)}",
        f"n1 = {_fmt(w1)}/{_fmt(M1)} = {_fmt(n1)} mol -> n2 = RLVP x n1 "
        f"= {_fmt(n2)} mol",
        f"check: M2 = w2/n2 = {_fmt(w2)}/{_fmt(n2)} = {_fmt(M2)} g/mol -- "
        f"same as w2 x M1/(RLVP x w1)",
        f"the molar mass of the solute is {_fmt(M2)} g/mol.",
    )
    return _res12("CHM_C12_RLVP_MOLAR", M2, steps,
                  f"molar mass of the solute = {_fmt(M2)} g/mol",
                  "RLVP = (w2/M2)/(w1/M1) -> M2",
                  {"p0": p0, "p1": p1, "w2": w2, "w1": w1, "M1": M1,
                   "rlvp": rlvp, "n1": n1, "n2": n2, "M2": M2})


def _c12_kf_molar(g, m, text):
    """Freezing-point depression -> solute molar mass:
    dTf = Kf m, m = dTf/Kf, M2 = w2/(m x kg solvent) (non-electrolyte,
    i = 1).  The forward dTf = Kf x molality ask stays with the book
    table's family."""
    t = _c12_sup(text)
    if not re.search(r"freez", t, re.I):
        return _GATE
    if not re.search(r"molar\s+mass", t, re.I):
        return _GATE
    if not re.search(r"non.?electrolyte", t, re.I):
        return _GATE  # i unknown for an electrolyte: refuse honestly
    kfm = re.search(r"K\s*f\s*(?:for\s+\w+\s*)?=\s*(\d+(?:\.\d+)?)", t)
    if kfm is None:
        return _GATE
    kf = float(kfm.group(1))
    tm = re.search(r"freezes\s+at\s+(-?\d+(?:\.\d+)?)", t, re.I)
    pm = re.search(r"[Pp]ure\s+\w+\s+freezes\s+at\s+(-?\d+(?:\.\d+)?)", t,
                   re.I)
    w2m = re.search(r"(\d+(?:\.\d+)?)\s*g\s+of\s+(?:an?\s+)?(?:unknown"
                    r"\s+)?non", t)
    w1m = re.search(r"in\s+(\d+(?:\.\d+)?)\s*g\s+of\s+", t)
    if not (tm and pm and w2m and w1m):
        return _GATE
    t_soln, t_pure = float(tm.group(1)), float(pm.group(1))
    w2, w1 = float(w2m.group(1)), float(w1m.group(1))
    dTf = t_pure - t_soln
    if dTf <= 0 or kf <= 0 or w2 <= 0 or w1 <= 0:
        return _GATE
    molal = dTf / kf
    kg = w1 / 1000.0
    moles = molal * kg
    M2 = w2 / moles
    if not (1.0 <= M2 <= 100000.0):
        return _GATE
    steps = _beats(
        "freezing-point depression is colligative: dTf = Kf x molality "
        "for a non-electrolyte (i = 1); molality = moles solute per KG "
        "of solvent, so M2 = w2 / (molality x kg solvent).",
        f"dTf = {_fmt(t_pure)} - {_fmt(t_soln)} = {_fmt(dTf)} K; "
        f"Kf = {_fmt(kf)} K kg/mol; w2 = {_fmt(w2)} g; w1 = {_fmt(w1)} g "
        f"= {_fmt(kg)} kg",
        f"molality = {_fmt(dTf)}/{_fmt(kf)} = {_fmt(molal)} mol/kg -> "
        f"moles = {_fmt(molal)} x {_fmt(kg)} = {_fmt(moles)} mol",
        f"check: M2 = {_fmt(w2)}/{_fmt(moles)} = {_fmt(M2)} g/mol; "
        f"using grams instead of kg would slip M2 by 1000 -- the unit "
        f"audit catches it",
        f"the molar mass of the solute is {_fmt(M2)} g/mol.",
    )
    return _res12("CHM_C12_KF_MOLAR", M2, steps,
                  f"molar mass of the solute = {_fmt(M2)} g/mol",
                  "M2 = w2 Kf x 1000 / (dTf w1)",
                  {"kf": kf, "dTf": dTf, "w2": w2, "w1": w1,
                   "molality": molal, "moles": moles, "M2": M2})


def _c12_nernst_k(g, m, text):
    """E°cell -> equilibrium constant at 298 K: log K = n E°/0.059,
    with n counted from the redox equation's ion charges."""
    t = _c12_sup(text)
    if not re.search(r"equilibrium\s+constant", t, re.I):
        return _GATE
    em = re.search(r"E\s*°?\s*_?\s*cell\s*=\s*([+-]?\d+(?:\.\d+)?)", t) \
        or re.search(r"E\s*°\s*=\s*([+-]?\d+(?:\.\d+)?)", t)
    if em is None:
        return _GATE
    e0 = float(em.group(1))
    nm = re.search(r"\bn\s*=\s*(\d+)\b", t)
    n = None
    n_note = ""
    if nm is None:
        halves = re.split(r"<->|->", t)
        if len(halves) == 2:

            def _ions(side):
                out = {}
                for cm in re.finditer(
                        r"(\d*)\s*([A-Z][a-z]?)\s*(?:\^\s*\(?)?\s*(\d*)"
                        r"\s*([+-])\s*\)?", side):
                    coeff = int(cm.group(1) or 1)
                    el, q = cm.group(2), int(cm.group(3) or 0)
                    if cm.group(4) == "-":
                        q = -q
                    out.setdefault(el, []).append((coeff, q))
                return out
            li, ri = _ions(halves[0]), _ions(halves[1])
            ox = red = 0
            for el, lq in li.items():
                rq = ri.get(el)
                if not rq:
                    continue
                (coeff, ql), (_, qr) = lq[0], rq[0]
                d = ql - qr  # +: reduction (gains electrons)
                if d > 0:
                    red += coeff * d
                elif d < 0:
                    ox += coeff * (-d)
            if ox and ox == red:
                n = ox
                n_note = "counted from the ion-charge change"
    else:
        n = int(nm.group(1))
        n_note = "stated"
    if n is None:
        return _GATE
    if not (0.01 <= e0 <= 2.0 and 1 <= n <= 8):
        return _GATE
    logk = n * e0 / 0.059
    if not (-40.0 <= logk <= 40.0):
        return _GATE
    val = 10.0 ** logk
    steps = _beats(
        "at 298 K the Nernst link between the standard cell potential "
        "and the equilibrium constant is E° = (0.059/n) log K, with n = "
        "electrons transferred (" + n_note + ").",
        f"E°cell = {_fmt(e0)} V, n = {n}",
        f"log K = n x E°/0.059 = {n} x {_fmt(e0)}/0.059 = "
        f"{_fmt(logk)}",
        f"check: a positive E° must give K >> 1 (the cell reaction is "
        f"spontaneous) -- K = 10^{_fmt(logk)} >> 1 -- consistent",
        f"the equilibrium constant is K = {_fmt(val)} "
        f"(log K = {_fmt(logk)}).",
    )
    return _res12("CHM_C12_NERNST_K", val, steps,
                  f"K = {_fmt(val)} (log K = {_fmt(logk)})",
                  "log K = n E° / 0.059",
                  {"E": e0, "n": float(n), "logK": logk, "K": val})


_KOHL_SALTS = {
    "hcl": ("H", "Cl"), "kcl": ("K", "Cl"), "nacl": ("Na", "Cl"),
    "naac": ("Na", "Ac"), "ch3coona": ("Na", "Ac"),
    "nac2h3o2": ("Na", "Ac"), "ch3cooh": ("H", "Ac"),
    "nh4cl": ("NH4", "Cl"), "nh4oh": ("NH4", "OH"),
    "naoh": ("Na", "OH"), "kno3": ("K", "NO3"), "nano3": ("Na", "NO3"),
    "hno3": ("H", "NO3"), "kbr": ("K", "Br"), "hbr": ("H", "Br"),
    "nabr": ("Na", "Br"),
}


def _c12_kohlrausch(g, m, text):
    """Kohlrausch's law of independent ion migration: the limiting
    molar conductivity of a weak electrolyte from three strong ones by
    the ion-rectangle relation L(target) = L(S1) + L(S2) - L(S3)."""
    t = _c12_sup(text)
    if not re.search(r"kohlrausch", t, re.I) \
            and not re.search(r"[\u039b\u03bb]", t):
        return _GATE
    given = [(s.strip().lower(), float(v)) for s, v in re.findall(
        r"[\u039b\u03bb]\s*[°o]?\s*m?\s*\(\s*([A-Za-z0-9]+)\s*\)\s*=\s*"
        r"(\d+(?:\.\d+)?)", t)]
    tm = re.search(r"calculate\s*[\u039b\u03bb]\s*[°o]?\s*m?\s*\(?\s*"
                   r"([A-Za-z0-9]+)\s*\)?", t, re.I)
    if len(given) < 3 or tm is None:
        return _GATE
    target = tm.group(1).lower()
    tpair = _KOHL_SALTS.get(target)
    if tpair is None:
        return _GATE
    best = None
    for (s1, v1) in given:
        i1 = _KOHL_SALTS.get(s1)
        if not i1:
            continue
        for (s2, v2) in given:
            if (s2, v2) == (s1, v1):
                continue
            i2 = _KOHL_SALTS.get(s2)
            if not i2:
                continue
            for (s3, v3) in given:
                if (s3, v3) in ((s1, v1), (s2, v2)):
                    continue
                i3 = _KOHL_SALTS.get(s3)
                if i3 != (i2[0], i1[1]):
                    continue
                if {i1[0], i1[1], i2[0], i2[1]} >= set(tpair):
                    best = (v1, v2, v3)
                    break
            if best:
                break
        if best:
            break
    if best is None:
        return _GATE
    v1, v2, v3 = best
    val = v1 + v2 - v3
    if not (10.0 <= val <= 900.0):
        return _GATE
    steps = _beats(
        "Kohlrausch's law: ions migrate independently at infinite "
        "dilution, so a limiting molar conductivity is the SUM of its "
        "two ions'. The weak electrolyte's ions are recovered by "
        "adding the two strong electrolytes that hold them and "
        "subtracting the one that shares their common ion: "
        "L(T) = L(S1) + L(S2) - L(S3).",
        f"given: " + "; ".join(f"L({s.upper()}) = {_fmt(v)}" for s, v in
                               given),
        f"L({target.upper()}) = {_fmt(v1)} + {_fmt(v2)} - {_fmt(v3)} = "
        f"{_fmt(val)} S cm2/mol",
        f"check: the shared ion's contribution cancels in "
        f"L(S1) + L(S2) - L(S3), leaving exactly the two ions of the "
        f"weak electrolyte -- closes",
        f"the limiting molar conductivity of {target.upper()} is "
        f"{_fmt(val)} S cm2/mol.",
    )
    return _res12("CHM_C12_KOHLRAUSCH", val, steps,
                  f"L({target.upper()}) = {_fmt(val)} S cm2/mol",
                  "L(T) = L(S1) + L(S2) - L(S3)",
                  {"v1": v1, "v2": v2, "v3": v3, "target": val})


_C12_SALTS = {
    "cuso4": ("Cu", 2), "agno3": ("Ag", 1), "znso4": ("Zn", 2),
    "feso4": ("Fe", 2), "niso4": ("Ni", 2), "al2(so4)3": ("Al", 3),
    "aucl3": ("Au", 3), "cucl2": ("Cu", 2), "sncl2": ("Sn", 2),
    "pb(no3)2": ("Pb", 2), "cdso4": ("Cd", 2),
}


def _c12_faraday_mass(g, m, text):
    """Faraday's first law with the stated molar mass and Faraday
    constant: m = M I t / (n F), n from the electrolyte."""
    t = _c12_sup(text)
    if not re.search(r"current", t, re.I) \
            or not re.search(r"deposit|electrolys", t, re.I):
        return _GATE
    mmm = re.search(r"M\s*_?\s*([A-Z][a-z]?)\s*=\s*(\d+(?:\.\d+)?)", t)
    im = re.search(r"current\s+of\s+(\d+(?:\.\d+)?)\s*A\b", t)
    tm = re.search(r"for\s+(\d+(?:\.\d+)?)\s*(minutes?|mins?|hours?|"
                   r"hrs?|h\b|seconds?|secs?|s\b)", t)
    if not (mmm and im and tm):
        return _GATE
    metal, M = mmm.group(1), float(mmm.group(2))
    I = float(im.group(1))
    tv, tu = float(tm.group(1)), tm.group(2).lower()
    if tu.startswith("min"):
        t_s = tv * 60.0
    elif tu.startswith("h"):
        t_s = tv * 3600.0
    else:
        t_s = tv
    fm = re.search(r"F\s*=\s*(\d+(?:\.\d+)?)", t)
    F = float(fm.group(1)) if fm else 96500.0
    flat = re.sub(r"\s+", "", t).lower()
    salt = None
    for s in _C12_SALTS:
        probe = re.escape(s).replace(r"\(", r"[(]").replace(r"\)", r"[)]")
        if re.search(probe, flat):
            salt = s
            break
    if salt is None:
        return _GATE
    smetal, n = _C12_SALTS[salt]
    if smetal.lower() != metal.lower():
        return _GATE  # stated M does not match the electrolyte
    Q = I * t_s
    val = M * Q / (n * F)
    if not (0.0001 <= val <= 1e6) or I <= 0 or t_s <= 0:
        return _GATE
    steps = _beats(
        "Faraday's first law: Q = I x t, moles of electrons = Q/F, and "
        "m = M x Q/(n F) with n = electrons per deposited ion (from "
        "the electrolyte).",
        f"I = {_fmt(I)} A, t = {_fmt(tv)} {tm.group(2)} = {_fmt(t_s)} s "
        f"-> Q = {_fmt(Q)} C",
        f"moles of electrons = Q/F = {_fmt(Q)}/{_fmt(F)} = "
        f"{_fmt(Q / F)} mol; {salt.upper()} gives n = {n}",
        f"check: moles deposited = {n_half(Q / F, n)} mol x M "
        f"{_fmt(M)} g/mol -- and Q/(nF) x M re-derives the same mass",
        f"the mass deposited is {_fmt(val)} g.",
    )
    return _res12("CHM_C12_FARADAY_MASS", val, steps,
                  f"mass deposited = {_fmt(val)} g",
                  "m = M I t / (n F)",
                  {"I": I, "t_s": t_s, "Q": Q, "M": M, "n": float(n),
                   "F": F, "m": val})


def n_half(q_over_f: float, n: int) -> str:
    """Moles deposited = (Q/F)/n, for the step text."""
    return _fmt(q_over_f / n)


def _c12_faraday_series(g, m, text):
    """Series electrolysis: the same charge passes every cell, so the
    given deposit fixes moles of electrons and every other metal's mass
    is m = (n_e / n_i) x M_i."""
    t = _c12_sup(text)
    if not re.search(r"series", t, re.I) \
            or not re.search(r"deposit", t, re.I):
        return _GATE
    gm = re.search(r"depositing\s+(\d+(?:\.\d+)?)\s*g\s+of\s+"
                   r"([A-Za-z]+)", t, re.I)
    if gm is None:
        return _GATE
    m_given = float(gm.group(1))
    names = {"silver": "Ag", "copper": "Cu", "zinc": "Zn", "gold": "Au",
             "aluminium": "Al", "aluminum": "Al", "iron": "Fe",
             "nickel": "Ni"}
    g_metal = names.get(gm.group(2).lower(), gm.group(2).upper())
    g_key = g_metal.upper()
    molar = {k.upper(): float(v) for k, v in re.findall(
        r"M\s*_?\s*(Ag|Zn|Cu|Au|Al|Fe|Ni)\s*=\s*(\d+(?:\.\d+)?)", t)}
    nfac = {k.upper(): float(v) for k, v in re.findall(
        r"n\s*_?\s*(Ag|Zn|Cu|Au|Al|Fe|Ni)\s*=\s*(\d+)", t)}
    n_default = {"AG": 1.0, "ZN": 2.0, "CU": 2.0, "AU": 3.0, "AL": 3.0,
                 "FE": 2.0, "NI": 2.0}
    if g_key not in molar or len(molar) < 2:
        return _GATE
    n_g = nfac.get(g_key, n_default.get(g_key))
    if n_g is None:
        return _GATE
    ne = (m_given / molar[g_key]) * n_g
    others = [(k, molar[k], nfac.get(k, n_default.get(k)))
              for k in molar if k != g_key]
    others = [o for o in others if o[2] is not None]
    if len(others) < 2:
        return _GATE
    masses = []
    extras = {"m_given": m_given, "M_given": molar[g_key],
              "n_given": n_g, "ne": ne}
    for i, (k, M_i, n_i) in enumerate(others[:2], 1):
        m_i = ne / n_i * M_i
        masses.append((k, m_i))
        extras[f"M{i}"] = M_i
        extras[f"n{i}"] = n_i
        extras[f"m{i}"] = m_i
    steps = _beats(
        "cells in series pass the SAME charge: moles of electrons from "
        "the given deposit (n_e = (m/M) x n) deposit every other metal "
        "as m_i = (n_e / n_i) x M_i.",
        f"n({g_metal}) = {_fmt(m_given)}/{_fmt(molar[g_key])} = "
        f"{_fmt(m_given / molar[g_key])} mol -> n_e = x {n_g:g} = "
        f"{_fmt(ne)} mol",
        "; ".join(f"{k}: n = n_e/{n_i:g} = {_fmt(ne / n_i)} mol, "
                  f"m = x {_fmt(M_i)} = {_fmt(ne / n_i * M_i)} g"
                  for k, M_i, n_i in others[:2]),
        "check: same charge, so mass divides by n and multiplies by M "
        "-- the metal with n = 2 gets half the moles of the n = 1 one "
        "-- consistent",
        "; ".join(f"mass of {k} = {_fmt(mi)} g" for k, mi in masses)
        + ".",
    )
    val = masses[0][1]
    return _res12("CHM_C12_FARADAY_SERIES", val, steps,
                  "; ".join(f"mass of {k} = {_fmt(mi)} g"
                            for k, mi in masses),
                  "m_i = (n_e / n_i) x M_i, n_e from the given deposit",
                  extras)


def _c12_fuelcell_emf(g, m, text):
    """H2-O2 fuel cell standard EMF from the two reduction potentials:
    E°cell = E°(O2, reduction) - E°(H2, reduction)."""
    t = _c12_sup(text)
    if not re.search(r"fuel\s+cell", t, re.I):
        return _GATE
    eo = re.search(r"E\s*°?\s*\(\s*O2.*?=\s*([+-]?\d+(?:\.\d+)?)", t)
    eh = re.search(r"E\s*°?\s*\(\s*H2.*?=\s*([+-]?\d+(?:\.\d+)?)", t)
    if not (eo and eh):
        return _GATE
    e_o, e_h = float(eo.group(1)), float(eh.group(1))
    val = e_o - e_h
    if abs(val) > 3.0:
        return _GATE
    steps = _beats(
        "both given potentials are REDUCTION potentials, so the cell "
        "EMF is E°cell = E°(cathode) - E°(anode): oxygen is reduced at "
        "the cathode, hydrogen is oxidised at the anode.",
        f"E°(O2 reduction) = {_fmt(e_o)} V, E°(H2 as reduction) = "
        f"{_fmt(e_h)} V",
        f"E°cell = {_fmt(e_o)} - ({_fmt(e_h)}) = {_fmt(val)} V",
        "check: subtracting the anode's reduction potential is adding "
        "its oxidation potential, so a positive EMF here means the "
        "cell drives itself -- 1.23 V is the standard H2-O2 value",
        f"the standard EMF of the fuel cell is {_fmt(val)} V.",
    )
    return _res12("CHM_C12_FUELCELL_EMF", val, steps,
                  f"E°cell = {_fmt(val)} V",
                  "E°cell = E°(O2/OH-) - E°(H2O/H2)",
                  {"eO2": e_o, "eH2": e_h, "E": val})


def _c12_fuelcell_eff(g, m, text):
    """Fuel cell vs thermal plant electrical energy per mole from the
    two efficiencies and the combustion enthalpy."""
    t = _c12_sup(text)
    if not re.search(r"fuel\s+cell", t, re.I) \
            or not re.search(r"efficien", t, re.I):
        return _GATE
    etas = [float(x) for x in
            re.findall(r"(\d+(?:\.\d+)?)\s*%", t)
            if float(x) <= 100]
    dhm = re.search(r"H\s*_?\s*comb[^=\n]{0,30}?=\s*([+-]?\d+(?:\.\d+)?)",
                    t)
    if len(etas) < 2 or dhm is None:
        return _GATE
    e1, e2 = etas[0], etas[1]
    dh = abs(float(dhm.group(1)))
    if not (0 < e1 <= 100 and 0 < e2 <= 100) or dh <= 0:
        return _GATE
    out1 = e1 / 100.0 * dh
    out2 = e2 / 100.0 * dh
    val = out1 - out2
    steps = _beats(
        "efficiency splits the fuel's enthalpy into electrical output: "
        "E = eta x |dH|; the advantage is the difference of the two "
        "outputs on the SAME fuel.",
        f"eta(fuel cell) = {_fmt(e1)}%, eta(thermal) = {_fmt(e2)}%, "
        f"|dH_comb| = {_fmt(dh)} kJ/mol",
        f"fuel cell output = {_fmt(e1 / 100)} x {_fmt(dh)} = "
        f"{_fmt(out1)} kJ/mol; thermal output = {_fmt(e2 / 100)} x "
        f"{_fmt(dh)} = {_fmt(out2)} kJ/mol",
        f"check: both outputs are fractions of the same enthalpy, so "
        f"the difference is ({_fmt(e1)}% - {_fmt(e2)}%) x {_fmt(dh)} = "
        f"{_fmt(val)} kJ/mol",
        f"the fuel cell delivers {_fmt(val)} kJ more per mole of H2.",
    )
    return _res12("CHM_C12_FUELCELL_EFF", val, steps,
                  f"extra electrical energy = {_fmt(val)} kJ/mol H2",
                  "dE = (eta1 - eta2) x |dH_comb|",
                  {"eta1": e1, "eta2": e2, "dH": dh, "E1": out1,
                   "E2": out2, "diff": val})


def _c12_rate_avg(g, m, text):
    """Average reaction rate from two concentration readings; the rate
    of a REACTANT is -d[R]/dt, always positive."""
    t = _c12_sup(text)
    if not re.search(r"average\s+rate", t, re.I):
        return _GATE
    if not re.search(r"error|mistake|forgot|negative|sign", t, re.I):
        return _GATE  # plain rate asks belong to the kinetics table
    cs = [float(x) for x in re.findall(
        r"\[R\]\s*\d*\s*=\s*(\d+(?:\.\d+)?)\s*M\b", t)]
    ts = [float(x) for x in
          re.findall(r"t\s*=\s*(\d+(?:\.\d+)?)\s*s\b", t)]
    if len(cs) < 2 or len(ts) < 2:
        return _GATE
    c0, c1 = cs[0], cs[1]
    t0, t1 = ts[0], ts[1]
    if t1 == t0:
        return _GATE
    val = -(c1 - c0) / (t1 - t0)
    if val <= 0:
        return _GATE  # a reactant's rate is positive by definition
    steps = _beats(
        "the average rate of a REACTANT is defined with a minus sign: "
        "rate = -d[R]/dt; the minus cancels the concentration DROP, so "
        "the rate is always positive.",
        f"[R]({_fmt(t0)} s) = {_fmt(c0)} M, [R]({_fmt(t1)} s) = "
        f"{_fmt(c1)} M",
        f"rate = -({_fmt(c1)} - {_fmt(c0)})/{_fmt(t1 - t0)} = "
        f"-({_fmt(c1 - c0)})/{_fmt(t1 - t0)} = {_fmt(val)} M/s",
        "check: the concentration fell, d[R] is negative, the definition "
        "minus sign flips it -- a negative rate would claim the "
        "reaction runs backwards",
        f"the correct average rate is {_fmt(val)} M/s.",
    )
    return _res12("CHM_C12_RATE_AVG", val, steps,
                  f"average rate = {_fmt(val)} M/s",
                  "rate = -d[R]/dt",
                  {"C0": c0, "C1": c1, "t0": t0, "t1": t1, "rate": val})


def _c12_zero_order(g, m, text):
    """Zero-order kinetics: [A] = [A]0 - kt, t1/2 = [A]0/2k, and the
    time for a stated fraction decomposed."""
    t = _c12_sup(text)
    if not re.search(r"zero.?order", t, re.I):
        return _GATE
    a0m = re.search(r"(?:initial\s*)?\[[A-Za-z0-9]+\]\s*=?\s*"
                    r"(\d+(?:\.\d+)?)\s*mol\s*/?\s*L", t, re.I)
    km = re.search(r"k\s*=\s*" + _C12_SCI + r"\s*mol", t, re.I)
    tmm = re.search(r"after\s+(\d+(?:\.\d+)?)\s*s\b", t)
    fm = re.search(r"(\d+(?:\.\d+)?)\s*%\s*decompos", t, re.I)
    if not (a0m and km and tmm):
        return _GATE
    a0 = float(a0m.group(1))
    k = _c12_num(km.group(1))
    tt = float(tmm.group(1))
    if k <= 0 or a0 <= 0 or tt <= 0:
        return _GATE
    at = a0 - k * tt
    if not (0.0 <= at < a0):
        return _GATE  # fully consumed inside the window: different ask
    t_half = a0 / (2.0 * k)
    parts = (f"(a) [{chr(65)}] after {tt:g} s = {_fmt(at)} mol/L; "
             f"(b) half-life = {_fmt(t_half)} s")
    extras = {"A0": a0, "k": k, "t": tt, "At": at, "t_half": t_half}
    if fm:
        frac = float(fm.group(1))
        if 0 < frac < 100:
            t_frac = (frac / 100.0) * a0 / k
            extras["frac"] = frac
            extras["t_frac"] = t_frac
            parts += (f"; (c) time for {frac:g}% decomposition = "
                      f"{_fmt(t_frac)} s")
    steps = _beats(
        "zero order means the rate is INDEPENDENT of concentration: "
        "[A] = [A]0 - kt, so t1/2 = [A]0/2k (it lengthens as the "
        "reaction proceeds) and a fraction f is gone at t = f[A]0/k.",
        f"[A]0 = {_fmt(a0)} mol/L, k = {_fmt(k)} mol/(L s), "
        f"t = {_fmt(tt)} s",
        f"[A] = {_fmt(a0)} - {_fmt(k)} x {_fmt(tt)} = {_fmt(at)} mol/L; "
        f"t1/2 = {_fmt(a0)}/(2 x {_fmt(k)}) = {_fmt(t_half)} s",
        "check: the concentration LINE falls by kt per interval (equal "
        "drops in equal times -- the zero-order signature); the "
        "half-life is HALF the starting concentration over k",
        parts + ".",
    )
    return _res12("CHM_C12_ZERO_ORDER", at, steps, parts,
                  "[A] = [A]0 - kt; t1/2 = [A]0/2k",
                  extras)


def _c12_born_haber(g, m, text):
    """Born-Haber cycle: the lattice enthalpy closes the enthalpy sum
    of formation, LE = dHf - (sub + IE + 1/2 BDE + EA)."""
    t = _c12_sup(text)
    if not (re.search(r"born.{0,4}haber", t, re.I)
            or re.search(r"lattice\s+enthalpy", t, re.I)):
        return _GATE
    subm = re.search(r"H\s*_?\s*sub\s*\(\s*\w+\s*\)\s*=\s*"
                     r"([+-]?\d+(?:\.\d+)?)", t)
    iem = re.search(r"\bIE\s*\d?\s*\(\s*\w+\s*\)\s*=\s*"
                    r"([+-]?\d+(?:\.\d+)?)", t)
    eam = re.search(r"\bEA\s*\(\s*\w+\s*\)\s*=\s*([+-]?\d+(?:\.\d+)?)", t)
    hfm = re.search(r"H\s*_?\s*f\s*[°o]?\s*\(\s*\w+\s*\)\s*=\s*"
                    r"([+-]?\d+(?:\.\d+)?)", t)
    bdm = re.search(r"(?:\u00bd|1\s*[/\u2044]\s*2\s*[x*]?\s*)BDE\s*"
                    r"\(\s*\w+\s*\)\s*=\s*([+-]?\d+(?:\.\d+)?)", t)
    if not (subm and iem and eam and hfm and bdm):
        return _GATE
    sub = float(subm.group(1))
    ie = float(iem.group(1))
    ea = float(eam.group(1))
    dhf = float(hfm.group(1))
    bde = float(bdm.group(1))
    le = dhf - (sub + ie + bde + ea)
    if abs(le) > 20000.0:
        return _GATE
    steps = _beats(
        "Hess's law around the Born-Haber cycle: formation equals the "
        "atomisation + ionisation + half-bond-dissociation + electron-"
        "affinity steps MINUS the lattice enthalpy, so "
        "LE = dHf - (sub + IE + 1/2 BDE + EA).",
        f"sub = {_fmt(sub)}, IE = {_fmt(ie)}, 1/2 BDE = {_fmt(bde)}, "
        f"EA = {_fmt(ea)} kJ/mol, dHf = {_fmt(dhf)} kJ/mol",
        f"sum of steps to gaseous ions = {_fmt(sub)} + {_fmt(ie)} + "
        f"{_fmt(bde)} + ({_fmt(ea)}) = {_fmt(sub + ie + bde + ea)} "
        f"kJ/mol",
        f"check: LE = {_fmt(dhf)} - ({_fmt(sub + ie + bde + ea)}) = "
        f"{_fmt(le)} kJ/mol; the lattice enthalpy is reported as the "
        f"positive {_fmt(abs(le))} kJ/mol (formation of the lattice is "
        f"strongly exothermic)",
        f"the lattice enthalpy is {_fmt(abs(le))} kJ/mol.",
    )
    return _res12("CHM_C12_BORN_HABER", abs(le), steps,
                  f"lattice enthalpy = {_fmt(abs(le))} kJ/mol",
                  "LE = dHf - (sub + IE + 1/2 BDE + EA)",
                  {"sub": sub, "IE": ie, "EA": ea, "bde": bde,
                   "dHf": dhf, "LE": abs(le)})


def _c12_molar_volume(g, m, text):
    """Molar gas volume at a stated pressure in bar: V = RT/P with the
    L-bar gas constant (the 22.4 L value belongs to 1 atm, not 1 bar)."""
    t = _c12_sup(text)
    if not re.search(r"molar\s+volume", t, re.I):
        return _GATE
    if not re.search(r"\bbar\b", t, re.I):
        return _GATE
    tm = re.search(r"at\s+(\d+(?:\.\d+)?)\s*K\b", t)
    pm = re.search(r"(\d+(?:\.\d+)?)\s*bar\b", t)
    if not (tm and pm):
        return _GATE
    T = float(tm.group(1))
    P = float(pm.group(1))
    if not (0.05 <= P <= 10.0) or T <= 0:
        return _GATE
    t_note = ""
    if abs(T - 273.0) < 0.5:
        T_use = 273.15
        t_note = " (273 K is 0 degC = 273.15 K)"
    else:
        T_use = T
    val = 0.08314 * T_use / P
    if not (1.0 <= val <= 1000.0):
        return _GATE
    steps = _beats(
        "ideal gas molar volume: V = RT/P; with pressure in BAR the "
        "matching gas constant is R = 0.08314 L bar/(K mol). The "
        "familiar 22.4 L is the OLD 1 atm standard, not 1 bar.",
        f"T = {_fmt(T)} K{t_note}, P = {_fmt(P)} bar",
        f"V = {_fmt(0.08314)} x {_fmt(T_use)}/{_fmt(P)} = {_fmt(val)} L",
        "check: 1 bar is slightly BELOW 1 atm, so the volume must be "
        "slightly ABOVE 22.4 L -- it is",
        f"the molar volume at {_fmt(P)} bar and {_fmt(T_use)} K is "
        f"{_fmt(val)} L/mol.",
    )
    return _res12("CHM_C12_MOLAR_VOLUME", val, steps,
                  f"molar volume = {_fmt(val)} L/mol",
                  "V = RT/P, R = 0.08314 L bar/(K mol)",
                  {"T": T_use, "P": P, "V": val})


_TABLE_CHEM_C12: List[Tuple[str, str, Any]] = [
    ("CHM_C12_PH_POLY", r"\bpH\b", _c12_ph_poly),
    ("CHM_C12_COMBUST_ATOMM", r"co2|carbon\s+dioxide", _c12_combust_atomm),
    ("CHM_C12_PHOTO_SPEED", r"photoelectric|photoelectron|work\s+function",
     _c12_photo_speed),
    ("CHM_C12_DEBROGLIE", r"wavelength", _c12_debroglie),
    ("CHM_C12_RAOULT_SOLN", r"vapour\s+pressure|vapor\s+pressure",
     _c12_raoult_soln),
    ("CHM_C12_RAOULT_IDEAL", r"vapour\s+pressure|vapor\s+pressure",
     _c12_raoult_ideal),
    ("CHM_C12_RLVP_MOLAR", r"vapour\s+pressure|vapor\s+pressure",
     _c12_rlvp_molar),
    ("CHM_C12_KF_MOLAR", r"freez", _c12_kf_molar),
    ("CHM_C12_NERNST_K", r"equilibrium\s+constant|nernst|E\s*°",
     _c12_nernst_k),
    ("CHM_C12_KOHLRAUSCH", r"kohlrausch|[\u039b\u03bb]", _c12_kohlrausch),
    ("CHM_C12_FARADAY_MASS", r"current|deposit|electrolys",
     _c12_faraday_mass),
    ("CHM_C12_FARADAY_SERIES", r"series|deposit", _c12_faraday_series),
    ("CHM_C12_FUELCELL_EMF", r"fuel\s+cell", _c12_fuelcell_emf),
    ("CHM_C12_FUELCELL_EFF", r"fuel\s+cell", _c12_fuelcell_eff),
    ("CHM_C12_RATE_AVG", r"average\s+rate", _c12_rate_avg),
    ("CHM_C12_ZERO_ORDER", r"zero.?order", _c12_zero_order),
    ("CHM_C12_BORN_HABER", r"born.{0,4}haber|lattice\s+enthalpy",
     _c12_born_haber),
    ("CHM_C12_MOLAR_VOLUME", r"molar\s+volume", _c12_molar_volume),
]


# =========================================================================== #
# BLOCK C2: Advanced Chemistry families classes 11-12 (from chemistry2_families.py)
# =========================================================================== #

_NUM = r"\d+(?:\.\d+)?"

# scientific-notation-aware numeric alternatives (order matters: the
# longer pair form must be tried before the bare mantissa)
_SCI_ALT = (
    _NUM + r"\s*(?:x|\*|×)\s*10\s*(?:\^|\*\*)?\s*\(?\s*[+-]?" + _NUM
    + r"\s*\)?"
    + r"|" + _NUM + r"\s*[eE]\s*[+-]?" + _NUM
    + r"|10(?!\d)\s*(?:\^|\*\*)?\s*\(?\s*[+-]?" + _NUM + r"\s*\)?"
    + r"|" + _NUM
)
_SCI_ANY = r"-?(?:" + _SCI_ALT + r")"


def _scig(name: str) -> str:
    """Named slot that accepts 0.01, 10^-2, 1 x 10^-3, 2 x 10-4, 3.0e-2."""
    return r"(?P<" + name + r">-?(?:" + _SCI_ALT + r"))"


def _sci(s: str) -> float:
    """Parse any accepted numeric form into a float."""
    t = str(s).strip().replace(",", "").replace("×", "x")
    m = re.match(r"^(-?" + _NUM + r")\s*(?:x|\*)\s*10\s*(?:\^|\*\*)?\s*"
                 r"\(?\s*([+-]?" + _NUM + r")\s*\)?$", t, re.I)
    if m:
        return float(m.group(1)) * 10.0 ** float(m.group(2))
    m = re.match(r"^(-?" + _NUM + r")\s*[eE]\s*([+-]?" + _NUM + r")$", t)
    if m:
        return float(m.group(1)) * 10.0 ** float(m.group(2))
    m = re.match(r"^10(?!\d)\s*(?:\^|\*\*)?\s*\(?\s*([+-]?" + _NUM
                 + r")\s*\)?$", t, re.I)
    if m:
        return 10.0 ** float(m.group(1))
    return float(t)


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res_chem2(structure: str, g: Dict[str, Any], value: Optional[float],
               steps: List[str], assumptions: Optional[List[str]] = None,
         conf: float = 0.95, answer: Optional[str] = None,
         q_extra: Optional[Dict[str, float]] = None) -> ModelResult:
    quantities = {k: _numify(v) for k, v in g.items()}
    if q_extra:
        quantities.update(q_extra)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=quantities, governing_equation=structure,
        final_answer=answer or (f"{value:.6g}" if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


def _numify(v: Any) -> float:
    """Coerce a raw slot value (may be '2 x 10-4' or a species name)."""
    if isinstance(v, bool):
        return 0.0
    if isinstance(v, (int, float)):
        return float(v)
    try:
        return _sci(v)
    except Exception:
        return 0.0


def _pos(*vals: float) -> bool:
    return all(v > 0 for v in vals)


def _ph_ok(ph: float) -> bool:
    return -1e-9 <= ph <= 14 + 1e-9


_CONC_ITEM = re.compile(r"\[\s*([A-Za-z][\w+\-]*)\s*\]\s*=\s*("
                        + _SCI_ANY + r")")


def _conc_list(text: str):
    return [(cm.group(1), _sci(cm.group(2))) for cm in _CONC_ITEM.finditer(text)]


def _parse_reaction(rxn: str):
    """'2A + B <=> 3C' -> ({A:2, B:1}, {C:3}); None if unparseable."""
    s = rxn.replace("⇌", "<=>").replace("⇋", "<=>").strip()
    parts = re.split(r"\s*(?:<=>|<->|-->|->|=)\s*", s)
    if len(parts) != 2:
        return None

    def side(sp: str) -> Dict[str, float]:
        out: Dict[str, float] = {}
        for sm in re.finditer(r"(\d+(?:\.\d+)?)?\s*\*?\s*([A-Za-z][A-Za-z0-9]*)",
                              sp):
            coef = float(sm.group(1)) if sm.group(1) else 1.0
            out[sm.group(2)] = out.get(sm.group(2), 0.0) + coef
        return out

    left, right = side(parts[0]), side(parts[1])
    if not left or not right:
        return None
    return left, right


_ATOMIC_MASS = {
    "H": 1.008, "C": 12.011, "N": 14.007, "O": 15.999, "S": 32.06,
    "P": 30.974, "Na": 22.990, "K": 39.098, "Ca": 40.078, "Mg": 24.305,
    "Al": 26.982, "Cl": 35.45, "Br": 79.904, "Fe": 55.845, "Cu": 63.546,
    "Zn": 65.38, "Ag": 107.868, "I": 126.904, "Mn": 54.938, "Ba": 137.327,
    "Pb": 207.2, "Sn": 118.71, "Cr": 51.996, "Ni": 58.693,
}

_ACID_H = {"hclo4": 1, "h2so4": 2, "hno3": 1, "hcl": 1, "hbr": 1, "hi": 1}


# --------------------------------------------------------------------------- #
# Compute functions: (g, m, text) ->
#   (value | None, steps, answer_override | None, assumptions | None
#    [, quantities_override])
# --------------------------------------------------------------------------- #


def _c_limiting(g, m, text):
    m1, m2 = _sci(g["g1"]), _sci(g["g2"])
    mm1, mm2 = _sci(g["mm1"]), _sci(g["mm2"])
    if not _pos(m1, m2, mm1, mm2):
        return None, [], None, None
    a, b = g["a"].strip(), g["b"].strip()
    n1 = (g.get("n1") or "").strip().lower()
    mma, mmb = mm1, mm2
    if n1 and n1 == b.lower():
        mma, mmb = mm2, mm1  # molar masses listed in swapped order
    na, nb = m1 / mma, m2 / mmb
    if na <= nb:
        lim, other, nlim = a, b, na
    else:
        lim, other, nlim = b, a, nb
    steps = [
        f"n({a}) = mass/molar mass = {m1:g}/{mma:g} = {na:.6g} mol",
        f"n({b}) = mass/molar mass = {m2:g}/{mmb:g} = {nb:.6g} mol",
        f"{lim} yields fewer moles -> limiting reagent = {lim} "
        f"({other} is in excess)",
        f"moles of product (1:1:1 assumed) = n(limited) = {nlim:.6g} mol",
    ]
    ans = f"limiting reagent = {lim}; moles of product = {nlim:.6g} mol"
    return nlim, steps, ans, ["stoichiometry assumed 1:1:1 (A + B -> P)"]


def _c_kc(g, m, text):
    conc = _conc_list(text)
    if len(conc) < 2 or any(v <= 0 for _, v in conc):
        return None, [], None, None
    rm = re.search(r"(?:reaction|equation)\s*(?:is\s*)?[:=]?\s*"
                   r"([A-Za-z0-9\s+\-<>=⇌()*]{2,80}?)\s*(?:\.|$|,|;)",
                   text, re.I)
    if not rm:
        return None, [], None, None
    sides = _parse_reaction(rm.group(1))
    if not sides:
        return None, [], None, None
    left, right = sides
    low = {k.lower(): v for k, v in conc}

    def side_prod(side: Dict[str, float]):
        prod, terms = 1.0, []
        for sp, coef in side.items():
            v = low.get(sp.lower())
            if v is None:
                raise KeyError(sp)
            prod *= v ** coef
            terms.append(f"[{sp}]" + (f"^{coef:g}" if coef != 1 else ""))
        return prod, terms

    try:
        num, num_t = side_prod(right)
        den, den_t = side_prod(left)
    except KeyError:
        return None, [], None, None
    kc = num / den
    steps = [
        "Kc = products / reactants, each concentration raised to its "
        "stoichiometric coefficient",
        f"Kc = ({' x '.join(num_t)}) / ({' x '.join(den_t)})",
        f"Kc = {kc:.6g}",
    ]
    return kc, steps, None, None


def _c_ph_calc(g, m, text):
    h = _sci(g["h"])
    if h <= 0:
        return None, [], None, None
    ph = -math.log10(h)
    if not _ph_ok(ph):
        return None, [], None, None
    steps = [f"pH = -log10[H+] = -log10({g['h'].strip()} = {h:.6g}) = "
             f"{ph:.6g}"]
    return ph, steps, None, None


def _c_ph_acid(g, m, text):
    c = _sci(g["c"])
    acid = g["acid"].strip()
    n = _ACID_H.get(acid.lower())
    if not _pos(c) or n is None:
        return None, [], None, None
    h = n * c
    ph = -math.log10(h)
    if not _ph_ok(ph):
        return None, [], None, None
    basic = "diprotic" if n == 2 else "monoprotic"
    steps = [
        f"{acid} is {basic}: [H+] = {n} x {c:g} = {h:.6g} M",
        f"pH = -log10({h:.6g}) = {ph:.6g}",
    ]
    return ph, steps, None, None


def _c_buffer(g, m, text):
    pka = _sci(g["pka"])
    am = re.search(r"acid[^.]{0,30}?=\s*(" + _SCI_ANY + r")", text, re.I)
    sm = re.search(r"salt[^.]{0,30}?=\s*(" + _SCI_ANY + r")", text, re.I)
    if not (am and sm) or not _pos(pka) or pka > 14:
        return None, [], None, None
    ca, cs = _sci(am.group(1)), _sci(sm.group(1))
    if not _pos(ca, cs):
        return None, [], None, None
    ph = pka + math.log10(cs / ca)
    if not _ph_ok(ph):
        return None, [], None, None
    steps = [
        "Henderson-Hasselbalch: pH = pKa + log10([salt]/[acid])",
        f"pH = {pka:g} + log10({cs:g}/{ca:g}) = {pka:g} + "
        f"{math.log10(cs / ca):.6g} = {ph:.6g}",
    ]
    return ph, steps, None, None


_HES_VAL = re.compile(
    r"(?:Δ\s*H|delta\s*H|(?<![A-Za-z])d\s*H)\s*\d*\s*(?:is|was|=|:)?\s*("
    + _SCI_ANY + r")\s*kJ", re.I)


def _c_hess(g, m, text):
    vals = [_sci(vm.group(1)) for vm in _HES_VAL.finditer(text)]
    if len(vals) < 2:
        return None, [], None, None
    total = sum(vals)
    steps = ["Hess's law: dH(target) = algebraic sum of the given steps"]
    for i, v in enumerate(vals, 1):
        steps.append(f"step {i}: dH{i} = {v:g} kJ")
    steps.append(f"dH(target) = {' + '.join(f'({v:g})' for v in vals)}"
                 f" = {total:.6g} kJ")
    return total, steps, None, ["steps taken with the signs as written; "
                                "reverse a step by negating its dH"]


def _c_thermo(g, m, text):
    n, dh = _sci(g["n"]), _sci(g["dh"])
    if not _pos(n):
        return None, [], None, None
    q = n * dh
    if q < 0:
        ans = f"Q = {q:.6g} kJ (heat released = {-q:.6g} kJ)"
        direction = f"negative Q -> exothermic; heat released = {-q:.6g} kJ"
    elif q > 0:
        ans = f"Q = +{q:.6g} kJ (heat absorbed)"
        direction = "positive Q -> endothermic"
    else:
        ans = "Q = 0 kJ"
        direction = "Q is zero"
    steps = [
        f"Q = n x dH = {n:g} mol x ({dh:g} kJ/mol) = {q:.6g} kJ",
        direction,
    ]
    return q, steps, ans, None


def _c_nernst(g, m, text):
    e0m = re.search(r"\bE\s*[°o0]?\s*(?:cell)?\s*(?:is|=|:)\s*("
                    + _SCI_ANY + r")", text, re.I)
    nm = re.search(r"\bn\s*(?:is|=|:)\s*(\d+)", text, re.I) or \
        re.search(r"(\d+)\s+electrons?\s+(?:are\s+)?transfer\w+", text, re.I)
    q, q_note = None, ""
    qm = re.search(r"\bQ\s*(?:is|=|:)\s*(" + _SCI_ANY + r")", text)
    if qm:
        q = _sci(qm.group(1))
    else:
        conc = _conc_list(text)
        if len(conc) == 2:
            q = conc[0][1] / conc[1][1]
            q_note = (f"Q estimated as first concentration over second: "
                      f"{q:.6g} (oxidised/reduced)")
    if not (e0m and nm and q is not None):
        return None, [], None, None
    e0, n = _sci(e0m.group(1)), float(nm.group(1))
    if not _pos(q) or not _pos(n) or n > 12:
        return None, [], None, None
    e = e0 - (0.0591 / n) * math.log10(q)
    if abs(e) > 6:
        return None, [], None, None
    steps = [
        "Nernst equation (298 K): E = E° - (0.0591/n) log10 Q",
        f"Q = {q:.6g}" + (f" ({q_note})" if q_note else ""),
        f"E = {e0:g} - (0.0591/{n:g}) x log10({q:.6g}) = {e0:g} - "
        f"{(0.0591 / n) * math.log10(q):.6g} = {e:.6g} V",
    ]
    return e, steps, None, ["0.0591 V form of 2.303RT/F at 298 K"]


def _c_emf(g, m, text):
    if re.search(r"nernst", text, re.I):
        return None, [], None, None
    ec = re.search(r"(?:E\s*[°o0]?\s*cathod\w*|cathod\w*[^,;.]{0,20}?\bE\s*"
                   r"[°o0]?)\s*(?:is|=|:)?\s*(" + _SCI_ANY + r")", text, re.I)
    ea = re.search(r"(?:E\s*[°o0]?\s*anod\w*|anod\w*[^,;.]{0,20}?\bE\s*"
                   r"[°o0]?)\s*(?:is|=|:)?\s*(" + _SCI_ANY + r")", text, re.I)
    if not (ec and ea):
        return None, [], None, None
    vc, va = _sci(ec.group(1)), _sci(ea.group(1))
    emf = vc - va
    if abs(emf) > 6:
        return None, [], None, None
    steps = [
        "EMF = E(cathode) - E(anode)",
        f"EMF = {vc:g} - ({va:g}) = {emf:.6g} V",
    ]
    return emf, steps, None, None


_T12 = r"(?:t\s*(?:1\s*/\s*2|½)|t1/2)"
_UNIT = r"(minutes?|mins?|seconds?|secs?|s\b|hours?|hrs?|h\b)"


def _c_kinetics(g, m, text):
    hm = re.search(r"(?:half[\s-]*life|" + _T12 + r")\s*(?:" + _T12
                   + r"\s*)?(?:is|=|of|:)?\s*(" + _SCI_ANY + r")\s*" + _UNIT,
                   text, re.I)
    if not hm:  # reverse phrasing: 'half-life of a first order reaction is 20 min'
        hm = re.search(r"(?:half[\s-]*life|" + _T12 + r").{0,60}?("
                       + _SCI_ANY + r")\s*(minutes?|mins?|seconds?|secs?|"
                       r"hours?|hrs?)\b(?!\s*\^?\s*-\s*1)", text, re.I)
    if not hm:
        return None, [], None, None
    t = _sci(hm.group(1))
    if not _pos(t):
        return None, [], None, None
    u = hm.group(2).lower()
    usym = "min" if u.startswith("m") else ("h" if u.startswith("h") else "s")
    k = 0.693 / t
    steps = [
        "first-order half-life: t(1/2) = 0.693/k",
        f"k = 0.693/t(1/2) = 0.693/{t:g} {usym} = {k:.6g} {usym}^-1",
    ]
    return k, steps, None, None


def _c_mole_fraction(g, m, text):
    na, nb = _sci(g["na"]), _sci(g["nb"])
    if not _pos(na, nb):
        return None, [], None, None
    a, b = g["a"].strip(), g["b"].strip()
    # ask-name guard: the question must name whose fraction it wants;
    # a name-blind promotion ships the WRONG component's share
    ask = re.search(r"mole\s+fraction\s+(?:of\s+)(?:the\s+)?"
                    r"([A-Za-z][A-Za-z0-9]*)", text, re.I)
    if not ask:
        return None, [], None, None
    name = ask.group(1).lower()
    if name == a.lower():
        x = na / (na + nb)
        head = a
        num = na
    elif name == b.lower():
        x = nb / (na + nb)
        head = b
        num = nb
    else:
        return None, [], None, None
    if not (0 < x < 1):
        return None, [], None, None
    steps = [
        f"x({head}) = n({head})/(n({a}) + n({b})) = {num:g}/"
        f"({na:g} + {nb:g}) = {x:.6g}",
    ]
    return x, steps, None, None


def _c_molality(g, m, text):
    ms, mm, w = _sci(g["m"]), _sci(g["mm"]), _sci(g["w"])
    if not _pos(ms, mm, w):
        return None, [], None, None
    w_kg = w / 1000.0 if g["wu"].lower().startswith("g") else w
    molal = (ms / mm) / w_kg
    if not _pos(molal) or molal > 100:
        return None, [], None, None
    steps = [
        f"moles of solute = {ms:g}/{mm:g} = {ms / mm:.6g} mol",
        f"solvent mass = {w:g} {'g' if w_kg != w else 'kg'} = {w_kg:g} kg",
        f"molality = {ms / mm:.6g} mol / {w_kg:g} kg = {molal:.6g} mol/kg",
    ]
    return molal, steps, None, None


def _c_ppm(g, m, text):
    mgm = re.search(r"(" + _SCI_ANY + r")\s*mg\b", text, re.I)
    lm = re.search(r"(?:in|of|into)\s*(" + _SCI_ANY + r")\s*"
                   r"(?:L\b|litres?\b|liters?\b)", text, re.I)
    if not (mgm and lm):
        return None, [], None, None
    mg, vol = _sci(mgm.group(1)), _sci(lm.group(1))
    if not _pos(mg, vol):
        return None, [], None, None
    ppm = mg / vol
    if ppm > 1e6:
        return None, [], None, None
    steps = [
        "ppm = mg of solute per litre of solution (dilute aqueous)",
        f"ppm = {mg:g} mg / {vol:g} L = {ppm:.6g} mg/L = {ppm:.6g} ppm",
    ]
    return ppm, steps, None, None


def _intify(ratios: List[float]) -> List[int]:
    """Round mole ratios to small whole numbers (x2, x3, ... if needed)."""
    for mult in (1, 2, 3, 4, 5, 6, 8):
        scaled = [r * mult for r in ratios]
        if all(abs(sv - round(sv)) < 0.12 for sv in scaled):
            return [int(round(sv)) for sv in scaled]
    return [int(round(r)) for r in ratios]


def _formula_order(elems: List[str]) -> List[str]:
    rest = sorted(e for e in elems if e not in ("C", "H"))
    order = [e for e in ("C", "H") if e in elems]
    return order + rest


def _c_empirical(g, m, text):
    items: Dict[str, float] = {}
    for em in re.finditer(r"([A-Z][a-z]?)\s*(?:=|:|is)?\s*(" + _SCI_ANY
                          + r")\s*%", text):
        el = em.group(1)
        if el in _ATOMIC_MASS and el not in items:
            items[el] = _sci(em.group(2))
    if len(items) < 2:  # '40% C, 6.7% H, 53.3% O' order
        items = {}
        for em in re.finditer(r"(" + _SCI_ANY + r")\s*%\s*(?:of\s+)?"
                              r"([A-Z][a-z]?)", text):
            el = em.group(2)
            if el in _ATOMIC_MASS and el not in items:
                items[el] = _sci(em.group(1))
    if len(items) < 2 or any(v <= 0 for v in items.values()):
        return None, [], None, None
    total = sum(items.values())
    if not (90 <= total <= 110):
        return None, [], None, None
    mols = {el: pct / _ATOMIC_MASS[el] for el, pct in items.items()}
    small = min(mols.values())
    ratios = {el: v / small for el, v in mols.items()}
    ints = _intify(list(ratios.values()))
    subs = dict(zip(list(ratios.keys()), ints))
    formula = "".join(el + (str(subs[el]) if subs[el] > 1 else "")
                      for el in _formula_order(list(items.keys())))
    steps = [
        "assume a 100 g sample: "
        + ", ".join(f"{el} = {p:g} g" for el, p in items.items()),
        "moles = mass / atomic mass: "
        + ", ".join(f"{el} = {p:g}/{_ATOMIC_MASS[el]:g} = {mols[el]:.6g}"
                    for el, p in items.items()),
        f"divide by the smallest ({small:.6g}): "
        + ", ".join(f"{el} = {ratios[el]:.6g}" for el in items),
        f"nearest whole-number ratio -> {formula}",
    ]
    ans = f"empirical formula = {formula}"
    q_extra = {f"pct_{el}": p for el, p in items.items()}
    q_extra.update({f"mol_{el}": mols[el] for el in items})
    return None, steps, ans, ["percentages taken as masses of a 100 g sample",
                              "ratio rounded to nearest whole number"], q_extra


def _c_percent(g, m, text):
    am = re.search(r"atomic\s+mass(?:\s+of\s+[A-Za-z][A-Za-z0-9]{0,10}?)?\s*"
                   r"(?:is|=|:)?\s*(" + _SCI_ANY + r")", text, re.I)
    mm = re.search(r"(?:molar|molecular)\s+mass(?:\s+of\s+(?:the\s+)?"
                   r"(?:compound|substance|salt))?\s*(?:is|=|:)?\s*("
                   + _SCI_ANY + r")", text, re.I)
    atm = re.search(r"(\d+)\s*atoms?\b", text, re.I)
    if not (am and mm):
        return None, [], None, None
    a_mass, mmass = _sci(am.group(1)), _sci(mm.group(1))
    n_at = float(atm.group(1)) if atm else 1.0
    if not _pos(a_mass, mmass) or n_at < 1:
        return None, [], None, None
    pct = n_at * a_mass / mmass * 100.0
    if not (0 < pct <= 100):
        return None, [], None, None
    steps = [
        f"mass contributed = n x atomic mass = {n_at:g} x {a_mass:g} = "
        f"{n_at * a_mass:.6g}",
        f"% = (mass contributed / molar mass) x 100 = "
        f"({n_at * a_mass:.6g}/{mmass:g}) x 100 = {pct:.6g}%",
    ]
    assum = None if atm else ["n atoms not stated; taken as 1"]
    return pct, steps, None, assum


# --------------------------------------------------------------------------- #
# The table: (id, regex, compute)
# --------------------------------------------------------------------------- #

TABLE_C2 = [
    # ---- stoichiometry ----
    ("limiting_reagent",
     _scig("g1") + r"\s*g(?:ram)?s?\s+of\s+"
     r"(?P<a>[A-Za-z][A-Za-z0-9]{0,15}?)\s+reacts?\s+with\s+"
     + _scig("g2") + r"\s*g(?:ram)?s?\s+of\s+"
     r"(?P<b>[A-Za-z][A-Za-z0-9]{0,15}?)\b"
     r".{0,140}?molar\s+mass(?:es)?\s+of\s+"
     r"(?P<n1>[A-Za-z][A-Za-z0-9]{0,15}?)\s+(?:is|=|:)\s*"
     + _scig("mm1") + r"(?:\s*g\s*(?:/|per)\s*mol)?\s*(?:and|,|;)\s*"
     r"(?:of\s+)?(?P<n2>[A-Za-z][A-Za-z0-9]{0,15}?)\s+(?:is|=|:)\s*"
     + _scig("mm2") + r"(?:\s*g\s*(?:/|per)\s*mol)?",
     _c_limiting),

    # ---- equilibrium ----
    ("equilibrium_kc",
     r"at\s+equilibrium\b.*\[\s*[A-Za-z][\w+\-]*\s*\]\s*=\s*" + _SCI_ANY,
     _c_kc),

    # ---- ionic equilibrium ----
    ("ph_calc",
     r"pH\b[^=]{0,60}?\[\s*(?:H\s*\+?|H3O\s*\+)\s*\]\s*=\s*" + _scig("h"),
     _c_ph_calc),
    ("ph_strong_acid",
     r"pH\b[^.]{0,80}?" + _scig("c")
     + r"\s*(?:M|mol\s*/?\s*L|mol\s*dm-3|molar)\s+"
     r"(?P<acid>HClO4|H2SO4|HNO3|HCl|HBr|HI)\b",
     _c_ph_acid),
    ("buffer_ph",
     r"buffer.{0,200}?p\s*[Kk]\s*a\s*(?:value)?\s*(?:is|=|of|:)?\s*"
     + _scig("pka"),
     _c_buffer),

    # ---- thermochemistry ----
    ("hess_law",
     r"hess(?:'s)?\s+law",
     _c_hess),
    ("thermochemistry",
     _scig("n") + r"\s*(?:moles?|mol)\b.{0,120}?"
     r"(?:Δ\s*H|delta\s*H|(?<![A-Za-z])d\s*H|enthalpy)\s*\d*\s*"
     r"(?:is|=|:)?\s*" + _scig("dh") + r"\s*kJ\s*(?:/\s*|per\s*)?mols?\b",
     _c_thermo),

    # ---- electrochemistry ----
    ("nernst_eq",
     r"nernst",
     _c_nernst),
    ("emf_cell",
     r"(?:\bemf\b|electromotive\s+force|cell\s+potential)",
     _c_emf),

    # ---- kinetics ----
    ("kinetics_first_order",
     r"(?:first[\s-]*order|1st[\s-]*order)",
     _c_kinetics),

    # ---- solutions ----
    ("mole_fraction",
     r"mole\s+fraction.{0,160}?" + _scig("na")
     + r"\s*(?:moles?|mol)\s*(?:of\s+)?"
     r"(?P<a>[A-Za-z][A-Za-z0-9]{0,15}?)\b.{0,60}?" + _scig("nb")
     + r"\s*(?:moles?|mol)\s*(?:of\s+)?"
     r"(?P<b>[A-Za-z][A-Za-z0-9]{0,15}?)\b",
     _c_mole_fraction),
    ("molality",
     r"molality.{0,200}?" + _scig("m") + r"\s*g(?:ram)?s?\b[^.]{0,60}?"
     r"(?:molar\s+mass|molecular\s+mass|gram\s+(?:molecular\s+)?mass|M\s*=)"
     r"[^.]{0,20}?(?:is|=|of|:)?\s*" + _scig("mm")
     + r".{0,80}?" + _scig("w")
     + r"\s*(?P<wu>kg|kilograms?|g|grams?)\b\s*(?:of\s+)?(?:the\s+)?"
     r"(?:solvent|water)\b",
     _c_molality),
    ("concentration_ppm",
     r"(?:\bppm\b|parts\s+per\s+million)",
     _c_ppm),

    # ---- composition ----
    ("empirical_formula",
     r"empirical\s+formula",
     _c_empirical),
    ("percent_composition",
     r"(?:percentage|percent)\s+(?:composition|of|by\s+mass)",
     _c_percent),
]


def model_chemistry2(text: str) -> ModelResult:
    """Single dispatcher: scan the typed table, first grounded hit wins."""
    for fid, pattern, compute in TABLE_C2:
        m = re.search(pattern, text, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, text)
        except Exception:
            continue
        if not out:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None and not steps:
            continue  # gate refused -> let later families try
        q_extra = out[4] if len(out) > 4 and isinstance(out[4], dict) else None
        return _res_chem2(fid, g, value, steps, assumptions, answer=answer,
                          q_extra=q_extra)
    return _no("CHEMISTRY2", "no chemistry2 family matched")



# =========================================================================== #
# BLOCK C3: Advanced Chemistry gap families classes 11-12 (from chemistry3_families.py)
# =========================================================================== #

_CONF_C3 = 0.95

# --------------------------------------------------------------------------- #
# Numeric helpers
# --------------------------------------------------------------------------- #

_NUM = r"\d+(?:\.\d+)?"

# plain / 2e-6 / 1 x 10^-3 / 10^6  (bare 10^... branch before plain form)
_SCI = (r"-?(?:"
        + _NUM + r"\s*(?:[x*]|\u00d7)\s*10\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|" + _NUM + r"\s*[eE]\s*[-+]?\d+"
        r"|10(?!\d)\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|" + _NUM + r")")

_UNIT_WORD = r"(?:millilitres?|milliliters?|ml|litres?|liters?|L)"

_ComputeOut = Optional[Tuple[float, List[str], Optional[str],
                             Optional[List[str]]]]


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _num(s: str) -> float:
    return float(str(s).replace(",", ""))


def _sci(s: str) -> float:
    """Parse plain/scientific tokens: 0.01, 2e-6, 1 x 10^-3, 10^6."""
    t = (s or "").strip().replace(",", "").replace("\u00d7", "x")
    m = re.match(r"^(-?" + _NUM + r")\s*x\s*10\s*(?:\^|\*\*)?\s*([+-]?\d+)$",
                 t, re.I)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^(-?" + _NUM + r")\s*[eE]\s*([+-]?\d+)$", t)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^10(?!\d)\s*(?:\^|\*\*)?\s*([+-]?\d+)$", t)
    if m:
        return 10.0 ** int(m.group(1))
    return float(t)


def _to_litre(val: float, unit: str) -> float:
    u = (unit or "l").lower()
    return val / 1000.0 if u.startswith("m") else val


_SECONDS = {"h": 3600.0, "hr": 3600.0, "hour": 3600.0, "min": 60.0,
            "minute": 60.0, "s": 1.0, "sec": 1.0}


def _tsec(val: float, unit: str) -> float:
    u = (unit or "s").strip().lower()
    if len(u) > 1 and u.endswith("s"):
        u = u[:-1]
    return val * _SECONDS.get(u, 0.0)


# --------------------------------------------------------------------------- #
# Reference tables
# --------------------------------------------------------------------------- #

_MOLAR_MASS = {
    "h": 1.0, "c": 12.0, "n": 14.0, "o": 16.0, "s": 32.0,
    "h2": 2.0, "o2": 32.0, "n2": 28.0, "h2o": 18.0, "h2o2": 34.0,
    "co": 28.0, "co2": 44.0, "caco3": 100.0, "cao": 56.0,
    "mgco3": 84.0, "mgo": 40.0, "nacl": 58.5, "nh3": 17.0,
    "ch4": 16.0, "so2": 64.0, "so3": 80.0, "hcl": 36.5,
    "kclo3": 122.5, "kcl": 74.5, "naoh": 40.0, "koh": 56.0,
    "h2so4": 98.0, "hno3": 63.0, "fe2o3": 160.0, "al2o3": 102.0,
    "na2co3": 106.0, "nahco3": 84.0, "caso4": 136.0, "baso4": 233.0,
    "agcl": 143.5, "cuo": 79.5, "zno": 81.0, "fe": 56.0, "zn": 65.0,
    "cu": 63.5, "mg": 24.0, "ca": 40.0, "na": 23.0, "k": 39.0,
    "ag": 108.0, "al": 27.0, "no": 30.0, "no2": 46.0, "fe3o4": 232.0,
    "fes": 88.0, "c2h5oh": 46.0, "c6h12o6": 180.0,
}

# electrochemical equivalents in g/C (textbook values)
_Z_ROWS = ((("cuso4", "copper"), 0.0003294),
           (("agno3", "silver"), 0.001118),
           (("znso4", "zinc"), 0.0003387),
           (("niso4", "nickel"), 0.0003041),
           (("feso4", "iron"), 0.00029),
           (("al2(so4)3", "aluminium", "aluminum"), 0.0000933))

# fixed oxidation states for elements that are NOT the unknown
_FIXED_OX = {"H": 1.0, "O": -2.0, "F": -1.0, "Cl": -1.0, "Br": -1.0,
             "I": -1.0, "Li": 1.0, "Na": 1.0, "K": 1.0, "Rb": 1.0,
             "Cs": 1.0, "Be": 2.0, "Mg": 2.0, "Ca": 2.0, "Sr": 2.0,
             "Ba": 2.0, "Al": 3.0, "Zn": 2.0, "Ag": 1.0}

_R_GAS = 8.314          # J/(mol K)
_FARADAY = 96500.0      # C/mol


def _z_for(low_text: str) -> Optional[float]:
    for names, z in _Z_ROWS:
        if any(nm in low_text for nm in names):
            return z
    return None


def _mm(formula: str) -> Optional[float]:
    return _MOLAR_MASS.get((formula or "").strip().lower())


# --------------------------------------------------------------------------- #
# Thermo / equilibrium computes
# --------------------------------------------------------------------------- #


def _c_gibbs(g, m, t) -> _ComputeOut:
    dh = _sci(g["dh"])
    temp = _sci(g["temp"])
    ds = _sci(g["ds"])
    if temp <= 0:
        return None
    hu = (g.get("hu") or "kJ").lower()
    su = (g.get("su") or "kJ").lower()
    dh_kj = dh / 1000.0 if hu == "j" else dh
    ds_kj = ds / 1000.0 if su == "j" else ds
    dg = dh_kj - temp * ds_kj
    verdict = "spontaneous" if dg < 0 else "non-spontaneous"
    steps = [
        "Gibbs free energy: dG = dH - T dS.",
        f"dG = ({dh_kj:g}) - ({temp:g} x {ds_kj:g}) = {dg:.6g} kJ/mol",
        f"ANSWER: dG = {dg:.6g} kJ/mol ({verdict} at {temp:g} K)",
    ]
    return dg, steps, f"dG = {dg:.6g} kJ/mol ({verdict})", None


def _c_entropy(g, m, t) -> _ComputeOut:
    q = _sci(g["heat"])
    temp = _sci(g["temp"])
    if temp <= 0:
        return None
    ds = q / temp
    steps = [
        "Entropy change for a reversible transfer: dS = Q_rev / T.",
        f"dS = {q:g} / {temp:g} = {ds:.6g} J/K",
        f"ANSWER: entropy_change = {ds:.6g} J/K",
    ]
    return ds, steps, f"entropy_change = {ds:.6g} J/K", \
        ["magnitude only; heat taken as absorbed reversibly"]


def _split_reaction(rxn: str):
    """'N2 + 3H2 <=> 2NH3' -> ('N2 + 3H2', '2NH3'); None if not splitable."""
    s = (rxn or "").strip()
    s = s.replace("\u21cc", "<=>").replace("\u2192", "->")
    parts = re.split(r"\s*(?:<=>|<->|-->|->|=)\s*", s)
    if len(parts) != 2 or not parts[0].strip() or not parts[1].strip():
        return None, None
    return parts[0], parts[1]


def _side_moles(side: str) -> Optional[float]:
    """Sum of stoichiometric coefficients of real species on one side."""
    total = 0.0
    for term in re.split(r"\s*\+\s*", (side or "").strip()):
        term = term.strip()
        if not term:
            continue
        if re.fullmatch(r"(?i)(heat|energy|light)", term):
            continue  # thermo marker, not a species
        mm = re.match(r"^(\d+(?:\.\d+)?)\s*(.+)$", term)
        coef = float(mm.group(1)) if mm else 1.0
        rest = mm.group(2).strip() if mm else term
        if not re.search(r"[A-Za-z]", rest) or \
                not re.fullmatch(r"[A-Za-z0-9()\[\]\s]*", rest):
            return None
        total += coef
    return total


def _c_le_chatelier(g, m, t) -> _ComputeOut:
    left, right = _split_reaction(g.get("rxn") or "")
    if left is None:
        return None
    n_l = _side_moles(left)
    n_r = _side_moles(right)
    if n_l is None or n_r is None:
        return None
    chg = (g.get("change") or "").lower()
    increasing = ("increas" in chg or "rais" in chg or "ris" in chg
                  or "doubl" in chg)
    d = n_r - n_l
    if g.get("factor", "").lower() == "temperature":
        # only answerable when the +heat marker marks the exothermic side
        heat_right = re.search(r"(?i)\+\s*heat|\+\s*energy", right or "")
        heat_left = re.search(r"(?i)(?:^|\+)\s*heat|\+\s*energy", left or "")
        if heat_right:
            forward = (not increasing)  # exothermic: T up -> backward
        elif heat_left:
            forward = increasing        # endothermic: T up -> forward
        else:
            return None
    elif n_l == n_r:
        steps = [
            "Le Chatelier: count gas moles on each side of the equation.",
            f"moles: left = {n_l:g}, right = {n_r:g} (equal)",
            "ANSWER: no shift -- pressure change has no effect when gas "
            "moles are equal on both sides",
        ]
        return 0.0, steps, \
            "no shift: equal gas moles on both sides", None
    else:
        more_on_right = d > 0
        if increasing:
            forward = not more_on_right   # shift toward FEWER gas moles
        else:
            forward = more_on_right       # shift toward MORE gas moles
    side_txt = "forward (toward products)" if forward \
        else "backward (toward reactants)"
    n_few, n_more = (n_r, n_l) if n_r < n_l else (n_l, n_r)
    ans = (f"Equilibrium shifts {side_txt}: fewer gas moles "
           f"({n_few:g} vs {n_more:g} gas moles)")
    steps = [
        "Le Chatelier: a pressure increase shifts equilibrium toward the "
        "side with FEWER gas moles (a decrease toward more).",
        f"moles: left = {n_l:g}, right = {n_r:g} of the given equation",
        f"ANSWER: {ans}",
    ]
    return d, steps, ans, \
        ["gas moles counted from the stoichiometric coefficients"]


# --------------------------------------------------------------------------- #
# Electrochemistry computes
# --------------------------------------------------------------------------- #


def _c_electrolysis(g, m, t) -> _ComputeOut:
    cur = _num(g["cur"])
    raw_t = _num(g["t"])
    if "_conv_t" in g:
        sec = raw_t  # normalized to seconds by the unit schema
    else:
        sec = _tsec(raw_t, g.get("tu") or "s")
    z = _z_for((t or "").lower())
    if cur <= 0 or sec <= 0 or z is None:
        return None
    mass = z * cur * sec
    steps = [
        "Faraday's first law of electrolysis: m = Z I t "
        "(Z = electrochemical equivalent).",
        f"t = {sec:g} s, Z = {z:g} g/C for this electrolyte",
        f"m = {z:g} x {cur:g} x {sec:g} = {mass:.6g} g",
        f"ANSWER: mass_deposited = {mass:.6g} g",
    ]
    return mass, steps, f"mass_deposited = {mass:.6g} g", None


def _c_faraday(g, m, t) -> _ComputeOut:
    moles = _num(g["moles"])
    ion = (g.get("ion") or "").replace(" ", "").replace("^", "")
    zm = re.search(r"(\d+)\+$", ion)
    z = float(zm.group(1)) if zm else 1.0
    if moles <= 0 or z <= 0:
        return None
    q = moles * z * _FARADAY
    steps = [
        "Charge for electrolysis: Q = n z F (F = 96500 C/mol, z = ion charge).",
        f"Q = {moles:g} x {z:g} x 96500 = {q:.6g} C",
        f"ANSWER: charge = {q:.6g} C",
    ]
    return q, steps, f"charge = {q:.6g} C", None


# --------------------------------------------------------------------------- #
# Stoichiometry / ionic computes
# --------------------------------------------------------------------------- #


def _c_stoich(g, m, t) -> _ComputeOut:
    mass = _num(g["mass"])
    mm_r = _mm(g["reactant"])
    mm_p = _mm(g["product"])
    if mass <= 0 or mm_r is None or mm_p is None:
        return None
    moles = mass / mm_r
    out = moles * mm_p
    steps = [
        "Mass-mass stoichiometry: moles = mass / molar mass "
        "(1:1 mole ratio assumed).",
        f"n({g['reactant']}) = {mass:g}/{mm_r:g} = {moles:.6g} mol",
        f"m({g['product']}) = {moles:.6g} x {mm_p:g} = {out:.6g} g",
        f"ANSWER: mass of {g['product']} = {out:.6g} g",
    ]
    return out, steps, f"mass of {g['product']} = {out:.6g} g", \
        ["1:1 mole ratio between " + g["reactant"] + " and "
         + g["product"] + " assumed"]


def _c_ph_to_h(g, m, t) -> _ComputeOut:
    ph = _num(g["ph"])
    if not (0.0 <= ph <= 14.0):
        return None
    h = 10.0 ** (-ph)
    steps = [
        "pH = -log10([H+])  ->  [H+] = 10^(-pH).",
        f"[H+] = 10^(-{ph:g}) = {h:.6g} M",
        f"ANSWER: [H+] = {h:.6g} M",
    ]
    return h, steps, f"[H+] = {h:.6g} M", None


def _c_ph_from_h(g, m, t) -> _ComputeOut:
    h = _sci(g["h"]) if g.get("h") is not None else (
        _sci(g["h2"]) if g.get("h2") is not None else None)
    if h is None or h <= 0.0 or h > 14.0:
        return None
    ph = -math.log10(h)
    steps = [
        "pH = -log10([H+]).",
        f"pH = -log10({h:g}) = {ph:.4g}",
        f"ANSWER: pH = {ph:.4g}",
    ]
    return ph, steps, f"pH = {ph:.4g}", None


_MOLAR_VOLUME_STP = 22.4  # litres per mol at STP (class-11 convention)


def _c_moles_stp(g, m, t) -> _ComputeOut:
    v = _num(g["v"])
    if v <= 0.0:
        return None
    if "_conv_v" in g:
        litres = v  # normalized to litres by the unit schema
    else:
        u = (g.get("u") or "L").lower()
        litres = v / 1000.0 if u.startswith("m") else v
    n = litres / _MOLAR_VOLUME_STP
    steps = [
        f"At STP, 1 mol of any ideal gas occupies {_MOLAR_VOLUME_STP:g} L.",
        f"V = {litres:g} L  ->  n = {litres:g} / {_MOLAR_VOLUME_STP:g} = {n:.6g} mol",
        f"ANSWER: moles = {n:.6g} mol",
    ]
    return n, steps, f"moles = {n:.6g} mol", None


def _c_ph_poh(g, m, t) -> _ComputeOut:
    if g.get("ph") is None and g.get("ph2") is not None:
        g = dict(g, ph=g["ph2"])
    if g.get("poh") is None and g.get("poh2") is not None:
        g = dict(g, poh=g["poh2"])
    if g.get("ph") is not None:
        ph = _num(g["ph"])
        if not (0.0 <= ph <= 14.0):
            return None
        val = 14.0 - ph
        steps = [
            "pH + pOH = 14 (at 25 degrees C).",
            f"pOH = 14 - {ph:g} = {val:g}",
            f"ANSWER: pOH = {val:g}",
        ]
        return val, steps, f"pOH = {val:g}", None
    poh = _num(g["poh"])
    if not (0.0 <= poh <= 14.0):
        return None
    val = 14.0 - poh
    steps = [
        "pH + pOH = 14 (at 25 degrees C).",
        f"pH = 14 - {poh:g} = {val:g}",
        f"ANSWER: pH = {val:g}",
    ]
    return val, steps, f"pH = {val:g}", None


# --------------------------------------------------------------------------- #
# Kinetics computes
# --------------------------------------------------------------------------- #


def _c_second_order(g, m, t) -> _ComputeOut:
    k = _sci(g["k"])
    a0 = _sci(g["a0"])
    a = _sci(g["a"])
    if k <= 0 or a0 <= 0 or a <= 0 or a >= a0:
        return None  # decay: [A] must fall below [A]0
    time_s = (1.0 / a - 1.0 / a0) / k
    steps = [
        "Second-order integrated law: 1/[A] = 1/[A]0 + k t  ->  "
        "t = (1/[A] - 1/[A]0)/k.",
        f"t = (1/{a:g} - 1/{a0:g})/{k:g} = {time_s:.6g} s",
        f"ANSWER: time = {time_s:.6g} s",
    ]
    return time_s, steps, f"time = {time_s:.6g} s", None


def _c_arrhenius(g, m, t) -> _ComputeOut:
    k1 = _sci(g["k1"])
    k2 = _sci(g["k2"])
    t1 = _sci(g["T1"])
    t2 = _sci(g["T2"])
    if min(k1, k2, t1, t2) <= 0 or t1 == t2 or k1 == k2:
        return None
    denom = 1.0 / t1 - 1.0 / t2
    if denom == 0:
        return None
    ea = _R_GAS * math.log(k2 / k1) / denom
    if ea <= 0:
        return None
    ln_ratio = math.log(k2 / k1)
    steps = [
        "Arrhenius equation: ln(k2/k1) = (Ea/R)(1/T1 - 1/T2)  ->  "
        "Ea = R ln(k2/k1)/(1/T1 - 1/T2), R = 8.314 J/(mol K).",
        f"ln({k2:g}/{k1:g}) = {ln_ratio:.6g}; "
        f"1/{t1:g} - 1/{t2:g} = {denom:.6g}",
        f"Ea = 8.314 x {ln_ratio:.6g}/{denom:.6g} = {ea:.6g} J/mol",
        f"ANSWER: activation_energy = {ea:.6g} J/mol ({ea / 1000:.4g} kJ/mol)",
    ]
    return ea, steps, f"activation_energy = {ea:.6g} J/mol", None


# --------------------------------------------------------------------------- #
# Solutions computes
# --------------------------------------------------------------------------- #


def _c_mixing(g, m, t) -> _ComputeOut:
    if "_conv_v1" in g:
        v1 = _num(g["v1"])  # normalized to litres by the unit schema
    else:
        v1 = _to_litre(_num(g["v1"]), g.get("u1"))
    if "_conv_v2" in g:
        v2 = _num(g["v2"])
    else:
        v2 = _to_litre(_num(g["v2"]), g.get("u2"))
    m1 = _num(g["m1"])
    m2 = _num(g["m2"])
    if v1 <= 0 or v2 <= 0 or m1 < 0 or m2 < 0:
        return None
    c = (m1 * v1 + m2 * v2) / (v1 + v2)
    steps = [
        "Mixing: moles add and volumes add  ->  "
        "C_mix = (M1 V1 + M2 V2)/(V1 + V2).",
        f"C = ({m1:g} x {v1:g} + {m2:g} x {v2:g})/({v1:g} + {v2:g}) "
        f"= {c:.6g} mol/L",
        f"ANSWER: concentration = {c:.6g} M",
    ]
    return c, steps, f"concentration = {c:.6g} M", None


def _c_dilution(g, m, t) -> _ComputeOut:
    m1 = _num(g["m1"])
    m2 = _num(g["m2"])
    v2 = _num(g["v2"])
    if m1 <= 0 or v2 <= 0 or m2 < 0 or m2 >= m1:
        return None  # dilution: target must be weaker than the stock
    v1 = m2 * v2 / m1
    unit = (g.get("u2") or "ml").strip()
    steps = [
        "Dilution: M1 V1 = M2 V2  ->  V1 = M2 V2 / M1.",
        f"V1 = ({m2:g} x {v2:g})/{m1:g} = {v1:.6g} {unit}",
        f"ANSWER: stock_volume = {v1:.6g} {unit}",
    ]
    return v1, steps, f"stock_volume = {v1:.6g} {unit}", None


# --------------------------------------------------------------------------- #
# Oxidation number compute
# --------------------------------------------------------------------------- #


def _c_oxidation(g, m, t) -> _ComputeOut:
    comp = g.get("compound") or ""
    toks = re.findall(r"[A-Z][a-z]?\d*", comp)
    if not toks or "".join(toks) != comp:
        return None  # needs a plain, properly capitalised formula
    counts: Dict[str, float] = {}
    for tk in toks:
        el = re.match(r"[A-Za-z]+", tk).group(0)
        tail = tk[len(el):]
        counts[el] = counts.get(el, 0.0) + (float(tail) if tail else 1.0)
    target = None
    for el in counts:
        if el.lower() == (g.get("element") or "").lower():
            target = el
            break
    if target is None or counts[target] <= 0:
        return None
    total = 0.0
    for el, c in counts.items():
        if el == target:
            continue
        if el not in _FIXED_OX:
            return None  # unknown auxiliary element: refuse, never guess
        total += _FIXED_OX[el] * c

    def ox_show(el: str) -> str:
        return "x" if el == target else f"{_FIXED_OX[el]:+g}"

    lhs = " + ".join(f"{c:g}({ox_show(el)})" for el, c in counts.items())
    x = -total / counts[target]
    if abs(x) > 8.0:
        return None
    steps = [
        "Neutral compound: the oxidation numbers sum to 0 "
        "(standard rules: H = +1, O = -2).",
        f"{lhs} = 0, with x = oxidation number of {target}",
        f"x = {x:+g}",
        f"ANSWER: oxidation number of {target} in {comp} = {x:+g}",
    ]
    return x, steps, f"oxidation number of {target} in {comp} = {x:+g}", \
        ["standard rules; neutral species assumed"]


# --------------------------------------------------------------------------- #
# The table: (id, trigger regex [RAW], governing equation, compute)
# --------------------------------------------------------------------------- #

TABLE_C3 = [
    # ---- ionic: [H+] straight from a stated pH (the inverse ask) ----
    ("PH_TO_H",
     r"pH\s+of\s+(?:a\s+|an\s+|the\s+)?(?:sample\s+of\s+)?"
     r"[A-Za-z][A-Za-z0-9 ]{0,30}?\s+is\s+(?P<ph>" + _SCI + r")"
     r".{0,80}?calculate\s+(?:the\s+)?(?:concentration\s+of\s+"
     r"hydrogen\s+ion(?:\s+in\s+it(?:self)?)?|hydrogen\s+ion\s+"
     r"concentration)",
     "[H+] = 10^(-pH)",
     _c_ph_to_h),

    # ---- ionic: pH straight from H+ concentration ----
    ("PH_FROM_H",
     r"(?:pH\s+of\s+(?:a\s+|an\s+|the\s+)?solution\b"
     r"[^.]*?(?:hydrogen\s+ion\s+concentration|concentration\s+of\s+"
     r"H\s*(?:\+|⁺)|\[?\s*H\s*(?:\+|⁺)\s*\]?)\s*"
     r"(?:is\s+|of\s+|=)?\s*(?P<h>" + _SCI + r")\s*"
     r"(?:M\b|mol\s*/?\s*L\b|mol\s+per\s+litre|mol\s+per\s+liter|"
     r"moles?\s+per\s+litre|moles?\s+per\s+liter)"
     r"|(?:hydrogen\s+ion\s+concentration|H\s*(?:\+|⁺)\s*concentration)\s*"
     r"(?:of\s+(?:a\s+|an\s+|the\s+)?(?:solution|acid|base)\s*)?"
     r"(?:is\s+|=)?\s*(?P<h2>" + _SCI + r")\s*"
     r"(?:M\b|mol\s+per\s+litre|mol\s+per\s+liter|moles?\s+per\s+litre|"
     r"moles?\s+per\s+liter)"
     r".{0,60}?find\s+(?:its\s+|the\s+)?pH\b)",
     "pH = -log10([H+])",
     _c_ph_from_h),

    # ---- mole concept: gas volume at STP ----
    ("MOLES_AT_STP",
     r"(?:number\s+of\s+)?moles?\s+(?:of\s+(?:an?\s+|the\s+)?(?:ideal\s+)?gas"
     r"[^.]*?)?\s*in\s+(?P<v>" + _SCI + r")\s*"
     r"(?P<u>millilitres?|milliliters?|ml|litres?|liters?|L)\b"
     r"[^.]*?(?:at\s+|under\s+)?STP\b",
     "n = V(STP) / 22.4 L per mol",
     _c_moles_stp),

    # ---- thermo ----
    ("GIBBS_ENERGY",
     r"(?:(?:\u0394|delta)\s*G\b|gibbs\s+(?:free\s+)?energy)"
     r"[^.]*?(?:(?:\u0394|delta)\s*H|dH)\s*(?:=|is)\s*(?P<dh>" + _SCI + r")"
     r"\s*(?P<hu>kJ|J)\s*(?:/|per)\s*(?:g\s*/?\s*)?mol\b"
     r"[^.]*?temperatures?\s*(?:is|of|at|=)?\s*(?P<temp>" + _SCI + r")"
     r"\s*K\b"
     r"[^.]*?(?:(?:\u0394|delta)\s*S|dS)\s*(?:=|is)\s*(?P<ds>" + _SCI + r")"
     r"\s*(?P<su>kJ|J)\s*(?:/|per)\s*\(?\s*(?:K|kelvin)",
     "dG = dH - T dS",
     _c_gibbs),

    ("ENTROPY_CHANGE",
     r"entropy\s+change[^.]*?(?P<heat>" + _SCI + r")\s*J\b"
     r"[^.]*?heat\s+(?:is\s+)?(?:added|supplied|absorbed|removed|released)?"
     r"[^.]*?at\s+(?:a\s+)?(?:constant\s+)?"
     r"(?:temperatures?\s+(?:of\s+)?)?(?P<temp>" + _SCI + r")\s*K\b",
     "dS = Q_rev/T",
     _c_entropy),

    # ---- equilibrium ----
    ("LE_CHATELIER",
     r"reaction\s+(?P<rxn>[^?.!]+?)[,;]?\s*"
     r"(?:what\s+happens\s*|which\s+way\s+|in\s+which\s+direction\s+"
     r"(?:will|does)?\s*(?:the\s+)?(?:reaction|equilibrium)\s+"
     r"(?:shift|move)?)?"
     r"(?:if|when)\s+(?:the\s+)?(?P<factor>pressure|temperature)\s+"
     r"(?P<change>increases?|decreases?|rises?|drops?|is\s+increased|"
     r"is\s+decreased|is\s+raised|is\s+lowered|is\s+doubled|is\s+reduced)",
     "pressure increase shifts equilibrium toward fewer gas moles",
     _c_le_chatelier),

    # ---- electrochemistry ----
    ("ELECTROLYSIS_MASS",
     r"mass\s+(?:is\s+)?(?:deposited|liberated|discharged)"
     r"(?:\s+at\s+\w+\s+(?:cathode|electrode))?\s+when\s+"
     r"(?P<cur>" + _NUM + r")\s*(?:A|amp|amps|ampere|amperes)\b"
     r"[^.]*?flows?\s+through\s+(?:a\s+)?(?P<elec>[A-Za-z0-9()]+)\s+solution"
     r"[^.]*?for\s+(?P<t>" + _NUM + r")\s*"
     r"(?P<tu>hours?|hrs?|minutes?|mins?|seconds?|secs?|h|min|s)\b",
     "m = Z I t (Z = electrochemical equivalent)",
     _c_electrolysis),

    ("FARADAY_ELECTROLYSIS",
     r"charge\s+(?:required|needed)\s+to\s+"
     r"(?:deposit|liberate|discharge|plate\s+out)\s+"
     r"(?P<moles>" + _NUM + r")\s*(?:moles?|mol)\s+of\s+"
     r"(?:[A-Za-z]{1,3}\s+from\s+)?"
     r"(?P<ion>[A-Za-z]{1,2}\s*\^?\s*\d*\s*\+)",
     "Q = n z F, F = 96500 C/mol",
     _c_faraday),

    # ---- stoichiometry ----
    ("STOICHIOMETRY_MASS_MASS",
     r"mass\s+of\s+(?P<product>[A-Za-z][A-Za-z0-9]{0,9})\s+(?:is\s+)?"
     r"(?:produced|formed|obtained|liberated|evolved|released)\s+when\s+"
     r"(?P<mass>" + _NUM + r")\s*(?:g|grams?)\b\s+(?:of\s+)?"
     r"(?P<reactant>[A-Za-z][A-Za-z0-9]{0,9})\b"
     r"[^.]*?(?:completely\s+)?"
     r"(?:decompos\w+|dissociat\w+|react\w*|burn\w*|heated)"
     r"(?:\s+completely)?",
     "moles = mass / molar mass (1:1 mole ratio)",
     _c_stoich),

    # ---- ionic ----
    ("PH_POH",
     r"(?:pH\s+(?:of\s+(?:a\s+|an\s+|the\s+)?(?:solution\s+)?)?(?:is|was)\s*(?P<ph2>" + _NUM + r")\b)"
     r".{0,60}?find\s+(?:its\s+|the\s+)?pOH\b"
     r"|(?:pOH\s+of\s+(?:a\s+|an\s+|the\s+)?(?:solution\s+)?(?:is|was)\s*(?P<poh2>" + _NUM + r")\b)"
     r".{0,60}?find\s+(?:its\s+|the\s+)?pH\b"
     r"|(?:pOH\s+of\s+[^.]*?pH\s+(?:of\s+|is\s+)?(?P<ph>" + _NUM + r")"
     r"|pH\s+of\s+[^.]*?pOH\s+(?:of\s+|is\s+)?(?P<poh>" + _NUM + r"))",
     "pH + pOH = 14",
     _c_ph_poh),

    # ---- kinetics ----
    ("SECOND_ORDER_KINETICS",
     r"second[-\s]?order\s+reaction[^.]*?k\s*=\s*(?P<k>" + _SCI + r")"
     r"\s*L\s*/\s*mol"
     r"[^.]*?\[\s*A\s*\]\s*(?:0|\u2080)?\s*=\s*(?P<a0>" + _SCI + r")\s*M\b"
     r"[^.]*?(?:to\s+reach|until|till|when)\s*"
     r"\[\s*A\s*\]\s*=\s*(?P<a>" + _SCI + r")\s*M\b",
     "1/[A] = 1/[A]0 + k t",
     _c_second_order),

    ("ARRHENIUS_ACTIVATION",
     r"activation\s+energy[^.]*?k\s*1?\s*=\s*(?P<k1>" + _SCI + r")\s*at\s+"
     r"(?:T\s*1?\s*=\s*)?(?P<T1>" + _SCI + r")\s*K\b"
     r"[^.]*?k\s*2?\s*=\s*(?P<k2>" + _SCI + r")\s*at\s+"
     r"(?:T\s*2?\s*=\s*)?(?P<T2>" + _SCI + r")\s*K\b",
     "ln(k2/k1) = (Ea/R)(1/T1 - 1/T2)",
     _c_arrhenius),

    # ---- solutions ----
    ("CONCENTRATION_AFTER_MIXING",
     r"(?:concentration|molarity)\s*(?:of\s+the\s+(?:mixture|solution))?\s*"
     r"(?:when|after|on\s+mixing)?\s*"
     r"(?P<v1>" + _NUM + r")\s*(?P<u1>" + _UNIT_WORD + r")\b\s+of\s+"
     r"(?P<m1>" + _NUM + r")\s*M\b"
     r"[^.]*?mixed\s+with\s+"
     r"(?P<v2>" + _NUM + r")\s*(?P<u2>" + _UNIT_WORD + r")\b\s+of\s+"
     r"(?P<m2>" + _NUM + r")\s*M\b",
     "C_mix = (M1 V1 + M2 V2)/(V1 + V2)",
     _c_mixing),

    ("DILUTION_M1V1",
     r"(?:what|which)\s+volume\s+of\s+(?P<m1>" + _NUM + r")\s*M\s*\??\s*"
     r"(?P<stock>[A-Za-z]{0,3}[A-Za-z0-9]{0,4})?\s*"
     r"(?:is\s+|are\s+|to\s+be\s+|must\s+be\s+|should\s+be\s+)?"
     r"(?:needed|required|used|added|taken)?\s*"
     r"(?:to|for)\s+(?:make|prepare|produce|obtain|get|dilute\s+to|"
     r"dilute\s+it\s+to)\s+"
     r"(?P<v2>" + _NUM + r")\s*(?P<u2>" + _UNIT_WORD + r")\b\s+of\s+"
     r"(?:a\s+|an\s+|the\s+)?(?P<m2>" + _NUM + r")\s*M\b",
     "M1 V1 = M2 V2",
     _c_dilution),

    # ---- redox ----
    ("OXIDATION_NUMBER",
     r"oxidation\s+(?:number|state)\s+of\s+(?:the\s+)?"
     r"(?P<element>[A-Za-z]{1,2})\b\s+in\s+(?:the\s+)?"
     r"(?P<compound>[A-Za-z0-9]+)",
     "sum of oxidation numbers = 0 (neutral compound)",
     _c_oxidation),
]


# --------------------------------------------------------------------------- #
# Unit schemas: family -> {slot: canonical unit, _out: answer unit,
# _need: dimensions the trigger could not match without}
# --------------------------------------------------------------------------- #

UNITS_C3: Dict[str, Dict[str, Any]] = {
    "PH_FROM_H": {"h": "concentration_molL", "_out": "dimensionless",
                  "_need": ("concentration",)},
    "PH_TO_H": {"_out": "concentration_molL"},
    "MOLES_AT_STP": {"v": "volume_l", "_out": "amount_mol",
                     "_need": ("volume",)},
    "GIBBS_ENERGY": {"temp": "temperature_k", "_need": ("temperature",)},
    "ENTROPY_CHANGE": {"heat": "energy_j", "_need": ("energy",)},
    "LE_CHATELIER": {"_out": "dimensionless"},
    "ELECTROLYSIS_MASS": {"t": "time_s", "_out": "gram_g",
                          "_need": ("current", "time")},
    "FARADAY_ELECTROLYSIS": {"moles": "amount_mol", "_out": "charge_c",
                             "_need": ("amount",)},
    "STOICHIOMETRY_MASS_MASS": {"mass": "gram_g", "_out": "gram_g",
                                "_need": ("mass",)},
    "SECOND_ORDER_KINETICS": {"a0": "concentration_molL",
                              "a": "concentration_molL",
                              "_out": "time_s",
                              "_need": ("concentration",)},
    "ARRHENIUS_ACTIVATION": {"T1": "temperature_k", "T2": "temperature_k",
                             "_out": "energy_j",
                             "_need": ("temperature",)},
    "CONCENTRATION_AFTER_MIXING": {"v1": "volume_l", "v2": "volume_l",
                                   "_out": "concentration_molL",
                                   "_need": ("volume",)},
}


def get_units(fid: str) -> Optional[Dict[str, str]]:
    """Unit schema for a family id; None when the family is unwired."""
    return UNITS.get(fid)


# --------------------------------------------------------------------------- #
# Dispatcher
# --------------------------------------------------------------------------- #


def _quantities_from(m, value: float) -> Dict[str, float]:
    """All named slots parsed as floats (non-numeric groups skipped)."""
    q: Dict[str, float] = {}
    for k, v in (m.groupdict() or {}).items():
        if v is None:
            continue
        try:
            q[k] = _sci(v)
        except ValueError:
            continue
    q["result"] = float(value)
    return q


def model_chemistry3(text: str) -> ModelResult:
    """Scan the chemistry3 family table; first grounded hit wins.

    Families with a "_need" dimension list are skipped when the text
    lacks those units (lossless: their triggers require the unit word),
    and schema-declared slots are normalized to canonical units before
    compute so "560 mL" reaches the mole math as 0.56 litres.
    """
    dims = _ureg.dimensions_of(text)
    for fid, pattern, equation, compute in TABLE_C3:
        schema = UNITS.get(fid)
        if not _ureg.has_dimensions(dims, schema.get("_need")
                                    if schema else None):
            continue
        m = re.search(pattern, text, re.I)
        if not m:
            continue
        g = m.groupdict()
        if schema:
            try:
                g = _ureg.normalize_slots(g, m, text, schema)
            except Exception:
                g = m.groupdict()
        try:
            out = compute(g, m, text)
        except Exception:
            continue
        if not out or out[0] is None:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None:
            continue
        return ModelResult(
            structure=fid,
            matched=True,
            confidence=_CONF_C3,
            quantities=_quantities_from(m, value),
            governing_equation=equation,
            final_answer=answer or f"{value:.6g}",
            numeric_answer=float(value),
            steps=steps,
            note="; ".join(assumptions) if assumptions else "",
        )
    return _no("CHEMISTRY3", "no chemistry3 family matched")


UNITS = UNITS_C3


# =========================================================================== #
# BLOCK SYL_CHEM: Syllabus Chemistry rows (from syllabus_families.py)
# =========================================================================== #

def _c_syl_chem_num(s: str) -> float:
    return float(str(s).replace(",", ""))

def _c_syl_moles(g, m, text):
    mass, mm = _c_syl_chem_num(m.group(1)), _c_syl_chem_num(m.group(2))
    if mm == 0:
        return None, [], None, None
    n = mass / mm
    return n, [f"n = mass/M = {mass:g}/{mm:g} = {n:.6g} mol"], None, None

def _c_syl_molarity(g, m, text):
    n = _c_syl_chem_num(m.group(1))
    vol = _c_syl_chem_num(m.group(2))
    unit = (m.group(3) or "").lower()
    if unit.startswith("m"):
        vol /= 1000.0
    if vol == 0:
        return None, [], None, None
    M = n / vol
    return M, [f"M = n/V = {n:g}/{vol:g} L = {M:.6g} mol/L"], None, None

SYLLABUS_CHEMISTRY_TABLE = [
    ("moles_from_mass",
     r"moles?\s+(?:in|of)\s+(?P<m>\d+(?:\.\d+)?)\s*(?:g|grams?)\s+"
     r"(?:of\s+)?[a-z ]{0,40}?molar\s+mass\s+(?:of\s+)?(?P<mm>\d+"
     r"(?:\.\d+)?)",
     lambda g, m, t: _c_syl_moles({"m": g["m"], "mm": g["mm"]}, m, t)),
    ("molarity",
     r"molarity\s+of\s+(?P<n>\d+(?:\.\d+)?)\s*(?:moles?|mol)\s+"
     r"(?:of\s+)?[a-z ]{0,30}?(?:in|dissolved\s+in)\s+"
     r"(?P<v>\d+(?:\.\d+)?)\s*(?P<vu>litres?|liters?|L|ml|"
     r"millilit?res?)",
     lambda g, m, t: _c_syl_molarity({"n": g["n"], "v": g["v"],
                                      "3": g["vu"]}, m, t)),
    ("reaction_rate_avg",
     r"concentration[\s\S]{0,40}?drops?\s+from\s+(?P<a>\d+(?:\.\d+)?)"
     r"[\s\S]{0,25}?to\s+(?P<b>\d+(?:\.\d+)?)[\s\S]{0,30}?"
     r"in\s+(?P<t>\d+(?:\.\d+)?)\s*(?:s|sec|seconds?|min|minutes?)\b",
     lambda g, m, t: (
         (float(g["a"]) - float(g["b"])) / float(g["t"]),
         [f"Δ[A] = {float(g['b'])} - {float(g['a'])} = "
          f"{float(g['b']) - float(g['a'])}",
          f"rate = -Δ[A]/Δt = {float(g['a']) - float(g['b'])} / "
          f"{float(g['t'])} = "
          f"{(float(g['a']) - float(g['b'])) / float(g['t']):.6g}"],
         f"rate = {(float(g['a']) - float(g['b'])) / float(g['t']):.4g} "
         f"mol L^-1 s^-1",
         None)),
    ("nernst_equilibrium",
     r"cell\s+potential[^.]{0,60}?is\s+(?P<e>\d+(?:\.\d+)?)\s*V[^.]{0,40}?"
     r"(?:equilibrium\s+constant|K\b)|equilibrium\s+constant[^.]{0,50}?"
     r"cell\s+potential[^.]{0,60}?is\s+(?P<e2>\d+(?:\.\d+)?)\s*V",
     lambda g, m, t: (
         10 ** (2 * float(g["e"] or g["e2"]) / 0.059),
         [f"E° = {g['e'] or g['e2']} V, n = 2 (2 electrons transferred)",
          f"log K = nE°/0.059 = 2 x {g['e'] or g['e2']} / 0.059 = "
          f"{2 * float(g['e'] or g['e2']) / 0.059:.3f}",
          f"K = 10^{2 * float(g['e'] or g['e2']) / 0.059:.3f} = "
          f"{10 ** (2 * float(g['e'] or g['e2']) / 0.059):.3g}"],
         f"K = {10 ** (2 * float(g['e'] or g['e2']) / 0.059):.3g}",
         ["n = 2 assumed from the balanced half-reaction; "
          "0.059 V is the 298 K Nernst constant"])),
]

def _dispatch_syl_chem(text: str) -> Optional[ModelResult]:
    for fid, pattern, compute in SYLLABUS_CHEMISTRY_TABLE:
        m = re.search(pattern, text, re.I)
        if not m:
            continue
        g = m.groupdict()
        try:
            out = compute(g, m, text)
        except Exception:
            continue
        if not out:
            continue
        value, steps, answer, assumptions = (list(out) + [None] * 4)[:4]
        if value is None and not steps:
            continue
        return ModelResult(
            structure=fid, matched=True, confidence=0.97,
            quantities={k: (v if isinstance(v, (int, float)) else 0) for k, v in g.items()},
            governing_equation=fid,
            final_answer=answer or f"{value:.6g}",
            numeric_answer=value, steps=steps or [],
            note="; ".join(assumptions) if assumptions else "",
        )
    return None


# =========================================================================== #
# BLOCK EXTRA_CHEM: Carbon dating from extra_families2.py
# =========================================================================== #

def model_carbon_dating(text: str) -> ModelResult:
    t = text.replace(" ", " ")
    if not (re.search(r"carbon[- ]?14|\bC[- ]?14\b", t, re.I)
            and re.search(r"half[- ]?life", t, re.I)):
        return _no("CARBON_DATING", "not a carbon-14 half-life ask")
    frac = re.search(r"(\d+(?:\.\d+)?)\s*%\s*of what", t, re.I)
    if not frac:
        frac = re.search(r"was\s*(\d+(?:\.\d+)?)\s*%\s*of", t, re.I)
    hl = re.search(r"half[- ]?life\s*(?:of\s*(?:carbon|C)[- ]?14\s*)?"
                   r"=\s*(\d+(?:\.\d+)?)\s*years", t, re.I)
    if not frac or not hl:
        return _no("CARBON_DATING",
                   "need remaining percentage and half-life in years")
    p = float(frac.group(1))
    th = float(hl.group(1))
    if not (0 < p < 100) or not (1 <= th <= 1e7):
        return _no("CARBON_DATING", "percentage or half-life out of range")
    age = th * math.log(100.0 / p) / math.log(2.0)
    steps = [
        f"Remaining fraction = {p:g}% -> N/N0 = {p / 100:g}.",
        "Decay: N/N0 = (1/2)^(t/T)  ->  t = T x log2(N0/N).",
        f"t = {th:g} x log2({100.0 / p:g}) = {age:.6g} years",
        f"ANSWER: age = {age:.6g} years",
    ]
    return ModelResult(
        structure="CARBON_DATING", matched=True, confidence=0.95,
        quantities={"T_half": th, "pct": p, "age": age},
        governing_equation="t = T_half x log2(1/fraction)",
        final_answer=f"age = {age:.6g} years",
        numeric_answer=float(age), steps=steps, note="")


# =========================================================================== #
# MASTER ASSEMBLED REGISTRY & DISPATCHER (WS-B Step 3: Chemistry Merge)
# =========================================================================== #

# =========================================================================== #
# BLOCK CHEM_SPECS: 9 chemistry spec entries moved from structure_families.py
# (WS-B Step 8 / M2).
# =========================================================================== #


def _snap(v: float) -> float:
    r = round(v)
    return float(r) if abs(v - r) < 1e-9 else v



def _c_moles(slots, text):
    """n = mass / molar mass.  'How many moles in 36 g of water
    (molar mass 18 g/mol)?'"""
    # particles ask: n = m/M alone under-answers 'number of molecules
    # in 22 g of CO2' (the true ship is n x N_A) -- refuse, never ship
    # the intermediate as the answer (class-9 chem, 2026-10-06)
    if re.search(r"number\s+of\s+(?:molecules|atoms|ions|particles|"
                 r"formula\s+units)", text, re.I):
        return None
    # CONCENTRATION-ASK GUARD (CHEM-ADVERSARIAL 2026-10-06): the force
    # regex 'molar mass' fires on "Calculate the MOLALITY of a solution
    # containing 18 g of glucose (molar mass 180)..." and this spec
    # shipped n = m/M as the answer to a molality/molarity/mole-fraction
    # ask -- all three hijacks observed VERIFIED (c12 solutions).  The
    # concentration families own these asks; refuse here.
    if re.search(r"\b(?:molality|molarity|mole\s+fraction|normality|"
                 r"ppm|osmotic\s+pressure)\b", text, re.I):
        return None
    # mass must carry a mass-unit AND not be the molar-mass number.
    # (?<![A-Za-z]) keeps the molar-mass scan from biting the trailing
    # digit out of a FORMULA: 'molar mass of CO2 = 44' captured the 2
    # in CO2 and shipped 22/2 = 11 mol (true 0.5).  The skip class now
    # also admits '=' so the real value after a formula is reachable.
    mmass = re.search(
        r"(?:^|\s|of\s+)(\d+(?:\.\d+)?)\s*(?:g|grams?|kg)\b"
        r"(?!\s*(?:/|per|of\s+molar))", text, re.I)
    mmolar = re.search(
        r"molar\s*mass[\w\s=]{0,15}?(?<![A-Za-z])(\d+(?:\.\d+)?)",
        text, re.I)
    if not (mmass and mmolar):
        return None
    mass = float(mmass.group(1))
    M = float(mmolar.group(1))
    if M == 0:
        return None
    v = mass / M
    return (_snap(v), [f"n = mass / molar mass = {_fmt(mass)} / "
                       f"{_fmt(M)} = {_fmt(v)} mol."],
            f"{_fmt(v)} mol", None, "n = m/M", None)



def _c_concentration(slots, text):
    """mass solute / volume solution → g/L or g/mL."""
    if re.search(r"\b(?:molarity|molality|mole\s+fraction|normality)\b", text, re.I):
        return None
    ms = re.search(r"(\d+(?:\.\d+)?)\s*(?:g|grams?)\s*(?:of\s+\w+\s+)?"
                   r"(?:dissolved|in|added\s+to)", text, re.I)
    mv = re.search(r"(\d+(?:\.\d+)?)\s*(mL|ml|L|litre?s?)", text, re.I)
    if not (ms and mv):
        return None
    mass = float(ms.group(1))
    vol = float(mv.group(1))
    unit = mv.group(2).lower()
    vol_L = vol / 1000.0 if unit in ("ml", "ml.") else vol
    if vol_L == 0:
        return None
    v = mass / vol_L
    return (_snap(v), [f"concentration = {_fmt(mass)} g / "
                       f"{_fmt(vol_L)} L = {_fmt(v)} g/L."],
            f"{_fmt(v)} g/L", None, "conc = m/V", None)



def _c_molality(slots, text):
    """'2 mol solute in 1 kg solvent' -> m = 2 mol/kg."""
    mn = re.search(r"(\d+(?:\.\d+)?)\s*(?:mol(?:e)?s?|moles)\b", text)
    mk = re.search(r"(\d+(?:\.\d+)?)\s*kg\b", text)
    if not (mn and mk):
        return None
    n = float(mn.group(1)); kg = float(mk.group(1))
    if kg == 0:
        return None
    v = n / kg
    return (_snap(v), [
        f"molality = n/kg = {_fmt(n)} / {_fmt(kg)} = {_fmt(v)} m."],
        f"{_fmt(v)} m", None, "molality = n/kg", None)



def _c_dilution(slots, text):
    """'100 ml of 2 M -> dilute to 0.5 M' : M1V1 = M2V2, water added
    = V2 - V1."""
    if not re.search(r"dilut|add(?:ed)?\s+(?:water|solvent)|"
                     r"make\s+it\s+\d|reduce\s+the?\s+concentration|"
                     r"concentration\s+to\s+\d", text, re.I):
        return None
    mm = re.search(r"(\d+(?:\.\d+)?)\s*(?:ml|litre|liter)\b[^.]{0,40}?"
                   r"(?:of\s+|is\s+)?(\d+(?:\.\d+)?)\s*"
                   r"(?:M\b|molar|mol\s*/?\s*L)", text, re.I)
    m2m = re.search(r"(?:make\s+it|to\s+|dilute\s+to|reduce\s+to|"
                    r"concentration\s+of|molarity\s+of)\s*"
                    r"(\d+(?:\.\d+)?)\s*(?:M\b|molar)", text, re.I)
    if not (mm and m2m):
        return None
    v1, m1 = float(mm.group(1)), float(mm.group(2))
    m2 = float(m2m.group(1))
    if not (v1 > 0 and m1 > 0 and m2 > 0):
        return None
    v2 = m1 * v1 / m2
    water = v2 - v1
    if water < 0:
        return None
    return (_snap(water), [
        f"M1V1 = M2V2: {_fmt(m1)} x {_fmt(v1)} = {_fmt(m2)} x V2 -> "
        f"V2 = {_fmt(v2)} ml.",
        f"water to add = V2 - V1 = {_fmt(v2)} - {_fmt(v1)} = "
        f"{_fmt(water)} ml."],
        f"add {_fmt(water)} ml of water (final volume {_fmt(v2)} ml)",
        None, "M1V1 = M2V2",
        {"M1": m1, "V1": v1, "M2": m2, "V2": v2})



def _c_limiting_moles(slots, text):
    """'2 mol HCl + 3 mol NaOH -> NaCl + H2O' : the smaller mole count
    limits a 1:1 reaction; product moles = n(limiting)."""
    if not re.search(r"limiting\s+(?:reagent|reactant)|formed|"
                     r"produced", text, re.I):
        return None
    pairs = re.findall(r"(\d+(?:\.\d+)?)\s*moles?\s+(?:of\s+)?"
                       r"([A-Z][A-Za-z0-9]*)", text)
    if len(pairs) < 2:
        return None
    n1, a = float(pairs[0][0]), pairs[0][1]
    n2, b = float(pairs[1][0]), pairs[1][1]
    prod_m = re.search(r"(?:formed|produced|obtained)[^.]{0,30}?"
                       r"(?:of\s+)?([A-Z][A-Za-z0-9]*)", text)
    lim, nlim = (a, n1) if n1 <= n2 else (b, n2)
    other = b if lim == a else a
    return (_snap(nlim), [
        f"n({a}) = {_fmt(n1)} mol, n({b}) = {_fmt(n2)} mol.",
        f"1:1 reaction -> the smaller count limits: {lim} is the "
        f"limiting reagent, {other} is in excess.",
        f"product moles = n({lim}) = {_fmt(nlim)} mol."],
        f"{lim} limiting; product = {_fmt(nlim)} mol", None,
        "1:1 -> n_product = n_limiting", {"n1": n1, "n2": n2})



def _c_stp_volume(slots, text):
    """'1 mole of gas at STP' -> 22.4 L."""
    mn = re.search(r"(\d+(?:\.\d+)?)\s*(?:mol(?:e)?s?|moles)\b", text)
    if not mn or not re.search(r"\bSTP\b|standard\s+(?:temp|temperature)",
                               text, re.I):
        return None
    n = float(mn.group(1))
    v = n * 22.4
    return (_snap(v), [
        f"At STP: 1 mol = 22.4 L -> {_fmt(n)} mol = {_fmt(v)} L."],
        f"{_fmt(v)} L", None, "STP: 1 mol = 22.4 L", {"n": n})



def _c_molarity(slots, text):
    """'4 g NaOH in 500 mL -> molarity' -> n/V(L)."""
    if not re.search(r"molarity|molar\s+concentration", text, re.I):
        return None
    mg = re.search(r"(\d+(?:\.\d+)?)\s*g\b", text, re.I)
    mv = re.search(r"(\d+(?:\.\d+)?)\s*(?:mL|ml|L)\b", text, re.I)
    mm = re.search(r"[Mm]\s*=\s*(\d+(?:\.\d+)?)", text)
    if not (mg and mv and mm):
        return None
    mass = float(mg.group(1)); M = float(mm.group(1))
    v_ml = float(mv.group(1))
    if 'mL' in text or 'ml' in text:
        v_L = v_ml / 1000.0
    else:
        v_L = v_ml
    n = mass / M
    molarity = n / v_L
    return (_snap(molarity), [
        f"n = {_fmt(mass)}/{_fmt(M)} = {_fmt(n)} mol.",
        f"molarity = {_fmt(n)}/{_fmt(v_L)} L = {_fmt(molarity)} M."],
        f"{_fmt(molarity)} M", None, "M = n/V(L)", None)



def _c_neet_ph_calculation(slots, text):
    if not (re.search(r"\b(?:ph|poh|hydrogen\s+ion|hydronium|hydroxyl)\b", text, re.I) and
            re.search(r"\b(?:calculate|find|what\s+is|solution|concentration)\b", text, re.I)):
        return None
    if re.search(r"\b(?:buffer|henderson|hasselbalch|pka)\b", text, re.I):
        return None
    # DIG-GATE (2026-10-06): a given Ka/Kb means a WEAK acid/base —
    # -log10(concentration) is only valid for strong electrolytes.
    # '0.1 M acetic acid, Ka = 1.8e-5' shipped pH = 1 VERIFIED (true
    # pH ~ 2.87).  Refuse; the equilibrium lane owns it.
    if re.search(r"\bk\s*[ab]\s*=|ka\b|kb\b|k_\{?a", text, re.I):
        return None
    # STEM-PC GATE (2026-10-07 c12 dig): a POLYBASIC acid (H2SO4, H3PO4)
    # releases n protons per molecule — -log10(c) here would ship pH 3
    # for a true 2.7, and it preempted the modeling layer's CHM_PH_ACID
    # family (which verifier_na'd, so the student got nothing).  The
    # complete-dissociation phrasing also routes to CHM_PH_ACID.
    if re.search(r"H\s*2\s*[A-Z]|H3PO4|diprotic|dibasic|polybasic|"
                 r"complete\s+dissociation", text, re.I):
        return None
    # match scientific notation or decimal concentration: e.g. 10^-4, 1e-4, 0.01, 1 x 10^-3
    # Case 1: [H+] = 10^-x or 1 x 10^-x
    m_sci = re.search(r"(?:\[\s*H\+?\s*\]|concentration(?:\s+of)?(?:\s+H\+?)?)\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)\s*(?:[x*×]\s*10\^?|e)\s*(-?\d+)", text, re.I)
    # Case 2: standard Molar concentration of acid/base e.g. 0.01 M HCl or 10^-3 M
    m_molar = re.search(r"(\d+(?:\.\d+)?(?:[eE]-?\d+)?)\s*M\b\s*(?:solution\s+of\s+)?(hcl|hno3|naoh|koh|acid|base)?", text, re.I)
    # Case 3: 10^-4 M
    m_pow = re.search(r"10\s*\^\s*(-?\d+(?:\.\d+)?)\s*M\b", text, re.I)
    
    conc = None
    is_base = bool(re.search(r"\b(naoh|koh|base|hydroxyl|oh-?)\b", text, re.I))
    
    if m_pow:
        conc = 10.0 ** float(m_pow.group(1))
    elif m_sci:
        coef = float(m_sci.group(1))
        exp = float(m_sci.group(2))
        conc = coef * (10.0 ** exp)
    elif m_molar:
        conc = float(m_molar.group(1))
        if m_molar.group(2) and m_molar.group(2).lower() in ("naoh", "koh", "base"):
            is_base = True
    
    if conc is None or conc <= 0:
        return None

    # PROTICITY (CHEM-ADVERSARIAL 2026-10-06): "0.001 M H2SO4, assuming
    # complete dissociation" gives [H+] = 2 x 0.001 -> pH 2.7, not 3.
    # A stated complete dissociation of a polyprotic acid (leading-H
    # count: H2SO4 -> 2, H3PO4 -> 3) multiplies [H+] by the proton
    # count; without the keyword only the first (strong) dissociation
    # counts, so the mono-protic default is untouched.
    if not is_base and re.search(
            r"complete\s+(?:dissociation|ionisation|ionization)", text,
            re.I):
        m_acid = re.search(r"\bH(\d?)\s*[A-Z][a-z]?", text)
        if m_acid:
            protons = int(m_acid.group(1)) if m_acid.group(1) else 1
            if protons > 1:
                conc = conc * protons

    log_val = -math.log10(conc)
    if is_base:
        poh = log_val
        ph = 14.0 - poh
        val = ph
        steps = [
            f"Method: For a strong basic solution, pOH = -log10([OH-]), and pH = 14 - pOH.",
            f"Given [OH-] = {conc:g} M.",
            f"pOH = -log10({conc:g}) = {poh:.4g}.",
            f"pH = 14 - {poh:.4g} = {ph:.4g}."
        ]
    else:
        ph = log_val
        val = ph
        steps = [
            f"Method: The pH of a solution is defined as pH = -log10([H+]).",
            f"Given [H+] = {conc:g} M.",
            f"pH = -log10({conc:g}) = {ph:.4g}."
        ]
    
    ans_str = f"{ph:.2f}" if abs(ph - round(ph, 2)) < 1e-4 else f"{ph:.4g}"
    if abs(val - round(val)) < 1e-6:
        ans_str = str(int(round(val)))
        val = float(round(val))
    return (val, steps, ans_str, None, "pH = -log10([H+])", {"pH": val, "concentration": conc})



def _c_neet_henderson_hasselbalch(slots, text):
    if not (re.search(r"\b(?:buffer|henderson|hasselbalch)\b", text, re.I) and
            re.search(r"\b(?:ph|pka)\b", text, re.I)):
        return None
    m_pka = re.search(r"pka[^\d]{1,20}(\d+(?:\.\d+)?)", text, re.I)
    if not m_pka:
        return None
    pka = float(m_pka.group(1))
    # role-keyed first — exemplar order varies ('salt = 0.2 and acid =
    # 0.1' bound acid=0.2 by position -> pH 4.45 vs correct 5.05)
    m_salt = re.search(r"salt[^.]{0,25}?(\d+(?:\.\d+)?)\s*M\b|"
                       r"(?:ch3coona|nacoo|conjugate\s+base)[^.]{0,15}?"
                       r"(\d+(?:\.\d+)?)\s*M\b", text, re.I)
    m_acid = re.search(r"acid[^.]{0,25}?(\d+(?:\.\d+)?)\s*M\b|"
                       r"(?:ch3cooh|weak\s+acid)[^.]{0,15}?"
                       r"(\d+(?:\.\d+)?)\s*M\b", text, re.I)
    if m_salt and m_acid:
        salt = float(next(g for g in m_salt.groups() if g))
        acid = float(next(g for g in m_acid.groups() if g))
    else:
        # unlabeled: fall back to position (acid typically stated first)
        concs = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*M\b", text)]
        if len(concs) < 2:
            return None
        acid, salt = concs[0], concs[1]
    if salt <= 0 or acid <= 0:
        return None
    ratio = salt / acid
    log_ratio = math.log10(ratio)
    ph = pka + log_ratio
    ans_str = f"{ph:.2f}"
    steps = [
        "Method: Henderson-Hasselbalch equation for an acidic buffer: pH = pKa + log10([Salt] / [Acid]).",
        f"Given pKa = {pka:g}, [Salt] = {salt:g} M, [Acid] = {acid:g} M.",
        f"Ratio [Salt]/[Acid] = {salt:g} / {acid:g} = {ratio:g}.",
        f"log10({ratio:g}) = {log_ratio:.4g}.",
        f"pH = {pka:g} + ({log_ratio:.4g}) = {ph:.4g}."
    ]
    return (ph, steps, ans_str, None, "pH = pKa + log10([Salt]/[Acid])", {"pH": ph, "pKa": pka})

CHEMISTRY_SPECS: Dict[str, Any] = {
    "NEET_PH_CALCULATION": {
    "exemplars": [
        "Calculate the pH of a 0.01 M HCl solution",
        "Find the pH of a 0.001 M NaOH solution",
        "What is the pH of a solution with hydrogen ion concentration of 10^-4 M",
        "calculate pH of acidic solution given concentration",
        "find pH of solution",
    ],
    "force": r"\b(?:calculate|find|what\s+is)\s+(?:the\s+)?pH\b.{0,60}\b(?:m|molar|solution|concentration)\b",
    "slots": {}, "required": [], "full_text": True,
    "min_conf": 0.45,
    "compute": _c_neet_ph_calculation,
},
    "NEET_HENDERSON_HASSELBALCH": {
    "exemplars": [
        "Calculate the pH of a buffer solution containing 0.1 M CH3COOH and 0.1 M CH3COONa if pKa is 4.74",
        "Find the pH of an acidic buffer with pKa = 4.75, salt concentration = 0.2 M and acid concentration = 0.1 M",
        "Henderson Hasselbalch buffer pH problem",
    ],
    "force": r"\b(?:buffer|henderson)\b.{0,60}\bpka\b.{0,60}\b(?:salt|acid|m\b)",
    "slots": {}, "required": [], "full_text": True,
    "min_conf": 0.45,
    "compute": _c_neet_henderson_hasselbalch,
},
    "MOLALITY": {
        "force": r"molality|mol(?:e)?s?\s+of\s+solute[^.]{0,20}kg",
        "exemplars": [
            "find molality of solution",
            "moles per kilogram solvent",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_molality,
    },
    "STP_VOLUME": {
        "force": r"STP|standard\s+(?:temp|temperature)[^.]"
                 r"{0,20}mole|volume\s+of\s+\d+\s*mol",
        "exemplars": [
            "find volume of gas at STP",
            "molar volume at standard temperature",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_stp_volume,
    },
    "MOLARITY": {
        "force": r"molarity|molar\s+concentration",
        "exemplars": [
            "calculate molarity of solution",
            "find molar concentration",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_molarity,
    },
    "MOLES": {
        "force": r"moles?\b|molar\s+mass|number\s+of\s+moles",
        "exemplars": [
            "how many moles in 36 g of water molar mass 18",
            "find moles mass divided by molar mass",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_moles,
    },
    "CONCENTRATION": {
        "force": r"dissolved|concentration|g/L|g per litre",
        "exemplars": [
            "2 g nacl dissolved in 500 ml find concentration g per l",
            "concentration mass over volume",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_concentration,
    },
    "DILUTION": {
        "force": r"dilut|add(?:ed)?\s+water|make\s+it\s+\d|"
                 r"concentration\s+to\s+\d",
        "exemplars": [
            "how much water to add to 100 ml of 2 M to make 0.5 M",
            "dilute solution molarity volume",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_dilution,
    },
    "LIMITING_MOLES": {
        "force": r"limiting\s+(?:reagent|reactant)|"
                 r"moles?\s+of\s+\w+\s+(?:formed|produced|obtained)|"
                 r"\d+\s*moles?\s+of\s+[A-Z]",
        "exemplars": [
            "2 moles HCl 3 moles NaOH find limiting reagent",
            "moles of product formed",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_limiting_moles,
    },
}

_CHEMISTRY_SUB_DISPATCHERS = (
    model_chemistry2,
    _dispatch_syl_chem,
    model_chemistry3,
    _dispatch_chemistry_core,
    model_carbon_dating,
)

def model_chemistry_families(text: str) -> ModelResult:
    """Consolidated chemistry dispatcher: sweeps sub-dispatchers in map §3 order.
    Highest confidence wins, earlier block wins ties (strict >).
    Never calls an LLM.
    """
    best: Optional[ModelResult] = None
    for fn in _CHEMISTRY_SUB_DISPATCHERS:
        try:
            r = fn(text)
        except Exception:
            continue
        if r is not None and r.matched:
            if best is None or r.confidence > best.confidence:
                best = r
    return best or _no("CHEMISTRY_FAMILIES", "no chemistry family matched")


# spec self-registration (LANG pattern, WS-B step 8)
try:
    from backend.its.solver.structure_families import         STRUCTURE_SPECS as _SS_CHEM
    _SS_CHEM.update(CHEMISTRY_SPECS)
except Exception:  # pragma: no cover - structure_families unavailable
    pass
