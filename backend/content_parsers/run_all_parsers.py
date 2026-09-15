"""Run all 6 parsers across the full D:\\cisce corpus and write normalized JSONL output.

Output files (one per content type):
  D:\\platform\\parsed_output\\enrichment.jsonl
  D:\\platform\\parsed_output\\question_bank.jsonl
  D:\\platform\\parsed_output\\diagnostics.jsonl
  D:\\platform\\parsed_output\\papers.jsonl
  D:\\platform\\parsed_output\\misconceptions.jsonl
  D:\\platform\\parsed_output\\drill_banks.jsonl
  D:\\platform\\parsed_output\\review_queue.jsonl   (files with unknown formats)
  D:\\platform\\parsed_output\\summary.json          (run statistics)

Each JSONL line is a self-contained JSON object with:
  - All parser-specific fields
  - Normalized common fields: id, content_type, source_file, source_format,
    parser_id, parser_version, class_level, subject, target_nodes
  - A stable record_id hash for deduplication and cross-referencing
"""

import sys
import json
import hashlib
from pathlib import Path
from collections import defaultdict

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.content_parsers.enrichment_parser import parse_file as parse_enrichment, PARSER_ID as ENRICH_ID
from backend.content_parsers.question_bank_parser import parse_file as parse_question_bank, PARSER_ID as QB_ID
from backend.content_parsers.diagnostics_parser import parse_file as parse_diagnostics, PARSER_ID as DIAG_ID
from backend.content_parsers.papers_parser import parse_file as parse_papers, PARSER_ID as PAPERS_ID
from backend.content_parsers.misconceptions_parser import parse_file as parse_misconceptions, PARSER_ID as MIS_ID
from backend.content_parsers.drill_banks_parser import parse_file as parse_drill_banks, PARSER_ID as DRILL_ID


# Parser configurations: (content_type, parser_func, parser_id, target_dirs)
PARSER_CONFIGS = [
    ("enrichment", parse_enrichment, ENRICH_ID, ["enrichment"]),
    ("question_bank", parse_question_bank, QB_ID, ["question_bank"]),
    ("diagnostics", parse_diagnostics, DIAG_ID, ["diagnostics", "diagnostic_questions"]),
    ("papers", parse_papers, PAPERS_ID, ["mock_papers", "past_papers", "question_papers", "board_style_questions"]),
    ("misconceptions", parse_misconceptions, MIS_ID, ["misconceptions"]),
    ("drill_banks", parse_drill_banks, DRILL_ID, ["drill_banks"]),
]

OUTPUT_DIR = Path(r"D:\platform\parsed_output")
CISCE_DIR = Path(r"D:\cisce")


def make_record_id(content_type: str, source_file: str, record: dict) -> str:
    """Generate a stable record ID from content type, source file, and key fields."""
    # Use content_type + source_file + all available key fields for uniqueness
    key_parts = [content_type, source_file]
    for field in ["node_id", "diagnostic_id", "misconception_id", "QID",
                  "question_number", "question_text", "misconception_text"]:
        val = record.get(field)
        if val is not None:
            key_parts.append(f"{field}={val}")
    # Include a few more fields to improve uniqueness
    for field in ["section", "drill_id", "topic", "paper_id"]:
        val = record.get(field)
        if val is not None:
            key_parts.append(f"{field}={val}")
    key = "|".join(key_parts)
    return hashlib.sha256(key.encode("utf-8")).hexdigest()[:16]


def extract_class_subject(file_path: str, record: dict) -> tuple:
    """Extract class_level and subject from record or file path."""
    class_level = record.get("CLASS") or record.get("class") or record.get("class_level")
    subject = record.get("SUBJECT") or record.get("subject")

    if not class_level or not subject:
        # Try to extract from file path: D:\cisce\{subject}\{subdir}\c{N}_...
        path = Path(file_path)
        parts = path.parts
        if len(parts) >= 2:
            subj_dir = parts[-3] if len(parts) >= 3 else None
            if not subject and subj_dir:
                subject = subj_dir

        # Extract class from filename: c10_..., c11_...
        fname = path.stem
        cls_m = __import__("re").match(r"^c(\d+)", fname, __import__("re").IGNORECASE)
        if cls_m and not class_level:
            class_level = int(cls_m.group(1))

    return class_level, subject


