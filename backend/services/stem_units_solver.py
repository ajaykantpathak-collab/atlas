"""
stem_units_solver.py — Physics & Chemistry solver using pint + chempy.

Uses:
  - pint: Unit-aware calculations, dimensional analysis, unit conversion
  - chempy: Chemical equation balancing, molar masses, stoichiometry

This is a deterministic solver — no LLM, no SymPy guessing.
It extracts quantities with units from the question text, identifies the
formula, and computes the answer with proper unit handling.

Routing order in SolverRouter:
  1. core_calculus_engine (calculus operations)
  2. stem_units_solver (physics + chemistry with units)  ← THIS
  3. KB pipeline (enrichment routing for theoretical)
  4. Legacy solvers (pattern_solver, compute_engine fallback)
"""
from __future__ import annotations

import logging
import re
import math
from dataclasses import dataclass, field
from typing import Optional, Dict, Any, List, Tuple

logger = logging.getLogger(__name__)

# ──────────────────────────────────────────────────────────────────────
# Lazy-loaded registries (avoid import cost if never used)
# ──────────────────────────────────────────────────────────────────────
_ureg = None
_chempy_available = None


def _get_ureg():
    """Lazy-load pint UnitRegistry."""
    global _ureg
    if _ureg is None:
        import pint
        _ureg = pint.UnitRegistry()
        # pint already knows all standard units (m, s, kg, N, J, W, V, A, Hz, K, mol, Pa, atm, L)
        # No need to redefine — that causes warnings
    return _ureg


def _get_chempy():
    """Lazy-load chempy."""
    global _chempy_available
    if _chempy_available is None:
        try:
            import chempy
            _chempy_available = True
        except ImportError:
            _chempy_available = False
    return _chempy_available


# ──────────────────────────────────────────────────────────────────────
# Result type
# ──────────────────────────────────────────────────────────────────────
@dataclass
class UnitsSolverResult:
    success: bool
    answer: str = ""
    answer_value: Optional[float] = None
    answer_unit: str = ""
    steps: List[str] = field(default_factory=list)
    formula_used: str = ""
    backend_used: str = "stem_units_solver"
    confidence: float = 0.85
    error: str = ""


# ──────────────────────────────────────────────────────────────────────
# Quantity extraction with units
# ──────────────────────────────────────────────────────────────────────

# Map common unit spellings to pint-compatible units
UNIT_ALIASES = {
    'm/s': 'meter/second',
    'm/s²': 'meter/second**2',
    'm/s^2': 'meter/second**2',
    'm/s2': 'meter/second**2',
    'm/s/s': 'meter/second**2',
    'km/h': 'kilometer/hour',
    'km/hr': 'kilometer/hour',
    'g/mol': 'gram/mole',
    'g/mole': 'gram/mole',
    'kg/m³': 'kilogram/meter**3',
    'N': 'newton',
    'J': 'joule',
    'W': 'watt',
    'V': 'volt',
    'A': 'ampere',
    'Hz': 'hertz',
    'Pa': 'pascal',
    'atm': 'atmosphere',
    'mol': 'mole',
    'L': 'liter',
    'mL': 'milliliter',
    'g': 'gram',
    'kg': 'kilogram',
    'mg': 'milligram',
    'm': 'meter',
    'cm': 'centimeter',
    'km': 'kilometer',
    'mm': 'millimeter',
    's': 'second',
    'min': 'minute',
    'hr': 'hour',
    'h': 'hour',
    'K': 'kelvin',
    '°C': 'degC',
    '°F': 'degF',
    'Ω': 'ohm',
    'ohm': 'ohm',
}

# Variable name → standard symbol mapping
VAR_ALIASES = {
    'force': 'F', 'f': 'F',
    'mass': 'm',
    'acceleration': 'a', 'accel': 'a',
    'velocity': 'v', 'speed': 'v', 'final velocity': 'v',
    'initial velocity': 'u', 'u': 'u',
    'time': 't', 't': 't',
    'distance': 's', 'displacement': 's', 'd': 's',
    'height': 'h', 'h': 'h',
    'energy': 'E', 'kinetic energy': 'KE', 'ke': 'KE',
    'potential energy': 'PE', 'pe': 'PE',
    'power': 'P', 'p': 'P',
    'work': 'W',
    'charge': 'q', 'q': 'q',
    'voltage': 'V', 'potential difference': 'V',
    'current': 'I', 'i': 'I',
    'resistance': 'R', 'r': 'R',
    'frequency': 'f', 'freq': 'f',
    'wavelength': 'lambda', 'λ': 'lambda',
    'temperature': 'T',
    'pressure': 'P_press',
    'volume': 'V_vol',
    'moles': 'n', 'n': 'n',
    'molarity': 'M', 'concentration': 'C',
    'molar mass': 'M_mass',
    'ph': 'pH',
    'density': 'rho',
    'area': 'A',
    'radius': 'r',
    'diameter': 'd',
}


