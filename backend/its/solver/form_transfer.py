"""form_transfer.py — The correctness path: form retrieval + transfer.

For questions whose FORM exists in the compiled bank, the answer path
is the official one. Pipeline:

    student question
      -> retrieve top-k compiled forms (MiniLM over skeletons)
      -> take the matched form's ORIGINAL sample text
      -> solve the form's own text as the ANCHOR (must solve, or refuse)
      -> solve the student's text through the same router stages
      -> VERIFY the transfer (the 2026-09-12 red-team gates; every gate
         that fails is an honest refusal, never a guess):
           P. ANSWER-SHAPE   a points/coordinates ask is never answered
                             with a transferred bare scalar
           U. UNIT-SUPPORT   every unit-bearing stated quantity must be
                             SI-expressible ("2.00 ns" is parsed but the
                             transfer lane has no ns->s executor, so it
                             REFUSES rather than shipping 1e+08); only
                             quantities whose value already reaches the
                             formula in SI may transfer
           C. COVERAGE       every stated quantity must be consumed by
                             the student solve's own steps (the anchor's
                             slot arithmetic must not silently drop
                             operands)
           A. ANCHOR-ECHO    if the student's numbers differ from the
                             anchor's numbers but the answer equals the
                             anchor's answer, the transfer never
                             happened -- the downstream lane just
                             re-derived the bank's own instance
      -> plausibility gate -> verified answer

The anchor mechanism is what makes this trustworthy: if the form's own
text cannot be solved consistently, or the student transfer cannot be
PROVEN, transfer is refused - a stale or misaligned form can never
produce a confident wrong answer.
"""

from __future__ import annotations

import logging
import re
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)

# quantulum3 unit name -> SI factor for its family's base unit.  A
# quantity whose unit is missing here (or whose factor != 1) cannot be
# PROVEN to reach a formula as the correct SI value, because the
# downstream lanes bind raw magnitudes; the transfer then refuses.
_SI_FACTOR = {
    "metre": 1.0, "second": 1.0, "kilogram": 1.0, "ampere": 1.0,
    "kelvin": 1.0, "mole": 1.0, "candela": 1.0, "joule": 1.0,
    "newton": 1.0, "watt": 1.0, "volt": 1.0, "ohm": 1.0,
    "pascal": 1.0, "coulomb": 1.0, "hertz": 1.0, "litre": 1.0,
    "metre per second": 1.0, "metre per second squared": 1.0,
    "dimensionless": 1.0,
}

# asks whose answer is a POINT / coordinate pair are symbolic-geometry
# asks: a bare scalar transfer is definitionally the wrong answer shape
_POINT_ASK_RE = re.compile(
    r"find\s+the\s+(?:points?\b|coordinates)|coordinates\s+of\s+[a-zA-Z]"
    r"|at\s+which\s+the\s+[xyz]-?coordinate|points?\s+on\s+the\s+curve",
    re.I)

_NUM_RE = re.compile(r"-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?")


def _numbers_in(text: str) -> List[float]:
    return [float(x) for x in _NUM_RE.findall(text or "")]


def _close(a: float, b: float) -> bool:
    return abs(a - b) <= 1e-9 + 0.01 * max(abs(a), abs(b))


def _unit_transfer_supported(unit_name: Optional[str]) -> bool:
    """Only quantities that reach a formula as their true SI value may
    transfer; anything else is an honest refusal (honesty over
    coverage)."""
    if not unit_name:
        return True                     # bare number: no unit to convert
    return _SI_FACTOR.get(unit_name, None) == 1.0


