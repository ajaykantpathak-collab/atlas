"""Symbolic Reasoning Engine for STEM word problems.

Architecture (same as Photomath / Wolfram Alpha / Symbolab):
    1. Question type classifier (keywords)
    2. Rule matcher (find relevant formula by keywords)
    3. Rule-aware quantity extractor (use rule's variable descriptions to find numbers)
    4. SymPy solver (deterministic computation)
    5. Step generator (natural-language explanations per step)

Key design principles:
- Rule-aware extraction: when a rule matches, use its variable descriptions
  to find the right numbers in the question text (not generic extraction)
- One formula handles all phrasings of the same problem
- Multi-step problems chain automatically via dependency resolution
- SymPy does ALL arithmetic (no LLM, no hallucination)
- Each step gets a natural-language explanation
"""

import re
import logging
from dataclasses import dataclass, field
from typing import Optional

import sympy

logger = logging.getLogger(__name__)


# =========================================================================== #
# DATA STRUCTURES
# =========================================================================== #

@dataclass
class Quantity:
    """A quantity extracted from a question, with its meaning."""
    value: float | int | str
    unit: str = ""
    entity: str = ""
    property: str = ""
    variable: str = ""


@dataclass
class Step:
    """One step in a worked solution."""
    step_number: int
    description: str
    expression: str
    result: str = ""
    success: bool = True


@dataclass
class Solution:
    """Complete solution to a question."""
    matched: bool = False
    question_type: str = ""
    steps: list[Step] = field(default_factory=list)
    final_answer: str = ""
    method: str = ""
    node_id: str = ""
    confidence: float = 1.0


# =========================================================================== #
# QUESTION TYPE CLASSIFIER
# =========================================================================== #

class QuestionClassifier:
    """Classify a question by its type using keyword matching."""

    PROPORTIONAL_KEYWORDS = [
        "how does", "how do", "vary", "varies", "vary with",
        "proportional to", "depends on",
        "what is the relation",
    ]

    WHAT_IF_KEYWORDS = [
        "what happens", "what happens if", "what happens to",
        "if x is doubled", "if x is halved", "if x is tripled",
        "doubled", "halved", "tripled",
        "is doubled", "is halved", "is tripled",
    ]

    SYMBOLIC_KEYWORDS = [
        "what condition", "what is the condition",
        "what relationship", "what is the relationship",
        "relationship between",
        "express in terms of", "write the equation",
        "what must be", "what should be",
        "roots are real and equal",
        "find the relationship",
    ]

    RECALL_KEYWORDS = [
        "write the fourth", "write the third", "name the",
        "what is the codon", "which codon",
        "how many codons", "list the",
        "what is the order",
    ]

    NUMERICAL_KEYWORDS = [
        "find", "calculate", "compute", "determine", "how many",
        "how much", "what is the value", "what is the number",
        "how long", "how far", "how fast", "how tall",
        "what is the probability",
    ]

    @staticmethod
    def classify(question: str) -> str:
        q = question.lower().strip()

        # Check symbolic first (more specific than proportional)
        for kw in QuestionClassifier.SYMBOLIC_KEYWORDS:
            if kw in q:
                return "symbolic"

        # Check proportional
        for kw in QuestionClassifier.PROPORTIONAL_KEYWORDS:
            if kw in q:
                return "proportional"

        # Check what-if
        for kw in QuestionClassifier.WHAT_IF_KEYWORDS:
            if kw in q:
                return "what_if"

        # Check recall
        for kw in QuestionClassifier.RECALL_KEYWORDS:
            if kw in q:
                return "recall"

        # Check numerical
        for kw in QuestionClassifier.NUMERICAL_KEYWORDS:
            if kw in q:
                return "numerical"

        return "definition"


# =========================================================================== #
# RULE-AWARE QUANTITY EXTRACTOR
# =========================================================================== #

