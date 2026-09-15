"""solution_executor.py -- deterministic step-by-step solver.

Given a matched concept and extracted numbers from the question,
executes the solution steps deterministically and produces
a step-by-step worked solution.

NO LLM. NO generation. Pure computation.
"""
from __future__ import annotations

import re
from typing import Any, Dict, List, Optional, Tuple

from backend.its.competency.spacy_features import extract_features


def extract_numbers_from_question(question: str) -> List[float]:
    """Extract all numbers from a question, in order of appearance.
    Handles negative numbers in parentheses like (-5) and bare -5.
    """
    numbers = []
    # Match patterns: (-5), -5, 5, 3.14
    for m in re.finditer(r'\(?(-?\d+\.?\d*)\)?', question):
        text = m.group(1)
        try:
            val = float(text)
            # Skip metadata numbers (years like 2024, 2025, page numbers)
            if 1900 < val < 2100 and '.' not in text:
                continue
            numbers.append(val)
        except ValueError:
            continue
    return numbers


def solve_division(question: str, concept: Dict) -> Dict:
    """Solve a division of integers question.

    Handles:
      - Simple evaluation: (-30) / 10
      - Word problems: test marks, temperature, elevator
    """
    numbers = extract_numbers_from_question(question)
    q_lower = question.lower()

    # Simple evaluation: two numbers with division
    if len(numbers) >= 2 and ('/' in question or 'divided' in q_lower):
        if 'verify' in q_lower or 'property' in q_lower or '!=' in question:
            return {
                "type": "verify",
                "message": "This is a properties of division question, not a computation.",
                "concept": concept["title"],
            }
        a, b = numbers[0], numbers[1]
        result = a / b if b != 0 else None
        sign_rule = "same signs = positive" if (a < 0) == (b < 0) else "different signs = negative"
        return {
            "type": "computation",
            "concept": concept["title"],
            "steps": [
                {"step": 1, "action": "identify dividend and divisor",
                 "explain": "dividend = %g, divisor = %g" % (a, b),
                 "result": "dividend=%g, divisor=%g" % (a, b)},
                {"step": 2, "action": "determine sign",
                 "explain": sign_rule,
                 "result": sign_rule},
                {"step": 3, "action": "divide absolute values",
                 "explain": "|%g| / |%g| = %g / %g = %g" % (a, b, abs(a), abs(b), abs(a)/abs(b) if b != 0 else 0),
                 "result": abs(a)/abs(b) if b != 0 else None},
                {"step": 4, "action": "apply sign",
                 "explain": "result = %g" % result if result is not None else "undefined",
                 "result": result},
            ],
            "answer": result,
            "source": concept.get("textbook_ref", ""),
        }

    # Word problem: test marks
    if "class test" in q_lower or "marks for" in q_lower or "correct answer" in q_lower:
        # Pattern: +X for correct, -Y for incorrect, scored Z with W correct
        # Extract: correct_marks, incorrect_marks, total_score, num_correct
        correct_marks = None
        incorrect_marks = None
        total_score = None
        num_correct = None

        # +5 for correct, -2 for incorrect
        m = re.search(r'\+(\d+)\s*(?:marks?\s*)?for\s*correct', q_lower)
        if m:
            correct_marks = float(m.group(1))
        m = re.search(r'[-]\s*(\d+)\s*(?:marks?\s*)?for\s*incorrect', q_lower)
        if m:
            incorrect_marks = -float(m.group(1))

        # scored X marks
        m = re.search(r'scored\s+(-?\d+)', q_lower)
        if m:
            total_score = float(m.group(1))

        # got X correct / with X correct
        m = re.search(r'(\d+)\s*correct', q_lower)
        if m:
            num_correct = float(m.group(1))

        if all(v is not None for v in [correct_marks, incorrect_marks, total_score, num_correct]):
            marks_from_correct = correct_marks * num_correct
            marks_from_incorrect = total_score - marks_from_correct
            num_incorrect = marks_from_incorrect / incorrect_marks if incorrect_marks != 0 else None
            return {
                "type": "word_problem",
                "concept": concept["title"],
                "question_subtype": "test_marks",
                "steps": [
                    {"step": 1, "action": "compute marks from correct answers",
                     "explain": "marks_from_correct = correct_marks x num_correct = %g x %g = %g" % (correct_marks, num_correct, marks_from_correct),
                     "result": marks_from_correct},
                    {"step": 2, "action": "find marks lost to incorrect answers",
                     "explain": "marks_from_incorrect = total_score - marks_from_correct = %g - %g = %g" % (total_score, marks_from_correct, marks_from_incorrect),
                     "result": marks_from_incorrect},
                    {"step": 3, "action": "find number of incorrect answers",
                     "explain": "num_incorrect = marks_from_incorrect / incorrect_marks = %g / %g = %g" % (marks_from_incorrect, incorrect_marks, num_incorrect),
                     "result": num_incorrect},
                ],
                "answer": num_incorrect,
                "source": concept.get("textbook_ref", ""),
            }

    # Word problem: temperature
    if "temperature" in q_lower:
        # Pattern: temp at noon was X above zero, decreases at Y per hour, when is it Z below zero
        m = re.search(r'(\d+)\s*(?:c|degrees?)?\s*above\s*zero', q_lower)
        start_temp = float(m.group(1)) if m else None
        m = re.search(r'(\d+)\s*(?:c|degrees?)?\s*per\s*hour', q_lower)
        rate = float(m.group(1)) if m else None
        m = re.search(r'(\d+)\s*(?:c|degrees?)?\s*below\s*zero', q_lower)
        end_temp = -float(m.group(1)) if m else None

        if all(v is not None for v in [start_temp, rate, end_temp]):
            total_drop = start_temp - end_temp
            hours = total_drop / rate if rate != 0 else None
            # Time from noon
            from_hour = 12
            end_time = from_hour + hours if hours else None
            return {
                "type": "word_problem",
                "concept": concept["title"],
                "question_subtype": "temperature",
                "steps": [
                    {"step": 1, "action": "find total temperature drop",
                     "explain": "total_drop = start - end = %g - (%g) = %g" % (start_temp, end_temp, total_drop),
                     "result": total_drop},
                    {"step": 2, "action": "find hours",
                     "explain": "hours = total_drop / rate = %g / %g = %g" % (total_drop, rate, hours),
                     "result": hours},
                    {"step": 3, "action": "find time",
                     "explain": "time = 12 noon + %g hours = %g:00" % (hours, end_time) if end_time and end_time < 24 else "time = %g hours from noon" % hours,
                     "result": end_time},
                ],
                "answer": hours,
                "answer_label": "hours",
                "source": concept.get("textbook_ref", ""),
            }

    # Word problem: elevator
    if "elevator" in q_lower or "descends" in q_lower:
        m = re.search(r'(\d+)\s*m/min', q_lower) or re.search(r'(\d+)\s*m\s*per\s*min', q_lower)
        rate = float(m.group(1)) if m else None
        m = re.search(r'(\d+)\s*m\s*above', q_lower)
        start = float(m.group(1)) if m else 0
        m = re.search(r'[-]?(\d+)\s*m', q_lower)
        # Find the target depth (negative)
        m_neg = re.search(r'[-]\s*(\d+)\s*m', q_lower)
        end = -float(m_neg.group(1)) if m_neg else None

        if all(v is not None for v in [rate, end]):
            total_descent = start - end  # start is positive, end is negative
            time = total_descent / rate if rate != 0 else None
            return {
                "type": "word_problem",
                "concept": concept["title"],
                "question_subtype": "elevator",
                "steps": [
                    {"step": 1, "action": "find total descent",
                     "explain": "total_descent = start - end = %g - (%g) = %g" % (start, end, total_descent),
                     "result": total_descent},
                    {"step": 2, "action": "find time",
                     "explain": "time = total_descent / rate = %g / %g = %g" % (total_descent, rate, time),
                     "result": time},
                ],
                "answer": time,
                "answer_label": "minutes",
                "source": concept.get("textbook_ref", ""),
            }

    return {
        "type": "unsupported",
        "message": "Could not parse this division question.",
        "concept": concept["title"],
    }


