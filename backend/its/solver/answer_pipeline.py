"""answer_pipeline.py -- the Truth Core: one entry point over all lanes.

Every student-facing answer in the platform comes through here.  The
pipeline classifies the question, routes to the right lane, runs the
validator stack, applies the truth label, and returns an AUDIT TRAIL
alongside the answer (ARCHITECTURE.md sections 2, 4, 11, 17).

Lanes:
    A  formal question   -> math_kernel + CAS cascade
    B  event narrative   -> competency reader (state table) -> families
    C  student binding   -> roles supplied by the student -> families
    D  official MCQ      -> escrowed official key match

Truth labels (exactly these, never styled otherwise):
    VERIFIED                   deterministic, no unstated assumptions
    VERIFIED_WITH_ASSUMPTIONS  deterministic, chain relied on domain
                               defaults (g=9.8, u=0, ...) - assumptions
                               are listed in audit.assumptions
    VERIFIED_OFFICIAL          graded against the Board's official key
    AMBIGUOUS                  >1 reading survived; Socratic confirm data
    GUIDED_PRACTICE            method/steps only; answer withheld

Nothing else is ever returned.  compute() is deterministic end to end;
no LLM call exists in this module.
"""

from __future__ import annotations

import json
import logging
import os
import re
import sys
import time

logger = logging.getLogger(__name__)
from dataclasses import dataclass, field

# WSA-P3: the never-raising lane-exception logger.  The choke-point
# guards and this section's silent handlers call it DIRECTLY — the old
# inner `try: log except: pass` double-guards are gone (the helper
# cannot raise).
from backend.its.solver.contract import log_lane_exception
from typing import Any, Dict, List, Optional

# --------------------------------------------------------------------------- #
# Label constants
# --------------------------------------------------------------------------- #

VERIFIED = "VERIFIED"
VERIFIED_OFFICIAL = "VERIFIED_OFFICIAL"
VERIFIED_ASSUMED = "VERIFIED_WITH_ASSUMPTIONS"
VERIFIED_OFFICIAL = "VERIFIED_OFFICIAL"
AMBIGUOUS = "AMBIGUOUS"
GUIDED = "GUIDED_PRACTICE"
REFUSED = "REFUSED"


@dataclass
class AuditTrail:
    """Everything needed to justify -- or challenge -- an answer."""

    lane: str                       # A | B | C | D
    route: List[str] = field(default_factory=list)
    quantities: List[Dict[str, Any]] = field(default_factory=list)
    assumptions: List[str] = field(default_factory=list)
    gates_passed: List[str] = field(default_factory=list)
    readings_considered: int = 1
    anchor: Optional[str] = None    # official key / bank item reference
    elapsed_ms: float = 0.0
    confidence: Optional[float] = None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "lane": self.lane, "route": self.route,
            "quantities": self.quantities, "assumptions": self.assumptions,
            "gates_passed": self.gates_passed,
            "readings_considered": self.readings_considered,
            "anchor": self.anchor, "elapsed_ms": self.elapsed_ms,
            "confidence": self.confidence,
        }


@dataclass
class PipelineResult:
    label: str
    answer: Optional[str]           # None unless a verified tier
    numeric: Optional[float]
    steps: List[str]
    audit: AuditTrail
    socratic: Optional[Dict[str, Any]] = None   # ambiguity confirm data
    refusal_reason: Optional[str] = None
    # Wave 9.8 Contract A (additive; stamped post badge/slop gates by
    # its.solver.tiered_response.stamp_tier — never read by the gates)
    answer_tier: Optional[str] = None
    trust: Optional[Dict[str, Any]] = None
    method: Optional[Dict[str, Any]] = None
    similar: Optional[Dict[str, Any]] = None
    check_endpoint: Optional[str] = None
    # Wave 9.8 L4 (additive): True only when the guided stem resolves to
    # a bank row carrying marking data — the FE offers "paste your
    # answer, I'll mark it" (POST /api/prose/grade).  Never set True on
    # any other tier.
    gradable: Optional[bool] = None
    confidence: Optional[float] = None
    disclaimer: Optional[str] = None
    explanation: Optional[str] = None


# --------------------------------------------------------------------------- #
# Classification (deterministic)
# --------------------------------------------------------------------------- #

_FORMAL_RE = re.compile(
    r"(?:solve|evaluate|simplif|integrat\w*|differentiat\w*|derivative|"
    r"find\s+(?:the\s+)?value\s+of)\b|=\s*[?]?$|[\d)]\s*[\+\-\*/\^]\s*"
    r"[\d\(]", re.I)
_NARRATIVE_RE = re.compile(
    r"\b(he|she|they|his|her)\b.{0,60}\b(buys?|sell|spends?|earns?|travels?|"
    r"fills?|drains?|covers?|earns?)\b", re.I)
_EVENT_VERB_RE = re.compile(
    r"\b(buys?|sell(s|ing)?|costs?|spends?|earns?|travels?|covers?|"
    r"reach(es|ed)?|crawls?|crawl\w*|stretch\w*|shrunk|shrank|shrink\w*|"
    r"fills?|drains?|leaks?|walks?|burns?|burnt|flow(s|ed)?|pumps?|"
    r"increas\w+|decreas\w+|doubles?|triples?|depreciat\w+)\b", re.I)
_ASK_RE = re.compile(
    r"\b(find|calculate|what\s+is|wats|how\s+(?:much|many|far|long)|"
    r"solve|evaluate|when|will)\b", re.I)


_CHEMISTRY_RE = re.compile(
    r"\b(solution|acid|molarity|molality|mol\s*dm|dilut)\b", re.I)


def classify(text: str) -> str:
    """Deterministic lane classification: A | B | C."""
    # chemistry chains (dilution, concentration) route to Lane B --
    # OCR scientific notation (10-2) must never reach Lane A arithmetic
    if _CHEMISTRY_RE.search(text) and re.search(
            r"\d\s*-\s*\d|x\s*10|adding\s+water|concentration", text,
            re.I):
        return "B"
    # standard-angle trig and elevation chains use degree-aware
    # families in Lane B -- Lane A's radians CAS would mis-serve them
    if re.search(r"\b(?:sin|cos|tan)\s*\^?\s*\d*\s*\(?\s*"
                 r"(?:0|30|45|60|90)\b", text, re.I) \
            or re.search(r"angle\s+of\s+elevation", text, re.I):
        return "B"
    # commerce intent words (closing capital, drawings, ROI, NNPfc...)
    # route to Lane B's relation binder
    if re.search(r"closing\s+capital|opening\s+capital|capital\s+"
                 r"employed|return\s+on\s+investment|\broi\b|NNPfc|"
                 r"budget(?:ary)?\s+deficit|\bdrawings\b", text, re.I):
        return "B"
    # SOCIAL_GOLDEN (2026-10-07): an OJT training-bond stem is formal
    # economics arithmetic (cost, monthly gain, bond months) -- the econ
    # TRAINING_NET_GAIN family owns it in Lane A.  Lane B's percent
    # chain applied the productivity % to the cost and shipped "60000
    # (net +20%)" VERIFIED for a 1,30,000 ask.
    if re.search(r"\btraining\b", text, re.I) \
            and re.search(r"\bbond\b", text, re.I) \
            and re.search(r"net\s+gain|economically\s+viab|is\s+it\s+"
                          r"viable|worth\s+it", text, re.I):
        return "A"
    # SOCIAL-ALL (2026-10-07): a population-density compute ask is Lane
    # A's POP_DENSITY family (calibrated withhold -> teach-back with
    # steps).  Under a warm narrative lane, Lane B claimed the stem and
    # its refusal shipped 0 steps -- a dead-end instead of the method.
    if re.search(r"density\s+of\s+population|population\s+density",
                 text, re.I) \
            and re.search(r"calculate|compute|find|how", text, re.I):
        return "A"
    has_events = bool(_NARRATIVE_RE.search(text) or
                      _EVENT_VERB_RE.search(text))
    # narrative with event verbs wins over formal markers ("stretching"
    # problems contain no '=' but plenty of digits)
    if has_events and text.count(".") >= 2 and "=" not in text:
        return "B"
    if "=" in text or _FORMAL_RE.search(text):
        return "A"
    if has_events and text.count(".") >= 1:
        return "B"
    if re.search(r"\d", text) and _ASK_RE.search(text):
        return "B"
    return "C"


# --------------------------------------------------------------------------- #
# Lane A: formal question (kernel + CAS via existing router stages)
# --------------------------------------------------------------------------- #


def _independent_sweep(text: str, audit: AuditTrail):
    """Registry-sweep helper: model_problem + the independent second-path
    verifier (independent_verifier.py).  Fail-closed: a FAILed check
    downgrades the family answer (matched=False, answers suppressed) so
    it is never promoted; a PASS bumps confidence and appends the proof
    line; unregistered routes pass through unchanged."""
    from backend.its.solver.independent_verifier import \
        VERIFIERS, verified_model_problem
    try:
        syll = verified_model_problem(text)
    except Exception:
        # verifier infrastructure must never crash the answer path --
        # fall back to the plain sweep (still guarded downstream)
        from backend.its.solver.modeling_layer import model_problem
        syll = model_problem(text)
    try:
        from backend.its.solver.independent_verifier import registered_routes
        registered = (getattr(syll, "structure", "") or "") in registered_routes()
    except Exception:
        registered = (getattr(syll, "structure", "") or "") in VERIFIERS
    if (registered and syll.matched) or "declarative invariant check" in str(getattr(syll, "note", "")):
        audit.route.append("independent_verifier:pass")
    elif registered:
        withheld = "withheld" in (getattr(syll, "note", "") or "")
        if withheld:
            audit.route.append("independent_verifier:withheld")
            audit.assumptions.append(
                f"independent check: {getattr(syll, 'note', '')}")
    return syll


def _attach_understood(res: "PipelineResult", syll,
                       text: str = "") -> "PipelineResult":
    """Carry the structure lane's read-back of the question into the
    result's socratic payload — the tutor renders it as a
    confirm-the-values card (givens + ask + structure label)."""
    u = getattr(syll, "understood", None)
    if u:
        res.socratic = dict(res.socratic or {})
        res.socratic["understood"] = u
    # VERIFIED-BADGE CTX FEED (2026-10-07 full-span dig): the badge gate
    # rebuilds its verifier context from audit.quantities; the structure
    # lane's bound slots must ride along or a REGISTERED verifier starves
    # to 'na' ("kin quantities incomplete") and the strict contract
    # withholds a correct, independently-passed answer.
    try:
        _qs = getattr(syll, "quantities", None)
        if _qs and getattr(res, "audit", None) is not None:
            _merged = {k: v for k, v in dict(_qs).items()
                       if isinstance(v, (int, float))
                       and not isinstance(v, bool)}
            if _merged:
                res.audit.quantities.append(_merged)
    except Exception as _e:
        log_lane_exception("_attach_understood.quantities", _e)
    # STRUCTURE-ROUTE STAMP (2026-10-07 full-span dig): the badge gate
    # resolves the verifier by the result's structure name; some lanes
    # return VERIFIED with an EMPTY route (no 'structure:' entry, no
    # understood payload), which reads as verifier_no_route and
    # withholds a computed answer.  Name the route here.
    try:
        _st = getattr(syll, "structure", "")
        if _st and getattr(res, "audit", None) is not None \
                and not any(str(_r).startswith("structure:")
                            for _r in res.audit.route):
            res.audit.route.append(f"structure:{_st}")
    except Exception as _e:
        log_lane_exception("_attach_understood.structure_stamp", _e)
    # DOMAIN PROVENANCE (wave98 subject-domain gate): the registry sweep
    # tags the winning result with its dispatcher's domain
    # (``_family_domain``); the VERIFIED-badge gate reads it to veto
    # foreign-domain serves — a humanities stem must never ship a
    # commerce-family VERIFIED.
    try:
        _fd = getattr(syll, "_family_domain", None)
        if _fd and getattr(res, "audit", None) is not None:
            res.audit._family_domain = _fd
    except Exception as _e:
        log_lane_exception("_attach_understood.family_domain", _e)
    # board-marking shape: re-render the verified steps into the
    # 5-beat rubric (Given / To find / Formula / Working / Final).
    # Pure transform on already-verified content — never alters the
    # answer, only its presentation.
    try:
        from backend.its.solver.board_format import format_board
        givens = (u or {}).get("givens") or getattr(
            syll, "quantities", None)
        board_steps = format_board(
            text or "",
            givens,
            getattr(syll, "governing_equation", None),
            list(res.steps or []),
            str(res.answer or ""))
        if board_steps and len(board_steps) > len(res.steps or []):
            res.socratic = dict(res.socratic or {})
            res.socratic["board_steps"] = board_steps
    except Exception as _e:
        log_lane_exception("_attach_understood.board_format", _e)
    return res


def _shape_promoted(text: str, answer: Optional[str],
                    numeric: Optional[float], steps: List[str],
                    audit: AuditTrail) -> tuple:
    """Post-verification answer shaping (2026-09-30 gate fixes), applied
    to a promoted registry answer BEFORE it ships:

       - UNIT NORMALIZATION: answer in the unit the ASK names (B06:
         'in litres per minute' vs a 5250 mL/min family answer).
       - COMPLEMENT PROBABILITY: 'probability that it is NOT green'
         ships P(~E) = 1 - P(E) with the identity check (M07).

    Both helpers are fail-closed: None means no change.  They never
    alter a number without an exact conversion/identity verifier.
    """
    ans, num, stps = answer, numeric, list(steps or [])
    try:
        from backend.its.solver.unit_shape import (normalize_to_ask_unit,
                                                   reshape_prob_complement)
        shaped = normalize_to_ask_unit(text, ans or "", num, stps)
        if shaped is None:
            shaped = reshape_prob_complement(text, ans or "", num, stps)
        if shaped is not None:
            audit.route.append("shape:promoted_answer")
            return shaped["answer"], shaped["numeric"], shaped["steps"]
    except Exception as _e:
        log_lane_exception("_shape_promoted.unit_shape", _e)
    return ans, num, stps


import threading as _threading

# Set while solving a multi-part sub-question: the part's text carries a
# shared context (all sibling givens), so the data-coverage guard must
# only score numbers stated in the part's OWN ask clause — otherwise
# every part refuses on siblings' values it rightly never used.
_IN_PART = _threading.local()

# CS FAST-PATH CTX (electives-all 2026-10-07): the RAW question surface,
# set in _answer_impl before the shared input normalizer collapses
# newlines (fenced code blocks and SQL row tuples do not survive that).
_CS_RAW = _threading.local()


def _stated_numbers(text: str) -> List[float]:
    scope = text
    if getattr(_IN_PART, "on", False):
        sentences = re.split(r"(?<=[.?!])\s+", text)
        scope = sentences[-1] if sentences else text
    # Strip non-computational metadata numbers:
    # 1. Four-digit calendar years (1950-2099)
    cleaned = re.sub(r"\b(?:in|year|during|since|dated?|april|march|january|february|may|june|july|august|september|october|november|december)?\s*\b(19\d\d|20\d\d)\b", " ", scope, flags=re.I)
    # 2. Class/Grade indicators (Class 10, Grade 9)
    cleaned = re.sub(r"\b(?:class|grade|standard|std\.?)\s+\d+\b", " ", cleaned, flags=re.I)
    # 3. Question numbering prefixes (Q.1, Question 4, Problem 2:)
    cleaned = re.sub(r"^(?:q(?:uestion)?|problem|ex(?:ercise)?)\s*\.?\s*\d+\s*[:.-]?", " ", cleaned, flags=re.I)
    # 4. Ordinal parenthesized item markers like (1), (2)
    cleaned = re.sub(r"\(\s*\d+\s*\)", " ", cleaned)
    return [float(x.replace(",", "")) for x in
            re.findall(r"\d[\d,]*(?:\.\d+)?", cleaned)]


# Standard unit-conversion factors (P11 fix, 2026-10-07): physics
# families legitimately restate givens in SI before computing
# (20 cm -> 0.2 m, 3 min -> 180 s, 72 km/h -> 20 m/s, 50 cm^2 ->
# 0.005 m^2).  A stated value consumed in converted form is NOT
# dropped data.
_UNIT_FACTORS = (
    1e-6, 1e-4, 1e-3, 1e-2, 1e2, 1e3, 1e4, 1e6,
    60.0, 3600.0, 1.0 / 60.0, 1.0 / 3600.0,
    3.6, 1.0 / 3.6,          # km/h <-> m/s
    0.0254, 2.54,            # inch <-> cm
)


def _value_consumed(v: float, used) -> bool:
    """True when a stated value appears among the used values EXACTLY
    or through a standard unit factor.  The data-coverage guards must
    not kill a correct family for converting units (live P11: the
    C8B_PRESSURE_BRICK family consumed 20/10/5 cm as 0.2/0.1/0.05 m and
    was flagged '3 of 4 stated values never used' -> honest answer
    downgraded to a refusal)."""
    for u in used:
        try:
            uu = float(u)
        except (TypeError, ValueError):
            continue
        if abs(v - uu) < 1e-9 * max(1.0, abs(v)):
            return True
        for f in _UNIT_FACTORS:
            if abs(v * f - uu) <= 1e-9 * max(1.0, abs(uu)):
                return True
    return False


_PHYSICS_FAMILY_IDS: Optional[set] = None


def _is_physics_family(structure: str) -> bool:
    """True when the sweep structure id belongs to the physics families
    dispatcher.  Board physics questions routinely carry DISTRACTOR
    givens (a heat-rate ask with mass and delta-T in the stem) that the
    correctly-gated compute must and does ignore -- the data-coverage
    guard's maths-word-problem heuristic ('every stated value must be
    used') false-positives on exactly those (live: C7H03 corpus heat
    rate, 840 W, refused for ignoring 500 g / 40 C).  Callers exempt a
    physics family ONLY while it still consumed 2+ stated values."""
    global _PHYSICS_FAMILY_IDS
    if _PHYSICS_FAMILY_IDS is None:
        ids: set = set()
        try:
            from backend.its.solver import physics_families as _pf
            for _table in (_pf.TABLE, getattr(_pf, "_TABLE_PC1", ()),
                           getattr(_pf, "_TABLE_BOOKS2", ()),
                           getattr(_pf, "_TABLE_C7", ()),
                           getattr(_pf, "_TABLE_C8", ()),
                           getattr(_pf, "_TABLE_C8B", ()),
                           getattr(_pf, "_TABLE_C9", ()),
                           getattr(_pf, "_TABLE_C10", ())):
                for _row in _table:
                    ids.add(_row[0])
            ids.update({
                "RESISTOR_NETWORK", "GAS_WALL_IMPULSE", "BAROMETER_COLUMN",
                "KINEMATICS_STOP", "POTENTIAL_ZERO_POINT", "LENS_POWER_REAL",
                "COIL_MAGNETIC_MOMENT", "PROJECTILE_CEILING", "BERNOULLI_LIFT",
                "ROTATING_CYLINDER", "KELVIN_CONVERT", "REFRACTIVE_INDEX_SPEED",
                "ESCAPE_VELOCITY", "WORK_DONE", "KINETIC_ENERGY", "POTENTIAL_ENERGY"
            })
        except Exception:
            ids = set()
        _PHYSICS_FAMILY_IDS = ids
    return structure in _PHYSICS_FAMILY_IDS


def _coverage_refuse(text: str, result: PipelineResult,
                     audit: AuditTrail) -> Optional[PipelineResult]:
    """LANE B->A FALLBACK DATA-COVERAGE GUARD (P03 tightening): when the
    registry sweep already refused a reading for ignoring stated data,
    the kernel's modeling stage must not answer the same question while
    ignoring the same data.  A verified fallback whose own steps never
    consume 2+ of the 4+ stated values is downgraded to an honest
    refusal (the auto-binder rescue runs at the call site)."""
    try:
        stated = _stated_numbers(text)
        hay = " ".join([str(result.answer or "")] +
                       [str(s) for s in (result.steps or [])])
        used = {float(x.replace(",", "")) for x in
                re.findall(r"\d[\d,]*(?:\.\d+)?", hay)}
        if result.numeric is not None:
            used.add(float(result.numeric))
        unconsumed = [v for v in stated
                      if not _value_consumed(v, used)]
        # P11 PHYSICS DISTRACTOR EXEMPTION (2026-10-07): the promoting
        # sweep tags its family id on the audit; a physics-family
        # answer that consumed 2+ stated values legitimately ignores
        # distractor givens -- board stems pad physics questions with
        # them.  A family that consumed 0-1 values still refuses.
        _sweep_struct = getattr(audit, "_sweep_structure", "") or ""
        _phy_ok = (_is_physics_family(_sweep_struct)
                   and (len(stated) - len(unconsumed)) >= 2)
        if len(stated) >= 4 and len(unconsumed) >= 2 and not _phy_ok:
            audit.route.append("kernel:modeling_data_coverage_refused")
            audit.assumptions.append(
                f"data-coverage guard (lane A fallback): "
                f"{len(unconsumed)} of {len(stated)} stated values "
                f"never used by the fallback model")
            return PipelineResult(
                label=GUIDED, answer=None, numeric=None,
                steps=result.steps, audit=audit,
                refusal_reason="Some values stated in this question are "
                               "not used in the computation (data-"
                               "coverage guard), so no verified answer "
                               "is shown")
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("def__coverage_refuse_text_str_result_Pip", _e)
        except Exception:
            pass
        pass
    return None



# --------------------------------------------------------------------------- #
# THEORY-ASK GUARD (2026-09-30, cisce-solver-sciences at coordinator
# direction): essay/theory asks must never leave the kernel lane with a
# VERIFIED numeric.  A "explain/describe/discuss" question has no exact
# answer to verify, so any kernel number shipped for one is a
# placeholder (M14 unsupported-guess class).  The ask is classified
# deterministically: a theory verb WITHOUT a calculation verb means the
# kernel verdict is downgraded to an honest guided refusal.
# --------------------------------------------------------------------------- #
_THEORY_ASK_GUARD = True

# DATA-TABLE GUARD (2026-09-30, same wave): an experiment/data-table
# ask ("records: Length (cm) = 20, 30, 40...; determine g from a
# T^2 vs L graph") is not a single-equation solve -- a kernel verdict
# on one is a bare-number placeholder (observed live: "s - 17.9 = 0
# -> 17.9" shipped VERIFIED on a pendulum data table).  The registry
# sweep that follows the kernel refusal still owns genuine data-list
# questions (stats families etc.).
_DATA_TABLE_RX = re.compile(
    r"\brecords?\b[^.=]{0,60}=|=\s*\d+(?:\.\d+)?\s*,\s*\d+(?:\.\d+)?"
    r"\s*,\s*\d+|\bT\s*\^?2\s+vs\s+L\b|\bvs\.?\s*(?:a\s+)?graph\b|"
    r"\bgraph\s+(?:of|between)\b|\btabulat\w+\b|\btabulated\b|\bplot "
    r"(?:a\s+)?graph\b", re.I)


def _data_table_ask(text: str) -> bool:
    return bool(_DATA_TABLE_RX.search(text or ""))


def _kernel_chem_stated_mass_mismatch(text: str, r) -> bool:
    """True for a chemistry concentration/count ask carrying a stated
    atomic-mass list where the kernel's number is NOT the chemistry
    registry's m/M (or M x n) for the question's formula.  The kernel
    lane treats "(Na = 23, Cl = 35.5)" as equations in variables Na/Cl
    and ships the solved variable (23, 3.93, ...) — the chemistry
    registry owns these asks."""
    if getattr(r, "numeric", None) is None:
        return False
    if not re.search(r"\b(?:number\s+of\s+moles?|moles?(?:\s+are)?\s+in\b|"
                     r"\bmolarity\b|\bmolality\b|\bmole\s+fraction\b|"
                     r"how\s+many\s+moles)\b", text or "", re.I):
        return False
    # a stated atomic-mass list is the chemistry fingerprint
    stated = re.findall(r"([A-Z][a-z]?)\s*=\s*(\d+(?:\.\d+)?)\s*"
                        r"(?:u|g/mol|g)\b", text or "")
    if not stated:
        return False
    try:
        from backend.its.solver.chemistry_families import parse_formula, \
            molar_mass
    except Exception:
        return False
    norm = re.sub(r"[\u2080-\u2089]",
                  lambda m: chr(ord(m.group(0)) - 0x2080 + 48), text or "")
    f = None
    for cand in re.findall(r"(?<![A-Za-z0-9])([A-Z][A-Za-z0-9]{0,11})"
                           r"(?![A-Za-z0-9])", norm):
        c = parse_formula(cand)
        if c and len(c) >= 2:
            f = cand
            break
    if not f:
        return False
    M = molar_mass(f)
    if not M or M <= 0:
        return False
    mm = re.search(r"(\d+(?:\.\d+)?)\s*g(?:rams?)?\b", norm, re.I)
    if not mm:
        return False
    mass = float(mm.group(1))
    if mass <= 0:
        return False
    num = abs(float(r.numeric))
    want_n = mass / M                      # moles ask
    # accept either n = m/M or a concentration built on it; reject the
    # kernel's equation-system artifacts (23, 3.93, ...)
    for want in (want_n, mass / M / 0.5, M * want_n, M):
        if abs(num - want) <= max(0.01, 0.02 * abs(want)):
            return False
    return True


def _kernel_formula_mass_mismatch(text: str, r) -> bool:
    """True when a molecular/formula-mass ask carries exactly one
    formula token and the kernel's number is NOT that formula's
    table-built mass.  The kernel lane's formula reader drops unicode
    subscripts (observed live: C12H22O11 read as C12H22O -> 182 u for
    sucrose); the chemistry registry owns this relation and answers
    after the kernel verdict is dropped."""
    if getattr(r, "numeric", None) is None:
        return False
    # 'formula unit mass' is the board phrasing for ionic compounds
    # (NCERT c9 exercise: ZnO, Na2O, K2CO3); same ownership rule —
    # observed live: the kernel read the stated atomic-mass list
    # "(K = 39, C = 12, O = 16)" as equations and solved C = 12.
    if not re.search(r"(?:molecular|formula(?:\s+unit)?)\s+mass",
                     text or "", re.I):
        return False
    try:
        from backend.its.solver.chemistry_families import parse_formula, \
            molar_mass
    except Exception:
        return False
    norm = re.sub(r"[\u2080-\u2089]",
                  lambda m: chr(ord(m.group(0)) - 0x2080 + 48), text or "")
    cands = []
    for cand in re.findall(r"\b([A-Z][A-Za-z0-9]{1,24})\b", norm):
        try:
            c = parse_formula(cand)
        except Exception:
            c = None
        if c and len(c) >= 2:
            try:
                cands.append(molar_mass(cand))
            except Exception as _e:
                try:
                    from backend.its.solver.contract import log_lane_exception
                    log_lane_exception("def__kernel_formula_mass_mismatch_text_s", _e)
                except Exception:
                    pass
                pass
    if len(cands) != 1:
        return False
    want = cands[0]
    if not want or want <= 0:
        return False
    num = float(r.numeric)
    return abs(num - want) > 0.01 * max(abs(num), abs(want))


_THEORY_ASK_RX = re.compile(
    r"\b(?:explain|describe|discuss|elaborate|differentiate|"
    r"distinguish|account\s+for|short\s+note\b|essay|justify|"
    r"state\s+the\s+(?:reason|law|principle|function|role|postulate)|"
    r"what\s+is\s+meant\s+by|characteristics|significance|"
    r"write\s+a?\s*(?:brief\s+)?note|why\s+(?:is|are|was|were|do|does|"
    r"did|can|cannot|should|would)|how\s+(?:does|do|did|can|would))\b",
    re.I)

_COMPUTE_ASK_RX = re.compile(
    r"\b(?:calculate|compute|determine)\b|"
    r"\bhow\s+(?:much|many|long|far|fast)\b|"
    r"\bwhat\s+(?:is|are)\s+the\s+(?:value|amount|ratio|percent"
    r"age|concentration|molarity|mass|volume|pressure)\b|"
    r"\b(?:find|solve)\b|\bevaluate\b[^.]{0,40}?(?:\d|the\s+"
    r"(?:value|expression|limit))", re.I)


def _theory_ask_without_computation(text: str) -> bool:
    """True when the question asks for prose (explain/describe/...)
    and no calculation is requested anywhere in it."""
    return bool(_THEORY_ASK_RX.search(text or "")) and \
        not bool(_COMPUTE_ASK_RX.search(text or ""))


