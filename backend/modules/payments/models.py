#!/usr/bin/env python3
"""modules/payments/models.py — payment tables on the shared Base.

Four tables, deliberately small:

  payment_orders          one row per Razorpay order we create (status
                          machine: created -> paid | expired | failed).
  payment_entitlements    ONE row per user — the current tier, when it
                          expires, and an optional ``pending_tier`` holding
                          a scheduled DOWNGRADE (cancel-at-period-end, or a
                          mid-cycle switch to a cheaper plan). The resolver
                          in service.py applies the pending tier lazily the
                          moment the paid period lapses, so a downgrade can
                          never claw back days already paid for.
  payment_webhook_events  idempotency ledger — Razorpay retries webhooks,
                          the unique ``event_id`` PK makes replays a no-op.
  payment_waitlist        pre-launch waitlist captured by /pricing while
                          payments are unconfigured.

All ids that reference users use ``GUID`` (users.id is a native UUID), so a
malformed id fails validation at the boundary, never inside a bind.
"""
from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import JSON, DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from backend.database import Base
from backend.db_types import GUID


def _now() -> datetime:
    return datetime.now(timezone.utc)


class PaymentOrder(Base):
    __tablename__ = "payment_orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    razorpay_order_id: Mapped[str] = mapped_column(
        String(64), unique=True, index=True
    )  # order_xxxxxxxx
    user_id: Mapped[str] = mapped_column(GUID(), index=True)
    plan_id: Mapped[str] = mapped_column(String(16))  # scholar | topper
    amount_paise: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(8), default="INR")
    # created -> paid | expired | failed
    status: Mapped[str] = mapped_column(String(16), default="created", index=True)
    razorpay_payment_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    receipt: Mapped[str | None] = mapped_column(String(96), nullable=True)
    notes: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, server_default=func.now(), index=True
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, onupdate=_now, server_default=func.now()
    )


class Entitlement(Base):
    __tablename__ = "payment_entitlements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[str] = mapped_column(GUID(), unique=True, index=True)
    # free | scholar | topper — the tier being PAID FOR right now (or free)
    tier: Mapped[str] = mapped_column(String(16), default="free", index=True)
    # scheduled downgrade target (cancel-at-period-end / mid-cycle downgrade);
    # applied by the resolver once valid_until lapses. None = no pending change.
    pending_tier: Mapped[str | None] = mapped_column(String(16), nullable=True)
    valid_until: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True, index=True
    )
    last_order_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    last_payment_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    # razorpay | admin | promo — how this entitlement was granted
    source: Mapped[str | None] = mapped_column(String(16), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, onupdate=_now, server_default=func.now()
    )


class WebhookEvent(Base):
    __tablename__ = "payment_webhook_events"

    # Razorpay event id (evt_xxxxxxxx) — the PK *is* the idempotency lock.
    event_id: Mapped[str] = mapped_column(String(64), primary_key=True)
    event_type: Mapped[str] = mapped_column(String(64), index=True)
    status: Mapped[str] = mapped_column(String(16), default="processed")
    payload: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    received_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, server_default=func.now()
    )


class WaitlistEntry(Base):
    __tablename__ = "payment_waitlist"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    user_id: Mapped[str | None] = mapped_column(GUID(), nullable=True, index=True)
    source: Mapped[str | None] = mapped_column(String(32), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, server_default=func.now()
    )


PAYMENT_TABLES = (PaymentOrder, Entitlement, WebhookEvent, WaitlistEntry)
