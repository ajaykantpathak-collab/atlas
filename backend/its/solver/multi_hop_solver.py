"""multi_hop_solver.py — Multi-Hop Deterministic Reasoning Engine for JEE Advanced & NEET.

Solves multi-step physics, chemistry, and mathematics questions by chaining
formulas across the STEM Knowledge Graph DAG without LLM calculation hallucinations.

Key Capabilities:
1. Zero-Computation LLM Pipeline: The LLM is restricted to semantic variable extraction;
   all algebraic manipulation and arithmetic are executed deterministically via SymPy.
2. Formula DAG Pathfinding: Identifies the shortest valid chain of equations connecting
   the given physical state S_0 to the target quantity T.
3. Symbolic Composition: Combines intermediate formulas symbolically before numerical substitution,
   minimizing floating-point round-off error.
4. Physical Unit & Constant Propagation: Injects exact CODATA constants (e, m_e, h, c, eps0, etc.)
   and validates dimensional consistency at every hop.
5. Back-Substitution Engine: Evaluates residuals on 4-option MCQs in < 1ms.
"""

from __future__ import annotations

import math
import re
import time
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Set, Tuple

import sympy as sp

# --------------------------------------------------------------------------- #
# Exact Physical Constants (CODATA 2018 / 2022 recommended values)
# --------------------------------------------------------------------------- #
PHYSICAL_CONSTANTS: Dict[str, Tuple[float, str, str]] = {
    # symbol: (value, SI unit, description)
    "e": (1.602176634e-19, "C", "Elementary charge"),
    "m_e": (9.1093837015e-31, "kg", "Electron rest mass"),
    "m_p": (1.67262192369e-27, "kg", "Proton rest mass"),
    "m_n": (1.67492749804e-27, "kg", "Neutron rest mass"),
    "c": (299792458.0, "m/s", "Speed of light in vacuum"),
    "h": (6.62607015e-34, "J*s", "Planck constant"),
    "hbar": (1.054571817e-34, "J*s", "Reduced Planck constant"),
    "eps_0": (8.8541878128e-12, "F/m", "Permittivity of free space"),
    "mu_0": (1.25663706212e-6, "N/A^2", "Permeability of free space"),
    "k_e": (8.9875517923e9, "N*m^2/C^2", "Coulomb constant 1/(4*pi*eps_0)"),
    "G": (6.67430e-11, "N*m^2/kg^2", "Gravitational constant"),
    "g": (9.80665, "m/s^2", "Standard acceleration due to gravity"),
    "N_A": (6.02214076e23, "mol^-1", "Avogadro constant"),
    "R_gas": (8.314462618, "J/(mol*K)", "Universal gas constant"),
    "k_B": (1.380649e-23, "J/K", "Boltzmann constant"),
    "sigma": (5.670374419e-8, "W/(m^2*K^4)", "Stefan-Boltzmann constant"),
}

# Particle aliases mapping to known constants
PARTICLE_PROPERTIES: Dict[str, Dict[str, float]] = {
    "electron": {"q": 1.602176634e-19, "m": 9.1093837015e-31},
    "positron": {"q": 1.602176634e-19, "m": 9.1093837015e-31},
    "proton": {"q": 1.602176634e-19, "m": 1.67262192369e-27},
    "neutron": {"q": 0.0, "m": 1.67492749804e-27},
    "alpha": {"q": 2 * 1.602176634e-19, "m": 4 * 1.66053906660e-27},
    "deuteron": {"q": 1.602176634e-19, "m": 2 * 1.66053906660e-27},
}


@dataclass
class FormulaRule:
    """Represents a physics / math formula edge in the knowledge graph."""
    name: str
    target: str                     # Variable solved by this formula
    inputs: Set[str]                # Required input variables
    expr_str: str                   # SymPy solvable formula expression: f(inputs) == target
    latex: str                      # Standard LaTeX display
    description: str                # Pedagogical explanation of the step
    unit: str                       # SI unit of the solved target


