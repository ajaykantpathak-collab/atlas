"""tiered_response.py -- Wave 9.8 Contract A tier stamping.

Every ``answer()`` result carries a badge (the old truth label) that the
badge gate owns.  This module adds a SECOND, additive layer -- the
student-facing tier -- without ever touching badge/verdict/answer:

    answer_tier:     "verified" | "bank_similar" | "method_only" | "guided"
    trust:           {label, detail}  -- one-line human reason
    method:          {formula, steps, units, blanks} | None  (method_only)
    similar:         {stem, solution_steps, answer, source} | None
    check_endpoint:  "/api/solve/check" | None  (method_only only)

Decision order (Contract A):
    1. badge VERIFIED*                  -> "verified"
    2. bank hit with an answer          -> "bank_similar"
    3. model_problem() recognised a
       family/structure (verifier na OK) -> "method_only"
    4. otherwise                        -> "guided"

The stamp never changes the badge/verdict decision -- it is metadata
layered on top, and method payloads carry no numeric final answer (the
/solve/check endpoint exists so the student can test their own number
without us revealing it).

LEAK SCRUB (wave98 review fix, L2-flagged MEDIUM): on every non-verified
tier the answer is withheld, so the LEGACY student-facing fields must not
smuggle it back either -- the live repro shipped `answer: null` +
`answer_tier: bank_similar` while top-level `steps` still said
"Verification: ... reproduces 5/12" (and `socratic.board_steps` ended
"therefore 5/12").  For non-verified results the stamp now blanks the
computed answer's surface forms (____) inside `steps`,
`socratic.board_steps` and any stray `working`/`solution`/`explanation`
fields, and forces `answer`/`numeric` to None.  `verified` results are
untouched -- that tier is allowed to show everything.
"""

from __future__ import annotations

import logging
import math
import re
from typing import Any, Dict, List, Optional, Tuple

log = logging.getLogger(__name__)

CHECK_ENDPOINT = "/api/solve/check"

_TRUST = {
    "verified": ("Verified",
                 "Re-derived two independent ways"),
    "bank_similar": ("Similar board question",
                     None),  # detail built from the source below
    "method_only": ("Method confirmed",
                    "Method confirmed; final number not independently "
                    "checked"),
    "guided": ("Let's build it together",
               "We could not verify this one — let's build it together"),
}

DISCLAIMER_AI_ASSISTED = (
    "AI-Assisted Explanation: Generated for conceptual understanding. "
    "For board exams, official dates, and final marking schemes, always refer to your prescribed textbook."
)


_DIGIT_RUN = re.compile(r"\d+(?:[.,]\d+)*")


def _is_verified(label: str) -> bool:
    return str(label or "").upper().startswith("VERIFIED")


def _answer_digit_runs(*sources: Any) -> set:
    """Digit substrings of the (possibly withheld) answer that must never
    appear inside a method payload — from the pipeline result AND from
    the model's own computed answer (numeric_answer/final_answer)."""
    out = set()
    for src in sources:
        if src is None:
            continue
        for attr in ("numeric", "numeric_answer"):
            n = getattr(src, attr, None)
            if isinstance(n, (int, float)) and not isinstance(n, bool):
                out.add(("%g" % n))
                out.add(str(n))
        for attr in ("answer", "final_answer"):
            a = getattr(src, attr, None)
            if a:
                out.update(m.group(0)
                           for m in _DIGIT_RUN.finditer(str(a)))
                out.add(str(a).strip())
    out.discard("")
    return out


def _scrub_answer_digits(text: str, banned: set) -> str:
    """Remove digit runs matching the withheld answer from a step line."""
    s = str(text or "")
    for tok in sorted(banned, key=len, reverse=True):
        if tok and any(ch.isdigit() for ch in tok):
            s = s.replace(tok, "____")
        elif tok:
            s = s.replace(tok, "____")
    return s