class RuleAwareExtractor:
    """Extract quantities from a question using a rule's variable descriptions.

    Instead of generic extraction, this uses the rule's variable descriptions
    to find the right numbers. For example, if the rule has variable "m" with
    description "mass", we look for "mass ... is X" or "X g of" patterns.

    This is the key innovation: extraction is guided by the matched rule,
    not by generic patterns. This means one rule handles all phrasings.
    """

    # Number pattern (handles decimals, scientific notation, fractions)
    NUMBER_RE = r'(\d+\.?\d*(?:e[+-]?\d+)?|\d+/\d+|\d+\.\d+)'

    # Unit aliases → canonical unit
    UNIT_ALIASES = {
        "cm3": "cm³", "cm³": "cm³", "cc": "cm³",
        "ml": "mL", "milliliter": "mL", "millilitre": "mL",
        "l": "L", "litre": "L", "liter": "L",
        "g": "g", "gram": "g", "grams": "g",
        "kg": "kg", "kilogram": "kg",
        "mg": "mg",
        "k": "K", "kelvin": "K",
        "°c": "°C", "celsius": "°C", "degree celsius": "°C",
        "atm": "atm", "atmosphere": "atm",
        "pa": "Pa", "pascal": "Pa",
        "m": "m", "meter": "m", "metre": "m",
        "cm": "cm", "mm": "mm", "km": "km",
        "s": "s", "sec": "s", "second": "s", "seconds": "s",
        "min": "min", "minute": "min", "hour": "h", "hr": "h",
        "a": "A", "ampere": "A", "amp": "A",
        "v": "V", "volt": "V",
        "n": "N", "newton": "N",
        "j": "J", "joule": "J",
        "w": "W", "watt": "W",
        "c": "C", "coulomb": "C",
        "f": "F", "farad": "F",
        "hz": "Hz", "hertz": "Hz",
        "mol": "mol", "mole": "mol", "moles": "mol",
        "rs": "Rs", "rs.": "Rs", "₹": "Rs",
        "%": "%", "percent": "%",
        "per second": "/s", "s-1": "/s", "s⁻¹": "/s",
    }

    # Variable description → extraction patterns
    # Each pattern is (regex, group_index_for_value)
    # The regex should capture the numeric value
    DESC_PATTERNS = {
        "mass": [
            rf'{NUMBER_RE}\s*g\s+of',           # "1.26 g of protein"
            rf'{NUMBER_RE}\s*g\b',              # "1.26 g"
            rf'mass.*?{NUMBER_RE}',             # "mass ... 1.26"
            rf'{NUMBER_RE}\s*g\b(?!/)',         # "4.75 g"
        ],
        "volume": [
            rf'{NUMBER_RE}\s*cm3',
            rf'{NUMBER_RE}\s*cm³',
            rf'{NUMBER_RE}\s*mL',
            rf'{NUMBER_RE}\s*ml',
            rf'{NUMBER_RE}\s*L\b',
            rf'{NUMBER_RE}\s*litre',
            rf'volume.*?{NUMBER_RE}',
        ],
        "temperature": [
            rf'{NUMBER_RE}\s*K\b',
            rf'{NUMBER_RE}\s*°?C',
            rf'temperature.*?{NUMBER_RE}',
            rf'at\s*{NUMBER_RE}\s*K',
        ],
        "pressure": [
            # "2.57 x 10^-3 atm" or "2.57 × 10^-3 atm"
            rf'(\d+\.?\d*)\s*[x×]\s*10\^?(-?\d+)\s*atm',
            rf'(\d+\.?\d*(?:e[+-]?\d+)?)\s*atm',
            rf'(\d+\.?\d*)\s*Pa',
            rf'osmotic pressure.*?(\d+\.?\d*(?:e[+-]?\d+)?)',
            rf'pressure.*?(\d+\.?\d*(?:e[+-]?\d+)?)',
        ],
        "moles": [
            rf'{NUMBER_RE}\s*mol\b',
            rf'moles?.*?{NUMBER_RE}',
            rf'number of moles.*?{NUMBER_RE}',
        ],
        "molar_mass": [
            rf'molar mass.*?{NUMBER_RE}',
            rf'atomic mass.*?{NUMBER_RE}',
            rf'M\s*=\s*{NUMBER_RE}',
            rf'\(M\s*=\s*{NUMBER_RE}',
            rf'\(.*?mass\s*=\s*{NUMBER_RE}',
        ],
        "concentration": [
            rf'{NUMBER_RE}\s*%\s*glucose',
            rf'{NUMBER_RE}\s*%\s*solution',
            rf'{NUMBER_RE}\s*%\s*urea',
            rf'{NUMBER_RE}\s*M\b',
            rf'concentration.*?{NUMBER_RE}',
        ],
        "charge": [
            rf'{NUMBER_RE}\s*μ?[CcC]',
            rf'{NUMBER_RE}\s*microcoulomb',
            rf'charge.*?{NUMBER_RE}',
        ],
        "voltage": [
            rf'{NUMBER_RE}\s*V\b',
            rf'potential difference.*?{NUMBER_RE}',
            rf'voltage.*?{NUMBER_RE}',
        ],
        "current": [
            rf'{NUMBER_RE}\s*A\b',
            rf'current.*?{NUMBER_RE}',
        ],
        "resistance": [
            rf'{NUMBER_RE}\s*Ω',
            rf'{NUMBER_RE}\s*ohm',
            rf'resistance.*?{NUMBER_RE}',
        ],
        "distance": [
            rf'{NUMBER_RE}\s*m\b',
            rf'distance.*?{NUMBER_RE}',
            rf'{NUMBER_RE}\s*cm\b',
        ],
        "time": [
            rf'{NUMBER_RE}\s*s\b',
            rf'{NUMBER_RE}\s*sec',
            rf'{NUMBER_RE}\s*min',
            rf'{NUMBER_RE}\s*hour',
            rf'time.*?{NUMBER_RE}',
        ],
        "speed": [
            rf'{NUMBER_RE}\s*m/s',
            rf'speed.*?{NUMBER_RE}',
            rf'{NUMBER_RE}\s*m\b.*?{NUMBER_RE}\s*s',  # "60 m in 2 s"
        ],
        "turns": [
            rf'{NUMBER_RE}\s*turns',
            rf'coil.*?{NUMBER_RE}\s*turns',
        ],
        "radius": [
            rf'radius.*?{NUMBER_RE}',
            rf'{NUMBER_RE}\s*cm\b.*?coil',
            rf'{NUMBER_RE}\s*cm\b.*?radius',
        ],
        "refractive_index": [
            rf'refractive index.*?{NUMBER_RE}',
            rf'{NUMBER_RE}\s*refractive',
        ],
        "valence": [
            rf'Al(\d+)\+',
            rf'(\d+)\s*e-',
            rf'(\d+)\s*electrons?',
        ],
        "faraday_constant": [
            r'(96500)',
            r'F\s*=\s*96500',
        ],
        "gas_constant": [
            r'(0\.0821)',
            r'R\s*=\s*0\.0821',
        ],
        "coulomb_constant": [
            r'(9e9|9.*?10\^?9)',
            r'k\s*=\s*9',
        ],
        "planck_constant": [
            r'(6\.626.*?10\^?-34)',
            r'h\s*=\s*6\.626',
        ],
        "speed_of_light": [
            r'(3e8|3.*?10\^?8)',
            r'c\s*=\s*3',
        ],
        "allele_frequency": [
            r'frequency of allele.*?{NUMBER_RE}',
            r'allele.*?frequency.*?{NUMBER_RE}',
            r'frequency.*?\(a\).*?{NUMBER_RE}',
        ],
        "population": [
            r'population of\s*' + NUMBER_RE,
            r'(\d+)\s*(?:fruit flies|flies|individuals|organisms|species|plants)',
            r'(\d+)\s*species',
        ],
        "final_population": [
            r'after one year.*?{NUMBER_RE}',
            r'after 5 years.*?{NUMBER_RE}',
            r'after.*?year.*?{NUMBER_RE}',
            r'number.*?(?:became|was found to be)\s*' + NUMBER_RE,
            r'number of.*?(?:became|was found to be)\s*' + NUMBER_RE,
        ],
        "initial_population": [
            r'(?:were|was)\s*' + NUMBER_RE + r'\s*(?:lily plants|plants|species|flies|individuals)',
            r'There were\s*' + NUMBER_RE,
            r'(\d+)\s*(?:lily plants|plants|species|flies|individuals)\s*(?:were|was|planted)',
        ],
        "time_period": [
            r'after\s*' + NUMBER_RE + r'\s*years?',
            r'(\d+)\s*years?',
        ],
        "cgst_amount": [
            r'CGST.*?' + NUMBER_RE,
            r'cgst.*?' + NUMBER_RE,
        ],
        "marked_price": [
            r'marked price.*?' + NUMBER_RE,
            r'MP.*?' + NUMBER_RE,
        ],
        "gst_rate": [
            r'rate.*?GST.*?' + NUMBER_RE,
            r'GST.*?rate.*?' + NUMBER_RE,
        ],
        "number_of_shares": [
            r'(\d+)\s*shares?',
            r'buys\s*' + NUMBER_RE + r'\s*shares?',
        ],
        "face_value": [
            r'nominal value.*?' + NUMBER_RE,
            r'Rs\s*' + NUMBER_RE + r'\s*each',
            r'FV\s*=\s*' + NUMBER_RE,
        ],
        "discount_per_share": [
            r'(\d+)%\s*discount',
            r'discount.*?' + NUMBER_RE,
        ],
        "dividend_percent": [
            r'(\d+)%\s*dividend',
            r'dividend.*?(\d+)%',
        ],
        "coefficient_a": [
            r'([+-]?\d*)\s*x\^?2',
            r'([+-]?\d+)\s*x\s*\*\*\s*2',
        ],
        "coefficient_b": [
            r'([+-]?\d+)\s*x\b(?!\^)',
            r'([+-]?\d+)\s*\*\s*x\b(?!\^)',
        ],
        "coefficient_c": [
            r'=\s*([+-]?\d+)',
        ],
        "first_term": [
            r'AP:?\s*' + NUMBER_RE,
            r'first term.*?' + NUMBER_RE,
        ],
        "common_difference": [
            r'common difference.*?' + NUMBER_RE,
            r'd\s*=\s*' + NUMBER_RE,
        ],
        "term_number": [
            r'(\d+)(?:st|nd|rd|th)\s*term',
            r'find the\s*' + NUMBER_RE + r'\s*th',
        ],
        "term_count": [
            r'(\d+)\s*terms?',
            r'sum of\s*' + NUMBER_RE,
        ],
        "distance_value": [
            r'distance of\s*' + NUMBER_RE,
            r'covers.*?' + NUMBER_RE,
            r'{NUMBER_RE}\s*m\b',
        ],
        "speed_value": [
            r'speed of\s*' + NUMBER_RE,
            r'{NUMBER_RE}\s*m/s',
        ],
        "time_value": [
            r'in\s*' + NUMBER_RE + r'\s*s',
            r'time.*?' + NUMBER_RE,
        ],
        "favourable_outcomes": [
            r'(\d+)\s*favourable',
            r'(\d+)\s*favorable',
        ],
        "total_outcomes": [
            r'(\d+)\s*(?:total|sample space|outcomes)',
        ],
        "fifth_value": [
            r'',
        ],
        "sixth_value": [
            r'',
        ],
        "sum_of_values": [
            r'',
        ],
        "number_of_values": [
            r'(\d+)\s*(?:observations|values|numbers)',
        ],
        # New patterns for rule-specific variables
        "charge2": [
            rf'q2\s*=\s*' + NUMBER_RE,
            rf'second charge.*?' + NUMBER_RE,
            rf'charge.*?' + NUMBER_RE + r'.*?charge.*?' + NUMBER_RE,  # second charge
        ],
        "radius1": [
            rf'R1\s*=\s*' + NUMBER_RE,
            rf'first radius.*?' + NUMBER_RE,
            rf'radius.*?curvature.*?' + NUMBER_RE,
        ],
        "radius2": [
            rf'R2\s*=\s*' + NUMBER_RE,
            rf'second radius.*?' + NUMBER_RE,
        ],
        "concentration1": [
            rf'(\d+\.?\d*)\s*%\s*glucose',
            rf'glucose.*?(\d+\.?\d*)\s*%',
            rf'first.*?(\d+\.?\d*)\s*%',
        ],
        "concentration2": [
            rf'(\d+\.?\d*)\s*%\s*(?:urea|solute|non-volatile|solution)',
            rf'urea.*?(\d+\.?\d*)\s*%',
            rf'solute.*?(\d+\.?\d*)\s*%',
            rf'is\s*' + NUMBER_RE + r'\s*%\s*solution',
        ],
        "molar_mass1": [
            rf'glucose.*?M\s*=\s*' + NUMBER_RE,
            rf'\(M\s*=\s*' + NUMBER_RE + r'\)',
            rf'M\s*=\s*' + NUMBER_RE + r'.*?glucose',
        ],
        "molar_mass2": [
            rf'Al.*?=\s*' + NUMBER_RE,
            rf'atomic mass.*?Al.*?' + NUMBER_RE,
            rf'atomic mass.*?' + NUMBER_RE,
        ],
        "electron_density": [
            rf'n\s*=\s*' + NUMBER_RE,
            rf'electron density.*?' + NUMBER_RE,
        ],
        "area": [
            rf'A\s*=\s*' + NUMBER_RE,
            rf'area.*?' + NUMBER_RE,
            rf'cross.*?section.*?' + NUMBER_RE,
        ],
        "electron_charge": [
            rf'e\s*=\s*' + NUMBER_RE,
            rf'1\.6.*?10.*?-19',
        ],
        "resistivity": [
            rf'resistivity.*?' + NUMBER_RE,
            rf'rho\s*=\s*' + NUMBER_RE,
        ],
        "cgst_amount": [
            rf'CGST.*?' + NUMBER_RE,
            rf'cgst.*?' + NUMBER_RE,
        ],
        "marked_price": [
            rf'marked price.*?' + NUMBER_RE,
            rf'MP.*?' + NUMBER_RE,
        ],
        "number_of_shares": [
            rf'(\d+)\s*shares?',
            rf'buys\s*' + NUMBER_RE + r'\s*shares?',
        ],
        "face_value": [
            rf'nominal value.*?' + NUMBER_RE,
            rf'Rs\.?\s*' + NUMBER_RE + r'\s*each',
        ],
        "discount_per_share": [
            rf'(\d+)\s*%\s*discount',
            rf'(\d+)\s*percent\s*discount',
        ],
        "coefficient_a": [
            rf'([+-]?\d*)\s*x\^?2',
            rf'([+-]?\d+)\s*\*\s*x\*\*2',
            rf'p\s*=\s*([+-]?\d+)',  # px²-qx+r form
        ],
        "coefficient_b": [
            rf'([+-]?\d+)\s*x\b(?!\^|\*)',
            rf'q\s*=\s*([+-]?\d+)',  # px²-qx+r form
        ],
        "coefficient_c": [
            rf'=\s*([+-]?\d+)',
            rf'r\s*=\s*([+-]?\d+)',  # px²-qx+r form
        ],
        "first_term": [
            rf'AP:?\s*' + NUMBER_RE,
            rf'1/a',
            rf'first term.*?' + NUMBER_RE,
        ],
        "common_difference": [
            rf'common difference.*?' + NUMBER_RE,
            rf'd\s*=\s*' + NUMBER_RE,
        ],
        "distance_value": [
            rf'distance of\s*' + NUMBER_RE,
            rf'covers.*?distance of\s*' + NUMBER_RE,
            rf'(\d+)\s*m\b',
        ],
        "speed_value": [
            rf'speed of\s*' + NUMBER_RE,
            rf'in\s*' + NUMBER_RE + r'\s*s',
            rf'(\d+)\s*m.*?(\d+)\s*s',  # "60 m in 2 s" - but this captures both
        ],
        "first_distance": [
            rf'covers a distance of\s*' + NUMBER_RE,
            rf'distance of\s*' + NUMBER_RE + r'\s*m',
        ],
        "first_time": [
            rf'in\s*' + NUMBER_RE + r'\s*s\b',
            rf'in\s*' + NUMBER_RE + r'\s*seconds?',
        ],
        "second_distance": [
            rf'cover\s*' + NUMBER_RE + r'\s*m\b',
            rf'to cover\s*' + NUMBER_RE,
        ],
        "median_x": [
            rf'x\s*,\s*x\s*\+\s*4',  # just detect the pattern, x is symbolic
        ],
        "allele_frequency": [
            rf'frequency of allele.*?' + NUMBER_RE,
            rf'allele.*?\(a\).*?' + NUMBER_RE,
            rf'frequency.*?\(a\).*?is\s*' + NUMBER_RE,
        ],
        "final_population": [
            rf'after one year.*?was found to be\s*' + NUMBER_RE,
            rf'after 5 years.*?(?:became|was)\s*' + NUMBER_RE,
            rf'number.*?(?:became|was found to be)\s*' + NUMBER_RE,
            rf'(\d+)\s*(?:lily plants|plants|species)\s*(?:was|were)\s*found',
        ],
        "initial_population": [
            rf'(\d+)\s*(?:lily plants|plants|species)\s*(?:were|was)\s*(?:planted|in)',
            rf'There were\s*' + NUMBER_RE,
            rf'(\d+)\s*species\s*in\s*a\s*forest',
        ],
        "time_period": [
            rf'after\s*' + NUMBER_RE + r'\s*years?',
            rf'(\d+)\s*years?',
        ],
        "permeability": [
            rf'mu0\s*=\s*' + NUMBER_RE,
            rf'permeability.*?' + NUMBER_RE,
        ],
        "work_function": [
            rf'work function.*?' + NUMBER_RE,
            rf'W\s*=\s*' + NUMBER_RE,
        ],
        "frequency": [
            rf'frequency.*?' + NUMBER_RE,
            rf'f\s*=\s*' + NUMBER_RE,
        ],
        "momentum": [
            rf'momentum.*?' + NUMBER_RE,
            rf'p\s*=\s*' + NUMBER_RE,
        ],
    }

    @staticmethod
    def extract_for_rule(question: str, rule) -> dict[str, float | int]:
        """Extract variable values from a question for a specific rule.

        Uses the rule's variable descriptions to find matching numbers.
        Returns a dict of {variable_name: value}.
        """
        q = question
        q_lower = q.lower()
        values = {}

        for var_name, var_desc in rule.variables.items():
            # Get patterns for this variable description
            patterns = RuleAwareExtractor.DESC_PATTERNS.get(var_desc, [])

            # Also try the variable name itself as a pattern
            if var_name.lower() in q_lower:
                # Look for "varName = number" or "varName is number"
                direct_patterns = [
                    rf'{var_name}\s*=\s*{RuleAwareExtractor.NUMBER_RE}',
                    rf'{var_name}\s+is\s+{RuleAwareExtractor.NUMBER_RE}',
                    rf'{var_name}\s*:\s*{RuleAwareExtractor.NUMBER_RE}',
                ]
                patterns = direct_patterns + patterns

            for pattern in patterns:
                try:
                    match = re.search(pattern, q, re.IGNORECASE)
                    if match:
                        # Handle multi-group patterns (e.g., scientific notation)
                        if match.lastindex and match.lastindex >= 2:
                            # Two groups: base and exponent
                            base = float(match.group(1))
                            exp = float(match.group(2))
                            val = base * (10 ** exp)
                            if val == int(val) and abs(val) < 1e15:
                                val = int(val)
                        else:
                            val_str = match.group(1)
                            val = RuleAwareExtractor._parse_value(val_str)

                        if val is not None:
                            # Apply unit conversion if needed
                            val = RuleAwareExtractor._convert_unit(val, var_desc, q, match)
                            values[var_name] = val
                            break
                except (re.error, IndexError):
                    continue

        return values

    @staticmethod
    def _convert_unit(val: float | int, var_desc: str, question: str, match) -> float | int:
        """Convert units based on the variable description and question context.

        For example:
        - volume in cm³ → convert to L (divide by 1000)
        - radius/length in cm → convert to m (divide by 100)
        - mass in g → keep as g (standard for chemistry)
        """
        q = question.lower()
        match_text = match.group(0).lower()

        # Get context around the match (20 chars before and after)
        start = max(0, match.start() - 10)
        end = min(len(question), match.end() + 10)
        context = question[start:end].lower()

        if var_desc == "volume":
            # cm³ → L (1 L = 1000 cm³)
            if "cm3" in context or "cm³" in context or "cc" in context:
                return val / 1000.0
            # mL → L (1 L = 1000 mL)
            if "ml" in context and "cm" not in context:
                return val / 1000.0

        if var_desc in ("radius", "distance", "length"):
            # cm → m (but not cm³ which is volume)
            if "cm" in context and "cm3" not in context and "cm³" not in context:
                return val / 100.0
            # mm → m
            if "mm" in context:
                return val / 1000.0
            # km → m
            if "km" in context:
                return val * 1000.0

        if var_desc == "mass":
            # kg → g
            if "kg" in context:
                return val * 1000.0
            # mg → g
            if "mg" in context:
                return val / 1000.0

        if var_desc == "time":
            # min → s
            if "min" in context:
                return val * 60.0
            # hour → s
            if "hour" in context or "hr" in context:
                return val * 3600.0

        return val

    @staticmethod
    def extract_constants(question: str) -> dict[str, float]:
        """Extract known constants from the question text."""
        constants = {}
        q = question

        # Gas constant R = 0.0821
        if "0.0821" in q:
            constants["R"] = 0.0821

        # Faraday constant F = 96500
        if "96500" in q:
            constants["F"] = 96500

        # Coulomb constant k = 9e9
        if re.search(r'k\s*=\s*9', q) or "9.*?10^9" in q:
            constants["k"] = 9e9

        # Planck constant h = 6.626e-34
        if "6.626" in q:
            constants["h"] = 6.626e-34

        # Speed of light c = 3e8
        if re.search(r'c\s*=\s*3', q) or "3.*?10^8" in q:
            constants["c"] = 3e8

        # Permeability mu0 = 4π × 10^-7
        if "mu0" in q.lower() or "permeability" in q.lower():
            constants["mu0"] = 1.2566e-6

        # Electron charge e = 1.6e-19
        if "1.6" in q and "10" in q and "-19" in q:
            constants["e"] = 1.6e-19

        return constants

    @staticmethod
    def _parse_value(val_str: str) -> Optional[float | int]:
        """Parse a numeric value from a string."""
        try:
            # Handle scientific notation like "2.57 x 10^-3" or "2.57e-3"
            val_str = val_str.strip()

            # Handle "X x 10^Y" notation
            if "x 10" in val_str or "× 10" in val_str:
                parts = re.split(r'[x×]\s*10\^?', val_str)
                if len(parts) == 2:
                    base = float(parts[0].strip())
                    exp = float(parts[1].strip())
                    val = base * (10 ** exp)
                    if val == int(val) and abs(val) < 1e15:
                        return int(val)
                    return val

            val = float(val_str)
            if val == int(val) and abs(val) < 1e15:
                return int(val)
            return val
        except (ValueError, TypeError):
            return None


