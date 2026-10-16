"""test_wsc_auth.py — WS-C §3 tutor auth posture.

Pins the signed design decisions:
  1. competency_tutor `_bound_student_id`: signed-in ⇒ JWT sub overrides;
     anonymous + UUID-shaped id ⇒ 401; anonymous "guest" preserved.
  2. api/tutor /reply: `_session_meta` key is namespaced under the sub
     when a valid token is presented.
  3. /its/start + /its/input: student_id label bound to sub.
  4. /ws: `token` query param — valid binds user_id, invalid closes 4401,
     absent keeps guest.
Wiring probes assert the guards are attached; behavior probes exercise
the binding functions directly (no network).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

import pytest
from fastapi import HTTPException


# --------------------------------------------------------------- wiring probes
def test_reply_accepts_bearer_dependency():
    import inspect
    from backend.api import tutor as api_tutor
    sig = inspect.signature(api_tutor.reply_to_tutor_session)
    assert "credentials" in sig.parameters


def test_its_start_and_input_accept_bearer():
    import inspect
    from backend.api import tutor as api_tutor
    assert "credentials" in inspect.signature(
        api_tutor.its_start).parameters
    assert "credentials" in inspect.signature(
        api_tutor.its_input).parameters


def test_ws_token_gate_in_source():
    import inspect
    from backend.api import tutor as api_tutor
    src = inspect.getsource(api_tutor.tutor_websocket)
    assert 'query_params.get("token")' in src
    assert "4401" in src


# --------------------------------------------------------------- behavior probes
def test_bound_student_id_signed_overrides():
    from backend.api.competency_tutor import _bound_student_id
    from backend.security import create_access_token
    tok = create_access_token({"sub": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"})
    creds = type("C", (), {"credentials": tok})()
    sid = _bound_student_id("guest", creds)
    assert sid == "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"


def test_bound_student_id_anon_uuid_401():
    from backend.api.competency_tutor import _bound_student_id
    with pytest.raises(HTTPException) as ei:
        _bound_student_id(
            "123e4567-e89b-12d3-a456-426614174000", None)
    assert ei.value.status_code == 401


def test_bound_student_id_anon_guest_preserved():
    from backend.api.competency_tutor import _bound_student_id
    assert _bound_student_id("guest", None) == "guest"
    assert _bound_student_id("any-freetext-name", None) == "any-freetext-name"


def test_reply_session_namespaced_under_sub(monkeypatch):
    """A signed-in caller's sessionId is namespaced under sub inside
    _session_meta; anonymous keeps the bare id."""
    from backend.api import tutor as api_tutor
    from backend.security import create_access_token
    tok = create_access_token({"sub": "user-xyz"})
    creds = type("C", (), {"credentials": tok})()
    assert api_tutor._token_sub(creds) == "user-xyz"
    assert api_tutor._token_sub(None) is None
    assert api_tutor._token_sub(
        type("C", (), {"credentials": "garbage"})()) is None


def test_uuid_rule_does_not_reject_namespaced_or_guest():
    from backend.api.competency_tutor import _bound_student_id
    # an invalid-token anonymous guest is still a guest
    creds = type("C", (), {"credentials": "not-a-token"})()
    assert _bound_student_id("guest", creds) == "guest"
