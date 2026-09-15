"""mission_benchmark.py -- the competency mission metric, reproducible.

Runs the full pipeline (answer_pipeline, all lanes) over a random
sample of real competency questions from the bank and reports the
three standardized numbers (ARCHITECTURE.md mission metric):

    a) verified share of the sampled items (autonomous solves)
    b) guided share (honest refusals -- coverage gap, not wrongness)
    c) per-subject and per-lane attribution for every verified answer

This is the scoreboard the Lane B reader and typed-block builds move.
Deterministic sample (frozen seed).  Usage:

    python -m backend.tools.mission_benchmark [n]
"""

from __future__ import annotations

import collections
import json
import random
import re
import sqlite3
import sys
from pathlib import Path

DB = Path(r"D:\platform\cbse_data\question_bank.db")
OUT = Path(r"D:\platform\cbse_data\mission_benchmark.json")


def main(n: int = 25) -> None:
    import logging
    import warnings
    logging.disable(logging.CRITICAL)
    warnings.filterwarnings("ignore")

    from backend.its.solver.answer_pipeline import answer

    conn = sqlite3.connect(str(DB))
    rows = conn.execute(
        """SELECT q.text, d.subject FROM questions q
           JOIN documents d ON d.id = q.doc_id
           WHERE d.doc_type IN ('CFQ','PQ')
             AND length(q.text) BETWEEN 100 AND 600""").fetchall()
    conn.close()
    random.Random(20260906).shuffle(rows)
    sample = rows[:n]

    def stem(text: str) -> str:
        return re.split(r"\s*\(a\)", text)[0].strip()

    verified = guided = 0
    per_subject = collections.Counter()
    items = []
    for text, subject in sample:
        s = stem(text)
        r = answer(s)
        if r.label in ("VERIFIED", "VERIFIED_WITH_ASSUMPTIONS"):
            verified += 1
            per_subject[subject] += 1
            items.append({"subject": subject, "tier": r.label,
                          "numeric": r.numeric, "answer": r.answer,
                          "stem": s[:160]})
        else:
            guided += 1

    result = {
        "sample_size": len(sample),
        "verified": verified,
        "guided": guided,
        "verified_share": round(verified / max(1, len(sample)), 3),
        "verified_by_subject": dict(per_subject),
        "verified_items": items,
    }
    OUT.write_text(json.dumps(result, indent=1))
    print(json.dumps({k: v for k, v in result.items()
                      if k != "verified_items"}, indent=1))
    print("saved:", OUT)


if __name__ == "__main__":
    main(int(sys.argv[1]) if len(sys.argv) > 1 else 25)
