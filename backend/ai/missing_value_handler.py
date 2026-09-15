"""Missing value handler.

When a structural pattern matches but required variables are missing,
this module generates a clarification question for the student.

This is critical: we NEVER guess or use defaults. We ask.
"""

import logging
from typing import Optional

from backend.ai.nlp_parser import parse_question
from backend.ai.structural_patterns import ALL_PATTERNS, PatternResult
from backend.ai.compute_types import ComputeResult

logger = logging.getLogger(__name__)


def check_missing(question: str) -> Optional[ComputeResult]:
    """Check if a question matches a pattern but has missing variables.
    
    Returns a ComputeResult with a clarification question if so.
    Returns None if no pattern matches or all variables are present.
    """
    parsed = parse_question(question)
    
    for pattern in ALL_PATTERNS:
        try:
            if pattern.match(parsed):
                result = pattern.extract(parsed, question)
                
                if result.matched and result.missing:
                    # Build clarification message
                    missing_vars = list(result.missing.keys())
                    questions = [result.missing[v] for v in missing_vars]
                    
                    clarification = (
                        f"I can solve this as a {result.concept.replace('_', ' ')} problem, "
                        f"but I need more information:\n\n"
                    )
                    for q in questions:
                        clarification += f"• {q}\n"
                    
                    clarification += f"\nPlease provide these values and I'll solve it for you."
                    
                    return ComputeResult(
                        matched=False,
                        question_type="clarification",
                        answer=clarification,
                        steps=[f"Detected concept: {result.concept}", f"Missing: {missing_vars}"],
                    )
        except Exception as e:
            logger.warning(f"Missing check failed for {pattern.concept}: {e}")
            continue
    
    return None
