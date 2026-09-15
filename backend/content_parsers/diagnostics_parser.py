"""Diagnostics parser — parses diagnostic .marker files into diagnostic records.

Two source directories per subject:
  diagnostics/            — CFQ sets, section-based tests, Diagnostic: lines
  diagnostic_questions/   — DQ blocks, Q:/CORRECT: pairs, Diag Question: lines

Formats detected (8 total):

diagnostics/:
  A_cfq       — CFQ X.Y [Cognitive: level]: "q" / Correct answer / W1-W3 / Concept trap / Remediation
  B_section   — === DIAGNOSTIC N: Title === / QUESTIONS: / SCORING: / REMEDIATION:
  C_diag_line — Diagnostic: ID, TOPIC, "q", CORRECT_ANSWER: "...", WHAT_WRONG_ANSWER_INDICATES: "...", REMEDIATION_PATH: "..."
  D_evs_diag  — DIAGNOSTIC N: TITLE / Node: / Cognitive: / Pre-test question: / Target: / Content:

diagnostic_questions/:
  E_dq_block  — --- DQ_... --- / QID: / TOPIC_TAG: / COGNITIVE_LEVEL: / TARGET_NODE: / QUESTION: / ANSWER:
  F_q_correct — Q1: question / CORRECT: ... / COMMON WRONG: ... / REVEALS: ...
  G_diag_q    — Diag Question: Q_ID, TOPIC, QUESTION, CORRECT_ANSWER, WRONG_1, WRONG_2, REMEDIATION: ...
  H_evs_dq    — Q1: question / EXPECTED ANSWER: ... / COMMON WRONG ANSWER: ... / FOLLOW-UP: ...

Output: list of dicts with normalized keys:
    diagnostic_id, question_text, correct_answer, wrong_answers (list),
    concept_trap, remediation, cognitive_level, target_nodes (list),
    topic_tag, scoring, source_file, source_format, parser_id, parser_version
"""

import re
from pathlib import Path
from typing import Optional

PARSER_ID = "diagnostics_v1"
PARSER_VERSION = "1.0.0"
CONTENT_TYPE = "diagnostics"


# ---------------------------------------------------------------------------
# Format detection
# ---------------------------------------------------------------------------

def _detect_format(lines: list[str], file_path: str = "") -> str:
    """Detect which diagnostic format a file uses."""
    sample = "\n".join(lines[:300])

    # Format C: Diagnostic: ID, TOPIC, "q", CORRECT_ANSWER: ...
    if re.search(r"^Diagnostic:\s+\w+,\s*.+?,\s*\"", sample, re.MULTILINE):
        return "C_diag_line"

    # Format G: Diag Question: Q_ID, TOPIC, QUESTION, ...
    if re.search(r"^Diag Question:\s+\S+,\s*c\d+_\w+,", sample, re.MULTILINE):
        return "G_diag_q"

    # Format E: --- DQ_... --- blocks with QID: field
    if re.search(r"^---\s+DQ_", sample, re.MULTILINE) and re.search(r"^QID:", sample, re.MULTILINE):
        return "E_dq_block"

    # Format A: CFQ X.Y [Cognitive: level]: "question" OR CFQ X.Y: "question"
    if re.search(r"CFQ\s+\d+\.\d+\s*(?:\[Cognitive:|:\s*\")", sample, re.MULTILINE):
        return "A_cfq"

    # Format I: Bio CFQ — Q1. question / A. B. OK C. D. / WRONG ANSWER ANALYSIS: / REMEDIATION:
    if re.search(r"^\s*Q\d+\.\s+.+", sample, re.MULTILINE) and "WRONG ANSWER ANALYSIS:" in sample:
        return "I_bio_cfq"

    # Format B: === DIAGNOSTIC N: Title === with QUESTIONS:
    if re.search(r"===\s*DIAGNOSTIC\s+\d+", sample, re.MULTILINE) and "QUESTIONS:" in sample:
        return "B_section"

    # Format J: AppMath diagnostics — === DIAGNOSTIC N: TITLE === / Q1: q A: answer
    if re.search(r"===\s*DIAGNOSTIC\s+\d+", sample, re.MULTILINE) and re.search(r"^Q\d+:\s+.+\s*A:\s*", sample, re.MULTILINE):
        return "J_appmath_diag"

    # Format D: EVS diagnostics — DIAGNOSTIC N: TITLE / Pre-test question:
    if re.search(r"DIAGNOSTIC\s+\d+:", sample, re.MULTILINE) and "Pre-test question:" in sample:
        return "D_evs_diag"

    # Format F: Q1: question / CORRECT: ...
    if re.search(r"^\s*Q\d+:\s+", sample, re.MULTILINE) and re.search(r"^\s*CORRECT:", sample, re.MULTILINE):
        return "F_q_correct"

    # Format H: EVS diagnostic_questions — Q1: question / EXPECTED ANSWER:
    if re.search(r"^\s*Q\d+:\s+", sample, re.MULTILINE) and re.search(r"^\s*EXPECTED\s*ANSWER:", sample, re.MULTILINE | re.IGNORECASE):
        return "H_evs_dq"

    return "unknown"


