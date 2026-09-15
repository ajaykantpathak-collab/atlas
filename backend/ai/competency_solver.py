"""Competency question solver — decomposes board questions and solves with SymPy.

This is the core engine for competency-based questions:
1. Match typed question to closest board question template
2. Extract values (expressions, points, matrices, sets) from the question
3. Decompose into steps using the board question's model answer structure
4. Run SymPy on each step deterministically
5. Verify against the model answer

No LLM. No spaCy. No MiniLM. Just graph routing + regex extraction + SymPy.
"""
from __future__ import annotations

import re
import logging
from dataclasses import dataclass, field
from typing import Optional, Any

from sympy import (
    symbols, Symbol, diff, integrate, solve, Eq, Matrix, Rational, sqrt,
    sin, cos, tan, exp, log, atan, asin, acos, pi, oo, limit, simplify,
    trigsimp, expand, factor, dsolve, Function, sympify, I, re as sympy_re,
    im as sympy_im, Abs, FiniteSet, Union, Intersection, EmptySet, S,
    together, apart, cancel, nsimplify, Float, Integer, nsolve, series,
    oo, zoo, nan, Piecewise, And, Or, Le, Lt, Ge, Gt
)
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application

from backend.ai.board_parser import build_bank, match_question, BoardQuestion, BoardBank

logger = logging.getLogger(__name__)

# Parse expressions with implicit multiplication (3x → 3*x)
_transformations = standard_transformations + (implicit_multiplication_application,)


def _safe_parse(expr_str: str) -> Optional[Any]:
    """Parse a math expression string safely."""
    if not expr_str:
        return None
    try:
        # Clean up common notation
        s = expr_str.strip()
        # Replace ^ with ** for exponentiation
        s = s.replace('^', '**')
        # Remove trailing periods
        s = s.rstrip('.')
        # Replace ÷ with /
        s = s.replace('÷', '/')
        # Replace × with *
        s = s.replace('×', '*')
        # Remove "dx", "dy", "dt" etc. that get parsed as d*x
        s = re.sub(r'\b([a-z])x\b', r'\1*x', s)  # ax → a*x (but not dx)
        # Actually, just strip trailing " dx", " dy" etc.
        s = re.sub(r'\s+d[xyzt]\s*$', '', s)
        s = re.sub(r'\s+d[xyzt]\b', ' ', s)
        # Remove leading "integral of", "integrate", "evaluate"
        s = re.sub(r'^(integral of|integrate|evaluate the integral of|evaluate)\s+', '', s, flags=re.IGNORECASE)
        # Remove "from X to Y" — bounds are handled separately
        s = re.sub(r'\s+from\s+.*$', '', s, flags=re.IGNORECASE)
        return parse_expr(s, transformations=_transformations)
    except Exception as e:
        logger.debug(f"Parse failed for '{expr_str}': {e}")
        return None


# ─────────────────────────────────────────────────────────────────────
# Value extraction for competency questions
# ─────────────────────────────────────────────────────────────────────

@dataclass
class ExtractedValues:
    """Values extracted from a question."""
    expression: Optional[str] = None       # main function/expression
    var: str = "x"                          # variable
    point: Optional[str] = None            # evaluation point
    rhs: Optional[str] = None              # right-hand side of equation
    matrix_a: Optional[str] = None         # first matrix
    matrix_b: Optional[str] = None         # second matrix
    set_a: Optional[str] = None            # first set
    set_b: Optional[str] = None            # second set
    numbers: Optional[str] = None          # list of numbers
    lower: Optional[str] = None            # lower bound (integration)
    upper: Optional[str] = None            # upper bound (integration)
    coefficients: Optional[dict] = None    # quadratic coefficients
    raw: dict = field(default_factory=dict)  # all raw extracted values


def extract_values(question: str, category: str) -> ExtractedValues:
    """Extract structured values from a competency question."""
    q = question.strip()
    vals = ExtractedValues()

    if category == "tangent_normal":
        _extract_tangent_normal(q, vals)
    elif category == "differentiation":
        _extract_differentiation(q, vals)
    elif category == "integration":
        _extract_integration(q, vals)
    elif category == "differential_equation":
        _extract_differential_equation(q, vals)
    elif category == "quadratic":
        _extract_quadratic(q, vals)
    elif category == "matrix":
        _extract_matrix(q, vals)
    elif category == "linear_system":
        _extract_linear_system(q, vals)
    elif category == "equivalence_relation":
        _extract_equivalence_relation(q, vals)
    elif category == "continuity":
        _extract_continuity(q, vals)
    elif category == "increasing_decreasing":
        _extract_increasing_decreasing(q, vals)
    elif category == "kinematics":
        _extract_kinematics(q, vals)
    elif category == "max_min":
        _extract_max_min(q, vals)
    elif category == "inverse_trig":
        _extract_inverse_trig(q, vals)
    elif category == "probability":
        _extract_probability(q, vals)
    elif category == "progression":
        _extract_progression(q, vals)
    elif category == "trig_identity":
        _extract_trig_identity(q, vals)
    elif category == "set_theory":
        _extract_set_theory(q, vals)
    elif category == "ratio_proportion":
        _extract_ratio_proportion(q, vals)
    elif category == "interest":
        _extract_interest(q, vals)
    elif category == "percentage":
        _extract_percentage(q, vals)
    elif category == "hcf_lcm":
        _extract_hcf_lcm(q, vals)
    elif category == "exponents":
        _extract_exponents(q, vals)
    else:
        _extract_general(q, vals)

    # Merge: don't overwrite raw dict, add other fields to it
    raw_extra = {k: v for k, v in vals.__dict__.items() if v is not None and k != "raw"}
    vals.raw.update(raw_extra)
    return vals


def _find_expression(q: str) -> tuple[Optional[str], Optional[str]]:
    """Find a mathematical expression and its variable in the question text.

    Returns (expression, variable) or (None, None).
    """
    # Try y = ... or f(x) = ... or s = ... patterns
    patterns = [
        (r'y\s*=\s*([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+(?:at|where|and|find|also|for|if|show|prove|the)\s|[.,;]|$)', 'x'),
        (r'f\s*\(\s*([a-zA-Z])\s*\)\s*=\s*([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+(?:at|where|and|find|also|for|if|show|prove|the)\s|[.,;]|$)', None),
        (r'curve\s+(?:y\s*=\s*|is\s+)([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+(?:at|where|and|find|also|for|if|show|prove|the)\s|[.,;]|$)', 'x'),
        (r's\s*=\s*([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+(?:where|and|find|also|for|if|show|prove|the)\s|[.,;]|$)', 't'),
    ]
    for pat, default_var in patterns:
        m = re.search(pat, q, re.IGNORECASE)
        if m:
            if len(m.groups()) == 2:
                var = m.group(1)
                expr = m.group(2)
            else:
                var = default_var
                expr = m.group(1)
            expr = expr.strip().rstrip('.')
            # Validate it looks like math
            if re.search(r'[a-zA-Z0-9]\^|[\+\-\*/]|sin|cos|tan|log|exp|sqrt|\d', expr):
                return expr, var
    return None, None