# =========================================================================== #
# RULE DEFINITION
# =========================================================================== #

@dataclass
class Rule:
    """A solving rule: pattern + formula + explanation."""
    name: str
    node_id: str
    subject: str
    keywords: list[str]
    formula: str
    variables: dict[str, str]       # variable name → description
    unknown: str
    explanation: str
    prerequisites: list[str] = field(default_factory=list)
    # Optional: special handler for complex extraction
    custom_extractor: Optional[callable] = None
    # Optional: constant defaults (e.g., R=0.0821 if not in question)
    defaults: dict[str, float] = field(default_factory=dict)


# =========================================================================== #
# RULE ENGINE
# =========================================================================== #

class RuleEngine:
    """Apply rules to solve questions."""

    def __init__(self):
        self.rules: list[Rule] = []

    def add_rule(self, rule: Rule):
        self.rules.append(rule)

    def add_rules(self, rules: list[Rule]):
        self.rules.extend(rules)

    def find_matching_rules(self, question: str, subject: str = None) -> list[Rule]:
        """Find rules whose keywords match the question, sorted by score."""
        q = question.lower()
        scored = []

        for rule in self.rules:
            if subject and rule.subject != subject:
                continue

            score = 0
            for kw in rule.keywords:
                if kw.lower() in q:
                    score += 3 if " " in kw else 1

            if score > 0:
                scored.append((score, rule))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [rule for _, rule in scored]

    def solve(self, question: str, subject: str = None, class_level: int = None) -> Optional[Solution]:
        """Solve a question using the rule engine."""
        q_type = QuestionClassifier.classify(question)
        matching = self.find_matching_rules(question, subject)

        if not matching:
            return None

        # Extract constants from question
        constants = RuleAwareExtractor.extract_constants(question)

        # Try each matching rule
        for rule in matching:
            solution = self._try_rule(rule, question, q_type, constants)
            if solution and solution.matched:
                return solution

        return None

    def _try_rule(self, rule: Rule, question: str, q_type: str, constants: dict) -> Optional[Solution]:
        """Try to solve using a specific rule."""
        # Special case: rules with no variables (constant answers)
        if not rule.variables:
            return self._try_constant_rule(rule, question, q_type)

        # Extract variable values using rule-aware extraction
        if rule.custom_extractor:
            var_values = rule.custom_extractor(question)
        else:
            var_values = RuleAwareExtractor.extract_for_rule(question, rule)

        # Add constants from question
        var_values.update(constants)

        # Add defaults from rule
        for key, val in rule.defaults.items():
            if key not in var_values:
                var_values[key] = val

        # Check if we have enough variables (all except the unknown)
        required = set(rule.variables.keys())
        have = set(var_values.keys())
        missing = required - have - {rule.unknown}

        if missing:
            return None

        # Build SymPy symbols and expression
        try:
            symbols = {}
            for var_name in rule.variables:
                symbols[var_name] = sympy.Symbol(var_name)

            # Parse the formula
            expr = sympy.sympify(rule.formula, locals=symbols)

            # Substitute known values
            subs = {}
            for var_name, val in var_values.items():
                if var_name in symbols and var_name != rule.unknown:
                    subs[symbols[var_name]] = val

            # Also substitute constants not in rule.variables
            for var_name, val in var_values.items():
                if var_name not in symbols and var_name != rule.unknown:
                    sym = sympy.Symbol(var_name)
                    symbols[var_name] = sym
                    subs[sym] = val

            # Solve for the unknown
            unknown_sym = symbols.get(rule.unknown)

            if unknown_sym is None:
                # The unknown is the formula result itself
                result = expr.subs(subs)
            else:
                # Set up equation: unknown = formula
                eq = sympy.Eq(unknown_sym, expr)
                solutions = sympy.solve(eq, unknown_sym)
                if not solutions:
                    return None
                result = solutions[0]

            # Generate steps
            steps = self._generate_steps(rule, var_values, expr, result, symbols)

            # Format final answer
            final = self._format_result(result, rule)

            return Solution(
                matched=True,
                question_type=q_type,
                steps=steps,
                final_answer=final,
                method="rule_engine",
                node_id=rule.node_id,
                confidence=1.0,
            )

        except Exception as e:
            logger.error(f"Rule {rule.name} failed: {e}")
            return None

    def _try_constant_rule(self, rule: Rule, question: str, q_type: str) -> Optional[Solution]:
        """Handle rules with no variables (constant/fixed answers).

        These are recall/fact rules like:
        - valine fourth codon → GUG
        - sex-linked haemophilia probability → 0.25
        - die probability even → 0.5
        - rate constant s⁻¹ → first order
        """
        try:
            # Try to evaluate the formula as a SymPy expression
            expr = sympy.sympify(rule.formula)
            result = expr

            # Format the answer
            if result.is_number:
                val = float(result)
                if val == int(val) and abs(val) < 1e15:
                    final = str(int(val))
                else:
                    final = f"{val:.4f}".rstrip('0').rstrip('.')
            else:
                final = str(result)

            return Solution(
                matched=True,
                question_type=q_type,
                steps=[Step(
                    step_number=1,
                    description=rule.explanation,
                    expression=rule.formula,
                    result=final,
                )],
                final_answer=final,
                method="rule_engine",
                node_id=rule.node_id,
                confidence=1.0,
            )
        except Exception:
            # If formula can't be parsed as SymPy, treat it as a string answer
            final = rule.formula
            return Solution(
                matched=True,
                question_type=q_type,
                steps=[Step(
                    step_number=1,
                    description=rule.explanation,
                    expression=rule.formula,
                    result=final,
                )],
                final_answer=final,
                method="rule_engine",
                node_id=rule.node_id,
                confidence=1.0,
            )

    def _generate_steps(self, rule: Rule, var_values: dict, expr, result, symbols: dict) -> list[Step]:
        """Generate step-by-step explanation."""
        steps = []

        # Step 1: Identify the formula
        steps.append(Step(
            step_number=1,
            description=rule.explanation,
            expression=rule.formula,
        ))

        # Step 2: List known values
        values_str = ", ".join(f"{k} = {v}" for k, v in var_values.items() if k != rule.unknown)
        steps.append(Step(
            step_number=2,
            description=f"Given values: {values_str}",
            expression=f"{rule.unknown} = {rule.formula}",
        ))

        # Step 3: Substitute and compute
        subs_dict = {symbols[k]: v for k, v in var_values.items() if k in symbols and k != rule.unknown}
        substituted = expr.subs(subs_dict)
        steps.append(Step(
            step_number=3,
            description="Substitute values into the formula",
            expression=f"{rule.unknown} = {substituted}",
            result=str(result),
        ))

        return steps

    def _format_result(self, result, rule: Rule) -> str:
        """Format the final result as a string."""
        try:
            if result.is_number:
                val = float(result)

                # Check for simple fractions (1/2, 1/4, 3/4, etc.)
                rat = sympy.nsimplify(result, rational=True, tolerance=1e-10)
                if rat.is_rational and rat.q <= 12 and rat.p != 0:
                    p, q = int(rat.p), int(rat.q)
                    if q == 1:
                        return str(p)
                    # Check if it's a common fraction
                    if q in (2, 3, 4, 5, 6, 8, 10):
                        return f"{p}/{q}"

                if val == int(val) and abs(val) < 1e15:
                    return str(int(val))
                # For very small or very large numbers, use scientific notation
                if abs(val) < 0.001 or abs(val) > 1e6:
                    return f"{val:.4e}"
                return f"{val:.4f}".rstrip('0').rstrip('.')
            else:
                return str(result)
        except (AttributeError, TypeError):
            return str(result)