# ---------------------------------------------------------------------------
# Format A: CFQ — CFQ X.Y [Cognitive: level]: "q" / Correct / W1-W3 / Trap / Remediation
# ---------------------------------------------------------------------------

_CFQ_PATTERN = re.compile(
    r'^\s*CFQ\s+(\d+)\.(\d+)\s*(?:\[Cognitive:\s*(\w+)\]\s*:\s*"(.+?)"|:\s*"(.+?)")\s*$'
)

def _parse_format_a(lines: list[str], file_path: str) -> list[dict]:
    """Parse CFQ format: CFQ X.Y [Cognitive: level]: "question" with rich analysis.

    Also handles CFQ X.Y: "question" without the cognitive level marker.
    """
    records = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _CFQ_PATTERN.match(line)
        if not m:
            i += 1
            continue

        set_num = int(m.group(1))
        q_num = int(m.group(2))
        # Cognitive level may be in group(3) or absent
        cognitive = m.group(3).lower() if m.group(3) else None
        # Question may be in group(4) (with cognitive) or group(5) (without)
        question = (m.group(4) or m.group(5) or "").strip()

        # Collect all content until next CFQ or end
        i += 1
        content_lines = []
        while i < len(lines):
            if _CFQ_PATTERN.match(lines[i]):
                break
            content_lines.append(lines[i])
            i += 1

        content = "\n".join(content_lines)

        # Extract fields from content
        correct_answer = _extract_field(content, "Correct answer")
        concept_trap = _extract_field(content, "Concept trap")
        remediation = _extract_field(content, "Remediation")
        target_nodes = _extract_target_nodes(content)

        # Extract wrong answers W1, W2, W3
        wrong_answers = []
        for wm in re.finditer(r"W\d+:\\s*\"(.+?)\"\\s*->\\s*(.+?)(?=\\n\\s*W\\d+:|\\n\\s*Concept|\\n\\s*Remediation|$)", content, re.DOTALL):
            wrong_answers.append({
                "answer": wm.group(1).strip(),
                "analysis": wm.group(2).strip()
            })

        records.append({
            "diagnostic_id": f"cfq_{set_num}_{q_num}",
            "question_text": question,
            "correct_answer": correct_answer,
            "wrong_answers": wrong_answers,
            "concept_trap": concept_trap,
            "remediation": remediation,
            "cognitive_level": cognitive,
            "target_nodes": target_nodes,
            "topic_tag": None,
            "scoring": None,
            "source_file": file_path,
            "source_format": "A_cfq",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


def _extract_field(content: str, field_name: str) -> Optional[str]:
    """Extract a field value from content. Field is 'Name: value' on one or more lines."""
    pattern = rf"{re.escape(field_name)}:\s*(.*?)(?=\n\s*(?:W\d+:|Concept trap:|Remediation:|Target node:|Correct answer:|Common wrong|CFQ |\Z))"
    m = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
    if m:
        return m.group(1).strip()
    return None


def _extract_target_nodes(content: str) -> list[str]:
    """Extract target node IDs from content."""
    nodes = []
    for m in re.finditer(r"c\d+_\w+", content):
        node = m.group(0)
        if node not in nodes:
            nodes.append(node)
    return nodes


# ---------------------------------------------------------------------------
# Format B: Section-based — === DIAGNOSTIC N: Title === / QUESTIONS: / SCORING: / REMEDIATION:
# ---------------------------------------------------------------------------

def _parse_format_b(lines: list[str], file_path: str) -> list[dict]:
    """Parse section-based format: === DIAGNOSTIC N: Title === with QUESTIONS/SCORING/REMEDIATION."""
    records = []
    i = 0
    current_diag = None
    current_questions = []
    current_scoring = None
    current_remediation = []

    def flush():
        nonlocal current_diag, current_questions, current_scoring, current_remediation
        if current_diag:
            for q_idx, q_text in enumerate(current_questions, 1):
                records.append({
                    "diagnostic_id": f"{current_diag}_q{q_idx}",
                    "question_text": q_text,
                    "correct_answer": None,
                    "wrong_answers": [],
                    "concept_trap": None,
                    "remediation": "\n".join(current_remediation).strip() if current_remediation else None,
                    "cognitive_level": None,
                    "target_nodes": [],
                    "topic_tag": current_diag,
                    "scoring": current_scoring,
                    "source_file": file_path,
                    "source_format": "B_section",
                    "parser_id": PARSER_ID,
                    "parser_version": PARSER_VERSION,
                })
        current_diag = None
        current_questions = []
        current_scoring = None
        current_remediation = []

    while i < len(lines):
        line = lines[i].strip()

        # Detect new diagnostic section
        diag_m = re.match(r"^===\s*DIAGNOSTIC\s+(\d+):\s*(.+?)\s*===?$", line)
        if diag_m:
            flush()
            current_diag = f"diagnostic_{diag_m.group(1)}"
            i += 1
            continue

        if current_diag:
            if line.startswith("QUESTIONS:"):
                i += 1
                while i < len(lines):
                    qline = lines[i].strip()
                    if qline.startswith("SCORING:") or qline.startswith("REMEDIATION:") or qline.startswith("=== DIAGNOSTIC"):
                        break
                    if qline and re.match(r"^\d+\.\s+", qline):
                        current_questions.append(qline)
                    i += 1
                continue
            elif line.startswith("SCORING:"):
                i += 1
                scoring_lines = [line[9:]]
                while i < len(lines):
                    sline = lines[i].strip()
                    if sline.startswith("REMEDIATION:") or sline.startswith("=== DIAGNOSTIC"):
                        break
                    if sline:
                        scoring_lines.append(sline)
                    i += 1
                current_scoring = "\n".join(scoring_lines).strip()
                continue
            elif line.startswith("REMEDIATION:"):
                i += 1
                while i < len(lines):
                    rline = lines[i].strip()
                    if rline.startswith("=== DIAGNOSTIC"):
                        break
                    if rline.startswith("-"):
                        current_remediation.append(rline)
                    i += 1
                continue

        i += 1

    flush()
    return records


# ---------------------------------------------------------------------------
# Format C: Diagnostic: ID, TOPIC, "q", CORRECT_ANSWER: "...", ...
# ---------------------------------------------------------------------------

_DIAG_LINE_PATTERN = re.compile(
    r'^Diagnostic:\s+(\w+),\s*(.+?),\s*"(.*?)",\s*'
    r'CORRECT_ANSWER:\s*"(.*?)",\s*'
    r'WHAT_WRONG_ANSWER_INDICATES:\s*"(.*?)",\s*'
    r'REMEDIATION_PATH:\s*"(.*?)"\s*$'
)

def _parse_format_c(lines: list[str], file_path: str) -> list[dict]:
    """Parse Diagnostic: line format (acc-style)."""
    records = []
    for line in lines:
        line = line.strip()
        m = _DIAG_LINE_PATTERN.match(line)
        if not m:
            continue

        diag_id = m.group(1)
        topic = m.group(2).strip()
        question = m.group(3).strip()
        correct = m.group(4).strip()
        wrong_indicates = m.group(5).strip()
        remediation = m.group(6).strip()

        records.append({
            "diagnostic_id": diag_id,
            "question_text": question,
            "correct_answer": correct,
            "wrong_answers": [{"answer": None, "analysis": wrong_indicates}] if wrong_indicates else [],
            "concept_trap": None,
            "remediation": remediation,
            "cognitive_level": "pre" if diag_id.startswith("PRE") else ("post" if diag_id.startswith("POST") else None),
            "target_nodes": _extract_target_nodes(topic + " " + remediation),
            "topic_tag": topic,
            "scoring": None,
            "source_file": file_path,
            "source_format": "C_diag_line",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format D: EVS diagnostics — DIAGNOSTIC N: TITLE / Pre-test question: / Target: / Content:
# ---------------------------------------------------------------------------

def _parse_format_d(lines: list[str], file_path: str) -> list[dict]:
    """Parse EVS diagnostics format."""
    records = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        diag_m = re.match(r"^DIAGNOSTIC\s+(\d+):\s*(.+)$", line)
        if not diag_m:
            i += 1
            continue

        diag_num = int(diag_m.group(1))
        title = diag_m.group(2).strip()
        i += 1

        pre_test = None
        target = None
        content = None
        node = None
        cognitive = None

        while i < len(lines):
            cont = lines[i].strip()
            if re.match(r"^DIAGNOSTIC\s+\d+:", cont):
                break

            if cont.startswith("Node:"):
                node_m = re.search(r"(c\d+_\w+)", cont)
                if node_m:
                    node = node_m.group(1)
                i += 1
            elif cont.startswith("Cognitive:"):
                cognitive = cont[10:].strip().lower()
                i += 1
            elif cont.startswith("Pre-test question:"):
                pre_test = cont[18:].strip()
                i += 1
            elif cont.startswith("Target:"):
                target = cont[8:].strip()
                i += 1
            elif cont.startswith("Content:"):
                content = cont[9:].strip()
                i += 1
            else:
                i += 1

        records.append({
            "diagnostic_id": f"evs_diag_{diag_num}",
            "question_text": pre_test,
            "correct_answer": content,
            "wrong_answers": [],
            "concept_trap": None,
            "remediation": target,
            "cognitive_level": cognitive,
            "target_nodes": [node] if node else [],
            "topic_tag": title,
            "scoring": None,
            "source_file": file_path,
            "source_format": "D_evs_diag",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format E: DQ block — --- DQ_... --- / QID: / TOPIC_TAG: / COGNITIVE_LEVEL: / ...
# ---------------------------------------------------------------------------

def _parse_format_e(lines: list[str], file_path: str) -> list[dict]:
    """Parse DQ block format (physics/maths CFQ and board questions)."""
    records = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        if not re.match(r"^---\s+DQ_", line):
            i += 1
            continue

        block_id = re.match(r"^---\s+(DQ_\S+)\s+---$", line)
        block_id = block_id.group(1) if block_id else line
        i += 1

        fields = {}
        while i < len(lines):
            cont = lines[i].strip()
            if re.match(r"^---\s+DQ_", cont):
                break

            field_m = re.match(r"^([A-Z_]+):\s*(.*)$", cont)
            if field_m:
                fname = field_m.group(1)
                fval = field_m.group(2).strip()
                # Handle multi-line values (QUESTION can be multi-line)
                if fname in fields:
                    fields[fname] += "\n" + fval
                else:
                    fields[fname] = fval

            i += 1

        records.append({
            "diagnostic_id": fields.get("QID", block_id),
            "question_text": fields.get("QUESTION"),
            "correct_answer": fields.get("ANSWER"),
            "wrong_answers": [],
            "concept_trap": None,
            "remediation": None,
            "cognitive_level": fields.get("COGNITIVE_LEVEL", "").lower() if fields.get("COGNITIVE_LEVEL") else None,
            "target_nodes": [fields["TARGET_NODE"]] if fields.get("TARGET_NODE") else [],
            "topic_tag": fields.get("TOPIC_TAG"),
            "scoring": None,
            "source_file": file_path,
            "source_format": "E_dq_block",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format F: Q: CORRECT: format — Q1: question / CORRECT: ... / COMMON WRONG: ... / REVEALS: ...
# ---------------------------------------------------------------------------

_Q_PATTERN_F = re.compile(r"^\s*Q(\d+):\s+(.+)$")

def _parse_format_f(lines: list[str], file_path: str) -> list[dict]:
    """Parse Q:/CORRECT: format (histciv-style)."""
    records = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_F.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        q_text = m.group(2).strip()
        i += 1

        correct = None
        common_wrong = None
        reveals = None
        current_field = None
        current_lines = []

        while i < len(lines):
            raw_line = lines[i]
            cont = raw_line.strip()
            if _Q_PATTERN_F.match(raw_line) or cont.startswith("=== SET"):
                break

            if cont.startswith("CORRECT:"):
                if current_field == "correct" and len(current_lines) > 1:
                    correct = "\n".join(current_lines).strip()
                elif current_field == "common_wrong" and len(current_lines) > 1:
                    common_wrong = "\n".join(current_lines).strip()
                correct = cont[8:].strip()
                current_field = "correct"
                current_lines = [correct]
            elif cont.startswith("COMMON WRONG:"):
                if current_field == "correct" and len(current_lines) > 1:
                    correct = "\n".join(current_lines).strip()
                common_wrong = cont[13:].strip()
                current_field = "common_wrong"
                current_lines = [common_wrong]
            elif cont.startswith("REVEALS:"):
                if current_field == "common_wrong" and len(current_lines) > 1:
                    common_wrong = "\n".join(current_lines).strip()
                elif current_field == "correct" and len(current_lines) > 1:
                    correct = "\n".join(current_lines).strip()
                reveals = cont[8:].strip()
                current_field = "reveals"
                current_lines = [reveals]
            elif current_field and cont:
                current_lines.append(cont)

            i += 1

        # Finalize multi-line fields
        if current_field == "correct" and len(current_lines) > 1:
            correct = "\n".join(current_lines).strip()
        elif current_field == "common_wrong" and len(current_lines) > 1:
            common_wrong = "\n".join(current_lines).strip()
        elif current_field == "reveals" and len(current_lines) > 1:
            reveals = "\n".join(current_lines).strip()

        records.append({
            "diagnostic_id": f"q{q_num}",
            "question_text": q_text,
            "correct_answer": correct,
            "wrong_answers": [{"answer": common_wrong, "analysis": reveals}] if common_wrong else [],
            "concept_trap": None,
            "remediation": reveals,
            "cognitive_level": None,
            "target_nodes": [],
            "topic_tag": None,
            "scoring": None,
            "source_file": file_path,
            "source_format": "F_q_correct",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format G: Diag Question: Q_ID, TOPIC, QUESTION, CORRECT_ANSWER, WRONG_1, WRONG_2, REMEDIATION
# ---------------------------------------------------------------------------

def _parse_format_g(lines: list[str], file_path: str) -> list[dict]:
    """Parse Diag Question: line format (acc-style diagnostic_questions).

    Format: Diag Question: Q_ID, TOPIC, QUESTION, CORRECT_ANSWER, WRONG_1, WRONG_2, REMEDIATION: ...
    Fields are comma-separated but may contain commas inside text (e.g., Rs.8,00,000).
    Strategy: split on REMEDIATION: first, then use regex to find field boundaries
    by looking for known patterns (correct answers start with capital, wrong answers
    are alternative explanations).
    """
    records = []
    for line in lines:
        line = line.strip()
        if not line.startswith("Diag Question:"):
            continue

        rest = line[14:].strip()

        # Split on REMEDIATION: marker
        remediation_split = re.split(r",\s*REMEDIATION:\s*", rest, maxsplit=1)
        if len(remediation_split) != 2:
            continue

        before_rem = remediation_split[0].strip()
        remediation = remediation_split[1].strip()

        # Extract Q_ID and TOPIC first (first two comma-separated fields)
        # Q_ID is like DQ_C11_ACC_001, TOPIC is like c11_acc_001
        id_topic_m = re.match(r"^(\S+),\s*(c\d+_\w+),\s*(.+)$", before_rem)
        if not id_topic_m:
            continue

        q_id = id_topic_m.group(1)
        topic = id_topic_m.group(2)
        remainder = id_topic_m.group(3)

        # The remainder contains: QUESTION, CORRECT_ANSWER, WRONG_1, WRONG_2
        # These are unquoted and comma-separated, but commas inside numbers (Rs.8,00,000)
        # and text make simple splitting unreliable.
        # Strategy: the WRONG answers typically start with "No " or "It is " or "Yes "
        # and the CORRECT answer typically starts with "It is" or a definition.
        # Better strategy: split by comma, then rejoin parts that look like continuations
        # (parts starting with lowercase or numbers are continuations of previous field)

        parts = _smart_split_commas(remainder)
        if len(parts) < 4:
            continue

        question = parts[0].strip()
        correct = parts[1].strip()
        wrong1 = parts[2].strip()
        wrong2 = ",".join(parts[3:]).strip()

        records.append({
            "diagnostic_id": q_id,
            "question_text": question,
            "correct_answer": correct,
            "wrong_answers": [
                {"answer": wrong1, "analysis": None},
                {"answer": wrong2, "analysis": None},
            ],
            "concept_trap": None,
            "remediation": remediation,
            "cognitive_level": None,
            "target_nodes": [topic] if topic else [],
            "topic_tag": topic,
            "scoring": None,
            "source_file": file_path,
            "source_format": "G_diag_q",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


def _smart_split_commas(text: str) -> list[str]:
    """Split text by commas, but rejoin parts that look like continuations.

    Indian number formats (Rs.8,00,000) and mid-sentence commas should not
    trigger field splits. A new field starts when a part begins with a
    capital letter and forms a complete thought (not a continuation).
    """
    raw_parts = text.split(",")
    if len(raw_parts) <= 4:
        return raw_parts

    # Rejoin strategy: a part is a continuation if:
    # - it starts with a digit (part of a number like 00,000)
    # - it starts with a lowercase letter
    # - it's very short (< 5 chars) and the previous part ends with a digit
    result = []
    for i, part in enumerate(raw_parts):
        stripped = part.strip()
        if not result:
            result.append(part)
            continue

        prev = result[-1].strip()
        is_continuation = (
            stripped[:1].isdigit() or  # part of a number
            stripped[:1].islower() or  # lowercase continuation
            (len(stripped) < 5 and prev[-1:].isdigit()) or  # short numeric suffix
            stripped.startswith(" ")  # leading space (indented continuation)
        )

        if is_continuation:
            result[-1] = result[-1] + "," + part
        else:
            result.append(part)

    return result


# ---------------------------------------------------------------------------
# Format H: EVS diagnostic_questions — Q1: question / EXPECTED ANSWER: / COMMON WRONG ANSWER: / FOLLOW-UP:
# ---------------------------------------------------------------------------

_Q_PATTERN_H = re.compile(r"^\s*Q(\d+):\s+(.+)$")

def _parse_format_h(lines: list[str], file_path: str) -> list[dict]:
    """Parse EVS diagnostic_questions format: Q1: question / EXPECTED ANSWER: / COMMON WRONG ANSWER: / FOLLOW-UP:"""
    records = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_H.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        q_text_lines = [m.group(2).strip()]
        i += 1

        # Question may span multiple lines until EXPECTED ANSWER:
        while i < len(lines):
            cont = lines[i].strip()
            if re.match(r"^EXPECTED\s*ANSWER:", cont, re.IGNORECASE) or _Q_PATTERN_H.match(lines[i]) or cont.startswith("==="):
                break
            if cont:
                q_text_lines.append(cont)
            i += 1

        q_text = " ".join(q_text_lines).strip()

        expected = None
        common_wrong = None
        follow_up = None
        current_field = None
        current_lines = []

        while i < len(lines):
            raw_line = lines[i]
            cont = raw_line.strip()
            if _Q_PATTERN_H.match(raw_line) or cont.startswith("=== DIAGNOSTIC") or cont.startswith("=== SET"):
                break

            if re.match(r"^EXPECTED\s*ANSWER:", cont, re.IGNORECASE):
                if current_field == "expected" and len(current_lines) > 1:
                    expected = "\n".join(current_lines).strip()
                elif current_field == "common_wrong" and len(current_lines) > 1:
                    common_wrong = "\n".join(current_lines).strip()
                expected = re.sub(r"^EXPECTED\s*ANSWER:\s*", "", cont, flags=re.IGNORECASE)
                current_field = "expected"
                current_lines = [expected]
            elif cont.startswith("COMMON WRONG ANSWER:"):
                if current_field == "expected" and len(current_lines) > 1:
                    expected = "\n".join(current_lines).strip()
                common_wrong = cont[21:].strip()
                current_field = "common_wrong"
                current_lines = [common_wrong]
            elif cont.startswith("FOLLOW-UP:"):
                if current_field == "common_wrong" and len(current_lines) > 1:
                    common_wrong = "\n".join(current_lines).strip()
                elif current_field == "expected" and len(current_lines) > 1:
                    expected = "\n".join(current_lines).strip()
                follow_up = cont[10:].strip()
                current_field = "follow_up"
                current_lines = [follow_up]
            elif current_field and cont:
                current_lines.append(cont)

            i += 1

        # Finalize last field
        if current_field == "expected" and len(current_lines) > 1:
            expected = "\n".join(current_lines).strip()
        elif current_field == "common_wrong" and len(current_lines) > 1:
            common_wrong = "\n".join(current_lines).strip()
        elif current_field == "follow_up" and len(current_lines) > 1:
            follow_up = "\n".join(current_lines).strip()

        records.append({
            "diagnostic_id": f"q{q_num}",
            "question_text": q_text,
            "correct_answer": expected,
            "wrong_answers": [{"answer": common_wrong, "analysis": None}] if common_wrong else [],
            "concept_trap": None,
            "remediation": follow_up,
            "cognitive_level": None,
            "target_nodes": [],
            "topic_tag": None,
            "scoring": None,
            "source_file": file_path,
            "source_format": "H_evs_dq",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format I: Bio CFQ — Q1. question / A. B. OK C. D. / WRONG ANSWER ANALYSIS: / REMEDIATION:
# ---------------------------------------------------------------------------

_Q_PATTERN_I = re.compile(r"^\s*Q(\d+)\.\s+(.+)$")

def _parse_format_i(lines: list[str], file_path: str) -> list[dict]:
    """Parse Bio CFQ format: Q1. question / A. B. OK C. D. / WRONG ANSWER ANALYSIS: / REMEDIATION:"""
    records = []
    i = 0
    while i < len(lines):
        line = lines[i]
        m = _Q_PATTERN_I.match(line)
        if not m:
            i += 1
            continue

        q_num = int(m.group(1))
        q_text = m.group(2).strip()
        i += 1

        options = []
        correct_answer = None
        wrong_analysis = []
        remediation = None
        current_section = None

        while i < len(lines):
            raw = lines[i]
            cont = raw.strip()

            if _Q_PATTERN_I.match(raw) or cont.startswith("--- UNIT") or cont.startswith("==="):
                break

            # Options: A. B. C. D. (with OK marker for correct)
            opt_m = re.match(r"^([A-D])\.\s+(.+?)(\s+OK)?$", cont)
            if opt_m:
                letter = opt_m.group(1)
                text = opt_m.group(2).strip()
                is_correct = "OK" in (opt_m.group(3) or "")
                options.append({"letter": letter, "text": text, "correct": is_correct})
                if is_correct:
                    correct_answer = f"{letter}) {text}"
                current_section = "options"
                i += 1
                continue

            if cont.startswith("WRONG ANSWER ANALYSIS:"):
                current_section = "wrong_analysis"
                i += 1
                continue

            if cont.startswith("REMEDIATION:"):
                remediation = cont[12:].strip()
                current_section = "remediation"
                i += 1
                continue

            if current_section == "wrong_analysis" and cont:
                # Lines like: "A -> Misconception: ..."
                wa_m = re.match(r"^([A-D])\s*->\s*(.+)", cont)
                if wa_m:
                    wrong_analysis.append({
                        "letter": wa_m.group(1),
                        "analysis": wa_m.group(2).strip()
                    })

            i += 1

        # Build wrong_answers from options + analysis
        wrong_answers = []
        for opt in options:
            if not opt["correct"]:
                analysis = None
                for wa in wrong_analysis:
                    if wa["letter"] == opt["letter"]:
                        analysis = wa["analysis"]
                        break
                wrong_answers.append({
                    "answer": f"{opt['letter']}) {opt['text']}",
                    "analysis": analysis
                })

        records.append({
            "diagnostic_id": f"q{q_num}",
            "question_text": q_text,
            "correct_answer": correct_answer,
            "wrong_answers": wrong_answers,
            "concept_trap": None,
            "remediation": remediation,
            "cognitive_level": None,
            "target_nodes": _extract_target_nodes(remediation or ""),
            "topic_tag": None,
            "scoring": None,
            "source_file": file_path,
            "source_format": "I_bio_cfq",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format J: AppMath diagnostics — === DIAGNOSTIC N: TITLE === / Q1: q A: answer
# ---------------------------------------------------------------------------

_Q_PATTERN_J = re.compile(r"^Q(\d+):\s+(.+?)\s+A:\s*(.+)$")

def _parse_format_j(lines: list[str], file_path: str) -> list[dict]:
    """Parse AppMath diagnostics: === DIAGNOSTIC N: TITLE === / Q1: question A: answer"""
    records = []
    current_diag = None

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Track current diagnostic section
        diag_m = re.match(r"^===\s*DIAGNOSTIC\s+(\d+):\s*(.+?)\s*===?$", stripped)
        if diag_m:
            current_diag = f"diagnostic_{diag_m.group(1)}"
            continue

        m = _Q_PATTERN_J.match(stripped)
        if m:
            q_num = int(m.group(1))
            q_text = m.group(2).strip()
            answer = m.group(3).strip()

            records.append({
                "diagnostic_id": f"{current_diag}_q{q_num}" if current_diag else f"q{q_num}",
                "question_text": q_text,
                "correct_answer": answer,
                "wrong_answers": [],
                "concept_trap": None,
                "remediation": None,
                "cognitive_level": None,
                "target_nodes": [],
                "topic_tag": current_diag,
                "scoring": None,
                "source_file": file_path,
                "source_format": "J_appmath_diag",
                "parser_id": PARSER_ID,
                "parser_version": PARSER_VERSION,
            })

    return records


# ---------------------------------------------------------------------------
# Main parser
# ---------------------------------------------------------------------------

_FORMAT_DISPATCH = {
    "A_cfq": _parse_format_a,
    "B_section": _parse_format_b,
    "C_diag_line": _parse_format_c,
    "D_evs_diag": _parse_format_d,
    "E_dq_block": _parse_format_e,
    "F_q_correct": _parse_format_f,
    "G_diag_q": _parse_format_g,
    "H_evs_dq": _parse_format_h,
    "I_bio_cfq": _parse_format_i,
    "J_appmath_diag": _parse_format_j,
}


def parse_file(file_path: Path) -> list[dict]:
    """Parse a diagnostic .marker file into a list of diagnostic records.

    Detects the format automatically and dispatches to the appropriate
    sub-parser. Files with unknown formats return an empty list (review queue).
    """
    content = file_path.read_text(encoding="utf-8-sig")
    lines = content.split("\n")

    fmt = _detect_format(lines, str(file_path))
    if fmt == "unknown":
        return []

    parser_func = _FORMAT_DISPATCH[fmt]
    return parser_func(lines, str(file_path))


def register():
    """Register this parser with the parser registry."""
    from backend.content_parsers.parser_registry import register_parser

    register_parser(
        content_type=CONTENT_TYPE,
        version=PARSER_VERSION,
        description="Parses diagnostic .marker files from diagnostics/ and "
                    "diagnostic_questions/ directories. Auto-detects 8 formats: "
                    "A_cfq, B_section, C_diag_line, D_evs_diag, E_dq_block, "
                    "F_q_correct, G_diag_q, H_evs_dq.",
        parse_func=parse_file,
        parser_id=PARSER_ID,
        tier=1,
    )
