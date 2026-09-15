"""
Class 10 Mathematics – GST Question Generator (Nodes 001, 002, 003)
CISCE ICSE Syllabus. Deterministic, seeded. Step-by-step solutions + verification.
"""

import math
import random
import dataclasses
from typing import Optional, Dict, Any, List, Tuple
from fractions import Fraction

# ── import solver ──────────────────────────────────────────────────────────
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from class10_maths_solver import (
    _gst_forward, _sgst_cgst_split, _price_paid_by_consumer,
    _inverse_gst, solve_inverse_with_profit,
    verify_gst_forward, verify_inverse, verify_sgst_cgst_split,
    NodeSolver, GSTProblemSpec,
)

# ═══════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

@dataclasses.dataclass
class GSTQuestion:
    node_id: str
    problem_type: str
    seed: int
    difficulty: str
    question_text: str
    given: Dict[str, Any]
    answer: Dict[str, Any]
    steps: List[str]
    verification: Dict[str, Any]
    competency_check: str


# ═══════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _rng(seed: int) -> random.Random:
    return random.Random(seed)


def _rand_cost_price(rng: random.Random) -> float:
    """Return a realistic cost price in ₹500 – ₹15,000."""
    return float(rng.randint(500, 15000))


def _rand_gst_rate(rng: random.Random) -> float:
    """Return a common Indian GST rate."""
    rates = [5, 12, 18, 28]
    return float(rng.choice(rates))


def _rand_discount(rng: random.Random) -> float:
    """Return a discount percentage in [5, 30]."""
    return float(rng.randint(5, 30))


def _rand_profit(rng: random.Random) -> float:
    """Return a profit percentage in [10, 50]."""
    return float(rng.randint(10, 50))


def _rand_loss(rng: random.Random) -> float:
    """Return a loss percentage in [5, 20]."""
    return float(rng.randint(5, 20))


# ═══════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def _steps_forward(r: Dict) -> List[str]:
    steps = [
        f"1. Cost Price (CP) = ₹{r['cost_price']:.2f}",
    ]
    if r["markup_type"] == "profit":
        steps.append(
            f"2. Profit = {r['profit_or_loss_pct']}% of CP = "
            f"₹{r['cost_price'] * r['profit_or_loss_pct'] / 100:.2f}"
        )
        steps.append(
            f"3. List / Marked Price (MP) = CP + Profit = "
            f"₹{r['cost_price']:.2f} + ₹{r['cost_price'] * r['profit_or_loss_pct'] / 100:.2f} = ₹{r['list_price']:.2f}"
        )
    elif r["markup_type"] == "loss":
        steps.append(
            f"2. Loss = {r['profit_or_loss_pct']}% of CP = "
            f"₹{r['cost_price'] * r['profit_or_loss_pct'] / 100:.2f}"
        )
        steps.append(
            f"3. List Price (MP) = CP − Loss = "
            f"₹{r['cost_price']:.2f} − ₹{r['cost_price'] * r['profit_or_loss_pct'] / 100:.2f} = ₹{r['list_price']:.2f}"
        )
    else:
        steps.append(f"2. No markup → List Price (MP) = CP = ₹{r['list_price']:.2f}")

    if r["discount_pct"] > 0:
        steps.append(
            f"4. Discount = {r['discount_pct']}% of MP = "
            f"₹{r['list_price'] * r['discount_pct'] / 100:.2f}"
        )
        steps.append(
            f"5. Selling Price before GST = MP − Discount = "
            f"₹{r['list_price']:.2f} − ₹{r['list_price'] * r['discount_pct'] / 100:.2f} = ₹{r['selling_price_pre_gst']:.2f}"
        )
    else:
        steps.append(
            f"4. No discount → Selling Price before GST = MP = ₹{r['selling_price_pre_gst']:.2f}"
        )

    steps.append(
        f"6. GST = {r['gst_rate_pct']}% of Selling Price = "
        f"₹{r['selling_price_pre_gst']:.2f} × {r['gst_rate_pct']}/100 = ₹{r['gst_amount']:.2f}"
    )
    steps.append(
        f"7. Final Price = Selling Price + GST = "
        f"₹{r['selling_price_pre_gst']:.2f} + ₹{r['gst_amount']:.2f} = ₹{r['final_price']:.2f}"
    )
    return steps