def solve_multiplication(question: str, concept: Dict) -> Dict:
    """Solve a multiplication question."""
    numbers = extract_numbers_from_question(question)
    if len(numbers) < 2:
        return {"type": "unsupported", "concept": concept["title"]}

    a, b = numbers[0], numbers[1]
    result = a * b

    sign_rule = ""
    if a < 0 and b < 0:
        sign_rule = "negative x negative = positive"
    elif (a < 0) != (b < 0):
        sign_rule = "positive x negative = negative"
    else:
        sign_rule = "positive x positive = positive"

    return {
        "type": "computation",
        "concept": concept["title"],
        "steps": [
            {"step": 1, "action": "multiply absolute values",
             "explain": "|%g| x |%g| = %g x %g = %g" % (a, b, abs(a), abs(b), abs(a)*abs(b)),
             "result": abs(a)*abs(b)},
            {"step": 2, "action": "apply sign rule",
             "explain": sign_rule,
             "result": sign_rule},
            {"step": 3, "action": "final result",
             "explain": "%g x %g = %g" % (a, b, result),
             "result": result},
        ],
        "answer": result,
        "source": concept.get("textbook_ref", ""),
    }


def solve_verify_property(question: str, concept: Dict) -> Dict:
    """Handle verify_property type questions.

    These ask the student to verify a property (commutative, associative, etc.)
    The system shows the verification steps.
    """
    numbers = extract_numbers_from_question(question)
    concept_id = concept.get("id", "")

    if concept_id == "c7m1.1.3":
        # Commutative addition: a + b = b + a
        if len(numbers) >= 2:
            a, b = numbers[0], numbers[1]
            left = a + b
            right = b + a
            return {
                "type": "verify_property",
                "concept": concept["title"],
                "steps": [
                    {"step": 1, "action": "compute a + b",
                     "explain": "%g + %g = %g" % (a, b, left),
                     "result": left},
                    {"step": 2, "action": "compute b + a",
                     "explain": "%g + %g = %g" % (b, a, right),
                     "result": right},
                    {"step": 3, "action": "compare",
                     "explain": "%g = %g, so a + b = b + a" % (left, right) if left == right else "%g != %g" % (left, right),
                     "result": left == right},
                ],
                "answer": left == right,
                "verdict": "Verified: addition is commutative" if left == right else "Not commutative",
                "source": concept.get("textbook_ref", ""),
            }

    if concept_id == "c7m1.3.6":
        # Distributive: a x (b + c) = a x b + a x c
        if len(numbers) >= 3:
            a, b, c = numbers[0], numbers[1], numbers[2]
            left = a * (b + c)
            right = a * b + a * c
            return {
                "type": "verify_property",
                "concept": concept["title"],
                "steps": [
                    {"step": 1, "action": "compute a x (b + c)",
                     "explain": "%g x (%g + %g) = %g x %g = %g" % (a, b, c, a, b+c, left),
                     "result": left},
                    {"step": 2, "action": "compute a x b + a x c",
                     "explain": "%g x %g + %g x %g = %g + %g = %g" % (a, b, a, c, a*b, a*c, right),
                     "result": right},
                    {"step": 3, "action": "compare",
                     "explain": "%g = %g, so distributive property holds" % (left, right) if left == right else "%g != %g" % (left, right),
                     "result": left == right},
                ],
                "answer": left == right,
                "verdict": "Verified: distributive property holds" if left == right else "Distributive property does not hold",
                "source": concept.get("textbook_ref", ""),
            }

    return {
        "type": "verify_property",
        "concept": concept["title"],
        "message": "This is a property verification question. Apply the definition from the textbook.",
        "definition": concept.get("definition", ""),
        "formula": concept.get("formula", ""),
        "source": concept.get("textbook_ref", ""),
    }


def solve(question: str, concept: Dict) -> Dict:
    """Main entry point. Given a question and matched concept, solve it."""
    solution_type = concept.get("solution_type", "")

    if solution_type == "compute":
        concept_id = concept.get("id", "")
        if concept_id.startswith("c7m1.4") or concept_id == "c7m1.5":
            return solve_division(question, concept)
        elif concept_id.startswith("c7m1.2") or concept_id.startswith("c7m1.3.3") or concept_id.startswith("c7m1.3.4"):
            return solve_multiplication(question, concept)
        else:
            return solve_multiplication(question, concept)

    elif solution_type == "verify_property":
        return solve_verify_property(question, concept)

    return {
        "type": "unsupported",
        "message": "Unknown solution type: %s" % solution_type,
        "concept": concept["title"],
    }
