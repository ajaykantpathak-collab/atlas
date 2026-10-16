"""
answer_evaluator.py
Deterministic answer evaluation — no LLM calls.

Evaluates student answers against .bloom.marker ANSWER fields.
Supports: mcq, text, number, formula answer types.

Evaluation strategies:
  mcq:     exact match against correct option index/label
  text:    fuzzy match (SequenceMatcher >= 0.70) + keyword overlap
  number:  numeric comparison with tolerance
  formula: normalized string comparison (strip spaces, lowercase)
"""

from __future__ import annotations

import logging
import re
from dataclasses import dataclass, field
from difflib import SequenceMatcher
from typing import Any

logger = logging.getLogger(__name__)


@dataclass
class EvaluationResult:
    """Result of evaluating a student's answer."""
    is_correct: bool
    answer_type: str
    confidence: float  # 0.0–1.0 how confident we are in the evaluation
    matched_answer: str | None = None
    student_answer: str = ""
    expected_answer: str = ""
    partial_credit: float = 0.0  # 0.0–1.0 for partially correct text answers
    evaluation_method: str = ""  # how we evaluated (exact, fuzzy, numeric, keyword)
    notes: str = ""


def evaluate_answer(
    student_answer: str,
    question: dict,
) -> EvaluationResult:
    """Evaluate a student's answer against a diagnostic question.

    Parameters
    ----------
    student_answer : str
        The student's response (text, option label, number, etc.)
    question : dict
        A parsed diagnostic question from .bloom.marker with fields:
        answer, answer_type, options, working, hint

    Returns
    -------
    EvaluationResult
    """
    answer_type = question.get("answer_type", "text").lower().strip()
    expected = question.get("answer", "").strip()
    options = question.get("options", [])

    if answer_type == "mcq":
        return _eval_mcq(student_answer, expected, options)
    elif answer_type == "number":
        return _eval_number(student_answer, expected)
    elif answer_type == "formula":
        return _eval_formula(student_answer, expected)
    else:
        return _eval_text(student_answer, expected)


def _eval_mcq(student_answer: str, expected: str, options: list[str]) -> EvaluationResult:
    """Evaluate MCQ answer — match by option text or index."""
    student = student_answer.strip()

    if student.lower() == expected.lower().strip():
        return EvaluationResult(
            is_correct=True,
            answer_type="mcq",
            confidence=1.0,
            matched_answer=expected,
            student_answer=student,
            expected_answer=expected,
            evaluation_method="exact_expected_match",
        )

    # Try to match by option text directly
    for i, opt in enumerate(options):
        if student.lower() == opt.lower().strip():
            is_correct = opt.lower().strip() == expected.lower().strip()
            return EvaluationResult(
                is_correct=is_correct,
                answer_type="mcq",
                confidence=1.0,
                matched_answer=opt,
                student_answer=student,
                expected_answer=expected,
                evaluation_method="exact_option_match",
            )

    # Try to match by index (student might type "A", "B", "1", "2", etc.)
    index_match = re.match(r"^[A-Da-d]$", student)
    if index_match:
        idx = ord(student.upper()[0]) - ord("A")
        if 0 <= idx < len(options):
            selected = options[idx]
            is_correct = selected.lower().strip() == expected.lower().strip()
            return EvaluationResult(
                is_correct=is_correct,
                answer_type="mcq",
                confidence=1.0,
                matched_answer=selected,
                student_answer=student,
                expected_answer=expected,
                evaluation_method="index_match",
            )

    numeric_match = re.match(r"^(\d+)$", student)
    if numeric_match:
        idx = int(student) - 1
        if 0 <= idx < len(options):
            selected = options[idx]
            is_correct = selected.lower().strip() == expected.lower().strip()
            return EvaluationResult(
                is_correct=is_correct,
                answer_type="mcq",
                confidence=1.0,
                matched_answer=selected,
                student_answer=student,
                expected_answer=expected,
                evaluation_method="numeric_index_match",
            )

    # Fuzzy match student answer to closest option
    best_ratio = 0.0
    best_option = None
    for opt in options:
        ratio = SequenceMatcher(None, student.lower(), opt.lower().strip()).ratio()
        if ratio > best_ratio:
            best_ratio = ratio
            best_option = opt

    if best_ratio >= 0.80 and best_option:
        is_correct = best_option.lower().strip() == expected.lower().strip()
        return EvaluationResult(
            is_correct=is_correct,
            answer_type="mcq",
            confidence=best_ratio,
            matched_answer=best_option,
            student_answer=student,
            expected_answer=expected,
            evaluation_method="fuzzy_option_match",
        )

    # Could not match to any option
    return EvaluationResult(
        is_correct=False,
        answer_type="mcq",
        confidence=0.3,
        student_answer=student,
        expected_answer=expected,
        evaluation_method="no_match",
        notes="Could not match student answer to any option",
    )


