"""Tutor service v2 — delegates complex queries to the Socratic pipeline.

Refactors the original tutor_service.py to use the new PCR-gated Socratic
engine for complex queries. Simple keyword intents stay on the existing
path for efficiency. This is additive — the original service remains
untouched.

Routing logic:
  1. Simple keyword intents (greetings, navigation, simple definitions)
     → Handle directly (fast path)
  2. Complex conceptual questions, doubts, "I don't understand"
     → Delegate to SocraticEngineV2 (PCR-gated pipeline)
  3. Practice/question requests
     → Delegate to question service

Usage:
    from backend.services.tutor_service_v2 import TutorServiceV2

    tutor = TutorServiceV2()
    response = await tutor.handle_query(
        user_query="I don't understand photosynthesis",
        user_id="student_123",
        node_id="c10_bio_008",
        mastery=0.2,
    )
"""

import re
from dataclasses import dataclass
from typing import Optional

from services.socratic_engine_v2 import SocraticEngineV2, SocraticResponse


@dataclass
class TutorResponse:
    """Response from the tutor service v2."""
    text: str               # The response text (question, hint, or answer)
    hint: str               # Scaffolded hint
    feedback: str           # Encouragement
    intent: str             # Detected intent
    mastery_level: str      # low, medium, high
    hint_level: int         # 1-4
    retrieved_count: int
    revealed_count: int
    quality_score: float
    latency_ms: float
    errors: list


class TutorServiceV2:
    """Tutor service v2 with PCR-gated Socratic delegation.

    Routes queries to the appropriate handler based on intent detection:
      - Simple intents → direct response
      - Complex intents → Socratic pipeline
    """

    # Simple intent patterns (handled directly, no pipeline needed)
    SIMPLE_INTENTS = {
        "greeting": [
            re.compile(r"\b(?:hi|hello|hey|good\s+(?:morning|afternoon|evening))\b", re.I),
        ],
        "navigation": [
            re.compile(r"\b(?:go\s+to|navigate|show\s+me|take\s+me\s+to)\b", re.I),
        ],
        "help": [
            re.compile(r"\b(?:help|what\s+can\s+you\s+do|how\s+does\s+this\s+work)\b", re.I),
        ],
    }

    # Complex intent patterns (delegated to Socratic pipeline)
    COMPLEX_INTENTS = {
        "doubt": [
            re.compile(r"\b(?:i\s+don'?t\s+understand|confused|stuck|lost|help\s+me\s+with)\b", re.I),
            re.compile(r"\b(?:what\s+does\s+.*\s+mean|explain\s+.*\s+to\s+me)\b", re.I),
        ],
        "conceptual_question": [
            re.compile(r"\b(?:why|how\s+does|what\s+is\s+the\s+reason|what\s+causes)\b", re.I),
        ],
        "answer_extraction": [
            re.compile(r"\b(?:give\s+me\s+the\s+answer|just\s+tell\s+me|what\s+is\s+the\s+exact)\b", re.I),
        ],
    }

    def __init__(self):
        self.socratic_engine = SocraticEngineV2()

    async def handle_query(
        self,
        user_query: str,
        user_id: str,
        node_id: Optional[str] = None,
        mastery: float = 0.0,
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
    ) -> TutorResponse:
        """Handle a student query with appropriate routing.

        Args:
            user_query: The student's question or message.
            user_id: Student ID.
            node_id: Optional curriculum node ID.
            mastery: Current mastery probability (0-1).
            subject: Optional subject filter.
            class_level: Optional class level filter.

        Returns:
            TutorResponse with the appropriate response.
        """
        import time
        start = time.time()

        # Detect intent
        intent = self._detect_intent(user_query)

        # Route based on intent
        if intent in self.SIMPLE_INTENTS:
            # Fast path: handle simple intents directly
            text = self._handle_simple_intent(intent, user_query)
            return TutorResponse(
                text=text,
                hint="",
                feedback="",
                intent=intent,
                mastery_level="",
                hint_level=0,
                retrieved_count=0,
                revealed_count=0,
                quality_score=0.0,
                latency_ms=(time.time() - start) * 1000,
                errors=[],
            )

        # Complex path: delegate to Socratic engine
        socratic_response = await self.socratic_engine.ask(
            user_query=user_query,
            user_id=user_id,
            node_id=node_id,
            mastery=mastery,
            subject=subject,
            class_level=class_level,
        )

        return TutorResponse(
            text=socratic_response.question,
            hint=socratic_response.hint,
            feedback=socratic_response.feedback,
            intent=intent,
            mastery_level=socratic_response.mastery_level,
            hint_level=socratic_response.hint_level,
            retrieved_count=socratic_response.retrieved_count,
            revealed_count=socratic_response.revealed_count,
            quality_score=socratic_response.quality_score,
            latency_ms=(time.time() - start) * 1000,
            errors=socratic_response.errors,
        )

    def _detect_intent(self, query: str) -> str:
        """Detect the intent of a user query.

        Args:
            query: The user's query text.

        Returns:
            Intent string: greeting, navigation, help, doubt,
            conceptual_question, answer_extraction, or general.
        """
        # Check simple intents first
        for intent, patterns in self.SIMPLE_INTENTS.items():
            for pattern in patterns:
                if pattern.search(query):
                    return intent

        # Check complex intents
        for intent, patterns in self.COMPLEX_INTENTS.items():
            for pattern in patterns:
                if pattern.search(query):
                    return intent

        return "general"

    @staticmethod
    def _handle_simple_intent(intent: str, query: str) -> str:
        """Handle simple intents directly without the pipeline."""
        if intent == "greeting":
            return "Hello! I'm your AI tutor. What would you like to learn about today?"
        elif intent == "navigation":
            return "I can help you navigate. What topic or subject would you like to explore?"
        elif intent == "help":
            return ("I can help you with:\n"
                    "- Understanding concepts (just ask 'explain X')\n"
                    "- Solving problems (describe what you're stuck on)\n"
                    "- Practice questions (ask for practice on a topic)\n"
                    "- Reviewing your progress (ask 'how am I doing?')")
        return "How can I help you?"
