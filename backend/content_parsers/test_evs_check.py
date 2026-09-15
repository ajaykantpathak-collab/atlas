"""Check EVS questions without answers."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from backend.content_parsers.question_bank_parser import parse_file

records = parse_file(Path(r"D:\cisce\evs\question_bank\c10_evs_question_bank.marker"))
no_answer = [r for r in records if not r.get("answer")]
print(f"Total: {len(records)}, without answer: {len(no_answer)}")
if no_answer:
    for r in no_answer[:3]:
        num = r["question_number"]
        qtype = r["question_type"]
        text = (r["question_text"] or "")[:80]
        print(f"Q{num}: type={qtype}, text={text}")
        print(f"  options: {r['options']}")
        print(f"  correct_answer: {r['correct_answer']}")
        print(f"  marking_scheme: {r['marking_scheme']}")
        print()