def extract_quantities(text: str) -> Dict[str, Tuple[float, str]]:
    """Extract quantities with units from text.

    Returns dict: {variable_name: (value, unit_string)}
    """
    quantities = {}

    # Add plural forms to aliases
    UNIT_ALIASES_EXT = dict(UNIT_ALIASES)
    UNIT_ALIASES_EXT.update({
        'seconds': 'second', 'secs': 'second',
        'minutes': 'minute', 'mins': 'minute',
        'hours': 'hour', 'hrs': 'hour',
        'meters': 'meter', 'metres': 'meter',
        'centimeters': 'centimeter', 'centimetres': 'centimeter',
        'kilometers': 'kilometer', 'kilometres': 'kilometer',
        'grams': 'gram', 'kilograms': 'kilogram',
        'liters': 'liter', 'litres': 'liter',
        'moles': 'mole', 'mols': 'mole',
        'newtons': 'newton',
        'joules': 'joule',
        'watts': 'watt',
        'volts': 'volt',
        'amperes': 'ampere', 'amps': 'ampere',
        'ohms': 'ohm',
        'hertz': 'hertz',
        'kelvins': 'kelvin',
        'pascals': 'pascal',
        'atmospheres': 'atmosphere',
    })

    # Build unit pattern from aliases — sort by length descending so "m/s²" matches before "m"
    unit_patterns = '|'.join(re.escape(u) for u in sorted(UNIT_ALIASES_EXT.keys(), key=len, reverse=True))

    # Unit → default variable mapping (when no variable name is given)
    # Case-sensitive units (uppercase) must be handled separately from lowercase
    UNIT_TO_VAR_LOWER = {
        'newton': 'F', 'newtons': 'F',
        'kilogram': 'm', 'kilograms': 'm',
        'gram': 'm', 'grams': 'm',
        'm/s': 'v', 'm/s²': 'a', 'm/s^2': 'a', 'm/s2': 'a',
        'meter/second': 'v', 'meter/second**2': 'a',
        'km/h': 'v', 'km/hr': 'v',
        'joule': 'E', 'joules': 'E',
        'watt': 'P', 'watts': 'P',
        'ampere': 'I', 'amperes': 'I', 'amps': 'I',
        'ohm': 'R', 'ohms': 'R',
        'hertz': 'f',
        'kelvin': 'T', 'kelvins': 'T',
        'atm': 'P_press', 'atmosphere': 'P_press', 'atmospheres': 'P_press',
        'pascal': 'P_press', 'pascals': 'P_press',
        'liter': 'V_vol', 'liters': 'V_vol', 'litres': 'V_vol',
        'ml': 'V_vol', 'milliliter': 'V_vol',
        'mole': 'n', 'moles': 'n', 'mols': 'n',
        'second': 't', 'seconds': 't', 'secs': 't',
        'minute': 't', 'minutes': 't', 'mins': 't',
        'hour': 't', 'hours': 't', 'hrs': 't',
        'meter': 's', 'meters': 's', 'metres': 's',
        'centimeter': 's', 'centimeters': 's',
        'kilometer': 's', 'kilometers': 's',
    }

    # Case-sensitive uppercase units
    UNIT_TO_VAR_UPPER = {
        'N': 'F',
        'J': 'E',
        'W': 'P',
        'V': 'V',  # volt → voltage variable V
        'A': 'I',
        'Ω': 'R',
        'Hz': 'f',
        'K': 'T',  # kelvin
        'Pa': 'P_press',
        'L': 'V_vol',
        'mL': 'V_vol',
        'mol': 'n',
        'M': 'C',  # molarity (uppercase only)
    }

    # Lowercase single-char units (ambiguous)
    UNIT_TO_VAR_AMBIGUOUS = {
        'm': 's',  # meter → distance (NOT mass — mass is kg)
        'g': 'm',  # gram → mass
        's': 't',  # second → time
        'h': 't',  # hour → time
        'l': 'V_vol',  # liter → volume
    }

    # Pattern 1: "number unit" (e.g., "10 N", "2 kg", "0.01 M")
    # Handle case-sensitively: uppercase M means molarity, lowercase m means meter
    pattern1 = rf'(\d+\.?\d*)\s*({unit_patterns})(?:\b|(?=\s|[.,;]))'
    for m in re.finditer(pattern1, text):
        val = float(m.group(1))
        unit = m.group(2)

        # Try exact case match first (for uppercase units like N, V, A, M, K, Hz)
        var = UNIT_TO_VAR_UPPER.get(unit)
        pint_unit = UNIT_ALIASES_EXT.get(unit, unit)

        if not var:
            # Try lowercase
            unit_lower = unit.lower()
            var = UNIT_TO_VAR_LOWER.get(unit_lower) or UNIT_TO_VAR_AMBIGUOUS.get(unit_lower)
            pint_unit = UNIT_ALIASES_EXT.get(unit_lower, unit)

        if var:
            if var not in quantities:
                quantities[var] = (val, pint_unit)
        else:
            quantities[f'_raw_{len(quantities)}'] = (val, pint_unit)

    # Pattern 2: "variable of number unit" (e.g., "force of 10 N", "mass of 2 kg")
    pattern2 = rf'(force|mass|acceleration|velocity|speed|time|distance|displacement|height|energy|power|work|voltage|current|resistance|frequency|wavelength|temperature|pressure|volume|moles|molarity|concentration|density|area|radius|charge)\s+of\s+(\d+\.?\d*)\s*({unit_patterns})?'
    for m in re.finditer(pattern2, text, re.IGNORECASE):
        var_name = m.group(1).lower()
        val = float(m.group(2))
        unit = m.group(3) if m.group(3) else ''
        unit = UNIT_ALIASES_EXT.get(unit.lower(), unit) if unit else ''
        symbol = VAR_ALIASES.get(var_name, var_name)
        quantities[symbol] = (val, unit)

    # Pattern 2b: "number unit variable_name" (e.g., "10 N force", "2 kg mass", "5 m/s velocity")
    pattern2b = rf'(\d+\.?\d*)\s*({unit_patterns})\s+(force|mass|acceleration|velocity|speed|time|distance|displacement|height|energy|power|work|voltage|current|resistance|frequency|wavelength|temperature|pressure|volume|moles|molarity|concentration)'
    for m in re.finditer(pattern2b, text, re.IGNORECASE):
        val = float(m.group(1))
        unit = m.group(2)
        var_name = m.group(3).lower()
        pint_unit = UNIT_ALIASES_EXT.get(unit.lower(), unit)
        symbol = VAR_ALIASES.get(var_name, var_name)
        quantities[symbol] = (val, pint_unit)

    # Pattern 3: "variable = number" (e.g., "F = 10", "m = 2 kg")
    pattern3 = rf'([FfMm]|force|mass|accel|a|v|u|t|s|h|KE|PE|P|W|V|I|R|f|lambda|T|P_press|V_vol|n|M|C|M_mass|pH|rho|A|r|q)\s*=\s*(\d+\.?\d*)\s*({unit_patterns})?'
    for m in re.finditer(pattern3, text, re.IGNORECASE):
        var = m.group(1)
        val = float(m.group(2))
        unit = m.group(3) if m.group(3) else ''
        unit = UNIT_ALIASES_EXT.get(unit.lower(), unit) if unit else ''
        symbol = VAR_ALIASES.get(var.lower(), var)
        quantities[symbol] = (val, unit)

    # Pattern 4: Bare numbers with context words
    # "10 N" already caught by pattern1
    # "36 grams of water" → mass = 36 g
    pattern4 = rf'(\d+\.?\d*)\s*(grams?|g)\s+of\s+(\w+)'
    for m in re.finditer(pattern4, text, re.IGNORECASE):
        val = float(m.group(1))
        quantities['m'] = (val, 'gram')

    # Pattern 5: "0.01 M HCl" → concentration = 0.01 mol/L
    pattern5 = rf'(\d+\.?\d*)\s*M\s+(\w+)'
    for m in re.finditer(pattern5, text, re.IGNORECASE):
        val = float(m.group(1))
        quantities['C'] = (val, 'mole/liter')

    # Pattern 6: "in X liters" → volume
    pattern6 = rf'(\d+\.?\d*)\s*(L|liter|liters|mL|milliliter)\b'
    for m in re.finditer(pattern6, text, re.IGNORECASE):
        val = float(m.group(1))
        unit = m.group(2).lower()
        if unit in ('l', 'liter', 'liters'):
            quantities['V_vol'] = (val, 'liter')
        else:
            quantities['V_vol'] = (val, 'milliliter')

    return quantities


