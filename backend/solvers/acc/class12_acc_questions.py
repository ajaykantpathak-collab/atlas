"""
ISC Class 12 Accountancy – Deterministic Question Generator
50% competency-based (NEP 2020), 50% standard problems.
Indian context throughout. Pure Python + SymPy randomness. No LLM.
"""

import random
import yaml
import os
from typing import Dict, List, Tuple, Any
from decimal import Decimal, ROUND_HALF_UP

from class12_acc_solver import (
    solve, D, round2,
    SacrificeRatioSolver, GoodwillSuperProfitSolver, RevaluationSolver,
    ShareIssueSolver, ForfeitureSolver, FinancialStatementsSolver,
    CashFlowSolver, RatioAnalysisSolver,
)
try:
    from step_types_acc_c12 import *
except ImportError:
    pass  # STEP_TYPES available if imported; step_types loaded via yaml
try:
    import problem_types_acc_c12 as pt_c12
except ImportError:
    pt_c12 = None

random.seed()  # caller should set seed for reproducibility

# ──────────────────────────────────────────────────────────────────────────────
# Indian Context Data
# ──────────────────────────────────────────────────────────────────────────────
INDIA = {
    "cities": ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune", "Hyderabad", "Ahmedabad", "Jaipur", "Surat"],
    "companies": [
        "Tata Motors Ltd.", "Reliance Industries Ltd.", "Infosys Ltd.", "Wipro Ltd.",
        "TCS Ltd.", "ICICI Bank Ltd.", "HDFC Bank Ltd.", "Sun Pharma Ltd.",
        "Bajaj Auto Ltd.", "Mahindra & Mahindra Ltd.", "Adani Enterprises Ltd.",
        "Maruti Suzuki Ltd.", "SBI Ltd.", "ITC Ltd.", "ONGC Ltd.",
    ],
    "partners_male": ["Rahul Sharma", "Vikram Mehta", "Arjun Patel", "Rohan Gupta",
                       "Karan Singh", "Amit Joshi", "Suresh Iyer", "Deepak Reddy"],
    "partners_female": ["Priya Sharma", "Neha Patel", "Ananya Iyer", "Pooja Reddy",
                        "Kavya Singh", "Ritu Joshi", "Sneha Mehta", "Divya Gupta"],
    "members": ["Mr. Rahul Verma", "Ms. Priya Nair", "Mr. Arjun Khanna", "Ms. Sneha Kapoor",
                "Mr. Vikram Rao", "Ms. Anjali Desai", "Mr. Karan Pillai"],
}


def indian_name(gender: str = "any") -> str:
    pool = INDIA["partners_male"] + INDIA["partners_female"] if gender == "any" else (
        INDIA["partners_male"] if gender == "male" else INDIA["partners_female"]
    )
    return random.choice(pool)


def indian_company() -> str:
    return random.choice(INDIA["companies"])


def indian_city() -> str:
    return random.choice(INDIA["cities"])


# ──────────────────────────────────────────────────────────────────────────────
# Parameter randomizers (deterministic with seed)
# ──────────────────────────────────────────────────────────────────────────────
def rand_ratio(parts: int) -> List[int]:
    """Return a random ratio that sums to 100 (for percentages) or any LCM."""
    vals = [random.randint(1, 50) for _ in range(parts)]
    total = sum(vals)
    return vals


def old_new_ratios() -> Tuple[List[int], List[int]]:
    """Generate valid old and new ratios."""
    old = rand_ratio(3)
    old_total = sum(old)
    new = rand_ratio(3)
    new_total = sum(new)
    return old, new


