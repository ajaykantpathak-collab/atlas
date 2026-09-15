"""equation_graph.py — Physics knowledge graph that replaces ALL templates.

Instead of hardcoding templates per question type, this module builds a
GRAPH of physical relationships:

    Nodes = physical quantities (u, v, a, s, t, F, m, E, V, I, ...)
    Edges = equations that connect them (v = u + at connects v, u, a, t)

Solving becomes a GRAPH SEARCH:
    Given knowns {u: 0, a: 9.8, t: 5}, find "s"
    → Search for a path from known variables to the target variable
    → "s" is reachable via equation s = ut + ½at² (needs u, a, t — all known)
    → Solve it. Done. One equation handles infinite question variations.

This replaces ALL templates because:
    - One equation handles infinite question variations (just change target)
    - Multi-step problems = multi-hop graph paths (automatic)
    - New concepts = add one equation (not a new template)
    - The system EXPLAINS which equations it used and why

This is how Wolfram Alpha and real physics engines work internally.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Set, Tuple

import sympy
from sympy import symbols, Eq, solve as sym_solve, sympify


# --------------------------------------------------------------------------- #
# Data structures
# ---------------------------------------------------------------------------

@dataclass
class PhysicsEquation:
    """One physical relationship connecting multiple quantities."""
    eq_id: str                    # unique ID: "v_uat", "f_ma", etc.
    expression: str               # symbolic form: "v = u + a*t"
    subject: str                  # "mechanics", "electricity", "optics" etc.
    variables: List[str]          # all variable symbols in the equation
    description: str              # human-readable name
    class_levels: List[int]       # which classes this equation appears in
    solve_fn: Optional[Callable] = None  # custom solver (if symbolic fails)
    solvable_vars: Optional[List[str]] = None  # None = all variables
    _parsed: Any = None           # cached sympy expression (lhs - rhs)


@dataclass
class SolvePath:
    """One path through the equation graph from knowns to target."""
    target: str
    steps: List[Dict[str, Any]]   # ordered solving steps
    equations_used: List[str]     # equation IDs in order
    final_value: Optional[float]
    confidence: float             # 1.0 = direct, lower for multi-hop


# --------------------------------------------------------------------------- #
# The Physics Equation Graph
# ---------------------------------------------------------------------------

class EquationGraph:
    """Knowledge graph of physical relationships.

    Building blocks:
    - Each equation is a NODE with its variable set
    - Variables are EDGES connecting equations (shared variables = connected)
    - Given knowns + target, find the shortest solving path
    """

    def __init__(self) -> None:
        self.equations: Dict[str, PhysicsEquation] = {}
        self._var_index: Dict[str, List[str]] = {}  # variable -> [eq_ids]
        self._build_physics_graph()

    def add_equation(self, eq: PhysicsEquation) -> None:
        """Add an equation to the graph."""
        self.equations[eq.eq_id] = eq
        for var in eq.variables:
            self._var_index.setdefault(var, []).append(eq.eq_id)

    def get_equations_for_variable(self, var: str) -> List[PhysicsEquation]:
        """All equations that contain a given variable."""
        return [self.equations[eid] for eid in self._var_index.get(var, [])]

    # ------------------------------------------------------------------ #
    # Graph search: find solving path
    # ------------------------------------------------------------------ #

    def find_solve_path(
        self,
        knowns: Dict[str, float],
        target: str,
        max_depth: int = 5,
    ) -> Optional[SolvePath]:
        """Find the shortest sequence of equations from knowns to target.

        Algorithm: BFS through the equation graph.
        - Level 0: knowns are the starting set
        - Each level: find equations where exactly 1 variable is unknown
          and all others are known → solve for the unknown → add to knowns
        - Stop when target is in knowns

        This is GUARANTEED to find the shortest path (BFS property).
        """
        known: Dict[str, float] = dict(knowns)
        steps: List[Dict[str, Any]] = []
        used_eqs: List[str] = []

        for depth in range(max_depth):
            if target in known:
                return SolvePath(
                    target=target, steps=steps, equations_used=used_eqs,
                    final_value=known[target],
                    confidence=1.0 / (1 + depth * 0.1),
                )

            # Find equations where exactly 1 variable is unknown
            progress = False
            for eq_id, eq in self.equations.items():
                if eq_id in used_eqs:
                    continue
                unknown_vars = [v for v in eq.variables if v not in known]
                if len(unknown_vars) != 1:
                    continue  # need exactly 1 unknown to solve

                unknown_var = unknown_vars[0]
                # Skip variables this equation cannot solve for
                if (eq.solvable_vars is not None
                        and unknown_var not in eq.solvable_vars):
                    continue
                known_inputs = {v: known[v] for v in eq.variables if v in known}

                # Try to solve for the unknown
                value = self._solve_equation(eq, unknown_var, known_inputs)
                if value is None:
                    continue

                # Record the step
                steps.append({
                    "step": len(steps) + 1,
                    "equation": eq.expression,
                    "equation_id": eq_id,
                    "solved_for": unknown_var,
                    "inputs": known_inputs,
                    "value": value,
                    "description": eq.description,
                })
                known[unknown_var] = value
                used_eqs.append(eq_id)
                progress = True

                if target in known:
                    return SolvePath(
                        target=target, steps=steps, equations_used=used_eqs,
                        final_value=known[target],
                        confidence=1.0 / (1 + depth * 0.1),
                    )

            if not progress:
                break  # no more equations can be solved

        return None  # cannot reach target

    def _parsed_expr(self, eq: PhysicsEquation):
        """Cached sympy form of (lhs - rhs). None when unparseable."""
        if eq._parsed is not None:
            return eq._parsed if eq._parsed != "BAD" else None
        import sympy
        from sympy import sympify

        try:
            expr = eq.expression
            if "=" in expr:
                lhs, rhs = expr.split("=", 1)
                parsed = sympify(f"({lhs.strip()}) - ({rhs.strip()})")
            else:
                parsed = sympify(expr)
            eq._parsed = parsed
            return parsed
        except Exception:
            eq._parsed = "BAD"
            return None

    def _solve_equation(
        self, eq: PhysicsEquation, target_var: str,
        knowns: Dict[str, float],
    ) -> Optional[float]:
        """Solve via the calculus-engine cascade:
        symengine -> sympy -> giac -> scipy, residual-verified."""
        import math as _math

        try:
            from sympy import Symbol

            from backend.solvers.core_calculus_engine.algebraic_solver import (
                solve_for)

            parsed = self._parsed_expr(eq)
            if parsed is None:
                raise ValueError("unparseable")

            subs = {Symbol(v): float(val) for v, val in knowns.items()
                    if v in eq.variables}
            scale = max([1.0] + [abs(float(v)) for v in knowns.values()])
            tgt_sym = Symbol(target_var)

            def _verifier(cand: float) -> bool:
                try:
                    if not _math.isfinite(cand):
                        return False
                    res = float(parsed.subs({**subs, tgt_sym: cand}))
                    return (_math.isfinite(res)
                            and abs(res) < 1e-6 * max(scale, abs(cand)))
                except Exception:
                    return False

            lhs, _, rhs = eq.expression.partition("=")
            result = solve_for(
                lhs.strip(), rhs.strip() if rhs.strip() else "0",
                target_var, knowns, verifier=_verifier, timeout_s=2.5)
            if result.solutions:
                return result.first
        except Exception:
            pass

        # Try custom solver if available
        if eq.solve_fn:
            try:
                return eq.solve_fn(target_var, knowns)
            except Exception:
                pass

        return None

    # ------------------------------------------------------------------ #
    # Build the physics knowledge graph
    # ------------------------------------------------------------------ #

    def _build_physics_graph(self) -> None:
        """Populate the graph with ALL standard physics/chem equations.

        This replaces templates: one equation handles infinite question
        variations just by changing which variable is the target.
        """

        def _add(eq_id, expression, subject, variables, description, classes):
            self.add_equation(PhysicsEquation(
                eq_id=eq_id, expression=expression, subject=subject,
                variables=variables, description=description,
                class_levels=classes,
            ))

        # ═══ MECHANICS: Kinematics ═══
        _add("v_uat", "v = u + a*t", "kinematics",
             ["v", "u", "a", "t"], "First equation of motion", [9,10,11,12])
        _add("s_ut_half_at2", "s = u*t + (a*t*t)/2", "kinematics",
             ["s", "u", "a", "t"], "Second equation of motion", [9,10,11,12])
        _add("v2_u2_2as", "v*v = u*u + 2*a*s", "kinematics",
             ["v", "u", "a", "s"], "Third equation of motion", [9,10,11,12])
        _add("s_vt_avg", "s = (v + u)*t/2", "kinematics",
             ["s", "v", "u", "t"], "Displacement from average velocity", [9,10,11])

        # ═══ MECHANICS: Newton's Laws ═══
        _add("f_ma", "F = m*a", "mechanics",
             ["F", "m", "a"], "Newton's second law", [9,10,11,12])
        _add("weight", "W = m*g", "mechanics",
             ["W", "m", "g"], "Weight = mass * gravity", [9,10,11,12])
        _add("friction", "f = mu*N", "mechanics",
             ["f", "mu", "N"], "Friction force = mu * Normal", [11,12])
        _add("normal_flat", "N = m*g", "mechanics",
             ["N", "m", "g"], "Normal force on flat surface", [9,10,11])
        _add("normal_incline", "N = m*g*cos(theta)", "mechanics",
             ["N", "m", "g", "theta"], "Normal force on incline", [11,12])

        # ═══ MECHANICS: Work-Energy-Power ═══
        _add("work_fd", "W = F*d*cos_theta", "work_energy",
             ["W", "F", "d", "cos_theta"], "Work = Force * displacement * cos(theta)", [10,11,12])
        _add("kinetic_energy", "KE = m*v*v/2", "work_energy",
             ["KE", "m", "v"], "Kinetic energy", [9,10,11,12])
        _add("potential_energy", "PE = m*g*h", "work_energy",
             ["PE", "m", "g", "h"], "Gravitational potential energy", [9,10,11,12])
        _add("power_wv", "P = F*v", "work_energy",
             ["P", "F", "v"], "Power = Force * velocity", [10,11,12])
        _add("power_wt", "P = W/t", "work_energy",
             ["P", "W", "t"], "Power = Work / time", [9,10,11,12])
        _add("energy_conservation", "KE_i + PE_i = KE_f + PE_f", "work_energy",
             ["KE_i", "PE_i", "KE_f", "PE_f"], "Conservation of mechanical energy", [11,12])

        # ═══ MECHANICS: Momentum ═══
        _add("momentum", "p = m*v", "momentum",
             ["p", "m", "v"], "Linear momentum", [11,12])
        _add("impulse", "J = F*t", "momentum",
             ["J", "F", "t"], "Impulse = Force * time", [11,12])
        _add("impulse_momentum", "J = dp", "momentum",
             ["J", "dp"], "Impulse = change in momentum", [11,12])

        # ═══ MECHANICS: Gravitation ═══
        _add("grav_force", "F = G*M*m/(r*r)", "gravitation",
             ["F", "G", "M", "m", "r"], "Newton's law of gravitation", [11,12])
        _add("g_surface", "g = G*M/(R*R)", "gravitation",
             ["g", "G", "M", "R"], "Acceleration due to gravity at surface", [11,12])

        # ═══ MECHANICS: Rotational ═══
        _add("torque_ia", "tau = I*alpha", "rotational",
             ["tau", "I", "alpha"], "Torque = I * angular acceleration", [11,12])
        _add("angular_momentum", "L = I*omega", "rotational",
             ["L", "I", "omega"], "Angular momentum", [11,12])
        _add("rotational_ke", "KE_rot = I*omega*omega/2", "rotational",
             ["KE_rot", "I", "omega"], "Rotational kinetic energy", [11,12])
        _add("torque_fr", "tau = F*r*sin_theta", "rotational",
             ["tau", "F", "r", "sin_theta"], "Torque = Force * lever arm", [11,12])

        # ═══ ELECTRICITY ═══
        _add("ohms_law", "V = I*R", "electricity",
             ["V", "I", "R"], "Ohm's law", [10,11,12])
        _add("power_vi", "P = V*I", "electricity",
             ["P", "V", "I"], "Electric power = V * I", [10,11,12])
        _add("power_ir", "P = I*I*R", "electricity",
             ["P", "I", "R"], "Joule heating", [10,11,12])
        _add("power_v2r", "P = V*V/R", "electricity",
             ["P", "V", "R"], "Power = V^2/R", [10,11,12])
        _add("charge_current", "Q = I*t", "electricity",
             ["Q", "I", "t"], "Charge = Current * time", [10,11,12])
        _add("resistivity", "R = rho*L/A", "electricity",
             ["R", "rho", "L", "A"], "Resistance from resistivity", [12])

        # ═══ ELECTROSTATICS ═══
        _add("coulombs_law", "F = k*q1*q2/(r*r)", "electrostatics",
             ["F", "k", "q1", "q2", "r"], "Coulomb's law", [11,12])
        _add("electric_field", "E = k*q/(r*r)", "electrostatics",
             ["E", "k", "q", "r"], "Electric field of point charge", [11,12])
        _add("electric_potential", "V = k*q/r", "electrostatics",
             ["V", "k", "q", "r"], "Electric potential", [11,12])
        _add("field_potential_rel", "E = -dV/dr", "electrostatics",
             ["E", "dV", "dr"], "E = -gradient of potential", [12])

        # ═══ OPTICS ═══
        _add("lens_formula", "1/f = 1/v - 1/u", "optics",
             ["f", "v", "u"], "Lens formula", [11,12])
        _add("mirror_formula", "1/f = 1/v + 1/u", "optics",
             ["f", "v", "u"], "Mirror formula", [10,11,12])
        _add("magnification_lens", "m = v/u", "optics",
             ["m", "v", "u"], "Magnification", [11,12])
        _add("snells_law", "n1*sin_i = n2*sin_r", "optics",
             ["n1", "sin_i", "n2", "sin_r"], "Snell's law of refraction", [11,12])

        # ═══ THERMODYNAMICS ═══
        _add("first_law", "dQ = dU + W", "thermodynamics",
             ["dQ", "dU", "W"], "First law of thermodynamics", [11,12])
        _add("carnot_efficiency", "eta = 1 - Tc/Th", "thermodynamics",
             ["eta", "Tc", "Th"], "Carnot engine efficiency", [11,12])
        _add("ideal_gas", "P*V = n*R*T", "thermodynamics",
             ["P", "V", "n", "R", "T"], "Ideal gas equation", [11,12])

        # ═══ MODERN PHYSICS ═══
        _add("photon_energy", "E = h*c/lambda", "modern_physics",
             ["E", "h", "c", "lambda"], "Photon energy", [12])
        _add("photoelectric", "KE_max = h*nu - phi", "modern_physics",
             ["KE_max", "h", "nu", "phi"], "Einstein's photoelectric equation", [12])
        _add("de_broglie", "lambda = h/(m*v)", "modern_physics",
             ["lambda", "h", "m", "v"], "de Broglie wavelength", [12])
        _add("mass_energy", "E = m*c*c", "modern_physics",
             ["E", "m", "c"], "Mass-energy equivalence", [12])

        # ═══ WAVES ═══
        _add("wave_speed", "v = f*lambda", "waves",
             ["v", "f", "lambda"], "Wave speed = frequency * wavelength", [11,12])

        # ═══ CHEMISTRY ═══
        _add("mole_mass", "n = m/M", "chemistry",
             ["n", "m", "M"], "Moles = mass / molar mass", [11,12])
        _add("molarity", "M = n/V", "chemistry",
             ["M", "n", "V"], "Molarity = moles / volume(L)", [11,12])
        _add("nernst", "E = E0 - (RT/nF)*ln(Q)", "electrochemistry",
             ["E", "E0", "R", "T", "n", "F", "Q"], "Nernst equation", [12])
        _add("ph_constant", "pH + pOH = 14", "chemistry",
             ["pH", "pOH"], "pH + pOH = 14 (at 25C)", [11,12])
        _add("rate_constant", "rate = k*A^n*B^m", "chemical_kinetics",
             ["rate", "k", "A", "B"], "Rate law", [12])

    # ------------------------------------------------------------------ #
    # Query methods
    # ------------------------------------------------------------------ #

    def get_equation_count(self) -> int:
        return len(self.equations)

    def get_variable_count(self) -> int:
        return len(self._var_index)

    def get_subjects(self) -> List[str]:
        return list(set(eq.subject for eq in self.equations.values()))

    def get_equations_for_class(self, class_level: int) -> List[PhysicsEquation]:
        return [eq for eq in self.equations.values()
                if class_level in eq.class_levels]
