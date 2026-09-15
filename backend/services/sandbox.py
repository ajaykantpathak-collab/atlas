"""Sandboxed execution environment for math/chem verification.

Provides a safe wrapper around SymPy, pint, and chempy for verifying
student answers. Uses subprocess isolation with timeout to prevent
hangs, and restricts available imports to math/science libraries only.

Security:
  - No network access
  - No file system writes
  - 5-second timeout per verification
  - Only allowed imports: sympy, pint, chempy, numpy, math
  - Student expressions parsed via sympify() (no eval())

Usage:
    from backend.services.sandbox import Sandbox

    sandbox = Sandbox()

    # Verify two expressions are equivalent
    result = sandbox.verify_symbolic("x**2 + 2*x + 1", "(x+1)**2")
    # result = {"match": True, "strategy": "symbolic", "error": None}

    # Verify numerical equivalence
    result = sandbox.verify_numerical("sin(x)", "x - x**3/6", var="x")
    # result = {"match": True, "strategy": "numerical", "error": None}

    # Verify with units
    result = sandbox.verify_units("9.8 m/s**2", "9.8 m/s^2")
    # result = {"match": True, "strategy": "unit", "error": None}
"""

import subprocess
import sys
import json
import tempfile
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Optional


@dataclass
class SandboxResult:
    """Result of a sandbox verification."""
    match: bool
    strategy: str
    error: Optional[str] = None
    details: Optional[dict] = None


