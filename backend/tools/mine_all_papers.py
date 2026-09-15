"""mine_all_papers.py -- exhaustive board-paper miner.

Mines EVERY SQP/QP/MS/practice-paper PDF across all CBSE and CISCE
source directories in one pass.  Extracts questions (with chapter/
section context where available), marking-scheme steps, and official
answer keys.  Writes directly to question_bank.db.

Handles these format families:
    SQP/QP     section headers, question numbers (Q.1 / 1. / bare seq),
               optional inline options (a)/(b)/(c)/(d)
    MS         marking scheme tables: 'Q.N C. answer text' or
               'Q.N' then 'C. text' on next line
    QB         question banks: chapter-grouped, sequential numbering

All sources feed the SAME pipeline: questions -> bank (is_competency
where detectable), marking steps -> official_answers, marking scheme
chains -> ms_compiler -> IR corpus.

Usage:
    python -m backend.tools.mine_all_papers            # full run
    python -m backend.tools.mine_all_papers --dry-run  # count only
"""

from __future__ import annotations

import json
import re
import sqlite3
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import fitz

DB_PATH = Path(r"D:\platform\cbse_data\question_bank.db")

# --------------------------------------------------------------------------- #
# Source directories: every CBSE/CISCE paper pool on D:
# --------------------------------------------------------------------------- #

SOURCES = [
    # (path, board, default_doc_type)
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\SamplePapers"), "CBSE", "SQP"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\fresh_SamplePapers"), "CBSE", "SQP"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\QuestionPapers"), "CBSE", "QP"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\MarkingSchemes"), "CBSE", "MS"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\kb_SamplePapers"), "CBSE", "SQP"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\kb_MarkingSchemes"), "CBSE", "MS"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\kb_PracticeQuestions"), "CBSE", "PQ"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\kb_PracticeQuestions_MS"), "CBSE", "MS"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\QuestionBanks"), "CBSE", "QB"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\kb_QuestionBanks"), "CBSE", "QB"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\fresh_PracticeQuestions"), "CBSE", "PQ"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\fresh_QuestionBanks"), "CBSE", "QB"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\PracticeQuestions"), "CBSE", "PQ"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\CompetencyFocused"), "CBSE", "CFQ"),
    (Path(r"D:\node_generator\ncert-mcp\data\raw\cbse_exam\kb_CompetencyFocused"), "CBSE", "CFQ"),
    (Path(r"D:\cbse-papers"), "CBSE", "QP"),
]

# CISCE item banks and PPA papers (scanned recursively)
CISCE_SOURCES = [
    (Path(r"D:\cisce\item_banks_isc"), "CISCE", "QB"),
    (Path(r"D:\cisce\item_banks_icse"), "CISCE", "QB"),
    (Path(r"D:\cisce\ppa_2024"), "CISCE", "PPA"),
    (Path(r"D:\cisce\ppa_icse"), "CISCE", "PPA"),
    (Path(r"D:\cisce\ppa_isc"), "CISCE", "PPA"),
    (Path(r"D:\cisce\ppa_downloads"), "CISCE", "PPA"),
]

# --------------------------------------------------------------------------- #
# Subject/class inference from filename
# --------------------------------------------------------------------------- #

# Order matters: specific patterns must precede generic substrings
# (e.g. 'biotech' before 'bio', 'applied math' before 'math',
# 'econom...' before the 'cs' fallback).
_SUBJECT = [
    (r"applied[\s_-]*math", "applied_maths"),
    (r"biotech", "biotechnology"),
    (r"math|matematc|amath|ganit", "maths"),
    (r"physics|bhotik", "physics"),
    (r"chem|rasayan", "chemistry"),
    (r"bio|jeev", "biology"),
    (r"engl", "english"),
    (r"hindi", "hindi"),
    (r"hist|itihas", "history"),
    (r"geo|bhugol", "geography"),
    (r"civics|nagrik", "civics"),
    (r"social|(?<![a-z])ss(?![a-z])", "social_science"),
    (r"econom", "economics"),
    (r"account|lekh", "accountancy"),
    (r"business|vyavsay|(?<![a-z])bst(?![a-z])", "business_studies"),
    (r"commerc", "commercial_studies"),
    (r"computer|python|(?<![a-z])cs(?![a-z])", "computer_science"),
    (r"informatics|(?<![a-z])ip(?![a-z])", "informatics_practices"),
    (r"psychology|manovigyan", "psychology"),
    (r"physical[\s_-]*edu|shareerik", "physical_education"),
    (r"legal|kanoon", "legal_studies"),
    (r"sociology|samaj", "sociology"),
    (r"home[\s_-]*science|grih", "home_science"),
    (r"entrepreneur|udhyamita", "entrepreneurship"),
    (r"evs|environment", "environmental_science"),
    (r"pol[\s_-]*sci|political", "political_science"),
    (r"painting|sculpture|applied[\s_-]*arts?|grap", "fine_arts"),
    (r"music|carnatic|ndustani|melodic|percussion", "music"),
    (r"kathak|odissi|bharatnatyam|kucpudi|manipuri|dance", "dance"),
    (r"(?<![a-z])ai(?![a-z])|artificial", "ai"),
    (r"sanskrit", "sanskrit"),
    (r"mass[\s_-]*media", "mass_media"),
    # generic fallback: must stay AFTER every '<x> science' pattern above
    (r"scice|science", "science"),
]

