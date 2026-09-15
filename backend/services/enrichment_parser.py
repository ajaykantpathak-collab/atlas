#!/usr/bin/env python3
"""Parse enrichment marker files and node JSON files into structured data."""

import argparse
import glob
import json
import logging
import os
import re
import sys
from difflib import SequenceMatcher

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

MARKER_DIR = r"D:\platform\cbse_data\enrichment"
NODE_DIR = r"D:\platform\cbse_data\nodes\by_subject"
OUTPUT_FILE = r"D:\platform\cbse_data\enrichment_parsed.json"

TYPO_MAP = {
    "common_misceponction": "common_misconception",
    "common_miscepecton": "common_misconception",
    "common_miscepetion": "common_misconception",
    "common_misceception": "common_misconception",
    "common_misconcetion": "common_misconception",
    "common_misconcption": "common_misconception",
    "common_misconception": "common_misconception",
    "definution": "definition",
    "definence": "definition",
    "defintion": "definition",
    "definiton": "definition",
    "difinition": "definition",
    "scobe_boundary": "scope_boundary",
    "scope_boundry": "scope_boundary",
    "scop_boundary": "scope_boundary",
    "scope_boundarie": "scope_boundary",
    "mastery_crietria": "mastery_criteria",
    "mastery_critera": "mastery_criteria",
    "cognative_level": "cognitive_level",
    "cognitive_levl": "cognitive_level",
    "text_walkthough": "text_walkthrough",
    "text_walkthrouh": "text_walkthrough",
    "diagnostic_queston": "diagnostic_question",
    "on_failue": "on_failure",
    "on_failur": "on_failure",
}

CANONICAL_FIELDS = [
    "title",
    "definition",
    "cognitive_level",
    "mastery_criteria",
    "scope_boundary",
    "text_walkthrough",
    "diagnostic_question",
    "common_misconception",
    "on_failure",
]

FUZZY_THRESHOLD = 0.75


def fuzzy_match_field(field_name: str) -> str | None:
    field_lower = field_name.lower().strip()
    if field_lower in TYPO_MAP:
        return TYPO_MAP[field_lower]
    for canonical in CANONICAL_FIELDS:
        if field_lower == canonical:
            return canonical
        if SequenceMatcher(None, field_lower, canonical).ratio() >= FUZZY_THRESHOLD:
            return canonical
    return None


def parse_field_value(raw_value: str, field_name: str) -> any:
    if field_name == "common_misconception":
        return parse_misconceptions(raw_value)
    if field_name == "diagnostic_question":
        return parse_diagnostic_question(raw_value)
    return raw_value


def parse_misconceptions(text: str) -> list[dict]:
    misconceptions = []
    if not text:
        return misconceptions
    for line in text.strip().split("\n"):
        line = line.strip()
        if not line:
            continue
        m = re.match(r'^(.+?)\s*:\s*"(.*)"\s+(.*)$', line)
        if m:
            misconceptions.append(
                {"misconception": m.group(2), "explanation": m.group(3).strip()}
            )
    return misconceptions


def parse_diagnostic_question(text: str) -> dict | None:
    if not text:
        return None
    result: dict[str, str] = {}
    current_key = None
    current_val: list[str] = []
    for line in text.strip().split("\n"):
        stripped = line.strip()
        if stripped.startswith("Q:"):
            if current_key:
                result[current_key] = "\n".join(current_val).strip()
            current_key = "question"
            current_val = [stripped[2:].strip()]
        elif stripped.startswith("A:"):
            if current_key:
                result[current_key] = "\n".join(current_val).strip()
            current_key = "answer"
            current_val = [stripped[2:].strip()]
        elif stripped.startswith("LEVEL:"):
            if current_key:
                result[current_key] = "\n".join(current_val).strip()
            current_key = "level"
            current_val = [stripped[6:].strip()]
        elif current_key and stripped:
            current_val.append(stripped)
    if current_key:
        result[current_key] = "\n".join(current_val).strip()
    return result if result else None


def parse_marker_file(filepath: str) -> dict | None:
    try:
        with open(filepath, "r", encoding="utf-8") as fh:
            content = fh.read()
    except Exception as exc:
        logger.warning("Failed to read %s: %s", filepath, exc)
        return None

    lines = content.split("\n")
    result: dict = {}
    node_id = None

    for line in lines[:10]:
        m = re.match(r"^---\s*NODE\s+(\S+)\s*---", line.strip())
        if m:
            node_id = m.group(1)
            break

    if not node_id:
        logger.warning("No NODE header found in %s", filepath)
        return None

    result["node_id"] = node_id

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
        field_label = stripped[:colon_pos].strip()
        rest_of_line = stripped[colon_pos + 1 :].strip()

        canonical = fuzzy_match_field(field_label)
        if not canonical:
            i += 1
            continue

        if rest_of_line == "|":
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            base_indent = len(lines[j]) - len(lines[j].lstrip()) if j < len(lines) else 0
            value_lines: list[str] = []
            k = j
            while k < len(lines):
                l = lines[k]
                s = l.strip()
                if not s:
                    value_lines.append("")
                    k += 1
                    continue
                indent = len(l) - len(s)
                if indent < base_indent:
                    break
                value_lines.append(s)
                k += 1
            raw = "\n".join(value_lines).strip()
            i = k
        else:
            raw = rest_of_line
            i += 1

        result[canonical] = parse_field_value(raw, canonical)

    return result


