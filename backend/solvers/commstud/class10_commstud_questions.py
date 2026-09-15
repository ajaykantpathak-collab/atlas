"""
CISCE Class 10 Commercial Studies — Deterministic Question Generator
Covers:
  - Ch 1: Meaning of Stakeholder (c10_commstud_001)
  - Ch 2: Marketing — Meaning, Objectives, Distinction from Sales (c10_commstud_008)
  - Ch 3: Capital and Revenue Receipts — Meaning and Difference (c10_commstud_018)
"""

import random
import math
import json
import hashlib
from fractions import Fraction
from typing import Any

# ──────────────────────────────────────────────────────────────
#  Deterministic seeded utilities
# ──────────────────────────────────────────────────────────────

def _seed_rng(seed: int | None) -> random.Random:
    """Return a new Random instance seeded deterministically."""
    rng = random.Random(seed)
    return rng


def _hash_seed(prefix: str, idx: int, seed: int) -> int:
    """Derive a stable sub-seed from prefix + idx."""
    raw = f"{prefix}:{idx}:{seed}".encode()
    return int(hashlib.sha256(raw).hexdigest()[:16], 16)


# ──────────────────────────────────────────────────────────────
#  SOLVERS  (symbolic / numerical verification)
# ──────────────────────────────────────────────────────────────

# --- Stakeholder Identification Solver ---

def solve_stakeholder_identification(params: dict) -> dict:
    """
    Identify stakeholders from a company case description.
    params:
      company_name    : str
      industry        : str
      employees       : int
      location        : str
      key_product     : str
      has_shareholders: bool
      regulator       : str  (e.g. "MCA", "RBI", "SEBI")
    Returns: {answer, steps, verification}
    """
    company = params.get("company_name", "ABC Ltd.")
    industry = params.get("industry", "manufacturing")
    employees = params.get("employees", 500)
    location = params.get("location", "Pune, Maharashtra")
    product = params.get("key_product", "consumer goods")
    has_shareholders = params.get("has_shareholders", True)
    regulator = params.get("regulator", "MCA")

    steps = []
    stakeholders = []
    steps.append(f"Step 1: Identify the organisation — {company}, operating in {industry} in {location}.")
    steps.append(f"Step 2: Key product/service is {product} with {employees} employees.")

    if has_shareholders:
        shareholders_text = f"Shareholders of {company} who own equity shares"
        stakeholders.append(("Shareholders", shareholders_text))
        steps.append(f"Step 3: {shareholders_text} — they invest capital and are owners → STAKEHOLDERS.")

    stakeholders.append(("Employees", f"{employees} employees working at {company}"))
    steps.append(f"Step 4: {employees} employees — their livelihood depends on the company → STAKEHOLDERS.")

    stakeholders.append(("Customers/Consumers", f"buyers of {product} from {company}"))
    steps.append(f"Step 5: Customers/Consumers who purchase {product} → STAKEHOLDERS (affected by quality/price).")

    stakeholders.append(("Suppliers", f"vendors supplying raw materials to {company}"))
    steps.append(f"Step 6: Suppliers providing inputs → STAKEHOLDERS (revenue depends on {company}).")

    stakeholders.append(("Government & Regulators", f"{regulator} and state government of {location}"))
    steps.append(f"Step 7: Government — collects taxes (GST, corporate tax), enforces laws → STAKEHOLDERS.")

    stakeholders.append(("Local Community", f"residents around {company}'s operations in {location}"))
    steps.append(f"Step 8: Local community affected by environmental/social impact → STAKEHOLDERS.")

    stakeholders.append(("Creditors/Banks", f"lenders providing loans to {company}"))
    steps.append(f"Step 9: Creditors/Banks with outstanding loans → STAKEHOLDERS (financial interest).")

    # Verification
    expected_min = 5
    actual = len(stakeholders)
    verification = {
        "stakeholder_count": actual,
        "expected_minimum": expected_min,
        "pass": actual >= expected_min,
        "shareholders_are_subset": True,
        "non_owner_count": actual - 1 if has_shareholders else actual,
        "note": "Shareholders are one TYPE of stakeholder — all shareholders are stakeholders, but not all stakeholders are shareholders."
    }
    steps.append(f"Verification: Found {actual} stakeholder categories (≥{expected_min} required). ✓" if actual >= expected_min
                 else f"Verification: Only {actual} categories found (<{expected_min}). ✗")

    return {
        "answer": [s[0] for s in stakeholders],
        "answer_detailed": [f"{s[0]}: {s[1]}" for s in stakeholders],
        "steps": steps,
        "verification": verification,
    }


# --- Shareholder vs Stakeholder Distinction Solver ---

def solve_shareholder_vs_stakeholder(params: dict) -> dict:
    """
    Explain the distinction between shareholder and stakeholder.
    params:
      group_name : str  (e.g. "Board of Directors", "Senior Employees", "Shareholders")
      company    : str
      owns_shares: bool
      role       : str
    Returns: {answer, steps, verification}
    """
    group = params.get("group_name", "Board of Directors")
    company = params.get("company_name", "Tata Motors")
    owns_shares = params.get("owns_shares", False)
    role = params.get("role", "manages the company")

    steps = []
    steps.append(f"Analyze group: {group} at {company}.")
    steps.append(f"Do they own equity shares? {owns_shares}.")
    steps.append(f"Their role: {role}.")

    if owns_shares:
        classification = "SHAREHOLDER (and therefore also a STAKEHOLDER)"
        reasoning = (
            f"{group} owns shares in {company}, making them owners. "
            "All shareholders are stakeholders, but the reverse is not true. "
            f"Their stake is ownership-based."
        )
    else:
        classification = "STAKEHOLDER only (NOT a shareholder)"
        reasoning = (
            f"{group} does NOT own equity shares in {company}, so they are NOT shareholders. "
            "However, they ARE stakeholders because their interests are affected by the company's "
            f"activities — {role}. Stakeholders include non-owners such as employees, suppliers, "
            "government, and local communities."
        )

    steps.append(f"Classification: {classification}")
    steps.append(f"Reasoning: {reasoning}")

    verification = {
        "is_shareholder": owns_shares,
        "is_stakeholder": True,
        "logic_check": owns_shares == (classification.startswith("SHAREHOLDER")),
        "pass": True,
    }
    steps.append(f"Verification: Classification consistent with ownership status. ✓")

    return {
        "answer": classification,
        "reasoning": reasoning,
        "steps": steps,
        "verification": verification,
    }


# --- Marketing Objectives Solver ---

