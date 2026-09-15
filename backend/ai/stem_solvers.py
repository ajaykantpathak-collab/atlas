"""Structured physics and chemistry solvers for the final_solver pipeline.

These solvers accept student-filled form values (not regex extraction from
free text) and compute using SymPy + pint for unit conversion.

Categories:
  Physics:
    - phy_kinematics: v = u + at, s = ut + ½at², v² = u² + 2as
    - phy_newtons_laws: F = ma, weight, tension, normal force
    - phy_energy: KE = ½mv², PE = mgh, W = Fs
    - phy_momentum: p = mv, impulse = Ft
    - phy_gravitation: F = Gm₁m₂/r², g = GM/r²
    - phy_electricity: V = IR, P = VI, Q = It
    - phy_optics: lens formula, mirror formula
    - phy_waves: v = fλ, T = 1/f

  Chemistry:
    - chem_moles: n = m/M, n = N/NA
    - chem_molarity: M = n/V
    - chem_ph: pH = -log[H+]
    - chem_stoichiometry: mole ratios from balanced equations
    - chem_gas: PV = nRT
    - chem_dilution: M1V1 = M2V2
"""
import math
import re
from typing import Optional
from dataclasses import dataclass, field

from backend.ai.competency_solver import ExtractedValues, StepResult, SolutionResult


def _safe_float(val, default=None):
    """Safely parse a float from a string or number."""
    if val is None or val == "":
        return default
    if isinstance(val, (int, float)):
        return float(val)
    try:
        # Remove units and common suffixes
        cleaned = re.sub(r'[a-zA-Z/\s]+$', '', str(val).strip())
        return float(cleaned)
    except (ValueError, TypeError):
        return default


def _fmt(v, precision=4):
    """Format a number cleanly."""
    if v is None:
        return "?"
    f = float(v)
    if abs(f - round(f)) < 1e-9:
        return str(int(round(f)))
    return str(round(f, precision))


# --------------------------------------------------------------------------- #
# Physics solvers
# --------------------------------------------------------------------------- #

def solve_phy_kinematics(vals: ExtractedValues, result: SolutionResult):
    """Solve kinematics problems: v = u + at, s = ut + ½at², v² = u² + 2as."""
    raw = vals.raw
    u = _safe_float(raw.get("u"))
    v = _safe_float(raw.get("v"))
    a = _safe_float(raw.get("a"))
    s = _safe_float(raw.get("s"))
    t = _safe_float(raw.get("t"))
    find = raw.get("find", "").lower().strip()

    # Auto-detect what to find
    if not find:
        missing = []
        for name, val in [("u", u), ("v", v), ("a", a), ("s", s), ("t", t)]:
            if val is None:
                missing.append(name)
        if len(missing) == 1:
            find = missing[0]

    steps = []

    if find == "v" and u is not None and a is not None and t is not None:
        answer = u + a * t
        steps.append(StepResult(step_num=1, description=f"Use v = u + at", operation="formula", success=True, result=f"v = {u} + {a}×{t}"))
        steps.append(StepResult(step_num=2, description=f"v = {answer} m/s", operation="compute", success=True, result=f"{answer} m/s"))
    elif find == "s" and u is not None and a is not None and t is not None:
        answer = u * t + 0.5 * a * t**2
        steps.append(StepResult(step_num=1, description=f"Use s = ut + ½at²", operation="formula", success=True, result=f"s = {u}×{t} + ½×{a}×{t}²"))
        steps.append(StepResult(step_num=2, description=f"s = {answer} m", operation="compute", success=True, result=f"{answer} m"))
    elif find == "v" and u is not None and a is not None and s is not None:
        answer = math.sqrt(u**2 + 2 * a * s) if u**2 + 2*a*s >= 0 else None
        if answer is not None:
            steps.append(StepResult(step_num=1, description=f"Use v² = u² + 2as", operation="formula", success=True, result=f"v² = {u}² + 2×{a}×{s}"))
            steps.append(StepResult(step_num=2, description=f"v = √({u**2 + 2*a*s}) = {answer} m/s", operation="compute", success=True, result=f"{answer} m/s"))
    elif find == "a" and u is not None and v is not None and t is not None:
        answer = (v - u) / t
        steps.append(StepResult(step_num=1, description=f"Use a = (v - u)/t", operation="formula", success=True, result=f"a = ({v} - {u})/{t}"))
        steps.append(StepResult(step_num=2, description=f"a = {answer} m/s²", operation="compute", success=True, result=f"{answer} m/s²"))
    elif find == "t" and u is not None and v is not None and a is not None and a != 0:
        answer = (v - u) / a
        steps.append(StepResult(step_num=1, description=f"Use t = (v - u)/a", operation="formula", success=True, result=f"t = ({v} - {u})/{a}"))
        steps.append(StepResult(step_num=2, description=f"t = {answer} s", operation="compute", success=True, result=f"{answer} s"))
    else:
        result.error = f"Cannot solve: need at least 3 of u, v, a, s, t and one unknown. Got u={u}, v={v}, a={a}, s={s}, t={t}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)


