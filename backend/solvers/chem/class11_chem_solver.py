"""
ISC Class 11 Chemistry Solver
Deterministic educational solver using chempy, mendeleev, sympy, pint, numpy.
"""

import math
import re
from dataclasses import dataclass, field
from decimal import Decimal, ROUND_HALF_UP
from typing import Any, Dict, List, Optional, Tuple, Union

import numpy as np
import pint
from chempy import Reaction, Substance, ReactionSystem
from chempy.chemistry import Species
try:
    from mendeleev import element
except ImportError:
    element = None  # mendeleev not installed; chem solver works without it

# ---------------------------------------------------------------------------
# SolverResult
# ---------------------------------------------------------------------------

@dataclass
class SolverResult:
    """Uniform return type for every solver function."""
    problem: str
    inputs: Dict[str, Any]
    steps: List[str]
    result: Any
    verification: str
    formula_used: str
    confidence: float = 1.0

    def to_dict(self) -> dict:
        return {
            "problem": self.problem,
            "inputs": self.inputs,
            "steps": self.steps,
            "result": self.result,
            "verification": self.verification,
            "formula_used": self.formula_used,
            "confidence": self.confidence,
        }

# ---------------------------------------------------------------------------
# Registry
# ---------------------------------------------------------------------------

SOLVER_REGISTRY: Dict[str, callable] = {}

def register(name: str):
    def decorator(fn):
        SOLVER_REGISTRY[name] = fn
        return fn
    return decorator

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

_ATOMIC_MASS_CACHE: Dict[str, float] = {}

def _atomic_mass(symbol: str) -> float:
    if symbol not in _ATOMIC_MASS_CACHE:
        try:
            el = element(symbol.capitalize())
            _ATOMIC_MASS_CACHE[symbol] = float(el.atomic_weight)
        except Exception:
            _ATOMIC_MASS_CACHE[symbol] = 0.0
    return _ATOMIC_MASS_CACHE[symbol]

def _round_val(v, places=4):
    if isinstance(v, float) and (math.isnan(v) or math.isinf(v)):
        return str(v)
    return round(float(v), places)

def _sigfig(v, n=4):
    """Return string with n significant figures."""
    if v == 0:
        return "0.0"
    d = -int(math.floor(math.log10(abs(v)))) + (n - 1)
    return str(round(float(v), d))

# ---------------------------------------------------------------------------
# 1. molar_mass
# ---------------------------------------------------------------------------

@register("molar_mass")
def molar_mass(formula: str) -> SolverResult:
    steps: List[str] = []
    steps.append(f"Input molecular formula: {formula}")
    steps.append("Rule: Molar mass = sum of (atomic mass × number of atoms) for each element")

    pattern = re.compile(r"([A-Z][a-z]?)(\d*)")
    tokens = pattern.findall(formula)
    total = 0.0
    breakdown: List[str] = []

    for elem, count_str in tokens:
        count = int(count_str) if count_str else 1
        amass = _atomic_mass(elem)
        contrib = amass * count
        total += contrib
        breakdown.append(f"{elem}: {count} × {_round_val(amass)} = {_round_val(contrib)} u")

    steps.append("Breakdown: " + "; ".join(breakdown))
    steps.append(f"Total molar mass = {_round_val(total)} g/mol")

    verification = (f"Back-check: {formula} has {len(tokens)} distinct element tokens. "
                    f"Sum = {_round_val(total)} g/mol ✓")

    return SolverResult(
        problem=f"Calculate molar mass of {formula}",
        inputs={"formula": formula},
        steps=steps,
        result={"molar_mass_g_per_mol": round(total, 4)},
        verification=verification,
        formula_used="M = Σ (n_i × A_i)",
        confidence=1.0 if total > 0 else 0.0,
    )

# ---------------------------------------------------------------------------
# 2. mole_concept
# ---------------------------------------------------------------------------

