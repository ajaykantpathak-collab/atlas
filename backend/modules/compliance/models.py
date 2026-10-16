#!/usr/bin/env python3
"""modules/compliance/models.py — compliance-domain tables (SEPARATE DB).

Tables:
  audit_events      — every read/write of student data (who, what, when, why)
  consents          — user consent per purpose, versioned (DPDP/GDPR Art.7)
  data_requests     — export / erasure requests with SLA state (Art.15/17)
  policy_versions   — privacy-policy versions users accepted
  store_metadata    — app-store listing artefacts (privacy manifest, data-safety)
"""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

from sqlalchemy import (Boolean, DateTime, Index, Integer, String, Text,
                        JSON, func)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


def _now():
    return datetime.now(timezone.utc)


class AuditEvent(Base):
    __tablename__ = "audit_events"
    id: Mapped[str] = mapped_column(String(36), primary_key=True,
                                    default=lambda: str(uuid.uuid4()))
    actor_user_id: Mapped[str] = mapped_column(String(64), index=True)
    actor_role: Mapped[str] = mapped_column(String(32), default="student")
    action: Mapped[str] = mapped_column(String(64))          # read|write|export|erase
    subject_user_id: Mapped[str | None] = mapped_column(String(64), index=True,
                                                        nullable=True)
    resource: Mapped[str] = mapped_column(String(128))        # endpoint/table
    detail: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    ip: Mapped[str | None] = mapped_column(String(64), nullable=True)
    at: Mapped[datetime] = mapped_column(DateTime(timezone=True),
                                         default=_now, server_default=func.now())
    __table_args__ = (Index("ix_audit_actor_time", "actor_user_id", "at"),
                      Index("ix_audit_subject_time", "subject_user_id", "at"))


class Consent(Base):
    __tablename__ = "consents"
    id: Mapped[str] = mapped_column(String(36), primary_key=True,
                                    default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(64), index=True)
    purpose: Mapped[str] = mapped_column(String(64))   # analytics|marketing|parental
    granted: Mapped[bool] = mapped_column(Boolean, default=False)
    policy_version: Mapped[str] = mapped_column(String(32))
    at: Mapped[datetime] = mapped_column(DateTime(timezone=True),
                                         default=_now, server_default=func.now())


class DataRequest(Base):
    __tablename__ = "data_requests"
    id: Mapped[str] = mapped_column(String(36), primary_key=True,
                                    default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(64), index=True)
    kind: Mapped[str] = mapped_column(String(16))      # export|erasure
    status: Mapped[str] = mapped_column(String(24), default="received")  # received|processing|done|rejected
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    opened_at: Mapped[datetime] = mapped_column(DateTime(timezone=True),
                                                default=_now)
    closed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True),
                                                       nullable=True)


class PolicyVersion(Base):
    __tablename__ = "policy_versions"
    version: Mapped[str] = mapped_column(String(32), primary_key=True)
    summary: Mapped[str] = mapped_column(Text)
    url: Mapped[str] = mapped_column(String(256))
    active_from: Mapped[datetime] = mapped_column(DateTime(timezone=True),
                                                  default=_now)


class StoreMetadata(Base):
    __tablename__ = "store_metadata"
    key: Mapped[str] = mapped_column(String(64), primary_key=True)
    value: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=_now, onupdate=_now)
