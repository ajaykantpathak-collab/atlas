import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Find all generators matching class7 maths
print("=== class7 maths generators ===")
for qtype in reg.list_question_gen_types():
    if 'class7' in qtype.lower() and 'math' in qtype.lower():
        adapter = adapters.get_adapter(qtype)
        status = "OK" if adapter else "FAIL"
        print(f"  {qtype}: adapter={status}")
        if adapter:
            qs = adapter.generate(seed=42, count=1, difficulty=0.5)
            if qs:
                print(f"    -> {str(qs[0].get('question_text',''))[:60]}")
            else:
                print(f"    -> EMPTY")

# Also check class9 maths
print("\n=== class9 maths generators ===")
for qtype in reg.list_question_gen_types():
    if 'class9' in qtype.lower() and 'math' in qtype.lower():
        adapter = adapters.get_adapter(qtype)
        status = "OK" if adapter else "FAIL"
        print(f"  {qtype}: adapter={status}")
        if adapter:
            qs = adapter.generate(seed=42, count=1, difficulty=0.5)
            if qs:
                print(f"    -> {str(qs[0].get('question_text',''))[:60]}")
            else:
                print(f"    -> EMPTY")