def _answer_surface_tokens(*sources: Any) -> set:
    """Surface forms of the (possibly withheld) computed answer that the
    legacy-field scrub must blank: whole answer strings, numeric
    renderings (%g + str), and the bare digit-run when the answer IS a
    single digit-run ("50 km/h" -> "50").

    A multi-run composite answer ("5/12", "(3, 4)") bans only the whole
    token plus its compact/spaced joiner variants -- its sub-runs (5, 12)
    are typically stated givens the surviving method steps must keep
    readable.  Only digit-bearing tokens are returned (the leak class is
    the computed NUMBER)."""
    out: set = set()
    for src in sources:
        if src is None:
            continue
        is_map = isinstance(src, dict)
        for attr in ("numeric", "numeric_answer"):
            n = (src.get(attr) if is_map
                 else getattr(src, attr, None))
            if isinstance(n, (int, float)) and not isinstance(n, bool):
                out.add("%g" % n)
                out.add(str(n))
        for attr in ("answer", "final_answer"):
            a = (src.get(attr) if is_map
                 else getattr(src, attr, None))
            if not a:
                continue
            s = str(a).strip()
            if not s:
                continue
            out.add(s)
            runs = _DIGIT_RUN.findall(s)
            if len(runs) == 1:
                out.add(runs[0])
            else:
                m = re.search(
                    r"(\d+(?:[.,]\d+)*)(\s*[/:,]\s*)(\d+(?:[.,]\d+)*)",
                    s)
                if m:
                    joiner = m.group(2).strip()
                    out.add(m.group(0))
                    out.add(m.group(1) + joiner + m.group(3))
                    out.add(m.group(1) + " " + joiner + " " + m.group(3))
    return {t for t in out if t and any(ch.isdigit() for ch in t)}


def _get(result: Any, name: str) -> Any:
    if isinstance(result, dict):
        return result.get(name)
    return getattr(result, name, None)


def _set(result: Any, name: str, value: Any) -> None:
    try:
        if isinstance(result, dict):
            result[name] = value
        else:
            setattr(result, name, value)
    except Exception:  # noqa: BLE001 -- scrub must never break the stamp
        pass


def _scrub_value(v: Any, banned: set) -> Any:
    """Blank answer tokens out of a student-facing field.  Returns None
    (drop the field) for shapes blanking can't be made safe for."""
    if isinstance(v, str):
        return _scrub_answer_digits(v, banned)
    if isinstance(v, (list, tuple)):
        return [_scrub_value(x, banned) if isinstance(
                    x, (str, list, tuple, dict)) else x
                for x in v]
    if isinstance(v, dict):
        return {k: (_scrub_value(x, banned) if isinstance(
                    x, (str, list, tuple, dict)) else x)
                for k, x in v.items()}
    return None


_EXTRA_TEXT_FIELDS = ("working", "solution", "explanation")


def _scrub_legacy_answer_fields(result: Any, banned: set) -> None:
    """On a non-verified tier the answer is withheld -- so the legacy
    student-facing fields must not ship it either.

      - ``answer`` / ``numeric`` cannot be blanked -> forced to None
        (the contract already says they are None off verified tiers;
        this enforces it even on a stray carry-over).
      - ``steps`` and ``socratic.board_steps`` get the same ____ blanking
        as ``method.steps``.
      - stray ``working``/``solution``/``explanation`` fields (attrs or
        dict keys) are scrubbed in shape, or dropped when their shape
        can't be blanked safely.

    Never raises -- a scrub failure leaves the field as it was.
    """
    try:
        if _get(result, "answer") is not None:
            _set(result, "answer", None)
        if _get(result, "numeric") is not None:
            _set(result, "numeric", None)
    except Exception:  # noqa: BLE001
        pass
    try:
        steps = _get(result, "steps")
        if isinstance(steps, (list, tuple)):
            _set(result, "steps",
                 [_scrub_answer_digits(s, banned) for s in steps])
        elif isinstance(steps, str):
            _set(result, "steps", _scrub_answer_digits(steps, banned))
    except Exception:  # noqa: BLE001
        pass
    try:
        soc = _get(result, "socratic")
        if isinstance(soc, dict):
            bs = soc.get("board_steps")
            if isinstance(bs, (list, tuple)):
                soc["board_steps"] = [
                    _scrub_answer_digits(s, banned) for s in bs]
    except Exception:  # noqa: BLE001
        pass
    for fname in _EXTRA_TEXT_FIELDS:
        try:
            v = _get(result, fname)
            if v is not None:
                _set(result, fname, _scrub_value(v, banned))
        except Exception:  # noqa: BLE001
            pass


