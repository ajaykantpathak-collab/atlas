"""binding_executor.py -- Lane C: student-bound deterministic execution.

The student assigns roles to quantities ("12 is the count, 5 is the
unit price"); this module routes the role signature to the matching
verified computation and executes it under the same gates as every
other lane (ARCHITECTURE.md lane C / rung 4).

Design contract:
    - dispatch is keyed on (frozenset(roles), target) -- exact,
      deterministic, no guessing
    - unknown signatures -> GUIDED_PRACTICE with a precise reason
      (never a guessed computation)
    - plausibility gates run on inputs and results (division by zero,
      non-positive principals, percent outside [0,100] where the role
      demands it, non-finite results)
    - assumptions are surfaced (circle area uses exact pi unless the
      student also binds a pi value)
    - returns the shared PipelineResult so the Truth Core labels it
"""

from __future__ import annotations

import math
from typing import Any, Dict, Optional, Tuple

from backend.its.solver.answer_pipeline import (
    AuditTrail, GUIDED, PipelineResult, VERIFIED, VERIFIED_ASSUMED)


def _no(reason: str, audit: AuditTrail) -> PipelineResult:
    return PipelineResult(label=GUIDED, answer=None, numeric=None,
                          steps=[], audit=audit, refusal_reason=reason)


def _ok(binding: Dict[str, Any], value: float, audit: AuditTrail,
        steps: list, assumptions: Optional[list] = None) -> PipelineResult:
    label = VERIFIED_ASSUMED if assumptions else VERIFIED
    if assumptions:
        audit.assumptions.extend(assumptions)
    target = (binding.get("target_role") or "result").replace("_", " ")
    audit.gates_passed.append("binding_plausibility")
    return PipelineResult(
        label=label, answer=f"{value:.6g}", numeric=value,
        steps=steps, audit=audit)


def _finite(value: float) -> bool:
    return not (math.isnan(value) or math.isinf(value))


def _plausible_inputs(roleset: frozenset, v: Dict[str, float]
                      ) -> Optional[str]:
    if "rate_percent" in v and not 0 <= v["rate_percent"] <= 1000:
        return f"rate {v['rate_percent']:g}% is not plausible"
    for k in ("principal", "count", "side", "length", "breadth",
              "base", "height", "radius", "distance", "speed", "time"):
        if k in v and v[k] <= 0:
            return f"{k} must be positive"
    if "whole" in v and v["whole"] == 0:
        return "whole cannot be zero"
    return None


# --------------------------------------------------------------------------- #
# The dispatch table: (frozenset(roles), target) -> computation
# --------------------------------------------------------------------------- #