def extract_target(text: str) -> Optional[str]:
    """Extract what the question is asking for."""
    text_lower = text.lower()

    # "What is the X" / "Find X" / "Calculate X"
    targets = [
        (r'what\s+is\s+the\s+(\w+(?:\s+\w+)?)', 'what_is_the'),
        (r'find\s+(?:the\s+)?(\w+(?:\s+\w+)?)', 'find'),
        (r'calculate\s+(?:the\s+)?(\w+(?:\s+\w+)?)', 'calculate'),
        (r'determine\s+(?:the\s+)?(\w+(?:\s+\w+)?)', 'determine'),
        (r'how\s+many\s+(\w+)', 'how_many'),
        (r'what\s+(?:is|are)\s+the\s+(\w+)', 'what_is'),
    ]

    for pattern, label in targets:
        m = re.search(pattern, text_lower)
        if m:
            word = m.group(1).strip()
            # Strip trailing "of" (e.g., "resistance of" → "resistance")
            word = re.sub(r'\s+of$', '', word).strip()
            # Don't return if the original word is a question word
            if word in ('the', 'a', 'an', 'of', 'is', 'are', ''):
                continue
            # Map to symbol — try full phrase first, then single word
            symbol = VAR_ALIASES.get(word)
            if not symbol:
                # Try just the first word
                first_word = word.split()[0] if word else ''
                symbol = VAR_ALIASES.get(first_word, first_word)
            if symbol:
                return symbol

    return None


