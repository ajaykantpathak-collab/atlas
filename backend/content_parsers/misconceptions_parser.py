"""Misconceptions parser — parses misconception .marker files.

Source directory per subject: misconceptions/

Formats detected (5 total):

  A_node_cfq     — --- NODE ... --- / Misconception N: "text" / Target node: / Why wrong: / Correct: / Diagnostic question: / Remediation:
                   Used by: physics, chem (node-level misconceptions with rich analysis)
  B_mis_line     — Misconception: ID, "wrong belief", "why students think this", "correct concept", "summary", "diagnostic question", "answer"
                   Used by: acc (comma-separated quoted fields on one line)
  C_mis_block    — MISCONCEPTION M1: / TOPIC: / ERROR: / CORRECTION: / REMEDIATION: / FREQUENCY:
                   Used by: bio (field-per-line blocks)
  D_mis_simple   — === MISCONCEPTION N: title === / MISCONCEPTION: "text" / CORRECTION: text
                   Used by: histciv (simple misconception + correction pairs)
  E_mis_pp       — --- MISCONCEPTION ID --- / TOPIC: / NODE: / MISCONCEPTION: / CORRECTION: / REMEDIATION: / FREQUENCY: / SOURCE:
                   Used by: maths (pupil-performance misconceptions with source tracking)

Output: list of dicts with normalized keys:
    misconception_id, misconception_text, correction, why_wrong, diagnostic_question,
    diagnostic_answer, remediation, target_nodes (list), topic, frequency, source_ref,
    source_file, source_format, parser_id, parser_version
"""

import re
from pathlib import Path
from typing import Optional

PARSER_ID = "misconceptions_v1"
PARSER_VERSION = "1.0.0"
CONTENT_TYPE = "misconceptions"


# ---------------------------------------------------------------------------
# Format detection
# ---------------------------------------------------------------------------

def _detect_format(lines: list[str]) -> str:
    """Detect which misconception format a file uses."""
    sample = "\n".join(lines[:300])

    # Format B: Misconception: ID, "quoted", "quoted", ... (acc-style)
    if re.search(r"^Misconception:\s+\w+,\s*\"", sample, re.MULTILINE):
        return "B_mis_line"

    # Format E: --- MISCONCEPTION ID --- with SOURCE: field
    if re.search(r"^---\s+MISCONCEPTION\s+\w+\s+---", sample, re.MULTILINE) and "SOURCE:" in sample:
        return "E_mis_pp"

    # Format A: Misconception N: "text" with Why wrong: / Correct: / Diagnostic question:
    if re.search(r"^\s*Misconception\s+\d+:\s*\"", sample, re.MULTILINE) and ("Why wrong:" in sample or "Why it's wrong:" in sample):
        return "A_node_cfq"

    # Format F: appmath — === MISCONCEPTION N: "text" === / WRONG: / WHY WRONG: / CORRECT: / EXAMPLE:
    if re.search(r"^===\s*MISCONCEPTION\s+\d+:\s*\"", sample, re.MULTILINE) and "WHY WRONG:" in sample:
        return "F_appmath_mis"

    # Format G: chem — === MISCONCEPTION N === / Myth: / Fact:
    if re.search(r"^===\s*MISCONCEPTION\s+\d+\s*===?$", sample, re.MULTILINE) and "Myth:" in sample and "Fact:" in sample:
        return "G_chem_mis"

    # Format H: geo — === MISCONCEPTION N === / WRONG: / CORRECT:
    if re.search(r"^===\s*MISCONCEPTION\s+\d+\s*===?$", sample, re.MULTILINE) and re.search(r"^WRONG:", sample, re.MULTILINE) and "CORRECT:" in sample:
        return "H_geo_mis"

    # Format C: MISCONCEPTION M1: or MISCONCEPTION C11_001: / TOPIC: / ERROR: / CORRECTION: / REMEDIATION: / FREQUENCY:
    if re.search(r"^\s*MISCONCEPTION\s+(M\d+|[A-Z]\d+_\d+):\s*$", sample, re.MULTILINE) and "ERROR:" in sample and "CORRECTION:" in sample:
        return "C_mis_block"

    # Format I: bs — Misconception: ID / THE_MISCONCEPTION: / WHY_STUDENTS_BELIEVE_IT: / WHY_IT_IS_WRONG: / CORRECT_UNDERSTANDING: / DIAGNOSTIC_QUESTION: / DIAGNOSTIC_ANSWER:
    if re.search(r"^Misconception:\s+\w+", sample, re.MULTILINE) and "THE_MISCONCEPTION:" in sample and "CORRECT_UNDERSTANDING:" in sample:
        return "I_bs_mis"

    # Format J: junior — M1: "text" / Wrong: / Correct: / Fix:
    if re.search(r"^\s*M\d+:\s*\"", sample, re.MULTILINE) and re.search(r"^\s*Wrong:", sample, re.MULTILINE) and re.search(r"^\s*Correct:", sample, re.MULTILINE) and re.search(r"^\s*Fix:", sample, re.MULTILINE):
        return "J_junior_mis"

    # Format D: === MISCONCEPTION N: title === / MISCONCEPTION: "text" / CORRECTION:
    if re.search(r"^===\s*MISCONCEPTION\s+\d+", sample, re.MULTILINE) and "CORRECTION:" in sample:
        return "D_mis_simple"

    return "unknown"


