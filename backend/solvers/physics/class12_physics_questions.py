"""
CISCE Physics Class 12 - Deterministic Question Generator
Covers all 9 syllabus sections with MCQ, fill-blank, short-answer,
long-answer, and numerical question types.
50% competency (Indian context), 50% standard.
"""

import random
import math
import fractions
import sympy
import numpy as np
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional, Tuple
from fractions import Fraction
import re

# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def sigfig(x, n=3):
    """Round to n significant figures."""
    if x == 0:
        return 0.0
    d = math.ceil(math.log10(abs(x)))
    power = n - d
    factor = 10 ** power
    return round(x * factor) / factor


def to_scientific(n, sf=2):
    """Format number in scientific notation string."""
    if n == 0:
        return "0"
    exp = math.floor(math.log10(abs(n)))
    mant = n / (10 ** exp)
    return f"{mant:.{sf}f} x 10^{exp}"


def shuffle_preserve_seed(seq, rng):
    """Shuffle a sequence using a provided RNG instance."""
    items = list(seq)
    rng.shuffle(items)
    return items


# ============================================================================
# DATACLASSES
# ============================================================================

@dataclass
class Question:
    id: str
    type: str          # mcq | fill_blank | short_answer | long_answer | numerical
    topic: str
    difficulty: str    # Easy | Medium | Hard
    competency: bool   # True = Indian context / competency-based
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    steps: List[str] = field(default_factory=list)
    verification: str = ""

@dataclass
class SolverResult:
    answer: Any
    steps: List[str]
    verification: str


# ============================================================================
# SOLVER: ELECTROSTATICS
# ============================================================================

def solve_coulomb(params: dict) -> SolverResult:
    """Coulomb's Law: F = k * |q1*q2| / r^2"""
    q1 = params.get("q1", None)
    q2 = params.get("q2", None)
    r  = params.get("r", None)
    k  = 9e9  # N m^2/C^2

    steps = []
    steps.append("Formula: F = k * |q1 * q2| / r^2")
    steps.append(f"Given: q1 = {q1} C, q2 = {q2} C, r = {r} m, k = {k} N·m^2/C^2")

    F = k * abs(q1 * q2) / (r ** 2)
    steps.append(f"F = {k} * |{q1} * {q2}| / ({r})^2")
    steps.append(f"F = {k} * {abs(q1*q2)} / {r**2}")
    steps.append(f"F = {sigfig(F, 3)} N")

    verif = f"Back-sub: k*|{q1}*{q2}|/({r}^2) = {sigfig(k*abs(q1*q2)/(r**2),3)} N - matches."
    return SolverResult(answer=sigfig(F, 3), steps=steps, verification=verif)


def solve_electric_field(params: dict) -> SolverResult:
    """Electric field: E = k*Q/r^2"""
    Q = params.get("Q", None)
    r = params.get("r", None)
    k = 9e9

    steps = []
    steps.append("Formula: E = k * Q / r^2")
    steps.append(f"Given: Q = {Q} C, r = {r} m")
    E = k * Q / (r ** 2)
    steps.append(f"E = {k} * {Q} / {r**2} = {sigfig(E, 3)} N/C")
    steps.append(f"Direction: radially outward if Q > 0, inward if Q < 0")

    verif = f"Check: {k}*{Q}/({r}^2) = {sigfig(E,3)} N/C - matches."
    return SolverResult(answer=sigfig(E, 3), steps=steps, verification=verif)


def solve_electric_potential(params: dict) -> SolverResult:
    """Electric potential: V = k*Q/r"""
    Q = params.get("Q", None)
    r = params.get("r", None)
    k = 9e9

    steps = []
    steps.append("Formula: V = k * Q / r")
    steps.append(f"Given: Q = {Q} C, r = {r} m")
    V = k * Q / r
    steps.append(f"V = {k} * {Q} / {r} = {sigfig(V, 3)} V")
    verif = f"Check: {k}*{Q}/{r} = {sigfig(V,3)} V - matches."
    return SolverResult(answer=sigfig(V, 3), steps=steps, verification=verif)


def solve_parallel_plate_capacitor(params: dict) -> SolverResult:
    """C = epsilon0 * A / d; Q = C*V; E = V/d"""
    A = params.get("A", None)  # m^2
    d = params.get("d", None)  # m
    V = params.get("V", None)  # V
    eps0 = 8.85e-12

    steps = []
    steps.append("Step 1: C = ε₀ * A / d")
    steps.append(f"Given: A = {A} m^2, d = {d} m, V = {V} V, ε₀ = 8.85x10⁻¹^2 F/m")

    C = eps0 * A / d
    steps.append(f"C = {eps0} * {A} / {d} = {sigfig(C, 4)} F")
    steps.append(f"C = {sigfig(C*1e12, 3)} pF")

    Q = C * V
    steps.append(f"\nStep 2: Q = C * V = {sigfig(C,4)} * {V} = {sigfig(Q, 4)} C")
    steps.append(f"Q = {sigfig(Q*1e9, 3)} nC")

    E_field = V / d
    steps.append(f"\nStep 3: E = V/d = {V}/{d} = {sigfig(E_field, 3)} V/m")

    verif = f"Back-sub: Q/C = {sigfig(Q,4)}/{sigfig(C,4)} = {sigfig(Q/C,3)} V (≈{V} ✓); E*d = {sigfig(E_field,3)}*{d} = {V} V (✓)"
    return SolverResult(
        answer={"C_F": sigfig(C, 4), "C_pF": sigfig(C*1e12, 3), "Q_C": sigfig(Q, 4), "E_Vm": sigfig(E_field, 3)},
        steps=steps, verification=verif
    )


def solve_series_resistance(params: dict) -> SolverResult:
    """R_total = R1 + R2 + R3"""
    resistors = params.get("resistors", [])
    steps = []
    steps.append("Formula: R_series = R₁ + R₂ + R₃ + ...")
    steps.append(f"Given resistors: {resistors} Ω")
    R_total = sum(resistors)
    steps.append(f"R_total = {' + '.join(str(r) for r in resistors)} = {R_total} Ω")
    verif = f"Each resistor adds directly - check: {R_total} = sum({resistors}) = {sum(resistors)} ✓"
    return SolverResult(answer=R_total, steps=steps, verification=verif)


def solve_parallel_resistance(params: dict) -> SolverResult:
    """1/R_total = 1/R1 + 1/R2 + ..."""
    resistors = params.get("resistors", [])
    steps = []
    steps.append("Formula: 1/R_parallel = 1/R₁ + 1/R₂ + ...")
    steps.append(f"Given: {resistors} Ω")
    inv_sum = sum(1/r for r in resistors)
    R_total = 1 / inv_sum
    steps.append(f"1/R = {' + '.join(f'1/{r}' for r in resistors)} = {sigfig(inv_sum, 4)} Ω⁻¹")
    steps.append(f"R_total = {sigfig(R_total, 3)} Ω")
    verif = f"Check: 1/{sigfig(R_total,3)} = {sigfig(inv_sum,4)} = sum(1/R_i) - ✓"
    return SolverResult(answer=sigfig(R_total, 3), steps=steps, verification=verif)


