"""Extended pre-computed standard integral forms with method routing.

Each entry: integrand_pattern → (antiderivative, method_name, detailed_explanation)
Covers: direct formulas, u-substitution triggers, by-parts templates, partial fractions.
"""
from __future__ import annotations
from typing import Optional, Dict, List, Tuple, Any
import sympy as sp
from sympy import Symbol, sqrt, log, exp, sin, cos, tan, asin, atan, E, pi, Abs, \
    Wild, Rational, Integer, simplify, factor, expand, heurisch, integrate as sp_integrate
import re

_x = Symbol('x')

# ─── direct integral lookup table ────────────────────────────────────────────
DIRECT_INTEGRALS: List[Dict[str, Any]] = [
    # Power / polynomial
    {"integrand": "x**n",         "antiderivative": "x**(n+1)/(n+1)",     "method": "Power Rule",           "note": "Valid for n ≠ -1. Add +C.", "constraint": "n != -1"},
    {"integrand": "1",            "antiderivative": "x",                  "method": "Power Rule (n=0)",      "note": "∫1 dx = x + C"},
    {"integrand": "1/x",          "antiderivative": "log(x)",             "method": "Reciprocal Rule",       "note": "∫(1/x)dx = ln|x| + C  (x≠0)"},
    {"integrand": "1/x**2",       "antiderivative": "-1/x",              "method": "Power Rule (n=-2)",     "note": "∫x^(-2)dx = -x^(-1) + C"},
    # Exponential
    {"integrand": "exp(x)",       "antiderivative": "exp(x)",             "method": "Exponential Rule",      "note": "∫e^x dx = e^x + C"},
    {"integrand": "exp(-x)",      "antiderivative": "-exp(-x)",           "method": "Exponential Rule",      "note": "∫e^(-x)dx = -e^(-x) + C"},
    {"integrand": "exp(a*x)",     "antiderivative": "exp(a*x)/a",         "method": "Exponential Rule (chain)", "note": "∫e^(ax)dx = e^(ax)/a + C,  a≠0", "param": "a"},
    # Trig
    {"integrand": "sin(x)",       "antiderivative": "-cos(x)",            "method": "Trigonometric Integral","note": "∫sin(x)dx = -cos(x) + C"},
    {"integrand": "cos(x)",       "antiderivative": "sin(x)",             "method": "Trigonometric Integral","note": "∫cos(x)dx = sin(x) + C"},
    {"integrand": "sec(x)**2",    "antiderivative": "tan(x)",             "method": "Trigonometric Integral","note": "∫sec²(x)dx = tan(x) + C"},
    {"integrand": "csc(x)**2",    "antiderivative": "-cot(x)",            "method": "Trigonometric Integral","note": "∫csc²(x)dx = -cot(x) + C"},
    {"integrand": "sec(x)*tan(x)","antiderivative": "sec(x)",             "method": "Trigonometric Integral","note": "∫sec(x)tan(x)dx = sec(x) + C"},
    {"integrand": "csc(x)*cot(x)","antiderivative": "-csc(x)",            "method": "Trigonometric Integral","note": "∫csc(x)cot(x)dx = -csc(x) + C"},
    {"integrand": "sinh(x)",      "antiderivative": "cosh(x)",            "method": "Hyperbolic Integral",   "note": "∫sinh(x)dx = cosh(x) + C"},
    {"integrand": "cosh(x)",      "antiderivative": "sinh(x)",            "method": "Hyperbolic Integral",   "note": "∫cosh(x)dx = sinh(x) + C"},
    {"integrand": "sech(x)**2",   "antiderivative": "tanh(x)",            "method": "Hyperbolic Integral",   "note": "∫sech²(x)dx = tanh(x) + C"},
    {"integrand": "1/(1+x**2)",   "antiderivative": "atan(x)",            "method": "Inverse Trig Rule",     "note": "∫dx/(1+x²) = arctan(x) + C"},
    {"integrand": "1/sqrt(1-x**2)","antiderivative": "asin(x)",           "method": "Inverse Trig Rule",     "note": "∫dx/√(1-x²) = arcsin(x) + C  [|x|<1]"},
    {"integrand": "1/(1-x**2)",   "antiderivative": "atanh(x)",           "method": "Inverse Hyperbolic",    "note": "∫dx/(1-x²) = atanh(x) + C  [|x|<1]"},
    {"integrand": "1/sqrt(x**2+a**2)","antiderivative": "log(x+sqrt(x**2+a**2))","method":"Inverse Hyperbolic", "note": "∫dx/√(x²+a²) = ln|x+√(x²+a²)|+C, a>0", "param": "a"},
    {"integrand": "1/sqrt(x**2-a**2)","antiderivative": "log(x+sqrt(x**2-a**2))","method":"Inverse Hyperbolic", "note": "∫dx/√(x²-a²) = ln|x+√(x²-a²)|+C, 0<a<|x|", "param": "a"},
    {"integrand": "1/sqrt(a**2-x**2)","antiderivative": "asin(x/a)",        "method": "Inverse Trig Rule",     "note": "∫dx/√(a²-x²) = arcsin(x/a)+C, a>0, |x|<a", "param": "a"},
    {"integrand": "1/(a**2+x**2)",  "antiderivative": "atan(x/a)/a",      "method": "Inverse Trig Rule",     "note": "∫dx/(a²+x²) = (1/a)arctan(x/a)+C, a>0", "param": "a"},
]

