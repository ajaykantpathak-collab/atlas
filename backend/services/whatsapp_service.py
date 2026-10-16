"""
WhatsApp Bot Service for K-12 Learning Platform (CISCE/ICSE/ISC)
Supports WhatsApp Business Cloud API (Meta) and Twilio WhatsApp API.
Sends Hinglish notifications to parents and students.
Handles incoming webhooks with offline-capable queuing.

ENVIRONMENT VARIABLES:
  WHATSAPP_PROVIDER         - "meta" | "twilio" (default: meta)
  WHATSAPP_API_KEY          - API key / bearer token for the provider
  WHATSAPP_PHONE_NUMBER_ID  - Phone number ID (Meta Cloud API)
  WHATSAPP_TOKEN            - Access token (Meta) or Account SID (Twilio)
  WHATSAPP_TWILIO_ACCOUNT_SID - Twilio Account SID (twilio provider)
  WHATSAPP_TWILIO_AUTH_TOKEN - Twilio Auth Token (twilio provider)
  WHATSAPP_TWILIO_FROM      - Twilio WhatsApp sender number (e.g. whatsapp:+14155238886)
  WHATSAPP_WEBHOOK_SECRET   - Webhook verification token (Meta)
  WHATSAPP_APP_URL          - Public URL of this service (for webhook path)
  WHATSAPP_MAX_RETRIES      - Max retries for failed sends (default: 3)
  WHATSAPP_RATE_LIMIT       - Max messages per window per number (default: 20/hr)
"""

from __future__ import annotations

import asyncio
import hashlib
import hmac
import json
import logging
import os
import time
import uuid
from collections import defaultdict
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Optional

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import Student, Attempt, Mastery, PracticeSession
from services.practice_service import PracticeService
try:
    from services.streak_service import StreakService
except ImportError:
    # services/streak_service.py was DELETED (audit 2026-10-05): an unwired
    # parallel streak engine contradicting the canonical reward_ledger model.
    # Nothing ever injected one — every WhatsAppService() construction is
    # bare, and the handlers below guard on `self._streak`. Only used as an
    # optional ctor type hint below.
    StreakService = None  # type: ignore
try:
    from services.mastery_sync import MasterySync
except ImportError:
    # MasterySync no longer exists; the module's sync service class is
    # IRTSyncService. Only used as an optional ctor type hint below.
    try:
        from services.mastery_sync import IRTSyncService as MasterySync  # type: ignore
    except ImportError:  # fully offline fallback — hint only
        MasterySync = None  # type: ignore

logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
class WhatsAppProvider(str, Enum):
    META = "meta"
    TWILIO = "twilio"


def _get_env_str(name: str, default: str | None = None) -> str | None:
    val = os.environ.get(name)
    if val is None and default is not None:
        return default
    return val


def _get_env_int(name: str, default: int) -> int:
    try:
        return int(os.environ.get(name, default))
    except (ValueError, TypeError):
        return default


class WhatsAppConfig:
    provider: WhatsAppProvider
    api_key: str | None
    phone_number_id: str | None
    token: str | None
    twilio_account_sid: str | None
    twilio_auth_token: str | None
    twilio_from: str | None
    webhook_secret: str | None
    app_url: str | None
    max_retries: int
    rate_limit: int

    def __init__(self) -> None:
        raw = (_get_env_str("WHATSAPP_PROVIDER") or "meta").lower()
        try:
            self.provider = WhatsAppProvider(raw)
        except ValueError:
            logger.warning("Unknown WHATSAPP_PROVIDER '%s', falling back to 'meta'", raw)
            self.provider = WhatsAppProvider.META

        self.api_key = _get_env_str("WHATSAPP_API_KEY")
        self.phone_number_id = _get_env_str("WHATSAPP_PHONE_NUMBER_ID")
        self.token = _get_env_str("WHATSAPP_TOKEN")
        self.twilio_account_sid = _get_env_str("WHATSAPP_TWILIO_ACCOUNT_SID") or _get_env_str("TWILIO_ACCOUNT_SID")
        self.twilio_auth_token = _get_env_str("WHATSAPP_TWILIO_AUTH_TOKEN") or _get_env_str("TWILIO_AUTH_TOKEN")
        self.twilio_from = _get_env_str("WHATSAPP_TWILIO_FROM") or "whatsapp:+14155238886"
        self.webhook_secret = _get_env_str("WHATSAPP_WEBHOOK_SECRET")
        self.app_url = (_get_env_str("WHATSAPP_APP_URL") or "").rstrip("/")
        self.max_retries = _get_env_int("WHATSAPP_MAX_RETRIES", 3)
        self.rate_limit = _get_env_int("WHATSAPP_RATE_LIMIT", 20)

    def validate(self) -> None:
        if self.provider == WhatsAppProvider.META:
            missing = [
                n for n, v in [
                    ("WHATSAPP_API_KEY", self.api_key),
                    ("WHATSAPP_PHONE_NUMBER_ID", self.phone_number_id),
                    ("WHATSAPP_TOKEN", self.token),
                ] if not v
            ]
        else:
            missing = [
                n for n, v in [
                    ("WHATSAPP_TWILIO_ACCOUNT_SID", self.twilio_account_sid),
                    ("WHATSAPP_TWILIO_AUTH_TOKEN", self.twilio_auth_token),
                ] if not v
            ]
        if missing:
            raise EnvironmentError(
                "Missing WhatsApp config: " + ", ".join(missing)
            )


