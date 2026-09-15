import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
reg = SolverRegistry(); reg.initialize()

# Check class1_maths generate function
entry = reg._question_gens.get('class1_maths_questions')
if entry:
    fn = entry.registry.get('generate_class1_math_questions')
    if fn:
        sig = inspect.signature(fn)
        print(f"generate_class1_math_questions signature: {sig}")
        # Try calling it directly
        try:
            result = fn()
            print(f"Called with no args: type={type(result).__name__}, len={len(result) if result else 0}")
            if result:
                print(f"First item: {result[0]}")
                print(f"First item type: {type(result[0]).__name__}")
        except Exception as e:
            print(f"Error: {e}")

        # Try with seed
        try:
            result = fn(seed=42)
            print(f"Called with seed=42: type={type(result).__name__}, len={len(result) if result else 0}")
        except Exception as e:
            print(f"Error with seed: {e}")

        # Try with seed and count
        try:
            result = fn(seed=42, count=5)
            print(f"Called with seed=42,count=5: type={type(result).__name__}, len={len(result) if result else 0}")
            if result:
                item = result[0]
                print(f"First item attrs: {[a for a in dir(item) if not a.startswith('_') and not callable(getattr(item,a,None))][:10]}")
        except Exception as e:
            print(f"Error with seed,count: {e}")

# Check class11_chem
print()
entry = reg._question_gens.get('class11_chem_questions')
if entry:
    fn = entry.registry.get('gen_atomic_structure_problem')
    if fn:
        sig = inspect.signature(fn)
        print(f"gen_atomic_structure_problem signature: {sig}")
        try:
            result = fn()
            print(f"Called with no args: type={type(result).__name__}")
            if result:
                print(f"  attrs: {[a for a in dir(result) if not a.startswith('_') and not callable(getattr(result,a,None))][:10]}")
        except Exception as e:
            print(f"Error: {e}")
        try:
            result = fn(seed=42)
            print(f"Called with seed=42: type={type(result).__name__}")
        except Exception as e:
            print(f"Error with seed: {e}")

# Check class4_bio
print()
entry = reg._question_gens.get('class4_bio_questions')
if entry:
    fn = entry.registry.get('generate')
    if fn:
        sig = inspect.signature(fn)
        print(f"generate signature: {sig}")
        try:
            result = fn()
            print(f"Called with no args: type={type(result).__name__}, len={len(result) if hasattr(result,'__len__') else 'N/A'}")
        except Exception as e:
            print(f"Error: {e}")