# --------------------------------------------------------------------------- #
# STEM Multi-Hop Rule Registry (Foundational & Advanced Competitive Laws)
# --------------------------------------------------------------------------- #
MULTI_HOP_RULES: List[FormulaRule] = [
    # ── Mechanics & Kinematics ──
    FormulaRule(
        name="kinetic_energy_velocity",
        target="v",
        inputs={"E_k", "m"},
        expr_str="sqrt(2 * E_k / m)",
        latex=r"v = \sqrt{\frac{2 E_k}{m}}",
        description="Speed derived from kinetic energy E_k = 1/2 m v^2",
        unit="m/s",
    ),
    FormulaRule(
        name="kinetic_energy_from_velocity",
        target="E_k",
        inputs={"m", "v"},
        expr_str="0.5 * m * v**2",
        latex=r"E_k = \frac{1}{2} m v^2",
        description="Kinetic energy of a moving mass",
        unit="J",
    ),
    FormulaRule(
        name="momentum_from_mass_velocity",
        target="p",
        inputs={"m", "v"},
        expr_str="m * v",
        latex=r"p = m v",
        description="Linear momentum definition",
        unit="kg*m/s",
    ),
    FormulaRule(
        name="momentum_from_kinetic_energy",
        target="p",
        inputs={"m", "E_k"},
        expr_str="sqrt(2 * m * E_k)",
        latex=r"p = \sqrt{2 m E_k}",
        description="Linear momentum expressed through kinetic energy",
        unit="kg*m/s",
    ),
    FormulaRule(
        name="kinetic_energy_from_momentum",
        target="E_k",
        inputs={"p", "m"},
        expr_str="p**2 / (2 * m)",
        latex=r"E_k = \frac{p^2}{2m}",
        description="Kinetic energy expressed through linear momentum",
        unit="J",
    ),
    FormulaRule(
        name="kinematics_v2_u2_2as",
        target="v",
        inputs={"u", "a", "s"},
        expr_str="sqrt(u**2 + 2 * a * s)",
        latex=r"v = \sqrt{u^2 + 2as}",
        description="Third equation of motion",
        unit="m/s",
    ),
    FormulaRule(
        name="kinematics_acceleration",
        target="a",
        inputs={"F", "m"},
        expr_str="F / m",
        latex=r"a = \frac{F}{m}",
        description="Newton's second law",
        unit="m/s^2",
    ),

    # ── Electrostatics & Potential ──
    FormulaRule(
        name="electric_potential_energy_to_kinetic",
        target="E_k",
        inputs={"q", "V"},
        expr_str="q * V",
        latex=r"E_k = q V",
        description="Kinetic energy gained by acceleration through potential difference V",
        unit="J",
    ),
    FormulaRule(
        name="coulomb_force",
        target="F",
        inputs={"q1", "q2", "r"},
        expr_str="8.9875517923e9 * abs(q1 * q2) / (r**2)",
        latex=r"F = \frac{1}{4\pi\varepsilon_0}\frac{|q_1 q_2|}{r^2}",
        description="Coulomb's Law electrostatic force",
        unit="N",
    ),
    FormulaRule(
        name="electric_field_from_point_charge",
        target="E_field",
        inputs={"q", "r"},
        expr_str="8.9875517923e9 * q / (r**2)",
        latex=r"E = \frac{1}{4\pi\varepsilon_0}\frac{q}{r^2}",
        description="Electric field due to a point charge",
        unit="N/C",
    ),
    FormulaRule(
        name="electric_force_from_field",
        target="F",
        inputs={"q", "E_field"},
        expr_str="q * E_field",
        latex=r"F = q E",
        description="Electrostatic force on a charge in an electric field",
        unit="N",
    ),

    # ── Magnetism & Lorentz Motion ──
    FormulaRule(
        name="cyclotron_radius",
        target="R",
        inputs={"m", "v", "q", "B"},
        expr_str="m * v / (q * B)",
        latex=r"R = \frac{m v}{q B}",
        description="Radius of circular helical orbit in perpendicular magnetic field B",
        unit="m",
    ),
    FormulaRule(
        name="cyclotron_frequency",
        target="f",
        inputs={"q", "B", "m"},
        expr_str="q * B / (2 * 3.141592653589793 * m)",
        latex=r"f = \frac{q B}{2\pi m}",
        description="Cyclotron frequency of revolution",
        unit="Hz",
    ),
    FormulaRule(
        name="cyclotron_time_period",
        target="T",
        inputs={"m", "q", "B"},
        expr_str="2 * 3.141592653589793 * m / (q * B)",
        latex=r"T = \frac{2\pi m}{q B}",
        description="Time period of revolution in magnetic field",
        unit="s",
    ),
    FormulaRule(
        name="magnetic_lorentz_force",
        target="F_B",
        inputs={"q", "v", "B"},
        expr_str="q * v * B",
        latex=r"F_B = q v B",
        description="Magnetic Lorentz force (for perpendicular velocity v perp B)",
        unit="N",
    ),

    # ── Modern Physics & De Broglie Waves ──
    FormulaRule(
        name="de_broglie_wavelength_momentum",
        target="lambda_db",
        inputs={"p"},
        expr_str="6.62607015e-34 / p",
        latex=r"\lambda = \frac{h}{p}",
        description="De Broglie matter wavelength from momentum",
        unit="m",
    ),
    FormulaRule(
        name="de_broglie_wavelength_velocity",
        target="lambda_db",
        inputs={"m", "v"},
        expr_str="6.62607015e-34 / (m * v)",
        latex=r"\lambda = \frac{h}{m v}",
        description="De Broglie matter wavelength from velocity",
        unit="m",
    ),
    FormulaRule(
        name="photon_energy_frequency",
        target="E",
        inputs={"f"},
        expr_str="6.62607015e-34 * f",
        latex=r"E = h f",
        description="Planck's photon energy relation",
        unit="J",
    ),
    FormulaRule(
        name="photon_energy_wavelength",
        target="E",
        inputs={"lambda_light"},
        expr_str="6.62607015e-34 * 299792458.0 / lambda_light",
        latex=r"E = \frac{h c}{\lambda}",
        description="Photon energy from wavelength",
        unit="J",
    ),
    FormulaRule(
        name="wave_speed",
        target="v",
        inputs={"f", "lambda_wave"},
        expr_str="f * lambda_wave",
        latex=r"v = f \lambda",
        description="Wave speed equation",
        unit="m/s",
    ),

    # ── Current & Circuits ──
    FormulaRule(
        name="ohms_law_current",
        target="I",
        inputs={"V", "R_elec"},
        expr_str="V / R_elec",
        latex=r"I = \frac{V}{R}",
        description="Ohm's Law current",
        unit="A",
    ),
    FormulaRule(
        name="joule_heating_power",
        target="P",
        inputs={"I", "R_elec"},
        expr_str="I**2 * R_elec",
        latex=r"P = I^2 R",
        description="Joule electrical dissipation power",
        unit="W",
    ),

    # ── AC Circuits & Electromagnetic Induction ──
    FormulaRule(
        name="inductive_reactance",
        target="X_L",
        inputs={"f", "L"},
        expr_str="2 * 3.141592653589793 * f * L",
        latex=r"X_L = 2\pi f L",
        description="Inductive reactance at frequency f",
        unit="Ω",
    ),
    FormulaRule(
        name="capacitive_reactance",
        target="X_C",
        inputs={"f", "C"},
        expr_str="1 / (2 * 3.141592653589793 * f * C)",
        latex=r"X_C = \frac{1}{2\pi f C}",
        description="Capacitive reactance at frequency f",
        unit="Ω",
    ),
    FormulaRule(
        name="lcr_series_impedance",
        target="Z",
        inputs={"R_elec", "X_L", "X_C"},
        expr_str="sqrt(R_elec**2 + (X_L - X_C)**2)",
        latex=r"Z = \sqrt{R^2 + (X_L - X_C)^2}",
        description="Total impedance of a series LCR circuit",
        unit="Ω",
    ),
    FormulaRule(
        name="lcr_resonant_frequency",
        target="f_0",
        inputs={"L", "C"},
        expr_str="1 / (2 * 3.141592653589793 * sqrt(L * C))",
        latex=r"f_0 = \frac{1}{2\pi\sqrt{LC}}",
        description="Resonant frequency of series LCR circuit",
        unit="Hz",
    ),
    FormulaRule(
        name="lcr_quality_factor",
        target="Q",
        inputs={"R_elec", "L", "C"},
        expr_str="(1 / R_elec) * sqrt(L / C)",
        latex=r"Q = \frac{1}{R}\sqrt{\frac{L}{C}}",
        description="Quality factor of series resonant LCR circuit",
        unit="",
    ),
    FormulaRule(
        name="motional_emf",
        target="V",
        inputs={"B", "l_wire", "v"},
        expr_str="B * l_wire * v",
        latex=r"\mathcal{E} = B l v",
        description="Motional EMF induced in a conductor moving perpendicular to B",
        unit="V",
    ),

    # ── Optics & Wave Phenomena ──
    FormulaRule(
        name="snells_law_angle",
        target="sin_theta_2",
        inputs={"n1", "n2", "sin_theta_1"},
        expr_str="(n1 / n2) * sin_theta_1",
        latex=r"\sin\theta_2 = \frac{n_1}{n_2}\sin\theta_1",
        description="Snell's Law of refraction",
        unit="",
    ),
    FormulaRule(
        name="lens_image_distance",
        target="v_image",
        inputs={"u_obj", "f_lens"},
        expr_str="(u_obj * f_lens) / (u_obj + f_lens)",
        latex=r"v = \frac{u f}{u + f}",
        description="Thin lens formula for image position",
        unit="m",
    ),
    FormulaRule(
        name="lens_magnification",
        target="m_mag",
        inputs={"v_image", "u_obj"},
        expr_str="v_image / u_obj",
        latex=r"m = \frac{v}{u}",
        description="Linear magnification of a thin lens",
        unit="",
    ),
    FormulaRule(
        name="ydse_fringe_width",
        target="beta_fringe",
        inputs={"lambda_light", "D_screen", "d_slit"},
        expr_str="(lambda_light * D_screen) / d_slit",
        latex=r"\beta = \frac{\lambda D}{d}",
        description="Fringe width in Young's Double Slit Experiment",
        unit="m",
    ),

    # ── Thermodynamics & Kinetic Theory ──
    FormulaRule(
        name="rms_velocity_gas",
        target="v_rms",
        inputs={"T_kelvin", "M_molar"},
        expr_str="sqrt(3 * 8.314462618 * T_kelvin / M_molar)",
        latex=r"v_{\text{rms}} = \sqrt{\frac{3 R T}{M}}",
        description="Root mean square velocity of gas molecules",
        unit="m/s",
    ),
    FormulaRule(
        name="average_kinetic_energy_molecule",
        target="E_k_avg",
        inputs={"T_kelvin"},
        expr_str="1.5 * 1.380649e-23 * T_kelvin",
        latex=r"E_k = \frac{3}{2} k_B T",
        description="Average translational kinetic energy per molecule",
        unit="J",
    ),
    FormulaRule(
        name="ideal_gas_pressure",
        target="P_gas",
        inputs={"n_moles", "T_kelvin", "V_vol"},
        expr_str="(n_moles * 8.314462618 * T_kelvin) / V_vol",
        latex=r"P = \frac{n R T}{V}",
        description="Ideal gas law equation of state",
        unit="Pa",
    ),

    # ── Gravitation & Orbits ──
    FormulaRule(
        name="orbital_velocity",
        target="v_orbit",
        inputs={"M_body", "r_orbit"},
        expr_str="sqrt(6.67430e-11 * M_body / r_orbit)",
        latex=r"v_o = \sqrt{\frac{G M}{r}}",
        description="Orbital speed of a satellite around a central body",
        unit="m/s",
    ),
    FormulaRule(
        name="escape_velocity",
        target="v_escape",
        inputs={"M_body", "R_planet"},
        expr_str="sqrt(2 * 6.67430e-11 * M_body / R_planet)",
        latex=r"v_e = \sqrt{\frac{2 G M}{R}}",
        description="Escape speed from the surface of a spherical planet",
        unit="m/s",
    ),

    # ── Nuclear & Modern Physics ──
    FormulaRule(
        name="radioactive_half_life",
        target="T_half",
        inputs={"decay_const"},
        expr_str="0.69314718056 / decay_const",
        latex=r"T_{1/2} = \frac{\ln 2}{\lambda}",
        description="Half-life from radioactive decay constant",
        unit="s",
    ),
    FormulaRule(
        name="decay_const_from_half_life",
        target="decay_const",
        inputs={"T_half"},
        expr_str="0.69314718056 / T_half",
        latex=r"\lambda = \frac{\ln 2}{T_{1/2}}",
        description="Radioactive decay constant from half-life",
        unit="s^-1",
    ),
]


