"""
solvers/base.py

Shared SolverResult base module for all 37 solvers.
Backward compatible — existing solvers can adopt incrementally.

Author: Platform Backend Team
"""

from __future__ import annotations

import time
import hashlib
from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional, Union
from enum import Enum

# ──────────────────────────────────────────────────────────────────────────────
# YAML support — tries ruamel.yaml (preserves order / types), falls back to PyYAML
# ──────────────────────────────────────────────────────────────────────────────
try:
    from ruamel.yaml import YAML

    _ruamel_yaml = YAML()
    _ruamel_yaml.preserve_quotes = True
    _HAS_RUAMEL = True
except ImportError:
    import yaml as _pyyaml
    _HAS_RUAMEL = False


# ──────────────────────────────────────────────────────────────────────────────
# Enums
# ──────────────────────────────────────────────────────────────────────────────
class VerificationStatus(str, Enum):
    """How the answer was verified after solving."""
    NONE = "none"
    SUBSTITUTION = "substitution"          # plugged value back into original eqn
    DIMENSIONAL = "dimensional"            # unit / dimensional analysis check
    SYMMETRY = "symmetry"                  # sign / parity sanity check
    BOUNDARY = "boundary"                  # limit-case sanity (e.g. x=0, x→∞)
    APPROXIMATION = "approximation"        # numeric vs symbolic comparison
    CROSS_VALIDATED = "cross_validated"    # compared against a second method


# ──────────────────────────────────────────────────────────────────────────────
# Step  – one atomic transformation in the solution walkthrough
# ──────────────────────────────────────────────────────────────────────────────
@dataclass
class Step:
    """
    One step in a step-by-step solution.

    Fields map directly to the API schema so routers can Serialize without
    knowing which solver produced the result.
    """
    label: str                          # e.g. "Step 1", "Substitute values"
    rule: str                           # e.g. "Quadratic Formula", "Ohm's Law"
    formula: Optional[str] = None       # LaTeX / plain-text formula applied
    before: str = ""                   # Expression / state BEFORE transformation
    after: str = ""                    # Expression / state AFTER  transformation
    explanation: str = ""              # 1-sentence Hinglish explanation
    visual_hint: Optional[str] = None   # Optional hint for rendering (emoji / SVG ref)

    # ── fluent builder helpers (so existing solvers can chain calls) ─────────
    @staticmethod
    def builder(label: str) -> "_StepBuilder":
        return _StepBuilder(label)

    def to_dict(self) -> Dict[str, Any]:
        d = asdict(self)
        d["type"] = "Step"
        return d

    def to_yaml(self) -> str:
        """Serialize this step to YAML string."""
        return _dump_yaml(self.to_dict())


class _StepBuilder:
    """Fluent builder so solvers can write::

        step = Step.builder("Apply Ohm's Law")
            .rule("V = IR")
            .before("V = ?") 
            .after("V = 6 V")
            .explain("Voltage current mein resistance multiply karke nikala")
            .build()
    """

    def __init__(self, label: str) -> None:
        self._label = label
        self._rule: str = ""
        self._formula: Optional[str] = None
        self._before: str = ""
        self._after: str = ""
        self._explanation: str = ""
        self._visual_hint: Optional[str] = None

    def rule(self, r: str) -> "_StepBuilder":
        self._rule = r
        return self

    def formula(self, f: Optional[str]) -> "_StepBuilder":
        self._formula = f
        return self

    def before(self, b: str) -> "_StepBuilder":
        self._before = b
        return self

    def after(self, a: str) -> "_StepBuilder":
        self._after = a
        return self

    def explain(self, e: str) -> "_StepBuilder":
        self._explanation = e
        return self

    def visual_hint(self, v: Optional[str]) -> "_StepBuilder":
        self._visual_hint = v
        return self

    def build(self) -> Step:
        return Step(
            label=self._label,
            rule=self._rule,
            formula=self._formula,
            before=self._before,
            after=self._after,
            explanation=self._explanation,
            visual_hint=self._visual_hint,
        )


