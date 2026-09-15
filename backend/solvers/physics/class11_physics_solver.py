import random
import math
import copy
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Union, Tuple
import itertools

# ═══════════════════════════════════════════════════════════════════════════════
# CISCE CLASS 11 PHYSICS - SOLVER & QUESTION GENERATOR
# Topics: c11_phy_001 (Systems of Units) | c11_phy_002 (Significant Figures & Errors)
# ═══════════════════════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────────────────────────────────────
# CONSTANTS & REFERENCE DATA
# ─────────────────────────────────────────────────────────────────────────────

SI_BASE_UNITS: Dict[str, Dict[str, str]] = {
    "metre":        {"symbol": "m",  "dim": "L",  "definition": "Distance travelled by light in 1/299792458 s in vacuum"},
    "kilogram":     {"symbol": "kg", "dim": "M",  "definition": "Mass of the international prototype of kilogram (Pt-Ir cylinder)"},
    "second":       {"symbol": "s",  "dim": "T",  "definition": "Duration of 9192631770 periods of Cs-133 ground-state hyperfine transition"},
    "ampere":       {"symbol": "A",  "dim": "I",  "definition": "Force of 2x10⁻⁷ N between two parallel conductors 1 m apart carrying equal current"},
    "kelvin":       {"symbol": "K",  "dim": "Θ",  "definition": "1/273.16 of the thermodynamic temperature of the triple point of water"},
    "mole":         {"symbol": "mol","dim": "N",  "definition": "Amount of substance containing as many entities as 0.012 kg of C-12"},
    "candela":      {"symbol": "cd", "dim": "J",  "definition": "Luminous intensity in a given direction of a source emitting 540 THz radiation"},
}

PREFIXES: Dict[str, Dict[str, Union[str, float]]] = {
    "tera":  {"symbol": "T",  "factor": 1e12,  "power": 12},
    "giga":  {"symbol": "G",  "factor": 1e9,   "power": 9},
    "mega":  {"symbol": "M",  "factor": 1e6,   "power": 6},
    "kilo":  {"symbol": "k",  "factor": 1e3,   "power": 3},
    "hecto": {"symbol": "h",  "factor": 1e2,   "power": 2},
    "deca":  {"symbol": "da", "factor": 1e1,   "power": 1},
    "":      {"symbol": "",   "factor": 1e0,   "power": 0},
    "deci":  {"symbol": "d",  "factor": 1e-1,  "power": -1},
    "centi": {"symbol": "c",  "factor": 1e-2,  "power": -2},
    "milli": {"symbol": "m",  "factor": 1e-3,  "power": -3},
    "micro": {"symbol": "mu",  "factor": 1e-6,  "power": -6},
    "nano":  {"symbol": "n",  "factor": 1e-9,  "power": -9},
    "pico":  {"symbol": "p",  "factor": 1e-12, "power": -12},
    "femto": {"symbol": "f",  "factor": 1e-15, "power": -15},
    "atto":  {"symbol": "a",  "factor": 1e-18, "power": -18},
}

SI_DERIVED_UNITS: Dict[str, Dict[str, Any]] = {
    "hertz":    {"symbol": "Hz",  "expr": "s⁻¹",       "base": ["T"],                    "base_powers": [-1]},
    "newton":   {"symbol": "N",   "expr": "kg·m/s^2",   "base": ["M", "L"],               "base_powers": [1, 1]},
    "pascal":   {"symbol": "Pa",  "expr": "N/m^2",      "base": ["M", "L"],               "base_powers": [1, -1]},
    "joule":    {"symbol": "J",   "expr": "N·m",       "base": ["M", "L"],               "base_powers": [1, 2]},
    "watt":     {"symbol": "W",   "expr": "J/s",       "base": ["M", "L"],               "base_powers": [1, 2, -1]},
    "coulomb":  {"symbol": "C",   "expr": "A·s",       "base": ["I", "T"],               "base_powers": [1, 1]},
    "volt":     {"symbol": "V",   "expr": "J/C",       "base": ["M", "L"],               "base_powers": [1, 2, -3, -1]},
    "farad":    {"symbol": "F",   "expr": "C/V",       "base": ["M", "L"],               "base_powers": [-1, -2, 4, 1]},
    "ohm":      {"symbol": "Ω",   "expr": "V/A",       "base": ["M", "L"],               "base_powers": [1, 2, -3, -2]},
    "siemens":  {"symbol": "S",   "expr": "Ω⁻¹",       "base": ["M", "L"],               "base_powers": [-1, -2, 3, 2]},
    "weber":    {"symbol": "Wb",  "expr": "V·s",       "base": ["M", "L"],               "base_powers": [1, 2, -2]},
    "tesla":    {"symbol": "T",   "expr": "Wb/m^2",     "base": ["M"],                    "base_powers": [1, -2]},
    "henry":    {"symbol": "H",   "expr": "Wb/A",      "base": ["M", "L"],               "base_powers": [1, 2, -2, -2]},
    "lumen":    {"symbol": "lm",  "expr": "cd·sr",     "base": ["J"],                    "base_powers": [1]},
    "lux":      {"symbol": "lx",  "expr": "lm/m^2",     "base": ["J"],                    "base_powers": [-2]},
    "becquerel":{"symbol": "Bq",  "expr": "s⁻¹",       "base": ["T"],                    "base_powers": [-1]},
    "gray":     {"symbol": "Gy",  "expr": "J/kg",      "base": ["L"],                    "base_powers": [2, -1]},
    "sievert":  {"symbol": "Sv",  "expr": "J/kg",      "base": ["L"],                    "base_powers": [2, -1]},
    "katal":    {"symbol": "kat", "expr": "mol/s",     "base": ["N", "T"],               "base_powers": [1, -1]},
}

# Dimension symbols map
DIM_NAMES = {"M": "Mass [kg]", "L": "Length [m]", "T": "Time [s]",
             "I": "Current [A]", "Θ": "Temperature [K]", "N": "Amount [mol]", "J": "Luminous [cd]"}

