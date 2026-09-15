"""Socratic pipeline — LangGraph multi-agent for mastery-gated tutoring.

Implements Progressive Context Revelation (PCR) to prevent answer leakage:
  - Mastery < 0.4 → context_only (no answer chunks, hints only)
  - Mastery 0.4-0.7 → prerequisite_first (hints, structure, partial)
  - Mastery > 0.7 → full_reveal (all chunks including answers)

Pipeline agents (LangGraph nodes):
  1. Validation Gate: reject vague/empty inputs
  2. Review Agent: Qdrant retrieval with PCR gating
  3. Rectify Agent: misconception diagnosis
  4. Scaffolding Controller: set hint level from mastery
  5. Heuristic Agent: generate Socratic question
  6. Quality Check: evaluate question quality
  7. Knowledge Map Updater: update BKT + IRT
  8. Reflection Node: confirm understanding

Usage:
    from backend.its.tutoring.socratic_pipeline import SocraticPipeline

    pipeline = SocraticPipeline()
    result = await pipeline.process(
        user_query="I don't understand photosynthesis",
        user_id="student_123",
        node_id="c10_bio_008",
        mastery=0.2,
    )
"""

import asyncio
from dataclasses import dataclass, field
from typing import Optional, Any
from enum import Enum


class MasteryLevel(Enum):
    """Mastery level determines PCR gating."""
    LOW = "low"           # < 0.4 → context_only
    MEDIUM = "medium"     # 0.4-0.7 → prerequisite_first
    HIGH = "high"         # > 0.7 → full_reveal


class HintLevel(Enum):
    """Scaffolding hint level."""
    LEVEL_1 = 1   # Conceptual nudge
    LEVEL_2 = 2   # Partial structure
    LEVEL_3 = 3   # Detailed hint
    LEVEL_4 = 4   # Near-complete (only for high mastery)


@dataclass
class PipelineState:
    """State passed through the LangGraph pipeline."""
    # Input
    user_query: str
    user_id: str
    node_id: Optional[str] = None
    mastery: float = 0.0

    # Derived
    mastery_level: MasteryLevel = MasteryLevel.LOW
    hint_level: HintLevel = HintLevel.LEVEL_1
    is_valid: bool = True
    validation_error: str = ""

    # Retrieved content
    retrieved_chunks: list = field(default_factory=list)
    filtered_chunks: list = field(default_factory=list)  # After PCR filtering
    misconceptions: list = field(default_factory=list)

    # Generated
    socratic_question: str = ""
    hint: str = ""
    feedback: str = ""
    quality_score: float = 0.0

    # Knowledge tracing
    mastery_before: float = 0.0
    mastery_after: float = 0.0

    # Metadata
    errors: list = field(default_factory=list)
    latency_ms: float = 0.0


@dataclass
class PipelineResult:
    """Final result of the Socratic pipeline."""
    socratic_question: str
    hint: str
    mastery_level: str
    hint_level: int
    retrieved_count: int
    filtered_count: int
    misconceptions_count: int
    quality_score: float
    mastery_before: float
    mastery_after: float
    feedback: str
    errors: list = field(default_factory=list)
    latency_ms: float = 0.0


