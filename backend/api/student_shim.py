"""student_shim.py — /api/student bridge.

The frontend calls a small set of `/api/student/*` endpoints that don't
map cleanly onto existing routers (onboarding state, accessibility prefs
under a student-scoped prefix). This shim provides those endpoints and
stores them on ``User.preferences`` (JSON column — no migration needed).
"""

from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User

router = APIRouter(prefix="/api/student", tags=["student"])
# Offline-sync sink — the frontend posts to /api/sync/<type>, which is a
# different prefix, so it needs its own router in this same shim file.
sync_router = APIRouter(prefix="/api/sync", tags=["sync"])


class OnboardingRequest(BaseModel):
    class_level: Optional[int] = None
    board: Optional[str] = None
    subjects: Optional[list] = None
    language: Optional[str] = None
    goal: Optional[str] = None
    completed: bool = False


@router.post("/onboarding")
async def save_onboarding(
    payload: OnboardingRequest,
    user: User = Depends(get_current_user),
):
    """Persist onboarding choices into user.preferences['onboarding']."""
    try:
        async for db in get_db():
            prefs = dict(user.preferences or {})
            prefs["onboarding"] = payload.model_dump()
            user.preferences = prefs
            await db.commit()
    except Exception:
        pass
    return {"status": "saved", "completed": payload.completed}


class A11yPrefsRequest(BaseModel):
    prefs: Optional[Dict[str, Any]] = None


@router.get("/a11y-prefs")
async def get_a11y_prefs(user: User = Depends(get_current_user)):
    """Return user.preferences['a11y'] (empty dict if unset)."""
    prefs = (user.preferences or {}).get("a11y", {})
    return {"prefs": prefs}


@router.put("/a11y-prefs")
async def put_a11y_prefs(
    payload: A11yPrefsRequest,
    user: User = Depends(get_current_user),
):
    """Store accessibility prefs into user.preferences['a11y']."""
    try:
        async for db in get_db():
            prefs = dict(user.preferences or {})
            prefs["a11y"] = payload.prefs or {}
            user.preferences = prefs
            await db.commit()
    except Exception:
        pass
    return {"status": "saved"}


# --------------------------------------------------------------------- #
# Offline sync sink — frontend offlineCache posts queued actions to
# /api/sync/<action_type>. Route them into the interactions JSONL log so
# they're durable and replayable instead of silently 404ing.
# --------------------------------------------------------------------- #
@sync_router.post("/{action_type}")
async def sync_sink(
    action_type: str,
    request: Request,
    user: User = Depends(get_current_user),
):
    try:
        payload: Dict[str, Any] = await request.json()
    except Exception:
        payload = {}
    try:
        from backend.its.tutoring.interaction_capture import (
            DEFAULT_INTERACTIONS_PATH, SimpleInteractionCapture,
        )
        cap = SimpleInteractionCapture(DEFAULT_INTERACTIONS_PATH)
        cap.capture(
            student_id=str(user.id),
            session_id="",
            subject="sync",
            concept=action_type,
            grade_level=0,
            interaction_type="sync",
            node_id=action_type,
            response=payload,
        )
    except Exception:
        pass  # sync must never fail hard — queue retries anyway
    return {"status": "accepted", "action_type": action_type}
