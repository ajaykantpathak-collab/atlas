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
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, AsyncIterator, TYPE_CHECKING

from fastapi import APIRouter, Depends, Request

if TYPE_CHECKING:  # pragma: no cover
    from backend.models.user import User

from backend.deps import get_current_user_optional

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


def _student_id(user: "User | None") -> str:
    return str(getattr(user, "id", None) or "guest")


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


async def _json_body(request: Request) -> dict:
    """Parse a JSON object body regardless of Content-Type (sendBeacon
    dispatches strings as text/plain)."""
    raw = await request.body()
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
