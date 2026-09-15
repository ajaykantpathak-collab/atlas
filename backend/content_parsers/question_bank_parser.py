"""Question bank parser — parses .marker question bank files into question records.

The question_bank/ subdirectory contains at least 7 distinct formats across
subjects. This parser detects the format and dispatches to the appropriate
sub-parser. Files that don't match any known format go to the review queue.

Formats detected:
  A: physics    — Q1. question (2 marks) / Answer: ...
  B: histciv    — Q1. [1 mark] [recall] [easy] / question text (no answers)
  C: maths/cs   — Q1 [BASIC] (2 marks): question / A: answer
  D: acc        — Question: Q001, node, marks, type, "q", OPTIONS:..., CORRECT_ANSWER:..., MARKING_SCHEME:..., MODEL_ANSWER:...
  E: econ       — --- Q1 --- / TOPIC: / MARKS: / QUESTION_TYPE: / QUESTION_TEXT: / OPTIONS: / CORRECT_ANSWER: / ...
  F: geo        — 1. question / a) b) c) d) / Answer: ...
  G: evs        — Q_M01. question / A. B. C. D. / ANSWER: / MARKING: / EXPLANATION:

Output: list of dicts with normalized keys:
    question_number, question_text, answer, marks, question_type,
    options (list or None), correct_answer, marking_scheme, model_answer,
    cognitive_level, difficulty, tier, node_tags (list),
    source_file, source_format, parser_id, parser_version
"""

import re
from pathlib import Path
from typing import Optional

PARSER_ID = "question_bank_v1"
PARSER_VERSION = "1.0.0"
CONTENT_TYPE = "question_bank"


# ---------------------------------------------------------------------------
# Format detection
# ---------------------------------------------------------------------------

def _detect_format(lines: list[str]) -> str:
    """Detect which question bank format a file uses.

    Returns one of: 'A_physics', 'B_histciv', 'C_maths', 'D_acc',
    'E_econ', 'F_geo', 'G_evs', or 'unknown'.
    """
    # Join first 200 lines for detection (some files have long headers)
    sample = "\n".join(lines[:200])

    # Format D: Accountancy/Commerce — "Question: Q001, c11_acc_001, 1, MCQ, ..."
    # or "Question: 1, c11_comm_001, 1, MCQ, ..."
    # Single-line variant with CORRECT_ANSWER: label on same line
    if re.search(r"^Question:\s+(?:Q)?\d+,\s*c\d+_\w+,\s*\d+,\s*\w+,.*CORRECT_ANSWER:", sample, re.MULTILINE):
        return "D_acc"

    # Format D3: CommStud/Econ — "Question: Q001, node, marks, type, "q", "opts|pipe", A, "marking", "model""
    # Comma-separated quoted fields WITHOUT field labels
    if re.search(r'^Question:\s+Q\d+,\s*c\d+_\w+,\s*\d+,\s*\w+,\s*".*?"\s*,\s*".*?"\s*,', sample, re.MULTILINE):
        return "D3_commstud"

    # Format D4: Econ unquoted — "Question: Q001, node, marks, type, question, opts|pipe, ans, marking, model"
    # Comma-separated UNQUOTED fields, options pipe-separated
    if re.search(r"^Question:\s+Q\d+,\s*c\d+_\w+,\s*\d+,\s*\w+,\s+[^,]+,\s*[A-D]\)\s.*\|", sample, re.MULTILINE):
        return "D4_econ_unquoted"

    # Format D2: Business Studies/EconApp — "Question: Q001, node ..., marks, type" on one line
    # then QUESTION_TEXT: on next line (multi-line variant)
    # Node field may include extra text after the node ID
    if re.search(r"^Question:\s+Q\d+,\s*c\d+_\w+.*?,\s*\d+,\s*\w+\s*$", sample, re.MULTILINE):
        return "D2_bs"

    # Format E: Economics — "--- Q1 ---" followed by "TOPIC:" "MARKS:" etc
    if re.search(r"^---\s+Q\d+\s+---", sample, re.MULTILINE):
        return "E_econ"

    # Format G: EVS — "Q_M01." or "Q_S01." with "ANSWER:" and "EXPLANATION:"
    if re.search(r"^Q_[A-Z]\d+\.", sample, re.MULTILINE):
        return "G_evs"

    # Format C: Maths/CS/Bio — "Q1 [BASIC] (2 marks):" or "Q1 [BASIC] (2):" with "A:" answer
    if re.search(r"^Q\d+\s*\[(BASIC|EXAM|CHALLENGE)\]\s*\(\d+\s*(?:marks?)?\)", sample, re.MULTILINE):
        return "C_maths"

    # Format B: HistCiv — "Q1. [1 mark] [recall] [easy]" (bracketed metadata)
    if re.search(r"^Q\d+\.\s*\[\d+\s*mark", sample, re.MULTILINE):
        return "B_histciv"

    # Format A: Physics — "Q1. question text (2 marks)" with "Answer:"
    # Also matches indented versions inside EXAMPLES: | blocks
    if re.search(r"^\s*Q\d+\.\s+.+\(\d+\s*marks?\)", sample, re.MULTILINE):
        return "A_physics"

    # Format H: Bare questions — "Q1: question" or "1. question (1)"
    # No answers, no tier, minimal structure (appmath, chem, biotech)
    if re.search(r"^Q\d+:\s+", sample, re.MULTILINE):
        return "H_bare"
    if re.search(r"^\d+\.\s+.+\(\d+\)\s*$", sample, re.MULTILINE):
        return "H_bare"

    # Format F: Geography — "1. question" with "a) b) c) d)" options
    if re.search(r"^\d+\.\s+.+", sample, re.MULTILINE) and re.search(r"^\s+[a-d]\)", sample, re.MULTILINE):
        return "F_geo"

    return "unknown"


