"""mine_textbook_exercises.py — Mine NCERT textbook exercises (classes 1-12).

Board SQP/MS corpora only cover classes 10 and 12. Classes 1-9 and 11
get their questions from NCERT textbook chapters: every chapter's
EXERCISE zones with numbered questions (and worked Examples, which
carry their solutions inline - bonus supervision).

Uses ncert_structure.json for grade/subject labeling of each chapter
file, extends question_bank.db with doc_type='TEXTBOOK' rows, so the
form index covers ALL of K-12.
"""

from __future__ import annotations

import json
import re
import sqlite3
import sys
from pathlib import Path

TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
STRUCTURE = Path(r"D:\node_generator\ncert-mcp\data\ncert_structure.json")
DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")

EXERCISE_RE = re.compile(
    r"^\s*(?:EXERCISE|Exercise)\s*([0-9]+(?:\.[0-9]+)*)\s*$", re.M)
QNUM_RE = re.compile(r"^\s*(\d{1,2})\.\s+", re.M)
EXAMPLE_RE = re.compile(
    r"^\s*Example\s*(\d{1,2})\s*[:\.]?\s*(.+?)(?=\n\s*Solution|\n\s*Example|\Z)",
    re.S | re.M)


def load_structure() -> dict:
    data = json.loads(STRUCTURE.read_text(encoding="utf-8"))
    out = {}
    for key, ch in data.get("chapters", {}).items():
        src = ch.get("source_file")
        if src:
            out[src] = {
                "grade": ch.get("grade"),
                "subject": (ch.get("subject") or "").lower() or "other",
                "title": ch.get("chapter_title", ""),
            }
    return out


def load_prefix_map() -> dict:
    """book-code prefix (first 4 chars) -> (grade, subject), derived
    from the structure file's own examples (gemh101 -> Grade 7 maths)."""
    data = json.loads(STRUCTURE.read_text(encoding="utf-8"))
    out = {}
    for c in data.get("chapters", {}).values():
        src = c.get("source_file") or ""
        if len(src) >= 4:
            out[src[:4].lower()] = (c.get("grade"),
                                    (c.get("subject") or "").lower())
    return out


_DESC_RE = re.compile(
    r"(?:^|_)(?:Class[_\s]?(\d{1,2})|([1-9]|1[012])th)", re.I)
_SUBJ_RE = re.compile(
    r"(mathematic|maths|science|physics|chemistry|biology|account|"
    r"business|econom|history|geograph|english|hindi|computer)",
    re.I)


def describe_file(filename: str, prefix_map: dict) -> Optional[dict]:
    """Class/subject for descriptive filenames (C9_Maths.txt,
    CBSE_Mathematics_Class9_2026-27.txt, Biology_Grade12_V2.txt)."""
    m = _DESC_RE.search(filename)
    subj = _SUBJ_RE.search(filename)
    if m and subj:
        grade = int(m.group(1) or m.group(2))
        return {"grade": grade, "subject": subj.group(1).lower(),
                "title": ""}
    code = filename[:4].lower()
    if code in prefix_map:
        g, s = prefix_map[code]
        return {"grade": g, "subject": s, "title": ""}
    return None


def extract_exercise_questions(text: str) -> list[dict]:
    """Numbered questions inside EXERCISE zones."""
    out = []
    zones = list(EXERCISE_RE.finditer(text))
    for i, z in enumerate(zones):
        start = z.end()
        end = zones[i + 1].start() if i + 1 < len(zones) else min(
            len(text), start + 12000)
        block = text[start:end]
        nums = list(QNUM_RE.finditer(block))
        for j, m in enumerate(nums):
            qstart = m.end()
            qend = nums[j + 1].start() if j + 1 < len(nums) else len(block)
            qtext = " ".join(block[qstart:qend].split())
            if 40 <= len(qtext) <= 1200:
                out.append({
                    "qno": int(m.group(1)), "text": qtext,
                    "exercise": z.group(1), "kind": "exercise",
                })
    return out


def extract_examples(text: str) -> list[dict]:
    """Worked examples WITH their solutions (supervision gold)."""
    out = []
    for m in EXAMPLE_RE.finditer(text):
        body = " ".join(m.group(2).split())
        if 40 <= len(body) <= 2000:
            out.append({
                "qno": int(m.group(1)), "text": body,
                "exercise": None, "kind": "example",
            })
    return out


def main(limit_files: int = 2500) -> int:
    from typing import Optional  # noqa: F401

    structure = load_structure()
    prefix_map = load_prefix_map()
    conn = sqlite3.connect(str(DB_PATH))
    conn.execute("""
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY, filename TEXT, path TEXT,
            doc_type TEXT, subject TEXT, class_label TEXT, session TEXT,
            n_questions INT);
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY, doc_id INT, qno INT, section TEXT,
            q_type TEXT, marks INT, is_competency INT, text TEXT);
    """)

    n_docs = n_q = 0
    for path in sorted(TEXT_CACHE.glob("*.txt")):
        info = structure.get(path.name) or describe_file(path.name,
                                                         prefix_map)
        if not info or n_docs >= limit_files:
            continue
        grade = info.get("grade")
        if not grade:
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        questions = (extract_exercise_questions(text)
                     + extract_examples(text))
        if not questions:
            continue
        cur = conn.execute(
            "INSERT INTO documents(filename, path, doc_type, subject, "
            "class_label, session, n_questions) VALUES (?,?,?,?,?,?,?)",
            (path.name, str(path), "TEXTBOOK", info["subject"],
             f"Class_{grade}", None, len(questions)))
        doc_id = cur.lastrowid
        for q in questions:
            conn.execute(
                "INSERT INTO questions(doc_id, qno, section, q_type, "
                "marks, is_competency, text) VALUES (?,?,?,?,?,?,?)",
                (doc_id, q["qno"], q.get("exercise"),
                 "EXAMPLE" if q["kind"] == "example" else "EXERCISE",
                 None, 0, q["text"][:4000]))
            n_q += 1
        n_docs += 1
        if n_docs % 100 == 0:
            conn.commit()
            print(f"  ... {n_docs} chapters, {n_q} questions", flush=True)
    conn.commit()
    print(f"MINED TEXTBOOKS: {n_docs} chapters, {n_q} questions")
    conn.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