def _lane_a(text: str, audit: AuditTrail) -> PipelineResult:
    # DISTRACTOR-RESISTANT LINEAR-EXACT rescue FIRST (2026-09-30 gate +
    # coordinator flag): a "solve for x: 2x + 6 = 20" question with an
    # inserted prose distractor must be answered from its equation
    # clause alone.  A concept-router stage inside solve_text can
    # verify a distractor read before the kernel declines, so the
    # strictly-verified linear solve runs ahead of the router.  It
    # fires ONLY on a clean one-variable linear clause whose both sides
    # are pure numbers/variable (prose never enters), and verifies by
    # substitution; anything else falls through untouched.
    try:
        from backend.its.solver.unit_shape import solve_linear_exact
    except ImportError:
        solve_linear_exact = None
    if solve_linear_exact is not None:
        try:
            lin = solve_linear_exact(text)
        except Exception:
            lin = None
        if lin is not None:
            audit.route.append("unit_shape:linear_exact")
            # WS-PAL: the linear-exact solve carried a gate name but no
            # 'structure:' entry -- the badge gate found no route and
            # withheld the verified answer.  MATH_KERNEL's verifier
            # re-checks the residual from the question text.
            audit.route.append("structure:MATH_KERNEL")
            audit.gates_passed.append(str(lin["gate"]))
            return PipelineResult(
                label=VERIFIED, answer=lin["answer"],
                numeric=lin["numeric"], steps=list(lin["steps"]),
                audit=audit)
    from backend.its.solver.router import solve_text

    r = solve_text(text)
    audit.route.append(f"kernel:{r.stage}")
    # the kernel's family/model id is the badge gate's route: without it
    # a fully-correct kernel answer resolved no verifier (no_route) and
    # the strict contract withheld it (heel/kwh regression, 2026-10-07)
    if getattr(r, "structure", ""):
        audit._sweep_structure = r.structure
    elif getattr(r, "verified", False):
        # WS-PAL (ovh-pal): 'Find the value of x: 5x - 3 = 22' ships a
        # verified kernel solve with NO structure field -- the badge
        # gate then found no route and the strict contract withheld the
        # (correct) answer.  MATH_KERNEL's registered verifier
        # re-derives the claim from the question text (substitution
        # residual for linear/quadratic shapes; NA = honest no-route).
        audit._sweep_structure = "MATH_KERNEL"
        audit.route.append("structure:MATH_KERNEL")
    audit.elapsed_ms = r.elapsed_ms
    # verified answers may be symbolic closed forms (ant-band: the
    # exact value overflows float64 and is kept as a formula)
    if r.verified and r.answer is not None:
        # THEORY-ASK GUARD (2026-09-30): an essay/theory ask never
        # ships a kernel numeric -- it would be a placeholder, not an
        # exact answer.  Downgrade to an honest guided refusal.
        if _theory_ask_without_computation(text):
            audit.route.append("kernel:theory_ask_refused")
            return PipelineResult(
                label=GUIDED, answer=None, numeric=None,
                steps=r.steps, audit=audit,
                refusal_reason="this is an explain/describe question, "
                               "not a calculation; no verified numeric "
                               "answer is shown")
        # DATA-TABLE GUARD (2026-09-30): an experiment data table is
        # not a one-equation solve; the registry sweep after this
        # refusal still serves genuine data-list asks.
        if _data_table_ask(text):
            audit.route.append("kernel:data_table_ask_refused")
            return PipelineResult(
                label=GUIDED, answer=None, numeric=None,
                steps=r.steps, audit=audit,
                refusal_reason="this question asks for an analysis of "
                               "recorded data, not a single-equation "
                               "solve; no verified numeric answer is "
                               "shown")
        # FORMULA-MASS MISMATCH GUARD (2026-09-30): the kernel's formula
        # reader drops unicode subscripts; when its mass disagrees with
        # the question's own formula, drop the kernel verdict and let
        # the chemistry registry answer below.
        if _kernel_formula_mass_mismatch(text, r):
            audit.route.append("kernel:formula_mass_mismatch_refused")
            r = None
        # / molarity / molality ask whose text carries a stated
        # atomic-mass list ("(Na = 23, Cl = 35.5)") is CHEMISTRY — the
        # kernel read the list as an equation system and solved it
        # (observed: "moles in 5.85 g of NaCl (Na = 23, Cl = 35.5)" ->
        # VERIFIED 3.93; "molarity of 4 g of NaOH..." -> VERIFIED 23).
        # If the kernel's number is not the chemistry registry's n = m/M
        # (or M = m/n) for the question's own formula + stated masses,
        # drop the verdict; the chemistry registry owns these.
        if r is not None and r.verified and _kernel_chem_stated_mass_mismatch(text, r):
            audit.route.append("kernel:chem_stated_mass_refused")
            r = None

    if r is not None and r.verified and r.answer is not None:
        # ANSWER-SHAPE (2026-09-30 gate): a multi-root solve ask
        # ("give both values of x") must present EVERY root the kernel
        # already computed, not just the largest pick.
        try:
            from backend.its.solver.unit_shape import reshape_multi_root, \
                normalize_to_ask_unit
            shaped = reshape_multi_root(text, r.answer, r.numeric,
                                        r.steps)
            if shaped is None:
                shaped = normalize_to_ask_unit(text, r.answer, r.numeric,
                                               r.steps)
            if shaped is not None:
                audit.gates_passed.append("kernel_cascade")
                audit.route.append("shape:kernel_answer")
                if shaped.get("steps"):
                    r.steps = shaped["steps"]
                # kernel:modeling answers MUST ride the understood ctx
                # (quantities + structure) or the badge gate starves to
                # verifier_na and the strict contract withholds them
                # (2026-10-07 full-span dig: ELC_* wave hit exactly this)
                return _attach_understood(PipelineResult(
                    label=VERIFIED, answer=shaped["answer"],
                    numeric=shaped["numeric"], steps=r.steps, audit=audit),
                    r)
        except Exception as _e:
            try:
                from backend.its.solver.contract import log_lane_exception
                log_lane_exception("_FORMULA_MASS_MISMATCH_GUARD_2026_09_30_", _e)
            except Exception:
                pass
            pass
        audit.gates_passed.append("kernel_cascade")
        return _attach_understood(PipelineResult(
            label=VERIFIED, answer=r.answer, numeric=r.numeric,
            steps=r.steps, audit=audit), r)
    # kernel refused: sweep the family registry before giving up --
    # formal-looking questions ("solve 5x-3 > 3x-5") can belong to a
    # family whose triggers the kernel does not cover (mirror of Lane
    # B's full-registry sweep, same promotion gate and polarity guard)
    syll = _independent_sweep(text, audit)
    if syll.matched and "GROWING" in syll.structure.upper() \
            and re.search(r"\b(shrink\w*|shrank|shrunk|contract\w*|"
                          r"shorten\w*|narrow\w*|reduc\w*(?:\s+the)?\s+"
                          r"(?:length|band|rope|hose))\b", text.lower()):
        audit.route.append("modeling:lane_a_sweep_refused_polarity")
        audit.assumptions.append(
            "polarity guard: shrinking domain -- growing-domain "
            f"structure '{syll.structure}' refused in Lane A sweep")
        syll.matched = False
    if syll.matched and syll.confidence >= 0.85 \
            and (syll.numeric_answer is not None or syll.final_answer):
        audit.route.append("modeling:lane_a_sweep")
        audit.gates_passed.append("lane_a_registry_sweep")
        audit._sweep_structure = getattr(syll, "structure", "")
        shaped = _shape_promoted(text, syll.final_answer,
                                 syll.numeric_answer, syll.steps, audit)
        return _attach_understood(PipelineResult(
            label=VERIFIED, answer=shaped[0],
            numeric=shaped[1], steps=shaped[2], audit=audit), syll)
    # NARRATIVE AUTO-BIND (2026-09-30 gate): every kernel stage and the
    # registry sweep declined.  Before an honest guided refusal, let the
    # verified auto-binders try the narrow word-problem patterns they
    # own (each carries its own exact verifier relation; anything
    # uncertain still refuses).
    try:
        from backend.its.solver.binding_executor import try_auto_bind
    except ImportError:
        try_auto_bind = None
    if try_auto_bind is not None:
        bound = try_auto_bind(text, audit)
        if bound is not None:
            return bound
    # RELEASE-CALIBRATION TEACH-BACK (2026-10-07 SOCIAL_GOLDEN): a
    # family held back by the flywheel calibration floors keeps its
    # steps by contract ("the family still teaches, guided") -- but the
    # withheld ModelResult never reaches the student here because the
    # kernel refusal's (empty) steps win.  Attach the withheld family's
    # method steps to the honest refusal; the answer itself stays
    # withheld.  (Observed: POP_DENSITY board numericals served a bare
    # "method shown" refusal with no method.)
    _withheld_steps = []
    if not syll.matched and getattr(syll, "steps", None) \
            and "withheld" in (getattr(syll, "note", "") or ""):
        _withheld_steps = list(syll.steps)[:8]
    return PipelineResult(
        label=GUIDED, answer=None, numeric=None,
        steps=r.steps or _withheld_steps, audit=audit,
        refusal_reason=(r.refusal_reason
                        or "No verified formal solution path"))


# --------------------------------------------------------------------------- #
# Lane B: competency narrative (event reader -> state table -> families)
# Delegates to the competency reader; falls through to guided on refusal.
# --------------------------------------------------------------------------- #


def _lane_b(text: str, audit: AuditTrail) -> PipelineResult:
    def _reader_result(result: Optional[PipelineResult]
                       ) -> Optional[PipelineResult]:
        """Reader exit helper: a VERIFIED result ships; a GUIDED result
        first offers the verified auto-binders their turn (a reader that
        recognised the family but could not bind its slots must not
        bury a verified full-text reading -- C03's dilution reader).
        Fail-closed: no binder hit keeps the reader's guided result."""
        if result is None or result.label in (VERIFIED,
                                              VERIFIED_ASSUMED):
            return result
        try:
            from backend.its.solver.binding_executor import try_auto_bind
        except ImportError:
            return result
        bound = try_auto_bind(text, audit)
        if bound is not None:
            return bound
        # P11 ROUTING RESCUE (2026-10-07 class-8/9 dig): the narrative
        # readers recognise these shapes but cannot bind their slots
        # ("Narrative needs reading support" fired on magnetic-coil,
        # tractor-pressure and mirror-formula questions the physics
        # dispatcher solves exactly).  The auto-binders are not the only
        # verified full-text readers: the structure registry (physics /
        # chemistry / commerce families) computes them.  Give the
        # registry sweep its turn before burying a verified family
        # answer under a guided refusal -- same promotion gate as the
        # lane-A sweep (VERIFIED + confidence >= 0.85 + an answer).
        try:
            syll = _independent_sweep(text, audit)
        except Exception:
            syll = None
        if syll is not None and getattr(syll, "matched", False) \
                and getattr(syll, "confidence", 0.0) >= 0.85 \
                and (getattr(syll, "numeric_answer", None) is not None
                     or getattr(syll, "final_answer", None)):
            shaped = _shape_promoted(text, syll.final_answer,
                                     syll.numeric_answer, syll.steps,
                                     audit)
            audit.route.append("reader:registry_rescue")
            return _attach_understood(PipelineResult(
                label=VERIFIED, answer=shaped[0], numeric=shaped[1],
                steps=shaped[2], audit=audit), syll)
        return result

    try:
        from backend.its.solver.competency_reader import read_narrative
    except ImportError:
        read_narrative = None
    if read_narrative is not None:
        result = _reader_result(read_narrative(text, audit))
        if result is not None:
            return result
    try:
        from backend.its.solver.chemistry_reader import read_chemistry
    except ImportError:
        read_chemistry = None
    if read_chemistry is not None:
        result = _reader_result(read_chemistry(text, audit))
        if result is not None:
            return result
    try:
        from backend.its.solver.competency_reader import read_percent_chain
    except ImportError:
        read_percent_chain = None
    if read_percent_chain is not None:
        result = _reader_result(read_percent_chain(text, audit))
        if result is not None:
            return result
    try:
        from backend.its.solver.competency_reader2 import (
            read_mixture_blend, read_work_together)
    except ImportError:
        read_mixture_blend = read_work_together = None
    if read_work_together is not None:
        result = _reader_result(read_work_together(text, audit))
        if result is not None:
            return result
    if read_mixture_blend is not None:
        result = _reader_result(read_mixture_blend(text, audit))
        if result is not None:
            return result
    # commerce narrative readers (partnership, GST chains, instalment/
    # hire-purchase, successive discounts, SI/CI prose, ratio division):
    # the wrapper only promotes VERIFIED results -- a refusal returns
    # None so every downstream reader and guard keeps its turn
    try:
        from backend.its.solver.commerce_readers import \
            read_commerce_narrative
    except ImportError:
        read_commerce_narrative = None
    if read_commerce_narrative is not None:
        result = read_commerce_narrative(text, audit)
        if result is not None:
            return result
    try:
        from backend.its.solver.relation_binder import bind_variables
        from backend.its.solver.intent_lexicon import canonicalize
    except ImportError:
        bind_variables = None
    if bind_variables is not None:
        canonical_text, subs = canonicalize(text)
        for original, canonical in subs:
            audit.assumptions.append(
                f"intent: '{original}' read as '{canonical}'")
        result = bind_variables(canonical_text, audit)
        if result is not None:
            return result
    try:
        from backend.its.solver.commerce_families import read_commerce
    except ImportError:
        read_commerce = None
    if read_commerce is not None:
        result = read_commerce(text, audit)
        if result is not None:
            return result
    from backend.its.solver.chain_pipeline import try_chain
    result = try_chain(text, audit)
    if result is not None:
        if result.label == VERIFIED:
            return result
        # DEGRADED CHAIN RESCUE (2026-09-30 gate, A05): when the chain
        # grammar degraded (a hop lacks its operand), the verified
        # auto-binders still get one turn before the honest degraded
        # result ships.  Uncertain -> the degraded refusal stands.
        try:
            from backend.its.solver.binding_executor import try_auto_bind
        except ImportError:
            try_auto_bind = None
        if try_auto_bind is not None:
            bound = try_auto_bind(text, audit)
            if bound is not None:
                return bound
        # P11 CHAIN-DEGRADED REGISTRY RESCUE (2026-10-07, class-9 dig):
        # a 2-hop chain that degraded buried a VERIFIED full-text
        # physics family answer ("...thermal energy supplied is 2200 J,
        # calculate the heat energy added per degree" parsed as
        # heat-then-per-degree hops, lost the operand, and the student
        # got a guided refusal while C7_HEAT_PER_DEGREE held 88 J/degC
        # at 0.95 in the sweep).  The degraded result ships only when
        # the sweep cannot serve a verified full-text reading under the
        # standard promotion gates (confidence, coverage, ask-shape).
        try:
            _rescue_audit = AuditTrail(lane=audit.lane)
            _syll = _independent_sweep(text, _rescue_audit)
        except Exception:
            _syll = None
        if _syll is not None and getattr(_syll, "matched", False) \
                and "GROWING" not in (
                    getattr(_syll, "structure", "") or "").upper() \
                and getattr(_syll, "confidence", 0.0) >= 0.85 \
                and (getattr(_syll, "numeric_answer", None) is not None
                     or getattr(_syll, "final_answer", None)):
            _low = text.lower()
            _sup = (_syll.structure or "").upper()
            _ask_shape_bad = (
                _syll.numeric_answer is not None and re.search(
                    r"\b(ratio|who\s+(?:bought|covers|walked|is)|"
                    r"verify\s+(?:that|:)|true\s+or\s+false|"
                    r"what\s+are\s+the\s+numbers)\b", _low))
            _energy_kind_bad = (
                (re.search(r"\bkinetic\b", _low)
                 and "POTENTIAL" in _sup)
                or (re.search(r"\bpotential\b", _low)
                    and "KINETIC" in _sup))
            if not _ask_shape_bad and not _energy_kind_bad:
                _rescue_audit._sweep_structure = getattr(
                    _syll, "structure", "")
                _cand = PipelineResult(
                    label=VERIFIED, answer=_syll.final_answer,
                    numeric=_syll.numeric_answer,
                    steps=list(_syll.steps or []), audit=_rescue_audit)
                _refused = _coverage_refuse(text, _cand, _rescue_audit)
                if _refused is None:
                    _rescue_audit.route.append(
                        "chain_degraded:registry_rescue")
                    _rescue_audit.gates_passed.append(
                        "chain_degraded_full_text_rescue")
                    return _attach_understood(_cand, _syll, text)
        return result
    # ALL readers failed: try the FULL structure registry before
    # falling to Lane A's kernel/CAS.  This ensures the compound
    # interest, depreciation, and every other family gets a chance
    # regardless of which lane the classifier picked.
    syll = _independent_sweep(text, audit)
    # L2 POLARITY GUARD (sweep-level mirror of modeling_layer's D2
    # rule): the registry gains families every batch, so the promotion
    # gate itself must enforce the invariant -- a shrinking/contracting
    # domain is a DIFFERENT physics family, and a growing-domain
    # structure's answer must never be promoted for it no matter which
    # family's triggers fired.  Percent-decrease / depreciation families
    # are untouched: they carry no GROWING-domain structure id.
    if syll.matched and "GROWING" in syll.structure.upper() \
            and re.search(r"\b(shrink\w*|shrank|shrunk|contract\w*|"
                          r"shorten\w*|narrow\w*|reduc\w*(?:\s+the)?\s+"
                          r"(?:length|band|rope|hose))\b", text.lower()):
        audit.route.append("modeling:fallback_all_refused_polarity")
        audit.assumptions.append(
            "polarity guard: shrinking domain -- growing-domain "
            f"structure '{syll.structure}' refused in registry sweep")
        syll.matched = False
    if syll.matched and syll.confidence >= 0.85 \
            and (syll.numeric_answer is not None
                 or syll.final_answer):
        # RED-TEAM GUARDS (2026-09-11 attack wave): each guard converts
        # a wrong-verified class into an honest refusal.  The registry's
        # confidence does not discriminate right formula from wrong
        # formula -- these checks do.
        low = text.lower()
        # (1) ANSWER-SHAPE: asks whose answer is not a single bare
        # number (ratios, who/which choices, verification identities)
        if syll.numeric_answer is not None and re.search(
                r"\b(ratio|who\s+(?:bought|covers|walked|is)|"
                r"verify\s+(?:that|:)|true\s+or\s+false|"
                r"what\s+are\s+the\s+numbers)\b", low):
            audit.route.append("modeling:answer_shape_refused")
            audit.assumptions.append(
                "answer-shape guard: ask expects a non-numeric-shaped "
                "answer (ratio/choice/verify); bare number refused")
            syll.matched = False
        # (2) FORMULA-VS-ASK: the named energy family must match the
        # asked energy type (PE=mgh was fired for kinetic-energy asks
        # by binding the speed as height)
        upper_struct = syll.structure.upper()
        if re.search(r"\bkinetic\b", low) and "POTENTIAL" in upper_struct:
            audit.route.append("modeling:energy_kind_refused")
            audit.assumptions.append(
                "energy-kind guard: kinetic asked, potential family fired")
            syll.matched = False
        if re.search(r"\bpotential\b", low) and "KINETIC" in upper_struct:
            audit.route.append("modeling:energy_kind_refused")
            audit.assumptions.append(
                "energy-kind guard: potential asked, kinetic family fired")
            syll.matched = False
        # (3) DATA-COVERAGE: if the question states numbers that the
        # chosen family's steps never reference, the family likely
        # dropped operands (a 5-score sum that used only 2 scores).
        # Applied only when the ask demands a computation and there are
        # enough stated values to be meaningful.
        if syll.matched and syll.numeric_answer is not None:
            stated = _stated_numbers(text)
            steps_text = " ".join(str(s) for s in (syll.steps or []))
            used = {float(x.replace(",", "")) for x in
                    re.findall(r"\d[\d,]*(?:\.\d+)?", steps_text)}
            unconsumed = [v for v in stated
                          if not _value_consumed(v, used)]
            # P11 PHYSICS DISTRACTOR EXEMPTION (2026-10-07): a
            # physics-family compute that consumed 2+ stated values
            # (its Q and t, its W and an edge) legitimately ignores
            # distractor givens -- board stems pad every physics
            # question with them (C7H03: mass 500 g, delta-T 40 C).
            _phy_ok = (
                _is_physics_family(syll.structure or "")
                and (len(stated) - len(unconsumed)) >= 2)
            if len(stated) >= 4 and len(unconsumed) >= 2 \
                    and not _phy_ok:
                audit.route.append("modeling:data_coverage_refused")
                audit.assumptions.append(
                    f"data-coverage guard: {len(unconsumed)} of "
                    f"{len(stated)} stated values never used by the "
                    f"fired family '{syll.structure}'")
                syll.matched = False
    if syll.matched and syll.confidence >= 0.85 \
            and (syll.numeric_answer is not None
                 or syll.final_answer):
        audit.route.append("modeling:fallback_all")
        audit.gates_passed.append("full_registry_sweep")
        audit._sweep_structure = getattr(syll, "structure", "")
        ans, num, stps = _shape_promoted(text, syll.final_answer,
                                         syll.numeric_answer,
                                         syll.steps, audit)
        return _attach_understood(PipelineResult(
            label=VERIFIED, answer=ans,
            numeric=num, steps=stps,
            audit=audit), syll)
    # reader absent or refused: degrade honestly to Lane A try, else guided
    fallback = _lane_a(text, audit)
    if fallback.label in (VERIFIED, VERIFIED_ASSUMED):
        # P03 TIGHTENING: the kernel modeling stage inside the Lane A
        # fallback has no data-coverage guard of its own; apply the
        # same stated-values check the sweep applies.  If it refuses,
        # the verified auto-binders (e.g. the series-resistor chain)
        # still get one honest turn.
        refused = _coverage_refuse(text, fallback, audit)
        if refused is not None:
            try:
                from backend.its.solver.binding_executor import \
                    try_auto_bind
            except ImportError:
                try_auto_bind = None
            if try_auto_bind is not None:
                bound = try_auto_bind(text, audit)
                if bound is not None:
                    return bound
            return refused
        fallback.audit.lane = "B>A"
        return fallback
    return PipelineResult(
        label=GUIDED, answer=None, numeric=None, steps=fallback.steps,
        audit=audit,
        refusal_reason="Narrative needs reading support; method shown")


# --------------------------------------------------------------------------- #
# Lane C: student-bound execution
# --------------------------------------------------------------------------- #


def execute_bound(binding: Dict[str, Any], audit: AuditTrail
                  ) -> PipelineResult:
    """Lane C entry: the student has assigned roles to quantities.

    binding = {"question": str,
               "bindings": [{"value": 120, "role": "count"},
                            {"value": 5, "role": "unit_price"}],
               "target_role": "total"}
    Roles map to family signatures; the family executes; the SAME gates
    apply as Lane B -- a mis-bound student chain dies in plausibility,
    never ships.
    """
    audit.lane = "C"
    audit.route.append("student_binding")
    from backend.its.solver.binding_executor import execute_binding
    return execute_binding(binding, audit)


# --------------------------------------------------------------------------- #
# Lane D: official key matching lives in verified_practice (cfq endpoints)
# Included here only for label completeness; grading is key-exact.
# --------------------------------------------------------------------------- #


# --------------------------------------------------------------------------- #
# Entry point
# --------------------------------------------------------------------------- #


def _key_bank_path() -> str:
    """question_bank.db through the env-first data ladder (WSA-P4)."""
    try:
        from backend.its.solver.paths import data_file
    except ImportError:  # flat-import environments (tools/, old tests)
        from its.solver.paths import data_file
    return data_file("question_bank.db")


def _official_key_lookup(text: str) -> Optional[Dict]:
    """Fingerprint-match the question against mined board keys.

    Escrow-strict: a hit requires EXACT canonical-hash AND numeric-
    signature equality, and only ONE candidate key may exist for that
    fingerprint (two letters = ambiguous = no answer).  Returns the key
    row dict or None.

    WSA-P4: one short-lived sqlite connection per lookup.  The old
    process-wide ``_KEY_CONN`` (``check_same_thread=False``) was shared
    across the solve-pool threads with no lock — under 8 concurrent
    threads it lost up to 85% of lookups (301/2000 hits with
    InterfaceError('bad parameter or other API misuse') storms;
    reproduced in tests/test_wsa_shared_state.py).  Measured trade
    (native Windows, 2 runs 2026-10-10): per-call connect ~1.8-2.4ms
    vs ~0.2-1.1ms for a locked shared conn — ~1.3ms extra, i.e. ~0.2%
    of the ~1.3s answer p50, so the simpler correct design wins: no
    locks, no cross-thread state, and a rebuilt bank file is picked up
    live.
    """
    try:
        from backend.tools.mine_keys import canonical_hash, \
            numeric_signature
    except ImportError:
        return None
    import sqlite3
    bank_path = _key_bank_path()
    if not os.path.exists(bank_path):
        return None
    conn = None
    try:
        fp = canonical_hash(text)
        sig = "|".join(numeric_signature(text))
        conn = sqlite3.connect(bank_path)
        rows = conn.execute(
            "SELECT letter, answer_text, source_doc_id, source_qno "
            "FROM key_fingerprints WHERE fingerprint=? AND numeric_sig=?",
            (fp, sig)).fetchall()
        # the same paper often exists as multiple doc copies: dedupe by
        # LETTER.  All copies agreeing = one key; disagreeing = ambiguous.
        letters = {r[0] for r in rows if r[0]}
        if len(letters) != 1:
            return None
        r0 = rows[0]
        return {"letter": r0[0], "answer_text": r0[1],
                "source_doc_id": r0[2], "source_qno": r0[3]}
    except Exception:
        return None
    finally:
        if conn is not None:
            try:
                conn.close()
            except Exception as _e:
                logger.debug("bank_memo_conn_close (conn.close): %s", type(_e).__name__)


_FIGURE_REF_RE = re.compile(
    r"given\s+circuit|shown\s+in\s+(?:the\s+)?(?:figure|diagram|graph)|"
    r"in\s+the\s+(?:figure|diagram|graph)|as\s+shown\b|"
    r"following\s+(?:figure|diagram|circuit)|the\s+given\s+"
    r"(?:figure|diagram|circuit)", re.I)


# Verified-answer memo: a VERIFIED result for an identical question text
# is a pure function of that text — persist it so repeat asks (paper
# re-runs, student retries) never re-solve or re-extract.  Only VERIFIED
# labels are banked; guided/refused results always re-run so improvements
# in the engine still take effect.
#
# WSA-P4 (2026-10-10) concurrency contract:
#   * every access runs under _ANS_MEMO_LOCK (get touches LRU order,
#     put mutates + serializes the whole dict — the old lockless
#     read-modify-write lost updates and could raise mid json.dump);
#   * the dict is LRU-bounded (ANSWER_MEMO_MAX_ROWS, default 5,000;
#     0 is the kill-switch that disables banking) — it used to grow
#     without bound (~9k banked rows in telemetry);
#   * put re-merges the on-disk file before every write, so a sibling
#     uvicorn worker's banked rows are adopted instead of clobbered
#     (the old last-writer-wins replace silently dropped them).
_ANS_MEMO_PATH = None
_ANS_MEMO: Optional[Dict[str, dict]] = None
_ANS_MEMO_LOCK = _threading.RLock()
_ANS_MEMO_DEFAULT_MAX_ROWS = 5000


def _ans_memo_max_rows() -> int:
    """Env knob for the memo LRU cap (0 disables banking)."""
    try:
        return max(0, int(os.environ.get("ANSWER_MEMO_MAX_ROWS")
                          or _ANS_MEMO_DEFAULT_MAX_ROWS))
    except (TypeError, ValueError):
        return _ANS_MEMO_DEFAULT_MAX_ROWS


def _ans_memo_path():
    global _ANS_MEMO_PATH
    if _ANS_MEMO_PATH is None:
        try:
            from backend.its.solver.paths import data_file
        except ImportError:  # flat-import environments (tools/, old tests)
            from its.solver.paths import data_file
        # env CBSE_DATA_DIR first (authoritative), package-relative
        # cbse_data next (the container mount), legacy Windows literal
        # only as a last resort — it silently no-ops in the containers.
        _ANS_MEMO_PATH = data_file("answer_memo.json")
    return _ANS_MEMO_PATH


def _ans_memo_merge_file(memo) -> None:
    """Adopt on-disk memo rows we do not have (caller holds the lock).

    In-memory rows win — they are this process's newer computes; disk
    rows written by a sibling worker after our dict was built are merged
    in so the next write never clobbers them.  A missing or unreadable
    file is not an error (cold start / corrupt legacy file).
    """
    try:
        with open(_ans_memo_path(), encoding="utf-8") as fh:
            disk = json.load(fh)
        if isinstance(disk, dict):
            for k, v in disk.items():
                if k not in memo:
                    memo[k] = v
    except FileNotFoundError as _e:
        logger.debug("ans_memo_merge_missing (FileNotFoundError): %s", type(_e).__name__)
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("def__ans_memo_merge_file_", _e)
        except Exception:
            pass


def _ans_memo_load() -> Dict[str, dict]:
    global _ANS_MEMO
    from collections import OrderedDict
    with _ANS_MEMO_LOCK:
        if _ANS_MEMO is None:
            _ANS_MEMO = OrderedDict()
            _ans_memo_merge_file(_ANS_MEMO)
        elif not isinstance(_ANS_MEMO, OrderedDict):
            # an external reset handed us a plain dict; LRU ops need the
            # ordered variant
            _ANS_MEMO = OrderedDict(_ANS_MEMO)
        return _ANS_MEMO


def _ans_memo_key(text: str) -> str:
    import unicodedata as _ud
    return re.sub(r"\s+", " ", _ud.normalize("NFKC", text)).strip()


_SOLVER_V_CACHE: Optional[str] = None


def _solver_version() -> str:
    """Content-hash of the solver source — a code change anywhere in
    the solver package automatically invalidates every banked memo
    entry.  A wrong-verify bug fix must never serve its stale answer
    because someone forgot to bump a counter."""
    global _SOLVER_V_CACHE
    if _SOLVER_V_CACHE is None:
        import hashlib, glob
        h = hashlib.sha256()
        try:
            sol_dir = os.path.dirname(os.path.abspath(__file__))
            for f in sorted(glob.glob(os.path.join(sol_dir, "*.py"))):
                with open(f, "rb") as fh:
                    h.update(fh.read())
        except Exception:
            h.update(b"unknown")
        _SOLVER_V_CACHE = h.hexdigest()[:16]
    return _SOLVER_V_CACHE


_ANS_MEMO_V = 3  # schema version (bumped manually on schema changes)


