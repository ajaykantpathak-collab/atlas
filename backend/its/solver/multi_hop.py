"""multi_hop.py -- 5-hop multi-concept chains for the answer pipeline.

Wires case_builder's chain composer into Lane B.  Same discipline as
relation_binder / case_builder: a closed registry of typed formulas
(data, not code), name-based slot binding, honest degradation -- never
an LLM, never a guessed answer.  Deterministic end to end.

What this module adds on top of case_builder:

    1.  FORMULAS EXTENSION (runtime, additive).  The base registry is
        extended with arithmetic accumulators (addition, multiplication,
        division), geometry (area_rectangle, area_circle), and physics
        (speed, density).  percent_of / subtraction / simple_interest /
        compound_interest / compound_amount / distance already exist and
        are reused unchanged (only extra alias names are appended, which
        can only widen binding, never redirect it).  compound_interest
        keeps its existing meaning (CI = A - P); the "amount from
        P, r, t" hop remains compound_amount.

    2.  FIVE HOPS.  case_builder.MAX_HOPS stays 3 for every existing
        caller (its contract is pinned by test_case_builder).  This
        module raises the cap to MULTI_HOP_MAX = 5 only around its own
        compose calls and restores it afterwards, so the base module's
        contract is untouched.

    3.  REPEAT-HOP VARIANTS.  compose_chain binds every hop from ONE
        shared value pool, so two hops of the same formula would read
        the same operand.  When an operation repeats, parse_chain_text
        registers a deterministic VARIANT key

            "<base>_from_<source>_o<position>"

        whose inputs are [source, "<op_slot>_<position>"] -- the
        accumulator binds the PREVIOUS hop's output by exact name (no
        alias, no staleness) and the operand gets a unique slot.
        Registration is idempotent: the same (base, source, position)
        always produces the identical entry, so registry state never
        depends on call order.

    4.  parse_chain_text.  Splits a multi-step narrative into
        sentences, classifies each one (setup / percent / arithmetic /
        typed formula / ask-or-flavor), and returns a chain spec
        {"keys", "linking_quantities", "values", ...} that
        compose_chain_multi executes.  2-5 operations make a chain;
        fewer is not this family (other readers own those).

    5.  Subject policy: mathematics+physics chains are allowed (added
        additively to case_builder's mix table); commerce+physics stays
        refused, exactly as before.

Chain discipline (v1): at hop 1 the accumulator may come from an
explicit number in the text or the setup seed; at every later hop the
accumulator is the PREVIOUS hop's output by name -- an in-sentence
"X of Y" restatement mid-chain is out of family and returns None rather
than a silently wrong read.
"""

from __future__ import annotations

import math
import re
from contextlib import contextmanager
from typing import Any, Dict, List, Optional

from backend.its.solver import case_builder as _cb
from backend.its.solver.case_builder import (
    compose_chain as _base_compose_chain,
)

MULTI_HOP_MAX = 5
MIN_CHAIN_HOPS = 2

GUIDED = _cb.GUIDED
DEGRADATION_POLICY = _cb.DEGRADATION_POLICY

# ------------------------------------------------------------------ #
# 1. FORMULAS extension (data, not code)
# ------------------------------------------------------------------ #

# Every quantity any hop can produce; the accumulator ("running
# result") alias tuple.  Fixed order -> deterministic binding.
_ACCUM_PRODUCES = ("amount", "area", "ci", "density", "difference",
                   "distance", "part", "product", "quotient", "si",
                   "speed", "sum", "total")

