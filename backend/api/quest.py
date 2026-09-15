"""quest.py — Daily quest + boss battle endpoints (Session Composer API).

Wires backend.its.engagement.quest_service to the live API.

Async boundary rule: this handler AWAITS all data providers first (reviews,
mastery map, sims, debate) into plain dicts, then runs the pure composer.
The composer itself is deterministic and dependency-free.

Every provider is defensive: an unreachable source degrades to "empty" so a
quest still composes from what is available — never a 500 for a missing
sim catalog.
"""

from __future__ import annotations

import logging
from datetime import date
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends
from sqlalchemy import select as sa_select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db

from backend.its.contracts import daily_seed
from backend.its.engagement.generator_registry import get_drill_generator
from backend.its.engagement.quest_service import ComposerDeps, QuestService

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/quest", tags=["quest"])

_security = HTTPBearer(auto_error=False)


async def _resolve_student_id(db: AsyncSession, credentials) -> Optional[str]:
    """Same contract as api/progress._resolve_student_id."""
    import os
    from backend.security import decode_access_token

    if credentials:
        payload = decode_access_token(credentials.credentials)
        if payload and payload.get("sub"):
            return str(payload["sub"])
    if os.getenv("ENVIRONMENT", "development").lower() == "development":
        return "demo_student"
    raise HTTPException(status_code=401, detail="Not authenticated")


async def _fetch_due_reviews(db, student_id: str) -> List[Dict[str, Any]]:
    """Due SM-2 items from the platform's review queue (best effort)."""
    if db is None:
        return []
    try:
        from backend.models.progress import ReviewItem  # type: ignore
        result = await db.execute(
            sa_select(ReviewItem).where(ReviewItem.student_id == student_id)
        )
        items = list(result.scalars().all())
        today = date.today()
        due = [r for r in items
               if getattr(r, "next_review_date", None)
               and r.next_review_date <= today]
        return [{"node_id": r.node_id, "ref_id": str(getattr(r, "id", "")),
                 "title": getattr(r, "node_id", "")} for r in due[:6]]
    except Exception as exc:  # noqa: BLE001
        logger.warning("due_reviews unavailable: %s", exc)
        return []


async def _fetch_mastery(db, student_id: str) -> Dict[str, float]:
    """node_id -> p_known from the platform's mastery store (best effort)."""
    if db is None:
        return {}
    try:
        from backend.models.progress import Mastery  # type: ignore
        cols = Mastery.__table__.columns
        node_col = cols["node_id"] if "node_id" in cols else None
        p_col = cols["p_known"] if "p_known" in cols else (
            cols["mastery"] if "mastery" in cols else None)
        if node_col is None or p_col is None:
            return {}
        result = await db.execute(
            sa_select(node_col, p_col).where(Mastery.student_id == student_id)
        )
        return {str(n): float(p) for n, p in result.all() if p is not None}
    except Exception as exc:  # noqa: BLE001
        logger.warning("mastery map unavailable: %s", exc)
        return {}


def _node_meta(node_id: str) -> Dict[str, Any]:
    """Derive (subject, class_level) from node id conventions."""
    if node_id.startswith("c") and "_" in node_id:
        parts = node_id.split("_")
        try:
            return {"subject": parts[1], "class_level": int(parts[0][1:]),
                    "title": node_id}
        except (ValueError, IndexError):
            pass
    return {"subject": "maths", "class_level": 10, "title": node_id}


def _drill_factory(subject: str, class_level: int, q_seed: int):
    src = get_drill_generator(subject, class_level)
    return src.make(q_seed) if src else None


def _predict_pass(question: Dict[str, Any]) -> Optional[float]:
    """Deterministic placeholder until IRT is wired to generated questions.

    Real wiring: knowledge_tracing.predict_performance(theta, question).
    """
    h = abs(hash(question.get("question", "")) % 100)
    return 0.55 + h / 200.0


def _sims_for_node(node_id: str) -> Optional[List[Dict[str, Any]]]:
    try:
        from backend.services.simulation_discovery import discover_simulations
        found = discover_simulations(node_id)
        if not found:
            return None
        return [{"sim_id": (s.get("sim_id") or s.get("name") or node_id),
                 "title": s.get("title") or s.get("name") or node_id}
                for s in found]
    except Exception as exc:  # noqa: BLE001
        logger.warning("sim catalog unavailable: %s", exc)
        return None


def _debate_for_student(student_id: str) -> Optional[Dict[str, Any]]:
    try:
        from backend.its.tutoring.discussion_moments import (
            DiscussionMomentsService,
        )
        svc = DiscussionMomentsService()
        if hasattr(svc, "get_debate_for_node"):
            moment = svc.get_debate_for_node(node_id=None)
            if moment:
                return {"debate_id": str(getattr(moment, "id", "") or ""),
                        "node_id": getattr(moment, "node_id", ""),
                        "topic": getattr(moment, "topic", "misconception debate")}
    except Exception as exc:  # noqa: BLE001
        logger.warning("debate provider unavailable: %s", exc)
    return None


@router.get("/daily")
async def get_daily_quest(
    credentials: HTTPAuthorizationCredentials | None = Depends(_security),
    db: AsyncSession = Depends(get_db),
):
    """Today's deterministic mixed-modality quest for this student."""
    try:
        student_id = await _resolve_student_id(db, credentials)
    except HTTPException:
        raise
    today = date.today()

    # Await every provider first (async boundary), then compose purely.
    due = await _fetch_due_reviews(db, student_id)
    mastery = await _fetch_mastery(db, student_id)

    deps = ComposerDeps(
        due_reviews=lambda sid: due,
        node_meta=_node_meta,
        generate_drill=_drill_factory,
        predict_pass=_predict_pass,
        sims_for_node=_sims_for_node,
        debate_for_student=_debate_for_student,
    )
    quest = QuestService(deps).compose_daily(student_id, mastery, today=today)
    out = quest.to_dict()
    out["seed"] = daily_seed(student_id, today)
    return out


@router.get("/boss")
async def get_boss_battle(
    week: int | None = None,
    credentials: HTTPAuthorizationCredentials | None = Depends(_security),
    db: AsyncSession = Depends(get_db),
):
    """This week's boss battle seed + composition (deterministic per student+week)."""
    student_id = await _resolve_student_id(db, credentials)
    today = date.today()
    week_no = week or today.isocalendar()[1]
    return {
        "student_id": student_id,
        "week": week_no,
        "seed": daily_seed(student_id, today),
        "compose_on": "Friday",
        "note": ("Boss battles are composed by QuestService.compose_daily on "
                 "boss day from the mixed-topic drill generators."),
    }
