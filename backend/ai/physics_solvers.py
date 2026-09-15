"""Physics formula solver — comprehensive templates for NEET/JEE level.

Covers: mechanics, gravitation, thermodynamics, electromagnetism, optics,
waves, modern physics. Uses SymPy for symbolic computation.

Each solver:
1. Detects the physics topic from keywords
2. Extracts given values using regex
3. Applies the correct formula
4. Returns step-by-step solution
"""

import re
import math
import sympy
from sympy import Symbol, sqrt, pi, Rational, sin, cos, tan, asin, acos, atan
from typing import Optional
from backend.ai.compute_types import ComputeResult, _format_math, _clean_num, _num_sci


def _num(v) -> str:
    """Format a number cleanly."""
    if v is None:
        return "?"
    f = float(v)
    if f == int(f):
        return str(int(f))
    return str(round(f, 4))


def _extract_numbers(message: str, patterns: dict) -> dict:
    """Extract numeric values from message using named patterns.
    
    patterns: {"var_name": regex_pattern}
    Returns: {"var_name": float_value}
    """
    values = {}
    for var, pattern in patterns.items():
        m = re.search(pattern, message, re.IGNORECASE)
        if m:
            try:
                values[var] = float(m.group(1))
            except (ValueError, IndexError):
                pass
    return values


def _result(steps: list, answer: str) -> ComputeResult:
    return ComputeResult(
        matched=True,
        question_type="physics_formula",
        answer=answer,
        steps=steps,
    )


# --------------------------------------------------------------------------- #
# Mechanics
# --------------------------------------------------------------------------- #

def solve_kinematics(message: str) -> Optional[ComputeResult]:
    """v = u + at, s = ut + ½at², v² = u² + 2as"""
    if not any(kw in message for kw in ["velocity", "acceleration", "final velocity",
                                         "initial velocity", "displacement", "distance",
                                         "kinematics", "accelerat"]):
        # Also match if has u, v, a, s, t pattern with numbers
        if not re.search(r'\d', message):
            return None

    vals = _extract_numbers(message, {
        "u": r'(?:initial\s+velocity|u)\s*=?\s*(\d+\.?\d*)\s*m/s',
        "v": r'(?:final\s+velocity|v)\s*=?\s*(\d+\.?\d*)\s*m/s',
        "a": r'(?:acceleration|a)\s*=?\s*(\d+\.?\d*)\s*m/s',
        "s": r'(?:distance|displacement|s)\s*=?\s*(\d+\.?\d*)\s*m\b',
        "t": r'(?:time|t)\s*=?\s*(\d+\.?\d*)\s*s\b',
    })

    if len(vals) < 2:
        return None

    steps = []
    
    # Determine what's being asked for
    ask_distance = "distance" in message or "displacement" in message
    ask_velocity = "final velocity" in message or ("velocity" in message and "v" not in vals)
    
    # s = ut + ½at² (find s) — prioritize if distance is asked
    if ask_distance and "u" in vals and "a" in vals and "t" in vals and "s" not in vals:
        s = vals["u"] * vals["t"] + 0.5 * vals["a"] * vals["t"]**2
        steps = [
            f"Given: u = {_num(vals['u'])} m/s, a = {_num(vals['a'])} m/s², t = {_num(vals['t'])} s",
            f"Formula: s = ut + ½at²",
            f"Substitute: s = {_num(vals['u'])}×{_num(vals['t'])} + ½×{_num(vals['a'])}×{_num(vals['t'])}²",
            f"Result: s = {_num(s)} m",
        ]
        return _result(steps, f"s = {_num(s)} m")

    # v = u + at (find v)
    if "u" in vals and "a" in vals and "t" in vals and "v" not in vals:
        v = vals["u"] + vals["a"] * vals["t"]
        steps = [
            f"Given: u = {_num(vals['u'])} m/s, a = {_num(vals['a'])} m/s², t = {_num(vals['t'])} s",
            f"Formula: v = u + at",
            f"Substitute: v = {_num(vals['u'])} + {_num(vals['a'])} × {_num(vals['t'])}",
            f"Result: v = {_num(v)} m/s",
        ]
        return _result(steps, f"v = {_num(v)} m/s")

    # s = ut + ½at² (find s) — fallback
    if "u" in vals and "a" in vals and "t" in vals and "s" not in vals:
        s = vals["u"] * vals["t"] + 0.5 * vals["a"] * vals["t"]**2
        steps = [
            f"Given: u = {_num(vals['u'])} m/s, a = {_num(vals['a'])} m/s², t = {_num(vals['t'])} s",
            f"Formula: s = ut + ½at²",
            f"Substitute: s = {_num(vals['u'])}×{_num(vals['t'])} + ½×{_num(vals['a'])}×{_num(vals['t'])}²",
            f"Result: s = {_num(s)} m",
        ]
        return _result(steps, f"s = {_num(s)} m")

    # v² = u² + 2as (find v)
    if "u" in vals and "a" in vals and "s" in vals and "v" not in vals and "t" not in vals:
        v_sq = vals["u"]**2 + 2 * vals["a"] * vals["s"]
        if v_sq >= 0:
            v = math.sqrt(v_sq)
            steps = [
                f"Given: u = {_num(vals['u'])} m/s, a = {_num(vals['a'])} m/s², s = {_num(vals['s'])} m",
                f"Formula: v² = u² + 2as",
                f"Substitute: v² = {_num(vals['u'])}² + 2×{_num(vals['a'])}×{_num(vals['s'])}",
                f"Result: v = {_num(v)} m/s",
            ]
            return _result(steps, f"v = {_num(v)} m/s")

    # a = (v-u)/t
    if "u" in vals and "v" in vals and "t" in vals and "a" not in vals:
        a = (vals["v"] - vals["u"]) / vals["t"]
        steps = [
            f"Given: u = {_num(vals['u'])} m/s, v = {_num(vals['v'])} m/s, t = {_num(vals['t'])} s",
            f"Formula: a = (v - u) / t",
            f"Substitute: a = ({_num(vals['v'])} - {_num(vals['u'])}) / {_num(vals['t'])}",
            f"Result: a = {_num(a)} m/s²",
        ]
        return _result(steps, f"a = {_num(a)} m/s²")

    return None