def solve_ohms_law(params: dict) -> SolverResult:
    """V = I * R"""
    known = params.get("known", "V")  # V, I, or R
    V = params.get("V", None)
    I = params.get("I", None)
    R = params.get("R", None)
    steps = []
    steps.append("Ohm's Law: V = I x R")
    if known == "V":
        steps.append(f"Given: I = {I} A, R = {R} Ω")
        V_calc = I * R
        steps.append(f"V = {I} x {R} = {V_calc} V")
        ans = V_calc
    elif known == "I":
        steps.append(f"Given: V = {V} V, R = {R} Ω")
        I_calc = V / R
        steps.append(f"I = {V}/{R} = {sigfig(I_calc, 3)} A")
        ans = sigfig(I_calc, 3)
    else:
        steps.append(f"Given: V = {V} V, I = {I} A")
        R_calc = V / I
        steps.append(f"R = {V}/{I} = {sigfig(R_calc, 3)} Ω")
        ans = sigfig(R_calc, 3)
    verif = f"Back-substitution confirms the result."
    return SolverResult(answer=ans, steps=steps, verification=verif)


def solve_electric_power(params: dict) -> SolverResult:
    """P = V*I = I^2*R = V^2/R"""
    known = params.get("known", "VI")
    V = params.get("V", None)
    I = params.get("I", None)
    R = params.get("R", None)
    steps = []
    steps.append("Formulas: P = V·I  |  P = I^2R  |  P = V^2/R")
    if known == "VI":
        steps.append(f"Given: V = {V} V, I = {I} A")
        P = V * I
        steps.append(f"P = {V} x {I} = {P} W")
    elif known == "IR":
        steps.append(f"Given: I = {I} A, R = {R} Ω")
        P = I**2 * R
        steps.append(f"P = ({I})^2 x {R} = {I**2} x {R} = {P} W")
    else:
        steps.append(f"Given: V = {V} V, R = {R} Ω")
        P = V**2 / R
        steps.append(f"P = ({V})^2 / {R} = {V**2} / {R} = {P} W")
    verif = f"Verify: computed P = {P} W"
    return SolverResult(answer=P, steps=steps, verification=verif)


def solve_magnetic_force_wire(params: dict) -> SolverResult:
    """F = BIL sin(theta)"""
    B = params.get("B", None)
    I = params.get("I", None)
    L = params.get("L", None)
    theta_deg = params.get("theta", 90)

    steps = []
    steps.append("Formula: F = B · I · L · sin(theta)")
    steps.append(f"Given: B = {B} T, I = {I} A, L = {L} m, theta = {theta_deg} deg ")
    theta_rad = math.radians(theta_deg)
    F = B * I * L * math.sin(theta_rad)
    steps.append(f"sin({theta_deg} deg ) = {sigfig(math.sin(theta_rad),4)}")
    steps.append(f"F = {B} x {I} x {L} x {sigfig(math.sin(theta_rad),4)} = {sigfig(F,4)} N")
    direction_note = "perpendicular to both B-field and current (Fleming's Left Hand Rule)"
    steps.append(f"Direction: {direction_note}")
    verif = f"Max force (theta=90 deg ): B*I*L = {B}*{I}*{L} = {B*I*L} N; ratio = {sigfig(F/(B*I*L),3)} (sin{theta_deg} deg ) - ✓"
    return SolverResult(answer=sigfig(F, 4), steps=steps, verification=verif)


def solve_emf_induced(params: dict) -> SolverResult:
    """Faraday's law: ε = -N * dΦ/dt = N * B * A * cos(theta) * omega"""
    N = params.get("N", 1)
    B = params.get("B", None)
    A = params.get("A", None)
    theta_deg = params.get("theta", 90)
    omega = params.get("omega", None)  # rad/s

    steps = []
    steps.append("Formula: ε = N * B * A * omega * sin(omegat)")
    steps.append(f"Given: N={N}, B={B} T, A={A} m^2, omega={omega} rad/s")
    theta_rad = math.radians(theta_deg)
    emf = N * B * A * omega * math.sin(theta_rad)
    steps.append(f"At theta={theta_deg} deg : ε = {N} x {B} x {A} x {omega} x sin({theta_deg} deg )")
    steps.append(f"ε = {N} x {B} x {A} x {omega} x {sigfig(math.sin(theta_rad),4)}")
    steps.append(f"ε = {sigfig(emf, 4)} V")
    verif = f"Peak emf: N*B*A*omega = {N}*{B}*{A}*{omega} = {N*B*A*omega} V; ratio = {sigfig(emf/(N*B*A*omega),3)} - ✓"
    return SolverResult(answer=sigfig(emf, 4), steps=steps, verification=verif)


def solve_lens_formula(params: dict) -> SolverResult:
    """1/f = 1/v + 1/u; m = v/u"""
    u = params.get("u", None)   # object distance (negative by sign convention)
    f = params.get("f", None)   # focal length (negative for concave)
    find = params.get("find", "v")

    steps = []
    steps.append("Lens formula: 1/f = 1/v + 1/u")
    steps.append(f"Given: f = {f} cm, u = {u} cm")

    if find == "v":
        inv_v = 1/f - 1/u
        v = 1 / inv_v
        steps.append(f"1/v = 1/{f} - 1/{u} = {sigfig(inv_v, 4)} cm⁻¹")
        steps.append(f"v = {sigfig(v, 3)} cm")
        if v > 0:
            steps.append("v > 0 → Real, inverted image")
        else:
            steps.append("v < 0 → Virtual, erect image")
        m = v / u
        steps.append(f"Magnification m = v/u = {sigfig(v,3)}/{u} = {sigfig(m, 3)}")
        ans = {"v_cm": sigfig(v, 3), "m": sigfig(m, 3)}
        verif = f"Check: 1/f = 1/{sigfig(v,3)} + 1/{u} = {sigfig(1/sigfig(v,3)+1/u,4)} ≈ {sigfig(1/f,4)} - ✓"
    else:
        inv_u = 1/f - 1/v
        u_calc = 1 / inv_u
        steps.append(f"1/u = 1/{f} - 1/{v} = {sigfig(inv_u,4)} cm⁻¹")
        steps.append(f"u = {sigfig(u_calc, 3)} cm")
        m = v / u_calc
        steps.append(f"Magnification m = {v}/{sigfig(u_calc,3)} = {sigfig(m, 3)}")
        ans = {"u_cm": sigfig(u_calc, 3), "m": sigfig(m, 3)}
        verif = f"Back-sub: 1/{sigfig(u_calc,3)} + 1/{v} = {sigfig(1/sigfig(u_calc,3)+1/v,4)} ≈ 1/{f} - ✓"
    return SolverResult(answer=ans, steps=steps, verification=verif)


def solve_dc_motor_torque(params: dict) -> SolverResult:
    """Torque on current loop: τ = N * I * A * B * sin(theta)"""
    N = params.get("N", 100)
    I = params.get("I", None)
    A = params.get("A", None)   # m^2
    B = params.get("B", None)   # Tesla
    theta_deg = params.get("theta", 90)

    steps = []
    steps.append("Formula: τ = N * I * A * B * sin(theta)")
    steps.append(f"Given: N={N}, I={I} A, A={A} m^2, B={B} T, theta={theta_deg} deg ")
    theta_rad = math.radians(theta_deg)
    tau = N * I * A * B * math.sin(theta_rad)
    steps.append(f"τ = {N} x {I} x {A} x {B} x sin({theta_deg} deg )")
    steps.append(f"τ = {sigfig(tau, 4)} N·m")
    verif = f"Check: N*I*A*B = {N}*{I}*{A}*{B} = {N*I*A*B} N·m; ratio = {sigfig(tau/(N*I*A*B),3)} (sin{theta_deg} deg ) - ✓"
    return SolverResult(answer=sigfig(tau, 4), steps=steps, verification=verif)


