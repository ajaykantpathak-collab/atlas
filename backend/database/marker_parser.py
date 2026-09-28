"""Parse CISCE enrichment .marker files into structured node dictionaries.

The .marker format is YAML-like:
    --- NODE c10_phy_001 ---
    TITLE: Turning effect of force and principle of moments
    DEFINITION: |
      multi-line indented content
    TEXT_WALKTHROUGH: |
      multi-line indented content
    ELI5: |
      multi-line content
    COMMON_MISCONCEPTION: |
      multi-line content
    DIAGNOSTIC_QUESTION: |
      Q1 (recall): ...
      Answer: ...
      Q2 (reasoning): ...
      Answer: ...
    ON_FAILURE: |
      Q1 fails -> Review c8_phy_011 -- ...
    COGNITIVE_LEVEL: analyze
    MASTERY_CRITERIA: |
      multi-line content
    SCOPE_BOUNDARY: |
      multi-line content

This parser extracts each section's raw text. The diagnostic questions and
ON_FAILURE entries are further parsed into structured sub-objects.
"""

import re
from typing import Optional

# --- Section key pattern ---------------------------------------------------
# Matches "KEY: value" (single-line) or "KEY: |" (multi-line block scalar).
# Section keys are uppercase + underscore identifiers at the start of a line.
SECTION_KEY_RE = re.compile(r'^([A-Z][A-Z0-9_]+):\s*(.*)$', re.MULTILINE)

# Node header: "--- NODE c10_phy_001 ---" or "--- NODE c10_physics_question_bank ---"
NODE_HEADER_RE = re.compile(r'^---\s+NODE\s+([a-zA-Z0-9_]+)\s+---', re.MULTILINE)

# All known enrichment section keys
ENRICHMENT_KEYS = {
    "TITLE", "DEFINITION", "TEXT_WALKTHROUGH", "ELI5",
    "COMMON_MISCONCEPTION", "DIAGNOSTIC_QUESTION", "ON_FAILURE",
    "COGNITIVE_LEVEL", "MASTERY_CRITERIA", "SCOPE_BOUNDARY",
    "NODE_ID", "CLASS", "SUBJECT", "UNIT", "CHAPTER",
    "SYLLABUS", "EXAMPLES",
}

# Diagnostic question pattern: "Q1 (recall): ..." or "Q1. ..."
DIAG_Q_RE = re.compile(
    r'Q(\d+)\s*(?:\((\w+)\))?\s*[:.]\s*(.*?)(?=\nAnswer:|\nQ\d+|\Z)',
    re.DOTALL,
)
# Answer block: "Answer: ..." until next Q or end
DIAG_ANSWER_RE = re.compile(r'Answer:\s*(.*?)(?=\nQ\d+|\Z)', re.DOTALL)

# ON_FAILURE pattern: "Q1 fails -> Review c8_phy_011 -- ..."
ON_FAILURE_RE = re.compile(
    r'Q(\d+)\s+fails?\s*->\s*(.*?)(?=\n\s*Q\d+\s+fails?|\Z)',
    re.DOTALL,
)


def _strip_block(text: str) -> str:
    """Strip YAML block-scalar indentation from multi-line text.

    The .marker format uses 2-space indentation for block scalars. We remove
    the common leading whitespace from all lines, then strip trailing whitespace.
    """
    if not text:
        return ""
    lines = text.split("\n")
    # Find minimum indentation of non-empty lines (typically 2 spaces)
    non_empty = [ln for ln in lines if ln.strip()]
    if not non_empty:
        return ""
    min_indent = min(len(ln) - len(ln.lstrip(" ")) for ln in non_empty)
    stripped = [ln[min_indent:] if ln.strip() else ln for ln in lines]
    return "\n".join(stripped).strip()


