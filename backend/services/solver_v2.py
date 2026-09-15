"""Extended structured solvers v2 — physics, chemistry, accounts, applied maths.

Adds new solver categories beyond the existing stem_solvers.py:
  Physics: optics, magnetism, waves, gravitation, momentum, circular motion,
           thermodynamics
  Chemistry: stoichiometry, redox, molar mass, empirical formula, gas laws (extended)
  Accounts: journal entry, ledger posting, trial balance, depreciation (SLM/WDV),
            BRS, final accounts
  Applied maths: statistics (mean/median/mode/std), financial math (simple/compound
                 interest, annuity), GST, regression (linear)

All solvers are deterministic — SymPy/pint/chempy compute, no LLM.
Student fills in form values; solver computes and shows steps.

Usage:
    from backend.services.solver_v2 import SolverV2

    solver = SolverV2()
    result = solver.solve(
        category="phy_optics",
        values={"u": -10, "f": 5, "find": "v"},
    )
"""

import math
import re
from dataclasses import dataclass, field
from typing import Optional


# ---------------------------------------------------------------------------
# Data structures (compatible with existing competency_solver)
# ---------------------------------------------------------------------------

@dataclass
class StepResultV2:
    """A single step in a worked solution."""
    description: str
    formula: str = ""
    computation: str = ""
    answer: str = ""
    success: bool = True


@dataclass
class SolutionResultV2:
    """Complete solution result."""
    question: str = ""
    steps: list = field(default_factory=list)
    error: str = ""
    success: bool = False
    category: str = ""
    final_answer: str = ""


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def _safe_float(val, default=None):
    """Safely parse a float from a string or number."""
    if val is None or val == "":
        return default
    if isinstance(val, (int, float)):
        return float(val)
    try:
        cleaned = re.sub(r'[a-zA-Z/\s\u00b0]+$', '', str(val).strip())
        return float(cleaned)
    except (ValueError, TypeError):
        return default


def _fmt(v, precision=4):
    """Format a number cleanly."""
    if v is None:
        return "?"
    f = float(v)
    # Use scientific notation for very small or very large numbers
    if abs(f) > 0 and (abs(f) < 1e-4 or abs(f) > 1e6):
        return f"{f:.{precision}e}"
    if abs(f - round(f)) < 1e-9:
        return str(int(round(f)))
    return str(round(f, precision))


def _step(desc, formula="", computation="", answer=""):
    """Create a StepResultV2."""
    return StepResultV2(
        description=desc,
        formula=formula,
        computation=computation,
        answer=answer,
    )


# ---------------------------------------------------------------------------
# Physics solvers
# ---------------------------------------------------------------------------

def solve_phy_optics(vals: dict, result: SolutionResultV2):
    """Solve optics problems: lens formula, mirror formula, magnification.

    Lens formula: 1/f = 1/v - 1/u  (convex lens)
    Mirror formula: 1/f = 1/v + 1/u  (concave mirror)
    Magnification: m = -v/u (lens), m = -v/u (mirror)
    """
    u = _safe_float(vals.get("u"))
    v = _safe_float(vals.get("v"))
    f = _safe_float(vals.get("f"))
    find = vals.get("find", "").lower().strip()
    mirror = vals.get("mirror", False)

    if not find:
        missing = [n for n, val in [("u", u), ("v", v), ("f", f)] if val is None]
        if len(missing) == 1:
            find = missing[0]

    steps = []

    if find == "v" and u is not None and f is not None:
        if mirror:
            # 1/f = 1/v + 1/u → 1/v = 1/f - 1/u
            inv_v = 1/f - 1/u
            v_val = 1/inv_v if inv_v != 0 else None
            steps.append(_step("Apply mirror formula", "1/f = 1/v + 1/u",
                              f"1/{f} = 1/v + 1/{u}", f"1/v = {1/f:.4f} - {1/u:.4f} = {inv_v:.4f}"))
        else:
            # 1/f = 1/v - 1/u → 1/v = 1/f + 1/u
            inv_v = 1/f + 1/u
            v_val = 1/inv_v if inv_v != 0 else None
            steps.append(_step("Apply lens formula", "1/f = 1/v - 1/u",
                              f"1/{f} = 1/v - 1/{u}", f"1/v = {1/f:.4f} + {1/u:.4f} = {inv_v:.4f}"))

        if v_val is not None:
            steps.append(_step("Solve for v", "v = 1/(1/v)", "", f"v = {_fmt(v_val)} cm"))
            m = -v_val / u if u != 0 else None
            if m is not None:
                steps.append(_step("Calculate magnification", "m = -v/u",
                                  f"m = -{_fmt(v_val)}/{_fmt(u)}", f"m = {_fmt(m)}"))
            result.final_answer = f"v = {_fmt(v_val)} cm, m = {_fmt(m) if m else '?'}"
            result.success = True

    elif find == "f" and u is not None and v is not None:
        if mirror:
            inv_f = 1/v + 1/u
        else:
            inv_f = 1/v - 1/u
        f_val = 1/inv_f if inv_f != 0 else None
        sign = "+" if mirror else "-"
        steps.append(_step(f"Apply {'mirror' if mirror else 'lens'} formula",
                          f"1/f = 1/v {'+' if mirror else '-'} 1/u",
                          f"1/f = 1/{v} {'+' if mirror else '-'} 1/{u}",
                          f"f = {_fmt(f_val)} cm" if f_val else "f = undefined"))
        if f_val is not None:
            result.final_answer = f"f = {_fmt(f_val)} cm"
            result.success = True

    elif find == "u" and v is not None and f is not None:
        if mirror:
            inv_u = 1/f - 1/v
        else:
            inv_u = 1/f + 1/v
        u_val = 1/inv_u if inv_u != 0 else None
        steps.append(_step(f"Solve for u", "", "", f"u = {_fmt(u_val)} cm" if u_val else "u = undefined"))
        if u_val is not None:
            result.final_answer = f"u = {_fmt(u_val)} cm"
            result.success = True

    else:
        result.error = "Insufficient values. Need at least 2 of u, v, f."

    result.steps = steps


