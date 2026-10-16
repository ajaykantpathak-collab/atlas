"""dimensions.py — the unit/dimension registry for signature routing.

ONE table mapping every unit string in the corpora to a base-dimension
vector and an SI conversion factor.  This is the foundation the signature
resolver (and the ProblemIR quantity extractor) stand on: quantities stop
being text fragments and become typed values.

Dimension vectors are 7-tuples over the SI base dimensions:
    (M, L, T, I, Θ, N, J)   mass, length, time, current, temperature,
                            amount of substance, luminous intensity
plus two extended "dimensions" for domains where the ask is not physical:
    ("₹",) currency    and    ("%",) percentage   and   ("",) dimensionless

All vectors are tuples; zero-vector is dimensionless.
"""
from __future__ import annotations

import re
from typing import Dict, Optional, Tuple

Dims = Tuple[float, ...]

_M, _L, _T, _I, _TH, _N, _J = 1.0, 0, 0, 0, 0, 0, 0  # indices in the tuple


def dims(*parts: float) -> Dims:
    """Build a 7-vector from (M, L, T, I, Θ, N, J) exponents."""
    v = [0.0] * 7
    for i, p in enumerate(parts):
        v[i] = float(p)
    return tuple(v)


D_LENGTH = dims(0, 1)
D_TIME = dims(0, 0, 1)
D_MASS = dims(1)
D_SPEED = dims(0, 1, -1)
D_ACCEL = dims(0, 1, -2)
D_FORCE = dims(1, 1, -2)
D_ENERGY = dims(1, 2, -2)
D_POWER = dims(1, 2, -3)
D_AREA = dims(0, 2)
D_VOLUME = dims(0, 3)
D_PRESSURE = dims(1, -1, -2)
D_CURRENT_E = dims(0, 0, 0, 1)
D_VOLTAGE = dims(1, 2, -3, -1)
D_RESISTANCE = dims(1, 2, -3, -2)
D_CHARGE = dims(0, 0, 1, 1)
D_FREQUENCY = dims(0, 0, -1)
D_DENSITY = dims(1, -3)
D_MOLE = dims(0, 0, 0, 0, 0, 1)
D_PERCENT = ("pct", 0, 0, 0, 0, 0, 0, 0)
D_CURRENCY = ("cur", 0, 0, 0, 0, 0, 0, 0)
D_NONE = (0.0,) * 7

# unit -> (dims, factor_to_SI_base).  Only ONE canonical spelling per row;
# spelling variants normalize before lookup.
UNITS: Dict[str, Tuple[Dims, float]] = {
    # length
    "m": (D_LENGTH, 1.0), "meter": (D_LENGTH, 1.0), "metre": (D_LENGTH, 1.0),
    "km": (D_LENGTH, 1000.0), "cm": (D_LENGTH, 0.01), "mm": (D_LENGTH, 0.001),
    "mile": (D_LENGTH, 1609.344), "yard": (D_LENGTH, 0.9144),
    "foot": (D_LENGTH, 0.3048), "feet": (D_LENGTH, 0.3048),
    "inch": (D_LENGTH, 0.0254),
    # area
    "m^2": (D_AREA, 1.0), "m2": (D_AREA, 1.0), "cm^2": (D_AREA, 1e-4),
    "cm2": (D_AREA, 1e-4), "km^2": (D_AREA, 1e6), "hectare": (D_AREA, 1e4),
    # volume
    "m^3": (D_VOLUME, 1.0), "litre": (D_VOLUME, 1e-3), "liter": (D_VOLUME, 1e-3),
    "l": (D_VOLUME, 1e-3), "ml": (D_VOLUME, 1e-6), "cc": (D_VOLUME, 1e-6),
    # time
    "s": (D_TIME, 1.0), "sec": (D_TIME, 1.0), "second": (D_TIME, 1.0),
    "seconds": (D_TIME, 1.0), "min": (D_TIME, 60.0), "minute": (D_TIME, 60.0),
    "minutes": (D_TIME, 60.0), "h": (D_TIME, 3600.0), "hr": (D_TIME, 3600.0),
    "hour": (D_TIME, 3600.0), "hours": (D_TIME, 3600.0),
    "day": (D_TIME, 86400.0), "days": (D_TIME, 86400.0),
    # mass
    "g": (D_MASS, 1e-3), "gram": (D_MASS, 1e-3), "grams": (D_MASS, 1e-3),
    "kg": (D_MASS, 1.0), "kilogram": (D_MASS, 1.0), "kilograms": (D_MASS, 1.0),
    "quintal": (D_MASS, 100.0), "tonne": (D_MASS, 1000.0),
    # speed
    "m/s": (D_SPEED, 1.0), "mps": (D_SPEED, 1.0), "km/s": (D_SPEED, 1000.0),
    "km/h": (D_SPEED, 1000.0 / 3600.0), "kmph": (D_SPEED, 1000.0 / 3600.0),
    # acceleration
    "m/s^2": (D_ACCEL, 1.0), "m/s2": (D_ACCEL, 1.0),
    "km/h^2": (D_ACCEL, 1000.0 / 3600.0 ** 2),
    # force
    "n": (D_FORCE, 1.0), "newton": (D_FORCE, 1.0), "newtons": (D_FORCE, 1.0),
    "dyne": (D_FORCE, 1e-5), "kgf": (D_FORCE, 9.80665),
    # energy
    "j": (D_ENERGY, 1.0), "joule": (D_ENERGY, 1.0), "joules": (D_ENERGY, 1.0),
    "kj": (D_ENERGY, 1e3), "cal": (D_ENERGY, 4.184), "kcal": (D_ENERGY, 4184.0),
    "kwh": (D_ENERGY, 3.6e6), "erg": (D_ENERGY, 1e-7),
    "ev": (D_ENERGY, 1.602176634e-19),
    # power
    "w": (D_POWER, 1.0), "watt": (D_POWER, 1.0), "watts": (D_POWER, 1.0),
    "kw": (D_POWER, 1e3), "hp": (D_POWER, 745.6999),
    # pressure
    "pa": (D_PRESSURE, 1.0), "pascal": (D_PRESSURE, 1.0),
    "kpa": (D_PRESSURE, 1e3), "mpa": (D_PRESSURE, 1e6),
    "atm": (D_PRESSURE, 101325.0), "bar": (D_PRESSURE, 1e5),
    "mm hg": (D_PRESSURE, 133.322), "torr": (D_PRESSURE, 133.322),
    # electricity
    "a": (D_CURRENT_E, 1.0), "ampere": (D_CURRENT_E, 1.0),
    "v": (D_VOLTAGE, 1.0), "volt": (D_VOLTAGE, 1.0), "volts": (D_VOLTAGE, 1.0),
    "ohm": (D_RESISTANCE, 1.0), "ohms": (D_RESISTANCE, 1.0),
    "c": (D_CHARGE, 1.0), "coulomb": (D_CHARGE, 1.0),
    # frequency
    "hz": (D_FREQUENCY, 1.0), "khz": (D_FREQUENCY, 1e3),
    "mhz": (D_FREQUENCY, 1e6),
    # temperature (deltas handled by the solver; absolute for conversion)
    "°c": (dims(0, 0, 0, 0, 1), 1.0), "°f": (dims(0, 0, 0, 0, 1), 5 / 9),
    "k": (dims(0, 0, 0, 0, 1), 1.0),
    # moles / chemistry
    "mol": (D_MOLE, 1.0), "mole": (D_MOLE, 1.0), "moles": (D_MOLE, 1.0),
    "g/mol": (dims(1, 0, 0, 0, 0, -1), 1e-3),
    # percent
    "%": (D_PERCENT, 1.0), "percent": (D_PERCENT, 1.0),
    # currency
    "rs": (D_CURRENCY, 1.0), "rs.": (D_CURRENCY, 1.0), "₹": (D_CURRENCY, 1.0),
    "inr": (D_CURRENCY, 1.0), "paisa": (D_CURRENCY, 0.01),
    "paise": (D_CURRENCY, 0.01), "crore": (D_CURRENCY, 1e7),
    "lakh": (D_CURRENCY, 1e5), "lakhs": (D_CURRENCY, 1e5),
}

