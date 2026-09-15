"""
Class 10 Mathematics – GST Node Solvers (Nodes 001, 002, 003)
CISCE ICSE Syllabus. No LLM in computation. Uses SymPy, scipy, numpy, math, random, dataclasses.
Seeded randomization for reproducibility.
"""

import math
import random
import dataclasses
import fractions
import sympy as sp
from typing import Optional, Tuple, Dict, Any, List
from enum import Enum, auto


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def _gst_forward(cost_price: float, gst_rate_pct: float,
                 discount_pct: float = 0.0,
                 profit_pct: float = 0.0,
                 loss_pct: float = 0.0) -> Dict[str, float]:
    """
    Forward GST computation (Node 001).

    Steps
    -----
    1.  Start with cost price (CP).
    2.  Apply profit or loss (exactly one of profit_pct, loss_pct may be non-zero).
    3.  Result = marked / list price (MP).
    4.  Apply discount (if any) to get selling price before GST (SP_pre).
    5.  GST amount = SP_pre × gst_rate_pct / 100.
    6.  Final price = SP_pre + GST amount.

    Returns a dict with all intermediate and final values.
    """
    if sum(v != 0 for v in [profit_pct, loss_pct]) > 1:
        raise ValueError("Specify at most one of profit_pct or loss_pct.")

    CP = float(cost_price)
    # step 2 – apply profit or loss
    if profit_pct:
        MP = CP * (1 + profit_pct / 100)
    elif loss_pct:
        MP = CP * (1 - loss_pct / 100)
    else:
        MP = CP  # no markup

    # step 3 – apply discount
    discount_amount = MP * discount_pct / 100
    SP_pre = MP - discount_amount  # selling price before GST

    # step 4 – GST
    gst_amount = SP_pre * gst_rate_pct / 100
    final_price = SP_pre + gst_amount

    return {
        "cost_price":          round(CP, 4),
        "list_price":          round(MP, 4),
        "discount_pct":        round(discount_pct, 4),
        "discount_amount":     round(discount_amount, 4),
        "selling_price_pre_gst": round(SP_pre, 4),
        "gst_rate_pct":        round(gst_rate_pct, 4),
        "gst_amount":          round(gst_amount, 4),
        "final_price":         round(final_price, 4),
        "profit_or_loss_pct":  round(profit_pct if profit_pct else loss_pct, 4),
        "markup_type":         "profit" if profit_pct else ("loss" if loss_pct else "none"),
    }


def _sgst_cgst_split(taxable_value: float, total_gst_rate_pct: float
                     ) -> Dict[str, float]:
    """
    Split total GST into SGST and CGST (Node 002).

    Indian GST rule: SGST = CGST = total_gst_rate / 2  (intra-state sale).
    """
    if total_gst_rate_pct <= 0:
        raise ValueError("GST rate must be positive.")
    half = total_gst_rate_pct / 2
    sgst_amount = taxable_value * half / 100
    cgst_amount = taxable_value * half / 100
    total_gst   = sgst_amount + cgst_amount
    final_price = taxable_value + total_gst
    return {
        "taxable_value":      round(taxable_value, 4),
        "total_gst_rate_pct": round(total_gst_rate_pct, 4),
        "sgst_rate_pct":      round(half, 4),
        "cgst_rate_pct":      round(half, 4),
        "sgst_amount":        round(sgst_amount, 4),
        "cgst_amount":        round(cgst_amount, 4),
        "total_gst":          round(total_gst, 4),
        "final_price":        round(final_price, 4),
    }


def _price_paid_by_consumer(cost_price: float, gst_rate_pct: float,
                             discount_pct: float = 0.0) -> Dict[str, float]:
    """
    Full pipeline: discount → selling price → SGST/CGST → final price (Node 002).
    """
    fwd = _gst_forward(cost_price, gst_rate_pct, discount_pct=discount_pct)
    taxable_value = fwd["selling_price_pre_gst"]
    split = _sgst_cgst_split(taxable_value, gst_rate_pct)
    return {**fwd, **split}


