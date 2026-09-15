"""mine_cfq.py -- Competency Focused Practice Questions into the bank.

Official CBSE CFQ/PQ banks (NEP-2020 competency items).  Text-layer
PDFs are mined directly (fitz); image-based renditions are skipped and
reported (OCR is a separate pass).

Two formats:
  CFPQ books  -- chapter headings 'N. NAME', questions 'Q.1 ...',
                 per-chapter restarts, per-chapter 'Answers' keys
  Maths PQ    -- bare sequential number lines, no key

Questions land in question_bank.db with is_competency=1; the chapter
goes to the section column.  Official keys land in official_answers
(doc_id, qno, letter, answer_text, marks) joined via global qno, and
are the ESCROWED ground truth for competency practice.

Idempotent: re-running backfills answer keys for existing docs.

Usage:  python -m backend.tools.mine_cfq
"""

from __future__ import annotations

import re
import sqlite3
from pathlib import Path
from typing import Dict, List, Optional

import fitz

SRC = Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam"
           r"\CompetencyFocused")
DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")

_SUBJECT = [
    (r"maths", "maths"), (r"physics", "physics"), (r"chem", "chemistry"),
    (r"bio", "biology"), (r"english", "english"), (r"history", "history"),
    (r"social", "social_science"),
]
_CLASS = [
    (r"[_-]x([_-]|$)", "Class_X"),
    (r"xii|g12|grade\s*12|class\s*12|[_-]12", "Class_XII"),
]

_BARE_NUM = re.compile(r"^(\d{1,2})$")
_QMARK = re.compile(r"^Q\s*\.?\s*(\d{1,2})\s*[.)]?\s*(.*)$")
_CHAPTER = re.compile(r"^(\d{1,2})\.\s+([A-Z][A-Z &'()-]{4,60})$")
_OPTION = re.compile(r"^\(([a-d])\)")
_CASE_RE = re.compile(r"case\s*study|read\s+the\s+(following|passage)|"
                      r"passage\s+below", re.I)


def _meta_for(name: str) -> Optional[Dict[str, str]]:
    low = name.lower()
    subject = next((s for pat, s in _SUBJECT if re.search(pat, low)), None)
    klass = next((k for pat, k in _CLASS if re.search(pat, low)), None)
    if not subject or not klass:
        return None
    doc_type = "CFQ" if re.search(r"cfpq|competency", low) else "PQ"
    return {"subject": subject, "class_label": klass, "doc_type": doc_type}