def _steps_sgst_cgst(r: Dict) -> List[str]:
    return [
        f"1. Taxable value (Selling Price before GST) = ₹{r['taxable_value']:.2f}",
        f"2. Total GST rate = {r['total_gst_rate_pct']}%",
        f"3. For intra-state sale: SGST = CGST = {r['total_gst_rate_pct']}% / 2 = {r['sgst_rate_pct']:.1f}% each",
        f"4. SGST amount = ₹{r['taxable_value']:.2f} × {r['sgst_rate_pct']:.1f}/100 = ₹{r['sgst_amount']:.2f}",
        f"5. CGST amount = ₹{r['taxable_value']:.2f} × {r['cgst_rate_pct']:.1f}/100 = ₹{r['cgst_amount']:.2f}",
        f"6. Total GST = SGST + CGST = ₹{r['sgst_amount']:.2f} + ₹{r['cgst_amount']:.2f} = ₹{r['total_gst']:.2f}",
        f"7. Price paid by consumer = Taxable value + Total GST = ₹{r['taxable_value']:.2f} + ₹{r['total_gst']:.2f} = ₹{r['final_price']:.2f}",
    ]


def _steps_inverse(r: Dict) -> List[str]:
    steps = [
        f"1. Given: Final Price (GST-inclusive) = ₹{r['final_price']:.2f}",
        f"2. GST rate = {r['gst_rate_pct']}%",
        f"3. Let Selling Price before GST = SP.",
        f"4. Final Price = SP × (1 + {r['gst_rate_pct']}/100)",
        f"   ∴ SP = Final Price / (1 + {r['gst_rate_pct']}/100) = ₹{r['final_price']:.2f} / {(1 + r['gst_rate_pct']/100):.4f} = ₹{r['selling_price_pre_gst']:.2f}",
    ]
    if r["discount_pct"] > 0:
        steps.append(
            f"5. Discount was {r['discount_pct']}% on List Price (MP).\n"
            f"   Selling Price = MP × (1 − {r['discount_pct']}/100)\n"
            f"   ∴ MP = SP / (1 − {r['discount_pct']}/100) = ₹{r['selling_price_pre_gst']:.2f} / {(1 - r['discount_pct']/100):.4f} = ₹{r['list_price']:.2f}"
        )
    else:
        steps.append(f"5. No discount → List Price = Selling Price = ₹{r['list_price']:.2f}")

    steps.append(
        f"6. GST Amount = Final Price − Selling Price before GST = "
        f"₹{r['final_price']:.2f} − ₹{r['selling_price_pre_gst']:.2f} = ₹{r['gst_amount']:.2f}"
    )
    return steps


def _steps_inverse_profit(r: Dict) -> List[str]:
    steps = [
        f"1. Given: Final Price = ₹{r['final_price']:.2f}, GST rate = {r['gst_rate_pct']}%, Profit = {r['profit_pct']}%",
        f"2. Let Cost Price = CP (unknown).",
        f"3. List Price (MP) = CP × (1 + {r['profit_pct']}/100)",
        f"4. Selling Price before GST = MP (no discount assumed)",
        f"5. Final Price = MP × (1 + {r['gst_rate_pct']}/100) = CP × (1 + {r['profit_pct']}/100) × (1 + {r['gst_rate_pct']}/100)",
        f"6. CP = Final Price / [(1 + {r['profit_pct']}/100) × (1 + {r['gst_rate_pct']}/100)]",
        f"   CP = ₹{r['final_price']:.2f} / {(1+r['profit_pct']/100)*(1+r['gst_rate_pct']/100):.4f} = ₹{r['cost_price']:.2f}",
        f"7. GST Amount = Final Price − SP_pre_GST = ₹{r['final_price']:.2f} − ₹{r['selling_price_pre_gst']:.2f} = ₹{r['gst_amount']:.2f}",
    ]
    return steps