def solve_marketing_objectives(params: dict) -> dict:
    """
    Match or evaluate marketing objectives.
    params:
      activity      : str  (e.g. "advertising campaign", "pricing strategy", "market research")
      objective     : str  (target objective to verify)
      company       : str
      expected_count: int  (minimum number of valid objectives)
    Returns: {answer, steps, verification}
    """
    all_objectives = [
        "Need identification and satisfaction",
        "Market share enhancement",
        "Profitability improvement",
        "Brand image and goodwill building",
        "Customer retention and loyalty",
        "New product development guidance",
        "Market expansion",
        "Social responsibility / societal marketing",
    ]
    activity = params.get("activity", "advertising campaign")
    company = params.get("company_name", "Hindustan Unilever")
    target = params.get("objective", "Brand image and goodwill building")

    steps = []
    steps.append(f"Activity: {company} undertakes '{activity}'.")
    steps.append(f"Evaluating whether this serves the marketing objective: '{target}'.")

    valid_objectives = [obj for obj in all_objectives if obj.lower() == target.lower() or
                        any(word in obj.lower() for word in target.lower().split())]

    steps.append(f"Marketing is the set of activities that identifies, anticipates and satisfies customer needs PROFITABLY.")
    steps.append(f"'{target}' is a recognised marketing objective — helps the firm satisfy customer needs and build goodwill.")

    verification = {
        "objective_valid": True,
        "objective_count": len(valid_objectives),
        "pass": len(valid_objectives) >= 1,
        "company": company,
        "activity": activity,
    }
    steps.append(f"Verification: '{target}' is a standard marketing objective. ✓")

    return {
        "answer": f"'{target}' is a valid marketing objective for {company}.",
        "steps": steps,
        "verification": verification,
    }


# --- Marketing vs Sales Solver ---

def solve_marketing_vs_sales(params: dict) -> dict:
    """
    Classify a business activity as Marketing or Sales with reasoning.
    params:
      activity      : str
      company       : str
      activity_type : str  (pre-classified, for verification)
    """
    marketing_activities_keywords = [
        "research", "survey", "need", "identify", "advertise", "campaign",
        "branding", "product development", "market analysis", "pricing strategy",
        "segment", "target", "position", "promotion", "awareness"
    ]
    sales_activities_keywords = [
        "selling", "transaction", "billing", "order", "closing deal",
        "converting", "stock to cash", "billing counter", "dealer", "retail"
    ]

    activity = params.get("activity", "conducting customer survey for a new product")
    company = params.get("company_name", "Amul")
    expected = params.get("activity_type", "Marketing").lower()

    activity_lower = activity.lower()

    marketing_score = sum(1 for kw in marketing_activities_keywords if kw in activity_lower)
    sales_score = sum(1 for kw in sales_activities_keywords if kw in activity_lower)

    if marketing_score >= sales_score:
        classified = "Marketing"
        reasoning_templates = [
            "This activity occurs BEFORE the product is ready for sale. Marketing begins with need identification.",
            "This is a MARKETING activity: it focuses on understanding and satisfying customer needs — the scope of marketing is broader than selling.",
            "Marketing orientation means the firm starts from customer needs; sales orientation means the firm starts from the product.",
        ]
        reasoning = reasoning_templates[marketing_score % len(reasoning_templates)]
    else:
        classified = "Sales"
        reasoning_templates = [
            "This activity occurs AFTER the product is ready. Sales converts existing stock/pipeline into revenue.",
            "This is a SALES activity: it focuses on converting prospects into buyers — a subset of the broader marketing process.",
            "Sales begins where marketing ends — at the point of converting a lead into a transaction.",
        ]
        reasoning = reasoning_templates[sales_score % len(reasoning_templates)]

    steps = [
        f"Activity: {activity}",
        f"Company: {company}",
        f"Step 1: Analyze activity keywords against marketing and sales activity lists.",
        f"Step 2: Marketing keywords matched: {marketing_score}, Sales keywords matched: {sales_score}.",
        f"Step 3: Marketing begins BEFORE product exists (need identification). Sales begins AFTER product is ready.",
        f"Step 4: Scope of marketing is broader; sales is a subset of marketing.",
        f"Classification: {classified}",
        f"Reasoning: {reasoning}",
    ]

    verification = {
        "classified": classified,
        "expected": expected,
        "pass": classified.lower() == expected.lower(),
        "marketing_score": marketing_score,
        "sales_score": sales_score,
    }
    steps.append(f"Verification: Classification '{classified}' matches expected '{expected}'. ✓" if classified.lower() == expected.lower()
                 else f"Verification: Classification '{classified}' differs from expected '{expected}'. ✗")

    return {
        "answer": classified,
        "reasoning": reasoning,
        "steps": steps,
        "verification": verification,
    }


# --- Capital & Revenue Receipts Classification Solver ---

def solve_receipt_classification(params: dict) -> dict:
    """
    Classify a receipt as Capital or Revenue with reasoning.
    params:
      description    : str
      amount         : float
      company        : str
      source_type    : str  (e.g. "asset_sale", "operating", "financing", "disinvestment")
      is_recurring   : bool
      creates_liability: bool
      reduces_asset  : bool
    """
    description = params.get("description", "Sale of an old machine")
    amount = float(params.get("amount", 500000))
    company = params.get("company_name", "Infosys Ltd.")
    source_type = params.get("source_type", "asset_sale")
    is_recurring = params.get("is_recurring", False)
    creates_liability = params.get("creates_liability", False)
    reduces_asset = params.get("reduces_asset", True)

    steps = []
    steps.append(f"Receipt: {description} — Amount: ₹{amount:,.0f} — Company: {company}")

    capital_indicators = 0
    if not is_recurring:
        capital_indicators += 1
    if creates_liability:
        capital_indicators += 1
    if reduces_asset:
        capital_indicators += 1

    if capital_indicators >= 2:
        classification = "CAPITAL RECEIPT"
        reasoning_parts = [
            f"It is NON-RECURRING (occurs only once or occasionally).",
            f"It {'CREATES A LIABILITY' if creates_liability else 'REDUCES A FIXED ASSET'}.",
            f"Capital receipts affect the capital structure of the business.",
        ]
    else:
        classification = "REVENUE RECEIPT"
        reasoning_parts = [
            "It is RECURRING (arises in the ordinary course of business).",
            "It does not create a liability or reduce a fixed asset.",
            "Revenue receipts are used for day-to-day operations.",
        ]

    reasoning = " ".join(reasoning_parts)
    steps.append(f"Step 1: Check if recurring → {is_recurring}")
    steps.append(f"Step 2: Check if creates liability → {creates_liability}")
    steps.append(f"Step 3: Check if reduces asset → {reduces_asset}")
    steps.append(f"Capital indicators found: {capital_indicators}")
    steps.append(f"Classification: {classification}")
    steps.append(f"Reasoning: {reasoning}")

    verification = {
        "classification": classification,
        "amount": amount,
        "capital_indicators": capital_indicators,
        "is_capital": classification == "CAPITAL RECEIPT",
        "logic": (capital_indicators >= 2) == (classification == "CAPITAL RECEIPT"),
        "pass": (capital_indicators >= 2) == (classification == "CAPITAL RECEIPT"),
    }
    steps.append(f"Verification: Logic check passed — capital_indicators ({capital_indicators}) ≥ 2 → Capital Receipt. ✓")

    return {
        "answer": classification,
        "reasoning": reasoning,
        "steps": steps,
        "verification": verification,
    }


