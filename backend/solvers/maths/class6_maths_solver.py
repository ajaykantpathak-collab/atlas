"""
Class 6 Mathematics Solver
Covers nodes:
  c6_math_001 – 5-digit numbers: comparison, ordering, estimation (rounding)
  c6_math_002 – Place value & face value, number expansion

All functions are deterministic and independent of any LLM.
"""

import random
import math
from typing import Optional, Tuple, List, Dict, Any


# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------

def _indian_format(n: int) -> str:
    """Format an integer with Indian comma grouping (e.g. 123456 → '1,23,456')."""
    s = str(abs(n))
    if len(s) <= 3:
        return s
    last3 = s[-3:]
    rest = s[:-3]
    parts = []
    while rest:
        parts.insert(0, rest[-2:])
        rest = rest[:-2]
    return ','.join(parts) + ',' + last3 if parts else last3


def _digit_positions_5(n: int) -> dict:
    """Return a mapping of place name → digit for a 5-digit number (Indian system)."""
    s = str(n).zfill(5)
    return {
        'ten_thousands': int(s[0]),
        'thousands':     int(s[1]),
        'hundreds':      int(s[2]),
        'tens':          int(s[3]),
        'ones':          int(s[4]),
    }


# ===================================================================
# ===================================================================

class Node001Solver:

    # ------------------------------------------------------------------
    # 1a. Compare two 5-digit numbers
    # ------------------------------------------------------------------
    @staticmethod
    def compare_5digit(a: int, b: int) -> dict:
        """
        Compare two numbers (up to 5 digits) and return a full analysis.

        Returns dict with keys:
          larger, smaller, comparison_symbol, explanation
        """
        a_str = str(a).zfill(5)
        b_str = str(b).zfill(5)
        places = ['ten thousands', 'thousands', 'hundreds', 'tens', 'ones']

        explanation = []
        larger, smaller = (a, b) if a > b else (b, a)

        for i, place in enumerate(places):
            da, db = int(a_str[i]), int(b_str[i])
            if da != db:
                explanation.append(
                    f"At the {place} place: {da} vs {db} → {'larger' if da > db else 'smaller'}"
                )
                break

        symbol = '>' if a > b else ('<' if a < b else '=')
        return {
            'larger':          larger,
            'smaller':         smaller,
            'comparison':      f"{_indian_format(a)} {symbol} {_indian_format(b)}",
            'symbol':          symbol,
            'explanation':     explanation,
            'first_diff_place': explanation[0].split(':')[0] if explanation else 'all digits equal',
        }

    # ------------------------------------------------------------------
    # 1b. Arrange multiple 5-digit numbers in ascending / descending order
    # ------------------------------------------------------------------
    @staticmethod
    def arrange_ascending(numbers: List[int]) -> dict:
        sorted_n = sorted(numbers)
        return {
            'ascending':  [_indian_format(x) for x in sorted_n],
            'descending': [_indian_format(x) for x in reversed(sorted_n)],
            'sorted_raw': sorted_n,
            'inequality': ' < '.join(_indian_format(x) for x in sorted_n),
        }

    # ------------------------------------------------------------------
    # 1c. Round to nearest thousand
    # ------------------------------------------------------------------
    @staticmethod
    def round_nearest_thousand(n: int) -> dict:
        quotient = n // 1000
        remainder = n % 1000
        rounded_up   = (quotient + 1) * 1000
        rounded_down = quotient * 1000
        result = rounded_up if remainder >= 500 else rounded_down
        return {
            'original':        _indian_format(n),
            'rounded':         _indian_format(result),
            'rule':            f"{n} ÷ 1000 = {quotient} remainder {remainder}",
            'remainder_ge_500': remainder >= 500,
            'explanation': (
                f"Since remainder {remainder} {'≥' if remainder >= 500 else '<'} 500, "
                f"round {'UP' if remainder >= 500 else 'DOWN'} → {_indian_format(result)}"
            ),
        }

    # ------------------------------------------------------------------
    # 1d. Round to nearest ten thousand
    # ------------------------------------------------------------------
    @staticmethod
    def round_nearest_ten_thousand(n: int) -> dict:
        quotient = n // 10000
        remainder = n % 10000
        rounded_up   = (quotient + 1) * 10000
        rounded_down = quotient * 10000
        result = rounded_up if remainder >= 5000 else rounded_down
        return {
            'original':        _indian_format(n),
            'rounded':         _indian_format(result),
            'rule':            f"{n} ÷ 10000 = {quotient} remainder {remainder}",
            'remainder_ge_5000': remainder >= 5000,
            'explanation': (
                f"Since remainder {remainder} {'≥' if remainder >= 5000 else '<'} 5000, "
                f"round {'UP' if remainder >= 5000 else 'DOWN'} → {_indian_format(result)}"
            ),
        }

    # ------------------------------------------------------------------
    # 1e. Verify student answer for comparison
    # ------------------------------------------------------------------
    @staticmethod
    def verify_comparison(a: int, b: int, student_answer: str) -> dict:
        """
        student_answer should be one of: '>', '<', '=', 'a>b', 'b>a', etc.
        """
        a_str = str(a).zfill(5)
        b_str = str(b).zfill(5)
        places = ['ten thousands', 'thousands', 'hundreds', 'tens', 'ones']

        correct_symbol = '>' if a > b else ('<' if a < b else '=')
        student_sym = student_answer.strip().replace(' ', '')
        if student_sym.lower() in ('a>b', 'a>b', 'greater'):
            student_sym = '>'
        elif student_sym.lower() in ('b>a', 'b>a', 'smaller'):
            student_sym = '<'
        elif student_sym == '=':
            pass

        is_correct = (student_sym == correct_symbol)

        explanation = []
        for i, place in enumerate(places):
            da, db = int(a_str[i]), int(b_str[i])
            if da != db:
                explanation.append(
                    f"Compare at {place} place: {da} vs {db} → "
                    f"{_indian_format(a)} {'>' if da > db else '<'} {_indian_format(b)}"
                )
                break

        return {
            'correct':      is_correct,
            'correct_symbol': correct_symbol,
            'student_symbol': student_sym,
            'explanation':  explanation,
            'message': (
                "Correct! ✅" if is_correct
                else f"Incorrect. {explanation[0] if explanation else 'The numbers are equal.'}"
            ),
        }

    # ------------------------------------------------------------------
    # 1f. Verify ordering answer
    # ------------------------------------------------------------------
    @staticmethod
    def verify_ordering(numbers: List[int], student_list: List[int]) -> dict:
        correct = sorted(numbers)
        is_correct = (student_list == correct)
        return {
            'correct':    is_correct,
            'correct_order': [_indian_format(x) for x in correct],
            'student_order': [_indian_format(x) for x in student_list],
            'message': (
                "Correct! ✅" if is_correct
                else f"Incorrect. Correct order: {' < '.join(_indian_format(x) for x in correct)}"
            ),
        }


