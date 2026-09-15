"""case_builder.py -- Case-Based question builder + Chain question composer.

CBSE Case-Based questions (competency format) are one context passage
with 3-5 sub-questions that share the passage data.  This module builds
and SOLVES them deterministically, with the same discipline as
relation_binder: a closed registry of typed formulas (data, not code),
name-based slot binding, honest degradation -- never an LLM, never a
guessed answer.

    TASK 1  build_case(passage, sub_questions)
        Evaluates every sub-question from the shared passage values;
        detects chains (child (ii) consuming child (i)'s answer) and
        flags the case with "chain": true.

    TASK 2  compose_chain(keys, linking_quantities, values)
        Genuine multi-concept chains: concept A's output feeds concept
        B as a LINKING QUANTITY.  Max 3 hops, linear (each hop's output
        is the next hop's input).  Any hop that cannot compute returns
        ALL completed steps plus an honest refusal -- guided practice,
        answer withheld.  v1 refuses cross-subject chains.

    TASK 3  generate_case_from_bank(text, questions)
        Bank passages + 3-5 related questions -> case cluster.  Detects
        shared data (the same numbers appearing in the passage and in
        several questions) and chains (a later question's computation
        consuming an earlier question's answer), then returns the same
        case structure as build_case.

Failure contract (mirrors the Truth Core):
    - caller/spec misuse (wrong arity, >3 hops, unknown hop key)
      raises ValueError -- deterministic, documented, testable;
    - computation failures (missing values, broken linkage,
      cross-subject, implausible magnitude) return the completed
      prefix + refusal_reason + degradation, answer None.
"""

from __future__ import annotations

import json
import math
import re
from typing import Any, Dict, List, Optional

MAX_HOPS = 3
MIN_CHILDREN = 3
MAX_CHILDREN = 5
PLAUSIBILITY_CEILING = 1e15   # relation_binder's gate: |value| < 1e15

DEGRADATION_POLICY = ("if any hop fails -> guided practice with all "
                      "previous steps shown")
GUIDED = "guided_practice"

_ROMAN = ["i", "ii", "iii", "iv", "v"]

# --------------------------------------------------------------------------- #
# Deterministic ids (content-hashed; same input -> same id, no clock)
# --------------------------------------------------------------------------- #


def _stable_id(prefix: str, payload: Any) -> str:
    blob = json.dumps(payload, sort_keys=True, separators=(",", ":"),
                      default=str)
    h = 2166136261
    for ch in blob:
        h = ((h ^ ord(ch)) * 16777619) & 0xFFFFFFFF
    return f"{prefix}_{h:08x}"


# --------------------------------------------------------------------------- #
# Numeric hygiene
# --------------------------------------------------------------------------- #


def _clean(x: Any) -> Optional[float]:
    """Round float noise to 6 dp; collapse integral values to int."""
    if isinstance(x, bool) or not isinstance(x, (int, float)):
        return None
    if isinstance(x, float) and (math.isnan(x) or math.isinf(x)):
        return None
    r = round(float(x), 6)
    if abs(r - round(r)) < 1e-9:
        return int(round(r))
    return r


def _fmt(x: Any) -> str:
    return str(x)


# --------------------------------------------------------------------------- #
# Formula registry (data, not code -- same discipline as RELATIONS)
# --------------------------------------------------------------------------- #

