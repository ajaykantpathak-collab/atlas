"""Node-mapped templates for Mathematics Class 10 (ICSE).

Each template is traceable to a specific atomic curriculum node via `node_id`.
"""

MATH_C10_NODE_TEMPLATES = [

# c10_math_001: GST — CGST = (rate/2)% of marked price, total GST = rate% of MP
{
    "template_name": "c10_math_001_gst_rate_from_cgst",
    "node_id": "c10_math_001",
    "normalized_pattern": "cgst paid to central government marked price find rate of gst",
    "keywords": ["cgst", "gst", "marked price", "rate", "central government", "intra-state"],
    "variables": [
        {"name": "CGST", "patterns": [r"CGST.*?(?:Rs\.?\s*|₹\s*)?(\d+\.?\d*)", r"CGST\s*(?:paid|is|=|:).*?(\d+\.?\d*)"], "required": True},
        {"name": "MP", "patterns": [r"marked price.*?(?:Rs\.?\s*|₹\s*)?(\d+\.?\d*)", r"MP\s*[=:]\s*(\d+\.?\d*)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {CGST} * 100 / {MP} * 2", "purpose": "CGST = (rate/2)% × MP → rate = (CGST × 100 / MP) × 2. Total GST rate = 2 × CGST rate."},
    ],
    "subject": "math",
},

# c10_math_001: GST — final price from MP and rate
{
    "template_name": "c10_math_001_gst_final_price",
    "node_id": "c10_math_001",
    "normalized_pattern": "find final price if marked price and gst rate given",
    "keywords": ["gst", "final price", "marked price", "rate", "selling price", "payable"],
    "variables": [
        {"name": "MP", "patterns": [r"marked price\s*(?:is|=|:|of)?\s*(?:Rs\.?\s*|₹\s*)?(\d+\.?\d*)", r"(\d+\.?\d*)\s*(?:is\s+)?marked price"], "required": True},
        {"name": "rate", "patterns": [r"rate\s*(?:of\s+gst\s*)?[=:]\s*(\d+\.?\d*)\s*%", r"GST\s*(?:rate\s*)?[=:]\s*(\d+\.?\d*)\s*%", r"(\d+\.?\d*)\s*%\s*GST"], "required": True},
    ],
    "steps": [
        {"command": "calculate {MP} * (1 + {rate} / 100)", "purpose": "Final price = MP × (1 + GST rate/100)"},
    ],
    "subject": "math",
},

# c10_math_019: Remainder theorem — subtract f(a) to make divisible by (x-a)
{
    "template_name": "c10_math_019_remainder_theorem_subtract",
    "node_id": "c10_math_019",
    "normalized_pattern": "what must be subtracted from polynomial so result divisible by x minus a",
    "keywords": ["subtracted", "polynomial", "divisible", "remainder theorem", "exactly divisible"],
    "variables": [
        {"name": "a", "patterns": [r"\(x\s*-\s*(\d+\.?\d*)\)", r"x\s*-\s*(\d+\.?\d*)", r"divisor.*?(\d+\.?\d*)"], "required": True},
        {"name": "c3", "patterns": [r"x\^?3.*?(\d+\.?\d*)", r"(\d+\.?\d*)\s*x\^?3", r"(\d+\.?\d*)x3"], "required": False, "default": "1"},
        {"name": "c2", "patterns": [r"x\^?2.*?(\d+\.?\d*)", r"(\d+\.?\d*)\s*x\^?2", r"(\d+\.?\d*)x2"], "required": False, "default": "1"},
        {"name": "c1", "patterns": [r"-?\s*(\d+\.?\d*)\s*x\b", r"([-]?\d+\.?\d*)\s*x(?!\^)"], "required": False, "default": "-2"},
        {"name": "c0", "patterns": [r"(\d+\.?\d*)\s*$", r"plus\s*(\d+\.?\d*)\s*$", r"\+\s*(\d+\.?\d*)\s*$"], "required": False, "default": "1"},
    ],
    "steps": [
        {"command": "calculate {c3} * {a}**3 + {c2} * {a}**2 + {c1} * {a} + {c0}", "purpose": "By remainder theorem, f(a) must be subtracted. f(a) = c3×a³ + c2×a² + c1×a + c0"},
    ],
    "subject": "math",
    "note": "This template extracts polynomial coefficients from the question. The coefficients need to be parsed from the actual polynomial expression.",
},

# c10_math_014: Quadratic discriminant — real and equal roots when b² = 4ac
{
    "template_name": "c10_math_014_discriminant_equal_roots",
    "node_id": "c10_math_014",
    "normalized_pattern": "roots real and equal condition quadratic equation discriminant",
    "keywords": ["roots", "real", "equal", "quadratic", "discriminant", "condition", "nature of roots"],
    "variables": [],
    "steps": [
        {"command": "calculate 0", "purpose": "For quadratic ax² + bx + c = 0, roots are real and equal when discriminant D = b² - 4ac = 0, i.e., b² = 4ac"},
    ],
    "subject": "math",
    "rule": "Real and equal roots: b² = 4ac (discriminant = 0). Real and distinct: b² > 4ac. No real roots: b² < 4ac.",
},

# c10_math_077: Median with unknown — (x + x+4)/2 = median
{
    "template_name": "c10_math_077_median_unknown",
    "node_id": "c10_math_077",
    "normalized_pattern": "median of observations with unknown x find x arranged ascending order",
    "keywords": ["median", "observations", "ascending", "find x", "unknown", "arranged"],
    "variables": [
        {"name": "median_val", "patterns": [r"median\s*(?:is|=|:)\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*(?:is\s+)?median"], "required": True},
        {"name": "offset", "patterns": [r"x\s*\+\s*(\d+\.?\d*)", r"x\s*\+\s*(\d+)"], "required": False, "default": "4"},
    ],
    "steps": [
        {"command": "calculate 2 * {median_val} - {offset}", "purpose": "For even number of observations, median = (middle1 + middle2)/2. If middle values are x and x+offset: (x + x + offset)/2 = median → x = 2×median - offset"},
    ],
    "subject": "math",
},

# c10_math_006: Shares — investment = number × market value
{
    "template_name": "c10_math_006_shares_investment",
    "node_id": "c10_math_006",
    "normalized_pattern": "find sum invested to purchase shares if nominal value and discount or premium given",
    "keywords": ["shares", "invested", "nominal value", "discount", "premium", "market value", "purchase", "sum"],
    "variables": [
        {"name": "num_shares", "patterns": [r"(\d+)\s*shares?", r"purchase\s*(\d+)\s*shares?", r"(\d+)\s*(?:shares?|of\s+a\s+company)"], "required": True},
        {"name": "FV", "patterns": [r"nominal value.*?(?:Rs\.?\s*|₹\s*)?(\d+\.?\d*)", r"face value.*?(?:Rs\.?\s*|₹\s*)?(\d+\.?\d*)"], "required": True},
        {"name": "discount", "patterns": [r"discount\s*(?:of\s*)?(\d+\.?\d*)\s*%", r"(\d+\.?\d*)\s*%\s*discount"], "required": False, "default": "0"},
        {"name": "premium", "patterns": [r"premium\s*(?:of\s*)?(\d+\.?\d*)\s*%", r"(\d+\.?\d*)\s*%\s*premium"], "required": False, "default": "0"},
    ],
    "steps": [
        {"command": "calculate {num_shares} * {FV} * (1 - {discount} / 100 + {premium} / 100)", "purpose": "MV = FV × (1 - discount/100 + premium/100). Investment = num_shares × MV"},
    ],
    "subject": "math",
},

# c10_math_080: Probability — die, even number
{
    "template_name": "c10_math_080_probability_die_even",
    "node_id": "c10_math_080",
    "normalized_pattern": "die thrown once probability of getting even number",
    "keywords": ["die", "dice", "thrown", "probability", "even number", "single throw"],
    "variables": [],
    "steps": [
        {"command": "calculate 3 / 6", "purpose": "Sample space = {1,2,3,4,5,6}. Even numbers = {2,4,6}. P(even) = 3/6 = 1/2 = 0.5"},
    ],
    "subject": "math",
    "rule": "P(even number on die) = 3/6 = 1/2. P(odd) = 3/6 = 1/2. P(prime) = 3/6 = 1/2.",
},

# c10_math_028: AP nth term — a_n = a + (n-1)d
{
    "template_name": "c10_math_028_ap_nth_term_symbolic",
    "node_id": "c10_math_028",
    "normalized_pattern": "find nth term of arithmetic progression if first term and common difference given",
    "keywords": ["ap", "arithmetic progression", "nth term", "term", "first term", "common difference"],
    "variables": [
        {"name": "n", "patterns": [r"(\d+)(?:st|nd|rd|th)\s+term", r"term\s*(?:is|=|:)\s*(\d+)", r"n\s*[=:]\s*(\d+)"], "required": True},
        {"name": "a", "patterns": [r"first term\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"a\s*[=:]\s*(\d+\.?\d*)"], "required": False, "default": "0"},
        {"name": "d", "patterns": [r"common difference\s*(?:is|=|:|of)?\s*(\d+\.?\d*)", r"d\s*[=:]\s*(\d+\.?\d*)"], "required": False, "default": "1"},
    ],
    "steps": [
        {"command": "calculate {a} + ({n} - 1) * {d}", "purpose": "Find nth term using a_n = a + (n-1)d"},
    ],
    "subject": "math",
},

]