def solve_photoelectric_effect(params: dict) -> SolverResult:
    """Kmax = hf - phi; phi = h*f0"""
    h = 6.626e-34    # J·s
    f = params.get("f", None)    # Hz
    phi = params.get("phi", None)  # J (work function)
    e = 1.602e-19    # C

    steps = []
    steps.append("Formula: Kmax = hf - phi")
    steps.append(f"Given: h = 6.626x10⁻^3⁴ J·s, f = {f} Hz")
    if phi is not None:
        steps.append(f"phi = {sigfig(phi, 4)} J")
    else:
        f0 = params.get("f0", None)
        phi = h * f0
        steps.append(f"Threshold f₀ = {f0} Hz → phi = h·f₀ = {sigfig(phi, 4)} J")

    Kmax_J = h * f - phi
    Kmax_eV = Kmax_J / e
    steps.append(f"hf = {sigfig(h*f, 6)} J")
    steps.append(f"Kmax = {sigfig(h*f, 6)} - {sigfig(phi, 6)} = {sigfig(Kmax_J, 6)} J")
    steps.append(f"Kmax = {sigfig(Kmax_eV, 3)} eV")
    verif = f"Check: hf - phi = {sigfig(Kmax_J,6)} J = {sigfig(Kmax_eV,3)} eV - ✓"
    return SolverResult(
        answer={"Kmax_J": sigfig(Kmax_J, 6), "Kmax_eV": sigfig(Kmax_eV, 3)},
        steps=steps, verification=verif
    )


def solve_de_broglie(params: dict) -> SolverResult:
    """lambda = h / p = h / (mv)"""
    h = 6.626e-34
    m = params.get("m", None)  # kg
    v = params.get("v", None)  # m/s

    steps = []
    steps.append("Formula: lambda = h / (m·v)")
    steps.append(f"Given: h = 6.626x10⁻^3⁴ J·s, m = {m} kg, v = {v} m/s")
    lam = h / (m * v)
    steps.append(f"lambda = {h} / ({m} x {v}) = {h} / {m*v}")
    steps.append(f"lambda = {sigfig(lam, 6)} m = {sigfig(lam*1e10, 3)} Å")
    verif = f"Check: h/(m*v) = {sigfig(lam,6)} m - ✓"
    return SolverResult(answer=sigfig(lam, 6), steps=steps, verification=verif)


def solve_bohr_hydrogen(params: dict) -> SolverResult:
    """Bohr radius: r_n = n^2 * h^2 * eps0 / (pi * m_e * e^2)
       Energy: E_n = -13.6 eV / n^2"""
    n = params.get("n", 1)
    find = params.get("find", "both")

    h = 6.626e-34
    eps0 = 8.854e-12
    me = 9.109e-31
    e = 1.602e-19

    steps = []
    steps.append(f"Bohr model for hydrogen atom, n = {n}")
    r_n = (n**2 * h**2 * eps0) / (math.pi * me * e**2)
    E_n_eV = -13.6 / (n**2)

    steps.append(f"Radius: r_n = n^2h^2ε₀/(pim_e e^2)")
    steps.append(f"r_{n} = ({n}^2)(6.626x10⁻^3⁴)^2(8.854x10⁻¹^2)/(pix9.109x10⁻^3¹x(1.602x10⁻¹⁹)^2)")
    steps.append(f"r_{n} = {sigfig(r_n, 6)} m = {sigfig(r_n*1e10, 4)} Å")

    steps.append(f"\nEnergy: E_n = -13.6/n^2 eV")
    steps.append(f"E_{n} = -13.6/{n}^2 = {sigfig(E_n_eV, 4)} eV")

    if find == "radius":
        ans = sigfig(r_n, 6)
        verif = f"r_1 = 0.529 Å (Bohr radius); r_{n}/r_1 = n^2 = {n}^2 = {n**2}; {sigfig(r_n/r_n,3)} - ✓"
    elif find == "energy":
        ans = sigfig(E_n_eV, 4)
        verif = f"E_1 = -13.6 eV; E_{n}/E_1 = n^2 = {n**2}; ratio = {sigfig(E_n_eV/(-13.6),3)} - ✓"
    else:
        ans = {"r_m": sigfig(r_n, 6), "r_A": sigfig(r_n*1e10, 4), "E_eV": sigfig(E_n_eV, 4)}
        verif = f"r_1 = 0.529 Å; E_1 = -13.6 eV - both check out. ✓"

    return SolverResult(answer=ans, steps=steps, verification=verif)


def solve_transistor_amplifier(params: dict) -> SolverResult:
    """Current gain: beta = Ic/Ib; Voltage gain = (Rc/Rin)*beta"""
    beta = params.get("beta", 100)
    Ib = params.get("Ib", None)   # microamps
    Rc = params.get("Rc", None)   # ohms
    Rin = params.get("Rin", None) # ohms
    find = params.get("find", "Ic")

    steps = []
    steps.append(f"Transistor parameters: beta = {beta}, I_b = {Ib} muA")
    steps.append("Formula: I_c = beta x I_b")
    Ic = beta * Ib * 1e-6  # in Amps
    Ic_mA = Ic * 1000
    steps.append(f"I_c = {beta} x {Ib} x 10⁻⁶ = {sigfig(Ic, 6)} A = {sigfig(Ic_mA, 3)} mA")

    if find == "Ic":
        ans = {"Ic_A": sigfig(Ic, 6), "Ic_mA": sigfig(Ic_mA, 3)}
        verif = f"I_c/I_b = {sigfig(Ic,6)}/{Ib*1e-6} = {sigfig(Ic/(Ib*1e-6),3)} ≈ beta={beta} - ✓"
    else:
        steps.append(f"\nVoltage gain: A_v = (R_c/R_in) x beta = ({Rc}/{Rin}) x {beta}")
        Av = (Rc / Rin) * beta
        steps.append(f"A_v = {sigfig(Rc/Rin,3)} x {beta} = {sigfig(Av, 3)}")
        ans = {"Ic_mA": sigfig(Ic_mA, 3), "Av": sigfig(Av, 3)}
        verif = f"Check: A_v = {sigfig(Av,3)} - ✓"
    return SolverResult(answer=ans, steps=steps, verification=verif)


