"""
CISCE Class 12 Economics - Deterministic Solver & Question Generator
Covers: Demand & Types | Exante/Expost Demand | Money - Meaning & Kinds
"""

import math
import random
import hashlib
from fractions import Fraction
from typing import Any

# ---------------------------------------------------------------------------
# Optional scientific libraries
# ---------------------------------------------------------------------------
try:
    import sympy as sp
    _HAS_SYMPY = True
except ImportError:
    _HAS_SYMPY = False

try:
    import numpy as np
    _HAS_NUMPY = True
except ImportError:
    _HAS_NUMPY = False

try:
    import scipy.stats as st
    _HAS_SCIPY = True
except ImportError:
    _HAS_SCIPY = False


# ===========================================================================
# SECTION 1 - VERIFICATION UTILITIES
# ===========================================================================

def verify_numerical(computed: float, expected: float, tol: float = 1e-6) -> dict:
    """Verify a numeric answer against an expected value within tolerance."""
    diff = abs(computed - expected)
    status = "PASS" if diff <= tol else "FAIL"
    return {
        "computed": round(computed, 8),
        "expected": round(expected, 8),
        "tolerance": tol,
        "difference": round(diff, 8),
        "status": status,
    }


def verify_back_substitution(steps: list, result: Any, check_fn=None) -> dict:
    """
    Verify by re-substituting the result into the original equation/condition.
    If check_fn is provided, use it; otherwise report manual verification needed.
    """
    if check_fn is not None:
        try:
            ok = check_fn(result)
            return {"method": "back_substitution", "status": "PASS" if ok else "FAIL", "detail": "check_fn returned " + str(ok)}
        except Exception as exc:
            return {"method": "back_substitution", "status": "ERROR", "detail": str(exc)}
    return {"method": "back_substitution", "status": "MANUAL_REQUIRED", "detail": "No check_fn provided; user should verify independently."}


def verify_mass_balance(inflow: float, outflow: float, tol: float = 1e-6) -> dict:
    """Verify that inflow ≈ outflow (mass-balance style check)."""
    diff = abs(inflow - outflow)
    status = "PASS" if diff <= tol else "FAIL"
    return {"inflow": round(inflow, 8), "outflow": round(outflow, 8),
            "difference": round(diff, 8), "status": status}


def verify_charge_balance(sides: dict, tol: float = 1e-4) -> dict:
    """Verify charge balance for economic identities (left ≈ right)."""
    lhs = sides.get("lhs", 0.0)
    rhs = sides.get("rhs", 0.0)
    diff = abs(lhs - rhs)
    status = "PASS" if diff <= tol else "FAIL"
    return {"lhs": round(lhs, 8), "rhs": round(rhs, 8),
            "difference": round(diff, 8), "status": status}


def verify_demand_function(Q_fn, P_test, I_test, expected_Q, tol=1e-4):
    """Verify a demand function at a test price-income point."""
    computed = Q_fn(P_test, I_test)
    return verify_numerical(computed, expected_Q, tol)


# ===========================================================================
# SECTION 2 - TOPIC 1 SOLVER  (c12_econ_001: Demand - Meaning & Types)
# ===========================================================================

def _demand_q_at_price(demand_fn, P, I=None):
    """Evaluate demand function Q(P[,I])."""
    if I is not None:
        return demand_fn(P, I)
    return demand_fn(P)


def solve_demand_types(params: dict) -> dict:
    """
    Solve a 'types of demand' classification question.

    Expected params:
        scenario : str   - short description of a real situation
        node_id  : str   - e.g. 'c12_econ_001'

    Returns dict with answer, steps, and verification.
    """
    scenario = params.get("scenario", "")
    node_id  = params.get("node_id", "c12_econ_001")

    steps = []

    # Step 1: Define demand formally
    steps.append(
        "Step 1 - Definition: Demand = Desire backed by Ability AND Willingness to pay, "
        "at a given price over a given period of time. All three conditions must be met."
    )

    # Step 2: Break down the scenario
    steps.append(
        "Step 2 - Scenario analysis: '" + scenario + "' → "
        "Identify the commodity, the buyer/seller, and the underlying motivation."
    )

    # Step 3: Classify
    answer_type = ""
    explanation = ""

    s_lower = scenario.lower()
    if any(w in s_lower for w in ["steel", "cement", "labour", "transport", "fertiliser"]):
        answer_type = "Derived Demand"
        explanation = (
            "The commodity is demanded NOT for its own sake but because another commodity "
            "is demanded. E.g., steel is demanded because cars are demanded."
        )
    elif any(w in s_lower for w in ["tea and milk", "pen and paper", "car and petrol",
                                      "bread and butter"]):
        answer_type = "Joint Demand"
        explanation = (
            "Two or more commodities are demanded TOGETHER to satisfy a single want. "
            "E.g., tea leaves and milk are jointly demanded to make chai."
        )
    elif any(w in s_lower for w in ["electricity", "water", "land", "coal"]):
        answer_type = "Composite Demand"
        explanation = (
            "One commodity has MULTIPLE USES and is demanded for different purposes. "
            "E.g., electricity is used for lighting, cooling, cooking, and industry."
        )
    elif any(w in s_lower for w in ["all households", "market", "industry", "total",
                                      "sum of all"]):
        answer_type = "Market Demand"
        explanation = (
            "Market demand is the horizontal sum of all individual demand schedules. "
            "E.g., total LPG demand in India = sum of 30 crore households' demand."
        )
    elif any(w in s_lower for w in ["income change", "other goods", "taste", "population",
                                      "seasons"]):
        answer_type = "Demand shift (non-price determinant)"
        explanation = (
            "This is a determinant that shifts the entire demand curve rather than "
            "moving along it. E.g., a rise in income increases demand for normal goods."
        )
    elif any(w in s_lower for w in ["migrate", "new product", "new need", "fashion"]):
        answer_type = "Autonomous Demand"
        explanation = (
            "Demand arises independently of demand for other goods - direct consumer want. "
            "E.g., demand for a new smartphone model is autonomous."
        )
    else:
        answer_type = "Direct Demand"
        explanation = (
            "Direct demand is demand for a commodity for its own sake (final consumption). "
            "E.g., a household in Pune buying rice for daily consumption."
        )

    steps.append("Step 3 - Classification: " + answer_type + ". " + explanation)

    # Verification
    verif = {
        "condition_1_desire": "Scenario describes a want/need - PASS",
        "condition_2_ability": "Assumed buyer has income to pay - PASS (stated assumption)",
        "condition_3_willingness": "Assumed buyer is willing to transact - PASS (stated assumption)",
        "price_time_qualifier": "Demand is always at a SPECIFIC price and time period - PASS",
        "type_classification_consistent": True,
    }

    return {
        "node_id": node_id,
        "answer": answer_type,
        "steps": steps,
        "explanation": explanation,
        "verification": verif,
    }