def solve_newtons_laws(message: str) -> Optional[ComputeResult]:
    """F = ma, and related"""
    if not any(kw in message for kw in ["force", "newton", "f = ma", "f=ma"]):
        return None

    vals = _extract_numbers(message, {
        "F": r'(?:force|f)\s*=?\s*(\d+\.?\d*)\s*N\b',
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*kg\b',
        "a": r'(?:acceleration|a)\s*=?\s*(\d+\.?\d*)\s*m/s',
    })

    if len(vals) < 2:
        return None

    # F = ma
    if "m" in vals and "a" in vals and "F" not in vals:
        F = vals["m"] * vals["a"]
        steps = [
            f"Given: m = {_num(vals['m'])} kg, a = {_num(vals['a'])} m/s²",
            f"Formula: F = ma (Newton's Second Law)",
            f"Substitute: F = {_num(vals['m'])} × {_num(vals['a'])}",
            f"Result: F = {_num(F)} N",
        ]
        return _result(steps, f"F = {_num(F)} N")

    # a = F/m
    if "F" in vals and "m" in vals and "a" not in vals:
        a = vals["F"] / vals["m"]
        steps = [
            f"Given: F = {_num(vals['F'])} N, m = {_num(vals['m'])} kg",
            f"Formula: a = F / m",
            f"Substitute: a = {_num(vals['F'])} / {_num(vals['m'])}",
            f"Result: a = {_num(a)} m/s²",
        ]
        return _result(steps, f"a = {_num(a)} m/s²")

    # m = F/a
    if "F" in vals and "a" in vals and "m" not in vals:
        m = vals["F"] / vals["a"]
        steps = [
            f"Given: F = {_num(vals['F'])} N, a = {_num(vals['a'])} m/s²",
            f"Formula: m = F / a",
            f"Substitute: m = {_num(vals['F'])} / {_num(vals['a'])}",
            f"Result: m = {_num(m)} kg",
        ]
        return _result(steps, f"m = {_num(m)} kg")

    return None


def solve_energy(message: str) -> Optional[ComputeResult]:
    """KE = ½mv², PE = mgh, W = Fs"""
    vals = {}
    
    # Kinetic energy
    if any(kw in message for kw in ["kinetic energy", "ke", "energy of motion"]):
        vals = _extract_numbers(message, {
            "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*kg\b',
            "v": r'(?:velocity|speed|v)\s*=?\s*(\d+\.?\d*)\s*m/s',
        })
        if "m" in vals and "v" in vals:
            ke = 0.5 * vals["m"] * vals["v"]**2
            steps = [
                f"Given: m = {_num(vals['m'])} kg, v = {_num(vals['v'])} m/s",
                f"Formula: KE = ½mv²",
                f"Substitute: KE = ½ × {_num(vals['m'])} × {_num(vals['v'])}²",
                f"Result: KE = {_num(ke)} J",
            ]
            return _result(steps, f"KE = {_num(ke)} J")

    # Potential energy
    if any(kw in message for kw in ["potential energy", "pe", "gravitational energy"]):
        vals = _extract_numbers(message, {
            "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*kg\b',
            "h": r'(?:height|h)\s*=?\s*(\d+\.?\d*)\s*m\b',
            "g": r'g\s*=?\s*(\d+\.?\d*)\s*m/s',
        })
        if "m" in vals and "h" in vals:
            g = vals.get("g", 9.8)
            pe = vals["m"] * g * vals["h"]
            steps = [
                f"Given: m = {_num(vals['m'])} kg, h = {_num(vals['h'])} m, g = {_num(g)} m/s²",
                f"Formula: PE = mgh",
                f"Substitute: PE = {_num(vals['m'])} × {_num(g)} × {_num(vals['h'])}",
                f"Result: PE = {_num(pe)} J",
            ]
            return _result(steps, f"PE = {_num(pe)} J")

    # Work done
    if any(kw in message for kw in ["work done", "work = ", "calculate work"]):
        vals = _extract_numbers(message, {
            "F": r'(?:force|f)\s*=?\s*(\d+\.?\d*)\s*N\b',
            "s": r'(?:distance|displacement|s)\s*=?\s*(\d+\.?\d*)\s*m\b',
        })
        if "F" in vals and "s" in vals:
            w = vals["F"] * vals["s"]
            steps = [
                f"Given: F = {_num(vals['F'])} N, s = {_num(vals['s'])} m",
                f"Formula: W = Fs",
                f"Substitute: W = {_num(vals['F'])} × {_num(vals['s'])}",
                f"Result: W = {_num(w)} J",
            ]
            return _result(steps, f"W = {_num(w)} J")

    # Power
    if any(kw in message for kw in ["power", "watt"]):
        vals = _extract_numbers(message, {
            "W": r'(?:work|energy|w)\s*=?\s*(\d+\.?\d*)\s*J\b',
            "t": r'(?:time|t)\s*=?\s*(\d+\.?\d*)\s*s\b',
        })
        if "W" in vals and "t" in vals:
            p = vals["W"] / vals["t"]
            steps = [
                f"Given: W = {_num(vals['W'])} J, t = {_num(vals['t'])} s",
                f"Formula: P = W / t",
                f"Substitute: P = {_num(vals['W'])} / {_num(vals['t'])}",
                f"Result: P = {_num(p)} W",
            ]
            return _result(steps, f"P = {_num(p)} W")

    return None


