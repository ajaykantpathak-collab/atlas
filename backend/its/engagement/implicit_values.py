"""implicit_values.py — Physics and chemistry idiom resolver.

Understands implicit values in word problems that regex cannot capture:
  - "starts from rest" -> u = 0
  - "comes to rest" / "stops" -> v = 0
  - "freely falling" / "free fall" -> a = g = 9.8, u = 0
  - "smooth surface" -> mu = 0 (no friction)
  - "light string" / "massless string" -> mass = 0
  - "reaches twice the initial velocity" -> v = 2u
  - "at the highest point" -> v = 0 (vertical throw)
  - "maximum height" -> v = 0
  - "just before hitting the ground" -> h = 0 (displacement = full height)

Each rule matches a phrase pattern and infers a variable assignment.
The resolver runs AFTER quantity extraction and BEFORE solving, filling
in the gaps that regex-based extraction misses.

This is Layer 2.2 of the Universal Solver (P2.2 in the build plan).
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple


# --------------------------------------------------------------------------- #
# Data structures
# ---------------------------------------------------------------------------

@dataclass
class ImplicitValue:
    """A value inferred from context (not explicitly stated)."""
    variable: str          # e.g. "u", "v", "a", "mu", "mass"
    value: float           # e.g. 0.0, 9.8, -1 (for "impossible")
    phrase: str            # the trigger phrase that matched
    confidence: float      # 0.0-1.0
    category: str          # "kinematics", "friction", "optics", etc.
    explanation: str       # why this value was inferred


@dataclass
class ExtractionResult:
    """Combined result: explicit quantities + implicit inferences."""
    explicit: Dict[str, float]           # from regex/quantulum3
    implicit: Dict[str, float]           # from this module
    explanations: List[str]              # human-readable inference reasons
    conflicts: List[str]                 # explicit vs implicit disagreements


# --------------------------------------------------------------------------- #
# Physics idiom rules
# ---------------------------------------------------------------------------

# Each rule: (compiled_regex, variable, value_or_fn, category, explanation)
# value_or_fn: float (fixed value) or callable(context: dict) -> float

def _neg(v: float) -> float:
    return -v


PHYSICS_IDIOMS: List[Tuple[str, str, Any, str, str]] = [
    # --- Kinematics: initial velocity ---
    (r"starts?\s+from\s+rest|beginning\s+from\s+rest|initially\s+at\s+rest|"
     r"released\s+from\s+rest|dropped\s+from\s+rest|starts?\s+from\s+zero\s+velocity",
     "u", 0.0, "kinematics",
     "Object starts from rest, so initial velocity u = 0"),

    # --- Position: starts at one end of a domain (ant-on-a-band family) ---
    (r"(?:starts?|begins?)(?:\s+\w+){0,3}?\s+(?:from|at)\s+(?:one|an)\s+end|"
     r"starts?\s+at\s+one\s+end",
     "s0", 0.0, "position",
     "Starts at one end of the domain, so initial position s0 = 0"),

    # --- Kinematics: final velocity ---
    (r"comes?\s+to\s+rest?|stops?\s+(?:completely|finally|eventually)|"
     r"comes?\s+to\s+a\s+stop|brought\s+to\s+rest|finally\s+at\s+rest|"
     r"until\s+it\s+stops?|till\s+it\s+stops?",
     "v", 0.0, "kinematics",
     "Object comes to rest, so final velocity v = 0"),

    # --- Kinematics: free fall ---
    (r"freely\s+fall(?:ing|s)?|free\s+fall|dropped?\s+from\s+a\s+height|"
     r"dropped?\s+from\s+rest|falling\s+under\s+gravity|"
     r"released?\s+and\s+falls?|dropped?\s+downward",
     "u", 0.0, "kinematics",
     "Free fall: initial velocity u = 0"),
    (r"freely\s+fall(?:ing|s)?|free\s+fall|falling\s+under\s+gravity|"
     r"under\s+gravity\s+alone",
     "a", 9.8, "kinematics",
     "Free fall: acceleration a = g = 9.8 m/s^2 downward"),

    # --- Kinematics: maximum height ---
    (r"(?:at|reaches?|attains?)\s+(?:the\s+)?maximum\s+height|"
     r"at\s+(?:the\s+)?highest\s+point|at\s+the\s+top\s+(?:of\s+the\s+)?(?:trajectory|path)",
     "v", 0.0, "kinematics",
     "At maximum height, vertical velocity v = 0"),

    # --- Kinematics: velocity relations ---
    (r"(?:reaches?|attains?|has|with)\s+(?:a\s+velocity\s+(?:of\s+)?)?(?:twice|2\s*(?:times|x))\s+the\s+initial\s+velocity",
     "v_fn_2u", None, "kinematics",
     "Final velocity v = 2 * initial velocity u"),
    (r"(?:reaches?|attains?|has)\s+(?:a\s+velocity\s+(?:of\s+)?)?(?:half|half\s+of)\s+the\s+initial\s+velocity",
     "v_fn_half_u", None, "kinematics",
     "Final velocity v = u / 2"),
    (r"velocity\s+(?:is\s+)?(?:reduced|decreased)\s+by\s+(?:half|50\s*%|50\s*percent)",
     "v_fn_half_u", None, "kinematics",
     "Velocity is halved: v = u / 2"),
    (r"doubles?\s+(?:its\s+)?(?:speed|velocity)|velocity\s+doubles?",
     "v_fn_2u", None, "kinematics",
     "Velocity doubles: v = 2 * u"),

    # --- Friction ---
    (r"smooth\s+(?:surface|plane|table|floor|incline|ground)|"
     r"frictionless\s+(?:surface|plane|table|floor|incline|ground|pulley)|"
     r"neglect(?:ing)?\s+friction|friction\s+is\s+negligible|"
     r"no\s+friction|without\s+friction",
     "mu", 0.0, "friction",
     "Smooth/frictionless surface: coefficient of friction mu = 0"),

    # --- Mass ---
    (r"light\s+(?:string|rope|cord|cable|wire)|massless\s+(?:string|rope|cord|cable|wire)|"
     r"weightless\s+(?:string|rope)",
     "string_mass", 0.0, "mechanics",
     "Light/massless string: string mass = 0"),
    (r"massless\s+(?:pulley|spring)|frictionless\s+pulley|"
     r"light\s+(?:pulley|spring)",
     "pulley_mass", 0.0, "mechanics",
     "Light/massless pulley: pulley mass = 0"),

    # --- Optics ---
    (r"object\s+at\s+infinity|rays?\s+(?:are\s+)?parallel|"
     r"parallel\s+(?:rays?|beam|light)",
     "object_distance", float("inf"), "optics",
     "Object at infinity: object distance = infinity"),

    # --- Circuits ---
    (r"ideal\s+(?:battery|cell|voltmeter|ammeter)|"
     r"(?:battery|cell)\s+has\s+(?:no|zero)\s+internal\s+resistance|"
     r"neglect(?:ing)?\s+internal\s+resistance",
     "internal_resistance", 0.0, "circuits",
     "Ideal battery/cell: internal resistance = 0"),

    # --- Thermodynamics ---
    (r"adiabatic\s+(?:process|expansion|compression)|"
     r"(?:expansion|compression)\s+is\s+adiabatic",
     "heat_exchange", 0.0, "thermodynamics",
     "Adiabatic process: no heat exchange, Q = 0"),
    (r"isothermal\s+(?:process|expansion|compression)",
     "temperature_change", 0.0, "thermodynamics",
     "Isothermal process: temperature is constant, dT = 0"),

    # --- Chemistry ---
    (r"(?:strong|completely\s+dissociat\w+)\s+(?:acid|base|electrolyte)",
     "dissociation", 1.0, "chemistry",
     "Strong acid/base: complete dissociation, alpha = 1"),
    (r"weak\s+(?:acid|base|electrolyte)",
     "dissociation_partial", 1.0, "chemistry",
     "Weak acid/base: partial dissociation (alpha < 1)"),

    # --- Elasticity ---
    (r"perfectly\s+(?:elastic|inelastic)\s+collision|"
     r"elastic\s+collision.*coefficient.*restitution.*=.*1|"
     r"coefficient\s+of\s+restitution\s+(?:is|=)\s+1",
     "restitution", 1.0, "collisions",
     "Perfectly elastic collision: e = 1"),
    (r"perfectly\s+inelastic\s+collision|"
     r"coefficient\s+of\s+restitution\s+(?:is|=)\s+0|"
     r"(?:bodies|objects)\s+(?:stick|move)\s+together\s+after",
     "restitution", 0.0, "collisions",
     "Perfectly inelastic collision: e = 0, bodies move together"),

    # --- Projectile ---
    (r"projected?\s+horizontally|thrown\s+horizontally|"
     r"horizontal\s+projection",
     "u_vertical", 0.0, "projectile",
     "Horizontal projection: initial vertical velocity = 0"),
    (r"projected?\s+vertically\s+upward|thrown\s+vertically\s+(?:upward|up)|"
     r"thrown\s+straight\s+up",
     "angle", 90.0, "projectile",
     "Vertical projection: angle with horizontal = 90 degrees"),
]


# --------------------------------------------------------------------------- #
# Resolver
# ---------------------------------------------------------------------------

class ImplicitValueResolver:
    """Infers implicit values from context phrases in word problems.

    Usage::

        resolver = ImplicitValueResolver()
        result = resolver.resolve("A ball starts from rest and rolls down "
                                   "a smooth incline for 5 seconds.")
        print(result.implicit)  # {"u": 0.0, "mu": 0.0}
        print(result.explanations)  # ["Object starts from rest...", ...]
    """

    def __init__(self) -> None:
        self._compiled = [(re.compile(pattern, re.IGNORECASE), var, val, cat, expl)
                          for pattern, var, val, cat, expl in PHYSICS_IDIOMS]

    def resolve(self, text: str,
                explicit: Optional[Dict[str, float]] = None) -> ExtractionResult:
        """Run all idiom rules against the text and infer implicit values.

        Args:
            text: The full problem text (or a paragraph from it).
            explicit: Already-extracted explicit quantities (for conflict detection).

        Returns:
            ExtractionResult with implicit values, explanations, and any
            conflicts between explicit and inferred values.
        """
        text = text or ""
        explicit = explicit or {}
        implicit: Dict[str, float] = {}
        explanations: List[str] = []
        matched_phrases: set = set()

        for regex, var, val, cat, expl in self._compiled:
            match = regex.search(text)
            if not match:
                continue
            phrase = match.group(0).strip()

            # Handle velocity relations (v = 2u, v = u/2)
            if var.startswith("v_fn_"):
                if var == "v_fn_2u":
                    implicit["_v_relation"] = 2.0
                elif var == "v_fn_half_u":
                    implicit["_v_relation"] = 0.5
                explanations.append(expl)
                matched_phrases.add(phrase)
                continue

            # Skip if explicitly stated (conflict = explicit wins, but note it)
            if var in explicit:
                if abs(explicit[var] - val) > 0.01:
                    explanations.append(
                        f"[CONFLICT] Explicit {var}={explicit[var]} but "
                        f'"{phrase}" implies {var}={val}. Using explicit value.'
                    )
                continue

            if var not in implicit:
                implicit[var] = float(val)
                explanations.append(expl)
                matched_phrases.add(phrase)

        # Detect conflicts with explicit values
        conflicts = [e for e in explanations if e.startswith("[CONFLICT]")]
        clean_explanations = [e for e in explanations if not e.startswith("[CONFLICT]")]

        return ExtractionResult(
            explicit=explicit,
            implicit=implicit,
            explanations=clean_explanations,
            conflicts=conflicts,
        )


# --------------------------------------------------------------------------- #
# Singleton for reuse
# ---------------------------------------------------------------------------

_resolver: Optional[ImplicitValueResolver] = None


def get_resolver() -> ImplicitValueResolver:
    """Get or create the global resolver instance."""
    global _resolver
    if _resolver is None:
        _resolver = ImplicitValueResolver()
    return _resolver