def load_node_json_files() -> dict[str, dict]:
    nodes: dict[str, dict] = {}
    files = glob.glob(os.path.join(NODE_DIR, "*.json"))
    logger.info("Found %d node JSON files", len(files))
    for filepath in files:
        try:
            with open(filepath, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            if isinstance(data, dict):
                data = [data]
            for node in data:
                nid = node.get("node_id")
                if nid:
                    nodes[nid] = node
        except Exception as exc:
            logger.warning("Failed to load %s: %s", filepath, exc)
    return nodes


def merge_data(markers: list[dict], nodes: dict[str, dict]) -> list[dict]:
    merged: list[dict] = []
    for marker in markers:
        nid = marker.get("node_id")
        if not nid:
            continue
        entry = dict(nodes.get(nid, {}))
        for key, value in marker.items():
            if key != "node_id" and value is not None:
                if key not in entry or not entry.get(key):
                    entry[key] = value
        for field in [
            "title",
            "definition",
            "text_walkthrough",
            "cognitive_level",
            "mastery_criteria",
            "scope_boundary",
            "on_failure",
        ]:
            if field not in entry:
                entry[field] = None
        if "common_misconceptions" not in entry:
            entry["common_misconceptions"] = []
        if "diagnostic_question" not in entry:
            entry["diagnostic_question"] = None
        merged.append(entry)
    return merged


def parse_all() -> list[dict]:
    logger.info("Starting full parse...")

    logger.info("Loading node JSON files...")
    nodes = load_node_json_files()
    logger.info("Loaded %d nodes", len(nodes))

    logger.info("Loading marker files...")
    marker_files = glob.glob(os.path.join(MARKER_DIR, "*.marker"))
    logger.info("Found %d marker files", len(marker_files))

    markers: list[dict] = []
    failed = 0
    for idx, filepath in enumerate(marker_files, 1):
        if idx % 100 == 0:
            logger.info("Processed %d/%d marker files...", idx, len(marker_files))
        result = parse_marker_file(filepath)
        if result:
            markers.append(result)
        else:
            failed += 1

    logger.info("Parsed %d markers, %d failed", len(markers), failed)

    logger.info("Merging data...")
    merged = merge_data(markers, nodes)
    logger.info("Merged %d entries", len(merged))

    logger.info("Saving to %s...", OUTPUT_FILE)
    try:
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        with open(OUTPUT_FILE, "w", encoding="utf-8") as fh:
            json.dump(merged, fh, indent=2, ensure_ascii=False, default=str)
        logger.info("Saved %d entries", len(merged))
    except Exception as exc:
        logger.error("Failed to save output: %s", exc)
        raise

    return merged


def query_node(node_id: str) -> None:
    if not os.path.exists(OUTPUT_FILE):
        logger.error("Output file not found: %s. Run --parse first.", OUTPUT_FILE)
        sys.exit(1)
    try:
        with open(OUTPUT_FILE, "r", encoding="utf-8") as fh:
            data = json.load(fh)
    except Exception as exc:
        logger.error("Failed to load %s: %s", OUTPUT_FILE, exc)
        sys.exit(1)

    node = next((e for e in data if e.get("node_id") == node_id), None)
    if not node:
        print("Node '{}' not found.".format(node_id))
        sys.exit(1)
    print(json.dumps(node, indent=2, ensure_ascii=False, default=str))


def print_stats() -> None:
    if not os.path.exists(OUTPUT_FILE):
        logger.error("Output file not found: %s. Run --parse first.", OUTPUT_FILE)
        sys.exit(1)
    try:
        with open(OUTPUT_FILE, "r", encoding="utf-8") as fh:
            data = json.load(fh)
    except Exception as exc:
        logger.error("Failed to load %s: %s", OUTPUT_FILE, exc)
        sys.exit(1)

    total = len(data)
    if total == 0:
        print("No data available.")
        return

    cov = {
        "title": sum(1 for d in data if d.get("title")),
        "definition": sum(1 for d in data if d.get("definition")),
        "cognitive_level": sum(1 for d in data if d.get("cognitive_level")),
        "mastery_criteria": sum(1 for d in data if d.get("mastery_criteria")),
        "scope_boundary": sum(1 for d in data if d.get("scope_boundary")),
        "text_walkthrough": sum(1 for d in data if d.get("text_walkthrough")),
        "diagnostic_question": sum(1 for d in data if d.get("diagnostic_question")),
        "common_misconceptions": sum(
            1 for d in data if d.get("common_misconceptions")
        ),
        "on_failure": sum(1 for d in data if d.get("on_failure")),
        "node_data": sum(1 for d in data if d.get("topic")),
    }
    total_mc = sum(len(d.get("common_misconceptions", [])) for d in data)

    print()
    print("=" * 50)
    print("  Enrichment Parser Statistics")
    print("=" * 50)
    print("Total merged entries: {}".format(total))
    print()
    print("Marker enrichment coverage:")
    for field, count in cov.items():
        label = field.replace("_", " ").title()
        print("  {:<22} {:>5}/{:<5} ({:>5.1f}%)".format(
            label, count, total, 100.0 * count / total
        ))
    print()
    print("Total misconceptions parsed: {}".format(total_mc))
    if total > 0:
        print("Avg misconceptions per entry: {:.2f}".format(total_mc / total))
    print("=" * 50)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Enrichment Parser for CBSE marker and node JSON files"
    )
    parser.add_argument(
        "--parse", action="store_true", help="Parse all files and save to JSON"
    )
    parser.add_argument(
        "--query", type=str, metavar="NODE_ID", help="Query a specific node by ID"
    )
    parser.add_argument(
        "--stats", action="store_true", help="Print coverage statistics"
    )
    args = parser.parse_args()

    if args.parse:
        try:
            parse_all()
        except Exception as exc:
            logger.error("Parse failed: %s", exc)
            sys.exit(1)
    elif args.query:
        query_node(args.query)
    elif args.stats:
        print_stats()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()