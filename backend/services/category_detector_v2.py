"""Extended category detection for solver v2.

Detects question categories for physics, chemistry, accounts, and applied
maths, extending the existing board_parser._detect_category function.

Category detection uses keyword matching (no LLM needed). The detector
returns a category string that maps to a solver in the SOLVER_REGISTRY.

Usage:
    from backend.services.category_detector_v2 import detect_category_v2

    category = detect_category_v2("Calculate the pH of 0.01 M HCl")
    # category = "chem_ph"
"""

import re
from typing import Optional


# ---------------------------------------------------------------------------
# Category patterns
# ---------------------------------------------------------------------------

CATEGORY_PATTERNS = {
    # ── Physics ── #
    "phy_optics": [
        r"\b(?:lens|mirror|focal\s+length|image\s+distance|magnification)\b",
        r"\b(?:convex|concave)\s+(?:lens|mirror)\b",
        r"\b1/f\s*=\s*1/v\b",
    ],
    "phy_magnetism": [
        r"\b(?:magnetic\s+field|lorentz\s+force|biot.?savart)\b",
        r"\b(?:current.?carrying\s+wire|solenoid|toroid)\b",
        r"\bF\s*=\s*qvB\b",
    ],
    "phy_waves": [
        r"\b(?:wavelength|frequency|amplitude|wave\s+velocity)\b",
        r"\bv\s*=\s*f\s*λ\b",
        r"\b(?:period|time\s+period)\s+of\s+(?:wave|oscillation)\b",
    ],
    "phy_gravitation": [
        r"\b(?:gravitational\s+(?:force|field|potential)|escape\s+velocity)\b",
        r"\b(?:orbital\s+velocity|kepler|satellite)\b",
        r"\bF\s*=\s*Gm.*m.*/r\b",
    ],
    "phy_momentum": [
        r"\b(?:momentum|impulse|collision)\b",
        r"\b(?:conservation\s+of\s+momentum|elastic|inelastic)\b",
        r"\bp\s*=\s*mv\b",
        r"\bcollides\s+with\b",
        r"\bfinal\s+velocity\s+after\s+(?:collision|impact)\b",
    ],
    "phy_circular_motion": [
        r"\b(?:centripetal|circular\s+motion|angular\s+velocity)\b",
        r"\b(?:banking\s+of\s+road|conical\s+pendulum)\b",
    ],
    "phy_thermodynamics": [
        r"\b(?:heat\s+energy|specific\s+heat|latent\s+heat|calorimetry)\b",
        r"\bQ\s*=\s*mc\b",
        r"\b(?:thermal\s+(?:expansion|conductivity)|thermodynamics)\b",
        r"\bheat\s+(?:is\s+)?needed\s+to\s+raise\b",
        r"\bheat\s+(?:required|absorbed|released)\b",
        r"\braise\s+.*\s+temperature\b",
    ],
    # Existing physics (from stem_solvers)
    "phy_kinematics": [
        r"\b(?:kinematics|uniformly\s+accelerated)\b",
        r"\bv\s*=\s*u\s*\+\s*at\b",
        r"\bs\s*=\s*ut\b",
        r"\b(?:initial\s+velocity|final\s+velocity|acceleration\s+of)\b",
        r"\b(?:covers\s+a\s+distance|distance\s+covered\s+in)\b",
    ],
    "phy_newtons_laws": [
        r"\b(?:newton.?s?\s+law|F\s*=\s*ma|tension|normal\s+force)\b",
    ],
    "phy_energy": [
        r"\b(?:kinetic\s+energy|potential\s+energy|work.?energy\s+theorem)\b",
        r"\bKE\s*=\s*½mv\b",
    ],
    "phy_electricity": [
        r"\b(?:ohm.?s?\s+law|electric\s+circuit|resistance|voltage|current)\b",
        r"\bV\s*=\s*IR\b",
    ],

    # ── Chemistry ── #
    "chem_stoichiometry": [
        r"\b(?:stoichiometry|mole\s+ratio|balanced\s+equation|limiting\s+reagent)\b",
        r"\bhow\s+many\s+(?:moles|grams)\s+of\b",
        r"\b(?:produced|formed|reacted)\s+from\b",
        r"\b(?:mole\s+ratio|coefficient\s+ratio)\b",
    ],
    "chem_redox": [
        r"\b(?:redox|oxidation\s+number|reduction.?oxidation|half.?reaction)\b",
        r"\b(?:balanc\w+\s+redox|electron\s+transfer)\b",
    ],
    "chem_molar_mass": [
        r"\b(?:molar\s+mass|molecular\s+mass|formula\s+mass)\b",
        r"\bcalculate\s+the\s+(?:molar|molecular)\s+mass\b",
    ],
    "chem_empirical": [
        r"\b(?:empirical\s+formula|molecular\s+formula|simplest\s+ratio)\b",
        r"\bpercentage\s+composition\b",
    ],
    # Existing chemistry
    "chem_moles": [
        r"\b(?:number\s+of\s+moles|moles\s+of|n\s*=\s*m/M)\b",
    ],
    "chem_molarity": [
        r"\b(?:molarity|molar\s+concentration|M\s*=\s*n/V)\b",
    ],
    "chem_ph": [
        r"\bpH\s+of\b",
        r"\bpH\s*=\s*-log\b",
    ],
    "chem_gas": [
        r"\b(?:ideal\s+gas|PV\s*=\s*nRT|gas\s+law)\b",
    ],
    "chem_dilution": [
        r"\b(?:dilution|M1V1\s*=\s*M2V2|diluting)\b",
    ],

    # ── Accounts ── #
    "acc_journal": [
        r"\b(?:journal\s+entry|journalise|journalizing)\b",
        r"\bpass\s+(?:a\s+)?journal\s+entry\b",
        r"\bdebit\s+and\s+credit\b",
    ],
    "acc_depreciation": [
        r"\b(?:depreciation|straight\s+line\s+method|written\s+down\s+value|WDV|SLM)\b",
        r"\bdepreciat\w+\s+on\b",
    ],
    "acc_brs": [
        r"\b(?:bank\s+reconciliation|BRS|reconcile\s+bank)\b",
        r"\bbank\s+statement\s+(?:balance|reconciliation)\b",
    ],
    "acc_final_accounts": [
        r"\b(?:trading\s+account|profit\s+and\s+loss|balance\s+sheet|final\s+accounts)\b",
        r"\bgross\s+profit\b",
        r"\bnet\s+profit\b",
    ],

    # ── Applied Maths ── #
    "appmath_statistics": [
        r"\b(?:mean|median|mode|standard\s+deviation|variance|statistics)\b",
        r"\bcalculate\s+(?:the\s+)?(?:mean|median|mode|standard\s+deviation)\b",
    ],
    "appmath_gst": [
        r"\b(?:GST|CGST|SGST|IGST|goods\s+and\s+services\s+tax)\b",
        r"\b(?:tax\s+inclusive|tax\s+exclusive|gst\s+rate)\b",
    ],
    "appmath_annuity": [
        r"\b(?:annuity|future\s+value|present\s+value|installment)\b",
        r"\b(?:sinking\s+fund|perpetuity)\b",
    ],
    "appmath_regression": [
        r"\b(?:regression|linear\s+fit|least\s+squares|correlation\s+coefficient)\b",
        r"\b(?:line\s+of\s+best\s+fit|scatter\s+plot)\b",
    ],
}


