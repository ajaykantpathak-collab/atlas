"""Test the papers parser against real files from all 6 formats."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.content_parsers.papers_parser import parse_file, _detect_format


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
    print(f"Records parsed: {len(records)}")

    if records:
        for i, rec in enumerate(records[:3]):
            q = (rec.get("question_text") or "")[:80]
            print(f"  Q{rec['question_number']}: marks={rec['marks']}, section={rec['section']}, type={rec['question_type']}")
            print(f"    Text: {q}")
            if rec.get("answer"):
                a = rec["answer"][:80]
                print(f"    Answer: {a}")
            if rec.get("options"):
                print(f"    Options: {len(rec['options'])}")
            if rec.get("target_nodes"):
                print(f"    Nodes: {rec['target_nodes']}")

        has_answer = sum(1 for r in records if r.get("answer"))
        has_marks = sum(1 for r in records if r.get("marks"))
        has_options = sum(1 for r in records if r.get("options"))
        has_nodes = sum(1 for r in records if r.get("target_nodes"))
        print(f"\n  Coverage: answers={has_answer}/{len(records)}, marks={has_marks}/{len(records)}, options={has_options}/{len(records)}, nodes={has_nodes}/{len(records)}")

    return records


def main():
    print("Papers Parser Test — All 6 Formats")
    print("=" * 60)

    all_records = []

    # Format A: mock_structured (physics)
    all_records.extend(test_file("Format A: mock_structured (physics)", r"D:\cisce\physics\mock_papers\c10_physics_mock_1.marker"))

    # Format A: mock_structured (histciv)
    all_records.extend(test_file("Format A: mock_structured (histciv)", r"D:\cisce\histciv\mock_papers\c10_mock_papers.marker"))

    # Format B: q_answer (physics question_papers)
    all_records.extend(test_file("Format B: q_answer (physics)", r"D:\cisce\physics\question_papers\c10_phy_question_papers.marker"))

    # Format C: board_style (physics)
    all_records.extend(test_file("Format C: board_style (physics)", r"D:\cisce\physics\board_style_questions\c10_physics_board_style.marker"))

    # Format D: past_paper (physics)
    all_records.extend(test_file("Format D: past_paper (physics)", r"D:\cisce\physics\past_papers\c10_phy_past_paper.marker"))

    # Format E: acc_mock
    all_records.extend(test_file("Format E: acc_mock", r"D:\cisce\acc\mock_papers\c11_acc_mock_papers.marker"))

    # Format F: econ_mock
    all_records.extend(test_file("Format F: econ_mock", r"D:\cisce\econ\mock_papers\c10_econ_mock_papers.marker"))

    # Summary
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"Total records parsed: {len(all_records)}")

    by_format = {}
    for r in all_records:
        fmt = r.get("source_format", "unknown")
        by_format[fmt] = by_format.get(fmt, 0) + 1
    print(f"\nBy format:")
    for fmt, count in sorted(by_format.items()):
        print(f"  {fmt:20s}: {count}")

    fields = ["question_text", "answer", "marks", "section", "question_type",
              "options", "correct_answer", "model_answer", "mark_allocation",
              "target_nodes", "paper_id"]
    print(f"\nField coverage:")
    for field in fields:
        count = sum(1 for r in all_records if r.get(field))
        pct = count / len(all_records) * 100 if all_records else 0
        print(f"  {field:20s}: {count:>4}/{len(all_records)} ({pct:.0f}%)")

    print(f"\nTest complete.")


if __name__ == "__main__":
    main()
