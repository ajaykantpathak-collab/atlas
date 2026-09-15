"""Answer evaluator v3 — 3-tier + 1b grading pipeline.

Replaces the old keyword+MiniLM evaluator with a multi-tier pipeline:

  Tier 1: Deterministic grading
    - MCQ: exact match against correct option
    - Numerical: exact numeric comparison (with tolerance)
    - Fill-blank: exact or fuzzy string match
    - True/False: boolean comparison

  Tier 1b: NER + interpreter loop (for math/chem/science answers)
    - NER extracts entities from student and model answers
    - Interpreter loop tries 5 strategies: symbolic, numerical, unit, chemical, fallback
    - If a deterministic strategy succeeds, grade is assigned
    - If all strategies fail, escalate to Tier 2

  Tier 2: Cross-encoder + NLI (for conceptual free-text)
    - STS similarity score (0-1)
    - NLI classification (entailment/contradiction/neutral)
    - If clear entailment + high STS → correct
    - If contradiction → incorrect
    - If borderline → escalate to Tier 3

  Tier 3: LLM rubric grading (for borderline/complex cases)
    - Rubric criteria extracted from marking scheme or model answer
    - LLM judges each criterion as met/not-met
    - Score = weighted fraction of met criteria
    - Fallback to keyword matching if no LLM available

  Post-grading: Misconception matching
    - If answer is wrong, match against misconceptions DB
    - Return relevant misconceptions for remediation

Usage:
    from backend.services.answer_evaluator_v3 import AnswerEvaluatorV3

    result = await AnswerEvaluatorV3.evaluate(
        student_answer="x^2 + 2x + 1",
        model_answer="(x+1)^2",
        question_type="short_answer",
        max_marks=3,
    )
    # result = {
    #     "marks_awarded": 3,
    #     "max_marks": 3,
    #     "tier": "1b",
    #     "strategy": "symbolic",
    #     "confidence": 0.95,
    #     "feedback": "Correct! The expressions are equivalent.",
    #     "misconceptions": [],
    # }
"""

import asyncio
import re
from dataclasses import dataclass, field
from typing import Optional

try:
    from services.ner_extractor import NERExtractor
    from services.interpreter_loop import InterpreterLoop
except ImportError:
    from backend.services.ner_extractor import NERExtractor
    from backend.services.interpreter_loop import InterpreterLoop
from backend.services.cross_encoder_grader import CrossEncoderGrader
from backend.services.rubric_generator import RubricGenerator, Rubric
from backend.services.llm_grader import LLMGrader


@dataclass
class EvaluationResultV3:
    """Result of v3 answer evaluation."""
    marks_awarded: int
    max_marks: int
    tier: str                    # "1", "1b", "2", "3"
    strategy: str                # Specific strategy used
    confidence: float            # 0-1
    feedback: str
    similarity_score: Optional[float] = None
    nli_label: Optional[str] = None
    criteria_met: list = field(default_factory=list)
    criteria_missed: list = field(default_factory=list)
    misconceptions: list = field(default_factory=list)
    error: Optional[str] = None
    latency_ms: float = 0.0
    board: Optional[str] = None  # "CBSE" or "CISCE"


