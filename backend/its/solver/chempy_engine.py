"""chempy_engine.py -- ChemPy integration for deterministic chemistry solvers.

Provides chemical reaction balancing, stoichiometry, limiting reagent identification,
and formula mass calculations powered by ChemPy (v0.10+), with fail-safe fallbacks.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Set, Tuple, Union

try:
    import chempy
    from chempy import Substance, balance_stoichiometry
    from chempy.util.periodic import symbols as _PERIODIC_SYMBOLS
    _CHEMPY_AVAILABLE = True
except ImportError:
    _CHEMPY_AVAILABLE = False
    Substance = None
    balance_stoichiometry = None
    _PERIODIC_SYMBOLS = []

# Standard board atomic masses for CBSE / ICSE curriculum parity
BOARD_ATOMIC_MASSES: Dict[str, float] = {
    "H": 1.0, "He": 4.0, "Li": 7.0, "Be": 9.0, "B": 11.0, "C": 12.0, "N": 14.0, "O": 16.0,
    "F": 19.0, "Ne": 20.0, "Na": 23.0, "Mg": 24.0, "Al": 27.0, "Si": 28.0, "P": 31.0,
    "S": 32.0, "Cl": 35.5, "Ar": 40.0, "K": 39.0, "Ca": 40.0, "Ti": 48.0, "Cr": 52.0,
    "Mn": 55.0, "Fe": 56.0, "Co": 59.0, "Ni": 59.0, "Cu": 63.5, "Zn": 65.0, "As": 75.0,
    "Br": 80.0, "Ag": 108.0, "Sn": 119.0, "I": 127.0, "Ba": 137.0, "Pt": 195.0,
    "Au": 197.0, "Hg": 201.0, "Pb": 207.0, "Bi": 209.0, "U": 238.0,
}

_ARROW_REGEX = re.compile(r"\s*(?:->|<->|-->|\u2192|\u27f6|\u21cc|\u21c4|=)\s*")
_SUB_MAP = str.maketrans("0123456789", "\u2080\u2081\u2082\u2083\u2084\u2085\u2086\u2087\u2088\u2089")


def unicode_subscripts(text: str) -> str:
    """Convert digits in chemical formulas to Unicode subscripts."""
    # Convert numbers that follow an element symbol or closing parenthesis
    return re.sub(r"(?<=[A-Za-z\)])\d+", lambda m: m.group(0).translate(_SUB_MAP), text)


def clean_chemical_formula(raw: str) -> str:
    """Clean chemical species: strip phase tags ((s), (g), etc.), coefficients, whitespace."""
    s = str(raw or "").strip()
    # Strip state of matter annotations: (s), (l), (g), (aq), (v)
    s = re.sub(r"\s*\(\s*(?:s|l|g|aq|v)\s*\)", "", s, flags=re.I)
    # Strip leading coefficient if any: e.g. "2 H2O" -> "H2O"
    s = re.sub(r"^\d+\s*", "", s)
    # Strip trailing punctuation
    s = s.rstrip(".,; ")
    return s.strip()


def parse_species_list(side_str: str) -> List[str]:
    """Split side string by '+' into clean species list."""
    out: List[str] = []
    for part in side_str.split("+"):
        cleaned = clean_chemical_formula(part)
        if cleaned:
            out.append(cleaned)
    return out


def is_chempy_available() -> bool:
    """Check if ChemPy is installed and importable."""
    return _CHEMPY_AVAILABLE


def get_formula_composition(formula: str) -> Optional[Dict[str, int]]:
    """Return dictionary of element symbol -> atom count in formula."""
    cleaned = clean_chemical_formula(formula)
    if not cleaned:
        return None
    # HYDRATE GUARD (CHEM-ADVERSARIAL 2026-10-06): ChemPy's
    # Substance.from_formula mangles hydrate dot notation —
    # 'CuSO4.5H2O' parsed to {Cu:1, S:1, O:5, H:10} (the anhydrous O4
    # silently dropped), giving molar mass 185.5 instead of 249.5.
    # Split the hydrate, parse each part, scale and merge.
    hydrate = _split_hydrate(cleaned)
    if hydrate is not None:
        total: Dict[str, int] = {}
        for part, mult in hydrate:
            pc = _composition_single(part)
            if pc is None:
                return None
            for el, n in pc.items():
                total[el] = total.get(el, 0) + n * mult
        return total or None
    return _composition_single(cleaned)


_HYDRATE_DOT_RE = re.compile(r"\.(?=\d*\s*[A-Z(])")


def _split_hydrate(cleaned: str):
    """'CuSO4.5H2O' -> [('CuSO4',1), ('H2O',5)]; None when the text has
    no hydrate dot (or a leading coefficient appears on the FIRST part,
    which is a reaction coefficient, not a hydrate multiplier)."""
    parts = _HYDRATE_DOT_RE.split(cleaned)
    if len(parts) < 2:
        return None
    out = []
    for idx, part in enumerate(parts):
        m = re.match(r"^(\d+)\s*(?=[A-Z(])", part)
        if idx == 0 and m:
            return None              # leading coefficient: not a hydrate
        mult = int(m.group(1)) if m else 1
        out.append((part[m.end():] if m else part, mult))
    return out


def _composition_single(species: str) -> Optional[Dict[str, int]]:
    """Element counts of ONE dot-free species."""
    if _CHEMPY_AVAILABLE:
        try:
            sub = Substance.from_formula(species)
            comp: Dict[str, int] = {}
            for z, count in sub.composition.items():
                if 1 <= z <= len(_PERIODIC_SYMBOLS):
                    sym = _PERIODIC_SYMBOLS[z - 1]
                    comp[sym] = count
            if comp:
                return comp
        except Exception:
            pass

    # Fallback custom formula parser
    return _fallback_parse_formula(species)


def _fallback_parse_formula(formula: str) -> Optional[Dict[str, int]]:
    """Deterministic fallback element counter for standard chemical formulas."""
    s = formula.strip()
    s = re.sub(r"[\u2080-\u2089]", lambda m: chr(ord(m.group(0)) - 0x2080 + 48), s)
    counts: Dict[str, int] = {}
    
    # Handle hydrate dot notation e.g. CuSO4.5H2O
    parts = s.split(".")
    for idx, part in enumerate(parts):
        mult = 1
        m_mult = re.match(r"^(\d+)", part)
        if m_mult:
            mult = int(m_mult.group(1))
            part = part[m_mult.end():]
        elif idx > 0:
            mult = 1

        pos = 0
        while pos < len(part):
            if part[pos] == "(":
                end = part.find(")", pos)
                if end == -1:
                    return None
                inner = part[pos + 1:end]
                pos = end + 1
                num_m = re.match(r"^\d+", part[pos:])
                group_mult = int(num_m.group(0)) if num_m else 1
                if num_m:
                    pos += len(num_m.group(0))
                inner_counts = _fallback_parse_formula(inner)
                if inner_counts is None:
                    return None
                for k, v in inner_counts.items():
                    counts[k] = counts.get(k, 0) + v * group_mult * mult
            else:
                m_el = re.match(r"([A-Z][a-z]?)(\d*)", part[pos:])
                if not m_el or not m_el.group(1):
                    pos += 1
                    continue
                el = m_el.group(1)
                cnt = int(m_el.group(2)) if m_el.group(2) else 1
                counts[el] = counts.get(el, 0) + cnt * mult
                pos += len(m_el.group(0))
    return counts if counts else None


def compute_molar_mass(formula: str, use_board_weights: bool = True) -> Optional[float]:
    """Compute molecular / molar mass (g/mol) of formula."""
    cleaned = clean_chemical_formula(formula)
    if not cleaned:
        return None

    comp = get_formula_composition(cleaned)
    if not comp:
        return None

    if use_board_weights:
        # Check if all elements in formula have board masses
        total = 0.0
        all_board = True
        for el, count in comp.items():
            if el in BOARD_ATOMIC_MASSES:
                total += BOARD_ATOMIC_MASSES[el] * count
            else:
                all_board = False
                break
        if all_board and total > 0:
            return round(total, 4)

    # HYDRATE GUARD (CHEM-ADVERSARIAL 2026-10-06): ChemPy mangles the
    # hydrate dot (CuSO4.5H2O -> mass 185.5, the anhydrous O4 dropped).
    # Sum the parts' exact masses, scaled by their multipliers.
    hydrate = _split_hydrate(cleaned)
    if hydrate is not None and _CHEMPY_AVAILABLE:
        try:
            total_h = 0.0
            for part, mult in hydrate:
                total_h += float(Substance.from_formula(part).mass) * mult
            return round(total_h, 4)
        except Exception:
            pass

    # Use ChemPy exact mass
    if _CHEMPY_AVAILABLE:
        try:
            sub = Substance.from_formula(cleaned)
            return round(float(sub.mass), 4)
        except Exception:
            pass

    return None


def balance_species(lhs: List[str], rhs: List[str]) -> Optional[Tuple[List[int], List[int]]]:
    """Balance chemical equation given lists of reactant and product formulas.

    Returns tuple of (coefficients_lhs, coefficients_rhs) matching input order.
    Uses ChemPy balance_stoichiometry with fallback.
    """
    clean_lhs = [clean_chemical_formula(s) for s in lhs if clean_chemical_formula(s)]
    clean_rhs = [clean_chemical_formula(s) for s in rhs if clean_chemical_formula(s)]
    if not clean_lhs or not clean_rhs:
        return None

    if _CHEMPY_AVAILABLE:
        try:
            # ChemPy requires sets of reactant and product strings
            reac_set = set(clean_lhs)
            prod_set = set(clean_rhs)
            reac_coeffs, prod_coeffs = balance_stoichiometry(reac_set, prod_set)
            
            # Map back to ordered lists
            co_l = [int(reac_coeffs[s]) for s in clean_lhs]
            co_r = [int(prod_coeffs[s]) for s in clean_rhs]

            # Verify atom conservation
            all_species = clean_lhs + clean_rhs
            all_counts = [get_formula_composition(s) for s in all_species]
            if all(c is not None for c in all_counts):
                elems = set().union(*[set(c.keys()) for c in all_counts if c])
                verified = True
                for e in elems:
                    lhs_tot = sum(co_l[i] * (all_counts[i].get(e, 0)) for i in range(len(clean_lhs)))
                    rhs_tot = sum(co_r[j] * (all_counts[len(clean_lhs) + j].get(e, 0)) for j in range(len(clean_rhs)))
                    if lhs_tot != rhs_tot:
                        verified = False
                        break
                if verified and all(c > 0 for c in co_l + co_r):
                    return co_l, co_r
        except Exception:
            pass

    return None


def format_equation(lhs: List[str], co_l: List[int], rhs: List[str], co_r: List[int],
                    use_unicode: bool = False) -> str:
    """Format balanced chemical equation string."""
    def term(coeff: int, species: str) -> str:
        s = unicode_subscripts(species) if use_unicode else species
        return f"{coeff} {s}" if coeff > 1 else s

    arrow = " \u2192 " if use_unicode else " -> "
    left_str = " + ".join(term(c, s) for c, s in zip(co_l, lhs))
    right_str = " + ".join(term(c, s) for c, s in zip(co_r, rhs))
    return f"{left_str}{arrow}{right_str}"


def balance_chemical_equation(equation_text: str) -> Optional[Dict[str, Any]]:
    """Parse and balance a full equation string (e.g. 'KMnO4 + HCl -> KCl + MnCl2 + H2O + Cl2').

    Returns comprehensive result dictionary or None if unparseable/unbalanceable.
    """
    m = _ARROW_REGEX.search(equation_text)
    if not m:
        return None

    lhs_raw = equation_text[:m.start()]
    rhs_raw = equation_text[m.end():]
    lhs = parse_species_list(lhs_raw)
    rhs = parse_species_list(rhs_raw)

    if not lhs or not rhs or len(lhs) + len(rhs) < 2:
        return None

    balanced = balance_species(lhs, rhs)
    if not balanced:
        return None

    co_l, co_r = balanced
    eq_ascii = format_equation(lhs, co_l, rhs, co_r, use_unicode=False)
    eq_unicode = format_equation(lhs, co_l, rhs, co_r, use_unicode=True)

    # Build atom audit string
    all_sp = lhs + rhs
    all_coeffs = co_l + co_r
    counts = [get_formula_composition(s) for s in all_sp]
    elems = sorted(set().union(*[set(c.keys()) for c in counts if c]))
    
    audit_items = []
    for e in elems:
        lhs_sum = sum(co_l[i] * counts[i].get(e, 0) for i in range(len(lhs)))
        rhs_sum = sum(co_r[j] * counts[len(lhs) + j].get(e, 0) for j in range(len(rhs)))
        audit_items.append(f"{e}: {lhs_sum} = {rhs_sum}")
    audit_str = "; ".join(audit_items)

    return {
        "success": True,
        "lhs": lhs,
        "rhs": rhs,
        "co_l": co_l,
        "co_r": co_r,
        "balanced_ascii": eq_ascii,
        "balanced_unicode": eq_unicode,
        "audit": audit_str,
        "n_species": len(lhs) + len(rhs),
    }


def solve_limiting_reagent_chempy(
    lhs: List[str],
    rhs: List[str],
    co_l: List[int],
    co_r: List[int],
    reactant_amounts: Dict[str, Tuple[float, str]],
    target_product: Optional[str] = None,
) -> Optional[Dict[str, Any]]:
    """Perform exact stoichiometric limiting reagent and product yield calculation.

    reactant_amounts: {formula: (amount_value, 'mol'|'g')}
    """
    if len(reactant_amounts) < 2:
        return None

    moles: Dict[str, float] = {}
    masses: Dict[str, float] = {}

    for f, (val, unit) in reactant_amounts.items():
        clean_f = clean_chemical_formula(f)
        if clean_f not in lhs:
            continue
        M = compute_molar_mass(clean_f)
        if not M or M <= 0:
            return None
        u = unit.lower().strip()
        if u.startswith("m"):  # moles
            moles[clean_f] = float(val)
            masses[clean_f] = float(val) * M
        else:  # grams
            masses[clean_f] = float(val)
            moles[clean_f] = float(val) / M

    if len(moles) < 2:
        return None

    lhs_idx = {f: i for i, f in enumerate(lhs)}
    # Ratio: moles available / stoichiometric coefficient
    ratios = {f: moles[f] / co_l[lhs_idx[f]] for f in moles}
    limiting_reagent = min(ratios, key=ratios.get)
    limiting_ratio = ratios[limiting_reagent]

    # Target product
    prod = clean_chemical_formula(target_product) if target_product else rhs[0]
    if prod not in rhs:
        prod = rhs[0]
    prod_idx = rhs.index(prod)
    prod_coeff = co_r[prod_idx]
    lim_coeff = co_l[lhs_idx[limiting_reagent]]

    # Theoretical product yield
    prod_moles = limiting_ratio * prod_coeff
    M_prod = compute_molar_mass(prod) or 1.0
    prod_mass = prod_moles * M_prod

    # Unreacted excess for other reactants
    excess_info: Dict[str, Dict[str, float]] = {}
    for f in moles:
        if f != limiting_reagent:
            coeff = co_l[lhs_idx[f]]
            consumed_mol = limiting_ratio * coeff
            remain_mol = max(0.0, moles[f] - consumed_mol)
            M_f = compute_molar_mass(f) or 1.0
            excess_info[f] = {
                "initial_mol": moles[f],
                "consumed_mol": consumed_mol,
                "remaining_mol": remain_mol,
                "remaining_g": remain_mol * M_f,
            }

    return {
        "limiting_reagent": limiting_reagent,
        "limiting_ratio": limiting_ratio,
        "ratios": ratios,
        "product": prod,
        "product_moles": prod_moles,
        "product_mass_g": prod_mass,
        "excess": excess_info,
        "moles_initial": moles,
    }
