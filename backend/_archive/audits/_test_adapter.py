"""Test the adapter layer against all known generator patterns."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry()
reg.initialize()

adapter_reg = AdapterRegistry()
adapter_reg.set_solver_registry(reg)

# Test all the patterns we identified
tests = [
    # (qtype, description)
    ("C5Math001Generator", "Class 5 Math — class with generate()"),
    ("generate_c3_evs_001", "Class 3 EVS — function returning QuestionSet"),
    ("Node1QuestionGenerator", "Class 4 Chem — class with specific methods"),
    ("c11_phy_001", "Class 11 Physics — function returning List[Dict]"),
    ("q_0", "Class 1 Physics — QuestionSpec template"),
    ("class8_geo", "Class 8 Geo — function returning topic containers"),
    ("generate_class7_bio_questions", "Class 7 Bio — function returning tuple"),
    ("CISCEHistCivGenerator", "Class 11 HistCiv — class with generate_questions"),
    ("c11_soc_001", "Class 11 Soc — pre-built dict"),
]

print("=== ADAPTER LAYER TEST ===\n")
success = 0
fail = 0

for qtype, desc in tests:
    adapter = adapter_reg.get_adapter(qtype)
    if adapter is None:
        print(f"FAIL: {qtype} — no adapter could wrap it ({desc})")
        fail += 1
        continue

    questions = adapter.generate(seed=42, count=3, difficulty=0.5)
    if questions:
        q = questions[0]
        print(f"OK:   {qtype} — {len(questions)} questions ({desc})")
        print(f"      Q1: {q['question_text'][:80]}")
        print(f"      A:  {q['correct_answer'][:60]}")
        print(f"      Type: {q['question_type']}, Diff: {q['difficulty']}")
        success += 1
    else:
        print(f"FAIL: {qtype} — adapter created but 0 questions ({desc})")
        fail += 1
    print()

print(f"\n=== RESULTS: {success} success, {fail} fail ===")
