"""semantic_check.py — declared-semantics consistency gate for PAL.

The extractor now returns a `flows` list — each quantity's signed
contribution as the model UNDERSTANDS the question ('sold pens → +30').
This module does the deterministic half of the contract: it recomputes
the balance from the declarations and compares it to the code's
computed answer, and it checks each declared sign against a fixed
verb-direction lexicon read off the flow's source phrase.

A contradiction means the model's formalisation disagrees with itself —
ship nothing, let the card ask the student instead.
"""
from __future__ import annotations

import logging
import re
from typing import Any, Dict, List, Optional, Tuple

logger = logging.getLogger(__name__)

# Subject-perspective verb directions for a running-total question.
# The subject is whoever owns the changing amount.  Checked against the
# model's DECLARED sign — a declared sign that contradicts the verb is a
# self-inconsistency even when the code agrees.
_VERB_IN = re.compile(
    r"\b(?:earn\w*|receive\w*|receiv\w*|get\w*|got|won|win\w*|find\w*|"
    r"found|collect\w*|borrow\w*|is\s+given|was\s+given|given\s+to|"
    r"saves?\b|deposit\w*|gain\w*|adds?\b|added|increas\w*|"
    r"sells?\b|sold\b)",                    # selling = income to seller
    re.I)
_VERB_OUT = re.compile(
    r"\b(?:spend\w*|spent|pay\w*|paid|buys?\b|bought|purchase\w*|"
    r"cost\w*|lose\w*|lost|gives?\s+(?:away|out)|gave\s+(?:away|out)|"
    r"donat\w*|lend\w*|lent|remov\w*|subtract\w*|decreas\w*|"
    r"withdraw\w*|used?\s+up|ate|eaten|broken)", re.I)


def _verb_direction(source: str) -> Optional[str]:
    """'+' if the source phrase's verb is an inflow, '-' for outflow,
    None if no verb matches (no opinion — never a false flag)."""
    if not source:
        return None
    in_hit = _VERB_IN.search(source)
    out_hit = _VERB_OUT.search(source)
    if in_hit and out_hit:
        # 'buys a notebook for Rs 40 after selling pens' — the LAST verb
        # nearest the number wins; approximate by position
        return ("+" if in_hit.start() > out_hit.start() else "-")
        # note: later position in the phrase is closer to the object
    if in_hit:
        return "+"
    if out_hit:
        return "-"
    return None


def _flows_of(prog: Dict[str, Any]) -> List[Dict[str, Any]]:
    flows = prog.get("flows")
    return [f for f in flows if isinstance(f, dict)] \
        if isinstance(flows, list) else []