def _eval_number(student_answer: str, expected: str) -> EvaluationResult:
    """Evaluate numeric answer — parse floats and compare with tolerance."""
    try:
        student_num = float(re.sub(r"[^\d.\-]", "", student_answer))
    except (ValueError, TypeError):
        return EvaluationResult(
            is_correct=False,
            answer_type="number",
            confidence=0.5,
            student_answer=student_answer,
            expected_answer=expected,
            evaluation_method="parse_failure",
            notes="Could not parse student answer as number",
        )

    try:
        expected_num = float(re.sub(r"[^\d.\-]", "", expected))
    except (ValueError, TypeError):
        # Expected answer isn't purely numeric — fall back to text matching
        return _eval_text(student_answer, expected)

    tolerance = max(abs(expected_num) * 0.02, 0.01)  # 2% tolerance or 0.01 minimum
    is_correct = abs(student_num - expected_num) <= tolerance

    return EvaluationResult(
        is_correct=is_correct,
        answer_type="number",
        confidence=0.95,
        student_answer=str(student_num),
        expected_answer=str(expected_num),
        evaluation_method="numeric_comparison",
        partial_credit=1.0 if is_correct else max(0.0, 1.0 - abs(student_num - expected_num) / max(abs(expected_num), 1.0)),
    )


def _eval_formula(student_answer: str, expected: str) -> EvaluationResult:
    """Evaluate formula answer — normalize and compare."""
    def normalize(s: str) -> str:
        # Remove spaces, lowercase, remove trailing periods
        s = s.lower().strip().rstrip(".")
        s = re.sub(r"\s+", "", s)
        # Normalize common math notation
        s = s.replace("*", "").replace("×", "").replace("·", "")
        s = s.replace("^", "**")
        s = s.replace("√", "sqrt")
        return s

    student_norm = normalize(student_answer)
    expected_norm = normalize(expected)

    if student_norm == expected_norm:
        return EvaluationResult(
            is_correct=True,
            answer_type="formula",
            confidence=1.0,
            student_answer=student_answer,
            expected_answer=expected,
            evaluation_method="exact_normalized",
        )

    ratio = SequenceMatcher(None, student_norm, expected_norm).ratio()
    if ratio >= 0.90:
        return EvaluationResult(
            is_correct=True,
            answer_type="formula",
            confidence=ratio,
            student_answer=student_answer,
            expected_answer=expected,
            evaluation_method="fuzzy_normalized",
            partial_credit=ratio,
        )

    return EvaluationResult(
        is_correct=False,
        answer_type="formula",
        confidence=0.7,
        student_answer=student_answer,
        expected_answer=expected,
        evaluation_method="formula_mismatch",
        partial_credit=max(0.0, ratio),
    )


def _eval_text(student_answer: str, expected: str) -> EvaluationResult:
    """Evaluate text answer — fuzzy match + keyword overlap."""
    student = student_answer.strip().lower()
    expected_lower = expected.strip().lower()

    if not student:
        return EvaluationResult(
            is_correct=False,
            answer_type="text",
            confidence=0.5,
            student_answer=student_answer,
            expected_answer=expected,
            evaluation_method="empty_answer",
        )

    # Exact match
    if student == expected_lower:
        return EvaluationResult(
            is_correct=True,
            answer_type="text",
            confidence=1.0,
            student_answer=student_answer,
            expected_answer=expected,
            evaluation_method="exact",
        )

    # Fuzzy ratio
    ratio = SequenceMatcher(None, student, expected_lower).ratio()

    # Keyword overlap — extract significant words from expected answer
    expected_words = set(re.findall(r"\w{3,}", expected_lower))
    student_words = set(re.findall(r"\w{3,}", student))

    if expected_words:
        overlap = len(expected_words & student_words) / len(expected_words)
    else:
        overlap = 0.0

    # Combined score: 60% fuzzy + 40% keyword overlap
    combined = 0.6 * ratio + 0.4 * overlap

    # Correct if combined score is high enough
    if combined >= 0.70:
        return EvaluationResult(
            is_correct=True,
            answer_type="text",
            confidence=combined,
            student_answer=student_answer,
            expected_answer=expected,
            evaluation_method="fuzzy_keyword",
            partial_credit=combined,
        )

    # Partial credit for moderate overlap
    if overlap >= 0.50 and ratio >= 0.40:
        return EvaluationResult(
            is_correct=False,
            answer_type="text",
            confidence=0.6,
            student_answer=student_answer,
            expected_answer=expected,
            evaluation_method="partial_keyword_overlap",
            partial_credit=combined,
            notes="Student has some correct keywords but answer is incomplete",
        )

    return EvaluationResult(
        is_correct=False,
        answer_type="text",
        confidence=0.7,
        student_answer=student_answer,
        expected_answer=expected,
        evaluation_method="text_mismatch",
        partial_credit=combined,
    )