# =========================================================================== #
# PROPORTIONAL REASONING ENGINE
# =========================================================================== #

class ProportionalReasoner:
    """Answer 'how does X vary with Y?' and 'what happens if X doubles?'

    Uses SymPy to compute partial derivatives and determine the relationship.
    """

    @staticmethod
    def solve(question: str, formula: str, x_var: str, y_var: str) -> Optional[Solution]:
        """Solve a proportional/what-if question."""
        try:
            x = sympy.Symbol(x_var)
            y = sympy.Symbol(y_var)

            expr = sympy.sympify(formula)

            q_lower = question.lower()

            if "how does" in q_lower or "vary" in q_lower or "proportional" in q_lower:
                # "How does X vary with Y?"
                # Compute partial derivative
                deriv = sympy.diff(expr, x)
                # Simplify and check sign
                deriv_simplified = sympy.simplify(deriv)

                # Try to determine sign
                is_positive = False
                is_negative = False

                # Method 1: Check if derivative is a simple expression
                if deriv_simplified.is_number:
                    if float(deriv_simplified) > 0:
                        is_positive = True
                    elif float(deriv_simplified) < 0:
                        is_negative = True
                else:
                    # Method 2: Substitute positive test values
                    test_subs = {x: 1}
                    # Set all other symbols to 1
                    for sym in deriv_simplified.free_symbols:
                        if sym != x:
                            test_subs[sym] = 1

                    test_val = deriv_simplified.subs(test_subs)
                    if test_val.is_number:
                        if float(test_val) > 0:
                            is_positive = True
                        elif float(test_val) < 0:
                            is_negative = True
                    else:
                        # Method 3: Check the structure
                        # If formula is h/x, derivative is -h/x² which is negative
                        # If formula is x*y, derivative is y which is positive
                        deriv_str = str(deriv_simplified)
                        if deriv_str.startswith("-"):
                            is_negative = True
                        else:
                            is_positive = True

                if is_positive:
                    answer = f"directly proportional to {x_var}"
                elif is_negative:
                    answer = f"inversely proportional to {x_var}"
                else:
                    answer = f"related to {x_var} by: {y_var} = {formula}"

                return Solution(
                    matched=True,
                    question_type="proportional",
                    steps=[Step(
                        step_number=1,
                        description=f"From {y_var} = {formula}, the relationship between {y_var} and {x_var} is determined by the partial derivative ∂{y_var}/∂{x_var} = {deriv_simplified}.",
                        expression=f"{y_var} = {formula}",
                        result=answer,
                    )],
                    final_answer=answer,
                    method="proportional",
                )

            elif "what happens" in q_lower or "doubled" in q_lower or "halved" in q_lower:
                # "What happens if X doubles?"
                f_x = expr
                f_2x = expr.subs(x, 2 * x)
                ratio = sympy.simplify(f_2x / f_x)

                if ratio == 2:
                    answer = "doubled"
                elif ratio == sympy.Rational(1, 2):
                    answer = "halved"
                elif ratio == 4:
                    answer = "quadrupled"
                elif ratio == sympy.Rational(1, 4):
                    answer = "quartered"
                elif ratio == 1:
                    answer = "unchanged"
                else:
                    answer = f"multiplied by {ratio}"

                return Solution(
                    matched=True,
                    question_type="what_if",
                    steps=[
                        Step(
                            step_number=1,
                            description=f"From {y_var} = {formula}, compute the effect of doubling {x_var}.",
                            expression=f"{y_var} = {formula}",
                        ),
                        Step(
                            step_number=2,
                            description=f"Replace {x_var} with 2×{x_var}: {y_var}' = {f_2x}",
                            expression=f"{y_var}' = {f_2x}",
                        ),
                        Step(
                            step_number=3,
                            description=f"Ratio: {y_var}' / {y_var} = {ratio}",
                            expression=f"{y_var}' / {y_var} = {ratio}",
                            result=answer,
                        ),
                    ],
                    final_answer=answer,
                    method="proportional",
                )

        except Exception as e:
            logger.error(f"Proportional reasoning failed: {e}")

        return None


