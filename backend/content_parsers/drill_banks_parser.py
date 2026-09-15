"""Drill banks parser — parses drill bank .marker files.

Source directory per subject: drill_banks/

Formats detected (4 total):

  A_qa_marker    — Q1. question / (a)(b)(c)(d) / ANSWER: (physics, maths, chem)
  B_qa_inline    — Q1: question A: answer (bio, evs — inline Q&A)
  C_acc_drill    — DRILL N / TOPIC: / SKILL_TARGETED: / INSTRUCTIONS: / ITEMS: / ANSWERS:
                   (acc, bs, comm — structured drill with items and answers)
  D_txt_pdf      — --- PAGE N --- (CISCE-published PDFs, review queue)

Output: list of dicts with normalized keys:
    question_number, question_text, answer, marks, options (list or None),
    drill_id, topic, skill_targeted, instructions, target_nodes (list),
    source_file, source_format, parser_id, parser_version
"""

import re
from pathlib import Path
from typing import Optional

PARSER_ID = "drill_banks_v1"
PARSER_VERSION = "1.0.0"
CONTENT_TYPE = "drill_banks"


# ---------------------------------------------------------------------------
# Format detection
# ---------------------------------------------------------------------------

def _detect_format(lines: list[str]) -> str:
    """Detect which drill bank format a file uses."""
    sample = "\n".join(lines[:300])

    # Format D: --- PAGE N --- (CISCE PDFs)
    if re.search(r"^---\s+PAGE\s+\d+\s+---", sample, re.MULTILINE):
        return "D_txt_pdf"

    # Format C: acc drill — DRILL N / TOPIC: / ITEMS: / ANSWERS:
    if re.search(r"^DRILL\s+\d+", sample, re.MULTILINE) and "ITEMS:" in sample and "ANSWERS:" in sample:
        return "C_acc_drill"

    # Format A: Q1. question / (a)(b)(c)(d) / ANSWER:
    if re.search(r"^\s*Q\d+\.\s+.+", sample, re.MULTILINE) and re.search(r"^\s*ANSWER:", sample, re.MULTILINE):
        return "A_qa_marker"

    # Format B: Q1: question A: answer (inline)
    if re.search(r"^\s*Q\d+:\s+.+\s+A:\s+", sample, re.MULTILINE):
        return "B_qa_inline"

    # Format E: appmath — 1: question? A: answer (numbered without Q prefix)
    if re.search(r"^\s*\d+:\s+.+\?\s+A:\s+", sample, re.MULTILINE):
        return "E_appmath_drill"

    # Format F: evs — Q1. question / A1. answer (separate lines)
    if re.search(r"^\s*Q\d+\.\s+.+", sample, re.MULTILINE) and re.search(r"^\s*A\d+\.\s+", sample, re.MULTILINE):
        return "F_evs_drill"

    return "unknown"


# ---------------------------------------------------------------------------
# Format A: Q1. question / (a)(b)(c)(d) / ANSWER:
# ---------------------------------------------------------------------------

_Q_PATTERN_A = re.compile(r"^\s*Q(\d+)\.\s+(.+)$")

