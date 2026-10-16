#!/usr/bin/env python3
"""modules/payments/router.py — Razorpay endpoints, TEST-MODE FIRST.

Unconfigured contract (no RAZORPAY_KEY_ID/KEY_SECRET in env):
    GET  /api/payments/plans        200  {configured: false, plans: [...]}
    POST /api/payments/order        503  {"detail": "payments not configured"}
    POST /api/payments/verify       503  {"detail": "payments not configured"}
    POST /api/payments/webhook      503  {"detail": "payments not configured"}
    GET  /api/payments/entitlement/me   200 (entitlement still resolvable —
                                        admin/promo grants must work pre-launch)
    POST /api/payments/waitlist     201  (the /pricing capture path)

Configured contract (test keys set):
    order   -> Razorpay order id + public key id (client runs Checkout)
    verify  -> HMAC order|payment signature gate -> activates entitlement
    webhook -> X-Razorpay-Signature HMAC gate + event-id idempotency ledger
               (replays return 200 {"status": "duplicate"}, forgeries 403)
    refund  -> immediate revoke (money went back, access goes back)

Every authed money endpoint takes the standard Bearer token. Responses
never include key secrets; key_id (public) is the only credential echoed.
"""
from __future__ import annotations

import hashlib
import logging
import re
import time
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, Field
from pydantic import field_validator
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database import get_db
from backend.deps import get_current_user, get_current_user_optional
from backend.models.user import User
from backend.modules.payments import service
from backend.modules.payments.deps import require_premium
from backend.modules.payments.models import PaymentOrder, WebhookEvent, WaitlistEntry
from backend.modules.payments.plans import (
    PLANS,
    PAID_PLAN_IDS,
    public_plans,
)

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/payments", tags=["payments"])

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


# --------------------------------------------------------------------------- #
# Schemas
# --------------------------------------------------------------------------- #

class OrderIn(BaseModel):
    plan_id: str = Field(..., min_length=2, max_length=16)

    @field_validator("plan_id")
    @classmethod
    def _known_plan(cls, v: str) -> str:
        if v not in PAID_PLAN_IDS:
            raise ValueError(f"unknown plan '{v}' — paid plans: {', '.join(PAID_PLAN_IDS)}")
        return v


class VerifyIn(BaseModel):
    razorpay_order_id: str = Field(..., min_length=6, max_length=64)
    razorpay_payment_id: str = Field(..., min_length=6, max_length=64)
    razorpay_signature: str = Field(..., min_length=16, max_length=256)


class WaitlistIn(BaseModel):
    email: str = Field(..., min_length=5, max_length=320)
    source: str | None = Field(default=None, max_length=32)

    @field_validator("email")
    @classmethod
    def _shape(cls, v: str) -> str:
        v = v.strip().lower()
        if not _EMAIL_RE.match(v):
            raise ValueError("that does not look like an email address")
        return v


# --------------------------------------------------------------------------- #
# Catalog (open — the pricing page polls this pre-auth)
# --------------------------------------------------------------------------- #

@router.get("/plans")
async def get_plans() -> dict[str, Any]:
    return {
        "configured": service.payments_configured(),
        **service.config_snapshot(),
        "billing_cycle_days": 30,
        "plans": public_plans(service.payments_configured()),
        "message": None
        if service.payments_configured()
        else "Payments are launching soon — join the waitlist on /pricing.",
    }


