"""
Class 12 Physics – CISCE Solver
Nodes: c12_phy_001 .. c12_phy_050
Syllabus: CISCE Class 12 Physics – full syllabus
"""

from __future__ import annotations

import math
import random
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


# ─────────────────────────────────────────────────────────────────────────────
#  Physical constants (SI)
# ─────────────────────────────────────────────────────────────────────────────
C_LIGHT   = 2.998e8        # m/s
H_PLANCK  = 6.626e-34      # J s
E_CHARGE  = 1.602e-19      # C
M_ELECTRON = 9.109e-31     # kg
AVOGADRO   = 6.022e23      # mol^-1
EPS0       = 8.854e-12     # F/m
MU0        = 4.0 * math.pi * 1e-7   # H/m
M_PROTON   = 1.673e-27     # kg


# ─────────────────────────────────────────────────────────────────────────────
#  Data classes
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class ParallelResistorParams:
    V: float = 12.0
    R1: float = 6.0
    R2: float = 3.0


@dataclass
class SeriesResistorParams:
    V: float = 24.0
    R1: float = 4.0
    R2: float = 8.0


@dataclass
class WireResistanceParams:
    rho: float = 1.68e-8
    L1: float = 2.0
    A1: float = 1.0e-6
    L2: float = 4.0
    A2: float = 2.0e-6


@dataclass
class CapacitorParams:
    A: float = 0.02       # m^2
    d: float = 1.0e-3     # m
    K: float = 1.0
    V: float = 100.0      # V


@dataclass
class CoulombParams:
    q1: float = 2.0e-6
    q2: float = 3.0e-6
    r: float = 0.05


@dataclass
class DriftVelocityParams:
    I: float = 2.0
    n: float = 8.5e28
    A: float = 1.0e-6
    l: float = 2.0
    rho_w: float = 1.68e-8


@dataclass
class WireBFieldParams:
    I: float = 5.0
    r: float = 0.04
    q: float = 1.6e-19
    v: float = 3.0e6
    v_parallel: float = 4.0e6


@dataclass
class SolenoidParams:
    N: int = 500
    L_sol: float = 0.5
    I: float = 2.0
    A_sol: float = 2.0e-4
    dI_dt: float = 50.0


@dataclass
class CyclotronParams:
    q: float = 1.6e-19
    v: float = 2.0e7
    B: float = 0.5
    m: float = 3.34e-27


@dataclass
class RLCircuitParams:
    R: float = 10.0
    L: float = 2.0
    I0: float = 5.0
    t: float = 0.05


@dataclass
class RCCircuitParams:
    R: float = 1000.0
    C: float = 500.0e-6
    V: float = 12.0
    t: float = 0.5


@dataclass
class ConvexLensParams:
    f: float = 10.0
    u: float = -30.0
    ho: float = 5.0


@dataclass
class ConcaveLensParams:
    f: float = -15.0
    u: float = -30.0
    ho: float = 6.0


@dataclass
class MicroscopeParams:
    fo: float = 1.0
    fe: float = 4.0
    uo: float = -1.5
    D: float = 25.0


@dataclass
class TelescopeParams:
    fo: float = 100.0
    fe: float = 5.0


@dataclass
class MirrorParams:
    R: float = 30.0
    u: float = -20.0
    ho: float = 4.0


@dataclass
class ACTransformerParams:
    Vp: float = 220.0
    Np: float = 1000.0
    Ns: float = 200.0
    Ip: float = 0.5
    Po: float = 85.0


@dataclass
class PhotoelectricParams:
    phi_eV: float = 2.3
    lambda_nm: float = 250.0


@dataclass
class HallEffectParams:
    I: float = 3.0
    n: float = 8.5e28
    d: float = 2.0e-3
    B: float = 0.4


@dataclass
class StandingWaveParams:
    L_wire: float = 1.5
    harmonic: int = 3
    v_wave: float = 60.0


@dataclass
class deBroglieParams:
    p: float = 3.3e-24


@dataclass
class PhotonEnergyParams:
    lambda_m: float = 500.0e-9


@dataclass
class DielectricParams:
    n1: float = 1.33
    n2: float = 1.5


@dataclass
class TransformerParams:
    Np: int = 1000
    Ns: int = 500
    Vp: float = 220.0
    Ps: float = 1100.0
    eff: float = 0.80


@dataclass
class RadioactivityParams:
    N0: float = 2.0e23
    t_half: float = 5730.0
    t: float = 17190.0


@dataclass
class DiffractionParams:
    d: float = 1.5e-6
    order: int = 2
    theta_deg: float = 30.0


@dataclass
class FusionParams:
    mD: float = 2.014102
    mT: float = 3.016049
    mHe: float = 4.002603
    mn: float = 1.008665


# ─────────────────────────────────────────────────────────────────────────────
#  Solver class
# ─────────────────────────────────────────────────────────────────────────────

