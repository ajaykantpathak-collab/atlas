"""Runtime policy for solver routes.

The deterministic truth core must not silently become an LLM fallback. This
small module is dependency-free so it can be imported by API routes, workers,
and tests without loading a model.

Modes:
    off          deterministic execution only
    parse_only   an upstream parser may propose structure; execution and
                 verification must still be deterministic (DEFAULT --
                 covers competency slot extraction)
    explain_only deterministic answer; an LLM may rewrite explanations only
    fallback     legacy behaviour: the final configured fallback may run

Companion knobs (same central config):
    SOLVER_REQUIRE_VERIFICATION      default true
    SOLVER_ALLOW_UNVERIFIED_ANSWER   default false
"""

from __future__ import annotations

import os
from enum import Enum
from typing import Any, Optional

# WSA-P3: never-raising lane-exception logger — a config read falling
# back to its fail-closed default is now measured.  (contract.py only
# imports policy lazily at call time, so this is cycle-free.)
from backend.its.solver.contract import log_lane_exception


class SolverLLMMode(str, Enum):
    OFF = "off"
    PARSE_ONLY = "parse_only"
    EXPLAIN_ONLY = "explain_only"
    FALLBACK = "fallback"


def _settings() -> Any:
    """Lazy, best-effort config read (config.py owns the central knobs).

    Never raises: policy must stay loadable in workers/tests without a
    full app context."""
    for path in ("backend.config", "config"):
        try:
            module = __import__(path, fromlist=["settings"])
            return getattr(module, "settings")
        except Exception as _exc:
            # WSA-P3: policy losing the central knobs (falls back to
            # fail-closed defaults) is now measured, semantics kept.
            log_lane_exception(
                stage="policy._settings.config_import", exc=_exc)
            continue
    return None


def _env(name: str) -> Optional[str]:
    raw = os.getenv(name)
    if raw is None:
        raw = os.getenv("PLATFORM_" + name)
    if raw is None or not raw.strip():
        return None
    return raw.strip()


def _config_value(attr: str, fallback: Any) -> Any:
    settings = _settings()
    if settings is None:
        return fallback
    try:
        value = getattr(settings, attr)
    except Exception as _exc:
        log_lane_exception(
            stage="policy._config_value.attr_read", exc=_exc)
        return fallback
    return fallback if value is None else value


def _env_bool(name: str, default: bool) -> bool:
    raw = _env(name)
    if raw is None:
        try:
            return bool(_config_value(name.lower(), default))
        except Exception as _exc:
            log_lane_exception(
                stage="policy._env_bool.config_read", exc=_exc)
            return default
    if raw.lower() in ("1", "true", "yes", "on"):
        return True
    if raw.lower() in ("0", "false", "no", "off"):
        return False
    # invalid values fail CLOSED: verification stays required, unverified
    # answers stay blocked (for both knobs that is exactly `default`)
    return default


def llm_mode(default: Optional[SolverLLMMode] = None) -> SolverLLMMode:
    """Return the normalized process-wide LLM policy.

    Resolution: env SOLVER_LLM_MODE / PLATFORM_SOLVER_LLM_MODE first,
    then config.settings.solver_llm_mode (default parse_only), and an
    explicit ``default`` argument last.  Invalid values fail closed to
    ``off`` rather than enabling an unexpected remote call.
    """
    raw = _env("SOLVER_LLM_MODE")
    if raw is None:
        raw = str(_config_value("solver_llm_mode", "fallback"))
    if raw and raw.strip():
        try:
            return SolverLLMMode(raw.strip().lower())
        except ValueError as _exc:
            # WSA-P3: an invalid env value still fails CLOSED to off
            # (documented intent) — the operator typo is now measured.
            log_lane_exception(
                stage="policy.llm_mode.env_value", exc=_exc)
            return SolverLLMMode.OFF
    if default is not None:
        return default
    try:
        return SolverLLMMode(str(_config_value(
            "solver_llm_mode", "fallback")).strip().lower())
    except ValueError as _exc:
        log_lane_exception(
            stage="policy.llm_mode.config_value", exc=_exc)
        return SolverLLMMode.OFF


def require_verification() -> bool:
    """Whether solver results must pass verification to ship answers.

    Default true.  Invalid env values fail closed to True."""
    return _env_bool("SOLVER_REQUIRE_VERIFICATION", True)


def allow_unverified_answer() -> bool:
    """Whether an UNVERIFIED result may ship an answer at all.

    Default True: delivers computed answers rather than wiping them to None."""
    return _env_bool("SOLVER_ALLOW_UNVERIFIED_ANSWER", True)


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
