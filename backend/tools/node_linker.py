"""node_linker.py -- marry the curriculum graph to the practice supply.

The platform's content data (cbse_data/nodes/graph/node_metadata.json,
21k nodes: subject + class + chapter + concept_tags + prereqs) and the
verification corpus (question bank, CFQ competency items with official
keys) are two worlds that currently ignore each other.  This linker is
the complement: every CFQ question is attached to its curriculum node
by chapter match, so a node can SERVE verified competency practice and
practice knows its curricular home.

Deterministic, lexical (chapter-name token Jaccard), no models.
Output: cbse_data/practice_map.json
    {"node_id": {"cfq": [{"doc": fn, "doc_id": d, "qno": q,
                          "has_key": bool, "q_type": t}, ...]}, ...}
"""

from __future__ import annotations

import json
import re
import sqlite3
from pathlib import Path
from typing import Dict, List

NODES_JSON = Path(r"D:\platform\cbse_data\nodes\graph\node_metadata.json")
DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")
OUT = Path(r"D:\platform\cbse_data\practice_map.json")

_STOP = {"and", "of", "the", "in", "its", "to", "a", "an", "its"}

_CLASS_MAP = {"Class_X": 10, "Class_XII": 12, "Class_10": 10,
              "Class_12": 12, "Class_11": 11, "Class_9": 9}

# bank subject -> node-graph subject variants it may link to
_SUBJECT_ALIASES = {
    "maths": ["maths", "mathematics", "math"],
    "english_language": ["english", "english_language", "english_literature"],
    "social_science": ["social_science", "geography", "history",
                       "civics", "political_science", "economics"],
    "english": ["english", "english_language", "english_literature"],
    "biology": ["biology", "science"],
    "chemistry": ["chemistry", "science"],
    "physics": ["physics", "science"],
    "history": ["history", "political_science"],
}


def _tokens(name: str) -> set:
    name = re.sub(r"^\s*\d{1,2}\.\s*", "", name)     # '1. NAME' -> NAME
    return {t for t in re.findall(r"[a-z]{3,}", name.lower())
            if t not in _STOP}


def build(min_jaccard: float = 0.34) -> Dict:
    nodes = json.loads(NODES_JSON.read_text(encoding="utf-8"))
    # index nodes by (subject, class) -> [(tokens, chapter, node_id)]
    by_key: Dict[tuple, List[tuple]] = {}
    for n in nodes:
        subject = (n.get("subject") or "").lower().replace(" ", "_")
        key = (subject, int(n.get("class_level", 0)))
        by_key.setdefault(key, []).append(
            (_tokens(n.get("chapter", "")), n.get("chapter", ""), n["node_id"]))

    conn = sqlite3.connect(str(DB_PATH))
    rows = conn.execute(
        """SELECT d.id, d.filename, d.subject, d.class_label, d.doc_type,
                  q.qno, q.section, q.q_type, q.text,
                  EXISTS(SELECT 1 FROM official_answers o
                         WHERE o.doc_id = d.id AND o.qno = q.qno)
           FROM questions q JOIN documents d ON d.id = q.doc_id
           WHERE d.doc_type IN ('CFQ', 'PQ')""").fetchall()
    conn.close()

    links: Dict[str, List[dict]] = {}
    n_linked = 0
    for (doc_id, fname, subject, class_label, doc_type, qno, chapter,
         q_type, text, has_key) in rows:
        if not chapter:
            continue
        key = ((subject or "").lower(), _CLASS_MAP.get(class_label, 0))
        candidates = []
        for subj in _SUBJECT_ALIASES.get((subject or "").lower(),
                                         [(subject or "").lower()]):
            candidates.extend(by_key.get((subj,
                                          _CLASS_MAP.get(class_label, 0)),
                                         []))
        if not candidates:
            continue
        qt = _tokens(chapter)
        if not qt:
            continue
        best, best_j = None, 0.0
        for (nt, nchapter, node_id) in candidates:
            if not nt:
                continue
            j = len(qt & nt) / len(qt | nt)
            if j > best_j:
                best, best_j = node_id, j
        if best is None or best_j < min_jaccard:
            continue
        links.setdefault(best, []).append({
            "source": doc_type, "doc": fname, "doc_id": doc_id,
            "qno": qno, "chapter": chapter,
            "has_key": bool(has_key), "q_type": q_type})
        n_linked += 1

    payload = {node_id: {"cfq": items} for node_id, items in links.items()}
    OUT.write_text(json.dumps(payload, indent=1))
    return {"nodes_with_practice": len(payload),
            "questions_linked": n_linked,
            "questions_total": len(rows)}


if __name__ == "__main__":
    print(build())