# ──────────────────────────────────────────────────────────────────────────────
# Problem Generators
# ──────────────────────────────────────────────────────────────────────────────
def gen_sacrifice_ratio(seed: int = None) -> Dict[str, Any]:
    if seed is not None:
        random.seed(seed)
    old_r = rand_ratio(3)
    new_r = rand_ratio(3)
    old_A, old_B, old_C = [v / sum(old_r) for v in old_r]
    new_A, new_B, new_C = [v / sum(new_r) for v in new_r]

    # Round to 2 decimal places
    def r2(x):
        return float(D(str(x)).quantize(D("0.01")))

    old_A, old_B, old_C = r2(old_A), r2(old_B), r2(old_C)
    new_A, new_B, new_C = r2(new_A), r2(new_B), r2(new_C)

    # Normalize to sum 1.0
    tot = old_A + old_B + old_C
    old_A, old_B, old_C = r2(old_A / tot), r2(old_B / tot), r2(old_C / tot)
    tot = new_A + new_B + new_C
    new_A, new_B, new_C = r2(new_A / tot), r2(new_B / tot), r2(new_C / tot)

    names = random.sample(INDIA["partners_male"] + INDIA["partners_female"], 4)
    A, B, C, D_name = names[0], names[1], names[2], names[3]

    old_r_str = f"{int(old_A*100)}:{int(old_B*100)}:{int(old_C*100)}"
    new_r_str = f"{int(new_A*100)}:{int(new_B*100)}:{int(new_C*100)}"

    question = (
        f"{A}, {B} and {C} are partners sharing profits and losses in the ratio {old_r_str}. "
        f"{D_name} is admitted as a new partner and the new profit-sharing ratio becomes {new_r_str}. "
        "Calculate the sacrifice ratio of the old partners."
    )

    result = solve("partnership_sacrifice_ratio", {
        "old_A": old_A, "old_B": old_B, "old_C": old_C,
        "new_A": new_A, "new_B": new_B, "new_C": new_C,
    })

    answer_text = (
        f"Sacrifice of {A} = {old_A} − {new_A} = {float(D(str(old_A))-D(str(new_A))):.2f}; "
        f"Sacrifice of {B} = {old_B} − {new_B} = {float(D(str(old_B))-D(str(new_B))):.2f}; "
        f"Sacrifice of {C} = {old_C} − {new_C} = {float(D(str(old_C))-D(str(new_C))):.2f}; "
        f"Sacrifice Ratio = {result['answer']['sacrifice_ratio']}"
    )

    return {
        "problem_id": f"ACC-C12-{random.randint(1000,9999)}",
        "type": "standard",
        "topic": "Partnership – Sacrifice Ratio",
        "difficulty": "easy",
        "question": question,
        "answer": answer_text,
        "steps": result.get("steps", []),
        "numeric_answer": result["answer"],
        "misconception_tags": ["confuses_sacrifice_with_old_ratio", "forgets_sign_convention"],
        "bloom_level": "Apply",
        "competency_flags": ["standard"],
        "context": "Indian partnership firm",
    }


def gen_goodwill_super_profit(seed: int = None) -> Dict[str, Any]:
    if seed is not None:
        random.seed(seed)

    cap = random.randint(500000, 5000000)
    nrr = random.randint(8, 15)
    avg_p = int(cap * random.uniform(0.12, 0.30))
    yrs = random.randint(2, 5)
    company = indian_company()
    city = indian_city()

    question = (
        f"{company} is a partnership firm operating in {city}. The firm has a capital employed of Rs {cap:,}. "
        f"The normal rate of return is {nrr}%. The average annual profits are Rs {avg_p:,}. "
        f"Calculate the value of goodwill using the Super Profit method at {yrs} years' purchase."
    )

    result = solve("goodwill_super_profit", {
        "capital_employed": cap, "normal_rate": nrr,
        "average_profit": avg_p, "years_purchase": yrs,
    })

    gw = result["answer"]["goodwill"]
    answer_text = (
        f"Normal Profit = Rs {cap:,} × {nrr}% = Rs {result['answer']['normal_profit']:,.0f}; "
        f"Super Profit = Rs {avg_p:,} − Rs {result['answer']['normal_profit']:,.0f} = Rs {result['answer']['super_profit']:,.0f}; "
        f"Goodwill = Rs {result['answer']['super_profit']:,.0f} × {yrs} = Rs {gw:,.0f}"
    )

    return {
        "problem_id": f"ACC-C12-{random.randint(1000,9999)}",
        "type": "standard",
        "topic": "Goodwill – Super Profit Method",
        "difficulty": "medium",
        "question": question,
        "answer": answer_text,
        "steps": result.get("steps", []),
        "numeric_answer": {"goodwill": gw},
        "misconception_tags": ["uses_avg_profit_directly", "forgets_normal_profit"],
        "bloom_level": "Apply",
        "competency_flags": ["standard"],
        "context": f"{company}, {city}",
    }


