"""examiner_mode.py — grade a student's answer against the corpus node's
MARKING_POINTS, returning a per-point mark breakdown + what was missing
(the CopyWorthy diff).

Closed-world: the marking scheme comes from the authored corpus node file
in cisce_nodes_v2 (COMPETENCY_QUESTION_* / CISCE_BOARD_* MARKING_POINTS
lines). Text extraction from an image is delegated to the existing vision
surface when available; otherwise the caller supplies transcribed text.
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

CORPUS = Path("D:/platform/deploy/content/cisce_nodes_v2")


def _load_node(node_id: str) -> Optional[str]:
    for base in (CORPUS, CORPUS.parent / "content" / "cisce_nodes_v2"):
        p = base / f"{node_id}.md"
        if p.exists():
            try:
                return p.read_text(encoding="utf-8")
            except Exception:
                return None
    return None


def _marking_points(node_text: str) -> List[Dict[str, Any]]:
    """Collect MARKING_POINTS bullet lines from COMPETENCY/BOARD sections,
    each with its question context and max marks."""
    points: List[Dict[str, Any]] = []
    # competency questions
    for cq in re.finditer(
            r"## COMPETENCY_QUESTION_(\d+)\n(.*?)(?=\n## )", node_text, re.S):
        qn, body = cq.group(1), cq.group(2)
        qmatch = re.search(r"QUESTION:\s*(.+)", body)
        marks_m = re.search(r"DIFFICULTY:\s*(\w+)", body)
        for mp in re.finditer(r"[-•]\s*(.+?)\s*\((\d+)\s*mark", body):
            points.append({
                "source": f"COMPETENCY_QUESTION_{qn}",
                "question": (qmatch.group(1)[:200] if qmatch else ""),
                "criterion": mp.group(1).strip(),
                "max_marks": int(mp.group(2)),
            })
        _ = marks_m
    # board questions
    for bq in re.finditer(
            r"## CISCE_BOARD_QUESTION_(\d+)\n(.*?)(?=\n## CISCE_BOARD_MODEL_ANSWER_\1\n)(.*?)(?=\n## CISCE_BOARD_MARKING_SCHEME_\1\n)(.*?)(?=\n## )",
            node_text, re.S):
        qn, qbody, _, scheme = bq.group(1), bq.group(2), bq.group(3), bq.group(4)
        qhead = re.search(r"([A-Z ]+\.*)\s*\((\d+)\s*marks?\):?\s*(.+)", qbody)
        for mp in re.finditer(r"([^.;\n]+?)\s*\((\d+)\s*mark", scheme):
            points.append({
                "source": f"CISCE_BOARD_QUESTION_{qn}",
                "question": (qhead.group(3)[:200] if qhead else ""),
                "criterion": mp.group(1).strip(),
                "max_marks": int(mp.group(2)),
            })
    return points


def _tokens(text: str) -> set:
    return set(re.findall(r"[a-z0-9°²³⁺⁻]{2,}", (text or "").lower()))


def _point_scored(criterion: str, answer_tokens: set) -> Tuple[bool, float]:
    """A marking point scores when enough of its content tokens appear in
    the student's answer. Deterministic keyword-overlap — never an LLM."""
    crit_tokens = {t for t in _tokens(criterion)
                   if t not in {"the", "and", "for", "with", "of", "in", "to",
                                "a", "an", "is", "are", "or", "by", "on",
                                "correct", "answer", "marks", "mark"}}
    if not crit_tokens:
        return True, 1.0
    overlap = crit_tokens & answer_tokens
    score = len(overlap) / len(crit_tokens)
    return score >= 0.4, round(score, 2)


def grade_answer(
    node_id: str,
    student_text: str,
    image_text: Optional[str] = None,
) -> Dict[str, Any]:
    """Grade `student_text` (or text extracted from the photo) against the
    node's marking points. Returns per-point breakdown + total + the diff
    (what a board examiner would have wanted that the answer missed)."""
    node_text = _load_node(node_id)
    if node_text is None:
        return {"error": f"node {node_id} not found in corpus",
                "graded": False}

    answer = (student_text or "") + "\n" + (image_text or "")
    tokens = _tokens(answer)
    points = _marking_points(node_text)
    if not points:
        return {"error": "no MARKING_POINTS found in this node",
                "graded": False, "node_id": node_id}

    breakdown: List[Dict[str, Any]] = []
    total = 0
    max_total = 0
    missed: List[str] = []
    for pt in points:
        scored, conf = _point_scored(pt["criterion"], tokens)
        awarded = pt["max_marks"] if scored else 0
        total += awarded
        max_total += pt["max_marks"]
        if not scored:
            missed.append(pt["criterion"])
        breakdown.append({
            "criterion": pt["criterion"],
            "max_marks": pt["max_marks"],
            "awarded": awarded,
            "confidence": conf,
            "source": pt["source"],
        })

    pct = round(total / max_total * 100, 1) if max_total else 0.0
    grade = ("A" if pct >= 90 else "B" if pct >= 75 else "C" if pct >= 60
             else "D" if pct >= 45 else "E")
    return {
        "graded": True,
        "node_id": node_id,
        "total": total,
        "max_total": max_total,
        "percentage": pct,
        "grade": grade,
        "breakdown": breakdown,
        "copyworthy_diff": {
            "what_was_missing": missed,
            "verdict": ("board-ready" if pct >= 90 else
                        "solid, tighten the missed points" if pct >= 60 else
                        "re-learn the missed marking points before the exam"),
        },
    }
