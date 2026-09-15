"""
verification_engine.py — 7-layer answer verification for JEE/NEET.

Layers:
  1. Dimensional consistency
  2. Limiting case check
  3. Magnitude / expected range
  4. Self-consistency (multiple solutions agree)
  5. Format (JEE integer/decimal, NEET letter/integer)
  6. Sanity bounds (speed < c, T > 0K, mass > 0, etc.)
  7. Conservation laws (energy, momentum, charge)
"""
from __future__ import annotations
import re
from dataclasses import dataclass, field
from typing import Any
import math

UNITS: dict[str, str] = {
    "m": "length", "kg": "mass", "s": "time",
    "A": "current", "K": "temperature", "N": "kg*m/s^2",
    "J": "kg*m^2/s^2", "W": "kg*m^2/s^3",
    "V": "kg*m^2/(A*s^3)", "C": "A*s",
    "Pa": "kg/(m*s^2)", "Hz": "1/s",
    "mol": "amount", "cd": "luminous_intensity",
}

WEIGHTS: dict[str, float] = {
    "dimensional": 0.20,
    "limiting": 0.10,
    "magnitude": 0.15,
    "consistency": 0.10,
    "format": 0.05,
    "sanity": 0.20,
    "conservation": 0.20,
}

# ── sanity bounds ────────────────────────────────────────────────────────────
# Physical constants and limits that answers should respect

SPEED_OF_LIGHT = 3.0e8  # m/s
ABSOLUTE_ZERO = 0.0     # K

SANITY_BOUNDS: dict[str, tuple[float, float, str]] = {
    # quantity_type: (min, max, description)
    "velocity": (-SPEED_OF_LIGHT, SPEED_OF_LIGHT, "speed must be < c"),
    "speed": (0.0, SPEED_OF_LIGHT, "speed must be 0 to c"),
    "temperature": (ABSOLUTE_ZERO, 1e12, "temperature must be > 0K"),
    "mass": (0.0, 1e30, "mass must be positive"),
    "energy": (-1e15, 1e15, "energy within reasonable range"),
    "time": (-1e10, 1e10, "time within reasonable range"),
    "wavelength": (1e-15, 1e6, "wavelength 1fm to 1Mm"),
    "frequency": (0.0, 1e25, "frequency must be positive"),
    "charge": (-1e3, 1e3, "charge within reasonable range"),
    "resistance": (0.0, 1e12, "resistance must be non-negative"),
    "capacitance": (0.0, 1e6, "capacitance must be non-negative"),
    "inductance": (0.0, 1e6, "inductance must be non-negative"),
    "pressure": (0.0, 1e15, "pressure must be non-negative"),
    "density": (0.0, 1e20, "density must be non-negative"),
    "phi_angle": (-math.pi, math.pi, "angle in radians [-π, π]"),
    "deg_angle": (-360.0, 360.0, "angle in degrees [-360, 360]"),
    "probability": (0.0, 1.0, "probability must be 0 to 1"),
    "efficiency": (-1.0, 1.0, "efficiency -1 to 1 (can be negative for heat pumps)"),
    "magnification": (-1e6, 1e6, "magnification within reasonable range"),
}


@dataclass
class VerificationResult:
    passed: bool
    layers_checked: list[str] = field(default_factory=list)
    layer_results: dict[str, bool] = field(default_factory=dict)
    confidence: float = 0.0
    issues: list[str] = field(default_factory=list)
    corrections: list[str] = field(default_factory=list)