def solve_momentum(message: str) -> Optional[ComputeResult]:
    """p = mv, impulse = FΔt = Δp"""
    if not any(kw in message for kw in ["momentum", "impulse"]):
        return None

    vals = _extract_numbers(message, {
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*kg\b',
        "v": r'(?:velocity|speed|v)\s*=?\s*(\d+\.?\d*)\s*m/s',
        "F": r'(?:force|f)\s*=?\s*(\d+\.?\d*)\s*N\b',
        "t": r'(?:time|t)\s*=?\s*(\d+\.?\d*)\s*s\b',
    })

    # p = mv
    if "m" in vals and "v" in vals:
        p = vals["m"] * vals["v"]
        steps = [
            f"Given: m = {_num(vals['m'])} kg, v = {_num(vals['v'])} m/s",
            f"Formula: p = mv",
            f"Substitute: p = {_num(vals['m'])} × {_num(vals['v'])}",
            f"Result: p = {_num(p)} kg·m/s",
        ]
        return _result(steps, f"p = {_num(p)} kg·m/s")

    # Impulse = FΔt
    if "F" in vals and "t" in vals:
        impulse = vals["F"] * vals["t"]
        steps = [
            f"Given: F = {_num(vals['F'])} N, t = {_num(vals['t'])} s",
            f"Formula: Impulse = F × Δt",
            f"Substitute: Impulse = {_num(vals['F'])} × {_num(vals['t'])}",
            f"Result: Impulse = {_num(impulse)} N·s",
        ]
        return _result(steps, f"Impulse = {_num(impulse)} N·s")

    return None


def solve_gravitation(message: str) -> Optional[ComputeResult]:
    """F = Gm₁m₂/r², g = GM/r², orbital velocity, escape velocity"""
    if not any(kw in message for kw in ["gravity", "gravitation", "gravitational",
                                         "escape velocity", "orbital", "satellite",
                                         "weight", "g = ", "acceleration due to gravity"]):
        return None

    G = 6.674e-11

    # Escape velocity: v = √(2GM/R)
    if "escape" in message:
        vals = _extract_numbers(message, {
            "M": r'(?:mass|m)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*kg\b',
            "R": r'(?:radius|r)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m\b',
        })
        if "M" in vals and "R" in vals:
            v = math.sqrt(2 * G * vals["M"] / vals["R"])
            steps = [
                f"Given: M = {_num(vals['M'])} kg, R = {_num(vals['R'])} m",
                f"Formula: v_escape = √(2GM/R)",
                f"G = 6.674×10⁻¹¹ N·m²/kg²",
                f"Substitute: v = √(2 × 6.674×10⁻¹¹ × {_num(vals['M'])} / {_num(vals['R'])})",
                f"Result: v = {_num(v)} m/s",
            ]
            return _result(steps, f"v_escape = {_num(v)} m/s")

    # Gravitational force: F = Gm₁m₂/r²
    if "force" in message:
        vals = _extract_numbers(message, {
            "m1": r'(?:m1|m₁|mass.*?1)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*kg\b',
            "m2": r'(?:m2|m₂|mass.*?2)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*kg\b',
            "r": r'(?:distance|r|d)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m\b',
        })
        if "m1" in vals and "m2" in vals and "r" in vals:
            F = G * vals["m1"] * vals["m2"] / vals["r"]**2
            steps = [
                f"Given: m₁ = {_num(vals['m1'])} kg, m₂ = {_num(vals['m2'])} kg, r = {_num(vals['r'])} m",
                f"Formula: F = Gm₁m₂/r²",
                f"G = 6.674×10⁻¹¹ N·m²/kg²",
                f"Result: F = {_num(F)} N",
            ]
            return _result(steps, f"F = {_num(F)} N")

    # g = GM/r²
    vals = _extract_numbers(message, {
        "M": r'(?:mass|m)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*kg\b',
        "R": r'(?:radius|r)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m\b',
    })
    if "M" in vals and "R" in vals:
        g = G * vals["M"] / vals["R"]**2
        steps = [
            f"Given: M = {_num(vals['M'])} kg, R = {_num(vals['R'])} m",
            f"Formula: g = GM/R²",
            f"Result: g = {_num(g)} m/s²",
        ]
        return _result(steps, f"g = {_num(g)} m/s²")

    # Weight = mg
    vals = _extract_numbers(message, {
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*kg\b',
        "g": r'g\s*=?\s*(\d+\.?\d*)\s*m/s',
    })
    if "m" in vals and "g" in vals:
        w = vals["m"] * vals["g"]
        steps = [
            f"Given: m = {_num(vals['m'])} kg, g = {_num(vals['g'])} m/s²",
            f"Formula: W = mg",
            f"Result: W = {_num(w)} N",
        ]
        return _result(steps, f"W = {_num(w)} N")

    return None


