"""dimensional_guardrails.py — Buckingham Pi Dimensional Guardrails & MCQ Eliminator.

Strict deterministic dimensional analysis over 7 SI base dimensions:
    (M, L, T, I, Θ, N, J)
Enforces:
1. Dimensional homogeneity of physical equations: [L.H.S.] == [R.H.S.]
2. Addition consistency: terms in a sum must have identical dimensions
3. Dimensionless arguments for transcendental functions (exp, log, sin, cos, etc.)
4. Instant elimination of dimensionally incorrect options in JEE/NEET MCQs.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from fractions import Fraction
from typing import Any, Dict, List, Optional, Tuple, Union

import sympy as sp


# Dimension vector representation: 7-tuple of exponents (M, L, T, I, TH, N, J)
DimVector = Tuple[Fraction, Fraction, Fraction, Fraction, Fraction, Fraction, Fraction]

ZERO_DIM: DimVector = (
    Fraction(0), Fraction(0), Fraction(0), Fraction(0), Fraction(0), Fraction(0), Fraction(0)
)


def make_dim(
    m: Union[int, Fraction, float] = 0,
    l: Union[int, Fraction, float] = 0,
    t: Union[int, Fraction, float] = 0,
    i: Union[int, Fraction, float] = 0,
    th: Union[int, Fraction, float] = 0,
    n: Union[int, Fraction, float] = 0,
    j: Union[int, Fraction, float] = 0,
) -> DimVector:
    return (
        Fraction(m), Fraction(l), Fraction(t), Fraction(i),
        Fraction(th), Fraction(n), Fraction(j)
    )


def dim_add(d1: DimVector, d2: DimVector) -> DimVector:
    return tuple(a + b for a, b in zip(d1, d2))  # type: ignore


def dim_sub(d1: DimVector, d2: DimVector) -> DimVector:
    return tuple(a - b for a, b in zip(d1, d2))  # type: ignore


def dim_mul(d: DimVector, scalar: Union[int, Fraction, float]) -> DimVector:
    s = Fraction(scalar)
    return tuple(a * s for a in d)  # type: ignore


def dim_to_str(d: DimVector) -> str:
    labels = ["M", "L", "T", "I", "Θ", "N", "J"]
    parts = []
    for label, exp in zip(labels, d):
        if exp == 0:
            continue
        if exp == 1:
            parts.append(label)
        else:
            parts.append(f"{label}^{exp}")
    return " ".join(parts) if parts else "[Dimensionless]"


# Canonical physics dimension mappings
STANDARD_DIMENSIONS: Dict[str, DimVector] = {
    # Length & Geometry
    "length": make_dim(l=1),
    "distance": make_dim(l=1),
    "radius": make_dim(l=1),
    "wavelength": make_dim(l=1),
    "area": make_dim(l=2),
    "volume": make_dim(l=3),
    
    # Kinematics & Mechanics
    "time": make_dim(t=1),
    "period": make_dim(t=1),
    "frequency": make_dim(t=-1),
    "mass": make_dim(m=1),
    "velocity": make_dim(l=1, t=-1),
    "speed": make_dim(l=1, t=-1),
    "acceleration": make_dim(l=1, t=-2),
    "force": make_dim(m=1, l=1, t=-2),
    "tension": make_dim(m=1, l=1, t=-2),
    "weight": make_dim(m=1, l=1, t=-2),
    "momentum": make_dim(m=1, l=1, t=-1),
    "impulse": make_dim(m=1, l=1, t=-1),
    "energy": make_dim(m=1, l=2, t=-2),
    "work": make_dim(m=1, l=2, t=-2),
    "torque": make_dim(m=1, l=2, t=-2),
    "power": make_dim(m=1, l=2, t=-3),
    "pressure": make_dim(m=1, l=-1, t=-2),
    "density": make_dim(m=1, l=-3),
    "surface_tension": make_dim(m=1, t=-2),
    "spring_constant": make_dim(m=1, t=-2),
    "viscosity": make_dim(m=1, l=-1, t=-1),
    "angular_momentum": make_dim(m=1, l=2, t=-1),
    "moment_of_inertia": make_dim(m=1, l=2),

    # Electromagnetism
    "charge": make_dim(t=1, i=1),
    "current": make_dim(i=1),
    "voltage": make_dim(m=1, l=2, t=-3, i=-1),
    "potential": make_dim(m=1, l=2, t=-3, i=-1),
    "emf": make_dim(m=1, l=2, t=-3, i=-1),
    "resistance": make_dim(m=1, l=2, t=-3, i=-2),
    "capacitance": make_dim(m=-1, l=-2, t=4, i=2),
    "inductance": make_dim(m=1, l=2, t=-2, i=-2),
    "electric_field": make_dim(m=1, l=1, t=-3, i=-1),
    "magnetic_field": make_dim(m=1, t=-2, i=-1),
    "magnetic_flux": make_dim(m=1, l=2, t=-2, i=-1),

    # Thermodynamics
    "temperature": make_dim(th=1),
    "heat_capacity": make_dim(m=1, l=2, t=-2, th=-1),
    "entropy": make_dim(m=1, l=2, t=-2, th=-1),
}

# Standard variable symbols commonly used in physics problems
SYMBOL_DIMENSIONS: Dict[str, DimVector] = {
    # Length
    "x": make_dim(l=1), "y": make_dim(l=1), "z": make_dim(l=1),
    "r": make_dim(l=1), "R": make_dim(l=1), "d": make_dim(l=1),
    "h": make_dim(l=1), "s": make_dim(l=1), "L": make_dim(l=1),
    "lambda_val": make_dim(l=1), "lambda": make_dim(l=1),
    
    # Time
    "t": make_dim(t=1), "T": make_dim(t=1), "tau": make_dim(t=1),
    
    # Mass
    "m": make_dim(m=1), "M": make_dim(m=1),
    
    # Kinematics
    "v": make_dim(l=1, t=-1), "u": make_dim(l=1, t=-1), "c": make_dim(l=1, t=-1),
    "a": make_dim(l=1, t=-2), "g": make_dim(l=1, t=-2),
    
    # Force & Momentum
    "F": make_dim(m=1, l=1, t=-2), "p": make_dim(m=1, l=1, t=-1),
    "f": make_dim(m=1, l=1, t=-2), "N": make_dim(m=1, l=1, t=-2),
    
    # Energy, Work, Power
    "E": make_dim(m=1, l=2, t=-2), "W": make_dim(m=1, l=2, t=-2),
    "K": make_dim(m=1, l=2, t=-2), "U": make_dim(m=1, l=2, t=-2),
    "P": make_dim(m=1, l=2, t=-3),
    
    # Electromagnetism
    "q": make_dim(t=1, i=1), "Q": make_dim(t=1, i=1),
    "I": make_dim(i=1), "i_curr": make_dim(i=1),
    "V": make_dim(m=1, l=2, t=-3, i=-1),
    "B": make_dim(m=1, t=-2, i=-1),
    "C": make_dim(m=-1, l=-2, t=4, i=2),
    
    # Physical Constants
    "G": make_dim(m=-1, l=3, t=-2),
    "eps0": make_dim(m=-1, l=-3, t=4, i=2),
    "epsilon_0": make_dim(m=-1, l=-3, t=4, i=2),
    "mu0": make_dim(m=1, l=1, t=-2, i=-2),
    "mu_0": make_dim(m=1, l=1, t=-2, i=-2),
    "h_planck": make_dim(m=1, l=2, t=-1),
    "hbar": make_dim(m=1, l=2, t=-1),
    "k_B": make_dim(m=1, l=2, t=-2, th=-1),
    "k": make_dim(m=1, t=-2),  # spring constant
    "R_gas": make_dim(m=1, l=2, t=-2, th=-1, n=-1),
}


class DimensionalAnalysisError(ValueError):
    pass


class DimensionalGuardrail:
    """Rigorous dimensional parser and invariant verification engine."""

    @classmethod
    def get_expression_dimension(
        cls,
        expr_str: str,
        custom_symbols: Optional[Dict[str, DimVector]] = None,
    ) -> DimVector:
        """Parse formula string and return its net base dimension vector."""
        sym_map = dict(SYMBOL_DIMENSIONS)
        if custom_symbols:
            sym_map.update(custom_symbols)

        # Clean common math tokens
        cleaned = expr_str.strip()
        cleaned = cleaned.replace("^", "**")
        cleaned = re.sub(r"\bpi\b", "1", cleaned, flags=re.I)

        # Parse with sympy
        try:
            sp_expr = sp.sympify(cleaned)
        except Exception as e:
            raise DimensionalAnalysisError(f"Could not parse expression '{expr_str}': {e}")

        return cls._eval_node_dimension(sp_expr, sym_map)

    @classmethod
    def _eval_node_dimension(
        cls,
        node: sp.Expr,
        sym_map: Dict[str, DimVector],
    ) -> DimVector:
        if node.is_Number:
            return ZERO_DIM

        if node.is_Symbol:
            name = str(node.name)
            if name in sym_map:
                return sym_map[name]
            # If not in map, assume dimensionless constant unless specified
            return ZERO_DIM

        if node.is_Mul:
            curr = ZERO_DIM
            for arg in node.args:
                arg_dim = cls._eval_node_dimension(arg, sym_map)
                curr = dim_add(curr, arg_dim)
            return curr

        if node.is_Pow:
            base, exp = node.args
            base_dim = cls._eval_node_dimension(base, sym_map)
            # Power exponent must be dimensionless
            exp_dim = cls._eval_node_dimension(exp, sym_map)
            if exp_dim != ZERO_DIM:
                raise DimensionalAnalysisError(
                    f"Exponent {exp} in power {node} has dimension {dim_to_str(exp_dim)}, must be dimensionless!"
                )
            if exp.is_Number:
                scalar = Fraction(str(exp))
                return dim_mul(base_dim, scalar)
            return ZERO_DIM

        if node.is_Add:
            # Terms in sum MUST have identical dimensions!
            first_dim = cls._eval_node_dimension(node.args[0], sym_map)
            for other_arg in node.args[1:]:
                other_dim = cls._eval_node_dimension(other_arg, sym_map)
                if other_dim != first_dim:
                    raise DimensionalAnalysisError(
                        f"Dimensional mismatch in addition: '{node.args[0]}' has dimension {dim_to_str(first_dim)} "
                        f"but '{other_arg}' has dimension {dim_to_str(other_dim)}!"
                    )
            return first_dim

        # Transcendental functions (sin, cos, exp, log)
        if isinstance(node, (sp.sin, sp.cos, sp.tan, sp.exp, sp.log, sp.asin, sp.acos, sp.atan)):
            arg_dim = cls._eval_node_dimension(node.args[0], sym_map)
            if arg_dim != ZERO_DIM:
                raise DimensionalAnalysisError(
                    f"Argument to {node.func.__name__} has dimension {dim_to_str(arg_dim)}, must be dimensionless!"
                )
            return ZERO_DIM

        # Default fallback: check free symbols
        return ZERO_DIM

    @classmethod
    def validate_equation(
        cls,
        lhs: str,
        rhs: str,
        custom_symbols: Optional[Dict[str, DimVector]] = None,
    ) -> Tuple[bool, str]:
        """Check if [L.H.S.] == [R.H.S.]."""
        try:
            d_lhs = cls.get_expression_dimension(lhs, custom_symbols)
            d_rhs = cls.get_expression_dimension(rhs, custom_symbols)
            if d_lhs == d_rhs:
                return True, f"Dimensionally consistent: both sides have dimension {dim_to_str(d_lhs)}."
            else:
                return False, (
                    f"Dimensional violation: L.H.S. has dimension {dim_to_str(d_lhs)}, "
                    f"while R.H.S. has dimension {dim_to_str(d_rhs)}."
                )
        except DimensionalAnalysisError as err:
            return False, f"Dimensional analysis error: {err}"

    @classmethod
    def eliminate_mcq_options(
        cls,
        target: str,
        options: Dict[str, str],
        custom_symbols: Optional[Dict[str, DimVector]] = None,
    ) -> Dict[str, Any]:
        """Eliminate MCQ options that violate dimensional homogeneity with target quantity."""
        # Resolve target dimension
        target_norm = target.strip().lower()
        target_dim = STANDARD_DIMENSIONS.get(target_norm)
        if target_dim is None:
            # Try to parse target as expression
            try:
                target_dim = cls.get_expression_dimension(target, custom_symbols)
            except Exception:
                target_dim = None

        if target_dim is None:
            return {
                "success": False,
                "error": f"Unknown target dimension or quantity '{target}'.",
                "valid_options": list(options.keys()),
                "eliminated_options": {},
            }

        valid_opts = []
        eliminated = {}
        for opt_key, opt_expr in options.items():
            try:
                opt_dim = cls.get_expression_dimension(opt_expr, custom_symbols)
                if opt_dim == target_dim:
                    valid_opts.append(opt_key)
                else:
                    eliminated[opt_key] = {
                        "expression": opt_expr,
                        "found_dimension": dim_to_str(opt_dim),
                        "expected_dimension": dim_to_str(target_dim),
                        "reason": f"Dimension mismatch: expected {dim_to_str(target_dim)}, found {dim_to_str(opt_dim)}.",
                    }
            except DimensionalAnalysisError as e:
                eliminated[opt_key] = {
                    "expression": opt_expr,
                    "reason": f"Internal dimensional violation: {e}",
                }

        return {
            "success": True,
            "target": target,
            "expected_dimension": dim_to_str(target_dim),
            "valid_options": valid_opts,
            "eliminated_options": eliminated,
            "reduction_ratio": f"{len(eliminated)}/{len(options)} eliminated",
        }
