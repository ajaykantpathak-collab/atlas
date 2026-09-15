"""theory_rubric.py -- rubric lane for theory subjects.

History, civics/polity, geography, biology-theory and psychology
answers are not computed -- they are EVALUATED.  The student's answer
is compared against each official marking point with the same MiniLM
semantic matcher the platform already uses for variable binding
(backend.its.solver.variable_registry.embed_texts).

Deterministic once embedded; no LLM call anywhere:

    - embed the student answer ONCE
    - embed each marking point
    - a point is COVERED when cosine similarity >= 0.5
    - score = covered_points / total_points * marks
      (marks parsed from the question text, else 1 mark per point)

Returns a plain dict (tier "RUBRIC_SCORED") for the API layer.  This is
NOT a modeling-layer structure and is never registered in
modeling_layer._STRUCTURES -- theory evaluation is called directly from
the API layer, not from the computation pipeline.

Offline degrade: when the embedder is unavailable the similarity falls
back to deterministic token-overlap (Jaccard) with the same threshold;
the result carries matcher="lexical" so the API layer can flag it.
"""

from __future__ import annotations

import re
from typing import Dict, List, Optional

from backend.its.solver.variable_registry import embed_texts

COVER_THRESHOLD = 0.5
RUBRIC_TIER = "RUBRIC_SCORED"

# subjects whose marking schemes are point-lists rather than numeric
# keys -- the API layer routes these to evaluate_theory_answer
THEORY_SUBJECTS = {"history", "civics", "polity", "geography",
                   "biology", "psychology"}

_MARKS_RE = re.compile(r"(\d+(?:\.\d+)?)\s*marks?\b", re.I)
_WORD_RE = re.compile(r"[a-z]{2,}")


def _lexical_sim(student_answer: str, point: str) -> float:
    """Deterministic token-overlap (Jaccard) similarity, the offline
    degrade when the embedder is unavailable."""
    stu = set(_WORD_RE.findall(student_answer.lower()))
    pts = set(_WORD_RE.findall(point.lower()))
    union = stu | pts
    return len(stu & pts) / len(union) if union else 0.0


def evaluate_theory_answer(question: str, student_answer: str,
                           marking_points: List[str],
                           marks: Optional[float] = None) -> Dict:
    """Score a theory answer against the official marking points.

    question       the exam question (marks parsed from it when the
                   caller does not pass `marks` explicitly)
    student_answer the student's free-text answer
    marking_points the official marking-scheme points for full credit
    marks          optional total marks; default: parsed from the
                   question ("3 marks"), else 1 mark per point

    Returns {tier, score, marks, points_covered, points_missed,
             covered_count, total_points, similarities, matcher}.
    """
    points = [p.strip() for p in marking_points if p and p.strip()]
    if marks is None:
        mm = _MARKS_RE.search(question or "")
        marks = float(mm.group(1)) if mm else float(len(points))
    total = len(points)
    if total == 0 or not (student_answer or "").strip():
        return {"tier": RUBRIC_TIER, "score": 0.0, "marks": marks,
                "covered_count": 0, "total_points": total,
                "points_covered": [], "points_missed": list(points),
                "similarities": {}, "matcher": "minilm",
                "note": "empty answer or empty rubric: zero marks"}

    sims: List[float]
    matcher = "minilm"
    vecs = embed_texts([student_answer] + points)
    if vecs is not None:
        # normalized embeddings -> dot product is cosine similarity
        ans_vec, pt_vecs = vecs[0], vecs[1:]
        sims = [float(pt_vecs[i] @ ans_vec) for i in range(total)]
    else:
        matcher = "lexical"
        sims = [_lexical_sim(student_answer, p) for p in points]

    covered = [i for i, s in enumerate(sims) if s >= COVER_THRESHOLD]
    missed = [i for i in range(total) if i not in covered]
    score = len(covered) / total * marks
    return {
        "tier": RUBRIC_TIER,
        "score": round(score, 2),
        "marks": marks,
        "points_covered": [points[i] for i in covered],
        "points_missed": [points[i] for i in missed],
        "covered_count": len(covered),
        "total_points": total,
        "similarities": {p: round(s, 4) for p, s in zip(points, sims)},
        "matcher": matcher,
    }
