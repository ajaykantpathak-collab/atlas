"""test_form_retrieval.py — Retrieval quality of the compiled form index.

For each sampled form, query with a PERTURBED version of its question
(sentence order shuffled + a distractor clause inserted). A hit means
top-1 retrieval returns the same form — i.e. phrasing variance does
not break matching. This is the capability the transfer solver needs.
"""

from __future__ import annotations

import os
import random
import re
import sqlite3
import sys

sys.path.insert(0, r"D:\platform")

DB = r"D:\platform\cbse_data\question_bank.db"

DISTRACTOR = ("The teacher explained the theory in class before the "
              "test began. ")


def perturb(text: str, rng: random.Random) -> str:
    sents = [s.strip() for s in re.split(r"(?<=[.?!])\s+", text) if s.strip()]
    if len(sents) > 1:
        rng.shuffle(sents)
    body = " ".join(sents)
    cut = rng.randrange(1, max(2, len(body) // 2))
    return body[:cut] + " " + DISTRACTOR + body[cut:]


def main(n: int = 40) -> int:
    import logging

    logging.disable(logging.WARNING)
    from backend.its.solver.form_compiler import get_form_index

    conn = sqlite3.connect(DB)
    rows = conn.execute(
        """SELECT form_id, sample_text FROM forms
           WHERE length(sample_text) > 120 ORDER BY RANDOM() LIMIT ?""",
        (n,)).fetchall()

    index = get_form_index()
    rng = random.Random(7)
    hit = 0
    misses = []
    for fid, sample in rows:
        noisy = perturb(sample, rng)
        res = index.retrieve(noisy, k=1)
        if res and res[0]["form_id"] == fid:
            hit += 1
        else:
            misses.append((sample[:80],
                           res[0]["sample"][:60] if res else "none",
                           round(res[0]["score"], 3) if res else 0))
    print(f"FORM RETRIEVAL (perturbed queries): {hit}/{len(rows)} = "
          f"{100 * hit / max(1, len(rows)):.0f}%")
    for m in misses[:6]:
        print("  MISS:", m)
    return 0


if __name__ == "__main__":
    sys.exit(main(int(sys.argv[1]) if len(sys.argv) > 1 else 40))