def solve_projectile(message: str) -> Optional[ComputeResult]:
    """Projectile motion: range, max height, time of flight"""
    if not any(kw in message for kw in ["projectile", "range", "maximum height",
                                         "time of flight", "launched", "angle"]):
        return None

    vals = _extract_numbers(message, {
        "u": r'(?:velocity|speed|u|v)\s*=?\s*(\d+\.?\d*)\s*m/s',
        "theta": r'(?:angle|theta|θ)\s*=?\s*(\d+\.?\d*)\s*(?:degree|°|rad)',
    })

    if "u" not in vals or "theta" not in vals:
        return None

    theta_rad = math.radians(vals["theta"])
    g = 9.8

    # Range: R = u²sin(2θ)/g
    R = vals["u"]**2 * math.sin(2 * theta_rad) / g
    # Max height: H = u²sin²(θ)/(2g)
    H = vals["u"]**2 * math.sin(theta_rad)**2 / (2 * g)
    # Time of flight: T = 2usin(θ)/g
    T = 2 * vals["u"] * math.sin(theta_rad) / g

    # Determine what's being asked
    if "range" in message:
        steps = [
            f"Given: u = {_num(vals['u'])} m/s, θ = {_num(vals['theta'])}°",
            f"Formula: R = u²sin(2θ) / g",
            f"Substitute: R = {_num(vals['u'])}² × sin({_num(2*vals['theta'])}°) / 9.8",
            f"Result: R = {_num(R)} m",
        ]
        return _result(steps, f"Range = {_num(R)} m")
    elif "height" in message:
        steps = [
            f"Given: u = {_num(vals['u'])} m/s, θ = {_num(vals['theta'])}°",
            f"Formula: H = u²sin²(θ) / (2g)",
            f"Result: H = {_num(H)} m",
        ]
        return _result(steps, f"Max Height = {_num(H)} m")
    elif "time" in message:
        steps = [
            f"Given: u = {_num(vals['u'])} m/s, θ = {_num(vals['theta'])}°",
            f"Formula: T = 2usin(θ) / g",
            f"Result: T = {_num(T)} s",
        ]
        return _result(steps, f"Time of Flight = {_num(T)} s")
    else:
        # Return all
        steps = [
            f"Given: u = {_num(vals['u'])} m/s, θ = {_num(vals['theta'])}°, g = 9.8 m/s²",
            f"Range: R = u²sin(2θ)/g = {_num(R)} m",
            f"Max Height: H = u²sin²(θ)/(2g) = {_num(H)} m",
            f"Time of Flight: T = 2usin(θ)/g = {_num(T)} s",
        ]
        return _result(steps, f"R = {_num(R)} m, H = {_num(H)} m, T = {_num(T)} s")

    return None


def solve_circular_motion(message: str) -> Optional[ComputeResult]:
    """Centripetal force: F = mv²/r, centripetal acceleration: a = v²/r"""
    if not any(kw in message for kw in ["centripetal", "circular motion", "centrifugal"]):
        return None

    vals = _extract_numbers(message, {
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*kg\b',
        "v": r'(?:velocity|speed|v)\s*=?\s*(\d+\.?\d*)\s*m/s',
        "r": r'(?:radius|r)\s*=?\s*(\d+\.?\d*)\s*m\b',
    })

    if "v" in vals and "r" in vals:
        a = vals["v"]**2 / vals["r"]
        if "m" in vals:
            F = vals["m"] * a
            steps = [
                f"Given: m = {_num(vals['m'])} kg, v = {_num(vals['v'])} m/s, r = {_num(vals['r'])} m",
                f"Formula: F = mv²/r",
                f"Substitute: F = {_num(vals['m'])} × {_num(vals['v'])}² / {_num(vals['r'])}",
                f"Result: F = {_num(F)} N, a = {_num(a)} m/s²",
            ]
            return _result(steps, f"F = {_num(F)} N, a = {_num(a)} m/s²")
        else:
            steps = [
                f"Given: v = {_num(vals['v'])} m/s, r = {_num(vals['r'])} m",
                f"Formula: a = v²/r",
                f"Result: a = {_num(a)} m/s²",
            ]
            return _result(steps, f"a = {_num(a)} m/s²")

    return None


def solve_shm(message: str) -> Optional[ComputeResult]:
    """Simple Harmonic Motion: T = 2π√(m/k), T = 2π√(l/g), a = -ω²x"""
    if not any(kw in message for kw in ["simple harmonic", "shm", "pendulum",
                                         "spring", "oscillation", "time period"]):
        return None

    # Simple pendulum: T = 2π√(l/g)
    if "pendulum" in message or ("length" in message and "time" in message):
        vals = _extract_numbers(message, {
            "l": r'(?:length|l)\s*=?\s*(\d+\.?\d*)\s*m\b',
            "g": r'g\s*=?\s*(\d+\.?\d*)\s*m/s',
        })
        if "l" in vals:
            g = vals.get("g", 9.8)
            T = 2 * math.pi * math.sqrt(vals["l"] / g)
            steps = [
                f"Given: l = {_num(vals['l'])} m, g = {_num(g)} m/s²",
                f"Formula: T = 2π√(l/g)",
                f"Substitute: T = 2π√({_num(vals['l'])}/{_num(g)})",
                f"Result: T = {_num(T)} s",
            ]
            return _result(steps, f"T = {_num(T)} s")

    # Spring-mass: T = 2π√(m/k)
    if "spring" in message:
        vals = _extract_numbers(message, {
            "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*kg\b',
            "k": r'(?:spring.*?constant|k)\s*=?\s*(\d+\.?\d*)\s*N/m',
        })
        if "m" in vals and "k" in vals:
            T = 2 * math.pi * math.sqrt(vals["m"] / vals["k"])
            steps = [
                f"Given: m = {_num(vals['m'])} kg, k = {_num(vals['k'])} N/m",
                f"Formula: T = 2π√(m/k)",
                f"Substitute: T = 2π√({_num(vals['m'])}/{_num(vals['k'])})",
                f"Result: T = {_num(T)} s",
            ]
            return _result(steps, f"T = {_num(T)} s")

    return None


# --------------------------------------------------------------------------- #
# Thermodynamics
# --------------------------------------------------------------------------- #

