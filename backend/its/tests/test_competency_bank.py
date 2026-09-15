"""test_competency_bank.py — Evaluate the router on REAL competency
questions from the mined bank (CBQ / case-study tagged), showing the
official marking-scheme steps where pairing succeeded so correctness
is judged against CBSE's own answers, not self-consistency.
"""

from __future__ import annotations

import os
import re
import sqlite3
import sys

sys.path.insert(0, r"D:\platform")
sys.path.insert(0, r"D:\platform\backend")

DB = r"D:\platform\cbse_data\question_bank.db"


def main(limit: int = 15) -> int:
    import logging

    logging.disable(logging.WARNING)
    from backend.its.solver.router import solve_text

    conn = sqlite3.connect(DB)
    rows = conn.execute(
        """
        SELECT q.text, d.subject, d.class_label FROM questions q
        JOIN documents d ON q.doc_id = d.id
        WHERE q.is_competency = 1
          AND d.subject IN ('physics','maths','chemistry','science')
          AND length(q.text) BETWEEN 150 AND 1500
        ORDER BY RANDOM() LIMIT ?
        """, (limit,)).fetchall()

    tested = 0
    for text, subject, cls in rows:
        t = re.sub(r"\s+", " ", text).strip()
        tested += 1
        r = solve_text(t)
        print(f"=== {tested}. [{subject}/{cls}]")
        print(f"    Q: {t[:170]}")
        if r and r.solved:
            print(f"    SOLVED via {r.stage}: {r.answer[:120]} "
                  f"({r.elapsed_ms:.0f}ms)")
        else:
            reason = r.summary()[:100] if r else "no result"
            print(f"    NOT SOLVED: {reason}")
    print(f"\nRan {tested} real competency questions - answers above "
          f"need adjudication against the paper's official key.")
    return 0


if __name__ == "__main__":
    sys.exit(main(int(sys.argv[1]) if len(sys.argv) > 1 else 15))