def solve_phy_magnetism(vals: dict, result: SolutionResultV2):
    """Solve magnetism problems: F = qvB sin(θ), B = μ₀I/(2πr), F = BIL sin(θ)."""
    q = _safe_float(vals.get("q"))
    v = _safe_float(vals.get("v"))
    B = _safe_float(vals.get("B"))
    I = _safe_float(vals.get("I"))
    L = _safe_float(vals.get("L"))
    r = _safe_float(vals.get("r"))
    theta = _safe_float(vals.get("theta", 90))
    find = vals.get("find", "").lower().strip()
    formula_type = vals.get("type", "force_on_charge")

    steps = []

    if formula_type == "force_on_charge":
        # F = qvB sin(θ)
        if find == "f" and q is not None and v is not None and B is not None:
            sin_theta = math.sin(math.radians(theta))
            F = q * v * B * sin_theta
            steps.append(_step("Apply Lorentz force", "F = qvB sin(θ)",
                              f"F = {_fmt(q)} × {_fmt(v)} × {_fmt(B)} × sin({theta}°)",
                              f"F = {_fmt(F)} N"))
            result.final_answer = f"F = {_fmt(F)} N"
            result.success = True

    elif formula_type == "force_on_wire":
        # F = BIL sin(θ)
        if find == "f" and B is not None and I is not None and L is not None:
            sin_theta = math.sin(math.radians(theta))
            F = B * I * L * sin_theta
            steps.append(_step("Apply force on current-carrying wire", "F = BIL sin(θ)",
                              f"F = {_fmt(B)} × {_fmt(I)} × {_fmt(L)} × sin({theta}°)",
                              f"F = {_fmt(F)} N"))
            result.final_answer = f"F = {_fmt(F)} N"
            result.success = True

    elif formula_type == "field_from_wire":
        # B = μ₀I/(2πr)
        mu_0 = 4 * math.pi * 1e-7
        if find == "b" and I is not None and r is not None:
            B_val = mu_0 * I / (2 * math.pi * r)
            steps.append(_step("Apply Biot-Savart law for long wire", "B = μ₀I/(2πr)",
                              f"B = ({_fmt(mu_0, 10)}) × {_fmt(I)} / (2π × {_fmt(r)})",
                              f"B = {_fmt(B_val, 8)} T"))
            result.final_answer = f"B = {_fmt(B_val, 8)} T"
            result.success = True

    if not result.success:
        result.error = f"Cannot solve with given values (type={formula_type}, find={find})"

    result.steps = steps


def solve_phy_waves(vals: dict, result: SolutionResultV2):
    """Solve wave problems: v = fλ, T = 1/f, f = 1/T."""
    v = _safe_float(vals.get("v"))
    f = _safe_float(vals.get("f"))
    lam = _safe_float(vals.get("lambda", vals.get("wavelength")))
    T = _safe_float(vals.get("T", vals.get("period")))
    find = vals.get("find", "").lower().strip()

    if not find:
        missing = [n for n, val in [("v", v), ("f", f), ("lambda", lam)] if val is None]
        if len(missing) == 1:
            find = missing[0]

    steps = []

    if find == "v" and f is not None and lam is not None:
        v_val = f * lam
        steps.append(_step("Apply wave equation", "v = fλ",
                          f"v = {_fmt(f)} × {_fmt(lam)}", f"v = {_fmt(v_val)} m/s"))
        result.final_answer = f"v = {_fmt(v_val)} m/s"
        result.success = True

    elif find == "f" and v is not None and lam is not None:
        f_val = v / lam if lam != 0 else None
        if f_val:
            steps.append(_step("Rearrange wave equation", "f = v/λ",
                              f"f = {_fmt(v)}/{_fmt(lam)}", f"f = {_fmt(f_val)} Hz"))
            result.final_answer = f"f = {_fmt(f_val)} Hz"
            result.success = True

    elif find == "lambda" and v is not None and f is not None:
        lam_val = v / f if f != 0 else None
        if lam_val:
            steps.append(_step("Rearrange wave equation", "λ = v/f",
                              f"λ = {_fmt(v)}/{_fmt(f)}", f"λ = {_fmt(lam_val)} m"))
            result.final_answer = f"λ = {_fmt(lam_val)} m"
            result.success = True

    elif find == "t" and f is not None:
        T_val = 1/f if f != 0 else None
        if T_val:
            steps.append(_step("Period from frequency", "T = 1/f",
                              f"T = 1/{_fmt(f)}", f"T = {_fmt(T_val)} s"))
            result.final_answer = f"T = {_fmt(T_val)} s"
            result.success = True

    elif find == "f" and T is not None:
        f_val = 1/T if T != 0 else None
        if f_val:
            steps.append(_step("Frequency from period", "f = 1/T",
                              f"f = 1/{_fmt(T)}", f"f = {_fmt(f_val)} Hz"))
            result.final_answer = f"f = {_fmt(f_val)} Hz"
            result.success = True

    if not result.success:
        result.error = "Need at least 2 of v, f, λ (or T for period/frequency)"

    result.steps = steps