# normalization map: variant spelling -> canonical key
_VARIANTS = {
    "meters": "meter", "metres": "metre", "kilometers": "km",
    "kilometer": "km", "centimeters": "cm", "millimeters": "mm",
    "kilograms": "kg", "kilogramme": "kg", "gramme": "gram",
    "grammes": "grams", "litres": "litre", "liters": "liter",
    "kilometres": "km", "kilometre": "km", "hours": "hour",
    "hrs": "hr", "minutes": "min", "seconds": "sec", "secs": "sec",
    "newton": "n", "newtons": "n", "joule": "j", "joules": "j",
    "ohms": "ohm", "ohm.": "ohm", "rupees": "rs", "rupee": "rs",
}

_NUM_TOKEN = re.compile(
    r"[-+]?\d[\d,]*(?:\.\d+)?(?:\s*(?:×|x|\\times)\s*10\^?\{?-?\d+\}?)?",
)


def canon_unit(raw: str) -> Optional[str]:
    """Canonical key for a unit spelling, or None."""
    k = raw.strip().lower().rstrip(".")
    if k in UNITS:
        return k
    k = _VARIANTS.get(k, k)
    return k if k in UNITS else None


def unit_dims(raw: str) -> Optional[Dims]:
    k = canon_unit(raw)
    return UNITS[k][0] if k else None


def to_si(value: float, raw: str) -> Optional[float]:
    k = canon_unit(raw)
    return value * UNITS[k][1] if k else None


_NUM_RE = re.compile(r"[-+]?\d[\d,]*(?:\.\d+)?")
_UNIT_AFTER_NUM = re.compile(
    r"^\s*(?:×|x)?\s*10\^?\{?(-?\d+)\}?\s*|^\s*([A-Za-z₹°][A-Za-z₀-₉°/^.\s]{0,12})")


def scan_quantities(text: str):
    """Yield (value_si, dims, raw_span, unit_raw) for every number-with-unit
    in the text.  Numbers without a recognized unit are skipped (the
    caller's own patterns handle unitless maths)."""
    for m in _NUM_TOKEN.finditer(text):
        num_txt = m.group(0).replace(",", "")
        try:
            value = float(num_txt)
        except ValueError:
            continue
        tail = text[m.end():m.end() + 14]
        um = re.match(r"\s*([A-Za-z₹°/^\d]{1,10}(?:/[A-Za-z^\d]{1,6})?)",
                      tail)
        if not um:
            continue
        raw_u = um.group(1).strip().rstrip(".")
        k = canon_unit(raw_u)
        if k is None:
            continue
        d, f = UNITS[k]
        yield value * f, d, m.group(0) + raw_u, raw_u
