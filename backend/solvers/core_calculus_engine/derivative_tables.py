"""Pre-computed standard derivative forms as a lookup table.

Each entry: pattern → (result, rule_name, explanation)
"""
from __future__ import annotations
import re
import sympy as sp
from sympy import Symbol, Pow, sin, cos, tan, cot, sec, csc, exp, log, sqrt, pi, E, asin, acos, atan,\
    acot, asec, acsc, sinh, cosh, tanh, csch, sech, coth, S, zoo, oo
from typing import Optional, Tuple, Dict, List, Any

# ─── helpers ────────────────────────────────────────────────────────────────
_x = Symbol('x')
_a = Symbol('a')

def _s(expr) -> str:
    return sp.sstr(expr).replace("**", "^")

def _pp(expr) -> str:
    """Pretty-print a SymPy expression for step display."""
    return sp.sstr(expr).replace("**", "^")

# ─── pattern library ────────────────────────────────────────────────────────
# Keys: (canonical_type, sub_type, condition_string)
# Values: (result_expr, rule_name, explanation)

POWER_RULE: Dict[str, Dict[str, Tuple[Any, str, str]]] = {
    # d/dx[x^n] = n*x^(n-1)
    "power": {
        "general": (
            lambda n: n * _x ** (n - 1),
            "Power Rule",
            "d/dx[x^n] = n·x^(n-1)  [n ≠ 0]"
        ),
        "n_zero": (
            lambda: 0,
            "Derivative of constant",
            "d/dx[x^0] = d/dx[1] = 0  (constant rule)"
        ),
        "n_one": (
            lambda: 1,
            "Power rule (n=1)",
            "d/dx[x^1] = 1·x^0 = 1"
        ),
        "n_neg1": (
            lambda: -_x ** (-2),
            "Power rule (n=-1)",
            "d/dx[x^(-1)] = d/dx[1/x] = (-1)·x^(-2) = -1/x^2"
        ),
    }
}

TRIG_RULES: Dict[str, Tuple[Any, str, str]] = {
    # (sympy_func): (derivative, rule_name, explanation)
    "sin(x)":    (cos(_x),           "Derivative of sin(x)",   "d/dx[sin(x)] = cos(x)"),
    "cos(x)":    (-sin(_x),          "Derivative of cos(x)",   "d/dx[cos(x)] = -sin(x)"),
    "tan(x)":    (1 + tan(_x)**2,    "Derivative of tan(x)",   "d/dx[tan(x)] = sec²(x) = 1 + tan²(x)"),
    "cot(x)":    (-(1 + cot(_x)**2), "Derivative of cot(x)",   "d/dx[cot(x)] = -csc²(x) = -(1+cot²(x))"),
    "sec(x)":    (sec(_x)*tan(_x),   "Derivative of sec(x)",   "d/dx[sec(x)] = sec(x)·tan(x)"),
    "csc(x)":    (-csc(_x)*cot(_x),  "Derivative of csc(x)",   "d/dx[csc(x)] = -csc(x)·cot(x)"),
    # Need sec, csc imported
}

# Fix: full trig table
FULL_TRIG_TABLE: List[Dict] = [
    {"pattern": "sin(x)",  "derivative": sp.cos(_x),                  "rule": "Derivative of sin(x)",   "explanation": "d/dx[sin(x)] = cos(x)"},
    {"pattern": "cos(x)",  "derivative": -sp.sin(_x),                 "rule": "Derivative of cos(x)",   "explanation": "d/dx[cos(x)] = -sin(x)"},
    {"pattern": "tan(x)",  "derivative": sp.sec(_x)**2,               "rule": "Derivative of tan(x)",   "explanation": "d/dx[tan(x)] = sec²(x) = 1 + tan²(x)"},
    {"pattern": "cot(x)",  "derivative": -sp.csc(_x)**2,              "rule": "Derivative of cot(x)",   "explanation": "d/dx[cot(x)] = -csc²(x)"},
    {"pattern": "sec(x)",  "derivative": sp.sec(_x)*sp.tan(_x),       "rule": "Derivative of sec(x)",   "explanation": "d/dx[sec(x)] = sec(x)·tan(x)"},
    {"pattern": "csc(x)",  "derivative": -sp.csc(_x)*sp.cot(_x),      "rule": "Derivative of csc(x)",   "explanation": "d/dx[csc(x)] = -csc(x)·cot(x)"},
    {"pattern": "sinh(x)", "derivative": sp.cosh(_x),                 "rule": "Derivative of sinh(x)",  "explanation": "d/dx[sinh(x)] = cosh(x)"},
    {"pattern": "cosh(x)", "derivative": sp.sinh(_x),                 "rule": "Derivative of cosh(x)",  "explanation": "d/dx[cosh(x)] = sinh(x)"},
    {"pattern": "tanh(x)", "derivative": sp.sech(_x)**2,              "rule": "Derivative of tanh(x)",  "explanation": "d/dx[tanh(x)] = sech²(x)"},
]

