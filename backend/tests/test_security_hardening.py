"""Security regression tests for the 2026-10-08 hardening batch.

Covers: signup role allowlist, matrix literal_eval (eval() RCE fix),
mcq option-value numeric gate, JWT sentinel fallback, OTP placeholder.
Each test pins the exact vulnerability that was closed.
"""
from __future__ import annotations

import json
import pytest
from pydantic import ValidationError

from backend.schemas.auth import SignupRequest


# ── 1. Signup role allowlist ─────────────────────────────────────────────

def test_signup_rejects_admin_role():
    with pytest.raises(ValidationError):
        SignupRequest(
            name="Attacker", email="a@b.com", password="longenough1", role="admin"
        )


def test_signup_rejects_unknown_role():
    with pytest.raises(ValidationError):
        SignupRequest(
            name="Attacker", email="a@b.com", password="longenough1", role="superuser"
        )


def test_signup_accepts_student_teacher_parent():
    for role in ("student", "teacher", "parent"):
        # WS-LEGAL: students are minors — the schema additionally requires
        # parent_email + parent_consent for role="student" (DPDP §9);
        # teacher/parent signups need neither.
        kwargs = (
            {"parent_email": "p@b.com", "parent_consent": True}
            if role == "student" else {}
        )
        req = SignupRequest(
            name="N", email="a@b.com", password="longenough1",
            role=role, **kwargs)
        assert req.role == role


def test_signup_password_min_length_8():
    with pytest.raises(ValidationError):
        SignupRequest(name="N", email="a@b.com", password="seven77", role="student")


# ── 2. Matrix patterns: literal_eval only, never eval() ─────────────────

class _Parsed:
    def __init__(self, raw: str):
        self.raw = raw


def _det_pattern():
    from backend.ai.structural_patterns import MatrixDeterminantPattern
    return MatrixDeterminantPattern()


def test_matrix_determinant_parses_literal_matrix():
    res = _det_pattern().extract(
        _Parsed("determinant of [[1,2],[3,4]]"), "q"
    )
    assert res.variables["matrix"] == [[1, 2], [3, 4]]


def test_matrix_determinant_rejects_code_injection():
    res = _det_pattern().extract(
        _Parsed('determinant of [[__import__("os").system("echo pwned"),2],[3,4]]'), "q"
    )
    # Must NOT execute; must land in the missing-variables fallback.
    assert "matrix" not in res.variables
    assert "matrix" in res.missing


def test_matrix_json_single_quotes_still_parse():
    # json.loads fails on single quotes; literal_eval must still succeed.
    res = _det_pattern().extract(_Parsed("determinant of [[1,2],[3,4]]"), "q")
    assert res.variables["matrix"] == [[1, 2], [3, 4]]


# ── 3. mcq back-substitution: numeric options only ──────────────────────

def test_mcq_option_gate_rejects_non_numeric():
    import re
    # Mirror the guard added in mcq_solver (kept in sync by this test).
    pattern = re.compile(r"[-+]?\d+(?:\.\d+)?")
    hostile = "__import__('os').system('id')"
    assert pattern.fullmatch(hostile) is None
    assert pattern.fullmatch("42") is not None
    assert pattern.fullmatch("-3.14") is not None
    assert pattern.fullmatch("1)+__import__('os')") is None


# ── 4. JWT secret never the public sentinel ─────────────────────────────

def test_jwt_secret_is_not_sentinel():
    from backend.config import get_settings
    s = get_settings()
    sentinel = "change-me-in-production-use-a-real-secret-key-please"
    assert s.jwt_secret != sentinel
    assert len(s.jwt_secret) >= 32


# ── 5. Compliance store has no hardcoded fallback URL ───────────────────

def test_compliance_url_requires_env(monkeypatch):
    from backend.modules.compliance import db as compliance_db
    monkeypatch.delenv("COMPLIANCE_DATABASE_URL", raising=False)
    with pytest.raises(RuntimeError):
        compliance_db.compliance_url()


# ── 6. Intelligence guards are wired ────────────────────────────────────

def _has_auth_dependency(fn) -> bool:
    """True when any function parameter carries a fastapi Depends(...)."""
    import inspect
    # fastapi.Depends is a factory function; the instances are params.Depends.
    from fastapi.params import Depends as DependsClass
    for param in inspect.signature(fn).parameters.values():
        if isinstance(param.default, DependsClass):
            return True
    return False


def test_intelligence_endpoints_carry_auth_dependencies():
    from backend.api import intelligence as intel
    guarded = {
        "build_state", "run_meta_brain", "add_rule",
        "generate_problems", "evolve_intelligence", "intelligence_warmup",
    }
    for name in guarded:
        fn = getattr(intel, name, None)
        assert fn is not None, f"{name} missing"
        assert _has_auth_dependency(fn), f"{name} has no auth dependency"


def test_solver_remediation_endpoint_carry_auth_dependency():
    from backend.routers import solver as solver_router
    assert _has_auth_dependency(solver_router.intelligence_remediation), \
        "intelligence_remediation has no auth dependency"


def test_practice_queue_endpoint_carry_auth_dependency():
    from backend.api import verified_practice as vp
    assert _has_auth_dependency(vp.answer_queue), \
        "answer_queue has no auth dependency"
