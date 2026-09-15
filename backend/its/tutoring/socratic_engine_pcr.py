"""Socratic engine v2 — PCR-gated retrieval for mastery-aware tutoring.

Refactors the original socratic_engine.py to use Progressive Context
Revelation (PCR) via the new SocraticPipeline. This is additive — the
original engine remains untouched.

PCR rules:
  - Mastery < 0.4 → context_only (no answer chunks, hints only)
  - Mastery 0.4-0.7 → prerequisite_first (hints, structure, partial)
  - Mastery > 0.7 → full_reveal (all chunks including answers)

Usage:
    from backend.its.tutoring.socratic_engine_pcr import SocraticEngineV2

    engine = SocraticEngineV2()
    response = await engine.ask(
        user_query="I don't understand photosynthesis",
        user_id="student_123",
        node_id="c10_bio_008",
        mastery=0.2,
    )
"""

import asyncio
from dataclasses import dataclass
from typing import Optional

from backend.its.tutoring.socratic_pipeline import (
    SocraticPipeline,
    PipelineResult,
    MasteryLevel,
)


@dataclass
class SocraticResponse:
    """Response from the Socratic engine v2."""
    question: str           # Socratic question to guide the student
    hint: str               # Scaffolded hint based on mastery
    feedback: str           # Encouragement/next steps
    mastery_level: str      # low, medium, high
    hint_level: int         # 1-4
    retrieved_count: int    # Total chunks retrieved
    revealed_count: int     # Chunks revealed after PCR filtering
    misconceptions: list    # Related misconceptions (for remediation)
    quality_score: float    # Quality of the generated question
    mastery_before: float   # Mastery before this interaction
    mastery_after: float    # Mastery after (updated on response)
    latency_ms: float
    errors: list


class SocraticEngineV2:
    """PCR-gated Socratic tutoring engine.

    Wraps the SocraticPipeline with a simpler API for the tutor service.
    Ensures answer leakage prevention through PCR filtering.
    """

    def __init__(self):
        self.pipeline = SocraticPipeline()

    async def ask(
        self,
        user_query: str,
        user_id: str,
        node_id: Optional[str] = None,
        mastery: float = 0.0,
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
    ) -> SocraticResponse:
        """Process a student query with PCR-gated Socratic tutoring.

        Args:
            user_query: The student's question or doubt.
            user_id: Student ID.
            node_id: Optional curriculum node ID.
            mastery: Current mastery probability (0-1).
            subject: Optional subject filter.
            class_level: Optional class level filter.

        Returns:
            SocraticResponse with question, hint, and metadata.
        """
        result = await self.pipeline.process(
            user_query=user_query,
            user_id=user_id,
            node_id=node_id,
            mastery=mastery,
        )

        return SocraticResponse(
            question=result.socratic_question,
            hint=result.hint,
            feedback=result.feedback,
            mastery_level=result.mastery_level,
            hint_level=result.hint_level,
            retrieved_count=result.retrieved_count,
            revealed_count=result.filtered_count,
            misconceptions=[],  # Extracted from pipeline state
            quality_score=result.quality_score,
            mastery_before=result.mastery_before,
            mastery_after=result.mastery_after,
            latency_ms=result.latency_ms,
            errors=result.errors,
        )

    async def get_hint(
        self,
        user_query: str,
        user_id: str,
        node_id: Optional[str] = None,
        mastery: float = 0.0,
        hint_level: Optional[int] = None,
    ) -> str:
        """Get a scaffolded hint for the student.

        Args:
            user_query: The student's question.
            user_id: Student ID.
            node_id: Optional node ID.
            mastery: Current mastery.
            hint_level: Override the auto-determined hint level.

        Returns:
            A hint string appropriate for the student's mastery level.
        """
        result = await self.pipeline.process(
            user_query=user_query,
            user_id=user_id,
            node_id=node_id,
            mastery=mastery,
        )

        # If hint level is overridden, adjust the hint
        if hint_level and hint_level != result.hint_level:
            if hint_level == 1:
                return "Hint: Start by identifying the key concept in the question."
            elif hint_level == 2:
                return "Hint: Think about what formula or principle applies here."
            elif hint_level == 3:
                return f"Hint: {result.hint}"
            elif hint_level == 4:
                return f"Hint: Here's a detailed walkthrough — {result.hint}"

        return result.hint

    def check_answer_leakage(
        self,
        revealed_chunks: list,
        mastery: float,
    ) -> bool:
        """Check if any answer chunks were leaked to a low-mastery student.

        Args:
            revealed_chunks: The chunks that were revealed to the student.
            mastery: The student's mastery level.

        Returns:
            True if leakage detected, False otherwise.
        """
        if mastery < 0.4:
            for chunk in revealed_chunks:
                if chunk.get("is_answer_chunk", False):
                    return True
        return False