_CLASS = [
    # '9th'/'10th'/'12th' ordinal suffixes, class_9..12, roman _x/_xi/_xii
    (r"class\s*_?9|(?<![0-9a-z])9th(?![0-9])", "Class_9"),
    (r"class\s*_?10|(?<![0-9a-z])10th(?![0-9])|[_\-]x([_\-.]|$)"
     r"|classx(?![a-z])", "Class_X"),
    (r"xii|g12|[_\-]12(?![0-9])|(?<![0-9a-z])12th(?![0-9])", "Class_XII"),
    (r"xi\b|[_\-]xi\b|class\s*_?11|classxi(?![a-z])", "Class_11"),
    (r"class\s*_?12", "Class_XII"),
]


def _infer_meta(filename: str) -> Tuple[Optional[str], Optional[str], str]:
    low = filename.lower()
    subject = None
    for pat, subj in _SUBJECT:
        if re.search(pat, low):
            subject = subj
            break
    klass = None
    for pat, cls in _CLASS:
        if re.search(pat, low):
            klass = cls
            break
    return subject, klass, "CBSE"


def _cisce_class_fallback(path: Path) -> Optional[str]:
    """CISCE directory names encode the board level (ICSE=class X,
    ISC=class XII); use the path when the filename lacks a marker."""
    low = str(path).replace("\\", "/").lower()
    if "icse" in low:
        return "Class_X"
    # 'isc' only as a path token, so 'description' etc. cannot false-match
    if re.search(r"(?:^|[_/])isc(?:$|[_/])", low):
        return "Class_XII"
    return None


def _infer_session(filename: str) -> str:
    m = re.search(r"(20\d{2})[-_](\d{2})\b", filename)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    m = re.search(r"(20\d{2})", filename)
    if m:
        y = int(m.group(1))
        return f"{y - 1}-{str(y)[2:]}"
    return "2024-25"


def _open_pdf(pdf_path: Path) -> Optional["fitz.Document"]:
    try:
        return fitz.open(str(pdf_path))
    except Exception:
        return None