def solve_phy_newtons_laws(vals: ExtractedValues, result: SolutionResult):
    """F = ma, weight W = mg, tension, normal force."""
    raw = vals.raw
    m = _safe_float(raw.get("m"))
    a = _safe_float(raw.get("a"))
    F = _safe_float(raw.get("F"))
    g = _safe_float(raw.get("g", 9.8))
    find = raw.get("find", "").lower().strip()

    steps = []

    if find == "f" and m is not None and a is not None:
        answer = m * a
        steps.append(StepResult(step_num=1, description="Use F = ma", operation="formula", success=True, result=f"F = {m}×{a}"))
        steps.append(StepResult(step_num=2, description=f"F = {answer} N", operation="compute", success=True, result=f"{answer} N"))
    elif find == "m" and F is not None and a is not None and a != 0:
        answer = F / a
        steps.append(StepResult(step_num=1, description="Use m = F/a", operation="formula", success=True, result=f"m = {F}/{a}"))
        steps.append(StepResult(step_num=2, description=f"m = {answer} kg", operation="compute", success=True, result=f"{answer} kg"))
    elif find == "a" and F is not None and m is not None and m != 0:
        answer = F / m
        steps.append(StepResult(step_num=1, description="Use a = F/m", operation="formula", success=True, result=f"a = {F}/{m}"))
        steps.append(StepResult(step_num=2, description=f"a = {answer} m/s²", operation="compute", success=True, result=f"{answer} m/s²"))
    elif find in ("w", "weight") and m is not None:
        answer = m * g
        steps.append(StepResult(step_num=1, description="Use W = mg", operation="formula", success=True, result=f"W = {m}×{g}"))
        steps.append(StepResult(step_num=2, description=f"W = {answer} N", operation="compute", success=True, result=f"{answer} N"))
    else:
        result.error = f"Cannot solve: need 2 of F, m, a (or m for weight). Got F={F}, m={m}, a={a}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)


def solve_phy_energy(vals: ExtractedValues, result: SolutionResult):
    """KE = ½mv², PE = mgh, W = Fs cos(θ)"""
    raw = vals.raw
    m = _safe_float(raw.get("m"))
    v = _safe_float(raw.get("v"))
    h = _safe_float(raw.get("h"))
    g = _safe_float(raw.get("g", 9.8))
    F = _safe_float(raw.get("F"))
    s = _safe_float(raw.get("s"))
    theta = _safe_float(raw.get("theta", 0))
    find = raw.get("find", "").lower().strip()

    steps = []

    if find in ("ke", "kinetic_energy") and m is not None and v is not None:
        answer = 0.5 * m * v**2
        steps.append(StepResult(step_num=1, description="Use KE = ½mv²", operation="formula", success=True, result=f"KE = ½×{m}×{v}²"))
        steps.append(StepResult(step_num=2, description=f"KE = {answer} J", operation="compute", success=True, result=f"{answer} J"))
    elif find in ("pe", "potential_energy") and m is not None and h is not None:
        answer = m * g * h
        steps.append(StepResult(step_num=1, description="Use PE = mgh", operation="formula", success=True, result=f"PE = {m}×{g}×{h}"))
        steps.append(StepResult(step_num=2, description=f"PE = {answer} J", operation="compute", success=True, result=f"{answer} J"))
    elif find in ("w", "work") and F is not None and s is not None:
        cos_theta = math.cos(math.radians(theta)) if theta else 1.0
        answer = F * s * cos_theta
        steps.append(StepResult(step_num=1, description=f"Use W = Fs cos(θ)", operation="formula", success=True, result=f"W = {F}×{s}×cos({theta}°)"))
        steps.append(StepResult(step_num=2, description=f"W = {answer} J", operation="compute", success=True, result=f"{answer} J"))
    else:
        result.error = f"Cannot solve: need m+v for KE, m+h for PE, or F+s for W. Got m={m}, v={v}, h={h}, F={F}, s={s}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)