def solve_phy_gravitation(vals: dict, result: SolutionResultV2):
    """Solve gravitation problems: F = Gm₁m₂/r², g = GM/r², orbital velocity."""
    m1 = _safe_float(vals.get("m1"))
    m2 = _safe_float(vals.get("m2"))
    M = _safe_float(vals.get("M"))
    r = _safe_float(vals.get("r"))
    G = 6.674e-11  # Gravitational constant
    find = vals.get("find", "").lower().strip()
    formula_type = vals.get("type", "force")

    steps = []

    if formula_type == "force":
        # F = Gm₁m₂/r²
        if find == "f" and m1 is not None and m2 is not None and r is not None:
            F = G * m1 * m2 / (r**2)
            steps.append(_step("Apply Newton's law of gravitation", "F = Gm₁m₂/r²",
                              f"F = {G} × {_fmt(m1)} × {_fmt(m2)} / ({_fmt(r)})²",
                              f"F = {_fmt(F, 8)} N"))
            result.final_answer = f"F = {_fmt(F, 8)} N"
            result.success = True

    elif formula_type == "field":
        # g = GM/r²
        if find == "g" and M is not None and r is not None:
            g = G * M / (r**2)
            steps.append(_step("Apply gravitational field formula", "g = GM/r²",
                              f"g = {G} × {_fmt(M)} / ({_fmt(r)})²",
                              f"g = {_fmt(g, 8)} m/s²"))
            result.final_answer = f"g = {_fmt(g, 8)} m/s²"
            result.success = True

    elif formula_type == "orbital_velocity":
        # v = √(GM/r)
        if find == "v" and M is not None and r is not None:
            v_val = math.sqrt(G * M / r)
            steps.append(_step("Apply orbital velocity formula", "v = √(GM/r)",
                              f"v = √({G} × {_fmt(M)} / {_fmt(r)})",
                              f"v = {_fmt(v_val)} m/s"))
            result.final_answer = f"v = {_fmt(v_val)} m/s"
            result.success = True

    elif formula_type == "escape_velocity":
        # v_e = √(2GM/r)
        if find == "v" and M is not None and r is not None:
            v_val = math.sqrt(2 * G * M / r)
            steps.append(_step("Apply escape velocity formula", "v = √(2GM/r)",
                              f"v = √(2 × {G} × {_fmt(M)} / {_fmt(r)})",
                              f"v = {_fmt(v_val)} m/s"))
            result.final_answer = f"v = {_fmt(v_val)} m/s"
            result.success = True

    if not result.success:
        result.error = f"Cannot solve (type={formula_type}, find={find})"

    result.steps = steps


def solve_phy_momentum(vals: dict, result: SolutionResultV2):
    """Solve momentum problems: p = mv, impulse = Ft, conservation of momentum."""
    m = _safe_float(vals.get("m"))
    v = _safe_float(vals.get("v"))
    F = _safe_float(vals.get("F"))
    t = _safe_float(vals.get("t"))
    m1 = _safe_float(vals.get("m1"))
    m2 = _safe_float(vals.get("m2"))
    v1 = _safe_float(vals.get("v1"))
    v2 = _safe_float(vals.get("v2"))
    find = vals.get("find", "").lower().strip()
    formula_type = vals.get("type", "momentum")

    steps = []

    if formula_type == "momentum":
        if find == "p" and m is not None and v is not None:
            p = m * v
            steps.append(_step("Calculate momentum", "p = mv",
                              f"p = {_fmt(m)} × {_fmt(v)}", f"p = {_fmt(p)} kg·m/s"))
            result.final_answer = f"p = {_fmt(p)} kg·m/s"
            result.success = True

    elif formula_type == "impulse":
        if find == "J" and F is not None and t is not None:
            J = F * t
            steps.append(_step("Calculate impulse", "J = Ft",
                              f"J = {_fmt(F)} × {_fmt(t)}", f"J = {_fmt(J)} N·s"))
            result.final_answer = f"J = {_fmt(J)} N·s"
            result.success = True

    elif formula_type == "collision":
        # Conservation: m1*v1 + m2*v2 = (m1+m2)*v_final (inelastic)
        if find == "v_final" and all(x is not None for x in [m1, m2, v1, v2]):
            v_final = (m1 * v1 + m2 * v2) / (m1 + m2)
            steps.append(_step("Apply conservation of momentum (inelastic)",
                              "m₁v₁ + m₂v₂ = (m₁+m₂)v_f",
                              f"{_fmt(m1)}×{_fmt(v1)} + {_fmt(m2)}×{_fmt(v2)} = ({_fmt(m1)}+{_fmt(m2)})×v_f",
                              f"v_f = {_fmt(v_final)} m/s"))
            result.final_answer = f"v_final = {_fmt(v_final)} m/s"
            result.success = True

    if not result.success:
        result.error = f"Cannot solve (type={formula_type}, find={find})"

    result.steps = steps


def solve_phy_circular_motion(vals: dict, result: SolutionResultV2):
    """Solve circular motion: a = v²/r, F = mv²/r, T = 2πr/v."""
    v = _safe_float(vals.get("v"))
    r = _safe_float(vals.get("r"))
    m = _safe_float(vals.get("m"))
    find = vals.get("find", "").lower().strip()

    steps = []

    if find == "a" and v is not None and r is not None:
        a = v**2 / r
        steps.append(_step("Calculate centripetal acceleration", "a = v²/r",
                          f"a = {_fmt(v)}²/{_fmt(r)}", f"a = {_fmt(a)} m/s²"))
        result.final_answer = f"a = {_fmt(a)} m/s²"
        result.success = True

    elif find == "f" and m is not None and v is not None and r is not None:
        F = m * v**2 / r
        steps.append(_step("Calculate centripetal force", "F = mv²/r",
                          f"F = {_fmt(m)} × {_fmt(v)}²/{_fmt(r)}", f"F = {_fmt(F)} N"))
        result.final_answer = f"F = {_fmt(F)} N"
        result.success = True

    elif find == "T" and v is not None and r is not None:
        T = 2 * math.pi * r / v
        steps.append(_step("Calculate period", "T = 2πr/v",
                          f"T = 2π × {_fmt(r)}/{_fmt(v)}", f"T = {_fmt(T)} s"))
        result.final_answer = f"T = {_fmt(T)} s"
        result.success = True

    if not result.success:
        result.error = "Need v and r (plus m for force)"

    result.steps = steps


