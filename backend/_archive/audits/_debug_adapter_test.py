import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Test class1_maths via adapter
print("=== class1_maths via adapter ===")
for qt in ['generate_class1_math_questions', 'get_sample_questions']:
    namespaced = f"class1_maths_questions:{qt}"
    adapter = adapters.get_adapter(namespaced)
    if adapter:
        qs = adapter.generate(seed=42, count=1, difficulty=0.5)
        if qs:
            print(f"  {qt}: OK - {str(qs[0].get('question_text',''))[:60]}")
        else:
            print(f"  {qt}: EMPTY")
    else:
        print(f"  {qt}: NO ADAPTER")

# Test class4_bio via adapter
print("\n=== class4_bio via adapter ===")
for qt in ['generate', 'generate_batch']:
    namespaced = f"class4_bio_questions:{qt}"
    adapter = adapters.get_adapter(namespaced)
    if adapter:
        qs = adapter.generate(seed=42, count=1, difficulty=0.5)
        if qs:
            print(f"  {qt}: OK - {str(qs[0].get('question_text',''))[:60]}")
        else:
            print(f"  {qt}: EMPTY")
    else:
        print(f"  {qt}: NO ADAPTER")