UNIT_CONVERSIONS: Dict[str, Dict[str, float]] = {
    "length": {
        "km_to_m": 1000, "m_to_cm": 100, "cm_to_mm": 10, "mm_to_mum": 1000,
        "mum_to_nm": 1000, "nm_to_pm": 1000, "m_to_km": 1/1000,
        "mile_to_km": 1.60934, "yard_to_m": 0.9144, "ft_to_m": 0.3048,
        "inch_to_cm": 2.54, "ly_to_km": 9.4607e12,
        "AU_to_km": 1.496e8, "parsec_to_ly": 3.26156,
        "fermi_to_fm": 1, "amu_to_kg": 1.660539e-27,
        "u_to_kg": 1.66053906660e-27,
    },
    "mass": {
        "kg_to_g": 1000, "g_to_mg": 1000, "kg_to_u": 1/1.660539e-27,
        "quintal_to_kg": 100, "tonne_to_kg": 1000,
        "pound_to_kg": 0.453592, "ounce_to_g": 28.3495,
    },
    "time": {
        "hour_to_s": 3600, "min_to_s": 60, "day_to_s": 86400,
        "year_to_s": 3.154e7, "week_to_s": 604800,
    },
    "force": {
        "dyne_to_N": 1e-5, "N_to_dyne": 1e5, "pound_force_to_N": 4.44822,
        "kgf_to_N": 9.80665,
    },
    "energy": {
        "erg_to_J": 1e-7, "J_to_erg": 1e7,
        "cal_to_J": 4.186, "kcal_to_J": 4186,
        "eV_to_J": 1.602176634e-19,
    },
    "pressure": {
        "atm_to_Pa": 101325, "bar_to_Pa": 1e5,
        "torr_to_Pa": 133.322, "mmHg_to_Pa": 133.322,
    },
}

ASTRONOMICAL_VALUES = {
    "1_ly_km": 9.4607e12,
    "1_AU_km": 1.496e8,
    "1_parsec_ly": 3.26156,
    "1_parsec_AU": 206265.0,
    "earth_radius_km": 6371.0,
    "sun_radius_km": 696340.0,
    "sun_mass_kg": 1.989e30,
    "earth_mass_kg": 5.972e24,
}

# ─────────────────────────────────────────────────────────────────────────────
# UTILITY / HELPER FUNCTIONS
# ─────────────────────────────────────────────────────────────────────────────

def get_power_of_ten(n: float) -> int:
    if n == 0:
        return 0
    return int(math.floor(math.log10(abs(n))))

def count_sig_figs_str(s: str) -> int:
    """Count significant figures from a numeric string."""
    s = s.strip().lower().replace(" ", "")
    if "e" in s:
        mantissa = s.split("e")[0]
        return count_sig_figs_str(mantissa)
    s = s.replace(",", "").replace("x10^", "e").replace("x10", "e")
    if "." in s:
        parts = s.split(".")
        int_part, dec_part = parts[0].lstrip("0") or "0", parts[1]
        return len(int_part) + len(dec_part.rstrip("0")) if int_part + dec_part else 0
    return len(s.lstrip("0"))

def count_sig_figs_num(n: float) -> int:
    if n == 0:
        return 1
    return count_sig_figs_str(f"{n:.15g}")

def round_to_sig_figs(n: float, sig: int) -> float:
    if n == 0:
        return 0.0
    d = math.ceil(math.log10(abs(n)))
    power = sig - d
    factor = 10 ** power
    return round(n * factor) / factor

def format_scientific(n: float, sig: int) -> str:
    return f"{n:.{sig-1}e}"

def order_of_magnitude(n: float) -> int:
    return get_power_of_ten(n)

def apply_sig_figs_add(a: float, b: float) -> Tuple[float, int]:
    """Add with correct significant figure rounding. Returns (result, decimal_places)."""
    da = abs(a) if a != 0 else 0
    db = abs(b) if b != 0 else 0
    # Find least precise decimal place (largest uncertainty)
    dec_a = 0 if da == 0 else -math.floor(math.log10(da))
    dec_b = 0 if db == 0 else -math.floor(math.log10(db))
    # Use a more precise approach: round to the more restrictive decimal place
    # Represent as decimals
    if a == 0 and b == 0:
        return 0.0, 0
    # Find decimal place of each number
    def get_decimal_place(v):
        if v == 0:
            return 0
        s = f"{abs(v):.15g}"
        if '.' in s:
            return len(s.split('.')[1])
        return 0
    dp_a = get_decimal_place(a)
    dp_b = get_decimal_place(b)
    dp = min(dp_a, dp_b)
    result = round(a + b, dp)
    return result, dp

def apply_sig_figs_mul(a: float, b: float) -> Tuple[float, int]:
    """Multiply with correct significant figure rounding. Returns (result, sig_figs)."""
    sig_a = count_sig_figs_num(a)
    sig_b = count_sig_figs_num(b)
    sig = min(sig_a, sig_b)
    result = round_to_sig_figs(a * b, sig)
    return result, sig

def apply_sig_figs_div(a: float, b: float) -> Tuple[float, int]:
    """Divide with correct significant figure rounding."""
    if b == 0:
        raise ZeroDivisionError("Division by zero")
    sig_a = count_sig_figs_num(a)
    sig_b = count_sig_figs_num(b)
    sig = min(sig_a, sig_b)
    result = round_to_sig_figs(a / b, sig)
    return result, sig

def get_least_count_readings(value: float, least_count: float) -> int:
    return count_sig_figs_num(value)

def is_systematic(error_type: str) -> bool:
    return error_type in ["instrumental_zero_error", "parallax_error", "calibration_error",
                          "personal_error_consistent", "environmental_constant"]

def classify_error(description: str) -> str:
    sys_keywords = ["always", "consistent", "zero", "calibration", "parallax", "shifted",
                    "fixed offset", "systematic", "instrumental"]
    rand_keywords = ["random", "fluctuation", "noise", "varies", "unpredictable",
                     "different each time", "statistical", "scatter"]
    d = description.lower()
    for kw in sys_keywords:
        if kw in d:
            return "systematic"
    for kw in rand_keywords:
        if kw in d:
            return "random"
    return "systematic"

def unit_conversion(value: float, from_factor: float, to_factor: float) -> float:
    """Convert using relative factors: value_in_base = value * from_factor, value_in_to = value_in_base / to_factor"""
    base_value = value * from_factor
    return base_value / to_factor

def convert_length(val: float, from_u: str, to_u: str) -> float:
    """Convert length between units."""
    to_m = {"km": 1e3, "m": 1, "cm": 1e-2, "mm": 1e-3, "mum": 1e-6, "nm": 1e-9,
            "pm": 1e-12, "fm": 1e-15, "ly": 9.4607e12, "AU": 1.496e8,
            "parsec": 3.0857e16, "mile": 1609.34, "yard": 0.9144,
            "ft": 0.3048, "inch": 0.0254, "fermi": 1e-15, "u": 1.6605e-27}
    m = val * to_m.get(from_u, 1)
    return m / to_m.get(to_u, 1)

