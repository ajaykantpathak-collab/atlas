"""modeling_layer.py — Turns raw problem TEXT into a mathematical MODEL.

This is the layer the ant stress test proved missing: the CAS cascade can
integrate anything, but nothing could recognize that "a band stretches
uniformly while an ant crawls" means

    d(theta)/dt = v_traveler / (L(t)),  L(t) = L0 + v_growth * t

Canonical structures are recognized by DETERMINISTIC RULES (triggers +
regex extraction), never by an LLM. Each structure is a small closed
family that covers many surface stories:

    STRUCTURE 1 - TRAVELER_ON_GROWING_DOMAIN
        Stories: ant on stretching rubber band, snail on expanding hose,
        worm on growing rope, walker on extending bridge...
        Model:    theta(t) = (v_t / v_g) * ln(1 + v_g t / L0)
        Answer:   reaches end (theta=1) at  T = (L0 / v_g) (e^(v_g/v_t) - 1)
        Invariant insight: uniform stretching carries the traveler along,
        so its FRACTIONAL position only changes by its own crawling.

    STRUCTURE 2 - FILL_AND_DRAIN (extensible skeleton)
        Tank fills at rate a while leaking at rate b.

Every structure returns a ModelResult with: extracted quantities (SI),
the governing equation, the symbolic solution (via the calculus cascade),
a numeric final answer, step-by-step explanation, and a confidence.
"""

from __future__ import annotations

# CL-10/CL-21: raise re._MAXCACHE before any family sweep compiles patterns
# (68% of sweep cost was compile thrash against the 512-slot cache).
from backend.its.solver import _regex_cache as _re_cache  # noqa: F401

import math
import re
from dataclasses import dataclass, field
from copy import deepcopy
from functools import lru_cache
from typing import Dict, List, Optional, Tuple

# --------------------------------------------------------------------------- #
# Quantity extraction (deterministic NER, no LLM)
# --------------------------------------------------------------------------- #

# length units -> metres; speed units -> m/s
_LENGTH_TO_M = {"nm": 1e-9, "um": 1e-6, "mm": 1e-3, "cm": 1e-2, "m": 1.0,
                "km": 1e3}
_TIME_TO_S = {"ms": 1e-3, "s": 1.0, "sec": 1.0, "second": 1.0,
              "seconds": 1.0, "min": 60.0, "minute": 60.0, "minutes": 60.0,
              "h": 3600.0, "hr": 3600.0, "hour": 3600.0, "hours": 3600.0}

_SPEED_RE = re.compile(
    r"(?P<val>\d+(?:\.\d+)?)\s*(?P<unit>km|cm|mm|m)\s*(?:/\s*|\s+per\s+)"
    r"(?P<per>ms|s|sec|second|seconds|min|minute|minutes|h|hr|hour|hours)\b",
    re.IGNORECASE,
)
_LENGTH_RE = re.compile(
    r"(?P<val>\d+(?:\.\d+)?)\s*(?P<unit>km|cm|mm|m)\b(?!\s*/)",
    re.IGNORECASE,
)


def _norm(val: float, unit: str, table: Dict[str, float]) -> float:
    return val * table[unit.lower()]


@dataclass
class ExtractedQuantities:
    """All number+unit quantities found in the text, in SI units."""
    speeds: List[float] = field(default_factory=list)      # m/s, order of appearance
    lengths: List[float] = field(default_factory=list)     # m, order of appearance
    raw_sentences: List[str] = field(default_factory=list)

    @property
    def longest_length(self) -> Optional[float]:
        return max(self.lengths) if self.lengths else None


def extract_quantities(text: str) -> ExtractedQuantities:
    q = ExtractedQuantities()
    # Speeds: consume the match so the plain length regex does not re-catch it
    consumed: List[Tuple[int, int]] = []
    for m in _SPEED_RE.finditer(text):
        q.speeds.append(_norm(float(m.group("val")), m.group("unit"), _LENGTH_TO_M)
                         / _TIME_TO_S[m.group("per").lower()])
        consumed.append((m.start(), m.end()))
    for m in _LENGTH_RE.finditer(text):
        if any(s <= m.start() < e for s, e in consumed):
            continue
        q.lengths.append(_norm(float(m.group("val")), m.group("unit"), _LENGTH_TO_M))
    return q


# --------------------------------------------------------------------------- #
# Model result contract
# --------------------------------------------------------------------------- #

@dataclass
class ModelResult:
    structure: str                     # canonical structure id
    matched: bool
    confidence: float                  # 0..1
    quantities: Dict[str, float]       # SI values used in the model
    governing_equation: str
    final_answer: Optional[str] = None
    numeric_answer: Optional[float] = None   # seconds, or inf-equivalent note
    steps: List[str] = field(default_factory=list)
    note: str = ""
    # extractive read-back of the question: {structure_label, givens:
    # [{role, value, unit, span}], ask} — the tutor surfaces this so the
    # student confirms/corrects the parse before trusting the answer
    understood: Optional[Dict[str, Any]] = None
    # wave98 hardening: the OTHER coherent family matches the same sweep
    # produced (runner-ups to ``structure``), sorted by confidence.
    # Populated inside _model_problem_uncached at zero extra sweep cost
    # and carried through the memoized deepcopy — tiered_response's
    # ambiguity cross-check reads them to fail a confident-but-
    # contested family match closed to guided.
    alternates: List["ModelResult"] = field(default_factory=list)


# --------------------------------------------------------------------------- #
# STRUCTURE 1: TRAVELER_ON_GROWING_DOMAIN  (the ant-and-rubber-band family)
# --------------------------------------------------------------------------- #

_TRAVELER_NOUNS = [
    r"\b(ant|snail|worm|beetle|insect|bug|caterpillar|person|man|walker|"
    r"boy|girl|child|dog|mouse|turtle|frog)s?\b",
]
_TRAVELER_VERBS = [
    r"\b(crawl|creep|walk|move|run|go|travel|march|climb)\w*\b",
]
_GROWTH_TRIGGERS = [
    r"\bstretch\w*\b", r"\bexpand\w*\b", r"\bgrow\w*\b", r"\b(elongat|"
    r"lengthen|increas)\w*\b",
]
_FROM_END_TRIGGERS = [
    r"\b(?:from|at|of|to|the)\s+(?:one|an|the|other|far|opposite)\s+end\b",
    r"\bone end\b", r"\bother end\b", r"\bfar end\b", r"\bopposite end\b",
    r"\b(?:left|right|front|near)\s+end\b",
]


def _has_any(text: str, patterns: List[str]) -> bool:
    low = text.lower()
    return any(re.search(p, low) for p in patterns)


