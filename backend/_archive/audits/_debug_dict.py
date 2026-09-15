import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import normalize_question

reg = SolverRegistry()
reg.initialize()

fn = reg.get_question_gen("c11_soc_001")
print(f"Type: {type(fn).__name__}")
print(f"Is dict: {isinstance(fn, dict)}")
if isinstance(fn, dict):
    print(f"Keys: {list(fn.keys())}")
    for k, v in fn.items():
        print(f"  {k}: {type(v).__name__} = {str(v)[:100]}")

    # Try normalize
    result = normalize_question(fn, "test", 0, 0.5)
    print(f"\nNormalized: {result}")
