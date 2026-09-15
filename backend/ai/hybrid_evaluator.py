"""Hybrid answer evaluator using MiniLM + spaCy + DeepSeek.

Strategy:
  1. MiniLM semantic similarity — fast first pass (no API call)
  2. If MiniLM is clearly correct (>0.75) or clearly wrong (<0.20), use that
  3. If MiniLM is uncertain (0.20-0.75), call DeepSeek for nuanced evaluation
  4. DeepSeek judges reasoning, not just keywords — fixes the "correct physics,
     wrong keywords" problem
  5. spaCy extracts key phrases for fallback feedback generation
  6. If DeepSeek is unavailable, fall back to MiniLM + keyword overlap

The DeepSeek call is ONLY made for uncertain answers, so most evaluations
are still fast and free. Only ~30% of answers need the LLM.
"""
from __future__ import annotations

import asyncio
import json
import logging
import re
from dataclasses import dataclass
from typing import Optional

import httpx
import numpy as np

from backend.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


# --------------------------------------------------------------------------- #
# Result type (re-exported from answer_evaluator for compatibility)
# --------------------------------------------------------------------------- #

@dataclass
class EvalResult:
    """Result of evaluating a student answer against a model answer."""
    correct: bool
    score: float
    question_type: str
    feedback: str
    misconception_id: Optional[str] = None
    partial: bool = False
    matched_answer: Optional[str] = None


# --------------------------------------------------------------------------- #
# Thresholds
# --------------------------------------------------------------------------- #

CORRECT_THRESHOLD = 0.60
PARTIAL_THRESHOLD = 0.35
# If MiniLM says clearly correct or clearly wrong, skip the LLM
LLM_SKIP_HIGH = 0.75
LLM_SKIP_LOW = 0.20


# --------------------------------------------------------------------------- #
# MiniLM model (lazy-loaded singleton)
# --------------------------------------------------------------------------- #

_model = None
_model_lock = asyncio.Lock()

async def _get_model():
    global _model
    if _model is None:
        async with _model_lock:
            if _model is None:
                from sentence_transformers import SentenceTransformer
                _model = SentenceTransformer('all-MiniLM-L6-v2')
    return _model


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
# spaCy key phrase extraction
# --------------------------------------------------------------------------- #

_nlp = None

def _get_nlp():
    global _nlp
    if _nlp is None:
        import spacy
        _nlp = spacy.load("en_core_web_sm")
    return _nlp


def _extract_key_phrases(text: str) -> list[str]:
    """Extract noun chunks and key phrases from text using spaCy."""
    nlp = _get_nlp()
    doc = nlp(text[:1000])  # limit to first 1000 chars for speed
    phrases = []
    for chunk in doc.noun_chunks:
        phrase = chunk.text.lower().strip()
        # Filter out very short or generic phrases
        if len(phrase) > 3 and phrase not in {"this", "that", "the", "a", "an"}:
            phrases.append(phrase)
    # Also extract entities (formulas, measurements, etc.)
    for ent in doc.ents:
        phrase = ent.text.lower().strip()
        if len(phrase) > 2:
            phrases.append(phrase)
    return list(dict.fromkeys(phrases))[:10]  # dedupe, limit


# --------------------------------------------------------------------------- #
# DeepSeek LLM evaluator
# --------------------------------------------------------------------------- #

async def _deepseek_evaluate(
    student_answer: str,
    model_answer: str,
    question_text: str,
) -> Optional[dict]:
    """Use DeepSeek to evaluate a student answer.

    Returns a dict with score, correct, what_right, what_missing,
    misconception, feedback. Returns None if the API is unavailable.
    """
    # The Settings object changed shape over time; read the key from env
    # vars first with a safe getattr fallback instead of a hard
    # AttributeError ('Settings' has no attribute 'DEEPSEEK_API_KEY')
    # which surfaced as a 500 on the evaluation path.
    import os

    api_key = (
        os.getenv("DEEPSEEK_API_KEY")
        or getattr(settings, "DEEPSEEK_API_KEY", None)
        or getattr(settings, "deepseek_api_key", None)
    )
    base_url = (
        os.getenv("DEEPSEEK_BASE_URL")
        or getattr(settings, "DEEPSEEK_BASE_URL", None)
        or getattr(settings, "deepseek_base_url", None)
        or "https://api.deepseek.com"
    )
    if not api_key or "your_" in api_key:
        return None

    # Truncate to keep the prompt manageable
    student = student_answer[:500]
    model = model_answer[:1000]
    question = question_text[:300]

    prompt = f"""You are evaluating a Class 12 student's answer to a question. Be fair but rigorous.

Question: "{question}"

Model answer: {model}

Student answer: {student}

Evaluate the student's answer. Consider:
- Did the student understand the core concept?
- Is the reasoning correct even if the wording is different?
- What specific points are correct?
- What key points are missing?
- Is there a specific misconception?

Return ONLY valid JSON (no markdown, no explanation):
{{"score": 0.0-1.0, "correct": true/false, "what_right": "what the student got correct in one sentence", "what_missing": "what key point is missing in one sentence", "misconception": "the specific misconception if any, or empty string", "feedback": "one sentence feedback for the student"}}"""

    try:
        async with httpx.AsyncClient(timeout=20) as c:
            r = await c.post(
                f"{base_url}/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": "deepseek-chat",
                    "messages": [
                        {"role": "system", "content": "You are a JSON-only responder. Return valid JSON, nothing else."},
                        {"role": "user", "content": prompt},
                    ],
                    "temperature": 0.0,
                    "max_tokens": 300,
                },
            )
            if r.status_code != 200:
                logger.warning(f"DeepSeek API error: {r.status_code}")
                return None

            content = r.json()["choices"][0]["message"]["content"]
            # Strip any markdown code fences
            content = content.strip().strip("`").strip()
            if content.startswith("json"):
                content = content[4:].strip()

            result = json.loads(content)
            return result

    except json.JSONDecodeError as e:
        logger.warning(f"DeepSeek returned invalid JSON: {e}")
        return None
    except Exception as e:
        logger.warning(f"DeepSeek evaluation failed: {e}")
        return None