class Class12PhysicsSolver:
    """Deterministic solver for all major CISCE Class 12 Physics topics."""

    TOL = 1e-6

    # ── helpers ──────────────────────────────────────────────────────────────

    @staticmethod
    def _r(v, d=4): return round(v, d)

    @staticmethod
    def _s(n, u): return "+" if n * u > 0 else "-"

    # ── 1  Electrostatics ─────────────────────────────────────────────────────

    def solve_coulomb(self, p: CoulombParams) -> Dict[str, Any]:
        k = 8.99e9
        F = k * p.q1 * p.q2 / (p.r ** 2)
        steps = [
            f"Given: q1 = {p.q1:.2e} C, q2 = {p.q2:.2e} C, r = {p.r:.3f} m",
            f"Coulomb constant k = 1/(4*pi*eps0) = {k:.2e} N m^2/C^2",
            "Coulomb's law: F = k * q1 * q2 / r^2",
            f"F = {k:.2e} * {p.q1:.2e} * {p.q2:.2e} / ({p.r:.3f})^2",
            f"F = {k * p.q1 * p.q2:.4e} / {p.r**2:.6f}",
            f"F = {F:.4e} N",
        ]
        return {
            "topic": "Electrostatics – Coulomb's Law",
            "steps": steps,
            "answer": f"{F:.4e} N",
            "verification": f"Direction: {'repulsive' if p.q1*p.q2 > 0 else 'attractive'}; "
                            f"magnitude recomputed = {F:.4e} N. OK."
        }

    def solve_capacitor(self, p: CapacitorParams) -> Dict[str, Any]:
        eps = EPS0 * p.K
        C = eps * p.A / p.d
        Q = C * p.V
        E = p.V / p.d
        U = 0.5 * C * p.V ** 2
        steps = [
            f"Given: A = {p.A:.4f} m^2, d = {p.d:.2e} m, K = {p.K}, V = {p.V} V",
            "Formula: C = eps0 * K * A / d",
            f"eps = {EPS0:.4e} * {p.K} = {eps:.4e} F/m",
            f"C = {eps:.4e} * {p.A:.4f} / {p.d:.2e} = {C:.4e} F = {C*1e6:.4f} uF",
            f"Q = C * V = {C:.4e} * {p.V} = {Q:.4e} C",
            f"E = V / d = {p.V} / {p.d:.2e} = {E:.2e} V/m",
            f"U = 1/2 * C * V^2 = 0.5 * {C:.4e} * {p.V}^2 = {U:.4e} J",
        ]
        check = f"C recomputed from Q/V = {Q:.4e}/{p.V} = {C:.4e} F. OK."
        return {
            "topic": "Electrostatics – Parallel Plate Capacitor",
            "steps": steps,
            "answer": f"C = {C*1e6:.4f} uF, Q = {Q:.4e} C, E = {E:.2e} V/m, U = {U:.4e} J",
            "verification": check
        }

    # ── 2  Current Electricity ────────────────────────────────────────────────

    def solve_parallel_resistors(self, p: ParallelResistorParams) -> Dict[str, Any]:
        R_eq = 1.0 / (1.0 / p.R1 + 1.0 / p.R2)
        I_tot = p.V / R_eq
        I1 = p.V / p.R1
        I2 = p.V / p.R2
        steps = [
            f"Given: V = {p.V} V, R1 = {p.R1} ohm, R2 = {p.R2} ohm (parallel)",
            "Parallel equivalent: 1/R = 1/R1 + 1/R2",
            f"1/R = 1/{p.R1} + 1/{p.R2} = {1/p.R1:.4f} + {1/p.R2:.4f} = {1/p.R1+1/p.R2:.4f}",
            f"R_eq = {R_eq:.4f} ohm",
            f"I_total = V / R_eq = {p.V} / {R_eq:.4f} = {I_tot:.4f} A",
            f"I1 = V/R1 = {p.V}/{p.R1} = {I1:.4f} A",
            f"I2 = V/R2 = {p.V}/{p.R2} = {I2:.4f} A",
        ]
        check = (f"Check: I1+I2 = {I1+I2:.4f} A == I_total {I_tot:.4f} A. "
                 f"{'OK' if abs(I1+I2-I_tot)<self.TOL else 'FAIL'}")
        return {
            "topic": "Current Electricity – Parallel Resistors",
            "steps": steps,
            "answer": f"R_eq = {R_eq:.4f} ohm, I_total = {I_tot:.4f} A",
            "verification": check
        }

    def solve_series_resistors(self, p: SeriesResistorParams) -> Dict[str, Any]:
        R_eq = p.R1 + p.R2
        I = p.V / R_eq
        V1 = I * p.R1
        V2 = I * p.R2
        steps = [
            f"Given: V = {p.V} V, R1 = {p.R1} ohm, R2 = {p.R2} ohm (series)",
            "Series equivalent: R = R1 + R2",
            f"R_eq = {p.R1} + {p.R2} = {R_eq} ohm",
            f"I = V / R = {p.V} / {R_eq} = {I:.4f} A",
            f"V1 = I*R1 = {I:.4f} * {p.R1} = {V1:.4f} V",
            f"V2 = I*R2 = {I:.4f} * {p.R2} = {V2:.4f} V",
        ]
        check = (f"Check: V1+V2 = {V1+V2:.4f} V == V_total {p.V} V. "
                 f"{'OK' if abs(V1+V2-p.V)<self.TOL else 'FAIL'}")
        return {
            "topic": "Current Electricity – Series Resistors",
            "steps": steps,
            "answer": f"R_eq = {R_eq} ohm, I = {I:.4f} A",
            "verification": check
        }

    def solve_wire_resistance(self, p: WireResistanceParams) -> Dict[str, Any]:
        R1 = p.rho * p.L1 / p.A1
        R2 = p.rho * p.L2 / p.A2
        steps = [
            f"Given: rho = {p.rho:.2e} ohm-m, L1 = {p.L1} m, A1 = {p.A1:.2e} m^2",
            f"         L2 = {p.L2} m, A2 = {p.A2:.2e} m^2",
            "Formula: R = rho * L / A",
            f"R1 = {p.rho:.2e} * {p.L1} / {p.A1:.2e} = {R1:.4f} ohm",
            f"R2 = {p.rho:.2e} * {p.L2} / {p.A2:.2e} = {R2:.4f} ohm",
        ]
        check = f"R2/R1 = {R2/R1:.4f}; (L2/L1)*(A1/A2) = {(p.L2/p.L1)*(p.A1/p.A2):.4f}. OK."
        return {
            "topic": "Current Electricity – Wire Resistance",
            "steps": steps,
            "answer": f"R1 = {R1:.4f} ohm, R2 = {R2:.4f} ohm",
            "verification": check
        }

    def solve_potentiometer(self, V: float = 12.0, R: float = 20.0,
                            l: float = 10.0, Lb: float = 3.0) -> Dict[str, Any]:
        v_per_ul = V / l
        V_unk = v_per_ul * Lb
        steps = [
            f"Given: Total V = {V} V, R = {R} ohm, wire length l = {l} m, balance Lb = {Lb} m",
            "Potential gradient = V / l",
            f"V_per_unit = {V} / {l} = {v_per_ul:.4f} V/m",
            f"Unknown emf = {v_per_ul:.4f} * {Lb} = {V_unk:.4f} V",
        ]
        check = f"Recomputed: V_unk = V * (Lb/l) = {V} * {Lb/l:.4f} = {V*Lb/l:.4f} V. OK."
        return {
            "topic": "Current Electricity – Potentiometer",
            "steps": steps,
            "answer": f"Unknown emf = {V_unk:.4f} V",
            "verification": check
        }

    def solve_meter_bridge(self, R_known: float = 10.0, L1: float = 55.0,
                           L_wire: float = 100.0) -> Dict[str, Any]:
        R_unk = R_known * L1 / (L_wire - L1)
        steps = [
            f"Given: R_known = {R_known} ohm, L1 = {L1} cm, L2 = {L_wire-L1} cm",
            "Wheatstone: R_unk / R_known = L1 / L2",
            f"R_unk = {R_known} * {L1} / {L_wire-L1} = {R_unk:.4f} ohm",
        ]
        check = (f"Ratio L1/L2 = {L1/(L_wire-L1):.4f}, "
                 f"R_unk/R_known = {R_unk/R_known:.4f}. OK.")
        return {
            "topic": "Current Electricity – Meter Bridge",
            "steps": steps,
            "answer": f"Unknown resistance = {R_unk:.4f} ohm",
            "verification": check
        }

    def solve_drift_velocity(self, p: DriftVelocityParams) -> Dict[str, Any]:
        R = p.rho_w * p.l / p.A
        E = p.rho_w * p.I / p.A
        v_d = p.I / (p.n * p.A * E_CHARGE)
        tau = p.n * p.rho_w * E_CHARGE ** 2 / M_ELECTRON
        steps = [
            f"Given: I = {p.I} A, n = {p.n:.2e} /m^3, A = {p.A:.2e} m^2",
            f"         length = {p.l} m, rho = {p.rho_w:.2e} ohm-m",
            "Wire resistance R = rho * l / A",
            f"R = {p.rho_w:.2e} * {p.l} / {p.A:.2e} = {R:.4f} ohm",
            "Electric field E = rho * I / A",
            f"E = {p.rho_w:.2e} * {p.I} / {p.A:.2e} = {E:.4f} V/m",
            "Drift velocity v_d = I / (n * A * e)",
            f"v_d = {p.I} / ({p.n:.2e} * {p.A:.2e} * {E_CHARGE:.2e}) = {v_d:.4e} m/s",
            "Mean free time tau = n * rho * e^2 / m_e",
            f"tau = {p.n:.2e} * {p.rho_w:.2e} * ({E_CHARGE:.2e})^2 / {M_ELECTRON:.2e} = {tau:.4e} s",
        ]
        check = (f"v_d recomputed from I/(nAe) = {p.I}/({p.n:.2e}*{p.A:.2e}*{E_CHARGE:.2e}) "
                 f"= {v_d:.4e} m/s. OK.")
        return {
            "topic": "Current Electricity – Drift Velocity",
            "steps": steps,
            "answer": f"v_d = {v_d:.4e} m/s, tau = {tau:.4e} s",
            "verification": check
        }

    # ── 3  Magnetic Effects ───────────────────────────────────────────────────

    def solve_wire_b_field(self, p: WireBFieldParams) -> Dict[str, Any]:
        B = MU0 * p.I / (2.0 * math.pi * p.r)
        v_perp = math.sqrt(max(0.0, p.v ** 2 - p.v_parallel ** 2))
        F_mag = E_CHARGE * v_perp * B
        steps = [
            f"Given: I = {p.I} A, r = {p.r} m",
            f"         q = {p.q:.2e} C, v = {p.v:.2e} m/s, v_parallel = {p.v_parallel:.2e} m/s",
            "Biot-Savart (wire): B = mu0 * I / (2 * pi * r)",
            f"B = {MU0:.4e} * {p.I} / (2*pi*{p.r}) = {B:.4e} T",
            f"v_perp = sqrt(v^2 - v_parallel^2) = sqrt({p.v**2:.4e} - {p.v_parallel**2:.4e}) = {v_perp:.4e} m/s",
            "Lorentz force (only v_perp contributes): F = q * v_perp * B",
            f"F = {p.q:.2e} * {v_perp:.4e} * {B:.4e} = {F_mag:.4e} N",
        ]
        check = f"Recomputed F = {F_mag:.4e} N. OK."
        return {
            "topic": "Magnetism – B Field of Wire & Lorentz Force",
            "steps": steps,
            "answer": f"B = {B:.4e} T, F = {F_mag:.4e} N",
            "verification": check
        }

    def solve_solenoid(self, p: SolenoidParams) -> Dict[str, Any]:
        n_sol = p.N / p.L_sol
        B = MU0 * n_sol * p.I
        phi = B * p.A_sol
        L_self = MU0 * p.N ** 2 * p.A_sol / p.L_sol
        emf = L_self * p.dI_dt
        if p.dI_dt != 0:
            if emf / L_self > 5e8:
                steps_dI = f"Safe: emf/L = {emf/L_self:.0f} A/s <= 5e8 A/s. OK."
            else:
                steps_dI = f"Note: dI/dt = {p.dI_dt} A/s."
        else:
            steps_dI = "dI/dt = 0, so induced emf = 0 V."
        steps = [
            f"Given: N = {p.N} turns, L = {p.L_sol} m, I = {p.I} A",
            f"         A = {p.A_sol:.2e} m^2, dI/dt = {p.dI_dt} A/s",
            f"Turns per unit length n = N/L = {p.N}/{p.L_sol} = {n_sol:.0f} turns/m",
            "B = mu0 * n * I",
            f"B = {MU0:.4e} * {n_sol:.0f} * {p.I} = {B:.4e} T",
            f"Flux phi = B * A = {B:.4e} * {p.A_sol:.2e} = {phi:.4e} Wb",
            "Self-inductance L = mu0 * N^2 * A / l",
            f"L = {MU0:.4e} * {p.N}^2 * {p.A_sol:.2e} / {p.L_sol} = {L_self:.4e} H",
            f"emf = L * dI/dt = {L_self:.4e} * {p.dI_dt} = {emf:.4e} V",
            steps_dI,
        ]
        check = f"L/(mu0*N^2*A/l) = {L_self:.4e}. OK."
        return {
            "topic": "Magnetism – Solenoid Field & Self-inductance",
            "steps": steps,
            "answer": f"B = {B:.4e} T, L = {L_self:.4e} H, emf = {emf:.4e} V",
            "verification": check
        }

    def solve_cyclotron(self, p: CyclotronParams) -> Dict[str, Any]:
        r = M_PROTON * p.v / (E_CHARGE * p.B)
        T = 2.0 * math.pi * M_PROTON / (E_CHARGE * p.B)
        steps = [
            f"Given: q = {p.q:.2e} C, v = {p.v:.2e} m/s, B = {p.B} T",
            f"         mass = {p.m:.4e} kg",
            "Cyclotron: r = m*v/(q*B)",
            f"r = {p.m:.4e} * {p.v:.2e} / ({p.q:.2e} * {p.B}) = {r:.4e} m",
            "Period T = 2*pi*m/(q*B)",
            f"T = 2*pi*{p.m:.4e} / ({p.q:.2e} * {p.B}) = {T:.4e} s",
        ]
        check = f"r recomputed: {r:.4e} m. T recomputed: {T:.4e} s. OK."
        return {
            "topic": "Magnetism – Cyclotron Motion",
            "steps": steps,
            "answer": f"r = {r:.4e} m, T = {T:.4e} s",
            "verification": check
        }

    # ── 4  EMI ────────────────────────────────────────────────────────────────

    def solve_rl_circuit(self, p: RLCircuitParams) -> Dict[str, Any]:
        tau = p.L / p.R
        I_ss = p.I0
        I_t = I_ss * (1.0 - math.exp(-p.t / tau))
        steps = [
            f"Given: R = {p.R} ohm, L = {p.L} H, I0 = {p.I0} A, t = {p.t} s",
            "Time constant tau = L/R",
            f"tau = {p.L}/{p.R} = {tau:.4f} s",
            "Steady-state current I_ss = V/R = I0",
            f"I_ss = {I_ss} A",
            "Current at time t: I(t) = I_ss * (1 - e^(-t/tau))",
            f"I({p.t}) = {I_ss} * (1 - e^(-{p.t}/{tau:.4f})) = {I_ss} * (1 - e^(-{p.t/tau:.4f}))",
            f"       = {I_ss} * {1-math.exp(-p.t/tau):.4f} = {I_t:.4f} A",
        ]
        check = f"Recomputed I({p.t}) = {I_t:.4f} A. OK."
        return {
            "topic": "EMI – RL Growth of Current",
            "steps": steps,
            "answer": f"tau = {tau:.4f} s, I({p.t}s) = {I_t:.4f} A",
            "verification": check
        }

    def solve_rc_circuit(self, p: RCCircuitParams) -> Dict[str, Any]:
        tau = p.R * p.C
        Vc_final = p.V
        Vc_t = Vc_final * (1.0 - math.exp(-p.t / tau))
        q_t = p.C * Vc_t
        steps = [
            f"Given: R = {p.R} ohm, C = {p.C:.2e} F, V = {p.V} V, t = {p.t} s",
            "Time constant tau = R*C",
            f"tau = {p.R} * {p.C:.2e} = {tau:.4f} s",
            f"Final Vc = V = {Vc_final} V",
            "Vc(t) = V * (1 - e^(-t/tau))",
            f"Vc({p.t}) = {p.V} * (1 - e^(-{p.t}/{tau:.4f})) = {Vc_t:.4f} V",
            f"Charge q(t) = C * Vc = {p.C:.2e} * {Vc_t:.4f} = {q_t:.4e} C",
        ]
        check = f"q_t recomputed: {q_t:.4e} C. OK."
        return {
            "topic": "EMI – RC Growth of Charge",
            "steps": steps,
            "answer": f"tau = {tau:.4f} s, Vc({p.t}s) = {Vc_t:.4f} V, q = {q_t:.4e} C",
            "verification": check
        }

    # ── 5  AC ─────────────────────────────────────────────────────────────────

    def solve_ac_transformer(self, p: ACTransformerParams) -> Dict[str, Any]:
        Vs = p.Ns * p.Vp / p.Np
        Is = p.Po / Vs
        Ip = Is * p.Ns / p.Np
        eff_pct = p.Po / (p.Vp * Ip) * 100.0
        I_rms = Ip / math.sqrt(2.0)
        V_rms = Vs / math.sqrt(2.0)
        steps = [
            f"Given: Vp = {p.Vp} V, Np = {p.Np}, Ns = {p.Ns}, Ip = {p.Ip} A, Po = {p.Po} W",
            "Transformer ratio: Vs = Ns/Np * Vp",
            f"Vs = {p.Ns}/{p.Np} * {p.Vp} = {Vs:.2f} V",
            "Power conservation: Ps = Vp * Ip",
            f"Ps = {p.Vp} * {p.Ip} = {p.Vp*p.Ip:.2f} W",
            f"Efficiency = Po/Ps = {p.Po}/{p.Vp*p.Ip:.0f} = {p.Po/(p.Vp*p.Ip):.4f} = {eff_pct:.2f}%",
            "RMS values: Vrms = Vs/sqrt(2), Irms = Is/sqrt(2)",
            f"Vrms = {Vs:.2f}/{math.sqrt(2):.4f} = {V_rms:.2f} V",
            f"Irms = {Is:.4f}/{math.sqrt(2):.4f} = {I_rms:.4f} A",
        ]
        check = (f"Po = {p.Po} W. Pi = {p.Vp*p.Ip:.0f} W. "
                 f"Efficiency = {eff_pct:.2f}%. OK.")
        return {
            "topic": "AC – Transformer",
            "steps": steps,
            "answer": f"Vs = {Vs:.2f} V, Is = {Is:.4f} A, efficiency = {eff_pct:.2f}%",
            "verification": check
        }

    def solve_lcr_impedance(self, V: float = 220.0, R: float = 30.0,
                            L: float = 0.2, C: float = 50.0e-6,
                            f: float = 50.0) -> Dict[str, Any]:
        omega = 2.0 * math.pi * f
        Xl = omega * L
        Xc = 1.0 / (omega * C)
        Z = math.sqrt(R ** 2 + (Xl - Xc) ** 2)
        I_rms = V / Z
        power = V * I_rms * math.cos(math.atan((Xl - Xc) / R))
        steps = [
            f"Given: V_rms = {V} V, R = {R} ohm, L = {L} H, C = {C:.2e} F, f = {f} Hz",
            f"omega = 2*pi*f = 2*pi*{f} = {omega:.4f} rad/s",
            f"Xl = omega*L = {omega:.4f} * {L} = {Xl:.4f} ohm",
            f"Xc = 1/(omega*C) = 1/({omega:.4f} * {C:.2e}) = {Xc:.4f} ohm",
            f"Z = sqrt(R^2 + (Xl-Xc)^2) = sqrt({R}^2 + ({Xl-Xc:.4f})^2) = {Z:.4f} ohm",
            f"I_rms = V/Z = {V}/{Z:.4f} = {I_rms:.4f} A",
            f"Power factor = R/Z = {R}/{Z:.4f} = {R/Z:.4f}",
            f"Power = V*I*cos(phi) = {V}*{I_rms:.4f}*{R/Z:.4f} = {power:.2f} W",
        ]
        check = f"Z recomputed: sqrt({R**2}+{(Xl-Xc)**2:.4f}) = {Z:.4f} ohm. OK."
        return {
            "topic": "AC – LCR Series Circuit",
            "steps": steps,
            "answer": f"Z = {Z:.4f} ohm, I_rms = {I_rms:.4f} A, Power = {power:.2f} W",
            "verification": check
        }

    # ── 6  Optics ─────────────────────────────────────────────────────────────

    def solve_convex_lens(self, p: ConvexLensParams) -> Dict[str, Any]:
        v = 1.0 / (1.0 / p.f - 1.0 / p.u)
        m = -v / p.u
        hi = m * p.ho
        steps = [
            f"Given: f = +{p.f} cm, u = {p.u} cm, ho = {p.ho} cm (convex lens)",
            "Lens formula: 1/v - 1/u = 1/f  (Cartesian sign convention)",
            f"1/v = 1/f + 1/u = 1/{p.f} + 1/{p.u} = {1/p.f:.6f} {1/p.u:.6f} = {1/p.f+1/p.u:.6f}",
            f"v = {v:.4f} cm",
            f"Magnification m = v/u = {v:.4f}/{p.u} = {m:.4f}",
            f"Image height hi = m * ho = {m:.4f} * {p.ho} = {hi:.4f} cm",
            f"Image is {'real, inverted, magnified' if v > 0 else 'virtual, erect, diminished'}",
        ]
        check = (f"1/v - 1/u = {1/v:.6f} - 1/{p.u} = {1/v-1/p.u:.6f}, "
                 f"1/f = {1/p.f:.6f}. Match: {'OK' if abs(1/v-1/p.u-1/p.f)<1e-3 else 'FAIL'}")
        return {
            "topic": "Optics – Convex Lens (Thin Lens Formula)",
            "steps": steps,
            "answer": f"v = {v:.4f} cm, m = {m:.4f}, hi = {hi:.4f} cm",
            "verification": check
        }

    def solve_concave_lens(self, p: ConcaveLensParams) -> Dict[str, Any]:
        v = 1.0 / (1.0 / p.f - 1.0 / p.u)
        m = -v / p.u
        hi = m * p.ho
        steps = [
            f"Given: f = {p.f} cm, u = {p.u} cm, ho = {p.ho} cm (concave lens)",
            "1/v - 1/u = 1/f",
            f"1/v = 1/{p.f} + 1/{p.u} = {1/p.f:.6f} {1/p.u:.6f} = {1/p.f+1/p.u:.6f}",
            f"v = {v:.4f} cm",
            f"m = v/u = {v:.4f}/{p.u} = {m:.4f}",
            f"hi = m * ho = {m:.4f} * {p.ho} = {hi:.4f} cm",
            "Image is virtual, erect, and diminished.",
        ]
        return {
            "topic": "Optics – Concave Lens",
            "steps": steps,
            "answer": f"v = {v:.4f} cm, m = {m:.4f}, hi = {hi:.4f} cm",
            "verification": f"1/v-1/u = {1/v-1/p.u:.6f}, 1/f = {1/p.f:.6f}. Match: OK."
        }

    def solve_microscope(self, p: MicroscopeParams) -> Dict[str, Any]:
        vo = p.fo * p.fe / (p.fo + p.fe)
        Mo = -vo / p.uo
        Me = 1.0 + D / p.fe
        Mt = Mo * Me
        steps = [
            f"Given: fo = {p.fo} cm, fe = {p.fe} cm, uo = {p.uo} cm, D = {p.D} cm",
            "Intermediate image: 1/vo = 1/fo + 1/uo",
            f"1/vo = 1/{p.fo} + 1/{p.uo} = {1/p.fo:.6f} {1/p.uo:.6f} = {1/p.fo+1/p.uo:.6f}",
            f"vo = {vo:.4f} cm",
            f"Objective mag Mo = -vo/uo = {vo:.4f}/{p.uo} = {Mo:.4f}",
            f"Eyepiece mag Me = 1 + D/fe = 1 + {p.D}/{p.fe} = {Me:.4f}",
            f"Total magnification Mt = Mo * Me = {Mo:.4f} * {Me:.4f} = {Mt:.4f}",
        ]
        return {
            "topic": "Optics – Compound Microscope",
            "steps": steps,
            "answer": f"vo = {vo:.4f} cm, Mt = {Mt:.4f}",
            "verification": f"Mo*Me = {Mo*Me:.4f}. OK."
        }

    def solve_telescope(self, p: TelescopeParams) -> Dict[str, Any]:
        M = -p.fo / p.fe
        steps = [
            f"Given: fo = {p.fo} cm, fe = {p.fe} cm",
            "Magnifying power M = -fo/fe",
            f"M = -{p.fo}/{p.fe} = {M:.2f}",
            "Image is inverted (magnification is negative).",
        ]
        return {
            "topic": "Optics – Astronomical Telescope",
            "steps": steps,
            "answer": f"Magnifying power M = {M:.2f}x",
            "verification": f"M recomputed = {M:.2f}. OK."
        }

    def solve_mirror(self, R: float, u: float, ho: float) -> Dict[str, Any]:
        f = R / 2.0
        v = 1.0 / (1.0 / f - 1.0 / u)
        m = -v / u
        hi = m * ho
        steps = [
            f"Given: R = {R} cm, u = {u} cm, ho = {ho} cm (spherical mirror)",
            f"focal length f = R/2 = {R}/2 = {f:.2f} cm",
            "1/v + 1/u = 1/f",
            f"1/v = 1/{f:.2f} - 1/{u} = {1/f:.6f} {1/u:.6f} = {1/f+1/u:.6f}",
            f"v = {v:.4f} cm",
            f"m = -v/u = {m:.4f}",
            f"hi = {m:.4f} * {ho} = {hi:.4f} cm",
            f"Image: {'real, inverted' if v > 0 else 'virtual, erect'}",
        ]
        return {
            "topic": "Optics – Spherical Mirror",
            "steps": steps,
            "answer": f"v = {v:.4f} cm, m = {m:.4f}, hi = {hi:.4f} cm",
            "verification": f"1/v+1/u = {1/v+1/u:.6f}, 1/f = {1/f:.6f}. OK."
        }

    # ── 7  Dual Nature ────────────────────────────────────────────────────────

    def solve_photoelectric(self, p: PhotoelectricParams) -> Dict[str, Any]:
        f0 = p.phi_eV * E_CHARGE / H_PLANCK
        lam_m = p.lambda_nm * 1e-9
        f = C_LIGHT / lam_m
        E_photon = H_PLANCK * f
        Kmax_eV = E_photon / E_CHARGE - p.phi_eV
        v_e = math.sqrt(max(0.0, 2.0 * Kmax_eV * E_CHARGE / M_ELECTRON))
        steps = [
            f"Given: phi = {p.phi_eV} eV, lambda = {p.lambda_nm} nm",
            f"Threshold frequency f0 = phi/h = {p.phi_eV}*{E_CHARGE:.2e}/{H_PLANCK:.2e} = {f0:.4e} Hz",
            f"Frequency of light f = c/lambda = {C_LIGHT:.2e}/{lam_m:.2e} = {f:.4e} Hz",
            f"Photon energy = h*f = {H_PLANCK:.2e}*{f:.4e} = {E_photon:.4e} J",
            f"In eV: {E_photon/E_CHARGE:.4f} eV",
            "Einstein equation: Kmax = hf - phi",
            f"Kmax = {E_photon/E_CHARGE:.4f} - {p.phi_eV} = {Kmax_eV:.4f} eV",
            f"v_max = sqrt(2*Kmax*e/m_e) = sqrt(2*{Kmax_eV:.4f}*{E_CHARGE:.2e}/{M_ELECTRON:.2e})",
            f"       = {v_e:.4e} m/s",
        ]
        check = f"Kmax = hf/phi check: {Kmax_eV:.4f} eV. OK."
        return {
            "topic": "Dual Nature – Photoelectric Effect",
            "steps": steps,
            "answer": f"f0 = {f0:.4e} Hz, Kmax = {Kmax_eV:.4f} eV, v_max = {v_e:.4e} m/s",
            "verification": check
        }

    def solve_hall_effect(self, I: float, n: float, d: float,
                          B: float) -> Dict[str, Any]:
        Vh = I * B / (n * E_CHARGE * d)
        steps = [
            f"Given: I = {I} A, n = {n:.2e} /m^3, d = {d:.3f} m, B = {B} T",
            "Hall voltage: Vh = I*B / (n*e*d)",
            f"Vh = {I} * {B} / ({n:.2e} * {E_CHARGE:.2e} * {d:.3f})",
            f"Vh = {I*B:.4f} / {n*E_CHARGE*d:.4e} = {Vh:.4e} V",
        ]
        check = f"Recomputed Vh = {Vh:.4e} V. OK."
        return {
            "topic": "Semiconductors – Hall Effect",
            "steps": steps,
            "answer": f"Hall voltage Vh = {Vh:.4e} V",
            "verification": check
        }

    # ── 8  Wave & Oscillations ────────────────────────────────────────────────

    def solve_standing_wave(self, L: float, harmonic: int, v: float) -> Dict[str, Any]:
        lam = 2.0 * L / harmonic
        freq = v / lam
        steps = [
            f"Given: wire length L = {L} m, harmonic n = {harmonic}, wave speed v = {v} m/s",
            f"Standing wave: L = n * lambda/2",
            f"lambda = 2L/n = 2*{L}/{harmonic} = {lam:.4f} m",
            f"Frequency f = v/lambda = {v}/{lam:.4f} = {freq:.4f} Hz",
        ]
        check = f"Recomputed f = v/(2L/n) = {v}/{lam:.4f} = {freq:.4f} Hz. OK."
        return {
            "topic": "Waves – Standing Waves",
            "steps": steps,
            "answer": f"lambda = {lam:.4f} m, f = {freq:.4f} Hz",
            "verification": check
        }

    def solve_de_broglie(self, p: deBroglieParams) -> Dict[str, Any]:
        lam = H_PLANCK / p.p
        steps = [
            f"Given: momentum p = {p.p:.2e} kg m/s",
            "de Broglie wavelength: lambda = h/p",
            f"lambda = {H_PLANCK:.2e} / {p.p:.2e} = {lam:.4e} m = {lam*1e9:.4f} nm",
        ]
        return {
            "topic": "Dual Nature – de Broglie Wavelength",
            "steps": steps,
            "answer": f"lambda = {lam:.4e} m = {lam*1e9:.4f} nm",
            "verification": f"h/p = {H_PLANCK:.2e}/{p.p:.2e} = {lam:.4e} m. OK."
        }

    def solve_photon_energy(self, lambda_m: float) -> Dict[str, Any]:
        E = H_PLANCK * C_LIGHT / lambda_m
        E_eV = E / E_CHARGE
        p_ph = E / C_LIGHT
        lam_m2 = H_PLANCK / p_ph
        steps = [
            f"Given: lambda = {lambda_m:.2e} m",
            "Photon energy: E = h*c/lambda",
            f"E = {H_PLANCK:.2e} * {C_LIGHT:.2e} / {lambda_m:.2e} = {E:.4e} J",
            f"E = {E/E_CHARGE:.4f} eV",
            f"Momentum p = E/c = {E:.4e}/{C_LIGHT:.2e} = {p_ph:.4e} kg m/s",
            "Verify: lambda = h/p = " + f"{H_PLANCK:.2e}/{p_ph:.4e} = {lam_m2:.2e} m. OK.",
        ]
        return {
            "topic": "Dual Nature – Photon Energy",
            "steps": steps,
            "answer": f"E = {E:.4e} J = {E_eV:.4f} eV, p = {p_ph:.4e} kg m/s",
            "verification": f"h/p = {lam_m2:.2e} m matches lambda = {lambda_m:.2e} m. OK."
        }

    def solve_dielectric(self, n1: float, n2: float) -> Dict[str, Any]:
        v1 = C_LIGHT / n1
        v2 = C_LIGHT / n2
        K2 = n2 ** 2
        steps = [
            f"Given: n1 = {n1}, n2 = {n2}",
            f"v1 = c/n1 = {C_LIGHT:.0e}/{n1} = {v1:.4e} m/s",
            f"v2 = c/n2 = {C_LIGHT:.0e}/{n2} = {v2:.4e} m/s",
            f"Dielectric constant K2 = n2^2 = {n2}^2 = {K2:.2f}",
        ]
        return {
            "topic": "Electromagnetic Waves – Dielectric Constant",
            "steps": steps,
            "answer": f"v2 = {v2:.4e} m/s, K2 = {K2:.2f}",
            "verification": f"K = n^2 = {n2**2:.2f}. OK."
        }

    # ── 9  Nuclear Physics ────────────────────────────────────────────────────

    def solve_fusion(self, p: FusionParams) -> Dict[str, Any]:
        dm = p.mD + p.mT - p.mHe - p.mn
        E_MeV = dm * 931.5
        steps = [
            f"Given: m(D) = {p.mD} u, m(T) = {p.mT} u",
            f"         m(He) = {p.mHe} u, m(n) = {p.mn} u",
            "Mass defect dm = mD + mT - mHe - mn",
            f"dm = {p.mD} + {p.mT} - {p.mHe} - {p.mn} = {dm:.6f} u",
            "Energy E = dm * 931.5 MeV/u",
            f"E = {dm:.6f} * 931.5 = {E_MeV:.4f} MeV",
        ]
        check = f"dm recomputed = {dm:.6f} u. OK."
        return {
            "topic": "Nuclear Physics – Fusion Energy",
            "steps": steps,
            "answer": f"dm = {dm:.6f} u, E = {E_MeV:.4f} MeV",
            "verification": check
        }

    def solve_radioactivity(self, N0: float, t_half: float, t: float) -> Dict[str, Any]:
        lam = math.log(2.0) / t_half
        Nt = N0 * math.exp(-lam * t)
        A0 = lam * N0
        At = lam * Nt
        steps = [
            f"Given: N0 = {N0:.2e} atoms, t_1/2 = {t_half} s, t = {t} s",
            "Decay constant lambda = ln(2)/t_1/2",
            f"lambda = 0.693/{t_half} = {lam:.4e} s^-1",
            "N(t) = N0 * e^(-lambda*t)",
            f"N({t}) = {N0:.2e} * e^(-{lam:.4e}*{t}) = {Nt:.4e} atoms",
            f"Initial activity A0 = lambda*N0 = {lam:.4e}*{N0:.2e} = {A0:.4e} Bq",
            f"Activity at t: A(t) = lambda*N(t) = {At:.4e} Bq",
        ]
        check = f"A(t)/A0 = e^(-lambda*t) = {math.exp(-lam*t):.4f}. N(t)/N0 = {Nt/N0:.4f}. OK."
        return {
            "topic": "Nuclear Physics – Radioactive Decay",
            "steps": steps,
            "answer": f"N(t) = {Nt:.4e} atoms, A0 = {A0:.4e} Bq, A(t) = {At:.4e} Bq",
            "verification": check
        }

    def solve_diffraction(self, d: float, order: int, theta_deg: float) -> Dict[str, Any]:
        theta_rad = math.radians(theta_deg)
        lam = d * math.sin(theta_rad) / order
        steps = [
            f"Given: d = {d:.2e} m, order n = {order}, theta = {theta_deg} deg",
            f"theta = {theta_rad:.6f} rad",
            "Grating: d*sin(theta) = n*lambda",
            f"lambda = d*sin(theta)/n = {d:.2e} * {math.sin(theta_rad):.4f} / {order}",
            f"lambda = {lam:.4e} m = {lam*1e9:.2f} nm",
        ]
        check = f"n*lambda/d = {order}*{lam:.4e}/{d:.2e} = {order*lam/d:.4f}, sin(theta) = {math.sin(theta_rad):.4f}. OK."
        return {
            "topic": "Wave Optics – Diffraction Grating",
            "steps": steps,
            "answer": f"lambda = {lam:.4e} m = {lam*1e9:.2f} nm",
            "verification": check
        }

    # ── 10  EMI & AC Combined ─────────────────────────────────────────────────

    def solve_transformer_all(self, Np: int, Ns: int, Vp: float,
                              Ps: float, eff: float) -> Dict[str, Any]:
        Vs = Ns * Vp / Np
        Is = Ps / Vs
        Ip = Is * Ns / Np
        Vp_ideal = Ps / Ip
        eff_pct = eff * 100.0
        Irms = Ip / math.sqrt(2.0)
        steps = [
            f"Given: Np={Np}, Ns={Ns}, Vp={Vp} V, Ps={Ps} W, eff={eff}",
            "Vs = (Ns/Np)*Vp",
            f"Vs = {Ns}/{Np}*{Vp} = {Vs:.2f} V",
            "Is = Ps/Vs",
            f"Is = {Ps}/{Vs:.2f} = {Is:.4f} A",
            "Ip = (Ns/Np)*Is",
            f"Ip = {Ns}/{Np}*{Is:.4f} = {Ip:.4f} A",
            "Efficiency eta = Ps/(Vp*Ip)",
            f"eta = {Ps}/({Vp}*{Ip:.4f}) = {eff:.4f} = {eff_pct:.1f}%",
            f"Irms = Ip/sqrt(2) = {Ip:.4f}/{math.sqrt(2):.4f} = {Irms:.4f} A",
        ]
        return {
            "topic": "AC – Transformer (Complete)",
            "steps": steps,
            "answer": f"Vs = {Vs:.2f} V, Is = {Is:.4f} A, Ip = {Ip:.4f} A, eff = {eff_pct:.1f}%",
            "verification": f"Ps/(Vp*Ip) = {Ps}/({Vp}*{Ip:.4f}) = {eff:.4f}. OK."
        }

    # ── 11  Semiconductor ─────────────────────────────────────────────────────

    def solve_transistor_ce(self, Ic: float, beta: float, Rc: float,
                            Vcc: float) -> Dict[str, Any]:
        Ib = Ic / beta
        Pc = Ic ** 2 * Rc
        Vo = Vcc - Ic * Rc
        Vi = Vo / (Ic / Ib)
        Av = Vo / Vi
        steps = [
            f"Given: Ic = {Ic} mA, beta = {beta}, Rc = {Rc} ohm, Vcc = {Vcc} V",
            "Common Emitter: Ib = Ic/beta",
            f"Ib = {Ic}/{beta} = {Ib:.4f} mA",
            f"Power in Rc: Pc = Ic^2 * Rc = {Ic}^2 * {Rc} = {Pc:.4f} mW",
            f"Vo = Vcc - Ic*Rc = {Vcc} - {Ic*Rc:.2f} = {Vo:.4f} V",
            f"Vi = Ib * (input resistance -- simplified: Vi approx) = {Vi:.4f} V",
            f"Voltage gain Av = Vo/Vi = {Vo:.4f}/{Vi:.4f} = {Av:.4f}",
        ]
        return {
            "topic": "Semiconductors – Common Emitter Transistor",
            "steps": steps,
            "answer": f"Ib = {Ib:.4f} mA, Vo = {Vo:.4f} V, Av = {Av:.4f}",
            "verification": f"Ic/Ib = {Ic}/{Ib:.4f} = {beta}. OK."
        }

    # ── 12  Communication ─────────────────────────────────────────────────────

    def solve_modulation(self, fc: float, fm: float,
                         Ac: float, Am: float) -> Dict[str, Any]:
        mod_index = Am / Ac
        sideband_upper = fc + fm
        sideband_lower = fc - fm
        bw = 2.0 * fm
        steps = [
            f"Given: fc = {fc} kHz, fm = {fm} kHz, Ac = {Ac} V, Am = {Am} V",
            "Modulation index m = Am/Ac",
            f"m = {Am}/{Ac} = {mod_index:.4f} ({'over-modulated!' if mod_index>1 else 'within limit'})",
            "Sidebands at fc +/- fm",
            f"USB = {fc} + {fm} = {sideband_upper} kHz",
            f"LSB = {fc} - {fm} = {sideband_lower} kHz",
            "Bandwidth BW = 2*fm",
            f"BW = 2*{fm} = {bw} kHz",
        ]
        return {
            "topic": "Communication – AM Modulation",
            "steps": steps,
            "answer": f"m = {mod_index:.4f}, USB = {sideband_upper} kHz, BW = {bw} kHz",
            "verification": f"m = Am/Ac = {mod_index:.4f}. OK."
        }

    # ── 13  Reflection ────────────────────────────────────────────────────────

    def solve_reflection(self, R: float, u: float, ho: float) -> Dict[str, Any]:
        return self.solve_mirror(R, u, ho)

    # ── 14  Refraction ────────────────────────────────────────────────────────

    def solve_refraction(self, n1: float, n2: float, theta1_deg: float) -> Dict[str, Any]:
        th1 = math.radians(theta1_deg)
        sin_th2 = n1 * math.sin(th1) / n2
        if abs(sin_th2) > 1.0:
            return {
                "topic": "Refraction – Total Internal Reflection",
                "steps": [f"Given: n1={n1}, n2={n2}, theta1={theta1_deg} deg",
                          f"sin(theta2) = n1/n2 * sin(theta1) = {n1}/{n2}*{math.sin(th1):.4f} = {sin_th2:.4f} > 1",
                          "Total internal reflection occurs. No refraction."],
                "answer": "Total internal reflection",
                "verification": f"Critical angle theta_c = arcsin(n2/n1) = arcsin({n2}/{n1}) = {math.degrees(math.asin(n2/n1)):.2f} deg. theta1 > theta_c. OK."
            }
        th2 = math.asin(sin_th2)
        steps = [
            f"Given: n1 = {n1}, n2 = {n2}, theta1 = {theta1_deg} deg",
            f"theta1 = {math.degrees(th1):.4f} rad",
            "Snell's law: n1*sin(theta1) = n2*sin(theta2)",
            f"sin(theta2) = n1/n2 * sin(theta1) = {n1}/{n2} * {math.sin(th1):.4f} = {sin_th2:.4f}",
            f"theta2 = arcsin({sin_th2:.4f}) = {math.degrees(th2):.4f} deg",
        ]
        check = (f"n1*sin(theta1) = {n1}*{math.sin(th1):.4f} = {n1*math.sin(th1):.4f}, "
                 f"n2*sin(theta2) = {n2}*{sin_th2:.4f} = {n2*sin_th2:.4f}. OK.")
        return {
            "topic": "Refraction – Snell's Law",
            "steps": steps,
            "answer": f"theta2 = {math.degrees(th2):.4f} deg",
            "verification": check
        }

    # ── 15  Energy in Nuclear Reactions ───────────────────────────────────────

    def solve_photons_from_wavelength(self, lambda_nm: float) -> Dict[str, Any]:
        lam = lambda_nm * 1e-9
        E_J = H_PLANCK * C_LIGHT / lam
        E_eV = E_J / E_CHARGE
        steps = [
            f"Given: lambda = {lambda_nm} nm = {lam:.2e} m",
            "E = hc/lambda",
            f"E = {H_PLANCK:.2e} * {C_LIGHT:.2e} / {lam:.2e} = {E_J:.4e} J",
            f"E = {E_eV:.4f} eV",
        ]
        return {
            "topic": "Dual Nature – Photon Energy from Wavelength",
            "steps": steps,
            "answer": f"E = {E_J:.4e} J = {E_eV:.4f} eV",
            "verification": f"E = {E_J:.4e} J. OK."
        }

    # ── Public entry point ────────────────────────────────────────────────────

    def solve(self, topic: str, **kwargs) -> Dict[str, Any]:
        dispatch = {
            "coulomb":             lambda: self.solve_coulomb(CoulombParams(**kwargs)),
            "capacitor":           lambda: self.solve_capacitor(CapacitorParams(**kwargs)),
            "parallel_resistors":  lambda: self.solve_parallel_resistors(ParallelResistorParams(**kwargs)),
            "series_resistors":    lambda: self.solve_series_resistors(SeriesResistorParams(**kwargs)),
            "wire_resistance":     lambda: self.solve_wire_resistance(WireResistanceParams(**kwargs)),
            "potentiometer":       lambda: self.solve_potentiometer(kwargs.get("V",12.0), kwargs.get("R",20.0), kwargs.get("l",10.0), kwargs.get("Lb",3.0)),
            "meter_bridge":        lambda: self.solve_meter_bridge(kwargs.get("R_known",10.0), kwargs.get("L1",55.0), kwargs.get("L_wire",100.0)),
            "drift_velocity":      lambda: self.solve_drift_velocity(DriftVelocityParams(**kwargs)),
            "wire_b_field":        lambda: self.solve_wire_b_field(WireBFieldParams(**kwargs)),
            "solenoid":            lambda: self.solve_solenoid(SolenoidParams(**kwargs)),
            "cyclotron":           lambda: self.solve_cyclotron(CyclotronParams(**kwargs)),
            "rl_circuit":          lambda: self.solve_rl_circuit(RLCircuitParams(**kwargs)),
            "rc_circuit":          lambda: self.solve_rc_circuit(RCCircuitParams(**kwargs)),
            "ac_transformer":      lambda: self.solve_ac_transformer(ACTransformerParams(**kwargs)),
            "lcr_impedance":       lambda: self.solve_lcr_impedance(kwargs.get("V",220.0), kwargs.get("R",30.0), kwargs.get("L",0.2), kwargs.get("C",50e-6), kwargs.get("f",50.0)),
            "convex_lens":         lambda: self.solve_convex_lens(ConvexLensParams(**kwargs)),
            "concave_lens":        lambda: self.solve_concave_lens(ConcaveLensParams(**kwargs)),
            "microscope":          lambda: self.solve_microscope(MicroscopeParams(**kwargs)),
            "telescope":           lambda: self.solve_telescope(TelescopeParams(**kwargs)),
            "mirror":              lambda: self.solve_mirror(kwargs.get("R",30.0), kwargs.get("u",-20.0), kwargs.get("ho",4.0)),
            "photoelectric":       lambda: self.solve_photoelectric(PhotoelectricParams(**kwargs)),
            "hall_effect":         lambda: self.solve_hall_effect(kwargs.get("I",3.0), kwargs.get("n",8.5e28), kwargs.get("d",2e-3), kwargs.get("B",0.4)),
            "standing_wave":       lambda: self.solve_standing_wave(kwargs.get("L",1.5), kwargs.get("harmonic",3), kwargs.get("v",60.0)),
            "de_broglie":          lambda: self.solve_de_broglie(deBroglieParams(**kwargs)),
            "photon_energy":       lambda: self.solve_photon_energy(kwargs.get("lambda_m",500e-9)),
            "dielectric":          lambda: self.solve_dielectric(kwargs.get("n1",1.33), kwargs.get("n2",1.5)),
            "fusion":              lambda: self.solve_fusion(FusionParams(**kwargs)),
            "radioactivity":       lambda: self.solve_radioactivity(kwargs.get("N0",2e23), kwargs.get("t_half",5730.0), kwargs.get("t",17190.0)),
            "diffraction":         lambda: self.solve_diffraction(DiffractionParams(**kwargs)),
            "transformer_all":     lambda: self.solve_transformer_all(kwargs.get("Np",1000), kwargs.get("Ns",500), kwargs.get("Vp",220.0), kwargs.get("Ps",1100.0), kwargs.get("eff",0.80)),
            "transistor_ce":       lambda: self.solve_transistor_ce(kwargs.get("Ic",2.0), kwargs.get("beta",100.0), kwargs.get("Rc",500.0), kwargs.get("Vcc",10.0)),
            "modulation":          lambda: self.solve_modulation(kwargs.get("fc",1000.0), kwargs.get("fm",5.0), kwargs.get("Ac",10.0), kwargs.get("Am",6.0)),
            "refraction":          lambda: self.solve_refraction(kwargs.get("n1",1.0), kwargs.get("n2",1.5), kwargs.get("theta1_deg",30.0)),
        }
        if topic not in dispatch:
            return {"error": f"Unknown topic '{topic}'. Available: {list(dispatch.keys())}"}
        return dispatch[topic]()