# ──────────────────────────────────────────────────────────────────────────────
# SolverResult  – canonical return type for every solver
# ──────────────────────────────────────────────────────────────────────────────
@dataclass
class SolverResult:
    """
    Canonical result object returned by every solver in the platform.

    Designed for incremental adoption:
      - All fields have sensible defaults so a solver can add just `success`
        and `answer` and everything else stays empty / None.
      - The `_from_legacy()` classmethod lets old solvers wrap their existing
        custom dataclasses without rewriting them.
      - `board` field enables CBSE vs CISCE answer formatting.
    """
    success: bool
    answer: Any = None
    steps: List[Step] = field(default_factory=list)
    error: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)
    verification_status: Optional[VerificationStatus] = None
    verification_details: Optional[str] = None
    unit: Optional[str] = None
    misconception_tags: List[str] = field(default_factory=list)
    solve_time_ms: Optional[float] = None
    seed: Optional[int] = None
    board: Optional[str] = None  # "CBSE" or "CISCE" — controls answer format

    # ── timing helper ──────────────────────────────────────────────────────
    @staticmethod
    def timed(success: bool = True) -> "_TimedContext":
        """Context manager that records wall-clock solve time in ms."""
        return _TimedContext(success=success)

    # ── serialization ─────────────────────────────────────────────────────
    def to_dict(self) -> Dict[str, Any]:
        """Convert to a plain dict safe for JSON serialization.

        Handles:
          - VerificationStatus enum to str
          - Step objects to dict
          - SymPy / Pint types to str (via str())
        """
        d = asdict(self)

        # enum → str
        vs = d.get("verification_status")
        if isinstance(vs, VerificationStatus):
            d["verification_status"] = vs.value

        # step objects → dict
        d["steps"] = [s.to_dict() if isinstance(s, Step) else s for s in self.steps]

        # SymPy / Pint / exotic types → str
        if d["answer"] is not None and not isinstance(
            d["answer"], (bool, int, float, str, list, dict, type(None))
        ):
            d["answer"] = str(d["answer"])

        d["_type"] = "SolverResult"
        return d

    def to_json(self, **kwargs: Any) -> str:
        """Serialize to JSON string.

        Extra kwargs forwarded to json.dumps (e.g. indent=2).
        """
        import json

        return json.dumps(self.to_dict(), default=str, **kwargs)

    def to_yaml(self) -> str:
        """Serialize to YAML string."""
        return _dump_yaml(self.to_dict())

    # ── legacy adapter ─────────────────────────────────────────────────────
    @classmethod
    def from_legacy(cls, legacy_obj: Any) -> "SolverResult":
        """Adapt an existing solver's custom result dataclass to SolverResult.

        Works by attribute sniffing — no hard dependency on any legacy class.
        Fields that don't exist on the legacy object are left as defaults.

        Supported legacy field mappings (checked in order):

        * success  ← `success`, `is_success`, `ok`
        * answer   ← `answer`, `result`, `solution`, `final_answer`
        * steps    ← `steps`, `walkthrough`, `trace`, `solution_steps`
        * error    ← `error`, `err_msg`, `message`, `error_message`
        * metadata ← `metadata`, `meta`, `extra`, `info`
        * unit     ← `unit`, `units`

        Example::

            old = OldSolverResult(success=True, result=42, steps=[...])
            new = SolverResult.from_legacy(old)
        """
        _bool_aliases = ("success", "is_success", "ok")
        _answer_aliases = ("answer", "result", "solution", "final_answer", "value")
        _steps_aliases = ("steps", "walkthrough", "trace", "solution_steps", "derivation")
        _error_aliases = ("error", "err_msg", "message", "error_message", "err")
        _meta_aliases = ("metadata", "meta", "extra", "info", "context")
        _unit_aliases = ("unit", "units")

        def _grab(aliases: tuple) -> Any:
            for a in aliases:
                if hasattr(legacy_obj, a):
                    return getattr(legacy_obj, a)
            return None

        success_val = _grab(_bool_aliases)
        if success_val is None:
            success_val = False

        answer_val = _grab(_answer_aliases)

        steps_val = _grab(_steps_aliases)
        normalized_steps: List[Step] = []
        if steps_val:
            for s in steps_val:
                normalized_steps.append(_normalize_step(s))

        error_val = _grab(_error_aliases)
        meta_val = _grab(_meta_aliases)
        if meta_val is None:
            meta_val = {}
        if not isinstance(meta_val, dict):
            meta_val = {"value": str(meta_val)}

        unit_val = _grab(_unit_aliases)

        # detect seed / timing if present on legacy object
        seed_val = getattr(legacy_obj, "seed", None)
        time_val = getattr(legacy_obj, "solve_time_ms", None)

        return cls(
            success=bool(success_val),
            answer=answer_val,
            steps=normalized_steps,
            error=str(error_val) if error_val else None,
            metadata=meta_val,
            unit=str(unit_val) if unit_val else None,
            seed=seed_val,
            solve_time_ms=time_val,
        )


