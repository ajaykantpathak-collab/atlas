#!/usr/bin/env python3
"""modules/payments/service.py — Razorpay client (httpx) + entitlement logic.

Design rules, in priority order:

1.  NEVER charge or unlock anything on an unverified signature. All three
    checks (order verify, webhook, refund) use ``hmac.compare_digest`` —
    constant-time, no early-exit oracles.
2.  Unconfigured is a first-class state. ``payments_configured()`` is False
    until BOTH key env vars exist; callers must degrade to 503, never to
    "free everything".
3.  Idempotency everywhere money moves: order verify is a status machine
    (created -> paid), webhook replays are absorbed by the event-id ledger,
    renewals extend from ``max(now, valid_until)`` so paying early never
    loses days.
4.  Downgrades/cancels NEVER cut a period already paid for — they schedule
    ``pending_tier`` and the resolver applies it the moment the paid period
    lapses.
"""
from __future__ import annotations

import hashlib
import hmac
import logging
import os
import time
from datetime import datetime, timedelta, timezone
from typing import Any

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.modules.payments.models import Entitlement
from backend.modules.payments.plans import (
    BILLING_CYCLE_DAYS,
    TIER_ORDER,
)

log = logging.getLogger(__name__)

RAZORPAY_API_BASE = os.environ.get("RAZORPAY_API_BASE", "https://api.razorpay.com/v1")
ORDER_TIMEOUT_S = 10
# A 'created' order older than this is dead — verify refuses to activate it
# even if someone replays a (validly signed) checkout callback days later.
ORDER_MAX_AGE_S = 6 * 3600


# --------------------------------------------------------------------------- #
# Table bootstrap (compliance-module pattern)
# --------------------------------------------------------------------------- #

def init_tables() -> None:
    """Idempotently create the four payment tables.

    Runs synchronously at router-include time (the compliance module's
    pattern). It must NOT use ``@app.on_event("startup")``: main.py runs a
    ``lifespan``, and FastAPI silently ignores on_event handlers when a
    lifespan is set (learned the hard way — endpoints 400'd with
    "Invalid identifier format" because the tables didn't exist).
    """
    from backend.database import Base, get_sync_engine
    from backend.modules.payments.models import PAYMENT_TABLES

    Base.metadata.create_all(
        get_sync_engine(), tables=[m.__table__ for m in PAYMENT_TABLES]
    )


# --------------------------------------------------------------------------- #
# Configuration
# --------------------------------------------------------------------------- #

def key_id() -> str | None:
    return os.environ.get("RAZORPAY_KEY_ID") or None


def key_secret() -> str | None:
    return os.environ.get("RAZORPAY_KEY_SECRET") or None


def webhook_secret() -> str | None:
    return os.environ.get("RAZORPAY_WEBHOOK_SECRET") or None


def payments_configured() -> bool:
    """True only when the order-creation credential pair exists."""
    return bool(key_id() and key_secret())


def webhooks_configured() -> bool:
    return bool(webhook_secret())


def config_snapshot() -> dict[str, Any]:
    """Safe-to-publish config state (never includes any secret material)."""
    return {
        "configured": payments_configured(),
        "webhooks_configured": webhooks_configured(),
        # test_mode until the owner sets a live key id; purely informational
        "test_mode": bool(key_id() and not key_id().startswith("rzp_live")),
    }


# --------------------------------------------------------------------------- #
# Signature checks (constant-time)
# --------------------------------------------------------------------------- #

def order_signature_valid(razorpay_order_id: str, razorpay_payment_id: str,
                          signature: str) -> bool:
    """Checkout callback: HMAC-SHA256(order_id|payment_id, key_secret)."""
    secret = key_secret()
    if not (secret and razorpay_order_id and razorpay_payment_id and signature):
        return False
    expected = hmac.new(
        secret.encode("utf-8"),
        f"{razorpay_order_id}|{razorpay_payment_id}".encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, str(signature))


def webhook_signature_valid(raw_body: bytes, signature: str) -> bool:
    """Webhook: HMAC-SHA256(raw_request_body, webhook_secret)."""
    secret = webhook_secret()
    if not (secret and signature):
        return False
    expected = hmac.new(secret.encode("utf-8"), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, str(signature))


# --------------------------------------------------------------------------- #
# Razorpay Orders API (httpx; the razorpay SDK is sync + requests-based)
# --------------------------------------------------------------------------- #

class RazorpayError(Exception):
    """Raised when the Razorpay API cannot create an order."""


async def create_razorpay_order(amount_paise: int, receipt: str,
                                notes: dict[str, str] | None = None) -> dict[str, Any]:
    """POST /v1/orders with basic auth. Raises RazorpayError on any failure —
    the router converts that to a graceful 502; it NEVER fakes success."""
    kid, ksec = key_id(), key_secret()
    if not (kid and ksec):
        raise RazorpayError("payments not configured")
    payload: dict[str, Any] = {
        "amount": int(amount_paise),
        "currency": "INR",
        "receipt": receipt[:96],
        "notes": notes or {},
    }
    try:
        async with httpx.AsyncClient(timeout=ORDER_TIMEOUT_S) as client:
            resp = await client.post(
                f"{RAZORPAY_API_BASE}/orders",
                json=payload,
                auth=(kid, ksec),
            )
    except httpx.HTTPError as exc:
        raise RazorpayError(f"razorpay unreachable: {exc}") from exc
    if resp.status_code >= 400:
        # 401 with fake keys is the EXPECTED dev-instance outcome; surface the
        # code only, never the body (it can echo key material in debug modes).
        raise RazorpayError(f"razorpay rejected order: HTTP {resp.status_code}")
    try:
        data = resp.json()
        if not data.get("id") or "amount" not in data:
            raise ValueError("missing id/amount")
        return data
    except (ValueError, TypeError) as exc:
        raise RazorpayError("razorpay returned an unreadable order") from exc


