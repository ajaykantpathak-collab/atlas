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
    ul = u.strip().lower()
    if ul.startswith("h"):
        return v * 3600.0
    if ul.startswith("mi") or ul.startswith("min"):
        return v * 60.0
    return v


def _to_kg(n: str, u: str) -> float:
    v = _sci(n)
    ul = u.strip().lower()
    if ul.startswith("ton"):
        return v * 1000.0
    if ul == "g" or ul.startswith("gram"):
        return v * 0.001
    return v


def _to_ms(n: str, u: str) -> float:
    v = _sci(n)
    if "km" in u.lower():
        return v * 1000.0 / 3600.0
    return v


def _to_acc(n: str, u: str) -> float:
    v = _sci(n)
    if u.strip().lower().startswith("cm"):
        return v * 0.01
    return v


def _to_n(n: str, u: str) -> float:
    v = _sci(n)
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


def _gval(text: str) -> float:
    """g from the text ("g = 10", "take g as 9.8"); moon 1.6; else 9.8."""
    m = re.search(r"\bg\s*(?:=|as|:)\s*(" + _SCI + r")"
                  r"(?:\s*m\s*/\s*s\s*\^?\s*2)?", text, re.I)
    if m:
        try:
            return _sci(m.group(1))
        except ValueError:
            pass
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
    r"(?:covers?|travels?|moves?|travelled|traveled)\s+(?:a\s+)?"
    r"(?:total\s+)?(?:distance\s+of\s+|displacement\s+of\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    r"(?:stopping|braking)\s+distance\s+(?:of\s+|is\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    r"(?:max(?:imum)?\s+)?(?:height|depth)\s+(?:of\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
    r"(?:dropped|released|falls?|thrown?|jumps?|dives?)\s+"
    r"(?:down\s+)?(?:from\s+(?:a\s+)?(?:height|depth)\s+of\s+|from\s+)?"
    r"(?P<n>" + _SCI + r")\s*(?P<u>" + _DISTU + r")\b",
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
            r"dropped|released|falls?\s+from\s+rest)\b", text, re.I):
        d["u"] = 0.0
        notes.append("u = 0 (starts from rest / dropped)")

    a_hit = _acc_hit(text)
    if a_hit:
        d["a"] = a_hit[0]
    elif re.search(
            r"under\s+gravity|free(?:\s|-)?fall|freely\s+falling|"
            r"vertical(?:ly)?\s+(?:up|down)|thrown?\s+(?:up|down)|"
            r"falls?\s+(?:down|from)|dropped|released|rising|rises|"
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


_ASK_V = (r"final\s+(?:velocity|speed)|velocity\s+(?:on|at|with\s+which)\s+"
          r"hitting|on\s+hitting|impact\s+(?:velocity|speed)|"
          r"(?:velocity|speed)\s+(?:of|at)\s+(?:the\s+)?(?:ground|impact)|"
          r"how\s+fast|velocity\s+just\s+before")
_ASK_T = (r"how\s+long|time\s+(?:taken|of\s+flight|to\s+(?:fall|reach|stop))|"
          r"when\s+will\s+it|how\s+soon|before\s+(?:coming\s+)?to\s+rest|"
          r"takes?\s+(?:to\s+)?(?:come|reach|fall|hit)|time\s+before")
_ASK_S = (r"how\s+far|what\s+distance|distance\s+(?:travelled|covered|moved)"
          r"|max(?:imum)?\s+height|height\s+(?:reached|attained|risen)|"
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

        un = _ANS_UNIT[unknown]
        label = _KIN_NAME[unknown]
        steps = ["Known quantities: "
                 + ", ".join(f"{_KIN_NAME[k]} = {_fmt(d[k])} {_ANS_UNIT[k]}"
                             for k in sorted(d)) + ".",
              f"{equation}, solved for {label}.", subst,
              f"ANSWER: {label} = {_fmt(val)} {un}"]
        answer = f"{label} = {_fmt(val)} {un}"
        if unknown == "a" and val < 0:
            answer += f" (retardation {_fmt(abs(val))} m/s^2)"
            steps.append(f"Negative sign: the body slows down; retardation "
                         f"= {_fmt(abs(val))} m/s^2")
        extra = {unknown: val}
        extra.update(d)
        return val, steps, answer, notes or None, equation, extra
    return handler


_KIN_TRIGGER = (r"(?:accelerat\w*|retard\w*|decelerat\w*"
                r"|free[\s-]?fall|under\s+gravity"
                r"|dropped|thrown?\s+(?:vertically\s+)?up|from\s+rest)")


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
# family handlers (dynamics / work-energy / gravitation / fluids / solids)
# --------------------------------------------------------------------------- #


def _c_newton2(g, m, text):
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
        steps = ["Newton's second law: F = m x a.",
                 f"F = {_fmt(known['m'])} kg x {_fmt(known['a'])} m/s^2 = "
                 f"{_fmt(val)} N",
                 f"ANSWER: force = {_fmt(val)} N"]
        answer = f"force = {_fmt(val)} N"
    elif ask == "m":
        if known["a"] == 0:
            return _GATE
        val = known["f"] / known["a"]
        steps = ["Newton's second law rearranged: m = F / a.",
                 f"m = {_fmt(known['f'])} / {_fmt(known['a'])} = "
                 f"{_fmt(val)} kg",
                 f"ANSWER: mass = {_fmt(val)} kg"]
        answer = f"mass = {_fmt(val)} kg"
    else:
        if known["m"] == 0:
            return _GATE
        val = known["f"] / known["m"]
        steps = ["Newton's second law rearranged: a = F / m.",
                 f"a = {_fmt(known['f'])} / {_fmt(known['m'])} = "
                 f"{_fmt(val)} m/s^2",
                 f"ANSWER: acceleration = {_fmt(val)} m/s^2"]
        answer = f"acceleration = {_fmt(val)} m/s^2"
    extra = dict(known)
    extra["result"] = val
    return val, steps, answer, None, "F = m a", extra


def _c_weight(g, m, text):
    if re.search(r"apparent\s+weight", text, re.I):
        return _GATE  # apparent-weight questions belong to ARCHIMEDES
    mass = _f_mass(text)
    if mass is None:
        return _GATE
    gg = _gval(text)
    m_w = re.search(r"weight\s+(?:of\s+|is\s+)?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>N|newtons?)\b", text, re.I)
    w_txt = _sci(m_w.group("n")) if m_w else None
    if w_txt is None:
        ask = "w"
    elif _ask_word(text, r"\bmass\b"):
        ask = "m"
    elif _ask_word(text, r"\bg\b|gravity"):
        ask = "g"
    else:
        ask = "w"
    if ask == "w":
        val = mass * gg
        steps = ["Weight: W = m g.",
                 f"W = {_fmt(mass)} kg x {_fmt(gg)} m/s^2 = {_fmt(val)} N",
                 f"ANSWER: weight = {_fmt(val)} N"]
        answer = f"weight = {_fmt(val)} N"
    elif ask == "m":
        val = w_txt / gg
        steps = ["Weight rearranged: m = W / g.",
                 f"m = {_fmt(w_txt)} / {_fmt(gg)} = {_fmt(val)} kg",
                 f"ANSWER: mass = {_fmt(val)} kg"]
        answer = f"mass = {_fmt(val)} kg"
    else:
        val = w_txt / mass
        steps = ["Weight rearranged: g = W / m.",
                 f"g = {_fmt(w_txt)} / {_fmt(mass)} = {_fmt(val)} m/s^2",
                 f"ANSWER: g = {_fmt(val)} m/s^2"]
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
    if normal is None and mass is not None:
        normal = mass * gg
    if mu is None or normal is None:
        return _GATE
    if not (0 < mu < 2.0) or normal <= 0:
        return _GATE
    val = mu * normal
    steps = ["Friction: f = mu x N.",
             f"N = {_fmt(normal)} N"
             + (f" (= m g = {_fmt(mass)} x {_fmt(gg)})"
                if mass is not None and n_m is None else ""),
             f"f = {_fmt(mu)} x {_fmt(normal)} = {_fmt(val)} N",
             f"ANSWER: friction = {_fmt(val)} N"]
    assum = [f"g = {_fmt(gg)} m/s^2"] \
        if n_m is None and mass is not None else None
    answer = f"friction = {_fmt(val)} N"
    extra = {"mu": mu, "N": normal, "result": val}
    return val, steps, answer, assum, "f = mu N", extra


def _c_work(g, m, text):
    f = _f_force(text)
    d = _f_dist2(text)
    if f is None or d is None:
        return _GATE
    theta = None
    m_th = re.search(r"(?:at|making)\s+an?\s+angle\s+of\s+"
                     r"(?P<n>" + _SCI + r")\s*(?:degrees?|\u00b0|deg)",
                     text, re.I)
    if m_th:
        theta = _sci(m_th.group("n"))
    cos_t = math.cos(math.radians(theta)) if theta is not None else 1.0
    val = f * d * cos_t
    steps = ["Work done by a constant force: W = F d cos(theta).",
             f"W = {_fmt(f)} x {_fmt(d)}"
             + (f" x cos({_fmt(theta)}\u00b0) = {_fmt(f)} x {_fmt(d)} x "
                f"{cos_t:.4f} = {_fmt(val)} J" if theta is not None
                else f" = {_fmt(val)} J"),
             f"ANSWER: work = {_fmt(val)} J"]
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
        steps = ["Kinetic energy: KE = (1/2) m v^2.",
                 f"KE = 0.5 x {_fmt(mass)} x ({_fmt(vel)})^2 = "
                 f"{_fmt(val)} J",
                 f"ANSWER: kinetic energy = {_fmt(val)} J"]
        answer = f"kinetic energy = {_fmt(val)} J"
    elif ask == "m":
        if vel == 0:
            return _GATE
        val = 2.0 * ke_txt / (vel * vel)
        steps = ["Kinetic energy rearranged: m = 2 KE / v^2.",
                 f"m = 2 x {_fmt(ke_txt)} / ({_fmt(vel)})^2 = "
                 f"{_fmt(val)} kg",
                 f"ANSWER: mass = {_fmt(val)} kg"]
        answer = f"mass = {_fmt(val)} kg"
    else:
        if mass <= 0:
            return _GATE
        val = math.sqrt(2.0 * ke_txt / mass)
        steps = ["Kinetic energy rearranged: v = sqrt(2 KE / m).",
                 f"v = sqrt(2 x {_fmt(ke_txt)} / {_fmt(mass)}) = "
                 f"{_fmt(val)} m/s",
                 f"ANSWER: velocity = {_fmt(val)} m/s"]
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
    pe_txt = _f_energy(text)
    if pe_txt is None:
        ask = "pe"
    elif _ask_word(text, r"\bmass\b"):
        ask = "m"
    elif _ask_word(text, r"height|depth"):
        ask = "h"
    else:
        ask = "g"
    if ask == "pe":
        val = mass * gg * h
        steps = ["Gravitational potential energy: PE = m g h.",
                 f"PE = {_fmt(mass)} x {_fmt(gg)} x {_fmt(h)} = "
                 f"{_fmt(val)} J",
                 f"ANSWER: potential energy = {_fmt(val)} J"]
        answer = f"potential energy = {_fmt(val)} J"
    elif ask == "m":
        val = pe_txt / (gg * h)
        steps = ["PE rearranged: m = PE / (g h).",
                 f"m = {_fmt(pe_txt)} / ({_fmt(gg)} x {_fmt(h)}) = "
                 f"{_fmt(val)} kg",
                 f"ANSWER: mass = {_fmt(val)} kg"]
        answer = f"mass = {_fmt(val)} kg"
    elif ask == "h":
        val = pe_txt / (mass * gg)
        steps = ["PE rearranged: h = PE / (m g).",
                 f"h = {_fmt(pe_txt)} / ({_fmt(mass)} x {_fmt(gg)}) = "
                 f"{_fmt(val)} m",
                 f"ANSWER: height = {_fmt(val)} m"]
        answer = f"height = {_fmt(val)} m"
    else:
        val = pe_txt / (mass * h)
        steps = ["PE rearranged: g = PE / (m h).",
                 f"g = {_fmt(pe_txt)} / ({_fmt(mass)} x {_fmt(h)}) = "
                 f"{_fmt(val)} m/s^2",
                 f"ANSWER: g = {_fmt(val)} m/s^2"]
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
    val = 0.5 * mass * (v * v - u * u)
    steps = ["Work-energy theorem: W = change in KE = (1/2) m (v^2 - u^2).",
             f"W = 0.5 x {_fmt(mass)} x (({_fmt(v)})^2 - ({_fmt(u)})^2) = "
             f"{_fmt(val)} J",
             f"ANSWER: work = {_fmt(val)} J"
             + ("" if val >= 0 else
                " (negative: work done against the motion while stopping)")]
    answer = f"work = {_fmt(val)} J"
    extra = {"m": mass, "u": u, "v": v, "result": val}
    return val, steps, answer, None, "W = (1/2) m (v^2 - u^2)", extra


def _c_power_time(g, m, text):
    w_txt = _f_energy(text)
    t = _f_time2(text)
    p_txt = _f_power(text)
    if t is None or (w_txt is None and p_txt is None):
        return _GATE
    if w_txt is None:
        val = p_txt * t
        steps = ["Power rearranged: W = P x t.",
                 f"W = {_fmt(p_txt)} x {_fmt(t)} = {_fmt(val)} J",
                 f"ANSWER: work = {_fmt(val)} J"]
        answer = f"work = {_fmt(val)} J"
    else:
        val = w_txt / t
        steps = ["Power: P = W / t.",
                 f"P = {_fmt(w_txt)} / {_fmt(t)} = {_fmt(val)} W",
                 f"ANSWER: power = {_fmt(val)} W"
                 + (f" = {_fmt(val / 1000.0)} kW" if val >= 1000 else "")]
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
        steps = ["Power rearranged: F = P / v.",
                 f"F = {_fmt(p_txt)} / {_fmt(v)} = {_fmt(val)} N",
                 f"ANSWER: force = {_fmt(val)} N"]
        answer = f"force = {_fmt(val)} N"
    else:
        val = f * v
        steps = ["Power at constant velocity: P = F v.",
                 f"P = {_fmt(f)} x {_fmt(v)} = {_fmt(val)} W",
                 f"ANSWER: power = {_fmt(val)} W"]
        answer = f"power = {_fmt(val)} W"
    return val, steps, answer, None, "P = F v", {"result": val}


def _c_gravity_surface(g, m, text):
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
    steps = ["Acceleration due to gravity: g = G M / R^2 "
             "(G = 6.67e-11 N m^2/kg^2).",
             f"g = 6.67e-11 x {_fmt(M)} / ({_fmt(R)})^2 = "
             f"6.67e-11 x {_fmt(M)} / {_fmt(R * R)}",
             f"g = {_fmt(val)} m/s^2",
             f"ANSWER: g = {_fmt(val)} m/s^2"]
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
    val = rho * gg * h
    steps = ["Pressure in a fluid: P = h rho g.",
             f"P = {_fmt(h)} x {_fmt(rho)} x {_fmt(gg)} = {_fmt(val)} Pa",
             f"ANSWER: pressure = {_fmt(val)} Pa"]
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
    mass = _f_mass(text)
    fb = rho * gg * vol
    if re.search(r"apparent\s+(?:weight|mass)", text, re.I):
        if mass is None:
            return _GATE
        val = mass * gg - fb
        steps = ["Apparent weight = true weight - upthrust (Archimedes).",
                 f"true weight = {_fmt(mass)} x {_fmt(gg)} = "
                 f"{_fmt(mass * gg)} N",
                 f"upthrust = rho g V = {_fmt(rho)} x {_fmt(gg)} x "
                 f"{_fmt(vol)} = {_fmt(fb)} N",
                 f"apparent weight = {_fmt(mass * gg)} - {_fmt(fb)} = "
                 f"{_fmt(val)} N",
                 f"ANSWER: apparent weight = {_fmt(val)} N"]
        answer = f"apparent weight = {_fmt(val)} N"
    else:
        val = fb
        steps = ["Archimedes' principle: upthrust F = rho_f g V.",
                 f"F = {_fmt(rho)} x {_fmt(gg)} x {_fmt(vol)} = "
                 f"{_fmt(val)} N",
                 f"ANSWER: buoyant force = {_fmt(val)} N"]
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
    steps = ["Hooke's law: F = k x.",
             f"F = {_fmt(k)} x {_fmt(x)} = {_fmt(val)} N",
             f"ANSWER: force = {_fmt(val)} N"]
    answer = f"force = {_fmt(val)} N"
    extra = {"k": k, "x": x, "result": val}
    return val, steps, answer, None, "F = k x", extra


def _c_moment(g, m, text):
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
            text, re.I)
    if not d_m or f is None:
        return _GATE
    if d_m.groupdict().get("n"):
        d = _to_m(d_m.group("n"), d_m.group("u"))
    else:
        d = _to_m(d_m.group("n2"), d_m.group("u2"))
    val = f * d
    steps = ["Moment of a force (torque): tau = F x d.",
             f"tau = {_fmt(f)} N x {_fmt(d)} m = {_fmt(val)} N m",
             f"ANSWER: moment = {_fmt(val)} N m"]
    answer = f"moment = {_fmt(val)} N m"
    extra = {"F": f, "d": d, "result": val}
    return val, steps, answer, None, "tau = F x d", extra


def _c_principle_moments(g, m, text):
    """Seesaw balance: pair forces (weights if masses) with their
    distances from the pivot; solve the missing member."""
    gg = _gval(text)
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
        steps = ["Principle of moments: F1 d1 = F2 d2.",
                 f"F2 = (F1 d1)/d2 = ({_fmt(f1)} x {_fmt(d1)}) / "
                 f"{_fmt(d2)} = {_fmt(val)} N",
                 f"ANSWER: force = {_fmt(val)} N"]
        answer = f"force = {_fmt(val)} N"
    else:
        f_here = f1 if unknown == "d1" else f2
        d_known = d1 if unknown == "d2" else d2
        f_known = f2 if unknown == "d1" else f1
        val = f_known * d_known / f_here
        steps = ["Principle of moments: F1 d1 = F2 d2 "
                 "(clockwise moment = anticlockwise moment).",
                 f"{unknown} = ({_fmt(f_known)} x {_fmt(d_known)}) / "
                 f"{_fmt(f_here)} = {_fmt(val)} m",
                 f"ANSWER: distance = {_fmt(val)} m"]
        answer = f"distance = {_fmt(val)} m"
    extra = {"result": val, "g": gg}
    return val, steps, answer, None, "F1 d1 = F2 d2", extra


# --------------------------------------------------------------------------- #
# heat
# --------------------------------------------------------------------------- #


def _c_specific_heat(g, m, text):
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
        steps = ["Heat energy: Q = m c (delta T).",
                 f"Q = {_fmt(mass)} x {_fmt(c)} x {_fmt(dt)} = "
                 f"{_fmt(val)} J",
                 f"ANSWER: heat = {_fmt(val)} J"]
        answer = f"heat = {_fmt(val)} J"
    else:
        val = q_txt / (mass * dt)
        steps = ["Q = m c (delta T) rearranged: c = Q / (m delta T).",
                 f"c = {_fmt(q_txt)} / ({_fmt(mass)} x {_fmt(dt)}) = "
                 f"{_fmt(val)} J/(kg deg C)",
                 f"ANSWER: specific heat = {_fmt(val)} J/(kg deg C)"]
        answer = f"specific heat = {_fmt(val)} J/(kg deg C)"
    assum = ["c = 4200 J/(kg deg C) taken for water"] if water_c else None
    extra = {"m": mass, "c": c, "dT": dt, "result": val}
    return val, steps, answer, assum, "Q = m c (delta T)", extra


def _c_latent_heat(g, m, text):
    mass = _f_mass(text)
    l_m = re.search(r"latent\s+heat[^.\d]{0,40}?(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>J\s*/\s*kg|kJ\s*/\s*kg|cal\s*/\s*g)", text, re.I)
    if mass is None or not l_m:
        return _GATE
    l_v = _sci(l_m.group("n"))
    ul = l_m.group("u").replace(" ", "").lower()
    if ul.startswith("kj"):
        l_v *= 1000.0
    elif ul.startswith("cal"):
        l_v *= 4186.0
    q_txt = _f_energy(text)
    if q_txt is None:
        val = mass * l_v
        steps = ["Latent heat: Q = m L (no temperature change during the "
                 "change of state).",
                 f"Q = {_fmt(mass)} x {_fmt(l_v)} = {_fmt(val)} J",
                 f"ANSWER: heat = {_fmt(val)} J"]
        answer = f"heat = {_fmt(val)} J"
    else:
        val = q_txt / mass
        steps = ["Q = m L rearranged: L = Q / m.",
                 f"L = {_fmt(q_txt)} / {_fmt(mass)} = {_fmt(val)} J/kg",
                 f"ANSWER: latent heat = {_fmt(val)} J/kg"]
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
    l_val = _to_m(l_m.group("n"), l_m.group("u")) if l_m else None
    t_val = _to_s(t_m.group("n"), t_m.group("u")) if t_m else None
    if l_val is None and t_val is None:
        return _GATE
    if t_val is None:
        val = 2.0 * math.pi * math.sqrt(l_val / gg)
        steps = ["Simple pendulum: T = 2 pi sqrt(l/g).",
                 f"T = 2 pi x sqrt({_fmt(l_val)}/{_fmt(gg)}) = 2 pi x "
                 f"{math.sqrt(l_val / gg):.6g} = {_fmt(val)} s",
                 f"ANSWER: period = {_fmt(val)} s"]
        answer = f"period = {_fmt(val)} s"
    else:
        val = gg * t_val * t_val / (4.0 * math.pi * math.pi)
        steps = ["T = 2 pi sqrt(l/g) rearranged: l = g T^2 / (4 pi^2).",
                 f"l = {_fmt(gg)} x ({_fmt(t_val)})^2 / (4 pi^2) = "
                 f"{_fmt(val)} m",
                 f"ANSWER: length = {_fmt(val)} m"]
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


def _c_ohm(g, m, text):
    # a power ask belongs to ELECTRICAL_POWER_VI, not this family
    if _ask_word(text, r"power"):
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
        steps = ["Ohm's law: V = I R.",
                 f"V = {_fmt(known['I'])} A x {_fmt(known['R'])} ohm = "
                 f"{_fmt(val)} V",
                 f"ANSWER: voltage = {_fmt(val)} V"]
        answer = f"voltage = {_fmt(val)} V"
    elif "I" not in known:
        val = known["V"] / known["R"]
        steps = ["Ohm's law rearranged: I = V / R.",
                 f"I = {_fmt(known['V'])} / {_fmt(known['R'])} = "
                 f"{_fmt(val)} A",
                 f"ANSWER: current = {_fmt(val)} A"]
        answer = f"current = {_fmt(val)} A"
    else:
        val = known["V"] / known["I"]
        steps = ["Ohm's law rearranged: R = V / I.",
                 f"R = {_fmt(known['V'])} / {_fmt(known['I'])} = "
                 f"{_fmt(val)} ohm",
                 f"ANSWER: resistance = {_fmt(val)} ohm"]
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
            steps = ["Electrical power: P = V I.",
                     f"P = {_fmt(v)} V x {_fmt(i)} A = {_fmt(val)} W",
                     f"ANSWER: power = {_fmt(val)} W"]
            answer = f"power = {_fmt(val)} W"
        elif i is not None and r is not None:
            val = i * i * r
            steps = ["Joule heating: P = I^2 R.",
                     f"P = ({_fmt(i)})^2 x {_fmt(r)} = {_fmt(val)} W",
                     f"ANSWER: power = {_fmt(val)} W"]
            answer = f"power = {_fmt(val)} W"
        elif v is not None and r is not None:
            val = v * v / r
            steps = ["Electrical power: P = V^2 / R.",
                     f"P = ({_fmt(v)})^2 / {_fmt(r)} = {_fmt(val)} W",
                     f"ANSWER: power = {_fmt(val)} W"]
            answer = f"power = {_fmt(val)} W"
        else:
            return _GATE
    else:
        # P given: solve the missing V / I / R
        if _ask_word(text, r"resistance") and r is None:
            if v is not None:
                val = v * v / p_txt
                eq = "P = V^2/R rearranged: R = V^2 / P."
                subst = (f"R = ({_fmt(v)})^2 / {_fmt(p_txt)} = "
                         f"{_fmt(val)} ohm")
            elif i is not None:
                val = p_txt / (i * i)
                eq = "P = I^2 R rearranged: R = P / I^2."
                subst = (f"R = {_fmt(p_txt)} / ({_fmt(i)})^2 = "
                         f"{_fmt(val)} ohm")
            else:
                return _GATE
            steps = [eq, subst, f"ANSWER: resistance = {_fmt(val)} ohm"]
            answer = f"resistance = {_fmt(val)} ohm"
        elif _ask_word(text, r"current") and i is None:
            if v is None:
                return _GATE
            val = p_txt / v
            steps = ["P = V I rearranged: I = P / V.",
                     f"I = {_fmt(p_txt)} / {_fmt(v)} = {_fmt(val)} A",
                     f"ANSWER: current = {_fmt(val)} A"]
            answer = f"current = {_fmt(val)} A"
        elif _ask_word(text, r"voltage|potential\s+difference") and v is None:
            if i is None:
                return _GATE
            val = p_txt / i
            steps = ["P = V I rearranged: V = P / I.",
                     f"V = {_fmt(p_txt)} / {_fmt(i)} = {_fmt(val)} V",
                     f"ANSWER: voltage = {_fmt(val)} V"]
            answer = f"voltage = {_fmt(val)} V"
        else:
            return _GATE
    return val, steps, answer, None, "P = V I = I^2 R = V^2/R", \
        {"result": val}


def _c_kwh(g, m, text):
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
    steps = ["Electrical energy: E = P (kW) x t (h); 1 unit = 1 kWh.",
             f"P = {_fmt(p)} W = {_fmt(p / 1000.0)} kW; t = {_fmt(hours)} h",
             f"E = {_fmt(p / 1000.0)} x {_fmt(hours)} = {_fmt(kwh)} kWh "
             f"= {_fmt(kwh)} units"]
    if rate_m:
        rate = _n(rate_m.group("n"))
        cost = kwh * rate
        steps.append(f"cost = {_fmt(kwh)} units x Rs {_fmt(rate)}/unit "
                     f"= Rs {_fmt(cost)}")
        steps.append(f"ANSWER: bill = Rs {_fmt(cost)}")
        answer = f"bill = Rs {_fmt(cost)}"
        return cost, steps, answer, None, "E = P t (kWh)", \
            {"power_W": p, "hours": hours, "kWh": kwh}
    steps.append(f"ANSWER: energy = {_fmt(kwh)} units (kWh)")
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
        steps = ["Refractive index: n = c / v, c = 3e8 m/s.",
                 f"v = 3e8 / {n:g} = {_fmt(val)} m/s",
                 f"ANSWER: speed of light = {_fmt(val)} m/s"]
        answer = f"speed of light = {_fmt(val)} m/s"
    elif v_m and not n_m:
        v = _sci(v_m.group("n"))
        if v_m.group("u").strip().lower().startswith("km"):
            v *= 1000.0
        if v <= 0:
            return _GATE
        val = C / v
        steps = ["Refractive index: n = c / v, c = 3e8 m/s.",
                 f"n = 3e8 / {_fmt(v)} = {_fmt(val)}",
                 f"ANSWER: refractive index = {_fmt(val)}"]
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
    steps = ["Coulomb's law: F = k q1 q2 / r^2 with k = 9e9 N m^2/C^2.",
             f"q1 = {_fmt(q1)} C, q2 = {_fmt(q2)} C, r = {_fmt(r)} m",
             f"F = 9e9 x {_fmt(q1)} x {_fmt(q2)} / ({_fmt(r)})^2 = "
             f"{_fmt(f)} N",
             f"ANSWER: force = {_fmt(f)} N"]
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
     r"\bweight\b",
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
     r"bring|slow|change|halt)|work[\s-]energy\s+theorem",
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
     r"moment)\s+of|torque\s+(?:of|about)",
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
# Dispatcher
# --------------------------------------------------------------------------- #


def model_physics_families(text: str) -> ModelResult:
    """Dispatcher: scan every physics family; first grounded hit wins.

    Triggers are deterministic regexes with named slots; each row applies
    its own plausibility gates inside compute, and a gate refusal simply
    lets the scan continue.  Never calls an LLM.
    """
    norm = _normalize(text)
    for fid, pattern, compute in TABLE:
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