# Each entry:
#   expr      surface formula shown to the student
#   subject   subject-group gate (v1 refuses cross-subject chains)
#   produces  name of the output quantity (the linking quantity)
#   inputs    required slot names, bound from the value pool by name
#   aliases   per-slot alternative pool names (signal lexicon style)
#   derive    per-slot derivation formula when the slot is not in the
#             pool but its own inputs are (e.g. amount from P, r, t)
FORMULAS: Dict[str, Dict[str, Any]] = {
    "compound_amount": {
        "expr": "A = P(1 + r/100)^n",
        "subject": "commerce",
        "produces": "amount",
        "inputs": ["principal", "rate", "time"],
        "fn": lambda principal, rate, time:
            principal * (1.0 + rate / 100.0) ** time,
        "note": "compounded annually",
    },
    "compound_interest": {
        "expr": "CI = A - P",
        "subject": "commerce",
        "produces": "ci",
        "inputs": ["amount", "principal"],
        "aliases": {"amount": ["amount", "total"],
                    "principal": ["principal", "sum"]},
        "derive": {"amount": "compound_amount"},
        "fn": lambda amount, principal: amount - principal,
    },
    "simple_interest": {
        "expr": "SI = P*r*t/100",
        "subject": "commerce",
        "produces": "si",
        "inputs": ["principal", "rate", "time"],
        "fn": lambda principal, rate, time:
            principal * rate * time / 100.0,
    },
    "total_from_interest": {
        "expr": "A = P + SI",
        "subject": "commerce",
        "produces": "amount",
        "inputs": ["principal", "si"],
        "aliases": {"si": ["si", "interest"]},
        "fn": lambda principal, si: principal + si,
    },
    "subtraction": {
        "expr": "difference = a - b",
        "subject": "mathematics",
        "produces": "difference",
        "inputs": ["minuend", "subtrahend"],
        "aliases": {"minuend": ["amount", "minuend", "total"],
                    "subtrahend": ["principal", "subtrahend"]},
        "fn": lambda minuend, subtrahend: minuend - subtrahend,
    },
    "percent_of": {
        "expr": "part = whole * percent / 100",
        "subject": "mathematics",
        "produces": "part",
        "inputs": ["percent", "whole"],
        "aliases": {"whole": ["ci", "difference", "amount", "whole"]},
        "fn": lambda percent, whole: whole * percent / 100.0,
    },
    "distance": {
        "expr": "d = s * t",
        "subject": "physics",
        "produces": "distance",
        "inputs": ["speed", "time"],
        "fn": lambda speed, time: speed * time,
    },
}

# v1 policy: chains may mix commerce and mathematics (interest -> CI is
# one curriculum thread), but never leap across subjects.
_SUBJECT_MIXES = [{"commerce", "mathematics"}]


def _subjects_allowed(subjects: List[str]) -> bool:
    group = set(subjects)
    return len(group) == 1 or any(group <= mix for mix in _SUBJECT_MIXES)


# --------------------------------------------------------------------------- #
# Deterministic value extraction from passage / question text
# --------------------------------------------------------------------------- #

_RS = r"(?:\brs\.?|\binr\b|" + chr(8377) + r")"
_MONEY_RE = re.compile(
    _RS + r"\s*([0-9][0-9,]*(?:\.[0-9]+)?)\s*(crore|lakhs?|lakh)?", re.I)
_RATE_RE = re.compile(r"([0-9]+(?:\.[0-9]+)?)\s*%\s*per\s*annum", re.I)
_PCT_RE = re.compile(r"([0-9]+(?:\.[0-9]+)?)\s*%")
_TIME_RE = re.compile(
    r"\b(?:for|after|in|over)\s+([0-9]+(?:\.[0-9]+)?)\s+years?\b", re.I)
_PRINCIPAL_CONTEXT_RE = re.compile(
    r"\b(loan|borrow\w*|invest\w*|deposit\w*|principal|sum\s+of|"
    r"lent|amount)\b", re.I)