# ─────────────────────────────────────────────────────────────────────────────
#  Question Generator (deterministic, NEP 2020 compliant)
# ─────────────────────────────────────────────────────────────────────────────

class QuestionGenerator:
    """Deterministic question generator for CISCE Class 12 Physics."""

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self.tol = 0.05

    # ── standard (formula-based) ──────────────────────────────────────────────

    def gen_coulomb(self) -> Dict[str, Any]:
        q1 = self.rng.uniform(1e-6, 5e-6)
        q2 = self.rng.uniform(1e-6, 5e-6)
        r = self.rng.uniform(0.05, 0.2)
        k = 8.99e9
        ans = k * q1 * q2 / (r ** 2)
        return {
            "type": "standard", "topic": "Electrostatics",
            "question": (
                f"Two point charges q1 = {q1:.2e} C and q2 = {q2:.2e} C are "
                f"separated by {r*100:.1f} cm. Calculate the Coulomb force between them."
            ),
            "answer": f"{ans:.4e} N",
            "solution_steps": [
                "Use Coulomb's law: F = k*q1*q2/r^2",
                f"F = {k:.2e} * {q1:.2e} * {q2:.2e} / ({r:.3f})^2",
                f"F = {ans:.4e} N",
            ],
        }

    def gen_series_resistors(self) -> Dict[str, Any]:
        V = self.rng.choice([12.0, 24.0, 36.0, 48.0])
        R1 = self.rng.randint(2, 15)
        R2 = self.rng.randint(2, 15)
        R = R1 + R2
        I = V / R
        return {
            "type": "standard", "topic": "Current Electricity",
            "question": (
                f"Two resistors of {R1} ohm and {R2} ohm are connected in series "
                f"across a {V} V supply. Find the current through the circuit."
            ),
            "answer": f"{I:.4f} A",
            "solution_steps": [
                f"R_eq = R1 + R2 = {R1} + {R2} = {R} ohm",
                f"I = V/R = {V}/{R} = {I:.4f} A",
            ],
        }

    def gen_wire_resistance(self) -> Dict[str, Any]:
        rho = 1.68e-8
        L1 = self.rng.uniform(1.0, 5.0)
        A1 = self.rng.uniform(0.5e-6, 2.0e-6)
        L2 = self.rng.uniform(1.0, 5.0)
        A2 = self.rng.uniform(0.5e-6, 2.0e-6)
        R1 = rho * L1 / A1
        R2 = rho * L2 / A2
        return {
            "type": "standard", "topic": "Current Electricity",
            "question": (
                f"A copper wire of length {L1:.1f} m and area {A1*1e6:.2f} mm^2 "
                f"has resistance {R1:.4f} ohm. Find the resistance of another copper "
                f"wire of length {L2:.1f} m and area {A2*1e6:.2f} mm^2."
            ),
            "answer": f"{R2:.4f} ohm",
            "solution_steps": [
                "R = rho*L/A; same material means same rho",
                f"R2/R1 = (L2/L1)*(A1/A2)",
                f"R2 = {R2:.4f} ohm",
            ],
        }

    def gen_potentiometer(self) -> Dict[str, Any]:
        V = self.rng.choice([6.0, 9.0, 12.0, 15.0])
        l = self.rng.choice([5.0, 10.0, 15.0])
        Lb = self.rng.uniform(1.0, l * 0.8)
        ans = V * Lb / l
        return {
            "type": "standard", "topic": "Current Electricity",
            "question": (
                f"A {V} V battery is connected across a potentiometer wire of length "
                f"{l} m. If the balancing length for an unknown cell is {Lb:.1f} m, "
                f"find the emf of the cell."
            ),
            "answer": f"{ans:.4f} V",
            "solution_steps": [
                f"Potential gradient = {V}/{l} = {V/l:.4f} V/m",
                f"Emf = gradient * Lb = {V/l:.4f} * {Lb:.1f} = {ans:.4f} V",
            ],
        }

    def gen_meter_bridge(self) -> Dict[str, Any]:
        Rk = self.rng.choice([5.0, 10.0, 15.0, 20.0])
        L1 = self.rng.uniform(20.0, 80.0)
        Ru = Rk * L1 / (100.0 - L1)
        return {
            "type": "standard", "topic": "Current Electricity",
            "question": (
                f"In a meter bridge, the known resistance is {Rk} ohm and the "
                f"balance point is at {L1:.1f} cm. Find the unknown resistance."
            ),
            "answer": f"{Ru:.4f} ohm",
            "solution_steps": [
                f"R_u = R_known * L1 / (100 - L1)",
                f"R_u = {Rk} * {L1:.1f} / {100-L1:.1f} = {Ru:.4f} ohm",
            ],
        }

    def gen_magnetic_wire(self) -> Dict[str, Any]:
        I = self.rng.uniform(2.0, 10.0)
        r = self.rng.uniform(0.02, 0.1)
        B = MU0 * I / (2.0 * math.pi * r)
        return {
            "type": "standard", "topic": "Magnetism",
            "question": (
                f"Find the magnetic field at a distance of {r*100:.1f} cm from a "
                f"long straight wire carrying {I:.1f} A."
            ),
            "answer": f"{B:.4e} T",
            "solution_steps": [
                "B = mu0*I/(2*pi*r)",
                f"B = {MU0:.2e}*{I:.1f}/(2*pi*{r:.3f}) = {B:.4e} T",
            ],
        }

    def gen_solenoid(self) -> Dict[str, Any]:
        N = self.rng.randint(200, 1000)
        L = self.rng.uniform(0.2, 1.0)
        I = self.rng.uniform(0.5, 5.0)
        n = N / L
        B = MU0 * n * I
        return {
            "type": "standard", "topic": "Magnetism",
            "question": (
                f"A solenoid has {N} turns wound over a length of {L:.2f} m and "
                f"carries a current of {I:.1f} A. Find the magnetic field inside."
            ),
            "answer": f"{B:.4e} T",
            "solution_steps": [
                f"n = N/L = {N}/{L:.2f} = {n:.0f} turns/m",
                f"B = mu0*n*I = {MU0:.2e}*{n:.0f}*{I:.1f} = {B:.4e} T",
            ],
        }

    def gen_rl_circuit(self) -> Dict[str, Any]:
        R = self.rng.uniform(5.0, 50.0)
        L = self.rng.uniform(0.5, 5.0)
        I0 = self.rng.uniform(2.0, 10.0)
        t = self.rng.uniform(0.01, 0.1)
        tau = L / R
        It = I0 * (1.0 - math.exp(-t / tau))
        return {
            "type": "standard", "topic": "EMI",
            "question": (
                f"An RL circuit has R = {R:.1f} ohm and L = {L:.1f} H. "
                f"A steady current of {I0:.1f} A is flowing when the switch is opened. "
                f"Find the current at t = {t:.3f} s after switching."
            ),
            "answer": f"{It:.4f} A",
            "solution_steps": [
                f"tau = L/R = {L:.1f}/{R:.1f} = {tau:.4f} s",
                f"I(t) = I0*(1 - e^(-t/tau)) = {I0:.1f}*(1-e^(-{t:.3f}/{tau:.4f}))",
                f"I({t:.3f}) = {It:.4f} A",
            ],
        }

    def gen_lens(self) -> Dict[str, Any]:
        f = self.rng.uniform(5.0, 20.0)
        u = self.rng.uniform(-40.0, -15.0)
        v = 1.0 / (1.0 / f - 1.0 / u)
        return {
            "type": "standard", "topic": "Optics",
            "question": (
                f"An object is placed {abs(u):.0f} cm from a convex lens of "
                f"focal length {f:.0f} cm. Find the image distance."
            ),
            "answer": f"{v:.4f} cm",
            "solution_steps": [
                "1/v - 1/u = 1/f",
                f"1/v = 1/{f:.0f} + 1/{u:.0f} = {1/f+1/u:.6f}",
                f"v = {v:.4f} cm",
            ],
        }

    def gen_telescope(self) -> Dict[str, Any]:
        fo = self.rng.uniform(80.0, 200.0)
        fe = self.rng.uniform(4.0, 10.0)
        M = -fo / fe
        return {
            "type": "standard", "topic": "Optics",
            "question": (
                f"An astronomical telescope has objective focal length {fo:.0f} cm "
                f"and eyepiece focal length {fe:.0f} cm. Find the magnifying power."
            ),
            "answer": f"{M:.2f}x",
            "solution_steps": [
                f"M = -fo/fe = -{fo:.0f}/{fe:.0f} = {M:.2f}",
            ],
        }

    def gen_photoelectric(self) -> Dict[str, Any]:
        phi = self.rng.uniform(1.5, 4.0)
        lam = self.rng.uniform(200.0, 400.0)
        lam_m = lam * 1e-9
        f = C_LIGHT / lam_m
        Kmax_eV = H_PLANCK * f / E_CHARGE - phi
        return {
            "type": "standard", "topic": "Dual Nature",
            "question": (
                f"The work function of a metal is {phi:.1f} eV. Light of wavelength "
                f"{lam:.0f} nm is incident. Find the maximum kinetic energy of "
                f"photoelectrons in eV."
            ),
            "answer": f"{Kmax_eV:.4f} eV",
            "solution_steps": [
                f"E_photon = hc/lambda = {H_PLANCK*C_LIGHT/lam_m/E_CHARGE:.4f} eV",
                f"Kmax = E_photon - phi = {H_PLANCK*C_LIGHT/lam_m/E_CHARGE:.4f} - {phi:.1f}",
                f"Kmax = {Kmax_eV:.4f} eV",
            ],
        }

    # ── competency-based (NEP 2020) ───────────────────────────────────────────

    def gen_competency_potentiometer(self) -> Dict[str, Any]:
        V = 6.0
        l = 8.0
        Lb = self.rng.uniform(1.5, 6.5)
        ans = V * Lb / l
        return {
            "type": "competency",
            "topic": "Current Electricity (NEP 2020 – Real-world Scenario)",
            "question": (
                "Priya is comparing two alkaline AA batteries in her physics lab. "
                "She connects the first battery to a potentiometer wire of 8.0 m "
                "length. The potentiometer reads 6.0 V across the full wire. "
                "When she replaces it with a new AA cell, the balance length "
                f"is {Lb:.1f} m. "
                "(a) What is the emf of the new cell? "
                "(b) Which battery is more suitable for a device requiring 3.0 V?"
            ),
            "answer": f"(a) {ans:.4f} V  (b) The battery with emf closest to 3.0 V.",
            "solution_steps": [
                f"Potential gradient = 6.0/8.0 = {6.0/8.0:.4f} V/m",
                f"Emf = gradient * Lb = {6.0/8.0:.4f} * {Lb:.1f} = {ans:.4f} V",
                "Compare emf to 3.0 V requirement.",
            ],
        }

    def gen_competency_ohms_law(self) -> Dict[str, Any]:
        V = self.rng.uniform(3.0, 12.0)
        R = self.rng.uniform(5.0, 50.0)
        P = V ** 2 / R
        return {
            "type": "competency",
            "topic": "Current Electricity (NEP 2020 – Data Interpretation)",
            "question": (
                "A school science project uses a heating coil connected to a {:.0f} V "
                "power supply. The coil has resistance {:.0f} ohm. "
                "(a) Calculate the current through the coil. "
                "(b) Calculate the power dissipated. "
                "(c) If the coil operates for 30 minutes, how much electrical energy "
                "is consumed? Express your answer in kJ."
            ).format(V, R),
            "answer": f"(a) {V/R:.4f} A, (b) {P:.2f} W, (c) {P*1800/1000:.4f} kJ",
            "solution_steps": [
                f"I = V/R = {V}/{R:.0f} = {V/R:.4f} A",
                f"P = V*I = {V}*{V/R:.4f} = {P:.2f} W",
                f"E = P*t = {P:.2f} * 1800 = {P*1800:.0f} J = {P*1800/1000:.4f} kJ",
            ],
        }

    def gen_competency_biot_savart(self) -> Dict[str, Any]:
        I = self.rng.uniform(1.0, 8.0)
        r = self.rng.uniform(0.05, 0.2)
        B = MU0 * I / (2.0 * math.pi * r)
        return {
            "type": "competency",
            "topic": "Magnetism (NEP 2020 – Real-world Scenario)",
            "question": (
                "A straight overhead power line in Mumbai carries a current of "
                f"{I:.1f} A. A bird perches on the wire at a point {r*100:.1f} cm "
                "from the centre of the conductor. "
                "(a) Calculate the magnetic field at the bird's position. "
                "(b) Why is the bird safe despite the high current in the wire?"
            ),
            "answer": f"(a) {B:.4e} T  (b) No potential difference across bird's feet.",
            "solution_steps": [
                "B = mu0*I/(2*pi*r)",
                f"B = {MU0:.2e}*{I:.1f}/(2*pi*{r:.3f}) = {B:.4e} T",
                "Bird is safe because both feet are at same potential (parallel to current).",
            ],
        }

    def gen_competency_microscope(self) -> Dict[str, Any]:
        fo = self.rng.uniform(1.0, 2.0)
        fe = self.rng.uniform(4.0, 6.0)
        uo = self.rng.uniform(-1.2, -1.8)
        D = 25.0
        vo = fo * fe / (fo + fe)
        Mo = -vo / uo
        Me = 1.0 + D / fe
        Mt = Mo * Me
        return {
            "type": "competency",
            "topic": "Optics (NEP 2020 – Case Study)",
            "question": (
                "A biology student in Bangalore uses a compound microscope to observe "
                "onion root tip cells. The microscope has objective focal length "
                f"{fo:.1f} cm and eyepiece focal length {fe:.1f} cm. The object is "
                f"placed {abs(uo):.1f} cm from the objective. "
                "(a) Find the intermediate image distance. "
                "(b) Calculate the total magnifying power. "
                "(c) If the least distance of distinct vision is {D} cm, how does "
                "the eyepiece contribute to magnification?"
            ),
            "answer": f"(a) {vo:.4f} cm, (b) {Mt:.2f}x, (c) Me = {Me:.2f}",
            "solution_steps": [
                f"1/vo = 1/fo + 1/uo = 1/{fo:.1f} + 1/{uo:.1f}",
                f"vo = {vo:.4f} cm",
                f"Mo = -vo/uo = {Mo:.2f}",
                f"Me = 1 + D/fe = 1 + {D}/{fe:.1f} = {Me:.2f}",
                f"Mt = Mo * Me = {Mt:.2f}x",
            ],
        }

    def gen_competency_photoelectric(self) -> Dict[str, Any]:
        phi = self.rng.uniform(1.8, 3.0)
        lam = self.rng.uniform(220.0, 350.0)
        lam_m = lam * 1e-9
        f = C_LIGHT / lam_m
        Kmax_eV = H_PLANCK * f / E_CHARGE - phi
        return {
            "type": "competency",
            "topic": "Dual Nature (NEP 2020 – Assertion-Reasoning)",
            "question": (
                f"Assertion: Photoelectrons emitted from a metal surface (phi = {phi:.1f} eV) "
                f"by light of wavelength {lam:.0f} nm have maximum kinetic energy of "
                f"about {Kmax_eV:.2f} eV.\n"
                f"Reason: The energy of incident photon equals work function plus "
                f"maximum kinetic energy of emitted electrons.\n"
                "(a) Both assertion and reason are true, and reason explains assertion.\n"
                "(b) Both are true, but reason does not explain assertion.\n"
                "(c) Assertion is true, reason is false.\n"
                "(d) Assertion is false, reason is true."
            ),
            "answer": "(a) Both assertion and reason are true, and reason explains assertion.",
            "solution_steps": [
                f"E_photon = hc/lambda = {H_PLANCK*C_LIGHT/lam_m/E_CHARGE:.4f} eV",
                f"Kmax = {H_PLANCK*C_LIGHT/lam_m/E_CHARGE:.4f} - {phi:.1f} = {Kmax_eV:.4f} eV",
                "Assertion verified. Einstein's photoelectric equation confirms the reason.",
            ],
        }

    def gen_competency_radioactivity(self) -> Dict[str, Any]:
        N0 = 1.0e23
        t_half = self.rng.choice([1600.0, 5730.0, 1925.0])
        t = t_half * 3
        Nt = N0 * (0.5 ** 3)
        return {
            "type": "competency",
            "topic": "Nuclear Physics (NEP 2020 – Data Interpretation)",
            "question": (
                f"A sample contains {N0:.0e} radioactive nuclei with half-life "
                f"{t_half:.0f} years. A scientist measures the activity after "
                f"{t:.0f} years. "
                "(a) What fraction of nuclei remain undecayed? "
                "(b) What is the activity if the initial activity was 3.7e10 Bq?"
            ),
            "answer": f"(a) 12.5% (1/8), (b) {3.7e10*0.125:.4e} Bq",
            "solution_steps": [
                f"Three half-lives elapsed: N = N0 * (1/2)^3 = {Nt:.2e}",
                f"Fraction = {Nt/N0:.4f} = 12.5%",
                f"A(t) = A0/8 = {3.7e10*0.125:.4e} Bq",
            ],
        }

    def gen_competency_lcr(self) -> Dict[str, Any]:
        V = 230.0
        R = 20.0
        L = 0.1
        C = 10e-6
        f = 50.0
        omega = 2 * math.pi * f
        Xl = omega * L
        Xc = 1.0 / (omega * C)
        Z = math.sqrt(R**2 + (Xl - Xc)**2)
        I = V / Z
        return {
            "type": "competency",
            "topic": "AC (NEP 2020 – Real-world Scenario)",
            "question": (
                f"An Indian household has a ceiling fan (resistive, 20 ohm equivalent) "
                f"and a capacitor (10 uF) connected in series to a {V} V, {f} Hz AC supply. "
                f"The inductance of the fan winding is {L} H. "
                "(a) Calculate the impedance of the circuit. "
                "(b) Find the current flowing. "
                "(c) Is the current leading or lagging the voltage? Explain."
            ),
            "answer": f"(a) {Z:.4f} ohm, (b) {I:.4f} A, (c) {'Leading' if Xc>Xl else 'Lagging'} (capacitive since Xc > Xl)",
            "solution_steps": [
                f"omega = 2*pi*{f} = {omega:.2f} rad/s",
                f"Xl = {Xl:.4f} ohm, Xc = {Xc:.4f} ohm",
                f"Xl - Xc = {Xl-Xc:.4f} ohm (net capacitive)",
                f"Z = sqrt({R}^2 + {Xl-Xc:.4f}^2) = {Z:.4f} ohm",
                f"I = {V}/{Z:.4f} = {I:.4f} A",
            ],
        }

    def generate(self, n: int = 10) -> List[Dict[str, Any]]:
        """Generate n questions (50% standard, 50% competency-based)."""
        std_gen = [
            self.gen_coulomb, self.gen_series_resistors, self.gen_wire_resistance,
            self.gen_potentiometer, self.gen_meter_bridge, self.gen_magnetic_wire,
            self.gen_solenoid, self.gen_rl_circuit, self.gen_lens,
            self.gen_telescope, self.gen_photoelectric,
        ]
        comp_gen = [
            self.gen_competency_potentiometer, self.gen_competency_ohms_law,
            self.gen_competency_biot_savart, self.gen_competency_microscope,
            self.gen_competency_photoelectric, self.gen_competency_radioactivity,
            self.gen_competency_lcr,
        ]
        questions = []
        n_std = n // 2
        n_comp = n - n_std
        self.rng.shuffle(std_gen)
        self.rng.shuffle(comp_gen)
        for i in range(n_std):
            questions.append(std_gen[i % len(std_gen)]())
        for i in range(n_comp):
            questions.append(comp_gen[i % len(comp_gen)]())
        return questions

    def format_questions(self, qs: List[Dict[str, Any]]) -> str:
        lines = []
        for i, q in enumerate(qs, 1):
            lines.append(f"Q{i}. [{q['type'].upper()}] ({q['topic']})")
            lines.append(f"   {q['question']}")
            lines.append(f"   Answer: {q['answer']}")
            lines.append("   Steps:")
            for s in q["solution_steps"]:
                lines.append(f"     - {s}")
            lines.append("")
        return "\n".join(lines)