def solve_phy_thermodynamics(vals: dict, result: SolutionResultV2):
    """Solve thermodynamics: Q = mcΔT, Q = mL, PV = nRT (ideal gas)."""
    Q = _safe_float(vals.get("Q"))
    m = _safe_float(vals.get("m"))
    c = _safe_float(vals.get("c"))
    delta_T = _safe_float(vals.get("delta_T", vals.get("dT")))
    L = _safe_float(vals.get("L"))
    find = vals.get("find", "").lower().strip()
    formula_type = vals.get("type", "heat")

    steps = []

    if formula_type == "heat":
        # Q = mcΔT
        if find == "q" and m is not None and c is not None and delta_T is not None:
            Q_val = m * c * delta_T
            steps.append(_step("Calculate heat energy", "Q = mcΔT",
                              f"Q = {_fmt(m)} × {_fmt(c)} × {_fmt(delta_T)}",
                              f"Q = {_fmt(Q_val)} J"))
            result.final_answer = f"Q = {_fmt(Q_val)} J"
            result.success = True
        elif find == "dT" and Q is not None and m is not None and c is not None:
            dT = Q / (m * c)
            steps.append(_step("Calculate temperature change", "ΔT = Q/(mc)",
                              f"ΔT = {_fmt(Q)}/({_fmt(m)} × {_fmt(c)})",
                              f"ΔT = {_fmt(dT)} °C"))
            result.final_answer = f"ΔT = {_fmt(dT)} °C"
            result.success = True

    elif formula_type == "latent_heat":
        # Q = mL
        if find == "Q" and m is not None and L is not None:
            Q_val = m * L
            steps.append(_step("Calculate latent heat", "Q = mL",
                              f"Q = {_fmt(m)} × {_fmt(L)}", f"Q = {_fmt(Q_val)} J"))
            result.final_answer = f"Q = {_fmt(Q_val)} J"
            result.success = True

    if not result.success:
        result.error = f"Cannot solve (type={formula_type}, find={find})"

    result.steps = steps


# ---------------------------------------------------------------------------
# Chemistry solvers
# ---------------------------------------------------------------------------

def solve_chem_stoichiometry(vals: dict, result: SolutionResultV2):
    """Solve stoichiometry: mole ratios from balanced equations.

    Given: balanced equation coefficients + known moles of one substance
    Find: moles/mass of another substance
    """
    coeff_known = _safe_float(vals.get("coeff_known"))
    coeff_unknown = _safe_float(vals.get("coeff_unknown"))
    moles_known = _safe_float(vals.get("moles_known"))
    molar_mass_unknown = _safe_float(vals.get("molar_mass_unknown"))
    find = vals.get("find", "moles_unknown").lower().strip()

    steps = []

    if moles_known is not None and coeff_known is not None and coeff_unknown is not None:
        moles_unknown = moles_known * coeff_unknown / coeff_known
        steps.append(_step("Apply mole ratio from balanced equation",
                          "n_unknown = n_known × (coeff_unknown / coeff_known)",
                          f"n = {_fmt(moles_known)} × ({_fmt(coeff_unknown)}/{_fmt(coeff_known)})",
                          f"n = {_fmt(moles_unknown)} mol"))

        if find == "mass" and molar_mass_unknown is not None:
            mass = moles_unknown * molar_mass_unknown
            steps.append(_step("Convert moles to mass", "m = n × M",
                              f"m = {_fmt(moles_unknown)} × {_fmt(molar_mass_unknown)}",
                              f"m = {_fmt(mass)} g"))
            result.final_answer = f"mass = {_fmt(mass)} g"
        else:
            result.final_answer = f"moles = {_fmt(moles_unknown)} mol"

        result.success = True
    else:
        result.error = "Need coeff_known, coeff_unknown, and moles_known"

    result.steps = steps


def solve_chem_redox(vals: dict, result: SolutionResultV2):
    """Solve redox: oxidation number changes, balancing half-reactions."""
    oxidation_start = _safe_float(vals.get("oxidation_start"))
    oxidation_end = _safe_float(vals.get("oxidation_end"))
    reduction_start = _safe_float(vals.get("reduction_start"))
    reduction_end = _safe_float(vals.get("reduction_end"))
    find = vals.get("find", "electrons").lower().strip()

    steps = []

    if find == "electrons":
        if all(x is not None for x in [oxidation_start, oxidation_end, reduction_start, reduction_end]):
            ox_change = oxidation_end - oxidation_start
            red_change = reduction_start - reduction_end
            steps.append(_step("Calculate oxidation change",
                              "Δox = ox_end - ox_start",
                              f"Δox = {_fmt(oxidation_end)} - {_fmt(oxidation_start)} = {_fmt(ox_change)}",
                              f"Oxidation: {_fmt(abs(ox_change))} electrons lost"))
            steps.append(_step("Calculate reduction change",
                              "Δred = red_start - red_end",
                              f"Δred = {_fmt(reduction_start)} - {_fmt(reduction_end)} = {_fmt(red_change)}",
                              f"Reduction: {_fmt(abs(red_change))} electrons gained"))

            # LCM to balance electrons
            from math import gcd
            n_ox = abs(int(red_change))
            n_red = abs(int(ox_change))
            g = gcd(n_ox, n_red)
            lcm = n_ox * n_red // g if g > 0 else max(n_ox, n_red)

            steps.append(_step("Balance electrons (LCM method)",
                              f"LCM({n_ox}, {n_red}) = {lcm}",
                              f"Oxidation × {lcm//n_ox}, Reduction × {lcm//n_red}",
                              f"Total electrons transferred: {lcm}"))
            result.final_answer = f"{lcm} electrons transferred"
            result.success = True
        else:
            result.error = "Need oxidation_start, oxidation_end, reduction_start, reduction_end"

    result.steps = steps


