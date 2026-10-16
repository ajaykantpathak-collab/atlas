"""chemistry_reader.py -- Lane B chemistry pack.

Two layers:

1. Dilution chains (grounded on real bank items, CFQ chemistry,
   2026-09 sample):

    "A student has 0.01 L of 10^-2 mol/dm3 sulphuric acid solution.
     Reduce its concentration to 2 x 10^-4 mol dm-3 by adding water.
     What should be the volume of the water added?"  -> 490 ml

   Constructor: DILUTION (moles conserved): M1 V1 = M2 V2 ;
                V_water = V2 - V1.

2. Numerical chemistry pack (reader2): molality, molarity from mass
   and volume, mass percent, mole fraction, ideal-gas volume, osmotic
   pressure, Raoult relative lowering of vapour pressure.  Every slot
   must be stated in the text (grounded); out-of-range or ambiguous
   slots refuse (see the pack contract below the dilution reader).

All slots must be stated in the text (grounded); scientific notation
(10^-2, 2 x 10-4), units (L, ml, dm-3) and the subtraction step are
part of the constructor.  Executes via the safe evaluator with the
chain shown; refuses honestly when notation is ambiguous.
"""

from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.answer_pipeline import (
    AuditTrail, GUIDED, PipelineResult, VERIFIED)


def _no(reason: str, audit: AuditTrail) -> PipelineResult:
    return PipelineResult(label=GUIDED, answer=None, numeric=None,
                          steps=[], audit=audit, refusal_reason=reason)


# 10^-2 | 10-2 | 2 x 10-4 | 2 x 10^-4 | 0.01
_SCI = r"(\d+(?:\.\d+)?)\s*(?:x\s*|\*)?\s*10\s*(?:\^|-\s*)?\(?(-?\d+)\)?"


def _sci_value(m: "re.Match") -> float:
    mant = float(m.group(1))
    exp = int(m.group(2))
    return mant * (10.0 ** exp)


_VOLUME = (r"(?P<val>\d+(?:\.\d+)?)\s*"
           r"(?P<unit>l|litre|liters?|litres?|ml|millilit?res?)\b")
_CONC = re.compile(
    r"(\d+(?:\.\d+)?)\s*x\s*10\s*(?:\^|-\s*)?\(?(-?\d+)\)?\s*"
    r"(?:mol\s*/?\s*dm\s*-?3|mol/dm3|mol\s+dm-3|m)\b|"
    r"(\d+(?:\.\d+)?)\s*(?:mol\s*/?\s*dm\s*-?3|mol/dm3)\b|"
    r"10\s*(?:\^|-\s*)?\(?(-?\d+)\)?\s*(?:mol\s*/?\s*dm\s*-?3|mol/dm3)\b",
    re.I)


def _exp(tok) -> int:
    """Exponent string may carry OCR spaces: '- 4' -> -4."""
    return int(str(tok).replace(' ', ''))


def _parse_conc(text: str, ordinal: int) -> Optional[float]:
    """Ordinal-th concentration mention in scientific/plain notation,
    in TEXT ORDER (one combined scan -- separate patterns broke the
    initial/target ordering on real bank items)."""
    found: List[float] = []
    combined = re.compile(
        r"(\d+(?:\.\d+)?)\s*(?:x\s*|\*)\s*10\s*\^?\s*(-?\s*\d+)"
        r"|(?<![\dx*])10\s*\^?\s*(-?\s*\d+)", re.I)
    for m in combined.finditer(text):
        if m.group(1) is not None:
            found.append(float(m.group(1)) * 10.0 ** int(m.group(2).replace(chr(32), chr(0)).replace(chr(0), "")))
        elif m.group(3) is not None:
            found.append(10.0 ** int(m.group(3).replace(chr(32), chr(0)).replace(chr(0), "")))
    for m in re.finditer(
            r"(?<![\d.])(\d+\.\d+|\d+)\s*(?:mol\s*/?\s*dm|mol/dm)", text,
            re.I):
        found.append(float(m.group(1)))
    if ordinal - 1 < len(found):
        return found[ordinal - 1]
    return None


