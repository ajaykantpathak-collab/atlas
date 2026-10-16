"""Student-scoped aliases + offline sync endpoints.

The frontend calls these paths (AccessibilityProvider sendBeacon, onboarding
page, offlineCache sync queue) — they were previously served by no mounted
router, so every call 404'd.  This router is the contract:

  POST /api/student/a11y-prefs    {"accessibility": {...}}   (sendBeacon or fetch)
  GET  /api/student/a11y-prefs
  POST /api/student/onboarding    {classLevel, board, subjects, language, goal, completed}
  GET  /api/student/onboarding
  POST /api/sync/{action_type}    arbitrary JSON payload (offline queue flush)

Accessibility prefs best-effort upsert into the real accessibility DB store
(backend.api.accessibility.upsert_student_preferences).  When the payload
doesn't match that schema, or the DB is unavailable, they degrade to a JSON
store under backend/_cache/ — persisted either way, never silently dropped.
sendBeacon sends text/plain bodies, so requests are parsed from raw bytes.
"""

from __future__ import annotations

import json
import logging
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, AsyncIterator, TYPE_CHECKING

from fastapi import APIRouter, Depends, HTTPException, Request, status

if TYPE_CHECKING:  # pragma: no cover
    from backend.models.user import User

from backend.deps import get_current_user, get_current_user_optional

logger = logging.getLogger(__name__)
router = APIRouter(tags=["student-sync"])

_CACHE_DIR = (
    Path(os.environ["ATLAS_CACHE_DIR"])
    if os.environ.get("ATLAS_CACHE_DIR")
    else Path(__file__).resolve().parents[1] / "_cache"
)
_A11Y_STORE = _CACHE_DIR / "student_a11y_prefs.json"
_ONBOARDING_STORE = _CACHE_DIR / "student_onboarding.json"
_SYNC_LOG = _CACHE_DIR / "sync_events.jsonl"

#: WS-D (2026-10-10): every raw-body endpoint here persists what it is
#: handed (JSON stores / JSONL append).  A body cap turns an anonymous
#: disk-fill stream into a bounded one; the sync action_type lands inside
#: captured records, so it stays a slug.
MAX_BODY_BYTES = 256 * 1024
_ACTION_TYPE_RE = re.compile(r"^[a-z0-9][a-z0-9_-]{0,39}$")


def _student_id(user: "User | None") -> str:
    return str(getattr(user, "id", None) or "guest")


def _validate_action_type(action_type: str) -> str:
    at = str(action_type or "").strip().lower()
    if not _ACTION_TYPE_RE.match(at):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="action_type must be a short slug (a-z, 0-9, -, _)",
        )
    return at


def _read_json(path: Path) -> dict:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {}


