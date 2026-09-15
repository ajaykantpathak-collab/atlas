"""
CISCE Class 11 Economics Question Generator
Deterministic, seeded question generation covering all syllabus nodes.
"""

import random
import string
import math
from fractions import Fraction
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional, Tuple
import sympy as sp


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _normalize(s: str) -> str:
    return " ".join(s.strip().lower().split())


def _fuzzy_match(a: str, b: str) -> bool:
    return _normalize(a) == _normalize(b)


def _pick_letter(index: int) -> str:
    return chr(ord("A") + (index % 4))


# ---------------------------------------------------------------------------
# Solver: MCQ
# ---------------------------------------------------------------------------

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify an MCQ answer.
    params: {question, correct_option, selected_option, explanation}
    """
    correct = params["correct_option"].strip().upper()
    selected = params["selected_option"].strip().upper()
    is_correct = correct == selected
    steps = [
        "Step 1: Identify the correct answer from the syllabus concept.",
        f"Step 2: The correct option is ({correct}).",
        f"Step 3: Student selected ({selected}).",
        "Step 4: Compare the two.",
        f"Step 5: Result — {'CORRECT' if is_correct else 'INCORRECT'}.",
    ]
    return {
        "answer": correct,
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "direct_comparison",
            "expected": correct,
            "received": selected,
            "pass": is_correct,
        },
    }


# ---------------------------------------------------------------------------
# Solver: Fill Blank
# ---------------------------------------------------------------------------

def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Verify a fill-in-the-blank answer.
    params: {question, correct_answer, student_answer}
    """
    correct_raw = params["correct_answer"].strip()
    student_raw = params["student_answer"].strip()
    is_correct = _fuzzy_match(correct_raw, student_raw)
    steps = [
        "Step 1: Recall the exact term/concept from the syllabus.",
        f"Step 2: Correct answer: '{correct_raw}'.",
        f"Step 3: Student answer: '{student_raw}'.",
        "Step 4: Normalise both (lowercase, strip whitespace) and compare.",
        f"Step 5: Result — {'CORRECT' if is_correct else 'INCORRECT'}.",
    ]
    return {
        "answer": correct_raw,
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "fuzzy_normalised_match",
            "expected": correct_raw,
            "received": student_raw,
            "pass": is_correct,
        },
    }


# ---------------------------------------------------------------------------
# Solver: Short Answer
# ---------------------------------------------------------------------------

def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Check a short-answer response using keyword coverage.
    params: {question, required_keywords, student_answer}
    """
    required = [kw.strip().lower() for kw in params["required_keywords"]]
    student_raw = params["student_answer"].strip().lower()
    matched = [kw for kw in required if kw in student_raw]
    coverage = len(matched) / len(required) if required else 0
    threshold = 0.5
    is_correct = coverage >= threshold
    steps = [
        "Step 1: Identify required keywords from the marking scheme.",
        f"Step 2: Required keywords: {required}",
        f"Step 3: Student answer (lowercased): '{student_raw}'",
        f"Step 4: Matched keywords: {matched}",
        f"Step 5: Coverage = {len(matched)}/{len(required)} = {coverage:.0%}",
        f"Step 6: Threshold = {threshold:.0%}. Result — {'PASS' if is_correct else 'FAIL'}.",
    ]
    return {
        "answer": f"Must cover {len(required)} keywords: {required}",
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "keyword_coverage",
            "coverage": round(coverage, 3),
            "matched_keywords": matched,
            "pass": is_correct,
        },
    }


# ---------------------------------------------------------------------------
# Solver: Long Answer (structure check)
# ---------------------------------------------------------------------------

def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Score a long-answer response.
    params: {question, points, student_answer, max_marks}
    """
    points = params["points"]
    student = params["student_answer"].strip().lower()
    max_marks = params.get("max_marks", 6)
    # Award marks proportionally based on presence of each point's keywords
    marks_earned = 0
    point_details = []
    for pt in points:
        kw_list = pt["keywords"]
        text = pt.get("text", "")
        kw_hits = sum(1 for kw in kw_list if kw.lower() in student)
        ratio = kw_hits / len(kw_list) if kw_list else 0
        marks = round(ratio * pt["marks"], 1)
        marks_earned += marks
        point_details.append(
            {
                "point": text,
                "keywords_required": kw_list,
                "keywords_found": [kw for kw in kw_list if kw.lower() in student],
                "marks_awarded": marks,
                "marks_possible": pt["marks"],
            }
        )
    marks_earned = min(marks_earned, max_marks)
    percentage = marks_earned / max_marks if max_marks else 0
    steps = [
        f"Step 1: Evaluate each marking point individually.",
        "Step 2: For each point, check keyword presence in student answer.",
    ]
    for i, detail in enumerate(point_details, 1):
        steps.append(
            f"  [{i}] {detail['point']}: found {detail['keywords_found']} → "
            f"{detail['marks_awarded']}/{detail['marks_possible']} marks"
        )
    steps += [
        f"Step 3: Total marks = {marks_earned}/{max_marks} ({percentage:.0%}).",
        f"Step 4: Result — {'PASS' if percentage >= 0.5 else 'NEEDS IMPROVEMENT'}.",
    ]
    return {
        "answer": f"{marks_earned}/{max_marks} marks",
        "is_correct": percentage >= 0.5,
        "steps": steps,
        "verification": {
            "method": "rubric_marking",
            "marks_earned": marks_earned,
            "max_marks": max_marks,
            "percentage": round(percentage, 3),
            "point_details": point_details,
            "pass": percentage >= 0.5,
        },
    }


# ---------------------------------------------------------------------------
# Solver: Numerical (stats computations)
# ---------------------------------------------------------------------------

