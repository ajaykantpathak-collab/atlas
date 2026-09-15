"""Local NLP extractor for variable extraction from natural language.

Uses regex for (number, unit) pair extraction (reliable, fast) and
spaCy for context phrase detection (understands sentence structure).

No API calls. Runs locally in ~5ms. Handles any number combination.
"""

import re
from typing import Optional

try:
    import spacy
    _nlp = None
    def get_nlp():
        global _nlp
        if _nlp is None:
            _nlp = spacy.load("en_core_web_sm")
        return _nlp
except ImportError:
    def get_nlp():
        return None


# --------------------------------------------------------------------------- #
# Unit → variable mapping (ordered by length, longest first for matching)
# --------------------------------------------------------------------------- #

UNIT_MAP = {
    # Acceleration
    "m/s²": "a", "m/s2": "a", "m/s^2": "a", "m/s**2": "a", "ms-2": "a",
    "m/sec²": "a", "meters per second squared": "a",
    "km/h²": "a", "km/h2": "a",
    # Velocity
    "m/s": "v", "ms-1": "v", "m/sec": "v", "meters per second": "v",
    "km/h": "v", "kmh": "v", "km/hr": "v", "km per hour": "v",
    "km/s": "v", "cm/s": "v",
    # Mass
    "kg": "m", "kilogram": "m", "kilograms": "m", "kilo": "m",
    "mg": "m", "milligram": "m", "milligrams": "m",
    "g": "m", "gram": "m", "grams": "m", "gm": "m",
    # Time
    "seconds": "t", "second": "t", "secs": "t", "sec": "t", "s": "t",
    "minutes": "t", "minute": "t", "mins": "t", "min": "t",
    "hours": "t", "hour": "t", "hrs": "t", "hr": "t", "h": "t",
    "years": "t", "year": "t", "yrs": "t",
    "days": "t", "day": "t",
    # Force
    "newtons": "F", "newton": "F", "kn": "F", "mn": "F",
    "n": "F",
    # Energy
    "joules": "E", "joule": "E", "kj": "E", "mj": "E",
    "ev": "E", "kev": "E", "mev": "E",
    "j": "E",
    # Power
    "watts": "P", "watt": "P", "kw": "P", "mw": "P",
    "w": "P",
    # Pressure
    "pascal": "P", "pascals": "P", "kpa": "P", "mpa": "P",
    "atm": "P", "bar": "P",
    "pa": "P",
    # Temperature
    "kelvin": "T", "kelvins": "T",
    "celsius": "T", "deg c": "T", "degree celsius": "T",
    "fahrenheit": "T",
    "k": "T", "°c": "T", "°f": "T",
    # Voltage
    "volts": "V", "volt": "V", "kv": "V", "mv": "V",
    "v": "V",
    # Current
    "amperes": "I", "ampere": "I", "amps": "I", "amp": "I", "ma": "I",
    "a": "I",
    # Resistance
    "ohms": "R", "ohm": "R", "kω": "R", "mω": "R",
    "ω": "R",
    # Charge
    "coulombs": "q", "coulomb": "q",
    "c": "q",
    # Capacitance
    "farads": "C", "farad": "C", "μf": "C", "uf": "C", "nf": "C", "pf": "C",
    "f": "C",
    # Frequency
    "hertz": "f", "khz": "f", "mhz": "f", "ghz": "f",
    "hz": "f",
    # Length/distance
    "kilometers": "s", "kilometer": "s", "km": "s",
    "centimeters": "s", "centimeter": "s", "cm": "s",
    "millimeters": "s", "millimeter": "s", "mm": "s",
    "meters": "s", "meter": "s", "metre": "s", "metres": "s",
    "m": "s",
    # Area
    "cm²": "area", "cm2": "area", "m²": "area", "m2": "area",
    "sq cm": "area", "sq m": "area",
    # Volume
    "m³": "V", "m3": "V", "cm³": "V", "cm3": "V", "cc": "V",
    "liters": "V", "liter": "V", "litres": "V", "litre": "V",
    "milliliters": "V", "milliliter": "V",
    "ml": "V",
    "l": "V",
    # Moles
    "moles": "n", "mole": "n",
    "mol": "n",
    # Molar mass
    "g/mol": "M", "g mol-1": "M", "g/mole": "M",
    # Molarity
    "molar": "M_conc",
    # Angle
    "degrees": "theta", "degree": "theta", "deg": "theta",
    "radians": "theta", "radian": "theta", "rad": "theta",
    "°": "theta",
    # Wavelength
    "nanometers": "lam", "nanometer": "lam", "nm": "lam",
    "micrometers": "lam", "micrometer": "lam", "μm": "lam",
    "angstrom": "lam", "å": "lam",
    # Radioactivity
    "becquerel": "activity", "becquerels": "activity", "bq": "activity",
    "curie": "activity", "ci": "activity",
}

