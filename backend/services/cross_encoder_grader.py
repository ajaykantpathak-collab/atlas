"""Cross-encoder grader — Tier 2 answer evaluation.

Uses cross-encoder models for semantic textual similarity (STS) and
natural language inference (NLI) to grade conceptual free-text answers.

Models (loaded lazily):
  - cross-encoder/stsb-deberta-v3-large: English STS (0-1 similarity score)
  - cross-encoder/nli-deberta-v3-base: NLI (entailment/contradiction/neutral)
  - BAAI/bge-reranker-v2-m3: Multilingual (for Hindi answers)

Grading logic:
  1. Compute STS similarity score (0-1)
  2. Compute NLI classification (entailment/contradiction/neutral)
  3. Combine:
     - entailment + STS > 0.7 → correct
     - contradiction → incorrect (with reason)
     - neutral or STS 0.4-0.7 → escalate to Tier 3 (LLM rubric)

Usage:
    from backend.services.cross_encoder_grader import CrossEncoderGrader

    grader = CrossEncoderGrader()
    result = await grader.grade(
        student_answer="Photosynthesis is how plants make food from sunlight",
        model_answer="Photosynthesis is the process by which green plants use sunlight to synthesize foods",
    )
    # result = {
    #     "score": 0.82,
    #     "nli_label": "entailment",
    #     "verdict": "correct",
    #     "confidence": 0.85,
    #     "escalate": False,
    # }
"""

import asyncio
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class CrossEncoderResult:
    """Result of cross-encoder grading."""
    score: float                    # STS similarity score (0-1)
    nli_label: str                  # entailment, contradiction, neutral
    verdict: str                    # correct, incorrect, borderline
    confidence: float               # Confidence in the verdict (0-1)
    escalate: bool = False          # If True, escalate to Tier 3
    model: str = ""                 # Which model was used
    error: Optional[str] = None


