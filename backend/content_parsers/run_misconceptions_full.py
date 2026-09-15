"""Run the misconceptions parser against ALL misconception files in D:\\cisce."""

import sys
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.content_parsers.misconceptions_parser import parse_file, _detect_format


def main():
    cisce = Path(r"D:\cisce")
    subjects = sorted([d for d in cisce.iterdir() if d.is_dir()])

    print(f"Misconceptions Parser — Full Corpus Run")
    print(f"{'='*70}")

    all_records = []
    unknown_files = []
    subject_stats = {}
    format_stats = defaultdict(int)

    for subj_dir in subjects:
        subj_name = subj_dir.name
        mis_dir = subj_dir / "misconceptions"
        if not mis_dir.exists():
            continue

        files = sorted(list(mis_dir.glob("*.marker")))
        subj_records = []

        for f in files:
            try:
                content = f.read_text(encoding="utf-8-sig")
                lines = content.split("\n")
                fmt = _detect_format(lines)
                if fmt == "unknown":
                    unknown_files.append(str(f))
                records = parse_file(f)
                for r in records:
                    format_stats[r["source_format"]] += 1
                subj_records.extend(records)
            except Exception as e:
                unknown_files.append(f"ERROR: {f} — {e}")

        subject_stats[subj_name] = {
            "files": len(files),
            "records": len(subj_records),
        }
        all_records.extend(subj_records)

    # Print subject breakdown
    print(f"\n{'Subject':<15} {'Files':>6} {'Records':>10}")
    print(f"{'-'*15} {'-'*6} {'-'*10}")
    for subj in sorted(subject_stats.keys()):
        stats = subject_stats[subj]
        print(f"{subj:<15} {stats['files']:>6} {stats['records']:>10}")
    print(f"{'-'*15} {'-'*6} {'-'*10}")
    total_files = sum(s["files"] for s in subject_stats.values())
    print(f"{'TOTAL':<15} {total_files:>6} {len(all_records):>10}")

    # By format
    print(f"\nBy format:")
    for fmt, count in sorted(format_stats.items()):
        print(f"  {fmt:20s}: {count}")

    # Field coverage
    print(f"\nField coverage across {len(all_records)} records:")
    fields = ["misconception_text", "correction", "why_wrong", "diagnostic_question",
              "diagnostic_answer", "remediation", "target_nodes", "topic",
              "frequency", "source_ref"]
    for field in fields:
        count = sum(1 for r in all_records if r.get(field))
        pct = count / len(all_records) * 100 if all_records else 0
        print(f"  {field:20s}: {count:>5}/{len(all_records)} ({pct:.1f}%)")

    # Unknown files
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