def parse_marker_sections(content: str) -> dict[str, str]:
    """Parse a single node's content block into a dict of {KEY: text}.

    Handles both single-line values ("KEY: value") and multi-line block
    scalars ("KEY: |" followed by indented content).
    """
    sections: dict[str, str] = {}
    matches = list(SECTION_KEY_RE.finditer(content))

    for i, m in enumerate(matches):
        key = m.group(1)
        inline_value = m.group(2).strip()
        # Content between this key and the next key (or end of block)
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(content)
        remainder = content[start:end]

        if inline_value == "|" or inline_value == "|-" or inline_value == "|+":
            # Multi-line block scalar: remainder is the indented content
            sections[key] = _strip_block(remainder)
        elif inline_value == ">" or inline_value == ">-":
            # Folded scalar: treat same as block but collapse newlines to spaces
            sections[key] = " ".join(_strip_block(remainder).split())
        elif inline_value:
            # Single-line value
            sections[key] = inline_value
        else:
            # KEY: with no inline value — could be a block without | marker
            # Check if remainder has indented content
            if remainder.strip():
                sections[key] = _strip_block(remainder)
            else:
                sections[key] = ""
    return sections


def parse_enrichment_file(filepath: str) -> list[dict]:
    """Parse an enrichment .marker file and return a list of node dicts.

    Each dict has keys: node_id, title, definition, text_walkthrough, eli5,
    common_misconception, diagnostic_questions, on_failure, cognitive_level,
    mastery_criteria, scope_boundary.
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    nodes: list[dict] = []
    # Split by node headers
    parts = NODE_HEADER_RE.split(content)
    # parts[0] is preamble, then alternating: node_id, content, node_id, content...
    for i in range(1, len(parts), 2):
        node_id = parts[i]
        node_content = parts[i + 1] if i + 1 < len(parts) else ""
        sections = parse_marker_sections(node_content)
        nodes.append(_build_enrichment_node(node_id, sections))
    return nodes


def _build_enrichment_node(node_id: str, sections: dict[str, str]) -> dict:
    """Build a structured node dict from parsed sections."""
    diag_questions = _parse_diagnostic_questions(
        sections.get("DIAGNOSTIC_QUESTION", "")
    )
    on_failure = _parse_on_failure(sections.get("ON_FAILURE", ""))
    cognitive_level = sections.get("COGNITIVE_LEVEL", "").strip().lower()

    # Derive difficulty from cognitive level (Bloom's taxonomy)
    difficulty = _cognitive_level_to_difficulty(cognitive_level)

    return {
        "node_id": node_id,
        "title": sections.get("TITLE", "").strip(),
        "definition": sections.get("DEFINITION", "").strip(),
        "text_walkthrough": sections.get("TEXT_WALKTHROUGH", "").strip(),
        "eli5": sections.get("ELI5", "").strip(),
        "common_misconception": sections.get("COMMON_MISCONCEPTION", "").strip(),
        "diagnostic_questions": diag_questions,
        "on_failure": on_failure,
        "cognitive_level": cognitive_level,
        "mastery_criteria": sections.get("MASTERY_CRITERIA", "").strip(),
        "scope_boundary": sections.get("SCOPE_BOUNDARY", "").strip(),
        "difficulty": difficulty,
    }


def _parse_diagnostic_questions(text: str) -> list[dict]:
    """Parse DIAGNOSTIC_QUESTION block into structured Q&A pairs.

    Returns list of dicts: {number, cognitive_type, question, answer}.
    """
    if not text.strip():
        return []
    questions: list[dict] = []
    # Find all Q positions
    q_matches = list(re.finditer(
        r'Q(\d+)\s*(?:\((\w+)\))?\s*[:.]\s*', text
    ))
    for i, qm in enumerate(q_matches):
        q_num = int(qm.group(1))
        q_type = qm.group(2) or ""
        # Question text: from after the Q header to "Answer:" or next Q
        q_start = qm.end()
        # Find "Answer:" after this question
        answer_match = re.search(r'\nAnswer:\s*', text[q_start:])
        if answer_match:
            question_text = text[q_start:q_start + answer_match.start()].strip()
            answer_start = q_start + answer_match.end()
            # Answer goes until next Q or end
            next_q = re.search(r'\nQ\d+', text[answer_start:])
            if next_q:
                answer_text = text[answer_start:answer_start + next_q.start()].strip()
            else:
                answer_text = text[answer_start:].strip()
        else:
            # No Answer: marker — question text is everything until next Q
            if i + 1 < len(q_matches):
                question_text = text[q_start:q_matches[i + 1].start()].strip()
            else:
                question_text = text[q_start:].strip()
            answer_text = ""
        questions.append({
            "number": q_num,
            "cognitive_type": q_type.lower(),
            "question": question_text,
            "answer": answer_text,
        })
    return questions


def _parse_on_failure(text: str) -> list[dict]:
    """Parse ON_FAILURE block into structured remediation entries.

    Returns list of dicts: {question_number, remediation_text, review_node_ids}.
    """
    if not text.strip():
        return []
    entries: list[dict] = []
    # Split by "Q<N> fails ->" pattern (allow leading whitespace after newline)
    parts = re.split(r'\n\s*(?=Q\d+\s+fails)', text.strip())
    for part in parts:
        part = part.strip()
        if not part:
            continue
        m = re.match(r'Q(\d+)\s+fails?\s*->\s*(.*)', part, re.DOTALL)
        if m:
            q_num = int(m.group(1))
            remediation = m.group(2).strip()
            # Extract referenced node IDs (cN_subj_NNN pattern)
            review_nodes = re.findall(r'c\d+_\w+_\d+', remediation)
            entries.append({
                "question_number": q_num,
                "remediation_text": remediation,
                "review_node_ids": review_nodes,
            })
    return entries


def _cognitive_level_to_difficulty(level: str) -> str:
    """Map Bloom's cognitive level to difficulty (easy/medium/hard)."""
    level = level.lower().strip()
    # Lower-order thinking -> easy
    if level in ("remember", "recall", "understand", "memorize"):
        return "easy"
    # Higher-order thinking -> hard
    if level in ("analyze", "evaluate", "create", "synthesis", "evaluation"):
        return "hard"
    # Middle-order -> medium
    return "medium"