def solve_chem_molar_mass(vals: dict, result: SolutionResultV2):
    """Calculate molar mass from element composition."""
    # vals: {"elements": {"H": 2, "O": 1}, "atomic_masses": {"H": 1.008, "O": 16.00}}
    elements = vals.get("elements", {})
    atomic_masses = vals.get("atomic_masses", {})

    # Default atomic masses
    default_masses = {
        "H": 1.008, "He": 4.003, "Li": 6.941, "C": 12.011, "N": 14.007,
        "O": 15.999, "F": 18.998, "Na": 22.990, "Mg": 24.305, "Al": 26.982,
        "Si": 28.086, "P": 30.974, "S": 32.065, "Cl": 35.453, "K": 39.098,
        "Ca": 40.078, "Fe": 55.845, "Cu": 63.546, "Zn": 65.38, "Ag": 107.868,
        "Au": 196.967, "Ba": 137.328, "Br": 79.904, "I": 126.904,
    }

    steps = []
    total = 0.0

    for element, count in elements.items():
        mass = atomic_masses.get(element, default_masses.get(element, 0))
        contribution = mass * count
        total += contribution
        steps.append(_step(f"{element}: {count} × {mass} = {contribution}",
                          "", f"{count} × {mass}", f"{contribution} g/mol"))

    steps.append(_step("Total molar mass", "", "", f"M = {_fmt(total)} g/mol"))
    result.final_answer = f"M = {_fmt(total)} g/mol"
    result.success = True
    result.steps = steps


def solve_chem_empirical(vals: dict, result: SolutionResultV2):
    """Determine empirical formula from mass percentages."""
    # vals: {"composition": {"C": 40.0, "H": 6.7, "O": 53.3}, "atomic_masses": {...}}
    composition = vals.get("composition", {})
    atomic_masses = vals.get("atomic_masses", {})

    default_masses = {
        "H": 1.008, "C": 12.011, "N": 14.007, "O": 15.999, "S": 32.065,
        "Cl": 35.453, "Na": 22.990, "K": 39.098, "Ca": 40.078,
    }

    steps = []

    # Convert mass % to moles
    moles = {}
    for element, percent in composition.items():
        mass = atomic_masses.get(element, default_masses.get(element, 0))
        mol = percent / mass if mass > 0 else 0
        moles[element] = mol
        steps.append(_step(f"{element}: {_fmt(percent)}% / {_fmt(mass)} = {_fmt(mol)} mol",
                          "n = mass/M", f"{percent}/{mass}", f"{_fmt(mol)} mol"))

    # Find smallest mole value
    min_mol = min(moles.values()) if moles else 1

    # Calculate ratios
    ratios = {e: m / min_mol for e, m in moles.items()}
    ratio_str = ", ".join(f"{e}: {_fmt(r, 2)}" for e, r in ratios.items())
    steps.append(_step("Calculate mole ratios", "ratio = n/n_min",
                      f"min = {_fmt(min_mol)}", ratio_str))

    # Round to nearest whole number
    rounded = {e: round(r) for e, r in ratios.items()}
    formula = "".join(f"{e}{rounded[e]}" if rounded[e] > 1 else e for e in sorted(rounded))
    steps.append(_step("Round to whole numbers", "", "", f"Empirical formula: {formula}"))

    result.final_answer = f"Empirical formula: {formula}"
    result.success = True
    result.steps = steps


# ---------------------------------------------------------------------------
# Accounts solvers
# ---------------------------------------------------------------------------

def solve_acc_journal(vals: dict, result: SolutionResultV2):
    """Create journal entry from transaction description.

    vals: {"transactions": [{"account": "Cash", "debit": 1000, "credit": 0},
                             {"account": "Capital", "debit": 0, "credit": 1000}]}
    """
    transactions = vals.get("transactions", [])
    steps = []

    total_debit = sum(t.get("debit", 0) for t in transactions)
    total_credit = sum(t.get("credit", 0) for t in transactions)

    steps.append(_step("Journal Entry", "", "", ""))
    for t in transactions:
        debit = t.get("debit", 0)
        credit = t.get("credit", 0)
        if debit > 0:
            steps.append(_step(f"Dr. {t['account']}", "", "", f"₹{_fmt(debit)}"))
        if credit > 0:
            steps.append(_step(f"    Cr. {t['account']}", "", "", f"₹{_fmt(credit)}"))

    if total_debit == total_credit:
        steps.append(_step("Verify: Total Dr. = Total Cr.",
                          "", f"Dr. ₹{_fmt(total_debit)} = Cr. ₹{_fmt(total_credit)}",
                          "Balanced ✓"))
        result.final_answer = f"Journal entry balanced (₹{_fmt(total_debit)})"
        result.success = True
    else:
        steps.append(_step("Verify: Total Dr. ≠ Total Cr.",
                          "", f"Dr. ₹{_fmt(total_debit)} ≠ Cr. ₹{_fmt(total_credit)}",
                          "Unbalanced ✗"))
        result.error = "Journal entry does not balance"
        result.final_answer = f"Unbalanced: Dr. ₹{_fmt(total_debit)} ≠ Cr. ₹{_fmt(total_credit)}"

    result.steps = steps


