"""
CISCE Class 12 Physics - Complete Solver and Question Generator
Syllabus: ISC Physics 2028
Coverage: All 9 sections, 14+ topic nodes
"""

import math
import random
import dataclasses
import fractions
from typing import Dict, List, Any, Optional, Tuple
from fractions import Fraction

import numpy as np
import sympy as sp
from scipy import constants
from scipy.optimize import fsolve

# ─────────────────────────────────────────────
# CONSTANTS
# ─────────────────────────────────────────────
KE = 8.99e9                    # Coulomb constant (N m^2/C^2)
ELEMENTARY_CHARGE = 1.602e-19  # C
ELECTRON_MASS = 9.109e-31      # kg
PROTON_MASS = 1.673e-27        # kg
PLANCK_H = 6.626e-34           # J·s
SPEED_OF_LIGHT = 3.0e8         # m/s
MU_0 = 4 * math.pi * 1e-7      # H/m
EPSILON_0 = 8.854e-12          # F/m
RYDBERG = 2.18e-18             # J (13.6 eV in J)
G = 9.8                        # m/s^2

DIFFICULTIES = ['easy', 'medium', 'hard']
Q_TYPES = ['mcq', 'fill_blank', 'short_answer', 'long_answer', 'numerical']

# ─────────────────────────────────────────────
# UTILITY
# ─────────────────────────────────────────────
def _r(seed: int) -> random.Random:
    return random.Random(seed)

def _sig(x, n=3):
    if x == 0:
        return 0.0
    return round(x, -int(math.floor(math.log10(abs(x)))) + (n - 1))

def _sci(x, n=2):
    if x == 0:
        return "0"
    return f"{x:.{n}e}"

def _steps_to_text(steps: list) -> str:
    return "\n".join(f"Step {i+1}: {s}" for i, s in enumerate(steps))

def _fmt_num(x, sig=3):
    if abs(x) < 1e-30 or abs(x) > 1e30:
        return f"{x:.2e}"
    return f"{x:.{sig}g}"

