"""Test class8_geo with proper kwargs."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

fn = reg.get_question_gen("class8_geo")
print(f"Type: {type(fn).__name__}")

# Try with both seed and count
try:
    result = fn(seed=42, count=3)
    print(f"Success: {type(result).__name__}")
    if isinstance(result, list):
        print(f"  List of {len(result)}")
        if result:
            q = result[0]
            if isinstance(q, dict):
                print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', q.get('stem', '')))))[:150]}")
                print(f"  Keys: {list(q.keys())}")
except Exception as e:
    print(f"Failed: {e}")

# Try positional
try:
    result = fn(42, 3)
    print(f"Positional: {type(result).__name__}")
    if isinstance(result, list):
        print(f"  List of {len(result)}")
        if result:
            q = result[0]
            if isinstance(q, dict):
                print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', q.get('stem', '')))))[:150]}")
except Exception as e:
    print(f"Positional failed: {e}")