def model_traveler_on_growing_domain(text: str) -> ModelResult:
    """Recognize and SOLVE the ant-on-a-stretching-band family, zero LLM.

    Recognition is two-signal:
      1. SEMANTIC (primary): embedding similarity to exemplar problems
         (handles any phrasing - "crawls/creeps/inches", "far end/tip").
      2. LEXICAL (corroboration): stem+synonym concept hits, and REQUIRED
         for extraction sanity (we still need growth + two speeds).
    """
    low = text.lower()

    # ---- Fast-fail gate: require basic growth or traveler words before loading model ----
    if not (_has_any(low, _GROWTH_TRIGGERS) or _has_any(low, _TRAVELER_NOUNS) or _has_any(low, _FROM_END_TRIGGERS)):
        return ModelResult(structure="TRAVELER_ON_GROWING_DOMAIN", matched=False, confidence=0.0,
                           quantities={}, governing_equation="", note="no growth or traveler triggers")

    # ---- Signal 1: semantic match (model-based, phrase-independent) ----
    sem_conf = 0.0
    try:
        from backend.its.solver.semantic_matcher import get_matcher
        sem_conf = get_matcher().match(text).get(
            "TRAVELER_ON_GROWING_DOMAIN", 0.0)
    except Exception:
        sem_conf = 0.0

    # ---- Signal 2: lexical concepts (stem + synonym based) ----
    try:
        from backend.its.solver.semantic_matcher import _lexical_score
        lex = _lexical_score(low)
    except Exception:
        lex = {"travel_noun": False, "travel_verb": False, "growth": False,
               "domain": False, "end": False}
    has_growth = bool(lex.get("growth"))
    has_end = bool(lex.get("end"))

    # POLARITY GUARD (validator rule D2): this structure models a
    # GROWING domain.  A shrinking/contracting domain is a different
    # physics family -- matching it here would compute the wrong model
    # perfectly.  Refuse the match and let the text fall through.
    if re.search(r"\b(shrink\w*|shrank|shrunk|contract\w*|shorten\w*|"
                 r"narrow\w*|reduc\w*(?:\s+the)?\s+(?:length|band|rope|"
                 r"hose))\b", low):
        return ModelResult(structure="TRAVELER_ON_GROWING_DOMAIN",
                           matched=False, confidence=0.0,
                           quantities={}, governing_equation="",
                           note="shrinking domain: opposite polarity, "
                                "structure does not apply")

    # Decision rule: semantic confidence is authoritative when the
    # embedder is available (MiniLM similarities for unrelated text sit
    # around 0.1-0.3; true matches land 0.6+). The lexical growth concept
    # must still be present because extraction depends on it.
    semantic_gate = sem_conf >= 0.55 and has_growth
    lex_score = 0.0
    if not semantic_gate:
        # pure-lexical fallback (offline): original weighted triggers
        lex_score = (0.25 * bool(lex.get("travel_noun"))
                     + 0.15 * bool(lex.get("travel_verb"))
                     + 0.35 * has_growth + 0.15 * bool(lex.get("domain"))
                     + 0.10 * has_end)
        if lex_score < 0.5:
            return ModelResult(structure="TRAVELER_ON_GROWING_DOMAIN",
                               matched=False, confidence=max(sem_conf, lex_score),
                               quantities={}, governing_equation="",
                               note=f"triggers not met (semantic={sem_conf:.2f}, "
                                    f"lexical={lex_score:.2f}, growth={has_growth})")

    q = extract_quantities(text)
    # Need: one initial length (L0) and TWO distinct speeds (traveler, growth).
    # The growth rate is the speed attached to the stretching; the traveler
    # speed is the other one. Heuristic: in "X at a cm/s ... stretches at b
    # km/s", the stretch sentence carries growth. Look for growth-speed
    # nearest to a growth trigger word; fall back to order heuristics.
    if len(q.speeds) < 2 or not q.lengths:
        return ModelResult(structure="TRAVELER_ON_GROWING_DOMAIN",
                           matched=False, confidence=max(sem_conf, lex_score) * 0.5,
                           quantities={}, governing_equation="",
                           note=f"need 2 speeds + 1 length, found "
                                f"{len(q.speeds)} speeds / {len(q.lengths)} lengths")

    v_growth, v_traveler = _assign_speeds(low, q)
    L0 = q.longest_length  # the band/hose/rope's initial length

    # ---- The model: theta(t) = (v_t/v_g) ln(1 + v_g t / L0) ----
    ratio = v_growth / v_traveler
    if ratio <= 0 or math.isnan(ratio):
        return ModelResult(structure="TRAVELER_ON_GROWING_DOMAIN",
                           matched=False, confidence=0.0,
                           quantities={}, governing_equation="",
                           note="non-positive growth/traveler ratio")
    T_seconds = (L0 / v_growth) * (math.exp(ratio) - 1.0) if ratio < 700 \
        else float("inf")

    log10_T = ratio / math.log(10) + math.log10(L0 / v_growth) \
        if ratio >= 700 else math.log10(T_seconds) if T_seconds > 0 else 0.0

    eq = ("d(theta)/dt = v_t / (L0 + v_g t)   ->   "
          "theta(T) = (v_t/v_g) ln(1 + v_g T / L0) = 1"
          "   ->   T = (L0/v_g) (e^(v_g/v_t) - 1)")

    steps = [
        f"Recognized STRUCTURE traveler-on-growing-domain "
        f"(semantic similarity {sem_conf:.2f}; growth concept present, "
        f"end concept present: {has_end}).",
        f"Uniform stretching carries the traveler along, so its FRACTIONAL "
        f"position theta obeys d(theta)/dt = v_t / L(t), with L(t) = L0 + v_g t.",
        f"Extracted (SI): L0 = {L0:.6g} m, v_t = {v_traveler:.6g} m/s, "
        f"v_g = {v_growth:.6g} m/s  (ratio v_g/v_t = {ratio:.6g}).",
        "Integrate: theta(t) = (v_t/v_g) ln(1 + v_g t / L0). "
        "Fraction gained per step is v_t/L(t) - this is why the ant ALWAYS "
        "gains ground even though the band grows faster than it crawls.",
        "Set theta(T) = 1 and solve: T = (L0/v_g)(e^(v_g/v_t) - 1).",
    ]

    if ratio < 700:
        answer = (f"Yes - the traveler reaches the far end after "
                  f"T = {T_seconds:.6g} seconds "
                  f"(~{log10_T:.3g} in log10 seconds).")
        note = ("finite T computed in float64; the harmonic-series equivalent "
                "is sum v_t/(L0 + v_g n) reaching 1 when H(n) ~ v_g/v_t.")
    else:
        n_digits = int(log10_T) + 1  # digits of T = floor(log10 T) + 1
        answer = (f"Yes - the traveler reaches the far end, but after "
                  f"T = (L0/v_g)(e^(v_g/v_t) - 1) = 10^{log10_T:.1f} seconds. "
                  f"This overflows float64 (T has ~{n_digits} digits) - finite "
                  f"but astronomically large: the age of the universe is "
                  f"only ~4.35e17 s.")
        note = "closed form kept in log10 because exp(ratio) overflows float64"

    return ModelResult(
        structure="TRAVELER_ON_GROWING_DOMAIN",
        matched=True,
        confidence=min(0.55 + 0.25 * sem_conf + 0.10 * has_end
                       + 0.10 * (len(q.speeds) >= 2), 0.99),
        quantities={"L0_m": L0, "v_traveler_mps": v_traveler,
                    "v_growth_mps": v_growth, "ratio": ratio},
        governing_equation=eq,
        final_answer=answer,
        numeric_answer=T_seconds if T_seconds != float("inf") else None,
        steps=steps + [f"ANSWER: {answer}"],
        note=note,
    )


def _assign_speeds(low_text: str, q: ExtractedQuantities) -> Tuple[float, float]:
    """Pick which extracted speed is the band's growth and which the traveler's.

    Strategy: the growth speed sits in/near a sentence containing a growth
    trigger ('stretches at 1 km/s'); the traveler speed appears with a
    traveler verb ('crawling at 1 cm/s'). Fall back: the SECOND distinct
    speed mentioned after the length is usually the band's.
    """
    growth_span: List[Tuple[int, int]] = []
    for m in _SPEED_RE.finditer(low_text):
        window = low_text[max(0, m.start() - 60): m.end() + 10]
        if _has_any(window, _GROWTH_TRIGGERS):
            growth_span.append((m.start(), m.end()))
    speeds_in_order = q.speeds
    if growth_span and len(speeds_in_order) >= 2:
        # find which speed occurrence was inside growth_span by re-scanning
        idx = 0
        for m in _SPEED_RE.finditer(low_text):
            if any(s <= m.start() < e for s, e in growth_span):
                v_growth = _norm(float(m.group("val")), m.group("unit"),
                                 _LENGTH_TO_M) / _TIME_TO_S[m.group("per").lower()]
                others = [v for v in speeds_in_order]
                others.remove(v_growth) if v_growth in others else None
                if others:
                    return v_growth, others[0]
            idx += 1
    # Fallback: canonical exam order mentions the traveler first ("crawls at
    # a"), then the band ("stretches at b") -> growth = second mentioned.
    a, b = speeds_in_order[0], speeds_in_order[1]
    return (b, a)  # (v_growth, v_traveler)


# --------------------------------------------------------------------------- #
# STRUCTURE 2: FILL_AND_DRAIN -- tank fills while leaking
# --------------------------------------------------------------------------- #

# Volume-rate units -> litres per second
_VOL_RATE_TO_LPS = {
    "l/s": 1.0, "l/sec": 1.0, "lps": 1.0,
    "l/min": 1.0 / 60.0, "lpm": 1.0 / 60.0,
    "ml/s": 0.001, "ml/sec": 0.001,
    "ml/min": 0.001 / 60.0,
    "m3/s": 1000.0, "cum/s": 1000.0,
    "m3/min": 1000.0 / 60.0,
    "g/s": 0.001, "g/sec": 0.001,    # water: 1 g ~ 1 ml
    "kg/s": 1.0, "kg/sec": 1.0,      # water: 1 kg ~ 1 L
    "g/min": 0.001 / 60.0,
    "kg/min": 1.0 / 60.0,
}

_VOL_RATE_RE = re.compile(
    r"(?P<val>\d+(?:\.\d+)?)\s*(?P<unit>l\s*/\s*s|l\s*/\s*sec|lps|"
    r"l\s*/\s*min|lpm|ml\s*/\s*s|ml\s*/\s*sec|ml\s*/\s*min|"
    r"m3\s*/\s*s|cum\s*/\s*s|m3\s*/\s*min|"
    r"g\s*/\s*s|g\s*/\s*sec|kg\s*/\s*s|kg\s*/\s*sec|"
    r"g\s*/\s*min|kg\s*/\s*min)\b",
    re.I)

_VOL_RE = re.compile(
    r"(?P<val>\d+(?:\.\d+)?)\s*(?P<unit>l|litre|litres|liter|liters|"
    r"ml|millilitre|millilitres|milliliter|milliliters|"
    r"m3|m\u00b3)\b(?!\s*/)",
    re.I)

_FILL_RE = re.compile(
    r"\b(fill|fills|filling|filled|inflow|inflowing|enters?|"
    r"supply|supplied|pumped|pump)\b", re.I)