config = WhatsAppConfig()


# ---------------------------------------------------------------------------
# Rate limiter (sliding-window, per phone number)
# ---------------------------------------------------------------------------
class RateLimiter:
    """Token-bucket-inspired sliding window per phone number."""

    def __init__(self, max_per_window: int, window_seconds: int = 3600) -> None:
        self._max = max_per_window
        self._window = window_seconds
        self._hits: dict[str, list[float]] = defaultdict(list)

    def is_allowed(self, phone: str) -> bool:
        now = time.monotonic()
        cutoff = now - self._window
        self._hits[phone] = [t for t in self._hits[phone] if t > cutoff]
        if len(self._hits[phone]) >= self._max:
            return False
        self._hits[phone].append(now)
        return True

    def remaining(self, phone: str) -> int:
        now = time.monotonic()
        cutoff = now - self._window
        self._hits[phone] = [t for t in self._hits[phone] if t > cutoff]
        return max(0, self._max - len(self._hits[phone]))


rate_limiter = RateLimiter(config.rate_limit)


# ---------------------------------------------------------------------------
# Offline queue (JSON file – swap for Redis in production)
# ---------------------------------------------------------------------------
class OfflineQueue:
    """Persists outbound messages when the network is unavailable.

    Uses a JSON lines file under ``data/whatsapp_queue.jsonl``.
    Call ``drain()`` after connectivity is restored.
    """

    def __init__(self, path: str = "data/whatsapp_queue.jsonl") -> None:
        self._path = path
        os.makedirs(os.path.dirname(path) or ".", exist_ok=True)

    def enqueue(self, payload: dict[str, Any]) -> None:
        payload["queued_at"] = datetime.now(timezone.utc).isoformat()
        payload["retries"] = 0
        payload["id"] = str(uuid.uuid4())
        with open(self._path, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(payload, ensure_ascii=False) + "\n")
        logger.info("Queued WhatsApp message for %s", payload.get("to"))

    def drain(self, send_fn: Any) -> None:
        if not os.path.exists(self._path):
            return
        remaining: list[str] = []
        with open(self._path, "r", encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line:
                    continue
                try:
                    item = json.loads(line)
                except json.JSONDecodeError:
                    continue
                try:
                    loop = asyncio.get_event_loop()
                    if loop.is_running():
                        asyncio.ensure_future(self._send_item(item, send_fn))
                    else:
                        loop.run_until_complete(self._send_item(item, send_fn))
                except RuntimeError:
                    asyncio.ensure_future(self._send_item(item, send_fn))
        # In practice replace file atomically; keeping it simple here.

    @staticmethod
    async def _send_item(item: dict[str, Any], send_fn: Any) -> None:
        retries = item.get("retries", 0)
        try:
            result = await send_fn(item["to"], item["message"], item.get("template"))
            if result.get("success"):
                logger.info("Drained queued message %s", item["id"])
            else:
                raise Exception(result.get("error"))
        except Exception as exc:
            retries += 1
            if retries >= config.max_retries:
                logger.error("Dropping queued message %s after %d retries: %s", item["id"], retries, exc)
            else:
                item["retries"] = retries
                queue = OfflineQueue()
                queue.enqueue(item)


offline_queue = OfflineQueue()


# ---------------------------------------------------------------------------
# HTTP client (shared across Meta / Twilio)
# ---------------------------------------------------------------------------
class _HTTPClient:
    def __init__(self) -> None:
        self._client: httpx.AsyncClient | None = None

    async def get(self) -> httpx.AsyncClient:
        if self._client is None or self._client.is_closed:
            self._client = httpx.AsyncClient(timeout=httpx.Timeout(30.0))
        return self._client

    async def aclose(self) -> None:
        if self._client and not self._client.is_closed:
            await self._client.aclose()


_http = _HTTPClient()


# ---------------------------------------------------------------------------
# Provider adapters
# ---------------------------------------------------------------------------
class MetaWhatsAppAdapter:
    """WhatsApp Business Cloud API adapter (Meta)."""

    BASE_URL = "https://graph.facebook.com/v19.0"

    def __init__(self, cfg: WhatsAppConfig) -> None:
        self._cfg = cfg

    def _headers(self) -> dict[str, str]:
        return {
            "Authorization": f"Bearer {self._cfg.token}",
            "Content-Type": "application/json",
        }

    async def send_text(
        self,
        to_phone: str,
        message: str,
        template_name: str | None = None,
        template_lang: str = "en_US",
    ) -> dict[str, Any]:
        to = self._normalise(to_phone)
        url = (
            f"{self.BASE_URL}/{self._cfg.phone_number_id}/messages"
        )
        if template_name:
            body: dict[str, Any] = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": to,
                "type": "template",
                "template": {
                    "name": template_name,
                    "language": {"code": template_lang},
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {"type": "text", "text": message}
                            ],
                        }
                    ],
                },
            }
        else:
            body = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": to,
                "type": "text",
                "text": {"preview_url": False, "body": message},
            }

        client = await _http.get()
        try:
            resp = await client.post(url, headers=self._headers(), json=body)
        except httpx.HTTPError as exc:
            logger.error("Meta WhatsApp send failed: %s", exc)
            return {"success": False, "error": str(exc)}

        if resp.status_code in (200, 201):
            data = resp.json()
            logger.info(
                "Meta WhatsApp sent to %s (msg_id=%s)",
                to,
                data.get("messages", [{}])[0].get("id", "?"),
            )
            return {"success": True, "message_id": data.get("messages", [{}])[0].get("id")}
        else:
            logger.error("Meta WhatsApp error %s: %s", resp.status_code, resp.text)
            return {"success": False, "error": resp.text, "status": resp.status_code}

    async def mark_read(self, message_id: str) -> None:
        url = f"{self.BASE_URL}/{message_id}"
        client = await _http.get()
        try:
            await client.post(
                url,
                headers=self._headers(),
                json={"status": "read"},
            )
        except httpx.HTTPError:
            pass

    @staticmethod
    def _normalise(phone: str) -> str:
        p = phone.strip().replace(" ", "").replace("-", "")
        if not p.startswith("+"):
            p = "+" + p
        return p

    @staticmethod
    def verify_webhook(mode: str | None, token: str | None, verify_token: str | None) -> bool:
        return bool(mode == "subscribe" and token and verify_token and token == verify_token)