CHAIN_FORMULAS: Dict[str, Dict[str, Any]] = {
    "addition": {
        "expr": "sum = a + b",
        "subject": "mathematics",
        "produces": "sum",
        "inputs": ["a", "b"],
        "aliases": {"a": list(_ACCUM_PRODUCES)},
        "fn": lambda a, b: a + b,
    },
    "multiplication": {
        "expr": "product = a * b",
        "subject": "mathematics",
        "produces": "product",
        "inputs": ["a", "b"],
        "aliases": {"a": list(_ACCUM_PRODUCES)},
        "fn": lambda a, b: a * b,
    },
    "division": {
        "expr": "quotient = a / b",
        "subject": "mathematics",
        "produces": "quotient",
        "inputs": ["a", "b"],
        "aliases": {"a": list(_ACCUM_PRODUCES)},
        "fn": lambda a, b: a / b,
    },
    "area_rectangle": {
        "expr": "area = l * w",
        "subject": "mathematics",
        "produces": "area",
        "inputs": ["l", "w"],
        "aliases": {"l": ["length"], "w": ["width", "breadth"]},
        "fn": lambda l, w: l * w,
    },
    "area_circle": {
        "expr": "area = pi * r^2",
        "subject": "mathematics",
        "produces": "area",
        "inputs": ["r"],
        "aliases": {"r": ["radius"]},
        "fn": lambda r: math.pi * r * r,
        "note": "pi is the exact math constant, not 22/7",
    },
    "speed": {
        "expr": "speed = distance / time",
        "subject": "physics",
        "produces": "speed",
        "inputs": ["distance", "time"],
        "fn": lambda distance, time: distance / time,
    },
    "density": {
        "expr": "density = mass / volume",
        "subject": "physics",
        "produces": "density",
        "inputs": ["mass", "volume"],
        "fn": lambda mass, volume: mass / volume,
    },
}

# repeatable formulas: (produces, accumulator slot, operand slot)
_REPEATABLE: Dict[str, tuple] = {
    "addition": ("sum", "a", "b"),
    "subtraction": ("difference", "minuend", "subtrahend"),
    "multiplication": ("product", "a", "b"),
    "division": ("quotient", "a", "b"),
    "percent_of": ("part", "whole", "percent"),
}
_BASE_PRODUCES = {k: v[0] for k, v in _REPEATABLE.items()}


def extend_registry() -> None:
    """Additively extend case_builder's shared registry.  Idempotent:
    every mutation either adds a new key or widens an alias list with
    names that cannot redirect an existing binding (existing aliases
    keep priority)."""
    for key, spec in CHAIN_FORMULAS.items():
        _cb.FORMULAS.setdefault(key, spec)
    # widen accumulator binding for the two existing chain formulas
    for key, slot in (("percent_of", "whole"), ("subtraction", "minuend")):
        aliases = _cb.FORMULAS[key].get("aliases") or {}
        current = aliases.setdefault(slot, [])
        for name in _ACCUM_PRODUCES:
            if name not in current:
                current.append(name)
    # mathematics+physics chains (percent of a distance, ...) are one
    # curriculum thread; commerce+physics stays refused exactly as before
    mix = {"mathematics", "physics"}
    if not any(mix <= existing for existing in _cb._SUBJECT_MIXES):
        _cb._SUBJECT_MIXES.append(mix)


extend_registry()


# ------------------------------------------------------------------ #
# 2. Repeat-hop variants (deterministic, idempotent registration)
# ------------------------------------------------------------------ #


def _variant_key(base: str, source: str, position: int) -> str:
    return f"{base}_from_{source}_o{position}"


def _make_fn(base_spec: Dict[str, Any], accum_slot: str, op_slot: str,
             source: str, op_name: str):
    base_fn = base_spec["fn"]

    def _fn(**kw):
        return base_fn(**{accum_slot: kw[source], op_slot: kw[op_name]})

    return _fn


def ensure_chain_variant(base: str, source: str, position: int) -> str:
    """Register (once) the repeat-hop variant of `base` whose
    accumulator slot IS `source` (the previous hop's output name) and
    whose operand slot is "<op_slot>_<position>".  Deterministic and
    idempotent; returns the registry key."""
    if base not in _REPEATABLE:
        raise ValueError(f"'{base}' is not a repeatable chain formula")
    if not source or not isinstance(source, str):
        raise ValueError("variant source must be a produced quantity name")
    if not isinstance(position, int) or not (2 <= position <= MULTI_HOP_MAX):
        raise ValueError(f"variant position must be 2-{MULTI_HOP_MAX}")
    key = _variant_key(base, source, position)
    if key in _cb.FORMULAS:
        return key
    base_spec = _cb.FORMULAS[base]
    produces, accum_slot, op_slot = _REPEATABLE[base]
    op_name = f"{op_slot}_{position}"
    _cb.FORMULAS[key] = {
        "expr": base_spec["expr"],
        "subject": base_spec["subject"],
        "produces": produces,
        "inputs": [source, op_name],
        "aliases": {},
        "fn": _make_fn(base_spec, accum_slot, op_slot, source, op_name),
        "note": (f"chain variant of '{base}' at position {position}: "
                 f"consumes '{source}'"),
        "variant_of": base,
    }
    return key


