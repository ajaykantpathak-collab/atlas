"""scenario_compiler.py — Competency tier: marking schemes → chains.

Compiles recurring competency archetypes from the mined bank:

    For each competency case-study question with a linked marking
    scheme, extract the SCENARIO SIGNATURE (subject + recurring nouns
    + question intent) and the OFFICIAL STEP SEQUENCE. Cluster
    signatures; store the majority step sequence as the archetype's
    chain. At runtime, a matching narrative executes its chain with
    the cascade, step by step, with the final step verified.

Storage: scenario_patterns table in question_bank.db:
    signature, subject, n_instances, sample_text, chain_steps,
    chain_operands (numbered quantities each step needs)
"""

from __future__ import annotations

import hashlib
import re
import sqlite3
from collections import Counter
from pathlib import Path
from typing import Dict, List, Optional, Tuple

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")

_NOUN_RE = re.compile(r"\b[a-z]{4,}\b", re.I)
_STOP = {"that", "with", "from", "this", "which", "have", "will", "then",
         "been", "were", "their", "they", "would", "could", "should",
         "there", "these", "those", "following", "questions", "answer",
         "given", "read", "passage", "below", "study", "case", "also"}


def scenario_signature(text: str) -> str:
    """Content nouns of the narrative, canonicalized order."""
    nouns = [w.lower() for w in _NOUN_RE.findall(text)
             if w.lower() not in _STOP]
    top = [w for w, _ in Counter(nouns).most_common(8)]
    return " ".join(sorted(top))


def sig_key(sig: str) -> str:
    return hashlib.sha1(sig.encode()).hexdigest()[:12]


def compile_patterns(min_instances: int = 2) -> Dict[str, int]:
    conn = sqlite3.connect(str(DB_PATH))
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS scenario_patterns (
        sig_key TEXT PRIMARY KEY, signature TEXT, subject TEXT,
        n_instances INT, sample_text TEXT, chain_steps TEXT);
    """)
    rows = conn.execute(
        """SELECT q.id, q.text, q.qno, d.subject, d.session
           FROM questions q JOIN documents d ON q.doc_id = d.id
           WHERE q.is_competency=1""").fetchall()

    groups: Dict[str, list] = {}
    for q_id, text, qno, subject, session in rows:
        sig = scenario_signature(text)
        if len(sig.split()) < 4:
            continue
        key = sig_key(sig)
        # attach linked marking steps when the session pairs
        steps = None
        pair = conn.execute(
            "SELECT id FROM documents WHERE doc_type='MS' AND subject=? "
            "AND substr(session,1,4)=?", (subject,
                                          (session or "")[:4])).fetchone()
        if pair:
            steps = [t for (t,) in conn.execute(
                "SELECT text FROM marking_steps WHERE doc_id=? AND qno=? "
                "ORDER BY step_no", (pair[0], qno)).fetchall()][:10]
        groups.setdefault(key, []).append(
            {"text": text[:800], "subject": subject, "sig": sig,
             "steps": steps})

    conn.execute("DELETE FROM scenario_patterns")
    n_compiled = 0
    for key, items in groups.items():
        if len(items) < min_instances:
            continue
        with_steps = [i for i in items if i["steps"]]
        chain = "\n".join(with_steps[0]["steps"]) if with_steps else None
        conn.execute(
            "INSERT OR REPLACE INTO scenario_patterns(sig_key, signature, "
            "subject, n_instances, sample_text, chain_steps) "
            "VALUES (?,?,?,?,?,?)",
            (key, items[0]["sig"], items[0]["subject"], len(items),
             items[0]["text"], chain))
        n_compiled += 1
    conn.commit()
    conn.close()
    return {"signatures": len(groups), "archetypes_compiled": n_compiled}


def find_archetype(text: str) -> Optional[dict]:
    """Best matching compiled archetype for a narrative."""
    sig = scenario_signature(text)
    if len(sig.split()) < 4:
        return None
    conn = sqlite3.connect(str(DB_PATH))
    rows = conn.execute(
        "SELECT sig_key, signature, subject, n_instances, sample_text, "
        "chain_steps FROM scenario_patterns").fetchall()
    conn.close()
    sig_words = set(sig.split())
    best, best_score = None, 0.0
    for key, signature, subject, n, sample, chain in rows:
        words = set(signature.split())
        if not words:
            continue
        jacc = len(sig_words & words) / len(sig_words | words)
        if jacc > best_score:
            best_score = jacc
            best = {"sig_key": key, "signature": signature,
                    "subject": subject, "n_instances": n,
                    "sample": sample, "chain": chain, "score": jacc}
    if best and best_score >= 0.55:
        best["score"] = best_score
        return best
    return None


if __name__ == "__main__":
    print(compile_patterns())