def _write_json_atomic(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(path.suffix + ".tmp")
    tmp.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    os.replace(tmp, path)


async def _json_body(request: Request, max_bytes: int = MAX_BODY_BYTES) -> dict:
    """Parse a JSON object body regardless of Content-Type (sendBeacon
    dispatches strings as text/plain).

    Bodies over ``max_bytes`` are rejected 413 BEFORE parsing — the sync
    sinks persist whatever they are handed, so an unbounded anonymous
    POST was an unbounded disk write (WS-D 2026-10-10)."""
    raw = await request.body()
    if len(raw) > max_bytes:
        raise HTTPException(
            status_code=413,
            detail=f"payload too large (max {max_bytes // 1024} KB)",
        )
    if not raw:
        return {}
    try:
        parsed = json.loads(raw)
    except Exception:
        return {}
    return parsed if isinstance(parsed, dict) else {"_raw": parsed}


async def _try_db_upsert(prefs: dict, sid: str) -> bool:
    """Upsert through the real accessibility store; False on schema mismatch
    or DB unavailability (caller falls back to the JSON store)."""
    try:
        from backend.api.accessibility import (
            AccessibilityPreferencesUpdate,
            get_db_session,
            upsert_student_preferences,
        )
        data = AccessibilityPreferencesUpdate.model_validate(prefs)
    except Exception:
        return False
    gen: AsyncIterator = get_db_session()
    try:
        db = await gen.__anext__()
    except Exception:
        return False
    try:
        await upsert_student_preferences(db, sid, data)
        return True
    except Exception:
        return False
    finally:
        await gen.aclose()


@router.post("/api/student/a11y-prefs", summary="Persist student accessibility prefs")
async def save_a11y_prefs(
    request: Request,
    user: "User | None" = Depends(get_current_user_optional),
) -> dict:
    body = await _json_body(request)
    prefs = body.get("accessibility") if isinstance(body.get("accessibility"), dict) else body
    if not prefs:
        return {"ok": False, "reason": "empty-payload"}
    sid = _student_id(user)
    if await _try_db_upsert(prefs, sid):
        return {"ok": True, "stored": "db", "student_id": sid}
    store = _read_json(_A11Y_STORE)
    store[sid] = {"prefs": prefs, "updated_at": datetime.now(timezone.utc).isoformat()}
    try:
        _write_json_atomic(_A11Y_STORE, store)
    except Exception as exc:
        logger.warning("a11y JSON store write failed: %s", exc)
        return {"ok": False, "reason": "store-unavailable"}
    return {"ok": True, "stored": "json", "student_id": sid}


@router.get("/api/student/a11y-prefs", summary="Read student accessibility prefs")
async def read_a11y_prefs(
    user: "User | None" = Depends(get_current_user_optional),
) -> dict:
    sid = _student_id(user)
    store = _read_json(_A11Y_STORE)
    entry = store.get(sid) or {}
    return {"student_id": sid, "accessibility": entry.get("prefs") or {}}


@router.post("/api/student/onboarding", summary="Persist onboarding completion")
async def save_onboarding(
    request: Request,
    user: "User | None" = Depends(get_current_user_optional),
) -> dict:
    body = await _json_body(request)
    if not body:
        return {"ok": False, "reason": "empty-payload"}
    sid = _student_id(user)
    store = _read_json(_ONBOARDING_STORE)
    body["updated_at"] = datetime.now(timezone.utc).isoformat()
    store[sid] = body
    try:
        _write_json_atomic(_ONBOARDING_STORE, store)
    except Exception as exc:
        logger.warning("onboarding store write failed: %s", exc)
        return {"ok": False, "reason": "store-unavailable"}
    return {"ok": True, "student_id": sid}


@router.get("/api/student/onboarding", summary="Read onboarding state")
async def read_onboarding(
    user: "User | None" = Depends(get_current_user_optional),
) -> dict:
    sid = _student_id(user)
    return {"student_id": sid, "onboarding": _read_json(_ONBOARDING_STORE).get(sid) or {}}


@router.post("/api/sync/{action_type}", summary="Flush one offline-queue action")
async def sync_action(
    action_type: str,
    request: Request,
    user: "User | None" = Depends(get_current_user_optional),
) -> dict:
    payload = await _json_body(request)
    sid = _student_id(user)
    action_type = _validate_action_type(action_type)

    # ── Offline recovery: practice answers are RECONCILED, not just logged ──
    # The practice page queues every answer made offline and flushes it here
    # on reconnect. This used to only append a JSONL log line — offline
    # practice never reached the attempts table or the mastery record.
    # apply_offline_answer re-grades server-side and applies mastery through
    # the one ledger exactly once (persistent dedup token from the payload),
    # so a retried flush can never double-count.
    if action_type == "answer":
        # Status-code contract with the client's processSyncQueue(): it only
        # deletes a queued item on 2xx, retries on 5xx (max 5), and drops on
        # 4xx. So: unrecoverable = 4xx (item dropped, honestly), transient =
        # 5xx (item kept for the next flush), success/duplicate = 200.
        if user is None or sid == "guest":
            # No/expired token — the item must survive until the student is
            # logged in again, so this is a RETRY, not a drop.
            from fastapi import HTTPException as _HX
            from fastapi import status as _status
            raise _HX(_status.HTTP_503_SERVICE_UNAVAILABLE,
                      detail="login required to sync offline answers")
        from backend.api.practice import apply_offline_answer

        outcome = await apply_offline_answer(payload, user_id=sid)
        if outcome.get("ok"):
            return {"ok": True, "action_type": action_type,
                    "applied": not outcome.get("duplicate", False),
                    "duplicate": outcome.get("duplicate", False),
                    "is_correct": outcome.get("is_correct")}
        reason = str(outcome.get("reason") or "sync-failed")
        if "not found" in reason:
            # session/question genuinely gone — no retry will ever fix it
            from fastapi import HTTPException as _HX
            from fastapi import status as _status
            raise _HX(_status.HTTP_404_NOT_FOUND, detail=reason)
        from fastapi import HTTPException as _HX
        raise _HX(503, detail=reason)  # transient — keep the item queued

    routed = False
    # Best-effort: route into the tutoring interaction capture (replayable
    # by the ITS stack), mirroring the sync sink it replaces.
    try:
        from backend.its.tutoring.interaction_capture import (
            DEFAULT_INTERACTIONS_PATH,
            SimpleInteractionCapture,
        )
        SimpleInteractionCapture(DEFAULT_INTERACTIONS_PATH).capture(
            student_id=sid,
            session_id="",
            subject="sync",
            concept=action_type,
            grade_level=0,
            interaction_type="sync",
            node_id=action_type,
            response=payload,
        )
        routed = True
    except Exception:
        pass
    entry = {
        "received_at": datetime.now(timezone.utc).isoformat(),
        "student_id": sid,
        "action_type": action_type,
        "routed_to_capture": routed,
        "payload": payload,
    }
    try:
        _SYNC_LOG.parent.mkdir(parents=True, exist_ok=True)
        with open(_SYNC_LOG, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(entry, ensure_ascii=False) + "\n")
    except Exception as exc:
        logger.warning("sync log write failed: %s", exc)
        if not routed:
            return {"ok": False, "reason": "store-unavailable"}
    return {"ok": True, "action_type": action_type, "routed": routed}