def gen_share_issue(seed: int = None) -> Dict[str, Any]:
    if seed is not None:
        random.seed(seed)

    company = indian_company()
    city = indian_city()
    face = random.choice([10, 100])
    shares = random.randint(5000, 100000)
    premium = random.choice([0, 5, 10, 20, 50]) if face == 10 else random.choice([0, 10, 25, 50, 100])
    underwrite = random.choice([0, 2, 3, 5])
    applied = int(shares * random.uniform(1.0, 1.5))

    question = (
        f"{company} in {city} issued {shares:,} equity shares of Rs {face} each at a premium of Rs {premium}. "
        f"Applications were received for {applied:,} shares. The shares were underwritten at {underwrite}%. "
        f"The shares were issued at par, premium and with the following terms: "
        f"Application money Rs {face//4} per share, Allotment Rs {face//4} per share (excluding premium), "
        f"First Call Rs {face//4} per share. "
        "Pass journal entries in the books of the company."
    )

    result = solve("share_issue", {
        "face_value": face, "shares_issued": shares, "premium": premium,
        "application_money": face // 4, "allotment_money": face // 4,
        "first_call": face // 4, "underwriting_pct": underwrite,
    })

    answer_text = (
        f"Share Capital = Rs {result['answer']['share_capital']:,.0f}; "
        f"Securities Premium = Rs {result['answer']['securities_premium']:,.0f}; "
        f"Underwriting Commission = Rs {result['answer']['underwriting_commission']:,.0f}; "
        f"Total Cash Received = Rs {result['answer']['total_cash_received']:,.0f}"
    )

    return {
        "problem_id": f"ACC-C12-{random.randint(1000,9999)}",
        "type": random.choice(["standard", "competency"]),
        "topic": "Company Accounts – Issue of Shares",
        "difficulty": "medium",
        "question": question,
        "answer": answer_text,
        "steps": result.get("steps", []),
        "numeric_answer": result["answer"],
        "misconception_tags": ["credits_premium_to_share_cap", "forgets_underwriting_commission"],
        "bloom_level": "Apply",
        "competency_flags": [random.choice(["standard", "competency"])],
        "context": f"{company}, {city}",
    }