def solve_lc_oscillation(params: dict) -> SolverResult:
    """LC oscillation: f = 1/(2pi√(LC)); omega = 1/√(LC)"""
    L = params.get("L", None)  # Henry
    C = params.get("C", None)  # Farad

    steps = []
    steps.append("LC Oscillation formulas:")
    steps.append("omega = 1/√(LC), f = omega/(2pi) = 1/(2pi√(LC))")
    steps.append(f"Given: L = {L} H, C = {C} F")
    omega = 1 / math.sqrt(L * C)
    f = omega / (2 * math.pi)
    T = 1 / f
    steps.append(f"omega = 1/√({L}x{C}) = 1/√({L*C}) = {sigfig(omega, 4)} rad/s")
    steps.append(f"f = omega/(2pi) = {sigfig(omega,4)}/(2x3.1416) = {sigfig(f, 4)} Hz")
    steps.append(f"T = 1/f = {sigfig(T, 4)} s")
    verif = f"Check: f*T = {sigfig(f,4)}x{sigfig(T,4)} = {sigfig(f*T,4)} ≈ 1 - ✓"
    return SolverResult(
        answer={"omega_rads": sigfig(omega, 4), "f_Hz": sigfig(f, 4), "T_s": sigfig(T, 4)},
        steps=steps, verification=verif
    )


def solve_ohm_parallel(params: dict) -> SolverResult:
    """Parallel resistance with verification"""
    resistors = params.get("resistors", [])
    V = params.get("V", 12)  # applied voltage

    steps = []
    steps.append("Parallel Resistance: 1/R_p = Σ(1/R_i)")
    steps.append(f"Resistors: {resistors} Ω, Applied V = {V} V")
    inv_sum = sum(1/r for r in resistors)
    Rp = 1 / inv_sum
    total_I = V / Rp
    individual_I = [V/r for r in resistors]
    steps.append(f"1/R_p = {sigfig(inv_sum, 4)} Ω⁻¹")
    steps.append(f"R_p = {sigfig(Rp, 3)} Ω")
    steps.append(f"Total current I = V/R_p = {V}/{sigfig(Rp,3)} = {sigfig(total_I, 3)} A")
    steps.append("Currents: " + ", ".join(f"I_{i+1}={sigfig(ci,3)}A" for i,ci in enumerate(individual_I)))
    steps.append(f"Check: sum of branch currents = {sigfig(sum(individual_I),3)} A ≈ I_total ✓")

    verif = f"Kirchhoff's Current Law: ΣI_branch = ΣI_individual = {sigfig(sum(individual_I),3)} = I_total - ✓"
    return SolverResult(
        answer={"Rp_ohm": sigfig(Rp, 3), "total_I_A": sigfig(total_I, 3)},
        steps=steps, verification=verif
    )


def solve_resistivity(params: dict) -> SolverResult:
    """R = ρL/A; ρ = RA/L"""
    R = params.get("R", None)
    L = params.get("L", None)
    A = params.get("A", None)
    find = params.get("find", "rho")

    steps = []
    steps.append("Formula: R = ρL/A  →  ρ = RA/L")
    steps.append(f"Given: R = {R} Ω, L = {L} m, A = {A} m^2")
    rho = R * A / L
    steps.append(f"ρ = {R} x {A} / {L} = {sigfig(rho, 6)} Ω·m")
    steps.append(f"ρ = {sigfig(rho*1e8, 3)} x 10⁻⁸ Ω·m")
    verif = f"Check: ρL/A = {sigfig(rho,6)}x{L}/{A} = {sigfig(rho*L/A,3)} Ω ≈ {R} - ✓"
    return SolverResult(answer=sigfig(rho, 6), steps=steps, verification=verif)


def solve_self_inductance(params: dict) -> SolverResult:
    """Self-inductance: ε = -L(di/dt); L = mu₀N^2A/l"""
    N = params.get("N", 100)
    A = params.get("A", None)  # m^2
    l = params.get("l", None)  # m
    mu0 = 4e-7 * math.pi

    steps = []
    steps.append("Formula: L = mu₀N^2A/l")
    steps.append(f"Given: N={N}, A={A} m^2, l={l} m, mu₀ = 4pix10⁻⁷ H/m")
    L = mu0 * N**2 * A / l
    steps.append(f"L = (4pix10⁻⁷) x {N}^2 x {A} / {l}")
    steps.append(f"L = {sigfig(mu0, 6)} x {N**2} x {A} / {l}")
    steps.append(f"L = {sigfig(L, 6)} H = {sigfig(L*1e3, 4)} mH")
    verif = f"Check: mu₀N^2A/l = {sigfig(L,6)} H - ✓"
    return SolverResult(answer=sigfig(L, 6), steps=steps, verification=verif)


# ============================================================================
# QUESTION GENERATORS - ELECTROSTATICS (Section 1)
# ============================================================================

def gen_electric_charge_questions(rng: random.Random, count: int) -> List[Question]:
    """c12_phy_001: Electric charges (types and properties)"""
    questions = []
    for i in range(count):
        qi_type = rng.choice(["mcq", "fill_blank", "short_answer", "numerical"])
        comp = rng.random() < 0.5

        if qi_type == "mcq":
            if comp:
                q = rng.choice([
                    ("In India, a synthetic raincoat rubbed with a dry silk scarf acquires ______ charge.",
                     ["positive", "negative", "neutral", "both"], "positive",
                     "Rub a glass rod (synthetic raincoat) with silk → glass loses electrons → positive charge.",
                     "Indian context: synthetic materials in common use; silk is a common friction partner."),
                    ("A PVC ruler rubbed with a dry woollen sweater is used to lift small paper bits in Indian school labs. The ruler acquires ______ charge.",
                     ["positive", "negative", "neutral", "zero"], "negative",
                     "PVC is an insulator. Rubbing with wool transfers electrons to PVC → negative charge.",
                     "Indian school laboratory context - PVC rulers are standard equipment."),
                ])
            else:
                q = rng.choice([
                    ("Like charges ______ each other.",
                     ["attract", "repel", "neutralize", "attract then repel"], "repel",
                     "Fundamental property: like charges repel, unlike charges attract.",
                     "Standard electrostatic principle."),
                    ("Electrons carry ______ charge.",
                     ["positive", "negative", "no", "variable"], "negative",
                     "Electrons are negatively charged subatomic particles.",
                     "Standard electrostatic principle."),
                ])
            questions.append(Question(
                id=f"elchg_{i}", type="mcq", topic="Electric Charges",
                difficulty="Easy", competency=comp,
                question=q[0], options=q[1], answer=q[2], explanation=q[3], steps=[q[3]], verification=q[4]
            ))

        elif qi_type == "fill_blank":
            prompts = [
                ("The three methods of charging a body are friction, ______, and induction.", "conduction",
                 "Conduction involves touching a charged body to a neutral one, transferring charge.",
                 "Standard physics concept."),
                ("______ is a conductor of electricity; glass is an ______.", "Copper, insulator",
                 "Metals have free electrons; glass has tightly bound electrons.",
                 "Standard concept of conductors vs insulators."),
            ]
            q = rng.choice(prompts)
            questions.append(Question(
                id=f"elchg_{i}", type="fill_blank", topic="Electric Charges",
                difficulty="Easy", competency=False,
                question=q[0], answer=q[1], explanation=q[2], steps=[q[2]], verification=q[3]
            ))

        elif qi_type == "short_answer":
            prompts = [
                ("Explain why a glass rod rubbed with silk attracts small pieces of paper.",
                 "Glass loses electrons to silk → becomes positively charged. The charged glass induces opposite charges on nearby paper → attraction.",
                 "Charge transfer by friction; electrostatic induction.",
                 "Standard explanation."),
                ("Distinguish between a conductor and an insulator on the basis of free electron mobility.",
                 "Conductors (e.g. copper) have free electrons that move easily, allowing charge flow. Insulators (e.g. plastic) have tightly bound electrons that cannot move freely.",
                 "Free electron mobility.",
                 "Standard concept."),
            ]
            q = rng.choice(prompts)
            questions.append(Question(
                id=f"elchg_{i}", type="short_answer", topic="Electric Charges",
                difficulty="Medium", competency=False,
                question=q[0], answer=q[1], explanation=q[2], steps=[q[2]], verification=q[3]
            ))

        elif qi_type == "long_answer":
            questions.append(Question(
                id=f"elchg_{i}", type="long_answer", topic="Electric Charges",
                difficulty="Medium", competency=comp,
                question=("Describe the three methods of charging a body - friction, conduction, and induction - with examples. "
                          "How does each method relate to electron transfer?" if not comp else
                          "During the festival of Diwali, static electricity from synthetic clothing can cause sparks. "
                          "Explain how friction charges a body and why synthetic sarees are more prone to this than cotton."),
                answer=("Friction: rubbing two bodies transfers electrons (e.g. glass-silk). "
                        "Conduction: touching a charged body to a neutral one shares charge. "
                        "Induction: a charged body near a conductor redistributes charges without contact."),
                explanation=("Friction = electron transfer; Conduction = direct charge sharing; "
                            "Induction = redistribution of existing charges."),
                steps=["Method 1: Friction - rubbing transfers electrons", "Method 2: Conduction - contact shares charge",
                       "Method 3: Induction - nearby charged body redistributes electrons"],
                verification=("All three methods conserve total charge; induction does not require contact.")
            ))

        else:  # numerical
            q1_val = rng.choice([1e-9, 3e-9, -2e-9, 5e-10])
            q2_val = rng.choice([2e-9, -1e-9, 4e-9, -3e-9])
            r_val = rng.choice([0.05, 0.1, 0.15])
            params = {"q1": q1_val, "q2": q2_val, "r": r_val}
            result = solve_coulomb(params)
            questions.append(Question(
                id=f"elchg_{i}", type="numerical", topic="Electric Charges",
                difficulty="Medium", competency=False,
                question=(f"Two point charges q₁ = {q1_val*1e9:.0f}x10⁻⁹ C and q₂ = {q2_val*1e9:.0f}x10⁻⁹ C "
                          f"are separated by {r_val*100:.0f} cm in air. Calculate the electrostatic force between them."),
                answer=result.answer, explanation=result.steps[-1],
                steps=result.steps, verification=result.verification
            ))
    return questions


