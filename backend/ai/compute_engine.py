"""Computational solver for math and physics questions.

Handles questions that are NOT in the enrichment database but can be
solved computationally:
  - Algebra: "solve 2x + 5 = 15", "factor x^2 - 9"
  - Calculus: "differentiate x^2 + 3x", "integrate 2x dx"
  - Arithmetic: "what is 15% of 200", "calculate 25 * 4 + 10"
  - Equations: "solve x^2 - 5x + 6 = 0"
  - Physics formulas: "calculate force if mass=10 and acceleration=5"
  - Unit conversions: "convert 5 km to meters"

Uses SymPy for symbolic math (deterministic, not an LLM).
"""

import re
import sympy
from sympy import sympify, solve, Symbol, diff, integrate, simplify, factor, expand, Rational, sqrt, pi, E
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
from dataclasses import dataclass, field
from typing import Optional

# Import comprehensive solvers (physics, chemistry, math templates)
from backend.ai.physics_solvers import PHYSICS_SOLVERS
from backend.ai.chemistry_solvers import CHEMISTRY_SOLVERS
from backend.ai.math_solvers import MATH_SOLVERS
# Import shared types and helpers (avoids circular imports)
from backend.ai.compute_types import ComputeResult, _format_math, _clean_num, _safe_parse


# --------------------------------------------------------------------------- #
# Parser helpers
# --------------------------------------------------------------------------- #

_TRANSFORMS = standard_transformations + (implicit_multiplication_application,)


def _extract_equation(text: str) -> Optional[tuple]:
    """Extract an equation from text like 'solve 2x + 5 = 15'.

    Returns (lhs_string, rhs_string) or None.
    """
    # Pattern: "solve <expr> = <expr>" — greedy to capture full expressions
    patterns = [
        r'solve\s+(.+?)\s*=\s*(.+)$',
        r'(.+?)\s*=\s*(.+)$',
        r'find\s+x\s+(?:if|when|where)\s+(.+?)\s*=\s*(.+)$',
    ]
    for p in patterns:
        m = re.search(p, text, re.IGNORECASE)
        if m:
            lhs = m.group(1).strip()
            rhs = m.group(2).strip()
            # Strip trailing text after the equation (e.g., "22, find the value of x" → "22")
            # Cut RHS at the first comma or word that starts a new clause
            rhs = re.split(r'\s*,?\s*(?:find|what is|determine|calculate|solve|where|when|if)\b', rhs, flags=re.IGNORECASE)[0].strip()
            # Also strip "find the value of x" type trailing text
            rhs = re.split(r'\s*,?\s*(?:find|what is|determine|calculate)\s', rhs, flags=re.IGNORECASE)[0].strip()
            # Strip leading "if" from LHS
            lhs = re.sub(r'^if\s+', '', lhs, flags=re.IGNORECASE).strip()
            # Don't match if LHS is too long (probably not an equation)
            if len(lhs) < 100 and len(rhs) < 100:
                return (lhs, rhs)
    return None


# --------------------------------------------------------------------------- #
# Solvers
# --------------------------------------------------------------------------- #