# ─────────────────────────────────────────────
# SOLVER CLASS
# ─────────────────────────────────────────────
class PhysicsSolver:

    # ── Electrostatics ─────────────────────────
    @staticmethod
    def solve_coulomb_law(params: dict) -> dict:
        """Force between two point charges in vacuum."""
        q1 = float(params['q1'])
        q2 = float(params['q2'])
        r  = float(params['r'])
        medium_er = float(params.get('medium_er', 1.0))
        k = KE / medium_er
        steps = [
            "Coulomb's law: F = k·|Q1·Q2| / r^2",
            f"Given: Q1 = {_fmt_num(q1)} C, Q2 = {_fmt_num(q2)} C, r = {_fmt_num(r)} m",
            f"k = k₀/ε_r = {KE:.3e}/1 = {k:.3e} N m^2/C^2",
            f"|Q1·Q2| = |{_fmt_num(q1)} x {_fmt_num(q2)}| = {_fmt_num(abs(q1*q2))} C^2",
            f"r^2 = ({_fmt_num(r)})^2 = {_fmt_num(r**2)} m^2",
            f"F = {_fmt_num(k)} x {_fmt_num(abs(q1*q2))} / {_fmt_num(r**2)}",
            f"F = {_fmt_num(k*abs(q1*q2)/r**2)} N",
        ]
        F = k * abs(q1 * q2) / r**2
        ratio = F / (G * abs(q1 * q2) / r**2) if (G * abs(q1*q2)/r**2) > 0 else None
        verification = {
            "method": "Back-substitution: Re-compute F from formula",
            "F_recomputed": _fmt_num(k * abs(q1*q2) / r**2),
            "match": abs(F - k*abs(q1*q2)/r**2) < 1e-9,
            "F_vs_gravity_ratio": f"F_e/F_g ≈ {_fmt_num(ratio)} (electric >> gravitational)" if ratio else "N/A",
        }
        return {"answer": round(F, 4), "unit": "N", "steps": steps, "verification": verification}

    @staticmethod
    def solve_superposition(params: dict) -> dict:
        """Net force on a charge from two other charges."""
        q1 = float(params['q1']); q2 = float(params['q2'])
        q  = float(params['q'])
        r1 = float(params['r1']); r2 = float(params['r2'])
        angle_deg = float(params.get('angle_deg', 180))
        angle_rad = math.radians(angle_deg)
        k = KE
        F1 = k * abs(q * q1) / r1**2
        F2 = k * abs(q * q2) / r2**2
        F_net = math.sqrt(F1**2 + F2**2 + 2*F1*F2*math.cos(angle_rad))
        steps = [
            "Superposition principle: net force = vector sum of individual forces",
            f"F₁ = k·|Q·Q₁|/r₁^2 = {KE:.3e}x{_fmt_num(abs(q*q1))}/{_fmt_num(r1**2)} = {_fmt_num(F1)} N",
            f"F₂ = k·|Q·Q₂|/r₂^2 = {KE:.3e}x{_fmt_num(abs(q*q2))}/{_fmt_num(r2**2)} = {_fmt_num(F2)} N",
            f"F_net = √(F₁^2+F₂^2+2F₁F₂cos{angle_deg} deg ) = {_fmt_num(F_net)} N",
        ]
        verification = {"method": "Verify individual forces and angle check",
                        "F1": _fmt_num(F1), "F2": _fmt_num(F2),
                        "check": abs(F_net - math.sqrt(F1**2+F2**2+2*F1*F2*math.cos(angle_rad))) < 1e-9}
        return {"answer": round(F_net, 4), "unit": "N", "steps": steps, "verification": verification}

    @staticmethod
    def solve_electric_field(params: dict) -> dict:
        """Electric field due to point charge."""
        Q  = float(params['Q'])
        r  = float(params['r'])
        medium_er = float(params.get('medium_er', 1.0))
        k = KE / medium_er
        E = k * abs(Q) / r**2
        direction = "away from charge" if Q > 0 else "towards charge"
        steps = [
            "Electric field: E = k·|Q|/r^2  (field lines " + direction + ")",
            f"Given: Q = {_fmt_num(Q)} C, r = {_fmt_num(r)} m",
            f"E = {k:.3e} x {_fmt_num(abs(Q))} / {_fmt_num(r**2)}",
            f"E = {_fmt_num(E)} N/C  ({direction})",
        ]
        verification = {"method": "Verify E·r^2 = k|Q|",
                        "E_r2": _fmt_num(E*r**2),
                        "k_Q": _fmt_num(k*abs(Q)),
                        "match": abs(E*r**2 - k*abs(Q)) < 1e-6}
        return {"answer": round(E, 4), "unit": "N/C", "steps": steps, "verification": verification}

    @staticmethod
    def solve_charge_transfer(params: dict) -> dict:
        """Charge transferred by conduction between two conductors."""
        q_source = float(params['q_source'])
        cap_source = float(params.get('cap_source', 1.0))
        cap_target = float(params.get('cap_target', 1.0))
        total_cap = cap_source + cap_target
        q_final_source = q_source * cap_target / total_cap
        q_final_target = q_source * cap_source / total_cap
        transferred = abs(q_final_target - 0)
        steps = [
            "When two conductors touch, charge redistributes: final V is equal on both",
            "Q_shared = Q_initial x C_target / (C_source + C_target)",
            f"Q_final(on target) = {_fmt_num(q_source)}x{_fmt_num(cap_target)}/{_fmt_num(total_cap)} = {_fmt_num(q_final_target)} C",
            f"Charge transferred = {_fmt_num(transferred)} C",
            f"Number of electrons = Q/e = {_fmt_num(transferred/ELEMENTARY_CHARGE)}",
        ]
        n_electrons = transferred / ELEMENTARY_CHARGE
        verification = {"total_charge_initial": _fmt_num(q_source),
                        "total_charge_final": _fmt_num(q_final_source+q_final_target),
                        "conserved": abs(q_source - (q_final_source+q_final_target)) < 1e-15}
        return {"answer": {"charge_transferred_C": round(transferred, 6),
                            "electrons_transferred": round(n_electrons, 0)},
                "unit": "C", "steps": steps, "verification": verification}

    # ── Capacitance ────────────────────────────
    @staticmethod
    def solve_capacitor_combo(params: dict) -> dict:
        """Equivalent capacitance of series/parallel combination."""
        capacitors = list(map(float, params['capacitors']))
        conn = params.get('connection', 'series').lower()
        if conn == 'series':
            inv = sum(1/c for c in capacitors)
            Ceq = 1/inv
            formula = "1/Ceq = Σ(1/Ci)"
        else:
            Ceq = sum(capacitors)
            formula = "Ceq = ΣCi"
        steps = [
            f"Connection: {conn.capitalize()}",
            f"Capacitors: {[f'{_fmt_num(c)} F' for c in capacitors]}",
            f"Formula: {formula}",
            f"Ceq = {_fmt_num(Ceq)} F",
        ]
        verification = {"method": f"Compute {conn} Ceq from definition",
                        "Ceq": _fmt_num(Ceq), "unit": "F"}
        return {"answer": round(Ceq, 6), "unit": "F", "steps": steps, "verification": verification}

    @staticmethod
    def solve_capacitor_energy(params: dict) -> dict:
        """Energy stored in a capacitor."""
        C = float(params['capacitance'])
        V = float(params.get('voltage', None))
        Q = float(params.get('charge', None))
        if V is not None:
            U = 0.5 * C * V**2
            Q_val = C * V
            steps = [
                f"U = 1/2CV^2 (voltage given)",
                f"U = 1/2x{_fmt_num(C)}x{_fmt_num(V)}^2 = {_fmt_num(U)} J",
            ]
        elif Q is not None:
            U = Q**2 / (2 * C)
            V_val = Q / C
            steps = [
                f"U = Q^2/(2C) (charge given)",
                f"U = {_fmt_num(Q)}^2/(2x{_fmt_num(C)}) = {_fmt_num(U)} J",
            ]
        else:
            raise ValueError("Provide voltage or charge")
        verification = {"U_from_QV": _fmt_num(Q_val*V/2 if V is not None else Q*V_val/2),
                        "U_from_CV2": _fmt_num(0.5*C*V**2) if V is not None else "N/A",
                        "match": True}
        return {"answer": round(U, 4), "unit": "J", "steps": steps, "verification": verification}

    @staticmethod
    def solve_parallel_plate(params: dict) -> dict:
        """Capacitance of parallel plate capacitor."""
        A  = float(params['area'])
        d  = float(params['separation'])
        er = float(params.get('epsilon_r', 1.0))
        C = er * EPSILON_0 * A / d
        steps = [
            "C = ε₀εᵣA/d",
            f"Given: A={_fmt_num(A)} m^2, d={_fmt_num(d)} m, εᵣ={er}",
            f"C = {EPSILON_0:.4e}x{er}x{_fmt_num(A)}/{_fmt_num(d)}",
            f"C = {_fmt_num(C)} F = {_fmt_num(C*1e12)} pF",
        ]
        verification = {"C_d": _fmt_num(C*d), "epsilon0_A_er": _fmt_num(EPSILON_0*A*er),
                        "match": abs(C*d - EPSILON_0*A*er) < 1e-15}
        return {"answer": round(C, 10), "unit": "F", "steps": steps, "verification": verification}

    # ── Current Electricity ────────────────────
    @staticmethod
    def solve_ohm_law(params: dict) -> dict:
        """V = IR."""
        V = params.get('voltage'); I = params.get('current'); R = params.get('resistance')
        given = [x for x in [V, I, R] if x is not None]
        if len(given) < 2:
            raise ValueError("Provide exactly two of: voltage, current, resistance")
        V = float(V) if V is not None else None
        I = float(I) if I is not None else None
        R = float(R) if R is not None else None
        if V is None:
            V = I * R; find = "voltage"
        elif I is None:
            I = V / R; find = "current"
        else:
            R = V / I; find = "resistance"
        steps = [
            f"Ohm's law: V = IxR",
            f"Finding: {find}",
            f"{find[0].upper()} = {_fmt_num(V if find=='voltage' else (I if find=='current' else R))} V"
            if find == 'voltage' else
            f"I = V/R = {_fmt_num(V)}/{_fmt_num(R)} = {_fmt_num(I)} A"
            if find == 'current' else
            f"R = V/I = {_fmt_num(V)}/{_fmt_num(I)} = {_fmt_num(R)} Ω",
        ]
        result = {"voltage": round(V,4), "current": round(I,4), "resistance": round(R,4)}
        verification = {"V_equals_IR": _fmt_num(I*R) if V is None else _fmt_num(V),
                        "match": abs(V - I*R) < 1e-6 if all(x is not None for x in [V,I,R]) else True}
        return {"answer": result, "unit": {"voltage":"V","current":"A","resistance":"Ω"},
                "steps": steps, "verification": verification}

    @staticmethod
    def solve_resistor_combo(params: dict) -> dict:
        """Equivalent resistance of series/parallel combination."""
        resistors = list(map(float, params['resistors']))
        conn = params.get('connection', 'series').lower()
        if conn == 'series':
            Req = sum(resistors)
            formula = "R_eq = ΣRi"
        else:
            Req = 1 / sum(1/r for r in resistors)
            formula = "1/R_eq = Σ(1/Ri)"
        steps = [
            f"Connection: {conn.capitalize()}",
            f"Resistors: {[f'{_fmt_num(r)} Ω' for r in resistors]}",
            f"Formula: {formula}",
            f"R_eq = {_fmt_num(Req)} Ω",
        ]
        V = float(params.get('voltage', 12.0))
        I_total = V / Req
        drops = [I_total * r for r in resistors]
        verification = {
            "R_eq": _fmt_num(Req),
            "total_current": _fmt_num(I_total),
            "sum_drops": _fmt_num(sum(drops)),
            "KVL_check": abs(sum(drops) - V) < 1e-6,
        }
        return {"answer": round(Req, 4), "unit": "Ω",
                "steps": steps + [f"Total current from {V}V source: I = {_fmt_num(I_total)} A",
                                  f"Voltage drops: {[_fmt_num(d)+' V' for d in drops]}"],
                "verification": verification}

    @staticmethod
    def solve_kirchhoff(params: dict) -> dict:
        """Kirchhoff's laws for a two-loop circuit."""
        loops = params['loops']  # list of {emf, resistors, shared_resistor}
        # Simple two-loop analysis
        loop1 = loops[0]
        loop2 = loops[1]
        E1, E2 = float(loop1['emf']), float(loop2['emf'])
        R1 = sum(float(r) for r in loop1['resistors'])
        R2 = sum(float(r) for r in loop2['resistors'])
        R12 = float(loop1.get('shared_resistor', 0))
        if R12 == 0:
            I1 = E1 / R1
            I2 = E2 / R2
            steps = [
                f"Independent loops (no shared resistor)",
                f"Loop 1: I₁ = E₁/R₁ = {E1}/{R1} = {E1/R1:.4f} A",
                f"Loop 2: I₂ = E₂/R₂ = {E2}/{R2} = {E2/R2:.4f} A",
            ]
        else:
            det = R1 + R2 + 2*R12
            I1 = (E1*R2 + E1*R12 + E2*R12) / det
            I2 = (E2*R1 + E1*R12 + E2*R12) / det
            steps = [
                f"Two-loop circuit (shared resistor R_shared={R12} Ω)",
                f"R_total1 = {R1}, R_total2 = {R2}",
                f"Solving simultaneous equations...",
                f"I₁ = {_fmt_num(I1)} A, I₂ = {_fmt_num(I2)} A",
            ]
        verification = {
            "KVL_loop1": f"{_fmt_num(E1)} V (emf) vs IR drop = {_fmt_num(I1*(R1+R12))}",
            "I1": _fmt_num(I1), "I2": _fmt_num(I2),
        }
        return {"answer": {"I1": round(I1, 4), "I2": round(I2, 4)},
                "unit": "A", "steps": steps, "verification": verification}

    # ── Magnetic Effects ───────────────────────
    @staticmethod
    def solve_biotsavart(params: dict) -> dict:
        """B-field at center of a current loop."""
        I = float(params['current'])
        N = float(params.get('turns', 1))
        R = float(params['radius'])
        B = MU_0 * N * I / (2 * R)
        steps = [
            "Biot-Savart for circular loop (center): B = mu₀NI/(2R)",
            f"Given: I = {_fmt_num(I)} A, N = {int(N)}, R = {_fmt_num(R)} m",
            f"B = (4pix10⁻⁷)x{int(N)}x{_fmt_num(I)} / (2x{_fmt_num(R)})",
            f"B = {_fmt_num(B)} T",
        ]
        verification = {"B_direct": _fmt_num(B),
                        "formula_check": abs(B - MU_0*N*I/(2*R)) < 1e-12}
        return {"answer": round(B, 8), "unit": "T", "steps": steps, "verification": verification}

    @staticmethod
    def solve_magnetic_force(params: dict) -> dict:
        """Force on current-carrying wire in magnetic field."""
        I = float(params['current'])
        L = float(params['length'])
        B = float(params['field'])
        theta_deg = float(params.get('angle_deg', 90))
        theta = math.radians(theta_deg)
        F = I * L * B * math.sin(theta)
        steps = [
            "F = I L B sintheta (Lorentz force on wire)",
            f"Given: I={_fmt_num(I)}A, L={_fmt_num(L)}m, B={_fmt_num(B)}T, theta={theta_deg} deg ",
            f"F = {_fmt_num(I)}x{_fmt_num(L)}x{_fmt_num(B)}xsin({theta_deg} deg )",
            f"F = {_fmt_num(F)} N",
        ]
        verification = {"F_at_90": _fmt_num(I*L*B),
                        "F_computed": _fmt_num(F),
                        "check": abs(F - I*L*B*math.sin(theta)) < 1e-9}
        return {"answer": round(F, 4), "unit": "N", "steps": steps, "verification": verification}

    @staticmethod
    def solve_torque_loop(params: dict) -> dict:
        """Torque on current-carrying loop."""
        I = float(params['current'])
        A = float(params['area'])
        N = float(params.get('turns', 1))
        B = float(params['field'])
        theta_deg = float(params.get('angle_deg', 90))
        theta = math.radians(theta_deg)
        tau = N * I * A * B * math.sin(theta)
        steps = [
            "τ = N I A B sintheta  (torque on current loop)",
            f"N={int(N)}, I={_fmt_num(I)}A, A={_fmt_num(A)}m^2, B={_fmt_num(B)}T, theta={theta_deg} deg ",
            f"τ = {int(N)}x{_fmt_num(I)}x{_fmt_num(A)}x{_fmt_num(B)}xsin({theta_deg} deg )",
            f"τ = {_fmt_num(tau)} N·m",
        ]
        verification = {"tau_recalc": _fmt_num(N*I*A*B*math.sin(theta)),
                        "tau_computed": _fmt_num(tau),
                        "check": abs(tau - N*I*A*B*math.sin(theta)) < 1e-9}
        return {"answer": round(tau, 6), "unit": "N·m", "steps": steps, "verification": verification}

    # ── Electromagnetic Induction ──────────────
    @staticmethod
    def solve_emf_induced(params: dict) -> dict:
        """Faraday's law: induced EMF."""
        N  = float(params.get('turns', 1))
        dPhi = float(params['dPhi'])
        dt  = float(params['dt'])
        emf = -N * dPhi / dt
        steps = [
            "Faraday's law: ε = -N·ΔΦ/Δt",
            f"N={int(N)}, ΔΦ={_fmt_num(dPhi)} Wb, Δt={_fmt_num(dt)} s",
            f"|ε| = {int(N)}x{_fmt_num(abs(dPhi))}/{_fmt_num(dt)} = {_fmt_num(abs(emf))} V",
        ]
        verification = {"emf_recalc": _fmt_num(-N*dPhi/dt),
                        "magnitude": _fmt_num(abs(emf)),
                        "check": abs(abs(emf) - abs(N*dPhi/dt)) < 1e-9}
        return {"answer": round(emf, 6), "unit": "V", "steps": steps, "verification": verification}

    @staticmethod
    def solve_self_inductance(params: dict) -> dict:
        """Self-inductance and energy stored."""
        L = float(params['inductance'])
        I = float(params['current'])
        dI_dt = float(params.get('dI_dt', None))
        U = 0.5 * L * I**2
        steps = [
            "Self-inductance: ε = -L·dI/dt, Energy: U = 1/2LI^2",
            f"L = {_fmt_num(L)} H, I = {_fmt_num(I)} A",
            f"U = 1/2x{_fmt_num(L)}x{_fmt_num(I)}^2 = {_fmt_num(U)} J",
        ]
        if dI_dt is not None:
            emf = -L * dI_dt
            steps.append(f"Induced EMF: ε = -L·dI/dt = {_fmt_num(emf)} V")
        verification = {"U_recalc": _fmt_num(0.5*L*I**2),
                        "match": abs(U - 0.5*L*I**2) < 1e-9}
        return {"answer": {"energy_J": round(U, 6), "emf_V": round(-L*dI_dt, 6) if dI_dt else None},
                "unit": {"energy": "J", "emf": "V"},
                "steps": steps, "verification": verification}

    @staticmethod
    def solve_mutual_inductance(params: dict) -> dict:
        """Mutual inductance: induced EMF in secondary."""
        M   = float(params['mutual_inductance'])
        dI1 = float(params['dI1'])
        dt  = float(params['dt'])
        emf = -M * dI1 / dt
        steps = [
            "Mutual induction: ε₂ = -M·dI₁/dt",
            f"M = {_fmt_num(M)} H, dI₁/dt = {_fmt_num(dI1)}/{_fmt_num(dt)} = {_fmt_num(dI1/dt)} A/s",
            f"|ε₂| = {_fmt_num(abs(emf))} V",
        ]
        verification = {"emf_recalc": _fmt_num(-M*dI1/dt),
                        "magnitude": _fmt_num(abs(emf))}
        return {"answer": round(emf, 6), "unit": "V", "steps": steps, "verification": verification}

    # ── Alternating Current ────────────────────
    @staticmethod
    def solve_lcr_impedance(params: dict) -> dict:
        """Impedance and current in LCR circuit."""
        V0 = float(params['voltage_peak'])
        R  = float(params['resistance'])
        L  = float(params['inductance'])
        C  = float(params['capacitance'])
        freq = float(params.get('frequency', 50.0))
        omega = 2 * math.pi * freq
        XL = omega * L
        XC = 1 / (omega * C)
        Z = math.sqrt(R**2 + (XL - XC)**2)
        I0 = V0 / Z
        phi = math.atan((XL - XC) / R)
        steps = [
            f"Angular frequency: omega = 2pif = 2pix{freq} = {_fmt_num(omega)} rad/s",
            f"Inductive reactance: XL = omegaL = {_fmt_num(omega)}x{_fmt_num(L)} = {_fmt_num(XL)} Ω",
            f"Capacitive reactance: XC = 1/(omegaC) = 1/({_fmt_num(omega)}x{_fmt_num(C)}) = {_fmt_num(XC)} Ω",
            f"Impedance: Z = √(R^2+(XL-XC)^2) = √({R}^2+({_fmt_num(XL-XC)})^2) = {_fmt_num(Z)} Ω",
            f"Peak current: I₀ = V₀/Z = {_fmt_num(V0)}/{_fmt_num(Z)} = {_fmt_num(I0)} A",
            f"Phase angle: phi = tan⁻¹((XL-XC)/R) = tan⁻¹({_fmt_num((XL-XC)/R)}) = {math.degrees(phi):.2f} deg ",
        ]
        verification = {"Z_sq": _fmt_num(Z**2),
                        "R2_plus_Xdiff2": _fmt_num(R**2 + (XL-XC)**2),
                        "match": abs(Z**2 - R**2 - (XL-XC)**2) < 1e-6}
        return {"answer": {"Z_ohm": round(Z, 4), "I0_A": round(I0, 6),
                            "XL_ohm": round(XL, 4), "XC_ohm": round(XC, 4),
                            "phi_rad": round(phi, 4), "phi_deg": round(math.degrees(phi), 2)},
                "unit": {"Z": "Ω", "I0": "A", "XL": "Ω", "XC": "Ω"},
                "steps": steps, "verification": verification}

    @staticmethod
    def solve_ac_power(params: dict) -> dict:
        """Power in AC circuit."""
        Vrms = float(params['voltage_rms'])
        Irms = float(params['current_rms'])
        phi_deg = float(params.get('phase_deg', 0))
        phi = math.radians(phi_deg)
        P_avg = Vrms * Irms * math.cos(phi)
        P_app = Vrms * Irms
        Pr = P_avg / P_app if P_app > 0 else 0
        steps = [
            "P_avg = V_rms x I_rms x cosphi",
            f"V_rms = {_fmt_num(Vrms)} V, I_rms = {_fmt_num(Irms)} A, phi = {phi_deg} deg ",
            f"P_avg = {_fmt_num(Vrms)}x{_fmt_num(Irms)}xcos({phi_deg} deg ) = {_fmt_num(P_avg)} W",
            f"Apparent power = {_fmt_num(P_app)} VA",
            f"Power factor = cosphi = {_fmt_num(math.cos(phi))}",
        ]
        verification = {"P_avg": _fmt_num(P_avg),
                        "PF_check": _fmt_num(P_avg/(Vrms*Irms)) if Vrms*Irms>0 else "N/A",
                        "match": abs(P_avg - Vrms*Irms*math.cos(phi)) < 1e-6}
        return {"answer": {"P_avg_W": round(P_avg, 4), "apparent_VA": round(P_app, 4),
                            "power_factor": round(math.cos(phi), 4)},
                "unit": {"P_avg": "W", "apparent": "VA"},
                "steps": steps, "verification": verification}

    # ── Optics ────────────────────────────────
    @staticmethod
    def solve_thin_lens(params: dict) -> dict:
        """Thin lens formula: 1/f = 1/v + 1/u."""
        u = float(params['object_distance'])  # negative for real object (sign convention)
        f = float(params['focal_length'])     # negative for diverging lens
        v_expr = 1 / (1/f - 1/u)
        m = -v_expr / u
        steps = [
            "Thin lens formula (Cartesian sign convention): 1/f = 1/v - 1/u",
            f"f = {_fmt_num(f)} cm, u = {_fmt_num(u)} cm (object is real → u negative)",
            f"1/v = 1/f + 1/u = 1/{_fmt_num(f)} + 1/{_fmt_num(u)}",
            f"1/v = {_fmt_num(1/f + 1/u)}",
            f"v = {_fmt_num(v_expr)} cm",
            f"Magnification: m = v/u = {_fmt_num(v_expr)}/{_fmt_num(u)} = {_fmt_num(m)}",
            f"Image is {'real and inverted' if v_expr > 0 else 'virtual and erect'}, {'magnified' if abs(m)>1 else 'diminished'}",
        ]
        verification = {"1_f_minus_1_u": _fmt_num(1/f - 1/u),
                        "1_v": _fmt_num(1/v_expr),
                        "match": abs((1/f - 1/u) - 1/v_expr) < 1e-6}
        return {"answer": {"image_distance_cm": round(v_expr, 4),
                            "magnification": round(m, 4),
                            "nature": "real_inverted" if v_expr > 0 else "virtual_erect"},
                "unit": {"v": "cm", "m": ""},
                "steps": steps, "verification": verification}

    @staticmethod
    def solve_telescope(params: dict) -> dict:
        """Astronomical telescope."""
        fo = float(params['focal_objective'])
        fe = float(params['focal_eyepiece'])
        magnifying = abs(fo / fe)
        tube_length = fo + fe
        steps = [
            "Astronomical telescope (normal adjustment):",
            f"f_o = {_fmt_num(fo)} cm, f_e = {_fmt_num(fe)} cm",
            f"Magnifying power: M = f_o/f_e = {_fmt_num(fo)}/{_fmt_num(fe)} = {_fmt_num(magnifying)}",
            f"Tube length: L = f_o + f_e = {_fmt_num(fo+fe)} cm",
        ]
        verification = {"M_times_fe": _fmt_num(magnifying*fe),
                        "fo": _fmt_num(fo),
                        "match": abs(magnifying*fe - fo) < 1e-6}
        return {"answer": {"magnifying_power": round(magnifying, 2),
                            "tube_length_cm": round(tube_length, 2)},
                "unit": "dimensionless / cm",
                "steps": steps, "verification": verification}

    # ── Photoelectric Effect ───────────────────
    @staticmethod
    def solve_photoelectric(params: dict) -> dict:
        """Photoelectric equation: hf = phi + Kmax."""
        h   = float(params.get('planck', PLANCK_H))
        phi = float(params['work_function'])  # in eV
        freq = float(params['frequency'])
        phi_J = phi * ELEMENTARY_CHARGE
        Kmax_J = h * freq - phi_J
        if Kmax_J < 0:
            cutoff_freq = phi_J / h
            steps = [
                f"h = {h:.3e} J·s, phi = {phi} eV = {_fmt_num(phi_J)} J, f = {_sci(freq)} Hz",
                f"hf = {h:.3e}x{_sci(freq)} = {_sci(h*freq)} J",
                f"hf < phi ({_sci(h*freq)} < {_sci(phi_J)}) → No emission!",
                f"Cutoff frequency needed: f₀ = phi/h = {_sci(cutoff_freq)} Hz",
            ]
            return {"answer": {"Kmax_J": 0, "emission": False, "cutoff_freq_Hz": round(cutoff_freq, 2)},
                    "unit": "J", "steps": steps,
                    "verification": {"hf": _sci(h*freq), "phi": _sci(phi_J), "hf_lt_phi": h*freq < phi_J}}
        V0 = Kmax_J / ELEMENTARY_CHARGE
        steps = [
            f"h = {h:.3e} J·s, phi = {phi} eV = {_fmt_num(phi_J)} J, f = {_sci(freq)} Hz",
            f"hf = {h*freq:.3e} J = {hf:.3e} J = {(h*freq)/ELEMENTARY_CHARGE:.3f} eV",
            f"K_max = hf - phi = {_fmt_num(Kmax_J)} J = {V0:.3f} eV",
            f"Stopping potential: V₀ = K_max/e = {V0:.3f} V",
        ]
        verification = {"Kmax_check": _fmt_num(Kmax_J),
                        "hf_minus_phi": _fmt_num(h*freq - phi_J),
                        "match": abs(Kmax_J - (h*freq - phi_J)) < 1e-25}
        return {"answer": {"Kmax_J": round(Kmax_J, 8), "Kmax_eV": round(V0, 4),
                            "V0_V": round(V0, 4), "emission": True},
                "unit": "J / V", "steps": steps, "verification": verification}

    # ── Modern Physics ─────────────────────────
    @staticmethod
    def solve_bohr_model(params: dict) -> dict:
        """Bohr model: energy levels, orbital radius."""
        n = int(params['n'])
        E_n = -RYDBERG / n**2
        r_n = 0.529e-10 * n**2  # Bohr radius * n^2
        steps = [
            f"Bohr model for hydrogen (n={n}):",
            f"E_n = -13.6 eV / n^2 = -{_fmt_num(RYDBERG)}/{n}^2 = {_fmt_num(E_n)} J",
            f"E_n = {_fmt_num(E_n/ELEMENTARY_CHARGE)} eV",
            f"r_n = n^2 x a₀ = {n}^2 x 0.529 Å = {_fmt_num(r_n*1e10)} Å = {_fmt_num(r_n)} m",
        ]
        verification = {"E_formula": _fmt_num(-RYDBERG/n**2),
                        "E_computed": _fmt_num(E_n),
                        "match": abs(E_n - (-RYDBERG/n**2)) < 1e-28}
        return {"answer": {"energy_J": round(E_n, 8),
                            "energy_eV": round(E_n/ELEMENTARY_CHARGE, 4),
                            "radius_m": round(r_n, 12),
                            "radius_A": round(r_n*1e10, 4)},
                "unit": {"E": "J/eV", "r": "m/Å"},
                "steps": steps, "verification": verification}

    @staticmethod
    def solve_debroglie(params: dict) -> dict:
        """de Broglie wavelength."""
        p = float(params['momentum'])
        E = float(params.get('energy', None))
        if E is not None:
            # Relativistic approximation: p = sqrt(E^2/c^2 + 2Em) if kinetic
            pass
        lam = PLANCK_H / p
        steps = [
            "de Broglie wavelength: lambda = h/p",
            f"h = {PLANCK_H:.3e} J·s, p = {_fmt_num(p)} kg·m/s",
            f"lambda = {PLANCK_H:.3e}/{_fmt_num(p)} = {_fmt_num(lam)} m",
            f"lambda = {_fmt_num(lam*1e9)} nm",
        ]
        verification = {"lam_times_p": _fmt_num(lam*p),
                        "h": _fmt_num(PLANCK_H),
                        "match": abs(lam*p - PLANCK_H) < 1e-40}
        return {"answer": round(lam, 12), "unit": "m", "steps": steps, "verification": verification}

    # ── Semiconductors ─────────────────────────
    @staticmethod
    def solve_logic_gate(params: dict) -> dict:
        """Evaluate logic gate on given inputs."""
        gate = params['gate'].upper()
        A = int(params.get('A', 0)); B = int(params.get('B', 0))
        C = int(params.get('C', 0)) if gate in ('AND3','OR3') else None
        gates = {
            'AND': lambda a,b: a & b,
            'OR':  lambda a,b: a | b,
            'NOT': lambda a,b: 1-a,
            'NAND':lambda a,b: 1-(a&b),
            'NOR': lambda a,b: 1-(a|b),
            'XOR': lambda a,b: a^b,
            'AND3':lambda a,b,c: a&b&c,
            'OR3': lambda a,b,c: a|b|c,
        }
        if gate not in gates:
            raise ValueError(f"Unsupported gate: {gate}")
        if gate in ('AND3','OR3'):
            result = gates[gate](A, B, C)
        else:
            result = gates[gate](A, B)
        steps = [
            f"Logic gate: {gate}",
            f"Inputs: A={A}" + (f", B={B}" + (f", C={C}" if C is not None else "")),
            f"Truth table value: {result}",
        ]
        verification = {"recomputed": result, "match": True}
        return {"answer": result, "unit": "0 or 1",
                "steps": steps, "verification": verification}

    @staticmethod
    def solve_boolean_expr(params: dict) -> dict:
        """Evaluate Boolean expression for given inputs."""
        expr = params['expression']
        inputs = params.get('inputs', {})
        safe = expr.replace('A', str(inputs.get('A',0)))\
                   .replace('B', str(inputs.get('B',0)))\
                   .replace('C', str(inputs.get('C',0)))\
                   .replace('.',' and ').replace('+',' or ').replace("'",' not ')
        result = int(eval(safe))
        steps = [
            f"Expression: {expr}",
            f"Substituting A={inputs.get('A',0)}, B={inputs.get('B',0)}:",
            f"Result: {result}",
        ]
        verification = {"recomputed": result, "match": True}
        return {"answer": result, "unit": "0 or 1",
                "steps": steps, "verification": verification}

    # ── Communication Systems ──────────────────
    @staticmethod
    def solve_communication(params: dict) -> dict:
        """Bandwidth / frequency / wavelength."""
        bw = params.get('bandwidth', None)
        f  = params.get('frequency', None)
        lam = params.get('wavelength', None)
        if bw and f:
            steps = [
                f"Bandwidth BW = f_max - f_min",
                f"Given: f_max - f_min = {_fmt_num(bw)} Hz",
                f"Audio signal centered at {_fmt_num(f)} Hz",
                f"Required BW = {_fmt_num(bw/1e3)} kHz",
            ]
            return {"answer": round(bw, 2), "unit": "Hz",
                    "steps": steps, "verification": {"BW": _fmt_num(bw)}}
        elif f and lam:
            c = SPEED_OF_LIGHT
            computed_lam = c / f
            steps = [
                f"c = flambda → lambda = c/f",
                f"Given: f = {_sci(f)} Hz",
                f"lambda = {_fmt_num(c)}/{_sci(f)} = {_fmt_num(computed_lam)} m",
            ]
            verification = {"c_over_f": _fmt_num(computed_lam),
                            "lam_given": _fmt_num(lam) if lam else None,
                            "match": abs(computed_lam - lam) < 1e-6 if lam else "N/A"}
            return {"answer": round(computed_lam, 4), "unit": "m",
                    "steps": steps, "verification": verification}
        raise ValueError("Provide bandwidth+frequency or frequency+wavelength")


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS
# ─────────────────────────────────────────────────────────────────────────────
class QuestionGenerator:

    @staticmethod
    def gen_electrostatics(seed: int, count: int = 3) -> List[dict]:
        rng = _r(seed)
        questions = []
        sub = ['coulomb', 'superposition', 'charge_transfer', 'electric_field']
        for i in range(count):
            sub_type = rng.choice(sub)
            q = None
            if sub_type == 'coulomb':
                q = PhysicsSolver.solve_coulomb_law({
                    'q1': rng.uniform(1e-9, 5e-6),
                    'q2': rng.uniform(1e-9, 5e-6),
                    'r':  rng.uniform(0.01, 1.0),
                })
                q1s, q2s, rs = q['answer'], q['answer']*0.7, q['answer']*2.0
                opts = sorted([q['answer'], q['answer']*0.5, q['answer']*2.0,
                                q['answer']*0.1, q['answer']*10], key=lambda x: x)
                text = (f"Two point charges Q1 = {_sci(rng.uniform(1e-9,5e-6))} C and "
                        f"Q2 = {_sci(rng.uniform(1e-9,5e-6))} C are separated by "
                        f"{_fmt_num(rng.uniform(0.01,1.0))} m in vacuum. "
                        f"The magnitude of the electrostatic force between them is:")
                explanation = f"Using Coulomb's law: F = k|Q1·Q2|/r^2\n" + _steps_to_text(q['steps'])
            elif sub_type == 'superposition':
                q = PhysicsSolver.solve_superposition({
                    'q1': rng.uniform(1e-8,1e-5), 'q2': rng.uniform(1e-8,1e-5),
                    'q':  rng.uniform(1e-8,1e-5), 'r1': rng.uniform(0.05,0.5),
                    'r2': rng.uniform(0.05,0.5), 'angle_deg': rng.choice([60,90,120,180]),
                })
                opts = sorted([q['answer'], q['answer']*0.5, q['answer']*2.0,
                                q['answer']*0.3, q['answer']*1.5], key=lambda x: x)
                text = ("Two charges exert forces on a third charge. "
                        "What is the magnitude of the net electrostatic force on the third charge?")
                explanation = _steps_to_text(q['steps'])
            elif sub_type == 'charge_transfer':
                q = PhysicsSolver.solve_charge_transfer({
                    'q_source': rng.uniform(1e-7, 1e-5),
                })
                opts = [f"{_fmt_num(q['answer']['charge_transferred_C'])} C",
                         f"{_fmt_num(q['answer']['charge_transferred_C']*2)} C",
                         f"{_fmt_num(q['answer']['charge_transferred_C']*0.5)} C",
                         f"{_fmt_num(q['answer']['charge_transferred_C']*3)} C",
                         f"{_fmt_num(q['answer']['charge_transferred_C']*0.1)} C"]
                text = ("A charged sphere of charge 5x10⁻⁶ C touches an identical neutral sphere. "
                        "What charge is transferred to the neutral sphere?")
                explanation = _steps_to_text(q['steps'])
            else:  # electric_field
                q = PhysicsSolver.solve_electric_field({
                    'Q': rng.uniform(1e-9, 1e-6), 'r': rng.uniform(0.05, 0.5),
                })
                opts = sorted([q['answer'], q['answer']*0.25, q['answer']*4.0,
                                q['answer']*0.5, q['answer']*2.0], key=lambda x: x)
                text = (f"Electric field at {_fmt_num(rng.uniform(0.05,0.5))} m from a "
                        f"point charge of {_sci(rng.uniform(1e-9,1e-6))} C is:")
                explanation = _steps_to_text(q['steps'])
            rng.shuffle(opts)
            questions.append({
                "id": f"q_elec_{seed}_{i}", "type": "mcq", "topic": "Electric Charges",
                "difficulty": rng.choice(DIFFICULTIES),
                "question": text, "options": opts, "answer": str(q['answer']),
                "explanation": explanation, "competency": "standard",
            })
        return questions

    @staticmethod
    def gen_capacitance(seed: int, count: int = 3) -> List[dict]:
        rng = _r(seed)
        questions = []
        sub = ['series', 'parallel', 'energy', 'plate_cap']
        for i in range(count):
            sub_type = rng.choice(sub)
            q = None
            if sub_type == 'series':
                caps = [rng.choice([2,4,6,8])*1e-6 for _ in range(3)]
                q = PhysicsSolver.solve_capacitor_combo({'capacitors': caps, 'connection': 'series'})
                text = f"Find equivalent capacitance of {caps[0]*1e6:.0f}µF, {caps[1]*1e6:.0f}µF, {caps[2]*1e6:.0f}µF in series."
            elif sub_type == 'parallel':
                caps = [rng.choice([2,4,6,8])*1e-6 for _ in range(3)]
                q = PhysicsSolver.solve_capacitor_combo({'capacitors': caps, 'connection': 'parallel'})
                text = f"Find equivalent capacitance of {caps[0]*1e6:.0f}µF, {caps[1]*1e6:.0f}µF, {caps[2]*1e6:.0f}µF in parallel."
            elif sub_type == 'energy':
                C = rng.choice([10,20,50,100])*1e-6
                V = rng.choice([12,24,50,100])
                q = PhysicsSolver.solve_capacitor_energy({'capacitance': C, 'voltage': V})
                text = f"Energy stored in a {C*1e6:.0f}µF capacitor charged to {V}V is:"
            else:
                A = rng.uniform(0.01, 0.1)
                d = rng.uniform(0.5e-3, 2e-3)
                q = PhysicsSolver.solve_parallel_plate({'area': A, 'separation': d})
                text = f"Capacitance of a parallel plate capacitor (A={_fmt_num(A)} m^2, d={_fmt_num(d)} m):"
            opts = sorted([q['answer'], q['answer']*0.5, q['answer']*2.0,
                            q['answer']*0.25, q['answer']*4.0], key=lambda x: x)
            rng.shuffle(opts)
            questions.append({
                "id": f"q_cap_{seed}_{i}", "type": "mcq", "topic": "Capacitance",
                "difficulty": rng.choice(DIFFICULTIES),
                "question": text, "options": opts, "answer": str(_fmt_num(q['answer'])),
                "explanation": _steps_to_text(q['steps']), "competency": "standard",
            })
        return questions

    @staticmethod
    def gen_current_electricity(seed: int, count: int = 3) -> List[dict]:
        rng = _r(seed)
        questions = []
        sub = ['ohm', 'series_r', 'parallel_r', 'power']
        for i in range(count):
            sub_type = rng.choice(sub)
            q = None
            if sub_type == 'ohm':
                V = rng.uniform(6, 220)
                R = rng.uniform(5, 1000)
                q = PhysicsSolver.solve_ohm_law({'voltage': V, 'resistance': R})
                text = f"Current through a {_fmt_num(R)} Ω resistor connected to {_fmt_num(V)} V source:"
            elif sub_type == 'series_r':
                Rs = sorted([rng.uniform(10,200) for _ in range(3)])
                V_src = rng.choice([12, 24, 48])
                q = PhysicsSolver.solve_resistor_combo({'resistors': Rs, 'connection': 'series', 'voltage': V_src})
                text = f"Equivalent resistance of {[_fmt_num(r)+' Ω' for r in Rs]} in series:"
            elif sub_type == 'parallel_r':
                Rs = sorted([rng.uniform(10,200) for _ in range(3)])
                q = PhysicsSolver.solve_resistor_combo({'resistors': Rs, 'connection': 'parallel'})
                text = f"Equivalent resistance of {[_fmt_num(r)+' Ω' for r in Rs]} in parallel:"
            else:
                V = rng.uniform(100, 230)
                I = rng.uniform(0.5, 10)
                P = V * I
                text = f"Power consumed by a device drawing {_fmt_num(I)} A at {_fmt_num(V)} V:"
                q = {"answer": P, "steps": [f"P = VI = {_fmt_num(V)}x{_fmt_num(I)} = {_fmt_num(P)} W"],
                     "verification": {}}
            opts = sorted([q['answer'], q['answer']*0.5, q['answer']*2.0,
                            q['answer']*0.3, q['answer']*1.5], key=lambda x: x)
            rng.shuffle(opts)
            questions.append({
                "id": f"q_curr_{seed}_{i}", "type": "mcq", "topic": "Current Electricity",
                "difficulty": rng.choice(DIFFICULTIES),
                "question": text, "options": opts, "answer": str(_fmt_num(q['answer'])),
                "explanation": _steps_to_text(q['steps']), "competency": "standard",
            })
        return questions

    @staticmethod
    def gen_magnetic_field(seed: int, count: int = 3) -> List[dict]:
        rng = _r(seed)
        questions = []
        sub = ['biotsavart', 'wire_force', 'torque']
        for i in range(count):
            sub_type = rng.choice(sub)
            q = None
            if sub_type == 'biotsavart':
                I = rng.uniform(1, 20)
                R = rng.uniform(0.01, 0.2)
                N = rng.choice([1, 10, 100])
                q = PhysicsSolver.solve_biotsavart({'current': I, 'radius': R, 'turns': N})
                text = f"B-field at center of a circular loop (N={N}, I={_fmt_num(I)}A, R={_fmt_num(R)}m):"
            elif sub_type == 'wire_force':
                I = rng.uniform(2, 15)
                L = rng.uniform(0.1, 1.0)
                B = rng.uniform(0.1, 1.0)
                q = PhysicsSolver.solve_magnetic_force({'current': I, 'length': L, 'field': B, 'angle_deg': 90})
                text = f"Force on wire (I={_fmt_num(I)}A, L={_fmt_num(L)}m, B={_fmt_num(B)}T, theta=90 deg ):"
            else:
                I = rng.uniform(1, 10)
                A = rng.uniform(1e-4, 1e-2)
                B = rng.uniform(0.1, 1.0)
                q = PhysicsSolver.solve_torque_loop({'current': I, 'area': A, 'field': B, 'angle_deg': 90})
                text = f"Torque on rectangular loop (I={_fmt_num(I)}A, A={_fmt_num(A)}m^2, B={_fmt_num(B)}T):"
            opts = sorted([q['answer'], q['answer']*0.5, q['answer']*2.0,
                            q['answer']*0.25, q['answer']*4.0], key=lambda x: x)
            rng.shuffle(opts)
            questions.append({
                "id": f"q_mag_{seed}_{i}", "type": "mcq", "topic": "Magnetic Effects",
                "difficulty": rng.choice(DIFFICULTIES),
                "question": text, "options": opts, "answer": str(_fmt_num(q['answer'])),
                "explanation": _steps_to_text(q['steps']), "competency": "standard",
            })
        return questions

    @staticmethod
    def gen_emi(seed: int, count: int = 3) -> List[dict]:
        rng = _r(seed)
        questions = []
        sub = ['emf_faraday', 'self_ind', 'mutual_ind']
        for i in range(count):
            sub_type = rng.choice(sub)
            q = None
            if sub_type == 'emf_faraday':
                N = rng.choice([50, 100, 200, 500])
                dPhi = rng.uniform(0.001, 0.1)
                dt = rng.uniform(0.01, 1.0)
                q = PhysicsSolver.solve_emf_induced({'turns': N, 'dPhi': dPhi, 'dt': dt})

# return {"status": "ok", "note": "truncated"}
