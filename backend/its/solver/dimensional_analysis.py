"""dimensional_analysis.py — Base-dimension algebra over unit families.

The professor's oldest tool, made computational: every unit family
maps to a base-dimension exponent vector (M, L, T, I, Theta, N).
Two slots can receive the same quantity only if their dimension
vectors agree. This prunes wrong quantity->variable assignments
without ANY vocabulary: 2 A fills a current slot ({I:1}) but can
never fill a resistance slot ({M:1, L:2, T:-3, I:-2}).

Wildcards (constants, dimensionless, statistics-like families)
contribute nothing and accept anything - the filter stays silent
where physics has no opinion and the semantic layer decides.
"""

from __future__ import annotations

from typing import Dict, Optional, Tuple

# family -> base-dimension vector (exponents)
FAMILY_DIMS: Dict[str, Dict[str, int]] = {
    "length": {"L": 1},
    "area": {"L": 2},
    "volume": {"L": 3},
    "time": {"T": 1},
    "mass": {"M": 1},
    "velocity": {"L": 1, "T": -1},
    "acceleration": {"L": 1, "T": -2},
    "force": {"M": 1, "L": 1, "T": -2},
    "energy": {"M": 1, "L": 2, "T": -2},
    "power": {"M": 1, "L": 2, "T": -3},
    "pressure": {"M": 1, "L": -1, "T": -2},
    "momentum": {"M": 1, "L": 1, "T": -1},
    "torque": {"M": 1, "L": 2, "T": -2},
    "inertia": {"M": 1, "L": 2},
    "angular_momentum": {"M": 1, "L": 2, "T": -1},
    "frequency": {"T": -1},
    "current": {"I": 1},
    "voltage": {"M": 1, "L": 2, "T": -3, "I": -1},
    "resistance": {"M": 1, "L": 2, "T": -3, "I": -2},
    "resistivity": {"M": 1, "L": 3, "T": -3, "I": -2},
    "charge": {"I": 1, "T": 1},
    "capacitance": {"I": 2, "T": 4, "M": -1, "L": -2},
    "inductance": {"M": 1, "L": 2, "T": -2, "I": -2},
    "field_b": {"M": 1, "T": -2, "I": -1},
    "field_e": {"M": 1, "L": 1, "T": -3, "I": -1},
    "flux": {"M": 1, "L": 2, "T": -2, "I": -1},
    "dipole": {"I": 1, "T": 1, "L": 1},
    "temperature": {"TH": 1},
    "tempdiff": {"TH": 1},
    "amount": {"N": 1},
    "molarity": {"N": 1, "L": -3},
    "normality": {"N": 1, "L": -3},
    "molarmass": {"M": 1, "N": -1},
    "density": {"M": 1, "L": -3},
    "concentration": {"N": 1, "L": -3},
    "specheat": {"L": 2, "T": -2, "TH": -1},
    "latentheat": {"L": 2, "T": -2},
    "expansion": {"TH": -1},
    "cryoscopic": {"TH": 1, "M": 1, "N": -1},
    "entropy": {"M": 1, "L": 2, "T": -2, "TH": -1},
    "viscosity": {"M": 1, "L": -1, "T": -1},
    "flow": {"L": 3, "T": -1},
    "stiffness": {"M": 1, "T": -2},
    "surfacetension": {"M": 1, "T": -2},
    "lineardensity": {"M": 1, "L": -1},
    "intensity": {"M": 1, "T": -3},
    "dioptricpower": {"L": -1},
    "percentage": {},          # dimensionless
    "dimensionless": {},
    "money": {},               # dimensionless in physics terms
    "rate": {},                # per-time fractions (interest rates)
}

# Families whose dimension is not a physical invariant - never filter on them
WILDCARD_FAMILIES = {
    "constant", "dimensionless", "percentage", "money", "rate",
    "rateconstant", "other", "expansion", "rate", "flow",
}


def _norm(dim: Dict[str, int]) -> Dict[str, int]:
    return {k: v for k, v in dim.items() if v != 0}


def family_dim(family: str) -> Optional[Dict[str, int]]:
    """Dimension vector of a family; None for wildcards/unknowns."""
    if family in WILDCARD_FAMILIES:
        return None
    return FAMILY_DIMS.get(family)


def dims_compatible(quantity_family: str, var_family: str) -> bool:
    """Can this quantity fill this slot dimensionally?

    True when either side is a wildcard/unknown (physics has no
    opinion - the semantic layer decides) or the base dimensions
    are exactly equal.
    """
    qd = family_dim(quantity_family)
    vd = family_dim(var_family)
    if qd is None or vd is None:
        return True
    return _norm(qd) == _norm(vd)