def gen_financial_statements(seed: int = None) -> Dict[str, Any]:
    """Generate competency-based financial statements problem."""
    if seed is not None:
        random.seed(seed)

    company = indian_company()
    city = indian_city()

    # Generate a realistic trial balance
    tb_items = [
        {"account": "Share Capital", "debit": 0, "credit": random.randint(2000000, 10000000)},
        {"account": "Reserves & Surplus", "debit": 0, "credit": random.randint(500000, 5000000)},
        {"account": "Securities Premium", "debit": 0, "credit": random.randint(100000, 1000000)},
        {"account": "Loan (Long-term)", "debit": 0, "credit": random.randint(500000, 3000000)},
        {"account": "Creditors", "debit": 0, "credit": random.randint(100000, 800000)},
        {"account": "Bills Payable", "debit": 0, "credit": random.randint(50000, 300000)},
        {"account": "Outstanding Expenses", "debit": 0, "credit": random.randint(10000, 80000)},
        {"account": "Sales", "debit": 0, "credit": random.randint(5000000, 50000000)},
        {"account": "Purchases", "debit": random.randint(2000000, 20000000), "credit": 0},
        {"account": "Opening Stock", "debit": random.randint(500000, 3000000), "credit": 0},
        {"account": "Wages", "debit": random.randint(200000, 2000000), "credit": 0},
        {"account": "Salaries", "debit": random.randint(200000, 1500000), "credit": 0},
        {"account": "Rent", "debit": random.randint(100000, 800000), "credit": 0},
        {"account": "Insurance", "debit": random.randint(20000, 200000), "credit": 0},
        {"account": "Depreciation", "debit": random.randint(50000, 500000), "credit": 0},
        {"account": "Discount Allowed", "debit": random.randint(10000, 100000), "credit": 0},
        {"account": "Interest Received", "debit": 0, "credit": random.randint(5000, 80000)},
        {"account": "Machinery", "debit": random.randint(2000000, 15000000), "credit": 0},
        {"account": "Furniture", "debit": random.randint(100000, 1000000), "credit": 0},
        {"account": "Debtors", "debit": random.randint(500000, 5000000), "credit": 0},
        {"account": "Stock (Closing)", "debit": random.randint(500000, 3000000), "credit": 0},
        {"account": "Bank", "debit": random.randint(200000, 2000000), "credit": 0},
        {"account": "Cash", "debit": random.randint(50000, 300000), "credit": 0},
        {"account": "Drawings", "debit": random.randint(50000, 500000), "credit": 0},
    ]

    adjustments = [
        {"type": "outstanding_salary", "amount": random.randint(10000, 50000),
         "description": "Salaries outstanding Rs {amt}".replace("{amt}", str(random.randint(10000, 50000)))},
        {"type": "prepaid_insurance", "amount": random.randint(5000, 30000),
         "description": "Insurance prepaid Rs {amt}".replace("{amt}", str(random.randint(5000, 30000)))},
        {"type": "depreciation", "asset": "Machinery", "amount": random.randint(50000, 200000),
         "description": "Depreciation on Machinery Rs {amt}".replace("{amt}", str(random.randint(50000, 200000)))},
        {"type": "bad_debts", "amount": random.randint(5000, 50000),
         "description": "Bad debts written off Rs {amt}".replace("{amt}", str(random.randint(5000, 50000)))},
        {"type": "interest_on_loan", "amount": random.randint(20000, 100000),
         "description": "Interest on loan Rs {amt}".replace("{amt}", str(random.randint(20000, 100000)))},
        {"type": "managers_commission", "amount": random.choice([5, 10]),
         "description": "Manager's commission at {pct}% on net profit".replace("{pct}", str(random.choice([5, 10])))},
    ]
    adjustments = adjustments[:random.randint(4, 6)]
    for a in adjustments:
        if "{amt}" in a.get("description", ""):
            a["description"] = a["description"].replace("{amt}", str(a["amount"]))
        if "{pct}" in a.get("description", ""):
            a["description"] = a["description"].replace("{pct}", str(a["amount"]))

    adj_list = "; ".join(a["description"] for a in adjustments)

    question = (
        f"The following is the Trial Balance of {company} Ltd., {city} as on March 31, 2025. "
        "Prepare Trading Account, Profit & Loss Account for the year ended March 31, 2025 "
        "and Balance Sheet as on that date after making the following adjustments:\n"
        f"{adj_list}."
    )

    result = solve("financial_statements", {"trial_balance": tb_items, "adjustments": adjustments})

    gp = result["answer"]["gross_profit"]
    np = result["answer"]["net_profit"]

    answer_text = (
        f"Gross Profit = Rs {gp:,.2f}; Net Profit = Rs {np:,.2f}. "
        "See step-by-step solution for full Trading A/c, P&L A/c and Balance Sheet."
    )

    return {
        "problem_id": f"ACC-C12-{random.randint(1000,9999)}",
        "type": "competency",
        "topic": "Financial Statements with Adjustments",
        "difficulty": "hard",
        "question": question,
        "answer": answer_text,
        "steps": result.get("steps", []),
        "numeric_answer": result["answer"],
        "misconception_tags": ["misses_adjustment", "wrong_debit_credit", "mixes_trading_and_pl"],
        "bloom_level": "Evaluate",
        "competency_flags": ["competency", "real_world", "multi_step", "data_interpretation"],
        "context": f"{company}, {city} – Financial Reporting",
    }