class TwilioWhatsAppAdapter:
    """Twilio WhatsApp API adapter."""

    BASE_URL = "https://api.twilio.com/2010-04-01"

    def __init__(self, cfg: WhatsAppConfig) -> None:
        self._cfg = cfg

    async def send_text(
        self,
        to_phone: str,
        message: str,
        template_name: str | None = None,
        template_lang: str = "en_US",
    ) -> dict[str, Any]:
        to = self._normalise(to_phone)
        from_num = self._cfg.twilio_from
        # Twilio uses SID + auth token for Basic Auth
        auth = (
            self._cfg.twilio_account_sid or "",
            self._cfg.twilio_auth_token or "",
        )
        params: dict[str, str] = {
            "From": from_num,
            "To": f"whatsapp:{to}",
            "Body": message,
        }
        # Twilio also supports template via content SID in the Body field
        if template_name:
            params["Body"] = message
            # If using a Twilio-approved content template, add ContentSid
            # params["ContentSid"] = template_name  # uncomment when using templates

        url = f"{self.BASE_URL}/Accounts/{auth[0]}/Messages.json"
        client = await _http.get()
        try:
            resp = await client.post(url, auth=auth, data=params)
        except httpx.HTTPError as exc:
            logger.error("Twilio WhatsApp send failed: %s", exc)
            return {"success": False, "error": str(exc)}

        if resp.status_code in (200, 201):
            data = resp.json()
            logger.info(
                "Twilio WhatsApp sent to %s (sid=%s)",
                to,
                data.get("sid", "?"),
            )
            return {"success": True, "sid": data.get("sid")}
        else:
            logger.error("Twilio WhatsApp error %s: %s", resp.status_code, resp.text)
            return {"success": False, "error": resp.text, "status": resp.status_code}

    async def mark_read(self, message_id: str) -> None:
        # Twilio does not expose a read-receipt endpoint in the same way; skip.
        pass

    @staticmethod
    def _normalise(phone: str) -> str:
        p = phone.strip().replace(" ", "").replace("-", "")
        if p.startswith("whatsapp:"):
            p = p[len("whatsapp:") :]
        return p

    @staticmethod
    def verify_webhook(mode: str | None, token: str | None, verify_token: str | None) -> bool:
        return False  # Twilio uses a different validation flow


