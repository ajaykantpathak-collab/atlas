"""Enrichment parser — parses .marker enrichment files into node records.

Format:
    === SUBJECT CLASS N NODE ENRICHMENT -- PART X ===

    --- NODE cN_subj_NNN ---
    TITLE: ...
    DEFINITION: |
      multi-line content
    TEXT_WALKTHROUGH: |
      multi-line content
    ELI5: |
      multi-line content
    COMMON_MISCONCEPTION: |
      multi-line content
    DIAGNOSTIC_QUESTION: |
      Q1 (recall): ...
      Answer: ...
      Q2 (reasoning): ...
      Answer: ...
      ...
    ON_FAILURE: |
      Q1 fails -> Review cN_subj_NNN -- ...
      ...
    COGNITIVE_LEVEL: evaluate
    MASTERY_CRITERIA: |
      multi-line content
    SCOPE_BOUNDARY: |
      multi-line content

Each file may contain multiple nodes. Each node has a consistent set
of fields. Some fields may be absent in some nodes — that's fine, we
store None for missing fields rather than forcing data.

Output: list of dicts, one per node, with keys:
    node_id, title, definition, text_walkthrough, eli5,
    common_misconception, diagnostic_questions (parsed list),
    on_failure (parsed list), cognitive_level, mastery_criteria,
    scope_boundary, source_file, parser_id, parser_version
"""

import re
from pathlib import Path
from typing import Optional

# Parser metadata
PARSER_ID = "enrichment_v1"
PARSER_VERSION = "1.0.0"
CONTENT_TYPE = "enrichment"

# Node delimiter: --- NODE c10_phy_001 ---
_NODE_DELIMITER_RE = re.compile(r"^---\s+NODE\s+(\S+)\s+---\s*$")

# Field pattern: FIELD_NAME: or FIELD_NAME: |
# Matches at start of line, field name is uppercase letters, digits, underscores
# (ELI5 has a digit, so we need [A-Z0-9_])
_FIELD_RE = re.compile(r"^([A-Z][A-Z0-9_]+):\s*(.*)$")

# Known fields (in expected order, though not all may be present)
_KNOWN_FIELDS = {
    "TITLE",
    "DEFINITION",
    "TEXT_WALKTHROUGH",
    "ELI5",
    "COMMON_MISCONCEPTION",
    "DIAGNOSTIC_QUESTION",
    "ON_FAILURE",
    "COGNITIVE_LEVEL",
    "MASTERY_CRITERIA",
    "SCOPE_BOUNDARY",
    "EXAMPLES",  # sometimes present
}

# Fields that use pipe (|) multi-line syntax
_MULTILINE_FIELDS = {
    "DEFINITION",
    "TEXT_WALKTHROUGH",
    "ELI5",
    "COMMON_MISCONCEPTION",
    "DIAGNOSTIC_QUESTION",
    "ON_FAILURE",
    "MASTERY_CRITERIA",
    "SCOPE_BOUNDARY",
    "EXAMPLES",
    "SYLLABUS",
}

# Single-line fields
_SINGLELINE_FIELDS = {
    "TITLE",
    "COGNITIVE_LEVEL",
}


