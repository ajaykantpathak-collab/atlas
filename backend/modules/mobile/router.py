#!/usr/bin/env python3
"""modules/mobile/router.py — app-store client support.

  POST /api/mobile/register-device  — device token for push (future) +
                                      platform + app version telemetry
  GET  /api/mobile/minimum-version  — forced-update gate: a client below the
                                      minimum shows the update screen
  GET  /api/mobile/config           — remote config for the app (feature
                                      flags, maintenance mode)

Store-review friendly: every response is versioned JSON, no HTML errors,
and the minimum-version endpoint works WITHOUT auth (a blocked client must
still see the update screen)."""
from __future__ import annotations

import os
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy import JSON, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from backend.database import get_db, Base
from backend.routers.auth import get_current_user

router = APIRouter(prefix="/api/mobile", tags=["mobile"])


class Device(Base):
    __tablename__ = "mobile_devices"
    device_id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str | None] = mapped_column(String(64), index=True,
                                                nullable=True)
    platform: Mapped[str] = mapped_column(String(16))     # ios|android
    app_version: Mapped[str] = mapped_column(String(32))
    push_token: Mapped[str | None] = mapped_column(String(256), nullable=True)
    registered_at: Mapped[str] = mapped_column(
        String(40), default=lambda: datetime.now(timezone.utc).isoformat())
    last_seen: Mapped[str] = mapped_column(
        String(40), default=lambda: datetime.now(timezone.utc).isoformat())


class DeviceIn(BaseModel):
    device_id: str = Field(..., max_length=64)
    platform: str = Field(..., pattern="^(ios|android)$")
    app_version: str = Field(..., max_length=32)
    push_token: str | None = Field(default=None, max_length=256)


def _minimum_version() -> dict:
    return {
        "ios": {"minimum": os.environ.get("MOBILE_MIN_IOS", "1.0.0"),
                "force_update": False, "store_url":
                os.environ.get("APP_STORE_URL", "")},
        "android": {"minimum": os.environ.get("MOBILE_MIN_ANDROID", "1.0.0"),
                    "force_update": False, "store_url":
                    os.environ.get("PLAY_STORE_URL", "")},
        "maintenance_mode": False,
    }


@router.post("/register-device")
def register_device(body: DeviceIn, user=Depends(get_current_user), db=Depends(get_db)):
    """Idempotent upsert — safe to call on every app launch."""
    from sqlalchemy import select
    row = db.execute(select(Device).where(
        Device.device_id == body.device_id)).scalars().first()
    now = datetime.now(timezone.utc).isoformat()
    if row is None:
        db.add(Device(device_id=body.device_id, user_id=str(user.id),
                      platform=body.platform, app_version=body.app_version,
                      push_token=body.push_token, registered_at=now,
                      last_seen=now))
    else:
        row.user_id = str(user.id)
        row.app_version = body.app_version
        row.push_token = body.push_token or row.push_token
        row.last_seen = now
    db.commit()
    return {"ok": True, "device_id": body.device_id,
            "minimum_version": _minimum_version()}


@router.get("/minimum-version")
def minimum_version():
    """UNAUTHENTICATED on purpose: an outdated client must still be able
    to learn it needs updating."""
    return _minimum_version()


@router.get("/config")
def mobile_config():
    """Remote config — feature flags + maintenance, no auth (app bootstrap)."""
    cfg = _minimum_version()
    cfg["features"] = {
        "solve_page": True,
        "tutor_deterministic": True,
        "diagrams": True,
        "sims": True,
    }
    return cfg