_DRAIN_RE = re.compile(
    r"\b(leak|leaks|leaking|leaked|drain|drains|draining|"
    r"outflow|outflowing|empties|emptying)\b", re.I)
_TANK_RE = re.compile(
    r"\b(tank|reservoir|vat|cistern|pool|container|"
    r"bucket|barrel|tub)\b", re.I)


def _parse_vol_rate(text: str) -> List[Tuple[float, str, int]]:
    """Extract volume rates with their trigger context.
    Returns [(rate_lps, trigger_word, position)]."""
    rates = []
    for m in _VOL_RATE_RE.finditer(text):
        unit_key = re.sub(r"\s+", "", m.group("unit").lower())
        factor = _VOL_RATE_TO_LPS.get(unit_key)
        if factor is None:
            continue
        val = float(m.group("val"))
        rates.append((val * factor, m.group(0), m.start()))
    return rates


def _parse_capacity(text: str) -> Optional[float]:
    """Extract tank capacity in litres."""
    for m in _VOL_RE.finditer(text):
        unit = m.group("unit").lower()
        val = float(m.group("val"))
        if unit.startswith("ml"):
            return val * 0.001
        if unit in ("m3", "m\u00b3"):
            return val * 1000.0
        return val  # litres
    return None


def model_fill_and_drain(text: str) -> ModelResult:
    """Tank fills at rate a while leaking at rate b.

    Models:
      - Time to fill: V / (a - b) when a > b
      - Time to empty: V / (b - a) when b > a (drain exceeds fill)
      - Steady state: never fills when a <= b (with capacity)
      - Final volume after time t: V(t) = (a-b)*t (capped at capacity)
    """
    low = text.lower()

    # Must mention a tank-like container
    if not _TANK_RE.search(low):
        return ModelResult(structure="FILL_AND_DRAIN", matched=False,
                           confidence=0.0, quantities={},
                           governing_equation="",
                           note="no tank/container keyword")

    # Must have both fill and drain signals
    has_fill = bool(_FILL_RE.search(low))
    has_drain = bool(_DRAIN_RE.search(low))
    if not has_fill or not has_drain:
        return ModelResult(structure="FILL_AND_DRAIN", matched=False,
                           confidence=0.0, quantities={},
                           governing_equation="",
                           note="need both fill and drain signals")

    rates = _parse_vol_rate(text)
    if len(rates) < 2:
        return ModelResult(structure="FILL_AND_DRAIN", matched=False,
                           confidence=0.0, quantities={},
                           governing_equation="",
                           note=f"need 2 volume rates, found {len(rates)}")

    # Assign rates: fill rate near a fill trigger, drain rate near drain
    fill_rate = None
    drain_rate = None
    for rate, span, pos in rates:
        window = low[max(0, pos - 50):pos + len(span) + 20]
        if _FILL_RE.search(window) and fill_rate is None:
            fill_rate = rate
        elif _DRAIN_RE.search(window) and drain_rate is None:
            drain_rate = rate

    # Fallback: first rate = fill, second = drain (common exam order)
    if fill_rate is None or drain_rate is None:
        fill_rate, drain_rate = rates[0][0], rates[1][0]

    capacity = _parse_capacity(text)

    # Determine the ask: "how long to fill", "time to fill", "when full"
    asks_time = bool(re.search(
        r"\b(how\s+long|time\s+to\s+fill|when\s+(?:will\s+)?(?:it\s+)?"
        r"(?:be\s+)?full|how\s+much\s+time)\b", low))
    asks_volume = bool(re.search(
        r"\b(volume\s+after|amount\s+after|how\s+(?:much|many)|"
        r"what\s+is\s+(?:the\s+)?(?:volume|amount))\b", low))

    if not asks_time and not asks_volume:
        # Default: if capacity given, assume time-to-fill
        if capacity is not None:
            asks_time = True
        else:
            return ModelResult(structure="FILL_AND_DRAIN", matched=False,
                               confidence=0.0, quantities={},
                               governing_equation="",
                               note="cannot determine what is asked")

    net_rate = fill_rate - drain_rate

    if asks_time:
        if capacity is None:
            return ModelResult(structure="FILL_AND_DRAIN", matched=False,
                               confidence=0.0, quantities={},
                               governing_equation="",
                               note="time-to-fill needs tank capacity")
        if net_rate <= 0:
            answer = (f"The tank never fills -- drain rate "
                      f"({drain_rate:.6g} L/s) >= fill rate "
                      f"({fill_rate:.6g} L/s).")
            return ModelResult(
                structure="FILL_AND_DRAIN", matched=True,
                confidence=0.90,
                quantities={"fill_rate_lps": fill_rate,
                            "drain_rate_lps": drain_rate,
                            "capacity_l": capacity,
                            "net_rate_lps": net_rate},
                governing_equation="dV/dt = a - b; T = V / (a - b)",
                final_answer=answer,
                numeric_answer=None,
                steps=[
                    f"Net rate = fill - drain = {fill_rate:.6g} - "
                    f"{drain_rate:.6g} = {net_rate:.6g} L/s",
                    f"Since net rate <= 0, the tank never fills.",
                    f"ANSWER: {answer}",
                ],
                note="drain exceeds fill -- tank never fills")
        time_s = capacity / net_rate
        eq = "dV/dt = a - b  ->  T = V / (a - b)"
        answer = f"T = {capacity:g} / {net_rate:.6g} = {time_s:.6g} s"
        steps = [
            f"Net fill rate = {fill_rate:.6g} - {drain_rate:.6g} = "
            f"{net_rate:.6g} L/s",
            f"Time to fill = capacity / net rate = {capacity:g} / "
            f"{net_rate:.6g}",
            f"ANSWER: {time_s:.6g} seconds",
        ]
        return ModelResult(
            structure="FILL_AND_DRAIN", matched=True, confidence=0.90,
            quantities={"fill_rate_lps": fill_rate,
                        "drain_rate_lps": drain_rate,
                        "capacity_l": capacity,
                        "net_rate_lps": net_rate,
                        "time_s": time_s},
            governing_equation=eq,
            final_answer=answer, numeric_answer=time_s,
            steps=steps, note="fill-and-drain time-to-fill")

    # asks_volume: need a time duration
    time_match = re.search(
        r"(?P<val>\d+(?:\.\d+)?)\s*(?P<unit>hours?|hrs?|minutes?|mins?|"
        r"seconds?|secs?|h|min|s)\b", text, re.I)
    if time_match is None:
        return ModelResult(structure="FILL_AND_DRAIN", matched=False,
                           confidence=0.0, quantities={},
                           governing_equation="",
                           note="volume-after needs a time duration")
    t_val = float(time_match.group("val"))
    t_unit = time_match.group("unit").lower()
    t_factor = _TIME_TO_S.get(t_unit, _TIME_TO_S.get(
        t_unit.rstrip("s"), 1.0))
    time_s = t_val * t_factor

    volume = net_rate * time_s
    if capacity is not None and volume > capacity:
        volume = capacity
    eq = "V(t) = (a - b) * t"
    answer = f"V = ({net_rate:.6g}) * {time_s:.6g} = {volume:.6g} L"
    steps = [
        f"Net rate = {fill_rate:.6g} - {drain_rate:.6g} = "
        f"{net_rate:.6g} L/s",
        f"Volume after {time_s:.6g} s = net rate * time = "
        f"{net_rate:.6g} * {time_s:.6g}",
        f"ANSWER: {volume:.6g} L",
    ]
    return ModelResult(
        structure="FILL_AND_DRAIN", matched=True, confidence=0.90,
        quantities={"fill_rate_lps": fill_rate,
                    "drain_rate_lps": drain_rate,
                    "net_rate_lps": net_rate,
                    "time_s": time_s,
                    "volume_l": volume},
        governing_equation=eq,
        final_answer=answer, numeric_answer=volume,
        steps=steps, note="fill-and-drain volume-after-time")


# --------------------------------------------------------------------------- #
# Facade
# --------------------------------------------------------------------------- #

# --------------------------------------------------------------------------- #
# STRUCTURE 3: SPEED_TIME_DISTANCE -- distance = speed x time, SI-true.
# The 2026-09-12 red team shipped '10^8 = 1e+08' for "how far does light
# travel in 2.00 ns" because no family converted ns -> s.  This family
# OWNS the unit table (ns/us/ms/s/min/h/day), refuses any unit it cannot
# convert (honesty over coverage), and only fires when the question is
# EXACTLY one speed + one duration + a distance ask.
# --------------------------------------------------------------------------- #

_ST_SCI_VAL = (r"\d+(?:\.\d+)?(?:\s*[x\u00d7*]\s*10\s*(?:\^|\*\*)?\s*"
               r"[-+]?\d+|\s*[eE]\s*[-+]?\d+)?")
_ST_SPEED_RE = re.compile(
    r"(?P<val>" + _ST_SCI_VAL + r")\s*"
    r"(?P<len>km|cm|mm|m)\s*(?:/|per\s+)"
    r"(?P<per>h|hr|hrs|hour|hours|min|mins|minute|minutes|s|sec|secs|"
    r"second|seconds)\b", re.I)
