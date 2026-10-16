"""variable_extractor.py — Phase 3.3: NER-first quantity extraction.

BUILD_ORDER contract: question text ->
    {"values": [{"value": float, "unit": str, "role": str, "raw": str}],
     "structure_hint": str | None,
     "source": "ner"}
in <=20 ms warm.  Wired in its.solver.quantity_binder.bind_quantities as
the FIRST extraction stage of the solve path; the regex quantity parser
stays as the unchanged fallback (this module never removes it).

Model: training/ner_model_v3/model-best (v3: closes the 5 v2 OOD gaps — currency, force units, m², percent-base frames, bare counts; 20/20 hand-set. v2 remains on disk as fallback). (spaCy 3.8.14, tok2vec+ner).
Entity labels emitted by the model:
    VALUE    the numeric span ("75", "1,20,000", "4.5")
    UNIT     the measurement unit ("km/h", "kg", "litres", "%")
    PERCENT  the percent operand of an "X% of Y" frame
    BASE     the whole operand Y of an "X% of Y" frame

The model carries no ROLE entity — the role (unit family, aligned with
quantity_binder._FAMILY_TO_NAMES so the output binds directly) is
derived deterministically from the paired unit plus small glue rules:
currency adjacency (Rs 500, Rs 1,20,000), trailing rupee words, and
per-time compounds (km per hour -> velocity, litres per minute ->
flow_rate).

Honesty caveat: the published F=99.92 is IN-DOMAIN (dev split of
regex-generated silver labels).  The real gate is the hand-written
out-of-domain set in tests/test_variable_extractor.py.

Fail-soft law: any model-load or inference error returns
    {"values": [], "structure_hint": None, "source": "ner_unavailable"}
and never raises into the solve path.
"""

from __future__ import annotations

import logging
import os
import re
import threading
from pathlib import Path
from typing import Any, Dict, List, Optional

_log = logging.getLogger(__name__)

_DEFAULT_MODEL_DIR = (Path(__file__).resolve().parent.parent /
                      "training" / "ner_model_v3" / "model-best")
# align with the registry's ReDoS guard: phrase-level extraction has no
# business scanning megabyte inputs (latency budget is 20 ms warm)
_MAX_TEXT_CHARS = 1600

_model = None
_model_failed = False
_infer_failures = 0
_model_lock = threading.Lock()

_UNAVAILABLE = {"values": [], "structure_hint": None,
                "source": "ner_unavailable"}


def _unavailable() -> Dict[str, Any]:
    """Fresh sentinel per call — never hand out a shared mutable list."""
    return {"values": [], "structure_hint": None,
            "source": "ner_unavailable"}


def _model_path() -> Path:
    return Path(os.environ.get("NER_MODEL_PATH") or _DEFAULT_MODEL_DIR)


def _disabled() -> bool:
    """Ops lever: NER_EXTRACTOR_DISABLED=1 hard-disables the stage."""
    return os.environ.get("NER_EXTRACTOR_DISABLED", "").strip().lower() \
        in ("1", "true", "yes")


def _load_model():
    """Lazy singleton load (pattern matches variable_registry._Embedder).

    Any failure sets _model_failed once — a broken install must cost one
    failed load, not one per question."""
    global _model, _model_failed
    if _disabled():
        _model_failed = True
        return None
    if _model is None and not _model_failed:
        with _model_lock:
            if _model is None and not _model_failed:
                try:
                    import spacy
                    _model = spacy.load(str(_model_path()))
                    _log.info("variable_extractor: NER model loaded "
                              "from %s", _model_path())
                except Exception:
                    _model_failed = True
                    _log.warning("variable_extractor: NER model "
                                 "unavailable at %s; extraction degrades "
                                 "to ner_unavailable and the regex "
                                 "quantity parser stays authoritative",
                                 _model_path(), exc_info=True)
    return _model


def _reset_for_tests() -> None:
    """Drop the cached singleton (test isolation only)."""
    global _model, _model_failed, _infer_failures
    with _model_lock:
        _model = None
        _model_failed = False
        _infer_failures = 0


# --------------------------------------------------------------------------- #
# unit -> (canonical unit, role/family).  Role names align with
# quantity_binder._FAMILY_TO_NAMES so extracted values bind directly.
# --------------------------------------------------------------------------- #

