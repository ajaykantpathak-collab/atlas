"""Shared types and helpers for compute solvers.

Kept separate to avoid circular imports between compute_engine.py and the
physics/chemistry/math solver modules.
"""

import re
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class ComputeResult:
    """Result of a computational question."""
    matched: bool
    question_type: str  # "algebra", "calculus", "arithmetic", "physics_formula", "conversion"
    answer: str
    steps: list[str] = field(default_factory=list)
    latex: Optional[str] = None


def _clean_num(v) -> str:
    """Format a number cleanly: integers without decimals, floats rounded."""
    if v is None:
        return "?"
    f = float(v)
    if f == int(f):
        return str(int(f))
    return str(round(f, 6))


def _num_sci(v) -> str:
    """Format a number, using scientific notation for very large/small values."""
    if v is None:
        return "?"
    f = float(v)
    if f == 0:
        return "0"
    abs_f = abs(f)
    if abs_f >= 1e6 or abs_f < 1e-3:
        # Use scientific notation
        return f"{f:.4e}"
    if f == int(f):
        return str(int(f))
    return str(round(f, 6))


def _format_math(expr) -> str:
    """Convert a SymPy expression to clean, student-friendly math notation.

    SymPy outputs Python syntax (x**2, 5*x, 2*x + 3). This converts to
    readable math (x², 5x, 2x + 3) that a school student can understand.
    """
    s = str(expr)

    superscripts = {'0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
                    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'}

    def _power_repl(m):
        base = m.group(1)
        exp = m.group(2)
        sup_exp = ''.join(superscripts.get(c, c) for c in exp)
        return f"{base}{sup_exp}"

    s = re.sub(r'(\w)\*\*(\d+)', _power_repl, s)
    s = re.sub(r'\)\*\*(\d+)', lambda m: ')' + ''.join(superscripts.get(c, c) for c in m.group(1)), s)
    # Handle negative exponents: x**(-2) -> x^(-2)
    s = re.sub(r'(\w|\))\*\*\(-(\d+)\)', lambda m: f"{m.group(1)}^(-{m.group(2)})", s)
    s = re.sub(r'(\w|\))\*\*\(([^)]+)\)', lambda m: f"{m.group(1)}^({m.group(2)})", s)

    # Superscript chars act like variable chars for multiplication removal
    _sup = '²³⁴⁵⁶⁷⁸⁹⁰¹'
    s = re.sub(r'(\d)\s*\*\s*([a-zA-Z])', r'\1\2', s)
    s = re.sub(r'([a-zA-Z' + _sup + r'])\s*\*\s*(\d)', r'\1\2', s)
    s = re.sub(r'([a-zA-Z' + _sup + r'])\s*\*\s*([a-zA-Z])', r'\1\2', s)
    s = re.sub(r'(\d)\s*\*\s*(\d)', r'\1 × \2', s)
    s = re.sub(r'\)\s*\*\s*\(', ')(', s)
    s = re.sub(r'\)\s*\*\s*([a-zA-Z])', r')\1', s)
    s = re.sub(r'([a-zA-Z])\s*\*\s*\(', r'\1(', s)
    s = re.sub(r'(\d)\s*\*\s*\(', r'\1(', s)

    s = re.sub(r'\s*\+\s*', ' + ', s)
    s = re.sub(r'(?<=[a-zA-Z0-9' + _sup + r')\])])\s*-\s*', ' - ', s)
    s = re.sub(r'(\d)\s+\*\s+', r'\1 × ', s)
    s = s.replace('*', '×')
    s = re.sub(r'\s+', ' ', s).strip()

    return s


def _safe_parse(expr_str: str):
    """Parse a math expression safely.

    Handles caret notation (x^2 → x**2) and implicit multiplication (5x → 5*x).
    """
    try:
        from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
        from sympy import acos, asin, atan, log, sqrt, sin, cos, tan, exp, factorial, pi, E, I, oo, Rational
        expr_str = expr_str.replace('^', '**')
        _TRANSFORMS = standard_transformations + (implicit_multiplication_application,)
        # Provide common math functions in the namespace
        local_dict = {
            'acos': acos, 'asin': asin, 'atan': atan,
            'log': log, 'sqrt': sqrt, 'sin': sin, 'cos': cos, 'tan': tan,
            'exp': exp, 'factorial': factorial, 'pi': pi, 'E': E, 'e': E,
            'I': I, 'i': I, 'oo': oo, 'Rational': Rational,
        }
        return parse_expr(expr_str, transformations=_TRANSFORMS, evaluate=True, local_dict=local_dict)
    except Exception:
        return None