class CrossEncoderGrader:
    """Tier 2 cross-encoder grader using STS + NLI models.

    Models are loaded lazily on first use. The grader supports both
    English and Hindi (multilingual) answers.
    """

    _sts_model = None       # STS cross-encoder
    _nli_model = None       # NLI cross-encoder
    _multi_model = None     # Multilingual cross-encoder (for Hindi)
    _lock = asyncio.Lock()

    # Thresholds
    STS_CORRECT = 0.70      # STS score above this → likely correct
    STS_INCORRECT = 0.30    # STS score below this → likely incorrect
    STS_BORDERLINE = 0.50   # STS score around this → borderline

    # NLI labels
    NLI_ENTAILMENT = "entailment"
    NLI_CONTRADICTION = "contradiction"
    NLI_NEUTRAL = "neutral"

    @classmethod
    async def _get_sts_model(cls):
        """Lazy-load the STS cross-encoder model."""
        if cls._sts_model is None:
            async with cls._lock:
                if cls._sts_model is None:
                    loop = asyncio.get_event_loop()

                    def _load():
                        from sentence_transformers import CrossEncoder
                        # STS model: scores 0-1 for semantic similarity
                        return CrossEncoder("cross-encoder/stsb-deberta-v3-large")

                    cls._sts_model = await loop.run_in_executor(None, _load)
        return cls._sts_model

    @classmethod
    async def _get_nli_model(cls):
        """Lazy-load the NLI cross-encoder model."""
        if cls._nli_model is None:
            async with cls._lock:
                if cls._nli_model is None:
                    loop = asyncio.get_event_loop()

                    def _load():
                        from sentence_transformers import CrossEncoder
                        # NLI model: classifies entailment/contradiction/neutral
                        # Labels: 0=entailment, 1=neutral, 2=contradiction
                        return CrossEncoder("cross-encoder/nli-deberta-v3-base")

                    cls._nli_model = await loop.run_in_executor(None, _load)
        return cls._nli_model

    @classmethod
    async def _get_multi_model(cls):
        """Lazy-load the multilingual cross-encoder (for Hindi)."""
        if cls._multi_model is None:
            async with cls._lock:
                if cls._multi_model is None:
                    loop = asyncio.get_event_loop()

                    def _load():
                        from sentence_transformers import CrossEncoder
                        # Multilingual model: supports Hindi and other languages
                        return CrossEncoder("BAAI/bge-reranker-v2-m3")

                    cls._multi_model = await loop.run_in_executor(None, _load)
        return cls._multi_model

    @staticmethod
    def _is_hindi(text: str) -> bool:
        """Check if text contains Hindi (Devanagari) characters."""
        return any(0x0900 <= ord(c) <= 0x097F for c in text)

    @classmethod
    async def grade(
        cls,
        student_answer: str,
        model_answer: str,
        max_marks: int = 3,
    ) -> CrossEncoderResult:
        """Grade a student answer using cross-encoder STS + NLI.

        Args:
            student_answer: The student's free-text answer.
            model_answer: The correct/model answer.
            max_marks: Maximum marks for the question.

        Returns:
            CrossEncoderResult with score, NLI label, and verdict.
        """
        if not student_answer.strip() or not model_answer.strip():
            return CrossEncoderResult(
                score=0.0, nli_label="neutral", verdict="incorrect",
                confidence=1.0, escalate=False, error="Empty answer",
            )

        is_hindi = cls._is_hindi(student_answer) or cls._is_hindi(model_answer)

        try:
            # Compute STS score
            sts_score = await cls._compute_sts(student_answer, model_answer, is_hindi)

            # Compute NLI label
            nli_label = await cls._compute_nli(student_answer, model_answer, is_hindi)

            # Combine STS and NLI for verdict
            if nli_label == cls.NLI_CONTRADICTION:
                verdict = "incorrect"
                confidence = 0.85
                escalate = False
            elif nli_label == cls.NLI_ENTAILMENT and sts_score >= cls.STS_CORRECT:
                verdict = "correct"
                confidence = 0.90
                escalate = False
            elif sts_score < cls.STS_INCORRECT:
                verdict = "incorrect"
                confidence = 0.80
                escalate = False
            elif cls.STS_BORDERLINE <= sts_score < cls.STS_CORRECT:
                # Borderline — escalate to Tier 3
                verdict = "borderline"
                confidence = 0.60
                escalate = True
            elif nli_label == cls.NLI_NEUTRAL and sts_score >= cls.STS_CORRECT:
                # STS says similar but NLI says neutral — likely partially correct
                verdict = "borderline"
                confidence = 0.65
                escalate = True
            else:
                # Default: use STS score
                if sts_score >= cls.STS_CORRECT:
                    verdict = "correct"
                    confidence = 0.80
                elif sts_score >= cls.STS_BORDERLINE:
                    verdict = "borderline"
                    confidence = 0.60
                    escalate = True
                else:
                    verdict = "incorrect"
                    confidence = 0.75
                escalate = escalate or verdict == "borderline"

            model_name = "multilingual" if is_hindi else "english"

            return CrossEncoderResult(
                score=sts_score,
                nli_label=nli_label,
                verdict=verdict,
                confidence=confidence,
                escalate=escalate,
                model=model_name,
            )

        except Exception as e:
            return CrossEncoderResult(
                score=0.0, nli_label="neutral", verdict="borderline",
                confidence=0.0, escalate=True, error=str(e),
            )

    @classmethod
    async def _compute_sts(cls, student: str, model: str, is_hindi: bool) -> float:
        """Compute STS similarity score (0-1)."""
        if is_hindi:
            cross_encoder = await cls._get_multi_model()
        else:
            cross_encoder = await cls._get_sts_model()

        loop = asyncio.get_event_loop()

        def _predict():
            scores = cross_encoder.predict([(student, model)], show_progress_bar=False)
            return float(scores[0])

        score = await loop.run_in_executor(None, _predict)

        # Normalize to 0-1 (some models output 0-5, others 0-1)
        if score > 1.0:
            score = score / 5.0  # STS-B models output 0-5

        return max(0.0, min(1.0, score))

    @classmethod
    async def _compute_nli(cls, student: str, model: str, is_hindi: bool) -> str:
        """Compute NLI label (entailment/contradiction/neutral)."""
        if is_hindi:
            # Multilingual model doesn't have NLI labels directly
            # Use STS score as proxy: high score → entailment, low → contradiction
            sts_score = await cls._compute_sts(student, model, is_hindi=True)
            if sts_score >= 0.7:
                return cls.NLI_ENTAILMENT
            elif sts_score < 0.3:
                return cls.NLI_CONTRADICTION
            else:
                return cls.NLI_NEUTRAL

        cross_encoder = await cls._get_nli_model()

        loop = asyncio.get_event_loop()

        def _predict():
            # NLI models output logits for [entailment, neutral, contradiction]
            scores = cross_encoder.predict([(student, model)], show_progress_bar=False)
            return scores[0]

        scores = await loop.run_in_executor(None, _predict)

        # Get the label with highest score
        labels = [cls.NLI_ENTAILMENT, cls.NLI_NEUTRAL, cls.NLI_CONTRADICTION]
        # Apply softmax to get probabilities
        import math
        exp_scores = [math.exp(float(s)) for s in scores]
        total = sum(exp_scores)
        probs = [s / total for s in exp_scores]

        best_idx = max(range(len(probs)), key=lambda i: probs[i])
        return labels[best_idx]
