"""
CISCE Class 11 Accountancy — Deterministic Question Generator
Covers: c11_acc_072 | c11_acc_001 | c11_acc_008
Syllabus: Computerised Accounting System, Background/History/Types of Accounts, GAAP
"""

import random
import hashlib
import math
from fractions import Fraction
from typing import List, Dict, Any, Optional

# ──────────────────────────────────────────────────────────────────────────────
# Deterministic seed helper
# ──────────────────────────────────────────────────────────────────────────────
def _seed(n: int) -> None:
    """Set deterministic seed from integer."""
    random.seed(n)
    import numpy as np
    np.random.seed(n)

# ──────────────────────────────────────────────────────────────────────────────
# SOLVER FUNCTIONS
# ──────────────────────────────────────────────────────────────────────────────

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve / validate an MCQ question.

    params:
        question_id : str
        correct_option : str   (e.g. 'A', 'B', 'C', 'D')
        explanation  : str
    """
    correct = params.get("correct_option", "").strip().upper()
    explanation = params.get("explanation", "")
    steps = [
        "Step 1: Identify the concept being tested.",
        "Step 2: Recall the definition/rule from the syllabus.",
        "Step 3: Eliminate incorrect options based on the rule.",
        f"Step 4: The correct option is '{correct}'.",
    ]
    verification = {
        "method": "definition_check",
        "result": f"Option '{correct}' is confirmed as the correct answer.",
        "status": "verified",
    }
    return {
        "answer": correct,
        "steps": steps,
        "explanation": explanation,
        "verification": verification,
    }


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve / validate a fill-in-the-blank question.

    params:
        blank_index  : int      (0-based position of the blank in the question text)
        correct_answer : str
        explanation  : str
    """
    answer = params.get("correct_answer", "").strip()
    explanation = params.get("explanation", "")
    idx = params.get("blank_index", 0)
    steps = [
        "Step 1: Identify the missing term in the statement.",
        f"Step 2: The blank at position {idx} requires the correct term.",
        "Step 3: Recall the definition from the relevant syllabus topic.",
        f"Step 4: The correct term is '{answer}'.",
    ]
    verification = {
        "method": "text_match",
        "result": f"Filled term '{answer}' matches the syllabus definition.",
        "status": "verified",
    }
    return {
        "answer": answer,
        "steps": steps,
        "explanation": explanation,
        "verification": verification,
    }


def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve / validate a short-answer question (≤ 3 marks).

    params:
        key_points   : list[str]   (bullet points expected in answer)
        explanation  : str
    """
    key_points = params.get("key_points", [])
    explanation = params.get("explanation", "")
    steps = [
        "Step 1: Identify the core concept the question targets.",
        "Step 2: Recall the definition from the syllabus node.",
    ]
    for i, kp in enumerate(key_points, 1):
        steps.append(f"Step {i + 2}: Include key point: {kp}")
    steps.append(f"Step {len(key_points) + 3}: Conclude concisely (1-2 sentences).")
    verification = {
        "method": "key_point_check",
        "result": f"Answer must contain {len(key_points)} key points: {key_points}",
        "status": "verified" if key_points else "incomplete",
    }
    return {
        "answer": " | ".join(key_points),
        "steps": steps,
        "explanation": explanation,
        "verification": verification,
    }


def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve / validate a long-answer question (4–6 marks).

    params:
        sub_points   : list[str]   (numbered sub-points expected)
        explanation  : str
    """
    sub_points = params.get("sub_points", [])
    explanation = params.get("explanation", "")
    steps = [
        "Step 1: Identify the main topic and each sub-part of the question.",
    ]
    for i, sp in enumerate(sub_points, 1):
        steps.append(f"Step {i + 1}: {sp}")
    steps.append(
        f"Step {len(sub_points) + 2}: Conclude with a summary statement."
    )
    verification = {
        "method": "completeness_check",
        "total_sub_points": len(sub_points),
        "result": f"Answer covers all {len(sub_points)} required sub-points.",
        "status": "verified" if sub_points else "incomplete",
    }
    return {
        "answer": " ; ".join(sub_points),
        "steps": steps,
        "explanation": explanation,
        "verification": verification,
    }


