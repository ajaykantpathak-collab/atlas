"""NLP Parser using spaCy.

Parses natural language questions into structured form:
- entities (objects, topics)
- quantities (numbers with units)
- verbs (action/change words)
- temporal info (time periods, "after X")
- question type (how many, find, solve, explain, why)

This is the FIRST layer of the deterministic solving pipeline.
It does NOT solve anything - it only structures the question.
"""

import re
import logging
from dataclasses import dataclass, field
from typing import Optional

# E1 (BATCH_BRIEF §4): spaCy pulls thinc->torch (~48s cold).  This module
# rides the ai/* boot chain (pattern_solver, conceptual_handler,
# missing_value_handler, structural_patterns all import it top-level), so
# the top-level `import spacy` was a hidden torch-at-boot door.  get_nlp()
# imports lazily — first parse pays, boot doesn't.
spacy = None

logger = logging.getLogger(__name__)

# Load spaCy model once (singleton)
_nlp = None


def get_nlp():
    """Get or create the spaCy NLP processor (singleton)."""
    global _nlp, spacy
    if _nlp is None:
        import spacy as _spacy
        spacy = _spacy
        _nlp = spacy.load("en_core_web_sm")
        # Add custom entity ruler for math/science terms
        ruler = _nlp.add_pipe("entity_ruler", before="ner")
        patterns = [
            # Math terms
            {"label": "MATH_TERM", "pattern": "compound interest"},
            {"label": "MATH_TERM", "pattern": "simple interest"},
            {"label": "MATH_TERM", "pattern": "compound amount"},
            {"label": "MATH_TERM", "pattern": "exponential growth"},
            {"label": "MATH_TERM", "pattern": "exponential decay"},
            {"label": "MATH_TERM", "pattern": "half-life"},
            {"label": "MATH_TERM", "pattern": "half life"},
            {"label": "MATH_TERM", "pattern": "linear programming"},
            {"label": "MATH_TERM", "pattern": "derivative"},
            {"label": "MATH_TERM", "pattern": "integral"},
            {"label": "MATH_TERM", "pattern": "antiderivative"},
            {"label": "MATH_TERM", "pattern": "determinant"},
            {"label": "MATH_TERM", "pattern": "inverse"},
            {"label": "MATH_TERM", "pattern": "transpose"},
            {"label": "MATH_TERM", "pattern": "dot product"},
            {"label": "MATH_TERM", "pattern": "cross product"},
            {"label": "MATH_TERM", "pattern": "magnitude"},
            {"label": "MATH_TERM", "pattern": "permutation"},
            {"label": "MATH_TERM", "pattern": "combination"},
            {"label": "MATH_TERM", "pattern": "factorial"},
            {"label": "MATH_TERM", "pattern": "probability"},
            {"label": "MATH_TERM", "pattern": "arithmetic progression"},
            {"label": "MATH_TERM", "pattern": "geometric progression"},
            {"label": "MATH_TERM", "pattern": "pythagoras"},
            {"label": "MATH_TERM", "pattern": "hypotenuse"},
            {"label": "MATH_TERM", "pattern": "slope"},
            {"label": "MATH_TERM", "pattern": "midpoint"},
            {"label": "MATH_TERM", "pattern": "distance"},
            # Physics terms
            {"label": "PHYSICS_TERM", "pattern": "velocity"},
            {"label": "PHYSICS_TERM", "pattern": "acceleration"},
            {"label": "PHYSICS_TERM", "pattern": "force"},
            {"label": "PHYSICS_TERM", "pattern": "momentum"},
            {"label": "PHYSICS_TERM", "pattern": "energy"},
            {"label": "PHYSICS_TERM", "pattern": "power"},
            {"label": "PHYSICS_TERM", "pattern": "pressure"},
            {"label": "PHYSICS_TERM", "pattern": "temperature"},
            # Chemistry terms
            {"label": "CHEM_TERM", "pattern": "mole"},
            {"label": "CHEM_TERM", "pattern": "molarity"},
            {"label": "CHEM_TERM", "pattern": "pH"},
            {"label": "CHEM_TERM", "pattern": "stoichiometry"},
            # Biology terms
            {"label": "BIO_TERM", "pattern": "bacteria"},
            {"label": "BIO_TERM", "pattern": "population"},
            {"label": "BIO_TERM", "pattern": "cell"},
            {"label": "BIO_TERM", "pattern": "organism"},
            {"label": "BIO_TERM", "pattern": "enzyme"},
            {"label": "BIO_TERM", "pattern": "photosynthesis"},
            # Change verbs (growth/decay)
            {"label": "CHANGE_VERB", "pattern": "doubles"},
            {"label": "CHANGE_VERB", "pattern": "triples"},
            {"label": "CHANGE_VERB", "pattern": "quadruples"},
            {"label": "CHANGE_VERB", "pattern": "halves"},
            {"label": "CHANGE_VERB", "pattern": "depreciates"},
            {"label": "CHANGE_VERB", "pattern": "decays"},
            {"label": "CHANGE_VERB", "pattern": "decreases"},
            {"label": "CHANGE_VERB", "pattern": "increases"},
            {"label": "CHANGE_VERB", "pattern": "grows"},
            {"label": "CHANGE_VERB", "pattern": "multiplies"},
        ]
        ruler.add_patterns(patterns)
    return _nlp