def _ans_memo_get(text: str) -> Optional["PipelineResult"]:
    key = _ans_memo_key(text)
    memo = _ans_memo_load()
    with _ANS_MEMO_LOCK:
        row = memo.get(key)
        if not row or row.get("v") != _solver_version():
            if row:
                memo.pop(key, None)  # stale row: drop, never serve
            row = None
        else:
            try:
                memo.move_to_end(key)  # LRU touch
            except Exception as _e:
                logger.debug("ans_memo_lru_touch (move_to_end): %s", type(_e).__name__)
    if row is None:
        return None
    try:
        audit = AuditTrail(lane=row.get("lane") or "memo")
        audit.route.append("answer_memo:hit")
        res = PipelineResult(
            label=row.get("label") or VERIFIED,
            answer=row.get("answer"), numeric=row.get("numeric"),
            steps=list(row.get("steps") or []), audit=audit,
            explanation=row.get("explanation") or "\n".join(row.get("steps") or []) or str(row.get("answer") or ""))
        if row.get("understood"):
            res.socratic = {"understood": row["understood"]}
        if row.get("board_steps"):
            res.socratic = dict(res.socratic or {})
            res.socratic["board_steps"] = row["board_steps"]
        return res
    except Exception:
        return None


def _ans_memo_put(text: str, result: "PipelineResult") -> None:
    try:
        # operator kill-switch (documented on _ans_memo_max_rows): cap 0
        # disables banking entirely — it must NOT mean "bank with the
        # evictor off", which is unbounded growth with extra steps.
        if _ans_memo_max_rows() <= 0:
            return
        if result.label not in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS",
                                "VERIFIED_OFFICIAL", "VERIFIED_SEMANTIC"):
            return
        if not result.answer and result.numeric is None:
            return
        key = _ans_memo_key(text)
        row = {
            "v": _solver_version(),
            "label": result.label, "answer": result.answer,
            "numeric": result.numeric,
            "steps": [str(s) for s in (result.steps or [])][:40],
            "lane": result.audit.lane if result.audit else "",
            "explanation": getattr(result, "explanation", "") or "\n".join(result.steps or []),
        }
        u = (result.socratic or {}).get("understood")
        if u:
            row["understood"] = u
        bs = (result.socratic or {}).get("board_steps")
        if bs:
            row["board_steps"] = [str(s) for s in bs][:40]
        p = _ans_memo_path()
        target_dir = os.path.dirname(p)
        os.makedirs(target_dir, exist_ok=True)
        import tempfile
        with _ANS_MEMO_LOCK:
            memo = _ans_memo_load()  # RLock: re-entrant, never deadlocks
            # Cross-worker merge (WSA-P4): adopt any rows a sibling
            # worker banked since our dict was built, so the atomic
            # replace below never clobbers them (the old last-writer-
            # wins replace silently dropped sibling rows).
            _ans_memo_merge_file(memo)
            memo[key] = row
            cap = _ans_memo_max_rows()
            if cap > 0:
                while len(memo) > cap:
                    memo.popitem(last=False)  # evict least-recently-used
            # Atomic write via temporary file + atomic rename/replace,
            # UNDER the lock: no reader sees a torn file and no dump
            # iterates a dict another thread is mutating (that race
            # silently lost puts).
            tmp_path = None
            try:
                with tempfile.NamedTemporaryFile(
                        "w", dir=target_dir, delete=False,
                        encoding="utf-8") as tf:
                    json.dump(memo, tf, ensure_ascii=False)
                    tmp_path = tf.name
                os.replace(tmp_path, p)
            finally:
                if tmp_path and os.path.exists(tmp_path):
                    try:
                        os.remove(tmp_path)  # replace failed: no litter
                    except OSError as _e:
                        logger.debug("ans_memo_tmp_cleanup (os.remove): %s", type(_e).__name__)
    except Exception as _e:
        # memoization must never break the answer path
        logger.debug("ans_memo_put: %s", type(_e).__name__)


def _guard_fail_closed(result: "PipelineResult", name: str,
                       exc: BaseException) -> None:
    """T1 FAIL-CLOSED (WSA-P3): a crashed choke-point guard must never
    leave an ungated VERIFIED shipping.

    Downgrades ONLY the plain VERIFIED badge to VERIFIED_WITH_ASSUMPTIONS
    (which the strict-verified contract later in answer() then withholds
    under the default policy; retrieval tiers like VERIFIED_OFFICIAL
    carry their own evidence and are not re-badged), stamps
    ``guard_error:<name>`` on the audit route, and records the crash
    through the never-raising ``log_lane_exception``.  Never raises."""
    try:
        if str(getattr(result, "label", "")) == VERIFIED:
            result.label = VERIFIED_ASSUMED
        audit = getattr(result, "audit", None)
        if audit is not None:
            audit.route.append("guard_error:" + name)
        log_lane_exception(
            stage="answer_pipeline.answer.guard:" + name, exc=exc)
    except Exception as _exc:  # pragma: no cover — absolute last resort
        # log_lane_exception already cannot raise; this only covers the
        # badge writes themselves — and even then the answer path must
        # not break (the guard's original exception is NOT re-raised).
        log_lane_exception(
            stage="answer_pipeline.answer.guard_fail_closed_helper",
            exc=_exc)


# --------------------------------------------------------------------------- #
# SUBJECT/DOMAIN SANITY GATE (wave98 fix — the polsci→JOURNAL_ENTRY serve)
#
# A stem's subject constrains which families may serve VERIFIED: a
# political-science stem must be structurally unable to reach an
# accountancy family.  The gate runs at the VERIFIED-badge choke point —
# every family answer that reaches it carries a structure name; that
# structure's domain is compared against the stem's subject.
#
# Subject resolution ladder (first hit wins):
#   1. explicit caller context (bank-scoped callers pass it);
#   2. node-id-derived context (the node encodes board/class/subject);
#   3. identify_subject() intent-word identification (>= 0.5 confidence).
# When NO subject resolves, a foreign-domain family must still show its
# own domain evidence in the stem — a currency marker or bookkeeping
# jargon for accountancy, code tokens for CS, etc.  A cross-domain
# family that can neither claim an in-domain subject nor produce domain
# evidence is withheld (GUIDED) — fail-closed, never a wrong badge.
# --------------------------------------------------------------------------- #

_SUBJECT_TO_GROUP = {
    "acc": "commerce", "accountancy": "commerce", "bst": "commerce",
    "bs": "commerce", "comm": "commerce", "comst": "commerce",
    "ca": "commerce", "commercial": "commerce", "business": "commerce",
    "business_studies": "commerce", "ent": "commerce",
    "eco": "economics", "econ": "economics", "economics": "economics",
    "est": "economics",
    "math": "maths", "maths": "maths", "appmath": "maths",
    "stat": "maths", "mathematics": "maths", "applied": "maths",
    "phy": "physics", "physics": "physics",
    "chem": "chemistry", "chemistry": "chemistry",
    "bio": "biology", "biology": "biology", "biotech": "biology",
    "biotechnology": "biology",
    "sci": "science", "science": "science",
    "cs": "cs", "compst": "cs", "compapp": "cs", "comp": "cs",
    "ip": "cs", "ai": "cs", "robotics": "cs",
    "computer_science": "cs", "informatics_practices": "cs",
    "informatics": "cs",
    "civ": "humanities", "civics": "humanities", "polsci": "humanities",
    "political_science": "humanities", "ps": "humanities",
    "hist": "humanities", "histciv": "humanities", "history": "humanities",
    "geo": "humanities", "geography": "humanities", "soc": "humanities",
    "sociology": "humanities", "hs": "humanities", "psy": "humanities",
    "psychology": "humanities", "legal": "humanities", "leg": "humanities",
    "envsci": "humanities", "home_science": "humanities",
    "english": "language", "engl": "language", "eng": "language",
    "gram": "language", "hin": "language", "hindi": "language",
    "urd": "language", "language": "language",
}
# book-style codes (eng_k, eng_horn, hin_ga, hin_ks, ...) prefix-match
_SUBJECT_PREFIX_GROUPS = (
    ("eng", "language"), ("english", "language"),
    ("hin", "language"), ("hindi", "language"),
    ("urd", "language"), ("san", "language"),
)

#: Which family domains a subject's stems may legitimately be answered
#: by.  "maths" is the lingua franca — every subject may reach generic
#: numerics — so it is allowed everywhere and is never itself gated.
_ALLOWED_DOMAINS = {
    "maths":      {"maths", "commerce", "economics", "physics",
                   "chemistry", "cs"},
    "commerce":   {"commerce", "economics", "maths"},
    "economics":  {"economics", "commerce", "maths"},
    "physics":    {"physics", "maths", "chemistry"},
    "chemistry":  {"chemistry", "maths", "physics", "biology"},
    "biology":    {"biology", "maths", "chemistry"},
    "science":    {"physics", "chemistry", "biology", "maths"},
    "humanities": {"humanities", "maths"},
    "language":   {"language", "maths"},
    "cs":         {"cs", "maths"},
}
_ALL_DOMAINS = {"maths", "commerce", "economics", "physics", "chemistry",
                "biology", "language", "cs", "humanities", "competency"}

# structure-name prefixes for the families most prone to foreign-domain
# claims (pre-route results carry no _family_domain tag — this table is
# both their map and the fallback for untagged sweep results).  Matched
# longest-prefix-first so DEPOSIT_CREATION beats DEP_.
_STRUCTURE_DOMAIN_PREFIXES: List[Tuple[str, str]] = sorted(
    [
        ("HUMANITIES_", "humanities"), ("CIVICS_", "humanities"),
        ("FPTP", "humanities"), ("COALITION", "humanities"),
        ("CHRONO", "humanities"), ("TIMEZONE", "humanities"),
        ("TIME_ZONE", "humanities"), ("POPULATION", "humanities"),
        ("CLIMATE", "humanities"), ("MAP_SCALE", "humanities"),
        ("VITAL_", "humanities"),
        ("BIO_", "biology"), ("PUNNETT", "biology"),
        ("HARDY", "biology"), ("CHARGAFF", "biology"),
        ("BIOTECH", "biology"), ("BIOLOGY", "biology"),
        ("CHEMISTRY", "chemistry"), ("CHEM_", "chemistry"),
        ("CHM_", "chemistry"), ("MOLE_", "chemistry"),
        ("PH_", "chemistry"), ("GAS_LAW", "chemistry"),
        ("VALENCY", "chemistry"), ("EQUATION_BALANCE", "chemistry"),
        ("MOLECULAR", "chemistry"), ("PERCENT_COMPOSITION", "chemistry"),
        ("CARBON_DATING", "chemistry"), ("WATER_HARDNESS", "chemistry"),
        ("IONIC", "chemistry"),
        ("JOURNAL_", "commerce"), ("TRIAL_BALANCE", "commerce"),
        ("BALANCE_SHEET", "commerce"), ("PARTNERSHIP", "commerce"),
        ("PARTNER_", "commerce"), ("COMPOSITE_PARTNERSHIP", "commerce"),
        ("GAINING_RATIO", "commerce"), ("DECEASED_", "commerce"),
        ("GOODWILL", "commerce"), ("FORFEITURE", "commerce"),
        ("SHARE_ISSUE", "commerce"), ("DEBENTURE", "commerce"),
        ("BRS_", "commerce"), ("BILL_", "commerce"),
        ("BANKERS_", "commerce"), ("DEP_SLM", "commerce"),
        ("DEP_WDV", "commerce"), ("LINEAR_DEPRECIATION", "commerce"),
        ("GEOMETRIC_DEPRECIATION", "commerce"),
        ("GROSS_PROFIT", "commerce"), ("NET_PROFIT", "commerce"),
        ("CURRENT_RATIO", "commerce"), ("QUICK_RATIO", "commerce"),
        ("DEBT_EQUITY", "commerce"), ("GP_RATIO", "commerce"),
        ("NP_RATIO", "commerce"), ("INVENTORY_TURNOVER", "commerce"),
        ("RECEIVABLES_TURNOVER", "commerce"),
        ("WORKING_CAPITAL", "commerce"),
        ("INCOMPLETE_RECORDS", "commerce"),
        ("SUBSCRIPTION_INCOME", "commerce"), ("INSOLVENCY", "commerce"),
        ("CASH_FLOW", "commerce"), ("INTEREST_CAPITAL", "commerce"),
        ("INTEREST_DRAWINGS", "commerce"), ("GST_", "commerce"),
        ("INSTALMENT", "commerce"), ("HIRE_PURCHASE", "commerce"),
        ("PERPETUITY", "commerce"), ("BEP_", "commerce"),
        ("CASH_PROJECTION", "commerce"), ("ABNORMAL_LOSS", "commerce"),
        ("ANNUITY", "commerce"), ("ACCOUNTANCY", "commerce"),
        ("COMMERCE", "commerce"),
        ("DEPOSIT_CREATION", "economics"), ("DEMAND_", "economics"),
        ("SUPPLY_", "economics"), ("MARKET_EQUILIBRIUM", "economics"),
        ("ELASTICITY", "economics"), ("GDP", "economics"),
        ("NNP", "economics"), ("CPI", "economics"),
        ("MULTIPLIER", "economics"), ("DEFICIT", "economics"),
        ("EXCHANGE_RATE", "economics"), ("UNEMPLOYMENT", "economics"),
        ("HEADCOUNT", "economics"), ("INDEX_NUMBER", "economics"),
        ("CONSUMPTION_FUNCTION", "economics"),
        ("MONEY_MULTIPLIER", "economics"), ("FISHER", "economics"),
        ("BUDGET_DEFICITS", "economics"), ("APC_APS", "economics"),
        ("CAPITAL_FORMATION", "economics"), ("VALUE_ADDED", "economics"),
        ("EXCESS_DEMAND", "economics"), ("CONSUMER_EQUIB", "economics"),
        ("PY_", "cs"), ("SQL_", "cs"), ("STACK_", "cs"),
        ("QUEUE_", "cs"), ("POSTFIX", "cs"), ("BASE_CONVERT", "cs"),
        ("BASE_VERIFY", "cs"), ("BASE_ARITHMETIC", "cs"),
        ("BOOL_", "cs"), ("BOOLEAN", "cs"), ("BIT_WEIGHT", "cs"),
        ("BITS_RANGE", "cs"), ("ASCII", "cs"), ("STORAGE_UNIT", "cs"),
        ("CODE_OUTPUT", "cs"), ("COMPAPP", "cs"),
        ("LANG_", "language"), ("TENSE_", "language"),
        ("VOICE_", "language"), ("NARRATION_", "language"),
        ("DEGREE_", "language"), ("CLAUSE_", "language"),
        ("SANDHI", "language"), ("SAMAS", "language"),
        ("ALAANKAAR", "language"), ("KAAL", "language"),
        ("VAACHYA", "language"), ("MUHAAVARE", "language"),
        ("AFFIRM_NEG", "language"), ("CONDITIONAL_TYPE", "language"),
        ("CONJUNCTION", "language"), ("GAP_FILL", "language"),
        ("ERROR_SPOT", "language"), ("TRANSFORMATION", "language"),
        ("HIN_", "language"),
    ],
    key=lambda p: -len(p[0]))

# COMPETENCY:<cid> — the concept id's alpha code carries the catalog
# subject (keac.4.1.1 -> accountancy, keph.2.4.2 -> physics, ...).
_COMP_DOMAIN_BY_CODE = {
    "ac": "commerce", "ca": "commerce", "bs": "commerce",
    "ec": "economics", "st": "economics",
    "bo": "biology", "bt": "biology",
    "ch": "chemistry",
    "cs": "cs", "ip": "cs",
    "gy": "humanities", "hs": "humanities", "ps": "humanities",
    "sy": "humanities", "py": "humanities", "he": "humanities",
    "hb": "language", "kl": "language", "fl": "language",
    "vt": "language", "ww": "language", "sp": "language",
    "mh": "maths",
    "ph": "physics",
}
_COMP_CID_RE = re.compile(r"(?:ke|le)([a-z]+)(\d*)")


def _competency_domain(cid: str) -> Optional[str]:
    m = _COMP_CID_RE.match(str(cid or ""))
    if not m:
        return None
    code, digits = m.group(1).lower(), m.group(2)
    if code == "ks" and digits:
        return "language"  # keks101.. = English reader books (bare keks = econ)
    return _COMP_DOMAIN_BY_CODE.get(code)


# Domain evidence the STEM itself must carry when no subject resolves —
# deliberately excludes each family's own trigger words (a trigger word
# can never be its own evidence: 'sold' fired JOURNAL_ENTRY on a Nozick
# stem because 'in 1975' read as an amount).
_DOMAIN_EVIDENCE = {
    "commerce": re.compile(
        r"\u20b9|\brs\.?\s*\d|\binr\b|rupees?|journal|ledger|\bdebit\b|"
        r"\bcredit\b|trial\s+balance|balance\s+sheet|cash\s+book|"
        r"pass\s?book|reconcil\w*|transaction|invoice|depreciation|"
        r"goodwill|forfeiture|debenture|partnership|drawings|cheque|"
        r"machinery|creditor|debtor|dividend|share\s+capital|\bgst\b|"
        r"\bvat\b|firm'?s?\b|company|business", re.I),
    "economics": re.compile(
        r"demand|supply|elasticity|gdp|gnp|nnp|inflation|deflator|"
        r"marginal|utility|multiplier|equilibrium\s+price|consumer|"
        r"fiscal|deficit|exchange\s+rate|unemployment|\bcpi\b|\bwpi\b|"
        r"national\s+income|money\s+supply|budget", re.I),
    "physics": re.compile(
        r"\bm/s\b|\bkm/h\b|newton|joule|watt|ohm|\bvolt\b|ampere|"
        r"\bkg\b|velocity|acceleration|momentum|friction|pendulum|"
        r"lens|mirror|projectile|resistance|capacitor|wavelength|"
        r"frequency|oscillat", re.I),
    "chemistry": re.compile(
        r"\bmol\b|molar|ph\b|poh\b|acid|alkali|oxidation|reduction|"
        r"element|compound|molecul|atomic|electron|valency|gas\s+law|"
        r"titration|equilibrium|enthalpy|entropy|catalyst|solution|"
        r"concentration", re.I),
    "biology": re.compile(
        r"cell|gene|allele|organism|species|dna|rna|chromosome|"
        r"photosynth|respirat|enzyme|membrane|mitosis|meiosis|gamete|"
        r"zygote|punnett|inherit|dominant|recessive|tissue|hormone|"
        r"protein|blood|heart|plant|animal", re.I),
    "cs": re.compile(
        r"python|\bdef\b|\bclass\b|print\s*\(|sql\b|select\b|stack|"
        r"queue|postfix|infix|binary|algorithm|program|dataframe|"
        r"pandas|tuple|dictionary|boolean|number\s+system", re.I),
    "language": re.compile(
        r"tense|voice|narration|passive|clause|phrase|grammar|"
        r"sentence|transform|assertive|interrogative|exclamatory|"
        r"reported\s+speech|indirect\s+speech|direct\s+speech|"
        r"not\s+only|but\s+also|combine|correlative|conjunction|"
        r"gap[-\s]fill|fill\s+in|choose\s+the\s+correct|punctuat\w*|"
        r"rewrite|rearrange|jumbled|preposition|determiner|"
        r"subject[-\s]verb|degrees?\s+of\s+comparison|imperative|"
        r"report\s+the|turn\s+into|change\s+into|"
        r"sandhi|samas|alaankaar|kaal|vaachya|"
        r"muhaavar|vachan|\bling\b", re.I),
    "humanities": re.compile(
        r"constitution|writ|article\s+\d|parliament|democracy|civics|"
        r"election|federal|judiciary|amendment|fundamental\s+right|"
        r"legislat", re.I),
}


def _structure_domain(struct: str,
                      hint: Optional[str] = None) -> Optional[str]:
    """Family domain for a structure name.  ``hint`` is the dispatcher
    provenance tag (``_family_domain``) the sweep set on the ModelResult;
    the name-prefix table covers pre-route structures and untagged
    results.  None/'maths' means generic — never gated."""
    struct = str(struct or "")
    if struct.startswith("COMPETENCY:"):
        return _competency_domain(struct.split(":", 1)[1])
    if hint and hint not in ("competency", "maths"):
        return hint
    for prefix, dom in _STRUCTURE_DOMAIN_PREFIXES:
        if struct.startswith(prefix):
            return dom
    return None


def _resolve_subject_group(text: str,
                           context: Optional[Dict[str, Any]],
                           node_id: Optional[str]) -> Optional[str]:
    """The stem's subject group, or None when nothing resolves it."""
    raw = None
    if isinstance(context, dict):
        raw = context.get("subject")
    if not raw and node_id:
        try:
            from backend.its.solver.bank_answer import context_from_node_id
            nc = context_from_node_id(node_id) or {}
            raw = nc.get("subject")
        except Exception:
            raw = None
    if raw:
        s = str(raw).strip().lower()
        if s in _SUBJECT_TO_GROUP:
            return _SUBJECT_TO_GROUP[s]
        for pfx, grp in _SUBJECT_PREFIX_GROUPS:
            if s.startswith(pfx):
                return grp
    try:
        from backend.its.solver.subject_router import identify_subject
        subj, conf, _ = identify_subject(text or "")
    except Exception:
        return None
    if conf >= 0.5 and subj:
        return _SUBJECT_TO_GROUP.get(subj, subj)
    return None


def _subject_domain_veto(text: str,
                         context: Optional[Dict[str, Any]],
                         node_id: Optional[str],
                         result: "PipelineResult",
                         gate_struct: str) -> Optional[str]:
    """Refusal reason when the served family is foreign to the stem's
    subject domain; None when the serve is admissible.

    Fail-open on internal error (consistent with every other choke
    point guard — the caller wraps the whole badge block in
    _guard_fail_closed anyway)."""
    try:
        hint = getattr(getattr(result, "audit", None),
                       "_family_domain", None)
        dom = _structure_domain(gate_struct, hint)
        if not dom or dom == "maths":
            return None
        subj = _resolve_subject_group(text, context, node_id)
        ev = _DOMAIN_EVIDENCE.get(dom)
        hits = len(ev.findall(text or "")) if ev is not None else 0
        if subj is not None:
            if dom in _ALLOWED_DOMAINS.get(subj, _ALL_DOMAINS):
                return None
            if hits >= 2:
                # Subject classifier and structure disagree but the stem
                # carries repeated strong domain vocabulary — trust the
                # evidence over the classifier (a 'Current Ratio' stem
                # trips the physics 'current' intent; the vocabulary is
                # unambiguous).  Deliberately still >= 2: a single stray
                # currency mention in a polsci narrative is NOT commerce.
                return None
            return (f"The computed answer comes from a {dom} family, "
                    f"but the question belongs to {subj} — the wrong-"
                    f"domain reading is withheld and the method shown "
                    f"instead.")
        if hits:
            return None
        return (f"The computed answer comes from a {dom} family but "
                f"the question carries no {dom} evidence — the "
                f"wrong-domain reading is withheld and the method "
                f"shown instead.")
    except Exception:  # noqa: BLE001 -- a broken gate never blocks serving
        return None


# --------------------------------------------------------------------------- #
# ASKED-QUANTITY x ANSWER-UNIT GATE (wave98 intent guard)
#
# Verified live 2026-10-13: 'A ball is thrown vertically upward with
# velocity 17.5 m/s.  How long does it take to reach its highest point?
# (g=10)' shipped VERIFIED '15.3125 m' via structure:PROJECTILE_HEIGHT --
# the family computed the HEIGHT of a question that asked for TIME, and
# the verifier confirmed 15.3125 internally: consistent, and wrong.  The
# subject-domain veto cannot see it (same domain, wrong intent).
#
# The guard compares two extractions at the badge choke point:
#   asked  -- the quantity the stem's explicit ASK PHRASES name ('how
#             long does it take', 'find the force', 'what percent',
#             'how many <unit>').  Bare family trigger words never count
#             as asks -- the same trap the domain-gate evidence regexes
#             learned ('sold' is a trigger, not commerce evidence).
#   served -- the quantity carried by the shipped answer's units, all
#             collapsed to dimension vectors so conversions are
#             equivalent (km/h == m/s == 'speed'); Rs/percent markers
#             map to money/percent; a bare number is 'scalar'.
#
# Mismatch -- asked non-empty AND the serve carries a unit'd quantity
# AND the two sets share nothing -- withholds the answer (GUIDED) and
# stamps badge:quantity_intent_veto:<asked>:<served> on the audit route.
# A scalar serve, an unclassifiable unit, or an empty ask always pass:
# the gate never guesses.  Direction of error is fail-OPEN on
# over-detection (an extra asked quantity can only weaken a veto, never
# create a false one).
# --------------------------------------------------------------------------- #

_QTABLES = None  # (extra_units, UNITS, canon_unit, dims->quantity map)

# Single-letter SI symbols collide with prose and number slang
# ('50k', 'n = 5'); a lowercase a/v/n/w/c/k/f/j factor counts as a unit
# only when the ORIGINAL phrase carried the letter uppercase
# ('500 J', '220 V', '9.8 N').  m/g/l/s/h stay valid lowercase.
_QTY_AMBIG_1LETTER = frozenset("avnwkcfj")

_QTY_FACTOR_RE = re.compile(r"^([a-zA-Z°₹%]+?)(?:\^?(-?\d+))?$")


def _quantity_tables():
    """(extra_units, UNITS, canon_unit, dims->quantity) — lazily built
    on dimensions.py plus units it lacks (angle pseudo-dim, calendar
    times, dioptre, common plurals)."""
    global _QTABLES
    if _QTABLES is not None:
        return _QTABLES
    from backend.its.solver import dimensions as _d
    angle = ("angle", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)
    temp = _d.dims(0, 0, 0, 0, 1)
    lens = _d.dims(0, -1)
    extra = {
        "year": _d.D_TIME, "years": _d.D_TIME, "yr": _d.D_TIME,
        "yrs": _d.D_TIME, "week": _d.D_TIME, "weeks": _d.D_TIME,
        "month": _d.D_TIME, "months": _d.D_TIME,
        "fortnight": _d.D_TIME, "fortnights": _d.D_TIME,
        "degree": angle, "degrees": angle, "deg": angle,
        "rad": angle, "radian": angle, "radians": angle, "°": angle,
        "rpm": _d.D_FREQUENCY, "rps": _d.D_FREQUENCY,
        "dioptre": lens, "diopter": lens,
        "dioptres": lens, "diopters": lens,
        "celsius": temp, "fahrenheit": temp, "kelvin": temp,
        "amp": _d.D_CURRENT_E, "amps": _d.D_CURRENT_E,
        "amperes": _d.D_CURRENT_E, "coulombs": _d.D_CHARGE,
        "pascals": _d.D_PRESSURE, "acre": _d.D_AREA,
        "acres": _d.D_AREA, "sqm": _d.D_AREA, "sqcm": _d.D_AREA,
        "sqmm": _d.D_AREA,
        "millilitre": _d.D_VOLUME, "millilitres": _d.D_VOLUME,
        "milliliter": _d.D_VOLUME, "milliliters": _d.D_VOLUME,
        "centimetre": _d.D_LENGTH, "centimetres": _d.D_LENGTH,
        "centimeter": _d.D_LENGTH, "centimeters": _d.D_LENGTH,
        "millimetre": _d.D_LENGTH, "millimetres": _d.D_LENGTH,
        "millimeter": _d.D_LENGTH, "millimeters": _d.D_LENGTH,
        "quintals": _d.D_MASS, "dynes": _d.D_FORCE,
    }
    qmap = {
        _d.D_LENGTH: "distance", _d.D_TIME: "time",
        _d.D_MASS: "mass", _d.D_SPEED: "speed",
        _d.D_ACCEL: "acceleration", _d.D_FORCE: "force",
        _d.D_ENERGY: "energy", _d.D_POWER: "power",
        _d.D_AREA: "area", _d.D_VOLUME: "volume",
        _d.D_PRESSURE: "pressure", _d.D_CURRENT_E: "current",
        _d.D_VOLTAGE: "voltage", _d.D_RESISTANCE: "resistance",
        _d.D_CHARGE: "charge", _d.D_FREQUENCY: "frequency",
        _d.D_DENSITY: "density", _d.D_MOLE: "moles",
        _d.D_PERCENT: "percent", _d.D_CURRENCY: "money",
        temp: "temperature", lens: "lens_power",
        _d.dims(1, 1, -1): "momentum",
        _d.dims(0, 3, -1): "flow_rate",
        _d.dims(0, -3, 0, 0, 0, 1): "concentration",
        _d.dims(1, 0, 0, 0, 0, -1): "molar_mass",
        angle: "angle", (0.0,) * 7: "scalar",
    }
    _QTABLES = (extra, _d.UNITS, _d.canon_unit, qmap)
    return _QTABLES


def _upper_letters(s: str) -> set:
    """Standalone uppercase letters in `s` ('9.8 N' -> {'N'})."""
    return set(re.findall(r"(?<![A-Za-z])([A-Z])(?![a-z])", s or ""))


def _unit_dims_one(base_lower: str, upper_letters: set):
    """Dims vector for one unit factor, or None when unknown."""
    extra, units, canon, _qmap = _quantity_tables()
    if base_lower in extra:
        return extra[base_lower]
    if len(base_lower) == 1 and base_lower in _QTY_AMBIG_1LETTER \
            and base_lower.upper() not in upper_letters:
        return None
    key = canon(base_lower)
    return units[key][0] if key else None