_UNIT_MAP = {
    # speed / velocity
    "km/h": ("km/h", "velocity"), "kmph": ("km/h", "velocity"),
    "km/hr": ("km/h", "velocity"), "mps": ("m/s", "velocity"),
    "m/s": ("m/s", "velocity"), "cm/s": ("cm/s", "velocity"),
    "km/s": ("km/s", "velocity"),
    "kilometres per hour": ("km/h", "velocity"),
    "kilometers per hour": ("km/h", "velocity"),
    "km per hour": ("km/h", "velocity"),
    "kilometre per hour": ("km/h", "velocity"),
    "metres per second": ("m/s", "velocity"),
    "meters per second": ("m/s", "velocity"),
    "metre per second": ("m/s", "velocity"),
    "meter per second": ("m/s", "velocity"),
    # length
    "km": ("km", "length"), "kilometre": ("km", "length"),
    "kilometres": ("km", "length"), "kilometer": ("km", "length"),
    "kilometers": ("km", "length"),
    "m": ("m", "length"), "metre": ("m", "length"),
    "metres": ("m", "length"), "meter": ("m", "length"),
    "meters": ("m", "length"),
    "cm": ("cm", "length"), "centimetre": ("cm", "length"),
    "centimetres": ("cm", "length"), "centimeter": ("cm", "length"),
    "centimeters": ("cm", "length"),
    "mm": ("mm", "length"), "millimetre": ("mm", "length"),
    "millimetres": ("mm", "length"), "millimeter": ("mm", "length"),
    "millimeters": ("mm", "length"),
    # time
    "s": ("s", "time"), "sec": ("s", "time"), "secs": ("s", "time"),
    "second": ("s", "time"), "seconds": ("s", "time"),
    "min": ("min", "time"), "mins": ("min", "time"),
    "minute": ("min", "time"), "minutes": ("min", "time"),
    "h": ("h", "time"), "hr": ("h", "time"), "hrs": ("h", "time"),
    "hour": ("h", "time"), "hours": ("h", "time"),
    "day": ("day", "time"), "days": ("day", "time"),
    "week": ("week", "time"), "weeks": ("week", "time"),
    "month": ("month", "time"), "months": ("month", "time"),
    "year": ("year", "time"), "years": ("year", "time"),
    # mass
    "kg": ("kg", "mass"), "kilogram": ("kg", "mass"),
    "kilograms": ("kg", "mass"), "g": ("g", "mass"),
    "gram": ("g", "mass"), "grams": ("g", "mass"),
    "mg": ("mg", "mass"), "milligram": ("mg", "mass"),
    "milligrams": ("mg", "mass"), "tonne": ("tonne", "mass"),
    "tonnes": ("tonne", "mass"), "ton": ("tonne", "mass"),
    "tons": ("tonne", "mass"),
    # money
    "rs": ("Rs", "money"), "rs.": ("Rs", "money"),
    "inr": ("Rs", "money"), "\u20b9": ("Rs", "money"),
    "rupee": ("Rs", "money"), "rupees": ("Rs", "money"),
    "paisa": ("paise", "money"), "paise": ("paise", "money"),
    # percentage
    "%": ("%", "percentage"), "percent": ("%", "percentage"),
    "percentage": ("%", "percentage"), "per cent": ("%", "percentage"),
    # volume
    "l": ("L", "volume"), "litre": ("L", "volume"),
    "litres": ("L", "volume"), "liter": ("L", "volume"),
    "liters": ("L", "volume"),
    "ml": ("mL", "volume"), "millilitre": ("mL", "volume"),
    "millilitres": ("mL", "volume"), "milliliter": ("mL", "volume"),
    "milliliters": ("mL", "volume"),
    "m3": ("m3", "volume"), "m\u00b3": ("m3", "volume"),
    "cubic metre": ("m3", "volume"), "cubic metres": ("m3", "volume"),
    "cubic meter": ("m3", "volume"), "cubic meters": ("m3", "volume"),
    "cm3": ("cm3", "volume"), "cm\u00b3": ("cm3", "volume"),
    # area
    "m2": ("m2", "area"), "m\u00b2": ("m2", "area"),
    "cm2": ("cm2", "area"), "cm\u00b2": ("cm2", "area"),
    "km2": ("km2", "area"), "km\u00b2": ("km2", "area"),
    "sq m": ("m2", "area"), "sq km": ("km2", "area"),
    "sq cm": ("cm2", "area"),
    "square metre": ("m2", "area"), "square metres": ("m2", "area"),
    "square meter": ("m2", "area"), "square meters": ("m2", "area"),
    "square kilometre": ("km2", "area"),
    "square kilometres": ("km2", "area"),
    "square kilometer": ("km2", "area"),
    "square kilometers": ("km2", "area"),
    "square centimetre": ("cm2", "area"),
    "square centimetres": ("cm2", "area"),
    "hectare": ("hectare", "area"), "hectares": ("hectare", "area"),
    # temperature
    "\u00b0c": ("\u00b0C", "temperature"),
    "\u00b0f": ("\u00b0F", "temperature"),
    "celsius": ("\u00b0C", "temperature"),
    "fahrenheit": ("\u00b0F", "temperature"),
    "kelvin": ("K", "temperature"), "k": ("K", "temperature"),
    # mechanics / electricity
    "n": ("N", "force"), "newton": ("N", "force"),
    "newtons": ("N", "force"),
    "j": ("J", "energy"), "joule": ("J", "energy"),
    "joules": ("J", "energy"), "kj": ("kJ", "energy"),
    "kilojoule": ("kJ", "energy"), "kilojoules": ("kJ", "energy"),
    "kwh": ("kWh", "energy"), "ev": ("eV", "energy"),
    "w": ("W", "power"), "watt": ("W", "power"),
    "watts": ("W", "power"), "kw": ("kW", "power"),
    "kilowatt": ("kW", "power"), "kilowatts": ("kW", "power"),
    "hz": ("Hz", "frequency"), "hertz": ("Hz", "frequency"),
    "khz": ("kHz", "frequency"), "mhz": ("MHz", "frequency"),
    "pa": ("Pa", "pressure"), "pascal": ("Pa", "pressure"),
    "pascals": ("Pa", "pressure"), "kpa": ("kPa", "pressure"),
    "atm": ("atm", "pressure"), "bar": ("bar", "pressure"),
    "mol": ("mol", "amount"), "mole": ("mol", "amount"),
    "moles": ("mol", "amount"),
    # angles
    "degree": ("\u00b0", "angle"), "degrees": ("\u00b0", "angle"),
    "\u00b0": ("\u00b0", "angle"),
    "radian": ("rad", "angle"), "radians": ("rad", "angle"),
}