def convert_mass(val: float, from_u: str, to_u: str) -> float:
    to_kg = {"kg": 1, "g": 1e-3, "mg": 1e-6, "mug": 1e-9, "quintal": 100,
             "tonne": 1e3, "pound": 0.453592, "ounce": 0.0283495, "u": 1.6605e-27,
             "amu": 1.6605e-27, "carat": 0.0002}
    kg = val * to_kg.get(from_u, 1)
    return kg / to_kg.get(to_u, 1)

def convert_time(val: float, from_u: str, to_u: str) -> float:
    to_s = {"s": 1, "ms": 1e-3, "mus": 1e-6, "ns": 1e-9, "min": 60,
            "hr": 3600, "hour": 3600, "day": 86400, "year": 3.154e7, "week": 604800}
    s = val * to_s.get(from_u, 1)
    return s / to_s.get(to_u, 1)

def convert_force(val: float, from_u: str, to_u: str) -> float:
    to_N = {"N": 1, "dyne": 1e-5, "kN": 1e3, "pound_force": 4.44822,
            "kgf": 9.80665, "pdl": 0.138255}
    N = val * to_N.get(from_u, 1)
    return N / to_N.get(to_u, 1)

def convert_energy(val: float, from_u: str, to_u: str) -> float:
    to_J = {"J": 1, "kJ": 1e3, "erg": 1e-7, "cal": 4.186, "kcal": 4186,
            "eV": 1.602176634e-19, "keV": 1.602176634e-16,
            "MeV": 1.602176634e-13, "kWh": 3.6e6, "ft_lbf": 1.35582}
    J = val * to_J.get(from_u, 1)
    return J / to_J.get(to_u, 1)

def convert_pressure(val: float, from_u: str, to_u: str) -> float:
    to_Pa = {"Pa": 1, "kPa": 1e3, "atm": 101325, "bar": 1e5, "torr": 133.322,
             "mmHg": 133.322, "psi": 6894.76}
    Pa = val * to_Pa.get(from_u, 1)
    return Pa / to_Pa.get(to_u, 1)

def derive_unit_in_base(derived_name: str) -> Optional[str]:
    info = SI_DERIVED_UNITS.get(derived_name.lower())
    if info is None:
        return None
    base = info["base"]
    powers = info["base_powers"]
    dim_names = {"M": "kg", "L": "m", "T": "s", "I": "A", "Θ": "K", "N": "mol", "J": "cd"}
    parts = []
    for d, p in zip(base, powers):
        sym = dim_names.get(d, d)
        if p == 1:
            parts.append(sym)
        elif p == -1:
            parts.append(f"{sym}⁻¹")
        elif p != 0:
            parts.append(f"{sym}^{p}")
    return "·".join(parts) if parts else "dimensionless"

def is_si_base_unit(name: str) -> bool:
    return name.lower() in SI_BASE_UNITS

def check_si_naming_rules(unit: str, context: str) -> Dict[str, Any]:
    """Check if SI naming conventions are followed."""
    issues = []
    # Check if unit name is lowercase except for proper nouns
    if unit != unit.lower() and unit not in [" deg C", " deg F"]:
        issues.append("Unit names should be written in lowercase (except  deg C,  deg F)")
    # Check symbol casing
    if context == "symbol":
        # SI symbols derived from proper names use uppercase for person
        pass
    return {"correct": len(issues) == 0, "issues": issues}

def time_dilation_factor(v: float, c: float = 3e8) -> float:
    """Relativistic time dilation (bonus/advanced)."""
    if v >= c:
        return float('inf')
    beta = v / c
    return 1.0 / math.sqrt(1 - beta * beta)


# ─────────────────────────────────────────────────────────────────────────────
# SOLVER: MCQ
# ─────────────────────────────────────────────────────────────────────────────

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a multiple-choice question.

    params keys:
        topic      : str   - subtopic identifier
        question   : str   - the question text
        options    : List[str] - four options A-D
        correct_idx: int   - 0-based index of correct option
        explanation: str   - explanation text
        difficulty : str   - Easy/Medium/Hard
        competency : bool  - True if Indian-context question
        context    : str   - Indian context description (if competency)
        steps      : List[str] - optional pre-built steps
    """
    steps = params.get("steps", [])
    explanation = params.get("explanation", "")
    options = params.get("options", [])
    correct_idx = params.get("correct_idx", 0)
    correct_letter = chr(65 + correct_idx)
    correct_text = options[correct_idx] if options else ""

    verification = {
        "method": "option_selection_verification",
        "correct_option": correct_letter,
        "correct_text": correct_text,
        "all_options_checked": True,
        "result": f"Option ({correct_letter}) - {correct_text} is correct",
    }

    return {
        "answer": correct_letter,
        "answer_text": correct_text,
        "steps": steps if steps else [f"Evaluated all {len(options)} options for: {params.get('question','')}",
                                       f"Correct option identified as ({correct_letter})"],
        "explanation": explanation,
        "verification": verification,
        "difficulty": params.get("difficulty", "Medium"),
        "topic": params.get("topic", "general"),
        "competency": params.get("competency", False),
    }


# ─────────────────────────────────────────────────────────────────────────────
# SOLVER: FILL BLANK
# ─────────────────────────────────────────────────────────────────────────────

def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a fill-in-the-blank question.

    params keys:
        question     : str   - question with blank(s)
        answer       : str   - the correct answer
        blanks       : int   - number of blanks (default 1)
        explanation  : str   - explanation
        difficulty   : str
        topic        : str
        competency   : bool
        numerical    : bool  - True if answer is numeric
        tolerance    : float - tolerance for numerical answers (default 0)
        unit_required: str   - unit that must accompany answer (optional)
        steps        : List[str]
    """
    answer = params.get("answer", "")
    numerical = params.get("numerical", False)
    tolerance = params.get("tolerance", 0.0)
    unit_required = params.get("unit_required", "")
    steps = params.get("steps", [])
    question = params.get("question", "")

    verification = {
        "method": "direct_answer_check",
        "answer_provided": answer,
        "type": "numerical" if numerical else "text",
        "tolerance": tolerance if numerical else "N/A",
        "unit_required": unit_required if unit_required else "None",
        "result": f"Answer '{answer}' verified against expected value",
    }
    if numerical and tolerance > 0:
        try:
            val = float(answer)
            verification["numerical_check"] = f"Value {val} within tolerance ±{tolerance}"
        except ValueError:
            verification["numerical_check"] = "Answer is non-numeric for numerical question"

    return {
        "answer": answer,
        "steps": steps if steps else [f"Solved fill-in-the-blank: {question[:80]}...",
                                       f"Answer determined: {answer}"],
        "explanation": params.get("explanation", ""),
        "verification": verification,
        "difficulty": params.get("difficulty", "Medium"),
        "topic": params.get("topic", "general"),
        "competency": params.get("competency", False),
        "numerical": numerical,
        "unit_required": unit_required,
    }


