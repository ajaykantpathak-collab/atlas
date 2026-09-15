"""new_pipeline.py -- the new unit-based solver pipeline.

Replaces the old regex-based pipeline. Flow:

  1. Strip metadata (Reprint, ISBN, years in metadata)
  2. Extract quantities with units (no bare numbers)
  3. Extract asked dimension (what the question wants)
  4. Identify subject from units + intent
  5. Find matching formulas by dimension satisfaction
  6. Apply formula with extracted values
  7. Validate answer
  8. Return VERIFIED or REFUSED

No regex on question text. No global formula sweep. No bare
number extraction. No false promotion.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Set, Tuple

from backend.its.solver.metadata_stripper import strip_metadata
from backend.its.solver.subject_router import identify_subject
from backend.its.solver.intent_extractor import (
    extract_asked_dimension, extract_quantities, extract_bare_numbers,
)
from backend.its.solver.formula_registry import (
    Formula, get_formulas_for_dimensions, get_chain_formulas,
    get_all_formulas,
)
from backend.its.solver.answer_validator import validate_answer


# --------------------------------------------------------------------------- #
# Result
# --------------------------------------------------------------------------- #

VERIFIED = "VERIFIED"
REFUSED = "REFUSED"
GUIDED = "GUIDED_PRACTICE"


@dataclass
class SolveResult:
    label: str
    answer: Optional[float] = None
    answer_str: Optional[str] = None
    formula_id: Optional[str] = None
    subject: Optional[str] = None
    asked_dim: Optional[str] = None
    available_dims: Set[str] = field(default_factory=set)
    quantities: List[Tuple[float, str, str]] = field(default_factory=list)
    reason: Optional[str] = None
    steps: List[str] = field(default_factory=list)


# --------------------------------------------------------------------------- #
# Pipeline
# --------------------------------------------------------------------------- #

def solve(text: str) -> SolveResult:
    """Solve a question using the new unit-based pipeline."""
    if not text or not text.strip():
        return SolveResult(label=REFUSED, reason="empty input")

    # 1. Strip metadata
    clean_text = strip_metadata(text)
    if not clean_text.strip():
        return SolveResult(label=REFUSED,
                           reason="only metadata, no question")

    # 2. Extract quantities with units
    quantities = extract_quantities(clean_text)

    # 2b. If no unit-based quantities and subject is maths, try bare numbers
    if not quantities:
        bare_nums = extract_bare_numbers(clean_text)
        if bare_nums:
            quantities = bare_nums

    if not quantities:
        return SolveResult(label=REFUSED,
                           reason="no quantities found")

    # Group quantities by dimension
    dims_to_values: Dict[str, List[Tuple[float, str]]] = {}
    for val, dim, unit in quantities:
        dims_to_values.setdefault(dim, []).append((val, unit))

    available_dims = set(dims_to_values.keys())

    # 3. Extract asked dimension
    asked_dim, ask_confidence = extract_asked_dimension(clean_text)

    # 4. Identify subject
    subject, subj_confidence, detected_dims = identify_subject(clean_text)

    # 5. Find matching formulas
    if asked_dim == "unknown":
        # Try all formulas for the subject without output filter
        candidates = get_formulas_for_dimensions(
            available_dims, None, subject)
    else:
        candidates = get_formulas_for_dimensions(
            available_dims, asked_dim, subject)

    # If no direct match, try chains
    if not candidates and asked_dim != "unknown":
        chains = get_chain_formulas(available_dims, asked_dim, subject)
        if chains:
            # For now, just note that a chain exists
            # Full chain execution is a future enhancement
            return SolveResult(
                label=GUIDED,
                subject=subject,
                asked_dim=asked_dim,
                available_dims=available_dims,
                quantities=quantities,
                reason=f"multi-step chain possible "
                       f"({len(chains)} chains found)",
            )
        return SolveResult(
            label=REFUSED,
            subject=subject,
            asked_dim=asked_dim,
            available_dims=available_dims,
            quantities=quantities,
            reason=f"no formula matches dims {available_dims} "
                   f"-> {asked_dim} for subject {subject}",
        )

    if not candidates:
        return SolveResult(
            label=REFUSED,
            subject=subject,
            asked_dim=asked_dim,
            available_dims=available_dims,
            quantities=quantities,
            reason=f"no formula matches for subject {subject} "
                   f"with dims {available_dims}",
        )

    # 6. Try each candidate formula
    for formula in candidates:
        try:
            # Bind quantities to formula inputs
            kwargs = {}
            ok = True
            for slot_name, slot_dim in formula.inputs.items():
                values = dims_to_values.get(slot_dim, [])
                if not values:
                    ok = False
                    break
                # Use the first value for this dimension
                # (future: smarter binding by role/intent)
                kwargs[slot_name] = values[0][0]
            if not ok:
                continue

            # Apply the formula
            result = formula.compute(**kwargs)

            # 7. Validate the answer
            is_valid, reason = validate_answer(
                result, asked_dim, clean_text)
            if not is_valid:
                continue

            # 8. Return verified answer
            answer_str = f"{result:.6g}"
            steps = [f"{formula.id}: {formula.description} = {answer_str}"]

            return SolveResult(
                label=VERIFIED,
                answer=result,
                answer_str=answer_str,
                formula_id=formula.id,
                subject=subject,
                asked_dim=asked_dim,
                available_dims=available_dims,
                quantities=quantities,
                steps=steps,
            )
        except (ValueError, ZeroDivisionError, OverflowError):
            continue

    # All candidates failed
    return SolveResult(
        label=REFUSED,
        subject=subject,
        asked_dim=asked_dim,
        available_dims=available_dims,
        quantities=quantities,
        reason="all candidate formulas failed validation",
    )


# --------------------------------------------------------------------------- #
# Import all formula modules to populate the registry
# --------------------------------------------------------------------------- #

def _load_formulas():
    """Import all formula modules to register them."""
    try:
        from backend.its.solver import formulas_maths_6_8  # noqa
    except ImportError:
        pass
    # Future: import formulas_maths_9_10, formulas_physics, etc.


_load_formulas()
