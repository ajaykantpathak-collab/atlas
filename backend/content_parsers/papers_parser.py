"""Mock/past/question papers parser — parses exam paper .marker files.

Source directories per subject:
  mock_papers/          — full mock exam papers
  past_papers/          — past board exam papers
  question_papers/      — practice question papers
  board_style_questions/ — board-style practice questions

Formats detected (6 total):

  A_mock_structured  — Mock papers with sections, MCQs with (i)(ii)(iii)(iv) options + Answer:
                       Used by: physics, histciv mock_papers
  B_q_answer         — Q1. question / ANSWER: answer (indented inside EXAMPLES: |)
                       Used by: physics question_papers
  C_board_style      — Q1. question (N marks) / Target node: / Model Answer: / Mark Allocation:
                       Used by: physics board_style_questions
  D_past_paper       — Q1 (10 marks): / (a)(b)(c)... / === ANSWER KEY ===
                       Used by: physics past_papers
  E_acc_mock         — Mock Paper: header / QUESTION N (Marks) / (a)(b)(c) / [N marks] / Expected answer:
                       Used by: acc, econ mock_papers
  F_econ_mock        — QUESTION N (Marks) / (i)(ii)(iii) / A. B. C. D. / Correct Answer:
                       Used by: econ mock_papers

Output: list of dicts with normalized keys:
    question_number, question_text, answer, marks, section, question_type,
    options (list or None), correct_answer, model_answer, mark_allocation,
    target_nodes (list), paper_id, source_file, source_format, parser_id, parser_version
"""

import re
from pathlib import Path
from typing import Optional

PARSER_ID = "papers_v1"
PARSER_VERSION = "1.0.0"
CONTENT_TYPE = "papers"


# ---------------------------------------------------------------------------
# Format detection
# ---------------------------------------------------------------------------

def _detect_format(lines: list[str]) -> str:
    """Detect which paper format a file uses."""
    sample = "\n".join(lines[:300])

    # Format E: acc mock — "Mock Paper:" header + "QUESTION N (Marks)" + "Expected answer:"
    if re.search(r"^Mock Paper:", sample, re.MULTILINE) and "Expected answer:" in sample:
        return "E_acc_mock"

    # Format F: econ mock — "MOCK PAPER" header + "Correct Answer:" + "(i)(ii)" options
    if re.search(r"MOCK PAPER", sample) and re.search(r"^\s*Correct Answer:", sample, re.MULTILINE):
        return "F_econ_mock"

    # Format G: bio mock — A1. question / (a)(b)(c)(d) inline (no Answer: line)
    if re.search(r"^\s*A\d+\.\s+.+", sample, re.MULTILINE) and re.search(r"\(a\)\s+.+\(b\)\s+.+\(c\)\s+.+\(d\)", sample):
        return "G_bio_mock"

    # Format H: acc past_papers — field-based YEAR_PATTERN/SECTION/Q_NUMBER/MARKS/QUESTION/MODEL_ANSWER_OUTLINE
    if re.search(r"^YEAR_PATTERN:", sample, re.MULTILINE) and re.search(r"^QUESTION:", sample, re.MULTILINE):
        return "H_field_based"

    # Format I: appmath mock — Q1 (Topic, 20 marks): / (a) text [5]
    if re.search(r"^Q\d+\s*\(.+,\s*\d+\s*marks?\):", sample, re.MULTILINE) and re.search(r"^\s*\([a-z]\)\s+.+\[\d+\]", sample, re.MULTILINE):
        return "I_appmath_mock"

    # Format J: bio past_paper — (a) [1 mark] text -> answer
    if re.search(r"^\s*\([a-z]\)\s*\[\d+\s*mark", sample, re.MULTILINE) and "->" in sample:
        return "J_bio_past"

    # Format C: board_style — "Q1. question (N marks)" + "Model Answer:" + "Mark Allocation:"
    if re.search(r"^\s*Q\d+\.\s+.+\(\d+\s*marks?\)", sample, re.MULTILINE) and "Model Answer:" in sample:
        return "C_board_style"

    # Format D: past_paper — "Q1 (10 marks):" + "=== ANSWER KEY ==="
    if re.search(r"^Q\d+\s*\(\d+\s*marks?\):", sample, re.MULTILINE) and "ANSWER KEY" in sample:
        return "D_past_paper"

    # Format A: mock_structured — "=== MOCK PAPER" + "(i)(ii)(iii)(iv)" + "Answer: (ii)"
    if re.search(r"MOCK PAPER", sample) and re.search(r"^\s*\(i\)\s+", sample, re.MULTILINE) and re.search(r"^\s*Answer:\s*\(", sample, re.MULTILINE):
        return "A_mock_structured"

    # Format B: q_answer — "Q1. question" + "ANSWER:" (inside EXAMPLES: |)
    if re.search(r"^\s*Q\d+\.\s+.+", sample, re.MULTILINE) and re.search(r"^\s*ANSWER:", sample, re.MULTILINE):
        return "B_q_answer"

    return "unknown"