# --------------------------------------------------------------------------- #
# Keyword overlap (fallback when LLM is unavailable)
# --------------------------------------------------------------------------- #

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
})


def _keyword_overlap(student: str, model: str) -> float:
    """Compute keyword overlap ratio. Splits hyphenated words for matching."""
    s_tokens = {t for t in student.lower().replace('-', ' ').split() if t not in _STOP_WORDS and len(t) > 1}
    m_tokens = {t for t in model.lower().replace('-', ' ').split() if t not in _STOP_WORDS and len(t) > 1}
    if not m_tokens or not s_tokens:
        return 0.0
    overlap = len(s_tokens & m_tokens)
    recall = overlap / len(m_tokens)
    precision = overlap / len(s_tokens) if s_tokens else 0
    if recall + precision == 0:
        return 0.0
    return 2 * recall * precision / (recall + precision)


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
    """Evaluate a student's answer using the hybrid evaluator.

    Flow:
    1. MiniLM semantic similarity (fast, free)
    2. If clearly correct (>0.75) or clearly wrong (<0.20), return immediately
    3. If uncertain (0.20-0.75), call DeepSeek for nuanced evaluation
    4. If DeepSeek fails, fall back to MiniLM + keyword overlap
    """
    if not student_answer or not student_answer.strip():
        return EvalResult(
            correct=False, score=0.0, question_type=question_type,
            feedback="No answer provided. Please type your answer.",
        )

    # MCQ: exact match (no LLM needed)
    if question_type == "mcq" and options:
        return _evaluate_mcq(student_answer, options, correct_answer or model_answer)

    # Numerical: parse and compare (no LLM needed)
    if question_type == "numerical" or _is_numerical(question_text, model_answer, cognitive_type):
        result = _evaluate_numerical(student_answer, model_answer)
        if result is not None:
            return result

    # Free-text: hybrid evaluation
    if not model_answer:
        return EvalResult(
            correct=False, score=0.0, question_type=question_type,
            feedback="No model answer available for this question.",
        )

    # Step 1: MiniLM semantic similarity
    sem_score = await _semantic_similarity(student_answer, model_answer)
    kw_score = _keyword_overlap(student_answer, model_answer)

    # Combined fast score
    fast_score = 0.7 * sem_score + 0.3 * kw_score

    # Step 2: If clearly correct or clearly wrong, skip the LLM
    if fast_score >= LLM_SKIP_HIGH:
        return EvalResult(
            correct=True, score=fast_score, question_type="free_text",
            feedback="Correct! You've captured the key concepts well.",
            matched_answer=model_answer,
        )

    if fast_score < LLM_SKIP_LOW:
        return EvalResult(
            correct=False, score=fast_score, question_type="free_text",
            feedback="Not quite right. Review the concept and try again.",
            matched_answer=model_answer, partial=False,
        )

    # Step 3: Uncertain — call DeepSeek for nuanced evaluation
    llm_result = await _deepseek_evaluate(student_answer, model_answer, question_text)

    if llm_result and "score" in llm_result:
        score = float(llm_result["score"])
        is_correct = llm_result.get("correct", score >= CORRECT_THRESHOLD)
        is_partial = PARTIAL_THRESHOLD <= score < CORRECT_THRESHOLD

        # Build structured feedback from LLM response
        feedback_parts = []
        if llm_result.get("what_right"):
            feedback_parts.append(f"**What you got right:** {llm_result['what_right']}")
        if llm_result.get("what_missing"):
            feedback_parts.append(f"**What's missing:** {llm_result['what_missing']}")
        if llm_result.get("misconception"):
            feedback_parts.append(f"**Misconception:** {llm_result['misconception']}")
        if llm_result.get("feedback"):
            feedback_parts.append(llm_result["feedback"])

        feedback = "\n\n".join(feedback_parts) if feedback_parts else "See feedback above."

        return EvalResult(
            correct=is_correct, score=score, question_type="free_text",
            feedback=feedback, matched_answer=model_answer, partial=is_partial,
        )

    # Step 4: DeepSeek failed — fall back to MiniLM + keyword overlap
    combined = fast_score
    is_correct = combined >= CORRECT_THRESHOLD
    is_partial = PARTIAL_THRESHOLD <= combined < CORRECT_THRESHOLD

    if is_correct:
        feedback = "Correct! You've captured the key concepts well."
    elif is_partial:
        # Use spaCy to find what's missing
        student_phrases = set(_extract_key_phrases(student_answer))
        model_phrases = set(_extract_key_phrases(model_answer))
        missing = [p for p in model_phrases if p not in student_phrases][:3]
        if missing:
            feedback = f"Partially correct. Think about: {', '.join(missing)}. Try to include these in your answer."
        else:
            feedback = "Partially correct. You have some of the right ideas but the answer needs more detail."
    else:
        feedback = "Not quite right. Review the concept and try again. Type 'hint' for a clue."

    return EvalResult(
        correct=is_correct, score=combined, question_type="free_text",
        feedback=feedback, matched_answer=model_answer, partial=is_partial,
    )


