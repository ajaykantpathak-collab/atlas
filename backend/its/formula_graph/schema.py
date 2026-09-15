"""schema.py — Typed schema for the formula knowledge graph.

Every formula declares:
1. Its DOMAIN (mechanics, thermodynamics, electricity, etc.)
2. Every variable with FULL semantic meaning (not just a symbol)
3. Its prerequisite chain (what must be learned first)
4. Its class level and subject mapping

The Symbol Disambiguation Table maps each symbol to its possible meanings
per domain, so "v" resolves to "velocity" in mechanics but "volume" in
thermodynamics. This is what makes the graph context-aware.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional


# ---------------------------------------------------------------------------
# Domains — each domain gives symbols their context-specific meaning
# ---------------------------------------------------------------------------

class Domain(str, Enum):
    MECHANICS = "mechanics"
    THERMODYNAMICS = "thermodynamics"
    ELECTRICITY = "electricity"
    ELECTROSTATICS = "electrostatics"
    MAGNETISM = "magnetism"
    OPTICS = "optics"
    MODERN_PHYSICS = "modern_physics"
    WAVES = "waves"
    CHEMISTRY = "chemistry"
    MATHEMATICS = "mathematics"
    BIOLOGY = "biology"
    GENERAL = "general"


# ---------------------------------------------------------------------------
# Symbol disambiguation table
# Maps: symbol -> {domain: full_definition}
# This is the KEY to context-aware formula solving.
# ---------------------------------------------------------------------------

SYMBOL_DISAMBIGUATION: Dict[str, Dict[str, Dict[str, str]]] = {
    "v": {
        "mechanics": {"name": "velocity", "unit": "m/s", "dimension": "LT^-1"},
        "thermodynamics": {"name": "volume", "unit": "m^3", "dimension": "L^3"},
        "electricity": {"name": "voltage", "unit": "V", "dimension": "ML^2T^-3I^-1"},
        "optics": {"name": "image_distance", "unit": "cm", "dimension": "L"},
    },
    "u": {
        "mechanics": {"name": "initial_velocity", "unit": "m/s", "dimension": "LT^-1"},
        "optics": {"name": "object_distance", "unit": "cm", "dimension": "L"},
        "thermodynamics": {"name": "internal_energy", "unit": "J", "dimension": "ML^2T^-2"},
    },
    "a": {
        "mechanics": {"name": "acceleration", "unit": "m/s^2", "dimension": "LT^-2"},
        "thermodynamics": {"name": "area", "unit": "m^2", "dimension": "L^2"},
        "chemistry": {"name": "activity", "unit": "", "dimension": ""},
    },
    "T": {
        "thermodynamics": {"name": "temperature", "unit": "K", "dimension": "Θ"},
        "mechanics": {"name": "time_period", "unit": "s", "dimension": "T"},
        "mechanics_tension": {"name": "tension", "unit": "N", "dimension": "MLT^-2"},
    },
    "P": {
        "thermodynamics": {"name": "pressure", "unit": "Pa", "dimension": "ML^-1T^-2"},
        "electricity": {"name": "power", "unit": "W", "dimension": "ML^2T^-3"},
        "mechanics": {"name": "momentum", "unit": "kg m/s", "dimension": "MLT^-1"},
    },
    "F": {
        "mechanics": {"name": "force", "unit": "N", "dimension": "MLT^-2"},
        "optics": {"name": "focal_length", "unit": "cm", "dimension": "L"},
    },
    "E": {
        "electrostatics": {"name": "electric_field", "unit": "N/C", "dimension": "MLT^-3I^-1"},
        "modern_physics": {"name": "energy", "unit": "J", "dimension": "ML^2T^-2"},
        "electrochemistry": {"name": "cell_potential", "unit": "V", "dimension": "ML^2T^-3I^-1"},
    },
    "m": {
        "mechanics": {"name": "mass", "unit": "kg", "dimension": "M"},
        "optics": {"name": "magnification", "unit": "", "dimension": ""},
    },
    "Q": {
        "electrostatics": {"name": "charge", "unit": "C", "dimension": "IT"},
        "thermodynamics": {"name": "heat", "unit": "J", "dimension": "ML^2T^-2"},
        "chemistry": {"name": "reaction_quotient", "unit": "", "dimension": ""},
    },
    "R": {
        "electricity": {"name": "resistance", "unit": "ohm", "dimension": "ML^2T^-3I^-2"},
        "thermodynamics": {"name": "gas_constant", "unit": "J/(mol K)", "dimension": ""},
    },
    "s": {
        "mechanics": {"name": "displacement", "unit": "m", "dimension": "L"},
        "chemistry": {"name": "solubility", "unit": "mol/L", "dimension": "L^-3"},
    },
    "L": {
        "rotational": {"name": "angular_momentum", "unit": "kg m^2/s", "dimension": "ML^2T^-1"},
        "electricity": {"name": "inductance", "unit": "H", "dimension": "ML^2T^-2I^-2"},
        "optics": {"name": "length", "unit": "m", "dimension": "L"},
    },
    "I": {
        "electricity": {"name": "current", "unit": "A", "dimension": "I"},
        "rotational": {"name": "moment_of_inertia", "unit": "kg m^2", "dimension": "ML^2"},
    },
    "f": {
        "optics": {"name": "focal_length", "unit": "cm", "dimension": "L"},
        "waves": {"name": "frequency", "unit": "Hz", "dimension": "T^-1"},
        "mechanics_friction": {"name": "friction_force", "unit": "N", "dimension": "MLT^-2"},
    },
    "g": {
        "mechanics": {"name": "gravity", "unit": "m/s^2", "dimension": "LT^-2"},
        "chemistry": {"name": "grams", "unit": "g", "dimension": "M"},
    },
    "n": {
        "chemistry": {"name": "moles", "unit": "mol", "dimension": ""},
        "optics": {"name": "refractive_index", "unit": "", "dimension": ""},
    },
    "W": {
        "work_energy": {"name": "work", "unit": "J", "dimension": "ML^2T^-2"},
        "mechanics": {"name": "weight", "unit": "N", "dimension": "MLT^-2"},
    },
}


# ---------------------------------------------------------------------------
# Typed data structures
# ---------------------------------------------------------------------------

@dataclass
class VariableDef:
    """A variable with FULL semantic meaning in a specific domain."""
    symbol: str
    name: str
    unit: str
    dimension: str
    domain: str  # which domain gives this symbol its meaning here

    def to_dict(self) -> Dict[str, str]:
        return {"symbol": self.symbol, "name": self.name,
                "unit": self.unit, "dimension": self.dimension, "domain": self.domain}


@dataclass
class ContextualFormula:
    """A formula with full context: domain, variables, prerequisites."""

    formula_id: str
    name: str
    latex: str
    domain: Domain
    sub_domain: str                 # e.g. "kinematics", "current_electricity"

    # Variables with FULL semantic meaning (not just symbols)
    variables: Dict[str, VariableDef]

    # Prerequisite chain (Class 6 -> 12 learning order)
    requires: List[str] = field(default_factory=list)   # formula_ids needed first
    enables: List[str] = field(default_factory=list)    # formula_ids this unlocks

    # Curriculum mapping
    class_levels: List[int] = field(default_factory=list)
    chapter: str = ""
    concept_tags: List[str] = field(default_factory=list)

    # Source tracking
    source_exam: str = ""           # CBSE | JEE Main | JEE Advanced | NEET | CA
    source_file: str = ""

    # Execution
    solve_fn: Optional[str] = None  # name of the Python function that solves this
    latex_render: str = ""          # pretty-printed version for display

    def to_dict(self) -> Dict[str, Any]:
        return {
            "formula_id": self.formula_id,
            "name": self.name,
            "latex": self.latex,
            "domain": self.domain.value,
            "sub_domain": self.sub_domain,
            "variables": {k: v.to_dict() for k, v in self.variables.items()},
            "requires": self.requires,
            "enables": self.enables,
            "class_levels": self.class_levels,
            "chapter": self.chapter,
            "concept_tags": self.concept_tags,
            "source_exam": self.source_exam,
        }


@dataclass
class FormulaNode:
    """A node in the formula prerequisite graph."""
    formula_id: str
    name: str
    domain: str
    class_level: int          # minimum class where this appears
    prerequisites: List[str]  # formula_ids that must come before this
    formula_ref: Optional[ContextualFormula] = None