@dataclass
class Quantity:
    """A number with optional unit and role."""
    value: float
    unit: str = ""
    role: str = ""  # initial, rate, time, result, etc.
    raw_text: str = ""


@dataclass
class TemporalInfo:
    """Time-related information."""
    type: str  # "period", "after", "before", "duration"
    value: float
    unit: str = ""  # hours, days, years, seconds, etc.
    raw_text: str = ""


@dataclass
class ParsedQuestion:
    """Structured output from NLP parsing."""
    raw: str
    entities: list = field(default_factory=list)  # spaCy entities
    math_terms: list = field(default_factory=list)  # MATH_TERM entities
    physics_terms: list = field(default_factory=list)
    chem_terms: list = field(default_factory=list)
    bio_terms: list = field(default_factory=list)
    change_verbs: list = field(default_factory=list)  # doubles, triples, etc.
    quantities: list = field(default_factory=list)  # Quantity objects
    temporal: list = field(default_factory=list)  # TemporalInfo objects
    question_type: str = ""  # how_many, find, solve, explain, why, prove, etc.
    subject_hint: str = ""  # maths, physics, chemistry, biology
    has_formula: bool = False  # contains explicit formula like x^2
    has_matrix: bool = False
    has_vector: bool = False
    has_equation: bool = False
    is_conceptual: bool = False
    keywords: list = field(default_factory=list)  # all significant words

    def get_quantity(self, role: str) -> Optional[Quantity]:
        """Get first quantity with given role."""
        for q in self.quantities:
            if q.role == role:
                return q
        return None

    def get_temporal(self, type_: str) -> Optional[TemporalInfo]:
        """Get first temporal info of given type."""
        for t in self.temporal:
            if t.type == type_:
                return t
        return None


def parse_question(question: str) -> ParsedQuestion:
    """Parse a natural language question into structured form.

    This is the entry point for the NLP layer.
    """
    nlp = get_nlp()
    doc = nlp(question)
    lower = question.lower()

    parsed = ParsedQuestion(raw=question)

    # ── Extract entities by custom label ──
    for ent in doc.ents:
        if ent.label_ == "MATH_TERM":
            parsed.math_terms.append(ent.text.lower())
        elif ent.label_ == "PHYSICS_TERM":
            parsed.physics_terms.append(ent.text.lower())
        elif ent.label_ == "CHEM_TERM":
            parsed.chem_terms.append(ent.text.lower())
        elif ent.label_ == "BIO_TERM":
            parsed.bio_terms.append(ent.text.lower())
        elif ent.label_ == "CHANGE_VERB":
            parsed.change_verbs.append(ent.text.lower())
        else:
            parsed.entities.append(ent.text)

    # ── Extract quantities with units ──
    parsed.quantities = _extract_quantities(doc, lower)

    # ── Extract temporal info ──
    parsed.temporal = _extract_temporal(doc, lower)

    # ── Detect question type ──
    parsed.question_type = _detect_question_type(lower)

    # ── Detect subject hint ──
    parsed.subject_hint = _detect_subject(parsed)

    # ── Detect formula/equation/matrix/vector ──
    parsed.has_formula = bool(re.search(r'[a-z]\s*[\^]\s*\d|sqrt|sin|cos|tan|log|exp|ln', lower))
    parsed.has_matrix = bool(re.search(r'\[\[.*\]\]', question))
    parsed.has_vector = bool(re.search(r'\d+\s*[ijk]|[+-]\s*\d+\s*[ijk]', lower))
    parsed.has_equation = bool(re.search(r'[a-z]\s*[=]\s*\d|solve\s+.*=', lower))

    # ── Detect conceptual ──
    conceptual_triggers = [
        "why", "explain", "justify", "prove", "show that",
        "what is", "what does", "what are", "how can",
        "how does", "difference between", "meaning of",
        "significance of", "describe", "assertion", "reason",
    ]
    parsed.is_conceptual = any(t in lower for t in conceptual_triggers)

    # ── Collect keywords (lowercased significant words) ──
    for token in doc:
        if token.pos_ in ("NOUN", "VERB", "ADJ", "NUM") and not token.is_stop:
            parsed.keywords.append(token.lemma_.lower())

    return parsed


