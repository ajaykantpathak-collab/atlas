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
        val = w_txt / gg
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


def _c_power_time(g, m, text):
    w_txt = _f_energy(text)
    t = _f_time2(text)
    p_txt = _f_power(text)
    if t is None or (w_txt is None and p_txt is None):
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
            text, re.I)
    if not d_m or f is None:
        return _GATE
    if d_m.groupdict().get("n"):
        d = _to_m(d_m.group("n"), d_m.group("u"))
    else:
        d = _to_m(d_m.group("n2"), d_m.group("u2"))
    val = f * d
    steps = _beats(
        "moment-of-force formula tau = F x d -- the turning effect of a "
        "force is the force times its perpendicular distance from the "
        "pivot.",
        f"tau = {_fmt(f)} N x {_fmt(d)} m",
        f"tau = {_fmt(f)} x {_fmt(d)} = {_fmt(val)} N m",
        f"substitute back: d = tau / F = {_fmt(val)} / {_fmt(f)} = "
        f"{_fmt(d)} m -- matches the given distance",
        f"the force turns the body about the pivot with "
        f"{_fmt(val)} N m of moment.",
    )
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
        if R <= 0 or gg <= 0:
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
    a_m = re.search(r"(?:cross[-\s]?sectional\s+)?area\s+(?:of\s+)?"
                    r"(?:is\s+)?(?P<n>" + _SCI + r")\s*(?P<u>" + _AREA_MM
                    + r"|" + _AREA_CM + r"|" + _AREA_M + r")\b", text, re.I)
    dl_m = re.search(r"(?:stretched|elongated|extends?|stretches?|"
                     r"compressed|increase[sd]?\s+in\s+length)\s*"
                     r"(?:by|through|to)?\s*(?P<n>" + _SCI + r")\s*"
                     r"(?P<u>mm|millimetr\w+|cm|centimetr\w+|m|metres?|"
                     r"meters?)\b", text, re.I)
    y_m = re.search(r"[Yy]oung(?:'s)?\s+modulus\s+(?:of\s+(?:the\s+)?"
                    r"[\w-]+\s*)?(?:is\s+|=)?\s*(?P<n>" + _SCI + r")\s*"
                    r"(?P<u>GPa|MPa|Pa)?", text, re.I)
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
    L = _first_q(text, r"length\s+(?:of\s+)?(?:is\s+)?(?P<n>" + _SCI
                 + r")\s*(?P<u>" + _DISTU + r")\b", _to_m) \
        if l_m else None
    L = _to_m(l_m.group("n"), l_m.group("u")) if l_m else None
    A = conv_area(a_m.group("n"), a_m.group("u")) if a_m else None
    dL = conv_len(dl_m.group("n"), dl_m.group("u")) if dl_m else None
    Y = None
    if y_m:
        Y = _sci(y_m.group("n"))
        yu = (y_m.group("u") or "").upper()
        Y = Y * 1e9 if yu == "GPA" else (Y * 1e6 if yu == "MPA" else Y)
    ask_y = bool(re.search(r"young(?:'s)?\s+modulus", text, re.I)) and \
        y_m is None
    ask_dl = dl_m is None and bool(_ask_word(
        text, r"elongation|extension|stretch|increase\s+in\s+length"))
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
    for table in (TABLE, _TABLE_BOOKS2):
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
