#!/usr/bin/env python3
"""modules/compliance/db.py — the SEPARATE compliance database.

Compliance data (audit trail, consents, data-subject requests) lives in its
own postgres database (atlas_compliance) under its own credentials —
isolated from student/product data BY CONSTRUCTION, so a product-data query
can never touch compliance records and vice-versa.  Store app-store review
artefacts (privacy manifest, data-safety answers) here too."""
from __future__ import annotations

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def compliance_url() -> str:
    url = os.environ.get("COMPLIANCE_DATABASE_URL")
    if not url:
        # No hardcoded fallback: a default credential here is a default
        # credential in every deployment. Set COMPLIANCE_DATABASE_URL in
        # the environment (docker-compose.prod.yml requires it).
        raise RuntimeError(
            "COMPLIANCE_DATABASE_URL is not set — the compliance store "
            "refuses to start without explicitly provisioned credentials"
        )
    return url.replace("postgresql+asyncpg", "postgresql+psycopg2")


_engine = None
_Session = None


def get_engine():
    global _engine
    if _engine is None:
        _engine = create_engine(compliance_url(), pool_pre_ping=True,
                                pool_size=2, max_overflow=2,
                                pool_recycle=1800)
    return _engine


def get_session():
    global _Session
    if _Session is None:
        _Session = sessionmaker(bind=get_engine(), expire_on_commit=False)
    return _Session()


def init_tables():
    from backend.modules.compliance.models import Base
    Base.metadata.create_all(get_engine())