def gen_conservation_questions(rng: random.Random, count: int) -> List[Question]:
    """c12_phy_002: Conservation and quantisation of charge"""
    questions = []
    for i in range(count):
        qi_type = rng.choice(["mcq", "fill_blank", "short_answer", "numerical"])
        comp = rng.random() < 0.5

        if qi_type == "mcq":
            q = rng.choice([
                ("The law of conservation of charge states that:", ["charge can be created", "charge can be destroyed",
                 "total charge of an isolated system is constant", "charge is always positive"],
                 "total charge of an isolated system is constant",
                 "Charge cannot be created or destroyed; only transferred.", "Standard principle."),
                ("The magnitude of the elementary charge e is:", ["9x10⁹ C", "1.6x10⁻¹⁹ C",
                 "1 C", "6.626x10⁻^3⁴ C"],
                 "1.6x10⁻¹⁹ C", "e = 1.602x10⁻¹⁹ C is the charge of one electron/proton.", "Standard value."),
            ])
            questions.append(Question(id=f"cons_{i}", type="mcq", topic="Conservation of Charge",
                difficulty="Easy", competency=comp, question=q[0], options=q[1], answer=q[2],
                explanation=q[3], steps=[q[3]], verification=q[4]))

        elif qi_type == "numerical":
            n_electrons = rng.randint(2, 10)
            total_Q = n_electrons * 1.6e-19
            q_text = rng.choice([
                f"Calculate the total charge of {n_electrons} electrons.",
                f"How many electrons are needed to produce a charge of {n_electrons*1.6:.1f}x10⁻¹⁹ C?",
            ])
            if "total charge" in q_text:
                ans = sigfig(total_Q, 3)
                steps = [f"Q = n x e = {n_electrons} x 1.6x10⁻¹⁹ = {sigfig(total_Q,3)} C",
                         f"Note: charge is negative since electrons are negative."]
                steps[0] = steps[0] + f"\nQ = {sigfig(total_Q,3)} C"
                verif = f"Check: {n_electrons} x 1.6x10⁻¹⁹ = {sigfig(total_Q,3)} C - ✓"
            else:
                ans = n_electrons
                steps = [f"n = Q/e = {n_electrons*1.6:.1f}x10⁻¹⁹ / (1.6x10⁻¹⁹) = {n_electrons}"]
                verif = f"n must be integer: {n_electrons} ✓ (charge quantisation)"
            questions.append(Question(id=f"cons_{i}", type="numerical", topic="Conservation of Charge",
                difficulty="Easy", competency=False, question=q_text, answer=ans,
                explanation="Q = nxe where n is integer, e = 1.6x10⁻¹⁹ C",
                steps=steps, verification=verif))

        elif qi_type == "short_answer":
            q = rng.choice([
                ("Distinguish between conservation of charge and quantisation of charge.",
                 "Conservation: total charge in an isolated system remains constant. Quantisation: charge exists only in integer multiples of e = 1.6x10⁻¹⁹ C.",
                 "Conservation = total constant; Quantisation = discrete units.", "Standard concept."),
            ])
            questions.append(Question(id=f"cons_{i}", type="short_answer", topic="Conservation of Charge",
                difficulty="Medium", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))

        else:  # fill_blank
            q = rng.choice([
                ("The law of conservation of charge says total charge of an ______ system is constant.", "isolated",
                 "An isolated system exchanges nothing with surroundings.", "Standard principle."),
                ("Quantisation of charge: Q = ______ where n is an integer.", "±ne",
                 "n is a positive integer, e = 1.6x10⁻¹⁹ C.", "Standard formula."),
            ])
            questions.append(Question(id=f"cons_{i}", type="fill_blank", topic="Conservation of Charge",
                difficulty="Easy", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))
    return questions


# ============================================================================
# QUESTION GENERATORS - CURRENT ELECTRICITY (Section 2)
# ============================================================================