INVERSE_TRIG_TABLE: List[Dict] = [
    {"pattern": "asin(x)",  "derivative": 1/sp.sqrt(1-_x**2),  "rule": "Derivative of arcsin(x)",  "explanation": "d/dx[arcsin(x)] = 1/√(1-x²)  [|x|<1]"},
    {"pattern": "acos(x)",  "derivative": -1/sp.sqrt(1-_x**2), "rule": "Derivative of arccos(x)",  "explanation": "d/dx[arccos(x)] = -1/√(1-x²)  [|x|<1]"},
    {"pattern": "atan(x)",  "derivative": 1/(1+_x**2),         "rule": "Derivative of arctan(x)",  "explanation": "d/dx[arctan(x)] = 1/(1+x²)"},
    {"pattern": "acot(x)",  "derivative": -1/(1+_x**2),        "rule": "Derivative of arccot(x)",  "explanation": "d/dx[arccot(x)] = -1/(1+x²)"},
    {"pattern": "asec(x)",  "derivative": 1/(abs(_x)*sp.sqrt(_x**2-1)), "rule": "Derivative of arcsec(x)", "explanation": "d/dx[arcsec(x)] = 1/(|x|√(x²-1))  [|x|>1]"},
    {"pattern": "acsc(x)",  "derivative": -1/(abs(_x)*sp.sqrt(_x**2-1)),"rule": "Derivative of arccsc(x)", "explanation": "d/dx[arccsc(x)] = -1/(|x|√(x²-1))  [|x|>1]"},
]

LOG_EXP_TABLE: List[Dict] = [
    {"pattern": "exp(x)",   "derivative": sp.E**_x,                    "rule": "Derivative of e^x",      "explanation": "d/dx[e^x] = e^x"},
    {"pattern": "log(x)",   "derivative": 1/_x,                        "rule": "Derivative of ln(x)",     "explanation": "d/dx[ln(x)] = 1/x  [x>0]"},
    {"pattern": "ln(x)",    "derivative": 1/_x,                        "rule": "Derivative of ln(x)",     "explanation": "d/dx[ln(x)] = 1/x  [x>0]"},
    {"pattern": "log(a,x)", "derivative": 1/(_x*sp.log(_a)),            "rule": "Derivative of log_a(x)", "explanation": "d/dx[log_a(x)] = 1/(x*ln a)  [x,a>0]"},
]

# ─── rule templates (for composite expressions) ─────────────────────────────
RULE_TEMPLATES = {
    "sum": {
        "name": "Sum/Difference Rule",
        "formula": "d/dx[f(x) ± g(x)] = f'(x) ± g'(x)",
        "explanation": "The derivative of a sum/difference is the sum/difference of derivatives."
    },
    "constant_multiple": {
        "name": "Constant Multiple Rule",
        "formula": "d/dx[c·f(x)] = c·f'(x)",
        "explanation": "Constants factor out of differentiation."
    },
    "product": {
        "name": "Product Rule",
        "formula": "d/dx[f(x)·g(x)] = f'(x)·g(x) + f(x)·g'(x)",
        "explanation": "Differentiate the first × keep the second, plus keep the first × differentiate the second."
    },
    "quotient": {
        "name": "Quotient Rule",
        "formula": "d/dx[f(x)/g(x)] = [f'(x)·g(x) - f(x)·g'(x)] / g(x)²",
        "explanation": "LoD² - HiDiC over LoLo: (low d-high minus high d-low) over low squared."
    },
    "chain": {
        "name": "Chain Rule",
        "formula": "d/dx[f(g(x))] = f'(g(x)) · g'(x)",
        "explanation": "Differentiate the outer function (keep inner unchanged), then multiply by derivative of inner."
    },
    "power_composite": {
        "name": "Generalized Power Rule",
        "formula": "d/dx[u(x)^n] = n·u(x)^(n-1) · u'(x)",
        "explanation": "Special case of chain rule: bring the exponent down, reduce it by 1, multiply by inner derivative."
    },
}

# ─── lookup functions ────────────────────────────────────────────────────────