# Sort units by length (longest first) for regex matching
SORTED_UNITS = sorted(UNIT_MAP.keys(), key=len, reverse=True)

# Build a regex pattern to match number + unit pairs
# Matches: "5 m/s²", "10 seconds", "12V", "0.001 M", "9.1e-31 kg"
_NUMBER_PATTERN = r'(\d+\.?\d*(?:e-?\d+)?)'
_UNIT_PATTERN = '|'.join(re.escape(u) for u in SORTED_UNITS)
# Match number followed by optional space followed by unit
NUM_UNIT_REGEX = re.compile(
    _NUMBER_PATTERN + r'\s*(' + _UNIT_PATTERN + r')',
    re.IGNORECASE
)

# Also match combined number+unit without space: "12V", "5kg", "10s"
COMBINED_REGEX = re.compile(
    _NUMBER_PATTERN + r'(' + _UNIT_PATTERN + r')',
    re.IGNORECASE
)


# --------------------------------------------------------------------------- #
# Context phrases that set variables to specific values
# --------------------------------------------------------------------------- #

CONTEXT_PHRASES = {
    "from rest": {"u": 0, "v_initial": 0},
    "starts from rest": {"u": 0, "v_initial": 0},
    "at rest": {"u": 0, "v_initial": 0},
    "initially at rest": {"u": 0, "v_initial": 0},
    "from stationary": {"u": 0, "v_initial": 0},
    "comes to rest": {"v": 0, "v_final": 0},
    "comes to a stop": {"v": 0, "v_final": 0},
    "comes to a halt": {"v": 0, "v_final": 0},
    "freely falling": {"a": 9.8, "u": 0},
    "free fall": {"a": 9.8, "u": 0},
    "in free fall": {"a": 9.8, "u": 0},
    "dropped": {"u": 0, "v_initial": 0},
    "vertically upward": {"a": -9.8},
    "vertically downward": {"a": 9.8},
    "horizontally": {"theta": 0, "angle": 0},
    "at right angles": {"theta": 90, "angle": 90},
    "perpendicular": {"theta": 90, "angle": 90},
    "parallel": {"theta": 0, "angle": 0},
    "standard temperature": {"T": 273},
    "standard pressure": {"P": 1},
    "stp": {"T": 273, "P": 1},
    "room temperature": {"T": 298},
    "neutral": {"pH": 7},
}

# Context words that mark the NEXT number as a specific variable
CONTEXT_MARKERS = {
    "initial": "u",
    "final": "v",
    "focal": "f",
    "first": "a",
    "half life": "half_life",
    "half-life": "half_life",
    "molar mass": "M",
    "work function": "phi",
    "specific heat": "c",
    "spring constant": "k",
    "common difference": "d",
    "common ratio": "r",
    "h+": "H",
    "h +": "H",
}


# --------------------------------------------------------------------------- #
# Main extraction function
# --------------------------------------------------------------------------- #

