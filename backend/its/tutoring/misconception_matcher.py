"""ARCHIVED STUB -- superseded, do not extend.

``misconception_matcher.py`` (DB-table keyword matcher for wrong
answers) was moved to
``backend/_archive/its_tutoring_superseded/misconception_matcher.py``
on 2026-09-13.

Superseded by the LIVE misconception surfaces:

  - ``backend/its/solver/misconception_catalog.py`` (the 20-entry
    deterministic catalog used by /api/tutor-graph/*)
  - the misconception lanes of ``backend/its/tutoring/spiral_service.py``
    and ``backend/its/tutoring/socratic_pipeline_integrated.py``

BACKWARD-COMPATIBILITY SHIM: ``backend/services/tutor_service.py``
(mounted via backend/routers/tutor.py) still imports
``match_misconception`` / ``get_examiner_comments`` through the
deprecated ``backend/ai/misconception_matcher`` re-export shim.  To keep
that mounted router importable, the archived public API is preserved
here as explicit no-ops with the original safe-empty return shapes --
exactly what the real module returned when the misconception tables are
empty.  New code must import the live surfaces above instead.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any, Optional

logger = logging.getLogger(__name__)
_WARNED = False


def _warn_once() -> None:
    global _WARNED
    if not _WARNED:
        _WARNED = True
        logger.warning(
            "backend.its.tutoring.misconception_matcher is ARCHIVED "
            "(backend/_archive/its_tutoring_superseded/); returning "
            "empty results. Use its/solver/misconception_catalog.py.")


@dataclass
class MisconceptionEntry:
    """Shape-preserved record; archived module no longer produces these."""
    misconception_text: str = ""
    target_nodes: list = field(default_factory=list)
    why_wrong: str = ""
    correction: str = ""
    subject: str = ""
    class_levels: list = field(default_factory=list)
    source_title: str = ""


@dataclass
class MisconceptionMatch:
    """Archived matcher answer: always "no match" (the original
    module's own response to empty misconception tables)."""
    matched: bool = False
    misconception: Optional[MisconceptionEntry] = None
    similarity: float = 0.0
    feedback: str = ""


async def match_misconception(db: Any, student_answer: str,
                              node_id: str = "", subject: str = "",
                              class_level: int = 0) -> MisconceptionMatch:
    """Archived no-op: never matches.  Callers treat this exactly like
    an empty misconception table (tutor_service wraps it in
    try/except as a nice-to-have)."""
    _warn_once()
    return MisconceptionMatch(matched=False, feedback="")


async def get_examiner_comments(db: Any, subject: str = "",
                                class_level: int = 0) -> list:
    """Archived no-op: no examiner comments available."""
    _warn_once()
    return []


async def get_remediation_path(db: Any, subject: str = "",
                               node_id: str = "") -> None:
    """Archived no-op: no remediation paths available."""
    _warn_once()
    return None