def normalize_record(content_type: str, source_file: str, record: dict) -> dict:
    """Normalize a record with common fields."""
    class_level, subject = extract_class_subject(source_file, record)

    record_id = make_record_id(content_type, source_file, record)

    normalized = {
        "record_id": record_id,
        "content_type": content_type,
        "source_file": source_file,
        "source_format": record.get("source_format"),
        "parser_id": record.get("parser_id"),
        "parser_version": record.get("parser_version"),
        "class_level": class_level,
        "subject": subject,
        "target_nodes": record.get("target_nodes", []),
    }

    # Merge all record fields
    for key, val in record.items():
        if key not in normalized:
            normalized[key] = val

    return normalized


def run_parser(config, subject_dirs):
    """Run a single parser across all subjects and target directories."""
    content_type, parse_func, parser_id, target_dirs = config
    all_records = []
    review_files = []
    file_count = 0

    for subj_dir in subject_dirs:
        for target_dir_name in target_dirs:
            target_dir = subj_dir / target_dir_name
            if not target_dir.exists():
                continue

            for f in sorted(target_dir.iterdir()):
                if f.suffix not in (".marker", ".txt"):
                    continue
                file_count += 1
                try:
                    records = parse_func(f)
                    if records:
                        for rec in records:
                            normalized = normalize_record(content_type, str(f), rec)
                            all_records.append(normalized)
                    else:
                        review_files.append(str(f))
                except Exception as e:
                    review_files.append(f"ERROR: {f} — {e}")

    return all_records, review_files, file_count


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"Full Corpus JSONL Output")
    print(f"{'='*70}")
    print(f"Output directory: {OUTPUT_DIR}")
    print()

    subject_dirs = sorted([d for d in CISCE_DIR.iterdir() if d.is_dir() and d.name != "extracted_sources"])

    all_review_files = []
    summary = {
        "total_records": 0,
        "total_files": 0,
        "by_content_type": {},
        "by_format": defaultdict(int),
        "by_subject": defaultdict(int),
    }

    for config in PARSER_CONFIGS:
        content_type = config[0]
        print(f"Running {content_type} parser...")

        records, review_files, file_count = run_parser(config, subject_dirs)

        # Write JSONL
        output_file = OUTPUT_DIR / f"{content_type}.jsonl"
        with open(output_file, "w", encoding="utf-8") as f:
            for rec in records:
                f.write(json.dumps(rec, ensure_ascii=False, default=str) + "\n")

        all_review_files.extend(review_files)

        # Update summary
        summary["total_records"] += len(records)
        summary["total_files"] += file_count
        summary["by_content_type"][content_type] = {
            "records": len(records),
            "files": file_count,
            "review_files": len(review_files),
            "output_file": str(output_file),
        }

        for rec in records:
            fmt = rec.get("source_format", "unknown")
            summary["by_format"][fmt] += 1
            subj = rec.get("subject", "unknown")
            summary["by_subject"][subj] += 1

        print(f"  Records: {len(records):>6} | Files: {file_count:>4} | Review: {len(review_files):>3} | → {output_file.name}")

    # Write review queue
    review_file = OUTPUT_DIR / "review_queue.jsonl"
    with open(review_file, "w", encoding="utf-8") as f:
        for rf in all_review_files:
            f.write(json.dumps({"file": rf}, ensure_ascii=False) + "\n")

    # Convert defaultdicts to regular dicts for JSON
    summary["by_format"] = dict(summary["by_format"])
    summary["by_subject"] = dict(summary["by_subject"])
    summary["total_review_files"] = len(all_review_files)

    # Write summary
    summary_file = OUTPUT_DIR / "summary.json"
    with open(summary_file, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2, ensure_ascii=False, default=str)

    # Print summary
    print(f"\n{'='*70}")
    print(f"SUMMARY")
    print(f"{'='*70}")
    print(f"Total records: {summary['total_records']}")
    print(f"Total files examined: {summary['total_files']}")
    print(f"Total review files: {summary['total_review_files']}")
    print(f"\nBy content type:")
    for ct, stats in sorted(summary["by_content_type"].items()):
        print(f"  {ct:20s}: {stats['records']:>6} records, {stats['files']:>4} files, {stats['review_files']:>3} review")
    print(f"\nBy format (top 15):")
    for fmt, count in sorted(summary["by_format"].items(), key=lambda x: -x[1])[:15]:
        print(f"  {str(fmt):25s}: {count:>6}")
    print(f"\nBy subject:")
    for subj, count in sorted(summary["by_subject"].items(), key=lambda x: -x[1]):
        print(f"  {subj:15s}: {count:>6}")
    print(f"\nOutput files:")
    for ct, stats in summary["by_content_type"].items():
        print(f"  {stats['output_file']}")
    print(f"  {review_file}")
    print(f"  {summary_file}")
    print(f"\nDone.")


if __name__ == "__main__":
    main()