# --------------------------------------------------------------------------- #
# MCQ evaluation
# --------------------------------------------------------------------------- #

def _evaluate_mcq(student: str, options: list, correct: str) -> EvalResult:
    """Evaluate MCQ answer by exact match."""
    student_norm = student.lower().strip()
    correct_norm = (correct or "").lower().strip()
    if student_norm == correct_norm or correct_norm in student_norm:
        return EvalResult(correct=True, score=1.0, question_type="mcq",
                          feedback="Correct!", matched_answer=correct)
    for opt in options:
        if isinstance(opt, str) and opt.lower().strip() == student_norm:
            if opt.lower().strip() == correct_norm:
                return EvalResult(correct=True, score=1.0, question_type="mcq",
                                  feedback="Correct!", matched_answer=correct)
            else:
                return EvalResult(correct=False, score=0.0, question_type="mcq",
                                  feedback=f"Incorrect. The correct answer is: {correct}")
    return EvalResult(correct=False, score=0.0, question_type="mcq",
                      feedback=f"Incorrect. The correct answer is: {correct}")


# --------------------------------------------------------------------------- #
# Numerical evaluation
# --------------------------------------------------------------------------- #

_NUMBER_RE = re.compile(r'[-+]?\d+\.?\d*(?:[eE][-+]?\d+)?')

def _is_numerical(question_text: str, model_answer: str, cognitive_type: str = "") -> bool:
    """Check if this is a numerical question.

    A question is numerical only if:
    - The question text asks to calculate/find/compute a value, OR
    - The model answer is primarily a number (not a formula with numbers in it)

    Definition/recall questions whose model answers contain formulas with numbers
    (e.g., "D = b^2 - 4ac") are NOT numerical questions.
    """
    if not model_answer:
        return False
    # Recall/definition/evaluate questions are never numerical
    ct_lower = (cognitive_type or "").lower()
    if ct_lower in ("recall", "evaluate", "create", "reasoning", "free_text"):
        return False
    q_lower = (question_text or "").lower()
    # Only classify as numerical if the question explicitly asks for a calculation
    calc_keywords = ["calculate", "find the value", "compute", "determine the value",
                     "find the numerical", "evaluate the numerical", "solve for"]
    if any(kw in q_lower for kw in calc_keywords):
        return True
    # Check if model answer is PRIMARILY a number (not a formula)
    # Strip mathematical expressions before checking
    stripped = re.sub(r'[a-zA-Z_]\^?\d*', '', model_answer)  # remove variables like b^2
    stripped = re.sub(r'[a-zA-Z]+\s*=', '', stripped)  # remove "x ="
    nums_in_stripped = _NUMBER_RE.findall(stripped[:100])
    # If there are numbers but the answer has significant text, it's likely a definition
    text_chars = sum(1 for c in model_answer if c.isalpha() or c == ' ')
    if text_chars > len(model_answer) * 0.5:
        return False  # More text than numbers — likely a definition/explanation
    return bool(nums_in_stripped)


def _evaluate_numerical(student: str, model: str) -> Optional[EvalResult]:
    """Evaluate numerical answer by comparing numbers."""
    student_nums = _NUMBER_RE.findall(student)
    model_nums = _NUMBER_RE.findall(model)
    if not model_nums:
        return None
    if not student_nums:
        return None

    # Compare the first number in the student's answer to the first in the model
    try:
        s_val = float(student_nums[0])
        m_val = float(model_nums[0])
        if abs(m_val) > 1e-10:
            rel_err = abs(s_val - m_val) / abs(m_val)
        else:
            rel_err = abs(s_val - m_val)
        if rel_err < 0.02:
            return EvalResult(correct=True, score=1.0, question_type="numerical",
                              feedback="Correct! The value is right.", matched_answer=model)
        elif rel_err < 0.1:
            return EvalResult(correct=True, score=0.7, question_type="numerical",
                              feedback=f"Close! Expected {m_val}, got {s_val}. Check your calculation.",
                              matched_answer=model, partial=True)
        else:
            return EvalResult(correct=False, score=0.0, question_type="numerical",
                              feedback=f"Incorrect. Expected {m_val}, got {s_val}.",
                              matched_answer=model)
    except (ValueError, IndexError):
        return None