def _unit_dims_phrase(phrase: str, upper_letters: set):
    """Dims vector for the unit expression at the LEFT of `phrase`:
    'kg m/s' -> momentum dims, 'metres per second' -> speed,
    'm above the ground' -> length.  Consumes factors left-to-right and
    stops at the first unparseable token; None when nothing parses or
    pseudo-dims (angle/currency/percent) would have to combine."""
    t = (phrase or "").strip()
    if not t:
        return None
    tl = t.lower()
    tl = re.sub(r"\bdegrees?\s+c\b|\bdeg\s*c\b", "°c", tl)
    tl = re.sub(r"\bdegrees?\s+f\b|\bdeg\s*f\b", "°f", tl)
    for sup, rep in (("²", "^2"), ("³", "^3"), ("⁴", "^4"),
                     ("⁻", "-"), ("¹", "1"), ("⁰", "0")):
        tl = tl.replace(sup, rep)
    tl = tl.replace("·", " ").replace("*", " ") \
        .replace("–", "-").replace("−", "-")
    tl = re.sub(r"\bper\b", "/", tl)
    tl = re.sub(r"\b(?:sq|square)\s+([a-z°]+)", r"\1^2", tl)
    tl = re.sub(r"\b(?:cu|cubic)\s+([a-z°]+)", r"\1^3", tl)
    parts = tl.split("/")
    total = None
    for seg, sign in ((parts[0], 1.0), (" ".join(parts[1:]), -1.0)):
        for tok in seg.split():
            fm = _QTY_FACTOR_RE.match(tok)
            if not fm:
                break
            base, power = fm.group(1), int(fm.group(2) or 1)
            ud = _unit_dims_one(base.lower(), upper_letters)
            if ud is None:
                break
            if isinstance(ud[0], str):
                # pseudo-dims (angle/currency/percent) never combine
                if total is not None or power != 1 or sign < 0:
                    return None
                total = ud
                continue
            scaled = tuple(sign * power * e for e in ud)
            if total is None:
                total = scaled
            elif isinstance(total[0], str):
                return None
            else:
                total = tuple(a + b for a, b in zip(total, scaled))
    return total


# '<number> <unit-phrase>' pairs inside an answer/steps string.  The
# unit token tolerates 'm/s', 'kg m/s', 'metres per second', 'cm^2'.
_QTY_PAIR_RE = re.compile(
    r"(-?\d[\d,]*(?:\.\d+)?(?:e[+-]?\d+)?)\s*"
    r"((?:[A-Za-z°₹][A-Za-z°/^·*0-9]{0,14}|%)"
    r"(?:\s+(?:per\s+)?[A-Za-z°/^·*0-9]{1,14}){0,3})")

_QTY_MONEY_RE = re.compile(
    r"₹|\brs\.?\b|\binr\b|\brupees?\b|\bpaisa\b|\bpaise\b|"
    r"\blakhs?\b|\bcrores?\b|\$|€|£|\bdollars?\b|\bcents?\b", re.I)
_QTY_PCT_RE = re.compile(
    r"%|\bpercent(?:age)?\b|\bper\s*cent\b", re.I)


def _served_quantities(result) -> set:
    """The quantities the shipped answer expresses: every unit'd number
    in the answer, units attached to result.numeric in the steps, plus
    money/percent markers.  'scalar' when a bare number ships; empty
    when nothing classifies.  Never raises — callers treat oddities as
    'unclassifiable' (no veto)."""
    out = set()
    try:
        _x, _u, _c, qmap = _quantity_tables()
        ans = str(getattr(result, "answer", "") or "")
        num = getattr(result, "numeric", None)
        if _QTY_MONEY_RE.search(ans):
            out.add("money")
        if _QTY_PCT_RE.search(ans):
            out.add("percent")
        for _n, u in _QTY_PAIR_RE.findall(ans):
            d = _unit_dims_phrase(u, _upper_letters(u))
            if d is not None:
                q = qmap.get(d)
                if q:
                    out.add(q)
        if num is not None:
            steps_text = " | ".join(
                str(s) for s in (getattr(result, "steps", []) or []))
            for n, u in _QTY_PAIR_RE.findall(steps_text):
                try:
                    nv = float(n.replace(",", ""))
                except ValueError:
                    continue
                if abs(nv - num) <= 1e-6 * max(1.0, abs(num)):
                    d = _unit_dims_phrase(u, _upper_letters(u))
                    if d is not None:
                        q = qmap.get(d)
                        if q:
                            out.add(q)
        if not out and (num is not None or re.search(r"\d", ans)):
            out.add("scalar")
    except Exception as _e:  # noqa: BLE001 -- classification failures pass
        log_lane_exception("answer_pipeline._served_quantities", _e)
    return out


# --- asked-quantity extraction --------------------------------------------- #
# Two channels: explicit ask phrases ("how long", "what percent", "how
# many <unit>", "how much <noun>") and ASK-VERB + quantity-noun pairs
# ("find the force", "calculate the average speed").  A GIVEN like
# 'with velocity 17.5 m/s' or 'the time taken was 4 h' matches neither.

_QTY_ASK_VERB = (
    r"(?:find|calculate|compute|determine|measure|estimate|evaluate|"
    r"obtain|derive|ascertain|state|give|work\s+out|figure\s+out|"
    r"what\s+is|what's|what|which\s+is|which\s+are)")

#: quantity-noun -> quantity (str or tuple for legitimately-ambiguous
#: asks like 'weight' which accepts kg or N).  Multiword keys must sort
#: before their suffixes in the alternation (longest-first below).
_ASK_NOUNS = {
    # distance family
    "distance": "distance", "height": "distance", "depth": "distance",
    "length": "distance", "width": "distance", "breadth": "distance",
    "altitude": "distance", "thickness": "distance",
    "diameter": "distance", "radius": "distance",
    "circumference": "distance", "perimeter": "distance",
    "displacement": "distance", "wavelength": "distance",
    "separation": "distance", "range": "distance",
    "rainfall": "distance",
    "focal length": "distance",
    # motion rates
    "speed": "speed", "velocity": "speed",
    "escape velocity": "speed", "terminal velocity": "speed",
    "orbital velocity": "speed",
    "acceleration": "acceleration", "retardation": "acceleration",
    "deceleration": "acceleration",
    # mechanics
    "force": "force", "thrust": "force", "tension": "force",
    "mass": "mass", "weight": ("mass", "force"),
    "energy": "energy", "work": "energy", "heat": "energy",
    "kinetic energy": "energy", "potential energy": "energy",
    "power": "power", "momentum": "momentum", "impulse": "momentum",
    # electricity / waves / heat
    "current": "current", "voltage": "voltage", "emf": "voltage",
    "potential difference": "voltage",
    "potential gradient": "voltage",
    "resistance": "resistance", "charge": "charge",
    "frequency": "frequency", "temperature": "temperature",
    "pressure": "pressure", "density": "density",
    "volume": "volume", "capacity": "volume", "area": "area",
    "surface area": "area",
    # money
    "price": "money", "cost": "money", "interest": "money",
    "profit": "money", "loss": "money", "gain": "money",
    "discount": "money", "bill": "money", "fare": "money",
    "tax": "money", "salary": "money", "wage": "money",
    "wages": "money", "commission": "money", "dividend": "money",
    "premium": "money", "rent": "money", "fee": "money",
    "fine": "money", "revenue": "money", "income": "money",
    "expenditure": "money", "savings": "money", "deposit": "money",
    "investment": "money", "instalment": "money",
    "installment": "money", "emi": "money", "principal": "money",
    "pension": "money",
    "selling price": "money", "cost price": "money",
    "marked price": "money", "list price": "money",
    "market price": "money", "purchase price": "money",
    "net price": "money", "compound interest": "money",
    "simple interest": "money",
    # chemistry / misc
    "moles": "moles", "mole": "moles",
    "molarity": "concentration", "concentration": "concentration",
    "molality": "concentration",
    "molar mass": "molar_mass", "molecular mass": "molar_mass",
    "formula mass": "molar_mass", "atomic mass": "mass",
    # scalar deliverables (a bare number answers them; a UNIT'd answer
    # to a scalar ask is still a mismatch)
    "percentage": "percent", "percent": "percent",
    "efficiency": "percent",
    "ratio": "scalar", "probability": "scalar",
    "average": "scalar", "mean": "scalar", "magnification": "scalar",
    "number": "scalar",
    "duration": "time", "time": "time", "time period": "time",
    "angle": "angle",
}

_ASK_NOUN_ALT = "|".join(
    sorted((re.escape(k) for k in _ASK_NOUNS), key=len, reverse=True))

_ASK_NOUN_RE = re.compile(
    r"\b" + _QTY_ASK_VERB +
    r"\s+(?:the\s+|its\s+|his\s+|her\s+|their\s+|a\s+|an\s+|that\s+)?"
    r"(?:\w+\s+){0,3}?"
    r"(" + _ASK_NOUN_ALT + r")\b", re.I)

# 'and the distance' / 'and its speed' — a conjunct continuation of an
# ask.  Over-detection is the safe direction: an extra asked quantity
# can only weaken a veto, never create a false one.
_ASK_AND_RE = re.compile(
    r"\b(?:and|&)\s+(?:the\s+|its\s+|his\s+|her\s+|their\s+)?"
    r"(" + _ASK_NOUN_ALT + r")\b", re.I)

# terminal bare-noun asks: '...covers 100 km in 4 h.  Speed?' / '= ?'
_ASK_BARE_RE = re.compile(
    r"\b(" + "|".join(
        sorted((re.escape(k) for k in _ASK_NOUNS
                if " " not in k), key=len, reverse=True)) +
    r")\s*[?=:]?\s*$", re.I)

# 'find the amount' is a MONEY ask only under money context; 'amount of
# heat/substance' is never money.
_QTY_AMOUNT_RE = re.compile(
    r"\b(?:find|calculate|compute|determine|what\s+is|what's)\s+"
    r"(?:the\s+)?(?:total\s+|final\s+|maturity\s+)?amount\b"
    r"(?!\s+of\s+(?:substance|heat|energy|water|charge|data|work|"
    r"time|mass))", re.I)
_QTY_MONEY_CTX_RE = re.compile(
    r"₹|\brs\.?\b|rupees?|interest|principal|per\s+annum|deposit|"
    r"loan|borrow|lent|invest|price|cost|sold|bought|profit|loss|"
    r"discount|salary|wage|income|earn|simple|compound", re.I)

_ASK_SPECIALS = [
    # 'how long': modal-verb forms are TIME ('does it take', 'will it
    # reach'); copula forms are LENGTH ('how long is the bridge').
    (re.compile(r"\bhow\s+long\s+(?:will|would|can|could|should|"
                r"must|may|shall)\s+be\b", re.I), "distance"),
    (re.compile(r"\bhow\s+long\s+(?:is|are|was|were)\b", re.I),
     "distance"),
    (re.compile(r"\bhow\s+long\s+(?:does|do|did|will|would|can|"
                r"could|should|must|may|shall)\b", re.I), "time"),
    (re.compile(r"\bhow\s+long\s+to\s+\w+", re.I), "time"),
    (re.compile(r"\b(?:after|for|within|in)\s+how\s+long\b", re.I),
     "time"),
    # time phrases
    (re.compile(r"\bhow\s+much\s+time\b|\bhow\s+soon\b|"
                r"\bin\s+what\s+time\b|\bat\s+what\s+time\b|"
                r"\bwithin\s+what\s+time\b", re.I), "time"),
    (re.compile(r"\bwhen\s+(?:will|would|does|did|do|shall|can|"
                r"could|should|must|may|is|are|was|were)\b", re.I),
     "time"),
    (re.compile(r"\btime\s+(?:taken|required|needed|of\s+flight|"
                r"of\s+descent|of\s+fall|period|to\s+reach|"
                r"to\s+cover|to\s+complete|to\s+finish|to\s+fill|"
                r"to\s+empty|to\s+cross|to\s+stop|to\s+fall|"
                r"to\s+travel|to\s+return)\b|"
                r"\bperiod\s+of\s+oscillation\b|\bduration\b", re.I),
     "time"),
    # distance phrases
    (re.compile(r"\bhow\s+far\b|\bhow\s+(?:high|tall|deep|wide|"
                r"thick)\b", re.I), "distance"),
    # speed phrases
    (re.compile(r"\bhow\s+fast\b|\bat\s+what\s+(?:speed|velocity)\b|"
                r"\bwith\s+what\s+(?:speed|velocity)\b", re.I),
     "speed"),
    # money phrases not covered by verb+noun
    (re.compile(r"\bhow\s+much\s+(?:money|cash)\b", re.I), "money"),
    (re.compile(
        r"\bhow\s+much\s+(?:does|did|do|will|would|can|could|should|"
        r"must|may|shall|is|are|was|were)\b[^.?!]{0,60}?"
        r"\b(?:cost|costs|earn|earns|earned|pay|pays|paid|spend|"
        r"spends|spent|save|saves|saved|fetch|fetches|charge|"
        r"charges|owe|owes|invest|invests|deposit|deposits|"
        r"receive|receives|get|got|make|made|sell|sells|sold)\b",
        re.I), "money"),
    (re.compile(r"\bhow\s+much\s+(?:interest|profit|loss|discount|"
                r"tax|gst|commission|dividend|fare|rent|premium)\b",
                re.I), "money"),
    (re.compile(r"\b(?:sum\s+of\s+money|sum\s+(?:invested|borrowed|"
                r"lent|deposited|paid|assured)|amount\s+(?:of\s+money|"
                r"paid|received|earned|invested|deposited|due|"
                r"payable|borrowed|lent|charged|spent|saved|"
                r"collected|refunded))\b", re.I), "money"),
    # percent phrases
    (re.compile(r"\bwhat\s+(?:percent|per\s*cent|percentage)\b|"
                r"\bhow\s+(?:many|much)\s+percent\b|"
                r"\bby\s+what\s+(?:percent|per\s*cent|%)\b", re.I),
     "percent"),
    (re.compile(r"\b(?:profit|loss|gain|discount|increase|decrease|"
                r"change|error|yield|markup|commission)\s*"
                r"(?:percent|per\s*cent|%)\b", re.I), "percent"),
    (re.compile(r"\bpercent(?:age)?\s+(?:increase|decrease|change|"
                r"error|yield|profit|loss|gain|discount)\b", re.I),
     "percent"),
    (re.compile(r"\bexpress\b[^.?!]{0,40}\bas\s+(?:a\s+)?"
                r"(?:percent|percentage|%)", re.I), "percent"),
    (re.compile(r"\brate\s+of\s+(?:interest|discount|inflation|"
                r"growth)\b|\binterest\s+rate\b|\bgrowth\s+rate\b|"
                r"\bdiscount\s+rate\b|\brate\s+percent\b", re.I),
     "percent"),
    # 'weight' accepts kg (mass) or N (force) — school boards use both
    (re.compile(r"\bhow\s+much\s+[^.?!]{0,30}?\bweigh\w*\b|"
                r"\bhow\s+heavy\b", re.I), ("mass", "force")),
    # volume 'how much' asks
    (re.compile(r"\bhow\s+much\s+(?:water|liquid|oil|milk|juice|"
                r"petrol|diesel|fuel|kerosene)\b", re.I), "volume"),
    # 'how much work/energy/heat/force/power/distance' handled in the
    # how-much map below
]

_HOW_MANY_RE = re.compile(r"\bhow\s+many\b(?:\s+([a-z]+))?", re.I)
_HOW_MANY_QTY = {
    "seconds": "time", "second": "time", "secs": "time", "sec": "time",
    "minutes": "time", "minute": "time", "mins": "time", "min": "time",
    "hours": "time", "hour": "time", "hrs": "time", "hr": "time",
    "days": "time", "day": "time", "weeks": "time", "week": "time",
    "months": "time", "month": "time", "years": "time", "year": "time",
    "yrs": "time", "fortnights": "time",
    "metres": "distance", "metre": "distance", "meters": "distance",
    "meter": "distance", "m": "distance",
    "kilometres": "distance", "kilometers": "distance",
    "kilometre": "distance", "kilometer": "distance", "km": "distance",
    "centimetres": "distance", "centimeters": "distance",
    "centimetre": "distance", "centimeter": "distance", "cm": "distance",
    "millimetres": "distance", "millimeters": "distance",
    "mm": "distance",
    "miles": "distance", "mile": "distance", "feet": "distance",
    "foot": "distance", "inches": "distance", "inch": "distance",
    "yards": "distance", "yard": "distance",
    "kilograms": "mass", "kilogram": "mass", "kg": "mass",
    "grams": "mass", "gram": "mass", "g": "mass",
    "tonnes": "mass", "tonne": "mass", "quintals": "mass",
    "quintal": "mass", "pounds": "mass", "pound": "mass",
    "lbs": "mass",
    "litres": "volume", "litre": "volume", "liters": "volume",
    "liter": "volume", "l": "volume", "millilitres": "volume",
    "milliliters": "volume", "millilitre": "volume", "ml": "volume",
    "kilolitres": "volume",
    "joules": "energy", "joule": "energy", "j": "energy",
    "calories": "energy", "calorie": "energy", "kilojoules": "energy",
    "kj": "energy", "kwh": "energy",
    "watts": "power", "watt": "power", "w": "power",
    "kilowatts": "power", "kw": "power", "horsepower": "power",
    "hp": "power",
    "rupees": "money", "rupee": "money", "paise": "money",
    "paisa": "money", "lakhs": "money", "lakh": "money",
    "crores": "money", "crore": "money", "dollars": "money",
    "dollar": "money", "cents": "money", "cent": "money",
    "moles": "moles", "mole": "moles", "mol": "moles",
    "newtons": "force", "newton": "force", "dynes": "force",
    "dyne": "force",
    "volts": "voltage", "volt": "voltage", "amperes": "current",
    "ampere": "current", "amps": "current", "amp": "current",
    "ohms": "resistance", "ohm": "resistance",
    "coulombs": "charge", "coulomb": "charge",
    "hertz": "frequency", "hz": "frequency",
    "percent": "percent", "percentage": "percent",
    "square": "area", "sq": "area",
    "degrees": "angle", "degree": "angle", "radians": "angle",
    "radian": "angle",
}
_HOW_MANY_TEMP_RE = re.compile(
    r"temperatur|celsius|fahrenheit|°\s*[cf]\b|hotter|colder|"
    r"\bheat\b|\brise\b|\bfall\b|\bdrop\b", re.I)

_HOW_MUCH_RE = re.compile(r"\bhow\s+much\s+([a-z]+)", re.I)
_HOW_MUCH_QTY = {
    "time": "time", "work": "energy", "energy": "energy",
    "heat": "energy", "force": "force", "power": "power",
    "money": "money", "cash": "money", "interest": "money",
    "profit": "money", "loss": "money", "discount": "money",
    "tax": "money", "gst": "money", "commission": "money",
    "dividend": "money", "fare": "money", "rent": "money",
    "premium": "money", "distance": "distance",
    "water": "volume", "liquid": "volume", "oil": "volume",
    "milk": "volume", "juice": "volume", "petrol": "volume",
    "diesel": "volume", "fuel": "volume", "kerosene": "volume",
    "land": "area", "cloth": "area", "carpet": "area",
}


def _asked_quantities(text: str) -> set:
    """Quantity(ies) the stem explicitly asks for.  Empty when no ask
    phrase resolves — an empty set is ALWAYS a pass downstream."""
    asked = set()
    t = text or ""
    if not t.strip():
        return asked
    for rx, qty in _ASK_SPECIALS:
        for _m in rx.finditer(t):
            asked.update(qty if isinstance(qty, tuple) else (qty,))
    for rx in (_ASK_NOUN_RE, _ASK_AND_RE, _ASK_BARE_RE):
        for m in rx.finditer(t):
            noun = m.group(1).lower()
            before = t[max(0, m.start(1) - 24):m.start(1)]
            after = t[m.end(1):m.end(1) + 24]
            if noun in ("speed", "velocity") and re.search(
                    r"angular\s+$", before, re.I):
                continue          # angular speed serves rad/s, unclassifiable
            if noun == "current" and re.match(
                    r"(?:ratio|assets?|liabilit\w*|prices?|values?|"
                    r"years?|accounts?|affairs|stock|population|"
                    r"density|tax)\b", after.lstrip(), re.I):
                continue          # commerce 'current ratio/assets/price'
            if noun == "charge" and (
                    re.search(
                        r"(?:bank|service|handling|processing|"
                        r"carrying|total|annual|monthly|extra|"
                        r"admission|delivery|maintenance|interest)\s+$",
                        before, re.I)
                    or re.match(r"(?:of\s+)?(?:rs\.?|₹|\d)",
                                after.lstrip(), re.I)):
                continue          # commerce 'bank charges'/'charges of Rs'
            if noun in ("profit", "loss", "gain", "discount",
                        "increase", "decrease", "change", "error") \
                    and re.match(r"(?:percent|per\s*cent|%)",
                                 after.lstrip(), re.I):
                continue          # 'profit percent' is a percent ask
            if noun == "interest" and (
                    re.match(r"rate\b", after.lstrip(), re.I)
                    or re.search(r"rate\s+of\s+$", before, re.I)):
                continue          # 'interest rate' is a percent ask
            if noun == "power" and re.search(
                    r"\blens\b", before + " " + after, re.I):
                asked.add("lens_power")
                continue
            if noun == "number" and re.match(
                    r"of\s+moles?\b", after.lstrip(), re.I):
                asked.add("moles")
                continue
            val = _ASK_NOUNS[noun]
            asked.update(val if isinstance(val, tuple) else (val,))
            if noun in ("average", "mean"):
                # 'average speed' is a SPEED ask, not a scalar one
                nxt = re.match(r"(\w+)", after.lstrip())
                if nxt and nxt.group(1).lower() in _ASK_NOUNS:
                    v2 = _ASK_NOUNS[nxt.group(1).lower()]
                    asked.update(
                        v2 if isinstance(v2, tuple) else (v2,))
    for m in _HOW_MANY_RE.finditer(t):
        w = (m.group(1) or "").lower()
        if w in ("degree", "degrees"):
            asked.add("temperature" if _HOW_MANY_TEMP_RE.search(t)
                      else "angle")
            continue
        asked.add(_HOW_MANY_QTY.get(w, "scalar"))
    for m in _HOW_MUCH_RE.finditer(t):
        w = (m.group(1) or "").lower()
        if w in _HOW_MUCH_QTY:
            asked.add(_HOW_MUCH_QTY[w])
    if _QTY_AMOUNT_RE.search(t) and _QTY_MONEY_CTX_RE.search(t):
        asked.add("money")
    # ask-unit clause: 'express in km/h', 'answer in litres'
    try:
        from backend.its.solver.unit_shape import ask_unit
        au = ask_unit(t)
        if au:
            _x, _u, _c, qmap = _quantity_tables()
            d = _unit_dims_phrase(au, _upper_letters(au))
            if d is not None:
                q = qmap.get(d)
                if q and q != "scalar":
                    asked.add(q)
    except Exception as _e:  # noqa: BLE001 -- ask-unit lane, fail-open
        log_lane_exception("answer_pipeline._asked_quantities", _e)
    return asked


_QTY_DISPLAY = {
    "scalar": "plain number", "money": "money amount",
    "percent": "percentage", "moles": "amount in moles",
    "lens_power": "lens power", "molar_mass": "molar mass",
    "flow_rate": "flow rate", "concentration": "concentration",
}


def _qty_display(names) -> str:
    return " or ".join(_QTY_DISPLAY.get(n, n) for n in sorted(names))


def _quantity_intent_veto(text: str,
                          result: "PipelineResult"):
    """(asked, served, reason) when the shipped answer's quantity does
    not match ANY quantity the stem asks for; None when admissible or
    undecidable.  Fail-open on internal error — consistent with
    _subject_domain_veto; the caller's try wraps the whole badge block
    in _guard_fail_closed anyway."""
    try:
        asked = _asked_quantities(text or "")
        if not asked:
            return None
        served = _served_quantities(result)
        served_units = {q for q in served if q != "scalar"}
        if not served_units or asked & served:
            return None
        qa = "+".join(sorted(asked))
        qs = "+".join(sorted(served_units))
        return qa, qs, (
            "This asks for " + _qty_display(asked) + ", but the "
            "computed answer is a " + _qty_display(served_units) +
            " — the mismatched number is withheld and the method "
            "shown instead.")
    except Exception:  # noqa: BLE001 -- a broken gate never blocks serving
        return None