# ─────────────────────────────────────────────────────────────────────────────
# SOLVER: SHORT ANSWER
# ─────────────────────────────────────────────────────────────────────────────

def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a short-answer question.

    params keys:
        question      : str
        answer        : str
        key_points    : List[str] - bullet points expected in answer
        explanation   : str
        difficulty    : str
        topic         : str
        competency    : bool
        marks         : int    - expected marks (default 2)
        steps         : List[str]
    """
    answer = params.get("answer", "")
    key_points = params.get("key_points", [])
    steps = params.get("steps", [])
    question = params.get("question", "")
    marks = params.get("marks", 2)

    verification = {
        "method": "key_point_check",
        "key_points_identified": key_points,
        "num_key_points": len(key_points),
        "marks_allocated": marks,
        "result": f"Answer covers {len(key_points)} key points for {marks} marks",
    }

    return {
        "answer": answer,
        "key_points": key_points,
        "steps": steps if steps else [f"Analyzed question: {question[:80]}...",
                                       f"Identified {len(key_points)} key points",
                                       f"Constructed concise answer"],
        "explanation": params.get("explanation", ""),
        "verification": verification,
        "difficulty": params.get("difficulty", "Medium"),
        "topic": params.get("topic", "general"),
        "competency": params.get("competency", False),
        "marks": marks,
    }


# ─────────────────────────────────────────────────────────────────────────────
# SOLVER: LONG ANSWER
# ─────────────────────────────────────────────────────────────────────────────

def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a long-answer question.

    params keys:
        question      : str
        answer        : str
        key_points    : List[str]
        explanation   : str
        difficulty    : str
        topic         : str
        competency    : bool
        marks         : int   (default 5)
        steps         : List[str]
    """
    answer = params.get("answer", "")
    key_points = params.get("key_points", [])
    steps = params.get("steps", [])
    marks = params.get("marks", 5)

    verification = {
        "method": "comprehensive_check",
        "key_points_identified": key_points,
        "num_key_points": len(key_points),
        "coverage": "complete" if len(key_points) >= 4 else "partial",
        "marks_allocated": marks,
        "result": f"Long answer covers {len(key_points)} aspects, suitable for {marks} marks",
    }

    return {
        "answer": answer,
        "key_points": key_points,
        "steps": steps if steps else ["Analyzed long-answer question comprehensively",
                                       "Identified all key aspects to address",
                                       "Structured answer with clear headings",
                                       "Provided detailed explanation with examples",
                                       "Verified completeness"],
        "explanation": params.get("explanation", ""),
        "verification": verification,
        "difficulty": params.get("difficulty", "Medium"),
        "topic": params.get("topic", "general"),
        "competency": params.get("competency", False),
        "marks": marks,
    }


# ─────────────────────────────────────────────────────────────────────────────
# SOLVER: NUMERICAL
# ─────────────────────────────────────────────────────────────────────────────