def lookup_derivative(expr: sp.Expr, var: sp.Symbol) -> Optional[Dict]:
    """
    Try to match expr against the standard derivative table.
    Returns dict with keys: result, rule, explanation
    or None if no match.
    """
    # Unwrap coefficients
    if expr.is_Number or expr.is_Symbol:
        if expr == var:
            return {"result": sp.Integer(1), "rule": "d/dx[x] = 1", "explanation": "d/dx[x] = 1"}
        if expr.is_Number:
            return {"result": sp.Integer(0), "rule": "Constant Rule", "explanation": f"d/dx[{expr}] = 0 (constant)"}
        # Other symbol
        return {"result": sp.Integer(0), "rule": "Constant Rule (w.r.t. different variable)", "explanation": f"d/dx[{expr}] = 0 (independent variable)"}

    # Try pattern matching against trig functions
    for entry in FULL_TRIG_TABLE:
        pat = sp.sympify(entry["pattern"].replace("x", "X"))
        actual = sp.sympify(sp.sstr(expr).replace(str(var), "X"))
        if pat == actual or (expr.equals(pat.subs(sp.Symbol('X'), var)) if hasattr(expr,'equals') else False):
            return {"result": entry["derivative"].subs(_x, var), "rule": entry["rule"], "explanation": entry["explanation"]}

    # Inverse trig
    for entry in INVERSE_TRIG_TABLE:
        pat = sp.sympify(entry["pattern"].replace("x", "X"))
        if expr.equals(pat.subs(sp.Symbol('X'), var)):
            return {"result": entry["derivative"].subs(_x, var), "rule": entry["rule"], "explanation": entry["explanation"]}

    # Log/exp
    for entry in LOG_EXP_TABLE:
        pat = sp.sympify(entry["pattern"].replace("x", "X"))
        if expr.equals(pat.subs(sp.Symbol('X'), var)):
            return {"result": entry["derivative"].subs(_x, var), "rule": entry["rule"], "explanation": entry["explanation"]}

    # Power: x^n
    if expr.is_Pow and not expr.has(sp.sin, sp.cos, sp.tan, sp.exp, sp.log,
                                      sp.asin, sp.acos, sp.atan):
        base, exp = expr.args
        if base == var:
            n = exp
            if n == 0:
                return {"result": sp.Integer(0), "rule": "d/dx[x^0] = 0", "explanation": "d/dx[x^0] = d/dx[1] = 0"}
            return {"result": n * var ** (n - 1), "rule": "Power Rule", "explanation": f"d/dx[x^{_pp(n)}] = {_pp(n)}·x^({_pp(n-1)}) = {_pp(n*var**(n-1))}"}

    # u(x)^n pattern (generalized power)
    if expr.is_Pow and not expr.has(sp.sin, sp.cos, sp.tan, sp.exp, sp.log):
        base, exp = expr.args
        if exp.is_Number and base.has(var):
            return None  # handled by chain rule, not direct table

    return None