_ST_DUR_RE = re.compile(
    r"(?P<val>\d+(?:\.\d+)?)\s*"
    r"(?P<unit>ns|us|\u00b5s|ms|secs?|seconds?|mins?|minutes?|hrs?|hours?"
    r"|days?)\b", re.I)
_ST_LENGTH_RE = re.compile(
    r"(?P<val>" + _ST_SCI_VAL + r")\s*(?P<unit>km|cm|mm|m)\b"
    r"(?!\s*(?:/|per\b))", re.I)
_ST_DIST_ASK_RE = re.compile(
    r"how\s+(?:far|much\s+distanc\w+|many\s+(?:met\w+|kilomet\w+|km|m)\b)"
    r"|distanc\w+\s+(?:covered|travelled|traveled|does|did|will|is)"
    r"|what\s+distanc\w+|the\s+distanc\w+\s+covered", re.I)

_ST_LEN_TO_M = {"km": 1000.0, "cm": 0.01, "mm": 0.001, "m": 1.0}
_ST_PER_TO_S = {"h": 3600.0, "hr": 3600.0, "hrs": 3600.0,
                "hour": 3600.0, "hours": 3600.0,
                "min": 60.0, "mins": 60.0, "minute": 60.0,
                "minutes": 60.0, "s": 1.0, "sec": 1.0, "secs": 1.0,
                "second": 1.0, "seconds": 1.0}
_ST_DUR_TO_S = dict(_ST_PER_TO_S)
_ST_DUR_TO_S.update({"ns": 1e-9, "us": 1e-6, "\u00b5s": 1e-6,
                     "ms": 1e-3, "day": 86400.0, "days": 86400.0})


def _st_parse_val(val: str) -> Optional[float]:
    """'3.0 x 10^8' / '3.0 * 10**8' / '3.0e8' / '2.00' -> float."""
    v = re.sub(r"\s+", "", val.replace("\u00d7", "x"))
    v = v.replace("x10^", "e").replace("x10**", "e").replace("x10", "e")
    try:
        return float(v)
    except ValueError:
        return None


def model_speed_time_distance(text: str) -> ModelResult:
    def _no(note: str) -> ModelResult:
        return ModelResult(structure="SPEED_TIME_DISTANCE", matched=False,
                           confidence=0.0, quantities={},
                           governing_equation="", note=note)

    if not _ST_DIST_ASK_RE.search(text):
        return _no("no distance ask")
    speeds = list(_ST_SPEED_RE.finditer(text))
    if len(speeds) != 1:
        return _no(f"need exactly 1 speed, found {len(speeds)}")
    sm = speeds[0]
    durations = [m for m in _ST_DUR_RE.finditer(text)
                 if not (sm.start() <= m.start() < sm.end())]
    if len(durations) != 1:
        return _no(f"need exactly 1 duration, found {len(durations)}")
    dm = durations[0]
    # every other stated length must belong to the speed token: a second
    # stated length is a competing distance the model cannot disambiguate
    others = [m for m in _ST_LENGTH_RE.finditer(text)
              if not (sm.start() <= m.start() < sm.end())]
    if others:
        return _no(f"{len(others)} competing length quantity(ies)")
    v_val = _st_parse_val(sm.group("val"))
    t_val = _st_parse_val(dm.group("val"))
    per_s = _ST_PER_TO_S.get(sm.group("per").lower())
    unit_s = _ST_DUR_TO_S.get(dm.group("unit").lower())
    len_m = _ST_LEN_TO_M.get(sm.group("len").lower())
    # unit-bearing inputs WITHOUT conversion support must refuse, not guess
    if None in (v_val, t_val, per_s, unit_s, len_m):
        return _no("unit without conversion support: refusing to guess")
    v_si = v_val * len_m / per_s          # m/s
    t_si = t_val * unit_s                 # s
    d_si = v_si * t_si                    # m
    d_native = v_val * (t_si / per_s)     # in the speed's own length unit
    len_unit = sm.group("len").lower()
    steps = [
        f"Convert: t = {dm.group('val')} {dm.group('unit')} = "
        f"{t_si:.6g} s; v = {v_val:.6g} {sm.group('len')}/{sm.group('per')}"
        f" = {v_si:.6g} m/s.",
        f"distance = speed x time = {v_si:.6g} m/s x {t_si:.6g} s "
        f"= {d_si:.6g} m = {d_native:.6g} {len_unit}.",
    ]
    answer = f"{d_native:.6g} {len_unit}"
    steps.append(f"ANSWER: {answer}")
    return ModelResult(
        structure="SPEED_TIME_DISTANCE", matched=True, confidence=0.92,
        quantities={"v_si_mps": v_si, "t_si_s": t_si, "d_si_m": d_si},
        governing_equation="distance = v x t (SI-true)",
        final_answer=answer, numeric_answer=d_native,
        steps=steps,
        note="speed-time-distance with explicit unit conversion")


# --------------------------------------------------------------------------- #
# STRUCTURE 4: CIRCULAR_ORBIT_SPEED -- v = 2 pi r / T.  The linear
# v = s / t schema reads an orbital RADIUS as a travelled distance and
# under-reports by 2 pi (MOT-04: 1762 'km/h' vs the true 11061 km/h).
# --------------------------------------------------------------------------- #

_ORBIT_CTX_RE = re.compile(r"\b(orbit\w*|revolv\w*)\b", re.I)
_ORBIT_RADIUS_RE = re.compile(
    r"radius\s*(?:of|=|:|is)?\s*(?P<val>" + _ST_SCI_VAL + r")\s*"
    r"(?P<unit>km|cm|mm|m)\b", re.I)
_SPEED_ASK_RE = re.compile(
    r"(?:calculate|find|determine|what\s+is|compute)\s+(?:its|the)\s+speed"
    r"|\bspeed\s+of\s+the\s+\w+", re.I)


def model_circular_orbit_speed(text: str) -> ModelResult:
    def _no(note: str) -> ModelResult:
        return ModelResult(structure="CIRCULAR_ORBIT_SPEED", matched=False,
                           confidence=0.0, quantities={},
                           governing_equation="", note=note)

    if not (_ORBIT_CTX_RE.search(text) and _SPEED_ASK_RE.search(text)):
        return _no("no orbital speed ask")
    rm = _ORBIT_RADIUS_RE.search(text)
    if rm is None:
        return _no("no radius with unit")
    durations = list(_ST_DUR_RE.finditer(text))
    if len(durations) != 1:
        return _no(f"need exactly 1 period, found {len(durations)}")
    dm = durations[0]
    r_val = _st_parse_val(rm.group("val"))
    t_val = _st_parse_val(dm.group("val"))
    unit_s = _ST_DUR_TO_S.get(dm.group("unit").lower())
    len_factor = _ST_LEN_TO_M.get(rm.group("unit").lower())
    if None in (r_val, t_val, unit_s, len_factor):
        return _no("unit without conversion support: refusing to guess")
    r_native = r_val                      # in the stated length unit
    t_h = t_val * unit_s / 3600.0         # hours
    if t_h <= 0:
        return _no("non-positive period")
    v_native = 2.0 * math.pi * r_native / t_h   # length-unit per hour
    len_unit = rm.group("unit").lower()
    steps = [
        f"Circular orbit: the stated {r_native:.6g} {len_unit} is a "
        f"RADIUS, so one revolution covers 2 x pi x r.",
        f"T = {dm.group('val')} {dm.group('unit')} = {t_h:.6g} h.",
        f"v = 2 x pi x r / T = 2 x pi x {r_native:.6g} / {t_h:.6g} "
        f"= {v_native:.6g} {len_unit}/h.",
    ]
    answer = f"{v_native:.6g} {len_unit}/h"
    steps.append(f"ANSWER: {answer}")
    return ModelResult(
        structure="CIRCULAR_ORBIT_SPEED", matched=True, confidence=0.93,
        quantities={"r_native": r_native, "T_h": t_h,
                    "v_native_per_h": v_native},
        governing_equation="v = 2 pi r / T",
        final_answer=answer, numeric_answer=v_native,
        steps=steps, note="orbital speed from radius and period")


_STRUCTURES = [model_traveler_on_growing_domain, model_fill_and_drain,
               model_speed_time_distance, model_circular_orbit_speed]