# ═══════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

# ─── Node 001 ──────────────────────────────────────────────────────────────

def gen_001_gst_basic(seed: int) -> GSTQuestion:
    """Node 001 – GST on basic cost price, no discount, no markup."""
    rng = _rng(seed)
    cp  = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    r = _gst_forward(cp, rate)
    txt = (
        f"The cost price of an article is ₹{r['cost_price']:.0f}. "
        f"The shopkeeper marks it at the same price (no extra markup) and sells it. "
        f"GST of {r['gst_rate_pct']:.0f}% is charged on the selling price. "
        f"Find the GST amount and the final price paid by the customer."
    )
    return GSTQuestion(
        node_id="c10_math_001", problem_type="gst_basic", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={"cost_price": r["cost_price"], "gst_rate_pct": r["gst_rate_pct"]},
        answer={"gst_amount": r["gst_amount"], "final_price": r["final_price"]},
        steps=_steps_forward(r),
        verification={"passed": verify_gst_forward(cp, rate, r["final_price"])},
        competency_check="Student correctly applies GST% to the selling price.",
    )


def gen_001_gst_with_discount(seed: int) -> GSTQuestion:
    """Node 001 – GST on discounted price."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    disc = _rand_discount(rng)
    r = _gst_forward(cp, rate, discount_pct=disc)
    txt = (
        f"The cost price of an article is ₹{r['cost_price']:.0f}. "
        f"The shopkeeper marks it at the same price (list price = cost price) and offers a discount of {r['discount_pct']:.0f}%. "
        f"GST of {r['gst_rate_pct']:.0f}% is charged on the discounted selling price. "
        f"Find (a) the selling price before GST, (b) the GST amount, and (c) the final price paid by the customer."
    )
    return GSTQuestion(
        node_id="c10_math_001", problem_type="gst_with_discount", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "cost_price": r["cost_price"],
            "list_price": r["list_price"],
            "discount_pct": r["discount_pct"],
            "gst_rate_pct": r["gst_rate_pct"],
        },
        answer={
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "gst_amount": r["gst_amount"],
            "final_price": r["final_price"],
        },
        steps=_steps_forward(r),
        verification={"passed": verify_gst_forward(cp, rate, r["final_price"], discount_pct=disc)},
        competency_check="Student correctly applies discount first, then computes GST on the discounted price.",
    )


def gen_001_gst_with_profit(seed: int) -> GSTQuestion:
    """Node 001 – GST with profit markup."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    prof = _rand_profit(rng)
    r = _gst_forward(cp, rate, profit_pct=prof)
    txt = (
        f"A shopkeeper buys an article for ₹{r['cost_price']:.0f} and marks it up by {r['profit_or_loss_pct']:.0f}%. "
        f"GST of {r['gst_rate_pct']:.0f}% is charged on the marked price. "
        f"Find (a) the marked price, (b) the GST amount, and (c) the final selling price."
    )
    return GSTQuestion(
        node_id="c10_math_001", problem_type="gst_with_profit", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "cost_price": r["cost_price"],
            "profit_pct": r["profit_or_loss_pct"],
            "gst_rate_pct": r["gst_rate_pct"],
        },
        answer={
            "list_price": r["list_price"],
            "gst_amount": r["gst_amount"],
            "final_price": r["final_price"],
        },
        steps=_steps_forward(r),
        verification={"passed": verify_gst_forward(cp, rate, r["final_price"])},
        competency_check="Student correctly computes markup before applying GST.",
    )


