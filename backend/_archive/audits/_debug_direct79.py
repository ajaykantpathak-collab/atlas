import sys, inspect, traceback
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import normalize_question

reg = SolverRegistry(); reg.initialize()

# class9_maths — test DeterministicQuestionGenerator directly
print("=== class9_maths DeterministicQuestionGenerator ===")
entry = reg._question_gens.get('class9_maths_questions')
cls = entry.registry.get('DeterministicQuestionGenerator')
try:
    inst = cls(seed=42)
    print(f"  instantiated OK")
    # Check generate_question
    sig = inspect.signature(inst.generate_question)
    print(f"  generate_question signature: {sig}")
    try:
        result = inst.generate_question(node_id="c9_math_001")
        print(f"  result type: {type(result).__name__}")
        print(f"  attrs: {[a for a in dir(result) if not a.startswith('_') and not callable(getattr(result,a,None))][:10]}")
        norm = normalize_question(result, "class9_maths", 0, 0.5)
        print(f"  normalized: {norm}")
    except Exception as e:
        print(f"  generate_question ERROR: {e}")
        traceback.print_exc()
except Exception as e:
    print(f"  instantiate ERROR: {e}")
    traceback.print_exc()

# class7_maths — test build_worksheet directly
print("\n=== class7_maths build_worksheet ===")
entry = reg._question_gens.get('class7_maths_questions')
fn = entry.registry.get('build_worksheet')
sig = inspect.signature(fn)
print(f"  signature: {sig}")
try:
    result = fn(node_id="c7_math_001", seed=42, n=5, difficulty="easy")
    print(f"  result type: {type(result).__name__}")
    if isinstance(result, dict):
        print(f"  keys: {list(result.keys())[:10]}")
        # Check for questions
        if 'questions' in result:
            qs = result['questions']
            print(f"  questions: type={type(qs).__name__}, len={len(qs) if hasattr(qs,'__len__') else 'N/A'}")
            if isinstance(qs, list) and qs:
                print(f"  first q type: {type(qs[0]).__name__}")
                norm = normalize_question(qs[0], "class7_maths", 0, 0.5)
                print(f"  normalized: {norm}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()