def solve_by_form(text: str, quantity_parser=None) -> Optional[Dict]:
    """Retrieve the matching form, solve the form itself as an anchor,
    then solve the student question through the same router stages.
    Returns a dict with anchor diagnostics, or None when the transfer
    cannot be PROVEN (refusal -> downstream lanes -> guided).

    The anchor solve uses the ROUTER with form-transfer temporarily
    disabled (module flag) so anchor solves never recurse into this
    stage again."""
    try:
        import backend.its.solver.router as router_mod
        from backend.its.solver.form_compiler import get_form_index

        # ---- GATE P: answer shape (points/coordinates) ----
        if _POINT_ASK_RE.search(text):
            logger.info(
                "form_transfer refused: point/coordinate ask cannot be "
                "answered by a transferred bare scalar")
            return None

        # ---- GATE U: unit support on stated quantities ----
        try:
            from backend.its.solver.quantity_parser import parse_quantities
            stated = parse_quantities(text)
        except Exception:
            stated = []
        for q in stated:
            if not _unit_transfer_supported(q.unit_name):
                logger.info(
                    "form_transfer refused: stated quantity %r carries "
                    "unit %r without SI transfer support",
                    q.surface, q.unit_name)
                return None

        index = get_form_index()
        hits = index.retrieve(text, k=2)
        if not hits or hits[0]["score"] < 0.86:
            return None
        top = hits[0]

        # anchor: solve the bank's own instance (recursion guarded)
        sample = (top.get("sample") or "").strip()
        router_mod._FORM_TRANSFER_ACTIVE = False
        try:
            anchor = None
            if sample and len(sample) > 40:
                try:
                    from backend.its.solver.router import solve_text
                    anchor = solve_text(sample)
                except Exception:
                    anchor = None
            anchor_ok = bool(anchor and anchor.solved
                             and anchor.numeric is not None)
        finally:
            router_mod._FORM_TRANSFER_ACTIVE = True

        # student question: same machinery, recursion guarded here too
        from backend.its.solver.router import solve_text
        router_mod._FORM_TRANSFER_ACTIVE = False
        try:
            own = solve_text(text)
        finally:
            router_mod._FORM_TRANSFER_ACTIVE = True
        own_ok = bool(own and own.solved and own.numeric is not None)
        if not own_ok:
            return None

        # ---- GATE C: coverage of every stated quantity ----
        steps_text = " ".join(str(s) for s in (own.steps or []))
        used = _numbers_in(steps_text) + \
            ([own.numeric] if own.numeric is not None else [])
        unconsumed = []
        for q in stated:
            if not any(_close(q.value, u) for u in used):
                unconsumed.append(q.surface)
        if unconsumed:
            logger.info(
                "form_transfer refused: stated quantities %s never used "
                "by the transferred solve", unconsumed)
            return None

        # ---- GATE A: anchor echo ----
        student_nums = {round(v, 6) for v in _numbers_in(text)}
        anchor_nums = {round(v, 6) for v in _numbers_in(sample)}
        if anchor_ok and anchor is not None and student_nums != anchor_nums \
                and own.numeric is not None \
                and _close(own.numeric, anchor.numeric):
            logger.info(
                "form_transfer refused: student numbers %s differ from "
                "the anchor's %s but the answer echoed the anchor's (%s) "
                "-- transfer unproven", sorted(student_nums),
                sorted(anchor_nums), own.numeric)
            return None

        return {
            "target": "transferred",
            "value": own.numeric,
            "eq_id": f"form:{top['form_id']}",
            "knowns": {"form_similarity": round(top["score"], 3),
                       "anchor_solved": int(anchor_ok),
                       "anchor_stage": (anchor.stage if anchor
                                        else None),
                       "answer_stage": own.stage},
            "score": 1.0 + (1.0 if anchor_ok else 0.0),
            "steps": [
                f"form match {top['form_id']} "
                f"(similarity {top['score']:.3f}, "
                f"{top.get('n_instances', '?')} instances seen)",
                f"official steps available: "
                f"{bool(top.get('has_answer'))}",
                f"anchor solve of the bank's own instance: "
                f"{'OK ' + str(anchor.answer)[:60] if anchor_ok else 'refused'}",
                f"transfer gates: units SI-supported, all "
                f"{len(stated)} stated quantities consumed",
                f"student question solved via {own.stage}: "
                f"{own.numeric:.6g}",
            ],
        }
    except Exception as exc:
        logger.warning("form_transfer failed: %s", exc)
        return None