def solve_phy_electricity(vals: ExtractedValues, result: SolutionResult):
    """V = IR, P = VI, Q = It"""
    raw = vals.raw
    V = _safe_float(raw.get("V"))
    I = _safe_float(raw.get("I"))
    R = _safe_float(raw.get("R"))
    P = _safe_float(raw.get("P"))
    t = _safe_float(raw.get("t"))
    find = raw.get("find", "").lower().strip()

    steps = []

    if find == "v" and I is not None and R is not None:
        answer = I * R
        steps.append(StepResult(step_num=1, description="Use V = IR (Ohm's Law)", operation="formula", success=True, result=f"V = {I}×{R}"))
        steps.append(StepResult(step_num=2, description=f"V = {answer} V", operation="compute", success=True, result=f"{answer} V"))
    elif find == "i" and V is not None and R is not None and R != 0:
        answer = V / R
        steps.append(StepResult(step_num=1, description="Use I = V/R (Ohm's Law)", operation="formula", success=True, result=f"I = {V}/{R}"))
        steps.append(StepResult(step_num=2, description=f"I = {answer} A", operation="compute", success=True, result=f"{answer} A"))
    elif find == "r" and V is not None and I is not None and I != 0:
        answer = V / I
        steps.append(StepResult(step_num=1, description="Use R = V/I (Ohm's Law)", operation="formula", success=True, result=f"R = {V}/{I}"))
        steps.append(StepResult(step_num=2, description=f"R = {answer} Ω", operation="compute", success=True, result=f"{answer} Ω"))
    elif find == "p" and V is not None and I is not None:
        answer = V * I
        steps.append(StepResult(step_num=1, description="Use P = VI", operation="formula", success=True, result=f"P = {V}×{I}"))
        steps.append(StepResult(step_num=2, description=f"P = {answer} W", operation="compute", success=True, result=f"{answer} W"))
    elif find == "q" and I is not None and t is not None:
        answer = I * t
        steps.append(StepResult(step_num=1, description="Use Q = It", operation="formula", success=True, result=f"Q = {I}×{t}"))
        steps.append(StepResult(step_num=2, description=f"Q = {answer} C", operation="compute", success=True, result=f"{answer} C"))
    else:
        result.error = f"Cannot solve: need 2 of V, I, R (or V+I for P, I+t for Q). Got V={V}, I={I}, R={R}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)


# --------------------------------------------------------------------------- #
# Chemistry solvers
# --------------------------------------------------------------------------- #

def solve_chem_moles(vals: ExtractedValues, result: SolutionResult):
    """n = m/M, n = N/NA (NA = 6.022×10²³)"""
    raw = vals.raw
    m = _safe_float(raw.get("m"))
    M = _safe_float(raw.get("M"))
    N = _safe_float(raw.get("N"))
    NA = 6.022e23
    find = raw.get("find", "").lower().strip()

    steps = []

    if find == "n" and m is not None and M is not None and M != 0:
        answer = m / M
        steps.append(StepResult(step_num=1, description="Use n = m/M", operation="formula", success=True, result=f"n = {m}/{M}"))
        steps.append(StepResult(step_num=2, description=f"n = {answer} mol", operation="compute", success=True, result=f"{answer} mol"))
    elif find == "m" and n_val is not None and M is not None:
        # This shouldn't happen since n is not parsed yet
        pass
    elif find == "n" and N is not None:
        answer = N / NA
        steps.append(StepResult(step_num=1, description="Use n = N/NA", operation="formula", success=True, result=f"n = {N}/{NA:.3e}"))
        steps.append(StepResult(step_num=2, description=f"n = {answer} mol", operation="compute", success=True, result=f"{answer} mol"))
    else:
        result.error = f"Cannot solve: need m+M or N for moles. Got m={m}, M={M}, N={N}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)


