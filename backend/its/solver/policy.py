"""Runtime policy for solver routes.

The deterministic truth core must not silently become an LLM fallback. This
small module is dependency-free so it can be imported by API routes, workers,
and tests without loading a model.

Modes:
    off          deterministic execution only
    parse_only   an upstream parser may propose structure; execution and
                 verification must still be deterministic
    explain_only deterministic answer; an LLM may rewrite explanations only
    fallback     legacy behaviour: the final configured fallback may run
"""

from __future__ import annotations

import os
from enum import Enum


class SolverLLMMode(str, Enum):
    OFF = "off"
    PARSE_ONLY = "parse_only"
    EXPLAIN_ONLY = "explain_only"
    FALLBACK = "fallback"


def llm_mode(default: SolverLLMMode = SolverLLMMode.OFF) -> SolverLLMMode:
    """Return the normalized process-wide LLM policy.

    Invalid values fail closed to ``off`` rather than enabling an unexpected
    remote call.
    """
    raw = os.getenv("SOLVER_LLM_MODE")
    if raw is None:
        raw = os.getenv("PLATFORM_SOLVER_LLM_MODE")
    if raw is None or not raw.strip():
        return default
    try:
        return SolverLLMMode(raw.strip().lower())
    except ValueError:
        return SolverLLMMode.OFF


def llm_allowed_for_fallback() -> bool:
    """Whether a solver may call an LLM as its final fallback."""
    return llm_mode() == SolverLLMMode.FALLBACK


def llm_used_is_allowed(*, mode: SolverLLMMode, purpose: str) -> bool:
    """Gate optional LLM work by explicit purpose."""
    if mode == SolverLLMMode.FALLBACK:
        return True
    if mode == SolverLLMMode.PARSE_ONLY:
        return purpose == "parse"
    if mode == SolverLLMMode.EXPLAIN_ONLY:
        return purpose == "explain"
    return False