def gen_ratio_analysis(seed: int = None) -> Dict[str, Any]:
    if seed is not None:
        random.seed(seed)

    company = indian_company()
    city = indian_city()
    ratio_type = random.choice([
        "current_ratio", "quick_ratio", "debt_equity", "inventory_turnover",
        "debtor_turnover", "gross_profit_ratio", "net_profit_ratio",
        "return_on_capital", "return_on_equity"
    ])

    ca = random.randint(2000000, 10000000)
    inv = random.randint(500000, 5000000)
    cl = random.randint(500000, 5000000)
    debt_lt = random.randint(1000000, 8000000)
    equity = random.randint(2000000, 15000000)
    tot_assets = ca + random.randint(1000000, 10000000)
    cogs = random.randint(3000000, 20000000)
    cred_sales = random.randint(4000000, 25000000)
    avg_inv = inv * random.uniform(0.9, 1.1)
    avg_debtors = random.randint(500000, 5000000)
    gp = random.randint(1000000, 10000000)
    np = random.randint(500000, 8000000)
    sales = random.randint(8000000, 50000000)
    ebit = random.randint(800000, 10000000)

    ratio_display = {
        "current_ratio": "Current Ratio", "quick_ratio": "Quick Ratio",
        "debt_equity": "Debt-Equity Ratio", "inventory_turnover": "Inventory Turnover Ratio",
        "debtor_turnover": "Debtors' Turnover Ratio", "gross_profit_ratio": "Gross Profit Ratio",
        "net_profit_ratio": "Net Profit Ratio", "return_on_capital": "Return on Capital Employed",
        "return_on_equity": "Return on Shareholders' Equity",
    }

    question = (
        f"From the Balance Sheet and Statement of Profit & Loss of {company} Ltd., {city}, "
        f"the following information is available: Current Assets Rs {ca:,}, Current Liabilities Rs {cl:,}, "
        f"Inventory Rs {inv:,}, Long-term Debt Rs {debt_lt:,}, Equity Rs {equity:,}, "
        f"Total Assets Rs {tot_assets:,}, COGS Rs {cogs:,}, Credit Sales Rs {cred_sales:,}, "
        f"Gross Profit Rs {gp:,}, Net Profit Rs {np:,}, Net Sales Rs {sales:,}, EBIT Rs {ebit:,}, "
        f"Average Inventory Rs {avg_inv:,.0f}, Average Debtors Rs {avg_debtors:,}. "
        f"Calculate the {ratio_display[ratio_type]} and comment."
    )

    result = solve("ratio_analysis", {
        "ratio_type": ratio_type,
        "data": {
            "current_assets": ca, "current_liabilities": cl, "inventory": inv,
            "long_term_debt": debt_lt, "equity": equity, "total_assets": tot_assets,
            "cogs": cogs, "credit_sales": cred_sales, "avg_inventory": avg_inv,
            "avg_debtors": avg_debtors, "gross_profit": gp, "net_profit": np,
            "net_sales": sales, "ebit": ebit, "capital_employed": ebit / (result["answer"]["value"] / 100) if result["answer"]["value"] > 0 else equity + debt_lt,
        }
    }) if False else None  # placeholder, computed after

    data = {
        "current_assets": ca, "current_liabilities": cl, "inventory": inv,
        "long_term_debt": debt_lt, "equity": equity, "total_assets": tot_assets,
        "cogs": cogs, "credit_sales": cred_sales, "avg_inventory": avg_inv,
        "avg_debtors": avg_debtors, "gross_profit": gp, "net_profit": np,
        "net_sales": sales, "ebit": ebit,
        "capital_employed": equity + debt_lt,
    }
    result = solve("ratio_analysis", {"ratio_type": ratio_type, "data": data})

    val = result["answer"]["value"]
    interp = result["answer"]["interpretation"]

    answer_text = f"{ratio_display[ratio_type]} = {val:.2f}. Interpretation: {interp}"

    return {
        "problem_id": f"ACC-C12-{random.randint(1000,9999)}",
        "type": "competency",
        "topic": "Ratio Analysis",
        "difficulty": "easy",
        "question": question,
        "answer": answer_text,
        "steps": result.get("steps", []),
        "numeric_answer": {"ratio_type": ratio_type, "value": val},
        "misconception_tags": ["wrong_formula", "wrong_interpretation"],
        "bloom_level": "Apply",
        "competency_flags": ["competency", "data_interpretation", "real_world"],
        "context": f"{company}, {city}",
    }