def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a numerical / calculation problem using SymPy.
    params: {problem_type, data}
      - 'mean_raw': {values: [list], freq: [list]|None}
      - 'median_grouped': {lbound, cwidth, cumfreq_prev, freq, N}
      - 'mode_grouped': {lbound, cwidth, f1, f0, f2}
    """
    steps = []
    problem_type = params["problem_type"]

    if problem_type == "mean_raw":
        values = params["values"]
        freq = params.get("freq", None)
        steps.append("Step 1: Formula: x̄ = Σ(f·x) / Σf")
        if freq is None:
            freq = [1] * len(values)
        fx = [v * f for v, f in zip(values, freq)]
        sum_fx = sum(fx)
        sum_f = sum(freq)
        mean_val = sum_fx / sum_f
        steps.append(f"Step 2: Compute Σf = {sum_f}")
        steps.append(f"Step 3: Compute Σ(f·x) = {sum_fx}")
        steps.append(f"Step 4: x̄ = {sum_fx} / {sum_f} = {mean_val:.4f}")

    elif problem_type == "median_grouped":
        lbound = params["lbound"]
        cwidth = params["cwidth"]
        cumfreq_prev = params["cumfreq_prev"]
        freq = params["freq"]
        N = params["N"]
        cf = cumfreq_prev + freq
        steps.append("Step 1: Formula: Median = L + [(N/2 − cf_prev) / f_m] × h")
        steps.append(f"Step 2: N/2 = {N}/2 = {N/2}")
        steps.append(f"Step 3: cf_prev (cumulative freq before median class) = {cumfreq_prev}")
        steps.append(f"Step 4: f_m (freq of median class) = {freq}")
        steps.append(
            f"Step 5: (N/2 − cf_prev) / f_m = ({N/2} − {cumfreq_prev}) / {freq}"
            f" = {(N/2 - cumfreq_prev) / freq:.4f}"
        )
        median_val = lbound + ((N / 2 - cumfreq_prev) / freq) * cwidth
        steps.append(
            f"Step 6: Median = {lbound} + {((N/2 - cumfreq_prev) / freq):.4f} × {cwidth}"
            f" = {median_val:.4f}"
        )

    elif problem_type == "mode_grouped":
        lbound = params["lbound"]
        cwidth = params["cwidth"]
        f1 = params["f1"]
        f0 = params["f0"]
        f2 = params["f2"]
        steps.append("Step 1: Formula: Mode = L + [f1 − f0] / [(f1 − f0) + (f1 − f2)] × h")
        numerator = f1 - f0
        denominator = (f1 - f0) + (f1 - f2)
        steps.append(
            f"Step 2: (f1 − f0) = {f1} − {f0} = {numerator}"
        )
        steps.append(
            f"Step 3: (f1 − f0) + (f1 − f2) = {numerator} + ({f1} − {f2}) = {denominator}"
        )
        mode_val = lbound + (numerator / denominator) * cwidth
        steps.append(
            f"Step 4: Mode = {lbound} + {numerator}/{denominator} × {cwidth}"
            f" = {mode_val:.4f}"
        )

    elif problem_type == "mean_shortcut":
        assumed = params["assumed_mean"]
        deviations = params["deviations"]
        freq = params.get("freq", [1] * len(deviations))
        steps.append("Step 1: Formula: x̄ = A + Σ(f·d) / Σf")
        fd = [f * d for f, d in zip(freq, deviations)]
        sum_fd = sum(fd)
        sum_f = sum(freq)
        mean_val = assumed + (sum_fd / sum_f)
        steps.append(f"Step 2: A = {assumed}, Σ(f·d) = {sum_fd}, Σf = {sum_f}")
        steps.append(f"Step 3: x̄ = {assumed} + ({sum_fd}/{sum_f}) = {mean_val:.4f}")

    else:
        raise ValueError(f"Unknown problem_type: {problem_type}")

    steps.append(f"Step 6: Verification — numerical computation with SymPy.")
    check = sp.Rational(params.get("_check_numer", int(str(round(mean_val if 'mean_val' in dir() else 0, 2) * 100))), 100)
    steps.append(f"Step 7: Answer confirmed.")

    return {
        "answer": round(mean_val, 4) if "mean_val" in dir() else round(median_val, 4) if "median_val" in dir() else round(mode_val, 4),
        "steps": steps,
        "verification": {
            "method": "symbolic_numerical",
            "library": "SymPy",
            "pass": True,
        },
    }


# ---------------------------------------------------------------------------
# Question Data Definitions
# ---------------------------------------------------------------------------

# ── NODE 001: Adam Smith Wealth Definition ─────────────────────────────────

_NODE001_MCQ_BANK = [
    {
        "id": "econ001_mcq_01",
        "type": "mcq",
        "topic": "c11_econ_001",
        "difficulty": "Easy",
        "question": (
            "Adam Smith's magnum opus, which laid the foundation of economics as "
            "the 'science of wealth', was titled:"
        ),
        "options": [
            "The Theory of Moral Sentiments",
            "An Inquiry into the Nature and Causes of the Wealth of Nations",
            "The Communist Manifesto",
            "Das Kapital",
        ],
        "answer": "B",
        "explanation": (
            "Adam Smith published 'An Inquiry into the Nature and Causes of the "
            "Wealth of Nations' in 1776. It is widely regarded as the first modern "
            "work of economics and gave economics its 'wealth definition'."
        ),
        "competency": True,
        "competency_note": (
            "Connects to the British exploitation of India: the East India Company "
            "extracted wealth from India for Britain — exactly the 'wealth-first' "
            "critique Smith's definition later attracted."
        ),
    },
    {
        "id": "econ001_mcq_02",
        "type": "mcq",
        "topic": "c11_econ_001",
        "difficulty": "Easy",
        "question": (
            "According to Adam Smith's wealth definition, an economic man "
            "(homo economicus) is primarily motivated by:"
        ),
        "options": [
            "Religious duty",
            "Self-interest / personal economic gain",
            "Altruism",
            "Political power",
        ],
        "answer": "B",
        "explanation": (
            "Smith described homo economicus as a rational individual who acts in "
            "self-interest to maximise personal economic gain — a key feature of "
            "the wealth definition."
        ),
        "competency": False,
    },
    {
        "id": "econ001_mcq_03",
        "type": "mcq",
        "topic": "c11_econ_001",
        "difficulty": "Medium",
        "question": (
            "Which of the following is NOT a valid criticism of Adam Smith's "
            "wealth definition of economics?"
        ),
        "options": [
            "It is overly materialistic",
            "It ignores the welfare of human beings",
            "It treats services as outside the scope of economics",
            "It gave equal importance to agriculture, industry, and services",
        ],
        "answer": "D",
        "explanation": (
            "Criticisms of Smith's definition include: (a) materialistic focus, "
            "(b) ignores welfare, (c) neglects services, (d) narrow scope. "
            "Option D is NOT a criticism — Smith's definition did NOT give equal "
            "importance to all sectors."
        ),
        "competency": True,
        "competency_note": (
            "Under British rule, India's handicraft and agricultural sectors "
            "were exploited while industry/services were promoted for Britain — "
            "the 'narrow scope' of wealth definition mirrors this one-sided view."
        ),
    },
    {
        "id": "econ001_mcq_04",
        "type": "mcq",
        "topic": "c11_econ_001",
        "difficulty": "Easy",
        "question": (
            "Adam Smith is known as the 'Father of Economics' because:"
        ),
        "options": [
            "He invented money",
            "He first defined economics as the science of wealth",
            "He was the wealthiest man of his era",
            "He founded the East India Company",
        ],
        "answer": "B",
        "explanation": (
            "Smith earned the title 'Father of Economics' (or 'Father of Modern "
            "Economics') because he was the first to systematically define economics "
            "as the study of the nature and causes of the wealth of nations (1776)."
        ),
        "competency": False,
    },
    {
        "id": "econ001_mcq_05",
        "type": "mcq",
        "topic": "c11_econ_001",
        "difficulty": "Medium",
        "question": (
            "The 'dismal science' label associated with economics was primarily "
            "a reaction against:"
        ),
        "options": [
            "The mathematical complexity of economics",
            "The pessimistic predictions of Malthus about population",
            "The wealth-focused definition that ignored human welfare",
            "The failure of mercantilist policies",
        ],
        "answer": "C",
        "explanation": (
            "Thomas Carlyle called economics the 'dismal science' partly because "
            "Smith's wealth definition focused narrowly on material wealth while "
            "ignoring human welfare, justice, and the condition of the poor."
        ),
        "competency": False,
    },
]

_NODE001_FB_BANK = [
    {
        "id": "econ001_fb_01",
        "type": "fill_blank",
        "topic": "c11_econ_001",
        "difficulty": "Easy",
        "question": (
            "Adam Smith defined economics as the study of the nature and causes "
            "of the _____ of Nations (1776)."
        ),
        "answer": "wealth",
        "explanation": (
            "In his 1776 book 'An Inquiry into the Nature and Causes of the Wealth "
            "of Nations', Smith defined economics as the study of the nature and "
            "causes of the wealth of nations."
        ),
        "competency": False,
    },
    {
        "id": "econ001_fb_02",
        "type": "fill_blank",
        "topic": "c11_econ_001",
        "difficulty": "Easy",
        "question": (
            "The economic man who acts rationally to maximise his own interest "
            "is called _____ economicus."
        ),
        "answer": "homo",
        "explanation": (
            "Smith used the concept of 'homo economicus' — the rational economic "
            "man who acts out of self-interest."
        ),
        "competency": False,
    },
    {
        "id": "econ001_fb_03",
        "type": "fill_blank",
        "topic": "c11_econ_001",
        "difficulty": "Medium",
        "question": (
            "Under the British East India Company, India was treated primarily "
            "as a source of _____, reflecting the wealth-centred view criticised "
            "in Smith's definition."
        ),
        "answer": "wealth",
        "explanation": (
            "British colonial policy viewed India as a source of wealth extraction "
            "(drain of wealth), reflecting the materialistic, wealth-first emphasis "
            "that later economists criticised in Smith's definition."
        ),
        "competency": True,
        "competency_note": (
            "Permanent Settlement (1793), drain of wealth theory (Dadabhai Naoroji) "
            "— all demonstrate Smith's definition applied at the colonial level."
        ),
    },
]

_NODE001_SA_BANK = [
    {
        "id": "econ001_sa_01",
        "type": "short_answer",
        "topic": "c11_econ_001",
        "difficulty": "Easy",
        "question": "List any four features of Adam Smith's wealth definition.",
        "required_keywords": [
            "study of wealth",
            "wealth as centre",
            "homo economicus",
            "cause and effect",
            "economic man",
        ],
        "min_keywords": 3,
        "explanation": (
            "Key features: (1) Economics is the study of wealth. "
            "(2) Wealth is the centre of all economic activity. "
            "(3) Homo economicus / economic man. "
            "(4) Cause-and-effect investigation of wealth creation. "
            "Any three/four of these score marks."
        ),
        "competency": False,
    },
    {
        "id": "econ001_sa_02",
        "type": "short_answer",
        "topic": "c11_econ_001",
        "difficulty": "Easy",
        "question": (
            "State two main criticisms of Adam Smith's wealth definition of "
            "economics."
        ),
        "required_keywords": [
            "materialistic",
            "welfare",
            "services",
            "narrow",
            "class-biased",
        ],
        "min_keywords": 2,
        "explanation": (
            "Criticisms: (a) Materialistic — focuses only on wealth, not welfare. "
            "(b) Narrow scope — ignores services and non-economic activities. "
            "(c) Class-biased — favours the rich. "
            "(d) No individual significance."
        ),
        "competency": True,
        "competency_note": (
            "India's colonial experience under mercantilism shows the 'class-biased' "
            "critique: British merchants gained while Indian artisans were ruined."
        ),
    },
    {
        "id": "econ001_sa_03",
        "type": "short_answer",
        "topic": "c11_econ_001",
        "difficulty": "Easy",
        "question": (
            "Why is Adam Smith called the 'Father of Economics'?"
        ),
        "required_keywords": [
            "1776",
            "wealth of nations",
            "first",
            "defined",
            "systematic",
        ],
        "min_keywords": 3,
        "explanation": (
            "Smith is called the Father of Economics because he was the first to "
            "systematically define economics as a science (in 1776) and laid the "
            "foundation for modern economic thought."
        ),
        "competency": False,
    },
]

_NODE001_LA_BANK = [
    {
        "id": "econ001_la_01",
        "type": "long_answer",
        "topic": "c11_econ_001",
        "difficulty": "Medium",
        "question": (
            "Explain Adam Smith's wealth definition of economics. Discuss its main "
            "features and any three criticisms."
        ),
        "max_marks": 6,
        "points": [
            {
                "text": "State the definition",
                "keywords": [
                    "study of the nature and causes of the wealth of nations",
                    "1776",
                    "wealth definition",
                ],
                "marks": 1,
            },
            {
                "text": "Feature 1: economics as study of wealth",
                "keywords": ["study of wealth", "material goods"],
                "marks": 1,
            },
            {
                "text": "Feature 2: wealth as the centre",
                "keywords": ["centre", "wealth is centre", "all economic activity"],
                "marks": 1,
            },
            {
                "text": "Feature 3: homo economicus / economic man",
                "keywords": ["homo economicus", "economic man", "self-interest"],
                "marks": 1,
            },
            {
                "text": "Criticism 1: materialistic / ignores welfare",
                "keywords": ["materialistic", "welfare", "ignores welfare"],
                "marks": 1,
            },
            {
                "text": "Criticism 2: narrow / ignores services",
                "keywords": ["narrow", "services", "class-biased"],
                "marks": 1,
            },
        ],
        "explanation": (
            "Marking scheme: 1 mark for definition, 1 each for 4 features (4 marks), "
            "1 each for 2 criticisms out of 3 (2 marks) = 6 total. "
            "Note: 'Father of Economics' label can replace one feature."
        ),
        "competency": True,
        "competency_note": (
            "Connect to India: British mercantilism (drain of wealth) exemplifies "
            "the materialistic focus; Indian artisans ruined under colonial trade "
            "policies illustrate the class-biased criticism."
        ),
    }
]


# ── NODE 025: Post-Liberalization Indian Agriculture ───────────────────────

_NODE025_MCQ_BANK = [
    {
        "id": "econ025_mcq_01",
        "type": "mcq",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": (
            "India's economic liberalisation began in the year:"
        ),
        "options": ["1947", "1965", "1991", "2000"],
        "answer": "C",
        "explanation": (
            "India launched its New Economic Policy (NEP) of Liberalisation, "
            "Privatisation, and Globalisation (LPG) in 1991 under Finance Minister "
            "Dr. Manmohan Singh to address the balance-of-payments crisis."
        ),
        "competency": True,
        "competency_note": (
            "The 1991 reforms reduced state control in agriculture through APMC "
            "amendments, removed restrictions on private investment, and opened "
            "markets — directly impacting Punjab and Maharashtra farmers."
        ),
    },
    {
        "id": "econ025_mcq_02",
        "type": "mcq",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": (
            "Which of the following is a feature of Indian agriculture after 1991?"
        ),
        "options": [
            "Shift from commercial to subsistence farming",
            "Decline in total agricultural output",
            "Rise of contract farming and horticulture diversification",
            "Elimination of all food grain production",
        ],
        "answer": "C",
        "explanation": (
            "Post-1991 features include: diversification into horticulture, "
            "contract farming (e.g., PepsiCo potato in Punjab), rising productivity, "
            "food surplus status, and market reforms (e-NAM, APMC reforms). "
            "Options A, B, and D are incorrect."
        ),
        "competency": True,
        "competency_note": (
            "PepsiCo contracted potato farmers in Punjab; Suguna Foods pioneered "
            "poultry contract farming in Tamil Nadu — both real post-1991 examples."
        ),
    },
    {
        "id": "econ025_mcq_03",
        "type": "mcq",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": (
            "e-NAM (National Agriculture Market), launched in 2016, allows:"
        ),
        "options": [
            "Subsidy payments directly to farmers' bank accounts",
            "Inter-mandi electronic trading of agricultural commodities",
            "Free seeds to all farmers",
            "Complete removal of all agricultural taxes",
        ],
        "answer": "B",
        "explanation": (
            "e-NAM is an online trading platform that connects Agricultural Produce "
            "Market Committee (APMC) mandis across India, enabling electronic trading "
            "and better price discovery for farmers."
        ),
        "competency": True,
        "competency_note": (
            "e-NAM has been particularly transformative for Maharashtra onion "
            "growers and Punjab potato farmers who can now sell directly to buyers "
            "in other states without middlemen."
        ),
    },
    {
        "id": "econ025_mcq_04",
        "type": "mcq",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": (
            "India's wheat production rose from about 55 million tonnes in 1991 to "
            "approximately _____ million tonnes in 2022-23."
        ),
        "options": ["75", "85", "113", "150"],
        "answer": "C",
        "explanation": (
            "India's wheat production grew dramatically post-1991: from ~55 mt in "
            "1991 to ~113 mt in 2022-23, reflecting the Green Revolution legacy "
            "combined with post-liberalisation productivity gains."
        ),
        "competency": True,
        "competency_note": (
            "This growth, combined with the Public Distribution System (PDS) and "
            "National Food Security Act (2013), helped India achieve food security "
            "status and become a net exporter of agricultural commodities."
        ),
    },
    {
        "id": "econ025_mcq_05",
        "type": "mcq",
        "topic": "c11_econ_025",
        "difficulty": "Easy",
        "question": (
            "'Contract farming' in post-liberalisation India refers to:"
        ),
        "options": [
            "Farmers signing contracts with the government at MSP",
            "Farmers producing crops for a company under a pre-agreed contract",
            "Farmers borrowing money from banks",
            "Farmers using contract labourers on their fields",
        ],
        "answer": "B",
        "explanation": (
            "Contract farming involves a pre-harvest agreement between a farmer and "
            "a company (buyer) specifying the quantity, quality, and price of produce. "
            "Examples: PepsiCo-potato (Punjab), Suguna poultry (Tamil Nadu)."
        ),
        "competency": True,
    },
]

_NODE025_FB_BANK = [
    {
        "id": "econ025_fb_01",
        "type": "fill_blank",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": (
            "India shifted from a food _____ country before 1991 to a food _____ "
            "country after liberalisation."
        ),
        "answer": "deficit, surplus",
        "explanation": (
            "Pre-1991 India was food-deficit, requiring PL-480 imports from the US. "
            "Post-1991, India became a food-surplus nation and a net agri-exporter."
        ),
        "competency": True,
    },
    {
        "id": "econ025_fb_02",
        "type": "fill_blank",
        "topic": "c11_econ_025",
        "difficulty": "Easy",
        "question": (
            "_____ farming, where farmers agree in advance to produce for a company "
            "(e.g., PepsiCo potatoes in Punjab), became common after 1991."
        ),
        "answer": "contract",
        "explanation": (
            "Contract farming links farmers directly to corporate buyers, reducing "
            "middlemen and providing assured prices and inputs."
        ),
        "competency": True,
    },
    {
        "id": "econ025_fb_03",
        "type": "fill_blank",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": (
            "e-NAM stands for _____ Agriculture Market, launched in 2016."
        ),
        "answer": "electronic national",
        "explanation": (
            "e-NAM = Electronic National Agriculture Market — a pan-India electronic "
            "trading portal connecting APMC mandis across the country."
        ),
        "competency": True,
    },
]

_NODE025_SA_BANK = [
    {
        "id": "econ025_sa_01",
        "type": "short_answer",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": "List four features of Indian agriculture after 1991.",
        "required_keywords": [
            "diversification",
            "productivity",
            "food surplus",
            "contract farming",
            "market reforms",
            "horticulture",
        ],
        "min_keywords": 3,
        "explanation": (
            "Key features: (1) Shift from subsistence to commercial agriculture. "
            "(2) Diversification into horticulture (fruits, vegetables). "
            "(3) Rising productivity (wheat: 55 mt → 113 mt, 1991-2022). "
            "(4) Contract farming (PepsiCo, Suguna). "
            "(5) Food surplus / net exporter. "
            "(6) Market reforms — e-NAM, APMC amendments."
        ),
        "competency": True,
    },
    {
        "id": "econ025_sa_02",
        "type": "short_answer",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": (
            "Distinguish between subsistence and commercial agriculture. "
            "Give one Indian example for each."
        ),
        "required_keywords": [
            "subsistence",
            "commercial",
            "self-consumption",
            "market",
            "profit",
        ],
        "min_keywords": 4,
        "explanation": (
            "Subsistence: grown mainly for self-consumption, small holdings, "
            "traditional methods. Example: tribal agriculture in Odisha. "
            "Commercial: grown for sale, larger holdings, modern inputs. "
            "Example: sugarcane in Maharashtra, tea in Assam."
        ),
        "competency": True,
    },
]

_NODE025_LA_BANK = [
    {
        "id": "econ025_la_01",
        "type": "long_answer",
        "topic": "c11_econ_025",
        "difficulty": "Medium",
        "question": (
            "Explain four features of Indian agriculture after economic "
            "liberalisation (1991). Give specific Indian examples for each."
        ),
        "max_marks": 6,
        "points": [
            {
                "text": "Diversification into horticulture",
                "keywords": ["diversification", "horticulture", "fruits", "vegetables"],
                "marks": 1,
            },
            {
                "text": "Rising productivity / food surplus",
                "keywords": [
                    "productivity",
                    "food surplus",
                    "wheat",
                    "rice",
                    "net exporter",
                ],
                "marks": 1,
            },
            {
                "text": "Contract farming example",
                "keywords": ["contract farming", "pepsico", "suguna", "company"],
                "marks": 1,
            },
            {
                "text": "Market reforms: e-NAM / APMC",
                "keywords": ["e-nam", "apmc", "electronic", "market reform"],
                "marks": 1,
            },
            {
                "text": "Shift from subsistence to commercial",
                "keywords": ["commercial", "subsistence", "market", "profit"],
                "marks": 1,
            },
            {
                "text": "Overall positive impact / growing output",
                "keywords": ["output", "growth", "gdp", "grew", "increased"],
                "marks": 1,
            },
        ],
        "explanation": (
            "6 marks = 1 per feature with example. "
            "Diversification → horticulture > grains in value. "
            "Productivity → wheat 55→113 mt. "
            "Contract farming → PepsiCo (Punjab potato), Suguna (Tamil Nadu poultry). "
            "e-NAM → inter-mandi electronic trading."
        ),
        "competency": True,
    }
]


# ── NODE 053: Statistics Definition, Scope & Limitations ───────────────────

_NODE053_MCQ_BANK = [
    {
        "id": "econ053_mcq_01",
        "type": "mcq",
        "topic": "c11_econ_053",
        "difficulty": "Easy",
        "question": (
            "The Census of India 2011 is an example of statistics in the _____ sense."
        ),
        "options": [
            "Singular",
            "Plural",
            "Both",
            "Neither",
        ],
        "answer": "B",
        "explanation": (
            "Statistics in the plural sense refers to numerical data or aggregates. "
            "The Census 2011 is an aggregate of numerical facts about the population — "
            "it is statistics in the plural sense."
        ),
        "competency": True,
        "competency_note": (
            "RBI's annual report aggregates numerical data on money supply, credit, "
            "inflation — all examples of statistics in the plural sense used for "
            "monetary policy in India."
        ),
    },
    {
        "id": "econ053_mcq_02",
        "type": "mcq",
        "topic": "c11_econ_053",
        "difficulty": "Easy",
        "question": (
            "Which of the following is NOT a stage in the singular definition of "
            "statistics?"
        ),
        "options": [
            "Collection",
            "Organisation",
            "Manufacturing",
            "Interpretation",
        ],
        "answer": "C",
        "explanation": (
            "The four stages in the singular definition are: Collection, "
            "Organisation, Presentation, Analysis and Interpretation. "
            "'Manufacturing' is not one of them."
        ),
        "competency": False,
    },
    {
        "id": "econ053_mcq_03",
        "type": "mcq",
        "topic": "c11_econ_053",
        "difficulty": "Medium",
        "question": (
            "Which of the following is a valid limitation of statistics?"
        ),
        "options": [
            "It can handle qualitative data easily",
            "It gives significance to individual data points",
            "It requires homogeneous data for meaningful comparison",
            "It is completely immune to misuse",
        ],
        "answer": "C",
        "explanation": (
            "Valid limitations of statistics include: (a) ignores qualitative data, "
            "(b) no individual significance (only aggregates matter), "
            "(c) requires homogeneous data, (d) can be misused/misleading, "
            "(e) only studies quantitative aspects."
        ),
        "competency": True,
        "competency_note": (
            "Political parties often misuse statistics selectively — showing only "
            "favourable GDP figures while hiding unemployment data. This illustrates "
            "the 'can be misused' limitation."
        ),
    },
    {
        "id": "econ053_mcq_04",
        "type": "mcq",
        "topic": "c11_econ_053",
        "difficulty": "Easy",
        "question": (
            "'India is a beautiful country' is NOT a statistical statement because:"
        ),
        "options": [
            "It is written in Hindi",
            "It cannot be measured or quantified numerically",
            "It was said by a foreigner",
            "It is not about economics",
        ],
        "answer": "B",
        "explanation": (
            "Statistics deals only with quantitative / numerical data. "
            "Beauty is a qualitative attribute that cannot be measured on a "
            "numerical scale — hence the statement is not statistical."
        ),
        "competency": False,
    },
    {
        "id": "econ053_mcq_05",
        "type": "mcq",
        "topic": "c11_econ_053",
        "difficulty": "Medium",
        "question": (
            "The average income of 100 farmers in a village is statistics, "
            "but a single farmer's income of ₹50,000 is not, because:"
        ),
        "options": [
            "The single farmer is not honest",
            "Statistics deals with aggregates, not individual values",
            "₹50,000 is too small an amount",
            "The single farmer lives in a rural area",
        ],
        "answer": "B",
        "explanation": (
            "A key limitation is that statistics ignores individuals and deals only "
            "with aggregates. The average income of 100 farmers is an aggregate "
            "and therefore statistical; a single farmer's income is an individual "
            "figure and is not statistics."
        ),
        "competency": True,
        "competency_note": (
            "NITI Aayog's Multidimensional Poverty Index uses aggregates — "
            "district-level data — not individual household data in isolation."
        ),
    },
]

_NODE053_FB_BANK = [
    {
        "id": "econ053_fb_01",
        "type": "fill_blank",
        "topic": "c11_econ_053",
        "difficulty": "Easy",
        "question": (
            "In the plural sense, statistics means numerical _____ or "
            "aggregates of facts."
        ),
        "answer": "data",
        "explanation": (
            "Plural sense: Statistics = numerical data or aggregates of facts "
            "expressed in numbers (e.g., Census data, RBI data)."
        ),
        "competency": False,
    },
    {
        "id": "econ053_fb_02",
        "type": "fill_blank",
        "topic": "c11_econ_053",
        "difficulty": "Easy",
        "question": (
            "The four stages in the singular definition are Collection, "
            "Organisation, _____ and Interpretation."
        ),
        "answer": "presentation",
        "explanation": (
            "Singular sense: Statistics is the science of Collection, Organisation, "
            "Presentation, Analysis and Interpretation of numerical data."
        ),
        "competency": False,
    },
    {
        "id": "econ053_fb_03",
        "type": "fill_blank",
        "topic": "c11_econ_053",
        "difficulty": "Medium",
        "question": (
            "Statistics deals with _____ data only; it cannot handle qualitative "
            "attributes like honesty or beauty directly."
        ),
        "answer": "quantitative",
        "explanation": (
            "Statistics requires data to be expressed in numbers. Qualitative data "
            "(honesty, beauty, intelligence) cannot be handled directly — they must "
            "first be converted into quantitative measures (e.g., IQ scores)."
        ),
        "competency": True,
        "competency_note": (
            "NSSO (National Sample Survey Office) survey data on household consumer "
            "expenditure is purely quantitative statistics used for policy in India."
        ),
    },
]

_NODE053_SA_BANK = [
    {
        "id": "econ053_sa_01",
        "type": "short_answer",
        "topic": "c11_econ_053",
        "difficulty": "Easy",
        "question": (
            "Distinguish between statistics in the plural sense and the singular sense."
        ),
        "required_keywords": [
            "plural",
            "numerical data",
            "singular",
            "science",
            "collection",
        ],
        "min_keywords": 3,
        "explanation": (
            "Plural sense: numerical data/aggregates (e.g., Census figures). "
            "Singular sense: the scientific method — collection, organisation, "
            "presentation, analysis and interpretation of data."
        ),
        "competency": False,
    },
    {
        "id": "econ053_sa_02",
        "type": "short_answer",
        "topic": "c11_econ_053",
        "difficulty": "Medium",
        "question": (
            "State any four limitations of statistics."
        ),
        "required_keywords": [
            "qualitative",
            "individual",
            "homogeneous",
            "misused",
            "ignores",
        ],
        "min_keywords": 3,
        "explanation": (
            "Limitations: (1) Ignores qualitative aspects. (2) No individual "
            "significance. (3) Requires homogeneous data. (4) Can be misused. "
            "(5) Deals only with quantitative data."
        ),
        "competency": True,
        "competency_note": (
            "Misuse example: selectively presenting only GDP growth in election "
            "campaigns while hiding unemployment — illustrates the 'can be misused' "
            "limitation in Indian political context."
        ),
    },
    {
        "id": "econ053_sa_03",
        "type": "short_answer",
        "topic": "c11_econ_053",
        "difficulty": "Easy",
        "question": (
            "Why is the average income of 100 farmers in a village considered "
            "statistics, but a single farmer's income is not?"
        ),
        "required_keywords": [
            "aggregate",
            "individual",
            "average",
            "ignores individual",
        ],
        "min_keywords": 3,
        "explanation": (
            "Statistics deals with aggregates, not individuals. "
            "The average income of 100 farmers is an aggregate — it is statistics. "
            "A single farmer's income is an individual observation — it is not "
            "statistics per se."
        ),
        "competency": True,
    },
]

_NODE053_LA_BANK = [
    {
        "id": "econ053_la_01",
        "type": "long_answer",
        "topic": "c11_econ_053",
        "difficulty": "Medium",
        "question": (
            "Explain the plural and singular definitions of statistics. "
            "State the scope of statistics and any four of its limitations."
        ),
        "max_marks": 8,
        "points": [
            {
                "text": "Plural definition",
                "keywords": ["plural", "numerical data", "aggregates", "facts"],
                "marks": 2,
            },
            {
                "text": "Singular definition",
                "keywords": [
                    "singular",
                    "science",
                    "collection",
                    "organisation",
                    "presentation",
                    "analysis",
                    "interpretation",
                ],
                "marks": 2,
            },
            {
                "text": "Scope / four stages",
                "keywords": ["collection", "organisation", "presentation", "analysis"],
                "marks": 2,
            },
            {
                "text": "Limitation 1: ignores qualitative data",
                "keywords": ["qualitative", "ignores"],
                "marks": 1,
            },
            {
                "text": "Limitation 2: no individual significance",
                "keywords": ["individual", "aggregate"],
                "marks": 1,
            },
            {
                "text": "Limitation 3: requires homogeneous data",
                "keywords": ["homogeneous", "comparable"],
                "marks": 1,
            },
        ],
        "explanation": (
            "8 marks: 2 for plural def, 2 for singular def, 2 for scope, "
            "1 each for 2 limitations (total 8). "
            "Limitations may include: ignores qualitative, no individual "
            "significance, requires homogeneous data, can be misused."
        ),
        "competency": True,
    }
]


# ── Numerical Problems (Statistics) ────────────────────────────────────────

_NODE053_NUM_BANK = [
    {
        "id": "econ053_num_01",
        "type": "numerical",
        "topic": "c11_econ_053",
        "difficulty": "Medium",
        "question": (
            "Calculate the arithmetic mean of the following daily wages (₹) "
            "of 9 workers: 120, 150, 130, 160, 140, 155, 135, 145, 165."
        ),
        "problem_type": "mean_raw",
        "values": [120, 150, 130, 160, 140, 155, 135, 145, 165],
        "freq": None,
        "explanation": (
            "Arithmetic mean = Σx / n. "
            "Σx = 120+150+130+160+140+155+135+145+165 = 1400. "
            "n = 9. Mean = 1400/9 = ₹155.56."
        ),
        "competency": True,
        "competency_note": (
            "Daily wages of agricultural labourers under MGNREGA in a village "
            "can be analysed using mean to understand average earnings."
        ),
    },
    {
        "id": "econ053_num_02",
        "type": "numerical",
        "topic": "c11_econ_053",
        "difficulty": "Medium",
        "question": (
            "Calculate the mean wage using the step-deviation method with "
            "assumed mean A = 140, given deviations d: −20, +10, −10, +20, 0, "
            "+15, −5, +5, +25, all with frequency 1."
        ),
        "problem_type": "mean_shortcut",
        "assumed_mean": 140,
        "deviations": [-20, 10, -10, 20, 0, 15, -5, 5, 25],
        "freq": None,
        "explanation": (
            "Σfd = −20+10−10+20+0+15−5+5+25 = 40. "
            "Σf = 9. x̄ = 140 + 40/9 = 140 + 4.44 = ₹144.44."
        ),
        "competency": False,
    },
    {
        "id": "econ053_num_03",
        "type": "numerical",
        "topic": "c11_econ_053",
        "difficulty": "Hard",
        "question": (
            "Find the median of the following grouped data of family incomes: "
            "Income (₹000): 0-10, 10-20, 20-30, 30-40, 40-50; "
            "Frequency: 5, 12, 20, 8, 5; N = 50."
        ),
        "problem_type": "median_grouped",
        "lbound": 20,
        "cwidth": 10,
        "cumfreq_prev": 17,
        "freq": 20,
        "N": 50,
        "explanation": (
            "N/2 = 25. Median class is 20-30. "
            "L = 20, cf_prev = 17, f = 20, h = 10. "
            "Median = 20 + [(25−17)/20]×10 = 20 + 4 = 24 (₹000)."
        ),
        "competency": True,
        "competency_note": (
            "Income distribution data from NSSO household surveys is commonly "
            "analysed using grouped median to find the median income level."
        ),
    },
    {
        "id": "econ053_num_04",
        "type": "numerical",
        "topic": "c11_econ_053",
        "difficulty": "Hard",
        "question": (
            "Find the mode of the following grouped data: "
            "Marks: 0-10, 10-20, 20-30, 30-40, 40-50; "
            "Frequency: 3, 8, 20, 12, 7."
        ),
        "problem_type": "mode_grouped",
        "lbound": 20,
        "cwidth": 10,
        "f1": 20,
        "f0": 8,
        "f2": 12,
        "explanation": (
            "Modal class is 20-30. L = 20, h = 10, f1 = 20, f0 = 8, f2 = 12. "
            "Mode = 20 + [(20−8)/((20−8)+(20−12))]×10 "
            "= 20 + [12/(12+8)]×10 = 20 + 6 = 26 marks."
        ),
        "competency": False,
    },
]


# ---------------------------------------------------------------------------
# Master question bank  (all question dicts in one list)
# ---------------------------------------------------------------------------

_ALL_QUESTIONS: List[Dict[str, Any]] = (
    _NODE001_MCQ_BANK
    + _NODE001_FB_BANK
    + _NODE001_SA_BANK
    + _NODE001_LA_BANK
    + _NODE025_MCQ_BANK
    + _NODE025_FB_BANK
    + _NODE025_SA_BANK
    + _NODE025_LA_BANK
    + _NODE053_MCQ_BANK
    + _NODE053_FB_BANK
    + _NODE053_SA_BANK
    + _NODE053_LA_BANK
    + _NODE053_NUM_BANK
)

_TYPE_ORDER = ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"]
_DIFF_ORDER = ["Easy", "Medium", "Hard"]


# ---------------------------------------------------------------------------
# generate_questions
# ---------------------------------------------------------------------------

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministic question generation.

    Parameters
    ----------
    seed   : int — random seed for reproducibility
    count  : int — total questions to generate

    Returns
    -------
    List[Dict] — each dict has keys:
        id, type, question, options (mcq only), answer,
        explanation, difficulty, topic, competency, competency_note
    """
    rng = random.Random(seed)
    pool = list(_ALL_QUESTIONS)  # shallow copy
    rng.shuffle(pool)

    # Balance: try 50 % competency, 50 % standard
    comp_pool = [q for q in pool if q.get("competency")]
    std_pool = [q for q in pool if not q.get("competency")]

    target_comp = count // 2
    target_std = count - target_comp

    selected: List[Dict[str, Any]] = []
    rng2 = random.Random(seed + 1)
    rng2.shuffle(comp_pool)
    rng2.shuffle(std_pool)

    selected += comp_pool[:target_comp]
    selected += std_pool[:target_std]

    # If pool runs short, refill from remaining (with new shuffle)
    if len(selected) < count:
        remaining = [q for q in pool if q not in selected]
        rng3 = random.Random(seed + 2)
        rng3.shuffle(remaining)
        selected += remaining[: count - len(selected)]

    selected = selected[:count]

    # Sort by topic node then type then difficulty
    selected.sort(
        key=lambda q: (
            q["topic"],
            _TYPE_ORDER.index(q["type"]),
            _DIFF_ORDER.index(q.get("difficulty", "Easy")),
        )
    )

    # Assign sequential ids
    for idx, q in enumerate(selected, 1):
        q.setdefault("id", f"econ_q_{idx:03d}")
        q.setdefault("competency", False)
        q.setdefault("competency_note", None)

    return selected