class ComputeEngine:
    """Solves computational math/physics questions deterministically."""

    @staticmethod
    def attempt(message: str) -> Optional[ComputeResult]:
        """Try to solve a computational question.

        Returns None if the question is not computational.
        """
        lower = message.lower().strip()

        # Guard: Skip pure conceptual/proof questions that have no specific
        # expression to compute. These should go to LLM/enrichment instead.
        # "show that", "prove that", "verify that" are NOT here because they
        # have dedicated solvers that check specific expressions.
        _PURE_CONCEPTUAL_PREFIXES = [
            "explain why", "justify why",
            "how can", "how does", "how do", "how is",
            "what is the geometrical", "what is the physical",
            "what is the meaning", "what is the significance",
            "what does it mean", "what are the properties",
            "describe ", "difference between",
        ]
        for prefix in _PURE_CONCEPTUAL_PREFIXES:
            if lower.startswith(prefix):
                return None

        # Preprocess: convert word arithmetic to symbols
        lower = ComputeEngine._preprocess_word_arithmetic(lower)

        # Try each solver in order
        # Order matters: specific formula solvers first (they detect by keyword),
        # then general symbolic/numeric solvers.
        for solver in [
            # Comprehensive formula-based solvers (physics, chemistry, math)
            *PHYSICS_SOLVERS,
            *CHEMISTRY_SOLVERS,
            *MATH_SOLVERS,
            # General symbolic/numeric solvers (existing)
            ComputeEngine._solve_simultaneous,  # Run before algebra (catches "sum of two numbers")
            ComputeEngine._solve_algebra,
            ComputeEngine._solve_calculus,
            ComputeEngine._solve_ncr_npr,
            ComputeEngine._solve_arithmetic,
            ComputeEngine._solve_percentage,
            ComputeEngine._solve_physics_formula,
            ComputeEngine._solve_conversion,
            ComputeEngine._solve_factor_expand,
        ]:
            try:
                result = solver(lower)
                if result and result.matched:
                    return result
            except Exception:
                continue

        return None

    @staticmethod
    async def attempt_with_llm(message: str) -> Optional[ComputeResult]:
        """Try deterministic solvers only — no LLM.

        The app has rich enrichment content and pattern solvers.
        LLM is not needed for the vast majority of questions.
        """
        # Step 1: Try deterministic solvers (fast, no API calls)
        result = ComputeEngine.attempt(message)
        if result and result.matched:
            return result

        # No LLM fallback — return None and let enrichment routing handle it
        return None

    # ------------------------------------------------------------------ #
    # Algebra: solve equations
    # ------------------------------------------------------------------ #

    @staticmethod
    def _solve_algebra(message: str) -> Optional[ComputeResult]:
        """Solve algebraic equations: 'solve 2x + 5 = 15', 'solve x^2 - 5x + 6 = 0'"""
        # Must contain "solve", "=", or "find the value of x"
        has_solve = "solve" in message
        has_equals = "=" in message
        has_find_x = bool(re.search(r'find\s+(?:the\s+)?value\s+of\s+x', message))
        
        if not (has_solve or has_equals or has_find_x):
            return None

        # Check if it looks like an equation (has a variable)
        if not re.search(r'[a-zA-Z]', message):
            return None

        # Skip if it's a conceptual question
        conceptual = ["what is", "define", "explain", "why", "how does", "describe",
                      "tell me about", "what are", "meaning of"]
        if any(kw in message for kw in conceptual) and "=" not in message and not has_find_x:
            return None

        eq = _extract_equation(message)
        if eq is None:
            # Try "solve <expr>" without = (assume = 0) — greedy match to end of line
            m = re.search(r'solve\s+(.+)$', message)
            if m:
                eq = (m.group(1).strip(), "0")
            elif has_find_x:
                # "if 3x + 7 = 22, find the value of x" → extract equation
                m = re.search(r'(.+?)\s*=\s*(.+?)(?:\s*,?\s*(?:find|what is|determine).*)?$', message)
                if m:
                    eq = (m.group(1).strip(), m.group(2).strip())
                else:
                    return None
            else:
                return None

        lhs_str, rhs_str = eq
        lhs = _safe_parse(lhs_str)
        rhs = _safe_parse(rhs_str)

        if lhs is None or rhs is None:
            return None

        # Find the variable(s)
        free_symbols = (lhs - rhs).free_symbols
        if not free_symbols:
            return None

        # Solve for the first variable (or 'x' if present)
        var = Symbol('x') if Symbol('x') in free_symbols else list(free_symbols)[0]

        try:
            solutions = solve(lhs - rhs, var)
            if not solutions:
                return None

            steps = [
                f"Given equation: {_format_math(lhs)} = {_format_math(rhs)}",
                f"Rearrange: {_format_math(lhs - rhs)} = 0",
                f"Solve for {var}:",
            ]

            if len(solutions) == 1:
                answer_str = f"{var} = {_format_math(solutions[0])}"
                steps.append(f"Solution: {answer_str}")
            else:
                sol_list = " or ".join(f"{var} = {_format_math(s)}" for s in solutions)
                answer_str = sol_list
                steps.append(f"Solutions: {answer_str}")

            return ComputeResult(
                matched=True,
                question_type="algebra",
                answer=answer_str,
                steps=steps,
            )
        except Exception:
            return None

    # ------------------------------------------------------------------ #
    # Calculus: differentiate, integrate
    # ------------------------------------------------------------------ #

    @staticmethod
    def _solve_calculus(message: str) -> Optional[ComputeResult]:
        """Solve calculus: 'differentiate x^2 + 3x', 'integrate 2x dx'"""
        from sympy import simplify, trigsimp

        # Differentiation — greedy match to capture full expression
        # NOTE: Must NOT match "antiderivative" — use negative lookbehind
        diff_patterns = [
            r'differentiate\s+(.+?)(?:\s+with\s+respect\s+to\s+(\w+))?$',
            r'(?<!anti)derivative\s+of\s+(.+?)(?:\s+with\s+respect\s+to\s+(\w+))?$',
            r'd/dx\s+of\s+(.+)$',
            r'd/dx\s+(.+)$',
            r'find\s+d/dx\s+of\s+(.+)$',
        ]
        for p in diff_patterns:
            m = re.search(p, message)
            if m:
                expr_str = m.group(1).strip()
                var_name = m.group(2) if m.lastindex >= 2 and m.group(2) else 'x'
                expr = _safe_parse(expr_str)
                if expr is None:
                    continue
                var = Symbol(var_name)
                try:
                    result = diff(expr, var)
                    result = trigsimp(simplify(result))
                    steps = [
                        f"Given: f({var}) = {_format_math(expr)}",
                        f"Differentiate with respect to {var}:",
                        f"f'({var}) = {_format_math(result)}",
                    ]
                    return ComputeResult(
                        matched=True,
                        question_type="calculus",
                        answer=f"d/d{var}({_format_math(expr)}) = {_format_math(result)}",
                        steps=steps,
                    )
                except Exception:
                    continue

        # Definite integration: "integral of <expr> from <a> to <b>"
        def_int_patterns = [
            r'integral\s+of\s+(.+?)\s+from\s+(-?\d+\.?\d*(?:/\d+)?|pi(?:/\d+)?|-?pi|e|-?e)\s+to\s+(-?\d+\.?\d*(?:/\d+)?|pi(?:/\d+)?|-?pi|e|-?e)',
            r'integrate\s+(.+?)\s+from\s+(-?\d+\.?\d*(?:/\d+)?|pi(?:/\d+)?|-?pi|e|-?e)\s+to\s+(-?\d+\.?\d*(?:/\d+)?|pi(?:/\d+)?|-?pi|e|-?e)',
        ]
        for p in def_int_patterns:
            m = re.search(p, message)
            if m:
                expr_str = m.group(1).strip()
                if expr_str.endswith('dx'):
                    expr_str = expr_str[:-2].strip()
                a_str, b_str = m.group(2), m.group(3)
                expr = _safe_parse(expr_str)
                if expr is None:
                    continue
                var = Symbol('x')
                try:
                    a = _safe_parse(a_str) or float(a_str)
                    b = _safe_parse(b_str) or float(b_str)
                    result = integrate(expr, (var, a, b))
                    result = trigsimp(simplify(result))
                    steps = [
                        f"Given: f({var}) = {_format_math(expr)}",
                        f"Integrate from {a} to {b}:",
                        f"= {_format_math(result)}",
                    ]
                    return ComputeResult(
                        matched=True,
                        question_type="calculus",
                        answer=f"{_format_math(result)}",
                        steps=steps,
                    )
                except Exception:
                    continue

        # Indefinite integration — greedy match
        int_patterns = [
            r'integrate\s+(.+?)(?:\s+with\s+respect\s+to\s+(\w+))?(?:\s+dx)?$',
            r'integral\s+of\s+(.+?)(?:\s+with\s+respect\s+to\s+(\w+))?(?:\s+dx)?$',
            r'antiderivative\s+of\s+(.+?)(?:\s+with\s+respect\s+to\s+(\w+))?(?:\s+dx)?$',
            r'find\s+the\s+antiderivative\s+of\s+(.+?)(?:\s+with\s+respect\s+to\s+(\w+))?(?:\s+dx)?$',
            r'integrate\s+(.+)$',
        ]
        for p in int_patterns:
            m = re.search(p, message)
            if m:
                expr_str = m.group(1).strip()
                # Remove trailing "dx" (integration variable marker) if present
                if expr_str.endswith('dx'):
                    expr_str = expr_str[:-2].strip()
                var_name = m.group(2) if m.lastindex >= 2 and m.group(2) else 'x'
                expr = _safe_parse(expr_str)
                if expr is None:
                    continue
                var = Symbol(var_name)
                try:
                    result = integrate(expr, var)
                    result = trigsimp(simplify(result))
                    steps = [
                        f"Given: f({var}) = {_format_math(expr)}",
                        f"Integrate with respect to {var}:",
                        f"∫ {_format_math(expr)} d{var} = {_format_math(result)} + C",
                    ]
                    return ComputeResult(
                        matched=True,
                        question_type="calculus",
                        answer=f"∫ {_format_math(expr)} d{var} = {_format_math(result)} + C",
                        steps=steps,
                    )
                except Exception:
                    continue

        return None

    # ------------------------------------------------------------------ #
    # Arithmetic: evaluate expressions
    # ------------------------------------------------------------------ #

    @staticmethod
    def _solve_simultaneous(message: str) -> Optional[ComputeResult]:
        """Solve simultaneous equations from word problems.
        
        'The sum of two numbers is 20 and their difference is 4. Find the numbers.'
        'If 2x + 3y = 12 and x = 3, find y.'
        """
        from sympy import Symbol, solve as sym_solve
        
        # Pattern 1: "sum of two numbers is X and their difference is Y"
        m = re.search(r'sum\s+of\s+(?:two\s+)?numbers?\s+is\s+(\d+\.?\d*)\s+and\s+(?:their\s+)?difference\s+is\s+(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            total = float(m.group(1))
            diff = float(m.group(2))
            # x + y = total, x - y = diff → x = (total+diff)/2, y = (total-diff)/2
            x = (total + diff) / 2
            y = (total - diff) / 2
            return ComputeResult(
                matched=True,
                question_type="simultaneous",
                answer=f"The numbers are {x} and {y}",
                steps=[
                    f"Let the two numbers be x and y",
                    f"x + y = {total}",
                    f"x - y = {diff}",
                    f"Adding: 2x = {total + diff} → x = {x}",
                    f"Subtracting: 2y = {total - diff} → y = {y}",
                ],
            )
        
        # Pattern 2: "If 2x + 3y = 12 and x = 3, find y"
        m = re.search(r'(\d+)\s*\*?\s*([xy])\s*\+\s*(\d+)\s*\*?\s*([xy])\s*=\s*(\d+\.?\d*)\s+and\s+([xy])\s*=\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            coef1 = int(m.group(1))
            var1 = m.group(2).lower()
            coef2 = int(m.group(3))
            var2 = m.group(4).lower()
            rhs = float(m.group(5))
            given_var = m.group(6).lower()
            given_val = float(m.group(7))
            
            # Substitute the known variable
            if given_var == var1:
                # Substitute var1
                remaining = (rhs - coef1 * given_val) / coef2
                other_var = var2
            else:
                remaining = (rhs - coef2 * given_val) / coef1
                other_var = var1
            
            return ComputeResult(
                matched=True,
                question_type="substitution",
                answer=f"{other_var} = {remaining}",
                steps=[
                    f"Given: {coef1}{var1} + {coef2}{var2} = {rhs}",
                    f"And: {given_var} = {given_val}",
                    f"Substitute: {coef1 * given_val if given_var == var1 else coef2 * given_val}",
                    f"Solve: {other_var} = {remaining}",
                ],
            )
        
        return None

    @staticmethod
    def _solve_ncr_npr(message: str) -> Optional[ComputeResult]:
        """Solve nCr/nPr: 'find 8C3', 'find 8P3', '8c3', '8p3'"""
        # Match patterns like 8C3, 8P3, 8c3, 8p3, nCr(8,3), nPr(8,3)
        m = re.search(r'(\d+)\s*[cp]\s*(\d+)', message, re.IGNORECASE)
        if not m:
            return None
        
        n = int(m.group(1))
        r = int(m.group(2))
        is_perm = m.group(0).lower().count('p') > 0
        
        try:
            if is_perm:
                # nPr = n! / (n-r)!
                from sympy import factorial
                result = int(factorial(n) // factorial(n - r))
                formula = f"{n}P{r} = {n}! / ({n}-{r})! = {result}"
                return ComputeResult(
                    matched=True,
                    question_type="permutation",
                    answer=f"{n}P{r} = {result}",
                    steps=[f"Formula: nPr = n! / (n-r)!", f"Substitute: {n}! / ({n}-{r})!", f"Result: {result}"],
                )
            else:
                # nCr = n! / (r! * (n-r)!)
                from sympy import factorial
                result = int(factorial(n) // (factorial(r) * factorial(n - r)))
                formula = f"{n}C{r} = {n}! / ({r}! × ({n}-{r})!) = {result}"
                return ComputeResult(
                    matched=True,
                    question_type="combination",
                    answer=f"{n}C{r} = {result}",
                    steps=[f"Formula: nCr = n! / (r! × (n-r)!)", f"Substitute: {n}! / ({r}! × ({n}-{r})!)", f"Result: {result}"],
                )
        except Exception:
            return None

    @staticmethod
    def _preprocess_word_arithmetic(message: str) -> str:
        """Convert word arithmetic to symbols.
        
        '8 times 7' → '8 * 7'
        '144 divided by 12' → '144 / 12'
        '25 plus 47' → '25 + 47'
        '100 minus 30' → '100 - 30'
        
        But DON'T strip "sum of two numbers" — that's a word problem, not arithmetic.
        """
        # Don't preprocess if it's a word problem, series sum, or vector operation
        if re.search(r'sum\s+of\s+(?:the\s+)?(?:two|three|four|\d+|first|natural|even|odd|all)', message, re.IGNORECASE):
            return message  # Leave word problems alone
        if re.search(r'(?:cross|dot)\s+product\s+of', message, re.IGNORECASE):
            return message  # Leave vector operations alone
        if re.search(r'difference\s+of\s+(?:two|three|four|\d+|the\s+)', message, re.IGNORECASE):
            return message  # Leave word problems alone
        
        # Word to symbol replacements (order matters — longer phrases first)
        replacements = [
            (r'\bdivided\s+by\b', '/'),
            (r'\btimes\b', '*'),
            (r'\bmultiplied\s+by\b', '*'),
            (r'\bplus\b', '+'),
            (r'\bminus\b', '-'),
            (r'\badded\s+to\b', '+'),
            (r'\bsubtracted\s+from\b', '-'),
            (r'\bsum\s+of\b', ''),
            (r'\bdifference\s+of\b', ''),
            (r'\bproduct\s+of\b', ''),
            (r'\bquotient\s+of\b', '/'),
            (r'\bsquare\s+root\s+of\b', 'sqrt'),
            (r'\bsquared\b', '**2'),
            (r'\bcubed\b', '**3'),
            (r'\bto\s+the\s+power\s+of\b', '**'),
            (r'\braised\s+to\b', '**'),
            (r'\bover\b', '/'),
        ]
        for pattern, replacement in replacements:
            message = re.sub(pattern, replacement, message, flags=re.IGNORECASE)
        return message

    @staticmethod
    def _solve_arithmetic(message: str) -> Optional[ComputeResult]:
        """Evaluate arithmetic: 'calculate 25 * 4 + 10', 'what is 3 + 5 * 2'"""
        # Must have numbers and operators
        if not re.search(r'\d', message):
            return None

        # Skip if it has variables (handled by algebra)
        # But allow "find the value of x" phrasing — that's handled by algebra
        if re.search(r'\b[a-zA-Z]\b', message) and "=" not in message:
            # Allow single 'x' if it's "find the value of x" with an equation
            if not re.search(r'find\s+(?:the\s+)?value\s+of\s+x', message):
                return None

        # Extract the expression — greedy to capture full expression
        patterns = [
            r'calculate\s+(.+)$',
            r'compute\s+(.+)$',
            r'evaluate\s+(.+)$',
            r'what\s+is\s+(.+?)(?:\?|$)',
            r'find\s+(?:the\s+)?(?:value\s+of\s+)?(.+?)(?:\?|$)',
            r'how\s+much\s+is\s+(.+?)(?:\?|$)',
            r'(.+?)(?:\?|$)',
        ]

        for p in patterns:
            m = re.search(p, message)
            if m:
                expr_str = m.group(1).strip().rstrip('?').strip()
                # Only try if it looks like a math expression (has operators or math functions)
                if not re.search(r'[+\-*/^]', expr_str) and not re.search(r'\b(sqrt|log|sin|cos|tan|exp|log10|ln|abs|factorial)\b', expr_str):
                    continue
                # Skip if it contains words (not a pure math expression)
                # But allow function names like sqrt, log, factorial, sin, cos, etc.
                allowed_words = {'sqrt', 'log', 'sin', 'cos', 'tan', 'exp', 'log10', 'ln', 'abs', 'factorial', 'pi', 'e', 'acos', 'asin', 'atan'}
                words_in_expr = set(re.findall(r'\b[a-zA-Z]{2,}\b', expr_str))
                if words_in_expr - allowed_words:
                    continue
                # Replace factorial(N) with sympy factorial
                expr_str_clean = re.sub(r'factorial\s*\((\d+)\)', lambda m: f'factorial({m.group(1)})', expr_str)
                expr = _safe_parse(expr_str_clean)
                if expr is None:
                    continue
                try:
                    # Try to get exact rational result first
                    from sympy import Rational, nsimplify
                    result_exact = expr
                    if hasattr(result_exact, 'simplify'):
                        result_exact = result_exact.simplify()
                    
                    result_eval = expr.evalf() if hasattr(expr, 'evalf') else expr
                    
                    # Format result — prefer fractions for non-integers
                    if isinstance(result_eval, sympy.Integer) or (hasattr(result_eval, 'is_integer') and result_eval.is_integer):
                        result = int(result_eval)
                        result_str = str(result)
                    else:
                        result_float = float(result_eval)
                        # Check if it's a clean fraction
                        from sympy import Rational as R
                        try:
                            rat = R(result_float).limit_denominator(1000)
                            if rat.q != 1 and abs(float(rat) - result_float) < 1e-9:
                                result_str = f"{rat.p}/{rat.q}"
                            elif float(result_float) == int(result_float):
                                result_str = str(int(result_float))
                            elif abs(result_float) < 0.001 or abs(result_float) > 1e6:
                                result_str = f"{result_float:.6e}"
                            else:
                                result_str = str(round(result_float, 6))
                        except Exception:
                            if float(result_float) == int(result_float):
                                result_str = str(int(result_float))
                            else:
                                result_str = str(round(result_float, 6))

                    return ComputeResult(
                        matched=True,
                        question_type="arithmetic",
                        answer=f"{expr_str} = {result_str}",
                        steps=[f"Calculate: {expr_str} = {result_str}"],
                    )
                except Exception:
                    continue

        return None

    # ------------------------------------------------------------------ #
    # Percentage
    # ------------------------------------------------------------------ #

    @staticmethod
    def _solve_percentage(message: str) -> Optional[ComputeResult]:
        """Solve percentage: 'what is 15% of 200', 'what percent is 30 of 150'"""
        # "what is X% of Y"
        m = re.search(r'(\d+\.?\d*)\s*%\s*of\s*(\d+\.?\d*)', message)
        if m:
            pct = float(m.group(1))
            total = float(m.group(2))
            result = (pct / 100) * total
            # Clean number formatting
            pct_str = str(int(pct)) if pct == int(pct) else str(pct)
            total_str = str(int(total)) if total == int(total) else str(total)
            result_str = str(int(result)) if result == int(result) else str(round(result, 4))
            dec = pct / 100
            dec_str = str(int(dec)) if dec == int(dec) else str(dec)
            steps = [
                f"Convert {pct_str}% to decimal: {dec_str}",
                f"Multiply by {total_str}: {dec_str} × {total_str} = {result_str}",
            ]
            return ComputeResult(
                matched=True,
                question_type="arithmetic",
                answer=f"{pct_str}% of {total_str} = {result_str}",
                steps=steps,
            )

        # "what percent is X of Y"
        m = re.search(r'what\s+percent(?:age)?\s+is\s+(\d+\.?\d*)\s+of\s+(\d+\.?\d*)', message)
        if m:
            part = float(m.group(1))
            total = float(m.group(2))
            pct = (part / total) * 100
            part_str = str(int(part)) if part == int(part) else str(part)
            total_str = str(int(total)) if total == int(total) else str(total)
            pct_str = str(int(pct)) if pct == int(pct) else str(round(pct, 4))
            div = part / total
            div_str = str(round(div, 4))
            steps = [
                f"Divide part by total: {part_str} ÷ {total_str} = {div_str}",
                f"Convert to percentage: {div_str} × 100 = {pct_str}%",
            ]
            return ComputeResult(
                matched=True,
                question_type="arithmetic",
                answer=f"{part_str} is {pct_str}% of {total_str}",
                steps=steps,
            )

        return None

    # ------------------------------------------------------------------ #
    # Physics formulas (F=ma, v=u+at, etc.)
    # ------------------------------------------------------------------ #

    @staticmethod
    def _solve_physics_formula(message: str) -> Optional[ComputeResult]:
        """Solve physics formula calculations with given values."""
        # F = ma
        m = re.search(r'force.*?mass\s*=?\s*(\d+\.?\d*).*?acceleration\s*=?\s*(\d+\.?\d*)', message)
        if m:
            mass = float(m.group(1))
            accel = float(m.group(2))
            force = mass * accel
            return ComputeResult(
                matched=True,
                question_type="physics_formula",
                answer=f"Force = {mass} × {accel} = {force} N",
                steps=["Formula: F = m × a", f"Substitute: F = {mass} × {accel}", f"Result: F = {force} N"],
            )

        # Reverse: a = F/m
        m = re.search(r'acceleration.*?force\s*=?\s*(\d+\.?\d*).*?mass\s*=?\s*(\d+\.?\d*)', message)
        if m:
            force = float(m.group(1))
            mass = float(m.group(2))
            accel = force / mass
            return ComputeResult(
                matched=True,
                question_type="physics_formula",
                answer=f"Acceleration = {force} / {mass} = {accel} m/s²",
                steps=["Formula: a = F / m", f"Substitute: a = {force} / {mass}", f"Result: a = {accel} m/s²"],
            )

        # Kinetic energy: KE = 1/2 m v^2
        m = re.search(r'kinetic\s+energy.*?mass\s*=?\s*(\d+\.?\d*).*?velocity\s*=?\s*(\d+\.?\d*)', message)
        if m:
            mass = float(m.group(1))
            vel = float(m.group(2))
            ke = 0.5 * mass * vel**2
            return ComputeResult(
                matched=True,
                question_type="physics_formula",
                answer=f"KE = ½ × {mass} × {vel}² = {ke} J",
                steps=["Formula: KE = ½mv²", f"Substitute: KE = ½ × {mass} × {vel}²", f"Result: KE = {ke} J"],
            )

        # Area of circle — but NOT for optimization/inscribed problems
        if not any(kw in message for kw in ["inscribed", "largest", "maximum", "optimize", "dimensions", "rectangle"]):
            m = re.search(r'area.*?circle.*?radius\s*=?\s*(\d+\.?\d*)', message)
            if m:
                r = float(m.group(1))
                area = pi * r**2
                return ComputeResult(
                    matched=True,
                    question_type="physics_formula",
                    answer=f"Area = π × {r}² = {float(area):.4f} sq units",
                    steps=["Formula: A = πr²", f"Substitute: A = π × {r}²", f"Result: A = {float(area):.4f}"],
                )

        # Area of triangle
        m = re.search(r'area.*?triangle.*?base\s*=?\s*(\d+\.?\d*).*?height\s*=?\s*(\d+\.?\d*)', message)
        if m:
            base = float(m.group(1))
            height = float(m.group(2))
            area = 0.5 * base * height
            return ComputeResult(
                matched=True,
                question_type="physics_formula",
                answer=f"Area = ½ × {base} × {height} = {area} sq units",
                steps=["Formula: A = ½ × b × h", f"Substitute: A = ½ × {base} × {height}", f"Result: A = {area}"],
            )

        return None

    # ------------------------------------------------------------------ #
    # Unit conversion
    # ------------------------------------------------------------------ #

    @staticmethod
    def _solve_conversion(message: str) -> Optional[ComputeResult]:
        """Convert units: 'convert 5 km to meters', 'convert 100 celsius to fahrenheit'"""
        # Normalize unit names (celsius → °C, fahrenheit → °F, etc.)
        unit_aliases = {
            'celsius': '°C', 'c': '°C', '°c': '°C',
            'fahrenheit': '°F', 'f': '°F', '°f': '°F',
            'kelvin': 'K', 'k': 'K',
            'meters': 'm', 'meter': 'm', 'metre': 'm', 'metres': 'm',
            'kilometers': 'km', 'kilometer': 'km', 'kilometre': 'km', 'kilometres': 'km',
            'centimeters': 'cm', 'centimeter': 'cm', 'centimetre': 'cm', 'centimetres': 'cm',
            'millimeters': 'mm', 'millimeter': 'mm', 'millimetre': 'mm', 'millimetres': 'mm',
            'grams': 'g', 'gram': 'g',
            'kilograms': 'kg', 'kilogram': 'kg',
            'liters': 'L', 'liter': 'L', 'litre': 'L', 'litres': 'L',
            'milliliters': 'mL', 'milliliter': 'mL', 'millilitre': 'mL', 'millilitres': 'mL',
            'hours': 'hours', 'hour': 'hours', 'hrs': 'hours',
            'minutes': 'minutes', 'minute': 'minutes', 'min': 'minutes',
            'seconds': 'seconds', 'second': 'seconds', 'sec': 'seconds', 'secs': 'seconds',
        }

        m = re.search(r'convert\s+(\d+\.?\d*)\s*([a-zA-Z°]+)\s+to\s+([a-zA-Z°]+)', message)
        if not m:
            return None

        value = float(m.group(1))
        from_raw = m.group(2).lower()
        to_raw = m.group(3).lower()

        from_unit = unit_aliases.get(from_raw, from_raw)
        to_unit = unit_aliases.get(to_raw, to_raw)

        conversions = {
            ("km", "m"): 1000, ("m", "km"): 0.001,
            ("m", "cm"): 100, ("cm", "m"): 0.01,
            ("cm", "mm"): 10, ("mm", "cm"): 0.1,
            ("km", "cm"): 100000, ("cm", "km"): 0.00001,
            ("kg", "g"): 1000, ("g", "kg"): 0.001,
            ("L", "mL"): 1000, ("mL", "L"): 0.001,
            ("hours", "minutes"): 60, ("minutes", "hours"): 1/60,
            ("minutes", "seconds"): 60, ("seconds", "minutes"): 1/60,
            ("hours", "seconds"): 3600, ("seconds", "hours"): 1/3600,
        }

        key = (from_unit, to_unit)
        if key in conversions:
            result = value * conversions[key]
            # Clean number formatting
            val_str = str(int(value)) if value == int(value) else str(value)
            res_str = str(int(result)) if result == int(result) else str(result)
            return ComputeResult(
                matched=True,
                question_type="conversion",
                answer=f"{val_str} {from_unit} = {res_str} {to_unit}",
                steps=[f"Conversion factor: 1 {from_unit} = {conversions[key]} {to_unit}", f"Calculate: {val_str} × {conversions[key]} = {res_str}"],
            )

        # Temperature (special case — not a simple multiplier)
        def _clean(v):
            return str(int(v)) if v == int(v) else str(round(v, 2))

        if from_unit == "°C" and to_unit == "°F":
            result = value * 9/5 + 32
            return ComputeResult(matched=True, question_type="conversion",
                                 answer=f"{_clean(value)}°C = {_clean(result)}°F",
                                 steps=[f"Formula: °F = °C × 9/5 + 32", f"Calculate: {_clean(value)} × 9/5 + 32 = {_clean(result)}°F"])
        if from_unit == "°F" and to_unit == "°C":
            result = (value - 32) * 5/9
            return ComputeResult(matched=True, question_type="conversion",
                                 answer=f"{_clean(value)}°F = {_clean(result)}°C",
                                 steps=[f"Formula: °C = (°F - 32) × 5/9", f"Calculate: ({_clean(value)} - 32) × 5/9 = {_clean(result)}°C"])
        if from_unit == "°C" and to_unit == "K":
            result = value + 273.15
            return ComputeResult(matched=True, question_type="conversion",
                                 answer=f"{_clean(value)}°C = {_clean(result)}K",
                                 steps=[f"Formula: K = °C + 273.15", f"Calculate: {_clean(value)} + 273.15 = {_clean(result)}K"])
        if from_unit == "K" and to_unit == "°C":
            result = value - 273.15
            return ComputeResult(matched=True, question_type="conversion",
                                 answer=f"{_clean(value)}K = {_clean(result)}°C",
                                 steps=[f"Formula: °C = K - 273.15", f"Calculate: {_clean(value)} - 273.15 = {_clean(result)}°C"])

        return None

    # ------------------------------------------------------------------ #
    # Factor / Expand
    # ------------------------------------------------------------------ #

    @staticmethod
    def _solve_factor_expand(message: str) -> Optional[ComputeResult]:
        """Factor or expand expressions: 'factor x^2 - 9', 'expand (x+2)(x-3)'"""
        # Factor — greedy match
        m = re.search(r'factor\s+(.+)$', message)
        if m:
            expr_str = m.group(1).strip()
            expr = _safe_parse(expr_str)
            if expr is None:
                return None
            try:
                result = factor(expr)
                if result != expr:
                    return ComputeResult(
                        matched=True,
                        question_type="algebra",
                        answer=f"{_format_math(expr)} = {_format_math(result)}",
                        steps=[f"Factor: {_format_math(expr)} = {_format_math(result)}"],
                    )
            except Exception:
                pass

        # Expand — greedy match
        m = re.search(r'expand\s+(.+)$', message)
        if m:
            expr_str = m.group(1).strip()
            expr = _safe_parse(expr_str)
            if expr is None:
                return None
            try:
                result = expand(expr)
                if result != expr:
                    return ComputeResult(
                        matched=True,
                        question_type="algebra",
                        answer=f"{_format_math(expr)} = {_format_math(result)}",
                        steps=[f"Expand: {_format_math(expr)} = {_format_math(result)}"],
                    )
            except Exception:
                pass

        # Simplify — greedy match
        m = re.search(r'simplify\s+(.+)$', message)
        if m:
            expr_str = m.group(1).strip()
            expr = _safe_parse(expr_str)
            if expr is None:
                return None
            try:
                result = simplify(expr)
                if result != expr:
                    return ComputeResult(
                        matched=True,
                        question_type="algebra",
                        answer=f"{_format_math(expr)} = {_format_math(result)}",
                        steps=[f"Simplify: {_format_math(expr)} = {_format_math(result)}"],
                    )
            except Exception:
                pass

        return None