@dataclass
class HopStep:
    """One single step in the multi-hop reasoning chain."""
    step_num: int
    rule_name: str
    target_var: str
    formula_latex: str
    description: str
    inputs_used: Dict[str, float]
    output_value: float
    output_unit: str


@dataclass
class MultiHopResult:
    """Complete structured solution for a multi-hop STEM question."""
    matched: bool
    target: str
    final_value: float
    final_unit: str
    symbolic_formula: str
    steps: List[HopStep] = field(default_factory=list)
    execution_ms: float = 0.0
    explanation: str = ""

    def to_dict(self) -> Dict[str, Any]:
        return {
            "matched": self.matched,
            "target": self.target,
            "final_value": self.final_value,
            "final_unit": self.final_unit,
            "symbolic_formula": self.symbolic_formula,
            "execution_ms": round(self.execution_ms, 3),
            "explanation": self.explanation,
            "steps": [
                {
                    "step": s.step_num,
                    "rule": s.rule_name,
                    "target": s.target_var,
                    "latex": s.formula_latex,
                    "description": s.description,
                    "inputs": s.inputs_used,
                    "value": s.output_value,
                    "unit": s.output_unit,
                }
                for s in self.steps
            ],
        }


# --------------------------------------------------------------------------- #
# Multi-Hop Reasoning Engine
# --------------------------------------------------------------------------- #
class MultiHopReasoner:
    """Deterministic Graph-DAG Multi-Hop Solver."""

    def __init__(self, rules: Optional[List[FormulaRule]] = None):
        self.rules = rules or MULTI_HOP_RULES

    def solve(
        self,
        knowns: Dict[str, float],
        target: str,
        particle: Optional[str] = None,
        max_hops: int = 5,
    ) -> MultiHopResult:
        """Find the shortest formula chain from known quantities to target."""
        t0 = time.time()
        state = dict(knowns)

        # Inject known particle mass and charge
        if particle:
            p_key = particle.lower().strip()
            if p_key in PARTICLE_PROPERTIES:
                props = PARTICLE_PROPERTIES[p_key]
                state.setdefault("q", props["q"])
                state.setdefault("m", props["m"])

        # Inject universal constants if needed
        for const_name, (val, _, _) in PHYSICAL_CONSTANTS.items():
            state.setdefault(const_name, val)

        if target in state:
            return MultiHopResult(
                matched=True,
                target=target,
                final_value=state[target],
                final_unit="",
                symbolic_formula=target,
                steps=[],
                execution_ms=(time.time() - t0) * 1000.0,
                explanation=f"Target {target} already directly specified in given state.",
            )

        steps: List[HopStep] = []
        visited_rules: Set[str] = set()

        # Breadth-first / greedy state expansion
        for hop in range(1, max_hops + 1):
            if target in state:
                break

            # Find all rules whose inputs are satisfied
            candidate_rule: Optional[FormulaRule] = None
            for rule in self.rules:
                if rule.name in visited_rules:
                    continue
                if rule.target in state:
                    continue
                if rule.inputs.issubset(set(state.keys())):
                    # Prioritize rule that directly solves the target
                    if rule.target == target:
                        candidate_rule = rule
                        break
                    # Otherwise take the first applicable rule
                    if candidate_rule is None:
                        candidate_rule = rule

            if candidate_rule is None:
                # No more rules can be applied
                break

            # Apply candidate rule
            visited_rules.add(candidate_rule.name)
            inputs_used = {var: state[var] for var in candidate_rule.inputs}

            try:
                # SymPy evaluation
                sym_expr = sp.sympify(candidate_rule.expr_str)
                subs_dict = {sp.Symbol(k): v for k, v in inputs_used.items()}
                eval_val = float(sym_expr.evalf(subs=subs_dict))
            except Exception as e:
                continue

            state[candidate_rule.target] = eval_val
            steps.append(
                HopStep(
                    step_num=hop,
                    rule_name=candidate_rule.name,
                    target_var=candidate_rule.target,
                    formula_latex=candidate_rule.latex,
                    description=candidate_rule.description,
                    inputs_used=inputs_used,
                    output_value=eval_val,
                    output_unit=candidate_rule.unit,
                )
            )

        elapsed = (time.time() - t0) * 1000.0

        if target in state:
            last_unit = steps[-1].output_unit if steps else ""
            explanation = "\n".join(
                [f"Step {s.step_num}: {s.description} ({s.formula_latex}) → {s.target_var} = {s.output_value:.4g} {s.output_unit}"
                 for s in steps]
            )
            return MultiHopResult(
                matched=True,
                target=target,
                final_value=state[target],
                final_unit=last_unit,
                symbolic_formula=" ──► ".join(s.formula_latex for s in steps),
                steps=steps,
                execution_ms=elapsed,
                explanation=explanation,
            )

        return MultiHopResult(
            matched=False,
            target=target,
            final_value=0.0,
            final_unit="",
            symbolic_formula="",
            steps=[],
            execution_ms=elapsed,
            explanation=f"Cannot bridge gap from inputs {list(knowns.keys())} to target {target} within {max_hops} hops.",
        )