# WS-B step 1 (2026-10-10): THE single maths registry.  modeling_structures
# + class6/7/7b/8 model fns + the merged maths table dispatcher live in
# maths_families.py (maths2/3/4, applied, jee, isc-stats, syllabus maths
# rows, extra/extra2 maths fns).  The extend() order below reproduces the
# original block order (map §3) exactly: ms(2), C6(3), C7(4), C7b(5),
# C8(6), then model_maths at the old maths2 position covering the former
# blocks 7-11 + 30 (stats) + 33 (locus/plugin) inside one sub-dispatcher
# sweep with the same confidence/order semantics.
try:
    from backend.its.solver.maths_families import (
        model_meet_and_shuttle, model_simultaneous_depletion,
        model_tripartite_kinematics,
        model_arithmetic_eval, model_number_riddle, model_number_theory,
        model_ratio_divide, model_roman_numerals, model_unitary_method,
        model_square_mensuration,
        model_word_arithmetic, model_fraction_percent_of, model_angle_sum,
        model_circle_mensuration, model_exponent_eval,
        model_riddle_multiplier, model_percent_change,
        model_fraction_arithmetic, model_triangle_parallelogram_area,
        model_eval_expr_with_givens,
        model_consecutive_integers, model_interest, model_mensuration_3d,
        model_place_value_number, model_proportion, model_roots_powers,
        model_circle_locus, model_formula_plugin,
        model_maths)
    _STRUCTURES.extend([model_simultaneous_depletion,
                        model_meet_and_shuttle,
                        model_tripartite_kinematics,
                        model_arithmetic_eval, model_number_theory,
                        model_roman_numerals, model_unitary_method,
                        model_ratio_divide, model_number_riddle,
                        model_square_mensuration,
                        model_word_arithmetic, model_fraction_percent_of,
                        model_angle_sum, model_circle_mensuration,
                        model_exponent_eval, model_riddle_multiplier,
                        model_percent_change,
                        model_fraction_arithmetic,
                        model_triangle_parallelogram_area,
                        model_eval_expr_with_givens,
                        model_roots_powers, model_proportion,
                        model_interest, model_mensuration_3d,
                        model_place_value_number, model_consecutive_integers,
                        model_maths,
                        model_circle_locus, model_formula_plugin])
except ImportError:  # pragma: no cover
    pass

# batch-7c: consolidated physics families (P2 + SYL + P3 + core + extra)
try:
    from backend.its.solver.physics_families import model_physics_families
    _STRUCTURES.extend([model_physics_families])
except ImportError:
    pass

# batch-7b: consolidated chemistry families (C2 + SYL + C3 + core + extra)
try:
    from backend.its.solver.chemistry_families import model_chemistry_families
    _STRUCTURES.extend([model_chemistry_families])
except ImportError:
    pass

# batch-7: commerce chains (GST, partnership, ratios, interest on
# capital).  commerce_families2 dissolved into commerce_families (WS-B
# consolidation map step 5); the merged dispatcher keeps this slot in
# the registration order and also serves the commerce reader lanes.
try:
    from backend.its.solver.commerce_families import model_commerce_families
    _STRUCTURES.extend([model_commerce_families])
except ImportError:
    pass

# batch-6: syllabus_families dissolved (WS-B m3) — its 26 maths/12 phys/
# 2 chem rows ride the subject dispatchers (maths/physics/chemistry
# SYLLABUS blocks); no separate syllabus registration.

# batch-9: physics3 merged into physics_families (WS-B Step 2)

# batch-9c: core physics 6-12 families (kinematics any-solve, F=ma,
# weight/friction, work-energy-power, g=GM/R^2, hydrostatics, buoyancy,
# Hooke, moments, Q=mc dT / latent heat, pendulum, Ohm any-solve,
# electrical power + kWh billing, n = c/v).  maths2-convention table.
# WS-B step 2: the merged model_physics_families already covers these
# rows and registers once at the batch-7c slot — re-registering here
# would double the dispatcher in _STRUCTURES.

# batch-9b: chemistry3 merged into chemistry_families (WS-B Step 3)

# batch-15b: core chemistry families (ICSE 6-10 + bridge): equation
# balancing, valency/cross-over, mole concept any-solve, molecular mass,
# percent composition, gas laws, pH-OH, water hardness
try:
    from backend.its.solver.chemistry_families import model_chemistry_families
    if not any(getattr(fn, "__name__", "") == "model_chemistry_families"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_chemistry_families)
except ImportError:  # pragma: no cover
    pass

# batch-10: extra_families dissolved (WS-B m3 step 7) — maths rows moved
# in step 1, physics rows in step 2, PERPETUITY to commerce_families,
# LINEAR_DEPRECIATION to accountancy_families.

# batch-11: slot-schema matcher -- dimension-signature matching above the
# sentence-pattern families.  Registered LAST: specific families always
# win the confidence race in model_problem.
try:
    from backend.its.solver.slot_schema import model_slot_schema
    if not any(getattr(fn, "__name__", "") == "model_slot_schema"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_slot_schema)
except ImportError:  # pragma: no cover
    pass

# batch-12: extra_families2 dissolved (WS-B m3 step 7) — maths rows
# moved in step 1, physics rows + CARBON_DATING to subject files,
# GEOMETRIC_DEPRECIATION to accountancy_families.

# batch-14: narrative commerce/accountancy readers (partnership share,
# GST chains, instalment/hire-purchase, successive discounts, SI/CI
# prose, ratio division).  Lane B gets the same families earlier via
# commerce_readers.read_commerce_narrative; this registration covers the
# Lane A/C registry sweeps.
try:
    from backend.its.solver.commerce_readers import \
        model_commerce_narrative
    if not any(getattr(fn, "__name__", "") == "model_commerce_narrative"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_commerce_narrative)
except ImportError:  # pragma: no cover
    pass

# batch-15: accountancy 11-12 families (journal entries via the golden
# rules, SLM/WDV depreciation schedules, trading/P&L gross and net
# profit, balance-sheet missing figures, ratio analysis, BRS cash
# book/pass-book adjustments, interest on capital/drawings, partnership
# profit-share/guarantee/admission).  Deterministic, textbook-grounded.
try:
    from backend.its.solver.accountancy_families import \
        model_accountancy_families
    if not any(getattr(fn, "__name__", "") == "model_accountancy_families"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_accountancy_families)
except ImportError:  # pragma: no cover
    pass

# batch-16: biology & biotech 9-12 families (Punnett crosses, ABO/Rh and
# X-linked inheritance, photosynthesis/respiration facts, 10% law energy
# flow, exponential/logistic population growth, Hardy-Weinberg,
# biodiversity indices, magnification/field-of-view, mitosis/meiosis
# counts, restriction sites, PCR amplification, Chargaff).  Textbook-
# grounded, deterministic; registered before the numeric registry so
# specific bio triggers win.
try:
    from backend.its.solver.biology_families import model_biology
    if not any(getattr(fn, "__name__", "") == "model_biology"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_biology)
except ImportError:  # pragma: no cover
    pass

# batch-17: economics 9-12 families (linear demand/supply any-solve,
# market equilibrium, excess demand, price elasticity by percentage/
# total-outlay/point methods, GDP expenditure identity any-missing,
# NNPfc conversion chain, value-added + stage chains, income method,
# GDP deflator, CPI inflation, Fisher real rate, money multiplier,
# deposit-creation chain, consumption function, investment multiplier,
# APC/APS identities, revenue/fiscal/primary deficits, exchange-rate
# change, unemployment/participation rates, headcount ratio,
# aggregative/Laspeyres/Paasche index numbers).  Impossible-economy
# states (MPC >= 1, zero reserve ratio, negative equilibrium price)
# gate-refuse so the sandbox can route them to MisconceptionPanel.
try:
    from backend.its.solver.economics_families import \
        model_economics_families
    if not any(getattr(fn, "__name__", "") == "model_economics_families"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_economics_families)
except ImportError:  # pragma: no cover
    pass


# batch-18: language & computing families (English grammar 6-12:
# tenses/voice/narration/transformations/error-spotting/gap-fill;
# Hindi vyaakaran: sandhi/samas/alaankaar/kaal/vaachya/muhaavare;
# Computer Applications: number-system conversions, code-output
# prediction, boolean/gates, storage units).  Deterministic,
# corpus-grounded; the owning agents fill the tables — the stubs ship
# empty so registration could land without a write race.
try:
    from backend.its.solver.english_families import model_english
    if not any(getattr(fn, "__name__", "") == "model_english"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_english)
except ImportError:  # pragma: no cover
    pass

try:
    from backend.its.solver.hindi_families import model_hindi
    if not any(getattr(fn, "__name__", "") == "model_hindi"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_hindi)
except ImportError:  # pragma: no cover
    pass

try:
    from backend.its.solver.compapp_families import model_compapp
    if not any(getattr(fn, "__name__", "") == "model_compapp"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_compapp)
except ImportError:  # pragma: no cover
    pass

# batch-20 (cisce-solver-langnew 2026-09-30) moved into maths_families
# (WS-B step 1): isc statistics rows ride the model_maths sub-sweep at the
# original relative order.
# batch-20b: biotech numerics dissolved into biology_families (WS-B
# consolidation map step 4) -- BIO_HEMOCYTOMETER rides the biology
# dispatcher at its registration position; this registry slot is gone.

# batch-19: social-science numeric core (geography time-zone/population
# vital statistics/climate-graph/map-scale; civics FPTP seat-vs-vote and
# coalition arithmetic; history chronology intervals).  Deterministic,
# corpus-grounded; the owning agent fills the table — the stub ships
# empty so registration could land without a write race.
try:
    from backend.its.solver.socsci_families import model_socsci
    if not any(getattr(fn, "__name__", "") == "model_socsci"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_socsci)
