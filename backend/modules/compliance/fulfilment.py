#!/usr/bin/env python3
"""modules/compliance/fulfilment.py — worker-side fulfilment of data-subject
requests (GDPR Art.15/17, DPDP §12/§13 — access/export and erasure).

Called ONLY from the worker tier (backend/workers/main.py handler
``compliance_fulfil``), never from a request path: exports can be large and
erasure touches several tables.

Two databases, by design (see modules/compliance/db.py):
  MAIN  (DATABASE_URL)   students, attempts, homework_submissions, parents
  CMP   (COMPLIANCE_DATABASE_URL)  data_requests, consents, audit_events

Operations
  export_user_data(user_id, request_id)
      Gathers the user's data from BOTH databases into one JSON document,
      writes it under COMPLIANCE_EXPORT_DIR (default
      /app/cbse_data/compliance_exports — the writable runtime_data mount,
      so it survives rebuilds and is excluded from web serving), returns
      {path, bytes, sections}.  The DataRequest row is marked done with the
      file path in notes; delivery of the file is an operational step
      (email/portal download) outside this module.

  erase_user_data(user_id)
      ANONYMISES rather than deletes: attempts/submissions are legitimate
      learning records referenced by aggregates, and audit/consent records
      have retention duties.  PII is destroyed, FK integrity survives:
        students.name            -> "Erased User <hash12>"   is_active -> 0
        parents.name             -> "Erased User <hash12>"
        parents.phone/whatsapp   -> NULL
        audit_events.actor_user_id / subject_user_id -> "erased-<hash12>"
        consents.user_id         -> "erased-<hash12>"
      hash12 = sha256(original value)[:12] — deterministic, so the same
      identity collapses to one pseudonym across tables (trail stays
      coherent) but is not reversible without brute-forcing the input.

  process_request(request_id)
      Worker entry: loads the DataRequest, marks it processing, dispatches,
      marks it done (+ audit event action=export/erase), returns a summary
      dict that the job row stores.  Errors propagate (worker captures the
      traceback into the job row and retries); a request already done is an
      idempotent no-op.

Session wiring is injectable (``main_sesh`` / ``cmp_sesh`` contextmanager
parameters) so tests run on throwaway sqlite databases; the production
defaults are backend.database.get_sync_engine() and
modules.compliance.db.get_session().
"""
from __future__ import annotations

import hashlib
import json
import os
import re
from contextlib import contextmanager
from datetime import datetime, timezone

EXPORT_SCHEMA = "atlas.export.v1"
_EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _hash12(value: str) -> str:
    return hashlib.sha256(str(value).encode("utf-8")).hexdigest()[:12]


def anonymize_name(name: str | None) -> str:
    """Deterministic pseudonym for a person's name."""
    return f"Erased User {_hash12(name or '')}"


def anonymize_email_like(value: str | None) -> str | None:
    """Replace any email-looking substring with an erased pseudonym."""
    if not value:
        return value
    return _EMAIL_RE.sub(
        lambda m: f"erased+{_hash12(m.group(0).lower())}@erased.invalid",
        value)


# ---------------------------------------------------------------------------
# Session plumbing (production defaults; tests inject sqlite)
# ---------------------------------------------------------------------------
@contextmanager
def _main_sesh_default():
    """Sync session on the MAIN platform DB (DATABASE_URL)."""
    from sqlalchemy.orm import Session
    from backend.database import get_sync_engine
    s = Session(get_sync_engine(), expire_on_commit=False)
    try:
        yield s
    finally:
        s.close()


@contextmanager
def _cmp_sesh_default():
    """Session on the SEPARATE compliance DB (via its own module)."""
    from backend.modules.compliance.db import get_session
    s = get_session()
    try:
        yield s
    finally:
        s.close()


@contextmanager
def _use(sesh, default_factory):
    """Accept None (production default), a context-manager FACTORY, or an
    already-open Session; always yields a usable session."""
    from sqlalchemy.orm import Session as _Session
    if sesh is None:
        with default_factory() as s:
            yield s
    elif isinstance(sesh, _Session):
        yield sesh
    else:  # contextmanager factory (test injection)
        with sesh() as s:
            yield s


def _export_dir_default() -> str:
    d = os.environ.get("COMPLIANCE_EXPORT_DIR",
                       "/app/cbse_data/compliance_exports")
    try:
        os.makedirs(d, exist_ok=True)
    except OSError:
        d = os.path.join(os.path.expanduser("~"), ".atlas_exports")
        os.makedirs(d, exist_ok=True)
    return d


