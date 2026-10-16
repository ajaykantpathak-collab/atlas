"""competitive_ladder.py -- Fast, Zero-Token Serving API for NEET UG,
JEE Main, JEE Advanced, and Olympiad/Paradox 3-Rung Pedagogical Ladders.

Database source: runtime_data/neet_ladder_bank.db (Isolated from CBSE question_bank.db)
Serving Endpoints:
  GET  /api/competitive/ladder/catalog
  GET  /api/competitive/ladder/items?exam=&subject=&class_label=&limit=
  GET  /api/competitive/ladder/item/{id}
  GET  /api/competitive/ladder/random?exam=&subject=
  POST /api/competitive/ladder/evaluate
"""

from __future__ import annotations

import os
import sqlite3
import logging
from typing import Optional, List, Dict, Any
from pathlib import Path

from fastapi import APIRouter, Query, HTTPException, status
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/competitive/ladder", tags=["competitive-ladder"])

_REPO_ROOT = Path(__file__).resolve().parents[2]
DB_PATH = os.path.join(r"D:\platform\runtime_data", "neet_ladder_bank.db")
if not os.path.exists(DB_PATH):
    # Fallback to runtime_data in repo root
    DB_PATH = str(_REPO_ROOT / "runtime_data" / "neet_ladder_bank.db")


def _get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=10.0)
    conn.row_factory = sqlite3.Row
    return conn


class EvaluateRequest(BaseModel):
    item_id: int
    selected_option: str = Field(..., description="Selected option: 'A', 'B', 'C', or 'D'")


@router.get("/catalog")
def get_ladder_catalog():
    """Returns summary of available competitive ladder rungs by exam, subject, and class."""
    if not os.path.exists(DB_PATH):
        return {"total_items": 0, "categories": []}

    try:
        conn = _get_db()
        cur = conn.cursor()
        cur.execute("""
            SELECT exam_type, subject, class_label, count(*) as count, sum(pal_verified) as pal_verified
            FROM ladder_questions
            GROUP BY exam_type, subject, class_label
            ORDER BY exam_type, subject, class_label
        """)
        rows = [dict(r) for r in cur.fetchall()]
        cur.execute("SELECT count(*) FROM ladder_questions")
        total = cur.fetchone()[0]
        conn.close()
        return {"total_items": total, "categories": rows}
    except Exception as exc:
        logger.warning("Failed to fetch ladder catalog: %s", exc)
        return {"total_items": 0, "categories": [], "error": str(exc)}


@router.get("/items")
def get_ladder_items(
    exam: Optional[str] = Query(None, description="e.g. 'NEET', 'JEE Main', 'JEE Advanced', 'Olympiad'"),
    subject: Optional[str] = Query(None, description="Physics, Chemistry, Biology, Mathematics"),
    class_label: Optional[str] = Query(None, description="'11' or '12'"),
    limit: int = Query(20, ge=1, le=100)
):
    """Fetch practice items with full 3-rung ladder pedagogy.
    Answer solution is withheld until /evaluate is called.
    """
    if not os.path.exists(DB_PATH):
        return {"items": [], "total": 0}

    query = """
        SELECT id, exam_type, subject, topic, difficulty, class_label,
               ncert_foundation, neet_gap_concept, text, variants_count, pal_verified
        FROM ladder_questions
        WHERE 1=1
    """
    params = []

    if exam:
        query += " AND exam_type LIKE ?"
        params.append(f"%{exam}%")
    if subject:
        query += " AND subject LIKE ?"
        params.append(f"%{subject}%")
    if class_label:
        query += " AND class_label = ?"
        params.append(class_label)

    query += " ORDER BY id DESC LIMIT ?"
    params.append(limit)

    try:
        conn = _get_db()
        cur = conn.cursor()
        cur.execute(query, tuple(params))
        items = []
        for r in cur.fetchall():
            row = dict(r)
            items.append({
                "id": row["id"],
                "exam_type": row["exam_type"],
                "subject": row["subject"],
                "topic": row["topic"],
                "class_label": row["class_label"],
                "ladder": {
                    "rung_1_ncert_foundation": row.get("ncert_foundation") or "Core NCERT Board Syllabus Concept",
                    "rung_2_gap_nuance": row.get("neet_gap_concept") or "Competitive Boundary Condition & Trap",
                    "rung_3_problem": row["text"]
                },
                "pal_verified": bool(row["pal_verified"]),
                "variants_count": row["variants_count"]
            })
        conn.close()
        return {"items": items, "count": len(items)}
    except Exception as exc:
        logger.warning("Failed to fetch ladder items: %s", exc)
        return {"items": [], "count": 0, "error": str(exc)}