def gen_001_gst_with_loss(seed: int) -> GSTQuestion:
    """Node 001 – GST with loss (selling below cost)."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    loss = _rand_loss(rng)
    r = _gst_forward(cp, rate, loss_pct=loss)
    txt = (
        f"A shopkeeper buys an article for ₹{r['cost_price']:.0f} and sells it at a loss of {r['profit_or_loss_pct']:.0f}%. "
        f"GST of {r['gst_rate_pct']:.0f}% is charged on the selling price. "
        f"Find (a) the selling price before GST, (b) the GST amount, and (c) the final selling price."
    )
    return GSTQuestion(
        node_id="c10_math_001", problem_type="gst_with_loss", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "cost_price": r["cost_price"],
            "loss_pct": r["profit_or_loss_pct"],
            "gst_rate_pct": r["gst_rate_pct"],
        },
        answer={
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "gst_amount": r["gst_amount"],
            "final_price": r["final_price"],
        },
        steps=_steps_forward(r),
        verification={"passed": verify_gst_forward(cp, rate, r["final_price"])},
        competency_check="Student correctly computes loss (reduced price) before applying GST.",
    )


def gen_001_gst_with_discount_and_profit(seed: int) -> GSTQuestion:
    """Node 001 – GST with both profit markup and discount (combined)."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    prof = _rand_profit(rng)
    disc = _rand_discount(rng)
    r = _gst_forward(cp, rate, discount_pct=disc, profit_pct=prof)
    txt = (
        f"A shopkeeper buys an article for ₹{r['cost_price']:.0f}, marks it up by {r['profit_or_loss_pct']:.0f}%, "
        f"and then offers a discount of {r['discount_pct']:.0f}% on the marked price. "
        f"GST of {r['gst_rate_pct']:.0f}% is charged on the discounted price. "
        f"Find (a) the marked price, (b) the selling price before GST, (c) the GST amount, and (d) the final price."
    )
    return GSTQuestion(
        node_id="c10_math_001", problem_type="gst_discount_and_profit", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "cost_price": r["cost_price"],
            "profit_pct": r["profit_or_loss_pct"],
            "discount_pct": r["discount_pct"],
            "gst_rate_pct": r["gst_rate_pct"],
        },
        answer={
            "list_price": r["list_price"],
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "gst_amount": r["gst_amount"],
            "final_price": r["final_price"],
        },
        steps=_steps_forward(r),
        verification={"passed": verify_gst_forward(cp, rate, r["final_price"], discount_pct=disc)},
        competency_check="Student applies profit markup, then discount, then GST in correct sequence.",
    )


# ─── Node 002 ──────────────────────────────────────────────────────────────

def gen_002_sgst_cgst_split(seed: int) -> GSTQuestion:
    """Node 002 – Split GST into SGST and CGST."""
    rng = _rng(seed)
    tv   = _rand_cost_price(rng)   # taxable value
    rate = _rand_gst_rate(rng)
    r = _sgst_cgst_split(tv, rate)
    txt = (
        f"The taxable value (selling price before GST) of an article is ₹{r['taxable_value']:.0f}. "
        f"The total GST rate is {r['total_gst_rate_pct']:.0f}% (intra-state sale). "
        f"Find (a) the SGST rate and amount, (b) the CGST rate and amount, "
        f"and (c) the total price paid by the consumer."
    )
    return GSTQuestion(
        node_id="c10_math_002", problem_type="sgst_cgst_split", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "taxable_value": r["taxable_value"],
            "total_gst_rate_pct": r["total_gst_rate_pct"],
        },
        answer={
            "sgst_rate_pct": r["sgst_rate_pct"],
            "cgst_rate_pct": r["cgst_rate_pct"],
            "sgst_amount": r["sgst_amount"],
            "cgst_amount": r["cgst_amount"],
            "total_gst": r["total_gst"],
            "final_price": r["final_price"],
        },
        steps=_steps_sgst_cgst(r),
        verification=verify_sgst_cgst_split(tv, rate),
        competency_check="Student correctly splits GST into equal SGST and CGST components and finds total price.",
    )


