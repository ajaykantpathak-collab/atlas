"""mine_question_bank.py — Compile the SQP/MS/PQ corpus into SQLite.

Parses the pre-extracted board-question text cache
(20,709 files: Sample Question Papers, Marking Schemes, Previous
Questions) into a structured question bank:

    documents      one row per source file (subject/class/session/type)
    questions      Q-number, section, text, marks, type, competency flag
    marking_steps  ordered solution steps from the paired MS file

The marking-scheme steps are the supervision for tier-2 scenario
pattern compilation: each step sequence maps to an equation chain.

Usage:
    python backend/tools/mine_question_bank.py --subjects physics,maths
    python backend/tools/mine_question_bank.py --all
"""

from __future__ import annotations

import argparse
import re
import sqlite3
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import List, Optional

TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")

Q_RE = re.compile(r"^\s*Q\.?\s*(\d{1,3})\s*[\.\)]\s*", re.MULTILINE)
SECTION_RE = re.compile(r"\[\s*SECTION\s*[-–:]?\s*([A-E])\s*\]", re.I)
MARKS_TAG_RE = re.compile(r"[\(\[]\s*(?:\d+\s*[x×]\s*)?(\d)\s*(?:marks?|m)\s*[\)\]]|[\(\[]\s*(\d)\s*[\)\]]\s*$")
MCQ_RE = re.compile(r"[\(\[]\s*[ABCD]\s*[\)\]]")
AR_RE = re.compile(r"\bassertion\b[\s\S]{0,400}\breason\b", re.I)
CASE_RE = re.compile(r"case[\s-]*study|competency[\s-]*based|CBQ", re.I)


@dataclass
class Question:
    qno: int
    section: str
    text: str
    marks: Optional[int]
    q_type: str          # MCQ | AR | CASE | SHORT | LONG
    is_competency: bool


@dataclass
class ParsedDoc:
    questions: List[Question] = field(default_factory=list)


def classify_subject(filename: str) -> str:
    n = filename.lower()
    table = [
        ("physics", "physics"), ("chem", "chemistry"),
        ("math", "maths"), ("applied-maths", "applied_maths"),
        ("applied maths", "applied_maths"), ("bio", "biology"),
        ("account", "accountancy"), ("business", "business_studies"),
        ("econom", "economics"), ("computer science", "computer_science"),
        ("english", "english"), ("hindi", "hindi"),
        ("history", "history"), ("geograph", "geography"),
        ("political", "political_science"), ("psycholog", "psychology"),
        ("econom", "economics"), ("biology", "biology"),
        ("science", "science"), ("social", "social_science"),
    ]
    for key, subj in table:
        if key in n:
            return subj
    return "other"


def classify_class(filename: str, text_head: str) -> str:
    m = re.search(r"class\s*[–\-:\s]*\s*(x{0,2}i{0,3}|xi{1,3}|\d{1,2})",
                  text_head, re.I)
    label = filename
    for token in re.findall(r"\b(?:class\s*)?(1[012]?|[6-9])\b", label):
        return f"Class_{token}"
    if m:
        return f"Class_{m.group(1)}"
    return "unknown"


def doc_type_of(filename: str) -> str:
    n = filename.lower()
    if re.search(r"\bms\b|marking", n):
        return "MS"
    if "sqp" in n or "sample" in n:
        return "SQP"
    if re.search(r"\bpq\b|previous", n):
        return "PQ"
    return "OTHER"


def parse_marks(block: str, section_default: Optional[int]) -> Optional[int]:
    m = re.search(r"[\(\[]\s*(?:\d+\s*[x×]\s*)?1?\s*[x×]?\s*(\d)\s*(?:marks?|m)\s*[\)\]]",
                  block, re.I)
    if m:
        return int(m.group(1))
    m = re.search(r"\[(\d)\]\s*$", block.strip())
    if m:
        return int(m.group(1))
    return section_default


def split_questions(text: str) -> ParsedDoc:
    doc = ParsedDoc()
    section = "A"
    section_default = None
    matches = list(Q_RE.finditer(text))
    for i, m in enumerate(matches):
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else \
            min(len(text), start + 4000)
        block = text[start:end].strip()
        # section tracking: look back for the latest SECTION marker
        before = text[:m.start()]
        sm = None
        for sm in SECTION_RE.finditer(before):
            pass
        if sm:
            section = sm.group(1).upper()
        qno = int(m.group(1))
        q_type = "SHORT"
        if MCQ_RE.search(block):
            q_type = "MCQ"
        if AR_RE.search(block):
            q_type = "AR"
        if CASE_RE.search(block):
            q_type = "CASE"
        marks = parse_marks(block, section_default)
        is_comp = q_type == "CASE" or bool(CASE_RE.search(block))
        doc.questions.append(Question(
            qno=qno, section=section, text=block[:4000], marks=marks,
            q_type=q_type, is_competency=is_comp))
    return doc


