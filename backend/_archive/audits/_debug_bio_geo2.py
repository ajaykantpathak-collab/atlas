"""Test specific failing generators."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Test generate_class7_bio_questions
print("=== generate_class7_bio_questions ===")
fn = reg.get_question_gen("generate_class7_bio_questions")
if fn is None:
    print("  NOT FOUND")
else:
    print(f"  Type: {type(fn).__name__}, callable={callable(fn)}")
    sig = inspect.signature(fn)
    print(f"  Signature: {sig}")
    try:
        result = fn()
        print(f"  No-arg: {type(result).__name__}")
        if isinstance(result, list):
            print(f"  List of {len(result)}")
            if result:
                q = result[0]
                if isinstance(q, dict):
                    print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', q.get('stem', '')))))[:120]}")
                elif hasattr(q, 'question_text'):
                    print(f"  Q1: {q.question_text[:120]}")
                elif hasattr(q, 'stem'):
                    print(f"  Q1: {q.stem[:120]}")
                elif hasattr(q, 'question'):
                    print(f"  Q1: {q.question[:120]}")
                else:
                    print(f"  Q1 attrs: {[a for a in dir(q) if not a.startswith('_')]}")
        elif hasattr(result, 'questions'):
            print(f"  Has questions: {len(result.questions)}")
            if result.questions:
                q = result.questions[0]
                print(f"  Q1 attrs: {[a for a in dir(q) if not a.startswith('_')]}")
                print(f"  Q1 stem: {getattr(q, 'stem', 'N/A')[:120]}")
                print(f"  Q1 question: {getattr(q, 'question', 'N/A')[:120]}")
        else:
            print(f"  Result: {str(result)[:200]}")
    except Exception as e:
        print(f"  Failed: {e}")
    # Try with seed
    try:
        result = fn(seed=42)
        print(f"  With seed: {type(result).__name__}")
    except Exception as e:
        print(f"  With seed failed: {e}")

# Test class8_geo
print("\n=== class8_geo ===")
fn = reg.get_question_gen("class8_geo")
if fn is None:
    print("  NOT FOUND")
else:
    print(f"  Type: {type(fn).__name__}, callable={callable(fn)}")
    sig = inspect.signature(fn)
    print(f"  Signature: {sig}")
    try:
        result = fn()
        print(f"  No-arg: {type(result).__name__}")
        if isinstance(result, list):
            print(f"  List of {len(result)}")
            if result:
                q = result[0]
                if isinstance(q, dict):
                    print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', q.get('stem', '')))))[:120]}")
                elif hasattr(q, 'stem'):
                    print(f"  Q1: {q.stem[:120]}")
                elif hasattr(q, 'question'):
                    print(f"  Q1: {q.question[:120]}")
        elif hasattr(result, 'questions'):
            print(f"  Has questions: {len(result.questions)}")
        else:
            print(f"  Result: {str(result)[:200]}")
    except Exception as e:
        print(f"  Failed: {e}")
    try:
        result = fn(seed=42)
        print(f"  With seed: {type(result).__name__}")
        if isinstance(result, list) and result:
            q = result[0]
            if isinstance(q, dict):
                print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', q.get('stem', '')))))[:120]}")
    except Exception as e:
        print(f"  With seed failed: {e}")
