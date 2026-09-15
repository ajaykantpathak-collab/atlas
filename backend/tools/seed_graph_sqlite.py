"""Seed the SQLite knowledge graph (knowledge_nodes table) from the
CISCE enrichment content already present in the platform database.

The graph service (backend/services/graph_service.py) degrades to SQLite
when Neo4j is unreachable. The SQLite representation is the
``knowledge_nodes`` table (KnowledgeNodeModel): each row carries its
``prerequisites`` / ``forward_nodes`` JSON lists which act as REQUIRES
edges for graph traversal.

Usage:
    set PLATFORM_DATABASE_URL=sqlite+aiosqlite:///<repo>/backend_local.db
    python -m backend.tools.seed_graph_sqlite

Idempotent: existing node_ids (including the seed demo nodes) are never
overwritten; only missing nodes are inserted.
"""

from __future__ import annotations

import json
import os
import sqlite3
import sys
import uuid

# Resolve the database URL the same way backend.config does, before any
# backend import that may create engines.  Default is repo-relative
# (<repo>/backend_local.db) so it works on any checkout location.
_REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.abspath(__file__))))
DEFAULT_SQLITE_URL = "sqlite+aiosqlite:///" + os.path.join(
    _REPO_ROOT, "backend_local.db").replace("\\", "/")


def _resolve_db_path() -> str:
    """Extract a filesystem path from the resolved platform database URL."""
    url = ""
    for name in ("PLATFORM_DATABASE_URL", "DATABASE_URL", "POSTGRES_URL"):
        val = os.environ.get(name, "")
        if val:
            url = val
            break
    if not url:
        url = DEFAULT_SQLITE_URL
    if not url.startswith("sqlite"):
        print(f"Refusing to seed a non-sqlite database: {url}")
        sys.exit(1)
    # sqlite+aiosqlite:///D:/path -> D:/path   (three slashes then path)
    path = url.split("///", 1)[1] if "///" in url else url.split(":", 2)[-1]
    return path


SUBJECT_NAMES = {
    "acc": "Accountancy",
    "bio": "Biology",
    "bs": "Business Studies",
    "chem": "Chemistry",
    "comm": "Commerce",
    "commapp": "Commercial Applications",
    "commstud": "Commercial Studies",
    "cs": "Computer Science",
    "econ": "Economics",
    "econapp": "Economic Applications",
    "eng": "English",
    "hist": "History",
    "histciv": "History & Civics",
    "home": "Home Science",
    "legal": "Legal Studies",
    "massmedia": "Mass Media",
    "maths": "Mathematics",
    "phy": "Physics",
    "physics": "Physics",
    "pol": "Political Science",
    "psy": "Psychology",
    "soc": "Sociology",
}


def _parse_json_list(raw) -> list:
    """Parse a prereq/forward column that may be a JSON list, the string
    'null', an empty string, or already-decoded list."""
    if raw is None:
        return []
    if isinstance(raw, list):
        return [str(x) for x in raw if x]
    if isinstance(raw, str):
        txt = raw.strip()
        if not txt or txt.lower() == "null":
            return []
        try:
            parsed = json.loads(txt)
        except (ValueError, TypeError):
            return []
        if isinstance(parsed, list):
            return [str(x) for x in parsed if x]
    return []


def main() -> None:
    db_path = _resolve_db_path()
    print(f"Seeding knowledge graph into: {db_path}")
    con = sqlite3.connect(db_path)
    cur = con.cursor()

    existing = {r[0] for r in cur.execute("SELECT node_id FROM knowledge_nodes")}
    print(f"Existing knowledge_nodes: {len(existing)}")

    rows = cur.execute(
        """
        SELECT node_id, title, definition, subject, class_level, chapter,
               eli5, prereq_ids, forward_node_ids, difficulty, board
        FROM enrichment_content
        ORDER BY class_level, subject, node_id
        """
    ).fetchall()
    print(f"CISCE enrichment rows available: {len(rows)}")

    # Known ids = existing nodes + every enrichment node (so cross-class
    # prerequisite links such as c8_bio_022 -> c10_bio_023 resolve).
    known = set(existing) | {r[0] for r in rows}

    inserted = 0
    edges = 0
    per_class: dict[int, int] = {}
    for (node_id, title, definition, subject, class_level, chapter,
         eli5, prereq_raw, forward_raw, difficulty, board) in rows:
        if node_id in existing:
            continue
        prereqs = [p for p in _parse_json_list(prereq_raw) if p in known]
        forwards = [f for f in _parse_json_list(forward_raw) if f in known]
        edges += len(prereqs)
        cur.execute(
            """
            INSERT INTO knowledge_nodes (
                id, node_id, label, description, subject, class_level,
                chapter, node_type, simplified_content, prerequisites,
                forward_nodes, mastery_probability, difficulty, estimated_time
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                str(uuid.uuid4()),
                node_id,
                title or node_id,
                (definition or "")[:500],
                subject,
                int(class_level),
                chapter,
                "info",
                eli5 or (definition or "")[:300],
                json.dumps(prereqs),
                json.dumps(forwards),
                0.0,
                difficulty or "medium",
                15,
            ),
        )
        inserted += 1
        per_class[int(class_level)] = per_class.get(int(class_level), 0) + 1
    con.commit()

    total = cur.execute("SELECT COUNT(*) FROM knowledge_nodes").fetchone()[0]
    total_edges = cur.execute(
        "SELECT prerequisites FROM knowledge_nodes"
    ).fetchall()
    edge_total = sum(len(_parse_json_list(r[0])) for r in total_edges)

    print(f"Inserted: {inserted}")
    print(f"Inserted by class: {dict(sorted(per_class.items()))}")
    print(f"Total knowledge_nodes now: {total}")
    print(f"Total prerequisite edges now: {edge_total}")
    print("By class (full table):")
    for class_level, count in cur.execute(
        "SELECT class_level, COUNT(*) FROM knowledge_nodes "
        "GROUP BY class_level ORDER BY class_level"
    ):
        print(f"  class {class_level}: {count}")

    # Sanity: classes 6-12 coverage report
    print("Classes 6-12 subject coverage:")
    for class_level, subject, count in cur.execute(
        "SELECT class_level, subject, COUNT(*) FROM knowledge_nodes "
        "WHERE class_level BETWEEN 6 AND 12 "
        "GROUP BY class_level, subject ORDER BY class_level, subject"
    ):
        name = SUBJECT_NAMES.get(subject, subject)
        print(f"  class {class_level} {name} ({subject}): {count}")

    con.close()
    print("Done.")


if __name__ == "__main__":
    main()
