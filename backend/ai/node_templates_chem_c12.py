"""Node-mapped templates for Chemistry Class 12 (CISCE/ISC).

Each template is traceable to a specific atomic curriculum node via `node_id`.
Formulas sourced from the CISCE Chemistry formula bank (c11_c12).
"""

CHEM_C12_NODE_TEMPLATES = [

# c12_chem_008: Osmotic pressure — πV = nRT, M = mRT/(πV)
{
    "template_name": "c12_chem_008_osmotic_pressure_molar_mass",
    "node_id": "c12_chem_008",
    "normalized_pattern": "calculate molar mass of protein if osmotic pressure volume mass temperature given",
    "keywords": ["osmotic pressure", "molar mass", "protein", "calculate", "atm", "temperature"],
    "variables": [
        {"name": "pi", "patterns": [r"osmotic pressure\s*(?:is|=|:|of)?\s*(\d+\.?\d*(?:e[+-]?\d+)?)", r"(\d+\.?\d*(?:e[+-]?\d+)?)\s*atm.*osmotic", r"pi\s*[=:]\s*(\d+\.?\d*(?:e[+-]?\d+)?)"], "required": True},
        {"name": "V", "patterns": [r"(\d+\.?\d*)\s*cm3.*(?:contains|solution)", r"(\d+\.?\d*)\s*mL.*(?:contains|solution)", r"volume\s*[=:]\s*(\d+\.?\d*)", r"V\s*[=:]\s*(\d+\.?\d*)"], "required": True},
        {"name": "mass", "patterns": [r"(\d+\.?\d*)\s*g\s*(?:of\s+)?(?:protein|solute|substance)", r"mass\s*[=:]\s*(\d+\.?\d*)\s*g", r"contains\s*(\d+\.?\d*)\s*g"], "required": True},
        {"name": "T", "patterns": [r"(\d+\.?\d*)\s*K", r"temperature\s*[=:]\s*(\d+\.?\d*)", r"T\s*[=:]\s*(\d+\.?\d*)\s*K"], "required": True},
    ],
    "steps": [
        {"command": "calculate {mass} * 0.0821 * {T} / ({pi} * {V} / 1000)", "purpose": "Find molar mass using M = mRT/(πV). V in cm³ → convert to L (÷1000). R = 0.0821 L·atm/(mol·K)"},
    ],
    "subject": "chem",
},

# c12_chem_012: Isotonic solutions — C1/M1 = C2/M2
{
    "template_name": "c12_chem_012_isotonic_molar_mass",
    "node_id": "c12_chem_012",
    "normalized_pattern": "isotonic solution calculate molar mass if percentage concentration and known molar mass given",
    "keywords": ["isotonic", "molar mass", "calculate", "glucose", "urea", "percentage", "solution"],
    "variables": [
        {"name": "pct1", "patterns": [r"(\d+\.?\d*)\s*%.*(?:glucose|sucrose|known)", r"(\d+\.?\d*)\s*%\s*(?:aqueous\s+)?solution.*(?:glucose|sucrose|known)"], "required": True},
        {"name": "M1", "patterns": [r"molar mass\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*g/mol.*(?:glucose|sucrose|known)"], "required": True},
        {"name": "pct2", "patterns": [r"(\d+\.?\d*)\s*%.*(?:urea|unknown)", r"(\d+\.?\d*)\s*%\s*(?:aqueous\s+)?solution.*(?:urea|unknown)"], "required": True},
    ],
    "steps": [
        {"command": "calculate {pct2} * {M1} / {pct1}", "purpose": "For isotonic solutions: C1/M1 = C2/M2 → M2 = (pct2 × M1)/pct1"},
    ],
    "subject": "chem",
},

# c12_chem_019: Electroplating / Faraday's law — Q = n×z×F
{
    "template_name": "c12_chem_019_electroplating_coulombs",
    "node_id": "c12_chem_019",
    "normalized_pattern": "calculate coulombs required to electroplate if mass and atomic weight and electrons given",
    "keywords": ["coulombs", "electroplate", "electroplating", "faraday", "atomic weight", "calculate"],
    "variables": [
        {"name": "mass", "patterns": [r"(\d+\.?\d*)\s*g\s*(?:of\s+)?(?:aluminium|aluminum|copper|silver|zinc|nickel|metal)", r"electroplate\s*(\d+\.?\d*)\s*g", r"mass\s*[=:]\s*(\d+\.?\d*)\s*g"], "required": True},
        {"name": "M", "patterns": [r"atomic weight\s*[=:]\s*(\d+\.?\d*)", r"molar mass\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*g/mol"], "required": True},
        {"name": "z", "patterns": [r"(\d+)\s*e-?\s*->", r"(\d+)\s*electrons?", r"Al(\d+)\+", r"Cu(\d+)\+", r"charge\s*[=:]\s*(\d+)"], "required": True},
        {"name": "F", "patterns": [r"(?:1\s*)?[Ff]araday\s*[=:]\s*(\d+\.?\d*)", r"(\d+\.?\d*)\s*coulombs.*[Ff]araday"], "required": False, "default": "96500"},
    ],
    "steps": [
        {"command": "calculate ({mass} / {M}) * {z} * {F}", "purpose": "Find coulombs: n = mass/M, then Q = n×z×F"},
    ],
    "subject": "chem",
},

# c12_chem_024: Rate constant order — units s⁻¹ → first order
{
    "template_name": "c12_chem_024_rate_constant_order",
    "node_id": "c12_chem_024",
    "normalized_pattern": "rate constant per second what is order of reaction",
    "keywords": ["rate constant", "per second", "order", "reaction", "s-1", "units"],
    "variables": [
        {"name": "unit_type", "patterns": [r"per\s*second", r"s-1", r"s\^-1", r"/s\b"], "required": False, "default": "first"},
    ],
    "steps": [
        {"command": "calculate 1", "purpose": "Rate constant with units s⁻¹ (per second) indicates a first-order reaction. For first order: rate = k[A]¹, units of k = s⁻¹"},
    ],
    "subject": "chem",
    "rule": "Rate constant units s⁻¹ → first order. Units mol⁻¹·L·s⁻¹ → second order. Units mol⁻²·L²·s⁻¹ → third order.",
},

]
