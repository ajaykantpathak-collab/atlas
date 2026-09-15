"""Validator — validates parsed corpus output across 8 categories.

Categories:
  1. Schema integrity — required fields present, types correct
  2. Reference integrity — node IDs in mappings exist in enrichment
  3. Content quality — non-empty text fields, minimum content length
  4. Duplicate detection — duplicate record_ids flagged
  5. Coverage analysis — field coverage per content type
  6. Format distribution — records per format, flag underrepresented formats
  7. Source traceability — every record has source_file, source_format, parser_id
  8. Cross-reference consistency — enrichment node_ids match mapping node_ids

Output:
  D:\\platform\\parsed_output\\validation_report.json
  D:\\platform\\parsed_output\\validation_issues.jsonl
"""

import json
import re
import sys
from pathlib import Path
from collections import defaultdict, Counter

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

OUTPUT_DIR = Path(r"D:\platform\parsed_output")


def load_jsonl(filepath: Path) -> list:
    """Load a JSONL file into a list of dicts."""
    if not filepath.exists():
        return []
    records = []
    with open(filepath, encoding="utf-8-sig") as f:
        for line in f:
            if line.strip():
                records.append(json.loads(line))
    return records


def validate_schema_integrity(all_records: list, issues: list) -> dict:
    """Category 1: Schema integrity — required fields present, types correct."""
    required_fields = {
        "enrichment": ["record_id", "node_id", "source_file", "parser_id"],
        "question_bank": ["record_id", "question_text", "source_file", "parser_id"],
        "diagnostics": ["record_id", "question_text", "source_file", "parser_id"],
        "papers": ["record_id", "question_text", "source_file", "parser_id"],
        "misconceptions": ["record_id", "misconception_text", "source_file", "parser_id"],
        "drill_banks": ["record_id", "question_text", "source_file", "parser_id"],
    }

    stats = {"checked": 0, "passed": 0, "failed": 0}

    for r in all_records:
        ct = r.get("content_type")
        stats["checked"] += 1

        if ct not in required_fields:
            issues.append({
                "category": "schema_integrity",
                "severity": "warning",
                "record_id": r.get("record_id"),
                "issue": f"Unknown content_type: {ct}",
            })
            stats["failed"] += 1
            continue

        missing = [f for f in required_fields[ct] if not r.get(f)]
        if missing:
            issues.append({
                "category": "schema_integrity",
                "severity": "error",
                "record_id": r.get("record_id"),
                "content_type": ct,
                "issue": f"Missing required fields: {missing}",
            })
            stats["failed"] += 1
        else:
            stats["passed"] += 1

    return stats


def validate_reference_integrity(all_records: list, enrichment_nodes: set, issues: list) -> dict:
    """Category 2: Reference integrity — node IDs in mappings exist in enrichment."""
    mappings = load_jsonl(OUTPUT_DIR / "node_mappings.jsonl")
    stats = {"checked": 0, "valid": 0, "invalid": 0, "unknown_nodes": set()}

    for m in mappings:
        for mn in m.get("mapped_nodes", []):
            nid = mn.get("node_id", "").lower()
            stats["checked"] += 1
            if nid in enrichment_nodes:
                stats["valid"] += 1
            else:
                stats["invalid"] += 1
                stats["unknown_nodes"].add(nid)
                # Only log first few to avoid spam
                if stats["invalid"] <= 20:
                    issues.append({
                        "category": "reference_integrity",
                        "severity": "warning",
                        "record_id": m.get("record_id"),
                        "issue": f"Node ID not found in enrichment: {nid}",
                    })

    stats["unknown_nodes"] = list(stats["unknown_nodes"])[:50]
    return stats


def validate_content_quality(all_records: list, issues: list) -> dict:
    """Category 3: Content quality — non-empty text fields, minimum content length."""
    text_fields = {
        "enrichment": ["definition", "text_walkthrough"],
        "question_bank": ["question_text"],
        "diagnostics": ["question_text"],
        "papers": ["question_text"],
        "misconceptions": ["misconception_text", "correction"],
        "drill_banks": ["question_text"],
    }

    stats = {"checked": 0, "passed": 0, "failed": 0, "short_content": 0}

    for r in all_records:
        ct = r.get("content_type")
        stats["checked"] += 1

        if ct not in text_fields:
            stats["passed"] += 1
            continue

        fields = text_fields[ct]
        has_content = False
        for f in fields:
            val = r.get(f)
            if val and isinstance(val, str) and len(val.strip()) > 10:
                has_content = True
                break

        if has_content:
            stats["passed"] += 1
        else:
            stats["failed"] += 1
            if stats["failed"] <= 20:
                issues.append({
                    "category": "content_quality",
                    "severity": "warning",
                    "record_id": r.get("record_id"),
                    "content_type": ct,
                    "issue": f"Insufficient content in fields: {fields}",
                })

    return stats


