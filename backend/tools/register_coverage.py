"""register_coverage.py -- S7: measure how fast the board phrasing
register closes (ARCHITECTURE.md 17.S7).

If question phrasings were unbounded ("full English"), no deterministic
grammar could ever cover them.  Form mining already hinted the register
is finite (4,286 forms in 8,867 questions).  This script measures it
directly: with a seeded shuffle, how much of question N+1's trigram
vocabulary was already seen in the first N questions?

A curve that saturates toward 1.0 = the register closes = the grammar
is a finite project.  It also reports the fully-covered fraction (new
questions whose every trigram was already seen) -- the strongest form
of the claim.

Usage:
    python -m backend.tools.register_coverage [subject]

Writes cbse_data/register_coverage_<subject>.json and prints the curve.
"""

from __future__ import annotations

import json
import random
import re
import sqlite3
import sys
from pathlib import Path
from typing import Dict, List, Set

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")
OUT_DIR = Path(r"D:\platform\cbse_data")

_TOKEN_RE = re.compile(r"[a-z0-9]+")
_CHECKPOINTS = [500, 1000, 2000, 4000, 8000]


def trigrams(text: str) -> Set[str]:
    toks = _TOKEN_RE.findall(text.lower())
    if len(toks) < 3:
        return {" ".join(toks)} if toks else set()
    return {" ".join(toks[i:i + 3]) for i in range(len(toks) - 2)}


def measure(subject: str | None = None) -> Dict:
    conn = sqlite3.connect(str(DB_PATH))
    sql = "SELECT text FROM questions q JOIN documents d ON d.id = q.doc_id"
    params: List = []
    if subject:
        sql += " WHERE d.subject = ?"
        params.append(subject)
    texts = [t for (t,) in conn.execute(sql, params) if t and len(t) > 30]
    conn.close()

    rng = random.Random(20260906)          # frozen: reproducible curve
    rng.shuffle(texts)

    seen: Set[str] = set()
    total_trigrams = 0
    covered_trigrams = 0
    full_coverage = 0
    new_seen = 0
    curve = []
    n = len(texts)
    checkpoints = [c for c in _CHECKPOINTS if c < n] + [n]

    for i, text in enumerate(texts, start=1):
        tri = trigrams(text)
        unseen = tri - seen
        if i > 1 and tri:
            total_trigrams += len(tri)
            covered_trigrams += len(tri) - len(unseen)
            if not unseen:
                full_coverage += 1
            if not (unseen - {" ".join([])}):
                pass
        seen |= unseen
        if i in checkpoints:
            avg_cov = (covered_trigrams / total_trigrams
                       if total_trigrams else 0.0)
            curve.append({
                "questions_seen": i,
                "avg_trigram_coverage": round(avg_cov, 4),
                "fully_covered_fraction": round(full_coverage / max(
                    i - 1, 1), 4),
                "distinct_trigrams": len(seen),
            })
    return {"subject": subject or "all", "n_questions": n, "curve": curve}


if __name__ == "__main__":
    subject = sys.argv[1] if len(sys.argv) > 1 else None
    result = measure(subject)
    out = OUT_DIR / (
        f"register_coverage_{subject or 'all'}.json")
    out.write_text(json.dumps(result, indent=2))
    print(f"subject={result['subject']} n={result['n_questions']}")
    print(f"{'seen':>6} {'avg-cover':>10} {'full-cover':>11} {'trigrams':>9}")
    for row in result["curve"]:
        print(f"{row['questions_seen']:>6} "
              f"{row['avg_trigram_coverage']:>10.4f} "
              f"{row['fully_covered_fraction']:>11.4f} "
              f"{row['distinct_trigrams']:>9}")
    print(f"saved: {out}")
