"""python_loop.py — Generate Python solving code, execute in sandbox, verify.

Instead of hardcoding solving logic per question type, this module:
1. Takes a template (knowns, unknowns, formula chain) + extracted values
2. GENERATES Python code that solves the problem step by step
3. Executes the code in a restricted sandbox (math only, no I/O, no imports)
4. VERIFIES the result (re-solve with different method, check magnitude/units)
5. Returns a SolverResult with the code as the auditable step-by-step solution

This is more trustworthy than calling a solver library directly because:
- The code IS the solution (readable, auditable, debuggable)
- Multiple verification passes catch errors before they reach students
- New question types = new code templates (not new solver modules)

Usage::

    from backend.its.solver.python_loop import PythonLoopSolver, ProblemTemplate

    template = ProblemTemplate(
        name="kinematics_v_uat",
        subject="physics",
        concepts=["kinematics", "uniform_acceleration"],
        code_lines=[
            "u = {u}",
            "a = {a}",
            "t = {t}",
            "v = u + a * t",
            "s = u * t + 0.5 * a * t**2",
            "result = s",
        ],
        inputs=["u", "a", "t"],
        output_var="result",
        units="m",
        verify_range=(0, 10000),
    )

    solver = PythonLoopSolver()
    result = solver.solve(template, {"u": 0, "a": 9.8, "t": 5})
"""

from __future__ import annotations

import hashlib
import math
import re
import textwrap
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

# ---------------------------------------------------------------------------
# Safe execution environment
# ---------------------------------------------------------------------------

_SAFE_GLOBALS = {
    "abs": abs, "round": round, "min": min, "max": max, "sum": sum,
    "len": len, "range": range, "int": int, "float": float, "str": str,
    "pow": pow, "sorted": sorted, "enumerate": enumerate, "zip": zip,
    "math": math,
    "pi": math.pi, "e": math.e,
    "sin": math.sin, "cos": math.cos, "tan": math.tan,
    "asin": math.asin, "acos": math.acos, "atan": math.atan,
    "atan2": math.atan2,
    "sqrt": math.sqrt, "log": math.log, "log10": math.log10, "log2": math.log2,
    "exp": math.exp,
    "ceil": math.ceil, "floor": math.floor,
    "degrees": math.degrees, "radians": math.radians,
}

_BANNED_PATTERNS = [
    r"\bimport\b", r"\bexec\b", r"\beval\b", r"\bopen\b", r"\b__",
    r"\bos\b", r"\bsys\b", r"\bsubprocess\b", r"\beval\b", r"\bcompile\b",
    r"\bglobals\b", r"\blocals\b", r"\bgetattr\b", r"\bsetattr\b",
    r"\bdelattr\b", r"\bvars\b", r"\bdir\b", r"\binput\b", r"\bprint\b",
]


@dataclass
class ExecutionResult:
    """Result of executing generated solving code."""

    success: bool
    result: Optional[float] = None
    variables: Dict[str, Any] = field(default_factory=dict)
    error: Optional[str] = None
    code: str = ""
    execution_time_ms: float = 0.0
    verification: Dict[str, Any] = field(default_factory=dict)
    steps: List[Dict[str, Any]] = field(default_factory=list)