# --------------------------------------------------------------------------- #
# AMBIGUITY CROSS-CHECK (wave98 hardening)
#
# Residual risk from review: the same parse that routes also supplies the
# method — a stem that mis-parses into the wrong family shows a
# correct-looking but WRONG method (SI stem -> CI method).  The registry
# sweep already runs every family; the winner's coherent rivals now ride
# ``ModelResult.alternates`` (populated in modeling_layer's single sweep —
# no second pass, no added latency).  When a DIFFERENT family also
# confidently matches AND expects a different answer, the honest tier is
# guided — never show one plausible method while a rival reading stands.
# --------------------------------------------------------------------------- #

RIVAL_MIN_CONF = 0.80      # a rival must be confident on its own merits
RIVAL_CONF_MARGIN = 0.15   # …and within this distance of the winner
_ANS_NUM_RE = re.compile(r"[-+]?\d+(?:,\d+)*(?:\.\d+)?")
_REL_TOL = 0.02            # same tolerance the solve/check verifier uses

# Unit table for answer agreement: two readings that produce the SAME
# quantity in different units ("50 km/h" vs "13.9 m/s") agree — that is
# not ambiguity, it is a units convention.  Only when answers are
# numerically different under conversion do the readings truly diverge.
_UNIT_TAIL_RE = re.compile(
    r"[-+]?\d[\d.,eE+-]*\s*"
    r"([a-zA-Zµμ°Ω₹]+(?:\s*(?:/|per)\s*[a-zA-Zµμ°Ω]+|[0-9²³^*]*)*)\s*$")

# unit -> (dimension, factor to the dimension's base unit)
_UNIT_TO_BASE = {
    "m": ("len", 1.0), "metre": ("len", 1.0), "meter": ("len", 1.0),
    "cm": ("len", 0.01), "mm": ("len", 0.001), "km": ("len", 1000.0),
    "s": ("time", 1.0), "sec": ("time", 1.0), "second": ("time", 1.0),
    "seconds": ("time", 1.0), "min": ("time", 60.0), "minute": ("time", 60.0),
    "minutes": ("time", 60.0), "h": ("time", 3600.0), "hr": ("time", 3600.0),
    "hour": ("time", 3600.0), "hours": ("time", 3600.0),
    "day": ("time", 86400.0), "days": ("time", 86400.0),
    "m/s": ("speed", 1.0), "mps": ("speed", 1.0), "ms-1": ("speed", 1.0),
    "km/h": ("speed", 1000.0 / 3600.0), "kmph": ("speed", 1000.0 / 3600.0),
    "km/hr": ("speed", 1000.0 / 3600.0), "kmh": ("speed", 1000.0 / 3600.0),
    "cm/s": ("speed", 0.01), "km/s": ("speed", 1000.0),
    "g": ("mass", 1.0), "kg": ("mass", 1000.0), "mg": ("mass", 0.001),
    "ml": ("vol", 0.001), "l": ("vol", 1.0), "litre": ("vol", 1.0),
    "litres": ("vol", 1.0), "liter": ("vol", 1.0), "liters": ("vol", 1.0),
    "m3": ("vol", 1000.0),
    "j": ("energy", 1.0), "kj": ("energy", 1000.0),
    "w": ("power", 1.0), "kw": ("power", 1000.0), "kwh": ("energy", 3.6e6),
    "pa": ("pressure", 1.0), "kpa": ("pressure", 1000.0),
    "a": ("current", 1.0), "ma": ("current", 0.001),
    "v": ("voltage", 1.0), "mv": ("voltage", 0.001), "kv": ("voltage", 1000.0),
    "ohm": ("resistance", 1.0), "kohm": ("resistance", 1000.0),
    "mohm": ("resistance", 1e6), "ω": ("resistance", 1.0),
    "hz": ("freq", 1.0), "khz": ("freq", 1000.0), "mhz": ("freq", 1e6),
    "rs": ("money", 1.0), "paise": ("money", 0.01), "₹": ("money", 1.0),
    "cm2": ("area", 1e-4), "m2": ("area", 1.0), "km2": ("area", 1e6),
    "cm3": ("vol", 1e-6), "mm3": ("vol", 1e-9),
}