def solve_heat(message: str) -> Optional[ComputeResult]:
    """Q = mcΔT, latent heat Q = mL"""
    if not any(kw in message for kw in ["heat", "thermal", "calorimetry", "specific heat"]):
        return None

    # Q = mcΔT
    vals = _extract_numbers(message, {
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*(?:kg|g)\b',
        "c": r'(?:specific\s+heat|c)\s*=?\s*(\d+\.?\d*)\s*J/kg',
        "dT": r'(?:delta\s*t|δt|temperature.*?change|dt)\s*=?\s*(\d+\.?\d*)\s*(?:°c|k|c)\b',
        "T1": r'(?:t1|initial.*?temp)\s*=?\s*(\d+\.?\d*)\s*°?',
        "T2": r'(?:t2|final.*?temp)\s*=?\s*(\d+\.?\d*)\s*°?',
    })

    if "dT" not in vals and "T1" in vals and "T2" in vals:
        vals["dT"] = abs(vals["T2"] - vals["T1"])

    if "m" in vals and "c" in vals and "dT" in vals:
        # Convert grams to kg
        m = vals["m"] if "kg" in message else vals["m"] / 1000
        # Check if c is in J/g°C (common) or J/kg°C
        Q = m * vals["c"] * vals["dT"]
        # If Q seems too large, c was probably in J/kg°C and m in kg
        if Q > 1e6 and "g" in message and "kg" not in message:
            Q = vals["m"] * vals["c"] * vals["dT"]  # keep m in grams, c in J/g°C
        steps = [
            f"Given: m = {_num(vals['m'])}, c = {_num(vals['c'])}, ΔT = {_num(vals['dT'])}°C",
            f"Formula: Q = mcΔT",
            f"Substitute: Q = {_num(vals['m'])} × {_num(vals['c'])} × {_num(vals['dT'])}",
            f"Result: Q = {_num(Q)} J",
        ]
        return _result(steps, f"Q = {_num(Q)} J")

    # Latent heat: Q = mL
    if "latent" in message or "fusion" in message or "vaporization" in message:
        vals = _extract_numbers(message, {
            "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*)\s*(?:kg|g)\b',
            "L": r'(?:latent\s+heat|l)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*J/kg',
        })
        if "m" in vals and "L" in vals:
            Q = vals["m"] * vals["L"]
            steps = [
                f"Given: m = {_num(vals['m'])} kg, L = {_num(vals['L'])} J/kg",
                f"Formula: Q = mL",
                f"Result: Q = {_num(Q)} J",
            ]
            return _result(steps, f"Q = {_num(Q)} J")

    return None


def solve_gas_laws(message: str) -> Optional[ComputeResult]:
    """PV = nRT, Boyle's law, Charles's law, ideal gas"""
    if not any(kw in message for kw in ["gas law", "ideal gas", "boyle", "charles",
                                         "pressure.*volume", "pv = ", "pv=", "mole.*gas"]):
        return None

    R = 8.314  # J/(mol·K)

    vals = _extract_numbers(message, {
        "P": r'(?:pressure|p)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:pa|atm|kpa)\b',
        "V": r'(?:volume|v)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:l|m³|m3)\b',
        "n": r'(?:mole|n)\s*=?\s*(\d+\.?\d*)\s*mol\b',
        "T": r'(?:temperature|t)\s*=?\s*(\d+\.?\d*)\s*(?:k|°c)\b',
    })

    if len(vals) < 3:
        return None

    # Convert temperature to Kelvin
    if "T" in vals:
        # Check if temperature is in Celsius
        if "°c" in message or "celsius" in message:
            vals["T"] = vals["T"] + 273.15
        # Convert pressure to Pa if in atm
        if "P" in vals and "atm" in message:
            vals["P"] = vals["P"] * 101325
        # Convert volume to m³ if in L
        if "V" in vals and ("l" in message and "m³" not in message and "m3" not in message):
            vals["V"] = vals["V"] * 0.001

    # PV = nRT — find the missing variable
    if "P" in vals and "V" in vals and "n" in vals and "T" in vals:
        # All given — verify
        PV = vals["P"] * vals["V"]
        nRT = vals["n"] * R * vals["T"]
        return _result([f"PV = {_num(PV)}, nRT = {_num(nRT)}"], f"PV = {_num(PV)} J, nRT = {_num(nRT)} J")

    # Find P
    if "V" in vals and "n" in vals and "T" in vals and "P" not in vals:
        P = vals["n"] * R * vals["T"] / vals["V"]
        steps = [
            f"Given: V = {_num(vals['V'])} m³, n = {_num(vals['n'])} mol, T = {_num(vals['T'])} K",
            f"Formula: P = nRT / V",
            f"R = 8.314 J/(mol·K)",
            f"Result: P = {_num(P)} Pa",
        ]
        return _result(steps, f"P = {_num(P)} Pa")

    # Find V
    if "P" in vals and "n" in vals and "T" in vals and "V" not in vals:
        V = vals["n"] * R * vals["T"] / vals["P"]
        steps = [
            f"Given: P = {_num(vals['P'])} Pa, n = {_num(vals['n'])} mol, T = {_num(vals['T'])} K",
            f"Formula: V = nRT / P",
            f"Result: V = {_num(V)} m³",
        ]
        return _result(steps, f"V = {_num(V)} m³")

    # Find n
    if "P" in vals and "V" in vals and "T" in vals and "n" not in vals:
        n = vals["P"] * vals["V"] / (R * vals["T"])
        steps = [
            f"Given: P = {_num(vals['P'])} Pa, V = {_num(vals['V'])} m³, T = {_num(vals['T'])} K",
            f"Formula: n = PV / RT",
            f"Result: n = {_num(n)} mol",
        ]
        return _result(steps, f"n = {_num(n)} mol")

    # Find T
    if "P" in vals and "V" in vals and "n" in vals and "T" not in vals:
        T = vals["P"] * vals["V"] / (vals["n"] * R)
        steps = [
            f"Given: P = {_num(vals['P'])} Pa, V = {_num(vals['V'])} m³, n = {_num(vals['n'])} mol",
            f"Formula: T = PV / nR",
            f"Result: T = {_num(T)} K",
        ]
        return _result(steps, f"T = {_num(T)} K")

    return None