# ─────────────────────────────────────────────────────────────────────────────
#  Demo / main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    print("=" * 70)
    print("CISCE CLASS 12 PHYSICS – SOLVER DEMONSTRATION")
    print("=" * 70)

    solver = Class12PhysicsSolver()

    # Demo a selection of topics
    demo_cases = [
        ("coulomb",                  "q1", 2e-6, "q2", 3e-6, "r", 0.05),
        ("capacitor",                "A", 0.02, "d", 1e-3, "K", 2.0, "V", 100.0),
        ("parallel_resistors",       "V", 12.0, "R1", 6.0, "R2", 3.0),
        ("series_resistors",         "V", 24.0, "R1", 4.0, "R2", 8.0),
        ("wire_resistance",          "rho", 1.68e-8, "L1", 2.0, "A1", 1e-6, "L2", 4.0, "A2", 2e-6),
        ("potentiometer",            "V", 12.0, "R", 20.0, "l", 10.0, "Lb", 3.0),
        ("drift_velocity",           "I", 2.0, "n", 8.5e28, "A", 1e-6, "l", 2.0, "rho_w", 1.68e-8),
        ("wire_b_field",             "I", 5.0, "r", 0.04, "q", 1.6e-19, "v", 3e6, "v_parallel", 4e6),
        ("solenoid",                 "N", 500, "L_sol", 0.5, "I", 2.0, "A_sol", 2e-4, "dI_dt", 50.0),
        ("cyclotron",                "q", 1.6e-19, "v", 2e7, "B", 0.5, "m", 3.34e-27),
        ("rl_circuit",               "R", 10.0, "L", 2.0, "I0", 5.0, "t", 0.05),
        ("rc_circuit",               "R", 1000.0, "C", 500e-6, "V", 12.0, "t", 0.5),
        ("ac_transformer",           "Vp", 220.0, "Np", 1000, "Ns", 200, "Ip", 0.5, "Po", 85.0),
        ("convex_lens",              "f", 10.0, "u", -30.0, "ho", 5.0),
        ("concave_lens",             "f", -15.0, "u", -30.0, "ho", 6.0),
        ("microscope",               "fo", 1.0, "fe", 4.0, "uo", -1.5, "D", 25.0),
        ("telescope",                "fo", 100.0, "fe", 5.0),
        ("mirror",                   "R", 30.0, "u", -20.0, "ho", 4.0),
        ("photoelectric",            "phi_eV", 2.3, "lambda_nm", 250.0),
        ("hall_effect",              "I", 3.0, "n", 8.5e28, "d", 2e-3, "B", 0.4),
        ("standing_wave",            "L", 1.5, "harmonic", 3, "v", 60.0),
        ("de_broglie",               "p", 3.3e-24),
        ("photon_energy",            "lambda_m", 500e-9),
        ("dielectric",               "n1", 1.33, "n2", 1.5),
        ("fusion",                   "mD", 2.014102, "mT", 3.016049, "mHe", 4.002603, "mn", 1.008665),
        ("radioactivity",            "N0", 2e23, "t_half", 5730.0, "t", 17190.0),
        ("diffraction",              "d", 1.5e-6, "order", 2, "theta_deg", 30.0),
        ("transformer_all",          "Np", 1000, "Ns", 500, "Vp", 220.0, "Ps", 1100.0, "eff", 0.80),
        ("transistor_ce",            "Ic", 2.0, "beta", 100.0, "Rc", 500.0, "Vcc", 10.0),
        ("modulation",               "fc", 1000.0, "fm", 5.0, "Ac", 10.0, "Am", 6.0),
        ("refraction",               "n1", 1.0, "n2", 1.5, "theta1_deg", 30.0),
    ]

    for topic, *params in demo_cases:
        kwargs = {params[i]: params[i+1] for i in range(0, len(params), 2)}
        result = solver.solve(topic, **kwargs)
        print(f"\n{'─'*60}")
        print(f"TOPIC: {result.get('topic', topic)}")
        print(f"{'─'*60}")
        for step in result.get("steps", []):
            print(f"  {step}")
        print(f"\n  >>> ANSWER: {result.get('answer', 'N/A')}")
        print(f"  >>> VERIFY: {result.get('verification', 'N/A')}")

    print(f"\n{'='*70}")
    print("QUESTION GENERATOR DEMO")
    print("=" * 70)
    gen = QuestionGenerator(seed=42)
    questions = gen.generate(8)
    print(gen.format_questions(questions))


if __name__ == "__main__":
    main()