def gen_002_consumer_price_with_discount(seed: int) -> GSTQuestion:
    """Node 002 – Full pipeline: discount → GST → SGST/CGST → final price."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    disc = _rand_discount(rng)
    r = _price_paid_by_consumer(cp, rate, discount_pct=disc)
    txt = (
        f"The cost price of an article is ₹{r['cost_price']:.0f}. "
        f"The shopkeeper sells it at the same price (no markup) but gives a discount of {r['discount_pct']:.0f}%. "
        f"GST of {r['gst_rate_pct']:.0f}% (intra-state) is charged on the discounted selling price. "
        f"Find (a) the selling price before GST, (b) SGST and CGST amounts separately, "
        f"and (c) the total price paid by the consumer."
    )
    return GSTQuestion(
        node_id="c10_math_002", problem_type="consumer_price_discount", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "cost_price": r["cost_price"],
            "discount_pct": r["discount_pct"],
            "gst_rate_pct": r["gst_rate_pct"],
        },
        answer={
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "sgst_amount": r["sgst_amount"],
            "cgst_amount": r["cgst_amount"],
            "total_gst": r["total_gst"],
            "final_price": r["final_price"],
        },
        steps=_steps_forward(r) + _steps_sgst_cgst(r),
        verification={"passed": verify_gst_forward(cp, rate, r["final_price"], discount_pct=disc)},
        competency_check="Student chains discount calculation with GST split and final consumer price.",
    )


def gen_002_consumer_price_with_profit(seed: int) -> GSTQuestion:
    """Node 002 – Full pipeline: profit → GST → SGST/CGST → final price."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    prof = _rand_profit(rng)
    r = _price_paid_by_consumer(cp, rate)
    r_fwd = _gst_forward(cp, rate, profit_pct=prof)
    r_split = _sgst_cgst_split(r_fwd["selling_price_pre_gst"], rate)
    r = {**r_fwd, **r_split}

    txt = (
        f"The cost price of an article is ₹{r['cost_price']:.0f}. "
        f"The shopkeeper marks it up by {r['profit_or_loss_pct']:.0f}% and sells it at the marked price. "
        f"GST of {r['gst_rate_pct']:.0f}% (intra-state) is charged. "
        f"Find (a) the marked price, (b) SGST and CGST separately, and (c) the final price paid by the consumer."
    )
    return GSTQuestion(
        node_id="c10_math_002", problem_type="consumer_price_profit", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "cost_price": r["cost_price"],
            "profit_pct": r["profit_or_loss_pct"],
            "gst_rate_pct": r["gst_rate_pct"],
        },
        answer={
            "list_price": r["list_price"],
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "sgst_amount": r["sgst_amount"],
            "cgst_amount": r["cgst_amount"],
            "total_gst": r["total_gst"],
            "final_price": r["final_price"],
        },
        steps=_steps_forward(r) + _steps_sgst_cgst(r),
        verification={"passed": verify_gst_forward(cp, rate, r["final_price"])},
        competency_check="Student chains profit markup, GST computation, and SGST/CGST split.",
    )


# ─── Node 003 ──────────────────────────────────────────────────────────────