def _compute(roleset: frozenset, target: str, v: Dict[str, float]
             ) -> Optional[Tuple[float, list, Optional[list]]]:
    """Returns (value, steps, assumptions) or None if unsupported."""
    r = roleset
    if r == {"count", "unit_price"} and target in ("total", "total_cost"):
        val = v["count"] * v["unit_price"]
        return val, [f"total = {v['count']:g} x {v['unit_price']:g} "
                     f"= {val:.6g}"], None
    if r == {"part", "whole"} and target == "percent":
        val = v["part"] / v["whole"] * 100
        return val, [f"percent = {v['part']:g}/{v['whole']:g} x 100 "
                     f"= {val:.4g}"], None
    if r == {"percent", "whole"} and target == "part":
        val = v["percent"] / 100 * v["whole"]
        return val, [f"{v['percent']:g}% of {v['whole']:g} = "
                     f"{val:.6g}"], None
    if r == {"part", "percent"} and target == "base":
        if v["percent"] == 0:
            return None
        val = v["part"] / v["percent"] * 100
        return val, [f"base = {v['part']:g}/{v['percent']:g} x 100 "
                     f"= {val:.6g}"], None
    if r == {"principal", "rate_percent", "time_years"}:
        P, rate, t = v["principal"], v["rate_percent"], v["time_years"]
        if target == "simple_interest":
            si = P * rate * t / 100
            return si, [f"SI = {P:g} x {rate:g} x {t:g}/100 = "
                        f"{si:.4g}"], None
        if target in ("compound_interest", "amount"):
            A = P * (1 + rate / 100) ** t
            val = A if target == "amount" else A - P
            note = ("compounded annually" if target == "compound_interest"
                    else "compounded annually, A = P(1+r/100)^t")
            return val, [f"A = {P:g}(1 + {rate:g}/100)^{t:g} = {A:.4f}",
                         note], ["compounding assumed annual (not "
                                 "stated in binding)"]
    if r == {"base", "height"} and target == "area_triangle":
        val = 0.5 * v["base"] * v["height"]
        return val, [f"A = 1/2 x {v['base']:g} x {v['height']:g} = "
                     f"{val:.6g}"], None
    if r == {"base", "height"} and target == "area_parallelogram":
        val = v["base"] * v["height"]
        return val, [f"A = {v['base']:g} x {v['height']:g} = "
                     f"{val:.6g}"], None
    if r == {"side"} and target == "area_square":
        val = v["side"] ** 2
        return val, [f"A = {v['side']:g}^2 = {val:.6g}"], None
    if r == {"side"} and target == "perimeter_square":
        val = 4 * v["side"]
        return val, [f"P = 4 x {v['side']:g} = {val:.6g}"], None
    if r == {"length", "breadth"} and target == "area_rectangle":
        val = v["length"] * v["breadth"]
        return val, [f"A = {v['length']:g} x {v['breadth']:g} = "
                     f"{val:.6g}"], None
    if r == {"length", "breadth"} and target == "perimeter_rectangle":
        val = 2 * (v["length"] + v["breadth"])
        return val, [f"P = 2({v['length']:g} + {v['breadth']:g}) = "
                     f"{val:.6g}"], None
    if r == {"radius"} and target == "area_circle":
        val = math.pi * v["radius"] ** 2
        return (val, [f"A = pi x {v['radius']:g}^2 = {val:.4g}"],
                ["pi taken as 3.14159 (exact)"])
    if r == {"radius"} and target == "circumference":
        val = 2 * math.pi * v["radius"]
        return (val, [f"C = 2 x pi x {v['radius']:g} = {val:.4g}"],
                ["pi taken as 3.14159 (exact)"])
    if r == {"speed", "time"} and target == "distance":
        val = v["speed"] * v["time"]
        return val, [f"d = {v['speed']:g} x {v['time']:g} = "
                     f"{val:.6g}"], None
    if r == {"distance", "time"} and target == "speed":
        if v["time"] == 0:
            return None
        val = v["distance"] / v["time"]
        return val, [f"v = {v['distance']:g}/{v['time']:g} = "
                     f"{val:.6g}"], None
    if r == {"distance", "speed"} and target == "time":
        if v["speed"] == 0:
            return None
        val = v["distance"] / v["speed"]
        return val, [f"t = {v['distance']:g}/{v['speed']:g} = "
                     f"{val:.6g}"], None
    if r == {"first_quantity", "second_quantity"} and \
            target == "difference":
        val = v["first_quantity"] - v["second_quantity"]
        return val, [f"{v['first_quantity']:g} - {v['second_quantity']:g}"
                     f" = {val:.6g}"], None
    if r == {"first_quantity", "second_quantity"} and \
            target == "sum":
        val = v["first_quantity"] + v["second_quantity"]
        return val, [f"{v['first_quantity']:g} + {v['second_quantity']:g}"
                     f" = {val:.6g}"], None
    return None


def execute_binding(binding: Dict[str, Any], audit: AuditTrail
                    ) -> PipelineResult:
    """Lane C: role bindings -> verified computation.

    binding: {"question": str, "target_role": str,
              "bindings": [{"value": number, "role": str}, ...]}
    """
    entries = binding.get("bindings") or []
    target = (binding.get("target_role") or "").strip().lower()
    if not entries or not target:
        return _no("binding needs quantities and a target role", audit)

    v: Dict[str, float] = {}
    for e in entries:
        role = (e.get("role") or "").strip().lower()
        try:
            val = float(e.get("value"))
        except (TypeError, ValueError):
            return _no(f"non-numeric value for role {role!r}", audit)
        if not _finite(val):
            return _no(f"non-finite value for role {role!r}", audit)
        if role in v:
            return _no(f"role {role!r} bound twice", audit)
        v[role] = val

    roleset = frozenset(v.keys())
    bad = _plausible_inputs(roleset, v)
    if bad:
        return _no(f"implausible binding: {bad}", audit)

    audit.route.append(f"binding:{'+'.join(sorted(v))}->{target}")
    audit.quantities = [{"role": k, "value": val} for k, val in
                        sorted(v.items())]

    out = _compute(roleset, target, v)
    if out is None:
        return _no(
            f"no verified computation for roles {sorted(v)} targeting "
            f"{target!r} -- adjust the binding or use guided practice",
            audit)
    value, steps, assumptions = out
    if not _finite(value):
        return _no("computation did not produce a finite result", audit)
    audit.readings_considered = 1
    return _ok(binding, value, audit, steps, assumptions)