def validate_duplicates(all_records: list, issues: list) -> dict:
    """Category 4: Duplicate detection — duplicate record_ids flagged."""
    id_counts = Counter(r.get("record_id") for r in all_records)
    duplicates = {k: v for k, v in id_counts.items() if v > 1}

    stats = {
        "total_records": len(all_records),
        "unique_ids": len(id_counts),
        "duplicate_ids": len(duplicates),
    }

    for rid, count in list(duplicates.items())[:20]:
        issues.append({
            "category": "duplicate_detection",
            "severity": "error",
            "record_id": rid,
            "issue": f"Duplicate record_id appears {count} times",
        })

    return stats


def validate_coverage(all_records: list, issues: list) -> dict:
    """Category 5: Coverage analysis — field coverage per content type."""
    stats = defaultdict(lambda: {"total": 0, "fields": defaultdict(int)})

    key_fields = [
        "question_text", "answer", "marks", "options", "correct_answer",
        "model_answer", "mark_allocation", "target_nodes", "node_tags",
        "misconception_text", "correction", "why_wrong", "remediation",
        "diagnostic_question", "diagnostic_answer", "topic", "frequency",
        "source_ref", "drill_id", "skill_targeted", "instructions",
        "definition", "text_walkthrough", "eli5", "cognitive_level",
        "mastery_criteria", "scope_boundary", "class_level", "subject",
    ]

    for r in all_records:
        ct = r.get("content_type", "unknown")
        stats[ct]["total"] += 1
        for f in key_fields:
            val = r.get(f)
            if val is not None and val != [] and val != "":
                stats[ct]["fields"][f] += 1

    # Convert to regular dict
    result = {}
    for ct, data in stats.items():
        result[ct] = {
            "total": data["total"],
            "fields": {f: c for f, c in data["fields"].items()},
        }

    return result


def validate_format_distribution(all_records: list, issues: list) -> dict:
    """Category 6: Format distribution — records per format."""
    format_counts = Counter(r.get("source_format") for r in all_records)
    stats = {
        "total_formats": len(format_counts),
        "format_counts": dict(format_counts.most_common()),
    }

    # Flag formats with very few records (< 5)
    small_formats = {f: c for f, c in format_counts.items() if c < 5 and f}
    if small_formats:
        for f, c in small_formats.items():
            issues.append({
                "category": "format_distribution",
                "severity": "info",
                "issue": f"Format has only {c} records: {f}",
            })

    stats["small_formats"] = small_formats
    return stats


def validate_source_traceability(all_records: list, issues: list) -> dict:
    """Category 7: Source traceability — every record has source_file, source_format, parser_id."""
    required = ["source_file", "source_format", "parser_id", "parser_version"]
    stats = {"checked": 0, "passed": 0, "failed": 0}

    for r in all_records:
        stats["checked"] += 1
        missing = [f for f in required if not r.get(f)]
        if missing:
            stats["failed"] += 1
            if stats["failed"] <= 20:
                issues.append({
                    "category": "source_traceability",
                    "severity": "error",
                    "record_id": r.get("record_id"),
                    "issue": f"Missing traceability fields: {missing}",
                })
        else:
            stats["passed"] += 1

    return stats


def validate_cross_reference(all_records: list, enrichment_nodes: set, issues: list) -> dict:
    """Category 8: Cross-reference consistency — enrichment node_ids are valid."""
    enrichment_records = [r for r in all_records if r.get("content_type") == "enrichment"]
    stats = {
        "total_enrichment": len(enrichment_records),
        "valid_node_ids": 0,
        "invalid_node_ids": 0,
        "duplicate_node_ids": 0,
    }

    seen_node_ids = set()
    for r in enrichment_records:
        nid = r.get("node_id")
        if not nid:
            stats["invalid_node_ids"] += 1
            continue

        if nid in seen_node_ids:
            stats["duplicate_node_ids"] += 1
            if stats["duplicate_node_ids"] <= 10:
                issues.append({
                    "category": "cross_reference",
                    "severity": "warning",
                    "node_id": nid,
                    "issue": "Duplicate node_id in enrichment",
                })
        else:
            seen_node_ids.add(nid)
            stats["valid_node_ids"] += 1

    return stats