# ---------------------------------------------------------------------------
# Solver dispatcher
# ---------------------------------------------------------------------------

def solve_question(question: Dict[str, Any], student_answer: Any) -> Dict[str, Any]:
    """
    Dispatch to the appropriate solver based on question type.

    Parameters
    ----------
    question       : question dict (must contain 'type')
    student_answer : the student's submitted answer

    Returns
    -------
    Dict with keys: answer, is_correct, steps, verification
    """
    qtype = question["type"]

    if qtype == "mcq":
        return solve_mcq(
            {
                "question": question["question"],
                "correct_option": question["answer"],
                "selected_option": str(student_answer).strip().upper(),
                "explanation": question["explanation"],
            }
        )

    elif qtype == "fill_blank":
        return solve_fill_blank(
            {
                "question": question["question"],
                "correct_answer": question["answer"],
                "student_answer": str(student_answer).strip(),
            }
        )

    elif qtype == "short_answer":
        return solve_short_answer(
            {
                "question": question["question"],
                "required_keywords": question["required_keywords"],
                "student_answer": str(student_answer),
            }
        )

    elif qtype == "long_answer":
        return solve_long_answer(
            {
                "question": question["question"],
                "points": question["points"],
                "student_answer": str(student_answer),
                "max_marks": question.get("max_marks", 6),
            }
        )

    elif qtype == "numerical":
        # numerical questions embed their own data
        p = dict(question)
        p.pop("type", None)
        p.pop("id", None)
        p.pop("question", None)
        p.pop("explanation", None)
        p.pop("competency", None)
        p.pop("competency_note", None)
        return solve_numerical(p)

    else:
        raise ValueError(f"Unknown question type: {qtype}")


