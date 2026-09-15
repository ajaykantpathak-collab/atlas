"""Debug why class 1 physics and class 4 chem fail."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Class 1 Physics — q_0 is a QuestionSpec
print("=== Class 1 Physics: q_0 ===")
fn = reg.get_question_gen("q_0")
print(f"  Type: {type(fn).__name__}")
print(f"  Has stem: {hasattr(fn, 'stem')}")
print(f"  Has question_text: {hasattr(fn, 'question_text')}")
if hasattr(fn, 'stem'):
    print(f"  stem: {fn.stem[:120]}")
if hasattr(fn, 'question_text'):
    print(f"  question_text: {fn.question_text[:120]}")
print(f"  All attrs: {[a for a in dir(fn) if not a.startswith('_')]}")
for a in ['stem', 'question_text', 'answer', 'correct_answer', 'qtype',
          'question_type', 'options', 'difficulty', 'id', 'question_id']:
    print(f"  {a}: {getattr(fn, a, 'MISSING')}")

# Class 4 Chem — Node1QuestionGenerator
print("\n=== Class 4 Chem: Node1QuestionGenerator ===")
fn = reg.get_question_gen("Node1QuestionGenerator")
print(f"  Type: {type(fn).__name__}, is_class={isinstance(fn, type)}")
if isinstance(fn, type):
    instance = fn()
    print(f"  Instance: {type(instance).__name__}")
    methods = [m for m in dir(instance) if not m.startswith('_') and callable(getattr(instance, m, None))]
    print(f"  Methods: {methods}")

    # Try each method
    for mname in methods:
        method = getattr(instance, mname)
        try:
            sig = inspect.signature(method)
            params = list(sig.parameters.keys())
            print(f"\n  {mname}({params})")
            kwargs = {}
            for p in params:
                if p == 'self': continue
                elif p == 'seed': kwargs[p] = 42
                elif p == 'difficulty': kwargs[p] = 'Medium'
                else: kwargs[p] = None
            result = method(**kwargs) if kwargs else method()
            print(f"    Result: {type(result).__name__} = {str(result)[:200]}")
            if hasattr(result, 'stem'):
                print(f"    stem: {result.stem[:120]}")
            if hasattr(result, 'question_text'):
                print(f"    question_text: {result.question_text[:120]}")
        except Exception as e:
            print(f"    Failed: {str(e)[:120]}")

# Class 11 Physics — c11_phy_001 is a function
print("\n=== Class 11 Physics: c11_phy_001 ===")
fn = reg.get_question_gen("c11_phy_001")
print(f"  Type: {type(fn).__name__}, callable={callable(fn)}")
if callable(fn):
    try:
        sig = inspect.signature(fn)
        params = list(sig.parameters.keys())
        print(f"  Signature: ({params})")
    except Exception:
        params = []
    try:
        result = fn() if not params else fn(seed=42)
        print(f"  Result: {type(result).__name__} = {str(result)[:200]}")
        if hasattr(result, 'stem'):
            print(f"  stem: {result.stem[:120]}")
        if hasattr(result, 'question_text'):
            print(f"  question_text: {result.question_text[:120]}")
        if isinstance(result, list) and result:
            q = result[0]
            print(f"  First: {str(q)[:200]}")
    except Exception as e:
        print(f"  Call failed: {str(e)[:150]}")
