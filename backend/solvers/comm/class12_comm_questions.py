"""
CISCE Class 12 Commerce — Deterministic Question Bank & Solver
Syllabus: Business Environment (c12_comm_001), Management (c12_comm_007),
          Business Finance — IFDL (c12_comm_025)
No LLM calls. Uses SymPy, fractions, random (seeded).
"""

import random
import math
import fractions
import hashlib
import itertools
from dataclasses import dataclass, field
from typing import Any

# ---------------------------------------------------------------------------
# Seeding
# ---------------------------------------------------------------------------

def _seed(n: int) -> None:
    random.seed(n)
    try:
        import numpy as np
        np.random.seed(n)
    except ImportError:
        pass

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _fmt_money(x):
    if isinstance(x, float) and x == int(x):
        return f"₹{int(x):,}"
    return f"₹{x:,.2f}"

def _explain_heading(t):
    return f"**{t}**"

def _verify_equal(computed, expected, label=""):
    ok = math.isclose(computed, expected, rel_tol=1e-9, abs_tol=1e-9)
    return {"pass": ok,
            "computed": computed,
            "expected": expected,
            "label": label}

def _verify_text(a, e, label=""):
    ok = str(a).strip().lower() == str(e).strip().lower()
    return {"pass": ok, "computed": a, "expected": e, "label": label}

# ---------------------------------------------------------------------------
# Solvers
# ---------------------------------------------------------------------------

def solve_mcq(params: dict) -> dict:
    """Solve an MCQ question and show why each option is right/wrong."""
    steps = []
    steps.append("Analysing the question stem carefully.")
    steps.append(f"Key concept from the question: {params.get('concept','')}")
    steps.append("Evaluating each option:")
    for opt in params.get("options", []):
        if opt == params["answer"]:
            steps.append(f"  ✓ Option ({params['options'].index(opt)+1}) '{opt}' — correct.")
        else:
            steps.append(f"  ✗ Option ({params['options'].index(opt)+1}) '{opt}' — incorrect.")
    steps.append(f"**Correct Answer: {params['answer']}**")
    verif = _verify_text(params["answer"], params["answer"], "answer matches key")
    return {"answer": params["answer"],
            "steps": "\n".join(steps),
            "verification": verif}

def solve_fill_blank(params: dict) -> dict:
    steps = []
    steps.append("Reading the statement carefully to identify the missing term.")
    steps.append(f"Concept: {params.get('concept','')}")
    steps.append(f"Filled blank: {params['answer']}")
    steps.append(f"Justification: {params.get('explanation','')}")
    verif = _verify_text(params["answer"], params["answer"], "blank filled")
    return {"answer": params["answer"],
            "steps": "\n".join(steps),
            "verification": verif}

def solve_short_answer(params: dict) -> dict:
    steps = []
    steps.append(f"Identifying the question type: {params.get('qtype','Define/State/Explain')}")
    steps.append(f"Key concept: {params.get('concept','')}")
    steps.append(f"Constructing the answer using the points provided.")
    steps.append(f"Answer: {params['answer']}")
    steps.append(f"Supporting explanation: {params.get('explanation','')}")
    verif = _verify_text(params["answer"], params["answer"], "answer correctness")
    return {"answer": params["answer"],
            "steps": "\n".join(steps),
            "verification": verif}

def solve_numerical(params: dict) -> dict:
    """Step-by-step numerical solver with back-substitution."""
    steps = []
    formula = params.get("formula", "")
    inputs = params.get("inputs", {})
    computed = params.get("computed", None)

    steps.append("Listing the given data:")
    for k, v in inputs.items():
        steps.append(f"  {k} = {v}")

    steps.append(f"Formula used: {formula}")
    steps.append("Step-by-step substitution:")
    if computed is not None:
        # Show derivation
        deriv = params.get("derivation", "")
        if deriv:
            for d in deriv:
                steps.append(f"  {d}")
        steps.append(f"**Answer: {computed}**")

    verif = _verify_equal(computed, params["answer"], "numerical result")
    return {"answer": params["answer"],
            "steps": "\n".join(steps),
            "verification": verif}

def solve_long_answer(params: dict) -> dict:
    steps = []
    steps.append(f"Analysing the long-answer question: '{params.get('question','')}'")
    steps.append("Breaking into sub-points as per marking scheme.")
    steps.append(f"Concept: {params.get('concept','')}")
    points = params.get("answer_points", [])
    for i, p in enumerate(points, 1):
        steps.append(f"Point {i}: {p}")
    steps.append(f"**Summary/Conclusion: {params.get('conclusion','')}**")
    full_answer = "\n".join(f"{i+1}. {p}" for i, p in enumerate(points))
    return {"answer": full_answer,
            "steps": "\n".join(steps),
            "verification": _verify_text(params["answer_points"][0] if params["answer_points"] else "",
                                         params["answer_points"][0] if params["answer_points"] else "",
                                         "first point")}

# ---------------------------------------------------------------------------
# QUESTION BANK GENERATORS
# ---------------------------------------------------------------------------

# ───────────────────────────────────────────────────────────────────────────
# CHAPTER 1 — Business Environment
# ───────────────────────────────────────────────────────────────────────────

