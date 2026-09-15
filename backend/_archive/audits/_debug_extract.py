import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import extract_from_result

reg = SolverRegistry(); reg.initialize()
entry = reg._question_gens.get('class1_maths_questions')
fn = entry.registry.get('generate_class1_math_questions')
result = fn(seed=42, questions_per_node=5)

print(f"result type: {type(result).__name__}")
print(f"is tuple: {isinstance(result, tuple)}")
print(f"len: {len(result)}")
print(f"result[0] type: {type(result[0]).__name__}")
print(f"result[0] is dict: {isinstance(result[0], dict)}")

# Check if all values in result[0] are lists
if isinstance(result[0], dict):
    all_lists = all(isinstance(v, list) for v in result[0].values())
    print(f"all values are lists: {all_lists}")
    for k, v in result[0].items():
        print(f"  {k}: type={type(v).__name__}, len={len(v) if isinstance(v, list) else 'N/A'}")
        if isinstance(v, list) and v:
            print(f"    first item type: {type(v[0]).__name__}")
            print(f"    first item attrs: {[a for a in dir(v[0]) if not a.startswith('_') and not callable(getattr(v[0],a,None))][:10]}")

# Now try extract_from_result manually
print("\nTrying extract_from_result...")
q = extract_from_result(result, "class1_maths", 0, 0.5)
print(f"Result: {q}")
