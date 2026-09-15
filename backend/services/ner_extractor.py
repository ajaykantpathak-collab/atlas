"""NER extractor for student answers — math/chem/science entity extraction.

Uses spaCy + custom EntityRuler for rule-based entity extraction (no training
needed). Extracts structured entities from student free-text answers so the
interpreter loop can verify them with SymPy/pint/chempy.

Custom entity types:
  - NUMBER: "25", "twenty-five", "3.14", "1/2"
  - EXPRESSION: "x^2 + 2x + 1", "sin(x)", "3x + 5"
  - VARIABLE: "x", "y", "n", "theta"
  - UNIT: "km/h", "kg/m^3", "m/s^2", "J", "N"
  - CHEMICAL: "H2O", "NaCl", "CO2", "H2SO4"
  - EQUATION: "x^2 = 4", "2x + 3 = 7"
  - INTERVAL: "[0, 5)", "(−∞, 3]", "{1, 2, 3}"
  - MATRIX: "[[1,2],[3,4]]"
  - PERCENTAGE: "25%", "50 percent"

Usage:
    from backend.services.ner_extractor import NERExtractor

    extractor = NERExtractor()
    entities = extractor.extract("The derivative of x^2 + 2x at x=3 is 8 m/s")

    # entities = {
    #     "expressions": ["x**2 + 2*x"],
    #     "variables": ["x"],
    #     "numbers": [3, 8],
    #     "units": ["m/s"],
    #     "chemicals": [],
    #     "equations": [],
    #     "has_math": True,
    # }
"""

import re
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ExtractedEntities:
    """Entities extracted from a student answer."""
    numbers: list = field(default_factory=list)          # [3, 8, 3.14]
    expressions: list = field(default_factory=list)       # ["x**2 + 2*x"]
    variables: list = field(default_factory=list)         # ["x", "y"]
    units: list = field(default_factory=list)             # ["m/s", "kg"]
    chemicals: list = field(default_factory=list)         # ["H2O", "NaCl"]
    equations: list = field(default_factory=list)         # ["x**2 = 4"]
    intervals: list = field(default_factory=list)         # ["[0, 5)"]
    matrices: list = field(default_factory=list)          # ["[[1,2],[3,4]]"]
    percentages: list = field(default_factory=list)       # [25.0, 50.0]
    has_math: bool = False
    has_chemistry: bool = False
    has_units: bool = False
    raw_text: str = ""