def _extract_quantities(doc, lower: str) -> list:
    """Extract quantities with units and roles from parsed doc."""
    quantities = []

    # Pattern: number + unit
    for token in doc:
        if token.pos_ == "NUM" and token.like_num:
            try:
                value = float(token.text)
            except ValueError:
                continue

            # Find unit (next token or previous token)
            unit = ""
            role = ""

            # Check next token for unit
            if token.i + 1 < len(doc):
                next_tok = doc[token.i + 1]
                if next_tok.pos_ in ("NOUN", "PROPN") and next_tok.text.lower() in (
                    "hours", "hour", "hrs", "minutes", "mins", "seconds", "secs",
                    "days", "day", "weeks", "week", "months", "month", "years", "year",
                    "m", "cm", "mm", "km", "kg", "g", "l", "ml",
                    "rs", "rupees", "dollars", "$",
                    "m/s", "km/h", "km/hr",
                ):
                    unit = next_tok.text.lower()

            # Determine role from context
            # Look at surrounding words
            context_start = max(0, token.i - 5)
            context_end = min(len(doc), token.i + 5)
            context = " ".join(doc[j].text.lower() for j in range(context_start, context_end))

            if any(w in context for w in ["starts with", "initial", "begins with", "principal", "deposited", "invested", "there are", "starts at"]):
                role = "initial"
            elif any(w in context for w in ["rate", "percent", "%", "speed", "velocity"]):
                role = "rate"
            elif any(w in context for w in ["after", "in", "for", "time", "duration"]):
                role = "time"
            elif any(w in context for w in ["height", "length", "width", "radius", "base", "side", "span"]):
                role = "dimension"
            elif any(w in context for w in ["cost", "price", "profit", "amount", "value"]):
                role = "value"

            quantities.append(Quantity(
                value=value, unit=unit, role=role,
                raw_text=token.text
            ))

    return quantities


def _extract_temporal(doc, lower: str) -> list:
    """Extract temporal information (periods, after, duration)."""
    temporal = []

    # Pattern: "every X hours/days/years" → period
    for match in re.finditer(r'every\s+(\d+\.?\d*)\s*(hours?|hrs?|days?|weeks?|months?|years?|yrs?|seconds?|secs?|minutes?|mins?)', lower):
        temporal.append(TemporalInfo(
            type="period",
            value=float(match.group(1)),
            unit=match.group(2),
            raw_text=match.group(0)
        ))

    # Pattern: "annually" → period=1 year
    if "annually" in lower or "per year" in lower or "per annum" in lower:
        temporal.append(TemporalInfo(type="period", value=1, unit="year", raw_text="annually"))
    if "monthly" in lower or "per month" in lower:
        temporal.append(TemporalInfo(type="period", value=1, unit="month", raw_text="monthly"))
    if "quarterly" in lower or "per quarter" in lower:
        temporal.append(TemporalInfo(type="period", value=3, unit="month", raw_text="quarterly"))
    if "daily" in lower or "per day" in lower:
        temporal.append(TemporalInfo(type="period", value=1, unit="day", raw_text="daily"))
    if "hourly" in lower or "per hour" in lower:
        temporal.append(TemporalInfo(type="period", value=1, unit="hour", raw_text="hourly"))

    # Pattern: "after X hours/days/years" → target time
    for match in re.finditer(r'after\s+(\d+\.?\d*)\s*(hours?|hrs?|days?|weeks?|months?|years?|yrs?|seconds?|secs?|minutes?|mins?)', lower):
        temporal.append(TemporalInfo(
            type="after",
            value=float(match.group(1)),
            unit=match.group(2),
            raw_text=match.group(0)
        ))

    # Pattern: "for X years" → duration
    for match in re.finditer(r'for\s+(\d+\.?\d*)\s*(hours?|hrs?|days?|weeks?|months?|years?|yrs?)', lower):
        temporal.append(TemporalInfo(
            type="duration",
            value=float(match.group(1)),
            unit=match.group(2),
            raw_text=match.group(0)
        ))

    # Pattern: "in X years" → after
    for match in re.finditer(r'in\s+(\d+\.?\d*)\s*(hours?|hrs?|days?|weeks?|months?|years?|yrs?)', lower):
        temporal.append(TemporalInfo(
            type="after",
            value=float(match.group(1)),
            unit=match.group(2),
            raw_text=match.group(0)
        ))

    return temporal


