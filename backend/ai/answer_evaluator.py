"""Answer evaluation engine for the DREAM_APP tutor.

Evaluates student answers against model answers across question types:
  - MCQ: exact match against options
  - numerical: parse float, compare with tolerance, check units
  - free-text: keyword overlap + MiniLM semantic similarity + key concept presence
  - short-answer: extract embedded answer from question text, then compare

Returns a structured EvalResult with correctness, score, feedback, and
optional misconception_id for wrong answers.

This module is deterministic — it does NOT call an LLM. The MiniLM model
is used only for semantic similarity (embedding comparison), not generation.
"""

import asyncio
import re
import math
from dataclasses import dataclass, field
from typing import Optional

import numpy as np


# --------------------------------------------------------------------------- #
# Result types
# --------------------------------------------------------------------------- #

@dataclass
class EvalResult:
    """Result of evaluating a student answer against a model answer."""
    correct: bool
    score: float                  # 0.0 to 1.0
    question_type: str            # "mcq", "numerical", "free_text", "short_answer"
    feedback: str                 # human-readable feedback
    misconception_id: Optional[str] = None
    partial: bool = False         # True if partially correct (score 0.4-0.7)
    matched_answer: Optional[str] = None  # the model answer we compared against


# --------------------------------------------------------------------------- #
# Thresholds
# --------------------------------------------------------------------------- #

CORRECT_THRESHOLD = 0.60
PARTIAL_THRESHOLD = 0.35
NUMERICAL_TOLERANCE = 0.02       # 2% relative tolerance for numerical answers


# --------------------------------------------------------------------------- #
# MiniLM model (lazy-loaded singleton, shared with RoutingService)
# --------------------------------------------------------------------------- #

from backend.ai.model_hub import get_embedder as _hub_get_embedder


async def _get_model():
    # shared warm singleton (ai.model_hub) — the cold load runs in the
    # executor, never inline on the event loop (worker-seizure fix)
    return await _hub_get_embedder()


async def _semantic_similarity(text_a: str, text_b: str) -> float:
    """Compute cosine similarity between two texts using MiniLM embeddings."""
    model = await _get_model()
    loop = asyncio.get_event_loop()
    embeddings = await loop.run_in_executor(
        None,
        lambda: model.encode([text_a, text_b], convert_to_numpy=True, show_progress_bar=False)
    )
    a, b = embeddings[0], embeddings[1]
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    if norm_a < 1e-8 or norm_b < 1e-8:
        return 0.0
    return float(np.dot(a, b) / (norm_a * norm_b))


# --------------------------------------------------------------------------- #
# Text normalization
# --------------------------------------------------------------------------- #

# Common stop words — removed for keyword overlap scoring
_STOP_WORDS = frozenset({
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did", "will", "would", "could",
    "should", "may", "might", "must", "can", "shall", "to", "of", "in",
    "on", "at", "by", "for", "with", "about", "as", "into", "through",
    "during", "before", "after", "above", "below", "from", "up", "down",
    "out", "off", "over", "under", "again", "further", "then", "once",
    "here", "there", "when", "where", "why", "how", "all", "each",
    "few", "more", "most", "other", "some", "such", "no", "nor", "not",
    "only", "own", "same", "so", "than", "too", "very", "just", "also",
    "and", "but", "or", "if", "because", "until", "while", "this",
    "that", "these", "those", "i", "you", "he", "she", "it", "we",
    "they", "what", "which", "who", "whom", "whose", "its", "their",
    "his", "her", "our", "my", "your", "me", "him", "us", "them",
    "any", "both", "either", "neither", "per", "via", "like", "unlike",
})


