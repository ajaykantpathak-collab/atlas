"""Marking-scheme answer coaching (CBSE board classes).

Every board_question row carries an authored `marking_scheme` — a list
of "- Step N: <rubric point>" lines describing what earns marks — plus
the question's `marks` total. This service scores a free-text student
answer against those steps:

    marks_awarded = marks * (steps_hit / steps_total)

Step coverage is judged by MiniLM cosine similarity between the rubric
line and the student's answer (same grading infrastructure as practice
/ diagnostics — no LLM involved, nothing generated).
"""
from __future__ import annotations

import logging
import re
from typing import Any, Optional

logger = logging.getLogger(__name__)

# A step counts as covered when the answer's similarity to the rubric
# line clears this bar — deliberately on the strict side so partial
# credit only lands for genuinely covered points.
_STEP_HIT_THRESHOLD = 0.45
_STEP_LINE_RE = re.compile(r"^\s*[-•*]?\s*(?:step\s*)?(\d+)\s*[:.)-]\s*(.+)$",
                           re.IGNORECASE | re.MULTILINE)


def parse_marking_steps(scheme_text: str) -> list[str]:
    """Split a marking_scheme blob into rubric step strings."""
    if not scheme_text or not isinstance(scheme_text, str):
        return []
    steps = [m.group(2).strip() for m in _STEP_LINE_RE.finditer(scheme_text)]
    if steps:
        return steps
    # Fallback: bullet lines without "Step N" prefixes
    bullets = [
        ln.strip().lstrip("-•*").strip()
        for ln in scheme_text.splitlines()
        if ln.strip().lstrip("-•*").strip()
    ]
    return [b for b in bullets if len(b) > 15]


async def evaluate_against_scheme(
    answer: str,
    scheme_text: str,
    marks: int,
) -> Optional[dict[str, Any]]:
    """Score `answer` against a marking scheme. Returns None when the
    scheme is unusable or the embedder is unavailable."""
    steps = parse_marking_steps(scheme_text)
    if not steps or not marks:
        return None
    answer = (answer or "").strip()
    if len(answer) < 3:
        return {
            "marks_awarded": 0,
            "max_marks": marks,
            "steps": [{"text": s, "hit": False} for s in steps],
            "steps_hit": 0,
            "steps_total": len(steps),
        }
    try:
        from backend.ai import model_hub

        model = await model_hub.get_embedder()
        import asyncio

        loop = asyncio.get_event_loop()
        texts = steps + [answer]
        vecs = await loop.run_in_executor(
            None,
            lambda: model.encode(texts, convert_to_numpy=True,
                                 show_progress_bar=False),
        )
        import numpy as np

        step_vecs = vecs[:-1]
        ans_vec = vecs[-1]
        norms = np.linalg.norm(step_vecs, axis=1) * np.linalg.norm(ans_vec)
        sims = (step_vecs @ ans_vec) / np.maximum(norms, 1e-8)
    except Exception as exc:
        logger.warning("marking_coach embed failed: %s", exc)
        return None

    hits = sims >= _STEP_HIT_THRESHOLD
    hit_count = int(hits.sum())
    awarded = round(marks * hit_count / len(steps))
    return {
        "marks_awarded": awarded,
        "max_marks": marks,
        "steps": [
            {"text": s, "hit": bool(h)} for s, h in zip(steps, hits)
        ],
        "steps_hit": hit_count,
        "steps_total": len(steps),
    }