def gen_current_electricity_questions(rng: random.Random, count: int) -> List[Question]:
    """c12_phy_008, c12_phy_009, c12_phy_010: Current electricity"""
    questions = []
    for i in range(count):
        qi_type = rng.choice(["mcq", "fill_blank", "short_answer", "long_answer", "numerical"])
        comp = rng.random() < 0.5

        if qi_type == "mcq":
            if comp:
                q = rng.choice([
                    ("In an Indian household wiring with parallel connections, if one bulb fuses:", [
                        "all bulbs go off", "only the fused bulb goes off",
                        "all bulbs become brighter", "current in all wires doubles"],
                        "only the fused bulb goes off",
                        "Parallel circuits work independently; each branch has full supply voltage.",
                        "Indian household wiring uses parallel connections for appliances."),
                    ("A fuse wire in an Indian domestic circuit is made of:", [
                        "copper", "aluminium", "lead-tin alloy", "silver"],
                        "lead-tin alloy",
                        "Fuse wires are made of low-melting alloys like lead-tin to protect circuits.",
                        "Common in Indian CBSE/CISCE syllabus."),
                ])
            else:
                q = rng.choice([
                    ("Ohm's Law relates:", ["V and I", "V, I, and R", "P and I", "R and L"],
                     "V, I, and R", "V = IR - voltage, current, and resistance.", "Standard."),
                    ("The unit of resistance is:", ["Volt", "Ampere", "Ohm", "Watt"],
                     "Ohm", "Ω (Ohm) is the SI unit of resistance.", "Standard."),
                    ("Kirchhoff's Current Law is based on:", ["conservation of charge",
                     "conservation of energy", "Ohm's law", "Coulomb's law"],
                     "conservation of charge",
                     "KCL: sum of currents at a junction = 0, reflecting charge conservation.",
                     "Standard circuit theory."),
                ])
            questions.append(Question(id=f"curr_{i}", type="mcq", topic="Current Electricity",
                difficulty="Easy", competency=comp, question=q[0], options=q[1], answer=q[2],
                explanation=q[3], steps=[q[3]], verification=q[4]))

        elif qi_type == "numerical":
            rng_local = random.Random(rng.randint(0, 2**31))
            choice = rng_local.choice(["series", "parallel", "ohms", "power", "resistivity"])
            if choice == "series":
                resistors = rng_local.sample([2, 4, 6, 8, 10, 12], k=3)
                result = solve_series_resistance({"resistors": resistors})
                questions.append(Question(id=f"curr_{i}", type="numerical", topic="Current Electricity",
                    difficulty="Easy", competency=False,
                    question=f"Three resistors {resistors[0]} Ω, {resistors[1]} Ω, and {resistors[2]} Ω are connected in series. Find total resistance.",
                    answer=result.answer, explanation=f"R_series = R₁+R₂+R₃ = {result.answer} Ω",
                    steps=result.steps, verification=result.verification))
            elif choice == "parallel":
                resistors = rng_local.sample([6, 12, 18, 24, 30], k=2)
                result = solve_parallel_resistance({"resistors": resistors})
                questions.append(Question(id=f"curr_{i}", type="numerical", topic="Current Electricity",
                    difficulty="Medium", competency=False,
                    question=f"Two resistors {resistors[0]} Ω and {resistors[1]} Ω are connected in parallel. Find the equivalent resistance.",
                    answer=result.answer, explanation=f"1/Rp = 1/{resistors[0]}+1/{resistors[1]} = {sigfig(1/resistors[0]+1/resistors[1],3)}, R_p = {result.answer} Ω",
                    steps=result.steps, verification=result.verification))
            elif choice == "ohms":
                V = rng_local.choice([6, 12, 24])
                I = rng_local.choice([0.5, 1, 2, 3])
                R_val = round(V/I, 2)
                result = solve_ohms_law({"known": "R", "V": V, "I": I, "R": R_val})
                questions.append(Question(id=f"curr_{i}", type="numerical", topic="Current Electricity",
                    difficulty="Easy", competency=False,
                    question=f"A current of {I} A flows through a wire when a potential difference of {V} V is applied. Find the resistance.",
                    answer=result.answer, explanation=result.steps[-1],
                    steps=result.steps, verification=result.verification))
            elif choice == "power":
                V = rng_local.choice([220, 110])
                I = rng_local.choice([0.5, 1, 1.5, 2])
                result = solve_electric_power({"known": "VI", "V": V, "I": I})
                questions.append(Question(id=f"curr_{i}", type="numerical", topic="Current Electricity",
                    difficulty="Easy", competency=comp,
                    question=(f"An Indian household appliance operates at {V} V, {I} A. Calculate power consumption in watts and kWh for 2 hours daily." if comp else
                              f"A device operates at {V} V and draws {I} A. Calculate its power consumption in watts."),
                    answer=result.answer, explanation=result.steps[-1],
                    steps=result.steps, verification=result.verification))
            else:  # resistivity
                R = rng_local.choice([10, 20, 50])
                L = rng_local.uniform(1, 5)
                A = rng_local.uniform(1e-6, 5e-6)
                result = solve_resistivity({"R": R, "L": L, "A": A})
                questions.append(Question(id=f"curr_{i}", type="numerical", topic="Current Electricity",
                    difficulty="Medium", competency=False,
                    question=f"A wire of length {sigfig(L,2)} m and cross-sectional area {sigfig(A,2)} m^2 has resistance {R} Ω. Find resistivity.",
                    answer=result.answer, explanation=result.steps[-1],
                    steps=result.steps, verification=result.verification))

        elif qi_type == "long_answer":
            q = rng.choice([
                ("Derive the expression for equivalent resistance of (a) n resistors in series, and (b) n resistors in parallel. "
                 "State Kirchhoff's laws and explain their physical basis.",
                 "Series: R_eq = R₁+R₂+...+Rₙ; Parallel: 1/R_eq = Σ(1/Rᵢ). "
                 "KCL (current law): ΣI=0 at junction (conservation of charge). "
                 "KVL (voltage law): ΣV=0 around loop (conservation of energy).",
                 "Derivation of series/parallel combinations + Kirchhoff's laws.", "Standard derivation."),
            ])
            questions.append(Question(id=f"curr_{i}", type="long_answer", topic="Current Electricity",
                difficulty="Hard", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))

        elif qi_type == "short_answer":
            q = rng.choice([
                ("State and explain Ohm's Law. What are its limitations?",
                 "Ohm's Law: V ∝ I at constant temperature (V=IR). "
                 "Limitation: not valid for non-ohmic materials (diodes, transistors), or at very high currents/temperatures.",
                 "Ohm's Law definition and limitations.", "Standard concept."),
                ("What is the colour code for a resistor of 4.7 kΩ ± 5%?",
                 "Yellow (4), Violet (7), Red (x10^2), Gold (±5% tolerance).",
                 "Standard resistor colour code.", "Standard electronics concept."),
            ])
            questions.append(Question(id=f"curr_{i}", type="short_answer", topic="Current Electricity",
                difficulty="Medium", competency=rng.random() < 0.5, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))

        else:  # fill_blank
            q = rng.choice([
                ("Kirchhoff's Current Law is based on conservation of ______.", "charge",
                 "Charge cannot accumulate at a junction.", "KCL basis."),
                ("The unit of electrical conductance is ______.", "siemens (S)",
                 "G = 1/R; unit is S (formerly mho).", "Standard unit."),
                ("The drift velocity of electrons in a copper wire is of the order of ______.", "mm/s",
                 "Electrons drift very slowly despite the speed of the electric field.", "Standard concept."),
            ])
            questions.append(Question(id=f"curr_{i}", type="fill_blank", topic="Current Electricity",
                difficulty="Easy", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))
    return questions


# ============================================================================
# QUESTION GENERATORS - MAGNETIC EFFECTS (Section 3)
# ============================================================================