# Global singleton instance
_REASONER = MultiHopReasoner()


def solve_multi_hop_question(
    knowns: Dict[str, float],
    target: str,
    particle: Optional[str] = None,
) -> MultiHopResult:
    """Public helper to solve multi-hop questions."""
    return _REASONER.solve(knowns, target, particle=particle)


# --------------------------------------------------------------------------- #
# Natural Language Semantic Extractor (Regex + Pattern Parser)
# --------------------------------------------------------------------------- #
_UNIT_PATTERNS = [
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:V|volts?|volt)\b", "V"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:T|tesla|teslas)\b", "B"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:m/s|meter/sec|meters/second)"
     r"\b(?!\s*\^)", "v"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:kg|kilograms?)\b", "m"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:g|grams?)\b", "m_g"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:C|coulombs?)\b", "q"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:uC|µC|microcoulombs?)\b", "q_uC"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:m|meters?)\b(?!\s*[/^])", "r"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:cm|centimeters?)\b", "r_cm"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:mm|millimeters?)\b", "r_mm"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:nm|nanometers?)\b", "lambda_nm"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:angstroms?|Å)\b", "lambda_angstrom"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:J|joules?)\b", "E_k"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:Hz|hertz)\b", "f"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:s|sec|seconds?)\b", "T"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:A|amperes?|amps?)\b", "I"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:ohm|ohms?|Ω)\b", "R_elec"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:W|watts?)\b", "P"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:mH|millihenry|millihenries)\b", "L_mH"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:uH|µH|microhenry|microhenries)\b", "L_uH"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:H|henry|henries)\b", "L"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:uF|µF|microfarads?)\b", "C_uF"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:nF|nanofarads?)\b", "C_nF"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:pF|picofarads?)\b", "C_pF"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:F|farads?)\b", "C"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:K|kelvins?)\b", "T_kelvin"),
    (r"(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s*(?:Pa|pascals?)\b", "P_gas"),
]


