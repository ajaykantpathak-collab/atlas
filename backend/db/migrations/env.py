"""Alembic environment — runs migrations against the app's real metadata.

Usage:
    alembic revision --autogenerate -m "describe change"
    alembic upgrade head

The URL comes from DATABASE_URL (or platform settings); async drivers are
rewritten to their sync equivalents (asyncpg → psycopg2, aiosqlite → sqlite)
because Alembic runs synchronously.

NOTE: backend.database is a package shim that re-exports the flat
database.py module's Base — all ORM models register on that one metadata.
New tables are ALSO created by init_db()'s Base.metadata.create_all, so
migrations here are for ALTERs and index changes on existing deployments.
"""
from __future__ import annotations

import os
import sys
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# repo root on sys.path so `backend.*` resolves (migrations run from repo root)
_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__)))))
if _ROOT not in sys.path:
    sys.path.insert(0, _ROOT)

from backend.database import Base  # noqa: E402  — shim re-exports flat Base

target_metadata = Base.metadata


def _sync_url() -> str:
    url = os.environ.get("DATABASE_URL_SYNC") or os.environ.get(
        "DATABASE_URL", config.get_main_option("sqlalchemy.url"))
    if "+asyncpg" in url:
        url = url.replace("+asyncpg", "+psycopg2")
    if "+aiosqlite" in url:
        url = url.replace("+aiosqlite", "")
    return url


def run_migrations_offline() -> None:
    context.configure(
        url=_sync_url(), target_metadata=target_metadata,
        literal_binds=True, dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    section = config.get_section(config.config_ini_section, {})
    connectable = engine_from_config(
        {**section, "sqlalchemy.url": _sync_url()},
        prefix="sqlalchemy.", poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection,
                          target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