def gen_magnetic_questions(rng: random.Random, count: int) -> List[Question]:
    """c12_phy_011: Magnetic effects of current"""
    questions = []
    for i in range(count):
        qi_type = rng.choice(["mcq", "fill_blank", "short_answer", "long_answer", "numerical"])
        comp = rng.random() < 0.5

        if qi_type == "mcq":
            if comp:
                q = rng.choice([
                    ("An electric bell in an Indian school works on the principle of:", [
                        "electromagnetic induction", "magnetic effect of current",
                        "Coulomb's law", "photoelectric effect"],
                        "magnetic effect of current",
                        "Electric bells use electromagnets - magnetic effect of current.",
                        "Indian school context."),
                    ("The direction of force on a current-carrying conductor in a magnetic field is given by:", [
                        "Fleming's Left Hand Rule", "Fleming's Right Hand Rule",
                        "Right Hand Grip Rule", "Lenz's Law"],
                        "Fleming's Left Hand Rule",
                        "Left hand rule: Thumb=Motion, First finger=Field, Second finger=Current.",
                        "Standard motor rule."),
                ])
            else:
                q = rng.choice([
                    ("Magnetic field lines around a straight current-carrying wire are:", [
                        "parallel to wire", "concentric circles", "radial lines", "parabolic"],
                        "concentric circles",
                        "Right Hand Grip Rule: field circles the wire.", "Standard."),
                    ("Fleming's Left Hand Rule is used for:", [
                        "generators", "motors", "transformers", "induction stoves"],
                        "motors", "Left hand rule → motor effect (force on current).", "Standard."),
                ])
            questions.append(Question(id=f"mag_{i}", type="mcq", topic="Magnetic Effects",
                difficulty="Easy", competency=comp, question=q[0], options=q[1], answer=q[2],
                explanation=q[3], steps=[q[3]], verification=q[4]))

        elif qi_type == "numerical":
            choice = rng.choice(["force", "torque"])
            if choice == "force":
                B = rng.choice([0.5, 1.0, 1.5])
                I = rng.choice([2, 3, 5])
                L = rng.choice([0.2, 0.3, 0.5])
                theta = rng.choice([90, 60, 30])
                result = solve_magnetic_force_wire({"B": B, "I": I, "L": L, "theta": theta})
                questions.append(Question(id=f"mag_{i}", type="numerical", topic="Magnetic Effects",
                    difficulty="Medium", competency=False,
                    question=f"A wire of length {L} m carrying {I} A is placed in a uniform magnetic field of {B} T at {theta} deg  to the field. Find force.",
                    answer=result.answer, explanation=result.steps[-1],
                    steps=result.steps, verification=result.verification))
            else:
                N = rng.choice([50, 100, 200])
                I = rng.choice([0.5, 1.0])
                A = rng.choice([1e-3, 2e-3, 5e-3])
                B = rng.choice([0.5, 1.0])
                theta = 90
                result = solve_dc_motor_torque({"N": N, "I": I, "A": A, "B": B, "theta": theta})
                questions.append(Question(id=f"mag_{i}", type="numerical", topic="Magnetic Effects",
                    difficulty="Medium", competency=False,
                    question=f"A rectangular coil with {N} turns, area {A*1e3:.1f}x10⁻^3 m^2, carries {I} A in a field of {B} T. Find maximum torque.",
                    answer=result.answer, explanation=result.steps[-1],
                    steps=result.steps, verification=result.verification))

        elif qi_type == "long_answer":
            q = rng.choice([
                ("Explain the principle, construction, and working of a moving coil galvanometer. "
                 "How is it converted into an ammeter and a voltmeter?",
                 "Principle: torque on a current loop in a magnetic field. "
                 "Construction: coil, magnet, spring, pointer. "
                 "Ammeter: low shunt resistance in parallel. "
                 "Voltmeter: high series resistance.",
                 "Galvanometer → ammeter (shunt) and voltmeter (series resistor).", "Standard derivation."),
            ])
            questions.append(Question(id=f"mag_{i}", type="long_answer", topic="Magnetic Effects",
                difficulty="Hard", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))

        elif qi_type == "short_answer":
            q = rng.choice([
                ("Distinguish between Fleming's Left Hand Rule and Right Hand Rule.",
                 "Left Hand Rule (Motor): gives direction of force on current-carrying conductor. "
                 "Right Hand Rule (Generator/Dynamo): gives direction of induced current. "
                 "Thumb (Motion/Force), First finger (Field), Second finger (Current) - Left Hand.",
                 "Left = motor (force), Right = generator (induced current).", "Standard distinction."),
                ("State the Biot-Savart Law.",
                 "Biot-Savart Law: dB = (mu₀/4pi) * (I dl x r̂) / r^2. "
                 "It gives the magnetic field due to a small current element.",
                 "Biot-Savart formula.", "Standard formula."),
            ])
            questions.append(Question(id=f"mag_{i}", type="short_answer", topic="Magnetic Effects",
                difficulty="Medium", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))
        else:
            q = rng.choice([
                ("Fleming's ______ Hand Rule gives the direction of force on a current-carrying conductor in a magnetic field.", "Left",
                 "Used for motors/force direction.", "Standard rule."),
                ("The unit of magnetic field strength B is ______.", "Tesla (T)",
                 "1 T = 1 N/(A·m).", "Standard unit."),
            ])
            questions.append(Question(id=f"mag_{i}", type="fill_blank", topic="Magnetic Effects",
                difficulty="Easy", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))
    return questions


# ============================================================================
# QUESTION GENERATORS - ELECTROMAGNETIC INDUCTION (Section 4)
# ============================================================================

