"""Answer evaluator v2 — uses Granite embeddings for semantic similarity.

Replaces the in-memory MiniLM similarity from dream_app's answer_evaluator.py
with Granite 97M multilingual embeddings via the centralized EmbeddingService.

Key improvements:
  - Multilingual: Hindi answers evaluated correctly
  - Centralized: Uses EmbeddingService singleton (no duplicate model loading)
  - Higher quality: Granite 97M outperforms MiniLM on semantic similarity
  - Same interface: evaluate_answer() signature preserved

The original answer_evaluator.py is NOT modified. This is a new file.

Usage:
    from backend.services.answer_evaluator_v2 import AnswerEvaluatorV2

    result = await AnswerEvaluatorV2.evaluate_answer(
        student_answer="Photosynthesis is the process by which plants make food",
        correct_answer="Photosynthesis is the process by which green plants use sunlight to synthesize foods",
        max_marks=3,
    )
"""

import asyncio
from typing import Optional
from dataclasses import dataclass, field


@dataclass
class EvaluationResult:
    """Result of evaluating a student's answer."""
    marks_awarded: int
    max_marks: int
    similarity_score: float  # 0.0 to 1.0
    feedback: str
    key_concepts_present: list = field(default_factory=list)
    key_concepts_missing: list = field(default_factory=list)
    method: str = "granite_similarity"


class AnswerEvaluatorV2:
    """Evaluates student answers using Granite embedding similarity.

    Uses cosine similarity between the student's answer and the correct answer,
    computed via Granite 97M multilingual embeddings. Supports bilingual
    answers (English + Hindi) and partial credit.
    """

    # Similarity thresholds for marking
    SIMILARITY_FULL = 0.85    # Full marks
    SIMILARITY_PARTIAL = 0.60 # Partial marks
    SIMILARITY_MINIMAL = 0.35 # Minimal marks
    SIMILARITY_FAIL = 0.20    # No marks

    @classmethod
    async def compute_similarity(
        cls,
        text_a: str,
        text_b: str,
    ) -> float:
        """Compute cosine similarity between two texts using Granite embeddings.

        Args:
            text_a: First text (e.g., student answer).
            text_b: Second text (e.g., correct answer).

        Returns:
            Cosine similarity score (0.0 to 1.0).
        """
        if not text_a.strip() or not text_b.strip():
            return 0.0

        from backend.services.embedding_service import EmbeddingService
        service = await EmbeddingService.get_instance()

        # Encode both texts
        emb_a = await service.encode(text_a[:500])  # Truncate for speed
        emb_b = await service.encode(text_b[:500])

        # Compute cosine similarity
        import math
        dot = sum(a * b for a, b in zip(emb_a, emb_b))
        norm_a = math.sqrt(sum(a * a for a in emb_a))
        norm_b = math.sqrt(sum(b * b for b in emb_b))

        if norm_a == 0 or norm_b == 0:
            return 0.0

        return max(0.0, min(1.0, dot / (norm_a * norm_b)))

    @classmethod
    async def evaluate_answer(
        cls,
        student_answer: str,
        correct_answer: str,
        max_marks: int = 3,
        key_concepts: Optional[list] = None,
    ) -> EvaluationResult:
        """Evaluate a student's answer against the correct answer.

        Args:
            student_answer: The student's submitted answer.
            correct_answer: The model/correct answer.
            max_marks: Maximum marks for this question.
            key_concepts: Optional list of key concepts that should be present.
                If provided, each concept is checked for presence in the student's answer.

        Returns:
            EvaluationResult with marks, similarity, and feedback.
        """
        # Compute semantic similarity
        similarity = await cls.compute_similarity(student_answer, correct_answer)

        # Check key concepts if provided
        concepts_present = []
        concepts_missing = []
        if key_concepts:
            student_lower = student_answer.lower()
            for concept in key_concepts:
                if concept.lower() in student_lower:
                    concepts_present.append(concept)
                else:
                    concepts_missing.append(concept)

        # Award marks based on similarity and key concepts
        if similarity >= cls.SIMILARITY_FULL:
            marks = max_marks
            feedback = "Excellent answer! Covers all key points."
        elif similarity >= cls.SIMILARITY_PARTIAL:
            marks = max(1, int(max_marks * 0.67))
            feedback = "Good answer, but missing some details."
        elif similarity >= cls.SIMILARITY_MINIMAL:
            marks = max(1, int(max_marks * 0.33))
            feedback = "Partial answer. Review the topic and try again."
        elif similarity >= cls.SIMILARITY_FAIL:
            marks = 1 if max_marks > 1 else 0
            feedback = "Minimal understanding shown. Please review the topic."
        else:
            marks = 0
            feedback = "Answer does not match expected content. Please review."

        # Adjust marks based on key concepts
        if key_concepts and len(key_concepts) > 0:
            concept_score = len(concepts_present) / len(key_concepts)
            concept_marks = int(max_marks * concept_score)
            # Take the higher of similarity-based and concept-based marks
            marks = max(marks, concept_marks)

            if concepts_missing:
                feedback += f" Missing concepts: {', '.join(concepts_missing[:3])}."

        return EvaluationResult(
            marks_awarded=marks,
            max_marks=max_marks,
            similarity_score=similarity,
            feedback=feedback,
            key_concepts_present=concepts_present,
            key_concepts_missing=concepts_missing,
            method="granite_similarity",
        )

    @classmethod
    async def evaluate_batch(
        cls,
        answers: list[dict],
    ) -> list[EvaluationResult]:
        """Evaluate multiple answers in batch.

        Args:
            answers: List of dicts with keys: student_answer, correct_answer,
                max_marks (optional), key_concepts (optional).

        Returns:
            List of EvaluationResult objects.
        """
        results = []
        for a in answers:
            result = await cls.evaluate_answer(
                student_answer=a.get("student_answer", ""),
                correct_answer=a.get("correct_answer", ""),
                max_marks=a.get("max_marks", 3),
                key_concepts=a.get("key_concepts"),
            )
            results.append(result)
        return results