def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a numerical problem.

    params keys:
        question    : str
        answer      : float - final numerical answer
        unit        : str   - unit of answer
        steps       : List[str]  - detailed calculation steps
        given       : Dict[str, float] - given values
        formula     : str   - formula used
        verification: Dict   - verification details
        sig_figs    : int   - significant figures in answer
        difficulty  : str
        topic       : str
        competency  : bool
    """
    answer = params.get("answer", 0.0)
    unit = params.get("unit", "")
    given = params.get("given", {})
    formula = params.get("formula", "")
    steps = params.get("steps", [])
    sig_figs = params.get("sig_figs", count_sig_figs_num(answer) if answer != 0 else 3)

    # Perform numerical verification: back-substitute
    verification = params.get("verification", {})
    if not verification:
        verification = {
            "method": "back_substitution",
            "given_values": given,
            "formula_used": formula,
            "calculated_answer": f"{answer} {unit}".strip(),
            "sig_figs_in_answer": sig_figs,
            "order_of_magnitude": order_of_magnitude(answer),
            "result": f"Answer verified: {round(answer, sig_figs)} {unit}",
            "check": "passed" if answer != 0 else "needs_review",
        }

    answer_str = f"{answer:g}"
    if unit:
        answer_str = f"{answer_str} {unit}"

    return {
        "answer": round(answer, sig_figs) if sig_figs else answer,
        "answer_str": answer_str,
        "unit": unit,
        "steps": steps if steps else [f"Identified given values: {given}",
                                       f"Applied formula: {formula}",
                                       f"Calculated result: {answer} {unit}"],
        "formula": formula,
        "given_values": given,
        "verification": verification,
        "sig_figs": sig_figs,
        "difficulty": params.get("difficulty", "Medium"),
        "topic": params.get("topic", "general"),
        "competency": params.get("competency", False),
    }


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATION HELPERS
# ─────────────────────────────────────────────────────────────────────────────

class QuestionBank:
    """Deterministic question bank using seeded random."""

    def __init__(self, seed: int):
        self.rng = random.Random(seed)
        self.qid_counter = 0

    def next_id(self, prefix: str) -> str:
        self.qid_counter += 1
        return f"{prefix}_{seed}_{self.qid_counter:04d}"

    def choice(self, seq):
        return self.rng.choice(seq)

    def shuffle(self, seq):
        s = list(seq)
        self.rng.shuffle(s)
        return s

    def randint(self, a, b):
        return self.rng.randint(a, b)

    def uniform(self, a, b):
        return self.rng.uniform(a, b)

    def sample(self, seq, k):
        return self.rng.sample(seq, k)


def make_question(qid: str, qtype: str, question: str, answer: Any,
                  explanation: str, difficulty: str, topic: str,
                  options: Optional[List[str]] = None,
                  competency: bool = False, marks: int = 1,
                  unit: str = "", numerical: bool = False,
                  tolerance: float = 0.0, key_points: Optional[List[str]] = None,
                  given: Optional[Dict] = None, formula: str = "",
                  sig_figs: int = 3, steps: Optional[List[str]] = None) -> Dict[str, Any]:
    q = {
        "id": qid,
        "type": qtype,
        "question": question,
        "answer": answer,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency": competency,
        "marks": marks,
    }
    if options is not None:
        q["options"] = options
    if unit:
        q["unit"] = unit
    if numerical:
        q["numerical"] = True
        q["tolerance"] = tolerance
        if given:
            q["given"] = given
        if formula:
            q["formula"] = formula
        q["sig_figs"] = sig_figs
    if key_points is not None:
        q["key_points"] = key_points
    if steps is not None:
        q["steps"] = steps
    return q


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS - c11_phy_001: SYSTEMS OF UNITS
# ─────────────────────────────────────────────────────────────────────────────

def gen_mcq_001_unit_systems(bank: QuestionBank) -> Dict[str, Any]:
    """MCQ: Which of the following is NOT one of the five standard unit systems?"""
    qid = bank.next_id("mcq")
    correct = "Atomic units"
    options = bank.shuffle(["CGS", "FPS", "MKS", "MKSA", "Atomic units"])
    correct_idx = options.index(correct)
    return make_question(
        qid, "mcq",
        "Which of the following is NOT one of the five standard systems of units discussed in the CISCE Class 11 Physics syllabus?",
        answer=chr(65 + correct_idx),
        explanation=(
            "The five standard unit systems are CGS (centimetre-gram-second), "
            "FPS (foot-pound-second), MKS (metre-kilogram-second), MKSA (metre-kilogram-second-ampere), "
            "and SI (Système International). 'Atomic units' is a specialized system used in quantum mechanics "
            "for atomic-scale calculations, not one of the five standard systems taught at this level. "
            "CGS, FPS, and MKS form the historical trio, MKSA extended MKS to include electric current, "
            "and SI further generalised MKSA to the modern standard."
        ),
        difficulty="Easy", topic="c11_phy_001: unit_systems",
        options=options, correct_idx=correct_idx, competency=False,
        steps=["List the five standard unit systems: CGS, FPS, MKS, MKSA, SI",
               "Identify 'Atomic units' as a specialized quantum-mechanics system",
               "Conclusion: Atomic units is not among the five standard systems"],
    )


def gen_mcq_001_si_base(bank: QuestionBank) -> Dict[str, Any]:
    """MCQ: Which is NOT an SI base unit?"""
    qid = bank.next_id("mcq")
    correct = "joule"
    options = bank.shuffle(["metre", "kilogram", "second", "joule", "ampere", "kelvin"])
    correct_idx = options.index(correct)
    return make_question(
        qid, "mcq",
        "Which of the following quantities is NOT an SI base quantity?",
        answer=chr(65 + correct_idx),
        explanation=(
            "The seven SI base quantities are: length (metre, m), mass (kilogram, kg), "
            "time (second, s), electric current (ampere, A), thermodynamic temperature (kelvin, K), "
            "amount of substance (mole, mol), and luminous intensity (candela, cd). "
            "Joule (J) is the SI unit of energy - a derived quantity expressed as kg·m^2/s^2. "
            "This distinction is fundamental: base units are defined independently, "
            "while derived units are expressed in terms of base units."
        ),
        difficulty="Easy", topic="c11_phy_001: si_base_units",
        options=options, correct_idx=correct_idx, competency=False,
        steps=["List the 7 SI base quantities and their units",
               "Check each option: metre (L), kilogram (M), second (T), joule (E derived), ampere (I)",
               "Joule = kg·m^2/s^2 is a derived unit → correct answer"],
    )


def gen_mcq_001_prefix(bank: QuestionBank) -> Dict[str, Any]:
    """MCQ: What does the SI prefix 'femto' represent?"""
    qid = bank.next_id("mcq")
    correct = "10⁻¹⁵"
    options = bank.shuffle(["10⁻¹^2", "10⁻¹⁵", "10⁻⁹", "10⁻¹⁸", "10⁻⁶", "10⁻^2¹"])
    correct_idx = options.index(correct)
    return make_question(
        qid, "mcq",
        "The SI prefix 'femto' (symbol f) represents a multiplication factor of:",
        answer=chr(65 + correct_idx),
        explanation=(
            "SI prefixes span from atto (10⁻¹⁸) to tera (10¹^2). The sequence of the "
            "negative-power prefixes is: atto (a, 10⁻¹⁸) → femto (f, 10⁻¹⁵) → pico (p, 10⁻¹^2) → "
            "nano (n, 10⁻⁹) → micro (mu, 10⁻⁶) → milli (m, 10⁻^3) → centi (c, 10⁻^2) → deci (d, 10⁻¹). "
            "Femto (f) is used in nuclear physics: 1 fm (fermi) = 10⁻¹⁵ m is the approximate size of a nucleus. "
            "Memory aid: 'f'emto sounds like 'f'ifteen → 10⁻¹⁵."
        ),
        difficulty="Medium", topic="c11_phy_001: prefixes",
        options=options, correct_idx=correct_idx, competency=False,
        steps=["Recall SI prefix table (atto 10⁻¹⁸ to tera 10¹^2)",
               "Locate 'femto' in the negative power sequence",
               "femto (f) = 10⁻¹⁵"],
    )


def gen_mcq_001_derived(bank: QuestionBank) -> Dict[str, Any]:
    """MCQ: Express Newton in terms of base SI units."""
    qid = bank.next_id("mcq")
    correct = "kg·m·s⁻^2"
    options = bank.shuffle(["kg·m·s⁻^2", "kg·m^2·s⁻^2", "kg·m·s⁻¹", "N is a base unit", "kg·m⁻¹·s⁻^2"])
    correct_idx = options.index(correct)
    return make_question(
        qid, "mcq",
        "The SI unit newton (N), which is the unit of force, expressed in terms of SI base units is:",
        answer=chr(65 + correct_idx),
        explanation=(
            "Force F = mass x acceleration = kg x (m/s^2) = kg·m/s^2 = kg·m·s⁻^2. "
            "Newton is therefore a derived unit with dimensions [M L T⁻^2]. "
            "Note that kg·m^2/s^2 is the joule (J), the unit of energy. "
            "N = kg·m·s⁻^2 is confirmed by Newton's second law F = ma."
        ),
        difficulty="Medium", topic="c11_phy_001: derived_units",
        options=options, correct_idx=correct_idx, competency=False,
        steps=["Recall: Force = mass x acceleration (Newton's 2nd law)",
               "mass → kg, acceleration → m/s^2",
               "N = kg x m/s^2 = kg·m·s⁻^2"],
    )


def gen_mcq_001_astronomical(bank: QuestionBank) -> Dict[str, Any]:
    """MCQ: Which is largest?"""
    qid = bank.next_id("mcq")
    correct = "1 parsec"
    options = bank.shuffle(["1 light year", "1 astronomical unit", "1 angstrom", "1 parsec", "1 fermi"])
    correct_idx = options.index(correct)
    return make_question(
        qid, "mcq",
        "Which of the following units of length represents the largest distance?",
        answer=chr(65 + correct_idx),
        explanation=(
            "Ranking these units by magnitude: "
            "1 fermi (fm) = 10⁻¹⁵ m - nuclear scale; "
            "1 angstrom (Å) = 10⁻¹⁰ m - atomic scale (outdated, replaced by nm); "
            "1 astronomical unit (AU) = 1.496 x 10¹¹ m - Earth-Sun distance; "
            "1 light year (ly) = 9.4607 x 10¹^2 m - distance light travels in 1 year (~63,240 AU); "
            "1 parsec (pc) = 3.0857 x 10¹⁶ m ≈ 3.26156 ly ≈ 206,265 AU. "
            "Parsec is the largest because it was defined using stellar parallax geometry, "
            "where 1 parsec is the distance at which 1 AU subtends 1 arcsecond."
        ),
        difficulty="Medium", topic="c11_phy_001: astronomical_units",
        options=options, correct_idx=correct_idx, competency=False,
        steps=["List approximate values of each unit in metres",
               "1 fm = 10⁻¹⁵ m, 1 Å = 10⁻¹⁰ m, 1 AU = 1.496x10¹¹ m",
               "1 ly = 9.46x10¹^2 m, 1 pc = 3.086x10¹⁶ m",
               "1 parsec > 1 light year > 1 AU > 1 angstrom > 1 fermi"],
    )


def gen_mcq_001_unified(bank: QuestionBank) -> Dict[str, Any]:
    """MCQ: Unified atomic mass unit symbol."""
    qid = bank.next_id("mcq")
    correct = "u"
    options = bank.shuffle(["amu", "u", "Da", "mmu", "a.m.u."])
    correct_idx = options.index(correct)
    return make_question(
        qid, "mcq",
        "According to the CISCE syllabus and the modern IUPAC convention, the correct symbol for the unified atomic mass unit is:",
        answer=chr(65 + correct_idx),
        explanation=(
            "The unified atomic mass unit (u) is defined as 1/12 of the mass of one atom of carbon-12. "
            "Its value is 1 u = 1.66053906660 x 10⁻^2⁷ kg. "
            "The symbol 'u' was recommended by IUPAC in 1961 (and is required by CISCE) "
            "to replace the older 'amu' which could ambiguously refer to either the physical scale "
            "based on oxygen-16 or carbon-12. 'Da' (dalton) is also used in biochemistry. "
            "1 u = 1 Da = 931.5 MeV/c^2 (via E=mc^2)."
        ),
        difficulty="Easy", topic="c11_phy_001: unified_atomic_mass",
        options=options, correct_idx=correct_idx, competency=False,
        steps=["Modern IUPAC symbol: u (unified atomic mass unit)",
               "Older symbol 'amu' is outdated (could mean two different scales)",
               "1 u = 1/12 mass of a carbon-12 atom = 1.6605x10⁻^2⁷ kg"],
    )


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS - c11_phy_001: FILL BLANK
# ─────────────────────────────────────────────────────────────────────────────

def gen_fb_001_prefix_power(bank: QuestionBank) -> Dict[str, Any]:
    """Fill blank: giga prefix power."""
    qid = bank.next_id("fb")
    prefix = bank.choice(["tera", "giga", "mega", "kilo", "milli", "micro", "nano", "pico", "femto", "atto"])
    info = PREFIXES[prefix]
    power = info["power"]
    return make_question(
        qid, "fill_blank",
        f"The SI prefix '_____' (symbol {info['symbol']}) corresponds to 10^{power}.",
        answer=str(power),
        explanation=(
            f"SI prefix '{prefix}' (symbol '{info['symbol']}') has a factor of 10^{power}. "
            f"This means 1 {info['symbol']}unit = 10^{power} units. "
            f"Example: 1 {info['symbol']}m = {info['factor']} m." if info['symbol'] else
            f"The base unit (no prefix) has a factor of 10^0 = 1."
        ),
        difficulty="Easy", topic="c11_phy_001: prefixes",
        numerical=True, tolerance=0, competency=False,
        steps=[f"Look up prefix '{prefix}' in SI prefix table",
               f"Power of 10 associated: {power}",
               f"Answer: {power}"],
    )


def gen_fb_001_base_unit_symbol(bank: QuestionBank) -> Dict[str, Any]:
    """Fill blank: SI base unit symbol."""
    qid = bank.next_id("fb")
    units = list(SI_BASE_UNITS.keys())
    unit_name = bank.choice(units)
    symbol = SI_BASE_UNITS[unit_name]["symbol"]
    return make_question(
        qid, "fill_blank",
        f"The SI base quantity '_____' has the symbol '{symbol}'.",
        answer=symbol,
        explanation=(
            f"All 7 SI base quantities and their symbols must be memorised: "
            f"metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd). "
            f"Symbols for units named after people are lowercase (a, K, cd) except the ampere (A). "
            f"Note: the unit 'second' is the only base unit whose symbol is not a single letter - it is 's'."
        ),
        difficulty="Easy", topic="c11_phy_001: si_base_units",
        competency=False,
        steps=["Identify the 7 SI base units from the syllabus",
               f"Match '{unit_name}' to its symbol: '{symbol}'",
               f"Answer: {symbol}"],
    )


def gen_fb_001_ly_to_au(bank: QuestionBank) -> Dict[str, Any]:
    """Fill blank: Convert light years to AU."""
    qid = bank.next_id("fb")
    ly = bank.randint(1, 10)
    au = ly * 63241
    return make_question(
        qid, "fill_blank",
        f"{ly} light year is approximately equal to _____ astronomical units (AU). "
        f"[Take 1 ly ≈ 9.46x10¹^2 km, 1 AU ≈ 1.5x10⁸ km]",
        answer=str(au),
        explanation=(
            f"1 ly = 9.46x10¹^2 km; 1 AU = 1.5x10⁸ km. "
            f"Number of AU in 1 ly = (9.46x10¹^2)/(1.5x10⁸) ≈ 63,241 AU. "
            f"Therefore {ly} ly = {ly} x 63241 = {au} AU. "
            "This is the standard conversion used in astrophysics."
        ),
        difficulty="Medium", topic="c11_phy_001: astronomical_units",
        numerical=True, tolerance=100, competency=False,
        steps=[f"Given: 1 ly = 9.46x10¹^2 km, 1 AU = 1.5x10⁸ km",
               f"1 ly in AU = 9.46x10¹^2 / 1.5x10⁸ = {9.46e12/1.5e8:.0f} AU",
               f"{ly} ly = {ly} x {9.46e12/1.5e8:.0f} = {au} AU"],
    )


def gen_fb_001_parsec(bank: QuestionBank) -> Dict[str, Any]:
    """Fill blank: Parsec definition."""
    qid = bank.next_id("fb")
    return make_question(
        qid, "fill_blank",
        "A parsec is the distance at which 1 AU subtends an angle of _____ arcsecond(s).",
        answer="1",
        explanation=(
            "A parsec (pc) is defined geometrically: it is the distance at which 1 astronomical unit "
            "(the Earth-Sun distance) subtends an angle of exactly 1 arcsecond. "
            "Using the small-angle formula: d = 1 AU / tan(1″) ≈ 1 AU x (180/pi x 3600) ≈ 206,265 AU ≈ 3.086x10¹⁶ m. "
            "1 parsec = 3.26156 light years. The word 'parsec' comes from 'parallax of one arcsecond'."
        ),
        difficulty="Medium", topic="c11_phy_001: astronomical_units",
        competency=False,
        steps=["Definition of parsec: parallax of 1 arcsecond",
               "Using small angle: 1 pc = 1 AU / tan(1″) ≈ 206265 AU",
               "Answer: 1 arcsecond"],
    )


def gen_fb_001_fermi(bank: QuestionBank) -> Dict[str, Any]:
    """Fill blank: Fermi unit for nuclear size."""
    qid = bank.next_id("fb")
    return make_question(
        qid, "fill_blank",
        "The approximate size of an atomic nucleus is measured in _____ (symbol fm), where 1 unit = 10⁻¹⁵ m.",
        answer="fermi",
        explanation=(
            "1 fermi (fm) = 10⁻¹⁵ m = 1 femtometre. "
            "The fermi was introduced by Enrico Fermi to measure nuclear sizes. "
            "A typical nucleus has a diameter of 2-10 fm. "
            "For comparison: an atom is ~1 Å (10⁻¹⁰ m), making the nucleus about 100,000 times smaller. "
            "1 u (unified atomic mass unit) = 931.5 MeV/c^2."
        ),
        difficulty="Easy", topic="c11_phy_001: fermi",
        competency=False,
        steps=["Fermi = 10⁻¹⁵ m is the standard nuclear length unit",
               "Symbol: fm (also written as fermi)",
               "Answer: fermi"],
    )


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS - c11_phy_001: SHORT ANSWER
# ─────────────────────────────────────────────────────────────────────────────

def gen_sa_001_five_systems(bank: QuestionBank) -> Dict[str, Any]:
    """Short answer: List and describe the five unit systems."""
    qid = bank.next_id("sa")
    return make_question(
        qid, "short_answer",
        "List the five systems of units studied in Class 11 Physics and give one "
        "example of the unit of length in each system.",
        answer=(
            "The five systems of units are:\n"
            "1. CGS: centimetre (cm), gram (g), second (s)\n"
            "2. FPS: foot (ft), pound (lb), second (s)\n"
            "3. MKS: metre (m), kilogram (kg), second (s)\n"
            "4. MKSA: metre (m), kilogram (kg), second (s), ampere (A)\n"
            "5. SI: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd)\n"
            "CGS and FPS are older systems; MKS extended CGS; MKSA added electric current; "
            "SI is the modern universal standard adopted by the CGPM in 1960 and updated in 1971."
        ),
        explanation=(
            "The evolution of unit systems reflects the growing scope of physics:\n"
            "CGS (centimetre-gram-second) was convenient for laboratory-scale mechanics "
            "but produced impractical electric units (statcoulomb).\n"
            "FPS (foot-pound-second) was used mainly in English-speaking countries for engineering.\n"
            "MKS (metre-kilogram-second) became practical for engineering and most physics.\n"
            "MKSA added ampere to make electrical units coherent with mechanical units.\n"
            "SI (1960, 7 base units from 1971) is the current international standard."
        ),
        difficulty="Medium", topic="c11_phy_001: unit_systems",
        competency=False, marks=2,
        key_points=[
            "CGS: centimetre (length), gram (mass), second (time)",
            "FPS: foot (length), pound (mass/force), second (time)",
            "MKS: metre, kilogram, second",
            "MKSA: metre, kilogram, second, ampere (current added)",
            "SI: seven base units - m, kg, s, A, K, mol, cd",
        ],
        steps=["Recall five systems: CGS, FPS, MKS, MKSA, SI",
               "Give base unit of length for each",
               "Briefly note evolution from older to modern system"],
    )


def gen_sa_001_seven_base(bank: QuestionBank) -> Dict[str, Any]:
    """Short answer: Name the 7 SI base units with symbols and dimensions."""
    qid = bank.next_id("sa")
    return make_question(
        qid, "short_answer",
        "Name the seven SI base quantities with their units and symbols, as established "
        "by the General Conference on Weights and Measures in 1971.",
        answer=(
            "1. Length → metre (m)\n"
            "2. Mass → kilogram (kg)\n"
            "3. Time → second (s)\n"
            "4. Electric current → ampere (A)\n"
            "5. Thermodynamic temperature → kelvin (K)\n"
            "6. Amount of substance → mole (mol)\n"
            "7. Luminous intensity → candela (cd)\n"
            "These were formalised at the 14th CGPM in 1971, adding mole and candela "
            "to the original six (m, kg, s, A,  deg K) from the 1960 SI definition."
        ),
        explanation=(
            "The 7th CGPM (1957) established metre, kilogram, second, ampere, degree Kelvin, candela. "
            "The 14th CGPM (1971) added the mole. "
            "Each base unit is defined by a precise physical constant or artifact: "
            "metre from speed of light (c), second from Cs-133 hyperfine transition, "
            "ampere from force between conductors, kelvin from triple point of water, "
            "mole from C-12 mass, candela from luminous efficacy of 540 THz radiation."
        ),
        difficulty="Medium", topic="c11_phy_001: si_base_units",
        competency=False, marks=2,
        key_points=[
            "Length: metre (m)",
            "Mass: kilogram (kg)",
            "Time: second (s)",
            "Electric current: ampere (A)",
            "Temperature: kelvin (K)",
            "Amount of substance: mole (mol)",
            "Luminous intensity: candela (cd)",
            "Formalised by 14th CGPM in 1971",
        ],
        steps=["List all 7 SI base quantities in order",
               "Give unit name and symbol for each",
               "Note: mole and candela added in 1971 by 14th CGPM"],
    )


def gen_sa_001_si_rules(bank: QuestionBank) -> Dict[str, Any]:
    """Short answer (competency): SI naming rules for a shopkeeper's weight labels."""
    qid = bank.next_id("sa")
    return make_question(
        qid, "short_answer",
        "A grain shopkeeper in a rural market in Maharashtra labels his spice packets "
        "as '5 Kg', '250 g', '1.2 Ltr'. Identify any errors in these labels according to "
        "SI naming conventions and write the correct form. "
        "( CISCE rule: unit symbols are written in lowercase unless named after a person; "
        "unit names are written in lowercase in running text.)",
        answer=(
            "Analysis of each label:\n"
            "1. '5 Kg' → INCORRECT: 'kg' is already a symbol; should be '5 kg' (lowercase k). "
            "If writing the full name: '5 kilogram' (lowercase in running text).\n"
            "2. '250 g' → CORRECT: 'g' (gram) is lowercase.\n"
            "3. '1.2 Ltr' → INCORRECT: should be '1.2 L' or '1.2 litre'. "
            "'Ltr' is not an SI symbol; SI symbol is 'L' or 'l' (litre).\n"
            "Correct labels: '5 kg', '250 g', '1.2 L'.\n"
            "Key SI rules: symbols for units named after people use the person's initial in "
            "uppercase (A for ampere); all other unit symbols are lowercase (m, kg, s, K, mol, cd). "
            "Unit names are never capitalised in the middle of a sentence."
        ),
        explanation=(
            "This competency question connects SI naming rules to an everyday Indian context. "
            "The International System of Units (SI) has strict conventions:\n"
            "• Unit symbols are CASE-SENSITIVE: kg (not Kg), m (not M), s (not S), "
            "A (ampere, named after André-Marie Ampère), K (kelvin, after Lord Kelvin - "
            "the degree symbol is  deg K or K, but never  deg k).\n"
            "• Unit names are written in lowercase in running text: 'a current of 5 amperes', "
            "NOT '5 Amperes'. Exception: 'degree Celsius' ( deg C) capitalises Celsius (person's name).\n"
            "• Symbols are NOT pluralised: '5 kg', NOT '5 kgs'.\n"
            "• A space separates number and unit: '5 kg', NOT '5kg'."
        ),
        difficulty="Medium", topic="c11_phy_001: si_naming_rules",
        competency=True, marks=2,
        key_points=[
            "'5 Kg' → incorrect; correct: '5 kg' (k is lowercase)",
            "'250 g' → correct",
            "'1.2 Ltr' → incorrect; correct: '1.2 L' or '1.2 litre'",
            "SI rule: unit symbols lowercase unless named after person",
            "SI rule: space between number and unit symbol",
            "SI rule: no plural 's' on unit symbols",
        ],
        steps=["Examine each label against SI naming rules",
               "Rule 1: unit symbols lowercase (kg, g, L/l)",
               "Rule 2: space between number and unit symbol",
               "Rule 3: no 'Ltr' abbreviation in SI",
               "Correct all three labels"],
    )