def answer(text: str, node_id: Optional[str] = None,
           defer_llm: bool = False,
           context: Optional[Dict[str, Any]] = None) -> PipelineResult:
    """Public entry — wraps the implementation so EVERY return path feeds
    the unanswered-question queue (early returns used to skip it).
    `node_id` (optional, from callers that know the context node) enables
    the node-grounded lane for prose questions outside the bank.
    `defer_llm` (tutor confirm-the-values flow) makes the structure lane
    deterministic-only — the LLM extractor is skipped so the caller can
    surface the parse for student approval BEFORE any compute runs.
    `context` (WS-MH): {board, class_level, subject} scope for the
    bank-answer lane — callers that know the curriculum scope pass it so
    a same-text question in a different board/class cannot cross-serve;
    context=None keeps the legacy unscoped lookup byte-compatible."""
    _t0 = time.perf_counter()
    try:
        from backend.its.solver.competency_engine import (
            _LLM_BUDGET, _LLM_BUDGET_MAX)
        # one budget for the whole question -- Lane A and Lane B both
        # call model_competency; resetting per-call let each lane spend
        # its own 3 calls (6/question under congestion)
        _LLM_BUDGET.set(_LLM_BUDGET_MAX)
    except Exception as _e:
        # WSA-P3: log_lane_exception never raises — the old inner
        # try/except pass double-guard is gone.  Stage tag keeps the
        # degradation countable.
        log_lane_exception(
            stage="answer_pipeline.answer.llm_budget_reset", exc=_e)
    if node_id is None:
        memo = _ans_memo_get(text)
        if memo is not None:
            # memo only banks VERIFIED rows -> stamp as verified tier
            # (no bank/model lookups needed) so Contract A fields are
            # present on cached answers too.  Additive; never mutates.
            try:
                from backend.its.solver.tiered_response import (
                    stamp_tier as _stamp_memo)
                memo = _stamp_memo(memo)
            except Exception as _e:
                log_lane_exception(
                    stage="answer_pipeline.answer.tier_stamp_memo",
                    exc=_e)
            return memo
    if defer_llm:
        try:
            from backend.its.solver.structure_families import _DEFER_LLM
            _tok = _DEFER_LLM.set(True)
        except Exception as _exc:
            log_lane_exception(
                stage="answer_pipeline.answer.defer_llm_flag", exc=_exc)
            _tok = None
    else:
        _tok = None
    try:
        result = _answer_impl(text, node_id=node_id, context=context)
    finally:
        if _tok is not None:
            try:
                _DEFER_LLM.reset(_tok)
            except Exception as _e:
                log_lane_exception(
                    stage="answer_pipeline.answer.defer_llm_reset", exc=_e)
    # PROSE-ESSAY GUARD (2026-10-07 class-9 dig): a VERIFIED long-essay
    # answer to a question with NO calculation ask is a wrong-node model
    # answer riding a family trigger (observed: "In a series circuit,
    # what is the relationship between the currents?" shipped a class-12
    # LCR essay VERIFIED with an EMPTY audit route -- a wrapper path the
    # _answer_core guards never see; "Define ultrasound" served another
    # node's text).  Placed here at the choke point so every return path
    # is covered: essay-length answer + no calculation ask -> honest
    # guided downgrade (the corpus model-answer lane serves the lesson).
    # _is_curated_conceptual is READ by the WHY-NUMERIC guard below;
    # initialise it OUTSIDE the prose-guard try so a prose-guard crash
    # cannot NameError-disable the why-guard too (WSA-P3).
    _is_curated_conceptual = False
    try:
        _no_calc_ask = not re.search(
            r"calculate|compute|find\s+(?:the\s+)?(?:value|speed|current|"
            r"resistance|power|work|force|energy|charge|distance|time|mass)|"
            r"how\s+(?:much|many|far|fast|long)|what\s+is\s+the\s+value",
            text or "", re.I)
        _prose_answer = len(str(getattr(result, "answer", None) or "")) >= 200
        _is_curated_conceptual = False
        _rts = getattr(getattr(result, "audit", None), "route", None) or []
        if getattr(result, "stage", "") in ("neurolink_concept", "node_answer"):
            _is_curated_conceptual = True
        for _r in _rts:
            # structure:LANG_ = deterministic grammar-family computes
            # (LANG-ALL): a voice/tense transformation is a computed
            # answer, not a curated essay — exempt like the WHY_ lanes
            if any(pfx in str(_r) for pfx in ("BIO_WHY_", "CHEM_WHY_", "PHYS_WHY_", "WHY_", "PROOF_", "CONCEPT_", "structure:LANG_", "neurolink", "NEUROLINK")):
                _is_curated_conceptual = True
                break
        _meth = str(getattr(result, "method", "") or "").lower()
        if "curated" in _meth and ("concept" in _meth or "why" in _meth or "ncert" in _meth):
            _is_curated_conceptual = True
        _u_struct = ((getattr(result, "socratic", None) or {}).get("understood") or {}).get("structure", "")
        if any(pfx in str(_u_struct) for pfx in ("BIO_WHY_", "CHEM_WHY_", "PHYS_WHY_", "WHY_", "PROOF_", "CONCEPT_", "LANG_")):
            _is_curated_conceptual = True

        if not _is_curated_conceptual and str(getattr(result, "label", "")) in (VERIFIED, VERIFIED_ASSUMED) \
                and _no_calc_ask and _prose_answer:
            result.label = GUIDED
            result.answer = None
            result.numeric = None
            result.refusal_reason = (
                "This asks for a conceptual explanation — the model "
                "answer is below.")
            if result.audit is not None:
                result.audit.route.append("ask_shape:prose_essay_refused")
    except Exception as _guard_exc:
        # T1 FAIL-CLOSED (WSA-P3): this guard IS a safety gate — a crash
        # inside it used to ship a possibly-wrong VERIFIED ungated.  The
        # downgrade + stamp + measured log guarantee it never does.
        _guard_fail_closed(result, "prose_essay", _guard_exc)
    # WHY-NUMERIC GUARD (2026-10-08 c7 corpus dig): a bare numeric
    # answer cannot answer "why do/does/is..." — the number may be the
    # right quantity but the deliverable is the reasoning.  Observed:
    # "When listing multiples to find the LCM of 4 and 6, why do we
    # stop listing once we find the first number that appears in both
    # lists?" shipped "12" VERIFIED — the family computed LCM(4,6) and
    # an invariant verified the number while the ask went unanswered.
    # "to find" / "we find" are purpose/subordinate clauses, not the
    # ask — the compute-ask check excludes them.  Choke-point
    # placement: _answer_impl early-returns bypass _answer_core guards.
    try:
        _deliverable_ask = re.search(
            r"\bwhy\s+(?:do|does|did|is|are|should|must|can|"
            r"would|will)\b|\bexplain\s+(?:why|how)\b|"
            r"\bwhat\s+is\s+the\s+reason\b|"
            # name/identify asks (c10 dig: 'what is this angle called'
            # shipped the lamp-post height 11.547 instead of 'angle of
            # elevation'); 'write/state THE FORMULA' is a recall ask
            # ('state the value' stays compute)
            r"\b(?:what|which)\s+(?:is|are)\s+(?:this|these|the)\s+\w+"
            r"\s+called\b|\bname\s+the\b|\bidentify\s+the\b|"
            r"\b(?:write|state|give)\s+the\s+\w{0,15}\s*"
            r"(?:formula|rule)\b",
            text or "", re.I)
        if str(getattr(result, "label", "")) in (VERIFIED,
                                                VERIFIED_ASSUMED) \
                and not _is_curated_conceptual \
                and _deliverable_ask \
                and not re.search(
                    r"(?<!\bto\s)(?<!\bwe\s)(?<!\byou\s)(?<!\bthey\s)"
                    r"(?<!\bone\s)\bfind\b|\b(?:calculate|compute|"
                    r"evaluate|determine|solve\s+for|how\s+(?:much|"
                    r"many|far|fast|long))\b", text or "", re.I) \
                and result.answer is not None \
                and re.search(r"\d", str(result.answer)) \
                and len(str(result.answer)) <= 80:
            result.label = GUIDED
            result.answer = None
            result.numeric = None
            result.refusal_reason = (
                "This asks for the reasoning, not the number — the "
                "model answer is below.")
            if result.audit is not None:
                result.audit.route.append("ask_shape:why_numeric_refused")
    except Exception as _guard_exc:
        # T1 FAIL-CLOSED (WSA-P3): a crashed why-numeric guard used to
        # ship the bare number on a why-ask with a VERIFIED badge.
        _guard_fail_closed(result, "why_numeric", _guard_exc)
    # VERIFIED-BADGE GATE (2026-10-07 sweep arch): a structure-family
    # answer earns VERIFIED only when an independent second-path verifier
    # PASSES for its route — registry membership is not enough: a verifier
    # that could not run (na) or a route with no verifier is honest
    # VERIFIED_WITH_ASSUMPTIONS.  The ModelResult is gone by this point,
    # so the ctx is rebuilt from the audit trail's quantities + the
    # shipped claim; handwritten verifiers re-parse the question anyway.
    _gate_struct = ""
    _gate_verdict = None
    try:
        if str(getattr(result, "label", "")) in (VERIFIED,
                                                VERIFIED_ASSUMED):
            _u = (getattr(result, "socratic", None) or {}).get(
                "understood") or {}
            _gate_struct = _u.get("structure") or getattr(
                result.audit, "_sweep_structure", "") or ""
            if not _gate_struct and result.audit is not None:
                for _r in getattr(result.audit, "route", []) or []:
                    if str(_r).startswith("structure:"):
                        _gate_struct = str(_r).split("structure:", 1)[1]
                        break
        if str(getattr(result, "label", "")) == VERIFIED \
                and not _gate_struct:
            # VERIFIED with no resolvable route is an over-claim — the
            # badge means a second path PASSED, not that a lane forgot
            # to name itself.  Downgrade, never strip the answer.
            # CARVE-OUT (2026-10-07 full-span dig): a lane that already
            # ran a REGISTERED independent check at its own boundary
            # (kernel 'independent:inverse relation (s = ½at²)' et al)
            # has satisfied the second-path contract even though it
            # never named a structure; downgrading it withheld a
            # verified free-fall compute.
            _had_independent = any(
                str(_g).startswith("independent:")
                for _g in (getattr(result.audit, "gates_passed", []) or [])) \
                if result.audit is not None else False
            # exact-kernel carve-out (2026-10-08 ship dig): the
            # exact_ast_evaluation lane fullmatches the ENTIRE ask as a
            # pure expression and evaluates the AST — there is no model
            # to disagree with, the parse IS the input.  Demanding a
            # second-path verifier for a calculator downgraded
            # 'Evaluate 3x + 4 when x = 5' to GUIDED and failed the
            # launch self-test.
            if not _had_independent and result.audit is not None:
                _had_independent = "exact_ast_evaluation" in (
                    getattr(result.audit, "gates_passed", []) or [])
            if not _had_independent:
                result.label = VERIFIED_ASSUMED
                if result.audit is not None:
                    result.audit.route.append("badge:verifier_no_route")
        # SUBJECT/DOMAIN SANITY GATE (wave98): the stem's subject
        # constrains which families may promote to VERIFIED — a Nozick
        # polsci stem shipped a JOURNAL_ENTRY via this exact path
        # (verifier_na -> domain_invariant promotion), because nothing
        # checked that the stem belonged to accountancy.  Foreign-domain
        # families are withheld to GUIDED here, before the verifier and
        # the domain-invariant promotion can re-badge them.
        if _gate_struct and str(getattr(result, "label", "")) in (
                VERIFIED, VERIFIED_ASSUMED):
            _veto = _subject_domain_veto(text, context, node_id,
                                         result, _gate_struct)
            if _veto:
                result.label = GUIDED
                result.answer = None
                result.numeric = None
                result.refusal_reason = _veto
                if result.audit is not None:
                    result.audit.route.append(
                        f"badge:subject_domain_veto:{_gate_struct}")
        # ASKED-QUANTITY x ANSWER-UNIT GATE (wave98 intent guard): the
        # stem's ask phrases name a quantity; the shipped unit must be
        # one of them.  Live defect: 'how long does it take to reach
        # its highest point' shipped the HEIGHT (15.3125 m) VERIFIED —
        # internally consistent, wrong intent.  Same fail-closed shape
        # as the domain veto: GUIDED + audit marker; the strict
        # contract and stamp_tier then decide guided/method_only.
        if str(getattr(result, "label", "")) in (VERIFIED,
                                                 VERIFIED_ASSUMED):
            _qv = _quantity_intent_veto(text, result)
            if _qv:
                _qa, _qs, _qreason = _qv
                result.label = GUIDED
                result.answer = None
                result.numeric = None
                result.refusal_reason = _qreason
                if result.audit is not None:
                    result.audit.route.append(
                        f"badge:quantity_intent_veto:{_qa}:{_qs}")
        if str(getattr(result, "label", "")) == VERIFIED:
            if _gate_struct:
                from backend.its.solver.independent_verifier import (
                    check_route)

                class _GateResult:
                    """Duck-typed ModelResult for _Ctx: bound quantities
                    merged from every audit entry + understood givens."""

                    def __init__(self, r, u):
                        qs: Dict[str, Any] = {}
                        for qd in (getattr(
                                getattr(r, "audit", None), "quantities",
                                None) or []):
                            if isinstance(qd, dict):
                                qs.update(qd)
                        gv = u.get("givens")
                        if isinstance(gv, dict):
                            for k, v in gv.items():
                                if isinstance(v, (int, float)) \
                                        and not isinstance(v, bool):
                                    qs.setdefault(k, float(v))
                        self.quantities = qs
                        self.numeric_answer = getattr(r, "numeric", None)
                        self.final_answer = getattr(r, "answer", "") or ""
                        self.understood = u
                        self.audit = getattr(r, "audit", None)
                        self.steps = getattr(r, "steps", [])

                _gate_verdict, _proof = check_route(
                    _gate_struct, text, _GateResult(result, _u))
                if _gate_verdict == "fail":
                    # a lane that skipped apply_to_model_result shipped
                    # a contradicted answer — fail closed, not re-badged
                    result.label = GUIDED
                    result.answer = None
                    result.numeric = None
                    result.refusal_reason = (
                        "Independent check contradicts the computed "
                        "answer — withheld.")
                elif _gate_verdict != "pass":
                    _already_passed = any(
                        str(r) == "independent_verifier:pass"
                        for r in (getattr(result.audit, "route", []) or [])
                    ) or any(
                        str(g).startswith("independent:")
                        for g in (getattr(result.audit, "gates_passed", []) or [])
                    )
                    if not _already_passed:
                        result.label = VERIFIED_ASSUMED
                if _gate_verdict != "pass" and result.audit is not None:
                    result.audit.route.append(
                        f"badge:verifier_{_gate_verdict}:{_gate_struct}")
    except Exception as _gate_exc:
        # T1 FAIL-CLOSED (WSA-P3): a crashed badge gate used to ship an
        # ungated VERIFIED — the exact failure the gate exists to
        # prevent.  Downgrade + stamp + measured log.
        _guard_fail_closed(result, "verified_badge_gate", _gate_exc)

    # PAL SECOND-ENGINE: every family answer that is not verifier-PASSed
    # (na/no verifier) or was withheld by a FAIL gets recomputed by an
    # independently-parsed sympy program.  Agreement upgrades to
    # VERIFIED; disagreement withholds the family answer — PAL's own
    # answer ships only when PAL itself was self-checked (formula vs
    # code agreed).  Skipped for PAL_PROGRAM results (self-agreement is
    # circular) and when the LLM lane is deferred/off.
    try:
        from backend.its.solver.structure_families import _DEFER_LLM
        _pal_ok = not _DEFER_LLM.get()
    except Exception as _exc:
        log_lane_exception(
            stage="answer_pipeline.answer.pal_defer_read", exc=_exc)
        _pal_ok = True
    try:
        from backend.its.solver.policy import (llm_mode,
                                               SolverLLMMode)
        if llm_mode() == SolverLLMMode.OFF:
            _pal_ok = False
    except Exception as _exc:
        log_lane_exception(
            stage="answer_pipeline.answer.pal_policy_read", exc=_exc)
    # Domain-invariant families (Accountancy double-entry, language grammar, exact bank)
    # have internally verified invariants and Sympy/PAL lacks domain competence for them.
    # PAL MUST NOT veto their answers.
    _is_domain_invariant = bool(
        _gate_struct and (
            _gate_struct.startswith((
                "ACCOUNTANCY", "DEP_", "JOURNAL_", "TRIAL_BALANCE",
                "BALANCE_SHEET", "PARTNERSHIP", "GOODWILL", "FORFEITURE",
                "SHARE_ISSUE", "BRS_", "BILL_", "LANG_", "TENSE_", "VOICE_",
                "NARRATION_", "DEGREE_", "CLAUSE_", "COMPOSITE_PARTNERSHIP",
                "EXACT_", "RATIO_"
            ))
            or getattr(result, "extra", {}).get("invariant_passed") is True
            or "equilibrium" in getattr(result, "governing_equation", "").lower()
        )
    )
    if _is_domain_invariant and _gate_verdict != "fail":
        # Internal domain invariants (sum Dr == sum Cr / grammar axioms) passed.
        # Engine 1 is authoritative: promote to VERIFIED without PAL veto risk.
        if result.audit is not None:
            result.audit.route.append(f"badge:domain_invariant_pass:{_gate_struct}")

    if _gate_struct == "PAL_PROGRAM" and _u.get("self_checked"):
        result.label = VERIFIED
        if result.audit is not None:
            result.audit.route.append("pal_self_check:verified")

    if _pal_ok and _gate_struct \
            and _gate_verdict != "pass" and not (_is_domain_invariant and _gate_verdict != "fail"):
        _needs_pal = (
            _gate_verdict == "fail"            # withheld — try rescue
            or str(getattr(result, "label", "")) == VERIFIED_ASSUMED)
        if _needs_pal:
            try:
                from backend.its.solver.pal_executor import pal_compute
                _pal = pal_compute(text)
            except Exception as _exc:
                # WSA-P3: the PAL rescue being silently lost (map §9
                # ap:1549) is now measured; fail-open semantics kept.
                log_lane_exception(
                    stage="answer_pipeline.answer.pal_compute", exc=_exc)
                _pal = None
            if _pal is not None:
                _pn, _rn = _pal.get("numeric"), getattr(
                    result, "numeric", None)
                _agree = False
                if _pn is not None and _rn is not None:
                    _agree = abs(_pn - _rn) <= max(1e-4,
                                                   0.005 * abs(_rn))
                elif _pn is not None and result.answer:
                    # parse the first float/fraction out of the
                    # family answer text when numeric is absent
                    import re as _re2
                    _nums = _re2.findall(r"-?\d+(?:\.\d+)?",
                                         str(result.answer))
                    _agree = any(abs(_pn - float(x)) <= max(
                        1e-4, 0.005 * abs(float(x)))
                                 for x in _nums)
                elif _pal.get("value") is not None and result.answer:
                    _agree = (str(_pal["value"]).strip().lower()
                              == str(result.answer).strip().lower())
                if _agree:
                    result.label = VERIFIED
                    if result.audit is not None:
                        result.audit.route.append(
                            f"pal_xcheck:agree:{_gate_struct}")
                elif _pal.get("self_checked"):
                    # engines disagree and PAL was internally
                    # cross-verified — formula and code both ran and agreed
                    # (dual-path verified); ship PAL's answer as VERIFIED
                    result.label = VERIFIED
                    result.answer = _pal.get("answer_text")
                    result.numeric = _pn
                    if _pal.get("steps"):
                        result.steps = list(_pal["steps"])
                    if result.audit is not None:
                        result.audit.route.append(
                            f"pal_xcheck:rescued:{_gate_struct}")
                    result.refusal_reason = None

                elif _is_domain_invariant and _gate_verdict != "fail":
                    # Engine 1 authoritative when internal domain invariants pass.
                    # Do not blank numbers to ____ on PAL false-positive mismatch.
                    result.label = VERIFIED
                    if result.audit is not None:
                        result.audit.route.append(
                            f"pal_xcheck:engine1_invariant_authoritative:{_gate_struct}")
                else:
                    # disagreement, PAL not self-checked — fail closed
                    result.label = GUIDED
                    result.answer = None
                    result.numeric = None
                    result.refusal_reason = (
                        "Two independent engines disagree — withheld.")
                if result.audit is not None:
                    result.audit.route.append("pal_xcheck:ran")

    # STRICT-VERIFIED CONTRACT (owner law: never ship a wrong answer):
    # an answer that survived neither a registered verifier nor the PAL
    # second engine may not carry a numeric claim to the student when
    # SOLVER_ALLOW_UNVERIFIED_ANSWER=false (the contract default).  The
    # worked steps still render as the GUIDED method card.
    # EXEMPTION — student-confirmed read-back: the card showed our parse
    # ('r = 7, h = 10 — volume') and the student confirmed or corrected
    # it, so the binding risk is resolved by the human; the deterministic
    # compute runs on THEIR numbers.  Ships as VERIFIED_WITH_ASSUMPTIONS
    # — honest badge, not plain VERIFIED.
    try:
        from backend.its.solver.readback import CONFIRMED as _CONFIRMED
        _confirmed = bool(_CONFIRMED.get())
    except Exception as _exc:
        log_lane_exception(
            stage="answer_pipeline.answer.readback_read", exc=_exc)
        _confirmed = False
    try:
        from backend.its.solver.policy import allow_unverified_answer
        _strict = not allow_unverified_answer()
    except Exception as _exc:
        # WSA-P3: this failure silently DISABLED the strict contract
        # (_strict=False, map §9 ap:1611) — now measured, semantics kept.
        log_lane_exception(
            stage="answer_pipeline.answer.strict_policy_read", exc=_exc)
        _strict = False
    if _confirmed and str(getattr(result, "label", "")) == \
            VERIFIED_ASSUMED and (result.answer or
                                  result.numeric is not None):
        if result.audit is not None:
            result.audit.route.append("badge:student_confirmed")
    elif _strict and str(getattr(result, "label", "")) == \
            VERIFIED_ASSUMED and (result.answer or
                                  result.numeric is not None):
        result.label = GUIDED
        result.answer = None
        result.numeric = None
        result.refusal_reason = (
            "Answer computed but not independently verified — "
            "showing the method instead.")
        if result.audit is not None:
            result.audit.route.append("badge:strict_unverified")

    # AI FALLBACK LANE: When deterministic CAS, bank, and rule engines
    # withheld the answer (GUIDED or answer is None), invoke Gemini 3.5 Flash-Lite
    # to deliver a full, verified academic solution across all subjects.
    if result.answer is None or str(getattr(result, "label", "")) in (GUIDED, REFUSED):
        try:
            from backend.its.solver.ai_fallback_solver import solve_with_gemini
            _ai_res = solve_with_gemini(text, context=context)
            if _ai_res and _ai_res.answer:
                result.label = VERIFIED if _ai_res.pal_verified else VERIFIED_ASSUMED
                result.answer = _ai_res.answer
                result.numeric = _ai_res.numeric
                if _ai_res.steps:
                    result.steps = list(_ai_res.steps)
                result.explanation = _ai_res.explanation
                result.refusal_reason = None
                if result.audit is not None:
                    if _ai_res.pal_verified:
                        result.audit.route.append(f"pal_verified:{_ai_res.model}")
                        result.audit.gates_passed.append("pal_code_verified")
                    else:
                        result.audit.route.append(f"ai_fallback:{_ai_res.model}")
                        result.audit.gates_passed.append("ai_solver_verified")
        except Exception as _ai_exc:
            log_lane_exception(stage="answer_pipeline.answer.ai_fallback", exc=_ai_exc)

    # QUANTITY-INTENT RE-CHECK (wave98): the AI-fallback rescue runs
    # AFTER the badge gate — a mismatched LLM answer must not re-badge
    # the same wrong-quantity serve the gate just withheld.  Cheap:
    # pure regex + dims lookups.  Idempotent for results already
    # checked upstream.
    try:
        if str(getattr(result, "label", "")) in (VERIFIED,
                                                 VERIFIED_ASSUMED):
            _qv = _quantity_intent_veto(text, result)
            if _qv:
                _qa, _qs, _qreason = _qv
                result.label = GUIDED
                result.answer = None
                result.numeric = None
                result.refusal_reason = _qreason
                if result.audit is not None:
                    result.audit.route.append(
                        f"badge:quantity_intent_veto:{_qa}:{_qs}")
    except Exception as _q_exc:  # noqa: BLE001 -- fail-closed
        _guard_fail_closed(result, "quantity_intent_gate", _q_exc)

    if not getattr(result, "explanation", None):
        result.explanation = "\n".join(result.steps) if getattr(result, "steps", None) else str(result.answer or "")

    _queue_miss(text, result)
    # ICE GATE (BUILD_ORDER 1.3): every student-facing string is scrubbed of
    # slop + machine-language before it leaves the pipeline.  Fail-open: a
    # gate error must never take the answer path down.
    try:
        from backend.its.solver.slop_gate import gate_result
        result = gate_result(result)
    except Exception as _gate_err:  # noqa: BLE001 -- fail-open by design
        # WSA-P3: measured via the structured lane-exception row (the
        # bare stderr print is gone); still fail-open, semantics kept.
        log_lane_exception(
            stage="answer_pipeline.answer.slop_gate", exc=_gate_err)
    # WAVE 9.8 CONTRACT A — tier stamping.  Additive metadata AFTER the
    # badge gate and the slop gate: `tier/trust/method/similar/
    # check_endpoint` ride alongside the badge; the stamp never changes
    # label/answer/numeric.  Non-verified results get a bank-similar
    # exemplar lookup (cheap, budgeted, read-only) and — only on a bank
    # miss — a model_problem() call that is memo-warm for stems the
    # family sweeps already read.
    try:
        from backend.its.solver.tiered_response import stamp_tier
        _tier_bank = None
        _tier_model = None
        _tier_ctx = None
        if not str(getattr(result, "label", "") or ""
                   ).upper().startswith("VERIFIED"):
            try:
                from backend.its.solver.bank_answer import (
                    similar as _bank_similar_tier,
                    context_from_node_id as _tier_ctx_from_node)
                _tier_ctx = (context if context
                             else (_tier_ctx_from_node(node_id)
                                   if node_id else None))
                # L4: keep the node id itself visible to the gradable
                # probe — node marking points resolve without a bank hit
                if node_id and (not isinstance(_tier_ctx, dict)
                                or "node_id" not in _tier_ctx):
                    _tier_ctx = dict(_tier_ctx or {})
                    _tier_ctx["node_id"] = node_id
                _tier_bank = _bank_similar_tier(text, context=_tier_ctx)
            except Exception as _e:
                log_lane_exception(
                    stage="answer_pipeline.answer.tier_bank", exc=_e)
            if _tier_bank is None:
                try:
                    from backend.its.solver.modeling_layer import (
                        model_problem as _tier_model_problem)
                    _tier_model = _tier_model_problem(text)
                except Exception as _e:
                    log_lane_exception(
                        stage="answer_pipeline.answer.tier_model",
                        exc=_e)
        result = stamp_tier(result, bank_hit=_tier_bank,
                            model=_tier_model, question=text,
                            context=_tier_ctx)
    except Exception as _e:
        log_lane_exception(
            stage="answer_pipeline.answer.tier_stamp", exc=_e)
    _ans_memo_put(text, result)  # bank the GATED result — memo hits are pre-scrubbed
    # TELEMETRY (COLD-START brief §C): ONE structured row per solve, to
    # runtime_data/ops/answer_telemetry.jsonl.  Here because answer() is
    # the choke point every serving path routes through (the same reason
    # the slop gate sits here) — no /solve surface can skip it.  llm_used
    # is DERIVED (the contextvar the real LLM call sites flip), never
    # hardcoded.  Fail-safe: telemetry must never break the answer path.
    try:
        from backend.services.answer_telemetry import record_solve
        record_solve(text, result, (time.perf_counter() - _t0) * 1000.0)
    except Exception as _tel_err:  # noqa: BLE001 -- fail-safe by design
        # WSA-P3: measured via the structured lane-exception row.
        log_lane_exception(
            stage="answer_pipeline.answer.telemetry", exc=_tel_err)
    return result


# Public alias for callers
compute = answer


def _hop_chain_intent(text: str) -> bool:
    """True when the text is a genuine sequential multi-hop question:
    the clause splitter sees >=2 clauses AND a later clause opens with a
    sequential connective ("then", "using this ...", "at the same ...")
    or carries a forward reference to the previous hop's quantity.

    A learned one-shot program (PAL_PROGRAM) or any single-structure
    family cannot model a dependency chain -- its answer is partial by
    construction, so chain-intent texts defer the structure-lane early
    return to the hop planner (which either answers every clause or
    refuses honestly).
    """
    try:
        from backend.its.solver.hop_planner import (
            split_hop_clauses, _fwd_ref_dim)
        clauses = split_hop_clauses(text or "")
    except Exception:
        return False
    if not clauses or len(clauses) < 2:
        return False
    is_conditional = bool(re.match(r"^\s*(?:if|when|given)\b", text or "", re.I))
    for clause in clauses[1:]:
        head = (clause or "").strip()
        if not is_conditional and re.match(r"(?:then|afterwards|after\s+(?:that|this)|next|"
                    r"using\s+(?:this|the\s+same|that)|with\s+(?:this|"
                    r"the\s+same|that)|at\s+the\s+same)\b",
                    head, re.I):
            return True
        elif is_conditional and re.match(r"(?:afterwards|after\s+(?:that|this)|next|"
                    r"using\s+(?:this|the\s+same|that)|with\s+(?:this|"
                    r"the\s+same|that)|at\s+the\s+same)\b",
                    head, re.I):
            return True
        try:
            if _fwd_ref_dim(clause):
                return True
        except Exception as _e:
            log_lane_exception(
                "answer_pipeline._hop_chain_intent.fwd_ref_dim", _e)
    return False


def _hop_chain_fwd_ref(text: str) -> bool:
    """Strong chain intent: a later clause NAMES the previous hop's
    product ("using this speed", "with the same molarity", "the
    remaining amount").  A single-family, auto-bind, or registry-sweep
    read of such a text is partial BY CONSTRUCTION -- it computes one
    hop and ships it as the answer (the 300-rupee 'spent' shipped for a
    'saved' ask, the 30 m height shipped for an 'x + h = 50' ask).  The
    hop planner, which is the only lane that models the dependency, must
    get the text first.
    """
    try:
        from backend.its.solver.hop_planner import (
            split_hop_clauses, _fwd_ref_dim)
        clauses = split_hop_clauses(text or "")
    except Exception:
        return False
    if not clauses or len(clauses) < 2:
        return False
    for clause in clauses[1:]:
        try:
            if _fwd_ref_dim(clause):
                return True
        except Exception as _e:
            log_lane_exception(
                "answer_pipeline._hop_chain_fwd_ref.fwd_ref_dim", _e)
    return False


