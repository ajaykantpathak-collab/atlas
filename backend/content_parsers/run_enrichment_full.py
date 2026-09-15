"""Run the enrichment parser against ALL enrichment files in D:\\cisce.

Reports:
- Total files processed
- Total nodes parsed
- Field coverage across all nodes
- Any files that produced 0 nodes (review queue candidates)
- Any nodes missing critical fields
- Subject-by-subject breakdown
"""

import sys
import time
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.content_parsers.enrichment_parser import parse_file


def main():
    cisce = Path(r"D:\cisce")
    subjects = sorted([d for d in cisce.iterdir() if d.is_dir() and (d / "enrichment").exists()])

    print(f"Enrichment Parser — Full Corpus Run")
    print(f"{'='*70}")
    print(f"Subjects with enrichment/: {len(subjects)}")
    print()

    all_records = []
    empty_files = []
    subject_stats = {}

    for subj_dir in subjects:
        subj_name = subj_dir.name
        enr_dir = subj_dir / "enrichment"
        files = sorted(list(enr_dir.glob("*.marker")))
        subj_records = []

        for f in files:
            try:
                records = parse_file(f)
                if not records:
                    empty_files.append(str(f))
                subj_records.extend(records)
            except Exception as e:
                empty_files.append(f"ERROR: {f} — {e}")

        subject_stats[subj_name] = {
            "files": len(files),
            "nodes": len(subj_records),
        }
        all_records.extend(subj_records)

    # Print subject breakdown
    print(f"{'Subject':<15} {'Files':>6} {'Nodes':>6}")
    print(f"{'-'*15} {'-'*6} {'-'*6}")
    for subj in sorted(subject_stats.keys()):
        stats = subject_stats[subj]
        print(f"{subj:<15} {stats['files']:>6} {stats['nodes']:>6}")
    print(f"{'-'*15} {'-'*6} {'-'*6}")
    total_files = sum(s["files"] for s in subject_stats.values())
    print(f"{'TOTAL':<15} {total_files:>6} {len(all_records):>6}")

    # Field coverage
    print(f"\nField coverage across {len(all_records)} nodes:")
    fields = ["title", "definition", "text_walkthrough", "eli5",
              "common_misconception", "diagnostic_questions",
              "on_failure", "cognitive_level", "mastery_criteria",
              "scope_boundary"]
    for field in fields:
        count = sum(1 for r in all_records if r.get(field))
        pct = count / len(all_records) * 100 if all_records else 0
        print(f"  {field:25s}: {count:>5}/{len(all_records)} ({pct:.1f}%)")

    # Diagnostic questions
    total_diags = sum(len(r.get("diagnostic_questions") or []) for r in all_records)
    print(f"\nTotal diagnostic questions: {total_diags}")

    # On_failure paths
    total_failures = sum(len(r.get("on_failure") or []) for r in all_records)
    print(f"Total on_failure paths: {total_failures}")

    # Empty files (review queue)
    print(f"\nFiles with 0 nodes (review queue): {len(empty_files)}")
    if empty_files and len(empty_files) <= 20:
        for f in empty_files:
            print(f"  {f}")
    elif empty_files:
        for f in empty_files[:10]:
            print(f"  {f}")
        print(f"  ... and {len(empty_files) - 10} more")

    # Nodes missing critical fields
    critical = ["title", "definition"]
    for field in critical:
        missing = [r["node_id"] for r in all_records if not r.get(field)]
        if missing:
            print(f"\nNodes missing {field}: {len(missing)}")
            if len(missing) <= 10:
                for nid in missing:
                    print(f"  {nid}")

    print(f"\nDone.")


if __name__ == "__main__":
    main()