# =========================================================================== #
# MAIN ENGINE (facade)
# =========================================================================== #

# Synonyms for variable descriptions — used for proportional/what-if matching
SYNONYMS = {
    "voltage": ["potential difference", "voltage", "pd", "emf"],
    "current": ["current", "amperage"],
    "resistance": ["resistance", "resistivity"],
    "mass": ["mass", "weight"],
    "volume": ["volume"],
    "temperature": ["temperature"],
    "pressure": ["pressure", "osmotic pressure"],
    "momentum": ["momentum"],
    "frequency": ["frequency"],
    "wavelength": ["wavelength", "lambda"],
    "charge": ["charge", "coulomb"],
    "distance": ["distance", "separation"],
    "time": ["time", "period"],
    "speed": ["speed", "velocity"],
    "radius": ["radius", "radius of curvature"],
    "turns": ["turns", "coils"],
    "refractive_index": ["refractive index", "index of refraction"],
    "molar_mass": ["molar mass", "molecular weight", "atomic mass"],
    "concentration": ["concentration", "molarity"],
    "moles": ["moles", "mole"],
    "force": ["force"],
    "energy": ["energy"],
    "power": ["power"],
    "area": ["area", "cross section"],
    "electron_density": ["electron density", "number density"],
}


class ReasoningEngine:
    """Main facade for the symbolic reasoning engine."""

    def __init__(self):
        self.rule_engine = RuleEngine()
        self.proportional_reasoner = ProportionalReasoner()

    def add_rules(self, rules: list[Rule]):
        self.rule_engine.add_rules(rules)

    def solve(self, question: str, subject: str = None, class_level: int = None) -> Optional[Solution]:
        """Solve a question."""
        q_type = QuestionClassifier.classify(question)

        if q_type == "definition":
            return None

        if q_type in ("proportional", "what_if"):
            # Try proportional reasoning
            matching = self.rule_engine.find_matching_rules(question, subject)
            for rule in matching:
                q_lower = question.lower()
                x_var = ""
                y_var = rule.unknown

                # Find what variable is being changed/asked about
                # Check variable descriptions and their synonyms
                for var_name, desc in rule.variables.items():
                    # Check the description
                    if desc and desc in q_lower:
                        x_var = var_name
                        break
                    # Check synonyms
                    synonyms = SYNONYMS.get(desc, [])
                    for syn in synonyms:
                        if syn in q_lower:
                            x_var = var_name
                            break
                    if x_var:
                        break

                # Also check if the variable name itself is in the question
                if not x_var:
                    for var_name in rule.variables:
                        if var_name.lower() in q_lower:
                            x_var = var_name
                            break

                if x_var and y_var:
                    sol = self.proportional_reasoner.solve(
                        question, rule.formula, x_var, y_var
                    )
                    if sol and sol.matched:
                        return sol

        # For numerical and symbolic: use rule engine
        return self.rule_engine.solve(question, subject, class_level)
