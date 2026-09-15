"""
concept_target_extractor.py — Layer 2 (B4): Concept tagging + target identification.

Deterministic. No LLM. Keyword + pattern matching against curriculum taxonomy.

What it does:
  - Tags the problem with subject/chapter/concepts (e.g. PHY_KIN, CHM_EQM)
  - Identifies what the problem is asking for (target)
  - Classifies difficulty (class6 → jee_advanced)

Author: Platform Backend Team
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Optional

from .stem_problem import Target


# ──────────────────────────────────────────────────────────────────────────────
# Concept taxonomy — maps keywords to concept tags
# ──────────────────────────────────────────────────────────────────────────────

CONCEPT_TAXONOMY = {
    # Physics
    "PHY_KIN": ["motion", "velocity", "acceleration", "displacement", "kinematics",
                "speed", "distance", "equation of motion", "projectile",
                "free fall", "thrown", "dropped"],
    "PHY_NLM": ["force", "newton", "friction", "tension", "normal force",
                "incline", "incline plane", "wedge", "pulley", "block",
                "equilibrium", "balanced", "net force"],
    "PHY_WORK": ["work", "energy", "power", "work-energy", "kinetic energy",
                 "potential energy", "conservation of energy", "joule"],
    "PHY_ROT": ["rotation", "torque", "moment of inertia", "angular",
                "rotational", "rolling", "spin", "angular momentum"],
    "PHY_GRAV": ["gravitation", "gravity", "orbit", "satellite", "kepler",
                 "escape velocity", "gravitational field", "g"],
    "PHY_OSC": ["oscillation", "simple harmonic", "SHM", "pendulum", "spring",
                "wave", "frequency", "amplitude", "period", "vibration"],
    "PHY_ELC": ["current", "voltage", "resistance", "ohm", "circuit",
                "kirchhoff", "battery", "capacitor", "resistor", "electric"],
    "PHY_EMI": ["magnetic", "magnetic field", "electromagnetic", "induction",
                "flux", "lenz", "faraday", "inductor", "emf"],
    "PHY_OPT": ["light", "mirror", "lens", "refraction", "reflection",
                "optics", "prism", "snell", "focal length", "image",
                "total internal reflection"],
    "PHY_THM": ["heat", "temperature", "thermodynamics", "entropy", "enthalpy",
                "carnot", "isothermal", "adiabatic", "gas", "calorimeter"],
    "PHY_MOD": ["photoelectric", "photon", "de broglie", "bohr", "atom",
                "nuclear", "radioactivity", "quantum", "x-ray"],
    "PHY_FLUID": ["fluid", "pressure", "buoyancy", "archimedes", "bernoulli",
                  "viscosity", "surface tension", "flow", "pascal"],

    # Chemistry
    "CHM_STOICH": ["mole", "molar", "stoichiometry", "balanced equation",
                   "reactant", "product", "yield", "limiting reagent"],
    "CHM_ATM": ["atomic structure", "bohr model", "quantum number",
                "orbital", "electron configuration", "atomic number"],
    "CHM_BOND": ["chemical bond", "ionic", "covalent", "hybridization",
                 "molecular orbital", "VSEPR", "bond order", "dipole"],
    "CHM_EQM": ["equilibrium", "equilibrium constant", "Kc", "Kp",
                "le chatelier", "reaction quotient"],
    "CHM_ION": ["pH", "acid", "base", "ionic", "dissociation", "hydrolysis",
                "buffer", "henderson", "neutralization", "salt"],
    "CHM_ELC": ["electrochemistry", "electrode", "cell", "electrolysis",
                "nernst", "faraday", "oxidation", "reduction", "redox"],
    "CHM_KIN": ["reaction rate", "rate constant", "order of reaction",
                "activation energy", "catalyst", "half-life", "arrhenius"],
    "CHM_SOL": ["solution", "solubility", "concentration", "molarity",
                "molality", "raoult", "colligative", "osmotic"],
    "CHM_ORG": ["organic", "hydrocarbon", "alkane", "alkene", "alkyne",
                "aromatic", "benzene", "functional group", "isomerism",
                "reaction mechanism", "SN1", "SN2"],
    "CHM_INORG": ["inorganic", "transition metal", "coordination",
                  "periodic table", "group", "period", "metallurgy"],

    # Mathematics
    "MATH_ALG": ["algebra", "equation", "polynomial", "factor", "quadratic",
                 "linear equation", "simultaneous", "inequality"],
    "MATH_CALC": ["derivative", "integral", "differentiation", "integration",
                  "limit", "continuity", "calculus", "maxima", "minima",
                  "tangent", "area under curve"],
    "MATH_TRIG": ["trigonometry", "sine", "cosine", "tangent", "angle",
                  "height", "distance", "inverse trig"],
    "MATH_GEO": ["geometry", "triangle", "circle", "polygon", "area",
                 "perimeter", "volume", "surface area", "coordinate"],
    "MATH_VEC": ["vector", "dot product", "cross product", "magnitude",
                 "direction", "unit vector", "projection"],
    "MATH_MAT": ["matrix", "determinant", "inverse", "transpose",
                 "eigenvalue", "linear algebra"],
    "MATH_PROB": ["probability", "permutation", "combination", "binomial",
                  "random", "event", "sample space", "bayes"],
    "MATH_STAT": ["statistics", "mean", "median", "mode", "standard deviation",
                  "variance", "correlation", "regression"],
    "MATH_SEQ": ["sequence", "series", "arithmetic progression", "AP",
                 "geometric progression", "GP", "sum", "nth term"],
    "MATH_NUM": ["number theory", "prime", "HCF", "LCM", "divisibility",
                 "congruence", "modular", "integer"],
    "MATH_CPLX": ["complex number", "modulus", "argument", "imaginary",
                  "polar form", "de moivre"],

    # Biology
    "BIO_CELL": ["cell", "membrane", "organelle", "mitochondria", "nucleus",
                 "ribosome", "chloroplast", "cell division", "mitosis", "meiosis"],
    "BIO_GEN": ["genetics", "DNA", "RNA", "heredity", "mendel", "punnett",
                "hardy-weinberg", "mutation", "chromosome"],
    "BIO_ECO": ["ecology", "ecosystem", "population", "biodiversity",
                "food chain", "trophic", "biome", "conservation"],
    "BIO_PHY": ["physiology", "digestion", "respiration", "circulation",
                "excretion", "nervous", "hormone", "photosynthesis"],
}

# Subject detection
SUBJECT_KEYWORDS = {
    "physics": ["force", "velocity", "acceleration", "energy", "power",
                "current", "voltage", "magnetic", "optics", "lens",
                "mirror", "heat", "temperature", "nuclear", "wave",
                "motion", "gravity", "friction", "pressure",
                "thrown", "upward", "downward", "projectile",
                "freely falling", "dropped", "ball", "block",
                "inclined", "pulley", "spring", "pendulum",
                "circuit", "resistor", "capacitor", "magnetic field",
                "photon", "electron", "atom", "nuclear"],
    "chemistry": ["mole", "molar", "reaction", "equilibrium", "acid",
                  "base", "pH", "oxidation", "reduction", "organic",
                  "compound", "molecule", "atom", "bond", "solution",
                  "concentration", "electrolysis", "catalyst"],
    "mathematics": ["solve", "equation", "derivative", "integral", "limit",
                    "matrix", "probability", "geometry", "triangle",
                    "algebra", "calculus", "trigonometry", "sequence",
                    "polynomial", "factor", "vector"],
    "biology": ["cell", "organism", "photosynthesis", "respiration",
                "genetics", "evolution", "ecology", "physiology",
                "DNA", "enzyme", "hormone", "tissue", "organ"],
}

# Target detection patterns
TARGET_PATTERNS = [
    (r'find\s+(?:the\s+)?(.+?)(?:\s+if|\s+when|\s+given|\s+where|\.|$)', "find"),
    (r'calculate\s+(?:the\s+)?(.+?)(?:\s+if|\s+when|\s+given|\s+where|\.|$)', "calculate"),
    (r'determine\s+(?:the\s+)?(.+?)(?:\s+if|\s+when|\s+given|\s+where|\.|$)', "determine"),
    (r'what\s+is\s+(?:the\s+)?(.+?)(?:\s+if|\s+when|\s+given|\s+where|\?|$)', "what_is"),
    (r'how\s+(?:much|many|fast|long|far)\s+(?:is\s+|are\s+|does\s+)?(.+?)(?:\s+if|\s+when|\s+given|\s+where|\?|$)', "how_much"),
    (r'show\s+that\s+(.+?)(?:\.|$)', "show_that"),
    (r'prove\s+that\s+(.+?)(?:\.|$)', "prove"),
    (r'solve\s+(?:for\s+)?(.+?)(?:\s+if|\s+when|\s+given|\s+where|\.|$)', "solve"),
    (r'evaluate\s+(.+?)(?:\s+if|\s+when|\s+given|\s+where|\.|$)', "evaluate"),
    (r'compute\s+(?:the\s+)?(.+?)(?:\s+if|\s+when|\s+given|\s+where|\.|$)', "compute"),
]

# Target name → (symbol, quantity_type) mapping
TARGET_NAME_MAP = {
    "velocity": ("v", "velocity"),
    "speed": ("v", "velocity"),
    "acceleration": ("a", "acceleration"),
    "force": ("F", "force"),
    "mass": ("m", "mass"),
    "distance": ("d", "length"),
    "displacement": ("s", "length"),
    "height": ("h", "length"),
    "time": ("t", "time"),
    "period": ("T", "time"),
    "energy": ("E", "energy"),
    "kinetic energy": ("KE", "energy"),
    "potential energy": ("PE", "energy"),
    "work": ("W", "energy"),
    "power": ("P", "power"),
    "pressure": ("p", "pressure"),
    "temperature": ("T", "temperature"),
    "current": ("I", "current"),
    "voltage": ("V", "voltage"),
    "resistance": ("R", "resistance"),
    "charge": ("Q", "charge"),
    "area": ("A", "area"),
    "volume": ("V", "volume"),
    "angle": ("theta", "angle"),
    "ph": ("pH", "scalar"),
    "concentration": ("C", "concentration"),
    "moles": ("n", "amount"),
    "density": ("rho", "density"),
    "frequency": ("f", "frequency"),
    "wavelength": ("lambda", "length"),
    "focal length": ("f", "length"),
    "image distance": ("v", "length"),
    "object distance": ("u", "length"),
    "magnification": ("m", "scalar"),
    "x": ("x", "scalar"),
    "y": ("y", "scalar"),
    "derivative": ("dy/dx", "expression"),
    "integral": ("integral", "expression"),
    "limit": ("L", "scalar"),
    "determinant": ("det", "scalar"),
    "probability": ("P", "scalar"),
    "mean": ("x_bar", "scalar"),
    "median": ("M", "scalar"),
    "standard deviation": ("sigma", "scalar"),
    "variance": ("sigma^2", "scalar"),
}

# Difficulty indicators
DIFFICULTY_INDICATORS = {
    "jee_advanced": ["jee advanced", "iit", "advanced problem", "challenging"],
    "jee_main": ["jee main", "jee", "aieee"],
    "neet": ["neet", "aipmt", "medical entrance"],
    "olympiad": ["olympiad", "ipho", "icho", "imo"],
}


@dataclass
class ExtractionResult:
    """Result of concept + target extraction."""
    subject: str = ""
    concept_tags: list[str] = field(default_factory=list)
    target: Optional[Target] = None
    difficulty: str = "medium"
    class_level: Optional[int] = None
    board: Optional[str] = None
    question_type: str = "numerical"  # numerical | conceptual | proof | comparison
    confidence: float = 0.0

    def to_dict(self) -> dict:
        return {
            "subject": self.subject,
            "concept_tags": self.concept_tags,
            "target": self.target.to_dict() if self.target else None,
            "difficulty": self.difficulty,
            "class_level": self.class_level,
            "question_type": self.question_type,
            "confidence": self.confidence,
        }


class ConceptTargetExtractor:
    """Layer 2 (B4): Extract concepts and target from problem text."""

    def extract(self, text: str) -> ExtractionResult:
        """Extract subject, concepts, target, and difficulty from text."""
        text_lower = text.lower()
        result = ExtractionResult()

        # ── Subject detection ──
        subject_scores = {}
        for subject, keywords in SUBJECT_KEYWORDS.items():
            score = sum(1 for kw in keywords if kw in text_lower)
            if score > 0:
                subject_scores[subject] = score

        if subject_scores:
            result.subject = max(subject_scores, key=subject_scores.get)
            result.confidence = min(1.0, subject_scores[result.subject] / 5.0)

        # ── Concept tagging ──
        concept_scores = {}
        for tag, keywords in CONCEPT_TAXONOMY.items():
            score = sum(1 for kw in keywords if kw in text_lower)
            if score > 0:
                concept_scores[tag] = score

        # Keep top concepts (score >= 1, max 5)
        result.concept_tags = sorted(
            concept_scores,
            key=concept_scores.get,
            reverse=True
        )[:5]

        # ── Target extraction ──
        result.target = self._extract_target(text, text_lower)

        # ── Difficulty ──
        for level, indicators in DIFFICULTY_INDICATORS.items():
            if any(ind in text_lower for ind in indicators):
                result.difficulty = level
                break

        # ── Class level ──
        class_match = re.search(r'class\s*(\d+)', text_lower)
        if class_match:
            result.class_level = int(class_match.group(1))

        # ── Board ──
        if "cbse" in text_lower:
            result.board = "CBSE"
        elif "isc" in text_lower or "cisce" in text_lower or "icse" in text_lower:
            result.board = "CISCE"

        # ── Question type ──
        if any(kw in text_lower for kw in ["prove", "show that"]):
            result.question_type = "proof"
        elif any(kw in text_lower for kw in ["explain", "why", "justify", "describe"]):
            result.question_type = "conceptual"
        elif any(kw in text_lower for kw in ["compare", "which is greater", "who is greater"]):
            result.question_type = "comparison"
        else:
            result.question_type = "numerical"

        return result

    def _extract_target(self, text: str, text_lower: str) -> Optional[Target]:
        """Extract what the problem is asking for."""
        for pattern, qtype in TARGET_PATTERNS:
            m = re.search(pattern, text_lower, re.IGNORECASE)
            if m:
                target_text = m.group(1).strip().rstrip(".?!")

                # Try to map to a known target
                for name, (symbol, qty_type) in TARGET_NAME_MAP.items():
                    if name in target_text:
                        return Target(
                            symbol=symbol,
                            name=target_text[:50],
                            quantity_type=qty_type,
                        )

                # Generic target — use first word as symbol
                words = target_text.split()
                if words:
                    return Target(
                        symbol=words[0][:5],
                        name=target_text[:50],
                        quantity_type="scalar",
                    )

        return None


# Singleton
_extractor = None


def get_extractor() -> ConceptTargetExtractor:
    global _extractor
    if _extractor is None:
        _extractor = ConceptTargetExtractor()
    return _extractor


def extract_concepts(text: str) -> ExtractionResult:
    """Convenience function."""
    return get_extractor().extract(text)