# --------------------------------------------------------------------------- #
# Electromagnetism
# --------------------------------------------------------------------------- #

def solve_electricity(message: str) -> Optional[ComputeResult]:
    """Ohm's law V=IR, Power P=VI=I²R=V²/R, Series/Parallel resistance"""
    if not any(kw in message for kw in ["ohm", "voltage", "current", "resistance",
                                         "circuit", "electric power", "potential difference"]):
        return None

    vals = _extract_numbers(message, {
        "V": r'(?:voltage|v|potential)\s*=?\s*(\d+\.?\d*)\s*V\b',
        "I": r'(?:current|i)\s*=?\s*(\d+\.?\d*)\s*A\b',
        "R": r'(?:resistance|r)\s*=?\s*(\d+\.?\d*)\s*(?:ohm|Ω|ω)\b',
    })

    if len(vals) < 2:
        return None

    # V = IR
    if "I" in vals and "R" in vals and "V" not in vals:
        V = vals["I"] * vals["R"]
        steps = [
            f"Given: I = {_num(vals['I'])} A, R = {_num(vals['R'])} Ω",
            f"Formula: V = IR (Ohm's Law)",
            f"Substitute: V = {_num(vals['I'])} × {_num(vals['R'])}",
            f"Result: V = {_num(V)} V",
        ]
        return _result(steps, f"V = {_num(V)} V")

    if "V" in vals and "R" in vals and "I" not in vals:
        I = vals["V"] / vals["R"]
        steps = [
            f"Given: V = {_num(vals['V'])} V, R = {_num(vals['R'])} Ω",
            f"Formula: I = V / R",
            f"Result: I = {_num(I)} A",
        ]
        return _result(steps, f"I = {_num(I)} A")

    if "V" in vals and "I" in vals and "R" not in vals:
        R = vals["V"] / vals["I"]
        steps = [
            f"Given: V = {_num(vals['V'])} V, I = {_num(vals['I'])} A",
            f"Formula: R = V / I",
            f"Result: R = {_num(R)} Ω",
        ]
        return _result(steps, f"R = {_num(R)} Ω")

    # Power
    if "power" in message:
        if "V" in vals and "I" in vals:
            P = vals["V"] * vals["I"]
            steps = [
                f"Given: V = {_num(vals['V'])} V, I = {_num(vals['I'])} A",
                f"Formula: P = VI",
                f"Result: P = {_num(P)} W",
            ]
            return _result(steps, f"P = {_num(P)} W")
        if "I" in vals and "R" in vals:
            P = vals["I"]**2 * vals["R"]
            steps = [
                f"Given: I = {_num(vals['I'])} A, R = {_num(vals['R'])} Ω",
                f"Formula: P = I²R",
                f"Result: P = {_num(P)} W",
            ]
            return _result(steps, f"P = {_num(P)} W")
        if "V" in vals and "R" in vals:
            P = vals["V"]**2 / vals["R"]
            steps = [
                f"Given: V = {_num(vals['V'])} V, R = {_num(vals['R'])} Ω",
                f"Formula: P = V²/R",
                f"Result: P = {_num(P)} W",
            ]
            return _result(steps, f"P = {_num(P)} W")

    return None


def solve_capacitance(message: str) -> Optional[ComputeResult]:
    """Q = CV, Energy = ½CV², C = εA/d"""
    if not any(kw in message for kw in ["capacitor", "capacitance", "charge.*capacitor"]):
        return None

    vals = _extract_numbers(message, {
        "Q": r'(?:charge|q)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:c|μc|mc)\b',
        "C": r'(?:capacitance|c)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:f|μf|nf|pf)\b',
        "V": r'(?:voltage|v)\s*=?\s*(\d+\.?\d*)\s*V\b',
    })

    if len(vals) < 2:
        return None

    # Q = CV
    if "C" in vals and "V" in vals and "Q" not in vals:
        Q = vals["C"] * vals["V"]
        steps = [
            f"Given: C = {_num(vals['C'])} F, V = {_num(vals['V'])} V",
            f"Formula: Q = CV",
            f"Result: Q = {_num(Q)} C",
        ]
        return _result(steps, f"Q = {_num(Q)} C")

    # Energy = ½CV²
    if "energy" in message and "C" in vals and "V" in vals:
        U = 0.5 * vals["C"] * vals["V"]**2
        steps = [
            f"Given: C = {_num(vals['C'])} F, V = {_num(vals['V'])} V",
            f"Formula: U = ½CV²",
            f"Result: U = {_num(U)} J",
        ]
        return _result(steps, f"U = {_num(U)} J")

    return None


# --------------------------------------------------------------------------- #
# Optics
# --------------------------------------------------------------------------- #

