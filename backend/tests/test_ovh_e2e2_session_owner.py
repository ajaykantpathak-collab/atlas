# -*- coding: utf-8 -*-
"""Regression tests for [e2e2-practice-anon-submit] — owned practice
sessions must reject anonymous writes.

The e2e2 defect: ``_enforce_session_owner`` returned early when
``caller_sub`` was None, so anyone holding an owned session's URL
(logs, screenshots, referer leak) could ``POST /api/practice/{id}/submit``
with zero credentials and inject attempts into that student's
mastery/streak.  The fix: an ``auth_user_id``-stamped session requires
``str(owner) == str(caller_sub)`` for ALL callers including anonymous;
ownerless (demo/legacy) sessions keep capability-URL visibility.

Under test: ``backend.api.practice._enforce_session_owner`` only — the
pure guard, no DB, no network.  The stub mirrors what ``_meta_get``
reads: a ``session_meta`` dict attribute.
"""

from __future__ import annotations

from types import SimpleNamespace

import pytest
from fastapi import HTTPException

from backend.api.practice import _enforce_session_owner

OWNER = "u1-owner-student"
OTHER = "u2-other-student"


def _session(meta: dict | None) -> SimpleNamespace:
    """Stand-in for PracticeSession — _meta_get only reads .session_meta."""
    return SimpleNamespace(session_meta=meta)


# ---------------------------------------------------------------------------
# Owned sessions (auth_user_id stamped at create)
# ---------------------------------------------------------------------------


def test_owned_session_rejects_a_different_authed_caller():
    with pytest.raises(HTTPException) as exc:
        _enforce_session_owner(
            _session({"auth_user_id": OWNER}), caller_sub=OTHER
        )
    assert exc.value.status_code == 403


def test_owned_session_rejects_anonymous_caller():
    """THE FIX — pre-fix this returned early on caller_sub=None and let an
    unauthenticated caller submit into another student's mastery."""
    with pytest.raises(HTTPException) as exc:
        _enforce_session_owner(
            _session({"auth_user_id": OWNER}), caller_sub=None
        )
    assert exc.value.status_code == 403


def test_owned_session_accepts_the_owner():
    _enforce_session_owner(
        _session({"auth_user_id": OWNER}), caller_sub=OWNER
    )  # must not raise


def test_owner_comparison_is_string_coerced():
    """session_meta JSONB can hand back a non-str owner (int/uuid); the
    guard compares str()==str() so an int owner still matches its own
    token sub — and still rejects everyone else."""
    _enforce_session_owner(
        _session({"auth_user_id": 7}), caller_sub="7"
    )  # must not raise
    with pytest.raises(HTTPException) as exc:
        _enforce_session_owner(
            _session({"auth_user_id": 7}), caller_sub="8"
        )
    assert exc.value.status_code == 403


# ---------------------------------------------------------------------------
# Ownerless sessions (demo / legacy pre-owner-stamp) — unchanged visibility
# ---------------------------------------------------------------------------


def test_ownerless_session_accepts_anonymous_caller():
    _enforce_session_owner(
        _session({}), caller_sub=None
    )  # must not raise — capability-URL demo semantics preserved


def test_ownerless_session_accepts_any_authed_caller():
    _enforce_session_owner(
        _session({}), caller_sub=OTHER
    )  # must not raise


def test_session_without_meta_attr_is_treated_as_ownerless():
    """The guard wraps the meta read in try/except -> owner=None. A
    session object lacking session_meta entirely must not crash the
    submit path and keeps legacy visibility."""
    _enforce_session_owner(SimpleNamespace(), caller_sub=None)


def test_owner_stamped_none_is_ownerless():
    """auth_user_id explicitly None (demo create path stamps nothing)
    must behave as ownerless, not as 'owned by the string None'."""
    _enforce_session_owner(
        _session({"auth_user_id": None}), caller_sub=None
    )
    _enforce_session_owner(
        _session({"auth_user_id": None}), caller_sub=OTHER
    )
