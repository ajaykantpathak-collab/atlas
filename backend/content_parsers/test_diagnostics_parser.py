"""Test the diagnostics parser against real files from all 8 formats."""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from backend.content_parsers.diagnostics_parser import parse_file, _detect_format


def test_file(label, file_path):
    path = Path(file_path)
    if not path.exists():
        print(f"  [SKIP] {label}: file not found")
        return []

    content = path.read_text(encoding="utf-8-sig")
    lines = content.split("\n")
    fmt = _detect_format(lines, str(path))
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
            print(f"  {rec['diagnostic_id']}: fmt={rec['source_format']}")
            print(f"    Q: {q}")
            if rec.get("correct_answer"):
                a = rec["correct_answer"][:80]
                print(f"    A: {a}")
            if rec.get("wrong_answers"):
                print(f"    Wrong answers: {len(rec['wrong_answers'])}")
            if rec.get("remediation"):
                r = rec["remediation"][:60]
                print(f"    Remediation: {r}")
            if rec.get("target_nodes"):
                print(f"    Nodes: {rec['target_nodes']}")

        # Summary
        has_correct = sum(1 for r in records if r.get("correct_answer"))
        has_wrong = sum(1 for r in records if r.get("wrong_answers"))
        has_rem = sum(1 for r in records if r.get("remediation"))
        has_nodes = sum(1 for r in records if r.get("target_nodes"))
        print(f"\n  Coverage: correct={has_correct}/{len(records)}, wrong={has_wrong}/{len(records)}, remediation={has_rem}/{len(records)}, nodes={has_nodes}/{len(records)}")

    return records


def main():
    print("Diagnostics Parser Test — All 8 Formats")
    print("=" * 60)

    all_records = []

    # Format A: CFQ (physics)
    all_records.extend(test_file("Format A: CFQ (physics)", r"D:\cisce\physics\diagnostics\c10_physics_diagnostics.marker"))

    # Format A: CFQ (maths)
    all_records.extend(test_file("Format A: CFQ (maths)", r"D:\cisce\maths\diagnostics\c10_maths_diagnostics.marker"))

    # Format B: Section-based (histciv)
    all_records.extend(test_file("Format B: Section (histciv)", r"D:\cisce\histciv\diagnostics\c10_diagnostics.marker"))

    # Format C: Diagnostic: line (acc)
    all_records.extend(test_file("Format C: Diagnostic line (acc)", r"D:\cisce\acc\diagnostics\c11_acc_diagnostics.marker"))

    # Format D: EVS diagnostics
    all_records.extend(test_file("Format D: EVS diagnostics", r"D:\cisce\evs\diagnostics\c10_diagnostics.marker"))

    # Format E: DQ block (physics)
    all_records.extend(test_file("Format E: DQ block (physics)", r"D:\cisce\physics\diagnostic_questions\c10_phy_cfq_la.marker"))

    # Format E: DQ block (maths board)
    all_records.extend(test_file("Format E: DQ block (maths board)", r"D:\cisce\maths\diagnostic_questions\c10_math_board_2024.marker"))

    # Format F: Q:/CORRECT: (histciv)
    all_records.extend(test_file("Format F: Q/CORRECT (histciv)", r"D:\cisce\histciv\diagnostic_questions\c10_diagnostic_questions.marker"))

    # Format G: Diag Question: (acc)
    all_records.extend(test_file("Format G: Diag Question (acc)", r"D:\cisce\acc\diagnostic_questions\c11_acc_diagnostic_questions.marker"))

    # Format H: EVS diagnostic_questions
    all_records.extend(test_file("Format H: EVS diag_q", r"D:\cisce\evs\diagnostic_questions\c10_evs_diagnostic_questions.marker"))

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
        print(f"  {fmt:15s}: {count}")

    fields = ["question_text", "correct_answer", "wrong_answers", "concept_trap",
              "remediation", "cognitive_level", "target_nodes", "topic_tag", "scoring"]
    print(f"\nField coverage:")
    for field in fields:
        count = sum(1 for r in all_records if r.get(field))
        pct = count / len(all_records) * 100 if all_records else 0
        print(f"  {field:20s}: {count:>4}/{len(all_records)} ({pct:.0f}%)")

    print(f"\nTest complete.")


if __name__ == "__main__":
    main()