def solve_lens_mirror(message: str) -> Optional[ComputeResult]:
    """Lens/mirror: 1/f = 1/v + 1/u, magnification m = v/u"""
    if not any(kw in message for kw in ["lens", "mirror", "focal length", "magnification",
                                         "image distance", "object distance"]):
        return None

    vals = _extract_numbers(message, {
        "f": r'focal\s+length\s*=?\s*(-?\d+\.?\d*)\s*cm\b',
        "u": r'object\s+distance\s*=?\s*(-?\d+\.?\d*)\s*cm\b',
        "v": r'image\s+distance\s*=?\s*(-?\d+\.?\d*)\s*cm\b',
    })

    if len(vals) < 2:
        return None

    # 1/f = 1/v + 1/u → find f
    if "u" in vals and "v" in vals and "f" not in vals:
        # Convention: u is negative (object distance)
        u = -abs(vals["u"])
        v = vals["v"]
        f = (u * v) / (u + v) if (u + v) != 0 else None
        if f:
            m = v / u
            steps = [
                f"Given: u = {_num(abs(vals['u']))} cm, v = {_num(vals['v'])} cm",
                f"Formula: 1/f = 1/v + 1/u (Cartesian sign convention)",
                f"Substitute: 1/f = 1/{_num(v)} + 1/{_num(u)}",
                f"Result: f = {_num(f)} cm, magnification m = {_num(m)}",
            ]
            return _result(steps, f"f = {_num(f)} cm, m = {_num(m)}")

    # Find v (using lens formula: 1/f = 1/v + 1/u, real-is-positive convention)
    # u positive for real object, f positive for convex lens
    if "f" in vals and "u" in vals and "v" not in vals:
        u = abs(vals["u"])
        f = vals["f"]
        # 1/v = 1/f - 1/u  →  v = fu/(u-f)
        if (u - f) == 0:
            return None
        v = (f * u) / (u - f)
        m = -v / u  # magnification is negative for real image (inverted)
        steps = [
            f"Given: f = {_num(f)} cm, u = {_num(u)} cm",
            f"Formula: 1/f = 1/v + 1/u (lens formula, real-is-positive)",
            f"Substitute: 1/v = 1/{_num(f)} - 1/{_num(u)} = {_num(round(1/f - 1/u, 6))}",
            f"Result: v = {_num(v)} cm, m = {_num(m)}",
        ]
        return _result(steps, f"v = {_num(v)} cm, m = {_num(m)}")

    # Find u
    if "f" in vals and "v" in vals and "u" not in vals:
        f = vals["f"]
        v = vals["v"]
        u = (f * v) / (v - f) if (v - f) != 0 else None
        if u:
            steps = [
                f"Given: f = {_num(f)} cm, v = {_num(v)} cm",
                f"Formula: 1/u = 1/f - 1/v",
                f"Result: u = {_num(abs(u))} cm",
            ]
            return _result(steps, f"u = {_num(abs(u))} cm")

    return None


def solve_refraction(message: str) -> Optional[ComputeResult]:
    """Snell's law: n₁sin(θ₁) = n₂sin(θ₂), n = c/v"""
    if not any(kw in message for kw in ["refraction", "snell", "refractive index",
                                         "critical angle", "total internal reflection"]):
        return None

    vals = _extract_numbers(message, {
        "n1": r'(?:n1|n₁|refractive.*?index.*?1)\s*=?\s*(\d+\.?\d*)',
        "n2": r'(?:n2|n₂|refractive.*?index.*?2)\s*=?\s*(\d+\.?\d*)',
        "theta1": r'(?:angle.*?incidence|theta1|θ1|i)\s*=?\s*(\d+\.?\d*)\s*(?:degree|°)',
        "theta2": r'(?:angle.*?refraction|theta2|θ2|r)\s*=?\s*(\d+\.?\d*)\s*(?:degree|°)',
        "n": r'(?:refractive.*?index|n)\s*=?\s*(\d+\.?\d*)',
    })

    # Snell's law: find angle of refraction
    if "n1" in vals and "n2" in vals and "theta1" in vals and "theta2" not in vals:
        sin_t2 = vals["n1"] * math.sin(math.radians(vals["theta1"])) / vals["n2"]
        if sin_t2 <= 1:
            theta2 = math.degrees(math.asin(sin_t2))
            steps = [
                f"Given: n₁ = {_num(vals['n1'])}, n₂ = {_num(vals['n2'])}, θ₁ = {_num(vals['theta1'])}°",
                f"Formula: n₁sin(θ₁) = n₂sin(θ₂)",
                f"Substitute: sin(θ₂) = {_num(vals['n1'])} × sin({_num(vals['theta1'])}°) / {_num(vals['n2'])}",
                f"Result: θ₂ = {_num(theta2)}°",
            ]
            return _result(steps, f"θ₂ = {_num(theta2)}°")
        else:
            return _result(["Total internal reflection occurs (sin θ₂ > 1)"],
                          "Total internal reflection — no refraction")

    # Critical angle: sin(θc) = n₂/n₁
    if "critical" in message and "n1" in vals and "n2" in vals:
        sin_c = vals["n2"] / vals["n1"]
        if sin_c <= 1:
            theta_c = math.degrees(math.asin(sin_c))
            steps = [
                f"Given: n₁ = {_num(vals['n1'])}, n₂ = {_num(vals['n2'])}",
                f"Formula: sin(θc) = n₂/n₁",
                f"Result: θc = {_num(theta_c)}°",
            ]
            return _result(steps, f"Critical angle = {_num(theta_c)}°")

    return None


# --------------------------------------------------------------------------- #
# Modern Physics
# --------------------------------------------------------------------------- #