# ---------------------------------------------------------------------------
# Message templates (Hinglish)
# ---------------------------------------------------------------------------
# Each template is a tuple of (meta_template_name, twilio_fallback_text, formatter)
# formatter: callable that receives context dict → str
class Templates:
    """Hinglish WhatsApp message templates."""

    @staticmethod
    def status(
        student_name: str,
        class_label: str,
        homework_done: bool,
        streak_days: int,
        subject_count: int,
        parent_verified: bool = True,
    ) -> str:
        homework_hi = "✅ Homework done hai" if homework_done else "❌ Homework abhi baki hai"
        streak_hi = f"🔥 {streak_days} din ka streak active hai" if streak_days > 0 else "😔 Abhi streak nahi hai"
        verified_note = "" if parent_verified else "\n📌 Poore details ke liye account verify karein."

        return (
            f"📊 *{student_name} ka Daily Status*\n\n"
            f"🏫 Class: {class_label}\n"
            f"📚 Subjects: {subject_count}\n"
            f"{homework_hi}\n"
            f"{streak_hi}"
            f"{verified_note}\n\n"
            f"— PrepMate 💪"
        )

    @staticmethod
    def homework(
        student_name: str,
        subjects: list[dict[str, Any]],
    ) -> str:
        lines = [f"📝 *{student_name} ka Homework Status*\n"]
        for subj in subjects:
            status_emoji = "✅" if subj.get("done") else "⏳"
            subject_name = subj.get("name", subj.get("subject", "Unknown"))
            last_done = subj.get("last_done", "N/A")
            lines.append(f"{status_emoji} {subject_name} — Last: {last_done}")
        lines.append("\n💡 Padhai regular rakho — daily practice se marks badhte hain!")
        lines.append("\n— PrepMate")
        return "\n".join(lines)

    @staticmethod
    def progress(
        student_name: str,
        mastery: list[dict[str, Any]],
        parent_verified: bool = True,
    ) -> str:
        if not mastery:
            return (
                f"📈 *{student_name} ki Progress*\n\n"
                f"Abhi koi mastery data available nahi hai.\n"
                f"Thoda aur practice karte rahein!\n\n"
                f"— PrepMate 💪"
            )

        lines = [f"📈 *{student_name} ki Subject-wise Progress*\n"]
        for m in mastery:
            subject_name = m.get("subject", m.get("chapter", "Unknown"))
            score = m.get("mastery_score", m.get("score", 0))
            level = m.get("level", "Beginner")
            if parent_verified:
                lines.append(f"📖 {subject_name}: {score}% — {level}")
            else:
                bar = _mastery_bar(score)
                lines.append(f"📖 {subject_name}: {bar} {level}")
        lines.append(
            "\n💡 Regular practice se mastery score badhao!\n"
            "Har din thoda thoda karo — consistency is key! 🔑\n\n"
            "— PrepMate"
        )
        return "\n".join(lines)

    @staticmethod
    def streak(
        student_name: str,
        current_streak: int,
        best_streak: int,
        last_active: str | None,
    ) -> str:
        if current_streak > 0:
            streak_msg = (
                f"🔥 *{current_streak} din ka streak chal raha hai!*\n"
                f"Bahut badhiya, {student_name}! Aise hi momentum rakho.\n\n"
                f"🏆 Best Streak: {best_streak} din"
            )
        else:
            streak_msg = (
                f"😔 *Streak break ho gaya*\n"
                f"Kal se wapas start karo! Chhote-chhote targets rakho.\n"
                f"🏆 Best Streak: {best_streak} din"
            )

        if last_active:
            streak_msg += f"\n\n🕐 Last active: {last_active}"

        streak_msg += "\n\n— PrepMate 💪"
        return streak_msg

    @staticmethod
    def upcoming_exams(
        student_name: str,
        exams: list[dict[str, Any]],
    ) -> str:
        if not exams:
            return (
                f"📅 *{student_name} ke liye aane wale Exams*\n\n"
                f"Abhi koi exam schedule nahi hai.\n"
                f"Jaise-jaise dates aayengi, hum batayenge!\n\n"
                f"— PrepMate"
            )
        lines = [f"📅 *{student_name} ke liye Upcoming Exams*\n"]
        for ex in exams[:5]:
            date = ex.get("date", ex.get("exam_date", "TBD"))
            subject = ex.get("subject", ex.get("name", "Exam"))
            days_left = ex.get("days_left", "?")
            lines.append(f"📌 {subject} — {date} ({days_left} days left)")
        lines.append(
            "\n💡 Exam se pehle revision complete kar lo!\n"
            "Roj thoda practice karne se tension kam hoti hai. 😊\n\n"
            "— PrepMate"
        )
        return "\n".join(lines)

    @staticmethod
    def help_text(parent_name: str = "Parent", student_name: str = "your child") -> str:
        return (
            f"🙏 Namaste {parent_name}!\n\n"
            f"{student_name} ka status check karne ke liye neeche diye gaye\n"
            f"commands bhejein:\n\n"
            f"📋 *Available Commands:*\n\n"
            f"1. *status* — Aaj ka overall status (homework + streak)\n"
            f"2. *homework* — Subject-wise homework status\n"
            f"3. *progress* — Subject-wise mastery/progress\n"
            f"4. *streak* — Current streak aur best streak\n"
            f"5. *exams* — Aane wale exams ki list\n"
            f"6. *help* — Yehi help message\n\n"
            f"💡 Bas command type karein — jaise: *status*\n\n"
            f"Koi problem ho to *contact* bhejein.\n\n"
            f"— PrepMate, har din thoda thoda 💪"
        )

    @staticmethod
    def verify_prompt(student_name: str) -> str:
        return (
            f"🔐 *Verification Required*\n\n"
            f"{student_name} ke detailed scores dekhne ke liye,\n"
            f"apne account ko verify karwa lein.\n\n"
            f"📱 App mein jaakar Settings → Verify Number karein,\n"
            f"ya school office se contact karein.\n\n"
            f"Verification ke baad poore details dikhengi!\n\n"
            f"— PrepMate"
        )

    @staticmethod
    def unknown_command() -> str:
        return (
            "🤔 Samajh nahi aaya!\n\n"
            "Kripya *help* type karke available commands dekhein.\n\n"
            "Jaise: status, homework, progress, streak, exams\n\n"
            "— PrepMate"
        )


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _mastery_bar(score: int, width: int = 5) -> str:
    filled = round(score / 100 * width)
    return "█" * filled + "░" * (width - filled)


