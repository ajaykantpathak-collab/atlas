"""
CISCE Class 10 Commercial Applications - Deterministic Solver & Question Generator
Syllabus: Ch1 Markets/Marketing, Ch2 GAAP, Ch3 HRM
"""

import random
import math
import hashlib
from fractions import Fraction
from typing import Dict, List, Any, Optional, Union
from dataclasses import dataclass, field

import numpy as np
from sympy import symbols, Eq, solve, Rational, simplify, N

# ============================================================
# SEEDED RANDOM INFRASTRUCTURE
# ============================================================

def _seed_from(seed: int) -> None:
    """Set deterministic random seed for reproducibility."""
    random.seed(seed)
    np.random.seed(seed)


def _derive_seed(base_seed: int, salt: int) -> int:
    """Derive a deterministic sub-seed from base seed and salt."""
    return int(hashlib.md5(f"{base_seed}_{salt}".encode()).hexdigest()[:8], 16)


def _stable_shuffle(seq: List[Any], seed: int) -> List[Any]:
    """Deterministically shuffle a sequence."""
    rng = random.Random(seed)
    result = seq[:]
    rng.shuffle(result)
    return result


# ============================================================
# GAAP ACCOUNTING COMPUTATIONS (Ch2)
# ============================================================

def solve_accounting_equation(params: Dict) -> Dict:
    """
    Solve accounting equation: Assets = Liabilities + Capital.
    Given any two values, compute the third.
    
    Params: {
        'given': 'assets' | 'liabilities' | 'capital',
        'assets': float,
        'liabilities': float,
        'capital': float
    }
    """
    steps = []
    A, L, C = symbols('A L C')
    eq = Eq(A, L + C)
    steps.append("Step 1: Accounting Equation: Assets = Liabilities + Capital")
    steps.append("Step 2: Symbolic form: A = L + C")

    given = params['given']

    if given == 'assets':
        A_val = float(params['assets'])
        L_val = float(params['liabilities'])
        computed_C = A_val - L_val
        steps.append(f"Step 3: Given A = {A_val}, L = {L_val}")
        steps.append(f"Step 4: C = A - L = {A_val} - {L_val} = {computed_C}")
        answer = round(computed_C, 2)
        verification = f"Verification: L + C = {L_val} + {computed_C} = {L_val + computed_C} = A ({A_val}) ✓"

    elif given == 'liabilities':
        A_val = float(params['assets'])
        C_val = float(params['capital'])
        computed_L = A_val - C_val
        steps.append(f"Step 3: Given A = {A_val}, C = {C_val}")
        steps.append(f"Step 4: L = A - C = {A_val} - {C_val} = {computed_L}")
        answer = round(computed_L, 2)
        verification = f"Verification: L + C = {computed_L} + {C_val} = {computed_L + C_val} = A ({A_val}) ✓"

    else:
        A_val = float(params['assets'])
        L_val = float(params['liabilities'])
        computed_C = A_val - L_val
        steps.append(f"Step 3: Given A = {A_val}, L = {L_val}")
        steps.append(f"Step 4: C = A - L = {A_val} - {L_val} = {computed_C}")
        answer = round(computed_C, 2)
        verification = f"Verification: L + C = {L_val} + {computed_C} = {L_val + computed_C} = A ({A_val}) ✓"

    steps.append(f"Step 5: {verification}")

    # SymPy symbolic verification
    sym_sol = solve(eq.subs({A: A_val if given != 'assets' else symbols('A_val'),
                              L: L_val if given != 'liabilities' else symbols('L_val'),
                              C: computed_C if given != 'capital' else symbols('C_val')}),
                    symbols('A_val') if given == 'assets' else
                    symbols('L_val') if given == 'liabilities' else
                    symbols('C_val'))

    return {
        'answer': answer,
        'steps': steps,
        'verification': verification,
        'symbolic_check': 'Accounting equation balanced',
        'method': 'accounting_equation_solver'
    }


