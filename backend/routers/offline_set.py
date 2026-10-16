"""offline_set.py — GET /api/offline-set/{node_id} (Wave 9.8 L6).

One small, cacheable payload per chapter: up to 10 ``board_questions``
rows tagged to the node, shaped exactly like the questions
``/api/practice/start`` ships (``corpus:<uuid>`` ids — the same prefix
``api/practice._get_question`` resolves when an offline answer flushes
back through ``/api/sync/answer``).

Rules this route keeps:

- **No answer-bearing fields ever leave the backend.**  ``correct_answer``
  / ``model_answer`` / ``explanation`` / ``marking_scheme`` are stripped —
  same honesty boundary as ``paper_mode.build_paper``.  Offline answers
  are queued ungraded and re-graded on sync; the client only learns
  ``has_marking_scheme`` so it can promise a board-scheme verdict on
  reconnect, never the scheme itself.
- **No auth required** — the payload is chapter content (public like the
  paper catalog); whatever session cookie is present simply rides along.
- **Node id is an opaque fetch key**, never display text — the response
  carries it back for cache keying only (accepted-by-design, same as
  ``/learn/<id>``).
- **No LLM, no solver** — one indexed query, ~10 rows.

The service worker (``public/sw.js``) treats ``/api/offline-set/*`` as
cache-first with a background refresh: a fire-and-forget fetch on chapter
open pins the set; on 2G/airplane mode the same GET serves the pinned
copy so practice still runs.
"""

from __future__ import annotations

import logging
import re
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import cast as sa_cast, select as sa_select, String as sa_String
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.models.enrichment import BoardQuestion, BoardQuestionFlag
from backend.services import paper_mode_service as pms

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/offline-set", tags=["offline-set"])

_SET_SIZE = 10
# Corpus node ids (c10_bio_cbse_01_001…) — anything else is a bad fetch key,
# reported as 404 like an unknown node (no existence oracle beyond "no set").
_NODE_ID_RE = re.compile(r"^c\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{1,2}_\d{1,3}$",
                         re.IGNORECASE)


def _question_payload(row: Any) -> Dict[str, Any]:
    """Strip the answer-bearing bank fields; ship the practice-page shape."""
    qid = f"corpus:{row.id}"
    qtype = (getattr(row, "question_type", "") or "").lower()
    chapter = pms._display_chapter(getattr(row, "chapter", None))
    subject_code = (getattr(row, "subject", "") or "").lower()
    payload: Dict[str, Any] = {
        # practice page reads q.id || q.question_id, q.text || q.question_text
        "id": qid,
        "question_id": qid,
        "text": pms._scrub_node_ids(getattr(row, "question_text", "") or ""),
        "question_type": qtype,
        "subject": subject_code,
        "subject_label": pms.subject_label(subject_code),
        "class_level": getattr(row, "class_level", None),
        "topic": chapter or "this chapter",
        "chapter": chapter,
        "difficulty": getattr(row, "difficulty", None) or "medium",
        "marks": int(getattr(row, "marks", 1) or 1),
        "year": getattr(row, "year", None),
        # opaque fetch key — never rendered as display text
        "node_id": (row.node_tags or [None])[0],
        # the honest promise: a board marking scheme exists for this row
        # and the synced verdict will be marked against it — the scheme
        # itself never leaves the backend.
        "has_marking_scheme": bool(
            (getattr(row, "marking_scheme", None) or "").strip()),
    }
    if pms._is_mcq(qtype, getattr(row, "options", None)):
        payload["options"] = pms._flat_options(getattr(row, "options", None))
    else:
        payload["options"] = []
    return payload


@router.get("/{node_id}")
async def offline_set(
    node_id: str,
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Up to 10 board questions tagged to this node — no keys, cacheable."""
    nid = (node_id or "").strip()
    if not _NODE_ID_RE.match(nid):
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="no offline set for this node")

    q = (sa_select(BoardQuestion)
         .where(sa_cast(BoardQuestion.node_tags, sa_String)
                .ilike(f'%"{nid}"%'))
         .where(BoardQuestion.board != pms.QUARANTINED_BOARD)
         .where(~BoardQuestion.id.in_(
             sa_select(BoardQuestionFlag.question_id)))
         .order_by(BoardQuestion.question_number.is_(None),
                   BoardQuestion.question_number,
                   BoardQuestion.created_at)
         .limit(_SET_SIZE))
    rows: List[Any] = (await db.execute(q)).scalars().all()
    if not rows:
        raise HTTPException(status.HTTP_404_NOT_FOUND,
                            detail="no offline set for this node")

    questions = [_question_payload(r) for r in rows]
    return {
        "node_id": nid,
        "count": len(questions),
        "questions": questions,
        # honesty note for the offline banner: ids are fetch keys; the
        # answer key stays server-side and verdicts land on sync.
        "note": "saved chapter set — answers sync and are marked when "
                "you're back online",
    }