def solve_photoelectric(message: str) -> Optional[ComputeResult]:
    """Photoelectric effect: KE = hν - φ, hc/λ"""
    if not any(kw in message for kw in ["photoelectric", "work function", "photon energy"]):
        return None

    h = 6.626e-34  # Planck's constant
    c = 3e8        # Speed of light

    vals = _extract_numbers(message, {
        "lambda": r'(?:wavelength|lambda|λ)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:nm|m|Å|angstrom)\b',
        "phi": r'(?:work\s+function|phi|φ)\s*=?\s*(\d+\.?\d*)\s*(?:ev|j)\b',
        "freq": r'(?:frequency|nu|ν|f)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*hz\b',
    })

    # Photon energy from wavelength: E = hc/λ
    if "lambda" in vals:
        lam = vals["lambda"]
        # Convert nm to m
        if "nm" in message:
            lam = lam * 1e-9
        elif "Å" in message or "angstrom" in message:
            lam = lam * 1e-10

        E = h * c / lam  # in Joules
        E_eV = E / 1.6e-19  # convert to eV

        if "phi" in vals:
            phi_J = vals["phi"] * 1.6e-19 if "ev" in message else vals["phi"]
            KE = E - phi_J
            KE_eV = KE / 1.6e-19
            steps = [
                f"Given: λ = {_num(vals['lambda'])} nm, φ = {_num(vals['phi'])} eV",
                f"Photon energy: E = hc/λ = {_num(E_eV)} eV",
                f"Formula: KE = hν - φ",
                f"Result: KE = {_num(KE_eV)} eV",
            ]
            return _result(steps, f"KE = {_num(KE_eV)} eV")
        else:
            steps = [
                f"Given: λ = {_num(vals['lambda'])} nm",
                f"Formula: E = hc/λ",
                f"Result: E = {_num(E_eV)} eV ({_num(E)} J)",
            ]
            return _result(steps, f"E = {_num(E_eV)} eV")

    # Photon energy from frequency
    if "freq" in vals and "phi" in vals:
        E = h * vals["freq"]
        phi_J = vals["phi"] * 1.6e-19 if "ev" in message else vals["phi"]
        KE = E - phi_J
        KE_eV = KE / 1.6e-19
        steps = [
            f"Given: ν = {_num(vals['freq'])} Hz, φ = {_num(vals['phi'])} eV",
            f"Formula: KE = hν - φ",
            f"Result: KE = {_num(KE_eV)} eV",
        ]
        return _result(steps, f"KE = {_num(KE_eV)} eV")

    return None


def solve_de_broglie(message: str) -> Optional[ComputeResult]:
    """de Broglie wavelength: λ = h/p = h/mv"""
    if not any(kw in message for kw in ["de broglie", "broglie wavelength", "matter wave"]):
        return None

    h = 6.626e-34

    vals = _extract_numbers(message, {
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*kg\b',
        "v": r'(?:velocity|speed|v)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m/s',
        "p": r'(?:momentum|p)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*kg',
    })

    if "m" in vals and "v" in vals:
        lam = h / (vals["m"] * vals["v"])
        steps = [
            f"Given: m = {_num_sci(vals['m'])} kg, v = {_num_sci(vals['v'])} m/s",
            f"Formula: λ = h / (mv)",
            f"h = 6.626×10⁻³⁴ J·s",
            f"Result: λ = {_num_sci(lam)} m",
        ]
        return _result(steps, f"λ = {_num_sci(lam)} m")

    if "p" in vals:
        lam = h / vals["p"]
        steps = [
            f"Given: p = {_num_sci(vals['p'])} kg·m/s",
            f"Formula: λ = h / p",
            f"Result: λ = {_num_sci(lam)} m",
        ]
        return _result(steps, f"λ = {_num_sci(lam)} m")

    return None


def solve_mass_energy(message: str) -> Optional[ComputeResult]:
    """E = mc²"""
    if not any(kw in message for kw in ["mass energy", "e = mc", "e=mc", "energy equivalent",
                                         "rest mass energy", "mass defect"]):
        return None

    vals = _extract_numbers(message, {
        "m": r'(?:mass|m)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*kg\b',
    })

    if "m" in vals:
        c = 3e8
        E = vals["m"] * c**2
        steps = [
            f"Given: m = {_num(vals['m'])} kg",
            f"Formula: E = mc²",
            f"c = 3×10⁸ m/s",
            f"Result: E = {_num(E)} J",
        ]
        return _result(steps, f"E = {_num(E)} J")

    return None


# --------------------------------------------------------------------------- #
# Waves
# --------------------------------------------------------------------------- #

def solve_wave(message: str) -> Optional[ComputeResult]:
    """v = fλ, T = 1/f"""
    if not any(kw in message for kw in ["wave", "frequency", "wavelength",
                                         "speed of wave", "wave speed"]):
        return None

    vals = _extract_numbers(message, {
        "v": r'(?:speed|velocity|v)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*m/s',
        "f": r'(?:frequency|f)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:hz|khz|mhz)\b',
        "lambda": r'(?:wavelength|lambda|λ)\s*=?\s*(\d+\.?\d*(?:e[+-]?\d+)?)\s*(?:m|nm|cm|mm)\b',
    })

    if len(vals) < 2:
        return None

    # v = fλ
    if "f" in vals and "lambda" in vals and "v" not in vals:
        v = vals["f"] * vals["lambda"]
        steps = [
            f"Given: f = {_num(vals['f'])} Hz, λ = {_num(vals['lambda'])} m",
            f"Formula: v = fλ",
            f"Result: v = {_num(v)} m/s",
        ]
        return _result(steps, f"v = {_num(v)} m/s")

    if "v" in vals and "lambda" in vals and "f" not in vals:
        f = vals["v"] / vals["lambda"]
        steps = [
            f"Given: v = {_num(vals['v'])} m/s, λ = {_num(vals['lambda'])} m",
            f"Formula: f = v / λ",
            f"Result: f = {_num(f)} Hz",
        ]
        return _result(steps, f"f = {_num(f)} Hz")

    if "v" in vals and "f" in vals and "lambda" not in vals:
        lam = vals["v"] / vals["f"]
        steps = [
            f"Given: v = {_num(vals['v'])} m/s, f = {_num(vals['f'])} Hz",
            f"Formula: λ = v / f",
            f"Result: λ = {_num(lam)} m",
        ]
        return _result(steps, f"λ = {_num(lam)} m")

    return None


# --------------------------------------------------------------------------- #
# All physics solvers
# --------------------------------------------------------------------------- #

PHYSICS_SOLVERS = [
    solve_kinematics,
    solve_newtons_laws,
    solve_energy,
    solve_momentum,
    solve_gravitation,
    solve_projectile,
    solve_circular_motion,
    solve_shm,
    solve_heat,
    solve_gas_laws,
    solve_electricity,
    solve_capacitance,
    solve_lens_mirror,
    solve_refraction,
    solve_photoelectric,
    solve_de_broglie,
    solve_mass_energy,
    solve_wave,
]
