"""Test bio generator with fixed seed."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Test generate_class7_bio_questions with valid seed
fn = reg.get_question_gen("generate_class7_bio_questions")
print(f"=== generate_class7_bio_questions ===")
try:
    result = fn(seed=42)
    print(f"Type: {type(result).__name__}")
    if isinstance(result, tuple):
        print(f"  Tuple of {len(result)}")
        gen, path = result
        print(f"  Generator: {type(gen).__name__}")
        print(f"  Path: {path}")
        # Check if generator has questions
        if hasattr(gen, 'questions'):
            print(f"  Questions: {len(gen.questions)}")
        # Check methods
        methods = [m for m in dir(gen) if not m.startswith('_') and callable(getattr(gen, m, None))]
        print(f"  Methods: {methods[:10]}")
except Exception as e:
    print(f"Failed: {e}")

# Also test class8_bio
print("\n=== class8_bio ===")
fn = reg.get_question_gen("class8_bio")
if fn:
    print(f"Type: {type(fn).__name__}")
    import inspect
    sig = inspect.signature(fn)
    print(f"Signature: {sig}")
    try:
        result = fn(seed=42, count=3)
        print(f"Result: {type(result).__name__}, len={len(result) if hasattr(result, '__len__') else 'N/A'}")
        if isinstance(result, list) and result:
            q = result[0]
            if isinstance(q, dict):
                print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', q.get('stem', '')))))[:150]}")
    except Exception as e:
        print(f"Failed: {e}")