def _parse_node_block(lines: list[str], node_id: str) -> dict:
    """Parse the lines belonging to a single node into a record dict.

    Args:
        lines: lines between this node delimiter and the next (or EOF).
        node_id: the node ID extracted from the delimiter.

    Returns:
        dict with parsed fields.
    """
    record = {
        "node_id": node_id,
        "title": None,
        "definition": None,
        "text_walkthrough": None,
        "eli5": None,
        "common_misconception": None,
        "diagnostic_questions": None,  # will be parsed list
        "on_failure": None,  # will be parsed list
        "cognitive_level": None,
        "mastery_criteria": None,
        "scope_boundary": None,
        "examples": None,
        "source_file": None,  # set by caller
        "parser_id": PARSER_ID,
        "parser_version": PARSER_VERSION,
    }

    i = 0
    while i < len(lines):
        line = lines[i]

        # Skip empty lines and section headers
        if not line.strip() or line.startswith("==="):
            i += 1
            continue

        # Check if this is a field header
        field_match = _FIELD_RE.match(line)
        if not field_match:
            i += 1
            continue

        field_name = field_match.group(1)
        field_value_start = field_match.group(2).strip()

        # Skip unknown fields (they go to review queue, not forced)
        if field_name not in _KNOWN_FIELDS and field_name not in _MULTILINE_FIELDS:
            i += 1
            continue

        # Determine if this is a multi-line field (ends with |)
        is_multiline = field_value_start.endswith("|")
        if is_multiline:
            field_value_start = field_value_start[:-1].strip()

        if is_multiline:
            # Collect continuation lines (indented or empty, until next
            # field header or node delimiter)
            content_lines = []
            if field_value_start:
                content_lines.append(field_value_start)
            i += 1
            while i < len(lines):
                cont_line = lines[i]
                # Stop at next field header or node delimiter
                if _FIELD_RE.match(cont_line) or _NODE_DELIMITER_RE.match(cont_line):
                    break
                content_lines.append(cont_line)
                i += 1
            field_value = "\n".join(content_lines).strip()
        else:
            # Single-line field
            field_value = field_value_start
            i += 1

        # Map field name to record key
        # Some field names differ from record keys (e.g. DIAGNOSTIC_QUESTION
        # -> diagnostic_questions, COMMON_MISCONCEPTION -> common_misconception)
        field_key_map = {
            "diagnostic_question": "diagnostic_questions",
        }
        field_lower = field_name.lower()
        field_key = field_key_map.get(field_lower, field_lower)
        if field_key in record:
            record[field_key] = field_value if field_value else None

    # Parse diagnostic questions into structured list
    if record.get("diagnostic_questions"):
        record["diagnostic_questions"] = _parse_diagnostic_questions(
            record["diagnostic_questions"]
        )

    # Parse on_failure into structured list
    if record.get("on_failure"):
        record["on_failure"] = _parse_on_failure(record["on_failure"])
        # Fill in self-references: where review_node_id is None,
        # set it to the current node_id (the student should review
        # the same node they failed on)
        for item in record["on_failure"]:
            if item.get("review_node_id") is None:
                item["review_node_id"] = node_id

    # Derive cognitive_level if missing or rambling.
    # If COGNITIVE_LEVEL field is absent, extract it from the Bloom tags
    # in diagnostic_questions (Q1 (recall), Q2 (understand), etc.).
    # The node's cognitive_level is the highest Bloom level across all
    # diagnostic questions.
    # Also clean rambling values (paragraphs) down to a single word.
    _BLOOM_ORDER = [
        "recall", "remember", "understand", "understanding",
        "apply", "analyse", "analyze", "evaluate", "create",
    ]
    _BLOOM_NORMALISE = {
        "understanding": "understand",
        "analyse": "analyze",
        "remember": "recall",
    }
    cl = record.get("cognitive_level")
    needs_fix = (not cl) or (isinstance(cl, str) and len(cl) > 20)
    if needs_fix and record.get("diagnostic_questions"):
        levels = []
        for q in record["diagnostic_questions"]:
            ct = q.get("cognitive_type", "")
            if ct:
                ct_lower = ct.lower().strip()
                if ct_lower in _BLOOM_ORDER:
                    levels.append(ct_lower)
        if levels:
            # Find highest Bloom level
            highest = "recall"
            for lvl in levels:
                if _BLOOM_ORDER.index(lvl) > _BLOOM_ORDER.index(highest):
                    highest = lvl
            record["cognitive_level"] = _BLOOM_NORMALISE.get(highest, highest)

    # If still rambling (no diagnostic_questions tags to fall back on),
    # extract the first Bloom level word found in the text
    cl = record.get("cognitive_level")
    if isinstance(cl, str) and len(cl) > 20:
        cl_lower = cl.lower()
        for bloom_word in ["create", "evaluate", "analyze", "analyse",
                           "apply", "understand", "understanding",
                           "recall", "remember"]:
            if bloom_word in cl_lower:
                record["cognitive_level"] = _BLOOM_NORMALISE.get(bloom_word, bloom_word)
                break

    # Final cleanup: normalise any remaining short/non-standard values
    cl = record.get("cognitive_level")
    if isinstance(cl, str):
        cl_lower = cl.lower().strip()
        if cl_lower in _BLOOM_NORMALISE:
            record["cognitive_level"] = _BLOOM_NORMALISE[cl_lower]
        # Catch truncated values like "under" -> "understand"
        elif cl_lower == "under":
            record["cognitive_level"] = "understand"

    return record