def main():
    print("Validator — 8-Category Validation")
    print("=" * 70)

    # Load all records
    content_types = ["enrichment", "question_bank", "diagnostics", "papers", "misconceptions", "drill_banks"]
    all_records = []
    for ct in content_types:
        records = load_jsonl(OUTPUT_DIR / f"{ct}.jsonl")
        all_records.extend(records)
        print(f"  Loaded {len(records):>6} {ct} records")

    print(f"\nTotal records: {len(all_records)}")

    # Build enrichment node set
    enrichment_nodes = set()
    for r in all_records:
        if r.get("content_type") == "enrichment" and r.get("node_id"):
            enrichment_nodes.add(r["node_id"].lower())
    print(f"Enrichment nodes: {len(enrichment_nodes)}")

    issues = []

    # Run all 8 validation categories
    print("\nRunning validations...")
    results = {}

    print("  1. Schema integrity...")
    results["schema_integrity"] = validate_schema_integrity(all_records, issues)

    print("  2. Reference integrity...")
    results["reference_integrity"] = validate_reference_integrity(all_records, enrichment_nodes, issues)

    print("  3. Content quality...")
    results["content_quality"] = validate_content_quality(all_records, issues)

    print("  4. Duplicate detection...")
    results["duplicate_detection"] = validate_duplicates(all_records, issues)

    print("  5. Coverage analysis...")
    results["coverage_analysis"] = validate_coverage(all_records, issues)

    print("  6. Format distribution...")
    results["format_distribution"] = validate_format_distribution(all_records, issues)

    print("  7. Source traceability...")
    results["source_traceability"] = validate_source_traceability(all_records, issues)

    print("  8. Cross-reference consistency...")
    results["cross_reference"] = validate_cross_reference(all_records, enrichment_nodes, issues)

    # Write issues
    issues_file = OUTPUT_DIR / "validation_issues.jsonl"
    with open(issues_file, "w", encoding="utf-8") as f:
        for issue in issues:
            f.write(json.dumps(issue, ensure_ascii=False, default=str) + "\n")

    # Write report
    report_file = OUTPUT_DIR / "validation_report.json"
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False, default=str)

    # Print summary
    print(f"\n{'='*70}")
    print(f"VALIDATION SUMMARY")
    print(f"{'='*70}")

    print(f"\n1. Schema Integrity:")
    s = results["schema_integrity"]
    print(f"   Checked: {s['checked']}, Passed: {s['passed']}, Failed: {s['failed']}")

    print(f"\n2. Reference Integrity:")
    s = results["reference_integrity"]
    print(f"   Checked: {s['checked']}, Valid: {s['valid']}, Invalid: {s['invalid']}")
    if s["unknown_nodes"]:
        print(f"   Unknown nodes (first 10): {s['unknown_nodes'][:10]}")

    print(f"\n3. Content Quality:")
    s = results["content_quality"]
    print(f"   Checked: {s['checked']}, Passed: {s['passed']}, Failed: {s['failed']}")

    print(f"\n4. Duplicate Detection:")
    s = results["duplicate_detection"]
    print(f"   Total: {s['total_records']}, Unique IDs: {s['unique_ids']}, Duplicates: {s['duplicate_ids']}")

    print(f"\n5. Coverage Analysis (key fields per content type):")
    for ct, data in results["coverage_analysis"].items():
        total = data["total"]
        top_fields = sorted(data["fields"].items(), key=lambda x: -x[1])[:5]
        field_str = ", ".join(f"{f}={c}/{total}" for f, c in top_fields)
        print(f"   {ct:20s}: {field_str}")

    print(f"\n6. Format Distribution:")
    s = results["format_distribution"]
    print(f"   Total formats: {s['total_formats']}")
    for fmt, count in list(s["format_counts"].items())[:10]:
        print(f"     {fmt:25s}: {count}")
    if s["small_formats"]:
        print(f"   Small formats (< 5 records): {len(s['small_formats'])}")

    print(f"\n7. Source Traceability:")
    s = results["source_traceability"]
    print(f"   Checked: {s['checked']}, Passed: {s['passed']}, Failed: {s['failed']}")

    print(f"\n8. Cross-Reference Consistency:")
    s = results["cross_reference"]
    print(f"   Enrichment records: {s['total_enrichment']}")
    print(f"   Valid node_ids: {s['valid_node_ids']}")
    print(f"   Invalid node_ids: {s['invalid_node_ids']}")
    print(f"   Duplicate node_ids: {s['duplicate_node_ids']}")

    print(f"\n{'='*70}")
    print(f"Issues found: {len(issues)}")
    print(f"Issues file: {issues_file}")
    print(f"Report file: {report_file}")
    print(f"\nDone.")


if __name__ == "__main__":
    main()