def ensure_typed_variant(base: str, renamed_slots, position: int) -> str:
    """Register (once) a variant of a typed formula with the given
    input slots renamed to "<slot>_<position>", so two hops that share
    a slot name (speed and distance both read "time") ground their own
    values in the shared pool.  Deterministic and idempotent."""
    renamed = tuple(sorted(renamed_slots))
    if base not in _cb.FORMULAS:
        raise ValueError(f"unknown formula '{base}'")
    if not renamed or not all(isinstance(s, str) and s for s in renamed):
        raise ValueError("renamed_slots must be non-empty slot names")
    if not isinstance(position, int) or not (1 <= position <= MULTI_HOP_MAX):
        raise ValueError(f"variant position must be 1-{MULTI_HOP_MAX}")
    new_slots = {s: f"{s}_{position}" for s in renamed}
    key = f"{base}_x{position}_{'_'.join(renamed)}"
    if key in _cb.FORMULAS:
        return key
    base_spec = _cb.FORMULAS[base]
    base_fn = base_spec["fn"]

    def _fn(**kw):
        args = dict(kw)
        for slot, new_name in new_slots.items():
            args[slot] = args.pop(new_name)
        return base_fn(**args)

    _cb.FORMULAS[key] = {
        "expr": base_spec["expr"],
        "subject": base_spec["subject"],
        "produces": base_spec["produces"],
        "inputs": [new_slots.get(s, s) for s in base_spec["inputs"]],
        "aliases": {},
        "fn": _fn,
        "note": (f"slot variant of '{base}' at position {position}: "
                 f"{renamed} grounded independently"),
        "variant_of": base,
    }
    return key


# ------------------------------------------------------------------ #
# 3. Five-hop compose (base contract untouched outside our calls)
# ------------------------------------------------------------------ #


@contextmanager
def _raised_hop_cap():
    saved = _cb.MAX_HOPS
    _cb.MAX_HOPS = MULTI_HOP_MAX
    try:
        yield
    finally:
        _cb.MAX_HOPS = saved


def compose_chain_multi(keys: List[str], linking_quantities: List[str],
                        values: Optional[dict] = None) -> dict:
    """compose_chain with the multi-hop cap (max 5 hops).

    Same contract as case_builder.compose_chain: caller misuse (empty
    keys, > MULTI_HOP_MAX hops, unknown hop key) raises ValueError;
    computation failures return the completed prefix plus an honest
    guided refusal.  The base module's MAX_HOPS is raised only for the
    duration of the delegated call."""
    if not isinstance(keys, list) or not keys:
        raise ValueError(
            "compose_chain_multi needs a non-empty list of hop keys")
    if len(keys) > MULTI_HOP_MAX:
        raise ValueError(
            f"max {MULTI_HOP_MAX} hops, got {len(keys)}")
    unknown = [k for k in keys if k not in _cb.FORMULAS]
    if unknown:
        raise ValueError(f"unknown hop key(s): {unknown}")
    with _raised_hop_cap():
        return _base_compose_chain(keys, linking_quantities, values)


def solve_chain_text(text: str) -> Optional[dict]:
    """Parse a narrative and execute its chain in one step.  Returns
    the compose_chain result dict, or None when the text is not a
    recognizable 2-5 hop chain."""
    spec = parse_chain_text(text)
    if spec is None:
        return None
    return compose_chain_multi(spec["keys"], spec["linking_quantities"],
                               spec["values"])


