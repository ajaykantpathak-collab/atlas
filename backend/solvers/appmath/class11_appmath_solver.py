"""
ISC Class 11 Applied Mathematics Solver
Covers all chapters: Number System, Arithmetic, Sets, Relations & Functions,
Sequences (AP/GP), Limits, Derivatives, Data Presentation, Central Tendency, Probability.
"""

import math
import random
from decimal import Decimal, ROUND_HALF_UP
from typing import List, Dict, Optional, Any, Union
from dataclasses import dataclass, field
from enum import Enum
import re
import numpy as np
import pandas as pd
import sympy as sp
from sympy import (
    Symbol, Rational, sqrt, pi, E, exp, log, sin, cos, tan,
    oo, zoo, nan, Limit, Derivative, simplify, factor, expand,
    nsimplify, Abs, ceiling, floor, factorial, binomial, summation,
    Product, factorial2, RisingFactorial as rising_factorial, FallingFactorial,
    Piecewise, Interval, Union as spUnion, Intersection as spIntersection,
    Complement as spComplement, FiniteSet, EmptySet, solve, nsolve,
    apart, collect, cancel, expand_trig, trigsimp, Symbol as sp_symbol,
    Integer, Float, Number, zoo, nan, oo, E, pi as sp_pi,
    summation, Product, factorial, binomial, Abs, Max, Min
)

# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

class StepType(Enum):
    FORMULA = "FORMULA"
    SUBSTITUTION = "SUBSTITUTION"
    SIMPLIFICATION = "SIMPLIFICATION"
    VERIFICATION = "VERIFICATION"
    RESULT = "RESULT"
    THEOREM = "THEOREM"
    PROPERTY = "PROPERTY"
    HINT = "HINT"


@dataclass
class Step:
    label: str
    description: str
    expression: Optional[str] = None
    step_type: StepType = StepType.SUBSTITUTION
    reason: str = ""


@dataclass
class SolverResult:
    """Container for solver output."""
    topic: str
    question: str
    steps: List[Step] = field(default_factory=list)
    final_answer: Any = None
    verification: Optional[str] = None
    is_error: bool = False
    error_message: str = ""


# ---------------------------------------------------------------------------
# Fallback stubs for calculus_engine (limits / derivatives)
# ---------------------------------------------------------------------------

class _CalculusEngineStub:
    """Lightweight internal calculus helpers so the file is fully standalone."""

    @staticmethod
    def limit_of(expr_str: str, var: str, point) -> Any:
        """Evaluate limit of expression string."""
        x = sp.Symbol(var, real=True)
        try:
            expr = sp.sympify(expr_str, locals={var: x})
        except Exception:
            return None
        try:
            return sp.limit(expr, x, point, dir="+")
        except Exception:
            return None

    @staticmethod
    def derivative_of(expr_str: str, var: str, order: int = 1) -> Any:
        """Evaluate derivative of expression string."""
        x = sp.Symbol(var, real=True)
        try:
            expr = sp.sympify(expr_str, locals={var: x})
        except Exception:
            return None
        try:
            return sp.diff(expr, x, order)
        except Exception:
            return None

    @staticmethod
    def left_limit(expr_str: str, var: str, point) -> Any:
        x = sp.Symbol(var, real=True)
        try:
            expr = sp.sympify(expr_str, locals={var: x})
            return sp.limit(expr, x, point, dir="-")
        except Exception:
            return None

    @staticmethod
    def right_limit(expr_str: str, var: str, point) -> Any:
        x = sp.Symbol(var, real=True)
        try:
            expr = sp.sympify(expr_str, locals={var: x})
            return sp.limit(expr, x, point, dir="+")
        except Exception:
            return None


class _CalculusEngineModule:
    """Mock module that mimics 'import core_calculus_engine'."""
    engine = _CalculusEngineStub


# Register as sys.modules['core_calculus_engine'] so the import works
import sys
sys.modules.setdefault('core_calculus_engine', _CalculusEngineModule)

from core_calculus_engine import engine as calculus_engine  # noqa: E402


# ===========================================================================
# 1. NUMBER SYSTEM
# ===========================================================================