# ---------------------------------------------------------------------------
# Question bank parsing
# ---------------------------------------------------------------------------

# Question patterns:
#   "Q1. ... (2 marks)"        -- standard question bank
#   "Q1 [BASIC] (1 mark): ..."  -- drill bank
#   "(a) ... (i) ... (ii) ..."  -- mock paper MCQ
#   "Question 1 ..."            -- some past papers
QB_QUESTION_RE = re.compile(
    r'Q(\d+)[.:\s]+\s*(?:\[\w+\]\s*)?(?:\((\d+)\s*marks?\)\s*)?:?\s*(.*?)(?=\nAnswer:|\nQ\d+[.:\s]|\n===|\Z)',
    re.DOTALL,
)
# Also match "Q1 [BASIC] (1 mark):" format from drill banks
QB_DRILL_RE = re.compile(
    r'Q(\d+)\s*(?:\[\w+\]\s*)?\((\d+)\s*marks?\):\s*(.*?)(?=\nQ\d+\s*(?:\[|\()|\n===|\Z)',
    re.DOTALL,
)
# Marks pattern: "(2 marks)" or "(3 marks)" or "(1 mark)"
QB_MARKS_RE = re.compile(r'\((\d+)\s*marks?\)', re.IGNORECASE)
# Section header: "=== SECTION 1: Force ===" or "=== TOPIC 1: ... ==="
QB_SECTION_RE = re.compile(r'===\s*(?:SECTION|TOPIC|MOCK|SECTION)\s*\d*[:\s]*\s*(.+?)\s*===', re.IGNORECASE)
# Sub-question pattern: "(a) ..." for mock papers
QB_SUBQ_RE = re.compile(r'\([a-z]\)\s*(.*?)(?=\n\([a-z]\)|\nAnswer:|\nQ\d+|\n===|\Z)', re.DOTALL)