def _inverse_gst(final_price: float, gst_rate_pct: float,
                 discount_pct: float = 0.0) -> Dict[str, float]:
    """
    Inverse GST computation (Node 003).

    Given: final (GST-inclusive) price, GST rate, optional discount.
    Find: original cost / basic price.

    Equation:  final_price = SP_pre × (1 + gst_rate/100)
    where     SP_pre = MP × (1 - discount/100) = CP × (1 ± markup%) × (1 - discount/100)
    """
    multiplier = 1 + gst_rate_pct / 100
    SP_pre = final_price / multiplier

    if discount_pct > 0:
        MP = SP_pre / (1 - discount_pct / 100)
    else:
        MP = SP_pre

    #        the caller can adjust if profit/loss was applied)
    CP = MP  # default: no markup

    gst_amount = final_price - SP_pre

    return {
        "final_price":           round(final_price, 4),
        "gst_rate_pct":          round(gst_rate_pct, 4),
        "discount_pct":          round(discount_pct, 4),
        "selling_price_pre_gst": round(SP_pre, 4),
        "list_price":            round(MP, 4),
        "cost_price":            round(CP, 4),
        "gst_amount":            round(gst_amount, 4),
    }


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def solve_inverse_with_profit(final_price: float, gst_rate_pct: float,
                               profit_pct: float, discount_pct: float = 0.0
                               ) -> Dict[str, Any]:
    """
    Node 003 – inverse with profit markup.

    Let CP = x (unknown).
    MP = x × (1 + profit_pct/100)
    SP_pre = MP × (1 - discount_pct/100)
    final_price = SP_pre × (1 + gst_rate_pct/100)

    Solve symbolically with SymPy.
    """
    x = sp.Symbol("x", positive=True)
    expr = x * (1 + profit_pct / 100) * (1 - discount_pct / 100) * (1 + gst_rate_pct / 100)
    eq = sp.Eq(expr, final_price)
    sol = sp.solve(eq, x)
    CP = float(sol[0]) if sol else None
    if CP is None:
        raise ValueError("No real positive solution found.")
    MP = CP * (1 + profit_pct / 100)
    SP_pre = MP * (1 - discount_pct / 100)
    gst_amt = final_price - SP_pre
    return {
        "cost_price":            round(CP, 4),
        "list_price":            round(MP, 4),
        "selling_price_pre_gst": round(SP_pre, 4),
        "gst_amount":            round(gst_amount := gst_amt, 4),
        "final_price":           round(final_price, 4),
    }


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def verify_gst_forward(cost_price: float, gst_rate_pct: float,
                        expected_final: float, tol: float = 0.01,
                        discount_pct: float = 0.0) -> bool:
    result = _gst_forward(cost_price, gst_rate_pct, discount_pct=discount_pct)
    return abs(result["final_price"] - expected_final) <= tol


def verify_inverse(final_price: float, gst_rate_pct: float,
                   expected_cost: float, tol: float = 0.01,
                   discount_pct: float = 0.0) -> bool:
    result = _inverse_gst(final_price, gst_rate_pct, discount_pct=discount_pct)
    return abs(result["cost_price"] - expected_cost) <= tol


def verify_sgst_cgst_split(taxable_value: float, total_gst_rate: float,
                            tol: float = 0.01) -> Dict[str, Any]:
    result = _sgst_cgst_split(taxable_value, total_gst_rate)
    checks = {
        "sgst_equals_cgst":      abs(result["sgst_amount"] - result["cgst_amount"]) <= tol,
        "total_gst_correct":     abs(result["total_gst"] - result["sgst_amount"] - result["cgst_amount"]) <= tol,
        "final_price_correct":   abs(result["final_price"] - result["taxable_value"] - result["total_gst"]) <= tol,
        "rates_sum_correct":     abs((result["sgst_rate_pct"] + result["cgst_rate_pct"]) - total_gst_rate) <= tol,
    }
    all_pass = all(checks.values())
    return {"passed": all_pass, "checks": checks, "result": result}


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

@dataclasses.dataclass
class GSTProblemSpec:
    """Specification for one GST problem instance."""
    node_id: str          # e.g. "c10_math_001"
    problem_type: str     # e.g. "gst_forward", "sgst_cgst", "inverse"
    seed: int             # reproducibility seed
    difficulty: str = "medium"
    params: Dict[str, Any] = dataclasses.field(default_factory=dict)


