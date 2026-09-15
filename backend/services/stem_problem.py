"""
stem_problem.py
Canonical intermediate representation for ANY STEM problem.

This is the single contract that flows through the entire universal solver chain:
  parse -> select -> plan -> compute -> verify -> explain

No more dict-vs-dataclass mismatches. Every component reads/writes this IR.

Author: Platform Backend Team
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field, asdict
from typing import Any, Optional


# ──────────────────────────────────────────────────────────────────────────────
# Core data structures
# ──────────────────────────────────────────────────────────────────────────────

@dataclass
class Quantity:
    """
    One physical/mathematical quantity in a problem.

    Examples:
        Quantity(symbol="m", name="mass", value=2.0, unit="kg")
        Quantity(symbol="theta", name="angle", value=30.0, unit="deg")
        Quantity(symbol="x", name="variable", value=None, unit=None)  # unknown
    """
    symbol: str                       # canonical symbol, e.g. "m", "theta", "v"
    name: str                         # human name, e.g. "mass", "angle"
    value: Optional[float] = None     # numeric value, None if unknown
    unit: Optional[str] = None        # SI or common unit, e.g. "kg", "m/s", "deg"
    uncertainty: Optional[float] = None  # measurement uncertainty if given
    is_implicit: bool = False         # True if resolved from implicit rules, not from text

    @property
    def is_known(self) -> bool:
        return self.value is not None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class Target:
    """What the problem asks us to find."""
    symbol: str                       # e.g. "a", "v", "KE"
    name: str                         # e.g. "acceleration", "velocity"
    unit: Optional[str] = None        # expected unit if known
    quantity_type: str = "scalar"     # scalar | vector | expression | boolean

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class Constraint:
    """
    An equation or relation that must hold.

    Examples:
        Constraint(expression="F - m*g*sin(theta) + mu*m*g*cos(theta) = 0", kind="equation")
        Constraint(expression="v > 0", kind="inequality")
        Constraint(expression="energy conserved", kind="physical_law")
    """
    expression: str                   # symbolic expression or text
    kind: str = "equation"            # equation | inequality | physical_law | definition
    source: str = ""                  # where this constraint came from (parsed | inferred | given)

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class SolutionStep:
    """
    One step in the solution plan / walkthrough.

    This is the universal step type — replaces the multiple incompatible
    step formats in symbolic_solver, decomposition_engine, and core_calculus_engine.
    """
    step_number: int
    title: str                        # e.g. "Apply Newton's second law"
    rule: str = ""                    # e.g. "F = ma"
    formula_id: Optional[str] = None  # reference to FormulaKB entry if applicable
    expression_before: str = ""       # state before this step
    expression_after: str = ""        # state after this step
    computation: str = ""             # what was computed
    result: Optional[str] = None      # result of this step
    explanation: str = ""             # pedagogical explanation
    backend_used: str = ""            # which compute backend solved this

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass
class STEMProblem:
    """
    Canonical representation of any STEM problem.

    This is what the parser produces and what every downstream component consumes.
    Replaces ParsedProblem (which had inconsistent field names) and the ad-hoc
    dicts passed between decomposition_engine and symbolic_solver.
    """
    # ── Identity ──
    problem_id: str = ""              # hash of raw text
    raw_text: str = ""                # original problem statement

    # ── Classification ──
    domain: str = ""                  # physics | chemistry | mathematics | biology
    subject: str = ""                 # finer: mechanics, organic_chemistry, calculus, etc.
    exam_level: str = ""              # k12 | jee | neet | olympiad
    class_level: Optional[int] = None # 1-12
    board: Optional[str] = None       # CBSE | CISCE
    difficulty: str = "medium"        # easy | medium | hard

    # ── Problem content ──
    quantities: list[Quantity] = field(default_factory=list)  # known + unknown quantities
    target: Optional[Target] = None   # what to find
    constraints: list[Constraint] = field(default_factory=list)  # equations, laws, relations
    concept_tags: list[str] = field(default_factory=list)  # e.g. ["kinematics", "incline"]

    # ── Solution state (filled by the solver) ──
    steps: list[SolutionStep] = field(default_factory=list)
    final_answer: Optional[str] = None
    confidence: float = 0.0
    solved: bool = False
    backend_used: str = ""
    solve_time_ms: float = 0.0
    error: str = ""

    # ── Metadata ──
    metadata: dict[str, Any] = field(default_factory=dict)

    # ── Convenience accessors ──

    @property
    def known_quantities(self) -> dict[str, float]:
        """Map of symbol -> value for all known quantities."""
        return {q.symbol: q.value for q in self.quantities if q.is_known}

    @property
    def unknown_symbols(self) -> list[str]:
        """Symbols of unknown quantities."""
        return [q.symbol for q in self.quantities if not q.is_known]

    @property
    def quantity_by_symbol(self) -> dict[str, Quantity]:
        return {q.symbol: q for q in self.quantities}

    @property
    def quantity_by_name(self) -> dict[str, Quantity]:
        return {q.name.lower(): q for q in self.quantities}

    def get_quantity(self, key: str) -> Optional[Quantity]:
        """Look up a quantity by symbol or name (case-insensitive)."""
        for q in self.quantities:
            if q.symbol == key or q.name.lower() == key.lower():
                return q
        return None

    def add_quantity(self, quantity: Quantity) -> None:
        """Add a quantity, replacing any existing one with the same symbol."""
        self.quantities = [q for q in self.quantities if q.symbol != quantity.symbol]
        self.quantities.append(quantity)

    def add_constraint(self, expression: str, kind: str = "equation", source: str = "") -> None:
        self.constraints.append(Constraint(expression=expression, kind=kind, source=source))

    def add_step(self, step: SolutionStep) -> None:
        step.step_number = len(self.steps) + 1
        self.steps.append(step)

    # ── Serialization ──

    def to_dict(self) -> dict[str, Any]:
        d = asdict(self)
        return d

    def to_json(self, **kwargs: Any) -> str:
        import json
        return json.dumps(self.to_dict(), default=str, **kwargs)

    # ── Construction helpers ──

    @classmethod
    def from_parsed(cls, parsed: Any, raw_text: str = "") -> "STEMProblem":
        """
        Adapt an existing ParsedProblem (from problem_parser.py) or dict
        into a STEMProblem. Handles both dataclass and dict inputs.

        This is the bridge from the old parser to the new IR.
        """
        if hasattr(parsed, "to_dict"):
            d = parsed.to_dict()
        elif isinstance(parsed, dict):
            d = parsed
        else:
            d = dict(parsed)

        problem = cls(raw_text=raw_text or d.get("raw_text", ""))

        # Map givens -> quantities
        for g in d.get("givens", []):
            if isinstance(g, dict):
                problem.quantities.append(Quantity(
                    symbol=g.get("symbol", g.get("name", "")),
                    name=g.get("name", g.get("symbol", "")),
                    value=_to_float(g.get("value")),
                    unit=g.get("unit"),
                ))
            elif isinstance(g, (list, tuple)) and len(g) >= 2:
                problem.quantities.append(Quantity(
                    symbol=str(g[0]),
                    name=str(g[0]),
                    value=_to_float(g[1]) if len(g) > 1 else None,
                    unit=str(g[2]) if len(g) > 2 else None,
                ))

        # Map unknowns -> quantities (with value=None) + target
        unknowns = d.get("unknowns", [])
        if unknowns:
            first_unknown = unknowns[0]
            if isinstance(first_unknown, dict):
                problem.target = Target(
                    symbol=first_unknown.get("symbol", first_unknown.get("name", "x")),
                    name=first_unknown.get("name", first_unknown.get("symbol", "unknown")),
                    unit=first_unknown.get("unit"),
                )
            for u in unknowns:
                if isinstance(u, dict):
                    problem.quantities.append(Quantity(
                        symbol=u.get("symbol", u.get("name", "")),
                        name=u.get("name", u.get("symbol", "")),
                        value=None,
                        unit=u.get("unit"),
                    ))

        # Map concepts
        problem.concept_tags = d.get("concepts", [])

        # Map constraints
        for c in d.get("constraints", []):
            if isinstance(c, str):
                problem.add_constraint(c, kind="equation", source="parsed")
            elif isinstance(c, dict):
                problem.add_constraint(
                    c.get("expression", c.get("text", "")),
                    kind=c.get("kind", "equation"),
                    source="parsed",
                )

        # Classification
        problem.subject = d.get("subject", "") or ""
        problem.domain = _infer_domain(problem.subject, problem.concept_tags)
        problem.difficulty = d.get("difficulty", "medium")
        problem.exam_level = d.get("exam_type", "") or ""

        # ID
        import hashlib
        problem.problem_id = hashlib.md5(
            problem.raw_text.strip().encode()
        ).hexdigest()[:12]

        return problem


# ──────────────────────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────────────────────

def _to_float(v: Any) -> Optional[float]:
    if v is None:
        return None
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


# Domain inference from subject/concept tags
_DOMAIN_MAP: dict[str, str] = {
    # physics subjects
    "physics": "physics", "mechanics": "physics", "kinematics": "physics",
    "electromagnetism": "physics", "optics": "physics", "thermodynamics": "physics",
    "modern_physics": "physics", "waves": "physics", "shm": "physics",
    "gravitation": "physics", "rotation": "physics", "fluid_mechanics": "physics",
    # chemistry subjects
    "chemistry": "chemistry", "physical_chemistry": "chemistry",
    "organic_chemistry": "chemistry", "inorganic_chemistry": "chemistry",
    "electrochemistry": "chemistry", "chemical_kinetics": "chemistry",
    "chemical_equilibrium": "chemistry", "biochemistry": "chemistry",
    # math subjects
    "mathematics": "mathematics", "math": "mathematics", "calculus": "mathematics",
    "algebra": "mathematics", "geometry": "mathematics", "trigonometry": "mathematics",
    "probability": "mathematics", "statistics": "mathematics",
    "differential_equations": "mathematics", "linear_algebra": "mathematics",
    "complex_numbers": "mathematics", "coordinate_geometry": "mathematics",
    "number_theory": "mathematics", "combinatorics": "mathematics",
    # biology subjects
    "biology": "biology", "botany": "biology", "zoology": "biology",
    "genetics": "biology", "ecology": "biology", "physiology": "biology",
    "anatomy": "biology", "cell_biology": "biology", "evolution": "biology",
}


def _infer_domain(subject: str, concepts: list[str]) -> str:
    """Infer the STEM domain from subject and concept tags."""
    # Check subject first
    subj_lower = (subject or "").lower().strip()
    if subj_lower in _DOMAIN_MAP:
        return _DOMAIN_MAP[subj_lower]

    # Check concept tags
    for c in concepts:
        c_lower = c.lower().strip()
        if c_lower in _DOMAIN_MAP:
            return _DOMAIN_MAP[c_lower]

    # Keyword fallback
    text = (subject + " " + " ".join(concepts)).lower()
    if any(k in text for k in ["force", "velocity", "energy", "momentum", "circuit",
                                "lens", "wave", "field", "charge", "current"]):
        return "physics"
    if any(k in text for k in ["mole", "reaction", "equilibrium", "acid", "base",
                                "organic", "bond", "ph ", "buffer", "nernst"]):
        return "chemistry"
    if any(k in text for k in ["integral", "derivative", "matrix", "equation",
                                "theorem", "polynomial", "limit", "probability"]):
        return "mathematics"
    if any(k in text for k in ["cell", "organ", "tissue", "gene", "ecosystem",
                                "photosynthesis", "respiration"]):
        return "biology"

    return "unknown"


# ──────────────────────────────────────────────────────────────────────────────
# Unit conversion helpers (used by dimensional analysis selector)
# ──────────────────────────────────────────────────────────────────────────────

# Base SI dimensions: M (mass), L (length), T (time), I (current),
# Θ (temperature), N (amount), J (luminous intensity)
UNIT_DIMENSIONS: dict[str, tuple[int, int, int, int, int, int, int]] = {
    # Mass
    "kg": (1, 0, 0, 0, 0, 0, 0), "g": (1, 0, 0, 0, 0, 0, 0),
    "mg": (1, 0, 0, 0, 0, 0, 0), "ton": (1, 0, 0, 0, 0, 0, 0),
    # Length
    "m": (0, 1, 0, 0, 0, 0, 0), "cm": (0, 1, 0, 0, 0, 0, 0),
    "mm": (0, 1, 0, 0, 0, 0, 0), "km": (0, 1, 0, 0, 0, 0, 0),
    "ft": (0, 1, 0, 0, 0, 0, 0), "in": (0, 1, 0, 0, 0, 0, 0),
    # Time
    "s": (0, 0, 1, 0, 0, 0, 0), "sec": (0, 0, 1, 0, 0, 0, 0),
    "min": (0, 0, 1, 0, 0, 0, 0), "hr": (0, 0, 1, 0, 0, 0, 0),
    "h": (0, 0, 1, 0, 0, 0, 0), "year": (0, 0, 1, 0, 0, 0, 0),
    # Velocity
    "m/s": (0, 1, -1, 0, 0, 0, 0), "km/h": (0, 1, -1, 0, 0, 0, 0),
    "km/hr": (0, 1, -1, 0, 0, 0, 0), "ft/s": (0, 1, -1, 0, 0, 0, 0),
    # Acceleration
    "m/s^2": (0, 1, -2, 0, 0, 0, 0), "m/s²": (0, 1, -2, 0, 0, 0, 0),
    # Force
    "N": (1, 1, -2, 0, 0, 0, 0), "dyne": (1, 1, -2, 0, 0, 0, 0),
    "kgf": (1, 1, -2, 0, 0, 0, 0),
    # Energy
    "J": (1, 2, -2, 0, 0, 0, 0), "kJ": (1, 2, -2, 0, 0, 0, 0),
    "cal": (1, 2, -2, 0, 0, 0, 0), "kcal": (1, 2, -2, 0, 0, 0, 0),
    "eV": (1, 2, -2, 0, 0, 0, 0), "erg": (1, 2, -2, 0, 0, 0, 0),
    # Power
    "W": (1, 2, -3, 0, 0, 0, 0), "kW": (1, 2, -3, 0, 0, 0, 0),
    "hp": (1, 2, -3, 0, 0, 0, 0),
    # Pressure
    "Pa": (1, -1, -2, 0, 0, 0, 0), "kPa": (1, -1, -2, 0, 0, 0, 0),
    "atm": (1, -1, -2, 0, 0, 0, 0), "bar": (1, -1, -2, 0, 0, 0, 0),
    "mmHg": (1, -1, -2, 0, 0, 0, 0),
    # Current
    "A": (0, 0, 0, 1, 0, 0, 0), "mA": (0, 0, 0, 1, 0, 0, 0),
    # Voltage
    "V": (1, 2, -3, -1, 0, 0, 0), "mV": (1, 2, -3, -1, 0, 0, 0),
    # Resistance
    "ohm": (1, 2, -3, -2, 0, 0, 0), "Ω": (1, 2, -3, -2, 0, 0, 0),
    # Charge
    "C": (0, 0, 1, 1, 0, 0, 0), "mC": (0, 0, 1, 1, 0, 0, 0),
    # Temperature
    "K": (0, 0, 0, 0, 1, 0, 0), "deg_C": (0, 0, 0, 0, 1, 0, 0),
    "Celsius": (0, 0, 0, 0, 1, 0, 0), "deg_F": (0, 0, 0, 0, 1, 0, 0),
    # Amount
    "mol": (0, 0, 0, 0, 0, 1, 0), "mmol": (0, 0, 0, 0, 0, 1, 0),
    # Angle (dimensionless)
    "deg": (0, 0, 0, 0, 0, 0, 0), "rad": (0, 0, 0, 0, 0, 0, 0),
    "°": (0, 0, 0, 0, 0, 0, 0),
    # Dimensionless
    "": (0, 0, 0, 0, 0, 0, 0), "dimensionless": (0, 0, 0, 0, 0, 0, 0),
    # Area
    "m^2": (0, 2, 0, 0, 0, 0, 0), "cm^2": (0, 2, 0, 0, 0, 0, 0),
    # Volume
    "m^3": (0, 3, 0, 0, 0, 0, 0), "L": (0, 3, 0, 0, 0, 0, 0),
    "l": (0, 3, 0, 0, 0, 0, 0), "mL": (0, 3, 0, 0, 0, 0, 0),
    "ml": (0, 3, 0, 0, 0, 0, 0),
    # Frequency
    "Hz": (0, 0, -1, 0, 0, 0, 0), "kHz": (0, 0, -1, 0, 0, 0, 0),
    # Density
    "kg/m^3": (1, -3, 0, 0, 0, 0, 0), "g/cm^3": (1, -3, 0, 0, 0, 0, 0),
    # Magnetic field
    "T": (1, 0, -2, -1, 0, 0, 0), "mT": (1, 0, -2, -1, 0, 0, 0),
    "G": (1, 0, -2, -1, 0, 0, 0),
    # Concentration
    "M": (0, -3, 0, 0, 0, 1, 0),  # molarity mol/L
    "mol/L": (0, -3, 0, 0, 0, 1, 0),
    # Momentum
    "kg*m/s": (1, 1, -1, 0, 0, 0, 0), "kg·m/s": (1, 1, -1, 0, 0, 0, 0),
    # Capacitance
    "F": (-1, -2, 4, 2, 0, 0, 0),
    # Inductance
    "H": (1, 2, -2, -2, 0, 0, 0),
}


def get_unit_dimension(unit: Optional[str]) -> Optional[tuple[int, ...]]:
    """Get the SI dimension tuple for a unit string. Returns None if unknown."""
    if not unit:
        return (0, 0, 0, 0, 0, 0, 0)  # dimensionless
    unit = unit.strip()
    if unit in UNIT_DIMENSIONS:
        return UNIT_DIMENSIONS[unit]
    # Try common normalizations
    unit_lower = unit.lower()
    if unit_lower in UNIT_DIMENSIONS:
        return UNIT_DIMENSIONS[unit_lower]
    return None  # unknown unit


def dimensions_match(unit1: Optional[str], unit2: Optional[str]) -> bool:
    """Check if two units have the same SI dimensions."""
    d1 = get_unit_dimension(unit1)
    d2 = get_unit_dimension(unit2)
    if d1 is None or d2 is None:
        return False
    return d1 == d2


# ──────────────────────────────────────────────────────────────────────────────
# Unit conversion factors (to SI)
# ──────────────────────────────────────────────────────────────────────────────

UNIT_TO_SI: dict[str, tuple[float, str]] = {
    # (multiplier, SI unit)
    "g": (0.001, "kg"), "mg": (1e-6, "kg"), "ton": (1000, "kg"),
    "cm": (0.01, "m"), "mm": (0.001, "m"), "km": (1000, "m"),
    "ft": (0.3048, "m"), "in": (0.0254, "m"),
    "min": (60, "s"), "hr": (3600, "s"), "h": (3600, "s"),
    "year": (3.156e7, "s"),
    "km/h": (1000/3600, "m/s"), "km/hr": (1000/3600, "m/s"),
    "ft/s": (0.3048, "m/s"),
    "dyne": (1e-5, "N"), "kgf": (9.80665, "N"),
    "kJ": (1000, "J"), "cal": (4.184, "J"), "kcal": (4184, "J"),
    "eV": (1.602e-19, "J"), "erg": (1e-7, "J"),
    "kW": (1000, "W"), "hp": (745.7, "W"),
    "kPa": (1000, "Pa"), "atm": (101325, "Pa"), "bar": (1e5, "Pa"),
    "mmHg": (133.322, "Pa"),
    "mA": (0.001, "A"), "mV": (0.001, "V"),
    "mmol": (0.001, "mol"),
    "deg": (0.017453292519943295, "rad"),  # pi/180
    "°": (0.017453292519943295, "rad"),
    "cm^2": (1e-4, "m^2"),
    "L": (0.001, "m^3"), "l": (0.001, "m^3"),
    "mL": (1e-6, "m^3"), "ml": (1e-6, "m^3"),
    "kHz": (1000, "Hz"),
    "g/cm^3": (1000, "kg/m^3"),
    "mT": (0.001, "T"), "G": (1e-4, "T"),
    "deg_C": (1.0, "K"),  # offset handled separately
}


def convert_to_si(value: float, unit: Optional[str]) -> tuple[float, Optional[str]]:
    """
    Convert a value+unit to SI units.

    Returns (si_value, si_unit). If unit is unknown, returns value as-is.
    Temperature offsets (Celsius) are handled specially.
    """
    if not unit or not value:
        return value, unit

    unit = unit.strip()

    # Temperature special cases
    if unit in ("deg_C", "Celsius", "°C"):
        return value + 273.15, "K"
    if unit in ("deg_F", "°F"):
        return (value - 32) * 5/9 + 273.15, "K"

    if unit in UNIT_TO_SI:
        multiplier, si_unit = UNIT_TO_SI[unit]
        return value * multiplier, si_unit

    return value, unit  # already SI or unknown


__all__ = [
    "Quantity",
    "Target",
    "Constraint",
    "SolutionStep",
    "STEMProblem",
    "get_unit_dimension",
    "dimensions_match",
    "convert_to_si",
    "UNIT_DIMENSIONS",
    "UNIT_TO_SI",
]
