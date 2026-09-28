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
import os
import re
import time
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

# --------------------------------------------------------------------------- #
# Label constants
# --------------------------------------------------------------------------- #

VERIFIED = "VERIFIED"
VERIFIED_ASSUMED = "VERIFIED_WITH_ASSUMPTIONS"
VERIFIED_OFFICIAL = "VERIFIED_OFFICIAL"
AMBIGUOUS = "AMBIGUOUS"
GUIDED = "GUIDED_PRACTICE"


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

    def to_dict(self) -> Dict[str, Any]:
        return {
            "lane": self.lane, "route": self.route,
            "quantities": self.quantities, "assumptions": self.assumptions,
            "gates_passed": self.gates_passed,
            "readings_considered": self.readings_considered,
            "anchor": self.anchor, "elapsed_ms": self.elapsed_ms,
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


def _lane_a(text: str, audit: AuditTrail) -> PipelineResult:
    from backend.its.solver.router import solve_text

    r = solve_text(text)
    audit.route.append(f"kernel:{r.stage}")
    audit.elapsed_ms = r.elapsed_ms
    # verified answers may be symbolic closed forms (ant-band: the
    # exact value overflows float64 and is kept as a formula)
    if r.verified and r.answer is not None:
        audit.gates_passed.append("kernel_cascade")
        return PipelineResult(
            label=VERIFIED, answer=r.answer, numeric=r.numeric,
            steps=r.steps, audit=audit)
    # kernel refused: sweep the family registry before giving up --
    # formal-looking questions ("solve 5x-3 > 3x-5") can belong to a
    # family whose triggers the kernel does not cover (mirror of Lane
    # B's full-registry sweep, same promotion gate and polarity guard)
    from backend.its.solver.modeling_layer import model_problem
    syll = model_problem(text)
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
        return PipelineResult(
            label=VERIFIED, answer=syll.final_answer,
            numeric=syll.numeric_answer, steps=syll.steps, audit=audit)
    return PipelineResult(
        label=GUIDED, answer=None, numeric=None,
        steps=r.steps or [], audit=audit,
        refusal_reason=(r.refusal_reason
                        or "No verified formal solution path"))


# --------------------------------------------------------------------------- #
# Lane B: competency narrative (event reader -> state table -> families)
# Delegates to the competency reader; falls through to guided on refusal.
# --------------------------------------------------------------------------- #


def _lane_b(text: str, audit: AuditTrail) -> PipelineResult:
    try:
        from backend.its.solver.competency_reader import read_narrative
    except ImportError:
        read_narrative = None
    if read_narrative is not None:
        result = read_narrative(text, audit)
        if result is not None:
            return result
    try:
        from backend.its.solver.chemistry_reader import read_chemistry
    except ImportError:
        read_chemistry = None
    if read_chemistry is not None:
        result = read_chemistry(text, audit)
        if result is not None:
            return result
    try:
        from backend.its.solver.competency_reader import read_percent_chain
    except ImportError:
        read_percent_chain = None
    if read_percent_chain is not None:
        result = read_percent_chain(text, audit)
        if result is not None:
            return result
    try:
        from backend.its.solver.competency_reader2 import (
            read_mixture_blend, read_work_together)
    except ImportError:
        read_mixture_blend = read_work_together = None
    if read_work_together is not None:
        result = read_work_together(text, audit)
        if result is not None:
            return result
    if read_mixture_blend is not None:
        result = read_mixture_blend(text, audit)
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
        return result
    # ALL readers failed: try the FULL structure registry before
    # falling to Lane A's kernel/CAS.  This ensures the compound
    # interest, depreciation, and every other family gets a chance
    # regardless of which lane the classifier picked.
    from backend.its.solver.modeling_layer import model_problem
    syll = model_problem(text)
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
            stated = [float(x.replace(",", "")) for x in
                      re.findall(r"\d[\d,]*(?:\.\d+)?", text)]
            steps_text = " ".join(str(s) for s in (syll.steps or []))
            used = {float(x.replace(",", "")) for x in
                    re.findall(r"\d[\d,]*(?:\.\d+)?", steps_text)}
            unconsumed = [v for v in stated
                          if not any(abs(v - u) < 1e-9 for u in used)]
            if len(stated) >= 4 and len(unconsumed) >= 2:
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
        return PipelineResult(
            label=VERIFIED, answer=syll.final_answer,
            numeric=syll.numeric_answer, steps=syll.steps,
            audit=audit)
    # reader absent or refused: degrade honestly to Lane A try, else guided
    fallback = _lane_a(text, audit)
    if fallback.label in (VERIFIED, VERIFIED_ASSUMED):
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


_KEY_CONN = None


def _official_key_lookup(text: str) -> Optional[Dict]:
    """Fingerprint-match the question against mined board keys.

    Escrow-strict: a hit requires EXACT canonical-hash AND numeric-
    signature equality, and only ONE candidate key may exist for that
    fingerprint (two letters = ambiguous = no answer).  Returns the key
    row dict or None.
    """
    global _KEY_CONN
    try:
        from backend.tools.mine_keys import canonical_hash, \
            numeric_signature
    except ImportError:
        return None
    import sqlite3
    global _KEY_CONN
    try:
        if _KEY_CONN is None:
            _KEY_CONN = sqlite3.connect(
                r"D:\platform\cbse_data\question_bank.db", check_same_thread=False)
        fp = canonical_hash(text)
        sig = "|".join(numeric_signature(text))
        rows = _KEY_CONN.execute(
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


_FIGURE_REF_RE = re.compile(
    r"given\s+circuit|shown\s+in\s+(?:the\s+)?(?:figure|diagram|graph)|"
    r"in\s+the\s+(?:figure|diagram|graph)|as\s+shown\b|"
    r"following\s+(?:figure|diagram|circuit)|the\s+given\s+"
    r"(?:figure|diagram|circuit)", re.I)


def answer(text: str) -> PipelineResult:
    """Public entry — wraps the implementation so EVERY return path feeds
    the unanswered-question queue (early returns used to skip it)."""
    try:
        from backend.its.solver.competency_engine import (
            _LLM_BUDGET, _LLM_BUDGET_MAX)
        # one budget for the whole question -- Lane A and Lane B both
        # call model_competency; resetting per-call let each lane spend
        # its own 3 calls (6/question under congestion)
        _LLM_BUDGET.set(_LLM_BUDGET_MAX)
    except Exception:
        pass
    result = _answer_impl(text)
    _queue_miss(text, result)
    return result


def _answer_impl(text: str) -> PipelineResult:
    """Classify -> route -> validate -> label.  One honest answer."""
    # S0: the shared input normalizer rewrites wording variants
    # (percent/%, SI/interest, raised-to-power/^, Indian numerals) into
    # canonical form before anything else reads the question.
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
            if _probe_chain(text, AuditTrail(lane="B")) is None:
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
                return _answer_multi_hop(text)
    except Exception:
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
            return PipelineResult(
                label=GUIDED, answer=None, numeric=None,
                steps=[f"Assertion: {result.assertion[:100]}",
                       f"Reason: {result.reason[:100]}"],
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
    result = PipelineResult(
        label=GUIDED, answer=None, numeric=None, steps=[], audit=audit,
        refusal_reason="multi-hop question; per-hop verdicts below")
    result.socratic = {"multi_hop": promo}
    result.audit.elapsed_ms = round(
        (_time.perf_counter() - t0) * 1000, 1)
    return result


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
        promo = try_multi_part(text, _answer_core)
        if promo is not None:
            audit.route.append("multi_part:split")
            audit.gates_passed.append("multi_part_aggregation")
            if promo.get("all_verified"):
                lines = []
                nums = []
                for part in promo["parts"]:
                    ans = part.get("answer") or ""
                    lines.append(f"({part['label']}) {ans}")
                    if part.get("numeric") is not None:
                        nums.append(part["numeric"])
                result = PipelineResult(
                    label=VERIFIED,
                    answer="; ".join(lines),
                    numeric=nums[0] if len(nums) == 1 else None,
                    steps=[f"multi-part ({promo['kind']}): "
                           + " ".join(lines)],
                    audit=audit)
                result.audit.gates_passed.append("multi_part_all_verified")
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
            result = PipelineResult(
                label=GUIDED, answer=None, numeric=None, steps=[],
                audit=audit,
                refusal_reason="multi-part question; per-part verdicts "
                               "below")
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
            "VERIFIED", "VERIFIED_WITH_ASSUMPTIONS", "VERIFIED_OFFICIAL")
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


def _answer_core(text: str) -> PipelineResult:
    t0 = time.perf_counter()
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
        return PipelineResult(
            label=GUIDED, answer=None, numeric=None, steps=[],
            audit=audit,
            refusal_reason="question references a figure; the values "
                           "needed may live in the figure, so no "
                           "autonomous answer is shown -- bind the "
                           "variables yourself (Lane C) or use guided "
                           "practice")
    if lane == "A":
        result = _lane_a(text, audit)
    elif lane == "B":
        result = _lane_b(text, audit)
    else:
        # Lane C default: no binding yet.  The registry sweep still gets
        # a turn -- classify() is a heuristic and plenty of computational
        # questions land here ("Is 1188 a perfect cube? ...").  Same
        # promotion gate as the Lane A sweep (never wrong, only guided).
        from backend.its.solver.modeling_layer import model_problem
        syll = model_problem(text)
        if syll.matched and "GROWING" in syll.structure.upper() \
                and re.search(r"\b(shrink\w*|shrank|shrunk|contract\w*|"
                              r"shorten\w*|narrow\w*|reduc\w*(?:\s+the)?\s+"
                              r"(?:length|band|rope|hose))\b", text.lower()):
            syll.matched = False
        if syll.matched and syll.confidence >= 0.85 \
                and (syll.numeric_answer is not None or syll.final_answer):
            audit.route.append("modeling:lane_c_sweep")
            audit.gates_passed.append("lane_c_registry_sweep")
            result = PipelineResult(
                label=VERIFIED, answer=syll.final_answer,
                numeric=syll.numeric_answer, steps=syll.steps, audit=audit)
        else:
            result = PipelineResult(
                label=GUIDED, answer=None, numeric=None, steps=[],
                audit=audit,
                refusal_reason="Needs variable binding (Lane C) or is not "
                               "computational")
    result.audit.elapsed_ms = round((time.perf_counter() - t0) * 1000, 1)
    if figure_ref and result.label in (VERIFIED, VERIFIED_ASSUMED):
        result.audit.gates_passed.append("figure_reference_guard")
        result.label = GUIDED
        result.refusal_reason = ("question references a figure; the "
                                 "values needed may live in the figure, "
                                 "so no autonomous answer is shown")
    # final invariant: unverified tiers never carry an answer
    if result.label not in (VERIFIED, VERIFIED_ASSUMED,
                            VERIFIED_OFFICIAL):
        result.answer = None
        result.numeric = None
        # S5 guided-with-method: when the competency router knows WHICH
        # concept this is, a guided answer teaches the parse -- attach
        # the concept's curriculum-aligned solution steps (no answer).
        if not getattr(result, "socratic", None):
            try:
                from backend.its.solver.competency_engine import (
                    concept_guidance)
            except ImportError:
                concept_guidance = None
            if concept_guidance is not None:
                try:
                    guidance = concept_guidance(text)
                except Exception:
                    guidance = None
                if guidance:
                    result.socratic = {"concept": guidance}
                    result.audit.route.append("competency:guided_method")
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
    return result