def _answer_unit(final_answer: str) -> str:
    """Trailing unit token of the family's stated answer — '50 km/h' ->
    'km/h', '13.9 m/s' -> 'm/s', '12.5 s' -> 's'; '' when none."""
    a = str(final_answer or "").strip()
    if not a:
        return ""
    if re.match(r"^(?:rs\.?|inr\b|₹)\s*", a, re.I):
        return "rs"          # currency prefixes the number, not trails it
    m = _UNIT_TAIL_RE.search(a)
    if not m:
        return ""
    u = re.sub(r"\s+", "", m.group(1)).lower()
    u = u.replace("per", "/").replace("//", "/")
    return u


def expected_answer_key(res: Any) -> Optional[Tuple[str, Any, str]]:
    """The answer a family reading expects, as a comparable key:
    ("num", float, unit) when the family computed a number, else
    ("txt", normalized-string, "") from final_answer, else None."""
    n = getattr(res, "numeric_answer", None)
    if isinstance(n, (int, float)) and not isinstance(n, bool) \
            and math.isfinite(n):
        return ("num", float(n),
                _answer_unit(getattr(res, "final_answer", "") or ""))
    a = str(getattr(res, "final_answer", "") or "").strip()
    if not a:
        return None
    return ("txt", re.sub(r"\s+", " ", a.lower()), "")


def _num_close(a: float, b: float) -> bool:
    denom = max(abs(a), abs(b), 1e-300)
    return abs(a - b) / denom <= _REL_TOL \
        or (abs(b) > 1e-4 and abs(a - b) <= 1e-4)


def _nums_agree(va: float, ua: str, vb: float, ub: str) -> bool:
    """Same number, or the same quantity under a known unit conversion."""
    if _num_close(va, vb):
        return True
    if ua == ub:
        return False
    ca = _UNIT_TO_BASE.get(ua)
    cb = _UNIT_TO_BASE.get(ub)
    if ca and cb and ca[0] == cb[0]:
        return _num_close(va * ca[1], vb * cb[1])
    return False


def _answers_differ(ka: Optional[Tuple[str, Any, str]],
                    kb: Optional[Tuple[str, Any, str]]) -> bool:
    """True only when both readings commit to an answer AND those answers
    disagree — an uncommitted rival is never grounds for a downgrade."""
    if ka is None or kb is None:
        return False
    if ka[0] == "num" and kb[0] == "num":
        return not _nums_agree(ka[1], ka[2], kb[1], kb[2])
    if ka[0] == "txt" and kb[0] == "txt":
        return ka[1] != kb[1]
    # mixed: does the text answer contain the numeric one?
    txt = ka[1] if ka[0] == "txt" else kb[1]
    num = ka[1] if ka[0] == "num" else kb[1]
    nums = []
    for m in _ANS_NUM_RE.finditer(str(txt)):
        try:
            nums.append(float(m.group(0).replace(",", "")))
        except ValueError:
            continue
    if not nums:
        return True                # numeric vs non-numeric: differ
    return not any(_num_close(num, x) for x in nums)


