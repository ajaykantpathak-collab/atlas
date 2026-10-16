#!/usr/bin/env python3
"""modules/compliance/service.py — the compliance API.

Endpoints:
  POST /api/compliance/consent        — record a user's consent per purpose
  GET  /api/compliance/consent        — read current consents
  POST /api/compliance/data-request   — open an export / erasure request
  GET  /api/compliance/data-request   — list own requests
  GET  /api/compliance/policy         — active policy version
  GET  /api/compliance/audit/mine     — user's own audit trail (transparency)
  POST /api/compliance/store-metadata — (staff) store-listing artefacts

Every write here is itself audit-logged.  Separate database, own credentials.
"""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select

from backend.modules.compliance.db import get_engine, get_session, init_tables
from backend.modules.compliance.models import (AuditEvent, Consent,
                                               DataRequest, PolicyVersion)
from backend.routers.auth import get_current_user

router = APIRouter(prefix="/api/compliance", tags=["compliance"])
_READY = {"init": False, "available": True}


class ComplianceUnavailable(RuntimeError):
    """The separate compliance store is unreachable/never provisioned."""


def _ensure_tables():
    """Idempotent table init. FOOLPROOF-STARTUP (2026-10-06): the
    compliance store is ISOLATED BY DESIGN — the product must boot and
    serve without it.  A connect failure here marks the lane degraded
    (endpoints 503 honestly) instead of raising through the router's
    lifespan hook, which killed the whole app at startup."""
    if _READY["init"]:
        return
    try:
        init_tables()
        _READY["init"] = True
        _READY["available"] = True
    except Exception as exc:
        _READY["available"] = False
        raise ComplianceUnavailable(
            f"compliance store unreachable: {exc}") from exc


def _require_available():
    if not _READY["available"]:
        raise ComplianceUnavailable("compliance store unavailable")


def _guard(fn):
    """Decorator: ensure tables, translate unavailability to 503."""
    import functools

    @functools.wraps(fn)
    def wrapper(*a, **k):
        try:
            _ensure_tables()
        except ComplianceUnavailable as exc:
            from fastapi import HTTPException
            raise HTTPException(status_code=503, detail=str(exc))
        return fn(*a, **k)
    return wrapper


def _audit(action: str, actor: str, resource: str,
           subject: str | None = None, detail: dict | None = None,
           ip: str | None = None):
    with get_session() as s:
        s.add(AuditEvent(id=str(uuid.uuid4()), actor_user_id=actor,
                         action=action, resource=resource,
                         subject_user_id=subject, detail=detail, ip=ip))
        s.commit()


def _user_id(user) -> str:
    return str(getattr(user, "id", ""))

class ConsentIn(BaseModel):
    purpose: str = Field(..., max_length=64)
    granted: bool
    policy_version: str = Field(..., max_length=32)


class DataRequestIn(BaseModel):
    kind: str = Field(..., pattern="^(export|erasure)$")
    notes: str | None = Field(default=None, max_length=2000)


# ------------------------------ routes ------------------------------ #

@router.on_event("startup")
def _startup():
    try:
        _ensure_tables()
    except ComplianceUnavailable as exc:
        # fail-soft: log and degrade — NEVER kill app startup over the
        # isolated compliance store (the 2026-10-06 boot-crash class)
        import logging
        logging.getLogger(__name__).warning(
            "compliance store offline at startup — lane degraded: %s", exc)


@router.post("/consent")
@_guard
def record_consent(body: ConsentIn, user=Depends(get_current_user)):
    _ensure_tables()
    uid = _user_id(user)
    with get_session() as s:
        s.add(Consent(id=str(uuid.uuid4()), user_id=uid,
                      purpose=body.purpose, granted=body.granted,
                      policy_version=body.policy_version))
        s.commit()
    _audit("write", uid, "compliance.consent",
           detail={"purpose": body.purpose, "granted": body.granted})
    return {"ok": True, "purpose": body.purpose, "granted": body.granted}


@router.get("/consent")
@_guard
def read_consents(user=Depends(get_current_user)):
    _ensure_tables()
    uid = _user_id(user)
    with get_session() as s:
        rows = s.execute(
            select(Consent).where(Consent.user_id == uid)
            .order_by(Consent.at.desc()).limit(50)).scalars().all()
        latest: dict[str, dict] = {}
        for r in rows:
            if r.purpose not in latest:
                latest[r.purpose] = {"granted": r.granted,
                                     "policy_version": r.policy_version,
                                     "at": r.at.isoformat()}
    _audit("read", uid, "compliance.consent")
    return {"consents": latest}


@router.post("/data-request")
@_guard
def open_data_request(body: DataRequestIn, user=Depends(get_current_user)):
    _ensure_tables()
    uid = _user_id(user)
    rid = str(uuid.uuid4())
    with get_session() as s:
        s.add(DataRequest(id=rid, user_id=uid, kind=body.kind,
                          notes=body.notes))
        s.commit()
    _audit("write", uid, f"compliance.data_request.{body.kind}")
    return {"request_id": rid, "kind": body.kind, "status": "received",
            "sla_days": 30}


@router.get("/data-request")
@_guard
def list_data_requests(user=Depends(get_current_user)):
    _ensure_tables()
    uid = _user_id(user)
    with get_session() as s:
        rows = s.execute(
            select(DataRequest).where(DataRequest.user_id == uid)
            .order_by(DataRequest.opened_at.desc()).limit(50)).scalars().all()
        return {"requests": [
            {"id": r.id, "kind": r.kind, "status": r.status,
             "opened_at": r.opened_at.isoformat()} for r in rows]}


@router.get("/policy")
@_guard
def active_policy():
    _ensure_tables()
    with get_session() as s:
        row = s.execute(
            select(PolicyVersion).order_by(PolicyVersion.active_from.desc())
            .limit(1)).scalars().first()
        if not row:
            return {"version": "1.0", "summary": "Initial privacy policy",
                    "url": "/privacy"}
        return {"version": row.version, "summary": row.summary,
                "url": row.url, "active_from": row.active_from.isoformat()}


@router.get("/audit/mine")
@_guard
def my_audit_trail(user=Depends(get_current_user)):
    _ensure_tables()
    uid = _user_id(user)
    with get_session() as s:
        rows = s.execute(
            select(AuditEvent).where(AuditEvent.actor_user_id == uid)
            .order_by(AuditEvent.at.desc()).limit(100)).scalars().all()
        return {"events": [
            {"action": r.action, "resource": r.resource,
             "at": r.at.isoformat(), "detail": r.detail} for r in rows]}


# auth dependency imported at module top (no cycle: auth never imports
# this module)