# ──────────────────────────────────────────────────────────────────────────────
# Competency-Based Generators (NEP 2020)
# ──────────────────────────────────────────────────────────────────────────────
def gen_competency_sacrifice(seed: int = None) -> Dict[str, Any]:
    """Case-study style: A family business in Pune admitting next-generation partners."""
    if seed is not None:
        random.seed(seed)

    firm = f"{indian_company().replace(' Ltd.', '')} & Co."
    city = indian_city()
    old_ratio = f"{random.randint(2,5)}:{random.randint(1,4)}:{random.randint(1,3)}"
    # Build new ratio
    nr = rand_ratio(3)
    nr_str = f"{nr[0]}:{nr[1]}:{nr[2]}"

    father = random.choice(INDIA["partners_male"])
    son = random.choice(INDIA["partners_male"][:4])
    daughter = random.choice(INDIA["partners_female"][:4])
    outsider = random.choice(INDIA["partners_male"][4:])

    question = (
        f"CASE STUDY: {father}, {son} and {daughter} run '{firm}' in {city} sharing profits in the ratio {old_ratio}. "
        f"To expand their operations, they admit {outsider}, a supply-chain expert, as a new partner. "
        f"{father} decides to reduce his share to mentor the younger partners. The new profit-sharing "
        f"ratio is agreed as {nr_str}. "
        "As a Commerce student helping the firm's auditor, calculate: "
        "(i) The sacrifice ratio of {father} and {son}; "
        "(ii) How much of the goodwill will {father} and {son} receive if goodwill is valued at Rs 3,00,000 by Super Profit method "
        "(Average profit Rs 2,00,000; Normal rate 10% on capital of Rs 8,00,000; 3 years' purchase)?"
    ).format(father=father, son=son, daughter=daughter, outsider=outsider, firm=firm, city=city,
             old_ratio=old_ratio, nr_str=nr_str)

    old_parts = [int(x) for x in old_ratio.split(":")]
    new_parts = nr
    oA = D(old_parts[0]) / sum(old_parts)
    oB = D(old_parts[1]) / sum(old_parts)
    oC = D(old_parts[2]) / sum(old_parts)
    nA = D(new_parts[0]) / sum(new_parts)
    nB = D(new_parts[1]) / sum(new_parts)
    nC = D(new_parts[2]) / sum(new_parts)

    # Solve
    r1 = solve("partnership_sacrifice_ratio", {
        "old_A": float(oA), "old_B": float(oB), "old_C": float(oC),
        "new_A": float(nA), "new_B": float(nB), "new_C": float(nC),
    })

    cap = 800000
    nrr = 10
    avg_p = 200000
    yrs = 3
    r2 = solve("goodwill_super_profit", {
        "capital_employed": cap, "normal_rate": nrr,
        "average_profit": avg_p, "years_purchase": yrs,
    })

    gw = r2["answer"]["goodwill"]
    sac = r1["answer"]["sacrifice_A"], r1["answer"]["sacrifice_B"]
    s_ratio = r1["answer"]["sacrifice_ratio"]
    if s_ratio and s_ratio != "N/A (all gain)":
        parts = [D(p) for p in s_ratio.split(":")]
        tot_sac = sum(parts)
        if tot_sac > 0:
            share_A = round2(gw * parts[0] / tot_sac)
            share_B = round2(gw * parts[1] / tot_sac)
        else:
            share_A = share_B = D("0")
    else:
        share_A = share_B = D("0")

    answer_text = (
        f"(i) Sacrifice of {father} = {sac[0]:.4f}; Sacrifice of {son} = {sac[1]:.4f}; "
        f"Sacrifice Ratio = {s_ratio}.\n"
        f"(ii) Goodwill = Rs {gw:,.0f}; {father} receives Rs {share_A:,.0f}; {son} receives Rs {share_B:,.0f}."
    )

    return {
        "problem_id": f"ACC-C12-{random.randint(1000,9999)}",
        "type": "competency",
        "topic": "Partnership – Admission + Goodwill (Case Study)",
        "difficulty": "hard",
        "question": question,
        "answer": answer_text,
        "steps": r1.get("steps", []) + r2.get("steps", []),
        "numeric_answer": {
            "sacrifice_ratio": s_ratio,
            "goodwill": gw,
            "goodwill_share_A": float(share_A),
            "goodwill_share_B": float(share_B),
        },
        "misconception_tags": ["shares_goodwill_in_new_ratio", "forgets_super_profit", "wrong_years"],
        "bloom_level": "Evaluate",
        "competency_flags": ["competency", "case_study", "multi_step", "real_world"],
        "context": f"Family business in {city} – Succession Planning",
    }


# ──────────────────────────────────────────────────────────────────────────────
# Main Generator Interface
# ──────────────────────────────────────────────────────────────────────────────
GENERATORS = {
    "partnership_sacrifice_ratio": gen_sacrifice_ratio,
    "goodwill_super_profit": gen_goodwill_super_profit,
    "share_issue": gen_share_issue,
    "financial_statements": gen_financial_statements,
    "ratio_analysis": gen_ratio_analysis,
    "case_study_sacrifice": gen_competency_sacrifice,
}


def generate_question(problem_type: str, seed: int = None) -> Dict[str, Any]:
    """Generate one complete question with answer and steps."""
    gen_fn = GENERATORS.get(problem_type)
    if not gen_fn:
        raise ValueError(f"Unknown problem type: {problem_type}")
    return gen_fn(seed=seed)


def generate_batch(problem_types: List[str], count: int, seed: int = None) -> List[Dict[str, Any]]:
    """Generate a batch of questions across multiple problem types."""
    if seed is not None:
        random.seed(seed)
    questions = []
    for i in range(count):
        pt = problem_types[i % len(problem_types)]
        q = generate_question(pt, seed=seed + i if seed else None)
        questions.append(q)
    return questions


if __name__ == "__main__":
    import json
    random.seed(42)
    q = generate_question("case_study_sacrifice", seed=42)
    print(json.dumps(q, indent=2, default=str, ensure_ascii=False))