def family_ambiguity(model: Any) -> Optional[Any]:
    """A confident ALTERNATE family reading that expects a different
    answer than the winner — the fail-closed signal.  Returns the rival
    ModelResult, else None.  Never raises; advisory only."""
    try:
        if model is None or not getattr(model, "matched", False):
            return None
        best_key = expected_answer_key(model)
        if best_key is None:
            return None
        best_conf = float(getattr(model, "confidence", 0.0) or 0.0)
        best_struct = str(getattr(model, "structure", "") or "")
        for alt in getattr(model, "alternates", None) or []:
            try:
                if not getattr(alt, "matched", False):
                    continue
                if str(getattr(alt, "structure", "") or "") == best_struct:
                    continue           # same reading, different wrapper
                ac = float(getattr(alt, "confidence", 0.0) or 0.0)
                if ac < RIVAL_MIN_CONF or ac < best_conf - RIVAL_CONF_MARGIN:
                    continue
                if _answers_differ(best_key, expected_answer_key(alt)):
                    return alt
            except Exception:  # noqa: BLE001 -- one bad rival can't veto
                continue
    except Exception:  # noqa: BLE001 -- advisory only
        return None
    return None


def _source_from_hit(bank_hit: Dict[str, Any]) -> str:
    meta = bank_hit.get("meta") or {}
    board = (bank_hit.get("board") or meta.get("board") or "").strip()
    year = bank_hit.get("year") or meta.get("year")
    if board and year:
        return f"{board} {year} paper"
    return "board question bank"


def _gate(s: str) -> str:
    """Slop/node-id scrub for student-visible payload text — the stamp
    runs after gate_result, so tier strings must pass the gate
    themselves.  Fail-open."""
    try:
        from backend.its.solver.slop_gate import gate_text
        clean, _flags = gate_text(str(s or ""))
        return clean
    except Exception:  # noqa: BLE001
        return str(s or "")


def _method_payload(model: Any, banned: set) -> Dict[str, Any]:
    """{formula, steps, units, blanks} with no numeric final answer.

    Every digit run that equals the withheld answer is blanked; answer
    text is likewise scrubbed.  Steps come from the recognised family's
    own working when present, else a generic skeleton."""
    formula = _gate(_scrub_answer_digits(
        getattr(model, "governing_equation", "") or "", banned)).strip()
    raw_steps = list(getattr(model, "steps", None) or [])
    steps: List[str] = []
    for s in raw_steps[:8]:
        line = _gate(_scrub_answer_digits(s, banned)).strip()
        if line:
            steps.append(line)
    quantities = getattr(model, "quantities", None) or {}
    blanks = [str(k) for k in quantities.keys()][:10]
    if not steps:
        steps = ["Identify the known quantities in the question.",
                 "Apply the governing relation.",
                 "Substitute the values and simplify."]
    if formula:
        steps.insert(0, f"Use {formula}.")
    return {"formula": formula,
            "steps": steps,
            "units": getattr(model, "units", None),
            "blanks": blanks}


def _similar_payload(bank_hit: Dict[str, Any]) -> Dict[str, Any]:
    steps = (bank_hit.get("solution_steps")
             or bank_hit.get("steps") or [])
    return {"stem": _gate(str(bank_hit.get("stem") or
                        bank_hit.get("matched_question") or "")),
            "solution_steps": [_gate(str(s)) for s in steps][:8],
            "answer": _gate(str(bank_hit.get("answer") or "")),
            "source": _source_from_hit(bank_hit)}