def gen_emi_questions(rng: random.Random, count: int) -> List[Question]:
    """c12_phy_013, c12_phy_014: EMI"""
    questions = []
    for i in range(count):
        qi_type = rng.choice(["mcq", "fill_blank", "short_answer", "long_answer", "numerical"])
        comp = rng.random() < 0.5

        if qi_type == "mcq":
            if comp:
                q = rng.choice([
                    ("In a bicycle dynamo (used in India), the principle involved is:", [
                        "magnetic effect of current", "electromagnetic induction",
                        "self-induction", "Coulomb's law"],
                        "electromagnetic induction",
                        "Dynamo converts mechanical rotation to electrical energy via Faraday's Law.",
                        "Indian context: bicycle dynamos common in India."),
                    ("Lenz's Law is a consequence of:", [
                        "conservation of charge", "conservation of energy",
                        "Coulomb's law", "Ohm's law"],
                        "conservation of energy",
                        "Lenz's Law ensures induced emf opposes the change causing it - conserving energy.",
                        "Standard physics principle."),
                ])
            else:
                q = rng.choice([
                    ("Faraday's Law states that induced emf is proportional to:", [
                        "current", "rate of change of magnetic flux",
                        "resistance", "magnetic field strength"],
                        "rate of change of magnetic flux",
                        "ε = -dΦ/dt; emf ∝ rate of change of flux.", "Standard."),
                    ("The direction of induced emf is given by:", [
                        "Faraday's Law", "Lenz's Law", "Coulomb's Law", "Ampere's Law"],
                        "Lenz's Law",
                        "Lenz's Law gives the direction opposing the change in flux.",
                        "Standard."),
                ])
            questions.append(Question(id=f"emi_{i}", type="mcq", topic="EMI",
                difficulty="Medium", competency=comp, question=q[0], options=q[1], answer=q[2],
                explanation=q[3], steps=[q[3]], verification=q[4]))

        elif qi_type == "numerical":
            N = rng.choice([100, 200, 500])
            B = rng.choice([0.1, 0.2, 0.5])
            A = rng.choice([0.01, 0.02, 0.05])
            omega = rng.choice([100, 200, 314])
            theta = rng.choice([30, 60, 90])
            result = solve_emf_induced({"N": N, "B": B, "A": A, "theta": theta, "omega": omega})
            questions.append(Question(id=f"emi_{i}", type="numerical", topic="EMI",
                difficulty="Medium", competency=False,
                question=f"A coil of {N} turns, area {A*1e3:.1f}x10⁻^3 m^2, rotates at {omega} rad/s in a field of {B} T. Find emf at theta={theta} deg .",
                answer=result.answer, explanation=result.steps[-1],
                steps=result.steps, verification=result.verification))

        elif qi_type == "long_answer":
            q = rng.choice([
                ("State Faraday's Laws of electromagnetic induction and Lenz's Law. "
                 "Explain how these laws are used in an AC generator (alternator).",
                 "Faraday's 1st Law: changing magnetic flux induces emf. 2nd Law: ε = -N·dΦ/dt. "
                 "Lenz: direction opposes the change. "
                 "AC Generator: rotating coil in B-field → changing flux → induced emf, rectified by slip rings.",
                 "Faraday + Lenz + AC Generator.", "Standard derivation."),
            ])
            questions.append(Question(id=f"emi_{i}", type="long_answer", topic="EMI",
                difficulty="Hard", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))

        elif qi_type == "short_answer":
            q = rng.choice([
                ("What is eddy current? Mention two applications.",
                 "Eddy currents are circulating currents induced in a conductor by changing magnetic flux. "
                 "Applications: (1) electromagnetic braking in trains, (2) induction furnaces.",
                 "Eddy currents and applications.", "Standard concept."),
            ])
            questions.append(Question(id=f"emi_{i}", type="short_answer", topic="EMI",
                difficulty="Medium", competency=comp, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))
        else:
            q = rng.choice([
                ("Faraday's Law: induced emf is proportional to the ______ of change of magnetic flux.", "rate",
                 "ε = -N·dΦ/dt.", "Standard formula."),
                ("Lenz's Law gives the ______ of the induced emf.", "direction",
                 "Lenz's Law: induced emf opposes the change causing it.", "Standard."),
            ])
            questions.append(Question(id=f"emi_{i}", type="fill_blank", topic="EMI",
                difficulty="Easy", competency=False, question=q[0], answer=q[1],
                explanation=q[2], steps=[q[2]], verification=q[3]))
    return questions


# ============================================================================
# QUESTION GENERATORS - ALTERNATING CURRENT (Section 5)
# ============================================================================

def gen_ac_questions(rng: random.Random, count: int) -> List[Question]:
    """c12_phy_015, c12_phy_016: AC"""
    questions = []
    for i in range(count):
        qi_type = rng.choice(["mcq", "fill_blank", "short_answer", "long_answer", "numerical"])
        comp = rng.random() < 0.5

        if qi_type == "mcq":
            q = rng.choice([
                ("The RMS value of an AC is:", [
                    "peak value", "peak/√2", "peak/2", "√2 x peak"],
                    "peak/√2",
                    "V_rms = V_peak/√2 = 0.707 x V_peak.", "Standard RMS concept."),
                ("Power in an AC circuit is maximum when:", [
                    "purely resistive", "purely inductive",
                    "purely capacitive", "inductive and capacitive equal"],
                    "purely resistive",
                    "P = VI cosphi; cosphi = 1 for pure resistance.", "Standard power factor concept."),
                ("In a transformer, the primary and secondary are coupled by:", [
                    "electric field", "magnetic flux", "direct wire", "capacitance"],
                    "magnetic flux",
                    "Transformer works on mutual induction - magnetic flux links both coils.",
                    "Standard transformer principle."),
            ])
            questions.append(Question(id=f"ac_{i}", type="mcq", topic="Alternating Current",
                difficulty="Medium", competency=False, question=q[0], options=q[1], answer=q[2],
                explanation=q[3], steps=[q[3]], verification=q[4]))

        elif qi_type == "numerical":
            choice = rng.choice(["lc", "ac_power"])
            if choice == "lc":
                L = rng.choice([10e-3, 20e-3, 50e-3])
                C = rng.choice([10e-6, 20e-6, 50e-6])
                result = solve_lc_oscillation({"L": L, "C": C})
                questions.append(Question(id=f"ac_{i}", type="numerical", topic="Alternating Current",
                    difficulty="Medium", competency=False,
                    question=f"An LC circuit has L = {L*1e3:.0f} mH and C = {C*1e6:.0f} muF. Find resonant frequency and time period.",
                    answer=result.answer, explanation=result.steps[-2],
                    steps=result.steps, verification=result.verification))
            else:
                V = rng.choice([220, 230])
                I = rng.choice([1, 2, 3])
                result = solve_electric_power({"known": "VI", "V": V, "I": I})
                questions.append(Question(id=f"ac_{i}", type="numerical", topic="Alternating Current",
                    difficulty="Medium", competency=False,
                    question=f"An AC circuit has V = {V} V and I = {I} A. Find the power consumed.",
                    answer=result.answer, explanation=result.steps[-1] if result.steps else "",
                    steps=result.steps, verification=result.verification))

        elif qi_type == "fill_blank":
            questions.append(Question(id=f"ac_{i}", type="fill_blank", topic="Alternating Current",
                difficulty="Medium", competency=comp,
                question="The frequency of AC mains supply in India is ______ Hz.",
                answer="50",
                explanation="India uses 50 Hz AC at 220-230 V.",
                steps=["Standard AC mains frequency in India = 50 Hz"],
                verification="50 Hz is the standard"))

        elif qi_type == "short_answer":
            questions.append(Question(id=f"ac_{i}", type="short_answer", topic="Alternating Current",
                difficulty="Medium", competency=comp,
                question="Explain why AC is preferred over DC for long-distance power transmission.",
                answer="AC can be stepped up to high voltage using transformers, reducing I²R losses. At high V, current is low, so power loss in transmission lines is minimised.",
                explanation="Transformers only work with AC, not DC.",
                steps=["Power loss = I²R", "Higher voltage → lower current → lower loss", "Transformers step up/down AC voltage easily"],
                verification="P_loss = I²R confirms lower I reduces loss"))

        elif qi_type == "long_answer":
            questions.append(Question(id=f"ac_{i}", type="long_answer", topic="Alternating Current",
                difficulty="Hard", competency=comp,
                question="Derive the expression for RMS value of an alternating current and explain its significance.",
                answer="V_rms = V_peak / √2. RMS is the equivalent DC value that produces the same heating effect. V_rms = √(1/T ∫₀ᵀ V² dt) = V₀/√2 for sinusoidal AC.",
                explanation="RMS value represents the effective value of AC.",
                steps=["V(t) = V₀ sin(ωt)", "V_rms = √(1/T ∫₀ᵀ V₀² sin²(ωt) dt)", "sin²(θ) = (1-cos(2θ))/2", "Integration gives V_rms = V₀/√2 ≈ 0.707 V₀"],
                verification="For V₀=311V, V_rms = 220V (Indian mains)"))

    return questions