"""Test c11_phy_001 directly."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

fn = reg.get_question_gen("c11_phy_001")
print(f"Type: {type(fn).__name__}")
print(f"Callable: {callable(fn)}")

sig = inspect.signature(fn)
print(f"Signature: {sig}")
print(f"Parameters: {list(sig.parameters.keys())}")
for name, param in sig.parameters.items():
    print(f"  {name}: default={param.default}, kind={param.kind}")

# Try calling with kwargs
try:
    result = fn(seed=42, count=3, difficulty='Medium')
    print(f"Success: {type(result).__name__}")
    if isinstance(result, list):
        print(f"  List of {len(result)}")
        if result:
            q = result[0]
            print(f"  Q1: {str(q)[:200]}")
except Exception as e:
    print(f"Failed: {e}")

# Try with just count
try:
    result = fn(count=3)
    print(f"With count only: {type(result).__name__}")
except Exception as e:
    print(f"With count only failed: {e}")