def stamp_tier(result: Any, *, bank_hit: Optional[Dict[str, Any]] = None,
               model: Any = None,
               question: Optional[str] = None,
               context: Optional[Dict[str, Any]] = None) -> Any:
    """Add Contract A fields to ``result`` in place and return it.

    Never raises and never mutates the badge/verdict decision -- a
    stamping failure leaves the result exactly as it arrived (log only).
    On non-verified tiers it DOES scrub the legacy student-facing fields
    (``steps``, ``socratic.board_steps``, stray ``working``/``solution``/
    ``explanation``) of the withheld computed answer and forces
    ``answer``/``numeric`` to None -- see the module docstring.  When
    ``model`` is absent (e.g. a bank_similar stamp that never ran the
    family sweep) and ``question`` is supplied, one memo-warm
    ``model_problem`` call derives the banned tokens.
    """
    try:
        label = str(getattr(result, "label", "") or "")
        tier = "guided"
        method = None
        similar = None
        check_endpoint = None

        if _is_verified(label):
            tier = "verified"
        elif bank_hit and bank_hit.get("answer"):
            tier = "bank_similar"
            similar = _similar_payload(bank_hit)
        elif model is not None and getattr(model, "matched", False) \
                and str(getattr(model, "structure", "") or "") \
                not in ("", "UNRECOGNIZED", "NONE"):
            # AMBIGUITY CROSS-CHECK (wave98): a confident rival family
            # expecting a DIFFERENT answer means the parse that picked
            # the method may have chosen wrong — fail closed to guided
            # rather than show a correct-looking wrong method.
            rival = family_ambiguity(model)
            if rival is not None:
                tier = "guided"
                try:
                    _aud = _get(result, "audit")
                    _route = _get(_aud, "route") if _aud is not None \
                        else None
                    if isinstance(_route, list):
                        _route.append(
                            "tier_ambiguity:"
                            + str(getattr(rival, "structure", "?")))
                except Exception:  # noqa: BLE001
                    pass
            else:
                tier = "method_only"
                method = _method_payload(
                    model, _answer_digit_runs(result, model))
                check_endpoint = CHECK_ENDPOINT
        # else: guided

        label_str, detail = _TRUST[tier]
        if tier == "bank_similar":
            detail = ("Same question type from a "
                      f"{similar['source']}, fully solved")
        # Wave 9.8 L4 (additive): a guided stem whose bank row carries
        # marking data (marking_scheme / model_answer) is prose-gradable —
        # FE shows "paste your answer, I'll mark it" via /api/prose/grade.
        # Cheap exact-norm probe, budgeted, fail-open: never sets True on
        # any other tier and never blocks the stamp.
        if tier == "guided" and question:
            try:
                from backend.services.marking_scheme_grader import (
                    has_marking_data as _has_md)
                if _has_md(str(question), context=context):
                    result.gradable = True
            except Exception as _ge:  # noqa: BLE001 -- additive only
                log.debug("gradable probe degraded: %s",
                          type(_ge).__name__)
        result.answer_tier = tier
        result.trust = {"label": label_str, "detail": detail}
        result.method = method
        result.similar = similar
        result.check_endpoint = check_endpoint

        # AI disclaimer banner logic: attach when match confidence < 0.75,
        # or when unverified/guided/assumed/LLM explanation is served.
        conf = getattr(result, "confidence", None)
        if conf is None:
            audit_obj = getattr(result, "audit", None)
            if audit_obj and getattr(audit_obj, "confidence", None) is not None:
                conf = getattr(audit_obj, "confidence", None)

        if conf is not None and conf < 0.75:
            result.disclaimer = DISCLAIMER_AI_ASSISTED
        elif tier in ("guided", "method_only"):
            result.disclaimer = DISCLAIMER_AI_ASSISTED
        elif getattr(result, "llm_used", False) or label in ("VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_ASSUMED"):
            result.disclaimer = DISCLAIMER_AI_ASSISTED
        else:
            result.disclaimer = None
        result.confidence = conf

        # LEAK SCRUB (L2-flagged MEDIUM): the withheld answer must not
        # ride out inside the legacy fields.  Verified results skip this
        # entirely -- that tier is allowed to show everything.
        if tier != "verified":
            try:
                if model is None and question:
                    from backend.its.solver.modeling_layer import (
                        model_problem as _tier_mp)
                    model = _tier_mp(str(question))
            except Exception as exc:  # noqa: BLE001 -- fail-open
                log.debug("stamp_tier scrub model degraded: %s",
                          type(exc).__name__)
            _scrub_legacy_answer_fields(
                result, _answer_surface_tokens(result, model))
    except Exception as exc:  # noqa: BLE001 -- additive metadata only
        log.debug("stamp_tier degraded: %s", type(exc).__name__)
    return result