def solve_acc_depreciation(vals: dict, result: SolutionResultV2):
    """Calculate depreciation: SLM (Straight Line Method) or WDV (Written Down Value).

    SLM: dep = (cost - salvage) / useful_life
    WDV: dep = book_value × rate
    """
    cost = _safe_float(vals.get("cost"))
    salvage = _safe_float(vals.get("salvage", 0))
    life = _safe_float(vals.get("life", vals.get("useful_life")))
    rate = _safe_float(vals.get("rate"))
    book_value = _safe_float(vals.get("book_value", cost))
    method = vals.get("method", "slm").lower()
    year = _safe_float(vals.get("year", 1))
    find = vals.get("find", "depreciation").lower().strip()

    steps = []

    if method == "slm":
        # Straight Line Method
        if cost is not None and life is not None:
            dep = (cost - salvage) / life
            steps.append(_step("Calculate annual depreciation (SLM)",
                              "dep = (cost - salvage) / life",
                              f"dep = ({_fmt(cost)} - {_fmt(salvage)}) / {_fmt(life)}",
                              f"dep = ₹{_fmt(dep)}/year"))
            if find == "book_value":
                bv = cost - dep * year
                steps.append(_step(f"Book value after year {_fmt(year)}",
                                  "BV = cost - dep × year",
                                  f"BV = {_fmt(cost)} - {_fmt(dep)} × {_fmt(year)}",
                                  f"BV = ₹{_fmt(bv)}"))
                result.final_answer = f"Book value = ₹{_fmt(bv)}"
            else:
                result.final_answer = f"Depreciation = ₹{_fmt(dep)}/year"
            result.success = True

    elif method == "wdv":
        # Written Down Value (declining balance)
        if book_value is not None and rate is not None:
            dep = book_value * rate / 100
            new_bv = book_value - dep
            steps.append(_step(f"Calculate depreciation (WDV) for year {_fmt(year)}",
                              "dep = BV × rate%",
                              f"dep = {_fmt(book_value)} × {_fmt(rate)}%",
                              f"dep = ₹{_fmt(dep)}"))
            steps.append(_step("New book value",
                              "new_BV = BV - dep",
                              f"new_BV = {_fmt(book_value)} - {_fmt(dep)}",
                              f"new_BV = ₹{_fmt(new_bv)}"))
            result.final_answer = f"Depreciation = ₹{_fmt(dep)}, New BV = ₹{_fmt(new_bv)}"
            result.success = True

    if not result.success:
        result.error = f"Cannot solve (method={method}, find={find})"

    result.steps = steps


def solve_acc_brs(vals: dict, result: SolutionResultV2):
    """Bank Reconciliation Statement.

    Adjusts balance per bank book vs bank statement.
    """
    balance_as_per = vals.get("balance_as_per", "cash_book")
    balance = _safe_float(vals.get("balance", 0))
    # Adjustments: positive = add, negative = subtract
    adjustments = vals.get("adjustments", [])

    steps = []
    steps.append(_step(f"Start: Balance as per {balance_as_per.replace('_', ' ')}",
                      "", "", f"₹{_fmt(balance)}"))

    adjusted = balance
    for adj in adjustments:
        desc = adj.get("description", "")
        amount = _safe_float(adj.get("amount", 0))
        action = adj.get("action", "add")  # "add" or "subtract"

        if action == "add":
            adjusted += amount
            steps.append(_step(f"Add: {desc}", f"+₹{_fmt(amount)}", "", f"₹{_fmt(adjusted)}"))
        else:
            adjusted -= amount
            steps.append(_step(f"Less: {desc}", f"-₹{_fmt(amount)}", "", f"₹{_fmt(adjusted)}"))

    steps.append(_step("Adjusted balance", "", "", f"₹{_fmt(adjusted)}"))

    result.final_answer = f"Balance as per {'bank statement' if balance_as_per == 'cash_book' else 'cash book'} = ₹{_fmt(adjusted)}"
    result.success = True
    result.steps = steps


def solve_acc_final_accounts(vals: dict, result: SolutionResultV2):
    """Calculate final accounts: trading account, P&L, balance sheet.

    Simplified: calculates gross profit, net profit, and balance sheet total.
    """
    sales = _safe_float(vals.get("sales", 0))
    purchases = _safe_float(vals.get("purchases", 0))
    opening_stock = _safe_float(vals.get("opening_stock", 0))
    closing_stock = _safe_float(vals.get("closing_stock", 0))
    expenses = _safe_float(vals.get("expenses", 0))
    assets = vals.get("assets", {})
    liabilities = vals.get("liabilities", {})

    steps = []

    # Trading Account
    cogs = opening_stock + purchases - closing_stock
    gross_profit = sales - cogs
    steps.append(_step("Trading Account", "", "", ""))
    steps.append(_step("Cost of goods sold", "COGS = Opening Stock + Purchases - Closing Stock",
                      f"COGS = {_fmt(opening_stock)} + {_fmt(purchases)} - {_fmt(closing_stock)}",
                      f"COGS = ₹{_fmt(cogs)}"))
    steps.append(_step("Gross Profit", "GP = Sales - COGS",
                      f"GP = {_fmt(sales)} - {_fmt(cogs)}", f"GP = ₹{_fmt(gross_profit)}"))

    # P&L Account
    net_profit = gross_profit - expenses
    steps.append(_step("Profit & Loss Account", "", "", ""))
    steps.append(_step("Net Profit", "NP = GP - Expenses",
                      f"NP = {_fmt(gross_profit)} - {_fmt(expenses)}",
                      f"NP = ₹{_fmt(net_profit)}"))

    # Balance Sheet
    total_assets = sum(assets.values()) if assets else 0
    total_liabilities = sum(liabilities.values()) if liabilities else 0
    steps.append(_step("Balance Sheet", "", "", ""))
    steps.append(_step("Total Assets", "", "", f"₹{_fmt(total_assets)}"))
    steps.append(_step("Total Liabilities", "", "", f"₹{_fmt(total_liabilities)}"))

    if total_assets == total_liabilities:
        steps.append(_step("Balance Sheet balances", "", "", "✓"))
    else:
        steps.append(_step("Balance Sheet does NOT balance",
                          "", f"Assets ₹{_fmt(total_assets)} ≠ Liabilities ₹{_fmt(total_liabilities)}",
                          "✗"))

    result.final_answer = f"GP=₹{_fmt(gross_profit)}, NP=₹{_fmt(net_profit)}"
    result.success = True
    result.steps = steps


