"""pint_physics_engine.py -- Pint integration for deterministic physics solvers.

Provides rigorous unit conversions, dimensional analysis, SI normalization,
and quantity validation powered by Pint (v0.25+), with fail-safe fallbacks.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Set, Tuple, Union

try:
    import pint
    _PINT_AVAILABLE = True
except ImportError:
    pint = None
    _PINT_AVAILABLE = False


def _build_registry() -> Optional[Any]:
    if not _PINT_AVAILABLE:
        return None
    try:
        ur = pint.UnitRegistry()
        # Add educational / curriculum definitions if not already present
        defs = [
            "dioptre = 1 / meter = D = diopter",
            "inr = [currency] = rupee = rupees = Rs",
            "kwh = 3.6e6 * joule = kWh = kilowatt_hour",
            "degC = kelvin; offset: 273.15 = celsius = Celsius",
            "atm = 101325 * pascal = standard_atmosphere",
            "torr = 133.322368 * pascal",
            "bar = 100000 * pascal",
            "gauss = 1e-4 * tesla = G",
        ]
        for d in defs:
            try:
                ur.define(d)
            except Exception:
                pass  # already defined or duplicate
        return ur
    except Exception:
        return None


ureg = _build_registry()

# Dimension mappings to base SI units
SI_BASE_UNITS: Dict[str, str] = {
    "length": "meter",
    "time": "second",
    "mass": "kilogram",
    "speed": "meter / second",
    "velocity": "meter / second",
    "acceleration": "meter / second ** 2",
    "force": "newton",
    "energy": "joule",
    "power": "watt",
    "pressure": "pascal",
    "charge": "coulomb",
    "current": "ampere",
    "voltage": "volt",
    "potential": "volt",
    "resistance": "ohm",
    "capacitance": "farad",
    "magnetic": "tesla",
    "frequency": "hertz",
    "temperature": "kelvin",
    "angle": "radian",
    "density": "kilogram / meter ** 3",
}

# Surface unit word aliases mapping to Pint recognized symbols
_SURFACE_UNIT_ALIASES: Dict[str, str] = {
    # length
    "m": "meter", "metre": "meter", "metres": "meter", "meter": "meter", "meters": "meter",
    "cm": "centimeter", "centimetre": "centimeter", "centimetres": "centimeter",
    "mm": "millimeter", "millimetre": "millimeter", "millimetres": "millimeter",
    "km": "kilometer", "kilometre": "kilometer", "kilometres": "kilometer",
    "nm": "nanometer", "nanometre": "nanometer", "nanometres": "nanometer",
    "um": "micrometer", "micron": "micrometer", "microns": "micrometer",
    "\u03bcm": "micrometer", "\u00b5m": "micrometer",
    # time
    "s": "second", "sec": "second", "secs": "second", "second": "second", "seconds": "second",
    "min": "minute", "mins": "minute", "minute": "minute", "minutes": "minute",
    "h": "hour", "hr": "hour", "hrs": "hour", "hour": "hour", "hours": "hour",
    "day": "day", "days": "day", "year": "year", "years": "year", "yr": "year",
    # mass
    "g": "gram", "gram": "gram", "grams": "gram",
    "kg": "kilogram", "kilogram": "kilogram", "kilograms": "kilogram",
    "mg": "milligram", "milligram": "milligram", "milligrams": "milligram",
    "t": "metric_ton", "tonne": "metric_ton", "tonnes": "metric_ton",
    # speed
    "m/s": "meter / second", "mps": "meter / second", "m/sec": "meter / second",
    "km/h": "kilometer / hour", "kmh": "kilometer / hour", "kmph": "kilometer / hour",
    "km/hr": "kilometer / hour",
    # energy
    "j": "joule", "joule": "joule", "joules": "joule",
    "kj": "kilojoule", "kilojoules": "kilojoule",
    "ev": "electron_volt", "electronvolt": "electron_volt", "electronvolts": "electron_volt",
    "kwh": "kWh", "cal": "calorie", "kcal": "kilocalorie",
    # power
    "w": "watt", "watt": "watt", "watts": "watt",
    "kw": "kilowatt", "kilowatts": "kilowatt",
    "mw": "megawatt", "hp": "horsepower",
    # force
    "n": "newton", "newton": "newton", "newtons": "newton", "dyne": "dyne",
    # pressure
    "pa": "pascal", "pascal": "pascal", "pascals": "pascal",
    "kpa": "kilopascal", "atm": "atm", "bar": "bar", "torr": "torr",
    # electricity & magnetism
    "v": "volt", "volt": "volt", "volts": "volt", "kv": "kilovolt", "mv": "millivolt",
    "a": "ampere", "amp": "ampere", "amps": "ampere", "ampere": "ampere", "amperes": "ampere",
    "c": "coulomb", "coulomb": "coulomb", "coulombs": "coulomb",
    "uc": "microcoulomb", "\u03bcc": "microcoulomb", "nc": "nanocoulomb", "mc": "millicoulomb",
    "ohm": "ohm", "ohms": "ohm", "\u03a9": "ohm", "kohm": "kiloohm", "megohm": "megaohm",
    "f": "farad", "farad": "farad", "farads": "farad",
    "uf": "microfarad", "\u03bcf": "microfarad", "nf": "nanofarad", "pf": "picofarad",
    "t": "tesla", "tesla": "tesla", "gauss": "gauss",
    "hz": "hertz", "khz": "kilohertz", "mhz": "megahertz", "ghz": "gigahertz",
    # temperature
    "c": "degC", "degc": "degC", "celsius": "degC", "\u00b0c": "degC",
    "degree celsius": "degC", "degrees celsius": "degC",
    "k": "kelvin", "kelvin": "kelvin", "kelvins": "kelvin",
}


def is_pint_available() -> bool:
    """Check if Pint unit engine is active."""
    return _PINT_AVAILABLE and (ureg is not None)


def canonicalize_unit_string(unit_str: str) -> str:
    """Translate surface unit text into Pint-compatible unit expression."""
    raw = str(unit_str or "").strip().lower()
    raw = re.sub(r"\s+", " ", raw)
    if raw in _SURFACE_UNIT_ALIASES:
        return _SURFACE_UNIT_ALIASES[raw]
    # Check compound patterns like km/h, m/s^2, kg/m^3
    parts = re.split(r"([/*^])", raw)
    cleaned = []
    for p in parts:
        pt = p.strip()
        if pt in _SURFACE_UNIT_ALIASES:
            cleaned.append(_SURFACE_UNIT_ALIASES[pt])
        else:
            cleaned.append(pt)
    return " ".join(cleaned)


def convert_units(
    value: float,
    from_unit: str,
    to_unit: str,
    strict_dimensions: bool = True
) -> Optional[float]:
    """Convert value from from_unit to to_unit with Pint.

    Returns converted float magnitude, or None if conversion fails.
    """
    if ureg is None:
        return None

    try:
        u_from = canonicalize_unit_string(from_unit)
        u_to = canonicalize_unit_string(to_unit)
        
        # Handle offset temperature conversions safely
        is_from_c = u_from.lower() in ("degc", "celsius", "c")
        is_to_k = u_to.lower() in ("kelvin", "k")
        if is_from_c and is_to_k:
            return float(value) + 273.15
        is_from_k = u_from.lower() in ("kelvin", "k")
        is_to_c = u_to.lower() in ("degc", "celsius", "c")
        if is_from_k and is_to_c:
            return float(value) - 273.15

        qty = ureg.Quantity(float(value), u_from)
        target_qty = qty.to(u_to)
        return float(target_qty.magnitude)
    except Exception:
        return None


def normalize_to_si(value: float, unit_str: str) -> Optional[Tuple[float, str]]:
    """Convert a value in any unit to its standard SI equivalent.

    Returns (si_value, si_unit_string) or None.
    """
    if ureg is None:
        return None

    try:
        u_clean = canonicalize_unit_string(unit_str)
        if u_clean in ("degC", "celsius"):
            return float(value) + 273.15, "kelvin"

        qty = ureg.Quantity(float(value), u_clean)
        dim = str(qty.dimensionality)

        # Match to known physical dimension
        for dim_name, target_si in SI_BASE_UNITS.items():
            try:
                target_unit = canonicalize_unit_string(target_si)
                test_q = ureg.Quantity(1.0, target_unit)
                if test_q.dimensionality == qty.dimensionality:
                    res = qty.to(target_unit)
                    return float(res.magnitude), target_si
            except Exception:
                continue

        # Fallback: base SI units
        si_qty = qty.to_base_units()
        return float(si_qty.magnitude), str(si_qty.units)
    except Exception:
        return None


def check_dimensions(unit_str: str, target_dimension: str) -> bool:
    """Verify whether unit_str matches the target physical dimension.

    e.g. check_dimensions("km/h", "speed") -> True
         check_dimensions("kWh", "energy") -> True
         check_dimensions("microcoulomb", "charge") -> True
    """
    if ureg is None:
        return False

    try:
        u_clean = canonicalize_unit_string(unit_str)
        q = ureg.Quantity(1.0, u_clean)
        
        target_si = SI_BASE_UNITS.get(target_dimension.lower())
        if not target_si:
            return False

        target_q = ureg.Quantity(1.0, canonicalize_unit_string(target_si))
        return q.dimensionality == target_q.dimensionality
    except Exception:
        return False


def parse_quantity(text_or_val: Union[str, float], default_unit: str = "") -> Optional[Tuple[float, str]]:
    """Extract numeric value and unit from string like '72 km/h' or '400 nm'."""
    s = str(text_or_val).strip()
    m = re.match(r"^(-?\d+(?:\.\d+)?(?:\s*[eE]\s*[-+]?\d+)?)\s*(.*)$", s)
    if not m:
        return None
    val = float(m.group(1))
    unit = m.group(2).strip() or default_unit
    return val, unit