def gen_003_inverse_basic(seed: int) -> GSTQuestion:
    """Node 003 – Inverse: find cost price from GST-inclusive final price."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    r_fwd = _gst_forward(cp, rate)
    final_price = r_fwd["final_price"]
    r = _inverse_gst(final_price, rate)
    txt = (
        f"A customer pays a total of ₹{r['final_price']:.0f} for an article after {r['gst_rate_pct']:.0f}% GST is added. "
        f"There is no discount and no markup (list price = cost price). "
        f"Find (a) the selling price before GST, and (b) the original cost price of the article."
    )
    return GSTQuestion(
        node_id="c10_math_003", problem_type="inverse_basic", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "final_price": r["final_price"],
            "gst_rate_pct": r["gst_rate_pct"],
        },
        answer={
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "cost_price": r["cost_price"],
            "gst_amount": r["gst_amount"],
        },
        steps=_steps_inverse(r),
        verification={"passed": verify_inverse(final_price, rate, r["cost_price"])},
        competency_check="Student works backwards from final price to find base price using division by (1 + r/100).",
    )


def gen_003_inverse_with_discount(seed: int) -> GSTQuestion:
    """Node 003 – Inverse: find cost price, given final price and discount."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    disc = _rand_discount(rng)
    r_fwd = _gst_forward(cp, rate, discount_pct=disc)
    final_price = r_fwd["final_price"]
    r = _inverse_gst(final_price, rate, discount_pct=disc)
    txt = (
        f"A customer pays a total of ₹{r['final_price']:.0f} for an article after a discount of "
        f"{r['discount_pct']:.0f}% on the list price and {r['gst_rate_pct']:.0f}% GST on the discounted price. "
        f"There is no profit markup (list price = cost price). "
        f"Find (a) the list price, and (b) the original cost price."
    )
    return GSTQuestion(
        node_id="c10_math_003", problem_type="inverse_with_discount", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "final_price": r["final_price"],
            "gst_rate_pct": r["gst_rate_pct"],
            "discount_pct": r["discount_pct"],
        },
        answer={
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "list_price": r["list_price"],
            "cost_price": r["cost_price"],
            "gst_amount": r["gst_amount"],
        },
        steps=_steps_inverse(r),
        verification={"passed": verify_inverse(final_price, rate, r["cost_price"], discount_pct=disc)},
        competency_check="Student reverses two operations: first removes GST, then removes discount.",
    )