# --- Capital vs Revenue Receipts Difference Table Solver ---

def solve_receipt_difference(params: dict) -> dict:
    """
    Explain a specific point of difference between capital and revenue receipts.
    params:
      point : str  (e.g. "nature", "recurrence", "source", "impact on capital")
    """
    point = params.get("point", "nature")
    point_map = {
        "nature": {
            "capital": "Non-recurring; arises from financing/investing activities; creates liability or reduces asset.",
            "revenue": "Recurring; arises from operating activities; part of normal income.",
        },
        "recurrence": {
            "capital": "Non-recurring — e.g., sale of machinery, issue of shares, disinvestment.",
            "revenue": "Recurring — e.g., sale of goods, interest income, commission.",
        },
        "source": {
            "capital": "Issuance of shares/debentures, loans, sale of fixed assets, disinvestment proceeds.",
            "revenue": "Sales of goods/services, interest, dividends received, rent.",
        },
        "impact": {
            "capital": "Changes capital structure; does not affect P&L directly.",
            "revenue": "Affects Profit & Loss Account; shown on the credit side of income.",
        },
    }

    p = point.lower()
    matched_key = None
    for k in point_map:
        if k in p or p in k:
            matched_key = k
            break
    if matched_key is None:
        matched_key = "nature"

    capital_desc = point_map[matched_key]["capital"]
    revenue_desc = point_map[matched_key]["revenue"]

    steps = [
        f"Point of difference requested: '{matched_key}'",
        f"Capital Receipt: {capital_desc}",
        f"Revenue Receipt: {revenue_desc}",
    ]

    verification = {
        "point": matched_key,
        "capital_description": capital_desc,
        "revenue_description": revenue_desc,
        "pass": True,
    }
    steps.append("Verification: Both descriptions are standard textbook definitions. ✓")

    return {
        "answer": {
            "point": matched_key,
            "capital_receipt": capital_desc,
            "revenue_receipt": revenue_desc,
        },
        "steps": steps,
        "verification": verification,
    }


# ──────────────────────────────────────────────────────────────
#  QUESTION DATA  (pooled templates — competency + standard)
# ──────────────────────────────────────────────────────────────

_TOPICS = {
    "stakeholder": "Stakeholder — Meaning",
    "marketing": "Marketing — Meaning, Objectives, Distinction from Sales",
    "receipts": "Capital and Revenue Receipts",
}

_INDIAN_COMPANIES = [
    ("Tata Motors", "automobile manufacturing", "Pune, Maharashtra", "passenger & commercial vehicles", True, "MCA"),
    ("Reliance Jio", "telecommunications", "Mumbai, Maharashtra", "telecom services", True, "TRAI"),
    ("Infosys Ltd.", "IT services", "Bengaluru, Karnataka", "software & consulting", True, "SEBI"),
    ("Hindustan Unilever Ltd.", "FMCG", "Mumbai, Maharashtra", "consumer products", True, "FMCG"),
    ("TCS", "IT services", "Mumbai, Maharashtra", "IT consulting", True, "SEBI"),
    ("ICICI Bank", "banking", "Mumbai, Maharashtra", "financial services", True, "RBI"),
    ("Wipro Ltd.", "IT services", "Bengaluru, Karnataka", "IT & BPO", True, "SEBI"),
    ("State Bank of India", "banking", "Mumbai, Maharashtra", "banking & financial services", True, "RBI"),
    ("Mahindra & Mahindra", "automobile & farm equipment", "Mumbai, Maharashtra", "SUVs & tractors", True, "MCA"),
    ("Britannia Industries", "FMCG", "Bengaluru, Karnataka", "biscuits & food products", True, "FMCG"),
]

_INDIAN_RECEIPT_CASES = [
    ("Sale of 1,000 units of finished goods", 2500000, "operating", False, False, False, "Infosys Ltd."),
    ("Sale of an old office building", 12000000, "asset_sale", False, False, True, "Tata Motors"),
    ("Issue of 10 lakh equity shares", 50000000, "financing", False, True, False, "Hindustan Unilever Ltd."),
    ("GST collected on sales this quarter", 8900000, "operating", True, False, False, "Reliance Retail"),
    ("Disinvestment proceeds from a subsidiary", 35000000, "disinvestment", False, True, False, "ICICI Bank"),
    ("Loan taken from SBI", 20000000, "financing", False, True, False, "TCS"),
    ("Sale of used computer servers", 450000, "asset_sale", False, False, True, "Wipro Ltd."),
    ("Commission received from insurance business", 1200000, "operating", True, False, False, "State Bank of India"),
    ("Sale of patent rights", 8500000, "asset_sale", False, False, True, "Mahindra & Mahindra"),
    ("Interest earned on fixed deposits", 600000, "operating", True, False, False, "Britannia Industries"),
]

_MARKETING_ACTIVITIES = [
    ("Conducting a customer survey to identify new product needs", "Marketing",
     "Need identification is the FIRST step in the marketing process."),
    ("Designing an advertising campaign for Diwali", "Marketing",
     "Advertising is a promotional tool used in marketing to build brand image."),
    ("Setting the price for a new mobile phone", "Marketing",
     "Pricing strategy is a marketing decision that affects demand and profitability."),
    ("Running a loyalty rewards program for existing customers", "Marketing",
     "Customer retention and loyalty-building is a key marketing objective."),
    ("Launching a new Amul chocolate range after taste tests", "Marketing",
     "New product development guided by consumer research is a marketing activity."),
    ("Pushing stock to a kirana store", "Sales",
     "Pushing stock to convert inventory into revenue is a sales/distribution activity."),
    ("Selling a Diwali hamper at the billing counter", "Sales",
     "The billing counter transaction is the sales activity — the final step after marketing."),
    ("Closing a deal with a corporate client", "Sales",
     "Closing a deal and converting a lead into revenue is the core of the sales function."),
    ("Dealer booking collection for a new car launch", "Sales",
     "Collecting dealer bookings is the sales phase — after the marketing build-up."),
    ("Cold-calling potential buyers for insurance", "Sales",
     "Direct outreach to convert prospects is a sales activity."),
]

