"""Audit schema consistency across all Class 7 and Class 8 Maths catalogs.
Reads each catalog JSON and reports missing/extra fields, type mismatches,
and structural issues. Read-only: does not modify any files.
"""
import json
import os
import sys

CATALOG_DIR = os.path.dirname(os.path.abspath(__file__))

# Required top-level fields
TOP_FIELDS = {
    "class": int,
    "subject": str,
    "chapter": int,
    "chapter_title": str,
    "source_file": str,
    "concepts": list,
    "worked_examples": list,
    "exercises": list,
}

# Required concept fields
CONCEPT_FIELDS = {
    "id": str,
    "title": str,
    "section": str,
    "definition": str,
    "formula": str,
    "key_idea": str,
    "textbook_ref": str,
    "question_patterns": list,
    "solution_type": str,
    "solution_steps": list,
}

# Required worked example fields
EXAMPLE_FIELDS = {
    "id": str,
    "source_ref": str,
    "concept": str,
    "question_type": str,
    "question_pattern": str,
    "solution_template": list,
}

# Required exercise fields
EXERCISE_FIELDS = {
    "id": str,
    "source_ref": str,
    "questions": list,
}


def audit_file(path, expected_class=7):
    name = os.path.basename(path)
    issues = []
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        return [(name, "FATAL", f"Cannot parse JSON: {e}")]

    # Top-level fields
    for field, expected_type in TOP_FIELDS.items():
        if field not in data:
            issues.append((name, "MISSING_TOP", field))
        elif not isinstance(data[field], expected_type):
            issues.append((name, "TYPE_TOP", f"{field}: expected {expected_type.__name__}, got {type(data[field]).__name__}"))

    # Validate class and subject
    if data.get("class") != expected_class:
        issues.append((name, "VALUE", f"class should be {expected_class}, got {data.get('class')}"))
    if data.get("subject") != "maths":
        issues.append((name, "VALUE", f"subject should be 'maths', got {data.get('subject')}"))

    # Concepts
    concepts = data.get("concepts", [])
    for i, c in enumerate(concepts):
        for field, expected_type in CONCEPT_FIELDS.items():
            if field not in c:
                issues.append((name, "MISSING_CONCEPT", f"concept[{i}] ({c.get('id','?')}): {field}"))
            elif not isinstance(c[field], expected_type):
                issues.append((name, "TYPE_CONCEPT", f"concept[{i}] ({c.get('id','?')}): {field} expected {expected_type.__name__}, got {type(c[field]).__name__}"))
        # Validate solution_steps structure
        for j, step in enumerate(c.get("solution_steps", [])):
            if not isinstance(step, dict):
                issues.append((name, "TYPE_STEP", f"concept[{i}].solution_steps[{j}]: expected dict"))
            elif "step" not in step or "action" not in step or "explain" not in step:
                issues.append((name, "MISSING_STEP", f"concept[{i}].solution_steps[{j}]: needs step/action/explain"))

    # Worked examples
    examples = data.get("worked_examples", [])
    for i, ex in enumerate(examples):
        for field, expected_type in EXAMPLE_FIELDS.items():
            if field not in ex:
                issues.append((name, "MISSING_EXAMPLE", f"example[{i}] ({ex.get('id','?')}): {field}"))
            elif not isinstance(ex[field], expected_type):
                issues.append((name, "TYPE_EXAMPLE", f"example[{i}] ({ex.get('id','?')}): {field} expected {expected_type.__name__}, got {type(ex[field]).__name__}"))
        # Validate concept reference exists
        concept_ids = {c["id"] for c in concepts if "id" in c}
        if ex.get("concept") and ex["concept"] not in concept_ids:
            issues.append((name, "DANGLING_REF", f"example[{i}] ({ex.get('id','?')}): concept '{ex['concept']}' not found in concepts"))

    # Exercises
    exercises = data.get("exercises", [])
    for i, e in enumerate(exercises):
        for field, expected_type in EXERCISE_FIELDS.items():
            if field not in e:
                issues.append((name, "MISSING_EXERCISE", f"exercise[{i}] ({e.get('id','?')}): {field}"))
            elif not isinstance(e[field], expected_type):
                issues.append((name, "TYPE_EXERCISE", f"exercise[{i}] ({e.get('id','?')}): {field} expected {expected_type.__name__}, got {type(e[field]).__name__}"))

    return issues


def main():
    catalog_files = sorted([
        os.path.join(CATALOG_DIR, f)
        for f in os.listdir(CATALOG_DIR)
        if (f.startswith("catalog_class7_maths_ch")
            or f.startswith("catalog_class8_maths_ch"))
        and f.endswith(".json")
    ])

    if not catalog_files:
        print("No catalog files found.")
        sys.exit(1)

    print(f"Auditing {len(catalog_files)} catalog files...")
    print("-" * 70)

    all_issues = []
    counts = []
    for path in catalog_files:
        name = os.path.basename(path)
        # Expected class comes from the filename prefix (7 or 8)
        expected_class = 8 if name.startswith("catalog_class8_maths_ch") else 7
        issues = audit_file(path, expected_class=expected_class)
        all_issues.extend(issues)

        # Get counts
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
            counts.append((
                name,
                len(data.get("concepts", [])),
                len(data.get("worked_examples", [])),
                len(data.get("exercises", [])),
                sum(len(e.get("questions", [])) for e in data.get("exercises", [])),
            ))
        except Exception:
            counts.append((name, 0, 0, 0, 0))

        status = "OK" if not issues else f"{len(issues)} issues"
        print(f"  {name}: {status}")

    print("-" * 70)
    print("\nCounts summary:")
    print(f"  {'File':<55} {'C':>3} {'E':>3} {'X':>3} {'Q':>4}")
    print(f"  {'-'*55} {'-'*3} {'-'*3} {'-'*3} {'-'*4}")
    for name, c, e, x, q in counts:
        short = name.replace("catalog_class7_maths_", "c7m_").replace(
            "catalog_class8_maths_", "c8m_").replace(".json", "")
        print(f"  {short:<55} {c:>3} {e:>3} {x:>3} {q:>4}")

    total_c = sum(c for _, c, _, _, _ in counts)
    total_e = sum(e for _, _, e, _, _ in counts)
    total_x = sum(x for _, _, _, x, _ in counts)
    total_q = sum(q for _, _, _, _, q in counts)
    print(f"  {'-'*55} {'-'*3} {'-'*3} {'-'*3} {'-'*4}")
    print(f"  {'TOTAL':<55} {total_c:>3} {total_e:>3} {total_x:>3} {total_q:>4}")

    if all_issues:
        print(f"\n{'='*70}")
        print(f"FOUND {len(all_issues)} ISSUES:")
        print(f"{'='*70}")
        for name, severity, detail in all_issues:
            print(f"  [{severity}] {name}: {detail}")
        sys.exit(1)
    else:
        print("\nAll catalogs pass schema audit. No issues found.")
        sys.exit(0)


if __name__ == "__main__":
    main()