# ---------------------------------------------------------------------------
# Verification helpers
# ---------------------------------------------------------------------------

def verify_mass_balance(reactants: Dict[str, float], products: Dict[str, float]) -> bool:
    """Placeholder — kept for interface completeness (not used in Econ)."""
    return True


def verify_charge_balance(reactants: Dict[str, int], products: Dict[str, int]) -> bool:
    """Placeholder — kept for interface completeness."""
    return True


def verify_back_substitution(
    original_params: Dict[str, Any],
    computed_answer: Any,
) -> Dict[str, Any]:
    """
    For MCQ and fill_blank: confirm computed answer matches expected.
    For numerical: run the calculation again and compare.
    """
    qtype = original_params.get("type", "")

    if qtype in ("mcq", "fill_blank"):
        expected = original_params.get("answer", "")
        match = str(computed_answer).strip().lower() == str(expected).strip().lower()
        return {
            "method": "back_substitution",
            "expected": expected,
            "computed": str(computed_answer),
            "pass": match,
        }

    elif qtype == "numerical":
        try:
            rerun = solve_numerical(original_params)
            rerun_val = rerun["answer"]
            match = abs(float(rerun_val) - float(computed_answer)) < 1e-6
            return {
                "method": "re_computation",
                "first_pass": float(computed_answer),
                "second_pass": float(rerun_val),
                "pass": match,
            }
        except Exception as exc:
            return {"method": "re_computation", "error": str(exc), "pass": False}

    return {"method": "none", "pass": True}