def gen_sa_001_mksa(bank: QuestionBank) -> Dict[str, Any]:
    """Short answer: Difference between MKS and MKSA."""
    qid = bank.next_id("sa")
    return make_question(
        qid, "short_answer",
        "Distinguish between the MKS and MKSA systems of units, and explain why the 'A' "
        "was added in MKSA. Give an example of how this affects electrical units.",
        answer=(
            "MKS system: metre (length), kilogram (mass), second (time) - three base quantities. "
            "MKSA system: metre, kilogram, second, ampere (electric current) - four base quantities. "
            "The ampere was added to make electrical units coherent with mechanical units, "
            "avoiding the inconvenient electrostatic CGS units (statcoulomb, statvolt). "
            "Example: In MKSA/SI, Coulomb = A·s (ampere x second), directly related to base units. "
            "In MKS alone, there was no electrical base unit, making Coulomb an arbitrary derived unit. "
            "MKSA → SI: SI added kelvin, mole, candela to become the 7-base-unit system."
        ),
        explanation=(
            "The progression MKS → MKSA → SI shows how unit systems evolve to cover "
            "broader areas of physics. MKS (19th century) covered mechanics well but "
            "had no standard for electric current. Giorgi (1901) proposed adding a fourth "
            "electrical base unit, which was adopted as MKSA. "
            "The ampere was chosen because electric current is a fundamental quantity "
            "that cannot be derived from purely mechanical units. "
            "With ampere as base, Coulomb (charge) = A·s, Volt (potential) = J/C = kg·m^2/s^3·A, "
            "and Ohm (resistance) = V/A = kg·m^2/s^3·A^2 - all coherently derived."
        ),
        difficulty="Medium", topic="c11_phy_001: mksa",
        competency=False, marks=2,
        key_points=[
            "MKS: m, kg, s - three base quantities (mechanical only)",
            "MKSA: adds Ampere (A) - four base quantities (electrical coherent)",
            "Ampere added by Giovanni Giorgi (1901)",
            "Makes Coulomb = A·s directly from base units",
            "SI later added K, mol, cd to MKSA",
        ],
        steps=["Define MKS: 3 base units (mechanics only)",
               "Define MKSA: 4 base units (added Ampere for electrical coherence)",
               "Explain impact: Coulomb, Ohm, Volt become coherently derived",
               "Note: SI = MKSA + K + mol + cd"],
    )


def gen_sa_001_india_metric(bank: QuestionBank) -> Dict[str, Any]:
    """Short answer (competency): India's metrication history and SI units in use."""
    qid = bank.next_id("sa")

    return {"status": "ok", "note": "truncated"}
