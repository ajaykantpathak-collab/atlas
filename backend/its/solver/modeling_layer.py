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

import math
import re
from dataclasses import dataclass, field
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

# batch-2 canonical structures (adversarial-battery families), same
# contract: deterministic triggers + closed form + asymmetry guards
try:
    from backend.its.solver.modeling_structures import (
        model_meet_and_shuttle, model_simultaneous_depletion,
        model_tripartite_kinematics)
    _STRUCTURES.extend([model_simultaneous_depletion,
                        model_meet_and_shuttle,
                        model_tripartite_kinematics])
except ImportError:  # pragma: no cover - keeps the layer self-contained
    pass

# class-6 foundation families (the floor: arithmetic, number theory,
# roman, unitary, ratio, riddles) -- CBSE class 6 chapter coverage
try:
    from backend.its.solver.class6_families import (
        model_arithmetic_eval, model_number_riddle, model_number_theory,
        model_ratio_divide, model_roman_numerals, model_unitary_method,
        model_square_mensuration)
    _STRUCTURES.extend([model_arithmetic_eval, model_number_theory,
                        model_roman_numerals, model_unitary_method,
                        model_ratio_divide, model_number_riddle,
                        model_square_mensuration])
except ImportError:  # pragma: no cover
    pass

# batch-3: class-7 chapter families (angles, circles, exponents,
# fraction/percent-of, word arithmetic, multiplier riddles)
try:
    from backend.its.solver.class7_families import (
        model_angle_sum, model_circle_mensuration, model_exponent_eval,
        model_fraction_percent_of, model_percent_change,
        model_riddle_multiplier, model_word_arithmetic)
    _STRUCTURES.extend([model_word_arithmetic, model_fraction_percent_of,
                        model_angle_sum, model_circle_mensuration,
                        model_exponent_eval, model_riddle_multiplier,
                        model_percent_change])
except ImportError:  # pragma: no cover
    pass

# batch-4: fraction arithmetic, base-height areas, expression eval
try:
    from backend.its.solver.class7_families2 import (
        model_eval_expr_with_givens, model_fraction_arithmetic,
        model_triangle_parallelogram_area)
    _STRUCTURES.extend([model_fraction_arithmetic,
                        model_triangle_parallelogram_area,
                        model_eval_expr_with_givens])
except ImportError:  # pragma: no cover
    pass

# batch-5: class-8 families (roots/powers, proportion, interest,
# 3D mensuration, place value, consecutive integers)
try:
    from backend.its.solver.class8_families import (
        model_consecutive_integers, model_interest, model_mensuration_3d,
        model_place_value_number, model_proportion, model_roots_powers)
    _STRUCTURES.extend([model_roots_powers, model_proportion,
                        model_interest, model_mensuration_3d,
                        model_place_value_number,
                        model_consecutive_integers])
except ImportError:  # pragma: no cover
    pass

# batch-8b: maths 9-12 gap families
try:
    from backend.its.solver.maths2_families import model_maths2
    _STRUCTURES.extend([model_maths2])
except ImportError:
    pass

# batch-8: applied maths 11-12 families
try:
    from backend.its.solver.applied_maths_families import model_applied_maths
    _STRUCTURES.extend([model_applied_maths])
except ImportError:
    pass

# batch-7c: advanced physics 11-12 families
try:
    from backend.its.solver.physics2_families import model_physics2
    _STRUCTURES.extend([model_physics2])
except ImportError:
    pass

# batch-7b: advanced chemistry 11-12 families
try:
    from backend.its.solver.chemistry2_families import model_chemistry2
    _STRUCTURES.extend([model_chemistry2])
except ImportError:
    pass

# batch-7: expanded commerce chains (GST, cash-flow, partnership, ratios)
try:
    from backend.its.solver.commerce_families2 import model_commerce2
    _STRUCTURES.extend([model_commerce2])
except ImportError:
    pass

# batch-6: typed syllabus table for classes 9-12 STEM (one dispatcher,
# many rows -- the typed-block core)
try:
    from backend.its.solver.syllabus_families import model_syllabus
    _STRUCTURES.extend([model_syllabus])
except ImportError:  # pragma: no cover
    pass

# batch-9: advanced physics 11-12 families (waves, optics, modern physics)
try:
    from backend.its.solver.physics3_families import model_physics3
    _STRUCTURES.extend([model_physics3])
except ImportError:  # pragma: no cover
    pass

# batch-9c: core physics 6-12 families (kinematics any-solve, F=ma,
# weight/friction, work-energy-power, g=GM/R^2, hydrostatics, buoyancy,
# Hooke, moments, Q=mc dT / latent heat, pendulum, Ohm any-solve,
# electrical power + kWh billing, n = c/v).  maths2-convention table.
try:
    from backend.its.solver.physics_families import model_physics_families
    _STRUCTURES.extend([model_physics_families])
except ImportError:  # pragma: no cover
    pass

# batch-9b: advanced chemistry 11-12 families (thermo, equilibrium, electrochem)
try:
    from backend.its.solver.chemistry3_families import model_chemistry3
    _STRUCTURES.extend([model_chemistry3])
except ImportError:  # pragma: no cover
    pass

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

# batch-10: competency90 dev-cluster families (inequalities, perpetuity,
# resistor networks, mixtures, composite solids, AP/perm/chord, ...)
try:
    from backend.its.solver.extra_families import model_extra
    if not any(getattr(fn, "__name__", "") == "model_extra"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_extra)
except ImportError:  # pragma: no cover
    pass

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

# batch-12: round-3 gap families (dice probability, two-point line, coil
# moment, carbon dating, discount/marked, mean-variance recovery, ...)
try:
    from backend.its.solver.extra_families2 import model_extra2
    if not any(getattr(fn, "__name__", "") == "model_extra2"
               for fn in _STRUCTURES):
        _STRUCTURES.append(model_extra2)
except ImportError:  # pragma: no cover
    pass

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
    if best.numeric_answer is not None and _ANSWER_SHAPE_RE.search(low):
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
    return best


def model_problem(text: str) -> ModelResult:
    """Try every canonical structure; return the best match (or a refusal
    listing what was tried - never an LLM call)."""
    best: Optional[ModelResult] = None
    for fn in _STRUCTURES:
        r = fn(text)
        if r.matched and (best is None or r.confidence > best.confidence):
            best = r
    if best is not None:
        # RED-TEAM GUARDS first: they can veto any matched family.
        best = _redteam_guards(text, best)
        if not best.matched:
            return best
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
        if upper in _ARITHMETIC_FAMILIES and _SYMBOLIC_ASK_R