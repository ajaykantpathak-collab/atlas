"""Test class11_chem with the new solver_chem_c11 module."""
import sys, traceback
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Test class11_chem generators
print("=== class11_chem generators ===")
for qtype in reg.list_question_gen_types():
    if 'class11_chem' in qtype:
        adapter = adapters.get_adapter(qtype)
        if adapter is None:
            print(f"  {qtype}: NO ADAPTER")
            continue
        try:
            qs = adapter.generate(seed=42, count=1, difficulty=0.5)
            if qs:
                print(f"  {qtype}: OK - {str(qs[0].get('question_text',''))[:60]}")
            else:
                print(f"  {qtype}: EMPTY")
        except Exception as e:
            print(f"  {qtype}: ERROR - {e}")

# Also test class12_chem
print("\n=== class12_chem generators ===")
for qtype in reg.list_question_gen_types():
    if 'class12_chem' in qtype:
        adapter = adapters.get_adapter(qtype)
        if adapter is None:
            print(f"  {qtype}: NO ADAPTER")
            continue
        try:
            qs = adapter.generate(seed=42, count=1, difficulty=0.5)
            if qs:
                print(f"  {qtype}: OK - {str(qs[0].get('question_text',''))[:60]}")
            else:
                print(f"  {qtype}: EMPTY")
        except Exception as e:
            print(f"  {qtype}: ERROR - {e}")