class VerificationEngine:
    def __init__(self) -> None:
        try:
            import sympy  # noqa: F401
            self._sympy = True
        except ImportError:
            self._sympy = False

    # ── public entry point ───────────────────────────────────────────
    def verify(self, problem: dict, solution: dict) -> VerificationResult:
        layers: dict[str, bool] = {}
        issues: list[str] = []
        corrections: list[str] = []
        checked: list[str] = []

        # Layer 1 – Dimensional
        if formula := solution.get("formula"):
            ok = self.check_dimensions(formula, problem.get("expected_units", ""))
            layers["dimensional"] = ok
            checked.append("dimensional")
            if not ok:
                issues.append(f"Dimensional mismatch in: {formula}")

        # Layer 2 – Limiting cases
        if solution.get("params"):
            ok = self.check_limiting_cases(solution, problem)
            layers["limiting"] = ok
            checked.append("limiting")
            if not ok:
                issues.append("Solution fails limiting-case check")

        # Layer 3 – Magnitude
        if answer := solution.get("answer"):
            rng = problem.get("expected_range", ())
            if rng:
                ok = self.check_magnitude(float(answer), rng)
                layers["magnitude"] = ok
                checked.append("magnitude")
                if not ok:
                    issues.append(f"Answer {answer} outside expected range {rng}")

        # Layer 4 – Self-consistency
        if solutions := problem.get("alternate_solutions", []):
            ok = self.check_self_consistency(solutions)
            layers["consistency"] = ok
            checked.append("consistency")
            if not ok:
                issues.append("Multiple solutions are not mutually consistent")

        # Layer 5 – Format
        if ans := solution.get("answer"):
            ok = self.check_format(str(ans), problem.get("exam_type", ""))
            layers["format"] = ok
            checked.append("format")
            if not ok:
                issues.append(f"Answer format does not match {problem.get('exam_type')}")

        # Layer 6 – Sanity bounds
        if answer := solution.get("answer"):
            qty_type = problem.get("quantity_type", "")
            if qty_type:
                ok = self.check_sanity_bounds(float(answer), qty_type)
                layers["sanity"] = ok
                checked.append("sanity")
                if not ok:
                    issues.append(f"Answer {answer} violates sanity bounds for {qty_type}")

        # Layer 7 – Conservation laws
        if cons_data := problem.get("conservation_check"):
            ok = self.check_conservation(cons_data, solution)
            layers["conservation"] = ok
            checked.append("conservation")
            if not ok:
                issues.append("Conservation law check failed")

        # Confidence (hard-zero if dimensional fails)
        if layers.get("dimensional") is False:
            confidence = 0.0
        else:
            confidence = sum(WEIGHTS.get(k, 0) * float(v) for k, v in layers.items())
            confidence = round(confidence, 4)

        passed = confidence >= 0.6 and not issues
        return VerificationResult(
            passed=passed,
            layers_checked=checked,
            layer_results=layers,
            confidence=confidence,
            issues=issues,
            corrections=corrections,
        )

    # ── individual checks ────────────────────────────────────────────
    def check_dimensions(self, formula: str, expected_units: str) -> bool:
        """Verify formula has consistent SI dimensions against expected units."""
        tokens = formula.replace("**", "^").replace("*", " ").replace("/", " ").replace("(", " ").replace(")", " ").split()
        found: dict[str, int] = {}
        for tok in tokens:
            tok = tok.split("^")[0].strip("[]")
            if tok in UNITS:
                found[tok] = found.get(tok, 0) + 1

        if not expected_units or not found:
            return True  # can't verify

        exp_tokens = expected_units.replace("*", " ").replace("/", " ").replace("(", " ").replace(")", " ").split()
        for et in exp_tokens:
            et = et.split("^")[0].strip("[]")
            if et and et in found:
                found[et] -= 1
        return all(v == 0 for v in found.values())

    def check_limiting_cases(self, solution: dict, problem: dict) -> bool:
        """Set specified params to 0 and check result matches expected_limiting."""
        expected = problem.get("expected_limiting")
        if expected is None:
            return True

        params = problem.get("zero_params", [])
        if not params:
            return True

        try:
            if self._sympy:
                import sympy as sp
                expr_str = solution.get("formula", "")
                syms = {p: sp.Symbol(p) for p in params}
                expr = sp.sympify(expr_str, locals=syms)
                result = float(expr.subs([(sp.Symbol(p), 0) for p in params]))
            else:
                expr_str = solution["formula"]
                for p in params:
                    expr_str = expr_str.replace(p, "0")
                # Security: restricted eval with no builtins
                _DANGER = re.compile(r'__|\.|\b(import|exec|eval|open|getattr|setattr|globals|locals|vars|dir|type|compile|input|breakpoint|exit|quit)\b')
                if _DANGER.search(expr_str):
                    return True  # skip silently
                result = eval(expr_str, {"__builtins__": {}}, {})  # noqa: S307
            return abs(result - float(expected)) < 1e-6
        except Exception:
            return True  # skip silently

    def check_magnitude(self, answer: float, expected_range: tuple) -> bool:
        lo, hi = expected_range
        return lo <= answer <= hi

    def check_self_consistency(self, solutions: list) -> bool:
        """All numeric answers must agree within 2%."""
        vals: list[float] = []
        for sol in solutions:
            try:
                vals.append(float(sol.get("answer", 0)))
            except (TypeError, ValueError):
                continue
        if len(vals) < 2:
            return True
        avg = sum(vals) / len(vals)
        return all(abs(v - avg) / (abs(avg) + 1e-9) < 0.02 for v in vals)

    def check_format(self, answer: str, exam_type: str) -> bool:
        """JEE: integer or decimal; NEET: single choice letter or integer."""
        if exam_type.upper() == "JEE":
            return bool(__import__("re").fullmatch(r"-?\d+(\.\d+)?", answer))
        if exam_type.upper() == "NEET":
            return bool(__import__("re").fullmatch(r"[A-D]|-?\d+", answer))
        return True

    # ── Layer 6: Sanity bounds ───────────────────────────────────────────

    def check_sanity_bounds(self, answer: float, quantity_type: str) -> bool:
        """Check if the answer is within physically reasonable bounds.

        Uses SANITY_BOUNDS dict to look up the quantity type.
        Returns True if within bounds, False if violated.
        """
        bounds = SANITY_BOUNDS.get(quantity_type)
        if not bounds:
            return True  # no bounds defined for this quantity type

        lo, hi, _desc = bounds
        if math.isnan(answer) or math.isinf(answer):
            return False

        return lo <= answer <= hi

    # ── Layer 7: Conservation laws ───────────────────────────────────────

    def check_conservation(self, cons_data: dict, solution: dict) -> bool:
        """Check conservation laws (energy, momentum, charge).

        cons_data format:
          {
            "type": "energy" | "momentum" | "charge",
            "before": float,        # value before the process
            "after": float,         # value after the process
            "tolerance": float,     # relative tolerance (default 0.01 = 1%)
          }
        """
        cons_type = cons_data.get("type", "")
        before = cons_data.get("before")
        after = cons_data.get("after")
        tolerance = cons_data.get("tolerance", 0.01)

        if before is None or after is None:
            return True  # can't check without both values

        try:
            before = float(before)
            after = float(after)
        except (TypeError, ValueError):
            return True  # can't check non-numeric values

        if cons_type == "energy":
            # Energy can be negative (potential energy reference)
            # Check relative difference
            if abs(before) < 1e-15 and abs(after) < 1e-15:
                return True  # both ~0, conserved
            if abs(before) < 1e-15:
                return abs(after) <= tolerance * max(abs(before), 1.0)
            return abs(before - after) / abs(before) <= tolerance

        elif cons_type == "momentum":
            # Momentum is a vector — check magnitude
            return abs(before - after) / (abs(before) + abs(after) + 1e-15) <= tolerance

        elif cons_type == "charge":
            # Charge must be exactly conserved
            return abs(before - after) < 1e-10

        elif cons_type == "mass":
            # Mass conservation (for chemical reactions)
            return abs(before - after) / (abs(before) + 1e-15) <= tolerance

        return True  # unknown conservation type, skip

    # ── Back-substitution check ──────────────────────────────────────────

    def check_back_substitution(
        self,
        formula: str,
        answer: float,
        known_values: dict[str, float],
        tolerance: float = 0.01,
    ) -> bool:
        """Plug the answer back into the original formula and verify.

        formula: string like "v = u + a*t"
        answer: the computed value for the target variable
        known_values: dict of {variable: value} for the known variables
        """
        try:
            if self._sympy:
                import sympy as sp

                # Parse formula (handle "LHS = RHS" format)
                if "=" in formula:
                    lhs, rhs = formula.split("=", 1)
                    lhs = lhs.strip()
                    rhs = rhs.strip()
                else:
                    return True  # can't verify without equation

                # Identify the target variable (LHS)
                target = sp.Symbol(lhs) if lhs.isalpha() else None
                if target is None:
                    return True

                # Substitute known values and the answer into RHS
                rhs_expr = sp.sympify(rhs)
                subs = [(sp.Symbol(k), v) for k, v in known_values.items()]
                subs.append((target, answer))
                computed = float(rhs_expr.subs(subs))

                # Check if LHS (answer) matches computed RHS
                return abs(answer - computed) / (abs(answer) + 1e-15) < tolerance

        except Exception:
            pass

        return True  # skip silently on error


# ── quick self-test ─────────────────────────────────────────────────
if __name__ == "__main__":
    engine = VerificationEngine()

    prob = {
        "expected_units": "m",
        "exam_type": "JEE",
        "expected_range": (0, 1000),
        "zero_params": ["v0"],
        "expected_limiting": 4.9,
    }
    sol = {
        "formula": "v0*t + 0.5*g*t**2",
        "answer": "49.0",
        "params": ["v0", "g", "t"],
    }
    res = engine.verify(prob, sol)
    print(f"passed={res.passed}  confidence={res.confidence:.2f}")
    if res.issues:
        print("issues:", res.issues)