except ImportError:  # pragma: no cover
    pass

# batch-21 (mined-miss families 2026-10-05) moved into maths_families
# (WS-B step 1): circle-locus classification and formula plug-in numerics
# are exported from maths_families and registered at their §3 position
# inside the maths block's region of the sweep order.
# batch-22 (electives-all 2026-10-07): classes 11-12 Computer Science
# families -- Python output prediction via a strict taught-subset AST
# interpreter (PY_TRACE / PY_EXPR / PY_TYPE), deterministic SQL asks on
# question-stated data (SQL_CLAUSE facts, SQL_AGGR with NULL semantics,
# SQL_JOIN sizes/rows) and data-structure simulations (STACK_SIM,
# QUEUE_SIM, POSTFIX_EVAL).  Compute-only: everything outside the
# taught subset or without question-stated data gate-refuses.  No exec
# inside the family; independent_verifier carries a restricted-exec
# second path for the badge gate.
try:
    from backend.its.solver.cs_families import model_cs_families
    if not any(getattr(fn, "__name__", "") == "model_cs_families"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_cs_families)
except ImportError:  # pragma: no cover
    pass


_MATRIX_BRACKETS = re.compile(r"\[[^\]]*\d[^\]]*\d[^\]]*\]")
# pipe-notation determinants ("| 2 4 ; 5 1 | = | 2x 4 ; 6 x |") and the
# determinant keyword: a registry family reading the entries as flat
# arithmetic shipped "2 * 4 = 8" as the solution of a determinant
# equation (2026-09-12 red team, M15)
_MATRIX_PIPES = re.compile(
    r"determinant|\|\s*-?\d[\d\s,.;:^xX*+\-()]*\d\s*\|")
# symbolic-ask sentences ("compute the DERIVATIVE of ...") are kernel/CAS
# territory: number-crunching families must never promote their readings
_SYMBOLIC_ASK_RE = re.compile(
    r"\b(?:derivative|differentiate|integral|integrate|limit|"
    r"simplify|factorise|factorize|expand)\b", re.I)
_ARITHMETIC_FAMILIES = {"ARITHMETIC_EVAL", "ROOTS_POWERS", "EXPONENT_EVAL",
                        "NUMBER_RIDDLE"}

# ---- RED-TEAM GUARDS (2026-09-12 wave) ------------------------------------ #
# Applied centrally so EVERY promotion path inherits them: router stage 1,
# Lane A/B/C registry sweeps, and the competency fallback.
_ANSWER_SHAPE_RE = re.compile(
    r"\b(ratio\s+of\b|who\s+(?:bought|covers|walked|runs?|is|pays?|earns?"
    r"|scores?|reaches?)|verify\s|true\s+or\s+false|"
    r"what\s+are\s+the\s+numbers)\b",
    re.I)
# "ratio of <A> to <B>" is the ask whose ANSWER is a ratio.  A bare
# "ratio" word must NOT trigger the guard: "common ratio is 1/3" is a
# GIVEN of a GP, and the plain trigger vetoed the correct 13.5
# (test_c11_gp_infinite_sum) while protecting nothing extra -- every
# ratio-shaped ask in the adversarial corpora says "ratio of".
# asks whose answer is a POINT/coordinate pair are never a bare scalar
_POINT_ASK_RE = re.compile(
    r"find\s+the\s+(?:points?\b|coordinates)|coordinates\s+of\s+[a-zA-Z]"
    r"|at\s+which\s+the\s+[xyz]-?coordinate|points?\s+on\s+the\s+curve",
    re.I)
_ENERGY_KINDS = {"KINETIC", "POTENTIAL"}
# a "displacement" ask is kinematics; mensuration families must not
# answer it (a square-field boundary question shipped P = 4 x 10 = 40
# for a displacement ask)
_DISPLACEMENT_UNSAFE = re.compile(r"MENSURATION|PERIMETER|SQUARE|AREA")


def _redteam_guards(text: str, best: "ModelResult") -> "ModelResult":
    """Convert wrong-verified classes into honest refusals.  Each guard
    is deterministic; a refused family falls through to guided."""
    low = text.lower()
    upper = best.structure.upper()

    # (1) ANSWER-SHAPE: asks whose answer is not a single bare number
    #     (ratios, who/which choices, verification identities).
    if best.numeric_answer is not None and _ANSWER_SHAPE_RE.search(low)             and best.structure.upper() != "DOBEREINER_TRIAD":
        # DOBEREINER_TRIAD exemption (CHEM-ADVERSARIAL 2026-10-06): the
        # triad check IS a verification ("verify the law of triads")
        # whose deliverable is the middle element's mass -- a number.
        return ModelResult(
            structure=best.structure, matched=False, confidence=0.0,
            quantities={}, governing_equation="",
            note="answer-shape guard: ask expects a non-numeric-shaped "
                 "answer (ratio/choice/verify); bare number refused")

    # (2) ANSWER-SHAPE (points): symbolic/geometry asks (points on a
    #     curve, reflection coordinates) must never ship a bare scalar.
    if best.numeric_answer is not None and _POINT_ASK_RE.search(low) \
            and not re.search(r"[(\[]\s*-?\d", str(best.final_answer or "")):
        return ModelResult(
            structure=best.structure, matched=False, confidence=0.0,
            quantities={}, governing_equation="",
            note="point-ask guard: ask expects a point/coordinate pair; "
                 "bare scalar refused")

    # (3) ENERGY-KIND: the fired energy family must match the asked kind
    #     (PE = mgh fired for kinetic-energy asks by binding the speed
    #     as a height).
    if "ENERGY" in upper or upper in ("SLOT_SCHEMA",):
        if re.search(r"\bkinetic\b", low) and "KINETIC" not in upper \
                and "POTENTIAL" in upper:
            return ModelResult(
                structure=best.structure, matched=False, confidence=0.0,
                quantities={}, governing_equation="",
                note="energy-kind guard: kinetic asked, potential family "
                     "fired")
        if re.search(r"\bpotential\b", low) and "KINETIC" in upper:
            return ModelResult(
                structure=best.structure, matched=False, confidence=0.0,
                quantities={}, governing_equation="",
                note="energy-kind guard: potential asked, kinetic family "
                     "fired")

    # (4) DISPLACEMENT: kinematics ask must not be answered by a
    #     mensuration family.
    if r"displacement" in low and _DISPLACEMENT_UNSAFE.search(upper) \
            and not _ORBIT_CTX_RE.search(low):
        return ModelResult(
            structure=best.structure, matched=False, confidence=0.0,
            quantities={}, governing_equation="",
            note="displacement guard: kinematics ask, mensuration family "
                 "fired")

    # (5) DETERMINANT / MATRIX: matrix-entry arithmetic can never
    #     satisfy a determinant equation; only matrix-aware families may
    #     answer.
    if _MATRIX_PIPES.search(text) and "MATRIX" not in upper \
            and "DETERMINANT" not in upper:
        return ModelResult(
            structure=best.structure, matched=False, confidence=0.0,
            quantities={}, governing_equation="",
            note="determinant guard: matrix-entry arithmetic shortcuts "
                 "cannot satisfy a determinant equation")

    # (6) FORCE-ASK (QA-1, 2026-10-02): a kinematics family (v = u + a t,
    #     s = u t + a t^2 / 2, ...) answers with an acceleration /
    #     velocity / time quantity.  When the ask names FORCE (newtons)
    #     and the fired answer is not a force quantity, shipping the bare
    #     acceleration as "the net force" is the classic confident-wrong
    #     (1000 kg car, a = 5.556 m/s^2 shipped as "5.55556").  F = ma
    #     needs the mass multiplied in -- refuse and let the honest
    #     tier take over.
    if re.search(r"\b(?:net\s+)?force\b|\bnewtons?\b", low) \
            and upper.startswith("KINEMATICS"):
        ans_txt = str(getattr(best, "final_answer", None) or "")
        if not re.search(r"\bforce\b|\bnewton\b|\d\s*N\b", ans_txt, re.I):
            return ModelResult(
                structure=best.structure, matched=False, confidence=0.0,
                quantities={}, governing_equation="",
                note="force-ask guard: kinematics family fired; answer is "
                     "not a force quantity")

    # (7) PLAUSIBILITY (QA-R4, 2026-10-03): a verified-correct arithmetic
    #     result inside an absurd physical context is still a confident-
    #     wrong ship ("500 km in 2 minutes" -> 15000 km/h train).  Guard
    #     common kinematics contexts with hard physical ceilings; values
    #     above them refuse honestly.  Deliberately narrow: math-only
    #     asks (no transport context word) are untouched.
    #     Written with word-set membership, NOT word-boundary regexes:
    #     the 2026-10-03 heredoc corruption turned \b into \b bytes.
    if best.numeric_answer is not None:
        words = set(re.findall(r"[a-z]+", low))
        contexts = [
            ({"walk", "walks", "walking", "walked"}, 15.0),
            ({"run", "runs", "running", "runner", "sprint", "sprints"}, 45.0),
            ({"car", "cars", "truck", "bus", "bike", "motorbike", "motorcycle", "scooter"}, 400.0),
            ({"train", "trains", "rail", "railway"}, 600.0),
            ({"plane", "aeroplane", "aircraft", "jet", "flight", "airplane"}, 2500.0),
        ]
        ans_txt = str(getattr(best, "final_answer", None) or "")
        ans_l = ans_txt.lower()
        is_speed = ("km/h" in ans_l or "kmph" in ans_l or "kph" in ans_l
                    or "m/s" in ans_l or "ms-1" in ans_l
                    or "speed" in words or "velocity" in words)
        if is_speed:
            v = abs(float(best.numeric_answer))
            if "m/s" in ans_l and "km/h" not in ans_l:
                v *= 3.6  # answer in m/s: compare against the ceiling in km/h
            for ctx_words, ceil in contexts:
                if words & ctx_words:
                    if v > ceil:
                        return ModelResult(
                            structure=best.structure, matched=False,
                            confidence=0.0, quantities={},
                            governing_equation="",
                            note=f"plausibility guard: value {v:.1f} km/h "
                                 f"exceeds the context ceiling {ceil} km/h; "
                                 f"refusing absurd premise")
                    break
    return best