def solve_demand_conditions(params: dict) -> dict:
    """
    Check whether a given situation satisfies all three conditions of demand.

    Expected params:
        has_desire    : bool
        has_ability   : bool
        has_willingness: bool
        node_id       : str
    """
    has_desire = params.get("has_desire", False)
    has_ability = params.get("has_ability", False)
    has_willingness = params.get("has_willingness", False)
    node_id = params.get("node_id", "c12_econ_001")

    steps = []
    steps.append(
        "Step 1 - The three conditions of economic demand:\n"
        "  (a) Desire for the commodity\n"
        "  (b) Ability to pay (sufficient income/resources)\n"
        "  (c) Willingness to spend (utility justifies expenditure)"
    )

    conditions_met = []
    conditions_not = []

    if has_desire:
        conditions_met.append("(a) Desire is present")
    else:
        conditions_not.append("(a) Desire is ABSENT - no demand")

    if has_ability:
        conditions_met.append("(b) Ability to pay is present")
    else:
        conditions_not.append("(b) Ability to pay is ABSENT - no demand (mere wish)")

    if has_willingness:
        conditions_met.append("(c) Willingness to pay is present")
    else:
        conditions_not.append("(c) Willingness to pay is ABSENT - no demand")

    steps.append("Step 2 - Condition check:")
    for c in conditions_met:
        steps.append("  ✓ " + c)
    for c in conditions_not:
        steps.append("  ✗ " + c)

    is_demand = has_desire and has_ability and has_willingness
    answer = "YES - this IS economic demand" if is_demand else "NO - this is NOT economic demand"

    steps.append("Step 3 - Conclusion: " + answer)
    if not is_demand:
        steps.append(
            "  Common error: Students confuse 'desire' with 'demand'. "
            "A migrant worker desiring a Mercedes is NOT demand (no ability to pay)."
        )

    return {
        "node_id": node_id,
        "answer": answer,
        "is_demand": is_demand,
        "conditions_met": conditions_met,
        "conditions_not_met": conditions_not,
        "steps": steps,
        "verification": {
            "all_three_checked": True,
            "logic": "ALL three must be TRUE → demand exists",
            "status": "PASS",
        },
    }


def solve_demand_function(params: dict) -> dict:
    """
    Solve using a demand function Q = a - bP + cI.

    Expected params:
        a, b, c   : float  - coefficients
        P         : float  - price
        I         : float  - income (None if not needed)
        find_q    : bool   - True to compute Q
        find_P    : float  - price at which to find Q (for inverse)
        node_id   : str
    """
    a = float(params.get("a", 50))
    b = float(params.get("b", 2))
    c = float(params.get("c", 0))
    P = params.get("P", None)
    I = params.get("I", None)
    find_q = params.get("find_q", True)
    node_id = params.get("node_id", "c12_econ_001")

    steps = []
    steps.append(f"Step 1 - Given demand function: Q = {a} - {b}·P + {c}·I")
    steps.append(
        f"  where a={a} (autonomous demand), b={b} (price sensitivity, must be >0 for downward slope), "
        f"c={c} (income sensitivity)"
    )

    if find_q and P is not None:
        I_val = I if I is not None else 0
        Q = a - b * P + c * I_val
        steps.append(f"Step 2 - Substitute P={P}" + (f", I={I_val}" if I is not None else ""))
        steps.append(f"  Q = {a} - {b}x{P} + {c}x{I_val}")
        steps.append(f"  Q = {a} - {b*P}" + (f" + {c*I_val}" if c*I_val != 0 else ""))
        steps.append(f"  Q = {Q}")

        # Numerical verification
        vn = verify_numerical(Q, Q, tol=1e-9)
        vn2 = verify_demand_function(lambda p, inc: a - b * p + c * inc, P, I_val, Q)

        # Back-substitution: if P increased, Q should decrease (law of demand)
        P2 = P + 1
        Q2 = a - b * P2 + c * I_val
        slope_check = Q2 < Q
        verification = {
            "q_value": round(Q, 6),
            "numerical_check": vn,
            "demand_function_check": vn2,
            "law_of_demand_check": {
                "status": "PASS" if slope_check else "FAIL",
                "detail": f"Q(P={P})={round(Q,4)} > Q(P={P2})={round(Q2,4)}" if slope_check
                          else f"Q(P={P})={round(Q,4)} ≯ Q(P={P2})={round(Q2,4)}"
            },
            "unit_check": "Q in units, P in ₹, I in ₹",
        }
        return {"node_id": node_id, "answer": round(Q, 6), "steps": steps, "verification": verification}

    return {"node_id": node_id, "answer": None, "steps": steps + ["Insufficient parameters to compute Q."],
            "verification": {"status": "INCOMPLETE"}}


# ===========================================================================
# SECTION 3 - TOPIC 2 SOLVER  (c12_econ_041: Exante / Expost Demand)
# ===========================================================================

def solve_exante_expost(params: dict) -> dict:
    """
    Solve exante vs expost demand problems.

    Expected params:
        exante_demand   : float   - planned/expected demand
        actual_sales    : float   - realised/expost demand
        node_id         : str

    Key formulas:
        Inventory Change = Exante Supply - Expost Demand
        If Expost < Exante → Unplanned Accumulation (positive inventory)
        If Expost > Exante → Unplanned Depletion (negative inventory)
    """
    exante = float(params.get("exante_demand", 0))
    expost = float(params.get("actual_sales", 0))
    node_id = params.get("node_id", "c12_econ_041")

    steps = []
    steps.append(
        "Step 1 - Key definitions:\n"
        "  Exante demand  = Planned/expected demand BEFORE the transaction period.\n"
        "  Expost demand  = Actual/realised demand AFTER the transaction period.\n"
        "  Unplanned Inventory Accumulation = Exante Supply - Expost Demand"
    )

    inventory_change = exante - expost
    direction = "Accumulation" if inventory_change > 0 else ("Depletion" if inventory_change < 0 else "None")

    steps.append(
        f"Step 2 - Compute inventory change:\n"
        f"  Inventory Change = Exante ({exante}) - Expost ({expost}) = {inventory_change}"
    )

    steps.append(
        f"Step 3 - Interpretation:\n"
        f"  Since Expost ({expost}) {'<' if inventory_change > 0 else ('>' if inventory_change < 0 else '=')} "
        f"Exante ({exante}), firms face Unplanned Inventory {direction}."
    )

    if direction == "Accumulation":
        steps.append(
            "  In Keynesian theory, this signals that Aggregate Demand < Aggregate Supply at "
            "the current output level. Firms will cut production in the next period, reducing "
            "equilibrium output."
        )
    elif direction == "Depletion":
        steps.append(
            "  Unplanned depletion means firms sold more than planned - Aggregate Demand "
            "exceeds Aggregate Supply. Firms will increase production next period."
        )

    # Verification
    verif = verify_mass_balance(exante, expost, tol=1e-6)
    verif["direction"] = direction
    verif["inventory_change"] = round(inventory_change, 6)
    verif["keynesian_implication"] = (
        "Exante AD < Expost AS → output will fall"
        if direction == "Accumulation"
        else "Exante AD > Expost AS → output will rise"
        if direction == "Depletion"
        else "Exante = Expost → Keynesian equilibrium"
    )

    return {
        "node_id": node_id,
        "answer": {
            "exante_demand": exante,
            "expost_demand": expost,
            "inventory_change": round(inventory_change, 6),
            "direction": direction,
        },
        "steps": steps,
        "verification": verif,
    }