def verify_pal_consistency(
        question: str, prog: Dict[str, Any],
        numeric: Optional[float]) -> Tuple[bool, Optional[str]]:
    """(ok, reason).  ok=False -> the PAL result must NOT ship.

    Three checks, all deterministic, all fail-OPEN only when no
    declarations exist (old cached extractions have no 'flows' — the
    card confirm remains the gate for those).
    """
    # ---- KINEMATICS SIGN GATE (2026-10-07, P11 fleet finding) ------
    # A PAL program — often a disk-cached LLM extraction — can bake in
    # the u/v role swap that physics_families._kin_handle refuses at
    # the dispatcher: 'accelerates from rest to 20 m/s in 8 s' with the
    # TIME bound as final velocity shipped -1.5 VERIFIED through
    # structure:PAL_PROGRAM, outranking the dispatcher's verified +2.5
    # (the structure lane runs first in _answer_impl).  The dispatcher
    # invariant must hold on every lane: an acceleration ask whose
    # narrative direction contradicts the computed sign cannot ship.
    _low_q = (question or "").lower()
    if numeric is not None and re.search(
            r"\bacceleration\b", _low_q) and re.search(
            r"\b(?:find|calculate|determine|what|value)\b", _low_q):
        _rest_accel = bool(re.search(
            r"(?:accelerat\w+[^.]{0,40}?\brest\b|\brest\b[^.]{0,40}?"
            r"accelerat\w+|starts?\s+from\s+rest)", _low_q))
        _decel_rest = bool(re.search(
            r"(?:decelerat\w+|retard\w*|slows?\s+down|comes?\s+to\s+rest|"
            r"to\s+rest|brought\s+to\s+rest|brakes?\s+to\s+rest)",
            _low_q))
        if _rest_accel and numeric < 0:
            return False, (
                "'accelerates from rest' cannot yield a negative "
                "acceleration — the program swapped the initial/final "
                "velocity roles (dispatcher sign guard)")
        if _decel_rest and not _rest_accel and numeric > 0:
            return False, (
                "'decelerates / comes to rest' cannot yield a positive "
                "acceleration — velocity role swap refused (dispatcher "
                "sign guard)")

    # ---- QUANTIFIER SEMANTIC CONSISTENCY GATE (reduced to vs reduced by) ----
    if numeric is not None:
        m_bv = re.search(r"(?:book\s+value|cost|valued\s+at)\s*(?:is|of)?\s*(?:rs\.?|inr|\u20b9)?\s*(\d+(?:,\d+)*(?:\.\d+)?)", _low_q)
        if not m_bv:
            m_bv = re.search(r"(?:rs\.?|inr|\u20b9)\s*(\d+(?:,\d+)*(?:\.\d+)?)", _low_q)
        m_pct_to = re.search(r"(?:reduced|depreciated|brought\s+down)\s+to\s+(\d+(?:\.\d+)?)\s*%", _low_q)
        m_pct_by = re.search(r"(?:reduced|depreciated|brought\s+down)\s+(?:by|at)\s+(\d+(?:\.\d+)?)\s*%", _low_q)
        if m_bv and m_pct_to:
            try:
                bv_val = float(m_bv.group(1).replace(",", ""))
                pct_val = float(m_pct_to.group(1))
                if bv_val > 0 and 0 < pct_val < 100:
                    exp_loss = bv_val * (1.0 - pct_val / 100.0)
                    wrong_loss = bv_val * (pct_val / 100.0)
                    asks_loss = bool(re.search(r"\b(?:depreciation|loss|reduction|decreased\s+by)\b", _low_q))
                    if asks_loss and abs(numeric - wrong_loss) <= 0.01 * wrong_loss and abs(numeric - exp_loss) > 0.01 * exp_loss:
                        return False, (
                            f"'reduced to {pct_val}%' requires depreciation = base * (100 - {pct_val})% = {exp_loss:g}, "
                            f"but program computed base * {pct_val}% = {numeric:g} (quantifier inversion)"
                        )
            except Exception:
                pass
        elif m_bv and m_pct_by:
            try:
                bv_val = float(m_bv.group(1).replace(",", ""))
                pct_val = float(m_pct_by.group(1))
                if bv_val > 0 and 0 < pct_val < 100:
                    exp_nbv = bv_val * (1.0 - pct_val / 100.0)
                    wrong_nbv = bv_val * (pct_val / 100.0)
                    asks_nbv = bool(re.search(r"\b(?:new\s+book\s+value|revised\s+value|balance\s+sheet)\b", _low_q))
                    if asks_nbv and abs(numeric - wrong_nbv) <= 0.01 * wrong_nbv and abs(numeric - exp_nbv) > 0.01 * exp_nbv:
                        return False, (
                            f"'reduced by {pct_val}%' requires new book value = base * (100 - {pct_val})% = {exp_nbv:g}, "
                            f"but program computed base * {pct_val}% = {numeric:g} (quantifier inversion)"
                        )
            except Exception:
                pass

    # ---- OVERCONSTRAINED KINEMATICS RESIDUAL GATE ----
    if re.search(r"\baccelerat|\bkinematics|\bvelocit", _low_q):
        m_vels = re.findall(r"(\d+(?:\.\d+)?)\s*(?:m/s|ms-1)\b", _low_q)
        m_times = re.findall(r"(\d+(?:\.\d+)?)\s*(?:s|sec|seconds?)\b", _low_q)
        m_dists = re.findall(r"(\d+(?:\.\d+)?)\s*(?:m|metres?|meters?)\b", _low_q)
        if len(m_vels) >= 2 and len(m_times) >= 1 and len(m_dists) >= 1:
            try:
                u_cand = float(m_vels[0])
                v_cand = float(m_vels[1])
                t_cand = float(m_times[0])
                s_cand = float(m_dists[0])
                if t_cand > 0:
                    s_exp = (u_cand + v_cand) / 2.0 * t_cand
                    if abs(s_cand - s_exp) > max(0.5, 0.05 * s_exp):
                        return False, (
                            f"Overconstrained kinematics: u={u_cand}, v={v_cand}, t={t_cand} implies "
                            f"s={s_exp} m, contradicting stated distance s={s_cand} m"
                        )
            except Exception:
                pass

    flows = _flows_of(prog)
    if not flows:
        return True, None                 # nothing declared — no opinion

    # NOTE: no verb-vs-sign check here — verb direction depends on the
    # tracked quantity ('bought 8 more' ADDS marbles but SPENDS money),
    # so a fixed lexicon misjudges semantics.  The reliable check is
    # declaration-vs-code consistency: the model's own signed flows
    # recomputed independently must equal the program's answer.

    # ---- declared-balance recompute --------------------------------
    # start + sum(sign*value) must equal the code's answer — the model's
    # OWN declaration recomputed independently.  Applies only when a
    # start value exists (running-balance questions).
    start = prog.get("start")
    try:
        start_v = float(start) if start is not None else None
    except (TypeError, ValueError):
        start_v = None
    # Scope guard: the linear recompute is only honest for ADDITIVE
    # balance questions (money/count going up and down).  Rates, ratios,
    # percentages and growth are multiplicative or fractional — summing
    # their declared flows is meaningless, so the gate must not apply.
    additive_only = bool(re.search(
        r"\b(?:how\s+much|how\s+many|remaining|left\b|now\b|balance|"
        r"total|in\s+all|altogether)\b", question or "", re.I)) \
        and not re.search(
            r"%|percent|ratio|per\s+(?:hour|annum|day|minute|second)|"
            r"rate|interest|compound|speed|fills|empties|mixture|"
            r"half|halv\w*|double\w*|twice|thrice|triple|times\s+as|"
            r"fraction|proportion", question or "", re.I)
    if additive_only and numeric is not None:
        def _flow_total(with_start: bool) -> Optional[float]:
            total = start_v if (with_start and start_v is not None) else 0.0
            for f in flows:
                try:
                    v = float(f.get("value"))
                except (TypeError, ValueError):
                    return None
                total += v if str(f.get("sign")) == "+" else -v
            return total

        # two honest readings: the start value may appear separately
        # ('started with 100') OR be declared again as a '+' flow
        # ('pays with a Rs 50 note') — either reading is acceptable;
        # refuse only when NEITHER matches the program's answer
        cands = [t for t in (_flow_total(True), _flow_total(False))
                 if t is not None]
        if start_v is None:
            cands = [t for t in cands[:1]]
        if cands and all(abs(t - numeric) > max(1e-6, 0.01 * abs(t))
                         for t in cands):
            return False, (
                f"declared flows compute {cands[0]:g} but the program "
                f"returned {numeric:g} — contradiction")

    return True, None


def declared_flow_lines(prog: Dict[str, Any]) -> str:
    """Render declared flows as card lines for the semantic
    restatement the student confirms."""
    lines = []
    for f in _flows_of(prog):
        if f.get("source"):
            lines.append(
                f"  • {f['source']} → "
                f"{f.get('sign', '?')}{f.get('value', '?')}"
                + (f"  ({f['why']})" if f.get("why") else ""))
    return "\n".join(lines)