# scale/count words the model may tag as UNIT — kept verbatim, never
# multiplied (the input normalizer owns lakh/crore expansion)
_SCALE_UNITS = {"lakh": "lakh", "lakhs": "lakh", "crore": "crore",
                "crores": "crore", "dozen": "dozen", "dozens": "dozen"}

_CURRENCY_BEFORE_RE = re.compile(r"((?:\u20b9|rs\.?|inr)\s*)$", re.I)
_CURRENCY_AFTER_RE = re.compile(r"\s*(?:rupees?|paise)\b", re.I)
# one intervenor allowed between a VALUE and its UNIT: '24 square metres'
_SQUARE_GAP_RE = re.compile(r"^\s+(sq\.?|square|cu\.?|cubic)\s*$", re.I)
_UNIT_GAP_RE = re.compile(r"^\s{1,4}$")
# 'km per hour' / 'litres per minute' / 'Rs 40 per day' — the UNIT the
# model tags stops at the noun; the compound tail follows it
_PER_TIME_RE = re.compile(
    r"^\s*(?:/|per)\s*"
    r"(seconds?|secs?|s|min(?:ute)?s?|hours?|hrs?|h|days?|years?)\b",
    re.I)
_PER_CANON = {"s": "s", "sec": "s", "secs": "s", "second": "s",
              "seconds": "s", "min": "min", "mins": "min",
              "minute": "min", "minutes": "min", "h": "h", "hr": "h",
              "hrs": "h", "hour": "h", "hours": "h", "day": "day",
              "days": "day", "year": "year", "years": "year"}

# compound roles: length-per-time is a speed, volume-per-time a flow,
# money/dimensionless-per-time a rate (binder 'rate' family)
_COMPOUND_ROLE = {"length": "velocity", "volume": "flow_rate",
                  "money": "rate", "dimensionless": "rate"}

# --------------------------------------------------------------------------- #
# Deterministic glue for LABEL blind spots (documented honestly).
#
# The silver labels come from a number+unit regex that had NO currency
# rule and no spelled-out "percent": corpus audit (14,312 lines) shows
# 'Rs <amount>' occurs 66 times ALWAYS unlabeled (so the model learned
# to SKIP currency amounts), and 'percent' as a word occurs 0 times.
# The serving contract explicitly requires currency and percentage
# handling, so these two families get a deterministic scanner merged
# over the NER output (NER entities win on any overlap).  This is glue
# over a known label gap, not a second regex parser: no other unit
# family is covered this way — newtons / square metres / bare counts
# remain honest misses owned by the regex fallback downstream.
# --------------------------------------------------------------------------- #

