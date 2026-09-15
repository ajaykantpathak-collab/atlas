"""Conceptual handler.

Routes conceptual questions (why, explain, what is, justify) to verified
enrichment content from the database instead of asking an LLM.

Intent mapping:
- "What is..." → definition
- "Why..." / "justify..." → text_walkthrough
- "Explain simply..." → eli5
- "What mistake..." → common_misconception
- "Help me with..." → on_failure
"""

import logging
from typing import Optional

from backend.ai.nlp_parser import parse_question, ParsedQuestion
from backend.ai.compute_types import ComputeResult

logger = logging.getLogger(__name__)


# Intent → enrichment field mapping
INTENT_FIELD_MAP = {
    "what_is": "definition",
    "why": "text_walkthrough",
    "justify": "text_walkthrough",
    "explain": "text_walkthrough",
    "eli5": "eli5",
    "simple": "eli5",
    "misconception": "common_misconception",
    "mistake": "common_misconception",
    "failure": "on_failure",
    "diagnostic": "diagnostic_questions",
    "scope": "scope_boundary",
}


def detect_intent(parsed: ParsedQuestion) -> str:
    """Detect the intent of a conceptual question."""
    lower = parsed.raw.lower()
    
    if "eli5" in lower or "explain like i'm 5" in lower or "simple terms" in lower or "simply" in lower:
        return "eli5"
    if "misconception" in lower or "common mistake" in lower or "what mistake" in lower:
        return "misconception"
    if "scope" in lower or "boundary" in lower or "limitation" in lower:
        return "scope"
    if "diagnostic" in lower:
        return "diagnostic"
    if "why" in lower or "justify" in lower:
        return "why"
    if "explain" in lower:
        return "explain"
    if "what is" in lower or "what are" in lower or "what does" in lower or "define" in lower:
        return "what_is"
    if "difference between" in lower:
        return "what_is"
    
    return "what_is"


async def handle_conceptual(
    parsed: ParsedQuestion,
    db=None,
    subject_filter: str = None,
    class_filter: str = None,
) -> Optional[ComputeResult]:
    """Handle a conceptual question by routing to enrichment content.
    
    Args:
        parsed: The parsed question
        db: Optional database session for enrichment lookup
        subject_filter: Subject to filter by
        class_filter: Class to filter by
    
    Returns:
        ComputeResult with enrichment content, or None if not available
    """
    intent = detect_intent(parsed)
    field = INTENT_FIELD_MAP.get(intent, "definition")
    
    # Extract the key concept from the question
    concept = _extract_concept(parsed)
    
    if not concept:
        return None
    
    # Try to fetch enrichment from database
    if db is not None:
        try:
            content = await _fetch_enrichment(db, concept, field, subject_filter, class_filter)
            if content:
                return ComputeResult(
                    matched=True,
                    question_type="conceptual",
                    answer=content,
                    steps=[f"Intent: {intent}", f"Concept: {concept}", f"Field: {field}"],
                )
        except Exception as e:
            logger.warning(f"Enrichment fetch failed: {e}")
    
    # No database available - return a structured placeholder
    return ComputeResult(
        matched=False,
        question_type="conceptual",
        answer=f"This is a conceptual question about '{concept}'. "
              f"Intent detected: {intent}. "
              f"Enrichment field needed: {field}. "
              f"Connect to database for verified content.",
        steps=[f"Intent: {intent}", f"Concept: {concept}", f"Field: {field}"],
    )


def _extract_concept(parsed: ParsedQuestion) -> str:
    """Extract the main concept from a conceptual question."""
    # Use math terms if available
    if parsed.math_terms:
        return parsed.math_terms[0]
    if parsed.physics_terms:
        return parsed.physics_terms[0]
    if parsed.chem_terms:
        return parsed.chem_terms[0]
    if parsed.bio_terms:
        return parsed.bio_terms[0]
    
    # Try to extract from "what is X" pattern
    import re
    m = re.search(r'what is\s+(?:the\s+)?([a-z\s]+?)[\?\.]', parsed.raw.lower())
    if m:
        return m.group(1).strip()
    
    m = re.search(r'explain\s+(?:the\s+)?([a-z\s]+?)[\?\.]', parsed.raw.lower())
    if m:
        return m.group(1).strip()
    
    m = re.search(r'why\s+(?:is\s+|are\s+|does\s+)?([a-z\s]+?)[\?\.]', parsed.raw.lower())
    if m:
        return m.group(1).strip()
    
    # Fallback: use keywords
    if parsed.keywords:
        return " ".join(parsed.keywords[:3])
    
    return ""


async def _fetch_enrichment(db, concept: str, field: str, subject_filter: str, class_filter: str) -> Optional[str]:
    """Fetch enrichment content from database.
    
    This uses the existing routing/enrichment infrastructure.
    """
    # Import here to avoid circular imports
    try:
        from backend.services.routing_service import RoutingService
        from backend.database.marker_parser import get_enrichment_for_node
        
        # Route to find the right node
        router = RoutingService()
        node = await router.route(
            db,
            concept,
            subject_filter=subject_filter,
            class_filter=class_filter,
        )
        
        if node:
            # Fetch enrichment field
            enrichment = await get_enrichment_for_node(db, node.id, field)
            return enrichment
    except Exception as e:
        logger.warning(f"Enrichment fetch error: {e}")
    
    return None