def _is_image_pdf(pdf_path: Path) -> bool:
    pdf = _open_pdf(pdf_path)
    if pdf is None:
        return False  # corrupt/locked: let the extract step record the error
    try:
        if pdf.page_count <= 0:
            return True
        sample = sorted(len(pdf[i].get_text().strip())
                        for i in range(min(15, pdf.page_count)))
    except Exception:
        return False
    finally:
        pdf.close()
    return (sample[len(sample) // 2] if sample else 0) < 300


# --------------------------------------------------------------------------- #
# Question extraction: unified parser for SQP/QP/MS/QB formats
# --------------------------------------------------------------------------- #

_QMARK = re.compile(r"^Q\s*\.?\s*(\d{1,2})\s*[.)]?\s*(.*)$")
_BARE_Q = re.compile(r"^(\d{1,2})[.)]\s*(.*)$")
_CHAPTER = re.compile(r"^(\d{1,2})\.\s+(.{4,60})$")
_OPTION = re.compile(r"^(?:\([a-dA-D]\)|[A-Da-d][.)])\s*")
# anchor for the table-layout fallback: an 'A.'/'(A)' option line
_OPT_LETTER = re.compile(r"^(?:\()?([A-Fa-f])[\).]\s*(.*)$")

# Header/footer furniture.  EVERY branch is anchored so that lines which
# merely mention these words (e.g. a case study referring to "the set of
# natural numbers") are never stripped.
_FURNITURE = re.compile(
    r"^(?:"
    r"marking\s+scheme\b.*"                       # MS page header
    r"|page\s*\d+\s*(?:of\s*\d+)?\s*$"            # page footer
    r"|\d{1,4}\s*$"                               # bare page number
    r"|p\.?\s*t\.?\s*o\.?\s*$"                    # P.T.O.
    r"|www\.\S+.*|https?://\S+.*"                 # URLs
    r"|cbse[\s.:,\-].*"                           # CBSE header lines
    r"|central\s+board\s+of.*"
    r"|board\s+exam\b.*|sample\s+paper\b.*"
    r"|class\s*:?\s*[xvi0-9]+\s*$"
    r"|time\s*[:\-].*"                            # Time: 3 hours
    r"|max(?:imum)?\.?\s*(?:marks|mks)\b.*"
    r"|general\s+instructions\b.*|roll\s+no\b.*"
    r"|set\s*[-:\s]*[a-d]?\s*$"                   # 'Set A', not 'set of ...'
    r"|for\s+visual\s+impaired\b.*"               # SQP variant marker
    r"|[-=_*.]{3,}.*$"                            # dashed separator rows
    r"|question\s*$|q\.?\s*$|no\.?\s*$|marks?\s*$|s\s*$"  # MS table headers
    r")\s*$",
    re.I)

_ANS_HEADER = re.compile(
    r"^(?:answers?\s*key|answers?|marking\s+scheme|key)\s*[.:]?\s*$", re.I)


def _parse_option_anchored(q_lines: List[str]) -> List[Dict]:
    """Fallback for table-layout papers (CBSE 2024+ SQP/MS): question
    numbers live in table cells that do not survive text extraction,
    so questions are delimited by their 'A.'/'(A)' option blocks.

    A block is committed when its option run ends after 2-4 letters;
    a run that keeps extending (a general-instructions lettered list
    like '(a)...(h)') is discarded.  Non-option lines at the end of a
    block are handed to the next block as its question stem."""
    groups: List[Dict] = []
    section = ""
    pending: List[str] = []
    opts: Optional[Dict] = None  # {'body': [...], 'lines': [...]}

    def _n_letters(block: Dict) -> int:
        return sum(1 for x in block["lines"] if _OPT_LETTER.match(x))

    def _commit(block: Dict) -> None:
        if 2 <= _n_letters(block) <= 4:
            body = block["body"]
            if len(body) > 8:  # leading instruction spill: keep the stem
                body = body[-6:]
            groups.append({"section": section, "local": len(groups) + 1,
                           "lines": body + block["lines"]})

    def _close() -> None:
        nonlocal opts, pending
        if opts is None:
            return
        # trailing non-option lines belong to the NEXT question
        tail: List[str] = []
        while opts["lines"] and not _OPT_LETTER.match(opts["lines"][-1]):
            tail.insert(0, opts["lines"].pop())
        _commit(opts)
        opts = None
        pending = tail

    for ln in q_lines:
        if _CHAPTER.match(ln) and not ln.rstrip().endswith("?"):
            _close()
            section = ln.strip()
            pending = []
            continue
        m = _OPT_LETTER.match(ln)
        if m:
            letter = ord(m.group(1).lower()) - ord("a")
            if opts is None:
                if letter == 0:
                    opts = {"body": pending, "lines": [ln]}
                    pending = []
                else:
                    pending.append(ln)  # stray letter line: prose
                continue
            if letter == _n_letters(opts):
                opts["lines"].append(ln)  # consecutive option
            elif letter > _n_letters(opts):
                # run keeps extending (e.g. instruction list a..h): drop it
                opts = None
                pending = []
            else:
                _close()                  # run ended at a valid MCQ
                if letter == 0:
                    opts = {"body": pending, "lines": [ln]}
                    pending = []
                else:
                    pending.append(ln)
            continue
        if opts is not None:
            opts["lines"].append(ln)      # wrapped option continuation
        else:
            pending.append(ln)
    _close()
    return groups


def _build_questions(groups: List[Dict]) -> List[Dict]:
    """Turn question groups into question records."""
    questions: List[Dict] = []
    key_echo = re.compile(r"^[A-Da-d][.)]\s*\S")
    for gnum, g in enumerate(groups, start=1):
        text = " ".join(g["lines"]).strip()
        if len(text) < 20:
            continue
        # key-echo guard: short option-letter-led lines are key rows
        if (len(g["lines"]) <= 2 and g["lines"]
                and key_echo.match(g["lines"][0])
                and "?" not in text):
            continue
        if text.lower().startswith(("answer", "marking", "section")):
            continue
        n_opts = sum(1 for ln in g["lines"] if _OPTION.match(ln.strip()))
        q_type = ("MCQ" if n_opts >= 2
                  else "CASE" if re.search(r"case\s*study|passage", text,
                                           re.I)
                  else "SHORT")
        questions.append({
            "qno": gnum, "chapter": g.get("section", ""),
            "local": g["local"], "text": text[:2000],
            "q_type": q_type,
        })
    return questions


def _extract_questions_and_keys(pdf_path: Path
                                ) -> Tuple[List[Dict], List[Dict]]:
    """Extract question groups (+ official answer keys where the same
    PDF carries them) from one PDF.

    Two-pass: pass 1 scans all pages for question markers and section
    headers; pass 2 (when the pdf contains 'answer'/'key' sections)
    extracts Q.N + letter + answer-text blocks (see _extract_answers).
    """
    pdf = _open_pdf(pdf_path)
    if pdf is None:
        return [], []
    lines: List[str] = []
    try:
        for pno in range(pdf.page_count):
            page = [ln.strip() for ln in pdf[pno].get_text().split("\n")]
            page = [ln for ln in page if ln and not _FURNITURE.match(ln)]
            lines.extend(page)
    finally:
        pdf.close()

    # -- split into answer section vs question section --
    # Only a short standalone header line ("ANSWER KEY", "Answers.",
    # "Marking Scheme") starts the answer section; a question that merely
    # ends with the word 'answer' must NOT truncate the question set.
    ans_start = len(lines)
    for i, ln in enumerate(lines):
        if len(ln) <= 40 and _ANS_HEADER.match(ln):
            ans_start = i
            break

    q_lines = lines[:ans_start]
    a_lines = lines[ans_start:]

    # -- pass 1: question groups --
    groups: List[Dict] = []
    current: Optional[Dict] = None
    section = ""
    expect = 1
    has_qmarks = any(_QMARK.match(ln) for ln in q_lines)

    for ln in q_lines:
        if _CHAPTER.match(ln) and not ln.rstrip().endswith("?"):
            section = ln.strip()
            continue
        hit = None
        if has_qmarks:
            m = _QMARK.match(ln)
            if m:
                hit = (int(m.group(1)), m.group(2))
        else:
            m = _BARE_Q.match(ln)
            if m:
                qnum = int(m.group(1))
                # sequential, small skip window, or restart at 1
                if (qnum == expect or expect <= qnum <= expect + 2
                        or (qnum == 1 and expect > 2)):
                    hit = (qnum, m.group(2))
        if hit is not None:
            current = {"section": section, "local": hit[0], "lines": []}
            if hit[1]:
                current["lines"].append(hit[1])
            groups.append(current)
            expect = hit[0] + 1
            continue
        if current is not None and ln:
            current["lines"].append(ln)

    # -- build question list (fallback: table-layout option anchors) --
    questions = _build_questions(groups)
    if len(questions) < 3:
        fb = _build_questions(_parse_option_anchored(q_lines))
        if len(fb) > len(questions):
            questions = fb
    return questions, []


def _extract_answers(pdf_path: Path, questions: List[Dict]
                     ) -> List[Tuple[int, str, str]]:
    """Extract answer keys from the same PDF (marking schemes often
    embed the key at the end).  Keys are matched against the PRINTED
    question number ('local') and mapped back to the stored qno."""
    pdf = _open_pdf(pdf_path)
    if pdf is None:
        return []
    try:
        full = "\n".join(pdf[i].get_text() for i in range(pdf.page_count))
    except Exception:
        return []
    finally:
        pdf.close()

    local_map: Dict[int, int] = {}
    for q in questions:
        local_map.setdefault(q["local"], q["qno"])
        local_map.setdefault(q["qno"], q["qno"])
    out: List[Tuple[int, str, str]] = []
    seen = set()

    def _clean(t: str) -> str:
        return re.sub(r"\s+", " ", t).strip()

    # pattern 1: 'Q.1 C. answer text'
    for m in re.finditer(
            r"Q\s*\.?\s*(\d{1,2})\s*[.)]?\s*([A-Da-d])\b[.\s:]*(.{3,200}?)"
            r"(?=Q\s*\.?\s*\d|[A-Z][a-z]{4,}|$)", full):
        qno, letter, atext = int(m.group(1)), m.group(2), m.group(3).strip()
        stored = local_map.get(qno)
        if stored is not None and (stored, letter.upper()) not in seen:
            out.append((stored, letter.upper(), _clean(atext)[:200]))
            seen.add((stored, letter.upper()))

    # pattern 2: bare 'Q.N' then 'C. text' on same/next line
    lines = [l.strip() for l in full.split("\n")]
    for i, ln in enumerate(lines):
        m2 = re.match(r"^Q\s*\.?\s*(\d{1,2})\s*[.)]?$", ln)
        if m2 and i + 1 < len(lines):
            m3 = re.match(r"^([A-Da-d])\b[.\s:]*(.{3,200})", lines[i + 1])
            if m3:
                qno, letter = int(m2.group(1)), m3.group(1).upper()
                stored = local_map.get(qno)
                if stored is not None and (stored, letter) not in seen:
                    out.append((stored, letter, _clean(m3.group(2))[:200]))
                    seen.add((stored, letter))
    return out


# --------------------------------------------------------------------------- #
# Main miner
# --------------------------------------------------------------------------- #


def main() -> None:
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true",
                    help="count questions without writing to the bank")
    ap.add_argument("--limit", type=int, default=0,
                    help="limit total number of PDFs processed")
    args = ap.parse_args()

    conn = sqlite3.connect(str(DB_PATH))
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY, filename TEXT, path TEXT,
            doc_type TEXT, subject TEXT, class_label TEXT,
            session TEXT, n_questions INT);
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY, doc_id INT, qno INT, section TEXT,
            q_type TEXT, marks INT, is_competency INT, text TEXT);
        CREATE TABLE IF NOT EXISTS official_answers (
            doc_id INT, qno INT, letter TEXT, answer_text TEXT,
            marks INT, PRIMARY KEY (doc_id, qno));
    """)

    stats = {"pdfs_scanned": 0, "pdfs_mined": 0, "pdfs_skipped_image": 0,
             "pdfs_skipped_existing": 0, "pdfs_skipped_no_subject": 0,
             "pdfs_skipped_few_questions": 0, "pdfs_failed": 0,
             "questions": 0, "answer_keys": 0, "errors": []}

    all_sources = []
    seen_paths = set()
    for source_dir, board, doc_type in SOURCES + CISCE_SOURCES:
        if not source_dir.exists():
            continue
        for f in sorted(source_dir.rglob("*.pdf")):
            key = str(f).lower()
            if key in seen_paths:
                continue
            seen_paths.add(key)
            all_sources.append((f, board, doc_type))
    if args.limit:
        all_sources = all_sources[:args.limit]

    print(f"total PDFs across all sources: {len(all_sources)}", flush=True)

    mined = 0
    for pdf_path, board, doc_type in all_sources:
        stats["pdfs_scanned"] += 1
        fname = pdf_path.name

        dup = conn.execute("SELECT id FROM documents WHERE filename=?",
                           (fname,)).fetchone()
        if dup:
            stats["pdfs_skipped_existing"] += 1
            continue

        if _is_image_pdf(pdf_path):
            stats["pdfs_skipped_image"] += 1
            continue

        subject, klass, _ = _infer_meta(fname)
        if klass is None and board == "CISCE":
            klass = _cisce_class_fallback(pdf_path)
        if not subject:
            stats["pdfs_skipped_no_subject"] += 1
            continue

        try:
            questions, _ = _extract_questions_and_keys(pdf_path)
        except Exception as exc:
            stats["errors"].append(f"{fname}: {exc}")
            stats["pdfs_failed"] += 1
            continue
        if len(questions) < 3:
            stats["pdfs_skipped_few_questions"] += 1
            continue

        try:
            keys = _extract_answers(pdf_path, questions)
        except Exception as exc:
            stats["errors"].append(f"{fname} (answers): {exc}")
            keys = []

        session = _infer_session(fname)
        if not args.dry_run:
            cur = conn.execute(
                "INSERT INTO documents(filename, path, doc_type, subject, "
                "class_label, session, n_questions) VALUES (?,?,?,?,?,?,?)",
                (fname, str(pdf_path), doc_type, subject or "other",
                 klass or "unknown", session, len(questions)))
            doc_id = cur.lastrowid
            for q in questions:
                conn.execute(
                    "INSERT INTO questions(doc_id, qno, section, q_type, "
                    "marks, is_competency, text) VALUES (?,?,?,?,NULL,0,?)",
                    (doc_id, q["qno"], q["chapter"], q["q_type"], q["text"]))
            for qno, letter, atext in keys:
                conn.execute(
                    "INSERT OR REPLACE INTO official_answers(doc_id, qno, "
                    "letter, answer_text, marks) VALUES (?,?,?,?,1)",
                    (doc_id, qno, letter, atext))
            conn.commit()
        mined += 1
        stats["questions"] += len(questions)
        stats["answer_keys"] += len(keys)
        stats["pdfs_mined"] += 1
        if mined % 50 == 0:
            print(f"  ... {mined} docs mined, "
                  f"{stats['questions']} questions", flush=True)

    if not args.dry_run:
        conn.commit()
    conn.close()

    print(json.dumps({k: v for k, v in stats.items() if k != "errors"},
                     indent=1))
    if stats["errors"]:
        print("errors:", stats["errors"][:10])


if __name__ == "__main__":
    main()