def _parse_volume(text: str, ordinal: int) -> Optional[Tuple[float, str]]:
    vols: List[Tuple[float, str]] = []
    for m in re.finditer(_VOLUME, text, re.I):
        val = float(m.group("val"))
        unit = m.group("unit").lower()
        litres = val / 1000.0 if unit.startswith("m") else val
        vols.append((litres, unit))
    if ordinal - 1 < len(vols):
        return vols[ordinal - 1]
    return None


def _read_dilution(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    """Dilution chain.  Returns None when the text is not a recognised
    dilution chain (caller tries the other chemistry families)."""
    low = text.lower()
    if not re.search(r"solution|acid|concentration", low):
        return None
    if not re.search(r"adding\s+water|dilut|reduce\s+its\s+concentration|"
                     r"dilut\w+\s+to", low):
        return None
    # percent-strength dilution ("10% solution diluted to 5%") belongs
    # to competency_reader2's reverse-mixture constructor, not the molar
    # chain: bail (None, not a refusal) so Lane B tries the next reader
    if re.search(r"\d+(?:\.\d+)?\s*%", low):
        return None

    # first concentration mention = initial, second = target
    c1 = _parse_conc(text, 1)
    c2 = _parse_conc(text, 2)
    # first volume mention = initial solution volume
    v1m = _parse_volume(text, 1)
    if c1 is None or c2 is None or v1m is None or c2 >= c1:
        return _no("dilution chain needs initial volume, initial "
                   "concentration, and a lower target concentration",
                   audit)
    v1, v1_unit = v1m
    v2 = v1 * c1 / c2
    v_water = v2 - v1
    ml = v_water * 1000.0
    audit.route.append("event_chain:dilution")
    audit.route.append("structure:DILUTION")   # WS-PAL: name the route
    audit.gates_passed.append("moles_conserved")
    audit.readings_considered = 1
    audit.assumptions.append(
        "dilution assumes moles conserved (M1 V1 = M2 V2)")
    steps = [
        f"Moles conserved: M1 V1 = M2 V2",
        f"V2 = {v1:g} x {c1:g} / {c2:g} = {v2:.4g} L",
        f"Water added = V2 - V1 = {v2:.4g} - {v1:g} = {v_water:.4g} L "
        f"= {ml:.4g} ml",
    ]
    return PipelineResult(
        label=VERIFIED, answer=f"{v_water:.4g} L ({ml:.4g} ml)",
        numeric=v_water, steps=steps, audit=audit)


# ===========================================================================
# Numerical chemistry pack: molality, molarity from mass + volume, mass
# percent, mole fraction, ideal-gas volume, osmotic pressure, and the
# Raoult relative lowering of vapour pressure.
#
# Zero-wrong-answer contract for every family below:
#   - the family triggers ONLY on its explicit chemistry term
#     ("molality", "osmotic pressure", ...), never on bare numbers;
#   - EVERY slot is parsed from the text; a missing, duplicated or
#     ambiguous slot refuses (return None -- the pipeline then tries
#     the other lanes and degrades honestly to guided);
#   - numeric guards reject parse slips: molar mass 1-500 g/mol,
#     temperature 0-2000 K, molality <= 100, molarity <= 100,
#     mass percent in (0, 100], mole fraction in (0, 1), pressures
#     1e-4 to 1000 atm, computed volumes <= 1e6 L;
#   - no default data, with two universal-constant exceptions only:
#     R matched to the pressure unit (0.0821 L atm / 0.08314 L bar /
#     8.314 L kPa = J per mol K) and T(K) = T(C) + 273.15;
#   - numbers that are tails of OCR scientific-notation tokens
#     ("10-2 g") are rejected, so exponents can never read as masses;
#   - one deliberate exception to plain None: a mole-fraction ask that
#     names a component absent from the data returns an explicit GUIDED
#     refusal -- it must BLOCK the registry's name-blind mole-fraction
#     family from shipping the first component's share as the answer.
# ===========================================================================

_NUMD = r"\d+(?:\.\d+)?"

_MASS_RE = re.compile(
    r"(?P<val>" + _NUMD + r")\s*"
    r"(?P<unit>kg|kilograms?|kilogrammes?|g|grams?|grammes?)\b", re.I)

_VOL_RE = re.compile(
    r"(?P<val>" + _NUMD + r")\s*"
    r"(?P<unit>ml|millilitres?|milliliters?|cc|cm\s*\^?\s*3|"
    r"dm\s*-?\s*3|litres?|liters?|l)\b", re.I)

_MOL_RE = re.compile(
    r"(?P<val>" + _NUMD + r")\s*(?:moles?|mols?|mol)\b"
    r"(?:\s+of\s+(?:(?:the|an|a)\s+)?(?P<comp>[A-Za-z][A-Za-z0-9]{0,15}))?",
    re.I)

_MOLAR_RE = re.compile(
    r"(?:molar|molecular)\s+mass(?:\s+of\s+(?:the\s+)?[A-Za-z][\w-]*"
    r"(?:\s+[A-Za-z][\w-]*){0,3})?\s*(?:is|are|of|:)?\s*(?P<val>"
    + _NUMD + r")\b|\(\s*M\s*(?:=)?\s*(?P<val2>" + _NUMD + r")\s*\)", re.I)

_TEMP_RE = re.compile(
    r"(?P<val>" + _NUMD + r")\s*"
    r"(?P<unit>kelvins?\b|k\b|degrees?\s+(?:celsius\b|centigrade\b|c\b)|"
    r"deg\s+(?:celsius\b|centigrade\b|c\b)|celsius\b|centigrade\b|"
    r"\u00b0\s*c\b|c\b)", re.I)

_PRESS_RE = re.compile(
    r"(?P<val>" + _NUMD + r")\s*"
    r"(?P<unit>atmospheres?\b|atm\b|bars?\b|kilopascals?\b|kpa\b|"
    r"pascals?\b|pa\b)", re.I)

# vapour-pressure scans also accept mm Hg / torr (ratio-only use)
_VP_RE = re.compile(
    r"(?P<val>" + _NUMD + r")\s*"
    r"(?P<unit>mm\s*(?:of\s+)?hgs?\b|mmhg\b|torr\b|atmospheres?\b|atm\b|"
    r"bars?\b|kilopascals?\b|kpa\b|pascals?\b|pa\b)", re.I)

_SOLVENT_TAIL = re.compile(
    r"\s+(?:(?:of|in|with|into)\s+(?:the\s+)?)?"
    r"(?:water|solvent|benzene|toluene|ether|acetone|ethanol|cyclohexane|"
    r"chloroform|kerosene|cs2)\b", re.I)

_SOLUTION_TAIL = re.compile(r"\s+(?:of\s+(?:the\s+)?)?solution\b", re.I)

_GAS_R = {"atm": 0.0821, "bar": 0.08314, "kPa": 8.314, "Pa": 8.314}
_TO_ATM = {"atm": 1.0, "bar": 1.0 / 1.01325,
           "kPa": 1.0 / 101.325, "Pa": 1.0 / 101325.0}


def _sci_tail(text: str, start: int) -> bool:
    """True when a number starts as the exponent/mantissa tail of an OCR
    scientific-notation token: in '10-2 g' the '2 g' must never read as
    a 2-gram mass.  Rejects when the character before the number (over
    whitespace) is a digit, '-', '^' or a multiplication sign."""
    i = start - 1
    while i >= 0 and text[i] in " \t\n":
        i -= 1
    return i >= 0 and (text[i].isdigit() or text[i] in "-^x*X*/")


def _collect(pattern: "re.Pattern", text: str) -> List["re.Match"]:
    """All non-sci-tail matches of a compiled quantity pattern (the
    module patterns already carry re.I), in text order."""
    return [m for m in pattern.finditer(text)
            if not _sci_tail(text, m.start())]


def _grams(m: "re.Match") -> float:
    v = float(m.group("val"))
    return v * 1000.0 if m.group("unit").lower().startswith("k") else v


def _litres(m: "re.Match") -> float:
    t = m.group("unit").lower().replace(" ", "")
    v = float(m.group("val"))
    if t.startswith("m") or t == "cc" or t.startswith("cm"):
        return v / 1000.0
    return v                      # l / litre / liter / dm3 forms


def _molar_value(m: "re.Match") -> float:
    return float(m.group("val") or m.group("val2"))


def _kelvin(m: "re.Match") -> Optional[float]:
    u = m.group("unit").lower()
    v = float(m.group("val"))
    if u.startswith("k"):
        return v
    if "c" in u:
        return v + 273.15
    return None


def _press_unit(m: "re.Match") -> str:
    u = m.group("unit").lower()
    if u.startswith("atm"):
        return "atm"
    if u.startswith("bar"):
        return "bar"
    if u.startswith("k"):
        return "kPa"
    return "Pa"


def _vp_unit(m: "re.Match") -> str:
    t = m.group("unit").lower().replace(" ", "").replace("of", "")
    if t.startswith("mm"):
        return "mmHg"
    if t == "torr":
        return "torr"
    if t.startswith("atm"):
        return "atm"
    if t.startswith("bar"):
        return "bar"
    if t.startswith("k"):
        return "kPa"
    return "Pa"


def _ok(tag: str, answer_str: str, numeric: float, steps: List[str],
        audit: AuditTrail) -> PipelineResult:
    audit.route.append("event_chain:" + tag)
    # WS-PAL (ovh-pal): the badge gate resolves verifiers only via a
    # 'structure:' entry -- 'event_chain:<tag>' names the event chain
    # for telemetry but never reaches VERIFIERS, so every reader answer
    # died as verifier_no_route under the strict contract.
    audit.route.append("structure:" + tag.upper())
    audit.gates_passed.append("slots_grounded_range_guards")
    audit.readings_considered = 1
    return PipelineResult(label=VERIFIED, answer=answer_str,
                          numeric=numeric, steps=steps, audit=audit)


def _read_molality(text: str, audit: AuditTrail
                   ) -> Optional[PipelineResult]:
    """molality = (mass / molar mass) / kg of solvent."""
    if not re.search(r"\bmolal(?:ity)?\b", text, re.I):
        return None
    masses = _collect(_MASS_RE, text)
    solv = [m for m in masses
            if _SOLVENT_TAIL.match(text[m.end():m.end() + 40])]
    if len(solv) != 1:
        return None
    others = [m for m in masses if m is not solv[0]]
    if len(others) != 1:
        return None
    molar_ms = _collect(_MOLAR_RE, text)
    if len(molar_ms) != 1:
        return None
    mass_g, solv_g, molar = (_grams(others[0]), _grams(solv[0]),
                             _molar_value(molar_ms[0]))
    if not (0 < mass_g <= 1e5 and 0 < solv_g <= 1e5):
        return None
    if not (1.0 <= molar <= 500.0):
        return None
    mol_kg = solv_g / 1000.0
    moles = mass_g / molar
    molal = moles / mol_kg
    if not (0 < molal <= 100.0):
        return None
    steps = [
        f"moles of solute = {mass_g:g} g / {molar:g} g mol^-1 = "
        f"{moles:.6g} mol",
        f"solvent = {solv_g:g} g = {mol_kg:g} kg",
        f"molality = {moles:.6g} mol / {mol_kg:g} kg = {molal:.4g} mol/kg",
    ]
    return _ok("molality", f"{molal:.4g} mol/kg", molal, steps, audit)


def _read_molarity(text: str, audit: AuditTrail
                   ) -> Optional[PipelineResult]:
    """molarity = (mass / molar mass) / litres of solution."""
    if not re.search(r"\bmolarity\b|\bmolar\s+concentration\b", text, re.I):
        return None
    masses = _collect(_MASS_RE, text)
    if len(masses) != 1:
        return None
    vols = _collect(_VOL_RE, text)
    if len(vols) != 1:
        return None
    molar_ms = _collect(_MOLAR_RE, text)
    if len(molar_ms) != 1:
        return None
    mass_g, vol_l, molar = (_grams(masses[0]), _litres(vols[0]),
                            _molar_value(molar_ms[0]))
    if not (0 < mass_g <= 1e5) or not (0 < vol_l <= 100.0):
        return None
    if not (1.0 <= molar <= 500.0):
        return None
    moles = mass_g / molar
    molarity = moles / vol_l
    if not (0 < molarity <= 100.0):
        return None
    audit.assumptions.append(
        "stated volume taken as the solution volume")
    steps = [
        f"moles of solute = {mass_g:g} g / {molar:g} g mol^-1 = "
        f"{moles:.6g} mol",
        f"volume of solution = {vol_l:g} L",
        f"molarity = {moles:.6g} mol / {vol_l:g} L = {molarity:.4g} mol/L",
    ]
    return _ok("molarity", f"{molarity:.4g} mol/L", molarity, steps, audit)


def _read_mass_percent(text: str, audit: AuditTrail
                       ) -> Optional[PipelineResult]:
    """mass percent = 100 x solute / (solution mass, or solute + solvent)."""
    if not re.search(r"mass\s+percent(?:age)?|percent(?:age)?\s+by\s+mass"
                     r"|%|w\s*/\s*w", text, re.I):
        return None
    masses = _collect(_MASS_RE, text)
    if len(masses) != 2:
        return None
    soln = [m for m in masses
            if _SOLUTION_TAIL.match(text[m.end():m.end() + 40])]
    solv = [m for m in masses
            if _SOLVENT_TAIL.match(text[m.end():m.end() + 40])]
    if soln and solv:
        return None              # both readings present: ambiguous
    if soln:
        solute, total_g = next(m for m in masses if m is not soln[0]), \
            _grams(soln[0])
    elif solv:
        solute = next(m for m in masses if m is not solv[0])
        total_g = _grams(solute) + _grams(solv[0])
    else:
        return None              # no stated denominator reading
    s_g = _grams(solute)
    if not (0 < s_g <= 1e5) or not (0 < total_g <= 1e6):
        return None
    pct = s_g / total_g * 100.0
    if not (0 < pct <= 100.0):
        return None
    base = (f"solution mass {total_g:g} g" if soln else
            f"{s_g:g} g solute + {_grams(solv[0]):g} g solvent = "
            f"{total_g:g} g")
    steps = [
        f"mass percent = (mass of solute / total mass) x 100",
        f"total = {base}",
        f"mass percent = ({s_g:g} / {total_g:g}) x 100 = {pct:.4g}%",
    ]
    return _ok("mass_percent", f"{pct:.4g}% by mass", pct, steps, audit)


def _read_mole_fraction(text: str, audit: AuditTrail
                        ) -> Optional[PipelineResult]:
    """mole fraction = n_ask / (n1 + n2); the ask MUST name a parsed
    component (guards against shipping the wrong component's share)."""
    if not re.search(r"mole\s+fraction", text, re.I):
        return None
    named = [m for m in _collect(_MOL_RE, text) if m.group("comp")]
    if len(named) != 2:
        return None
    ask = re.search(r"mole\s+fractions?\s+of\s+(?:(?:the|an|a)\s+)?"
                    r"(?P<name>[A-Za-z][A-Za-z0-9]{0,15})", text, re.I)
    if ask is None:
        return None
    n1 = float(named[0].group("val"))
    n2 = float(named[1].group("val"))
    if not (0 < n1 <= 1e6 and 0 < n2 <= 1e6):
        return None
    c1 = named[0].group("comp").lower()
    c2 = named[1].group("comp").lower()
    name = ask.group("name").lower()
    if name == c1:
        num = n1
    elif name == c2:
        num = n2
    else:
        # explicit refusal: block the registry's name-blind family from
        # answering a third component with the first component's share
        return _no("mole fraction is asked for '" + ask.group("name") +
                   "', which is not one of the stated components "
                   f"('{c1}', '{c2}')", audit)
    x = num / (n1 + n2)
    if not (0 < x < 1.0):
        return None
    steps = [
        f"x({ask.group('name')}) = n / (n1 + n2) = "
        f"{num:g} / ({n1:g} + {n2:g}) = {x:.6g}",
    ]
    return _ok("mole_fraction", f"{x:.4g}", x, steps, audit)


def _read_osmotic(text: str, audit: AuditTrail
                  ) -> Optional[PipelineResult]:
    """osmotic pressure pi = (mass / M) R T / V, R per unit reported."""
    if not re.search(r"osmotic\s+pressure", text, re.I):
        return None
    masses = _collect(_MASS_RE, text)
    if len(masses) != 1:
        return None
    vols = _collect(_VOL_RE, text)
    if len(vols) != 1:
        return None
    molar_ms = _collect(_MOLAR_RE, text)
    if len(molar_ms) != 1:
        return None
    temps = _collect(_TEMP_RE, text)
    if len(temps) != 1:
        return None
    mass_g = _grams(masses[0])
    vol_l = _litres(vols[0])
    molar = _molar_value(molar_ms[0])
    t_k = _kelvin(temps[0])
    if t_k is None or not (0 < t_k <= 2000.0):
        return None
    if not (0 < mass_g <= 1e5) or not (0 < vol_l <= 100.0):
        return None
    if not (1.0 <= molar <= 500.0):
        return None
    n = mass_g / molar
    pi_atm = n * 0.0821 * t_k / vol_l
    pi_kpa = n * 8.314 * t_k / vol_l
    if not (0 < pi_atm <= 1000.0):
        return None
    audit.assumptions.append(
        "stated volume taken as the solution volume")
    audit.assumptions.append(
        "R taken as 0.0821 L atm / (mol K) and 8.314 L kPa / (mol K); "
        "universal constants")
    steps = [
        f"moles of solute = {mass_g:g} g / {molar:g} g mol^-1 = "
        f"{n:.6g} mol",
        f"pi = nRT/V = {n:.6g} x 0.0821 x {t_k:g} / {vol_l:g} = "
        f"{pi_atm:.4g} atm",
        f"same chain with R = 8.314: {pi_kpa:.4g} kPa",
    ]
    return _ok("osmotic_pressure",
               f"{pi_atm:.4g} atm ({pi_kpa:.4g} kPa)", pi_atm, steps, audit)


def _read_ideal_gas(text: str, audit: AuditTrail
                    ) -> Optional[PipelineResult]:
    """V = nRT/P with R matched to the stated pressure unit."""
    low = text.lower()
    if not re.search(r"\bgas(?:es)?\b", low):
        return None
    if not re.search(r"volume|occup", low):
        return None
    if re.search(r"\bstp\b|\bntp\b", low):
        return None          # STP mole-concept questions: registry's family
    mols = _collect(_MOL_RE, text)
    if len(mols) != 1:
        return None
    temps = _collect(_TEMP_RE, text)
    if len(temps) != 1:
        return None
    press = _collect(_PRESS_RE, text)
    if len(press) != 1:
        return None
    n = float(mols[0].group("val"))
    t_k = _kelvin(temps[0])
    p_unit = _press_unit(press[0])
    p_val = float(press[0].group("val"))
    if t_k is None or not (0 < t_k <= 2000.0):
        return None
    if not (0 < n <= 1000.0):
        return None
    p_atm = p_val * _TO_ATM[p_unit]
    if not (1e-4 <= p_atm <= 1000.0):
        return None
    r = _GAS_R[p_unit]
    v = n * r * t_k / p_val
    if not (0 < v <= 1e6):
        return None
    audit.assumptions.append(
        f"R = {r:g} taken for the {p_unit} pressure unit; universal "
        "constant")
    unit_txt = "m^3 Pa mol^-1 K^-1" if p_unit == "Pa" \
        else f"L {p_unit} mol^-1 K^-1"
    out_unit = "m^3" if p_unit == "Pa" else "L"
    ans = (f"{v:.4g} m^3 ({v * 1000.0:.4g} L)" if p_unit == "Pa"
           else f"{v:.4g} L")
    steps = [
        f"V = nRT/P with R = {r:g} {unit_txt}",
        f"V = {n:g} x {r:g} x {t_k:g} / {p_val:g} = {v:.6g} {out_unit}",
    ]
    return _ok("ideal_gas_volume", ans, v, steps, audit)


def _read_ralvp(text: str, audit: AuditTrail
                ) -> Optional[PipelineResult]:
    """Raoult relative lowering: (p_pure - p_solution)/p_pure, only when
    both pressures (or the lowering ratio itself) are stated in the
    text in one common unit; x(solute) = relative lowering."""
    low = text.lower()
    has_lowering = bool(re.search(
        r"relative\s+lowering|lowering\s+of\s+va?p(?:our|or)\s+pressure",
        low))
    has_vp_and_ask = (re.search(r"va?p(?:our|or)\s+pressure", low)
                      and re.search(r"mole\s+fraction", low))
    if not (has_lowering or has_vp_and_ask):
        return None
    press = _collect(_VP_RE, text)
    ratio = None
    rm = re.search(r"lowering\s+of\s+va?p(?:our|or)\s+pressure\b"
                   r".{0,60}?(?:is|=|:)\s*(" + _NUMD + r")\b", text, re.I)
    if rm is None:
        rm = re.search(r"relative\s+lowering\b.{0,60}?(?:is|=|:)\s*("
                       + _NUMD + r")\b", text, re.I)
    if rm is not None:
        ratio = float(rm.group(1))
    if len(press) == 2 and ratio is None:
        if _vp_unit(press[0]) != _vp_unit(press[1]):
            return None      # mixed units: refuse, never convert
        def _before(m, text=text):
            return text[max(0, m.start() - 60):m.start()].lower()
        pure_tags = [m for m in press if re.search(r"pure", _before(m))]
        sol_tags = [m for m in press
                    if re.search(r"solution", _before(m))]
        if len(pure_tags) == 1:
            pure = pure_tags[0]
        elif len(sol_tags) == 1:
            pure = next(m for m in press if m is not sol_tags[0])
        else:
            return None      # cannot tell which pressure is the pure one
        other = next(m for m in press if m is not pure)
        p_pure = float(pure.group("val"))
        p_sol = float(other.group("val"))
        if not (0 < p_sol < p_pure):
            return None      # a solution never vapourises above its solvent
        rlvp = (p_pure - p_sol) / p_pure
        if not (0 < rlvp < 1.0):
            return None
        steps = [
            "relative lowering = (p_pure - p_solution) / p_pure",
            f"= ({p_pure:g} - {p_sol:g}) / {p_pure:g} = {rlvp:.6g}",
            f"Raoult's law: mole fraction of solute = relative lowering "
            f"= {rlvp:.6g}",
        ]
        return _ok("relative_lowering_vp",
                   f"relative lowering = {rlvp:.4g} (mole fraction of "
                   f"solute = {rlvp:.4g})", rlvp, steps, audit)
    if len(press) == 1 and ratio is not None:
        if not (0 < ratio < 1.0):
            return None
        steps = [
            "Raoult's law (dilute solution): relative lowering of "
            "vapour pressure = mole fraction of solute",
            f"x(solute) = {ratio:g}",
        ]
        return _ok("relative_lowering_vp",
                   f"mole fraction of solute = {ratio:.4g}", ratio,
                   steps, audit)
    return None


_CHEMISTRY_PACK = (_read_molality, _read_molarity, _read_mass_percent,
                   _read_mole_fraction, _read_osmotic, _read_ideal_gas,
                   _read_ralvp)


def read_chemistry(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    """Chemistry Lane B: the dilution chain first, then the numerical
    chemistry pack.  Returns None when no family matches (the caller
    tries other lanes); a family that recognises the question but
    cannot ground it refuses honestly instead of guessing."""
    dilution = _read_dilution(text, audit)
    if dilution is not None:
        return dilution
    for reader in _CHEMISTRY_PACK:
        result = reader(text, audit)
        if result is not None:
            return result
    return None