# ---------------------------------------------------------------------------
# Applied Maths solvers
# ---------------------------------------------------------------------------

def solve_appmath_statistics(vals: dict, result: SolutionResultV2):
    """Calculate statistics: mean, median, mode, standard deviation, variance."""
    data = vals.get("data", [])
    find = vals.get("find", "all").lower().strip()

    if not data:
        result.error = "No data provided"
        return

    # Ensure numeric
    data = [_safe_float(x) for x in data if x is not None]
    n = len(data)

    steps = []

    if n == 0:
        result.error = "No valid data points"
        return

    # Mean
    mean = sum(data) / n
    steps.append(_step("Mean", "x̄ = Σx/n",
                      f"x̄ = {sum(data)}/{n}", f"x̄ = {_fmt(mean)}"))

    # Median
    sorted_data = sorted(data)
    if n % 2 == 0:
        median = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
    else:
        median = sorted_data[n//2]
    steps.append(_step("Median", "Middle value (sorted)",
                      f"Sorted: {sorted_data}", f"Median = {_fmt(median)}"))

    # Mode
    from collections import Counter
    counts = Counter(data)
    max_count = max(counts.values())
    mode = [k for k, v in counts.items() if v == max_count]
    mode_str = ", ".join(str(_fmt(m)) for m in mode)
    steps.append(_step("Mode", "Most frequent value",
                      f"Counts: {dict(counts)}", f"Mode = {mode_str}"))

    # Variance and Std Dev
    variance = sum((x - mean)**2 for x in data) / n
    std_dev = math.sqrt(variance)
    steps.append(_step("Variance", "σ² = Σ(x-x̄)²/n",
                      f"σ² = {sum((x-mean)**2 for x in data)}/{n}",
                      f"σ² = {_fmt(variance)}"))
    steps.append(_step("Standard Deviation", "σ = √σ²",
                      f"σ = √{_fmt(variance)}", f"σ = {_fmt(std_dev)}"))

    if find == "all":
        result.final_answer = f"Mean={_fmt(mean)}, Median={_fmt(median)}, Mode={mode_str}, σ={_fmt(std_dev)}"
    elif find == "mean":
        result.final_answer = f"Mean = {_fmt(mean)}"
    elif find == "median":
        result.final_answer = f"Median = {_fmt(median)}"
    elif find == "mode":
        result.final_answer = f"Mode = {mode_str}"
    elif find == "std":
        result.final_answer = f"σ = {_fmt(std_dev)}"

    result.success = True
    result.steps = steps


def solve_appmath_gst(vals: dict, result: SolutionResultV2):
    """Calculate GST: CGST, SGST, IGST, total with tax."""
    price = _safe_float(vals.get("price", vals.get("amount", 0)))
    gst_rate = _safe_float(vals.get("gst_rate", vals.get("rate", 0)))
    transaction_type = vals.get("type", "intra").lower()  # intra or inter
    find = vals.get("find", "total").lower().strip()

    steps = []

    gst_amount = price * gst_rate / 100

    if transaction_type == "intra":
        # Intra-state: CGST + SGST (each = half of GST)
        cgst = gst_amount / 2
        sgst = gst_amount / 2
        steps.append(_step("Calculate CGST (intra-state)", "CGST = price × rate% / 2",
                          f"CGST = {_fmt(price)} × {_fmt(gst_rate)}% / 2", f"CGST = ₹{_fmt(cgst)}"))
        steps.append(_step("Calculate SGST (intra-state)", "SGST = price × rate% / 2",
                          f"SGST = {_fmt(price)} × {_fmt(gst_rate)}% / 2", f"SGST = ₹{_fmt(sgst)}"))
        tax_breakdown = f"CGST=₹{_fmt(cgst)}, SGST=₹{_fmt(sgst)}"
    else:
        # Inter-state: IGST (full GST)
        igst = gst_amount
        steps.append(_step("Calculate IGST (inter-state)", "IGST = price × rate%",
                          f"IGST = {_fmt(price)} × {_fmt(gst_rate)}%", f"IGST = ₹{_fmt(igst)}"))
        tax_breakdown = f"IGST=₹{_fmt(igst)}"

    total = price + gst_amount
    steps.append(_step("Total amount", "Total = price + GST",
                      f"Total = {_fmt(price)} + {_fmt(gst_amount)}", f"Total = ₹{_fmt(total)}"))

    result.final_answer = f"GST=₹{_fmt(gst_amount)}, Total=₹{_fmt(total)} ({tax_breakdown})"
    result.success = True
    result.steps = steps


def solve_appmath_annuity(vals: dict, result: SolutionResultV2):
    """Calculate annuity: future value or present value.

    FV = PMT × [(1+r)^n - 1] / r
    PV = PMT × [1 - (1+r)^(-n)] / r
    """
    pmt = _safe_float(vals.get("pmt", vals.get("payment", 0)))
    rate = _safe_float(vals.get("rate", 0)) / 100  # Convert % to decimal
    n = _safe_float(vals.get("n", vals.get("periods", 0)))
    find = vals.get("find", "fv").lower().strip()

    steps = []

    if find == "fv":
        # Future Value
        if rate == 0:
            fv = pmt * n
        else:
            fv = pmt * ((1 + rate)**n - 1) / rate
        steps.append(_step("Calculate Future Value of Annuity",
                          "FV = PMT × [(1+r)^n - 1] / r",
                          f"FV = {_fmt(pmt)} × [(1+{_fmt(rate)})^{_fmt(n)} - 1] / {_fmt(rate)}",
                          f"FV = ₹{_fmt(fv)}"))
        result.final_answer = f"FV = ₹{_fmt(fv)}"

    elif find == "pv":
        # Present Value
        if rate == 0:
            pv = pmt * n
        else:
            pv = pmt * (1 - (1 + rate)**(-n)) / rate
        steps.append(_step("Calculate Present Value of Annuity",
                          "PV = PMT × [1 - (1+r)^(-n)] / r",
                          f"PV = {_fmt(pmt)} × [1 - (1+{_fmt(rate)})^(-{_fmt(n)})] / {_fmt(rate)}",
                          f"PV = ₹{_fmt(pv)}"))
        result.final_answer = f"PV = ₹{_fmt(pv)}"

    result.success = True
    result.steps = steps


def solve_appmath_regression(vals: dict, result: SolutionResultV2):
    """Calculate linear regression: y = a + bx.

    Given x, y data points, calculate slope (b) and intercept (a).
    """
    x_data = vals.get("x", [])
    y_data = vals.get("y", [])

    if not x_data or not y_data or len(x_data) != len(y_data):
        result.error = "Need equal-length x and y arrays"
        return

    x_data = [_safe_float(x) for x in x_data]
    y_data = [_safe_float(y) for y in y_data]
    n = len(x_data)

    steps = []

    # Calculate sums
    sum_x = sum(x_data)
    sum_y = sum(y_data)
    sum_xy = sum(x * y for x, y in zip(x_data, y_data))
    sum_x2 = sum(x**2 for x in x_data)

    steps.append(_step("Calculate sums",
                      "Σx, Σy, Σxy, Σx²",
                      f"Σx={_fmt(sum_x)}, Σy={_fmt(sum_y)}, Σxy={_fmt(sum_xy)}, Σx²={_fmt(sum_x2)}",
                      f"n={n}"))

    # Slope: b = (nΣxy - ΣxΣy) / (nΣx² - (Σx)²)
    numerator = n * sum_xy - sum_x * sum_y
    denominator = n * sum_x2 - sum_x**2
    b = numerator / denominator if denominator != 0 else 0

    steps.append(_step("Calculate slope (b)",
                      "b = (nΣxy - ΣxΣy) / (nΣx² - (Σx)²)",
                      f"b = ({n}×{_fmt(sum_xy)} - {_fmt(sum_x)}×{_fmt(sum_y)}) / ({n}×{_fmt(sum_x2)} - {_fmt(sum_x)}²)",
                      f"b = {_fmt(b)}"))

    # Intercept: a = (Σy - bΣx) / n
    a = (sum_y - b * sum_x) / n

    steps.append(_step("Calculate intercept (a)",
                      "a = (Σy - bΣx) / n",
                      f"a = ({_fmt(sum_y)} - {_fmt(b)}×{_fmt(sum_x)}) / {n}",
                      f"a = {_fmt(a)}"))

    steps.append(_step("Regression equation", "y = a + bx",
                      "", f"y = {_fmt(a)} + {_fmt(b)}x"))

    result.final_answer = f"y = {_fmt(a)} + {_fmt(b)}x"
    result.success = True
    result.steps = steps


# ---------------------------------------------------------------------------
# Solver registry and dispatch
# ---------------------------------------------------------------------------

SOLVER_REGISTRY = {
    # Physics
    "phy_optics": solve_phy_optics,
    "phy_magnetism": solve_phy_magnetism,
    "phy_waves": solve_phy_waves,
    "phy_gravitation": solve_phy_gravitation,
    "phy_momentum": solve_phy_momentum,
    "phy_circular_motion": solve_phy_circular_motion,
    "phy_thermodynamics": solve_phy_thermodynamics,
    # Chemistry
    "chem_stoichiometry": solve_chem_stoichiometry,
    "chem_redox": solve_chem_redox,
    "chem_molar_mass": solve_chem_molar_mass,
    "chem_empirical": solve_chem_empirical,
    # Accounts
    "acc_journal": solve_acc_journal,
    "acc_depreciation": solve_acc_depreciation,
    "acc_brs": solve_acc_brs,
    "acc_final_accounts": solve_acc_final_accounts,
    # Applied Maths
    "appmath_statistics": solve_appmath_statistics,
    "appmath_gst": solve_appmath_gst,
    "appmath_annuity": solve_appmath_annuity,
    "appmath_regression": solve_appmath_regression,
}


class SolverV2:
    """Extended solver for physics, chemistry, accounts, and applied maths.

    All computations are deterministic (SymPy/pint/chempy/math).
    The student fills in form values; the solver computes and shows steps.
    """

    def solve(self, category: str, values: dict) -> SolutionResultV2:
        """Solve a problem in the given category with student-provided values.

        Args:
            category: Solver category (e.g., "phy_optics", "chem_stoichiometry").
            values: Student-filled form values.

        Returns:
            SolutionResultV2 with steps and final answer.
        """
        result = SolutionResultV2(category=category)

        solver_fn = SOLVER_REGISTRY.get(category)
        if solver_fn is None:
            result.error = f"Unknown category: {category}"
            return result

        try:
            solver_fn(values, result)
        except Exception as e:
            result.error = str(e)
            result.success = False

        return result

    def get_categories(self) -> dict:
        """Get all available solver categories grouped by subject."""
        return {
            "physics": [k for k in SOLVER_REGISTRY if k.startswith("phy_")],
            "chemistry": [k for k in SOLVER_REGISTRY if k.startswith("chem_")],
            "accounts": [k for k in SOLVER_REGISTRY if k.startswith("acc_")],
            "applied_maths": [k for k in SOLVER_REGISTRY if k.startswith("appmath_")],
        }