# ------------------------------------------------------------------ #
# 4. parse_chain_text -- narrative -> chain spec
# ------------------------------------------------------------------ #

_SENT_SPLIT_RE = re.compile(r"(?<=[.!?])\s+")
_NUM_TOKEN_RE = re.compile(r"\d[\d,]*(?:\.\d+)?")
_NUMPAT = r"(\d[\d,]*(?:\.\d+)?)"

_PCT_RE = re.compile(_NUMPAT + r"\s*%", re.I)
_EXPL_WHOLE_RE = re.compile(
    r"\bof\s+(?:the\s+|his\s+|her\s+|its\s+|their\s+|that\s+|this\s+|"
    r"a\s+|an\s+)*" + _NUMPAT, re.I)
_ASK_RE = re.compile(
    r"\b(find|calculate|compute|determine|what|how\s+much|how\s+many)\b",
    re.I)

_ADDED_TO_RE = re.compile(_NUMPAT + r"\s+added\s+to\s+" + _NUMPAT, re.I)
_SUB_FROM_RE = re.compile(_NUMPAT + r"\s+subtracted\s+from\s+" + _NUMPAT,
                          re.I)
_INCR_BY_RE = re.compile(
    _NUMPAT + r"\s*(increas\w+|grew|decreas\w+|reduc\w+|multiplied|"
    r"divided)\s+by\s+" + _NUMPAT, re.I)
_ADD_CUE_RE = re.compile(
    r"\b(adds?|added|adding|plus|increas\w+|gains?|receives?|saves?)\b",
    re.I)
_SUB_CUE_RE = re.compile(
    r"\b(subtracts?|subtracted|subtracting|minus|less|deduct\w*|"
    r"withdraw\w*|spends?|spent|loses?|lost|decreas\w+|reduc\w+|"
    r"pays?|paid|donat\w*|leaks?|leaked|gives?\s+away)\b", re.I)
_MUL_CUE_RE = re.compile(
    r"\b(multiplied|multiplies|multiply|times|doubles?|doubled|"
    r"triples?|tripled)\b", re.I)
_DIV_CUE_RE = re.compile(
    r"\b(divided|divides|divide|halved|halves|shared\s+equally)\b", re.I)
_TRAVEL_CUE_RE = re.compile(
    r"\b(travels?|travelled|traveled|covers?|covered|moves?|moved|"
    r"journey|distance)\b", re.I)

# COMPOUND-UNIT GUARD: the lookahead excludes "/" so "30 m/s" is never
# read as "30 m" (a stated speed bound as a distance was the root of
# the circular chain-verification bug).  The time regex needs no such
# guard: the number+separator anchor already stops "m/s" matching.
_DIST_UNIT_RE = re.compile(_NUMPAT + r"\s*(?:km|cm|m)(?![a-zA-Z/])", re.I)
_TIME_UNIT_RE = re.compile(
    _NUMPAT + r"\s*(?:hours?|hrs?|h\b|minutes?|mins?|seconds?|secs?|"
    r"days?|s\b)", re.I)
_SPEED_UNIT_RE = re.compile(
    _NUMPAT + r"\s*(?:km\s*/\s*h(?:r)?|kmph|km\s+per\s+hour|"
    r"m\s*/\s*s|m\s+per\s+s)\b", re.I)

_GEO_PATTERNS = {
    "length": re.compile(r"\blength\b[^0-9]{0,30}?" + _NUMPAT, re.I),
    "width": re.compile(r"\b(?:width|breadth)\b[^0-9]{0,30}?" + _NUMPAT,
                        re.I),
    "radius": re.compile(r"\bradius\b[^0-9]{0,30}?" + _NUMPAT, re.I),
    "mass": re.compile(r"\b(?:mass|weight)\b[^0-9]{0,30}?" + _NUMPAT,
                       re.I),
    "volume": re.compile(r"\bvolume\b[^0-9]{0,30}?" + _NUMPAT, re.I),
}


def _num(token: str) -> float:
    return float(token.replace(",", ""))