def tier_fields(result: Any) -> Dict[str, Any]:
    """Serialize the Contract A fields off a stamped result (always
    present, null-safe for unstamped/older results)."""
    return {
        "answer_tier": getattr(result, "answer_tier", None),
        "trust": getattr(result, "trust", None),
        "method": getattr(result, "method", None),
        "similar": getattr(result, "similar", None),
        "check_endpoint": getattr(result, "check_endpoint", None),
        "gradable": getattr(result, "gradable", None),
        "confidence": getattr(result, "confidence", None),
        "disclaimer": getattr(result, "disclaimer", None),
    }


def best_available_payload(question: str,
                           context: Optional[Dict[str, Any]] = None
                           ) -> Dict[str, Any]:
    """Surrender-first payload: the best honest tier for `question`
    WITHOUT claiming verification -- bank_similar if the bank has a
    fully-solved same-type question, else method_only when a family
    recognises the structure, else guided.  Always labelled unverified.

    Never raises; the guided fallback is always available.
    """
    payload = {"verified": False,
               "answer_tier": "guided",
               "trust": {"label": _TRUST["guided"][0],
                         "detail": _TRUST["guided"][1]},
               "method": None,
               "similar": None,
               "check_endpoint": None,
               "gradable": None}
    try:
        from backend.its.solver.bank_answer import similar
        hit = similar(question, context=context)
    except Exception as exc:  # noqa: BLE001
        log.debug("reveal bank-similar degraded: %s", type(exc).__name__)
        hit = None
    if hit and hit.get("answer"):
        similar = _similar_payload(hit)
        payload.update({
            "answer_tier": "bank_similar",
            "trust": {"label": _TRUST["bank_similar"][0],
                      "detail": ("Same question type from a "
                                 f"{similar['source']}, fully solved")},
            "similar": similar})
        return payload
    try:
        from backend.its.solver.modeling_layer import model_problem
        model = model_problem(question or "")
    except Exception as exc:  # noqa: BLE001
        log.debug("reveal model_problem degraded: %s", type(exc).__name__)
        model = None
    if model is not None and getattr(model, "matched", False) \
            and str(getattr(model, "structure", "") or "") \
            not in ("", "UNRECOGNIZED", "NONE") \
            and family_ambiguity(model) is None:
        # the model's own computed answer is the leak surface here —
        # blank its digit runs out of the method payload
        banned = _answer_digit_runs(model)
        payload.update({
            "answer_tier": "method_only",
            "trust": {"label": _TRUST["method_only"][0],
                      "detail": _TRUST["method_only"][1]},
            "method": _method_payload(model, banned),
            "check_endpoint": CHECK_ENDPOINT})
    # Wave 9.8 L4: a guided stem whose bank row carries marking data is
    # prose-gradable — the FE offers "paste your answer, I'll mark it".
    if payload["answer_tier"] == "guided" and question:
        try:
            from backend.services.marking_scheme_grader import (
                has_marking_data as _has_md)
            if _has_md(str(question), context=context):
                payload["gradable"] = True
        except Exception:  # noqa: BLE001 -- additive only
            pass
    return payload