@router.get("/item/{item_id}")
def get_ladder_item(item_id: int):
    """Fetch single ladder item by ID with 3-rung pedagogy (answer withheld)."""
    if not os.path.exists(DB_PATH):
        raise HTTPException(status_code=404, detail="Ladder database not found")

    conn = _get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, exam_type, subject, topic, difficulty, class_label,
               ncert_foundation, neet_gap_concept, text, variants_count, pal_verified
        FROM ladder_questions WHERE id = ?
    """, (item_id,))
    row = cur.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Ladder question not found")

    r = dict(row)
    return {
        "id": r["id"],
        "exam_type": r["exam_type"],
        "subject": r["subject"],
        "topic": r["topic"],
        "class_label": r["class_label"],
        "ladder": {
            "rung_1_ncert_foundation": r.get("ncert_foundation") or "Core NCERT Board Syllabus Concept",
            "rung_2_gap_nuance": r.get("neet_gap_concept") or "Competitive Boundary Condition & Trap",
            "rung_3_problem": r["text"]
        },
        "pal_verified": bool(r["pal_verified"]),
        "variants_count": r["variants_count"]
    }


@router.get("/random")
def get_random_ladder_item(
    exam: Optional[str] = Query(None),
    subject: Optional[str] = Query(None)
):
    """Get a random competitive ladder challenge."""
    if not os.path.exists(DB_PATH):
        raise HTTPException(status_code=404, detail="Ladder database not found")

    query = "SELECT id FROM ladder_questions WHERE 1=1"
    params = []
    if exam:
        query += " AND exam_type LIKE ?"
        params.append(f"%{exam}%")
    if subject:
        query += " AND subject LIKE ?"
        params.append(f"%{subject}%")
    query += " ORDER BY RANDOM() LIMIT 1"

    conn = _get_db()
    cur = conn.cursor()
    cur.execute(query, tuple(params))
    row = cur.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="No matching ladder questions found")

    return get_ladder_item(row[0])


@router.post("/evaluate")
def evaluate_ladder_answer(req: EvaluateRequest):
    """Verify student answer, reveal official solution, derivation steps, and PAL proof."""
    if not os.path.exists(DB_PATH):
        raise HTTPException(status_code=404, detail="Ladder database not found")

    conn = _get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT id, correct_option, solution, pal_verified, ncert_foundation, neet_gap_concept
        FROM ladder_questions WHERE id = ?
    """, (req.item_id,))
    row = cur.fetchone()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Question not found")

    r = dict(row)
    official_opt = (r.get("correct_option") or "").strip().upper()[:1]
    student_opt = req.selected_option.strip().upper()[:1]

    is_correct = (student_opt == official_opt) if official_opt else False

    return {
        "item_id": r["id"],
        "is_correct": is_correct,
        "student_option": student_opt,
        "correct_option": official_opt,
        "pal_verified": bool(r["pal_verified"]),
        "pedagogy": {
            "ncert_foundation": r.get("ncert_foundation", ""),
            "gap_concept": r.get("neet_gap_concept", ""),
            "solution_derivation": r.get("solution", "")
        }
    }
