"""
bloom_marker_parser.py
Parse .bloom.marker files (new enrichment format) into structured dicts.

The .bloom.marker format uses YAML-like structure with these fields:
  TITLE, DEFINITION, COGNITIVE_LEVEL, MASTERY_CRITERIA, SCOPE_BOUNDARY,
  TEXT_WALKTHROUGH, ELI5, DIAGNOSTIC_QUESTIONS (Q1-Q5 with QUESTION/ANSWER/
  ANSWER_TYPE/OPTIONS/WORKING/HINT), REMEDIATION_PATHS, COMMON_MISCONCEPTION,
  ON_FAILURE

This parser is READ-ONLY — it never modifies source files.
"""

from __future__ import annotations

import logging
import os
import re
from typing import Any

logger = logging.getLogger(__name__)

# Top-level fields we extract
TOP_LEVEL_FIELDS = {
    "TITLE", "DEFINITION", "COGNITIVE_LEVEL", "MASTERY_CRITERIA",
    "TEXT_WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION", "ON_FAILURE",
}

# Fields with sub-structure (TEACH/DO_NOT_TEACH/ALREADY_COVERED etc.)
STRUCTURED_FIELDS = {"SCOPE_BOUNDARY"}

# Block fields that use YAML | literal blocks
BLOCK_FIELDS = TOP_LEVEL_FIELDS | STRUCTURED_FIELDS


def _extract_node_id(content: str) -> str | None:
    m = re.match(r"^---\s*NODE\s+(\S+)\s*---", content.strip())
    return m.group(1) if m else None


def _parse_block_value(lines: list[str], start: int, base_indent: int) -> tuple[str, int]:
    """Parse a YAML literal block (|) — indented continuation lines."""
    value_lines: list[str] = []
    i = start
    while i < len(lines):
        line = lines[i]
        if line.strip() == "":
            value_lines.append("")
            i += 1
            continue
        indent = len(line) - len(line.lstrip())
        if indent < base_indent:
            break
        value_lines.append(line.strip())
        i += 1
    return "\n".join(value_lines).strip(), i


def _parse_scope_boundary(text: str) -> dict:
    """Parse SCOPE_BOUNDARY block with TEACH/DO_NOT_TEACH/ALREADY_COVERED."""
    result = {"teach": "", "do_not_teach": "", "already_covered": ""}
    current = None
    for line in text.split("\n"):
        stripped = line.strip()
        if stripped.startswith("TEACH:"):
            current = "teach"
            result["teach"] = stripped[6:].strip()
        elif stripped.startswith("DO_NOT_TEACH:"):
            current = "do_not_teach"
            result["do_not_teach"] = stripped[12:].strip()
        elif stripped.startswith("ALREADY_COVERED:"):
            current = "already_covered"
            result["already_covered"] = stripped[16:].strip()
        elif current and stripped:
            result[current] += " " + stripped
    return result


def _parse_diagnostic_questions(content: str, start_line: int, lines: list[str]) -> tuple[list[dict], int]:
    """Parse DIAGNOSTIC_QUESTIONS block with Q1-Q5 sub-questions."""
    questions: list[dict] = []
    i = start_line
    current_q: dict[str, Any] | None = None
    current_field: str | None = None

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # End of diagnostic questions block — a new top-level field
        if stripped and not stripped.startswith("Q") and not stripped.startswith("  ") and ":" in stripped:
            field_label = stripped.split(":")[0].strip()
            if field_label in TOP_LEVEL_FIELDS or field_label in STRUCTURED_FIELDS or field_label == "REMEDIATION_PATHS":
                if current_q:
                    questions.append(current_q)
                return questions, i

        # New question: Q1 (recall):, Q2 (reasoning):, or Q1: (without Bloom level)
        q_match = re.match(r"^Q(\d+)\s*(?:\((\w+)\))?\s*:\s*(.*)$", stripped)
        if q_match:
            if current_q:
                questions.append(current_q)
            bloom_level = q_match.group(2) or ""
            # If no Bloom level in parens, infer from question number
            if not bloom_level:
                bloom_levels_map = {1: "recall", 2: "reasoning", 3: "evaluate",
                                    4: "apply", 5: "create"}
                bloom_level = bloom_levels_map.get(int(q_match.group(1)), "unknown")
            current_q = {
                "q_num": int(q_match.group(1)),
                "bloom_level": bloom_level,
                "question": q_match.group(3).strip(),
                "answer": "",
                "answer_type": "text",
                "options": [],
                "working": "",
                "hint": "",
            }
            current_field = None
            i += 1
            continue

        # Sub-fields of a question
        if current_q is not None:
            if stripped.startswith("QUESTION:"):
                current_q["question"] = stripped[9:].strip()
                current_field = "question"
            elif stripped.startswith("ANSWER:"):
                current_q["answer"] = stripped[7:].strip()
                current_field = "answer"
            elif stripped.startswith("ANSWER_TYPE:"):
                current_q["answer_type"] = stripped[12:].strip().lower()
                current_field = None
            elif stripped.startswith("OPTIONS:"):
                opts_raw = stripped[8:].strip()
                # Parse [opt1, opt2, opt3, opt4] format
                opts_raw = opts_raw.strip("[]")
                current_q["options"] = [o.strip().strip("'\"") for o in opts_raw.split(",") if o.strip()]
                current_field = None
            elif stripped.startswith("WORKING:"):
                current_q["working"] = stripped[8:].strip()
                current_field = "working"
            elif stripped.startswith("HINT:"):
                current_q["hint"] = stripped[5:].strip()
                current_field = "hint"
            elif stripped.startswith("UNIT:"):
                current_q["unit"] = stripped[5:].strip()
                current_field = None
            elif stripped.startswith("FORMULA:"):
                current_q["formula"] = stripped[8:].strip()
                current_field = None
            elif current_field and stripped:
                # Continuation of multi-line field
                current_q[current_field] += " " + stripped

        i += 1

    if current_q:
        questions.append(current_q)
    return questions, i


