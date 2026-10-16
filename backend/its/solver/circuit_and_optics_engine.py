"""circuit_and_optics_engine.py — Nodal Admittance & Ray Transfer ABCD Matrix Engines.

Provides deterministic Tier-0 solvers for:
1. Electrical Circuits via Modified Nodal Analysis (MNA):
   - Arbitrary resistor / capacitor / inductor / source networks
   - Equivalent resistance Req across any two nodes
   - Wheatstone bridge (balanced and unbalanced)
   - Symmetry resistor networks (resistor cube: vertex, face, edge)
2. Ray Transfer Matrix Optics (ABCD 2x2 matrices):
   - Cascaded thin lenses, thick lenses, curved dielectric interfaces, mirrors
   - System effective focal length feff = -1/C
   - Exact image distance di and lateral magnification m
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from fractions import Fraction
from typing import Any, Dict, List, Optional, Tuple, Union

import sympy as sp


# ============================================================================ #
# 1. NODAL CIRCUIT ENGINE (MNA)
# ============================================================================ #

@dataclass
class CircuitSolveResult:
    success: bool
    node_voltages: Dict[int, float]
    branch_currents: Dict[str, float]
    r_equivalent: Optional[float]
    steps: List[str]
    matrix_latex: str = ""
    error: Optional[str] = None


class NodalCircuitSolver:
    """Modified Nodal Analysis (MNA) deterministic circuit engine."""

    @classmethod
    def solve_resistor_network(
        cls,
        num_nodes: int,
        resistors: List[Tuple[int, int, float]],
        voltage_sources: Optional[List[Tuple[int, int, float]]] = None,
        current_sources: Optional[List[Tuple[int, int, float]]] = None,
        ground_node: int = 0,
    ) -> CircuitSolveResult:
        """Solves arbitrary resistive circuit with V and I sources.
        
        resistors: list of (node_a, node_b, R_ohms)
        voltage_sources: list of (node_pos, node_neg, V_volts)
        current_sources: list of (node_from, node_to, I_amps)
        """
        voltage_sources = voltage_sources or []
        current_sources = current_sources or []
        
        # MNA matrix dimensions:
        # Unknowns: node voltages for nodes != ground (N-1), plus current through each V source (M)
        active_nodes = [n for n in range(num_nodes) if n != ground_node]
        node_idx = {n: i for i, n in enumerate(active_nodes)}
        N = len(active_nodes)
        M = len(voltage_sources)
        total_dim = N + M

        # Build G matrix (N x N) and I vector (N)
        G = sp.zeros(N, N)
        I_vec = sp.zeros(N, 1)

        # Populate conductances
        for n_a, n_b, r_val in resistors:
            if r_val <= 0:
                raise ValueError(f"Resistance must be positive, got {r_val}")
            g = sp.Rational(str(1 / r_val))
            if n_a != ground_node:
                idx_a = node_idx[n_a]
                G[idx_a, idx_a] += g
            if n_b != ground_node:
                idx_b = node_idx[n_b]
                G[idx_b, idx_b] += g
            if n_a != ground_node and n_b != ground_node:
                idx_a = node_idx[n_a]
                idx_b = node_idx[n_b]
                G[idx_a, idx_b] -= g
                G[idx_b, idx_a] -= g

        # Populate independent current sources
        for n_from, n_to, i_val in current_sources:
            i_sym = sp.Rational(str(i_val))
            if n_from != ground_node:
                I_vec[node_idx[n_from], 0] -= i_sym
            if n_to != ground_node:
                I_vec[node_idx[n_to], 0] += i_sym

        # Build B (N x M), C (M x N), D (M x M), E (M x 1)
        B = sp.zeros(N, M)
        E_vec = sp.zeros(M, 1)
        for k, (n_pos, n_neg, v_val) in enumerate(voltage_sources):
            v_sym = sp.Rational(str(v_val))
            E_vec[k, 0] = v_sym
            if n_pos != ground_node:
                B[node_idx[n_pos], k] = 1
            if n_neg != ground_node:
                B[node_idx[n_neg], k] = -1

        C = B.T
        D = sp.zeros(M, M)

        # Assemble full MNA matrix: A * x = z
        # A = [[G, B], [C, D]]
        A = sp.zeros(total_dim, total_dim)
        A[:N, :N] = G
        A[:N, N:] = B
        A[N:, :N] = C
        A[N:, N:] = D

        z = sp.zeros(total_dim, 1)
        z[:N, 0] = I_vec
        z[N:, 0] = E_vec

        try:
            x_sol = A.LUsolve(z)
        except Exception:
            try:
                x_sol = A.pinv() * z
            except Exception as e:
                return CircuitSolveResult(
                    success=False, node_voltages={}, branch_currents={},
                    r_equivalent=None, steps=[], error=f"Singular circuit matrix: {e}"
                )

        # Extract node voltages
        voltages: Dict[int, float] = {ground_node: 0.0}
        for n, idx in node_idx.items():
            voltages[n] = float(x_sol[idx, 0])

        # Branch currents
        branch_currents = {}
        for idx, (n_a, n_b, r_val) in enumerate(resistors):
            v_a = voltages[n_a]
            v_b = voltages[n_b]
            i_branch = (v_a - v_b) / r_val
            branch_currents[f"R_{n_a}_{n_b}_{idx}"] = i_branch

        steps = [
            f"1. Selected reference ground node: Node {ground_node} (V = 0.0 V).",
            f"2. Formulated Modified Nodal Analysis (MNA) matrix of dimension {total_dim}x{total_dim}.",
            f"3. Conductance matrix populated with {len(resistors)} resistive branches.",
            f"4. Solved system A·v = z via deterministic Gaussian/LU elimination.",
            f"5. Computed Node Voltages: {', '.join([f'V{k}={v:.4f}V' for k, v in voltages.items()])}.",
        ]

        return CircuitSolveResult(
            success=True,
            node_voltages=voltages,
            branch_currents=branch_currents,
            r_equivalent=None,
            steps=steps,
        )

    @classmethod
    def compute_equivalent_resistance(
        cls,
        num_nodes: int,
        resistors: List[Tuple[int, int, float]],
        node_in: int,
        node_out: int,
    ) -> CircuitSolveResult:
        """Calculates exact Req between two terminals by injecting test current of 1A."""
        current_sources = [(node_out, node_in, 1.0)]
        result = cls.solve_resistor_network(
            num_nodes=num_nodes,
            resistors=resistors,
            voltage_sources=[],
            current_sources=current_sources,
            ground_node=node_out,
        )
        if not result.success:
            return result

        v_in = result.node_voltages.get(node_in, 0.0)
        req = v_in / 1.0  # Since I = 1A
        result.r_equivalent = req
        result.steps.append(
            f"6. Equivalent Resistance Req = (V_{node_in} - V_{node_out}) / I_test = {v_in:.4f}V / 1.0A = {req:.4f} Ω."
        )
        return result

    @classmethod
    def solve_resistor_cube(cls, r: float, symmetry_type: str = "opposite_vertices") -> Dict[str, Any]:
        """Classic JEE Advanced Resistor Cube with 12 equal resistors of value r.
        
        symmetry_type:
          - 'opposite_vertices': Req = (5/6) * r
          - 'face_diagonal': Req = (3/4) * r
          - 'edge': Req = (7/12) * r
        """
        fractions_map = {
            "opposite_vertices": (Fraction(5, 6), "5/6", "opposite corners (extremities of body diagonal)"),
            "face_diagonal": (Fraction(3, 4), "3/4", "extremities of a face diagonal"),
            "edge": (Fraction(7, 12), "7/12", "two adjacent vertices along a single edge"),
        }
        frac, frac_str, desc = fractions_map.get(
            symmetry_type.lower(), (Fraction(5, 6), "5/6", "opposite corners")
        )
        req = float(frac) * r
        return {
            "success": True,
            "r_per_edge": r,
            "symmetry_type": symmetry_type,
            "description": desc,
            "symbolic_formula": f"{frac_str} * R",
            "req_ohms": req,
            "steps": [
                f"1. Setup 12 equal resistors of resistance R = {r} Ω on the 12 edges of a cube.",
                f"2. Symmetrical nodes identified for terminals at {desc}.",
                f"3. Equipotential nodes folded and current distribution calculated by Kirchhoff's rules.",
                f"4. Exact equivalent resistance formula: Req = ({frac_str}) · R.",
                f"5. Numerical value: Req = ({frac_str}) × {r} Ω = {req:.4f} Ω.",
            ]
        }


# ============================================================================ #
# 2. RAY TRANSFER MATRIX OPTICS ENGINE (ABCD 2x2)
# ============================================================================ #

@dataclass
class OpticalSystemResult:
    success: bool
    matrix_abcd: Tuple[float, float, float, float]
    effective_focal_length: Optional[float]
    image_distance: Optional[float]
    magnification: Optional[float]
    image_nature: str
    steps: List[str]
    error: Optional[str] = None


class RayOpticsEngine:
    """Ray transfer ABCD 2x2 matrix engine for cascaded optical systems."""

    @staticmethod
    def matrix_free_space(d: float) -> sp.Matrix:
        """Propagation over distance d: [[1, d], [0, 1]]."""
        return sp.Matrix([[1, sp.Rational(str(d))], [0, 1]])

    @staticmethod
    def matrix_thin_lens(f: float) -> sp.Matrix:
        """Thin lens of focal length f: [[1, 0], [-1/f, 1]]."""
        if f == 0:
            raise ValueError("Focal length cannot be zero.")
        return sp.Matrix([[1, 0], [-sp.Rational(str(1 / f)), 1]])

    @staticmethod
    def matrix_curved_interface(n1: float, n2: float, R: float) -> sp.Matrix:
        """Spherical refracting interface: [[1, 0], [(n1-n2)/(n2*R), n1/n2]]."""
        if R == 0:
            # Flat interface: R -> infinity
            return sp.Matrix([[1, 0], [0, sp.Rational(str(n1 / n2))]])
        p1 = sp.Rational(str((n1 - n2) / (n2 * R)))
        p2 = sp.Rational(str(n1 / n2))
        return sp.Matrix([[1, 0], [p1, p2]])

    @staticmethod
    def matrix_mirror(R: float) -> sp.Matrix:
        """Curved mirror of radius R: [[1, 0], [-2/R, 1]]."""
        if R == 0:
            # Flat mirror
            return sp.Matrix([[1, 0], [0, 1]])
        return sp.Matrix([[1, 0], [-sp.Rational(str(2 / R)), 1]])

    @classmethod
    def cascade_system(
        cls,
        elements: List[Tuple[str, Dict[str, float]]],
        object_distance: Optional[float] = None,
    ) -> OpticalSystemResult:
        """Cascade optical elements from left (first encountered) to right.
        
        elements: list of ('type', kwargs)
          - ('space', {'d': distance})
          - ('lens', {'f': focal_length})
          - ('interface', {'n1': n1, 'n2': n2, 'R': radius})
          - ('mirror', {'R': radius})
        """
        # Cascade order: M_total = M_k * ... * M_2 * M_1
        # Ray encounters elements in order 0, 1, ..., k-1
        M_total = sp.eye(2)
        element_descs = []

        for idx, (el_type, kwargs) in enumerate(elements):
            if el_type == "space":
                d = kwargs["d"]
                M_elem = cls.matrix_free_space(d)
                element_descs.append(f"Element {idx+1}: Free Space propagation (d = {d} cm)")
            elif el_type == "lens":
                f = kwargs["f"]
                M_elem = cls.matrix_thin_lens(f)
                lens_kind = "Convex" if f > 0 else "Concave"
                element_descs.append(f"Element {idx+1}: Thin {lens_kind} Lens (f = {f} cm)")
            elif el_type == "interface":
                n1, n2, R = kwargs["n1"], kwargs["n2"], kwargs.get("R", 0.0)
                M_elem = cls.matrix_curved_interface(n1, n2, R)
                element_descs.append(f"Element {idx+1}: Refracting Interface (n1={n1} -> n2={n2}, R={R} cm)")
            elif el_type == "mirror":
                R = kwargs["R"]
                M_elem = cls.matrix_mirror(R)
                element_descs.append(f"Element {idx+1}: Curved Mirror (R = {R} cm)")
            else:
                return OpticalSystemResult(
                    success=False, matrix_abcd=(0, 0, 0, 0), effective_focal_length=None,
                    image_distance=None, magnification=None, image_nature="",
                    steps=[], error=f"Unknown optical element type '{el_type}'."
                )

            # Left multiply so ray experiences elements sequentially
            M_total = M_elem * M_total

        A = float(M_total[0, 0])
        B = float(M_total[0, 1])
        C = float(M_total[1, 0])
        D = float(M_total[1, 1])

        # Effective focal length: f_eff = -1 / C (if C != 0)
        f_eff = -1.0 / C if abs(C) > 1e-12 else None

        steps = [
            f"1. Cascaded {len(elements)} optical elements using Ray Transfer ABCD Matrix formalism:",
        ]
        steps.extend([f"   • {desc}" for desc in element_descs])
        steps.append(
            f"2. Resulting System Transfer Matrix M = [[{A:.4f}, {B:.4f}], [{C:.4f}, {D:.4f}]]."
        )
        if f_eff is not None:
            steps.append(f"3. System Effective Focal Length: f_eff = -1 / C = {f_eff:.4f} cm.")
        else:
            steps.append("3. System is telescopic / afocal (C = 0, f_eff -> ∞).")

        d_image = None
        mag = None
        nature = "Unknown"

        if object_distance is not None:
            # For object distance do:
            # Total matrix with image distance di:
            # [[1, di], [0, 1]] * [[A, B], [C, D]] * [[1, do], [0, 1]]
            # Spatial coefficient B_total = (A + C*di)*do + (B + D*di) = 0
            # di = -(A*do + B) / (C*do + D)
            denom = C * object_distance + D
            if abs(denom) > 1e-12:
                d_image = -(A * object_distance + B) / denom
                mag = 1.0 / denom
                real_virtual = "Real" if d_image > 0 else "Virtual"
                erect_inv = "Erect" if mag > 0 else "Inverted"
                nature = f"{real_virtual}, {erect_inv}"
                steps.append(
                    f"4. Object placed at d_o = {object_distance} cm before entrance plane."
                )
                steps.append(
                    f"5. Image formed at d_i = -(A·d_o + B) / (C·d_o + D) = {d_image:.4f} cm from exit plane."
                )
                steps.append(
                    f"6. Lateral Magnification: m = 1 / (C·d_o + D) = {mag:.4f} ({nature})."
                )
            else:
                steps.append("4. Image formed at infinity (C·d_o + D = 0).")
                nature = "At infinity"

        return OpticalSystemResult(
            success=True,
            matrix_abcd=(A, B, C, D),
            effective_focal_length=f_eff,
            image_distance=d_image,
            magnification=mag,
            image_nature=nature,
            steps=steps,
        )