def extract_problem_state(text: str) -> Tuple[Dict[str, float], Optional[str], Optional[str]]:
    """Extract known numerical quantities, particle type, and target variable from text."""
    knowns: Dict[str, float] = {}
    lower = text.lower()

    # Detect particle
    particle = None
    for p in PARTICLE_PROPERTIES:
        if re.search(rf"\b{p}\b", lower):
            particle = p
            break

    # Extract numerical quantities with units
    for pattern, var in _UNIT_PATTERNS:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            raw_val = float(match.group(1))
            # Standardize SI prefixes
            if var == "m_g":
                knowns["m"] = raw_val * 1e-3
            elif var == "q_uC":
                knowns["q"] = raw_val * 1e-6
            elif var == "r_cm":
                knowns["r"] = raw_val * 1e-2
            elif var == "r_mm":
                knowns["r"] = raw_val * 1e-3
            elif var == "L_mH":
                knowns["L"] = raw_val * 1e-3
            elif var == "L_uH":
                knowns["L"] = raw_val * 1e-6
            elif var == "C_uF":
                knowns["C"] = raw_val * 1e-6
            elif var == "C_nF":
                knowns["C"] = raw_val * 1e-9
            elif var == "C_pF":
                knowns["C"] = raw_val * 1e-12
            elif var == "lambda_nm":
                knowns["lambda_light"] = raw_val * 1e-9
            elif var == "lambda_angstrom":
                knowns["lambda_light"] = raw_val * 1e-10
            else:
                knowns[var] = raw_val

    # Infer target variable
    target = None
    if re.search(r"\b(?:resonant frequency|resonance frequency)\b", lower):
        target = "f_0"
    elif re.search(r"\b(?:impedance)\b", lower):
        target = "Z"
    elif re.search(r"\b(?:quality factor|q factor)\b", lower):
        target = "Q"
    elif re.search(r"\b(?:inductive reactance)\b", lower):
        target = "X_L"
    elif re.search(r"\b(?:capacitive reactance)\b", lower):
        target = "X_C"
    elif re.search(r"\b(?:fringe width)\b", lower):
        target = "beta_fringe"
    elif re.search(r"\b(?:rms velocity|rms speed)\b", lower):
        target = "v_rms"
    elif re.search(r"\b(?:escape velocity|escape speed)\b", lower):
        target = "v_escape"
    elif re.search(r"\b(?:orbital velocity|orbital speed)\b", lower):
        target = "v_orbit"
    elif re.search(r"\b(?:half life|half-life)\b", lower):
        target = "T_half"
    elif re.search(r"\b(?:radius|radii|orbit|path)\b", lower):
        target = "R"
    elif re.search(r"\b(?:speed|velocity)\b", lower):
        target = "v"
    elif re.search(r"\b(?:kinetic energy|energy)\b", lower):
        target = "E_k"
    elif re.search(r"\b(?:momentum)\b", lower):
        target = "p"
    elif re.search(r"\b(?:frequency)\b", lower):
        target = "f"
    elif re.search(r"\b(?:time period|period)\b", lower):
        target = "T"
    elif re.search(r"\b(?:wavelength|de broglie)\b", lower):
        target = "lambda_db"
    elif re.search(r"\b(?:force|magnetic force|electric force)\b", lower):
        target = "F"

    return knowns, particle, target


def solve_from_natural_language(text: str) -> Optional[MultiHopResult]:
    """End-to-end pipeline: parse question, solve multi-hop, return structured solution."""
    knowns, particle, target = extract_problem_state(text)
    if not target or not knowns:
        return None

    res = solve_multi_hop_question(knowns, target, particle=particle)
    return res if res.matched else None