_CURRENCY_AMT_RE = re.compile(
    r"(?<![A-Za-z])(?:\u20b9|Rs\.?|INR)\s{0,2}\d[\d,]*(?:\.\d+)?", re.I)
_CURRENCY_AMT_VAL_RE = re.compile(r"[\d,]+(?:\.\d+)?\s*$")
_RUPEES_WORD_RE = re.compile(
    r"(?<![A-Za-z\d])(\d[\d,]*(?:\.\d+)?)\s*(?:rupees?|paise)\b", re.I)
_PERCENT_WORD_RE = re.compile(
    r"(?<![\d.A-Za-z])(\d+(?:\.\d+)?)\s+"
    r"(?:percent(?:age)?|per\s+cent)\b", re.I)


def _glue_values(text: str, ner_spans: List[Any]) -> List[Dict[str, Any]]:
    """Currency + spelled-percent values for spans the silver labels
    never covered.  Returns value dicts in entity format; any span that
    overlaps an NER entity is dropped (the model's word wins)."""
    out: List[Dict[str, Any]] = []
    specs = []
    for m in _CURRENCY_AMT_RE.finditer(text):
        vm = _CURRENCY_AMT_VAL_RE.search(m.group(0))
        if vm:
            specs.append((m.start(), m.end(), vm.group(0), "Rs", "money"))
    for m in _RUPEES_WORD_RE.finditer(text):
        specs.append((m.start(), m.end(), m.group(1), "Rs", "money"))
    for m in _PERCENT_WORD_RE.finditer(text):
        specs.append((m.start(), m.end(), m.group(1), "%", "percentage"))
    for gs, ge, val_txt, unit, role in specs:
        if any(gs < e and s < ge for s, e, _l in ner_spans):
            continue                      # NER already owns this span
        if any(gs < oe and os_ < ge for os_, oe in
               [(v["_start"], v["_end"]) for v in out]):
            continue                      # another glue rule owns it
        val = _parse_value_text(val_txt)
        if val is None:
            continue
        out.append({"value": float(val), "unit": unit, "role": role,
                    "raw": text[gs:ge].strip(),
                    "_start": gs, "_end": ge})
    return out


def _parse_value_text(raw: str) -> Optional[float]:
    """VALUE span text -> float.  Handles Indian comma groups
    ('1,20,000'), US groups ('15,000'), decimals, and a currency glyph
    glued to the digits."""
    s = raw.strip().replace("\u20b9", "").replace("\u2009", " ").strip()
    if not s:
        return None
    if re.fullmatch(r"\d{1,3}(?:,\d{2,3})+(?:\.\d+)?", s):
        s = s.replace(",", "")          # grouped number, not a list
    try:
        v = float(s)
    except ValueError:
        return None
    if v != v or v in (float("inf"), float("-inf")):  # NaN / inf guard
        return None
    return v