# Compile patterns for efficiency
COMPILED_PATTERNS = {
    cat: [re.compile(p, re.IGNORECASE) for p in patterns]
    for cat, patterns in CATEGORY_PATTERNS.items()
}


def detect_category_v2(question: str) -> Optional[str]:
    """Detect the solver category for a question.

    Uses keyword matching to identify the problem type. Returns the
    category string that maps to a solver in SOLVER_REGISTRY.

    Args:
        question: The question text.

    Returns:
        Category string (e.g., "phy_optics") or None if no match.
    """
    if not question or not question.strip():
        return None

    # Score each category by number of pattern matches
    scores = {}
    for category, patterns in COMPILED_PATTERNS.items():
        score = 0
        for pattern in patterns:
            if pattern.search(question):
                score += 1
        if score > 0:
            scores[category] = score

    if not scores:
        return None

    # Return the category with the highest score
    # Break ties by category name (deterministic)
    best = max(scores.items(), key=lambda x: (x[1], -len(x[0])))
    return best[0]


def detect_category_with_confidence(question: str) -> tuple:
    """Detect category and return with confidence score.

    Args:
        question: The question text.

    Returns:
        Tuple of (category, confidence) where confidence is 0-1.
        Returns (None, 0.0) if no match.
    """
    if not question or not question.strip():
        return None, 0.0

    scores = {}
    for category, patterns in COMPILED_PATTERNS.items():
        score = 0
        for pattern in patterns:
            if pattern.search(question):
                score += 1
        if score > 0:
            scores[category] = score

    if not scores:
        return None, 0.0

    total_score = sum(scores.values())
    best_category = max(scores.items(), key=lambda x: (x[1], -len(x[0])))
    confidence = best_category[1] / total_score

    return best_category[0], confidence