def _extract_values(text: str) -> Dict[str, float]:
    """Best-effort typed quantities from a passage or question.

    Per-sub-question values override these (TOPIC + VALUES specs win).
    """
    vals: Dict[str, float] = {}
    if not text:
        return vals
    rm = _RATE_RE.search(text)
    if rm:
        vals["rate"] = float(rm.group(1))
    tm = _TIME_RE.search(text)
    if tm:
        vals["time"] = float(tm.group(1))
    named_principal = bool(_PRINCIPAL_CONTEXT_RE.search(text))
    money_idx = 0
    for m in _MONEY_RE.finditer(text):
        val = float(m.group(1).replace(",", ""))
        scale = (m.group(2) or "").lower()
        if "crore" in scale:
            val *= 10_000_000
        elif "lakh" in scale:
            val *= 100_000
        money_idx += 1
        key = "principal" if (named_principal and money_idx == 1) \
            else f"money_{money_idx}"
        vals.setdefault(key, val)
    for m in _PCT_RE.finditer(text):
        vals.setdefault("percent", float(m.group(1)))
        break
    return vals


_NUM_RE = re.compile(r"[0-9][0-9,]*(?:\.[0-9]+)?")


def _numbers(text: str) -> set:
    """All numeric values in a text, comma-normalised (shared-data check)."""
    out = set()
    for m in _NUM_RE.finditer(text or ""):
        try:
            out.add(round(float(m.group(0).replace(",", "")), 6))
        except ValueError:  # pragma: no cover - regex guarantees float
            continue
    return out


# --------------------------------------------------------------------------- #
# Slot binding (name -> alias, then derivation; positional guessing is
# deliberately absent -- a linking quantity binds by NAME only)
# --------------------------------------------------------------------------- #


def _bind_inputs(spec: Dict[str, Any], pool: Dict[str, Any],
                 produced: List[str], overridden: set
                 ) -> tuple:
    """Bind the formula's input slots from the value pool.

    Returns (bound, missing, consumed) where consumed lists the pool
    names that were PRODUCED by earlier hops/children -- the chain
    evidence.
    """
    bound: Dict[str, Any] = {}
    consumed: List[str] = []
    aliases = spec.get("aliases", {})
    for slot in spec["inputs"]:
        got = None
        if slot in pool:
            got = slot
        else:
            for alias in aliases.get(slot, []):
                if alias in pool:
                    got = alias
                    break
        if got is not None:
            bound[slot] = pool[got]
            # chain evidence only when the used value is a genuine
            # earlier output, not an explicit per-child override
            if got in produced and got not in overridden:
                consumed.append(got)
    missing = [s for s in spec["inputs"] if s not in bound]
    return bound, missing, consumed


def _try_derive(slot: str, spec: Dict[str, Any], pool: Dict[str, Any]
                ) -> Optional[float]:
    """Derive a missing input from its own inputs (e.g. amount from P,r,t)."""
    key = spec.get("derive", {}).get(slot)
    if not key or key not in FORMULAS:
        return None
    dspec = FORMULAS[key]
    dbound, dmissing, _ = _bind_inputs(dspec, pool, [], set())
    if dmissing:
        return None
    try:
        return _clean(dspec["fn"](**dbound))
    except Exception:  # pragma: no cover - numeric edge
        return None


def _evaluate_hop(spec: Dict[str, Any], values: Dict[str, Any],
                  produced: List[str], overridden: set) -> Dict[str, Any]:
    """Evaluate one formula against the pool.  Never raises.

    Returns {"ok", "value", "bound", "consumed", "derived",
             "missing", "reason"}.
    """
    bound, missing, consumed = _bind_inputs(spec, values, produced, overridden)
    derived: List[str] = []
    for slot in list(missing):
        dv = _try_derive(slot, spec, values)
        if dv is not None:
            bound[slot] = dv
            missing.remove(slot)
            derived.append(slot)
    if missing:
        return {"ok": False, "missing": missing,
                "reason": f"missing input(s) {missing}", "bound": bound,
                "consumed": consumed, "derived": derived}
    try:
        raw = spec["fn"](**bound)
    except Exception as exc:
        return {"ok": False, "missing": [], "bound": bound,
                "consumed": consumed, "derived": derived,
                "reason": f"computation error: {exc}"}
    value = _clean(raw)
    if value is None or abs(value) >= PLAUSIBILITY_CEILING:
        return {"ok": False, "missing": [], "bound": bound,
                "consumed": consumed, "derived": derived,
                "reason": "implausible or non-finite result"}
    return {"ok": True, "value": value, "bound": bound, "missing": [],
            "consumed": consumed, "derived": derived}


