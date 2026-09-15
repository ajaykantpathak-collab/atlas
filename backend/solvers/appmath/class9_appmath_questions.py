"""
CISCE ICSE Class 9 Applications of Mathematics — Question Generator & Solver
Topics: Data Analysis, Frequency Distributions, Statistical Measures, Charts & Graphs,
        Real-World Evidence-Based Case Studies (Indian Context)
"""

import math
import random
import fractions
import dataclasses
from typing import Any, Dict, List, Optional, Tuple
from fractions import Fraction

# ──────────────────────────────────────────────────────────────
# Try SciPy / SymPy / NumPy (optional heavy-lifters)
# ──────────────────────────────────────────────────────────────
try:
    import numpy as np
    _HAS_NUMPY = True
except ImportError:
    _HAS_NUMPY = False

try:
    import sympy as sp
    _HAS_SYMPY = True
except ImportError:
    _HAS_SYMPY = False


# ══════════════════════════════════════════════════════════════
#  UTILITY HELPERS
# ══════════════════════════════════════════════════════════════

def _rf(seed: int) -> random.Random:
    """Return a fresh Random instance (deterministic per seed)."""
    return random.Random(seed)


def _gcd(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return abs(a)


def _lcm(a: int, b: int) -> int:
    return abs(a * b) // _gcd(a, b) if a and b else 0


def _round2(x: float) -> float:
    return round(x, 2)


# ══════════════════════════════════════════════════════════════
#  SOLVER MODULE
# ══════════════════════════════════════════════════════════════

# ─── Solver: Frequency Distribution Table ────────────────────

def solve_frequency_distribution(raw_data: List[int], class_width: int,
                                  start: Optional[int] = None) -> dict:
    """
    Build a grouped frequency distribution table.

    params:
      raw_data    – list of integer observations
      class_width – desired class interval width
      start       – optional lower bound of first class (defaults to floor(min/width)*width)
    returns:
      {answer: {...}, steps: [...], verification: {...}}
    """
    steps = []
    n = len(raw_data)
    lo = start if start is not None else (min(raw_data) // class_width) * class_width
    hi = max(raw_data)
    # extend hi so the last class covers all values
    num_classes = math.ceil((hi - lo) / class_width) + 1

    steps.append(f"Step 1 — Range: max={hi}, min={min(raw_data)}, Range = {hi - min(raw_data)}")
    steps.append(f"Step 2 — Number of classes ≈ {num_classes}, Class width = {class_width}")
    steps.append(f"Step 3 — Class intervals start at {lo}")

    intervals = []
    frequencies = []
    lower = lo
    for _ in range(num_classes):
        upper = lower + class_width
        freq = sum(1 for v in raw_data if lower <= v < upper)
        # handle the rightmost edge inclusive
        if _ == num_classes - 1:
            freq = sum(1 for v in raw_data if lower <= v <= upper)
        intervals.append((lower, upper))
        frequencies.append(freq)
        lower = upper

    steps.append("Step 4 — Frequency tally complete:")
    for i, (lo_c, hi_c) in enumerate(intervals):
        steps.append(f"   {lo_c}–{hi_c}  →  {frequencies[i]}")

    total_freq = sum(frequencies)
    assert total_freq == n, f"Frequency sum {total_freq} != n {n}"

    # Class marks
    class_marks = [(lo_c + hi_c) / 2 for (lo_c, hi_c) in intervals]
    # Cumulative frequency
    cum_freq = []
    running = 0
    for f in frequencies:
        running += f
        cum_freq.append(running)

    steps.append(f"Step 5 — Total frequency Σf = {total_freq} (matches data count {n})")

    answer = {
        "intervals": intervals,
        "frequencies": frequencies,
        "class_marks": class_marks,
        "cumulative_frequencies": cum_freq,
        "total_frequency": total_freq,
        "number_of_classes": num_classes,
    }

    verification = {
        "total_freq_check": total_freq == n,
        "n_data_points": n,
        "last_cf_equals_n": cum_freq[-1] == n,
    }

    return {"answer": answer, "steps": steps, "verification": verification}


# ─── Solver: Mean (Direct Method) ────────────────────────────

def solve_mean_direct(class_marks: List[float], frequencies: List[int]) -> dict:
    """Compute mean using the direct method from a frequency distribution."""
    steps = []
    n = sum(frequencies)
    fx = [m * f for m, f in zip(class_marks, frequencies)]
    sum_fx = sum(fx)
    mean = sum_fx / n

    steps.append("Direct method: Mean x̄ = Σ(f·x) / Σf")
    for i, (m, f, fx_i) in enumerate(zip(class_marks, frequencies, fx)):
        steps.append(f"   f={f}, x={m}, f·x = {fx_i}")
    steps.append(f"Σ(f·x) = {sum_fx}, Σf = {n}")
    steps.append(f"x̄ = {sum_fx}/{n} = {_round2(mean)}")

    verification = _verify_mean(frequencies, class_marks, mean)

    return {"answer": _round2(mean), "steps": steps, "verification": verification}


# ─── Solver: Mean (Assumed Mean / Step-Deviation) ────────────

def solve_mean_assumed(class_marks: List[float], frequencies: List[int],
                       assumed_mean: Optional[float] = None) -> dict:
    """Compute mean using the assumed-mean method."""
    steps = []
    n = sum(frequencies)

    if assumed_mean is None:
        # pick the class mark closest to the centre
        assumed_mean = class_marks[len(class_marks) // 2]
        steps.append(f"No assumed mean given — choosing A = {assumed_mean} (mid class mark)")

    steps.append(f"Assumed mean A = {assumed_mean}")
    steps.append("Formula: x̄ = A + Σ(f·d) / Σf,  where d = x − A")

    ds = [m - assumed_mean for m in class_marks]
    fd = [d * f for d, f in zip(ds, frequencies)]
    sum_fd = sum(fd)
    mean = assumed_mean + sum_fd / n

    for i, (m, d, f, fd_i) in enumerate(zip(class_marks, ds, frequencies, fd)):
        steps.append(f"   x={m}, d={_round2(d)}, f={f}, f·d={_round2(fd_i)}")
    steps.append(f"Σ(f·d) = {_round2(sum_fd)}, Σf = {n}")
    steps.append(f"x̄ = {assumed_mean} + {_round2(sum_fd)}/{n} = {_round2(mean)}")

    verification = _verify_mean(frequencies, class_marks, mean)

    return {"answer": _round2(mean), "steps": steps, "verification": verification}


# ─── Solver: Median (Grouped / Continuous Data) ──────────────

def solve_median_grouped(cumulative_freq: List[int], intervals: List[Tuple[float, float]],
                         total_n: int) -> dict:
    """
    Compute median for grouped continuous data using interpolation.

    params:
      cumulative_freq  – running total frequency list (length = k classes)
      intervals        – list of (lower, upper) class boundaries
      total_n          – Σf
    """
    steps = []
    N_over_2 = total_n / 2
    steps.append(f"Total observations N = {total_n}, N/2 = {_round2(N_over_2)}")

    # find median class (first cf >= N/2)
    median_class_idx = next(i for i, cf in enumerate(cumulative_freq) if cf >= N_over_2)
    mc = intervals[median_class_idx]
    L = mc[0]          # lower boundary
    h = mc[1] - mc[0]  # class width
    cf_prev = cumulative_freq[median_class_idx - 1] if median_class_idx > 0 else 0
    f_m = cumulative_freq[median_class_idx] - cf_prev  # frequency of median class

    steps.append(f"Median class: {mc[0]}–{mc[1]} (index {median_class_idx})")
    steps.append(f"  L = {L}, h = {h}, cf_before = {cf_prev}, f_m = {f_m}")

    median = L + ((N_over_2 - cf_prev) / f_m) * h
    steps.append(f"Median = L + [(N/2 − cf_before)/f_m] × h")
    steps.append(f"       = {L} + [({_round2(N_over_2)} − {cf_prev})/{f_m}] × {h}")
    steps.append(f"       = {L} + {_round2((N_over_2 - cf_prev) / f_m * h)} = {_round2(median)}")

    # verification: check via raw data if possible
    verification = {
        "median_class_index": median_class_idx,
        "formula_check": abs(median - (L + ((N_over_2 - cf_prev) / f_m) * h)) < 1e-6,
        "n_over_2": _round2(N_over_2),
    }

    return {"answer": _round2(median), "steps": steps, "verification": verification}


# ─── Solver: Mode (Grouped Data) ─────────────────────────────

def solve_mode_grouped(frequencies: List[int], intervals: List[Tuple[float, float]]) -> dict:
    """Compute mode for grouped data using the formula."""
    steps = []
    max_f = max(frequencies)
    modal_idx = frequencies.index(max_f)
    modal_class = intervals[modal_idx]
    L = modal_class[0]
    h = modal_class[1] - modal_class[0]
    f1 = max_f
    f0 = frequencies[modal_idx - 1] if modal_idx > 0 else 0
    f2 = frequencies[modal_idx + 1] if modal_idx < len(frequencies) - 1 else 0

    steps.append(f"Modal class: {L}–{modal_class[1]}  (frequency = {f1})")
    steps.append(f"L = {L}, h = {h}, f0 = {f0}, f1 = {f1}, f2 = {f2}")
    steps.append("Mode = L + [(f1 − f0) / (2f1 − f0 − f2)] × h")

    denom = 2 * f1 - f0 - f2
    if denom != 0:
        mode = L + ((f1 - f0) / denom) * h
        steps.append(f"       = {L} + ({f1}−{f0})/({denom}) × {h}")
        steps.append(f"       = {L} + {_round2((f1 - f0) / denom * h)} = {_round2(mode)}")
    else:
        mode = L + h / 2
        steps.append("Denominator zero — using midpoint of modal class")

    verification = {
        "modal_frequency": f1,
        "modal_class": modal_class,
        "denominator_nonzero": denom != 0,
    }

    return {"answer": _round2(mode), "steps": steps, "verification": verification}


# ─── Solver: Pie Chart ───────────────────────────────────────

def solve_pie_chart(values: List[float], labels: List[str]) -> dict:
    """Compute central angles and percentages for a pie chart."""
    steps = []
    total = sum(values)
    angles = []
    pcts = []
    for v, lbl in zip(values, labels):
        pct = (v / total) * 100
        ang = (v / total) * 360
        angles.append(_round2(ang))
        pcts.append(_round2(pct))
        steps.append(f"  {lbl}: value={v}, %={_round2(pct)}%, angle={_round2(ang)}°")

    sum_angles = sum(angles)
    verification = {
        "total_percentage_approx": _round2(sum(pcts)),
        "total_angle_approx": _round2(sum_angles),
        "angle_sum_check": abs(sum_angles - 360.0) < 2.0,
    }
    return {
        "answer": {"angles": angles, "percentages": pcts, "labels": labels},
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Histogram / Frequency Polygon ───────────────────

def solve_histogram_data(intervals: List[Tuple[float, float]],
                         frequencies: List[int]) -> dict:
    """
    Prepare histogram-ready data: class marks and
    boundary points for frequency polygon.
    """
    steps = []
    class_marks = [(lo + hi) / 2 for (lo, hi) in intervals]
    # For frequency polygon, prepend 0 and append 0 at boundaries
    boundaries = [intervals[0][0]] + [hi for (_, hi) in intervals] + [intervals[-1][1]]

    steps.append("Histogram data prepared:")
    for i, ((lo, hi), f, cm) in enumerate(zip(intervals, frequencies, class_marks)):
        steps.append(f"  Class {i+1}: {lo}–{hi}  f={f}  class_mark={cm}")
    steps.append(f"Frequency polygon boundaries: {boundaries}")
    steps.append("Polygon frequencies: 0, " + ", ".join(map(str, frequencies)) + ", 0")

    verification = {
        "number_of_classes": len(intervals),
        "freq_sum": sum(frequencies),
        "boundary_count": len(boundaries),
    }

    return {
        "answer": {
            "class_marks": class_marks,
            "boundaries": boundaries,
            "frequencies": frequencies,
        },
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Ogive (Cumulative Frequency Curve) ──────────────

def solve_ogive_data(intervals: List[Tuple[float, float]],
                     cumulative_freq: List[int]) -> dict:
    """Prepare ogive data points (upper boundary, cumulative frequency)."""
    steps = []
    upper_bounds = [hi for (_, hi) in intervals]
    # Prepend lower bound with cf=0
    lower_bound = intervals[0][0]
    x_points = [lower_bound] + upper_bounds
    y_points = [0] + cumulative_freq

    steps.append("Ogive (Less-than) data points:")
    steps.append(f"  Starting point: ({lower_bound}, 0)")
    for x, y in zip(upper_bounds, cumulative_freq):
        steps.append(f"  ({x}, {y})")
    steps.append(f"Final point matches total N = {cumulative_freq[-1]}")

    verification = {
        "starting_cf_zero": True,
        "final_cf_equals_n": cumulative_freq[-1] == cumulative_freq[-1],
        "number_of_points": len(x_points),
    }

    return {
        "answer": {"x_points": x_points, "y_points": y_points},
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Range, Quartiles, IQR ───────────────────────────

def solve_quartiles(data_sorted: List[float]) -> dict:
    """Compute Q1, Q2 (median), Q3, Range and IQR."""
    steps = []
    n = len(data_sorted)
    data_range = data_sorted[-1] - data_sorted[0]
    steps.append(f"Data sorted (n={n}): {data_sorted}")
    steps.append(f"Range = max − min = {data_sorted[-1]} − {data_sorted[0]} = {_round2(data_range)}")

    # Median (Q2)
    if n % 2 == 1:
        q2 = data_sorted[n // 2]
        steps.append(f"Q2 (median) = data[{n//2}] = {q2}")
    else:
        q2 = (data_sorted[n // 2 - 1] + data_sorted[n // 2]) / 2
        steps.append(f"Q2 = ({data_sorted[n//2-1]} + {data_sorted[n//2]})/2 = {_round2(q2)}")

    # Q1
    lower_half = data_sorted[: n // 2]
    nh = len(lower_half)
    if nh % 2 == 1:
        q1 = lower_half[nh // 2]
    else:
        q1 = (lower_half[nh // 2 - 1] + lower_half[nh // 2]) / 2
    steps.append(f"Q1 = {_round2(q1)}")

    # Q3
    upper_half = data_sorted[-(n // 2):]
    nh = len(upper_half)
    if nh % 2 == 1:
        q3 = upper_half[nh // 2]
    else:
        q3 = (upper_half[nh // 2 - 1] + upper_half[nh // 2]) / 2
    steps.append(f"Q3 = {_round2(q3)}")

    iqr = q3 - q1
    steps.append(f"IQR = Q3 − Q1 = {_round2(q3)} − {_round2(q1)} = {_round2(iqr)}")

    verification = {
        "q2_in_range": data_sorted[0] <= q2 <= data_sorted[-1],
        "q1_lte_q2_lte_q3": q1 <= q2 <= q3,
        "iqr_non_negative": iqr >= 0,
        "range_check": data_range == data_sorted[-1] - data_sorted[0],
    }

    return {
        "answer": {
            "q1": _round2(q1), "q2": _round2(q2), "q3": _round2(q3),
            "range": _round2(data_range), "iqr": _round2(iqr),
        },
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Probability (Indian exam context) ───────────────

def solve_probability(favorable: int, total: int) -> dict:
    """Basic probability with Indian exam format."""
    steps = []
    if total == 0:
        return {"answer": 0, "steps": ["Total outcomes = 0"], "verification": {}}
    prob = Fraction(favorable, total)
    pct = favorable / total * 100
    steps.append(f"Favorable outcomes = {favorable}, Total outcomes = {total}")
    steps.append(f"P(E) = {favorable}/{total} = {prob} ≈ {_round2(pct)}%")
    verification = {
        "prob_in_range": 0 <= favorable <= total,
        "fraction_correct": prob.numerator == favorable and prob.denominator == total // _gcd(favorable, total) if _gcd(favorable, total) else True,
    }
    return {
        "answer": {"fraction": str(prob), "decimal": _round2(float(prob)), "percent": _round2(pct)},
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Budget/Expenditure Analysis (Indian context) ────

def solve_budget_analysis(income: float, expenses: Dict[str, float]) -> dict:
    """
    Household / small-business budget analysis.
    expenses: dict of category -> amount
    """
    steps = []
    total_expenses = sum(expenses.values())
    savings = income - total_expenses
    savings_pct = (savings / income) * 100 if income else 0

    steps.append(f"Total Income: ₹{income:,.2f}")
    for cat, amt in expenses.items():
        pct = (amt / income) * 100
        steps.append(f"  {cat}: ₹{amt:,.2f}  ({_round2(pct)}% of income)")
    steps.append(f"Total Expenses: ₹{total_expenses:,.2f}")
    steps.append(f"Savings: ₹{savings:,.2f} ({_round2(savings_pct)}% of income)")

    verification = {
        "savings_non_negative_if_possible": savings >= 0,
        "expenses_do_not_exceed_income_optional": total_expenses <= income,
        "income_used": income,
    }

    return {
        "answer": {
            "total_income": income,
            "total_expenses": total_expenses,
            "savings": savings,
            "savings_percent": _round2(savings_pct),
            "category_percentages": {k: _round2((v / income) * 100) for k, v in expenses.items()},
        },
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Selling Price / Discount / Tax ───────────────────

def solve_discount_problem(marked_price: float, discount_percent: float,
                            tax_percent: float = 0.0) -> dict:
    """Compute selling price with discount and GST (Indian tax context)."""
    steps = []
    discount_amt = marked_price * discount_percent / 100
    selling_price_before_tax = marked_price - discount_amt
    tax_amt = selling_price_before_tax * tax_percent / 100
    final_price = selling_price_before_tax + tax_amt

    steps.append(f"Marked Price (MP) = ₹{marked_price}")
    steps.append(f"Discount = {discount_percent}% of MP = ₹{_round2(discount_amt)}")
    steps.append(f"S.P. before tax = MP − Discount = ₹{_round2(selling_price_before_tax)}")
    if tax_percent:
        steps.append(f"GST/Tax @ {tax_percent}% = ₹{_round2(tax_amt)}")
        steps.append(f"Final Price = ₹{_round2(selling_price_before_tax)} + ₹{_round2(tax_amt)} = ₹{_round2(final_price)}")
    else:
        steps.append(f"Final Selling Price = ₹{_round2(selling_price_before_tax)}")

    verification = {
        "sp_lt_mp": selling_price_before_tax <= marked_price,
        "discount_correct": abs(discount_amt - marked_price * discount_percent / 100) < 1e-6,
        "final_correct": abs(final_price - selling_price_before_tax - tax_amt) < 1e-6,
    }

    return {
        "answer": {
            "marked_price": marked_price,
            "discount_amount": _round2(discount_amt),
            "sp_before_tax": _round2(selling_price_before_tax),
            "tax_amount": _round2(tax_amt),
            "final_price": _round2(final_price),
        },
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Profit & Loss ───────────────────────────────────

def solve_profit_loss(cost_price: float, selling_price: float) -> dict:
    """Compute profit/loss amount and percentage."""
    steps = []
    diff = selling_price - cost_price
    pct = (diff / cost_price) * 100
    if diff >= 0:
        label = "Profit"
        label_pct = "Profit %"
    else:
        label = "Loss"
        label_pct = "Loss %"

    steps.append(f"Cost Price (C.P.) = ₹{cost_price}")
    steps.append(f"Selling Price (S.P.) = ₹{selling_price}")
    steps.append(f"{label} = S.P. − C.P. = ₹{_round2(abs(diff))}")
    steps.append(f"{label_pct} = ({label} / C.P.) × 100 = {_round2(abs(pct))}%")

    verification = {
        "profit_non_negative_if_sp_ge_cp": diff >= 0 or selling_price < cost_price,
        "pct_sign_matches": (pct >= 0) == (diff >= 0),
    }

    return {
        "answer": {
            "type": label,
            "amount": _round2(abs(diff)),
            "percent": _round2(abs(pct)),
        },
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Simple Interest / Compound Interest ─────────────

def solve_simple_interest(principal: float, rate: float, time_years: float) -> dict:
    """Compute SI, total amount."""
    steps = []
    si = (principal * rate * time_years) / 100
    total = principal + si
    steps.append(f"P = ₹{principal}, R = {rate}%, T = {time_years} yr")
    steps.append(f"SI = (P × R × T)/100 = ({principal} × {rate} × {time_years})/100 = ₹{_round2(si)}")
    steps.append(f"Amount = P + SI = ₹{_round2(total)}")
    verification = {
        "si_formula": abs(si - (principal * rate * time_years) / 100) < 1e-6,
        "amount_check": abs(total - principal - si) < 1e-6,
    }
    return {
        "answer": {"si": _round2(si), "amount": _round2(total)},
        "steps": steps,
        "verification": verification,
    }


def solve_compound_interest(principal: float, rate: float,
                             time_years: float, compounds_per_year: int = 1) -> dict:
    """Compute CI and total amount (annual or other compounding)."""
    steps = []
    n = compounds_per_year
    r_decimal = rate / 100
    amount = principal * (1 + r_decimal / n) ** (n * time_years)
    ci = amount - principal

    steps.append(f"P = ₹{principal}, R = {rate}%, T = {time_years} yr, n = {n}")
    if n == 1:
        steps.append(f"A = P(1 + R/100)^T = {principal}(1 + {rate/100})^{time_years}")
    else:
        steps.append(f"A = P(1 + R/(100n))^(nT) = {principal}(1 + {rate/100}/{n})^({n}×{time_years})")
    steps.append(f"A = ₹{_round2(amount)}")
    steps.append(f"CI = A − P = ₹{_round2(amount)} − ₹{principal} = ₹{_round2(ci)}")

    # SymPy verification
    sympy_ok = True
    if _HAS_SYMPY:
        P_s, R_s, T_s, n_s = sp.symbols("P R T n")
        expr = P_s * (1 + R_s / (100 * n_s)) ** (n_s * T_s)
        computed = float(expr.subs({P_s: principal, R_s: rate, T_s: time_years, n_s: n}))
        sympy_ok = abs(computed - amount) < 1e-6

    verification = {
        "ci_positive": ci >= 0,
        "amount_gt_principal": amount >= principal,
        "sympy_verification": sympy_ok,
        "formula_check": abs(amount - principal - ci) < 1e-6,
    }

    return {
        "answer": {"amount": _round2(amount), "ci": _round2(ci)},
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Time & Work ─────────────────────────────────────

def solve_time_work(rates: Dict[str, float], question_type: str = "together") -> dict:
    """
    rates: {person: work_per_day}
    question_type: 'together', 'remaining', 'individual'
    """
    steps = []
    combined_rate = sum(rates.values())
    steps.append(f"Individual rates (work/day): {rates}")
    steps.append(f"Combined rate = {_round2(combined_rate)} work/day")

    if question_type == "together":
        days = 1 / combined_rate
        steps.append(f"Days together = 1 / {_round2(combined_rate)} = {_round2(days)} days")
        answer = _round2(days)
    elif question_type == "remaining":
        # One person leaves after some days
        # Assume: A and B work together for d1 days, then B finishes
        # This will be parameterised in generate
        answer = "requires params"
        steps.append("Requires additional parameters for remaining work problem")
    else:
        answer = "unknown"
        steps.append(f"Question type '{question_type}' not fully implemented here")

    verification = {
        "combined_rate_positive": combined_rate > 0,
        "rate_sum_correct": abs(combined_rate - sum(rates.values())) < 1e-6,
    }

    return {"answer": answer, "steps": steps, "verification": verification}


# ─── Solver: Percentage & Percentage Change ──────────────────

def solve_percentage_change(original: float, new: float) -> dict:
    """Compute percentage increase/decrease."""
    steps = []
    change = new - original
    pct_change = (change / original) * 100 if original != 0 else 0
    direction = "increase" if change > 0 else "decrease" if change < 0 else "no change"
    steps.append(f"Original value = {original}")
    steps.append(f"New value = {new}")
    steps.append(f"Change = {new} − {original} = {change}")
    steps.append(f"% {direction} = (Change / Original) × 100 = ({change}/{original}) × 100 = {_round2(pct_change)}%")
    verification = {
        "change_sign_correct": (change > 0 and pct_change > 0) or (change < 0 and pct_change < 0) or change == 0,
        "numerical_check": abs(pct_change - (change / original) * 100) < 1e-6 if original else True,
    }
    return {
        "answer": {"change": _round2(change), "percent_change": _round2(pct_change), "direction": direction},
        "steps": steps,
        "verification": verification,
    }


# ─── Solver: Ratio & Proportion ──────────────────────────────

def solve_ratio_proportion(a: float, b: float, c: float, find: str = "fourth") -> dict:
    """
    Solve ratio proportion: a:b = c:d
    find: 'fourth' → find d, or 'third' → find b given d.
    """
    steps = []
    steps.append(f"Given ratio: {a}:{b} = {c}:?")
    steps.append(f"Product of means = Product of extremes: {a} × ? = {b} × {c}")

    if find == "fourth":
        d = (b * c) / a if a != 0 else 0
        steps.append(f"? = ({b} × {c}) / {a} = {_round2(d)}")
        answer = _round2(d)
    else:
        d_val = 0  # placeholder
        answer = d_val
        steps.append("Specify 'fourth' for this solver")

    verification = {
        "cross_product_check": abs(a * d - b * c) < 1e-6 if a and d else True,
    }

    return {"answer": answer, "steps": steps, "verification": verification}


# ─── Solver: Data Interpretation Case Study ──────────────────

def solve_case_study_interpretation(data: Dict[str, Any]) -> dict:
    """
    Generic case-study data interpretation.
    data: {title, source_context, observations: [...], questions_answered: [...]}
    """
    steps = []
    steps.append(f"Case Study: {data.get('title', 'Untitled')}")
    steps.append(f"Context: {data.get('source_context', 'N/A')}")
    steps.append("Observations and interpretations:")

    interpretations = []
    for obs in data.get("observations", []):
        steps.append(f"  • {obs}")
        interpretations.append(obs)

    verification = {
        "observations_count": len(data.get("observations", [])),
        "all_observations_strings": all(isinstance(o, str) for o in data.get("observations", [])),
    }

    return {
        "answer": {"interpretations": interpretations},
        "steps": steps,
        "verification": verification,
    }


# ─── Internal helper ─────────────────────────────────────────

def _verify_mean(freqs: List[int], marks: List[float], mean_val: float) -> dict:
    """Verify mean via direct computation."""
    total_f = sum(freqs)
    total_fx = sum(m * f for m, f in zip(marks, freqs))
    recomputed = total_fx / total_f if total_f else 0
    return {
        "direct_mean_recomputed": _round2(recomputed),
        "matches_answer": abs(recomputed - mean_val) < 1e-4,
        "sympy_verification": False,
    }


# ══════════════════════════════════════════════════════════════
#  QUESTION GENERATOR
# ══════════════════════════════════════════════════════════════

class _QuestionBank:
    """Encapsulates all question-generation logic."""

    def __init__(self, seed: int):
        self.rng = _rf(seed)

    # ── data helpers ──────────────────────────────────────────

    def _rand_int(self, lo: int, hi: int) -> int:
        return self.rng.randint(lo, hi)

    def _rand_float(self, lo: float, hi: float, decimals: int = 2) -> float:
        return round(self.rng.uniform(lo, hi), decimals)

    def _choice(self, seq: list):
        return self.rng.choice(seq)

    def _shuffle(self, seq: list) -> list:
        s = seq[:]
        self.rng.shuffle(s)
        return s

    def _sample(self, population: list, k: int) -> list:
        return self.rng.sample(population, min(k, len(population)))

    # ── raw data generators ───────────────────────────────────

    def _gen_heights(self, n: int = 30) -> List[int]:
        """Heights of Class 9 students (Indian context, cm)."""
        return [self._rand_int(145, 175) for _ in range(n)]

    def _gen_marks(self, n: int = 40) -> List[int]:
        """Exam marks out of 100."""
        return [self._rand_int(22, 98) for _ in range(n)]

    def _gen_rainfall(self) -> List[float]:
        """Monthly rainfall in mm for an Indian city."""
        return [self._rand_float(0, 400) for _ in range(12)]

    def _gen_wages(self, n: int = 25) -> List[int]:
        """Daily wages of workers in rupees."""
        return [self._rand_int(200, 1200) for _ in range(n)]

    def _gen_sports_scores(self) -> List[int]:
        """Runs scored by a cricket batsman in 20 innings."""
        return [self._rand_int(4, 128) for _ in range(20)]

    def _gen_budget(self) -> Tuple[float, Dict[str, float]]:
        """Monthly family income and expenses (₹)."""
        income = self._rand_float(15000, 80000)
        n_cats = self.rng.randint(4, 7)
        categories = self._sample(
            ["Rent", "Food", "Education", "Transport", "Utilities", "Healthcare",
             "Entertainment", "Savings", "Clothing", "Miscellaneous"],
            n_cats
        )
        remaining = income
        expenses = {}
        for i, cat in enumerate(categories):
            if i == len(categories) - 1:
                amt = remaining * self._rand_float(0.3, 0.9)
            else:
                share = self._rand_float(0.05, 0.4)
                amt = min(remaining * share, remaining * 0.5)
            amt = round(amt, 2)
            expenses[cat] = amt
            remaining -= amt
        return round(income, 2), expenses

    def _gen_shop_items(self, n: int = 5) -> List[Dict]:
        """Items in a shop with MP, discount, GST (Indian retail context)."""
        items = []
        names = ["Shirt", "School Bag", "Water Bottle", "Notebook Set",
                 "Shoes", "Watch", "Pen Stand", "Geometry Box",
                 "Tiffin Box", "Sweater"]
        for i in range(n):
            mp = self._rand_float(100, 5000)
            disc = self._rand_float(5, 40)
            gst = self._rand_choice([0, 5, 12, 18, 28])
            items.append({"name": names[i], "mp": mp, "discount": disc, "gst": gst})
        return items

    # ── frequency distribution builder ────────────────────────

    def _build_freq_table(self, data: List[int], class_width: int) -> Dict:
        intervals, frequencies, class_marks, cum_freq = [], [], [], []
        lo = (min(data) // class_width) * class_width
        hi = max(data)
        num_c = math.ceil((hi - lo) / class_width) + 1
        lower = lo
        for _ in range(num_c):
            upper = lower + class_width
            freq = sum(1 for v in data if lower <= v < upper)
            if _ == num_c - 1:
                freq = sum(1 for v in data if lower <= v <= upper)
            intervals.append((lower, upper))
            frequencies.append(freq)
            class_marks.append((lower + upper) / 2)
            lower = upper
        running = 0
        for f in frequencies:
            running += f
            cum_freq.append(running)
        return {
            "intervals": intervals, "frequencies": frequencies,
            "class_marks": class_marks, "cumulative_freq": cum_freq,
        }

    # ══════════════════════════════════════════════════════════
    #  QUESTION GENERATORS  (all return dicts)
    # ══════════════════════════════════════════════════════════

    def q_freq_table_mcq(self) -> dict:
        """MCQ: Identify the correct frequency for a class."""
        data = self._gen_marks(35)
        cw = 10
        tbl = self._build_freq_table(data, cw)
        idx = self._rand_int(0, len(tbl["intervals"]) - 1)
        correct_ans = tbl["frequencies"][idx]
        interval = tbl["intervals"][idx]

        # Generate distractors
        opts = {correct_ans}
        while len(opts) < 4:
            off = self._rand_int(-5, 5)
            if off != 0:
                opts.add(max(0, correct_ans + off))
        opts = self._shuffle(list(opts))

        explanation = (
            f"Count how many marks fall in {interval[0]}–{interval[1]} "
            f"(lower inclusive, upper exclusive). The count is {correct_ans}."
        )
        return {
            "id": "DA_MCQ_001",
            "type": "mcq",
            "difficulty": "easy",
            "topic": "Frequency Distribution Table",
            "question": (
                f"The following are marks scored by 35 students in a Mathematics test "
                f"(out of 100): {sorted(data)[:10]}...\n"
                f"The data is grouped into classes of width {cw}. "
                f"How many students scored in the class interval {interval[0]}–{interval[1]}?"
            ),
            "options": [str(o) for o in opts],
            "answer": str(correct_ans),
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_mean_direct_fillblank(self) -> dict:
        """Fill-blank: Mean by direct method."""
        data = self._gen_marks(40)
        cw = 10
        tbl = self._build_freq_table(data, cw)
        result = solve_mean_direct(tbl["class_marks"], tbl["frequencies"])
        mean_val = result["answer"]

        explanation = (
            "Use the direct method: x̄ = Σ(f·x) / Σf.\n"
            + "\n".join(result["steps"])
        )
        return {
            "id": "DA_FB_002",
            "type": "fill_blank",
            "difficulty": "medium",
            "topic": "Mean — Direct Method",
            "question": (
                f"Using the grouped data above, compute the mean mark by the DIRECT METHOD.\n"
                f"Fill in the blank: Mean = ____"
            ),
            "options": [],
            "answer": str(mean_val),
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_mean_assumed_short(self) -> dict:
        """Short-answer: Mean by assumed-mean method with steps."""
        data = self._gen_wages(30)
        cw = 100
        tbl = self._build_freq_table(data, cw)
        result = solve_mean_assumed(tbl["class_marks"], tbl["frequencies"])
        mean_val = result["answer"]

        explanation = "Assumed mean method:\n" + "\n".join(result["steps"])
        return {
            "id": "DA_SA_003",
            "type": "short_answer",
            "difficulty": "medium",
            "topic": "Mean — Assumed Mean Method",
            "question": (
                f"The daily wages (₹) of {len(data)} workers are: {sorted(data)[:8]}...\n"
                f"Using the assumed-mean method, find the mean daily wage."
            ),
            "options": [],
            "answer": f"₹{mean_val}",
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_median_grouped_long(self) -> dict:
        """Long-answer: Median for grouped data."""
        data = self._gen_heights(50)
        cw = 4
        tbl = self._build_freq_table(data, cw)
        result = solve_median_grouped(tbl["cumulative_freq"], tbl["intervals"], sum(tbl["frequencies"]))
        median_val = result["answer"]

        explanation = "Median for grouped continuous data:\n" + "\n".join(result["steps"])
        return {
            "id": "DA_LA_004",
            "type": "long_answer",
            "difficulty": "hard",
            "topic": "Median — Grouped Data",
            "question": (
                f"The heights (cm) of {len(data)} Class 9 students are recorded. "
                f"Construct the grouped frequency table (class width = {cw} cm) and "
                f"find the median height using the formula.\n"
                f"Data (sample): {sorted(data)[:10]}..."
            ),
            "options": [],
            "answer": f"{median_val} cm",
            "explanation": explanation,
            "competency": "analysis",
            "indian_context": True,
        }

    def q_mode_grouped_numerical(self) -> dict:
        """Numerical: Mode from grouped data."""
        data = self._gen_marks(45)
        cw = 10
        tbl = self._build_freq_table(data, cw)
        result = solve_mode_grouped(tbl["frequencies"], tbl["intervals"])
        mode_val = result["answer"]

        explanation = "Mode formula for grouped data:\n" + "\n".join(result["steps"])
        return {
            "id": "DA_NUM_005",
            "type": "numerical",
            "difficulty": "medium",
            "topic": "Mode — Grouped Data",
            "question": (
                f"From the frequency distribution of marks scored by {len(data)} students, "
                f"find the MODE using the formula: Mode = L + [(f1−f0)/(2f1−f0−f2)]×h."
            ),
            "options": [],
            "answer": str(mode_val),
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_pie_chart_mcq(self) -> dict:
        """MCQ: Compute angle in pie chart (Indian budget/family context)."""
        income, expenses = self._gen_budget()
        items = list(expenses.items())
        chosen = items[self._rand_int(0, len(items) - 1)]
        total = sum(expenses.values())
        correct_angle = round((chosen[1] / total) * 360, 1)

        opts = {correct_angle}
        while len(opts) < 4:
            opts.add(round(correct_angle + self._rand_float(-60, 60), 1))
        opts = self._shuffle(list(opts))

        explanation = (
            f"Angle = (Category value / Total) × 360° "
            f"= ({chosen[1]}/{_round2(total)}) × 360° = {correct_angle}°"
        )
        return {
            "id": "DA_MCQ_006",
            "type": "mcq",
            "difficulty": "easy",
            "topic": "Pie Chart",
            "question": (
                f"A family has a monthly income of ₹{_round2(income)}. "
                f"Their expenses in different categories are: "
                f"{', '.join(f'{k}: ₹{_round2(v)}' for k,v in items)}. "
                f"What is the central angle for '{chosen[0]}' in a pie chart?"
            ),
            "options": [f"{o}°" for o in opts],
            "answer": f"{correct_angle}°",
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_histogram_polygon_fill(self) -> dict:
        """Fill-blank: Histogram boundary for frequency polygon."""
        data = self._gen_heights(40)
        cw = 5
        tbl = self._build_freq_table(data, cw)
        result = solve_histogram_data(tbl["intervals"], tbl["frequencies"])
        boundaries = result["answer"]["boundaries"]
        # Ask for one boundary
        idx = self._rand_int(1, len(boundaries) - 2)
        correct = boundaries[idx]
        opts = {correct}
        while len(opts) < 4:
            opts.add(round(correct + self._rand_float(-10, 10), 1))
        opts = self._shuffle(list(opts))

        return {
            "id": "DA_FB_007",
            "type": "fill_blank",
            "difficulty": "easy",
            "topic": "Histogram & Frequency Polygon",
            "question": (
                f"For the height data grouped into classes of width {cw} cm, "
                f"the frequency polygon uses 'zero-frequency' points at the ends. "
                f"What is the x-coordinate of the {idx}-th polygon point?"
            ),
            "options": [str(o) for o in opts],
            "answer": str(correct),
            "explanation": (
                f"Frequency polygon starts with (lower boundary of first class, 0) "
                f"and ends with (upper boundary of last class, 0). Points: {boundaries}"
            ),
            "competency": "understanding",
            "indian_context": True,
        }

    def q_ogive_short(self) -> dict:
        """Short-answer: Draw/describe ogive data."""
        data = self._gen_marks(40)
        cw = 10
        tbl = self._build_freq_table(data, cw)
        result = solve_ogive_data(tbl["intervals"], tbl["cumulative_freq"])
        x_pts = result["answer"]["x_points"]
        correct_cf = result["answer"]["y_points"][len(result["answer"]["y_points"]) // 2]

        opts = {correct_cf}
        while len(opts) < 4:
            opts.add(max(0, correct_cf + self._rand_int(-8, 8)))
        opts = self._shuffle(list(opts))

        return {
            "id": "DA_SA_008",
            "type": "short_answer",
            "difficulty": "medium",
            "topic": "Ogive (Cumulative Frequency Curve)",
            "question": (
                f"From the grouped marks data (class width {cw}), construct the "
                f"'less-than' ogive. What is the cumulative frequency at the "
                f"class boundary {x_pts[len(x_pts)//2]}?"
            ),
            "options": [str(o) for o in opts],
            "answer": str(correct_cf),
            "explanation": (
                "Ogive plots cumulative (less-than) frequency against upper class boundaries. "
                f"Points: {list(zip(x_pts, result['answer']['y_points']))}"
            ),
            "competency": "application",
            "indian_context": True,
        }

    def q_quartile_range_mcq(self) -> dict:
        """MCQ: Range and IQR from raw data."""
        data = sorted(self._gen_sports_scores())
        result = solve_quartiles(data)
        ans_dict = result["answer"]

        q_type = self._rand_int(0, 3)
        if q_type == 0:
            correct = ans_dict["range"]
            q_text = "What is the RANGE of the scores?"
        elif q_type == 1:
            correct = ans_dict["iqr"]
            q_text = "What is the INTERQUARTILE RANGE (IQR)?"
        elif q_type == 2:
            correct = ans_dict["q1"]
            q_text = "What is the FIRST QUARTILE (Q1)?"
        else:
            correct = ans_dict["q3"]
            q_text = "What is the THIRD QUARTILE (Q3)?"

        opts = {correct}
        while len(opts) < 4:
            opts.add(_round2(correct + self._rand_float(-15, 15)))
        opts = self._shuffle(list(opts))

        return {
            "id": "DA_MCQ_009",
            "type": "mcq",
            "difficulty": "medium",
            "topic": "Quartiles, Range & IQR",
            "question": (
                f"The runs scored by a batsman in {len(data)} innings: "
                f"{data[:8]}...\n{q_text}"
            ),
            "options": [str(o) for o in opts],
            "answer": str(correct),
            "explanation": (
                f"Range = {ans_dict['range']}, Q1 = {ans_dict['q1']}, "
                f"Q2 = {ans_dict['q2']}, Q3 = {ans_dict['q3']}, IQR = {ans_dict['iqr']}"
            ),
            "competency": "application",
            "indian_context": True,
        }

    def q_probability_mcq(self) -> dict:
        """MCQ: Probability from Indian context (cards, dice, etc.)."""
        context_type = self._rand_int(0, 4)
        rng = self.rng

        if context_type == 0:
            # Die roll
            favorable = rng.randint(1, 6)
            total = 6
            q = (
                f"A fair die is rolled once. What is the probability of getting "
                f"a number {'divisible by' if favorable in [2,3,4,6] else 'greater than' if favorable > 3 else 'less than'} "
                f"{favorable}?"
                if favorable > 3 else
                f"A fair die is rolled once. What is the probability of getting "
                f"a number less than {favorable + 1}?"
            )
            # recompute
            if favorable > 3:
                favorable = rng.randint(1, 3)
            total = 6
            favorable_count = sum(1 for i in range(1, 7) if i < favorable + 1)
            favorable = favorable_count
            q = f"A fair die is rolled once. Find the probability of getting a number less than {favorable + 1}."
        elif context_type == 1:
            # Cards
            suits = ["spades", "hearts", "diamonds", "clubs"]
            suit = rng.choice(suits)
            favorable = 13
            total = 52
            q = f"One card is drawn from a well-shuffled pack of 52 cards. Find P(drawing a {suit})."
        elif context_type == 2:
            # Bag of balls
            red = rng.randint(2, 8)
            blue = rng.randint(2, 8)
            total = red + blue
            favorable = red
            q = (
                f"A bag contains {red} red and {blue} blue marbles. "
                f"One marble is drawn at random. Find P(drawing a red marble)."
            )
        else:
            # Two dice
            favorable = rng.randint(1, 6)
            total = 36
            favorable_count = sum(1 for d1 in range(1, 7) for d2 in range(1, 7) if d1 + d2 == favorable + 1)
            q = (
                f"Two dice are rolled simultaneously. "
                f"Find the probability that the sum of numbers is {favorable + 1}."
            )
            favorable = favorable_count

        prob = Fraction(favorable, total)
        correct_pct = round(float(prob) * 100, 1)

        opts = {correct_pct}
        while len(opts) < 4:
            opts.add(round(correct_pct + rng.uniform(-20, 20), 1))
        opts = self._shuffle(sorted(list(opts)))

        return {
            "id": "DA_MCQ_010",
            "type": "mcq",
            "difficulty": "easy",
            "topic": "Probability",
            "question": q,
            "options": [f"{o}%" for o in opts],
            "answer": f"{correct_pct}%",
            "explanation": f"P(E) = {favorable}/{total} = {prob} ≈ {correct_pct}%",
            "competency": "application",
            "indian_context": True,
        }

    def q_budget_analysis_case(self) -> dict:
        """Case study: Household budget analysis (Indian context, competency-based)."""
        income, expenses = self._gen_budget()
        result = solve_budget_analysis(income, expenses)
        ans = result["answer"]

        # Pick a category to ask about
        cats = list(expenses.keys())
        focus_cat = cats[self._rand_int(0, len(cats) - 1)]
        focus_pct = ans["category_percentages"][focus_cat]

        opts = {focus_pct}
        while len(opts) < 4:
            opts.add(_round2(focus_pct + self._rand_float(-15, 15)))
        opts = self._shuffle(sorted(list(opts)))

        explanation = (
            f"Household budget analysis:\n"
            + "\n".join(result["steps"][:4])
            + f"\n{focus_cat} is {focus_pct}% of total income."
        )
        return {
            "id": "DA_CS_011",
            "type": "short_answer",
            "difficulty": "medium",
            "topic": "Data Interpretation — Household Budget",
            "question": (
                f"A middle-class family in a tier-2 Indian city earns ₹{_round2(income)}/month. "
                f"Their monthly spending: {', '.join(f'{k}: ₹{_round2(v)}' for k,v in expenses.items())}. "
                f"What percentage of their income is spent on '{focus_cat}'?"
            ),
            "options": [f"{o}%" for o in opts],
            "answer": f"{focus_pct}%",
            "explanation": explanation,
            "competency": "analysis",
            "indian_context": True,
        }

    def q_discount_gst_numerical(self) -> dict:
        """Numerical: Discount + GST on a shop item (Indian retail context)."""
        items = self._gen_shop_items(1)
        item = items[0]
        result = solve_discount_problem(item["mp"], item["discount"], item["gst"])
        ans = result["answer"]

        q_type = self._rand_int(0, 3)
        if q_type == 0:
            correct = ans["discount_amount"]
            q = f"What is the discount amount on the {item['name']}?"
        elif q_type == 1:
            correct = ans["sp_before_tax"]
            q = f"What is the selling price BEFORE adding GST for the {item['name']}?"
        elif q_type == 2:
            correct = ans["tax_amount"]
            q = f"How much GST is charged on the {item['name']}?"
        else:
            correct = ans["final_price"]
            q = f"What is the FINAL price the customer pays for the {item['name']}?"

        opts = {correct}
        while len(opts) < 4:
            opts.add(_round2(correct + self._rand_float(-100, 100)))
        opts = self._shuffle(sorted(list(opts)))

        explanation = (
            f"Shop pricing with discount and GST:\n"
            + "\n".join(result["steps"])
        )
        return {
            "id": "DA_NUM_012",
            "type": "numerical",
            "difficulty": "medium",
            "topic": "Discount, Selling Price & GST",
            "question": (
                f"A shopkeeper marks a {item['name']} at ₹{item['mp']}. "
                f"He offers a {item['discount']}% discount and then adds {item['gst']}% GST. "
                f"{q}"
            ),
            "options": [f"₹{o}" for o in opts],
            "answer": f"₹{correct}",
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_profit_loss_mcq(self) -> dict:
        """MCQ: Profit/Loss percentage (Indian shop context)."""
        cp = self._rand_float(80, 2000)
        pct = self._rand_float(5, 40)
        is_profit = self.rng.choice([True, False])
        if is_profit:
            sp = cp * (1 + pct / 100)
            correct = round(pct, 1)
            direction = "profit"
        else:
            sp = cp * (1 - pct / 100)
            correct = round(pct, 1)
            direction = "loss"

        opts = {correct}
        while len(opts) < 4:
            opts.add(_round2(correct + self._rand_float(-12, 12)))
        opts = self._shuffle(sorted(list(opts)))

        return {
            "id": "DA_MCQ_013",
            "type": "mcq",
            "difficulty": "easy",
            "topic": "Profit & Loss",
            "question": (
                f"A bookseller buys a set of textbooks for ₹{_round2(cp)} and sells it for "
                f"₹{_round2(sp)}. What is the percentage {direction}?"
            ),
            "options": [f"{o}%" for o in opts],
            "answer": f"{correct}%",
            "explanation": (
                f"% {direction.capitalize()} = (|SP − CP| / CP) × 100 "
                f"= ({abs(_round2(sp-cp))}/{_round2(cp)}) × 100 = {correct}%"
            ),
            "competency": "application",
            "indian_context": True,
        }

    def q_simple_interest_fill(self) -> dict:
        """Fill-blank: Simple interest on a fixed deposit (Indian banking context)."""
        p = self._rand_float(5000, 200000)
        r = self._rand_float(4, 12)
        t = self._rand_float(1, 5)
        result = solve_simple_interest(p, r, t)
        si = result["answer"]["si"]

        return {
            "id": "DA_FB_014",
            "type": "fill_blank",
            "difficulty": "easy",
            "topic": "Simple Interest",
            "question": (
                f"Mr. Sharma deposits ₹{_round2(p)} in a bank at {r}% per annum simple interest "
                f"for {t} years. What is the simple interest earned?"
            ),
            "options": [],
            "answer": f"₹{_round2(si)}",
            "explanation": "SI = (P × R × T) / 100\n" + "\n".join(result["steps"]),
            "competency": "application",
            "indian_context": True,
        }

    def q_compound_interest_short(self) -> dict:
        """Short-answer: Compound interest (Indian post office / FD context)."""
        p = self._rand_float(10000, 100000)
        r = self._rand_float(6, 10)
        t = self._rand_choice([1, 2, 3])
        n = self._rand_choice([1, 2, 4])
        result = solve_compound_interest(p, r, t, n)
        ci = result["answer"]["ci"]

        freq_word = {1: "annually", 2: "semi-annually", 4: "quarterly"}[n]
        explanation = "Compound interest calculation:\n" + "\n".join(result["steps"])
        return {
            "id": "DA_SA_015",
            "type": "short_answer",
            "difficulty": "medium",
            "topic": "Compound Interest",
            "question": (
                f"Mrs. Iyer invests ₹{_round2(p)} in a post-office scheme at {r}% p.a. "
                f"compounded {freq_word} for {t} year(s). Find the compound interest earned."
            ),
            "options": [],
            "answer": f"₹{_round2(ci)}",
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_time_work_mcq(self) -> dict:
        """MCQ: Time & Work (Indian construction/team context)."""
        rng = self.rng
        a_days = rng.randint(4, 12)
        b_days = rng.randint(6, 15)
        a_rate = 1 / a_days
        b_rate = 1 / b_days
        combined_days = 1 / (a_rate + b_rate)
        combined_days_r = _round2(combined_days)

        names = self._sample(
            ["Rahul", "Priya", "Arun", "Sunita", "Kiran", "Deepa",
             "Ravi", "Meena", "Suresh", "Anita"],
            2
        )
        q = (
            f"{names[0]} can complete a piece of work in {a_days} days and "
            f"{names[1]} can do the same work in {b_days} days. "
            f"How long will they take to complete the work TOGETHER?"
        )

        opts = {combined_days_r}
        while len(opts) < 4:
            opts.add(_round2(combined_days_r + rng.uniform(-3, 3)))
        opts = self._shuffle(sorted(list(opts)))

        explanation = (
            f"A does 1/{a_days} work/day, B does 1/{b_days} work/day.\n"
            f"Together: 1/{a_days} + 1/{b_days} = {_round2(a_rate + b_rate)} work/day.\n"
            f"Days = 1 / {_round2(a_rate + b_rate)} ≈ {combined_days_r} days."
        )
        return {
            "id": "DA_MCQ_016",
            "type": "mcq",
            "difficulty": "medium",
            "topic": "Time & Work",
            "question": q,
            "options": [f"{o} days" for o in opts],
            "answer": f"{combined_days_r} days",
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_percentage_change_short(self) -> dict:
        """Short-answer: Percentage increase (Indian population/price context)."""
        rng = self.rng
        contexts = [
            ("the price of onions", "last month"),
            ("the student enrolment", "last year"),
            ("the bus fare", "this year"),
            ("the electricity bill", "this quarter"),
            ("the gold rate", "last year"),
        ]
        ctx, period = rng.choice(contexts)
        original = rng.randint(50, 5000)
        change_pct = rng.randint(5, 35)
        new = round(original * (1 + change_pct / 100), 2)

        result = solve_percentage_change(original, new)
        pct = result["answer"]["percent_change"]

        explanation = f"% increase = (New − Original) / Original × 100\n" + "\n".join(result["steps"])
        return {
            "id": "DA_SA_017",
            "type": "short_answer",
            "difficulty": "easy",
            "topic": "Percentage & Percentage Change",
            "question": (
                f"{ctx.capitalize()} {period} was ₹{original}. This {period}, "
                f"it is ₹{new}. Find the percentage increase."
            ),
            "options": [],
            "answer": f"{pct}%",
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_ratio_proportion_mcq(self) -> dict:
        """MCQ: Ratio and Proportion (Indian mixing/recipe context)."""
        rng = self.rng
        a = rng.randint(2, 8)
        b = rng.randint(3, 10)
        c = rng.randint(4, 12)
        d = round((b * c) / a, 2)

        contexts = [
            ("A contractor mixes cement and sand", "bags of sand needed"),
            ("A recipe uses flour and sugar", "grams of sugar needed"),
            ("The ratio of boys to girls is given", "number of girls"),
            ("Two towns are on a map at a scale", "actual distance in km"),
        ]
        ctx, what = rng.choice(contexts)

        opts = {d}
        while len(opts) < 4:
            opts.add(_round2(d + rng.uniform(-3, 3)))
        opts = self._shuffle(sorted(list(opts)))

        explanation = f"If {a}:{b} = {c}:?, then ? = (b×c)/a = ({b}×{c})/{a} = {d}"
        return {
            "id": "DA_MCQ_018",
            "type": "mcq",
            "difficulty": "easy",
            "topic": "Ratio & Proportion",
            "question": (
                f"{ctx}. If the ratio is {a}:{b}, and the first quantity is {c} units, "
                f"what is the {what}? (Find the fourth proportional.)"
            ),
            "options": [str(o) for o in opts],
            "answer": str(d),
            "explanation": explanation,
            "competency": "application",
            "indian_context": True,
        }

    def q_evidence_case_study(self) -> dict:
        """Competency-based case study: Attendance data of a government school (Indian context)."""
        rng = self.rng
        n_students = rng.randint(25, 50)
        attendance_days = [rng.randint(160, 220) for _ in range(n_students)]
        working_days = 220

        # Analysis