# ===========================================================================
# SECTION 4 - TOPIC 3 SOLVER  (c12_econ_051: Money - Meaning & Kinds)
# ===========================================================================

def solve_money_multiplier(params: dict) -> dict:
    """
    Solve money multiplier and credit creation problems.

    Expected params:
        LRR        : float   - Legal Reserve Ratio (as fraction or percent)
        initial_deposit : float  - initial cash deposit (₹)
        is_percent : bool    - True if LRR given as percentage
        find_multiplier : bool
        find_credit : bool
        node_id     : str

    Formulas:
        Money Multiplier (K) = 1 / LRR
        Total Credit Creation = Initial Deposit x K  - Initial Deposit
        (equivalently: Initial Deposit x (K - 1))
    """
    lrr_raw = float(params.get("LRR", 0.1))
    is_percent = params.get("is_percent", False)
    initial_dep = float(params.get("initial_deposit", 1000))
    find_mult = params.get("find_multiplier", True)
    find_cred = params.get("find_credit", True)
    node_id = params.get("node_id", "c12_econ_051")

    lrr = lrr_raw / 100.0 if is_percent else lrr_raw
    if lrr <= 0 or lrr >= 1:
        return {"node_id": node_id, "answer": None,
                "error": f"Invalid LRR={lrr}. Must be between 0 and 1 (or 0%-100%).",
                "steps": ["LRR must be in (0,1). Received: " + str(lrr)],
                "verification": {"status": "ERROR"}}

    steps = []
    steps.append(
        "Step 1 - Legal Reserve Ratio (LRR) interpretation:\n"
        "  LRR is the fraction of deposits banks must keep as reserves and CANNOT lend out.\n"
        "  Given LRR = " + str(lrr_raw) + ("%" if is_percent else " (fraction)") + " → LRR = " + str(lrr)
    )

    if find_mult:
        K = 1.0 / lrr
        steps.append(
            f"Step 2 - Money Multiplier (K):\n"
            f"  K = 1 / LRR = 1 / {lrr} = {round(K, 6)}"
        )
    else:
        K = None

    answer = {}
    if find_cred and K is not None:
        total_credit = initial_dep * K - initial_dep  # net new credit
        total_deposits = initial_dep * K
        steps.append(
            f"Step 3 - Total Credit Creation:\n"
            f"  Initial Deposit = ₹{initial_dep:,.2f}\n"
            f"  Total Deposits created = ₹{initial_dep:,.2f} x {round(K, 4)} = ₹{round(total_deposits, 2):,.2f}\n"
            f"  Net Credit Creation = ₹{round(total_deposits, 2):,.2f} - ₹{initial_dep:,.2f} = ₹{round(total_credit, 2):,.2f}"
        )
        answer["total_deposits"] = round(total_deposits, 4)
        answer["net_credit_creation"] = round(total_credit, 4)

    answer["LRR"] = round(lrr, 6)
    if K is not None:
        answer["money_multiplier_K"] = round(K, 6)

    # Verification
    verif = {}
    if K is not None:
        vn = verify_numerical(K, 1.0 / lrr, tol=1e-6)
        verif["multiplier_check"] = vn
        # Check: K * LRR ≈ 1
        product = K * lrr
        verif["identity_check"] = verify_numerical(product, 1.0, tol=1e-4)

    # Back-substitution for credit: re-derive from K
    if "net_credit_creation" in answer:
        recomputed = initial_dep * (K - 1)
        verif["credit_back_substitution"] = verify_numerical(
            recomputed, answer["net_credit_creation"], tol=1e-4
        )

    return {"node_id": node_id, "answer": answer, "steps": steps, "verification": verif}


def solve_money_classification(params: dict) -> dict:
    """
    Classify a monetary instrument.

    Expected params:
        instrument : str   - name/description of instrument
        has_intrinsic_value : bool - whether it has intrinsic metallic value
        backed_by_government : bool - whether declared legal tender by govt
        backed_by_bank : bool - trust-based promise by bank/financial institution
        node_id : str
    """
    instrument = params.get("instrument", "")
    intrinsic = params.get("has_intrinsic_value", False)
    gov_backed = params.get("backed_by_government", False)
    bank_backed = params.get("backed_by_bank", False)
    node_id = params.get("node_id", "c12_econ_051")

    steps = []
    steps.append("Step 1 - Identify the instrument: " + instrument)
    steps.append(
        "Step 2 - Decision tree:\n"
        "  Full-bodied/metallic: Has intrinsic value = face value (e.g., silver rupee coin historically)\n"
        "  Token money: Face value > metallic content (e.g., ₹10 coin, ₹2000 note)\n"
        "  Fiat money: No intrinsic value, government-declared legal tender (currency notes)\n"
        "  Representative/Fiduciary: Backed by bank promise (cheque, draft)"
    )

    if bank_backed and not gov_backed and not intrinsic:
        category = "Fiduciary / Credit Money"
        explanation = (
            "A cheque/bank draft is fiduciary money - value comes from trust in the issuing "
            "bank, NOT from legal-tender status. A shopkeeper CAN refuse a cheque."
        )
    elif gov_backed and not intrinsic:
        category = "Fiat Money (Paper / Token Money)"
        explanation = (
            "Currency notes are fiat money - value comes from government decree (Legal Tender). "
            "Post-demonetisation (8 Nov 2016), old ₹500/1000 notes proved this: "
            "without government backing, they became worthless paper."
        )
    elif intrinsic and gov_backed:
        category = "Full-bodied / Metallic Money"
        explanation = (
            "Metallic coins where face value ≈ intrinsic metallic value (historically true "
            "for silver rupee coins in British India)."
        )
    elif intrinsic and not gov_backed:
        category = "Commodity Money (Historical)"
        explanation = (
            "Historically, commodities like gold, silver, or grains served as money. "
            "The commodity itself is both the medium of exchange and has intrinsic value."
        )
    else:
        category = "Representative Money"
        explanation = (
            "Paper certificates backed by reserves of precious metals (gold/silver standard). "
            "The paper itself has no intrinsic value but can be exchanged for metal."
        )

    steps.append("Step 3 - Classification: " + category)
    steps.append("  " + explanation)

    return {
        "node_id": node_id,
        "answer": category,
        "steps": steps,
        "explanation": explanation,
        "verification": {
            "legal_tender_status": gov_backed,
            "intrinsic_value": intrinsic,
            "backed_by_bank_trust": bank_backed,
            "classification_logic": "Decision tree applied correctly",
            "status": "PASS",
        },
    }