def _normalize_text(text: str) -> str:
    """Lowercase, collapse whitespace, strip punctuation."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s\-./]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def _tokenize(text: str) -> set[str]:
    """Tokenize text into a set of meaningful words (stop words removed).

    Also splits hyphenated words so 'non-volatile' matches 'non volatile'.
    """
    normalized = _normalize_text(text)
    # Split on whitespace and also split hyphenated words
    raw_tokens = normalized.replace('-', ' ').split()
    return {t for t in raw_tokens if t not in _STOP_WORDS and len(t) > 1}


def _keyword_overlap(student: str, model: str) -> float:
    """Compute keyword overlap ratio (Jaccard-like)."""
    s_tokens = _tokenize(student)
    m_tokens = _tokenize(model)
    if not m_tokens:
        return 0.0
    if not s_tokens:
        return 0.0
    overlap = len(s_tokens & m_tokens)
    # Use recall (how many model keywords the student hit) weighted by precision
    recall = overlap / len(m_tokens)
    precision = overlap / len(s_tokens) if s_tokens else 0
    # F1-like score
    if recall + precision == 0:
        return 0.0
    return 2 * recall * precision / (recall + precision)


# --------------------------------------------------------------------------- #
# Key concept extraction (simple — looks for capitalized terms, formulas, numbers)
# --------------------------------------------------------------------------- #

# Formula: short LHS (1-4 chars like "L", "Q", "Rp", "F") = RHS expression
_FORMULA_RE = re.compile(r'\b([A-Za-z][A-Za-z0-9]?)\s*=\s*([A-Za-z0-9\s+\-*/().^]+?)(?=[.,;]|\n|$)')
_KEY_TERM_RE = re.compile(r'\b[A-Z][a-z]{2,}(?:\s+[A-Z][a-z]+)*\b')


def _extract_key_concepts(text: str) -> set[str]:
    """Extract key concepts from model answer: formulas, capitalized terms, units."""
    concepts = set()
    # Formulas (e.g., "L = Q/m", "F = ma") — capture as "lhs=rhs" normalized
    for m in _FORMULA_RE.finditer(text):
        lhs = m.group(1).strip().lower()
        rhs = m.group(2).strip().lower().replace(" ", "")
        concepts.add(f"{lhs}={rhs}")
    # Capitalized multi-word terms (e.g., "Specific Latent Heat", "Kinetic Energy")
    for m in _KEY_TERM_RE.finditer(text):
        term = m.group(0).strip().lower()
        if len(term) > 5:  # skip very short terms
            concepts.add(term)
    # SI units (e.g., "J kg^-1", "m/s^2", "ohm")
    for m in re.finditer(r'\b(\d+\s*)?(J\s*kg\S*|kg|m/s\S*|N|Pa|W|V|A|ohm|C|Hz|mol|J)\b', text, re.IGNORECASE):
        unit = re.sub(r'\s+', '', m.group(2).lower())
        concepts.add(unit)
    return concepts


def _concept_coverage(student: str, model: str) -> float:
    """What fraction of key concepts from the model answer appear in the student answer."""
    model_concepts = _extract_key_concepts(model)
    if not model_concepts:
        return 0.0
    student_lower = student.lower()
    student_nospace = student_lower.replace(" ", "")
    covered = 0
    for concept in model_concepts:
        if concept in student_lower or concept.replace(" ", "") in student_nospace:
            covered += 1
    return covered / len(model_concepts)


# --------------------------------------------------------------------------- #
# Numerical answer extraction
# --------------------------------------------------------------------------- #

_NUMBER_RE = re.compile(r'[-+]?\d+\.?\d*(?:[eE][-+]?\d+)?')
_UNIT_MAP = {
    "m": "meter", "meters": "meter", "metre": "meter", "metres": "meter",
    "cm": "centimeter", "centimeter": "centimeter", "centimeters": "centimeter",
    "km": "kilometer", "kilometer": "kilometer", "kilometers": "kilometer",
    "mm": "millimeter", "millimeter": "millimeter", "millimeters": "millimeter",
    "g": "gram", "grams": "gram", "gm": "gram",
    "kg": "kilogram", "kilogram": "kilogram", "kilograms": "kilogram",
    "mg": "milligram", "milligram": "milligram", "milligrams": "milligram",
    "s": "second", "seconds": "second", "sec": "second", "secs": "second",
    "min": "minute", "minutes": "minute", "minute": "minute",
    "h": "hour", "hr": "hour", "hours": "hour", "hour": "hour",
    "j": "joule", "joules": "joule", "joule": "joule",
    "n": "newton", "newtons": "newton", "newton": "newton",
    "pa": "pascal", "pascals": "pascal", "pascal": "pascal",
    "w": "watt", "watts": "watt", "watt": "watt",
    "v": "volt", "volts": "volt", "volt": "volt",
    "a": "ampere", "amperes": "ampere", "amp": "ampere", "amps": "ampere",
    "ohm": "ohm", "ohms": "ohm", "ω": "ohm",
    "c": "coulomb", "coulombs": "coulomb", "coulomb": "coulomb",
    "hz": "hertz", "hertz": "hertz",
    "mol": "mole", "moles": "mole", "mole": "mole",
    "l": "liter", "liters": "liter", "litre": "liter", "litres": "liter",
    "k": "kelvin", "kelvin": "kelvin", "kelvins": "kelvin",
    "°c": "celsius", "celsius": "celsius", "deg c": "celsius", "degc": "celsius",
    "°f": "fahrenheit", "fahrenheit": "fahrenheit",
    "m/s": "m/s", "m/s^2": "m/s^2", "ms-1": "m/s", "ms-2": "m/s^2",
    "km/h": "km/h", "kmh": "km/h", "km/hr": "km/h",
    "j/kg": "j/kg", "jkg-1": "j/kg",
    "j/kg/k": "j/kg/k", "jkg-1k-1": "j/kg/k",
}


def _extract_numbers(text: str) -> list[tuple[float, str]]:
    """Extract (value, unit) pairs from text."""
    results = []
    for match in _NUMBER_RE.finditer(text):
        try:
            value = float(match.group(0))
        except ValueError:
            continue
        # Look for unit after the number
        rest = text[match.end():].strip()
        unit = ""
        for u in sorted(_UNIT_MAP.keys(), key=len, reverse=True):
            if rest.lower().startswith(u) or rest.lower().replace(" ", "").startswith(u.replace(" ", "")):
                unit = _UNIT_MAP[u]
                break
        results.append((value, unit))
    return results


def _compare_numerical(student: str, model: str) -> tuple[float, bool, str]:
    """Compare numerical answers. Returns (score, correct, feedback)."""
    student_nums = _extract_numbers(student)
    model_nums = _extract_numbers(model)

    if not model_nums:
        return 0.0, False, "No numerical answer found in model answer."

    if not student_nums:
        return 0.0, False, "No number found in your answer. Please provide a numerical value."

    # Compare the first number (the main answer)
    s_val, s_unit = student_nums[0]
    m_val, m_unit = model_nums[0]

    # Check value with relative tolerance
    if m_val == 0:
        value_match = abs(s_val - m_val) < 0.001
    else:
        rel_error = abs(s_val - m_val) / abs(m_val)
        value_match = rel_error <= NUMERICAL_TOLERANCE

    # Check unit
    unit_match = True
    if m_unit and s_unit:
        unit_match = m_unit == s_unit
    elif m_unit and not s_unit:
        unit_match = False  # model has unit, student doesn't

    if value_match and unit_match:
        return 1.0, True, "Correct! The value and units are right."
    elif value_match and not unit_match:
        return 0.7, False, f"The value is correct but the unit is wrong. Expected {m_unit}, you wrote {s_unit or 'no unit'}."
    elif not value_match and unit_match:
        return 0.3, False, f"The unit is correct but the value is wrong. Expected {m_val}, you wrote {s_val}."
    else:
        return 0.0, False, f"Not quite. Expected {m_val} {m_unit}, you wrote {s_val} {s_unit}. Check your calculation."


# --------------------------------------------------------------------------- #
# MCQ answer matching
# --------------------------------------------------------------------------- #

def _compare_mcq(student: str, options: list, correct_answer: str) -> tuple[float, bool, str]:
    """Compare MCQ answer. Student can type the option letter or the answer text."""
    student_norm = _normalize_text(student)

    # Try matching by letter (A, B, C, D)
    letter_match = re.match(r'^([a-d])\b', student_norm)
    if letter_match:
        idx = ord(letter_match.group(1)) - ord('a')
        if 0 <= idx < len(options):
            selected = options[idx]
            correct_norm = _normalize_text(correct_answer)
            selected_norm = _normalize_text(selected) if isinstance(selected, str) else _normalize_text(str(selected))
            if selected_norm == correct_norm or correct_norm in selected_norm:
                return 1.0, True, "Correct!"
            else:
                return 0.0, False, f"Incorrect. The correct answer is: {correct_answer}"
        else:
            return 0.0, False, "Invalid option selected."

    # Try matching by text
    correct_norm = _normalize_text(correct_answer)
    if correct_norm in student_norm or student_norm in correct_norm:
        return 1.0, True, "Correct!"
    # Check if student text matches any option
    for i, opt in enumerate(options):
        opt_norm = _normalize_text(opt) if isinstance(opt, str) else _normalize_text(str(opt))
        if opt_norm == student_norm:
            if opt_norm == correct_norm:
                return 1.0, True, "Correct!"
            else:
                return 0.0, False, f"Incorrect. The correct answer is: {correct_answer}"
    # Fuzzy match against correct answer
    overlap = _keyword_overlap(student, correct_answer)
    if overlap > 0.6:
        return 1.0, True, "Correct!"
    return 0.0, False, f"Incorrect. The correct answer is: {correct_answer}"


# --------------------------------------------------------------------------- #
# Short-answer extraction (for CFQ diagnostics where answer is in question text)
# --------------------------------------------------------------------------- #

_SHORT_ANSWER_RE = re.compile(r'\nA:\s*(.+?)(?=\nQ\d+|\n---|\Z)', re.DOTALL)
_SHORT_ANSWER_RE2 = re.compile(r'^A:\s*(.+?)(?=\nQ\d+|\n---|\Z)', re.DOTALL)


def _extract_embedded_answer(question_text: str) -> Optional[str]:
    """Extract answer from question text that has 'A: ...' embedded."""
    # Try multiline first
    m = _SHORT_ANSWER_RE.search(question_text)
    if m:
        return m.group(1).strip()
    m = _SHORT_ANSWER_RE2.search(question_text)
    if m:
        return m.group(1).strip()
    # Try "Answer: ..." pattern
    m = re.search(r'Answer:\s*(.+?)(?=\nQ\d+|\n---|\Z)', question_text, re.DOTALL)
    if m:
        return m.group(1).strip()
    return None


# --------------------------------------------------------------------------- #
# Free-text evaluation (the main evaluator for conceptual questions)
# --------------------------------------------------------------------------- #

async def _evaluate_free_text(student: str, model: str) -> tuple[float, str]:
    """Evaluate free-text answer using keyword overlap + concept coverage + semantic similarity."""
    # Component 1: Keyword overlap (fast, no model needed)
    kw_score = _keyword_overlap(student, model)

    # Component 2: Key concept coverage
    concept_score = _concept_coverage(student, model)

    # Component 3: Semantic similarity (MiniLM)
    sem_score = await _semantic_similarity(student, model)

    # Weighted combination — adapt weights based on answer length
    # For short model answers (< 100 chars), semantic similarity is the strongest signal
    # because the student will naturally paraphrase. For longer answers, keyword overlap
    # and concept coverage matter more because there are specific terms to hit.
    if len(model) < 100:
        combined = 0.65 * sem_score + 0.20 * kw_score + 0.15 * concept_score
    else:
        combined = 0.50 * sem_score + 0.30 * kw_score + 0.20 * concept_score

    # Generate feedback
    if combined >= CORRECT_THRESHOLD:
        feedback = "Correct! You've captured the key concepts well."
    elif combined >= PARTIAL_THRESHOLD:
        missing = _tokenize(model) - _tokenize(student)
        key_missing = [t for t in missing if len(t) > 4][:5]
        if key_missing:
            feedback = f"Partially correct. You're missing some key points: {', '.join(key_missing)}. Try to include these in your answer."
        else:
            feedback = "Partially correct. You have some of the right ideas but the answer needs more detail."
    else:
        feedback = "Not quite right. Review the concept and try again. Type 'stuck' for help."

    return combined, feedback


# --------------------------------------------------------------------------- #
# Main evaluation function
# --------------------------------------------------------------------------- #

async def evaluate_answer(
    student_answer: str,
    model_answer: str,
    question_type: str = "free_text",
    options: Optional[list] = None,
    correct_answer: Optional[str] = None,
    question_text: str = "",
    node_id: str = "",
    cognitive_type: str = "",
) -> EvalResult:
    """Evaluate a student's answer against the model answer.

    Args:
        student_answer: The student's typed answer.
        model_answer: The model/expected answer text.
        question_type: "mcq", "numerical", "free_text", or "short_answer".
        options: For MCQ, the list of option strings.
        correct_answer: For MCQ, the correct answer text.
        question_text: For short_answer, the question text (answer may be embedded).
        node_id: The curriculum node this question belongs to (for misconception lookup).

    Returns:
        EvalResult with correctness, score, and feedback.
    """
    if not student_answer or not student_answer.strip():
        return EvalResult(
            correct=False, score=0.0, question_type=question_type,
            feedback="No answer provided. Please type your answer.",
        )

    # --- MCQ ---
    if question_type == "mcq" and options:
        correct = correct_answer or model_answer
        score, is_correct, feedback = _compare_mcq(student_answer, options, correct)
        return EvalResult(
            correct=is_correct, score=score, question_type="mcq",
            feedback=feedback, matched_answer=correct,
        )

    # --- Numerical ---
    # Detect if this is a numerical question by checking if the model answer starts with a number
    # or the question asks to "calculate", "find", "compute"
    # BUT: don't classify recall/definition/evaluate questions as numerical
    # even if the model answer contains numbers in formulas (e.g., "D = b^2 - 4ac")
    ct_lower = (cognitive_type or "").lower()
    _is_conceptual = ct_lower in ("recall", "evaluate", "create", "reasoning", "free_text")
    is_numerical = (
        question_type == "numerical"
        or (
            not _is_conceptual
            and model_answer
            and _NUMBER_RE.search(model_answer[:50])
            # Only if the answer is primarily numeric, not a formula with text
            and sum(1 for c in model_answer if c.isalpha() or c == ' ') < len(model_answer) * 0.5
        )
        or any(kw in (question_text or "").lower() for kw in ["calculate", "find the value", "compute", "determine the value", "solve for"])
    )

    if is_numerical and model_answer:
        score, is_correct, feedback = _compare_numerical(student_answer, model_answer)
        if is_correct or score > 0:
            return EvalResult(
                correct=is_correct, score=score, question_type="numerical",
                feedback=feedback, matched_answer=model_answer,
                partial=(PARTIAL_THRESHOLD <= score < CORRECT_THRESHOLD),
            )
        # If numerical comparison failed completely, fall through to free-text
        # (the student might have written an explanation, not just a number)

    # --- Deterministic Cross-Subject & Symbolic Math Lane (Zero-LLM Verification) ---
    try:
        from backend.ai.hybrid_evaluator import (
            _evaluate_cross_subject_deterministic,
            _evaluate_symbolic_algebraic,
        )
        cross_res = _evaluate_cross_subject_deterministic(student_answer, model_answer or "", question_text)
        if cross_res is not None:
            return EvalResult(
                correct=cross_res.correct, score=cross_res.score,
                question_type=cross_res.question_type, feedback=cross_res.feedback,
                matched_answer=cross_res.matched_answer, partial=cross_res.partial,
            )
        sym_res = _evaluate_symbolic_algebraic(student_answer, model_answer or "")
        if sym_res is not None:
            return EvalResult(
                correct=sym_res.correct, score=sym_res.score,
                question_type=sym_res.question_type, feedback=sym_res.feedback,
                matched_answer=sym_res.matched_answer, partial=sym_res.partial,
            )
    except Exception:
        pass

    # --- Short answer (answer embedded in question text) ---
    if question_type == "short_answer" and not model_answer and question_text:
        embedded = _extract_embedded_answer(question_text)
        if embedded:
            model_answer = embedded

    # --- Free text (the default for conceptual questions) ---
    if model_answer:
        score, feedback = await _evaluate_free_text(student_answer, model_answer)
        is_correct = score >= CORRECT_THRESHOLD
        is_partial = PARTIAL_THRESHOLD <= score < CORRECT_THRESHOLD
        return EvalResult(
            correct=is_correct, score=score, question_type="free_text",
            feedback=feedback, matched_answer=model_answer, partial=is_partial,
        )

    # --- No model answer available ---
    return EvalResult(
        correct=False, score=0.0, question_type=question_type,
        feedback="No model answer available for this question. Type 'show answer' to see the expected answer.",
    )


# --------------------------------------------------------------------------- #
# Batch evaluation (for diagnostic question sets)
# --------------------------------------------------------------------------- #

async def evaluate_diagnostic_set(
    student_answers: dict[int, str],
    diagnostic_questions: list[dict],
) -> dict:
    """Evaluate a full set of diagnostic questions (5 per node).

    Args:
        student_answers: {question_number: student_answer}
        diagnostic_questions: [{number, cognitive_type, question, answer}, ...]

    Returns:
        {
            "results": {q_num: EvalResult},
            "bloom_scores": {cognitive_type: {correct: int, total: int, score: float}},
            "overall_score": float,
            "all_correct": bool,
            "failed_questions": [int],
        }
    """
    results = {}
    bloom_scores = {}

    for q in diagnostic_questions:
        q_num = q.get("number", 0)
        q_type = q.get("cognitive_type", "unknown")
        model_ans = q.get("answer", "")
        q_text = q.get("question", "")

        student_ans = student_answers.get(q_num, "")
        if not student_ans:
            results[q_num] = EvalResult(
                correct=False, score=0.0, question_type="free_text",
                feedback="No answer provided.",
            )
        else:
            results[q_num] = await evaluate_answer(
                student_answer=student_ans,
                model_answer=model_ans,
                question_type="free_text",
                question_text=q_text,
                cognitive_type=q_type,
            )

        # Track Bloom-level scores
        if q_type not in bloom_scores:
            bloom_scores[q_type] = {"correct": 0, "total": 0, "scores": []}
        bloom_scores[q_type]["total"] += 1
        bloom_scores[q_type]["scores"].append(results[q_num].score)
        if results[q_num].correct:
            bloom_scores[q_type]["correct"] += 1

    # Aggregate Bloom scores
    for q_type, data in bloom_scores.items():
        data["score"] = sum(data["scores"]) / len(data["scores"]) if data["scores"] else 0.0
        del data["scores"]

    # Overall
    all_scores = [r.score for r in results.values()]
    overall = sum(all_scores) / len(all_scores) if all_scores else 0.0
    all_correct = all(r.correct for r in results.values())
    failed = [q_num for q_num, r in results.items() if not r.correct]

    return {
        "results": results,
        "bloom_scores": bloom_scores,
        "overall_score": overall,
        "all_correct": all_correct,
        "failed_questions": failed,
    }