# ─── u-substitution template detector ────────────────────────────────────────
U_SUB_PATTERNS: List[Dict[str, Any]] = [
    {
        "description": "f(ax+b) pattern",
        "detect": "inner is linear: a·x + b",
        "substitution": "u = ax + b",
        "du": "a·dx",
        "example": "∫sin(3x+2)dx → u=3x+2, du=3dx, = (1/3)∫sin(u)du = -(1/3)cos(3x+2)+C",
        "method": "u-Substitution (linear inner)"
    },
    {
        "description": "f(x^n)·x^(n-1) pattern",
        "detect": "integrand = f(x^n)·x^(n-1)",
        "substitution": "u = x^n",
        "du": "n·x^(n-1)dx",
        "example": "∫x·e^(x²)dx → u=x², du=2xdx, = (1/2)∫e^u du = (1/2)e^(x²)+C",
        "method": "u-Substitution (power inner)"
    },
    {
        "description": "f(g(x))·g'(x) pattern",
        "detect": "integrand = outer(inner(x)) × derivative of inner",
        "substitution": "u = g(x)",
        "du": "g'(x)dx",
        "example": "∫cos(x²)·2x·dx → u=x², = ∫cos(u)du = sin(x²)+C",
        "method": "u-Substitution (chain pattern)"
    },
    {
        "description": "f'(x)/f(x) pattern",
        "detect": "integrand = f'(x)/f(x)",
        "substitution": "u = f(x)",
        "du": "f'(x)dx",
        "example": "∫2x/(x²+1)dx → u=x²+1, = ∫du/u = ln|u|+C = ln(x²+1)+C",
        "method": "u-Substitution (logarithmic form)"
    },
    {
        "description": "f'(x)·F(f(x)) pattern",
        "detect": "derivative of inner × function of inner",
        "substitution": "u = f(x)",
        "du": "f'(x)dx",
        "example": "∫sin(x)·cos²(x)dx → u=cos(x), du=-sin(x)dx = -∫u²du = -cos³(x)/3+C",
        "method": "u-Substitution (generalized)"
    },
]

# ─── integration by parts templates ─────────────────────────────────────────
IBP_TABLE: List[Dict[str, Any]] = [
    {
        "formula": "∫u·dv = u·v - ∫v·du",
        "name": "Integration by Parts (ILATE order)",
        "priority_order": ["Inverse trig", "Logarithmic", "Algebraic", "Trigonometric", "Exponential"],
        "tip": "Choose u from ILATE: whichever comes first. The other becomes dv.",
        "common_pairs": [
            ("x^n · sin/cos(ax)", "u=x^n, dv=sin(ax)dx"),
            ("x^n · e^(ax)",      "u=x^n, dv=e^(ax)dx"),
            ("x^n · ln(x)",       "u=ln(x), dv=x^n dx"),
            ("e^(ax)·sin(bx)",    "either, but results in 2 IBP steps"),
            ("arcsin/arccos(x)·algebraic","u=arcsin, dv=algebraic"),
        ]
    }
]

# ─── partial fractions templates ─────────────────────────────────────────────
PARTIAL_FRACTIONS_TEMPLATES: List[Dict[str, Any]] = [
    {
        "type": "distinct linear factors",
        "form": "P(x)/((x-a)(x-b)...)",
        "decomposition": "A/(x-a) + B/(x-b) + ...",
        "method": "Cover-up method or equating coefficients",
        "example": "1/((x-1)(x+2)) = 1/3·1/(x-1) - 1/3·1/(x+2)"
    },
    {
        "type": "repeated linear factors",
        "form": "P(x)/((x-a)^n)",
        "decomposition": "A₁/(x-a) + A₂/(x-a)² + ... + Aₙ/(x-a)^n",
        "method": "Equating coefficients after multiplying through by (x-a)^n",
        "example": "1/((x-1)²) = A/(x-1) + B/(x-1)²"
    },
    {
        "type": "irreducible quadratic",
        "form": "P(x)/(ax²+bx+c)  [b²-4ac < 0]",
        "decomposition": "(Ax+B)/(ax²+bx+c)",
        "method": "Equating coefficients",
        "example": "1/(x²+1) → already simple (arctan integral)"
    },
    {
        "type": "repeated irreducible quadratic",
        "form": "P(x)/(ax²+bx+c)^n  [b²-4ac < 0]",
        "decomposition": "(A₁x+B₁)/(...) + ... + (Aₙx+Bₙ)/(...)^n",
        "method": "Successive reduction with arctan/log formulas"
    },
]