def gen_003_inverse_with_profit(seed: int) -> GSTQuestion:
    """Node 003 – Inverse: find cost price, given final price and profit markup."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    prof = _rand_profit(rng)
    r_fwd = _gst_forward(cp, rate, profit_pct=prof)
    final_price = r_fwd["final_price"]
    r = solve_inverse_with_profit(final_price, rate, prof)
    txt = (
        f"A customer pays a total of ₹{r['final_price']:.0f} for an article after "
        f"{r['gst_rate_pct']:.0f}% GST is added. "
        f"The shopkeeper had made a profit of {prof}% on the cost price. "
        f"Find the original cost price of the article."
    )
    return GSTQuestion(
        node_id="c10_math_003", problem_type="inverse_with_profit", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "final_price": r["final_price"],
            "gst_rate_pct": r["gst_rate_pct"],
            "profit_pct": prof,
        },
        answer={
            "cost_price": r["cost_price"],
            "list_price": r["list_price"],
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "gst_amount": r["gst_amount"],
        },
        steps=_steps_inverse_profit(r),
        verification={"passed": verify_inverse(final_price, rate, r["cost_price"])},
        competency_check="Student solves CP = Final / [(1 + profit%) × (1 + GST%)].",
    )


def gen_003_inverse_with_profit_and_discount(seed: int) -> GSTQuestion:
    """Node 003 – Inverse: find cost price, given final price, profit, and discount."""
    rng = _rng(seed)
    cp   = _rand_cost_price(rng)
    rate = _rand_gst_rate(rng)
    prof = _rand_profit(rng)
    disc = _rand_discount(rng)
    r_fwd = _gst_forward(cp, rate, discount_pct=disc, profit_pct=prof)
    final_price = r_fwd["final_price"]
    x = __import__("sympy").Symbol("x", positive=True)
    expr = x * (1 + prof / 100) * (1 - disc / 100) * (1 + rate / 100)
    eq = __import__("sympy").Eq(expr, final_price)
    sol = __import__("sympy").solve(eq, x)
    CP = float(sol[0])
    MP = CP * (1 + prof / 100)
    SP_pre = MP * (1 - disc / 100)
    gst_amt = final_price - SP_pre

    r = {
        "cost_price": CP, "list_price": MP,
        "selling_price_pre_gst": SP_pre,
        "gst_amount": gst_amt, "final_price": final_price,
        "profit_pct": prof, "discount_pct": disc, "gst_rate_pct": rate,
    }
    txt = (
        f"A customer pays a total of ₹{r['final_price']:.0f} for an article after "
        f"a discount of {r['discount_pct']:.0f}% and {r['gst_rate_pct']:.0f}% GST are applied. "
        f"The shopkeeper made a profit of {r['profit_pct']:.0f}% on the cost price. "
        f"Find the original cost price of the article."
    )
    steps = [
        f"1. Let CP = x.",
        f"2. Marked Price (MP) = x × (1 + {prof}/100) = x × {1+prof/100:.4f}",
        f"3. Selling Price before GST = MP × (1 − {disc}/100) = MP × {1-disc/100:.4f}",
        f"4. Final Price = SP_pre_GST × (1 + {rate}/100)",
        f"5. Equation: x × {1+prof/100:.4f} × {1-disc/100:.4f} × {1+rate/100:.4f} = {final_price:.2f}",
        f"6. x = {final_price:.2f} / {(1+prof/100)*(1-disc/100)*(1+rate/100):.6f} = ₹{CP:.2f}",
        f"7. GST Amount = ₹{final_price:.2f} − ₹{SP_pre:.2f} = ₹{gst_amt:.2f}",
    ]
    return GSTQuestion(
        node_id="c10_math_003", problem_type="inverse_profit_discount", seed=seed,
        difficulty="medium",
        question_text=txt,
        given={
            "final_price": r["final_price"],
            "gst_rate_pct": r["gst_rate_pct"],
            "discount_pct": r["discount_pct"],
            "profit_pct": r["profit_pct"],
        },
        answer={
            "cost_price": r["cost_price"],
            "list_price": r["list_price"],
            "selling_price_pre_gst": r["selling_price_pre_gst"],
            "gst_amount": r["gst_amount"],
        },
        steps=steps,
        verification={"passed": abs(CP - cp) < 0.01, "expected_cp": cp, "found_cp": round(CP, 2)},
        competency_check="Student chains three inverse operations: remove GST, remove discount, remove profit markup.",
    )


# ═══════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

# (function, node_id, problem_type, description)
_GENERATORS: List[Tuple] = [
    (gen_001_gst_basic,                    "c10_math_001", "gst_basic",
     "GST on cost price (no markup, no discount)"),
    (gen_001_gst_with_discount,            "c10_math_001", "gst_with_discount",
     "GST on discounted price"),
    (gen_001_gst_with_profit,              "c10_math_001", "gst_with_profit",
     "GST with profit markup"),
    (gen_001_gst_with_loss,                "c10_math_001", "gst_with_loss",
     "GST with loss"),
    (gen_001_gst_with_discount_and_profit, "c10_math_001", "gst_discount_and_profit",
     "GST with both profit markup and discount"),
    (gen_002_sgst_cgst_split,              "c10_math_002", "sgst_cgst_split",
     "Split GST into SGST and CGST"),
    (gen_002_consumer_price_with_discount, "c10_math_002", "consumer_price_discount",
     "Consumer price: discount → GST → SGST/CGST"),
    (gen_002_consumer_price_with_profit,   "c10_math_002", "consumer_price_profit",
     "Consumer price: profit → GST → SGST/CGST"),
    (gen_003_inverse_basic,                "c10_math_003", "inverse_basic",
     "Inverse GST: find base price from final price"),
    (gen_003_inverse_with_discount,        "c10_math_003", "inverse_with_discount",
     "Inverse GST with discount"),
    (gen_003_inverse_with_profit,          "c10_math_003", "inverse_with_profit",
     "Inverse GST with profit markup"),
    (gen_003_inverse_with_profit_and_discount, "c10_math_003", "inverse_profit_discount",
     "Inverse GST with both profit markup and discount"),
]


def generate_question(node_id: Optional[str] = None,
                      problem_type: Optional[str] = None,
                      seed: int = 42,
                      difficulty: str = "medium") -> GSTQuestion:
    """
    Generate one GST question.

    Parameters
    ----------
    node_id       : restrict to a specific node (e.g. "c10_math_001")
    problem_type  : restrict to a specific problem type (e.g. "gst_with_profit")
    seed          : random seed for reproducibility
    difficulty    : "easy" | "medium" | "hard"

    Returns
    -------
    GSTQuestion  – fully populated with question text, given values, answer,
                   step-by-step solution, and verification result.
    """
    candidates = [
        (fn, nid, pt, desc)
        for fn, nid, pt, desc in _GENERATORS
        if (node_id is None or nid == node_id)
        and (problem_type is None or pt == problem_type)
    ]
    if not candidates:
        raise ValueError(
            f"No generators match node_id={node_id!r}, problem_type={problem_type!r}. "
            f"Available: {[(nid, pt) for _, nid, pt, _ in _GENERATORS]}"
        )
    fn, nid, pt, desc = candidates[seed % len(candidates)]
    q = fn(seed)
    q.difficulty = difficulty
    return q


def generate_batch(node_id: Optional[str] = None,
                   problem_type: Optional[str] = None,
                   count: int = 5,
                   base_seed: int = 100) -> List[GSTQuestion]:
    """
    Generate `count` questions deterministically.

    Each question uses seed = base_seed + i so results are reproducible.
    """
    return [generate_question(node_id=node_id, problem_type=problem_type,
                               seed=base_seed + i) for i in range(count)]


# ═══════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

def pretty_print(q: GSTQuestion) -> str:
    lines = [
        "=" * 70,
        f"NODE     : {q.node_id}",
        f"TYPE     : {q.problem_type}",
        f"SEED     : {q.seed}",
        f"DIFFICULTY: {q.difficulty}",
        "=" * 70,
        "QUESTION",
        "-" * 70,
        q.question_text,
        "-" * 70,
        "GIVEN",
    ]
    for k, v in q.given.items():
        lines.append(f"  {k}: {v}")
    lines.append("-" * 70)
    lines.append("SOLUTION  (step-by-step)")
    for s in q.steps:
        for sl in s.split("\n"):
            lines.append(f"  {sl}")
    lines.append("-" * 70)
    lines.append("ANSWER")
    for k, v in q.answer.items():
        lines.append(f"  {k}: {v}")
    lines.append("-" * 70)
    lines.append(f"VERIFICATION: {'PASSED ✓' if q.verification.get('passed') else 'FAILED ✗'}")
    if not q.verification.get("passed"):
        lines.append(f"  Details: {q.verification}")
    lines.append("-" * 70)
    lines.append(f"COMPETENCY CHECK: {q.competency_check}")
    lines.append("=" * 70)
    return "\n".join(lines)


# ═══════════════════════════════════════════════════════════════════════════
# ═══════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import sys

    from class10_maths_solver import run_self_tests
    run_self_tests()

    print("\n\n" + "=" * 70)
    print("  QUESTION GENERATOR DEMO – 3 GST Nodes (Class 10)")
    print("=" * 70)

    nodes = ["c10_math_001", "c10_math_002", "c10_math_003"]
    for node in nodes:
        print(f"\n{'─'*70}")
        print(f"  Generating question from {node}")
        print(f"{'─'*70}")
        q = generate_question(node_id=node, seed=42)
        print(pretty_print(q))

    print(f"\n{'═'*70}")
    print("  BATCH: 3 questions from Node 002 (SGST/CGST)")
    print(f"{'═'*70}")
    batch = generate_batch(node_id="c10_math_002", count=3, base_seed=200)
    for q in batch:
        print(pretty_print(q))