# ===================================================================
# ===================================================================

class Node002Solver:

    # ------------------------------------------------------------------
    # 2a. Face value of a digit
    # ------------------------------------------------------------------
    @staticmethod
    def face_value(n: int, digit_str: str) -> dict:
        """
        face_value of a digit is the digit itself, regardless of position.
        digit_str: single character e.g. '7'
        """
        d = int(digit_str)
        return {
            'number':    _indian_format(n),
            'digit':     digit_str,
            'face_value': d,
            'definition': (
                f"Face value of '{digit_str}' in {_indian_format(n)} is simply {d} "
                f"– the digit itself, independent of its position."
            ),
        }

    # ------------------------------------------------------------------
    # 2b. Place value of a digit
    # ------------------------------------------------------------------
    @staticmethod
    def place_value(n: int, digit_str: str) -> dict:
        """
        place_value = face_value × positional multiplier.
        """
        n_str = str(n)
        try:
            pos = n_str.rindex(digit_str)
        except ValueError:
            return {'error': f"Digit '{digit_str}' not found in {n}"}

        from_right = len(n_str) - 1 - pos   # 0=ones, 1=tens, ...
        multipliers = {
            0: 1, 1: 10, 2: 100, 3: 1000,
            4: 10000, 5: 100000, 6: 1000000, 7: 10000000,
        }
        multiplier = multipliers.get(from_right, 10 ** from_right)
        place_names = {0:'ones',1:'tens',2:'hundreds',3:'thousands',
                       4:'ten thousands',5:'lakhs',6:'ten lakhs',7:'crores'}
        place_name = place_names.get(from_right, f'10^{from_right}')

        d = int(digit_str)
        pv = d * multiplier
        return {
            'number':         _indian_format(n),
            'digit':          digit_str,
            'position_from_right': from_right,
            'place_name':     place_name,
            'multiplier':     multiplier,
            'face_value':     d,
            'place_value':    pv,
            'explanation':    (
                f"Digit '{digit_str}' is at the {place_name} place.\n"
                f"Place value = face value × positional value = {d} × {multiplier:,} = {pv:,}"
            ),
        }

    # ------------------------------------------------------------------
    # 2c. Expand a number into place-value components
    # ------------------------------------------------------------------
    @staticmethod
    def expand_number(n: int) -> dict:
        """
        Expand a number (up to 8 digits) as sum of place-value terms.
        Indian system.
        """
        s = str(n)
        length = len(s)
        terms = []
        place_names_inv = {
            0:'Ones', 1:'Tens', 2:'Hundreds', 3:'Thousands',
            4:'Ten Thousands', 5:'Lakhs', 6:'Ten Lakhs',
            7:'Crores', 8:'Ten Crores'
        }
        for i, ch in enumerate(s):
            from_right = length - 1 - i
            multiplier = 10 ** from_right
            d = int(ch)
            if d == 0:
                continue
            pv = d * multiplier
            terms.append({
                'digit':      d,
                'place_name': place_names_inv.get(from_right, f'10^{from_right}'),
                'multiplier': multiplier,
                'term_value': pv,
                'term_str':   f"{d} × {multiplier:,}" if multiplier > 1 else str(d),
            })

        expansion_str = ' + '.join(f"{t['term_value']:,}" for t in terms)
        return {
            'number':         _indian_format(n),
            'terms':          terms,
            'expansion_str':  expansion_str,
            'full_expression': f"{_indian_format(n)} = {expansion_str}",
        }

    # ------------------------------------------------------------------
    # 2d. Identify the place of a given digit
    # ------------------------------------------------------------------
    @staticmethod
    def identify_place(n: int, digit_str: str) -> dict:
        n_str = str(n)
        try:
            pos = n_str.rindex(digit_str)
        except ValueError:
            return {'error': f"Digit '{digit_str}' not found in {n}"}

        from_right = len(n_str) - 1 - pos
        place_names = {
            0:'Ones', 1:'Tens', 2:'Hundreds', 3:'Thousands',
            4:'Ten Thousands', 5:'Lakhs', 6:'Ten Lakhs',
            7:'Crores', 8:'Ten Crores'
        }
        place_name = place_names.get(from_right, f'position {from_right} from right')
        multiplier = 10 ** from_right
        return {
            'number':      _indian_format(n),
            'digit':       digit_str,
            'place_name':  place_name,
            'position_from_right': from_right,
            'multiplier':  multiplier,
            'explanation': (
                f"In {_indian_format(n)}, digit '{digit_str}' is at the "
                f"{place_name} place (position {from_right} from right), "
                f"so its positional multiplier is {multiplier:,}."
            ),
        }

    # ------------------------------------------------------------------
    # 2e. Verify face value answer
    # ------------------------------------------------------------------
    @staticmethod
    def verify_face_value(n: int, digit_str: str, student_answer: int) -> dict:
        correct = int(digit_str)
        return {
            'correct':   student_answer == correct,
            'correct_answer': correct,
            'student_answer': student_answer,
            'message': (
                "Correct! Face value is the digit itself. ✅"
                if student_answer == correct else
                f"Incorrect. Face value of '{digit_str}' is always {correct} — "
                f"the digit itself, wherever it appears."
            ),
        }

    # ------------------------------------------------------------------
    # 2f. Verify place value answer
    # ------------------------------------------------------------------
    @staticmethod
    def verify_place_value(n: int, digit_str: str, student_answer: int) -> dict:
        pv_info = Node002Solver.place_value(n, digit_str)
        if 'error' in pv_info:
            return pv_info
        correct = pv_info['place_value']
        return {
            'correct':       student_answer == correct,
            'correct_answer': correct,
            'student_answer': student_answer,
            'explanation':   pv_info['explanation'],
            'message': (
                "Correct! ✅" if student_answer == correct else
                f"Incorrect. {pv_info['explanation']} Correct answer = {correct:,}"
            ),
        }

    # ------------------------------------------------------------------
    # 2g. Verify expansion answer
    # ------------------------------------------------------------------
    @staticmethod
    def verify_expansion(n: int, student_terms: List[int]) -> dict:
        exp = Node002Solver.expand_number(n)
        correct_terms = [t['term_value'] for t in exp['terms']]
        is_correct = (sorted(student_terms) == sorted(correct_terms))
        return {
            'correct':      is_correct,
            'correct_terms': correct_terms,
            'student_terms': student_terms,
            'expansion':    exp['full_expression'],
            'message': (
                "Correct! ✅" if is_correct else
                f"Incorrect. Correct expansion: {exp['full_expression']}"
            ),
        }


# ===================================================================
# ===================================================================

SOLVER_MAP = {
    'c6_math_001': Node001Solver,
    'c6_math_002': Node002Solver,
}


def solve(node_id: str, task: str, *args, **kwargs) -> Dict[str, Any]:
    """
    Unified solver interface.

    Example calls:
      solve('c6_math_001', 'compare', 48375, 48297)
      solve('c6_math_001', 'round_thousand', 44800)
      solve('c6_math_002', 'place_value', 347892, '7')
      solve('c6_math_002', 'expand', 823456)
    """
    solver_cls = SOLVER_MAP.get(node_id)
    if solver_cls is None:
        return {'error': f"Unknown node: {node_id}"}
    method = getattr(solver_cls, task, None)
    if method is None:
        return {'error': f"Unknown task '{task}' for node {node_id}"}
    return method(*args, **kwargs)