def _pair_units(text: str, ents: List[Any]) -> List[Dict[str, Any]]:
    """Pair VALUE/PERCENT/BASE entities with their UNIT entities and
    derive canonical (unit, role) for each."""
    out: List[Dict[str, Any]] = []
    last_end = -1
    for i, (s, e, lab, _txt) in enumerate(ents):
        if lab not in ("VALUE", "PERCENT", "BASE"):
            continue
        if s < last_end:            # overlaps the previous emitted span
            continue
        val = _parse_value_text(_txt if lab == "VALUE" else
                                text[s:e])
        if val is None:
            continue
        last_end = e

        unit_canon, role = "", "dimensionless"
        raw_span = text[s:e]
        unit_idx = None

        if lab == "PERCENT":
            unit_canon, role = "%", "percentage"
        elif lab == "BASE":
            unit_canon, role = "", "base"
        else:
            # find the first UNIT entity at/after the value end with a
            # legal gap (plain whitespace, or one square/cubic word)
            for j in range(i + 1, len(ents)):
                us, ue, ulab, utxt = ents[j]
                if us < e:
                    continue          # overlaps the value span
                if ulab != "UNIT":
                    break             # first following entity: not a unit
                gap = text[e:us]
                if gap == "" or _UNIT_GAP_RE.match(gap) \
                        or _SQUARE_GAP_RE.match(gap):
                    unit_idx = j
                break

            if unit_idx is not None:
                us, ue, _ulab, utxt = ents[unit_idx]
                ul = re.sub(r"\s+", " ", utxt.strip().lower())
                gap_m = _SQUARE_GAP_RE.match(text[e:us])
                if ul in _UNIT_MAP:
                    unit_canon, role = _UNIT_MAP[ul]
                elif ul in _SCALE_UNITS:
                    unit_canon = _SCALE_UNITS[ul]
                else:
                    unit_canon = ul
                if gap_m is not None and role == "length":
                    # '24 square metres' -> area; '4 cubic metres' -> volume
                    if gap_m.group(1).lower().startswith(("sq", "square")):
                        unit_canon, role = "m2", "area"
                    else:
                        unit_canon, role = "m3", "volume"
                raw_span = text[s:ue]

            # currency adjacency: 'Rs 1,20,000' / '₹50' — the model was
            # never taught currency glyphs, so glue them deterministically
            if role == "dimensionless" or unit_canon in ("lakh", "crore",
                                                         "dozen"):
                cm = _CURRENCY_BEFORE_RE.search(text[max(0, s - 6):s])
                am = _CURRENCY_AFTER_RE.match(text[e:])
                if cm is not None:
                    unit_canon, role = "Rs", "money"
                    span_start = s - len(cm.group(1))
                    raw_span = text[span_start:
                                    ents[unit_idx][1] if unit_idx is not None
                                    else e]
                elif am is not None:
                    unit_canon, role = "Rs", "money"
                    raw_span = text[s:e + am.end()]

            # per-time compounds: '17 km per hour' -> velocity,
            # '15 litres per minute' -> flow_rate
            tail_start = ents[unit_idx][1] if unit_idx is not None else e
            pm = _PER_TIME_RE.match(text[tail_start:])
            if pm is not None and role not in ("percentage", "base"):
                per = _PER_CANON[pm.group(1).lower()]
                new_role = _COMPOUND_ROLE.get(role)
                if new_role:
                    role = new_role
                    if unit_canon and role in ("velocity", "flow_rate"):
                        unit_canon = f"{unit_canon}/{per}"
                    elif role == "rate":
                        unit_canon = f"Rs/{per}" if unit_canon == "Rs" \
                            else f"per {per}"
                    end = tail_start + pm.end()
                    raw_span = text[s:end]
        out.append({"value": float(val), "unit": unit_canon,
                    "role": role, "raw": raw_span.strip(),
                    "_start": s,
                    "_end": ents[unit_idx][1] if unit_idx is not None
                    else e})
    return out


def _structure_hint(text: str, ents: List[Any]) -> Optional[str]:
    """'X% of Y' frame -> 'percent_of' (the one structural frame the
    model's PERCENT/BASE labels encode)."""
    pcts = [x for x in ents if x[2] == "PERCENT"]
    bases = [x for x in ents if x[2] == "BASE"]
    for ps, pe, _l, _t in pcts:
        for bs, be, _l2, _t2 in bases:
            if ps < bs and re.fullmatch(r"\s*(?:of\s*)?", text[pe:bs]):
                return "percent_of"
    return None


def extract(text: str) -> Dict[str, Any]:
    """NER-first quantity extraction (the Phase 3.3 public contract).

    Never raises: model/inference problems return the ner_unavailable
    sentinel and the caller's regex path stays authoritative."""
    if not isinstance(text, str) or not text.strip():
        return {"values": [], "structure_hint": None, "source": "ner"}
    try:
        nlp = _load_model()
        if nlp is None:
            return _unavailable()
        doc = nlp(text[:_MAX_TEXT_CHARS])
        ents = [(en.start_char, en.end_char, en.label_, en.text)
                for en in doc.ents]
        ents.sort(key=lambda t: (t[0], -t[1]))
        tcut = text[:_MAX_TEXT_CHARS]
        values = _pair_units(tcut, ents)
        values.extend(_glue_values(
            tcut, [(s, e, l) for s, e, l, _t in ents]))
        values.sort(key=lambda v: v["_start"])
        for v in values:
            v.pop("_start", None)
            v.pop("_end", None)
        return {"values": values,
                "structure_hint": _structure_hint(tcut, ents),
                "source": "ner"}
    except Exception:
        # a one-off inference error must not kill the stage for the
        # process — but a persistently broken install must not pay the
        # exception cost per question either: degrade permanently only
        # after repeated failures
        global _infer_failures, _model_failed
        _infer_failures += 1
        if _infer_failures == 1:
            _log.warning("variable_extractor: inference failed; "
                         "degrading to ner_unavailable", exc_info=True)
        if _infer_failures >= 3:
            _model_failed = True
        return _unavailable()