def _binding_line(bound: Dict[str, Any]) -> str:
    return ", ".join(f"{k}={_fmt(v)}" for k, v in sorted(bound.items()))


# --------------------------------------------------------------------------- #
# TASK 1: Case builder
# --------------------------------------------------------------------------- #


def build_case(passage: str, sub_questions: List[dict]) -> dict:
    """Build and solve a Case-Based question from a passage + 3-5
    sub-questions sharing the passage data (TOPIC + VALUES spec).

    Each sub-question dict: {"question": str, "computation": formula
    key, "values": optional overrides}.  Children are solved in order
    against a shared pool (passage values + previously produced
    answers); a child consuming an earlier child's output flips the
    case flag "chain" to true.
    """
    if not isinstance(sub_questions, list) or \
            not (MIN_CHILDREN <= len(sub_questions) <= MAX_CHILDREN):
        got = len(sub_questions) if isinstance(sub_questions, list) \
            else type(sub_questions).__name__
        raise ValueError(
            f"build_case requires {MIN_CHILDREN}-{MAX_CHILDREN} "
            f"sub-questions, got {got}")

    case_id = _stable_id("case", {"passage": passage})
    base = _extract_values(passage)
    pool: Dict[str, Any] = dict(base)
    produced: List[str] = []
    children: List[dict] = []
    any_chain = False

    for i, sq in enumerate(sub_questions):
        sq = sq if isinstance(sq, dict) else {}
        question = str(sq.get("question") or sq.get("text") or "")
        computation = str(sq.get("computation") or sq.get("formula")
                          or sq.get("key") or "")
        # layering: shared pool < question text < explicit spec values
        values = dict(pool)
        extracted = _extract_values(question)
        values.update(extracted)
        explicit = sq.get("values") or {}
        values.update(explicit)
        overridden = set(explicit) | set(extracted)

        child: Dict[str, Any] = {
            "child_id": f"{case_id}_{_ROMAN[i]}",
            "question": question,
            "computation": computation,
        }
        spec = FORMULAS.get(computation)
        if spec is None:
            child.update(answer=None, produces=None, steps=[],
                         uses_previous=[],
                         refusal_reason=f"unknown computation '{computation}'")
            children.append(child)
            continue

        res = _evaluate_hop(spec, values, produced, overridden)
        child["produces"] = spec["produces"]
        child["uses_previous"] = list(res.get("consumed", []))
        steps = [f"{spec['expr']} with {_binding_line(res['bound'])}"]
        if res["ok"]:
            answer = res["value"]
            steps.append(f"-> {spec['produces']} = {_fmt(answer)}"
                         + (f" ({spec.get('note', '')})"
                            if spec.get("note") else ""))
            for slot in res["derived"]:
                steps.append(f"({slot} derived via "
                             f"{spec.get('derive', {}).get(slot)})")
            pool[spec["produces"]] = answer
            produced.append(spec["produces"])
            for slot in res["derived"]:
                if slot not in produced:
                    produced.append(slot)
                if slot not in pool:
                    pool[slot] = res["bound"][slot]
            child["answer"] = answer
            if res["consumed"]:
                any_chain = True
        else:
            child["answer"] = None
            child["refusal_reason"] = (
                f"no verified computation: {res['reason']}")
        child["steps"] = steps
        children.append(child)

    return {"case_id": case_id, "passage": passage,
            "children": children, "chain": any_chain}


# --------------------------------------------------------------------------- #
# TASK 2: Chain composer
# --------------------------------------------------------------------------- #


