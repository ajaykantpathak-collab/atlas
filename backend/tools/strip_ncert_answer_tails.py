"""strip_ncert_answer_tails.py -- one-time cleanup for mined NCERT
questions that carry their own answer at the end ("Ans: 8 kg").

Some textbook extractions embedded the answer key into the question
text.  Those tail numbers poison slot extraction (they are answers,
not question values) and even act as fake labels ("Ans: 12 ...").  This
tool rewrites ONLY questions belonging to documents with filename LIKE
'ncert_%' using the same conservative trailing-tail rule as the miner
(slot_extractor.strip_answer_tail -- single source of truth):

  - only the LAST standalone "Ans" token can open a tail;
  - a tail that re-opens the question list ("... Q.4 Solve these:")
    is left alone (multi-part items interleave answers/questions);
  - the remaining head must still be a real question (>= 20 chars).

Idempotent: rows without a clean tail are left untouched, so re-running
updates 0 rows.  Non-ncert documents are never touched.

Usage:
    python -B backend/tools/strip_ncert_answer_tails.py [--dry-run]
"""

from __future__ import annotations

import argparse
import sqlite3
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from backend.its.solver.slot_extractor import strip_answer_tail

DB = Path(r"D:\platform\cbse_data\question_bank.db")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true",
                    help="count the rows that would change, no update")
    args = ap.parse_args()

    conn = sqlite3.connect(str(DB))
    rows = conn.execute(
        "SELECT q.id, q.text FROM questions q "
        "JOIN documents d ON d.id = q.doc_id "
        "WHERE d.filename LIKE 'ncert_%'").fetchall()

    changed = 0
    for rid, text in rows:
        new = strip_answer_tail(text)
        if new != text:
            changed += 1
            if not args.dry_run:
                conn.execute("UPDATE questions SET text=? WHERE id=?",
                             (new, rid))
    if not args.dry_run:
        conn.commit()
    conn.close()
    verb = "would update" if args.dry_run else "updated"
    print(f"scanned {len(rows)} ncert_% question rows, "
          f"{verb} {changed}")


if __name__ == "__main__":
    main()
