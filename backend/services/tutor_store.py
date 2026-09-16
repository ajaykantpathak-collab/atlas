"""Tutor student-state persistence.

Two backends behind one tiny interface:

- ``DbTutorStore`` — the production path.  One ``tutor_student_states``
  row per student, upserted per write, so concurrent gunicorn workers
  and backend replicas can never clobber each other the way a shared
  JSON file can.
- ``FileTutorStore`` — the previous behaviour: whole-dict atomic write
  to a JSON file.  Used by tests and as the automatic fallback when the
  database is unreachable at engine startup.

The engine calls ``load_all()`` once at construction and
``upsert(student_id, state)`` after every serve/submit.  Writes are
best-effort: a failed persist logs and returns, never blocking the
teaching loop.
"""

from __future__ import annotations

import json
import logging
import os
import threading
from typing import Any, Dict, Optional

logger = logging.getLogger(__name__)


class FileTutorStore:
    """Whole-dict JSON file store (the original tutor_students.json path)."""

    def __init__(self, path: str):
        self.path = path

    def load_all(self) -> Dict[str, dict]:
        try:
            with open(self.path, encoding="utf-8") as fh:
                data = json.load(fh)
            return data if isinstance(data, dict) else {}
        except FileNotFoundError:
            return {}
        except (OSError, ValueError):
            logger.warning("tutor store: unreadable file %s", self.path,
                           exc_info=True)
            return {}

    def upsert_all(self, students: Dict[str, dict]) -> None:
        try:
            d = os.path.dirname(self.path)
            if d and not os.path.isdir(d):
                os.makedirs(d, exist_ok=True)
            tmp = self.path + ".tmp"
            with open(tmp, "w", encoding="utf-8") as fh:
                json.dump(students, fh)
            os.replace(tmp, self.path)
        except Exception:
            logger.warning("tutor store: file write failed", exc_info=True)


class DbTutorStore:
    """Postgres-backed store — per-student row upserts via the sync engine.

    The tutor engine is synchronous and called from async endpoints; the
    sync driver avoids blocking the event loop on async engine checkout.
    A threading lock serializes the session; each upsert touches one row.
    """

    def __init__(self) -> None:
        from sqlalchemy.orm import sessionmaker

        from backend.database import get_sync_engine

        self._Session = sessionmaker(get_sync_engine(), expire_on_commit=False)
        self._lock = threading.Lock()

    def load_all(self) -> Dict[str, dict]:
        from backend.database import TutorStudentState

        with self._lock, self._Session() as s:
            rows = s.query(TutorStudentState).all()
            return {r.student_id: r.state for r in rows}

    def upsert(self, student_id: str, state: dict) -> None:
        from backend.database import TutorStudentState

        try:
            with self._lock, self._Session() as s:
                row = s.get(TutorStudentState, student_id)
                if row is None:
                    row = TutorStudentState(student_id=student_id, state=state)
                    s.add(row)
                else:
                    row.state = state
                s.commit()
        except Exception:
            logger.warning("tutor store: db upsert failed for %s",
                           student_id, exc_info=True)


def build_store(persist_path: Optional[str] = None):
    """Resolve the production store: Postgres when reachable, else file.

    On first use with an empty table, any existing tutor_students.json is
    imported once — a zero-downtime migration of pre-DB state.

    ``persist_path`` still wins when explicitly provided *and* the DB is
    unavailable — keeps tests hermetic (they pass a tmp path) while the
    serve path gets real durability.
    """
    try:
        store = DbTutorStore()
        existing = store.load_all()          # connectivity probe — fail fast
        if not existing and persist_path and os.path.exists(persist_path):
            legacy = FileTutorStore(persist_path).load_all()
            for sid, state in legacy.items():
                store.upsert(sid, state)
            if legacy:
                logger.info("tutor store: migrated %d student rows from %s",
                            len(legacy), persist_path)
        return store
    except Exception:
        logger.warning("tutor store: postgres unreachable, "
                       "falling back to file store", exc_info=True)
    if persist_path:
        return FileTutorStore(persist_path)
    return None