def _norm_text_key(text: str) -> str:
    """Cache key: whitespace-normalized stem (case preserved — 'M' molar
    vs 'm' metre is load-bearing)."""
    return " ".join(text.split())


@lru_cache(maxsize=512)
def _model_problem_cached(text: str) -> ModelResult:
    return _model_problem_uncached(text)


_ASK_VERB_RE = re.compile(
    r"\b(?:find|calculate|compute|determine|evaluate|simplify|solve|"
    r"prove|show\s+that|what\s+(?:is|are|was|were)|how\s+(?:many|much|"
    r"far|long|tall|fast|high)|obtain|state|give)\b", re.I)

# filler ask words that never carry domain identity
_ASK_FILLER = frozenset({
    "find", "what", "calculate", "compute", "determine", "evaluate",
    "the", "value", "that", "this", "from", "with", "have", "has",
    "will", "would", "many", "much", "does", "each", "them", "then",
    "sample", "show", "which", "when", "where", "their", "there",
    "here", "some", "also", "given", "into", "than", "then", "both",
    "such", "only", "same", "make", "made", "using", "used", "take",
    "taken", "following", "above", "below", "answer", "question",
})


def _ask_clause(text: str) -> str:
    """The sentence carrying the ask -- distractor clauses are
    declarative noise; interrogative/imperative verbs mark the ask."""
    sents = [s for s in re.split(r"(?<=[.!?])\s+|\n", text.strip()) if s]
    for s in reversed(sents):
        if _ASK_VERB_RE.search(s) or s.rstrip().endswith("?"):
            return s
    return text


# same-domain synonyms: the ask's vocabulary and the family's answer
# vocabulary legitimately differ ('energy required to melt' <-
# 'heat = 16800 J').  Kept narrow and symmetric -- the gate exists to
# stop FOREIGN families, not spelling variants.
_DOMAIN_SYNONYMS = {
    "energy": {"heat", "joule", "work"},
    "heat": {"energy"},
    "speed": {"velocity"},
    "velocity": {"speed"},
    "cost": {"price"},
    "price": {"cost"},
    "resistance": {"resistor", "ohm", "req"},
    "resistor": {"resistance", "ohm", "req"},
}


def _domain_coherent(text: str, result: "ModelResult") -> bool:
    """Does the claim's answer/steps share domain words with the ASK
    clause?  A machinery journal answering 'find thymine %' shares
    none -- incoherent.  No ask-side domain words -> coherent
    (nothing to check against; fail-open)."""
    ask = _ask_clause(text)
    words = {w for w in re.findall(r"[a-z]{4,}", ask.lower())
             if w not in _ASK_FILLER}
    if not words:
        return True
    # expand by domain synonyms BEFORE the intersection ('heat' answers
    # an 'energy' ask -- WS-PAL latent-heat refusal)
    for w in list(words):
        words |= _DOMAIN_SYNONYMS.get(w, set())
    # steps may EMBED the question inside a framing line ("[Given]
    # transaction: <whole question>; amount = ...") -- verbatim or
    # substring checks both miss that, so a step sharing any 6-word
    # run with the question is echo and dropped
    qwords = re.findall(r"[a-z]{3,}", text.lower())
    qgrams = set(zip(*(qwords[i:] for i in range(6)))) \
        if len(qwords) >= 6 else set()
    kept = []
    for s in getattr(result, "steps", None) or []:
        sw = re.findall(r"[a-z]{3,}", str(s).lower())
        sgrams = set(zip(*(sw[i:] for i in range(6)))) \
            if len(sw) >= 6 else set()
        if qgrams and sgrams & qgrams:
            continue                     # echoes the question text
        kept.append(str(s))
    blob = " ".join(
        [str(getattr(result, "final_answer", "") or "")]
        + kept
        + [str(getattr(result, "note", "") or ""),
           str(getattr(result, "structure", "") or "")])
    blob_words = set(re.findall(r"[a-z]{4,}", blob.lower()))
    return bool(words & blob_words)


_REGISTRY_REPAIRED = False


def _repair_registry() -> None:
    """CIRCULAR-IMPORT REGISTRY REPAIR (2026-10-07, P11 dig).

    physics_families imports ModelResult from THIS module at its top.
    When physics_families is imported FIRST, this module initialises
    WHILE physics_families is mid-build: the line-~847 registration
    block asks the half-built module for model_physics_families, gets
    an ImportError, and silently drops the ENTIRE physics dispatcher
    from the registry sweep (observed live: 59 structures, no
    model_physics_families -- every physics family then depended on
    the PAL/kernel lanes, import-order-dependently).  By the time any
    question is answered every module is fully loaded, so the late
    import here succeeds.  Runs once per process."""
    global _REGISTRY_REPAIRED
    if _REGISTRY_REPAIRED:
        return
    _REGISTRY_REPAIRED = True
    try:
        from backend.its.solver.physics_families import \
            model_physics_families as _mpf
        if not any(getattr(fn, "__name__", "") == "model_physics_families"
                   for fn in _STRUCTURES):
            _STRUCTURES.append(_mpf)
    except Exception:
        pass  # physics families unavailable -- the sweep runs without it


def model_problem(text: str) -> ModelResult:
    """Public entry: memoized deep copy of the cached result.

    RELEASE GATE sits HERE, outside the memo (regression guard
    2026-10-05): inside the cached function it ran once and the verdict
    was frozen forever — repeat calls served pre-gate results even after
    the calibration floors changed. Idempotent, so applying per-call is
    cheap and always reflects current calibration."""
    _repair_registry()
    result = (_model_problem_uncached(text) if len(text) > 1600
              else deepcopy(_model_problem_cached(_norm_text_key(text))))
    try:
        from backend.services.release_calibration import withhold_if_gated
        result = withhold_if_gated(result)
    except Exception:
        pass  # calibration infrastructure must never block a solve
    return result


# DISPATCHER DOMAIN MAP (wave98 subject-domain gate): a stem's subject
# constrains which families may serve VERIFIED — a political-science
# stem must be structurally unable to reach an accountancy family.
# The registry knows which dispatcher produced a match; the
# dispatcher's module pins the family's domain.  The tag rides on the
# ModelResult (``_family_domain`` attr) through the memoized deepcopy
# so answer_pipeline's badge gate can veto foreign-domain serves.
def _fn_domain(fn) -> str:
    blob = ((getattr(fn, "__module__", "") or "") + "|" +
            (getattr(fn, "__name__", "") or "")).lower()
    if "accountancy" in blob or "commerce" in blob:
        return "commerce"
    if "economics" in blob:
        return "economics"
    if "chemistry" in blob:
        return "chemistry"
    if "biolog" in blob or "biotech" in blob:
        return "biology"
    if "physics" in blob:
        return "physics"
    if "english" in blob or "hindi" in blob or "language" in blob:
        return "language"
    if "compapp" in blob or "cs_families" in blob or "computer" in blob:
        return "cs"
    if "socsci" in blob or "humanit" in blob:
        return "humanities"
    if "competency" in blob:
        return "competency"  # resolved per concept-id at the gate
    return "maths"  # generic numerics — every subject may reach them


