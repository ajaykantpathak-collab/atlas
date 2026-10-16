# -*- coding: utf-8 -*-
"""WS-D input-validation probes (student_sync body caps, 2026-10-10).

/api/sync/{action_type} and the a11y/onboarding aliases accept RAW JSON
bodies (sendBeacon sends text/plain) with no size cap — an anonymous
client could append unbounded payloads to sync_events.jsonl forever
(disk-fill).  These tests drive the raw-body parser with real oversized
payloads.
"""

from __future__ import annotations

import asyncio
import json

import pytest
from fastapi import HTTPException
from starlette.requests import Request

from backend.api import student_sync


def _request_with_body(body: bytes) -> Request:
    async def receive():
        return {"type": "http.request", "body": body, "more_body": False}

    scope = {
        "type": "http",
        "method": "POST",
        "path": "/api/sync/answer",
        "headers": [(b"content-type", b"text/plain")],
        "query_string": b"",
        "receive": receive,
    }
    return Request(scope, receive)


def test_sync_body_over_cap_is_rejected_413():
    big = json.dumps({"blob": "A" * (student_sync.MAX_BODY_BYTES + 1024)}).encode()
    with pytest.raises(HTTPException) as exc:
        asyncio.run(student_sync._json_body(_request_with_body(big)))
    assert exc.value.status_code == 413


def test_sync_body_within_cap_passes():
    ok = json.dumps({"blob": "A" * 1024}).encode()
    parsed = asyncio.run(student_sync._json_body(_request_with_body(ok)))
    assert parsed["blob"] == "A" * 1024


def test_non_object_body_is_wrapped_not_crashed():
    parsed = asyncio.run(student_sync._json_body(_request_with_body(b"[1,2,3]")))
    assert parsed == {"_raw": [1, 2, 3]}


def test_sync_action_type_charset_enforced():
    """action_type lands inside captured records — keep it a slug."""
    for bad in ("..%2fevil", "a" * 100, "steal p@$$", "answer\nDROP"):
        with pytest.raises(HTTPException):
            student_sync._validate_action_type(bad)
    assert student_sync._validate_action_type("answer") == "answer"
    assert student_sync._validate_action_type("note-update_2") == "note-update_2"


def test_a11y_prefs_body_cap():
    big = json.dumps({"accessibility": {"font_size": "x" * (student_sync.MAX_BODY_BYTES + 1)}}).encode()
    with pytest.raises(HTTPException) as exc:
        asyncio.run(student_sync.save_a11y_prefs(_request_with_body(big), user=None))
    assert exc.value.status_code == 413


def test_onboarding_body_cap():
    big = json.dumps({"blob": "B" * (student_sync.MAX_BODY_BYTES + 512)}).encode()
    with pytest.raises(HTTPException) as exc:
        asyncio.run(student_sync.save_onboarding(_request_with_body(big), user=None))
    assert exc.value.status_code == 413