# ──────────────────────────────────────────────────────────────────────────────
# Internal helpers
# ──────────────────────────────────────────────────────────────────────────────
class _TimedContext:
    """Context manager used by SolverResult.timed()."""

    def __init__(self, success: bool) -> None:
        self._success = success
        self._t0: Optional[float] = None
        self._result: Optional[SolverResult] = None

    def __enter__(self) -> "_TimedContext":
        self._t0 = time.perf_counter()
        return self

    def __exit__(self, *exc: Any) -> None:
        elapsed_ms = (time.perf_counter() - self._t0) * 1000 if self._t0 else None
        self._result = SolverResult(
            success=self._success and not any(exc),
            solve_time_ms=elapsed_ms,
        )

    def result(self) -> SolverResult:
        if self._result is None:
            return SolverResult(success=self._success)
        return self._result


def _normalize_step(raw: Any) -> Step:
    """Best-effort conversion of any legacy step object into a Step.

    Handles the three known legacy step shapes:

    1.  solver_maths_c12 Step(label, rule_applied, expression, explanation)
        → maps rule_applied→rule, expression→after
    2.  solver_physics_c12 StepBuilder fluent output (has law, formula, sub,
        comp, unit, verify, conclusion attributes)
    3.  plain dict with any subset of {label, rule, formula, before, after,
        explanation, visual_hint}
    4.  already a Step → returned as-is
    """
    if isinstance(raw, Step):
        return raw

    if isinstance(raw, dict):
        return Step(
            label=raw.get("label", ""),
            rule=raw.get("rule", raw.get("rule_applied", raw.get("law", ""))),
            formula=raw.get("formula"),
            before=raw.get("before", raw.get("sub", raw.get("expression", ""))),
            after=raw.get("after", raw.get("conclusion", raw.get("comp", ""))),
            explanation=raw.get("explanation", ""),
            visual_hint=raw.get("visual_hint"),
        )

    # object with attributes (maths c12 Step, physics c12 builder output)
    label = getattr(raw, "label", "")
    rule = getattr(raw, "rule_applied", getattr(raw, "law", getattr(raw, "rule", "")))
    formula = getattr(raw, "formula", None)
    before = getattr(
        raw, "expression",
        getattr(raw, "sub", getattr(raw, "before", "")),
    )
    after = getattr(
        raw,
        "conclusion",
        getattr(raw, "comp", getattr(raw, "after", "")),
    )
    explanation = getattr(raw, "explanation", "")
    visual_hint = getattr(raw, "visual_hint", None)

    return Step(
        label=label,
        rule=rule,
        formula=formula,
        before=before,
        after=after,
        explanation=explanation,
        visual_hint=visual_hint,
    )


def _dump_yaml(data: Any) -> str:
    """Serialize *data* to YAML using ruamel.yaml if available, else PyYAML."""
    if _HAS_RUELAMEL:
        import io

        stream = io.StringIO()
        _ruamel_yaml.dump(data, stream)
        return stream.getvalue()
    else:
        return _pyyaml.dump(
            data,
            allow_unicode=True,
            sort_keys=False,
            default_flow_style=False,
        )


# ──────────────────────────────────────────────────────────────────────────────
# Public convenience helpers
# ──────────────────────────────────────────────────────────────────────────────
def step(
    label: str,
    rule: str = "",
    formula: Optional[str] = None,
    before: str = "",
    after: str = "",
    explanation: str = "",
    visual_hint: Optional[str] = None,
) -> Step:
    """Quick constructor for Step without using the fluent builder."""
    return Step(
        label=label,
        rule=rule,
        formula=formula,
        before=before,
        after=after,
        explanation=explanation,
        visual_hint=visual_hint,
    )


def ok(
    answer: Any = None,
    steps: Optional[List[Step]] = None,
    unit: Optional[str] = None,
    metadata: Optional[Dict[str, Any]] = None,
    **extra: Any,
) -> SolverResult:
    """Convenience constructor for a successful result."""
    return SolverResult(
        success=True,
        answer=answer,
        steps=steps or [],
        unit=unit,
        metadata=metadata or {},
        **extra,
    )


def fail(
    error: str,
    steps: Optional[List[Step]] = None,
    metadata: Optional[Dict[str, Any]] = None,
    **extra: Any,
) -> SolverResult:
    """Convenience constructor for a failed result."""
    return SolverResult(
        success=False,
        error=error,
        steps=steps or [],
        metadata=metadata or {},
        **extra,
    )


# ──────────────────────────────────────────────────────────────────────────────
# Compatibility shim — lets legacy solvers keep their current return style
# ──────────────────────────────────────────────────────────────────────────────
__all__ = [
    "Step",
    "SolverResult",
    "VerificationStatus",
    "step",
    "ok",
    "fail",
]