def _model_problem_uncached(text: str) -> ModelResult:
    """Try every canonical structure; return the best match (or a refusal
    listing what was tried - never an LLM call)."""
    """Try every canonical structure; return the best match (or a refusal
    listing what was tried - never an LLM call)."""
    # digit-group commas: family regexes read 'Rs 12,000' as 12 and
    # ship CI = 2.52 (flywheel trap class).  One canonicalization here
    # fixes every family at once -- 12,000 and 1,20,000 both collapse.
    text = re.sub(r"(\d),(?=\d{2,3}\b)", r"\1", text)
    # QA-1 ReDoS choke-point guard (2026-10-02): the registry sweep over
    # adversarially long input ("0"*3000 + " hour") hung for MINUTES --
    # 40+ dispatchers x ~170 trigger regexes, some quadratic on long
    # digit runs, run twice on registry refusal (matched pass + reasons
    # pass) and several times per answer() (Lane A sweep, Lane B sweep,
    # hop-guard sweep).  Registry triggers are phrase-level: the bank's
    # own norm_text column is left(600).  Cap at 1600 chars -- 2.6x the
    # design center -- and refuse honestly (fail-closed, never a guess).
    # Legit long prose still reaches the bank/node lanes, which are
    # length-safe.
    if len(text) > 1600:
        return ModelResult(
            structure="UNRECOGNIZED", matched=False, confidence=0.0,
            quantities={}, governing_equation="",
            note="input too long for the family registry (ReDoS guard); "
                 "refusing honestly")
    best: Optional[ModelResult] = None
    # FAST PATH (2026-10-05): the semantic structure lane (embeddings +
    # verified compute) runs FIRST — a structure matched by meaning AND
    # verified by a successful deterministic compute returns at 0.96,
    # outranking every regex-trigger family (0.85-0.95) anyway, so
    # running the other 40+ sweepers first is wasted work.  Spec hits
    # resolve in ~50ms instead of the full sweep's multi-second cost.
    # A miss falls through to the normal registry sweep unchanged.
    for fn in _STRUCTURES:
        if getattr(fn, "__name__", "") != "model_structure":
            continue
        try:
            # deterministic-only probe — the LLM extractor inside
            # model_structure must not fire before the registry sweep
            # gets its turn
            from backend.its.solver.structure_families import \
                _DEFER_LLM as _dl
            _tok = _dl.set(True)
            try:
                r0 = fn(text)
            finally:
                _dl.reset(_tok)
        except Exception:
            r0 = None
        if r0 is not None and r0.matched and r0.confidence > 0.9 \
                and (r0.numeric_answer is not None or r0.final_answer):
            upper0 = r0.structure.upper()
            if not (_MATRIX_BRACKETS.search(text)
                    and "MATRIX" not in upper0
                    and "DETERMINANT" not in upper0):
                return r0
    # QA-R1 (2026-10-03): one sweep, results kept -- the refusal path used to
    # re-run every structure just to build the reasons string (a full second
    # registry sweep on every bank miss; the dominant p95 cost).
    # CL-10: the registry sweep runs LLM-DEFERRED — model_structure's
    # extractor used to fire Groq/Gemini inside every sweep on every
    # stem.  Deterministic match first; the LLM gets its turn only on a
    # full-registry miss (and only when the caller hasn't deferred it).
    _caller_deferred = False
    _dl_tok = None
    try:
        from backend.its.solver.structure_families import _DEFER_LLM as _dl2
        _caller_deferred = bool(_dl2.get())
        _dl_tok = _dl2.set(True)
    except Exception:
        _dl_tok = None
    try:
        first_pass = [(fn, fn(text)) for fn in _STRUCTURES]
    finally:
        if _dl_tok is not None:
            _dl2.reset(_dl_tok)
    for _fn, r in first_pass:
        if getattr(r, "matched", False):
            try:
                r._family_domain = _fn_domain(_fn)
            except Exception:  # noqa: BLE001 -- advisory tag only
                pass
        if r.matched and (best is None or r.confidence > best.confidence):
            best = r
    # DISTRACTOR GATE (flywheel-L4 root cause): a noise clause can
    # carry keywords that let a foreign family outrank the ask's real
    # family -- '...22% cytosine. A competitor sold a machine for Rs
    # 75,000. Find % thymine' shipped a journal entry VERIFIED.  Two
    # arms: (a) re-rank -- a coherent rival beats confidence; (b) veto
    # -- an incoherent best is refused when the ask clause carries >=2
    # domain words (single-word asks fail-open: 'how many apples' has
    # too little evidence to veto on).
    _coh = [_domain_coherent(text, r) for _f, r in first_pass]
    _coherent = [r for (_f, r), c in zip(first_pass, _coh)
                 if r.matched and c]
    if _coherent:
        best = max(_coherent, key=lambda _r: _r.confidence)
    elif best is not None and _coh:
        _bw = {w for w in re.findall(r"[a-z]{4,}", _ask_clause(text).lower())
               if w not in _ASK_FILLER}
        if len(_bw) >= 2 and not _domain_coherent(text, best):
            best = ModelResult(
                structure=best.structure, matched=False,
                confidence=0.0, quantities={}, governing_equation="",
                note="distractor gate: claim shares no domain word with "
                     "the ask clause -- foreign-family claim refused")
    if best is not None:
        # RED-TEAM GUARDS first: they can veto any matched family.
        best = _redteam_guards(text, best)
        if not best.matched:
            return best
        # FLYWHEEL-L4 RELEASE CALIBRATION moved OUT of this function into
        # model_problem (2026-10-05): inside the memo the gate verdict was
        # frozen for the life of the lru_cache. See model_problem docstring.
        # matrix-bracket text is Lane A kernel territory: a registry
        # family reading "[x -5 -1] [[0,2,1],...]" as flat arithmetic
        # ships a wrong "verified" answer -- never promote those.
        # Matrix-aware families (determinant etc.) stay allowed.
        upper = best.structure.upper()
        if _MATRIX_BRACKETS.search(text) \
                and "MATRIX" not in upper and "DETERMINANT" not in upper:
            return ModelResult(
                structure="UNRECOGNIZED", matched=False, confidence=0.0,
                quantities={}, governing_equation="",
                note="matrix-bracket text: registry families refuse, "
                     "kernel owns matrix forms")
        # symbolic-ask sentences: an arithmetic family flattening
        # "derivative of 6x100" to "6*100" is a wrong answer in the
        # making -- refuse; the kernel's CAS owns these
        if upper in _ARITHMETIC_FAMILIES and _SYMBOLIC_ASK_RE.search(text):
            return ModelResult(
                structure="UNRECOGNIZED", matched=False, confidence=0.0,
                quantities={}, governing_equation="",
                note="symbolic ask: arithmetic family refused")
        # AMBIGUITY ALTERNATES (wave98 hardening): keep the OTHER
        # coherent matches the same sweep already produced — no second
        # pass, no latency.  Only coherent rivals count (the distractor
        # gate already proved the rest are noise-clause matches); the
        # tier stamp fails closed when one of them confidently answers
        # differently (SI-stem -> CI-method class).  Dispatcher-internal
        # runner-ups (e.g. model_maths' losing sub-readings) merge in
        # too — they never passed the coherence gate but the rival check
        # applies its own confidence/answer test anyway.
        try:
            merged = [r for r in _coherent if r is not best]
            for r in getattr(best, "alternates", None) or []:
                if r is not best and all(r is not o for o in merged):
                    merged.append(r)
            best.alternates = sorted(
                merged,
                key=lambda _r: float(
                    getattr(_r, "confidence", 0.0) or 0.0),
                reverse=True)[:6]
        except Exception:  # noqa: BLE001 -- alternates are advisory
            pass
        return best
    # Full deterministic miss — the LLM extractor inside model_structure
    # gets its turn now (CL-10: registry first, LLM only on miss; the
    # _chat gates enforce keys-configured + SOLVER_OFFLINE).  Skipped
    # when the caller already deferred LLM (tutor/offline passes).
    if not _caller_deferred and best is None:
        try:
            for fn in _STRUCTURES:
                if getattr(fn, "__name__", "") != "model_structure":
                    continue
                r_llm = fn(text)
                if r_llm is not None and r_llm.matched:
                    r_llm = _redteam_guards(text, r_llm)
                    if r_llm.matched:
                        first_pass.append((fn, r_llm))
                        best = r_llm
        except Exception:
            pass
    if best is not None and best.matched:
        try:  # same zero-cost alternate surfacing as the main return
            best.alternates = sorted(
                (r for r in _coherent if r is not best),
                key=lambda _r: float(
                    getattr(_r, "confidence", 0.0) or 0.0),
                reverse=True)[:6]
        except Exception:  # noqa: BLE001
            pass
        return best
    reasons = "; ".join(f"{r.structure}: {r.note}" for _fn, r in first_pass)
    return ModelResult(structure="UNRECOGNIZED", matched=False, confidence=0.0,
                       quantities={}, governing_equation="",
                       note=f"no canonical structure matched ({reasons})")

# batch-13: competency engine -- cross-chapter concept router bridging the
# NCERT catalogs to family bindings.  Fires only when nothing precise
# matched (confidence 0.88 < family 0.95).
try:
    from backend.its.solver.competency_engine import model_competency
    if not any(getattr(fn, "__name__", "") == "model_competency"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_competency)
except ImportError:  # pragma: no cover
    pass

# batch-15: semantic structure dispatch -- embedding-matched ask ->
# role-bound slots -> direct compute (board-paper question forms).
try:
    from backend.its.solver.structure_families import model_structure
    if not any(getattr(fn, "__name__", "") == "model_structure"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_structure)
except ImportError:  # pragma: no cover
    pass