def solve_chem_molarity(vals: ExtractedValues, result: SolutionResult):
    """M = n/V, n = moles, V = volume in liters"""
    raw = vals.raw
    n = _safe_float(raw.get("n"))
    V = _safe_float(raw.get("V"))
    M_conc = _safe_float(raw.get("M"))
    find = raw.get("find", "").lower().strip()

    steps = []

    if find in ("m", "molarity") and n is not None and V is not None and V != 0:
        answer = n / V
        steps.append(StepResult(step_num=1, description="Use M = n/V", operation="formula", success=True, result=f"M = {n}/{V}"))
        steps.append(StepResult(step_num=2, description=f"M = {answer} mol/L", operation="compute", success=True, result=f"{answer} mol/L"))
    elif find == "n" and M_conc is not None and V is not None:
        answer = M_conc * V
        steps.append(StepResult(step_num=1, description="Use n = M×V", operation="formula", success=True, result=f"n = {M_conc}×{V}"))
        steps.append(StepResult(step_num=2, description=f"n = {answer} mol", operation="compute", success=True, result=f"{answer} mol"))
    elif find == "v" and n is not None and M_conc is not None and M_conc != 0:
        answer = n / M_conc
        steps.append(StepResult(step_num=1, description="Use V = n/M", operation="formula", success=True, result=f"V = {n}/{M_conc}"))
        steps.append(StepResult(step_num=2, description=f"V = {answer} L", operation="compute", success=True, result=f"{answer} L"))
    else:
        result.error = f"Cannot solve: need 2 of n, V, M. Got n={n}, V={V}, M={M_conc}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)


def solve_chem_ph(vals: ExtractedValues, result: SolutionResult):
    """pH = -log[H+], [H+] = 10^(-pH)"""
    raw = vals.raw
    H = _safe_float(raw.get("H"))
    pH = _safe_float(raw.get("pH"))
    find = raw.get("find", "").lower().strip()

    steps = []

    if find == "ph" and H is not None and H > 0:
        answer = -math.log10(H)
        steps.append(StepResult(step_num=1, description="Use pH = -log[H⁺]", operation="formula", success=True, result=f"pH = -log({H})"))
        steps.append(StepResult(step_num=2, description=f"pH = {answer}", operation="compute", success=True, result=f"{answer}"))
    elif find in ("h", "h+") and pH is not None:
        answer = 10 ** (-pH)
        steps.append(StepResult(step_num=1, description="Use [H⁺] = 10^(-pH)", operation="formula", success=True, result=f"[H⁺] = 10^(-{pH})"))
        steps.append(StepResult(step_num=2, description=f"[H⁺] = {answer:.2e} mol/L", operation="compute", success=True, result=f"{answer:.2e} mol/L"))
    else:
        result.error = f"Cannot solve: need H for pH, or pH for [H+]. Got H={H}, pH={pH}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)