# ──────────────────────────────────────────────────────────────────────
# Formula database (physics + chemistry)
# ──────────────────────────────────────────────────────────────────────

PHYSICS_FORMULAS = {
    # Mechanics
    'F=ma': {'formula': 'F = m * a', 'solve_for': {'F': 'm*a', 'm': 'F/a', 'a': 'F/m'},
             'keywords': ['force', 'mass', 'acceleration', 'newton']},
    'v=u+at': {'formula': 'v = u + a*t', 'solve_for': {'v': 'u + a*t', 'u': 'v - a*t', 'a': '(v-u)/t', 't': '(v-u)/a'},
               'keywords': ['velocity', 'acceleration', 'time', 'kinematics']},
    'v=s/t': {'formula': 'v = s / t', 'solve_for': {'v': 's/t', 's': 'v*t', 't': 's/v'},
              'keywords': ['velocity', 'speed', 'distance', 'time']},
    's=ut+0.5at²': {'formula': 's = u*t + 0.5*a*t**2', 'solve_for': {'s': 'u*t + 0.5*a*t**2'},
                    'keywords': ['distance', 'displacement', 'acceleration']},
    'KE=0.5mv²': {'formula': 'KE = 0.5 * m * v**2', 'solve_for': {'KE': '0.5*m*v**2', 'm': '2*KE/v**2', 'v': 'sqrt(2*KE/m)'},
                  'keywords': ['kinetic energy', 'energy', 'mass', 'velocity']},
    'PE=mgh': {'formula': 'PE = m * g * h', 'solve_for': {'PE': 'm*g*h', 'm': 'PE/(g*h)', 'h': 'PE/(m*g)'},
               'keywords': ['potential energy', 'height', 'gravity']},
    'P=W/t': {'formula': 'P = W / t', 'solve_for': {'P': 'W/t', 'W': 'P*t', 't': 'W/P'},
              'keywords': ['power', 'work', 'time']},
    'P=mgh/t': {'formula': 'P = m * g * h / t', 'solve_for': {'P': 'm*g*h/t'},
                'keywords': ['power', 'climb', 'stairs', 'height']},
    'W=Fd': {'formula': 'W = F * d', 'solve_for': {'W': 'F*d', 'F': 'W/d', 'd': 'W/F'},
             'keywords': ['work', 'force', 'distance']},
    'p=mv': {'formula': 'p = m * v', 'solve_for': {'p': 'm*v', 'm': 'p/v', 'v': 'p/m'},
             'keywords': ['momentum', 'mass', 'velocity']},

    # Waves
    'v=fλ': {'formula': 'v = f * lambda', 'solve_for': {'v': 'f*lambda', 'f': 'v/lambda', 'lambda': 'v/f'},
             'keywords': ['wave', 'frequency', 'wavelength', 'speed']},

    # Electricity
    'V=IR': {'formula': 'V = I * R', 'solve_for': {'V': 'I*R', 'I': 'V/R', 'R': 'V/I'},
             'keywords': ['voltage', 'current', 'resistance', 'ohm']},
    'P=VI': {'formula': 'P = V * I', 'solve_for': {'P': 'V*I', 'V': 'P/I', 'I': 'P/V'},
             'keywords': ['power', 'voltage', 'current', 'electrical']},
    'Q=It': {'formula': 'q = I * t', 'solve_for': {'q': 'I*t', 'I': 'q/t', 't': 'q/I'},
             'keywords': ['charge', 'current', 'time']},

    # Gas laws
    'PV/T=const': {'formula': 'P1*V1/T1 = P2*V2/T2', 'solve_for': {'P2': 'P1*V1*T2/(V2*T1)'},
                   'keywords': ['gas', 'pressure', 'volume', 'temperature', 'atm']},
    'PV=nRT': {'formula': 'P * V = n * R * T', 'solve_for': {'n': 'P*V/(R*T)', 'P': 'n*R*T/V', 'V': 'n*R*T/P', 'T': 'P*V/(n*R)'},
               'keywords': ['ideal gas', 'moles', 'pressure', 'volume', 'temperature']},
}