def _is_image_pdf(pdf_path: Path) -> bool:
    pdf = fitz.open(str(pdf_path))
    sample = [len(pdf[i].get_text().strip())
              for i in range(min(20, pdf.page_count))]
    pdf.close()
    sample.sort()
    return (sample[len(sample) // 2] if sample else 0) < 300


def _scan_groups(pdf_path: Path) -> List[Dict]:
    """Question groups with chapter context and LOCAL question numbers."""
    pdf = fitz.open(str(pdf_path))
    lines: List[str] = []
    for pno in range(pdf.page_count):
        page = [ln.strip() for ln in pdf[pno].get_text().split("\n")]
        if page and page[0] == str(pno + 1):
            page = page[1:]                    # page-number furniture
        lines.extend(page)
    pdf.close()

    has_qmarks = any(_QMARK.match(ln) for ln in lines)
    groups: List[Dict] = []
    current: Optional[Dict] = None
    chapter = ""
    expect = 1
    for ln in lines:
        if "..." in ln:                        # contents leaders
            continue
        ch = _CHAPTER.match(ln)
        if ch:
            chapter = f"{ch.group(1)}. {ch.group(2).strip()}"
            continue
        hit = None
        if has_qmarks:
            m = _QMARK.match(ln)
            if m:
                hit = (int(m.group(1)), m.group(2))
        else:
            m = _BARE_NUM.match(ln)
            if m and int(m.group(1)) == expect:
                hit = (int(m.group(1)), "")
        if hit is not None:
            current = {"chapter": chapter, "local": hit[0], "lines": []}
            if hit[1]:
                current["lines"].append(hit[1])
            groups.append(current)
            expect = hit[0] + 1
            continue
        if current is not None and ln:
            current["lines"].append(ln)
    return groups


def _extract_questions(pdf_path: Path) -> List[Dict]:
    out: List[Dict] = []
    for gnum, g in enumerate(_scan_groups(pdf_path), start=1):
        text = " ".join(g["lines"]).strip()
        if len(text) < 25:
            continue
        # key-echo guard: a group that IS an answer-key row -- either a
        # short letter-led line or a body opening with option letters
        # followed by marking-scheme text -- is never a question
        first = g["lines"][0] if g["lines"] else ""
        if (len(g["lines"]) <= 2 and first
                and re.match(r"^[A-D][.)]?\s+\S", first)
                and "?" not in text and "(a)" not in text):
            continue
        if re.match(r"^\([a-d]\)", first) and "[0.5 mark" in text.lower():
            continue
        if text.lower().startswith(("answers", "answer key")):
            continue
        n_options = sum(1 for ln in g["lines"] if _OPTION.match(ln))
        q_type = "MCQ" if n_options >= 2 else (
            "CASE" if _CASE_RE.search(text) else "SHORT")
        out.append({"qno": gnum, "chapter": g["chapter"],
                    "local": g["local"], "text": text[:2000],
                    "q_type": q_type})
    return out


def _extract_answers(pdf_path: Path) -> List[Dict]:
    """Official keys, chapter-local.  Two renditions:
    same-line ('Q.1 C. text') and table ('Q.1' then 'C. text')."""
    pdf = fitz.open(str(pdf_path))
    full = "\n".join(pdf[i].get_text() for i in range(pdf.page_count))
    pdf.close()
    if "Answers" not in full:
        return []
    out: List[Dict] = []
    chapter = ""
    lines = [l.strip() for l in full.split("\n")]
    for i, ln in enumerate(lines):
        ch = _CHAPTER.match(ln)
        if ch:
            chapter = f"{ch.group(1)}. {ch.group(2).strip()}"
            continue
        m = re.match(
            r"^Q\s*\.?\s*(\d{1,2})\s*[.)]?\s*([A-D])\b[.\s:]*(.*)", ln)
        if not m:
            # table rendition: bare 'Q.N' with the letter on next line
            m2 = re.match(r"^Q\s*\.?\s*(\d{1,2})\s*[.)]?$", ln)
            if m2 and i + 1 < len(lines):
                m3 = re.match(r"^([A-D])\b[.\s:]*(.*)", lines[i + 1])
                if m3:
                    m = [None, m2.group(1), m3.group(1), m3.group(2)]
        if m:
            qno = int(m[1])
            if out and out[-1]["chapter"] == chapter \
                    and out[-1]["local"] == qno:
                continue
            out.append({"chapter": chapter, "local": qno,
                        "letter": m[2],
                        "answer_text": (m[3] or "").strip()[:250]})
    return out


def _answer_rows(pdf_path: Path, qs: List[Dict]) -> List[tuple]:
    """Join chapter-local keys to global qnos; keep only real matches."""
    by_key = {(q["chapter"], q["local"]): q["qno"] for q in qs}
    rows = []
    for a in _extract_answers(pdf_path):
        gno = by_key.get((a["chapter"], a["local"]))
        if gno is not None:
            rows.append((gno, a["letter"], a["answer_text"]))
    return rows


def mine() -> Dict:
    conn = sqlite3.connect(str(DB_PATH))
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS official_answers (
        doc_id INT, qno INT, letter TEXT, answer_text TEXT, marks INT,
        PRIMARY KEY (doc_id, qno));
    """)
    stats = {"docs": 0, "questions": 0, "answers": 0,
             "skipped": []}
    for pdf_path in sorted(SRC.glob("*.pdf")):
        meta = _meta_for(pdf_path.stem)
        if not meta:
            stats["skipped"].append(f"{pdf_path.name}: no subject/class")
            continue
        if _is_image_pdf(pdf_path):
            stats["skipped"].append(f"{pdf_path.name}: image pdf")
            continue
        try:
            qs = _extract_questions(pdf_path)
        except Exception as exc:
            stats["skipped"].append(f"{pdf_path.name}: {exc}")
            continue
        if len(qs) < 5:
            stats["skipped"].append(f"{pdf_path.name}: {len(qs)} questions")
            continue
        rows = _answer_rows(pdf_path, qs)

        dup = conn.execute("SELECT id FROM documents WHERE filename=?",
                           (pdf_path.name,)).fetchone()
        if dup:
            doc_id = dup[0]
        else:
            cur = conn.execute(
                "INSERT INTO documents(filename, path, doc_type, subject, "
                "class_label, session, n_questions) VALUES (?,?,?,?,?,?,?)",
                (pdf_path.name, str(pdf_path), meta["doc_type"],
                 meta["subject"], meta["class_label"], "2023-24", len(qs)))
            doc_id = cur.lastrowid
            for q in qs:
                conn.execute(
                    "INSERT INTO questions(doc_id, qno, section, q_type, "
                    "marks, is_competency, text) "
                    "VALUES (?,?,?,?,NULL,1,?)",
                    (doc_id, q["qno"], q["chapter"], q["q_type"],
                     q["text"]))
            stats["docs"] += 1
            stats["questions"] += len(qs)
        for gno, letter, text in rows:
            conn.execute(
                "INSERT OR REPLACE INTO official_answers(doc_id, qno, "
                "letter, answer_text, marks) VALUES (?,?,?,?,1)",
                (doc_id, gno, letter, text))
        stats["answers"] += len(rows)
        print(f"  {pdf_path.name:32s} {meta['subject']:14s} "
              f"{len(qs):4d} q {len(rows):4d} keys")
    conn.commit()
    conn.close()
    return stats


if __name__ == "__main__":
    import json

    print(json.dumps(mine(), indent=1))
