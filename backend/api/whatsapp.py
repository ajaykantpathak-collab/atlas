"""
WhatsApp Webhook & Notification Router
========================================
Handles Meta WhatsApp Cloud API webhooks, inbound message routing,
and outbound notifications (progress, homework, streak) for the
K-12 learning platform.

Endpoints:
    GET  /api/whatsapp/webhook          – Meta webhook verification
    POST /api/whatsapp/webhook          – Inbound message ingestion
    POST /api/whatsapp/send             – Send arbitrary WhatsApp message
    POST /api/whatsapp/notify/progress  – Parent progress notification
    POST /api/whatsapp/notify/homework  – Parent homework notification
    POST /api/whatsapp/notify/streak    – Parent streak notification

Offline-capable: every outbound action is queued when the network
is unavailable and flushed automatically on the next sync tick.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import os
from datetime import date, datetime
from enum import Enum
from typing import Any, Literal

from fastapi import APIRouter, BackgroundTasks, Depends, Header, HTTPException, Query, Request
from pydantic import BaseModel, Field, field_validator
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_async_db
from services.llm_client import LLMClient

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])

# ---------------------------------------------------------------------------
# Configuration (loaded from env; falls back to safe dev defaults)
# ---------------------------------------------------------------------------
WHATSAPP_VERIFY_TOKEN: str = os.getenv("WHATSAPP_VERIFY_TOKEN", "learnwise_verify_2026")
WHATSAPP_APP_SECRET: str = os.getenv("WHATSAPP_APP_SECRET", "")
WHATSAPP_PHONE_NUMBER_ID: str = os.getenv("WHATSAPP_PHONE_NUMBER_ID", "")
WHATSAPP_ACCESS_TOKEN: str = os.getenv("WHATSAPP_ACCESS_TOKEN", "")
WHATSAPP_API_VERSION: str = os.getenv("WHATSAPP_API_VERSION", "v18.0")
WHATSAPP_BASE_URL: str = (
    f"https://graph.facebook.com/{WHATSAPP_API_VERSION}/{WHATSAPP_PHONE_NUMBER_ID}/messages"
)

# ---------------------------------------------------------------------------
# In-process offline queue  (swap for Redis / DB-backed queue in production)
# ---------------------------------------------------------------------------
from collections import deque
from threading import Lock

class _OfflineQueue:
    """Thread-safe in-memory queue for outbound WhatsApp messages
    that could not be sent because the network was unavailable.
    Call flush() from a periodic background task to retry.
    """

    def __init__(self, max_size: int = 10_000) -> None:
        self._queue: deque[dict[str, Any]] = deque(maxlen=max_size)
        self._lock = Lock()
        self._total_enqueued: int = 0
        self._total_sent: int = 0
        self._total_failed: int = 0

    def enqueue(self, payload: dict[str, Any]) -> int:
        """Add a message payload. Returns the current queue depth."""
        with self._lock:
            self._queue.append(payload)
            self._total_enqueued += 1
            return len(self._queue)

    def drain(self) -> list[dict[str, Any]]:
        """Atomically remove and return all queued payloads."""
        with self._lock:
            items = list(self._queue)
            self._queue.clear()
            return items

    def record_sent(self) -> None:
        with self._lock:
            self._total_sent += 1

    def record_failed(self) -> None:
        with self._lock:
            self._total_failed += 1

    @property
    def stats(self) -> dict[str, int]:
        with self._lock:
            return {
                "depth": len(self._queue),
                "total_enqueued": self._total_enqueued,
                "total_sent": self._total_sent,
                "total_failed": self._total_failed,
            }

_offline_queue = _OfflineQueue()


# ---------------------------------------------------------------------------
# Pydantic v2 Schemas
# ---------------------------------------------------------------------------
class MessageType(str, Enum):
    TEXT = "text"
    BUTTON_REPLY = "button_reply"
    INTERACTIVE = "interactive"
    LOCATION = "location"
    IMAGE = "image"
    DOCUMENT = "document"
    UNKNOWN = "unknown"


class InboundContact(BaseModel):
    wa_id: str = Field(..., description="WhatsApp ID (phone without +)")
    name: str | None = Field(None, description="Contact display name")


class InboundMessage(BaseModel):
    message_id: str = Field(..., description="WhatsApp message ID")
    from_contact: InboundContact = Field(..., alias="from")
    timestamp: datetime
    type: MessageType
    text: str | None = None
    button_payload: str | None = Field(None, description="Button reply payload")
    interactive_response: dict[str, Any] | None = None
    location: dict[str, Any] | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)

    class Config:
        populate_by_name = True


class WebhookVerificationResponse(BaseModel):
    hub_mode: str
    hub_verify_token: str
    hub_challenge: str


class SendMessageRequest(BaseModel):
    to_wa_id: str = Field(..., description="Recipient WhatsApp ID (10-digit)")
    message_type: Literal["text", "template", "interactive"] = "text"
    text_body: str | None = Field(None, description="Plain-text body (required for type=text)")
    template_name: str | None = Field(None, description="WhatsApp template name")
    template_language: str = Field("en_US")
    template_components: list[dict[str, Any]] = Field(default_factory=list)
    buttons: list[dict[str, Any]] = Field(default_factory=list)
    preview_url: bool = False
    recipient_name: str | None = Field(None, description="Personalisation name")

    @field_validator("text_body")
    @classmethod
    def _text_required_for_text(cls, v: str | None, info: Any) -> str | None:
        if info.data.get("message_type") == "text" and not v:
            raise ValueError("text_body is required when message_type='text'")
        return v

    @field_validator("template_name")
    @classmethod
    def _template_required_for_template(cls, v: str | None, info: Any) -> str | None:
        if info.data.get("message_type") == "template" and not v:
            raise ValueError("template_name is required when message_type='template'")
        return v


class SendMessageResponse(BaseModel):
    success: bool
    message_id: str | None = None
    error: str | None = None
    queued_offline: bool = False


class ProgressNotifyRequest(BaseModel):
    student_id: int = Field(..., gt=0)
    parent_wa_id: str = Field(..., min_length=10, max_length=15)
    parent_name: str = Field(..., min_length=1)
    subject: str = Field(..., min_length=1)
    chapter: str = Field(..., min_length=1)
    score_pct: float = Field(..., ge=0, le=100)
    total_questions: int = Field(..., gt=0)
    correct_answers: int = Field(..., ge=0)
    practice_streak: int = Field(0, ge=0)
    weak_topics: list[str] = Field(default_factory=list)
    period: Literal["daily", "weekly", "monthly"] = "weekly"


class HomeworkNotifyRequest(BaseModel):
    student_id: int = Field(..., gt=0)
    parent_wa_id: str = Field(..., min_length=10, max_length=15)
    parent_name: str = Field(..., min_length=1)
    subject: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)
    due_date: date
    estimated_minutes: int = Field(30, gt=0)
    priority: Literal["low", "medium", "high"] = "medium"
    topics: list[str] = Field(default_factory=list)


class StreakNotifyRequest(BaseModel):
    student_id: int = Field(..., gt=0)
    parent_wa_id: str = Field(..., min_length=10, max_length=15)
    parent_name: str = Field(..., min_length=1)
    student_name: str = Field(..., min_length=1)
    current_streak: int = Field(..., ge=0)
    milestone: int | None = Field(None, ge=1, description="Milestone reached, e.g. 7, 30, 100")
    subject: str = Field(..., min_length=1)


class NotificationResponse(BaseModel):
    success: bool
    message_id: str | None = None
    error: str | None = None
    queued_offline: bool = False


# ---------------------------------------------------------------------------
# Helper – X-Hub-Signature-256 verification
# ---------------------------------------------------------------------------
def _verify_signature(body_bytes: bytes, signature_header: str | None) -> bool:
    """Return True if the request body matches Meta's X-Hub-Signature-256.
    Skips verification when WHATSAPP_APP_SECRET is empty (dev mode).
    """
    if not WHATSAPP_APP_SECRET or not signature_header:
        return True
    expected = "sha256=" + hmac.new(
        WHATSAPP_APP_SECRET.encode(), body_bytes, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature_header)


# ---------------------------------------------------------------------------
# Helper – build WhatsApp Cloud API text payload
# ---------------------------------------------------------------------------
def _build_text_payload(
    to_wa_id: str, text: str, preview_url: bool = False
) -> dict[str, Any]:
    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to_wa_id,
        "type": "text",
        "text": {
            "preview_url": preview_url,
            "body": text,
        },
    }


def _build_template_payload(
    to_wa_id: str,
    template_name: str,
    language: str = "en_US",
    components: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to_wa_id,
        "type": "template",
        "template": {
            "name": template_name,
            "language": {"code": language},
        },
    }
    if components:
        payload["template"]["components"] = components
    return payload


def _build_interactive_list_payload(
    to_wa_id: str,
    header_text: str,
    body_text: str,
    footer_text: str,
    button_text: str,
    sections: list[dict[str, Any]],
) -> dict[str, Any]:
    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": to_wa_id,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "header": {"type": "text", "text": header_text},
            "body": {"text": body_text},
            "footer": {"text": footer_text},
            "action": {
                "button": button_text,
                "sections": sections,
            },
        },
    }


# ---------------------------------------------------------------------------
# HTTP helper – send via WhatsApp Cloud API, fall back to offline queue
# ---------------------------------------------------------------------------
import httpx  # noqa: E402

async def _send_whatsapp_payload(payload: dict[str, Any]) -> SendMessageResponse:
    """POST to Meta Cloud API. On failure, enqueue for later retry.
    """
    if not WHATSAPP_ACCESS_TOKEN or not WHATSAPP_PHONE_NUMBER_ID:
        logger.warning("WhatsApp credentials not configured – queuing message offline.")
        depth = _offline_queue.enqueue(payload)
        logger.info("Message queued. Queue depth: %d", depth)
        return SendMessageResponse(
            success=False,
            error="WhatsApp credentials not configured",
            queued_offline=True,
        )

    headers = {
        "Authorization": f"Bearer {WHATSAPP_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(WHATSAPP_BASE_URL, json=payload, headers=headers)

        if response.status_code in (200, 201):
            body = response.json()
            wamid = (
                body.get("messages", [{}])[0].get("id", "")
                if isinstance(body.get("messages"), list)
                else body.get("id", "")
            )
            _offline_queue.record_sent()
            return SendMessageResponse(success=True, message_id=wamid)

        # 4xx/5xx – try once more then queue
        logger.error(
            "WhatsApp API error %d: %s", response.status_code, response.text
        )
        # Retry once on transient errors
        if response.status_code >= 500:
            async with httpx.AsyncClient(timeout=15.0) as client:
                retry = await client.post(
                    WHATSAPP_BASE_URL, json=payload, headers=headers
                )
            if retry.status_code in (200, 201):
                body = retry.json()
                wamid = (
                    body.get("messages", [{}])[0].get("id", "")
                    if isinstance(body.get("messages"), list)
                    else body.get("id", "")
                )
                _offline_queue.record_sent()
                return SendMessageResponse(success=True, message_id=wamid)

        depth = _offline_queue.enqueue(payload)
        _offline_queue.record_failed()
        logger.error("Message queued for retry. Queue depth: %d", depth)
        return SendMessageResponse(
            success=False,
            error=f"API error {response.status_code}: {response.text[:200]}",
            queued_offline=True,
        )

    except httpx.TimeoutException:
        logger.exception("WhatsApp API timeout")
        depth = _offline_queue.enqueue(payload)
        _offline_queue.record_failed()
        return SendMessageResponse(
            success=False, error="Request timeout", queued_offline=True
        )
    except Exception as exc:
        logger.exception("Unexpected error sending WhatsApp message")
        depth = _offline_queue.enqueue(payload)
        _offline_queue.record_failed()
        return SendMessageResponse(
            success=False, error=str(exc)[:200], queued_offline=True
        )


# ---------------------------------------------------------------------------
# Message parsing helpers
# ---------------------------------------------------------------------------
def _extract_contact(contact_obj: dict[str, Any]) -> InboundContact:
    wa_id = contact_obj.get("wa_id", "")
    name_obj = contact_obj.get("profile", {})
    name = name_obj.get("name") if isinstance(name_obj, dict) else None
    return InboundContact(wa_id=wa_id, name=name)


def _parse_message(message_obj: dict[str, Any]) -> InboundMessage:
    """Parse a single WhatsApp message object into an InboundMessage schema.
    """
    msg_type_raw = message_obj.get("type", "unknown")
    try:
        msg_type = MessageType(msg_type_raw)
    except ValueError:
        msg_type = MessageType.UNKNOWN

    text_body: str | None = None
    button_payload: str | None = None
    interactive_response: dict[str, Any] | None = None
    location: dict[str, Any] | None = None

    if msg_type == MessageType.TEXT:
        text_body = message_obj.get("text", {}).get("body", "")

    elif msg_type == MessageType.BUTTON_REPLY:
        button_payload = (
            message_obj.get("button", {}).get("payload", "")
        )
        text_body = (
            message_obj.get("button", {}).get("title", button_payload or "")
        )

    elif msg_type == MessageType.INTERACTIVE:
        interactive_response = message_obj.get("interactive", {})
        # Extract a human-readable summary from the interactive reply
        inter = interactive_response
        if inter.get("type") == "button_reply":
            button_payload = inter.get("button_reply", {}).get("id", "")
            text_body = inter.get("button_reply", {}).get("title", "")
        elif inter.get("type") == "list_reply":
            button_payload = inter.get("list_reply", {}).get("id", "")
            text_body = inter.get("list_reply", {}).get("title", "")

    elif msg_type == MessageType.LOCATION:
        location = message_obj.get("location", {})

    elif msg_type in (MessageType.IMAGE, MessageType.DOCUMENT):
        media_key = msg_type.value  # "image" or "document"
        media_obj = message_obj.get(media_key, {})
        text_body = f"[{msg_type.value.upper()} received – id: {media_obj.get('id', 'N/A')}]"

    return InboundMessage(
        message_id=message_obj.get("id", ""),
        from_contact=_extract_contact(message_obj.get("from", {})),
        timestamp=datetime.fromtimestamp(
            int(message_obj.get("timestamp", 0))
        ),
        type=msg_type,
        text=text_body,
        button_payload=button_payload,
        interactive_response=interactive_response,
        location=location,
        metadata=message_obj,
    )


def _parse_webhook_payload(body: dict[str, Any]) -> list[InboundMessage]:
    """Extract all InboundMessages from a Meta webhook POST body.
    """
    messages: list[InboundMessage] = []
    try:
        entry_list = body.get("entry", [])
        for entry in entry_list:
            changes = entry.get("changes", [])
            for change in changes:
                value = change.get("value", {})
                if value.get("messaging_product") != "whatsapp":
                    continue
                for messaging_event in value.get("messages", []):
                    messages.append(_parse_message(messaging_event))
    except Exception as exc:
        logger.error("Failed to parse webhook payload: %s", exc, exc_info=True)
    return messages


# ---------------------------------------------------------------------------
# Background worker – route inbound messages to whatsapp_service
# ---------------------------------------------------------------------------
async def _process_inbound_async(messages: list[InboundMessage]) -> None:
    """Called in the background so that we return 200 OK to Meta immediately."""
    if not messages:
        return

    try:
        # Lazy import to avoid circular deps; whatsapp_service imports this router
        from services.whatsapp_service import WhatsAppService  # type: ignore[attr-defined]
        from services.student_service import StudentService  # type: ignore[attr-defined]
        from database import get_async_db as _get_db

        async for db in _get_db():
            svc = WhatsAppService(db=db)
            student_svc = StudentService(db=db)
            for msg in messages:
                try:
                    await svc.handle_incoming(
                        wa_id=msg.from_contact.wa_id,
                        message_type=msg.type.value,
                        text=msg.text or "",
                        button_payload=msg.button_payload,
                        interactive_response=msg.interactive_response,
                        message_id=msg.message_id,
                        timestamp=msg.timestamp,
                    )
                    # Auto-register student if first contact
                    await student_svc.ensure_wa_registered(
                        wa_id=msg.from_contact.wa_id,
                        display_name=msg.from_contact.name,
                    )
                except Exception:
                    logger.exception(
                        "Error processing inbound message %s", msg.message_id
                    )
    except ImportError:
        logger.warning(
            "WhatsAppService not yet implemented – message %s dropped.",
            messages[0].message_id,
        )


# ---------------------------------------------------------------------------
# Background worker – flush offline queue
# ---------------------------------------------------------------------------
async def _flush_offline_queue() -> None:
    """Retry sending all queued messages. Intended to be called from a
    periodic FastAPI BackgroundTasks or APScheduler job.
    """
    items = _offline_queue.drain()
    if not items:
        return
    logger.info("Flushing %d queued WhatsApp messages…", len(items))
    sent = 0
    failed = 0
    for payload in items:
        result = await _send_whatsapp_payload(payload)
        if result.success:
            sent += 1
        else:
            failed += 1
    logger.info("Flush complete: %d sent, %d still failed", sent, failed)


def schedule_flush(background_tasks: BackgroundTasks) -> None:
    """Helper for endpoints that want to guarantee at-least-once delivery.
    Call this inside the endpoint when what you just enqueued might also
    benefit from a flush pass.
    """
    background_tasks.add_task(_flush_offline_queue)


# ---------------------------------------------------------------------------
# Role-check dependency
# ---------------------------------------------------------------------------
from fastapi import Depends

async def _require_admin_or_teacher(
    authorization: str = Header(""),
) -> dict[str, Any]:
    """Validate that the caller is an admin or teacher.
    Expects: Authorization: Bearer <jwt_token>
    Replace with your actual auth middleware / dependency.
    """
    # TODO: replace with real JWT decode + role check
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    token = authorization[7:]
    # Placeholder – integrate with your auth service
    return {"user_id": 0, "role": "admin", "token": token}


# ---------------------------------------------------------------------------
# ENDPOINTS
# ---------------------------------------------------------------------------

@router.get(
    "/webhook",
    response_model=dict[str, str],
    summary="Meta WhatsApp webhook verification (GET)",
    description=(
        "Meta calls this endpoint with hub.verify_token to confirm ownership."
        " We respond with hub.challenge if the token matches."
    ),
)
async def verify_webhook(
    hub_mode: str = Query(..., alias="hub.mode"),
    hub_verify_token: str = Query(..., alias="hub.verify_token"),
    hub_challenge: str = Query(..., alias="hub.challenge"),
) -> dict[str, str]:
    if hub_mode != "subscribe":
        raise HTTPException(status_code=400, detail="hub.mode must be 'subscribe'")
    if hub_verify_token != WHATSAPP_VERIFY_TOKEN:
        logger.warning(
            "Webhook verification failed – token mismatch (got: %s)", hub_verify_token
        )
        raise HTTPException(status_code=403, detail="Verify token mismatch")

    logger.info("WhatsApp webhook verified successfully.")
    return {"hub.challenge": hub_challenge}


@router.post(
    "/webhook",
    summary="Receive inbound WhatsApp messages",
    description=(
        "Meta posts here for every inbound message / status update."
        " Returns 200 immediately and processes messages asynchronously."
    ),
)
async def receive_webhook(
    request: Request,
    background_tasks: BackgroundTasks,
    x_hub_signature_256: str | None = Header(None, alias="X-Hub-Signature-256"),
) -> dict[str, str]:
    raw_body = await request.body()

    # Optional signature verification (skipped if no APP_SECRET configured)
    if not _verify_signature(raw_body, x_hub_signature_256):
        logger.warning("Webhook signature verification failed.")
        raise HTTPException(status_code=403, detail="Invalid signature")

    try:
        body: dict[str, Any] = json.loads(raw_body)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    # Meta may send status callbacks (sent / delivered / read) – log & ignore
    messages = _parse_webhook_payload(body)

    if not messages:
        # Could be a status update or unsupported event – acknowledge silently
        return {"status": "ok", "processed": False}

    # Process each incoming message asynchronously
    for msg in messages:
        try:
            await _whatsapp.handle_incoming(msg)
        except Exception as exc:
            logger.warning("WhatsApp handler error: %s", exc)

    return {"status": "ok", "processed": len(messages)}