MS_Q_RE = re.compile(r"^\s*(?:Q\.?\s*|Ans(?:wer)?\.?\s*)?(\d{1,3})\s*[\.\)]\s*",
                     re.MULTILINE)


def parse_marking_answers(text: str) -> List[Tuple[int, List[str]]]:
    """Marking scheme → [(qno, [answer step lines])]. MS documents
    answer questions keyed by number; steps are the numbered/lettered
    solution lines following each key until the next key."""
    answers: List[Tuple[int, List[str]]] = []
    keys = list(MS_Q_RE.finditer(text))
    for i, m in enumerate(keys):
        qno = int(m.group(1))
        start = m.end()
        end = keys[i + 1].start() if i + 1 < len(keys) else min(
            len(text), start + 3000)
        block = text[start:end]
        steps = []
        for line in block.splitlines():
            line = line.strip()
            if not line or len(line) < 2:
                continue
            steps.append(line[:500])
        if steps:
            answers.append((qno, steps[:12]))
    return answers


SCHEMA = """
CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY, filename TEXT, path TEXT, doc_type TEXT,
    subject TEXT, class_label TEXT, session TEXT, n_questions INT);
CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY, doc_id INT, qno INT, section TEXT,
    q_type TEXT, marks INT, is_competency INT, text TEXT);
CREATE INDEX IF NOT EXISTS idx_q_doc ON questions(doc_id);
CREATE TABLE IF NOT EXISTS marking_steps (
    id INTEGER PRIMARY KEY, doc_id INT, qno INT, step_no INT, text TEXT);
"""


def mine_file(path: Path, conn: sqlite3.Connection) -> None:
    text = path.read_text(encoding="utf-8", errors="ignore")
    if len(text) < 500:
        return
    dtype = doc_type_of(path.name)
    subject = classify_subject(path.name)
    doc = split_questions(text)
    if not doc.questions and dtype != "MS":
        return
    cur = conn.execute(
        "INSERT INTO documents(filename, path, doc_type, subject, "
        "class_label, session, n_questions) VALUES (?,?,?,?,?,?,?)",
        (path.name, str(path), dtype, subject,
         classify_class(path.name, text[:2000]),
         next(iter(re.findall(r"20\d\d(?:\s*[-–]\s*\d{2,4})?", text[:1500])),
              ""), len(doc.questions)))
    doc_id = cur.lastrowid
    for q in doc.questions:
        conn.execute(
            "INSERT INTO questions(doc_id, qno, section, q_type, marks, "
            "is_competency, text) VALUES (?,?,?,?,?,?,?)",
            (doc_id, q.qno, q.section, q.q_type, q.marks,
             int(q.is_competency), q.text))
    if dtype == "MS":
        answers = parse_marking_answers(text)
        conn.execute("DELETE FROM marking_steps WHERE doc_id=?", (doc_id,))
        for qno, steps in answers:
            for i, step in enumerate(steps):
                conn.execute(
                    "INSERT INTO marking_steps(doc_id, qno, step_no, text) "
                    "VALUES (?,?,?,?)", (doc_id, qno, i, step))


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--subjects", default="physics,maths,chemistry")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args(argv)

    subjects = None
    if not args.all:
        subjects = {s.strip().lower() for s in args.subjects.split(",")}

    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.executescript(SCHEMA)

    files = sorted(TEXT_CACHE.glob("*.txt"))
    n_done = n_docs = n_qs = 0
    for p in files:
        if subjects is not None and classify_subject(p.name) not in subjects:
            continue
        try:
            before_q = conn.execute("SELECT count(*) FROM questions") \
                .fetchone()[0]
            mine_file(p, conn)
            after_q = conn.execute("SELECT count(*) FROM questions") \
                .fetchone()[0]
            n_docs += 1
            n_qs += after_q - before_q
        except Exception as exc:
            print(f"  skip {p.name}: {exc}", file=sys.stderr)
        n_done += 1
        if n_done % 200 == 0:
            conn.commit()
            print(f"  ... {n_done} files, {n_docs} mined, {n_qs} questions")
    conn.commit()

    stats = conn.execute(
        "SELECT doc_type, count(*) FROM documents GROUP BY doc_type") \
        .fetchall()
    qstats = conn.execute(
        "SELECT q_type, count(*) FROM questions GROUP BY q_type") \
        .fetchall()
    comp = conn.execute(
        "SELECT count(*) FROM questions WHERE is_competency=1").fetchone()[0]
    print("MINED:", stats, "| questions:", qstats, "| competency:", comp)
    conn.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