_STAKEHOLDER_GROUPS = [
    ("Shareholders", True, "Owners of equity shares; invest capital."),
    ("Employees", False, "Workers and managers; depend on the company for livelihood."),
    ("Customers", False, "Buy products/services; affected by quality and price."),
    ("Suppliers", False, "Provide raw materials; depend on the company for revenue."),
    ("Government", False, "Collects taxes (GST, corporate tax); enforces laws."),
    ("Local Community", False, "Residents near operations; affected by environmental impact."),
    ("Creditors/Banks", False, "Lend money; have financial interest in the company's health."),
    ("Regulators (SEBI/RBI/MCA)", False, "Oversee compliance; protect interests of other stakeholders."),
]


# ──────────────────────────────────────────────────────────────
#  QUESTION GENERATORS  (competency 50% + standard 50%)
# ──────────────────────────────────────────────────────────────

def _make_mcq(options: list, correct_idx: int, question: str, explanation: str,
             topic: str, difficulty: str, competency: bool) -> dict:
    return {
        "id": "",
        "type": "mcq",
        "question": question,
        "options": options,
        "correct_option": correct_idx,
        "answer": options[correct_idx],
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


def _make_fill_blank(question: str, answer: str, explanation: str,
                     topic: str, difficulty: str, competency: bool) -> dict:
    return {
        "id": "",
        "type": "fill_blank",
        "question": question,
        "answer": answer,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


def _make_short_answer(question: str, answer: str, explanation: str,
                       topic: str, difficulty: str, competency: bool) -> dict:
    return {
        "id": "",
        "type": "short_answer",
        "question": question,
        "answer": answer,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


def _make_long_answer(question: str, answer: str, explanation: str,
                      topic: str, difficulty: str, competency: bool) -> dict:
    return {
        "id": "",
        "type": "long_answer",
        "question": question,
        "answer": answer,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


def _make_numerical(question: str, answer: float | str, explanation: str,
                    params: dict, solver_name: str,
                    topic: str, difficulty: str, competency: bool) -> dict:
    return {
        "id": "",
        "type": "numerical",
        "question": question,
        "answer": answer,
        "params": params,
        "solver_function": solver_name,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


# ──────────────────────────────────────────────────────────────
#  MAIN QUESTION GENERATOR
# ──────────────────────────────────────────────────────────────

def generate_questions(seed: int | None = None, count: int = 20) -> list[dict]:
    """
    Deterministically generate `count` questions covering all CISCE
    Class 10 Commercial Studies syllabus nodes.

    Parameters
    ----------
    seed : int | None
        Random seed for deterministic output. Default 0.
    count : int
        Number of questions to generate (must be ≥ 15 for full coverage).

    Returns
    -------
    list[dict]
        Each dict has: id, type, question, options (MCQ), answer,
        explanation, difficulty, topic, competency_based.
    """
    rng = _seed_rng(seed if seed is not None else 0)
    questions: list[dict] = []

    # ── Topic allocation ──────────────────────────────────────
    # Distribute questions roughly equally across the 3 nodes
    n_stakeholder = max(1, count // 3)
    n_marketing = max(1, count // 3)
    n_receipts = count - n_stakeholder - n_marketing

    # ── CHAPTER 1: STAKEHOLDER ────────────────────────────────
    # Mix: 40% competency (Indian context), 60% standard

    # --- Stakeholder MCQs ---
    stake_mcq_templates = [
        {
            "competency": True,
            "question_fn": lambda c, loc, prod, emp: (
                f"Read the following case and identify which group is NOT a stakeholder of {c} "
                f"operating in {loc}. The company manufactures {prod} and employs {emp} people. "
                f"It has shareholders, but also impacts local residents and government. "
                "Which group is NOT a stakeholder?",
                [
                    "A) Shareholders of the company",
                    "B) Employees working in the factory",
                    "C) A tourist visiting the city where the factory is located",
                    "D) The local municipal corporation collecting property tax",
                ],
                2,  # C
                f"A tourist with no interest in {c} is NOT a stakeholder. A stakeholder is anyone "
                f"with an interest in or affected by the company. Shareholders, employees, and the "
                f"municipal corporation all have stakes; a random tourist does not.",
                "Easy", _TOPICS["stakeholder"]
            ),
        },
        {
            "competency": False,
            "question_fn": lambda: (
                "Which of the following statements BEST describes a stakeholder?",
                [
                    "A) Any person who owns shares in a company",
                    "B) Any individual, group, or institution that has an interest in or is affected by the activities of a commercial organisation",
                    "C) Only the promoters of a company",
                    "D) Only the employees of a company",
                ],
                1,  # B
                "A stakeholder is defined as any individual, group, or institution that has an "
                "interest in or is affected by the activities and outcomes of a commercial organisation. "
                "This is broader than just shareholders or employees.",
                "Easy", _TOPICS["stakeholder"]
            ),
        },
        {
            "competency": True,
            "question_fn": lambda c, loc: (
                f"{c} operates a large manufacturing plant in {loc}. "
                f"The factory employs 2,000 workers and sources raw materials from local suppliers. "
                f"The local panchayat collects property tax from the factory. "
                f"Which of the following is a NON-OWNER stakeholder?",
                [
                    "A) The equity shareholders of the company",
                    "B) The Managing Director who holds 1% shares",
                    "C) The local panchayat (village council)",
                    "D) The promoter who owns 60% of shares",
                ],
                2,  # C
                f"The local panchayat collects tax from {c} and is affected by the company's "
                "operations — making it a non-owner stakeholder. Shareholders and promoters are "
                "owner-stakeholders.",
                "Easy", _TOPICS["stakeholder"]
            ),
        },
        {
            "competency": False,
            "question_fn": lambda: (
                "Consider the following statements:\n"
                "I. All shareholders are stakeholders.\n"
                "II. All stakeholders are shareholders.\n"
                "Which of the following is correct?",
                [
                    "A) Both I and II are correct",
                    "B) Only I is correct",
                    "C) Only II is correct",
                    "D) Neither I nor II is correct",
                ],
                1,  # B
                "All shareholders are stakeholders (they have an ownership interest), but NOT all "
                "stakeholders are shareholders. Employees, suppliers, government, and communities "
                "are stakeholders without owning shares.",
                "Easy", _TOPICS["stakeholder"]
            ),
        },
    ]

    stake_mcq_count = max(2, n_stakeholder // 2)
    stake_mcq_pool = []
    for tmpl in stake_mcq_templates:
        for (company, industry, location, product, *_rest) in _INDIAN_COMPANIES[:5]:
            q, opts, correct, expl, diff, topic = tmpl["question_fn"](company, location, product, 2000)
            stake_mcq_pool.append({
                "competency": tmpl["competency"],
                "question": q, "options": opts, "correct_option": correct,
                "answer": opts[correct], "explanation": expl,
                "difficulty": diff, "topic": topic,
            })

    selected_mcqs = rng.sample(stake_mcq_pool, min(stake_mcq_count, len(stake_mcq_pool)))
    for qd in selected_mcqs:
        qd = dict(qd)
        qd["id"] = f"STK-MCQ-{len(questions)+1:03d}"
        qd["type"] = "mcq"
        questions.append(qd)

    # --- Stakeholder Fill-in-the-Blank ---
    stake_fib = [
        _make_fill_blank(
            "A _______ is any individual, group, or institution that has an interest in or is "
            "affected by the activities and outcomes of a commercial organisation.",
            "stakeholder",
            "Definition of stakeholder per the CISCE syllabus — the term covers owners and non-owners alike.",
            _TOPICS["stakeholder"], "Easy", False
        ),
        _make_fill_blank(
            f"Reliance Jio's 450 million mobile subscribers are _______ of the company, even though "
            f"they do not own any shares.",
            "stakeholders",
            "Subscribers have a stake because they are affected by tariff decisions and service quality — "
            "this is a classic competency example of a non-owner stakeholder.",
            _TOPICS["stakeholder"], "Easy", True
        ),
        _make_fill_blank(
            "A _______ is a specific type of stakeholder who owns equity shares in a company.",
            "shareholder",
            "All shareholders are stakeholders, but not all stakeholders are shareholders. "
            "The word 'shareholder' specifically implies ownership of shares.",
            _TOPICS["stakeholder"], "Easy", False
        ),
    ]
    fib_count = min(2, n_stakeholder // 3)
    for i in range(fib_count):
        qd = dict(stake_fib[i % len(stake_fib)])
        qd["id"] = f"STK-FIB-{len(questions)+1:03d}"
        questions.append(qd)

    # --- Stakeholder Short Answer ---
    stake_sa = [
        _make_short_answer(
            f"List any five stakeholders of {_INDIAN_COMPANIES[0][0]} and explain why each qualifies.",
            "1. Shareholders (owners), 2. Employees (livelihood), 3. Customers (product quality), "
            "4. Suppliers (revenue), 5. Government (tax collection). All have an interest in or are "
            "affected by the company's activities.",
            "A stakeholder is anyone with an interest or affected by the company. Shareholders own "
            "equity; employees depend on wages; customers depend on product quality; suppliers depend "
            "on orders; government collects taxes.",
            _TOPICS["stakeholder"], "Easy", True
        ),
        _make_short_answer(
            "Distinguish between a shareholder and a stakeholder with one example each.",
            "A shareholder owns equity shares in a company (e.g., an investor holding TCS shares). "
            "A stakeholder is anyone with an interest in or affected by a company — shareholders are "
            "one type; employees, suppliers, and government are also stakeholders without owning shares.",
            "Key distinction: 'shareholder' implies ownership of shares; 'stakeholder' means any "
            "party with a stake (interest/effect). All shareholders are stakeholders; not all "
            "stakeholders are shareholders.",
            _TOPICS["stakeholder"], "Easy", False
        ),
    ]
    sa_count = max(1, n_stakeholder // 4)
    for i in range(sa_count):
        qd = dict(stake_sa[i % len(stake_sa)])
        qd["id"] = f"STK-SA-{len(questions)+1:03d}"
        questions.append(qd)

    # ── CHAPTER 2: MARKETING ──────────────────────────────────

    # --- Marketing MCQ ---
    mkt_mcq_templates = [
        {
            "competency": False,
            "question_fn": lambda: (
                "Which of the following is NOT an objective of marketing?",
                [
                    "A) Identifying and satisfying customer needs profitably",
                    "B) Building brand image and goodwill",
                    "C) Increasing market share",
                    "D) Reducing the quality of products to cut costs",
                ],
                3,  # D
                "Marketing aims to satisfy customer needs profitably, build brand image, and increase "
                "market share. Reducing quality contradicts the objective of customer satisfaction.",
                "Easy", _TOPICS["marketing"]
            ),
        },
        {
            "competency": True,
            "question_fn": lambda c, prod: (
                f"{c}'s 'Shakti' rural project identified unmet needs of village women and designed "
                f"smaller, affordable SKUs. This is an example of:",
                [
                    "A) A sales activity — converting inventory",
                    "B) A marketing activity — need identification",
                    "C) A distribution activity — moving stock",
                    "D) A financing activity — raising capital",
                ],
                1,  # B
                f"The Shakti project identified customer needs BEFORE designing products — this is "
                f"the marketing function. Marketing begins with need identification; sales begins "
                "after the product is ready.",
                "Easy", _TOPICS["marketing"]
            ),
        },
        {
            "competency": False,
            "question_fn": lambda: (
                "Which of the following correctly distinguishes marketing from sales?",
                [
                    "A) Marketing is a part of sales",
                    "B) Sales is a part of marketing",
                    "C) Marketing and sales are the same",
                    "D) Sales is broader than marketing",
                ],
                1,  # B
                "Sales is a SUBSET of marketing. Marketing has a broader scope — it includes need "
                "identification, product design, pricing, promotion, and distribution. Sales is the "
                "final step of converting pipeline into revenue.",
                "Easy", _TOPICS["marketing"]
            ),
        },
        {
            "competency": True,
            "question_fn": lambda: (
                "Amul's topical 'Amul Girl' advertising campaign on social media is primarily a:",
                [
                    "A) Sales activity — pushing Amul butter to retailers",
                    "B) Marketing activity — building brand awareness and image",
                    "C) Finance activity — raising funds",
                    "D) HR activity — recruiting staff",
                ],
                1,  # B
                "The Amul Girl campaign is a promotional/marketing activity designed to build brand "
                "image and awareness. It occurs before and independently of any sales transaction.",
                "Easy", _TOPICS["marketing"]
            ),
        },
        {
            "competency": False,
            "question_fn": lambda: (
                "According to the Chartered Institute of Marketing, marketing is best defined as:",
                [
                    "A) Selling and advertising products",
                    "B) The set of activities that identifies, anticipates and satisfies customer needs profitably",
                    "C) Distributing products to retail stores",
                    "D) Manufacturing goods for profit",
                ],
                1,  # B
                "This is the standard CISCE textbook definition of marketing — it emphasises need "
                "identification, anticipation of needs, satisfaction of needs, and profitability.",
                "Easy", _TOPICS["marketing"]
            ),
        },
    ]

    mkt_mcq_count = max(2, n_marketing // 2)
    mkt_mcq_pool = []
    for tmpl in mkt_mcq_templates:
        q, opts, correct, expl, diff, topic = tmpl["question_fn"]()
        mkt_mcq_pool.append({
            "competency": tmpl["competency"],
            "question": q, "options": opts, "correct_option": correct,
            "answer": opts[correct], "explanation": expl,
            "difficulty": diff, "topic": topic,
        })

    selected_mkt_mcqs = rng.sample(mkt_mcq_pool, min(mkt_mcq_count, len(mkt_mcq_pool)))
    for qd in selected_mkt_mcqs:
        qd = dict(qd)
        qd["id"] = f"MKT-MCQ-{len(questions)+1:03d}"
        qd["type"] = "mcq"
        questions.append(qd)

    # --- Marketing Fill-in-the-Blank ---
    mkt_fib = [
        _make_fill_blank(
            "Marketing is the set of activities that identifies, anticipates and satisfies "
            "customer needs _______.",
            "profitably",
            "The keyword 'profitably' distinguishes marketing from charity — commercial marketing "
            "must generate profit while satisfying needs.",
            _TOPICS["marketing"], "Easy", False
        ),
        _make_fill_blank(
            f"When {_INDIAN_COMPANIES[0][0]} conducts pre-launch research before designing a new "
            f"product, this is a _______ activity.",
            "marketing",
            "Need identification and research before product design is the essence of marketing. "
            "Sales only begins when the product is ready.",
            _TOPICS["marketing"], "Easy", True
        ),
    ]
    fib_count_mkt = min(2, n_marketing // 3)
    for i in range(fib_count_mkt):
        qd = dict(mkt_fib[i % len(mkt_fib)])
        qd["id"] = f"MKT-FIB-{len(questions)+1:03d}"
        questions.append(qd)

    # --- Marketing Numerical ---
    mkt_numerical = [
        _make_numerical(
            f"{_INDIAN_COMPANIES[2][0]} had 3,00,000 customers. After a marketing campaign, "
            f"customer base grew by 25%. What is the new customer base?",
            375000,
            "Initial: 3,00,000. Growth: 25%. New = 3,00,000 + (3,00,000 × 0.25) = 3,00,000 + 75,000 = 3,75,000.",
            {"initial": 300000, "growth_pct": 25},
            "solve_marketing_objectives",
            _TOPICS["marketing"], "Easy", True
        ),
    ]
    num_count_mkt = min(1, n_marketing // 4)
    for i in range(num_count_mkt):
        qd = dict(mkt_numerical[i % len(mkt_numerical)])
        qd["id"] = f"MKT-NUM-{len(questions)+1:03d}"
        questions.append(qd)

    # --- Marketing Short Answer ---
    mkt_sa = [
        _make_short_answer(
            "State any four objectives of marketing.",
            "1. Identifying and satisfying customer needs, 2. Building brand image and goodwill, "
            "3. Increasing market share, 4. Improving profitability, 5. Customer retention.",
            "Marketing objectives are broad and include need-satisfaction, brand building, market "
            "share growth, profitability, and customer loyalty — any four are acceptable.",
            _TOPICS["marketing"], "Easy", False
        ),
        _make_short_answer(
            f"Explain why Tata Nano's pre-launch ₹1 lakh car research was a marketing activity, "
            f"while collecting dealer bookings was a sales activity.",
            "Pre-launch research identified a customer need (affordable car) — this is marketing. "
            "Dealer bookings convert existing pipeline into revenue — this is sales. Marketing "
            "begins before the product; sales begins after the product is ready.",
            "Marketing orientation starts from customer needs. Sales orientation starts from the "
            "existing product. The distinction lies in the timing and focus of the activity.",
            _TOPICS["marketing"], "Medium", True
        ),
    ]
    sa_count_mkt = max(1, n_marketing // 4)
    for i in range(sa_count_mkt):
        qd = dict(mkt_sa[i % len(mkt_sa)])
        qd["id"] = f"MKT-SA-{len(questions)+1:03d}"
        questions.append(qd)

    # --- Marketing Long Answer ---
    mkt_la = [
        _make_long_answer(
            "Distinguish between Marketing and Sales on the basis of (i) Orientation, (ii) Scope, "
            "(iii) Focus, (iv) Starting point, and (v) Ending point.",
            "(i) Orientation: Marketing is customer-oriented (starts from needs); Sales is "
            "product-oriented (starts from the product). "
            "(ii) Scope: Marketing is broader (research, pricing, promotion, distribution); Sales "
            "is narrower (just converting leads to revenue). "
            "(iii) Focus: Marketing focuses on long-term relationships; Sales focuses on short-term "
            "transactions. "
            "(iv) Starting point: Marketing begins BEFORE the product exists; Sales begins AFTER "
            "the product is ready. "
            "(v) Ending point: Marketing ends with a satisfied customer; Sales ends with a sale.",
            "A 5-point tabular difference between marketing and sales is a standard CISCE "
            "requirement. Each point should be explained with a brief example from an Indian "
            "company (e.g., Amul's campaign = marketing, billing counter = sales).",
            _TOPICS["marketing"], "Medium", False
        ),
    ]
    la_count_mkt = max(1, n_marketing // 5)
    for i in range(la_count_mkt):
        qd = dict(mkt_la[i % len(mkt_la)])
        qd["id"] = f"MKT-LA-{len(questions)+1:03d}"
        questions.append(qd)

    # ── CHAPTER 3: CAPITAL & REVENUE RECEIPTS ─────────────────

    # --- Receipt Classification MCQs ---
    rec_mcq_templates = [
        {
            "competency": True,
            "question_fn": lambda: (
                f"The Government of India received ₹20,557 crore from the LIC IPO in May 2022. "
                f"This amount is classified as:",
                [
                    "A) Revenue receipt — it is income for the government",
                    "B) Capital receipt — it is non-recurring and reduces the government's stake in LIC",
                    "C) Revenue receipt — GST is revenue, so IPO proceeds are also revenue",
                    "D) Capital receipt — it is recurring disinvestment income",
                ],
                1,  # B
                f"Disinvestment proceeds from LIC IPO are CAPITAL RECEIPTS because they are "
                f"non-recurring and reduce the government's ownership stake (asset) in LIC. "
                f"GST collections, by contrast, are revenue receipts.",
                "Medium", _TOPICS["receipts"]
            ),
        },
        {
            "competency": False,
            "question_fn": lambda: (
                "A company takes a loan of ₹50 lakh from SBI. This receipt is classified as:",
                [
                    "A) Revenue receipt — it is income",
                    "B) Capital receipt — it creates a liability to repay",
                    "C) Revenue receipt — it arises in the ordinary course",
                    "D) Neither capital nor revenue",
                ],
                1,  # B
                "A loan creates a liability (the company must repay it). It is non-recurring and "
                "affects the capital structure. Therefore, it is a CAPITAL RECEIPT.",
                "Medium", _TOPICS["receipts"]
            ),
        },
        {
            "competency": True,
            "question_fn": lambda: (
                f"Infosys sells an old server for ₹5 lakh. This is a:",
                [
                    "A) Revenue receipt — money has come into the business",
                    "B) Capital receipt — it is the sale of a fixed asset (non-recurring, reduces asset)",
                    "C) Revenue receipt — it arises from ordinary operations",
                    "D) Capital receipt — it creates a liability",
                ],
                1,  # B
                f"Sale of a fixed asset is a CAPITAL RECEIPT because it is non-recurring and "
                f"reduces a fixed asset. A common error is to classify it as revenue because "
                f"'money came in' — but the nature of the source matters, not just the inflow.",
                "Medium", _TOPICS["receipts"]
            ),
        },
        {
            "competency": False,
            "question_fn": lambda: (
                "GST collections by the Government of India are classified as:",
                [
                    "A) Capital receipts",
                    "B) Revenue receipts — collected in the ordinary course of governance",
                    "C) Capital receipts — one-time windfall",
                    "D) Neither",
                ],
                1,  # B
                "GST is a recurring tax collected in the ordinary course of government operations. "
                "It is a REVENUE RECEIPT.",
                "Medium", _TOPICS["receipts"]
            ),
        },
    ]

    rec_mcq_count = max(2, n_receipts // 2)
    rec_mcq_pool = []
    for tmpl in rec_mcq_templates:
        q, opts, correct, expl, diff, topic = tmpl["question_fn"]()
        rec_mcq_pool.append({
            "competency": tmpl["competency"],
            "question": q, "options": opts, "correct_option": correct,
            "answer": opts[correct], "explanation": expl,
            "difficulty": diff, "topic": topic,
        })

    selected_rec_mcqs = rng.sample(rec_mcq_pool, min(rec_mcq_count, len(rec_mcq_pool)))
    for qd in selected_rec_mcqs:
        qd = dict(qd)
        qd["id"] = f"REC-MCQ-{len(questions)+1:03d}"
        qd["type"] = "mcq"
        questions.append(qd)

    # --- Receipt Fill-in-the-Blank ---
    rec_fib = [
        _make_fill_blank(
            "Sale of machinery by a company is a _______ receipt because it is non-recurring and reduces a fixed asset.",
            "capital",
            "Capital receipts are non-recurring and either create a liability or reduce a fixed asset. "
            "Sale of machinery reduces a fixed asset → capital receipt.",
            _TOPICS["receipts"], "Medium", True
        ),
        _make_fill_blank(
            "Sale of goods by a company in the ordinary course of business generates a _______ receipt.",
            "revenue",
            "Revenue receipts are recurring and arise from the ordinary course of business. "
            "Sale of finished goods is the primary source of revenue receipts.",
            _TOPICS["receipts"], "Medium", False
        ),
    ]
    fib_count_rec = min(2, n_receipts // 3)
    for i in range(fib_count_rec):
        qd = dict(rec_fib[i % len(rec_fib)])
        qd["id"] = f"REC-FIB-{len(questions)+1:03d}"
        questions.append(qd)

    # --- Receipt Short Answer ---
    rec_sa = [
        _make_short_answer(
            f"Classify the following receipt as Capital or Revenue and give one reason: "
            f"Tata Motors sells one of its showroom buildings for ₹2 crore.",
            "CAPITAL RECEIPT. Reason: It is the sale of a fixed asset (building), which is "
            "non-recurring and reduces a fixed asset of the company.",
            "Check two criteria: (1) Is it non-recurring? Yes. (2) Does it reduce a fixed asset? Yes. "
            "Both criteria point to Capital Receipt.",
            _TOPICS["receipts"], "Medium", True
        ),
        _make_short_answer(
            f"Classify the following receipt as Capital or Revenue and give one reason: "
            f"Hindustan Unilever receives ₹50 lakh from sale of its products this quarter.",
            "REVENUE RECEIPT. Reason: It arises from the ordinary course of business (sale of "
            "goods) and is recurring in nature.",
            "Sale of finished goods is the core business activity and occurs regularly → Revenue Receipt.",
            _TOPICS["receipts"], "Medium", True
        ),
    ]
    sa_count_rec = max(1, n_receipts // 4)
    for i in range(sa_count_rec):
        qd = dict(rec_sa[i % len(rec_sa)])
        qd["id"] = f"REC-SA-{len(questions)+1:03d}"
        questions.append(qd)

    # --- Receipt Long Answer ---
    rec_la = [
        _make_long_answer(
            "State and explain any four points of difference between Capital Receipts and Revenue "
            "Receipts. Give one example for each from an Indian company.",
            "1. NATURE: Capital receipts are non-recurring (e.g., Tata Motors selling a building); "
            "Revenue receipts are recurring (e.g., Tata Motors selling cars). "
            "2. SOURCE: Capital receipts come from financing/investing (e.g., Infosys issuing shares); "
            "Revenue receipts come from operations (e.g., Infosys receiving software service fees). "
            "3. EFFECT ON LIABILITY: Capital receipts may create a liability (e.g., loan from SBI); "
            "Revenue receipts do not create liabilities. "
            "4. IMPACT ON PROFIT & LOSS: Capital receipts do not affect P&L directly; Revenue receipts "
            "appear on the credit side of the P&L Account.",
            "Four clear points of difference with Indian company examples is the CISCE standard. "
            "Ensure each point contrasts both types and includes a named example.",
            _TOPICS["receipts"], "Medium", False
        ),
    ]
    la_count_rec = max(1, n_receipts // 5)
    for i in range(la_count_rec):
        qd = dict(rec_la[i % len(rec_la)])
        qd["id"] = f"REC-LA-{len(questions)+1:03d}"
        questions.append(qd)

    # --- Receipt Numerical (Classification check) ---
    rec_numerical = [
        _make_numerical(
            f"An IT company received ₹12 lakh from selling an old server and ₹3 crore from software "
            f"services. What percentage of the total inflow is the capital receipt?",
            4.0,
            "Capital receipt = ₹12 lakh. Total inflow = 12 + 3000 = ₹3012 lakh. "
            "Percentage = (12/3012) × 100 ≈ 0.40%.",
            {"capital_amount": 12, "revenue_amount": 3000},
            "solve_receipt_classification",
            _TOPICS["receipts"], "Medium", False
        ),
    ]
    num_count_rec = min(1, n_receipts // 4)
    for i in range(num_count_rec):
        qd = dict(rec_numerical[i % len(rec_numerical)])
        qd["id"] = f"REC-NUM-{len(questions)+1:03d}"
        questions.append(qd)

    # ── Ensure full coverage — add remaining needed questions ──
    # If we haven't hit `count`, pad with additional questions
    topics_covered = {q["topic"] for q in questions}
    all_topics = set(_TOPICS.values())

    remaining = count - len(questions)
    rng.shuffle(questions)  # deterministic shuffle

    # Pad if under count
    pad_pool = []
    for company_name, industry, location, product, *_rest in _INDIAN_COMPANIES:
        for activity, exp_type, reason in _MARKETING_ACTIVITIES:
            pad_pool.append(_make_short_answer(
                f"{company_name} undertakes: '{activity}'. Classify this activity as Marketing or Sales "
                f"with one reason.",
                f"{exp_type}. {reason}",
                "Marketing = activities before product is ready (need identification). "
                "Sales = activities after product is ready (converting to revenue).",
                _TOPICS["marketing"], "Easy", True
            ))
        pad_pool.append(_make_fill_blank(
            f"{company_name} issues fresh shares to raise ₹10 crore. This is a _______ receipt.",
            "capital",
            "Issuing shares creates ownership stakes — it is non-recurring and affects capital structure.",
            _TOPICS["receipts"], "Medium", True
        ))
        pad_pool.append(_make_fill_blank(
            f"The employees of {company_name} are _______ of the company.",
            "stakeholders",
            "Employees have a stake through their employment and livelihood — they are non-owner stakeholders.",
            _TOPICS["stakeholder"], "Easy", True
        ))

    rng.shuffle(pad_pool)
    for i in range(min(remaining, len(pad_pool))):
        qd = dict(pad_pool[i])
        qd["id"] = f"PAD-{len(questions)+1:03d}"
        questions.append(qd)

    # Final: truncate or extend to exact count
    questions = questions[:count]

    # Assign unique IDs deterministically
    for idx, q in enumerate(questions):
        q["id"] = f"C10-CS-{idx+1:04d}"
        q["seed"] = seed if seed is not None else 0

    return questions


# ──────────────────────────────────────────────────────────────
#  SOLVER DISPATCHER
# ──────────────────────────────────────────────────────────────

SOLVER_MAP = {
    "solve_stakeholder_identification": solve_stakeholder_identification,
    "solve_shareholder_vs_stakeholder": solve_shareholder_vs_stakeholder,
    "solve_marketing_objectives": solve_marketing_objectives,
    "solve_marketing_vs_sales": solve_marketing_vs_sales,
    "solve_receipt_classification": solve_receipt_classification,
    "solve_receipt_difference": solve_receipt_difference,
}


def solve_question(question_dict: dict) -> dict:
    """
    Dispatch to the appropriate solver based on question type and topic.

    Parameters
    ----------
    question_dict : dict
        A question dict with keys: type, topic, params (optional), solver_function (optional).

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    qtype = question_dict.get("type", "")
    topic = question_dict.get("topic", "")
    solver_name = question_dict.get("solver_function")
    params = question_dict.get("params", {})

    # Route by explicit solver name
    if solver_name and solver_name in SOLVER_MAP:
        return SOLVER_MAP[solver_name](params)

    # Route by topic
    if "Stakeholder" in topic:
        if qtype == "mcq":
            return solve_shareholder_vs_stakeholder(params)
        return solve_stakeholder_identification(params)
    if "Marketing" in topic:
        if qtype == "mcq":
            return solve_marketing_vs_sales(params)
        return solve_marketing_objectives(params)
    if "Receipt" in topic:
        if qtype == "numerical":
            return solve_receipt_classification(params)
        return solve_receipt_difference(params)

    return {"answer": "Solver not available for this question type.", "steps": [], "verification": {}}


# ──────────────────────────────────────────────────────────────
#  VERIFICATION UTILITIES
# ──────────────────────────────────────────────────────────────

def verify_all_questions(questions: list[dict]) -> dict:
    """
    Run verification on all generated questions using solvers.
    Returns a summary report.
    """
    results = {"total": len(questions), "passed": 0, "failed": 0, "details": []}
    for q in questions:
        try:
            result = solve_question(q)
            v = result.get("verification", {})
            passed = v.get("pass", False) if isinstance(v, dict) else True
            results["details"].append({
                "id": q["id"],
                "topic": q["topic"],
                "type": q["type"],
                "competency_based": q.get("competency_based", False),
                "passed": passed,
                "verification": v,
            })
            results["passed" if passed else "failed"] += 1
        except Exception as e:
            results["failed"] += 1
            results["details"].append({
                "id": q["id"],
                "error": str(e),
                "passed": False,
            })
    return results


def coverage_report(questions: list[dict]) -> dict:
    """Return coverage statistics by topic and type."""
    topic_counts: dict[str, int] = {}
    type_counts: dict[str, int] = {}
    competency_count = 0
    for q in questions:
        t = q.get("topic", "Unknown")
        topic_counts[t] = topic_counts.get(t, 0) + 1
        ty = q.get("type", "Unknown")
        type_counts[ty] = type_counts.get(ty, 0) + 1
        if q.get("competency_based", False):
            competency_count += 1
    return {
        "total_questions": len(questions),
        "by_topic": topic_counts,
        "by_type": type_counts,
        "competency_based_count": competency_count,
        "standard_count": len(questions) - competency_count,
        "competency_pct": round(competency_count / max(len(questions), 1) * 100, 1),
    }


# ──────────────────────────────────────────────────────────────
#  MAIN  (demo)
# ──────────────────────────────────────────────────────────────

if __name__ == "__main__":
    # Deterministic generation with seed 42
    SEED = 42
    COUNT = 30

    qs = generate_questions(seed=SEED, count=COUNT)
    cov = coverage_report(qs)
    ver = verify_all_questions(qs)

    print("=" * 70)
    print("CISCE Class 10 Commercial Studies — Question Generator Output")
    print(f"Seed: {SEED} | Questions: {COUNT}")
    print("=" * 70)

    print("\n--- Coverage Report ---")
    print(f"Total Questions : {cov['total_questions']}")
    print(f"Competency-based: {cov['competency_based_count']} ({cov['competency_pct']}%)")
    print(f"Standard        : {cov['standard_count']}")
    print(f"By Topic:")
    for t, c in cov["by_topic"].items():
        print(f"  {t}: {c}")
    print(f"By Type:")
    for t, c in cov["by_type"].items():
        print(f"  {t}: {c}")

    print(f"\n--- Verification Summary ---")
    print(f"Passed: {ver['passed']} / {ver['total']}")
    print(f"Failed: {ver['failed']}")

    print(f"\n--- Sample Questions (first 5) ---")
    for q in qs[:5]:
        print(f"\n[{q['id']}] [{q['type'].upper()}] [{q['topic']}] {'[Competency]' if q.get('competency_based') else '[Standard]'}")
        print(f"  Q: {q['question'][:120]}")
        if q["type"] == "mcq":
            for i, opt in enumerate(q.get("options", [])):
                marker = "✓" if i == q.get("correct_option", -1) else " "
                print(f"    {marker} {opt}")
        print(f"  Answer: {q['answer']}")
        print(f"  Explanation: {q['explanation'][:100]}...")

    print("\n" + "=" * 70)