# ---------------------------------------------------------------------------
# Format A: Mock structured — sections with MCQs (i)(ii)(iii)(iv) + Answer:
# ---------------------------------------------------------------------------

_Q_PATTERN_A = re.compile(r"^\s*\(([a-z])\)\s+(.+)$")
_OPT_PATTERN_A = re.compile(r"^\s*\((i|ii|iii|iv|v)\)\s+(.+)$")

def _parse_format_a(lines: list[str], file_path: str) -> list[dict]:
    """Parse mock structured format: (a) question / (i)(ii)(iii)(iv) options / Answer: (ii)"""
    records = []
    i = 0
    current_section = None
    q_counter = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Track sections
        sec_m = re.match(r"^===\s*(SECTION\s+[A-Z]|PART\s+[IVX]+)\s*\(?\d*\s*marks?\)?\s*===?$", stripped)
        if sec_m:
            current_section = sec_m.group(1)
            i += 1
            continue

        # Detect question: (a) question text
        q_m = _Q_PATTERN_A.match(line)
        if q_m:
            q_counter += 1
            q_letter = q_m.group(1)
            q_text = q_m.group(2).strip()
            i += 1

            # Collect target node, options, and answer
            target_nodes = []
            options = []
            answer = None
            current_field = None

            while i < len(lines):
                cont = lines[i]
                cont_stripped = cont.strip()

                if _Q_PATTERN_A.match(cont) or cont_stripped.startswith("=== SECTION") or cont_stripped.startswith("=== PART") or cont_stripped.startswith("--- PART"):
                    break

                if cont_stripped.startswith("Target node:"):
                    nodes_text = cont_stripped[12:].strip()
                    target_nodes = [n.strip() for n in nodes_text.split(",") if n.strip() and n.strip() != "UNKNOWN"]
                    i += 1
                    continue

                opt_m = _OPT_PATTERN_A.match(cont)
                if opt_m:
                    options.append(f"({opt_m.group(1)}) {opt_m.group(2).strip()}")
                    i += 1
                    continue

                if cont_stripped.startswith("Answer:"):
                    answer = cont_stripped[7:].strip()
                    i += 1
                    continue

                # Multi-line question text
                if cont_stripped and not cont_stripped.startswith("Target") and not cont_stripped.startswith("Answer"):
                    q_text += " " + cont_stripped

                i += 1

            records.append({
                "question_number": q_counter,
                "question_text": q_text,
                "answer": answer,
                "marks": 1,  # MCQs are typically 1 mark
                "section": current_section,
                "question_type": "mcq" if options else None,
                "options": options if options else None,
                "correct_answer": answer,
                "model_answer": None,
                "mark_allocation": None,
                "target_nodes": target_nodes,
                "paper_id": None,
                "source_file": file_path,
                "source_format": "A_mock_structured",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Format B: Q1. question / ANSWER: answer
# ---------------------------------------------------------------------------

_Q_PATTERN_B = re.compile(r"^\s*Q(\d+)\.\s+(.+)$")

def _parse_format_b(lines: list[str], file_path: str) -> list[dict]:
    """Parse Q1. question / ANSWER: format (question_papers)."""
    records = []
    i = 0
    current_section = None

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Track sections
        sec_m = re.match(r"^={3,}\s*(SECTION\s+[A-Z]).*={3,}$", stripped)
        if sec_m:
            current_section = sec_m.group(1)
            i += 1
            continue

        q_m = _Q_PATTERN_B.match(line)
        if q_m:
            q_num = int(q_m.group(1))
            q_text = q_m.group(2).strip()
            # Extract marks from question text if present
            marks = None
            marks_m = re.search(r"\((\d+)\s*marks?\)", q_text)
            if marks_m:
                marks = int(marks_m.group(1))
                q_text = re.sub(r"\s*\(\d+\s*marks?\)", "", q_text).strip()

            i += 1

            # Collect answer
            answer_lines = []
            while i < len(lines):
                cont = lines[i]
                cont_stripped = cont.strip()
                if _Q_PATTERN_B.match(cont) or cont_stripped.startswith("=== SECTION"):
                    break
                answer_lines.append(cont_stripped)
                i += 1

            answer_raw = "\n".join(answer_lines).strip()
            answer = None
            if answer_raw.startswith("ANSWER:"):
                answer = answer_raw[7:].strip()
            elif answer_raw:
                answer = answer_raw

            records.append({
                "question_number": q_num,
                "question_text": q_text,
                "answer": answer,
                "marks": marks,
                "section": current_section,
                "question_type": None,
                "options": None,
                "correct_answer": None,
                "model_answer": answer,
                "mark_allocation": None,
                "target_nodes": [],
                "paper_id": None,
                "source_file": file_path,
                "source_format": "B_q_answer",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Format C: Board style — Q1. question (N marks) / Target node: / Model Answer: / Mark Allocation:
# ---------------------------------------------------------------------------

_Q_PATTERN_C = re.compile(r"^\s*Q(\d+)\.\s+(.+?)\s*\((\d+)\s*marks?\)\s*$")

def _parse_format_c(lines: list[str], file_path: str) -> list[dict]:
    """Parse board_style format: Q1. question (N marks) / Target node / Model Answer / Mark Allocation."""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_C.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        q_text = m.group(2).strip()
        marks = int(m.group(3))
        i += 1

        target_nodes = []
        model_answer = None
        mark_allocation = None
        current_field = None
        current_lines = []

        while i < len(lines):
            cont = lines[i]
            cont_stripped = cont.strip()

            if _Q_PATTERN_C.match(cont):
                break

            if cont_stripped.startswith("Target node:"):
                nodes_text = cont_stripped[12:].strip()
                target_nodes = [n.strip() for n in nodes_text.split(",") if n.strip() and n.strip() != "UNKNOWN"]
                i += 1
                continue

            if cont_stripped.startswith("Model Answer:"):
                if current_field == "model_answer" and current_lines:
                    model_answer = "\n".join(current_lines).strip()
                model_answer = cont_stripped[13:].strip()
                current_field = "model_answer"
                current_lines = [model_answer]
                i += 1
                continue

            if cont_stripped.startswith("Mark Allocation:"):
                if current_field == "model_answer" and len(current_lines) > 1:
                    model_answer = "\n".join(current_lines).strip()
                mark_allocation = cont_stripped[16:].strip()
                current_field = "mark_allocation"
                current_lines = [mark_allocation]
                i += 1
                continue

            if current_field and cont_stripped:
                current_lines.append(cont_stripped)

            i += 1

        # Finalize
        if current_field == "model_answer" and len(current_lines) > 1:
            model_answer = "\n".join(current_lines).strip()

        records.append({
            "question_number": q_num,
            "question_text": q_text,
            "answer": model_answer,
            "marks": marks,
            "section": None,
            "question_type": None,
            "options": None,
            "correct_answer": None,
            "model_answer": model_answer,
            "mark_allocation": mark_allocation,
            "target_nodes": target_nodes,
            "paper_id": None,
            "source_file": file_path,
            "source_format": "C_board_style",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format D: Past paper — Q1 (10 marks): / (a)(b)(c)... / === ANSWER KEY ===
# ---------------------------------------------------------------------------

_Q_PATTERN_D = re.compile(r"^Q(\d+)\s*\((\d+)\s*marks?\):\s*(.*)$")

def _parse_format_d(lines: list[str], file_path: str) -> list[dict]:
    """Parse past_paper format: Q1 (10 marks): title / (a)(b)(c) sub-questions / ANSWER KEY."""
    records = []
    i = 0
    current_section = None
    in_answer_key = False
    answer_key = {}

    # First pass: collect answer key
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("=== ANSWER KEY"):
            in_answer_key = True
            continue
        if in_answer_key:
            # Lines like "Q1: (a)(i), (b)(ii)..." or "Q3: (a) answer..."
            ak_m = re.match(r"^Q(\d+):\s*(.+)$", stripped)
            if ak_m:
                q_num = int(ak_m.group(1))
                answer_key[q_num] = ak_m.group(2).strip()

    # Second pass: parse questions
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if stripped.startswith("=== ANSWER KEY"):
            break

        sec_m = re.match(r"^===\s*(SECTION\s+[A-Z]).*===?$", stripped)
        if sec_m:
            current_section = sec_m.group(1)
            i += 1
            continue

        m = _Q_PATTERN_D.match(stripped)
        if m:
            q_num = int(m.group(1))
            marks = int(m.group(2))
            q_title = m.group(3).strip()
            i += 1

            # Collect sub-questions (a)(b)(c)...
            sub_questions = []
            while i < len(lines):
                cont = lines[i].strip()
                if _Q_PATTERN_D.match(cont) or cont.startswith("=== SECTION") or cont.startswith("=== ANSWER KEY"):
                    break
                if cont:
                    sub_questions.append(cont)
                i += 1

            # Parse sub-questions
            for sq in sub_questions:
                sq_m = re.match(r"^\(([a-z])\)\s+(.+)$", sq)
                if sq_m:
                    sub_letter = sq_m.group(1)
                    sub_text = sq_m.group(2).strip()
                    # Extract marks from sub-question
                    sub_marks = None
                    sub_marks_m = re.search(r"\((\d+)\)\s*$", sub_text)
                    if sub_marks_m:
                        sub_marks = int(sub_marks_m.group(1))
                        sub_text = re.sub(r"\s*\(\d+\)\s*$", "", sub_text).strip()

                    records.append({
                        "question_number": q_num,
                        "question_text": f"({sub_letter}) {sub_text}",
                        "answer": answer_key.get(q_num),
                        "marks": sub_marks or marks,
                        "section": current_section,
                        "question_type": None,
                        "options": None,
                        "correct_answer": None,
                        "model_answer": None,
                        "mark_allocation": None,
                        "target_nodes": [],
                        "paper_id": None,
                        "source_file": file_path,
                        "source_format": "D_past_paper",
                        "parser_id": PARSER_ID,
                        "parser_version": PARSER_VERSION,
                    })
                else:
                    # Non-sub-question line (instruction, etc.)
                    pass
            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Format E: ACC mock — Mock Paper: header / QUESTION N (Marks) / (a)(b)(c) / [N marks] / Expected answer:
# ---------------------------------------------------------------------------

_Q_PATTERN_E = re.compile(r"^QUESTION\s+(\d+)\s*\((\d+)\s*Marks?\)\s*$", re.IGNORECASE)

def _parse_format_e(lines: list[str], file_path: str) -> list[dict]:
    """Parse acc mock format: QUESTION N (Marks) / (a)(b)(c) / [N marks] / Expected answer:"""
    records = []
    i = 0
    current_paper = None
    current_section = None

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Track paper
        paper_m = re.match(r"^Mock Paper:\s+(.+)$", stripped)
        if paper_m:
            current_paper = paper_m.group(1).strip()
            i += 1
            continue

        # Track sections
        sec_m = re.match(r"^SECTION\s+([A-Z]).*", stripped)
        if sec_m:
            current_section = f"Section {sec_m.group(1)}"
            i += 1
            continue

        m = _Q_PATTERN_E.match(stripped)
        if m:
            q_num = int(m.group(1))
            q_marks = int(m.group(2))
            i += 1

            # Collect sub-questions and answers
            current_sub = None
            sub_text_lines = []
            expected_answer = None
            sub_marks = None
            current_field = None
            answer_lines = []

            while i < len(lines):
                cont = lines[i]
                cont_stripped = cont.strip()

                if _Q_PATTERN_E.match(cont_stripped) or cont_stripped.startswith("Mock Paper:"):
                    break

                # Sub-question: (a) text
                sub_m = re.match(r"^\(([a-z])\)\s+(.+)$", cont_stripped)
                if sub_m:
                    # Save previous sub-question
                    if current_sub:
                        if answer_lines:
                            expected_answer = "\n".join(answer_lines).strip()
                        records.append({
                            "question_number": q_num,
                            "question_text": f"({current_sub}) " + " ".join(sub_text_lines).strip(),
                            "answer": expected_answer,
                            "marks": sub_marks or q_marks,
                            "section": current_section,
                            "question_type": None,
                            "options": None,
                            "correct_answer": None,
                            "model_answer": expected_answer,
                            "mark_allocation": None,
                            "target_nodes": [],
                            "paper_id": current_paper,
                            "source_file": file_path,
                            "source_format": "E_acc_mock",
                            "parser_id": PARSER_ID,
                            "parser_version": PARSER_VERSION,
                        })

                    current_sub = sub_m.group(1)
                    sub_text_lines = [sub_m.group(2).strip()]
                    expected_answer = None
                    sub_marks = None
                    answer_lines = []
                    current_field = "question"
                    i += 1
                    continue

                if cont_stripped.startswith("[") and cont_stripped.endswith("marks]"):
                    marks_m = re.match(r"^\[(\d+)\s*marks?\]$", cont_stripped, re.IGNORECASE)
                    if marks_m:
                        sub_marks = int(marks_m.group(1))
                    i += 1
                    continue

                if cont_stripped.startswith("Expected answer:"):
                    answer_lines = [cont_stripped[16:].strip()]
                    current_field = "answer"
                    i += 1
                    continue

                if current_field == "answer" and cont_stripped:
                    answer_lines.append(cont_stripped)
                elif current_field == "question" and cont_stripped:
                    sub_text_lines.append(cont_stripped)

                i += 1

            # Save last sub-question
            if current_sub:
                if answer_lines:
                    expected_answer = "\n".join(answer_lines).strip()
                records.append({
                    "question_number": q_num,
                    "question_text": f"({current_sub}) " + " ".join(sub_text_lines).strip(),
                    "answer": expected_answer,
                    "marks": sub_marks or q_marks,
                    "section": current_section,
                    "question_type": None,
                    "options": None,
                    "correct_answer": None,
                    "model_answer": expected_answer,
                    "mark_allocation": None,
                    "target_nodes": [],
                    "paper_id": current_paper,
                    "source_file": file_path,
                    "source_format": "E_acc_mock",
                    "parser_id": PARSER_ID,
                    "parser_version": PARSER_VERSION,
                })

            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Format F: Econ mock — QUESTION N (Marks) / (i)(ii)(iii) / A. B. C. D. / Correct Answer:
# ---------------------------------------------------------------------------

_Q_PATTERN_F = re.compile(r"^QUESTION\s+(\d+)\s*\((\d+)\s*Marks?\)", re.IGNORECASE)

def _parse_format_f(lines: list[str], file_path: str) -> list[dict]:
    """Parse econ mock format: QUESTION N (Marks) / (i)(ii)(iii) / A. B. C. D. / Correct Answer:"""
    records = []
    i = 0
    current_paper = None
    current_section = None

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Track paper
        if stripped.startswith("--- MOCK PAPER") or stripped.startswith("=== MOCK PAPER"):
            current_paper = stripped
            i += 1
            continue

        # Track sections
        sec_m = re.match(r"^---\s*MOCK PAPER \d+:\s*(SECTION\s+[A-Z]).*---$", stripped)
        if sec_m:
            current_section = sec_m.group(1)
            i += 1
            continue

        m = _Q_PATTERN_F.match(stripped)
        if m:
            q_num = int(m.group(1))
            q_marks = int(m.group(2))
            i += 1

            # Collect sub-questions with options and correct answers
            current_sub = None
            sub_text = []
            options = []
            correct_answer = None
            current_field = None

            while i < len(lines):
                cont = lines[i]
                cont_stripped = cont.strip()

                if _Q_PATTERN_F.match(cont_stripped):
                    break

                # Sub-question: (i) text (may be indented)
                sub_m = re.match(r"^\s*\((i|ii|iii|iv|v)\)\s+(.+)$", cont)
                if sub_m:
                    # Save previous
                    if current_sub:
                        records.append({
                            "question_number": q_num,
                            "question_text": f"({current_sub}) " + " ".join(sub_text).strip(),
                            "answer": correct_answer,
                            "marks": 1,
                            "section": current_section,
                            "question_type": "mcq" if options else None,
                            "options": options if options else None,
                            "correct_answer": correct_answer,
                            "model_answer": None,
                            "mark_allocation": None,
                            "target_nodes": [],
                            "paper_id": current_paper,
                            "source_file": file_path,
                            "source_format": "F_econ_mock",
                            "parser_id": PARSER_ID,
                            "parser_version": PARSER_VERSION,
                        })

                    current_sub = sub_m.group(1)
                    sub_text = [sub_m.group(2).strip()]
                    options = []
                    correct_answer = None
                    current_field = "question"
                    i += 1
                    continue

                # Options: A. B. C. D. (may be indented)
                opt_m = re.match(r"^\s*([A-D])\.\s+(.+)$", cont)
                if opt_m:
                    options.append(f"{opt_m.group(1)}. {opt_m.group(2).strip()}")
                    current_field = "options"
                    i += 1
                    continue

                if cont_stripped.startswith("Correct Answer:"):
                    correct_answer = cont_stripped[15:].strip()
                    current_field = "answer"
                    i += 1
                    continue

                # Also handle indented "Correct Answer:"
                ca_m = re.match(r"^\s*Correct Answer:\s*(.+)$", cont)
                if ca_m:
                    correct_answer = ca_m.group(1).strip()
                    current_field = "answer"
                    i += 1
                    continue

                if current_field == "question" and cont_stripped:
                    sub_text.append(cont_stripped)

                i += 1

            # Save last
            if current_sub:
                records.append({
                    "question_number": q_num,
                    "question_text": f"({current_sub}) " + " ".join(sub_text).strip(),
                    "answer": correct_answer,
                    "marks": 1,
                    "section": current_section,
                    "question_type": "mcq" if options else None,
                    "options": options if options else None,
                    "correct_answer": correct_answer,
                    "model_answer": None,
                    "mark_allocation": None,
                    "target_nodes": [],
                    "paper_id": current_paper,
                    "source_file": file_path,
                    "source_format": "F_econ_mock",
                    "parser_id": PARSER_ID,
                    "parser_version": PARSER_VERSION,
                })

            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Format G: Bio mock — A1. question / (a)(b)(c)(d) inline options (no Answer:)
# ---------------------------------------------------------------------------

_Q_PATTERN_G = re.compile(r"^\s*([A-C])(\d+)\.\s+(.+)$")

def _parse_format_g(lines: list[str], file_path: str) -> list[dict]:
    """Parse bio mock format: A1. question / (a) opt (b) opt (c) opt (d) opt (no Answer: line)."""
    records = []
    i = 0
    current_section = None

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Track sections
        sec_m = re.match(r"^={3,}\s*===\s*(SECTION\s+[A-Z]).*={3,}$", stripped)
        if sec_m:
            current_section = sec_m.group(1)
            i += 1
            continue
        sec_m2 = re.match(r"^===\s*(SECTION\s+[A-Z]).*===?$", stripped)
        if sec_m2:
            current_section = sec_m2.group(1)
            i += 1
            continue

        m = _Q_PATTERN_G.match(line)
        if m:
            sec_letter = m.group(1)
            q_num = int(m.group(2))
            q_text = m.group(3).strip()
            i += 1

            # Check if options are inline in the question text
            options = []
            answer = None

            # Parse inline options: (a) opt (b) opt (c) opt (d) opt
            inline_m = re.match(r"^(.+?)\s*\(a\)\s+(.+?)\s*\(b\)\s+(.+?)\s*\(c\)\s+(.+?)\s*\(d\)\s+(.+)$", q_text)
            if inline_m:
                q_text = inline_m.group(1).strip()
                options = [
                    f"(a) {inline_m.group(2).strip()}",
                    f"(b) {inline_m.group(3).strip()}",
                    f"(c) {inline_m.group(4).strip()}",
                    f"(d) {inline_m.group(5).strip()}",
                ]
            else:
                # Options may be on the next line, indented
                while i < len(lines):
                    cont = lines[i].strip()
                    if _Q_PATTERN_G.match(lines[i]) or cont.startswith("===") or cont.startswith("---"):
                        break
                    # Check for indented options line
                    opt_inline = re.match(r"^\s*\(a\)\s+(.+?)\s*\(b\)\s+(.+?)\s*\(c\)\s+(.+?)\s*\(d\)\s+(.+)$", cont)
                    if opt_inline:
                        options = [
                            f"(a) {opt_inline.group(1).strip()}",
                            f"(b) {opt_inline.group(2).strip()}",
                            f"(c) {opt_inline.group(3).strip()}",
                            f"(d) {opt_inline.group(4).strip()}",
                        ]
                        i += 1
                        continue
                    # Check for Answer: line
                    if cont.startswith("Answer:"):
                        answer = cont[7:].strip()
                        i += 1
                        continue
                    # Check for Reason: line (chem mock)
                    if cont.startswith("Reason:"):
                        i += 1
                        continue
                    break

            records.append({
                "question_number": q_num,
                "question_text": q_text,
                "answer": answer,
                "marks": 2,  # Bio mock MCQs are typically 2 marks
                "section": current_section or f"Section {sec_letter}",
                "question_type": "mcq" if options else None,
                "options": options if options else None,
                "correct_answer": answer,
                "model_answer": None,
                "mark_allocation": None,
                "target_nodes": [],
                "paper_id": None,
                "source_file": file_path,
                "source_format": "G_bio_mock",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Format H: Field-based — YEAR_PATTERN/SECTION/Q_NUMBER/MARKS/QUESTION/MODEL_ANSWER_OUTLINE
# ---------------------------------------------------------------------------

def _parse_format_h(lines: list[str], file_path: str) -> list[dict]:
    """Parse field-based format: YEAR_PATTERN: / SECTION: / Q_NUMBER: / MARKS: / QUESTION: / MODEL_ANSWER_OUTLINE:"""
    records = []
    i = 0
    current_fields = {}
    current_field = None
    current_lines = []

    def flush():
        nonlocal current_fields, current_field, current_lines
        if current_fields and current_fields.get("QUESTION"):
            # Finalize multi-line fields
            if current_field == "MODEL_ANSWER_OUTLINE" and current_lines:
                current_fields["MODEL_ANSWER_OUTLINE"] = "\n".join(current_lines).strip()

            records.append({
                "question_number": int(current_fields.get("Q_NUMBER", 0)) if current_fields.get("Q_NUMBER") else None,
                "question_text": current_fields.get("QUESTION"),
                "answer": current_fields.get("MODEL_ANSWER_OUTLINE"),
                "marks": int(current_fields.get("MARKS", 0)) if current_fields.get("MARKS") else None,
                "section": current_fields.get("SECTION"),
                "question_type": None,
                "options": None,
                "correct_answer": None,
                "model_answer": current_fields.get("MODEL_ANSWER_OUTLINE"),
                "mark_allocation": None,
                "target_nodes": [],
                "paper_id": current_fields.get("YEAR_PATTERN"),
                "source_file": file_path,
                "source_format": "H_field_based",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
        current_fields = {}
        current_field = None
        current_lines = []

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Detect new record: YEAR_PATTERN: starts a new record
        if stripped.startswith("YEAR_PATTERN:"):
            flush()
            current_fields["YEAR_PATTERN"] = stripped[13:].strip()
            current_field = None
            i += 1
            continue

        # Field detection
        field_m = re.match(r"^([A-Z_]+):\s*(.*)$", stripped)
        if field_m and field_m.group(1) in ("SECTION", "Q_NUMBER", "MARKS", "QUESTION", "MODEL_ANSWER_OUTLINE"):
            fname = field_m.group(1)
            fval = field_m.group(2).strip()

            # Finalize previous multi-line field
            if current_field == "MODEL_ANSWER_OUTLINE" and current_lines:
                current_fields["MODEL_ANSWER_OUTLINE"] = "\n".join(current_lines).strip()

            current_fields[fname] = fval
            current_field = fname
            current_lines = [fval] if fval else []
            i += 1
            continue

        # Multi-line continuation for MODEL_ANSWER_OUTLINE
        if current_field == "MODEL_ANSWER_OUTLINE" and stripped:
            current_lines.append(stripped)

        i += 1

    flush()
    return records


# ---------------------------------------------------------------------------
# Format I: AppMath mock — Q1 (Topic, 20 marks): / (a) text [5]
# ---------------------------------------------------------------------------

_Q_PATTERN_I = re.compile(r"^Q(\d+)\s*\((.+?),\s*(\d+)\s*marks?\):\s*(.*)$")

def _parse_format_i(lines: list[str], file_path: str) -> list[dict]:
    """Parse appmath mock format: Q1 (Topic, 20 marks): / (a) text [5]"""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        m = _Q_PATTERN_I.match(stripped)
        if m:
            q_num = int(m.group(1))
            topic = m.group(2).strip()
            q_marks = int(m.group(3))
            q_title = m.group(4).strip()
            i += 1

            # Collect sub-questions (a) text [N]
            while i < len(lines):
                cont = lines[i].strip()
                if _Q_PATTERN_I.match(cont) or cont.startswith("=== MOCK") or cont.startswith("=== SECTION"):
                    break

                sub_m = re.match(r"^\(([a-z])\)\s+(.+)$", cont)
                if sub_m:
                    sub_letter = sub_m.group(1)
                    sub_text = sub_m.group(2).strip()
                    # Extract marks from [N] at end
                    sub_marks = None
                    marks_m = re.search(r"\[(\d+)\]\s*$", sub_text)
                    if marks_m:
                        sub_marks = int(marks_m.group(1))
                        sub_text = re.sub(r"\s*\[\d+\]\s*$", "", sub_text).strip()

                    records.append({
                        "question_number": q_num,
                        "question_text": f"({sub_letter}) {sub_text}",
                        "answer": None,
                        "marks": sub_marks or q_marks,
                        "section": topic,
                        "question_type": None,
                        "options": None,
                        "correct_answer": None,
                        "model_answer": None,
                        "mark_allocation": None,
                        "target_nodes": [],
                        "paper_id": None,
                        "source_file": file_path,
                        "source_format": "I_appmath_mock",
                        "parser_id": PARSER_ID,
                        "parser_version": PARSER_VERSION,
                    })

                i += 1
            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Format J: Bio past_paper — (a) [1 mark] text -> answer
# ---------------------------------------------------------------------------

def _parse_format_j(lines: list[str], file_path: str) -> list[dict]:
    """Parse bio past_paper format: (a) [1 mark] question text -> answer"""
    records = []
    i = 0
    current_section = None
    current_q = None

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Track sections
        sec_m = re.match(r"^===\s*(SECTION\s+[A-Z]).*===?$", stripped)
        if sec_m:
            current_section = sec_m.group(1)
            i += 1
            continue

        # Track question headers: --- Q1 (20 marks): title ---
        qh_m = re.match(r"^---\s*Q(\d+)\s*\((\d+)\s*marks?\):\s*(.+)\s*---$", stripped)
        if qh_m:
            current_q = int(qh_m.group(1))
            i += 1
            continue

        # Sub-question: (a) [1 mark] text -> answer
        sub_m = re.match(r"^\(([a-z])\)\s*\[(\d+)\s*marks?\]\s*(.+?)\s*->\s*(.+)$", stripped)
        if sub_m:
            sub_letter = sub_m.group(1)
            sub_marks = int(sub_m.group(2))
            sub_text = sub_m.group(3).strip()
            answer = sub_m.group(4).strip()

            records.append({
                "question_number": current_q,
                "question_text": f"({sub_letter}) {sub_text}",
                "answer": answer,
                "marks": sub_marks,
                "section": current_section,
                "question_type": None,
                "options": None,
                "correct_answer": answer,
                "model_answer": None,
                "mark_allocation": None,
                "target_nodes": [],
                "paper_id": None,
                "source_file": file_path,
                "source_format": "J_bio_past",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
            i += 1
            continue

        # Sub-question without answer: (a) [1 mark] text
        sub_m2 = re.match(r"^\(([a-z])\)\s*\[(\d+)\s*marks?\]\s*(.+)$", stripped)
        if sub_m2:
            sub_letter = sub_m2.group(1)
            sub_marks = int(sub_m2.group(2))
            sub_text = sub_m2.group(3).strip()

            records.append({
                "question_number": current_q,
                "question_text": f"({sub_letter}) {sub_text}",
                "answer": None,
                "marks": sub_marks,
                "section": current_section,
                "question_type": None,
                "options": None,
                "correct_answer": None,
                "model_answer": None,
                "mark_allocation": None,
                "target_nodes": [],
                "paper_id": None,
                "source_file": file_path,
                "source_format": "J_bio_past",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })
            i += 1
            continue

        i += 1

    return records


# ---------------------------------------------------------------------------
# Main parser
# ---------------------------------------------------------------------------

_FORMAT_DISPATCH = {
    "A_mock_structured": _parse_format_a,
    "B_q_answer": _parse_format_b,
    "C_board_style": _parse_format_c,
    "D_past_paper": _parse_format_d,
    "E_acc_mock": _parse_format_e,
    "F_econ_mock": _parse_format_f,
    "G_bio_mock": _parse_format_g,
    "H_field_based": _parse_format_h,
    "I_appmath_mock": _parse_format_i,
    "J_bio_past": _parse_format_j,
}


def parse_file(file_path: Path) -> list[dict]:
    """Parse a paper .marker file into a list of question records."""
    content = file_path.read_text(encoding="utf-8-sig")
    lines = content.split("\n")

    fmt = _detect_format(lines)
    if fmt == "unknown":
        return []

    parser_func = _FORMAT_DISPATCH[fmt]
    records = parser_func(lines, str(file_path))

    # Post-processing: extract inline (Node cXX_XXX_NNN) references from
    # question text and add them to target_nodes. Many source files embed
    # node references directly in the question text like:
    #   "(a) Define CAS. (Node c11_acc_038)"
    # but the format-specific parsers only look for explicit "Target node:"
    # lines. This catches the inline references that were being missed.
    _INLINE_NODE_RE = re.compile(r"\(Node\s+(c\d+_[a-z]+(?:_[a-z]+)*_\d+)\)", re.IGNORECASE)
    _BARE_NODE_RE = re.compile(r"\b(c\d+_[a-z]+(?:_[a-z]+)*_\d+)\b", re.IGNORECASE)

    for rec in records:
        existing = set(rec.get("target_nodes", []) or [])
        qt = rec.get("question_text", "") or ""
        # First try (Node cXX_XXX_NNN) pattern — most explicit
        for m in _INLINE_NODE_RE.finditer(qt):
            existing.add(m.group(1).lower())
        # If still no nodes, try bare node IDs in question text
        if not existing:
            for m in _BARE_NODE_RE.finditer(qt):
                existing.add(m.group(1).lower())
        # Also scan answer and model_answer
        for field in ["answer", "model_answer", "marking_scheme"]:
            val = rec.get(field, "") or ""
            for m in _INLINE_NODE_RE.finditer(val):
                existing.add(m.group(1).lower())
        if existing:
            rec["target_nodes"] = sorted(existing)

    return records


def register():
    """Register this parser with the parser registry."""
    from backend.content_parsers.parser_registry import register_parser

    register_parser(
        content_type=CONTENT_TYPE,
        version=PARSER_VERSION,
        description="Parses mock_papers, past_papers, question_papers, and "
                    "board_style_questions .marker files. Auto-detects 6 formats: "
                    "A_mock_structured, B_q_answer, C_board_style, D_past_paper, "
                    "E_acc_mock, F_econ_mock.",
        parse_func=parse_file,
        parser_id=PARSER_ID,
        tier=1,
    )
