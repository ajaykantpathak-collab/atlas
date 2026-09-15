"""Test the enrichment parser against real files from D:\\cisce.

Tests:
1. Physics enrichment (multi-node file)
2. History & Civics enrichment (single-node file)
3. Accountancy enrichment (multi-node file)
4. Verify all expected fields are parsed
5. Verify diagnostic questions are structured
6. Verify on_failure remediation paths are structured
"""

import sys
import json
from pathlib import Path

# Add platform to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.content_parsers.enrichment_parser import parse_file


def test_file(label: str, file_path: str):
    """Parse a file and print summary."""
    path = Path(file_path)
    if not path.exists():
        print(f"  [SKIP] {label}: file not found: {file_path}")
        return []

    print(f"\n{'='*60}")
    print(f"Test: {label}")
    print(f"File: {file_path}")
    print(f"{'='*60}")

    records = parse_file(path)
    print(f"Nodes found: {len(records)}")

    for i, rec in enumerate(records):
        print(f"\n  Node {i+1}: {rec['node_id']}")
        print(f"    Title: {rec['title']}")
        print(f"    Cognitive level: {rec['cognitive_level']}")

        # Check which fields are present
        fields_present = []
        fields_missing = []
        for field in ["definition", "text_walkthrough", "eli5",
                       "common_misconception", "diagnostic_questions",
                       "on_failure", "mastery_criteria", "scope_boundary"]:
            if rec.get(field):
                fields_present.append(field)
            else:
                fields_missing.append(field)

        print(f"    Fields present: {', '.join(fields_present)}")
        if fields_missing:
            print(f"    Fields missing: {', '.join(fields_missing)}")

        # Show diagnostic questions
        if rec.get("diagnostic_questions"):
            diags = rec["diagnostic_questions"]
            print(f"    Diagnostic questions: {len(diags)}")
            for q in diags:
                q_text = q["question"][:80] + "..." if q["question"] and len(q["question"]) > 80 else q["question"]
                print(f"      Q{q['number']} ({q['cognitive_type']}): {q_text}")
                print(f"        Answer: {'present' if q['answer'] else 'MISSING'} ({len(q['answer'] or '')} chars)")
        else:
            print(f"    Diagnostic questions: NONE")

        # Show on_failure
        if rec.get("on_failure"):
            failures = rec["on_failure"]
            print(f"    On failure paths: {len(failures)}")
            for f in failures:
                print(f"      Q{f['question_number']} -> {f['review_node_id']} ({f['prereq_type']})")
        else:
            print(f"    On failure paths: NONE")

        # Show first 100 chars of definition
        if rec.get("definition"):
            defn = rec["definition"][:100].replace("\n", " ")
            print(f"    Definition (first 100 chars): {defn}...")

    return records


def main():
    print("Enrichment Parser Test")
    print("=" * 60)

    all_records = []

    # Test 1: Physics (multi-node, has ELI5)
    all_records.extend(test_file(
        "Physics C10 (multi-node)",
        r"D:\cisce\physics\enrichment\c10_physics_enrichment_part1.marker"
    ))

    # Test 2: History & Civics (single-node per file)
    all_records.extend(test_file(
        "History & Civics C10",
        r"D:\cisce\histciv\enrichment\c10_histciv_enrichment_001.marker"
    ))

    # Test 3: Accountancy (multi-node, commerce subject)
    all_records.extend(test_file(
        "Accountancy C11 (commerce)",
        r"D:\cisce\acc\enrichment\c11_acc_enrichment_part01.marker"
    ))

    # Summary
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"Total nodes parsed: {len(all_records)}")

    # Field coverage
    field_coverage = {}
    for field in ["title", "definition", "text_walkthrough", "eli5",
                   "common_misconception", "diagnostic_questions",
                   "on_failure", "cognitive_level", "mastery_criteria",
                   "scope_boundary"]:
        count = sum(1 for r in all_records if r.get(field))
        field_coverage[field] = (count, len(all_records))

    print(f"\nField coverage:")
    for field, (present, total) in field_coverage.items():
        pct = (present / total * 100) if total > 0 else 0
        print(f"  {field:25s}: {present}/{total} ({pct:.0f}%)")

    # Diagnostic question coverage
    total_diags = sum(len(r.get("diagnostic_questions") or []) for r in all_records)
    print(f"\nTotal diagnostic questions parsed: {total_diags}")

    # On_failure coverage
    total_failures = sum(len(r.get("on_failure") or []) for r in all_records)
    print(f"Total on_failure paths parsed: {total_failures}")

    print(f"\nTest complete.")


if __name__ == "__main__":
    main()
