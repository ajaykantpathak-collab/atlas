import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Check what generators exist for class 11 physics
entry = reg._question_gens.get("class11_physics_questions")
print(f"Module: class11_physics_questions")
print(f"Types: {list(entry.registry.keys()) if entry else 'NOT FOUND'}")

# Test both with different seeds (idx=2, diff=0.7)
for qt in ["c11_phy_001", "c11_phy_002"]:
    fn = reg.get_question_gen(qt)
    sig = inspect.signature(fn)
    print(f"\n{qt}: signature={sig}")

    # Try with seed that would be used for idx=2
    seed = abs(hash(f"mechanics_2")) % (2**32)
    print(f"  seed for idx=2: {seed}")
    try:
        result = fn(seed=seed, count=3, difficulty=0.7)
        print(f"  Result: {type(result).__name__}, len={len(result) if hasattr(result, '__len__') else 'N/A'}")
        if isinstance(result, list) and result:
            q = result[0]
            if isinstance(q, dict):
                print(f"  Q: {q.get('question_text', q.get('text', 'N/A'))[:100]}")
    except Exception as e:
        print(f"  FAILED: {e}")

    # Also try with difficulty as string
    try:
        result = fn(seed=seed, count=3, difficulty='Hard')
        print(f"  With 'Hard': {type(result).__name__}, len={len(result)}")
    except Exception as e:
        print(f"  With 'Hard' failed: {e}")