def parse_question_bank_file(filepath: str) -> dict:
    """Parse a question bank .marker file.

    Returns dict with metadata and a list of questions:
    {node_id, title, class_level, subject, questions: [{number, question, answer, marks, section}]}
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Parse the header node
    parts = NODE_HEADER_RE.split(content)
    if len(parts) < 3:
        # No node header — try parsing the whole content as body
        node_id = ""
        header_content = content
        sections = {}
    else:
        node_id = parts[1]
        header_content = parts[2] if len(parts) > 2 else ""
        sections = parse_marker_sections(header_content)

    # Find where the questions start
    body = header_content
    # Try to find the first section header, Q1, or sub-question
    section_start = re.search(r'===\s*(?:SECTION|TOPIC|MOCK)', header_content)
    q_start = re.search(r'Q\d+[.::\s]', header_content)
    subq_start = re.search(r'\([a-z]\)', header_content)
    if section_start:
        body = header_content[section_start.start():]
    elif q_start:
        body = header_content[q_start.start():]
    elif subq_start:
        body = header_content[subq_start.start():]

    # Parse questions from body — rich inline formats first (they carry
    # options/answers/node tags), then legacy formats
    questions = _parse_inline_questions(header_content)
    if not questions:
        questions = _parse_diag_questions(header_content)

    if not questions:
        questions = _parse_qb_questions(body)

    # If no questions found with main parser, try drill bank format
    if not questions:
        questions = _parse_drill_questions(body)

    # If still no questions, try sub-question (a)(b)(c) format
    if not questions:
        questions = _parse_subquestions(body)

    return {
        "node_id": node_id,
        "title": sections.get("TITLE", "").strip(),
        "class_level": _safe_int(sections.get("CLASS", "0")),
        "subject": sections.get("SUBJECT", "").strip(),
        "chapter": sections.get("CHAPTER", "").strip(),
        "questions": questions,
    }


def _parse_qb_questions(body: str) -> list[dict]:
    """Parse question bank body into structured Q&A pairs.

    Handles "Q1. ... (2 marks) Answer: ..." format.
    """
    questions: list[dict] = []
    current_section = ""

    q_matches = list(re.finditer(
        r'Q(\d+)[.:\s]+\s*(.*?)(?=\nAnswer:|\nQ\d+[.:\s]|\n===|\Z)',
        body, re.DOTALL,
    ))

    for i, qm in enumerate(q_matches):
        q_num = int(qm.group(1))
        q_text = qm.group(2).strip()

        # Find section for this question
        preceding = body[:qm.start()]
        section_matches = list(QB_SECTION_RE.finditer(preceding))
        if section_matches:
            current_section = section_matches[-1].group(1).strip()

        # Extract marks from question text
        marks_match = QB_MARKS_RE.search(q_text)
        marks = int(marks_match.group(1)) if marks_match else 1
        q_text_clean = QB_MARKS_RE.sub("", q_text).strip()

        # Find answer
        q_end = qm.end()
        answer_match = re.search(r'\nAnswer:\s*', body[q_end:])
        if answer_match:
            answer_start = q_end + answer_match.end()
            next_q = re.search(r'\nQ\d+[.:\s]', body[answer_start:])
            next_section = re.search(r'\n===', body[answer_start:])
            end_positions = []
            if next_q:
                end_positions.append(next_q.start())
            if next_section:
                end_positions.append(next_section.start())
            if end_positions:
                answer_text = body[answer_start:answer_start + min(end_positions)].strip()
            else:
                answer_text = body[answer_start:].strip()
        else:
            answer_text = ""

        # Skip empty questions
        if not q_text_clean:
            continue

        questions.append({
            "number": q_num,
            "question": q_text_clean,
            "answer": answer_text,
            "marks": marks,
            "section": current_section,
        })
    return questions


def _parse_drill_questions(body: str) -> list[dict]:
    """Parse drill bank format: "Q1 [BASIC] (1 mark): ..."

    Drill banks have questions without inline answers.
    """
    questions: list[dict] = []
    current_section = ""

    # Match Q1 [BASIC] (1 mark): ... or Q1 (2 marks): ...
    q_matches = list(re.finditer(
        r'Q(\d+)\s*(?:\[\w+\]\s*)?\((\d+)\s*marks?\):\s*(.*?)(?=\nQ\d+\s*(?:\[|\()|\n===|\Z)',
        body, re.DOTALL,
    ))

    for qm in q_matches:
        q_num = int(qm.group(1))
        marks = int(qm.group(2))
        q_text = qm.group(3).strip()

        preceding = body[:qm.start()]
        section_matches = list(QB_SECTION_RE.finditer(preceding))
        if section_matches:
            current_section = section_matches[-1].group(1).strip()

        if not q_text:
            continue

        questions.append({
            "number": q_num,
            "question": q_text,
            "answer": "",  # drill banks often have answers at the end
            "marks": marks,
            "section": current_section,
        })
    return questions


def _parse_subquestions(body: str) -> list[dict]:
    """Parse mock paper format: "(a) ... (i) ... (ii) ... Answer: (ii) ..."

    Each sub-question (a), (b), (c) is treated as a separate question.
    """
    questions: list[dict] = []
    current_section = ""
    q_num = 0

    # Match (a) ... until next (x) or Answer: or ===
    sub_matches = list(re.finditer(
        r'\(([a-z])\)\s*(.*?)(?=\n\([a-z]\)|\nAnswer:|\n===|\Z)',
        body, re.DOTALL,
    ))

    for sm in sub_matches:
        letter = sm.group(1)
        q_text = sm.group(2).strip()
        if not q_text or len(q_text) < 5:
            continue

        q_num += 1

        preceding = body[:sm.start()]
        section_matches = list(QB_SECTION_RE.finditer(preceding))
        if section_matches:
            current_section = section_matches[-1].group(1).strip()

        # Find answer
        q_end = sm.end()
        answer_match = re.search(r'Answer:\s*(.*?)(?=\n\([a-z]\)|\nQ\d+|\n===|\Z)', body[q_end:], re.DOTALL)
        answer_text = answer_match.group(1).strip() if answer_match else ""

        questions.append({
            "number": q_num,
            "question": f"({letter}) {q_text}",
            "answer": answer_text,
            "marks": 1,
            "section": current_section,
        })
    return questions


def _safe_int(value: str) -> int:
    """Safely parse an int from a string, returning 0 on failure."""
    try:
        return int(str(value).strip())
    except (ValueError, TypeError):
        return 0


# ---------------------------------------------------------------------------
# Rich one-line formats (carry answers/options inline)
# ---------------------------------------------------------------------------

# "Question: Q001, c11_acc_001, 1, MCQ, "text", OPTIONS: ..., CORRECT_ANSWER: ...,
#  MARKING_SCHEME: ..., MODEL_ANSWER: ..."
INLINE_Q_RE = re.compile(
    r'^Question:\s*Q(\d+)\s*,\s*([A-Za-z0-9_]+)\s*,\s*(\d+)\s*,\s*([A-Za-z_]+)\s*,\s*'
    r'(.*?)(?=^Question:|\n===|\Z)',
    re.MULTILINE | re.DOTALL,
)
# "Diag Question: DQ_C11_ACC_001, c11_acc_001, question, correct, wrong1, wrong2,
#  REMEDIATION: ..."
DIAG_Q_RE = re.compile(
    r'^Diag\s+Question:\s*([A-Za-z0-9_]+)\s*,\s*([A-Za-z0-9_]+)\s*,\s*'
    r'(.*?)(?=^Diag\s+Question:|\n===|\Z)',
    re.MULTILINE | re.DOTALL,
)
_QTAG_RE = re.compile(r'^(.*?),?\s*REMEDIATION:\s*(.*)$', re.DOTALL)
_OPTION_RE = re.compile(r'\(([A-E])\)\s*([^()]+?)(?=\s*\([A-E]\)|,?\s*$)')


def _split_top_commas(text: str) -> list[str]:
    """Split on ', ' (comma+space) not inside quotes/parens.

    Comma+space is the field separator in diag markers; bare commas inside
    numbers like Rs.8,00,000 are preserved.
    """
    parts, depth, cur, in_q, i = [], 0, [], False, 0
    n = len(text)
    while i < n:
        ch = text[i]
        if ch == '"':
            in_q = not in_q
        elif not in_q:
            if ch == '(':
                depth += 1
            elif ch == ')':
                depth = max(0, depth - 1)
            elif ch == ',' and depth == 0 and i + 1 < n and text[i + 1] == ' ':
                parts.append(''.join(cur).strip())
                cur = []
                i += 2
                continue
        cur.append(ch)
        i += 1
    parts.append(''.join(cur).strip())
    return [p for p in parts if p]


def _field(body: str, name: str) -> str:
    m = re.search(rf'{name}:\s*(.*?)(?=,\s*[A-Z_]+:|$)', body, re.DOTALL)
    return m.group(1).strip().strip('"') if m else ""


def _parse_inline_questions(body: str) -> list[dict]:
    """Parse 'Question: Q001, node, marks, TYPE, "text", OPTIONS:...' format."""
    questions: list[dict] = []
    current_section = ""
    for qm in INLINE_Q_RE.finditer(body):
        q_num, node_id, marks, q_type, rest = (
            int(qm.group(1)), qm.group(2), int(qm.group(3)),
            qm.group(4).upper(), qm.group(5),
        )
        preceding = body[:qm.start()]
        sec = list(QB_SECTION_RE.finditer(preceding))
        if sec:
            current_section = sec[-1].group(1).strip()

        qtext = rest.strip()
        for tag in ("OPTIONS:", "CORRECT_ANSWER:", "MARKING_SCHEME:", "MODEL_ANSWER:"):
            idx = qtext.find(", " + tag)
            if idx != -1:
                qtext = qtext[:idx]
        qtext = qtext.strip().strip('"').strip()

        options = []
        opt_field = _field(rest, "OPTIONS")
        if opt_field:
            options = [
                {"letter": m.group(1), "text": m.group(2).strip()}
                for m in _OPTION_RE.finditer(opt_field)
            ]

        if not qtext:
            continue
        questions.append({
            "number": q_num,
            "node_id": node_id,
            "question": qtext,
            "q_type": q_type.lower(),
            "options": options,
            "answer": _field(rest, "CORRECT_ANSWER"),
            "marking_scheme": _field(rest, "MARKING_SCHEME"),
            "model_answer": _field(rest, "MODEL_ANSWER"),
            "marks": marks,
            "section": current_section,
        })
    return questions


def _parse_diag_questions(body: str) -> list[dict]:
    """Parse 'Diag Question: DQ_ID, node, q, correct, wrong1, wrong2, REMEDIATION:...'"""
    questions: list[dict] = []
    for qm in DIAG_Q_RE.finditer(body):
        q_id, node_id, rest = qm.group(1), qm.group(2), qm.group(3)
        rtag = _QTAG_RE.match(rest)
        fields_part, remediation = (rtag.group(1), rtag.group(2).strip()) if rtag else (rest, "")
        fields = _split_top_commas(fields_part)
        if len(fields) < 2:
            continue
        # The question may itself contain ', ' — it ends at the first field
        # containing a question mark; answers follow.
        q_end = next((i for i, f in enumerate(fields) if '?' in f), 0)
        qtext = ', '.join(fields[:q_end + 1]).strip()
        ans_fields = fields[q_end + 1:]
        if len(ans_fields) >= 3:
            correct = ', '.join(ans_fields[:-2]).strip()
            wrongs = [f.strip() for f in ans_fields[-2:]]
        elif ans_fields:
            correct = ', '.join(ans_fields).strip()
            wrongs = []
        else:
            correct = ""
            wrongs = []
        options = [{"letter": "A", "text": correct}] + [
            {"letter": chr(ord('B') + i), "text": w} for i, w in enumerate(wrongs) if w
        ]
        questions.append({
            "number": 0,
            "q_id": q_id,
            "node_id": node_id,
            "question": qtext,
            "q_type": "mcq",
            "options": options,
            "answer": correct,
            "marking_scheme": "",
            "model_answer": remediation,
            "marks": 1,
            "section": "diagnostic",
        })
    return questions


def parse_model_answers_file(filepath: str) -> list[dict]:
    """Parse a model_answers marker into blocks keyed by node ids.

    Format: MODEL ANSWER N / QUESTION_REFERENCE: c11_x_001 / Q. text [marks]
    / FULL_MODEL_ANSWER / MARKING_SCHEME / EXAMINER_COMMENT / ALTERNATIVE_ANSWERS
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    blocks: list[dict] = []
    for bm in re.finditer(
        r'MODEL\s+ANSWER\s+\d+\s*(.*?)(?=\n-+\s*\n?MODEL\s+ANSWER\s+\d+|\Z)',
        content, re.DOTALL,
    ):
        body = bm.group(1)
        ref = re.search(r'QUESTION_REFERENCE:\s*([A-Za-z0-9_/\s,]+)', body)
        nodes = re.findall(r'c\d+_\w+?_\d+', ref.group(1)) if ref else []
        qm = re.search(r'Q\.\s*(.*?)(?:\[\d+\s*marks?\])?\s*\n', body)
        blocks.append({
            "node_ids": nodes,
            "question": qm.group(1).strip() if qm else "",
            "model_answer": _field(body, "FULL_MODEL_ANSWER"),
            "marking_scheme": _field(body, "MARKING_SCHEME"),
            "examiner_note": _field(body, "EXAMINER_COMMENT"),
            "alternatives": _field(body, "ALTERNATIVE_ANSWERS"),
        })
    return [b for b in blocks if b["model_answer"]]