CHEMISTRY_FORMULAS = {
    'pH': {'formula': 'pH = -log10(C)', 'solve_for': {'pH': '-log10(C)'},
           'keywords': ['ph', 'acid', 'base', 'concentration', 'hcl']},
    'moles': {'formula': 'n = m / M_mass', 'solve_for': {'n': 'm/M_mass', 'm': 'n*M_mass', 'M_mass': 'm/n'},
              'keywords': ['moles', 'grams', 'mass', 'molar']},
    'molarity': {'formula': 'M = n / V_vol', 'solve_for': {'M': 'n/V_vol', 'n': 'M*V_vol', 'V_vol': 'n/M'},
                 'keywords': ['molarity', 'molar', 'solution', 'liters']},
    'atoms': {'formula': 'atoms = n * 6.022e23', 'solve_for': {'atoms': 'n * 6.022e23'},
              'keywords': ['atoms', 'molecules', 'avogadro']},
    'dilution': {'formula': 'M1*V1 = M2*V2', 'solve_for': {'M2': 'M1*V1/V2', 'V2': 'M1*V1/M2'},
                 'keywords': ['dilution', 'dilute', 'concentration']},
}


# ──────────────────────────────────────────────────────────────────────
# Solver
# ──────────────────────────────────────────────────────────────────────