def _first_number(pattern: re.Pattern, text: str) -> Optional[float]:
    m = pattern.search(text)
    return _num(m.group(1)) if m else None


def _extract_geo(text: str) -> Dict[str, float]:
    """Global typed quantities for geometry / motion / density ops."""
    geo: Dict[str, float] = {}
    for name, pattern in _GEO_PATTERNS.items():
        val = _first_number(pattern, text)
        if val is not None:
            geo[name] = val
    for name, pattern in (("distance", _DIST_UNIT_RE),
                          ("time", _TIME_UNIT_RE),
                          ("speed", _SPEED_UNIT_RE)):
        val = _first_number(pattern, text)
        if val is not None:
            geo[name] = val
    return geo


def _arith_record(sent: str, low: str, nums: List[float]) -> Optional[dict]:
    m = _ADDED_TO_RE.search(sent)
    if m:
        return {"kind": "arith", "base": "addition",
                "accum": _num(m.group(2)), "operand": _num(m.group(1)),
                "implicit": None}
    m = _SUB_FROM_RE.search(sent)
    if m:
        return {"kind": "arith", "base": "subtraction",
                "accum": _num(m.group(2)), "operand": _num(m.group(1)),
                "implicit": None}
    m = _INCR_BY_RE.search(sent)
    if m:
        verb = m.group(2).lower()
        if verb.startswith(("increas", "grew")):
            base = "addition"
        elif verb.startswith(("decreas", "reduc")):
            base = "subtraction"
        elif verb.startswith("multiplied"):
            base = "multiplication"
        else:
            base = "division"
        return {"kind": "arith", "base": base,
                "accum": _num(m.group(1)), "operand": _num(m.group(3)),
                "implicit": None}
    if _MUL_CUE_RE.search(low):
        implicit = 3.0 if re.search(r"\btriple", low) else \
            (2.0 if re.search(r"\bdouble", low) else None)
        return {"kind": "arith", "base": "multiplication", "accum": None,
                "operand": (nums[0] if nums else None),
                "implicit": implicit}
    if _DIV_CUE_RE.search(low):
        implicit = 2.0 if re.search(r"\bhal(?:ved|ves)\b", low) else None
        return {"kind": "arith", "base": "division", "accum": None,
                "operand": (nums[0] if nums else None),
                "implicit": implicit}
    if _SUB_CUE_RE.search(low):
        return {"kind": "arith", "base": "subtraction", "accum": None,
                "operand": (nums[0] if nums else None), "implicit": None}
    if _ADD_CUE_RE.search(low):
        return {"kind": "arith", "base": "addition", "accum": None,
                "operand": (nums[0] if nums else None), "implicit": None}
    return None


def _classify_sentence(sent: str, produced: List[str],
                       typed: Dict[str, float], geo: Dict[str, float]
                       ) -> dict:
    """Classify one sentence into setup / percent / arith / typed /
    ignore.  Deterministic; first matching rule wins."""
    low = sent.lower()
    nums = [_num(t) for t in _NUM_TOKEN_RE.findall(sent)]
    ask = bool(_ASK_RE.search(low))

    # 1. percent-of (the linking accumulator op)
    pm = _PCT_RE.search(sent)
    if pm and re.search(r"\bof\b", low):
        wm = _EXPL_WHOLE_RE.search(sent)
        return {"kind": "percent",
                "percent": _num(pm.group(1)),
                "explicit_whole": (_num(wm.group(1)) if wm else None),
                "numbers": nums}
    # 2-4. finance formulas (interest family)
    if "simple interest" in low:
        return {"kind": "typed", "key": "simple_interest", "numbers": nums}
    if re.search(r"\bcompound\w*\b", low) and ask:
        key = "compound_interest" if "interest" in low \
            else "compound_amount"
        return {"kind": "typed", "key": key, "numbers": nums}
    if ask and re.search(r"\b(amount|total)\b", low):
        if "si" in produced:
            return {"kind": "typed", "key": "total_from_interest",
                    "numbers": nums}
        if "rate" in typed and re.search(r"\byears?\b", low):
            return {"kind": "typed", "key": "compound_amount",
                    "numbers": nums}
    # 5-6. motion: a travel event carrying its own time is a distance
    # hop even when the word "speed" appears ("at the same speed").
    # A travel event carrying BOTH a distance and a time unit is the
    # speed definition itself (d/t), even before any speed is known.
    if _TRAVEL_CUE_RE.search(low) and _TIME_UNIT_RE.search(sent) and \
            (_SPEED_UNIT_RE.search(sent) or "speed" in produced
             or "speed" in typed or "speed" in geo):
        return {"kind": "typed", "key": "distance", "numbers": nums}
    if re.search(r"\bspeed\b", low):
        return {"kind": "typed", "key": "speed", "numbers": nums}
    # 7. area
    if re.search(r"\barea\b", low):
        if "rectangle" in low or ("length" in geo and "width" in geo):
            return {"kind": "typed", "key": "area_rectangle",
                    "numbers": nums}
        if "circle" in low or "radius" in geo:
            return {"kind": "typed", "key": "area_circle", "numbers": nums}
    # 8. density
    if "density" in low:
        return {"kind": "typed", "key": "density", "numbers": nums}
    # 9. arithmetic accumulators
    arith = _arith_record(sent, low, nums)
    if arith is not None:
        arith["numbers"] = nums
        return arith
    # 10. setup / flavor
    if nums:
        return {"kind": "setup", "numbers": nums}
    return {"kind": "ignore"}