def get_form_fields(category: str) -> list:
    """Get the form fields for a given category.

    Returns a list of field definitions that the student needs to fill.

    Args:
        category: The solver category.

    Returns:
        List of {name, label, type, required, default} dicts.
    """
    FORM_FIELDS = {
        # Physics
        "phy_optics": [
            {"name": "u", "label": "Object distance (cm)", "type": "number", "required": False},
            {"name": "v", "label": "Image distance (cm)", "type": "number", "required": False},
            {"name": "f", "label": "Focal length (cm)", "type": "number", "required": False},
            {"name": "find", "label": "Find", "type": "select", "options": ["u", "v", "f"], "required": True},
            {"name": "mirror", "label": "Mirror (vs lens)", "type": "boolean", "default": False},
        ],
        "phy_magnetism": [
            {"name": "type", "label": "Formula type", "type": "select",
             "options": ["force_on_charge", "force_on_wire", "field_from_wire"]},
            {"name": "q", "label": "Charge (C)", "type": "number"},
            {"name": "v", "label": "Velocity (m/s)", "type": "number"},
            {"name": "B", "label": "Magnetic field (T)", "type": "number"},
            {"name": "I", "label": "Current (A)", "type": "number"},
            {"name": "L", "label": "Length (m)", "type": "number"},
            {"name": "r", "label": "Distance (m)", "type": "number"},
            {"name": "theta", "label": "Angle (degrees)", "type": "number", "default": 90},
            {"name": "find", "label": "Find", "type": "select", "options": ["F", "B"]},
        ],
        "phy_waves": [
            {"name": "v", "label": "Wave velocity (m/s)", "type": "number"},
            {"name": "f", "label": "Frequency (Hz)", "type": "number"},
            {"name": "lambda", "label": "Wavelength (m)", "type": "number"},
            {"name": "T", "label": "Period (s)", "type": "number"},
            {"name": "find", "label": "Find", "type": "select", "options": ["v", "f", "lambda", "t"]},
        ],
        "phy_gravitation": [
            {"name": "type", "label": "Formula type", "type": "select",
             "options": ["force", "field", "orbital_velocity", "escape_velocity"]},
            {"name": "m1", "label": "Mass 1 (kg)", "type": "number"},
            {"name": "m2", "label": "Mass 2 (kg)", "type": "number"},
            {"name": "M", "label": "Central mass (kg)", "type": "number"},
            {"name": "r", "label": "Distance (m)", "type": "number"},
            {"name": "find", "label": "Find", "type": "select", "options": ["F", "g", "v"]},
        ],
        "phy_momentum": [
            {"name": "type", "label": "Formula type", "type": "select",
             "options": ["momentum", "impulse", "collision"]},
            {"name": "m", "label": "Mass (kg)", "type": "number"},
            {"name": "v", "label": "Velocity (m/s)", "type": "number"},
            {"name": "F", "label": "Force (N)", "type": "number"},
            {"name": "t", "label": "Time (s)", "type": "number"},
            {"name": "m1", "label": "Mass 1 (kg)", "type": "number"},
            {"name": "m2", "label": "Mass 2 (kg)", "type": "number"},
            {"name": "v1", "label": "Velocity 1 (m/s)", "type": "number"},
            {"name": "v2", "label": "Velocity 2 (m/s)", "type": "number"},
            {"name": "find", "label": "Find", "type": "select", "options": ["p", "J", "v_final"]},
        ],
        "phy_circular_motion": [
            {"name": "m", "label": "Mass (kg)", "type": "number"},
            {"name": "v", "label": "Velocity (m/s)", "type": "number"},
            {"name": "r", "label": "Radius (m)", "type": "number"},
            {"name": "find", "label": "Find", "type": "select", "options": ["a", "F", "T"]},
        ],
        "phy_thermodynamics": [
            {"name": "type", "label": "Formula type", "type": "select",
             "options": ["heat", "latent_heat"]},
            {"name": "m", "label": "Mass (kg)", "type": "number"},
            {"name": "c", "label": "Specific heat (J/kg·K)", "type": "number"},
            {"name": "delta_T", "label": "Temperature change (°C)", "type": "number"},
            {"name": "L", "label": "Latent heat (J/kg)", "type": "number"},
            {"name": "find", "label": "Find", "type": "select", "options": ["Q", "dT"]},
        ],
        # Chemistry
        "chem_stoichiometry": [
            {"name": "coeff_known", "label": "Coefficient (known)", "type": "number"},
            {"name": "coeff_unknown", "label": "Coefficient (unknown)", "type": "number"},
            {"name": "moles_known", "label": "Moles (known)", "type": "number"},
            {"name": "molar_mass_unknown", "label": "Molar mass (unknown)", "type": "number"},
            {"name": "find", "label": "Find", "type": "select", "options": ["moles_unknown", "mass"]},
        ],
        "chem_redox": [
            {"name": "oxidation_start", "label": "Initial oxidation number", "type": "number"},
            {"name": "oxidation_end", "label": "Final oxidation number", "type": "number"},
            {"name": "reduction_start", "label": "Initial reduction number", "type": "number"},
            {"name": "reduction_end", "label": "Final reduction number", "type": "number"},
            {"name": "find", "label": "Find", "type": "select", "options": ["electrons"]},
        ],
        "chem_molar_mass": [
            {"name": "elements", "label": "Elements (JSON: {H: 2, O: 1})", "type": "json"},
        ],
        "chem_empirical": [
            {"name": "composition", "label": "Composition % (JSON: {C: 40, H: 6.7})", "type": "json"},
        ],
        # Accounts
        "acc_journal": [
            {"name": "transactions", "label": "Transactions (JSON array)", "type": "json"},
        ],
        "acc_depreciation": [
            {"name": "method", "label": "Method", "type": "select", "options": ["slm", "wdv"]},
            {"name": "cost", "label": "Cost (₹)", "type": "number"},
            {"name": "salvage", "label": "Salvage value (₹)", "type": "number", "default": 0},
            {"name": "life", "label": "Useful life (years)", "type": "number"},
            {"name": "rate", "label": "Depreciation rate (%)", "type": "number"},
            {"name": "book_value", "label": "Book value (₹)", "type": "number"},
            {"name": "year", "label": "Year", "type": "number", "default": 1},
            {"name": "find", "label": "Find", "type": "select", "options": ["depreciation", "book_value"]},
        ],
        "acc_brs": [
            {"name": "balance_as_per", "label": "Balance as per", "type": "select", "options": ["cash_book", "bank_statement"]},
            {"name": "balance", "label": "Balance (₹)", "type": "number"},
            {"name": "adjustments", "label": "Adjustments (JSON array)", "type": "json"},
        ],
        "acc_final_accounts": [
            {"name": "sales", "label": "Sales (₹)", "type": "number"},
            {"name": "purchases", "label": "Purchases (₹)", "type": "number"},
            {"name": "opening_stock", "label": "Opening stock (₹)", "type": "number"},
            {"name": "closing_stock", "label": "Closing stock (₹)", "type": "number"},
            {"name": "expenses", "label": "Expenses (₹)", "type": "number"},
            {"name": "assets", "label": "Assets (JSON)", "type": "json"},
            {"name": "liabilities", "label": "Liabilities (JSON)", "type": "json"},
        ],
        # Applied Maths
        "appmath_statistics": [
            {"name": "data", "label": "Data values (comma-separated)", "type": "array"},
            {"name": "find", "label": "Find", "type": "select",
             "options": ["all", "mean", "median", "mode", "std"]},
        ],
        "appmath_gst": [
            {"name": "price", "label": "Price (₹)", "type": "number"},
            {"name": "gst_rate", "label": "GST rate (%)", "type": "number"},
            {"name": "type", "label": "Transaction type", "type": "select", "options": ["intra", "inter"]},
        ],
        "appmath_annuity": [
            {"name": "pmt", "label": "Payment (₹)", "type": "number"},
            {"name": "rate", "label": "Interest rate (%)", "type": "number"},
            {"name": "n", "label": "Number of periods", "type": "number"},
            {"name": "find", "label": "Find", "type": "select", "options": ["fv", "pv"]},
        ],
        "appmath_regression": [
            {"name": "x", "label": "X values (comma-separated)", "type": "array"},
            {"name": "y", "label": "Y values (comma-separated)", "type": "array"},
        ],
    }

    return FORM_FIELDS.get(category, [])
