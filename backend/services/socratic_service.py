"""socratic_service.py -- service-layer wrapper for the Socratic engine.

Routers and api modules must reach solver code through backend.services.*
(boundaries rule ROUTER_DIRECT_SOLVER); this thin wrapper is the sanctioned
seam for its.solver.socratic_moves.  Lazy imports keep api/practice.py's
module load light.  Stateless by design: the dialogue is deterministic
from its inputs, so no session storage lives here.
"""
from __future__ import annotations

from typing import Any, Dict, Optional, Tuple


def build_sequence(
    misconception_id: Optional[str],
    student_answer: str,
    question_text: str,
    correct_answer: str,
) -> Any:
    from backend.its.solver.socratic_moves import build_sequence as _build
    return _build(misconception_id, student_answer, question_text,
                  correct_answer)


def grade_move(
    sequence: Any,
    move_id: str,
    student_response: str,
) -> Tuple[bool, str, Optional[str]]:
    from backend.its.solver.socratic_moves import grade_move as _grade
    return _grade(sequence, move_id, student_response)


def sequence_payload(sequence: Any) -> Dict[str, Any]:
    from backend.its.solver.socratic_moves import SocraticSequence
    assert isinstance(sequence, SocraticSequence)
    return sequence.payload()