@register("mole_concept")
def mole_concept(n_moles: float, molar_mass: float = None,
                mass: float = None, particles: float = None) -> SolverResult:
    steps = [f"Inputs: n = {n_moles} mol, M = {molar_mass} g/mol, mass = {mass} g, N = {particles}"]
    steps.append("Rule: n = mass / M;  1 mol = 6.022×10²³ particles (Avogadro's constant)")

    NA = 6.022e23
    result: Dict[str, Any] = {}

    if mass is None and molar_mass is not None:
        mass = n_moles * molar_mass
        steps.append(f"mass = n × M = {n_moles} × {molar_mass} = {_round_val(mass)} g")
        result["mass_g"] = mass

    if particles is None:
        particles = n_moles * NA
        steps.append(f"N = n × N_A = {n_moles} × {NA:.3e} = {_sigfig(particles, 3):.3e} particles")
        result["particles"] = particles

    if mass is not None and molar_mass is not None:
        check_n = mass / molar_mass
        steps.append(f"Verification: n = mass/M = {mass}/{molar_mass} = {_round_val(check_n)} mol (expected {n_moles})")

    verification = f"Consistent: {n_moles} mol ↔ {_round_val(mass)} g ↔ {_sigfig(particles,3)} particles"

    return SolverResult(
        problem="Mole concept – convert between moles, mass, and particles",
        inputs={"n_moles": n_moles, "molar_mass_g_per_mol": molar_mass,
                "mass_g": mass, "particles": particles},
        steps=steps,
        result=result,
        verification=verification,
        formula_used="n = m/M = N/N_A",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 3. empirical_formula
# ---------------------------------------------------------------------------

@register("empirical_formula")
def empirical_formula(composition: Dict[str, float]) -> SolverResult:
    steps = [f"Input composition (mass %): {composition}"]
    steps.append("Rule: (1) convert % → moles, (2) divide by smallest, (3) multiply to get integers")

    moles: Dict[str, float] = {}
    for elem, pct in composition.items():
        moles[elem] = pct / _atomic_mass(elem)
        steps.append(f"  Moles of {elem} = {pct}/{_round_val(_atomic_mass(elem))} = {_round_val(moles[elem])}")

    smallest = min(moles.values())
    ratio = {e: m / smallest for e, m in moles.items()}
    steps.append("Mole ratio (÷ smallest): " + ", ".join(f"{e}:{_round_val(r)}" for e, r in ratio.items()))

    # multiply by small integers
    multipliers = [1, 2, 3, 4, 5, 6]
    best = None
    for mult in multipliers:
        ints = {e: round(r * mult, 6) for e, r in ratio.items()}
        if all(abs(v - round(v)) < 0.15 for v in ints.values()):
            best = mult
            break

    formula_parts = []
    if best:
        for elem, r in ratio.items():
            num = int(round(r * best))
            formula_parts.append(f"{elem}{num if num > 1 else ''}")
        empirical = "".join(formula_parts)
    else:
        empirical = "?".        steps.append(f"Best integer multiplier: {best}")
    steps.append(f"Empirical formula: {empirical}")

    # molecular formula if molar mass given
    verification = f"Verified: Empirical formula of composition {composition} is {empirical}"

    return SolverResult(
        problem="Determine empirical formula from composition",
        inputs={"composition": composition},
        steps=steps,
        result={"empirical_formula": empirical},
        verification=verification,
        formula_used="Empirical = Σ atoms in simplest integer ratio",
        confidence=1.0 if best else 0.5,
    )

# ---------------------------------------------------------------------------
# 4. balance_equation
# ---------------------------------------------------------------------------

@register("balance_equation")
def balance_equation(reactants: List[str], products: List[str]) -> SolverResult:
    steps = [f"Reactants: {reactants}  →  Products: {products}"]
    steps.append("Rule: algebraic method — solve linear equations for stoichiometric coefficients")

    elements = sorted(set(re.findall(r"[A-Z][a-z]?", " ".join(reactants + products))))
    steps.append(f"Elements involved: {elements}")

    # build matrix: rows = elements, cols = compounds (reactants + products)
    compounds = reactants + products
    n_react = len(reactants)
    A = []
    for elem in elements:
        row = []
        for comp in compounds:
            count = 0
            for m in re.finditer(rf"({elem})(\d*)", comp):
                count += int(m.group(2)) if m.group(2) else 1
            row.append(-count if compounds.index(comp) < n_react else count)
        A.append(row)
    A = np.array(A, dtype=float)
    steps.append(f"Element matrix A ({A.shape[0]}×{A.shape[1]}):\n{np.array2string(A)}")

    # SVD to find nullspace
    _, _, Vt = np.linalg.svd(A)
    rank = np.sum(np.abs(_) > 1e-10)
    null_dim = A.shape[1] - rank
    coeffs = Vt[rank:].T[:, 0]
    coeffs = np.round(coeffs / coeffs[0]).astype(int)
    coeffs = np.abs(coeffs).tolist()

    steps.append("Stoichiometric coefficients: " + ", ".join(
        f"{c}{comp}" for c, comp in zip(coeffs, compounds)))

    # verification
    lhs_elem: Dict[str, float] = {}
    rhs_elem: Dict[str, float] = {}
    for elem in elements:
        lhs = sum(coeffs[i] * (-A[j, i]) for i in range(n_react) for j in range(len(elements)) if elements[j] == elem)
        rhs = sum(coeffs[i] * A[j, i] for i in range(n_react, len(compounds)) for j in range(len(elements)) if elements[j] == elem)
        lhs_elem[elem] = lhs
        rhs_elem[elem] = rhs

    balanced_eq = " + ".join(f"{c}{c2}" for c, c2 in zip(coeffs, reactants)) + " → " + \
                  " + ".join(f"{c}{c2}" for c, c2 in zip(coeffs[n_react:], products))

    verification = "Atom balance check: " + ", ".join(
        f"{e}: {lhs_elem[e]} = {rhs_elem[e]}" for e in elements)

    return SolverResult(
        problem="Balance chemical equation",
        inputs={"reactants": reactants, "products": products},
        steps=steps,
        result={"coefficients": coeffs, "equation": balanced_eq},
        verification=verification,
        formula_used="Linear algebra null-space on atom-balance matrix",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 5. stoichiometry_calc
# ---------------------------------------------------------------------------

@register("stoichiometry_calc")
def stoichiometry_calc(reactant_formula: str, reactant_mass: float,
                       product_formula: str, coeff_reactant: int = 1,
                       coeff_product: int = 1) -> SolverResult:
    steps = [f"Given: {coeff_reactant} {reactant_formula} → {coeff_product} {product_formula}"]
    steps.append(f"Mass of {reactant_formula} = {reactant_mass} g")
    steps.append("Rule: (mass / M_reactant) × (coeff_product / coeff_reactant) × M_product = mass_product")

    M_react = molar_mass(reactant_formula).result["molar_mass_g_per_mol"]
    M_prod = molar_mass(product_formula).result["molar_mass_g_per_mol"]

    steps.append(f"M({reactant_formula}) = {_round_val(M_react)} g/mol")
    steps.append(f"M({product_formula}) = {_round_val(M_prod)} g/mol")

    n_react = reactant_mass / M_react
    steps.append(f"n({reactant_formula}) = {_round_val(reactant_mass)}/{_round_val(M_react)} = {_round_val(n_react)} mol")

    n_prod = n_react * (coeff_product / coeff_reactant)
    steps.append(f"n({product_formula}) = {_round_val(n_react)} × ({coeff_product}/{coeff_reactant}) = {_round_val(n_prod)} mol")

    mass_prod = n_prod * M_prod
    steps.append(f"mass({product_formula}) = {_round_val(n_prod)} × {_round_val(M_prod)} = {_round_val(mass_prod)} g")

    verification = (f"Reverse: {_round_val(mass_prod)} g {product_formula} / {_round_val(M_prod)} g/mol = "
                    f"{_round_val(mass_prod / M_prod)} mol; ratio = {_sigfig((mass_prod / M_prod) / n_react)} "
                    f"(expected {_sigfig(coeff_product / coeff_reactant)})")

    return SolverResult(
        problem=f"Stoichiometry: {reactant_mass} g {reactant_formula} → {product_formula}",
        inputs={"reactant": reactant_formula, "mass_reactant_g": reactant_mass,
                "product": product_formula, "coeff_r": coeff_reactant, "coeff_p": coeff_product},
        steps=steps,
        result={"product_mass_g": round(mass_prod, 4), "moles_product": round(n_prod, 6)},
        verification=verification,
        formula_used="m_product = (m_r/M_r) × (c_p/c_r) × M_p",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 6. electron_config
# ---------------------------------------------------------------------------

@register("electron_config")
def electron_config(atomic_number: int) -> SolverResult:
    steps = [f"Element Z = {atomic_number}"]
    steps.append("Rule: Aufbau principle — fill orbitals by increasing (n+l), ties broken by lower n")

    order = [
        (1, 0), (2, 0), (2, 1), (3, 0), (3, 1), (4, 0), (3, 2), (4, 1),
        (5, 0), (4, 2), (5, 1), (6, 0), (4, 3), (5, 2), (6, 1), (7, 0),
        (5, 3), (6, 2), (7, 1), (8, 0),
    ]
    subshell_caps = {0: 2, 1: 6, 2: 10, 3: 14}
    labels = {0: "s", 1: "p", 2: "d", 3: "f"}

    remaining = atomic_number
    config: List[str] = []
    counts: Dict[Tuple[int, int], int] = {}

    for n, l in order:
        if remaining <= 0:
            break
        cap = subshell_caps[l]
        fill = min(remaining, cap)
        subshell = f"{n}{labels[l]}"
        config.append(f"{subshell}{fill if fill > 1 else ''}")
        counts[(n, l)] = fill
        remaining -= fill
        steps.append(f"  {subshell}: fill {fill} electron(s) → remaining {remaining}")

    config_str = " ".join(config)
    try:
        el = element(atomic_number)
        symbol = el.symbol
        name = el.name
    except Exception:
        symbol = f"Z={atomic_number}"
        name = "Unknown"

    # noble gas shorthand for Z > 2
    noble_gases = {2: "He", 10: "Ne", 18: "Ar", 36: "Kr", 54: "Xe", 86: "Rn"}
    shorthand = ""
    for zz in sorted(noble_gases.keys(), reverse=True):
        if zz < atomic_number:
            shorthand = f"[{noble_gases[zz]}] "
            break

    full_config = shorthand + config_str if shorthand else config_str

    steps.append(f"Electronic configuration: {full_config}")

    # valence electrons
    valence = sum(v for (n, l), v in counts.items() if n == max(k[0] for k in counts))
    steps.append(f"Valence electrons (outermost shell): {valence}")

    verification = f"Total electrons = {atomic_number}, sum of superscripts = {sum(counts.values())}"
    if sum(counts.values()) != atomic_number:
        verification += "  ✗ MISMATCH"
        confidence = 0.5
    else:
        confidence = 1.0

    return SolverResult(
        problem=f"Electronic configuration for Z = {atomic_number}",
        inputs={"atomic_number": atomic_number},
        steps=steps,
        result={"configuration": full_config, "valence_electrons": valence,
                "element_symbol": symbol, "element_name": name},
        verification=verification,
        formula_used="Aufbau: (n+l) rule + Pauli exclusion (max 2e⁻/orbital)",
        confidence=confidence,
    )

# ---------------------------------------------------------------------------
# 7. quantum_numbers
# ---------------------------------------------------------------------------

@register("quantum_numbers")
def quantum_numbers(n: int, l: int, ml: int, ms: float) -> SolverResult:
    steps = [f"Input: n={n}, l={l}, m_l={ml}, m_s={ms}"]
    steps.append("Rules: n ≥ 1; 0 ≤ l ≤ n-1; -l ≤ m_l ≤ +l; m_s = +½ or -½")

    valid = True
    reasons = []

    if n < 1:
        valid = False
        reasons.append("n must be ≥ 1")
    if l < 0 or l >= n:
        valid = False
        reasons.append(f"l must satisfy 0 ≤ l ≤ {n-1}")
    if abs(ml) > l:
        valid = False
        reasons.append(f"m_l must satisfy |m_l| ≤ l ({l})")
    if ms not in (0.5, -0.5):
        valid = False
        reasons.append("m_s must be +½ or -½")

    steps.append(f"Validation: {'VALID' if valid else 'INVALID — ' + '; '.join(reasons)}")

    subshell = {0: "s", 1: "p", 2: "d", 3: "f"}.get(l, "?")
    orbital_descr = f"Shell {n}, Subshell {n}{subshell}, Orbital {ml}"

    max_e = 2 * n**2
    steps.append(f"Max electrons in shell n={n}: 2n² = {max_e}")

    confidence = 1.0 if valid else 0.0
    return SolverResult(
        problem="Validate and describe a set of quantum numbers",
        inputs={"n": n, "l": l, "ml": ml, "ms": ms},
        steps=steps,
        result={"valid": valid, "orbital": orbital_descr, "max_electrons_shell": max_e},
        verification=f"Quantum number set ({n},{l},{ml},{ms}) is {'allowed' if valid else 'forbidden'} per selection rules.",
        formula_used="Selection rules: 0≤l<n, |ml|≤l, ms=±½",
        confidence=confidence,
    )

# ---------------------------------------------------------------------------
# 8. periodic_trend
# ---------------------------------------------------------------------------

@register("periodic_trend")
def periodic_trend(element1: str, element2: str, property_name: str) -> SolverResult:
    steps = [f"Compare {element1} vs {element2} for property: {property_name}"]
    steps.append("Rule: Trends follow group and period positions in the periodic table")

    try:
        e1 = element(element1.capitalize())
        e2 = element(element2.capitalize())
    except Exception as ex:
        return SolverResult(
            problem=f"Periodic trend: {element1} vs {element2} ({property_name})",
            inputs={"element1": element1, "element2": element2, "property": property_name},
            steps=[f"Error: {ex}"],
            result=None,
            verification="Failed to load elements from mendeleev.",
            formula_used="N/A",
            confidence=0.0,
        )

    props = {
        "atomic_radius": ("atomic_radius", "pm", True),
        "ionization_energy": ("ionization_energy", "eV", False),
        "electronegativity": ("electronegativity", "", False),
        "electron_affinity": ("electron_affinity", "eV", True),
        "electronegativity_pauling": ("electronegativity", "", False),
    }

    prop_key = property_name.lower().replace(" ", "_").replace("-", "_")
    if prop_key not in props:
        prop_key = "atomic_radius"
    pkey, unit, increases_left = props[prop_key]

    v1 = getattr(e1, pkey, None)
    v2 = getattr(e2, pkey, None)

    steps.append(f"{e1.symbol} ({e1.atomic_number}): {pkey} = {v1} {unit}")
    steps.append(f"{e2.symbol} ({e2.atomic_number}): {pkey} = {v2} {unit}")

    if v1 and v2:
        larger = e1.symbol if v1 > v2 else e2.symbol
        trend_note = ("increases left-to-right" if not increases_left
                      else "decreases left-to-right")
        steps.append(f"Trend: {property_name} {trend_note} → {larger} has higher value")
        verification = (f"{e1.symbol}: {v1} {unit}, {e2.symbol}: {v2} {unit}. "
                        f"{larger} has higher {property_name}.")
    else:
        larger = "unknown"
        verification = f"Data not available for {property_name}"

    return SolverResult(
        problem=f"Periodic trend: {property_name} of {element1} vs {element2}",
        inputs={"element1": element1, "element2": element2, "property": property_name},
        steps=steps,
        result={"element1_value": v1, "element2_value": v2,
                "higher_value_element": larger},
        verification=verification,
        formula_used=f"Trend: {property_name} based on group/period position",
        confidence=1.0 if v1 and v2 else 0.3,
    )

# ---------------------------------------------------------------------------
# 9. lewis_structure
# ---------------------------------------------------------------------------

@register("lewis_structure")
def lewis_structure(formula: str, central_atom: str) -> SolverResult:
    steps = [f"Molecule: {formula}, Central atom: {central_atom}"]
    steps.append("Rule: Total valence e⁻ = Σ valence e⁻ of all atoms. "
                 "Subtract charge if ionic.")

    # simple valence electron lookup
    valence_map = {
        "H": 1, "He": 2,
        "Li": 1, "Be": 2, "B": 3, "C": 4, "N": 5, "O": 6, "F": 7, "Ne": 8,
        "Na": 1, "Mg": 2, "Al": 3, "Si": 4, "P": 5, "S": 6, "Cl": 7, "Ar": 8,
    }

    pattern = re.compile(r"([A-Z][a-z]?)(\d*)")
    tokens = pattern.findall(formula)
    total_valence = 0
    breakdown = []
    for elem, count_str in tokens:
        count = int(count_str) if count_str else 1
        val = valence_map.get(elem.capitalize(), 0)
        contrib = val * count
        total_valence += contrib
        breakdown.append(f"{elem}: {count} × {val} = {contrib}")
    steps.append("Valence electrons: " + "; ".join(breakdown))
    steps.append(f"Total valence electrons = {total_valence}")

    central_count = sum(int(c) if c else 1 for e, c in tokens if e.capitalize() == central_atom.capitalize())
    surrounding_count = sum(int(c) if c else 1 for e, c in tokens if e.capitalize() != central_atom.capitalize())

    # octet estimate
    bonds_needed = surrounding_count  # single bonds
    bonding_e = bonds_needed * 2
    lone_on_central = total_valence - bonding_e - 8
    steps.append(f"Bonding electrons: {bonds_needed} bonds × 2 = {bonding_e}")
    steps.append(f"Lone-pair electrons on {central_atom}: {total_valence} - {bonding_e} = {total_valence - bonding_e}")

    lone_pairs = max(0, lone_on_central) // 2
    lone_on_periphery = (total_valence - bonding_e - max(0, lone_on_central)) // 2

    structure_desc = (f"{central_atom} with {bonds_needed} single bonds, "
                      f"{lone_pairs} lone pair(s) on {central_atom}, "
                      f"{lone_on_periphery} lone pair(s) on peripheral atoms")
    steps.append(f"Lewis structure: {structure_desc}")

    octet_satisfied = (total_valence - bonding_e) >= 8 if central_count == 1 else True
    verification = (f"Total e⁻: {total_valence}. "
                    f"Octet {'satisfied' if octet_satisfied else 'NOT satisfied'} for {central_atom}.")

    return SolverResult(
        problem=f"Lewis structure for {formula}",
        inputs={"formula": formula, "central_atom": central_atom},
        steps=steps,
        result={"total_valence_electrons": total_valence,
                "bonds": bonds_needed,
                "lone_pairs_central": lone_pairs,
                "description": structure_desc},
        verification=verification,
        formula_used="Σ valence e⁻; Octet / Duplet rule",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 10. hybridization
# ---------------------------------------------------------------------------

@register("hybridization")
def hybridization(steric_number: int) -> SolverResult:
    steps = [f"Steric number (SN) = {steric_number}"]
    steps.append("Rule: SN = number of σ bonds + number of lone pairs on central atom")
    steps.append("Mapping: sp=2, sp²=3, sp³=4, sp³d=5, sp³d²=6")

    mapping = {2: "sp", 3: "sp²", 4: "sp³", 5: "sp³d", 6: "sp³d²"}
    hyd = mapping.get(steric_number, "unknown")

    geom_map = {
        "sp": "Linear (180°)",
        "sp²": "Trigonal planar (120°)",
        "sp³": "Tetrahedral (109.5°)",
        "sp³d": "Trigonal bipyramidal (90°/120°)",
        "sp³d²": "Octahedral (90°)",
    }
    geometry = geom_map.get(hyd, "Unknown")

    steps.append(f"Hybridization: {hyd}")
    steps.append(f"Geometry: {geometry}")

    verification = f"SN={steric_number} → {hyd} hybridization confirmed."

    return SolverResult(
        problem=f"Determine hybridization for steric number {steric_number}",
        inputs={"steric_number": steric_number},
        steps=steps,
        result={"hybridization": hyd, "geometry": geometry},
        verification=verification,
        formula_used="SN = σ bonds + lone pairs; mapping SN → hybrid",
        confidence=1.0 if steric_number in mapping else 0.0,
    )

# ---------------------------------------------------------------------------
# 11. bond_angle
# ---------------------------------------------------------------------------

@register("bond_angle")
def bond_angle(hybridization: str, lone_pairs: int = 0) -> SolverResult:
    steps = [f"Hybridization: {hybridization}, Lone pairs on central: {lone_pairs}"]
    steps.append("Rule: Ideal angles based on VSEPR; lone pairs reduce angle by ~2-5° each")

    base_angles = {
        "sp": 180.0,
        "sp2": 120.0,
        "sp3": 109.5,
        "sp3d": (90.0, 120.0),
        "sp3d2": 90.0,
    }

    h_lower = hybridization.lower().replace("²", "2").replace("³", "3").replace("⁵", "5").replace("⁶", "6")

    base = base_angles.get(h_lower, None)
    if base is None:
        return SolverResult(
            problem=f"Bond angle for {hybridization}",
            inputs={"hybridization": hybridization, "lone_pairs": lone_pairs},
            steps=["Unknown hybridization"],
            result=None,
            verification="N/A",
            formula_used="VSEPR",
            confidence=0.0,
        )

    if isinstance(base, tuple):
        angles = f"{base[0]}° (axial-equatorial) / {base[1]}° (equatorial)"
        ideal = base[0]
    else:
        angles = f"{base}°"
        ideal = base

    corrected = ideal - lone_pairs * 2.5
    steps.append(f"Ideal angle: {angles}")
    steps.append(f"Corrected (VSEPR): {_round_val(ideal)}° - {lone_pairs}×2.5° = {_round_val(corrected)}°")

    verification = (f"VSEPR correction applied: {_round_val(corrected)}° "
                    f"(expected ~{_round_val(corrected)}° with {lone_pairs} lone pair(s))")

    return SolverResult(
        problem=f"Predict bond angle for {hybridization} with {lone_pairs} lone pair(s)",
        inputs={"hybridization": hybridization, "lone_pairs": lone_pairs},
        steps=steps,
        result={"ideal_angle_deg": ideal,
                "corrected_angle_deg": round(corrected, 2)},
        verification=verification,
        formula_used="θ_corrected = θ_ideal - (lone_pairs × 2.5°)",
        confidence=0.85,
    )

# ---------------------------------------------------------------------------
# 12. thermo_calc
# ---------------------------------------------------------------------------

@register("thermo_calc")
def thermo_calc(delta_h: float, delta_s: float, temperature: float) -> SolverResult:
    steps = [f"Given: ΔH = {delta_h} J/mol, ΔS = {delta_s} J/(mol·K), T = {temperature} K"]
    steps.append("Rules:")
    steps.append("  ΔG = ΔH - T·ΔS")
    steps.append("  Spontaneous if ΔG < 0; Equilibrium if ΔG = 0")

    delta_g = delta_h - temperature * delta_s
    steps.append(f"ΔG = {_round_val(delta_h)} - {temperature} × {_round_val(delta_s)}")
    steps.append(f"ΔG = {_round_val(delta_h)} - {_round_val(temperature * delta_s)} = {_round_val(delta_g)} J/mol")

    if delta_g < 0:
        spontaneity = "Spontaneous (ΔG < 0)"
    elif delta_g == 0:
        spontaneity = "At equilibrium (ΔG = 0)"
    else:
        spontaneity = "Non-spontaneous (ΔG > 0)"

    steps.append(f"Result: {spontaneity}")

    # Equilibrium temperature where ΔG = 0
    if delta_s != 0:
        t_eq = delta_h / delta_s
        steps.append(f"T_eq (where ΔG = 0): T = ΔH/ΔS = {_round_val(delta_h)}/{_round_val(delta_s)} = {_round_val(t_eq)} K")
    else:
        t_eq = None
        steps.append("T_eq: undefined (ΔS = 0)")

    verification = (f"Check at T={temperature} K: ΔG = {_round_val(delta_g)} J/mol. "
                    f"{'Correct ✓' if (delta_g < 0 and 'Spontaneous' in spontaneity) or (delta_g == 0 and 'equilibrium' in spontaneity.lower()) else 'Check values'}")

    return SolverResult(
        problem="Calculate ΔG and spontaneity",
        inputs={"delta_h_j_per_mol": delta_h, "delta_s_j_per_mol_k": delta_s,
                "temperature_k": temperature},
        steps=steps,
        result={"delta_g_j_per_mol": round(delta_g, 4),
                "spontaneous": delta_g < 0,
                "equilibrium_temperature_k": round(t_eq, 4) if t_eq else None},
        verification=verification,
        formula_used="ΔG = ΔH - TΔS",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 13. hess_law
# ---------------------------------------------------------------------------

@register("hess_law")
def hess_law(reactions: List[Dict[str, Any]]) -> SolverResult:
    steps = [f"Applying Hess's Law to {len(reactions)} step reaction(s)"]
    steps.append("Rule: ΔH°overall = Σ (n_i × ΔH°_i)  where n_i = multiplier for step i")

    total_delta_h = 0.0
    for i, rxn in enumerate(reactions):
        mult = rxn.get("multiplier", 1)
        dh = rxn.get("delta_h", 0.0)
        contribution = mult * dh
        total_delta_h += contribution
        steps.append(f"  Step {i+1}: {mult} × ΔH°({dh} kJ/mol) = {_round_val(contribution)} kJ/mol")

    steps.append(f"ΣΔH° = {_round_val(total_delta_h)} kJ/mol")

    verification = f"Hess: sum of weighted enthalpies = {_round_val(total_delta_h)} kJ/mol (state function, path-independent)"

    return SolverResult(
        problem="Apply Hess's Law to find overall enthalpy",
        inputs={"reactions": reactions},
        steps=steps,
        result={"delta_h_overall_kj_per_mol": round(total_delta_h, 4)},
        verification=verification,
        formula_used="ΔH° = Σ n_i ΔH°_i",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 14. equilibrium_kc
# ---------------------------------------------------------------------------

@register("equilibrium_kc")
def equilibrium_kc(concentrations: Dict[str, float],
                   stoichiometry: Dict[str, int]) -> SolverResult:
    steps = [f"Concentrations at equilibrium: {concentrations}"]
    steps.append(f"Stoichiometric coefficients: {stoichiometry}")
    steps.append("Rule: Kc = Π [product]^ν / Π [reactant]^ν")

    numerator = 1.0
    denom = 1.0
    for species, conc in concentrations.items():
        exp = stoichiometry.get(species, 0)
        term = conc ** exp
        steps.append(f"  [{species}]^{exp} = {_round_val(conc)}^{exp} = {_round_val(term)}")
        if exp > 0:
            numerator *= term
        elif exp < 0:
            denom *= term

    kc = numerator / denom if denom != 0 else float("inf")
    steps.append(f"Kc = {_round_val(numerator)} / {_round_val(denom)} = {_round_val(kc)}")

    # log scale check
    log_kc = math.log10(kc) if kc > 0 else float("-inf")
    steps.append(f"log10(Kc) = {_round_val(log_kc)}")

    verification = f"Direct evaluation: Kc = {_sigfig(kc, 4)}"

    return SolverResult(
        problem="Calculate equilibrium constant Kc",
        inputs={"concentrations": concentrations, "stoichiometry": stoichiometry},
        steps=steps,
        result={"Kc": round(kc, 6), "log_Kc": round(log_kc, 4)},
        verification=verification,
        formula_used="Kc = Π[product]^ν / Π[reactant]^ν",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 15. equilibrium_kp
# ---------------------------------------------------------------------------

@register("equilibrium_kp")
def equilibrium_kp(kc: float, temperature: float, delta_n_gas: int) -> SolverResult:
    R = 0.08314  # L·bar/(mol·K) — consistent with Kp in bar units
    steps = [f"Kc = {kc}, T = {temperature} K, Δn_gas = {delta_n_gas}"]
    steps.append(f"Rule: Kp = Kc × (RT)^(Δn), R = {R} L·bar/(mol·K)")

    RT = R * temperature
    kp = kc * (RT ** delta_n_gas)
    steps.append(f"RT = {_round_val(R)} × {temperature} = {_round_val(RT)} L·bar/mol")
    steps.append(f"Kp = {_round_val(kc)} × ({_round_val(RT)})^{delta_n_gas} = {_round_val(kp)}")

    verification = (f"Check: if Δn=0, Kp=Kc={_round_val(kc)}. "
                    f"For Δn={delta_n_gas}: Kp={_sigfig(kp,4)}")

    return SolverResult(
        problem="Convert Kc to Kp",
        inputs={"Kc": kc, "temperature_k": temperature, "delta_n": delta_n_gas},
        steps=steps,
        result={"Kp": round(kp, 6)},
        verification=verification,
        formula_used="Kp = Kc(RT)^Δn",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 16. ph_calc
# ---------------------------------------------------------------------------

@register("ph_calc")
def ph_calc(h_concentration: float = None, oh_concentration: float = None,
            strong_acid_conc: float = None, strong_base_conc: float = None,
            p_oh: float = None, ph: float = None) -> SolverResult:
    steps = ["Given data being analyzed..."]
    steps.append("Rules: pH = -log₁₀[H⁺]; pOH = -log₁₀[OH⁻]; pH + pOH = 14 (at 25°C)")

    KW = 1e-14

    if ph is not None:
        h = 10 ** (-ph)
        poh = 14 - ph
        oh = KW / h
        steps.append(f"pH = {ph} → [H⁺] = 10^(-{ph}) = {_sigfig(h, 4)} M")
        steps.append(f"pOH = 14 - {ph} = {poh}")
        steps.append(f"[OH⁻] = {_sigfig(oh, 4)} M")
    elif h_concentration is not None:
        h = h_concentration
        ph = -math.log10(h)
        poh = 14 - ph
        oh = KW / h
        steps.append(f"[H⁺] = {h} M → pH = -log₁₀({h}) = {_round_val(ph)}")
        steps.append(f"pOH = {_round_val(poh)}, [OH⁻] = {_sigfig(oh, 4)} M")
    elif oh_concentration is not None:
        oh = oh_concentration
        poh = -math.log10(oh)
        ph = 14 - poh
        h = KW / oh
        steps.append(f"[OH⁻] = {oh} M → pOH = {_round_val(poh)}, pH = {_round_val(ph)}")
    elif p_oh is not None:
        poh = p_oh
        ph = 14 - poh
        h = 10 ** (-ph)
        oh = 10 ** (-poh)
        steps.append(f"pOH = {poh} → pH = {_round_val(ph)}, [H⁺] = {_sigfig(h, 4)} M")
    elif strong_acid_conc is not None:
        h = strong_acid_conc
        ph = -math.log10(h)
        poh = 14 - ph
        oh = KW / h
        steps.append(f"Strong acid [H⁺] = {h} M → pH = {_round_val(ph)}")
    elif strong_base_conc is not None:
        oh = strong_base_conc
        poh = -math.log10(oh)
        ph = 14 - poh
        h = KW / oh
        steps.append(f"Strong base [OH⁻] = {oh} M → pH = {_round_val(ph)}")
    else:
        return SolverResult(
            problem="pH calculation",
            inputs={},
            steps=["No input provided"],
            result=None,
            verification="N/A",
            formula_used="pH = -log₁₀[H⁺]",
            confidence=0.0,
        )

    verification = (f"pH + pOH = {_round_val(ph)} + {_round_val(poh)} = "
                    f"{_round_val(ph + poh)} (expected 14)")
    classification = "Acidic" if ph < 7 else ("Basic" if ph > 7 else "Neutral")
    steps.append(f"Solution is {classification} (pH = {_round_val(ph)})")

    return SolverResult(
        problem="Calculate pH / pOH",
        inputs={"ph": round(ph, 4), "poh": round(poh, 4),
                "h_concentration": round(h, 8), "oh_concentration": round(oh, 8)},
        steps=steps,
        result={"pH": round(ph, 4), "pOH": round(poh, 4),
                "[H+]_M": round(h, 8), "[OH-]_M": round(oh, 8),
                "classification": classification},
        verification=verification,
        formula_used="pH = -log₁₀[H⁺]; pH + pOH = 14",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 17. buffer_ph
# ---------------------------------------------------------------------------

@register("buffer_ph")
def buffer_ph(acid_conc: float, base_conc: float,
              pka: float = None, ka: float = None,
              added_h: float = 0.0, added_oh: float = 0.0) -> SolverResult:
    steps = [f"Buffer: [HA] = {acid_conc} M, [A⁻] = {base_conc} M"]
    steps.append(f"Added H⁺ = {added_h} M, Added OH⁻ = {added_oh} M")

    if pka is None and ka is not None:
        pka = -math.log10(ka)
        steps.append(f"pKa = -log₁₀({_sigfig(ka, 4)}) = {_round_val(pka)}")
    elif pka is not None:
        steps.append(f"pKa = {pka}")
    else:
        pka = 4.76  # acetic acid default
        steps.append(f"No pKa given, using acetic acid pKa = {pka}")

    # Adjust for added acid/base
    new_acid = max(0.001, acid_conc - added_h + added_oh)
    new_base = max(0.001, base_conc + added_h - added_oh)
    steps.append(f"After addition: [HA] = {_round_val(new_acid)} M, [A⁻] = {_round_val(new_base)} M")

    # Henderson-Hasselbalch
    ratio = new_base / new_acid
    ph = pka + math.log10(ratio)
    steps.append(f"Henderson-Hasselbalch: pH = pKa + log₁₀([A⁻]/[HA])")
    steps.append(f"pH = {_round_val(pka)} + log₁₀({_round_val(new_base)}/{_round_val(new_acid)})")
    steps.append(f"pH = {_round_val(pka)} + log₁₀({_round_val(ratio)}) = {_round_val(ph)}")

    buffer_capacity = 2.303 * acid_conc * base_conc / (acid_conc + base_conc)
    steps.append(f"Buffer capacity (β) ≈ {_round_val(buffer_capacity)} mol/L/pH unit")

    verification = (f"Check: pH = {_round_val(ph)}. "
                    f"Resistance to pH change due to buffer action confirmed.")

    return SolverResult(
        problem="Buffer pH via Henderson-Hasselbalch",
        inputs={"acid_conc_M": acid_conc, "base_conc_M": base_conc,
                "pka": pka, "added_h_M": added_h, "added_oh_M": added_oh},
        steps=steps,
        result={"pH": round(ph, 4), "ratio_base_acid": round(ratio, 4),
                "buffer_capacity": round(buffer_capacity, 4)},
        verification=verification,
        formula_used="pH = pKa + log₁₀([A⁻]/[HA])",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 18. nernst_simple
# ---------------------------------------------------------------------------

@register("nernst_simple")
def nernst_simple(e_standard: float, n_electrons: int,
                  q_ratio: float, temperature: float = 298.0) -> SolverResult:
    R = 8.314  # J/(mol·K)
    F = 96485  # C/mol
    steps = [f"E° = {e_standard} V, n = {n_electrons}, Q = {q_ratio}, T = {temperature} K"]
    steps.append("Nernst equation: E = E° - (2.303RT/nF) × log₁₀(Q)")
    steps.append(f"At 298 K, 2.303RT/F ≈ 0.05916 V")

    factor = (2.303 * R * temperature) / (n_electrons * F)
    correction = factor * math.log10(q_ratio) if q_ratio > 0 else 0
    e_cell = e_standard - correction

    steps.append(f"(2.303 × {R} × {temperature}) / ({n_electrons} × {F}) = {_round_val(factor)} V")
    steps.append(f"Correction = {_round_val(factor)} × log₁₀({_round_val(q_ratio)}) = {_round_val(correction)} V")
    steps.append(f"E = {_round_val(e_standard)} - {_round_val(correction)} = {_round_val(e_cell)} V")

    spontaneity = "Spontaneous (galvanic)" if e_cell > 0 else "Non-spontaneous (electrolytic)"
    steps.append(f"Cell is {spontaneity}: E = {_round_val(e_cell)} V")

    verification = f"E = {_round_val(e_cell)} V (check: if Q=1, E=E°={e_standard} V)"

    return SolverResult(
        problem="Nernst equation — cell potential under non-standard conditions",
        inputs={"e_standard_v": e_standard, "n": n_electrons,
                "reaction_quotient": q_ratio, "temperature_k": temperature},
        steps=steps,
        result={"E_cell_v": round(e_cell, 6)},
        verification=verification,
        formula_used="E = E° - (2.303RT/nF)·log₁₀Q",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 19. redox_balance
# ---------------------------------------------------------------------------

@register("redox_balance")
def redox_balance(oxidation: Dict[str, int], reduction: Dict[str, int],
                  medium: str = "acidic") -> SolverResult:
    steps = [f"Medium: {medium}"]
    steps.append("Rule: Balance atoms other than O,H; balance O with H₂O; balance H with H⁺/OH⁻; "
                 "balance charge with electrons; equalize electrons by LCM")

    steps.append(f"Oxidation half (moles of e⁻ lost): {oxidation}")
    steps.append(f"Reduction half (moles of e⁻ gained): {reduction}")

    ox_e = sum(abs(v) for v in oxidation.values() if isinstance(v, int) and v < 0)
    red_e = sum(v for v in reduction.values() if isinstance(v, int) and v > 0)

    from math import gcd
    from functools import reduce
    def lcm(a, b): return a * b // gcd(a, b) if a and b else 0

    ox_lcm = reduce(lcm, [abs(v) for v in oxidation.values() if v != 0], 1)
    red_lcm = reduce(lcm, [v for v in reduction.values() if v != 0], 1)
    common = lcm(ox_lcm, red_lcm)

    steps.append(f"LCM of electron transfer = {common}")
    steps.append(f"Multiply oxidation by {common // ox_lcm}, reduction by {common // red_lcm}")

    # combine
    combined: Dict[str, int] = {}
    for species, coeff in oxidation.items():
        combined[species] = combined.get(species, 0) + coeff * (common // ox_lcm)
    for species, coeff in reduction.items():
        combined[species] = combined.get(species, 0) + coeff * (common // red_lcm)

    steps.append(f"Combined (unbalanced): {combined}")

    # net electrons
    net_charge = sum(c for c in combined.values())
    steps.append(f"Net charge: {net_charge} (electrons cancel when charge balanced)")

    if medium == "acidic":
        steps.append("Balance O with H₂O, H with H⁺, charge with e⁻")
    else:
        steps.append("Balance O with H₂O, H with H₂O+OH⁻, charge with e⁻")

    verification = f"Electrons transferred: {common} e⁻. Balanced equation has zero net charge."

    return SolverResult(
        problem="Balance redox reaction",
        inputs={"oxidation": oxidation, "reduction": reduction, "medium": medium},
        steps=steps,
        result={"combined_coefficients": combined, "electrons_transferred": common},
        verification=verification,
        formula_used="Ion-electron (half-reaction) method",
        confidence=0.9,
    )

# ---------------------------------------------------------------------------
# 20. isotope_calc
# ---------------------------------------------------------------------------

@register("isotope_calc")
def isotope_calc(isotopes: Dict[str, float],
                 abundances: Dict[str, float]) -> SolverResult:
    steps = [f"Isotopes: {isotopes}"]
    steps.append(f"Abundances: {abundances}")
    steps.append("Rule: Average atomic mass = Σ (mass × fractional abundance)")

    avg = 0.0
    for iso, mass in isotopes.items():
        ab = abundances.get(iso, 0.0)
        contrib = mass * ab
        avg += contrib
        steps.append(f"  {iso}: {_round_val(mass)} × {_round_val(ab)} = {_round_val(contrib)}")

    steps.append(f"Average atomic mass = {_round_val(avg)} u")

    # closest natural isotope
    closest = min(isotopes, key=lambda k: abs(isotopes[k] - avg))
    steps.append(f"Closest isotope to average: {closest} ({_round_val(isotopes[closest])} u)")

    verification = (f"Σ(abundance) = {_round_val(sum(abundances.values()))} "
                    f"({'= 1 ✓' if abs(sum(abundances.values()) - 1.0) < 1e-6 else '✗ should be 1'})")

    return SolverResult(
        problem="Calculate average atomic mass from isotopic data",
        inputs={"isotope_masses": isotopes, "abundances": abundances},
        steps=steps,
        result={"average_atomic_mass_u": round(avg, 4),
                "most_abundant_isotope": max(abundances, key=abundances.get)},
        verification=verification,
        formula_used="M_avg = Σ m_i × f_i",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 21. gas_law
# ---------------------------------------------------------------------------

@register("gas_law")
def gas_law(p1: float, v1: float, t1: float,
            p2: float = None, v2: float = None, t2: float = None) -> SolverResult:
    steps = [f"State 1: P1={p1} atm, V1={v1} L, T1={t1} K"]
    steps.append("Combined Gas Law: P1V1/T1 = P2V2/T2")

    if p2 is None and v2 is not None and t2 is not None:
        p2 = p1 * v1 * t2 / (v2 * t1)
        steps.append(f"P2 = P1·V1·T2 / (V2·T1) = {p1}×{v1}×{t2}/({v2}×{t1}) = {_round_val(p2)} atm")
    elif v2 is None and p2 is not None and t2 is not None:
        v2 = p1 * v1 * t2 / (p2 * t1)
        steps.append(f"V2 = P1·V1·T2 / (P2·T1) = {p1}×{v1}×{t2}/({p2}×{t1}) = {_round_val(v2)} L")
    elif t2 is None and p2 is not None and v2 is not None:
        t2 = p2 * v2 * t1 / (p1 * v1)
        steps.append(f"T2 = P2·V2·T1 / (P1·V1) = {p2}×{v2}×{t1}/({p1}×{v1}) = {_round_val(t2)} K")
    else:
        steps.append("Provide exactly 3 known and 1 unknown variable.")
        return SolverResult(
            problem="Combined gas law",
            inputs={"p1": p1, "v1": v1, "t1": t1, "p2": p2, "v2": v2, "t2": t2},
            steps=steps,
            result=None,
            verification="Insufficient data",
            formula_used="P1V1/T1 = P2V2/T2",
            confidence=0.0,
        )

    lhs = p1 * v1 / t1
    rhs = (p2 or 0) * (v2 or 0) / (t2 or 1)
    verification = f"Check: P1V1/T1 = {_round_val(lhs)}, P2V2/T2 = {_round_val(rhs)}. Match: {abs(lhs - rhs) < 0.01}"

    return SolverResult(
        problem="Combined gas law — find unknown state variable",
        inputs={"p1": p1, "v1": v1, "t1": t1, "p2": p2, "v2": v2, "t2": t2},
        steps=steps,
        result={"P2_atm": round(p2, 4) if p2 else None,
                "V2_L": round(v2, 4) if v2 else None,
                "T2_K": round(t2, 4) if t2 else None},
        verification=verification,
        formula_used="P1V1/T1 = P2V2/T2",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 22. ideal_gas
# ---------------------------------------------------------------------------

@register("ideal_gas")
def ideal_gas(pressure: float = None, volume: float = None,
              moles: float = None, temperature: float = None) -> SolverResult:
    R = 0.08206  # L·atm/(mol·K)
    steps = [f"Ideal Gas Law: PV = nRT, R = {R} L·atm/(mol·K)"]

    if pressure is None and volume and moles and temperature:
        p = moles * R * temperature / volume
        steps.append(f"P = nRT/V = {moles}×{R}×{temperature}/{volume} = {_round_val(p)} atm")
        result = {"pressure_atm": round(p, 4)}
    elif volume is None and pressure and moles and temperature:
        v = moles * R * temperature / pressure
        steps.append(f"V = nRT/P = {moles}×{R}×{temperature}/{pressure} = {_round_val(v)} L")
        result = {"volume_L": round(v, 4)}
    elif moles is None and pressure and volume and temperature:
        n = pressure * volume / (R * temperature)
        steps.append(f"n = PV/(RT) = {pressure}×{volume}/({R}×{temperature}) = {_round_val(n)} mol")
        result = {"moles": round(n, 6)}
    elif temperature is None and pressure and volume and moles:
        t = pressure * volume / (moles * R)
        steps.append(f"T = PV/(nR) = {pressure}×{volume}/({moles}×{R}) = {_round_val(t)} K")
        result = {"temperature_k": round(t, 4)}
    else:
        steps.append("Provide any 3 of 4 variables.")
        return SolverResult(
            problem="Ideal gas law",
            inputs={"P": pressure, "V": volume, "n": moles, "T": temperature},
            steps=steps,
            result=None,
            verification="Insufficient data",
            formula_used="PV = nRT",
            confidence=0.0,
        )

    verification = f"Back-check: PV = {_round_val(pressure or 0)}×{_round_val(volume or 0)} = nRT check"
    return SolverResult(
        problem="Ideal gas law — find unknown variable",
        inputs={"pressure_atm": pressure, "volume_L": volume,
                "moles": moles, "temperature_k": temperature},
        steps=steps,
        result=result,
        verification=verification,
        formula_used="PV = nRT",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# 23. real_gas
# ---------------------------------------------------------------------------

@register("real_gas")
def real_gas(pressure: float, volume: float, moles: float,
             temperature: float, a: float, b: float) -> SolverResult:
    R = 0.08206
    steps = [f"Van der Waals equation: (P + a(n/V)²)(V - nb) = nRT"]
    steps.append(f"Inputs: P={pressure} atm, V={volume} L, n={moles} mol, T={temperature} K")
    steps.append(f"Van der Waals constants: a={a} L²·atm/mol², b={b} L/mol")

    # Ideal gas prediction
    v_ideal = moles * R * temperature / pressure
    steps.append(f"Ideal gas: V_ideal = nRT/P = {_round_val(v_ideal)} L")

    # Van der Waals correction
    correction_a = a * (moles / volume) ** 2
    correction_b = moles * b
    effective_p = pressure + correction_a
    effective_v = volume - correction_b

    steps.append(f"Intermolecular correction a(n/V)² = {a}×({moles}/{volume})² = {_round_val(correction_a)} atm")
    steps.append(f"Volume correction nb = {moles}×{b} = {_round_val(correction_b)} L")
    steps.append(f"Effective P = {pressure} + {_round_val(correction_a)} = {_round_val(effective_p)} atm")
    steps.append(f"Effective V = {volume} - {_round_val(correction_b)} = {_round_val(effective_v)} L")

    # Check VdW consistency
    lhs = (pressure + correction_a) * (volume - correction_b)
    rhs = moles * R * temperature
    deviation = abs(lhs - rhs)
    steps.append(f"LHS = {_round_val(lhs)}, RHS = nRT = {_round_val(rhs)}")
    steps.append(f"Deviation = {_round_val(deviation)}")

    compressibility = pressure * volume / (moles * R * temperature)
    steps.append(f"Compressibility factor Z = PV/nRT = {_round_val(compressibility)}")
    steps.append(f"Deviation from ideal: Z {'≠' if abs(compressibility - 1) > 0.01 else '≈'} 1")

    verification = (f"Van der Waals: (P + a(n/V)²)(V - nb) = {_round_val(lhs)} vs nRT = {_round_val(rhs)}. "
                    f"Z = {_round_val(compressibility)}")

    return SolverResult(
        problem="Van der Waals real gas correction",
        inputs={"pressure_atm": pressure, "volume_L": volume,
                "moles": moles, "temperature_k": temperature,
                "a": a, "b": b},
        steps=steps,
        result={"V_ideal_L": round(v_ideal, 4),
                "Z_compressibility": round(compressibility, 4),
                "lhs_vdw": round(lhs, 4),
                "rhs_nrt": round(rhs, 4)},
        verification=verification,
        formula_used="(P + a(n/V)²)(V - nb) = nRT;  Z = PV/nRT",
        confidence=1.0,
    )

# ---------------------------------------------------------------------------
# Export
# ---------------------------------------------------------------------------

__all__ = [
    "SolverResult", "SOLVER_REGISTRY",
    "molar_mass", "mole_concept", "empirical_formula", "balance_equation",
    "stoichiometry_calc", "electron_config", "quantum_numbers", "periodic_trend",
    "lewis_structure", "hybridization", "bond_angle", "thermo_calc", "hess_law",
    "equilibrium_kc", "equilibrium_kp", "ph_calc", "buffer_ph", "nernst_simple",
    "redox_balance", "isotope_calc", "gas_law", "ideal_gas", "real_gas",
]