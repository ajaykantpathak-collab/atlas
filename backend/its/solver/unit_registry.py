"""unit_registry.py -- canonical units, synonym resolution, conversion.

Deterministic unit grammar for the solver families.  Students type the
same quantity in many units ("400 nm", "30 minutes", "36 km/h"); every
family that declares a unit schema gets slot values converted to the
family's canonical unit BEFORE its compute runs, so the closed form
never sees a wrong-scaled number.

Pieces:
  CANONICAL         canonical unit -> (dimension, factor-to-base, offset)
  _SYNONYM_ROWS     surface unit words (regex-safe keys) -> canonical
  resolve(word)     surface word -> (canonical unit, factor) or None
  convert(v, f, t)  numeric conversion; None on incompatible dimensions
  dimensions_of(s)  unit dimensions present in a text (conservative set)
  has_dimensions()  prefilter: are all required dimensions present?
  normalize_slots() parse-time hook: convert matched slots to canonical

Design rules (zero-wrong-answer constraints):
  - A slot is converted ONLY when the unit word right after the number
    resolves to the SAME dimension the schema declares.  Anything else
    (unknown word, mismatched dimension, unparseable value) leaves the
    slot untouched -- families keep their current behaviour.
  - Every conversion leaves a "_conv_<slot>" marker in the groupdict so
    computes can tell normalized values from raw ones and fall back to
    their legacy unit handling when no marker exists.
  - dimensions_of is deliberately INCLUSIVE: ambiguous tokens ("m",
    "t", "c") add every dimension they could mean, so the prefilter can
    only under-report absence, never over-report presence.  A skip on a
    required dimension is only lossless when the trigger itself needs
    that unit word -- families list those in "_need".

REGEX SAFETY NOTE: every pattern in this module is written as a RAW
string.  A non-raw string containing backslash sequences silently
turns them into control characters and corrupts matching -- never
write a regex as a plain (non-raw) string.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Set, Tuple, Union

# --------------------------------------------------------------------------- #
# Canonical units: name -> (dimension, factor to the dimension base, offset)
# --------------------------------------------------------------------------- #

CANONICAL: Dict[str, Tuple[str, float, float]] = {
    # length / area / volume
    "length_m": ("length", 1.0, 0.0),
    "area_m2": ("area", 1.0, 0.0),
    "volume_l": ("volume", 1.0, 0.0),
    # time / mass (gram_g kept beside mass_kg: stoichiometry works in g)
    "time_s": ("time", 1.0, 0.0),
    "mass_kg": ("mass", 1.0, 0.0),
    "gram_g": ("mass", 0.001, 0.0),
    # motion / energy / frequency
    "speed_ms": ("speed", 1.0, 0.0),
    "energy_j": ("energy", 1.0, 0.0),
    "energy_ev": ("energy", 1.6e-19, 0.0),
    "frequency_hz": ("frequency", 1.0, 0.0),
    # angle / temperature (kelvin carries its additive offset)
    "angle_deg": ("angle", 1.0, 0.0),
    "temperature_c": ("temperature", 1.0, 0.0),
    "temperature_k": ("temperature", 1.0, 273.15),
    # money / amount / concentration
    "currency_inr": ("money", 1.0, 0.0),
    "amount_mol": ("amount", 1.0, 0.0),
    "concentration_molL": ("concentration", 1.0, 0.0),
    # electricity / magnetism / mechanics outputs
    "current_a": ("current", 1.0, 0.0),
    "charge_c": ("charge", 1.0, 0.0),
    "volt": ("voltage", 1.0, 0.0),
    "ohm": ("resistance", 1.0, 0.0),
    "farad": ("capacitance", 1.0, 0.0),
    "tesla": ("magnetic", 1.0, 0.0),
    "newton": ("force", 1.0, 0.0),
    "dioptre": ("dioptricpower", 1.0, 0.0),
    # power / molar mass
    "power_w": ("power", 1.0, 0.0),
    "molarmass_gpmol": ("molarmass", 1.0, 0.0),
    # pressure / density (fluid mechanics, barometer forms)
    "pressure_pa": ("pressure", 1.0, 0.0),
    "density_kgm3": ("density", 1.0, 0.0),
    # pure numbers
    "percent": ("percentage", 0.01, 0.0),
    "dimensionless": ("dimensionless", 1.0, 0.0),
}

# --------------------------------------------------------------------------- #
# Synonym table: surface word -> (canonical, factor to canonical, case rule)
# case rule: None = any case, "upper" = only when typed uppercase
# (single-letter SI ambiguities: M molar vs m metre, C coulomb vs c, ...)
# --------------------------------------------------------------------------- #

_RAD = 57.29577951308232   # degrees per radian
_KMH = 1000.0 / 3600.0     # m/s per km/h

# (word, canonical, factor, case) -- word keys are compared lowercased
# with spaces collapsed; "/" gets flexible spacing at match time.
_SYNONYM_ROWS = (
    # ---- length ----
    ("mm", "length_m", 0.001, None),
    ("millimetre", "length_m", 0.001, None),
    ("millimetres", "length_m", 0.001, None),
    ("millimeter", "length_m", 0.001, None),
    ("millimeters", "length_m", 0.001, None),
    ("cm", "length_m", 0.01, None),
    ("centimetre", "length_m", 0.01, None),
    ("centimetres", "length_m", 0.01, None),
    ("centimeter", "length_m", 0.01, None),
    ("centimeters", "length_m", 0.01, None),
    ("um", "length_m", 1e-06, None),
    ("\u03bcm", "length_m", 1e-06, None),
    ("\u00b5m", "length_m", 1e-06, None),
    ("micron", "length_m", 1e-06, None),
    ("microns", "length_m", 1e-06, None),
    ("micrometre", "length_m", 1e-06, None),
    ("micrometres", "length_m", 1e-06, None),
    ("micrometer", "length_m", 1e-06, None),
    ("micrometers", "length_m", 1e-06, None),
    ("nm", "length_m", 1e-09, None),
    ("nanometre", "length_m", 1e-09, None),
    ("nanometres", "length_m", 1e-09, None),
    ("nanometer", "length_m", 1e-09, None),
    ("nanometers", "length_m", 1e-09, None),
    ("km", "length_m", 1000.0, None),
    ("kilometre", "length_m", 1000.0, None),
    ("kilometres", "length_m", 1000.0, None),
    ("kilometer", "length_m", 1000.0, None),
    ("kilometers", "length_m", 1000.0, None),
    ("m", "length_m", 1.0, None),
    ("metre", "length_m", 1.0, None),
    ("metres", "length_m", 1.0, None),
    ("meter", "length_m", 1.0, None),
    ("meters", "length_m", 1.0, None),
    # ---- area ----
    ("m2", "area_m2", 1.0, None),
    ("m 2", "area_m2", 1.0, None),
    ("m^2", "area_m2", 1.0, None),
    ("m**2", "area_m2", 1.0, None),
    ("sq m", "area_m2", 1.0, None),
    ("square metre", "area_m2", 1.0, None),
    ("square metres", "area_m2", 1.0, None),
    ("square meter", "area_m2", 1.0, None),
    ("square meters", "area_m2", 1.0, None),
    ("cm2", "area_m2", 1e-04, None),
    ("cm 2", "area_m2", 1e-04, None),
    ("cm^2", "area_m2", 1e-04, None),
    ("sq cm", "area_m2", 1e-04, None),
    ("square centimetre", "area_m2", 1e-04, None),
    ("square centimetres", "area_m2", 1e-04, None),
    # ---- volume ----
    ("ml", "volume_l", 0.001, None),
    ("millilitre", "volume_l", 0.001, None),
    ("millilitres", "volume_l", 0.001, None),
    ("milliliter", "volume_l", 0.001, None),
    ("milliliters", "volume_l", 0.001, None),
    ("cc", "volume_l", 0.001, None),
    ("l", "volume_l", 1.0, None),
    ("litre", "volume_l", 1.0, None),
    ("litres", "volume_l", 1.0, None),
    ("liter", "volume_l", 1.0, None),
    ("liters", "volume_l", 1.0, None),
    ("m3", "volume_l", 1000.0, None),
    ("m\u00b3", "volume_l", 1000.0, None),
    ("cubic metre", "volume_l", 1000.0, None),
    ("cubic meters", "volume_l", 1000.0, None),
    ("cubic metres", "volume_l", 1000.0, None),
    ("cm3", "volume_l", 0.001, None),
    ("cm\u00b3", "volume_l", 0.001, None),
    # ---- time ----
    ("ms", "time_s", 0.001, None),
    ("s", "time_s", 1.0, None),
    ("sec", "time_s", 1.0, None),
    ("secs", "time_s", 1.0, None),
    ("second", "time_s", 1.0, None),
    ("seconds", "time_s", 1.0, None),
    ("min", "time_s", 60.0, None),
    ("mins", "time_s", 60.0, None),
    ("minute", "time_s", 60.0, None),
    ("minutes", "time_s", 60.0, None),
    ("h", "time_s", 3600.0, None),
    ("hr", "time_s", 3600.0, None),
    ("hrs", "time_s", 3600.0, None),
    ("hour", "time_s", 3600.0, None),
    ("hours", "time_s", 3600.0, None),
    ("day", "time_s", 86400.0, None),
    ("days", "time_s", 86400.0, None),
    ("month", "time_s", 2592000.0, None),
    ("months", "time_s", 2592000.0, None),
    ("yr", "time_s", 31536000.0, None),
    ("yrs", "time_s", 31536000.0, None),
    ("year", "time_s", 31536000.0, None),
    ("years", "time_s", 31536000.0, None),
    # ---- mass ----
    ("mg", "gram_g", 0.001, None),
    ("milligram", "gram_g", 0.001, None),
    ("milligrams", "gram_g", 0.001, None),
    ("g", "gram_g", 1.0, None),
    ("gram", "gram_g", 1.0, None),
    ("grams", "gram_g", 1.0, None),
    ("kg", "mass_kg", 1.0, None),
    ("kilogram", "mass_kg", 1.0, None),
    ("kilograms", "mass_kg", 1.0, None),
    ("t", "mass_kg", 1000.0, None),
    ("tonne", "mass_kg", 1000.0, None),
    ("tonnes", "mass_kg", 1000.0, None),
    # ---- speed ----
    ("mps", "speed_ms", 1.0, None),
    ("m/s", "speed_ms", 1.0, None),
    ("m/sec", "speed_ms", 1.0, None),
    ("m per s", "speed_ms", 1.0, None),
    ("metre per second", "speed_ms", 1.0, None),
    ("metres per second", "speed_ms", 1.0, None),
    ("meter per second", "speed_ms", 1.0, None),
    ("meters per second", "speed_ms", 1.0, None),
    ("kmh", "speed_ms", _KMH, None),
    ("kmph", "speed_ms", _KMH, None),
    ("km/h", "speed_ms", _KMH, None),
    ("km/hr", "speed_ms", _KMH, None),
    ("km per h", "speed_ms", _KMH, None),
    ("km per hour", "speed_ms", _KMH, None),
    ("kilometre per hour", "speed_ms", _KMH, None),
    ("kilometres per hour", "speed_ms", _KMH, None),
    ("kilometer per hour", "speed_ms", _KMH, None),
    ("kilometers per hour", "speed_ms", _KMH, None),
    ("cm/s", "speed_ms", 0.01, None),
    ("cm per s", "speed_ms", 0.01, None),
    ("centimetre per second", "speed_ms", 0.01, None),
    ("centimeter per second", "speed_ms", 0.01, None),
    # ---- energy ----
    ("j", "energy_j", 1.0, None),
    ("joule", "energy_j", 1.0, None),
    ("joules", "energy_j", 1.0, None),
    ("kj", "energy_j", 1000.0, None),
    ("kilojoule", "energy_j", 1000.0, None),
    ("kilojoules", "energy_j", 1000.0, None),
    ("ev", "energy_ev", 1.0, None),
    ("electronvolt", "energy_ev", 1.0, None),
    ("electronvolts", "energy_ev", 1.0, None),
    ("electron volt", "energy_ev", 1.0, None),
    ("electron volts", "energy_ev", 1.0, None),
    # ---- frequency ----
    ("hz", "frequency_hz", 1.0, None),
    ("khz", "frequency_hz", 1000.0, None),
    ("mhz", "frequency_hz", 1e+06, None),
    ("ghz", "frequency_hz", 1e+09, None),
    # ---- angle ----
    ("deg", "angle_deg", 1.0, None),
    ("degree", "angle_deg", 1.0, None),
    ("degrees", "angle_deg", 1.0, None),
    ("\u00b0", "angle_deg", 1.0, None),
    ("rad", "angle_deg", _RAD, None),
    ("rads", "angle_deg", _RAD, None),
    ("radian", "angle_deg", _RAD, None),
    ("radians", "angle_deg", _RAD, None),
    # ---- temperature ----
    ("c", "temperature_c", 1.0, "lower"),
    ("celsius", "temperature_c", 1.0, None),
    ("centigrade", "temperature_c", 1.0, None),
    ("\u00b0c", "temperature_c", 1.0, None),
    ("k", "temperature_k", 1.0, "upper"),
    ("kelvin", "temperature_k", 1.0, None),
    ("kelvins", "temperature_k", 1.0, None),
    # ---- money ----
    ("rs", "currency_inr", 1.0, None),
    ("rupee", "currency_inr", 1.0, None),
    ("rupees", "currency_inr", 1.0, None),
    ("inr", "currency_inr", 1.0, None),
    ("paisa", "currency_inr", 0.01, None),
    ("paise", "currency_inr", 0.01, None),
    # ---- percentage ----
    ("%", "percent", 1.0, None),
    ("percent", "percent", 1.0, None),
    ("percentage", "percent", 1.0, None),
    # ---- amount of substance ----
    ("mol", "amount_mol", 1.0, None),
    ("mole", "amount_mol", 1.0, None),
    ("moles", "amount_mol", 1.0, None),
    ("mmol", "amount_mol", 0.001, None),
    ("millimole", "amount_mol", 0.001, None),
    ("millimoles", "amount_mol", 0.001, None),
    # ---- concentration ----
    ("m", "concentration_molL", 1.0, "upper"),
    ("molar", "concentration_molL", 1.0, None),
    ("millimolar", "concentration_molL", 0.001, None),
    ("mol/l", "concentration_molL", 1.0, None),
    ("mol per litre", "concentration_molL", 1.0, None),
    ("mol per liter", "concentration_molL", 1.0, None),
    ("moles per litre", "concentration_molL", 1.0, None),
    ("moles per liter", "concentration_molL", 1.0, None),
    # ---- current ----
    ("a", "current_a", 1.0, None),
    ("amp", "current_a", 1.0, None),
    ("amps", "current_a", 1.0, None),
    ("ampere", "current_a", 1.0, None),
    ("amperes", "current_a", 1.0, None),
    # ---- charge ----
    ("c", "charge_c", 1.0, "upper"),
    ("coulomb", "charge_c", 1.0, None),
    ("coulombs", "charge_c", 1.0, None),
    ("uc", "charge_c", 1e-06, None),
    ("\u03bcc", "charge_c", 1e-06, None),
    ("microcoulomb", "charge_c", 1e-06, None),
    ("microcoulombs", "charge_c", 1e-06, None),
    ("nc", "charge_c", 1e-09, None),
    ("\u03bdc", "charge_c", 1e-09, None),
    ("nanocoulomb", "charge_c", 1e-09, None),
    ("nanocoulombs", "charge_c", 1e-09, None),
    ("mc", "charge_c", 1e-03, None),
    ("millicoulomb", "charge_c", 1e-03, None),
    ("millicoulombs", "charge_c", 1e-03, None),
    # ---- pressure ----
    ("pa", "pressure_pa", 1.0, None),
    ("pascal", "pressure_pa", 1.0, None),
    ("pascals", "pressure_pa", 1.0, None),
    ("kpa", "pressure_pa", 1000.0, None),
    ("kilopascal", "pressure_pa", 1000.0, None),
    ("kilopascals", "pressure_pa", 1000.0, None),
    ("atm", "pressure_pa", 101325.0, None),
    ("atmosphere", "pressure_pa", 101325.0, None),
    ("atmospheres", "pressure_pa", 101325.0, None),
    ("bar", "pressure_pa", 100000.0, None),
    ("mmhg", "pressure_pa", 133.322, None),
    ("mm\u00a0hg", "pressure_pa", 133.322, None),
    ("torr", "pressure_pa", 133.322, None),
    ("n/m2", "pressure_pa", 1.0, None),
    ("n/m\u00b2", "pressure_pa", 1.0, None),
    # ---- density ----
    ("kg/m3", "density_kgm3", 1.0, None),
    ("kg/m\u00b3", "density_kgm3", 1.0, None),
    ("g/cm3", "density_kgm3", 1000.0, None),
    ("g/cm\u00b3", "density_kgm3", 1000.0, None),
    ("g/cc", "density_kgm3", 1000.0, None),
    # ---- voltage ----
    ("v", "volt", 1.0, None),
    ("volt", "volt", 1.0, None),
    ("volts", "volt", 1.0, None),
    ("mv", "volt", 0.001, None),
    ("millivolt", "volt", 0.001, None),
    ("millivolts", "volt", 0.001, None),
    ("kv", "volt", 1000.0, None),
    ("kilovolt", "volt", 1000.0, None),
    ("kilovolts", "volt", 1000.0, None),
    # ---- resistance ----
    ("ohm", "ohm", 1.0, None),
    ("ohms", "ohm", 1.0, None),
    ("\u03a9", "ohm", 1.0, None),
    ("kohm", "ohm", 1000.0, None),
    ("kohms", "ohm", 1000.0, None),
    ("kiloohm", "ohm", 1000.0, None),
    ("kiloohms", "ohm", 1000.0, None),
    ("k\u03a9", "ohm", 1000.0, None),
    ("kilohm", "ohm", 1000.0, None),
    ("kilohms", "ohm", 1000.0, None),
    ("megaohm", "ohm", 1e06, None),
    ("megaohms", "ohm", 1e06, None),
    # note: bare "m-omega" (milliohm) is deliberately absent -- the case
    # ambiguity with megaohm is not worth a wrong conversion in K-12.
    # ---- capacitance ----
    ("f", "farad", 1.0, None),
    ("farad", "farad", 1.0, None),
    ("farads", "farad", 1.0, None),
    ("uf", "farad", 1e-06, None),
    ("\u03bcf", "farad", 1e-06, None),
    ("nf", "farad", 1e-09, None),
    ("nanofarad", "farad", 1e-09, None),
    ("nanofarads", "farad", 1e-09, None),
    ("pf", "farad", 1e-12, None),
    ("picofarad", "farad", 1e-12, None),
    ("picofarads", "farad", 1e-12, None),
    ("microfarad", "farad", 1e-06, None),
    ("microfarads", "farad", 1e-06, None),
    ("micro farad", "farad", 1e-06, None),
    ("micro farads", "farad", 1e-06, None),
    # ---- magnetic field ----
    ("mt", "tesla", 0.001, None),
    ("millitesla", "tesla", 0.001, None),
    ("milliteslas", "tesla", 0.001, None),
    ("t", "tesla", 1.0, "upper"),
    ("tesla", "tesla", 1.0, None),
    ("teslas", "tesla", 1.0, None),
    # ---- force ----
    ("n", "newton", 1.0, None),
    ("newton", "newton", 1.0, None),
    ("newtons", "newton", 1.0, None),
    # ---- power ----
    ("w", "power_w", 1.0, None),
    ("watt", "power_w", 1.0, None),
    ("watts", "power_w", 1.0, None),
    ("kw", "power_w", 1000.0, None),
    ("kilowatt", "power_w", 1000.0, None),
    ("kilowatts", "power_w", 1000.0, None),
    ("mw", "power_w", 0.001, None),
    ("milliwatt", "power_w", 0.001, None),
    ("milliwatts", "power_w", 0.001, None),
    ("hp", "power_w", 745.7, None),
    ("horsepower", "power_w", 745.7, None),
    # ---- molar mass ----
    ("g/mol", "molarmass_gpmol", 1.0, None),
    ("g per mol", "molarmass_gpmol", 1.0, None),
    ("grams per mole", "molarmass_gpmol", 1.0, None),
    ("kg/mol", "molarmass_gpmol", 1000.0, None),
    ("kg per mol", "molarmass_gpmol", 1000.0, None),
)

_SYNONYMS: Dict[str, List[Tuple[str, float, Optional[str]]]] = {}
for _word, _canon, _factor, _case in _SYNONYM_ROWS:
    _SYNONYMS.setdefault(_word, []).append((_canon, _factor, _case))

# --------------------------------------------------------------------------- #
# Compiled matchers (RAW patterns only)
# --------------------------------------------------------------------------- #

_NUM = r"\d+(?:\.\d+)?"


def _key_pattern(key: str) -> str:
    """Regex for one synonym key; '/' and spaces get flexible spacing."""
    if "/" in key:
        return r"\s*/\s*".join(re.escape(p) for p in key.split("/"))
    if " " in key:
        return r"\s+".join(re.escape(p) for p in key.split(" "))
    return re.escape(key)


def _tail_pattern(key: str) -> str:
    """Pattern for scanning right after a number: end boundary only."""
    pat = _key_pattern(key)
    if key[-1].isalnum():
        pat = pat + r"\b"
    return pat


def _tail_guard(key: str) -> str:
    return r"\b" if key[-1].isalnum() else ""


def _scan_pattern(key: str) -> str:
    """Pattern for whole-text scans.  Every alternative starts with
    \\s* so compound and single-letter forms compete at the same match
    start (longest key wins); multi-letter words need a boundary OR a
    digit before them ("10^6m/s"), single letters must follow a digit
    so prose never matches."""
    pat = _key_pattern(key)
    if len(key) == 1 and key[0].isalnum():
        return r"(?<=\d)\s*" + pat + _tail_guard(key)
    if key[0].isalnum():
        return r"\s*(?:\b|(?<=\d))" + pat + _tail_guard(key)
    return r"\s*" + pat + _tail_guard(key)


def _build_regex(fn) -> re.Pattern:
    keys = sorted(_SYNONYMS, key=lambda k: (-len(k), k))
    alts = "|".join("(?:%s)" % fn(k) for k in keys)
    return re.compile(r"\s*(?P<u>" + alts + r")", re.I)


# longest key first so "minutes" wins over "min" over "m"
_UNIT_TAIL_RE = _build_regex(_tail_pattern)
_DIM_SCAN_RE = _build_regex(_scan_pattern)

# --------------------------------------------------------------------------- #
# Numeric helpers
# --------------------------------------------------------------------------- #


def _parse_number(token: str) -> Optional[float]:
    """Plain / 2e-6 / 2 x 10^-6 / 10^6 tokens to float; None otherwise."""
    t = str(token or "").strip().replace(",", "").replace("\u00d7", "x")
    m = re.match(r"^(-?" + _NUM + r")\s*x\s*10\s*(?:\^|\*\*)?\s*([+-]?\d+)$",
                 t, re.I)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^(-?" + _NUM + r")\s*[eE]\s*([+-]?\d+)$", t)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^10(?!\d)\s*(?:\^|\*\*)?\s*([+-]?\d+)$", t)
    if m:
        return 10.0 ** int(m.group(1))
    try:
        return float(t)
    except ValueError:
        return None


def _fmt(value: float) -> str:
    """Round-trip form every family parser (_num/_sci) accepts."""
    return repr(float(value))


# --------------------------------------------------------------------------- #
# Resolution and conversion
# --------------------------------------------------------------------------- #


def canonical_dimension(unit: str) -> Optional[str]:
    """Dimension of a canonical unit name; None when unknown."""
    row = CANONICAL.get(unit)
    return row[0] if row else None


def resolve(word: str,
            prefer_dim: Optional[str] = None
            ) -> Optional[Tuple[str, float]]:
    """Surface unit word -> (canonical unit, factor to that canonical).

    prefer_dim (when given) forces the candidate whose dimension matches
    and returns None when none does -- a length slot is never converted
    by a mass word.  Without a preference, case rules decide the
    single-letter ambiguities ("M" is molar, "m" is metre).
    """
    surface = str(word or "").strip()
    key = " ".join(surface.lower().split()).rstrip(".")
    hits = _SYNONYMS.get(key)
    if not hits:
        return None
    if prefer_dim:
        for canon, factor, _case in hits:
            if canonical_dimension(canon) == prefer_dim:
                return canon, factor
        return None  # wrong dimension: never convert
    upper = surface[:1].isupper()
    for canon, factor, case in hits:
        if case == "upper" and not upper:
            continue
        if case == "lower" and upper:
            continue
        return canon, factor
    return hits[0][0], hits[0][1]  # single-meaning word ("k"): relax case


def _resolve_full(unit: str,
                  prefer_dim: Optional[str] = None
                  ) -> Optional[Tuple[str, float]]:
    """Canonical name passthrough, else surface-word resolution."""
    if unit in CANONICAL:
        return unit, 1.0
    return resolve(unit, prefer_dim)


def convert(value: float, from_unit: str, to_unit: str,
            prefer_dim: Optional[str] = None) -> Optional[float]:
    """Convert value between two units (surface words or canonical
    names); None when either is unknown or dimensions disagree."""
    rf = _resolve_full(from_unit, prefer_dim)
    rt = _resolve_full(to_unit)
    if rf is None or rt is None:
        return None
    f_canon, f_mul = rf
    t_canon, t_mul = rt
    if canonical_dimension(f_canon) != canonical_dimension(t_canon):
        return None
    f_dim, f_factor, f_off = CANONICAL[f_canon]
    _t_dim, t_factor, t_off = CANONICAL[t_canon]
    base = (float(value) - f_off) * f_factor * f_mul
    return base / (t_factor * t_mul) + t_off


# --------------------------------------------------------------------------- #
# Text scanning: which unit dimensions does a question mention?
# --------------------------------------------------------------------------- #


def _norm_word(word: str) -> str:
    return " ".join(str(word or "").strip().lower().split()).rstrip(".")


def dimensions_of(text: str) -> Set[str]:
    """Unit dimensions present in the text.  Deliberately inclusive:
    ambiguous tokens add every dimension they could mean, so callers
    can skip a family only when a required dimension is provably
    absent (the family's trigger would fail anyway)."""
    dims: Set[str] = set()
    if not text:
        return dims
    for m in _DIM_SCAN_RE.finditer(str(text)):
        hits = _SYNONYMS.get(_norm_word(m.group("u")))
        for canon, _factor, _case in (hits or ()):
            dims.add(CANONICAL[canon][0])
    return dims


def has_dimensions(dims: Union[str, Set[str], None],
                   need: Optional[Tuple[str, ...]]) -> bool:
    """True when every required dimension is present (vacuously true
    when the family declares no requirement)."""
    if not need:
        return True
    if dims is None:
        return False
    if isinstance(dims, str):
        dims = dimensions_of(dims)
    return set(need).issubset(set(dims))


# --------------------------------------------------------------------------- #
# Parse-time hook: normalize matched slots to the family's canonical unit
# --------------------------------------------------------------------------- #


def normalize_slots(g: Dict[str, Any], m: Any, text: str,
                    schema: Dict[str, str]) -> Dict[str, Any]:
    """Convert schema-declared slots whose number is followed by a
    recognized unit word into the slot's canonical unit.

    Only same-dimension conversions happen; every conversion records a
    "_conv_<slot>" scale marker so computes can tell normalized values
    from raw ones.  The input dict is never mutated.
    """
    out = dict(g)
    for slot, canonical in schema.items():
        if slot.startswith("_") or canonical not in CANONICAL:
            continue
        raw = g.get(slot)
        if raw is None:
            continue
        value = _parse_number(raw)
        if value is None:
            continue
        try:
            span = m.span(slot)
        except Exception:
            continue
        if not span or span[1] is None or span[1] >= len(text):
            continue
        tail = _UNIT_TAIL_RE.match(text[span[1]:span[1] + 40])
        if not tail:
            continue
        prefer = CANONICAL[canonical][0]
        res = resolve(tail.group("u"), prefer)
        if res is None:
            continue
        new_value = convert(value, tail.group("u"), canonical,
                            prefer_dim=prefer)
        if new_value is None:
            continue
        out[slot] = _fmt(new_value)
        out["_conv_" + slot] = (new_value / value) if value else 1.0
    return out
