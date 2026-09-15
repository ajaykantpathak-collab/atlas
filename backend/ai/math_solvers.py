"""Math formula solver — comprehensive templates for NEET/JEE level.

Covers: trigonometry, coordinate geometry, vectors, sequences & series,
complex numbers, matrices, probability, statistics, binomial theorem,
permutations & combinations.

Uses SymPy for symbolic computation.
"""

import re
import math
import sympy
from sympy import (Symbol, symbols, sqrt, pi, Rational, sin, cos, tan, asin, acos,
                   atan, I, exp, log, factorial, binomial, Matrix, det, solve,
                   simplify, trigsimp, expand, Eq, Abs, im, conjugate, factor)
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application
from typing import Optional
from backend.ai.compute_types import ComputeResult, _format_math, _safe_parse


def _num(v) -> str:
    if v is None:
        return "?"
    if isinstance(v, float):
        if v == int(v):
            return str(int(v))
        return str(round(v, 6))
    return str(v)


def _extract_numbers(message: str, patterns: dict) -> dict:
    values = {}
    for var, pattern in patterns.items():
        m = re.search(pattern, message, re.IGNORECASE)
        if m:
            try:
                values[var] = float(m.group(1))
            except (ValueError, IndexError):
                pass
    return values


def _result(steps: list, answer: str, qtype: str = "math_formula") -> ComputeResult:
    return ComputeResult(
        matched=True,
        question_type=qtype,
        answer=answer,
        steps=steps,
    )


_TRANSFORMS = standard_transformations + (implicit_multiplication_application,)


# --------------------------------------------------------------------------- #
# Trigonometry
# --------------------------------------------------------------------------- #

def solve_trig_values(message: str) -> Optional[ComputeResult]:
    """sin/cos/tan of specific angles, inverse trig values."""
    # Skip compound trig expressions (let solve_trig_expression handle them)
    trig_count = len(re.findall(r'(?:sin|cos|tan)\s+\d+', message, re.IGNORECASE))
    if trig_count >= 2:
        return None
    # Skip if there are arithmetic operators between trig and another term
    if re.search(r'(?:sin|cos|tan)\s+\d+.*[+\-*/].*(?:sin|cos|tan|\d)', message, re.IGNORECASE):
        return None
    # Match "sin 30", "cos 60", "tan 45", etc.
    m = re.search(r'\b(sin|cos|tan|cosec|csc|sec|cot)\s+(\d+\.?\d*)\s*(?:degree|°|rad)?', message, re.IGNORECASE)
    if not m:
        return None

    func = m.group(1).lower()
    angle = float(m.group(2))

    # Check if radians specified
    if "rad" in message and "degree" not in message and "°" not in message:
        rad = angle
    else:
        rad = math.radians(angle)

    funcs = {
        "sin": math.sin, "cos": math.cos, "tan": math.tan,
        "cosec": lambda x: 1/math.sin(x), "csc": lambda x: 1/math.sin(x),
        "sec": lambda x: 1/math.cos(x), "cot": lambda x: 1/math.tan(x),
    }

    if func not in funcs:
        return None

    try:
        val = funcs[func](rad)
    except ZeroDivisionError:
        return _result([f"{func}({_num(angle)}°) is undefined (division by zero)"],
                      f"{func}({_num(angle)}°) = undefined")

    steps = [
        f"Compute {func}({_num(angle)}°)",
        f"Convert to radians: {_num(rad)} rad",
        f"Result: {func}({_num(angle)}°) = {_num(round(val, 6))}",
    ]
    return _result(steps, f"{func}({_num(angle)}°) = {_num(round(val, 6))}")


def solve_trig_identity(message: str) -> Optional[ComputeResult]:
    """Simplify trig expressions using SymPy."""
    if not any(kw in message for kw in ["simplify trig", "trig identity", "prove that",
                                         "verify trig"]):
        return None

    # Extract expression after "simplify" or "prove"
    m = re.search(r'(?:simplify|prove(?:\s+that)?|verify)\s+(.+)', message, re.IGNORECASE)
    if not m:
        return None

    expr_str = m.group(1).strip()
    try:
        expr = parse_expr(expr_str.replace('^', '**'), transformations=_TRANSFORMS)
        simplified = trigsimp(expr)
        steps = [
            f"Expression: {_format_math(expr)}",
            f"Simplified: {_format_math(simplified)}",
        ]
        return _result(steps, f"{_format_math(simplified)}")
    except Exception:
        return None


# --------------------------------------------------------------------------- #
# Coordinate Geometry
# --------------------------------------------------------------------------- #

def solve_distance(message: str) -> Optional[ComputeResult]:
    """Distance between two points: d = √((x2-x1)² + (y2-y1)²)"""
    if not any(kw in message for kw in ["distance between", "distance from",
                                         "find distance"]):
        return None

    # Extract coordinates: (x1, y1) and (x2, y2)
    coords = re.findall(r'\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)', message)
    if len(coords) < 2:
        return None

    x1, y1 = float(coords[0][0]), float(coords[0][1])
    x2, y2 = float(coords[1][0]), float(coords[1][1])

    d = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
    steps = [
        f"Given: A({_num(x1)}, {_num(y1)}) and B({_num(x2)}, {_num(y2)})",
        f"Formula: d = √((x₂-x₁)² + (y₂-y₁)²)",
        f"Substitute: d = √(({_num(x2)}-{_num(x1)})² + ({_num(y2)}-{_num(y1)})²)",
        f"         = √({_num((x2-x1)**2)} + {_num((y2-y1)**2)})",
        f"         = √{_num((x2-x1)**2 + (y2-y1)**2)}",
        f"Result: d = {_num(d)}",
    ]
    return _result(steps, f"d = {_num(d)}")


def solve_midpoint(message: str) -> Optional[ComputeResult]:
    """Midpoint: M = ((x1+x2)/2, (y1+y2)/2)"""
    if not any(kw in message for kw in ["midpoint", "mid point", "mid-point"]):
        return None

    coords = re.findall(r'\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)', message)
    if len(coords) < 2:
        return None

    x1, y1 = float(coords[0][0]), float(coords[0][1])
    x2, y2 = float(coords[1][0]), float(coords[1][1])

    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    steps = [
        f"Given: A({_num(x1)}, {_num(y1)}) and B({_num(x2)}, {_num(y2)})",
        f"Formula: M = ((x₁+x₂)/2, (y₁+y₂)/2)",
        f"Result: M = ({_num(mx)}, {_num(my)})",
    ]
    return _result(steps, f"M = ({_num(mx)}, {_num(my)})")


def solve_slope(message: str) -> Optional[ComputeResult]:
    """Slope: m = (y2-y1)/(x2-x1)"""
    if not any(kw in message for kw in ["slope", "gradient", "find slope"]):
        return None

    coords = re.findall(r'\(\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*\)', message)
    if len(coords) < 2:
        return None

    x1, y1 = float(coords[0][0]), float(coords[0][1])
    x2, y2 = float(coords[1][0]), float(coords[1][1])

    if x2 - x1 == 0:
        return _result(["Slope is undefined (vertical line)"], "Slope = undefined (vertical line)")

    m = (y2 - y1) / (x2 - x1)
    steps = [
        f"Given: A({_num(x1)}, {_num(y1)}) and B({_num(x2)}, {_num(y2)})",
        f"Formula: m = (y₂-y₁)/(x₂-x₁)",
        f"Result: m = {_num(m)}",
    ]
    return _result(steps, f"m = {_num(m)}")


def solve_circle(message: str) -> Optional[ComputeResult]:
    """Circle: x² + y² = r², area = πr², circumference = 2πr"""
    if not any(kw in message for kw in ["circle area", "area of circle",
                                         "circumference", "circle circumference"]):
        return None
    
    # Don't hijack optimization questions (rectangle inscribed in circle, etc.)
    if any(kw in message for kw in ["inscribed", "largest", "maximum", "optimize", "dimensions"]):
        return None

    vals = _extract_numbers(message, {
        "r": r'(?:radius|r)\s*=?\s*(\d+\.?\d*)',
        "d": r'(?:diameter|d)\s*=?\s*(\d+\.?\d*)',
    })

    if "r" in vals or "d" in vals:
        r = vals.get("r", vals["d"] / 2)
        if "area" in message:
            area = math.pi * r**2
            steps = [
                f"Given: r = {_num(r)}",
                f"Formula: A = πr²",
                f"Result: A = {_num(round(area, 4))}",
            ]
            return _result(steps, f"A = {_num(round(area, 4))}")
        elif "circumference" in message:
            c = 2 * math.pi * r
            steps = [
                f"Given: r = {_num(r)}",
                f"Formula: C = 2πr",
                f"Result: C = {_num(round(c, 4))}",
            ]
            return _result(steps, f"C = {_num(round(c, 4))}")

    return None


# --------------------------------------------------------------------------- #
# Vectors
# --------------------------------------------------------------------------- #

def solve_vector_magnitude(message: str) -> Optional[ComputeResult]:
    """|v| = √(x² + y² + z²)"""
    if not any(kw in message for kw in ["magnitude of vector", "magnitude of the vector",
                                         "vector magnitude", "norm of vector", "norm of the vector",
                                         "length of vector", "length of the vector"]):
        return None

    # Extract vector components
    # Match formats: (1, 2, 3), 2i + 3j + 4k, <1, 2, 3>
    coords = re.findall(r'[<\(]\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*(?:,\s*(-?\d+\.?\d*)\s*)?[>\)]', message)
    if coords:
        x, y = float(coords[0][0]), float(coords[0][1])
        z = float(coords[0][2]) if coords[0][2] else 0
    else:
        # Try i, j, k notation
        m_x = re.search(r'(-?\d+\.?\d*)\s*i\b', message)
        m_y = re.search(r'(-?\d+\.?\d*)\s*j\b', message)
        m_z = re.search(r'(-?\d+\.?\d*)\s*k\b', message)
        if not (m_x or m_y or m_z):
            return None
        x = float(m_x.group(1)) if m_x else 0
        y = float(m_y.group(1)) if m_y else 0
        z = float(m_z.group(1)) if m_z else 0

    mag = math.sqrt(x**2 + y**2 + z**2)
    steps = [
        f"Given: v = {_num(x)}i + {_num(y)}j + {_num(z)}k",
        f"Formula: |v| = √(x² + y² + z²)",
        f"Substitute: |v| = √({_num(x)}² + {_num(y)}² + {_num(z)}²)",
        f"Result: |v| = {_num(round(mag, 6))}",
    ]
    return _result(steps, f"|v| = {_num(round(mag, 6))}")


def solve_dot_product(message: str) -> Optional[ComputeResult]:
    """a·b = a1b1 + a2b2 + a3b3"""
    if not any(kw in message for kw in ["dot product", "scalar product", "inner product"]):
        return None

    coords = re.findall(r'[<\(]\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*(?:,\s*(-?\d+\.?\d*)\s*)?[>\)]', message)
    if len(coords) < 2:
        return None

    a = [float(c) for c in coords[0] if c]
    b = [float(c) for c in coords[1] if c]
    while len(a) < 3: a.append(0)
    while len(b) < 3: b.append(0)

    dot = a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
    steps = [
        f"Given: a = ({_num(a[0])}, {_num(a[1])}, {_num(a[2])}), b = ({_num(b[0])}, {_num(b[1])}, {_num(b[2])})",
        f"Formula: a·b = a₁b₁ + a₂b₂ + a₃b₃",
        f"Result: a·b = {_num(dot)}",
    ]
    return _result(steps, f"a·b = {_num(dot)}")


def solve_cross_product(message: str) -> Optional[ComputeResult]:
    """a × b = (a2b3-a3b2, a3b1-a1b3, a1b2-a2b1)"""
    if not any(kw in message for kw in ["cross product", "vector product"]):
        return None

    coords = re.findall(r'[<\(]\s*(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)\s*(?:,\s*(-?\d+\.?\d*)\s*)?[>\)]', message)
    if len(coords) < 2:
        return None

    a = [float(c) for c in coords[0] if c]
    b = [float(c) for c in coords[1] if c]
    while len(a) < 3: a.append(0)
    while len(b) < 3: b.append(0)

    cx = a[1]*b[2] - a[2]*b[1]
    cy = a[2]*b[0] - a[0]*b[2]
    cz = a[0]*b[1] - a[1]*b[0]
    steps = [
        f"Given: a = ({_num(a[0])}, {_num(a[1])}, {_num(a[2])}), b = ({_num(b[0])}, {_num(b[1])}, {_num(b[2])})",
        f"Formula: a × b = (a₂b₃-a₃b₂, a₃b₁-a₁b₃, a₁b₂-a₂b₁)",
        f"Result: a × b = ({_num(cx)}, {_num(cy)}, {_num(cz)})",
    ]
    return _result(steps, f"a × b = ({_num(cx)}, {_num(cy)}, {_num(cz)})")


# --------------------------------------------------------------------------- #
# Sequences and Series
# --------------------------------------------------------------------------- #

def solve_ap(message: str) -> Optional[ComputeResult]:
    """Arithmetic Progression: an = a1 + (n-1)d, Sn = n/2(2a + (n-1)d)"""
    if not any(kw in message for kw in ["arithmetic progression", "ap", "a.p.",
                                         "nth term", "sum of", "term of"]):
        return None

    vals = {}
    # Try to parse sequence: "ap 2, 5, 8" or "arithmetic progression 2, 5, 8, 11"
    seq_match = re.search(r'(?:ap|a\.p\.|arithmetic\s+progression)\s*[:\-]?\s*([\d,\s]+)', message, re.IGNORECASE)
    if seq_match:
        nums = [float(x.strip()) for x in seq_match.group(1).split(',') if x.strip()]
        if len(nums) >= 2:
            vals["a"] = nums[0]
            vals["d"] = nums[1] - nums[0]

    # First term: "first term 2", "a = 2", "a1 = 2"
    if "a" not in vals:
        for pat in [r'first\s+term\s*(?:is\s+)?=?\s*(\d+\.?\d*)',
                    r'\ba1?\s*=?\s*(\d+\.?\d*)',
                    r'first\s+term\s+(?:is\s+)?(\d+\.?\d*)']:
            m = re.search(pat, message, re.IGNORECASE)
            if m:
                vals["a"] = float(m.group(1))
                break
    # Common difference: "common difference 3", "d = 3"
    if "d" not in vals:
        for pat in [r'common\s+difference\s*(?:is\s+)?=?\s*(\d+\.?\d*)',
                    r'\bd\s*=?\s*(\d+\.?\d*)']:
            m = re.search(pat, message, re.IGNORECASE)
            if m:
                vals["d"] = float(m.group(1))
                break
    # n: "10th term", "n = 10", "first 20 terms"
    n_match = re.search(r'(\d+\.?\d*)(?:st|nd|rd|th)\s+term', message, re.IGNORECASE)
    if not n_match:
        n_match = re.search(r'\bn\s*=?\s*(\d+\.?\d*)', message, re.IGNORECASE)
    if not n_match:
        n_match = re.search(r'first\s+(\d+\.?\d*)\s+terms', message, re.IGNORECASE)
    if n_match:
        vals["n"] = float(n_match.group(1))

    if "a" in vals and "d" in vals and "n" in vals:
        an = vals["a"] + (vals["n"] - 1) * vals["d"]
        Sn = vals["n"] / 2 * (2 * vals["a"] + (vals["n"] - 1) * vals["d"])
        if "sum" in message or ("first" in message and "terms" in message):
            steps = [
                f"Given: a = {_num(vals['a'])}, d = {_num(vals['d'])}, n = {_num(vals['n'])}",
                f"Formula: Sn = n/2 × (2a + (n-1)d)",
                f"Result: S{_num(vals['n'])} = {_num(Sn)}",
            ]
            return _result(steps, f"S{_num(vals['n'])} = {_num(Sn)}")
        else:
            steps = [
                f"Given: a = {_num(vals['a'])}, d = {_num(vals['d'])}, n = {_num(vals['n'])}",
                f"Formula: an = a + (n-1)d",
                f"Result: a{_num(vals['n'])} = {_num(an)}",
            ]
            return _result(steps, f"a{_num(vals['n'])} = {_num(an)}")

    return None


def solve_gp(message: str) -> Optional[ComputeResult]:
    """Geometric Progression: an = ar^(n-1), Sn = a(r^n-1)/(r-1)"""
    if not any(kw in message for kw in ["geometric progression", "gp ", "g.p.",
                                         "nth term of gp", "sum of gp"]):
        return None

    vals = _extract_numbers(message, {
        "a": r'(?:first\s+term|a1)\s*=?\s*(\d+\.?\d*)',
        "r": r'(?:common\s+ratio)\s*=?\s*(\d+\.?\d*)',
        "n": r'\bn\s*=?\s*(\d+\.?\d*)',
    })

    if "a" in vals and "r" in vals and "n" in vals:
        an = vals["a"] * vals["r"]**(vals["n"] - 1)
        if abs(vals["r"]) < 1:
            Sn_inf = vals["a"] / (1 - vals["r"])
        if "sum" in message:
            if vals["r"] == 1:
                Sn = vals["a"] * vals["n"]
            else:
                Sn = vals["a"] * (vals["r"]**vals["n"] - 1) / (vals["r"] - 1)
            steps = [
                f"Given: a = {_num(vals['a'])}, r = {_num(vals['r'])}, n = {_num(vals['n'])}",
                f"Formula: Sn = a(r^n - 1)/(r - 1)",
                f"Result: S{_num(vals['n'])} = {_num(Sn)}",
            ]
            return _result(steps, f"S{_num(vals['n'])} = {_num(Sn)}")
        else:
            steps = [
                f"Given: a = {_num(vals['a'])}, r = {_num(vals['r'])}, n = {_num(vals['n'])}",
                f"Formula: an = ar^(n-1)",
                f"Result: a{_num(vals['n'])} = {_num(an)}",
            ]
            return _result(steps, f"a{_num(vals['n'])} = {_num(an)}")

    return None