def _normalise_phone(phone: str) -> str:
    p = phone.strip().replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
    if not p.startswith("+"):
        p = "+" + p
    return p


def _days_ago(date_str: str | None) -> int:
    if not date_str:
        return 999
    try:
        d = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        return (datetime.now(timezone.utc) - d).days
    except (ValueError, TypeError):
        return 999


def _format_last_active(last_active_str: str | None) -> str:
    if not last_active_str:
        return "N/A"
    try:
        d = datetime.fromisoformat(last_active_str.replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        delta = now - d
        if delta.days == 0:
            return "Aaj"
        elif delta.days == 1:
            return "Kal"
        elif delta.days < 7:
            return f"{delta.days} din pehle"
        else:
            return d.strftime("%d %b %Y")
    except (ValueError, TypeError):
        return "N/A"


# ---------------------------------------------------------------------------
# Main WhatsApp Service
# ---------------------------------------------------------------------------
class WhatsAppService:
    """
    Central service that owns:
    - sending outbound messages (Meta or Twilio)
    - building Hinglish notification payloads
    - parsing incoming webhook payloads
    - offline queue management

    Usage::

        svc = WhatsAppService(db_session_factory=..., practice_svc=..., ...)
        await svc.startup()
        # On FastAPI startup, call svc.drain_queue() periodically or on reconnect.
    """

    def __init__(
        self,
        *,
        db_session_factory: Any = None,
        practice_service: PracticeService | None = None,
        streak_service: StreakService | None = None,
        mastery_sync: MasterySync | None = None,
    ) -> None:
        self._cfg = config
        self._db_session_factory = db_session_factory
        self._practice = practice_service
        self._streak = streak_service
        self._mastery = mastery_sync

        if self._cfg.provider == WhatsAppProvider.TWILIO:
            self._adapter = TwilioWhatsAppAdapter(self._cfg)
        else:
            self._adapter = MetaWhatsAppAdapter(self._cfg)

        # Command → handler mapping
        self._commands: dict[str, str] = {
            "status": "_cmd_status",
            "homework": "_cmd_homework",
            "progress": "_cmd_progress",
            "streak": "_cmd_streak",
            "exams": "_cmd_exams",
            "exam": "_cmd_exams",
            "help": "_cmd_help",
            "contact": "_cmd_contact",
            "verify": "_cmd_verify",
        }

    # ------------------------------------------------------------------ #
    # Lifecycle
    # ------------------------------------------------------------------ #
    async def startup(self) -> None:
        self._cfg.validate()
        logger.info(
            "WhatsAppService started (provider=%s)", self._cfg.provider.value
        )

    async def shutdown(self) -> None:
        await _http.aclose()
        logger.info("WhatsAppService shut down")

    async def drain_queue(self) -> int:
        """Flush the offline queue. Returns number of items attempted."""
        count = 0

        async def _send(to: str, message: str, template: str | None) -> dict:
            return await self.send_message(to, message, template)

        if not os.path.exists(offline_queue._path):
            return 0

        lines: list[str] = []
        with open(offline_queue._path, "r", encoding="utf-8") as fh:
            lines = [l.strip() for l in fh if l.strip()]

        kept: list[str] = []
        for line in lines:
            try:
                item = json.loads(line)
            except json.JSONDecodeError:
                continue
            result = await _send(item["to"], item["message"], item.get("template"))
            count += 1
            if not result.get("success"):
                item["retries"] = item.get("retries", 0) + 1
                if item["retries"] < self._cfg.max_retries:
                    kept.append(json.dumps(item, ensure_ascii=False))
            # on success: drop it

        with open(offline_queue._path, "w", encoding="utf-8") as fh:
            fh.write("\n".join(kept) + ("\n" if kept else ""))
        return count

    # ------------------------------------------------------------------ #
    # Low-level send
    # ------------------------------------------------------------------ #
    async def send_message(
        self,
        to_phone: str,
        message: str,
        template_name: str | None = None,
    ) -> dict[str, Any]:
        """Send a WhatsApp message.

        Returns ``{"success": True, "message_id": "..."}`` or
        ``{"success": False, "error": "...", "status": int}``.
        """
        to = _normalise_phone(to_phone)

        # Rate limit check
        if not rate_limiter.is_allowed(to):
            logger.warning("Rate-limited for %s", to)
            return {
                "success": False,
                "error": "rate_limited",
                "remaining": rate_limiter.remaining(to),
            }

        result = await self._adapter.send_text(to, message, template_name)
        if not result.get("success"):
            # Queue for retry
            offline_queue.enqueue(
                {"to": to, "message": message, "template": template_name}
            )
        return result

    async def send_template_message(
        self,
        to_phone: str,
        template_name: str,
        body_text: str,
        lang: str = "en_US",
    ) -> dict[str, Any]:
        """Send a pre-approved Meta template message.

        ``body_text`` fills the template's body parameters.
        """
        return await self.send_message(to_phone, body_text, template_name)

    # ------------------------------------------------------------------ #
    # High-level notification helpers
    # ------------------------------------------------------------------ #
    async def send_homework_notification(
        self,
        parent_phone: str,
        student_name: str,
        homework_status: dict[str, Any],
        parent_verified: bool = True,
    ) -> dict[str, Any]:
        """Send homework summary to a parent.

        ``homework_status`` keys:
          - ``subjects``: list[{"name", "done", "last_done"}]
          - ``overall_done``: bool
        """
        subjects = homework_status.get("subjects", [])
        if not parent_verified:
            # Summarise without exact details
            subjects = [
                {
                    "name": s.get("name", "Subject"),
                    "done": s.get("done", False),
                    "last_done": "—",
                }
                for s in subjects
            ]
        message = Templates.homework(student_name, subjects)
        return await self.send_message(parent_phone, message)

    async def send_progress_notification(
        self,
        parent_phone: str,
        student_name: str,
        mastery_summary: list[dict[str, Any]],
        parent_verified: bool = True,
    ) -> dict[str, Any]:
        """Send mastery/progress summary to a parent.

        ``mastery_summary``: list[{"subject", "mastery_score" or "score", "level"}]
        If ``parent_verified`` is False, exact scores are hidden (bar chart instead).
        """
        if not parent_verified:
            mastery_summary = [
                {
                    "subject": m.get("subject", m.get("chapter", "Subject")),
                    "mastery_score": m.get("mastery_score", m.get("score", 0)),
                    "level": m.get("level", "Beginner"),
                }
                for m in mastery_summary
            ]
        message = Templates.progress(student_name, mastery_summary, parent_verified)
        return await self.send_message(parent_phone, message)

    async def send_streak_notification(
        self,
        parent_phone: str,
        student_name: str,
        streak_info: dict[str, Any],
    ) -> dict[str, Any]:
        """Send streak notification to a parent.

        ``streak_info`` keys: ``current_streak``, ``best_streak``, ``last_active``
        """
        current = streak_info.get("current_streak", 0)
        best = streak_info.get("best_streak", 0)
        last_active = streak_info.get("last_active")
        message = Templates.streak(student_name, current, best, _format_last_active(last_active))
        return await self.send_message(parent_phone, message)

    async def send_exam_reminder(
        self,
        phone: str,
        student_name: str,
        exams: list[dict[str, Any]],
    ) -> dict[str, Any]:
        message = Templates.upcoming_exams(student_name, exams)
        return await self.send_message(phone, message)

    # ------------------------------------------------------------------ #
    # Incoming webhook: Meta verification
    # ------------------------------------------------------------------ #
    def verify_webhook(
        self,
        mode: str | None,
        token: str | None,
        verify_token: str | None,
    ) -> bool:
        """Meta webhook verification (GET /webhook?mode=subscribe&token=...)."""
        return self._adapter.verify_webhook(mode, token, verify_token)

    # ------------------------------------------------------------------ #
    # Incoming webhook: message handling
    # ------------------------------------------------------------------ #
    async def handle_incoming(self, message_data: dict[str, Any]) -> Optional[dict[str, Any]]:
        """
        Process an incoming WhatsApp webhook payload.

        **Meta payload shape** (events[].value.messages[]):
            {
              "object": "whatsapp_business_account",
              "entry": [{
                "changes": [{
                  "value": {
                    "messaging_product": "whatsapp",
                    "contacts": [{"wa_id": "919876543210", "profile": {"name": "Rahul"}}],
                    "messages": [{
                      "from": "919876543210",
                      "type": "text",
                      "text": {"body": "status"}
                    }]
                  }
                }]
              }]
            }

        **Twilio payload shape** (received via FastAPI POST):
            {
              "From": "whatsapp:+919876543210",
              "Body": "status",
              "MessageSid": "SMxxx",
              "ProfileName": "Rahul"
            }

        Returns a dict with keys: ``phone``, ``command``, ``display_name``, ``raw_body``.
        Returns ``None`` if the event is not an incoming user message.
        """
        text_body, phone, display_name = self._extract_message(message_data)
        if text_body is None or phone is None:
            return None

        command = self._parse_command(text_body)
        logger.info("Incoming from %s (%s): '%s' → command=%s", phone, display_name, text_body, command)

        # Resolve student from phone number
        student = await self._resolve_student(phone)

        # Dispatch
        response_text = await self._dispatch(command, student, phone)
        if response_text:
            await self.send_message(phone, response_text)

        return {
            "phone": phone,
            "command": command,
            "display_name": display_name,
            "raw_body": text_body,
            "student_id": student.id if student else None,
        }

    # ------------------------------------------------------------------ #
    # Internal helpers
    # ------------------------------------------------------------------ #
    def _extract_message(self, data: dict[str, Any]) -> tuple[str | None, str | None, str | None]:
        """Return (body_text, normalised_phone, display_name) or (None, None, None)."""
        # Twilio flat format first
        if "Body" in data and "From" in data:
            body = data.get("Body", "").strip()
            phone = _normalise_phone(data["From"].replace("whatsapp:", ""))
            name = data.get("ProfileName", "User")
            return body, phone, name

        # Meta nested format
        try:
            for entry in data.get("entry", []):
                for change in entry.get("changes", []):
                    value = change.get("value", {})
                    if value.get("messaging_product") != "whatsapp":
                        continue
                    for contact in value.get("contacts", []):
                        wa_id = contact.get("wa_id", "")
                        display_name = (
                            contact.get("profile", {}).get("name", "User")
                        )
                    for msg in value.get("messages", []):
                        if msg.get("type") != "text":
                            continue
                        body = msg.get("text", {}).get("body", "").strip()
                        phone = _normalise_phone(wa_id) if wa_id else None
                        return body, phone, display_name
        except (AttributeError, TypeError):
            pass

        return None, None, None

    @staticmethod
    def _parse_command(body: str) -> str:
        cmd = body.lower().strip().split()[0] if body.strip() else ""
        return cmd

    async def _resolve_student(self, phone: str) -> Student | None:
        """Look up a Student record by the phone number (parent or student)."""
        if self._db_session_factory is None:
            return None
        async with self._db_session_factory() as session:
            result = await session.execute(
                select(Student).where(Student.whatsapp_phone == phone).limit(1)
            )
            student = result.scalar_one_or_none()
            if student is None:
                # Try parent_phone column
                result = await session.execute(
                    select(Student).where(Student.parent_phone == phone).limit(1)
                )
                student = result.scalar_one_or_none()
            return student

    async def _dispatch(self, command: str, student: Student | None, phone: str) -> str:
        """Route the command to the appropriate handler and return a response text."""
        if student is None:
            return (
                "🙏 Namaste!\n\n"
                "Aapka number hamare system mein match nahi ho raha.\n"
                "Kripya apne child ka school ID batayein, ya school office se contact karein.\n\n"
                "— PrepMate"
            )

        handler_name = self._commands.get(command)
        if handler_name is None:
            return Templates.unknown_command()

        handler = getattr(self, handler_name, None)
        if handler is None:
            logger.warning("Handler %s not implemented", handler_name)
            return Templates.unknown_command()

        try:
            return await handler(student, phone)
        except Exception as exc:
            logger.exception("Command handler error: %s", exc)
            return (
                "😔 Kuch gadbad ho gayi. Thodi der baad try karein.\n\n"
                "Agar baar-baar ho to school office se contact karein.\n\n"
                "— PrepMate"
            )

    # ---- Command handlers ------------------------------------------- #

    async def _cmd_status(self, student: Student, phone: str) -> str:
        practice_svc = self._practice
        streak_svc = self._streak

        homework_done = False
        streak_days = 0
        subject_count = 0

        if practice_svc:
            session = await practice_svc.get_active_session(student.id)
            if session:
                # A session in progress counts as started
                homework_done = True

        if streak_svc:
            streak_data = await streak_svc.get_streak(student.id)
            streak_days = streak_data.get("current_streak", 0)

        if self._mastery:
            mastery_data = await self._mastery.get_mastery(student.id)
            subject_count = len(mastery_data) if mastery_data else 0

        if not subject_count:
            # Fallback: count from practice sessions
            if practice_svc:
                subject_count = await practice_svc.get_subject_count(student.id)

        parent_verified = student.is_verified if hasattr(student, "is_verified") else True
        return Templates.status(
            student_name=student.name,
            class_label=student.grade or student.class_label or "N/A",
            homework_done=homework_done,
            streak_days=streak_days,
            subject_count=subject_count,
            parent_verified=parent_verified,
        )

    async def _cmd_homework(self, student: Student, phone: str) -> str:
        practice_svc = self._practice
        if not practice_svc:
            return "⏳ Homework data abhi available nahi hai. Thodi der baad try karein."

        subjects = await practice_svc.get_homework_status(student.id)
        parent_verified = getattr(student, "is_verified", True)
        status = {"subjects": subjects, "overall_done": all(s.get("done") for s in subjects)}
        message = Templates.homework(student.name, subjects if parent_verified else
            [{"name": s.get("name", "Subject"), "done": s.get("done"), "last_done": "—"} for s in subjects])
        return message

    async def _cmd_progress(self, student: Student, phone: str) -> str:
        mastery_svc = self._mastery
        if not mastery_svc:
            return "⏳ Progress data abhi available nahi hai. Thodi der baad try karein."

        mastery_data = await mastery_svc.get_mastery(student.id)
        parent_verified = getattr(student, "is_verified", True)

        if not parent_verified:
            return Templates.verify_prompt(student.name)

        summary = [
            {
                "subject": m.get("subject") or m.get("chapter", "Subject"),
                "mastery_score": m.get("mastery_score", m.get("score", 0)),
                "level": m.get("level", "Beginner"),
            }
            for m in (mastery_data or [])
        ]
        return Templates.progress(student.name, summary, parent_verified=True)

    async def _cmd_streak(self, student: Student, phone: str) -> str:
        streak_svc = self._streak
        if not streak_svc:
            return "⏳ Streak data abhi available nahi hai. Thodi der baad try karein."

        streak_data = await streak_svc.get_streak(student.id)
        current = streak_data.get("current_streak", 0)
        best = streak_data.get("best_streak", 0)
        last_active = streak_data.get("last_active")
        return Templates.streak(student.name, current, best, _format_last_active(last_active))

    async def _cmd_exams(self, student: Student, phone: str) -> str:
        # Placeholder: integrate with an exam schedule service later
        exams = student.upcoming_exams if hasattr(student, "upcoming_exams") else []
        if isinstance(exams, str):
            try:
                exams = json.loads(exams)
            except (json.JSONDecodeError, TypeError):
                exams = []
        return Templates.upcoming_exams(student.name, exams)

    async def _cmd_help(self, student: Student, phone: str) -> str:
        return Templates.help_text("Parent", student.name)

    async def _cmd_contact(self, student: Student, phone: str) -> str:
        return (
            "📞 *Contact Us*\n\n"
            "Koi problem ho ya feedback dena ho,\n"
            "hamse direct contact kar sakte hain:\n\n"
            "📧 Email: support@prepmate.in\n"
            "📱 Phone: +91-98765-43210\n"
            "🕐 Support hours: 9 AM – 8 PM (Mon-Sat)\n\n"
            "— PrepMate"
        )

    async def _cmd_verify(self, student: Student, phone: str) -> str:
        return Templates.verify_prompt(student.name)

    # ------------------------------------------------------------------ #
    # Periodic notification tasks
    # ------------------------------------------------------------------ #
    async def send_daily_summary(
        self,
        parent_phone: str,
        student: Student,
    ) -> dict[str, Any]:
        """Convenience method: send a combined daily status + streak message."""
        message = await self._cmd_status(student, parent_phone)
        return await self.send_message(parent_phone, message)

    async def send_motivational_nudge(
        self,
        phone: str,
        student_name: str,
        streak_days: int = 0,
    ) -> dict[str, Any]:
        nudges = [
            f"💪 Arre {student_name}, aaj padhai start kar! Chhota step aaj ka bada kal ka result layega! 🚀",
            f"🔥 {student_name}, aaj ka din waste mat karo! 15 min practice se bhi farak padta hai.",
            f"🌟 {student_name}, apne aage ka soch. Aaj thoda padh ke sojoge, kal khushi se uthoge! 📚",
            f"⚡ {student_name}, streak banayein rakho! Consistency is the secret sauce. 😎",
        ]
        import random
        msg = random.choice(nudges)
        if streak_days >= 7:
            msg = (
                f"🏆 {student_name}, {streak_days} din ka streak! Wah! Isi tarah aage badho.\n"
                f"Aaj bhi ek chapter pakdo — target cross karo! 💪\n\n— PrepMate"
            )
        return await self.send_message(phone, msg)


# ---------------------------------------------------------------------------
# Webhook parser utility (for FastAPI route)
# ---------------------------------------------------------------------------
def parse_meta_webhook(body: bytes, signature: str | None, secret: str | None) -> bool:
    """Verify Meta's X-Hub-Signature-256 for webhook authenticity."""
    if not signature or not secret:
        return True  # Skip verification in dev
    try:
        algo, expected = signature.split("=")
        if algo != "sha256":
            return False
        mac = hmac.new(secret.encode(), body, hashlib.sha256)
        return hmac.compare_digest(mac.hexdigest(), expected)
    except (ValueError, AttributeError):
        return False


def normalise_phone(phone: str) -> str:
    """Public helper: normalise any phone number to E.164."""
    return _normalise_phone(phone)