# ─── substitution detection helper ───────────────────────────────────────────
def detect_u_substitution(expr: sp.Expr, var: sp.Symbol) -> Optional[Dict[str, Any]]:
    """
    Try to detect if u-substitution applies.
    Returns substitution info dict or None.
    """
    try:
        # Check if expression is of form f(g(x)) * g'(x)
        # Strategy: try common substitutions
        
        # 1. Linear inner: f(a*x + b)
        a = sp.Wild('a', exclude=[var])
        b = sp.Wild('b', exclude=[var])
        
        # Check: is there a linear sub-expression that appears as inner function?
        for func in [sin, cos, exp, log, tan, sinh, cosh]:
            try:
                m = expr.match(func(a*var + b))
                if m:
                    inner_coeff = m[a]
                    inner_const = m[b]
                    return {
                        "u": f"{var}",
                        "u_expr": a*var + b,
                        "du": f"{inner_coeff}",
                        "method": f"u-Substitution: u = {_pp(inner_coeff*var + inner_const)}",
                        "explanation": (
                            f"Let u = {_pp(inner_coeff*var + inner_const)}, "
                            f"then du = {_pp(inner_coeff)}·d{_pp(var)}"
                        ),
                        "scale_factor": inner_coeff,
                    }
            except Exception:
                continue
        
        # 2. Power inner: f(x^n)
        n = sp.Wild('n', exclude=[var])
        for func in [sin, cos, exp, tan]:
            try:
                m = expr.match(func(var**n))
                if m:
                    exp_val = m[n]
                    if exp_val != 1:
                        return {
                            "u_expr": var**exp_val,
                            "du_str": f"{exp_val}·{var}^({exp_val-1})·d{_pp(var)}",
                            "method": f"u-Substitution: u = {_pp(var)}^({_pp(exp_val)})",
                            "explanation": f"Let u = {_pp(var)}^({_pp(exp_val)}), du = {_pp(exp_val)}·{var}^({_pp(exp_val-1)})·d{_pp(var)}",
                        }
            except Exception:
                continue
        
        # 3. x^n * f'(x) pattern
        # If expr is x^(n-1) * f(x^n), use u=x^n
        n2 = sp.Wild('n2', exclude=[var])
        try:
            m2 = expr.match(var**(n2-1))
            if m2:
                exp_val = m2[n2]
                remainder = sp.simplify(expr / var**(exp_val-1))
                if remainder.has(var**exp_val) or any(
                    (expr / var**(exp_val-1)).has(func(var**exp_val)) 
                    for func in [sin, cos, exp, tan, sinh]
                ):
                    return {
                        "u_expr": var**exp_val,
                        "method": f"u-Substitution: u = {_pp(var)}^({_pp(exp_val)})",
                        "explanation": f"Pattern f(x^n)·x^(n-1) → u=x^n",
                    }
        except Exception:
            pass
            
    except Exception:
        pass
    return None


def detect_integration_by_parts(expr: sp.Expr, var: sp.Symbol) -> Optional[Dict[str, Any]]:
    """
    Determine if integration by parts is appropriate.
    Returns guidance dict or None.
    """
    try:
        # Check if product of algebraic × trig/exp
        factors = sp.Mul.make_args(expr)
        
        has_algebraic = any(f.has(var) and not f.is_Function for f in factors)
        has_trig = any(f.is_Function and f.func in [sin, cos, tan, sec, csc] for f in factors)
        has_exp = any(f.is_Function and f.func == exp for f in factors)
        has_log = any(f.is_Function and f.func == log for f in factors)
        
        if (has_algebraic and (has_trig or has_exp)) or has_log:
            # Identify u and dv
            u_choice = None
            dv_choice = None
            for f in factors:
                if has_log and f.is_Function and f.func == log:
                    u_choice = f
                elif has_algebraic and not f.is_Function:
                    u_choice = f if u_choice is None else u_choice
                elif has_trig or has_exp:
                    dv_choice = f
            
            if u_choice and dv_choice:
                return {
                    "u": _pp(u_choice),
                    "dv": _pp(dv_choice),
                    "method": "Integration by Parts",
                    "formula": "∫u·dv = u·v - ∫v·du",
                    "explanation": (
                        f"Apply IBP with u = {_pp(u_choice)}, dv = {_pp(dv_choice)}·d{_pp(var)}. "
                        f"(ILATE: logarithmic/trig chosen as u)"
                    )
                }
    except Exception:
        pass
    return None


def decompose_partial_fractions(expr: sp.Expr, var: sp.Symbol) -> Optional[Dict[str, Any]]:
    """
    If expr is a rational function, decompose into partial fractions.
    """
    try:
        if expr.is_rational_function():
            decomposition = sp.apart(expr, var, full=False)
            return {
                "decomposition": _pp(decomposition),
                "method": "Partial Fraction Decomposition",
                "explanation": f"Decompose {_pp(expr)} into partial fractions for term-by-term integration"
            }
    except Exception:
        pass
    return None