"""build_key_fingerprints.py -- one-time index: official keys lookupable
by question fingerprint.

Populates key_fingerprints(fingerprint, numeric_sig, subject, class_label,
letter, answer_text, tier, source_doc_id, source_qno) from
official_answers JOIN questions, using mine_keys' own canonical_hash +
numeric_signature so pipeline lookups match exactly.

Idempotent: rebuilds the table each run (source of truth is the join).
"""

from __future__ import annotations

import sqlite3
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from mine_keys import canonical_hash, numeric_signature  # noqa: E402

DB = Path(r"D:\platform\cbse_data\question_bank.db")


def build() -> int:
    conn = sqlite3.connect(str(DB))
    conn.execute(
        """CREATE TABLE IF NOT EXISTS key_fingerprints (
               fingerprint TEXT, numeric_sig TEXT, subject TEXT,
               class_label TEXT, letter TEXT, answer_text TEXT, tier TEXT,
               source_doc_id INTEGER, source_qno INTEGER)""")
    conn.execute("DELETE FROM key_fingerprints")
    rows = conn.execute(
        """SELECT oa.doc_id, oa.qno, oa.letter, oa.answer_text,
                  d.subject, d.class_label
           FROM official_answers oa
           JOIN questions q ON q.doc_id = oa.doc_id AND q.qno = oa.qno
           JOIN documents d ON d.id = q.doc_id
           WHERE oa.letter IS NOT NULL""").fetchall()
    n = 0
    for doc_id, qno, letter, answer_text, subject, cls in rows:
        if not letter:
            continue
        qtext = _qtext(conn, doc_id, qno)
        variants = [(canonical_hash(qtext),
                     "|".join(numeric_signature(qtext)))]
        try:
            from backend.its.solver.input_normalizer import normalize_input
            nq = normalize_input(qtext)
            if nq != qtext:
                variants.append((canonical_hash(nq),
                                 "|".join(numeric_signature(nq))))
        except Exception:
            pass
        n += 1
        for fp_val, sig in variants:
            conn.execute(
                "INSERT INTO key_fingerprints VALUES (?,?,?,?,?,?,?,?,?)",
                (fp_val, sig, subject, cls, letter, answer_text,
                 "high", doc_id, qno))
    conn.commit()
    conn.close()
    return n


def _qtext(conn: sqlite3.Connection, doc_id: int, qno: int) -> str:
    row = conn.execute(
        "SELECT text FROM questions WHERE doc_id=? AND qno=?",
        (doc_id, qno)).fetchone()
    return row[0] if row else ""


if __name__ == "__main__":
    print("key fingerprints built:", build())