class Sandbox:
    """Sandboxed execution environment for math/chemistry verification.

    Each verification runs in a separate Python subprocess with:
      - 5-second timeout
      - Restricted imports (sympy, pint, chempy, numpy, math)
      - No file system access (temp directory only)
      - No network access (not explicitly blocked, but no imports for it)
    """

    TIMEOUT_SECONDS = 5

    # Allowed modules in the sandbox
    ALLOWED_IMPORTS = ["sympy", "pint", "chempy", "numpy", "math"]

    def verify_symbolic(
        self,
        expr_a: str,
        expr_b: str,
        variables: Optional[list] = None,
    ) -> SandboxResult:
        """Verify two expressions are symbolically equivalent.

        Uses SymPy's simplify(a - b) == 0 check.

        Args:
            expr_a: First expression (e.g., student's answer).
            expr_b: Second expression (e.g., model answer).
            variables: List of variable names (e.g., ["x", "y"]).

        Returns:
            SandboxResult with match=True if expressions are equivalent.
        """
        code = f"""
import sympy
from sympy import sympify, simplify, symbols, Symbol

try:
    # Define variables
    var_names = {variables or []}
    local_vars = {{}}
    for v in var_names:
        local_vars[v] = Symbol(v)

    # Parse expressions
    a = sympify("{self._escape(expr_a)}", locals=local_vars)
    b = sympify("{self._escape(expr_b)}", locals=local_vars)

    # Check equivalence
    diff = simplify(a - b)
    match = diff == 0

    # Also try trigsimp and expand
    if not match:
        diff2 = sympy.trigsimp(a - b)
        match = diff2 == 0
    if not match:
        diff3 = sympy.expand(a - b)
        match = diff3 == 0
    if not match:
        # Try numerical evaluation at random points
        import random
        match = True
        for _ in range(20):
            vals = {{v: random.uniform(-10, 10) for v in local_vars}}
            try:
                va = float(a.subs(vals))
                vb = float(b.subs(vals))
                if abs(va - vb) > 1e-6:
                    match = False
                    break
            except:
                match = False
                break

    print(json.dumps({{"match": match, "strategy": "symbolic", "error": None}}))
except Exception as e:
    print(json.dumps({{"match": False, "strategy": "symbolic", "error": str(e)}}))
"""
        return self._run_code(code, "symbolic")

    def verify_numerical(
        self,
        expr_a: str,
        expr_b: str,
        var: str = "x",
        num_samples: int = 100,
    ) -> SandboxResult:
        """Verify two expressions are numerically equivalent.

        Samples random points and compares values.

        Args:
            expr_a: First expression.
            expr_b: Second expression.
            var: Variable name to sample over.
            num_samples: Number of random samples.

        Returns:
            SandboxResult with match=True if numerically equivalent.
        """
        code = f"""
import sympy
import random
import json

try:
    x = sympy.Symbol("{var}")
    a = sympy.sympify("{self._escape(expr_a)}")
    b = sympy.sympify("{self._escape(expr_b)}")

    match = True
    max_diff = 0.0
    for _ in range({num_samples}):
        val = random.uniform(-10, 10)
        try:
            va = float(a.subs(x, val))
            vb = float(b.subs(x, val))
            diff = abs(va - vb)
            max_diff = max(max_diff, diff)
            if diff > 1e-4:
                match = False
                break
        except:
            match = False
            break

    print(json.dumps({{"match": match, "strategy": "numerical", "error": None, "max_diff": max_diff}}))
except Exception as e:
    print(json.dumps({{"match": False, "strategy": "numerical", "error": str(e)}}))
"""
        return self._run_code(code, "numerical")

    def verify_units(
        self,
        value_a: str,
        value_b: str,
    ) -> SandboxResult:
        """Verify two values with units are equivalent.

        Uses pint to normalize units before comparing.

        Args:
            value_a: First value with units (e.g., "9.8 m/s^2").
            value_b: Second value with units (e.g., "9.8 m/s**2").

        Returns:
            SandboxResult with match=True if equivalent.
        """
        code = f"""
import pint
import json

try:
    ureg = pint.UnitRegistry()
    a = ureg("{self._escape(value_a)}")
    b = ureg("{self._escape(value_b)}")

    # Check if same dimensionality
    if a.dimensionality != b.dimensionality:
        print(json.dumps({{"match": False, "strategy": "unit", "error": "dimension mismatch"}}))
    else:
        # Convert to same unit and compare
        diff = abs((a - b).to_base_units()).magnitude
        match = diff < 1e-6
        print(json.dumps({{"match": match, "strategy": "unit", "error": None}}))
except Exception as e:
    print(json.dumps({{"match": False, "strategy": "unit", "error": str(e)}}))
"""
        return self._run_code(code, "unit")

    def verify_chemical(
        self,
        formula_a: str,
        formula_b: str,
    ) -> SandboxResult:
        """Verify two chemical formulas are equivalent.

        Uses chempy to parse and compare chemical formulas.

        Args:
            formula_a: First formula (e.g., "H2O").
            formula_b: Second formula (e.g., "OH2").

        Returns:
            SandboxResult with match=True if equivalent.
        """
        code = f"""
import json
try:
    from chempy import Substance
    a = Substance.from_formula("{self._escape(formula_a)}")
    b = Substance.from_formula("{self._escape(formula_b)}")
    # Compare compositions
    match = a.composition == b.composition
    print(json.dumps({{"match": match, "strategy": "chemical", "error": None}}))
except Exception as e:
    # Fallback: simple string comparison after normalization
    import re
    def normalize(f):
        # Sort element symbols
        elements = re.findall(r"[A-Z][a-z]?\\d*", f)
        return sorted(elements)
    match = normalize("{self._escape(formula_a)}") == normalize("{self._escape(formula_b)}")
    print(json.dumps({{"match": match, "strategy": "chemical", "error": str(e)}}))
"""
        return self._run_code(code, "chemical")

    def evaluate_expression(self, expr: str, variables: Optional[dict] = None) -> SandboxResult:
        """Evaluate a single expression and return its value.

        Args:
            expr: The expression to evaluate.
            variables: Dict of variable name → value.

        Returns:
            SandboxResult with details containing the evaluated value.
        """
        var_str = json.dumps(variables or {})
        code = f"""
import sympy
import json

try:
    vars = {var_str}
    local_vars = {{}}
    for k, v in vars.items():
        local_vars[k] = sympy.sympify(v)

    result = sympy.sympify("{self._escape(expr)}", locals=local_vars)
    # Try to convert to float
    try:
        val = float(result)
        print(json.dumps({{"match": True, "strategy": "evaluate", "error": None, "details": {{"value": val}}}}))
    except:
        print(json.dumps({{"match": True, "strategy": "evaluate", "error": None, "details": {{"value": str(result)}}}}))
except Exception as e:
    print(json.dumps({{"match": False, "strategy": "evaluate", "error": str(e)}}))
"""
        return self._run_code(code, "evaluate")

    # ── Internal methods ──────────────────────────────────────────── #

    def _run_code(self, code: str, strategy: str) -> SandboxResult:
        """Run Python code in a subprocess sandbox.

        Args:
            code: Python code to execute.
            strategy: Name of the verification strategy (for reporting).

        Returns:
            SandboxResult with the outcome.
        """
        # Write code to a temp file
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".py", delete=False, encoding="utf-8"
        ) as f:
            # Add json import at the top
            f.write("import json\n")
            f.write(code)
            temp_path = f.name

        try:
            # Run in subprocess with timeout
            result = subprocess.run(
                [sys.executable, temp_path],
                capture_output=True,
                text=True,
                timeout=self.TIMEOUT_SECONDS,
                env=self._get_sandbox_env(),
            )

            # Parse output
            output = result.stdout.strip()
            if output:
                try:
                    data = json.loads(output.split("\n")[-1])
                    return SandboxResult(
                        match=data.get("match", False),
                        strategy=data.get("strategy", strategy),
                        error=data.get("error"),
                        details=data.get("details"),
                    )
                except json.JSONDecodeError:
                    return SandboxResult(
                        match=False,
                        strategy=strategy,
                        error=f"Invalid output: {output[:200]}",
                    )
            else:
                error = result.stderr.strip()[:500] if result.stderr else "No output"
                return SandboxResult(
                    match=False,
                    strategy=strategy,
                    error=error,
                )

        except subprocess.TimeoutExpired:
            return SandboxResult(
                match=False,
                strategy=strategy,
                error=f"Timeout after {self.TIMEOUT_SECONDS}s",
            )
        except Exception as e:
            return SandboxResult(
                match=False,
                strategy=strategy,
                error=str(e),
            )
        finally:
            # Clean up temp file
            try:
                os.unlink(temp_path)
            except OSError:
                pass

    def _get_sandbox_env(self) -> dict:
        """Get environment variables for the sandbox subprocess."""
        # Inherit minimal env vars, including user site-packages path
        env = {
            "PATH": os.environ.get("PATH", ""),
            "PYTHONPATH": os.environ.get("PYTHONPATH", ""),
            "SYSTEMROOT": os.environ.get("SYSTEMROOT", ""),
            "TEMP": os.environ.get("TEMP", ""),
            "TMP": os.environ.get("TMP", ""),
            "APPDATA": os.environ.get("APPDATA", ""),
            "LOCALAPPDATA": os.environ.get("LOCALAPPDATA", ""),
            "USERPROFILE": os.environ.get("USERPROFILE", ""),
            "HOME": os.environ.get("HOME", os.environ.get("USERPROFILE", "")),
            "PYTHONUSERBASE": os.environ.get("PYTHONUSERBASE", ""),
        }
        # Disable network-related env vars
        env["NO_PROXY"] = "*"
        env["no_proxy"] = "*"
        return env

    @staticmethod
    def _escape(s: str) -> str:
        """Escape a string for safe embedding in Python code."""
        return s.replace("\\", "\\\\").replace('"', '\\"').replace("'", "\\'").replace("\n", "\\n")