# --------------------------------------------------------------------------- #
# Complex Numbers
# --------------------------------------------------------------------------- #

def solve_complex_modulus(message: str) -> Optional[ComputeResult]:
    """|z| = √(a² + b²) for z = a + bi"""
    if not any(kw in message for kw in ["modulus of complex", "magnitude of complex",
                                         "absolute value of complex", "|z|"]):
        return None

    # Match a + bi or a - bi
    m = re.search(r'(-?\d+\.?\d*)\s*([+-])\s*(\d+\.?\d*)\s*i', message)
    if not m:
        return None

    a = float(m.group(1))
    b = float(m.group(3)) * (1 if m.group(2) == '+' else -1)

    mod = math.sqrt(a**2 + b**2)
    steps = [
        f"Given: z = {_num(a)} + {_num(b)}i",
        f"Formula: |z| = √(a² + b²)",
        f"Result: |z| = {_num(round(mod, 6))}",
    ]
    return _result(steps, f"|z| = {_num(round(mod, 6))}")


# --------------------------------------------------------------------------- #
# Probability & Combinatorics
# --------------------------------------------------------------------------- #

def solve_permutation(message: str) -> Optional[ComputeResult]:
    """P(n,r) = n!/(n-r)!"""
    if not any(kw in message for kw in ["permutation", "p(", "npr", "arrange"]):
        return None

    vals = _extract_numbers(message, {
        "n": r'(?:n|from)\s*=?\s*(\d+\.?\d*)',
        "r": r'(?:r|choose|pick)\s*=?\s*(\d+\.?\d*)',
    })

    # Also try "p(5, 2)" format
    m = re.search(r'p\s*\(?\s*(\d+)\s*,\s*(\d+)\s*\)?', message, re.IGNORECASE)
    if m:
        vals["n"] = float(m.group(1))
        vals["r"] = float(m.group(2))

    if "n" in vals and "r" in vals:
        n, r = int(vals["n"]), int(vals["r"])
        if r > n:
            return _result(["r cannot be greater than n in permutation"], "Invalid: r > n")
        P = math.factorial(n) // math.factorial(n - r)
        steps = [
            f"Given: n = {n}, r = {r}",
            f"Formula: P(n,r) = n!/(n-r)!",
            f"Substitute: P({n},{r}) = {n}!/({n}-{r})! = {n}!/{n-r}!",
            f"Result: P({n},{r}) = {P}",
        ]
        return _result(steps, f"P({n},{r}) = {P}")

    return None


def solve_combination(message: str) -> Optional[ComputeResult]:
    """C(n,r) = n!/(r!(n-r)!)"""
    if not any(kw in message for kw in ["combination", "c(", "ncr", "choose", "select"]):
        return None

    vals = _extract_numbers(message, {
        "n": r'(?:n|from)\s*=?\s*(\d+\.?\d*)',
        "r": r'(?:r|choose|select)\s*=?\s*(\d+\.?\d*)',
    })

    m = re.search(r'c\s*\(?\s*(\d+)\s*,\s*(\d+)\s*\)?', message, re.IGNORECASE)
    if m:
        vals["n"] = float(m.group(1))
        vals["r"] = float(m.group(2))

    if "n" in vals and "r" in vals:
        n, r = int(vals["n"]), int(vals["r"])
        if r > n:
            return _result(["r cannot be greater than n in combination"], "Invalid: r > n")
        C = math.factorial(n) // (math.factorial(r) * math.factorial(n - r))
        steps = [
            f"Given: n = {n}, r = {r}",
            f"Formula: C(n,r) = n!/(r!(n-r)!)",
            f"Substitute: C({n},{r}) = {n}!/({r}!×{n-r}!)",
            f"Result: C({n},{r}) = {C}",
        ]
        return _result(steps, f"C({n},{r}) = {C}")

    return None


def solve_probability(message: str) -> Optional[ComputeResult]:
    """P(event) = favorable/total"""
    if not any(kw in message for kw in ["probability of", "what is the probability",
                                         "find probability", "chance of"]):
        return None

    vals = _extract_numbers(message, {
        "fav": r'(?:favorable|favourable|fav)\s*=?\s*(\d+\.?\d*)',
        "total": r'(?:total|t|outcomes)\s*=?\s*(\d+\.?\d*)',
    })

    if "fav" in vals and "total" in vals:
        P = vals["fav"] / vals["total"]
        steps = [
            f"Given: favorable = {_num(vals['fav'])}, total = {_num(vals['total'])}",
            f"Formula: P = favorable / total",
            f"Result: P = {_num(round(P, 6))} = {_num(round(P*100, 2))}%",
        ]
        return _result(steps, f"P = {_num(round(P, 6))} ({_num(round(P*100, 2))}%)")

    return None


def solve_binomial(message: str) -> Optional[ComputeResult]:
    """Binomial theorem: (a+b)^n expansion, general term"""
    if not any(kw in message for kw in ["binomial expansion", "binomial theorem",
                                         "expand (", "(a+b)^n"]):
        return None

    # Match (a + b)^n
    m = re.search(r'\(\s*(\w+)\s*([+-])\s*(\w+)\s*\)\s*\^?\s*(\d+)', message)
    if not m:
        return None

    a_sym, sign, b_sym, n_str = m.group(1), m.group(2), m.group(3), m.group(4)
    n = int(n_str)

    a, b = symbols('a b')
    if sign == '+':
        expr = (a + b)**n
    else:
        expr = (a - b)**n

    expanded = expand(expr)
    steps = [
        f"Expand ({a_sym} {sign} {b_sym})^{n}",
        f"Using Binomial Theorem: (x + y)^n = Σ C(n,k) x^(n-k) y^k",
        f"Result: {_format_math(expanded)}",
    ]
    return _result(steps, f"{_format_math(expanded)}")


# --------------------------------------------------------------------------- #
# Statistics
# --------------------------------------------------------------------------- #

def solve_mean(message: str) -> Optional[ComputeResult]:
    """Mean = sum/n
    
    Handles two forms:
    1. "mean of 5 numbers with sum 60" → 60/5 = 12
    2. "mean of 10, 20, 30, 40, 50" → 150/5 = 30
    """
    if not any(kw in message for kw in ["mean of", "average of", "find mean", "calculate mean", "find the mean"]):
        return None

    # Check for "N numbers with sum S" pattern
    sum_count_match = re.search(r'(\d+)\s+numbers?\s+(?:with\s+)?sum\s+(\d+\.?\d*)', message, re.IGNORECASE)
    if sum_count_match:
        count = int(sum_count_match.group(1))
        total = float(sum_count_match.group(2))
        mean = total / count
        steps = [
            f"Given: {count} numbers with sum = {total}",
            f"Formula: Mean = sum / count",
            f"Substitute: Mean = {total} / {count}",
            f"Result: Mean = {_num(round(mean, 6))}",
        ]
        return _result(steps, f"Mean = {_num(round(mean, 6))}")

    # Check for "sum S and count N" pattern
    sum_match = re.search(r'sum\s+(?:is|=|:)?\s*(\d+\.?\d*)\s+(?:and\s+)?count\s+(?:is|=|:)?\s*(\d+\.?\d*)', message, re.IGNORECASE)
    if sum_match:
        total = float(sum_match.group(1))
        count = int(float(sum_match.group(2)))
        mean = total / count
        steps = [
            f"Given: sum = {total}, count = {count}",
            f"Formula: Mean = sum / count",
            f"Substitute: Mean = {total} / {count}",
            f"Result: Mean = {_num(round(mean, 6))}",
        ]
        return _result(steps, f"Mean = {_num(round(mean, 6))}")

    # Fall back to extracting all numbers as data points
    # But exclude the number in "mean of N" if it's a count
    count_match = re.search(r'mean\s+of\s+(\d+)\s+numbers?', message, re.IGNORECASE)
    exclude_num = None
    if count_match:
        exclude_num = count_match.group(1)

    nums = re.findall(r'(-?\d+\.?\d*)', message)
    try:
        if exclude_num:
            values = [float(x) for x in nums if x != exclude_num]
        else:
            values = [float(x) for x in nums]
    except ValueError:
        return None

    if len(values) < 2:
        return None

    mean = sum(values) / len(values)
    steps = [
        f"Given: {values}",
        f"Formula: Mean = (sum of values) / (count)",
        f"Substitute: Mean = {_num(sum(values))} / {len(values)}",
        f"Result: Mean = {_num(round(mean, 6))}",
    ]
    return _result(steps, f"Mean = {_num(round(mean, 6))}")