# ---------------------------------------------------------------------------
# Format A: Physics — Q1. question (2 marks) / Answer: ...
# ---------------------------------------------------------------------------

_Q_PATTERN_A = re.compile(
    r"^\s*Q(\d+)\.\s+(.+?)\s*\((\d+)\s*marks?\)\s*$"
)

def _parse_format_a(lines: list[str], file_path: str) -> list[dict]:
    """Parse Physics-style: Q1. question (N marks) / Answer: ...

    Also handles indented questions inside EXAMPLES: | blocks.
    """
    questions = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_A.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        q_text = m.group(2).strip()
        marks = int(m.group(3))

        # Collect answer (starts with "Answer:" on next or same line)
        answer = None
        i += 1
        answer_lines = []
        while i < len(lines):
            cont = lines[i]
            if _Q_PATTERN_A.match(cont) or cont.strip().startswith("=== SECTION"):
                break
            answer_lines.append(cont)
            i += 1

        answer_raw = "\n".join(answer_lines).strip()
        # Remove "Answer:" prefix (may be indented)
        answer_raw = re.sub(r"^\s*Answer:\s*", "", answer_raw)
        answer = answer_raw if answer_raw else None

        questions.append({
            "question_number": q_num,
            "question_text": q_text,
            "answer": answer,
            "marks": marks,
            "question_type": None,
            "options": None,
            "correct_answer": None,
            "marking_scheme": None,
            "model_answer": None,
            "cognitive_level": None,
            "difficulty": None,
            "tier": None,
            "node_tags": [],
            "source_file": file_path,
            "source_format": "A_physics",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format B: HistCiv — Q1. [1 mark] [recall] [easy] / question text (no answers)
# ---------------------------------------------------------------------------

_Q_PATTERN_B = re.compile(
    r"^Q(\d+)\.\s*\[(\d+)\s*marks?\]\s*\[(\w+)\]\s*\[(\w+)\]\s*$"
)

def _parse_format_b(lines: list[str], file_path: str) -> list[dict]:
    """Parse HistCiv-style: Q1. [1 mark] [recall] [easy] / question text."""
    questions = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_B.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        marks = int(m.group(2))
        cognitive = m.group(3).lower()
        difficulty = m.group(4).lower()

        # Question text is on the next non-empty line(s)
        i += 1
        q_lines = []
        while i < len(lines):
            cont = lines[i]
            if _Q_PATTERN_B.match(cont) or cont.startswith("--- Topic:"):
                break
            q_lines.append(cont)
            i += 1

        q_text = "\n".join(q_lines).strip()
        # Clean up: take only the first non-empty line as question text
        # (some have multi-line questions, keep them)
        q_text = q_text if q_text else None

        questions.append({
            "question_number": q_num,
            "question_text": q_text,
            "answer": None,  # Format B has no answers
            "marks": marks,
            "question_type": None,
            "options": None,
            "correct_answer": None,
            "marking_scheme": None,
            "model_answer": None,
            "cognitive_level": cognitive,
            "difficulty": difficulty,
            "tier": None,
            "node_tags": [],
            "source_file": file_path,
            "source_format": "B_histciv",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format C: Maths/CS/Bio — Q1 [BASIC] (2 marks): question / A: answer
# ---------------------------------------------------------------------------

_Q_PATTERN_C = re.compile(
    r"^Q(\d+)\s*\[(BASIC|EXAM|CHALLENGE)\]\s*\((\d+)\s*(?:marks?)?\):\s*(.*)$"
)

def _parse_format_c(lines: list[str], file_path: str) -> list[dict]:
    """Parse Maths/CS/Bio-style: Q1 [BASIC] (2 marks): question / A: answer."""
    questions = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_C.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        tier = m.group(2).lower()
        marks = int(m.group(3))
        q_text_start = m.group(4).strip()

        # Collect question continuation and answer
        i += 1
        content_lines = []
        if q_text_start:
            content_lines.append(q_text_start)
        while i < len(lines):
            cont = lines[i]
            if _Q_PATTERN_C.match(cont) or cont.startswith("=== TOPIC") or cont.startswith("=== SECTION"):
                break
            content_lines.append(cont)
            i += 1

        # Split into question and answer at "A:" prefix
        full_text = "\n".join(content_lines).strip()
        answer = None
        question = full_text

        # Find "A:" at start of a line (answer prefix)
        a_match = re.search(r"\nA:\s*(.*)", full_text, re.DOTALL)
        if a_match:
            question = full_text[:a_match.start()].strip()
            answer = a_match.group(1).strip()
        else:
            # Some questions have answer on the same line after "A:"
            a_match2 = re.match(r"^A:\s*(.*)", full_text)
            if a_match2:
                question = None
                answer = a_match2.group(1).strip()

        questions.append({
            "question_number": q_num,
            "question_text": question,
            "answer": answer,
            "marks": marks,
            "question_type": None,
            "options": None,
            "correct_answer": None,
            "marking_scheme": None,
            "model_answer": None,
            "cognitive_level": None,
            "difficulty": None,
            "tier": tier,
            "node_tags": [],
            "source_file": file_path,
            "source_format": "C_maths",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format D: Accountancy — Question: Q001, node, marks, type, "q", OPTIONS:..., ...
# ---------------------------------------------------------------------------

_Q_PATTERN_D = re.compile(
    r'^Question:\s+(?:Q)?(\d+),\s*(c\S+),\s*(\d+),\s*(\w+),\s*'
    r'(?:"(.*?)"|(.+?))\s*,\s*'
    r'(?:OPTIONS:\s*(.*?),\s*)?'
    r'CORRECT_ANSWER:\s*(.*?),\s*'
    r'MARKING_SCHEME:\s*(.*?),\s*'
    r'MODEL_ANSWER:\s*(.*)$'
)

def _parse_format_d(lines: list[str], file_path: str) -> list[dict]:
    """Parse Accountancy/Commerce-style: Question: Q001, node, marks, type, ...

    Handles both quoted and unquoted question text, and both Q001 and 001
    numbering styles.
    """
    questions = []
    for line in lines:
        line = line.strip()
        if not line.startswith("Question:"):
            continue
        m = _Q_PATTERN_D.match(line)
        if not m:
            continue

        q_num = int(m.group(1))
        node_tag = m.group(2)
        marks = int(m.group(3))
        q_type = m.group(4).lower()
        # Question text may be in group(5) (quoted) or group(6) (unquoted)
        q_text = (m.group(5) or m.group(6) or "").strip()
        options_raw = m.group(7)
        correct_answer = m.group(8).strip()
        marking_scheme = m.group(9).strip()
        model_answer = m.group(10).strip()

        # Parse options if present
        options = None
        if options_raw:
            options = [o.strip() for o in re.split(r"\([A-Da-d]\)\s*", options_raw) if o.strip()]

        questions.append({
            "question_number": q_num,
            "question_text": q_text,
            "answer": model_answer,
            "marks": marks,
            "question_type": q_type,
            "options": options,
            "correct_answer": correct_answer,
            "marking_scheme": marking_scheme,
            "model_answer": model_answer,
            "cognitive_level": None,
            "difficulty": None,
            "tier": None,
            "node_tags": [node_tag] if node_tag else [],
            "source_file": file_path,
            "source_format": "D_acc",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format D2: Business Studies — Question: Q001, node, marks, type (multi-line)
# ---------------------------------------------------------------------------

_Q_PATTERN_D2 = re.compile(
    r"^Question:\s+Q(\d+),\s*(c\d+_\w+)[^,]*,\s*(\d+),\s*(\w+)\s*$"
)

def _parse_format_d2(lines: list[str], file_path: str) -> list[dict]:
    """Parse Business Studies-style: Question: Q001, node, marks, type
    followed by QUESTION_TEXT:, OPTIONS:, CORRECT_ANSWER:, etc. on separate lines.
    """
    questions = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        m = _Q_PATTERN_D2.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        node_tag = m.group(2)
        marks = int(m.group(3))
        q_type = m.group(4).lower()

        # Parse fields until next Question: line
        i += 1
        fields = {}
        current_field = None
        current_lines = []

        while i < len(lines):
            cont = lines[i]
            if _Q_PATTERN_D2.match(cont.strip()):
                break

            field_m = re.match(r"^([A-Z_]+):\s*(.*)$", cont.strip())
            if field_m:
                if current_field:
                    fields[current_field] = "\n".join(current_lines).strip()
                current_field = field_m.group(1)
                current_lines = [field_m.group(2)] if field_m.group(2) else []
            elif current_field:
                current_lines.append(cont.strip())

            i += 1

        if current_field:
            fields[current_field] = "\n".join(current_lines).strip()

        # Parse options
        options = None
        if fields.get("OPTIONS"):
            opt_text = fields["OPTIONS"]
            opt_parts = re.split(r"\n?\s*\([a-dA-D]\)\s*", opt_text)
            options = [o.strip() for o in opt_parts if o.strip()]

        questions.append({
            "question_number": q_num,
            "question_text": fields.get("QUESTION_TEXT"),
            "answer": fields.get("MODEL_ANSWER"),
            "marks": marks,
            "question_type": q_type,
            "options": options,
            "correct_answer": fields.get("CORRECT_ANSWER"),
            "marking_scheme": fields.get("MARKING_SCHEME"),
            "model_answer": fields.get("MODEL_ANSWER"),
            "cognitive_level": None,
            "difficulty": None,
            "tier": None,
            "node_tags": [node_tag] if node_tag else [],
            "source_file": file_path,
            "source_format": "D2_bs",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format E: Economics — --- Q1 --- / TOPIC: / MARKS: / QUESTION_TYPE: / ...
# ---------------------------------------------------------------------------

def _parse_format_e(lines: list[str], file_path: str) -> list[dict]:
    """Parse Economics-style: --- Q1 --- / TOPIC: / MARKS: / ..."""
    questions = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        if not re.match(r"^---\s+Q\d+\s+---", line):
            i += 1
            continue

        # Found a question block, parse fields until next --- Q\d+ ---
        q_num = int(re.search(r"Q(\d+)", line).group(1))
        i += 1

        fields = {}
        current_field = None
        current_lines = []

        while i < len(lines):
            cont = lines[i]
            if re.match(r"^---\s+Q\d+\s+---", cont.strip()):
                break

            # Check for field header: "FIELD_NAME: value"
            field_m = re.match(r"^([A-Z_]+):\s*(.*)$", cont)
            if field_m:
                # Save previous field
                if current_field:
                    fields[current_field] = "\n".join(current_lines).strip()
                current_field = field_m.group(1)
                current_lines = [field_m.group(2)] if field_m.group(2) else []
            elif current_field:
                current_lines.append(cont)

            i += 1

        # Save last field
        if current_field:
            fields[current_field] = "\n".join(current_lines).strip()

        # Parse options if present
        options = None
        if fields.get("OPTIONS"):
            opt_text = fields["OPTIONS"]
            # Options are multi-line: "A) ...\n  B) ...\n  C) ...\n  D) ..."
            # Split on letter-prefixed lines
            opt_parts = re.split(r"\n\s*[A-D]\)\s*", opt_text)
            # First part may be the A option (after "OPTIONS:" prefix on same line)
            options = [o.strip() for o in opt_parts if o.strip()]

        q_num_from_text = q_num
        questions.append({
            "question_number": q_num_from_text,
            "question_text": fields.get("QUESTION_TEXT"),
            "answer": fields.get("MODEL_ANSWER"),
            "marks": int(fields["MARKS"]) if fields.get("MARKS", "").isdigit() else None,
            "question_type": fields.get("QUESTION_TYPE", "").lower() if fields.get("QUESTION_TYPE") else None,
            "options": options,
            "correct_answer": fields.get("CORRECT_ANSWER"),
            "marking_scheme": fields.get("MARKING_SCHEME"),
            "model_answer": fields.get("MODEL_ANSWER"),
            "cognitive_level": None,
            "difficulty": None,
            "tier": None,
            "node_tags": [fields["TOPIC"]] if fields.get("TOPIC") else [],
            "source_file": file_path,
            "source_format": "E_econ",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format F: Geography — 1. question / a) b) c) d) / Answer: ...
# ---------------------------------------------------------------------------

_Q_PATTERN_F = re.compile(r"^(\d+)\.\s+(.+)$")
_OPT_PATTERN_F = re.compile(r"^\s+([a-d])\)\s*(.+)")

def _parse_format_f(lines: list[str], file_path: str) -> list[dict]:
    """Parse Geography-style: 1. question / a) b) c) d) / Answer: ..."""
    questions = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_F.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        q_text = m.group(2).strip()

        # Collect options and answer
        options = []
        answer = None
        i += 1
        while i < len(lines):
            cont = lines[i]
            if _Q_PATTERN_F.match(cont) or cont.startswith("=== SECTION"):
                break

            opt_m = _OPT_PATTERN_F.match(cont)
            if opt_m:
                options.append(f"{opt_m.group(1)}) {opt_m.group(2).strip()}")
            elif cont.strip().startswith("Answer:"):
                answer = cont.strip()[7:].strip()

            i += 1

        questions.append({
            "question_number": q_num,
            "question_text": q_text,
            "answer": answer,
            "marks": 1,  # Geo MCQs are typically 1 mark each
            "question_type": "mcq" if options else None,
            "options": options if options else None,
            "correct_answer": answer,
            "marking_scheme": None,
            "model_answer": None,
            "cognitive_level": None,
            "difficulty": None,
            "tier": None,
            "node_tags": [],
            "source_file": file_path,
            "source_format": "F_geo",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format G: EVS — Q_M01. question / A. B. C. D. / ANSWER: / MARKING: / EXPLANATION:
# ---------------------------------------------------------------------------

_Q_PATTERN_G = re.compile(r"^Q_[A-Z](\d+)\.\s+(.+)$")

def _parse_format_g(lines: list[str], file_path: str) -> list[dict]:
    """Parse EVS-style: Q_M01. question / A. B. C. D. / ANSWER: / MARKING: / EXPLANATION:

    Handles both MCQ (Q_M01.) and short/long answer (Q_S01., Q_L01., Q_A01.).
    ANSWER: can be multi-line for non-MCQ questions.
    """
    questions = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_G.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        q_text = m.group(2).strip()

        # Detect question type from prefix (Q_M=MCQ, Q_S=Short, Q_L=Long, Q_A=Application)
        q_prefix = re.match(r"Q_([A-Z])", line)
        q_type_hint = None
        if q_prefix:
            type_map = {"M": "mcq", "S": "short_answer", "L": "long_answer", "A": "application"}
            q_type_hint = type_map.get(q_prefix.group(1))

        # Extract marks from question text if present: "(2 marks) ..."
        marks = 1  # default for MCQ
        marks_m = re.match(r"\((\d+)\s*marks?\)\s*(.*)", q_text)
        if marks_m:
            marks = int(marks_m.group(1))
            q_text = marks_m.group(2).strip()

        # Collect fields until next question
        options = []
        answer_lines = []
        answer = None
        marking = None
        explanation = None
        current_field = None

        i += 1
        while i < len(lines):
            cont = lines[i]
            if _Q_PATTERN_G.match(cont):
                break

            cont_stripped = cont.strip()
            if cont_stripped == "---" * 10 or cont_stripped.startswith("----"):
                i += 1
                continue

            if re.match(r"^[A-D]\.\s+", cont_stripped):
                options.append(cont_stripped)
                current_field = "options"
            elif cont_stripped.startswith("ANSWER:"):
                answer_text = cont_stripped[7:].strip()
                if answer_text:
                    answer_lines.append(answer_text)
                current_field = "answer"
            elif cont_stripped.startswith("MARKING:"):
                marking = cont_stripped[8:].strip()
                current_field = "marking"
            elif cont_stripped.startswith("EXPLANATION:"):
                explanation = cont_stripped[12:].strip()
                current_field = "explanation"
            elif current_field == "answer":
                answer_lines.append(cont_stripped)

            i += 1

        # Build answer: prefer EXPLANATION for MCQs, ANSWER for non-MCQs
        answer_text = "\n".join(answer_lines).strip() if answer_lines else None
        final_answer = explanation if explanation else answer_text

        # For MCQs, correct_answer is the letter; for others, it's the full answer
        correct_ans = answer_text if q_type_hint == "mcq" else None

        questions.append({
            "question_number": q_num,
            "question_text": q_text,
            "answer": final_answer,
            "marks": marks,
            "question_type": q_type_hint,
            "options": options if options else None,
            "correct_answer": correct_ans,
            "marking_scheme": marking,
            "model_answer": final_answer,
            "cognitive_level": None,
            "difficulty": None,
            "tier": None,
            "node_tags": [],
            "source_file": file_path,
            "source_format": "G_evs",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format H: Bare questions — Q1: question / 1. question (1)
# ---------------------------------------------------------------------------

_Q_PATTERN_H1 = re.compile(r"^Q(\d+):\s+(.+)$")
_Q_PATTERN_H2 = re.compile(r"^(\d+)\.\s+(.+?)\s*\((\d+)\)\s*$")

def _parse_format_h(lines: list[str], file_path: str) -> list[dict]:
    """Parse bare questions: Q1: question or 1. question (1)

    No answers, no tier, minimal structure. Used by appmath, chem, biotech.
    """
    questions = []
    for i, line in enumerate(lines):
        line = line.strip()
        if not line or line.startswith("===") or line.startswith("---"):
            continue

        m = _Q_PATTERN_H1.match(line)
        if m:
            q_num = int(m.group(1))
            q_text = m.group(2).strip()
            # Try to extract marks from text: "(2 marks)" or "(2)"
            marks = None
            marks_m = re.search(r"\((\d+)\s*marks?\)", q_text)
            if marks_m:
                marks = int(marks_m.group(1))
            else:
                marks_m2 = re.search(r"\((\d+)\)\s*$", q_text)
                if marks_m2:
                    marks = int(marks_m2.group(1))

            questions.append({
                "question_number": q_num,
                "question_text": q_text,
                "answer": None,
                "marks": marks,
                "question_type": None,
                "options": None,
                "correct_answer": None,
                "marking_scheme": None,
                "model_answer": None,
                "cognitive_level": None,
                "difficulty": None,
                "tier": None,
                "node_tags": [],
                "source_file": file_path,
                "source_format": "H_bare",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
            continue

        m = _Q_PATTERN_H2.match(line)
        if m:
            q_num = int(m.group(1))
            q_text = m.group(2).strip()
            marks = int(m.group(3))
            questions.append({
                "question_number": q_num,
                "question_text": q_text,
                "answer": None,
                "marks": marks,
                "question_type": None,
                "options": None,
                "correct_answer": None,
                "marking_scheme": None,
                "model_answer": None,
                "cognitive_level": None,
                "difficulty": None,
                "tier": None,
                "node_tags": [],
                "source_file": file_path,
                "source_format": "H_bare",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })

    return questions


# ---------------------------------------------------------------------------
# Format D3: CommStud/Econ — Question: Q001, node, marks, type, "q", "opts|pipe", A, "ms", "ma"
# ---------------------------------------------------------------------------

_Q_PATTERN_D3 = re.compile(
    r'^Question:\s+Q(\d+),\s*(c\d+_\w+),\s*(\d+),\s*([\w ]+),\s*'
    r'"(.*?)"\s*,\s*'   # question text
    r'"(.*?)"\s*,\s*'   # options (pipe-separated) or empty
    r'(\S+)\s*,\s*'     # correct answer
    r'"(.*?)"\s*,\s*'   # marking scheme
    r'"(.*?)"\s*$'      # model answer
)

def _parse_format_d3(lines: list[str], file_path: str) -> list[dict]:
    """Parse CommStud/Econ-style: Question: Q001, node, marks, type, "q", "opts|pipe", A, "ms", "ma"

    Fields are comma-separated quoted strings WITHOUT field labels.
    Options are pipe-separated inside quotes.
    """
    questions = []
    for line in lines:
        line = line.strip()
        if not line.startswith("Question:"):
            continue
        m = _Q_PATTERN_D3.match(line)
        if not m:
            continue

        q_num = int(m.group(1))
        node_tag = m.group(2)
        marks = int(m.group(3))
        q_type = m.group(4).strip().lower().replace(" ", "_")
        q_text = m.group(5).strip()
        options_raw = m.group(6).strip()
        correct_answer = m.group(7).strip()
        marking_scheme = m.group(8).strip()
        model_answer = m.group(9).strip()

        # Parse pipe-separated options
        options = None
        if options_raw and options_raw != "N/A":
            options = [o.strip() for o in options_raw.split("|") if o.strip()]

        # Clean up N/A values
        if correct_answer == "N/A":
            correct_answer = None
        if marking_scheme == "N/A":
            marking_scheme = None

        questions.append({
            "question_number": q_num,
            "question_text": q_text,
            "answer": model_answer if model_answer else None,
            "marks": marks,
            "question_type": q_type,
            "options": options,
            "correct_answer": correct_answer,
            "marking_scheme": marking_scheme,
            "model_answer": model_answer if model_answer else None,
            "cognitive_level": None,
            "difficulty": None,
            "tier": None,
            "node_tags": [node_tag] if node_tag else [],
            "source_file": file_path,
            "source_format": "D3_commstud",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Format D4: Econ unquoted — Question: Q001, node, marks, type, q, opts|pipe, ans, ms, ma
# ---------------------------------------------------------------------------

def _parse_format_d4(lines: list[str], file_path: str) -> list[dict]:
    """Parse Econ unquoted-style: Question: Q001, node, marks, type, q, opts, ans, ms, ma

    Fields are comma-separated WITHOUT quotes. Options are pipe-separated.
    Non-MCQ questions have "None" for options and correct_answer.
    """
    questions = []
    for line in lines:
        line = line.strip()
        if not line.startswith("Question:"):
            continue

        # Remove "Question: " prefix
        rest = line[10:].strip()

        # Split by comma, but be careful — question text and options may contain commas
        # Strategy: split by comma, first 4 fields are fixed (Q_num, node, marks, type)
        # The rest is question, options, answer, marking, model
        parts = rest.split(",", 4)
        if len(parts) < 5:
            continue

        q_num_str = parts[0].strip().replace("Q", "")
        node_tag = parts[1].strip()
        marks_str = parts[2].strip()
        q_type = parts[3].strip().lower().replace(" ", "_")
        remainder = parts[4]

        try:
            q_num = int(q_num_str)
            marks = int(marks_str)
        except ValueError:
            continue

        # Split remainder: question, options, answer, marking, model
        # Options are pipe-separated and may contain commas, so we need to be careful
        # Strategy: split from the right — last 3 fields are answer, marking, model
        # But marking and model can contain commas too...
        # Let's try: split by comma, then rejoin from the right
        rem_parts = remainder.split(",")
        if len(rem_parts) < 4:
            # Maybe options is "None" and there's no comma in it
            # Try: question, None, answer, marking, model
            if len(rem_parts) >= 4:
                pass
            else:
                continue

        # Heuristic: the answer field is a single letter (A, B, C, D) or "None"
        # Find it by looking for a short field that's a letter or "None"
        answer_idx = None
        for idx in range(2, len(rem_parts) - 1):
            field = rem_parts[idx].strip()
            if field in ("A", "B", "C", "D", "None", "N/A"):
                answer_idx = idx
                break

        if answer_idx is None:
            continue

        q_text = ",".join(rem_parts[:answer_idx - 1]).strip()
        options_raw = rem_parts[answer_idx - 1].strip()
        correct_answer = rem_parts[answer_idx].strip()
        marking_scheme = ",".join(rem_parts[answer_idx + 1:-1]).strip()
        model_answer = rem_parts[-1].strip()

        # Parse pipe-separated options
        options = None
        if options_raw and options_raw != "None" and options_raw != "N/A":
            options = [o.strip() for o in options_raw.split("|") if o.strip()]

        if correct_answer in ("None", "N/A"):
            correct_answer = None
        if marking_scheme == "None":
            marking_scheme = None

        questions.append({
            "question_number": q_num,
            "question_text": q_text,
            "answer": model_answer if model_answer and model_answer != "None" else None,
            "marks": marks,
            "question_type": q_type,
            "options": options,
            "correct_answer": correct_answer,
            "marking_scheme": marking_scheme,
            "model_answer": model_answer if model_answer and model_answer != "None" else None,
            "cognitive_level": None,
            "difficulty": None,
            "tier": None,
            "node_tags": [node_tag] if node_tag else [],
            "source_file": file_path,
            "source_format": "D4_econ_unquoted",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return questions


# ---------------------------------------------------------------------------
# Main parser
# ---------------------------------------------------------------------------

_FORMAT_DISPATCH = {
    "A_physics": _parse_format_a,
    "B_histciv": _parse_format_b,
    "C_maths": _parse_format_c,
    "D_acc": _parse_format_d,
    "D2_bs": _parse_format_d2,
    "D3_commstud": _parse_format_d3,
    "D4_econ_unquoted": _parse_format_d4,
    "E_econ": _parse_format_e,
    "F_geo": _parse_format_f,
    "G_evs": _parse_format_g,
    "H_bare": _parse_format_h,
}


def parse_file(file_path: Path) -> list[dict]:
    """Parse a question bank .marker file into a list of question records.

    Detects the format automatically and dispatches to the appropriate
    sub-parser. Files with unknown formats return an empty list (review queue).
    """
    content = file_path.read_text(encoding="utf-8-sig")
    lines = content.split("\n")

    fmt = _detect_format(lines)
    if fmt == "unknown":
        return []

    parser_func = _FORMAT_DISPATCH[fmt]
    records = parser_func(lines, str(file_path))

    # Post-processing: extract inline (Node cXX_XXX_NNN) references from
    # question text and add them to node_tags if not already present.
    _INLINE_NODE_RE = re.compile(r"\(Node\s+(c\d+_[a-z]+(?:_[a-z]+)*_\d+)\)", re.IGNORECASE)
    _BARE_NODE_RE = re.compile(r"\b(c\d+_[a-z]+(?:_[a-z]+)*_\d+)\b", re.IGNORECASE)

    for rec in records:
        existing = set(rec.get("node_tags", []) or [])
        qt = rec.get("question_text", "") or ""
        for m in _INLINE_NODE_RE.finditer(qt):
            existing.add(m.group(1).lower())
        if not existing:
            for m in _BARE_NODE_RE.finditer(qt):
                existing.add(m.group(1).lower())
        if existing:
            rec["node_tags"] = sorted(existing)

    return records


def register():
    """Register this parser with the parser registry."""
    from backend.content_parsers.parser_registry import register_parser

    register_parser(
        content_type=CONTENT_TYPE,
        version=PARSER_VERSION,
        description="Parses question bank .marker files. Auto-detects 9 formats: "
                    "A_physics, B_histciv, C_maths, D_acc, D2_bs, E_econ, "
                    "F_geo, G_evs, H_bare.",
        parse_func=parse_file,
        parser_id=PARSER_ID,
        tier=1,
    )