def _parse_diagnostic_questions(raw: str) -> list[dict]:
    """Parse DIAGNOSTIC_QUESTION block into structured list.

    Format:
        Q1 (recall): question text
        Answer: answer text
        Q2 (reasoning): question text
        Answer: answer text
        ...

    Returns:
        list of {"number": int, "cognitive_type": str, "question": str, "answer": str}
    """
    questions = []

    # Split on QN (cognitive_type): pattern
    # Pattern: Q1 (recall): ... or Q1 (understand): ... etc
    # Questions may be indented with leading whitespace
    q_pattern = re.compile(
        r"Q(\d+)\s*\((\w+)\)\s*:\s*(.*?)(?=\n\s*Q\d+\s*\(|\Z)",
        re.DOTALL,
    )

    for match in q_pattern.finditer(raw):
        q_num = int(match.group(1))
        cognitive_type = match.group(2).lower()
        q_and_a = match.group(3).strip()

        # Split question and answer
        answer = None
        question = q_and_a

        # Look for "Answer:" within the block (may be indented)
        answer_match = re.search(r"\n\s*Answer\s*:\s*(.*)", q_and_a, re.DOTALL)
        if answer_match:
            question = q_and_a[: answer_match.start()].strip()
            answer = answer_match.group(1).strip()

        questions.append({
            "number": q_num,
            "cognitive_type": cognitive_type,
            "question": question,
            "answer": answer,
        })

    return questions


def _parse_on_failure(raw: str) -> list[dict]:
    """Parse ON_FAILURE block into structured list.

    Handles multiple formats found in the corpus:

    Format A (structured, higher classes):
        Q1 fails -> Review DEPTH_PREREQ node c9_commstud_022 (Meaning...) to recall...
        Q2 fails -> Review PREREQ node cN_subj_NNN -- remediation text
        Q3 fails -> Review cN_subj_NNN -- remediation text

    Format B (free text, Class 1-5):
        Q1 fails -> Review this foundational node c1_bio_001 to recall...
        Q2 fails -> This is a root node, so re-read the DEFINITION...
        Q3 fails -> Since this is a foundational node, the prereq is the
                    same node c1_bio_008. Review the DEFINITION...
        Q4 fails -> Re-read the COMMON_MISCONCEPTION section of this
                    node (c1_math_001). Focus on...

    Strategy:
    1. Try "QN fails ->" format (most subjects).
    2. If no matches, try "If the student cannot answer QN" format
       (history and some others).
    3. Extract node_ids from the text using the standard node_id pattern.
    4. Determine prereq_type from keywords (PREREQ, DEPTH_PREREQ,
       CROSS_SUBJECT_PREREQ) in the text.
    5. If no other node_id found, it's a self-reference (review_node_id
       will be set to None — caller can fill in the current node_id).
    6. The full text after the arrow is the remediation text.

    Returns:
        list of {"question_number": int, "review_node_id": str or None,
                  "remediation": str, "prereq_type": str}
    """
    items = []

    # Strict node_id pattern: c\d+_[a-z]+_\d+ (no trailing punctuation)
    node_id_re = re.compile(r"\b(c\d+_[a-z]+(?:_[a-z]+)*_\d+)\b", re.IGNORECASE)

    # Prereq type keywords
    prereq_type_order = [
        "CROSS_SUBJECT_PREREQ",
        "DEPTH_PREREQ",
        "PREREQ",
    ]

    # Format 1: "QN fails -> text" (most subjects)
    entry_pattern = re.compile(
        r"Q(\d+)\s+fails?\s*->\s*(.*?)(?=\n\s*Q\d+\s+fails?|\Z)",
        re.DOTALL,
    )

    matches = list(entry_pattern.finditer(raw))

    if not matches:
        # Format 2: "If the student cannot answer QN (recall), ..." (history)
        # or "If the student cannot answer the recall question (Q1), ..."
        entry_pattern2 = re.compile(
            r"(?:If\s+the\s+student\s+cannot\s+(?:answer|explain|identify|state|recall|describe|list|analyse|analyze)\s+"
            r"(?:the\s+\w+\s+question\s+)?)?"
            r"Q(\d+)\s*[,.]?\s*(.*?)(?=\n\s*(?:If\s+the\s+student\s+cannot|Q\d+\s*[,.]|\Z))",
            re.DOTALL | re.IGNORECASE,
        )
        matches = list(entry_pattern2.finditer(raw))

    if not matches:
        # Format 3: Just "QN" at start of line, followed by remediation text
        entry_pattern3 = re.compile(
            r"^\s*Q(\d+)\s*[:.]?\s*(.*?)(?=\n\s*Q\d+\s*[:.]?|\Z)",
            re.DOTALL | re.MULTILINE,
        )
        matches = list(entry_pattern3.finditer(raw))

    if not matches:
        # Format 4: Continuous paragraph with "If the student cannot..." clauses
        # No Q numbers — split on "If the student cannot" and assign Q1, Q2, ...
        if re.search(r"If\s+the\s+student\s+cannot", raw, re.IGNORECASE):
            clauses = re.split(
                r"(?:^|\s+)If\s+the\s+student\s+cannot\s+",
                raw, flags=re.IGNORECASE
            )
            q_num = 1
            for clause in clauses:
                clause = clause.strip()
                if not clause or len(clause) < 20:
                    continue
                # Find node_ids in the clause
                node_ids = node_id_re.findall(clause)
                prereq_type = "PREREQ"
                clause_upper = clause.upper()
                for pt in prereq_type_order:
                    if pt in clause_upper:
                        prereq_type = pt
                        break
                review_node_id = node_ids[0].lower() if node_ids else None
                items.append({
                    "question_number": q_num,
                    "review_node_id": review_node_id,
                    "prereq_type": prereq_type,
                    "remediation": clause,
                })
                q_num += 1
            return items

    if not matches:
        # Format 5: Continuous paragraph with "If the student struggles..." or
        # similar variants. No Q numbers, no "cannot" keyword.
        # Split on "If the student" + verb patterns.
        if re.search(r"If\s+the\s+student\s+(?:struggles|continues|has difficulty|finds)",
                      raw, re.IGNORECASE):
            clauses = re.split(
                r"(?:^|\s+)If\s+the\s+student\s+(?:struggles|continues|has\s+difficulty|finds)\S*\s+",
                raw, flags=re.IGNORECASE
            )
            q_num = 1
            for clause in clauses:
                clause = clause.strip()
                if not clause or len(clause) < 20:
                    continue
                node_ids = node_id_re.findall(clause)
                prereq_type = "PREREQ"
                clause_upper = clause.upper()
                for pt in prereq_type_order:
                    if pt in clause_upper:
                        prereq_type = pt
                        break
                review_node_id = node_ids[0].lower() if node_ids else None
                items.append({
                    "question_number": q_num,
                    "review_node_id": review_node_id,
                    "prereq_type": prereq_type,
                    "remediation": clause,
                })
                q_num += 1
            return items

    if not matches and raw.strip():
        # Format 6 (fallback): Single continuous paragraph, no Q numbers,
        # no "If the student" pattern. Treat the whole block as one entry.
        text = raw.strip()
        node_ids = node_id_re.findall(text)
        prereq_type = "PREREQ"
        text_upper = text.upper()
        for pt in prereq_type_order:
            if pt in text_upper:
                prereq_type = pt
                break
        review_node_id = node_ids[0].lower() if node_ids else None
        items.append({
            "question_number": 1,
            "review_node_id": review_node_id,
            "prereq_type": prereq_type,
            "remediation": text,
        })

    for match in matches:
        q_num = int(match.group(1))
        text = match.group(2).strip()

        if not text:
            continue

        # Find all node_ids in the text
        node_ids = node_id_re.findall(text)

        # Determine prereq_type from keywords
        prereq_type = "PREREQ"  # default
        text_upper = text.upper()
        for pt in prereq_type_order:
            if pt in text_upper:
                prereq_type = pt
                break

        # Pick the review_node_id:
        # - First valid node_id found in the text
        # - If none found, set to None (self-reference — caller fills in)
        review_node_id = None
        if node_ids:
            review_node_id = node_ids[0].lower()

        # Remediation is the full text (cleaned up)
        remediation = text

        items.append({
            "question_number": q_num,
            "review_node_id": review_node_id,
            "prereq_type": prereq_type,
            "remediation": remediation,
        })

    return items