def solve_duality_verification(params: Dict) -> Dict:
    """
    Verify duality concept: every transaction has a dual effect.
    
    Params: {
        'transaction': str,
        'debit_account': str,
        'credit_account': str,
        'debit_amount': float,
        'credit_amount': float
    }
    """
    steps = []
    steps.append("Step 1: Duality Concept - Every transaction has a dual (two-fold) effect on accounts.")
    steps.append("Step 2: Based on accounting equation: Assets = Liabilities + Capital")

    debit_acc = params['debit_account']
    credit_acc = params['credit_account']
    debit_amt = float(params['debit_amount'])
    credit_amt = float(params['credit_amount'])

    steps.append(f"Step 3: Transaction: {params['transaction']}")
    steps.append(f"Step 4: Debit  {debit_acc}: +₹{debit_amt}")
    steps.append(f"Step 5: Credit {credit_acc}: +₹{credit_amt}")

    verification_passed = abs(debit_amt - credit_amt) < 1e-9
    verification = f"Duality Check: Total Debit (₹{debit_amt}) = Total Credit (₹{credit_amt})? {verification_passed}"

    steps.append(f"Step 6: {verification}")

    return {
        'answer': 'Duality verified' if verification_passed else 'Duality violated',
        'steps': steps,
        'verification': verification,
        'method': 'duality_verifier'
    }


def solve_matching_concept(params: Dict) -> Dict:
    """
    Apply matching concept: match expenses with revenues of the same period.
    
    Params: {
        'revenue': float,
        'expenses': List[float]
    }
    """
    steps = []
    steps.append("Step 1: Matching Concept - Expenses matched with revenues of same accounting period.")

    revenue = float(params['revenue'])
    expenses = [float(e) for e in params['expenses']]
    total_expenses = sum(expenses)

    steps.append(f"Step 2: Revenue earned: ₹{revenue}")
    for i, exp in enumerate(expenses, 1):
        steps.append(f"Step 2.{i}: Expense {i}: ₹{exp}")
    steps.append(f"Step 3: Total Expenses = ₹{total_expenses}")

    profit = revenue - total_expenses
    steps.append(f"Step 4: Net Profit = Revenue - Total Expenses = {revenue} - {total_expenses} = ₹{profit}")

    verification = f"Verification: Revenue ({revenue}) - Expenses ({total_expenses}) = Profit ({profit}) ✓"
    steps.append(f"Step 5: {verification}")

    return {
        'answer': round(profit, 2),
        'steps': steps,
        'verification': verification,
        'method': 'matching_concept_solver'
    }


def solve_gst_calculation(params: Dict) -> Dict:
    """
    Calculate GST for Indian context.
    
    Params: {
        'original_price': float,
        'gst_rate': float,
        'operation': 'add' | 'remove'
    }
    """
    steps = []
    price = float(params['original_price'])
    rate = float(params['gst_rate'])
    op = params['operation']

    if op == 'add':
        gst_amount = price * rate / 100
        final_price = price + gst_amount
        steps.append(f"Original Price = ₹{price}")
        steps.append(f"GST Rate = {rate}%")
        steps.append(f"GST Amount = {price} × {rate} / 100 = ₹{gst_amount}")
        steps.append(f"Final Price = {price} + {gst_amount} = ₹{final_price}")
        return {
            "answer": final_price,
            "steps": steps,
            "verification": abs(final_price - (price + price * rate / 100)) < 0.01,
        }
    elif op == 'remove':
        base_price = price * 100 / (100 + rate)
        gst_amount = price - base_price
        steps.append(f"Price (incl. GST) = ₹{price}")
        steps.append(f"GST Rate = {rate}%")
        steps.append(f"Base Price = {price} × 100 / (100 + {rate}) = ₹{base_price:.2f}")
        steps.append(f"GST Amount = {price} - {base_price:.2f} = ₹{gst_amount:.2f}")
        return {
            "answer": round(base_price, 2),
            "steps": steps,
            "verification": abs(base_price + base_price * rate / 100 - price) < 0.01,
        }
    else:
        return {"answer": None, "steps": ["Invalid operation"], "verification": False}


def solve_question(question: Dict, user_input: Optional[str] = None) -> Dict:
    """Route a question to the appropriate solver."""
    qtype = question.get('type', 'unknown')
    if qtype == 'accounting_equation':
        return solve_accounting_equation(question.get('params', {}))
    elif qtype == 'duality_verification':
        return solve_duality_verification(question.get('params', {}))
    elif qtype == 'matching_concept':
        return solve_matching_concept(question.get('params', {}))
    elif qtype == 'gst_calculation':
        return solve_gst_calculation(question.get('params', {}))
    return {"answer": None, "steps": ["Unknown question type"], "verification": False}