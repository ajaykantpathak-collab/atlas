"""build_exam_papers.py — assemble CLEAN exam papers from question_bank.db.

The raw pipeline parses every line of a paper as a "question" — instructions
become Q1-8, marks are NULL, and MS docs carry table-cell noise as fake qnos.
This tool is the post-processor that produces board-truth papers:

    questions (SQP/QP/PQ)  --strip instructions--> paper qnos 1..N
    marking_steps (MS)     --drop noise rows------> steps keyed by paper qno
    instructions           --parse----------------> section map (qno range -> marks)

Output: runtime_data/exam_papers/<board>_<class>_<subject>_<session>_<variant>.json

Pure data work — never touches solver internals.
"""

from __future__ import annotations

import json
import re
import sqlite3
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

DB_PATH = Path(r"D:\platform\runtime_data\question_bank.db")
OUT_DIR = Path(r"D:\platform\runtime_data\exam_papers")

# Instruction lines captured as fake questions at the head of every SQP.
_INSTRUCTION_RES = [
    re.compile(p, re.I)
    for p in [
        r"^this question paper contains",
        r"^this question paper is divided",
        r"^this (question )?paper (consists|has)",
        r"^in section [a-e]\b",
        r"^there is no overall choice",
        r"^all questions are compulsory",
        r"^general instructions",
        r"^draw neat figures",
        r"^use of (a )?calculator",
        r"^section\s*[-–—]\s*[a-e]\s*$",
        r"^marks are indicated",
        r"^internal choice",
        r"^question numbers \d+",
        r"^time allowed",
        r"^maximum marks",
        r"^please check",
        r"^write down",
        r"^the question paper",
        r"^attempt all",
    ]
]

# MS noise: page furniture and table cells misparsed as question numbers.
# NOTE: bare 'OR' and '(A)'/'(B)' rows are KEPT — they are the branch
# delimiters the marker needs for internal-choice (OR) questions.
_MS_NOISE_RE = re.compile(r"^(page \d+ of \d+|\d+\s*$)", re.I)

# Section range parser: "Question numbers 21-25 are very short answer (VSA)
# type questions, carrying 02 marks each" — kind may carry parentheticals.
_SECTION_RE = re.compile(
    r"question numbers?\s+(\d+)\s*[-–]\s*(\d+)\s+are\s+([^,;]+?questions?)[^,;]*?(\d+)\s*marks?",
    re.I,
)
# Assertion-Reason tail: "questions no. 19 and 20 are Assertion-Reason based
# questions of 1 mark each" (no dash range, marks stated as 'of N mark').
_AR_RE = re.compile(
    r"questions?\s+no\.?\s*(\d+)\s+and\s+(\d+)\s+are\s+assertion[^.]*?of\s+(\d+)\s+marks?",
    re.I,
)
# Bare "carrying N marks" on the same line, when the typed-clause parse fails.
_CARRY_RE = re.compile(r"carryi?n?g\s+0?(\d+)\s+marks?", re.I)


def _is_instruction(text: str) -> bool:
    t = text.strip()
    return any(r.search(t) for r in _INSTRUCTION_RES)


def _pair_ms(con: sqlite3.Connection, doc: sqlite3.Row) -> Optional[int]:
    """Find the MS doc for a paper: same subject/class, Standard/Basic variant match."""
    fname = doc["filename"].lower()
    variant = "basic" if "basic" in fname else ("standard" if "standard" in fname else None)
    session = doc["session"] or ""

    cands = con.execute(
        """SELECT id, filename, session FROM documents
           WHERE subject=? AND class_label=? AND doc_type='MS'""",
        (doc["subject"], doc["class_label"]),
    ).fetchall()

    # Filename year tokens are authoritative — the session column labels the
    # academic year (SQP '2024-25' pairs to MS '2025-26'), so never score it.
    paper_yrs = set(re.findall(r"20\d\d", fname))
    best = None
    best_score = -1
    for cid, cfname, csess in cands:
        cfl = cfname.lower()
        ms_yrs = set(re.findall(r"20\d\d", cfl))
        overlap = len(paper_yrs & ms_yrs)
        score = 0
        if variant and variant in cfl:
            score += 10
        score += overlap * 5
        if variant and variant not in cfl:
            score -= 8  # wrong tier (basic vs standard) — deprioritize
        if score > best_score and score >= 8:
            best_score = score
            best = cid
    return best


