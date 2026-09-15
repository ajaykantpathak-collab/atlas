"""formula_registry.py -- pure functions with input/output dimensions.

Each formula is a pure function that takes named inputs (with
dimensions) and returns a numeric answer (with a dimension).

Matching is by dimension satisfaction, not regex:
  1. Extract quantities with units from the question
  2. Identify the asked dimension (intent)
  3. Find formulas where: all input dimensions are present AND
     output dimension matches the asked dimension
  4. Apply the formula with the extracted values
  5. Validate the answer

No regex. No text pattern matching. Just dimension matching.

Example formula:

    @register(
        id="OHMS_LAW_CURRENT",
        subject="physics",
        classes=[10, 11, 12],
        chapter="electricity",
        inputs={"voltage": "voltage", "resistance": "resistance"},
        output="current",
        intent_words=["current", "ampere", "amperes"],
    )
    def ohms_law_current(voltage: float, resistance: float) -> float:
        if resistance == 0:
            raise ValueError("resistance cannot be zero")
        return voltage / resistance
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional, Set, Tuple


# --------------------------------------------------------------------------- #
# Formula descriptor
# --------------------------------------------------------------------------- #

@dataclass
class Formula:
    id: str
    subject: str
    classes: List[int]
    chapter: str
    inputs: Dict[str, str]          # slot_name -> dimension
    output: str                     # output dimension
    compute: Callable                # pure function: inputs -> float
    intent_words: List[str] = field(default_factory=list)
    description: str = ""
    # For multi-step formulas: intermediate dimensions produced
    # that can feed into other formulas
    intermediates: Dict[str, str] = field(default_factory=dict)


# --------------------------------------------------------------------------- #
# Registry
# --------------------------------------------------------------------------- #

_REGISTRY: Dict[str, Formula] = {}
_BY_SUBJECT: Dict[str, List[str]] = {}


def register(
    id: str,
    subject: str,
    classes: List[int],
    chapter: str,
    inputs: Dict[str, str],
    output: str,
    intent_words: Optional[List[str]] = None,
    description: str = "",
    intermediates: Optional[Dict[str, str]] = None,
):
    """Decorator to register a formula."""
    def decorator(fn: Callable) -> Callable:
        f = Formula(
            id=id,
            subject=subject,
            classes=classes,
            chapter=chapter,
            inputs=inputs,
            output=output,
            compute=fn,
            intent_words=intent_words or [],
            description=description,
            intermediates=intermediates or {},
        )
        _REGISTRY[id] = f
        _BY_SUBJECT.setdefault(subject, []).append(id)
        return fn
    return decorator


def get_formula(id: str) -> Optional[Formula]:
    return _REGISTRY.get(id)


def get_formulas_by_subject(subject: str) -> List[str]:
    return _BY_SUBJECT.get(subject, [])


def get_all_formulas() -> Dict[str, Formula]:
    return dict(_REGISTRY)


def get_formulas_for_dimensions(
    available_dims: Set[str],
    asked_dim: Optional[str],
    subject: Optional[str] = None,
) -> List[Formula]:
    """Find formulas that can be applied with the given dimensions.

    A formula matches when:
      - All its input dimensions are present in available_dims
      - Its output dimension matches asked_dim (if asked_dim is given)
      - Its subject matches (if subject is given)

    Returns matching formulas sorted by specificity (fewest extra
    inputs first -- most precise match wins).
    """
    matches = []
    for fid, f in _REGISTRY.items():
        if subject and f.subject != subject:
            continue
        # Check all input dimensions are available
        needed = set(f.inputs.values())
        if not needed.issubset(available_dims):
            continue
        # Check output matches the asked dimension
        if asked_dim and f.output != asked_dim:
            continue
        matches.append(f)

    # Sort: fewest inputs first (most precise match)
    matches.sort(key=lambda f: len(f.inputs))
    return matches


def get_chain_formulas(
    available_dims: Set[str],
    asked_dim: str,
    subject: Optional[str] = None,
    max_depth: int = 3,
) -> List[List[Formula]]:
    """Find formula chains that produce asked_dim from available_dims.

    A chain is a sequence of formulas where each formula's output
    feeds into the next formula's inputs. This enables multi-step
    solving (e.g. mass+speed -> kinetic energy -> power).

    Returns a list of chains, each chain being a list of Formula
    objects. Shortest chains first.
    """
    if max_depth <= 0:
        return []

    # Direct match first
    direct = get_formulas_for_dimensions(available_dims, asked_dim,
                                          subject)
    if direct:
        return [[f] for f in direct]

    # Try one-step chains: find formulas that produce an intermediate
    # dimension that, combined with available_dims, can produce asked_dim
    results = []
    current_dims = set(available_dims)

    for fid, f in _REGISTRY.items():
        if subject and f.subject != subject:
            continue
        needed = set(f.inputs.values())
        if not needed.issubset(current_dims):
            continue
        # This formula produces f.output. Can we now reach asked_dim?
        new_dims = current_dims | {f.output}
        if asked_dim in new_dims and f.output == asked_dim:
            # Direct match (shouldn't happen here, but just in case)
            results.append([f])
            continue
        # Try to chain: with f.output available, can we reach asked_dim?
        next_matches = get_formulas_for_dimensions(new_dims, asked_dim,
                                                    subject)
        for nm in next_matches:
            if nm.id != f.id:  # avoid trivial cycles
                results.append([f, nm])

    # Sort by chain length (shortest first)
    results.sort(key=len)
    return results[:10]  # limit to top 10 chains


# --------------------------------------------------------------------------- #
# Statistics
# --------------------------------------------------------------------------- #

def stats() -> Dict[str, Any]:
    """Registry statistics."""
    by_subj = {s: len(ids) for s, ids in _BY_SUBJECT.items()}
    return {
        "total": len(_REGISTRY),
        "by_subject": by_subj,
    }