def _detect_question_type(lower: str) -> str:
    """Detect the type of question being asked."""
    if lower.startswith("how many") or "how many" in lower:
        return "how_many"
    if lower.startswith("how much") or "how much" in lower:
        return "how_much"
    if lower.startswith("how fast") or "how fast" in lower:
        return "how_fast"
    if lower.startswith("how tall") or "how tall" in lower:
        return "how_tall"
    if "find" in lower and not lower.startswith("explain"):
        return "find"
    if lower.startswith("solve"):
        return "solve"
    if lower.startswith("compute") or lower.startswith("calculate"):
        return "compute"
    if lower.startswith("evaluate"):
        return "evaluate"
    if lower.startswith("differentiate") or "derivative" in lower or "d/dx" in lower:
        return "differentiate"
    if lower.startswith("integrate") or "integral" in lower or "antiderivative" in lower:
        return "integrate"
    if lower.startswith("simplify"):
        return "simplify"
    if lower.startswith("factor"):
        return "factor"
    if lower.startswith("expand"):
        return "expand"
    if "explain" in lower:
        return "explain"
    if "why" in lower:
        return "why"
    if "justify" in lower:
        return "justify"
    if "prove" in lower or "show that" in lower:
        return "prove"
    if "what is" in lower or "what are" in lower or "what does" in lower:
        return "what_is"
    if "difference between" in lower:
        return "difference"
    if "assertion" in lower or "reason" in lower:
        return "assertion_reason"
    if "maximize" in lower or "minimize" in lower:
        return "optimize"
    if "probability" in lower:
        return "probability"
    if "area" in lower:
        return "area"
    if "volume" in lower:
        return "volume"
    if "perimeter" in lower or "circumference" in lower:
        return "perimeter"
    return "unknown"


def _detect_subject(parsed: ParsedQuestion) -> str:
    """Detect which subject this question belongs to."""
    # Check bio terms first (bacteria should be bio, not maths)
    if parsed.bio_terms:
        # But "bacteria growth" with "doubles every" is a math concept applied to bio
        # Check if it's asking for calculation vs explanation
        if parsed.question_type in ("how_many", "how_much", "find", "compute"):
            # It's a calculation about a bio scenario → maths (exponential growth)
            if any(v in parsed.change_verbs for v in ["doubles", "triples", "halves", "grows", "decays", "depreciates"]):
                return "maths"  # Bio scenario, math concept
        return "biology"

    if parsed.physics_terms:
        return "physics"

    if parsed.chem_terms:
        return "chemistry"

    if parsed.math_terms:
        return "maths"

    # Check keywords
    math_indicators = {"equation", "solve", "derivative", "integral", "matrix", "vector",
                       "probability", "permutation", "combination", "factorial", "triangle",
                       "circle", "square", "rectangle", "polynomial", "function", "limit"}
    physics_indicators = {"force", "motion", "velocity", "acceleration", "energy", "work",
                          "power", "lens", "mirror", "circuit", "current", "voltage"}
    chem_indicators = {"mole", "reaction", "acid", "base", "salt", "compound", "element",
                       "atomic", "molecular", "equilibrium"}
    bio_indicators = {"cell", "organism", "gene", "dna", "rna", "protein", "enzyme",
                      "photosynthesis", "respiration", "ecosystem"}

    keywords_set = set(parsed.keywords)
    if keywords_set & math_indicators:
        return "maths"
    if keywords_set & physics_indicators:
        return "physics"
    if keywords_set & chem_indicators:
        return "chemistry"
    if keywords_set & bio_indicators:
        return "biology"

    return ""