def _row_dict(row, columns: list[str]) -> dict:
    out = {}
    for c in columns:
        v = getattr(row, c, None)
        if isinstance(v, datetime):
            v = v.isoformat()
        out[c] = v
    return out


def _find_student(ms, user_id: str):
    """Load a Student by uuid-string or opaque id (portable across PG/sqlite)."""
    from backend.database import Student
    if _is_uuid(user_id):
        return ms.get(Student, _as_uuid(user_id))
    return ms.query(Student).filter(Student.id == user_id).first()


# ---------------------------------------------------------------------------
# Export (Art.15 access / data portability)
# ---------------------------------------------------------------------------
def export_user_data(user_id: str, request_id: str, *,
                     main_sesh=None, cmp_sesh=None,
                     export_dir: str | None = None) -> dict:
    """Gather the user's data into one JSON file; returns a summary dict."""
    from backend.database import (Attempt, HomeworkSubmission,
                                  PracticeSession)

    with _use(main_sesh, _main_sesh_default) as ms:
        student = _find_student(ms, user_id)
        if student is None:
            raise ValueError(f"export: no student found for user {user_id!r}")
        profile = {
            "id": str(student.id),
            "name": student.name,
            "student_class": student.student_class,
            "language_pref": student.language_pref,
            "subjects": list(student.subjects or []),
            "created_at": student.created_at.isoformat()
            if student.created_at else None,
        }
        attempts = [
            _row_dict(a, ["id", "topic_id", "session_id", "subject",
                          "answer", "correct", "time_ms", "marks_awarded",
                          "created_at"])
            for a in ms.query(Attempt)
            .filter(Attempt.student_id == student.id)
            .order_by(Attempt.created_at).all()]
        submissions = [
            _row_dict(x, ["id", "homework_id", "answers", "score",
                          "max_score", "percentage", "grade", "submitted_at",
                          "is_late", "graded"])
            for x in ms.query(HomeworkSubmission)
            .filter(HomeworkSubmission.student_id == student.id)
            .order_by(HomeworkSubmission.submitted_at).all()]
        sessions = [
            _row_dict(p, ["id", "questions_answered", "started_at",
                          "ended_at"])
            for p in ms.query(PracticeSession)
            .filter(PracticeSession.student_id == student.id).all()]

    with _use(cmp_sesh, _cmp_sesh_default) as cs:
        from backend.modules.compliance.models import AuditEvent, Consent
        consents = [
            _row_dict(c, ["purpose", "granted", "policy_version", "at"])
            for c in cs.query(Consent)
            .filter(Consent.user_id == user_id)
            .order_by(Consent.at).all()]
        audit = [
            _row_dict(e, ["action", "resource", "detail", "ip", "at"])
            for e in cs.query(AuditEvent)
            .filter((AuditEvent.actor_user_id == user_id)
                    | (AuditEvent.subject_user_id == user_id))
            .order_by(AuditEvent.at).all()]

    payload = {
        "schema": EXPORT_SCHEMA,
        "request_id": request_id,
        "user_id": user_id,
        "generated_at": _utcnow().isoformat(),
        "counts": {
            "attempts": len(attempts),
            "submissions": len(submissions),
            "practice_sessions": len(sessions),
            "consents": len(consents),
            "audit_events": len(audit),
        },
        "data": {
            "profile": profile,
            "attempts": attempts,
            "submissions": submissions,
            "practice_sessions": sessions,
            "consents": consents,
            "audit": audit,
        },
    }
    directory = export_dir or _export_dir_default()
    os.makedirs(directory, exist_ok=True)
    path = os.path.join(directory, f"export_{request_id}.json")
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(payload, fh, ensure_ascii=False, indent=2, default=str)
    os.replace(tmp, path)
    size = os.path.getsize(path)
    _mark_request_done(cmp_sesh, request_id,
                       notes=f"export written: {path} ({size} bytes)")
    _audit(cmp_sesh, "export", actor="system:worker", subject=user_id,
           resource="compliance.data_request.export",
           detail={"request_id": request_id, "path": path})
    return {"path": path, "bytes": size, "sections": payload["counts"]}