def _typed_placements(key: str, sent: str, geo: Dict[str, float]
                      ) -> Dict[str, float]:
    """Unit-slot groundings for a typed op: the op's own sentence wins,
    the global extraction is the fallback."""
    placements: Dict[str, float] = {}
    if key == "speed":
        d = _first_number(_DIST_UNIT_RE, sent) or geo.get("distance")
        t = _first_number(_TIME_UNIT_RE, sent) or geo.get("time")
        if d is not None:
            placements["distance"] = d
        if t is not None:
            placements["time"] = t
    elif key == "distance":
        s = _first_number(_SPEED_UNIT_RE, sent) or geo.get("speed")
        t = _first_number(_TIME_UNIT_RE, sent) or geo.get("time")
        if s is not None:
            placements["speed"] = s
        if t is not None:
            placements["time"] = t
    elif key == "area_rectangle":
        if geo.get("length") is not None:
            placements["l"] = geo["length"]
        if geo.get("width") is not None:
            placements["w"] = geo["width"]
    elif key == "area_circle":
        if geo.get("radius") is not None:
            placements["r"] = geo["radius"]
    elif key == "density":
        if geo.get("mass") is not None:
            placements["mass"] = geo["mass"]
        if geo.get("volume") is not None:
            placements["volume"] = geo["volume"]
    return placements