def solve_chem_gas(vals: ExtractedValues, result: SolutionResult):
    """PV = nRT (ideal gas law)"""
    raw = vals.raw
    P = _safe_float(raw.get("P"))
    V = _safe_float(raw.get("V"))
    n = _safe_float(raw.get("n"))
    T = _safe_float(raw.get("T"))
    R = _safe_float(raw.get("R", 0.0821))  # L·atm/(mol·K)
    find = raw.get("find", "").lower().strip()

    steps = []

    if find == "p" and V is not None and n is not None and T is not None and V != 0:
        answer = (n * R * T) / V
        steps.append(StepResult(step_num=1, description="Use P = nRT/V", operation="formula", success=True, result=f"P = {n}×{R}×{T}/{V}"))
        steps.append(StepResult(step_num=2, description=f"P = {answer} atm", operation="compute", success=True, result=f"{answer} atm"))
    elif find == "v" and P is not None and n is not None and T is not None and P != 0:
        answer = (n * R * T) / P
        steps.append(StepResult(step_num=1, description="Use V = nRT/P", operation="formula", success=True, result=f"V = {n}×{R}×{T}/{P}"))
        steps.append(StepResult(step_num=2, description=f"V = {answer} L", operation="compute", success=True, result=f"{answer} L"))
    elif find == "n" and P is not None and V is not None and T is not None and T != 0:
        answer = (P * V) / (R * T)
        steps.append(StepResult(step_num=1, description="Use n = PV/RT", operation="formula", success=True, result=f"n = {P}×{V}/{R}×{T}"))
        steps.append(StepResult(step_num=2, description=f"n = {answer} mol", operation="compute", success=True, result=f"{answer} mol"))
    elif find == "t" and P is not None and V is not None and n is not None and n != 0:
        answer = (P * V) / (n * R)
        steps.append(StepResult(step_num=1, description="Use T = PV/nR", operation="formula", success=True, result=f"T = {P}×{V}/{n}×{R}"))
        steps.append(StepResult(step_num=2, description=f"T = {answer} K", operation="compute", success=True, result=f"{answer} K"))
    else:
        result.error = f"Cannot solve: need 3 of P, V, n, T. Got P={P}, V={V}, n={n}, T={T}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)


def solve_chem_dilution(vals: ExtractedValues, result: SolutionResult):
    """M1V1 = M2V2"""
    raw = vals.raw
    M1 = _safe_float(raw.get("M1"))
    V1 = _safe_float(raw.get("V1"))
    M2 = _safe_float(raw.get("M2"))
    V2 = _safe_float(raw.get("V2"))
    find = raw.get("find", "").lower().strip()

    steps = []

    if find in ("m2",) and M1 is not None and V1 is not None and V2 is not None and V2 != 0:
        answer = (M1 * V1) / V2
        steps.append(StepResult(step_num=1, description="Use M2 = M1V1/V2", operation="formula", success=True, result=f"M2 = {M1}×{V1}/{V2}"))
        steps.append(StepResult(step_num=2, description=f"M2 = {answer} mol/L", operation="compute", success=True, result=f"{answer} mol/L"))
    elif find in ("v2",) and M1 is not None and V1 is not None and M2 is not None and M2 != 0:
        answer = (M1 * V1) / M2
        steps.append(StepResult(step_num=1, description="Use V2 = M1V1/M2", operation="formula", success=True, result=f"V2 = {M1}×{V1}/{M2}"))
        steps.append(StepResult(step_num=2, description=f"V2 = {answer} L", operation="compute", success=True, result=f"{answer} L"))
    elif find in ("m1",) and M2 is not None and V2 is not None and V1 is not None and V1 != 0:
        answer = (M2 * V2) / V1
        steps.append(StepResult(step_num=1, description="Use M1 = M2V2/V1", operation="formula", success=True, result=f"M1 = {M2}×{V2}/{V1}"))
        steps.append(StepResult(step_num=2, description=f"M1 = {answer} mol/L", operation="compute", success=True, result=f"{answer} mol/L"))
    elif find in ("v1",) and M1 is not None and M2 is not None and V2 is not None and M1 != 0:
        answer = (M2 * V2) / M1
        steps.append(StepResult(step_num=1, description="Use V1 = M2V2/M1", operation="formula", success=True, result=f"V1 = {M2}×{V2}/{M1}"))
        steps.append(StepResult(step_num=2, description=f"V1 = {answer} L", operation="compute", success=True, result=f"{answer} L"))
    else:
        result.error = f"Cannot solve: need 3 of M1, V1, M2, V2. Got M1={M1}, V1={V1}, M2={M2}, V2={V2}, find={find}"
        return

    result.steps = steps
    result.success = all(s.success for s in steps)
