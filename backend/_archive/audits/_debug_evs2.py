"""Test calling the EVS generator functions directly."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# These are plain functions — test calling them
funcs = ["generate_c3_evs_001", "generate_c3_evs_002", "generate_c3_evs_003",
         "generate_c3_evs_004", "build_question_bank"]

for fname in funcs:
    print(f"\n=== {fname} ===")
    fn = reg.get_question_gen(fname)
    if fn is None:
        print(f"  NOT FOUND")
        continue
    print(f"  Type: {type(fn).__name__}, callable={callable(fn)}, is_class={isinstance(fn, type)}")

    if not callable(fn):
        print(f"  Not callable, skipping")
        continue

    # Check signature
    try:
        sig = inspect.signature(fn)
        params = list(sig.parameters.keys())
        print(f"  Signature: ({params})")
    except Exception as e:
        print(f"  Can't get signature: {e}")
        params = []

    # Try calling with no args
    try:
        result = fn()
        print(f"  No-arg: {type(result).__name__} = {str(result)[:200]}")
        if isinstance(result, list) and result:
            print(f"  List of {len(result)}")
            q = result[0]
            if isinstance(q, dict):
                print(f"  Q1: {str(q.get('question_text', q.get('text', q.get('question', ''))))[:150]}")
                print(f"  Keys: {list(q.keys())}")
            elif hasattr(q, 'question_text'):
                print(f"  Q1: {q.question_text[:150]}")
            else:
                print(f"  Q1: {str(q)[:200]}")
        elif isinstance(result, dict):
            print(f"  Dict keys: {list(result.keys())}")
            if 'questions' in result:
                print(f"  Has 'questions' key with {len(result['questions'])} items")
        continue
    except Exception as e:
        print(f"  No-arg failed: {str(e)[:150]}")

    # Try with seed
    try:
        result = fn(seed=42)
        print(f"  With seed: {type(result).__name__} = {str(result)[:200]}")
        continue
    except Exception as e:
        print(f"  With seed failed: {str(e)[:150]}")

    # Try with various args based on params
    kwargs = {}
    for p in params:
        if p == 'seed': kwargs[p] = 42
        elif p in ('n', 'count', 'num_questions'): kwargs[p] = 3
        elif p == 'difficulty': kwargs[p] = 'Medium'
        elif p in ('node_id', 'node'): kwargs[p] = 'test'
        elif p == 'qtype': kwargs[p] = None
        elif p == 'mix': kwargs[p] = None

    try:
        result = fn(**kwargs)
        print(f"  With kwargs: {type(result).__name__} = {str(result)[:200]}")
    except Exception as e:
        print(f"  With kwargs failed: {str(e)[:150]}")