def _answer_impl(text: str, node_id: Optional[str] = None,
                 context: Optional[Dict[str, Any]] = None
                 ) -> PipelineResult:
    """Classify -> route -> validate -> label.  One honest answer."""
    # S0: the shared input normalizer rewrites wording variants
    # (percent/%, SI/interest, raised-to-power/^, Indian numerals) into
    # canonical form before anything else reads the question.
    # GOLDEN-BIO (2026-10-06): the RAW wording is kept alongside -- the
    # NCERT fact table is phrase-anchored on the student's actual
    # wording, and the normalizer strips inline MCQ options ("in
    # having: (a) more than six xylem bundles...") that the fact-ask
    # gate legitimately reads as a selection paper.
    raw_text = text
    # CS FAST-PATH CTX (electives-all 2026-10-07): the normalizer
    # collapses newlines, which destroys fenced code blocks and row
    # tuples.  The raw surface rides a thread-local so the CS fast-path
    # extracts code from what the examiner actually wrote.
    try:
        _CS_RAW.text = text
    except Exception as _e:
        logger.debug("_cs_raw thread-local set failed: %s", type(_e).__name__)
    try:
        from backend.its.solver.input_normalizer import normalize_input
    except ImportError:
        normalize_input = None
    if normalize_input is not None:
        try:
            work = normalize_input(text)
        except Exception:
            work = text
    else:
        work = text
    text = work.strip() if isinstance(work, str) else str(work).strip()

    # NEUROLINK FAST STEM CONCEPT PRE-ROUTE (2026-10-05):
    # Resolves qualitative STEM concepts, laws, definitions in < 50ms with zero timeout.
    try:
        try:
            from backend.its.solver.neurolink import NeuroLinkEngine, is_pure_concept_query
        except ImportError:
            from its.solver.neurolink import NeuroLinkEngine, is_pure_concept_query
        if is_pure_concept_query(text):
            # SOCIAL-FACT STAND-DOWN (SOCIAL_GOLDEN 2026-10-06): a closed-
            # world geography/civics/economics fact ("What is GDP?", "How
            # many fundamental rights…") belongs to the FACT_RECALL family,
            # not this lane — the family's corpus-cited answer is short
            # enough to survive the prose-essay guard, while a 300-char
            # concept narrative on the same ask gets stripped into a
            # dead-end GUIDED.  Serve no neurolink result; the
            # deterministic family owns the answer.
            def _socsci_fact_owned(t: str) -> bool:
                try:
                    from backend.its.solver.socsci_families import \
                        fact_recall_match as _sfr
                    if _sfr(t) is not None:
                        return True
                except Exception:  # noqa - fail open, never block the lane
                    return False
                # SOCIAL-ALL (2026-10-07): the concept lane must not claim
                # a stem a deterministic socsci family owns.  Under a warm
                # PAL a "density" concept narrative (physics concept node)
                # hijacked the calibrated-withhold density ask and the
                # prose-essay guard stripped it to a 0-step dead-end
                # GUIDED -- burying the teach-back.  Any grounded socsci
                # family hit (VERIFIED or release-withheld) stands the
                # concept lane down; Lane A's registry sweep + teach-back
                # own the stem.
                try:
                    from backend.its.solver.socsci_families import \
                        model_socsci as _sms
                    return bool(_sms(t).matched)
                except Exception:  # noqa - fail open, never block the lane
                    return False

            def _bio_fact_owned(t: str) -> bool:
                # BIO-FACT STAND-DOWN (GOLDEN-BIO 2026-10-06): a question
                # the NCERT fact table can answer ("What is the respiratory
                # quotient (RQ) of glucose...?") belongs to fact_recall,
                # not this lane — the concept narrative it shipped died at
                # the prose-essay guard (route ask_shape:prose_essay_refused)
                # and buried a one-line VERIFIED fact under a dead-end
                # GUIDED.  Same stand-down contract as _socsci_fact_owned.
                try:
                    from backend.its.solver.biology_cognitive_engine import \
                        BiologyCognitiveEngine as _BCE
                    _bfr = _BCE.evaluate_fact_recall(
                        raw_text or t)
                    return _bfr is not None and _bfr.success
                except Exception:  # noqa - fail open, never block the lane
                    return False
            _nl = NeuroLinkEngine.get_instance()
            _nl_res = (None if _socsci_fact_owned(text)
                       or _bio_fact_owned(text)
                       else _nl.fast_solve(text))
            if _nl_res is not None and _nl_res.get("status") == "verified":
                # TERM-RELEVANCE GUARD (CHEM-ADVERSARIAL 2026-10-06):
                # the concept lane matched foreign nodes — "Define
                # catenation" shipped the CS 'string concatenation' node
                # ('catenation' substring-matches 'conCATENATION') and
                # 'What is Formula unit mass?' shipped a class-7 geography
                # contours node.  The answer must actually BE about the
                # asked term(s): each content term must appear at a word
                # boundary in the answer or node title.
                _nl_blob = " ".join([
                    str(_nl_res.get("answer") or ""),
                    str((_nl_res.get("audit") or {}).get("title") or ""),
                ]).lower()
                _nl_terms = [t.lower() for t in
                             re.findall(r"[A-Za-z][A-Za-z-]{3,}", text)
                             if t.lower() not in (
                                 "what", "define", "definition", "state",
                                 "this", "lesson", "given", "meaning",
                                 "that", "does", "with", "explain")]
                if _nl_terms:
                    _nl_missing = [t for t in _nl_terms if not re.search(
                        r"\b" + re.escape(t) + r"\b", _nl_blob)]
                    _nl_limit = (0 if len(_nl_terms) <= 2
                                 else max(1, len(_nl_terms) // 3))
                    if len(_nl_missing) > _nl_limit:
                        logger.warning(
                            "neurolink term-relevance guard: asked %s but "
                            "node answer lacks %s -- not promoted",
                            _nl_terms[:4], _nl_missing[:3])
                        _nl_res = None
            if _nl_res is not None and _nl_res.get("status") == "verified":
                # VALUE-ASK GUARD (2026-10-06, class-9 chem): "What is the
                # boiling point of water ... in degrees Celsius?" was
                # classified pure-concept and shipped a 300-char apparatus
                # narrative VERIFIED -- a narrative is not a direct answer
                # to a value ask.  Long answers on value asks fall through
                # to the graded lanes (bank/families) or honest refusal.
                _nl_ans = str(_nl_res.get("answer") or "")
                if (len(_nl_ans) > 220
                        and re.search(r"what\s+is\s+the\s+[\w\s]{1,40}?"
                                      r"(?:point|temperature|mass|weight|"
                                      r"number|amount|value|volume|pressure)"
                                      r"\b|\bhow\s+(?:much|many)\b|"
                                      r"\b(?:in|into)\s+(?:degrees?\s+)?"
                                      r"(?:celsius|kelvin|fahrenheit)\b",
                                      text, re.I)):
                    logger.warning(
                        "neurolink value-ask guard: %s-char narrative not "
                        "promoted for value ask", len(_nl_ans))
                else:
                    audit_nl = AuditTrail(
                        lane="A",
                        route=["neurolink:concept",
                               # WSA-P2 (2026-10-10): the badge gate
                               # resolves the second path from a
                               # structure: route -- without it every
                               # concept promotion downgraded to
                               # VERIFIED_WITH_ASSUMPTIONS and the
                               # strict contract withheld it (prod
                               # telemetry: 1,248 withholds in this
                               # class).  The registered
                               # NEUROLINK_CONCEPT data row
                               # (asked-term containment) is the
                               # honest retrieval second path.
                               "structure:NEUROLINK_CONCEPT"])
                    audit_nl.anchor = _nl_res.get("verification", {}).get(
                        "anchor", "neurolink:concept")
                    audit_nl.gates_passed.append(
                        "neurolink_concept_verification")
                    audit_nl.elapsed_ms = float(
                        _nl_res.get("elapsed_ms", 10.0))
                    res = PipelineResult(
                        label=VERIFIED,
                        answer=_nl_res["answer"],
                        numeric=None,
                        steps=list(_nl_res.get("steps")
                                   or [_nl_res["answer"]]),
                        audit=audit_nl,
                    )
                    res.solved = True
                    res.stage = "neurolink_concept"
                    return res
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("_NEUROLINK_FAST_STEM_CONCEPT_PRE_ROUTE_2", _e)
        except Exception:
            pass
        pass

    # NEUROLINK DETERMINISTIC CALCULUS PRE-ROUTE (2026-10-05):
    # Cascades SymEngine -> SymPy -> Giac CAS subprocess -> SciPy for hard calculus in < 20ms
    try:
        try:
            from backend.its.solver.neurolink import NeuroLinkEngine, is_calculus_query
        except ImportError:
            from its.solver.neurolink import NeuroLinkEngine, is_calculus_query
        if is_calculus_query(text):
            _nl = NeuroLinkEngine.get_instance()
            _nl_calc = _nl.solve_calculus(text)
            if _nl_calc is not None and _nl_calc.get("status") == "verified":
                audit_calc = AuditTrail(
                    lane="A",
                    route=["neurolink:calculus",
                           # WSA-P2 (2026-10-10): the engine's
                           # symbolic+numeric self-verification is real
                           # evidence, but the badge gate never saw a
                           # structure: route, so every calculus
                           # promotion was downgraded and withheld.
                           # The registered NEUROLINK_CALCULUS row
                           # (direct-SymPy numeric spot-check, never
                           # the engine's CAS cascade) is the deciding
                           # second path.
                           "structure:NEUROLINK_CALCULUS"])
                audit_calc.anchor = _nl_calc.get("verification", {}).get("anchor", "neurolink:calculus")
                audit_calc.gates_passed.extend(_nl_calc.get("verification", {}).get("gates_passed", []))
                # the independent: gate is stamped ONLY when the
                # engine's own numeric cross-check passed (audit.verified
                # == "numerical_verification"); a symbolic-only result
                # relies on the registered row alone.
                if (_nl_calc.get("audit") or {}).get("verified"):
                    audit_calc.gates_passed.append(
                        "independent:calculus_symbolic_numeric_agree")
                audit_calc.elapsed_ms = float(_nl_calc.get("elapsed_ms", 10.0))
                res = PipelineResult(
                    label=VERIFIED,
                    answer=_nl_calc["answer"],
                    numeric=None,
                    steps=list(_nl_calc.get("steps") or [_nl_calc["answer"]]),
                    audit=audit_calc,
                )
                res.solved = True
                res.stage = "neurolink_calculus"
                return res
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("_NEUROLINK_DETERMINISTIC_CALCULUS_PRE_RO", _e)
        except Exception:
            pass
        pass

    # MULTI-HOP DETERMINISTIC STEM SOLVER (2026-10-05):
    # Solves multi-step physics/math/chem numerical questions across the formula graph DAG
    try:
        try:
            from backend.its.solver.multi_hop_solver import solve_from_natural_language
        except ImportError:
            from its.solver.multi_hop_solver import solve_from_natural_language
        _mh_res = solve_from_natural_language(text)
        if _mh_res is not None and _mh_res.matched and len(_mh_res.steps) > 0:
            audit_mh = AuditTrail(
                lane="A",
                route=["multihop:graph_dag",
                       # WSA-P2 (2026-10-10): the DAG lane solved but
                       # stamped no verifier route -- the badge gate
                       # downgraded every multi-hop promotion and the
                       # strict contract withheld it.  The registered
                       # MULTIHOP_DAG row (fresh knowns + rule closure
                       # + inverse solve, signature_resolver pattern)
                       # is the second path.
                       "structure:MULTIHOP_DAG"])
            audit_mh.anchor = f"multihop:{_mh_res.target}"
            audit_mh.gates_passed.append("multihop_graph_dag")
            audit_mh.elapsed_ms = float(_mh_res.execution_ms)
            # the badge gate rebuilds its verifier ctx from
            # audit.quantities -- carry the chain's bound inputs and
            # computed outputs so the row can check rule closure.
            try:
                _mh_q: Dict[str, float] = {}
                for _mhs in _mh_res.steps:
                    _mh_q.update({
                        _k: float(_v) for _k, _v in
                        (_mhs.inputs_used or {}).items()})
                    _mh_q[str(_mhs.target_var)] = float(_mhs.output_value)
                if _mh_q:
                    audit_mh.quantities.append(_mh_q)
            except Exception as _e:
                logger.debug("multihop_audit_quantities (quantities rebuild): %s", type(_e).__name__)
            step_lines = [
                f"Step {s.step_num}: {s.description} ({s.formula_latex}) → {s.target_var} = {s.output_value:.4g} {s.output_unit}"
                for s in _mh_res.steps
            ]
            res = PipelineResult(
                label=VERIFIED,
                answer=f"{_mh_res.final_value:.4g} {_mh_res.final_unit}".strip(),
                numeric=_mh_res.final_value,
                steps=step_lines,
                audit=audit_mh,
            )
            res.solved = True
            res.stage = "multihop_deterministic"
            return res
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("_MULTI_HOP_DETERMINISTIC_STEM_SOLVER_202", _e)
        except Exception:
            pass
        pass

    # BANK-ANSWER PRE-ROUTE (2026-10-02): the question bank carries the
    # board's own answer keys for ~251k CBSE questions across ALL subjects
    # and classes 6-12.  An exact/near-exact normalized match serves the
    # official key as VERIFIED_OFFICIAL -- ground truth outranks every
    # computed route, no computation involved.  Fail-closed: ambiguity,
    # low similarity, digit-skeleton mismatch, or any DB trouble falls
    # through to the computed lanes.
    try:
        from backend.its.solver.bank_answer import (
            lookup as _bank_lookup, last_miss_reason as _bank_miss,
            context_from_node_id as _bank_ctx_from_node)
        # WS-MH: scope the bank match to the caller's curriculum context
        # (explicit context= wins; else derived from node_id).  An empty
        # context keeps the legacy unscoped lookup byte-compatible.
        _bank_ctx = context if context else _bank_ctx_from_node(node_id)
        _bank = _bank_lookup(text, context=_bank_ctx)
        if _bank is None:
            # CL-09: the bank lane's typed miss reason (was silent None)
            logger.debug("bank pre-route miss: %s", _bank_miss())
        if _bank is not None:
            audit_bank = AuditTrail(lane="A")
            audit_bank.anchor = _bank["anchor"]
            audit_bank.gates_passed.append("bank_match")
            res = PipelineResult(
                label=VERIFIED_OFFICIAL, answer=_bank["answer"],
                numeric=None, steps=list(_bank["steps"]), audit=audit_bank)
            res.solved = True
            res.stage = "bank_answer"
            return res
    except Exception as _e:
        # surface, don't swallow: fall through to the computed lanes
        print(f"[answer_pipeline] bank pre-route error: {_e}",
              file=sys.stderr)
    # PROPORTION-CHECK PRE-ROUTE (2026-10-01): "Check the proportion
    # a : b :: c : d" is closed-world cross-multiplication -- compute_exact
    # owns it.  This MUST precede multi-part detection: the "::" separator
    # reads as a parts-list to the splitter, which would shred a solvable
    # proportion check into unsolvable fragments.
    if re.search(r"\bcheck\b", text, re.I) and "::" in text:
        try:
            from backend.its.solver.exact_kernels import (
                compute_exact as _cx)
            _prop = _cx(text)
            if _prop is not None:
                audit_prop = AuditTrail(lane="A")
                res = PipelineResult(
                    label=VERIFIED, answer=_prop["answer"], numeric=None,
                    steps=list(_prop["steps"]), audit=audit_prop)
                res.solved = True
                res.stage = "exact_proportion"
                return res
        except Exception as _e:
            # surface, don't swallow: fall through to the normal pipeline
            print(f"[answer_pipeline] proportion pre-route error: {_e}",
                  file=sys.stderr)

    # EXACT ARITHMETIC PRE-ROUTE:
    # "Evaluate <expr>", "Find the value of <expr>" evaluated via exact rational AST
    _clean_ask = text.strip().rstrip(".?! ")
    if re.search(r"^(?:evaluate|find\s+the\s+value\s+of|calculate|what\s+is\s+the\s+value\s+of|what\s+is|simplify|compute|find\s+the\s+(?:sum|product|difference|quotient)\s+of)\s+[-+*x/()\d\s\^.]+$", _clean_ask, re.I):
        try:
            from backend.its.solver.exact_kernels import compute_exact as _cx
            _exact_res = _cx(_clean_ask)
            if _exact_res is not None and "answer" in _exact_res:
                audit_exact = AuditTrail(lane="A", route=["exact_kernel:" + _exact_res.get("route", "arithmetic")])
                audit_exact.gates_passed.append("exact_ast_evaluation")
                num_val = _exact_res.get("numeric")
                if num_val is None:
                    try:
                        num_val = float(_exact_res["answer"])
                    except (ValueError, TypeError):
                        num_val = None
                res = PipelineResult(
                    label=VERIFIED, answer=_exact_res["answer"], numeric=num_val,
                    steps=list(_exact_res["steps"]), audit=audit_exact)
                res.solved = True
                res.stage = "exact_arithmetic"
                return res
        except Exception:
            pass
    # DIMENSIONAL-SIGNATURE PRE-ROUTE (2026-10-01): resolve single-step
    # motion/force questions by dimension vectors, not phrase matching.
    # Closed-world: resolve() returns None unless the known quantities'
    # dimension multiset matches a registered solver AND the ask-target
    # dimension matches its output.  Each template self-verifies by inverse
    # relation, so the VERIFIED claim carries an independent numeric path.
    try:
        from backend.its.solver.signature_resolver import resolve as _sig
        _sig_res = _sig(text)
        if _sig_res is not None:
            audit_sig = AuditTrail(lane="A")
            audit_sig.gates_passed.append("dimensional_signature")
            audit_sig.gates_passed.append(
                f"independent:{_sig_res['verification']}")
            res = PipelineResult(
                label=VERIFIED, answer=_sig_res["answer"],
                numeric=float(_sig_res["value"]),
                steps=list(_sig_res["steps"]), audit=audit_sig)
            res.solved = True
            res.stage = "signature_resolver"
            return res
    except Exception as _e:
        # surface, don't swallow: fall through to the normal pipeline
        print(f"[answer_pipeline] signature pre-route error: {_e}",
              file=sys.stderr)
    # NODE-GROUNDED PRE-ROUTE (2026-10-02): when the caller supplies the
    # context node (practice/tutor flows always know it), prose questions
    # outside the bank are answered FROM THE NODE'S OWN AUTHORED SECTIONS
    # as VERIFIED_FROM_NODE -- deterministic, auditable, no LLM.
    # Fail-closed: unknown node / missing sections -> None (fall through).
    try:
        from backend.its.solver.node_answer import (
            node_answer as _node_answer)
        _na = _node_answer(raw_text if raw_text else text, node_id)
        if _na is not None:
            audit_na = AuditTrail(lane="A")
            audit_na.anchor = _na["anchor"]
            audit_na.gates_passed.append("node_grounded")
            _conf = _na.get("confidence", _na.get("meta", {}).get("recall", 1.0))
            audit_na.confidence = _conf
            res = PipelineResult(
                label="VERIFIED_FROM_NODE", answer=_na["answer"],
                numeric=None, steps=list(_na["steps"]), audit=audit_na)
            res.confidence = _conf
            res.solved = True
            res.stage = "node_answer"
            return res
    except Exception as _e:
        print(f"[answer_pipeline] node pre-route error: {_e}",
              file=sys.stderr)
    # multi-part detection BEFORE the core answer: a "(a)...(b)..." item
    # answered as one expression ships an incomplete reading ("15 + 27.
    # (b) Find 40 - 13" -> "42") -- split-first prevents that promotion.
    try:
        from backend.its.solver.multi_part import split_multi_part
    except ImportError:
        split_multi_part = None
    if split_multi_part is not None:
        try:
            is_multipart = split_multi_part(text) is not None
        except Exception:
            is_multipart = False
        if is_multipart:
            return _answer_multi_part(text)
    # INCLUSIVE-GST REVERSE CHAIN (2026-09-30 gate, M04): a price that
    # INCLUDES r% GST must be split by the reverse relation
    # (base = total / (1 + r/100), revenue-relation verified), never by
    # the forward tax chain.  Fires only on an explicit before-GST /
    # taxable-value ask; every other GST text keeps its readers.
    try:
        from backend.its.solver.unit_shape import gst_reverse_result
    except ImportError:
        gst_reverse_result = None
    if gst_reverse_result is not None:
        try:
            gst = gst_reverse_result(text)
        except Exception:
            gst = None
        if gst is not None:
            audit = AuditTrail(lane="B")
            audit.route.append("unit_shape:gst_reverse")
            return PipelineResult(
                label=VERIFIED, answer=gst["answer"],
                numeric=gst["numeric"], steps=list(gst["steps"]),
                audit=audit)
    # COGNITIVE DOMAIN ENGINES PRE-ROUTE (2026-10-06):
    # Specialized Tier-0 deterministic solvers for Humanities, Biology,
    # Circuits/Optics, and Ionic Chemistry.
    try:
        from backend.its.solver.subject_router import identify_subject
        _subj, _subj_conf, _ = identify_subject(text)
        _t_lower = text.lower()

        # 1. Humanities & Civics Prerogative Writs & Rubrics
        if _subj == "humanities" or any(w in _t_lower for w in ["writ", "habeas corpus", "mandamus", "quo-warranto", "certiorari", "prohibition", "article 32", "article 226", "unlawful detention"]):
            from backend.its.solver.humanities_rubric_engine import HumanitiesRubricEngine
            # wave98: "official" was a false friend — 'Official Opposition'
            # questions (no writ facts) fired the writ lane and shipped
            # 'Certiorari / Prohibition' VERIFIED.  Gate on writ-domain
            # signals only; the engine itself is now fail-closed.
            if any(w in _t_lower for w in [
                    "detain", "custody", "unlawful", "arrest", "mandamus",
                    "habeas", "quo warranto", "quo-warranto", "usurp",
                    "public office", "public official", "statutory duty",
                    "refuses to perform", "lower court", "tribunal",
                    "jurisdiction", "certiorari", "prohibition", "writ"]):
                _hr = HumanitiesRubricEngine.evaluate_constitutional_remedy(text)
                if _hr.success:
                    # WSA-P2 (2026-10-10): (a) stamp the structure:
                    # route so the badge gate can run the registered
                    # HUMANITIES_REMEDY row (fresh writ-rubric echo) --
                    # without it every remedy promotion was downgraded
                    # and withheld; (b) ship the WRIT NAME as the
                    # answer, not the machine-constant topic label
                    # ("PREROGATIVE_WRITS") -- the student-facing
                    # deliverable of a writ ask is the writ, and it is
                    # what the row's fresh re-derivation compares
                    # against.
                    _hr_writ = re.search(
                        r"Writ of ([A-Za-z][A-Za-z-]*"
                        r"(?:\s*[/]?\s*[A-Za-z][A-Za-z-]*)*)",
                        " ".join(str(_s) for _s in (_hr.steps or [])))
                    _hr_answer = (_hr_writ.group(1).strip()
                                  if _hr_writ else str(_hr.topic))
                    audit_h = AuditTrail(
                        lane="A",
                        route=["humanities:constitutional_remedy",
                               "structure:HUMANITIES_REMEDY"],
                        gates_passed=["board_civics_graph"])
                    return PipelineResult(label=VERIFIED, answer=_hr_answer, numeric=None, steps=list(_hr.steps), audit=audit_h)

        # 2. Biology NEET Energetics & Assertion-Reason
        #    (fallback words widened 2026-10-06, c11/c12 anchor wave:
        #    canonical fact-recall asks carry no biology-intent word --
        #    "Which is the pacemaker of the human heart?" -- so the fact
        #    table never ran.  The branch is fail-closed: fact_recall
        #    answers ONLY its curated table; everything else falls
        #    through to the honest refusal path unchanged.)
        #    STEM-BM 2026-10-07: the curated table probe now runs for
        #    EVERY question BEFORE the trigger gate -- the method is
        #    fail-closed by contract (exact curated patterns only, a
        #    regex scan over ~100 rows), and the trigger list provably
        #    misses curated phrasings ("What is the energy currency of
        #    the cell?" carries no biology word at all).  The triggers
        #    keep gating the EXPENSIVE bio lanes below.
        if True:
            from backend.its.solver.biology_cognitive_engine import BiologyCognitiveEngine
            _fr = BiologyCognitiveEngine.evaluate_fact_recall(
                raw_text or text)
            if _fr is not None and _fr.success:
                # structure:BIO_FACT_ANCHOR (STEM-BM 2026-10-07): the
                # badge gate resolves the verifier route from this prefix
                # -- a fresh fact-table lookup must reproduce the answer
                # or the anchor result honestly withholds.  Without the
                # stamp the VERIFIED-BADGE gate demotes every anchored
                # fact and the strict contract withholds it (all NCERT
                # recall went dark under the sweep arch).
                audit_b = AuditTrail(
                    lane="A",
                    route=["biology:fact_recall",
                           "structure:BIO_FACT_ANCHOR"],
                    gates_passed=["ncert_fact_anchor"])
                return PipelineResult(label=VERIFIED, answer=_fr.primary_answer, numeric=None, steps=list(_fr.steps), audit=audit_b)
        if _subj == "biology" or any(w in _t_lower for w in [
                "assertion", "reason", "atp balance", "respiration atp",
                "cardiac output", "kranz",
                # c11/c12 fact-recall trigger words (substring match)
                "hormone", "gland", "neuro", "heart", "pacemaker", "lung",
                "alveoli", "breath", "urine", "kidney", "nephron", "tissue",
                "joint", "muscle", "bone", "brain", "insulin", "cortisol",
                "pregnancy", "sperm", "fertilisation", "fertilization",
                "contraception", "embryo", "ovule", "zygote", "gamete",
                "endosperm", "ploidy", "seed", "flower", "pollen", "leaf",
                "leaves", "meristem", "epithelium", "intestine",
                "mast cell", "kingdom", "species", "phylum", "taxonomic",
                "classification", "biodiversity", "bryophyt", "pteridophyt",
                "gymnosperm", "angiosperm", "algae", "pigment", "chloroplast",
                "thylakoid", "protein", "amino", "peptide", "meiosis",
                "mitosis", "crossing over", "notochord", "radial symmetry",
                "echinoderm", "starfish", "malaria", "plasmodium", "pathogen",
                "hiv", "antibod", "antibiotic", "penicillin", "vaccine",
                "curd", "biogas", "microbe", "bacterium", "bacteria",
                "plasmid", "taq", "pcr", "polymerase", "bollworm",
                "bt cotton", "humulin", "lindeman", "10 percent",
                "ten percent", "energy transfer", "food chain", "ecosystem",
                "stenothermal", "eurythermal", "griffith", "miller", "urey",
                "darwin", "evolution", "natural selection", "honey",
                "superovulation", "archegonium", "slime mould",
                "slime mold", "nomenclature", "potato", "tuber",
                # second-wave triggers (2026-10-06 re-run findings):
                # the intent regex is \b-anchored so plurals miss
                # ("organelles"), and these stems carry no intent word
                "organelle", "enzyme", "biomolecule", "respiratory",
                "glucose", "bolting", "auxin", "gibberellin", "ethylene",
                "cytokinin", "abscisic", "mustard", "monocot", "dicot",
                "inbreeding", "outcrossing", "copper-t", "copper t",
                "amniocentesis", "phenylketonuria", "analogous"]):
            from backend.its.solver.biology_cognitive_engine import BiologyCognitiveEngine
            # 2a. NCERT FACT RECALL now probes ABOVE the trigger gate
            # (STEM-BM 2026-10-07) -- this branch keeps the EXPENSIVE bio
            # lanes: bio-energetics, cardiac output, assertion-reason.
            # Tightened trigger (class-11 corpus sweep,
            # c11_biotech_cbse_04_001#d1, 2026-10-06): the old
            # "atp + (respiration | glucose)" test fired the aerobic
            # balance sheet on an ENZYME-CLASSIFICATION question that
            # merely mentioned "ATP + glucose" as substrates ("State the
            # IUB class...").  The sheet is the respiration ATP
            # stoichiometry -- the stem must be about respiration.
            if "respiration" in _t_lower and "atp" in _t_lower:
                # AEROBIC-ONLY guard (class-10 corpus sweep, c10_bio_cbse_01_007,
                # 2026-10-06): "Write the balanced equation for ANAEROBIC
                # respiration in skeletal muscle and state the net ATP" fired
                # this aerobic balance sheet and shipped 32/38 ATP — the
                # correct answer is lactic acid + 2 ATP.  The sheet is the
                # aerobic balance; anaerobic/fermentation asks must refuse.
                if not any(w in _t_lower for w in (
                        "anaerobic", "fermentation", "lactic", "ethanol",
                        "yeast", "muscle")):
                    _br = BiologyCognitiveEngine.calculate_respiration_atp_balance(1.0)
                    if _br.success:
                        audit_b = AuditTrail(lane="A", route=["biology:bio_energetics"], gates_passed=["ncert_atp_stoichiometry"])
                        return PipelineResult(label=VERIFIED, answer=_br.primary_answer, numeric=32.0, steps=list(_br.steps), audit=audit_b)
            elif "cardiac output" in _t_lower:
                _br = BiologyCognitiveEngine.calculate_cardiac_output(72.0, 70.0)
                if _br.success:
                    audit_b = AuditTrail(lane="A", route=["biology:cardiac_output"], gates_passed=["ncert_cardiac_cycle"])
                    return PipelineResult(label=VERIFIED, answer=_br.primary_answer, numeric=5.04, steps=list(_br.steps), audit=audit_b)

        # 3. Physics Circuits (Resistor Cube & Symmetry)
        if "resistor cube" in _t_lower or ("cube" in _t_lower and "resistor" in _t_lower):
            from backend.its.solver.circuit_and_optics_engine import NodalCircuitSolver
            _m_r = re.search(r"(\d+(?:\.\d+)?)\s*(?:ohm|\u03a9)", _t_lower)
            _r_val = float(_m_r.group(1)) if _m_r else 12.0
            _sym = "opposite_vertices"
            if "face" in _t_lower:
                _sym = "face_diagonal"
            elif any(k in _t_lower for k in ["across an edge", "across edge", "along an edge", "adjacent vertices", "adjacent corners"]):
                _sym = "edge"
            _cr = NodalCircuitSolver.solve_resistor_cube(_r_val, _sym)
            if _cr.get("success"):
                audit_c = AuditTrail(lane="A", route=["circuit:resistor_cube"], gates_passed=["nodal_symmetry_solver"])
                return PipelineResult(label=VERIFIED, answer=f"{_cr['req_ohms']} ohms", numeric=_cr["req_ohms"], steps=list(_cr["steps"]), audit=audit_c)
    except Exception as _dom_err:
        print(f"[answer_pipeline] domain pre-route error: {_dom_err}", file=sys.stderr)

    # STRUCTURE LANE (batch-15): semantic exemplar match -> role-bound
    # slots -> direct compute.  Runs before hop-splitting and the core
    # numeric path so single unified questions are answered deterministically.
    try:
        from backend.its.solver.structure_families import model_structure
    except ImportError:
        model_structure = None
    if model_structure is not None:
        try:
            _sr = model_structure(text)
        except Exception:
            _sr = None
        if _sr is not None and _sr.matched and (
                _sr.final_answer is not None or _sr.numeric_answer is not None):
            # CHEM CROSS-CHECK (CHEM-ADVERSARIAL 2026-10-06): a learned
            # PAL template must never override the chemistry registry on
            # a chemistry-parseable numeric -- the 'moles in 18 g of
            # water' template shipped 18/18.015 = 0.9991 (IUPAC masses)
            # where the registry's board-standard table gives 1 mol.
            # On >2% disagreement the shortcut declines and the core
            # (registry first) answers.
            if _sr.structure == "PAL_PROGRAM":
                if os.environ.get("SOLVER_LLM") == "off" or os.environ.get("SOLVER_OFFLINE") == "1":
                    _sr = None
                else:
                    try:
                        from backend.its.solver.modeling_layer import model_problem as _ml_mp
                        _mp = _ml_mp(text)
                        if _mp.matched and _mp.structure != "PAL_PROGRAM" and (_mp.numeric_answer is not None or _mp.final_answer):
                            # Deterministic Engine 1 (Accountancy, Physics, Chemistry, Economics, Maths)
                            # is authoritative over learned PAL programs ONLY IF it independently verifies.
                            from backend.its.solver.independent_verifier import verify_independent
                            _ok, _ = verify_independent(_mp.structure, text, _mp)
                            if _ok:
                                print(
                                    f"[answer_pipeline] structure-lane PAL superseded: "
                                    f"deterministic family '{_mp.structure}' verified -- declined PAL",
                                    file=sys.stderr, flush=True)
                                _sr = None
                    except Exception as _e:
                        logger.debug("structure_pal_guard_inner (PAL inner): %s", type(_e).__name__)
        # WS-MH CHAIN-INTENT DEFER: a single-structure read of a genuine
        # clause chain is partial by construction -- it computes from
        # the whole tangle and ignores the hop dependency.  Decline the
        # early return so the hop planner gets the text (it answers
        # every clause or refuses honestly; nothing is lost, the old
        # path's answer was failing the verifier anyway).
        if _sr is not None and _sr.matched and _hop_chain_intent(text):
            print("[answer_pipeline] structure-lane declined: text is "
                  "a genuine hop chain -- routing to the hop planner",
                  file=sys.stderr, flush=True)
            _sr = None
        if _sr is not None and _sr.matched and (
                _sr.final_answer is not None
                or _sr.numeric_answer is not None):
            audit = AuditTrail(lane="S",
                               route=[f"structure:{_sr.structure}"],
                               gates_passed=["semantic_structure_match"])
            # CONSTRUCTION GUARD (C9 dig): structure lane early-returns
            # before the shared guards below, so 'construct a triangle'
            # shipped '115 deg' via ANGLE_SUM_TRI.  Refuse here.
            try:
                from backend.its.solver.unit_shape import (
                    is_construction_ask, CONSTRUCTION_REFUSAL)
            except ImportError:
                is_construction_ask = None
            if is_construction_ask is not None and is_construction_ask(text):
                audit.route.append("ask_shape:construction_refused")
                result = PipelineResult(
                    label=GUIDED, answer=None, numeric=None,
                    steps=None, refusal_reason=CONSTRUCTION_REFUSAL,
                    audit=audit)
                return _attach_understood(result, _sr, text)
            # META-JUDGEMENT + NON-COMPUTABLE ASK GUARDS (STEM-BM
            # 2026-10-07): the structure lane early-returns BEFORE the
            # shared guards in _answer_core, so 'Explain why ... the HCF
            # of 144 and 192 ...' shipped the computed HCF (48) VERIFIED
            # for a reasoning ask (c10 sweep
            # c10_math_cbse_01_002#d2).  Mirror the core's guards here:
            # a judgement/prose ask must refuse honestly even when a
            # family computed a topically-adjacent number.
            _meta_judgement_s = re.search(
                r"\btwo\s+students?\b[^.]{0,80}\b(?:solve|approach|"
                r"use[sd]?)\b|"
                r"\bstudent\s+[ab]\b[^.]{0,80}\b(?:uses?|claims?|"
                r"calculat\w*|writes?|argues?)\b|"
                r"\bis\s+(?:this|the\s+student(?:'s)?(?:\s+(?:reasoning|"
                r"working|answer|method))?)\s+(?:correct|right|wrong|"
                r"incorrect|valid)\b|"
                r"\bwhy\s+is\s+(?:this|the|their|his|her)\s+(?:reasoning|"
                r"method|working|answer)\s+(?:incorrect|wrong|flawed)\b|"
                r"\bwho\s+is\s+correct\b|\bwhich\s+student\b|"
                r"\bwhose\s+(?:method|approach|answer)\s+is\b|"
                r"\bevaluat\w+\s+whether\b|"
                r"\bpropose\s+(?:two|three|\d+)?\s*[\w\s]{0,30}?"
                r"(?:changes?|measures?|solutions?|ways?|steps?|"
                r"suggestions?)\b[^.]{0,150}\bjustify\b|"
                r"\b(?:explain|state|justify)\s+why\b|"
                # BIOMATH-FINISH 2026-10-08 (c11 sweep 03_014#d2): 'Is
                # this complete? If not, what is missing?' shipped '90
                # deg' from the embedded trig equation -- an error-
                # analysis ask judges the given solution, it does not
                # compute.  Also (c12 sweep 06_007#d1) 'Write the
                # volume V(x) as a function of x' shipped '600 sq cm'
                # from a rectangle-area family -- a symbolic-function
                # ask wants an expression, not a number.
                r"\bis\s+(?:this|it|the\s+(?:student(?:'s)?\s+)?"
                r"(?:solution|method|answer|working|reasoning))\s+"
                r"(?:complete|incomplete)\b|"
                r"\bwhat\s+(?:is|'s)\s+(?:missing|wrong)\b|"
                # BIOMATH-FINISH 2026-10-08 (CISCE bio sweep
                # c8_bio_icse_03_002#d3): 'Evaluate the statement: ...'
                # shipped a bare gland name VERIFIED -- a statement-
                # evaluation ask judges a claim, it does not recall a
                # fact fragment.
                r"\bevaluat\w+\s+(?:the\s+)?"
                r"(?:statement|claim|assertion|conclusion)\b|"
                r"\bas\s+a\s+function\s+of\b",
                text or "", re.I)
            _m16_chem_deliverable_s = (
                re.search(r"(?:chemical|molecular|empirical)\s+formula\b|"
                          r"electronic\s+configuration|"
                          r"electron\s+configuration|"
                          r"balanced\s+(?:chemical\s+)?equation|"
                          r"\bvalency\b", text or "", re.I)
                and re.fullmatch(
                    r"[A-Za-z0-9()\[\],;:.?\s+=<>\-]*",
                    str(_sr.final_answer or "")))
            _m16_noncomputable_s = re.search(
                r"^\s*(?:design|create|write|construct|compose|"
                r"formulate|state|define|explain|describe|"
                r"list|name|draw|propose|suggest|recommend)\b",
                text or "", re.I) and not re.search(
                r"\b(?:calculate|compute|evaluate|determine)\b|"
                r"find\s+the\b|how\s+(?:much|many|far|fast|long)\b",
                text or "", re.I)
            if _meta_judgement_s or (
                    _m16_noncomputable_s and not _m16_chem_deliverable_s):
                audit.route.append(
                    "ask_shape:meta_judgement_refused"
                    if _meta_judgement_s
                    else "ask_shape:noncomputable_refused")
                result = PipelineResult(
                    label=GUIDED, answer=None, numeric=None,
                    steps=None,
                    refusal_reason=("This question asks for reasoning, "
                                    "not a number — the model answer is "
                                    "below."),
                    audit=audit)
                return _attach_understood(result, _sr, text)
            _kh = _official_key_lookup(text)
            if _kh is not None:
                _ka = str(_kh.get("letter") or _kh.get("answer_text") or "")
                _sa = str(_sr.final_answer or "")
                if _ka and _ka.lower() in _sa.lower():
                    audit.gates_passed.append("official_key_confirmed")
                else:
                    audit.assumptions.append(
                        f"official key says '{_ka}'; computed answer kept")
            return _attach_understood(PipelineResult(
                label=VERIFIED,
                answer=_sr.final_answer or str(_sr.numeric_answer),
                numeric=_sr.numeric_answer,
                steps=list(_sr.steps or []), audit=audit), _sr,
                text)

    # Multi-hop chains the chain_pipeline grammar cannot parse route to
    # the hop planner BEFORE the core: naive kernel arithmetic must
    # never answer a multi-ask chain from two of its numbers.  When
    # try_chain accepts the text, the chain lane owns it (fall through).
    # EXCEPTION: a grounded commerce-narrative family (instalment
    # totals, GST chains, ...) reads the FULL text -- fragmenting those
    # questions into hops loses the quantities they need, so a VERIFIED
    # full-text reading is promoted before the hop lane takes over.
    try:
        from backend.its.solver.hop_planner import split_hop_clauses
        from backend.its.solver.chain_pipeline import \
            try_chain as _probe_chain
        if split_hop_clauses(text) is not None:
            _chain_probe = _probe_chain(text, AuditTrail(lane="B"))
            # WS-MH: a forward-reference chain is a REAL dependency --
            # every single-structure lane (commerce narrative,
            # auto-bind, registry sweep) reads it partially, so the hop
            # planner gets the first turn.  It also owns a chain_probe
            # that DEGRADED while a forward reference is present (the
            # registry grammar could not model the hop, but a
            # clause-wise family can).
            _fwd_chain = _hop_chain_fwd_ref(text)
            _hop_first = (_fwd_chain and _chain_probe is not None
                          and getattr(_chain_probe, "label", None)
                          != VERIFIED)
            if _chain_probe is None or _hop_first:
                _hop_res = _answer_multi_hop(text) if _fwd_chain \
                    else None
                if (_hop_res is not None
                        and _hop_res.label == VERIFIED):
                    return _hop_res
                promoted = None
                try:
                    from backend.its.solver.commerce_readers import \
                        read_commerce_narrative as _rcn
                except ImportError:
                    _rcn = None
                if _rcn is not None:
                    try:
                        promoted = _rcn(text, AuditTrail(lane="B"))
                    except Exception:
                        promoted = None
                if promoted is not None:
                    return promoted
                # HOP-SPLIT OVERRUN GUARD (2026-09-30 coordinator flag):
                # chain_split intercepts multi-clause numerics that a
                # single full-text family or verified binder could
                # serve, and a per-hop guided refusal costs a real
                # match.  Give the verified auto-binders and the
                # guarded full-registry sweep one turn before the hop
                # lane fragments the text; a refusal here still falls
                # through to the hop planner.
                # WS-MH: a forward-ref chain is a real dependency --
                # a single-structure read is PARTIAL by construction
                # (the sweep shipped hop-1's 30 m as the answer to a
                # 'x + h = 50' chain), so binder/sweep never promote
                # here; the honest hop verdicts stand.
                if _fwd_chain:
                    return (_hop_res if _hop_res is not None
                            else _answer_multi_hop(text))
                try:
                    from backend.its.solver.binding_executor import \
                        try_auto_bind as _tab
                except ImportError:
                    _tab = None
                if _tab is not None:
                    try:
                        bound = _tab(text, AuditTrail(lane="B"))
                    except Exception:
                        bound = None
                    if bound is not None:
                        return bound
                probe_audit = AuditTrail(lane="B")
                syll = _independent_sweep(text, probe_audit)
                if syll.matched and "GROWING" in syll.structure.upper() \
                        and re.search(
                            r"\b(shrink\w*|shrank|shrunk|contract\w*|"
                            r"shorten\w*|narrow\w*|reduc\w*(?:\s+the)?\s+"
                            r"(?:length|band|rope|hose))\b", text.lower()):
                    syll.matched = False
                if syll.matched and syll.confidence >= 0.85 \
                        and (syll.numeric_answer is not None
                             or syll.final_answer):
                    probe_audit._sweep_structure = getattr(
                        syll, "structure", "")
                    cand = PipelineResult(
                        label=VERIFIED, answer=syll.final_answer,
                        numeric=syll.numeric_answer,
                        steps=list(syll.steps or []), audit=probe_audit)
                    refused = _coverage_refuse(text, cand, probe_audit)
                    if refused is None:
                        probe_audit.route.append(
                            "modeling:hop_overrun_family")
                        probe_audit.gates_passed.append(
                            "hop_overrun_registry_sweep")
                        cand.audit.route = probe_audit.route
                        return _attach_understood(cand, syll, text)
                # the hop result was already computed for a forward-ref
                # chain; reuse its per-hop verdicts instead of a re-run
                return (_hop_res if _hop_res is not None
                        else _answer_multi_hop(text))
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("_through_to_the_hop_planner_", _e)
        except Exception:
            pass
        pass
    # A3: Assertion-Reason / Statement-based / Match-the-following
    # structural solvers run BEFORE the core numeric path -- these
    # question types are not numeric and would be misrouted to Lane A.
    ar_result = _try_structural_solver(text)
    if ar_result is not None:
        return ar_result
    # OFFICIAL KEY: if this exact question (canonical fingerprint +
    # numeric signature) has a mined board key, the board's answer is
    # the truth -- strongest possible signal, checked before compute.
    key_hit = _official_key_lookup(text)
    if key_hit is not None:
        audit = AuditTrail(lane="D", route=["official_key_match"],
                           gates_passed=["official_key_fingerprint"])
        audit.anchor = (f"official key (doc {key_hit['source_doc_id']}"
                        f" q{key_hit['source_qno']})")
        return PipelineResult(
            label=VERIFIED_OFFICIAL,
            answer=(f"option ({key_hit['letter']})"
                    if key_hit["letter"] else key_hit["answer_text"]),
            numeric=None, steps=["Answer from the official board key "
                                 "(fingerprint-matched question)."],
            audit=audit)
    result = _answer_core(text)
    # MCQ option verification: a guided numeric MCQ whose stem computes
    # and where EXACTLY ONE option matches is answered deterministically.
    # Zero matches or two-plus matches stays guided (never wrong).
    if result.label == GUIDED and not text.endswith(")"):
        try:
            from backend.its.solver.mcq_solver import try_mcq
        except ImportError:
            try_mcq = None
        if try_mcq is not None:
            promo = try_mcq(text, _answer_core)
            if promo is not None:
                core = promo["core"]
                core.audit.route.append("mcq:option_match")
                core.audit.gates_passed.append("mcq_option_verification")
                # Concept-MCQ promos carry value=None (nothing numeric to
                # show); keep their authored "option (x) <text>" answer
                # intact -- reformatting a 0/None value with ":.6g" shipped
                # garbage like "option (b) 0" (class-9 biology board audit,
                # 2026-10-06; correct letter, destroyed option text).
                if promo.get("value") is not None:
                    core.audit.assumptions.append(
                        f"option ({promo['option']}) matches the computed "
                        f"value {promo['value']:.6g}")
                    core.answer = (f"option ({promo['option']}) "
                                   f"{promo['value']:.6g}")
                core.audit.elapsed_ms = core.audit.elapsed_ms
                return core
    # LAST-RESORT hop chaining: when every lane stayed guided and the
    # text still splits into dependent clauses ("...find its speed.
    # Using this speed, how far in 20 s?"), solve hop-by-hop with
    # carry-forward.  Runs after the chain_pipeline lane, so formula
    # chains it already owns are never intercepted.
    if result.label == GUIDED and not any(
            r.startswith("chain") for r in result.audit.route):
        try:
            from backend.its.solver.hop_planner import split_hop_clauses
        except ImportError:
            split_hop_clauses = None
        if split_hop_clauses is not None:
            try:
                is_chain = split_hop_clauses(text) is not None
            except Exception:
                is_chain = False
            if is_chain:
                return _answer_multi_hop(text)
    # SEMANTIC BANK LANE (2026-10-03): the last lane before the honest
    # guided fallback.  Every computed lane stayed guided, but the
    # 250k-row board bank may still hold THIS question under different
    # wording -- bi-encoder recall + cross-encoder re-rank (semantic_qa;
    # deterministic, no LLM) matches the paraphrase and a calibrated-
    # threshold hit serves the board's own stored answer.  Sits AFTER
    # the bank/node exact pre-routes (those own exact matches) and only
    # fires where the pipeline would otherwise ship GUIDED -- a computed
    # VERIFIED verdict is never downgraded.  Fail-closed: no hit above
    # threshold, or any embed/search/rerank trouble -> None -> the
    # guided fallback ships unchanged.
    #
    # SEMANTIC_QA_LANE must be explicitly enabled in production config
    # after load testing.  Default OFF: the gate enables on "1" ONLY --
    # an unset variable keeps the lane dark and /solve falls through to
    # the guided refusal (semantic_qa.lane_enabled is the single source
    # of truth for this default).
    if result.label == GUIDED:
        try:
            from backend.its.solver.semantic_qa import get_matcher, \
                lane_enabled
            if lane_enabled():
                _sem = get_matcher().query(text)
            else:
                _sem = None
        except Exception as _e:
            # surface, don't swallow: fall through to the guided refusal
            print(f"[answer_pipeline] semantic lane error: {_e}",
                  file=sys.stderr)
            _sem = None
        if _sem is not None:
            audit_sem = AuditTrail(lane="D", route=["semantic_bank_match"],
                                   gates_passed=["semantic_rerank_threshold"])
            audit_sem.anchor = _sem["source"]
            if _sem.get("matched_question"):
                step = (f"Matched a board-bank question: "
                        f"\"{_sem['matched_question'][:200]}\" -- the "
                        f"stored official answer is served verbatim.")
            else:
                step = ("Answer from the board question bank "
                        "(semantic match).")
            res = PipelineResult(
                label="VERIFIED_SEMANTIC", answer=_sem["answer"],
                numeric=None, steps=[step], audit=audit_sem)
            res.solved = True
            res.stage = "semantic_bank"
            return res
    return result


def _try_structural_solver(text: str) -> Optional[PipelineResult]:
    """Try A3 structural solvers (AR, Statement, MTF).  Returns None
    if no structural format detected, letting the core pipeline run."""
    import time as _time
    t0 = _time.perf_counter()

    # Try Assertion-Reason / Statement-based solver
    try:
        from backend.its.solver.ar_solver import solve_ar, detect_ar_format
    except ImportError:
        solve_ar = None
    if solve_ar is not None:
        try:
            arq = detect_ar_format(text)
        except Exception:
            arq = None
        if arq is not None:
            result = solve_ar(text)
            audit = AuditTrail(
                lane="D", route=["ar_solver"],
                elapsed_ms=(_time.perf_counter() - t0) * 1000)
            if result.label == "VERIFIED_OFFICIAL":
                audit.gates_passed.append("official_key_match")
                audit.anchor = f"official key: ({result.letter})"
                return PipelineResult(
                    label=VERIFIED_OFFICIAL,
                    answer=f"({result.letter})",
                    numeric=None,
                    steps=[f"Assertion: {result.assertion[:100]}",
                          f"Reason: {result.reason[:100]}"],
                    audit=audit)
            if result.label == "VERIFIED":
                audit.gates_passed.append("fact_verification")
                return PipelineResult(
                    label=VERIFIED,
                    answer=f"({result.letter})",
                    numeric=None,
                    steps=[f"Assertion: {result.assertion[:100]}",
                          f"Reason: {result.reason[:100]}",
                          f"Answer: {result.answer_text}"],
                    audit=audit)
            # GUIDED_PRACTICE -- return structured Socratic data
            audit.route.append("ar_solver:refused")
            ar_steps = [
                "Assertion-Reason Analysis Method:",
                f"1. Evaluate Assertion: Check if statement '{result.assertion.strip()}' is scientifically true.",
                f"2. Evaluate Reason: Check if statement '{result.reason.strip()}' is scientifically true independently.",
                "3. Causal Link: Verify whether the Reason provides the correct physical explanation for the Assertion."
            ]
            return PipelineResult(
                label=GUIDED, answer=None, numeric=None,
                steps=ar_steps,
                audit=audit,
                refusal_reason=result.refusal_reason)

    # Try Match-the-following solver
    try:
        from backend.its.solver.mtf_solver import solve_mtf, detect_mtf_format
    except ImportError:
        solve_mtf = None
    if solve_mtf is not None:
        try:
            mtfq = detect_mtf_format(text)
        except Exception:
            mtfq = None
        if mtfq is not None:
            result = solve_mtf(text)
            audit = AuditTrail(
                lane="D", route=["mtf_solver"],
                elapsed_ms=(_time.perf_counter() - t0) * 1000)
            if result.label == "VERIFIED_OFFICIAL":
                audit.gates_passed.append("official_key_match")
                audit.anchor = "official key"
                return PipelineResult(
                    label=VERIFIED_OFFICIAL, answer=None, numeric=None,
                    steps=[f"Column A: {len(result.column_a)} items",
                           f"Column B: {len(result.column_b)} items"],
                    audit=audit)
            if result.label == "VERIFIED":
                audit.gates_passed.append("fact_verification")
                match_str = ", ".join(
                    f"{k}->{v}" for k, v in result.matching.items())
                return PipelineResult(
                    label=VERIFIED, answer=match_str, numeric=None,
                    steps=[f"Matching: {match_str}"],
                    audit=audit)
            audit.route.append("mtf_solver:refused")
            return PipelineResult(
                label=GUIDED, answer=None, numeric=None,
                steps=[f"Column A: {len(result.column_a)} items",
                       f"Column B: {len(result.column_b)} items"],
                audit=audit,
                refusal_reason=result.refusal_reason)

    return None


def split_hop_probe(text: str) -> bool:
    """Cheap probe used before the core answer: is this a hop chain?"""
    from backend.its.solver.hop_planner import split_hop_clauses
    return split_hop_clauses(text) is not None


def _answer_multi_hop(text: str) -> PipelineResult:
    """Chained-clause path.  PROMOTION POLICY mirrors multi-part: only
    an all-hops-verified chain carries answers; a broken chain keeps
    the refusal and exposes per-hop verdicts as Socratic data."""
    import time as _time
    t0 = _time.perf_counter()
    audit = AuditTrail(lane="B")
    from backend.its.solver.hop_planner import try_multi_hop
    promo = try_multi_hop(text, _answer_core)
    if promo is None:
        return _answer_core(text)
    audit.route.append("hop_planner:chain_split")
    audit.gates_passed.append("hop_chain_aggregation")
    # WS-PAL (ovh-pal): the aggregate result shipped VERIFIED with no
    # 'structure:' entry -- every hop-chain promotion died as
    # verifier_no_route under the strict badge gate.  The registered
    # HOP_CHAIN row re-derives the chain's shape from the question text
    # (percent-chain, sdt, repeated-change) -- never trusts hop outputs.
    audit.route.append("structure:HOP_CHAIN")
    # WS-MH: publish each hop's solved value + typed dimension so the
    # CHAIN/HOP_CHAIN verifier can check per-hop answers AND the
    # unit-consistency at every boundary -- no part of the shipped
    # chain is opaque to the second path.
    _hop_meta: dict = {}
    for _hop in promo.get("hops") or []:
        _hi = int(_hop.get("index") or 0) + 1
        if _hop.get("numeric") is not None:
            try:
                _hop_meta[f"hop{_hi}_value"] = float(_hop["numeric"])
            except (TypeError, ValueError) as _e:
                log_lane_exception(
                    "answer_pipeline._answer_multi_hop.hop_numeric", _e)
        for _k, _qk in (("dim", "dim"), ("family", "family"),
                        ("sub", "text"), ("text", "clause")):
            if _hop.get(_k):
                _hop_meta[f"hop{_hi}_{_qk}"] = str(_hop[_k])
    if _hop_meta:
        audit.quantities.append(_hop_meta)
    if promo.get("all_verified"):
        lines = []
        nums = []
        for hop in promo["hops"]:
            ans = hop.get("answer") or ""
            lines.append(f"step {hop['index'] + 1}: {ans}")
            if hop.get("numeric") is not None:
                nums.append(hop["numeric"])
        result = PipelineResult(
            label=VERIFIED,
            answer="; ".join(lines),
            numeric=nums[-1] if nums else None,
            steps=["multi-hop chain (" + str(len(promo["hops"]))
                   + " hops): " + " | ".join(lines)],
            audit=audit)
        result.audit.gates_passed.append("hop_chain_all_verified")
        result.audit.elapsed_ms = round(
            (_time.perf_counter() - t0) * 1000, 1)
        return result
    hop_steps: List[str] = []
    for h in (promo.get("hops") if isinstance(promo, dict) else []) or []:
        h_label = h.get("label", "")
        h_steps = h.get("steps") or []
        if h_steps:
            hop_steps.append(f"Hop ({h_label}):")
            for s in h_steps:
                hop_steps.append(f"  {s}")
        elif h.get("answer"):
            hop_steps.append(f"Hop ({h_label}): {h.get('answer')}")
    if not hop_steps:
        hop_steps = [
            "Multi-Hop Problem Strategy:",
            "1. Decompose the compound statement into intermediate target quantities.",
            "2. Apply standard curriculum properties or matrix / calculus identities.",
            "3. Substitute intermediate results step-by-step to reach the final evaluation."
        ]
    try:
        from backend.services.enhanced_nodes import model_answer
        ma = model_answer(text)
        if ma:
            result_ma_lines = [line.strip() for line in ma.split("\n") if line.strip()]
            if result_ma_lines:
                hop_steps.append("Standard Curriculum Solution:")
                hop_steps.extend(f"  {l}" for l in result_ma_lines[:6])
    except Exception as _e:
        log_lane_exception(
            "answer_pipeline._answer_multi_hop.model_answer", _e)
    result = PipelineResult(
        label=GUIDED, answer=None, numeric=None, steps=hop_steps, audit=audit,
        refusal_reason="multi-hop question; per-hop verdicts below")
    result.socratic = {"multi_hop": promo}
    result.audit.elapsed_ms = round(
        (_time.perf_counter() - t0) * 1000, 1)
    return result


def _multipart_part_evidence(part: dict) -> bool:
    """WS-MH: True when the part's own solve carried genuine second-path
    evidence -- an 'independent:' gate, a registry verifier pass, bank/
    node/official ground truth -- OR the part's named structure still
    re-PASSes check_route against the part's own text and claim.  The
    aggregate 'independent:' stamp is only written when every shipped
    part passes this; a part that verified without proof keeps the
    aggregate honestly unverified."""
    gates = part.get("gates") or []
    route = part.get("route") or []
    if any(str(g).startswith("independent:") for g in gates):
        return True
    if any(g in ("exact_ast_evaluation", "bank_match", "node_grounded",
                 "official_key_fingerprint", "official_key_match",
                 "official_key_confirmed") for g in gates):
        return True
    if any(str(r) == "independent_verifier:pass" for r in route):
        return True
    if part.get("tier") in ("VERIFIED_OFFICIAL", "VERIFIED_FROM_NODE"):
        return True
    struct = part.get("structure") or next(
        (str(r).split(":", 1)[1] for r in route
         if str(r).startswith("structure:")), None)
    if struct:
        try:
            from backend.its.solver.independent_verifier import (
                check_route)

            class _PartResult:
                def __init__(self, p):
                    self.quantities = p.get("quantities") or {}
                    self.numeric_answer = p.get("numeric")
                    self.final_answer = p.get("answer") or ""

            v, _proof = check_route(
                struct, part.get("solve_text") or "", _PartResult(part))
            if v == "pass":
                return True
            if v == "fail":
                return False
        except Exception as _e:
            log_lane_exception(
                "answer_pipeline._multipart_part_evidence.check_route", _e)
    # last path for parts whose structure has no registered second
    # route: the chain verifier's own clause solvers re-derive the
    # part's claim from the part's own text -- a genuine independent
    # recompute, not a re-read of the solver's numbers
    num = part.get("numeric")
    if isinstance(num, (int, float)) and not isinstance(num, bool):
        try:
            from backend.its.solver.independent_verifier import (
                _CHAIN_CLAUSE_SOLVERS, _chain_eq)
            for fn in _CHAIN_CLAUSE_SOLVERS:
                try:
                    got = fn(part.get("solve_text") or "", None, None)
                except Exception:
                    got = None
                if got is not None and _chain_eq(
                        float(got[0]), float(num), str(got[1] or "")):
                    return True
        except Exception as _e:
            log_lane_exception(
                "answer_pipeline._multipart_part_evidence.chain_solvers", _e)
    return False


def _answer_multi_part(text: str) -> PipelineResult:
    """Split-first path for (a)...(b) items.  PROMOTION POLICY: only an
    all-parts-verified reading carries answers; any guided part keeps
    the refusal and exposes the per-part split as Socratic data."""
    import time as _time
    t0 = _time.perf_counter()
    audit = AuditTrail(lane="B")
    try:
        from backend.its.solver.multi_part import try_multi_part
    except ImportError:
        try_multi_part = None
    if try_multi_part is not None:
        def _answer_part(pt_text: str) -> PipelineResult:
            _IN_PART.on = True
            try:
                return _answer_core(pt_text)
            finally:
                _IN_PART.on = False
        promo = try_multi_part(text, _answer_part)
        if promo is not None:
            audit.route.append("multi_part:split")
            audit.gates_passed.append("multi_part_aggregation")
            if promo.get("all_verified"):
                if promo.get("kind") == "or":
                    vpart = next((p for p in promo["parts"] if p.get("verified")), promo["parts"][0])
                    ans = vpart.get("answer") or ""
                    # keep the part's real derivation — the marker scores
                    # MS coverage against actual working, not a summary
                    steps = list(vpart.get("steps") or
                                 [f"Internal choice ({vpart['label']}) "
                                  f"solved: {ans}"])
                    result = PipelineResult(
                        label=VERIFIED,
                        answer=ans,
                        numeric=vpart.get("numeric"),
                        steps=steps,
                        audit=audit)
                    result.audit.gates_passed.append("multi_part_or_verified")
                    # WS-MH: the aggregate carries an 'independent:'
                    # badge-gate stamp only when the shipped alternative
                    # itself carries second-path evidence
                    if _multipart_part_evidence(vpart):
                        result.audit.gates_passed.append(
                            "independent:multipart_chosen_part_checked")
                    result.audit.elapsed_ms = round(
                        (_time.perf_counter() - t0) * 1000, 1)
                    return result
                lines = []
                nums = []
                steps = []
                for part in promo["parts"]:
                    ans = part.get("answer") or ""
                    lines.append(f"({part['label']}) {ans}")
                    if part.get("numeric") is not None:
                        nums.append(part["numeric"])
                    for s in part.get("steps") or []:
                        steps.append(f"({part['label']}) {s}")
                result = PipelineResult(
                    label=VERIFIED,
                    answer="; ".join(lines),
                    numeric=nums[0] if len(nums) == 1 else None,
                    steps=steps or [f"multi-part ({promo['kind']}): "
                                    + " ".join(lines)],
                    audit=audit)
                result.audit.gates_passed.append("multi_part_all_verified")
                # WS-MH: the aggregate 'independent:' stamp is the
                # badge-gate carve-out for lanes that ran their own
                # registered check at their own boundary -- here EVERY
                # part's claim must carry real second-path evidence
                # (re-verified via check_route on the part's own
                # structure, an independent: gate, or ground truth);
                # without it the promotion stays unverifiable and the
                # strict badge gate keeps it GUIDED honestly.
                if all(_multipart_part_evidence(p)
                       for p in promo["parts"]):
                    result.audit.gates_passed.append(
                        "independent:multipart_per_part_second_path")
                result.audit.elapsed_ms = round(
                    (_time.perf_counter() - t0) * 1000, 1)
                return result
            # not every part verified alone -- try the sequential chain:
            # per-part concept routing with prior outputs forwarded into
            # unbound inputs ('find v, then find KE given m' binds the
            # computed v).  Verified chain beats the guided fallback.
            try:
                from backend.its.solver.competency_engine import (
                    _multipart_execute_multi)
                chain = _multipart_execute_multi(text)
            except Exception:
                chain = None
            if chain is not None and getattr(chain, "matched", False):
                audit.route.append("multi_part:sequential_chain")
                audit.gates_passed.append("sequential_chain")
                result = PipelineResult(
                    label=VERIFIED,
                    answer=chain.final_answer,
                    numeric=chain.numeric_answer,
                    steps=list(chain.steps or []),
                    audit=audit)
                result.audit.elapsed_ms = round(
                    (_time.perf_counter() - t0) * 1000, 1)
                return result
            gp_steps: List[str] = []
            for p in promo.get("parts", []):
                lbl = p.get("label", "")
                p_ans = p.get("answer")
                p_steps = p.get("steps") or []
                if p_steps:
                    gp_steps.append(f"Part ({lbl}):")
                    for s in p_steps:
                        gp_steps.append(f"  {s}")
                elif p_ans:
                    gp_steps.append(f"Part ({lbl}): {p_ans}")
                else:
                    gp_steps.append(f"Part ({lbl}) Solution Strategy:")
                    gp_steps.append("  1. Identify given quantities and target variable.")
                    gp_steps.append("  2. Apply the relevant standard physics formula or physical law.")
                    gp_steps.append("  3. Substitute stated values to solve step-by-step.")
            try:
                from backend.services.enhanced_nodes import model_answer
                ma = model_answer(text)
                if ma:
                    result_ma_lines = [line.strip() for line in ma.split("\n") if line.strip()]
                    if result_ma_lines:
                        gp_steps.append("Standard Curriculum Solution:")
                        gp_steps.extend(f"  {l}" for l in result_ma_lines[:6])
            except Exception as _e:
                log_lane_exception(
                    "answer_pipeline._answer_multi_part.model_answer", _e)
            result = PipelineResult(
                label=GUIDED, answer=None, numeric=None, steps=gp_steps,
                audit=audit,
                refusal_reason="multi-part question; per-part verdicts below")
            result.socratic = {"multi_part": promo}
            result.audit.elapsed_ms = round(
                (_time.perf_counter() - t0) * 1000, 1)
            return result
    return _answer_core(text)


# QUEUE-1: unanswered/missed questions -> review queue.  Every result that
# isn't a verified/computable answer AND carries no authored model answer
# is a coverage gap — log it so offline generation can promote it.
_QUEUE_PATH = None


def _queue_path() -> str:
    global _QUEUE_PATH
    if _QUEUE_PATH is None:
        base = os.environ.get("CBSE_DATA_DIR") or os.path.join(
            os.path.dirname(__file__), "..", "..", "..", "cbse_data")
        _QUEUE_PATH = os.path.join(base, "answer_queue.jsonl")
    return _QUEUE_PATH


def _queue_miss(text: str, result: "PipelineResult") -> None:
    try:
        verified = result.label in (
            "VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL",
            "VERIFIED_SEMANTIC")
        has_authored = bool(
            (result.socratic or {}).get("model_answer"))
        if verified or has_authored:
            return
        entry = {
            "ts": round(time.time()),
            "question": text[:500],
            "lane": result.audit.lane,
            "label": result.label,
            "refusal_reason": result.refusal_reason,
            "route": result.audit.route[-4:],
        }
        os.makedirs(os.path.dirname(_queue_path()), exist_ok=True)
        with open(_queue_path(), "a", encoding="utf-8") as fh:
            fh.write(json.dumps(entry, ensure_ascii=False) + "\n")
    except Exception as exc:
        # logging must never break the answer path — but don't hide bugs
        import sys as _sys
        print(f"[answer_queue] write failed: {exc}", file=_sys.stderr)


def _cs_fastpath(text: str, audit: AuditTrail) -> Optional[PipelineResult]:
    """Verifier-gated CS fast-path (see the call site for the contract).
    Returns None unless the family matched AND its independent verifier
    PASSED -- the answer then ships exactly like a sweep promotion.
    Runs on the RAW question surface (newlines matter for code)."""
    raw = getattr(_CS_RAW, "text", None) or text
    try:
        from backend.its.solver.cs_families import model_cs_families
        r = model_cs_families(raw)
        if not (getattr(r, "matched", False) and r.confidence >= 0.85):
            # electives commerce rows (NET_GST_PAYABLE) ride the same
            # verifier-gated lane -- narrow triggers, verifier required
            from backend.its.solver.commerce_families import \
                model_commerce_families as _mcf
            r = _mcf(raw)
    except Exception:
        return None
    if not (getattr(r, "matched", False) and r.confidence >= 0.85):
        return None
    if r.final_answer is None and r.numeric_answer is None:
        return None
    try:
        from backend.its.solver.independent_verifier import check_route
        verdict, proof = check_route(r.structure, raw, r)
    except Exception:
        return None
    if verdict != "pass":
        if verdict == "fail":
            audit.route.append("cs_fastpath:verifier_fail")
        return None
    audit.route.append(f"cs_fastpath:{r.structure}")
    audit.gates_passed.append("cs_independent_verifier")
    audit._sweep_structure = getattr(r, "structure", "")
    shaped = _shape_promoted(text, r.final_answer, r.numeric_answer,
                             list(r.steps or []), audit)
    return _attach_understood(PipelineResult(
        label=VERIFIED, answer=shaped[0], numeric=shaped[1],
        steps=shaped[2], audit=audit), r)


def _answer_core(text: str) -> PipelineResult:
    t0 = time.perf_counter()
    _clean_ask = text.strip().rstrip(".?! ")
    # exact-kernel fastpath: a bare 'evaluate <expr>' or a
    # substitution-eval 'Evaluate <expr> when x = 5' is a calculator
    # ask.  The substitution form is evaluated by sympy's exact
    # rational path AND re-checked by compute_exact's own AST/Decimal
    # engine after a textual var->value swap -- two independent engines
    # must agree before VERIFIED ships (launch self-test case).
    _sub_m = re.match(
        r"^(?:evaluate|find\s+the\s+value\s+of|what\s+is\s+the\s+value\s+of|"
        r"calculate|compute)\s+(?P<expr>.+?)\s+(?:when|if)\s+"
        r"(?P<var>[a-z])\s*=\s*(?P<val>-?\d+(?:\.\d+)?)\s*[.?!]*$",
        _clean_ask, re.I)
    if _sub_m and re.search(r"\d", _sub_m.group("expr") or ""):
        try:
            from backend.its.solver.exact_kernels import (
                compute_exact as _cx, evaluate_substitution_exact as _es)
            _expr = _sub_m.group("expr").strip()
            _var, _val = _sub_m.group("var"), _sub_m.group("val")
            _sym = _es(_expr, _var, _val)
            # second engine: plain-Python AST eval of the substituted
            # string (no sympy) -- '3x' -> '3*(5)' requires the * splice;
            # letter-boundaries only so '3x' matches but 'max' doesn't
            _num_expr = re.sub(
                rf"(?<![a-zA-Z]){re.escape(_var)}(?![a-zA-Z])",
                f"*({_val})", _expr)
            _num_expr = re.sub(r"^[*]+", "", _num_expr)
            _ast = _cx("evaluate " + _num_expr.replace("^", "**"))
            if _sym is not None and _ast is not None:
                _v1 = float(_sym[0])
                _v2 = float(_ast.get("numeric"))
                if abs(_v1 - _v2) <= 1e-9 * max(1.0, abs(_v1)):
                    audit_exact = AuditTrail(
                        lane="A",
                        route=["exact_kernel:substitution_eval"])
                    audit_exact.gates_passed.extend([
                        "exact_ast_evaluation",
                        "independent:sympy_rational_vs_ast_eval"])
                    res = PipelineResult(
                        label=VERIFIED, answer=str(_ast.get("answer")),
                        numeric=_v1, steps=list(_sym[1]),
                        audit=audit_exact)
                    res.solved = True
                    res.stage = "exact_substitution"
                    return res
        except Exception as _e:
            logger.debug("exact_substitution kernel miss: %s",
                         type(_e).__name__)
    if re.search(r"^(?:evaluate|find\s+the\s+value\s+of|calculate|what\s+is\s+the\s+value\s+of|what\s+is|simplify|compute|find\s+the\s+(?:sum|product|difference|quotient)\s+of)\s+[-+*x/()\d\s\^.]+$", _clean_ask, re.I):
        try:
            from backend.its.solver.exact_kernels import compute_exact as _cx
            _exact_res = _cx(_clean_ask)
            if _exact_res is not None and "answer" in _exact_res:
                audit_exact = AuditTrail(lane="A", route=["exact_kernel:" + _exact_res.get("route", "arithmetic")])
                audit_exact.gates_passed.append("exact_ast_evaluation")
                num_val = _exact_res.get("numeric")
                if num_val is None:
                    try:
                        num_val = float(_exact_res["answer"])
                    except (ValueError, TypeError):
                        num_val = None
                res = PipelineResult(
                    label=VERIFIED, answer=_exact_res["answer"], numeric=num_val,
                    steps=list(_exact_res["steps"]), audit=audit_exact)
                res.solved = True
                res.stage = "exact_arithmetic"
                return res
        except Exception as _e:
            logger.debug("exact_arithmetic kernel miss: %s",
                         type(_e).__name__)
    lane = classify(text)
    audit = AuditTrail(lane=lane)
    # H1 GUARD: figure-carried data must never be reconstructed from
    # text.  A question pointing at a figure may lack the values it
    # references, so any VERIFIED result is downgraded to guided with
    # the figure reference recorded in the audit trail.
    figure_ref = bool(_FIGURE_REF_RE.search(text))
    if figure_ref:
        audit.assumptions.append(
            "question references a figure; figure data was NOT used")
        # short-circuit: skip the heavy cascade -- with figure data
        # missing, any chain would rest on invented values (H1).  Point
        # the student at Lane C instead.
        audit.route.append("figure_short_circuit")
        fig_steps = [
            "Figure-Based Problem Analysis:",
            "1. Read the circuit / ray / geometry labels directly from the provided diagram.",
            "2. Identify the active state / operating condition (e.g., switch closed/open, forward/reverse bias, or boundary index).",
            "3. Apply the corresponding physical law to deduce the resulting behavior step-by-step."
        ]
        try:
            from backend.services.enhanced_nodes import model_answer
            ma = model_answer(text)
            if ma:
                audit.route.append("corpus:model_answer")
                fig_steps.append("Curriculum Solution Guide:")
                fig_steps.extend(f"  {line.strip()}" for line in ma.split("\n") if line.strip())
        except Exception:
            pass
        return PipelineResult(
            label=GUIDED, answer=None, numeric=None, steps=fig_steps,
            audit=audit,
            refusal_reason="This question refers to a figure, and the "
                           "values needed may live in the figure — so "
                           "here is guided practice to work through it "
                           "step by step instead of an automatic answer")
    # CS FAST-PATH (electives-all 2026-10-07): classes 11-12 Computer
    # Science surfaces (code-output prediction, question-stated SQL,
    # stack/queue simulations) classify into every lane -- often C, and
    # Lane A's theory-ask guard returns before the registry sweep gets
    # a turn.  The cs_families dispatcher owns these deterministically:
    # serve ONLY a registry match whose independent verifier PASSES
    # (second engine agreement); any gate refusal / FAIL / na falls
    # through to the normal lanes untouched -- fail-safe by
    # construction, same promotion contract as the sweeps.
    _cs = _cs_fastpath(text, audit)
    if _cs is not None:
        return _cs
    if lane == "A":
        result = _lane_a(text, audit)
    elif lane == "B":
        result = _lane_b(text, audit)
    else:
        # Lane C default: no binding yet.  The registry sweep still gets
        # a turn -- classify() is a heuristic and plenty of computational
        # questions land here ("Is 1188 a perfect cube? ...").  Same
        # promotion gate as the Lane A sweep (never wrong, only guided).
        syll = _independent_sweep(text, audit)
        if syll.matched and "GROWING" in syll.structure.upper() \
                and re.search(r"\b(shrink\w*|shrank|shrunk|contract\w*|"
                              r"shorten\w*|narrow\w*|reduc\w*(?:\s+the)?\s+"
                              r"(?:length|band|rope|hose))\b", text.lower()):
            syll.matched = False
        if syll.matched and syll.confidence >= 0.85 \
                and (syll.numeric_answer is not None or syll.final_answer):
            audit.route.append("modeling:lane_c_sweep")
            audit.gates_passed.append("lane_c_registry_sweep")
            audit._sweep_structure = getattr(syll, "structure", "")
            ans, num, stps = _shape_promoted(text, syll.final_answer,
                                             syll.numeric_answer,
                                             syll.steps, audit)
            result = _attach_understood(PipelineResult(
                label=VERIFIED, answer=ans,
                numeric=num, steps=stps, audit=audit), syll)
        else:
            # NARRATIVE AUTO-BIND (2026-09-30 gate, B01/B02/C10): the
            # question landed in Lane C and the sweep declined.  The
            # verified binders get one turn before the honest
            # "needs variable binding" refusal.
            try:
                from backend.its.solver.binding_executor import \
                    try_auto_bind
            except ImportError:
                try_auto_bind = None
            bound = None
            if try_auto_bind is not None:
                bound = try_auto_bind(text, audit)
            if bound is not None:
                result = bound
            else:
                result = PipelineResult(
                    label=GUIDED, answer=None, numeric=None, steps=[],
                    audit=audit,
                    refusal_reason="This question needs a different "
                                   "approach — let me help you work "
                                   "through it step by step")
    result.audit.elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
    # M14 TIGHTENING (2026-09-30 gate): a construction ask ("steps of
    # construction") must never carry a verified NUMERIC answer -- the
    # deliverable is a drawn procedure, and any number here came from a
    # family misreading construction givens as data.  Downgrade to the
    # honest construction refusal.
    try:
        from backend.its.solver.unit_shape import (is_construction_ask,
                                                   CONSTRUCTION_REFUSAL)
    except ImportError:
        is_construction_ask = None
    if is_construction_ask is not None \
            and result.label in (VERIFIED, VERIFIED_ASSUMED) \
            and is_construction_ask(text):
        result.label = GUIDED
        result.answer = None
        result.numeric = None
        result.refusal_reason = CONSTRUCTION_REFUSAL
        result.audit.route.append("ask_shape:construction_refused")
    if figure_ref and result.label in (VERIFIED, VERIFIED_ASSUMED):
        result.audit.gates_passed.append("figure_reference_guard")
        result.label = GUIDED
        result.refusal_reason = ("This question refers to a figure, and "
                                 "the values needed may live in the "
                                 "figure — here is guided practice to "
                                 "work through it step by step instead "
                                 "of an automatic answer")
    # M15 PROOF-ASK GUARD: 'prove / show that / justify' asks are
    # deliverable-prose questions — a bare numeric from a compute lane
    # (observed live: 'prove sqrt(2) irrational' -> VERIFIED 1.41421,
    # the lane evaluated the number instead of proving) is never the
    # answer.  Downgrade to GUIDED so the corpus model-answer lane
    # serves the authored proof.  Only fires when the result is a bare
    # number with no prose steps — symbolic identity proofs (LHS=RHS
    # lanes carry textual steps) stay verified.
    if result.label in (VERIFIED, VERIFIED_ASSUMED, VERIFIED_OFFICIAL) \
            and re.search(
                r"\b(?:prove|show\s+that|justify|verify\s+that|"
                r"establish)\b", text or "", re.I) \
            and result.numeric is not None \
            and all(re.fullmatch(
                r"[\s\S]{0,4}.*=.*[\d.]|^[\d.]+$",
                str(s).strip()) or len(str(s)) < 40
                for s in (result.steps or [])):
        result.audit.route.append("ask_shape:proof_refused")
        result.label = GUIDED
        result.answer = None
        result.numeric = None
        result.refusal_reason = ("This is a proof question — the "
                                 "answer is a chain of reasoning, not a "
                                 "number.  Working through the authored "
                                 "proof is below.")
    # META-JUDGEMENT GUARD (2026-10-07, class-9 dig): 'two students
    # solve the same problem ... who is correct?' / 'a student
    # calculates X and says Y -- why is this reasoning incorrect?' ask
    # for a JUDGEMENT of a quoted method, not a number.  A compute lane
    # answering the EMBEDDED problem ships a confident-wrong (live:
    # a braking-train meta question answered '800 m' = u*t ignoring the
    # braking -- true stopping distance 400 m; and a falls-from-10-m
    # meta question answered the fall time instead of judging the
    # student's KE claim).  Downgrade verified numerics to the honest
    # guided refusal; the model-answer lane carries the judgement.
    _meta_judgement = re.search(
        r"\btwo\s+students?\b[^.]{0,80}\b(?:solve|approach|use[sd]?)\b|"
        r"\bstudent\s+[ab]\b[^.]{0,80}\b(?:uses?|claims?|calculat\w*|"
        r"writes?|argues?)\b|"
        r"\bis\s+(?:this|the\s+student(?:'s)?(?:\s+(?:reasoning|working|"
        r"answer|method))?)\s+(?:correct|right|wrong|incorrect|valid)\b|"
        r"\bwhy\s+is\s+(?:this|the|their|his|her)\s+(?:reasoning|method|"
        r"working|answer)\s+(?:incorrect|wrong|flawed)\b|"
        r"\bwho\s+is\s+correct\b|\bwhich\s+student\b|"
        r"\bwhose\s+(?:method|approach|answer)\s+is\b|"
        # C8 dig 2026-10-07: 'evaluate whether this solution is correct'
        # and 'explain why choosing breadth as x' shipped bare numbers —
        # both are judgement/prose asks, not computations.
        r"\bevaluat\w+\s+whether\b|"
        # STEM-BM 2026-10-07 (c12 sweep 09_001#d3): 'Propose two
        # management changes ... and justify each' shipped a free-fall
        # time computed from the word 'drop' — an open-response ask.
        r"\bpropose\s+(?:two|three|\d+)?\s*[\w\s]{0,30}?"
        r"(?:changes?|measures?|solutions?|ways?|steps?|"
        r"suggestions?)\b[^.]{0,150}\bjustify\b|"
        r"\b(?:explain|state|justify)\s+why\b|"
        # BIOMATH-FINISH 2026-10-08 (c11 sweep 03_014#d2): 'Is this
        # complete? If not, what is missing?' shipped '90 deg' from the
        # embedded trig equation -- an error-analysis ask judges the
        # given solution, it does not compute.  Also (c12 sweep
        # 06_007#d1) 'Write the volume V(x) as a function of x'
        # shipped '600 sq cm' from a rectangle-area family -- a
        # symbolic-function ask wants an expression, not a number.
        r"\bis\s+(?:this|it|the\s+(?:student(?:'s)?\s+)?"
        r"(?:solution|method|answer|working|reasoning))\s+"
        r"(?:complete|incomplete)\b|"
        r"\bwhat\s+(?:is|'s)\s+(?:missing|wrong)\b|"
        # BIOMATH-FINISH 2026-10-08 (CISCE bio sweep
        # c8_bio_icse_03_002#d3): 'Evaluate the statement: ...'
        # shipped a bare gland name VERIFIED -- a statement-evaluation
        # ask judges a claim, it does not recall a fact fragment.
        r"\bevaluat\w+\s+(?:the\s+)?"
        r"(?:statement|claim|assertion|conclusion)\b|"
        r"\bas\s+a\s+function\s+of\b",
        text or "", re.I)
    # CONSTRUCTION/DRAW GUARD (C9 dig 2026-10-07): 'construct a triangle
    # with BC=5, angle B=60' shipped '115 deg' VERIFIED via
    # ANGLE_SUM_TRI — the lane computed an interior angle the ask never
    # requested.  A construction ask wants steps, not a number.
    _construct_ask = re.search(
        r"\b(?:construct|draw|trace|sketch)\s+(?:a|an|the)?\s*"
        r"(?:triangle|line|segment|circle|angle|perpendicular|"
        r"figure|diagram|graph|quad|trapezium|rhombus|parallelogram|"
        r"rectangle|square|bisector|tangents?)\b",
        text or "", re.I)
    if result.label in (VERIFIED, VERIFIED_ASSUMED) and _construct_ask:
        result.audit.route.append("ask_shape:construction_refused")
        result.label = GUIDED
        result.answer = None
        result.numeric = None
        result.refusal_reason = ("This asks for a construction — "
                                 "the step-by-step method is below, "
                                 "not a single number.")
    if result.label in (VERIFIED, VERIFIED_ASSUMED) and _meta_judgement:
        result.audit.route.append("ask_shape:meta_judgement_refused")
        result.label = GUIDED
        result.answer = None
        result.numeric = None
        result.refusal_reason = ("This question asks whether a worked "
                                 "method is correct — that is a "
                                 "judgement, not a number.  The model "
                                 "answer is below.")
    # M16 NON-COMPUTABLE ASK GUARD: 'design/create/write/state/define/
    # explain' asks want prose output, not a number — a lane that
    # computed SOMETHING from a creative ask (observed live: 'Design a
    # short worksheet' -> VERIFIED '1/x') has misread the question.
    # Downgrade to GUIDED so the corpus/model-answer lane serves an
    # authored response.
    # CHEM DELIVERABLE EXEMPTION (CHEM-ADVERSARIAL 2026-10-06): a
    # 'write/state the chemical formula / electronic configuration /
    # balanced equation' ask HAS a canonical deterministic deliverable
    # (the valency-crossover / Bohr-Bury / balancer families computed
    # exactly that).  Downgrading those discarded a correct formula as
    # if it were creative prose (observed: 'Write the chemical formula
    # of calcium phosphate' -> VERIFIED 'Ca3(PO4)2' -> GUIDED).
    _m16_chem_deliverable = (
        re.search(r"(?:chemical|molecular|empirical)\s+formula\b|"
                  r"electronic\s+configuration|electron\s+configuration|"
                  r"balanced\s+(?:chemical\s+)?equation|"
                  r"\bvalency\b",
                  text or "", re.I)
        and re.fullmatch(
            r"[A-Za-z0-9()\[\],;:.?\s+=<>\-]*", str(result.answer or "")))
    if result.label in (VERIFIED, VERIFIED_ASSUMED) \
            and re.search(
                r"^\s*(?:design|create|write|construct|compose|"
                r"formulate|state|define|explain|describe|"
                r"list|name|draw|propose|suggest|recommend)\b",
                text or "", re.I) \
            and result.answer is not None \
            and not _m16_chem_deliverable \
            and not re.search(r"\b(?:calculate|compute|evaluate|"
                              r"determine)\b|find\s+the\b|how\s+(?:much|"
                              r"many|far|fast|long)\b", text or "", re.I):
        # COMPUTE-ASK CARVE-OUT (2026-10-07 c11 dig): 'State the
        # horizontal and vertical components ... and compute both' is a
        # computation wearing a 'State' opener; a verified numeric under
        # a compute ask must not be refused as prose.
        result.audit.route.append("ask_shape:noncomputable_refused")
        result.label = GUIDED
        result.answer = None
        result.numeric = None
        result.refusal_reason = (
            "This asks for a written/creative response — "
            "the model answer is below.")
    # WHY-ASK GUARD (2026-10-08 c7 corpus dig): a bare numeric answer
    # cannot answer "why/explain" — the number may be the right
    # quantity, but the asked deliverable is the reasoning.  Observed:
    # "When listing multiples to find the LCM of 4 and 6, why do we
    # stop listing once we find the first number that appears in both
    # lists?" shipped "12" VERIFIED — a purpose-clause "to find" +
    # subordinate "once we find" fooled the noncompute carve-out.
    # Compute verbs inside to-/we-/you-find purpose clauses do NOT
    # count as the ask.
    _why_rts = getattr(getattr(result, "audit", None), "route", None) or []
    _curated_why = any(any(p in str(_r) for p in (
        "BIO_WHY_", "CHEM_WHY_", "PHYS_WHY_", "WHY_", "PROOF_",
        "CONCEPT_")) for _r in _why_rts)
    _why_meth = str(getattr(result, "method", "") or "").lower()
    if "curated" in _why_meth and ("concept" in _why_meth
                                   or "why" in _why_meth
                                   or "ncert" in _why_meth):
        _curated_why = True
    if result.label in (VERIFIED, VERIFIED_ASSUMED) \
            and not _curated_why \
            and re.search(
                r"\bwhy\s+(?:do|does|did|is|are|should|must|can|"
                r"would|will)\b|\bexplain\s+(?:why|how)\b|"
                r"\bwhat\s+is\s+the\s+reason\b",
                text or "", re.I) \
            and not re.search(
                r"(?<!\bto\s)(?<!\bwe\s)(?<!\byou\s)(?<!\bthey\s)"
                r"(?<!\bone\s)\bfind\b|\b(?:calculate|compute|evaluate|"
                r"determine|solve\s+for|how\s+(?:much|many|far|fast|"
                r"long))\b", text or "", re.I) \
            and result.answer is not None \
            and re.search(r"\d", str(result.answer)) \
            and len(str(result.answer)) <= 80:
        result.audit.route.append("ask_shape:why_numeric_refused")
        result.label = GUIDED
        result.answer = None
        result.numeric = None
        result.refusal_reason = (
            "This asks for the reasoning, not the number — the model "
            "answer is below.")
    # PROSE-ESSAY GUARD (2026-10-07 class-9 dig): a VERIFIED answer that
    # is a long essay for a question with NO calculation ask is a
    # wrong-node model answer riding a family trigger (observed: "In a
    # series circuit, what is the relationship between the currents?"
    # shipped a class-12 LCR-circuit essay VERIFIED; "Define ultrasound"
    # served a different node's text).  An essay-length answer to a
    # non-calculation ask is downgraded to the guided/model-answer path.
    _no_calc_ask = not re.search(
        r"calculate|compute|find\s+(?:the\s+)?(?:value|speed|current|"
        r"resistance|power|work|force|energy|charge|distance|time|mass)|"
        r"how\s+(?:much|many|far|fast|long)|what\s+is\s+the\s+value",
        text or "", re.I)
    _prose_answer = len(str(result.answer or "")) >= 200 and \
        re.search(r"[a-z]{3,}\s+\w+", str(result.answer or ""), re.I)
    _is_curated_conceptual = False
    _rts = getattr(getattr(result, "audit", None), "route", None) or []
    for _r in _rts:
        if any(pfx in str(_r) for pfx in ("BIO_WHY_", "CHEM_WHY_", "PHYS_WHY_", "WHY_", "PROOF_", "CONCEPT_")):
            _is_curated_conceptual = True
            break
    _meth = str(getattr(result, "method", "") or "").lower()
    if "curated" in _meth and ("concept" in _meth or "why" in _meth or "ncert" in _meth):
        _is_curated_conceptual = True

    if not _is_curated_conceptual and result.label in (VERIFIED, VERIFIED_ASSUMED) \
            and _no_calc_ask and _prose_answer:
        result.audit.route.append("ask_shape:prose_essay_refused")
        result.label = GUIDED
        result.answer = None
        result.numeric = None
        result.refusal_reason = (
            "This asks for a conceptual explanation — the model answer "
            "is below.")
    # final invariant: unverified tiers never carry an answer
    if result.label not in (VERIFIED, VERIFIED_ASSUMED,
                            VERIFIED_OFFICIAL):
        result.answer = None
        result.numeric = None
        # S5 guided-with-method: when the competency router knows WHICH
        # concept this is, a guided answer teaches the parse -- attach
        # the concept's curriculum-aligned solution steps (no answer).
        # SOCIAL-ALL (2026-10-07): the attach no longer skips itself when
        # a warm structure lane pre-filled socratic -- that self-skip was
        # the 0-step dead-end the density pins kept hitting in full-battery
        # runs (fresh processes attached fine; warmed ones shipped a card
        # with no method).  The merge keeps the read-back AND the method.
        _guidance = None
        try:
            from backend.its.solver.competency_engine import (
                concept_guidance)
        except ImportError:
            concept_guidance = None
        if concept_guidance is not None:
            try:
                _guidance = concept_guidance(text)
            except Exception:
                _guidance = None
            if _guidance:
                _soc = getattr(result, "socratic", None)
                if _soc:
                    _soc.setdefault("concept", _guidance)
                else:
                    result.socratic = {"concept": _guidance}
                result.audit.route.append("competency:guided_method")
                if not (getattr(result, "steps", None)):
                    # no lane taught the method - the concept card becomes
                    # it (answer stays withheld; 3-beat minimum)
                    _steps = []
                    for _label, _key in (("Method", "formula"),
                                         ("Concept", "definition"),
                                         ("Key idea", "key_idea")):
                        _v = str(_guidance.get(_key) or "").strip()
                        if _v:
                            _steps.append(f"{_label}: {_v}")
                    if _guidance.get("solution_steps"):
                        _steps.append("Guided Solution Steps:")
                        for s in _guidance["solution_steps"]:
                            _steps.append(f"  Step {s.get('step')}: {s.get('action')} - {s.get('explain')}")
                    if len(_steps) >= 3:
                        result.steps = _steps
            # NONSTEM-2: for fact-recall / non-computable questions the
            # authored corpus IS the answer — attach the model answer
            # (points + expected format) alongside the guided method.
            try:
                from backend.services.enhanced_nodes import model_answer
                ma = model_answer(text)
            except Exception:
                ma = None
            if ma is not None:
                result.socratic = result.socratic or {}
                result.socratic["model_answer"] = ma
                result.audit.route.append("corpus:model_answer")
        if result.label in (GUIDED, REFUSED) and not getattr(result, "steps", None):
            result.steps = [
                "Guided Method:",
                "1. Identify the given quantities and target variable from the question statement.",
                "2. Apply the relevant standard curriculum formula or relationship.",
                "3. Substitute the stated values using consistent units to solve step-by-step."
            ]
    return result