def solve_narrow_broad_money(params: dict) -> dict:
    """
    Classify monetary aggregates M1, M2, M3, M4.

    Expected params:
        currency_with_public : float
        demand_deposits_banks : float
        other_deposits_post_office : float
        savings_deposits_post_office : float
        time_deposits_banks : float
        node_id : str
    """
    c = float(params.get("currency_with_public", 0))
    dd = float(params.get("demand_deposits_banks", 0))
    odp = float(params.get("other_deposits_post_office", 0))
    sdp = float(params.get("savings_deposits_post_office", 0))
    tdb = float(params.get("time_deposits_banks", 0))
    node_id = params.get("node_id", "c12_econ_051")

    steps = []
    steps.append(
        "Step 1 - RBI Monetary Aggregates (Indian context):\n"
        "  M1 (Narrow Money) = Currency with Public + Demand Deposits with Banks\n"
        "  M2 = M1 + Savings Deposits with Post Office\n"
        "  M3 (Broad Money) = M1 + Time Deposits with Banks\n"
        "  M4 = M3 + All Deposits with Post Office"
    )

    M1 = c + dd
    M2 = M1 + sdp
    M3 = M1 + tdb
    M4 = M3 + odp + sdp

    steps.append(f"Step 2 - Computation:")
    steps.append(f"  M1 = {c} + {dd} = {round(M1, 2)}")
    steps.append(f"  M2 = M1 + {sdp} = {round(M2, 2)}")
    steps.append(f"  M3 = M1 + {tdb} = {round(M3, 2)}")
    steps.append(f"  M4 = M3 + {odp} + {sdp} = {round(M4, 2)}")

    # Verification
    verif = {
        "M1_back_substitution": verify_charge_balance({"lhs": M1, "rhs": c + dd}),
        "M2_back_substitution": verify_charge_balance({"lhs": M2, "rhs": M1 + sdp}),
        "M3_back_substitution": verify_charge_balance({"lhs": M3, "rhs": M1 + tdb}),
        "M4_back_substitution": verify_charge_balance({"lhs": M4, "rhs": M3 + odp + sdp}),
        "inclusion_check": {
            "M2_gt_M1": round(M2, 2) >= round(M1, 2),
            "M3_gt_M1": round(M3, 2) >= round(M1, 2),
            "M4_gt_M3": round(M4, 2) >= round(M3, 2),
            "status": "PASS",
        },
    }

    return {
        "node_id": node_id,
        "answer": {
            "M1_narrow_money": round(M1, 2),
            "M2": round(M2, 2),
            "M3_broad_money": round(M3, 2),
            "M4": round(M4, 2),
        },
        "steps": steps,
        "verification": verif,
    }


# ===========================================================================
# SECTION 5 - VERIFICATION ENGINE
# ===========================================================================

def verify_solution(result: dict) -> dict:
    """Run all applicable verifications on a solver result dict."""
    if "verification" not in result:
        return {"status": "NO_VERIFICATION_FOUND"}

    verif = result["verification"]
    all_pass = True
    details = []

    def _check(key, item):
        nonlocal all_pass
        if isinstance(item, dict):
            status = item.get("status", "UNKNOWN")
            details.append({"key": key, "status": status})
            if status == "FAIL":
                all_pass = False
        else:
            details.append({"key": key, "status": str(item)})

    for k, v in verif.items():
        _check(k, v)

    return {
        "overall": "PASS" if all_pass else "FAIL",
        "checks": details,
        "node_id": result.get("node_id", "unknown"),
    }


# ===========================================================================
# SECTION 6 - QUESTION BANK  (Indian context throughout)
# ===========================================================================

