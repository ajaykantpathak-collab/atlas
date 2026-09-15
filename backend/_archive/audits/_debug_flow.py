import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry, extract_from_result, normalize_question

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Test class1_maths — call the function directly then run through extract_from_result
entry = reg._question_gens.get('class1_maths_questions')
fn = entry.registry.get('generate_class1_math_questions')
print("=== class1_maths manual flow ===")
try:
    result = fn(seed=42, questions_per_node=5)
    print(f"  result type: {type(result).__name__}, len: {len(result)}")
    print(f"  result[0] type: {type(result[0]).__name__}")
    if isinstance(result[0], dict):
        print(f"  result[0] keys: {list(result[0].keys())}")
        # Try extract_from_result
        q = extract_from_result(result, "class1_maths", 0, 0.5)
        print(f"  extract_from_result[0]: {q}")
        q = extract_from_result(result, "class1_maths", 1, 0.5)
        print(f"  extract_from_result[1]: {q}")
except Exception as e:
    import traceback
    print(f"  ERROR: {e}")
    traceback.print_exc()

# Test class4_bio — call with valid node_id
print("\n=== class4_bio manual flow ===")
entry = reg._question_gens.get('class4_bio_questions')
fn = entry.registry.get('generate')
try:
    result = fn(node_id="c4_bio_001", qtype="mcq", seed=42)
    print(f"  result type: {type(result).__name__}")
    print(f"  attrs: {[a for a in dir(result) if not a.startswith('_') and not callable(getattr(result,a,None))][:10]}")
    q = extract_from_result(result, "class4_bio", 0, 0.5)
    print(f"  extract_from_result: {q}")
except Exception as e:
    import traceback
    print(f"  ERROR: {e}")
    traceback.print_exc()

# Now check what the adapter is actually passing
print("\n=== adapter kwargs check ===")
namespaced = "class1_maths_questions:generate_class1_math_questions"
adapter = adapters.get_adapter(namespaced)
if adapter:
    kwargs = adapter._build_kwargs(seed=42, count=1, difficulty=0.5)
    print(f"  class1_maths kwargs: {kwargs}")
    # Try calling
    try:
        result = adapter.fn(**kwargs)
        print(f"  result type: {type(result).__name__}")
    except Exception as e:
        print(f"  CALL ERROR: {e}")

namespaced = "class4_bio_questions:generate"
adapter = adapters.get_adapter(namespaced)
if adapter:
    kwargs = adapter._build_kwargs(seed=42, count=1, difficulty=0.5)
    print(f"  class4_bio kwargs: {kwargs}")
    try:
        result = adapter.fn(**kwargs)
        print(f"  result type: {type(result).__name__}")
    except Exception as e:
        print(f"  CALL ERROR: {e}")
