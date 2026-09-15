"""slot_schema.py -- dimension-schema matching above the regex families.

The regex families fire on sentence SHAPES; this layer fires on slot
STRUCTURE:  extract every quantity-with-unit, extract what is asked, and
match the extracted dimension set against formula signatures.

    "The car covers 36 km in 30 minutes. Find its speed in km/h."
        quantities: 36 (length), 30 (time)      ask: speed  [in km/h]
        schema:     {length, time} -> speed     v = s / t   = 20 m/s
        answer:     72 km/h

A schema only fires when
  - every required dimension is present EXACTLY once in the text,
  - the asked dimension is NOT among the givens,
  - optional context words (cylinder, wave, ...) are present.
Anything else refuses -- this layer must stay as safe as the families
it sits above.  It is registered LAST so specific families always win.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

_NUM = r"(?:\d{1,3}(?:,\d{2,3})+|\d+(?:\.\d+)?)"
_SCI = (r"(?:\d+(?:\.\d+)?\s*(?:[x*]|\u00d7)\s*10\s*(?:\^|\*\*)?\s*[-+]?\d+"
        r"|\d+(?:\.\d+)?\s*[eE]\s*[-+]?\d+|\d+(?:\.\d+)?)")

# unit-word surface: letters, slashes, digits, minus, superscripts, greek
_UNIT_WORD = r"[a-zA-Z\u03bc\u03bd\u03a9/\u00b0\u00b2\u00b3\u2013\-\d]+"

_QUANT_RE = re.compile(
    r"(?<![\w.])(?P<val>" + _SCI + r")\s*(?P<unit>" + _UNIT_WORD + ")",
    re.I)

_ASK_VERB = re.compile(
    r"\b(?:find|calculate|compute|determine|what\s+is|how\s+much|"
    r"how\s+many|how\s+fast|how\s+long|how\s+far|at\s+what)\b", re.I)

# ask phrase -> dimension (checked AFTER a question signal exists)
_ASK_DIM = [
    (r"\b(?:speed|velocity)\b|\bhow\s+fast\b", "speed"),
    (r"\bwavelength\b", "length"),
    (r"\bhow\s+far\b|\bdistance\b|\bheight\b|\bdepth\b|\blength\b|\bbreadth\b",
     "length"),
    (r"\btime\b|\bhow\s+long\b|\bduration\b", "time"),
    (r"\barea\b", "area"),
    (r"\bvolume\b|\bcapacity\b", "volume"),
    (r"\bcurrent\b", "current"),
    (r"\bresistance\b", "resistance"),
    (r"\bvoltage\b|\bpotential\s+difference\b|\bemf\b", "voltage"),
    (r"\bcharge\b", "charge"),
    (r"\bpower\b", "power"),
    (r"\b(?:energy|work)\b|\bheat\b", "energy"),
    (r"\bforce\b", "force"),
    (r"\bpressure\b", "pressure"),
    (r"\bdensity\b", "density"),
    (r"\bmass\b|\bweight\b", "mass"),
    (r"\btemperature\b", "temperature"),
    (r"\bfrequency\b", "frequency"),
    (r"\bmoles?\b|\bamount\s+of\s+substance\b", "amount"),
    (r"\b(?:molarity|concentration)\b", "concentration"),
    (r"\bmolar\s+mass\b", "molarmass"),
]

# output-unit capture: "in km/h", "in cm", "in minutes", "in litres"
_ASK_UNIT = re.compile(
    r"\bin\s+([a-zA-Z\u03bc\u03a9/\u00b0\u00b2\u00b3]+"
    r"(?:\s*/\s*[a-zA-Z\u03bc\u03a9\u00b0]+)?)\b", re.I)


@dataclass
class Quantity:
    value_si: float          # value in the dimension's canonical unit
    dim: str
    raw: str                 # the matched span


def _extract_quantities(text: str) -> List[Quantity]:
    from backend.its.solver.unit_registry import resolve
    # compound spoken units: "4 m per s" must parse as a SPEED, not a
    # bare length -- the bare-'m' reading bound a velocity into the
    # PE = m g h height slot and shipped 588 J for a kinetic-energy ask
    # (true 120 J).  Normalize "per" between unit words to "/" first,
    # then squeeze spaces around the slash so _QUANT_RE can capture it.
    text = re.sub(r"\bper\s+(?!cent\b)(?=[a-zA-Z\u03bc\u03bd\u03a9])", "/",
                  text)
    text = re.sub(r"([a-zA-Z\u03bc\u03bd\u03a9\u00b0])\s*/\s*"
                  r"(?=[a-zA-Z\u03bc\u03bd\u03a9\u00b0])", r"\1/", text)
    out: List[Quantity] = []
    for m in _QUANT_RE.finditer(text):
        # keep the ORIGINAL case: resolve() needs it for single-letter
        # SI ambiguities ("C" coulomb vs "c" ... / "V" volt)
        unit = m.group("unit").strip().rstrip(".,").strip()
        unit = unit.replace(" ", "").replace("\u2013", "-")
        if not unit or unit.isdigit():
            continue
        hit = resolve(unit)
        if hit is None:
            continue
        canon, factor = hit
        from backend.its.solver.unit_registry import CANONICAL
        if canon not in CANONICAL:
            continue
        dim = CANONICAL[canon][0]
        if dim in ("dimensionless", "percentage", "money", "angle",
                   "temperature"):
            continue  # v1: only physical, non-affine quantities
        try:
            val = float(m.group("val").replace(",", ""))
        except ValueError:
            continue
        if val == 0:
            continue
        # factor -> canonical unit, then canonical unit -> SI base
        # ("g" -> gram_g (x1) -> kg (x0.001))
        si = val * factor * CANONICAL[canon][1]
        out.append(Quantity(si, dim, m.group(0).strip()))
    return out


def _extract_ask(text: str) -> Optional[str]:
    m = _ASK_VERB.search(text)
    if not m:
        return None
    tail = text[m.end():m.end() + 200]
    # nearest ask dimension wins: "find the TIME taken ... at a SPEED of
    # 20 m/s" asks time, not speed, even though 'speed' also appears
    best: Optional[Tuple[int, str]] = None
    for pat, dim in _ASK_DIM:
        mm = re.search(pat, tail, re.I)
        if mm and (best is None or mm.start() < best[0]):
            best = (mm.start(), dim)
    return best[1] if best else None


def _extract_output_unit(text: str) -> Optional[Tuple[str, str]]:
    """Last 'in <unit>' mention -> (canonical, surface)."""
    m = None
    for m in _ASK_UNIT.finditer(text):
        pass
    if m is None:
        return None
    from backend.its.solver.unit_registry import resolve
    hit = resolve(m.group(1).replace(" ", ""))
    if hit is None:
        return None
    return hit[0], m.group(1).replace(" ", "")


# --------------------------------------------------------------------------- #
# Schema table: (name, input dims sorted tuple, context regex|None,
#                output dim, fn(si_values: Dict[str, float]) -> float,
#                equation string)
# Only UNAMBIGUOUS dimension signatures live here.
# --------------------------------------------------------------------------- #

SCHEMAS = [
    ("SPEED_FROM_DISTANCE_TIME", ("length", "time"), None, "speed",
     lambda v: v["length"] / v["time"], "v = s / t"),
    ("DISTANCE_FROM_SPEED_TIME", ("speed", "time"), None, "length",
     lambda v: v["speed"] * v["time"], "s = v t"),
    ("TIME_FROM_DISTANCE_SPEED", ("length", "speed"), None, "time",
     lambda v: v["length"] / v["speed"], "t = s / v"),
    ("WAVE_SPEED", ("frequency", "length"), None, "speed",
     lambda v: v["frequency"] * v["length"], "v = f lambda"),
    ("RESISTANCE_OHM_LAW", ("voltage", "current"), None, "resistance",
     lambda v: v["voltage"] / v["current"], "R = V / I"),
    ("CURRENT_OHM_LAW", ("voltage", "resistance"), None, "current",
     lambda v: v["voltage"] / v["resistance"], "I = V / R"),
    ("VOLTAGE_OHM_LAW", ("current", "resistance"), None, "voltage",
     lambda v: v["current"] * v["resistance"], "V = I R"),
    ("WORK_FORCE_DISTANCE", ("force", "length"), None, "energy",
     lambda v: v["force"] * v["length"], "W = F d"),
    ("KINETIC_ENERGY", ("mass", "speed"), None, "energy",
     lambda v: 0.5 * v["mass"] * v["speed"] ** 2, "KE = (1/2) m v^2"),
    ("POTENTIAL_ENERGY", ("mass", "length"), None, "energy",
     lambda v: v["mass"] * 9.8 * v["length"], "PE = m g h"),
    ("DENSITY_FROM_MASS_VOLUME", ("mass", "volume"), None, "density",
     lambda v: 1000.0 * v["mass"] / v["volume"],
     "rho = m / V  (V in litres -> kg/m3)"),
    ("POWER_FROM_ENERGY_TIME", ("energy", "time"), None, "power",
     lambda v: v["energy"] / v["time"], "P = E / t"),
    ("CONCENTRATION_FROM_AMOUNT_VOLUME", ("amount", "volume"), None,
     "concentration",
     lambda v: v["amount"] / v["volume"], "c = n / V"),
    ("MOLAR_MASS_FROM_MASS_AMOUNT", ("mass", "amount"), None, "molarmass",
     lambda v: 1000.0 * v["mass"] / v["amount"],
     "M = m / n  (m in kg -> g/mol)"),
    ("CHARGE_FROM_CURRENT_TIME", ("current", "time"), None, "charge",
     lambda v: v["current"] * v["time"], "Q = I t"),
    ("ENERGY_FROM_CHARGE_VOLTAGE", ("charge", "voltage"), None, "energy",
     lambda v: v["charge"] * v["voltage"], "W = Q V"),
    ("CYLINDER_VOLUME", ("area", "length"),
     re.compile(r"\b(?:cylinder|prism|column|beam)\b", re.I), "volume",
     lambda v: v["area"] * v["length"], "V = A h"),
]

# canonical output units per dimension (for reporting when no unit asked)
_OUT_CANONICAL = {
    "speed": "m/s", "length": "m", "time": "s", "area": "m2",
    "volume": "L", "current": "A", "resistance": "ohm", "voltage": "V",
    "charge": "C", "power": "W", "energy": "J", "force": "N",
    "pressure": "Pa", "density": "kg/m3", "mass": "kg",
    "temperature": "K", "frequency": "Hz", "amount": "mol",
    "concentration": "mol/L", "molarmass": "g/mol",
}

# registry canonical ids per dimension (value_si is expressed in THIS base)
_OUT_CANONICAL_ID = {
    "speed": "speed_ms", "length": "length_m", "time": "time_s",
    "area": "area_m2", "volume": "volume_l", "current": "current_a",
    "resistance": "ohm", "voltage": "volt", "charge": "charge_c",
    "energy": "energy_j", "mass": "mass_kg", "amount": "amount_mol",
    "concentration": "concentration_molL", "temperature": "temperature_c",
    "frequency": "frequency_hz", "force": "newton",
    "pressure": "pressure_pa", "density": "density_kgm3",
    "power": "power_w", "molarmass": "molarmass_gpmol",
}


def _dim_counts(qs: List[Quantity]) -> Dict[str, List[Quantity]]:
    d: Dict[str, List[Quantity]] = {}
    for q in qs:
        d.setdefault(q.dim, []).append(q)
    return d


def model_slot_schema(text: str) -> ModelResult:
    def _no(note: str) -> ModelResult:
        return ModelResult(structure="SLOT_SCHEMA", matched=False,
                           confidence=0.0, quantities={},
                           governing_equation="", note=note)

    ask = _extract_ask(text)
    if ask is None:
        return _no("no ask dimension found")
    qs = _extract_quantities(text)
    if len(qs) < 2:
        return _no("need at least two unit-carrying quantities")
    counts = _dim_counts(qs)
    if ask in counts:
        return _no("asked dimension also appears among the givens")
    for dim, lst in counts.items():
        if len(lst) > 1:
            return _no(f"ambiguous: {len(lst)} quantities of dimension "
                       f"'{dim}'")
    given = {q.dim: q.value_si for q in qs}
    given_dims = tuple(sorted(given.keys()))

    for name, need, ctx, out_dim, fn, equation in SCHEMAS:
        if out_dim != ask or tuple(sorted(need)) != given_dims:
            continue
        if ctx is not None and not ctx.search(text):
            continue
        # RED-TEAM GUARD: in orbital/rotational context the stated length
        # is a RADIUS, so v = s / t under-reports by 2 pi (MOT-04: 1762
        # vs the true 11061 km/h).  The circular family owns this.
        if name == "SPEED_FROM_DISTANCE_TIME" and re.search(
                r"\b(?:orbit\w*|revolv\w*|circular)\b", text, re.I):
            continue
        try:
            value_si = float(fn(given))
        except Exception:
            continue
        if value_si <= 0 or value_si != value_si:  # negative / NaN
            return _no("non-physical result")
        si_unit = _OUT_CANONICAL.get(out_dim, "")
        out = _extract_output_unit(text)
        value = value_si
        out_surface = si_unit
        if out is not None:
            out_surface = out[1]
            # value_si is in the dimension's canonical base: always
            # convert FROM the canonical id TO the requested surface unit
            from backend.its.solver.unit_registry import convert
            conv = convert(value_si, out[0], out[1])
            if conv is None:
                return _no("asked output unit incompatible")
            value = conv
        qtxt = ", ".join(f"{q.raw} ({q.dim})" for q in qs)
        steps = [
            f"Read slots: {qtxt}. Ask: {ask}.",
            f"{equation} = {value_si:.6g} {si_unit}".rstrip(),
        ]
        if value != value_si:
            steps.append(f"converted to requested unit: {value:.6g} "
                         f"{out_surface}")
        steps.append(f"ANSWER: {value:.6g} {out_surface}".rstrip())
        final = f"{value:.6g} {out_surface}".rstrip()
        return ModelResult(
            structure=name, matched=True, confidence=0.90,
            quantities={**given, "result": value},
            governing_equation=equation,
            final_answer=final, numeric_answer=float(value),
            steps=steps, note="slot-schema match")
    return _no("no schema matches the given dimension set")


def _register_into_ml() -> bool:
    """Import-order-safe registration (same pattern as extra_families)."""
    try:
        import backend.its.solver.modeling_layer as _ml
    except ImportError:
        return False
    if not any(getattr(fn, "__name__", "") == "model_slot_schema"
               for fn in _ml._STRUCTURES):
        _ml._STRUCTURES.append(model_slot_schema)
    return True


if not _register_into_ml():
    pass  # modeling_layer not importable yet; its batch-11 registers us
