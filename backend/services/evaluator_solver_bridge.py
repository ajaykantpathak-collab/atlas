"""evaluator_solver_bridge.py -- the sanctioned seam for the ai/legacy
stratum to reach solver internals (boundaries rule AI_LEGACY_TO_SOLVER).

Lazy re-exports only: the evaluators keep their import-time weight
unchanged; the boundary lint sees ai/* importing backend.services.*.
"""
from __future__ import annotations

from typing import Any


def clean_calculus_expression(text: str) -> Any:
    from backend.its.solver.neurolink import clean_calculus_expression as _f
    return _f(text)


class BiologyCognitiveEngine:
    """Lazy forwarding wrapper — construction delegates to the real engine."""

    def __new__(cls, *args: Any, **kwargs: Any):
        from backend.its.solver.biology_cognitive_engine import (
            BiologyCognitiveEngine as _Real,
        )
        return _Real(*args, **kwargs)


def dimensional_guardrails_module() -> Any:
    from backend.its.solver import dimensional_guardrails as _mod
    return _mod


def dim_to_str(guard: Any) -> str:
    from backend.its.solver.dimensional_guardrails import dim_to_str as _f
    return _f(guard)