def parse_chain_text(text: str) -> Optional[dict]:
    """Parse a multi-step narrative into a chain spec for compose_chain.

    Returns {"keys", "linking_quantities", "values", "ops",
             "sentences", "seed"} or None when the text is not a
    recognizable 2-5 operation chain (single-step questions belong to
    the other readers; more than MULTI_HOP_MAX operations refuse).
    """
    if not isinstance(text, str) or not text.strip():
        return None
    clean = " ".join(text.split())
    sentences = [s for s in _SENT_SPLIT_RE.split(clean) if s]
    if len(sentences) < MIN_CHAIN_HOPS:
        return None

    typed = _cb._extract_values(clean)
    geo = _extract_geo(clean)
    values: Dict[str, Any] = dict(typed)

    # pass 1: classify sentences (produced names evolve in order)
    records: List[dict] = []
    produced: List[str] = []
    for sent in sentences:
        rec = _classify_sentence(sent, produced, typed, geo)
        rec["sentence"] = sent
        records.append(rec)
        if rec["kind"] == "percent":
            produced.append("part")
        elif rec["kind"] == "arith":
            produced.append(_BASE_PRODUCES[rec["base"]])
        elif rec["kind"] == "typed":
            spec = _cb.FORMULAS.get(rec["key"])
            produced.append(spec["produces"] if spec else "")

    op_records = [r for r in records
                  if r["kind"] in ("percent", "arith", "typed")]
    if not (MIN_CHAIN_HOPS <= len(op_records) <= MULTI_HOP_MAX):
        return None

    # numbers stated in the FINAL ask sentence are the ask's own
    # parameters; a chain whose answer merely echoes one of them has
    # lifted an ask parameter in as an operand (wrong reading)
    last = records[-1] if records else {}
    ask_param_numbers = sorted(
        {n for n in (last.get("numbers") or [])
         if last.get("sentence") and
         _ASK_RE.search(str(last["sentence"]).lower())})

    # setup seed: first setup number that is not a typed rate/time/percent
    seed: Optional[float] = None
    for rec in records:
        if rec["kind"] != "setup":
            continue
        for n in rec["numbers"]:
            if not any(abs(n - typed[k]) < 1e-9
                       for k in ("rate", "time", "percent") if k in typed):
                seed = n
                break
        if seed is not None:
            break

    # pass 2: build keys + operand slots
    keys: List[str] = []
    ops_meta: List[dict] = []
    used_typed: set = set()
    grounded: set = set(values)     # slots already carrying a value
    position = 0
    for rec in op_records:
        sent = rec["sentence"]
        if rec["kind"] == "typed":
            key = rec["key"]
            if key in used_typed:
                # later mentions of the same quantity are asks/flavor
                continue
            used_typed.add(key)
            placements = _typed_placements(key, sent, geo)
            collisions = {s for s in placements if s in grounded}
            if collisions:
                key = ensure_typed_variant(key, collisions, position + 1)
                for slot in collisions:
                    values[f"{slot}_{position + 1}"] = placements[slot]
                    grounded.add(f"{slot}_{position + 1}")
            for slot, val in placements.items():
                if slot not in collisions:
                    values[slot] = val
                    grounded.add(slot)
            produces = _cb.FORMULAS[key]["produces"]
        else:
            base = "percent_of" if rec["kind"] == "percent" \
                else rec["base"]
            produces, accum_slot, op_slot = _REPEATABLE[base]
            if position == 0:
                key = base
                accum = rec.get("accum")
                if accum is None and rec["kind"] == "percent":
                    accum = rec.get("explicit_whole")
                if accum is None:
                    accum = seed
                if accum is not None:
                    values[accum_slot] = accum
                operand = rec.get("operand")
                if operand is None and rec["kind"] == "percent":
                    operand = rec.get("percent")
                if operand is None:
                    operand = rec.get("implicit")
                if operand is not None:
                    values[op_slot] = operand
            else:
                # chain discipline: later hops consume the previous
                # output by exact name; a mid-chain "X of Y" restatement
                # is out of family
                if rec.get("explicit_whole") is not None or \
                        rec.get("accum") is not None:
                    return None
                # the previous hop's output is the accumulator source
                source = _cb.FORMULAS[keys[-1]]["produces"]
                key = ensure_chain_variant(base, source, position + 1)
                operand = rec.get("operand")
                if operand is None and rec["kind"] == "percent":
                    operand = rec.get("percent")
                if operand is None:
                    operand = rec.get("implicit")
                if operand is not None:
                    values[f"{op_slot}_{position + 1}"] = operand
        position += 1
        keys.append(key)
        ops_meta.append({"key": key, "kind": rec["kind"],
                         "produces": produces, "sentence": sent})

    if len(keys) < MIN_CHAIN_HOPS:
        return None
    linking = [_cb.FORMULAS[k]["produces"] for k in keys[:-1]]

    return {"keys": keys, "linking_quantities": linking,
            "values": values, "ops": ops_meta, "sentences": sentences,
            "seed": seed, "ask_param_numbers": ask_param_numbers}


__all__ = ["MULTI_HOP_MAX", "MIN_CHAIN_HOPS", "CHAIN_FORMULAS",
           "extend_registry", "ensure_chain_variant", "ensure_typed_variant",
           "compose_chain_multi", "parse_chain_text", "solve_chain_text",
           "GUIDED", "DEGRADATION_POLICY"]