def _section_map(instructions: List[str]) -> List[Dict[str, Any]]:
    """Extract [{qlo,qhi,kind,marks}] from instruction text (per-line)."""
    secs = []
    for line in instructions:
        m = _SECTION_RE.search(line)
        if m:
            secs.append(
                {
                    "qlo": int(m.group(1)),
                    "qhi": int(m.group(2)),
                    "kind": m.group(3).strip(),
                    "marks": int(m.group(4)),
                }
            )
        else:
            # range present but marks clause mangled — try bare "carrying N"
            rng = re.search(r"question numbers?\s+(\d+)\s*[-–]\s*(\d+)", line, re.I)
            if rng:
                cm = _CARRY_RE.search(line)
                if cm:
                    secs.append(
                        {
                            "qlo": int(rng.group(1)),
                            "qhi": int(rng.group(2)),
                            "kind": "questions",
                            "marks": int(cm.group(1)),
                        }
                    )
        # assertion-reason "19 and 20" tail rides on the Section A line
        for am in _AR_RE.finditer(line):
            secs.append(
                {
                    "qlo": int(am.group(1)),
                    "qhi": int(am.group(2)),
                    "kind": "assertion-reason",
                    "marks": int(am.group(3)),
                }
            )
    return secs


def _marks_for(qno: int, sections: List[Dict[str, Any]]) -> Optional[int]:
    for s in sections:
        if s["qlo"] <= qno <= s["qhi"]:
            return s["marks"]
    return None


def build_paper(con: sqlite3.Connection, doc_id: int) -> Optional[Dict[str, Any]]:
    doc = con.execute("SELECT * FROM documents WHERE id=?", (doc_id,)).fetchone()
    if not doc:
        return None
    doc = dict(zip([c[1] for c in con.execute("PRAGMA table_info(documents)")], doc)) if not isinstance(doc, sqlite3.Row) else dict(doc)

    raw = con.execute(
        "SELECT qno, q_type, marks, is_competency, text FROM questions WHERE doc_id=? ORDER BY id",
        (doc_id,),
    ).fetchall()
    if not raw:
        return None

    # split head instructions from real questions (instructions are always a prefix block)
    instructions: List[str] = []
    i = 0
    while i < len(raw) and _is_instruction(raw[i][4] or ""):
        instructions.append(raw[i][4])
        i += 1
    real = raw[i:]
    if not real:
        return None

    sections = _section_map(instructions)
    max_q = len(real)

    # attach marking steps from paired MS doc
    ms_id = _pair_ms(con, doc)
    steps_by_q: Dict[int, List[str]] = {}
    if ms_id:
        for qno, _step_no, text in con.execute(
            "SELECT qno, step_no, text FROM marking_steps WHERE doc_id=? ORDER BY CAST(qno AS INT), step_no",
            (ms_id,),
        ).fetchall():
            try:
                q = int(qno)
            except (TypeError, ValueError):
                continue
            if q < 1 or q > max_q:
                continue  # MS noise: table cells / page furniture
            t = (text or "").strip()
            if not t or _MS_NOISE_RE.match(t):
                continue
            steps_by_q.setdefault(q, []).append(t)

    questions = []
    for new_qno, (_old_qno, q_type, _marks, comp, text) in enumerate(real, 1):
        questions.append(
            {
                "qno": new_qno,
                "q_type": q_type,
                "marks": _marks_for(new_qno, sections),
                "is_competency": bool(comp),
                "text": text,
                "marking_steps": steps_by_q.get(new_qno, []),
            }
        )

    return {
        "doc_id": doc_id,
        "ms_doc_id": ms_id,
        "board": "CBSE",
        "subject": doc["subject"],
        "class_label": doc["class_label"],
        "session": doc["session"],
        "source_file": doc["filename"],
        "sections": sections,
        "n_questions": len(questions),
        "total_marks": sum(q["marks"] or 0 for q in questions),
        "n_with_ms": len(questions) and sum(1 for q in questions if q["marking_steps"]),
        "questions": questions,
    }


def main(subject: str = "maths", class_label: str = "Class_X") -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(DB_PATH)
    con.row_factory = sqlite3.Row
    docs = con.execute(
        """SELECT id, filename, session, doc_type FROM documents
           WHERE subject=? AND class_label=? AND doc_type IN ('SQP','QP','PQ')
           ORDER BY session, filename""",
        (subject, class_label),
    ).fetchall()

    written = 0
    for d in docs:
        paper = build_paper(con, d["id"])
        if not paper or paper["n_questions"] < 10:
            continue  # partial parses (instr-only docs)
        safe = re.sub(r"[^\w-]+", "_", Path(d["filename"]).stem)[:80]
        out = OUT_DIR / f"cbse_{safe}.json"
        out.write_text(json.dumps(paper, ensure_ascii=False, indent=1), encoding="utf-8")
        written += 1
        print(
            f"{safe}: {paper['n_questions']}q {paper['total_marks']}m "
            f"ms={paper['n_with_ms']}/{paper['n_questions']} secs={len(paper['sections'])}"
        )
    print(f"\nwrote {written} papers -> {OUT_DIR}")


if __name__ == "__main__":
    main()