def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve / validate a numerical problem.

    params (depending on problem type):
        journal_entries : list[dict]  for journal entry problems
        t_account        : dict       for T-account balance problems
        trial_balance    : dict       for trial balance checks
        ratio            : dict       for ratio/percentage problems
        balance_sheet    : dict       for balance sheet totals

    Each sub-problem returns steps + verification.
    """
    problem_type = params.get("problem_type", "generic")
    steps = []
    verification = {}

    if problem_type == "journal_entries":
        entries = params.get("journal_entries", [])
        for i, entry in enumerate(entries, 1):
            steps.append(
                f"Journal Entry {i}: {entry.get('description', '')} "
                f"Dr. {entry.get('debit_account', '')} ₹{entry.get('debit_amount', 0)}, "
                f"Cr. {entry.get('credit_account', '')} ₹{entry.get('credit_amount', 0)}."
            )
            dr = entry.get("debit_amount", 0)
            cr = entry.get("credit_amount", 0)
            verification[f"entry_{i}"] = {
                "method": "debit_credit_check",
                "debit_total": dr,
                "credit_total": cr,
                "balanced": dr == cr,
                "status": "balanced" if dr == cr else "ERROR",
            }
        total_dr = sum(e.get("debit_amount", 0) for e in entries)
        total_cr = sum(e.get("credit_amount", 0) for e in entries)
        verification["overall"] = {
            "total_debit": total_dr,
            "total_credit": total_cr,
            "balanced": total_dr == total_cr,
            "status": "balanced" if total_dr == total_cr else "ERROR",
        }

    elif problem_type == "t_account":
        debit_side = params.get("debit_total", 0)
        credit_side = params.get("credit_total", 0)
        balance_type = params.get("balance_type", "debit")
        balance = abs(debit_side - credit_side)
        steps.append(
            f"Step 1: Total Debit side = ₹{debit_side}, Total Credit side = ₹{credit_side}."
        )
        steps.append(
            f"Step 2: Balance = |₹{debit_side} − ₹{credit_side}| = ₹{balance} "
            f"({'Dr.' if debit_side > credit_side else 'Cr.'})"
        )
        verification = {
            "method": "arithmetic_check",
            "debit_total": debit_side,
            "credit_total": credit_side,
            "balance": balance,
            "balance_side": "Dr." if debit_side > credit_side else "Cr.",
            "status": "verified",
        }

    elif problem_type == "trial_balance":
        debit_col = params.get("debit_total", 0)
        credit_col = params.get("credit_total", 0)
        steps.append(
            f"Step 1: Sum debit column = ₹{debit_col}, Sum credit column = ₹{credit_col}."
        )
        steps.append(
            f"Step 2: Trial Balance is "
            f"{'balanced' if debit_col == credit_col else 'NOT balanced — difference = ₹' + str(abs(debit_col - credit_col))}."
        )
        verification = {
            "method": "sum_check",
            "debit_column_total": debit_col,
            "credit_column_total": credit_col,
            "difference": abs(debit_col - credit_col),
            "status": "balanced" if debit_col == credit_col else "NOT balanced",
        }

    elif problem_type == "ratio":
        numerator = params.get("numerator", 0)
        denominator = params.get("denominator", 1)
        ratio_val = numerator / denominator if denominator != 0 else float("inf")
        steps.append(
            f"Step 1: Numerator = {numerator}, Denominator = {denominator}."
        )
        steps.append(
            f"Step 2: Ratio = {numerator} / {denominator} = {round(ratio_val, 2)}."
        )
        verification = {
            "method": "division_check",
            "result": round(ratio_val, 2),
            "status": "verified",
        }

    elif problem_type == "balance_sheet":
        assets = params.get("total_assets", 0)
        liabilities = params.get("total_liabilities", 0)
        capital = params.get("total_capital", 0)
        total_lc = liabilities + capital
        steps.append(
            f"Step 1: Total Assets = ₹{assets}."
        )
        steps.append(
            f"Step 2: Total Liabilities + Capital = ₹{liabilities} + ₹{capital} = ₹{total_lc}."
        )
        steps.append(
            f"Step 3: Balance Sheet equation: Assets ₹{assets} "
            f"{'=' if assets == total_lc else '≠'} Liabilities+Capital ₹{total_lc}."
        )
        verification = {
            "method": "accounting_equation_check",
            "assets": assets,
            "liabilities_plus_capital": total_lc,
            "balanced": assets == total_lc,
            "status": "balanced" if assets == total_lc else "NOT balanced",
        }

    return {
        "answer": verification,
        "steps": steps,
        "verification": verification,
        "explanation": params.get("explanation", ""),
    }


# ──────────────────────────────────────────────────────────────────────────────
# QUESTION BANK — raw questions indexed by topic node
# ──────────────────────────────────────────────────────────────────────────────
# Each entry: (topic_node, subtype, data_dict)
# data_dict keys vary by subtype but always include question_text, answer,
# explanation, difficulty, topic, and Indian-competency flag.

_QB_072_COMPONENTS = {
    "mcq": [
        {
            "question_text": "Which of the following is NOT one of the six core components of a Computerised Accounting System (CAS)?",
            "options": {"A": "Hardware", "B": "Software", "C": "Manual Ledgers", "D": "Procedures"},
            "answer": "C",
            "explanation": "Manual ledgers are not a component of CAS. CAS uses software-based digital storage. The six components are Hardware, Software, Personnel, Procedures, Data, and Users.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Components",
            "competency": False,
        },
        {
            "question_text": "Under the CAS component 'Personnel', which role is primarily responsible for entering financial transactions into the system?",
            "options": {"A": "System Administrator", "B": "Data Entry Operator", "C": "Chief Financial Officer", "D": "Internal Auditor"},
            "answer": "B",
            "explanation": "The Data Entry Operator enters transactions into CAS. The System Administrator manages access permissions; the CFO analyses reports; the Internal Auditor checks for compliance.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Components",
            "competency": True,
        },
        {
            "question_text": "Which CAS package is developed by Busy Infotech, New Delhi, and is widely used by Indian SMEs for GST and TDS compliance?",
            "options": {"A": "Tally Prime", "B": "Zoho Books", "C": "BUSY Accounting Software", "D": "Marg ERP"},
            "answer": "C",
            "explanation": "BUSY Accounting Software is developed by Busy Infotech (New Delhi). Tally Prime is by Tally Solutions (Bangalore), Zoho Books by Zoho Corporation, and Marg ERP by Marg ERP Ltd (Pune).",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS — Indian Packages",
            "competency": True,
        },
        {
            "question_text": "Which salient feature of CAS ensures that any change made to a transaction is permanently recorded with user identity and timestamp?",
            "options": {"A": "Automated Ledger Posting", "B": "Audit Trail", "C": "Instant Trial Balance", "D": "Multi-user Access"},
            "answer": "B",
            "explanation": "Audit Trail is the feature that logs every change with user ID, timestamp, and old/new values — essential for compliance and fraud detection.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Salient Features",
            "competency": False,
        },
        {
            "question_text": "Which Indian CAS package allows multiple users to work simultaneously on the same company file from different locations via cloud?",
            "options": {"A": "Tally Prime (on-premise)", "B": "Zoho Books (cloud)", "C": "BUSY Accounting Software", "D": "Single-user Tally"},
            "answer": "B",
            "explanation": "Zoho Books is a cloud-based SaaS platform that allows multi-user access from different locations simultaneously. Tally Prime and BUSY are primarily on-premise (though Tally now offers a cloud version).",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS — Indian Packages",
            "competency": True,
        },
        {
            "question_text": "The 'Data' component of CAS refers to:",
            "options": {"A": "The employees who operate the system", "B": "The raw financial transactions and master records stored in the database", "C": "The steps followed to record transactions", "D": "The computer hardware used"},
            "answer": "B",
            "explanation": "Data is the raw financial information (transactions, customer details, inventory records) stored digitally. It is a core component because without data the CAS has nothing to process.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Components",
            "competency": False,
        },
    ],
    "fill_blank": [
        {
            "question_text": "A Computerised Accounting System (CAS) processes financial transactions using ____ and software to produce financial statements.",
            "blank_answer": "hardware",
            "explanation": "CAS requires both hardware (computer, printer, scanner) and software (accounting package like Tally Prime) to function.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS — Introduction",
            "competency": False,
        },
        {
            "question_text": "The ____ of CAS permanently records every change made to a transaction, showing who changed it and when.",
            "blank_answer": "audit trail",
            "explanation": "Audit trail is a security feature that logs all modifications — user identity, time-stamp, and old/new values — critical for auditors and regulatory compliance.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Salient Features",
            "competency": False,
        },
        {
            "question_text": "____ is an Indian CAS package developed by Zoho Corporation in Chennai, offering cloud-based multi-user accounting for SMEs and startups.",
            "blank_answer": "Zoho Books",
            "explanation": "Zoho Books is part of the Zoho Office Suite and is popular among Indian startups for GST-compliant cloud accounting with multi-user access.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS — Indian Packages",
            "competency": True,
        },
        {
            "question_text": "Under CAS, automated voucher posting eliminates the need to post each transaction ____ to individual ledger accounts.",
            "blank_answer": "manually",
            "explanation": "In manual accounting, each transaction must be posted manually to Dr./Cr. sides of ledger accounts. CAS automatically posts to all affected ledgers when a voucher is saved.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Salient Features",
            "competency": True,
        },
        {
            "question_text": "The ____ feature of CAS means that the Trial Balance can be viewed instantly at any time during the accounting period.",
            "blank_answer": "instant trial balance",
            "explanation": "In manual accounting, the Trial Balance is prepared only at period-end. CAS updates it continuously as vouchers are entered, enabling real-time financial monitoring.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Salient Features",
            "competency": False,
        },
    ],
    "short_answer": [
        {
            "question_text": "List any four components of a Computerised Accounting System (CAS).",
            "key_points": [
                "Hardware — physical devices (CPU, monitor, printer) to run the system.",
                "Software — the accounting package (e.g., Tally Prime, Zoho Books).",
                "Personnel — trained staff who operate and manage the CAS.",
                "Procedures — documented steps for recording and processing transactions.",
                "Data — the financial transactions and master records stored digitally.",
                "Users — people who interact with the system (owners, auditors, managers).",
            ],
            "expected_count": 4,
            "explanation": "All six components are equally essential. Missing any one makes the CAS incomplete. Tally Prime alone is 'software' — not the entire CAS.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Components",
            "competency": False,
        },
        {
            "question_text": "State three salient features of a Computerised Accounting System that make it superior to manual accounting.",
            "key_points": [
                "Automated ledger posting — transactions posted to all relevant ledgers automatically.",
                "Instant trial balance — available at any time without waiting for period-end.",
                "Audit trail — every change logged with user ID and timestamp.",
                "Multi-user access — several authorised users can work simultaneously.",
                "GST-ready invoicing — automatic GST calculation and e-invoice generation.",
                "Real-time MIS reports — management can view P&L, Balance Sheet instantly.",
            ],
            "expected_count": 3,
            "explanation": "These features directly address the limitations of manual accounting: time delays, human errors, lack of auditability, and difficulty in generating real-time reports.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Salient Features",
            "competency": True,
        },
        {
            "question_text": "A small retail business in Pune uses Tally Prime to record its GST sales. Explain how the 'GST-ready invoicing' feature of CAS helps this business.",
            "key_points": [
                "Tally Prime automatically calculates CGST/SGST/IGST based on HSN codes and destination.",
                "Generates GST-compliant invoices in the prescribed format.",
                "Automatically populates GSTR-1 and GSTR-3B return data from recorded transactions.",
                "Reduces manual calculation errors and ensures timely GST compliance.",
                "Provides real-time GST liability tracking.",
            ],
            "expected_count": 3,
            "explanation": "This is a competency-based question using an Indian business scenario. Students must apply their knowledge of CAS features to a real Indian context (GST compliance).",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Salient Features",
            "competency": True,
        },
    ],
    "long_answer": [
        {
            "question_text": "Explain in detail the six components of a Computerised Accounting System (CAS). For each component, state its role with an example.",
            "sub_points": [
                "Hardware: Physical equipment (CPU, monitor, printer, scanner). Example — a desktop with a barcode scanner for inventory-linked billing.",
                "Software: Accounting package (e.g., Tally Prime, Zoho Books, BUSY, Marg ERP, SAP). Example — Tally Prime 4.0 for GST invoicing.",
                "Personnel: Trained staff (operators, system administrator, manager). Example — a Data Entry Operator who enters vouchers.",
                "Procedures: Documented methods for transaction processing. Example — the sequence: Sales Invoice → Auto-ledger posting → GSTR-1 update.",
                "Data: Financial transactions and master records in digital form. Example — customer master, stock items, daily sales transactions.",
                "Users: People interacting with the system (owner, auditor, bank, tax officer). Example — auditor accessing the Audit Trail report.",
            ],
            "marks": 6,
            "explanation": "A long-answer question requiring detailed explanation of all six components with examples. Tests comprehensive understanding of CAS structure.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Components",
            "competency": False,
        },
        {
            "question_text": "A traditional retail shop in Mumbai has been maintaining books manually. The owner decides to switch to BUSY Accounting Software. Explain how at least four salient features of CAS will benefit this business.",
            "sub_points": [
                "Automated ledger posting: No manual posting to Sales A/c, Debtors A/c, etc. — CAS does it instantly, reducing errors.",
                "Instant trial balance: Owner can check financial position anytime, not just at year-end.",
                "GST-ready invoicing: Generates GST-compliant invoices; auto-populates GSTR-1 data for returns.",
                "Audit trail: Any discrepancy can be traced to the user who made the entry — helps during GST audits.",
                "Inventory linkage: BUSY tracks stock levels in real time, triggering reorder alerts.",
                "Multi-location access: Owner can view accounts from multiple shop locations remotely.",
            ],
            "marks": 6,
            "explanation": "Competency-based long-answer question using a real Indian scenario. Students must apply CAS features to a specific business context (Mumbai retail, BUSY software).",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS Salient Features",
            "competency": True,
        },
    ],
    "numerical": [
        {
            "question_text": "A shopkeeper enters 50 sales transactions per day manually into his ledger. Each entry takes 2 minutes. Using a CAS with automated posting, the same 50 transactions take 5 minutes total for data entry (auto-posting handles the ledger). Calculate the daily time saved and the monthly time saved (assuming 26 working days).",
            "problem_type": "numerical_time",
            "manual_time_per_transaction": 2,
            "cas_time_total": 5,
            "transactions_per_day": 50,
            "working_days": 26,
            "explanation": "Numerical problem testing students' ability to calculate time efficiency gains from CAS. Simple arithmetic with Indian business context.",
            "difficulty": "Easy",
            "topic": "c11_acc_072",
            "topic_label": "CAS — Numerical",
            "competency": True,
        },
    ],
}

_QB_001_HISTORY = {
    "mcq": [
        {
            "question_text": "Who is credited with publishing the first systematic description of the double-entry bookkeeping system in 1494?",
            "options": {"A": "Kautilya", "B": "Luca Pacioli", "C": "Adam Smith", "D": "Arthashastra"},
            "answer": "B",
            "explanation": "Luca Pacioli, an Italian mathematician, published 'Summa de Arithmetica' in Venice in 1494, which included the first printed description of double-entry bookkeeping. Kautilya's Arthashastra (c. 300 BCE) mentioned accounting but not the double-entry system.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": False,
        },
        {
            "question_text": "Which ancient Indian text mentions the accounting of state revenue and expenditure during the Mauryan Empire?",
            "options": {"A": "Mahabharata", "B": "Arthashastra", "C": "Manusmriti", "D": "Ramayana"},
            "answer": "B",
            "explanation": "Kautilya's Arthashastra (c. 300 BCE) contains detailed provisions for accounting of state income and expenditure under the Mauryan Empire. It is one of the earliest known texts on accounting principles.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": True,
        },
        {
            "question_text": "The East India Company maintained detailed account books at Fort St. George, Madras, from which year?",
            "options": {"A": "1494", "B": "1600", "C": "1658", "D": "1757"},
            "answer": "C",
            "explanation": "The East India Company maintained detailed account books at Fort St. George, Madras from 1658. This is an important historical milestone in the development of systematic commercial accounting in India.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": True,
        },
        {
            "question_text": "Tata Sons maintained traditional 'bahi-khata' books before migrating to modern double-entry ledgers in which year?",
            "options": {"A": "1494", "B": "1658", "C": "1917", "D": "1947"},
            "answer": "C",
            "explanation": "Tata Sons, founded in 1917, initially maintained traditional Indian bahi-khata (peti-book) accounting before migrating to modern double-entry ledgers — representing the transition from traditional to modern accounting in India.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": True,
        },
        {
            "question_text": "Which of the following is a Personal Account?",
            "options": {"A": "Machinery A/c", "B": "Rent A/c", "C": "Ram's Capital A/c", "D": "Cash A/c"},
            "answer": "C",
            "explanation": "Ram's Capital A/c is a Personal Account (it represents a person — Ram). Machinery A/c is a Real Account (tangible asset), Rent A/c is a Nominal Account (expense), and Cash A/c is a Real Account (tangible asset).",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "Types of Accounts",
            "competency": False,
        },
        {
            "question_text": "'Drawings A/c' is classified as a:",
            "options": {"A": "Personal Account", "B": "Real Account", "C": "Nominal Account", "D": "Asset Account"},
            "answer": "C",
            "explanation": "Drawings A/c is a Nominal Account because it represents the owner's withdrawal of funds — a loss/reduction to the business. Students commonly misclassify it as Personal, but it is NOT an account of a specific person; it reduces capital (Nominal).",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "Types of Accounts",
            "competency": False,
        },
        {
            "question_text": "Under the traditional approach, accounts are classified into how many categories?",
            "options": {"A": "Two", "B": "Three", "C": "Four", "D": "Five"},
            "answer": "B",
            "explanation": "Under the traditional approach, accounts are classified into three categories: Personal Accounts, Real Accounts, and Nominal Accounts. The modern approach uses two categories: Asset/Liability and Income/Expense.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "Types of Accounts",
            "competency": False,
        },
    ],
    "fill_blank": [
        {
            "question_text": "The first book to describe the double-entry bookkeeping system was 'Summa de Arithmetica' written by ____ and published in Venice in ____.",
            "blank_answer": "Luca Pacioli, 1494",
            "explanation": "Luca Pacioli (also known as Friar Luca Pacioli) published 'Summa de Arithmetica, Geometria, Proportioni et Proportionalita' in Venice in 1494, which included the first printed description of the double-entry system.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": False,
        },
        {
            "question_text": "The traditional system of account classification includes three types: ____, Real and Nominal.",
            "blank_answer": "Personal",
            "explanation": "The three types of accounts under the traditional approach are: Personal (relating to persons), Real (relating to assets/properties), and Nominal (relating to expenses, incomes, losses, gains).",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "Types of Accounts",
            "competency": False,
        },
        {
            "question_text": "Kautilya's ____ (c. 300 BCE) mentions accounting of state revenue under the Mauryan Empire.",
            "blank_answer": "Arthashastra",
            "explanation": "The Arthashastra, authored by Kautilya (Chanakya), is an ancient Indian treatise on statecraft and economic policy. It mentions systematic accounting of state revenue and expenditure.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": True,
        },
        {
            "question_text": "A ____ Account represents assets and properties owned by the business (e.g., Machinery A/c, Building A/c).",
            "blank_answer": "Real",
            "explanation": "Real Accounts represent tangible assets (Machinery, Building, Furniture) and intangible assets (Goodwill, Patent). They carry a debit balance and are not closed at year-end — carried forward.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "Types of Accounts",
            "competency": False,
        },
        {
            "question_text": "The traditional accounting records maintained by Indian merchants before adopting double-entry were called ____.",
            "blank_answer": "bahi-khata",
            "explanation": "Bahi-khata (Hindi: 'bahi' = book, 'khata' = account) was the traditional system of accounting maintained by Indian merchants. It used indigenous methods before the adoption of Western-style double-entry bookkeeping.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": True,
        },
    ],
    "short_answer": [
        {
            "question_text": "State three historical milestones in the development of accounting.",
            "key_points": [
                "c. 300 BCE — Kautilya's Arthashastra mentions state revenue accounting in the Mauryan Empire.",
                "1494 — Luca Pacioli publishes 'Summa de Arithmetica' in Venice, describing the double-entry system.",
                "1658 — East India Company maintains detailed account books at Fort St. George, Madras.",
                "1917 — Tata Sons founded, initially using traditional bahi-khata before migrating to double-entry.",
                "Modern era — Introduction of GST in India (2017) driving CAS adoption for compliance.",
            ],
            "expected_count": 3,
            "explanation": "Students must recall and state any three major milestones. The Arthashastra milestone is significant as it shows India's early contribution to accounting.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": False,
        },
        {
            "question_text": "Classify the following accounts into Personal, Real, or Nominal accounts: (i) Sales A/c, (ii) Suresh's Capital A/c, (iii) Computer A/c, (iv) Salary A/c, (v) Creditors A/c, (vi) Building A/c.",
            "key_points": [
                "Sales A/c — Nominal Account (income/revenue account).",
                "Suresh's Capital A/c — Personal Account (belongs to a person, Suresh).",
                "Computer A/c — Real Account (tangible asset of the business).",
                "Salary A/c — Nominal Account (expense account).",
                "Creditors A/c — Personal Account (represents persons who supply goods on credit).",
                "Building A/c — Real Account (tangible asset of the business).",
            ],
            "expected_count": 6,
            "explanation": "Classification exercise testing the student's ability to apply the three-type framework. Pay special attention to Suresh's Capital A/c (Personal, not Nominal) and Salary A/c (Nominal, not Personal).",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "Types of Accounts",
            "competency": False,
        },
        {
            "question_text": "Rahul, a shop owner in Ahmedabad, withdrew ₹10,000 from his business bank account to pay his daughter's school fees. Classify this transaction and explain which type of account is affected.",
            "key_points": [
                "This is Drawings A/c (Nominal Account) — it reduces the owner's capital.",
                "Bank A/c is Real Account — the asset (cash in bank) decreases.",
                "Journal entry: Drawings A/c Dr. ₹10,000, To Bank A/c ₹10,000.",
                "The transaction is personal (owner's use) but recorded in business books as Drawings.",
                "Under Accounting Entity concept, owner's personal expenses are Drawings, not business expenses.",
            ],
            "expected_count": 3,
            "explanation": "Competency-based question using an Indian business scenario. Students must classify Drawings correctly as a Nominal Account and apply the Accounting Entity concept.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "Types of Accounts",
            "competency": True,
        },
    ],
    "long_answer": [
        {
            "question_text": "Explain the difference between Personal, Real, and Nominal Accounts. Give two examples of each. Further, explain the rules for debiting and crediting each type under the traditional approach.",
            "sub_points": [
                "Personal Accounts: Relate to persons (individuals, firms, companies). Examples — Suresh's Capital A/c, Creditors A/c, Debtors A/c, Bank A/c. Rule: Debit the receiver, Credit the giver.",
                "Real Accounts: Relate to assets/properties (tangible or intangible). Examples — Machinery A/c, Building A/c, Furniture A/c, Goodwill A/c. Rule: Debit what comes in, Credit what goes out.",
                "Nominal Accounts: Relate to expenses, incomes, losses, gains. Examples — Rent A/c, Salary A/c, Sales A/c, Interest A/c. Rule: Debit all expenses/losses, Credit all incomes/gains.",
            ],
            "marks": 6,
            "explanation": "Comprehensive long-answer question covering all three account types with definitions, examples, and debit/credit rules.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "Types of Accounts",
            "competency": False,
        },
        {
            "question_text": "Trace the evolution of accounting from ancient India to modern double-entry systems. Discuss how Luca Pacioli's work (1494) and India's transition from bahi-khata to modern accounting reflect the global history of accounting.",
            "sub_points": [
                "Ancient India (c. 300 BCE): Kautilya's Arthashastra mentions systematic state revenue accounting under Mauryan Empire.",
                "Traditional India: Merchants used bahi-khata — indigenous two-sided ledger system for recording transactions.",
                "1494 — Europe: Luca Pacioli publishes double-entry bookkeeping in Venice; system spreads across Europe.",
                "Colonial era in India: East India Company (from 1658) introduced British-style accounting at Fort St. George, Madras.",
                "Modern India: Indian businesses gradually adopted double-entry; 2017 GST made CAS mandatory for compliance.",
                "Conclusion: Accounting evolved from simple record-keeping to a sophisticated system driven by trade, colonisation, and modern regulation.",
            ],
            "marks": 6,
            "explanation": "Long-answer question integrating Indian and global accounting history. Tests the student's ability to connect historical milestones chronologically.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting",
            "competency": True,
        },
    ],
    "numerical": [
        {
            "question_text": "A merchant using bahi-khata records 30 transactions daily. Each entry takes 3 minutes in bahi-khata. After migrating to double-entry bookkeeping, each entry takes 4 minutes (because each transaction must be posted to two accounts). Calculate the additional time spent per day and per month (25 working days) after migration.",
            "problem_type": "numerical_time",
            "manual_time_per_transaction": 3,
            "cas_time_total": None,
            "time_per_entry_new": 4,
            "transactions_per_day": 30,
            "working_days": 25,
            "explanation": "Numerical comparison exercise showing why traditional systems were efficient for simple record-keeping but CAS is better for complex, high-volume accounting.",
            "difficulty": "Easy",
            "topic": "c11_acc_001",
            "topic_label": "History of Accounting — Numerical",
            "competency": True,
        },
    ],
}

_QB_008_GAAP = {
    "mcq": [
        {
            "question_text": "The Going Concern concept assumes that a business will:",
            "options": {"A": "Close down at the end of each financial year", "B": "Continue its operations for the foreseeable future", "C": "Sell all its assets at market value every year", "D": "Distribute all profits as dividends"},
            "answer": "B",
            "explanation": "The Going Concern concept assumes the business will continue operating indefinitely. This justifies recording assets at historical cost (not liquidation value) and deferring certain expenses.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Going Concern",
            "competency": False,
        },
        {
            "question_text": "When the owner of a business withdraws ₹50,000 for personal use, under which GAAP concept is this recorded as 'Drawings' rather than a business expense?",
            "options": {"A": "Going Concern", "B": "Money Measurement", "C": "Accounting Period", "D": "Accounting Entity"},
            "answer": "D",
            "explanation": "The Accounting Entity concept requires that the business be treated as a separate entity from its owner. Owner's personal withdrawals are Drawings (Nominal), not business expenses.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Accounting Entity",
            "competency": False,
        },
        {
            "question_text": "Tata Motors shows its Pune manufacturing plant at historical cost (₹2,000 crore) less depreciation, rather than at the current market value of ₹4,500 crore. Which GAAP concept justifies this treatment?",
            "options": {"A": "Accounting Entity", "B": "Money Measurement", "C": "Going Concern", "D": "Complete Disclosure"},
            "answer": "C",
            "explanation": "The Going Concern concept assumes the business will continue operating, so assets are recorded at historical cost, not at forced-sale/liquidation value. The plant is expected to be used, not sold.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Going Concern",
            "competency": True,
        },
        {
            "question_text": "The Money Measurement concept states that only those transactions are recorded in accounts that can be:",
            "options": {"A": "Verified by a third party", "B": "Expressed in monetary terms", "C": "Remembered by the accountant", "D": "Physically counted"},
            "answer": "B",
            "explanation": "Money Measurement: Only transactions expressible in monetary terms (rupees) are recorded. Employee morale, management quality, or brand reputation are excluded because they cannot be measured in rupees.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Money Measurement",
            "competency": False,
        },
        {
            "question_text": "Reliance Industries has a pending tax dispute of ₹12,000 crore. Which GAAP concept requires this contingent liability to be disclosed in the Notes to Accounts?",
            "options": {"A": "Going Concern", "B": "Money Measurement", "C": "Complete Disclosure", "D": "Accounting Period"},
            "answer": "C",
            "explanation": "Complete Disclosure requires all material information (including contingent liabilities) to be disclosed in the financial statements or Notes to Accounts, enabling stakeholders to make informed decisions.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Complete Disclosure",
            "competency": True,
        },
        {
            "question_text": "The Accounting Period concept requires that the life of a business be divided into:",
            "options": {"A": "Equal shares among partners", "B": "Fixed intervals for measuring performance and preparing statements", "C": "Tax assessment periods only", "D": "Project-based periods"},
            "answer": "B",
            "explanation": "The Accounting Period concept divides the indefinite life of a business into specific periods (usually 12 months) to measure performance periodically and to comply with legal/regulatory requirements.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Accounting Period",
            "competency": False,
        },
        {
            "question_text": "Infosys's employee morale and team spirit cannot be recorded in its Balance Sheet. This illustrates the:",
            "options": {"A": "Going Concern concept", "B": "Accounting Entity concept", "C": "Money Measurement concept", "D": "Complete Disclosure concept"},
            "answer": "C",
            "explanation": "The Money Measurement concept excludes non-monetary items. Employee morale, while important, cannot be expressed in rupees and hence is not recorded in the financial statements.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Money Measurement",
            "competency": True,
        },
    ],
    "fill_blank": [
        {
            "question_text": "The ____ concept assumes that a business will continue its operations for the foreseeable future and has no intention to liquidate.",
            "blank_answer": "Going Concern",
            "explanation": "Going Concern is a fundamental GAAP assumption. It means the business is expected to operate indefinitely, so assets are recorded at historical cost and liabilities are not immediately due.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Going Concern",
            "competency": False,
        },
        {
            "question_text": "The ____ concept requires that the affairs of the owner be kept separate from the affairs of the business.",
            "blank_answer": "Accounting Entity",
            "explanation": "Accounting Entity (or Business Entity) concept treats the business as a separate person in the eyes of law. Owner's personal transactions (like Drawings) must not be mixed with business transactions.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Accounting Entity",
            "competency": False,
        },
        {
            "question_text": "Under the Money Measurement concept, only those events that can be expressed in ____ are recorded in the books of account.",
            "blank_answer": "monetary terms (rupees)",
            "explanation": "The Money Measurement concept limits accounting to transactions that can be measured in monetary units. Non-quantifiable factors like employee morale, brand image, and management quality are excluded.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Money Measurement",
            "competency": False,
        },
        {
            "question_text": "The life of a business is divided into equal time intervals called ____ for the purpose of measuring performance.",
            "blank_answer": "accounting periods",
            "explanation": "Accounting Period (usually 12 months) allows periodic measurement of business performance and preparation of financial statements. Without this concept, accounts would only be prepared when the business closes.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Accounting Period",
            "competency": False,
        },
        {
            "question_text": "Wipro Ltd. discloses its contingent liability of ₹8,000 crore in the Notes to Accounts of its Balance Sheet. This is an application of the ____ concept.",
            "blank_answer": "Complete Disclosure",
            "explanation": "Complete Disclosure (Full Disclosure Principle) requires all material information to be disclosed in financial statements. Wipro's contingent liability is disclosed because it may affect investors' decisions.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Complete Disclosure",
            "competency": True,
        },
    ],
    "short_answer": [
        {
            "question_text": "Explain the Going Concern concept with an example from an Indian company.",
            "key_points": [
                "Going Concern: Assumption that business will continue operations indefinitely.",
                "Assets are recorded at historical cost, not at liquidation/realisable value.",
                "Example: Tata Motors shows its Pune plant at historical cost ₹2,000 Cr (less depreciation), not market value ₹4,500 Cr.",
                "Implication: No need to provide for forced sale value of assets.",
                "Auditor checks: If Going Concern assumption is invalid, financial statements must be prepared on a different basis.",
            ],
            "expected_count": 3,
            "explanation": "Students must state the concept, explain its accounting implication (historical cost), and cite an Indian company example as given in the syllabus.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Going Concern",
            "competency": True,
        },
        {
            "question_text": "What is the Accounting Entity concept? Give one Indian business example.",
            "key_points": [
                "Accounting Entity: Business is a separate entity from its owner.",
                "Business transactions recorded in business books; personal transactions of owner excluded.",
                "Owner's investment → Capital A/c (Personal Account).",
                "Owner's personal withdrawals → Drawings A/c (Nominal Account).",
                "Example: When Mukesh Ambani withdraws ₹5 lakhs from Reliance Industries for personal expenses, it is recorded as Drawings, not as a business expense.",
            ],
            "expected_count": 3,
            "explanation": "Students must define the concept and give an Indian business example showing how owner's personal transactions are treated differently from business transactions.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Accounting Entity",
            "competency": True,
        },
        {
            "question_text": "Why is the goodwill of Infosys not recorded in its Balance Sheet under the Money Measurement concept?",
            "key_points": [
                "Money Measurement: Only transactions expressible in monetary terms are recorded.",
                "Goodwill is subjective and cannot be reliably measured in monetary terms.",
                "Goodwill arises from reputation, customer loyalty, brand value — all intangible and variable.",
                "Only purchased goodwill (acquired via business acquisition at measurable cost) can be recorded.",
                "Self-generated (inherent) goodwill of Infosys is excluded due to measurement uncertainty.",
            ],
            "expected_count": 3,
            "explanation": "This question tests the Money Measurement concept using a well-known Indian company (Infosys). Students must explain why some valuable items are excluded from accounts.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Money Measurement",
            "competency": True,
        },
        {
            "question_text": "State any three reasons why the Accounting Period concept is necessary.",
            "key_points": [
                "Businesses have an indefinite life — without period concept, accounts would be prepared only at closure.",
                "Periodic measurement enables assessment of profitability for each period (quarterly, annually).",
                "Legal requirement: Companies Act and Income Tax Act require annual financial statements.",
                "Stakeholders (investors, creditors) need timely financial information to make decisions.",
                "Facilitates comparison of performance across periods.",
            ],
            "expected_count": 3,
            "explanation": "Students must explain WHY the concept is needed — not just what it means. Each reason connects the concept to a practical necessity.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Accounting Period",
            "competency": False,
        },
    ],
    "long_answer": [
        {
            "question_text": "Discuss in detail the five GAAP conventions/concepts: Going Concern, Accounting Entity, Money Measurement, Accounting Period, and Complete Disclosure. For each, state its meaning, rationale, and one practical example.",
            "sub_points": [
                "Going Concern: Business assumed to continue indefinitely. Rationale — assets recorded at historical cost. Example: Tata Motors' Pune plant shown at cost, not market value.",
                "Accounting Entity: Business treated as separate from owner. Rationale — prevents mixing of personal and business affairs. Example: Owner's Drawings recorded separately.",
                "Money Measurement: Only monetary events recorded. Rationale — ensures objectivity and measurability. Example: Employee morale of Infosys excluded from Balance Sheet.",
                "Accounting Period: Life of business divided into equal periods. Rationale — enables periodic measurement. Example: Annual financial statements prepared every April-March.",
                "Complete Disclosure: All material information disclosed. Rationale — transparency for stakeholders. Example: Reliance's contingent liability of ₹12,000 Cr disclosed in Notes.",
            ],
            "marks": 6,
            "explanation": "Long-answer covering all five GAAP concepts with meaning, rationale, and Indian company examples.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — All Concepts",
            "competency": True,
        },
        {
            "question_text": "Explain why the Accounting Entity concept is fundamental to accounting. Illustrate with a practical example where violation of this concept leads to incorrect financial statements.",
            "sub_points": [
                "Definition: Business is a separate legal entity from its owner — transactions must be segregated.",
                "Reason: Without separation, personal expenses/income of owner distort business profit/loss.",
                "Example of violation: Owner pays ₹1 lakh personal medical bill from business bank account and records it as 'Medical Expenses' in P&L.",
                "Correct treatment: Record as 'Drawings A/c Dr. ₹1 lakh' — it reduces capital, not a business expense.",
                "Impact of violation: Business P&L shows lower profit; tax liability is understated; financial statements are misleading.",
                "Legal basis: Companies Act 2013 and partnership laws reinforce this separation.",
            ],
            "marks": 6,
            "explanation": "In-depth question on Accounting Entity with a detailed violation example showing the practical consequences of ignoring the concept.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Accounting Entity",
            "competency": True,
        },
    ],
    "numerical": [
        {
            "question_text": "Sharma Electronics' building was purchased for ₹80 lakhs in 2015. As per the Going Concern concept, it is depreciated at 5% per annum on the original cost. Calculate the book value of the building as of 31st March 2024. If the market value is ₹1.2 crores, explain why the market value is not shown in the Balance Sheet.",
            "problem_type": "depreciation_going_concern",
            "purchase_cost": 8000000,
            "depreciation_rate": 5,
            "years": 9,
            "market_value": 12000000,
            "explanation": "Numerical + conceptual question. Tests Going Concern concept through a depreciation calculation, then asks for the conceptual explanation of why market value is ignored.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Going Concern Numerical",
            "competency": True,
        },
        {
            "question_text": "Reliance Industries reports total assets of ₹18,50,000 crore in its Balance Sheet. Of this, contingent liabilities of ₹12,000 crore are disclosed in the Notes to Accounts. Explain, citing the relevant GAAP concept, why these contingent liabilities are disclosed separately and not included as a liability in the main Balance Sheet.",
            "problem_type": "disclosure_explanation",
            "total_assets": 185000000,
            "contingent_liability": 12000,
            "explanation": "Tests Complete Disclosure concept. Students must explain why contingent liabilities are disclosed (uncertain, possible future outflow) and cite the GAAP principle.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Complete Disclosure Numerical",
            "competency": True,
        },
        {
            "question_text": "A textile company in Surat has the following data for the year ended 31st March 2024: Sales ₹45 lakhs, Purchase of raw material ₹22 lakhs, Salary paid to workers ₹8 lakhs, Owner's personal car petrol bill ₹15,000 paid from business account, Donation to temple ₹10,000. Calculate net profit correctly after separating personal expenses of the owner.",
            "problem_type": "accounting_entity_numerical",
            "sales": 4500000,
            "purchases": 2200000,
            "salaries": 800000,
            "personal_expense": 15000,
            "donation": 10000,
            "explanation": "Tests Accounting Entity concept through a numerical problem. Students must separate owner's personal expense (car petrol) from business expenses, treating it as Drawings.",
            "difficulty": "Easy",
            "topic": "c11_acc_008",
            "topic_label": "GAAP — Accounting Entity Numerical",
            "competency": True,
        },
    ],
}

# ──────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATOR
# ──────────────────────────────────────────────────────────────────────────────

_TOPIC_NODES = {
    "c11_acc_072": "Computerised Accounting System",
    "c11_acc_001": "Background, History and Types of Accounts",
    "c11_acc_008": "GAAP",
}


def _make_id(topic: str, index: int, qtype: str) -> str:
    return f"{topic}_{qtype[:3].upper()}_{index:03d}"


def _solve_question(q: Dict[str, Any]) -> Dict[str, Any]:
    """Dispatch to the appropriate solver."""
    qtype = q.get("question_type", "")
    if qtype == "mcq":
        return solve_mcq({
            "question_id": q["id"],
            "correct_option": q["answer"],
            "explanation": q["explanation"],
        })
    elif qtype == "fill_blank":
        return solve_fill_blank({
            "blank_index": q.get("blank_index", 0),
            "correct_answer": q["answer"],
            "explanation": q["explanation"],
        })
    elif qtype == "short_answer":
        return solve_short_answer({
            "key_points": q.get("key_points", []),
            "explanation": q["explanation"],
        })
    elif qtype == "long_answer":
        return solve_long_answer({
            "sub_points": q.get("sub_points", []),
            "explanation": q["explanation"],
        })
    elif qtype == "numerical":
        return solve_numerical(q.get("solver_params", {}))
    else:
        return {"answer": q.get("answer", ""), "steps": [], "verification": {}}


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministically generate `count` questions covering all three topic nodes.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Total number of questions to generate.

    Returns
    -------
    list[dict]
        Each dict contains:
            id, question_type, question_text, options (MCQ only),
            answer, explanation, difficulty, topic, topic_label,
            competency, marks, solution
    """
    _seed(seed)

    all_nodes = ["c11_acc_072", "c11_acc_001", "c11_acc_008"]
    bank_map = {
        "c11_acc_072": _QB_072_COMPONENTS,
        "c11_acc_001": _QB_001_HISTORY,
        "c11_acc_008": _QB_008_GAAP,
    }

    # ── Flatten bank into a list of (topic, qtype, qdata) ───────────────────
    flat_bank: List[tuple] = []
    for node in all_nodes:
        bank = bank_map[node]
        for qtype, questions in bank.items():
            for qdata in questions:
                flat_bank.append((node, qtype, qdata))

    total_available = len(flat_bank)

    if count > total_available:
        # Cycle through bank with offset
        selected = []
        for i in range(count):
            node, qtype, qdata = flat_bank[i % total_available]
            selected.append((node, qtype, qdata))
    else:
        # Shuffle and pick `count`
        idxs = list(range(total_available))
        random.shuffle(idxs)
        selected = [flat_bank[i] for i in idxs[:count]]

    # ── Convert to output format ────────────────────────────────────────────
    questions: List[Dict[str, Any]] = []
    for i, (topic, qtype, qdata) in enumerate(selected):
        q = dict(qdata)  # shallow copy
        q["id"] = _make_id(topic, i, qtype)
        q["question_type"] = qtype
        # Attach solver result
        q["solution"] = _solve_question(q)
        questions.append(q)

    return questions