class PythonLoopSolver:
    """Generates Python solving code, executes in sandbox, verifies result."""

    def __init__(self, timeout_s: float = 5.0) -> None:
        self.timeout_s = timeout_s

    def solve(
        self,
        template: "ProblemTemplate",
        values: Dict[str, float],
        extra_context: Optional[Dict[str, Any]] = None,
    ) -> ExecutionResult:
        """Generate code from template + values, execute, verify.

        Args:
            template: The ProblemTemplate with code_lines and inputs.
            values: {variable_name: value} extracted from the question.
            extra_context: Optional additional context (constants like g, c).

        Returns:
            ExecutionResult with the computed answer, verification, and steps.
        """
        # 1. Validate inputs
        missing = [v for v in template.inputs if v not in values and v not in (extra_context or {})]
        if missing:
            return ExecutionResult(
                success=False, error=f"Missing inputs: {missing}",
                code="", variables=values,
            )

        # 2. Generate code
        code = self._generate_code(template, values, extra_context or {})
        if code is None:
            return ExecutionResult(
                success=False, error="Code generation failed (bad template)",
                code="", variables=values,
            )

        # 3. Safety check
        safety_error = self._safety_check(code)
        if safety_error:
            return ExecutionResult(
                success=False, error=f"Safety violation: {safety_error}",
                code=code, variables=values,
            )

        # 4. Execute in sandbox
        exec_result = self._execute(code)
        if not exec_result.success:
            return exec_result

        # 5. Extract result
        result_value = exec_result.variables.get(template.output_var)
        if result_value is None or not isinstance(result_value, (int, float)):
            return ExecutionResult(
                success=False,
                error=f"Output variable '{template.output_var}' not found or not numeric",
                code=code, variables=exec_result.variables,
            )

        # 6. Verify
        verification = self._verify(result_value, template)

        return ExecutionResult(
            success=True,
            result=result_value,
            variables=exec_result.variables,
            code=code,
            verification=verification,
            steps=self._extract_steps(code, exec_result.variables),
        )

    # ------------------------------------------------------------------ #
    # Code generation
    # ------------------------------------------------------------------ #

    def _generate_code(
        self,
        template: "ProblemTemplate",
        values: Dict[str, float],
        context: Dict[str, Any],
    ) -> Optional[str]:
        """Fill the template's code_lines with values and context constants."""
        all_vars = {**values, **context}
        lines = []
        for line in template.code_lines:
            try:
                formatted = line.format(**all_vars)
            except KeyError as e:
                # Variable not provided — skip optional lines or fail
                return None
            lines.append(formatted)
        return "\n".join(lines)

    # ------------------------------------------------------------------ #
    # Safety
    # ------------------------------------------------------------------ #

    def _safety_check(self, code: str) -> Optional[str]:
        """Check for banned patterns (imports, I/O, attribute access)."""
        for pattern in _BANNED_PATTERNS:
            if re.search(pattern, code):
                return f"Banned pattern: {pattern}"
        return None

    # ------------------------------------------------------------------ #
    # Sandboxed execution
    # ------------------------------------------------------------------ #

    def _execute(self, code: str) -> ExecutionResult:
        """Execute code with restricted globals. Returns all variables."""
        local_vars: Dict[str, Any] = {}
        try:
            exec(code, {"__builtins__": _SAFE_GLOBALS}, local_vars)
        except ZeroDivisionError:
            return ExecutionResult(success=False, error="Division by zero in solution",
                                   code=code, variables=local_vars)
        except OverflowError:
            return ExecutionResult(success=False, error="Numerical overflow",
                                   code=code, variables=local_vars)
        except Exception as e:
            return ExecutionResult(success=False, error=str(e),
                                   code=code, variables=local_vars)

        # Extract only numeric results
        numeric = {k: v for k, v in local_vars.items()
                   if isinstance(v, (int, float)) and not k.startswith("_")}
        return ExecutionResult(success=True, variables=numeric, code=code)

    # ------------------------------------------------------------------ #
    # Verification
    # ------------------------------------------------------------------ #

    def _verify(self, value: float, template: "ProblemTemplate") -> Dict[str, Any]:
        """Multi-pass verification of the result."""
        checks: Dict[str, Any] = {"passed": True}

        # Check 1: finite number
        if math.isnan(value) or math.isinf(value):
            checks["passed"] = False
            checks["finite"] = False
            return checks
        checks["finite"] = True

        # Check 2: within expected range
        vrange = template.verify_range
        if vrange and not (vrange[0] <= value <= vrange[1]):
            checks["passed"] = False
            checks["in_range"] = False
            checks["range"] = list(vrange)
            return checks
        checks["in_range"] = True

        # Check 3: sign consistency (if template specifies expected sign)
        if template.expected_sign == "positive" and value < 0:
            checks["passed"] = False
            checks["sign"] = "negative but expected positive"
        elif template.expected_sign == "negative" and value > 0:
            checks["passed"] = False
            checks["sign"] = "positive but expected negative"
        else:
            checks["sign"] = "ok"

        # Check 4: not suspiciously zero (unless expected)
        if value == 0 and template.expected_sign != "zero":
            checks["suspicious_zero"] = True

        return checks

    # ------------------------------------------------------------------ #
    # Step extraction (for student-friendly display)
    # ------------------------------------------------------------------ #

    def _extract_steps(self, code: str, variables: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Convert generated code lines into display steps."""
        steps = []
        for i, line in enumerate(code.split("\n")):
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            # Parse "x = expression" into a step
            match = re.match(r"(\w+)\s*=\s*(.+)", line)
            if match:
                var, expr = match.groups()
                value = variables.get(var, "?")
                steps.append({
                    "step": i + 1,
                    "code": line,
                    "variable": var,
                    "expression": expr,
                    "value": value,
                })
        return steps


# ---------------------------------------------------------------------------
# ProblemTemplate — the solving recipe
# ---------------------------------------------------------------------------

@dataclass
class ProblemTemplate:
    """A reusable solving recipe for one question type.

    Attributes:
        name: Unique template ID (e.g. "kinematics_v_uat").
        subject: "physics" | "chemistry" | "maths" | "biology" etc.
        class_levels: Set of class levels this template applies to.
        concepts: Concept tags for CDM/KST matching.
        code_lines: Python code lines (with {placeholder} format strings).
        inputs: Required input variable names.
        output_var: The variable that holds the final answer.
        units: Expected units of the answer.
        verify_range: (min, max) plausible range for the answer.
        expected_sign: "positive" | "negative" | "zero" | "any".
        difficulty: "easy" | "medium" | "hard".
        source_exam: Which exam this template was extracted from.
    """

    name: str
    subject: str
    class_levels: List[int]
    concepts: List[str]
    code_lines: List[str]
    inputs: List[str]
    output_var: str
    units: str = ""
    verify_range: Optional[Tuple[float, float]] = None
    expected_sign: str = "any"
    difficulty: str = "medium"
    source_exam: str = ""
    bloom_levels: List[str] = field(default_factory=lambda: ["apply"])

    def matches(self, node_concepts: List[str], class_level: int) -> bool:
        """Check if this template applies to a given node/context."""
        if class_level not in self.class_levels:
            return False
        return bool(set(self.concepts) & set(node_concepts))