# --------------------------------------------------------------------------- #
# Entitlement resolution + changes
# --------------------------------------------------------------------------- #

def _now() -> datetime:
    return datetime.now(timezone.utc)


async def get_entitlement(db: AsyncSession, user_id: str,
                          create: bool = False) -> Entitlement | None:
    row = (
        await db.execute(select(Entitlement).where(Entitlement.user_id == user_id))
    ).scalar_one_or_none()
    if row is None and create:
        row = Entitlement(user_id=user_id, tier="free")
        db.add(row)
        await db.flush()
    return row


def resolve_entitlement(ent: Entitlement) -> dict[str, Any]:
    """Apply a lapsed pending downgrade and return the ACTIVE state.

    Pure-ish: mutates ``ent`` in place when a pending tier has lapsed (the
    caller commits), never invents paid time.  Semantics:

      now < valid_until            -> active paid tier (pending change waits)
      now >= valid_until, pending  -> pending becomes tier; a paid pending
                                      tier gets its month counted from the
                                      day the old period ended (already paid
                                      for); 'free' simply clears the clock.
      otherwise                    -> free
    """
    now = _now()
    tier = ent.tier or "free"
    valid_until = ent.valid_until
    pending = ent.pending_tier

    lapsed = valid_until is None or valid_until <= now
    if tier != "free" and lapsed and pending:
        old_end = valid_until or now
        tier = pending
        ent.tier = tier
        ent.valid_until = (
            old_end + timedelta(days=BILLING_CYCLE_DAYS)
            if tier != "free" else None
        )
        ent.pending_tier = None
        valid_until = ent.valid_until
    elif lapsed:
        # Lapsed paid tier with NO pending change: roll the ROW to free, not
        # just the returned dict. (This branch used to only fix locals —
        # /entitlement/me displayed "free" while the row kept the lapsed paid
        # tier, so any later reader re-entering with the stale row could
        # mis-apply a renewal on top of it.)
        ent.tier = "free"
        ent.valid_until = None
        tier = "free"
        valid_until = None

    return {
        "tier": tier,
        "active": tier != "free",
        "valid_until": valid_until.isoformat() if valid_until else None,
        "pending_tier": ent.pending_tier,
        "cancel_at_period_end": ent.pending_tier == "free",
    }


async def activate_purchase(db: AsyncSession, user_id: str, plan_id: str,
                            order_id: str, payment_id: str) -> dict[str, Any]:
    """Apply a VERIFIED payment for ``plan_id``. Upgrade/renewal/downgrade rules:

    * upgrade  (new > current): starts now, +30d, pending change discarded.
    * renewal  (new == current): extends from max(now, valid_until) — early
      renewal never loses days.
    * downgrade(new < current, still active): current period runs to its end
      (they paid for it), ``pending_tier`` schedules the cheaper plan.
    """
    ent = await get_entitlement(db, user_id, create=True)
    resolve_entitlement(ent)  # settle any lapsed pending state first
    now = _now()
    current = ent.tier or "free"
    active_now = ent.valid_until is not None and ent.valid_until > now

    if current == "free" or not active_now:
        ent.tier = plan_id
        ent.pending_tier = None
        ent.valid_until = now + timedelta(days=BILLING_CYCLE_DAYS)
    elif TIER_ORDER[plan_id] > TIER_ORDER[current]:
        ent.tier = plan_id
        ent.pending_tier = None
        ent.valid_until = now + timedelta(days=BILLING_CYCLE_DAYS)
    elif plan_id == current:
        base = ent.valid_until if ent.valid_until > now else now
        ent.valid_until = base + timedelta(days=BILLING_CYCLE_DAYS)
        ent.pending_tier = None
    else:  # paid downgrade while still active — honour the paid period
        ent.pending_tier = plan_id

    ent.last_order_id = order_id
    ent.last_payment_id = payment_id
    ent.source = "razorpay"
    await db.flush()
    return resolve_entitlement(ent)


async def require_active_state(db: AsyncSession, user_id: str) -> dict[str, Any]:
    """Resolve + PERSIST the caller's current entitlement state.

    Used by ``require_premium`` and ``/entitlement/me``: the lazy application
    of a lapsed pending downgrade happens on read, so a cancelled period
    rolls to free (or to the pending paid tier) without waiting for a write
    path to touch the row first.
    """
    ent = await get_entitlement(db, user_id)
    if ent is None:
        return {
            "tier": "free",
            "active": False,
            "valid_until": None,
            "pending_tier": None,
            "cancel_at_period_end": False,
        }
    state = resolve_entitlement(ent)
    await db.commit()
    return state


async def cancel_at_period_end(db: AsyncSession, user_id: str) -> dict[str, Any]:
    """The honest cancel: keeps every paid day, schedules free at expiry."""
    ent = await get_entitlement(db, user_id, create=True)
    state = resolve_entitlement(ent)
    if state["tier"] == "free":
        return state  # nothing to cancel — already free, no error theatre
    ent.pending_tier = "free"
    await db.flush()
    return resolve_entitlement(ent)


async def revoke(db: AsyncSession, user_id: str) -> None:
    """Immediate revoke (refund / chargeback path — refunds return money, so
    access goes back at the same time)."""
    ent = await get_entitlement(db, user_id)
    if ent is not None:
        ent.tier = "free"
        ent.pending_tier = None
        ent.valid_until = None
        await db.flush()


def order_is_stale(created_at: datetime | None) -> bool:
    if created_at is None:
        return True
    created = created_at if created_at.tzinfo else created_at.replace(tzinfo=timezone.utc)
    return (time.time() - created.timestamp()) > ORDER_MAX_AGE_S