def solve_physics(text: str) -> Optional[UnitsSolverResult]:
    """Solve a physics problem using pint for unit-aware computation."""
    ureg = _get_ureg()
    quantities = extract_quantities(text)
    target = extract_target(text)

    if not target or not quantities:
        return None

    text_lower = text.lower()

    # Find matching formula
    best_formula = None
    best_score = 0

    for fid, fdata in PHYSICS_FORMULAS.items():
        # Check keyword match
        score = sum(1 for kw in fdata['keywords'] if kw in text_lower)
        # Check we have enough knowns to solve
        solve_for = fdata['solve_for']
        if target in solve_for:
            # Check how many variables in the formula we have
            formula_vars = set(re.findall(r'\b[a-zA-Z_]+\b', fdata['formula']))
            formula_vars.discard(target)
            known_count = sum(1 for v in formula_vars if v in quantities or v in ('g',) and 'g' in quantities)
            score += known_count * 2

        if score > best_score:
            best_score = score
            best_formula = (fid, fdata)

    if not best_formula or best_score < 2:
        return None

    fid, fdata = best_formula
    solve_expr = fdata['solve_for'].get(target)
    if not solve_expr:
        return None

    steps = []
    steps.append(f"Formula: {fdata['formula']}")
    steps.append(f"Solving for: {target}")

    # Build pint quantities
    g = 9.8 * ureg.meter / ureg.second**2  # gravity default

    pint_vars = {}
    for var_name, (val, unit) in quantities.items():
        try:
            if unit:
                pint_vars[var_name] = val * ureg(unit)
            else:
                pint_vars[var_name] = val
        except Exception as e:
            logger.debug(f"Cannot create pint quantity for {var_name}: {e}")
            pint_vars[var_name] = val

    # Add g if gravity-related and not provided
    if 'g' not in pint_vars and any(kw in text_lower for kw in ['gravity', 'climb', 'stairs', 'height', 'fall']):
        pint_vars['g'] = g
        steps.append(f"Using g = 9.8 m/s²")

    # Substitute and compute
    try:
        # Replace variable names in solve_expr with pint quantities
        # We need to evaluate the expression safely
        import sympy as sp

        # Create sympy symbols for all variables
        symbols = {}
        for v in pint_vars:
            symbols[v] = sp.Symbol(v)

        # Parse the expression
        expr = sp.sympify(solve_expr, locals=symbols)

        # Substitute known values
        subs = {}
        for v, q in pint_vars.items():
            if v in symbols and v != target:
                # Convert to base numeric value
                try:
                    subs[symbols[v]] = float(q.magnitude)
                except Exception:
                    subs[symbols[v]] = q.magnitude

        result_expr = expr.subs(subs)
        result_val = float(sp.simplify(result_expr))

        # Determine unit from context
        # Try to compute with units directly
        try:
            # Evaluate with pint units
            safe_eval = solve_expr
            for v, q in pint_vars.items():
                if v != target:
                    safe_eval = safe_eval.replace(v, f'({float(q.magnitude)})')

            # Use the formula to determine the unit
            # Simple approach: compute with pint objects
            local_dict = {}
            for v, q in pint_vars.items():
                if v != target:
                    local_dict[v] = q

            # For simple formulas, compute directly
            if target == 'a' and 'F' in local_dict and 'm' in local_dict:
                answer_q = local_dict['F'] / local_dict['m']
            elif target == 'v' and 's' in local_dict and 't' in local_dict:
                answer_q = local_dict['s'] / local_dict['t']
            elif target == 'v' and 'f' in local_dict and 'lambda' in local_dict:
                answer_q = local_dict['f'] * local_dict['lambda']
            elif target == 'R' and 'V' in local_dict and 'I' in local_dict:
                answer_q = local_dict['V'] / local_dict['I']
            elif target == 'KE' and 'm' in local_dict and 'v' in local_dict:
                answer_q = 0.5 * local_dict['m'] * local_dict['v']**2
            elif target == 'W' and 'F' in local_dict and 'd' in local_dict:
                answer_q = local_dict['F'] * local_dict['d']
            elif target == 'P' and 'W' in local_dict and 't' in local_dict:
                answer_q = local_dict['W'] / local_dict['t']
            elif target == 'P' and 'm' in local_dict and 'h' in local_dict and 't' in local_dict:
                answer_q = local_dict['m'] * g * local_dict['h'] / local_dict['t']
            elif target == 'v' and 'u' in local_dict and 'a' in local_dict and 't' in local_dict:
                answer_q = local_dict['u'] + local_dict['a'] * local_dict['t']
            else:
                # Fallback: just use the numeric result
                answer_q = result_val

            # Format answer
            if hasattr(answer_q, 'magnitude'):
                answer_str = f"{float(answer_q.magnitude):.4g} {answer_q.units}"
            else:
                answer_str = f"{result_val:.4g}"

            steps.append(f"Substituting: {subs}")
            steps.append(f"Result: {target} = {answer_str}")

            return UnitsSolverResult(
                success=True,
                answer=answer_str,
                answer_value=result_val,
                formula_used=fdata['formula'],
                steps=steps,
                confidence=0.9,
            )

        except Exception as e:
            # Fallback to numeric only
            steps.append(f"Result: {target} = {result_val:.4g}")
            return UnitsSolverResult(
                success=True,
                answer=f"{result_val:.4g}",
                answer_value=result_val,
                formula_used=fdata['formula'],
                steps=steps,
                confidence=0.8,
            )

    except Exception as e:
        logger.debug(f"Physics solve failed: {e}")
        return None


