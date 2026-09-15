"""Dialect-neutral SQLAlchemy column types.

Lets the same ORM models run on PostgreSQL (production) and SQLite
(local / offline mode) without any model changes:

- ``GUID``        : PostgreSQL ``UUID`` on postgresql, ``CHAR(36)`` elsewhere.
- ``JSONVariant`` : PostgreSQL ``JSONB`` on postgresql, ``JSON`` elsewhere.
- ``StringList``  : PostgreSQL ``ARRAY(Text)`` on postgresql, JSON list elsewhere.

On PostgreSQL each type renders exactly the same native type as before,
so pointing ``PLATFORM_DATABASE_URL`` at postgres keeps the existing
schema and behaviour.  On SQLite everything degrades gracefully to
strings and JSON documents.
"""

from __future__ import annotations

import uuid

from sqlalchemy import CHAR, JSON, Text
from sqlalchemy.dialects.postgresql import ARRAY as PG_ARRAY
from sqlalchemy.dialects.postgresql import JSONB as PG_JSONB
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.types import TypeDecorator

__all__ = ["GUID", "JSONVariant", "StringList"]


class GUID(TypeDecorator):
    """Portable UUID: native ``UUID`` on PostgreSQL, ``CHAR(36)`` elsewhere."""

    impl = CHAR
    cache_ok = True

    @property
    def python_type(self):
        return uuid.UUID

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PG_UUID(as_uuid=True))
        return dialect.type_descriptor(CHAR(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        if dialect.name == "postgresql":
            return value if isinstance(value, uuid.UUID) else uuid.UUID(str(value))
        return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        if isinstance(value, uuid.UUID):
            return value
        return uuid.UUID(str(value))

    def coerce_compared_value(self, op, value):
        return self


class JSONVariant(TypeDecorator):
    """Portable JSON document: ``JSONB`` on PostgreSQL, ``JSON`` elsewhere."""

    impl = JSON
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PG_JSONB())
        return dialect.type_descriptor(JSON())

    @property
    def python_type(self):
        return dict


class StringList(TypeDecorator):
    """Portable string list: ``ARRAY(Text)`` on PostgreSQL, JSON list elsewhere."""

    impl = JSON
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PG_ARRAY(Text()))
        return dialect.type_descriptor(JSON())

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        return list(value)

    @property
    def python_type(self):
        return list
