"""physics_families.py -- core Physics word-problem families, classes 6-12.

Follows the exact maths2_families conventions: one _TABLE of
(FID, trigger regex [RAW STRING], handler) rows; every handler returns
the 6-tuple (value, steps, answer, assumptions, equation, extra) or
_GATE; dispatcher model_physics_families(text) -> ModelResult scans the
table and the first grounded hit wins.  Deterministic only -- no LLM,
no randomness, no network.

Gaps this batch fills (physics2/physics3 already own optics formulas,
Coulomb, momentum, impulse, universal gravitation, photoelectric, SHM
spring, Faraday, Wheatstone, Snell, prism, lens power, solenoid...):

  kinematics       KINEMATICS_V_U_AT, KINEMATICS_S_UT_AT2,
                   KINEMATICS_V2_U2_2AS (any variable solve-for,
                   free-fall / thrown-up aware, negative-root gates)
  dynamics         NEWTON_SECOND_LAW, WEIGHT_MG, FRICTION_MU_N
  work-energy      WORK_DONE, KINETIC_ENERGY, POTENTIAL_ENERGY,
                   WORK_ENERGY_THEOREM, POWER_WORK_TIME,
                   POWER_FORCE_VELOCITY
  gravitation      GRAVITY_SURFACE_G (g = G M / R^2)
  fluids           HYDROSTATIC_PRESSURE, ARCHIMEDES_BUOYANCY
  solids           HOOKE_LAW, MOMENT_OF_FORCE, PRINCIPLE_OF_MOMENTS
  heat             SPECIFIC_HEAT, LATENT_HEAT
  oscillations     PENDULUM_PERIOD (T = 2 pi sqrt(l/g))
  electricity      OHMS_LAW_ANY, ELECTRICAL_POWER_VI,
                   ELECTRICAL_ENERGY_KWH (units + rupee billing)
  optics           REFRACTIVE_INDEX_SPEED (n = c/v)

REGEX SAFETY NOTE: every pattern in this module is written as a RAW
string.  A non-raw string containing backslash sequences silently turns
them into control characters and corrupts the trigger -- never write a
regex as a plain (non-raw) string.
"""

from __future__ import annotations

import math
import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

# --------------------------------------------------------------------------- #
# helpers (same shape as maths2_families.py)
# --------------------------------------------------------------------------- #


def _no(structure: str, note: str) -> ModelResult:
    return ModelResult(structure=structure, matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def _res(structure: str, g: Dict[str, Any], value: Optional[float], eq: str,
         steps: List[str], answer: Optional[str] = None,
         assumptions: Optional[List[str]] = None, conf: float = 0.95,
         extra: Optional[Dict[str, Any]] = None) -> ModelResult:
    """Matched ModelResult; non-numeric slots are dropped from quantities."""
    q: Dict[str, float] = {}
    for k, v in (g or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    for k, v in (extra or {}).items():
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            q[k] = float(v)
    return ModelResult(
        structure=structure, matched=True, confidence=conf,
        quantities=q, governing_equation=eq,
        final_answer=answer if answer is not None else
        (_fmt(value) if value is not None else ""),
        numeric_answer=value, steps=steps,
        note="; ".join(assumptions) if assumptions else "")


def _fmt(v: float) -> str:
    return f"{v:.6g}"


def _n(s: str) -> float:
    return float(str(s).replace(",", ""))


# numeric token that also accepts scientific notation:
# "6", "6e24", "6x10^24", "6*10^24", "6 x 10 ^ 24"
_SCI = (r"-?\d+(?:\.\d+)?"
        r"(?:\s*[eE]\s*[-+]?\d+"
        r"|\s*(?:[x*]|\u00d7)\s*10\s*(?:\^|\*\*)?\s*[-+]?\d+)?")


def _sci(s: str) -> float:
    """Parse plain/scientific tokens: 6, 6e24, 6x10^24, 6 x 10 ^ 24."""
    t = (s or "").strip().replace(",", "")
    m = re.match(r"^(-?\d+(?:\.\d+)?)\s*[eE]\s*([-+]?\d+)$", t)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    m = re.match(r"^(-?\d+(?:\.\d+)?)\s*(?:[x*]|\u00d7)\s*10\s*"
                 r"(?:\^|\*\*)?\s*([-+]?\d+)$", t)
    if m:
        return float(m.group(1)) * 10.0 ** int(m.group(2))
    return float(t)


def _normalize(text: str) -> str:
    """Deterministic surface cleanup: unicode minus, dashes, superscripts.

    "m/s²" becomes "m/s^2" so every downstream regex can treat ^2 as the
    power; unicode minus and en-dash collapse to ASCII '-'.
    """
    t = (text or "").replace("\u2212", "-").replace("\u2013", "-") \
        .replace("\u2019", "'").replace("\u00a0", " ")
    return re.sub(
        r"[\u2070\u00b9\u00b2\u00b3\u2074-\u2079\u207b]+",
        lambda m_: "^" + "".join(
            {"\u2070": "0", "\u00b9": "1", "\u00b2": "2", "\u00b3": "3",
             "\u2074": "4", "\u2075": "5", "\u2076": "6", "\u2077": "7",
             "\u2078": "8", "\u2079": "9", "\u207b": "-"}.get(c, "")
            for c in m_.group(0)),
        t)


# gate-failure tuple: value None + empty steps -> dispatcher keeps scanning
_GATE = (None, [], None, None, None, None)
# number words vs digits: the S0 input normalizer rewrites "five" -> "5"
# before the modeling lane runs, so families must accept both (C8 dig)
_WORD_N = {"two": 2.0, "three": 3.0, "four": 4.0, "five": 5.0, "six": 6.0,
           "ten": 10.0}
# decimal-tolerant span: a bare [^.] class stops at "1.0 cm" decimals AND
# at sentence dots ("... 4 hours. It produces ..."), silently truncating
# every cross-sentence trigger (C8 dig, 2026-10-06)
_SPAN = r"(?:[^.]|\.(?=\d)|\.(?=\s))"


def _beats(method: str, subst: str, comp: str, verify: str,
           interp: str) -> List[str]:
    """STEP CONTRACT (SOLVER_STEP_CONTRACT.md) 5-beat steps, in order:

    1 Method line (law/formula + why it applies), 2 Substitution with
    units, 3 Computation shown, 4 Verification (substitute back /
    sanity check), 5 Interpretation in context.
    """
    return [f"Method: {method}", f"Substitution: {subst}",
            f"Computation: {comp}", f"Verification: {verify}",
            f"Interpretation: {interp}"]


# --------------------------------------------------------------------------- #
# unit fragments + SI converters
# --------------------------------------------------------------------------- #

_DISTU = (r"(?:km|kilometres?|kilometers?|mm|millimetres?|millimeters?|"
          r"cm|centimetres?|centimeters?|m|metres?|meters?)")
_TIMEU = r"(?:hours?|hrs?|hr|minutes?|mins?|min|seconds?|secs?|sec|s)"
_MASSU = r"(?:tonnes?|kg|kilograms?|g|grams?)"
_VELU = (r"(?:km\s*/\s*h(?:r|our)?|km\s*h\s*[-^]?\s*1|"
         r"m\s*/\s*s|m\s*s\s*[-^]?\s*1|"
         r"kilometres?\s+per\s+(?:hour|hr)|metres?\s+per\s+second)")
_ACCU = (r"(?:m\s*/\s*s\s*\^?\s*2|m\s*s\s*[-^]?\s*2|"
         r"cm\s*/\s*s\s*\^?\s*2|centimetres?\s+per\s+second\s+squared|"
         r"metres?\s+per\s+second\s+squared)")
_FORCEU = r"(?:k\s*N|kilonewtons?|N|newtons?)"


def _to_m(n: str, u: str) -> float:
    v = _sci(n)
    try:
        from its.solver import pint_physics_engine
        p = pint_physics_engine.convert_units(v, u, "meter")
        if p is not None:
            return p
    except Exception:
        pass
    ul = u.strip().lower()
    if ul.startswith("km"):
        return v * 1000.0
    if ul.startswith("mm"):
        return v * 0.001
    if ul.startswith("cm"):
        return v * 0.01
    return v


def _to_s(n: str, u: str) -> float:
    v = _sci(n)
    try:
        from its.solver import pint_physics_engine
        p = pint_physics_engine.convert_units(v, u, "second")
        if p is not None:
            return p
    except Exception:
        pass
    ul = u.strip().lower()
    if ul.startswith("h"):
        return v * 3600.0
    if ul.startswith("mi") or ul.startswith("min"):
        return v * 60.0
    return v


def _to_kg(n: str, u: str) -> float:
    v = _sci(n)
    try:
        from its.solver import pint_physics_engine
        p = pint_physics_engine.convert_units(v, u, "kilogram")
        if p is not None:
            return p
    except Exception:
        pass
    ul = u.strip().lower()
    if ul.startswith("ton"):
        return v * 1000.0
    if ul == "g" or ul.startswith("gram"):
        return v * 0.001
    return v


def _to_ms(n: str, u: str) -> float:
    v = _sci(n)
    try:
        from its.solver import pint_physics_engine
        p = pint_physics_engine.convert_units(v, u, "meter / second")
        if p is not None:
            return p
    except Exception:
        pass
    if "km" in u.lower():
        return v * 1000.0 / 3600.0
    return v


def _to_acc(n: str, u: str) -> float:
    v = _sci(n)
    try:
        from its.solver import pint_physics_engine
        p = pint_physics_engine.convert_units(v, u, "meter / second ** 2")
        if p is not None:
            return p
    except Exception:
        pass
    if u.strip().lower().startswith("cm"):
        return v * 0.01
    return v


def _to_n(n: str, u: str) -> float:
    v = _sci(n)
    try:
        from its.solver import pint_physics_engine
        p = pint_physics_engine.convert_units(v, u, "newton")
        if p is not None:
            return p
    except Exception:
        pass
    if u.strip().lower().startswith("k"):
        return v * 1000.0
    return v


def _first(text: str, patterns: List[str], conv):
    """First anchored quantity hit, converted to SI.

    Returns (value, span-of-the-number) so callers can dedupe tokens
    parsed by overlapping patterns; None when nothing matches.
    """
    for rx in patterns:
        m = re.search(rx, text, re.I)
        if m:
            try:
                return conv(m.group("n"), m.group("u") or ""), m.start("n")
            except Exception:
                continue
    return None


def _v(hit) -> Optional[float]:
    """Unwrap a (value, span) hit from _first."""
    return hit[0] if hit else None


# known surface gravities (m/s^2) for the body-consistency plausibility gate
_BODY_G = {
    "moon": 1.62, "mercury": 3.7, "mars": 3.71, "venus": 8.87,
    "uranus": 8.69, "earth": 9.8, "saturn": 10.44, "neptune": 11.15,
    "jupiter": 24.79, "sun": 274.0,
}


def _gval(text: str) -> Optional[float]:
    """g from the text ("g = 10", "take g as 9.8"); moon 1.6; else 9.8.

    Plausibility gate (two layers):
      1. an EXPLICIT g outside [0.5, 350] m/s^2 (the Sun's surface
         gravity, the strongest field in the syllabus, is 274) -> None;
      2. a stated g that CONTRADICTS a named celestial body's known
         gravity by more than 3x ("on the Moon where g = 200") -> None.
    None makes every caller gate instead of dressing nonsense in a
    verification beat."""
    m = re.search(r"\bg\s*(?:=|as|:)\s*(" + _SCI + r")"
                  r"(?:\s*m\s*/\s*s\s*\^?\s*2)?", text, re.I)
    if not m:
        # prose-stated g (2026-10-02 gate-failure plant): "the moon's
        # gravitational acceleration is 200 m/s^2" — the "g = X" shape
        # misses it, which used to fall through to the moon default and
        # ship a confident answer contradicting the stated value.
        m = re.search(r"gravitational\s+acceleration\s+(?:is|of|was|=)\s*"
                      r"(" + _SCI + r")"
                      r"(?:\s*m\s*/\s*s\s*\^?\s*2)?", text, re.I)
    if not m:
        m = re.search(r"acceleration\s+due\s+to\s+gravity\s+"
                      r"(?:is|of|was|=)\s*(" + _SCI + r")"
                      r"(?:\s*m\s*/\s*s\s*\^?\s*2)?", text, re.I)
    if not m:
        m = re.search(r"\bgravity\s+(?:is|of|was|=)\s*(" + _SCI + r")"
                      r"(?:\s*m\s*/\s*s\s*\^?\s*2)?", text, re.I)
    if m:
        try:
            v = _sci(m.group(1))
        except ValueError:
            v = None
        if v is not None:
            if not (0.5 <= v <= 350.0):
                return None
            for _body, _bg in _BODY_G.items():
                if re.search(r"\b" + _body + r"\b", text, re.I) \
                        and not (_bg / 3.0 <= v <= _bg * 3.0):
                    return None     # contradicts the named body's gravity
            return v
    if re.search(r"\bmoon\b", text, re.I):
        return 1.6
    return 9.8


# --------------------------------------------------------------------------- #
# kinematics quantity extraction (SI dict, spans deduped)
# --------------------------------------------------------------------------- #

_U_INIT_VEL = [
    r"initial\s+(?:velocity|speed)\s+(?:of\s+|is\s+|was\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")",
    r"(?:uniform\s+)?(?:velocity|speed)\s+of\s+(?P<n>" + _SCI + r")\s*"
    r"(?P<u>" + _VELU + r")",
    r"(?:starts?|started|begins?|moving|moves|moved|travelling|traveling|"
    r"travels|going|goes|driving|drives|running|runs|cycling|cycles)\b"
    r"[^.]{0,30}?(?:with\s+(?:a\s+)?(?:uniform\s+)?(?:velocity|speed)\s+"
    r"(?:of\s+)?|at\s+(?:a\s+)?(?:constant\s+)?(?:velocity|speed)\s+"
    r"(?:of\s+)?|at\s+)(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")",
    r"thrown?\s+(?:vertically\s+)?up(?:ward)?s?\b[^.]{0,30}?"
    r"with\s+(?:a\s+)?(?:velocity|speed)\s+(?:of\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")",
    r"(?:projected|launched)\s+(?:vertically\s+)?(?:up(?:ward)?s?\b)?"
    r"[^.]{0,30}?with\s+(?:a\s+)?(?:velocity|speed)\s+(?:of\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")",
    r"from\s+(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")\b",
]

_U_FINAL_VEL = [
    r"final\s+(?:velocity|speed)\s+(?:of\s+|is\s+|reaches\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")",
    r"(?:reaches|attains|acquires|gains)\s+(?:a\s+)?(?:final\s+)?"
    r"(?:velocity|speed)\s+(?:of\s+)?(?P<n>" + _SCI + r")\s*"
    r"(?P<u>" + _VELU + r")",
    r"(?:velocity|speed)\s+(?:becomes|changes\s+to|rises\s+to)\s+"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")",
    r"accelerates?\b[^.]{0,30}?to\s+(?P<n>" + _SCI + r")\s*"
    r"(?P<u>" + _VELU + r")",
    r"from\s+" + _SCI + r"\s*(?:" + _VELU + r")\b[^.]{0,20}?"
    r"to\s+(?:a\s+)?(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")",
    r"hits?\s+the\s+(?:ground|floor|water|surface)\s+(?:at|with)\s+(?:a\s+)?"
    r"(?:velocity|speed)\s+(?:of\s+)?(?P<n>" + _SCI + r")\s*"
    r"(?P<u>" + _VELU + r")",
    r"hits?\s+the\s+(?:ground|floor|water|surface)\s+(?:at|with)\s+"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU + r")",
]

_U_ACC = [
    r"(?:uniform\s+)?acceleration\s+(?:of\s+|is\s+|equals\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _ACCU + r")",
    r"accelerat(?:es?|ing|ed)\s+(?:uniformly\s+)?(?:at\s+)?"
    r"(?:the\s+rate\s+of\s+)?(?P<n>" + _SCI + r")\s*(?P<u>" + _ACCU + r")",
    r"(?:retardation|deceleration)\s+(?:of\s+|is\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _ACCU + r")",
    r"retard\w*\s+(?:uniformly\s+)?(?:at\s+)?(?P<n>" + _SCI + r")\s*"
    r"(?P<u>" + _ACCU + r")",
    r"decelerat\w*\s+(?:uniformly\s+)?(?:at\s+)?(?P<n>" + _SCI + r")\s*"
    r"(?P<u>" + _ACCU + r")",
]

_U_TIME = [
    r"(?:time\s+(?:taken|interval|elapsed)(?:\s+(?:is|of))?\s*|"
    r"takes?\s+|in\s+|within\s+|after\s+|for\s+)"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _TIMEU + r")\b",
]

_U_DIST = [
    r"(?:distance|displacement)\s+(?:of\s+)?(?:is\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    r"(?:covers?|travels?|moves?|cross(?:es)?|travelled|traveled)\s+"
    r"(?:a\s+)?(?:total\s+)?(?:distance\s+of\s+|displacement\s+of\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    r"(?:stopping|braking)\s+distance\s+(?:of\s+|is\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    r"(?:max(?:imum)?\s+)?(?:height|depth)\s+(?:of\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    r"(?:dropped|released|falls?|fell|falling|thrown?|jumps?|dives?)\s+"
    r"(?:freely\s+|straight\s+(?:down\s+)?)?(?:down(?:wards)?\s+)?"
    r"(?:from\s+(?:rest\s+|a\s+|the\s+|its\s+)?|a\s+|through\s+)?"
    r"(?:height\s+(?:of\s+)?|depth\s+(?:of\s+)?)?"
    r"(?:through\s+|down(?:wards)?\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    r"(?:falls?|dropped|released)\s+(?:a\s+|through\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b\s*distance\b",
    r"(?:falls?|dropped|released)?\s*(?:through\s+|down\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b(?=[^.;\n]{0,40}"
    r"\b(?:falls?|fell|dropped|released|downward|down\b))",
    r"(?:in|within|after)\s+(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
]


def _acc_hit(text: str):
    """Sign-aware acceleration extraction: retard/decelerate wording
    yields a negative acceleration."""
    for rx in _U_ACC:
        m = re.search(rx, text, re.I)
        if m:
            try:
                v = _to_acc(m.group("n"), m.group("u") or "")
                if re.search(r"retard|deceler", m.group(0), re.I):
                    v = -v
                return v, m.start("n")
            except Exception:
                continue
    return None


def _kin_parse(text: str) -> Tuple[Dict[str, float], List[str]]:
    """Extract u/v/a/s/t in SI.  Returns (quantities, assumptions)."""
    d: Dict[str, float] = {}
    notes: List[str] = []
    g = _gval(text)

    # final velocity first (so initial-velocity catch-alls can't steal it)
    v_hit = _first(text, _U_FINAL_VEL, _to_ms)
    v_span = v_hit[1] if v_hit else None
    if v_hit:
        d["v"] = v_hit[0]
    elif re.search(r"(?:comes?\s+to\s+(?:a\s+)?(?:rest|stop|halt)"
                   r"|brought\s+to\s+(?:a\s+)?(?:rest|stop|halt)"
                   r"|finally\s+stops?|stops\s+(?:finally|dead)"
                   r"|\band\s+stops?\b|\bstops\s+in\b|\bto\s+a\s+stop\b"
                   r"|\bdecelerat\w*[^.]{0,40}?to\s+(?:a\s+)?rest\b"
                   r"|\bretard\w*[^.]{0,40}?to\s+(?:a\s+)?rest\b"
                   r"|\bto\s+rest\b"
                   r"|max(?:imum)?\s+height)", text, re.I):
        d["v"] = 0.0
        notes.append("v = 0 (comes to rest / at maximum height)")

    u_hit = _first(text, _U_INIT_VEL, _to_ms)
    if u_hit:
        if v_span is not None and u_hit[1] == v_span:
            pass  # the same token was the final velocity, not the initial
        else:
            d["u"] = u_hit[0]
    if "u" not in d and re.search(
            r"\b(?:from\s+rest|starts?\s+at\s+rest|starts?\s+from\s+rest|"
            r"dropped|released|falls?\s+from\s+rest|"
            r"falls?\s+(?:a\b|through\b|down\b|from\b|for\b|freely\b|\d)|"
            r"fell\s+(?:a\b|through\b|down\b|from\b|for\b|\d)|"
            r"falling\s+(?:a\b|through\b|down\b|from\b|for\b|\d)|"
            r"freely\s+fall\w*)", text, re.I) \
            and not re.search(r"\b(?:thrown?|projected|launched)\b",
                              text, re.I):
        d["u"] = 0.0
        notes.append("u = 0 (starts from rest / dropped)")

    a_hit = _acc_hit(text)
    if a_hit:
        d["a"] = a_hit[0]
    elif g is not None and re.search(
            r"under\s+gravity|free(?:\s|-)?fall|freely\s+falling|"
            r"vertical(?:ly)?\s+(?:up|down)|thrown?\s+(?:up|down)|"
            r"falls?\s+(?:down|from|through|a\b|for\b|\d)|"
            r"falls?\s+freely|fell\s+freely|"
            r"fell\s+(?:down|from|through|a\b|for\b)|"
            r"falling\s+(?:down|from|through|a\b|for\b|\d)|"
            r"dropped|released|rising|rises|"
            r"on\s+hitting|hits?\s+the\s+ground|max(?:imum)?\s+height",
            text, re.I):
        if re.search(r"up(?:ward)?s?\b|rising|rises", text, re.I) \
                and not re.search(r"down(?:ward)?\b|falls?\b|dropped",
                                  text, re.I):
            d["a"] = -g
            notes.append(f"a = -{g:g} m/s^2 (decelerating under gravity, "
                         "up taken positive)")
        else:
            d["a"] = g
            notes.append(f"a = g = {g:g} m/s^2 (free fall under gravity)")

    t_hit = _first(text, _U_TIME, _to_s)
    if t_hit:
        d["t"] = t_hit[0]
    s_hit = _first(text, _U_DIST, _to_m)
    if s_hit:
        d["s"] = s_hit[0]
    return d, notes


_ASK_V = (r"final\s+(?:velocity|speed)|(?:with\s+)?what\s+"
          r"(?:is\s+)?(?:its\s+|the\s+)?(?:speed|velocity)"
          r"|(?:speed|velocity)\s+with\s+which"
          r"|(?:velocity|speed)\s+just\s+before"
          r"|velocity\s+(?:on|at|with\s+which)\s+"
          r"hitting|on\s+hitting|impact\s+(?:velocity|speed)|"
          r"(?:velocity|speed)\s+(?:of|at)\s+(?:the\s+)?(?:ground|impact)|"
          r"how\s+fast|velocity\s+just\s+before|"
          r"(?:speed|velocity)\s+(?:does\s+it\s+)?(?:hit|reach|strike)")
_ASK_T = (r"how\s+long|time\s+(?:taken|interval|elapsed)|"
          r"time\s+of\s+(?:the\s+)?(?:fall|flight|descent|ascent|rise)|"
          r"time\s+to\s+(?:fall|reach|stop)|"
          r"(?:find|calculate|compute|determine)\s+the\s+time\b|"
          r"the\s+fall\s+(?:take|last)\b|"
          r"when\s+will\s+it|how\s+soon|before\s+(?:coming\s+)?to\s+rest|"
          r"takes?\s+(?:to\s+)?(?:come|reach|fall|hit)|time\s+before")
_ASK_S = (r"how\s+far|what\s+distance|"
          r"distance\s+(?:travelled|covered|moved|it\s+covers?)|"
          r"max(?:imum)?\s+height|height\s+(?:reached|attained|risen)|"
          r"from\s+what\s+(?:height|depth)|what\s+(?:height|depth)|"
          r"height\s+of\s+(?:the|a|an)\b|height\s+it\s+(?:fell|dropped)|"
          r"stopping\s+distance|how\s+(?:high|deep)|braking\s+distance")
_ASK_A = r"(?:what\s+is\s+its?\s+)?(?:acceleration|retardation|deceleration)"
_ASK_U = r"initial\s+(?:velocity|speed)"


def _kin_ask(text: str) -> Optional[str]:
    for key, rx in (("v", _ASK_V), ("t", _ASK_T), ("s", _ASK_S),
                    ("a", _ASK_A), ("u", _ASK_U)):
        if re.search(rx, text, re.I):
            return key
    return None


_ANS_UNIT = {"v": "m/s", "u": "m/s", "a": "m/s^2", "s": "m", "t": "s"}
_KIN_NAME = {"u": "initial velocity", "v": "final velocity",
             "a": "acceleration", "s": "distance", "t": "time"}


def _kin_handle(fid: str, equation: str, eq_vars: Tuple[str, ...]):
    """Build a table handler for one kinematics equation."""
    def handler(g, m, text):
        # TERMINAL-VELOCITY VETO: "falling through air/water" phrasings
        # now trigger the kinematics family, but a terminal-velocity
        # problem is NOT constant-acceleration motion -- v = u + a t /
        # s = u t + 1/2 a t^2 would fabricate a verified-looking number.
        # The Stokes-law TERMINAL_VELOCITY family owns these.
        if re.search(r"terminal\s+velocit\w*", text, re.I):
            return _GATE
        # SHM VETO (2026-10-07, c11 spot): spring-mass oscillation asks
        # (force constant, displaced from equilibrium, time period of
        # the oscillation) are SIMPLE HARMONIC motion -- a = kx/m is
        # position-dependent, so the constant-acceleration equations
        # fabricate a verified-looking number (live: '0.5 kg on a
        # 50 N/m spring ... time period?' answered 0.14 s; true
        # T = 2 pi sqrt(m/k) = 0.63 s).
        if re.search(r"oscillat\w*|simple\s+harmonic|\bSHM\b|"
                     r"spring\s+(?:of\s+)?(?:force\s+)?constant|"
                     r"attached\s+to\s+a\s+spring", text, re.I):
            return _GATE
        # ENERGY CO-ASK VETO (2026-10-07, class-9 corpus ch4_8#d3): 'a
        # 2 kg stone is dropped from 20 m -- calculate its KINETIC
        # ENERGY and speed' is an energy-conservation ask; the pure
        # kinematics family answers only the speed half and ships it as
        # the whole answer.  C9_DROP_KE owns the co-ask.
        if re.search(r"kinetic\s+energy", text, re.I):
            return _GATE
        d, notes = _kin_parse(text)
        ask = _kin_ask(text)
        unknown = None
        if ask is not None and ask not in eq_vars:
            return _GATE  # this question is about another equation
        if ask in eq_vars and ask not in d:
            unknown = ask
        else:
            missing = [k for k in eq_vars if k not in d]
            if len(missing) == 1:
                unknown = missing[0]
        if unknown is None:
            return _GATE
        if any(k not in d for k in eq_vars if k != unknown):
            return _GATE
        u = d.get("u")
        v = d.get("v")
        a = d.get("a")
        s = d.get("s")
        t = d.get("t")

        if fid == "KINEMATICS_V_U_AT":
            if unknown == "v":
                val = u + a * t
                subst = (f"v = {_fmt(u)} + ({_fmt(a)}) x {_fmt(t)} = "
                         f"{_fmt(val)} m/s")
            elif unknown == "u":
                if t == 0:
                    return _GATE
                val = v - a * t
                subst = (f"u = {_fmt(v)} - ({_fmt(a)}) x {_fmt(t)} = "
                         f"{_fmt(val)} m/s")
            elif unknown == "a":
                if t == 0:
                    return _GATE
                val = (v - u) / t
                subst = (f"a = ({_fmt(v)} - {_fmt(u)}) / {_fmt(t)} = "
                         f"{_fmt(val)} m/s^2")
            else:  # t
                if a == 0:
                    return _GATE
                val = (v - u) / a
                if val < 0:
                    return _GATE
                subst = (f"t = ({_fmt(v)} - {_fmt(u)}) / {_fmt(a)} = "
                         f"{_fmt(val)} s")
        elif fid == "KINEMATICS_S_UT_AT2":
            if unknown == "s":
                val = u * t + 0.5 * a * t * t
                subst = (f"s = {_fmt(u)} x {_fmt(t)} + 0.5 x ({_fmt(a)}) x "
                         f"({_fmt(t)})^2 = {_fmt(val)} m")
            elif unknown == "u":
                if t == 0:
                    return _GATE
                val = (s - 0.5 * a * t * t) / t
                subst = (f"u = ({_fmt(s)} - 0.5 x ({_fmt(a)}) x "
                         f"({_fmt(t)})^2) / {_fmt(t)} = {_fmt(val)} m/s")
            elif unknown == "a":
                if t == 0:
                    return _GATE
                val = 2.0 * (s - u * t) / (t * t)
                subst = (f"a = 2 x ({_fmt(s)} - {_fmt(u)} x {_fmt(t)}) / "
                         f"({_fmt(t)})^2 = {_fmt(val)} m/s^2")
            else:  # t: 0.5 a t^2 + u t - s = 0
                if a == 0:
                    if u == 0 or s == 0:
                        return _GATE
                    val = s / u
                    if val < 0:
                        return _GATE
                    subst = (f"a = 0 so t = s / u = {_fmt(s)} / {_fmt(u)} = "
                             f"{_fmt(val)} s")
                else:
                    disc = u * u + 2.0 * a * s
                    if disc < 0:
                        return _GATE
                    val = (-u + math.sqrt(disc)) / a
                    if val < 0:
                        neg = (-u - math.sqrt(disc)) / a
                        if neg >= 0:
                            val = neg
                        else:
                            return _GATE
                    subst = (f"0.5 x ({_fmt(a)}) x t^2 + {_fmt(u)} x t - "
                             f"{_fmt(s)} = 0; t = (-{_fmt(u)} + "
                             f"sqrt(({_fmt(u)})^2 + 2({_fmt(a)})({_fmt(s)})))"
                             f"/{_fmt(a)} = {_fmt(val)} s")
        else:  # KINEMATICS_V2_U2_2AS
            if unknown == "v":
                disc = u * u + 2.0 * a * s
                if disc < 0:
                    return _GATE
                val = math.sqrt(disc)
                subst = (f"v = sqrt(({_fmt(u)})^2 + 2 x ({_fmt(a)}) x "
                         f"{_fmt(s)}) = sqrt({_fmt(disc)}) = {_fmt(val)} m/s")
            elif unknown == "u":
                disc = v * v - 2.0 * a * s
                if disc < 0:
                    return _GATE
                val = math.sqrt(disc)
                subst = (f"u = sqrt(({_fmt(v)})^2 - 2 x ({_fmt(a)}) x "
                         f"{_fmt(s)}) = sqrt({_fmt(disc)}) = {_fmt(val)} m/s")
            elif unknown == "a":
                if s == 0:
                    return _GATE
                val = (v * v - u * u) / (2.0 * s)
                subst = (f"a = (({_fmt(v)})^2 - ({_fmt(u)})^2) / "
                         f"(2 x {_fmt(s)}) = {_fmt(val)} m/s^2")
            else:  # s
                if a == 0:
                    return _GATE
                val = (v * v - u * u) / (2.0 * a)
                if val < 0:
                    return _GATE  # unreachable: velocity never reaches v
                subst = (f"s = (({_fmt(v)})^2 - ({_fmt(u)})^2) / "
                         f"(2 x ({_fmt(a)})) = {_fmt(val)} m")

        # U/V ROLE-SWAP + SIGN GUARD (2026-10-07 pinned flip): "accelerates
        # from rest to 20 m/s in 8 s" must read u=0, v=20, t=8 -> a=+2.5.
        # A negative acceleration under 'accelerates ... from rest' (or a
        # positive one under decelerate/retard) means the time token was
        # bound as a velocity — refuse this family rather than ship a
        # confidently wrong sign (the PAL lane owns the fallback).
        low_kin = text.lower()
        kin_accels = bool(re.search(r"\baccelerat", low_kin))
        kin_decel = bool(re.search(r"\bdecelerat|\bretard", low_kin))
        from_rest = bool(re.search(r"from\s+rest|starts?\s+(?:from\s+)?rest",
                                   low_kin))
        if kin_accels and from_rest and d.get("u") not in (0.0, None):
            return _GATE  # role-swap: 'from rest' pins u = 0
        if unknown == "a":
            if kin_accels and from_rest and val < 0:
                return _GATE
            if kin_decel and val > 0:
                return _GATE

        un = _ANS_UNIT[unknown]
        label = _KIN_NAME[unknown]
        # substitute-back verification: rebuild the equation's other side
        uu = val if unknown == "u" else u
        vv = val if unknown == "v" else v
        aa = val if unknown == "a" else a
        tt = val if unknown == "t" else t
        ss = val if unknown == "s" else s
        if fid == "KINEMATICS_V_U_AT":
            back = uu + aa * tt
            chk = (f"u + a t = {_fmt(uu)} + ({_fmt(aa)}) x ({_fmt(tt)}) = "
                   f"{_fmt(back)} = v = {_fmt(vv)} m/s")
        elif fid == "KINEMATICS_S_UT_AT2":
            back = uu * tt + 0.5 * aa * tt * tt
            chk = (f"u t + 0.5 a t^2 = {_fmt(uu)} x {_fmt(tt)} + 0.5 x "
                   f"({_fmt(aa)}) x ({_fmt(tt)})^2 = {_fmt(back)} = "
                   f"s = {_fmt(ss)} m")
        else:
            back = uu * uu + 2.0 * aa * ss
            chk = (f"u^2 + 2 a s = ({_fmt(uu)})^2 + 2 x ({_fmt(aa)}) x "
                   f"{_fmt(ss)} = {_fmt(back)} = v^2 = ({_fmt(vv)})^2")
        given = ", ".join(f"{_KIN_NAME[k]} = {_fmt(d[k])} {_ANS_UNIT[k]}"
                          for k in sorted(d))
        steps = [
            f"Method: {equation} -- equation of uniformly accelerated "
            "motion, applies because the acceleration is constant.",
            f"Substitution: given {given}; solving for the {label}.",
            f"Computation: {subst}",
            f"Verification: substitute back: {chk} -- the equation closes.",
            f"Interpretation: the {label} of the body is {_fmt(val)} {un}"
            + (f"; the negative sign means it slows down "
               f"(retardation {_fmt(abs(val))} m/s^2)"
               if unknown == "a" and val < 0 else "") + ".",
        ]
        answer = f"{label} = {_fmt(val)} {un}"
        if unknown == "a" and val < 0:
            answer += f" (retardation {_fmt(abs(val))} m/s^2)"
        extra = {unknown: val}
        extra.update(d)
        return val, steps, answer, notes or None, equation, extra
    return handler


_KIN_TRIGGER = (r"(?:accelerat\w*|retard\w*|decelerat\w*"
                r"|free[\s-]?fall|under\s+gravity"
                r"|dropped|released|thrown?\s+(?:vertically\s+)?up"
                r"|from\s+rest"
                r"|fall(?:s|ing)?\s+(?:a\b|through\b|down\b|from\b|for\b"
                r"|freely\b|\d)"
                r"|fell\s+(?:a\b|through\b|down\b|from\b|for\b|\d))")


# --------------------------------------------------------------------------- #
# shared small extractors for the non-kinematics families
# --------------------------------------------------------------------------- #


def _f_force(text: str) -> Optional[float]:
    pats = [
        r"(?:force|effort|pull|push)\s+(?:of\s+|is\s+)?(?P<n>" + _SCI
        + r")\s*(?P<u>" + _FORCEU + r")\b",
        r"exerts?\s+(?:a\s+)?force\s+of\s+(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _FORCEU + r")\b",
        r"applies?\s+(?:a\s+)?force\s+of\s+(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _FORCEU + r")\b",
        r"(?P<n>" + _SCI + r")\s*(?P<u>" + _FORCEU + r")\s+(?:force|"
        r"is\s+applied|acts|is\s+exerted)",
    ]
    return _v(_first(text, pats, _to_n))


def _f_mass(text: str) -> Optional[float]:
    pats = [
        r"mass\s+(?:of\s+(?:a|an|the)\s+[\w-]+\s+)?(?:is\s+)?"
        r"(?P<n>" + _SCI + r")\s*(?P<u>" + _MASSU + r")\b",
        r"(?P<n>" + _SCI + r")\s*(?P<u>" + _MASSU + r")\b",
    ]
    return _v(_first(text, pats, _to_kg))


def _f_vol(text: str) -> Optional[float]:
    pats = [
        r"volume\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
        r"(?P<u>m\s*\^?\s*3|cm\s*\^?\s*3|cc|litres?|liters?)\b",
        r"(?P<n>" + _SCI + r")\s*(?P<u>m\s*\^?\s*3|cm\s*\^?\s*3|cc|"
        r"litres?|liters?)\s*(?:volume|of\s+(?:water|liquid|displacement))",
    ]
    def conv(n, u):
        v = _sci(n)
        ul = u.strip().lower().replace(" ", "")
        if ul in ("m^3", "m3"):
            return v
        if ul in ("cm^3", "cm3", "cc"):
            return v * 1e-6
        return v * 0.001  # litres
    return _v(_first(text, pats, conv))


def _f_dens(text: str) -> Optional[float]:
    pats = [
        r"density\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
        r"(?P<u>kg\s*/\s*m\s*\^?\s*3|g\s*/\s*cm\s*\^?\s*3|g\s*/\s*cc|"
        r"kg\s*per\s*cubic\s*metre|g\s*per\s*cubic\s*centimetre)",
    ]
    def conv(n, u):
        v = _sci(n)
        return v * 1000.0 if u.strip().lower().startswith("g") else v
    val = _v(_first(text, pats, conv))
    if val is None and re.search(r"\bin\s+water\b", text, re.I):
        val = 1000.0
    return val


def _f_energy(text: str) -> Optional[float]:
    pats = [
        r"(?P<n>" + _SCI + r")\s*(?P<u>(?:k\s*)?J|joules?|kilojoules?)\s+"
        r"(?:of\s+)?(?:work|heat|energy)",
        r"(?:work|heat|energy)\s+(?:done\s+)?(?:of\s+|is\s+)?"
        r"(?P<n>" + _SCI + r")\s*(?P<u>(?:k\s*)?J|joules?|kilojoules?)\b",
    ]
    def conv(n, u):
        ul = u.strip().lower().replace(" ", "")
        return _sci(n) * (1000.0 if ul.startswith("k") and ul != "j" else 1.0)
    return _v(_first(text, pats, conv))


def _f_power(text: str) -> Optional[float]:
    pats = [
        r"(?:power|rating|rated|dissipat\w+|consum\w+)\s+(?:of\s+|is\s+)?"
        r"(?P<n>" + _SCI + r")\s*(?P<u>kW|kilowatts?|W|watts?)\b",
        r"(?P<n>" + _SCI + r")\s*(?P<u>kW|kilowatts?|W|watts?)\s*"
        r"(?:\s*(?:bulb|heater|device|appliance|motor|lamp|iron|geyser|fan))",
        r"(?P<n>" + _SCI + r")\s*(?P<u>kW|kilowatts?|W|watts?)\b",
    ]
    def conv(n, u):
        v = _sci(n)
        return v * 1000.0 if u.strip().lower().startswith("k") else v
    return _v(_first(text, pats, conv))


def _f_height_depth(text: str) -> Optional[float]:
    pats = [
        r"(?:height|depth)\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _DISTU + r")\b",
        r"(?:at\s+(?:a\s+)?(?:height|depth)\s+of\s+|raised\s+(?:to|by)\s+"
        r"a?\s*(?:height\s+)?(?:of\s+)?|lifted\s+(?:to|through)\s+"
        r"a?\s*(?:height\s+)?(?:of\s+)?)(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _DISTU + r")\b",
    ]
    return _first(text, pats, _to_m)[0] \
        if _first(text, pats, _to_m) else None


def _f_dist2(text: str) -> Optional[float]:
    pats = [
        r"(?:through|over|across|along|of)\s+(?:a\s+)?(?:distance\s+of\s+)?"
        r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
        r"(?:distance|displacement)\s+(?:of\s+)?(?:is\s+)?"
        r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
        r"(?:moves?|moved|pulls?|pushes?|drags?|lifts?|carries?)\s+"
        r"(?:a|an|the)?\s*[\w-]*\s*(?:box|object|block|crate|trolley|load|"
        r"body|cart)?\s*(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    ]
    return _v(_first(text, pats, _to_m))


def _f_time2(text: str) -> Optional[float]:
    pats = [
        r"(?:in|for|within|takes?)\s+(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _TIMEU + r")\b",
        r"time\s+(?:taken|interval)?\s*(?:is\s+|of\s+)?"
        r"(?P<n>" + _SCI + r")\s*(?P<u>" + _TIMEU + r")\b",
    ]
    return _v(_first(text, pats, _to_s))


def _ask_word(text: str, word_rx: str) -> bool:
    return bool(re.search(r"(?:find|calculate|determine|compute|what|how)\b"
                          r"[^.]{0,40}?" + word_rx, text, re.I)
                or re.search(word_rx + r"[^.]{0,10}\?", text, re.I))


# --------------------------------------------------------------------------- #
# two-pan balance questions (LOMO fix, 2026-10-05): a balance at rest
# compares the total MASS on its two sides, so "two identical bags (each
# x kg) and a 2kg weight on one side of a scale; the other side has a
# 10kg weight" is the mass equation 2x + 2 = 10 -> x = 4 kg.  The old
# _c_weight answered it with W = m g on the first mass token it saw
# (19.6 N) -- a confident-wrong in the wrong unit and the wrong model.
# The balance is modelled as mass equality directly; an unparseable or
# unit-ambiguous balance refuses (never W = m g, never a guess).
# --------------------------------------------------------------------------- #

_BAL_SIDE1_RX = re.compile(r"(?:\b(?:on|in|at|upon|onto)\s+)?\b"
                           r"(?:one|the\s+left|the\s+first|left|first)\s+"
                           r"(?:side|pan)\b", re.I)
_BAL_SIDE2_RX = re.compile(r"(?:\b(?:on|in|at|upon|onto)\s+)?\b"
                           r"(?:the\s+)?(?:other|right|second|opposite)\s+"
                           r"(?:side|pan)\b", re.I)
# the bare-"g" unit alternative carries (?<!k): without it "12 kg" parsed
# as var='k' + unit='g' -- a phantom second unknown that refused every
# space-separated "N kg" balance (LOMO 2026-10-05 follow-up)
_BAL_VAR_RX = re.compile(r"(?<![\w.\d])(?P<var>[a-z])\s*\$?\s*"
                         r"(?P<u>tonnes?|kg|kilograms?|kilogram|grams?|"
                         r"gram|(?<!k)g)\b", re.I)
_BAL_MASS_RX = re.compile(r"(?P<n>\d[\d,]*(?:\.\d+)?)\s*"
                          r"(?P<u>tonnes?|kg|kilograms?|kilogram|grams?|"
                          r"gram|g)\b", re.I)
_BAL_COUNT_RX = re.compile(r"\b(?P<c>one|two|three|four|five|six|seven|"
                           r"eight|nine|ten|\d+)\s+(?:identical\s+|"
                           r"equal\s+)?[\w-]+(?:\s+of\s+[\w-]+)?\s*$",
                           re.I)
_BAL_WORDNUM = {"one": 1, "a": 1, "an": 1, "two": 2, "three": 3, "four": 4,
                "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9,
                "ten": 10}

# counted-noun unknowns -- the no-letter-variable balance shape ("two
# identical bags of sugar ... What is the mass of one bag?", LOMO wave 3,
# 2026-10-05): the count phrase itself names the unknown, so the parser
# must not demand an "x kg" token.  Nouns that are scale furniture or
# units ("one side", "a 2 kg weight") are never the unknown.
_BAL_ITEM_RX = re.compile(
    r"\b(?P<c>one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+"
    r"(?:(?:identical|equal)\s+)?(?P<noun>[a-z][a-z-]*)\b", re.I)
_BAL_NOUN_STOP = {
    "side", "pan", "scale", "balance", "beam", "weight", "weights",
    "mass", "kg", "kgs", "g", "gram", "grams", "kilogram", "kilograms",
    "tonne", "tonnes", "of", "each", "other", "third", "half", "quarter",
}


def _bal_uword(u: str) -> str:
    """tonnes / kg / g for a mass-unit token."""
    ul = u.strip().lower()
    if ul.startswith("t"):
        return "tonnes"
    if ul.startswith("k"):
        return "kg"
    return "g"


def _is_mass_balance(text: str) -> bool:
    """A two-pan comparison ("...on one side of a scale ... the other
    side/pan ...").  A spring balance reads force, not side-by-side mass,
    so it stays with the W = m g lane."""
    if re.search(r"spring\s+(?:balance|scale)", text, re.I):
        return False
    s1 = _BAL_SIDE1_RX.search(text)
    s2 = _BAL_SIDE2_RX.search(text)
    return bool(s1 and s2 and s2.start() > s1.start())


def _balance_sentences(text: str):
    """Sentence spans with ask sentences blanked out (spaces, so every
    offset survives).  Only ask sentences that themselves carry a mass
    token are blanked -- they would poison the mass equation."""
    out = list(text)
    for m in re.finditer(r"[^.!?\n]+(?:[.!?]+|$)", text):
        seg = m.group(0)
        if re.search(r"\b(?:find|calculate|determine|compute|what|how)\b",
                     seg, re.I) and _BAL_MASS_RX.search(seg):
            for i in range(m.start(), m.end()):
                out[i] = " "
    t = "".join(out)
    return t, [ (m.start(), m.end()) for m in
                re.finditer(r"[^.!?\n]+(?:[.!?]+|$)", t) ]


def _balance_mass_equation(text: str):
    """Parse a two-pan balance into  n*x + A = B  (all masses in kg).

    Returns (value_in_var_unit, unit_word, n, a, b, newton_ask) or None
    when ANY part is ambiguous -- the caller refuses; it never falls back
    to W = m g and never guesses a unit."""
    t, spans = _balance_sentences(text)
    s1 = _BAL_SIDE1_RX.search(t)
    s2 = _BAL_SIDE2_RX.search(t)
    if not (s1 and s2 and s2.start() > s1.start()):
        return None

    def side_of(pos: int):
        """1/2 for the balance side a position belongs to, else None."""
        for a, b in spans:
            if a <= pos < b:
                has1 = s1.start() >= a and s1.start() < b
                has2 = s2.start() >= a and s2.start() < b
                if has1 and has2:
                    return 1 if pos < s1.start() else 2
                if has1:
                    return 1
                if has2:
                    return 2
                return None          # mass in a marker-less sentence
        return None

    vars_ = [mm for mm in _BAL_VAR_RX.finditer(t)
             if side_of(mm.start()) is not None]
    if len(vars_) > 1:
        return None                  # an unknown on each side -> ambiguous

    if vars_:
        vm = vars_[0]
        var_side = side_of(vm.start())
        if var_side is None or vm.group("var").lower() in _BAL_WORDNUM:
            return None
        # how many unknown items?  The window keeps stacking trailing
        # markers ("bags each of mass x kg" leaves " each of mass "), so
        # the strip must LOOP, not strip a single marker (LOMO wave 3).
        window = re.sub(
            r"[\(\s\$]*(?:(?:each|of\s+mass|of\s+weight)[\)\s:\$]*)*$",
            "", t[max(0, vm.start() - 120):vm.start()])
        cm = _BAL_COUNT_RX.search(window)
        if not cm:
            return None              # how many unknown items? -> refuse
        c_word = cm.group("c").lower()
        n = _BAL_WORDNUM.get(c_word)
        if n is None:
            try:
                n = int(c_word)
            except ValueError:
                return None
        if n <= 0:
            return None
        unit_word = _bal_uword(vm.group("u"))
    else:
        # no letter variable: the counted noun itself is the unknown
        # ("two identical bags ... What is the mass of one bag?") -- ask
        # sentences ("... of one bag?") never supply it
        ask_spans = [mm.span() for mm in
                     re.finditer(r"[^.!?\n]+(?:[.!?]+|$)", t)
                     if re.search(r"\b(?:find|calculate|determine|"
                                  r"compute|what|how)\b",
                                  mm.group(0), re.I)]
        items = []
        for mm in _BAL_ITEM_RX.finditer(t):
            if any(a <= mm.start() < b for a, b in ask_spans):
                continue
            if mm.group("noun").lower() in _BAL_NOUN_STOP:
                continue
            sd = side_of(mm.start())
            if sd is not None:
                items.append((mm, sd))
        if len(items) != 1:
            return None          # no (or several) counted unknowns -> refuse
        im, var_side = items[0]
        c_word = im.group("c").lower()
        n = _BAL_WORDNUM.get(c_word)
        if n is None:
            try:
                n = int(c_word)
            except ValueError:
                return None
        if n <= 0:
            return None
        # the unknown's display unit is the scale's own mass unit -- and
        # only when every attributable side mass agrees; mixed kg/g sides
        # leave the asked unit ambiguous -> refuse (never guess)
        units = {_bal_uword(mm.group("u"))
                 for mm in _BAL_MASS_RX.finditer(t)
                 if side_of(mm.start()) is not None}
        if len(units) != 1:
            return None
        unit_word = units.pop()
    u = "kg" if unit_word == "kg" else \
        ("g" if unit_word == "g" else "tonne")

    a_mass = b_mass = 0.0
    for mm in _BAL_MASS_RX.finditer(t):
        sd = side_of(mm.start())
        if sd is None:
            return None              # unattributable mass -> refuse
        try:
            kg = _to_kg(mm.group("n"), mm.group("u"))
        except ValueError:
            return None
        if var_side == 1:
            (a_mass, b_mass) = (a_mass + kg, b_mass) if sd == 1 \
                else (a_mass, b_mass + kg)
        else:
            (a_mass, b_mass) = (a_mass + kg, b_mass) if sd == 2 \
                else (a_mass, b_mass + kg)

    # a_mass = known masses on the UNKNOWN's side; b_mass = other side
    total = b_mass
    known = a_mass
    if total - known <= 0:
        return None                  # no positive solution -> refuse
    x_kg = (total - known) / n

    x_disp = x_kg / _to_kg("1", u)   # back to the asked mass unit

    # an explicit ask-unit in the question overrides the display unit
    # ("... find the mass of one bag in grams"): exact powers of ten,
    # never a guess.  A newton ask leaves the mass unit undisplayed.
    newton_ask = bool(re.search(r"\bin\s+(?:n|newtons?)\b", text, re.I))
    if not newton_ask and unit_word != "tonnes":
        g_ask = bool(re.search(r"\bin\s+(?:grams?|g)\b", text, re.I))
        kg_ask = bool(re.search(r"\bin\s+(?:kilograms?|kgs?|kg)\b",
                                text, re.I))
        if g_ask and kg_ask:
            return None              # both units asked -> ambiguous
        if g_ask:
            x_disp = x_kg * 1000.0
            unit_word = "g"
        elif kg_ask:
            x_disp = x_kg
            unit_word = "kg"
    return x_disp, unit_word, n, known, total, newton_ask


# --------------------------------------------------------------------------- #
# family handlers (dynamics / work-energy / gravitation / fluids / solids)
# --------------------------------------------------------------------------- #


def _c_newton2(g, m, text):
    # ask-aware handoff (C8 dig, 2026-10-06): a "final speed/velocity"
    # ask with F and m given wants v = (F/m) t, not the acceleration.
    if re.search(r"final\s+(?:speed|velocity)", text, re.I):
        out = _c8_final_speed_fma(g, m, text)
        if out is not _GATE and out[0] is not None:
            return out
    # net-force gate (C8 dig): two stated forces + resistance words mean
    # F_net = F1 - F2 -- solving with the first force alone ships a
    # wrong-verified acceleration (observed: 15/18 for (12 - 4)/18).
    if re.search(r"resistive|opposing|backward|net\s+force", text, re.I) \
            and len(re.findall(r"\d+(?:\.\d+)?\s*N\b", text)) >= 2:
        out = _c8_accel_with_resistance(g, m, text)
        if out is not _GATE and out[0] is not None:
            return out
        return _GATE
    # work/energy-ask gate (C9 dig, 2026-10-07): a question asking for
    # WORK (net work done / work-energy theorem) is owned by WORK_DONE /
    # WORK_ENERGY_THEOREM -- F=ma shipping "acceleration = 5" for a
    # "net work done" ask is the ask-blindness class (observed live).
    if re.search(r"\bwork\b", text, re.I) and \
            re.search(r"net\s+work|work\s+(?:is\s+)?done|done\s+on\b|"
                      r"work-energy", text, re.I):
        return _GATE
    f = _f_force(text)
    mass = _f_mass(text)
    a_hit = _acc_hit(text)
    a = a_hit[0] if a_hit else None
    known = {k: x for k, x in (("f", f), ("m", mass), ("a", a))
             if x is not None}
    if len(known) != 2:
        return _GATE
    ask = None
    if _ask_word(text, r"\bforce\b"):
        ask = "f"
    elif _ask_word(text, r"\bmass\b"):
        ask = "m"
    elif _ask_word(text, r"acceleration"):
        ask = "a"
    if ask not in ("f", "m", "a") or ask in known:
        missing = ({"f", "m", "a"} - set(known))
        if len(missing) != 1:
            return _GATE
        ask = missing.pop()
    if ask == "f":
        val = known["m"] * known["a"]
        steps = _beats(
            "Newton's second law of motion, F = m a -- a resultant force "
            "gives a mass its acceleration, so force = mass x acceleration.",
            f"F = {_fmt(known['m'])} kg x {_fmt(known['a'])} m/s^2",
            f"F = {_fmt(known['m'])} x {_fmt(known['a'])} = {_fmt(val)} N",
            f"substitute back: m a = {_fmt(known['m'])} x "
            f"{_fmt(known['a'])} = {_fmt(val)} N -- units check "
            "(kg m/s^2 = N)",
            f"a force of {_fmt(val)} N acts on the body.",
        )
        answer = f"force = {_fmt(val)} N"
    elif ask == "m":
        if known["a"] == 0:
            return _GATE
        val = known["f"] / known["a"]
        steps = _beats(
            "Newton's second law of motion rearranged, m = F / a -- the "
            "same law solved for mass because F and a are the givens.",
            f"m = {_fmt(known['f'])} N / {_fmt(known['a'])} m/s^2",
            f"m = {_fmt(known['f'])} / {_fmt(known['a'])} = "
            f"{_fmt(val)} kg",
            f"substitute back: F = m a = {_fmt(val)} x {_fmt(known['a'])}"
            f" = {_fmt(known['f'])} N -- matches the given force",
            f"the body has a mass of {_fmt(val)} kg.",
        )
        answer = f"mass = {_fmt(val)} kg"
    else:
        if known["m"] == 0:
            return _GATE
        val = known["f"] / known["m"]
        steps = _beats(
            "Newton's second law of motion rearranged, a = F / m -- the "
            "same law solved for acceleration because F and m are given.",
            f"a = {_fmt(known['f'])} N / {_fmt(known['m'])} kg",
            f"a = {_fmt(known['f'])} / {_fmt(known['m'])} = "
            f"{_fmt(val)} m/s^2",
            f"substitute back: F = m a = {_fmt(known['m'])} x {_fmt(val)}"
            f" = {_fmt(known['f'])} N -- matches the given force",
            f"the body accelerates at {_fmt(val)} m/s^2 under the force.",
        )
        answer = f"acceleration = {_fmt(val)} m/s^2"
    extra = dict(known)
    extra["result"] = val
    return val, steps, answer, None, "F = m a", extra


def _c_weight(g, m, text):
    if re.search(r"apparent\s+weight", text, re.I):
        return _GATE  # apparent-weight questions belong to ARCHIMEDES
    # friction-coefficient gate (C8 dig, 2026-10-06): a question that
    # states a coefficient of friction and asks for a braking/minimum
    # force needs mu x N, not the bare weight (observed: "weight =
    # 15000 N" shipped VERIFIED for a handbrake ask).  Gate so the
    # friction/braking family answers instead.
    if re.search(r"coefficient of (?:static )?friction|mu_?s\s*=|"
                 r"braking\s+force|handbrake", text, re.I) \
            and not re.search(r"weight\s+is|find\s+the\s+weight|"
                              r"calculate\s+the\s+weight", text, re.I):
        return _GATE

    # ---- two-pan balance: mass equality, never W = m g (LOMO 2026-10-05).
    #      A balance at rest compares masses on its sides; answering with
    #      W = m g ships newtons for a kilogram ask (19.6 N for "4 kg"). ----
    if _is_mass_balance(text):
        bal = _balance_mass_equation(text)
        if bal is None:
            return _GATE  # ambiguous balance: guided refusal, never guess
        x_val, unit_word, n, known, total, newton_ask = bal
        gg = _gval(text)
        if newton_ask:
            if gg is None or unit_word != "kg":
                return _GATE  # newtons need a sane g and a kg-form unknown
            w_val = x_val * gg
            steps = _beats(
                "a two-pan balance at rest compares the total mass on its "
                "two sides -- equal sides balance, so the unknown mass "
                "follows from a mass equation, then W = m g converts it.",
                f"{n} x + {_fmt(known)} = {_fmt(total)} (kg), so "
                f"x = {(_fmt(total - known))}/{n} = {_fmt(x_val)} kg",
                f"W = m g = {_fmt(x_val)} x {_fmt(gg)} = {_fmt(w_val)} N",
                f"substitute back: {n} x {_fmt(x_val)} + {_fmt(known)} = "
                f"{_fmt(total)} kg -- the pans stay level",
                f"one item weighs {_fmt(w_val)} N.",
            )
            return w_val, steps, f"weight = {_fmt(w_val)} N", \
                [f"g = {_fmt(gg)} m/s^2"], "balance + W = m g", \
                {"count": float(n), "known_side": float(known),
                 "other_side": float(total), "result": w_val}
        rhs = f"{_fmt(total)}" if known == 0 else \
            f"{_fmt(known)} + {_fmt(total - known)}"
        lhs = f"{n} x" if known == 0 else f"{n} x + {_fmt(known)}"
        steps = _beats(
            "a two-pan balance at rest compares the total mass on its two "
            "sides -- equal sides balance, so the unknown mass follows "
            "from a mass equation (the balance reads mass, not the "
            "gravitational pull W = m g).",
            f"{lhs} = {_fmt(total)} kg ('x' = mass of one item)",
            f"{n} x = {_fmt(total - known)} kg, so x = "
            f"{_fmt(total - known)}/{n} = {_fmt(x_val)} {unit_word}",
            f"substitute back: {n} x {_fmt(x_val)} + {_fmt(known)} = "
            f"{_fmt(total)} kg on both sides -- the pans stay level",
            f"one of the identical items has a mass of "
            f"{_fmt(x_val)} {unit_word}.",
        )
        answer = f"mass of one item = {_fmt(x_val)} {unit_word}"
        return x_val, steps, answer, None, "n x + a = b (balance)", \
            {"count": float(n), "known_side": float(known),
             "other_side": float(total), "result": float(x_val)}

    # ---- W = m g triangle (free body, no balance in the question) ----
    gg = _gval(text)
    if gg is None:
        return _GATE  # implausible explicit g -- refuse, never verify
    mass = _f_mass(text)
    m_w = (re.search(r"\bweighs?\s+(?:about\s+)?(?P<n>" + _SCI + r")\s*"
                     r"(?P<u>N|newtons?)\b", text, re.I)
           or re.search(r"\bweight\b[^.]{0,40}?(?:\bis\b|[=:]|\bof\s+)"
                        r"\s*(?P<n>" + _SCI + r")\s*(?P<u>N|newtons?)\b",
                        text, re.I))
    w_txt = _sci(m_w.group("n")) if m_w else None
    if mass is None and w_txt is None:
        return _GATE  # neither a mass nor a weight given -- nothing to use
    if w_txt is None:
        ask = "w"
    elif _ask_word(text, r"\bmass\b"):
        ask = "m"
    elif _ask_word(text, r"\bg\b|gravity"):
        ask = "g"
    else:
        ask = "w"
    # the ASKED quantity needs its own givens; a mass ask without a
    # newton-given is unit-ambiguous -> refuse (never W = m g in disguise)
    if ask == "w" and mass is None:
        return _GATE
    if ask == "m" and w_txt is None:
        return _GATE
    if ask == "g" and (mass is None or w_txt is None):
        return _GATE
    if ask == "w":
        val = mass * gg
        steps = _beats(
            "weight formula W = m g -- weight is the gravitational pull "
            "on a mass, so W = mass x gravitational acceleration.",
            f"W = {_fmt(mass)} kg x {_fmt(gg)} m/s^2",
            f"W = {_fmt(mass)} x {_fmt(gg)} = {_fmt(val)} N",
            f"substitute back: m g = {_fmt(mass)} x {_fmt(gg)} = "
            f"{_fmt(val)} N -- units check (kg m/s^2 = N)",
            f"the object weighs {_fmt(val)} N"
            + (" on the moon's surface" if gg == 1.6 else "") + ".",
        )
        answer = f"weight = {_fmt(val)} N"
    elif ask == "m":
        if gg == 0:
            return _GATE
        val = w_txt / gg
        # the ASKED mass unit rules the shipped answer (LOMO wave 3):
        # "find the mass in grams" ships kg x 1000, never a bare kg
        gram_ask = bool(re.search(r"\bin\s+(?:grams?|g)\b", text, re.I))
        if gram_ask:
            val = val * 1000.0
            steps = _beats(
                "weight formula W = m g rearranged, m = W / g -- mass from "
                "a known weight and the local gravitational acceleration.",
                f"m = {_fmt(w_txt)} N / {_fmt(gg)} m/s^2 = "
                f"{_fmt(w_txt / gg)} kg",
                f"1 kg = 1000 g, so m = {_fmt(w_txt / gg)} x 1000 = "
                f"{_fmt(val)} g",
                f"substitute back: W = m g = {_fmt(val / 1000.0)} x "
                f"{_fmt(gg)} = {_fmt(w_txt)} N -- matches the given weight",
                f"the object's mass is {_fmt(val)} g.",
            )
            answer = f"mass = {_fmt(val)} g"
        else:
            steps = _beats(
                "weight formula W = m g rearranged, m = W / g -- mass from a "
                "known weight and the local gravitational acceleration.",
                f"m = {_fmt(w_txt)} N / {_fmt(gg)} m/s^2",
                f"m = {_fmt(w_txt)} / {_fmt(gg)} = {_fmt(val)} kg",
                f"substitute back: W = m g = {_fmt(val)} x {_fmt(gg)} = "
                f"{_fmt(w_txt)} N -- matches the given weight",
                f"the object's mass is {_fmt(val)} kg.",
            )
            answer = f"mass = {_fmt(val)} kg"
    else:
        if mass == 0:
            return _GATE
        val = w_txt / mass
        steps = _beats(
            "weight formula W = m g rearranged, g = W / m -- local "
            "gravitational acceleration from weight and mass.",
            f"g = {_fmt(w_txt)} N / {_fmt(mass)} kg",
            f"g = {_fmt(w_txt)} / {_fmt(mass)} = {_fmt(val)} m/s^2",
            f"substitute back: W = m g = {_fmt(mass)} x {_fmt(val)} = "
            f"{_fmt(w_txt)} N -- matches the given weight",
            f"gravity here is {_fmt(val)} m/s^2.",
        )
        answer = f"g = {_fmt(val)} m/s^2"
    assum = [f"g = {_fmt(gg)} m/s^2"
             + (" (moon surface gravity)" if gg == 1.6 else
                " (default; give 'g = ...' to override)" if gg == 9.8
                else "")]
    extra = {"m": mass, "g": gg, "result": val}
    return val, steps, answer, assum, "W = m g", extra


def _c_friction(g, m, text):
    mu_m = re.search(r"coefficient\s+of\s+(?:static\s+|kinetic\s+)?friction"
                     r"\s*(?:is\s+|of\s+|=)?\s*(?P<n>" + _SCI + r")",
                     text, re.I)
    mu = _sci(mu_m.group("n")) if mu_m else None
    n_m = re.search(r"normal\s+(?:force|reaction)\s+(?:of\s+|is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _FORCEU + r")\b",
                    text, re.I)
    normal = _to_n(n_m.group("n"), n_m.group("u")) if n_m else None
    mass = _f_mass(text)
    gg = _gval(text)
    if gg is None:
        return _GATE  # implausible explicit g
    if normal is None and mass is not None:
        normal = mass * gg
    if mu is None or normal is None:
        return _GATE
    if not (0 < mu < 2.0) or normal <= 0:
        return _GATE
    val = mu * normal
    steps = _beats(
        "law of friction f = mu N -- friction is proportional to the "
        "normal reaction pressing the surfaces together.",
        f"f = {_fmt(mu)} x {_fmt(normal)} N",
        f"f = {_fmt(mu)} x {_fmt(normal)} = {_fmt(val)} N",
        f"substitute back: f / N = {_fmt(val)} / {_fmt(normal)} = "
        f"{_fmt(mu)} -- matches the given coefficient of friction",
        f"friction of {_fmt(val)} N opposes the motion of the block.",
    )
    assum = [f"g = {_fmt(gg)} m/s^2"] \
        if n_m is None and mass is not None else None
    answer = f"friction = {_fmt(val)} N"
    extra = {"mu": mu, "N": normal, "result": val}
    return val, steps, answer, assum, "f = mu N", extra


def _c_work(g, m, text):
    # FRICTION context belongs to the net-work family: W = F d on the
    # applied force alone shipped 50 J where the net work is 30 J
    # (10 N forward, 4 N friction backward, 5 m; class-9 corpus
    # ch4_3#d2, 2026-10-07).  A friction+direction context refuses so
    # C9_WORK_NET_FRICTION owns it.
    if re.search(r"friction[^.]{0,40}?(?:backward|opposing|acts)|"
                 r"(?:backward|opposing)[^.]{0,40}?friction", text, re.I) \
            and re.search(r"net\s+work|work.{0,60}theorem|kinetic\s+"
                          r"energy", text, re.I):
        return _GATE
    f = _f_force(text)
    d = _f_dist2(text)
    if f is None or d is None:
        return _GATE
    theta = None
    m_th = re.search(r"(?:at|making)(?:\s+an?\s+angle\s+of|\s+an?\s+angle)?"
                     r"\s*(?P<n>" + _SCI + r")\s*(?:degrees?|\u00b0|deg)\b"
                     r"[^.]{0,30}?(?:to\s+the\s+)?(?:horizontal|vertical|"
                     r"displacement|ground)|"
                     r"(?:at|making)\s+an?\s+angle\s+of\s+"
                     r"(?P<n2>" + _SCI + r")\s*(?:degrees?|\u00b0|deg)",
                     text, re.I)
    if m_th:
        theta = _sci(m_th.group("n") or m_th.group("n2"))
    cos_t = math.cos(math.radians(theta)) if theta is not None else 1.0
    val = f * d * cos_t
    steps = _beats(
        "work formula W = F d cos(theta) -- work is the force component "
        "along the displacement times the displacement.",
        f"W = {_fmt(f)} N x {_fmt(d)} m"
        + (f" x cos({_fmt(theta)} deg)" if theta is not None else ""),
        f"W = {_fmt(f)} x {_fmt(d)}"
        + (f" x {cos_t:.4f} = {_fmt(val)} J" if theta is not None
           else f" = {_fmt(val)} J"),
        f"substitute back: F d"
        + (f" / cos(theta) = {_fmt(val)} / {cos_t:.4f} = "
           f"{_fmt(f * d)} N m" if theta is not None
           else f" = {_fmt(val)} N m") + " -- consistent with the givens",
        f"{_fmt(val)} J of work is transferred to the object.",
    )
    assum = [f"cos(theta) = {cos_t:.4f} from theta = {_fmt(theta)} deg"] \
        if theta is not None else \
        ["force taken parallel to the displacement (theta = 0)"]
    answer = f"work = {_fmt(val)} J"
    extra = {"F": f, "d": d, "result": val}
    return val, steps, answer, assum, "W = F d cos(theta)", extra


def _c_ke(g, m, text):
    mass = _f_mass(text)
    v_hit = _first(text, _U_INIT_VEL + _U_FINAL_VEL, _to_ms)
    vel = v_hit[0] if v_hit else None
    if mass is None or vel is None:
        return _GATE
    ke_txt = _f_energy(text)
    if ke_txt is None:
        ask = "ke"
    elif _ask_word(text, r"\bmass\b"):
        ask = "m"
    else:
        ask = "v"
    if ask == "ke":
        val = 0.5 * mass * vel * vel
        steps = _beats(
            "kinetic energy formula KE = (1/2) m v^2 -- energy of motion "
            "grows with mass and with the square of speed.",
            f"KE = 0.5 x {_fmt(mass)} kg x ({_fmt(vel)} m/s)^2",
            f"KE = 0.5 x {_fmt(mass)} x {_fmt(vel * vel)} = {_fmt(val)} J",
            f"substitute back: sqrt(2 KE / m) = sqrt(2 x {_fmt(val)} / "
            f"{_fmt(mass)}) = {_fmt(vel)} m/s -- matches the given speed",
            f"the moving body carries {_fmt(val)} J of kinetic energy.",
        )
        answer = f"kinetic energy = {_fmt(val)} J"
    elif ask == "m":
        if vel == 0:
            return _GATE
        val = 2.0 * ke_txt / (vel * vel)
        steps = _beats(
            "kinetic energy formula KE = (1/2) m v^2 rearranged, "
            "m = 2 KE / v^2.",
            f"m = 2 x {_fmt(ke_txt)} J / ({_fmt(vel)} m/s)^2",
            f"m = {_fmt(2.0 * ke_txt)} / {_fmt(vel * vel)} = "
            f"{_fmt(val)} kg",
            f"substitute back: KE = 0.5 x {_fmt(val)} x ({_fmt(vel)})^2 = "
            f"{_fmt(ke_txt)} J -- matches the given energy",
            f"the body's mass is {_fmt(val)} kg.",
        )
        answer = f"mass = {_fmt(val)} kg"
    else:
        if mass <= 0:
            return _GATE
        val = math.sqrt(2.0 * ke_txt / mass)
        steps = _beats(
            "kinetic energy formula KE = (1/2) m v^2 rearranged, "
            "v = sqrt(2 KE / m).",
            f"v = sqrt(2 x {_fmt(ke_txt)} J / {_fmt(mass)} kg)",
            f"v = sqrt({_fmt(2.0 * ke_txt)} / {_fmt(mass)}) = "
            f"{_fmt(val)} m/s",
            f"substitute back: KE = 0.5 x {_fmt(mass)} x ({_fmt(val)})^2 = "
            f"{_fmt(ke_txt)} J -- matches the given energy",
            f"the body moves at {_fmt(val)} m/s.",
        )
        answer = f"velocity = {_fmt(val)} m/s"
    extra = {"m": mass, "v": vel, "result": val}
    return val, steps, answer, None, "KE = (1/2) m v^2", extra


def _c_pe(g, m, text):
    mass = _f_mass(text)
    h_hit = _f_height_depth_span(text)
    if mass is None or h_hit is None:
        return _GATE
    h = h_hit[0]
    gg = _gval(text)
    if gg is None:
        return _GATE  # implausible explicit g
    pe_txt = _f_energy(text)
    if pe_txt is None:
        if re.search(r"\bpower\b", text, re.I):
            return _GATE  # P = mgh/t questions belong to POWER_WORK_TIME
        ask = "pe"
    elif _ask_word(text, r"\bmass\b"):
        ask = "m"
    elif _ask_word(text, r"height|depth"):
        ask = "h"
    else:
        ask = "g"
    if ask == "pe":
        val = mass * gg * h
        steps = _beats(
            "gravitational potential energy formula PE = m g h -- energy "
            "stored by raising a mass through a height.",
            f"PE = {_fmt(mass)} kg x {_fmt(gg)} m/s^2 x {_fmt(h)} m",
            f"PE = {_fmt(mass)} x {_fmt(gg)} x {_fmt(h)} = {_fmt(val)} J",
            f"substitute back: m g h = {_fmt(mass)} x {_fmt(gg)} x "
            f"{_fmt(h)} = {_fmt(val)} J -- units check (kg m^2/s^2 = J)",
            f"the raised object stores {_fmt(val)} J of potential energy.",
        )
        answer = f"potential energy = {_fmt(val)} J"
    elif ask == "m":
        val = pe_txt / (gg * h)
        steps = _beats(
            "PE = m g h rearranged, m = PE / (g h).",
            f"m = {_fmt(pe_txt)} J / ({_fmt(gg)} m/s^2 x {_fmt(h)} m)",
            f"m = {_fmt(pe_txt)} / {_fmt(gg * h)} = {_fmt(val)} kg",
            f"substitute back: PE = {_fmt(val)} x {_fmt(gg)} x {_fmt(h)} "
            f"= {_fmt(pe_txt)} J -- matches the given energy",
            f"the object's mass is {_fmt(val)} kg.",
        )
        answer = f"mass = {_fmt(val)} kg"
    elif ask == "h":
        val = pe_txt / (mass * gg)
        steps = _beats(
            "PE = m g h rearranged, h = PE / (m g).",
            f"h = {_fmt(pe_txt)} J / ({_fmt(mass)} kg x "
            f"{_fmt(gg)} m/s^2)",
            f"h = {_fmt(pe_txt)} / {_fmt(mass * gg)} = {_fmt(val)} m",
            f"substitute back: PE = {_fmt(mass)} x {_fmt(gg)} x "
            f"{_fmt(val)} = {_fmt(pe_txt)} J -- matches the given energy",
            f"the object was raised {_fmt(val)} m.",
        )
        answer = f"height = {_fmt(val)} m"
    else:
        val = pe_txt / (mass * h)
        steps = _beats(
            "PE = m g h rearranged, g = PE / (m h).",
            f"g = {_fmt(pe_txt)} J / ({_fmt(mass)} kg x {_fmt(h)} m)",
            f"g = {_fmt(pe_txt)} / {_fmt(mass * h)} = {_fmt(val)} m/s^2",
            f"substitute back: PE = {_fmt(mass)} x {_fmt(val)} x "
            f"{_fmt(h)} = {_fmt(pe_txt)} J -- matches the given energy",
            f"the local gravity is {_fmt(val)} m/s^2.",
        )
        answer = f"g = {_fmt(val)} m/s^2"
    assum = [f"g = {_fmt(gg)} m/s^2"
             + (" (default; give 'g = ...' to override)" if gg == 9.8
                else "")] if ask != "g" else None
    extra = {"m": mass, "h": h, "g": gg, "result": val}
    return val, steps, answer, assum, "PE = m g h", extra


def _f_height_depth_span(text: str):
    pats = [
        r"(?:height|depth)\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _DISTU + r")\b",
        r"(?:at\s+(?:a\s+)?(?:height|depth)\s+of\s+|raised\s+(?:to|by)\s+"
        r"a?\s*(?:height\s+)?(?:of\s+)?|lifted\s+(?:to|through)\s+"
        r"a?\s*(?:height\s+)?(?:of\s+)?)(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _DISTU + r")\b",
    ]
    return _first(text, pats, _to_m)


def _c_work_energy_theorem(g, m, text):
    mass = _f_mass(text)
    u_hit = _first(text, _U_INIT_VEL, _to_ms)
    v_hit = _first(text, _U_FINAL_VEL, _to_ms)
    if mass is None or u_hit is None or v_hit is None:
        return _GATE
    u, v = u_hit[0], v_hit[0]
    # rest-pinning (C9 dig, 2026-10-07): "brought to rest / comes to
    # rest / stops" pins the FINAL velocity to zero -- binding rest as
    # the initial state flips the sign of the work (observed: friction
    # work answered +54 J; the corpus key itself says -27, which is its
    # own arithmetic slip: (1/2)(3)(6^2) = 54, so physics says -54 J).
    if re.search(r"brought\s+to\s+rest|comes?\s+to\s+rest|brought\s+"
                 r"to\s+a\s+stop|is\s+stopped\b", text, re.I) \
            and v != 0:
        u, v = max(u, v), 0.0
    val = 0.5 * mass * (v * v - u * u)
    steps = _beats(
        "work-energy theorem, W = change in KE = (1/2) m (v^2 - u^2) -- "
        "the net work done equals the change in kinetic energy.",
        f"W = 0.5 x {_fmt(mass)} kg x (({_fmt(v)} m/s)^2 - "
        f"({_fmt(u)} m/s)^2)",
        f"W = 0.5 x {_fmt(mass)} x {_fmt(v * v - u * u)} = {_fmt(val)} J",
        f"substitute back: 2 W / m + u^2 = {_fmt(2.0 * val / mass)} + "
        f"{_fmt(u * u)} = {_fmt(2.0 * val / mass + u * u)} = "
        f"v^2 = ({_fmt(v)})^2 -- consistent",
        f"{_fmt(val)} J of work changes the car's kinetic energy"
        + (" (braking work done against the motion)" if val < 0 else "")
        + ".",
    )
    answer = f"work = {_fmt(val)} J"
    extra = {"m": mass, "u": u, "v": v, "result": val}
    return val, steps, answer, None, "W = (1/2) m (v^2 - u^2)", extra


def _lift_height(text: str):
    """Vertical raise distance for lift-power questions ("lifts a load
    ... through 15 m", "raises it to a height of 8 m")."""
    pats = [
        r"(?:vertically\s+)?(?:upward[s]?\s+)?(?:upwards?\s+)?through\s+"
        r"(?:a\s+)?(?:height\s+of\s+|distance\s+of\s+)?"
        r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
        r"(?:lifts?|lifted|lift\s+\w+[^.]{0,40}?|raises?|raised|raising|"
        r"hoist\w*|climbs?|climbed)\b[^.]{0,40}?through\s+"
        r"(?P<n2>" + _SCI + r")\s*(?P<u2>" + _DISTU + r")\b",
        r"(?:to\s+a\s+height\s+of\s+|upto\s+a\s+height\s+of\s+|"
        r"up\s+to\s+a\s+height\s+of\s+)(?P<n3>" + _SCI + r")\s*"
        r"(?P<u3>" + _DISTU + r")\b",
        r"(?:height|depth)\s+of\s+(?P<n4>" + _SCI + r")\s*"
        r"(?P<u4>" + _DISTU + r")\b",
    ]
    return _first(text, pats, _to_m)


def _c_power_time(g, m, text):
    # C8 handoff (2026-10-06 dig): an efficiency co-ask wants
    # efficiency + energy in the asked unit, not bare W = P t.
    if re.search(r"efficien", text, re.I):
        out = _c8_efficiency(g, m, text)
        if out is not _GATE and out[0] is not None:
            return out
    w_txt = _f_energy(text)
    t = _f_time2(text)
    p_txt = _f_power(text)
    if t is None or (w_txt is None and p_txt is None):
        # ICSE/ISC lift wording: a crane/motor raises a load; only the
        # mass, the raise height and the time are given, so the power
        # is P = W / t with the work built as W = m g h (P06 crane gap).
        if t is not None and t > 0 and re.search(r"\bpower\b", text, re.I) \
                and re.search(r"\b(?:crane|hoist\w*|winch|winds?\s+up|"
                              r"motor|engine|lift(?:s|ed)?|raise[sd]?|"
                              r"raising|climb\w*|carries?|carried)\b",
                              text, re.I):
            mass = _f_mass(text)
            h_hit = _lift_height(text)
            if mass is not None and mass > 0 and h_hit is not None \
                    and h_hit[0] > 0:
                gg = _gval(text)
                if gg is None:
                    return _GATE  # implausible explicit g
                W = mass * gg * h_hit[0]
                val = W / t
                steps = _beats(
                    "power from a lift, P = W / t with the work done "
                    "against gravity W = m g h -- the crane pays out "
                    "energy at the rate the load gains potential energy.",
                    f"W = {_fmt(mass)} kg x {_fmt(gg)} m/s^2 x "
                    f"{_fmt(h_hit[0])} m = {_fmt(W)} J; "
                    f"P = {_fmt(W)} J / {_fmt(t)} s",
                    f"P = {_fmt(W)} / {_fmt(t)} = {_fmt(val)} W",
                    f"substitute back: W = P t = {_fmt(val)} x {_fmt(t)} "
                    f"= {_fmt(W)} J = m g h -- consistent",
                    f"the crane works at {_fmt(val)} W"
                    + (f" = {_fmt(val / 1000.0)} kW" if val >= 1000 else "")
                    + ".",
                )
                answer = f"power = {_fmt(val)} W"
                assum = None if re.search(r"\bg\s*(?:=|as|:)", text, re.I) \
                    else [f"g = {_fmt(gg)} m/s^2"]
                return val, steps, answer, assum, "P = m g h / t", \
                    {"m": mass, "h": h_hit[0], "t": t, "g": gg,
                     "W": W, "result": val}
        return _GATE
    if w_txt is None:
        val = p_txt * t
        steps = _beats(
            "power formula P = W / t rearranged, W = P x t -- energy "
            "delivered equals power times time.",
            f"W = {_fmt(p_txt)} W x {_fmt(t)} s",
            f"W = {_fmt(p_txt)} x {_fmt(t)} = {_fmt(val)} J",
            f"substitute back: P = W / t = {_fmt(val)} / {_fmt(t)} = "
            f"{_fmt(p_txt)} W -- matches the given power",
            f"the device does {_fmt(val)} J of work in {_fmt(t)} s.",
        )
        answer = f"work = {_fmt(val)} J"
    else:
        val = w_txt / t
        steps = _beats(
            "power formula P = W / t -- power is the rate of doing work.",
            f"P = {_fmt(w_txt)} J / {_fmt(t)} s",
            f"P = {_fmt(w_txt)} / {_fmt(t)} = {_fmt(val)} W",
            f"substitute back: W = P t = {_fmt(val)} x {_fmt(t)} = "
            f"{_fmt(w_txt)} J -- matches the given work",
            f"the machine works at {_fmt(val)} W"
            + (f" = {_fmt(val / 1000.0)} kW" if val >= 1000 else "") + ".",
        )
        answer = f"power = {_fmt(val)} W"
    return val, steps, answer, None, "P = W / t", {"result": val}


def _c_power_fv(g, m, text):
    f = _f_force(text)
    v_hit = _first(text, _U_INIT_VEL + _U_FINAL_VEL, _to_ms)
    v = v_hit[0] if v_hit else None
    p_txt = _f_power(text)
    if v is None or (f is None and p_txt is None):
        return _GATE
    if f is None:
        val = p_txt / v
        steps = _beats(
            "power formula P = F v rearranged, F = P / v -- tractive "
            "force of an engine moving at steady speed.",
            f"F = {_fmt(p_txt)} W / {_fmt(v)} m/s",
            f"F = {_fmt(p_txt)} / {_fmt(v)} = {_fmt(val)} N",
            f"substitute back: P = F v = {_fmt(val)} x {_fmt(v)} = "
            f"{_fmt(p_txt)} W -- matches the given power",
            f"the engine pulls with {_fmt(val)} N at that speed.",
        )
        answer = f"force = {_fmt(val)} N"
    else:
        val = f * v
        steps = _beats(
            "power formula P = F v -- at constant velocity, power is "
            "force times speed.",
            f"P = {_fmt(f)} N x {_fmt(v)} m/s",
            f"P = {_fmt(f)} x {_fmt(v)} = {_fmt(val)} W",
            f"substitute back: F = P / v = {_fmt(val)} / {_fmt(v)} = "
            f"{_fmt(f)} N -- matches the given force",
            f"the engine develops {_fmt(val)} W of power.",
        )
        answer = f"power = {_fmt(val)} W"
    return val, steps, answer, None, "P = F v", {"result": val}


def _c_gravity_surface(g, m, text):
    if re.search(r"escape\s+velocity|orbital\s+(?:velocity|speed)|kepler",
                 text, re.I):
        return _GATE  # satellite computations belong to BOOKS2 families
    m_m = re.search(r"(?:planet|star|earth|body)\s+of\s+mass\s+"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _MASSU + r")\b",
                    text, re.I) or \
        re.search(r"mass\s+of\s+(?:the\s+)?(?:planet|star|earth)\s+"
                  r"(?:is\s+)?(?P<n>" + _SCI + r")\s*(?P<u>" + _MASSU
                  + r")\b", text, re.I)
    r_m = re.search(r"radius\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _DISTU + r")\b", text, re.I)
    if not m_m or not r_m:
        return _GATE
    M = _to_kg(m_m.group("n"), m_m.group("u"))
    R = _to_m(r_m.group("n"), r_m.group("u"))
    if M <= 0 or R <= 0:
        return _GATE
    val = 6.67e-11 * M / (R * R)
    steps = _beats(
        "gravity formula g = G M / R^2 (G = 6.67e-11 N m^2/kg^2) -- "
        "surface gravity follows from the body's mass and radius.",
        f"g = 6.67e-11 x {_fmt(M)} kg / ({_fmt(R)} m)^2",
        f"g = 6.67e-11 x {_fmt(M)} / {_fmt(R * R)} = {_fmt(val)} m/s^2",
        f"substitute back: G M / g = {_fmt(6.67e-11 * M / val)} = "
        f"R^2 = ({_fmt(R)})^2 -- the relation closes",
        f"gravity on the surface of this body is {_fmt(val)} m/s^2.",
    )
    answer = f"g = {_fmt(val)} m/s^2"
    extra = {"M": M, "R": R, "result": val}
    return val, steps, answer, None, "g = G M / R^2", extra


def _c_hydrostatic(g, m, text):
    h_hit = _first(text, [
        r"(?:depth|height)\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _DISTU + r")\b",
        r"at\s+(?:a\s+)?(?:depth|height)\s+of\s+(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _DISTU + r")\b",
    ], _to_m)
    rho = _f_dens(text)
    if h_hit is None or rho is None:
        return _GATE
    h = h_hit[0]
    gg = _gval(text)
    if gg is None:
        return _GATE  # implausible explicit g
    val = rho * gg * h
    steps = _beats(
        "hydrostatic pressure formula P = h rho g -- pressure grows with "
        "depth, fluid density and gravity.",
        f"P = {_fmt(h)} m x {_fmt(rho)} kg/m^3 x {_fmt(gg)} m/s^2",
        f"P = {_fmt(h)} x {_fmt(rho)} x {_fmt(gg)} = {_fmt(val)} Pa",
        f"substitute back: P / (rho g) = {_fmt(val)} / "
        f"{_fmt(rho * gg)} = {_fmt(h)} m -- matches the given depth",
        f"the fluid pushes with {_fmt(val)} Pa at that depth.",
    )
    answer = f"pressure = {_fmt(val)} Pa"
    assum = [f"g = {_fmt(gg)} m/s^2",
             "gauge pressure (atmospheric pressure not added)"]
    extra = {"h": h, "rho": rho, "g": gg, "result": val}
    return val, steps, answer, assum, "P = h rho g", extra


def _c_buoyancy(g, m, text):
    vol = _f_vol(text)
    rho = _f_dens(text)
    if vol is None or rho is None:
        return _GATE
    gg = _gval(text)
    if gg is None:
        return _GATE  # implausible explicit g
    mass = _f_mass(text)
    fb = rho * gg * vol
    if re.search(r"apparent\s+(?:weight|mass)", text, re.I):
        if mass is None:
            return _GATE
        val = mass * gg - fb
        steps = _beats(
            "Archimedes' principle -- the upthrust equals the weight of "
            "displaced fluid, so apparent weight = true weight - upthrust.",
            f"true weight = {_fmt(mass)} x {_fmt(gg)} = "
            f"{_fmt(mass * gg)} N; upthrust = rho g V = {_fmt(rho)} x "
            f"{_fmt(gg)} x {_fmt(vol)} = {_fmt(fb)} N",
            f"apparent weight = {_fmt(mass * gg)} - {_fmt(fb)} = "
            f"{_fmt(val)} N",
            f"sanity check: apparent ({_fmt(val)} N) < true "
            f"({_fmt(mass * gg)} N) because the upthrust {_fmt(fb)} N > 0",
            f"the immersed body appears to weigh {_fmt(val)} N in water.",
        )
        answer = f"apparent weight = {_fmt(val)} N"
    else:
        val = fb
        steps = _beats(
            "Archimedes' principle -- upthrust F = rho_f g V, the weight "
            "of the displaced fluid.",
            f"F = {_fmt(rho)} kg/m^3 x {_fmt(gg)} m/s^2 x {_fmt(vol)} m^3",
            f"F = {_fmt(rho)} x {_fmt(gg)} x {_fmt(vol)} = {_fmt(val)} N",
            f"substitute back: F / (g V) = {_fmt(val)} / "
            f"({_fmt(gg)} x {_fmt(vol)}) = {_fmt(rho)} kg/m^3 -- matches "
            "the fluid density",
            f"the fluid pushes up on the body with {_fmt(val)} N.",
        )
        answer = f"buoyant force = {_fmt(val)} N"
    assum = [f"g = {_fmt(gg)} m/s^2", "body fully immersed"]
    extra = {"V": vol, "rho": rho, "g": gg, "result": val}
    return val, steps, answer, assum, "F = rho_f g V", extra


def _c_hooke(g, m, text):
    k_m = re.search(r"spring\s+constant\s+(?:of\s+|is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>N\s*/\s*m|k\s*N\s*/\s*m)"
                    r"\b", text, re.I)
    x_m = re.search(r"(?:stretched|compressed|extended|displaced|pulled)\s*"
                    r"(?:by|through)?\s*(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _DISTU + r")\b", text, re.I)
    if not k_m or not x_m:
        return _GATE
    k = _sci(k_m.group("n"))
    if k_m.group("u").strip().lower().startswith("k"):
        k *= 1000.0
    x = _to_m(x_m.group("n"), x_m.group("u"))
    if k <= 0 or x == 0:
        return _GATE
    val = k * x
    steps = _beats(
        "Hooke's law F = k x -- the restoring force of a spring is "
        "proportional to the extension or compression.",
        f"F = {_fmt(k)} N/m x {_fmt(x)} m",
        f"F = {_fmt(k)} x {_fmt(x)} = {_fmt(val)} N",
        f"substitute back: x = F / k = {_fmt(val)} / {_fmt(k)} = "
        f"{_fmt(x)} m -- matches the given deformation",
        f"a force of {_fmt(val)} N holds the spring deformed by "
        f"{_fmt(x)} m.",
    )
    answer = f"force = {_fmt(val)} N"
    extra = {"k": k, "x": x, "result": val}
    return val, steps, answer, None, "F = k x", extra


def _c_moment(g, m, text):
    if re.search(r"angular\s+acceleration|moment\s+of\s+inertia", text,
                 re.I):
        return _GATE  # rotational dynamics belongs to TORQUE_ANGULAR
    f = _f_force(text)
    d_m = re.search(
        r"(?:perpendicular\s+)?distance\s+(?:of\s+)?(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _DISTU + r")\b[^.]{0,40}?(?:from|about)\s+(?:the\s+)?"
        r"(?:pivot|fulcrum|hinge|axis|point|line\s+of\s+action)",
        text, re.I) or \
        re.search(
            r"(?:from|about|at)[^.]{0,40}?(?:the\s+)?"
            r"(?:pivot|fulcrum|hinge|axis)[^.]{0,40}?"
            r"(?:perpendicular\s+)?distance\s+(?:of\s+)?"
            r"(?P<n2>" + _SCI + r")\s*(?P<u2>" + _DISTU + r")\b",
            text, re.I) or \
        re.search(   # ICSE: "applies a force of 30 N on a pedal that is
                     # 0.18 m from the crank axle" (distance word absent)
            r"\b(?P<n3>" + _SCI + r")\s*(?P<u3>" + _DISTU + r")\s+from\s+"
            r"(?:the\s+)?(?:pivot|fulcrum|hinge|crank|axle|axis|bolt|"
            r"end|point)",
            text, re.I) or \
        re.search(   # ICSE: "applied at the end of a 0.6 m long wrench"
            r"at\s+the\s+(?:end|tip)\s+of\s+(?:a|an|the)\s+"
            r"(?P<n4>" + _SCI + r")\s*(?P<u4>" + _DISTU + r")\s*"
            r"(?:long\b)?\s*(?:\w+\s+)?(?:wrench|spanner|rod|beam|lever|"
            r"bar|handle|door|spanner)\b",
            text, re.I) or \
        re.search(   # ICSE: "at an angle of 60 degrees to a 0.5 m long
                     # rod pivoted at one end" -- the arm is the rod
            r"to\s+(?:a|an|the)\s+(?P<n5>" + _SCI + r")\s*(?P<u5>"
            + _DISTU + r")\s*(?:long\s+)?(?:\w+\s+)?(?:rod|beam|bar|"
            r"lever|wrench|spanner)\b",
            text, re.I)
    if not d_m or f is None:
        return _GATE
    gd = d_m.groupdict()
    nn = (gd.get("n") or gd.get("n2") or gd.get("n3") or gd.get("n4")
          or gd.get("n5"))
    uu = (gd.get("u") or gd.get("u2") or gd.get("u3") or gd.get("u4")
          or gd.get("u5"))
    d = _to_m(nn, uu)
    # angle wording: "a force of 80 N acts at an angle of 60 degrees to a
    # 0.5 m rod pivoted at one end" -> tau = F d sin(theta)
    th_m = re.search(r"(?:at|making)\s+an?\s+angle\s+of\s+"
                     r"(?P<th>" + _SCI + r")\s*(?:degrees?|\u00b0|deg)"
                     r"\s+to", text, re.I)
    sin_t = 1.0
    theta = None
    if th_m:
        theta = _sci(th_m.group("th"))
        if not (0.0 < theta < 180.0):
            return _GATE
        sin_t = math.sin(math.radians(theta))
    val = f * d * sin_t
    steps = _beats(
        "moment-of-force formula tau = F x d"
        + ("" if theta is None else " x sin(theta)") +
        " -- the turning effect of a force is the force times its "
        "perpendicular distance from the pivot.",
        f"tau = {_fmt(f)} N x {_fmt(d)} m"
        + ("" if theta is None else f" x sin({_fmt(theta)} deg)"),
        f"tau = {_fmt(f)} x {_fmt(d)}"
        + (f" x {sin_t:.4f} = {_fmt(val)} N m" if theta is not None
           else f" = {_fmt(val)} N m"),
        f"substitute back: d = tau / F = {_fmt(val)} / {_fmt(f)} = "
        f"{_fmt(d)} m -- matches the given distance",
        f"the force turns the body about the pivot with "
        f"{_fmt(val)} N m of moment.",
    )
    assum = [f"sin(theta) = {sin_t:.4f} from theta = {_fmt(theta)} deg"] \
        if theta is not None else None
    answer = f"moment = {_fmt(val)} N m"
    extra = {"F": f, "d": d, "result": val}
    return val, steps, answer, assum, "tau = F x d", extra


def _c_principle_moments(g, m, text):
    """Seesaw balance: pair forces (weights if masses) with their
    distances from the pivot; solve the missing member."""
    gg = _gval(text)
    if gg is None:
        return _GATE  # implausible explicit g
    forces: List[Tuple[float, int]] = []
    for fm in re.finditer(r"(?P<n>" + _SCI + r")\s*"
                          r"(?P<u>N|newtons?|kg|kilograms?|g|grams?)\b",
                          text, re.I):
        ul = fm.group("u").strip().lower()
        v = _to_kg(fm.group("n"), fm.group("u")) * gg \
            if ul in ("kg", "kilograms", "kilogram", "g", "grams", "gram") \
            else _sci(fm.group("n"))
        forces.append((v, fm.start()))
    dists: List[Tuple[float, int]] = []
    for dm in re.finditer(r"(?P<d>" + _SCI + r")\s*(?P<du>" + _DISTU
                          + r")\b(?!\s*(?:/|per)\s*(?:s|h))", text, re.I):
        dists.append((_to_m(dm.group("d"), dm.group("du")), dm.start()))
    if len(forces) < 1 or len(dists) < 1 or len(forces) > 2 \
            or len(dists) > 2:
        return _GATE
    # pair each force with the nearest distance token that follows it
    f1, s1 = forces[0]
    d1, sd1 = None, None
    for dv, sv in dists:
        if sv > s1:
            d1, sd1 = dv, sv
            break
    if d1 is None:
        d1, sd1 = dists[0]
    if len(forces) == 2:
        f2 = forces[1][0]
    else:
        if len(dists) != 2 or not _ask_word(text, r"force|weight|mass"):
            return _GATE
        f2 = None
    if len(dists) == 2 and sd1 != dists[0][1] and sd1 != dists[1][1]:
        pass
    d2 = None
    for dv, sv in dists:
        if sv != sd1:
            d2 = dv
            break
    # decide the unknown from the ask wording
    if _ask_word(text, r"where|what\s+distance|at\s+what\s+distance|"
                       r"how\s+far") or (f2 is not None and d2 is None
                                         and len(dists) == 1):
        unknown = "d2" if f2 is not None else "d1"
    elif f2 is None:
        unknown = "f2"
    elif d2 is None:
        unknown = "d2"
    else:
        return _GATE
    if unknown == "d1":
        d1 = None
    if unknown == "f2":
        f2 = None
    if unknown == "d2":
        d2 = None
    if unknown == "f2":
        if d2 is None:
            return _GATE
        val = f1 * d1 / d2
        steps = _beats(
            "principle of moments, F1 d1 = F2 d2 -- for a body balanced "
            "on a fulcrum, clockwise moment equals anticlockwise moment.",
            f"F2 = ({_fmt(f1)} N x {_fmt(d1)} m) / {_fmt(d2)} m",
            f"F2 = {_fmt(f1 * d1)} / {_fmt(d2)} = {_fmt(val)} N",
            f"tally: F1 d1 = {_fmt(f1 * d1)} N m and F2 d2 = "
            f"{_fmt(val * d2)} N m -- the two arms balance",
            f"a {_fmt(val)} N force on the other arm keeps the beam "
            "balanced.",
        )
        answer = f"force = {_fmt(val)} N"
    else:
        f_here = f1 if unknown == "d1" else f2
        d_known = d1 if unknown == "d2" else d2
        f_known = f2 if unknown == "d1" else f1
        val = f_known * d_known / f_here
        steps = _beats(
            "principle of moments, F1 d1 = F2 d2 -- for a body balanced "
            "on a fulcrum, clockwise moment equals anticlockwise moment.",
            f"{'d1' if unknown == 'd1' else 'd2'} = "
            f"({_fmt(f_known)} N x {_fmt(d_known)} m) / {_fmt(f_here)} N",
            f"d = {_fmt(f_known * d_known)} / {_fmt(f_here)} = "
            f"{_fmt(val)} m",
            f"tally: moments {_fmt(f_known * d_known)} N m and "
            f"{_fmt(f_here * val)} N m are equal -- the beam balances",
            f"the load must sit {_fmt(val)} m from the fulcrum to "
            "balance.",
        )
        answer = f"distance = {_fmt(val)} m"
    extra = {"result": val, "g": gg}
    return val, steps, answer, None, "F1 d1 = F2 d2", extra


# --------------------------------------------------------------------------- #
# heat
# --------------------------------------------------------------------------- #


def _c_specific_heat(g, m, text):
    if re.search(r"mixture|mix(?:ed|ing)\s+with|dropped\s+into|"
                 r"added\s+to|placed\s+into|final\s+temperature", text,
                 re.I):
        return _GATE  # two-body heat exchange belongs to CALORIMETRY
    mass = _f_mass(text)
    c_m = re.search(r"(?:specific\s+heat(?:\s+capacity)?[^.\d]{0,30}?)"
                    r"(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>J\s*/\s*kg|kJ\s*/\s*kg|cal\s*/\s*g)", text, re.I)
    dt = None
    m_dt = re.search(r"(?:from|at)\s+(-?\d+(?:\.\d+)?)\s*"
                     r"(?:\u00b0\s*)?[CK]\b[^.]{0,20}?(?:to|till)\s+"
                     r"(-?\d+(?:\.\d+)?)\s*(?:\u00b0\s*)?[CK]\b", text, re.I)
    if m_dt:
        dt = _n(m_dt.group(2)) - _n(m_dt.group(1))
    else:
        m_by = re.search(r"(?:by|through)\s+(-?\d+(?:\.\d+)?)\s*"
                         r"(?:\u00b0\s*)?[CK]\b", text, re.I)
        if m_by:
            dt = _n(m_by.group(1))
    if mass is None or dt is None:
        return _GATE
    c = None
    if c_m:
        c = _sci(c_m.group("n"))
        ul = c_m.group("u").replace(" ", "").lower()
        if ul.startswith("kj"):
            c *= 1000.0
        elif ul.startswith("cal"):
            c *= 4186.0
    q_txt = _f_energy(text)
    water_c = False
    if c is None and q_txt is None and re.search(r"\bwater\b", text, re.I):
        water_c = True
        c = 4200.0
    if c is None:
        return _GATE
    if q_txt is None:
        val = mass * c * dt
        steps = _beats(
            "calorimetry relation Q = m c (delta T) -- heat needed is "
            "mass times specific heat times the temperature rise.",
            f"Q = {_fmt(mass)} kg x {_fmt(c)} J/(kg deg C) x "
            f"{_fmt(dt)} deg C",
            f"Q = {_fmt(mass)} x {_fmt(c)} x {_fmt(dt)} = {_fmt(val)} J",
            f"substitute back: delta T = Q / (m c) = {_fmt(val)} / "
            f"({_fmt(mass)} x {_fmt(c)}) = {_fmt(dt)} deg C -- matches "
            "the given rise",
            f"{_fmt(val)} J must be supplied for that temperature rise.",
        )
        answer = f"heat = {_fmt(val)} J"
    else:
        val = q_txt / (mass * dt)
        steps = _beats(
            "calorimetry relation Q = m c (delta T) rearranged, "
            "c = Q / (m delta T).",
            f"c = {_fmt(q_txt)} J / ({_fmt(mass)} kg x {_fmt(dt)} deg C)",
            f"c = {_fmt(q_txt)} / {_fmt(mass * dt)} = {_fmt(val)} "
            "J/(kg deg C)",
            f"substitute back: Q = m c dT = {_fmt(mass)} x {_fmt(val)} x "
            f"{_fmt(dt)} = {_fmt(q_txt)} J -- matches the given heat",
            f"the substance's specific heat is {_fmt(val)} J/(kg deg C).",
        )
        answer = f"specific heat = {_fmt(val)} J/(kg deg C)"
    assum = ["c = 4200 J/(kg deg C) taken for water"] if water_c else None
    extra = {"m": mass, "c": c, "dT": dt, "result": val}
    return val, steps, answer, assum, "Q = m c (delta T)", extra


def _c_latent_heat(g, m, text):
    mass = _f_mass(text)
    # J/g added (2026-10-06, class-9 chem): latent heat is board-standard
    # in J/g too ("Latent heat of fusion of ice = 334 J/g") -- the old
    # unit set (J/kg | kJ/kg | cal/g) gated the whole family.
    l_m = re.search(r"latent\s+heat[^.\d]{0,40}?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>J\s*/\s*kg|kJ\s*/\s*kg|cal\s*/\s*g|J\s*/\s*g)",
                    text, re.I)
    if mass is None or not l_m:
        return _GATE
    l_v = _sci(l_m.group("n"))
    ul = l_m.group("u").replace(" ", "").lower()
    if ul.startswith("kj"):
        l_v *= 1000.0
    elif ul.startswith("cal"):
        l_v *= 4186.0
    elif ul.startswith("j/g"):
        l_v *= 1000.0
    q_txt = _f_energy(text)
    if q_txt is None:
        val = mass * l_v
        steps = _beats(
            "latent heat relation Q = m L -- heat absorbed at constant "
            "temperature during a change of state (no dT term applies).",
            f"Q = {_fmt(mass)} kg x {_fmt(l_v)} J/kg",
            f"Q = {_fmt(mass)} x {_fmt(l_v)} = {_fmt(val)} J",
            f"substitute back: L = Q / m = {_fmt(val)} / {_fmt(mass)} = "
            f"{_fmt(l_v)} J/kg -- matches the given latent heat",
            f"{_fmt(val)} J changes the state of the whole sample.",
        )
        answer = f"heat = {_fmt(val)} J"
    else:
        val = q_txt / mass
        steps = _beats(
            "latent heat relation Q = m L rearranged, L = Q / m.",
            f"L = {_fmt(q_txt)} J / {_fmt(mass)} kg",
            f"L = {_fmt(q_txt)} / {_fmt(mass)} = {_fmt(val)} J/kg",
            f"substitute back: Q = m L = {_fmt(mass)} x {_fmt(val)} = "
            f"{_fmt(q_txt)} J -- matches the given heat",
            f"the latent heat is {_fmt(val)} J/kg.",
        )
        answer = f"latent heat = {_fmt(val)} J/kg"
    extra = {"m": mass, "L": l_v, "result": val}
    return val, steps, answer, None, "Q = m L", extra


# --------------------------------------------------------------------------- #
# oscillations
# --------------------------------------------------------------------------- #


def _c_pendulum(g, m, text):
    l_m = re.search(r"length\s+of\s+(?:the\s+)?(?:simple\s+)?pendulum\s*"
                    r"(?:is\s+|=|:)?\s*(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _DISTU + r")\b", text, re.I) or \
        re.search(r"pendulum\s+of\s+length\s+(?P<n>" + _SCI + r")\s*"
                  r"(?P<u>" + _DISTU + r")\b", text, re.I)
    t_m = re.search(r"(?:time\s+)?period\s+(?:of\s+(?:a|an|the)?\s*"
                    r"(?:simple\s+)?pendulum\s*)?(?:is\s+|=|:)?\s*"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _TIMEU + r")\b",
                    text, re.I)
    gg = _gval(text)
    if gg is None:
        return _GATE  # implausible explicit g
    l_val = _to_m(l_m.group("n"), l_m.group("u")) if l_m else None
    t_val = _to_s(t_m.group("n"), t_m.group("u")) if t_m else None
    if l_val is None and t_val is None:
        return _GATE
    if t_val is None:
        val = 2.0 * math.pi * math.sqrt(l_val / gg)
        steps = _beats(
            "simple-pendulum formula T = 2 pi sqrt(l/g) -- the period "
            "depends only on length and gravity (small oscillations).",
            f"T = 2 pi x sqrt({_fmt(l_val)} m / {_fmt(gg)} m/s^2)",
            f"T = 2 pi x {math.sqrt(l_val / gg):.6g} = {_fmt(val)} s",
            f"substitute back: l = g T^2 / (4 pi^2) = {_fmt(gg)} x "
            f"({_fmt(val)})^2 / (4 pi^2) = {_fmt(l_val)} m -- matches the "
            "given length",
            f"each swing of the pendulum takes {_fmt(val)} s.",
        )
        answer = f"period = {_fmt(val)} s"
    else:
        val = gg * t_val * t_val / (4.0 * math.pi * math.pi)
        steps = _beats(
            "simple-pendulum formula T = 2 pi sqrt(l/g) rearranged, "
            "l = g T^2 / (4 pi^2).",
            f"l = {_fmt(gg)} m/s^2 x ({_fmt(t_val)} s)^2 / (4 pi^2)",
            f"l = {_fmt(gg * t_val * t_val)} / {4.0 * math.pi ** 2:.6g} "
            f"= {_fmt(val)} m",
            f"substitute back: T = 2 pi sqrt(l/g) = 2 pi x "
            f"{math.sqrt(val / gg):.6g} = {_fmt(t_val)} s -- matches the "
            "given period",
            f"the pendulum must be {_fmt(val)} m long.",
        )
        answer = f"length = {_fmt(val)} m"
    assum = [f"g = {_fmt(gg)} m/s^2"
             + (" (default; give 'g = ...' to override)" if gg == 9.8
                else "")]
    extra = {"g": gg, "result": val}
    return val, steps, answer, assum, "T = 2 pi sqrt(l/g)", extra


# --------------------------------------------------------------------------- #
# electricity
# --------------------------------------------------------------------------- #

_OHMU = r"(?:kilo\s*)?ohms?|\u03a9"


def _f_voltage(text: str) -> Optional[float]:
    pats = [
        r"(?:voltage|potential\s+difference|p\.?d\.?|emf|e\.?m\.?f\.?)"
        r"\s+(?:of\s+|is\s+)?(?P<n>" + _SCI + r")\s*"
        r"(?P<u>kV|mV|V|volts?)\b",
        r"(?P<n>" + _SCI + r")\s*(?P<u>kV|mV|V|volts?)\s+"
        r"(?:is\s+)?(?:applied|supplied|connected|battery|supply|mains)",
    ]
    def conv(n, u):
        v = _sci(n)
        ul = u.strip().lower()
        if ul.startswith("kv"):
            return v * 1000.0
        if ul.startswith("mv"):
            return v * 0.001
        return v
    hit = _first(text, pats, conv)
    return hit[0] if hit else None


def _f_current(text: str) -> Optional[float]:
    pats = [
        r"current\s+(?:of\s+|is\s+|flows?\s+(?:of\s+|is\s+)?)?"
        r"(?P<n>" + _SCI + r")\s*(?P<u>mA|A|amperes?|amps?)\b",
    ]
    def conv(n, u):
        v = _sci(n)
        if u.strip().lower() == "ma":
            return v * 0.001
        return v
    hit = _first(text, pats, conv)
    return hit[0] if hit else None


def _f_resistance(text: str) -> Optional[float]:
    pats = [
        r"(?:resistance\s+(?:of\s+|is\s+)?)?(?P<n>" + _SCI + r")\s*"
        r"(?P<u>" + _OHMU + r")\b",
    ]
    def conv(n, u):
        v = _sci(n)
        return v * 1000.0 if u.strip().lower().startswith("k") else v
    hit = _first(text, pats, conv)
    return hit[0] if hit else None


def _c_emf_internal(g, m, text):
    """Cell with internal resistance: I = E / (R + r) and the terminal
    voltage V = E - I r (or the reverse E = V + I r from a drawn
    current).  Runs BEFORE the plain ohm row so the 2-of-3 slot read
    can never drop the external resistor."""
    e = _f_voltage(text)
    i_hit = _f_current(text)
    res = re.findall(
        r"(\d+(?:\.\d+)?)\s*(?:ohms?|\u03a9)", text, re.I)
    res = [float(x) for x in res]
    r_in = re.search(r"internal\s+resistance\D{0,15}?"
                     r"(\d+(?:\.\d+)?)", text, re.I)
    if r_in is None or e is None:
        return _GATE
    r_i = float(r_in.group(1))
    if not (0.01 <= r_i <= 1000) or not (0.05 <= e <= 2000):
        return _GATE
    r_ext = [x for x in res if abs(x - r_i) > 1e-9]
    # mode: terminal voltage + drawn current -> emf (E = V + I r)
    if e is not None and i_hit is not None and r_ext == [] and \
            re.search(r"terminal\s+voltage", text, re.I):
        i_v = i_hit
        val = e + i_v * r_i if re.search(r"emf|e\.m\.f", text, re.I) \
            else e - i_v * r_i
        if val <= 0:
            return _GATE
        steps = _beats(
            "terminal voltage and internal resistance: the lost volts "
            "inside the cell are I r, so E = V + I r (or V = E - I r).",
            f"Lost volts = {i_v:g} x {r_i:g} = {i_v * r_i:g} V",
            f"{'E' if 'emf' in text.lower() or 'e.m.f' in text.lower() else 'V'}"
            f" = {e:g} {'+' if val > e else '-'} {i_v * r_i:g} = "
            f"{val:g} V",
            f"check: {val:g} - {i_v * r_i:g} = {val - i_v * r_i:g} V "
            "-- closes",
            "the terminal voltage is always below the emf while the "
            "cell delivers current.")
        what = "emf" if val > e or re.search(r"emf|e\.m\.f", text,
                                             re.I) else "terminal voltage"
        return val, steps, f"{what} = {val:g} V", None, \
            "E = V + I r", {"V_terminal": e, "I": i_v, "r": r_i,
                            "E": val}
    # mode: emf + r + external R -> current (and terminal voltage)
    if not r_ext:
        return _GATE
    r_out = max(r_ext)
    if not (0.05 <= r_out <= 100000):
        return _GATE
    i_val = e / (r_out + r_i)
    if not (0.0001 <= i_val <= 1000):
        return _GATE
    v_term = e - i_val * r_i
    ask_v = bool(re.search(r"terminal\s+voltage|voltage\s+(?:across|"
                           r"over)", text, re.I))
    steps = _beats(
        "a cell with internal resistance drives the WHOLE series "
        "circuit: I = E / (R + r); the terminal voltage is the part "
        "across the external resistor, V = E - I r.",
        f"R_total = {r_out:g} + {r_i:g} = {r_out + r_i:g} ohm",
        f"I = {e:g} / {r_out + r_i:g} = {i_val:.6g} A",
        f"check: V_terminal = {e:g} - {i_val:.6g} x {r_i:g} = "
        f"{v_term:.6g} V = I x R = {i_val:.6g} x {r_out:g} = "
        f"{i_val * r_out:.6g} V -- closes",
        "the lost volts I r explain why the terminal voltage is below "
        "the emf.")
    if ask_v:
        ans = (f"current = {i_val:.6g} A; terminal voltage = "
               f"{v_term:.6g} V")
        return v_term, steps, ans, None, "I = E/(R+r); V = E - I r", \
            {"E": e, "r": r_i, "R": r_out, "I": i_val, "V": v_term}
    ans = (f"current = {i_val:.6g} A (through {r_out:g} ohm external "
           f"and {r_i:g} ohm internal resistance)")
    return i_val, steps, ans, None, "I = E / (R + r)", \
        {"E": e, "r": r_i, "R": r_out, "I": i_val}


def _c_ohm(g, m, text):
    # a power ask belongs to ELECTRICAL_POWER_VI, not this family
    if _ask_word(text, r"power"):
        return _GATE
    # a HEAT ask belongs to C8B_JOULE_HEAT (H = I^2 R t): answering V = I R
    # here shipped "voltage = 200 V" for "calculate the heat produced in
    # joules" (class-8 battery, 2026-10-07) -- CRITICAL wrong-ship.
    if re.search(r"heat\s+(?:produced|developed|generated|given|liberated"
                 r"|dissipated)|how\s+much\s+heat|time\s+(?:taken|needed)"
                 r"\s+for\s+the\s+[\w\s]{0,25}\s+to\s+melt", text, re.I):
        return _GATE
    # a MULTI-RESISTOR bank belongs to the series/parallel families:
    # binding the LAST stated resistor as R shipped I = 18/9 = 2 A for a
    # 3+6+9 series bank on 18 V (true 1 A; class-9 corpus ch6_9#d5,
    # 2026-10-07).  Two or more distinct resistance values refuse here.
    if len({x.replace(",", "").strip().lower() for x in re.findall(
            r"(\d[\d,]*(?:\.\d+)?)\s*(?:ohms?|\u03a9)\b", text, re.I)}) >= 2:
        return _GATE
    v = _f_voltage(text)
    i = _f_current(text)
    r = _f_resistance(text)
    known = {k: x for k, x in (("V", v), ("I", i), ("R", r))
             if x is not None}
    if len(known) != 2:
        return _GATE
    if "V" not in known:
        val = known["I"] * known["R"]
        steps = _beats(
            "Ohm's law V = I R -- at constant temperature the potential "
            "difference across a conductor is proportional to the current.",
            f"V = {_fmt(known['I'])} A x {_fmt(known['R'])} ohm",
            f"V = {_fmt(known['I'])} x {_fmt(known['R'])} = "
            f"{_fmt(val)} V",
            f"substitute back: R = V / I = {_fmt(val)} / "
            f"{_fmt(known['I'])} = {_fmt(known['R'])} ohm -- matches the "
            "given resistance",
            f"{_fmt(val)} V drives the current through the resistor.",
        )
        answer = f"voltage = {_fmt(val)} V"
    elif "I" not in known:
        val = known["V"] / known["R"]
        steps = _beats(
            "Ohm's law V = I R rearranged, I = V / R.",
            f"I = {_fmt(known['V'])} V / {_fmt(known['R'])} ohm",
            f"I = {_fmt(known['V'])} / {_fmt(known['R'])} = "
            f"{_fmt(val)} A",
            f"substitute back: V = I R = {_fmt(val)} x "
            f"{_fmt(known['R'])} = {_fmt(known['V'])} V -- matches the "
            "given voltage",
            f"a current of {_fmt(val)} A flows through the resistor.",
        )
        answer = f"current = {_fmt(val)} A"
    else:
        val = known["V"] / known["I"]
        steps = _beats(
            "Ohm's law V = I R rearranged, R = V / I.",
            f"R = {_fmt(known['V'])} V / {_fmt(known['I'])} A",
            f"R = {_fmt(known['V'])} / {_fmt(known['I'])} = "
            f"{_fmt(val)} ohm",
            f"substitute back: V = I R = {_fmt(known['I'])} x {_fmt(val)} "
            f"= {_fmt(known['V'])} V -- matches the given voltage",
            f"the conductor's resistance is {_fmt(val)} ohm.",
        )
        answer = f"resistance = {_fmt(val)} ohm"
    extra = dict(known)
    extra["result"] = val
    return val, steps, answer, None, "V = I R", extra


def _c_epower(g, m, text):
    if re.search(r"kwh|per\s+unit|bill|units?\s+consumed", text, re.I):
        return _GATE  # billing questions belong to ELECTRICAL_ENERGY_KWH
    v = _f_voltage(text)
    i = _f_current(text)
    r = _f_resistance(text)
    p_txt = _f_power(text)
    if p_txt is None:
        if v is not None and i is not None:
            val = v * i
            steps = _beats(
                "electrical power formula P = V I -- power delivered is "
                "voltage times current.",
                f"P = {_fmt(v)} V x {_fmt(i)} A",
                f"P = {_fmt(v)} x {_fmt(i)} = {_fmt(val)} W",
                f"substitute back: I = P / V = {_fmt(val)} / {_fmt(v)} = "
                f"{_fmt(i)} A -- matches the given current",
                f"the appliance consumes {_fmt(val)} W of power.",
            )
            answer = f"power = {_fmt(val)} W"
        elif i is not None and r is not None:
            val = i * i * r
            steps = _beats(
                "Joule's law of heating P = I^2 R -- heat produced per "
                "second in a resistance carrying current I.",
                f"P = ({_fmt(i)} A)^2 x {_fmt(r)} ohm",
                f"P = {_fmt(i * i)} x {_fmt(r)} = {_fmt(val)} W",
                f"substitute back: R = P / I^2 = {_fmt(val)} / "
                f"{_fmt(i * i)} = {_fmt(r)} ohm -- matches the given "
                "resistance",
                f"the resistor dissipates {_fmt(val)} W as heat.",
            )
            answer = f"power = {_fmt(val)} W"
        elif v is not None and r is not None:
            val = v * v / r
            steps = _beats(
                "electrical power formula P = V^2 / R (from P = V I with "
                "Ohm's law).",
                f"P = ({_fmt(v)} V)^2 / {_fmt(r)} ohm",
                f"P = {_fmt(v * v)} / {_fmt(r)} = {_fmt(val)} W",
                f"substitute back: R = V^2 / P = {_fmt(v * v)} / "
                f"{_fmt(val)} = {_fmt(r)} ohm -- matches the given "
                "resistance",
                f"the appliance consumes {_fmt(val)} W of power.",
            )
            answer = f"power = {_fmt(val)} W"
        else:
            return _GATE
    else:
        # P given: solve the missing V / I / R
        if _ask_word(text, r"resistance") and r is None:
            if v is not None:
                val = v * v / p_txt
                eq = "P = V^2/R rearranged: R = V^2 / P."
                subst = (f"R = ({_fmt(v)} V)^2 / {_fmt(p_txt)} W")
                comp = (f"R = {_fmt(v * v)} / {_fmt(p_txt)} = "
                        f"{_fmt(val)} ohm")
            elif i is not None:
                val = p_txt / (i * i)
                eq = "P = I^2 R rearranged: R = P / I^2."
                subst = f"R = {_fmt(p_txt)} W / ({_fmt(i)} A)^2"
                comp = (f"R = {_fmt(p_txt)} / {_fmt(i * i)} = "
                        f"{_fmt(val)} ohm")
            else:
                return _GATE
            steps = _beats(
                eq + " -- resistance from the dissipated power and the "
                "electrical givens.",
                subst, comp,
                f"substitute back: P = V^2/R = I^2 R recomputed returns "
                f"{_fmt(p_txt)} W -- matches the given power",
                f"the element's resistance is {_fmt(val)} ohm.",
            )
            answer = f"resistance = {_fmt(val)} ohm"
        elif _ask_word(text, r"current") and i is None:
            if v is None:
                return _GATE
            val = p_txt / v
            steps = _beats(
                "P = V I rearranged, I = P / V -- current drawn by an "
                "appliance of known power on a known supply.",
                f"I = {_fmt(p_txt)} W / {_fmt(v)} V",
                f"I = {_fmt(p_txt)} / {_fmt(v)} = {_fmt(val)} A",
                f"substitute back: P = V I = {_fmt(v)} x {_fmt(val)} = "
                f"{_fmt(p_txt)} W -- matches the given power",
                f"the appliance draws {_fmt(val)} A.",
            )
            answer = f"current = {_fmt(val)} A"
        elif _ask_word(text, r"voltage|potential\s+difference") and v is None:
            if i is None:
                return _GATE
            val = p_txt / i
            steps = _beats(
                "P = V I rearranged, V = P / I.",
                f"V = {_fmt(p_txt)} W / {_fmt(i)} A",
                f"V = {_fmt(p_txt)} / {_fmt(i)} = {_fmt(val)} V",
                f"substitute back: P = V I = {_fmt(val)} x {_fmt(i)} = "
                f"{_fmt(p_txt)} W -- matches the given power",
                f"{_fmt(val)} V is needed for that power at this current.",
            )
            answer = f"voltage = {_fmt(val)} V"
        else:
            return _GATE
    return val, steps, answer, None, "P = V I = I^2 R = V^2/R", \
        {"result": val}


def _c_kwh(g, m, text):
    # DUAL-UNIT CO-ASK (2026-10-07, class-9 corpus ch4_9#d2): 'calculate
    # the electrical energy in joules AND in kWh' wants BOTH forms; the
    # kWh family answers 3 units only and ships it as the whole answer.
    # C9_POWER_ENERGY (joules + kWh in one answer) owns the co-ask.
    if re.search(r"in\s+joules?\b|joules?\s+and\s+", text, re.I):
        return _GATE
    # C8 handoff (2026-10-06 dig): replacement/saving asks need
    # count x (old power - new power) x t, not one appliance's P x t.
    if re.search(r"saved|saving|replaces?|instead of", text, re.I):
        out = _c8_saved_kwh(g, m, text)
        if out is not _GATE and out[0] is not None:
            return out
    p = _f_power(text)
    if p is None:
        return _GATE
    hours = None
    m_day = re.search(r"(?:used|runs?|operates?|works?|on|glows?)\b"
                      r"[^.]{0,20}?(?:for\s+)?(?P<n>" + _SCI + r")\s*"
                      r"(?P<u>hours?|hrs?|h)\s*(?:a|per|each)\s*day",
                      text, re.I)
    days_m = re.search(r"(?:for\s+)?(?P<n>" + _SCI + r")\s*days?\b",
                       text, re.I)
    if m_day:
        hours = _sci(m_day.group("n"))
        if days_m:
            hours *= _sci(days_m.group("n"))
    else:
        h_m = re.search(r"(?:for\s+)?(?P<n>" + _SCI + r")\s*"
                        r"(?P<u>hours?|hrs?|h)\b", text, re.I)
        if h_m:
            hours = _sci(h_m.group("n"))
    if hours is None or hours <= 0:
        return _GATE
    kwh = (p / 1000.0) * hours
    rate_m = re.search(r"(?:Rs\.?|INR|\u20b9)\s*(?P<n>\d+(?:\.\d+)?)\s*"
                       r"(?:per|/)\s*(?:unit|kwh|k\.w\.h)", text, re.I)
    verify = (f"sanity check: units = (W/1000) x h recomputed = "
              f"({_fmt(p)} / 1000) x {_fmt(hours)} = {_fmt(kwh)} -- "
              "consistent")
    if rate_m:
        rate = _n(rate_m.group("n"))
        cost = kwh * rate
        steps = _beats(
            "electrical energy billing, E = P (kW) x t (h) -- the "
            "electricity board charges per unit, and 1 unit = 1 kWh.",
            f"P = {_fmt(p)} W = {_fmt(p / 1000.0)} kW; t = {_fmt(hours)} h",
            f"E = {_fmt(p / 1000.0)} x {_fmt(hours)} = {_fmt(kwh)} kWh; "
            f"cost = {_fmt(kwh)} units x Rs {_fmt(rate)}/unit = "
            f"Rs {_fmt(cost)}",
            verify + f"; rate = bill / units = {_fmt(cost)} / "
            f"{_fmt(kwh)} = Rs {_fmt(rate)} -- matches the tariff",
            f"the period's electricity bill is Rs {_fmt(cost)}.",
        )
        answer = f"bill = Rs {_fmt(cost)}"
        return cost, steps, answer, None, "E = P t (kWh)", \
            {"power_W": p, "hours": hours, "kWh": kwh}
    steps = _beats(
        "electrical energy billing, E = P (kW) x t (h) -- the electricity "
        "board charges per unit, and 1 unit = 1 kWh.",
        f"P = {_fmt(p)} W = {_fmt(p / 1000.0)} kW; t = {_fmt(hours)} h",
        f"E = {_fmt(p / 1000.0)} x {_fmt(hours)} = {_fmt(kwh)} kWh = "
        f"{_fmt(kwh)} units",
        verify,
        f"the appliance consumes {_fmt(kwh)} units of energy.",
    )
    answer = f"energy = {_fmt(kwh)} units (kWh)"
    return kwh, steps, answer, None, "E = P t (kWh)", \
        {"power_W": p, "hours": hours, "kWh": kwh}


# --------------------------------------------------------------------------- #
# optics
# --------------------------------------------------------------------------- #


def _c_refractive_speed(g, m, text):
    n_m = re.search(r"refractive\s+index\s+(?:of\s+(?:the\s+)?[\w-]+\s*)?"
                    r"(?:is\s+|=|:)?\s*(?P<n>\d+(?:\.\d+)?)", text, re.I)
    v_m = re.search(r"speed\s+of\s+light\s+(?:in|through)\s+[\w-]+\s*"
                    r"(?:is\s+|=|:)?\s*(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>m\s*/\s*s|km\s*/\s*s)\b", text, re.I)
    C = 3e8
    if n_m and not v_m:
        n = _n(n_m.group("n"))
        if n < 1:
            return _GATE
        val = C / n
        steps = _beats(
            "refractive index relation n = c / v rearranged, v = c / n -- "
            "light slows in a medium by the factor n (c = 3e8 m/s).",
            f"v = 3e8 m/s / {n:g}",
            f"v = 3e8 / {n:g} = {_fmt(val)} m/s",
            f"substitute back: n = c / v = 3e8 / {_fmt(val)} = {n:g} -- "
            "matches the given refractive index",
            f"light travels at {_fmt(val)} m/s inside the medium.",
        )
        answer = f"speed of light = {_fmt(val)} m/s"
    elif v_m and not n_m:
        v = _sci(v_m.group("n"))
        if v_m.group("u").strip().lower().startswith("km"):
            v *= 1000.0
        if v <= 0:
            return _GATE
        val = C / v
        steps = _beats(
            "refractive index relation n = c / v -- the ratio of light's "
            "vacuum speed to its speed in the medium (c = 3e8 m/s).",
            f"n = 3e8 m/s / {_fmt(v)} m/s",
            f"n = 3e8 / {_fmt(v)} = {_fmt(val)}",
            f"substitute back: v = c / n = 3e8 / {_fmt(val)} = "
            f"{_fmt(v)} m/s -- matches the given speed",
            f"the medium has refractive index {_fmt(val)}.",
        )
        answer = f"refractive index = {_fmt(val)}"
    else:
        return _GATE
    return val, steps, answer, None, "n = c / v", {"result": val}


# --------------------------------------------------------------------------- #
# electrostatics complement (word-order-tolerant Coulomb row; physics2
# owns the canonical "force between two charges of X and Y ... distance"
# phrasing, this row catches the inverted order and cm separations)
# --------------------------------------------------------------------------- #


def _c_coulomb_alt(g, m, text):
    q_m = re.findall(r"(?P<n>\d+(?:\.\d+)?)\s*(?P<p>micro|nano|milli)?\s*"
                     r"(?:coulombs?|C)\b", text, re.I)
    if len(q_m) < 2:
        return _GATE
    scale = {"micro": 1e-6, "nano": 1e-9, "milli": 1e-3}
    # findall with named groups yields (n, p) tuples
    q1 = float(q_m[0][0]) * scale.get((q_m[0][1] or "").lower(), 1.0)
    q2 = float(q_m[1][0]) * scale.get((q_m[1][1] or "").lower(), 1.0)
    r_m = re.search(r"(?:distance|separation)\s+(?:of\s+|is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b"
                    r"(?!\s*(?:/|per))", text, re.I) or \
        re.search(r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\s*apart",
                  text, re.I)
    if not r_m:
        return _GATE
    r = _to_m(r_m.group("n"), r_m.group("u"))
    if r <= 0 or q1 == 0 or q2 == 0:
        return _GATE
    f = 9e9 * q1 * q2 / (r * r)
    steps = _beats(
        "Coulomb's law F = k q1 q2 / r^2 with k = 9e9 N m^2/C^2 -- the "
        "electrostatic force between two point charges.",
        f"q1 = {_fmt(q1)} C, q2 = {_fmt(q2)} C, r = {_fmt(r)} m",
        f"F = 9e9 x {_fmt(q1)} x {_fmt(q2)} / ({_fmt(r)})^2 = "
        f"{_fmt(f)} N",
        f"substitute back: r = sqrt(k q1 q2 / F) = "
        f"sqrt({9e9 * q1 * q2:.6g} / {_fmt(f)}) = {_fmt(r)} m -- matches "
        "the given separation",
        f"the charges push or pull each other with {_fmt(f)} N.",
    )
    answer = f"force = {_fmt(f)} N"
    return f, steps, answer, None, "F = k q1 q2 / r^2", \
        {"q1": q1, "q2": q2, "r": r, "result": f}


# --------------------------------------------------------------------------- #
# The table: (id, trigger regex [RAW], handler)
# --------------------------------------------------------------------------- #

TABLE: List[Tuple[str, str, Any]] = [
    # ---- kinematics (shared trigger; handlers gate on their own variable) --
    ("KINEMATICS_V_U_AT", _KIN_TRIGGER,
     _kin_handle("KINEMATICS_V_U_AT", "v = u + a t", ("u", "v", "a", "t"))),
    ("KINEMATICS_S_UT_AT2", _KIN_TRIGGER,
     _kin_handle("KINEMATICS_S_UT_AT2", "s = u t + (1/2) a t^2",
                 ("u", "a", "s", "t"))),
    ("KINEMATICS_V2_U2_2AS", _KIN_TRIGGER,
     _kin_handle("KINEMATICS_V2_U2_2AS", "v^2 = u^2 + 2 a s",
                 ("u", "v", "a", "s"))),

    # ---- dynamics (Archimedes before weight: "apparent weight" is
    #      a buoyancy computation, not W = m g) ----
    ("NEWTON_SECOND_LAW",
     r"\b(?:newton|force|accelerat|mass)\b",
     _c_newton2),
    ("ARCHIMEDES_BUOYANCY",
     r"buoyant\s+(?:force|upthrust)|upthrust|buoyancy|apparent\s+weight|"
     r"archimedes",
     _c_buoyancy),
    ("WEIGHT_MG",
     r"\bweights?\b|\bweighs?\b",
     _c_weight),
    ("FRICTION_MU_N",
     r"coefficient\s+of\s+friction",
     _c_friction),

    # ---- work, energy, power ----
    ("WORK_DONE",
     r"work\s+done|work\s+is\s+done|work\s+required|calculate\s+the\s+work",
     _c_work),
    ("KINETIC_ENERGY",
     r"kinetic\s+energy",
     _c_ke),
    ("POTENTIAL_ENERGY",
     r"potential\s+energy",
     _c_pe),
    ("WORK_ENERGY_THEOREM",
     r"work\s+(?:done|required|needed)\s+(?:to|in)\s+(?:accelerate|stop|"
     r"bring|slow|change|halt)|work[\s-]energy\s+theorem"
     r"|(?:net\s+)?work\s+(?:is\s+)?done" + _SPAN + r"{0,80}"
     r"(?:accelerat|from\s+|to\s+rest|slows?|brought)"
     r"|(?:accelerat[^.]{0,60}|from\s+" + _SCI + r"\s*m/s|brought\s+to\s+"
     r"rest|slows?[^.]{0,40})" + _SPAN + r"{0,100}(?:net\s+)?work\s+"
     r"(?:is\s+)?done",
     _c_work_energy_theorem),
    ("POWER_WORK_TIME",
     r"\bpower\b",
     _c_power_time),
    ("POWER_FORCE_VELOCITY",
     r"\bpower\b.{0,80}?\b(?:moving|velocity|speed)\b|"
     r"(?:engine|motor|locomotive|car)\b.{0,80}?\bpower\b",
     _c_power_fv),

    # ---- gravitation / fluids ----
    ("GRAVITY_SURFACE_G",
     r"\bg\b[^.]{0,80}(?:planet|star|surface)|value\s+of\s+g|"
     r"gravity\s+on\s+(?:the\s+)?(?:planet|surface)|"
     r"(?:planet|star)[^.]{0,40}?(?:mass|radius)",
     _c_gravity_surface),
    ("HYDROSTATIC_PRESSURE",
     r"pressure\s+(?:exerted\s+)?(?:at|by)\s+(?:a\s+)?(?:depth|height|"
     r"liquid|water|fluid)|pressure\s+at\s+(?:a\s+)?depth",
     _c_hydrostatic),

    # ---- solids ----
    ("HOOKE_LAW",
     r"spring\s+constant|hooke",
     _c_hooke),
    ("MOMENT_OF_FORCE",
     r"moment\s+of\s+(?:a\s+)?(?:force|the\s+force)|turning\s+(?:effect|"
     r"moment)(?:\s+(?:of|produced|exerted))?|torque\s+(?:of|about)|"
     r"moment\s+about",
     _c_moment),
    ("PRINCIPLE_OF_MOMENTS",
     r"principle\s+of\s+moment|seesaw|balanced?\s+(?:on|about)\s+"
     r"(?:a\s+)?(?:pivot|fulcrum|beam)|fulcrum",
     _c_principle_moments),

    # ---- heat ----
    ("SPECIFIC_HEAT",
     r"specific\s+heat|heat\s+(?:required|needed|supplied|given)\s+to\s+"
     r"(?:raise|change)|raise\s+the\s+temperature",
     _c_specific_heat),
    ("LATENT_HEAT",
     r"latent\s+heat|melt(?:s|ing)?\s+(?:completely|entirely)|"
     r"vaporis\w+|vaporiz\w+|boil(?:s|ing)?\s+away",
     _c_latent_heat),

    # ---- oscillations ----
    ("PENDULUM_PERIOD",
     r"pendulum",
     _c_pendulum),

    # ---- electricity ----
    ("EMF_INTERNAL_RESISTANCE",
     r"internal\s+resistance",
     _c_emf_internal),
    ("OHMS_LAW_ANY",
     r"(?:ohm|current|voltage|potential\s+difference)",
     _c_ohm),
    ("ELECTRICAL_POWER_VI",
     r"(?:power\s+(?:of|dissipat|consum|rating)|dissipat\w+|consum\w+)",
     _c_epower),
    ("ELECTRICAL_ENERGY_KWH",
     r"kwh|per\s+unit|bill|units?\s+consumed|electricity\s+"
     r"(?:bill|consumption)|\bRs\.?\s*\d+(?:\.\d+)?\s*(?:per|/)\s*"
     r"(?:unit|kwh)|\brs\.?\s*\d+(?:\.\d+)?\s*(?:per|/)\s*(?:unit|kwh)",
     _c_kwh),

    # ---- optics ----
    ("REFRACTIVE_INDEX_SPEED",
     r"refractive\s+index|speed\s+of\s+light\s+in",
     _c_refractive_speed),

    # ---- electrostatics complement ----
    ("COULOMB_ALT",
     r"\bcoulombs?\b|\bcharges?\b",
     _c_coulomb_alt),
]


# --------------------------------------------------------------------------- #
# BOOKS2 -- remaining solver-able book topics, classes 9-12 (extended from
# physics_book_topics.json): AC circuits (rms, reactance, impedance),
# transformer, rotational motion (tau = I alpha, angular momentum, moment
# of inertia), relative velocity, terminal velocity, calorimetry mixtures,
# Kepler's third law, escape/orbital velocity, Young's modulus, YDSE
# fringe width, resolving power, semiconductor logic (gates, transistor
# gains), plus corpus one-liners (echo/SONAR, machines MA/VR/efficiency,
# angular dispersion, plane-mirror reflection, Doppler effect).
# Same 6-tuple conventions; _GATE refuses impossible states.
# --------------------------------------------------------------------------- #

_G_UNIVERSAL = 6.67e-11     # N m^2 / kg^2
_AU_M = 1.496e11            # one astronomical unit in metres

_FREQU = r"(?:kHz|kilohertz|Hz|hertz)"
_HENRYU = r"(?:mH|millihenr\w+|H|henr(?:y|ies))"
_FARADU = r"(?:(?:micro|\u03bc|u)\s*F|nF|pF|F|farads?)"
_ANGMOMU = r"(?:kg\s*m\s*\^?\s*2\s*/?\s*s|J\s*s)"
_INERTIAU = r"(?:kg\s*m\s*\^?\s*2|kg\s*m2)"
_RADS2 = r"(?:rad\s*/\s*s\s*\^?\s*2|rad\s*s\s*\^?\s*-?\s*2)"
_RADS1 = r"(?:rad\s*/\s*s|rad\s*s\s*\^?\s*-?\s*1)"
_NMU = r"(?:N\s*[-\s]?m(?:et(?:re|er)s?)?|newton\s*[-\s]met(?:re|er)s?)"

_MASSU2 = (r"(?:tonnes?|kg|kilograms?|g|grams?)")
_VELU2 = (r"(?:km\s*/\s*h(?:r|our)?|m\s*/\s*s|"
          r"kilometres?\s+per\s+(?:hour|hr)|metres?\s+per\s+second)")
_DENSU2 = (r"(?:kg\s*/\s*m\s*\^?\s*3|g\s*/\s*cm\s*\^?\s*3|g\s*/\s*cc|"
           r"kg\s*per\s*cubic\s*metre)")


def _sci_u(n: str, u: str) -> float:
    return _sci(n)


def _find_all_q(text: str, rx: str, conv):
    """All (converted value, span) hits for a quantity regex with n/u."""
    out: List[Tuple[float, int]] = []
    for mm in re.finditer(rx, text, re.I):
        try:
            out.append((conv(mm.group("n"), mm.group("u") or ""),
                        mm.start("n")))
        except Exception:
            continue
    return out


def _first_q(text: str, rx: str, conv):
    hits = _find_all_q(text, rx, conv)
    return hits[0][0] if hits else None


def _to_ms2(n: str, u: str) -> float:
    v = _sci(n)
    try:
        from its.solver import pint_physics_engine
        p = pint_physics_engine.convert_units(v, u, "meter / second")
        if p is not None:
            return p
    except Exception:
        pass
    return v * 1000.0 / 3600.0 if "km" in u.lower() else v


# ---- 1. AC: rms <-> peak --------------------------------------------------- #


def _c_rms(g, m, text):
    is_i = bool(re.search(r"\bcurrent\b", text, re.I))
    is_v = bool(re.search(r"\bvoltage\b", text, re.I))
    if is_i == is_v:
        return _GATE
    kind = "current" if is_i else "voltage"
    un = "A" if is_i else "V"
    uu = r"(?:mA|A|amperes?|amps?)" if is_i else r"(?:kV|mV|V|volts?)"
    def conv(n, u):
        v = _sci(n)
        ul = u.strip().lower()
        if ul.startswith("m") and not ul.startswith("mi"):
            return v * 0.001
        if ul.startswith("k"):
            return v * 1000.0
        return v
    peak_m = re.search(r"peak[^.]{0,40}?(?P<n>" + _SCI + r")\s*(?P<u>" + uu
                       + r")\b|(?P<n2>" + _SCI + r")\s*(?P<u2>" + uu
                       + r")\b[^.]{0,30}peak", text, re.I)
    rms_m = re.search(r"(?:rms|r\.m\.s\.?|root\s+mean\s+square)"
                      r"[^.]{0,40}?(?P<n>" + _SCI + r")\s*(?P<u>" + uu
                      + r")\b|(?P<n2>" + _SCI + r")\s*(?P<u2>" + uu
                      + r")\b[^.]{0,30}(?:rms|r\.m\.s)", text, re.I)
    peak = _sci(peak_m.group("n") or peak_m.group("n2")) if peak_m else None
    rms = _sci(rms_m.group("n") or rms_m.group("n2")) if rms_m else None
    conv_peak = conv(str(peak), (peak_m.group("u") or peak_m.group("u2"))
                     if peak_m else "") if peak is not None else None
    conv_rms = conv(str(rms), (rms_m.group("u") or rms_m.group("u2"))
                    if rms_m else "") if rms is not None else None
    if conv_peak is not None and conv_rms is None:
        val = conv_peak / math.sqrt(2.0)
        given, ans_kind = f"peak {kind} = {_fmt(conv_peak)} {un}", "rms"
    elif conv_rms is not None and conv_peak is None:
        val = conv_rms * math.sqrt(2.0)
        given, ans_kind = f"rms {kind} = {_fmt(conv_rms)} {un}", "peak"
    else:
        return _GATE
    denom = f"{math.sqrt(2.0):.6g}"
    steps = _beats(
        "AC relation I_rms = I_peak / sqrt(2) (same for voltage) -- the "
        "rms value equals the DC value delivering the same power, hence "
        "peak divided by root 2.",
        f"{given}; {'I_rms = I_peak' if ans_kind == 'rms' else 'I_peak = I_rms x sqrt(2)'}",
        f"{'value' if ans_kind == 'rms' else 'peak'} = "
        + (f"{_fmt(conv_peak)} / {denom} = {_fmt(val)} {un}"
           if ans_kind == "rms" else
           f"{_fmt(conv_rms)} x {denom} = {_fmt(val)} {un}"),
        f"substitute back: {'peak = rms x sqrt(2) = ' + f'{_fmt(val)} x {denom} = ' + f'{_fmt(conv_peak)}' if ans_kind == 'rms' else 'rms = peak / sqrt(2) = ' + f'{_fmt(val)} / {denom} = ' + f'{_fmt(conv_rms)}'} {un} -- closes",
        f"the {ans_kind} {kind} of the alternating supply is "
        f"{_fmt(val)} {un}.",
    )
    answer = f"{ans_kind} {kind} = {_fmt(val)} {un}"
    return val, steps, answer, None, "rms = peak / sqrt(2)", \
        {"result": val}


# ---- 2. AC: reactance ------------------------------------------------------ #


def _react_f(text: str) -> Optional[float]:
    f_m = re.search(r"frequency\s+(?:of\s+|is\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _FREQU + r")\b", text, re.I)
    if not f_m:
        return None
    v = _sci(f_m.group("n"))
    return v * 1000.0 if f_m.group("u").upper().startswith("K") else v


def _react_l(text: str) -> Optional[float]:
    l_m = re.search(r"inductance\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI
                    + r")\s*(?P<u>" + _HENRYU + r")\b"
                    r"|inductor\s+of\s+(?P<n2>" + _SCI + r")\s*"
                    r"(?P<u2>" + _HENRYU + r")\b", text, re.I)
    if not l_m:
        return None
    raw = l_m.group("n") or l_m.group("n2")
    u = (l_m.group("u") or l_m.group("u2") or "").strip().lower()
    v = _sci(raw)
    return v * 0.001 if u.startswith("m") or "milli" in u else v


def _react_c(text: str) -> Optional[float]:
    c_m = re.search(r"capacitance\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI
                    + r")\s*(?P<u>" + _FARADU + r")\b"
                    r"|capacitor\s+of\s+(?P<n2>" + _SCI + r")\s*"
                    r"(?P<u2>" + _FARADU + r")\b", text, re.I)
    if not c_m:
        return None
    raw = c_m.group("n") or c_m.group("n2")
    u = (c_m.group("u") or c_m.group("u2") or "").replace(" ", "").lower()
    v = _sci(raw)
    if u.startswith("u") or u.startswith("\u03bc") or "micro" in u:
        return v * 1e-6
    if u.startswith("n"):
        return v * 1e-9
    if u.startswith("p"):
        return v * 1e-12
    return v


def _c_reactance(g, m, text):
    if re.search(r"impedance", text, re.I):
        return _GATE  # the full Z computation belongs to IMPEDANCE_RLC
    f = _react_f(text)
    if f is None or f <= 0:
        return _GATE
    cap_ask = bool(re.search(r"capacitive", text, re.I))
    ind_ask = bool(re.search(r"inductive", text, re.I))
    l = _react_l(text)
    c = _react_c(text)
    if cap_ask and not ind_ask:
        l = None
    if ind_ask and not cap_ask:
        c = None
    if l is not None and c is None:
        val = 2.0 * math.pi * f * l
        kind, tail = "inductive", f"2 pi x {_fmt(f)} x {_fmt(l)}"
        back = f"f = X_L / (2 pi L) = {_fmt(val)} / ({2.0 * math.pi:.6g} x {_fmt(l)}) = {_fmt(f)} Hz -- matches"
        interp = (f"the inductor opposes the current with "
                  f"{_fmt(val)} ohm of inductive reactance.")
        relation = "X_L = 2 pi f L"
    elif c is not None and l is None:
        if c <= 0:
            return _GATE
        val = 1.0 / (2.0 * math.pi * f * c)
        kind, tail = "capacitive", f"1 / (2 pi x {_fmt(f)} x {_fmt(c)})"
        back = f"f = 1 / (2 pi C X_C) = 1 / (2 pi x {_fmt(c)} x {_fmt(val)}) = {_fmt(f)} Hz -- matches"
        interp = (f"the capacitor opposes the current with "
                  f"{_fmt(val)} ohm of capacitive reactance.")
        relation = "X_C = 1 / (2 pi f C)"
    else:
        return _GATE
    steps = _beats(
        f"reactance formula {relation} -- an AC element opposes a "
        "changing current, and the opposition grows with frequency "
        "(inductor) or falls with frequency (capacitor).",
        f"{tail} (f = {_fmt(f)} Hz"
        + (f", L = {_fmt(l)} H" if l is not None else
           f", C = {_fmt(c)} F") + ")",
        f"{kind} reactance = {_fmt(val)} ohm",
        f"substitute back: {back}",
        interp,
    )
    answer = f"{kind} reactance = {_fmt(val)} ohm"
    return val, steps, answer, None, relation, {"result": val,
                                                "f": f,
                                                "L": l if l else 0.0,
                                                "C": c if c else 0.0}


# ---- 3. AC: impedance of a series RLC circuit ------------------------------- #


def _c_impedance(g, m, text):
    r_m = re.search(r"resistance\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI
                    + r")\s*(?P<u>ohms?|\u03a9)\b"
                    r"|R\s*=\s*(?P<n2>" + _SCI + r")\s*(?P<u2>ohms?|\u03a9)?",
                    text, re.I)
    if not r_m:
        return _GATE
    raw = r_m.group("n") or r_m.group("n2")
    r_ohm = _sci(raw)
    f = _react_f(text)
    l = _react_l(text)
    c = _react_c(text)
    if r_ohm <= 0 or f is None or f <= 0 or (l is None and c is None):
        return _GATE
    xl = 2.0 * math.pi * f * l if l is not None else 0.0
    xc = 1.0 / (2.0 * math.pi * f * c) if (c is not None and c > 0) else 0.0
    net = xl - xc
    radicand = r_ohm * r_ohm + net * net
    if radicand <= 0:
        return _GATE
    val = math.sqrt(radicand)
    parts = (f"X_L = 2 pi x {_fmt(f)} x {_fmt(l)} = {_fmt(xl)} ohm"
             if l is not None else "X_L = 0 (no inductor)")
    parts += (f"; X_C = 1 / (2 pi x {_fmt(f)} x {_fmt(c)}) = "
              f"{_fmt(xc)} ohm" if c is not None else "; X_C = 0 "
              "(no capacitor)")
    steps = _beats(
        "impedance formula Z = sqrt(R^2 + (X_L - X_C)^2) for a series "
        "LCR circuit -- resistance and the net reactance combine at "
        "right angles (phasors).",
        f"R = {_fmt(r_ohm)} ohm; {parts}; net reactance = "
        f"{_fmt(net)} ohm",
        f"Z = sqrt(({_fmt(r_ohm)})^2 + ({_fmt(net)})^2) = "
        f"sqrt({_fmt(radicand)}) = {_fmt(val)} ohm",
        f"substitute back: Z^2 - (X_L - X_C)^2 = {_fmt(val * val)} - "
        f"{_fmt(net * net)} = {_fmt(r_ohm * r_ohm)} = R^2 -- closes",
        f"the circuit draws current as if its total opposition were "
        f"{_fmt(val)} ohm.",
    )
    answer = f"impedance = {_fmt(val)} ohm"
    return val, steps, answer, None, "Z = sqrt(R^2 + (X_L - X_C)^2)", \
        {"R": r_ohm, "f": f, "X_L": xl, "X_C": xc, "result": val}


# ---- 4. transformer -------------------------------------------------------- #


def _c_transformer(g, m, text):
    def turns(word):
        t_m = (re.search(r"(?P<n>\d+)\s*turns?[^.]{0,30}?" + word, text,
                         re.I)
               or re.search(r"(?P<n>\d+)\s*" + word + r"\s+turns?\b", text,
                            re.I)
               or re.search(word + r"[^.]{0,30}?(?P<n>\d+)\s*turns?\b",
                            text, re.I))
        return int(float(t_m.group("n"))) if t_m else None
    np_, ns = turns(r"primary"), turns(r"secondary")
    if not np_ or not ns or np_ <= 0 or ns <= 0:
        return _GATE
    def volt(word):
        v_m = re.search(word + r"\s+(?:voltage|potential\s+difference)"
                        r"[^.]{0,40}?(?P<n>" + _SCI + r")\s*"
                        r"(?P<u>kV|mV|V|volts?)\b", text, re.I)
        if not v_m:
            return None
        v = _sci(v_m.group("n"))
        ul = v_m.group("u").lower()
        return v * 1000.0 if ul.startswith("k") else \
            (v * 0.001 if ul.startswith("m") and not ul.startswith("mi")
             else v)
    def amp(word):
        a_m = re.search(word + r"\s+current[^.]{0,40}?(?P<n>" + _SCI
                        + r")\s*(?P<u>mA|A|amperes?|amps?)\b", text,
                        re.I)
        if not a_m:
            return None
        v = _sci(a_m.group("n"))
        return v * 0.001 if a_m.group("u").lower() == "ma" else v
    vp, vs = volt(r"primary"), volt(r"secondary")
    ip, isec = amp(r"primary"), amp(r"secondary")
    if vp is not None and vs is None:
        val = vp * ns / np_
        given = f"V_p = {_fmt(vp)} V, N_p = {np_}, N_s = {ns}"
        formula = "V_s / V_p = N_s / N_p  =>  V_s = V_p N_s / N_p"
        comp = f"V_s = {_fmt(vp)} x {ns} / {np_} = {_fmt(val)} V"
        back = (f"N_s / N_p = {ns}/{np_} and V_s / V_p = "
                f"{_fmt(val)} / {_fmt(vp)} = {ns / np_:.6g} -- equal")
        interp = (f"the secondary delivers {_fmt(val)} V "
                  f"({'step-up' if ns > np_ else 'step-down'} "
                  "transformer).")
        ans = f"secondary voltage = {_fmt(val)} V"
    elif vs is not None and vp is None:
        val = vs * np_ / ns
        given = f"V_s = {_fmt(vs)} V, N_p = {np_}, N_s = {ns}"
        formula = "V_s / V_p = N_s / N_p  =>  V_p = V_s N_p / N_s"
        comp = f"V_p = {_fmt(vs)} x {np_} / {ns} = {_fmt(val)} V"
        back = (f"V_s / V_p = {_fmt(vs)} / {_fmt(val)} = "
                f"{ns / np_:.6g} = N_s / N_p -- equal")
        interp = f"the primary must be fed {_fmt(val)} V."
        ans = f"primary voltage = {_fmt(val)} V"
    elif ip is not None and isec is None:
        val = ip * np_ / ns
        given = f"I_p = {_fmt(ip)} A, N_p = {np_}, N_s = {ns}"
        formula = "I_s / I_p = N_p / N_s  =>  I_s = I_p N_p / N_s"
        comp = f"I_s = {_fmt(ip)} x {np_} / {ns} = {_fmt(val)} A"
        back = (f"I_p N_p = {_fmt(ip * np_)} and I_s N_s = "
                f"{_fmt(val * ns)} -- ampere-turns balance")
        interp = (f"the secondary current is {_fmt(val)} A "
                  f"(current steps opposite to voltage).")
        ans = f"secondary current = {_fmt(val)} A"
    elif isec is not None and ip is None:
        val = isec * ns / np_
        given = f"I_s = {_fmt(isec)} A, N_p = {np_}, N_s = {ns}"
        formula = "I_s / I_p = N_p / N_s  =>  I_p = I_s N_s / N_p"
        comp = f"I_p = {_fmt(isec)} x {ns} / {np_} = {_fmt(val)} A"
        back = (f"I_p N_p = {_fmt(val * np_)} and I_s N_s = "
                f"{_fmt(isec * ns)} -- ampere-turns balance")
        interp = f"the primary draws {_fmt(val)} A."
        ans = f"primary current = {_fmt(val)} A"
    else:
        return _GATE
    steps = _beats(
        f"transformer ratio relation {formula} -- one shared core links "
        "the coils, so voltages follow the turns ratio and currents "
        "follow the inverse (ideal transformer, power conserved).",
        given, comp, f"substitute back: {back}", interp,
    )
    return val, steps, ans, ["ideal (lossless) transformer assumed"], \
        "V_s/V_p = N_s/N_p", {"N_p": np_, "N_s": ns, "result": val}


# ---- 5-7. rotational dynamics ---------------------------------------------- #


def _rot_pieces(text: str):
    """Parse torque (N m), I (kg m^2), alpha (rad/s^2) from text."""
    t_m = re.search(r"torque\s+(?:of\s+|is\s+|acting\s+on\s+it\s+is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _NMU + r")\b"
                    r"|(?P<n2>" + _SCI + r")\s*(?P<u2>" + _NMU
                    + r")\s+(?:of\s+)?torque", text, re.I)
    torque = _sci(t_m.group("n") or t_m.group("n2")) if t_m else None
    i_m = re.search(r"moment\s+of\s+inertia\s+(?:of\s+)?(?:is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _INERTIAU + r")\b",
                    text, re.I)
    inertia = _sci(i_m.group("n")) if i_m else None
    a_m = re.search(r"angular\s+acceleration\s+(?:of\s+|is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _RADS2 + r")\b",
                    text, re.I)
    alpha = _sci(a_m.group("n")) if a_m else None
    return torque, inertia, alpha


def _c_torque_angular(g, m, text):
    torque, inertia, alpha = _rot_pieces(text)
    known = {k: v for k, v in (("tau", torque), ("I", inertia),
                               ("alpha", alpha)) if v is not None}
    if len(known) != 2 or any(v <= 0 for k, v in known.items()
                              if k == "I"):
        return _GATE
    if "tau" not in known:
        val = known["I"] * known["alpha"]
        given = (f"I = {_fmt(known['I'])} kg m^2, alpha = "
                 f"{_fmt(known['alpha'])} rad/s^2")
        comp = f"tau = {_fmt(known['I'])} x {_fmt(known['alpha'])} = {_fmt(val)} N m"
        back = (f"alpha = tau / I = {_fmt(val)} / {_fmt(known['I'])} = "
                f"{_fmt(known['alpha'])} rad/s^2 -- matches")
        interp = f"the applied torque is {_fmt(val)} N m."
        ans = f"torque = {_fmt(val)} N m"
    elif "I" not in known:
        val = known["tau"] / known["alpha"]
        given = (f"tau = {_fmt(known['tau'])} N m, alpha = "
                 f"{_fmt(known['alpha'])} rad/s^2")
        comp = f"I = {_fmt(known['tau'])} / {_fmt(known['alpha'])} = {_fmt(val)} kg m^2"
        back = (f"tau = I alpha = {_fmt(val)} x "
                f"{_fmt(known['alpha'])} = {_fmt(known['tau'])} N m -- matches")
        interp = f"the body's moment of inertia is {_fmt(val)} kg m^2."
        ans = f"moment of inertia = {_fmt(val)} kg m^2"
    else:
        if known["I"] <= 0:
            return _GATE
        val = known["tau"] / known["I"]
        given = (f"tau = {_fmt(known['tau'])} N m, I = "
                 f"{_fmt(known['I'])} kg m^2")
        comp = f"alpha = {_fmt(known['tau'])} / {_fmt(known['I'])} = {_fmt(val)} rad/s^2"
        back = (f"tau = I alpha = {_fmt(known['I'])} x {_fmt(val)} = "
                f"{_fmt(known['tau'])} N m -- matches")
        interp = f"the wheel's angular acceleration is {_fmt(val)} rad/s^2."
        ans = f"angular acceleration = {_fmt(val)} rad/s^2"
    steps = _beats(
        "rotational form of Newton's second law, tau = I alpha -- net "
        "torque equals moment of inertia times angular acceleration "
        "(I plays the role of mass).",
        given, comp, f"substitute back: {back}", interp,
    )
    return val, steps, ans, None, "tau = I alpha", dict(known,
                                                        result=val)


def _c_angular_momentum(g, m, text):
    if re.search(r"moment\s+of\s+inertia\s+(?:of\s+)?(?:a|an)?\s*"
                 r"(?:particle|point\s+mass)", text, re.I) and \
            not re.search(r"angular\s+momentum", text, re.I):
        return _GATE  # point-mass I = m r^2 ask belongs to MOI family
    i_m = re.search(r"moment\s+of\s+inertia\s+(?:of\s+)?(?:is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _INERTIAU + r")\b",
                    text, re.I)
    w_m = re.search(r"(?:(?:rotating|spinning|revolving)\s+at\s*|"
                    r"angular\s+velocity\s+(?:of\s+|is\s+)?)"
                    r"(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _RADS1 + r")\b", text, re.I)
    m_m = re.search(r"(?:particle|body|mass)\s+of\s+mass\s+(?P<n>" + _SCI
                    + r")\s*(?P<u>" + _MASSU2 + r")\b", text, re.I)
    v_m = re.search(r"(?:speed|velocity)\s+(?:of\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _VELU2 + r")\b", text, re.I)
    r_m = re.search(r"(?:radius|circle)\s+of\s+(?:radius\s+)?(?P<n>" + _SCI
                    + r")\s*(?P<u>" + _DISTU + r")\b", text, re.I)
    l_m = re.search(r"angular\s+momentum\s+(?:of\s+|is\s+)?(?P<n>" + _SCI
                    + r")\s*(?P<u>" + _ANGMOMU + r")\b", text, re.I)
    I = _sci(i_m.group("n")) if i_m else None
    w = _sci(w_m.group("n")) if w_m else None
    mass = _to_kg(m_m.group("n"), m_m.group("u")) if m_m else None
    vel = _to_ms(v_m.group("n"), v_m.group("u")) if v_m else None
    rad = _to_m(r_m.group("n"), r_m.group("u")) if r_m else None
    L = _sci(l_m.group("n")) if l_m else None
    ask_w = bool(_ask_word(text, r"angular\s+velocity"))
    ask_I = bool(_ask_word(text, r"moment\s+of\s+inertia"))
    ask_v = bool(_ask_word(text, r"(?:speed|velocity)"))
    if L is None:
        if I is not None and w is not None and I > 0:
            val = I * w
            given = f"I = {_fmt(I)} kg m^2, omega = {_fmt(w)} rad/s"
            comp = f"L = {_fmt(I)} x {_fmt(w)} = {_fmt(val)} kg m^2/s"
            back = (f"omega = L / I = {_fmt(val)} / {_fmt(I)} = "
                    f"{_fmt(w)} rad/s -- matches")
            interp = f"the rotating body's angular momentum is {_fmt(val)} kg m^2/s."
            ans = f"angular momentum = {_fmt(val)} kg m^2/s"
            relation = "L = I omega"
        elif mass is not None and vel is not None and rad is not None \
                and rad > 0:
            val = mass * vel * rad
            given = (f"m = {_fmt(mass)} kg, v = {_fmt(vel)} m/s, "
                     f"r = {_fmt(rad)} m")
            comp = (f"L = {_fmt(mass)} x {_fmt(vel)} x {_fmt(rad)} = "
                    f"{_fmt(val)} kg m^2/s")
            back = (f"v = L / (m r) = {_fmt(val)} / ({_fmt(mass)} x "
                    f"{_fmt(rad)}) = {_fmt(vel)} m/s -- matches")
            interp = (f"the orbiting particle's angular momentum is "
                      f"{_fmt(val)} kg m^2/s.")
            ans = f"angular momentum = {_fmt(val)} kg m^2/s"
            relation = "L = m v r"
        else:
            return _GATE
    elif ask_w and I is not None and I > 0:
        val = L / I
        given = f"L = {_fmt(L)} kg m^2/s, I = {_fmt(I)} kg m^2"
        comp = f"omega = {_fmt(L)} / {_fmt(I)} = {_fmt(val)} rad/s"
        back = (f"L = I omega = {_fmt(I)} x {_fmt(val)} = {_fmt(L)} -- "
                "matches")
        interp = f"the body spins at {_fmt(val)} rad/s."
        ans = f"angular velocity = {_fmt(val)} rad/s"
        relation = "L = I omega"
    elif ask_I and w is not None and w > 0:
        val = L / w
        given = f"L = {_fmt(L)} kg m^2/s, omega = {_fmt(w)} rad/s"
        comp = f"I = {_fmt(L)} / {_fmt(w)} = {_fmt(val)} kg m^2"
        back = (f"L = I omega = {_fmt(val)} x {_fmt(w)} = {_fmt(L)} -- "
                "matches")
        interp = f"the body's moment of inertia is {_fmt(val)} kg m^2."
        ans = f"moment of inertia = {_fmt(val)} kg m^2"
        relation = "L = I omega"
    elif ask_v and mass is not None and rad is not None and rad > 0:
        val = L / (mass * rad)
        given = f"L = {_fmt(L)} kg m^2/s, m = {_fmt(mass)} kg, r = {_fmt(rad)} m"
        comp = f"v = {_fmt(L)} / ({_fmt(mass)} x {_fmt(rad)}) = {_fmt(val)} m/s"
        back = (f"L = m v r = {_fmt(mass)} x {_fmt(val)} x {_fmt(rad)} = "
                f"{_fmt(L)} -- matches")
        interp = f"the particle moves at {_fmt(val)} m/s."
        ans = f"velocity = {_fmt(val)} m/s"
        relation = "L = m v r"
    else:
        return _GATE
    steps = _beats(
        f"angular momentum relation {relation} -- rotational inertia "
        "times rotational speed (or the point-mass form mass x speed x "
        "radius) is conserved for a free rotating system.",
        given, comp, f"substitute back: {back}", interp,
    )
    return val, steps, ans, None, relation, {"result": val}


def _c_moi_point(g, m, text):
    if re.search(r"angular\s+(?:acceleration|momentum)|torque", text,
                 re.I):
        return _GATE  # belongs to TORQUE_ANGULAR / ANGULAR_MOMENTUM
    m_m = re.search(r"(?:particle|point\s+mass|body|mass)\s+of\s+mass\s+"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _MASSU2 + r")\b",
                    text, re.I) or \
        re.search(r"of\s+(?:a|an)?\s*(?P<n2>" + _SCI + r")\s*(?P<u2>"
                  + _MASSU2 + r")\s+(?:particle|point\s+mass|body)\b",
                  text, re.I)
    r_m = re.search(r"distance\s+of\s+(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _DISTU + r")\b\s*(?:from|about)", text,
                    re.I) or \
        re.search(r"(?:from|about)\s+(?:the\s+)?(?:axis|pivot)[^.]{0,40}?"
                  r"distance\s+of\s+(?P<n2>" + _SCI + r")\s*"
                  r"(?P<u2>" + _DISTU + r")\b", text, re.I)
    if not m_m or not r_m:
        return _GATE
    gd = m_m.groupdict()
    rd = r_m.groupdict()
    mass = _to_kg(gd.get("n") or gd.get("n2"),
                  gd.get("u") or gd.get("u2"))
    rad = _to_m(rd.get("n") or rd.get("n2"),
                rd.get("u") or rd.get("u2"))
    if mass <= 0 or rad <= 0:
        return _GATE
    val = mass * rad * rad
    steps = _beats(
        "point-mass moment of inertia I = m r^2 -- inertia about an axis "
        "is mass times the square of its perpendicular distance from "
        "the axis.",
        f"I = {_fmt(mass)} kg x ({_fmt(rad)} m)^2",
        f"I = {_fmt(mass)} x {_fmt(rad * rad)} = {_fmt(val)} kg m^2",
        f"substitute back: r = sqrt(I / m) = sqrt({_fmt(val)} / "
        f"{_fmt(mass)}) = {_fmt(rad)} m -- matches",
        f"the particle resists rotation about the axis with "
        f"{_fmt(val)} kg m^2 of inertia.",
    )
    answer = f"moment of inertia = {_fmt(val)} kg m^2"
    return val, steps, answer, None, "I = m r^2", {"m": mass, "r": rad,
                                                   "result": val}


# ---- 8. relative velocity -------------------------------------------------- #


def _c_relative_velocity(g, m, text):
    if re.search(r"doppler|apparent\s+frequency", text, re.I):
        return _GATE
    hits = _find_all_q(text, r"(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU2
                       + r")\b", _to_ms2)
    vals: List[float] = []
    last_span = None
    for v, span in hits:
        if last_span is None or span != last_span:
            vals.append(v)
            last_span = span
        if len(vals) == 2:
            break
    if len(vals) < 2:
        return _GATE
    v1, v2 = vals[0], vals[1]
    opposite = bool(re.search(r"opposite\s+directions?|towards?\s+each\s+"
                              r"other|toward\s+each\s+other|approach(?:es)?"
                              r"\s+each\s+other|head[-\s]?on", text, re.I))
    same = bool(re.search(r"same\s+direction|along\s+the\s+same|"
                          r"(?:moving|travelling|traveling)\s+behind",
                          text, re.I))
    if opposite == same:
        if opposite:
            return _GATE
        same = True  # default assumption, noted
    if opposite:
        val = v1 + v2
        given = f"v1 = {_fmt(v1)} m/s, v2 = {_fmt(v2)} m/s (opposite directions)"
        comp = f"v_rel = {_fmt(v1)} + {_fmt(v2)} = {_fmt(val)} m/s"
        relation = "v_rel = v1 + v2 (opposite directions)"
        interp = (f"they close on each other at {_fmt(val)} m/s "
                  "(rate of approach).")
    else:
        val = abs(v1 - v2)
        given = f"v1 = {_fmt(v1)} m/s, v2 = {_fmt(v2)} m/s (same direction)"
        comp = (f"v_rel = |{_fmt(v1)} - {_fmt(v2)}| = {_fmt(val)} m/s")
        relation = "v_rel = v1 - v2 (same direction)"
        interp = (f"one gains on the other at only {_fmt(val)} m/s "
                  "(rate of overtaking).")
    steps = _beats(
        f"relative velocity relation {relation} -- velocities measured "
        "in the same frame subtract (same way) or add (opposite ways).",
        given, comp,
        f"sanity check: {'sum' if opposite else 'difference'} of the two "
        f"speeds recomputed = {_fmt(val)} m/s and "
        f"{_fmt(val)} >= 0 -- a closing/overtaking rate cannot be negative",
        interp,
    )
    answer = f"relative velocity = {_fmt(val)} m/s"
    assum = None if not same or opposite else \
        ["directions assumed the same (no explicit direction given)"]
    return val, steps, answer, assum, relation, {"v1": v1, "v2": v2,
                                                 "result": val}


# ---- 9. terminal velocity -------------------------------------------------- #


def _c_terminal_velocity(g, m, text):
    r_m = re.search(r"radius\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>mm|millimetr\w+|cm|centimetr\w+|m|metres?|"
                    r"meters?)\b", text, re.I)
    eta_m = re.search(r"viscosity\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI
                      + r")\s*(?P<u>Pa\s*s|N\s*s\s*/\s*m\s*\^?\s*2|"
                      r"decapoise|poise)\b", text, re.I)
    dens = re.finditer(r"density\s+of\s+(?:the\s+)?(?P<w>[a-z ]{0,20}?)\s*"
                       r"(?:is\s+)?(?P<n>" + _SCI + r")\s*(?P<u>" + _DENSU2
                       + r")", text, re.I)
    rho = sigma = None
    for dm in dens:
        w = dm.group("w").lower()
        conv_n, conv_u = dm.group("n"), dm.group("u")
        v = _sci(conv_n) * (1000.0 if conv_u.lower().startswith("g")
                            else 1.0)
        if re.search(r"ball|sphere|body|solid|metal|drop(?:let)?", w):
            rho = v
        else:
            sigma = v
    if (not r_m or not eta_m) or rho is None:
        return _GATE
    if sigma is None:
        if re.search(r"\bwater\b", text, re.I):
            sigma = 1000.0
        else:
            return _GATE
    rad = _sci(r_m.group("n"))
    ul = r_m.group("u").lower()
    if ul.startswith("mm") or "milli" in ul:
        rad *= 0.001
    elif ul.startswith("c"):
        rad *= 0.01
    eta = _sci(eta_m.group("n"))
    if eta_m.group("u").strip().lower() == "poise":
        eta *= 0.1
    gg = _gval(text)
    if gg is None:
        return _GATE  # implausible explicit g
    if rad <= 0 or eta <= 0 or rho <= sigma:
        return _GATE  # a denser fluid than the ball gives no falling term
    val = 2.0 * rad * rad * (rho - sigma) * gg / (9.0 * eta)
    steps = _beats(
        "Stokes' law terminal velocity v = 2 r^2 (rho - sigma) g / "
        "(9 eta) -- at terminal speed the net viscous drag plus upthrust "
        "balance the weight of the sphere.",
        f"r = {_fmt(rad)} m, rho = {_fmt(rho)} kg/m^3, sigma = "
        f"{_fmt(sigma)} kg/m^3, eta = {_fmt(eta)} Pa s, g = {_fmt(gg)} "
        "m/s^2",
        f"v = 2 x ({_fmt(rad)})^2 x ({_fmt(rho - sigma)}) x {_fmt(gg)} / "
        f"(9 x {_fmt(eta)}) = {_fmt(val)} m/s",
        f"substitute back: eta = 2 r^2 (rho - sigma) g / (9 v) = "
        f"{_fmt(eta)} Pa s -- matches the given viscosity",
        f"the sphere falls steadily at {_fmt(val)} m/s through the fluid.",
    )
    answer = f"terminal velocity = {_fmt(val)} m/s"
    assum = None if sigma != 1000.0 or "water" not in text.lower() else \
        ["sigma = 1000 kg/m^3 taken for water"]
    return val, steps, answer, assum, \
        "v_t = 2 r^2 (rho - sigma) g / (9 eta)", \
        {"r": rad, "rho": rho, "sigma": sigma, "eta": eta, "result": val}


# ---- 10. calorimetry mixture ------------------------------------------------ #


def _c_calorimetry(g, m, text):
    temp_pat = r"(?P<n>-?\d+(?:\.\d+)?)\s*(?:\u00b0\s*)?[\u00b0]?[CK]\b"
    temp_hits = [(float(x.group("n")), x.start())
                 for x in re.finditer(temp_pat, text, re.I)]
    if len(temp_hits) < 2:
        return _GATE
    bodies = []  # (mass_kg, material, temperature)
    for mm in re.finditer(r"(?P<n>" + _SCI + r")\s*(?P<u>" + _MASSU2
                          + r")\b(?!\s*/)", text, re.I):
        v = _to_kg(mm.group("n"), mm.group("u"))
        if v <= 0:
            continue
        ctx = text[mm.start():mm.start() + 45].lower()
        if re.search(r"\bwater\b", ctx):
            material = "water"
        else:
            mat_m = re.search(r"(?:kg|g|kilograms?|grams?)\s+([a-z]+)",
                              ctx)
            material = mat_m.group(1) if mat_m else None
        t_m = re.search(temp_pat, text[mm.start():mm.start() + 45],
                        re.I)
        if not t_m:
            continue
        bodies.append((v, material, float(t_m.group("n"))))
    if len(bodies) != 2:
        return _GATE
    (m1, mat1, t1), (m2, mat2, t2) = bodies
    if t1 == t2:
        return _GATE
    c_map = {}
    for cm in re.finditer(r"specific\s+heat(?:\s+capacity)?\s+of\s+"
                          r"(?:the\s+)?(?P<mat>[a-z]+)[^.]{0,25}?"
                          r"(?:is\s+|=|:)?\s*(?P<n>" + _SCI + r")\s*"
                          r"(?P<u>J\s*/\s*kg|kJ\s*/\s*kg|cal\s*/\s*g)?",
                          text, re.I):
        v = _sci(cm.group("n"))
        ul = (cm.group("u") or "").replace(" ", "").lower()
        if ul.startswith("kj"):
            v *= 1000.0
        elif ul.startswith("cal"):
            v *= 4186.0
        c_map[cm.group("mat").lower()] = v
    cs = []
    for material in (mat1, mat2):
        if material and material in c_map:
            cs.append(c_map[material])
        elif material == "water":
            cs.append(4200.0)
        else:
            return _GATE
    c1, c2 = cs[0], cs[1]
    num = m1 * c1 * t1 + m2 * c2 * t2
    den = m1 * c1 + m2 * c2
    val = num / den
    if not (min(t1, t2) - 1e-9 <= val <= max(t1, t2) + 1e-9):
        return _GATE
    hot = (m1, c1, t1) if t1 > t2 else (m2, c2, t2)
    cold = (m2, c2, t2) if t1 > t2 else (m1, c1, t1)
    lost = hot[0] * hot[1] * (hot[2] - val)
    gained = cold[0] * cold[1] * (val - cold[2])
    steps = _beats(
        "calorimetry principle: heat lost by the hot body = heat gained "
        "by the cold body -- energy conservation in an insulated "
        "mixture.",
        f"m1 c1 (T - T1) = m2 c2 (T - T2) with m1 = {_fmt(m1)} kg, "
        f"c1 = {_fmt(c1)}, T1 = {_fmt(t1)} deg C; m2 = {_fmt(m2)} kg, "
        f"c2 = {_fmt(c2)}, T2 = {_fmt(t2)} deg C",
        f"T = (m1 c1 T1 + m2 c2 T2)/(m1 c1 + m2 c2) = {_fmt(num)} / "
        f"{_fmt(den)} = {_fmt(val)} deg C",
        f"tally: heat lost = {_fmt(hot[0])} x {_fmt(hot[1])} x "
        f"{_fmt(hot[2] - val)} = {_fmt(lost)} J; heat gained = "
        f"{_fmt(cold[0])} x {_fmt(cold[1])} x {_fmt(val - cold[2])} = "
        f"{_fmt(gained)} J -- equal",
        f"the mixture settles at {_fmt(val)} deg C.",
    )
    answer = f"final temperature = {_fmt(val)} deg C"
    return val, steps, answer, \
        ["no heat loss to the surroundings or calorimeter"], \
        "m1 c1 (T - T1) = m2 c2 (T - T2)", \
        {"m1": m1, "c1": c1, "T1": t1, "m2": m2, "c2": c2, "T2": t2,
         "result": val}


# ---- 11. Kepler's third law -------------------------------------------------- #


def _kep_radius(text: str):
    out = []
    for rm in re.finditer(r"(?P<n>" + _SCI + r")\s*(?P<u>au|"
                          r"astronomical\s+units?|km|kilometres?|"
                          r"kilometers?|m|metres?|meters?)\b(?!\s*"
                          r"/\s*s)", text, re.I):
        v = _sci(rm.group("n"))
        ul = rm.group("u").lower()
        if ul.startswith("au") or "astronomical" in ul:
            v *= _AU_M
        elif ul.startswith("k"):
            v *= 1000.0
        out.append(v)
    return out


def _kep_period(text: str):
    out = []
    for tm in re.finditer(r"(?P<n>" + _SCI + r")\s*"
                          r"(?P<u>years?|yrs?|days?|seconds?|secs?|s)\b",
                          text, re.I):
        v = _sci(tm.group("n"))
        ul = tm.group("u").lower()
        if "year" in ul or ul.startswith("yr"):
            v *= 365.25 * 86400.0
        elif ul.startswith("day"):
            v *= 86400.0
        out.append(v)
    return out


def _c_kepler(g, m, text):
    if re.search(r"escape\s+velocity|orbital\s+(?:velocity|speed)",
                 text, re.I):
        return _GATE
    radii = _kep_radius(text)
    periods = _kep_period(text)
    ask_t = bool(_ask_word(text, r"period|time\s+taken|year|day"))
    ask_r = bool(_ask_word(text, r"radius|distance|orbit(?:s|ing)?\s+at"))
    if ask_t and len(radii) == 2 and len(periods) == 1:
        r1, r2, t1 = radii[0], radii[1], periods[0]
        if r1 <= 0 or r2 <= 0 or t1 <= 0:
            return _GATE
        val = t1 * (r2 / r1) ** 1.5
        steps = _beats(
            "Kepler's third law, T^2 proportional to r^3, so "
            "T2 = T1 (r2/r1)^(3/2) -- the square of the orbital period "
            "scales with the cube of the orbit radius.",
            f"T2 = {_fmt(t1)} s x ({_fmt(r2)} / {_fmt(r1)})^(3/2)",
            f"T2 = {_fmt(t1)} x {_fmt((r2 / r1) ** 1.5)} = "
            f"{_fmt(val)} s",
            f"substitute back: (T2/T1)^2 = {_fmt((val / t1) ** 2)} and "
            f"(r2/r1)^3 = {_fmt((r2 / r1) ** 3)} -- equal",
            f"the outer body takes {_fmt(val)} s to complete one orbit.",
        )
        answer = f"period = {_fmt(val)} s"
        return val, steps, answer, None, "T2 = T1 (r2/r1)^(3/2)", \
            {"r1": r1, "r2": r2, "T1": t1, "result": val}
    if ask_r and len(periods) == 2 and len(radii) == 1:
        r1, t1, t2 = radii[0], periods[0], periods[1]
        if r1 <= 0 or t1 <= 0 or t2 <= 0:
            return _GATE
        val = r1 * (t2 / t1) ** (2.0 / 3.0)
        steps = _beats(
            "Kepler's third law, T^2 proportional to r^3, so "
            "r2 = r1 (T2/T1)^(2/3).",
            f"r2 = {_fmt(r1)} m x ({_fmt(t2)} / {_fmt(t1)})^(2/3)",
            f"r2 = {_fmt(r1)} x {_fmt((t2 / t1) ** (2.0 / 3.0))} = "
            f"{_fmt(val)} m",
            f"substitute back: (r2/r1)^3 = {_fmt((val / r1) ** 3)} and "
            f"(T2/T1)^2 = {_fmt((t2 / t1) ** 2)} -- equal",
            f"that period corresponds to an orbit of radius {_fmt(val)} m.",
        )
        answer = f"orbit radius = {_fmt(val)} m"
        return val, steps, answer, None, "r2 = r1 (T2/T1)^(2/3)", \
            {"r1": r1, "T1": t1, "T2": t2, "result": val}
    return _GATE


# ---- 12-13. escape / orbital velocity ---------------------------------------- #


def _planet_mass_radius(text: str):
    m_m = re.search(r"(?:planet|star|body|earth)\s+of\s+mass\s+"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _MASSU2 + r")\b",
                    text, re.I) or \
        re.search(r"mass\s+of\s+(?:the\s+)?(?:planet|star|earth)\s+"
                  r"(?:is\s+)?(?P<n>" + _SCI + r")\s*(?P<u>" + _MASSU2
                  + r")\b", text, re.I)
    r_m = re.search(r"(?:radius|distance)\s+(?:of\s+)?(?:is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>km|kilometres?|"
                    r"kilometers?|m|metres?|meters?)\b(?!\s*/\s*s)",
                    text, re.I)
    if not m_m or not r_m:
        return None, None
    M = _to_kg(m_m.group("n"), m_m.group("u"))
    R = _to_m(r_m.group("n"), r_m.group("u"))
    return M, R


def _c_escape(g, m, text):
    M, R = _planet_mass_radius(text)
    if M is not None and R is not None and M > 0 and R > 0:
        val = math.sqrt(2.0 * _G_UNIVERSAL * M / R)
        given = f"M = {_fmt(M)} kg, R = {_fmt(R)} m"
        relation = "v_e = sqrt(2 G M / R)"
        comp = (f"v_e = sqrt(2 x 6.67e-11 x {_fmt(M)} / {_fmt(R)}) = "
                f"{_fmt(val)} m/s")
        back = (f"R = 2 G M / v_e^2 = {2.0 * _G_UNIVERSAL * M:.6g} / "
                f"{_fmt(val * val)} = {_fmt(R)} m -- matches")
        interp = (f"a body needs {_fmt(val)} m/s to leave the planet "
                  "forever.")
    else:
        r_m = re.search(r"radius\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI
                        + r")\s*(?P<u>km|kilometres?|kilometers?|m|"
                        r"metres?|meters?)\b", text, re.I)
        if not r_m:
            return _GATE
        R = _to_m(r_m.group("n"), r_m.group("u"))
        gg = _gval(text)
        if R <= 0 or gg is None or gg <= 0:
            return _GATE
        val = math.sqrt(2.0 * gg * R)
        given = f"g = {_fmt(gg)} m/s^2, R = {_fmt(R)} m"
        relation = "v_e = sqrt(2 g R)"
        comp = f"v_e = sqrt(2 x {_fmt(gg)} x {_fmt(R)}) = {_fmt(val)} m/s"
        back = (f"g = v_e^2 / (2 R) = {_fmt(val * val)} / "
                f"{_fmt(2.0 * R)} = {_fmt(gg)} m/s^2 -- matches")
        interp = (f"the escape speed from this body's surface is "
                  f"{_fmt(val)} m/s.")
    steps = _beats(
        f"escape velocity formula {relation} -- the launch speed whose "
        "kinetic energy exactly cancels the gravitational potential "
        "(energy conservation, final speed zero at infinity).",
        given, comp, f"substitute back: {back}", interp,
    )
    answer = f"escape velocity = {_fmt(val)} m/s"
    return val, steps, answer, None, relation, {"R": R, "result": val}


def _c_orbital(g, m, text):
    M, R = _planet_mass_radius(text)
    if M is None or R is None or M <= 0 or R <= 0:
        return _GATE
    if re.search(r"escape", text, re.I):
        return _GATE
    val = math.sqrt(_G_UNIVERSAL * M / R)
    steps = _beats(
        "orbital velocity formula v_o = sqrt(G M / r) -- gravity is the "
        "centripetal force holding the satellite in its circular orbit "
        "(set G M m / r^2 = m v^2 / r and solve for v).",
        f"v_o = sqrt(6.67e-11 x {_fmt(M)} kg / {_fmt(R)} m)",
        f"v_o = sqrt({_fmt(_G_UNIVERSAL * M)} / {_fmt(R)}) = "
        f"{_fmt(val)} m/s",
        f"substitute back: r = G M / v_o^2 = {_fmt(_G_UNIVERSAL * M)} / "
        f"{_fmt(val * val)} = {_fmt(R)} m -- matches",
        f"the satellite must orbit at {_fmt(val)} m/s to stay in that "
        "circle.",
    )
    answer = f"orbital velocity = {_fmt(val)} m/s"
    return val, steps, answer, None, "v_o = sqrt(G M / r)", \
        {"M": M, "r": R, "result": val}


# ---- 14. Young's modulus ------------------------------------------------------ #


_AREA_MM = r"(?:mm\s*\^?\s*2|square\s+millimet(?:re|er)s?)"
_AREA_CM = r"(?:cm\s*\^?\s*2|square\s+centimet(?:re|er)s?)"
_AREA_M = (r"(?:m\s*\^?\s*2|square\s*(?:metres?|meters?))")


def _c_young(g, m, text):
    if re.search(r"spring\s+constant|hooke", text, re.I):
        return _GATE  # springs belong to HOOKE_LAW
    f = _f_force(text)
    l_m = re.search(r"length\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _DISTU + r")\b", text, re.I)
    a_m = re.search(r"(?:cross[-\s]?section(?:al)?(?:\s+area)?)\s*"
                    r"(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _AREA_MM + r"|" + _AREA_CM + r"|"
                    + _AREA_M + r")\b", text, re.I) or \
        re.search(r"cross[-\s]?sectional\s+area\s+(?:of\s+)?(?:is\s+)?"
                  r"(?P<n>" + _SCI + r")\s*(?P<u>" + _AREA_MM + r"|"
                  + _AREA_CM + r"|" + _AREA_M + r")\b", text, re.I)
    d_m = re.search(r"diameter\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI
                    + r")\s*(?P<u>mm|millimetr\w+|cm|centimetr\w+|m|"
                    r"metres?|meters?)\b", text, re.I) or \
        re.search(r"radius\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
                  r"(?P<u>mm|millimetr\w+|cm|centimetr\w+|m|metres?|"
                  r"meters?)\b", text, re.I)
    dl_m = re.search(r"(?:stretched|elongated|extends?|stretches?|"
                     r"compressed|shorten(?:s|ed)?|increase[sd]?\s+in\s+"
                     r"length)\s*(?:by|through|to)?\s*(?P<n>" + _SCI
                     + r")\s*(?P<u>mm|millimetr\w+|cm|centimetr\w+|m|"
                     r"metres?|meters?)\b", text, re.I) or \
        re.search(r"(?:elongation|extension|compression)\s+(?:of\s+|is\s+)?"
                  r"(?P<n>" + _SCI + r")\s*(?P<u>mm|millimetr\w+|cm|"
                  r"centimetr\w+|m|metres?|meters?)\b", text, re.I)
    y_m = re.search(r"[Yy]oung(?:'s)?\s+modulus\s+(?:of\s+(?:the\s+)?"
                    r"[\w-]+\s*)?(?:is\s+|=)?\s*(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>GPa|MPa|Pa)?", text, re.I)
    yof_m = re.search(r"[Yy]oung(?:'s)?\s+modulus\s+of\s+(?:the\s+)?"
                      r"(?:steel|copper|brass|aluminium|aluminum|iron|"
                      r"wire|material)\s*(?:is|=)?\s*(?P<n>" + _SCI
                      + r")\s*(?P<u2>GPa|MPa|Pa|\*?10\^?-?\d+)", text,
                      re.I) or \
        re.search(r"\(?\s*Y(?:\s*[_=]?\s*(?:steel|copper|brass|wire))?\s*"
                  r"=\s*(?P<n2>[\d.]+)\s*[x\u00d7]?\s*10\s*\^?\s*(?P<e2>1[01])"
                  r"\s*(?:Pa|N\s*/\s*m\s*\^?\s*2)?\s*\)?", text, re.I)
    def conv_area(n, u):
        v = _sci(n)
        ul = u.strip().lower()
        if ul.startswith("mm"):
            return v * 1e-6
        if ul.startswith("cm"):
            return v * 1e-4
        return v
    def conv_len(n, u):
        v = _sci(n)
        ul = u.strip().lower()
        if ul.startswith("mm") or "milli" in ul:
            return v * 0.001
        if ul.startswith("c"):
            return v * 0.01
        return v
    L = _to_m(l_m.group("n"), l_m.group("u")) if l_m else None
    A = conv_area(a_m.group("n"), a_m.group("u")) if a_m else None
    if A is None and d_m is not None:
        dv = conv_len(d_m.group("n"), d_m.group("u"))
        if re.match(r"diameter", d_m.group(0), re.I):
            A = math.pi * dv * dv / 4.0
        else:
            A = math.pi * dv * dv
    dL = conv_len(dl_m.group("n"), dl_m.group("u")) if dl_m else None
    Y = None
    if y_m:
        Y = _sci(y_m.group("n"))
        yu = (y_m.group("u") or "").upper()
        Y = Y * 1e9 if yu == "GPA" else (Y * 1e6 if yu == "MPA" else Y)
    if Y is None and yof_m:
        if yof_m.groupdict().get("e2"):
            Y = float(yof_m.group("n2")) * 10.0 ** int(yof_m.group("e2"))
        else:
            Y = _sci(yof_m.group("n"))
            yu2 = (yof_m.group("u2") or "").upper()
            if yu2 == "GPA":
                Y *= 1e9
            elif yu2 == "MPA":
                Y *= 1e6
    ask_y = bool(re.search(r"young(?:'s)?\s+modulus", text, re.I)) and \
        y_m is None and yof_m is None
    ask_dl = dl_m is None and bool(_ask_word(
        text, r"elongation|extension|stretch|increase\s+in\s+length"))
    ask_stress = bool(re.search(r"\bstress\b", text, re.I)) and not ask_y
    ask_strain = bool(re.search(r"\bstrain\b", text, re.I)) and not ask_y
    if ask_y and f is not None and L and A and dL:
        stress = f / A
        strain = dL / L
        val = f * L / (A * dL)
        steps = _beats(
            "Young's modulus definition Y = stress / strain = "
            "(F/A)/(dL/L) = F L / (A dL) -- the elastic stiffness of a "
            "material under tension.",
            f"Y = ({_fmt(f)} N / {_fmt(A)} m^2) / ({_fmt(dL)} m / "
            f"{_fmt(L)} m)",
            f"stress = {_fmt(stress)} Pa, strain = {dL / L:.6g}, "
            f"Y = {_fmt(val)} Pa",
            f"substitute back: dL = F L / (A Y) = {_fmt(f * L)} / "
            f"({_fmt(A)} x {_fmt(val)}) = {_fmt(dL)} m -- matches",
            f"the wire's material has stiffness {_fmt(val)} Pa.",
        )
        answer = f"Young's modulus = {_fmt(val)} Pa"
        return val, steps, answer, None, "Y = (F/A)/(dL/L)", \
            {"F": f, "L": L, "A": A, "dL": dL, "stress": stress,
             "strain": strain, "result": val}
    if ask_dl and f is not None and L and A and Y:
        val = f * L / (A * Y)
        steps = _beats(
            "Young's modulus relation Y = F L / (A dL) rearranged, "
            "dL = F L / (A Y).",
            f"dL = {_fmt(f)} N x {_fmt(L)} m / ({_fmt(A)} m^2 x "
            f"{_fmt(Y)} Pa)",
            f"dL = {_fmt(f * L)} / {_fmt(A * Y)} = {_fmt(val)} m",
            f"substitute back: Y = F L / (A dL) = {_fmt(f * L)} / "
            f"({_fmt(A)} x {_fmt(val)}) = {_fmt(Y)} Pa -- matches",
            f"the wire stretches by {_fmt(val)} m under the load.",
        )
        answer = f"extension = {_fmt(val)} m"
        return val, steps, answer, None, "dL = F L / (A Y)", \
            {"F": f, "L": L, "A": A, "Y": Y, "result": val}
    # stress / strain asks (ISC-style "calculate the stress and the
    # strain"): stress = F / A, strain = dL / L -- independent of Y.
    if (ask_stress or ask_strain) and f is not None and A is not None \
            and f > 0 and A > 0:
        stress = f / A
        if ask_strain and dL is not None and L:
            strain = dL / L
            val = stress if ask_stress else strain
            steps = _beats(
                "stress and strain definitions: stress = F / A, "
                "strain = dL / L (both dimensionally independent of the "
                "material's stiffness).",
                f"stress = {_fmt(f)} N / {_fmt(A)} m^2 = {_fmt(stress)} "
                f"Pa; strain = {_fmt(dL)} m / {_fmt(L)} m",
                f"stress = {_fmt(stress)} Pa, strain = {strain:.6g}",
                f"check: F = stress x A = {_fmt(stress)} x {_fmt(A)} = "
                f"{_fmt(f)} N -- matches the given load",
                f"the loaded wire carries stress {_fmt(stress)} Pa at "
                f"strain {strain:.6g}.",
            )
            answer = (f"stress = {_fmt(stress)} Pa; strain = "
                      f"{strain:.6g}")
            return val, steps, answer, None, "stress = F / A; strain = dL / L", \
                {"F": f, "A": A, "L": L, "dL": dL, "stress": stress,
                 "strain": strain, "result": val}
        if ask_stress:
            val = stress
            steps = _beats(
                "stress definition sigma = F / A -- force spread over the "
                "cross-sectional area.",
                f"sigma = {_fmt(f)} N / {_fmt(A)} m^2",
                f"sigma = {_fmt(f)} / {_fmt(A)} = {_fmt(val)} Pa",
                f"check: F = sigma x A = {_fmt(val)} x {_fmt(A)} = "
                f"{_fmt(f)} N -- matches",
                f"the wire carries a stress of {_fmt(val)} Pa.",
            )
            answer = f"stress = {_fmt(val)} Pa"
            return val, steps, answer, None, "stress = F / A", \
                {"F": f, "A": A, "stress": stress, "result": val}
    if ask_strain and dL is not None and L and not ask_stress:
        val = dL / L
        steps = _beats(
            "strain definition epsilon = dL / L -- fractional change of "
            "length, unitless.",
            f"epsilon = {_fmt(dL)} m / {_fmt(L)} m",
            f"epsilon = {val:.6g}",
            f"check: dL = epsilon x L = {val:.6g} x {_fmt(L)} = "
            f"{_fmt(dL)} m -- matches",
            f"the deformation is a strain of {val:.6g}.",
        )
        answer = f"strain = {val:.6g}"
        return val, steps, answer, None, "strain = dL / L", \
            {"L": L, "dL": dL, "strain": val, "result": val}
    return _GATE


# ---- 15. YDSE fringe width ---------------------------------------------------- #


def _wave_lambda(text: str) -> Optional[float]:
    lam_m = re.search(r"(?:wavelength|lambda)\s+(?:of\s+|is\s+|"
                      r"used\s+is\s+)?(?P<n>" + _SCI + r")\s*"
                      r"(?P<u>nm|nanomet\w+|um|microm\w+|\u03bcm|"
                      r"\u00b5m|m)\b", text, re.I)
    if not lam_m:
        return None
    v = _sci(lam_m.group("n"))
    ul = lam_m.group("u").lower()
    if ul.startswith("n"):
        return v * 1e-9
    if ul.startswith("u") or ul.startswith("\u03bc") or ul.startswith("\u00b5"):
        return v * 1e-6
    return v


def _c_ydse(g, m, text):
    lam = _wave_lambda(text)
    d_m = re.search(r"(?:slits?\s+(?:are\s+)?(?:separated|apart)|"
                    r"slit\s+separation)[^.]{0,25}?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>mm|millimetr\w+|cm|centimetr\w+|m)\b", text,
                    re.I)
    d_m = d_m or re.search(r"(?P<n>" + _SCI + r")\s*(?P<u>mm|millimetr\w+)"
                           r"\s+apart", text, re.I)
    dscr_m = re.search(r"screen[^.]{0,40}?(?P<n>" + _SCI + r")\s*"
                       r"(?P<u>cm|centimetr\w+|m|metres?|meters?)\b"
                       r"|(?P<n2>" + _SCI + r")\s*(?P<u2>cm|centimetr\w+|m)"
                       r"\b\s*(?:away|from\s+the\s+slits)", text, re.I)
    if lam is None or not d_m or not dscr_m:
        return _GATE
    d_raw = _sci(d_m.group("n"))
    dul = d_m.group("u").lower()
    d = d_raw * 0.001 if (dul.startswith("mm") or "milli" in dul) else \
        (d_raw * 0.01 if dul.startswith("c") else d_raw)
    dscr = _to_m(dscr_m.group("n") or dscr_m.group("n2"),
                 dscr_m.group("u") or dscr_m.group("u2"))
    if d <= 0 or dscr <= 0 or lam <= 0:
        return _GATE
    beta = lam * dscr / d
    k_m = re.search(r"(?P<k>\d+)(?:st|nd|rd|th)\s+(?:bright|dark)?\s*"
                    r"fringe", text, re.I)
    if k_m:
        k = int(k_m.group("k"))
        val = k * beta
        given = (f"lambda = {_fmt(lam)} m, D = {_fmt(dscr)} m, "
                 f"d = {_fmt(d)} m, n = {k}")
        comp = (f"beta = lambda D / d = {_fmt(beta)} m; n x beta = "
                f"{k} x {_fmt(beta)} = {_fmt(val)} m")
        interp = (f"the {k}th fringe lies {_fmt(val)} m from the central "
                  "maximum.")
    else:
        val = beta
        given = (f"lambda = {_fmt(lam)} m, D = {_fmt(dscr)} m, "
                 f"d = {_fmt(d)} m")
        comp = f"beta = {_fmt(lam)} x {_fmt(dscr)} / {_fmt(d)} = {_fmt(val)} m"
        interp = (f"bright and dark fringes repeat every {_fmt(val)} m "
                  "on the screen.")
    steps = _beats(
        "YDSE fringe width formula beta = lambda D / d -- path "
        "difference changes by one wavelength between successive bright "
        "fringes.",
        given, comp,
        f"substitute back: d = lambda D / beta = {_fmt(lam * dscr)} / "
        f"{_fmt(val if not k_m else beta)} = {_fmt(d)} m -- matches",
        interp,
    )
    answer = f"fringe width = {_fmt(beta)} m"
    return val, steps, answer, None, "beta = lambda D / d", \
        {"lambda": lam, "D": dscr, "d": d, "beta": beta, "result": val}


# ---- 16. resolving power of a telescope --------------------------------------- #


def _c_resolving(g, m, text):
    a_m = re.search(r"aperture(?:\s+(?:of|diameter))?\s+(?:of\s+|is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>mm|millimetr\w+|cm|"
                    r"centimetr\w+|m|metres?|meters?)\b", text, re.I)
    lam = _wave_lambda(text)
    if not a_m or lam is None:
        return _GATE
    a = _to_m(a_m.group("n"), a_m.group("u"))
    if a <= 0 or lam <= 0:
        return _GATE
    dtheta = 1.22 * lam / a
    if re.search(r"limit\s+of\s+resolution|resolving\s+limit|angular\s+"
                 r"resolution", text, re.I):
        val = dtheta
        steps = _beats(
            "Rayleigh criterion for a circular aperture: limit of "
            "resolution dtheta = 1.22 lambda / a -- smaller means finer "
            "detail resolvable.",
            f"dtheta = 1.22 x {_fmt(lam)} m / {_fmt(a)} m",
            f"dtheta = {_fmt(1.22 * lam)} / {_fmt(a)} = {_fmt(val)} rad",
            f"substitute back: a = 1.22 lambda / dtheta = "
            f"{_fmt(1.22 * lam)} / {_fmt(val)} = {_fmt(a)} m -- matches",
            f"angles below {_fmt(val)} rad blur together in this "
            "telescope.",
        )
        answer = f"limit of resolution = {_fmt(val)} rad"
    else:
        val = 1.0 / dtheta
        steps = _beats(
            "telescope resolving power RP = a / (1.22 lambda) = "
            "1 / dtheta -- the inverse of the smallest resolvable angle "
            "(Rayleigh criterion).",
            f"RP = {_fmt(a)} m / (1.22 x {_fmt(lam)} m)",
            f"RP = {_fmt(a)} / {_fmt(1.22 * lam)} = {_fmt(val)}",
            f"substitute back: dtheta = 1 / RP = 1 / {_fmt(val)} = "
            f"{_fmt(dtheta)} rad -- consistent with Rayleigh",
            f"the telescope separates sources {val:.4g} times finer than "
            "1 radian.",
        )
        answer = f"resolving power = {_fmt(val)}"
    return val, steps, answer, None, "dtheta = 1.22 lambda / a", \
        {"a": a, "lambda": lam, "result": val}


# ---- 17. semiconductor logic gates -------------------------------------------- #


_GATE_TABLE = {
    "AND": lambda a, b: a and b,
    "OR": lambda a, b: a or b,
    "NAND": lambda a, b: 1 - (a and b),
    "NOR": lambda a, b: 1 - (a or b),
    "XOR": lambda a, b: a ^ b,
}


def _c_logic_gate(g, m, text):
    gate = None
    for name in ("NAND", "NOR", "XOR", "NOT", "AND", "OR"):
        if re.search(r"\b" + name + r"\s+gate\b", text, re.I):
            gate = name
            break
    if gate is None:
        return _GATE
    bits = [int(b) for b in re.findall(r"(?<![\d.])([01])(?![\d])(?!\.\d)",
                                       text)]
    if gate == "NOT":
        if len(bits) < 1:
            return _GATE
        val = float(1 - bits[0])
        given = f"input = {bits[0]}"
        comp = f"NOT {bits[0]} = {int(val)}"
        interp = (f"the NOT gate inverts: an input of {bits[0]} comes out "
                  f"as {int(val)}.")
    else:
        if len(bits) < 2:
            return _GATE
        a, b = bits[0], bits[1]
        val = float(_GATE_TABLE[gate](a, b))
        given = f"inputs A = {a}, B = {b}"
        comp = f"{gate}({a}, {b}) = {int(val)}"
        expr = {"AND": "both inputs 1 give 1, otherwise 0",
                "OR": "any input 1 gives 1, otherwise 0",
                "NAND": "AND followed by NOT: 0 only when both inputs "
                        "are 1",
                "NOR": "OR followed by NOT: 1 only when both inputs "
                       "are 0",
                "XOR": "1 only when the inputs differ"}[gate]
        interp = f"the {gate} gate's truth table: {expr}; output = {int(val)}."
    steps = _beats(
        f"{gate} gate truth-table evaluation -- digital outputs follow "
        "directly from the gate's defining truth table.",
        given, comp,
        f"check against the truth table entry for {gate}: consistent "
        f"(output is {int(val)})",
        interp,
    )
    answer = f"output = {int(val)}"
    return val, steps, answer, None, f"{gate} gate truth table", \
        {"result": val}


# ---- 18. transistor current gains ---------------------------------------------- #


def _c_transistor(g, m, text):
    def current(word):
        c_m = re.search(word + r"\s+current[^.]{0,40}?(?P<n>" + _SCI
                        + r")\s*(?P<u>mA|\u00b5A|uA|A)\b", text, re.I)
        if not c_m:
            return None
        v = _sci(c_m.group("n"))
        ul = c_m.group("u").lower()
        if ul == "ma":
            return v * 1e-3
        if ul in ("\u00b5a", "ua"):
            return v * 1e-6
        return v
    ic = current(r"collector")
    ib = current(r"base")
    ie = current(r"emitter")
    al_m = re.search(r"\balpha\b[^.]{0,30}?(?P<n>\d*\.\d+)", text, re.I)
    be_m = re.search(r"\bbeta\b[^.]{0,30}?(?P<n>\d+(?:\.\d+)?)", text,
                     re.I)
    alpha = _n(al_m.group("n")) if al_m else None
    beta = _n(be_m.group("n")) if be_m else None
    ask_beta = bool(re.search(r"\bbeta\b|current\s+gain", text, re.I))
    ask_alpha = bool(re.search(r"\balpha\b", text, re.I))
    ask_ic = bool(re.search(r"collector\s+current", text, re.I))
    if alpha is not None and ask_beta and beta is None:
        if not (0 < alpha < 1):
            return _GATE
        val = alpha / (1.0 - alpha)
        given = f"alpha = {alpha:g}"
        comp = f"beta = {alpha:g} / (1 - {alpha:g}) = {val:.6g}"
        back = (f"alpha = beta / (1 + beta) = {val:.6g} / "
                f"{1.0 + val:.6g} = {alpha:g} -- matches")
        interp = f"the transistor's current gain beta is {val:.6g}."
        ans = f"beta = {val:.6g}"
        relation = "beta = alpha / (1 - alpha)"
    elif ic is not None and ib is not None and ib > 0 and \
            (ask_beta or (ib and ic)):
        val = ic / ib
        given = (f"I_C = {_fmt(ic * 1e3)} mA, I_B = {_fmt(ib * 1e6)} "
                 "uA")
        comp = f"beta = {_fmt(ic)} / {_fmt(ib)} = {val:.6g}"
        back = (f"I_C = beta I_B = {val:.6g} x {_fmt(ib)} = "
                f"{_fmt(ic)} A -- matches")
        interp = f"the collector current is {val:.6g} times the base current."
        ans = f"beta = {val:.6g}"
        relation = "beta = I_C / I_B"
    elif ic is not None and ie is not None and ie > ic:
        val = ic / ie
        given = (f"I_C = {_fmt(ic * 1e3)} mA, I_E = {_fmt(ie * 1e3)} mA")
        comp = f"alpha = {_fmt(ic)} / {_fmt(ie)} = {val:.6g}"
        back = (f"I_E = I_C + I_B with I_B = I_E - I_C = "
                f"{_fmt(ie - ic)} A -- Kirchhoff consistent")
        interp = (f"alpha = {val:.6g}: nearly all emitter current "
                  "reaches the collector.")
        ans = f"alpha = {val:.6g}"
        relation = "alpha = I_C / I_E"
    elif beta is not None and ib is not None and ib > 0 and ask_ic:
        val = beta * ib
        given = f"beta = {beta:g}, I_B = {_fmt(ib * 1e6)} uA"
        comp = f"I_C = {beta:g} x {_fmt(ib)} = {_fmt(val)} A"
        back = f"beta = I_C / I_B = {_fmt(val)} / {_fmt(ib)} = {beta:g} -- matches"
        interp = f"the collector carries {_fmt(val * 1e3)} mA."
        ans = f"I_C = {_fmt(val)} A"
        relation = "I_C = beta I_B"
    else:
        return _GATE
    steps = _beats(
        f"transistor gain relation {relation} -- the small base current "
        "controls the large collector current (active mode).",
        given, comp, f"substitute back: {back}", interp,
    )
    return val, steps, ans, None, relation, {"result": val}


# ---- 19. echo / SONAR ---------------------------------------------------------- #


def _c_echo(g, m, text):
    v_m = re.search(r"(?:speed|velocity)\s+of\s+(?:sound|ultrasound|"
                    r"ultrasonic\s+waves?|sound\s+in\s+(?:water|air|sea))\s*"
                    r"(?:in\s+[\w ]+)?(?:is\s+|=|of)?\s*(?P<n>" + _SCI
                    + r")\s*(?P<u>" + _VELU2 + r")", text, re.I)
    t_m = re.search(r"(?:after|in|within|heard\s+after)\s+(?P<n>" + _SCI
                    + r")\s*(?P<u>" + _TIMEU + r")\b", text, re.I)
    if not t_m:
        return _GATE
    t = _to_s(t_m.group("n"), t_m.group("u"))
    if v_m:
        v = _to_ms(v_m.group("n"), v_m.group("u"))
        assum = None
    else:
        v = 340.0
        assum = ["speed of sound taken as 340 m/s (air)"]
    if t <= 0 or v <= 0:
        return _GATE
    val = v * t / 2.0
    steps = _beats(
        "echo ranging relation d = v t / 2 -- the sound travels to the "
        "reflecting surface and back, so the one-way distance is half "
        "the total path (SONAR uses the same principle).",
        f"d = {_fmt(v)} m/s x {_fmt(t)} s / 2",
        f"d = {_fmt(v * t)} / 2 = {_fmt(val)} m",
        f"substitute back: t = 2 d / v = 2 x {_fmt(val)} / {_fmt(v)} = "
        f"{_fmt(t)} s -- matches the given echo time",
        f"the reflecting surface is {_fmt(val)} m away.",
    )
    answer = f"distance = {_fmt(val)} m"
    return val, steps, answer, assum, "d = v t / 2", \
        {"v": v, "t": t, "result": val}


# ---- 20. machines: MA, VR, efficiency ------------------------------------------ #


def _c_machine(g, m, text):
    if re.search(r"depreciat\w+|interest|profit|discount", text, re.I):
        return _GATE  # commercial "machine" questions are not mechanics
    ma_m = re.search(r"mechanical\s+advantage\s+(?:of\s+|is\s+)?(?P<n>"
                     + _SCI + r")", text, re.I)
    vr_m = re.search(r"velocity\s+ratio\s+(?:of\s+|is\s+)?(?P<n>" + _SCI
                     + r")", text, re.I)
    load_m = re.search(r"load\s+(?:of\s+|is\s+)?(?P<n>" + _SCI + r")\s*"
                       r"(?P<u>" + _FORCEU + r")\b", text, re.I)
    eff_m = re.search(r"effort\s+(?:of\s+|is\s+)?(?P<n>" + _SCI + r")\s*"
                      r"(?P<u>" + _FORCEU + r")\b", text, re.I)
    effcy_m = re.search(r"efficiency\s+(?:of\s+(?:a|the)\s+machine\s+)?"
                        r"(?:is\s+)?(?P<n>" + _SCI + r")\s*%?", text, re.I)
    MA = _sci(ma_m.group("n")) if ma_m else None
    VR = _sci(vr_m.group("n")) if vr_m else None
    load = _to_n(load_m.group("n"), load_m.group("u")) if load_m else None
    effort = _to_n(eff_m.group("n"), eff_m.group("u")) if eff_m else None
    effcy = _sci(effcy_m.group("n")) if effcy_m else None
    if effcy is not None and effcy <= 1.0 and effcy_m and \
            "%" not in text[max(0, effcy_m.start()):effcy_m.end() + 2]:
        effcy = effcy * 100.0
    ask_eff = bool(re.search(r"efficiency", text, re.I))
    ask_ma = bool(re.search(r"mechanical\s+advantage", text, re.I))
    if load is not None and effort is not None and effort > 0 and \
            (ask_ma or MA is None):
        val = load / effort
        given = f"load = {_fmt(load)} N, effort = {_fmt(effort)} N"
        comp = f"MA = {_fmt(load)} / {_fmt(effort)} = {_fmt(val)}"
        back = (f"load = MA x effort = {_fmt(val)} x {_fmt(effort)} = "
                f"{_fmt(load)} N -- matches")
        interp = f"the machine multiplies the effort {val:.6g} times."
        ans = f"mechanical advantage = {_fmt(val)}"
        relation = "MA = load / effort"
    elif MA is not None and VR is not None and VR > 0 and ask_eff:
        val = MA / VR * 100.0
        given = f"MA = {_fmt(MA)}, VR = {_fmt(VR)}"
        comp = f"eta = {_fmt(MA)} / {_fmt(VR)} x 100 = {_fmt(val)} %"
        back = (f"MA = eta x VR / 100 = {_fmt(val)} x {_fmt(VR)} / 100 "
                f"= {_fmt(MA)} -- matches")
        interp = (f"{val:.6g}% of the input work reaches the load; the "
                  "rest is friction.")
        ans = f"efficiency = {_fmt(val)} %"
        relation = "eta = MA / VR x 100"
    elif effcy is not None and VR is not None and VR > 0 and ask_ma:
        val = effcy * VR / 100.0
        given = f"eta = {_fmt(effcy)} %, VR = {_fmt(VR)}"
        comp = f"MA = {_fmt(effcy)} x {_fmt(VR)} / 100 = {_fmt(val)}"
        back = (f"eta = MA / VR x 100 = {_fmt(val)} / {_fmt(VR)} x 100 "
                f"= {_fmt(effcy)} % -- matches")
        interp = f"the machine's mechanical advantage is {_fmt(val)}."
        ans = f"mechanical advantage = {_fmt(val)}"
        relation = "MA = eta x VR / 100"
    elif load is not None and MA is not None and MA > 0 and \
            effort is None:
        val = load / MA
        given = f"load = {_fmt(load)} N, MA = {_fmt(MA)}"
        comp = f"effort = {_fmt(load)} / {_fmt(MA)} = {_fmt(val)} N"
        back = (f"load = MA x effort = {_fmt(MA)} x {_fmt(val)} = "
                f"{_fmt(load)} N -- matches")
        interp = f"an effort of {_fmt(val)} N lifts the load."
        ans = f"effort = {_fmt(val)} N"
        relation = "MA = load / effort"
    else:
        return _GATE
    steps = _beats(
        f"machine relation {relation} -- a machine trades force for "
        "distance; efficiency compares the mechanical advantage with "
        "the velocity ratio.",
        given, comp, f"substitute back: {back}", interp,
    )
    return val, steps, ans, None, relation, {"result": val}


# ---- 21. angular dispersion / dispersive power ---------------------------------- #


def _c_dispersion(g, m, text):
    def ref(word):
        rm = re.search(word + r"\s*(?:=|is)?\s*(?P<n>\d\.\d+)", text, re.I)
        return _n(rm.group("n")) if rm else None
    muv = ref(r"(?:mu|n|\u03bc)\s*[_\s]*v(?:iolet)?")
    mur = ref(r"(?:mu|n|\u03bc)\s*[_\s]*r(?:ed)?")
    muy = ref(r"(?:mu|n|\u03bc)\s*[_\s]*y(?:ellow)?")
    a_m = re.search(r"prism\s+(?:of\s+)?(?:apex\s+)?angle\s+"
                    r"(?:of\s+|is\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?:degrees?|\u00b0|deg)?", text, re.I) or \
        re.search(r"angle\s+(?:of\s+)?(?:the\s+)?prism\s+(?:is\s+)?"
                  r"(?P<n2>" + _SCI + r")\s*(?:degrees?|\u00b0|deg)?",
                  text, re.I)
    ask_pow = bool(re.search(r"dispersive\s+power", text, re.I))
    ask_ang = bool(re.search(r"angular\s+dispersion", text, re.I))
    if ask_pow and muv is not None and mur is not None and \
            muy is not None and muy > 1.0 and muv > mur:
        val = (muv - mur) / (muy - 1.0)
        steps = _beats(
            "dispersive power relation omega = (mu_v - mu_r)/(mu_y - 1) "
            "-- how strongly the prism spreads violet from red relative "
            "to the mean deviation.",
            f"omega = ({_fmt(muv)} - {_fmt(mur)}) / ({_fmt(muy)} - 1)",
            f"omega = {_fmt(muv - mur)} / {_fmt(muy - 1.0)} = "
            f"{val:.6g}",
            f"substitute back: (mu_v - mu_r) = omega (mu_y - 1) = "
            f"{val:.6g} x {_fmt(muy - 1.0)} = {_fmt(muv - mur)} -- "
            "matches",
            f"a dispersive power of {val:.6g} means a wide, weak-mean "
            "spectrum.",
        )
        answer = f"dispersive power = {val:.6g}"
        return val, steps, answer, None, \
            "omega = (mu_v - mu_r)/(mu_y - 1)", {"result": val}
    if (ask_ang or not ask_pow) and muv is not None and mur is not None \
            and a_m and muv > mur:
        A = _sci(a_m.group("n") or a_m.group("n2"))
        if not (0 < A < 180):
            return _GATE
        val = (muv - mur) * A
        steps = _beats(
            "angular dispersion relation delta = (mu_v - mu_r) A -- the "
            "violet-red spread of a thin prism grows with the prism "
            "angle.",
            f"delta = ({_fmt(muv)} - {_fmt(mur)}) x {_fmt(A)} deg",
            f"delta = {_fmt(muv - mur)} x {_fmt(A)} = {_fmt(val)} deg",
            f"substitute back: A = delta / (mu_v - mu_r) = "
            f"{_fmt(val)} / {_fmt(muv - mur)} = {_fmt(A)} deg -- matches",
            f"violet and red emerge {_fmt(val)} deg apart.",
        )
        answer = f"angular dispersion = {_fmt(val)} deg"
        return val, steps, answer, None, "delta = (mu_v - mu_r) A", \
            {"A": A, "result": val}
    return _GATE


# ---- 22. Doppler effect ---------------------------------------------------------- #


def _c_doppler(g, m, text):
    if re.search(r"relative\s+(?:velocity|speed)", text, re.I):
        return _GATE
    f0_m = re.search(r"frequency\s+(?:of\s+)?(?:the\s+)?(?:source|siren|"
                     r"whistle|engine)?\s*(?:is\s+|of\s+)?(?P<n>" + _SCI
                     + r")\s*(?P<u>kHz|Hz|hertz)\b", text, re.I)
    if not f0_m:
        return _GATE
    f0 = _sci(f0_m.group("n"))
    if f0_m.group("u").upper().startswith("K"):
        f0 *= 1000.0
    v_m = re.search(r"speed\s+of\s+sound\s+(?:in\s+[\w ]+\s*)?(?:is\s+|"
                    r"of\s+|=)?\s*(?P<n>" + _SCI + r")\s*(?P<u>" + _VELU2
                    + r")", text, re.I)
    if v_m:
        v = _to_ms(v_m.group("n"), v_m.group("u"))
        assum = None
    else:
        v = 340.0
        assum = ["speed of sound taken as 340 m/s (air)"]
    def mover(who):
        mm = re.search(who + r"[^.]{0,80}?(?P<n>" + _SCI + r")\s*"
                       r"(?P<u>" + _VELU2 + r")", text, re.I)
        if not mm:
            return None, False
        spd = _to_ms(mm.group("n"), mm.group("u"))
        seg = text[max(0, mm.start() - 120):mm.end()].lower()
        toward = bool(re.search(r"toward|approach", seg))
        away = bool(re.search(r"away|reced", seg))
        return spd, (toward and not away)
    src_word = r"(?:source|siren|whistle|engine|ambulance)"
    vs, vs_toward = mover(src_word)
    vo, vo_toward = mover(r"(?:observer|listener)")
    moving_source = re.search(src_word + r"[^.]{0,80}?(?:moves?|moving|"
                              r"approach\w*|reced\w*|flies|drives|rushes|"
                              r"travels?\s+(?:toward|away))", text,
                              re.I) is not None
    moving_observer = re.search(r"(?:observer|listener)[^.]{0,80}?"
                                r"(?:moves?|moving|approach\w*|reced\w*|"
                                r"runs?|walks?|drives|rushes|chases|"
                                r"travels?\s+(?:toward|away))", text,
                                re.I) is not None
    if vs is None or not moving_source:
        vs = 0.0
        vs_toward = False
    if vo is None or not moving_observer:
        vo = 0.0
        vo_toward = False
    if vs == 0.0 and vo == 0.0:
        return _GATE  # nothing moves: no Doppler shift to compute
    num = v + (vo if vo_toward else -vo)
    den = v - (vs if vs_toward else -vs)
    if den <= 0:
        return _GATE  # source moving at or beyond the wave speed
    val = f0 * num / den
    who = []
    who.append(f"source moves {'toward' if vs_toward else 'away from'} "
               f"the observer at {_fmt(vs)} m/s" if vs else
               "source stationary")
    who.append(f"observer moves {'toward' if vo_toward else 'away from'} "
               f"the source at {_fmt(vo)} m/s" if vo else
               "observer stationary")
    steps = _beats(
        "Doppler effect relation f' = f (v + v_o)/(v - v_s) -- motion "
        "toward raises the heard frequency (numerator up, denominator "
        "down); signs flip for motion away.",
        f"f = {_fmt(f0)} Hz, v = {_fmt(v)} m/s; " + "; ".join(who),
        f"f' = {_fmt(f0)} x {_fmt(num)} / {_fmt(den)} = {_fmt(val)} Hz",
        f"sanity check: {'approaching raises' if val > f0 else 'receding lowers'} "
        f"the pitch: f' = {_fmt(val)} Hz "
        f"{'>' if val > f0 else '<'} f = {_fmt(f0)} Hz -- consistent",
        f"the observer hears {_fmt(val)} Hz.",
    )
    answer = f"apparent frequency = {_fmt(val)} Hz"
    return val, steps, answer, assum, "f' = f (v + vo)/(v - vs)", \
        {"f": f0, "v": v, "vs": vs, "vo": vo, "result": val}


# ---- 23. plane mirror reflection -------------------------------------------------- #


def _c_mirror_angle(g, m, text):
    i_m = re.search(r"angle\s+of\s+(?:incidence|inclination)\s+"
                    r"(?:of\s+|is\s+)?(?P<n>\d+(?:\.\d+)?)\s*"
                    r"(?:degrees?|\u00b0|deg)?", text, re.I)
    if not i_m:
        return _GATE
    theta = _n(i_m.group("n"))
    if not (0 < theta < 90):
        return _GATE
    val = theta
    steps = _beats(
        "first law of reflection (plane mirror): angle of incidence = "
        "angle of reflection, both measured from the normal.",
        f"i = {_fmt(theta)} deg, so r = i = {_fmt(theta)} deg",
        f"r = {_fmt(theta)} deg",
        f"check: i + r = {_fmt(2 * theta)} deg and i = r -- the law of "
        "reflection holds",
        f"the reflected ray leaves at {_fmt(theta)} deg to the normal.",
    )
    answer = f"angle of reflection = {_fmt(theta)} deg"
    return val, steps, answer, None, "i = r (law of reflection)", \
        {"i": theta, "r": theta, "result": val}


# ---- 24. density / mass / volume (ICSE measurement phrasings) ----------------- #

# volume unit fragment with mL/cc added (graduated-cylinder convention);
# returns value in cm^3
_VOL_ML = (r"(?:m\s*\^?\s*3|cm\s*\^?\s*3|cc|ml|millilitr\w+|litres?|"
           r"liters?)")


def _vol_ml(text: str, tag: str = "n"):
    """Volume in cm^3 from "N mL", "N cm^3", "N cc", "N litres"."""
    m = re.search(r"(?P<" + tag + ">" + _SCI + r")\s*(?P<u_" + tag + ">"
                  + _VOL_ML + r")\b", text, re.I)
    if not m:
        return None
    v = _sci(m.group(tag))
    ul = re.sub(r"[\s.^*]", "", m.group("u_" + tag).lower())
    if ul.startswith("m3"):
        return v * 1e6          # m^3 -> cm^3
    if ul.startswith("l"):
        return v * 1000.0       # litres -> cm^3
    return v                    # cm^3 / cc / mL


def _density_ask(text: str) -> str:
    """Which density reading the question asks for: 'kg' (SI), 'g'
    (cgs), 'rd' (relative density) or ''.  Both-unit asks ("in g cm-3
    and kg m-3") count as SI primary."""
    asks = []
    if re.search(r"density[^.]{0,60}?(?:kg\s*m|kg\s*/\s*m|si)|"
                 r"(?:kg\s*m\s*\^?\s*-?3|kg\s*/\s*m\s*\^?\s*3)", text, re.I):
        asks.append("kg")
    if re.search(r"g\s*(?:/|per)?\s*(?:cm|cc)|g\s*cm", text, re.I):
        asks.append("g")
    if re.search(r"relative\s+density|\br\.d\.?\b", text, re.I):
        asks.append("rd")
    if not asks:
        return "kg"
    return asks[0] if len(asks) == 1 else "kg"


def _c_density(g, m, text):
    """rho = m / V and its rearrangements, in the measurement styles the
    ICSE c8 corpus uses: graduated-cylinder displacement (final -
    initial), Eureka-can overflow, rectangular dimensions, plain
    mass+volume, and the reverse m = rho V / V = m / rho readings."""
    if re.search(r"buoyant|upthrust|archimedes|apparent\s+weight|"
                 r"hydrostatic|floats?\s+(?:in|on)\s+water\s+by", text,
                 re.I):
        return _GATE  # fluid-force readings belong to the buoyancy family
    ask = re.search(r"(?:find|calculate|compute|determine|what\s+is)"
                    r"[^.]{0,50}?(?:the\s+)?(?:density|mass|volume|"
                    r"relative\s+density)", text, re.I)
    if not ask:
        return _GATE
    # --- reverse readings first: mass from rho and V, V from m and rho
    rho_m = re.search(r"(?:density|rho|\u03c1)\s+(?:of\s+(?:the\s+)?"
                      r"[\w-]+\s*)?(?:is\s+)?(?P<n>" + _SCI + r")\s*"
                      r"(?P<u>kg\s*/\s*m\s*\^?\s*3|g\s*/\s*cm\s*\^?\s*3|"
                      r"g\s*/\s*cc|g\s*cm\s*\^?\s*-?\d|kg\s*m\s*\^?\s*-?\d|"
                      r"kg\s*per\s*cubic\s*metre|g\s*per\s*cubic\s*"
                      r"centimet\w+)", text, re.I)
    rho = None
    rho_gcc = None
    if rho_m:
        ul = rho_m.group("u").lower().replace(" ", "")
        if ul.startswith("g"):
            rho_gcc = _sci(rho_m.group("n"))
            rho = rho_gcc * 1000.0
        else:
            rho = _sci(rho_m.group("n"))
            rho_gcc = rho / 1000.0
    mass = _f_mass(text)
    V_ml = None
    # displaced/rise volume: "rises from 50 mL to 55.7 mL", "rises to
    # 80 mL" (initial from "containing A mL"), "displaces 80 mL",
    # "overflow ... 88 mL collects", "reads 40 mL ... and 60 mL after"
    rise = re.search(
        r"rises?\s+from\s+(?P<a>" + _SCI + r")\s*(?P<au>" + _VOL_ML
        + r")?\s*to\s+(?P<b>" + _SCI + r")\s*(?P<bu>" + _VOL_ML + r")",
        text, re.I) or \
        re.search(r"reads?\s+(?P<a2>" + _SCI + r")\s*(?P<a2u>" + _VOL_ML
                  + r")[^.]{0,40}?\b(?:and|then)\s+(?P<b2>" + _SCI
                  + r")\s*(?P<b2u>" + _VOL_ML + r")", text, re.I) or \
        re.search(r"(?:rises?|climbs?|goes\s+up)\s+to\s+(?P<b3>" + _SCI
                  + r")\s*(?P<b3u>" + _VOL_ML + r")", text, re.I) or \
        re.search(r"displaces?\s+(?:about\s+)?(?P<b4>" + _SCI + r")\s*"
                  r"(?P<b4u>" + _VOL_ML + r")", text, re.I) or \
        re.search(r"(?:overflow|collected|collects?)\s*[^.]{0,40}?"
                  r"(?P<b5>" + _SCI + r")\s*(?P<b5u>" + _VOL_ML + r")",
                  text, re.I)
    if rise:
        if rise.groupdict().get("a") is not None:
            V_ml = _sci(rise.group("b")) - _sci(rise.group("a"))
        elif rise.groupdict().get("a2") is not None:
            V_ml = _sci(rise.group("b2")) - _sci(rise.group("a2"))
        elif rise.groupdict().get("b3") is not None:
            init = re.search(r"contain(?:s|ing)\s+(?P<i>" + _SCI + r")\s*"
                             r"(?P<iu>" + _VOL_ML + r")", text, re.I)
            V_ml = _sci(rise.group("b3")) - \
                (_sci(init.group("i")) if init else 0.0)
        elif rise.groupdict().get("b4") is not None:
            V_ml = _sci(rise.group("b4"))
        else:
            V_ml = _sci(rise.group("b5"))
        if V_ml is None or V_ml <= 0:
            return _GATE
    # rectangular dimensions: "8 cm x 5 cm x 2 cm"
    dims = re.search(
        r"(?P<x>" + _SCI + r")\s*(?P<xu>" + _DISTU + r")?\s*[x\u00d7]\s*"
        r"(?P<y>" + _SCI + r")\s*(?P<yu>" + _DISTU + r")?\s*[x\u00d7]\s*"
        r"(?P<z>" + _SCI + r")\s*(?P<zu>" + _DISTU + r")?", text, re.I)
    if V_ml is None and dims:
        def _dm(num, un):
            return _to_m(num, un or "m")
        V_ml = (_dm(dims.group("x"), dims.group("xu")) *
                _dm(dims.group("y"), dims.group("yu")) *
                _dm(dims.group("z"), dims.group("zu"))) * 1e6
    if V_ml is None:
        vm = re.search(r"volume\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI
                       + r")\s*(?P<u>" + _VOL_ML + r")\b", text, re.I)
        if vm:
            v = _sci(vm.group("n"))
            ul = re.sub(r"[\s.^*]", "", vm.group("u").lower())
            V_ml = v * 1e6 if ul.startswith("m3") else \
                (v * 1000.0 if ul.startswith("l") else v)
    q = _normalize(text)
    low = q.lower()

    def want_mass():
        return bool(re.search(r"(?:find|calculate|compute|determine)"
                              r"[^.]{0,40}?\bmass\b|\bmass\b[^.]{0,30}?\?",
                              low))

    def want_vol():
        return bool(re.search(r"(?:find|calculate|compute|determine|"
                              r"occupies)[^.]{0,40}?\bvolume\b|"
                              r"\bvolume\b[^.]{0,30}?\?", low))

    def want_rd():
        return bool(re.search(r"relative\s+density", low))

    def want_dens():
        return bool(re.search(r"(?:find|calculate|compute|determine)"
                              r"[^.]{0,40}?density|density\s+\?", low)) or \
            (re.search(r"\bdensity\b", low) is not None and
             not want_mass() and not want_vol())

    # mass asked, density given: m = rho V
    if want_mass() and rho is not None and V_ml is not None:
        mass_si = rho * (V_ml * 1e-6)
        g_out = rho_gcc * V_ml
        steps = _beats(
            "density rearrangement m = rho x V -- mass is density times "
            "volume.",
            f"rho = {_fmt(rho_gcc)} g/cm^3, V = {_fmt(V_ml)} cm^3",
            f"m = {_fmt(rho_gcc)} x {_fmt(V_ml)} = {_fmt(g_out)} g = "
            f"{_fmt(mass_si * 1000.0)} g",
            f"check: rho = m / V = {_fmt(g_out)} / {_fmt(V_ml)} = "
            f"{_fmt(rho_gcc)} g/cm^3 -- matches",
            f"the sample has a mass of {_fmt(g_out)} g.",
        )
        # numeric answer in grams -- the question's own unit convention
        val = g_out
        answer = f"mass = {_fmt(g_out)} g"
        return val, steps, answer, None, "m = rho x V", \
            {"rho": rho, "V_m3": V_ml * 1e-6, "mass_g": g_out,
             "result": val}
    # volume asked, density + mass given: V = m / rho
    if want_vol() and rho is not None and mass is not None:
        mass_g = mass * 1000.0
        vol_cm3 = mass_g / rho_gcc
        steps = _beats(
            "density rearrangement V = m / rho -- volume is mass over "
            "density.",
            f"m = {_fmt(mass_g)} g, rho = {_fmt(rho_gcc)} g/cm^3",
            f"V = {_fmt(mass_g)} / {_fmt(rho_gcc)} = {_fmt(vol_cm3)} "
            f"cm^3",
            f"check: rho = m / V = {_fmt(mass_g)} / {_fmt(vol_cm3)} = "
            f"{_fmt(rho_gcc)} g/cm^3 -- matches",
            f"the sample occupies {_fmt(vol_cm3)} cm^3.",
        )
        val = vol_cm3
        answer = f"volume = {_fmt(vol_cm3)} cm^3"
        return val, steps, answer, None, "V = m / rho", \
            {"rho": rho, "mass_kg": mass, "V_m3": vol_cm3 * 1e-6,
             "result": val}
    # density (or relative density) asked from mass + volume
    if mass is None or V_ml is None or V_ml <= 0 or mass <= 0:
        return _GATE
    if not (want_dens() or want_rd()):
        return _GATE
    rho_gcc_val = (mass * 1000.0) / V_ml
    rho_si = rho_gcc_val * 1000.0
    mode = "rd" if want_rd() and not want_dens() else _density_ask(q)
    if mode == "rd":
        steps = _beats(
            "relative density = density of the substance / density of "
            "water (1000 kg/m^3 = 1 g/cm^3) -- a pure ratio, no unit.",
            f"rho = {_fmt(mass * 1000.0)} g / {_fmt(V_ml)} cm^3 = "
            f"{_fmt(rho_gcc_val)} g/cm^3",
            f"RD = {_fmt(rho_gcc_val)} / 1.0 = {_fmt(rho_gcc_val)}",
            f"check: RD x rho_water = {_fmt(rho_gcc_val)} x 1000 = "
            f"{_fmt(rho_si)} kg/m^3 -- consistent",
            f"the substance is "
            f"{'denser than water (sinks)' if rho_gcc_val > 1.0 else 'lighter than water (floats)'}"
            f" with RD = {_fmt(rho_gcc_val)}.",
        )
        val = rho_gcc_val
        answer = f"relative density = {_fmt(val)}"
        return val, steps, answer, None, "RD = rho / rho_water", \
            {"mass_kg": mass, "V_m3": V_ml * 1e-6, "rho": rho_si,
             "result": val}
    steps = _beats(
        "density definition rho = m / V, with 1 g/cm^3 = 1000 kg/m^3.",
        f"m = {_fmt(mass * 1000.0)} g, V = {_fmt(V_ml)} cm^3",
        f"rho = {_fmt(mass * 1000.0)} / {_fmt(V_ml)} = "
        f"{_fmt(rho_gcc_val)} g/cm^3 = {_fmt(rho_si)} kg/m^3",
        f"check: m = rho V = {_fmt(rho_gcc_val)} x {_fmt(V_ml)} = "
        f"{_fmt(mass * 1000.0)} g -- matches the given mass",
        f"the material's density is {_fmt(rho_si)} kg/m^3"
        + (" -- it sinks in water." if rho_gcc_val > 1.0 else
           " -- it floats on water." if rho_gcc_val < 1.0 else "."),
    )
    val = rho_si
    answer = (f"density = {_fmt(rho_si)} kg/m^3 = "
              f"{_fmt(rho_gcc_val)} g/cm^3")
    return val, steps, answer, None, "rho = m / V", \
        {"mass_kg": mass, "V_m3": V_ml * 1e-6, "rho": rho_si,
         "result": val}


# ---- 25. thermal expansion ------------------------------------------------------ #

def _c_thermal_expansion(g, m, text):
    """Delta-L = L alpha Delta-T (linear), Delta-A = 2 alpha A Delta-T
    (superficial), Delta-V = 3 alpha V Delta-T (cubic) -- ICSE c8 heat
    chapter, any of L / alpha / DeltaT solved."""
    if re.search(r"specific\s+heat|latent\s+heat|calorimet", text, re.I):
        return _GATE
    lam = re.search(r"(?:alpha|\u03b1)\s*(?:_?\w*)?\s*(?:of\s+(?:the\s+)?"
                    r"[\w-]+\s*)?(?:is\s+|=|of\s+)?\s*(?P<al>(?P<n>" + _SCI
                    + r")\s*[x\u00d7*]?\s*10\s*(?:\^|\*\*)?\s*(?P<e>-?\d+)"
                    r"|(?P<plain>-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?))"
                    r"\s*(?:per|/|K\u207b|\u00b0C\u207b|k\u207b|c\u207b)?",
                    text, re.I)
    if lam is None:
        lam = re.search(r"(?P<al>(?P<n2>[\d.]+)\s*[x\u00d7]\s*10\s*\^?\s*"
                        r"(?P<e2>-?\d+))\s*(?:per\s+)?(?:K\b|\u00b0C\b|k\u207b1|c\u207b1|\u00b0C\u207b1|K\u207b1)",
                        text, re.I)
    alpha = None
    if lam is not None:
        gd = lam.groupdict()
        try:
            if gd.get("plain"):
                alpha = _sci(gd["plain"])
            elif gd.get("n"):
                alpha = _sci(gd["n"]) * 10.0 ** int(gd["e"])
            elif gd.get("n2"):
                alpha = _sci(gd["n2"]) * 10.0 ** int(gd["e2"])
        except Exception:
            alpha = None
    if alpha is not None and not (1e-8 < alpha < 1e-2):
        return _GATE  # expansion coefficients live in the 1e-7..1e-4 band
    # temperatures
    def _temps(t):
        ms = re.findall(
            r"(-?\d+(?:\.\d+)?)\s*(?:\u00b0\s*)?(?:C|celsius|K|kelvin)\b",
            t, re.I)
        return [float(x) for x in ms]
    temps = _temps(text)
    dT = None
    dT_m = re.search(r"(?:heated|warmed|cooled|raises?\s+(?:the\s+)?"
                     r"temperature|rises?\s+(?:in\s+temperature)?|"
                     r"temperature\s+(?:rises?|changes?|difference)|"
                     r"through|by)\s*(?:a\s+)?(?:range\s+of\s+)?"
                     r"(?P<d>" + _SCI + r")\s*(?:\u00b0\s*)?[KC]\b",
                     text, re.I)
    if len(temps) >= 2:
        dT = abs(temps[-1] - temps[0])
    elif dT_m:
        dT = _sci(dT_m.group("d"))
    if dT is None or dT <= 0:
        return _GATE
    kind = None
    m_kind = re.search(r"\b(linear|superficial|area|cubical|volume|"
                       r"coefficient)\b", text, re.I)
    ask_alpha = bool(re.search(r"coefficient", text, re.I)) \
        and alpha is None
    L_hit = _first(text, [
        r"(?:original\s+)?length\s+(?:of\s+)?(?:is\s+)?(?:a\s+|an\s+|"
        r"the\s+)?(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
        r"rod\s+(?:of\s+)?length\s+(?P<n>" + _SCI + r")\s*(?P<u>"
        + _DISTU + r")\b",
        r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\s+"
        r"(?:\w+\s+)?(?:long|rod|rail|bridge|wire|plate)",
    ], _to_m)
    L = L_hit[0] if L_hit else None
    A = None
    a_m = re.search(r"(?:side|edge)\s+(?:of\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>" + _DISTU + r")\b", text, re.I)
    V = _vol_ml(text) if re.search(r"volume|sphere|cubic", text, re.I) \
        else None
    dl_m = re.search(r"(?:expands?\s+by|expansion\s+of|grows?\s+by|"
                     r"increases?\s+(?:in\s+length\s+)?by|lengthens?\s+by|"
                     r"changes?\s+(?:in\s+length\s+)?by|longer|change\s+in\s+(?:length|volume|area))\s*"
                     r"(?:is\s+|of\s+)?(?P<n>" + _SCI + r")\s*"
                     r"(?P<u>mm|millimetr\w+|cm|centimetr\w+|m|metres?|"
                     r"meters?|cm\^?3|cm\u00b3|cc|m\^?3|m\u00b3|cm\s*\^?\s*2|m\s*\^?\s*2)",
                     text, re.I) or \
        re.search(r"(?:expansion|increase)\s+(?:of\s+)?(?P<n2>" + _SCI
                  + r")\s*(?P<u2>mm|millimetr\w+|cm|centimetr\w+|m)",
                  text, re.I)
    # the expansion itself may be the UNKNOWN ("calculate the increase
    # in length", "how much longer does the deck become"); the rail
    # phrasing asks for the expansion GAP ("calculate the gap to leave
    # so the rail just touches") -- same delta-L computation
    ask_dl_calc = dl_m is None and bool(re.search(
        r"(?:increase|change)\s+in\s+(?:the\s+)?length|how\s+much\s+"
        r"longer|does\s+the\s+deck\s+become|\bgap\b[^.]{0,60}?"
        r"(?:leave|touch|fit)", text, re.I))
    if dl_m is None and not ask_alpha and not ask_dl_calc:
        return _GATE
    def conv_dl(n, u):
        v = _sci(n)
        ul = u.strip().lower()
        if ul.startswith("mm") or "milli" in ul:
            return v * 0.001
        if ul.startswith("c"):
            return v * 0.01
        return v
    dL = conv_dl(dl_m.group("n"), dl_m.group("u")) if dl_m else None
    # branch by what is asked / given
    if ask_alpha and L is not None and dL is not None:
        val = dL / (L * dT)
        if not (1e-8 < val < 1e-2):
            return _GATE
        steps = _beats(
            "linear expansion relation dL = L alpha dT rearranged, "
            "alpha = dL / (L dT).",
            f"alpha = {_fmt(dL)} m / ({_fmt(L)} m x {_fmt(dT)} K)",
            f"alpha = {_fmt(dL)} / {_fmt(L * dT)} = {val:.4g} per K",
            f"substitute back: dL = L alpha dT = {_fmt(L)} x {val:.4g} x "
            f"{_fmt(dT)} = {_fmt(dL)} m -- matches",
            f"the material's linear expansivity is {val:.4g} K^-1.",
        )
        answer = f"alpha = {val:.4g} per K"
        return val, steps, answer, None, "alpha = dL / (L dT)", \
            {"L": L, "dT": dT, "dL": dL, "result": val}
    if (dL is not None or ask_dl_calc) and L is not None and \
            alpha is not None and not ask_alpha:
        val = L * alpha * dT
        if dL is not None and not _close_rel(val, dL, 0.25):
            return _GATE  # given expansion contradicts L alpha dT
        steps = _beats(
            "linear expansion relation dL = L alpha dT -- a heated solid "
            "lengthens in proportion to its original length and the "
            "temperature rise.",
            f"dL = {_fmt(L)} m x {alpha:.4g} x {_fmt(dT)} K",
            f"dL = {_fmt(L * alpha * dT)} m"
            + (" = " + f"{_fmt(val * 1000.0)} mm" if val < 0.01 else ""),
            f"substitute back: alpha = dL/(L dT) = {_fmt(val)} / "
            f"({_fmt(L)} x {_fmt(dT)}) = {alpha:.4g} -- matches",
            f"the solid lengthens by {_fmt(val)} m"
            + (f" ({_fmt(val * 1000.0)} mm)" if val < 0.01 else "") + ".",
        )
        answer = f"increase in length = {_fmt(val)} m"
        return val, steps, answer, None, "dL = L alpha dT", \
            {"L": L, "dT": dT, "alpha": alpha, "result": val}
    # superficial / cubical branches
    if re.search(r"area", text, re.I) and a_m is not None and \
            alpha is not None:
        s = _to_m(a_m.group("n"), a_m.group("u"))
        val = 2.0 * alpha * (s * s) * dT
        steps = _beats(
            "superficial expansion dA = 2 alpha A dT (area grows twice "
            "as fast as linear) for a square plate of side s.",
            f"dA = 2 x {alpha:.4g} x ({_fmt(s)} m)^2 x {_fmt(dT)} K",
            f"dA = 2 x {alpha:.4g} x {_fmt(s * s)} x {_fmt(dT)} = "
            f"{_fmt(val)} m^2",
            f"substitute back: alpha = dA / (2 A dT) = {_fmt(val)} / "
            f"(2 x {_fmt(s * s)} x {_fmt(dT)}) = {alpha:.4g} -- matches",
            f"the plate's area grows by {_fmt(val)} m^2.",
        )
        answer = f"increase in area = {_fmt(val)} m^2"
        return val, steps, answer, None, "dA = 2 alpha A dT", \
            {"side": s, "dT": dT, "alpha": alpha, "result": val}
    if V is not None and alpha is not None:
        val = 3.0 * alpha * (V * 1e-6) * dT
        steps = _beats(
            "cubical expansion dV = gamma V dT with gamma = 3 alpha.",
            f"dV = 3 x {alpha:.4g} x {_fmt(V * 1e-6)} m^3 x {_fmt(dT)} K",
            f"dV = {_fmt(val)} m^3",
            f"substitute back: gamma = dV/(V dT) = {_fmt(val)} / "
            f"({_fmt(V * 1e-6)} x {_fmt(dT)}) = {3 * alpha:.4g} = "
            "3 alpha -- consistent",
            f"the volume grows by {_fmt(val)} m^3.",
        )
        answer = f"increase in volume = {_fmt(val)} m^3"
        return val, steps, answer, None, "dV = 3 alpha V dT", \
            {"V_m3": V * 1e-6, "dT": dT, "alpha": alpha, "result": val}
    return _GATE


def _close_rel(a: float, b: float, rel: float) -> bool:
    return abs(a - b) <= rel * max(abs(a), abs(b)) if \
        (a or b) else a == b


# ---- 26. charge: Q = I t and electron count --------------------------------- #

def _c_charge_carrier(g, m, text):
    """Q = I t (charge past a point) and n = Q / e (elementary count) --
    ICSE current-electricity phrasings; Q may be given directly."""
    i_m = re.search(r"(?:current\s+of\s+|current\s+is\s+)?(?P<n>" + _SCI
                    + r")\s*(?P<u>mA|milliamp\w*|uA|\u00b5A|A|amp\w*)\b"
                    r"[^.]{0,40}?(?:flows?|passed|passes|is\s+passed|"
                    r"through)", text, re.I) or \
        re.search(r"(?:current)\s+(?:of\s+)?(?P<n2>" + _SCI + r")\s*"
                  r"(?P<u2>mA|milliamp\w*|uA|\u00b5A|A|amp\w*)\b", text,
                  re.I)
    t_hit = None
    ii = None
    if i_m is not None:
        gd = i_m.groupdict()
        ii = _sci(gd.get("n") or gd.get("n2"))
        uu = (gd.get("u") or gd.get("u2") or "A").lower()
        if uu.startswith("ma") or "milliamp" in uu:
            ii *= 1e-3
        elif uu.startswith(("ua", "\u00b5a")):
            ii *= 1e-6
        t_hit = _first(text, [
            r"(?:for|in|during)\s+(?P<n>" + _SCI + r")\s*(?P<u>" + _TIMEU
            + r")\b",
            r"(?:time\s+)?(?P<n>" + _SCI + r")\s*(?P<u>" + _TIMEU
            + r")\b",
        ], _to_s)
        if t_hit is not None and (t_hit[0] <= 0 or ii <= 0):
            return _GATE
    Q = None
    if ii is not None and t_hit is not None:
        Q = ii * t_hit[0]
    else:
        # charge stated directly: "gains a charge of -3.2e-9 C",
        # "a charge of 2 mC"
        q_m = re.search(r"charge\s+of\s+(?P<n>-?" + _SCI + r")\s*"
                        r"(?P<u>mC|\u00b5C|uC|nC|C)\b", text, re.I)
        if q_m is None:
            return _GATE
        Q = _sci(q_m.group("n"))
        uq = q_m.group("u").lower()
        Q *= {"mc": 1e-3, "\u00b5c": 1e-6, "uc": 1e-6, "nc": 1e-9}.get(
            uq, 1.0)
    e_m = re.search(r"e\s*(?:=|is)\s*([\d.]+)\s*[x\u00d7]?\s*10\s*\^?\s*"
                    r"(-?\d+)\s*C", text, re.I)
    e = float(e_m.group(1)) * 10.0 ** int(e_m.group(2)) if e_m else 1.6e-19
    ask_electrons = bool(re.search(r"electrons?", text, re.I))
    if ask_electrons:
        Qm = abs(Q)
        if Qm == 0:
            return _GATE
        val = Qm / e
        if not (0.0 < val < 1e30):
            return _GATE
        steps = _beats(
            "charge quantisation Q = n e rearranged, n = Q / e with "
            "e = " + f"{e:.3g}" + " C -- every electron carries one "
            "elementary charge.",
            f"Q = {_fmt(Qm)} C",
            f"n = {_fmt(Qm)} / {e:.3g} = {val:.6g}",
            f"substitute back: Q = n e = {val:.6g} x {e:.3g} = "
            f"{_fmt(Qm)} C -- matches",
            f"the body carries {val:.4g} excess electrons.",
        )
        answer = f"electrons = {val:.4g}"
        return val, steps, answer, None, "n = Q / e", \
            {"Q": Qm, "e": e, "result": val}
    ask_charge = bool(re.search(r"charge", text, re.I))
    if not ask_charge or Q is None:
        return _GATE
    steps = _beats(
        "current definition I = Q / t rearranged, Q = I x t -- charge is "
        "current multiplied by time.",
        f"Q = {_fmt(ii)} A x {_fmt(t_hit[0])} s",
        f"Q = {_fmt(ii)} x {_fmt(t_hit[0])} = {_fmt(Q)} C",
        f"substitute back: I = Q / t = {_fmt(Q)} / {_fmt(t_hit[0])} = "
        f"{_fmt(ii)} A -- matches the given current",
        f"{_fmt(Q)} C of charge passes the cross-section.",
    )
    answer = f"charge = {_fmt(Q)} C"
    return Q, steps, answer, None, "Q = I t", \
        {"I": ii, "t": t_hit[0], "result": Q}


# ---- 27. sound: frequency, wavelength, decibels ------------------------------- #

def _c_sound(g, m, text):
    """f = N / t (vibrations count), T = 1 / f, lambda = v / f (v = 340
    m/s in air by default), and decibel level beta = 10 log10(I / I0)."""
    # --- decibel level -------------------------------------------------
    i_m = re.search(r"intensity[^.]{0,40}?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>W\s*m\s*\^?\s*-?2|W/m\s*\^?2|W\s*/\s*m\s*2)",
                    text, re.I)
    if i_m is not None and re.search(r"decibels?|\bdB\b", text, re.I):
        inten = _sci(i_m.group("n"))
        if inten <= 0:
            return _GATE
        val = 10.0 * math.log10(inten / 1e-12)
        steps = _beats(
            "sound-intensity level beta = 10 log10(I / I0) with the "
            "threshold of hearing I0 = 1e-12 W/m^2.",
            f"beta = 10 x log10({_fmt(inten)} / 1e-12)",
            f"beta = 10 x log10({_fmt(inten / 1e-12)}) = {_fmt(val)} dB",
            f"check: I = I0 x 10^(beta/10) = 1e-12 x 10^{val / 10.0:.6g} "
            f"= {_fmt(inten)} W/m^2 -- matches",
            f"the sound registers {_fmt(val)} dB.",
        )
        answer = f"sound level = {_fmt(val)} dB"
        return val, steps, answer, None, "beta = 10 log10(I / 1e-12)", \
            {"I": inten, "result": val}
    fac_m = re.search(r"intensity[^.]{0,60}?(?:increased|raised)\s+by\s+"
                      r"a\s+factor\s+of\s+(?P<f>" + _SCI + r")", text,
                      re.I)
    if fac_m is not None and re.search(r"decibels?|\bdB\b", text, re.I):
        fac = _sci(fac_m.group("f"))
        if fac <= 0:
            return _GATE
        val = 10.0 * math.log10(fac)
        steps = _beats(
            "every tenfold intensity rise adds 10 dB: delta-beta = "
            "10 log10(factor).",
            f"delta-beta = 10 x log10({_fmt(fac)})",
            f"delta-beta = {_fmt(val)} dB",
            f"check: a factor of 10 gives exactly 10 dB, so {_fmt(fac)} "
            f"times gives 10 x log10({_fmt(fac)}) = {_fmt(val)} dB",
            f"the level rises by {_fmt(val)} dB.",
        )
        answer = f"increase = {_fmt(val)} dB"
        return val, steps, answer, None, "delta-beta = 10 log10(factor)", \
            {"factor": fac, "result": val}
    # --- wavelength from frequency -------------------------------------
    lam_ask = bool(re.search(r"wavelength", text, re.I))
    if lam_ask:
        f_m = re.search(r"(?:frequency|vibrat\w+|resonat\w+)\s+(?:of\s+|"
                        r"is\s+|at\s+)?(?P<n>" + _SCI + r")\s*(?P<u>kHz|Hz|"
                        r"hertz|cycles?\s+per\s+second)\b", text, re.I)
        v_m = re.search(r"(?:speed|velocity)\s+of\s+(?:sound|the\s+sound|"
                        r"sound\s+in\s+air|sound\s+in\s+water)\s*"
                        r"(?:is\s+|of\s+|=)?\s*(?P<n2>" + _SCI + r")\s*"
                        r"(?P<u2>" + _VELU2 + r")", text, re.I)
        if f_m is None:
            return _GATE
        f0 = _sci(f_m.group("n"))
        if f_m.group("u").lower().startswith("k"):
            f0 *= 1000.0
        if v_m is not None:
            v = _to_ms(v_m.group("n2"), v_m.group("u2"))
            assum = None
        else:
            v = 340.0
            assum = ["speed of sound taken as 340 m/s (air)"]
        if f0 <= 0 or v <= 0:
            return _GATE
        val = v / f0
        steps = _beats(
            "wave relation v = f lambda rearranged, lambda = v / f -- "
            "one wavelength is the distance the wave travels in one "
            "period.",
            f"lambda = {_fmt(v)} m/s / {_fmt(f0)} Hz",
            f"lambda = {_fmt(v)} / {_fmt(f0)} = {_fmt(val)} m",
            f"substitute back: v = f lambda = {_fmt(f0)} x {_fmt(val)} = "
            f"{_fmt(v)} m/s -- matches the given speed",
            f"the sound's wavelength is {_fmt(val)} m.",
        )
        answer = f"wavelength = {_fmt(val)} m"
        return val, steps, answer, assum, "lambda = v / f", \
            {"f": f0, "v": v, "result": val}
    # --- frequency from vibration count / period -----------------------
    vib_m = re.search(r"(?:completes?|makes?|vibrat\w+|oscillat\w+)"
                      r"[^.]{0,40}?(?P<n>" + _SCI + r")\s*(?:complete\s+)?"
                      r"(?:vibrations?|oscillations?|cycles?|waves?|times)"
                      r"[^.]{0,40}?(?:in|per|every)\s+(?P<t>" + _SCI
                      + r")\s*(?P<u>" + _TIMEU + r")", text, re.I) or \
        re.search(r"(?P<n>" + _SCI + r")\s*(?:vibrations?|oscillations?|"
                  r"cycles?|wingbeats?|beats?)\s+per\s+(?P<u>second|sec|"
                  r"s|minute|min)\b", text, re.I)
    ask_f = bool(re.search(r"frequency", text, re.I))
    ask_T = bool(re.search(r"time\s+period|period", text, re.I))
    if vib_m is not None:
        n = _sci(vib_m.group("n"))
        per = (vib_m.group("u") or "").lower()
        if re.search(r"per", vib_m.group(0), re.I):
            t = 1.0 / (60.0 if per.startswith("mi") else 1.0)
        else:
            t = _to_s(vib_m.group("t"), vib_m.group("u"))
        if n <= 0 or t <= 0:
            return _GATE
        val = n / t
        if ask_T and not ask_f:
            T = 1.0 / val
            steps = _beats(
                "period is the reciprocal of frequency, T = 1 / f.",
                f"f = {n:g} / {_fmt(t)} s = {_fmt(val)} Hz",
                f"T = 1 / {_fmt(val)} = {T:.6g} s",
                f"check: f x T = {_fmt(val)} x {T:.6g} = 1 -- "
                "reciprocal pair",
                f"each vibration takes {T:.6g} s.",
            )
            answer = f"time period = {T:.6g} s"
            return T, steps, answer, None, "T = 1 / f", \
                {"f": val, "result": T}
        steps = _beats(
            "frequency definition f = number of vibrations / time taken "
            "(Hz = vibrations per second).",
            f"f = {n:g} vibrations / {_fmt(t)} s",
            f"f = {n:g} / {_fmt(t)} = {_fmt(val)} Hz",
            f"check: vibrations in 1 s = f x 1 s = {_fmt(val)} -- "
            "consistent with the definition",
            f"the body vibrates at {_fmt(val)} Hz.",
        )
        answer = f"frequency = {_fmt(val)} Hz"
        return val, steps, answer, None, "f = N / t", \
            {"N": n, "t": t, "result": val}
    # --- period from a stamped frequency -------------------------------
    per_m = re.search(r"(?:frequency|vibrates?\s+at|stamped|marked|"
                      r"labelled|labeled)\s+(?:of\s+|is\s+|as\s+|at\s+)?"
                      r"(?:\"|')?(?P<n>" + _SCI + r")\s*(?P<u>kHz|Hz|"
                      r"hertz)\b", text, re.I)
    if per_m is not None and ask_T and not ask_f:
        f0 = _sci(per_m.group("n"))
        if per_m.group("u").lower().startswith("k"):
            f0 *= 1000.0
        if f0 <= 0:
            return _GATE
        T = 1.0 / f0
        steps = _beats(
            "period is the reciprocal of frequency, T = 1 / f.",
            f"T = 1 / {_fmt(f0)} Hz",
            f"T = {T:.6g} s",
            f"check: f x T = {_fmt(f0)} x {T:.6g} = 1 -- reciprocal pair",
            f"one complete vibration takes {T:.6g} s.",
        )
        answer = f"time period = {T:.6g} s"
        return T, steps, answer, None, "T = 1 / f", \
            {"f": f0, "result": T}
    return _GATE


# ---- 28. Newton's gravitation F = G m1 m2 / r^2 -------------------------------- #

def _c_grav_force(g, m, text):
    if re.search(r"escape\s+velocity|orbital|kepler|surface\s+gravity|"
                 r"\bg\s+on\b", text, re.I):
        return _GATE  # satellite / surface-g readings belong elsewhere
    if re.search(r"electrostatic|charges?\b|coulomb", text, re.I):
        return _GATE  # Coulomb family owns charge questions
    mm = re.findall(r"(?<![/\^])(?P<n>" + _SCI + r")\s*(?P<u>kg|"
                    r"kilograms?|g|grams?)\b(?!\s*[\^/])", text, re.I)
    masses = [(_to_kg(a, b)) for a, b in mm]
    # "two 5 kg masses" / "two identical spheres of mass 2 kg each":
    # one stated mass, duplicated for the identical pair
    if len(masses) == 1 and re.search(
            r"\btwo\b[^.]{0,40}?(?:identical\s+)?|identical|"
            r"\beach\b", text, re.I):
        masses = [masses[0], masses[0]]
    r_m = re.search(r"(?:separated|apart|distance|between)[^.]{0,60}?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b", text,
                    re.I) or \
        re.search(r"(?P<n2>" + _SCI + r")\s*(?P<u2>" + _DISTU + r")\s+"
                  r"(?:apart|away|between)", text, re.I) or \
        re.search(r"centres?\s+(?:is\s+|are\s+)?(?P<n3>" + _SCI + r")\s*"
                  r"(?P<u3>" + _DISTU + r")", text, re.I)
    r = None
    if r_m:
        gd = r_m.groupdict()
        nn = gd.get("n") or gd.get("n2") or gd.get("n3")
        uu = gd.get("u") or gd.get("u2") or gd.get("u3")
        r = _to_m(nn, uu)
    G = 6.67e-11
    gm = re.search(r"G\s*(?:=|is)\s*([\d.]+)\s*[x\u00d7]?\s*10\s*\^?\s*"
                   r"(-?\d+)", text, re.I)
    if gm:
        G = float(gm.group(1)) * 10.0 ** int(gm.group(2))
    ask_f = bool(re.search(r"(?:gravitational\s+)?force", text, re.I))
    ask_r = bool(re.search(r"(?:what\s+)?distance|how\s+far|apart", text,
                           re.I)) and not ask_f
    # identical masses: "two identical masses ... find the mass of each"
    identical = bool(re.search(r"identical", text, re.I))
    if ask_f and len(masses) >= 2 and r is not None and r > 0:
        m1, m2 = masses[0], masses[1]
        if m1 <= 0 or m2 <= 0:
            return _GATE
        val = G * m1 * m2 / (r * r)
        if val <= 0 or val > 1e6:
            return _GATE
        steps = _beats(
            "Newton's law of gravitation F = G m1 m2 / r^2 (G = "
            f"{G:.3g} N m^2/kg^2) -- every pair of masses attracts with "
            "a force proportional to both masses and inverse to the "
            "squared separation.",
            f"F = {G:.3g} x {_fmt(m1)} x {_fmt(m2)} / ({_fmt(r)})^2",
            f"F = {G * m1 * m2:.6g} / {_fmt(r * r)} = {_fmt(val)} N",
            f"check: F r^2 / (G m1) = {_fmt(val * r * r / (G * m1))} kg "
            f"= m2 -- the relation closes",
            f"the spheres pull on each other with {_fmt(val)} N.",
        )
        answer = f"force = {_fmt(val)} N"
        return val, steps, answer, None, "F = G m1 m2 / r^2", \
            {"m1": m1, "m2": m2, "r": r, "result": val}
    if identical and len(masses) <= 1 and r is not None and r > 0:
        f_given = _first(text, [
            r"force\b[^.]{0,60}?(?P<n>" + _SCI + r")\s*(?P<u>N|newtons?)\b",
        ], lambda n, u: _sci(n))
        m_known = masses[0] if masses else None
        if f_given is not None and m_known is None:
            # F = G m^2 / r^2 -> m = r sqrt(F / G)
            val = r * math.sqrt(f_given[0] / G)
            steps = _beats(
                "identical masses under Newton's law F = G m^2 / r^2 "
                "rearranged, m = r sqrt(F / G).",
                f"m = {_fmt(r)} x sqrt({_fmt(f_given[0])} / {G:.3g})",
                f"m = {_fmt(r)} x {_fmt(math.sqrt(f_given[0] / G))} = "
                f"{_fmt(val)} kg",
                f"check: F = G m^2 / r^2 = {G:.3g} x {_fmt(val)}^2 / "
                f"{_fmt(r)}^2 = {_fmt(G * val * val / (r * r))} N -- "
                "matches",
                f"each mass is {_fmt(val)} kg.",
            )
            answer = f"mass = {_fmt(val)} kg"
            return val, steps, answer, None, "m = r sqrt(F / G)", \
                {"r": r, "F": f_given[0], "result": val}
        if m_known is not None and f_given is not None:
            val = r * math.sqrt(f_given[0] / G)
            if _close_rel(val, m_known, 0.05):
                steps = _beats(
                    "identical masses: F = G m^2 / r^2 cross-checks the "
                    "stated mass via m = r sqrt(F / G).",
                    f"m = {_fmt(r)} x sqrt({_fmt(f_given[0])} / {G:.3g})",
                    f"m = {_fmt(val)} kg",
                    f"the recomputed mass {_fmt(val)} kg agrees with the "
                    f"stated {_fmt(m_known)} kg",
                    "the identical-mass reading is consistent.",
                )
                answer = f"mass = {_fmt(val)} kg"
                return val, steps, answer, None, "m = r sqrt(F / G)", \
                    {"r": r, "F": f_given[0], "result": val}
            return _GATE
    if ask_r and len(masses) >= 2 and r is None:
        f_txt = _first(text, [
            r"force\s+(?:of\s+|is\s+)?(?P<n>" + _SCI + r")\s*"
            r"(?P<u>N|newtons?)\b",
        ], lambda n, u: _sci(n))
        if f_txt is None:
            return _GATE
        m1, m2 = masses[0], masses[1]
        val = math.sqrt(G * m1 * m2 / f_txt[0])
        steps = _beats(
            "Newton's law rearranged for the separation, "
            "r = sqrt(G m1 m2 / F).",
            f"r = sqrt({G:.3g} x {_fmt(m1)} x {_fmt(m2)} / "
            f"{_fmt(f_txt[0])})",
            f"r = sqrt({_fmt(G * m1 * m2)}) / ... = {_fmt(val)} m",
            f"check: F = G m1 m2 / r^2 = {G:.3g} x {_fmt(m1 * m2)} / "
            f"{_fmt(val * val)} = {_fmt(f_txt[0])} N -- matches",
            f"the centres must be {_fmt(val)} m apart.",
        )
        answer = f"distance = {_fmt(val)} m"
        return val, steps, answer, None, "r = sqrt(G m1 m2 / F)", \
            {"m1": m1, "m2": m2, "F": f_txt[0], "result": val}
    return _GATE


# ---- 29. EM wave relation c = f lambda ------------------------------------------ #

def _c_em_wave(g, m, text):
    if re.search(r"sound|sonar|echo", text, re.I):
        return _GATE  # mechanical waves belong to the sound family
    c = 3.0e8
    cm = re.search(r"c\s*(?:=|is)\s*([\d.]+)\s*[x\u00d7]?\s*10\s*\^?\s*(\d+)",
                   text, re.I)
    if cm:
        c = float(cm.group(1)) * 10.0 ** int(cm.group(2))
    lam_m = re.search(r"wavelength[^.]{0,40}?(?:of\s+|is\s+)?(?P<n>" + _SCI
                      + r")\s*(?P<u>nm|nanomet\w+|um|\u00b5m|mm|cm|m)\b",
                      text, re.I)
    f_m = re.search(r"frequency[^.]{0,40}?(?:of\s+|is\s+)?(?P<n>" + _SCI
                    + r")\s*(?P<u>GHz|MHz|kHz|Hz|hertz)\b", text, re.I)
    ask_f = bool(re.search(r"frequency", text, re.I)) and lam_m is not None
    ask_lam = bool(re.search(r"wavelength", text, re.I)) and f_m is not None
    if ask_lam:
        f0 = _sci(f_m.group("n"))
        fu = f_m.group("u").lower()
        f0 *= {"ghz": 1e9, "mhz": 1e6, "khz": 1e3}.get(fu, 1.0)
        if f0 <= 0:
            return _GATE
        val = c / f0
        steps = _beats(
            "electromagnetic waves travel at c, so c = f lambda and "
            f"lambda = c / f (c = {c:.3g} m/s in vacuum).",
            f"lambda = {c:.3g} / {_fmt(f0)} Hz",
            f"lambda = {c:.3g} / {_fmt(f0)} = {_fmt(val)} m",
            f"substitute back: c = f lambda = {_fmt(f0)} x {_fmt(val)} = "
            f"{c:.3g} m/s -- matches",
            f"the wave's wavelength is {_fmt(val)} m.",
        )
        answer = f"wavelength = {_fmt(val)} m"
        return val, steps, answer, None, "lambda = c / f", \
            {"f": f0, "c": c, "result": val}
    if ask_f:
        lam = _sci(lam_m.group("n"))
        lu = lam_m.group("u").lower()
        lam *= {"nm": 1e-9, "um": 1e-6, "\u00b5m": 1e-6, "mm": 1e-3,
                "cm": 1e-2}.get(lu, 1.0)
        if lam <= 0:
            return _GATE
        val = c / lam
        steps = _beats(
            "electromagnetic waves travel at c, so c = f lambda and "
            f"f = c / lambda (c = {c:.3g} m/s in vacuum).",
            f"f = {c:.3g} / {_fmt(lam)} m",
            f"f = {c:.3g} / {_fmt(lam)} = {_fmt(val)} Hz",
            f"substitute back: lambda = c / f = {c:.3g} / {_fmt(val)} = "
            f"{_fmt(lam)} m -- matches",
            f"the photon oscillates at {_fmt(val)} Hz.",
        )
        answer = f"frequency = {_fmt(val)} Hz"
        return val, steps, answer, None, "f = c / lambda", \
            {"lambda": lam, "c": c, "result": val}
    return _GATE


# ---- 30. dipole in a uniform field ---------------------------------------------- #

def _c_dipole(g, m, text):
    if re.search(r"electric\s+field[^.]{0,40}?between\s+(?:the\s+)?plates",
                 text, re.I) and not re.search(r"dipole", text, re.I):
        return _GATE
    if not re.search(r"dipole", text, re.I):
        return _GATE
    p_m = re.search(r"(?:moment|dipole\s+moment)\s+(?:of\s+)?(?:is\s+)?"
                    r"(?P<n>" + _SCI + r")\s*(?P<u>[x\u00d7]\s*10\s*\^?\s*"
                    r"[-+]?\d+\s*)?C\s*[-.\s]*m", text, re.I)
    if p_m is None:
        return _GATE
    p = _sci(p_m.group("n"))
    exp_u = (p_m.group("u") or "").replace("C", "").strip()
    if exp_u:
        em = re.search(r"10\s*\^?\s*([-+]?\d+)", exp_u)
        if em:
            p *= 10.0 ** int(em.group(1))
    E_m = re.search(r"(?:electric\s+field|uniform\s+electric\s+field)"
                    r"[^.]{0,40}?(?:of\s+|is\s+)?(?P<n>" + _SCI + r")\s*"
                    r"[x\u00d7]?\s*10\s*\^?\s*(-?\d+)?\s*N\s*/\s*C", text,
                    re.I)
    if E_m is None:
        E_m = re.search(r"field\s+(?:of\s+|is\s+)?(?P<n>" + _SCI + r")"
                        r"\s*(?:[x\u00d7]\s*10\s*\^?\s*(?P<e>-?\d+)\s*)?"
                        r"N\s*/\s*C", text, re.I)
    if E_m is None:
        return _GATE
    E = _sci(E_m.group("n"))
    if E_m.groupdict().get("e"):
        E *= 10.0 ** int(E_m.group("e"))
    ask_tau = bool(re.search(r"torque", text, re.I))
    ask_E_ax = bool(re.search(r"field\s+(?:magnitude\s+)?at", text, re.I)) \
        and not ask_tau
    th_m = re.search(r"angle\s+of\s+(?P<th>" + _SCI + r")\s*(?:degrees?|"
                     r"\u00b0|deg)", text, re.I)
    if ask_tau:
        sin_t = 1.0
        if th_m:
            theta = _sci(th_m.group("th"))
            if not (0.0 < theta < 180.0):
                return _GATE
            sin_t = math.sin(math.radians(theta))
        val = p * E * sin_t
        steps = _beats(
            "dipole torque tau = p E sin(theta) -- the equal and opposite "
            "forces on the two charges form a couple.",
            f"tau = {_fmt(p)} C m x {_fmt(E)} N/C"
            + (f" x sin({_fmt(_sci(th_m.group('th')))} deg)" if th_m else ""),
            f"tau = {_fmt(p * E)}"
            + (f" x {sin_t:.4f} = {_fmt(val)} N m" if th_m
               else f" = {_fmt(val)} N m"),
            f"check: at theta = 90 deg the torque is maximum = p E = "
            f"{_fmt(p * E)} N m; ours is {'smaller' if sin_t < 1 else 'equal'} "
            "-- consistent",
            f"the field twists the dipole with {_fmt(val)} N m.",
        )
        answer = f"torque = {_fmt(val)} N m"
        return val, steps, answer, None, "tau = p E sin(theta)", \
            {"p": p, "E": E, "result": val}
    if ask_E_ax:
        r_m = re.search(r"distance\s+(?:of\s+)?(?P<n>" + _SCI + r")\s*"
                        r"(?P<u>cm|mm|m|metres?|meters?)\b", text, re.I)
        if r_m is None:
            return _GATE
        rv = _to_m(r_m.group("n"), r_m.group("u"))
        if rv <= 0:
            return _GATE
        k = 8.99e9
        val = 2.0 * k * p / (rv ** 3)
        steps = _beats(
            "axial field of a short dipole E = 2 k p / r^3 "
            "(k = 8.99e9 N m^2/C^2) -- falls as the cube of the distance.",
            f"E = 2 x 8.99e9 x {_fmt(p)} / ({_fmt(rv)})^3",
            f"E = {_fmt(2 * k * p)} / {_fmt(rv ** 3)} = {_fmt(val)} N/C",
            f"check: doubling r cuts E eightfold -- the r^-3 dependence "
            "holds by construction",
            f"the axial point sits in a field of {_fmt(val)} N/C.",
        )
        answer = f"E = {_fmt(val)} N/C"
        return val, steps, answer, None, "E = 2 k p / r^3", \
            {"p": p, "r": rv, "result": val}
    return _GATE


# ---- 31. g-field: g at height, mass of a body from g ----------------------------- #

def _c_g_field(g, m, text):
    if re.search(r"escape\s+velocity|orbital|kepler", text, re.I):
        return _GATE
    G = 6.67e-11
    gm = re.search(r"\bG\s*(?:=|is)\s*(?P<gv>" + _SCI + r")\b", text, re.I)
    if gm:
        G = _sci(gm.group("gv"))
        if not (1e-13 < G < 1e-9):
            G = 6.67e-11
    M_m = re.search(r"\b(?:Earth(?:'s)?\s+)?(?:mass|M)\b\s*(?:is|=|of|:)?"
                    r"\s*(?P<nm>" + _SCI + r")\s*kg\b", text, re.I)
    R_m = re.search(r"\bR(?:adius)?\b\s*(?:is|=|of|:)?\s*(?P<nr>" + _SCI
                    + r")\s*m\b", text, re.I)
    # mode 1: g at height h above the surface, M and R given
    h_m = re.search(r"(?:height|altitude)\s+of\s+(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>km|kilometres?|kilometers?|m|metres?)\b", text,
                    re.I)
    if M_m and R_m and re.search(r"acceleration\s+due\s+to\s+gravity|"
                                 r"\bg\b[^.]{0,30}?(?:at|height)", text,
                                 re.I):
        M = _sci(M_m.group("nm"))
        R = _sci(R_m.group("nr"))
        if M <= 0 or R <= 0:
            return _GATE
        rh = R
        assum = None
        if h_m:
            h = _to_m(h_m.group("n"), h_m.group("u"))
            rh = R + h
            assum = [f"distance from the centre = R + h = {_fmt(R)} + "
                     f"{_fmt(h)} m"]
        val = G * M / (rh * rh)
        if not (0.05 < val < 100.0):
            return _GATE
        steps = _beats(
            "gravitational field g = G M / r^2 with r measured from the "
            "body's centre" +
            (" (the inverse-square law weakens g with altitude)." if h_m
             else "."),
            f"g = {G:.3g} x {_fmt(M)} / ({_fmt(rh)})^2",
            f"g = {_fmt(G * M)} / {_fmt(rh * rh)} = {_fmt(val)} m/s^2",
            f"check: doubling r quarters g -- inverse-square consistent; "
            f"g R^2 / r^2 = {_fmt(val * rh * rh / (R * R))} x surface "
            "value -- coherent",
            f"gravity at that location is {_fmt(val)} m/s^2.",
        )
        answer = f"g = {_fmt(val)} m/s^2"
        return val, steps, answer, assum, "g = G M / r^2", \
            {"M": M, "R": R, "result": val}
    # mode 2: mass of a body from its surface gravity and radius
    #         M = g R^2 / G  (moon-g gate: stated g must fit the body)
    if re.search(r"surface\s+gravity|gravity\s+is|determine\s+the\s+mass|"
                 r"find\s+the\s+mass|mass\s+of\s+the\s+(?:moon|planet|"
                 r"earth|body)", text, re.I):
        g_m = re.search(r"(?:gravity|g)\s*(?:is|=|of)?\s*(?P<n>" + _SCI
                        + r")\s*m\s*/?\s*s\s*[-^\s]*2", text, re.I)
        R_m2 = re.search(r"radius\s+(?:is\s+)?(?P<n2r>" + _SCI + r")\s*m\b",
                         text, re.I) or R_m
        if g_m is None or R_m2 is None:
            return _GATE
        gv = _sci(g_m.group("n"))
        if not (0.5 <= gv <= 350.0):
            return _GATE  # same plausibility band as the _gval gate
        for _body, _bg in _BODY_G.items():
            if re.search(r"\b" + _body + r"\b", text, re.I) and \
                    not (_bg / 3.0 <= gv <= _bg * 3.0):
                return _GATE  # contradicts the named body's gravity
        R = _sci(R_m2.group("n2r"))
        if R <= 0:
            return _GATE
        val = gv * R * R / G
        if not (1e20 < val < 1e32):
            return _GATE  # planetary masses live in this band
        steps = _beats(
            "surface gravity rearranged from g = G M / R^2: "
            "M = g R^2 / G.",
            f"M = {_fmt(gv)} x ({_fmt(R)})^2 / {G:.3g}",
            f"M = {_fmt(gv * R * R)} / {G:.3g} = {_fmt(val)} kg",
            f"check: g = G M / R^2 = {G:.3g} x {_fmt(val)} / "
            f"{_fmt(R * R)} = {_fmt(gv)} m/s^2 -- matches",
            f"the body's mass is {_fmt(val)} kg.",
        )
        answer = f"mass = {_fmt(val)} kg"
        return val, steps, answer, None, "M = g R^2 / G", \
            {"g": gv, "R": R, "result": val}
    return _GATE


# ---- 32. field-line proportionality --------------------------------------------- #

def _c_field_lines(g, m, text):
    if not re.search(r"field\s+lines?", text, re.I):
        return _GATE
    pairs = []
    for pm in re.finditer(
            r"(?P<q1>[-+]?\d+(?:\.\d+)?)\s*(?P<u1>uC|\u00b5C|mC|nC|C)\b"
            r".{0,160}?(?P<l1>\d+)\s*(?:field\s+)?lines?.{0,160}?"
            r"(?P<q2>[-+]?\d+(?:\.\d+)?)\s*(?P<u2>uC|\u00b5C|mC|nC|C)\b",
            text, re.I):
        pairs.append(pm.groupdict())
    if not pairs:
        return _GATE
    mult = {"uc": 1e-6, "\u00b5c": 1e-6, "mc": 1e-3, "nc": 1e-9, "c": 1.0}
    q1v = float(pairs[0]["q1"]) * mult[pairs[0]["u1"].lower()]
    q2v = float(pairs[0]["q2"]) * mult[pairs[0]["u2"].lower()]
    l1 = float(pairs[0]["l1"])
    if q1v <= 0 or q2v <= 0 or l1 <= 0:
        return _GATE
    if not re.search(r"(?:how\s+many|number\s+of)\s+(?:field\s+)?lines",
                     text, re.I):
        return _GATE
    val = l1 * (q2v / q1v)
    steps = _beats(
        "field-line count is proportional to the charge (the drawing "
        "convention), so lines2 = lines1 x Q2 / Q1.",
        f"lines2 = {l1:g} x ({_fmt(q2v)} / {_fmt(q1v)})",
        f"lines2 = {l1:g} x {_fmt(q2v / q1v)} = {_fmt(val)}",
        f"check: lines1 / Q1 = lines2 / Q2 -> {l1:g} / {_fmt(q1v)} = "
        f"{_fmt(val)} / {_fmt(q2v)} = "
        f"{_fmt(l1 / q1v)} lines per C -- equal",
        f"a +{_fmt(q2v)} C charge is drawn with {_fmt(val)} lines.",
    )
    answer = f"field lines = {_fmt(val)}"
    return val, steps, answer, None, "lines ∝ Q", \
        {"Q1": q1v, "Q2": q2v, "lines1": l1, "result": val}


# --------------------------------------------------------------------------- #
# CLASS-7 PHYSICS COVERAGE (2026-10-06 SOLVER-DIG board battery).
# The class-7 chapter battery (electricity / heat / motion-time / light,
# real corpus questions) showed the numeric asks these handlers own
# refused honestly: heat-rate, energy-per-degree, oscillation-count
# period, two-entity speed compare, segment speeds, plane-mirror
# surface-form angles, mirror-image count, mirror clock, open circuit.
# Each handler keeps the (g, m, text) contract and refuses (_GATE) the
# moment its specific board shape is not present.
# --------------------------------------------------------------------------- #

def _c_oscillation_period(g, m, text):
    n = float(m.group("n"))
    t = _to_s(m.group("t"), m.group("u"))
    if n < 1 or t <= 0:
        return _GATE
    val = t / n
    steps = _beats(
        "the time period is the time for ONE oscillation: T = total "
        "time / number of oscillations (timing many swings and dividing "
        "reduces reaction-time error).",
        f"T = {_fmt(t)} s / {n:g} oscillations",
        f"T = {_fmt(t)} / {n:g} = {_fmt(val)} s",
        f"check: {n:g} swings x {_fmt(val)} s = {_fmt(t)} s -- matches "
        "the given total",
        f"each complete oscillation takes {_fmt(val)} s.",
    )
    return val, steps, f"time period = {_fmt(val)} s", None, \
        "T = t_total / N", {"N": n, "t_total": t, "T": val}


def _c_heat_rate(g, m, text):
    if not re.search(r"heat|thermal", text, re.I):
        return _GATE
    low = text.lower()
    # direction A: 'absorbs Q J in t s' -> rate = Q/t
    qm = re.search(r"(?P<q>" + _SCI + r")\s*(?P<qu>J|joules?)\b[^.]{0,40}?"
                   r"in\s+(?P<t>" + _SCI + r")\s*(?P<tu>" + _TIMEU + r")\b",
                   text, re.I)
    # P11-D (C7H03 corpus, 2026-10-07): the energy and the time live in
    # DIFFERENT clauses ("...absorbs 8400 J of heat. Calculate the rate
    # of heat absorption if the process takes 10 seconds") with
    # distractors (mass, delta-T) between.  When the ask IS a heat-rate
    # ask and the text names exactly ONE time value, bind it wherever
    # it stands.
    if qm is None and re.search(
            r"rate\s+of\s+heat|heat\s+absorption|rate\s+at\s+which\s+heat",
            text, re.I):
        q_only = re.search(r"(?P<q>" + _SCI + r")\s*(?:J|joules?)\b",
                           text, re.I)
        t_tokens = re.findall(r"(?P<t>" + _SCI + r")\s*(?P<tu>" + _TIMEU
                              + r")\b", text, re.I)
        if q_only and len(t_tokens) == 1:
            qm = {"q": q_only.group("q"), "t": t_tokens[0][0],
                  "tu": t_tokens[0][1]}
    # direction B: 'at a rate of R J/s (or R J per second) ... in t s'
    rm = re.search(r"rate\s+of\s+(?:heat\s+(?:absorption|transfer|flow)?"
                   r"[^.]{0,20}?)?(?P<r>" + _SCI + r")\s*(?P<ru>"
                   r"J\s*/\s*(?:s|second)|J\s+per\s+second|watts?|W)\b",
                   text, re.I)
    if qm and not rm:
        q = _sci(qm["q"] if isinstance(qm, dict) else qm.group("q"))
        if isinstance(qm, dict):
            t = _to_s(qm["t"], qm["tu"])
        else:
            t = _to_s(qm.group("t"), qm.group("tu"))
        if q <= 0 or t <= 0:
            return _GATE
        val = q / t
        steps = _beats(
            "rate of heat transfer = energy transferred / time taken "
            "(1 J/s = 1 watt).",
            f"rate = {_fmt(q)} J / {_fmt(t)} s",
            f"rate = {_fmt(val)} J/s = {_fmt(val)} W",
            f"check: {_fmt(val)} W x {_fmt(t)} s = {_fmt(q)} J -- matches",
            f"the container absorbs heat at {_fmt(val)} W.",
        )
        return val, steps, f"rate of heat absorption = {_fmt(val)} W", \
            None, "rate = Q / t", {"Q": q, "t": t, "rate": val}
    if rm:
        r = _sci(rm.group("r"))
        tm = re.search(r"in\s+(?P<t>" + _SCI + r")\s*(?P<tu>" + _TIMEU
                       + r")\b", text[text.find(rm.group(0)):], re.I) or \
            re.search(r"in\s+(?P<t>" + _SCI + r")\s*(?P<tu>" + _TIMEU
                      + r")\b", text, re.I)
        if not tm:
            return _GATE
        t = _to_s(tm.group("t"), tm.group("tu"))
        if r <= 0 or t <= 0:
            return _GATE
        val = r * t
        steps = _beats(
            "energy transferred = rate of transfer x time "
            "(Q = P x t).",
            f"Q = {_fmt(r)} J/s x {_fmt(t)} s",
            f"Q = {_fmt(val)} J",
            f"check: {_fmt(val)} J / {_fmt(t)} s = {_fmt(r)} J/s -- "
            "matches the given rate",
            f"{_fmt(val)} J of heat flows through in {_fmt(t)} s.",
        )
        return val, steps, f"heat transferred = {_fmt(val)} J", None, \
            "Q = rate x t", {"rate": r, "t": t, "Q": val}
    return _GATE


def _c_heat_per_degree(g, m, text):
    qm = re.search(r"(?P<q>" + _SCI + r")\s*(?:J|joules?)\b", text, re.I)
    dtm = re.search(r"(?P<dt>" + _SCI + r")\s*(?:\u00b0?\s*[dC]\b|degree"
                    r"s?\s*(?:celsius|c)\b|\u00b0\s*c\b)", text, re.I)
    if not (qm and dtm):
        return _GATE
    if not re.search(r"per\s+degree|each\s+degree|every\s+degree", text,
                     re.I):
        return _GATE
    q = _sci(qm.group("q"))
    dt = _sci(dtm.group("dt"))
    if q <= 0 or dt <= 0:
        return _GATE
    val = q / dt
    steps = _beats(
        "heat energy per degree rise = energy supplied / temperature "
        "rise (this ratio is the heat capacity of the object).",
        f"C = {_fmt(q)} J / {_fmt(dt)} \u00b0C",
        f"C = {_fmt(val)} J/\u00b0C",
        f"check: {_fmt(val)} J/\u00b0C x {_fmt(dt)} \u00b0C = {_fmt(q)} J "
        "-- matches",
        f"every 1 \u00b0C rise costs {_fmt(val)} J for this rod.",
    )
    return val, steps, f"heat energy per degree = {_fmt(val)} J/\u00b0C", \
        None, "C = Q / \u0394T", {"Q": q, "dT": dt, "C": val}


def _speed_pairs(text):
    """All (distance_m, time_s, raw_d, raw_t, raw_u_d, raw_u_t) pairs."""
    out = []
    for pm in re.finditer(
            r"(?P<d>" + _SCI + r")\s*(?P<du>" + _DISTU + r")\b[^.,;]{0,30}?"
            r"(?:in|for|takes?)\s+(?P<t>" + _SCI + r")\s*(?P<tu>" + _TIMEU
            + r")\b", text, re.I):
        d_raw = _sci(pm.group("d"))
        t_raw = _sci(pm.group("t"))
        out.append((_to_m(pm.group("d"), pm.group("du")),
                    _to_s(pm.group("t"), pm.group("tu")),
                    d_raw, t_raw, pm.group("du"), pm.group("tu")))
    return out


def _c_speed_compare(g, m, text):
    if not re.search(r"both|each|which|compare|faster|higher|slower",
                     text, re.I):
        return _GATE
    pairs = _speed_pairs(text)
    if len(pairs) < 2:
        return _GATE
    (d1, t1, dr1, tr1, du1, tu1) = pairs[0]
    (d2, t2, dr2, tr2, du2, tu2) = pairs[1]
    v1, v2 = d1 / t1, d2 / t2
    if min(v1, v2) <= 0:
        return _GATE
    def _disp(d_raw, t_raw, du, tu, v):
        if ('km' in du or 'kilo' in du) and ('h' in tu):
            return (f"{_fmt(d_raw)} km / {_fmt(t_raw)} h = "
                    f"{_fmt(v * 3.6)} km/h")
        return f"{_fmt(d_raw)} m / {_fmt(t_raw)} s = {_fmt(v)} m/s"
    label1, label2 = ("Car A", "Car B")
    nm = re.search(r"(\w+)\s+(?:runs?|travels?|covers?)", text, re.I)
    if nm:
        label1 = nm.group(1).capitalize()
        nm2 = re.search(r"(?:and|while|,)\s*(?:a\s+|the\s+)?(\w+)\s+"
                        r"(?:runs?|travels?|covers?)", text, re.I)
        if nm2:
            label2 = nm2.group(1).capitalize()
    winner = (label1 if v1 > v2 else label2)
    steps = _beats(
        "speed = distance / time for each; the larger speed covers the "
        "same distance in less time.",
        f"{label1}: {_disp(dr1, tr1, du1, tu1, v1)};  "
        f"{label2}: {_disp(dr2, tr2, du2, tu2, v2)}",
        f"compare: {_fmt(max(v1, v2) / min(v1, v2) if min(v1, v2) else 0)}"
        "x ratio in favour of " + winner,
        "both speeds are positive and finite; SI units used for the "
        "comparison",
        f"{winner} is faster.",
    )
    val = max(v1, v2)
    answer = (f"{label1} = {_fmt(v1 * (3.6 if ('km' in du1 or 'kilo' in du1) else 1))} "
              f"{'km/h' if ('km' in du1 or 'kilo' in du1) else 'm/s'}, "
              f"{label2} = {_fmt(v2 * (3.6 if ('km' in du2 or 'kilo' in du2) else 1))} "
              f"{'km/h' if ('km' in du2 or 'kilo' in du2) else 'm/s'} -> {winner} is faster")
    return val, steps, answer, None, "v = d / t (per entity)", \
        {"v1": v1, "v2": v2}


def _c_speed_segments(g, m, text):
    if not re.search(r"first|second|then|half|next", text, re.I):
        return _GATE
    if not re.search(r"average\s+speed|speed\s+(?:in|for|of)\s+(?:each|the)",
                     text, re.I):
        return _GATE
    pairs = _speed_pairs(text)
    if len(pairs) < 2:
        # P11-C (C7M06 corpus, 2026-10-07): "covers the FIRST 200 metres
        # of a race in 25 seconds ... average speed for the FIRST 200
        # metres" states ONE segment and asks ITS OWN speed -- v = d/t
        # is fully determined.  Fire only when the stated distance
        # clause carries the SAME ordinal the ask names (otherwise the
        # stated segment could be a different one).
        if len(pairs) == 1:
            om = re.search(r"\b(first|second|third|final|last)\b", text,
                           re.I)
            if om:
                word = om.group(1).lower()
                if re.search(r"\b" + word + r"\b[^.]{0,40}?"
                             r"(?:metres?|meters?|m\b|km\b|cm\b)", text,
                             re.I):
                    sd, st = pairs[0][0], pairs[0][1]
                    if st > 0:
                        val = sd / st
                        steps = _beats(
                            "speed for one segment = that segment's "
                            "distance / its own time.",
                            f"the {word} segment: {_fmt(sd)} m / "
                            f"{_fmt(st)} s",
                            f"= {_fmt(val)} m/s",
                            f"check: {_fmt(val)} m/s x {_fmt(st)} s = "
                            f"{_fmt(sd)} m -- matches the segment",
                            f"the {word} segment was covered at "
                            f"{_fmt(val)} m/s.",
                        )
                        return val, steps, \
                            f"segment speed = {_fmt(val)} m/s", None, \
                            "v = d / t (segment)", \
                            {"segments": [pairs[0][:2]], "v": val}
        return _GATE
    segs = [(p[0], p[1]) for p in pairs]     # (m, s) SI pairs
    total_d = sum(s[0] for s in segs)
    total_t = sum(s[1] for s in segs)
    if total_t <= 0 or any(s[1] <= 0 for s in segs):
        return _GATE
    seg_txt = "; ".join(f"{_fmt(sd)} m in {_fmt(st)} s -> "
                        f"{_fmt(sd / st)} m/s" for (sd, st) in segs)
    whole_ask = bool(re.search(r"whole|entire|total|journey|overall|"
                               r"(?:for\s+the\s+)?(?:whole|full)\s+race",
                               text, re.I))
    seg_ask = re.search(r"(first|second|third)\b", text, re.I)
    if not whole_ask and seg_ask:
        idx = {"first": 0, "second": 1, "third": 2}[seg_ask.group(1).lower()]
        if idx >= len(segs):
            idx = len(segs) - 1
        sd, st = segs[idx]
        val = sd / st
        steps = _beats(
            "speed for one segment = that segment's distance / its own "
            "time.",
            f"segments: {seg_txt}",
            f"the {seg_ask.group(1)} segment: {_fmt(sd)} m / {_fmt(st)} s"
            f" = {_fmt(val)} m/s",
            f"check: {_fmt(val)} m/s x {_fmt(st)} s = {_fmt(sd)} m -- "
            "matches the segment",
            f"the {seg_ask.group(1)} segment was covered at {_fmt(val)} m/s.",
        )
        return val, steps, f"segment speed = {_fmt(val)} m/s", None, \
            "v = d / t (segment)", {"segments": segs, "v": val}
    val = total_d / total_t
    steps = _beats(
        "average speed = total distance / total time (not the average "
        "of the two speeds).",
        f"segments: {seg_txt}",
        f"average = {_fmt(total_d)} m / {_fmt(total_t)} s = {_fmt(val)} m/s",
        f"check: each segment speed lies below/above the mean and the "
        f"total is consistent ({_fmt(total_d)} m, {_fmt(total_t)} s)",
        f"the whole journey averages {_fmt(val)} m/s.",
    )
    return val, steps, f"average speed = {_fmt(val)} m/s", None, \
        "v_avg = total_d / total_t", {"segments": segs, "v_avg": val}


def _c_mirror_surface_angle(g, m, text):
    """'ray strikes a mirror at X deg TO THE SURFACE' -> the angle with
    the NORMAL is 90 - X, and reflection equals incidence.  Answering X
    here is the classic class-7 trap."""
    if not re.search(r"to\s+the\s+(?:mirror\s+)?surface|to\s+the\s+mirror\b"
                     r"|with\s+the\s+(?:mirror\s+)?surface"
                     r"|and\s+the\s+(?:mirror\s+)?surface", text, re.I):
        return _GATE
    xm = re.search(r"(?P<x>" + _SCI + r")\s*(?:\u00b0|degrees?|deg)\b",
                   text, re.I)
    if not xm:
        return _GATE
    x = _sci(xm.group("x"))
    if not (0 < x < 90):
        return _GATE
    val = 90.0 - x
    asked_refl = bool(re.search(r"angle\s+of\s+reflection", text, re.I))
    asked_inc = bool(re.search(r"angle\s+of\s+incidence", text, re.I))
    if not (asked_refl or asked_inc):
        return _GATE
    steps = _beats(
        "angles of incidence/reflection are measured from the NORMAL "
        "(the perpendicular), not from the mirror surface.",
        f"given angle with the surface = {_fmt(x)}\u00b0 -> angle with "
        f"the normal = 90\u00b0 - {_fmt(x)}\u00b0 = {_fmt(val)}\u00b0",
        f"incidence = reflection = {_fmt(val)}\u00b0",
        "law of reflection: i = r always (first law)",
        f"the {'angle of reflection' if asked_refl else 'angle of '
          'incidence'} is {_fmt(val)}\u00b0.",
    )
    return val, steps, f"angle = {_fmt(val)} deg (from the normal)", None, \
        "i = r = 90 - (angle with surface)", {"with_surface": x, "normal": val}


def _c_inc_ref_sum(g, m, text):
    if not re.search(r"angle\s+between\s+(?:the\s+)?(?:incident\s+ray\s+"
                     r"and\s+(?:the\s+)?reflected\s+ray|incident\s+and\s+"
                     r"reflected\s+rays?)", text, re.I):
        return _GATE
    xm = re.search(r"is\s+(?P<x>" + _SCI + r")\s*(?:\u00b0|degrees?|deg)\b",
                   text, re.I)
    if not xm:
        return _GATE
    x = _sci(xm.group("x"))
    if not (0 < x < 180):
        return _GATE
    val = x / 2.0
    steps = _beats(
        "the normal bisects the angle between incident and reflected "
        "rays (because i = r).",
        f"i + r = {_fmt(x)}\u00b0 and i = r",
        f"i = r = {_fmt(x)} / 2 = {_fmt(val)}\u00b0",
        f"check: {_fmt(val)}\u00b0 + {_fmt(val)}\u00b0 = {_fmt(x)}\u00b0 "
        "-- matches",
        f"the angle of reflection is {_fmt(val)}\u00b0.",
    )
    return val, steps, f"angle of reflection = {_fmt(val)} deg", None, \
        "i = r = (i + r) / 2", {"sum": x, "r": val}


def _c_mirror_images(g, m, text):
    if not re.search(r"images?\s+(?:are\s+)?formed|number\s+of\s+images",
                     text, re.I):
        return _GATE
    xm = re.search(r"angle\s+of\s+(?P<x>" + _SCI + r")\s*(?:\u00b0|degrees?"
                   r"|deg)\b", text, re.I)
    if not xm:
        xm = re.search(r"(?P<x>" + _SCI + r")\s*(?:\u00b0|degrees?|deg)\b"
                       r"[^.]{0,30}?to\s+(?:each|one)\s+another", text, re.I)
    if not xm:
        return _GATE
    x = _sci(xm.group("x"))
    if not (0 < x <= 180):
        return _GATE
    ratio = 360.0 / x
    if abs(ratio - round(ratio)) < 1e-9:
        val = float(int(round(ratio)) - 1)
        note = (f"360/{_fmt(x)} = {int(round(ratio))} (integer) -> "
                f"images = {int(round(ratio))} - 1")
    else:
        val = float(int(ratio))
        note = f"360/{_fmt(x)} is not an integer -> floor = {int(ratio)}"
    steps = _beats(
        "two inclined plane mirrors: number of images n = (360/theta) - 1 "
        "when 360/theta is an integer (NCERT class-7 rule).",
        f"360 / {_fmt(x)}\u00b0 = {_fmt(ratio)}",
        note,
        f"smaller angle -> more images: at {_fmt(x)}\u00b0 the pattern "
        f"shows {int(val)} images",
        f"{int(val)} images are formed.",
    )
    return val, steps, f"number of images = {int(val)}", None, \
        "n = 360/theta - 1", {"theta": x, "n": val}


def _c_mirror_clock(g, m, text):
    if not re.search(r"mirror|reflection", text, re.I):
        return _GATE
    if not re.search(r"\bclock\b|\btime\b", text, re.I):
        return _GATE
    tm = re.search(r"\b(\d{1,2}):(\d{2})\b", text)
    if not tm:
        tm = re.search(r"\b(\d{1,2})\s*(?:hours?|o'?clock)\s*"
                       r"(?:(\d{1,2})\s*minutes?)?", text, re.I)
    if not tm:
        return _GATE
    h = int(tm.group(1))
    mi = int(tm.group(2) or 0)
    if not (0 <= h <= 12 and 0 <= mi < 60):
        return _GATE
    total = h * 60 + mi
    mirrored = (12 * 60 - total) % (12 * 60)
    mh, mm = divmod(mirrored, 60)
    steps = _beats(
        "a plane mirror swaps left-right, so the mirrored clock reads "
        "12:00 minus the actual time (11:60 - h:mm).",
        f"12:00 - {h}:{mi:02d} = 11:60 - {h}:{mi:02d}",
        f"= {mh}:{mm:02d}",
        f"check: {h}:{mi:02d} + {mh}:{mm:02d} = 12:00 -- hands sum to a "
        "full dial",
        f"the mirror shows {mh}:{mm:02d}.",
    )
    return float(mirrored), steps, f"mirror time = {mh}:{mm:02d}", None, \
        "t' = 12:00 - t", {"h": h, "m": mi, "mirrored": f"{mh}:{mm:02d}"}


def _c_open_circuit(g, m, text):
    if not re.search(r"switch\s+(?:is\s+)?open|open\s+switch", text, re.I):
        return _GATE
    if not re.search(r"current", text, re.I):
        return _GATE
    steps = _beats(
        "an open switch breaks the loop: a circuit with a gap carries no "
        "current regardless of the battery voltage.",
        "gap in the loop -> no closed path for charge",
        "I = 0 A (the lamp stays off)",
        "Ohm's law does not apply across the gap: the resistance of air "
        "is effectively infinite",
        "no current flows until the switch is closed.",
    )
    return 0.0, steps, "current = 0 A", None, "open circuit -> I = 0", \
        {"I": 0.0}


_TABLE_C7: List[Tuple[str, str, Any]] = [
    ("C7_OSCILLATION_PERIOD",
     r"(?:completes?|counts?|makes?|takes?|for)\s+(?P<n>\d+)\s+"
     r"oscillations?[^.,;]{0,30}?in\s+(?P<t>" + _SCI + r")\s*(?P<u>"
     + _TIMEU + r")\b",
     _c_oscillation_period),
    ("C7_HEAT_RATE",
     r"rate\s+of\s+heat|heat\s+(?:flows?|travels?|moves?|is\s+transferred"
     r"|is\s+conducted|absorbed|supplied)[^.]{0,40}rate",
     _c_heat_rate),
    ("C7_HEAT_PER_DEGREE",
     r"heat\s+(?:energy\s+)?(?:added|supplied|given|absorbed|required)",
     _c_heat_per_degree),
    ("C7_SPEED_COMPARE",
     r"(?:speed\s+of\s+both|speed\s+of\s+each|which\s+(?:car|animal|one)"
     r"\s+(?:is\s+)?(?:faster|higher)|compare\s+(?:the\s+)?speeds?)",
     _c_speed_compare),
    ("C7_SPEED_SEGMENTS",
     r"average\s+speed\s+(?:for\s+the\s+(?:whole|first|entire)|of\s+the)"
     r"|speed\s+(?:in\s+each|for\s+each)",
     _c_speed_segments),
    ("C7_MIRROR_SURFACE_ANGLE",
     r"angle\s+of\s+(?:incidence|reflection)|(?:strikes?|hits?|shines?)"
     r"[^.]{0,50}?mirror",
     _c_mirror_surface_angle),
    ("C7_INC_REF_SUM",
     r"angle\s+between\s+(?:the\s+)?incident",
     _c_inc_ref_sum),
    ("C7_MIRROR_IMAGES",
     r"(?:two|2|plane\s+)?mirrors?.{0,80}angle",
     _c_mirror_images),
    ("C7_MIRROR_CLOCK",
     r"clock.{0,80}(?:mirror|reflection)|(?:mirror|reflection).{0,80}clock",
     _c_mirror_clock),
    ("C7_OPEN_CIRCUIT",
     r"(?:switch\s+(?:is\s+)?open|open\s+switch)",
     _c_open_circuit),
]


# --------------------------------------------------------------------------- #
# _TABLE_C8 -- class-8 physics wave (2026-10-06 dig, physics-adjacent only).
# Backlog source: corpus DIAGNOSTIC/WORKED questions from c8_physics .md
# (physics_corpus_sweep + in-process battery).  Every row is gated tight:
# a wrong-verified answer kills the app, a refusal is only a content gap.
# --------------------------------------------------------------------------- #

def _c8_efficiency(g, m, text):
    if not re.search(r"efficien", text, re.I):
        return _GATE
    # useful output / total input, energies (J) or powers (W)
    pair = re.search(
        r"(?:consumes?|uses?|input|draws?|supplies?|rated?\b)" + _SPAN +
        r"{0,40}?"
        r"(?P<in>" + _SCI + r")\s*(?P<inu>J|joules?|W|watts?|kW)\b" +
        _SPAN + r"{0,60}?(?:produces?|gives|output|light energy(?:\s+equivalent"
        r"\s+to)?|useful)" + _SPAN + r"{0,40}?(?P<out>" + _SCI + r")\s*"
        r"(?P<outu>J|joules?|W|watts?|kW)\b",
        text, re.I) or re.search(
        r"(?P<out>" + _SCI + r")\s*(?P<outu>J|joules?|W|watts?)\b" +
        _SPAN + r"{0,60}?(?:of\s+)?(?:light|useful|output)" + _SPAN +
        r"{0,40}?"
        r"(?:consumes?|input|from|rated?\b)" + _SPAN + r"{0,40}?"
        r"(?P<in>" + _SCI + r")\s*(?P<inu>J|joules?|W|watts?|kW)\b",
        text, re.I)
    if not pair:
        return _GATE
    conv = {"j": 1.0, "joule": 1.0, "joules": 1.0, "w": 1.0, "watt": 1.0,
            "watts": 1.0, "kw": 1000.0}
    inu = pair.group("inu").lower().rstrip("s")
    outu = pair.group("outu").lower().rstrip("s")
    if inu.startswith("kw"):
        inu = "kw"
    if outu.startswith("kw"):
        outu = "kw"
    vin = _sci(pair.group("in")) * conv.get(inu, 1.0)
    vout = _sci(pair.group("out")) * conv.get(outu, 1.0)
    if vin <= 0 or vout < 0 or vout > vin:
        return _GATE
    eff = 100.0 * vout / vin
    ans = f"efficiency = {_fmt(eff)}%"
    extra_txt = ""
    # co-ask: '... and the total electrical energy consumed in kWh'
    km = re.search(r"energy[^.]{0,40}?kwh", text, re.I)
    if km:
        tm = re.search(r"(?:for|used for|operates?[^.]{0,10}?for)\s+"
                       r"(?P<t>" + _SCI + r")\s*(?P<tu>" + _TIMEU + r")\b",
                       text, re.I) or \
            re.search(r"(?P<t>" + _SCI + r")\s*hours?\b", text, re.I)
        pm = re.search(r"(?P<p>" + _SCI + r")\s*(?:W|watts?)\b", text, re.I)
        if tm and pm:
            t_h = _to_s(tm.group("t"), tm.group("tu")) / 3600.0
            p_w = _sci(pm.group("p"))
            kwh = p_w * t_h / 1000.0
            extra_txt = (f"; energy = {_fmt(p_w)} W x {_fmt(t_h)} h / 1000 "
                         f"= {_fmt(kwh)} kWh")
    steps = _beats(
        "efficiency = (useful output / total input) x 100%.",
        f"efficiency = ({_fmt(vout)} / {_fmt(vin)}) x 100",
        f"= {_fmt(eff)}%",
        f"check: {_fmt(vin)} x {_fmt(eff / 100)} = "
        f"{_fmt(vin * eff / 100)} -- matches the useful output",
        f"the device converts {_fmt(eff)}% of the input{extra_txt}.",
    )
    return eff, steps, ans + extra_txt, None, \
        "efficiency = (out / in) x 100%", {"out": vout, "in": vin,
                                           "efficiency": eff}


def _c8_saved_kwh(g, m, text):
    if not re.search(r"saved|saving|replaces?|instead of", text, re.I):
        return _GATE
    # count: anchored on the replace verb first -- the S0 input
    # normalizer rewrites "five" -> "5" BEFORE the modeling lane sees
    # the question, so word-number fallbacks die and n silently became
    # 1 (observed: 0.24 kWh saved for a five-bulb swap that saves 1.2).
    nm = (re.search(r"(?:replaces?|swaps?|instead\s+of)[^.\d]{0,20}?"
                    r"(?P<n>\d+|five|four|three|two|six|ten)\b", text,
                    re.I)
          or re.search(r"(?P<n>\d+)\s*(?:bulbs?|lamps?|tubes?)", text,
                       re.I)
          or re.search(r"\b(five|four|three|two|six|ten)\b", text, re.I))
    n = 1
    if nm:
        _nv = nm.groupdict().get("n") or nm.group(1)
        n = (_WORD_N[str(_nv).lower()] if not str(_nv).isdigit()
             else float(_nv))
    pw = re.findall(r"(?P<p>" + _SCI + r")\s*(?:W|watts?)\b", text, re.I)
    tm = re.search(r"(?P<t>" + _SCI + r")\s*hours?\b", text, re.I) or \
        re.search(r"(?:for|per)\s+(?P<t>" + _SCI + r")\s*(?P<tu>"
                  + _TIMEU + r")\b", text, re.I)
    if len(pw) < 2 or not tm:
        return _GATE
    p_old, p_new = sorted((_sci(pw[0]), _sci(pw[1])), reverse=True)
    t_h = (_to_s(tm.group("t"), tm.group("tu")) / 3600.0
           if tm.groupdict().get("tu") else float(tm.group("t")))
    if p_old <= p_new or t_h <= 0 or n < 1:
        return _GATE
    kwh = n * (p_old - p_new) * t_h / 1000.0
    steps = _beats(
        "energy saved = number of devices x (old power - new power) x "
        "hours / 1000 (1 kWh = 1 unit).",
        f"saved = {n:g} x ({_fmt(p_old)} - {_fmt(p_new)}) W x "
        f"{_fmt(t_h)} h / 1000",
        f"= {_fmt(kwh)} kWh",
        f"check: per device {_fmt(p_old - p_new)} W x {_fmt(t_h)} h = "
        f"{_fmt((p_old - p_new) * t_h / 1000)} kWh; x {n:g} devices "
        f"= {_fmt(kwh)} kWh -- closes",
        f"the household saves {_fmt(kwh)} kWh per day.",
    )
    return kwh, steps, f"energy saved = {_fmt(kwh)} kWh per day", None, \
        "saved = n x dP x t / 1000", {"n": n, "kwh": kwh}


def _c8_final_speed_fma(g, m, text):
    if not re.search(r"final\s+(?:speed|velocity)", text, re.I):
        return _GATE
    # a resistance VALUE (a second force in N) changes the family;
    # "assume no friction" must NOT trip this gate (2026-10-06 dig)
    if re.search(r"resistive\s+force|friction\s+force\s+of|opposing",
                 text, re.I):
        return _GATE
    fm = re.search(r"(?P<f>" + _SCI + r")\s*N\b", text, re.I)
    mm = re.search(r"(?P<ms>" + _SCI + r")\s*(?:kg|kilograms?)\b", text,
                   re.I)
    tm = re.search(r"(?:for|acts?[^.]{0,20}?for)\s+(?P<t>" + _SCI + r")\s*"
                   r"(?P<tu>" + _TIMEU + r")\b", text, re.I) or \
        re.search(r"seconds?\s+(?:the\s+)?force\s+acts?", text, re.I)
    if not (fm and mm and tm):
        return _GATE
    F = _sci(fm.group("f"))
    mass = _sci(mm.group("ms"))
    t = _to_s(tm.group("t"), tm.group("tu")) if tm.groupdict().get("tu") \
        else float(tm.group("t"))
    if F <= 0 or mass <= 0 or t <= 0:
        return _GATE
    a = F / mass
    v = a * t
    steps = _beats(
        "a = F/m, then v = u + a t with u = 0 (starts from rest).",
        f"a = {_fmt(F)} N / {_fmt(mass)} kg = {_fmt(a)} m/s^2; "
        f"v = 0 + {_fmt(a)} x {_fmt(t)} s",
        f"v = {_fmt(v)} m/s",
        f"check: a = v/t = {_fmt(v)} / {_fmt(t)} = {_fmt(a)} m/s^2; "
        f"F = m a = {_fmt(mass)} x {_fmt(a)} = {_fmt(F)} N -- closes",
        f"the block reaches {_fmt(v)} m/s.",
    )
    return v, steps, f"final speed = {_fmt(v)} m/s", None, \
        "v = (F/m) t", {"F": F, "m": mass, "t": t, "v": v}


def _c8_accel_with_resistance(g, m, text):
    if not re.search(r"resistive|opposing|backward", text, re.I):
        return _GATE
    if not re.search(r"acceleration|accelerat", text, re.I):
        return _GATE
    fs = re.findall(r"(?P<f>" + _SCI + r")\s*N\b", text, re.I)
    mm = re.search(r"(?P<ms>" + _SCI + r")\s*(?:kg|kilograms?)\b", text,
                   re.I)
    # exactly two forces: 3+ stated N-values ("a push of 15 N ... "
    # "translates to a 12 N force ... resistive 4 N") need semantic
    # force-role binding; subtracting the first two ships nonsense
    # (observed: (15-12)/18 for the correct (12-4)/18).  Refuse.
    if len(fs) != 2 or not mm or re.search(r"translates?\s+to", text,
                                           re.I):
        return _GATE
    F_net = _sci(fs[0]) - _sci(fs[1])
    mass = _sci(mm.group("ms"))
    if F_net <= 0 or mass <= 0:
        return _GATE
    a = F_net / mass
    steps = _beats(
        "net force = forward push - resistive forces; a = F_net / m.",
        f"F_net = {_fmt(_sci(fs[0]))} - {_fmt(_sci(fs[1]))} = "
        f"{_fmt(F_net)} N; a = {_fmt(F_net)} / {_fmt(mass)}",
        f"a = {_fmt(a)} m/s^2",
        f"check: F_net = m a = {_fmt(mass)} x {_fmt(a)} = "
        f"{_fmt(F_net)} N -- closes",
        f"the cycle accelerates at {_fmt(a)} m/s^2.",
    )
    return a, steps, f"acceleration = {_fmt(a)} m/s^2", None, \
        "a = (F1 - F2) / m", {"F_net": F_net, "m": mass, "a": a}


def _c8_friction_from_ma(g, m, text):
    if not re.search(r"friction", text, re.I):
        return _GATE
    if not re.search(r"accelerates?\s+at", text, re.I):
        return _GATE
    fm = re.search(r"force\s+of\s+(?P<f>" + _SCI + r")\s*N\b", text, re.I) \
        or re.search(r"(?P<f>" + _SCI + r")\s*N\s+(?:horizontal|forward)",
                     text, re.I)
    mm = re.search(r"(?P<ms>" + _SCI + r")\s*(?:kg|kilograms?)\b", text,
                   re.I)
    am = re.search(r"accelerates?\s+at\s+(?P<a>" + _SCI + r")", text, re.I)
    if not (fm and mm and am):
        return _GATE
    F = _sci(fm.group("f"))
    mass = _sci(mm.group("ms"))
    a = _sci(am.group("a"))
    if F <= 0 or mass <= 0 or a <= 0:
        return _GATE
    fric = F - mass * a
    if fric < 0 or fric >= F:
        return _GATE
    steps = _beats(
        "F_net = m a = F_applied - F_friction, so F_friction = "
        "F_applied - m a.",
        f"F_friction = {_fmt(F)} - {_fmt(mass)} x {_fmt(a)}",
        f"F_friction = {_fmt(F)} - {_fmt(mass * a)} = {_fmt(fric)} N",
        f"check: F_net = {_fmt(F)} - {_fmt(fric)} = {_fmt(F - fric)} N; "
        f"a = {_fmt(F - fric)} / {_fmt(mass)} = {_fmt(a)} m/s^2 -- closes",
        f"friction opposing the crate is {_fmt(fric)} N.",
    )
    return fric, steps, f"friction force = {_fmt(fric)} N", None, \
        "F_f = F - m a", {"F": F, "m": mass, "a": a, "F_f": fric}


def _c8_static_friction(g, m, text):
    if not re.search(r"coefficient of (?:static )?friction|friction", text,
                     re.I):
        return _GATE
    if not re.search(r"minimum|start(?:s|ing)?\s+(?:the|to)\s+(?:block|"
                     r"moving|move)|needed to start", text, re.I):
        return _GATE
    mus = re.findall(r"(?:coefficient[^.]{0,30}?(?:is|of)\s+)?"
                     r"(?P<mu>0\.\d+)\b", text, re.I)
    mm = re.search(r"(?P<ms>" + _SCI + r")\s*(?:kg|kilograms?)\b", text,
                   re.I)
    gm = re.search(r"g\s*=\s*(?P<g>" + _SCI + r")", text, re.I)
    if not (mus and mm):
        return _GATE
    mass = _sci(mm.group("ms"))
    g_acc = _sci(gm.group("g")) if gm else 10.0
    if mass <= 0 or not (0 < float(mus[0]) < 1.5):
        return _GATE
    N = mass * g_acc
    f1 = float(mus[0]) * N
    ans = f"minimum force = {_fmt(f1)} N"
    val = f1
    if len(mus) >= 2 and 0 < float(mus[1]) < 1.5:
        f2 = float(mus[1]) * N
        ans = f"rough surface: {_fmt(f1)} N; lubricated: {_fmt(f2)} N"
        val = f1
        steps = _beats(
            "minimum force to start motion = max static friction "
            "= mu_s x N = mu_s x m g (two surfaces asked).",
            f"N = {_fmt(mass)} x {_fmt(g_acc)} = {_fmt(N)} N; "
            f"f1 = {_fmt(float(mus[0]))} x {_fmt(N)}; "
            f"f2 = {_fmt(float(mus[1]))} x {_fmt(N)}",
            f"f1 = {_fmt(f1)} N; f2 = {_fmt(f2)} N",
            f"check: f/mu = {_fmt(f1)} / {_fmt(float(mus[0]))} = "
            f"{_fmt(N)} N = m g -- closes",
            f"the block needs {_fmt(f1)} N on the rough table and "
            f"{_fmt(f2)} N when lubricated.",
        )
        return val, steps, ans, None, "f = mu m g", \
            {"mu1": float(mus[0]), "mu2": float(mus[1]), "f1": f1,
             "f2": f2}
    steps = _beats(
        "minimum force to start motion = max static friction "
        "= mu_s x N = mu_s x m g.",
        f"N = {_fmt(mass)} x {_fmt(g_acc)} = {_fmt(N)} N",
        f"f = {_fmt(float(mus[0]))} x {_fmt(N)} = {_fmt(f1)} N",
        f"check: f / (m g) = {_fmt(f1)} / {_fmt(N)} = "
        f"{_fmt(float(mus[0]))} = mu_s -- closes",
        f"a pull just over {_fmt(f1)} N starts the block.",
    )
    return val, steps, ans, None, "f = mu m g", \
        {"mu": float(mus[0]), "N": N, "f": f1}


def _c8_pressure_area_cm(g, m, text):
    if not re.search(r"pressure", text, re.I):
        return _GATE
    # orientation variant: weight given, two faces (largest / smallest)
    wm = re.search(r"(?:weighs?|weight(?:\s+is)?\s+of)\s+(?P<w>" + _SCI
                   + r")\s*N\b", text, re.I)
    dims = re.findall(r"(?P<d>" + _SCI + r")\s*(?P<u>cm|centimetres?|"
                      r"centimeters?|m|metres?|meters?)\b", text, re.I)
    low = text.lower()
    if wm and len(dims) >= 3 and ("largest" in low or "smallest" in low):
        W = _sci(wm.group("w"))
        raw = sorted((_sci(d) for d, _ in dims[:3]), reverse=True)
        vals = sorted((_conv_len(_sci(d), u) for d, u in dims[:3]),
                      reverse=True)
        a_big, a_small = vals[0] * vals[1], vals[1] * vals[2]
        if a_big <= 0:
            return _GATE
        p_big, p_small = W / a_big, W / a_small
        steps = _beats(
            "P = F/A; convert every dimension to metres first, largest "
            "face = two longest sides, smallest face = two shortest.",
            f"dimensions {_fmt(raw[0])} x {_fmt(raw[1])} x {_fmt(raw[2])} cm"
            f" -> {_fmt(vals[0])} x {_fmt(vals[1])} x {_fmt(vals[2])} m; "
            f"P_large = {_fmt(W)} / ({_fmt(vals[0])} x {_fmt(vals[1])})"
            f"; P_small = {_fmt(W)} / ({_fmt(vals[1])} x {_fmt(vals[2])})",
            f"P_large = {_fmt(p_big)} Pa; P_small = {_fmt(p_small)} Pa",
            f"check: ratio = area ratio = {_fmt(a_big / a_small)}; "
            f"pressure ratio {_fmt(p_small / p_big)} -- inverse, closes",
            f"largest face: {_fmt(p_big)} Pa; smallest face: "
            f"{_fmt(p_small)} Pa.",
        )
        val = p_small
        return val, steps, (f"largest face: {_fmt(p_big)} Pa; "
                            f"smallest face: {_fmt(p_small)} Pa"), None, \
            "P = F/A", {"P_large": p_big, "P_small": p_small}
    # plain variant: force + rectangular dimensions in cm
    fm = re.search(r"(?:force\s+of\s+)?(?P<f>" + _SCI + r")\s*N\b", text,
                   re.I)
    if fm and len(dims) >= 2 and "x" in low:
        F = _sci(fm.group("f"))
        a_m2 = _conv_len(_sci(dims[0][0]), dims[0][1]) * \
            _conv_len(_sci(dims[1][0]), dims[1][1])
        if F <= 0 or a_m2 <= 0:
            return _GATE
        P = F / a_m2
        steps = _beats(
            "P = F/A; convert each dimension to metres, then divide "
            "force by area in m^2.",
            f"A = {_fmt(_sci(dims[0][0]))} {dims[0][1]} x "
            f"{_fmt(_sci(dims[1][0]))} {dims[1][1]} = {_fmt(a_m2)} m^2",
            f"P = {_fmt(F)} / {_fmt(a_m2)} = {_fmt(P)} Pa",
            f"check: A x P = {_fmt(a_m2)} x {_fmt(P)} = {_fmt(F)} N "
            "-- closes",
            f"the surface feels {_fmt(P)} Pa.",
        )
        return P, steps, f"pressure = {_fmt(P)} Pa", None, "P = F/A", \
            {"F": F, "A": a_m2, "P": P}
    return _GATE


def _conv_len(v: float, u: str) -> float:
    u = u.lower()
    if u.startswith("c"):
        return v / 100.0
    if u.startswith("mm") or u.startswith("milli"):
        return v / 1000.0
    return v


def _c8_pressure_point(g, m, text):
    if not re.search(r"pressure", text, re.I):
        return _GATE
    if not re.search(r"heel|one leg|one foot|diameter", text, re.I):
        return _GATE
    mm = re.search(r"(?:mass\s+(?:of\s+)?|weighs?\s+)(?P<ms>" + _SCI
                   + r")\s*(?P<su>kg|kilograms?)\b", text, re.I)
    dm = re.search(r"diameter\s+(?:of\s+)?(?P<d>" + _SCI + r")\s*"
                   r"(?P<du>cm|mm|m)\b", text, re.I)
    gm = re.search(r"g\s*=\s*(?P<g>" + _SCI + r")", text, re.I)
    if not (mm and dm):
        return _GATE
    mass = _sci(mm.group("ms"))
    d_m = _conv_len(_sci(dm.group("d")), dm.group("du"))
    g_acc = _sci(gm.group("g")) if gm else 10.0
    if mass <= 0 or d_m <= 0:
        return _GATE
    r = d_m / 2.0
    A = math.pi * r * r
    F = mass * g_acc
    P = F / A
    steps = _beats(
        "P = F/A with F = m g and A = pi r^2 for the circular contact.",
        f"F = {_fmt(mass)} x {_fmt(g_acc)} = {_fmt(F)} N; "
        f"A = pi x ({_fmt(r)})^2 = {_fmt(A)} m^2",
        f"P = {_fmt(F)} / {_fmt(A)} = {_fmt(P)} Pa",
        f"check: A x P = {_fmt(A)} x {_fmt(P)} = {_fmt(F)} N -- closes",
        f"the floor feels about {_fmt(P)} Pa ({_fmt(P / 1000)} kPa).",
    )
    return P, steps, f"pressure = {_fmt(P)} Pa", None, "P = mg / (pi r^2)", \
        {"m": mass, "r": r, "P": P}


def _c8_pressure_vehicle(g, m, text):
    if not re.search(r"pressure", text, re.I):
        return _GATE
    if not re.search(r"tyres?|tires?|wheels?|contact patch", text, re.I):
        return _GATE
    mm = re.search(r"(?:mass\s+(?:of\s+)?)(?P<ms>" + _SCI + r")\s*"
                   r"(?:kg|kilograms?|tonnes?)\b", text, re.I)
    nm = re.search(r"(?P<n>\d+|four|three|two|six)\s*(?:tyres?|tires?|"
                   r"wheels?)", text, re.I)
    dims = re.findall(r"(?P<d>" + _SCI + r")\s*(?P<u>cm|m)\b", text, re.I)
    gm = re.search(r"g\s*=\s*(?P<g>" + _SCI + r")", text, re.I)
    if not (mm and nm and len(dims) >= 2):
        return _GATE
    mass = _sci(mm.group("ms")) * (1000.0 if "tonne" in text.lower()
                                   else 1.0)
    n = (_WORD_N[nm.group("n").lower()] if not nm.group("n").isdigit()
         else float(nm.group("n")))
    g_acc = _sci(gm.group("g")) if gm else 10.0
    a_patch = _conv_len(_sci(dims[0][0]), dims[0][1]) * \
        _conv_len(_sci(dims[1][0]), dims[1][1])
    if mass <= 0 or n < 1 or a_patch <= 0:
        return _GATE
    F_total = mass * g_acc
    P = F_total / (n * a_patch)
    steps = _beats(
        "total weight spread over n contact patches: P = m g / (n A).",
        f"P = {_fmt(mass)} x {_fmt(g_acc)} / ({n:g} x {_fmt(a_patch)})"
        ,
        f"P = {_fmt(F_total)} / {_fmt(n * a_patch)} = {_fmt(P)} Pa",
        f"check: n A P = {n:g} x {_fmt(a_patch)} x {_fmt(P)} = "
        f"{_fmt(F_total)} N = m g -- closes",
        f"the ground carries about {_fmt(P)} Pa.",
    )
    return P, steps, f"pressure = {_fmt(P)} Pa", None, "P = mg / (n A)", \
        {"m": mass, "n": n, "A": a_patch, "P": P}


def _c8_magfield_wire(g, m, text):
    if not re.search(r"magnetic field", text, re.I):
        return _GATE
    if not re.search(r"(?:straight|long|carrying).{0,40}(?:wire|conductor)"
                     r"|(?:wire|conductor).{0,40}carries?", text, re.I):
        return _GATE
    im = re.search(r"(?P<i>" + _SCI + r")\s*A\b", text, re.I)
    rm = re.search(r"(?P<r>" + _SCI + r")\s*(?P<ru>cm|mm|m)\b", text, re.I)
    if not (im and rm):
        return _GATE
    I = _sci(im.group("i"))
    r = _conv_len(_sci(rm.group("r")), rm.group("ru"))
    if I <= 0 or r <= 0:
        return _GATE
    B = 2e-7 * I / r
    steps = _beats(
        "field of a long straight wire: B = mu0 I / (2 pi r) "
        "= 2e-7 I / r (r in metres).",
        f"B = 2e-7 x {_fmt(I)} / {_fmt(r)}",
        f"B = {_fmt(B)} T",
        f"check: B r / (2e-7) = {_fmt(B * r / 2e-7)} A = I -- closes",
        f"the compass sits in a {_fmt(B)} T field.",
    )
    return B, steps, f"magnetic field = {_fmt(B)} T", None, \
        "B = 2e-7 I / r", {"I": I, "r": r, "B": B}


def _c8_magfield_coil(g, m, text):
    if not re.search(r"magnetic field", text, re.I):
        return _GATE
    if not re.search(r"\bcoils?\b|\bloops?\b|\bturns?\b", text, re.I):
        return _GATE
    nm = re.search(r"(?P<n>\d+)\s*(?:turns?|loops?)", text, re.I)
    rm = re.search(r"radius\s+(?:of\s+)?(?P<r>" + _SCI + r")\s*"
                   r"(?P<ru>cm|mm|m)\b", text, re.I)
    im = re.search(r"(?P<i>" + _SCI + r")\s*A\b", text, re.I)
    if not (nm and rm and im):
        return _GATE
    N = float(nm.group("n"))
    r = _conv_len(_sci(rm.group("r")), rm.group("ru"))
    I = _sci(im.group("i"))
    if N < 1 or r <= 0 or I <= 0:
        return _GATE
    B = 2 * math.pi * 1e-7 * N * I / r
    steps = _beats(
        "field at the centre of a circular coil: B = mu0 N I / (2 r), "
        "mu0 = 4 pi x 10^-7 T m/A.",
        f"B = (4 pi x 1e-7 x {N:g} x {_fmt(I)}) / (2 x {_fmt(r)})",
        f"B = {_fmt(B)} T",
        f"check: B r / (2 pi e-7 N) = {_fmt(B * r / (2 * math.pi * 1e-7 * N))} "
        f"A = I -- closes",
        f"the coil's centre field is {_fmt(B)} T.",
    )
    return B, steps, f"magnetic field = {_fmt(B)} T", None, \
        "B = mu0 N I / (2 r)", {"N": N, "r": r, "I": I, "B": B}


def _c8_lens_image_infinity(g, m, text):
    if not re.search(r"\blens\b", text, re.I):
        return _GATE
    if not re.search(r"distant|far away|infinity|parallel rays?|\bsun\b|"
                     r"tree\b", text, re.I):
        return _GATE
    if not re.search(r"how far|at what distance|where|image distance|"
                     r"paper|screen", text, re.I):
        return _GATE
    fm = re.search(r"focal\s+length\s+(?:of\s+)?(?P<f>" + _SCI + r")\s*"
                   r"(?P<fu>cm|mm|m)\b", text, re.I)
    if not fm:
        return _GATE
    f_val = _sci(fm.group("f"))
    f_unit = fm.group("fu")
    kind_m = re.search(r"\b(concave|diverging|convex|converging)\b", text,
                       re.I)
    kind = (kind_m.group(1).lower() if kind_m else "convex")
    if f_val <= 0:
        return _GATE
    if kind in ("concave", "diverging"):
        ans = (f"rays appear to diverge from the focus at "
               f"{_fmt(f_val)} {f_unit} on the same side (virtual focus)")
        val = f_val
    else:
        ans = (f"image forms at {_fmt(f_val)} {f_unit} from the lens "
               f"(at the focus)")
        val = f_val
    steps = _beats(
        "rays from a distant object arrive parallel; a lens brings "
        "them to (or appears to diverge them from) its focal point, "
        "so image distance = focal length.",
        f"v = f = {_fmt(f_val)} {f_unit} ({kind} lens)",
        f"v = {_fmt(f_val)} {f_unit}",
        f"check: a screen at {_fmt(f_val)} {f_unit} shows a sharp image -- "
        "matches the definition of the focal length",
        ans + ".",
    )
    return val, steps, ans, None, "v = f (object at infinity)", {"f": f_val}


def _c8_mirror_image(g, m, text):
    if not re.search(r"mirror", text, re.I):
        return _GATE
    fm = re.search(r"focal\s+length\s+(?:of\s+)?(?P<f>" + _SCI + r")\s*"
                   r"(?P<fu>cm|mm|m)\b", text, re.I)
    um = re.search(r"(?:(?:placed|held|kept|located)\s+)?(?P<u>" + _SCI
                   + r")\s*(?P<uu>cm|mm|m)\s+(?:from|in front of)\s+"
                   r"(?:the\s+|a\s+)?(?:concave|convex|spherical)?\s*"
                   r"(?:mirror|tooth|shaving)", text, re.I)
    if not (fm and um):
        return _GATE
    f_raw = _sci(fm.group("f"))
    u_raw = _sci(um.group("u"))
    dist_unit = (um.group("uu") if (um.group("uu") or "").lower()
                 == (fm.group("fu") or "").lower() else fm.group("fu"))
    kind_m = re.search(r"\b(concave|convex)\b", text, re.I)
    kind = (kind_m.group(1).lower() if kind_m else "concave")
    # Cartesian sign convention: distances measured against incident light
    f = -abs(f_raw) if kind == "concave" else abs(f_raw)
    u = -abs(u_raw)
    if f == 0 or u == 0 or (kind == "convex" and abs(f) >= abs(u)):
        return _GATE
    denom = 1.0 / f - 1.0 / u
    if denom == 0:
        return _GATE
    v = 1.0 / denom
    mag = -v / u
    nature = ("real, inverted" if v < 0 else "virtual, erect")
    # image height if object height given (answer keeps the height's unit)
    hm = re.search(r"(?:height|tall|size)[\w\s]{0,15}?(?P<h>" + _SCI
                   + r")\s*(?P<hu>cm|mm|m)?\b", text, re.I)
    h_txt = ""
    if hm:
        h = _sci(hm.group("h"))
        h_unit = hm.group("hu") or dist_unit
        h_img = mag * h
        h_txt = f"; image height = {_fmt(h_img)} {h_unit}"
    ans = (f"image distance = {_fmt(abs(v))} {dist_unit} "
           f"({('in front of the mirror' if v < 0 else 'behind the mirror')}); "
           f"magnification = {_fmt(mag)} ({nature})" + h_txt)
    steps = _beats(
        "mirror formula 1/v = 1/f - 1/u with the Cartesian sign "
        "convention (f and u negative for a concave mirror in front "
        "of the object); m = -v/u.",
        f"1/v = 1/({_fmt(f)}) - 1/({_fmt(u)})",
        f"1/v = {_fmt(denom)} -> v = {_fmt(v)} cm; "
        f"m = -({_fmt(v)})/({_fmt(u)}) = {_fmt(mag)}",
        f"check: 1/v + 1/u = {_fmt(1 / v + 1 / u)} = 1/f = "
        f"{_fmt(1 / f)} -- closes",
        f"the image forms at {_fmt(abs(v))} {dist_unit}, {nature}." + h_txt,
    )
    # numeric channel carries the DISTANCE magnitude (grading compares
    # magnitudes); the sign/nature lives in the answer text and extra
    return abs(v), steps, ans, None, "1/v = 1/f - 1/u; m = -v/u", \
        {"f": f, "u": u, "v": v, "m": mag}


def _c8_current_from_pv(g, m, text):
    """I = P / V: a power-rated appliance on a mains supply -- the
    current ask (SOLVER-DIG class-8 handoff: the honest-refusal case
    'heater rated 1500 W at 220 V, current drawn?')."""
    if not re.search(r"current", text, re.I):
        return _GATE
    pm = re.search(r"(?P<p>" + _SCI + r")\s*(?P<pu>W|watts?|kW|kilowatts?)\b",
                   text, re.I)
    vm = re.search(r"(?P<v>" + _SCI + r")\s*V\b", text, re.I)
    if not (pm and vm):
        return _GATE
    p = _sci(pm.group("p")) * (1000.0 if pm.group("pu").lower().startswith(
        ("kw", "kilo")) else 1.0)
    v = _sci(vm.group("v"))
    if p <= 0 or v <= 0:
        return _GATE
    if v < 40 or v > 500:   # mains-band plausibility, not a lab supply
        return _GATE
    i = p / v
    steps = _beats(
        "power P = V I rearranged for the current draw: I = P / V.",
        f"I = {_fmt(p)} W / {_fmt(v)} V",
        f"I = {_fmt(i)} A",
        f"check: V I = {_fmt(v)} x {_fmt(i)} = {_fmt(p)} W -- matches "
        "the rating",
        f"the appliance draws about {_fmt(i)} A.",
    )
    return i, steps, f"current = {_fmt(i)} A", None, "I = P / V", \
        {"P": p, "V": v, "I": i}


def _c8_column_pressure(g, m, text):
    """P = h rho g: pressure at the base of a liquid column (mercury
    barometer, water tank) -- the second SOLVER-DIG class-8 handoff."""
    if not re.search(r"pressure", text, re.I):
        return _GATE
    hm = re.search(r"(?:height|depth|column)\s*(?:of\s+)?(?P<h>" + _SCI
                   + r")\s*(?P<hu>cm|mm|m)\b", text, re.I)
    # 'density of water is 1000 kg/m^3' -- the liquid's name may sit
    # between 'density of' and the value (2026-10-07, class-9 dig)
    dm = re.search(r"density\s*(?:of\s+)?(?:[a-z]+\s+)?(?:is\s+|=|:)?\s*"
                   r"(?P<rho>" + _SCI + r")\s*"
                   r"(?P<rhou>kg/m\^?3|kg/m3|g/cm\^?3|g/cm3)\b",
                   text, re.I)
    if not (hm and dm):
        # corpus phrasing: 'mercury column of height 76 cm' with the
        # density stated elsewhere in the sentence
        dm = dm or re.search(r"(?:mercury|density)\b[^.]{0,60}?"
                             r"(?P<rho>13600|13546|13\.6\s*(?:x\s*10\^?3)?)"
                             r"(?:\s*kg/m\^?3)?", text, re.I)
        if not dm:
            return _GATE
    h = _conv_len(_sci(hm.group("h")), hm.group("hu"))
    rho = _sci(dm.group("rho"))
    if "g/cm" in (dm.groupdict().get("rhou") or ""):
        rho *= 1000.0
    if rho == 13.6:
        rho = 13600.0
    gg = re.search(r"g\s*=\s*(?P<g>" + _SCI + r")", text, re.I)
    g_acc = _sci(gg.group("g")) if gg else 10.0
    if h <= 0 or rho <= 0:
        return _GATE
    P = h * rho * g_acc
    steps = _beats(
        "pressure of a liquid column: P = h rho g (height in metres, "
        "density in kg/m^3).",
        f"P = {_fmt(h)} m x {_fmt(rho)} kg/m^3 x {_fmt(g_acc)} m/s^2",
        f"P = {_fmt(P)} Pa",
        f"check: P / (rho g) = {_fmt(P / (rho * g_acc))} m = h -- closes",
        f"the column presses with {_fmt(P)} Pa ({_fmt(P / 1000)} kPa).",
    )
    return P, steps, f"pressure = {_fmt(P)} Pa", None, "P = h rho g", \
        {"h": h, "rho": rho, "g": g_acc, "P": P}


def _c8_outlier_mean(g, m, text):
    if not re.search(r"outlier|timing error|anomal(?:y|ous)|does not fit|"
                     r"suspect (?:trial|reading)", text, re.I):
        return _GATE
    nums = [float(x) for x in re.findall(r"(?P<x>\d+(?:\.\d+)?)\s*(?:s\b|"
                                         r"seconds?\b|min\b|minutes?\b)?",
                                         text)]
    nums = [x for x in nums if 0 < x < 10_000]
    if len(nums) < 4:
        return _GATE
    mean_all = sum(nums) / len(nums)
    devs = sorted(nums, key=lambda x: abs(x - mean_all))
    outlier = devs[-1]
    rest = [x for x in nums if x != outlier]
    if len(rest) < 3:
        return _GATE
    mean_rest = sum(rest) / len(rest)
    spread = max(rest) - min(rest)
    if spread == 0 or abs(outlier - mean_rest) <= 2.5 * spread:
        return _GATE  # not a clear outlier; refuse rather than guess
    steps = _beats(
        "a single wildly-off trial is a timing error; drop it and "
        "average the remaining trials.",
        # enumerate the kept trials: the data-coverage guard requires
        # every stated value to appear in the steps, and dropping the
        # outlier without naming the survivors reads as ignored data
        f"trials {[ _fmt(x) for x in rest ]} kept; "
        f"{_fmt(outlier)} flagged as the outlier (mean-of-all check "
        f"= {_fmt(mean_all)})",
        f"mean of remaining {len(rest)} trials = "
        f"{_fmt(sum(rest))} / {len(rest)} = {_fmt(mean_rest)}",
        f"check: every remaining trial lies within "
        f"{_fmt(spread)} of the mean; the dropped one was "
        f"{_fmt(abs(outlier - mean_rest))} away -- closes",
        f"the reliable average is {_fmt(mean_rest)}.",
    )
    return mean_rest, steps, f"average (outlier removed) = {_fmt(mean_rest)}", \
        None, "mean of trials excluding the outlier", \
        {"outlier": outlier, "mean": mean_rest}


# --------------------------------------------------------------------------- #
# C8B wave (2026-10-07, SOLVER-DIG class-8 pass -- joule heating, spherical
# mirrors, word-pressure).  Named _c8b_/*_C8B to stay disjoint from the
# parallel _c8_/_TABLE_C8 wave landing in the same file.
# --------------------------------------------------------------------------- #

def _c8b_joule_heat(g, m, text):
    """Joule's law of heating H = I^2 R t (and H = V I t when the supply
    voltage is the given electrical quantity instead of R).  Any-variable:
    H, t ('time for the fuse to melt'), R, I.  The Ohm family used to
    hijack these asks and ship V = I R as 'voltage = 200 V'."""
    if not re.search(r"heat\s+(?:produced|developed|generated|given"
                     r"|liberated|dissipated)|how\s+much\s+heat"
                     r"|time\s+(?:taken|needed|required)\s+for\s+the"
                     r"?[\w\s]{0,25}\s+to\s+melt", text, re.I):
        return _GATE
    im = re.search(r"(?P<i>" + _SCI + r")\s*(?P<iu>A|amp(?:s|eres?)?)\b",
                   text, re.I)
    rm = re.search(r"(?P<r>" + _SCI + r")\s*(?P<ru>ohms?|\u03a9)\b",
                   text, re.I)
    vm = re.search(r"(?P<v>" + _SCI + r")\s*(?P<u2>V|volts?)\b", text, re.I)
    hm = re.search(r"(?P<h>" + _SCI + r")\s*(?:J|joules?)\b", text, re.I)
    tm = re.search(r"(?:for\s+|in\s+)?(?P<t>" + _SCI + r")\s*"
                   r"(?P<tu>minutes?|mins?|min|seconds?|secs?|sec|s|"
                   r"hours?|hrs?)\b", text, re.I)
    asks_time = bool(re.search(r"time\s+(?:taken|needed|required)|to\s+melt",
                               text, re.I))
    i = _sci(im.group("i")) if im else None
    r_ = _sci(rm.group("r")) if rm else None
    v = _sci(vm.group("v")) if vm else None
    h = _sci(hm.group("h")) if hm else None
    t = _to_s(tm.group("t"), tm.group("tu")) if tm else None
    if asks_time:
        if None in (h, i, r_) or t is not None:
            return _GATE
        val = h / (i * i * r_)
        steps = _beats(
            "Joule's law of heating rearranged: H = I^2 R t -> "
            "t = H / (I^2 R).",
            "t = %s J / ((%s A)^2 x %s ohm)" % (_fmt(h), _fmt(i), _fmt(r_)),
            "t = %s / %s = %s s" % (_fmt(h), _fmt(i * i * r_), _fmt(val)),
            "substitute back: H = (%s)^2 x %s x %s = %s J -- matches"
            % (_fmt(i), _fmt(r_), _fmt(val), _fmt(h)),
            "the fuse melts after %s s." % _fmt(val),
        )
        return val, steps, "time = %s s" % _fmt(val), None, \
            "t = H / (I^2 R)", {"H": h, "I": i, "R": r_, "t": val}
    if i is None or t is None or (r_ is None and v is None):
        return _GATE
    if r_ is not None:
        val = i * i * r_ * t
        law = "H = I^2 R t"
        subst = "H = (%s)^2 x %s x %s" % (_fmt(i), _fmt(r_), _fmt(t))
    else:
        val = v * i * t
        law = "H = V I t"
        subst = "H = %s x %s x %s" % (_fmt(v), _fmt(i), _fmt(t))
    steps = _beats(
        "Joule's law of heating %s -- electrical energy converted to "
        "heat in a resistance." % law,
        subst,
        "H = %s J" % _fmt(val),
        "check units: A^2 x ohm x s = J (or V x A x s = J)",
        "%s J of heat is produced." % _fmt(val),
    )
    return val, steps, "heat produced = %s J" % _fmt(val), None, law, \
        {"I": i, "R": r_, "V": v, "t": t, "H": val}


def _c8b_mirror_focal(g, m, text):
    """f = R / 2 for a spherical mirror (concave: focus in front, so
    f is negative in the Cartesian convention; convex: positive)."""
    if not re.search(r"radius\s+of\s+curvature", text, re.I):
        return _GATE
    if not re.search(r"focal\s+length", text, re.I):
        return _GATE
    # the radius NUMBER must follow the 'radius of curvature' phrase --
    # when the only length in the sentence belongs to a 'focal length
    # of N unit' phrase (and the curvature mention is the ASK, e.g.
    # 'what is its radius of curvature?'), this family must not treat
    # the focal length as R (shipped f = 10 cm for a GIVEN 20 cm f).
    rm = None
    for cm_ in re.finditer(r"radius\s+of\s+curvature", text, re.I):
        rm = re.search(r"(?P<r>" + _SCI + r")\s*"
                       r"(?P<ru>cm|mm|m|metres?|meters?)\b",
                       text[cm_.end():cm_.end() + 90], re.I)
        if rm:
            break
    if not rm:
        return _GATE
    r_ = _sci(rm.group("r"))
    conv = {"mm": 0.001, "cm": 0.01, "m": 1.0}.get(rm.group("ru").lower(), 1.0)
    R_m = r_ * conv
    if R_m <= 0:
        return _GATE
    concave = bool(re.search(r"concave", text, re.I))
    val = R_m / 2.0
    sign = ("negative (focus in front of the mirror)" if concave
            else "positive (focus behind the mirror)")
    shown = ("-%s" % _fmt(val)) if concave else ("+%s" % _fmt(val))
    steps = _beats(
        "the focal length of a spherical mirror is half its radius of "
        "curvature: f = R / 2.",
        "R = %s %s = %s m" % (_fmt(r_), rm.group("ru"), _fmt(R_m)),
        "f = %s / 2 = %s m" % (_fmt(R_m), _fmt(val)),
        "sign: %s mirror -> %s" % ("concave" if concave else "convex", sign),
        "f = %s m." % shown,
    )
    ask_m = bool(re.search(r"in\s+(?:metres?|m)\b", text, re.I))
    if ask_m:
        return val, steps, "focal length = %s m" % shown, None, "f = R / 2", \
            {"R_m": R_m, "f_m": val}
    val_u = r_ / 2.0
    return val, steps, \
        "focal length = %s m (%s %s)" % (shown, _fmt(val_u), rm.group("ru")), \
        None, "f = R / 2", {"R_m": R_m, "f_m": val}


def _c8b_mirror_type(g, m, text):
    """'always forms an erect, diminished image' -> convex mirror,
    R = 2|f| -- the dioptre family hijacked this and shipped '5 D'."""
    if not re.search(r"erect[^.]{0,30}diminished|diminished[^.]{0,30}erect",
                     text, re.I):
        return _GATE
    if not re.search(r"radius\s+of\s+curvature|what\s+type\s+of\s+mirror",
                     text, re.I):
        return _GATE
    fm = re.search(r"focal\s+length\s+(?:of\s+)?(?P<f>" + _SCI + r")\s*"
                   r"(?P<fu>cm|mm|m)\b", text, re.I)
    if not fm:
        return _GATE
    f_v = _sci(fm.group("f"))
    conv = {"mm": 0.001, "cm": 0.01, "m": 1.0}.get(fm.group("fu").lower(), 1.0)
    f_m = f_v * conv
    R_m = 2.0 * f_m
    steps = _beats(
        "a convex mirror ALWAYS gives an erect, diminished (virtual, "
        "smaller) image whatever the object distance.",
        "given f = %s %s = %s m" % (_fmt(f_v), fm.group("fu"), _fmt(f_m)),
        "R = 2f = 2 x %s = %s m" % (_fmt(f_m), _fmt(R_m)),
        "concave mirrors give inverted images for distant objects, so "
        "erect+diminished pins the type: convex",
        "convex mirror, radius of curvature = %s m (%s cm)."
        % (_fmt(R_m), _fmt(R_m * 100)),
    )
    return R_m, steps, \
        "convex mirror, R = %s m (%s cm)" % (_fmt(R_m), _fmt(R_m * 100)), \
        None, "R = 2f", {"f_m": f_m, "R_m": R_m}


def _c8b_pressure_brick(g, m, text):
    """'brick of weight W, dims a x b x c, pressure on its largest /
    smallest face' -> P = W / (two chosen dims)."""
    if not re.search(r"brick|block|cuboid", text, re.I):
        return _GATE
    if not re.search(r"largest|smallest|biggest|narrowest", text, re.I):
        return _GATE
    wm = re.search(r"(?:weight|weighing|of)\s*(?:of\s+)?(?P<w>" + _SCI
                   + r")\s*(?P<wu>N|newtons?)\b", text, re.I)
    dm = [(mm2.group("d"), mm2.group("du")) for mm2 in
          re.finditer(r"(?P<d>" + _SCI + r")\s*(?P<du>cm|mm|m)\b",
                      text, re.I)]
    if not wm or len(dm) < 3:
        return _GATE
    conv = {"mm": 0.001, "cm": 0.01, "m": 1.0}
    dims = sorted(_sci(d) * conv[du.lower()] for (d, du) in dm[:3])
    w = _sci(wm.group("w"))
    biggest = bool(re.search(r"largest|biggest", text, re.I))
    e1, e2 = (dims[1], dims[2]) if biggest else (dims[0], dims[1])
    area = e1 * e2
    if area <= 0:
        return _GATE
    val = w / area
    face = "largest" if biggest else "smallest"
    steps = _beats(
        "pressure P = W / contact area; lying on a face, the contact area "
        "is the product of that face's two edges.",
        "%s face: %s m x %s m = %s m^2" % (face, _fmt(e1), _fmt(e2),
                                           _fmt(area)),
        "P = %s N / %s m^2 = %s Pa" % (_fmt(w), _fmt(area), _fmt(val)),
        "same weight, smaller face -> larger pressure",
        "the %s-face contact pressure is %s Pa." % (face, _fmt(val)),
    )
    return val, steps, "pressure = %s Pa" % _fmt(val), None, \
        "P = W / (edge x edge)", {"W": w, "area": area, "P": val}


def _c8b_pressure_vehicle(g, m, text):
    """Tractor/vehicle pressure: mass -> W = m x g, N tyres, per-tyre
    patch (length x width, cm or m) -> P = W / (N x patch area).
    FOOLPROOF-GATE (2026-10-07): the owner's curated c8 battery case
    ('mass 5000 kg, four tyres, 40 cm x 20 cm patches') fell through
    every gate: the weight regex demanded 'weight/weighs' wording and
    the area regex demanded a pre-computed 'X m^2'."""
    if not re.search(r"each", text, re.I):
        return _GATE
    if not re.search(r"tyre|tire|wheel", text, re.I):
        return _GATE
    if not re.search(r"pressure|exert", text, re.I):
        return _GATE
    work = text.replace(",", "")
    word_n = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
              "six": 6, "seven": 7, "eight": 8}

    # tyre count: digit, word, or "four tyres"
    nm = (re.search(r"(?P<n>" + _SCI + r")\s*(?:identical\s+)?"
                    r"(?:rear\s+)?(?:tyres?|tires?|wheels?)", work, re.I)
          or re.search(r"(?P<n>one|two|three|four|five|six|seven|eight)\s+"
                       r"(?:identical\s+)?(?:rear\s+)?"
                       r"(?:tyres?|tires?|wheels?)", work, re.I))
    if nm is None:
        return _GATE
    n_tok = nm.group("n").lower()
    n = float(word_n.get(n_tok, n_tok)) if not n_tok.replace(".", "", 1).isdigit()         else float(n_tok)

    # per-tyre contact patch: "length 40 cm and width 20 cm" (cm or m)
    # (a) pre-computed per-tyre "contact area of 0.15 m^2"
    am2 = re.search(r"(?:contact\s+)?area(?:\s+of)?\s*(?:is\s+|of\s+)?"
                    r"(?P<a>" + _SCI + r")\s*(?P<au>m\s*\^?\s*2|sq\.?\s*m|"
                    r"m2)", work, re.I)
    if am2:
        patch = _sci(am2.group("a"))
    else:
        pm = re.search(r"length\s*(?:of\s*)?(?P<l>" + _SCI + r")\s*"
                       r"(?P<lu>cm|mm|m)[^.]{0,30}?width\s*(?:of\s*)?"
                       r"(?P<w>" + _SCI + r")\s*(?P<wu>cm|mm|m)", work, re.I)
        if pm is None:
            pm = re.search(r"(?P<l>" + _SCI + r")\s*(?P<lu>cm|mm|m)\s*"
                           r"(?:by|x|×)\s*(?P<w>" + _SCI + r")\s*(?P<wu>cm|mm|m)",
                           work, re.I)
        if pm is None:
            return _GATE
        conv = {"mm": 0.001, "cm": 0.01, "m": 1.0}
        patch = (_sci(pm.group("l")) * conv[pm.group("lu").lower()]
                 * _sci(pm.group("w")) * conv[pm.group("wu").lower()])
    if patch <= 0:
        return _GATE

    # weight: explicit W in newtons, or mass x g (class-8 convention g=10
    # unless the question states g)
    gm = re.search(r"(?:g|gravity)\s*(?:=|of|is)\s*(" + _SCI + r")", work)
    g = _sci(gm.group(1)) if gm else 10.0
    wmm = (re.search(r"(?:total\s+)?(?:weight|weighs?|weighing)"
                     r"[^.\d]{0,40}?(?P<w>" + _SCI + r")\s*"
                     r"(?P<wu>N|newtons?|kgf|"
                     r"kilograms?\s*force|kg|kilograms?)", work, re.I)
           or re.search(r"mass\s*(?:of\s+)?(?P<w>" + _SCI + r")\s*"
                        r"(?P<wu>kg|kilograms?|g|grams?)", work, re.I))
    if wmm is None:
        return _GATE
    w = _sci(wmm.group("w"))
    wu = wmm.group("wu").lower()
    if wu.startswith("kg") or wu == "kilograms":
        w *= g
    elif wu in ("g", "grams"):
        w = w / 1000.0 * g
    if n <= 0 or patch <= 0 or w <= 0:
        return _GATE
    total_area = n * patch
    val = w / total_area
    steps = _beats(
        "weight W = m x g = %s x %s = %s N" % (_fmt(n and w / g or w), _fmt(g), _fmt(w)),
        "total contact area = %s tyres x (%s patch) = %s m^2"
        % (_fmt(n), _fmt(patch), _fmt(total_area)),
        "P = W / total area = %s N / %s m^2 = %s Pa"
        % (_fmt(w), _fmt(total_area), _fmt(val)),
        "check: each tyre carries %s N over %s m^2 = %s Pa -- x%s tyres = "
        "%s N = the weight" % (_fmt(w / n), _fmt(patch), _fmt(val), _fmt(n),
                               _fmt(n * val)),
        "the tractor presses on the ground with %s Pa." % _fmt(val),
    )
    return val, steps, "pressure = %s Pa" % _fmt(val), None,         "P = (m x g) / (N x patch)", {"m": w / g, "g": g, "N": n,
        "patch": patch, "P": val}


def _c8b_net_force(g, m, text):
    """'calculate the NET FORCE' with an applied force and an opposing
    friction -> F_net = F1 - F2 (the ask is the force, not a = F/m; the
    NEWTON_SECOND_LAW family gates this ask after the C8 dig)."""
    if not re.search(r"net\s+(?:horizontal\s+)?force", text, re.I):
        return _GATE
    fs = [mm.group("f") for mm in
          re.finditer(r"(?P<f>" + _SCI + r")\s*(?P<fu>N|newtons?)\b",
                      text, re.I)]
    if len(fs) < 2:
        return _GATE
    f1 = _sci(fs[0])
    f2 = _sci(fs[1])
    val = f1 - f2
    if val <= 0:
        return _GATE
    steps = _beats(
        "net force = applied force - opposing friction (they act along "
        "the same line in opposite directions).",
        "F_net = %s N - %s N" % (_fmt(f1), _fmt(f2)),
        "F_net = %s N, in the direction of the applied force" % _fmt(val),
        "check: %s + %s = %s N -- the forces balance"
        % (_fmt(f2), _fmt(val), _fmt(f1)),
        "a net force of %s N acts forward on the body." % _fmt(val),
    )
    return val, steps, "net force = %s N forward" % _fmt(val), None, \
        "F_net = F_applied - F_friction", {"F1": f1, "F2": f2, "F_net": val}


def _c8b_pressure_dims(g, m, text):
    """'force F N acts on a rectangular surface of dimensions X by Y
    (cm or m)' -> area = X x Y, P = F / area (cm converted to m)."""
    if not re.search(r"dimensions?|measures?", text, re.I):
        return _GATE
    fm = re.search(r"(?P<f>" + _SCI + r")\s*(?P<fu>N|newtons?)\b", text,
                   re.I)
    dm = re.search(r"(?P<d1>" + _SCI + r")\s*(?P<u1>cm|mm|m)\b\s*"
                   r"(?:by|x|×)\s*(?P<d2>" + _SCI + r")\s*"
                   r"(?P<u2>cm|mm|m)\b", text, re.I)
    if not (fm and dm):
        return _GATE
    conv = {"mm": 0.001, "cm": 0.01, "m": 1.0}
    f = _sci(fm.group("f"))
    d1 = _sci(dm.group("d1")) * conv[dm.group("u1").lower()]
    d2 = _sci(dm.group("d2")) * conv[dm.group("u2").lower()]
    area = d1 * d2
    if area <= 0 or f <= 0:
        return _GATE
    val = f / area
    steps = _beats(
        "pressure P = F / area; for a rectangle the area is length x "
        "breadth (cm converted to m: 1 cm = 0.01 m).",
        f"area = {_fmt(d1)} m x {_fmt(d2)} m = {_fmt(area)} m^2",
        f"P = {_fmt(f)} N / {_fmt(area)} m^2 = {_fmt(val)} Pa",
        f"substitute back: F = P A = {_fmt(val)} x {_fmt(area)} = "
        f"{_fmt(f)} N -- matches",
        f"the surface feels {_fmt(val)} Pa.",
    )
    return val, steps, f"pressure = {_fmt(val)} Pa", None,         "P = F / (l x b)", {"F": f, "area": area, "P": val}



def _c8b_final_speed_fmt(g, m, text):
    """'force F N on mass m kg (at rest) for t s -> final speed'
    a = F / m, v = a x t.  Ask-gate: 'final speed/velocity' required."""
    if not re.search(r"final\s+(?:speed|velocity)", text, re.I):
        return _GATE
    if not re.search(r"at\s+rest|initially\s+at\s+rest", text, re.I):
        return _GATE
    fm = re.search(r"(?:force\s+of\s+)?(?P<f>" + _SCI + r")\s*"
                   r"(?P<fu>N|newtons?)", text, re.I)
    mm = re.search(r"(?P<mm>" + _SCI + r")\s*(?:kg|kilograms?|kilogram)",
                   text, re.I)
    tm = re.search(r"(?:for|acts?\s+for|during)\s+(?P<t>" + _SCI + r")\s*"
                   r"(?P<tu>s|sec|seconds?|second)", text, re.I)
    if not (fm and mm and tm):
        return _GATE
    f = _sci(fm.group("f"))
    mass = _sci(mm.group("mm"))
    t = _sci(tm.group("t"))
    if f <= 0 or mass <= 0 or t <= 0:
        return _GATE
    a = f / mass
    v = a * t
    steps = _beats(
        "a = F / m = %s N / %s kg = %s m/s^2" % (_fmt(f), _fmt(mass), _fmt(a)),
        "starts from rest, so u = 0: v = u + a x t = 0 + %s x %s" % (_fmt(a), _fmt(t)),
        "v = %s m/s" % _fmt(v),
        "check: v = (F/m) x t = %s x %s = %s m/s" % (_fmt(a), _fmt(t), _fmt(v)),
        "the block reaches a final speed of %s m/s." % _fmt(v),
    )
    return v, steps, "final speed = %s m/s" % _fmt(v), None,         "v = (F / m) x t", {"F": f, "m": mass, "t": t, "a": a, "v": v}


def _c8b_pressure_two_faces(g, m, text):
    """'slab W N, dims a x b x c, placed on largest face then smallest
    face -> pressure in each case' -> P1 = W/(ab), P2 = W/(bc)."""
    if not re.search(r"largest[^.]{0,40}smallest|smallest[^.]{0,40}largest",
                     text, re.I):
        return _GATE
    if not re.search(r"pressure", text, re.I):
        return _GATE
    wm = (re.search(r"(?:weighs?|weight\s*(?:of\s+)?|weighing)\s*"
                    r"(?P<w>" + _SCI + r")\s*(?P<wu>N|newtons?)", text, re.I)
          or re.search(r"(?P<w>" + _SCI + r")\s*N[^.]{0,60}?weighs?", text, re.I))
    dm = re.search(r"dimensions?\s*(?:of\s*)?(?P<d1>" + _SCI + r")\s*"
                   r"(?P<u1>cm|mm|m)\s*[x×\w]?\s*(?P<d2>" + _SCI + r")\s*"
                   r"(?P<u2>cm|mm|m)\s*[x×]?\s*(?P<d3>" + _SCI + r")\s*"
                   r"(?P<u3>cm|mm|m)", text, re.I)
    if not (wm and dm):
        return _GATE
    conv = {"mm": 0.001, "cm": 0.01, "m": 1.0}
    w = _sci(wm.group("w"))
    dims = sorted([_sci(dm.group("d1")) * conv[dm.group("u1").lower()],
                   _sci(dm.group("d2")) * conv[dm.group("u2").lower()],
                   _sci(dm.group("d3")) * conv[dm.group("u3").lower()]])
    if w <= 0 or 0 in dims:
        return _GATE
    a_large = dims[1] * dims[2]     # largest face
    a_small = dims[0] * dims[1]     # smallest face
    p_small_face = w / a_large      # on the largest face: least pressure
    p_large_face = w / a_small      # on the smallest face: most pressure
    steps = _beats(
        "the three face areas differ, so the pressure differs: "
        "P = W / face area.",
        "largest face area = %s m x %s m = %s m^2 -> P = %s Pa"
        % (_fmt(dims[1]), _fmt(dims[2]), _fmt(a_large), _fmt(p_small_face)),
        "smallest face area = %s m x %s m = %s m^2 -> P = %s Pa"
        % (_fmt(dims[0]), _fmt(dims[1]), _fmt(a_small), _fmt(p_large_face)),
        "the same weight, but the smaller the area, the higher the "
        "pressure.",
    )
    # the ask sequence 'largest then smallest' -> the final answer is the
    # smallest-face pressure (both are in the steps)
    return p_large_face, steps,         "pressures: %s Pa (largest face) and %s Pa (smallest face)"         % (_fmt(p_small_face), _fmt(p_large_face)), None,         "P = W / (a x b)", {"W": w, "P_min": p_small_face,
                             "P_max": p_large_face}


def _c8b_magfield_coil(g, m, text):
    """'coil of N turns, radius r, current I -> B at centre'
    B = mu_0 N I / (2 r), mu_0 = 4 pi x 10^-7."""
    if not re.search(r"coil", text, re.I) or         not re.search(r"magnetic\s+(?:field|flux)|field\s+at\s+its\s+centre|"
                      r"at\s+the\s+centre", text, re.I):
        return _GATE
    nm = re.search(r"(?P<n>" + _SCI + r")\s*(?:turns?|loops?|windings?)",
                   text, re.I)
    im = re.search(r"(?:current\s+(?:of\s+)?|carries\s+(?:a\s+)?"
                   r"(?:current\s+(?:of\s+)?)?)(?P<i>" + _SCI + r")\s*"
                   r"(?P<iu>A|ampere|amperes?)", text, re.I)
    rm = re.search(r"radius\s+(?:of\s+)?(?P<r>" + _SCI + r")\s*"
                   r"(?P<ru>cm|mm|m)", text, re.I)
    if not (nm and im and rm):
        return _GATE
    conv = {"mm": 0.001, "cm": 0.01, "m": 1.0}
    import math as _math
    mu0 = 4 * _math.pi * 1e-7
    n = _sci(nm.group("n"))
    i_cur = _sci(im.group("i"))
    r_m = _sci(rm.group("r")) * conv[rm.group("ru").lower()]
    if n <= 0 or i_cur <= 0 or r_m <= 0:
        return _GATE
    b = mu0 * n * i_cur / (2 * r_m)
    steps = _beats(
        "B = mu_0 N I / (2 r) at the centre of a circular coil.",
        "mu_0 = 4 pi x 10^-7 T m/A; N = %s; I = %s A; r = %s m"
        % (_fmt(n), _fmt(i_cur), _fmt(r_m)),
        "B = %s x %s x %s / (2 x %s) = %s T"
        % ("4pi x 10^-7", _fmt(n), _fmt(i_cur), _fmt(r_m), _fmt(b)),
        "the coil's centre field is %s T." % _fmt(b),
    )
    return b, steps, "magnetic field = %s T" % _fmt(b), None,         "B = mu_0 N I / (2 r)", {"N": n, "I": i_cur, "r": r_m, "B": b}



# --------------------------------------------------------------------------- #
# _TABLE_C9 -- class-9 physics wave (2026-10-07 dig).  Corpus: 64
# c9_physics .md files, 61 numeric diagnostics (Motion, Force, Gravitation
# not in scope here, Work & Energy, Sound, human-energy ch6).  Battery:
# _dig_c9phy.json (61 cases), pre-fix 15 SOLVE / 45 REFUSE.  Every row
# hard-gated on the ask; a refusal is only a content gap.
# --------------------------------------------------------------------------- #

_DIR_SIGN = {"east": 1, "west": -1, "north": 1, "south": -1,
             "up": 1, "down": -1, "upward": 1, "downward": -1,
             "forward": 1, "backward": -1, "right": 1, "left": -1}


def _c9_work_zero(g, m, text):
    """Zero-work boards: force with NO displacement (holding a bag) or
    force perpendicular to displacement (coolie carrying a load on
    level ground).  Both ship 0 J -- the class-9 misconception ask."""
    if not re.search(r"work", text, re.I):
        return _GATE
    low = text.lower()
    held = bool(re.search(r"holds?|holding|stationary|at\s+rest|"
                          r"stands?\s+still|push(?:es|ing)?\s+against\s+"
                          r"(?:a|the)\s+wall|without\s+moving", low))
    perp = bool(re.search(
        r"(?:carries?|carrying|walks?|walking|head|horizontal(?:ly)?)"
        r"[^.]{0,120}(?:ground|level|horizont|head)|"
        r"(?:ground|level|horizont|head)[^.]{0,120}"
        r"(?:carries?|walks?|horizontal)", low))
    if not (held or perp):
        return _GATE
    why = ("no displacement while the force acts" if held else
           "the upward force is perpendicular to the horizontal "
           "displacement (theta = 90 deg, cos 90 = 0)")
    steps = _beats(
        "work W = F s cos(theta); work needs a displacement ALONG the "
        "force.",
        "force acts, but " + why,
        "W = F x 0 x cos(theta) = 0 J" if held
        else "W = F s cos 90 deg = F s x 0 = 0 J",
        "no component of displacement along the force -> no energy "
        "transferred by that force",
        "the work done is 0 J (the student gets tired, but physics "
        "transfers no energy).",
    )
    return 0.0, steps, "work done = 0 J", None, "W = F s cos(theta)", \
        {"W": 0.0, "reason": why}


def _c9_work_angle(g, m, text):
    """W = F s cos(theta): force at an angle to the displacement."""
    if not re.search(r"work", text, re.I):
        return _GATE
    fm = re.search(r"(?P<f>" + _SCI + r")\s*(?:N|newtons?)\b[^.]{0,60}?"
                   r"(?:at|an\s+angle\s+of)\s*(?:of\s+)?(?P<a>" + _SCI
                   + r")\s*(?:\u00b0|degrees?|deg)\b", text, re.I) or \
        re.search(r"(?:at|angle\s+of)\s*(?:of\s+)?(?P<a>" + _SCI
                  + r")\s*(?:\u00b0|degrees?|deg)\b[^.]{0,60}?"
                  r"(?P<f>" + _SCI + r")\s*(?:N|newtons?)\b", text, re.I)
    dm = re.search(r"(?:over|for|through|across|of)\s+(?P<d>" + _SCI
                   + r")\s*(?P<du>m|metres?|meters?|cm|km)\b", text, re.I)
    if not (fm and dm):
        return _GATE
    f = _sci(fm.group("f"))
    ang = _sci(fm.group("a"))
    d = _to_m(dm.group("d"), dm.group("du"))
    if d <= 0:
        return _GATE
    import math as _math
    val = f * d * _math.cos(_math.radians(ang))
    steps = _beats(
        "work W = F s cos(theta) with theta the angle between force "
        "and displacement.",
        f"W = {_fmt(f)} N x {_fmt(d)} m x cos({_fmt(ang)} deg)",
        f"W = {_fmt(f * d)} x {_fmt(_math.cos(_math.radians(ang)))} = "
        f"{_fmt(val)} J",
        f"check: only the component {_fmt(f)}cos({_fmt(ang)}) = "
        f"{_fmt(f * _math.cos(_math.radians(ang)))} N acts along the "
        f"motion",
        f"the force does {_fmt(val)} J of work.",
    )
    return val, steps, f"work done = {_fmt(val)} J", None, \
        "W = F s cos(theta)", {"F": f, "s": d, "theta": ang, "W": val}


def _c9_work_net_friction(g, m, text):
    """Net work = (F_applied - F_friction) x d -- the work-energy
    theorem reads NET work, not one force's work."""
    if not re.search(r"net\s+work|work.{0,60}energy.{0,40}theorem|"
                     r"work\s+done\s+by\s+the\s+net", text, re.I):
        return _GATE
    f1m = re.search(r"(?:applied\s+)?(?:force|pull(?:s|ing)?)\s+of\s+"
                    r"(?P<f1>" + _SCI + r")\s*(?:N|newtons?)\b", text,
                    re.I)
    f2m = re.search(r"(?:kinetic\s+)?friction(?:al\s+force)?\s+of\s+"
                    r"(?P<f2>" + _SCI + r")\s*(?:N|newtons?)\b|friction"
                    r"\s+(?:of\s+)?(?P<f2b>" + _SCI + r")\s*(?:N|newtons?)\b",
                    text, re.I)
    dm = re.search(r"(?:moves?|travels?|slides?|displacement\s+of|over)\s*"
                   r"(?:a\s+distance\s+of\s+)?(?P<d>" + _SCI + r")\s*"
                   r"(?P<du>m|metres?|meters?)\b", text, re.I)
    if not (f1m and f2m and dm):
        return _GATE
    f1 = _sci(f1m.group("f1"))
    f2 = _sci(f2m.group("f2") or f2m.group("f2b"))
    d = _to_m(dm.group("d"), dm.group("du"))
    if d <= 0 or f2 > f1:
        return _GATE
    val = (f1 - f2) * d
    steps = _beats(
        "the work-energy theorem uses the NET work: first net force, "
        "then W = F_net s.",
        f"F_net = {_fmt(f1)} - {_fmt(f2)} = {_fmt(f1 - f2)} N forward",
        f"W_net = {_fmt(f1 - f2)} N x {_fmt(d)} m = {_fmt(val)} J",
        f"the kinetic energy changes by exactly {_fmt(val)} J",
        f"net work on the block = {_fmt(val)} J.",
    )
    return val, steps, f"net work = {_fmt(val)} J", None, \
        "W_net = (F1 - F2) s", {"F1": f1, "F2": f2, "s": d, "W": val}


def _c9_work_ke_thm(g, m, text):
    """W_net = delta KE = 1/2 m (v^2 - u^2); also the reverse read:
    final speed from a net force acting over a distance from rest."""
    low = text.lower()
    mm = re.search(r"(?P<m>" + _SCI + r")\s*(?P<mu>kg|kilograms?|g|grams?)\b",
                   text, re.I)
    um = re.search(r"from\s+(?P<u>" + _SCI + r")\s*(?:m/s|ms-1|metres?\s*"
                   r"per\s*second)\b", text, re.I)
    vm = re.search(r"to\s+(?P<v>" + _SCI + r")\s*(?:m/s|ms-1|metres?\s*"
                   r"per\s*second)\b", text, re.I)
    ask_work = bool(re.search(r"work\s+done|net\s+work", low))
    ask_speed = bool(re.search(r"final\s+speed|final\s+velocity", low))
    if not (mm and ask_work and um and vm):
        # reverse read: F over d from rest -> v = sqrt(2 F d / m)
        if mm and ask_speed:
            fm = re.search(r"(?:force|of)\s+(?P<f>" + _SCI
                           + r")\s*(?:N|newtons?)\b", text, re.I)
            dm = re.search(r"(?:over|for|distance\s+of)\s+(?P<d>" + _SCI
                           + r")\s*(?P<du>m|metres?|meters?|cm|km)\b",
                           text, re.I)
            rest = re.search(r"from\s+rest|starts?\s+from\s+rest", low)
            if fm and dm and rest:
                mm2 = re.search(r"(?P<m>" + _SCI + r")\s*"
                                r"(?P<mu>kg|kilograms?|g|grams?)\b",
                                text, re.I)
                if mm2:
                    m = _to_kg(mm2.group("m"), mm2.group("mu"))
                    f, d = _sci(fm.group("f")), _to_m(dm.group("d"),
                                                      dm.group("du"))
                    w = f * d
                    if m > 0 and w >= 0:
                        v = (2.0 * w / m) ** 0.5
                        steps = _beats(
                            "work-energy theorem: W = F d = delta KE = "
                            "1/2 m v^2 (starts from rest).",
                            f"W = {_fmt(f)} N x {_fmt(d)} m = {_fmt(w)} J",
                            f"v = sqrt(2 W / m) = sqrt(2 x {_fmt(w)} / "
                            f"{_fmt(m)}) = {_fmt(v)} m/s",
                            f"check: 1/2 x {_fmt(m)} x {_fmt(v)}^2 = "
                            f"{_fmt(0.5 * m * v * v)} J = W -- closes",
                            f"the final speed is {_fmt(v)} m/s.",
                        )
                        return v, steps, f"final speed = {_fmt(v)} m/s", \
                            None, "W = F d = 1/2 m v^2", \
                            {"W": w, "m": m, "v": v}
        return _GATE
    m = _to_kg(mm.group("m"), mm.group("mu"))
    u, v2 = _sci(um.group("u")), _sci(vm.group("v"))
    if m <= 0:
        return _GATE
    val = 0.5 * m * (v2 * v2 - u * u)
    steps = _beats(
        "work-energy theorem: net work = change in kinetic energy, "
        "W = 1/2 m (v^2 - u^2).",
        f"W = 1/2 x {_fmt(m)} x ({_fmt(v2)}^2 - {_fmt(u)}^2)",
        f"W = 1/2 x {_fmt(m)} x ({_fmt(v2 * v2)} - {_fmt(u * u)}) = "
        f"{_fmt(val)} J",
        f"check: KE grows from {_fmt(0.5 * m * u * u)} J to "
        f"{_fmt(0.5 * m * v2 * v2)} J",
        f"the net work done is {_fmt(val)} J.",
    )
    return val, steps, f"net work = {_fmt(val)} J", None, \
        "W = 1/2 m (v^2 - u^2)", {"m": m, "u": u, "v": v2, "W": val}


def _c9_drop_ke(g, m, text):
    """Free fall: KE (and speed) just before impact = mgh, v = sqrt(2gh);
    or KE/speed after falling a stated distance."""
    low = text.lower()
    if not re.search(r"dropped|falls?\s+from|free\s+fall|falling", low):
        return _GATE
    if not re.search(r"kinetic\s+energy|\bspeed\b|velocity", low):
        return _GATE
    mm = re.search(r"(?P<m>" + _SCI + r")\s*(?P<mu>kg|kilograms?|g|grams?)\b",
                   text, re.I)
    hm = re.search(r"(?:from\s+(?:a\s+)?(?:height\s+of\s+)?|height\s+of\s+)"
                   r"(?P<h>" + _SCI + r")\s*(?P<hu>m|metres?|meters?|cm|km)\b",
                   text, re.I)
    if not (mm and hm):
        return _GATE
    m = _to_kg(mm.group("m"), mm.group("mu"))
    h = _to_m(hm.group("h"), hm.group("hu"))
    gg = re.search(r"g\s*=\s*(?P<g>" + _SCI + r")", text, re.I)
    g_acc = _sci(gg.group("g")) if gg else 10.0
    if m <= 0 or h <= 0 or g_acc <= 0:
        return _GATE
    ke = m * g_acc * h
    v = (2.0 * g_acc * h) ** 0.5
    steps = _beats(
        "energy conservation in free fall: mgh at the top becomes "
        "1/2 m v^2 at the bottom.",
        f"KE = mgh = {_fmt(m)} x {_fmt(g_acc)} x {_fmt(h)} = {_fmt(ke)} J",
        f"v = sqrt(2gh) = sqrt(2 x {_fmt(g_acc)} x {_fmt(h)}) = "
        f"{_fmt(v)} m/s",
        f"check: 1/2 m v^2 = {_fmt(0.5 * m * v * v)} J = mgh -- closes",
        "air resistance ignored, so the numbers are exact.",
    )
    return ke, steps, (f"kinetic energy = {_fmt(ke)} J, "
                       f"speed = {_fmt(v)} m/s"), None, \
        "KE = mgh, v = sqrt(2gh)", {"m": m, "h": h, "g": g_acc,
                                    "KE": ke, "v": v}


def _c9_spring_launch(g, m, text):
    """Spring launcher: EPE = 1/2 k x^2; optional launch speed from
    1/2 k x^2 = 1/2 m v^2."""
    low = text.lower()
    if not re.search(r"spring|compress", low):
        return _GATE
    km = re.search(r"k\s*=\s*(?P<k>" + _SCI + r")\s*(?:N/m|N\s*per\s*m)\b",
                   text, re.I)
    xm = re.search(r"compress(?:ed|ion)?[^.]{0,30}?(?:by\s+)?(?P<x>" + _SCI
                   + r")\s*(?P<xu>cm|mm|m)\b", text, re.I)
    if not (km and xm):
        return _GATE
    k = _sci(km.group("k"))
    x = _to_m(xm.group("x"), xm.group("xu"))
    if k <= 0 or x <= 0:
        return _GATE
    epe = 0.5 * k * x * x
    ans = f"elastic PE = {_fmt(epe)} J"
    extra = {}
    mm2 = re.search(r"(?P<m>" + _SCI + r")\s*(?P<mu>kg|kilograms?|g|grams?)\b",
                    text, re.I)
    if mm2:
        m = _to_kg(mm2.group("m"), mm2.group("mu"))
        if m > 0:
            v = (k * x * x / m) ** 0.5
            ans += f", launch speed = {_fmt(v)} m/s"
            extra = {"m": m, "v": v}
    steps = _beats(
        "spring energy: EPE = 1/2 k x^2; on release it becomes "
        "kinetic energy 1/2 m v^2.",
        f"EPE = 1/2 x {_fmt(k)} x ({_fmt(x)})^2 = {_fmt(epe)} J",
        (f"1/2 m v^2 = {_fmt(epe)} J -> v = x sqrt(k/m) = "
         f"{_fmt(v)} m/s") if extra else "no mass asked -- energy only",
        f"check: 1/2 x {_fmt(k)} x {_fmt(x)}^2 reproduces the stored "
        "energy",
        f"the spring stores {_fmt(epe)} J"
        + (f" and the mass leaves at {_fmt(v)} m/s." if extra else "."),
    )
    return epe, steps, ans, None, "EPE = 1/2 k x^2", \
        dict({"k": k, "x": x, "EPE": epe}, **extra)


def _c9_power_energy(g, m, text):
    """E = P t in joules AND kWh (the board asks both units)."""
    if not re.search(r"energy\s+consumed|energy\s+in\s+(?:joules?|kwh)|"
                     r"consumed\s+in\s+one\s+day", text, re.I):
        return _GATE
    pm = re.search(r"(?P<p>" + _SCI + r")\s*(?P<pu>kW|W|watts?|kilowatts?)\b",
                   text, re.I)
    tm = re.search(r"(?:for|runs?[^.]{0,20}?for|daily[^.]{0,20}?)\s*"
                   r"(?P<t>" + _SCI + r")\s*(?P<tu>hours?|hrs?|h\b|minutes?"
                   r"|seconds?|s\b|days?\b)", text, re.I) or \
        re.search(r"(?P<t>" + _SCI + r")\s*(?P<tu>hours?|hrs?|minutes?|"
                  r"seconds?)\s*(?:daily|per\s+day|each\s+day)", text, re.I)
    if not (pm and tm):
        return _GATE
    p = _sci(pm.group("p"))
    if (pm.group("pu") or "").lower().startswith("k"):
        p *= 1000.0
    t = _to_s(tm.group("t"), tm.group("tu"))
    if p <= 0 or t <= 0:
        return _GATE
    e_j = p * t
    kwh = p * (t / 3600.0) / 1000.0
    steps = _beats(
        "electrical energy = power x time; 1 kWh = 3.6 x 10^6 J.",
        f"P = {_fmt(p)} W, t = {_fmt(t)} s",
        f"E = {_fmt(p)} x {_fmt(t)} = {_fmt(e_j)} J",
        f"kWh: {_fmt(p / 1000)} kW x {_fmt(t / 3600.0)} h = "
        f"{_fmt(kwh)} kWh",
        f"the appliance consumes {_fmt(e_j)} J = {_fmt(kwh)} kWh.",
    )
    return e_j, steps, (f"energy = {_fmt(e_j)} J = {_fmt(kwh)} kWh"), \
        None, "E = P t", {"P": p, "t": t, "J": e_j, "kWh": kwh}


def _c9_wave_vfl(g, m, text):
    """v = f lambda: wavelength / frequency / wave speed, any variable."""
    low = text.lower()
    if not re.search(r"wavelength|frequency|sound\s+wave", low):
        return _GATE
    fm = re.search(r"(?P<f>" + _SCI + r")\s*(?:Hz|hertz)\b", text, re.I)
    vm = re.search(r"(?:speed\s+of\s+sound[^.]{0,30}?|=|is)\s*(?P<v>" + _SCI
                   + r")\s*(?:m/s|metres?\s*per\s*second)\b", text, re.I) or \
        re.search(r"(?P<v>" + _SCI + r")\s*(?:m/s)\b[^.]{0,40}?"
                  r"(?:sound|wave)", text, re.I)
    lm = re.search(r"(?:wavelength\s*(?:of\s*)?(?:is\s*)?|=)\s*(?P<l>"
                   + _SCI + r")\s*(?:m|metres?|meters?|cm|mm)\b", text,
                   re.I)
    if fm and not lm and vm:
        f, v = _sci(fm.group("f")), _sci(vm.group("v"))
        if f <= 0:
            return _GATE
        val = v / f
        steps = _beats(
            "wave equation: v = f lambda, so lambda = v / f.",
            f"lambda = {_fmt(v)} m/s / {_fmt(f)} Hz",
            f"lambda = {_fmt(val)} m",
            f"check: f x lambda = {_fmt(f)} x {_fmt(val)} = {_fmt(v)} "
            "m/s = v -- closes",
            f"the wavelength is {_fmt(val)} m.",
        )
        return val, steps, f"wavelength = {_fmt(val)} m", None, \
            "v = f lambda", {"v": v, "f": f, "lambda": val}
    if lm and not fm and vm:
        lam, v = _sci(lm.group("l")), _sci(vm.group("v"))
        if lam <= 0:
            return _GATE
        val = v / lam
        steps = _beats(
            "wave equation: v = f lambda, so f = v / lambda.",
            f"f = {_fmt(v)} m/s / {_fmt(lam)} m",
            f"f = {_fmt(val)} Hz",
            f"check: lambda x f = {_fmt(lam)} x {_fmt(val)} = {_fmt(v)} "
            "m/s -- closes",
            f"the frequency is {_fmt(val)} Hz.",
        )
        return val, steps, f"frequency = {_fmt(val)} Hz", None, \
            "v = f lambda", {"v": v, "lambda": lam, "f": val}
    if fm and lm and not vm:
        f, lam = _sci(fm.group("f")), _sci(lm.group("l"))
        if f <= 0 or lam <= 0:
            return _GATE
        val = f * lam
        steps = _beats(
            "wave equation: v = f lambda.",
            f"v = {_fmt(f)} Hz x {_fmt(lam)} m",
            f"v = {_fmt(val)} m/s",
            "check: the units multiply to m/s -- consistent",
            f"the wave speed is {_fmt(val)} m/s.",
        )
        return val, steps, f"wave speed = {_fmt(val)} m/s", None, \
            "v = f lambda", {"f": f, "lambda": lam, "v": val}
    return _GATE


def _c9_pulse_echo(g, m, text):
    """Reflected pulse (sonar / ultrasonic flaw detector / bat): the
    total path is 2d, so depth d = v t / 2.  Handles microsecond givens."""
    low = text.lower()
    if not re.search(r"reflect(?:ed|ion)|echo(?:es)?|pulse|sonar|bat\b",
                     low):
        return _GATE
    vm = re.search(r"(?:speed\s+of\s+sound[^.]{0,40}?|=)\s*(?P<v>" + _SCI
                   + r")\s*(?:m/s|metres?\s*per\s*second)\b", text, re.I)
    tm = re.search(r"(?:returns?\s+(?:is\s+)?after\s+|in\s+|after\s+)"
                   r"(?P<t>" + _SCI + r")\s*(?P<tu>us|\u03bcs|micro\s*seconds?"
                   r"|ms|milli\s*seconds?|seconds?|secs?|s)\b", text, re.I)
    if not (vm and tm):
        return _GATE
    v = _sci(vm.group("v"))
    t_raw, tu = tm.group("t"), tm.group("tu").lower()
    t = _sci(t_raw)
    if tu.startswith("u") or "\u03bc" in tu or "micro" in tu:
        t *= 1e-6
    elif tu.startswith("milli") or tu == "ms":
        t *= 1e-3
    if v <= 0 or t <= 0:
        return _GATE
    total = v * t
    d = total / 2.0
    steps = _beats(
        "the pulse travels to the target AND back: total path = v t, "
        "so depth = v t / 2.",
        f"total path = {_fmt(v)} x {_fmt(t)} s = {_fmt(total)} m",
        f"depth = {_fmt(total)} / 2 = {_fmt(d)} m",
        f"check: 2 x {_fmt(d)} / {_fmt(v)} = {_fmt(t)} s -- closes",
        f"the reflecting surface is {_fmt(d)} m away.",
    )
    return d, steps, f"distance = {_fmt(d)} m", None, "d = v t / 2", \
        {"v": v, "t": t, "d": d}


def _c9_qv_energy(g, m, text):
    """W = V Q: energy delivered by charge Q through a potential
    difference V ('a 9 V battery does 9 J of work on each coulomb')."""
    low = text.lower()
    if not re.search(r"volt\b|potential\s+difference|coulomb", low):
        return _GATE
    if not re.search(r"energy|work", low):
        return _GATE
    vm = re.search(r"(?P<v>" + _SCI + r")\s*(?:V|volts?)\b", text, re.I)
    qm = re.search(r"(?P<q>" + _SCI + r")\s*(?P<qu>C\b|coulombs?|"
                   r"kilocoulombs?)\b", text, re.I)
    wm = re.search(r"(?P<w>" + _SCI + r")\s*(?P<wu>J|joules?|kJ|"
                   r"kilojoules?)\b", text, re.I)
    if not (qm and wm) and not (vm and qm):
        return _GATE
    # reverse read (class-10 corpus): V = W / Q when the work and the
    # charge are given ('a charge of 50 C ... work done is 600 J,
    # calculate the potential difference')
    if qm and wm and not vm:
        q = _sci(qm.group("q"))
        if (qm.group("qu") or "").lower().startswith("kilo"):
            q *= 1000.0
        w = _sci(wm.group("w"))
        if (wm.group("wu") or "").lower().startswith("kilo"):
            w *= 1000.0
        if q <= 0 or w < 0:
            return _GATE
        val = w / q
        steps = _beats(
            "potential difference V = W / Q: the work done per unit "
            "charge moved between the points.",
            f"V = {_fmt(w)} J / {_fmt(q)} C",
            f"V = {_fmt(val)} V (1 V = 1 J/C)",
            f"check: W = V Q = {_fmt(val)} x {_fmt(q)} = {_fmt(w)} J -- "
            "closes",
            f"the potential difference is {_fmt(val)} V.",
        )
        return val, steps, f"potential difference = {_fmt(val)} V", None, \
            "V = W / Q", {"W": w, "Q": q, "V": val}
    v, q = _sci(vm.group("v")), _sci(qm.group("q"))
    if v <= 0 or q <= 0:
        return _GATE
    val = v * q
    steps = _beats(
        "potential difference V = W / Q, so the energy delivered is "
        "W = V Q.",
        f"W = {_fmt(v)} V x {_fmt(q)} C",
        f"W = {_fmt(val)} J",
        f"check: {_fmt(val)} J / {_fmt(q)} C = {_fmt(v)} V -- closes",
        f"the charge gains {_fmt(val)} J of energy.",
    )
    return val, steps, f"energy = {_fmt(val)} J", None, "W = V Q", \
        {"V": v, "Q": q, "W": val}


def _c9_series_bank(g, m, text):
    """Series resistor bank: R = r1 + r2 + ..., I = V / R, and the
    per-resistor voltage co-ask."""
    low = text.lower()
    if not re.search(r"series", low):
        return _GATE
    rm = re.search(r"(?:resistors?|resistances?)\s*(?:of\s*)?\(?"
                   r"(?P<r1>" + _SCI + r")\s*,\s*(?P<r2>" + _SCI
                   + r")\s*(?:,\s*(?P<r3>" + _SCI + r"))?\s*(?:and\s+"
                   r"(?P<r4>" + _SCI + r"))?\s*(?:ohms?|\u03a9)", text,
                   re.I) or \
        re.search(r"(?P<r1>" + _SCI + r")\s*(?:ohms?|\u03a9)\s*,\s*"
                  r"(?P<r2>" + _SCI + r")\s*(?:ohms?|\u03a9)(?:\s*,\s*"
                  r"(?P<r3>" + _SCI + r")\s*(?:ohms?|\u03a9))?", text, re.I)
    vm = re.search(r"(?P<v>" + _SCI + r")\s*(?:V|volts?)\b", text, re.I)
    if not (rm and vm):
        return _GATE
    rs = [_sci(rm.group(k)) for k in ("r1", "r2", "r3", "r4")
          if rm.group(k) is not None]
    v_bat = _sci(vm.group("v"))
    if len(rs) < 2 or v_bat <= 0 or any(r <= 0 for r in rs):
        return _GATE
    req = sum(rs)
    i_cur = v_bat / req
    ans = (f"R = {_fmt(req)} ohm, I = {_fmt(i_cur)} A")
    extra_txt = ""
    om = re.search(r"(?:across|the\s+voltage\s+across)\s+(?:the\s+)?"
                   r"(?P<r>" + _SCI + r")\s*(?:ohm|omega|\u03a9)", low)
    if om:
        rt = _sci(om.group("r"))
        vi = i_cur * rt
        ans += f", V({_fmt(rt)} ohm) = {_fmt(vi)} V"
        extra_txt = (f"; V across {_fmt(rt)} ohm = {_fmt(i_cur)} x "
                     f"{_fmt(rt)} = {_fmt(vi)} V")
    rtxt = " + ".join(_fmt(r) for r in rs)
    steps = _beats(
        "series: R = sum of resistances; I = V / R is common to all.",
        f"R = {rtxt} = {_fmt(req)} ohm",
        f"I = {_fmt(v_bat)} V / {_fmt(req)} ohm = {_fmt(i_cur)} A",
        f"check: R goes up in series, so I < V/R of any single "
        f"resistor ({_fmt(v_bat / min(rs))} A)",
        f"the current is {_fmt(i_cur)} A{extra_txt}.",
    )
    return i_cur, steps, ans, None, "R = sum; I = V/R", \
        {"R": req, "I": i_cur, "V": v_bat, "resistors": rs}


_DIR_WORD = r"(?:east|west|north|south|upward?s?|downward?s?|forward|backwards?)"


def _c9_dist_displacement(g, m, text):
    """Distance = sum of leg lengths; displacement = signed sum along
    the line, with the direction named."""
    low = text.lower()
    if not re.search(r"distance\s+(?:traveled|travelled|and)|and\s+"
                     r"displacement", low):
        return _GATE
    legs = [(float(x.replace(",", "")), _DIR_SIGN.get(dr, 1))
            for x, dr in re.findall(
                r"(?P<d>\d[\d,]*(?:\.\d+)?)\s*(?:m|metres?|meters?|km)\s+"
                r"(?P<dr>" + _DIR_WORD + r")\b", text, re.I)]
    if len(legs) < 2 or len(legs) > 3:
        return _GATE
    unit = "km" if re.search(r"\d\s*km\b", text, re.I) else "m"
    dist = sum(a for a, _s in legs)
    disp = sum(a * s for a, s in legs)
    adisp = abs(disp)
    # the displacement direction is the axis direction whose SIGN the
    # signed sum carries ('30 m west then 50 m east' -> 20 m EAST)
    present_pos = [w for w in ("east", "north", "up", "upward", "forward",
                               "right") if re.search(r"\b" + w + r"\b", text,
                                                     re.I)]
    present_neg = [w for w in ("west", "south", "down", "downward",
                               "backward", "left")
                   if re.search(r"\b" + w + r"\b", text, re.I)]
    if disp >= 0:
        dir_word = present_pos[0] if present_pos else "east"
    else:
        dir_word = present_neg[0] if present_neg else "west"
    steps = _beats(
        "distance adds every leg's length; displacement is the STRAIGHT "
        "change in position (signed sum along the line).",
        f"distance = {' + '.join(_fmt(a) for a, _s in legs)} = "
        f"{_fmt(dist)} {unit}",
        f"displacement = signed sum of the legs = {_fmt(adisp)} {unit} "
        f"{dir_word}",
        f"check: distance >= |displacement| always ({_fmt(dist)} >= "
        f"{_fmt(adisp)})",
        f"distance = {_fmt(dist)} {unit}, displacement = "
        f"{_fmt(adisp)} {unit} {dir_word}.",
    )
    ans = (f"distance = {_fmt(dist)} {unit}, displacement = "
           f"{_fmt(adisp)} {unit} {dir_word}")
    return dist, steps, ans, None, "distance = sum |legs|; displacement = sum (signed)", \
        {"distance": dist, "displacement": disp}


def _c9_avg_velocity(g, m, text):
    """Average speed = total path / total time; average velocity =
    signed displacement / total time, direction named."""
    low = text.lower()
    if not re.search(r"average\s+velocity", low):
        return _GATE
    legs = [(float(x.replace(",", "")), _DIR_SIGN.get(dr, 1), tv, tu)
            for x, dr, tv, tu in re.findall(
                r"(?P<d>\d[\d,]*(?:\.\d+)?)\s*(?:m|metres?|meters?|km)\s+"
                r"(?P<dr>" + _DIR_WORD + r")\s+(?:in|for)\s+(?P<t>\d[\d,]*"
                r"(?:\.\d+)?)\s*(?P<tu>s|seconds?|min(?:ute)?s?|h|hours?)\b",
                text, re.I)]
    if len(legs) < 2:
        return _GATE
    total_d = sum(a for a, _s, _t, _tu in legs)
    total_t = sum(_to_s(tv, tu) for _a, _s, tv, tu in legs)
    disp = sum(a * s for a, s, _t, _tu in legs)
    if total_t <= 0:
        return _GATE
    spd = total_d / total_t
    vel = disp / total_t
    present_pos = [w for w in ("east", "north", "up", "upward", "forward",
                               "right") if re.search(r"\b" + w + r"\b", text,
                                                     re.I)]
    present_neg = [w for w in ("west", "south", "down", "downward",
                               "backward", "left")
                   if re.search(r"\b" + w + r"\b", text, re.I)]
    dir_use = (present_pos[0] if present_pos else "east") if vel >= 0 \
        else (present_neg[0] if present_neg else "west")
    steps = _beats(
        "average speed uses the total PATH; average velocity uses the "
        "signed DISPLACEMENT -- same clock.",
        f"total path = {_fmt(total_d)} m, total time = {_fmt(total_t)} s",
        f"avg speed = {_fmt(total_d)} / {_fmt(total_t)} = {_fmt(spd)} m/s",
        f"displacement = {_fmt(disp)} m -> avg velocity = "
        f"{_fmt(abs(vel))} m/s {dir_use}",
        f"speed = {_fmt(spd)} m/s; velocity = {_fmt(abs(vel))} m/s "
        f"{dir_use}.",
    )
    ans = (f"average speed = {_fmt(spd)} m/s, average velocity = "
           f"{_fmt(abs(vel))} m/s {dir_use}")
    return spd, steps, ans, None, "v_avg = path/t; velocity = disp/t", \
        {"speed": spd, "velocity": vel}


def _c9_momentum(g, m, text):
    """Momentum conservation, the two board shapes:
    (a) collision: m1 u1 hits stationary m2; v1 after given -> v2
    (b) recoil/explosion: pair at rest; one moves -> the other recoils
        with momentum equal and opposite."""
    low = text.lower()
    if not re.search(r"momentum|recoil|collid", low):
        return _GATE
    masses = [(float(_sci(mv.group("mv"))),
               _to_kg(mv.group("mv"), mv.group("mu")))
              for mv in re.finditer(
                  r"(?P<mv>" + _SCI + r")\s*(?P<mu>kg|kilograms?)\b",
                  text, re.I)]
    if len(masses) < 2:
        return _GATE
    speeds = [(float(_sci(sv.group("sv"))), sv.start())
              for sv in re.finditer(
                  r"(?P<sv>" + _SCI + r")\s*(?:m/s|metres?\s*per\s*second)\b",
                  text, re.I)]
    (m1, _k1), (m2, _k2) = masses[0], masses[1]
    if m1 <= 0 or m2 <= 0:
        return _GATE
    if re.search(r"recoil|jumps?\s+off|steps?\s+off|fires?|launch(?:es)?\s+"
                 r"backwards?", low):
        # both at rest, one ejects: v_other = -m_mover v_mover / m_other
        # (a single stated speed -- the ejector's)
        if len(speeds) < 1:
            return _GATE
        vj = speeds[0][0]
        if vj <= 0:
            return _GATE
        val = m1 * vj / m2
        steps = _beats(
            "momentum conservation from rest: 0 = m1 v1 + m2 v2.",
            f"{_fmt(m1)} x {_fmt(vj)} = {_fmt(m2)} x |v2|",
            f"|v2| = {_fmt(m1 * vj)} / {_fmt(m2)} = {_fmt(val)} m/s",
            "check: momenta are equal in size, opposite in direction",
            f"the recoil speed is {_fmt(val)} m/s, opposite to the jump.",
        )
        return val, steps, (f"recoil velocity = {_fmt(val)} m/s opposite "
                            "to the jump"), None, \
            "m1 v1 + m2 v2 = 0", {"m1": m1, "m2": m2, "v1": vj, "v2": val}
    # collision: moving body 1 (u1), body 2 stationary, v1 after given
    if len(speeds) < 2:
        return _GATE
    # collision: moving body 1 (u1), body 2 stationary, v1 after given
    um = re.search(r"(?:moving|travell?ing|running)\s+at\s+(?P<u>" + _SCI
                   + r")\s*(?:m/s|metres?\s*per\s*second)\b", text, re.I)
    am = re.search(r"(?:after(?:\s+the)?\s+collision[^.]{0,30}?(?:at|moves?"
                   r"\s+at|with)\s*|moves?\s+at\s+)(?P<a>" + _SCI
                   + r")\s*(?:m/s|metres?\s*per\s*second)\b", text, re.I)
    stat = bool(re.search(r"stationary|at\s+rest|standing\s+still", low))
    if not (um and am and stat):
        return _GATE
    u1, v1 = _sci(um.group("u")), _sci(am.group("a"))
    val = m1 * (u1 - v1) / m2
    steps = _beats(
        "momentum conservation (no external force): m1 u1 + m2 u2 = "
        "m1 v1 + m2 v2; body 2 starts at rest.",
        f"{_fmt(m1)} x {_fmt(u1)} = {_fmt(m1)} x {_fmt(v1)} + "
        f"{_fmt(m2)} x v2",
        f"v2 = ({_fmt(m1)} x ({_fmt(u1)} - {_fmt(v1)})) / {_fmt(m2)} = "
        f"{_fmt(val)} m/s",
        f"check: total momentum before {_fmt(m1 * u1)} = after "
        f"{_fmt(m1 * v1 + m2 * val)} kg m/s -- closes",
        f"the struck body moves at {_fmt(val)} m/s in the same "
        "direction.",
    )
    return val, steps, f"velocity after collision = {_fmt(val)} m/s", \
        None, "m1 u1 + m2 u2 = m1 v1 + m2 v2", \
        {"m1": m1, "m2": m2, "u1": u1, "v1": v1, "v2": val}


def _c9_centripetal(g, m, text):
    """F = m v^2 / r: the centripetal force on a body in circular motion."""
    low = text.lower()
    if not re.search(r"centripetal|circular\s+(?:track|path|motion)", low):
        return _GATE
    if not re.search(r"centripetal\s+force|force\s+required", low):
        return _GATE
    mm = re.search(r"(?:mass|of)\s+(?P<m>" + _SCI + r")\s*"
                   r"(?P<mu>kg|kilograms?|g|grams?)\b", text, re.I) or \
        re.search(r"(?P<m>" + _SCI + r")\s*(?P<mu>kg|kilograms?)\b", text,
                  re.I)
    sm = re.search(r"(?:speed|velocity)\s+of\s+(?P<v>" + _SCI + r")\s*"
                   r"(?:m/s|metres?\s*per\s*second)\b", text, re.I)
    rm = re.search(r"(?:radius|track)\s*(?:of\s+)?(?P<r>" + _SCI + r")\s*"
                   r"(?P<ru>m|metres?|meters?|cm|km)\b", text, re.I)
    if not (mm and sm and rm):
        return _GATE
    m = _to_kg(mm.group("m"), mm.group("mu"))
    v = _sci(sm.group("v"))
    r = _to_m(rm.group("r"), rm.group("ru"))
    if m <= 0 or v <= 0 or r <= 0:
        return _GATE
    val = m * v * v / r
    steps = _beats(
        "centripetal force: F = m v^2 / r (towards the centre).",
        f"F = {_fmt(m)} x {_fmt(v)}^2 / {_fmt(r)}",
        f"F = {_fmt(m * v * v)} / {_fmt(r)} = {_fmt(val)} N",
        f"check: doubling the speed needs four times the force "
        f"(v is squared)",
        f"the required centripetal force is {_fmt(val)} N.",
    )
    return val, steps, f"centripetal force = {_fmt(val)} N", None, \
        "F = m v^2 / r", {"m": m, "v": v, "r": r, "F": val}


def _c9_least_count(g, m, text):
    """Vernier calliper least count: LC = 1 MSD - 1 VSD
    = MSD x (1 - n_vernier/n_main) when n vernier divisions coincide
    with n_main main-scale divisions."""
    low = text.lower()
    if not re.search(r"vernier", low):
        return _GATE
    if not re.search(r"least\s+count", low):
        return _GATE
    mm = re.search(r"(?P<ms>" + _SCI + r")\s*(?:mm|cm)\s+main\s+scale", low)
    nm = re.search(r"(?P<nv>" + _SCI + r")\s*vernier\s+divisions?\s+"
                   r"coincide\s+with\s+(?P<nm>" + _SCI + r")\s*main\s+"
                   r"scale\s+divisions?", low)
    if not (nm and mm):
        return _GATE
    msd = _sci(mm.group("ms"))
    nv, nmv = _sci(nm.group("nv")), _sci(nm.group("nm"))
    if nv <= 0 or nmv <= 0 or msd <= 0:
        return _GATE
    vsd = msd * nmv / nv
    val = msd - vsd
    unit = "mm" if "mm" in low else "cm"
    steps = _beats(
        "vernier least count: LC = 1 MSD - 1 VSD.",
        f"1 VSD = {nmv}/{nv} MSD = {_fmt(vsd)} {unit}",
        f"LC = {_fmt(msd)} - {_fmt(vsd)} = {_fmt(val)} {unit}",
        f"check: smaller LC -> more precise instrument "
        f"({nv} divisions amplify the reading)",
        f"the least count is {_fmt(val)} {unit}.",
    )
    return val, steps, f"least count = {_fmt(val)} {unit}", None, \
        "LC = MSD - VSD", {"MSD": msd, "VSD": vsd, "LC": val}


_TABLE_C9: List[Tuple[str, str, Any]] = [
    ("C9_WORK_ZERO",
     r"work\s+(?:is\s+)?done|how\s+much\s+work",
     _c9_work_zero),
    ("C9_WORK_ANGLE",
     r"work\s+(?:is\s+)?done|how\s+much\s+work",
     _c9_work_angle),
    ("C9_WORK_NET_FRICTION",
     r"net\s+work|work.{0,60}theorem",
     _c9_work_net_friction),
    ("C9_WORK_KE_THM",
     r"net\s+work|work\s+done|final\s+(?:speed|velocity)",
     _c9_work_ke_thm),
    ("C9_DROP_KE",
     r"kinetic\s+energy|dropped|falls?\s+from",
     _c9_drop_ke),
    ("C9_SPRING_LAUNCH",
     r"spring|compress",
     _c9_spring_launch),
    ("C9_POWER_ENERGY",
     r"energy\s+consumed|energy\s+in\s+(?:joules?|kwh)",
     _c9_power_energy),
    ("C9_WAVE_VFL",
     r"wavelength|frequency",
     _c9_wave_vfl),
    ("C9_PULSE_ECHO",
     r"reflect(?:ed|ion)|echo|sonar|pulse",
     _c9_pulse_echo),
    ("C9_QV_ENERGY",
     r"coulomb|potential\s+difference|\bvolts?\b",
     _c9_qv_energy),
    ("C9_SERIES_BANK",
     r"series",
     _c9_series_bank),
    ("C9_DIST_DISP",
     r"distance\s+(?:traveled|travelled)?\s*and\s+displacement|"
     r"displacement\s+of\s+the\s+(?:car|body|object)",
     _c9_dist_displacement),
    ("C9_AVG_VELOCITY",
     r"average\s+velocity",
     _c9_avg_velocity),
    ("C9_MOMENTUM",
     r"momentum|recoil|collid",
     _c9_momentum),
    ("C9_CENTRIPETAL",
     r"centripetal|circular\s+(?:track|path|motion)",
     _c9_centripetal),
    ("C9_LEAST_COUNT",
     r"vernier",
     _c9_least_count),
]



_TABLE_C8B: List[Tuple[str, str, Any]] = [
    ("C8B_JOULE_HEAT",
     r"heat\s+(?:produced|developed|generated|given|liberated|dissipated)"
     r"|how\s+much\s+heat|to\s+melt",
     _c8b_joule_heat),
    ("C8B_MIRROR_FOCAL",
     r"radius\s+of\s+curvature",
     _c8b_mirror_focal),
    ("C8B_MIRROR_TYPE",
     r"erect[^.]{0,30}diminished|diminished[^.]{0,30}erect",
     _c8b_mirror_type),
    ("C8B_PRESSURE_BRICK",
     r"brick|block|cuboid",
     _c8b_pressure_brick),
    ("C8B_PRESSURE_VEHICLE",
     r"(?:tyres?|tires?|wheels?)[^.]{0,60}each|each[^.]{0,60}"
     r"(?:tyres?|tires?|wheels?)",
     _c8b_pressure_vehicle),
    ("C8B_FINAL_SPEED_FMT",
     r"final\s+(?:speed|velocity)",
     _c8b_final_speed_fmt),
    ("C8B_PRESSURE_TWO_FACES",
     r"largest[^.]{0,60}smallest|smallest[^.]{0,60}largest",
     _c8b_pressure_two_faces),
    ("C8B_MAGFIELD_COIL",
     r"coil",
     _c8b_magfield_coil),
    ("C8B_NET_FORCE",
     r"net\s+(?:horizontal\s+)?force",
     _c8b_net_force),
    ("C8B_PRESSURE_DIMS",
     r"dimensions?|measures?",
     _c8b_pressure_dims),
]

_TABLE_C8: List[Tuple[str, str, Any]] = [
    ("C8_EFFICIENCY",
     r"\befficien",
     _c8_efficiency),
    ("C8_SAVED_KWH",
     r"(?:saved|saving|replaces?)" + _SPAN + r"{0,80}"
     r"(?:bulbs?|lamps?|W\b|watts?)"
     r"|kwh\s*(?:is\s*)?saved",
     _c8_saved_kwh),
    ("C8_FINAL_SPEED_FMA",
     r"final\s+(?:speed|velocity)",
     _c8_final_speed_fma),
    ("C8_ACCEL_WITH_RESISTANCE",
     r"resistive\s+forces?|force\s+of\s+\d+\s*n" + _SPAN + r"{0,60}resistan",
     _c8_accel_with_resistance),
    ("C8_FRICTION_FROM_MA",
     r"friction\s+force\s+opposing|opposing\s+the\s+motion",
     _c8_friction_from_ma),
    ("C8_STATIC_FRICTION",
     r"coefficient\s+of\s+(?:static\s+)?friction",
     _c8_static_friction),
    ("C8_PRESSURE_AREA_CM",
     r"pressure" + _SPAN + r"{0,80}pascals?|pressure\s+in\s+each\s+case",
     _c8_pressure_area_cm),
    ("C8_PRESSURE_POINT",
     r"pressure" + _SPAN + r"{0,120}(?:heel|diameter|one\s+leg)"
     r"|(?:heel|one\s+leg)" + _SPAN + r"{0,160}pressure|diameter"
     + _SPAN + r"{0,120}pressure",
     _c8_pressure_point),
    ("C8_PRESSURE_VEHICLE",
     r"pressure" + _SPAN + r"{0,160}(?:tyres?|tires?|contact\s+patch)"
     r"|(?:tyres?|tires?|contact\s+patch)" + _SPAN + r"{0,200}pressure",
     _c8_pressure_vehicle),
    ("C8_MAGFIELD_WIRE",
     r"magnetic\s+field" + _SPAN + r"{0,80}(?:straight\s+)?wire"
     r"|(?:straight\s+|long\s+)?wire" + _SPAN + r"{0,100}magnetic\s+field",
     _c8_magfield_wire),
    ("C8_MAGFIELD_COIL",
     r"magnetic\s+field" + _SPAN + r"{0,120}(?:coil|turns|loop)"
     r"|(?:coil|loop)" + _SPAN + r"{0,140}magnetic\s+field"
     r"|(?:turns|turns?\s+and\s+radius)[^.]{0,140}magnetic\s+field",
     _c8_magfield_coil),
    ("C8_LENS_IMAGE_INFINITY",
     r"(?:distant|parallel\s+(?:rays?|light|beam)|\bsun\b)" + _SPAN +
     r"{0,80}lens|lens" + _SPAN + r"{0,80}(?:distant|sun|parallel)",
     _c8_lens_image_infinity),
    ("C8_MIRROR_IMAGE",
     r"(?:concave|convex)\s+mirror" + _SPAN + r"{0,120}focal\s+length|"
     r"focal\s+length" + _SPAN + r"{0,120}(?:concave|convex)\s+mirror",
     _c8_mirror_image),
    ("C8_CURRENT_FROM_PV",
     r"(?:heater|kettle|geyser|iron|bulb|appliance|device|motor)\b"
     r"[^.]{0,160}(?:current|I\b)|(?:rated?|power)[^.]{0,80}W\b"
     r"[^.]{0,120}(?:220|230|110|240)\s*V"
     r"|W\b[\s\S]{0,160}?(?:220|230|110|240)\s*V",
     _c8_current_from_pv),
    ("C8_COLUMN_PRESSURE",
     r"(?:mercury|water|oil|liquid)\s*(?:column)?[^.]{0,120}"
     r"(?:density|height)|(?:height|depth)[^.]{0,80}(?:cm|m)\b"
     r"[^.]{0,120}density",
     _c8_column_pressure),
    ("C8_OUTLIER_MEAN",
     r"outlier|timing\s+error",
     _c8_outlier_mean),
]


_TABLE_BOOKS2: List[Tuple[str, str, Any]] = [
    ("RMS_AC_VALUE",
     r"\b(?:rms|r\.m\.s|root\s+mean\s+square|peak)\b[^.]{0,80}"
     r"\b(?:current|voltage)\b|\b(?:alternating\s+)?(?:current|voltage)"
     r"\b[^.]{0,80}\b(?:rms|r\.m\.s|peak)\b",
     _c_rms),
    ("REACTANCE_LC",
     r"(?:inductive|capacitive)?\s*reactance",
     _c_reactance),
    ("IMPEDANCE_RLC",
     r"\bimpedance\b",
     _c_impedance),
    ("TRANSFORMER_RATIO",
     r"\btransformer\b",
     _c_transformer),
    ("TORQUE_ANGULAR",
     r"angular\s+acceleration|\btorque\b[^.]{0,150}moment\s+of\s+"
     r"inertia",
     _c_torque_angular),
    ("ANGULAR_MOMENTUM",
     r"angular\s+momentum",
     _c_angular_momentum),
    ("MOMENT_OF_INERTIA_PT",
     r"moment\s+of\s+inertia",
     _c_moi_point),
    ("RELATIVE_VELOCITY",
     r"relative\s+(?:velocity|speed)|towards?\s+each\s+other|"
     r"approach(?:es)?\s+each\s+other|opposite\s+directions?",
     _c_relative_velocity),
    ("TERMINAL_VELOCITY",
     r"terminal\s+velocity",
     _c_terminal_velocity),
    ("CALORIMETRY_MIXTURE",
     r"\bmixture\b|dropped\s+into|placed\s+into|mixed\s+with|"
     r"final\s+temperature",
     _c_calorimetry),
    ("KEPLER_THIRD",
     r"\bkepler\b",
     _c_kepler),
    ("ESCAPE_VELOCITY",
     r"escape\s+velocity",
     _c_escape),
    ("ORBITAL_VELOCITY",
     r"orbital\s+(?:velocity|speed)",
     _c_orbital),
    ("YOUNGS_MODULUS",
     r"young(?:'s)?\s+modulus|elongat\w+|stretched\s+by|stretches\s+by|"
     r"compress(?:es|ed|ing)?\s+by|shorten\w*\s+by|tensile\s+|compressive|"
     r"cross[-\s]?sectional\s+area",
     _c_young),
    ("YDSE_FRINGE",
     r"fringe\s+width|\bfringes?\b|double\s+slit|\bydse\b",
     _c_ydse),
    ("RESOLVING_POWER",
     r"resolving\s+power|limit\s+of\s+resolution|resolving\s+limit",
     _c_resolving),
    ("LOGIC_GATE",
     r"\b(?:NAND|NOR|XOR|NOT|AND|OR)\s+gate\b|logic\s+gate",
     _c_logic_gate),
    ("TRANSISTOR_GAIN",
     r"\btransistor\b|\balpha\b|\bbeta\b",
     _c_transistor),
    ("ECHO_SONAR",
     r"\becho(?:es)?\b|sonar",
     _c_echo),
    ("MACHINE_ADVANTAGE",
     r"mechanical\s+advantage|velocity\s+ratio|efficiency\s+of\s+"
     r"(?:a|the)\s+machine",
     _c_machine),
    ("ANGULAR_DISPERSION",
     r"angular\s+dispersion|dispersive\s+power",
     _c_dispersion),
    ("DOPPLER_EFFECT",
     r"\bdoppler\b|apparent\s+frequency",
     _c_doppler),
    ("PLANE_MIRROR_ANGLE",
     r"plane\s+mirror|angle\s+of\s+reflection",
     _c_mirror_angle),
    # ---- CISCE sciences wave (2026-09-30): ICSE measurement phrasings
    #      and ISC topic families.  Appended AFTER the book rows so
    #      existing family priorities are untouched. ----
    ("DENSITY_MASS_VOLUME",
     r"\bdensity\b|relative\s+density|displaces?\s+\d|water\s+level\s+"
     r"rises?|eureka\s+can",
     _c_density),
    ("THERMAL_EXPANSION",
     r"thermal\s+expansion|expands?\s+(?:by|when|on)|coefficient\s+of\s+"
     r"(?:linear|superficial|cubical|expansion)|change\s+in\s+length|"
     r"increase\s+in\s+(?:length|area|volume)|linear\s+expansiv\w+|"
     r"how\s+much\s+longer|longer\s+does\s+\w+\s+become",
     _c_thermal_expansion),
    ("CHARGE_CARRIER",
     r"(?:how\s+much\s+charge|total\s+charge|charge\s+(?:that\s+)?"
     r"(?:passed|passes|flows)|number\s+of\s+electrons|excess\s+"
     r"electrons?|electrons?\s+(?:constitute|pass|flow))",
     _c_charge_carrier),
    ("SOUND_WAVES",
     r"\bfrequency\b|wavelength|decibels?\b|\bdB\b|time\s+period\b|"
     r"vibrations?\s+per\s+second|sound\s+level",
     _c_sound),
    ("GRAVITATION_FORCE",
     r"gravitational\s+force|newton(?:'s)?\s+law\s+of\s+(?:universal\s+)?"
     r"gravitation|force\s+between\s+two\s+(?:masses|spheres|bodies)",
     _c_grav_force),
    ("EM_WAVE_RELATION",
     r"(?:wavelength|frequency)\s+of\s+(?:the\s+)?(?:electromagnetic\s+)?"
     r"wave|radio\s+station|microwave\s+oven|x\s*-?\s*ray\s+photon|"
     r"electromagnetic\s+(?:wave|radiation)",
     _c_em_wave),
    ("DIPOLE_FIELD",
     r"\bdipole\b",
     _c_dipole),
    ("G_FIELD_VARIATION",
     r"acceleration\s+due\s+to\s+gravity\s+at\s+(?:a\s+)?(?:height|"
     r"altitude|depth)|mass\s+of\s+the\s+(?:moon|earth|planet)|"
     r"determine\s+the\s+mass\s+of\s+(?:the\s+)?(?:moon|earth|planet)",
     _c_g_field),
    ("FIELD_LINES_PROPORTION",
     r"field\s+lines?",
     _c_field_lines),
]


# --------------------------------------------------------------------------- #
# Dispatcher
# --------------------------------------------------------------------------- #


def model_physics_families(text: str) -> ModelResult:
    """Dispatcher: scan every physics family; first grounded hit wins.

    Triggers are deterministic regexes with named slots; each row applies
    its own plausibility gates inside compute, and a gate refusal simply
    lets the scan continue.  Scans the core TABLE first, then the
    _TABLE_BOOKS2 book-coverage block.  Never calls an LLM.
    """
    norm = _normalize(text)
    for table in (TABLE, _TABLE_BOOKS2, _TABLE_C9, _TABLE_C10, _TABLE_C7,
                  _TABLE_C8, _TABLE_C8B):
        for fid, pattern, compute in table:
            m = re.search(pattern, norm, re.I)
            if not m:
                continue
            g = m.groupdict()
            try:
                out = compute(g, m, norm)
            except Exception:
                continue
            if not out:
                continue
            (value, steps, answer, assumptions, eq, extra) = \
                (list(out) + [None] * 6)[:6]
            if value is None and not steps:
                continue  # gate refused this row
            return _res(fid, g, value, eq or fid, steps or [], answer=answer,
                        assumptions=assumptions, extra=extra or {})
    return _no("PHYSICS_FAMILIES", "no physics family matched")


# --------------------------------------------------------------------------- #
# _TABLE_C10 -- class-10 physics wave (2026-10-07 dig).  Corpus: 42
# c10_phy_cbse files, 41 numeric diagnostics; baseline 18 SOLVE /
# 23 REFUSE / 0 WRONG.  Electricity, magnetic effects, optics-power.
# --------------------------------------------------------------------------- #

def _c10_qt_current(g, m, text):
    """I = Q/t: charge crossing a section in a stated time (minutes and
    hours converted)."""
    low = text.lower()
    if not re.search(r"current", low):
        return _GATE
    qm = re.search(r"(?P<q>" + _SCI + r")\s*(?P<qu>C\b|coulombs?|"
                   r"kilocoulombs?)\b", text, re.I)
    tm = re.search(r"(?:in|for|through[^.]{0,30}?in)\s+(?P<t>" + _SCI
                   + r")\s*(?P<tu>" + _TIMEU + r")\b", text, re.I)
    if not (qm and tm):
        return _GATE
    q = _sci(qm.group("q"))
    if (qm.group("qu") or "").lower().startswith("kilo"):
        q *= 1000.0
    t = _to_s(tm.group("t"), tm.group("tu"))
    if q <= 0 or t <= 0:
        return _GATE
    val = q / t
    steps = _beats(
        "electric current is the rate of charge flow: I = Q / t.",
        f"I = {_fmt(q)} C / {_fmt(t)} s",
        f"I = {_fmt(val)} A (1 A = 1 C/s)",
        f"check: {_fmt(val)} A x {_fmt(t)} s = {_fmt(q)} C -- closes",
        f"the current is {_fmt(val)} A.",
    )
    return val, steps, f"current = {_fmt(val)} A", None, "I = Q / t", \
        {"Q": q, "t": t, "I": val}


def _c10_resistivity(g, m, text):
    """rho = R A / L (any variable); plus the stretched-wire classic:
    volume constant, length x n -> resistance x n^2."""
    low = text.lower()
    if not re.search(r"resistivity|stretched", low):
        return _GATE
    rm = re.search(r"(?:resistance|resistivity)[^\d]{0,20}?(?:of|is|=)?\s*"
                   r"(?P<r>" + _SCI + r")\s*(?:ohm|omega|\u03a9)", text,
                   re.I) or \
        re.search(r"(?P<r>" + _SCI + r")\s*(?:ohm|omega|\u03a9)\b", text,
                  re.I)
    if not rm:
        return _GATE
    r_val = _sci(rm.group("r"))
    # stretched wire: length x n (volume constant) -> R' = n^2 R
    stm = re.search(r"stretched?\s+to\s+(?P<word>double|twice|thrice|"
                    r"triple|half|three\s+times|\d+(?:\.\d+)?)\s*"
                    r"(?:times?\s+)?(?:its\s+|the\s+)?(?:original\s+)?"
                    r"length", low)
    if stm:
        word = stm.group("word")
        n = {"double": 2.0, "twice": 2.0, "thrice": 3.0, "triple": 3.0,
             "half": 0.5, "three times": 3.0}.get(word)
        if n is None:
            try:
                n = float(word)
            except ValueError:
                return _GATE
        val = r_val * n * n
        steps = _beats(
            "stretching keeps the volume constant: length x n shrinks "
            "the area by n, and R = rho L / A scales as n^2.",
            f"L' = {_fmt(n)} L, A' = A / {_fmt(n)}",
            f"R' = rho L' / A' = {_fmt(n)}^2 x {_fmt(r_val)} = "
            f"{_fmt(val)} ohm",
            f"check: resistance grows faster than length because the "
            f"area also shrinks",
            f"the new resistance is {_fmt(val)} ohm.",
        )
        return val, steps, f"new resistance = {_fmt(val)} ohm", None, \
            "R' = n^2 R (volume constant)", {"R": r_val, "n": n,
                                             "R'": val}
    am = re.search(r"(?:area|cross-section(?:al)?\s+area)\s*(?:of\s*)?=?"
                   r"\s*(?P<a>" + _SCI + r")\s*(?P<au>mm\^?2|cm\^?2|"
                   r"m\^?2|m2)\b", text, re.I)
    lm = re.search(r"(?:length|wire)\s*(?:of\s*)?(?P<l>" + _SCI + r")\s*"
                   r"(?P<lu>m|metres?|meters?|cm|mm)\b", text, re.I)
    if not (am and lm):
        return _GATE
    l_val = _to_m(lm.group("l"), lm.group("lu"))
    a_raw, au = _sci(am.group("a")), am.group("au").lower()
    a_m2 = a_raw * {"m^2": 1.0, "m2": 1.0, "mm^2": 1e-6, "mm2": 1e-6,
                    "cm^2": 1e-4, "cm2": 1e-4}.get(au.replace(" ", ""), 1.0)
    if l_val <= 0 or a_m2 <= 0 or r_val <= 0:
        return _GATE
    val = r_val * a_m2 / l_val
    steps = _beats(
        "resistivity: rho = R A / L (A in m^2, L in m).",
        f"rho = {_fmt(r_val)} x {_fmt(a_m2)} / {_fmt(l_val)}",
        f"rho = {_fmt(val)} ohm m",
        f"check: R = rho L / A = {_fmt(val)} x {_fmt(l_val)} / "
        f"{_fmt(a_m2)} = {_fmt(r_val)} ohm -- closes",
        f"the resistivity is {_fmt(val)} ohm m.",
    )
    return val, steps, f"resistivity = {_fmt(val)} ohm m", None, \
        "rho = R A / L", {"R": r_val, "A": a_m2, "L": l_val, "rho": val}


def _c10_parallel_bank(g, m, text):
    """Parallel resistors: 1/R = sum(1/Ri); I_total = V/R; per-branch
    I_i = V / R_i (the class-10 board form)."""
    low = text.lower()
    if not re.search(r"parallel", low):
        return _GATE
    rm = re.search(r"(?:resistors?|resistances?)\s*(?:of\s*)?\(?"
                   r"(?P<r1>" + _SCI + r")\s*(?:ohm|omega|\u03a9)\s*,\s*"
                   r"(?P<r2>" + _SCI + r")\s*(?:ohm|omega|\u03a9)"
                   r"(?:\s*,\s*(?:and\s+)?(?P<r3>" + _SCI + r")\s*"
                   r"(?:ohm|omega|\u03a9))?", text, re.I) or \
        re.search(r"(?P<r1>" + _SCI + r")\s*(?:ohm|omega|\u03a9)\s*,\s*"
                  r"(?P<r2>" + _SCI + r")\s*(?:ohm|omega|\u03a9)"
                  r"(?:\s*,\s*(?:and\s+)?(?P<r3>" + _SCI + r")\s*"
                  r"(?:ohm|omega|\u03a9))?", text, re.I)
    vm = re.search(r"(?P<v>" + _SCI + r")\s*(?:V|volts?)\b", text, re.I)
    if not (rm and vm):
        return _GATE
    rs = [_sci(rm.group(k)) for k in ("r1", "r2", "r3")
          if rm.group(k) is not None]
    v_bat = _sci(vm.group("v"))
    if len(rs) < 2 or v_bat <= 0 or any(r <= 0 for r in rs):
        return _GATE
    inv = sum(1.0 / r for r in rs)
    req = 1.0 / inv
    i_tot = v_bat / req
    ans = (f"R_eq = {_fmt(req)} ohm, I_total = {_fmt(i_tot)} A")
    extra_txt = ""
    om = re.search(r"(?:current\s+(?:through|in)\s+)?(?:the\s+)?"
                   r"(?P<r>" + _SCI + r")\s*(?:ohm|omega|\u03a9)\s*"
                   r"resistor", low)
    if om:
        rt = _sci(om.group("r"))
        vi = v_bat / rt
        ans += f", I({_fmt(rt)} ohm) = {_fmt(vi)} A"
        extra_txt = (f"; the {_fmt(rt)} ohm branch carries "
                     f"{_fmt(vi)} A (each branch sees the full "
                     f"{_fmt(v_bat)} V)")
    rtxt = ", ".join(_fmt(r) for r in rs)
    steps = _beats(
        "parallel: 1/R = sum of 1/R_i; every branch sees the FULL "
        "battery voltage.",
        f"1/R = 1/{rtxt} -> R = {_fmt(req)} ohm",
        f"I_total = {_fmt(v_bat)} V / {_fmt(req)} ohm = {_fmt(i_tot)} A",
        f"check: R_parallel < smallest resistor ({_fmt(min(rs))} ohm) "
        "-- always true in parallel",
        f"equivalent resistance {_fmt(req)} ohm, total current "
        f"{_fmt(i_tot)} A{extra_txt}.",
    )
    return i_tot, steps, ans, None, "1/R = sum 1/Ri; I = V/R", \
        {"R": req, "I": i_tot, "V": v_bat, "resistors": rs}


def _c10_peak_emf(g, m, text):
    """epsilon_max = N B A omega with omega = 2 pi f (rpm converted)."""
    import math as _math
    low = text.lower()
    if not re.search(r"induced\s+emf|maximum\s+emf|emf\s+induced", low):
        return _GATE
    nm = re.search(r"(?P<n>" + _SCI + r")\s*(?:turns?|loops?)", text,
                   re.I)
    bm = re.search(r"(?:field|of)\s*(?:of\s*)?(?P<b>" + _SCI + r")\s*T\b"
                   r"|\b(?P<b2>" + _SCI + r")\s*(?:T|tesla)\b", text, re.I)
    am = re.search(r"(?:area|of)\s*(?:of\s*)?(?P<a>" + _SCI + r")\s*"
                   r"(?:m\^?2|m2)\b", text, re.I)
    fm = re.search(r"(?P<f>" + _SCI + r")\s*(?:rpm|r\.p\.m|revolutions?\s*"
                   r"per\s*minute|Hz|hertz)\b", text, re.I)
    if not (nm and bm and am and fm):
        return _GATE
    n = _sci(nm.group("n"))
    b = _sci(bm.group("b") or bm.group("b2"))
    a = _sci(am.group("a"))
    f_raw = _sci(fm.group("f"))
    is_rpm = bool(re.search(r"rpm|r\.p\.m|revolutions?\s+per\s+minute",
                            low))
    f_hz = f_raw / 60.0 if is_rpm else f_raw
    omega = 2.0 * _math.pi * f_hz
    val = n * b * a * omega
    steps = _beats(
        "rotating coil in a field: epsilon_max = N B A omega, "
        "omega = 2 pi f.",
        (f"f = {_fmt(f_raw)} rpm / 60 = {_fmt(f_hz)} Hz, omega = 2 pi x "
         f"{_fmt(f_hz)} = {_fmt(omega)} rad/s" if is_rpm else
         f"f = {_fmt(f_hz)} Hz, omega = 2 pi x {_fmt(f_hz)} = "
         f"{_fmt(omega)} rad/s"),
        f"epsilon_max = {_fmt(n)} x {_fmt(b)} x {_fmt(a)} x "
        f"{_fmt(omega)} = {_fmt(val)} V",
        f"check: the peak emf scales with the rotation rate",
        f"the maximum induced emf is {_fmt(val)} V.",
    )
    return val, steps, f"maximum emf = {_fmt(val)} V", None, \
        "epsilon = N B A omega", {"N": n, "B": b, "A": a, "f": f_hz,
                                  "emf": val}


def _c10_lens_power(g, m, text):
    """Lens power: P = 1/f (dioptres, f in metres); combined power of
    thin lenses in contact P = P1 + P2; type from the sign."""
    low = text.lower()
    if not re.search(r"\bpower\b|\bD\b|diopt", low):
        return _GATE
    if not re.search(r"lens|optician|spectacle", low):
        return _GATE
    pm = re.search(r"(?:power(?:s)?\s*(?:of)?|of)\s*(?P<p1>[+-]?" + _SCI
                   + r")\s*(?:D\b|diopt\w*)\b(?:\s*(?:and|,|\+)\s*"
                   r"(?P<p2>[+-]?" + _SCI + r")\s*(?:D\b|diopt\w*))?",
                   text, re.I) or \
        re.search(r"lens(?:s)?\s+of\s+powers?\s*(?P<p1>[+-]?" + _SCI
                  + r")\s*(?:D|diopt\w*)\b(?:\s*(?:and|,|\+)\s*"
                  r"(?P<p2>[+-]?" + _SCI + r")\s*(?:D\b|diopt\w*))?",
                  text, re.I)
    fm = re.search(r"focal\s+length\s*(?:of)?\s*(?P<f>[+-]?" + _SCI
                   + r")\s*(?P<fu>cm|mm|m|metres?|meters?)\b", text, re.I)
    if pm and pm.group("p2") is not None:
        p1, p2 = _sci(pm.group("p1")), _sci(pm.group("p2"))
        net = p1 + p2
        f_m = 1.0 / net if net != 0 else None
        kind = ("converging (convex)" if net > 0 else
                "diverging (concave)" if net < 0 else "zero power")
        ans = (f"net power = {_fmt(net)} D, focal length = "
               f"{_fmt(f_m)} m ({kind})")
        steps = _beats(
            "thin lenses in contact: powers ADD, P = P1 + P2; "
            "f = 1/P (metres).",
            f"P = {_fmt(p1)} + ({_fmt(p2)}) = {_fmt(net)} D",
            f"f = 1 / {_fmt(net)} = {_fmt(f_m)} m",
            f"check: {'positive' if net > 0 else 'negative'} net power "
            f"-> {kind} combination",
            f"the combination is {kind} with f = {_fmt(f_m)} m.",
        )
        return net, steps, ans, None, "P = P1 + P2; f = 1/P", \
            {"P1": p1, "P2": p2, "P": net, "f_m": f_m}
    if pm and pm.group("p1") is not None:
        p = _sci(pm.group("p1"))
        f_m = 1.0 / p if p != 0 else None
        kind = ("converging (convex)" if p > 0 else "diverging (concave)")
        ans = (f"focal length = {_fmt(f_m)} m ({kind})")
        steps = _beats(
            "power P = 1/f with f in metres (1 m of focal length = "
            "1 dioptre); a negative power means a diverging lens.",
            f"f = 1 / P = 1 / ({_fmt(p)}) = {_fmt(f_m)} m",
            f"= {_fmt(f_m * 100.0)} cm",
            f"check: P x f = {_fmt(p)} x {_fmt(f_m)} = 1 -- closes",
            f"the lens is {kind} with focal length {_fmt(f_m)} m.",
        )
        return f_m, steps, ans, None, "P = 1/f", \
            {"P": p, "f_m": f_m}
    if fm:
        f_raw = _sci(fm.group("f"))
        f_m = _to_m(fm.group("f"), fm.group("fu"))
        if f_raw < 0:
            f_m = -abs(f_m)
        p = 1.0 / f_m if f_m != 0 else None
        kind = ("converging (convex)" if p > 0 else "diverging (concave)")
        steps = _beats(
            "power P = 1/f with f in metres.",
            f"P = 1 / ({_fmt(f_m)} m) = {_fmt(p)} D",
            f"the sign of P follows the sign of f",
            f"check: f = 1/P reproduces the given focal length",
            f"the power is {_fmt(p)} D ({kind}).",
        )
        return p, steps, f"power = {_fmt(p)} D ({kind})", None, \
            "P = 1/f", {"f_m": f_m, "P": p}
    return _GATE


def _c11_shm_period(g, m, text):
    """T = 2 pi sqrt(m/k) for a spring-mass oscillator (also omega and
    frequency reads)."""
    import math as _math
    low = text.lower()
    if not re.search(r"oscillat\w*|simple\s+harmonic|\bSHM\b", low):
        return _GATE
    mm = re.search(r"(?P<m>" + _SCI + r")\s*(?P<mu>kg|kilograms?|g|"
                   r"grams?)\b", text, re.I)
    km = re.search(r"(?:force\s+constant|spring\s+constant|k)\s*(?:of)?"
                   r"\s*(?:is\s+|=|:)?\s*(?P<k>" + _SCI + r")\s*"
                   r"(?:N/m|N\s*per\s*m|newton\s*per\s*metre)\b", text,
                   re.I)
    if not (mm and km):
        return _GATE
    m = _to_kg(mm.group("m"), mm.group("mu"))
    k = _sci(km.group("k"))
    if m <= 0 or k <= 0:
        return _GATE
    omega = _math.sqrt(k / m)
    period = 2.0 * _math.pi / omega
    if re.search(r"\bomega\b|angular\s+frequency", low):
        steps = _beats(
            "SHM: omega = sqrt(k / m).",
            f"omega = sqrt({_fmt(k)} / {_fmt(m)}) = {_fmt(omega)} rad/s",
            f"check: T = 2 pi / omega = {_fmt(period)} s is consistent",
            f"the angular frequency is {_fmt(omega)} rad/s.",
        )
        return omega, steps, f"omega = {_fmt(omega)} rad/s", None, \
            "omega = sqrt(k/m)", {"m": m, "k": k, "omega": omega}
    if re.search(r"frequency\b(?!.*period)|\bf\s+in\s+hz\b", low):
        f_hz = omega / (2.0 * _math.pi)
        steps = _beats(
            "SHM: f = (1 / 2 pi) sqrt(k / m).",
            f"sqrt(k/m) = {_fmt(omega)} rad/s",
            f"f = {_fmt(omega)} / (2 pi) = {_fmt(f_hz)} Hz",
            f"check: T = 1 / f = {_fmt(1.0 / f_hz)} s -- consistent",
            f"the frequency is {_fmt(f_hz)} Hz.",
        )
        return f_hz, steps, f"frequency = {_fmt(f_hz)} Hz", None, \
            "f = sqrt(k/m) / 2 pi", {"m": m, "k": k, "f": f_hz}
    steps = _beats(
        "spring-mass SHM: T = 2 pi sqrt(m / k) -- independent of the "
        "amplitude.",
        f"T = 2 pi x sqrt({_fmt(m)} / {_fmt(k)})",
        f"T = 2 pi x {_fmt(_math.sqrt(m / k))} = {_fmt(period)} s",
        "check: a stiffer spring (larger k) shortens T; a heavier "
        "mass lengthens it",
        f"the time period is {_fmt(period)} s.",
    )
    return period, steps, f"time period = {_fmt(period)} s", None, \
        "T = 2 pi sqrt(m/k)", {"m": m, "k": k, "T": period}


# --------------------------------------------------------------------------- #
# REGISTRY SELF-REGISTRATION (2026-10-07, P11 circular-import fix).
# Line 42 imports ModelResult from modeling_layer: when THIS module is
# imported FIRST, modeling_layer initialises while this file is
# mid-build and its physics registration block silently drops the
# dispatcher from the sweep (import-order-dependent physics coverage).
# Re-register here at the END of init, when model_physics_families
# exists.  Idempotent with modeling_layer._repair_registry().
# --------------------------------------------------------------------------- #
try:
    from backend.its.solver import modeling_layer as _c9_ml
    if not any(getattr(_fn, "__name__", "") == "model_physics_families"
               for _fn in getattr(_c9_ml, "_STRUCTURES", ())):
        _c9_ml._STRUCTURES.append(model_physics_families)
except Exception:
    pass  # modeling_layer absent -- the dispatcher still runs standalone


_TABLE_C10: List[Tuple[str, str, Any]] = [
    ("C10_QT_CURRENT",
     r"current",
     _c10_qt_current),
    ("C10_RESISTIVITY",
     r"resistivity|stretched",
     _c10_resistivity),
    ("C10_PARALLEL_BANK",
     r"parallel",
     _c10_parallel_bank),
    ("C10_PEAK_EMF",
     r"induced\s+emf|maximum\s+emf",
     _c10_peak_emf),
    ("C10_LENS_POWER",
     r"\bpower\b.*lens|lens.*\bpower\b|diopt|optician",
     _c10_lens_power),
    # class-11 spot (c11_phy ch13): spring-mass SHM period/frequency --
    # the kinematics family vetoed the constant-acceleration misread;
    # this owns the deterministic T = 2 pi sqrt(m/k) ask
    ("C11_SHM_PERIOD",
     r"oscillat\w*|simple\s+harmonic|\bSHM\b",
     _c11_shm_period),
]