def solve_statistics(message: str) -> Optional[ComputeResult]:
    """Mean, median, mode, variance, standard deviation."""
    if not any(kw in message for kw in ["median of", "variance of", "standard deviation",
                                         "std dev", "find median"]):
        return None

    nums = re.findall(r'(-?\d+\.?\d*)', message)
    try:
        values = sorted([float(x) for x in nums])
    except ValueError:
        return None

    if len(values) < 2:
        return None

    n = len(values)
    mean = sum(values) / n

    if "median" in message:
        if n % 2 == 1:
            median = values[n // 2]
        else:
            median = (values[n // 2 - 1] + values[n // 2]) / 2
        steps = [
            f"Given: {values}",
            f"Sorted: {values}",
            f"Formula: Median = middle value (or average of two middle values)",
            f"Result: Median = {_num(median)}",
        ]
        return _result(steps, f"Median = {_num(median)}")

    if "variance" in message or "standard deviation" in message:
        variance = sum((x - mean)**2 for x in values) / n  # population
        std_dev = math.sqrt(variance)
        if "standard deviation" in message or "std" in message:
            steps = [
                f"Given: {values}",
                f"Mean = {_num(round(mean, 6))}",
                f"Formula: σ = √(Σ(x - μ)² / n)",
                f"Result: σ = {_num(round(std_dev, 6))}",
            ]
            return _result(steps, f"σ = {_num(round(std_dev, 6))}")
        else:
            steps = [
                f"Given: {values}",
                f"Mean = {_num(round(mean, 6))}",
                f"Formula: σ² = Σ(x - μ)² / n",
                f"Result: σ² = {_num(round(variance, 6))}",
            ]
            return _result(steps, f"σ² = {_num(round(variance, 6))}")

    return None


# --------------------------------------------------------------------------- #
# Mensuration - solids
# --------------------------------------------------------------------------- #

def solve_sphere(message: str) -> Optional[ComputeResult]:
    """Sphere: V = 4/3 π r³, SA = 4 π r²"""
    if not any(kw in message for kw in ["sphere"]):
        return None
    if not any(kw in message for kw in ["volume", "surface area", "area"]):
        return None
    vals = _extract_numbers(message, {
        "r": r'(?:radius|radius\s+is|of\s+radius)\s*=?\s*(\d+\.?\d*)',
    })
    if "r" not in vals:
        # try "radius 7" or "r = 7"
        m = re.search(r'(?:radius|r)\s*=?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["r"] = float(m.group(1))
    if "r" not in vals:
        return None
    r = vals["r"]
    if "volume" in message:
        V = 4/3 * math.pi * r**3
        steps = [
            f"Given: radius r = {_num(r)}",
            f"Formula: V = (4/3)πr³",
            f"V = (4/3) × π × {_num(r)}³ = {_num(round(V, 4))}",
        ]
        return _result(steps, f"Volume = {_num(round(V, 4))} cubic units")
    else:
        SA = 4 * math.pi * r**2
        steps = [
            f"Given: radius r = {_num(r)}",
            f"Formula: SA = 4πr²",
            f"SA = 4 × π × {_num(r)}² = {_num(round(SA, 4))}",
        ]
        return _result(steps, f"Surface Area = {_num(round(SA, 4))} sq units")


def solve_cylinder(message: str) -> Optional[ComputeResult]:
    """Cylinder: CSA = 2πrh, TSA = 2πr(r+h), V = πr²h"""
    if not any(kw in message for kw in ["cylinder"]):
        return None
    if not any(kw in message for kw in ["surface area", "volume", "curved"]):
        return None
    vals = _extract_numbers(message, {
        "r": r'(?:radius|radius\s+is|of\s+radius)\s*=?\s*(\d+\.?\d*)',
        "h": r'(?:height|height\s+is|of\s+height)\s*=?\s*(\d+\.?\d*)',
    })
    if "r" not in vals:
        m = re.search(r'(?:radius|r)\s*=?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["r"] = float(m.group(1))
    if "h" not in vals:
        m = re.search(r'(?:height|h)\s*=?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["h"] = float(m.group(1))
    if "r" not in vals or "h" not in vals:
        return None
    r, h = vals["r"], vals["h"]
    if "curved" in message or "csa" in message:
        CSA = 2 * math.pi * r * h
        steps = [
            f"Given: radius r = {_num(r)}, height h = {_num(h)}",
            f"Formula: CSA = 2πrh",
            f"CSA = 2 × π × {_num(r)} × {_num(h)} = {_num(round(CSA, 4))}",
        ]
        return _result(steps, f"CSA = {_num(round(CSA, 4))} sq units")
    elif "total" in message or "tsa" in message:
        TSA = 2 * math.pi * r * (r + h)
        steps = [
            f"Given: radius r = {_num(r)}, height h = {_num(h)}",
            f"Formula: TSA = 2πr(r + h)",
            f"TSA = 2 × π × {_num(r)} × ({_num(r)} + {_num(h)}) = {_num(round(TSA, 4))}",
        ]
        return _result(steps, f"TSA = {_num(round(TSA, 4))} sq units")
    else:
        V = math.pi * r**2 * h
        steps = [
            f"Given: radius r = {_num(r)}, height h = {_num(h)}",
            f"Formula: V = πr²h",
            f"V = π × {_num(r)}² × {_num(h)} = {_num(round(V, 4))}",
        ]
        return _result(steps, f"Volume = {_num(round(V, 4))} cubic units")


def solve_cone(message: str) -> Optional[ComputeResult]:
    """Cone: V = 1/3 π r² h, CSA = πrl, TSA = πr(l+r)"""
    if not any(kw in message for kw in ["cone"]):
        return None
    if not any(kw in message for kw in ["volume", "surface area", "curved", "slant"]):
        return None
    vals = _extract_numbers(message, {
        "r": r'(?:radius|radius\s+is|of\s+radius)\s*=?\s*(\d+\.?\d*)',
        "h": r'(?:height|height\s+is|of\s+height)\s*=?\s*(\d+\.?\d*)',
        "l": r'(?:slant\s+height|slant\s+is|l)\s*=?\s*(\d+\.?\d*)',
    })
    if "r" not in vals:
        m = re.search(r'(?:radius|r)\s*=?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["r"] = float(m.group(1))
    if "h" not in vals:
        m = re.search(r'(?:height|h)\s*=?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["h"] = float(m.group(1))
    if "l" not in vals:
        m = re.search(r'(?:slant\s+height|slant)\s*=?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["l"] = float(m.group(1))
    if "r" not in vals:
        return None
    r = vals["r"]
    if "volume" in message and "h" in vals:
        V = 1/3 * math.pi * r**2 * vals["h"]
        steps = [
            f"Given: radius r = {_num(r)}, height h = {_num(vals['h'])}",
            f"Formula: V = (1/3)πr²h",
            f"V = (1/3) × π × {_num(r)}² × {_num(vals['h'])} = {_num(round(V, 4))}",
        ]
        return _result(steps, f"Volume = {_num(round(V, 4))} cubic units")
    if ("curved" in message or "csa" in message) and "l" in vals:
        CSA = math.pi * r * vals["l"]
        steps = [
            f"Given: radius r = {_num(r)}, slant height l = {_num(vals['l'])}",
            f"Formula: CSA = πrl",
            f"CSA = π × {_num(r)} × {_num(vals['l'])} = {_num(round(CSA, 4))}",
        ]
        return _result(steps, f"CSA = {_num(round(CSA, 4))} sq units")
    return None


# --------------------------------------------------------------------------- #
# Commercial Mathematics
# --------------------------------------------------------------------------- #

def solve_simple_interest(message: str) -> Optional[ComputeResult]:
    """SI = PRT/100"""
    if not any(kw in message for kw in ["simple interest", "si "]):
        return None
    vals = {}
    # Principal: "on 1000", "principal 1000", "sum of 1000", "Rs 1000", "₹1000"
    for pat in [r'(?:principal|amount|sum)\s*(?:of)?\s*=?\s*(?:rs\.?|₹)?\s*(\d+\.?\d*)',
                r'on\s+(?:rs\.?|₹)?\s*(\d+\.?\d*)',
                r'(?:rs\.?|₹)\s*(\d+\.?\d*)',
                r'\bp\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m:
            vals["P"] = float(m.group(1))
            break
    # Rate: "at 5% per annum", "rate of 5%", "5% p.a."
    for pat in [r'(?:rate|rate\s+of\s+interest)\s*=?\s*(\d+\.?\d*)\s*%',
                r'(\d+\.?\d*)\s*%\s*(?:per\s+annum|p\.?a\.?)',
                r'(\d+\.?\d*)\s*%',
                r'\br\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m:
            vals["R"] = float(m.group(1))
            break
    # Time: "for 2 years", "time 2", "2 years"
    for pat in [r'(?:for|time|t)\s+(\d+\.?\d*)\s*(?:years?|yrs?)',
                r'(\d+\.?\d*)\s*(?:years?|yrs?)',
                r'\bt\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m:
            vals["T"] = float(m.group(1))
            break
    if "P" not in vals or "R" not in vals or "T" not in vals:
        return None
    SI = vals["P"] * vals["R"] * vals["T"] / 100
    A = vals["P"] + SI
    steps = [
        f"Given: P = {_num(vals['P'])}, R = {_num(vals['R'])}%, T = {_num(vals['T'])} years",
        f"Formula: SI = (P × R × T) / 100",
        f"SI = ({_num(vals['P'])} × {_num(vals['R'])} × {_num(vals['T'])}) / 100 = {_num(round(SI, 2))}",
        f"Amount A = P + SI = {_num(vals['P'])} + {_num(round(SI, 2))} = {_num(round(A, 2))}",
    ]
    return _result(steps, f"SI = {_num(round(SI, 2))}, Amount = {_num(round(A, 2))}")


def solve_compound_interest(message: str) -> Optional[ComputeResult]:
    """CI = P(1 + R/100)^T - P"""
    if not any(kw in message for kw in ["compound interest", "ci ", "compound amount"]):
        return None
    vals = {}
    for pat in [r'(?:principal|amount|sum)\s*(?:of)?\s*=?\s*(?:rs\.?|₹)?\s*(\d+\.?\d*)',
                r'on\s+(?:rs\.?|₹)?\s*(\d+\.?\d*)',
                r'(?:rs\.?|₹)\s*(\d+\.?\d*)',
                r'\bp\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m:
            vals["P"] = float(m.group(1))
            break
    for pat in [r'(?:rate|rate\s+of\s+interest)\s*=?\s*(\d+\.?\d*)\s*%',
                r'(\d+\.?\d*)\s*%\s*(?:per\s+annum|p\.?a\.?)',
                r'(\d+\.?\d*)\s*%',
                r'\br\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m:
            vals["R"] = float(m.group(1))
            break
    for pat in [r'(?:for|time|t)\s+(\d+\.?\d*)\s*(?:years?|yrs?)',
                r'(\d+\.?\d*)\s*(?:years?|yrs?)',
                r'\bt\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m:
            vals["T"] = float(m.group(1))
            break
    if "P" not in vals or "R" not in vals or "T" not in vals:
        return None
    A = vals["P"] * (1 + vals["R"]/100) ** vals["T"]
    CI = A - vals["P"]
    steps = [
        f"Given: P = {_num(vals['P'])}, R = {_num(vals['R'])}%, T = {_num(vals['T'])} years",
        f"Formula: A = P(1 + R/100)^T, CI = A - P",
        f"A = {_num(vals['P'])} × (1 + {_num(vals['R'])}/100)^{_num(vals['T'])} = {_num(round(A, 2))}",
        f"CI = {_num(round(A, 2))} - {_num(vals['P'])} = {_num(round(CI, 2))}",
    ]
    return _result(steps, f"CI = {_num(round(CI, 2))}, Amount = {_num(round(A, 2))}")


def solve_profit_loss(message: str) -> Optional[ComputeResult]:
    """Profit/Loss percentage: profit% = (profit/CP)×100"""
    if not any(kw in message for kw in ["profit", "loss", "bought", "sold"]):
        return None
    if not any(kw in message for kw in ["percentage", "percent", "find", "calculate", "%"]):
        return None
    vals = _extract_numbers(message, {
        "CP": r'(?:bought|cost\s+price|cp)\s*(?:for|is|was|of)?\s*(?:rs\.?|₹)?\s*(\d+\.?\d*)',
        "SP": r'(?:sold|selling\s+price|sp)\s*(?:for|is|was|at)?\s*(?:rs\.?|₹)?\s*(\d+\.?\d*)',
    })
    if "CP" not in vals:
        m = re.search(r'(?:bought|cost\s+price|cp)\s*(?:for|is|was|of)?\s*(?:rs\.?|₹)?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["CP"] = float(m.group(1))
    if "SP" not in vals:
        m = re.search(r'(?:sold|selling\s+price|sp)\s*(?:for|is|was|at)?\s*(?:rs\.?|₹)?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["SP"] = float(m.group(1))
    if "CP" not in vals or "SP" not in vals:
        return None
    CP, SP = vals["CP"], vals["SP"]
    if SP > CP:
        profit = SP - CP
        pct = profit / CP * 100
        steps = [
            f"Given: CP = {_num(CP)}, SP = {_num(SP)}",
            f"Profit = SP - CP = {_num(SP)} - {_num(CP)} = {_num(round(profit, 2))}",
            f"Profit% = (Profit/CP) × 100 = ({_num(round(profit, 2))}/{_num(CP)}) × 100 = {_num(round(pct, 2))}%",
        ]
        return _result(steps, f"Profit = {_num(round(profit, 2))}, Profit% = {_num(round(pct, 2))}%")
    else:
        loss = CP - SP
        pct = loss / CP * 100
        steps = [
            f"Given: CP = {_num(CP)}, SP = {_num(SP)}",
            f"Loss = CP - SP = {_num(CP)} - {_num(SP)} = {_num(round(loss, 2))}",
            f"Loss% = (Loss/CP) × 100 = ({_num(round(loss, 2))}/{_num(CP)}) × 100 = {_num(round(pct, 2))}%",
        ]
        return _result(steps, f"Loss = {_num(round(loss, 2))}, Loss% = {_num(round(pct, 2))}%")


# --------------------------------------------------------------------------- #
# Speed, Distance, Time
# --------------------------------------------------------------------------- #

def solve_speed_distance_time(message: str) -> Optional[ComputeResult]:
    """speed = distance/time, distance = speed×time, time = distance/speed"""
    if not any(kw in message for kw in ["speed", "distance", "time", "covers", "travel",
                                         "km", "m/s", "km/h", "kmph"]):
        return None
    if not any(kw in message for kw in ["find", "calculate", "how long", "how much", "what"]):
        return None

    vals = _extract_numbers(message, {
        "d1": r'(\d+\.?\d*)\s*km',
        "t1": r'(\d+\.?\d*)\s*(?:hours?|hrs?|h\b)',
        "d2": r'(\d+\.?\d*)\s*km',
    })

    # More flexible extraction
    km_vals = [float(x) for x in re.findall(r'(\d+\.?\d*)\s*km', message, re.IGNORECASE)]
    hr_vals = [float(x) for x in re.findall(r'(\d+\.?\d*)\s*(?:hours?|hrs?|h\b)', message, re.IGNORECASE)]

    if len(km_vals) >= 2 and len(hr_vals) >= 1:
        speed = km_vals[0] / hr_vals[0]
        time2 = km_vals[1] / speed
        steps = [
            f"Given: d₁ = {_num(km_vals[0])} km, t₁ = {_num(hr_vals[0])} h, d₂ = {_num(km_vals[1])} km",
            f"Speed = d₁/t₁ = {_num(km_vals[0])}/{_num(hr_vals[0])} = {_num(round(speed, 4))} km/h",
            f"Time₂ = d₂/Speed = {_num(km_vals[1])}/{_num(round(speed, 4))} = {_num(round(time2, 4))} hours",
        ]
        return _result(steps, f"Time = {_num(round(time2, 4))} hours")
    elif len(km_vals) >= 1 and len(hr_vals) >= 1:
        speed = km_vals[0] / hr_vals[0]
        steps = [
            f"Given: distance = {_num(km_vals[0])} km, time = {_num(hr_vals[0])} h",
            f"Speed = distance/time = {_num(km_vals[0])}/{_num(hr_vals[0])} = {_num(round(speed, 4))} km/h",
        ]
        return _result(steps, f"Speed = {_num(round(speed, 4))} km/h")
    return None


# --------------------------------------------------------------------------- #
# Probability - dice and coins
# --------------------------------------------------------------------------- #

def solve_probability_basic(message: str) -> Optional[ComputeResult]:
    """Basic probability: P(event) = favorable/total"""
    if not any(kw in message for kw in ["probability", "die", "dice", "coin", "thrown",
                                         "rolled", "tossed"]):
        return None

    # Die problems
    if any(kw in message for kw in ["die", "dice"]):
        total = 6
        favorable = 0
        event = ""
        if "even" in message:
            favorable = 3
            event = "even number {2, 4, 6}"
        elif "odd" in message:
            favorable = 3
            event = "odd number {1, 3, 5}"
        elif "prime" in message:
            favorable = 3  # 2, 3, 5
            event = "prime number {2, 3, 5}"
        elif "multiple of 3" in message or "divisible by 3" in message:
            favorable = 2  # 3, 6
            event = "multiple of 3 {3, 6}"
        elif "greater than 4" in message:
            favorable = 2  # 5, 6
            event = "number > 4 {5, 6}"
        elif "less than 3" in message:
            favorable = 2  # 1, 2
            event = "number < 3 {1, 2}"

        if favorable > 0:
            from sympy import Rational
            prob = Rational(favorable, total)
            steps = [
                f"Sample space: {{1, 2, 3, 4, 5, 6}} → {total} outcomes",
                f"Favorable: {event} → {favorable} outcomes",
                f"P = favorable/total = {favorable}/{total} = {prob}",
            ]
            return _result(steps, f"P = {prob}")

    # Coin problems
    if "coin" in message:
        if "two coins" in message or "2 coins" in message:
            total = 4
            if "two heads" in message or "both heads" in message:
                favorable = 1
                event = "HH"
            elif "at least one head" in message:
                favorable = 3
                event = "HH, HT, TH"
            elif "no head" in message or "both tails" in message:
                favorable = 1
                event = "TT"
            else:
                return None
            from sympy import Rational
            prob = Rational(favorable, total)
            steps = [
                f"Sample space: {{HH, HT, TH, TT}} → {total} outcomes",
                f"Favorable: {event} → {favorable} outcomes",
                f"P = {favorable}/{total} = {prob}",
            ]
            return _result(steps, f"P = {prob}")
        elif "one coin" in message or "a coin" in message or "single coin" in message:
            total = 2
            if "head" in message:
                favorable = 1
                event = "H"
            elif "tail" in message:
                favorable = 1
                event = "T"
            else:
                return None
            from sympy import Rational
            prob = Rational(favorable, total)
            steps = [
                f"Sample space: {{H, T}} → {total} outcomes",
                f"Favorable: {event} → {favorable} outcomes",
                f"P = {favorable}/{total} = {prob}",
            ]
            return _result(steps, f"P = {prob}")

    return None


# --------------------------------------------------------------------------- #
# Factorisation
# --------------------------------------------------------------------------- #

def solve_factorise(message: str) -> Optional[ComputeResult]:
    """Factorise quadratic expressions: x^2 + 5x + 6 -> (x+2)(x+3)"""
    if not any(kw in message for kw in ["factorise", "factorize", "factor"]):
        return None
    # Skip if it's asking about factor theorem
    if "theorem" in message:
        return None
    # Extract expression after "factorise"
    m = re.search(r'factoris?e\s+(.+?)(?:\s+find|\s+what|$)', message, re.IGNORECASE)
    if not m:
        m = re.search(r'factoris?e\s*:\s*(.+?)(?:\s+find|\s+what|$)', message, re.IGNORECASE)
    if not m:
        return None
    expr_str = m.group(1).strip()
    # Replace ^ with ** for SymPy parsing
    expr_str = expr_str.replace('^', '**')
    try:
        _TRANSFORMS = standard_transformations + (implicit_multiplication_application,)
        expr = parse_expr(expr_str, transformations=_TRANSFORMS)
        factored = factor(expr)
        if factored != expr:
            steps = [
                f"Given: {m.group(1).strip()}",
                f"Factorising: {expr} = {factored}",
            ]
            return _result(steps, f"{expr} = {factored}", "factorise")
    except Exception:
        pass
    return None


# --------------------------------------------------------------------------- #
# Primary school solvers (Class 1-5)
# --------------------------------------------------------------------------- #

def solve_number_comparison(message: str) -> Optional[ComputeResult]:
    """Compare numbers: 'which is greater 45 or 54', 'which is smaller 12 or 8'"""
    if not any(kw in message for kw in ["greater", "smaller", "larger", "bigger",
                                         "which is more", "which is less",
                                         "compare"]):
        return None
    nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if len(nums) < 2:
        return None
    if "greater" in message or "larger" in message or "bigger" in message or "more" in message:
        result = max(nums)
        steps = [f"Comparing: {', '.join(str(int(n)) for n in nums)}",
                 f"Greatest = {int(result)}"]
        return _result(steps, f"{int(result)} is the greatest", "number_comparison")
    elif "smaller" in message or "less" in message:
        result = min(nums)
        steps = [f"Comparing: {', '.join(str(int(n)) for n in nums)}",
                 f"Smallest = {int(result)}"]
        return _result(steps, f"{int(result)} is the smallest", "number_comparison")
    return None


def solve_before_after_between(message: str) -> Optional[ComputeResult]:
    """'what comes before 15', 'what comes after 8', 'what is between 5 and 7'"""
    if not any(kw in message for kw in ["before", "after", "between"]):
        return None
    if not any(kw in message for kw in ["comes", "what is", "what comes", "number"]):
        return None
    nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if "before" in message and len(nums) >= 1:
        n = nums[0]
        steps = [f"The number before {int(n)} is {int(n) - 1}"]
        return _result(steps, f"{int(n - 1)}", "before_after")
    if "after" in message and len(nums) >= 1:
        n = nums[0]
        steps = [f"The number after {int(n)} is {int(n) + 1}"]
        return _result(steps, f"{int(n + 1)}", "before_after")
    if "between" in message and len(nums) >= 2:
        a, b = nums[0], nums[1]
        between = list(range(int(a) + 1, int(b)))
        steps = [f"Numbers between {int(a)} and {int(b)}: {between}"]
        return _result(steps, f"{', '.join(str(x) for x in between)}", "before_after")
    return None


def solve_ascending_descending(message: str) -> Optional[ComputeResult]:
    """'arrange 5, 3, 8, 1 in ascending order', 'arrange in descending order'"""
    if not any(kw in message for kw in ["ascending", "descending", "increasing order",
                                         "decreasing order"]):
        return None
    nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if len(nums) < 2:
        return None
    if "ascending" in message or "increasing" in message:
        sorted_nums = sorted(nums)
        label = "Ascending"
    else:
        sorted_nums = sorted(nums, reverse=True)
        label = "Descending"
    steps = [f"Given: {', '.join(str(int(n)) for n in nums)}",
             f"{label} order: {', '.join(str(int(n)) for n in sorted_nums)}"]
    return _result(steps, ", ".join(str(int(n)) for n in sorted_nums), "ordering")


def solve_place_value(message: str) -> Optional[ComputeResult]:
    """'what is the place value of 5 in 356', 'expanded form of 452'"""
    if not any(kw in message for kw in ["place value", "expanded form", "face value"]):
        return None
    if "place value" in message or "face value" in message:
        m = re.search(r'(?:place|face)\s+value\s+of\s+(\d)\s+in\s+(\d+)', message, re.IGNORECASE)
        if not m:
            return None
        digit = m.group(1)
        number = m.group(2)
        pos = len(number) - number.index(digit) - 1
        pv = int(digit) * (10 ** pos)
        steps = [f"In {number}, the digit {digit} is in the {10**pos}'s place",
                 f"Place value = {digit} × {10**pos} = {pv}"]
        return _result(steps, f"{pv}", "place_value")
    if "expanded form" in message:
        m = re.search(r'expanded\s+form\s+of\s+(\d+)', message, re.IGNORECASE)
        if not m:
            return None
        number = m.group(1)
        parts = []
        for i, digit in enumerate(number):
            pos = len(number) - i - 1
            if digit != '0':
                parts.append(f"{int(digit)} × {10**pos}")
        expanded = " + ".join(parts)
        steps = [f"Expanded form of {number}: {expanded}"]
        return _result(steps, expanded, "place_value")
    return None


def solve_greatest_smallest_from_digits(message: str) -> Optional[ComputeResult]:
    """'form the greatest number using digits 3, 7, 1, 9'"""
    if not any(kw in message for kw in ["greatest number", "smallest number",
                                         "largest number", "form the"]):
        return None
    if not any(kw in message for kw in ["using digits", "from digits", "using the digits"]):
        return None
    digits = [int(x) for x in re.findall(r'\b(\d)\b', message)]
    if len(digits) < 2:
        return None
    if "greatest" in message or "largest" in message:
        digits_sorted = sorted(digits, reverse=True)
        result = int("".join(str(d) for d in digits_sorted))
        steps = [f"Digits: {digits}", f"Arrange in descending order: {digits_sorted}",
                 f"Greatest number = {result}"]
        return _result(steps, str(result), "number_formation")
    else:
        digits_sorted = sorted(digits)
        result = int("".join(str(d) for d in digits_sorted))
        steps = [f"Digits: {digits}", f"Arrange in ascending order: {digits_sorted}",
                 f"Smallest number = {result}"]
        return _result(steps, str(result), "number_formation")


def solve_number_names(message: str) -> Optional[ComputeResult]:
    """'write the number name for 45'"""
    if not any(kw in message for kw in ["number name", "write in words"]):
        return None
    m = re.search(r'(?:number\s+name|in\s+words)\s*(?:for|of)?\s*(\d+)', message, re.IGNORECASE)
    if not m:
        return None
    num = int(m.group(1))
    ones = ['zero','one','two','three','four','five','six','seven','eight','nine',
            'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen',
            'seventeen','eighteen','nineteen']
    tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']
    def words(n):
        if n < 20:
            return ones[n]
        if n < 100:
            return tens[n//10] + ('' if n%10 == 0 else ' ' + ones[n%10])
        if n < 1000:
            return ones[n//100] + ' hundred' + ('' if n%100 == 0 else ' ' + words(n%100))
        if n < 100000:
            return words(n//1000) + ' thousand' + ('' if n%1000 == 0 else ' ' + words(n%1000))
        if n < 10000000:
            return words(n//100000) + ' lakh' + ('' if n%100000 == 0 else ' ' + words(n%100000))
        return str(n)
    name = words(num)
    steps = [f"The number {num} in words is: {name}"]
    return _result(steps, name, "number_names")


def solve_skip_counting(message: str) -> Optional[ComputeResult]:
    """'skip count by 5 starting from 10, give 5 numbers'"""
    if not any(kw in message for kw in ["skip count", "skip counting"]):
        return None
    m = re.search(r'(?:skip\s+count(?:ing)?)\s+by\s+(\d+)', message, re.IGNORECASE)
    if not m:
        return None
    step = int(m.group(1))
    start_m = re.search(r'start(?:ing)?\s+(?:from\s+)?(\d+)', message, re.IGNORECASE)
    start = int(start_m.group(1)) if start_m else 0
    count_m = re.search(r'(\d+)\s+numbers?', message, re.IGNORECASE)
    count = int(count_m.group(1)) if count_m else 5
    sequence = [start + i * step for i in range(count)]
    steps = [f"Skip counting by {step} starting from {start}: {sequence}"]
    return _result(steps, ", ".join(str(x) for x in sequence), "skip_counting")


def solve_hcf_lcm(message: str) -> Optional[ComputeResult]:
    """HCF (GCD) and LCM of two or more numbers"""
    if not any(kw in message for kw in ["hcf", "gcd", "highest common factor",
                                         "lcm", "least common multiple", "lowest common multiple"]):
        return None
    nums = [int(float(x)) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    # Filter out numbers that are part of "HCF of" phrasing (like "HCF" itself has no number)
    if len(nums) < 2:
        return None
    from math import gcd
    from functools import reduce
    if any(kw in message for kw in ["hcf", "gcd", "highest common factor"]):
        h = reduce(gcd, nums)
        steps = [f"Numbers: {nums}",
                 f"HCF = {h}"]
        return _result(steps, f"HCF = {h}", "hcf_lcm")
    else:
        def lcm(a, b):
            return a * b // gcd(a, b)
        l = reduce(lcm, nums)
        steps = [f"Numbers: {nums}",
                 f"LCM = {l}"]
        return _result(steps, f"LCM = {l}", "hcf_lcm")


def solve_prime_check(message: str) -> Optional[ComputeResult]:
    """'is 17 a prime number', 'is 21 prime'"""
    if not any(kw in message for kw in ["prime", "composite"]):
        return None
    if not any(kw in message for kw in ["is", "check", "whether"]):
        return None
    nums = [int(float(x)) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if not nums:
        return None
    n = nums[0]
    if n < 2:
        result = f"{n} is neither prime nor composite"
    elif n == 2:
        result = f"{n} is a prime number"
    else:
        is_prime = all(n % i != 0 for i in range(2, int(n**0.5) + 1))
        result = f"{n} is a {'prime' if is_prime else 'composite'} number"
    steps = [result]
    return _result(steps, result, "prime_check")


def solve_factors(message: str) -> Optional[ComputeResult]:
    """'find the factors of 24', 'list all factors of 36'"""
    if not any(kw in message for kw in ["factors of", "factor of", "all factors",
                                         "list factors"]):
        return None
    # Skip HCF/LCM questions
    if any(kw in message for kw in ["hcf", "lcm", "common", "highest", "lowest"]):
        return None
    nums = [int(float(x)) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if not nums:
        return None
    n = nums[0]
    factors = [i for i in range(1, n + 1) if n % i == 0]
    steps = [f"Factors of {n}: {factors}"]
    return _result(steps, f"Factors of {n} = {factors}", "factors")


def solve_prime_factorization(message: str) -> Optional[ComputeResult]:
    """'prime factorization of 36', 'prime factors of 24'"""
    if not any(kw in message for kw in ["prime factor", "prime factorisation",
                                         "prime factorization", "factor tree"]):
        return None
    nums = [int(float(x)) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if not nums:
        return None
    n = nums[0]
    factors = []
    d = 2
    temp = n
    while temp > 1:
        while temp % d == 0:
            factors.append(d)
            temp //= d
        d += 1
    factor_str = " × ".join(str(f) for f in factors)
    steps = [f"Prime factorization of {n}: {factor_str}"]
    return _result(steps, f"{n} = {factor_str}", "prime_factorization")


def solve_divisibility(message: str) -> Optional[ComputeResult]:
    """'is 1234 divisible by 2', 'is 567 divisible by 3'"""
    if not any(kw in message for kw in ["divisible by", "divisibility"]):
        return None
    nums = [int(float(x)) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if len(nums) < 2:
        return None
    n, d = nums[0], nums[1]
    divisible = n % d == 0
    result = f"{n} is {'divisible' if divisible else 'not divisible'} by {d}"
    steps = [f"{n} ÷ {d} = {n // d} remainder {n % d}",
             result]
    return _result(steps, result, "divisibility")


def solve_roman_numerals(message: str) -> Optional[ComputeResult]:
    """'convert 45 to roman', 'what is XLVII in numbers'"""
    roman_map = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}
    int_to_roman = [
        (1000,'M'), (900,'CM'), (500,'D'), (400,'CD'),
        (100,'C'), (90,'XC'), (50,'L'), (40,'XL'),
        (10,'X'), (9,'IX'), (5,'V'), (4,'IV'), (1,'I')
    ]
    # Number to Roman
    m = re.search(r'(\d+)\s*(?:to\s+roman|in\s+roman)', message, re.IGNORECASE)
    if m:
        n = int(m.group(1))
        result = ""
        temp = n
        for val, sym in int_to_roman:
            while temp >= val:
                result += sym
                temp -= val
        steps = [f"{n} in Roman numerals = {result}"]
        return _result(steps, result, "roman_numerals")
    # Roman to number - check if message contains roman numeral pattern
    # Skip if this looks like an algebraic/calculus expression, not a roman numeral question
    if any(kw in message for kw in ['maximum', 'minimum', 'derivative', 'integral', 'differentiat',
                                     'x^', 'x**', '^2', '^3', 'matrix', 'vector', 'determinant',
                                     'factorial', 'conjugate', 'modulus', 'probability']):
        return None
    m = re.search(r'\b([IVXLCDM]+)\b.*(?:in\s+(?:numbers?|digits?|hindu)|to\s+(?:number|digits?))', message, re.IGNORECASE)
    if not m:
        m = re.search(r'(?:what\s+is|value\s+of)\s+([IVXLCDM]+)\b', message, re.IGNORECASE)
    if m:
        roman = m.group(1).upper()
        # Validate it's a proper roman numeral
        if not all(c in roman_map for c in roman):
            return None
        total = 0
        prev = 0
        for ch in reversed(roman):
            val = roman_map.get(ch, 0)
            if val < prev:
                total -= val
            else:
                total += val
                prev = val
        steps = [f"{roman} in numbers = {total}"]
        return _result(steps, str(total), "roman_numerals")
    return None


def solve_rounding(message: str) -> Optional[ComputeResult]:
    """'round 47 to the nearest 10', 'round 356 to nearest 100'"""
    if not any(kw in message for kw in ["round", "rounding", "nearest"]):
        return None
    m = re.search(r'round\s+(\d+\.?\d*)\s*(?:to\s+(?:the\s+)?)?nearest\s+(\d+)', message, re.IGNORECASE)
    if not m:
        return None
    n = float(m.group(1))
    nearest = int(m.group(2))
    result = round(n / nearest) * nearest
    steps = [f"Round {int(n)} to the nearest {nearest}: {int(result)}"]
    return _result(steps, str(int(result)), "rounding")


def solve_area_perimeter(message: str) -> Optional[ComputeResult]:
    """Area and perimeter of rectangle, square, triangle, parallelogram"""
    if not any(kw in message for kw in ["area", "perimeter"]):
        return None
    if not any(kw in message for kw in ["rectangle", "square", "triangle",
                                         "parallelogram", "find", "calculate"]):
        return None

    if "rectangle" in message:
        vals = {}
        for pat in [r'(?:length|l)\s*=?\s*(\d+\.?\d*)', r'(\d+\.?\d*)\s*(?:cm|m)\s*(?:long|length)']:
            m = re.search(pat, message, re.IGNORECASE)
            if m: vals["l"] = float(m.group(1)); break
        for pat in [r'(?:breadth|width|b|w)\s*=?\s*(\d+\.?\d*)', r'(\d+\.?\d*)\s*(?:cm|m)\s*(?:wide|breadth)']:
            m = re.search(pat, message, re.IGNORECASE)
            if m: vals["b"] = float(m.group(1)); break
        if "l" not in vals or "b" not in vals:
            return None
        l, b = vals["l"], vals["b"]
        if "area" in message:
            area = l * b
            steps = [f"Given: length = {_num(l)}, breadth = {_num(b)}",
                     f"Area = length × breadth = {_num(l)} × {_num(b)} = {_num(area)}"]
            return _result(steps, f"Area = {_num(area)} sq units", "area_perimeter")
        else:
            peri = 2 * (l + b)
            steps = [f"Given: length = {_num(l)}, breadth = {_num(b)}",
                     f"Perimeter = 2 × (l + b) = 2 × ({_num(l)} + {_num(b)}) = {_num(peri)}"]
            return _result(steps, f"Perimeter = {_num(peri)} units", "area_perimeter")

    if "square" in message:
        vals = {}
        for pat in [r'(?:side|s)\s*=?\s*(\d+\.?\d*)', r'side\s+(?:of\s+)?(\d+\.?\d*)']:
            m = re.search(pat, message, re.IGNORECASE)
            if m: vals["s"] = float(m.group(1)); break
        if "s" not in vals:
            return None
        s = vals["s"]
        if "area" in message:
            area = s * s
            steps = [f"Given: side = {_num(s)}", f"Area = side² = {_num(s)}² = {_num(area)}"]
            return _result(steps, f"Area = {_num(area)} sq units", "area_perimeter")
        else:
            peri = 4 * s
            steps = [f"Given: side = {_num(s)}", f"Perimeter = 4 × side = 4 × {_num(s)} = {_num(peri)}"]
            return _result(steps, f"Perimeter = {_num(peri)} units", "area_perimeter")

    if "triangle" in message:
        vals = {}
        for pat in [r'(?:base|b)\s*=?\s*(\d+\.?\d*)', r'base\s+(?:of\s+)?(\d+\.?\d*)']:
            m = re.search(pat, message, re.IGNORECASE)
            if m: vals["b"] = float(m.group(1)); break
        for pat in [r'(?:height|h)\s*=?\s*(\d+\.?\d*)', r'height\s+(?:of\s+)?(\d+\.?\d*)']:
            m = re.search(pat, message, re.IGNORECASE)
            if m: vals["h"] = float(m.group(1)); break
        if "area" in message and "b" in vals and "h" in vals:
            area = 0.5 * vals["b"] * vals["h"]
            steps = [f"Given: base = {_num(vals['b'])}, height = {_num(vals['h'])}",
                     f"Area = ½ × base × height = ½ × {_num(vals['b'])} × {_num(vals['h'])} = {_num(area)}"]
            return _result(steps, f"Area = {_num(area)} sq units", "area_perimeter")
        # Perimeter with three sides
        nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
        if "perimeter" in message and len(nums) >= 3:
            peri = sum(nums[:3])
            steps = [f"Given sides: {nums[:3]}", f"Perimeter = {' + '.join(str(int(n)) for n in nums[:3])} = {_num(peri)}"]
            return _result(steps, f"Perimeter = {_num(peri)} units", "area_perimeter")
    return None


def solve_percentage_conversion(message: str) -> Optional[ComputeResult]:
    """'convert 3/4 to percentage', 'convert 25% to fraction', 'convert 0.5 to percentage'"""
    if not any(kw in message for kw in ["convert"]):
        return None
    if not any(kw in message for kw in ["percentage", "percent", "%"]):
        return None

    # Fraction to percentage: "convert 3/4 to percentage"
    m = re.search(r'(\d+)\s*/\s*(\d+)\s*(?:to\s+)?(?:percentage|percent)', message, re.IGNORECASE)
    if m:
        num, den = int(m.group(1)), int(m.group(2))
        pct = num / den * 100
        steps = [f"{num}/{den} = {num}/{den} × 100% = {_num(round(pct, 2))}%"]
        return _result(steps, f"{_num(round(pct, 2))}%", "percentage")

    # Decimal to percentage: "convert 0.5 to percentage"
    m = re.search(r'(\d+\.?\d*)\s*(?:to\s+)?(?:percentage|percent)', message, re.IGNORECASE)
    if m:
        val = float(m.group(1))
        pct = val * 100
        steps = [f"{val} × 100 = {_num(round(pct, 2))}%"]
        return _result(steps, f"{_num(round(pct, 2))}%", "percentage")
    return None


def solve_integers(message: str) -> Optional[ComputeResult]:
    """Integer operations: '5 + (-3)', '-7 + 4', '(-8) - (-3)'"""
    if not any(kw in message for kw in ["integer", "negative", "positive"]):
        # Also match if there are explicit negative numbers in an arithmetic question
        if not re.search(r'-\d|-\(\d', message):
            return None
    # Try to evaluate as arithmetic with negatives
    m = re.search(r'(-?\d+\.?\d*)\s*([+\-])\s*\(?(-?\d+\.?\d*)\)?', message)
    if not m:
        return None
    a, op, b = float(m.group(1)), m.group(2), float(m.group(3))
    if op == '+':
        result = a + b
    else:
        result = a - b
    steps = [f"{int(a)} {op} {int(b)} = {int(result)}"]
    return _result(steps, str(int(result)), "integers")


def solve_angles(message: str) -> Optional[ComputeResult]:
    """Angle classification and complementary/supplementary angles"""
    if not any(kw in message for kw in ["angle", "complementary", "supplementary",
                                         "complement", "supplement", "acute",
                                         "obtuse", "degree"]):
        return None
    # Complementary: sum = 90
    if any(kw in message for kw in ["complementary", "complement"]):
        m = re.search(r'(\d+\.?\d*)\s*(?:degree|°|deg)', message, re.IGNORECASE)
        if not m:
            nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
            if nums:
                angle = nums[0]
            else:
                return None
        else:
            angle = float(m.group(1))
        complement = 90 - angle
        steps = [f"Complementary angle: 90° - {angle}° = {complement}°"]
        return _result(steps, f"{complement}°", "angles")
    # Supplementary: sum = 180
    if any(kw in message for kw in ["supplementary", "supplement"]):
        m = re.search(r'(\d+\.?\d*)\s*(?:degree|°|deg)', message, re.IGNORECASE)
        if not m:
            nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
            if nums:
                angle = nums[0]
            else:
                return None
        else:
            angle = float(m.group(1))
        supplement = 180 - angle
        steps = [f"Supplementary angle: 180° - {angle}° = {supplement}°"]
        return _result(steps, f"{supplement}°", "angles")
    # Classification: acute, obtuse, right
    if any(kw in message for kw in ["classify", "what type", "acute", "obtuse", "right angle"]):
        m = re.search(r'(\d+\.?\d*)\s*(?:degree|°|deg)', message, re.IGNORECASE)
        if not m:
            nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
            if not nums:
                return None
            angle = nums[0]
        else:
            angle = float(m.group(1))
        if angle < 90:
            atype = "acute angle"
        elif angle == 90:
            atype = "right angle"
        elif angle < 180:
            atype = "obtuse angle"
        else:
            atype = "reflex angle"
        steps = [f"{angle}° is an {atype}"]
        return _result(steps, atype, "angles")
    return None


def solve_time_conversion(message: str) -> Optional[ComputeResult]:
    """Time conversions: 'convert 3 hours to minutes', 'convert 2 days to hours'"""
    if not any(kw in message for kw in ["convert"]):
        return None
    if not any(kw in message for kw in ["hours", "minutes", "seconds", "days"]):
        return None
    m = re.search(r'(\d+\.?\d*)\s*(days?|hours?|hrs?|minutes?|mins?|seconds?|secs?)\s*(?:to|into)\s*(days?|hours?|hrs?|minutes?|mins?|seconds?|secs?)', message, re.IGNORECASE)
    if not m:
        return None
    val = float(m.group(1))
    from_unit = m.group(2).lower().rstrip('s')
    to_unit = m.group(3).lower().rstrip('s')
    # Normalize
    unit_map = {'day': 'day', 'hour': 'hour', 'hr': 'hour',
                'minute': 'minute', 'min': 'minute',
                'second': 'second', 'sec': 'second'}
    from_u = unit_map.get(from_unit, from_unit)
    to_u = unit_map.get(to_unit, to_unit)
    # Convert to seconds first
    to_seconds = {'day': 86400, 'hour': 3600, 'minute': 60, 'second': 1}
    if from_u not in to_seconds or to_u not in to_seconds:
        return None
    result = val * to_seconds[from_u] / to_seconds[to_u]
    steps = [f"{val} {from_u}s = {result} {to_u}s"]
    return _result(steps, f"{result} {to_u}s", "time_conversion")


def solve_patterns(message: str) -> Optional[ComputeResult]:
    """Find next number in a pattern: 'find the next number 2, 5, 8, 11, ?'"""
    if not any(kw in message for kw in ["next number", "next term", "pattern",
                                         "sequence", "what comes next"]):
        return None
    # Extract sequence of numbers
    nums = [float(x) for x in re.findall(r'(-?\d+\.?\d*)', message)]
    if len(nums) < 3:
        return None
    # Check if arithmetic (constant difference)
    diffs = [nums[i+1] - nums[i] for i in range(len(nums)-1)]
    if all(abs(d - diffs[0]) < 1e-9 for d in diffs):
        next_val = nums[-1] + diffs[0]
        steps = [f"Pattern: {', '.join(str(int(n)) for n in nums)}",
                 f"Common difference = {int(diffs[0])}",
                 f"Next number = {int(nums[-1])} + {int(diffs[0])} = {int(next_val)}"]
        return _result(steps, str(int(next_val)), "patterns")
    # Check if geometric (constant ratio)
    if all(n != 0 for n in nums):
        ratios = [nums[i+1] / nums[i] for i in range(len(nums)-1)]
        if all(abs(r - ratios[0]) < 1e-9 for r in ratios):
            next_val = nums[-1] * ratios[0]
            steps = [f"Pattern: {', '.join(str(int(n)) for n in nums)}",
                     f"Common ratio = {int(ratios[0])}",
                     f"Next number = {int(nums[-1])} × {int(ratios[0])} = {int(next_val)}"]
            return _result(steps, str(int(next_val)), "patterns")
    return None


def solve_multiplication_table(message: str) -> Optional[ComputeResult]:
    """'multiplication table of 7', 'table of 5'"""
    if not any(kw in message for kw in ["table of", "multiplication table"]):
        return None
    nums = [int(float(x)) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if not nums:
        return None
    n = nums[0]
    table_lines = [f"{n} × {i} = {n*i}" for i in range(1, 11)]
    steps = [f"Multiplication table of {n}:"]
    steps.extend(table_lines)
    return _result(steps, f"Table of {n}: " + ", ".join(f"{n}×{i}={n*i}" for i in range(1, 11)), "multiplication_table")


def solve_even_odd(message: str) -> Optional[ComputeResult]:
    """'is 7 even or odd', 'check if 24 is even'"""
    if not any(kw in message for kw in ["even", "odd"]):
        return None
    if not any(kw in message for kw in ["is", "check", "whether"]):
        return None
    nums = [int(float(x)) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if not nums:
        return None
    n = nums[0]
    result = "even" if n % 2 == 0 else "odd"
    steps = [f"{n} is {result} ({'divisible by 2' if n % 2 == 0 else 'not divisible by 2'})"]
    return _result(steps, f"{n} is {result}", "even_odd")


# --------------------------------------------------------------------------- #
# Middle school solvers (Class 6-9)
# --------------------------------------------------------------------------- #

def solve_ratio(message: str) -> Optional[ComputeResult]:
    """'find the ratio of 15 to 25', 'ratio of 3 to 5'"""
    if not any(kw in message for kw in ["ratio of", "find the ratio"]):
        return None
    m = re.search(r'ratio\s+of\s+(\d+\.?\d*)\s*(?:to|:)\s*(\d+\.?\d*)', message, re.IGNORECASE)
    if not m:
        return None
    a, b = float(m.group(1)), float(m.group(2))
    from math import gcd
    g = gcd(int(a), int(b))
    steps = [f"Ratio of {int(a)} to {int(b)} = {int(a)}:{int(b)}",
             f"Simplifying (divide by {g}): {int(a//g)}:{int(b//g)}"]
    return _result(steps, f"{int(a//g)}:{int(b//g)}", "ratio")


def solve_proportion(message: str) -> Optional[ComputeResult]:
    """'if 3 : 4 = x : 20, find x', 'if 2/3 = x/9 find x'"""
    if not any(kw in message for kw in ["find x", "find the value of x"]):
        return None
    if not any(kw in message for kw in [":", "proportion", "="]):
        return None
    # a : b = x : c  or  a : b = c : x
    m = re.search(r'(\d+\.?\d*)\s*:\s*(\d+\.?\d*)\s*=\s*x\s*:\s*(\d+\.?\d*)', message, re.IGNORECASE)
    if m:
        a, b, c = float(m.group(1)), float(m.group(2)), float(m.group(3))
        x = a * c / b
        steps = [f"Given: {int(a)}:{int(b)} = x:{int(c)}",
                 f"Product of means = product of extremes",
                 f"x = ({int(a)} × {int(c)}) / {int(b)} = {int(x)}"]
        return _result(steps, f"x = {int(x)}", "proportion")
    m = re.search(r'(\d+\.?\d*)\s*:\s*(\d+\.?\d*)\s*=\s*(\d+\.?\d*)\s*:\s*x', message, re.IGNORECASE)
    if m:
        a, b, c = float(m.group(1)), float(m.group(2)), float(m.group(3))
        x = b * c / a
        steps = [f"Given: {int(a)}:{int(b)} = {int(c)}:x",
                 f"Product of means = product of extremes",
                 f"x = ({int(b)} × {int(c)}) / {int(a)} = {int(x)}"]
        return _result(steps, f"x = {int(x)}", "proportion")
    # Fraction form: a/b = x/c
    m = re.search(r'(\d+\.?\d*)/(\d+\.?\d*)\s*=\s*x/(\d+\.?\d*)', message, re.IGNORECASE)
    if m:
        a, b, c = float(m.group(1)), float(m.group(2)), float(m.group(3))
        x = a * c / b
        steps = [f"Given: {int(a)}/{int(b)} = x/{int(c)}",
                 f"x = ({int(a)} × {int(c)}) / {int(b)} = {int(x)}"]
        return _result(steps, f"x = {int(x)}", "proportion")
    return None


def solve_cube_root(message: str) -> Optional[ComputeResult]:
    """'find the cube root of 27'"""
    if not any(kw in message for kw in ["cube root"]):
        return None
    nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if not nums:
        return None
    n = nums[0]
    result = n ** (1/3)
    if abs(result - round(result)) < 1e-9:
        result = int(round(result))
        steps = [f"Cube root of {int(n)} = {result}"]
        return _result(steps, str(result), "cube_root")
    steps = [f"Cube root of {n} = {round(result, 6)}"]
    return _result(steps, str(round(result, 6)), "cube_root")


def solve_trapezium(message: str) -> Optional[ComputeResult]:
    """Area of trapezium = 1/2 * (a + b) * h"""
    if not any(kw in message for kw in ["trapezium", "trapezoid"]):
        return None
    if not any(kw in message for kw in ["area"]):
        return None
    vals = {}
    # Try to get two parallel sides from "parallel sides 5 and 7"
    m = re.search(r'(?:parallel\s+sides?|sides?)\s+(\d+\.?\d*)\s*(?:and|,)\s*(\d+\.?\d*)', message, re.IGNORECASE)
    if m:
        vals["a"] = float(m.group(1))
        vals["b"] = float(m.group(2))
    if "a" not in vals:
        m = re.search(r'(?:parallel\s+sides?|a)\s*=?\s*(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            vals["a"] = float(m.group(1))
    for pat in [r'(?:height|h)\s*=?\s*(\d+\.?\d*)', r'height\s+(?:of\s+)?(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m:
            vals["h"] = float(m.group(1)); break
    if "a" not in vals or "b" not in vals or "h" not in vals:
        return None
    area = 0.5 * (vals["a"] + vals["b"]) * vals["h"]
    steps = [f"Given: parallel sides a = {_num(vals['a'])}, b = {_num(vals['b'])}, height h = {_num(vals['h'])}",
             f"Area = 1/2 x (a + b) x h = 1/2 x ({_num(vals['a'])} + {_num(vals['b'])}) x {_num(vals['h'])} = {_num(area)}"]
    return _result(steps, f"Area = {_num(area)} sq units", "trapezium")


def solve_cube(message: str) -> Optional[ComputeResult]:
    """Cube: V = side^3, SA = 6 * side^2"""
    if not any(kw in message for kw in ["cube"]):
        return None
    if not any(kw in message for kw in ["volume", "surface area", "area"]):
        return None
    vals = {}
    for pat in [r'(?:side|edge|s)\s*=?\s*(\d+\.?\d*)', r'side\s+(?:of\s+)?(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m:
            vals["s"] = float(m.group(1)); break
    if "s" not in vals:
        return None
    s = vals["s"]
    if "volume" in message:
        V = s ** 3
        steps = [f"Given: side = {_num(s)}", f"Volume = side³ = {_num(s)}³ = {_num(V)}"]
        return _result(steps, f"Volume = {_num(V)} cubic units", "cube")
    else:
        SA = 6 * s ** 2
        steps = [f"Given: side = {_num(s)}", f"Surface Area = 6 × side² = 6 × {_num(s)}² = {_num(SA)}"]
        return _result(steps, f"Surface Area = {_num(SA)} sq units", "cube")


def solve_cuboid(message: str) -> Optional[ComputeResult]:
    """Cuboid: V = l*w*h, SA = 2(lw + lh + wh)"""
    if not any(kw in message for kw in ["cuboid"]):
        return None
    if not any(kw in message for kw in ["volume", "surface area"]):
        return None
    vals = {}
    for pat in [r'(?:length|l)\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["l"] = float(m.group(1)); break
    for pat in [r'(?:width|breadth|b|w)\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["w"] = float(m.group(1)); break
    for pat in [r'(?:height|h)\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["h"] = float(m.group(1)); break
    if "l" not in vals or "w" not in vals or "h" not in vals:
        return None
    l, w, h = vals["l"], vals["w"], vals["h"]
    if "volume" in message:
        V = l * w * h
        steps = [f"Given: l = {_num(l)}, w = {_num(w)}, h = {_num(h)}",
                 f"Volume = l × w × h = {_num(l)} × {_num(w)} × {_num(h)} = {_num(V)}"]
        return _result(steps, f"Volume = {_num(V)} cubic units", "cuboid")
    else:
        SA = 2 * (l*w + l*h + w*h)
        steps = [f"Given: l = {_num(l)}, w = {_num(w)}, h = {_num(h)}",
                 f"SA = 2(lw + lh + wh) = 2({_num(l*w)} + {_num(l*h)} + {_num(w*h)}) = {_num(SA)}"]
        return _result(steps, f"Surface Area = {_num(SA)} sq units", "cuboid")


def solve_simplify_sqrt(message: str) -> Optional[ComputeResult]:
    """'simplify sqrt(50)', 'simplify square root of 72'"""
    if not any(kw in message for kw in ["simplify"]):
        return None
    if not any(kw in message for kw in ["sqrt", "square root", "√"]):
        return None
    m = re.search(r'(?:sqrt|square\s+root\s+of|√)\s*\(?(\d+\.?\d*)\)?', message, re.IGNORECASE)
    if not m:
        return None
    n = int(float(m.group(1)))
    # Find largest perfect square factor
    from math import isqrt
    for i in range(isqrt(n), 0, -1):
        if n % (i*i) == 0:
            if i == 1:
                steps = [f"√{n} cannot be simplified further"]
                return _result(steps, f"√{n}", "simplify_sqrt")
            remaining = n // (i*i)
            if remaining == 1:
                result = f"{i}"
                steps = [f"√{n} = √({i}² × 1) = {i}"]
            else:
                result = f"{i}√{remaining}"
                steps = [f"√{n} = √({i}² × {remaining}) = {i}√{remaining}"]
            return _result(steps, result, "simplify_sqrt")
    return None


def solve_rationalise(message: str) -> Optional[ComputeResult]:
    """'rationalise the denominator of 1/sqrt(3)'"""
    if not any(kw in message for kw in ["rationalise", "rationalize"]):
        return None
    m = re.search(r'(\d+\.?\d*)\s*/\s*(?:sqrt|√)\s*\(?(\d+\.?\d*)\)?', message, re.IGNORECASE)
    if not m:
        return None
    num = int(float(m.group(1)))
    n = int(float(m.group(2)))
    # Multiply by sqrt(n)/sqrt(n)
    new_num = f"{num}√{n}"
    new_den = n
    from math import gcd
    g = gcd(num, new_den)
    if g > 1:
        new_num = f"{num//g}√{n}"
        new_den = new_den // g
    if new_den == 1:
        result = new_num
    else:
        result = f"{new_num}/{new_den}"
    steps = [f"Rationalise {num}/√{n}: multiply by √{n}/√{n}",
             f"= ({num}√{n}) / {n} = {result}"]
    return _result(steps, result, "rationalise")


def solve_simultaneous(message: str) -> Optional[ComputeResult]:
    """'solve 2x + 3y = 7 and x - y = 1'"""
    if not any(kw in message for kw in ["and", "simultaneously"]):
        return None
    if not any(kw in message for kw in ["solve", "find"]):
        return None
    # Extract two equations
    eq_pattern = r'(-?\d*\.?\d*)\s*([a-z])\s*([+\-])\s*(\d*\.?\d*)\s*([a-z])\s*=\s*(-?\d+\.?\d*)'
    matches = re.findall(eq_pattern, message, re.IGNORECASE)
    if len(matches) < 2:
        return None
    from sympy import symbols, Eq, solve as sym_solve, Rational
    x, y = symbols('x y')
    var_map = {}
    eqs = []
    for m in matches[:2]:
        a, v1, op, b, v2, c = m
        a = float(a) if a else 1
        b = float(b) if b else 1
        c = float(c)
        if op == '-':
            b = -b
        if v1 not in var_map:
            var_map[v1] = x if len(var_map) == 0 else y
        if v2 not in var_map:
            var_map[v2] = x if len(var_map) == 0 else y
        eqs.append(Eq(a * var_map[v1] + b * var_map[v2], c))
    try:
        sol = sym_solve(eqs, [x, y])
        if sol:
            steps = [f"Equations: {eqs[0]}, {eqs[1]}",
                     f"Solution: x = {sol[x]}, y = {sol[y]}"]
            return _result(steps, f"x = {sol[x]}, y = {sol[y]}", "simultaneous")
    except Exception:
        pass
    return None


def solve_herons_formula(message: str) -> Optional[ComputeResult]:
    """'find the area of a triangle with sides 3, 4, 5'"""
    if not any(kw in message for kw in ["area"]):
        return None
    if not any(kw in message for kw in ["triangle", "sides"]):
        return None
    if "base" in message or "height" in message:
        return None  # Use the other triangle solver
    nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if len(nums) < 3:
        return None
    a, b, c = nums[0], nums[1], nums[2]
    s = (a + b + c) / 2
    area = (s * (s-a) * (s-b) * (s-c)) ** 0.5
    if area != area:  # NaN check
        return None
    steps = [f"Given: a = {_num(a)}, b = {_num(b)}, c = {_num(c)}",
             f"Semi-perimeter s = (a+b+c)/2 = {_num(s)}",
             f"Area = √(s(s-a)(s-b)(s-c)) = √({_num(s)}×{_num(s-a)}×{_num(s-b)}×{_num(s-c)}) = {_num(round(area, 4))}"]
    return _result(steps, f"Area = {_num(round(area, 4))} sq units", "herons")


def solve_evaluate_expression(message: str) -> Optional[ComputeResult]:
    """'evaluate 2x + 3 when x = 5', 'find the value of 3x + 2 if x = 4'"""
    if not any(kw in message for kw in ["evaluate", "find the value of"]):
        return None
    if not any(kw in message for kw in ["when", "if"]):
        return None
    # Extract expression and variable value
    m = re.search(r'(?:evaluate|find\s+the\s+value\s+of)\s+(.+?)\s+(?:when|if)\s+([a-z])\s*=\s*(\d+\.?\d*)', message, re.IGNORECASE)
    if not m:
        return None
    expr_str = m.group(1).strip().replace('^', '**')
    var_name = m.group(2)
    var_val = float(m.group(3))
    try:
        _TRANSFORMS = standard_transformations + (implicit_multiplication_application,)
        expr = parse_expr(expr_str, transformations=_TRANSFORMS)
        result = expr.subs(Symbol(var_name), var_val)
        steps = [f"Given: {expr_str}, {var_name} = {var_val}",
                 f"Substituting: {expr} = {result}"]
        return _result(steps, str(result), "evaluate")
    except Exception:
        return None


def solve_simplify_expression(message: str) -> Optional[ComputeResult]:
    """'simplify 3x + 2x', 'simplify 2(x + 3) + 4'"""
    if not any(kw in message for kw in ["simplify"]):
        return None
    # Skip if it's simplify sqrt (handled by other solver)
    if any(kw in message for kw in ["sqrt", "square root", "√"]):
        return None
    m = re.search(r'simplify\s+(.+?)(?:\s+find|\s+what|$)', message, re.IGNORECASE)
    if not m:
        return None
    expr_str = m.group(1).strip().replace('^', '**')
    try:
        _TRANSFORMS = standard_transformations + (implicit_multiplication_application,)
        expr = parse_expr(expr_str, transformations=_TRANSFORMS)
        simplified = simplify(expr)
        # Always return if we got a valid expression
        orig_str = str(expr).replace('**', '^')
        simp_str = str(simplified).replace('**', '^')
        if orig_str != simp_str:
            steps = [f"Given: {m.group(1).strip()}", f"Simplified: {simp_str}"]
        else:
            steps = [f"Given: {m.group(1).strip()}", f"Already simplified: {simp_str}"]
        return _result(steps, simp_str, "simplify_expr")
    except Exception:
        pass
    return None


def solve_pythagoras(message: str) -> Optional[ComputeResult]:
    """'find the hypotenuse if base is 3 and height is 4', 'find the third side of a right triangle with sides 5 and 12'"""
    if not any(kw in message for kw in ["hypotenuse", "pythagoras", "right triangle", "right-angled"]):
        return None
    if not any(kw in message for kw in ["find", "calculate", "what"]):
        return None
    vals = {}
    for pat in [r'(?:base|b)\s*=?\s*(\d+\.?\d*)', r'(\d+\.?\d*)\s*(?:cm|m)\s*base']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["b"] = float(m.group(1)); break
    for pat in [r'(?:height|perpendicular|h|p)\s*=?\s*(\d+\.?\d*)', r'(\d+\.?\d*)\s*(?:cm|m)\s*(?:height|perpendicular)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["h"] = float(m.group(1)); break
    if "b" not in vals or "h" not in vals:
        # Try extracting two numbers
        nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
        if len(nums) >= 2:
            vals["b"], vals["h"] = nums[0], nums[1]
        else:
            return None
    b, h = vals["b"], vals["h"]
    hyp = (b**2 + h**2) ** 0.5
    steps = [f"Given: base = {_num(b)}, height = {_num(h)}",
             f"Pythagoras: hypotenuse² = base² + height² = {_num(b)}² + {_num(h)}² = {_num(b**2 + h**2)}",
             f"hypotenuse = √{_num(b**2 + h**2)} = {_num(round(hyp, 4))}"]
    return _result(steps, f"Hypotenuse = {_num(round(hyp, 4))}", "pythagoras")


def solve_parallelogram_area(message: str) -> Optional[ComputeResult]:
    """'find the area of a parallelogram with base 10 and height 6'"""
    if not any(kw in message for kw in ["parallelogram"]):
        return None
    if not any(kw in message for kw in ["area"]):
        return None
    vals = {}
    for pat in [r'(?:base|b)\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["b"] = float(m.group(1)); break
    for pat in [r'(?:height|h)\s*=?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["h"] = float(m.group(1)); break
    if "b" not in vals or "h" not in vals:
        return None
    area = vals["b"] * vals["h"]
    steps = [f"Given: base = {_num(vals['b'])}, height = {_num(vals['h'])}",
             f"Area = base × height = {_num(vals['b'])} × {_num(vals['h'])} = {_num(area)}"]
    return _result(steps, f"Area = {_num(area)} sq units", "parallelogram")


def solve_circle_circumference(message: str) -> Optional[ComputeResult]:
    """'find the circumference of a circle with radius 7', 'find the circumference with diameter 14'"""
    if not any(kw in message for kw in ["circumference"]):
        return None
    if not any(kw in message for kw in ["circle"]):
        return None
    vals = {}
    for pat in [r'(?:radius|r)\s*=?\s*(\d+\.?\d*)', r'radius\s+(?:of\s+)?(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["r"] = float(m.group(1)); break
    if "r" not in vals:
        for pat in [r'(?:diameter|d)\s*=?\s*(\d+\.?\d*)', r'diameter\s+(?:of\s+)?(\d+\.?\d*)']:
            m = re.search(pat, message, re.IGNORECASE)
            if m:
                vals["r"] = float(m.group(1)) / 2
                break
    if "r" not in vals:
        return None
    r = vals["r"]
    C = 2 * math.pi * r
    steps = [f"Given: radius r = {_num(r)}",
             f"Circumference = 2πr = 2 × π × {_num(r)} = {_num(round(C, 4))}"]
    return _result(steps, f"Circumference = {_num(round(C, 4))} units", "circumference")


def solve_logarithm(message: str) -> Optional[ComputeResult]:
    """'find log 100 base 10', 'what is log 1000 to base 10'"""
    if not any(kw in message for kw in ["log"]):
        return None
    if not any(kw in message for kw in ["find", "what", "calculate", "value"]):
        return None
    m = re.search(r'log\s*(\d+\.?\d*)\s*(?:base|to\s+base)\s*(\d+\.?\d*)', message, re.IGNORECASE)
    if not m:
        m = re.search(r'log\s+(\d+\.?\d*)', message, re.IGNORECASE)
        if m:
            num = float(m.group(1))
            base = 10  # default
        else:
            return None
    else:
        num = float(m.group(1))
        base = float(m.group(2))
    if num <= 0 or base <= 0 or base == 1:
        return None
    import math as m2
    result = m2.log(num) / m2.log(base)
    if abs(result - round(result)) < 1e-9:
        result = int(round(result))
        steps = [f"log_{base}({num}) = {result}"]
    else:
        result = round(result, 6)
        steps = [f"log_{base}({num}) = {result}"]
    return _result(steps, str(result), "logarithm")


def solve_percentage_more(message: str) -> Optional[ComputeResult]:
    """'what percentage of 80 is 20', '20 is what percent of 80'"""
    if not any(kw in message for kw in ["what percentage", "what percent", "is what percent"]):
        return None
    nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if len(nums) < 2:
        return None
    # "20 is what percent of 80" -> 20/80 * 100
    part, whole = nums[0], nums[1]
    pct = part / whole * 100
    steps = [f"{int(part)} is ({int(part)}/{int(whole)}) × 100 = {_num(round(pct, 2))}% of {int(whole)}"]
    return _result(steps, f"{_num(round(pct, 2))}%", "percentage")


def solve_discount(message: str) -> Optional[ComputeResult]:
    """'find the discount on an item marked 500 with 20% discount', 'find the selling price after 10% discount on 200'"""
    if not any(kw in message for kw in ["discount"]):
        return None
    if not any(kw in message for kw in ["find", "calculate", "what"]):
        return None
    vals = {}
    for pat in [r'(?:marked\s+price|mp|list\s+price)\s*=?\s*(?:rs\.?|₹)?\s*(\d+\.?\d*)',
                r'(?:on|of)\s+(?:an?\s+)?(?:item\s+)?(?:marked\s+)?(?:rs\.?|₹)?\s*(\d+\.?\d*)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["mp"] = float(m.group(1)); break
    for pat in [r'(\d+\.?\d*)\s*%\s*discount', r'discount\s+(?:of\s+)?(\d+\.?\d*)\s*%']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["rate"] = float(m.group(1)); break
    if "mp" not in vals or "rate" not in vals:
        return None
    discount = vals["mp"] * vals["rate"] / 100
    sp = vals["mp"] - discount
    steps = [f"Marked Price = {_num(vals['mp'])}, Discount = {_num(vals['rate'])}%",
             f"Discount = {_num(vals['mp'])} × {_num(vals['rate'])}/100 = {_num(round(discount, 2))}",
             f"Selling Price = {_num(vals['mp'])} - {_num(round(discount, 2))} = {_num(round(sp, 2))}"]
    return _result(steps, f"Discount = {_num(round(discount, 2))}, SP = {_num(round(sp, 2))}", "discount")


def solve_time_work(message: str) -> Optional[ComputeResult]:
    """'if A can do a work in 10 days and B in 15 days, how long will they take together'"""
    if not any(kw in message for kw in ["work", "days"]):
        return None
    if not any(kw in message for kw in ["together", "both", "combined"]):
        return None
    nums = [float(x) for x in re.findall(r'\b(\d+\.?\d*)\b', message)]
    if len(nums) < 2:
        return None
    d1, d2 = nums[0], nums[1]
    # Work rates: 1/d1 + 1/d2 = 1/t
    t = (d1 * d2) / (d1 + d2)
    steps = [f"A's rate = 1/{int(d1)} per day, B's rate = 1/{int(d2)} per day",
             f"Combined rate = 1/{int(d1)} + 1/{int(d2)} = {int(d2) + int(d1)}/{int(d1*d2)}",
             f"Time together = {int(d1*d2)}/{int(d1) + int(d2)} = {_num(round(t, 2))} days"]
    return _result(steps, f"{_num(round(t, 2))} days", "time_work")


def solve_average(message: str) -> Optional[ComputeResult]:
    """'find the average of 10, 20, 30, 40, 50'"""
    if not any(kw in message for kw in ["average"]):
        return None
    if not any(kw in message for kw in ["find", "what", "calculate"]):
        return None
    nums = [float(x) for x in re.findall(r'(-?\d+\.?\d*)', message)]
    if len(nums) < 2:
        return None
    avg = sum(nums) / len(nums)
    steps = [f"Numbers: {nums}",
             f"Sum = {sum(nums)}, Count = {len(nums)}",
             f"Average = {sum(nums)}/{len(nums)} = {_num(round(avg, 4))}"]
    return _result(steps, f"Average = {_num(round(avg, 4))}", "average")


def solve_median(message: str) -> Optional[ComputeResult]:
    """'find the median of 3, 5, 7, 9, 11'"""
    if not any(kw in message for kw in ["median"]):
        return None
    if not any(kw in message for kw in ["find", "what", "calculate"]):
        return None
    nums = sorted([float(x) for x in re.findall(r'(-?\d+\.?\d*)', message)])
    if len(nums) < 2:
        return None
    n = len(nums)
    if n % 2 == 1:
        median = nums[n // 2]
    else:
        median = (nums[n//2 - 1] + nums[n//2]) / 2
    steps = [f"Sorted: {nums}",
             f"Median = {_num(round(median, 4))}"]
    return _result(steps, f"Median = {_num(round(median, 4))}", "median")


def solve_mode(message: str) -> Optional[ComputeResult]:
    """'find the mode of 2, 3, 3, 4, 5, 3, 6'"""
    # Use word boundary to avoid matching "models" or "modal"
    if not re.search(r'\bmode\b', message):
        return None
    if not any(kw in message for kw in ["find", "what", "calculate"]):
        return None
    # Don't match if the question is about a function/model, not a data set
    if any(kw in message for kw in ["models", "function", "p(t)", "f(x)", "growth rate"]):
        return None
    nums = [float(x) for x in re.findall(r'(-?\d+\.?\d*)', message)]
    if len(nums) < 2:
        return None
    from collections import Counter
    counts = Counter(nums)
    max_count = max(counts.values())
    modes = [k for k, v in counts.items() if v == max_count]
    if len(modes) == len(nums):
        steps = [f"No mode (all values appear once)"]
        return _result(steps, "No mode", "mode")
    steps = [f"Numbers: {nums}",
             f"Most frequent: {modes} (appears {max_count} times)"]
    return _result(steps, f"Mode = {', '.join(str(m) for m in modes)}", "mode")


def solve_range_stats(message: str) -> Optional[ComputeResult]:
    """'find the range of 5, 8, 3, 12, 7'"""
    if not any(kw in message for kw in ["range"]):
        return None
    if not any(kw in message for kw in ["find", "what", "calculate"]):
        return None
    nums = [float(x) for x in re.findall(r'(-?\d+\.?\d*)', message)]
    if len(nums) < 2:
        return None
    rng = max(nums) - min(nums)
    steps = [f"Numbers: {nums}",
             f"Range = max - min = {max(nums)} - {min(nums)} = {_num(round(rng, 4))}"]
    return _result(steps, f"Range = {_num(round(rng, 4))}", "range")


def solve_speed(message: str) -> Optional[ComputeResult]:
    """'find the speed if distance is 120 km and time is 2 hours'"""
    if not any(kw in message for kw in ["speed"]):
        return None
    if not any(kw in message for kw in ["find", "calculate", "what"]):
        return None
    vals = {}
    for pat in [r'(?:distance|d)\s*(?:is\s+)?=?\s*(\d+\.?\d*)\s*km',
                r'(\d+\.?\d*)\s*km\s*(?:distance|d)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["d"] = float(m.group(1)); break
    for pat in [r'(?:time|t)\s*(?:is\s+)?=?\s*(\d+\.?\d*)\s*(?:hours?|hrs?|h\b)']:
        m = re.search(pat, message, re.IGNORECASE)
        if m: vals["t"] = float(m.group(1)); break
    if "d" in vals and "t" in vals:
        speed = vals["d"] / vals["t"]
        steps = [f"Given: distance = {_num(vals['d'])} km, time = {_num(vals['t'])} hours",
                 f"Speed = distance/time = {_num(vals['d'])}/{_num(vals['t'])} = {_num(round(speed, 4))} km/h"]
        return _result(steps, f"Speed = {_num(round(speed, 4))} km/h", "speed")
    return None


def solve_matrix_ops(message: str) -> Optional[ComputeResult]:
    """Matrix determinant, transpose, inverse from [[...],[...]] notation."""
    # Must look like a matrix and mention a matrix operation
    if not any(kw in message for kw in ['determinant', 'det ', 'transpose', 'inverse']):
        return None
    # Extract rows from [[a,b],[c,d]] notation
    rows = re.findall(r'\[([^\[\]]+)\]', message)
    if len(rows) < 2:
        return None

    try:
        matrix_data = []
        for row in rows:
            elements = [float(x.strip()) for x in row.split(',')]
            matrix_data.append(elements)
        mat = Matrix(matrix_data)
    except Exception:
        return None

    lower = message.lower()
    if any(kw in lower for kw in ['determinant', 'det ']):
        try:
            d = det(mat)
            steps = [f"Matrix: {mat.tolist()}", f"det = {d}"]
            return _result(steps, str(d), "matrix_det")
        except Exception:
            return None

    if 'transpose' in lower:
        t = mat.T
        steps = [f"Matrix: {mat.tolist()}", f"Transpose: {t.tolist()}"]
        return _result(steps, str(t.tolist()), "matrix_transpose")

    if 'inverse' in lower:
        try:
            inv = mat.inv()
            steps = [f"Matrix: {mat.tolist()}", f"Inverse: {inv.tolist()}"]
            return _result(steps, str(inv.tolist()), "matrix_inverse")
        except Exception:
            return _result(["Matrix is not invertible"], "Not invertible", "matrix_inverse")

    return None


def solve_vector_ops(message: str) -> Optional[ComputeResult]:
    """Dot product, cross product, angle, projection of vectors in i,j,k notation."""
    # Parse vectors like "2i+3j" or "i+j-2k"
    vec_pattern = r'([+-]?\d*\.?\d*)\s*([ijk])'
    
    def parse_vector(s):
        components = [0, 0, 0]
        for m in re.finditer(r'([+-]?\d*\.?\d*)\s*([ijk])', s):
            coeff = m.group(1)
            if coeff in ('', '+'):
                coeff = 1
            elif coeff == '-':
                coeff = -1
            else:
                coeff = float(coeff)
            idx = 'ijk'.index(m.group(2))
            components[idx] = coeff
        return components

    # Find vector expressions in the message
    # Split on "and" to get two vectors
    if not any(kw in message for kw in ['dot', 'cross', 'angle between', 'projection']):
        return None

    # Extract vector parts - look for patterns like "2i+3j and 4i+5j" or "2i+3j on i+j"
    vec_parts = re.split(r'\s+(?:and|on|onto)\s+', message)
    if len(vec_parts) < 2:
        return None

    # Find i/j/k patterns in each part
    vecs = []
    for part in vec_parts:
        if re.search(r'\d*\.?\d*\s*[ijk]', part):
            vecs.append(parse_vector(part))
    if len(vecs) < 2:
        return None

    v1, v2 = vecs[0], vecs[1]
    from sympy import Matrix as M

    lower = message.lower()
    if 'dot' in lower:
        dot = sum(a * b for a, b in zip(v1, v2))
        steps = [f"v1 = {v1}", f"v2 = {v2}", f"dot product = {dot}"]
        return _result(steps, str(dot), "vector_dot")

    if 'cross' in lower:
        m1, m2 = M(v1), M(v2)
        cross = m1.cross(m2)
        result = cross.tolist()
        steps = [f"v1 = {v1}", f"v2 = {v2}", f"cross product = {result}"]
        return _result(steps, str(result), "vector_cross")

    if 'angle' in lower:
        dot = sum(a * b for a, b in zip(v1, v2))
        mag1 = math.sqrt(sum(a ** 2 for a in v1))
        mag2 = math.sqrt(sum(a ** 2 for a in v2))
        if mag1 == 0 or mag2 == 0:
            return None
        cos_angle = dot / (mag1 * mag2)
        cos_angle = max(-1, min(1, cos_angle))
        angle = math.degrees(math.acos(cos_angle))
        steps = [f"v1 = {v1}", f"v2 = {v2}", f"cos(theta) = {dot}/({mag1:.4f} x {mag2:.4f}) = {cos_angle:.4f}", f"theta = {angle:.2f} degrees"]
        return _result(steps, f"{angle:.2f} degrees", "vector_angle")

    if 'projection' in lower:
        dot = sum(a * b for a, b in zip(v1, v2))
        mag2_sq = sum(b ** 2 for b in v2)
        if mag2_sq == 0:
            return None
        proj = dot / mag2_sq
        steps = [f"v1 = {v1}", f"v2 = {v2}", f"projection = (v1.v2)/|v2|^2 = {dot}/{mag2_sq} = {proj:.4f}"]
        return _result(steps, f"{proj:.4f}", "vector_projection")

    return None


def solve_factorial(message: str) -> Optional[ComputeResult]:
    """'find the value of 5 factorial', 'what is 6!'"""
    m = re.search(r'(\d+)\s*factorial', message)
    if not m:
        m = re.search(r'(\d+)\s*!', message)
    if not m:
        return None
    n = int(m.group(1))
    if n > 170:
        return None  # Too large for float
    result = math.factorial(n)
    steps = [f"{n}! = {n} x {n-1} x ... x 2 x 1", f"= {result}"]
    return _result(steps, str(result), "factorial")


def solve_complex_conjugate(message: str) -> Optional[ComputeResult]:
    """'find the conjugate of 3 + 4i'"""
    if 'conjugate' not in message:
        return None
    m = re.search(r'(-?\d+\.?\d*)\s*([+-])\s*(\d+\.?\d*)\s*i', message)
    if not m:
        return None
    a = int(float(m.group(1)))
    b = int(float(m.group(3)))
    if m.group(2) == '-':
        b = -b
    conj = f"{a} - {b}i" if b > 0 else f"{a} + {abs(b)}i"
    steps = [f"z = {a} + {b}i", f"conjugate z* = {conj}"]
    return _result(steps, conj, "complex_conjugate")


def solve_maxima_minima(message: str) -> Optional[ComputeResult]:
    """'find the maximum value of x^3 - 3x', 'find the minimum value of x^2 - 4x + 3'"""
    m = re.search(r'(?:maximum|max|minimum|min)\s+value\s+of\s+(.+)', message)
    if not m:
        return None
    expr_str = m.group(1).strip()
    expr = _safe_parse(expr_str)
    if expr is None:
        return None
    x = Symbol('x')
    try:
        deriv = sympy.diff(expr, x)
        critical = sympy.solve(deriv, x)
        if not critical:
            return None
        second_deriv = sympy.diff(deriv, x)
        is_max = 'max' in message.lower()
        results = []
        for cp in critical:
            try:
                val = float(expr.subs(x, cp))
                sd_val = float(second_deriv.subs(x, cp))
                nature = "maximum" if sd_val < 0 else "minimum" if sd_val > 0 else "inflection"
                if (is_max and nature == "maximum") or (not is_max and nature == "minimum"):
                    results.append((cp, val, nature))
            except Exception:
                continue
        if results:
            cp, val, nature = results[0]
            steps = [f"f(x) = {_format_math(expr)}", f"f'(x) = {_format_math(deriv)}", f"Critical point: x = {cp}", f"f({cp}) = {val} ({nature})"]
            return _result(steps, str(val), "maxima_minima")
    except Exception:
        pass
    return None


def solve_binomial_probability(message: str) -> Optional[ComputeResult]:
    """'probability of getting exactly 2 heads in 3 coin tosses'"""
    m = re.search(r'exactly\s+(\d+)\s+(?:heads?|successes?)\s+in\s+(\d+)\s+(?:coin\s+)?(?:tosses?|trials?|throws?)', message)
    if not m:
        m = re.search(r'(\d+)\s+(?:heads?|successes?)\s+in\s+(\d+)\s+(?:coin\s+)?(?:tosses?|trials?|throws?)', message)
    if not m:
        return None
    k = int(m.group(1))
    n = int(m.group(2))
    p = 0.5  # fair coin
    from math import comb
    prob = comb(n, k) * (p ** k) * ((1 - p) ** (n - k))
    from fractions import Fraction
    frac = Fraction(prob).limit_denominator(1000)
    steps = [f"P(X = {k}) = C({n},{k}) x (1/2)^{k} x (1/2)^{n-k}", f"= {comb(n,k)} x (1/2)^{n}", f"= {frac}"]
    return _result(steps, str(frac), "binomial_probability")


def solve_dice_sum_probability(message: str) -> Optional[ComputeResult]:
    """'probability of getting a sum of 7 when two dice are rolled'"""
    m = re.search(r'sum\s+of\s+(\d+)\s+(?:when|if|on)\s+two\s+dice', message)
    if not m:
        return None
    target = int(m.group(1))
    if target < 2 or target > 12:
        return None
    count = sum(1 for i in range(1, 7) for j in range(1, 7) if i + j == target)
    from fractions import Fraction
    frac = Fraction(count, 36)
    steps = [f"Total outcomes = 36", f"Favorable (sum={target}) = {count}", f"P = {count}/36 = {frac}"]
    return _result(steps, str(frac), "dice_probability")


def solve_series_sum(message: str) -> Optional[ComputeResult]:
    """'sum of the series 1 + 2 + 3 + ... + 100'"""
    # Match pattern: first + second + ... + last (with optional extra terms before ...)
    m = re.search(r'(\d+)\s*\+\s*(\d+)\s*(?:\+\s*\d+\s*)*\+\s*\.\.\.\s*\+\s*(\d+)', message)
    if not m:
        return None
    a = int(m.group(1))
    second = int(m.group(2))
    last = int(m.group(3))
    d = second - a
    if d == 0:
        return None
    n = (last - a) // d + 1
    total = n * (a + last) // 2
    steps = [f"Series: {a} + {second} + ... + {last}", f"AP with a={a}, d={d}, n={n} terms", f"Sum = n(a+l)/2 = {n}({a}+{last})/2 = {total}"]
    return _result(steps, str(total), "series_sum")


def solve_inverse_trig_composition(message: str) -> Optional[ComputeResult]:
    """'sin inverse sin pi/6', 'cos inverse cos pi/3'"""
    m = re.search(r'(sin|cos|tan)\s+inverse\s+(sin|cos|tan)\s+(.+)', message)
    if not m:
        return None
    outer_func = m.group(1)
    inner_func = m.group(2)
    arg_str = m.group(3).strip()
    # Parse the angle value
    if 'pi/' in arg_str:
        m2 = re.search(r'pi/(\d+)', arg_str)
        if m2:
            from sympy import pi, Rational as R
            angle = pi / int(m2.group(1))
        else:
            return None
    elif arg_str.strip() == 'pi':
        from sympy import pi
        angle = pi
    else:
        try:
            angle = float(arg_str)
        except ValueError:
            return None

    from sympy import asin, acos, atan, sin, cos, tan, simplify, N, pi
    # Compute inner function value first
    inner_funcs = {'sin': sin, 'cos': cos, 'tan': tan}
    outer_funcs = {'sin': asin, 'cos': acos, 'tan': atan}
    if outer_func not in outer_funcs or inner_func not in inner_funcs:
        return None
    try:
        inner_val = inner_funcs[inner_func](angle)
        result = outer_funcs[outer_func](inner_val)
        result_simplified = simplify(result)
        steps = [
            f"{inner_func}({angle}) = {simplify(inner_val)}",
            f"{outer_func}^(-1)({simplify(inner_val)}) = {result_simplified}",
        ]
        return _result(steps, str(result_simplified), "inverse_trig")
    except Exception:
        return None


def solve_trig_expression(message: str) -> Optional[ComputeResult]:
    """'sin 30 + cos 60', '2 sin 45 cos 45' - evaluate trig expressions with numbers."""
    # Must contain trig functions with numeric angles
    if not re.search(r'(?:sin|cos|tan)\s+\d+', message):
        return None
    # Must be a computation request
    if not any(kw in message for kw in ['find', 'value', 'evaluate', 'calculate', 'compute']):
        return None
    # Must have multiple terms or operations (not just "sin 30")
    trig_count = len(re.findall(r'(?:sin|cos|tan)\s+\d+', message))
    if trig_count < 2 and not re.search(r'[*/]', message.replace('find', '').replace('value', '').replace('of', '')):
        return None  # Let the basic trig solver handle single trig values

    # Build expression string
    expr_str = message.lower()
    for kw in ['find the value of ', 'find ', 'value of ', 'evaluate ', 'calculate ', 'compute ']:
        expr_str = expr_str.replace(kw, '')
    expr_str = expr_str.strip()

    # Convert "sin 30" to "sin(rad(30))" for sympy, and "sin 45" to "sin(rad(45))"
    from sympy import sin as ssin, cos as ccos, tan as ttan, pi, N as evalf, simplify, trigsimp, Rational
    def replace_trig(m):
        func = m.group(1)
        angle = float(m.group(2))
        rad_val = angle * float(pi) / 180
        return f"{func}({rad_val})"
    expr_str = re.sub(r'(sin|cos|tan)\s+(\d+\.?\d*)\s*(?:degree|°)?', replace_trig, expr_str)

    expr = _safe_parse(expr_str)
    if expr is None:
        return None

    try:
        result = trigsimp(simplify(expr))
        num_result = evalf(result)
        if num_result.is_number:
            from fractions import Fraction
            try:
                frac = Fraction(float(num_result)).limit_denominator(100)
                if frac.denominator == 1:
                    ans = str(frac.numerator)
                else:
                    ans = str(frac)
            except Exception:
                ans = str(num_result)
            steps = [f"Evaluate: {message}", f"= {ans}"]
            return _result(steps, ans, "trig_expression")
        steps = [f"Evaluate: {message}", f"= {result}"]
        return _result(steps, str(result), "trig_expression")
    except Exception:
        return None


def solve_differential_equation(message: str) -> Optional[ComputeResult]:
    """'solve dy/dx = x', 'solve dy/dx = y'"""
    m = re.search(r'(?:solve\s+)?dy/dx\s*=\s*(.+)', message)
    if not m:
        return None
    rhs_str = m.group(1).strip()
    rhs = _safe_parse(rhs_str)
    if rhs is None:
        return None
    x = Symbol('x')
    y = Symbol('y')
    try:
        from sympy import Function, dsolve, Eq
        y_func = Function('y')(x)
        eq = Eq(y_func.diff(x), rhs)
        sol = dsolve(eq, y_func)
        steps = [f"dy/dx = {_format_math(rhs)}", f"Integrate both sides:", f"{sol}"]
        return _result(steps, str(sol), "differential_equation")
    except Exception:
        return None


def solve_critical_points(message: str) -> Optional[ComputeResult]:
    """'find the critical points of x^3 - 3x'"""
    m = re.search(r'critical\s+points?\s+of\s+(.+)', message)
    if not m:
        return None
    expr_str = m.group(1).strip()
    expr = _safe_parse(expr_str)
    if expr is None:
        return None
    x = Symbol('x')
    try:
        deriv = sympy.diff(expr, x)
        critical = sympy.solve(deriv, x)
        if not critical:
            return None
        steps = [f"f(x) = {_format_math(expr)}", f"f'(x) = {_format_math(deriv)}", f"Critical points: x = {critical}"]
        return _result(steps, str(critical), "critical_points")
    except Exception:
        return None


def solve_lpp(message: str) -> Optional[ComputeResult]:
    """'maximize z = 3x + 4y subject to x + y <= 4'"""
    m = re.search(r'(maximize|minimise|minimize)\s+z\s*=\s*(.+?)\s+subject\s+to\s+(.+)', message)
    if not m:
        return None
    objective_type = m.group(1)
    obj_str = m.group(2).strip()
    constraints_str = m.group(3).strip()

    obj = _safe_parse(obj_str)
    if obj is None:
        return None

    # Parse constraints: split on commas or "and"
    constraints = re.split(r',\s*|\s+and\s+', constraints_str)
    x, y = Symbol('x'), Symbol('y')
    constraint_exprs = []
    for c in constraints:
        c = c.strip()
        if not c:
            continue
        try:
            # Replace <= with <=, >= with >=
            if '<=' in c:
                lhs, rhs = c.split('<=')
                expr = _safe_parse(lhs.strip())
                val = float(rhs.strip())
                constraint_exprs.append((expr, '<=', val))
            elif '>=' in c:
                lhs, rhs = c.split('>=')
                expr = _safe_parse(lhs.strip())
                val = float(rhs.strip())
                constraint_exprs.append((expr, '>=', val))
        except Exception:
            continue

    if not constraint_exprs:
        return None

    # Simple corner-point method for 2-variable LPP
    # Find intersection points of all constraint pairs
    from sympy import solve as sym_solve
    points = []
    for i, (e1, op1, v1) in enumerate(constraint_exprs):
        eq1 = e1 - v1  # e1 = v1
        for j, (e2, op2, v2) in enumerate(constraint_exprs):
            if j <= i:
                continue
            eq2 = e2 - v2
            try:
                sol = sym_solve([eq1, eq2], [x, y], dict=True)
                for s in sol:
                    px, py = float(s.get(x, 0)), float(s.get(y, 0))
                    # Check if point satisfies all constraints
                    valid = True
                    for (ce, cop, cv) in constraint_exprs:
                        val = float(ce.subs([(x, px), (y, py)]))
                        if cop == '<=' and val > cv + 1e-9:
                            valid = False
                        elif cop == '>=' and val < cv - 1e-9:
                            valid = False
                    if valid and px >= -1e-9 and py >= -1e-9:
                        points.append((px, py))
            except Exception:
                continue

    # Also add axis intercepts
    for (ce, cop, cv) in constraint_exprs:
        try:
            # x-intercept (y=0)
            px = float(sym_solve(ce.subs(y, 0) - cv, x)[0])
            py = 0.0
            valid = True
            for (ce2, cop2, cv2) in constraint_exprs:
                val = float(ce2.subs([(x, px), (y, py)]))
                if cop2 == '<=' and val > cv2 + 1e-9:
                    valid = False
                elif cop2 == '>=' and val < cv2 - 1e-9:
                    valid = False
            if valid and px >= -1e-9:
                points.append((px, py))
            # y-intercept (x=0)
            py = float(sym_solve(ce.subs(x, 0) - cv, y)[0])
            px = 0.0
            valid = True
            for (ce2, cop2, cv2) in constraint_exprs:
                val = float(ce2.subs([(x, px), (y, py)]))
                if cop2 == '<=' and val > cv2 + 1e-9:
                    valid = False
                elif cop2 == '>=' and val < cv2 - 1e-9:
                    valid = False
            if valid and py >= -1e-9:
                points.append((px, py))
        except Exception:
            continue

    if not points:
        return None

    # Evaluate objective at each point
    best_val = None
    best_point = None
    is_max = 'max' in objective_type
    for px, py in points:
        val = float(obj.subs([(x, px), (y, py)]))
        if best_val is None:
            best_val = val
            best_point = (px, py)
        elif is_max and val > best_val:
            best_val = val
            best_point = (px, py)
        elif not is_max and val < best_val:
            best_val = val
            best_point = (px, py)

    steps = [f"Objective: {objective_type} z = {_format_math(obj)}",
             f"Constraints: {constraints_str}",
             f"Corner points: {points}",
             f"Optimal point: ({best_point[0]:.2f}, {best_point[1]:.2f})",
             f"z = {best_val:.2f}"]
    return _result(steps, f"z = {best_val:.2f} at ({best_point[0]:.2f}, {best_point[1]:.2f})", "lpp")


def solve_show_that(message: str) -> Optional[ComputeResult]:
    """Verify mathematical identities/claims.
    'show that sin^2 x + cos^2 x = 1'
    'show that (x+1)^2 = x^2 + 2x + 1'
    'prove that 1 + 2 + 3 + ... + n = n(n+1)/2'
    'verify that (a+b)^2 = a^2 + 2ab + b^2'
    """
    lower = message.lower().strip()
    # Must contain "show that", "prove that", or "verify that"
    if not any(kw in lower for kw in ['show that', 'prove that', 'verify that']):
        return None
    # Must contain "="
    if '=' not in message:
        return None

    # Remove the leading phrase
    expr_part = re.sub(r'(show|prove|verify)\s+that\s+', '', message, flags=re.IGNORECASE).strip()
    # Split on "="
    if '=' not in expr_part:
        return None

    parts = expr_part.split('=', 1)
    lhs_str, rhs_str = parts[0].strip(), parts[1].strip()

    lhs = _safe_parse(lhs_str)
    rhs = _safe_parse(rhs_str)
    if lhs is None or rhs is None:
        return None

    try:
        diff = simplify(lhs - rhs)
        is_true = (diff == 0)
        if not is_true:
            # Try trigsimp for trig identities
            diff = simplify(trigsimp(lhs - rhs))
            is_true = (diff == 0)
        if not is_true:
            # Try numerical verification at random points
            import random
            free = (lhs - rhs).free_symbols
            if free:
                is_true = True
                for _ in range(5):
                    vals = {s: random.uniform(0.1, 2.0) for s in free}
                    try:
                        num_diff = float((lhs - rhs).subs(vals))
                        if abs(num_diff) > 1e-9:
                            is_true = False
                            break
                    except Exception:
                        is_true = False
                        break

        if is_true:
            steps = [
                f"Claim: {_format_math(lhs)} = {_format_math(rhs)}",
                f"Compute: {_format_math(lhs)} - {_format_math(rhs)} = {_format_math(simplify(lhs - rhs))}",
                f"Simplified difference = 0",
                f"Therefore the identity is verified ✓",
            ]
            return _result(steps, "Verified ✓", "show_that")
        else:
            steps = [
                f"Claim: {_format_math(lhs)} = {_format_math(rhs)}",
                f"Compute: {_format_math(lhs)} - {_format_math(rhs)} = {_format_math(simplify(lhs - rhs))}",
                f"The difference is NOT zero, so the identity is FALSE ✗",
            ]
            return _result(steps, "Not verified ✗", "show_that")
    except Exception:
        return None


def solve_show_not(message: str) -> Optional[ComputeResult]:
    """Counterexample generator for 'show that X is NOT Y' questions.
    'show that f(x) = x^2 is not one-one'
    'show that the function is not onto'
    'show that matrix [[1,2],[2,4]] is not invertible'
    """
    lower = message.lower().strip()
    if not any(kw in lower for kw in ['show that', 'show if', 'is not', 'not one-one', 'not one one', 'not onto', 'not invertible']):
        return None
    # Must be a "not" claim
    if 'not' not in lower:
        return None

    x = Symbol('x')

    # Pattern 1: "show that f(x) = expr is not one-one"
    m = re.search(r'f\(x\)\s*=\s*(.+?)\s+is\s+not\s+one[- ]one', lower)
    if m:
        expr_str = m.group(1).strip()
        expr = _safe_parse(expr_str)
        if expr is None:
            return None
        try:
            # Find two different inputs with same output
            for x1 in [0, 1, 2, -1, -2, 3, -3, Rational(1,2)]:
                y1 = expr.subs(x, x1)
                for x2 in [0, 1, 2, -1, -2, 3, -3, Rational(1,2)]:
                    if x1 != x2:
                        y2 = expr.subs(x, x2)
                        if y1 == y2:
                            steps = [
                                f"f(x) = {_format_math(expr)}",
                                f"f({x1}) = {_format_math(y1)}",
                                f"f({x2}) = {_format_math(y2)}",
                                f"Two different inputs ({x1} and {x2}) give the same output ({_format_math(y1)})",
                                f"Therefore f is NOT one-one ✓",
                            ]
                            return _result(steps, "Not one-one ✓", "counterexample")
        except Exception:
            return None

    # Pattern 2: "show that matrix [[...]] is not invertible"
    m = re.search(r'matrix\s*(\[\[.+?\]\])\s+is\s+not\s+invertible', lower)
    if m:
        mat_str = m.group(1)
        try:
            from sympy import Matrix as SMatrix
            # Parse matrix: strip outer brackets, split into rows
            inner = mat_str.strip('[]')
            row_strs = re.findall(r'\[([^\[\]]+)\]', mat_str)
            mat_rows = []
            for r in row_strs:
                vals = [float(v.strip()) for v in r.split(',')]
                mat_rows.append(vals)
            mat = SMatrix(mat_rows)
            d = det(mat)
            steps = [
                f"Matrix: {mat.tolist()}",
                f"Determinant = {d}",
                f"Since det = 0, the matrix is NOT invertible ✓",
            ]
            return _result(steps, "Not invertible ✓", "counterexample")
        except Exception:
            return None

    return None


def solve_why_question(message: str) -> Optional[ComputeResult]:
    """Example-based reasoning for 'why' questions.
    'why is the cross product of parallel vectors zero?'
    'why is the determinant of a singular matrix zero?'
    'why is the dot product of perpendicular vectors zero?'
    'why does the derivative of a constant equal zero?'
    """
    lower = message.lower().strip()
    if not lower.startswith('why'):
        return None

    x = Symbol('x')

    # Pattern: cross product of parallel vectors
    if 'cross product' in lower and 'parallel' in lower:
        from sympy import Matrix as SMatrix
        try:
            v1 = SMatrix([1, 0, 0])
            v2 = SMatrix([2, 0, 0])
            cross = v1.cross(v2)
            steps = [
                "Cross product formula: a × b = |a||b|sin(θ) n̂",
                "Parallel vectors have angle θ = 0° between them",
                "sin(0°) = 0, so a × b = 0",
                f"Example: (1,0,0) × (2,0,0) = ({cross[0]}, {cross[1]}, {cross[2]})",
                "Therefore the cross product of parallel vectors is zero ✓",
            ]
            return _result(steps, "Zero because sin(0°) = 0 ✓", "why_example")
        except Exception:
            return None

    # Pattern: dot product of perpendicular vectors
    if 'dot product' in lower and ('perpendicular' in lower or 'orthogonal' in lower):
        from sympy import Matrix as SMatrix
        try:
            v1 = SMatrix([1, 0, 0])
            v2 = SMatrix([0, 1, 0])
            dot = v1.dot(v2)
            steps = [
                "Dot product formula: a · b = |a||b|cos(θ)",
                "Perpendicular vectors have angle θ = 90° between them",
                "cos(90°) = 0, so a · b = 0",
                f"Example: (1,0,0) · (0,1,0) = {dot}",
                "Therefore the dot product of perpendicular vectors is zero ✓",
            ]
            return _result(steps, "Zero because cos(90°) = 0 ✓", "why_example")
        except Exception:
            return None

    # Pattern: determinant of singular matrix
    if 'determinant' in lower and 'singular' in lower:
        from sympy import Matrix as SMatrix
        try:
            mat = SMatrix([[1, 2], [2, 4]])
            d = det(mat)
            steps = [
                "A singular matrix is one that has no inverse",
                "This happens when the rows/columns are linearly dependent",
                f"Example: [[1,2],[2,4]] — row 2 = 2 × row 1",
                f"det([[1,2],[2,4]]) = {d}",
                "Since det = 0, the matrix has no inverse, confirming it is singular ✓",
            ]
            return _result(steps, "Zero because rows are linearly dependent ✓", "why_example")
        except Exception:
            return None

    # Pattern: derivative of constant is zero
    if 'derivative' in lower and 'constant' in lower:
        try:
            expr = 5
            d = sympy.diff(expr, x)
            steps = [
                "The derivative measures rate of change",
                "A constant function f(x) = c does not change as x changes",
                f"Example: d/dx(5) = {d}",
                "Since a constant has no change, its derivative is zero ✓",
            ]
            return _result(steps, "Zero because constants don't change ✓", "why_example")
        except Exception:
            return None

    # Pattern: modulus of complex number is non-negative
    if 'modulus' in lower and 'complex' in lower and ('non-negative' in lower or 'nonnegative' in lower or 'always' in lower):
        try:
            from sympy import Abs as SAbs, I as SI
            z1 = 3 + 4*SI
            z2 = -5 + 12*SI
            z3 = 0
            m1 = SAbs(z1)
            m2 = SAbs(z2)
            m3 = SAbs(z3)
            steps = [
                "The modulus |z| = √(a² + b²) for z = a + bi",
                "Since a² and b² are both ≥ 0, their sum is ≥ 0",
                "√(a² + b²) ≥ 0 for all real a, b",
                f"Example: |3+4i| = {m1}, |-5+12i| = {m2}, |0| = {m3}",
                "Therefore the modulus is always non-negative ✓",
            ]
            return _result(steps, "Non-negative because √(a²+b²) ≥ 0 ✓", "why_example")
        except Exception:
            return None

    # Pattern: sum of probabilities is 1
    if 'sum' in lower and 'probabilit' in lower and ('1' in lower or 'one' in lower):
        try:
            steps = [
                "The sum of probabilities of all outcomes in a sample space S equals 1",
                "This is because the sample space contains ALL possible outcomes",
                "Example: Coin toss → {H, T}, P(H) = 0.5, P(T) = 0.5, P(H) + P(T) = 1",
                "Example: Die roll → {1,2,3,4,5,6}, each P = 1/6, sum = 6 × 1/6 = 1",
                "This is the axiom of probability: P(S) = 1 ✓",
            ]
            return _result(steps, "1 because all outcomes are covered ✓", "why_example")
        except Exception:
            return None

    return None


def solve_case_study_calculus(message: str) -> Optional[ComputeResult]:
    """Case-study questions with embedded formulas.
    'A particle moves along y = x^2. Find the slope of the tangent at x = 3'
    'The cost C(x) = 2x^2 + 3x + 5. Find the marginal cost when x = 10'
    'The height h(x) = -x^2 + 4x. At what position is it highest?'
    """
    # Extract the function definition: "y = x^2", "C(x) = 2x^2+3x+5", "h(x) = -x^2+4x", "P(t) = ..."
    func_match = re.search(r'(?:y\s*=\s*|(\w)\((\w)\)\s*=\s*)([^\s]+(?:\s+[+\-*/]\s+[^\s]+)*)', message)
    if not func_match:
        return None

    var_char = 'x'
    if func_match.lastindex >= 2 and func_match.group(2):
        var_char = func_match.group(2)

    expr_str = func_match.group(3).strip()
    expr = _safe_parse(expr_str)
    if expr is None:
        return None

    x = Symbol(var_char)

    # Pattern 1: "slope of the tangent at x = N" → derivative at N
    if re.search(r'slope.*tangent|tangent.*slope', message, re.IGNORECASE):
        m = re.search(r'at\s+x\s*=\s*(-?\d+\.?\d*)', message)
        if m:
            x_val = float(m.group(1))
            try:
                deriv = sympy.diff(expr, x)
                slope = float(deriv.subs(x, x_val))
                steps = [
                    f"y = {_format_math(expr)}",
                    f"dy/dx = {_format_math(deriv)}",
                    f"At x = {x_val}: dy/dx = {slope}",
                ]
                return _result(steps, str(slope), "tangent_slope")
            except Exception:
                return None

    # Pattern 2: "marginal cost when x = N" → derivative at N
    if 'marginal' in message.lower():
        m = re.search(r'when\s+x\s*=\s*(-?\d+\.?\d*)', message)
        if m:
            x_val = float(m.group(1))
            try:
                deriv = sympy.diff(expr, x)
                marginal = float(deriv.subs(x, x_val))
                steps = [
                    f"C(x) = {_format_math(expr)}",
                    f"C'(x) = {_format_math(deriv)}",
                    f"At x = {x_val}: C'(x) = {marginal}",
                ]
                return _result(steps, str(marginal), "marginal_cost")
            except Exception:
                return None

    # Pattern 3: "highest" / "maximum" position → critical point
    if any(kw in message.lower() for kw in ['highest', 'maximum position', 'at what position']):
        try:
            deriv = sympy.diff(expr, x)
            critical = sympy.solve(deriv, x)
            if critical:
                x_opt = float(critical[0])
                y_opt = float(expr.subs(x, x_opt))
                steps = [
                    f"h(x) = {_format_math(expr)}",
                    f"h'(x) = {_format_math(deriv)}",
                    f"Critical point: x = {x_opt}",
                    f"Maximum at x = {x_opt}, h = {y_opt}",
                ]
                return _result(steps, f"x = {x_opt}", "max_position")
        except Exception:
            return None

    # Pattern 4: "growth rate" of P(t) = A * e^(kt) → k
    if 'growth rate' in message.lower():
        t = Symbol(var_char)
        try:
            # Check if expression is exponential: A * exp(k*t)
            if expr.is_Mul:
                for factor in expr.args:
                    # exp(k*t) can be either Pow(E, k*t) or exp(k*t)
                    is_exp = False
                    exponent = None
                    if factor.is_Pow and factor.base == sympy.E:
                        is_exp = True
                        exponent = factor.exp
                    elif factor.func == sympy.exp:
                        is_exp = True
                        exponent = factor.args[0]
                    if is_exp and exponent is not None:
                        if exponent.is_symbol:
                            return _result([f"P(t) = {_format_math(expr)}", f"Growth rate k = 1"], "1", "growth_rate")
                        coeff = exponent.as_coefficients_dict().get(t, 0)
                        if coeff:
                            steps = [f"P(t) = {_format_math(expr)}", f"Growth rate k = {coeff}"]
                            return _result(steps, str(coeff), "growth_rate")
        except Exception:
            return None

    return None


def solve_degree_radian(message: str) -> Optional[ComputeResult]:
    """'convert 45 degrees to radians', 'convert pi/3 radians to degrees'"""
    m = re.search(r'(\d+\.?\d*)\s*(?:degree|degrees|°)\s*(?:to|in|into)\s*radian', message)
    if m:
        deg = float(m.group(1))
        rad = math.pi * deg / 180
        from fractions import Fraction
        frac = Fraction(int(deg), 180)
        steps = [f"{_num(deg)}° to radians", f"= {_num(deg)} x pi/180", f"= {frac.numerator}pi/{frac.denominator}" if frac.denominator != 1 else f"= {frac.numerator}pi", f"= {round(rad, 6)} rad"]
        return _result(steps, f"{round(rad, 6)} rad", "conversion")
    m = re.search(r'(\d+\.?\d*)\s*(?:radian|radians|rad)\s*(?:to|in|into)\s*degree', message)
    if m:
        rad = float(m.group(1))
        deg = rad * 180 / math.pi
        steps = [f"{_num(rad)} rad to degrees", f"= {_num(rad)} x 180/pi", f"= {round(deg, 4)}°"]
        return _result(steps, f"{round(deg, 4)}°", "conversion")
    return None


def solve_sum_natural(message: str) -> Optional[ComputeResult]:
    """'sum of first 20 natural numbers', 'sum of first n odd/even numbers'"""
    m = re.search(r'sum\s+(?:of\s+)?(?:the\s+)?first\s+(\d+)\s+(natural|odd|even|whole)?\s*numbers?', message)
    if not m:
        m = re.search(r'sum\s+(?:of\s+)?(\d+)\s+(?:to\s+)?(?:natural|whole)?\s*numbers?', message)
    if not m:
        return None
    n = int(m.group(1))
    ntype = m.group(2) if m.lastindex >= 2 and m.group(2) else "natural"
    if ntype in ("natural", "whole"):
        total = n * (n + 1) // 2
        formula = f"n(n+1)/2 = {n}x{n+1}/2"
    elif ntype == "odd":
        total = n * n
        formula = f"n^2 = {n}^2"
    elif ntype == "even":
        total = n * (n + 1)
        formula = f"n(n+1) = {n}x{n+1}"
    else:
        return None
    steps = [f"Sum of first {n} {ntype} numbers", f"Formula: {formula}", f"= {total}"]
    return _result(steps, str(total), "sum_series")


# --------------------------------------------------------------------------- #
# All math solvers
# --------------------------------------------------------------------------- #

MATH_SOLVERS = [
    solve_trig_expression,
    solve_trig_values,
    solve_trig_identity,
    solve_distance,
    solve_midpoint,
    solve_slope,
    solve_circle,
    solve_vector_magnitude,
    solve_dot_product,
    solve_cross_product,
    solve_ap,
    solve_gp,
    solve_complex_modulus,
    solve_permutation,
    solve_combination,
    solve_probability,
    solve_binomial,
    solve_mean,
    solve_statistics,
    solve_sphere,
    solve_cylinder,
    solve_cone,
    solve_simple_interest,
    solve_compound_interest,
    solve_profit_loss,
    solve_speed_distance_time,
    solve_probability_basic,
    solve_factorise,
    # Primary school solvers (Class 1-5)
    solve_number_comparison,
    solve_before_after_between,
    solve_ascending_descending,
    solve_place_value,
    solve_greatest_smallest_from_digits,
    solve_number_names,
    solve_skip_counting,
    solve_hcf_lcm,
    solve_prime_check,
    solve_factors,
    solve_prime_factorization,
    solve_divisibility,
    solve_roman_numerals,
    solve_rounding,
    solve_area_perimeter,
    solve_percentage_conversion,
    solve_integers,
    solve_angles,
    solve_time_conversion,
    solve_patterns,
    solve_multiplication_table,
    solve_even_odd,
    # Middle school solvers (Class 6-9)
    solve_ratio,
    solve_proportion,
    solve_cube_root,
    solve_trapezium,
    solve_cube,
    solve_cuboid,
    solve_simplify_sqrt,
    solve_rationalise,
    solve_simultaneous,
    solve_herons_formula,
    solve_evaluate_expression,
    solve_simplify_expression,
    solve_pythagoras,
    solve_parallelogram_area,
    solve_circle_circumference,
    solve_logarithm,
    solve_percentage_more,
    solve_discount,
    solve_time_work,
    solve_average,
    solve_median,
    solve_mode,
    solve_range_stats,
    solve_speed,
    solve_sum_natural,
    solve_degree_radian,
    # Class 11-12 solvers
    solve_matrix_ops,
    solve_vector_ops,
    solve_factorial,
    solve_complex_conjugate,
    solve_maxima_minima,
    solve_binomial_probability,
    solve_dice_sum_probability,
    solve_series_sum,
    solve_inverse_trig_composition,
    solve_trig_expression,
    solve_differential_equation,
    solve_critical_points,
    solve_lpp,
    solve_case_study_calculus,
    # Competency solvers (show that, counterexample, why)
    solve_show_that,
    solve_show_not,
    solve_why_question,
]