def compose_chain(keys: List[str], linking_quantities: List[str],
                  values: Optional[dict]) -> dict:
    """Compose a genuine multi-concept chain: hop A's output feeds hop B.

    keys               concept keys into FORMULAS (max MAX_HOPS)
    linking_quantities names of the quantities that link the hops
    values             base values for the first hop

    Linear rule: each hop's output is the NEXT hop's input.  If any hop
    cannot compute, return every completed step plus an honest refusal
    (guided practice; the answer is withheld).  v1 refuses
    cross-subject chains.
    """
    if not isinstance(keys, list) or not keys:
        raise ValueError("compose_chain needs a non-empty list of hop keys")
    if len(keys) > MAX_HOPS:
        raise ValueError(f"max {MAX_HOPS} hops, got {len(keys)}")
    unknown = [k for k in keys if k not in FORMULAS]
    if unknown:
        raise ValueError(f"unknown hop key(s): {unknown}")
    linking = list(linking_quantities or [])
    base_values = dict(values or {})
    chain_id = _stable_id("chain", {"keys": keys, "linking": linking})

    plan = [{"key": k, "compute": FORMULAS[k]["expr"],
             "produces": FORMULAS[k]["produces"], "consumes": None}
            for k in keys]

    subjects = sorted({FORMULAS[k]["subject"] for k in keys})
    if not _subjects_allowed(subjects):
        return _refusal(chain_id, plan, [],
                        f"cross-subject chain refused in v1 "
                        f"(subjects: {subjects}); chains stay within "
                        f"one curriculum thread")

    pool: Dict[str, Any] = dict(base_values)
    produced: List[str] = []
    steps: List[str] = []

    for i, key in enumerate(keys):
        spec = FORMULAS[key]
        prev_produced = list(produced)
        res = _evaluate_hop(spec, pool, prev_produced, set())
        if res["ok"]:
            for slot in res["derived"]:
                if slot not in produced:
                    produced.append(slot)   # derived inside this hop
                if slot not in pool:
                    pool[slot] = res["bound"][slot]
        if not res["ok"]:
            return _refusal(
                chain_id, plan, steps,
                f"hop {i + 1} '{key}' failed: {res['reason']}",
                completed_hops=i)
        if i > 0 and not set(res["consumed"]) & set(prev_produced):
            return _refusal(
                chain_id, plan, steps,
                f"broken chain: hop {i + 1} '{key}' consumes none of the "
                f"linking quantity/ies {linking} produced earlier "
                f"({prev_produced})",
                completed_hops=i)
        value = res["value"]
        plan[i]["consumes"] = (res["consumed"][0]
                               if res["consumed"] else None)
        steps.append(
            f"hop {i + 1} [{key}]: {spec['expr']} with "
            f"{_binding_line(res['bound'])} -> {spec['produces']} = "
            f"{_fmt(value)}")
        for slot in res["derived"]:
            steps.append(f"  ({slot} derived within hop {i + 1} via "
                         f"{spec.get('derive', {}).get(slot)})")
        pool[spec["produces"]] = value
        if spec["produces"] not in produced:
            produced.append(spec["produces"])

    return {"chain_id": chain_id, "hops": plan, "answer": pool[plan[-1]["produces"]],
            "produces": plan[-1]["produces"], "steps": steps,
            "values": dict(pool), "linking_quantities": linking,
            "degradation": None, "degradation_policy": DEGRADATION_POLICY,
            "refusal_reason": None}


def _refusal(chain_id: str, plan: List[dict], steps: List[str],
             reason: str, completed_hops: int = 0) -> dict:
    return {"chain_id": chain_id, "hops": plan, "answer": None,
            "produces": None, "steps": list(steps), "values": {},
            "linking_quantities": [], "degradation": GUIDED,
            "degradation_policy": DEGRADATION_POLICY,
            "refusal_reason": reason, "completed_hops": completed_hops}