def _norm_text(t: str) -> str:
    return re.sub(r'[^a-z0-9 ]', '', t.lower())


def text_overlap(a: str, b: str) -> float:
    """Fraction of shorter string's word-tokens present in the longer one."""
    sa, sb = set(_norm_text(a).split()), set(_norm_text(b).split())
    if not sa or not sb:
        return 0.0
    small, big = (sa, sb) if len(sa) <= len(sb) else (sb, sa)
    return len(small & big) / len(small)


def parse_answer_key_file(filepath: str) -> dict[int, dict]:
    """Parse a *_answers marker into {q_number: {model_answer, marking_scheme,
    examiner_note, node_id}}."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    answers: dict[int, dict] = {}
    blocks = re.finditer(
        r'Answer:\s*Q(\d+)\s*(.*?)(?=\nAnswer:\s*Q\d+|\n={3,}|\Z)',
        content, re.DOTALL,
    )
    for bm in blocks:
        q_num, body = int(bm.group(1)), bm.group(2)
        node = re.search(r'TOPIC:\s*([A-Za-z0-9_]+)', body)
        answers[q_num] = {
            "node_id": node.group(1) if node else "",
            "model_answer": _field(body, "MODEL_ANSWER"),
            "marking_scheme": _field(body, "MARKING_SCHEME"),
            "examiner_note": _field(body, "EXAMINER_NOTE"),
        }
    return answers