def solve_chemistry(text: str) -> Optional[UnitsSolverResult]:
    """Solve a chemistry problem using chempy + pint."""
    ureg = _get_ureg()
    chempy_ok = _get_chempy()
    text_lower = text.lower()
    steps = []

    # ── 1. Balance chemical equation ──
    if 'balance' in text_lower and chempy_ok:
        try:
            from chempy import balance_stoichiometry

            # Extract reactants and products from text
            # Handle: "Balance: H2 + O2 = H2O"
            #         "Balance the equation: H2 + O2 = H2O"
            #         "Balance H2 + O2 -> H2O"
            #         "Balance the chemical equation H2 + O2 = H2O"
            # Strategy: find the chemical formulas (start with capital letter)
            # on each side of = or -> or →

            # First, find the separator (= or -> or →)
            sep_match = re.search(r'(?:=|->|→)', text)
            if not sep_match:
                return None

            # Split text at the separator
            left_side = text[:sep_match.start()]
            right_side = text[sep_match.end():]

            # Extract chemical formulas from each side
            # A chemical formula starts with a capital letter and contains elements/numbers
            formula_pattern = r'\b([A-Z][a-zA-Z0-9]*(?:\d+[a-zA-Z]?)*)\b'

            reactants = set()
            for r in re.split(r'\s*\+\s*', left_side):
                r = r.strip()
                # Find ALL chemical formulas in the segment, not just the first
                formulas = re.findall(formula_pattern, r)
                for f in formulas:
                    reactants.add(f)

            products = set()
            for p in re.split(r'\s*\+\s*', right_side):
                p = p.strip()
                formulas = re.findall(formula_pattern, p)
                for f in formulas:
                    products.add(f)

            # Filter out common English words that might match
            stop_words = {'Balance', 'The', 'Equation', 'Chemical', 'What', 'How'}
            reactants = {r for r in reactants if r not in stop_words}
            products = {p for p in products if p not in stop_words}

            if reactants and products:
                reac, prod = balance_stoichiometry(reactants, products)

                # Format the balanced equation
                reac_parts = [f"{v} {k}" if v > 1 else k for k, v in reac.items()]
                prod_parts = [f"{v} {k}" if v > 1 else k for k, v in prod.items()]
                balanced = " + ".join(reac_parts) + " → " + " + ".join(prod_parts)

                steps.append(f"Reactants: {reactants}")
                steps.append(f"Products: {products}")
                steps.append(f"Balanced equation: {balanced}")

                return UnitsSolverResult(
                    success=True,
                    answer=balanced,
                    formula_used="balance_stoichiometry",
                    steps=steps,
                    confidence=0.95,
                    backend_used="chempy",
                )
        except Exception as e:
            logger.debug(f"Balance equation failed: {e}")

    # ── 2. pH calculation ──
    if 'ph' in text_lower and ('hcl' in text_lower or 'acid' in text_lower or 'concentration' in text_lower or 'm' in text_lower):
        try:
            # Extract concentration
            conc_match = re.search(r'(\d+\.?\d*)\s*M', text)
            if conc_match:
                C = float(conc_match.group(1))
                pH = -math.log10(C)
                steps.append(f"Concentration [H+] = {C} M")
                steps.append(f"pH = -log10({C}) = {pH}")

                return UnitsSolverResult(
                    success=True,
                    answer=f"pH = {pH:.2f}",
                    answer_value=pH,
                    formula_used="pH = -log10[H+]",
                    steps=steps,
                    confidence=0.95,
                    backend_used="chempy+pint",
                )
        except Exception as e:
            logger.debug(f"pH calculation failed: {e}")

    # ── 3. Moles from mass ──
    if 'mole' in text_lower and chempy_ok:
        try:
            from chempy import Substance

            # Extract mass and substance
            mass_match = re.search(r'(\d+\.?\d*)\s*(?:grams?|g)\s+of\s+(\w+)', text, re.IGNORECASE)
            if mass_match:
                mass = float(mass_match.group(1))
                substance_name = mass_match.group(2).strip()

                # Get molar mass
                try:
                    substance = Substance.from_formula(substance_name)
                    molar_mass = float(substance.molar_mass())
                except Exception:
                    # Try common names
                    common = {'water': 'H2O', 'salt': 'NaCl', 'sugar': 'C12H22O11',
                              'carbon': 'C', 'oxygen': 'O2', 'hydrogen': 'H2',
                              'sodium': 'Na', 'chlorine': 'Cl2', 'iron': 'Fe',
                              'copper': 'Cu', 'nitrogen': 'N2'}
                    formula = common.get(substance_name.lower())
                    if formula:
                        substance = Substance.from_formula(formula)
                        molar_mass = float(substance.molar_mass())
                    else:
                        return None

                moles = mass / molar_mass
                steps.append(f"Mass = {mass} g")
                steps.append(f"Molar mass of {substance_name} = {molar_mass:.3f} g/mol")
                steps.append(f"Moles = mass / molar_mass = {mass} / {molar_mass:.3f} = {moles:.4f} mol")

                return UnitsSolverResult(
                    success=True,
                    answer=f"{moles:.4f} mol",
                    answer_value=moles,
                    formula_used="n = m / M",
                    steps=steps,
                    confidence=0.95,
                    backend_used="chempy",
                )
        except Exception as e:
            logger.debug(f"Moles calculation failed: {e}")

    # ── 4. Molarity ──
    if 'molarity' in text_lower or ('molar' in text_lower and 'solution' in text_lower):
        try:
            # Extract moles and volume
            moles_match = re.search(r'(\d+\.?\d*)\s*(?:moles?|mol)\b', text, re.IGNORECASE)
            vol_match = re.search(r'(\d+\.?\d*)\s*(?:L|liter|litres?)', text, re.IGNORECASE)

            if moles_match and vol_match:
                n = float(moles_match.group(1))
                V = float(vol_match.group(1))
                M = n / V
                steps.append(f"Moles = {n} mol")
                steps.append(f"Volume = {V} L")
                steps.append(f"Molarity = moles / volume = {n} / {V} = {M:.4f} M")

                return UnitsSolverResult(
                    success=True,
                    answer=f"{M:.4f} M",
                    answer_value=M,
                    formula_used="M = n / V",
                    steps=steps,
                    confidence=0.95,
                    backend_used="chempy+pint",
                )
        except Exception as e:
            logger.debug(f"Molarity calculation failed: {e}")

    # ── 5. Number of atoms/molecules ──
    if ('atom' in text_lower or 'molecule' in text_lower) and 'mole' in text_lower:
        try:
            moles_match = re.search(r'(\d+\.?\d*)\s*(?:moles?|mol)\b', text, re.IGNORECASE)
            if moles_match:
                n = float(moles_match.group(1))
                avogadro = 6.022e23
                atoms = n * avogadro
                steps.append(f"Moles = {n} mol")
                steps.append(f"Avogadro's number = 6.022 × 10²³")
                steps.append(f"Atoms = {n} × 6.022×10²³ = {atoms:.4e}")

                return UnitsSolverResult(
                    success=True,
                    answer=f"{atoms:.4e} atoms",
                    answer_value=atoms,
                    formula_used="N = n × N_A",
                    steps=steps,
                    confidence=0.95,
                    backend_used="chempy",
                )
        except Exception as e:
            logger.debug(f"Atoms calculation failed: {e}")

    # ── 6. Gas law (PV/T = constant) ──
    if any(kw in text_lower for kw in ['gas', 'atm', 'pressure', 'volume']) and 'temperature' in text_lower or 'k' in text_lower:
        try:
            # Extract P1, V1, T1, V2, T2 and solve for P2
            # "A gas occupies 2 L at 300 K and 1 atm. What is the pressure if the volume is reduced to 1 L at 600 K?"
            quantities = extract_quantities(text)

            # Try to identify initial and final states
            p_match = re.search(r'(\d+\.?\d*)\s*atm', text, re.IGNORECASE)
            v1_match = re.search(r'(\d+\.?\d*)\s*L', text, re.IGNORECASE)
            t_matches = re.findall(r'(\d+\.?\d*)\s*K\b', text, re.IGNORECASE)

            if p_match and v1_match and len(t_matches) >= 2:
                P1 = float(p_match.group(1))
                V1 = float(v1_match.group(1))
                T1 = float(t_matches[0])
                # Find V2 and T2
                v_matches = re.findall(r'(\d+\.?\d*)\s*L', text, re.IGNORECASE)
                V2 = float(v_matches[1]) if len(v_matches) > 1 else V1
                T2 = float(t_matches[1])

                P2 = P1 * V1 * T2 / (V2 * T1)
                steps.append(f"P1 = {P1} atm, V1 = {V1} L, T1 = {T1} K")
                steps.append(f"V2 = {V2} L, T2 = {T2} K")
                steps.append(f"P2 = P1×V1×T2 / (V2×T1) = {P1}×{V1}×{T2} / ({V2}×{T1}) = {P2:.4f} atm")

                return UnitsSolverResult(
                    success=True,
                    answer=f"{P2:.4f} atm",
                    answer_value=P2,
                    formula_used="P1V1/T1 = P2V2/T2",
                    steps=steps,
                    confidence=0.9,
                    backend_used="pint",
                )
        except Exception as e:
            logger.debug(f"Gas law calculation failed: {e}")

    return None