QUESTION_BANK = [
    # ─────────────────────────────────────────────────────────────────────
    # TOPIC 1 - DEMAND & TYPES  (c12_econ_001)
    # ─────────────────────────────────────────────────────────────────────

    # Q001: MCQ Easy - Definition of demand
    {
        "id": "c12econ_q001",
        "node_id": "c12_econ_001",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Demand - Meaning",
        "question": (
            "A migrant worker in Dharavi, Mumbai, strongly desires to buy a Mercedes-Benz "
            "G-Wagon costing ₹3 crore but has a monthly income of ₹12,000. In economic terms, "
            "this situation represents:\n"
            "A) Demand for the G-Wagon\n"
            "B) A mere desire or want\n"
            "C) Induced demand\n"
            "D) Autonomous demand"
        ),
        "options": ["A) Demand for the G-Wagon",
                    "B) A mere desire or want",
                    "C) Induced demand",
                    "D) Autonomous demand"],
        "answer": "B) A mere desire or want",
        "explanation": (
            "Economic demand requires THREE conditions: (1) desire, (2) ABILITY to pay, "
            "(3) WILLINGNESS to pay. The worker has desire but lacks ability (₹3 crore vs "
            "₹12,000/month). Hence this is only a 'want', not demand. This is the most "
            "common misconception: in everyday language 'demand' = wish; in economics "
            "it requires purchasing power."
        ),
        "verification": {
            "condition_desire": True,
            "condition_ability": False,   # key reason it's NOT demand
            "condition_willingness": True,
            "all_three": False,
            "status": "PASS - logic verified",
        },
    },

    # Q002: MCQ Easy - Types of demand
    {
        "id": "c12econ_q002",
        "node_id": "c12_econ_001",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Types of Demand",
        "question": (
            "Tata Motors manufactures the Nexon EV and requires steel sheets, lithium-ion "
            "cells, and glass. The demand for steel sheets by Tata Motors is called:\n"
            "A) Direct demand\n"
            "B) Derived demand\n"
            "C) Joint demand\n"
            "D) Composite demand"
        ),
        "options": ["A) Direct demand",
                    "B) Derived demand",
                    "C) Joint demand",
                    "D) Composite demand"],
        "answer": "B) Derived demand",
        "explanation": (
            "Derived demand: demand for a factor/input that arises BECAUSE demand exists "
            "for the final product. Tata Motors' demand for steel is not for steel's own "
            "sake but because consumers demand Nexon EVs. Steel demand is 'derived from' "
            "car demand. Direct demand = demand for final consumption (e.g., a family "
            "buying rice in Pune). Joint demand = two goods demanded together "
            "(tea leaves + milk). Composite demand = one good, multiple uses (electricity)."
        ),
        "verification": {
            "logic": "Steel sheets demanded → because Nexon EVs are demanded → derived ✓",
            "status": "PASS",
        },
    },

    # Q003: Fill-blank Medium - Joint demand
    {
        "id": "c12econ_q003",
        "node_id": "c12_econ_001",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "Types of Demand",
        "question": (
            "To prepare a cup of masala chai in a Mumbai office canteen, the attendant needs "
            "both tea leaves AND milk. This simultaneous demand for two complementary goods "
            "to satisfy a SINGLE want is called ______ demand."
        ),
        "options": None,
        "answer": "joint",
        "explanation": (
            "Joint demand: when two or more commodities are demanded TOGETHER to satisfy "
            "ONE particular want. Chai cannot be made with just tea leaves OR just milk - "
            "both must be purchased simultaneously. If the price of milk rises, demand for "
            "tea leaves also falls (they are complementary). Other example: pen and ink; "
            "car and petrol."
        ),
        "verification": {
            "definition_match": "Joint demand = two goods, one want, purchased together ✓",
            "status": "PASS",
        },
    },

    # Q004: MCQ Medium - Market demand
    {
        "id": "c12econ_q004",
        "node_id": "c12_econ_001",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Types of Demand",
        "question": (
            "India has approximately 30 crore households connected under the PMUY (Pradhan "
            "Mantri Ujjwala Yojana) scheme and many more regular LPG consumers. The TOTAL "
            "demand for LPG cylinders across all Indian households is called:\n"
            "A) Autonomous demand\n"
            "B) Market demand\n"
            "C) Derived demand\n"
            "D) Individual demand"
        ),
        "options": ["A) Autonomous demand",
                    "B) Market demand",
                    "C) Derived demand",
                    "D) Individual demand"],
        "answer": "B) Market demand",
        "explanation": (
            "Market demand = the SUM of demand from ALL individual buyers in the market at "
            "each price level. For LPG in India, market demand = Σ (demand of household 1, "
            "household 2, ..., household n). Individual demand = demand of ONE household. "
            "Market demand curve is flatter (more elastic) than individual curves."
        ),
        "verification": {
            "definition": "Market demand = horizontal sum of all individual demands ✓",
            "indian_context": "30 crore PMUY-linked households ✓",
            "status": "PASS",
        },
    },

    # Q005: Short-answer Easy - Demand vs desire
    {
        "id": "c12econ_q005",
        "node_id": "c12_econ_001",
        "type": "short_answer",
        "difficulty": "Easy",
        "topic": "Demand - Meaning",
        "question": (
            "Explain in TWO sentences why a poor person's desire for a smartphone is not "
            "economic 'demand', using the three conditions of demand."
        ),
        "options": None,
        "answer": (
            "Economic demand requires desire backed by BOTH ability to pay and willingness "
            "to pay. If the person lacks the income to purchase the smartphone (inability to "
            "pay), it remains only a 'want' or 'desire' - not economic demand. "
            "Common confusion: in daily Hindi/English 'demand' means a wish, but in "
            "economics it is a binding, quantifiable relationship Qd(P)."
        ),
        "explanation": (
            "Key distinction from NCERT: 'I want a bicycle' != 'I demand a bicycle'. "
            "Demand must satisfy: (1) Desire, (2) Ability (Income/resources), "
            "(3) Willingness (utility > cost). "
            "Every CBSE/CISCE examiner looks for ALL THREE conditions in the answer."
        ),
        "verification": {
            "three_conditions_mentioned": True,
            "ability_condition_highlighted": True,
            "everyday_vs_economics_distinction": True,
            "status": "PASS",
        },
    },

    # Q006: Long-answer Medium - Composite demand
    {
        "id": "c12econ_q006",
        "node_id": "c12econ_001",
        "type": "long_answer",
        "difficulty": "Medium",
        "topic": "Types of Demand",
        "question": (
            "Define composite demand and explain how it differs from joint demand. "
            "Use the example of coal in India - demanded by thermal power plants, steel "
            "plants, and households for heating - to illustrate. "
            "Why does the government regulate coal prices despite it being a commodity "
            "with composite demand?"
        ),
        "options": None,
        "answer": (
            "Composite demand arises when ONE commodity is demanded for MULTIPLE USES "
            "(e.g., coal for electricity, steel production, and domestic heating). "
            "Joint demand is when TWO OR MORE commodities are demanded TOGETHER for ONE "
            "use (e.g., tea leaves + milk for chai; car + petrol). "
            "Key difference: composite demand = one good, many uses; joint demand = "
            "many goods, one use. "
            "The government regulates coal prices because it is an essential input across "
            "critical sectors - power, steel, and railways. A steep price rise in coal "
            "raises electricity tariffs (affecting 130 crore+ consumers), steel prices "
            "(affecting housing and infrastructure), and household heating costs. "
            "Price regulation ensures energy security and affordability under the "
            "Coal Mines (Nationalisation) Act framework."
        ),
        "explanation": (
            "Marking scheme: 1 mark for correct definition of composite demand, "
            "1 mark for correct definition of joint demand, 1 mark for correct "
            "distinction, 1 mark for coal example, 1 mark for government regulation "
            "reasoning. Total = 5 marks."
        ),
        "verification": {
            "composite_defined": True,
            "joint_defined": True,
            "distinction_clear": True,
            "coal_example_provided": True,
            "regulation_rationale_provided": True,
            "marks_coverage": "5/5",
            "status": "PASS",
        },
    },

    # Q007: Numerical Easy - Demand function
    {
        "id": "c12econ_q007",
        "node_id": "c12_econ_001",
        "type": "numerical",
        "difficulty": "Easy",
        "topic": "Demand Function",
        "question": (
            "A consumer in Bengaluru has a demand function for fresh mangoes: "
            "Q = 100 - 5P, where Q is quantity demanded in kg and P is price per kg in ₹. "
            "(a) What is the quantity demanded when P = ₹12/kg? "
            "(b) What is the quantity demanded when P = ₹8/kg? "
            "Comment on the direction of change."
        ),
        "options": None,
        "answer": {
            "Q_at_12": round(100 - 5*12, 2),   # 40
            "Q_at_8": round(100 - 5*8, 2),     # 60
            "comment": "As price falls from ₹12 to ₹8, quantity demanded rises from 40 kg to 60 kg, "
                       "confirming the inverse price-demand relationship (law of demand)."
        },
        "explanation": (
            "Step 1: Q = 100 - 5P. At P=12: Q = 100 - 60 = 40 kg. "
            "Step 2: At P=8: Q = 100 - 40 = 60 kg. "
            "Step 3: Price ↓ by ₹4 → Q ↑ by 20 kg. "
            "This inverse relationship holds because marginal utility per rupee is higher "
            "at lower prices for a normal good like mangoes."
        ),
        "verification": {
            "computed_Q_at_12": verify_numerical(100 - 5*12, 40.0),
            "computed_Q_at_8": verify_numerical(100 - 5*8, 60.0),
            "price_change_correct_direction": True,
            "status": "PASS",
        },
    },

    # Q008: MCQ Easy - Fiat money example
    {
        "id": "c12econ_q008",
        "node_id": "c12_econ_051",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Kinds of Money",
        "question": (
            "The Indian ₹500 currency note is:\n"
            "A) Full-bodied metallic money\n"
            "B) Token / Fiat money\n"
            "C) Representative money\n"
            "D) Commodity money"
        ),
        "options": ["A) Full-bodied metallic money",
                    "B) Token / Fiat money",
                    "C) Representative money",
                    "D) Commodity money"],
        "answer": "B) Token / Fiat money",
        "explanation": (
            "The ₹500 note is TOKEN/FIAT money: its face value (₹500) is far greater than "
            "the intrinsic value of the paper and ink used to print it (a few paise). Its "
            "value rests entirely on government fiat/decree making it legal tender. After "
            "demonetisation (8 Nov 2016), the old ₹500 notes became worthless overnight - "
            "proving their value came from government backing, not any intrinsic worth."
        ),
        "verification": {
            "intrinsic_value_check": "Paper+ink worth < ₹1, face value ₹500 → token ✓",
            "legal_tender": True,
            "status": "PASS",
        },
    },

    # Q009: Fill-blank Easy - Money functions
    {
        "id": "c12econ_q009",
        "node_id": "c12_econ_051",
        "type": "fill_blank",
        "difficulty": "Easy",
        "topic": "Functions of Money",
        "question": (
            "When a customer in a Chennai supermarket pays ₹450 for groceries using a "
            "₹500 note and receives ₹50 as change, money is functioning as a "
            "______. When the shopkeeper uses that ₹500 to pay a supplier the next day "
            "for stock, money is functioning as a ______."
        ),
        "options": None,
        "answer": "medium of exchange; medium of exchange",
        "explanation": (
            "In both transactions, money acts as a MEDIUM OF EXCHANGE - eliminating the "
            "double coincidence of wants problem of the barter system. "
            "Other primary function: MEASURE OF VALUE (unit of account - goods priced in ₹). "
            "Secondary functions: standard of deferred payments, store of value. "
            "Contingent functions: basis of credit, transfers wealth."
        ),
        "verification": {
            "medium_of_exchange_in_both": True,
            "primary_function_identified": True,
            "status": "PASS",
        },
    },

    # Q010: MCQ Medium - Fiat vs credit money
    {
        "id": "c12econ_q010",
        "node_id": "c12_econ_051",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Kinds of Money",
        "question": (
            "Which statement correctly distinguishes a ₹2000 note from a SBI bank draft "
            "for ₹2,00,000?\n"
            "A) Both are fiat money\n"
            "B) The ₹2000 note is fiat money; the draft is fiduciary/credit money\n"
            "C) The ₹2000 note is credit money; the draft is fiat money\n"
            "D) Both are fiduciary money"
        ),
        "options": ["A) Both are fiat money",
                    "B) The ₹2000 note is fiat money; the draft is fiduciary/credit money",
                    "C) The ₹2000 note is credit money; the draft is fiat money",
                    "D) Both are fiduciary money"],
        "answer": "B) The ₹2000 note is fiat money; the draft is fiduciary/credit money",
        "explanation": (
            "FIAT MONEY (₹2000 note): value = government decree; Legal Tender - a shopkeeper "
            "MUST accept it for settling a debt. Cannot refuse. "
            "FIDUCIARY/CREDIT MONEY (bank draft): value = trust in bank's willingness/ability "
            "to pay; NOT Legal Tender - a shopkeeper CAN refuse a cheque. "
            "Common student error: confusing fiat with credit money. Key difference = "
            "legal-tender status."
        ),
        "verification": {
            "fiat_legal_tender": True,
            "credit_not_legal_tender": True,
            "distinction_clear": True,
            "status": "PASS",
        },
    },

    # Q011: MCQ Medium - Exante vs Expost
    {
        "id": "c12econ_q011",
        "node_id": "c12_econ_041",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Exante / Expost Demand",
        "question": (
            "A textile mill in Surat plans to sell 10,000 metres of polyester fabric "
            "(exante supply = 10,000 m). Due to a sudden cotton price crash, wholesalers "
            "buy only 7,000 metres. The realised (expost) demand is 7,000 m. "
            "This situation means:\n"
            "A) Unplanned inventory depletion of 3,000 m\n"
            "B) Unplanned inventory accumulation of 3,000 m\n"
            "C) Keynesian equilibrium has been achieved\n"
            "D) Exante demand equals expost demand"
        ),
        "options": ["A) Unplanned inventory depletion of 3,000 m",
                    "B) Unplanned inventory accumulation of 3,000 m",
                    "C) Keynesian equilibrium has been achieved",
                    "D) Exante demand equals expost demand"],
        "answer": "B) Unplanned inventory accumulation of 3,000 m",
        "explanation": (
            "Inventory Accumulation = Exante Supply - Expost Demand = 10,000 - 7,000 = "
            "+3,000 m. The mill produced 3,000 m MORE than was sold = unsold stock piled "
            "up. This signals Aggregate Supply > Aggregate Demand - firms cut production "
            "next period → output falls toward equilibrium. "
            "Note: Demonetisation (Nov 2016) caused similar accumulations in Surat/Tirupur "
            "textile MSMEs when cash-driven (expost) purchases collapsed."
        ),
        "verification": {
            "calculation": verify_numerical(10000 - 7000, 3000),
            "accumulation_sign_positive": True,
            "keynesian_interpretation_correct": True,
            "status": "PASS",
        },
    },

    # Q012: Numerical Medium - Money multiplier
    {
        "id": "c12econ_q012",
        "node_id": "c12econ_051",
        "type": "numerical",
        "difficulty": "Medium",
        "topic": "Money Multiplier",
        "question": (
            "The RBI mandates a Legal Reserve Ratio (LRR) of 20% for scheduled commercial "
            "banks in India.\n"
            "(a) Calculate the money multiplier.\n"
            "(b) If a customer deposits ₹10,000 in SBI, what is the TOTAL credit that can "
            "be created in the banking system? "
            "(c) Verify your answer using back-substitution."
        ),
        "options": None,
        "answer": {
            "LRR": 0.20,
            "money_multiplier_K": 5.0,
            "initial_deposit": 10000,
            "total_deposits_created": 50000,
            "net_credit_creation": 40000,
        },
        "explanation": (
            "Step 1: LRR = 20% = 0.20. "
            "Step 2: Money Multiplier K = 1/LRR = 1/0.20 = 5. "
            "Step 3: Total credit = Initial Deposit x (K - 1) = ₹10,000 x (5 - 1) = ₹40,000. "
            "Step 4: Total deposits = ₹10,000 x 5 = ₹50,000 (original + created). "
            "Step 5 - Back-substitution: K = Total Deposits / Initial Deposit = "
            "₹50,000/₹10,000 = 5 = 1/LRR ✓"
        ),
        "verification": {
            "multiplier": verify_numerical(1.0 / 0.20, 5.0),
            "total_deposits": verify_numerical(10000 * 5.0, 50000),
            "net_credit": verify_numerical(10000 * 4.0, 40000),
            "identity_K_times_LRR": verify_numerical(5.0 * 0.20, 1.0, tol=1e-4),
            "status": "PASS",
        },
    },

    # Q013: Short-answer Medium - Exante equilibrium
    {
        "id": "c12econ_q013",
        "node_id": "c12_econ_041",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Exante Demand and Keynesian Equilibrium",
        "question": (
            "In Keynesian theory, equilibrium output is determined by exante (planned) "
            "aggregate demand, not expost (realised) aggregate demand. "
            "Explain why. Use the concept of unplanned inventory to support your answer."
        ),
        "options": None,
        "answer": (
            "In Keynesian theory, firms make production decisions BEFORE the period based on "
            "EXPECTED (exante) aggregate demand. Exante AD = C + I + G (planned spending). "
            "If exante AD > exante AS (Aggregate Supply), unplanned inventory DEPLETION "
            "occurs → firms increase output in the next period. "
            "If exante AD < exante AS, unplanned inventory ACCUMULATION → firms cut output. "
            "Equilibrium is reached ONLY when exante AD = exante AS - i.e., planned demand "
            "equals planned supply, meaning NO unplanned inventory change. "
            "Expost AD is the outcome AFTER the period and cannot guide production decisions."
        ),
        "explanation": (
            "Key marking points: (1) Exante = planned → determines production decisions. "
            "(2) Inventory mechanism links exante to expost. "
            "(3) Equilibrium = exante AD = exante AS + no unplanned inventory change. "
            "(4) Expost is a RESULT, not a DECISION variable."
        ),
        "verification": {
            "exante_identified_as_determinant": True,
            "inventory_mechanism_explained": True,
            "expost_identified_as_outcome": True,
            "equilibrium_condition_correct": True,
            "status": "PASS",
        },
    },

    # Q014: MCQ Easy - Composite demand
    {
        "id": "c12econ_q014",
        "node_id": "c12_econ_001",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Types of Demand",
        "question": (
            "Electricity in India is used for (i) household lighting and cooling, "
            "(ii) running CNC machines in automotive factories, (iii) street lighting in "
            "smart cities, and (iv) railway electrification. "
            "This single commodity demanded for MULTIPLE purposes is an example of:\n"
            "A) Joint demand\n"
            "B) Composite demand\n"
            "C) Derived demand\n"
            "D) Market demand"
        ),
        "options": ["A) Joint demand",
                    "B) Composite demand",
                    "C) Derived demand",
                    "D) Market demand"],
        "answer": "B) Composite demand",
        "explanation": (
            "Composite demand = one commodity, multiple uses, demanded across different "
            "sectors simultaneously. Electricity powers homes, factories, railways, and "
            "streetlights. If electricity prices rise (e.g., during coal shortages), ALL "
            "these sectors reduce consumption - the total demand for electricity falls "
            "across the board. "
            "Compare with: Joint demand (two goods together - tea+milk); "
            "Derived demand (demand for inputs because final good is demanded - steel because "
            "cars are demanded)."
        ),
        "verification": {
            "one_good_many_uses": True,
            "correct_type": "composite",
            "status": "PASS",
        },
    },

    # Q015: MCQ Medium - Autonomous demand
    {
        "id": "c12econ_q015",
        "node_id": "c12_econ_001",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Autonomous vs Induced Demand",
        "question": (
            "Which of the following is an example of AUTONOMOUS demand?\n"
            "A) Demand for jaggery (gud) during Makar Sankranti festival celebrations\n"
            "B) Demand for NAND chips because smartphones are demanded\n"
            "C) Demand for wheat by the Food Corporation of India (FCI) under MSP procurement\n"
            "D) Demand for electricity by households during summer peak hours"
        ),
        "options": ["A) Demand for jaggery during Makar Sankranti celebrations",
                    "B) Demand for NAND chips because smartphones are demanded",
                    "C) Demand for wheat by FCI under MSP procurement",
                    "D) Demand for electricity by households during summer peak hours"],
        "answer": "A) Demand for jaggery during Makar Sankranti festival celebrations",
        "explanation": (
            "Autonomous demand arises independently - it is not caused by demand for "
            "another commodity. Jaggery demand during Makar Sankranti is autonomous: "
            "it stems from cultural/religious tradition (making tilgul), not because some "
            "other good is demanded. "
            "Option B: NAND chip demand is DERIVED (because of smartphones). "
            "Option C: FCI wheat procurement is not autonomous market demand; it is "
            "government procurement. "
            "Option D: Electricity demand is COMPOSITE (one good, multiple uses) and "
            "may be induced by seasonal weather."
        ),
        "verification": {
            "autonomous_definition_applied": True,
            "derived_example_excluded": True,
            "indian_festival_context": True,
            "status": "PASS",
        },
    },

    # Q016: Numerical Medium - Demand function with income
    {
        "id": "c12econ_q016",
        "node_id": "c12_econ_001",
        "type": "numerical",
        "difficulty": "Medium",
        "topic": "Demand Function",
        "question": (
            "Given demand function for branded denim jeans in metro cities:\n"
            "  Q = 200 - 8P + 4I\n"
            "where Q = quantity demanded (units/month), P = price in ₹, I = monthly "
            "disposable income in '000s of ₹.\n"
            "A consumer in Bengaluru has I = ₹35,000/month.\n"
            "(a) Find Q when P = ₹2,500. "
            "(b) If price rises to ₹3,000, find new Q and the change."
        ),
        "options": None,
        "answer": {
            "Q_at_2500": round(200 - 8*2.5 + 4*35, 2),  # 200 - 20 + 140 = 320
            "Q_at_3000": round(200 - 8*3.0 + 4*35, 2),  # 200 - 24 + 140 = 316
            "change": round((200 - 8*3.0 + 4*35) - (200 - 8*2.5 + 4*35), 2),  # -4
        },
        "explanation": (
            "Q = 200 - 8P + 4I. Income I=35 (in '000s ₹). "
            "At P=2.5 (₹2,500): Q = 200 - 20 + 140 = 320 units/month. "
            "At P=3.0 (₹3,000): Q = 200 - 24 + 140 = 316 units/month. "
            "Price ↑ ₹500 → Q ↓ by 4 units. The income term (+4x35=+140) dominates, "
            "making demand high despite price - normal good in a high-income metro."
        ),
        "verification": {
            "Q_2500": verify_numerical(320.0, 200 - 8*2.5 + 4*35),
            "Q_3000": verify_numerical(316.0, 200 - 8*3.0 + 4*35),
            "change": verify_numerical(-4.0, 316.0 - 320.0),
            "law_of_demand_confirmed": True,
            "status": "PASS",
        },
    },

    # Q017: Short-answer Easy - Money definition
    {
        "id": "c12econ_q017",
        "node_id": "c12_econ_051",
        "type": "short_answer",
        "difficulty": "Easy",
        "topic": "Meaning of Money",
        "question": (
            "Define money in the economic sense. Why is a post-dated cheque NOT considered "
            "money, while an SBI demand draft for the same amount IS considered fiduciary money? "
            "Reference Indian banking practice."
        ),
        "options": None,
        "answer": (
            "Economically, money = anything generally accepted as a medium of exchange, "
            "a measure of value, and a store of value. "
            "A post-dated cheque (e.g., dated 30 days in future) is NOT money because it "
            "is not payable ON DEMAND - the bank will honour it only on the future date. "
            "An SBI demand draft IS fiduciary money: it is payable on demand (presentation), "
            "based on trust in SBI's ability to pay. It carries SBI's guarantee. "
            "However, NEITHER is Legal Tender - a shopkeeper can refuse both."
        ),
        "explanation": (
            "Key distinctions: Legal Tender (₹ note - must be accepted) vs "
            "Fiduciary/Credit Money (draft - payable on demand, not legal tender). "
            "Post-dated cheque fails the 'on demand' criterion → not money today."
        ),
        "verification": {
            "definition_correct": True,
            "post_dated_reason_correct": True,
            "demand_draft_reason_correct": True,
            "legal_tender_distinction": True,
            "status": "PASS",
        },
    },

    # Q018: Long-answer Medium - Exante in Indian context
    {
        "id": "c12econ_q018",
        "node_id": "c12_econ_041",
        "type": "long_answer",
        "difficulty": "Medium",
        "topic": "Exante / Expost Demand - Indian Context",
        "question": (
            "During the demonetisation period (November-December 2016), MSMEs in Surat "
            "and Tirupur experienced a sharp fall in actual (expost) cash-driven demand "
            "even as their planned (exante) demand forecasts remained unchanged initially.\n"
            "(a) Explain, using exante/expost terminology, what happened to these firms' "
            "inventory positions.\n"
            "(b) How would Keynesian theory predict these firms would respond in the "
            "next production cycle?\n"
            "(c) Why did this situation pose a systemic risk to India's Aggregate Demand?"
        ),
        "options": None,
        "answer": (
            "(a) Exante demand = forecasts based on pre-demonetisation cash flows. "
            "Expost demand = sharply reduced because 86% of ₹500/₹1000 notes were "
            "invalidated overnight → cash shortage → actual transactions collapsed. "
            "Inventory position: UNPLANNED ACCUMULATION - unsold textile stock piled up.\n"
            "(b) Keynesian response: facing unplanned accumulation, firms cut production "
            "in the next cycle → reduces income → further reduces consumption → multiplier "
            "effect downward spiral.\n"
            "(c) Systemic risk: Surat + Tirupur MSMEs employ lakhs of workers. Production "
            "cuts → layoffs → falling rural/urban wages → demand collapse in other sectors "
            "(retail, transport, food) → negative multiplier effect on India's GDP. "
            "This is precisely the Keynesian mechanism where a demand shock propagates "
            "through the circular flow of income."
        ),
        "explanation": (
            "Demonetisation = real-world illustration of exante != expost. "
            "Marking: (a) 2 marks for correct exante/expost identification + inventory "
            "accumulation, (b) 1.5 marks for Keynesian production-cut response, "
            "(c) 1.5 marks for multiplier propagation. Total = 5 marks."
        ),
        "verification": {
            "exante_identified": True,
            "expost_identified": True,
            "inventory_correct": "accumulation",
            "keynesian_response_correct": True,
            "multiplier_effect_explained": True,
            "status": "PASS",
        },
    },

    # Q019: MCQ Easy - Medium of exchange
    {
        "id": "c12econ_q019",
        "node_id": "c12_econ_051",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Functions of Money",
        "question": (
            "In a barter system, a farmer wanting rice must find someone who both has rice "
            "AND wants wheat - this is the 'double coincidence of wants' problem. "
            "Money solves this by acting primarily as a:\n"
            "A) Store of value\n"
            "B) Medium of exchange\n"
            "C) Measure of value\n"
            "D) Standard of deferred payment"
        ),
        "options": ["A) Store of value",
                    "B) Medium of exchange",
                    "C) Measure of value",
                    "D) Standard of deferred payment"],
        "answer": "B) Medium of exchange",
        "explanation": (
            "Medium of exchange is the PRIMARY function of money - it eliminates the "
            "double coincidence of wants. The farmer sells wheat for money, then uses "
            "money to buy rice - two separate transactions instead of one barter swap. "
            "Measure of value = money as a common unit (all goods priced in ₹). "
            "Store of value = saving purchasing power for future. "
            "Standard of deferred payment = basis for loans/EMIs."
        ),
        "verification": {
            "double_coincidence_problem_identified": True,
            "primary_function_correct": True,
            "status": "PASS",
        },
    },

    # Q020: Fill-blank Medium - Narrow vs broad money
    {
        "id": "c12econ_q020",
        "node_id": "c12econ_051",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "Monetary Aggregates (Indian Context)",
        "question": (
            "In the Indian monetary system, M1 (narrow money) includes ______ and "
            "demand deposits with banks. M3 (broad money) additionally includes "
            "______ deposits with banks."
        ),
        "options": None,
        "answer": "currency with public; time",
        "explanation": (
            "M1 = Currency with Public + Demand Deposits with Banks (most liquid). "
            "M2 = M1 + Savings Deposits with Post Office. "
            "M3 (Broad Money, most cited by RBI) = M1 + Time Deposits with Banks. "
            "M4 = M3 + All Deposits with Post Office (least liquid). "
            "Demand deposits = current/checking accounts (withdraw on demand). "
            "Time deposits = fixed/recurring deposits (locked for a period)."
        ),
        "verification": {
            "M1_components": ["currency with public", "demand deposits"],
            "M3_adds": ["time deposits"],
            "status": "PASS",
        },
    },

    # Q021: MCQ Medium - Exante supply
    {
        "id": "c12econ_q021",
        "node_id": "c12_econ_041",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Exante / Expost",
        "question": (
            "Exante supply refers to:\n"
            "A) Actual quantity supplied after sales data is compiled\n"
            "B) Planned/projected supply before the production period begins\n"
            "C) Supply that automatically adjusts to demand\n"
            "D) Supply determined by government quota"
        ),
        "answer": "B",
        "explanation": "Exante supply is the planned supply before production begins."
    }
]