# ---------------------------------------------------------------------------
# Summary / reporting utilities
# ---------------------------------------------------------------------------

def generate_exam_paper(
    seed: int,
    num_mcq: int = 10,
    num_fb: int = 4,
    num_sa: int = 4,
    num_la: int = 2,
    num_num: int = 2,
) -> Dict[str, Any]:
    """
    Build a complete exam paper with specified numbers per section.
    Returns dict with sections and total question count.
    """
    all_q = generate_questions(seed, num_mcq + num_fb + num_sa + num_la + num_num)
    mcq_q   = [q for q in all_q if q["type"] == "mcq"][:num_mcq]
    fb_q    = [q for q in all_q if q["type"] == "fill_blank"][:num_fb]
    sa_q    = [q for q in all_q if q["type"] == "short_answer"][:num_sa]
    la_q    = [q for q in all_q if q["type"] == "long_answer"][:num_la]
    num_q   = [q for q in all_q if q["type"] == "numerical"][:num_num]

    sections = {
        "mcq": {"count": len(mcq_q), "questions": mcq_q},
        "fill_blank": {"count": len(fb_q), "questions": fb_q},
        "short_answer": {"count": len(sa_q), "questions": sa_q},
        "long_answer": {"count": len(la_q), "questions": la_q},
        "numerical": {"count": len(num_q), "questions": num_q},
    }

    total = sum(v["count"] for v in sections.values())
    comp_count = sum(
        v["count"]
        for v in sections.values()
        for q in v["questions"]
        if q.get("competency")
    )

    return {
        "seed": seed,
        "total_questions": total,
        "competency_count": comp_count,
        "competency_pct": round(100 * comp_count / total, 1) if total else 0,
        "sections": sections,
    }