def parse_file(file_path: Path) -> list[dict]:
    """Parse an enrichment .marker file into a list of node records.

    Args:
        file_path: Path to the .marker file.

    Returns:
        list of node record dicts. One per --- NODE --- block.
    """
    content = file_path.read_text(encoding="utf-8-sig")
    lines = content.split("\n")

    # Find all node delimiter positions
    node_starts = []
    for i, line in enumerate(lines):
        if _NODE_DELIMITER_RE.match(line):
            match = _NODE_DELIMITER_RE.match(line)
            node_starts.append((i, match.group(1)))

    if not node_starts:
        # No nodes found — return empty list, file goes to review queue
        return []

    records = []
    for idx, (start_line, node_id) in enumerate(node_starts):
        # Lines for this node: from after the delimiter to the next
        # delimiter (or EOF)
        end_line = node_starts[idx + 1][0] if idx + 1 < len(node_starts) else len(lines)
        node_lines = lines[start_line + 1 : end_line]

        record = _parse_node_block(node_lines, node_id)
        record["source_file"] = str(file_path)
        record["source_format"] = "enrichment_node"
        records.append(record)

    return records


def register():
    """Register this parser with the parser registry."""
    from backend.content_parsers.parser_registry import register_parser

    register_parser(
        content_type=CONTENT_TYPE,
        version=PARSER_VERSION,
        description="Parses enrichment .marker files into node records with "
                    "definition, walkthrough, ELI5, misconceptions, "
                    "diagnostic questions, and on_failure remediation paths.",
        parse_func=parse_file,
        parser_id=PARSER_ID,
        tier=1,
    )