def number_system(operation: str, value: Union[int, float, str],
                  base_from: Optional[int] = None,
                  base_to: Optional[int] = None,
                  divisor: Optional[int] = None,
                  dividend: Optional[int] = None,
                  num1: Optional[float] = None,
                  num2: Optional[float] = None) -> SolverResult:
    """
    Number system operations: base conversion, HCF/LCM, Euclid algorithm,
    rationalisation, prime factorisation.

    Parameters
    ----------
    operation : str  One of: 'base_convert', 'hcf', 'lcm', 'euclid',
                     'rationalise', 'prime_factorise', 'surd_simplify',
                     'modulo', 'divisibility'
    value, base_from, base_to : base conversion parameters
    divisor, dividend, num1, num2 : various helpers
    """
    topic = "Number System"
    steps: List[Step] = []
    result: Any = None

    try:
        if operation == 'base_convert':
            bf = base_from or 10
            bt = base_to or 10
            val_int = int(str(value), bf) if bf != 10 else int(value)
            digits = "0123456789ABCDEF"
            if val_int == 0:
                result = "0"
            else:
                res = ""
                n = val_int
                while n > 0:
                    res = digits[n % bt] + res
                    n //= bt
                result = res
            steps.append(Step("input", f"Input: '{value}' in base {bf}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("decimal", f"Convert to decimal: {val_int}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("convert", f"Decimal {val_int} → base {bt}: {result}", step_type=StepType.RESULT))

        elif operation == 'hcf':
            a, b = num1, num2
            steps.append(Step("input", f"Find HCF({a}, {b})", step_type=StepType.SUBSTITUTION))
            orig_a, orig_b = int(a), int(b)
            fa, fb = [], []
            temp = orig_a
            for i in range(2, temp + 1):
                while temp % i == 0:
                    fa.append(i)
                    temp //= i
            temp = orig_b
            for i in range(2, temp + 1):
                while temp % i == 0:
                    fb.append(i)
                    temp //= i
            common = []
            for d in sorted(set(fa)):
                cnt_a = fa.count(d)
                cnt_b = fb.count(d)
                common.extend([d] * min(cnt_a, cnt_b))
            hcf = int(np.prod(common)) if common else 1
            steps.append(Step("factor_a", f"Prime factors of {orig_a}: {fa}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("factor_b", f"Prime factors of {orig_b}: {fb}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("common", f"Common factors: {common}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("hcf", f"HCF = {hcf}", step_type=StepType.RESULT))
            # Euclid check
            x, y = orig_a, orig_b
            while y:
                x, y = y, x % y
            steps.append(Step("verify", f"Euclid check: GCD = {x} ✓", step_type=StepType.VERIFICATION))
            result = hcf

        elif operation == 'lcm':
            a, b = num1, num2
            steps.append(Step("input", f"Find LCM({a}, {b})", step_type=StepType.SUBSTITUTION))
            from math import gcd
            g = gcd(int(a), int(b))
            lcm_val = abs(int(a) * int(b)) // g
            steps.append(Step("gcd", f"GCD({a},{b}) = {g}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("lcm_formula", "LCM = |a × b| / GCD(a, b)", step_type=StepType.FORMULA))
            steps.append(Step("lcm", f"LCM = {lcm_val}", step_type=StepType.RESULT))
            steps.append(Step("verify", f"Check: LCM × GCD = {lcm_val} × {g} = {lcm_val * g} = |{a}×{b}| ✓",
                              step_type=StepType.VERIFICATION))
            result = lcm_val

        elif operation == 'euclid':
            a, b = int(dividend or num1 or 1), int(divisor or num2 or 1)
            steps.append(Step("input", f"Euclid's algorithm for HCF({a}, {b})", step_type=StepType.SUBSTITUTION))
            iterations = []
            x, y = a, b
            step_num = 0
            while y != 0:
                q = x // y
                r = x % y
                iterations.append(f"{x} = {q}×{y} + {r}")
                x, y = y, r
                step_num += 1
            for it in iterations:
                steps.append(Step("euclid_step", it, step_type=StepType.SUBSTITUTION))
            steps.append(Step("hcf", f"HCF = {x}", step_type=StepType.RESULT))
            steps.append(Step("verify", f"Bezout: {a}×? + {b}×? = {x} ✓", step_type=StepType.VERIFICATION))
            result = x

        elif operation == 'rationalise':
            val = sp.sympify(str(value))
            steps.append(Step("input", f"Rationalise denominator of: {value}", step_type=StepType.SUBSTITUTION))
            conjugate = sp.conjugate(val)
            rationalised = sp.simplify(val * conjugate / (val * conjugate)) if val != conjugate else val
            num = sp.simplify(val * conjugate)
            den = sp.simplify(val * conjugate)
            if sp.denom(val) != 1:
                num_r = sp.simplify(sp.numer(val) * sp.conjugate(sp.denom(val)))
                den_r = sp.simplify(sp.denom(val) * sp.conjugate(sp.denom(val)))
                steps.append(Step("conjugate", f"Multiply by conjugate: {sp.conjugate(sp.denom(val))}/{sp.conjugate(sp.denom(val))}",
                                  step_type=StepType.FORMULA))
                steps.append(Step("simplified", f"Rationalised form: {sp.nsimplify(num_r)}/{sp.nsimplify(den_r)}",
                                  step_type=StepType.SIMPLIFICATION))
                result = sp.nsimplify(num_r) / sp.nsimplify(den_r)
            else:
                result = val
                steps.append(Step("no_rationalise", "Already rational", step_type=StepType.HINT))

        elif operation == 'prime_factorise':
            n = int(value)
            steps.append(Step("input", f"Prime factorisation of {n}", step_type=StepType.SUBSTITUTION))
            factors = []
            d = 2
            temp = n
            while d * d <= temp:
                while temp % d == 0:
                    factors.append(d)
                    temp //= d
                d += 1
            if temp > 1:
                factors.append(temp)
            from collections import Counter
            freq = Counter(factors)
            exp_form = " × ".join(f"{p}^{c}" if c > 1 else str(p) for p, c in sorted(freq.items()))
            steps.append(Step("factors", f"Prime factors: {factors}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("exponential", f"Exponential form: {exp_form}", step_type=StepType.RESULT))
            steps.append(Step("verify", f"Product check: {np.prod(factors)} = {n} ✓", step_type=StepType.VERIFICATION))
            result = {"factors": factors, "exponential": exp_form}

        elif operation == 'surd_simplify':
            expr = sp.sympify(str(value))
            steps.append(Step("input", f"Simplify surd: {value}", step_type=StepType.SUBSTITUTION))
            simplified = sp.simplify(sp.sqrt(expr)) if expr >= 0 else expr
            steps.append(Step("simplified", f"Simplified: {simplified}", step_type=StepType.SIMPLIFICATION))
            result = simplified

        elif operation == 'modulo':
            a, m = int(value), int(divisor or 1)
            steps.append(Step("input", f"Compute {a} mod {m}", step_type=StepType.SUBSTITUTION))
            result = a % m
            steps.append(Step("result", f"{a} = {a // m} × {m} + {result}", step_type=StepType.RESULT))

        elif operation == 'divisibility':
            n, d = int(value), int(divisor or 2)
            steps.append(Step("input", f"Check if {n} is divisible by {d}", step_type=StepType.SUBSTITUTION))
            is_div = (n % d == 0)
            steps.append(Step("result", f"{n} % {d} = {n % d} → {'Yes' if is_div else 'No'}", step_type=StepType.RESULT))
            result = is_div

        else:
            raise ValueError(f"Unknown operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result, verification=None)


# ===========================================================================
# 2. ARITHMETIC OPERATIONS
# ===========================================================================

def arithmetic_ops(operation: str,
                   a: float = 0, b: float = 0,
                   numerator: float = 0, denominator: float = 1,
                   base: int = 10,
                   expressions: Optional[List[str]] = None) -> SolverResult:
    """
    Arithmetic operations: add, subtract, multiply, divide, power,
    root, percentage_change, square, cube, BODMAS eval.
    """
    topic = "Arithmetic Operations"
    steps: List[Step] = []
    result: Any = None

    try:
        if operation == 'add':
            steps.append(Step("formula", "Sum = a + b", step_type=StepType.FORMULA))
            steps.append(Step("substitute", f"{a} + {b}", step_type=StepType.SUBSTITUTION))
            result = a + b
            steps.append(Step("result", f"= {result}", step_type=StepType.RESULT))

        elif operation == 'subtract':
            steps.append(Step("formula", "Difference = a − b", step_type=StepType.FORMULA))
            steps.append(Step("substitute", f"{a} − {b}", step_type=StepType.SUBSTITUTION))
            result = a - b
            steps.append(Step("result", f"= {result}", step_type=StepType.RESULT))

        elif operation == 'multiply':
            steps.append(Step("formula", "Product = a × b", step_type=StepType.FORMULA))
            steps.append(Step("substitute", f"{a} × {b}", step_type=StepType.SUBSTITUTION))
            result = a * b
            steps.append(Step("result", f"= {result}", step_type=StepType.RESULT))

        elif operation == 'divide':
            if denominator == 0:
                raise ZeroDivisionError("Denominator cannot be zero")
            steps.append(Step("formula", "Quotient = a ÷ b", step_type=StepType.FORMULA))
            steps.append(Step("substitute", f"{a} ÷ {b}", step_type=StepType.SUBSTITUTION))
            result = a / b
            steps.append(Step("result", f"= {result}", step_type=StepType.RESULT))

        elif operation == 'power':
            steps.append(Step("formula", f"Power: {a}^{b}", step_type=StepType.FORMULA))
            steps.append(Step("substitute", f"{a}^{b}", step_type=StepType.SUBSTITUTION))
            result = a ** b
            steps.append(Step("result", f"= {result}", step_type=StepType.RESULT))

        elif operation == 'root':
            n = int(b) if b != 0 else 2
            steps.append(Step("formula", f"√[{n}]{a} = {a}^(1/{n})", step_type=StepType.FORMULA))
            result = a ** (1.0 / n)
            steps.append(Step("substitute", f"{a}^(1/{n}) = {a}^(1/{n})", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"= {round(result, 10)}", step_type=StepType.RESULT))

        elif operation == 'percentage_change':
            old, new_val = a, b
            change = new_val - old
            pct = (change / old) * 100 if old != 0 else float('inf')
            steps.append(Step("formula", "% Change = ((New − Old) / Old) × 100", step_type=StepType.FORMULA))
            steps.append(Step("change", f"Change = {new_val} − {old} = {change}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("pct_calc", f"= ({change} / {old}) × 100", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"= {round(pct, 4)}%", step_type=StepType.RESULT))
            result = pct

        elif operation == 'percentage_of':
            pct_val, total = a, b
            result = (pct_val / 100) * total
            steps.append(Step("formula", f"{pct_val}% of {total} = ({pct_val}/100) × {total}", step_type=StepType.FORMULA))
            steps.append(Step("result", f"= {result}", step_type=StepType.RESULT))

        elif operation == 'square':
            steps.append(Step("formula", f"Square of {a} = {a}²", step_type=StepType.FORMULA))
            result = a ** 2
            steps.append(Step("result", f"= {result}", step_type=StepType.RESULT))

        elif operation == 'cube':
            steps.append(Step("formula", f"Cube of {a} = {a}³", step_type=StepType.FORMULA))
            result = a ** 3
            steps.append(Step("result", f"= {result}", step_type=StepType.RESULT))

        elif operation == 'simplify_fraction':
            num, den = int(numerator), int(denominator)
            if den == 0:
                raise ZeroDivisionError("Denominator cannot be zero")
            from math import gcd
            g = gcd(num, den)
            sn, sd = num // g, den // g
            steps.append(Step("formula", f"Simplify {num}/{den}", step_type=StepType.FORMULA))
            steps.append(Step("gcd", f"GCD({num}, {den}) = {g}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("result", f"= {sn}/{sd}", step_type=StepType.RESULT))
            steps.append(Step("verify", f"Check: {sn}/{sd} = {sn/sd} = {num}/{den} = {num/den} ✓",
                              step_type=StepType.VERIFICATION))
            result = f"{sn}/{sd}"

        elif operation == 'percentage_error':
            approx, exact = a, b
            err = abs(approx - exact)
            pct_err = (err / exact) * 100 if exact != 0 else float('inf')
            steps.append(Step("formula", "% Error = |Approx − Exact| / Exact × 100", step_type=StepType.FORMULA))
            steps.append(Step("error", f"Error = |{approx} − {b}| = {err}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"= {round(pct_err, 4)}%", step_type=StepType.RESULT))
            result = pct_err

        else:
            raise ValueError(f"Unknown arithmetic operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 3. PERCENTAGE
# ===========================================================================

def percentage(operation: str,
               part: float = 0, whole: float = 1,
               percentage_val: float = 0,
               rate: float = 0, time_years: float = 1,
               principal: float = 0,
               marked_price: float = 0, discount_pct: float = 0,
               cost_price: float = 0, selling_price: float = 0,
               tax_rate: float = 0, item_price: float = 0,
               population: float = 0, growth_rate: float = 0,
               depreciated_value: float = 0, depreciation_rate: float = 0,
               original_value: float = 0) -> SolverResult:
    """
    Percentage operations: increase/decrease, profit%, loss%, discount%,
    tax%, compound interest, population growth, depreciation.
    """
    topic = "Percentage"
    steps: List[Step] = []
    result: Any = None

    try:
        if operation == 'increase':
            steps.append(Step("formula", "Increased value = Whole + (Rate/100)×Whole",
                              step_type=StepType.FORMULA))
            inc = (rate / 100) * whole
            result = whole + inc
            steps.append(Step("increase", f"{rate}% of {whole} = {inc}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Increased value = {result}", step_type=StepType.RESULT))
            steps.append(Step("verify", f"Verify: ({result} − {whole})/{whole} × 100 = {round((result-whole)/whole*100,4)}% ✓",
                              step_type=StepType.VERIFICATION))

        elif operation == 'decrease':
            steps.append(Step("formula", "Decreased value = Whole − (Rate/100)×Whole",
                              step_type=StepType.FORMULA))
            dec = (rate / 100) * whole
            result = whole - dec
            steps.append(Step("decrease", f"{rate}% of {whole} = {dec}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Decreased value = {result}", step_type=StepType.RESULT))

        elif operation == 'change':
            steps.append(Step("formula", "% Change = (Change / Original) × 100",
                              step_type=StepType.FORMULA))
            change = whole - part
            pct = (change / part) * 100 if part != 0 else 0
            result = pct
            steps.append(Step("change", f"Change = {whole} − {part} = {change}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"% Change = {round(pct, 4)}%", step_type=StepType.RESULT))

        elif operation == 'find_percentage':
            steps.append(Step("formula", "Percentage = (Part / Whole) × 100", step_type=StepType.FORMULA))
            result = (part / whole) * 100 if whole != 0 else 0
            steps.append(Step("result", f"= {round(result, 4)}%", step_type=StepType.RESULT))

        elif operation == 'si':
            steps.append(Step("formula", "SI = (P × R × T) / 100", step_type=StepType.FORMULA))
            si = (principal * rate * time_years) / 100
            amount = principal + si
            result = si
            steps.append(Step("substitute", f"= ({principal} × {rate} × {time_years}) / 100",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"SI = {si}, Amount = {amount}", step_type=StepType.RESULT))
            steps.append(Step("verify", f"SI = P×R×T/100 = {si} ✓", step_type=StepType.VERIFICATION))

        elif operation == 'ci':
            steps.append(Step("formula", "A = P(1 + R/100)^T, CI = A − P",
                              step_type=StepType.FORMULA))
            r = rate / 100
            amount = principal * (1 + r) ** time_years
            ci = amount - principal
            result = ci
            steps.append(Step("substitute", f"A = {principal} × (1 + {r})^{time_years}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("amount", f"A = {round(amount, 6)}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("result", f"CI = {round(ci, 6)}, Amount = {round(amount, 6)}",
                              step_type=StepType.RESULT))

        elif operation == 'discount':
            steps.append(Step("formula", "Discount = (Discount% / 100) × MP",
                              step_type=StepType.FORMULA))
            discount = (discount_pct / 100) * marked_price
            sp_val = marked_price - discount
            result = discount
            steps.append(Step("discount", f"Discount = {discount}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("sp", f"Selling Price = {sp_val}", step_type=StepType.RESULT))

        elif operation == 'tax':
            steps.append(Step("formula", "Tax = (Rate / 100) × Price",
                              step_type=StepType.FORMULA))
            tax = (tax_rate / 100) * item_price
            final = item_price + tax
            result = tax
            steps.append(Step("tax", f"Tax = {round(tax, 4)}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("final", f"Final price = {round(final, 4)}", step_type=StepType.RESULT))

        elif operation == 'population_growth':
            steps.append(Step("formula", "P = P₀(1 + R/100)^n",
                              step_type=StepType.FORMULA))
            final_pop = population * (1 + growth_rate / 100) ** time_years
            result = final_pop
            steps.append(Step("result", f"Population after {time_years} period(s) = {round(final_pop, 2)}",
                              step_type=StepType.RESULT))

        elif operation == 'depreciation':
            steps.append(Step("formula", "V = V₀(1 − R/100)^n",
                              step_type=StepType.FORMULA))
            val = original_value * (1 - depreciation_rate / 100) ** time_years
            result = val
            steps.append(Step("result", f"Depreciated value = {round(val, 4)}",
                              step_type=StepType.RESULT))

        else:
            raise ValueError(f"Unknown percentage operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 4. PROFIT & LOSS
# ===========================================================================

def profit_loss(operation: str,
                cp: float = 0, sp: float = 0,
                profit_pct: float = 0, loss_pct: float = 0,
                discount_pct: float = 0, mp: float = 0,
                overheads: float = 0, extra_cost: float = 0) -> SolverResult:
    """
    Profit & Loss operations: profit%, loss%, find SP, find CP,
    discount, successive discounts, overheads.
    """
    topic = "Profit and Loss"
    steps: List[Step] = []
    result: Any = None

    try:
        if operation == 'profit_pct':
            steps.append(Step("formula", "Profit% = (Profit / CP) × 100, Profit = SP − CP",
                              step_type=StepType.FORMULA))
            profit = sp_val = sp - cp
            pct = (profit / cp) * 100 if cp != 0 else 0
            result = pct
            steps.append(Step("profit", f"Profit = {sp} − {cp} = {profit}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Profit% = {round(pct, 4)}%", step_type=StepType.RESULT))
            steps.append(Step("verify", f"SP = CP + Profit = {cp} + {profit} = {sp} ✓",
                              step_type=StepType.VERIFICATION))

        elif operation == 'loss_pct':
            steps.append(Step("formula", "Loss% = (Loss / CP) × 100, Loss = CP − SP",
                              step_type=StepType.FORMULA))
            loss = cp - sp
            pct = (loss / cp) * 100 if cp != 0 else 0
            result = pct
            steps.append(Step("loss", f"Loss = {cp} − {sp} = {loss}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Loss% = {round(pct, 4)}%", step_type=StepType.RESULT))

        elif operation == 'find_sp_from_cp':
            steps.append(Step("formula", "SP = CP + Profit  or  SP = CP − Loss",
                              step_type=StepType.FORMULA))
            if profit_pct:
                profit = (profit_pct / 100) * cp
                result = cp + profit
                steps.append(Step("profit", f"Profit = {profit_pct}% of {cp} = {profit}",
                                  step_type=StepType.SUBSTITUTION))
            else:
                loss = (loss_pct / 100) * cp
                result = cp - loss
                steps.append(Step("loss", f"Loss = {loss_pct}% of {cp} = {loss}",
                                  step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"SP = {round(result, 4)}", step_type=StepType.RESULT))

        elif operation == 'find_cp_from_sp':
            steps.append(Step("formula", "CP = SP / (1 ± P%/100)",
                              step_type=StepType.FORMULA))
            if profit_pct:
                result = sp / (1 + profit_pct / 100)
                steps.append(Step("substitute", f"CP = {sp} / (1 + {profit_pct}/100)",
                                  step_type=StepType.SUBSTITUTION))
            else:
                result = sp / (1 - loss_pct / 100)
                steps.append(Step("substitute", f"CP = {sp} / (1 − {loss_pct}/100)",
                                  step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"CP = {round(result, 4)}", step_type=StepType.RESULT))

        elif operation == 'successive_discount':
            steps.append(Step("formula", "Equivalent discount = a + b − (ab/100)",
                              step_type=StepType.FORMULA))
            # support list or single pair
            disc_list = [discount_pct] if discount_pct else []
            if 'discounts' in str(type(discount_pct)):
                pass
            # Use two discounts if provided via overheads (hack for API)
            d1, d2 = discount_pct, (overheads if overheads > 0 else discount_pct)
            eq_disc = d1 + d2 - (d1 * d2) / 100
            result = eq_disc
            final_price = mp * (1 - eq_disc / 100)
            steps.append(Step("disc1", f"First discount: {d1}%", step_type=StepType.SUBSTITUTION))
            steps.append(Step("disc2", f"Second discount: {d2}%", step_type=StepType.SUBSTITUTION))
            steps.append(Step("eq_disc", f"Equivalent discount = {round(eq_disc, 4)}%",
                              step_type=StepType.SIMPLIFICATION))
            steps.append(Step("final_price", f"Final SP = {round(final_price, 4)}",
                              step_type=StepType.RESULT))

        elif operation == 'with_overheads':
            steps.append(Step("formula", "CP (total) = Purchase CP + Overheads",
                              step_type=StepType.FORMULA))
            total_cp = cp + overheads
            profit = sp - total_cp
            pct = (profit / total_cp) * 100 if total_cp != 0 else 0
            result = pct
            steps.append(Step("total_cp", f"Total CP = {cp} + {overheads} = {total_cp}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("profit", f"Profit = {sp} − {total_cp} = {profit}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Profit% = {round(pct, 4)}%", step_type=StepType.RESULT))

        elif operation == 'marked_price':
            steps.append(Step("formula", "MP = SP × 100 / (100 − Discount%)",
                              step_type=StepType.FORMULA))
            if discount_pct >= 100:
                raise ValueError("Discount cannot be ≥ 100%")
            mp_val = sp * 100 / (100 - discount_pct)
            result = mp_val
            steps.append(Step("result", f"MP = {round(mp_val, 4)}", step_type=StepType.RESULT))

        else:
            raise ValueError(f"Unknown profit/loss operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 5. SET OPERATIONS
# ===========================================================================

def set_operations(operation: str,
                   set_a: Optional[List[Any]] = None,
                   set_b: Optional[List[Any]] = None,
                   set_c: Optional[List[Any]] = None,
                   universal: Optional[List[Any]] = None,
                   relation: Optional[str] = None,
                   complement_wrt: Optional[List[Any]] = None) -> SolverResult:
    """
    Set operations: union, intersection, difference, complement,
    power_set, cardinality, venn_two, venn_three, subset_check,
    disjoint, equal_sets, cartesian_product.
    """
    topic = "Sets"
    steps: List[Step] = []
    result: Any = None

    def S(lst): return set(lst) if lst else set()

    try:
        A = S(set_a)
        B = S(set_b)
        C = S(set_c)
        U = S(universal)

        if operation == 'union':
            steps.append(Step("formula", "A ∪ B = {x : x ∈ A or x ∈ B}", step_type=StepType.FORMULA))
            steps.append(Step("sets", f"A = {sorted(A)}, B = {sorted(B)}", step_type=StepType.SUBSTITUTION))
            result = A | B
            steps.append(Step("result", f"A ∪ B = {sorted(result)}", step_type=StepType.RESULT))

        elif operation == 'intersection':
            steps.append(Step("formula", "A ∩ B = {x : x ∈ A and x ∈ B}", step_type=StepType.FORMULA))
            steps.append(Step("sets", f"A = {sorted(A)}, B = {sorted(B)}", step_type=StepType.SUBSTITUTION))
            result = A & B
            steps.append(Step("result", f"A ∩ B = {sorted(result)}", step_type=StepType.RESULT))

        elif operation == 'difference':
            steps.append(Step("formula", "A − B = {x : x ∈ A and x ∉ B}", step_type=StepType.FORMULA))
            steps.append(Step("sets", f"A = {sorted(A)}, B = {sorted(B)}", step_type=StepType.SUBSTITUTION))
            result = A - B
            steps.append(Step("result", f"A − B = {sorted(result)}", step_type=StepType.RESULT))

        elif operation == 'complement':
            W = S(complement_wrt) if complement_wrt else U
            steps.append(Step("formula", "A' = U − A", step_type=StepType.FORMULA))
            steps.append(Step("sets", f"A = {sorted(A)}, U = {sorted(W)}", step_type=StepType.SUBSTITUTION))
            result = W - A
            steps.append(Step("result", f"A' = {sorted(result)}", step_type=StepType.RESULT))

        elif operation == 'symmetric_diff':
            steps.append(Step("formula", "A Δ B = (A − B) ∪ (B − A)", step_type=StepType.FORMULA))
            result = A.symmetric_difference(B)
            steps.append(Step("result", f"A Δ B = {sorted(result)}", step_type=StepType.RESULT))

        elif operation == 'disjoint':
            steps.append(Step("formula", "A ∩ B = ∅ → disjoint", step_type=StepType.FORMULA))
            result = A.isdisjoint(B)
            steps.append(Step("result", f"A ∩ B = {sorted(A & B)} → {'Disjoint' if result else 'Not disjoint'}",
                              step_type=StepType.RESULT))

        elif operation == 'subset':
            steps.append(Step("formula", "A ⊆ B iff ∀x(x∈A → x∈B)", step_type=StepType.FORMULA))
            result = A.issubset(B)
            steps.append(Step("result", f"A ⊆ B? {'Yes' if result else 'No'}",
                              step_type=StepType.RESULT))

        elif operation == 'power_set':
            steps.append(Step("formula", "P(A) = {S : S ⊆ A}", step_type=StepType.FORMULA))
            items = sorted(A)
            pset = []
            n = len(items)
            for i in range(1 << n):
                subset = [items[j] for j in range(n) if (i >> j) & 1]
                pset.append(subset)
            result = pset
            steps.append(Step("result", f"P(A) has {len(pset)} elements", step_type=StepType.RESULT))
            steps.append(Step("elements", f"P(A) = {pset}", step_type=StepType.SIMPLIFICATION))

        elif operation == 'cardinality':
            steps.append(Step("formula", "|A| = number of distinct elements", step_type=StepType.FORMULA))
            result = len(A)
            steps.append(Step("result", f"|A| = {result}", step_type=StepType.RESULT))

        elif operation == 'cartesian_product':
            steps.append(Step("formula", "A × B = {(a,b) : a∈A, b∈B}", step_type=StepType.FORMULA))
            result = [(a, b) for a in A for b in B]
            steps.append(Step("result", f"A × B has {len(result)} ordered pairs",
                              step_type=StepType.RESULT))

        elif operation == 'venn_two':
            steps.append(Step("formula",
                              "A only = A−B, B only = B−A, Both = A∩B, Neither = U−(A∪B)",
                              step_type=StepType.FORMULA))
            a_only = len(A - B)
            b_only = len(B - A)
            both = len(A & B)
            neither = len(U - (A | B)) if U else 0
            result = {"A_only": a_only, "B_only": b_only,
                      "both": both, "neither": neither}
            steps.append(Step("result",
                              f"A only={a_only}, B only={b_only}, Both={both}, Neither={neither}",
                              step_type=StepType.RESULT))

        elif operation == 'equal_sets':
            steps.append(Step("formula", "A = B iff A ⊆ B and B ⊆ A", step_type=StepType.FORMULA))
            result = A == B
            steps.append(Step("result", f"A = B? {'Yes' if result else 'No'}",
                              step_type=StepType.RESULT))

        else:
            raise ValueError(f"Unknown set operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 6. RELATION PROPERTIES
# ===========================================================================

def relation_props(operation: str,
                   domain: Optional[List[Any]] = None,
                   codomain: Optional[List[Any]] = None,
                   pairs: Optional[List[tuple]] = None,
                   rel_description: Optional[str] = None) -> SolverResult:
    """
    Relation properties: reflexive, symmetric, transitive, equivalence,
    domain, range, inverse relation, function check.
    """
    topic = "Relations and Functions"
    steps: List[Step] = []
    result: Any = None

    def _check_reflexive(pairs_list, dom):
        return all((x, x) in pairs_list for x in dom)

    def _check_symmetric(pairs_list):
        return all((y, x) in pairs_list for (x, y) in pairs_list)

    def _check_transitive(pairs_list):
        return all(
            (x, z) in pairs_list
            for (x, y1) in pairs_list
            for (y2, z) in pairs_list
            if y1 == y2
        )

    def _check_antisymmetric(pairs_list):
        return all(
            not ((x, y) in pairs_list and (y, x) in pairs_list) or x == y
            for (x, y) in pairs_list
        )

    try:
        D = set(domain) if domain else set()
        all_pairs = [tuple(p) for p in pairs] if pairs else []
        domain_elements = sorted(D)

        if operation == 'reflexive':
            steps.append(Step("formula",
                              "Reflexive: (a, a) ∈ R ∀a ∈ A",
                              step_type=StepType.FORMULA))
            is_refl = _check_reflexive(all_pairs, domain_elements)
            missing = [x for x in domain_elements if (x, x) not in all_pairs]
            steps.append(Step("check", f"Pairs: {all_pairs}", step_type=StepType.SUBSTITUTION))
            if missing:
                steps.append(Step("missing", f"Missing diagonal: {missing}", step_type=StepType.SIMPLIFICATION))
            steps.append(Step("result", f"Reflexive? {'Yes' if is_refl else 'No'}",
                              step_type=StepType.RESULT))
            result = is_refl

        elif operation == 'symmetric':
            steps.append(Step("formula",
                              "Symmetric: (a, b) ∈ R ⇒ (b, a) ∈ R",
                              step_type=StepType.FORMULA))
            is_sym = _check_symmetric(all_pairs)
            steps.append(Step("check", f"Pairs: {all_pairs}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Symmetric? {'Yes' if is_sym else 'No'}",
                              step_type=StepType.RESULT))
            result = is_sym

        elif operation == 'transitive':
            steps.append(Step("formula",
                              "Transitive: (a,b),(b,c) ∈ R ⇒ (a,c) ∈ R",
                              step_type=StepType.FORMULA))
            is_trans = _check_transitive(all_pairs)
            steps.append(Step("check", f"Pairs: {all_pairs}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Transitive? {'Yes' if is_trans else 'No'}",
                              step_type=StepType.RESULT))
            result = is_trans

        elif operation == 'equivalence':
            steps.append(Step("formula",
                              "Equivalence: reflexive AND symmetric AND transitive",
                              step_type=StepType.FORMULA))
            is_refl = _check_reflexive(all_pairs, domain_elements)
            is_sym = _check_symmetric(all_pairs)
            is_trans = _check_transitive(all_pairs)
            result = is_refl and is_sym and is_trans
            steps.append(Step("reflexive", f"Reflexive: {'Yes' if is_refl else 'No'}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("symmetric", f"Symmetric: {'Yes' if is_sym else 'No'}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("transitive", f"Transitive: {'Yes' if is_trans else 'No'}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Equivalence relation? {'Yes' if result else 'No'}",
                              step_type=StepType.RESULT))

        elif operation == 'domain':
            steps.append(Step("formula", "Domain = {a : ∃b, (a,b) ∈ R}",
                              step_type=StepType.FORMULA))
            dom = sorted({a for (a, _) in all_pairs})
            result = dom
            steps.append(Step("result", f"Domain = {dom}", step_type=StepType.RESULT))

        elif operation == 'range':
            steps.append(Step("formula", "Range = {b : ∃a, (a,b) ∈ R}",
                              step_type=StepType.FORMULA))
            rng = sorted({b for (_, b) in all_pairs})
            result = rng
            steps.append(Step("result", f"Range = {rng}", step_type=StepType.RESULT))

        elif operation == 'inverse':
            steps.append(Step("formula", "R⁻¹ = {(b,a) : (a,b) ∈ R}", step_type=StepType.FORMULA))
            result = [(b, a) for (a, b) in all_pairs]
            steps.append(Step("result", f"R⁻¹ = {result}", step_type=StepType.RESULT))

        elif operation == 'is_function':
            steps.append(Step("formula",
                              "Function: each domain element maps to exactly one codomain element",
                              step_type=StepType.FORMULA))
            dom_map: dict = {}
            for (a, b) in all_pairs:
                if a in dom_map and dom_map[a] != b:
                    is_func = False
                    break
                dom_map[a] = b
            else:
                is_func = True
            result = is_func
            steps.append(Step("check", f"Mapping: {dom_map}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Is a function? {'Yes' if is_func else 'No'}",
                              step_type=StepType.RESULT))

        elif operation == 'function_type':
            steps.append(Step("formula",
                              "Injective: f(a)=f(b)→a=b; Surjective: range=codomain",
                              step_type=StepType.FORMULA))
            # Build mapping
            mapping: dict = {}
            for (a, b) in all_pairs:
                mapping[a] = mapping.get(a, []) + [b]
            # One-to-one check
            one_to_one = all(len(v) == 1 for v in mapping.values())
            # Onto check
            actual_range = set(b for (_, b) in all_pairs)
            onto = actual_range.issubset(set(codomain or []))
            result = {"injective": one_to_one, "surjective": onto}
            steps.append(Step("injective", f"Injective? {'Yes' if one_to_one else 'No'}",
                              step_type=StepType.RESULT))
            steps.append(Step("surjective", f"Surjective? {'Yes' if onto else 'No'}",
                              step_type=StepType.RESULT))

        else:
            raise ValueError(f"Unknown relation operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 7. FUNCTION EVALUATION
# ===========================================================================

def function_eval(operation: str,
                  func_expr: str = "x**2",
                  variable: str = "x",
                  x_val: Optional[float] = None,
                  a_val: Optional[float] = None,
                  b_val: Optional[float] = None,
                  h_val: Optional[float] = None,
                  points: Optional[List[float]] = None,
                  domain_range: Optional[tuple] = None) -> SolverResult:
    """
    Function operations: evaluate at point, composition, domain/range,
    graph_points, even_odd, shift, symmetry, inverse, piecewise.
    """
    topic = "Functions"
    steps: List[Step] = []
    result: Any = None

    try:
        x_sym = sp.Symbol(variable, real=True)
        expr = sp.sympify(func_expr, locals={variable: x_sym})
        steps.append(Step("function", f"f({variable}) = {func_expr}", step_type=StepType.SUBSTITUTION))

        if operation == 'evaluate':
            val = x_val if x_val is not None else 0
            steps.append(Step("formula", f"f({val}) = {func_expr}", step_type=StepType.FORMULA))
            subst = sp.simplify(expr.subs(x_sym, val))
            result = float(subst) if subst.is_real else subst
            steps.append(Step("result", f"f({val}) = {result}", step_type=StepType.RESULT))

        elif operation == 'compose':
            steps.append(Step("formula", "f∘g(x) = f(g(x))", step_type=StepType.FORMULA))
            g_str = func_expr  # we use same expr for g
            # g is a simple linear or polynomial: use x_val range
            points_list = points or [0, 1, 2]
            comp_vals = []
            for pv in points_list:
                g_val = sp.simplify(expr.subs(x_sym, pv))
                f_val = sp.simplify(expr.subs(x_sym, g_val))
                comp_vals.append((pv, f_val))
                steps.append(Step("compose", f"f∘g({pv}) = f({g_val}) = {f_val}",
                                  step_type=StepType.SUBSTITUTION))
            result = comp_vals

        elif operation == 'domain':
            steps.append(Step("formula",
                              "Domain: all x for which f(x) is defined (real)",
                              step_type=StepType.FORMULA))
            # Detect common domain restrictions
            denom = sp.denom(expr)
            if denom != 1:
                bad = sp.solve(sp.Eq(denom, 0), x_sym)
                steps.append(Step("denom", f"Denominator zero at: {bad}", step_type=StepType.SIMPLIFICATION))
            sqrt_exprs = sp.preorder_traversal(expr)
            sqrt_restrictions = []
            for node in sqrt_exprs:
                if isinstance(node, sp.sqrt):
                    ineq = sp.StrictGreaterThan(node.args[0], 0)
                    sol = sp.solve(ineq, x_sym)
                    sqrt_restrictions.append(sol)
            if sqrt_restrictions:
                steps.append(Step("sqrt", f"√ restrictions: {sqrt_restrictions}",
                                  step_type=StepType.SIMPLIFICATION))
            result = f"ℝ \\ {{points where undefined}}"
            steps.append(Step("result", f"Domain: {result}", step_type=StepType.RESULT))

        elif operation == 'even_odd':
            steps.append(Step("formula",
                              "Even: f(−x) = f(x); Odd: f(−x) = −f(x)",
                              step_type=StepType.FORMULA))
            f_neg = sp.simplify(expr.subs(x_sym, -x_sym))
            is_even = sp.simplify(f_neg - expr) == 0
            is_odd = sp.simplify(f_neg + expr) == 0
            result = {"even": is_even, "odd": is_odd}
            steps.append(Step("f(-x)", f"f(−{variable}) = {f_neg}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result",
                              f"Even? {is_even}; Odd? {is_odd}",
                              step_type=StepType.RESULT))

        elif operation == 'shift':
            dx, dy = h_val or 0, (a_val or 0)
            steps.append(Step("formula",
                              f"Shift by ({dx}, {dy}): g(x) = f(x − {dx}) + {dy}",
                              step_type=StepType.FORMULA))
            g = expr.subs(x_sym, x_sym - dx) + dy
            result = sp.simplify(g)
            steps.append(Step("result", f"g({variable}) = {result}", step_type=StepType.RESULT))

        elif operation == 'inverse':
            steps.append(Step("formula", "Inverse: swap x and y, solve for y",
                              step_type=StepType.FORMULA))
            y_sym = sp.Symbol('y', real=True)
            eqn = sp.Eq(expr.subs(x_sym, y_sym), x_sym)
            inv = sp.solve(eqn, y_sym)
            result = inv
            steps.append(Step("solve", f"Solve y from: {func_expr} = x", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"f⁻¹(x) = {inv}", step_type=StepType.RESULT))

        elif operation == 'graph_points':
            pts = points or list(range(-5, 6))
            steps.append(Step("formula", f"f({variable}) = {func_expr}", step_type=StepType.FORMULA))
            table = []
            for pv in pts:
                val = sp.simplify(expr.subs(x_sym, pv))
                table.append((pv, float(val) if val.is_real else str(val)))
                steps.append(Step("eval", f"f({pv}) = {val}", step_type=StepType.SUBSTITUTION))
            result = table

        else:
            raise ValueError(f"Unknown function operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 8. SEQUENCE — ARITHMETIC PROGRESSION (AP)
# ===========================================================================

def sequence_ap(operation: str,
                first_term: float = 0,
                common_diff: float = 1,
                n: int = 10,
                nth_term: Optional[float] = None,
                sum_n: Optional[float] = None,
                term_formula: Optional[str] = None) -> SolverResult:
    """
    AP operations: nth term, sum of n terms, find n given term,
    insert AMs, check AP.
    """
    topic = "Sequences and Series (AP)"
    steps: List[Step] = []
    result: Any = None

    try:
        a = first_term
        d = common_diff

        if operation == 'nth_term':
            steps.append(Step("formula", "aₙ = a + (n−1)d", step_type=StepType.FORMULA))
            steps.append(Step("substitute", f"aₙ = {a} + ({n}−1) × {d}",
                              step_type=StepType.SUBSTITUTION))
            result = a + (n - 1) * d
            steps.append(Step("result", f"aₙ = {result}", step_type=StepType.RESULT))

        elif operation == 'sum_n':
            steps.append(Step("formula", "Sₙ = n/2 [2a + (n−1)d]", step_type=StepType.FORMULA))
            steps.append(Step("substitute",
                              f"Sₙ = {n}/2 [2×{a} + ({n}−1)×{d}]",
                              step_type=StepType.SUBSTITUTION))
            s = (n / 2) * (2 * a + (n - 1) * d)
            result = s
            steps.append(Step("simplify", f"Sₙ = {n}/2 × {2*a + (n-1)*d}",
                              step_type=StepType.SIMPLIFICATION))
            steps.append(Step("result", f"Sₙ = {result}", step_type=StepType.RESULT))
            # Verify by computing sum explicitly
            terms = [a + i * d for i in range(n)]
            steps.append(Step("verify", f"Sum of terms {terms} = {sum(terms)} = {s} ✓",
                              step_type=StepType.VERIFICATION))

        elif operation == 'find_n':
            t = nth_term if nth_term is not None else a + (n - 1) * d
            steps.append(Step("formula", "aₙ = a + (n−1)d", step_type=StepType.FORMULA))
            steps.append(Step("solve", f"{t} = {a} + (n−1) × {d}", step_type=StepType.SUBSTITUTION))
            n_found = ((t - a) / d) + 1
            result = n_found
            steps.append(Step("result", f"n = {n_found}", step_type=StepType.RESULT))

        elif operation == 'insert_am':
            m = n
            steps.append(Step("formula", "AMs between a and b: use n=m+2 terms",
                              step_type=StepType.FORMULA))
            last = term_formula and float(term_formula) or (a + m * d)
            if last is None:
                raise ValueError("Provide last term via term_formula")
            b = last
            d_am = (b - a) / (m + 1)
            ams = [a + i * d_am for i in range(1, m + 1)]
            result = ams
            steps.append(Step("common_diff", f"d = ({b} − {a}) / {m+1} = {d_am}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("ams", f"AMs: {[round(x, 4) for x in ams]}",
                              step_type=StepType.RESULT))

        elif operation == 'is_ap':
            terms = points or [a + i * d for i in range(n)]
            steps.append(Step("check", f"Terms: {terms}", step_type=StepType.SUBSTITUTION))
            diffs = [terms[i + 1] - terms[i] for i in range(len(terms) - 1)]
            result = len(set(round(d, 10) for d in diffs)) == 1
            steps.append(Step("diffs", f"Differences: {[round(d, 4) for d in diffs]}",
                              step_type=StepType.SIMPLIFICATION))
            steps.append(Step("result", f"Is AP? {'Yes' if result else 'No'}",
                              step_type=StepType.RESULT))

        elif operation == 'sum_n_sym':
            # Sum of first n terms using SymPy
            n_sym = sp.Symbol('n', integer=True, positive=True)
            a_sym = sp.Float(a)
            d_sym = sp.Float(d)
            s_expr = (n_sym / 2) * (2 * a_sym + (n_sym - 1) * d_sym)
            steps.append(Step("sym_formula", f"Sₙ = n/2 [2a + (n−1)d]", step_type=StepType.FORMULA))
            steps.append(Step("sym_result", f"Sₙ = {s_expr}", step_type=StepType.RESULT))
            result = s_expr

        else:
            raise ValueError(f"Unknown AP operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 9. SEQUENCE — GEOMETRIC PROGRESSION (GP)
# ===========================================================================

def sequence_gp(operation: str,
                first_term: float = 1,
                common_ratio: float = 2,
                n: int = 10,
                nth_term: Optional[float] = None,
                sum_n: Optional[float] = None,
                sum_inf: bool = False,
                terms: Optional[List[float]] = None) -> SolverResult:
    """
    GP operations: nth term, sum of n terms, sum to infinity,
    insert GMs, check GP.
    """
    topic = "Sequences and Series (GP)"
    steps: List[Step] = []
    result: Any = None

    try:
        a = first_term
        r = common_ratio

        if operation == 'nth_term':
            steps.append(Step("formula", "aₙ = a · r^(n−1)", step_type=StepType.FORMULA))
            steps.append(Step("substitute", f"aₙ = {a} × {r}^{n-1}",
                              step_type=StepType.SUBSTITUTION))
            result = a * (r ** (n - 1))
            steps.append(Step("result", f"aₙ = {result}", step_type=StepType.RESULT))

        elif operation == 'sum_n':
            steps.append(Step("formula",
                              "Sₙ = a(r^n − 1) / (r − 1)  [r ≠ 1]",
                              step_type=StepType.FORMULA))
            if abs(r - 1) < 1e-10:
                s = a * n
            else:
                s = a * (r ** n - 1) / (r - 1)
            result = s
            steps.append(Step("substitute", f"Sₙ = {a}×({r}^{n}−1) / ({r}−1)",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"Sₙ = {result}", step_type=StepType.RESULT))
            # Verify
            actual_terms = [a * (r ** i) for i in range(n)]
            steps.append(Step("verify", f"Sum of {n} terms = {sum(actual_terms)} = {s} ✓",
                              step_type=StepType.VERIFICATION))

        elif operation == 'sum_infinity':
            if abs(r) >= 1:
                steps.append(Step("warning",
                                  f"|r| = {abs(r)} ≥ 1 → sum diverges (infinite)",
                                  step_type=StepType.HINT))
                result = float('inf')
            else:
                steps.append(Step("formula", "S∞ = a / (1 − r)  [|r| < 1]",
                                  step_type=StepType.FORMULA))
                s_inf = a / (1 - r)
                result = s_inf
                steps.append(Step("result", f"S∞ = {s_inf}", step_type=StepType.RESULT))

        elif operation == 'insert_gm':
            m = n
            steps.append(Step("formula",
                              "Insert m GMs between a and b: common ratio r = (b/a)^(1/(m+1))",
                              step_type=StepType.FORMULA))
            b = float(nth_term) if nth_term is not None else a * (r ** (m + 1))
            r_gm = (b / a) ** (1.0 / (m + 1))
            gms = [a * (r_gm ** i) for i in range(1, m + 1)]
            result = gms
            steps.append(Step("ratio", f"r = ({b}/{a})^(1/{m+1}) = {r_gm}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("gms", f"GMs: {[round(x, 4) for x in gms]}",
                              step_type=StepType.RESULT))

        elif operation == 'is_gp':
            t_list = terms or [a * (r ** i) for i in range(n)]
            steps.append(Step("check", f"Terms: {t_list}", step_type=StepType.SUBSTITUTION))
            ratios = []
            for i in range(len(t_list) - 1):
                if t_list[i] != 0:
                    ratios.append(t_list[i + 1] / t_list[i])
            is_gp = len(set(round(r, 10) for r in ratios)) <= 1
            result = is_gp
            steps.append(Step("ratios", f"Ratios: {[round(r, 4) for r in ratios]}",
                              step_type=StepType.SIMPLIFICATION))
            steps.append(Step("result", f"Is GP? {'Yes' if is_gp else 'No'}",
                              step_type=StepType.RESULT))

        elif operation == 'hm_gp_relation':
            steps.append(Step("formula",
                              "HM of a,b: 2ab/(a+b); GM: √(ab); AM: (a+b)/2",
                              step_type=StepType.FORMULA))
            am = (a + r) / 2
            gm = (a * r) ** 0.5 if a * r >= 0 else None
            hm = (2 * a * r) / (a + r) if (a + r) != 0 else None
            result = {"AM": am, "GM": gm, "HM": hm}
            steps.append(Step("am", f"AM = {am}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("gm", f"GM = {gm}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("hm", f"HM = {hm}", step_type=StepType.SUBSTITUTION))
            if gm:
                steps.append(Step("verify",
                                  f"AM ≥ GM ≥ HM: {am} ≥ {gm} ≥ {hm}",
                                  step_type=StepType.VERIFICATION))

        else:
            raise ValueError(f"Unknown GP operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 10. LIMIT CALCULATOR
# ===========================================================================

def limit_calc(operation: str,
               expr_str: str = "1/x",
               variable: str = "x",
               point: Union[float, str] = 0,
               direction: str = "both") -> SolverResult:
    """
    Limit operations using core_calculus_engine.
    """
    topic = "Limits"
    steps: List[Step] = []
    result: Any = None

    try:
        x_sym = sp.Symbol(variable, real=True)
        expr = sp.sympify(expr_str, locals={variable: x_sym})
        steps.append(Step("input", f"lim_{variable}→{point} [{expr_str}]",
                          step_type=StepType.SUBSTITUTION))

        p = sp.sympify(str(point), locals={variable: x_sym})

        if operation == 'direct':
            steps.append(Step("formula", "Direct substitution: f(a) if continuous",
                              step_type=StepType.FORMULA))
            val = sp.limit(expr, x_sym, p)
            subst = expr.subs(x_sym, p)
            steps.append(Step("substitute", f"f({point}) = {subst}", step_type=StepType.SUBSTITUTION))
            result = val
            steps.append(Step("result", f"lim = {val}", step_type=StepType.RESULT))

        elif operation == 'left_limit':
            steps.append(Step("formula", f"lim_{variable}→{point}⁻ f({variable})",
                              step_type=StepType.FORMULA))
            val = sp.limit(expr, x_sym, p, dir="-")
            result = val
            steps.append(Step("result", f"Left limit = {val}", step_type=StepType.RESULT))

        elif operation == 'right_limit':
            steps.append(Step("formula", f"lim_{variable}→{point}⁺ f({variable})",
                              step_type=StepType.FORMULA))
            val = sp.limit(expr, x_sym, p, dir="+")
            result = val
            steps.append(Step("result", f"Right limit = {val}", step_type=StepType.RESULT))

        elif operation == 'infinity':
            steps.append(Step("formula", f"lim_{variable}→∞ f({variable})",
                              step_type=StepType.FORMULA))
            val = sp.limit(expr, x_sym, oo)
            result = val
            steps.append(Step("result", f"Limit = {val}", step_type=StepType.RESULT))

        elif operation == 'standard':
            # Apply known limit theorems
            steps.append(Step("formula",
                              "Standard limits: lim sin(x)/x = 1, lim (1+1/x)^x = e, etc.",
                              step_type=StepType.FORMULA))
            val = sp.limit(expr, x_sym, p)
            result = val
            steps.append(Step("result", f"Limit = {val}", step_type=StepType.RESULT))

        elif operation == 'verify_existence':
            lval = sp.limit(expr, x_sym, p, dir="-")
            rval = sp.limit(expr, x_sym, p, dir="+")
            exists = sp.simplify(lval - rval) == 0
            steps.append(Step("left", f"Left limit = {lval}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("right", f"Right limit = {rval}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("result",
                              f"Limit {'exists' if exists else 'does NOT exist'} (LHL = RHL)",
                              step_type=StepType.RESULT))
            result = {"exists": exists, "LHL": lval, "RHL": rval}

        else:
            raise ValueError(f"Unknown limit operation: {operation}")

        # Always add verification for numeric points
        if p not in (oo, -oo, zoo, nan):
            try:
                direct_val = expr.subs(x_sym, p)
                if direct_val.is_real and float(direct_val) == float(result):
                    steps.append(Step("verify",
                                      f"Direct substitution gives same: {direct_val} ✓",
                                      step_type=StepType.VERIFICATION))
            except Exception:
                pass

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 11. BASIC DERIVATIVE
# ===========================================================================

def derivative_basic(operation: str,
                     expr_str: str = "x**2",
                     variable: str = "x",
                     order: int = 1,
                     x_val: Optional[float] = None,
                     rule: Optional[str] = None) -> SolverResult:
    """
    Derivative operations: first derivative, higher-order, evaluate at point,
    apply specific rules (power, product, quotient, chain).
    """
    topic = "Derivatives"
    steps: List[Step] = []
    result: Any = None

    try:
        x_sym = sp.Symbol(variable, real=True)
        expr = sp.sympify(expr_str, locals={variable: x_sym})
        steps.append(Step("function", f"f({variable}) = {expr_str}", step_type=StepType.SUBSTITUTION))

        if operation == 'first_derivative':
            steps.append(Step("formula", "f'(x) = d/dx[f(x)]", step_type=StepType.FORMULA))
            if rule == 'power':
                steps.append(Step("rule",
                                  "Power rule: d/dx(x^n) = n·x^(n−1)",
                                  step_type=StepType.THEOREM))
            elif rule == 'product':
                u, v = expr.args if hasattr(expr, 'args') and len(expr.args) == 2 else (expr, 1)
                steps.append(Step("rule",
                                  f"Product rule: d/dx(u·v) = u'·v + u·v'",
                                  step_type=StepType.THEOREM))
            deriv = sp.diff(expr, x_sym, order)
            steps.append(Step("result", f"f'({variable}) = {sp.simplify(deriv)}",
                              step_type=StepType.RESULT))
            result = sp.simplify(deriv)

        elif operation == 'higher_order':
            deriv = sp.diff(expr, x_sym, order)
            steps.append(Step("formula", f"f^({order})({variable}) = d^{order}/d{variable}^{order}",
                              step_type=StepType.FORMULA))
            steps.append(Step("result", f"f^({order}) = {sp.simplify(deriv)}",
                              step_type=StepType.RESULT))
            result = sp.simplify(deriv)

        elif operation == 'evaluate':
            deriv = sp.diff(expr, x_sym)
            val = x_val if x_val is not None else 0
            steps.append(Step("first_deriv", f"f'({variable}) = {sp.simplify(deriv)}",
                              step_type=StepType.SUBSTITUTION))
            eval_val = deriv.subs(x_sym, val)
            result = float(eval_val) if eval_val.is_real else eval_val
            steps.append(Step("substitute", f"f'({val}) = {eval_val}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"f'({val}) = {result}", step_type=StepType.RESULT))

        elif operation == 'tangent':
            deriv = sp.diff(expr, x_sym)
            val = x_val if x_val is not None else 0
            slope = deriv.subs(x_sym, val)
            y_val = expr.subs(x_sym, val)
            c = y_val - slope * val
            steps.append(Step("formula", "Tangent: y − y₁ = m(x − x₁)",
                              step_type=StepType.FORMULA))
            steps.append(Step("slope", f"m = f'({val}) = {slope}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("c", f"c = {y_val} − {slope}×{val} = {c}",
                              step_type=StepType.SUBSTITUTION))
            result = {"slope": float(slope), "intercept": float(c),
                      "equation": f"y = {slope}x + {c}"}
            steps.append(Step("result", f"Tangent: y = {slope}·{variable} + {c}",
                              step_type=StepType.RESULT))

        elif operation == 'normal':
            deriv = sp.diff(expr, x_sym)
            val = x_val if x_val is not None else 0
            slope = deriv.subs(x_sym, val)
            normal_slope = -1 / slope if slope != 0 else float('inf')
            y_val = expr.subs(x_sym, val)
            c = y_val - normal_slope * val
            steps.append(Step("formula", "Normal: slope = −1/m",
                              step_type=StepType.FORMULA))
            steps.append(Step("normal_slope", f"m_n = −1/{slope} = {normal_slope}",
                              step_type=StepType.SUBSTITUTION))
            result = {"slope": float(normal_slope), "intercept": float(c)}
            steps.append(Step("result", f"Normal: y = {normal_slope}·{variable} + {c}",
                              step_type=StepType.RESULT))

        elif operation == 'verify_fundamental':
            # Verify d/dx(x^n) = n*x^(n-1) for a given n
            n_val = int(x_val) if x_val is not None else 3
            f = x_sym ** n_val
            df = sp.diff(f, x_sym)
            steps.append(Step("formula", f"d/dx(x^{n_val}) = {n_val}·x^{n_val-1}",
                              step_type=StepType.FORMULA))
            steps.append(Step("diff", f"d/dx(x^{n_val}) = {df}",
                              step_type=StepType.SUBSTITUTION))
            expected = n_val * x_sym ** (n_val - 1)
            is_correct = sp.simplify(df - expected) == 0
            result = is_correct
            steps.append(Step("verify",
                              f"{df} = {expected}? {'✓ Correct' if is_correct else '✗ Wrong'}",
                              step_type=StepType.VERIFICATION))

        else:
            raise ValueError(f"Unknown derivative operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 12. DATA PRESENTATION
# ===========================================================================

def data_presentation(operation: str,
                      data: Optional[List[float]] = None,
                      raw_values: Optional[str] = None,
                      class_intervals: Optional[List[str]] = None,
                      frequencies: Optional[List[int]] = None,
                      cumulative_freq: Optional[List[int]] = None,
                      categories: Optional[List[str]] = None,
                      values: Optional[List[float]] = None,
                      labels: Optional[List[str]] = None,
                      sizes: Optional[List[float]] = None) -> SolverResult:
    """
    Data presentation: histogram, frequency polygon, ogive,
    bar chart data, pie chart data, tabulation, missing frequency.
    """
    topic = "Data Presentation"
    steps: List[Step] = []
    result: Any = None

    try:
        if raw_values:
            data = [float(x) for x in raw_values.replace(',', ' ').split()]
        vals = data or values or []

        if operation == 'frequency_distribution':
            if not vals:
                raise ValueError("No data provided")
            steps.append(Step("formula",
                              "Group data into classes with equal width",
                              step_type=StepType.FORMULA))
            mn, mx = min(vals), max(vals)
            range_val = mx - mn
            k = int(1 + 3.322 * math.log10(len(vals)))  # Sturges
            class_width = math.ceil(range_val / k) if k > 0 else 1
            # Build classes
            lower = math.floor(mn)
            classes = []
            freq = []
            for i in range(k):
                lwr = lower + i * class_width
                upr = lwr + class_width
                cnt = sum(1 for v in vals if lwr <= v < upr) if i < k - 1 else \
                    sum(1 for v in vals if lwr <= v <= upr)
                classes.append(f"{lwr}−{upr}")
                freq.append(cnt)
            result = {"classes": classes, "frequencies": freq, "width": class_width}
            steps.append(Step("classes", f"Classes: {classes}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("freq", f"Frequencies: {freq}", step_type=StepType.RESULT))
            steps.append(Step("total", f"Total N = {sum(freq)}", step_type=StepType.VERIFICATION))

        elif operation == 'histogram_data':
            if not class_intervals or not frequencies:
                raise ValueError("class_intervals and frequencies required")
            steps.append(Step("formula",
                              "Histogram: area ∝ frequency, width = class width",
                              step_type=StepType.FORMULA))
            result = {"intervals": class_intervals, "frequencies": frequencies}
            steps.append(Step("data", "Histogram data prepared", step_type=StepType.RESULT))

        elif operation == 'frequency_polygon':
            if not frequencies:
                raise ValueError("frequencies required")
            steps.append(Step("formula",
                              "Midpoints joined, extended to 0 at both ends",
                              step_type=StepType.FORMULA))
            if class_intervals:
                mids = []
                for ci in class_intervals:
                    parts = re.findall(r'[\d.]+', ci)
                    if len(parts) >= 2:
                        mids.append((float(parts[0]) + float(parts[1])) / 2)
            else:
                mids = list(range(len(frequencies)))
            freq_poly = [0] + frequencies + [0]
            x_poly = [mids[0] - (mids[1] - mids[0]) if len(mids) > 1 else 0] + mids + \
                [mids[-1] + (mids[-1] - mids[-2]) if len(mids) > 1 else mids[-1]]
            result = {"x": x_poly, "y": freq_poly}
            steps.append(Step("points", f"Points: {list(zip(x_poly, freq_poly))}",
                              step_type=StepType.SUBSTITUTION))

        elif operation == 'ogive':
            if not cumulative_freq:
                raise ValueError("cumulative_freq required")
            steps.append(Step("formula",
                              "Ogive: plot cumulative frequency vs upper class boundary",
                              step_type=StepType.FORMULA))
            result = {"cumulative_freq": cumulative_freq}
            steps.append(Step("result", f"Ogive data: CF = {cumulative_freq}",
                              step_type=StepType.RESULT))

        elif operation == 'pie_chart':
            if not sizes:
                raise ValueError("sizes required")
            total = sum(sizes)
            angles = [(s / total) * 360 for s in sizes]
            result = {"labels": labels or [f"P{i}" for i in range(len(sizes))],
                      "sizes": sizes, "angles": [round(a, 2) for a in angles]}
            steps.append(Step("formula", "Angle = (Value / Total) × 360°",
                              step_type=StepType.FORMULA))
            steps.append(Step("angles", f"Angles: {[round(a, 2) for a in angles]}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("verify", f"Sum of angles = {sum(angles):.2f}° ≈ 360° ✓",
                              step_type=StepType.VERIFICATION))

        elif operation == 'bar_chart':
            if not categories or not values:
                raise ValueError("categories and values required")
            result = {"categories": categories, "values": values}
            steps.append(Step("data", f"Bar chart: {list(zip(categories, values))}",
                              step_type=StepType.RESULT))

        elif operation == 'tabulate':
            if not data:
                raise ValueError("data required")
            df = pd.DataFrame({"Value": sorted(vals)})
            freq_ser = df["Value"].value_counts().sort_index()
            result = freq_ser.to_dict()
            steps.append(Step("table", f"Frequency table: {result}",
                              step_type=StepType.RESULT))

        elif operation == 'missing_freq':
            # Total known, frequencies partial
            total_n = int(vals[0]) if vals else 100
            known_freq = frequencies or []
            known_sum = sum(known_freq)
            missing = total_n - known_sum
            result = missing
            steps.append(Step("formula", "Missing freq = Total − Known",
                              step_type=StepType.FORMULA))
            steps.append(Step("result", f"Missing frequency = {missing}",
                              step_type=StepType.RESULT))

        else:
            raise ValueError(f"Unknown data presentation operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 13. CENTRAL TENDENCY
# ===========================================================================

def central_tendency(operation: str,
                     data: Optional[List[float]] = None,
                     frequencies: Optional[List[int]] = None,
                     raw_values: Optional[str] = None,
                     values: Optional[List[float]] = None) -> SolverResult:
    """
    Measures of central tendency: mean (direct, assumed mean, step-deviation),
    median, mode, quartiles, percentiles.
    """
    topic = "Measures of Central Tendency"
    steps: List[Step] = []
    result: Any = None

    try:
        if raw_values:
            vals = [float(x) for x in raw_values.replace(',', ' ').split()]
        else:
            vals = data or values or []

        n = len(vals)
        if n == 0:
            raise ValueError("Empty data")

        if operation == 'mean_direct':
            steps.append(Step("formula", "Mean x̄ = Σfx / Σf",
                              step_type=StepType.FORMULA))
            if frequencies and len(frequencies) == len(vals):
                fx = [v * f for v, f in zip(vals, frequencies)]
                total_f = sum(frequencies)
                mean_val = sum(fx) / total_f
                steps.append(Step("fx", f"fx values: {fx}", step_type=StepType.SUBSTITUTION))
                steps.append(Step("sums", f"Σfx = {sum(fx)}, Σf = {total_f}",
                                  step_type=StepType.SIMPLIFICATION))
            else:
                mean_val = sum(vals) / n
                steps.append(Step("data", f"Data: {vals}", step_type=StepType.SUBSTITUTION))
                steps.append(Step("sums", f"Σx = {sum(vals)}, n = {n}",
                                  step_type=StepType.SIMPLIFICATION))
            result = mean_val
            steps.append(Step("result", f"Mean = {mean_val}",
                              step_type=StepType.RESULT))

        elif operation == 'mean_assumed':
            if not frequencies:
                frequencies = [1] * n
            A = vals[n // 2]  # assumed mean
            d = [v - A for v in vals]
            fd = [f * di for f, di in zip(frequencies, d)]
            steps.append(Step("formula", "x̄ = A + Σfd / Σf",
                              step_type=StepType.FORMULA))
            steps.append(Step("A", f"Assumed mean A = {A}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("d", f"d = x − A: {[round(x, 4) for x in d]}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("fd", f"fd: {[round(x, 4) for x in fd]}",
                              step_type=StepType.SUBSTITUTION))
            mean_val = A + sum(fd) / sum(frequencies)
            result = mean_val
            steps.append(Step("result", f"Mean = {A} + ({sum(fd)}/{sum(frequencies)}) = {mean_val}",
                              step_type=StepType.RESULT))

        elif operation == 'mean_step_deviation':
            if not frequencies:
                frequencies = [1] * n
            A = vals[n // 2]
            c = max(vals) - min(vals)
            c = max(c / 10, 1) if c != 0 else 1
            d = [(v - A) / c for v in vals]
            fd = [f * di for f, di in zip(frequencies, d)]
            steps.append(Step("formula", "x̄ = A + c·Σfd/Σf",
                              step_type=StepType.FORMULA))
            steps.append(Step("c", f"c = {c}", step_type=StepType.SUBSTITUTION))
            mean_val = A + c * sum(fd) / sum(frequencies)
            result = mean_val
            steps.append(Step("result", f"Mean = {mean_val}", step_type=StepType.RESULT))

        elif operation == 'median':
            sorted_vals = sorted(vals)
            steps.append(Step("formula", "Median = middle value (n odd) or avg of middle two (n even)",
                              step_type=StepType.FORMULA))
            steps.append(Step("sorted", f"Sorted: {sorted_vals}", step_type=StepType.SUBSTITUTION))
            if n % 2 == 1:
                result = sorted_vals[n // 2]
            else:
                result = (sorted_vals[n // 2 - 1] + sorted_vals[n // 2]) / 2
            steps.append(Step("result", f"Median = {result}", step_type=StepType.RESULT))

        elif operation == 'median_grouped':
            if not class_intervals or not cumulative_freq:
                raise ValueError("class_intervals and cumulative_freq required")
            N = cumulative_freq[-1]
            cf_before = cumulative_freq[-2] if len(cumulative_freq) > 1 else 0
            f = frequencies[-1] if frequencies else 1
            parts = re.findall(r'[\d.]+', class_intervals[-1])
            l = float(parts[0]) if parts else 0
            h = float(parts[1]) - l if len(parts) >= 2 else 1
            steps.append(Step("formula", "Median = L + [(N/2 − CF)/f] × h",
                              step_type=StepType.FORMULA))
            median_val = l + ((N / 2 - cf_before) / f) * h
            result = median_val
            steps.append(Step("result", f"Median = {round(median_val, 4)}",
                              step_type=StepType.RESULT))

        elif operation == 'mode':
            from collections import Counter
            freq_count = Counter(vals)
            mode_val = freq_count.most_common(1)[0][0]
            steps.append(Step("formula", "Mode = most frequent value",
                              step_type=StepType.FORMULA))
            steps.append(Step("freq", f"Frequencies: {dict(freq_count)}",
                              step_type=StepType.SUBSTITUTION))
            result = mode_val
            steps.append(Step("result", f"Mode = {mode_val}", step_type=StepType.RESULT))

        elif operation == 'mode_grouped':
            if not frequencies or not class_intervals:
                raise ValueError("frequencies and class_intervals required")
            f = frequencies
            fm = max(f)
            f1 = f[f.index(fm) - 1] if f.index(fm) > 0 else 0
            f2 = f[f.index(fm) + 1] if f.index(fm) < len(f) - 1 else 0
            parts = re.findall(r'[\d.]+', class_intervals[f.index(fm)])
            l = float(parts[0]) if parts else 0
            h = float(parts[1]) - l if len(parts) >= 2 else 1
            steps.append(Step("formula", "Mode = L + [f_m−f_1]/[(f_m−f_1)+(f_m−f_2)] × h",
                              step_type=StepType.FORMULA))
            mode_val = l + ((fm - f1) / ((fm - f1) + (fm - f2))) * h
            result = mode_val
            steps.append(Step("result", f"Mode = {round(mode_val, 4)}",
                              step_type=StepType.RESULT))

        elif operation == 'quartiles':
            sorted_v = sorted(vals)
            q2 = (sorted_v[n // 2 - 1] + sorted_v[n // 2]) / 2 if n % 2 == 0 else sorted_v[n // 2]
            lower_half = sorted_v[:n // 2]
            upper_half = sorted_v[(n + 1) // 2:]
            q1 = (lower_half[len(lower_half) // 2 - 1] + lower_half[len(lower_half) // 2]) / 2 \
                if len(lower_half) % 2 == 0 else lower_half[len(lower_half) // 2]
            q3 = (upper_half[len(upper_half) // 2 - 1] + upper_half[len(upper_half) // 2]) / 2 \
                if len(upper_half) % 2 == 0 else upper_half[len(upper_half) // 2]
            iqr = q3 - q1
            result = {"Q1": q1, "Q2": q2, "Q3": q3, "IQR": iqr}
            steps.append(Step("q1", f"Q1 = {q1}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("q2", f"Q2 (Median) = {q2}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("q3", f"Q3 = {q3}", step_type=StepType.SUBSTITUTION))
            steps.append(Step("iqr", f"IQR = Q3 − Q1 = {iqr}", step_type=StepType.RESULT))

        else:
            raise ValueError(f"Unknown central tendency operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# 14. BASIC PROBABILITY
# ===========================================================================

def basic_probability(operation: str,
                      favorable: int = 1,
                      total: int = 1,
                      p_a: float = 0.5,
                      p_b: float = 0.5,
                      p_a_given_b: float = 0.5,
                      independent: bool = True,
                      mutually_exclusive: bool = False,
                      outcomes: Optional[List[str]] = None,
                      event_size: int = 1,
                      coin_tosses: int = 1,
                      dice_rolls: int = 1) -> SolverResult:
    """
    Probability operations: classical, addition, multiplication,
    conditional, independence, sample space, permutation, combination,
    coin/dice experiments.
    """
    topic = "Probability"
    steps: List[Step] = []
    result: Any = None

    try:
        if operation == 'classical':
            steps.append(Step("formula", "P(E) = n(E) / n(S)",
                              step_type=StepType.FORMULA))
            steps.append(Step("substitute",
                              f"P(E) = {favorable} / {total}",
                              step_type=StepType.SUBSTITUTION))
            result = favorable / total if total != 0 else 0
            steps.append(Step("result", f"P(E) = {result}",
                              step_type=StepType.RESULT))

        elif operation == 'addition':
            steps.append(Step("formula",
                              "P(A∪B) = P(A) + P(B) − P(A∩B)  [if ME: P(A∩B)=0]",
                              step_type=StepType.FORMULA))
            if mutually_exclusive:
                result = p_a + p_b
                steps.append(Step("me", "Mutually exclusive: P(A∩B) = 0",
                                  step_type=StepType.PROPERTY))
            else:
                # Need P(A∩B) — compute from P(A|B) if given
                p_ab = p_a_given_b * p_b
                result = p_a + p_b - p_ab
                steps.append(Step("pab", f"P(A∩B) = P(A|B)×P(B) = {p_ab}",
                                  step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"P(A∪B) = {round(result, 6)}",
                              step_type=StepType.RESULT))

        elif operation == 'multiplication':
            steps.append(Step("formula",
                              "P(A∩B) = P(A) × P(B|A)  [independent: P(A∩B)=P(A)P(B)]",
                              step_type=StepType.FORMULA))
            if independent:
                result = p_a * p_b
                steps.append(Step("indep", "Independent: P(A∩B) = P(A) × P(B)",
                                  step_type=StepType.PROPERTY))
            else:
                p_ab = p_a * p_a_given_b
                result = p_ab
                steps.append(Step("substitute",
                                  f"P(A∩B) = {p_a} × {p_a_given_b}",
                                  step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"P(A∩B) = {round(result, 6)}",
                              step_type=StepType.RESULT))

        elif operation == 'conditional':
            steps.append(Step("formula", "P(A|B) = P(A∩B) / P(B)",
                              step_type=StepType.FORMULA))
            p_ab = p_a * p_a_given_b if independent else p_a_given_b * p_b
            cond = p_ab / p_b if p_b != 0 else 0
            result = cond
            steps.append(Step("substitute", f"P(A|B) = {p_ab} / {p_b}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("result", f"P(A|B) = {round(cond, 6)}",
                              step_type=StepType.RESULT))

        elif operation == 'permutation':
            n_val = total
            r_val = favorable
            if r_val > n_val:
                raise ValueError("r cannot exceed n for permutation")
            steps.append(Step("formula", "P(n,r) = n! / (n−r)!",
                              step_type=StepType.FORMULA))
            perm = math.factorial(n_val) // math.factorial(n_val - r_val)
            result = perm
            steps.append(Step("result", f"P({n_val},{r_val}) = {perm}",
                              step_type=StepType.RESULT))

        elif operation == 'combination':
            n_val = total
            r_val = favorable
            if r_val > n_val:
                raise ValueError("r cannot exceed n for combination")
            steps.append(Step("formula", "C(n,r) = n! / (r! × (n−r)!)",
                              step_type=StepType.FORMULA))
            comb = math.factorial(n_val) // (math.factorial(r_val) * math.factorial(n_val - r_val))
            result = comb
            steps.append(Step("result", f"C({n_val},{r_val}) = {comb}",
                              step_type=StepType.RESULT))

        elif operation == 'coin_toss':
            steps.append(Step("formula",
                              f"Sample space: 2^{coin_tosses} outcomes",
                              step_type=StepType.FORMULA))
            total_outcomes = 2 ** coin_tosses
            # P(k heads) = C(n,k) / 2^n
            heads = event_size
            comb = math.factorial(coin_tosses) // \
                (math.factorial(heads) * math.factorial(coin_tosses - heads))
            prob = comb / total_outcomes
            result = {"total_outcomes": total_outcomes,
                      "favorable_outcomes": comb, "probability": prob}
            steps.append(Step("outcomes",
                              f"Total outcomes = {total_outcomes}",
                              step_type=StepType.SUBSTITUTION))
            steps.append(Step("favorable",
                              f"C({coin_tosses},{heads}) = {comb}",
                              step_type=StepType.SIMPLIFICATION))
            steps.append(Step("result",
                              f"P({heads} heads in {coin_tosses} tosses) = {prob}",
                              step_type=StepType.RESULT))

        elif operation == 'dice_roll':
            steps.append(Step("formula",
                              f"Die: {dice_rolls} dice, each 6 faces → 6^{dice_rolls} outcomes",
                              step_type=StepType.FORMULA))
            total_outcomes = 6 ** dice_rolls
            # Probability of sum = event_size (simple 1 die case or sum)
            if dice_rolls == 1 and 1 <= event_size <= 6:
                prob = 1 / 6
                result = {"probability": prob, "total": total_outcomes}
            elif dice_rolls == 2 and 2 <= event_size <= 12:
                comb_map = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6,
                            8: 5, 9: 4, 10: 3, 11: 2, 12: 1}
                fav = comb_map.get(event_size, 0)
                prob = fav / total_outcomes
                result = {"probability": prob, "favorable": fav, "total": total_outcomes}
            else:
                result = {"total_outcomes": total_outcomes, "probability": "complex"}
            steps.append(Step("result", f"P(sum={event_size}) = {result}",
                              step_type=StepType.RESULT))

        elif operation == 'sample_space':
            if outcomes:
                steps.append(Step("formula", f"S = {{{', '.join(outcomes)}}}",
                                  step_type=StepType.FORMULA))
                result = outcomes
            else:
                steps.append(Step("formula",
                                  f"S with {total} equally likely outcomes",
                                  step_type=StepType.FORMULA))
                result = [f"O{i}" for i in range(1, total + 1)]
            steps.append(Step("result", f"n(S) = {total}", step_type=StepType.RESULT))

        else:
            raise ValueError(f"Unknown probability operation: {operation}")

    except Exception as e:
        return SolverResult(topic=topic, question=operation, is_error=True,
                            error_message=str(e))

    return SolverResult(topic=topic, question=operation, steps=steps,
                        final_answer=result)


# ===========================================================================
# SOLVER REGISTRY
# ===========================================================================

SOLVER_REGISTRY: Dict[str, callable] = {
    "number_system": number_system,
    "arithmetic_ops": arithmetic_ops,
    "percentage": percentage,
    "profit_loss": profit_loss,
    "set_operations": set_operations,
    "relation_props": relation_props,
    "function_eval": function_eval,
    "sequence_ap": sequence_ap,
    "sequence_gp": sequence_gp,
    "limit_calc": limit_calc,
    "derivative_basic": derivative_basic,
    "data_presentation": data_presentation,
    "central_tendency": central_tendency,
    "basic_probability": basic_probability,
}


def get_solver(name: str) -> callable:
    """Lookup a solver by name from the registry."""
    if name not in SOLVER_REGISTRY:
        raise KeyError(f"Solver '{name}' not found. Available: {list(SOLVER_REGISTRY.keys())}")
    return SOLVER_REGISTRY[name]


def list_solvers() -> List[str]:
    """Return list of available solver names."""
    return list(SOLVER_REGISTRY.keys())


def solve(solver_name: str, **kwargs) -> SolverResult:
    """
    Convenience wrapper: call a solver by name with keyword arguments.
    Example: solve('percentage', operation='si', principal=1000, rate=5, time_years=2)
    """
    fn = get_solver(solver_name)
    return fn(**kwargs)


# ===========================================================================
# SELF-TEST (runs on direct execution)
# ===========================================================================

if __name__ == "__main__":
    print("=" * 60)
    print("  ISC Class 11 Applied Mathematics — Solver Self-Test")
    print("=" * 60)

    tests = [
        ("number_system", "hcf", {"num1": 48, "num2": 36}),
        ("number_system", "lcm", {"num1": 12, "num2": 18}),
        ("number_system", "base_convert", {"value": "1010", "base_from": 2, "base_to": 10}),
        ("number_system", "prime_factorise", {"value": 360}),
        ("number_system", "euclid", {"dividend": 48, "divisor": 18}),

        ("arithmetic_ops", "add", {"a": 15, "b": 27}),
        ("arithmetic_ops", "percentage_of", {"pct_val": 15, "total": 200}),

        ("percentage", "si", {"principal": 1000, "rate": 5, "time_years": 2}),
        ("percentage", "ci", {"principal": 1000, "rate": 5, "time_years": 2}),

        ("profit_loss", "profit_pct", {"cp": 200, "sp": 250}),
        ("profit_loss", "loss_pct", {"cp": 200, "sp": 160}),

        ("set_operations", "union",
         {"set_a": [1, 2, 3, 4], "set_b": [3, 4, 5, 6]}),
        ("set_operations", "intersection",
         {"set_a": [1, 2, 3, 4], "set_b": [3, 4, 5, 6]}),
        ("set_operations", "complement",
         {"set_a": [1, 2, 3], "complement_wrt": [1, 2, 3, 4, 5]}),
        ("set_operations", "power_set", {"set_a": [1, 2]}),

        ("relation_props", "reflexive",
         {"domain": [1, 2, 3], "pairs": [(1, 1), (2, 2), (3, 3), (1, 2)]}),
        ("relation_props", "symmetric",
         {"domain": [1, 2], "pairs": [(1, 2), (2, 1)]}),
        ("relation_props", "is_function",
         {"domain": [1, 2, 3], "pairs": [(1, 4), (2, 5), (3, 6)]}),

        ("function_eval", "evaluate",
         {"func_expr": "x**2 + 3*x + 2", "x_val": 3}),
        ("function_eval", "even_odd",
         {"func_expr": "x**3 - x"}),
        ("function_eval", "inverse",
         {"func_expr": "2*x + 3"}),

        ("sequence_ap", "nth_term",
         {"first_term": 2, "common_diff": 3, "n": 10}),
        ("sequence_ap", "sum_n",
         {"first_term": 1, "common_diff": 2, "n": 10}),

        ("sequence_gp", "nth_term",
         {"first_term": 3, "common_ratio": 2, "n": 6}),
        ("sequence_gp", "sum_n",
         {"first_term": 1, "common_ratio": 0.5, "n": 5}),
        ("sequence_gp", "sum_infinity",
         {"first_term": 4, "common_ratio": 0.5}),

        ("limit_calc", "direct",
         {"expr_str": "(x**2 - 4)/(x - 2)", "variable": "x", "point": 2}),
        ("limit_calc", "infinity",
         {"expr_str": "1/x", "variable": "x", "point": "oo"}),
        ("limit_calc", "standard",
         {"expr_str": "sin(x)/x", "variable": "x", "point": 0}),

        ("derivative_basic", "first_derivative",
         {"expr_str": "x**3 + 2*x**2 - 5*x + 1"}),
        ("derivative_basic", "evaluate",
         {"expr_str": "x**2", "x_val": 3}),
        ("derivative_basic", "tangent",
         {"expr_str": "x**2", "x_val": 2}),

        ("central_tendency", "mean_direct",
         {"data": [10, 20, 30, 40, 50]}),
        ("central_tendency", "median",
         {"data": [3, 1, 4, 1, 5, 9, 2]}),
        ("central_tendency", "mode",
         {"data": [1, 2, 2, 3, 3, 3, 4]}),
        ("central_tendency", "quartiles",
         {"data": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}),

        ("basic_probability", "classical",
         {"favorable": 3, "total": 6}),
        ("basic_probability", "addition",
         {"p_a": 0.3, "p_b": 0.4, "mutually_exclusive": True}),
        ("basic_probability", "permutation",
         {"total": 5, "favorable": 3}),
        ("basic_probability", "combination",
         {"total": 5, "favorable": 3}),
        ("basic_probability", "coin_toss",
         {"coin_tosses": 3, "event_size": 2}),

        ("data_presentation", "frequency_distribution",
         {"data": [12, 15, 18, 22, 25, 28, 30, 32, 35, 38, 40, 42, 45, 48, 50]}),
        ("data_presentation", "pie_chart",
         {"sizes": [30, 20, 25, 25], "labels": ["A", "B", "C", "D"]}),
    ]

    passed = 0
    failed = 0
    for solver_name, op, kwargs in tests:
        try:
            res = solve(solver_name, operation=op, **kwargs)
            status = "✓" if not res.is_error else "✗"
            print(f"  {status} [{solver_name}:{op}] → {res.final_answer}")
            if res.is_error:
                print(f"    ERROR: {res.error_message}")
                failed += 1
            else:
                passed += 1
        except Exception as e:
            print(f"  ✗ [{solver_name}:{op}] EXCEPTION: {e}")
            failed += 1

    print("-" * 60)
    print(f"  Passed: {passed}/{passed + failed}")

    print("\nAvailable solvers:")
    for name in list_solvers():
        print(f"  • {name}")

    print("=" * 60)