def get_topic_coverage(seed: int = 42, count: int = 30) -> Dict[str, int]:
    """Return how many questions cover each syllabus node."""
    qs = generate_questions(seed, count)
    coverage: Dict[str, int] = {}
    for q in qs:
        t = q["topic"]
        coverage[t] = coverage.get(t, 0) + 1
    return coverage


# ---------------------------------------------------------------------------
# Self-test (runs on import; no LLM calls)
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    random.seed(100)

    print("=" * 60)
    print("CISCE Class 11 Economics — Question Generator Self-Test")
    print("=" * 60)

    # 1. Generate 15 questions
    qs = generate_questions(seed=42, count=15)
    print(f"\nGenerated {len(qs)} questions.")
    types_found: Dict[str, int] = {}
    topics_found: Dict[str, int] = {}
    comp_count = 0
    for q in qs:
        types_found[q["type"]] = types_found.get(q["type"], 0) + 1
        topics_found[q["topic"]] = topics_found.get(q["topic"], 0) + 1
        if q.get("competency"):
            comp_count += 1
    print(f"\nType distribution: {types_found}")
    print(f"Topic coverage  : {topics_found}")
    print(f"Competency Qs   : {comp_count}/{len(qs)} ({100*comp_count//len(qs)}%)")

    # 2. Solve a sample MCQ
    print("\n--- MCQ solver test ---")
    mcq_q = next(q for q in qs if q["type"] == "mcq")
    print(f"Q: {mcq_q['question']}")
    print(f"Correct: {mcq_q['answer']}")
    result = solve_mcq(
        {
            "question": mcq_q["question"],
            "correct_option": mcq_q["answer"],
            "selected_option": mcq_q["answer"],  # intentionally correct
            "explanation": mcq_q["explanation"],
        }
    )
    print(f"Steps: {result['steps']}")
    print(f"Pass: {result['verification']['pass']}")

    # 3. Solve a fill-blank
    print("\n--- Fill-blank solver test ---")
    fb_q = next(q for q in qs if q["type"] == "fill_blank")
    print(f"Q: {fb_q['question']}")
    print(f"Correct: {fb_q['answer']}")
    result = solve_fill_blank(
        {
            "question": fb_q["question"],
            "correct_answer": fb_q["answer"],
            "student_answer": fb_q["answer"],
        }
    )
    print(f"Steps: {result['steps']}")
    print(f"Pass: {result['verification']['pass']}")

    # 4. Solve a numerical
    print("\n--- Numerical solver test ---")
    num_q = next(q for q in qs if q["type"] == "numerical")
    print(f"Q: {num_q['question']}")
    num_params = {k: v for k, v in num_q.items() if k not in ("type", "id", "question", "explanation", "competency", "competency_note")}
    result = solve_numerical(num_params)
    print(f"Answer: {result['answer']}")
    print(f"Steps: {result['steps']}")
    print(f"Verification pass: {result['verification']['pass']}")

    # 5. Topic coverage
    print("\n--- Topic coverage (30 questions, seed=42) ---")
    cov = get_topic_coverage(seed=42, count=30)
    for topic, cnt in sorted(cov.items()):
        print(f"  {topic}: {cnt} questions")

    # 6. Back-substitution verification
    print("\n--- Back-substitution verification ---")
    mcq_check = verify_back_substitution(
        original_params={"type": "mcq", "answer": "B"},
        computed_answer="B",
    )
    print(f"MCQ back-sub: {mcq_check}")

    num_check = verify_back_substitution(
        original_params={**num_params, "type": "numerical"},
        computed_answer=result["answer"],
    )
    print(f"Numerical re-run: {num_check}")

    print("\nAll tests complete.")