def _parse_remediation_paths(text: str) -> dict:
    """Parse REMEDIATION_PATHS block: Q1_FAILS -> REVIEW xxx | GUIDANCE: yyy"""
    result: dict[str, dict] = {}
    for line in text.split("\n"):
        stripped = line.strip()
        m = re.match(r"^(Q\d+_FAILS)\s*->\s*REVIEW\s+(\S+)\s*\|\s*GUIDANCE:\s*(.*)$", stripped)
        if m:
            result[m.group(1)] = {
                "review": m.group(2).strip(),
                "guidance": m.group(3).strip(),
            }
    return result


def parse_bloom_marker(filepath: str) -> dict | None:
    """Parse a single .bloom.marker file into a structured dict.

    Returns None if the file cannot be parsed.
    """
    try:
        with open(filepath, "r", encoding="utf-8") as fh:
            content = fh.read()
    except Exception as exc:
        logger.warning("Failed to read %s: %s", filepath, exc)
        return None

    node_id = _extract_node_id(content)
    if not node_id:
        logger.warning("No NODE header in %s", filepath)
        return None

    lines = content.split("\n")
    result: dict[str, Any] = {"node_id": node_id, "filepath": filepath}

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped or stripped.startswith("---"):
            i += 1
            continue

        if ":" not in stripped:
            i += 1
            continue

        colon_pos = stripped.index(":")
        field_label = stripped[:colon_pos].strip().upper()
        rest = stripped[colon_pos + 1:].strip()

        # --- DIAGNOSTIC_QUESTIONS (multi-line block with sub-questions) ---
        if field_label == "DIAGNOSTIC_QUESTIONS":
            questions, i = _parse_diagnostic_questions(content, i + 1, lines)
            result["diagnostic_questions"] = questions
            continue

        # --- REMEDIATION_PATHS ---
        if field_label == "REMEDIATION_PATHS":
            # Both "|" and empty rest mean the content is on following indented lines
            if rest == "|" or rest == "":
                # Collect indented block
                block_lines: list[str] = []
                j = i + 1
                while j < len(lines):
                    l = lines[j]
                    if l.strip() == "":
                        j += 1
                        continue
                    indent = len(l) - len(l.lstrip())
                    if indent == 0 and l.strip() and not l.strip().startswith("Q"):
                        break
                    if indent > 0 or l.strip().startswith("Q"):
                        block_lines.append(l.strip())
                        j += 1
                    else:
                        break
                result["remediation_paths"] = _parse_remediation_paths("\n".join(block_lines))
                i = j
            else:
                result["remediation_paths"] = _parse_remediation_paths(rest)
                i += 1
            continue

        # --- SCOPE_BOUNDARY ---
        if field_label == "SCOPE_BOUNDARY":
            if rest == "|":
                base_indent = 2
                value, i = _parse_block_value(lines, i + 1, base_indent)
            else:
                value = rest
                i += 1
            result["scope_boundary"] = _parse_scope_boundary(value)
            continue

        # --- Standard block fields (TITLE, DEFINITION, etc.) ---
        if field_label in TOP_LEVEL_FIELDS:
            field_key = field_label.lower()
            if rest == "|":
                base_indent = 2
                value, i = _parse_block_value(lines, i + 1, base_indent)
            else:
                value = rest
                i += 1
            result[field_key] = value
            continue

        # Unknown field — skip
        i += 1

    return result


def load_all_bloom_markers(directory: str) -> dict[str, dict]:
    """Load all .bloom.marker files from a directory.

    Returns a dict mapping node_id -> parsed content.
    """
    result: dict[str, dict] = {}
    if not os.path.isdir(directory):
        logger.warning("Directory does not exist: %s", directory)
        return result

    for fname in os.listdir(directory):
        if not fname.endswith(".bloom.marker"):
            continue
        fpath = os.path.join(directory, fname)
        parsed = parse_bloom_marker(fpath)
        if parsed and parsed.get("node_id"):
            result[parsed["node_id"]] = parsed

    logger.info("Loaded %d bloom marker files from %s", len(result), directory)
    return result
