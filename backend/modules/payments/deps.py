#!/usr/bin/env python3
"""modules/payments/deps.py — entitlement gates for premium surfaces.

Usage on any premium endpoint::

    from backend.modules.payments.deps import require_premium

    @router.get("/api/whatever/premium-thing")
    async def premium_thing(
        user: User = Depends(get_current_user),
        ent: dict = Depends(require_premium),
    ):
        ...

``require_premium`` resolves the caller's ACTIVE tier (applying any lapsed
pending downgrade first) and raises **402** — semantically "payment
required", distinct from 403 "you may never do this" — with a body the
frontend can act on::

    {"detail": "premium_required", "required_tier": "scholar",
     "entitlement": {"tier": "free", "active": false, ...},
     "upgrade_url": "/pricing"}
"""
from __future__ import annotations

from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user
from backend.models.user import User
from backend.modules.payments.plans import TIER_ORDER
from backend.modules.payments import service


async def require_premium(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    state = await service.require_active_state(db, str(user.id))
    if not state["active"]:
        raise HTTPException(
            status_code=402,  # Payment Required — honest, actionable
            detail={
                "detail": "premium_required",
                "required_tier": "scholar",
                "entitlement": state,
                "upgrade_url": "/pricing",
            },
        )
    return state


async def require_tier(minimum: str):
    """Variant for topper-only surfaces::

        deps = Depends(require_tier("topper"))
    """

    async def _checker(
        user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db),
    ) -> dict:
        state = await service.require_active_state(db, str(user.id))
        if TIER_ORDER.get(state["tier"], 0) < TIER_ORDER.get(minimum, 99):
            raise HTTPException(
                status_code=402,
                detail={
                    "detail": "premium_required",
                    "required_tier": minimum,
                    "entitlement": state,
                    "upgrade_url": "/pricing",
                },
            )
        return state

    return _checker