# ---------------------------------------------------------------------------
# Erasure (Art.17 / DPDP erasure) — anonymisation, not deletion
# ---------------------------------------------------------------------------
def erase_user_data(user_id: str, *,
                    main_sesh=None, cmp_sesh=None) -> dict:
    """Anonymise the user's PII across both databases.  Idempotent: the
    pseudonym is derived from the ORIGINAL id, so re-running is stable."""
    from backend.database import Parent
    from sqlalchemy import or_

    pseudonym = f"erased-{_hash12(user_id)}"
    changed = {"students": 0, "parents": 0, "audit_events": 0, "consents": 0}

    with _use(main_sesh, _main_sesh_default) as ms:
        student = _find_student(ms, user_id)
        if student is not None:
            # Pseudonyms derive from the record's OWN id, so re-running is
            # stable and the same identity always collapses identically.
            if not str(student.name).startswith("Erased User"):
                student.name = anonymize_name(str(student.id))
                changed["students"] = 1
            student.is_active = False
            parents = list(student.parents or [])
            for p in parents:
                if not str(p.name).startswith("Erased User"):
                    p.name = anonymize_name(str(p.id))
                    changed["parents"] += 1
                p.phone = None
                p.whatsapp_number = None
            ms.commit()

    with _use(cmp_sesh, _cmp_sesh_default) as cs:
        from backend.modules.compliance.models import AuditEvent, Consent
        rows = cs.query(AuditEvent).filter(
            or_(AuditEvent.actor_user_id == user_id,
                AuditEvent.subject_user_id == user_id)).all()
        for e in rows:
            if e.actor_user_id == user_id:
                e.actor_user_id = pseudonym
            if e.subject_user_id == user_id:
                e.subject_user_id = pseudonym
            if e.detail and isinstance(e.detail, dict):
                e.detail = {"erased": True}
            changed["audit_events"] += 1
        crows = cs.query(Consent).filter(Consent.user_id == user_id).all()
        for c in crows:
            c.user_id = pseudonym
            changed["consents"] += 1
        cs.commit()

    _audit(cmp_sesh, "erase", actor="system:worker", subject=pseudonym,
           resource="compliance.data_request.erasure",
           detail={"user_pseudonym": pseudonym, "changed": changed})
    return {"pseudonym": pseudonym, "changed": changed}


# ---------------------------------------------------------------------------
# Request orchestration (worker entry point)
# ---------------------------------------------------------------------------
def process_request(request_id: str, *,
                    main_sesh=None, cmp_sesh=None) -> dict:
    """Fulfil one DataRequest row: processing -> done (+audit).  Raises on
    unknown ids and handler errors so the worker can retry with backoff."""
    with _use(cmp_sesh, _cmp_sesh_default) as cs:
        from backend.modules.compliance.models import DataRequest
        req = cs.get(DataRequest, request_id)
        if req is None:
            raise ValueError(f"data request {request_id!r} not found")
        if req.status == "done":
            return {"request_id": request_id, "kind": req.kind,
                    "status": "done", "already_done": True}
        req.status = "processing"
        cs.commit()
        user_id = req.user_id
        kind = req.kind

    if kind == "export":
        summary = export_user_data(user_id, request_id,
                                   main_sesh=main_sesh, cmp_sesh=cmp_sesh)
    elif kind == "erasure":
        summary = erase_user_data(user_id, main_sesh=main_sesh,
                                  cmp_sesh=cmp_sesh)
        _mark_request_done(cmp_sesh, request_id,
                           notes="erasure applied: "
                                 + json.dumps(summary.get("changed", {})))
    else:
        raise ValueError(f"unknown data request kind {kind!r}")

    return {"request_id": request_id, "kind": kind, "status": "done",
            "user_id": user_id, **summary}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _mark_request_done(cmp_sesh, request_id: str, notes: str) -> None:
    with _use(cmp_sesh, _cmp_sesh_default) as cs:
        from backend.modules.compliance.models import DataRequest
        req = cs.get(DataRequest, request_id)
        if req is not None:
            req.status = "done"
            req.notes = (notes or "")[:2000]
            req.closed_at = _utcnow()
            cs.commit()


def _audit(cmp_sesh, action: str, *, actor: str, subject: str,
           resource: str, detail: dict | None = None) -> None:
    import uuid as _uuid
    with _use(cmp_sesh, _cmp_sesh_default) as cs:
        from backend.modules.compliance.models import AuditEvent
        cs.add(AuditEvent(id=str(_uuid.uuid4()), actor_user_id=actor,
                          actor_role="system", action=action,
                          subject_user_id=subject, resource=resource,
                          detail=detail))
        cs.commit()


_UUID_RE = re.compile(
    r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-"
    r"[0-9a-fA-F]{12}$")


def _is_uuid(value: str) -> bool:
    return bool(_UUID_RE.match(str(value)))


def _as_uuid(value: str):
    import uuid as _uuid
    return _uuid.UUID(str(value))
