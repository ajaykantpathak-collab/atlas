"""dimensional_guardrails.py -- canonical copy lives in backend.ai.dimensions.

The AI stratum wall (harness.boundaries, AI_LEGACY_*) forbids backend.ai.*
from importing backend.its.solver.*; the hybrid evaluator legally needs this
pure sympy utility, so the implementation moved to the ai stratum and this
module re-exports it for every solver-side caller (solver -> ai imports are
the established direction: model_hub precedent).  2026-10-06.
"""
from backend.ai.dimensions import *  # noqa: F401,F403
from backend.ai.dimensions import (  # noqa: F401  (explicit re-exports)
    DimVector,
    DimensionalAnalysisError,
    DimensionalGuardrail,
    dim_add,
    dim_mul,
    dim_to_str,
    dim_sub,
    make_dim,
)