# ──────────────────────────────────────────────────────────────────────
# Main entry point
# ──────────────────────────────────────────────────────────────────────

def solve(text: str) -> Optional[UnitsSolverResult]:
    """Try to solve a physics or chemistry problem using pint + chempy.

    Returns None if it can't handle the question.
    """
    text_lower = text.lower()

    # Determine subject
    chem_keywords = ['ph', 'mole', 'molar', 'molarity', 'balance', 'equation',
                     'acid', 'base', 'solution', 'concentration', 'atoms',
                     'molecules', 'stoichiometry', 'reactant', 'product',
                     'hcl', 'naoh', 'h2o', 'nacl', 'gas', 'atm']
    phys_keywords = ['force', 'mass', 'acceleration', 'velocity', 'speed',
                     'energy', 'power', 'work', 'voltage', 'current',
                     'resistance', 'frequency', 'wavelength', 'wave',
                     'newton', 'joule', 'watt', 'volt', 'ampere', 'ohm',
                     'kinetic', 'potential', 'momentum', 'ohm']

    is_chem = sum(1 for kw in chem_keywords if kw in text_lower)
    is_phys = sum(1 for kw in phys_keywords if kw in text_lower)

    # Try chemistry first if it scores higher
    if is_chem >= is_phys and is_chem > 0:
        result = solve_chemistry(text)
        if result and result.success:
            return result

    if is_phys > 0:
        result = solve_physics(text)
        if result and result.success:
            return result

    # Try both if unclear
    if is_chem > 0:
        result = solve_chemistry(text)
        if result and result.success:
            return result

    return None
