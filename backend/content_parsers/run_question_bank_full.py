"""Run the question_bank parser against ALL question_bank files in D:\\cisce."""

import sys
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.content_parsers.question_bank_parser import parse_file, _detect_format


def main():
    cisce = Path(r"D:\cisce")
    subjects = sorted([d for d in cisce.iterdir() if d.is_dir() and (d / "question_bank").exists()])

    print(f"Question Bank Parser — Full Corpus Run")
    print(f"{'='*70}")
    print(f"Subjects with question_bank/: {len(subjects)}")
    print()

    all_records = []
    empty_files = []
    unknown_files = []
    subject_stats = {}
    format_stats = defaultdict(int)

    for subj_dir in subjects:
        subj_name = subj_dir.name
        qb_dir = subj_dir / "question_bank"
        files = sorted(list(qb_dir.glob("*.marker")))
        subj_records = []

        for f in files:
            try:
                content = f.read_text(encoding="utf-8-sig")
                lines = content.split("\n")
                fmt = _detect_format(lines)
                if fmt == "unknown":
                    unknown_files.append(str(f))
                records = parse_file(f)
                if not records:
                    empty_files.append(str(f))
                else:
                    for r in records:
                        format_stats[r["source_format"]] += 1
                subj_records.extend(records)
            except Exception as e:
                empty_files.append(f"ERROR: {f} — {e}")

        subject_stats[subj_name] = {
            "files": len(files),
            "questions": len(subj_records),
        }
        all_records.extend(subj_records)

    # Print subject breakdown
    print(f"{'Subject':<15} {'Files':>6} {'Questions':>10}")
    print(f"{'-'*15} {'-'*6} {'-'*10}")
    for subj in sorted(subject_stats.keys()):
        stats = subject_stats[subj]
        print(f"{subj:<15} {stats['files']:>6} {stats['questions']:>10}")
    print(f"{'-'*15} {'-'*6} {'-'*10}")
    total_files = sum(s["files"] for s in subject_stats.values())
    print(f"{'TOTAL':<15} {total_files:>6} {len(all_records):>10}")

    # By format
    print(f"\nBy format:")
    for fmt, count in sorted(format_stats.items()):
        print(f"  {fmt:15s}: {count}")

    # Field coverage
    print(f"\nField coverage across {len(all_records)} questions:")
    fields = ["question_text", "answer", "marks", "question_type", "options",
              "correct_answer", "marking_scheme", "model_answer",
              "cognitive_level", "difficulty", "tier", "node_tags"]
    for field in fields:
        count = sum(1 for r in all_records if r.get(field))
        pct = count / len(all_records) * 100 if all_records else 0
        print(f"  {field:20s}: {count:>5}/{len(all_records)} ({pct:.1f}%)")

    # Empty/unknown files
    print(f"\nFiles with 0 questions: {len(empty_files)}")
    if empty_files and len(empty_files) <= 20:
        for f in empty_files:
            print(f"  {f}")
    elif empty_files:
        for f in empty_files[:10]:
            print(f"  {f}")
        print(f"  ... and {len(empty_files) - 10} more")

    print(f"\nFiles with unknown format: {len(unknown_files)}")
    if unknown_files and len(unknown_files) <= 20:
        for f in unknown_files:
            print(f"  {f}")
    elif unknown_files:
        for f in unknown_files[:10]:
            print(f"  {f}")
        print(f"  ... and {len(unknown_files) - 10} more")

    print(f"\nDone.")


if __name__ == "__main__":
    main()
