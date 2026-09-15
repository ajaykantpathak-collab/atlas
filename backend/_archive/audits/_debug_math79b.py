import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry(); reg.initialize()

# class7_maths — check all registered symbols
print("=== class7_maths all symbols ===")
entry = reg._question_gens.get('class7_maths_questions')
if entry:
    for name, obj in entry.registry.items():
        print(f"  {name}: type={type(obj).__name__}")

# Check build_worksheet signature
fn = entry.registry.get('build_worksheet')
if fn:
    sig = inspect.signature(fn)
    print(f"\n  build_worksheet signature: {sig}")
    try:
        result = fn()
        print(f"  no args: type={type(result).__name__}, len={len(result) if hasattr(result,'__len__') else 'N/A'}")
    except Exception as e:
        print(f"  no args ERROR: {e}")
    try:
        result = fn(seed=42)
        print(f"  seed=42: type={type(result).__name__}")
    except Exception as e:
        print(f"  seed ERROR: {e}")

# class9_maths — check all registered symbols
print("\n=== class9_maths all symbols ===")
entry = reg._question_gens.get('class9_maths_questions')
if entry:
    for name, obj in entry.registry.items():
        print(f"  {name}: type={type(obj).__name__}")
        if inspect.isclass(obj):
            try:
                inst = obj()
                print(f"    instantiated: {type(inst).__name__}")
                # Check for generate methods
                for m in dir(inst):
                    if 'generate' in m.lower() or 'question' in m.lower():
                        if callable(getattr(inst, m)):
                            print(f"    method: {m}")
            except Exception as e:
                print(f"    instantiate ERROR: {e}")