class AnswerEvaluatorV3:
    """3-tier + 1b answer evaluation pipeline.

    Routes each answer to the appropriate tier based on question type
    and content, escalating only when necessary for efficiency.
    """

    def __init__(self):
        self.ner = NERExtractor()
        self.interpreter = InterpreterLoop()
        self.rubric_generator = RubricGenerator()

    async def evaluate(
        self,
        student_answer: str,
        model_answer: str,
        question_type: Optional[str] = None,
        max_marks: int = 3,
        correct_option: Optional[str] = None,
        marking_scheme: Optional[str] = None,
        key_concepts: Optional[list] = None,
        options: Optional[list] = None,
        board: Optional[str] = None,
    ) -> EvaluationResultV3:
        """Evaluate a student answer using the 3-tier + 1b pipeline.

        Args:
            student_answer: The student's answer.
            model_answer: The correct/model answer.
            question_type: Type of question (mcq, numerical, true_false,
                short_answer, long_answer, fill_blank, multi_part).
            max_marks: Maximum marks for the question.
            correct_option: For MCQ, the correct option letter (A, B, C, D).
            marking_scheme: Optional marking scheme text for rubric generation.
            key_concepts: Optional list of key concepts to check.
            options: For MCQ, the list of options.

        Returns:
            EvaluationResultV3 with marks, tier, strategy, and feedback.
        """
        import time
        start = time.time()

        # ── Tier 1: Deterministic grading ── #

        if question_type == "mcq" or correct_option:
            result = self._grade_mcq(student_answer, correct_option, options, max_marks)
            result.latency_ms = (time.time() - start) * 1000
            if board:
                result.board = board
                result.feedback = self._apply_board_feedback(board, result)
            return result

        if question_type == "true_false":
            result = self._grade_true_false(student_answer, model_answer, max_marks)
            result.latency_ms = (time.time() - start) * 1000
            if board:
                result.board = board
                result.feedback = self._apply_board_feedback(board, result)
            return result

        if question_type == "numerical":
            result = self._grade_numerical(student_answer, model_answer, max_marks)
            result.latency_ms = (time.time() - start) * 1000
            return result

        if question_type == "fill_blank":
            result = self._grade_fill_blank(student_answer, model_answer, max_marks)
            result.latency_ms = (time.time() - start) * 1000
            return result

        # ── Tier 1b: NER + interpreter loop (math/chem/science) ── #

        # Quick exact match check for short answers
        if student_answer.strip().lower() == model_answer.strip().lower():
            result = EvaluationResultV3(
                marks_awarded=max_marks, max_marks=max_marks,
                tier="1", strategy="exact_string_match",
                confidence=1.0, feedback="Correct!",
                board=board,
            )
            if board:
                result.feedback = self._apply_board_feedback(board, result)
            result.latency_ms = (time.time() - start) * 1000
            return result

        # Extract entities to check if this is a math/chem answer
        student_entities = self.ner.extract(student_answer)
        model_entities = self.ner.extract(model_answer)

        if student_entities.has_math or student_entities.has_chemistry:
            interp_result = self.interpreter.verify(
                student_answer, model_answer, question_type, key_concepts
            )

            if not interp_result.escalate:
                # Deterministic verification succeeded
                marks = max_marks if interp_result.match else 0
                feedback = "Correct answer!" if interp_result.match else "Incorrect answer."
                confidence = interp_result.confidence

                result = EvaluationResultV3(
                    marks_awarded=marks,
                    max_marks=max_marks,
                    tier="1b",
                    strategy=interp_result.strategy,
                    confidence=confidence,
                    feedback=feedback,
                )
                result.latency_ms = (time.time() - start) * 1000
                return result

        # ── Tier 2: Cross-encoder + NLI ── #

        ce_result = await CrossEncoderGrader.grade(
            student_answer, model_answer, max_marks
        )

        if not ce_result.escalate:
            # Tier 2 gave a definitive answer
            if ce_result.verdict == "correct":
                marks = max_marks
                feedback = "Correct answer!"
            elif ce_result.verdict == "incorrect":
                marks = 0
                feedback = "Incorrect answer."
            else:
                marks = max(1, int(max_marks * ce_result.score))
                feedback = f"Partially correct (similarity: {ce_result.score:.1%})."

            result = EvaluationResultV3(
                marks_awarded=marks,
                max_marks=max_marks,
                tier="2",
                strategy="cross_encoder_sts_nli",
                confidence=ce_result.confidence,
                feedback=feedback,
                similarity_score=ce_result.score,
                nli_label=ce_result.nli_label,
            )
            result.latency_ms = (time.time() - start) * 1000
            return result

        # ── Tier 3: LLM rubric grading ── #

        # Generate rubric
        if marking_scheme:
            rubric = self.rubric_generator.generate_from_marking_scheme(
                marking_scheme, max_marks
            )
        else:
            rubric = self.rubric_generator.generate_from_model_answer(
                model_answer, max_marks
            )

        # Grade with LLM
        llm_result = await LLMGrader.grade(
            student_answer, model_answer, rubric, max_marks
        )

        feedback = llm_result.feedback
        if llm_result.criteria_missed:
            feedback += f" Missing: {', '.join(llm_result.criteria_missed[:3])}."

        result = EvaluationResultV3(
            marks_awarded=llm_result.marks_awarded,
            max_marks=max_marks,
            tier="3",
            strategy=f"llm_{llm_result.model}",
            confidence=0.70,
            feedback=feedback,
            criteria_met=llm_result.criteria_met,
            criteria_missed=llm_result.criteria_missed,
            error=llm_result.error,
        )
        result.latency_ms = (time.time() - start) * 1000
        if board:
            result.board = board
            result.feedback = self._apply_board_feedback(board, result)
        return result

    # ── Board-aware feedback ──────────────────────────────────────── #

    @staticmethod
    def _apply_board_feedback(board: str, result: EvaluationResultV3) -> str:
        """Enrich feedback with board-specific context."""
        board = board.upper().strip()
        pct = (result.marks_awarded / result.max_marks * 100) if result.max_marks > 0 else 0

        if board == "CBSE":
            prefix = f"[CBSE {result.marks_awarded}/{result.max_marks}] "
            if pct >= 80:
                suffix = " Meets CBSE competency standards."
            elif pct >= 60:
                suffix = " Review CBSE step-marking method for full marks."
            else:
                suffix = " Practice CBSE step-by-step presentation."
        elif board in ("CISCE", "ICSE", "ISC"):
            prefix = f"[CISCE {result.marks_awarded}/{result.max_marks}] "
            if pct >= 80:
                suffix = " Meets ICSE/ISC rubric standards."
            elif pct >= 60:
                suffix = " Focus on CISCE rubric criteria for higher marks."
            else:
                suffix = " Review CISCE marking rubric carefully."
        else:
            return result.feedback

        base = result.feedback
        # Avoid double-prefixing
        if base.startswith("[CBSE") or base.startswith("[CISCE"):
            return base
        return f"{prefix}{base}{suffix}"

    # ── Tier 1 implementations ───────────────────────────────────── #

    @staticmethod
    def _grade_mcq(
        student_answer: str,
        correct_option: Optional[str],
        options: Optional[list],
        max_marks: int,
    ) -> EvaluationResultV3:
        """Grade MCQ by comparing selected option to correct option."""
        if correct_option is None:
            return EvaluationResultV3(
                marks_awarded=0, max_marks=max_marks,
                tier="1", strategy="mcq_no_key",
                confidence=0.0, feedback="No correct option provided.",
                error="missing_correct_option",
            )

        # Normalize: extract letter from student answer
        student_letter = AnswerEvaluatorV3._extract_option_letter(student_answer)
        correct_letter = AnswerEvaluatorV3._extract_option_letter(correct_option)

        is_correct = student_letter == correct_letter

        return EvaluationResultV3(
            marks_awarded=max_marks if is_correct else 0,
            max_marks=max_marks,
            tier="1",
            strategy="mcq_exact_match",
            confidence=1.0,
            feedback="Correct!" if is_correct else f"Incorrect. Correct answer: {correct_letter}.",
        )

    @staticmethod
    def _grade_true_false(
        student_answer: str,
        model_answer: str,
        max_marks: int,
    ) -> EvaluationResultV3:
        """Grade true/false question."""
        student_bool = AnswerEvaluatorV3._parse_bool(student_answer)
        model_bool = AnswerEvaluatorV3._parse_bool(model_answer)

        is_correct = student_bool == model_bool

        return EvaluationResultV3(
            marks_awarded=max_marks if is_correct else 0,
            max_marks=max_marks,
            tier="1",
            strategy="true_false_match",
            confidence=1.0,
            feedback="Correct!" if is_correct else "Incorrect.",
        )

    @staticmethod
    def _grade_numerical(
        student_answer: str,
        model_answer: str,
        max_marks: int,
    ) -> EvaluationResultV3:
        """Grade numerical answer with tolerance."""
        try:
            student_num = float(AnswerEvaluatorV3._extract_number(student_answer))
            model_num = float(AnswerEvaluatorV3._extract_number(model_answer))

            # Tolerance: 1% relative or 0.01 absolute
            tolerance = max(abs(model_num) * 0.01, 0.01)
            is_correct = abs(student_num - model_num) <= tolerance

            return EvaluationResultV3(
                marks_awarded=max_marks if is_correct else 0,
                max_marks=max_marks,
                tier="1",
                strategy="numerical_exact",
                confidence=1.0,
                feedback=f"Correct! Answer: {model_num}" if is_correct else f"Incorrect. Correct answer: {model_num}.",
            )
        except (ValueError, TypeError):
            # Can't parse as number — fall through to other tiers
            return EvaluationResultV3(
                marks_awarded=0, max_marks=max_marks,
                tier="1", strategy="numerical_parse_fail",
                confidence=0.0, feedback="Could not parse numerical answer.",
                error="parse_failure",
            )

    @staticmethod
    def _grade_fill_blank(
        student_answer: str,
        model_answer: str,
        max_marks: int,
    ) -> EvaluationResultV3:
        """Grade fill-in-the-blank with exact and fuzzy matching."""
        student_clean = student_answer.strip().lower()
        model_clean = model_answer.strip().lower()

        # Exact match
        if student_clean == model_clean:
            return EvaluationResultV3(
                marks_awarded=max_marks, max_marks=max_marks,
                tier="1", strategy="fill_blank_exact",
                confidence=1.0, feedback="Correct!",
            )

        # Fuzzy: check if model answer is contained in student answer
        # Use word boundaries to avoid partial matches (e.g., "O2" in "CO2")
        if len(model_clean) >= 3:
            # Check word-boundary containment for longer strings
            import re as _re
            pattern = _re.compile(rf"\b{_re.escape(model_clean)}\b", _re.IGNORECASE)
            if pattern.search(student_clean):
                return EvaluationResultV3(
                    marks_awarded=max_marks, max_marks=max_marks,
                    tier="1", strategy="fill_blank_contains",
                    confidence=0.90, feedback="Correct!",
                )
            pattern_rev = _re.compile(rf"\b{_re.escape(student_clean)}\b", _re.IGNORECASE)
            if len(student_clean) >= 3 and pattern_rev.search(model_clean):
                return EvaluationResultV3(
                    marks_awarded=max_marks, max_marks=max_marks,
                    tier="1", strategy="fill_blank_contains",
                    confidence=0.90, feedback="Correct!",
                )

        # Word overlap
        student_words = set(student_clean.split())
        model_words = set(model_clean.split())
        overlap = len(student_words & model_words) / max(len(model_words), 1)

        if overlap >= 0.8:
            return EvaluationResultV3(
                marks_awarded=max_marks, max_marks=max_marks,
                tier="1", strategy="fill_blank_fuzzy",
                confidence=0.85, feedback="Correct!",
            )
        elif overlap >= 0.5:
            return EvaluationResultV3(
                marks_awarded=max(1, max_marks // 2), max_marks=max_marks,
                tier="1", strategy="fill_blank_partial",
                confidence=0.70, feedback="Partially correct.",
            )
        else:
            return EvaluationResultV3(
                marks_awarded=0, max_marks=max_marks,
                tier="1", strategy="fill_blank_no_match",
                confidence=0.90, feedback=f"Incorrect. Expected: {model_answer}.",
            )

    # ── Helper methods ────────────────────────────────────────────── #

    @staticmethod
    def _extract_option_letter(text: str) -> str:
        """Extract option letter (A, B, C, D) from text."""
        text = text.strip().upper()
        # Direct letter
        if len(text) == 1 and text in "ABCDE":
            return text
        # "A)", "(A)", "A.", "Option A"
        match = re.match(r"^(?:OPTION\s*)?[\(\[]?([ABCDE])[\)\]]?\.?\s*", text, re.IGNORECASE)
        if match:
            return match.group(1).upper()
        # Check if text starts with a letter
        match = re.match(r"^([ABCDE])\b", text)
        if match:
            return match.group(1).upper()
        return text

    @staticmethod
    def _parse_bool(text: str) -> bool:
        """Parse true/false from text."""
        lower = text.strip().lower()
        if lower in ("true", "t", "yes", "1", "correct"):
            return True
        if lower in ("false", "f", "no", "0", "incorrect"):
            return False
        # Default: check if "true" appears
        return "true" in lower

    @staticmethod
    def _extract_number(text: str) -> str:
        """Extract the first number from text."""
        match = re.search(r"[-+]?\d+(?:\.\d+)?", text)
        return match.group() if match else "0"