@router.post("/waitlist", status_code=201)
async def join_waitlist(
    body: WaitlistIn,
    user: User | None = Depends(get_current_user_optional),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Pre-launch capture. Idempotent per email — joining twice just 200s."""
    existing = (
        await db.execute(
            select(WaitlistEntry).where(WaitlistEntry.email == body.email)
        )
    ).scalar_one_or_none()
    if existing is not None:
        from fastapi.responses import JSONResponse

        return JSONResponse({"ok": True, "already_joined": True}, status_code=200)
    db.add(
        WaitlistEntry(
            email=body.email,
            user_id=str(user.id) if user is not None else None,
            source=(body.source or "pricing")[:32],
        )
    )
    await db.flush()
    return {"ok": True, "already_joined": False}


# --------------------------------------------------------------------------- #
# Order lifecycle (authed)
# --------------------------------------------------------------------------- #

@router.post("/order")
async def create_order(
    body: OrderIn,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    if not service.payments_configured():
        raise HTTPException(status_code=503, detail="payments not configured")

    plan = PLANS[body.plan_id]
    receipt = f"atlas_{str(user.id)[:8]}_{int(time.time())}"
    notes = {"user_id": str(user.id), "plan_id": body.plan_id, "product": "atlas-learning"}

    try:
        rzp_order = await service.create_razorpay_order(
            amount_paise=plan["amount_paise"], receipt=receipt, notes=notes
        )
    except service.RazorpayError as exc:
        log.warning("payments: order creation failed for %s: %s", user.id, exc)
        raise HTTPException(
            status_code=502,
            detail="payment gateway unavailable — please try again in a minute",
        ) from exc

    order = PaymentOrder(
        razorpay_order_id=rzp_order["id"],
        user_id=user.id,
        plan_id=body.plan_id,
        amount_paise=plan["amount_paise"],
        currency="INR",
        status="created",
        receipt=receipt,
        notes=notes,
    )
    db.add(order)
    await db.flush()

    return {
        "order_id": rzp_order["id"],
        "amount": plan["amount_paise"],
        "currency": "INR",
        "plan_id": body.plan_id,
        "key_id": service.key_id(),  # PUBLIC id — Checkout needs it client-side
        "receipt": receipt,
        "test_mode": service.config_snapshot()["test_mode"],
    }


@router.post("/verify")
async def verify_payment(
    body: VerifyIn,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    if not service.payments_configured():
        raise HTTPException(status_code=503, detail="payments not configured")

    order = (
        await db.execute(
            select(PaymentOrder).where(
                PaymentOrder.razorpay_order_id == body.razorpay_order_id
            )
        )
    ).scalar_one_or_none()
    # 404 (not 403) for a foreign order — do not confirm which orders exist.
    if order is None or order.user_id != user.id:
        raise HTTPException(status_code=404, detail="order not found")

    if order.status == "paid":
        # Idempotent replay of an already-verified checkout callback.
        state = await service.require_active_state(db, str(user.id))
        return {"verified": True, "already_verified": True, "entitlement": state}

    if order.status != "created":
        raise HTTPException(
            status_code=400, detail=f"order is {order.status} and cannot be verified"
        )
    if service.order_is_stale(order.created_at):
        order.status = "expired"
        # Commit BEFORE raising: get_db rolls back on exceptions, and the
        # terminal 'expired' status must survive the 4xx (a replayed verify
        # then short-circuits on status instead of re-deriving staleness).
        await db.commit()
        raise HTTPException(status_code=400, detail="order expired — start a new checkout")

    if not service.order_signature_valid(
        body.razorpay_order_id, body.razorpay_payment_id, body.razorpay_signature
    ):
        # Signature forgery attempt: log + refuse. The order stays 'created'
        # (a genuine retry can still succeed); three of these in an hour from
        # one user would be a fraud signal for the ops watch.
        log.warning(
            "payments: BAD SIGNATURE user=%s order=%s", user.id, body.razorpay_order_id
        )
        raise HTTPException(status_code=400, detail="payment signature verification failed")

    order.status = "paid"
    order.razorpay_payment_id = body.razorpay_payment_id
    await db.flush()
    state = await service.activate_purchase(
        db, str(user.id), order.plan_id, order.razorpay_order_id, body.razorpay_payment_id
    )
    # Durable before the client is told "verified" — the checkout callback
    # must never race its own grant (same reasoning as the webhook ack).
    await db.commit()
    return {"verified": True, "already_verified": False, "entitlement": state}


# --------------------------------------------------------------------------- #
# Webhook (server-to-server; no auth, signature IS the auth)
# --------------------------------------------------------------------------- #

@router.post("/webhook")
async def webhook(request: Request, db: AsyncSession = Depends(get_db)) -> Response:
    raw = await request.body()
    signature = request.headers.get("X-Razorpay-Signature", "")

    if not service.webhooks_configured():
        raise HTTPException(status_code=503, detail="payments not configured")
    if not service.webhook_signature_valid(raw, signature):
        log.warning("payments: webhook rejected (bad signature, %d bytes)", len(raw))
        raise HTTPException(status_code=403, detail="invalid webhook signature")

    import json

    try:
        payload = json.loads(raw.decode("utf-8"))
        event_type = str(payload.get("event", ""))
    except (ValueError, UnicodeDecodeError):
        raise HTTPException(status_code=400, detail="unreadable webhook body") from None

    # Idempotency: Razorpay retries deliveries, and the ack is sent BEFORE the
    # session's teardown commit — so a redelivery can arrive while the first
    # processing is still uncommitted. A read-then-act dedupe would race.
    # Instead the event-id PRIMARY KEY is the mutual-exclusion lock: claim the
    # row inside a SAVEPOINT; a UniqueViolation means someone else (a replay,
    # or a still-in-flight first delivery) owns this event -> duplicate.
    event_id = request.headers.get("X-Razorpay-Event-Id") or (
        "sha:" + hashlib.sha256(raw).hexdigest()[:40]
    )
    from sqlalchemy.exc import IntegrityError

    event_row = WebhookEvent(
        event_id=event_id[:64],
        event_type=event_type or "unknown",
        status="processing",
        payload=payload,
    )
    try:
        async with db.begin_nested():
            db.add(event_row)
            await db.flush()
    except IntegrityError:
        return _webhook_ack("duplicate")

    outcome = "processed"
    pl = payload.get("payload") or {}
    try:
        if event_type == "order.paid":
            rzp_order_id = (pl.get("order", {}).get("entity") or {}).get("id")
            payment_id = (pl.get("payment", {}).get("entity") or {}).get("id")
            await _activate_from_webhook(db, rzp_order_id, payment_id, event_type)
        elif event_type == "payment.captured":
            rzp_order_id = (pl.get("payment", {}).get("entity") or {}).get("order_id")
            payment_id = (pl.get("payment", {}).get("entity") or {}).get("id")
            await _activate_from_webhook(db, rzp_order_id, payment_id, event_type)
        elif event_type in ("payment.refund", "refund.processed"):
            payment_id = (pl.get("payment", {}).get("entity") or {}).get("id") or (
                pl.get("refund", {}).get("entity") or {}
            ).get("payment_id")
            await _revoke_from_webhook(db, payment_id)
        else:
            outcome = "ignored"  # ack + record, never 4xx an unknown event
    except Exception:
        # Roll the claim back WITH the outer transaction (get_db rollback on
        # exception) so Razorpay's retry can reprocess — at-least-once with an
        # idempotent claim, never at-most-once.
        log.exception("payments: webhook handler failed (%s)", event_type)
        raise

    event_row.status = outcome
    await db.flush()
    # Commit BEFORE acking: Razorpay treats the 200 as delivered, so the
    # entitlement change must be DURABLE by then. (get_db's teardown commit
    # only runs after the response is sent — on a slow DB, reads arriving in
    # that window see pre-grant state and retries can interleave.) A failed
    # commit raises -> 500 -> the claim rolls back -> Razorpay retries.
    await db.commit()
    return _webhook_ack(outcome)


def _webhook_ack(status: str) -> Response:
    from fastapi.responses import JSONResponse

    return JSONResponse({"status": status}, status_code=200)


async def _activate_from_webhook(db: AsyncSession, rzp_order_id: Any,
                                 payment_id: Any, event_type: str) -> None:
    if not rzp_order_id:
        return
    # ATOMIC CLAIM: only a delivery that moves the order from 'created' to
    # 'paid' may activate the entitlement. This closes the verify-vs-webhook
    # race and the concurrent-redelivery race: the second claimer's UPDATE
    # matches zero rows (status already 'paid') and must NOT re-grant.
    from sqlalchemy import update

    res = await db.execute(
        update(PaymentOrder)
        .where(
            PaymentOrder.razorpay_order_id == str(rzp_order_id),
            PaymentOrder.status == "created",
        )
        .values(
            status="paid",
            razorpay_payment_id=str(payment_id) if payment_id else None,
        )
    )
    if res.rowcount == 0:
        # verify beat this webhook, or a concurrent delivery did. Either way
        # the grant already happened exactly once — do not touch entitlements.
        log.info("payments: webhook %s found order %s already claimed", event_type, rzp_order_id)
        return
    order = (
        await db.execute(
            select(PaymentOrder).where(PaymentOrder.razorpay_order_id == str(rzp_order_id))
        )
    ).scalar_one()
    await db.flush()
    await service.activate_purchase(
        db, str(order.user_id), order.plan_id, order.razorpay_order_id,
        str(payment_id or order.razorpay_payment_id or ""),
    )


async def _revoke_from_webhook(db: AsyncSession, payment_id: Any) -> None:
    if not payment_id:
        return
    order = (
        await db.execute(
            select(PaymentOrder).where(
                PaymentOrder.razorpay_payment_id == str(payment_id)
            )
        )
    ).scalar_one_or_none()
    if order is None:
        return
    order.status = "failed"
    await db.flush()
    await service.revoke(db, str(order.user_id))


# --------------------------------------------------------------------------- #
# Entitlement (authed) + the premium-surface example
# --------------------------------------------------------------------------- #

@router.get("/entitlement/me")
async def my_entitlement(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    state = await service.require_active_state(db, str(user.id))
    return {
        "user_id": str(user.id),
        "configured": service.payments_configured(),
        **state,
        "upgrade_url": None if state["active"] else "/pricing",
    }


@router.post("/subscription/cancel")
async def cancel_subscription(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict[str, Any]:
    """Cancel-at-period-end. Keeps every paid day; no dark-pattern rescue flow."""
    state = await service.cancel_at_period_end(db, str(user.id))
    return {
        "ok": True,
        "cancelled_at_period_end": state["cancel_at_period_end"],
        "entitlement": state,
        "note": "You keep full access until the end of the period you paid for.",
    }


@router.get("/premium/sims-config")
async def premium_sims_config(
    _ent: dict = Depends(require_premium),
) -> dict[str, Any]:
    """WORKED EXAMPLE of a gated premium surface (Build B item 5).

    Premium sim routes copy this pattern: add ``Depends(require_premium)`` and
    the endpoint answers 402 {detail: premium_required, upgrade_url: /pricing}
    for free users and serves content for Scholar+. The /learning/lab and
    /learning/commerce pages show the matching crown badge client-side while
    the paywall click-through ships with real keys.
    """
    return {
        "unlocked": True,
        "sim_families": ["lab", "commerce", "games"],
        "tier": _ent["tier"],
        "valid_until": _ent["valid_until"],
    }