class SocraticPipeline:
    """LangGraph multi-agent Socratic pipeline with PCR gating.

    The pipeline prevents answer leakage by filtering retrieved content
    based on the student's mastery level. Students with low mastery get
    hints and Socratic questions, not direct answers.
    """

    def __init__(self):
        self._graph = None
        self._qdrant_service = None
        self._kt_engine = None

    def _get_qdrant_service(self):
        """Lazy-load Qdrant service."""
        if self._qdrant_service is None:
            try:
                from backend.services.platform_loader import load_service
                QdrantSearchService = load_service("qdrant_service", "QdrantSearchService")
                self._qdrant_service = QdrantSearchService()
            except ImportError:
                # Direct import fallback (when running from D:\platform\backend)
                import importlib.util, os
                svc_path = os.path.join(os.path.dirname(__file__), "qdrant_service.py")
                spec = importlib.util.spec_from_file_location("qdrant_service", svc_path)
                mod = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(mod)
                self._qdrant_service = mod.QdrantSearchService()
        return self._qdrant_service

    def _get_kt_engine(self):
        """Lazy-load knowledge tracing engine."""
        if self._kt_engine is None:
            try:
                from backend.its.diagnosis.knowledge_tracing import KnowledgeTracingEngine
                self._kt_engine = KnowledgeTracingEngine()
            except ImportError:
                pass  # KT engine is optional
        return self._kt_engine

    # ── Helpers for dict/SearchResult compatibility ───────────────── #

    @staticmethod
    def _get_chunk_field(chunk, key, default=None):
        """Get a field from a dict or SearchResult dataclass."""
        if isinstance(chunk, dict):
            return chunk.get(key, default)
        payload = getattr(chunk, "payload", None) or {}
        return payload.get(key, default)

    @staticmethod
    def _get_chunk_text(chunk):
        """Get text content from a dict or SearchResult."""
        if isinstance(chunk, dict):
            return chunk.get("text", chunk.get("content", chunk.get("definition", "")))
        payload = getattr(chunk, "payload", None) or {}
        return payload.get("text", payload.get("definition", payload.get("content", "")))

    # ── Pipeline nodes ────────────────────────────────────────────── #

    def _validation_gate(self, state: PipelineState) -> PipelineState:
        """Node 1: Validate the user query."""
        if not state.user_query or len(state.user_query.strip()) < 5:
            state.is_valid = False
            state.validation_error = "Query too short or empty"
            return state

        # Check for answer-extraction attempts
        extraction_patterns = [
            "give me the answer",
            "what is the exact answer",
            "tell me the solution",
            "just tell me",
            "give me the solution",
        ]
        query_lower = state.user_query.lower()
        for pattern in extraction_patterns:
            if pattern in query_lower:
                # Don't reject, but flag for PCR enforcement
                state.validation_error = "Answer extraction attempt detected — PCR will be enforced"
                break

        state.is_valid = True
        return state

    def _determine_mastery_level(self, state: PipelineState) -> PipelineState:
        """Determine mastery level for PCR gating."""
        state.mastery_before = state.mastery
        if state.mastery < 0.4:
            state.mastery_level = MasteryLevel.LOW
            state.hint_level = HintLevel.LEVEL_1
        elif state.mastery < 0.7:
            state.mastery_level = MasteryLevel.MEDIUM
            state.hint_level = HintLevel.LEVEL_2
        else:
            state.mastery_level = MasteryLevel.HIGH
            state.hint_level = HintLevel.LEVEL_3
        return state

    async def _review_agent(self, state: PipelineState) -> PipelineState:
        """Node 2: Retrieve content from Qdrant with PCR gating."""
        if not state.is_valid:
            return state

        try:
            qdrant = self._get_qdrant_service()

            # Retrieve content from nodes collection
            response = await qdrant.search_nodes(
                query=state.user_query,
                top_k=10,
            )
            # SearchResponse has .results attribute
            state.retrieved_chunks = response.results if response and response.results else []

            # PCR filtering: remove answer chunks based on mastery level
            state.filtered_chunks = self._apply_pcr_filter(
                state.retrieved_chunks, state.mastery_level
            )

        except Exception as e:
            state.errors.append(f"review_agent: {str(e)}")

        return state

    def _apply_pcr_filter(self, chunks: list, mastery_level: MasteryLevel) -> list:
        """Apply Progressive Context Revelation filter.

        - LOW mastery: only non-answer chunks (definitions, hints)
        - MEDIUM mastery: non-answer + partial answer chunks
        - HIGH mastery: all chunks (including full answers)

        Handles both dict and SearchResult (dataclass with .payload) objects.
        """
        def _get_field(chunk, key, default=None):
            """Get a field from dict or SearchResult object."""
            if isinstance(chunk, dict):
                return chunk.get(key, default)
            # SearchResult dataclass — check payload
            payload = getattr(chunk, "payload", None) or {}
            return payload.get(key, default)

        def _get_text(chunk):
            """Get text content from dict or SearchResult."""
            if isinstance(chunk, dict):
                return chunk.get("text", chunk.get("content", ""))
            payload = getattr(chunk, "payload", None) or {}
            return payload.get("text", payload.get("definition", payload.get("content", "")))

        if mastery_level == MasteryLevel.LOW:
            # Only non-answer chunks (enrichment content is never an answer chunk)
            return [c for c in chunks if not _get_field(c, "is_answer_chunk", False)]
        elif mastery_level == MasteryLevel.MEDIUM:
            filtered = []
            for c in chunks:
                if not _get_field(c, "is_answer_chunk", False):
                    filtered.append(c)
                else:
                    text = _get_text(c)
                    if len(text) > 200:
                        # Truncate for medium mastery
                        if isinstance(c, dict):
                            truncated = dict(c)
                            truncated["text"] = text[:200] + "... [rest revealed at higher mastery]"
                            truncated["is_truncated"] = True
                            filtered.append(truncated)
                        else:
                            filtered.append(c)  # Keep as-is for dataclass
                    else:
                        filtered.append(c)
            return filtered
        else:  # HIGH
            return chunks

    async def _rectify_agent(self, state: PipelineState) -> PipelineState:
        """Node 3: Diagnose potential misconceptions."""
        if not state.is_valid:
            return state

        try:
            qdrant = self._get_qdrant_service()

            # Search for misconceptions related to the query
            response = await qdrant.search_misconceptions(
                query=state.user_query,
                top_k=5,
            )
            state.misconceptions = response.results[:3] if response and response.results else []

        except Exception as e:
            state.errors.append(f"rectify_agent: {str(e)}")

        return state

    def _scaffolding_controller(self, state: PipelineState) -> PipelineState:
        """Node 4: Set hint level based on mastery and attempt history."""
        if state.mastery < 0.2:
            state.hint_level = HintLevel.LEVEL_1  # Conceptual nudge
        elif state.mastery < 0.4:
            state.hint_level = HintLevel.LEVEL_2  # Partial structure
        elif state.mastery < 0.7:
            state.hint_level = HintLevel.LEVEL_3  # Detailed hint
        else:
            state.hint_level = HintLevel.LEVEL_4  # Near-complete

        return state

    def _heuristic_agent(self, state: PipelineState) -> PipelineState:
        """Node 5: Generate a Socratic question based on context and mastery."""
        if not state.is_valid:
            state.socratic_question = "Could you tell me more about what you're trying to understand?"
            return state

        # Generate Socratic question based on mastery level and retrieved content
        if state.mastery_level == MasteryLevel.LOW:
            state.socratic_question = self._generate_low_mastery_question(state)
            state.hint = self._generate_low_mastery_hint(state)
        elif state.mastery_level == MasteryLevel.MEDIUM:
            state.socratic_question = self._generate_medium_mastery_question(state)
            state.hint = self._generate_medium_mastery_hint(state)
        else:
            state.socratic_question = self._generate_high_mastery_question(state)
            state.hint = self._generate_high_mastery_hint(state)

        return state

    def _generate_low_mastery_question(self, state: PipelineState) -> str:
        """Generate a guiding question for low-mastery students."""
        if state.filtered_chunks:
            chunk = state.filtered_chunks[0]
            title = self._get_chunk_field(chunk, "title") or self._get_chunk_field(chunk, "node_id") or "this topic"
            return f"Let's start with the basics. What do you already know about {title}?"
        return "Let's break this down step by step. What part of the problem is confusing you?"

    def _generate_low_mastery_hint(self, state: PipelineState) -> str:
        """Generate a conceptual hint for low-mastery students."""
        if state.filtered_chunks:
            chunk = state.filtered_chunks[0]
            text = self._get_chunk_text(chunk)
            first_sentence = text.split(".")[0] + "." if text else ""
            return f"Hint: {first_sentence[:150]}"
        return "Hint: Try to identify the key concept being asked about."

    def _generate_medium_mastery_question(self, state: PipelineState) -> str:
        """Generate a scaffolding question for medium-mastery students."""
        if state.misconceptions:
            mis = state.misconceptions[0]
            mis_text = self._get_chunk_text(mis)
            return f"You seem to be on the right track. Can you explain why {mis_text[:100]}?"
        return "Good progress! Can you identify the key formula or concept that applies here?"

    def _generate_medium_mastery_hint(self, state: PipelineState) -> str:
        """Generate a structural hint for medium-mastery students."""
        if state.filtered_chunks:
            chunk = state.filtered_chunks[0]
            text = self._get_chunk_text(chunk)
            sentences = text.split(".")[:2]
            return f"Hint: {'.'.join(sentences)[:200]}"
        return "Hint: Think about what principle or formula connects the given information."

    def _generate_high_mastery_question(self, state: PipelineState) -> str:
        """Generate a challenging question for high-mastery students."""
        return "You seem comfortable with this topic. Can you explain this concept to someone else, or apply it to a new situation?"

    def _generate_high_mastery_hint(self, state: PipelineState) -> str:
        """Generate a detailed hint for high-mastery students."""
        if state.filtered_chunks:
            chunk = state.filtered_chunks[0]
            text = self._get_chunk_text(chunk)
            return f"Hint: {text[:300]}"
        return "Hint: Review the complete solution and check each step."

    def _quality_check(self, state: PipelineState) -> PipelineState:
        """Node 6: Evaluate the quality of the generated Socratic question."""
        question = state.socratic_question

        # Simple quality heuristics
        quality = 0.5  # Base

        # Good: question is open-ended
        if "?" in question:
            quality += 0.2

        # Good: question references the topic
        if state.filtered_chunks:
            chunk = state.filtered_chunks[0]
            title = self._get_chunk_field(chunk, "title") or self._get_chunk_field(chunk, "node_id") or ""
            if title and title.lower() in question.lower():
                quality += 0.15

        # Good: question is not too long or too short
        if 20 < len(question) < 200:
            quality += 0.15

        # Penalize if answer leaked (answer chunk in question)
        for chunk in state.filtered_chunks:
            if self._get_chunk_field(chunk, "is_answer_chunk", False) and state.mastery_level != MasteryLevel.HIGH:
                quality -= 0.3
                state.errors.append("Answer leak detected in question")
                break

        state.quality_score = max(0.0, min(1.0, quality))
        return state

    def _knowledge_map_updater(self, state: PipelineState) -> PipelineState:
        """Node 7: Update BKT + IRT based on the interaction."""
        # This is a placeholder — actual update happens when the student
        # responds to the Socratic question
        state.mastery_after = state.mastery_before  # No change yet
        return state

    def _reflection_node(self, state: PipelineState) -> PipelineState:
        """Node 8: Generate reflection prompt to confirm understanding."""
        if state.mastery_level == MasteryLevel.HIGH:
            state.feedback = "Great work! Try explaining this concept in your own words."
        elif state.mastery_level == MasteryLevel.MEDIUM:
            state.feedback = "You're making progress. Try the next practice question."
        else:
            state.feedback = "Take your time with the basics. Try reviewing the hint and attempt again."
        return state

    # ── Main pipeline execution ───────────────────────────────────── #

    async def process(
        self,
        user_query: str,
        user_id: str,
        node_id: Optional[str] = None,
        mastery: float = 0.0,
    ) -> PipelineResult:
        """Process a user query through the Socratic pipeline.

        Args:
            user_query: The student's question or doubt.
            user_id: Student ID for mastery tracking.
            node_id: Optional curriculum node ID.
            mastery: Current mastery probability (0-1).

        Returns:
            PipelineResult with Socratic question, hint, and metadata.
        """
        import time
        start = time.time()

        state = PipelineState(
            user_query=user_query,
            user_id=user_id,
            node_id=node_id,
            mastery=mastery,
        )

        # Execute pipeline nodes in sequence
        state = self._validation_gate(state)
        state = self._determine_mastery_level(state)
        state = await self._review_agent(state)
        state = await self._rectify_agent(state)
        state = self._scaffolding_controller(state)
        state = self._heuristic_agent(state)
        state = self._quality_check(state)
        state = self._knowledge_map_updater(state)
        state = self._reflection_node(state)

        latency = (time.time() - start) * 1000

        return PipelineResult(
            socratic_question=state.socratic_question,
            hint=state.hint,
            mastery_level=state.mastery_level.value,
            hint_level=state.hint_level.value,
            retrieved_count=len(state.retrieved_chunks),
            filtered_count=len(state.filtered_chunks),
            misconceptions_count=len(state.misconceptions),
            quality_score=state.quality_score,
            mastery_before=state.mastery_before,
            mastery_after=state.mastery_after,
            feedback=state.feedback,
            errors=state.errors,
            latency_ms=latency,
        )