def extract_variables(question: str) -> dict:
    """Extract variables from a natural language question.
    
    Uses regex for (number, unit) pairs and spaCy for context.
    Returns a dict of {variable_name: value}.
    No API calls. Runs locally in ~5ms.
    """
    variables = {}
    lower_q = question.lower()
    
    # Step 1: Context phrases (multi-word) — check on original question
    for phrase, vals in CONTEXT_PHRASES.items():
        if phrase in lower_q:
            variables.update(vals)
    
    # Step 2: Find all (number, unit) pairs using regex
    # This is reliable because units are a finite known set
    found_pairs = []
    for m in NUM_UNIT_REGEX.finditer(question):
        value = _try_parse_scientific(m.group(1))
        unit = m.group(2).lower()
        if value is not None and unit in UNIT_MAP:
            found_pairs.append((value, unit, m.start(), m.end()))
    
    # Also check for combined number+unit (no space): "12V", "5kg"
    for m in COMBINED_REGEX.finditer(question):
        value = _try_parse_scientific(m.group(1))
        unit = m.group(2).lower()
        if value is not None and unit in UNIT_MAP:
            # Avoid duplicates with the space-separated match
            if not any(abs(m.start() - fp[2]) < 2 for fp in found_pairs):
                found_pairs.append((value, unit, m.start(), m.end()))
    
    # Step 3: Map (number, unit) pairs to variables
    # Handle conflicts and context-based disambiguation
    for value, unit, start_pos, _ in found_pairs:
        var_name = UNIT_MAP[unit]
        
        # Get context around this number+unit (30 chars before)
        context_before = lower_q[max(0, start_pos - 30):start_pos]
        
        # Handle "m" ambiguity: meters (distance) vs molar (concentration)
        if unit == "m" and any(kw in lower_q for kw in ["molar", "concentration", "molarity", "solution", "dilute", "ph", "h+"]):
            var_name = "M_conc"
        # Context-aware mapping for meters
        elif unit == "m":
            if "height" in context_before or "height" in lower_q[max(0, start_pos-10):start_pos+10]:
                var_name = "h"
            elif "radius" in context_before or "radius" in lower_q[max(0, start_pos-10):start_pos+10]:
                var_name = "r"
            elif "length" in context_before or "length" in lower_q[max(0, start_pos-10):start_pos+10]:
                var_name = "l"
            elif "pendulum" in context_before:
                var_name = "L"
        
        # Handle "v" ambiguity: velocity vs voltage
        if unit == "v" and any(kw in lower_q for kw in ["battery", "voltage", "circuit", "resistor", "capacitor", "charged to"]):
            var_name = "V_volt"
        # "moving at X m/s" or "thrown at X m/s" → initial velocity
        elif unit in ("m/s", "ms-1", "m/sec", "km/h", "kmh", "km/hr", "km/s", "cm/s"):
            if any(kw in context_before for kw in ["moving at", "thrown at", "launched at", "projected at", "initial", "starts at"]):
                var_name = "u"
        
        # Handle "a" ambiguity: acceleration vs amperes
        if unit == "a":
            # Only map to current if clearly electrical context
            if any(kw in lower_q for kw in ["current", "circuit", "ampere", "resistor", "battery"]) and "accelerat" not in lower_q:
                var_name = "I"
            else:
                var_name = "a"  # acceleration
        
        # Handle "f" ambiguity: frequency vs farads
        if unit == "f" and any(kw in lower_q for kw in ["capacitor", "capacitance", "charged"]):
            var_name = "C"
        
        # Handle "l" ambiguity: liters vs length
        if unit == "l" and not any(kw in lower_q for kw in ["liter", "litre", "volume", "solution", "dilute"]):
            var_name = "s"  # length
        
        # Handle "g" ambiguity: grams (mass) vs g/mol (molar mass)
        # "X g of" → mass; "X g/mol" → molar mass (already handled by unit length)
        if unit == "g" and "of" in lower_q[start_pos+len(unit):start_pos+len(unit)+5]:
            var_name = "m"  # mass
        
        # Don't overwrite if already set by context phrase or explicit pattern
        if var_name not in variables:
            variables[var_name] = value
        else:
            # Try alternatives
            alternatives = {
                "v": "u", "s": "h", "t": "t2", "m": "m2",
                "V": "V2", "T": "T2", "P": "P2", "E": "E2",
                "theta": "theta2", "n": "n2", "a": "a2",
            }
            alt = alternatives.get(var_name)
            if alt and alt not in variables:
                variables[alt] = value
            else:
                idx = 2
                while f"{var_name}{idx}" in variables:
                    idx += 1
                variables[f"{var_name}{idx}"] = value
    
    # Step 4: Extract explicit "variable = value" patterns
    # Handle negative numbers with -? prefix
    explicit_patterns = [
        (r'\bu\s*=\s*(-?\d+\.?\d*e?-?\d*)', "u"),
        (r'\ba\s*=\s*(-?\d+\.?\d*e?-?\d*)', "a"),
        (r'\bt\s*=\s*(-?\d+\.?\d*e?-?\d*)', "t"),
        (r'\bv\s*=\s*(-?\d+\.?\d*e?-?\d*)', "v"),
        (r'\bs\s*=\s*(-?\d+\.?\d*e?-?\d*)', "s"),
        (r'\bf\s*=\s*(-?\d+\.?\d*e?-?\d*)', "f"),
        (r'\bn\s*=\s*(-?\d+\.?\d*e?-?\d*)', "n"),
        (r'\bm\s*=\s*(-?\d+\.?\d*e?-?\d*)', "m"),
        (r'\br\s*=\s*(-?\d+\.?\d*e?-?\d*)', "r"),
        (r'\bR\s*=\s*(-?\d+\.?\d*e?-?\d*)', "R"),
        (r'\bI\s*=\s*(-?\d+\.?\d*e?-?\d*)', "I"),
        (r'\bV\s*=\s*(-?\d+\.?\d*e?-?\d*)', "V"),
        (r'\bk\s*=\s*(-?\d+\.?\d*e?-?\d*)', "k"),
        (r'\bd\s*=\s*(-?\d+\.?\d*e?-?\d*)', "d"),
        (r'\bh\s*=\s*(-?\d+\.?\d*e?-?\d*)', "h"),
        (r'\bM\s*=\s*(-?\d+\.?\d*e?-?\d*)', "M"),
        (r'\bT\s*=\s*(-?\d+\.?\d*e?-?\d*)', "T"),
        (r'\bP\s*=\s*(-?\d+\.?\d*e?-?\d*)', "P"),
        (r'\bE\s*=\s*(-?\d+\.?\d*e?-?\d*)', "E"),
        (r'\bF\s*=\s*(-?\d+\.?\d*e?-?\d*)', "F"),
        (r'\bq\s*=\s*(-?\d+\.?\d*e?-?\d*)', "q"),
        (r'\btheta\s*=\s*(-?\d+\.?\d*e?-?\d*)', "theta"),
        (r'\blambda\s*=\s*(-?\d+\.?\d*e?-?\d*)', "lam"),
        (r'\bphi\s*=\s*(-?\d+\.?\d*e?-?\d*)', "phi"),
    ]
    
    # Handle c/C ambiguity: if quadratic context, c = constant; else C = capacitance
    if any(kw in lower_q for kw in ["quadratic", "roots", "x²", "x^2", "x**2", "coefficients"]):
        # Quadratic context: a, b, c are coefficients
        for var, name in [("a", "a"), ("b", "b"), ("c", "c")]:
            m = re.search(rf'\b{var}\s*=\s*(-?\d+\.?\d*e?-?\d*)', question)
            if m:
                val = _try_parse_scientific(m.group(1))
                if val is not None:
                    variables[name] = val
    else:
        # Non-quadratic: C = capacitance
        m = re.search(r'\bC\s*=\s*(-?\d+\.?\d*e?-?\d*)', question)
        if m:
            val = _try_parse_scientific(m.group(1))
            if val is not None:
                variables["C"] = val
    for pattern, var_name in explicit_patterns:
        m = re.search(pattern, question, re.IGNORECASE)
        if m:
            val = _try_parse_scientific(m.group(1))
            if val is not None:
                variables[var_name] = val
    
    # Step 5: Extract "keyword = value" patterns
    keyword_patterns = [
        (r'(?<!molar )(?<!molar\s)mass\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "m"),
        (r'velocity\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "v"),
        (r'initial\s*velocity\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "u"),
        (r'final\s*velocity\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "v"),
        (r'speed\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "v"),
        (r'acceleration\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "a"),
        (r'time\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "t"),
        (r'distance\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "s"),
        (r'height\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "h"),
        (r'radius\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "r"),
        (r'force\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "F"),
        (r'energy\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "E"),
        (r'power\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "P"),
        (r'current\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "I"),
        (r'voltage\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "V"),
        (r'resistance\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "R"),
        (r'temperature\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "T"),
        (r'pressure\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "P"),
        (r'frequency\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "f"),
        (r'wavelength\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "lam"),
        (r'angle\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "theta"),
        (r'moles?\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "n"),
        (r'molar\s*mass\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "M"),
        (r'volume\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "V"),
        (r'concentration\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "H"),
        (r'\[h\+?\]\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "H"),
        (r'first\s*term\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "a"),
        (r'common\s*difference\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "d"),
        (r'common\s*ratio\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "r"),
        (r'spring\s*constant\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "k"),
        (r'half\s*life\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "half_life"),
        (r'focal\s*length\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "f"),
        (r'object\s*distance\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "u"),
        (r'image\s*distance\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "v"),
        (r'work\s*function\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "phi"),
        (r'capacitance\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "C"),
        (r'charge\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "q"),
        (r'area\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "area"),
        (r'length\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "l"),
        (r'width\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "w"),
        (r'base\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "b"),
        # Simple/compound interest
        (r'(?:simple\s+interest|si)\s*(?:on|is|=|:)?\s*(\d+\.?\d*e?-?\d*)', "P"),
        (r'principal\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)', "P"),
        (r'(?:on|amount)\s+(\d+\.?\d*e?-?\d*)\s+at\s+(\d+\.?\d*e?-?\d*)\s*%\s*(?:for)?\s*(\d+\.?\d*e?-?\d*)\s*years?', "P_R_T"),
        (r'rate\s*(?:is|=|:)\s*(\d+\.?\d*e?-?\d*)\s*%', "R"),
        (r'for\s+(\d+\.?\d*e?-?\d*)\s+years?', "T"),
        # Speed/distance/time
        (r'travels?\s+(\d+\.?\d*e?-?\d*)\s*km', "distance"),
        (r'in\s+(\d+\.?\d*e?-?\d*)\s+hours?', "time_speed"),
        (r'(\d+\.?\d*e?-?\d*)\s*km\s+in\s+(\d+\.?\d*e?-?\d*)\s+hours?', "dist_time"),
        # Mean
        (r'sum\s*(?:is|=|:|of)\s*(\d+\.?\d*e?-?\d*)', "sum"),
        (r'(\d+)\s+numbers?\s+(?:with\s+)?sum\s+(\d+\.?\d*e?-?\d*)', "count_sum"),
        # Unitary method
        (r'(\d+)\s+(?:pens?|books?|items?|units?|things?|objects?)\s+cost\s+(\d+\.?\d*e?-?\d*)', "qty_cost"),
        (r'cost\s+(\d+\.?\d*e?-?\d*)\s+(?:rupees?|rs)', "total_cost"),
        # Free fall / energy
        (r'(?:dropped|falls?)\s+from\s+(?:a\s+)?(?:height\s+)?(?:of\s+)?(\d+\.?\d*)\s*m', "h_freefall"),
        (r'(\d+\.?\d*)\s*m\s+high', "h"),
        # Lens formula
        (r'focal\s+length\s+(?:is|=|:|of)?\s*(\d+\.?\d*)', "f"),
        (r'object\s+(?:is\s+)?(?:placed\s+)?(?:at\s+)?(\d+\.?\d*)\s*cm', "u_lens"),
        # Radioactive decay
        (r'initial\s+mass\s+(?:is|=|:)?\s*(\d+\.?\d*)', "N0"),
        (r'half-life\s+(?:is|=|:|of)?\s*(\d+\.?\d*)', "T_half"),
        (r'half\s+life\s+(?:is|=|:|of)?\s*(\d+\.?\d*)', "T_half"),
        (r'after\s+(\d+\.?\d*)\s+years?', "t_decay"),
        # Phase change
        (r'(\d+\.?\d*)\s*g\s+of\s+ice', "m_ice"),
        (r'ice\s+at\s+(-?\d+\.?\d*)', "T_ice"),
        (r'water\s+at\s+(\d+\.?\d*)', "T_water"),
        (r'c_ice\s*=\s*(\d+\.?\d*)', "c_ice"),
        (r'l_fusion\s*=\s*(\d+\.?\d*)', "L_fusion"),
        (r'c_water\s*=\s*(\d+\.?\d*)', "c_water"),
        # Ideal gas
        (r'(\d+\.?\d*)\s*atm', "P_gas"),
        (r'occupies\s+(\d+\.?\d*)\s*L\b', "V_gas"),
        (r'(\d+\.?\d*)\s*K\b', "T_gas"),
        # Conservation of momentum
        (r'(\d+\.?\d*)\s*kg\s+(?:ball|object|mass|car|body)', "m_momentum"),
        (r'moving\s+at\s+(\d+\.?\d*)\s*m/s', "v_momentum"),
        (r'stationary\s+(\d+\.?\d*)\s*kg', "m2_momentum"),
        (r'after\s+collision.*?moves\s+at\s+(\d+\.?\d*)', "v1_after"),
        (r'(\d+\.?\d*)\s*kg\s+(?:ball|object).*?moves\s+at\s+(\d+\.?\d*)', "m1_v1_pair"),
        # Series resistors
        (r'two\s+(\d+\.?\d*)\s*ohm\s+resistors?\s+in\s+series', "R_series_pair"),
        (r'(\d+\.?\d*)\s*V\s+battery', "V_battery"),
        # Cosine rule
        (r'sides?\s+(\d+\.?\d*)\s*,?\s*(\d+\.?\d*)\s*,?\s*(?:and\s+)?(\d+\.?\d*)', "triangle_sides"),
        # AP sum formula — handle unicode ² and ^2
        (r'(\d+\.?\d*)\s*n(?:\^?2|²)\s*\+\s*(\d+\.?\d*)\s*n\b', "ap_sum_coefs"),
        # Compound interest deposits
        (r'deposits\s+(\d+\.?\d*)', "P_deposit"),
        (r'paying\s+(\d+\.?\d*)\s*%', "R_rate"),
        # Probability balls
        (r'(\d+)\s+red', "red_balls"),
        (r'(\d+)\s+blue', "blue_balls"),
        (r'(\d+)\s+balls?\s+drawn', "draw_count"),
        # Equilibrium ICE table
        (r'(\d+\.?\d*)\s+moles?\s+of\s+n2', "n_N2_init"),
        (r'(\d+\.?\d*)\s+moles?\s+of\s+h2', "n_H2_init"),
        (r'(\d+\.?\d*)\s+moles?\s+of\s+nh3\s+(?:is\s+)?formed', "n_NH3_eq"),
        (r'(\d+\.?\d*)\s+moles?\s+of\s+nh3\s+formed', "n_NH3_eq"),
        # Rectangle inscribed in circle
        (r'circle\s+of\s+radius\s+(\d+\.?\d*)', "r_circle"),
        (r'radius\s+(?:is|=|:|of)?\s*(\d+\.?\d*)', "r"),
        # Band/crawling problems
        (r'crawls?\s+at\s+(\d+\.?\d*)\s*cm/s', "crawl_speed"),
        (r'(\d+\.?\d*)\s*cm\s+band', "band_length"),
        (r'(\d+\.?\d*)\s*cm\s+(?:long\s+)?rubber\s+band', "band_length"),
        (r'initial\s+length\s+(\d+\.?\d*)', "band_length"),
        (r'stretch(?:es|ing)?\s+(?:uniformly\s+)?at\s+(\d+\.?\d*)\s*cm/s', "stretch_rate"),
        (r'doubles?\s+in\s+length\s+every\s+second', "doubling_band_flag"),
    ]
    for pattern, var_name in keyword_patterns:
        m = re.search(pattern, question, re.IGNORECASE)
        if m:
            if var_name == "P_R_T" and len(m.groups()) >= 3:
                # "on 1000 at 5% for 2 years" → P, R, T
                variables["P"] = _try_parse_scientific(m.group(1))
                variables["R"] = _try_parse_scientific(m.group(2))
                variables["T"] = _try_parse_scientific(m.group(3))
            elif var_name == "dist_time" and len(m.groups()) >= 2:
                # "60 km in 1.5 hours" → distance, time
                variables["distance"] = _try_parse_scientific(m.group(1))
                variables["time_speed"] = _try_parse_scientific(m.group(2))
            elif var_name == "count_sum" and len(m.groups()) >= 2:
                # "5 numbers with sum 60" → count, sum
                variables["count"] = int(float(m.group(1)))
                variables["sum"] = _try_parse_scientific(m.group(2))
            elif var_name == "qty_cost" and len(m.groups()) >= 2:
                # "5 pens cost 25" → quantity, total_cost
                variables["quantity"] = int(float(m.group(1)))
                variables["total_cost"] = _try_parse_scientific(m.group(2))
            elif var_name == "triangle_sides" and len(m.groups()) >= 3:
                # "sides 3, 4, 5" → a, b, c
                variables["a"] = _try_parse_scientific(m.group(1))
                variables["b"] = _try_parse_scientific(m.group(2))
                variables["c"] = _try_parse_scientific(m.group(3))
            elif var_name == "ap_sum_coefs" and len(m.groups()) >= 2:
                # "3n² + 5n" → coef_n2=3, coef_n=5
                variables["coef_n2"] = _try_parse_scientific(m.group(1))
                variables["coef_n"] = _try_parse_scientific(m.group(2))
            elif var_name == "R_series_pair":
                # "two 10 ohm resistors in series" → R1=10, R2=10
                variables["R1"] = _try_parse_scientific(m.group(1))
                variables["R2"] = _try_parse_scientific(m.group(1))
            elif var_name == "m1_v1_pair" and len(m.groups()) >= 2:
                # "2 kg ball moves at 4 m/s" → m1=2, v1=4
                variables["m1"] = _try_parse_scientific(m.group(1))
                variables["v1"] = _try_parse_scientific(m.group(2))
            elif var_name == "doubling_band_flag":
                # No capture group — just set a flag
                variables["doubling_band"] = 1.0
            else:
                val = _try_parse_scientific(m.group(1))
                if val is not None:
                    variables[var_name] = val
    
    # Step 6: Context markers — use spaCy to find which number follows a marker
    nlp = get_nlp()
    if nlp:
        doc = nlp(question)
        tokens = list(doc)
        for i, token in enumerate(tokens):
            if token.like_num or token.pos_ == "NUM":
                value = _try_parse_scientific(token.text)
                if value is None:
                    continue
                # Look backwards for context markers
                for j in range(max(0, i - 4), i):
                    text = tokens[j].text.lower()
                    next_text = tokens[j+1].text.lower() if j+1 < len(tokens) else ""
                    bigram = f"{text} {next_text}"
                    if text in CONTEXT_MARKERS:
                        var = CONTEXT_MARKERS[text]
                        variables[var] = value
                        break
                    if bigram in CONTEXT_MARKERS:
                        var = CONTEXT_MARKERS[bigram]
                        variables[var] = value
                        break
    
    # Step 7: Extract coordinate pairs for distance/midpoint/slope
    coord_match = re.findall(r'\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)', question)
    if len(coord_match) >= 2:
        variables["x1"] = float(coord_match[0][0])
        variables["y1"] = float(coord_match[0][1])
        variables["x2"] = float(coord_match[1][0])
        variables["y2"] = float(coord_match[1][1])
    elif len(coord_match) == 1:
        variables["x1"] = float(coord_match[0][0])
        variables["y1"] = float(coord_match[0][1])
    
    # Step 8: Extract "Nth term" / "first N terms" patterns
    nth_match = re.search(r'(\d+)(?:st|nd|rd|th)\s+term', question, re.IGNORECASE)
    if nth_match:
        variables["n"] = int(nth_match.group(1))
    
    terms_match = re.search(r'first\s+(\d+)\s+terms', question, re.IGNORECASE)
    if terms_match:
        variables["n"] = int(terms_match.group(1))
    
    # Step 9: Extract "twice as long as wide" → ratio = 2
    if re.search(r'twice\s+as\s+long\s+as\s+wide', question, re.IGNORECASE):
        variables["ratio"] = 2
    if re.search(r'three\s+times\s+as\s+long\s+as\s+wide', question, re.IGNORECASE):
        variables["ratio"] = 3
    if re.search(r'thrice\s+as\s+long\s+as\s+wide', question, re.IGNORECASE):
        variables["ratio"] = 3
    
    # Step 10: Extract percentage patterns
    pct_match = re.search(r'(\d+\.?\d*)\s*%\s*of\s*(\d+\.?\d*)', question, re.IGNORECASE)
    if pct_match:
        variables["percentage"] = float(pct_match.group(1))
        variables["total"] = float(pct_match.group(2))
    
    return variables


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #

def _parse_number(text: str) -> Optional[float]:
    """Parse a number from text."""
    try:
        if "/" in text and not text.startswith("/"):
            parts = text.split("/")
            if len(parts) == 2:
                return float(parts[0]) / float(parts[1])
        return float(text)
    except (ValueError, TypeError):
        return None


def _try_parse_scientific(text: str) -> Optional[float]:
    """Parse scientific notation: 9.1e-31, 1e6, 6.022e23, 0.001, 1.5."""
    try:
        return float(text)
    except (ValueError, TypeError):
        return None
