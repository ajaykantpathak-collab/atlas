"""parent_digest.py — POST /api/parent/digest/send (COLD-START brief §D3).

Parent-role endpoint: compose + send the weekly WhatsApp digest for ONE
linked child.  Auth: parent role (admin allowed by require_role).  The
parent→child link is verified against parent_student_links before any
data leaves the server — an unlinked child_id is a 403, never a digest.
"""

from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import require_role
from backend.models.user import User as UserModel

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/parent", tags=["Parent"])


class DigestSendRequest(BaseModel):
    child_id: str = Field(..., min_length=1, description="users.id of the linked child")


class DigestSendResponse(BaseModel):
    child_id: str
    child_name: str
    message: str
    stats: dict = {}
    sent: bool = False
    mock: bool = False
    reason: Optional[str] = None


@router.post("/digest/send", response_model=DigestSendResponse)
async def send_digest(
    req: DigestSendRequest,
    db: AsyncSession = Depends(get_db),
    user=Depends(require_role("parent")),
) -> DigestSendResponse:
    """Compose + send the weekly digest for one linked child.

    With no WhatsApp provider configured (or WHATSAPP_MOCK=1) the digest
    is composed and LOGGED — the response still carries the full message
    so the caller can see exactly what would have gone out."""
    # ── Link check: parent_student_links(parent_id → student_id) ──
    try:
        from backend.services.auth_service import ParentStudentLinkModel
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Link model unavailable — digest disabled",
        ) from exc

    linked = (
        await db.execute(
            select(ParentStudentLinkModel.student_id)
            .where(
                ParentStudentLinkModel.parent_id == str(user.id),
                ParentStudentLinkModel.student_id == req.child_id,
            )
            .limit(1)
        )
    ).scalar_one_or_none()
    if linked is None:
        # 403, not 404: existence of an unlinked child id is not ours to leak
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This child is not linked to your account",
        )

    child = (
        await db.execute(select(UserModel).where(UserModel.id == req.child_id))
    ).scalar_one_or_none()
    if child is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Linked child account not found",
        )

    from backend.services.whatsapp_digest import send_child_digest

    built = await send_child_digest(db, user, child)
    logger.info(
        "[digest] parent=%s child=%s sent=%s mock=%s",
        user.id, child.id, built.get("sent"), built.get("mock"))
    return DigestSendResponse(**built)