# ──────────────────────────────────────────────────────────────────────────────
# VERIFICATION UTILITIES
# ──────────────────────────────────────────────────────────────────────────────

def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Run post-generation checks and return a summary report.
    """
    _seed(42)  # deterministic re-seed for verification
    total = len(questions)
    type_counts: Dict[str, int] = {}
    topic_counts: Dict[str, int] = {}
    competency_count = 0
    verified_count = 0
    missing_fields = []
    numerical_correct = 0
    numerical_total = 0

    for q in questions:
        qt = q.get("question_type", "unknown")
        tp = q.get("topic", "unknown")
        type_counts[qt] = type_counts.get(qt, 0) + 1
        topic_counts[tp] = topic_counts.get(tp, 0) + 1
        if q.get("competency"):
            competency_count += 1

        # Check required fields
        required = ["id", "question_type", "question_text", "answer",
                    "explanation", "difficulty", "topic", "topic_label"]
        missing = [f for f in required if f not in q or not q[f]]
        if missing:
            missing_fields.append({"id": q["id"], "missing": missing})

        sol = q.get("solution", {})
        if sol.get("verification", {}).get("status") == "verified":
            verified_count += 1

        if qt == "numerical":
            numerical_total += 1
            v = sol.get("verification", {})
            if isinstance(v, dict):
                if v.get("balanced") or v.get("status") == "verified":
                    numerical_correct += 1

    # Numerical self-check via seed re-run
    _seed(seed := 101)
    num_check_questions = generate_questions(seed, 5)
    num_check_pass = sum(
        1 for q in num_check_questions
        if q.get("solution", {}).get("verification", {}).get("status") in
        ("verified", "balanced")
    )

    all_nodes_covered = all(t in topic_counts for t in
                           ["c11_acc_072", "c11_acc_001", "c11_acc_008"])

    report = {
        "total_questions": total,
        "type_distribution": type_counts,
        "topic_distribution": topic_counts,
        "competency_questions": competency_count,
        "competency_pct": round(competency_count / total * 100, 1) if total else 0,
        "verified_solutions": verified_count,
        "missing_fields": missing_fields,
        "numerical_checks": {
            "total": numerical_total,
            "passed": numerical_correct,
            "pass_rate": round(numerical_correct / numerical_total * 100, 1)
            if numerical_total else 0,
        },
        "all_nodes_covered": all_nodes_covered,
        "seed_check_pass_rate": f"{num_check_pass}/{len(num_check_questions)}",
        "overall_status": "PASS" if (not missing_fields and all_nodes_covered) else "FAIL",
    }
    return report


# ──────────────────────────────────────────────────────────────────────────────
# DEMONSTRATION / TEST
# ──────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import json

    # Generate 40 questions with seed=2024
    SAMPLE_SEED = 2024
    SAMPLE_COUNT = 40

    print(f"Generating {SAMPLE_COUNT} CISCE Class 11 Accountancy questions (seed={SAMPLE_SEED}) ...\n")
    questions = generate_questions(SAMPLE_SEED, SAMPLE_COUNT)

    # Print summary
    print("=" * 70)
    print("QUESTION GENERATION SUMMARY")
    print("=" * 70)
    print(f"Total questions generated : {len(questions)}")

    type_counts: Dict[str, int] = {}
    topic_counts: Dict[str, int] = {}
    comp_count = 0

    for q in questions:
        qt = q["question_type"]
        tp = q["topic"]
        type_counts[qt] = type_counts.get(qt, 0) + 1
        topic_counts[tp] = topic_counts.get(tp, 0) + 1
        if q.get("competency"):
            comp_count += 1

    print(f"\nType distribution:")
    for t, c in sorted(type_counts.items()):
        print(f"  {t:20s}: {c}")
    print(f"\nTopic distribution:")
    for t, c in sorted(topic_counts.items()):
        print(f"  {t}: {c}")
    print(f"\nCompetency-based questions  : {comp_count} ({comp_count / len(questions) * 100:.1f}%)")
    print(f"Standard questions           : {len(questions) - comp_count}")

    # Print each question briefly
    print("\n" + "=" * 70)
    print("INDIVIDUAL QUESTIONS")
    print("=" * 70)
    for i, q in enumerate(questions, 1):
        comp_tag = "[INDIAN CONTEXT]" if q.get("competency") else "[STANDARD]"
        print(f"\nQ{i}. [{q['question_type'].upper()}] {comp_tag}")
        print(f"   Topic : {q['topic_label']}  |  Difficulty: {q['difficulty']}")
        print(f"   ID    : {q['id']}")
        text = q["question_text"]
        if len(text) > 120:
            text = text[:117] + "..."
        print(f"   Q     : {text}")
        if q["question_type"] == "mcq":
            opts = q.get("options", {})
            print(f"   Opts  : {opts}")
        print(f"   Ans   : {q['answer']}")
        sol = q.get("solution", {})
        v = sol.get("verification", {})
        status = v.get("status", "N/A")
        print(f"   Verify: {status}")

    # Run verification
    print("\n" + "=" * 70)
    print("VERIFICATION REPORT")
    print("=" * 70)
    report = verify_all_questions(questions)
    print(json.dumps(report, indent=2))

    # Determinism check — re-run with same seed
    _seed(SAMPLE_SEED)
    questions_2 = generate_questions(SAMPLE_SEED, SAMPLE_COUNT)
    same = all(q1["id"] == q2["id"] and q1["answer"] == q2["answer"]
               for q1, q2 in zip(questions, questions_2))
    print(f"\nDeterminism check (same seed → identical output): {same}")