def _parse_format_a(lines: list[str], file_path: str) -> list[dict]:
    """Parse Q1. question / (a)(b)(c)(d) / ANSWER: format."""
    records = []
    i = 0
    current_section = None

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Track sections
        sec_m = re.match(r"^={3,}\s*(SECTION\s+\d+).*={3,}$", stripped)
        if sec_m:
            current_section = sec_m.group(1)
            i += 1
            continue

        q_m = _Q_PATTERN_A.match(line)
        if q_m:
            q_num = int(q_m.group(1))
            q_text = q_m.group(2).strip()
            i += 1

            # Collect options and answer
            options = []
            answer = None
            while i < len(lines):
                cont = lines[i].strip()

                if _Q_PATTERN_A.match(lines[i]) or cont.startswith("===="):
                    break

                # Options: (a) opt (b) opt (c) opt (d) opt (inline)
                inline_opts = re.match(r"^\(a\)\s+(.+?)\s*\(b\)\s+(.+?)\s*\(c\)\s+(.+?)\s*\(d\)\s+(.+)$", cont)
                if inline_opts:
                    options = [
                        f"(a) {inline_opts.group(1).strip()}",
                        f"(b) {inline_opts.group(2).strip()}",
                        f"(c) {inline_opts.group(3).strip()}",
                        f"(d) {inline_opts.group(4).strip()}",
                    ]
                    i += 1
                    continue

                if cont.startswith("ANSWER:"):
                    answer = cont[7:].strip()
                    i += 1
                    continue

                # Multi-line question text
                if cont and not cont.startswith("ANSWER") and not cont.startswith("("):
                    q_text += " " + cont

                i += 1

            records.append({
                "question_number": q_num,
                "question_text": q_text,
                "answer": answer,
                "marks": 1,  # MCQs are 1 mark
                "options": options if options else None,
                "drill_id": current_section,
                "topic": None,
                "skill_targeted": None,
                "instructions": None,
                "target_nodes": [],
                "source_file": file_path,
                "source_format": "A_qa_marker",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Format B: Q1: question A: answer (inline)
# ---------------------------------------------------------------------------

_Q_PATTERN_B = re.compile(r"^\s*Q(\d+):\s+(.+?)\s+A:\s*(.+)$")

def _parse_format_b(lines: list[str], file_path: str) -> list[dict]:
    """Parse Q1: question A: answer inline format."""
    records = []
    current_drill = None

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Track drill headers
        drill_m = re.match(r"^={3,}\s*DRILL\s+(\d+):.*={3,}$", stripped)
        if drill_m:
            current_drill = f"drill_{drill_m.group(1)}"
            continue

        m = _Q_PATTERN_B.match(line)
        if m:
            q_num = int(m.group(1))
            q_text = m.group(2).strip()
            answer = m.group(3).strip()

            records.append({
                "question_number": q_num,
                "question_text": q_text,
                "answer": answer,
                "marks": None,
                "options": None,
                "drill_id": current_drill,
                "topic": None,
                "skill_targeted": None,
                "instructions": None,
                "target_nodes": [],
                "source_file": file_path,
                "source_format": "B_qa_inline",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })

    return records


# ---------------------------------------------------------------------------
# Format C: DRILL N / TOPIC: / SKILL_TARGETED: / INSTRUCTIONS: / ITEMS: / ANSWERS:
# ---------------------------------------------------------------------------

_DRILL_HEADER_C = re.compile(r"^DRILL\s+(\d+)\s*$")

def _parse_format_c(lines: list[str], file_path: str) -> list[dict]:
    """Parse acc-style drill format with ITEMS and ANSWERS."""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        m = _DRILL_HEADER_C.match(line)
        if not m:
            i += 1
            continue

        drill_num = int(m.group(1))
        drill_id = f"drill_{drill_num}"
        i += 1

        topic = None
        skill_targeted = None
        instructions = None
        items = []
        answers = []
        current_section = None

        while i < len(lines):
            cont = lines[i].strip()

            if _DRILL_HEADER_C.match(cont):
                break

            if cont.startswith("TOPIC:"):
                topic = cont[6:].strip()
                current_section = "topic"
                i += 1
                continue

            if cont.startswith("SKILL_TARGETED:"):
                skill_targeted = cont[15:].strip()
                current_section = "skill"
                i += 1
                continue

            if cont.startswith("INSTRUCTIONS:"):
                instructions = cont[13:].strip()
                current_section = "instructions"
                i += 1
                continue

            if cont.startswith("ITEMS:"):
                current_section = "items"
                i += 1
                continue

            if cont.startswith("ANSWERS:"):
                current_section = "answers"
                i += 1
                continue

            # Collect items and answers (numbered lines)
            if current_section == "items" and cont:
                items.append(cont)
            elif current_section == "answers" and cont:
                answers.append(cont)

            i += 1

        # Extract target nodes from topic
        target_nodes = []
        if topic:
            for nm in re.finditer(r"c\d+_\w+", topic):
                target_nodes.append(nm.group(0))

        # Pair items with answers
        for idx, item in enumerate(items):
            # Extract item number and text
            item_m = re.match(r"^(\d+)\.\s+(.+)$", item)
            if item_m:
                item_num = int(item_m.group(1))
                item_text = item_m.group(2).strip()
            else:
                item_num = idx + 1
                item_text = item

            # Find matching answer
            answer = None
            for ans in answers:
                ans_m = re.match(r"^(\d+)\.\s+(.+)$", ans)
                if ans_m and int(ans_m.group(1)) == item_num:
                    answer = ans_m.group(2).strip()
                    break

            records.append({
                "question_number": item_num,
                "question_text": item_text,
                "answer": answer,
                "marks": None,
                "options": None,
                "drill_id": drill_id,
                "topic": topic,
                "skill_targeted": skill_targeted,
                "instructions": instructions,
                "target_nodes": target_nodes,
                "source_file": file_path,
                "source_format": "C_acc_drill",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })

    return records


# ---------------------------------------------------------------------------
# Format E: AppMath — 1: question? A: answer (numbered without Q prefix)
# ---------------------------------------------------------------------------

_Q_PATTERN_E = re.compile(r"^\s*(\d+):\s+(.+?)\s+A:\s*(.+)$")

def _parse_format_e(lines: list[str], file_path: str) -> list[dict]:
    """Parse appmath drill format: 1: question? A: answer"""
    records = []
    current_section = None

    for line in lines:
        stripped = line.strip()

        # Track sections (=== SECTION ===)
        sec_m = re.match(r"^===\s*(.+?)\s*===?$", stripped)
        if sec_m and not _Q_PATTERN_E.match(stripped):
            current_section = sec_m.group(1).strip()
            continue

        m = _Q_PATTERN_E.match(line)
        if m:
            q_num = int(m.group(1))
            q_text = m.group(2).strip()
            answer = m.group(3).strip()

            records.append({
                "question_number": q_num,
                "question_text": q_text,
                "answer": answer,
                "marks": None,
                "options": None,
                "drill_id": current_section,
                "topic": current_section,
                "skill_targeted": None,
                "instructions": None,
                "target_nodes": [],
                "source_file": file_path,
                "source_format": "E_appmath_drill",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })

    return records


# ---------------------------------------------------------------------------
# Format F: EVS — Q1. question / A1. answer (separate lines)
# ---------------------------------------------------------------------------

_Q_PATTERN_F = re.compile(r"^\s*Q(\d+)\.\s+(.+)$")
_A_PATTERN_F = re.compile(r"^\s*A(\d+)\.\s+(.+)$")

def _parse_format_f(lines: list[str], file_path: str) -> list[dict]:
    """Parse evs drill format: Q1. question / A1. answer (separate lines)."""
    records = []
    i = 0
    current_drill = None
    current_node = None

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Track drill headers
        drill_m = re.match(r"^={3,}\s*DRILL\s+(\d+):.*={3,}$", stripped)
        if drill_m:
            current_drill = f"drill_{drill_m.group(1)}"
            i += 1
            continue

        # Track node
        if stripped.startswith("Node:"):
            node_m = re.search(r"(c\d+_\w+)", stripped)
            if node_m:
                current_node = node_m.group(1)
            i += 1
            continue

        q_m = _Q_PATTERN_F.match(line)
        if q_m:
            q_num = int(q_m.group(1))
            q_text = q_m.group(2).strip()
            i += 1

            # Collect multi-line question and find answer
            answer = None
            while i < len(lines):
                cont = lines[i].strip()

                a_m = _A_PATTERN_F.match(lines[i])
                if a_m and int(a_m.group(1)) == q_num:
                    answer = a_m.group(2).strip()
                    i += 1
                    # Collect multi-line answer
                    while i < len(lines):
                        cont2 = lines[i].strip()
                        if _Q_PATTERN_F.match(lines[i]) or _A_PATTERN_F.match(lines[i]) or cont2.startswith("====") or cont2.startswith("Drill Set"):
                            break
                        if cont2:
                            answer += " " + cont2
                        i += 1
                    break

                if _Q_PATTERN_F.match(lines[i]) or cont.startswith("====") or cont.startswith("Drill Set"):
                    break

                if cont:
                    q_text += " " + cont

                i += 1

            records.append({
                "question_number": q_num,
                "question_text": q_text,
                "answer": answer,
                "marks": None,
                "options": None,
                "drill_id": current_drill,
                "topic": None,
                "skill_targeted": None,
                "instructions": None,
                "target_nodes": [current_node] if current_node else [],
                "source_file": file_path,
                "source_format": "F_evs_drill",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Main parser
# ---------------------------------------------------------------------------

_FORMAT_DISPATCH = {
    "A_qa_marker": _parse_format_a,
    "B_qa_inline": _parse_format_b,
    "C_acc_drill": _parse_format_c,
    "E_appmath_drill": _parse_format_e,
    "F_evs_drill": _parse_format_f,
}


def parse_file(file_path: Path) -> list[dict]:
    """Parse a drill bank .marker file into a list of drill records."""
    content = file_path.read_text(encoding="utf-8-sig")
    lines = content.split("\n")

    fmt = _detect_format(lines)
    if fmt == "unknown" or fmt == "D_txt_pdf":
        return []

    parser_func = _FORMAT_DISPATCH[fmt]
    return parser_func(lines, str(file_path))


def register():
    """Register this parser with the parser registry."""
    from backend.content_parsers.parser_registry import register_parser

    register_parser(
        content_type=CONTENT_TYPE,
        version=PARSER_VERSION,
        description="Parses drill_banks .marker files. Auto-detects 3 formats: "
                    "A_qa_marker, B_qa_inline, C_acc_drill. "
                    "CISCE PDF .txt files (D_txt_pdf) go to review queue.",
        parse_func=parse_file,
        parser_id=PARSER_ID,
        tier=1,
    )
