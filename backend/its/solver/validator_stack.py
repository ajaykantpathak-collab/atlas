"""validator_stack.py -- ARCHITECTURE.md section 5, as executable gates.

The validation order for any proposed reading of a question:

    1. VERBATIM AUDIT    every number must match a literal span of the
                         source text -- a parser cannot invent figures.
    2. WHITELIST         relation/operation types must be known.
    3. PLAUSIBILITY      dimension-aware sanity ranges.
    4. UNIQUENESS        exactly one surviving reading -> answer;
                         two -> SOCRATIC CONFIRM (one tap, VERIFIED);
                         zero or three-plus -> guided practice.

The CAS is innocent and blind: it computes the wrong model perfectly.
These gates check the MODEL against the QUESTION, never the arithmetic.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Dict, Iterable, List, Optional, Sequence, Tuple

# --------------------------------------------------------------------------- #
# 1. VERBATIM AUDIT
# --------------------------------------------------------------------------- #


@dataclass
class SpanValue:
    value: float
    span: str            # the literal text fragment the value came from


_NUM_TOKEN = r"-?\d+(?:,\d{2,3})*(?:\.\d+)?"


def audit_verbatim(values: Sequence[SpanValue],
                   source: str) -> Tuple[bool, List[str]]:
    """Every value's span must literally occur in the source text.

    Values whose span is missing from the source were INVENTED by a
    parser/LLM -- the reading dies.  Returns (ok, violations).
    """
    violations: List[str] = []
    for sv in values:
        span = (sv.span or "").strip()
        if not span:
            violations.append("empty span for value "
                              f"{sv.value!r}")
            continue
        if span not in source:
            # tolerate digit-group spacing differences ("1,50,000" vs
            # "150000") by comparing digit-only forms
            digits_span = re.sub(r"\D", "", span)
            if not digits_span or digits_span not in re.sub(r"\D", "",
                                                            source):
                violations.append(
                    f"span {span!r} for value {sv.value!r} not found "
                    f"verbatim in source")
    return (not violations), violations


# --------------------------------------------------------------------------- #
# 2. RELATION WHITELIST
# --------------------------------------------------------------------------- #

# Known relation/operation types.  Anything outside this set is flagged
# NEW and routed to promotion review (never silently computed).
RELATION_WHITELIST = {
    # arithmetic
    "sum", "difference", "product", "quotient", "power", "percent_of",
    # commerce
    "profit", "loss", "profit_percent_of_cost", "loss_percent_of_cost",
    "discount_on_marked", "simple_interest", "compound_interest",
    "gst_on_value",
    # motion / mechanics
    "speed_equals_distance_over_time", "distance_equals_speed_times_time",
    "work_force_distance", "kinetic_energy", "potential_energy",
    "power_energy_over_time", "ohms_law", "charge_current_time",
    # chemistry
    "molarity", "molality", "mole_fraction", "moles_from_mass",
    "moles_at_stp", "ph_of_h", "h_from_ph",
    # geometry / mensuration
    "area_rectangle", "area_triangle", "area_circle",
    "circumference_circle", "volume_cuboid", "volume_cylinder",
    "pythagoras", "angle_sum_linear_pair",
    # statistics / probability
    "mean", "probability_favorable_over_total",
}


def relation_whitelisted(relation_type: str) -> bool:
    return relation_type in RELATION_WHITELIST


# --------------------------------------------------------------------------- #
# 3. PLAUSIBILITY (dimension-aware ranges)
# --------------------------------------------------------------------------- #

# dimension -> (lo, hi).  A value outside its range flags the reading.
# Deliberately generous -- this gate catches PARSE SLIPS (a radius of
# 400, a probability of 45), not legitimate extreme problems.
PLAUSIBILITY: Dict[str, Tuple[float, float]] = {
    "probability": (0.0, 1.0),
    "percent": (0.0, 100.0),
    "length": (0.0, 1e9),
    "area": (0.0, 1e18),
    "volume": (0.0, 1e15),
    "speed": (0.0, 3e8),           # below light speed
    "mass": (0.0, 1e12),
    "time": (0.0, 1e12),
    "money": (0.0, 1e15),
    "angle": (-360.0, 360.0),
    "temperature": (-273.15, 1e6),  # below absolute zero is impossible
    "current": (0.0, 1e4),
    "charge": (-1e3, 1e3),
    "voltage": (-1e7, 1e7),
    "resistance": (0.0, 1e12),
    "concentration": (0.0, 100.0),
    "amount": (0.0, 1e6),
    "frequency": (0.0, 1e12),
    "force": (-1e9, 1e9),
    "energy": (0.0, 1e15),
    "pressure": (0.0, 1e12),
    "density": (0.0, 1e6),
}


def plausible(dim: str, value: float) -> bool:
    rng = PLAUSIBILITY.get(dim)
    if rng is None:
        return True   # unknown dimension: no opinion
    lo, hi = rng
    return lo <= value <= hi


# --------------------------------------------------------------------------- #
# 4. UNIQUENESS (readings -> answer | socratic | guided)
# --------------------------------------------------------------------------- #

@dataclass
class Reading:
    label: str                       # human name of this reading
    answer: str                      # computed answer under this reading
    numeric: Optional[float] = None
    meta: Dict = field(default_factory=dict)


def resolve_readings(readings: Sequence[Reading]) -> Tuple[str, object]:
    """The uniqueness gate.

    Returns ("answer", Reading)              exactly one reading survived
            ("socratic", List[Reading])      two readings: ask the student
                                             (one tap -> VERIFIED + free
                                             labeled training data)
            ("guided", reason str)           zero or three-plus readings
    """
    if len(readings) == 1:
        return "answer", readings[0]
    if len(readings) == 2:
        return "socratic", list(readings)
    return "guided", (f"{len(readings)} surviving readings"
                      if readings else "no surviving readings")


def socratic_payload(readings: Sequence[Reading]) -> Dict:
    """UI payload for a two-reading confirm: the question plus per-reading
    answers (shown only after the student taps; unverified until then)."""
    return {
        "type": "confirm_reading",
        "question": ("Two readings are possible -- which did the question "
                     "mean?"),
        "options": [
            {"label": r.label, "answer": r.answer, "meta": r.meta}
            for r in readings
        ],
    }


# --------------------------------------------------------------------------- #
# Convenience: run the full stack over one proposed reading
# --------------------------------------------------------------------------- #

def validate_reading(reading_label: str, relation_type: str,
                     spans: Sequence[SpanValue], source: str,
                     dim_values: Iterable[Tuple[str, float]]
                     ) -> Tuple[bool, List[str]]:
    """Run gates 1-3 over one reading.  Gate 4 (uniqueness) runs over the
    set of surviving readings via resolve_readings()."""
    problems: List[str] = []
    ok, violations = audit_verbatim(spans, source)
    if not ok:
        problems.extend(violations)
    if not relation_whitelisted(relation_type):
        problems.append(f"relation '{relation_type}' is not whitelisted")
    for dim, value in dim_values:
        if not plausible(dim, value):
            problems.append(f"value {value!r} implausible for "
                            f"dimension '{dim}'")
    return (not problems), problems