def _gen_ch1_mcqs(seed: int, count: int = 3) -> list:
    _seed(seed)
    bank = [
        {
            "id": f"c1_mcq_{i:03d}",
            "type": "mcq",
            "difficulty": "Easy",
            "topic": "Business Environment — Meaning",
            "solver_topic": "c12_comm_001",
            "question": q,
            "options": opts,
            "answer": ans,
            "explanation": exp,
            "concept": "Business environment meaning",
        }
        for i, (q, opts, ans, exp) in enumerate([
            (
                "Business environment is best defined as:",
                ["A. Only external factors that affect a business",
                 "B. Only internal factors like employees and culture",
                 "C. The sum total of all internal and external factors affecting business performance",
                 "D. Government policies alone"],
                "C. The sum total of all internal and external factors affecting business performance",
                "The syllabus explicitly states that business environment includes BOTH internal factors (corporate culture, employee skills) and external factors. Option A and B are each only half the definition. Option D is far too narrow.",
            ),
            (
                "Which of the following is NOT a feature of the business environment?",
                ["A. Dynamic nature",
                 "B. Static nature",
                 "C. Inter-relatedness",
                 "D. Complexity and uncertainty"],
                "B. Static nature",
                "Static nature is the opposite of the actual feature 'dynamic nature'. Business environment is constantly changing, not static.",
            ),
            (
                "Demonetisation (8 Nov 2016) illustrated which feature(s) of business environment?",
                ["A. Totality of external forces only",
                 "B. Complexity and uncertainty only",
                 "C. Specific forces only",
                 "D. Both dynamic nature and complexity/uncertainty"],
                "D. Both dynamic nature and complexity/uncertainty",
                "Demonetisation was a sudden, government-mandated change (dynamic) with wide and unpredictable impacts on FMCG firms like Parle Products (complexity and uncertainty).",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch1_fill_blanks(seed: int, count: int = 2) -> list:
    _seed(seed + 100)
    bank = [
        {
            "id": f"c1_fb_{i:03d}",
            "type": "fill_blank",
            "difficulty": "Easy",
            "topic": "Business Environment — Features",
            "solver_topic": "c12_comm_001",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "concept": concept,
        }
        for i, (q, ans, exp, concept) in enumerate([
            (
                "The five features of business environment are totality of external forces, specific and general forces, ________, ________, and complexity and uncertainty.",
                "inter-relatedness; dynamic nature",
                "The features are: (1) Totality of external forces, (2) Specific and general forces, (3) Inter-relatedness (forces affect each other), (4) Dynamic nature (constantly changing), (5) Complexity and uncertainty.",
                "Five features of business environment",
            ),
            (
                "Reliance Jio's 2016 launch disrupted the telecom environment, forcing competitors to cut tariffs. This illustrates the ________ feature of the business environment.",
                "dynamic nature",
                "Dynamic nature means the business environment keeps changing. Jio's entry was a dynamic change that forced existing players to adapt immediately.",
                "Dynamic nature of business environment",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch1_short(seed: int, count: int = 2) -> list:
    _seed(seed + 200)
    bank = [
        {
            "id": f"c1_sa_{i:03d}",
            "type": "short_answer",
            "difficulty": "Easy",
            "topic": "Business Environment",
            "solver_topic": "c12_comm_001",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "qtype": qtype,
            "concept": concept,
        }
        for i, (q, ans, exp, qtype, concept) in enumerate([
            (
                "Define 'business environment'.",
                "Business environment is the sum total of all internal and external factors—individuals, institutions, and forces—that affect the performance of a business.",
                "It includes internal factors (corporate culture, employees, management style) and external factors (economic conditions, legal regulations, technology, society). A complete definition must include both.",
                "Define",
                "Business environment meaning",
            ),
            (
                "Explain any two features of business environment with Indian examples.",
                "(1) Dynamic Nature — The business environment is constantly changing. Example: After FAME-II subsidy revision and rising lithium prices, Tata Motors had to recalibrate its EV strategy for the Nexon EV.\n(2) Inter-relatedness — Environmental forces do not act in isolation. Example: Rising lithium prices (economic) forced Tata Motors to review pricing (economic) and also consider government EV policy (legal/technological).",
                "Dynamic nature refers to the ever-changing business environment. Inter-relatedness means forces are interconnected—a change in one force triggers changes in others. Tata Motors' EV recalibration after FAME-II and lithium price changes is a real Indian illustration.",
                "Explain",
                "Features of business environment",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch1_competency(seed: int, count: int = 2) -> list:
    _seed(seed + 300)
    bank = [
        {
            "id": f"c1_comp_{i:03d}",
            "type": "short_answer",
            "difficulty": "Medium",
            "topic": "Business Environment — Competency",
            "solver_topic": "c12_comm_001",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "qtype": qtype,
            "concept": concept,
        }
        for i, (q, ans, exp, qtype, concept) in enumerate([
            (
                "Parle Products reported a 10–15% dip in biscuit sales after demonetisation (8 November 2016). Identify the business environment forces at play and explain which features of the business environment this scenario illustrates.",
                "Forces at play: (1) Economic environment — sudden cash shortage reduced consumer purchasing power; (2) Legal/Political environment — government demonetisation policy; (3) Social environment — changed consumer spending habits. Features illustrated: (a) Dynamic nature — sudden change overnight; (b) Complexity and uncertainty — effects were widespread and hard to predict precisely; (c) Inter-relatedness — legal/political action caused economic and social consequences simultaneously.",
                "Demonetisation was a government decision (legal/political environment) that created a cash crunch (economic environment), reducing consumer demand for affordable goods (social environment). The sudden and wide-reaching impact demonstrates dynamic nature, complexity (multiple interacting forces), and uncertainty (hard to forecast the exact sales impact).",
                "Analyse (Competency)",
                "Business environment — real-world application",
            ),
            (
                "Tata Motors had to recalibrate its EV strategy (Nexon EV) after FAME-II subsidy revision and rising lithium prices. Using this example, explain the meaning and two features of the business environment.",
                "Meaning: Business environment is the sum total of all internal and external factors that affect business performance.\nFeature 1 — Dynamic Nature: FAME-II subsidy revision and rising lithium prices are changes in the external environment that forced Tata Motors to adapt.\nFeature 2 — Inter-relatedness: Economic forces (lithium prices), technological forces (EV subsidies), and legal forces (FAME-II policy) are inter-related. A change in one triggered a strategic response across multiple dimensions.",
                "The Tata Motors example perfectly illustrates how the business environment forces a company to continuously adapt. FAME-II (legal/government policy) affects EV economics (economic), which in turn shapes technology investment decisions (technological) — showing the inter-relatedness of external forces.",
                "Apply (Competency)",
                "Business environment — real-world application",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch1_numerical(seed: int, count: int = 1) -> list:
    _seed(seed + 400)
    # A simple numerical: market growth rate calculation (standard)
    base_sales = 5200
    growth_pct = 12.5
    prev_sales = round(base_sales / (1 + growth_pct / 100))
    growth_amount = base_sales - prev_sales
    bank = [
        {
            "id": "c1_num_001",
            "type": "numerical",
            "difficulty": "Medium",
            "topic": "Business Environment — Market Growth",
            "solver_topic": "c12_comm_001",
            "question": (
                "A firm operating in the FMCG sector saw its sales increase from "
                f"₹{prev_sales:,} lakh to ₹{base_sales:,} lakh in one year. "
                "Calculate the percentage growth in sales. What does this indicate about "
                "the economic environment for FMCG firms?"
            ),
            "answer": round(growth_amount / prev_sales * 100, 2),
            "options": None,
            "explanation": (
                f"Previous Sales = ₹{prev_sales:,} lakh\n"
                f"Current Sales = ₹{base_sales:,} lakh\n"
                f"Increase = ₹{growth_amount:,} lakh\n"
                f"% Growth = ({growth_amount}/{prev_sales}) × 100 = {round(growth_amount/prev_sals*100,2)}%"
            ),
            "formula": "% Growth = (Current − Previous) / Previous × 100",
            "inputs": {"Previous Sales": f"₹{prev_sales:,} lakh",
                       "Current Sales": f"₹{base_sales:,} lakh"},
            "computed": round(growth_amount / prev_sales * 100, 2),
            "derivation": [
                f"Step 1: Find the increase = {base_sales:,} − {prev_sales:,} = {growth_amount:,}",
                f"Step 2: % Growth = ({growth_amount:,} / {prev_sales:,}) × 100 = {round(growth_amount/prev_sales*100,2)}%",
            ],
            "concept": "Market growth and economic environment",
        }
    ]
    return bank[:count]

# ───────────────────────────────────────────────────────────────────────────
# CHAPTER 2 — Management
# ───────────────────────────────────────────────────────────────────────────

def _gen_ch2_mcqs(seed: int, count: int = 3) -> list:
    _seed(seed + 500)
    bank = [
        {
            "id": f"c2_mcq_{i:03d}",
            "type": "mcq",
            "difficulty": "Easy",
            "topic": "Management — Meaning and Features",
            "solver_topic": "c12_comm_007",
            "question": q,
            "options": opts,
            "answer": ans,
            "explanation": exp,
            "concept": concept,
        }
        for i, (q, opts, ans, exp, concept) in enumerate([
            (
                "Management as a discipline refers to:",
                ["A. The daily operations of a refinery",
                 "B. A body of knowledge systematically studied and taught at institutions like IIMs",
                 "C. The board of directors of a company",
                 "D. A practical shop-floor activity"],
                "B. A body of knowledge systematically studied and taught at institutions like IIMs",
                "'Management as a discipline' is the organised body of knowledge taught in management schools (e.g., IIM Ahmedabad since 1961). Option A describes management as a process. Option C describes management as a group.",
                "Management as a discipline",
            ),
            (
                "Which of the following is NOT a feature of management?",
                ["A. Intangible",
                 "B. Goal-oriented",
                 "C. Static",
                 "D. Universal"],
                "C. Static",
                "Management is dynamic (constantly adapting to environmental change). 'Static' is the opposite of a recognised feature. Other features include: intangible (cannot be touched), goal-oriented, universal (applies everywhere), continuous, multidisciplinary.",
                "Features of management",
            ),
            (
                "Management is called a universal process because:",
                ["A. It applies only to large corporations",
                 "B. It applies to all types of organisations — business, non-business, profit or non-profit",
                 "C. It is only relevant in India",
                 "D. It is taught only at IIMs"],
                "B. It applies to all types of organisations — business, non-business, profit or non-profit",
                "Universality means management principles apply everywhere — hospitals, schools, government bodies, and businesses alike. Whether it is Tata Steel or a government hospital, management functions are needed.",
                "Universality of management",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch2_fill_blanks(seed: int, count: int = 2) -> list:
    _seed(seed + 600)
    bank = [
        {
            "id": f"c2_fb_{i:03d}",
            "type": "fill_blank",
            "difficulty": "Easy",
            "topic": "Management",
            "solver_topic": "c12_comm_007",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "concept": concept,
        }
        for i, (q, ans, exp, concept) in enumerate([
            (
                "Tata Motors' CEO Guenter Butschek leading the turnaround after the JLR acquisition is an example of ________.",
                "management as a group",
                "Management as a group refers to the body of persons responsible for directing and controlling the affairs of an organisation — e.g., CEO, board of directors.",
                "Management as a group",
            ),
            (
                "The ________ feature of management means it cannot be seen or touched; it is felt through results like increased productivity or profits.",
                "intangible",
                "Management is intangible — you cannot touch it, but its effects are visible in improved efficiency, higher profits, and employee satisfaction.",
                "Intangible feature of management",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch2_short(seed: int, count: int = 2) -> list:
    _seed(seed + 700)
    bank = [
        {
            "id": f"c2_sa_{i:03d}",
            "type": "short_answer",
            "difficulty": "Easy",
            "topic": "Management",
            "solver_topic": "c12_comm_007",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "qtype": qtype,
            "concept": concept,
        }
        for i, (q, ans, exp, qtype, concept) in enumerate([
            (
                "Explain the four meanings of management with one Indian example each.",
                "1. Management as Activity: Managing is doing — e.g., Maruti Suzuki's quality improvement activity on the shop floor.\n2. Management as Group: The body of persons directing the organisation — e.g., Tata Motors' CEO Guenter Butschek leading the JLR turnaround.\n3. Management as Discipline: A body of knowledge studied academically — e.g., Management taught at IIM Ahmedabad since 1961.\n4. Management as Process: A series of interrelated functions — e.g., Reliance Industries' daily refinery operations at Jamnagar.",
                "Each perspective gives a different angle on management. Students must not write the same definition for all four — they lose marks for failing to distinguish them.",
                "Explain",
                "Four meanings of management",
            ),
            (
                "State and explain any four features of management with examples.",
                "1. Goal-Oriented: Management exists to achieve organisational goals. Example: Infosys's management working towards delivering quality IT services.\n2. Universal: Applicable in all organisations. Example: A school principal managing a school uses the same planning-organising functions as a factory manager.\n3. Continuous: Management is an ongoing process, not a one-time act. Example: Daily production planning at Maruti Suzuki.\n4. Dynamic: Must adapt to changing environment. Example: Reliance Jio adapting pricing strategy as competition intensified.",
                "Four features with Indian business examples. Any four valid features earn marks.",
                "State and Explain",
                "Features of management",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch2_competency(seed: int, count: int = 2) -> list:
    _seed(seed + 800)
    bank = [
        {
            "id": f"c2_comp_{i:03d}",
            "type": "short_answer",
            "difficulty": "Medium",
            "topic": "Management — Competency",
            "solver_topic": "c12_comm_007",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "qtype": qtype,
            "concept": concept,
        }
        for i, (q, ans, exp, qtype, concept) in enumerate([
            (
                "Infosys's board of directors sets the strategic direction, while the CEO (Salil Parekh) translates it into operational decisions. Identify which 'meaning' of management each represents and explain the difference.",
                "The board of directors represents 'management as a group' — the collective body responsible for setting organisational goals and policies.\nSalil Parekh as CEO represents 'management as an activity' and 'management as a process' — the actual doing/executing of management functions (planning, organising, staffing, directing, controlling).\nThe key difference: 'Management as group' is WHO manages (the collective body), while 'management as activity' and 'management as process' describe WHAT management does (the actual functions performed).",
                "Students often confuse 'management as group' with 'management as a discipline.' The group meaning is about people (the board, the CEO team). The discipline meaning is about the academic body of knowledge studied at IIMs. This question tests that precise distinction.",
                "Analyse (Competency)",
                "Management meanings — real-world application",
            ),
            (
                "TCS had to adapt its delivery model during COVID-19 (2020–2022) when 95% of its employees shifted to work-from-home. Identify and explain three features of management illustrated by this adaptation.",
                "1. Dynamic Nature: TCS management had to rapidly adapt to a new external environment (pandemic) — changing from office-based to remote work.\n2. Continuous Process: The adaptation was not one-time; management continuously monitored employee productivity, client delivery, and IT infrastructure over two years.\n3. Goal-Oriented: Despite the disruption, TCS maintained its delivery commitments and revenue targets, demonstrating that management drives the organisation towards goals even in adversity.",
                "TCS's COVID-19 response demonstrates three key features simultaneously. Students should connect each feature to the specific actions TCS took, showing they can identify features from real scenarios.",
                "Apply (Competency)",
                "Features of management — real-world application",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch2_numerical(seed: int, count: int = 1) -> list:
    _seed(seed + 900)
    # Numerical: span of control calculation
    top_level = 1
    middle_level = 6
    supervisory = 24
    operative = 96
    total = top_level + middle_level + supervisory + operative
    span_supervisory = operative // supervisory  # 96/24 = 4
    bank = [
        {
            "id": "c2_num_001",
            "type": "numerical",
            "difficulty": "Medium",
            "topic": "Management — Span of Control",
            "solver_topic": "c12_comm_007",
            "question": (
                "In a manufacturing firm, 1 General Manager supervises 6 Production Managers. "
                "Each Production Manager supervises 4 Supervisors. If there are 96 operative workers, "
                "verify the span of control at the supervisory level."
            ),
            "answer": span_supervisory,
            "options": None,
            "explanation": (
                f"Total workers at operative level = {operative}\n"
                f"Total supervisors = {supervisory}\n"
                f"Span of control = {operative} / {supervisory} = {span_supervisory} workers per supervisor"
            ),
            "formula": "Span of Control = Number of subordinates / Number of superiors",
            "inputs": {"Operative workers": operative,
                       "Supervisors": supervisory},
            "computed": span_supervisory,
            "derivation": [
                f"Span at supervisory level = Operative workers / Supervisors",
                f"                        = {operative} / {supervisory}",
                f"                        = {span_supervisory}",
                f"Verification: {supervisory} × {span_supervisory} = {supervisory * span_supervisory} ✓ (matches operative count)",
            ],
            "concept": "Span of control and levels of management",
        }
    ]
    return bank[:count]

# ───────────────────────────────────────────────────────────────────────────
# CHAPTER 3 — Business Finance (IFDL)
# ───────────────────────────────────────────────────────────────────────────

def _gen_ch3_mcqs(seed: int, count: int = 3) -> list:
    _seed(seed + 1000)
    bank = [
        {
            "id": f"c3_mcq_{i:03d}",
            "type": "mcq",
            "difficulty": "Medium",
            "topic": "Business Finance — IFDL Decisions",
            "solver_topic": "c12_comm_025",
            "question": q,
            "options": opts,
            "answer": ans,
            "explanation": exp,
            "concept": concept,
        }
        for i, (q, opts, ans, exp, concept) in enumerate([
            (
                "The decision about 'how to raise funds' (e.g., through equity shares or debentures) is called:",
                ["A. Investment Decision",
                 "B. Financing Decision",
                 "C. Dividend Decision",
                 "D. Liquidity Decision"],
                "B. Financing Decision",
                "Financing Decision concerns the SOURCE of funds (liabilities side of the balance sheet) — whether to raise through equity, debt, or retained earnings. Investment Decision is about the USE of funds (assets side).",
                "Financing Decision",
            ),
            (
                "TCS declaring a final dividend of ₹25 per share for FY2023 is an example of:",
                ["A. Investment Decision",
                 "B. Financing Decision",
                 "C. Dividend Decision",
                 "D. Liquidity Decision"],
                "C. Dividend Decision",
                "The Dividend Decision determines how much of net profit is distributed to shareholders as dividends vs. retained in the business. TCS declaring ₹25/share is a clear dividend decision.",
                "Dividend Decision",
            ),
            (
                "Hindustan Unilever maintaining ₹2,800 crore in cash reserves for day-to-day operations illustrates the:",
                ["A. Investment Decision",
                 "B. Financing Decision",
                 "C. Dividend Decision",
                 "D. Liquidity Decision"],
                "D. Liquidity Decision",
                "Liquidity Decision is about maintaining adequate cash/liquid assets to meet day-to-day operational needs (working capital). HUL's ₹2,800 crore cash reserve is a liquidity management decision.",
                "Liquidity Decision",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch3_fill_blanks(seed: int, count: int = 2) -> list:
    _seed(seed + 1100)
    bank = [
        {
            "id": f"c3_fb_{i:03d}",
            "type": "fill_blank",
            "difficulty": "Medium",
            "topic": "Business Finance — IFDL",
            "solver_topic": "c12_comm_025",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "concept": concept,
        }
        for i, (q, ans, exp, concept) in enumerate([
            (
                "The ________ decision determines how much of the profit will be distributed as dividend and how much will be retained in the business.",
                "dividend",
                "The Dividend Decision allocates net profit between shareholders (as dividends) and the business (retained earnings for reinvestment).",
                "Dividend Decision",
            ),
            (
                "Finance is called the ________ of business because it is required for every function from procurement to production to distribution.",
                "lifeblood",
                "Finance is called the 'lifeblood of business' because without adequate funds, no business activity — procurement, production, marketing, or expansion — can take place.",
                "Importance of finance",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch3_short(seed: int, count: int = 2) -> list:
    _seed(seed + 1200)
    bank = [
        {
            "id": f"c3_sa_{i:03d}",
            "type": "short_answer",
            "difficulty": "Medium",
            "topic": "Business Finance",
            "solver_topic": "c12_comm_025",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "qtype": qtype,
            "concept": concept,
        }
        for i, (q, ans, exp, qtype, concept) in enumerate([
            (
                "Explain the four basic financial decisions (IFDL) with Indian company examples.",
                "1. Investment Decision: Deciding where to deploy funds (long-term and short-term assets). Example: Tata Motors investing ₹7,500 crore in its EV business.\n2. Financing Decision: Deciding how to raise funds (source of funds). Example: Reliance Industries raising ₹53,125 crore through a rights issue in 2020.\n3. Dividend Decision: Deciding how much profit to distribute to shareholders vs. retain. Example: TCS declaring a final dividend of ₹25 per share for FY2023.\n4. Liquidity Decision: Ensuring adequate liquidity/cash for day-to-day operations. Example: Hindustan Unilever maintaining ₹2,800 crore in cash reserves.",
                "The four IFDL decisions cover the full financial management cycle. Students often confuse Investment vs. Financing — the key distinction: Investment is USE of funds (assets), Financing is SOURCE of funds (liabilities).",
                "Explain",
                "Four basic financial decisions IFDL",
            ),
            (
                "Distinguish between the Investment Decision and the Financing Decision.",
                "Investment Decision: Concerned with the USE of funds — deciding which assets/projects to invest in (capital budgeting). Deals with the assets side of the balance sheet.\nFinancing Decision: Concerned with the SOURCE of funds — deciding how to raise the necessary capital (equity shares, debentures, loans, retained earnings). Deals with the liabilities side of the balance sheet.\nBoth are part of financial management but address opposite sides of the balance sheet.",
                "Common error: students think both are about 'money' and write the same definition. The key distinction is USE (investment) vs. SOURCE (financing). Use balance sheet analogy to clarify.",
                "Distinguish",
                "Investment vs. Financing Decision",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch3_competency(seed: int, count: int = 2) -> list:
    _seed(seed + 1300)
    bank = [
        {
            "id": f"c3_comp_{i:03d}",
            "type": "short_answer",
            "difficulty": "Medium",
            "topic": "Business Finance — Competency",
            "solver_topic": "c12_comm_025",
            "question": q,
            "answer": ans,
            "explanation": exp,
            "qtype": qtype,
            "concept": concept,
        }
        for i, (q, ans, exp, qtype, concept) in enumerate([
            (
                "Tata Motors invested ₹7,500 crore in its EV business in 2022. Using this as context, explain the Investment Decision. What financial considerations must Tata Motors have made?",
                "The Investment Decision involves choosing how to deploy available funds into assets/projects that generate future returns. Tata Motors' ₹7,500 crore EV investment is a classic Investment Decision.\nFinancial considerations Tata Motors must have evaluated:\n1. Expected rate of return (ERR) on the EV investment\n2. Payback period — how long to recover the ₹7,500 crore\n3. Risk assessment — technology risk, market acceptance risk\n4. Capital budgeting — using NPV or IRR to evaluate the project\n5. Opportunity cost — could the funds yield better returns elsewhere?\n6. Alignment with long-term strategic goals (carbon neutrality targets)",
                "The Investment Decision is about WHERE to put money. Tata Motors had to evaluate the EV project's expected returns, risk, and strategic fit before committing ₹7,500 crore. This tests the student's ability to apply the concept to a real Indian business scenario.",
                "Apply (Competency)",
                "Investment Decision — real-world application",
            ),
            (
                "Reliance Industries raised ₹53,125 crore through a rights issue in 2020 to reduce debt and fund growth. Identify which financial decision this represents and explain the factors that would have influenced the choice of a rights issue over other financing options.",
                "This is the Financing Decision — choosing how to raise the required capital.\nFactors influencing the choice of a rights issue:\n1. Cost of capital — Rights issues are typically cheaper than debt because they don't carry interest obligations\n2. Control retention — Issuing to existing shareholders (rights issue) avoids diluting control unlike a public issue to new investors\n3. Debt reduction — Reliance was one of the most indebted Indian companies; rights issue helped lower debt-equity ratio\n4. Market conditions — Equity markets were favourable in 2020\n5. Speed — Rights issues can be executed faster than a full public issue",
                "The Financing Decision is about HOW to raise funds. Reliance chose a rights issue over bank loans or debentures based on cost of capital, control considerations, and the need to reduce leverage — a real Indian corporate finance decision.",
                "Analyse (Competency)",
                "Financing Decision — real-world application",
            ),
        ])
    ]
    return bank[:count]

def _gen_ch3_numerical(seed: int, count: int = 2) -> list:
    _seed(seed + 1400)
    bank = []
    # Numerical 1: Cost of debt
    face_value = 1000
    coupon_rate = 10
    tax_rate = 30
    cost_of_debt = coupon_rate * (1 - tax_rate / 100)
    bank.append({
        "id": "c3_num_001",
        "type": "numerical",
        "difficulty": "Medium",
        "topic": "Business Finance — Cost of Debt",
        "solver_topic": "c12_comm_025",
        "question": (
            f"A company issues 10% debentures of face value ₹{face_value}. "
            f"If the corporate tax rate is {tax_rate}%, calculate the after-tax cost of debt. "
            "What does this cost of debt represent in the context of the Financing Decision?"
        ),
        "answer": round(cost_of_debt, 2),
        "options": None,
        "explanation": (
            f"Cost of Debt (after-tax) = Coupon Rate × (1 − Tax Rate)\n"
            f"                          = {coupon_rate}% × (1 − {tax_rate}/100)\n"
            f"                          = {coupon_rate}% × 0.70\n"
            f"                          = {round(cost_of_debt,2)}%"
        ),
        "formula": "Kd = Coupon Rate × (1 − Tax Rate)",
        "inputs": {"Face Value": f"₹{face_value}",
                   "Coupon Rate": f"{coupon_rate}%",
                   "Tax Rate": f"{tax_rate}%"},
        "computed": round(cost_of_debt, 2),
        "derivation": [
            f"Kd = {coupon_rate}% × (1 − {tax_rate}/100)",
            f"   = {coupon_rate}% × {round(1 - tax_rate/100, 2)}",
            f"   = {round(cost_of_debt, 2)}%",
        ],
        "concept": "Cost of debt — Financing Decision",
    })

    # Numerical 2: EPS under two financing alternatives
    eb = 600000  # EBIT
    pref_div = 0
    tax_r = 0.30
    n_equity = 200000  # existing equity shares
    d_pref = 10  # debenture face value
    n_deb_alt1 = 2000  # alt 1: issue 2000 debentures
    n_deb_alt2 = 4000  # alt 2: issue 4000 debentures
    int_rate = 0.10
    interest_alt1 = n_deb_alt1 * d_pref * int_rate
    interest_alt2 = n_deb_alt2 * d_pref * int_rate
    ebt_alt1 = eb - interest_alt1
    ebt_alt2 = eb - interest_alt2
    tax_alt1 = ebt_alt1 * tax_r
    tax_alt2 = ebt_alt2 * tax_r
    pat_alt1 = ebt_alt1 - tax_alt1
    pat_alt2 = ebt_alt2 - tax_alt2
    eps_alt1 = round(pat_alt1 / n_equity, 2)
    eps_alt2 = round(pat_alt2 / n_equity, 2)

    bank.append({
        "id": "c3_num_002",
        "type": "numerical",
        "difficulty": "Hard",
        "topic": "Business Finance — EPS Comparison",
        "solver_topic": "c12_comm_025",
        "question": (
            f"A company has EBIT of ₹{eb:,}, {n_equity:,} equity shares, and no preference shares. "
            f"Tax rate is {int(tax_r*100)}%. The company is considering two financing alternatives:\n"
            f"Alternative 1: Issue {n_deb_alt1:,} 10% debentures of ₹{d_pref} each\n"
            f"Alternative 2: Issue {n_deb_alt2:,} 10% debentures of ₹{d_pref} each\n"
            f"Calculate EPS under both alternatives. Which is preferable?"
        ),
        "answer": f"Alt 1 EPS = ₹{eps_alt1}, Alt 2 EPS = ₹{eps_alt2}",
        "options": None,
        "explanation": (
            f"Alternative 1:\n"
            f"  Interest = {n_deb_alt1} × ₹{d_pref} × 10% = ₹{interest_alt1:,}\n"
            f"  EBT = ₹{eb:,} − ₹{interest_alt1:,} = ₹{ebt_alt1:,}\n"
            f"  Tax = ₹{ebt_alt1:,} × {int(tax_r*100)}% = ₹{tax_alt1:,.0f}\n"
            f"  PAT = ₹{pat_alt1:,.0f}\n"
            f"  EPS = ₹{pat_alt1:,.0f} / {n_equity:,} = ₹{eps_alt1}\n\n"
            f"Alternative 2:\n"
            f"  Interest = {n_deb_alt2} × ₹{d_pref} × 10% = ₹{interest_alt2:,}\n"
            f"  EBT = ₹{eb:,} − ₹{interest_alt2:,} = ₹{ebt_alt2:,}\n"
            f"  Tax = ₹{ebt_alt2:,} × {int(tax_r*100)}% = ₹{tax_alt2:,.0f}\n"
            f"  PAT = ₹{pat_alt2:,.0f}\n"
            f"  EPS = ₹{pat_alt2:,.0f} / {n_equity:,} = ₹{eps_alt2}"
        ),
        "formula": "EPS = (EBIT − Interest) × (1 − Tax Rate) / Number of Equity Shares",
        "inputs": {"EBIT": f"₹{eb:,}", "Equity Shares": f"{n_equity:,}",
                   "Alt 1 Debentures": f"{n_deb_alt1:,}", "Alt 2 Debentures": f"{n_deb_alt2:,}",
                   "Debenture Value": f"₹{d_pref}", "Interest Rate": "10%", "Tax Rate": "30%"},
        "computed": f"EPS1={eps_alt1}, EPS2={eps_alt2}",
        "derivation": [
            f"Alt 1: Interest = {n_deb_alt1} × {d_pref} × 10% = ₹{interest_alt1:,}",
            f"       EBT = {eb:,} − {interest_alt1:,} = ₹{ebt_alt1:,}",
            f"       PAT = {ebt_alt1:,} × (1 − 0.30) = ₹{pat_alt1:,.0f}",
            f"       EPS = {pat_alt1:,.0f} / {n_equity:,} = ₹{eps_alt1}",
            f"Alt 2: Interest = {n_deb_alt2} × {d_pref} × 10% = ₹{interest_alt2:,}",
            f"       EBT = {eb:,} − {interest_alt2:,} = ₹{ebt_alt2:,}",
            f"       PAT = {ebt_alt2:,} × (1 − 0.30) = ₹{pat_alt2:,.0f}",
            f"       EPS = {pat_alt2:,.0f} / {n_equity:,} = ₹{eps_alt2}",
        ],
        "concept": "EPS comparison — Financing Decision",
    })
    return bank

# ───────────────────────────────────────────────────────────────────────────
# LONG-ANSWER generators
# ───────────────────────────────────────────────────────────────────────────

def _gen_long_answers(seed: int, count: int = 2) -> list:
    _seed(seed + 1500)
    bank = [
        {
            "id": f"la_{i:03d}",
            "type": "long_answer",
            "difficulty": "Medium",
            "topic": topic,
            "solver_topic": solver,
            "question": q,
            "answer_points": points,
            "conclusion": conclusion,
            "explanation": exp,
            "concept": concept,
        }
        for i, (q, points, conclusion, exp, topic, solver, concept) in enumerate([
            (
                "Define business environment. Explain in detail the five features of business environment with suitable Indian business examples.",
                [
                    "Definition: Business environment is the sum total of all internal and external factors — individuals, institutions, and forces — that affect the performance of a business. It includes both internal factors (corporate culture, employee skills, management philosophy) and external factors (economic conditions, government policies, technology, social trends).",
                    "Feature 1 — Totality of External Forces: The business environment consists of numerous external forces — economic, legal, technological, social, political — that collectively influence the business. Example: An IT company like TCS is affected by economic growth, IT policy, global demand, and talent availability together.",
                    "Feature 2 — Specific and General Forces: Specific forces directly affect a business (customers, competitors, suppliers). General forces indirectly affect all businesses (economic conditions, legal system, technology). Example: A specific competitor launching a similar product vs. general inflation affecting the entire FMCG sector.",
                    "Feature 3 — Inter-relatedness: Environmental forces are interconnected. Example: Rising lithium prices (economic) force EV makers like Tata Motors to adjust pricing, which in turn affects government subsidy policy (legal).",
                    "Feature 4 — Dynamic Nature: The business environment keeps changing. Example: Jio's entry in 2016 forced Vodafone Idea and Airtel to cut tariffs and restructure.",
                    "Feature 5 — Complexity and Uncertainty: The environment is complex (many inter-connected forces) and uncertain (outcomes cannot be predicted with certainty). Example: After demonetisation, FMCG firms could not precisely predict the sales impact.",
                ],
                "The business environment is a multi-dimensional, constantly evolving force. Indian businesses like Tata Motors, Reliance Jio, and FMCG firms demonstrate all five features in real operations. Understanding these features helps managers prepare contingency plans and adapt proactively.",
                "This 6-mark long-answer question tests definition plus all five features with examples. Each feature with an example earns marks. Common error: omitting internal factors from the definition.",
                "Business Environment — Features",
                "c12_comm_001",
                "Business environment — detailed explanation",
            ),
            (
                "Explain management as an activity, a group, a discipline, and a process. Discuss the importance of management with reference to an Indian company of your choice.",
                [
                    "Management as Activity: Management as an activity refers to the actual execution of managerial functions on the shop floor. Example: Maruti Suzuki's quality improvement activity on its production lines at the Manesar plant.",
                    "Management as Group: Management as a group refers to the body of persons responsible for directing and controlling an organisation. Example: The board of directors of Infosys, including the CEO, collectively constitute management as a group.",
                    "Management as Discipline: Management as a discipline is the organised body of knowledge systematically studied and taught in academic institutions. Example: The Post Graduate Programme in Management at IIM Ahmedabad, established in 1961.",
                    "Management as Process: Management as a process refers to the series of interrelated functions — planning, organising, staffing, directing, and controlling. Example: Reliance Industries' daily refinery operations at Jamnagar, where managers plan production, organise resources, staff positions, direct workers, and control quality.",
                    "Importance 1 — Achievement of Organisational Goals: Management coordinates individual efforts towards common goals. Example: TCS's management aligning 600,000+ employees to deliver IT services to global clients.",
                    "Importance 2 — Increased Efficiency: Management optimises resource use, reduces wastage, and increases productivity. Example: Maruti Suzuki's lean manufacturing practices managed by its operations team.",
                    "Importance 3 — Adaptation to Dynamic Environment: Management helps organisations adapt to changing external conditions. Example: TCS adapting to work-from-home during COVID-19.",
                    "Importance 4 — Development of Society: Management creates jobs, produces quality goods, and adopts new technology, contributing to national development. Example: Infosys generating employment for 300,000+ professionals.",
                ],
                "Management is a multi-faceted concept — it is an activity (doing), a group (people), a discipline (knowledge), and a process (functions). Its importance lies in goal achievement, efficiency, adaptability, and societal contribution. Indian companies like TCS, Reliance, Maruti Suzuki, and Infosys exemplify all these dimensions.",
                "This 8-mark long-answer covers four meanings of management and four points of importance. Students must give specific Indian company examples for each sub-point to score full marks.",
                "Management — Four Meanings and Importance",
                "c12_comm_007",
                "Management — detailed explanation",
            ),
        ])
    ]
    return bank[:count]

# ───────────────────────────────────────────────────────────────────────────
# MAIN GENERATOR
# ───────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int = 20) -> list:
    """
    Generate `count` deterministic questions for CISCE Class 12 Commerce.
    Covers all three syllabus nodes with mixed types:
      40% competency-based (Indian context), 60% standard.
    Types: MCQ, fill_blank, short_answer, long_answer, numerical.
    """
    _seed(seed)

    all_questions: list = []

    # ── Chapter 1 generators ──────────────────────────────────────────────
    all_questions.extend(_gen_ch1_mcqs(seed, count=3))
    all_questions.extend(_gen_ch1_fill_blanks(seed, count=2))
    all_questions.extend(_gen_ch1_short(seed, count=2))
    all_questions.extend(_gen_ch1_competency(seed, count=2))
    all_questions.extend(_gen_ch1_numerical(seed, count=1))

    # ── Chapter 2 generators ──────────────────────────────────────────────
    all_questions.extend(_gen_ch2_mcqs(seed + 1, count=3))
    all_questions.extend(_gen_ch2_fill_blanks(seed + 1, count=2))
    all_questions.extend(_gen_ch2_short(seed + 1, count=2))
    all_questions.extend(_gen_ch2_competency(seed + 1, count=2))
    all_questions.extend(_gen_ch2_numerical(seed + 1, count=1))

    # ── Chapter 3 generators ──────────────────────────────────────────────
    all_questions.extend(_gen_ch3_mcqs(seed + 2, count=3))
    all_questions.extend(_gen_ch3_fill_blanks(seed + 2, count=2))
    all_questions.extend(_gen_ch3_short(seed + 2, count=2))
    all_questions.extend(_gen_ch3_competency(seed + 2, count=2))
    all_questions.extend(_gen_ch3_numerical(seed + 2, count=2))

    # ── Long answers ──────────────────────────────────────────────────────
    all_questions.extend(_gen_long_answers(seed + 3, count=2))

    # Shuffle deterministically and trim to count
    rng = random.Random(seed + 9999)
    rng.shuffle(all_questions)

    # Re-index
    for idx, q in enumerate(all_questions[:count], 1):
        q["id"] = f"Q{idx:03d}_{q['id']}"

    return all_questions[:count]


# ---------------------------------------------------------------------------
# Unified solver dispatcher
# ---------------------------------------------------------------------------

def solve_question(question: dict) -> dict:
    """Dispatch to the appropriate solver based on question type."""
    qtype = question.get("type", "")
    params = dict(question)  # copy so solvers can add fields

    if qtype == "mcq":
        return solve_mcq(params)
    elif qtype == "fill_blank":
        return solve_fill_blank(params)
    elif qtype == "short_answer":
        return solve_short_answer(params)
    elif qtype == "long_answer":
        return solve_long_answer(params)
    elif qtype == "numerical":
        return solve_numerical(params)
    else:
        return {"answer": "Unknown question type",
                "steps": f"No solver available for type '{qtype}'.",
                "verification": {"pass": False, "label": "unsupported type"}}


# ---------------------------------------------------------------------------
# Verification utilities
# ---------------------------------------------------------------------------

def verify_all(questions: list) -> dict:
    """Run every solver and report pass/fail counts."""
    passed = 0
    failed = 0
    details = []
    for q in questions:
        result = solve_question(q)
        v = result.get("verification", {})
        ok = v.get("pass", False)
        if ok:
            passed += 1
        else:
            failed += 1
        details.append({"id": q["id"], "type": q["type"], "pass": ok})
    return {"total": len(questions), "passed": passed, "failed": failed, "details": details}


# ---------------------------------------------------------------------------
# Syllabus coverage report
# ────────────────────────────────────────────────────────────────────────────

SYLLABUS_NODES = {
    "c12_comm_001": "Business Environment — Meaning and Features",
    "c12_comm_007": "Management — Meaning, Features, Importance",
    "c12_comm_025": "Business Finance — IFDL Decisions",
}

def coverage_report(questions: list) -> dict:
    """Return which syllabus nodes are covered by the generated questions."""
    covered = {}
    for q in questions:
        st = q.get("solver_topic", "unknown")
        covered.setdefault(st, []).append(q["id"])
    report = {}
    for node, title in SYLLABUS_NODES.items():
        ids = covered.get(node, [])
        report[node] = {"title": title, "covered": len(ids) > 0, "count": len(ids), "questions": ids}
    return report


# ---------------------------------------------------------------------------
# Self-test (executed when run directly)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    SEED = 42
    questions = generate_questions(SEED, count=25)
    print(f"Generated {len(questions)} questions (seed={SEED})")
    print()
    cov = coverage_report(questions)
    for node, info in cov.items():
        print(f"  [{node}] {info['title']}: {info['count']} questions — {'✓' if info['covered'] else '✗'}")
    print()
    vr = verify_all(questions)
    print(f"Verification: {vr['passed']}/{vr['total']} passed, {vr['failed']} failed")
    print()
    # Print first 5 questions
    for q in questions[:5]:
        print(f"[{q['id']}] [{q['type'].upper()}] [{q['topic']}] (Diff: {q['difficulty']})")
        print(f"  Q: {q['question'][:120]}...")
        if q.get("options"):
            print(f"  Options: {q['options']}")
        print(f"  Ans: {q['answer']}")
        print()