# ---------------------------------------------------------------------------
# Format A: Node CFQ — Misconception N: "text" / Why wrong: / Correct: / Diagnostic question: / Remediation:
# ---------------------------------------------------------------------------

_MIS_PATTERN_A = re.compile(r"^\s*Misconception\s+(\d+):\s*\"(.+?)\"\s*$")

def _parse_format_a(lines: list[str], file_path: str) -> list[dict]:
    """Parse node-level misconception format with rich analysis."""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i]
        m = _MIS_PATTERN_A.match(line)
        if not m:
            i += 1
            continue

        mis_num = int(m.group(1))
        mis_text = m.group(2).strip()
        i += 1

        # Collect fields until next Misconception or end
        target_nodes = []
        why_wrong = None
        correct = None
        diagnostic_question = None
        remediation = None
        current_field = None
        current_lines = []

        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_PATTERN_A.match(lines[i]) or cont.startswith("--- NODE") or cont.startswith("Misconception ") and not _MIS_PATTERN_A.match(lines[i]):
                break

            if cont.startswith("Target node:"):
                nodes_text = cont[12:].strip()
                target_nodes = [n.strip() for n in nodes_text.split(",") if n.strip() and n.strip() != "UNKNOWN"]
                i += 1
                continue

            if cont.startswith("Why wrong:") or cont.startswith("Why it's wrong:"):
                if current_field and current_lines:
                    _finalize_a(current_field, current_lines, locals())
                # Handle both "Why wrong:" and "Why it's wrong:"
                if cont.startswith("Why it's wrong:"):
                    why_wrong = cont[15:].strip()
                else:
                    why_wrong = cont[10:].strip()
                current_field = "why_wrong"
                current_lines = [why_wrong]
                i += 1
                continue

            if cont.startswith("Correct:") or cont.startswith("Correct understanding:"):
                if current_field == "why_wrong" and len(current_lines) > 1:
                    why_wrong = "\n".join(current_lines).strip()
                if cont.startswith("Correct understanding:"):
                    correct = cont[22:].strip()
                else:
                    correct = cont[8:].strip()
                current_field = "correct"
                current_lines = [correct]
                i += 1
                continue

            if cont.startswith("Diagnostic question:"):
                if current_field == "correct" and len(current_lines) > 1:
                    correct = "\n".join(current_lines).strip()
                diagnostic_question = cont[20:].strip()
                current_field = "diagnostic_question"
                current_lines = [diagnostic_question]
                i += 1
                continue

            if cont.startswith("Remediation:"):
                if current_field == "diagnostic_question" and len(current_lines) > 1:
                    diagnostic_question = "\n".join(current_lines).strip()
                elif current_field == "correct" and len(current_lines) > 1:
                    correct = "\n".join(current_lines).strip()
                remediation = cont[12:].strip()
                current_field = "remediation"
                current_lines = [remediation]
                i += 1
                continue

            if current_field and cont:
                current_lines.append(cont)

            i += 1

        # Finalize last field
        if current_field == "why_wrong" and len(current_lines) > 1:
            why_wrong = "\n".join(current_lines).strip()
        elif current_field == "correct" and len(current_lines) > 1:
            correct = "\n".join(current_lines).strip()
        elif current_field == "diagnostic_question" and len(current_lines) > 1:
            diagnostic_question = "\n".join(current_lines).strip()
        elif current_field == "remediation" and len(current_lines) > 1:
            remediation = "\n".join(current_lines).strip()

        records.append({
            "misconception_id": f"misconception_{mis_num}",
            "misconception_text": mis_text,
            "correction": correct,
            "why_wrong": why_wrong,
            "diagnostic_question": diagnostic_question,
            "diagnostic_answer": None,
            "remediation": remediation,
            "target_nodes": target_nodes,
            "topic": None,
            "frequency": None,
            "source_ref": None,
            "source_file": file_path,
            "source_format": "A_node_cfq",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


def _finalize_a(field, lines, scope):
    pass  # Helper placeholder — finalization done inline


# ---------------------------------------------------------------------------
# Format B: Misconception: ID, "quoted fields", ... (acc-style)
# ---------------------------------------------------------------------------

_MIS_LINE_PATTERN_B = re.compile(
    r'^Misconception:\s+(\w+),\s*'
    r'"(.*?)",\s*'  # misconception text
    r'"(.*?)",\s*'  # why students think this
    r'"(.*?)",\s*'  # correct concept
    r'"(.*?)",\s*'  # summary
    r'"(.*?)",\s*'  # diagnostic question
    r'"(.*?)"\s*$'   # diagnostic answer
)

def _parse_format_b(lines: list[str], file_path: str) -> list[dict]:
    """Parse acc-style Misconception: line format with 6 quoted fields."""
    records = []
    for line in lines:
        line = line.strip()
        m = _MIS_LINE_PATTERN_B.match(line)
        if not m:
            continue

        mis_id = m.group(1)
        mis_text = m.group(2).strip()
        why_students_think = m.group(3).strip()
        correct_concept = m.group(4).strip()
        summary = m.group(5).strip()
        diag_question = m.group(6).strip()
        diag_answer = m.group(7).strip()

        records.append({
            "misconception_id": mis_id,
            "misconception_text": mis_text,
            "correction": correct_concept,
            "why_wrong": why_students_think,
            "diagnostic_question": diag_question,
            "diagnostic_answer": diag_answer,
            "remediation": summary,
            "target_nodes": [],
            "topic": None,
            "frequency": None,
            "source_ref": None,
            "source_file": file_path,
            "source_format": "B_mis_line",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format C: MISCONCEPTION M1: / TOPIC: / ERROR: / CORRECTION: / REMEDIATION: / FREQUENCY:
# ---------------------------------------------------------------------------

_MIS_PATTERN_C = re.compile(r"^\s*MISCONCEPTION\s+(M\d+|[A-Z]\d+_\d+):\s*$")

def _parse_format_c(lines: list[str], file_path: str) -> list[dict]:
    """Parse bio-style block format with field-per-line."""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i]
        m = _MIS_PATTERN_C.match(line)
        if not m:
            i += 1
            continue

        mis_id = m.group(1)
        i += 1

        fields = {}
        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_PATTERN_C.match(lines[i]) or cont.startswith("--- ") and cont[4:].isdigit() is False:
                break

            field_m = re.match(r"^([A-Z_]+):\s*(.*)$", cont)
            if field_m and field_m.group(1) in ("TOPIC", "ERROR", "CORRECTION", "REMEDIATION", "FREQUENCY", "SOURCE", "NODE"):
                fname = field_m.group(1)
                fval = field_m.group(2).strip()
                fields[fname] = fval
                i += 1
                continue

            # Check for new section header
            if cont.startswith("--- ") and not _MIS_PATTERN_C.match(lines[i]):
                break

            i += 1

        target_nodes = []
        if fields.get("NODE"):
            node_text = fields["NODE"]
            target_nodes = [n.strip() for n in node_text.split(",") if n.strip() and n.strip() != "UNMAPPED"]

        records.append({
            "misconception_id": mis_id,
            "misconception_text": fields.get("ERROR"),
            "correction": fields.get("CORRECTION"),
            "why_wrong": None,
            "diagnostic_question": None,
            "diagnostic_answer": None,
            "remediation": fields.get("REMEDIATION"),
            "target_nodes": target_nodes,
            "topic": fields.get("TOPIC"),
            "frequency": fields.get("FREQUENCY"),
            "source_ref": fields.get("SOURCE"),
            "source_file": file_path,
            "source_format": "C_mis_block",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format D: === MISCONCEPTION N: title === / MISCONCEPTION: "text" / CORRECTION:
# ---------------------------------------------------------------------------

_MIS_HEADER_D = re.compile(r"^===\s*MISCONCEPTION\s+(\d+):\s*(.+?)\s*===?$")

def _parse_format_d(lines: list[str], file_path: str) -> list[dict]:
    """Parse simple histciv-style: === MISCONCEPTION N: title === / MISCONCEPTION: / CORRECTION:"""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        m = _MIS_HEADER_D.match(line)
        if not m:
            i += 1
            continue

        mis_num = int(m.group(1))
        title = m.group(2).strip()
        i += 1

        mis_text = None
        correction = None

        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_HEADER_D.match(cont):
                break

            if cont.startswith("MISCONCEPTION:"):
                mis_text = cont[14:].strip().strip('"')
                i += 1
                continue

            if cont.startswith("CORRECTION:"):
                correction = cont[12:].strip()
                i += 1
                continue

            i += 1

        records.append({
            "misconception_id": f"misconception_{mis_num}",
            "misconception_text": mis_text,
            "correction": correction,
            "why_wrong": None,
            "diagnostic_question": None,
            "diagnostic_answer": None,
            "remediation": None,
            "target_nodes": [],
            "topic": title,
            "frequency": None,
            "source_ref": None,
            "source_file": file_path,
            "source_format": "D_mis_simple",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format E: --- MISCONCEPTION ID --- / TOPIC: / NODE: / MISCONCEPTION: / CORRECTION: / REMEDIATION: / FREQUENCY: / SOURCE:
# ---------------------------------------------------------------------------

_MIS_HEADER_E = re.compile(r"^---\s+MISCONCEPTION\s+(\w+)\s+---$")

def _parse_format_e(lines: list[str], file_path: str) -> list[dict]:
    """Parse maths PP-style: --- MISCONCEPTION ID --- / TOPIC: / NODE: / MISCONCEPTION: / CORRECTION: / REMEDIATION: / FREQUENCY: / SOURCE:"""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        m = _MIS_HEADER_E.match(line)
        if not m:
            i += 1
            continue

        mis_id = m.group(1)
        i += 1

        fields = {}
        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_HEADER_E.match(cont):
                break

            field_m = re.match(r"^([A-Z_]+):\s*(.*)$", cont)
            if field_m and field_m.group(1) in ("TOPIC", "NODE", "MISCONCEPTION", "CORRECTION", "REMEDIATION", "FREQUENCY", "SOURCE"):
                fname = field_m.group(1)
                fval = field_m.group(2).strip()
                fields[fname] = fval
                i += 1
                continue

            i += 1

        target_nodes = []
        if fields.get("NODE"):
            node_text = fields["NODE"]
            target_nodes = [n.strip() for n in node_text.split(",") if n.strip() and n.strip() != "UNMAPPED"]

        records.append({
            "misconception_id": mis_id,
            "misconception_text": fields.get("MISCONCEPTION"),
            "correction": fields.get("CORRECTION"),
            "why_wrong": None,
            "diagnostic_question": None,
            "diagnostic_answer": None,
            "remediation": fields.get("REMEDIATION"),
            "target_nodes": target_nodes,
            "topic": fields.get("TOPIC"),
            "frequency": fields.get("FREQUENCY"),
            "source_ref": fields.get("SOURCE"),
            "source_file": file_path,
            "source_format": "E_mis_pp",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format F: AppMath — === MISCONCEPTION N: "text" === / WRONG: / WHY WRONG: / CORRECT: / EXAMPLE:
# ---------------------------------------------------------------------------

_MIS_HEADER_F = re.compile(r'^===\s*MISCONCEPTION\s+(\d+):\s*"(.+?)"\s*===?$')

def _parse_format_f(lines: list[str], file_path: str) -> list[dict]:
    """Parse appmath-style: === MISCONCEPTION N: "text" === / WRONG: / WHY WRONG: / CORRECT: / EXAMPLE:"""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        m = _MIS_HEADER_F.match(line)
        if not m:
            i += 1
            continue

        mis_num = int(m.group(1))
        mis_text = m.group(2).strip()
        i += 1

        wrong = None
        why_wrong = None
        correct = None
        example = None
        current_field = None
        current_lines = []

        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_HEADER_F.match(cont):
                break

            if cont.startswith("WRONG:"):
                if current_field and len(current_lines) > 1:
                    _finalize_f(current_field, current_lines, locals())
                wrong = cont[6:].strip()
                current_field = "wrong"
                current_lines = [wrong]
                i += 1
                continue

            if cont.startswith("WHY WRONG:"):
                if current_field == "wrong" and len(current_lines) > 1:
                    wrong = "\n".join(current_lines).strip()
                why_wrong = cont[10:].strip()
                current_field = "why_wrong"
                current_lines = [why_wrong]
                i += 1
                continue

            if cont.startswith("CORRECT:"):
                if current_field == "why_wrong" and len(current_lines) > 1:
                    why_wrong = "\n".join(current_lines).strip()
                correct = cont[8:].strip()
                current_field = "correct"
                current_lines = [correct]
                i += 1
                continue

            if cont.startswith("EXAMPLE:"):
                if current_field == "correct" and len(current_lines) > 1:
                    correct = "\n".join(current_lines).strip()
                example = cont[8:].strip()
                current_field = "example"
                current_lines = [example]
                i += 1
                continue

            if current_field and cont:
                current_lines.append(cont)

            i += 1

        # Finalize last field
        if current_field == "correct" and len(current_lines) > 1:
            correct = "\n".join(current_lines).strip()
        elif current_field == "why_wrong" and len(current_lines) > 1:
            why_wrong = "\n".join(current_lines).strip()
        elif current_field == "example" and len(current_lines) > 1:
            example = "\n".join(current_lines).strip()

        records.append({
            "misconception_id": f"misconception_{mis_num}",
            "misconception_text": mis_text,
            "correction": correct,
            "why_wrong": why_wrong,
            "diagnostic_question": None,
            "diagnostic_answer": None,
            "remediation": example,
            "target_nodes": [],
            "topic": None,
            "frequency": None,
            "source_ref": None,
            "source_file": file_path,
            "source_format": "F_appmath_mis",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


def _finalize_f(field, lines, scope):
    pass  # Helper placeholder


# ---------------------------------------------------------------------------
# Format G: Chem — === MISCONCEPTION N === / Myth: / Fact:
# ---------------------------------------------------------------------------

_MIS_HEADER_GH = re.compile(r"^===\s*MISCONCEPTION\s+(\d+)\s*===?$")

def _parse_format_g(lines: list[str], file_path: str) -> list[dict]:
    """Parse chem-style: === MISCONCEPTION N === / Myth: / Fact:"""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        m = _MIS_HEADER_GH.match(line)
        if not m:
            i += 1
            continue

        mis_num = int(m.group(1))
        i += 1

        myth = None
        fact = None
        current_field = None
        current_lines = []

        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_HEADER_GH.match(cont):
                break

            if cont.startswith("Myth:"):
                if current_field == "fact" and len(current_lines) > 1:
                    fact = "\n".join(current_lines).strip()
                myth = cont[5:].strip()
                current_field = "myth"
                current_lines = [myth]
                i += 1
                continue

            if cont.startswith("Fact:"):
                if current_field == "myth" and len(current_lines) > 1:
                    myth = "\n".join(current_lines).strip()
                fact = cont[5:].strip()
                current_field = "fact"
                current_lines = [fact]
                i += 1
                continue

            if current_field and cont:
                current_lines.append(cont)

            i += 1

        if current_field == "fact" and len(current_lines) > 1:
            fact = "\n".join(current_lines).strip()

        records.append({
            "misconception_id": f"misconception_{mis_num}",
            "misconception_text": myth,
            "correction": fact,
            "why_wrong": None,
            "diagnostic_question": None,
            "diagnostic_answer": None,
            "remediation": None,
            "target_nodes": [],
            "topic": None,
            "frequency": None,
            "source_ref": None,
            "source_file": file_path,
            "source_format": "G_chem_mis",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format H: Geo — === MISCONCEPTION N === / WRONG: / CORRECT:
# ---------------------------------------------------------------------------

def _parse_format_h(lines: list[str], file_path: str) -> list[dict]:
    """Parse geo-style: === MISCONCEPTION N === / WRONG: / CORRECT:"""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        m = _MIS_HEADER_GH.match(line)
        if not m:
            i += 1
            continue

        mis_num = int(m.group(1))
        i += 1

        wrong = None
        correct = None
        current_field = None
        current_lines = []

        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_HEADER_GH.match(cont):
                break

            if cont.startswith("WRONG:"):
                if current_field == "correct" and len(current_lines) > 1:
                    correct = "\n".join(current_lines).strip()
                wrong = cont[6:].strip()
                current_field = "wrong"
                current_lines = [wrong]
                i += 1
                continue

            if cont.startswith("CORRECT:"):
                if current_field == "wrong" and len(current_lines) > 1:
                    wrong = "\n".join(current_lines).strip()
                correct = cont[8:].strip()
                current_field = "correct"
                current_lines = [correct]
                i += 1
                continue

            if current_field and cont:
                current_lines.append(cont)

            i += 1

        if current_field == "correct" and len(current_lines) > 1:
            correct = "\n".join(current_lines).strip()

        records.append({
            "misconception_id": f"misconception_{mis_num}",
            "misconception_text": wrong,
            "correction": correct,
            "why_wrong": None,
            "diagnostic_question": None,
            "diagnostic_answer": None,
            "remediation": None,
            "target_nodes": [],
            "topic": None,
            "frequency": None,
            "source_ref": None,
            "source_file": file_path,
            "source_format": "H_geo_mis",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format I: BS — Misconception: ID / THE_MISCONCEPTION: / WHY_STUDENTS_BELIEVE_IT: / ...
# ---------------------------------------------------------------------------

_MIS_PATTERN_I = re.compile(r"^Misconception:\s+(\w+)\s*$")

def _parse_format_i(lines: list[str], file_path: str) -> list[dict]:
    """Parse bs-style: Misconception: ID / THE_MISCONCEPTION: / WHY_STUDENTS_BELIEVE_IT: / WHY_IT_IS_WRONG: / CORRECT_UNDERSTANDING: / DIAGNOSTIC_QUESTION: / DIAGNOSTIC_ANSWER:"""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        m = _MIS_PATTERN_I.match(line)
        if not m:
            i += 1
            continue

        mis_id = m.group(1)
        i += 1

        fields = {}
        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_PATTERN_I.match(cont):
                break

            field_m = re.match(r"^([A-Z_]+):\s*(.*)$", cont)
            if field_m and field_m.group(1) in ("THE_MISCONCEPTION", "WHY_STUDENTS_BELIEVE_IT", "WHY_IT_IS_WRONG", "CORRECT_UNDERSTANDING", "DIAGNOSTIC_QUESTION", "DIAGNOSTIC_ANSWER"):
                fname = field_m.group(1)
                fval = field_m.group(2).strip()
                # Handle multi-line values
                if fname in fields:
                    fields[fname] += "\n" + fval
                else:
                    fields[fname] = fval
                i += 1
                continue

            i += 1

        records.append({
            "misconception_id": mis_id,
            "misconception_text": fields.get("THE_MISCONCEPTION"),
            "correction": fields.get("CORRECT_UNDERSTANDING"),
            "why_wrong": fields.get("WHY_IT_IS_WRONG") or fields.get("WHY_STUDENTS_BELIEVE_IT"),
            "diagnostic_question": fields.get("DIAGNOSTIC_QUESTION"),
            "diagnostic_answer": fields.get("DIAGNOSTIC_ANSWER"),
            "remediation": None,
            "target_nodes": [],
            "topic": None,
            "frequency": None,
            "source_ref": None,
            "source_file": file_path,
            "source_format": "I_bs_mis",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


# ---------------------------------------------------------------------------
# Format J: Junior — M1: "text" / Wrong: / Correct: / Fix:
# ---------------------------------------------------------------------------

_MIS_PATTERN_J = re.compile(r'^\s*(M\d+):\s*"(.+?)"\s*$')

def _parse_format_j(lines: list[str], file_path: str) -> list[dict]:
    """Parse junior-style: M1: "text" / Wrong: / Correct: / Fix:"""
    records = []
    i = 0

    while i < len(lines):
        line = lines[i]
        m = _MIS_PATTERN_J.match(line)
        if not m:
            i += 1
            continue

        mis_id = m.group(1)
        mis_text = m.group(2).strip()
        i += 1

        wrong = None
        correct = None
        fix = None
        current_field = None
        current_lines = []

        while i < len(lines):
            cont = lines[i].strip()

            if _MIS_PATTERN_J.match(lines[i]):
                break

            if cont.startswith("Wrong:"):
                if current_field and len(current_lines) > 1:
                    _finalize_j(current_field, current_lines, locals())
                wrong = cont[6:].strip()
                current_field = "wrong"
                current_lines = [wrong]
                i += 1
                continue

            if cont.startswith("Correct:"):
                if current_field == "wrong" and len(current_lines) > 1:
                    wrong = "\n".join(current_lines).strip()
                correct = cont[8:].strip()
                current_field = "correct"
                current_lines = [correct]
                i += 1
                continue

            if cont.startswith("Fix:"):
                if current_field == "correct" and len(current_lines) > 1:
                    correct = "\n".join(current_lines).strip()
                fix = cont[4:].strip()
                current_field = "fix"
                current_lines = [fix]
                i += 1
                continue

            if current_field and cont:
                current_lines.append(cont)

            i += 1

        if current_field == "correct" and len(current_lines) > 1:
            correct = "\n".join(current_lines).strip()
        elif current_field == "fix" and len(current_lines) > 1:
            fix = "\n".join(current_lines).strip()

        records.append({
            "misconception_id": mis_id,
            "misconception_text": mis_text,
            "correction": correct,
            "why_wrong": wrong,
            "diagnostic_question": None,
            "diagnostic_answer": None,
            "remediation": fix,
            "target_nodes": [],
            "topic": None,
            "frequency": None,
            "source_ref": None,
            "source_file": file_path,
            "source_format": "J_junior_mis",
            "parser_id": PARSER_ID,
            "parser_version": PARSER_VERSION,
        })

    return records


def _finalize_j(field, lines, scope):
    pass


# ---------------------------------------------------------------------------
# Main parser
# ---------------------------------------------------------------------------

_FORMAT_DISPATCH = {
    "A_node_cfq": _parse_format_a,
    "B_mis_line": _parse_format_b,
    "C_mis_block": _parse_format_c,
    "D_mis_simple": _parse_format_d,
    "E_mis_pp": _parse_format_e,
    "F_appmath_mis": _parse_format_f,
    "G_chem_mis": _parse_format_g,
    "H_geo_mis": _parse_format_h,
    "I_bs_mis": _parse_format_i,
    "J_junior_mis": _parse_format_j,
}


def parse_file(file_path: Path) -> list[dict]:
    """Parse a misconception .marker file into a list of misconception records."""
    content = file_path.read_text(encoding="utf-8-sig")
    lines = content.split("\n")

    fmt = _detect_format(lines)
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
        description="Parses misconceptions .marker files. Auto-detects 5 formats: "
                    "A_node_cfq, B_mis_line, C_mis_block, D_mis_simple, E_mis_pp.",
        parse_func=parse_file,
        parser_id=PARSER_ID,
        tier=1,
    )