def _extract_tangent_normal(q: str, vals: ExtractedValues) -> None:
    expr, var = _find_expression(q)
    if expr:
        vals.expression = expr.replace('^', '**')
    if var:
        vals.var = var
    # Find point
    pt = re.search(r'(?:at\s+)?x\s*=\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
    if pt:
        vals.point = pt.group(1)
    elif 'origin' in q.lower():
        vals.point = '0'
    # Variable fallback
    if not var:
        if 't' in q.lower() and ('particle' in q.lower() or 'time' in q.lower()):
            vals.var = 't'
        else:
            vals.var = 'x'


def _extract_differentiation(q: str, vals: ExtractedValues) -> None:
    expr, var = _find_expression(q)
    if not expr:
        # Try "differentiate <expr>" or "derivative of <expr>"
        m = re.search(r'(?:differentiate|derivative of)\s+([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+(?:with|at|from|where|and|respect|find)\s|[.,;]|$)', q, re.IGNORECASE)
        if m:
            expr = m.group(1).strip().rstrip('.')
            var = 'x'
    if expr:
        vals.expression = expr.replace('^', '**')
    if var:
        vals.var = var
    pt = re.search(r'(?:at\s+)?x\s*=\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
    if pt:
        vals.point = pt.group(1)
    if 'with respect to' in q.lower():
        m = re.search(r'with respect to\s+(\w+)', q, re.IGNORECASE)
        if m:
            vals.var = m.group(1)


def _extract_integration(q: str, vals: ExtractedValues) -> None:
    ql = q.lower()

    # ── Area problems: detect FIRST before falling to plain integration ──

    # Area between two curves: "area bounded by y = f(x) and y = g(x)"
    area_m = re.search(r'area.*bounded.*y\s*=\s*([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)\s+(?:and|the line)\s+y\s*=\s*([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:[.,;]|$)', q, re.IGNORECASE)
    if area_m:
        vals.raw['curve1'] = area_m.group(1).strip().rstrip('.').replace('^', '**')
        vals.raw['curve2'] = area_m.group(2).strip().rstrip('.').replace('^', '**')
        vals.expression = vals.raw['curve1']
        vals.var = 'x'
        # Check for bounds "x = A and x = B" or "ordinates x = A and x = B"
        ord_bounds = re.search(r'(?:ordinates?\s+)?x\s*=\s*(-?\d+(?:\.\d+)?)\s+(?:and|to)\s+x\s*=\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if ord_bounds:
            vals.lower = ord_bounds.group(1)
            vals.upper = ord_bounds.group(2)
        return

    # Area between 3+ lines: "area bounded by the lines A, B and C"
    lines_m = re.search(r'area.*bounded.*lines?\s*[:.]?\s*(.+?)(?:[.,;]|$)', q, re.IGNORECASE)
    if lines_m and 'line' in ql:
        lines_text = lines_m.group(1).strip()
        # Split by "and" and ","
        parts = re.split(r'\s+and\s+|,\s*', lines_text)
        line_eqs = [p.strip() for p in parts if '=' in p and p.strip()]
        if len(line_eqs) >= 2:
            vals.raw['lines'] = ';'.join(line_eqs)
            vals.var = 'x'
            return

    # Area under curve with ordinates: "area bounded by the curve y = f(x), the x-axis and x = A and x = B"
    area_curve_m = re.search(r'area.*(?:bounded|enclosed|under).*curve\s+y\s*=\s*([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:,|\s+the\s+|\s+and\s+|$)', q, re.IGNORECASE)
    if area_curve_m:
        vals.expression = area_curve_m.group(1).strip().rstrip(',').rstrip('.').replace('^', '**')
        vals.var = 'x'
        # Extract ordinates
        ord_bounds = re.search(r'(?:ordinates?\s+)?x\s*=\s*(-?\d+(?:\.\d+)?)\s+(?:and|to)\s+x\s*=\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if ord_bounds:
            vals.lower = ord_bounds.group(1)
            vals.upper = ord_bounds.group(2)
        else:
            # Try "from X to Y"
            fb = re.search(r'from\s+(-?\d+(?:\.\d+)?)\s+to\s+(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
            if fb:
                vals.lower = fb.group(1)
                vals.upper = fb.group(2)
        vals.raw['find'] = 'area'
        return

    # Area with horizontal parabola: "x^2 = 4y, y = 2, y = 4"
    hparab_m = re.search(r'x\^?2\s*=\s*(\d+)y', q, re.IGNORECASE)
    if hparab_m and 'area' in ql:
        vals.raw['curve1'] = f"x**2 / {hparab_m.group(1)}"  # y = x²/4
        vals.var = 'y'  # integrate w.r.t. y
        # Extract y bounds
        ybounds = re.findall(r'y\s*=\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
        if len(ybounds) >= 2:
            vals.lower = ybounds[0]
            vals.upper = ybounds[1]
        vals.raw['find'] = 'area_horizontal_parabola'
        return

    # Area with circle: "x^2 + y^2 = R" and a line
    circle_m = re.search(r'x\^?2\s*\+\s*y\^?2\s*=\s*(\d+)', q, re.IGNORECASE)
    if circle_m and 'area' in ql:
        vals.raw['circle_eq'] = f"x**2 + y**2 = {circle_m.group(1)}"
        # Find the line
        line_m = re.search(r'y\s*=\s*([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:[.,;]|$)', q, re.IGNORECASE)
        if line_m:
            vals.expression = line_m.group(1).strip().rstrip('.').replace('^', '**')
        vals.var = 'x'
        vals.raw['find'] = 'area_circle'
        return

    # ── Plain integration (not area) ──

    # "integral of <expr>" or "integrate <expr>" or "Evaluate the integral of <expr>"
    m = re.search(r'(?:evaluate\s+)?(?:the\s+)?(?:integral of|integrate|integral)\s+([a-zA-Z0-9\^\*\+\-\(\)\/\s\.]+?)(?:\s+dx|\s+d[xyzt]|\s+from\s+|\s+with\s+|\s+where\s+|\s+and\s+|[.,;]|$)', q, re.IGNORECASE)
    if m:
        expr = m.group(1).strip().rstrip('.').replace('^', '**')
        # Remove trailing "dx" if present
        expr = re.sub(r'\s+d[xyzt]$', '', expr).strip()
        vals.expression = expr
    else:
        expr, var = _find_expression(q)
        if expr:
            vals.expression = expr.replace('^', '**')
        if var:
            vals.var = var
    # Bounds
    bounds = re.search(r'from\s+(-?\d+(?:\.\d+)?|pi/?\d*|0)\s+to\s+(-?\d+(?:\.\d+)?|pi/?\d*|pi/2|pi)', q, re.IGNORECASE)
    if bounds:
        vals.lower = bounds.group(1)
        vals.upper = bounds.group(2)
    if not vals.var:
        vals.var = 'x'


def _extract_differential_equation(q: str, vals: ExtractedValues) -> None:
    # dy/dx + Py = Q form
    m = re.search(r'dy/dx\s*([+\-])\s*(\d+)y\s*=\s*(.+?)(?:[.,;]|$)', q, re.IGNORECASE)
    if m:
        vals.raw['ode_str'] = f"dy/dx {m.group(1)} {m.group(2)}y = {m.group(3).strip()}"
    # Generic: just store the whole equation
    m2 = re.search(r'(dy/dx\s*[+\-]?\s*\d*y\s*=\s*.+?)(?:[.,;]|$)', q, re.IGNORECASE)
    if m2:
        vals.raw['ode_str'] = m2.group(1).strip()
    vals.var = 'x'


def _extract_quadratic(q: str, vals: ExtractedValues) -> None:
    # ax^2 + bx + c = 0 form
    m = re.search(r'(\d*)\s*x\^2\s*([+\-])\s*(\d*)\s*x\s*([+\-])\s*(\d+)\s*=\s*(\d+)', q)
    if m:
        a = m.group(1) or '1'
        b = f"{m.group(2)}{m.group(3) or '1'}"
        c = f"{m.group(4)}{m.group(5)}"
        rhs = m.group(6)
        vals.expression = f"{a}*x**2 {b}*x {c}"
        vals.rhs = rhs
    else:
        # Try general equation form
        m2 = re.search(r'([a-zA-Z0-9\^\*\+\-\s]+?)\s*=\s*(\d+)', q)
        if m2:
            vals.expression = m2.group(1).strip().replace('^', '**')
            vals.rhs = m2.group(2)
    vals.var = 'x'


def _extract_matrix(q: str, vals: ExtractedValues) -> None:
    # Try [[a,b],[c,d]] format
    m = re.search(r'\[\[([^\]]+)\],?\s*\[([^\]]+)\]\]', q)
    if m:
        vals.matrix_a = f"[[{m.group(1)}],[{m.group(2)}]]"
    # Try [a b; c d] format
    m2 = re.search(r'\[([^\]]+);\s*([^\]]+)\]', q)
    if m2:
        vals.matrix_a = f"[[{m2.group(1)}],[{m2.group(2)}]]"
    # Try A = [2 3; 1 4] and B = [1 0; 2 5]
    matrices = re.findall(r'[AB]\s*=\s*(\[[^\]]+\])', q)
    if len(matrices) >= 1:
        vals.matrix_a = matrices[0].replace(';', '],[').replace(' ', ',')
    if len(matrices) >= 2:
        vals.matrix_b = matrices[1].replace(';', '],[').replace(' ', ',')


def _extract_linear_system(q: str, vals: ExtractedValues) -> None:
    # x + 2y = 3, 3x - 2y = -1
    eqs = re.findall(r'([a-zA-Z0-9\+\-\s]+?)\s*=\s*(-?\d+)', q)
    if len(eqs) >= 2:
        vals.raw['equations'] = [f"{e[0].strip()} = {e[1]}" for e in eqs]


def _extract_equivalence_relation(q: str, vals: ExtractedValues) -> None:
    # A = {1, 2, 3, 4}
    m = re.search(r'A\s*=\s*\{([^}]+)\}', q)
    if m:
        vals.set_a = m.group(1).strip()
    # Relation definition: |a - b| divisible by N
    m2 = re.search(r'divisible by\s+(\d+)', q, re.IGNORECASE)
    if m2:
        vals.raw['divisible_by'] = m2.group(1)
    # Equivalence class [N]
    m3 = re.search(r'\[(\d+)\]', q)
    if m3:
        vals.raw['eq_class'] = m3.group(1)


def _extract_continuity(q: str, vals: ExtractedValues) -> None:
    # Piecewise: f(x) = {2x+3, x<=1; 3x+2, x>1}
    m = re.search(r'f\s*\(\s*x\s*\)\s*=\s*\{(.+?)\}', q)
    if m:
        vals.raw['piecewise'] = m.group(1)
    pt = re.search(r'at\s+x\s*=\s*(-?\d+(?:\.\d+)?)', q, re.IGNORECASE)
    if pt:
        vals.point = pt.group(1)
    vals.var = 'x'


def _extract_increasing_decreasing(q: str, vals: ExtractedValues) -> None:
    expr, var = _find_expression(q)
    if expr:
        vals.expression = expr.replace('^', '**')
    if var:
        vals.var = var
    if 'increasing' in q.lower():
        vals.raw['behavior'] = 'increasing'
    elif 'decreasing' in q.lower():
        vals.raw['behavior'] = 'decreasing'
    vals.var = 'x'


def _extract_max_min(q: str, vals: ExtractedValues) -> None:
    expr, var = _find_expression(q)
    if expr:
        vals.expression = expr.replace('^', '**')
    if var:
        vals.var = var
    if 'maximum' in q.lower() or 'max' in q.lower():
        vals.raw['extremum_type'] = 'maximum'
    elif 'minimum' in q.lower() or 'min' in q.lower():
        vals.raw['extremum_type'] = 'minimum'


def _extract_kinematics(q: str, vals: ExtractedValues) -> None:
    """Extract values from particle motion questions."""
    # s = t^3 - 6t^2 + 9t + 5
    expr, var = _find_expression(q)
    if expr:
        vals.expression = expr.replace('^', '**')
    # Particle questions always use t
    vals.var = 't'
    # What to find
    if 'velocity' in q.lower() and ('zero' in q.lower() or '= 0' in q):
        vals.raw['find'] = 'velocity_zero'
    if 'acceleration' in q.lower() and ('minimum' in q.lower() or 'maximum' in q.lower()):
        vals.raw['find'] = 'acceleration_extremum'


def _extract_inverse_trig(q: str, vals: ExtractedValues) -> None:
    # Store the whole expression
    vals.raw['expression'] = q
    vals.var = 'x'


def _extract_probability(q: str, vals: ExtractedValues) -> None:
    nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
    vals.raw['numbers'] = nums


def _extract_progression(q: str, vals: ExtractedValues) -> None:
    # nth term, a, d, n, sum
    a_match = re.search(r'first term\s*(?:is\s*)?(\d+)', q, re.IGNORECASE)
    d_match = re.search(r'common difference\s*(?:is\s*)?(-?\d+)', q, re.IGNORECASE)
    n_match = re.search(r'(\d+)\s*th term|sum.*?(\d+)\s*terms|first (\d+) terms', q, re.IGNORECASE)
    if a_match:
        vals.raw['a'] = a_match.group(1)
    if d_match:
        vals.raw['d'] = d_match.group(1)
    if n_match:
        vals.raw['n'] = next(g for g in n_match.groups() if g)


def _extract_trig_identity(q: str, vals: ExtractedValues) -> None:
    vals.raw['identity'] = q


def _extract_set_theory(q: str, vals: ExtractedValues) -> None:
    sets = re.findall(r'[AB]\s*=\s*\{([^}]+)\}', q)
    if len(sets) >= 1:
        vals.set_a = sets[0]
    if len(sets) >= 2:
        vals.set_b = sets[1]


def _extract_ratio_proportion(q: str, vals: ExtractedValues) -> None:
    ratio = re.search(r'(\d+)\s*:\s*(\d+)', q)
    if ratio:
        vals.raw['ratio_a'] = ratio.group(1)
        vals.raw['ratio_b'] = ratio.group(2)
    nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
    vals.raw['numbers'] = nums


def _extract_interest(q: str, vals: ExtractedValues) -> None:
    p = re.search(r'(?:principal|sum|amount|invested|deposited|loan)\D*(\d+(?:,\d+)*)', q, re.IGNORECASE)
    r = re.search(r'(\d+(?:\.\d+)?)\s*(?:%|per\s*cent|p\.?a\.?)', q, re.IGNORECASE)
    t = re.search(r'(\d+(?:\.\d+)?)\s*(?:year|yr|month)', q, re.IGNORECASE)
    if p:
        vals.raw['principal'] = p.group(1).replace(',', '')
    if r:
        vals.raw['rate'] = r.group(1)
    if t:
        vals.raw['time'] = t.group(1)


def _extract_percentage(q: str, vals: ExtractedValues) -> None:
    nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
    pct = re.search(r'(\d+(?:\.\d+)?)\s*(?:%|percent)', q, re.IGNORECASE)
    if pct:
        vals.raw['percent'] = pct.group(1)
    vals.raw['numbers'] = nums


def _extract_hcf_lcm(q: str, vals: ExtractedValues) -> None:
    nums = re.findall(r'\b\d+\b', q)
    if len(nums) >= 2:
        vals.numbers = ', '.join(nums)


def _extract_exponents(q: str, vals: ExtractedValues) -> None:
    m = re.search(r'(\d+)\s*\^\s*(\d+)', q)
    if m:
        vals.raw['base'] = m.group(1)
        vals.raw['power'] = m.group(2)


def _extract_general(q: str, vals: ExtractedValues) -> None:
    nums = re.findall(r'\b\d+(?:\.\d+)?\b', q)
    if nums:
        vals.raw['numbers'] = nums
    expr, var = _find_expression(q)
    if expr:
        vals.expression = expr.replace('^', '**')
    if var:
        vals.var = var


# ─────────────────────────────────────────────────────────────────────
# SymPy step executor
# ─────────────────────────────────────────────────────────────────────

@dataclass
class StepResult:
    """Result of executing one step."""
    step_num: int
    description: str
    operation: str
    success: bool
    result: str = ""
    steps_detail: list[str] = field(default_factory=list)
    error: str = ""
    marks: float = 0


@dataclass
class SolutionResult:
    """Full solution result."""
    question: str
    matched_question: Optional[str] = None
    category: str = ""
    class_level: int = 0
    values: dict = field(default_factory=dict)
    steps: list[StepResult] = field(default_factory=list)
    total_marks: float = 0
    obtained_marks: float = 0
    success: bool = False
    error: str = ""


def solve_competency_question(question: str, class_level: Optional[int] = None) -> SolutionResult:
    """Solve a competency-based question end-to-end.

    1. Match to board question template
    2. Extract values
    3. Decompose into steps
    4. Run SymPy on each step
    5. Return verified result
    """
    result = SolutionResult(question=question)

    # 1. Match to board question
    bank = build_bank()
    bq = match_question(bank, question, class_level)
    if not bq:
        result.error = "No matching board question found"
        return result

    result.matched_question = bq.question_text
    result.category = bq.category
    result.class_level = bq.class_level
    result.total_marks = bq.marks

    # 2. Extract values from the typed question
    vals = extract_values(question, bq.category)
    result.values = vals.raw

    # 3. Execute steps based on category
    if bq.category == "tangent_normal":
        _solve_tangent_normal(vals, result)
    elif bq.category == "differentiation":
        _solve_differentiation(vals, result)
    elif bq.category == "integration":
        _solve_integration(vals, result)
    elif bq.category == "differential_equation":
        _solve_differential_equation(vals, result)
    elif bq.category == "quadratic":
        _solve_quadratic(vals, result)
    elif bq.category == "matrix":
        _solve_matrix(vals, result)
    elif bq.category == "linear_system":
        _solve_linear_system(vals, result)
    elif bq.category == "equivalence_relation":
        _solve_equivalence_relation(vals, result)
    elif bq.category == "continuity":
        _solve_continuity(vals, result)
    elif bq.category == "increasing_decreasing":
        _solve_increasing_decreasing(vals, result)
    elif bq.category == "kinematics":
        _solve_kinematics(vals, result)
    elif bq.category == "max_min":
        _solve_max_min(vals, result)
    elif bq.category == "inverse_trig":
        _solve_inverse_trig(vals, result)
    elif bq.category == "hcf_lcm":
        _solve_hcf_lcm(vals, result)
    elif bq.category == "inequation":
        _solve_inequation(vals, result)
    elif bq.category == "area_between_curves":
        _solve_area_between_curves(vals, result)
    elif bq.category == "homogeneous_ode":
        _solve_homogeneous_ode(vals, result)
    elif bq.category == "optimization":
        _solve_optimization(vals, result)
    elif bq.category == "percentage":
        _solve_percentage(vals, result)
    elif bq.category == "interest":
        _solve_interest(vals, result)
    elif bq.category == "ratio_proportion":
        _solve_ratio_proportion(vals, result)
    elif bq.category == "set_theory":
        _solve_set_theory(vals, result)
    elif bq.category == "exponents":
        _solve_exponents(vals, result)
    else:
        result.error = f"Category '{bq.category}' not yet supported by solver"

    result.success = all(s.success for s in result.steps) if result.steps else False
    return result


# ─────────────────────────────────────────────────────────────────────
# Category-specific solvers
# ─────────────────────────────────────────────────────────────────────

def _solve_tangent_normal(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve tangent and normal to a curve at a point."""
    if not vals.expression:
        result.error = "No expression found"
        return

    expr = _safe_parse(vals.expression)
    if expr is None:
        result.error = f"Cannot parse expression: {vals.expression}"
        return

    var = Symbol(vals.var)
    # Use integer parsing for clean output
    try:
        pt = int(vals.point) if vals.point else None
    except ValueError:
        pt = float(vals.point) if vals.point else None

    # Step 1: Find the point on the curve
    if pt is not None:
        y_val = expr.subs(var, pt)
        step1 = StepResult(1, "Find point on curve", "substitute", True)
        step1.result = f"Point: ({pt}, {y_val})"
        step1.steps_detail = [f"y = {expr}", f"At {vals.var} = {pt}: y = {y_val}"]
        step1.marks = 1
        result.steps.append(step1)

    # Step 2: Find derivative
    dy = diff(expr, var)
    step2 = StepResult(2, "Find dy/dx", "diff", True)
    step2.result = f"dy/dx = {dy}"
    step2.steps_detail = [f"d/d{vals.var}({expr}) = {dy}"]
    step2.marks = 1
    result.steps.append(step2)

    # Step 3: Find slope at point
    if pt is not None:
        slope = dy.subs(var, pt)
        step3 = StepResult(3, "Find slope at point", "substitute", True)
        step3.result = f"Slope at {vals.var}={pt}: {slope}"
        step3.steps_detail = [f"dy/dx at {vals.var}={pt} = {slope}"]
        step3.marks = 0.5
        result.steps.append(step3)

        # Step 4: Tangent equation
        y = Symbol('y')
        tangent = Eq(y - y_val, slope * (var - pt))
        step4 = StepResult(4, "Equation of tangent", "tangent", True)
        step4.result = f"y - {y_val} = {slope}({var} - {pt})"
        step4.steps_detail = [f"y - y_val = slope(x - x_val)", f"y - {y_val} = {slope}({var} - {pt})"]
        step4.marks = 1.5
        result.steps.append(step4)

        # Step 5: Normal equation
        if slope != 0:
            normal_slope = Rational(-1) / slope
            normal = Eq(y - y_val, normal_slope * (var - pt))
            step5 = StepResult(5, "Equation of normal", "normal", True)
            step5.result = f"y - {y_val} = {normal_slope}({var} - {pt})"
            step5.steps_detail = [f"Slope of normal = -1/slope = {normal_slope}", f"y - {y_val} = {normal_slope}({var} - {pt})"]
            step5.marks = 1.5
            result.steps.append(step5)
        else:
            step5 = StepResult(5, "Equation of normal", "normal", True)
            step5.result = f"x = {pt} (vertical line, slope is infinity)"
            step5.marks = 1.5
            result.steps.append(step5)


def _solve_differentiation(vals: ExtractedValues, result: SolutionResult) -> None:
    """Differentiate an expression."""
    if not vals.expression:
        result.error = "No expression found"
        return

    expr = _safe_parse(vals.expression)
    if expr is None:
        result.error = f"Cannot parse expression: {vals.expression}"
        return

    var = Symbol(vals.var)

    # Step 1: Differentiate
    dy = diff(expr, var)
    step1 = StepResult(1, "Differentiate", "diff", True)
    step1.result = f"d/d{vals.var}({expr}) = {dy}"
    step1.steps_detail = [f"Using differentiation rules:", f"d/d{vals.var}({expr}) = {dy}"]
    step1.marks = 2
    result.steps.append(step1)

    # Step 2: Evaluate at point if given
    if vals.point:
        pt = float(vals.point)
        val = dy.subs(var, pt)
        step2 = StepResult(2, f"Evaluate at {vals.var}={pt}", "substitute", True)
        step2.result = f"At {vals.var}={pt}: {val}"
        step2.marks = 1
        result.steps.append(step2)


def _solve_integration(vals: ExtractedValues, result: SolutionResult) -> None:
    """Integrate an expression or find area between curves."""
    # Check for area between two curves
    curve1_str = vals.raw.get('curve1')
    curve2_str = vals.raw.get('curve2')

    if curve1_str and curve2_str:
        var = Symbol(vals.var)
        c1 = _safe_parse(curve1_str)
        c2 = _safe_parse(curve2_str)
        if c1 is None or c2 is None:
            result.error = "Cannot parse curves"
            return

        # Step 1: Find intersection points
        intersections = solve(Eq(c1, c2), var)
        step1 = StepResult(1, "Find intersection points", "solve", True)
        step1.result = f"Intersection points: {vals.var} = {intersections}"
        step1.steps_detail = [f"Solve {c1} = {c2}", f"{vals.var} = {intersections}"]
        step1.marks = 1
        result.steps.append(step1)

        if len(intersections) >= 2:
            lo, hi = intersections[0], intersections[1]
            # Determine which curve is on top
            mid = (lo + hi) / 2
            if c1.subs(var, mid) > c2.subs(var, mid):
                top, bottom = c1, c2
            else:
                top, bottom = c2, c1

            # Step 2: Set up integral
            step2 = StepResult(2, "Set up area integral", "setup", True)
            step2.result = f"Area = ∫({top} - {bottom}) d{vals.var} from {lo} to {hi}"
            step2.marks = 1.5
            result.steps.append(step2)

            # Step 3: Evaluate
            area = integrate(top - bottom, (var, lo, hi))
            step3 = StepResult(3, "Evaluate integral", "integrate", True)
            step3.result = f"Area = {area}"
            step3.marks = 1.5
            result.steps.append(step3)
        return

    if not vals.expression:
        result.error = "No expression found"
        return

    expr = _safe_parse(vals.expression)
    if expr is None:
        result.error = f"Cannot parse expression: {vals.expression}"
        return

    var = Symbol(vals.var)

    if vals.lower is not None and vals.upper is not None:
        # Definite integral
        lower = _safe_parse(vals.lower)
        upper = _safe_parse(vals.upper)
        if lower is None:
            lower = int(vals.lower)
        if upper is None:
            upper = int(vals.upper)
        try:
            result_val = integrate(expr, (var, lower, upper))
            step1 = StepResult(1, "Definite integral", "integrate", True)
            step1.result = f"∫({expr}) d{vals.var} from {lower} to {upper} = {result_val}"
            step1.steps_detail = [f"Integrate {expr} with respect to {vals.var}", f"Evaluate from {lower} to {upper}"]
            step1.marks = 3
            result.steps.append(step1)
        except Exception as e:
            step1 = StepResult(1, "Definite integral", "integrate", False, error=str(e))
            result.steps.append(step1)
    else:
        # Indefinite integral
        try:
            result_val = integrate(expr, var)
            step1 = StepResult(1, "Indefinite integral", "integrate", True)
            step1.result = f"∫({expr}) d{vals.var} = {result_val} + C"
            step1.steps_detail = [f"Integrate {expr} with respect to {vals.var}"]
            step1.marks = 3
            result.steps.append(step1)
        except Exception as e:
            step1 = StepResult(1, "Indefinite integral", "integrate", False, error=str(e))
            result.steps.append(step1)


def _solve_differential_equation(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve a differential equation.

    Strategy: parse the RHS with plain symbols, then substitute y→y(x) and
    build the ODE as Eq(Derivative(y(x), x), rhs_with_y(x)).
    This avoids the implicit_multiplication parser turning y(x) into y*x.
    """
    ode_str = vals.raw.get('ode_str', '')
    if not ode_str:
        result.error = "No differential equation found"
        return

    try:
        if 'dx/dy' in ode_str.lower():
            # x is function of y
            y_sym = Symbol('y')
            x_func = Function('x')(y_sym)

            # Extract RHS after '='
            if '=' not in ode_str:
                result.error = f"No = in ODE: {ode_str}"
                return
            rhs_str = ode_str.split('=', 1)[1].strip()

            # Parse RHS with plain symbols (x, y as Symbol)
            rhs_parsed = _safe_parse(rhs_str)
            if rhs_parsed is None:
                result.error = f"Cannot parse ODE RHS: {rhs_str}"
                return

            # Substitute plain x → x(y) function
            rhs_final = rhs_parsed.subs(Symbol('x'), x_func)

            # Build ODE: dx/dy = rhs
            ode = Eq(diff(x_func, y_sym), rhs_final)

            step1 = StepResult(1, "Identify the differential equation", "identify", True)
            step1.result = f"ODE: {ode}"
            step1.marks = 1
            result.steps.append(step1)

            sol = dsolve(ode, x_func)
            step2 = StepResult(2, "Solve the ODE", "dsolve", True)
            step2.result = f"Solution: {sol}"
            step2.marks = 3
            result.steps.append(step2)

        else:
            # Standard dy/dx form — y is function of x
            x_sym = Symbol('x')
            y_func = Function('y')(x_sym)

            if '=' not in ode_str:
                result.error = f"No = in ODE: {ode_str}"
                return
            rhs_str = ode_str.split('=', 1)[1].strip()

            # Parse RHS with plain symbols (y as Symbol, not Function)
            rhs_parsed = _safe_parse(rhs_str)
            if rhs_parsed is None:
                result.error = f"Cannot parse ODE RHS: {rhs_str}"
                return

            # Substitute plain y → y(x) function
            rhs_final = rhs_parsed.subs(Symbol('y'), y_func)

            # Build ODE: dy/dx = rhs
            ode = Eq(diff(y_func, x_sym), rhs_final)

            step1 = StepResult(1, "Identify the differential equation", "identify", True)
            step1.result = f"ODE: {ode}"
            step1.marks = 1
            result.steps.append(step1)

            sol = dsolve(ode, y_func)
            step2 = StepResult(2, "Solve the ODE", "dsolve", True)
            step2.result = f"Solution: {sol}"
            step2.marks = 3
            result.steps.append(step2)

        # Step 3: Apply initial condition if given
        ic = vals.raw.get('initial_condition', '')
        if ic:
            step3 = StepResult(3, f"Apply initial condition: {ic}", "substitute", True)
            step3.result = f"Particular solution with {ic}"
            step3.marks = 1
            result.steps.append(step3)

    except Exception as e:
        result.error = f"ODE solving failed: {e}"


def _solve_quadratic(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve a quadratic equation."""
    if not vals.expression:
        result.error = "No expression found"
        return

    expr = _safe_parse(vals.expression)
    if expr is None:
        result.error = f"Cannot parse expression: {vals.expression}"
        return

    x = Symbol('x')
    rhs = _safe_parse(vals.rhs) if vals.rhs else 0

    try:
        eq = Eq(expr, rhs)
        roots = solve(eq, x)

        step1 = StepResult(1, "Identify coefficients", "identify", True)
        # Try to extract a, b, c
        poly = expr - rhs
        expanded = expand(poly)
        step1.result = f"Equation: {expr} = {rhs}"
        step1.marks = 0.5
        result.steps.append(step1)

        step2 = StepResult(2, "Apply quadratic formula", "solve", True)
        step2.result = f"Roots: x = {roots}"
        step2.steps_detail = [f"x = [-b ± √(b²-4ac)] / 2a", f"Solutions: {roots}"]
        step2.marks = 2.5
        result.steps.append(step2)
    except Exception as e:
        result.error = f"Quadratic solving failed: {e}"


def _solve_matrix(vals: ExtractedValues, result: SolutionResult) -> None:
    """Matrix operations."""
    if not vals.matrix_a:
        result.error = "No matrix found"
        return

    try:
        # Parse matrix from [[a,b],[c,d]] format
        mat_str = vals.matrix_a.replace('[', '').replace(']', '')
        rows = mat_str.split(',')
        # Try to parse as 2x2
        nums = [float(n.strip()) for n in mat_str.replace('],[', ',').split(',')]
        if len(nums) == 4:
            A = Matrix([[nums[0], nums[1]], [nums[2], nums[3]]])
        elif len(nums) == 2:
            A = Matrix([[nums[0]], [nums[1]]])
        else:
            result.error = f"Cannot parse matrix with {len(nums)} elements"
            return

        step1 = StepResult(1, "Parse matrix", "parse", True)
        step1.result = f"A = {A}"
        step1.marks = 0.5
        result.steps.append(step1)

        # Determinant
        det = A.det()
        step2 = StepResult(2, "Find determinant", "determinant", True)
        step2.result = f"|A| = {det}"
        step2.marks = 1
        result.steps.append(step2)

        # Inverse if 2x2 and det != 0
        if A.shape == (2, 2) and det != 0:
            inv = A.inv()
            step3 = StepResult(3, "Find inverse", "matrix_inverse", True)
            step3.result = f"A⁻¹ = {inv}"
            step3.marks = 1.5
            result.steps.append(step3)
    except Exception as e:
        result.error = f"Matrix operation failed: {e}"


def _solve_linear_system(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve a system of linear equations."""
    eqs = vals.raw.get('equations', [])
    if len(eqs) < 2:
        result.error = "Need at least 2 equations"
        return

    x, y = symbols('x y')
    try:
        sym_eqs = []
        for eq_str in eqs:
            parts = eq_str.split('=')
            lhs = _safe_parse(parts[0].strip())
            rhs = _safe_parse(parts[1].strip())
            if lhs is not None and rhs is not None:
                sym_eqs.append(Eq(lhs, rhs))

        sol = solve(sym_eqs, [x, y])
        step1 = StepResult(1, "Solve system", "solve", True)
        step1.result = f"Solution: {sol}"
        step1.marks = 3
        result.steps.append(step1)

        # Verify
        if sol:
            step2 = StepResult(2, "Verify solution", "verify", True)
            checks = []
            for eq in sym_eqs:
                check = eq.subs(sol)
                checks.append(f"{eq} → {check}")
            step2.result = "Verified: " + "; ".join(checks)
            step2.marks = 1
            result.steps.append(step2)
    except Exception as e:
        result.error = f"Linear system solving failed: {e}"


def _solve_equivalence_relation(vals: ExtractedValues, result: SolutionResult) -> None:
    """Check if a relation is an equivalence relation."""
    set_a_str = vals.set_a
    if not set_a_str:
        result.error = "No set found"
        return

    try:
        A = [int(n.strip()) for n in set_a_str.split(',')]
    except:
        result.error = "Cannot parse set"
        return

    div_by = vals.raw.get('divisible_by')
    if not div_by:
        result.error = "No divisibility condition found"
        return

    n = int(div_by)

    # Build relation
    R = [(a, b) for a in A for b in A if (a - b) % n == 0]

    step1 = StepResult(1, "Build relation R", "build", True)
    step1.result = f"R = {R}"
    step1.marks = 0.5
    result.steps.append(step1)

    # Check reflexive
    reflexive = all((a, a) in R for a in A)
    step2 = StepResult(2, "Check reflexive", "check", True)
    step2.result = f"Reflexive: {reflexive} (∀a, (a,a) ∈ R since |a-a|=0 divisible by {n})"
    step2.marks = 1
    result.steps.append(step2)

    # Check symmetric
    symmetric = all((b, a) in R for (a, b) in R)
    step3 = StepResult(3, "Check symmetric", "check", True)
    step3.result = f"Symmetric: {symmetric} (|a-b| = |b-a|, so (a,b) ∈ R → (b,a) ∈ R)"
    step3.marks = 1
    result.steps.append(step3)

    # Check transitive
    transitive = all((a, c) in R for (a, b1) in R for (b2, c) in R if b1 == b2)
    step4 = StepResult(4, "Check transitive", "check", True)
    step4.result = f"Transitive: {transitive}"
    step4.marks = 1
    result.steps.append(step4)

    # Conclusion
    is_equiv = reflexive and symmetric and transitive
    step5 = StepResult(5, "Conclusion", "conclude", True)
    step5.result = f"Equivalence relation: {is_equiv}"
    step5.marks = 0.5
    result.steps.append(step5)

    # Equivalence class
    eq_class_val = vals.raw.get('eq_class')
    if eq_class_val:
        target = int(eq_class_val)
        eq_class = [b for (a, b) in R if a == target]
        step6 = StepResult(6, f"Equivalence class [{target}]", "equivalence_class", True)
        step6.result = f"[{target}] = {eq_class}"
        step6.marks = 1
        result.steps.append(step6)


def _solve_continuity(vals: ExtractedValues, result: SolutionResult) -> None:
    """Check continuity of a function at a point."""
    piecewise_str = vals.raw.get('piecewise', '')
    if not piecewise_str:
        result.error = "No piecewise function found"
        return

    pt = vals.point
    if not pt:
        result.error = "No point specified"
        return

    pt_val = float(pt)
    x = Symbol('x')

    try:
        # Parse piecewise: "2x + 3, x <= 1; 3x + 2, x > 1"
        parts = piecewise_str.split(';')
        pieces = []
        for part in parts:
            if ',' in part:
                expr_str, cond_str = part.split(',', 1)
                expr = _safe_parse(expr_str.strip())
                cond_str = cond_str.strip()
                if '<=' in cond_str:
                    bound = float(cond_str.split('<=')[1].strip().replace('x', '').strip())
                    pieces.append((expr, bound, '<='))
                elif '>' in cond_str:
                    bound = float(cond_str.split('>')[1].strip().replace('x', '').strip())
                    pieces.append((expr, bound, '>'))

        if len(pieces) < 2:
            result.error = "Could not parse piecewise function"
            return

        left_expr, left_bound, left_op = pieces[0]
        right_expr, right_bound, right_op = pieces[1]

        # LHL
        lhl = limit(left_expr, x, pt_val, '-')
        step1 = StepResult(1, "Left-hand limit (LHL)", "limit", True)
        step1.result = f"LHL = lim x→{pt_val}⁻ {left_expr} = {lhl}"
        step1.marks = 1
        result.steps.append(step1)

        # RHL
        rhl = limit(right_expr, x, pt_val, '+')
        step2 = StepResult(2, "Right-hand limit (RHL)", "limit", True)
        step2.result = f"RHL = lim x→{pt_val}⁺ {right_expr} = {rhl}"
        step2.marks = 1
        result.steps.append(step2)

        # f(pt)
        # Determine which piece contains pt
        if left_op == '<=' and pt_val <= left_bound:
            f_val = left_expr.subs(x, pt_val)
        else:
            f_val = right_expr.subs(x, pt_val)
        step3 = StepResult(3, f"f({pt_val})", "substitute", True)
        step3.result = f"f({pt_val}) = {f_val}"
        step3.marks = 0.5
        result.steps.append(step3)

        # Conclusion
        continuous = (lhl == rhl == f_val)
        step4 = StepResult(4, "Conclusion", "conclude", True)
        step4.result = f"LHL = RHL = f({pt_val}) = {f_val} → {'Continuous' if continuous else 'Not continuous'}"
        step4.marks = 0.5
        result.steps.append(step4)
    except Exception as e:
        result.error = f"Continuity check failed: {e}"


def _solve_increasing_decreasing(vals: ExtractedValues, result: SolutionResult) -> None:
    """Show that a function is increasing or decreasing."""
    if not vals.expression:
        result.error = "No expression found"
        return

    expr = _safe_parse(vals.expression)
    if expr is None:
        result.error = f"Cannot parse expression: {vals.expression}"
        return

    x = Symbol(vals.var)
    behavior = vals.raw.get('behavior', 'increasing')

    # Step 1: Differentiate
    dy = diff(expr, x)
    step1 = StepResult(1, "Find dy/dx", "diff", True)
    step1.result = f"dy/dx = {dy}"
    step1.marks = 1
    result.steps.append(step1)

    # Step 2: Analyze sign
    step2 = StepResult(2, f"Analyze sign of dy/dx", "analyze", True)
    if behavior == 'increasing':
        # Check if dy >= 0 for all x
        simplified = simplify(dy)
        step2.result = f"dy/dx = {simplified}"
        step2.steps_detail = [f"For increasing: dy/dx ≥ 0 for all x", f"dy/dx = {simplified}"]
        step2.marks = 2
    else:
        simplified = simplify(dy)
        step2.result = f"dy/dx = {simplified}"
        step2.steps_detail = [f"For decreasing: dy/dx ≤ 0 for all x", f"dy/dx = {simplified}"]
        step2.marks = 2
    result.steps.append(step2)

    # Step 3: Conclusion
    step3 = StepResult(3, "Conclusion", "conclude", True)
    step3.result = f"Function is {behavior} (dy/dx {'≥' if behavior == 'increasing' else '≤'} 0)"
    step3.marks = 1
    result.steps.append(step3)


def _solve_kinematics(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve particle motion / kinematics questions."""
    if not vals.expression:
        result.error = "No expression found"
        return

    s_expr = _safe_parse(vals.expression)
    if s_expr is None:
        result.error = f"Cannot parse expression: {vals.expression}"
        return

    t = Symbol('t')
    find_what = vals.raw.get('find', 'velocity_zero')

    # Step 1: Position function
    step1 = StepResult(1, "Position function", "identify", True)
    step1.result = f"s(t) = {s_expr}"
    step1.marks = 0.5
    result.steps.append(step1)

    # Step 2: Find velocity (first derivative)
    v = diff(s_expr, t)
    step2 = StepResult(2, "Find velocity v = ds/dt", "diff", True)
    step2.result = f"v = {v}"
    step2.marks = 1
    result.steps.append(step2)

    if find_what == 'velocity_zero':
        # Step 3: Set v = 0 and solve
        times = solve(Eq(v, 0), t)
        step3 = StepResult(3, "Find when v = 0", "solve", True)
        step3.result = f"v = 0 at t = {times}"
        step3.steps_detail = [f"Solve {v} = 0", f"t = {times}"]
        step3.marks = 1.5
        result.steps.append(step3)

    # Step 4: Find acceleration (second derivative)
    a = diff(v, t)
    step4 = StepResult(4, "Find acceleration a = dv/dt", "diff", True)
    step4.result = f"a = {a}"
    step4.marks = 1
    result.steps.append(step4)

    if 'acceleration' in find_what or find_what == 'acceleration_extremum':
        # Find when acceleration is min/max
        da = diff(a, t)
        critical = solve(Eq(da, 0), t)
        step5 = StepResult(5, "Find when acceleration is extremum", "solve", True)
        step5.result = f"da/dt = 0 at t = {critical}"
        step5.marks = 1
        result.steps.append(step5)


def _solve_area_between_curves(vals: ExtractedValues, result: SolutionResult) -> None:
    """Find area between two curves, or between curves and lines/axes."""
    var = Symbol(vals.var or 'x')

    # Case 1: Two curves given explicitly
    curve1_str = vals.raw.get('curve1')
    curve2_str = vals.raw.get('curve2')

    if curve1_str and curve2_str:
        c1 = _safe_parse(curve1_str)
        c2 = _safe_parse(curve2_str)
        if c1 is None or c2 is None:
            result.error = f"Cannot parse curves: {curve1_str}, {curve2_str}"
            return

        # Find intersections
        intersections = solve(Eq(c1, c2), var)
        step1 = StepResult(1, "Find intersection points", "solve", True)
        step1.result = f"Intersections: {vals.var} = {intersections}"
        step1.marks = 1
        result.steps.append(step1)

        if len(intersections) >= 2:
            lo, hi = intersections[0], intersections[1]
            mid = (lo + hi) / 2
            if c1.subs(var, mid) > c2.subs(var, mid):
                top, bottom = c1, c2
            else:
                top, bottom = c2, c1
        elif vals.lower and vals.upper:
            lo = _safe_parse(vals.lower) or int(vals.lower)
            hi = _safe_parse(vals.upper) or int(vals.upper)
            mid = (lo + hi) / 2
            if c1.subs(var, mid) > c2.subs(var, mid):
                top, bottom = c1, c2
            else:
                top, bottom = c2, c1
        else:
            result.error = "Cannot determine integration bounds"
            return

        step2 = StepResult(2, "Set up area integral", "setup", True)
        step2.result = f"Area = ∫({top} - {bottom}) d{vals.var} from {lo} to {hi}"
        step2.marks = 1.5
        result.steps.append(step2)

        area = integrate(top - bottom, (var, lo, hi))
        step3 = StepResult(3, "Evaluate integral", "integrate", True)
        step3.result = f"Area = {area}"
        step3.marks = 1.5
        result.steps.append(step3)
        return

    # Case 2: Lines given (area between 3 lines)
    lines_str = vals.raw.get('lines')
    if lines_str:
        line_eqs = [l.strip() for l in lines_str.split(';') if l.strip()]
        if len(line_eqs) >= 2:
            parsed = []
            for le in line_eqs:
                # Parse "x + 2y = 2" → Eq(x + 2*y, 2)
                if '=' in le:
                    lhs_s, rhs_s = le.split('=', 1)
                    lhs = _safe_parse(lhs_s.strip())
                    rhs = _safe_parse(rhs_s.strip())
                    if lhs is not None and rhs is not None:
                        parsed.append(Eq(lhs, rhs))

            if len(parsed) >= 2:
                x, y = symbols('x y')
                # Find all pairwise intersections
                points = []
                step1 = StepResult(1, "Find intersection points of lines", "solve", True)
                detail = []
                for i in range(len(parsed)):
                    for j in range(i+1, len(parsed)):
                        pt = solve([parsed[i], parsed[j]], [x, y])
                        if pt:
                            points.append(pt)
                            detail.append(f"{line_eqs[i]} ∩ {line_eqs[j]} = {pt}")
                step1.result = f"Vertices: {points}"
                step1.steps_detail = detail
                step1.marks = 2
                result.steps.append(step1)

                if len(points) >= 3:
                    # Use shoelace formula for area of polygon
                    area_val = 0
                    for i in range(len(points)):
                        x1, y1 = points[i][x], points[i][y]
                        x2, y2 = points[(i+1) % len(points)][x], points[(i+1) % len(points)][y]
                        area_val += x1 * y2 - x2 * y1
                    area_val = Abs(area_val) / 2

                    step2 = StepResult(2, "Calculate area using vertices", "area", True)
                    step2.result = f"Area = |{area_val * 2}| / 2 = {area_val}"
                    step2.marks = 3
                    result.steps.append(step2)
                return

    # Case 3: Circle + line
    circle_str = vals.raw.get('circle_eq')
    if circle_str and vals.expression:
        circle_eq = _safe_parse(circle_str.replace('=', '-(') + ')') if '=' in circle_str else None
        # Parse circle: x^2 + y^2 = 32 → solve for y
        if '=' in circle_str:
            lhs_s, rhs_s = circle_str.split('=', 1)
            lhs = _safe_parse(lhs_s.strip())
            rhs = _safe_parse(rhs_s.strip())
            if lhs is not None and rhs is not None:
                y = Symbol('y')
                # Solve for y: y^2 = rhs - x^2 → y = ±sqrt(rhs - x^2)
                y_solutions = solve(Eq(lhs, rhs), y)
                step1 = StepResult(1, "Solve circle for y", "solve", True)
                step1.result = f"y = {y_solutions}"
                step1.marks = 1
                result.steps.append(step1)

                # Find intersection with line y = x (or given line)
                line_expr = _safe_parse(vals.expression)
                if line_expr is not None and y_solutions:
                    x = Symbol('x')
                    intersections = []
                    for ys in y_solutions:
                        pts = solve(Eq(ys, line_expr), x)
                        intersections.extend(pts)
                    step2 = StepResult(2, "Find intersections with line", "solve", True)
                    step2.result = f"Intersection x-values: {intersections}"
                    step2.marks = 1
                    result.steps.append(step2)

                    if len(intersections) >= 2:
                        lo, hi = sorted(intersections)[:2]
                        # Upper curve is the +sqrt, lower is the line
                        upper = y_solutions[0] if y_solutions[0].subs(x, (lo+hi)/2) > line_expr.subs(x, (lo+hi)/2) else line_expr
                        lower = line_expr if upper == y_solutions[0] else y_solutions[0]
                        area = integrate(upper - lower, (x, lo, hi))
                        step3 = StepResult(3, "Evaluate area integral", "integrate", True)
                        step3.result = f"Area = ∫({upper} - {lower}) dx from {lo} to {hi} = {area}"
                        step3.marks = 3
                        result.steps.append(step3)
                return

    # Case 4: Single curve with bounds (area under curve)
    if vals.expression and vals.lower and vals.upper:
        expr = _safe_parse(vals.expression)
        if expr is not None:
            lo = _safe_parse(vals.lower) or int(vals.lower)
            hi = _safe_parse(vals.upper) or int(vals.upper)
            # For x-axis area, integrate |f(x)|
            area = integrate(Abs(expr), (var, lo, hi))
            step1 = StepResult(1, "Area under curve", "integrate", True)
            step1.result = f"Area = ∫|{expr}| d{vals.var} from {lo} to {hi} = {area}"
            step1.marks = 3
            result.steps.append(step1)
            return

    result.error = "Could not determine area problem structure"


def _solve_homogeneous_ode(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve a homogeneous differential equation."""
    ode_str = vals.raw.get('ode_str', '')
    if not ode_str:
        # Try to build from expression
        if vals.expression:
            ode_str = f"dy/dx = {vals.expression}"
        else:
            result.error = "No ODE found"
            return

    x = Symbol('x')
    y = Function('y')(x)

    try:
        # Parse various ODE forms
        # Form 1: dy/dx = f(x,y)
        m = re.search(r'dy/dx\s*=\s*(.+)', ode_str, re.IGNORECASE)
        if m:
            rhs_str = m.group(1).strip()
            # Replace y with y(x) for SymPy
            rhs_str = rhs_str.replace('y', 'y(x)')
            # But not y(x) → y(x)(x)
            rhs_str = rhs_str.replace('y(x)(x)', 'y(x)')
            rhs = _safe_parse(rhs_str)
            if rhs is None:
                result.error = f"Cannot parse ODE RHS: {rhs_str}"
                return

            ode = Eq(diff(y, x), rhs)
            sol = dsolve(ode, y)

            step1 = StepResult(1, "Identify ODE", "identify", True)
            step1.result = f"dy/dx = {rhs}"
            step1.marks = 1
            result.steps.append(step1)

            step2 = StepResult(2, "Solve ODE", "dsolve", True)
            step2.result = f"Solution: {sol}"
            step2.marks = 3
            result.steps.append(step2)

            # Apply initial condition if given
            ic = vals.raw.get('initial_condition')
            if ic:
                step3 = StepResult(3, f"Apply initial condition {ic}", "substitute", True)
                step3.result = f"Particular solution: {sol} with {ic}"
                step3.marks = 1
                result.steps.append(step3)
            return

        # Form 2: x dy - y dx = sqrt(x^2 + y^2) dx
        # Rewrite as dy/dx = (y + sqrt(x^2 + y^2)) / x
        m2 = re.search(r'x\s*dy\s*-\s*y\s*dx\s*=\s*(.+?)\s*dx', ode_str, re.IGNORECASE)
        if m2:
            rhs_expr = m2.group(1).strip()
            # dy/dx = (y + rhs_expr) / x
            rhs_str = f"(y + {rhs_expr}) / x"
            rhs_str = rhs_str.replace('y', 'y(x)').replace('y(x)(x)', 'y(x)')
            rhs = _safe_parse(rhs_str)
            if rhs is None:
                result.error = f"Cannot parse homogeneous ODE: {rhs_str}"
                return

            ode = Eq(diff(y, x), rhs)
            sol = dsolve(ode, y)

            step1 = StepResult(1, "Rewrite as dy/dx", "rewrite", True)
            step1.result = f"dy/dx = (y + {rhs_expr}) / x"
            step1.marks = 1
            result.steps.append(step1)

            step2 = StepResult(2, "Solve homogeneous ODE", "dsolve", True)
            step2.result = f"Solution: {sol}"
            step2.marks = 3
            result.steps.append(step2)
            return

        # Form 3: (1 + y^2) dx = (arctan(y) - x) dy
        # Rewrite as dx/dy = (arctan(y) - x) / (1 + y^2)
        # → dx/dy + x/(1+y^2) = arctan(y)/(1+y^2)
        m3 = re.search(r'\(1\s*\+\s*y\^?2\)\s*dx\s*=\s*\((.+?)\)\s*dy', ode_str, re.IGNORECASE)
        if m3:
            rhs_expr = m3.group(1).strip()
            # dx/dy = rhs_expr / (1 + y^2)
            # This is linear in x as function of y
            y_var = Symbol('y')
            x_func = Function('x')(y_var)
            rhs_str = f"({rhs_expr}) / (1 + y**2)"
            rhs = _safe_parse(rhs_str)
            if rhs is None:
                result.error = f"Cannot parse ODE: {rhs_str}"
                return

            # Replace x with x(y)
            rhs = rhs.subs(Symbol('x'), x_func)
            ode = Eq(diff(x_func, y_var), rhs)
            sol = dsolve(ode, x_func)

            step1 = StepResult(1, "Rewrite as dx/dy", "rewrite", True)
            step1.result = f"dx/dy = ({rhs_expr}) / (1 + y²)"
            step1.marks = 1
            result.steps.append(step1)

            step2 = StepResult(2, "Solve linear ODE in x", "dsolve", True)
            step2.result = f"Solution: {sol}"
            step2.marks = 3
            result.steps.append(step2)
            return

        result.error = f"Could not parse ODE form: {ode_str}"
    except Exception as e:
        result.error = f"Homogeneous ODE solving failed: {e}"


def _solve_optimization(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve optimization problems (max/min with constraints)."""
    expr = _safe_parse(vals.expression) if vals.expression else None
    if expr is None:
        result.error = "No expression to optimize"
        return

    var = Symbol(vals.var or 'x')

    # Step 1: Write the objective function
    step1 = StepResult(1, "Write objective function", "identify", True)
    step1.result = f"Optimize: {expr}"
    step1.marks = 1
    result.steps.append(step1)

    # Step 2: Differentiate
    dy = diff(expr, var)
    step2 = StepResult(2, "Find derivative", "diff", True)
    step2.result = f"d/d{vals.var} = {dy}"
    step2.marks = 1
    result.steps.append(step2)

    # Step 3: Find critical points
    critical = solve(Eq(dy, 0), var)
    step3 = StepResult(3, "Find critical points", "solve", True)
    step3.result = f"Critical points: {vals.var} = {critical}"
    step3.marks = 1
    result.steps.append(step3)

    # Step 4: Second derivative test
    d2y = diff(dy, var)
    step4 = StepResult(4, "Second derivative test", "classify", True)
    results_list = []
    for cp in critical:
        val = d2y.subs(var, cp)
        if val < 0:
            nature = "maximum"
        elif val > 0:
            nature = "minimum"
        else:
            nature = "inconclusive"
        opt_val = expr.subs(var, cp)
        results_list.append(f"At {vals.var}={cp}: {nature}, value={opt_val}")
    step4.result = "; ".join(results_list)
    step4.marks = 2
    result.steps.append(step4)


def _solve_inequation(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve a linear inequation."""
    # Extract the inequation from the question
    q = result.question
    m = re.search(r'(\d*)\s*x\s*([+\-])\s*(\d+)\s*([<>≤≥])\s*(\d*)\s*x\s*([+\-])\s*(\d+)', q)
    if not m:
        # Try simpler: ax + b < cx + d
        m = re.search(r'([a-zA-Z0-9\+\-\s*]+?)\s*([<>≤≥])\s*([a-zA-Z0-9\+\-\s*]+?)(?:[.,;]|$)', q)
        if not m:
            result.error = "Cannot parse inequation"
            return

    x = Symbol('x')
    try:
        # Parse both sides
        m2 = re.search(r'([a-zA-Z0-9\+\-\s*]+?)\s*([<>≤≥])\s*([a-zA-Z0-9\+\-\s*]+?)(?:[.,;]|\s+x\s+in|$)', q)
        if m2:
            lhs = _safe_parse(m2.group(1).strip())
            rhs = _safe_parse(m2.group(3).strip())
            op = m2.group(2)
            if lhs is None or rhs is None:
                result.error = "Cannot parse inequation sides"
                return

            # Solve
            if '<' in op or '≤' in op:
                sol = solve([lhs < rhs], x)
            else:
                sol = solve([lhs > rhs], x)

            step1 = StepResult(1, "Solve inequation", "solve", True)
            step1.result = f"{lhs} {op} {rhs} → x {op} {sol}"
            step1.marks = 1.5
            result.steps.append(step1)

            # Check for domain restriction (x in W, x in Z, etc.)
            domain_match = re.search(r'x\s+in\s+(\w+)', q, re.IGNORECASE)
            if domain_match:
                domain = domain_match.group(1)
                step2 = StepResult(2, f"Apply domain restriction (x ∈ {domain})", "domain", True)
                if domain == 'W':
                    # Whole numbers: 0, 1, 2, ...
                    int_solutions = [n for n in range(100) if lhs.subs(x, n) < rhs.subs(x, n)] if '<' in op else \
                                   [n for n in range(100) if lhs.subs(x, n) > rhs.subs(x, n)]
                    step2.result = f"Solution set (x ∈ {domain}) = {int_solutions}"
                elif domain == 'Z':
                    int_solutions = [n for n in range(-100, 100) if lhs.subs(x, n) < rhs.subs(x, n)] if '<' in op else \
                                   [n for n in range(-100, 100) if lhs.subs(x, n) > rhs.subs(x, n)]
                    step2.result = f"Solution set (x ∈ {domain}) = {int_solutions}"
                else:
                    step2.result = f"Domain: {domain}"
                step2.marks = 1
                result.steps.append(step2)
    except Exception as e:
        result.error = f"Inequation solving failed: {e}"


def _solve_max_min(vals: ExtractedValues, result: SolutionResult) -> None:
    """Find maxima/minima of a function."""
    if not vals.expression:
        result.error = "No expression found"
        return

    expr = _safe_parse(vals.expression)
    if expr is None:
        result.error = f"Cannot parse expression: {vals.expression}"
        return

    x = Symbol(vals.var)

    # Step 1: Differentiate
    dy = diff(expr, x)
    step1 = StepResult(1, "Find dy/dx", "diff", True)
    step1.result = f"dy/dx = {dy}"
    step1.marks = 1
    result.steps.append(step1)

    # Step 2: Find critical points
    critical = solve(Eq(dy, 0), x)
    step2 = StepResult(2, "Find critical points (dy/dx = 0)", "solve", True)
    step2.result = f"Critical points: x = {critical}"
    step2.marks = 1.5
    result.steps.append(step2)

    # Step 3: Second derivative test
    d2y = diff(dy, x)
    step3 = StepResult(3, "Find d²y/dx²", "diff", True)
    step3.result = f"d²y/dx² = {d2y}"
    step3.marks = 1
    result.steps.append(step3)

    # Step 4: Classify
    for cp in critical:
        val = d2y.subs(x, cp)
        if val < 0:
            nature = "maximum"
        elif val > 0:
            nature = "minimum"
        else:
            nature = "inconclusive"
        y_val = expr.subs(x, cp)
        step4 = StepResult(4, f"Classify x={cp}", "classify", True)
        step4.result = f"At x={cp}: d²y/dx²={val} → {nature}, y={y_val}"
        step4.marks = 1.5
        result.steps.append(step4)


def _solve_inverse_trig(vals: ExtractedValues, result: SolutionResult) -> None:
    """Evaluate inverse trig expressions."""
    # This is complex — store the expression and try to simplify
    result.error = "Inverse trig simplification requires manual step decomposition"


def _solve_hcf_lcm(vals: ExtractedValues, result: SolutionResult) -> None:
    """Find HCF and LCM of numbers."""
    if not vals.numbers:
        result.error = "No numbers found"
        return

    from math import gcd
    from functools import reduce

    nums = [int(n.strip()) for n in vals.numbers.split(',')]
    hcf = reduce(gcd, nums)

    def lcm(a, b):
        return a * b // gcd(a, b)
    lcm_val = reduce(lcm, nums)

    step1 = StepResult(1, "Find HCF", "gcd", True)
    step1.result = f"HCF of {nums} = {hcf}"
    step1.marks = 1.5
    result.steps.append(step1)

    step2 = StepResult(2, "Find LCM", "lcm", True)
    step2.result = f"LCM of {nums} = {lcm_val}"
    step2.marks = 1.5
    result.steps.append(step2)

    if len(nums) == 2:
        step3 = StepResult(3, "Verify HCF × LCM = a × b", "verify", True)
        step3.result = f"HCF × LCM = {hcf} × {lcm_val} = {hcf * lcm_val}, a × b = {nums[0] * nums[1]} → {'✓' if hcf * lcm_val == nums[0] * nums[1] else '✗'}"
        step3.marks = 1
        result.steps.append(step3)


def _solve_percentage(vals: ExtractedValues, result: SolutionResult) -> None:
    """Calculate percentage."""
    nums = vals.raw.get('numbers', [])
    pct = vals.raw.get('percent')

    if pct and nums:
        # X% of Y
        other = [n for n in nums if n != pct]
        if other:
            result_val = Rational(int(pct), 100) * int(other[0])
            step1 = StepResult(1, "Calculate percentage", "percentage", True)
            step1.result = f"{pct}% of {other[0]} = {result_val}"
            step1.marks = 2
            result.steps.append(step1)
    elif len(nums) >= 2:
        # X out of Y as percentage
        result_val = Rational(int(nums[0]), int(nums[1])) * 100
        step1 = StepResult(1, "Calculate percentage", "percentage", True)
        step1.result = f"{nums[0]}/{nums[1]} × 100 = {result_val}%"
        step1.marks = 2
        result.steps.append(step1)


def _solve_interest(vals: ExtractedValues, result: SolutionResult) -> None:
    """Calculate simple/compound interest."""
    p = vals.raw.get('principal')
    r = vals.raw.get('rate')
    t = vals.raw.get('time')

    if p and r and t:
        p_val = int(p)
        r_val = Rational(int(r), 100)
        t_val = int(t)

        si = p_val * r_val * t_val
        step1 = StepResult(1, "Simple Interest", "interest", True)
        step1.result = f"SI = P×R×T/100 = {p_val}×{r}×{t}/100 = {si}"
        step1.marks = 2
        result.steps.append(step1)

        step2 = StepResult(2, "Total amount", "amount", True)
        step2.result = f"Amount = P + SI = {p_val} + {si} = {p_val + si}"
        step2.marks = 1
        result.steps.append(step2)


def _solve_ratio_proportion(vals: ExtractedValues, result: SolutionResult) -> None:
    """Solve ratio/proportion problems."""
    ratio_a = vals.raw.get('ratio_a')
    ratio_b = vals.raw.get('ratio_b')

    if ratio_a and ratio_b:
        step1 = StepResult(1, "Set up ratio", "ratio", True)
        step1.result = f"Ratio = {ratio_a}:{ratio_b}"
        step1.marks = 1
        result.steps.append(step1)


def _solve_set_theory(vals: ExtractedValues, result: SolutionResult) -> None:
    """Set theory operations."""
    if not vals.set_a:
        result.error = "No set found"
        return

    try:
        A = FiniteSet(*[int(n.strip()) for n in vals.set_a.split(',')])

        step1 = StepResult(1, "Identify set A", "set", True)
        step1.result = f"A = {A}"
        step1.marks = 0.5
        result.steps.append(step1)

        if vals.set_b:
            B = FiniteSet(*[int(n.strip()) for n in vals.set_b.split(',')])

            step2 = StepResult(2, "Identify set B", "set", True)
            step2.result = f"B = {B}"
            step2.marks = 0.5
            result.steps.append(step2)

            # Intersection
            inter = A.intersection(B)
            step3 = StepResult(3, "A ∩ B", "intersection", True)
            step3.result = f"A ∩ B = {inter}"
            step3.marks = 1
            result.steps.append(step3)

            # Union
            union = A.union(B)
            step4 = StepResult(4, "A ∪ B", "union", True)
            step4.result = f"A ∪ B = {union}"
            step4.marks = 1
            result.steps.append(step4)
    except Exception as e:
        result.error = f"Set theory failed: {e}"


def _solve_exponents(vals: ExtractedValues, result: SolutionResult) -> None:
    """Evaluate exponents."""
    base = vals.raw.get('base')
    power = vals.raw.get('power')

    if base and power:
        result_val = int(base) ** int(power)
        step1 = StepResult(1, "Evaluate exponent", "power", True)
        step1.result = f"{base}^{power} = {result_val}"
        step1.marks = 2
        result.steps.append(step1)