class NERExtractor:
    """Extracts math/chem/science entities from student free-text answers.

    Uses regex-based patterns (no spaCy model dependency for core extraction).
    spaCy is used optionally for sentence segmentation and word-to-number
    conversion when available.
    """

    # ── Regex patterns ────────────────────────────────────────────── #

    # Numbers: integers, decimals, fractions, scientific notation
    NUMBER_PATTERN = re.compile(
        r"(?<![a-zA-Z])"  # Not preceded by a letter (avoid matching variables)
        r"[-+]?(?:\d+\.\d+|\d+/\d+|\d+(?:,\d{3})*(?:\.\d+)?|\d+)"
        r"(?:[eE][-+]?\d+)?"
        r"(?![a-zA-Z])"  # Not followed by a letter
    )

    # Word numbers: "twenty-five", "one hundred", "three point five"
    WORD_NUMBER_MAP = {
        "zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
        "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
        "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
        "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
        "nineteen": 19, "twenty": 20, "thirty": 30, "forty": 40, "fifty": 50,
        "sixty": 60, "seventy": 70, "eighty": 80, "ninety": 90,
        "hundred": 100, "thousand": 1000, "million": 1000000,
    }
    WORD_NUMBER_PATTERN = re.compile(
        r"\b(?:"
        r"zero|one|two|three|four|five|six|seven|eight|nine|ten|"
        r"eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|"
        r"eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|"
        r"eighty|ninety|hundred|thousand|million"
        r")(?:[-\s]+(?:zero|one|two|three|four|five|six|seven|eight|nine|"
        r"ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|"
        r"eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|"
        r"eighty|ninety|hundred|thousand|million))*\b",
        re.IGNORECASE,
    )

    # Chemical formulas: H2O, NaCl, CO2, H2SO4, C6H12O6, Fe2O3
    # Pattern: element symbol (capital + optional lowercase) + optional number
    CHEMICAL_PATTERN = re.compile(
        r"\b(?:(?:[A-Z][a-z]?\d*){2,})\b"
        r"(?![a-z])"  # Not followed by lowercase (avoid matching words)
    )

    # Units: km/h, kg/m^3, m/s^2, J, N, Pa, mol/L, g/cm^3
    # Common SI and derived units
    UNIT_PATTERNS = [
        # Compound units with / or ^
        re.compile(r"\b(?:km|m|cm|mm|kg|g|mg|s|min|h|N|J|W|Pa|kPa|MPa|"
                   r"mol|L|mL|A|V|Hz|cd|lux|°C|°F|K)"
                   r"(?:/(?:s|min|h|m|cm|mm|kg|g|L|mL|mol))?"
                   r"(?:\^?\d)?\b"),
        # m/s, m/s^2
        re.compile(r"\bm/s(?:\^?2)?\b"),
        # kg/m^3, g/cm^3
        re.compile(r"\b(?:kg|g)/(?:m|cm)\^?3\b"),
        # mol/L
        re.compile(r"\bmol/L\b"),
        # Percentage
        re.compile(r"\b\d+(?:\.\d+)?\s*(?:%|percent|per\s*cent)\b", re.IGNORECASE),
    ]

    # Math expressions: x^2 + 2x + 1, sin(x), 3x + 5, x**2
    # This is intentionally broad — the interpreter loop will verify with SymPy
    EXPRESSION_PATTERN = re.compile(
        r"(?:"
        # Variables with exponents: x^2, x**2, y^3
        r"[a-zA-Z](?:\^|\*\*)?\d*"
        # Coefficient + variable: 3x, 2y, 5n
        r"|\d+[a-zA-Z](?![a-zA-Z])"
        # Functions: sin(x), cos(x), log(x), sqrt(x), exp(x)
        r"|(?:sin|cos|tan|log|ln|sqrt|exp|abs|sec|csc|cot)\s*\([^)]+\)"
        # Operators
        r"|[-+*/^()=]"
        r"|[-+]?\d+(?:\.\d+)?"
        r")+"
    )

    # Equations: x^2 = 4, 2x + 3 = 7
    EQUATION_PATTERN = re.compile(
        r"(?:[a-zA-Z0-9\.\^*+\-/()\s\[\]]+?)\s*=\s*(?:[a-zA-Z0-9\.\^*+\-/()\s\[\]]+?)"
    )

    # Intervals: [0, 5), (−∞, 3], {1, 2, 3}
    INTERVAL_PATTERN = re.compile(
        r"(?:[\[\(]\s*[-+]?(?:∞|infinity|inf|\d+(?:\.\d+)?)\s*,\s*"
        r"[-+]?(?:∞|infinity|inf|\d+(?:\.\d+)?)\s*[\]\)])"
        r"|(?:\{[^}]+\})"
    )

    # Matrices: [[1,2],[3,4]]
    MATRIX_PATTERN = re.compile(
        r"\[\s*\[[-+]?\d+(?:\.\d+)?(?:\s*,\s*[-+]?\d+(?:\.\d+)?)*\s*\]"
        r"(?:\s*,\s*\[[-+]?\d+(?:\.\d+)?(?:\s*,\s*[-+]?\d+(?:\.\d+)?)*\s*\])*\s*\]"
    )

    # Variables: single letters that appear in expressions (not common words)
    # Exclude common English words: a, I (too ambiguous)
    VARIABLE_PATTERN = re.compile(r"\b([a-zA-Z])\b(?![a-zA-Z])")

    # Common English words to exclude from variable extraction
    NON_VARIABLES = {"a", "I", "i", "A", "x", "y", "z", "n", "t", "r", "k",
                     "X", "Y", "Z", "N", "T", "R", "K", "u", "v", "w",
                     "U", "V", "W", "p", "q", "s", "P", "Q", "S", "f",
                     "F", "g", "G", "h", "H", "j", "J", "l", "L", "m",
                     "M", "b", "B", "c", "C", "d", "D", "e", "E"}

    # ── Initialization ────────────────────────────────────────────── #

    def __init__(self, use_spacy: bool = True):
        """Initialize the NER extractor.

        Args:
            use_spacy: If True, use spaCy for sentence segmentation and
                       word-to-number conversion. Falls back to regex only
                       if spaCy is not available.
        """
        self._nlp = None
        if use_spacy:
            try:
                import spacy
                self._nlp = spacy.load("en_core_web_sm", disable=["ner", "lemmatizer", "tagger"])
            except Exception:
                self._nlp = None

    # ── Main extraction method ────────────────────────────────────── #

    def extract(self, text: str) -> ExtractedEntities:
        """Extract all entities from a student answer.

        Args:
            text: The student's free-text answer.

        Returns:
            ExtractedEntities with all detected entities.
        """
        if not text or not text.strip():
            return ExtractedEntities()

        result = ExtractedEntities(raw_text=text)

        # Extract numbers
        result.numbers = self._extract_numbers(text)

        # Extract word numbers and convert
        word_nums = self._extract_word_numbers(text)
        result.numbers.extend(word_nums)

        # Extract percentages
        result.percentages = self._extract_percentages(text)

        # Extract matrices (before expressions to avoid partial matches)
        result.matrices = self._extract_matrices(text)
        result.has_math = result.has_math or bool(result.matrices)

        # Extract intervals (before expressions)
        result.intervals = self._extract_intervals(text)
        result.has_math = result.has_math or bool(result.intervals)

        # Extract equations (before expressions)
        result.equations = self._extract_equations(text)
        result.has_math = result.has_math or bool(result.equations)

        # Extract expressions
        result.expressions = self._extract_expressions(text)
        result.has_math = result.has_math or bool(result.expressions)

        # Extract variables
        result.variables = self._extract_variables(text)
        result.has_math = result.has_math or bool(result.variables)

        # Extract chemicals
        result.chemicals = self._extract_chemicals(text)
        result.has_chemistry = bool(result.chemicals)

        # Extract units
        result.units = self._extract_units(text)
        result.has_units = bool(result.units)

        return result

    # ── Individual extraction methods ─────────────────────────────── #

    def _extract_numbers(self, text: str) -> list:
        """Extract numeric values from text."""
        numbers = []
        for match in self.NUMBER_PATTERN.finditer(text):
            raw = match.group().replace(",", "")
            try:
                if "/" in raw:
                    num, den = raw.split("/")
                    numbers.append(float(num) / float(den))
                elif "." in raw or "e" in raw.lower():
                    numbers.append(float(raw))
                else:
                    numbers.append(int(raw))
            except (ValueError, ZeroDivisionError):
                continue
        return numbers

    def _extract_word_numbers(self, text: str) -> list:
        """Convert word numbers to integers."""
        numbers = []
        for match in self.WORD_NUMBER_PATTERN.finditer(text):
            words = re.split(r"[-\s]+", match.group().lower())
            total = 0
            current = 0
            for word in words:
                if word in self.WORD_NUMBER_MAP:
                    val = self.WORD_NUMBER_MAP[word]
                    if val >= 100:
                        current = max(current, 1) * val
                        if val >= 1000:
                            total += current
                            current = 0
                    else:
                        current += val
            total += current
            if total > 0:
                numbers.append(total)
        return numbers

    def _extract_percentages(self, text: str) -> list:
        """Extract percentage values."""
        percentages = []
        pattern = re.compile(r"(\d+(?:\.\d+)?)\s*(?:%|percent|per\s*cent)", re.IGNORECASE)
        for match in pattern.finditer(text):
            try:
                percentages.append(float(match.group(1)))
            except ValueError:
                continue
        return percentages

    def _extract_matrices(self, text: str) -> list:
        """Extract matrix expressions like [[1,2],[3,4]]."""
        matrices = []
        for match in self.MATRIX_PATTERN.finditer(text):
            matrices.append(match.group().strip())
        return matrices

    def _extract_intervals(self, text: str) -> list:
        """Extract interval notation like [0, 5), (−∞, 3]."""
        intervals = []
        for match in self.INTERVAL_PATTERN.finditer(text):
            intervals.append(match.group().strip())
        return intervals

    def _extract_equations(self, text: str) -> list:
        """Extract equations (expressions with = sign)."""
        equations = []
        for match in self.EQUATION_PATTERN.finditer(text):
            eq = match.group().strip()
            # Normalize: x^2 → x**2
            eq = self._normalize_expression(eq)
            if len(eq) > 3:  # Skip trivial matches
                equations.append(eq)
        return equations

    def _extract_expressions(self, text: str) -> list:
        """Extract mathematical expressions."""
        expressions = []

        # Find expression-like sequences
        # Look for patterns with operators and variables/numbers
        # Order matters: try longer patterns first

        # Pattern 1: Parenthesized expressions with exponents: (x+1)^2, (x+1)**2
        paren_pattern = re.compile(
            r"\([^)]+\)\s*(?:\^|\*\*)\s*\d+"
        )
        for match in paren_pattern.finditer(text):
            expr = self._normalize_expression(match.group().strip())
            if len(expr) > 1 and expr not in expressions:
                expressions.append(expr)

        # Pattern 2: Function calls: sin(x), sqrt(x), log(x), sin^2(x), e^x
        func_pattern = re.compile(
            r"(?:"
            # Functions with exponents: sin^2(x), cos^2(x), e^x
            r"(?:sin|cos|tan|log|ln|sqrt|exp|abs|sec|csc|cot|e)"
            r"(?:\^|\*\*)?\d*"
            r"\s*\([^)]+\)"
            # e^x without parens
            r"|e\^x"
            # Standard function calls: sin(x), sqrt(x)
            r"|(?:sin|cos|tan|log|ln|sqrt|exp|abs|sec|csc|cot)\s*\([^)]+\)"
            r")"
        )
        for match in func_pattern.finditer(text):
            expr = self._normalize_expression(match.group().strip())
            if len(expr) > 1 and expr not in expressions:
                expressions.append(expr)

        # Pattern 3: Polynomial-like: 3x^2 + 2x + 1, x^2 + 2*x + 1, sin(x)**2 + cos(x)**2
        # Matches both pre-normalize (sin^2(x)) and post-normalize (sin(x)**2) forms
        # IMPORTANT: func terms are tried BEFORE simple terms to avoid matching
        # single letters from function names (e.g., 'c' from 'cos')
        poly_pattern = re.compile(
            r"(?:[-+]?\s*"
            r"(?:"
            r"(?:sin|cos|tan|log|ln|sqrt|exp|abs|sec|csc|cot)"
            r"(?:\([^)]+\)(?:\*\*)?\d*|(?:\^|\*\*)?\d*\s*\([^)]+\))"  # func term
            r"|\d*\*?[a-zA-Z]?(?:\^|\*\*)?\d*"  # simple term: 3x^2, x, 2*x
            r")"
            r"(?:\s*[-+*/]\s*[-+]?\s*"
            r"(?:"
            r"(?:sin|cos|tan|log|ln|sqrt|exp|abs|sec|csc|cot)"
            r"(?:\([^)]+\)(?:\*\*)?\d*|(?:\^|\*\*)?\d*\s*\([^)]+\))"
            r"|\d*\*?[a-zA-Z]?(?:\^|\*\*)?\d*"
            r"))+)"
        )
        for match in poly_pattern.finditer(text):
            expr = self._normalize_expression(match.group().strip())
            if len(expr) > 1 and expr not in expressions:
                expressions.append(expr)

        # Pattern 4: Coefficient + variable: 3x, -2y
        coeff_pattern = re.compile(
            r"(?:[-+]?\d+[a-zA-Z](?![a-zA-Z]))"
        )
        for match in coeff_pattern.finditer(text):
            expr = self._normalize_expression(match.group().strip())
            if len(expr) > 1 and expr not in expressions:
                expressions.append(expr)

        # Pattern 5: Variable with exponent: x^2, y**3
        var_exp_pattern = re.compile(
            r"(?:[a-zA-Z](?:\^|\*\*)\d+)"
        )
        for match in var_exp_pattern.finditer(text):
            expr = self._normalize_expression(match.group().strip())
            if len(expr) > 1 and expr not in expressions:
                expressions.append(expr)

        return expressions

    def _extract_variables(self, text: str) -> list:
        """Extract single-letter variables from text."""
        variables = []
        seen = set()

        for match in self.VARIABLE_PATTERN.finditer(text):
            var = match.group(1)
            if var not in seen and var not in {"a", "A", "I", "i"}:
                # Check if it's in a math context (near operators, numbers, exponents)
                start = max(0, match.start() - 3)
                end = min(len(text), match.end() + 3)
                context = text[start:end]
                if re.search(r"[\d+\-*/^=]|sin|cos|tan|log|sqrt", context):
                    variables.append(var)
                    seen.add(var)

        return variables

    def _extract_chemicals(self, text: str) -> list:
        """Extract chemical formulas."""
        chemicals = []
        seen = set()

        for match in self.CHEMICAL_PATTERN.finditer(text):
            formula = match.group().strip()
            # Validate: must have at least 2 element symbols
            elements = re.findall(r"[A-Z][a-z]?", formula)
            if len(elements) >= 2 and formula not in seen:
                # Basic validation: each element symbol is valid
                valid_elements = {
                    "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne",
                    "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca",
                    "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
                    "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
                    "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn",
                    "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
                    "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb",
                    "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
                    "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th",
                    "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm",
                    "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds",
                    "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og",
                }
                if all(e in valid_elements for e in elements):
                    chemicals.append(formula)
                    seen.add(formula)

        return chemicals

    def _extract_units(self, text: str) -> list:
        """Extract physical units."""
        units = []
        seen = set()

        for pattern in self.UNIT_PATTERNS:
            for match in pattern.finditer(text):
                unit = match.group().strip()
                if unit not in seen:
                    units.append(unit)
                    seen.add(unit)

        return units

    # ── Helper methods ────────────────────────────────────────────── #

    @staticmethod
    def _normalize_expression(expr: str) -> str:
        """Normalize a math expression to SymPy-compatible notation.

        - x^2 → x**2
        - 3x → 3*x
        - 2(x+1) → 2*(x+1)
        - sin^2(x) → sin(x)**2  (function with exponent before args)
        - e^x → exp(x)  (exponential shorthand)
        - √x → sqrt(x)
        - |x| → Abs(x)
        """
        # Unicode replacements
        replacements = {
            "²": "**2", "³": "**3", "·": "*", "×": "*", "÷": "/",
            "−": "-", "–": "-", "√": "sqrt", "π": "pi", "∞": "oo",
            "≤": "<=", "≥": ">=", "≠": "!=", "≈": "~",
            "∑": "Sum", "∫": "Integral", "∂": "Derivative",
            "θ": "theta", "α": "alpha", "β": "beta", "γ": "gamma",
            "λ": "lambda", "μ": "mu", "Δ": "Delta", "Σ": "Sigma",
            "Ω": "Omega", "Φ": "Phi", "Ψ": "Psi",
        }
        for old, new in replacements.items():
            expr = expr.replace(old, new)

        # Fix function^exponent(args) → function(args)**exponent
        # e.g., sin^2(x) → sin(x)**2, cos^2(x) → cos(x)**2
        func_names = {"sin", "cos", "tan", "log", "ln", "sqrt", "exp", "abs",
                      "sec", "csc", "cot", "asin", "acos", "atan"}
        for func in func_names:
            # sin^2(x) → sin(x)**2
            expr = re.sub(
                rf"\b{func}\^(\d+)\s*\(",
                rf"{func}(\1__EXP__",
                expr,
            )
            expr = re.sub(
                rf"\b{func}\*\*(\d+)\s*\(",
                rf"{func}(\1__EXP__",
                expr,
            )
        # Close paren and add exponent: sin(2__EXP__x) → sin(x)**2
        expr = re.sub(r"(\d+)__EXP__([^)]+)\)", r"\2)**\1", expr)

        # e^x → exp(x) (shorthand for exponential)
        expr = re.sub(r"\be\^([a-zA-Z]\w*)", r"exp(\1)", expr)
        expr = re.sub(r"\be\*\*([a-zA-Z]\w*)", r"exp(\1)", expr)

        # x^2 → x**2 (but not x**2 already)
        expr = re.sub(r"\^", "**", expr)

        # 3x → 3*x (coefficient before variable, no operator)
        expr = re.sub(r"(\d)([a-zA-Z])", r"\1*\2", expr)

        # 2(x+1) → 2*(x+1) (number before parenthesis)
        expr = re.sub(r"(\d)\(", r"\1*(", expr)

        # )(  →  )*(
        expr = re.sub(r"\)\(", r")*(", expr)

        # x( → x*(  (variable before parenthesis, but not function names)
        for func in func_names:
            expr = re.sub(rf"\b{func}\*", f"{func}", expr)
        expr = re.sub(r"([a-zA-Z])\(", r"\1*(", expr)
        for func in func_names:
            expr = re.sub(rf"\b{func}\*\(", f"{func}(", expr)

        # |x| → Abs(x)
        expr = re.sub(r"\|([^|]+)\|", r"Abs(\1)", expr)

        return expr.strip()