# --------------------------------------------------------------------------- #
# TASK 3: Case generator from the question bank
# --------------------------------------------------------------------------- #

_BANK_QTEXT_KEYS = ("question", "text", "q")


def _bank_question_text(item: Any) -> str:
    if isinstance(item, str):
        return item
    if isinstance(item, dict):
        for k in _BANK_QTEXT_KEYS:
            if item.get(k):
                return str(item[k])
    return ""


def _infer_computation(question: str, context: str = "") -> str:
    """Deterministic computation guess for a bank question.

    Unknown => "unknown" (the child then degrades honestly instead of
    carrying a guessed answer).
    """
    low = (question or "").lower()
    ctx = (context or "").lower()
    if re.search(r"simple\s+interest", low):
        return "simple_interest"
    if re.search(r"[0-9]\s*%\s*of|percent\s+of", low):
        return "percent_of"
    if re.search(r"differ\w+|how\s+much\s+(?:more|less)", low):
        return "subtraction"
    if "compound" in low or ("compound" in ctx and "amount" in low):
        if "interest" in low:
            return "compound_interest"
        return "compound_amount"
    if "amount" in low and re.search(
            r"\b(?:after|in|for)\s+[0-9]+\s+years?\b", low):
        return "compound_amount"
    return "unknown"


def _parse_official(value: Any) -> Optional[float]:
    if isinstance(value, bool):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        m = _MONEY_RE.search(value)
        if m:
            try:
                return float(m.group(1).replace(",", ""))
            except ValueError:  # pragma: no cover
                return None
        m = _NUM_RE.search(value)
        if m:
            try:
                return float(m.group(0).replace(",", ""))
            except ValueError:  # pragma: no cover
                return None
    return None


def generate_case_from_bank(text: str, questions: List[dict]) -> dict:
    """Build a case cluster from a bank passage + 3-5 related questions.

    - detects shared data: the same numbers appearing in the passage
      and in more than one question;
    - marks "chain": true when a later question's computation consumes
      an earlier question's answer;
    - cross-checks bank-provided official answers when present.
    """
    if not isinstance(questions, list) or \
            not (MIN_CHILDREN <= len(questions) <= MAX_CHILDREN):
        got = len(questions) if isinstance(questions, list) \
            else type(questions).__name__
        raise ValueError(
            f"generate_case_from_bank requires {MIN_CHILDREN}-"
            f"{MAX_CHILDREN} questions, got {got}")

    passage_numbers = _numbers(text)
    specs: List[dict] = []
    for item in questions:
        item = item if isinstance(item, dict) else {}
        qtext = _bank_question_text(item)
        computation = (item.get("computation") or item.get("formula")
                       or _infer_computation(qtext, context=text))
        specs.append({"question": qtext, "computation": computation,
                      "values": _extract_values(qtext)})

    case = build_case(text, specs)

    question_numbers = [_numbers(c["question"]) for c in case["children"]]
    shared_data = False
    for i, child in enumerate(case["children"]):
        shared = question_numbers[i] & passage_numbers
        for j, other in enumerate(question_numbers):
            if j != i:
                shared |= question_numbers[i] & other
        child["shared_numbers"] = sorted(shared)
        child["shares_data"] = bool(shared) or bool(child.get("uses_previous"))
        shared_data = shared_data or child["shares_data"]

        official = _parse_official(
            questions[i].get("answer")) if isinstance(
            questions[i], dict) else None
        if official is not None:
            ans = child.get("answer")
            child["bank_answer"] = official
            child["matches_bank_answer"] = (
                ans is not None and abs(ans - official)
                <= max(0.01, 0.001 * abs(official)))

    case["shared_data"] = shared_data
    return case


__all__ = ["build_case", "compose_chain", "generate_case_from_bank",
           "FORMULAS", "MAX_HOPS", "MIN_CHILDREN", "MAX_CHILDREN",
           "DEGRADATION_POLICY", "GUIDED"]
