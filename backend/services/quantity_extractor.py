"""
quantity_extractor.py — Layer 2 (B2): Extract explicit quantities with units.

Deterministic. No LLM. Regex + unit tables.

Extracts quantities like:
  "A 2 kg block moves at 3 m/s" → [Quantity(mass=2kg), Quantity(velocity=3m/s)]
  "Find the area of a circle with radius 5 cm" → [Quantity(radius=5cm)]

Author: Platform Backend Team
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Optional

from .preprocessor import preprocess
from .stem_problem import Quantity


# ──────────────────────────────────────────────────────────────────────────────
# Unit tables — maps unit strings to (quantity_type, SI_unit, dimensional_formula)
# ──────────────────────────────────────────────────────────────────────────────

UNIT_TABLE = {
    # Mass
    "kg": ("mass", "kg", ["M"]),
    "kilogram": ("mass", "kg", ["M"]),
    "kilograms": ("mass", "kg", ["M"]),
    "g": ("mass", "g", ["M"]),
    "gram": ("mass", "g", ["M"]),
    "grams": ("mass", "g", ["M"]),
    "mg": ("mass", "mg", ["M"]),
    "tonne": ("mass", "kg", ["M"]),
    "ton": ("mass", "kg", ["M"]),
    "lb": ("mass", "kg", ["M"]),
    "pound": ("mass", "kg", ["M"]),

    # Length
    "m": ("length", "m", ["L"]),
    "meter": ("length", "m", ["L"]),
    "metre": ("length", "m", ["L"]),
    "meters": ("length", "m", ["L"]),
    "metres": ("length", "m", ["L"]),
    "cm": ("length", "cm", ["L"]),
    "centimeter": ("length", "cm", ["L"]),
    "centimeters": ("length", "cm", ["L"]),
    "mm": ("length", "mm", ["L"]),
    "km": ("length", "km", ["L"]),
    "kilometer": ("length", "km", ["L"]),
    "kilometers": ("length", "km", ["L"]),
    "ft": ("length", "ft", ["L"]),
    "foot": ("length", "ft", ["L"]),
    "feet": ("length", "ft", ["L"]),
    "inch": ("length", "in", ["L"]),
    "inches": ("length", "in", ["L"]),
    "in": ("length", "in", ["L"]),

    # Time
    "s": ("time", "s", ["T"]),
    "sec": ("time", "s", ["T"]),
    "second": ("time", "s", ["T"]),
    "seconds": ("time", "s", ["T"]),
    "min": ("time", "min", ["T"]),
    "minute": ("time", "min", ["T"]),
    "minutes": ("time", "min", ["T"]),
    "hr": ("time", "h", ["T"]),
    "hour": ("time", "h", ["T"]),
    "hours": ("time", "h", ["T"]),
    "h": ("time", "h", ["T"]),
    "day": ("time", "day", ["T"]),
    "days": ("time", "day", ["T"]),
    "year": ("time", "year", ["T"]),
    "years": ("time", "year", ["T"]),

    # Velocity
    "m/s": ("velocity", "m/s", ["L", "T", -1]),
    "m/sec": ("velocity", "m/s", ["L", "T", -1]),
    "ms": ("velocity", "m/s", ["L", "T", -1]),  # ambiguous, context-dependent
    "km/h": ("velocity", "km/h", ["L", "T", -1]),
    "km/hr": ("velocity", "km/h", ["L", "T", -1]),
    "kmh": ("velocity", "km/h", ["L", "T", -1]),
    "mph": ("velocity", "mph", ["L", "T", -1]),
    "ft/s": ("velocity", "ft/s", ["L", "T", -1]),

    # Acceleration
    "m/s2": ("acceleration", "m/s^2", ["L", "T", -2]),
    "m/s^2": ("acceleration", "m/s^2", ["L", "T", -2]),
    "m/s**2": ("acceleration", "m/s^2", ["L", "T", -2]),
    "m/sec2": ("acceleration", "m/s^2", ["L", "T", -2]),

    # Force
    "N": ("force", "N", ["M", "L", "T", -2]),
    "newton": ("force", "N", ["M", "L", "T", -2]),
    "newtons": ("force", "N", ["M", "L", "T", -2]),
    "dyne": ("force", "dyn", ["M", "L", "T", -2]),
    "kgf": ("force", "kgf", ["M", "L", "T", -2]),

    # Energy
    "J": ("energy", "J", ["M", "L", 2, "T", -2]),
    "joule": ("energy", "J", ["M", "L", 2, "T", -2]),
    "joules": ("energy", "J", ["M", "L", 2, "T", -2]),
    "kJ": ("energy", "kJ", ["M", "L", 2, "T", -2]),
    "cal": ("energy", "cal", ["M", "L", 2, "T", -2]),
    "calorie": ("energy", "cal", ["M", "L", 2, "T", -2]),
    "kcal": ("energy", "kcal", ["M", "L", 2, "T", -2]),
    "eV": ("energy", "eV", ["M", "L", 2, "T", -2]),
    "kWh": ("energy", "kWh", ["M", "L", 2, "T", -2]),

    # Power
    "W": ("power", "W", ["M", "L", 2, "T", -3]),
    "watt": ("power", "W", ["M", "L", 2, "T", -3]),
    "watts": ("power", "W", ["M", "L", 2, "T", -3]),
    "kW": ("power", "kW", ["M", "L", 2, "T", -3]),
    "MW": ("power", "MW", ["M", "L", 2, "T", -3]),
    "hp": ("power", "hp", ["M", "L", 2, "T", -3]),

    # Pressure
    "Pa": ("pressure", "Pa", ["M", "L", -1, "T", -2]),
    "pascal": ("pressure", "Pa", ["M", "L", -1, "T", -2]),
    "atm": ("pressure", "atm", ["M", "L", -1, "T", -2]),
    "bar": ("pressure", "bar", ["M", "L", -1, "T", -2]),
    "mmHg": ("pressure", "mmHg", ["M", "L", -1, "T", -2]),
    "torr": ("pressure", "torr", ["M", "L", -1, "T", -2]),

    # Temperature
    "K": ("temperature", "K", ["theta"]),
    "kelvin": ("temperature", "K", ["theta"]),
    "C": ("temperature", "degC", ["theta"]),
    "degC": ("temperature", "degC", ["theta"]),
    "degCelsius": ("temperature", "degC", ["theta"]),
    "F": ("temperature", "degF", ["theta"]),
    "degF": ("temperature", "degF", ["theta"]),

    # Electric
    "A": ("current", "A", ["I"]),
    "amp": ("current", "A", ["I"]),
    "ampere": ("current", "A", ["I"]),
    "amperes": ("current", "A", ["I"]),
    "V": ("voltage", "V", ["M", "L", 2, "T", -3, "I", -1]),
    "volt": ("voltage", "V", ["M", "L", 2, "T", -3, "I", -1]),
    "volts": ("voltage", "V", ["M", "L", 2, "T", -3, "I", -1]),
    "ohm": ("resistance", "ohm", ["M", "L", 2, "T", -3, "I", -2]),
    "ohms": ("resistance", "ohm", ["M", "L", 2, "T", -3, "I", -2]),
    "C": ("charge", "C", ["I", "T"]),  # Note: conflicts with Celsius — context-dependent
    "coulomb": ("charge", "C", ["I", "T"]),

    # Frequency
    "Hz": ("frequency", "Hz", ["T", -1]),
    "hertz": ("frequency", "Hz", ["T", -1]),

    # Area
    "m2": ("area", "m^2", ["L", 2]),
    "m^2": ("area", "m^2", ["L", 2]),
    "cm2": ("area", "cm^2", ["L", 2]),
    "cm^2": ("area", "cm^2", ["L", 2]),
    "ha": ("area", "ha", ["L", 2]),
    "hectare": ("area", "ha", ["L", 2]),
    "acre": ("area", "acre", ["L", 2]),

    # Volume
    "L": ("volume", "L", ["L", 3]),
    "liter": ("volume", "L", ["L", 3]),
    "litre": ("volume", "L", ["L", 3]),
    "liters": ("volume", "L", ["L", 3]),
    "litres": ("volume", "L", ["L", 3]),
    "mL": ("volume", "mL", ["L", 3]),
    "ml": ("volume", "mL", ["L", 3]),
    "m3": ("volume", "m^3", ["L", 3]),
    "m^3": ("volume", "m^3", ["L", 3]),
    "cm3": ("volume", "cm^3", ["L", 3]),
    "cm^3": ("volume", "cm^3", ["L", 3]),

    # Angle
    "deg": ("angle", "deg", []),
    "degree": ("angle", "deg", []),
    "degrees": ("angle", "deg", []),
    "rad": ("angle", "rad", []),
    "radian": ("angle", "rad", []),
    "radians": ("angle", "rad", []),

    # Concentration
    "M": ("concentration", "mol/L", ["M", "L", -3]),
    "mol/L": ("concentration", "mol/L", ["M", "L", -3]),
    "molar": ("concentration", "mol/L", ["M", "L", -3]),
    "mol": ("amount", "mol", ["M"]),
    "mole": ("amount", "mol", ["M"]),
    "moles": ("amount", "mol", ["M"]),

    # Density
    "kg/m3": ("density", "kg/m^3", ["M", "L", -3]),
    "kg/m^3": ("density", "kg/m^3", ["M", "L", -3]),
    "g/cm3": ("density", "g/cm^3", ["M", "L", -3]),
    "g/cm^3": ("density", "g/cm^3", ["M", "L", -3]),
}

# Variable name → quantity_type mapping (for "mass = 5 kg" style)
NAME_TO_TYPE = {
    "mass": "mass", "weight": "force", "length": "length", "distance": "length",
    "displacement": "length", "height": "length", "radius": "length", "r": "length",
    "diameter": "length", "width": "length", "breadth": "length", "depth": "length",
    "time": "time", "period": "time", "t": "time",
    "velocity": "velocity", "speed": "velocity", "v": "velocity", "u": "velocity",
    "acceleration": "acceleration", "a": "acceleration",
    "force": "force", "f": "force",
    "energy": "energy", "work": "energy", "ke": "energy", "pe": "energy",
    "power": "power", "p": "power",
    "pressure": "pressure",
    "temperature": "temperature", "temp": "temperature",
    "current": "current", "i": "current",
    "voltage": "voltage", "potential": "voltage",
    "resistance": "resistance", "r_resistance": "resistance",
    "charge": "charge", "q": "charge",
    "frequency": "frequency",
    "area": "area", "volume": "volume",
    "angle": "angle", "theta": "angle",
    "concentration": "concentration",
    "density": "density",
    "moles": "amount", "n": "amount",
}

# Symbol → quantity_type mapping
SYMBOL_TO_TYPE = {
    "m": "mass", "M": "mass",
    "l": "length", "d": "length", "h": "length", "r": "length", "R": "length",
    "t": "time", "T": "temperature",  # T is ambiguous — temperature vs time
    "v": "velocity", "u": "velocity",
    "a": "acceleration",
    "F": "force", "f": "force",
    "E": "energy", "W": "energy",
    "P": "power", "p": "pressure",
    "I": "current",
    "V": "voltage",
    "Q": "charge", "q": "charge",
    "theta": "angle",
    "n": "amount",
}

# Regex patterns for quantity extraction
# Pattern 1: "5 kg", "3.2 m/s", "100 N", "3 m/s2", "3 m/s**2"
# Note: include digits and ** in unit to match "m/s2", "m/s**2", "m2", "cm3" etc.
_QTY_PATTERN_1 = re.compile(
    r'(\d+(?:\.\d+)?)\s*([a-zA-Z/²³]+(?:\*\*\d|[a-zA-Z/²³\d])*)',
    re.IGNORECASE
)

# Pattern 2: "mass = 5 kg", "velocity v = 10 m/s"
_QTY_PATTERN_2 = re.compile(
    r'(?:([a-zA-Z_]+)\s*[=:]\s*)?([a-zA-Z_]+)\s*[=:]\s*(\d+(?:\.\d+)?)\s*([a-zA-Z/²³]*)',
    re.IGNORECASE
)

# Pattern 3: "5 kg block", "3 m/s velocity" (quantity before noun)
_QTY_PATTERN_3 = re.compile(
    r'(\d+(?:\.\d+)?)\s*([a-zA-Z/²³]+)\s+([a-zA-Z]+)',
    re.IGNORECASE
)

# Scientific notation
_SCI_PATTERN = re.compile(
    r'(\d+(?:\.\d+)?)\s*[×x*]\s*10\*?\*?(-?\d+)',
    re.IGNORECASE
)

# Fraction
_FRACTION_PATTERN = re.compile(r'(\d+)/(\d+)')


class QuantityExtractor:
    """Layer 2: Extract explicit quantities from normalized text."""

    def extract(self, text: str) -> list[Quantity]:
        """Extract all quantities from text."""
        # Preprocess first
        pp = preprocess(text)
        normalized = pp.normalized_text

        quantities = []
        seen_spans = set()  # avoid double-counting

        # Pattern 2 first (most specific): "name = value unit"
        for m in _QTY_PATTERN_2.finditer(normalized):
            prefix_name = m.group(1)  # optional: "mass"
            var_name = m.group(2)     # variable name
            value = self._to_float(m.group(3))
            unit = m.group(4).strip() if m.group(4) else None

            if value is None:
                continue

            # Determine symbol and quantity type
            symbol = var_name.lower()[:3] if var_name else ""
            qty_type = NAME_TO_TYPE.get(var_name.lower(), "")

            if prefix_name:
                qty_type = NAME_TO_TYPE.get(prefix_name.lower(), qty_type)

            if not qty_type and unit:
                unit_info = UNIT_TABLE.get(unit, UNIT_TABLE.get(unit.lower()))
                if unit_info:
                    qty_type = unit_info[0]

            if not qty_type:
                continue

            q = Quantity(
                symbol=symbol or qty_type[0],
                name=var_name.lower() if var_name else qty_type,
                value=value,
                unit=unit,
            )
            key = (m.start(), m.end())
            if key not in seen_spans:
                quantities.append(q)
                seen_spans.add(key)

        # Pattern 1: "5 kg", "3.2 m/s"
        for m in _QTY_PATTERN_1.finditer(normalized):
            value = self._to_float(m.group(1))
            unit = m.group(2).strip()

            if value is None:
                continue

            unit_info = UNIT_TABLE.get(unit) or UNIT_TABLE.get(unit.lower())
            if not unit_info:
                # Try without trailing words
                unit_parts = unit.split()
                if unit_parts:
                    unit_info = UNIT_TABLE.get(unit_parts[0]) or UNIT_TABLE.get(unit_parts[0].lower())

            if not unit_info:
                continue

            qty_type, si_unit, dim = unit_info

            # Skip if we already captured this span
            key = (m.start(), m.end())
            if key in seen_spans:
                continue

            # Determine symbol from quantity type
            symbol = self._symbol_for_type(qty_type)

            q = Quantity(
                symbol=symbol,
                name=qty_type,
                value=value,
                unit=si_unit,
            )
            quantities.append(q)
            seen_spans.add(key)

        # Deduplicate by (symbol, value) — keep first
        seen_sv = set()
        unique = []
        for q in quantities:
            sv = (q.symbol, q.value)
            if sv not in seen_sv:
                seen_sv.add(sv)
                unique.append(q)

        return unique

    def _to_float(self, s: str) -> Optional[float]:
        """Safely convert string to float."""
        try:
            return float(s)
        except (ValueError, TypeError):
            return None

    def _symbol_for_type(self, qty_type: str) -> str:
        """Get default symbol for a quantity type."""
        mapping = {
            "mass": "m", "length": "d", "time": "t",
            "velocity": "v", "acceleration": "a",
            "force": "F", "energy": "E", "power": "P",
            "pressure": "p", "temperature": "T",
            "current": "I", "voltage": "V",
            "resistance": "R", "charge": "Q",
            "frequency": "f", "area": "A",
            "volume": "V", "angle": "theta",
            "concentration": "C", "density": "rho",
            "amount": "n",
        }
        return mapping.get(qty_type, qty_type[0] if qty_type else "x")


# Singleton
_extractor = None


def get_extractor() -> QuantityExtractor:
    global _extractor
    if _extractor is None:
        _extractor = QuantityExtractor()
    return _extractor


def extract_quantities(text: str) -> list[Quantity]:
    """Convenience function."""
    return get_extractor().extract(text)