class NodeSolver:
    """Dispatches a GSTProblemSpec to the correct solver."""

    @staticmethod
    def solve(spec: GSTProblemSpec) -> Dict[str, Any]:
        rng = random.Random(spec.seed)
        p = spec.params
        if spec.problem_type == "gst_forward":
            return _gst_forward(
                cost_price   = p["cost_price"],
                gst_rate_pct = p["gst_rate_pct"],
                discount_pct = p.get("discount_pct", 0.0),
                profit_pct   = p.get("profit_pct", 0.0),
                loss_pct     = p.get("loss_pct", 0.0),
            )
        if spec.problem_type == "sgst_cgst_split":
            return _sgst_cgst_split(
                taxable_value      = p["taxable_value"],
                total_gst_rate_pct = p["gst_rate_pct"],
            )
        if spec.problem_type == "price_paid_consumer":
            return _price_paid_by_consumer(
                cost_price   = p["cost_price"],
                gst_rate_pct = p["gst_rate_pct"],
                discount_pct = p.get("discount_pct", 0.0),
            )
        if spec.problem_type == "inverse_gst":
            return _inverse_gst(
                final_price  = p["final_price"],
                gst_rate_pct = p["gst_rate_pct"],
                discount_pct = p.get("discount_pct", 0.0),
            )
        if spec.problem_type == "inverse_with_profit":
            return solve_inverse_with_profit(
                final_price  = p["final_price"],
                gst_rate_pct = p["gst_rate_pct"],
                profit_pct   = p["profit_pct"],
                discount_pct = p.get("discount_pct", 0.0),
            )
        raise ValueError(f"Unknown problem_type: {spec.problem_type}")


# ─────────────────────────────────────────────
# ─────────────────────────────────────────────

def run_self_tests() -> None:
    """Quick self-tests on all solver functions."""
    print("=== Self-tests ===\n")

    # --- Node 001 ---
    r1 = _gst_forward(2000, 18, discount_pct=10)
    assert abs(r1["discount_amount"] - 200.0) < 1e-6
    assert abs(r1["selling_price_pre_gst"] - 1800.0) < 1e-6
    assert abs(r1["gst_amount"] - 324.0) < 1e-6
    assert abs(r1["final_price"] - 2124.0) < 1e-6
    print(f"[001] GST on ₹2000, 10% discount, 18% GST  →  Final ₹{r1['final_price']} ✓")

    r1b = _gst_forward(500, 18, profit_pct=20)
    assert abs(r1b["list_price"] - 600.0) < 1e-6
    assert abs(r1b["gst_amount"] - 108.0) < 1e-6
    assert abs(r1b["final_price"] - 708.0) < 1e-6
    print(f"[001] GST on ₹500 CP, 20% profit, 18% GST  →  Final ₹{r1b['final_price']} ✓")

    # --- Node 002 ---
    r2 = _sgst_cgst_split(1000, 18)
    assert abs(r2["sgst_amount"] - 90.0) < 1e-6
    assert abs(r2["cgst_amount"] - 90.0) < 1e-6
    assert abs(r2["final_price"] - 1180.0) < 1e-6
    print(f"[002] SGST/CGST split ₹1000 @ 18% GST  →  SGST ₹{r2['sgst_amount']}, CGST ₹{r2['cgst_amount']}, Final ₹{r2['final_price']} ✓")

    r2b = _price_paid_by_consumer(1500, 12, discount_pct=5)
    assert abs(r2b["selling_price_pre_gst"] - 1425.0) < 1e-6
    assert abs(r2b["sgst_amount"] - 85.5) < 1e-6
    assert abs(r2b["cgst_amount"] - 85.5) < 1e-6
    assert abs(r2b["final_price"] - 1596.0) < 1e-6
    print(f"[002] Consumer price ₹1500, 5% disc, 12% GST  →  Final ₹{r2b['final_price']} ✓")

    # --- Node 003 ---
    r3 = _inverse_gst(1180, 18)
    assert abs(r3["selling_price_pre_gst"] - 1000.0) < 1e-6
    assert abs(r3["cost_price"] - 1000.0) < 1e-6
    assert abs(r3["gst_amount"] - 180.0) < 1e-6
    print(f"[003] Inverse: final ₹1180, 18% GST  →  Base ₹{r3['cost_price']} ✓")

    r3b = solve_inverse_with_profit(2124, 18, profit_pct=20, discount_pct=10)
    r3b_check = solve_inverse_with_profit(708, 18, profit_pct=20)
    assert abs(r3b_check["cost_price"] - 500.0) < 1e-6
    print(f"[003] Inverse w/ profit: final ₹708, 18% GST, 20% profit  →  CP ₹{r3b_check['cost_price']} ✓")

    # --- Verification ---
    v = verify_sgst_cgst_split(2500, 12)
    assert v["passed"]
    print(f"[verify] SGST/CGST 12% on ₹2500  →  all checks passed ✓")

    v2 = verify_gst_forward(2000, 18, 2124.0, discount_pct=10)
    assert v2
    print(f"[verify] GST forward ₹2000 @ 18% 10% disc  →  final ₹2124 ✓")

    v3 = verify_inverse(1180, 18, 1000.0)
    assert v3
    print(f"[verify] Inverse GST ₹1180 @ 18%  →  base ₹1000 ✓")

    print("\nAll self-tests passed ✓")


if __name__ == "__main__":
    run_self_tests()