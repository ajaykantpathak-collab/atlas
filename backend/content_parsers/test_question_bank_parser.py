"""Test the question_bank parser against real files from all 7 formats."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.content_parsers.question_bank_parser import parse_file, _detect_format


def test_file(label, file_path):
    path = Path(file_path)
    if not path.exists():
        print(f"  [SKIP] {label}: file not found")
        return []

    content = path.read_text(encoding="utf-8-sig")
    lines = content.split("\n")
    fmt = _detect_format(lines)
    print(f"\n{'='*60}")
    print(f"Test: {label}")
    print(f"File: {file_path}")
    print(f"Detected format: {fmt}")
    print(f"{'='*60}")

    records = parse_file(path)
    print(f"Questions parsed: {len(records)}")

    if records:
        # Show first 3 questions
        for i, rec in enumerate(records[:3]):
            q_text = rec["question_text"] or ""
            q_text = q_text[:80] + "..." if len(q_text) > 80 else q_text
            print(f"  Q{rec['question_number']}: marks={rec['marks']}, type={rec['question_type']}, tier={rec['tier']}")
            print(f"    Text: {q_text}")
            if rec.get("answer"):
                a_text = rec["answer"][:80] + "..." if len(rec["answer"]) > 80 else rec["answer"]
                print(f"    Answer: {a_text}")
            if rec.get("options"):
                print(f"    Options: {len(rec['options'])}")
            if rec.get("node_tags"):
                print(f"    Node tags: {rec['node_tags']}")

        # Summary stats
        has_answer = sum(1 for r in records if r.get("answer"))
        has_marks = sum(1 for r in records if r.get("marks"))
        has_options = sum(1 for r in records if r.get("options"))
        has_node = sum(1 for r in records if r.get("node_tags"))
        print(f"\n  Coverage: answers={has_answer}/{len(records)}, marks={has_marks}/{len(records)}, options={has_options}/{len(records)}, nodes={has_node}/{len(records)}")

    return records


def main():
    print("Question Bank Parser Test — All 7 Formats")
    print("=" * 60)

    all_records = []

    # Format A: Physics
    all_records.extend(test_file(
        "Format A: Physics",
        r"D:\cisce\physics\question_bank\c10_physics_question_bank.marker"
    ))

    # Format B: HistCiv
    all_records.extend(test_file(
        "Format B: HistCiv",
        r"D:\cisce\histciv\question_bank\c10_question_bank.marker"
    ))

    # Format C: Maths
    all_records.extend(test_file(
        "Format C: Maths",
        r"D:\cisce\maths\question_bank\c10_maths_question_bank.marker"
    ))

    # Format C: CS
    all_records.extend(test_file(
        "Format C: CS",
        r"D:\cisce\cs\question_bank\c10_cs_question_bank_TEST_pro.marker"
    ))

    # Format C: Bio
    all_records.extend(test_file(
        "Format C: Bio",
        r"D:\cisce\bio\question_bank\c10_bio_question_bank.marker"
    ))

    # Format D: Accountancy
    all_records.extend(test_file(
        "Format D: Accountancy",
        r"D:\cisce\acc\question_bank\c11_acc_question_bank.marker"
    ))

    # Format E: Economics
    all_records.extend(test_file(
        "Format E: Economics",
        r"D:\cisce\econ\question_bank\c10_econ_question_bank.marker"
    ))

    # Format F: Geography
    all_records.extend(test_file(
        "Format F: Geography",
        r"D:\cisce\geo\question_bank\c10_geo_question_bank.marker"
    ))

    # Format G: EVS
    all_records.extend(test_file(
        "Format G: EVS",
        r"D:\cisce\evs\question_bank\c10_evs_question_bank.marker"
    ))

    # Summary
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"Total questions parsed: {len(all_records)}")

    # By format
    by_format = {}
    for r in all_records:
        fmt = r.get("source_format", "unknown")
        by_format[fmt] = by_format.get(fmt, 0) + 1
    print(f"\nBy format:")
    for fmt, count in sorted(by_format.items()):
        print(f"  {fmt:15s}: {count}")

    # Field coverage
    fields = ["question_text", "answer", "marks", "question_type", "options",
              "correct_answer", "marking_scheme", "model_answer",
              "cognitive_level", "difficulty", "tier", "node_tags"]
    print(f"\nField coverage:")
    for field in fields:
        count = sum(1 for r in all_records if r.get(field))
        pct = count / len(all_records) * 100 if all_records else 0
        print(f"  {field:20s}: {count:>4}/{len(all_records)} ({pct:.0f}%)")

    print(f"\nTest complete.")


if __name__ == "__main__":
    main()
