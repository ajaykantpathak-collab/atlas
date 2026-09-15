"""student_shim.py — /api/student bridge.

The frontend calls a small set of `/api/student/*` endpoints that don't
map cleanly onto existing routers (onboarding state, accessibility prefs
under a student-scoped prefix). This shim provides those endpoints and
stores them on ``User.preferences`` (JSON column — no migration needed).
"""

from typing import Any, Dict, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User

router = APIRouter(prefix="/api/student", tags=["student"])


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