def lookup_integral(expr: sp.Expr, var: sp.Symbol) -> Optional[Dict]:
    """
    Try to match expr against the standard integral table.
    Returns dict with keys: result, method, explanation
    or None if no match.
    """
    # Power rule: x^n
    if expr.is_Pow:
        base, exp = expr.args
        if base == var and not exp.has(var):
            n = exp
            if n == -1:
                return {
                    "result": sp.log(abs(var)),
                    "method": "Reciprocal Power Rule",
                    "explanation": f"∫x^(-1) dx = ∫(1/x) dx = ln|x|"
                }
            new_exp = n + 1
            return {
                "result": var ** new_exp / new_exp,
                "method": "Power Rule for Integration",
                "explanation": f"∫x^{_pp(n)} dx = x^({_pp(new_exp)})/({_pp(new_exp)}) + C"
            }

    # Trig integrals
    trig_integral_patterns = [
        (sp.sin(var),     sp.cos(var),              "∫sin(x)dx = -cos(x)+C",  "Standard trig integral: ∫sin(x)dx = -cos(x)+C"),
        (sp.cos(var),     sp.sin(var),              "∫cos(x)dx = sin(x)+C",   "Standard trig integral: ∫cos(x)dx = sin(x)+C"),
        (sp.tan(var),     -sp.log(sp.cos(var)),     "∫tan(x)dx = -ln|cos(x)|+C", "Using sin/cos substitution"),
        (sp.cot(var),     sp.log(sp.sin(var)),      "∫cot(x)dx = ln|sin(x)|+C",  "Using cos/sin substitution"),
        (sp.sec(var)**2,  sp.tan(var),               "∫sec²(x)dx = tan(x)+C",  "Standard: ∫sec²(x)dx = tan(x)+C"),
        (sp.csc(var)**2, -sp.cot(var),               "∫csc²(x)dx = -cot(x)+C", "Standard: ∫csc²(x)dx = -cot(x)+C"),
        (sp.sec(var)*sp.tan(var), sp.sec(var),       "∫sec(x)tan(x)dx = sec(x)+C", "Standard integral"),
        (sp.csc(var)*sp.cot(var),-sp.csc(var),       "∫csc(x)cot(x)dx = -csc(x)+C", "Standard integral"),
    ]
    for integrand, result, name, explanation in trig_integral_patterns:
        if sp.simplify(expr - integrand) == 0:
            return {"result": result, "method": name, "explanation": explanation}

    # sinh, cosh
    hyp_integral_patterns = [
        (sp.sinh(var),   sp.cosh(var),    "∫sinh(x)dx = cosh(x)+C",   "Standard hyperbolic integral"),
        (sp.cosh(var),   sp.sinh(var),    "∫cosh(x)dx = sinh(x)+C",   "Standard hyperbolic integral"),
        (sp.sech(var)**2,sp.tanh(var),    "∫sech²(x)dx = tanh(x)+C",  "Standard integral"),
        (sp.csch(var)**2,-sp.coth(var),   "∫csch²(x)dx = -coth(x)+C", "Standard integral"),
    ]
    for integrand, result, name, explanation in hyp_integral_patterns:
        if sp.simplify(expr - integrand) == 0:
            return {"result": result, "method": name, "explanation": explanation}

    # Exponential
    if expr == sp.E**var:
        return {"result": sp.E**var, "method": "Exponential Rule", "explanation": "∫e^x dx = e^x + C"}
    if expr.has(sp.exp) and len(expr.args) == 1:
        # a^x = e^(x*ln(a))
        pass

    # 1/(a^2 + x^2)
    if expr.is_Mul or expr.is_Pow:
        # Try 1/(a^2+x^2)
        try:
            simplified = sp.simplify(expr)
            # Check 1/(x^2 + a^2)
            if simplified.is_Mul and sp.Integer(1) in simplified.args:
                denom = sp.denom(simplified)
                if denom.is_Add and denom.has(var**2):
                    # Try: is it of form 1/(x^2+a^2) or a/(x^2+a^2)?
                    coeff = sp.Wild('a', exclude=[var])
                    power = sp.Wild('n', exclude=[var])
                    m = denom.match(coeff + var**power)
                    if m and m[power] == 2:
                        a_val = m[coeff]
                        if a_val > 0:
                            a_sqrt = sp.sqrt(a_val)
                            if expr == sp.Integer(1)/denom:
                                return {
                                    "result": sp.atan(var/a_sqrt)/a_sqrt,
                                    "method": "Inverse Tangent Rule",
                                    "explanation": f"∫dx/(x²+{_pp(a_val)}) = (1/{_pp(a_sqrt)})·arctan(x/{_pp(a_sqrt)})+C"
                                }
                            else:
                                # Try to extract coefficient
                                num = sp.numer(simplified)
                                if num.is_Number:
                                    c = num
                                    return {
                                        "result": c * sp.atan(var/a_sqrt)/a_sqrt,
                                        "method": "Inverse Tangent Rule (scaled)",
                                        "explanation": f"∫{_pp(c)}dx/(x²+{_pp(a_val)}) = {_pp(c)}·(1/{_pp(a_sqrt)})·arctan(x/{_pp(a_sqrt)})+C"
                                    }
        except Exception:
            pass

    # 1/sqrt(a^2-x^2)
    try:
        simplified = sp.simplify(expr)
        denom = sp.denom(simplified) if not simplified.is_Pow else None
        if simplified.is_Pow and simplified.args[1] == sp.Rational(-1,2):
            radicand = simplified.args[0]
            coeff = sp.Wild('a', exclude=[var])
            power = sp.Wild('n', exclude=[var])
            m2 = radicand.match(coeff - var**power)
            if m2 and m2[power] == 2 and m2[coeff] > 0:
                a_val = m2[coeff]
                a_sqrt = sp.sqrt(a_val)
                return {
                    "result": sp.asin(var/a_sqrt),
                    "method": "Inverse Sine Rule",
                    "explanation": f"∫dx/√({_pp(a_val)}-x²) = arcsin(x/{_pp(a_sqrt)})+C"
                }
    except Exception:
        pass

    return None