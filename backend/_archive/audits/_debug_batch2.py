"""Debug class12_psy, class11_maths, class12_maths, class9_chem."""
import sys, inspect, traceback
sys.path.insert(0, '.')

# class12_psy — 15 broken (all c12_psy_XXX)
print("=== class12_psy ===")
from solvers.registry import SolverRegistry
reg = SolverRegistry(); reg.initialize()
entry = reg._question_gens.get('class12_psy_questions')
if entry:
    for name, obj in entry.registry.items():
        if name.startswith('c12_psy_'):
            print(f"  {name}: type={type(obj).__name__}")
            if inspect.isclass(obj):
                try:
                    inst = obj()
                    print(f"    instantiated OK, methods: {[m for m in dir(inst) if not m.startswith('_') and callable(getattr(inst,m))][:5]}")
                except Exception as e:
                    print(f"    instantiate ERROR: {e}")
            elif callable(obj):
                sig = inspect.signature(obj)
                print(f"    signature: {sig}")

# class11_maths
print("\n=== class11_maths ===")
entry = reg._question_gens.get('class11_maths_questions')
if entry:
    for name, obj in entry.registry.items():
        if name.startswith('c11_math'):
            print(f"  {name}: type={type(obj).__name__}")
            if callable(obj):
                sig = inspect.signature(obj)
                print(f"    signature: {sig}")
                try:
                    result = obj()
                    print(f"    no args: type={type(result).__name__}")
                except Exception as e:
                    print(f"    no args ERROR: {e}")

# class12_maths
print("\n=== class12_maths ===")
entry = reg._question_gens.get('class12_maths_questions')
if entry:
    fn = entry.registry.get('generate_set')
    if fn:
        sig = inspect.signature(fn)
        print(f"  generate_set signature: {sig}")
        try:
            result = fn()
            print(f"  no args: type={type(result).__name__}")
        except Exception as e:
            print(f"  no args ERROR: {e}")

# class9_chem
print("\n=== class9_chem ===")
entry = reg._question_gens.get('class9_chem_questions')
if entry:
    for name, obj in entry.registry.items():
        if name in ('Class9ChemistryQuestionGenerator', 'Node001Generator', 'Node002Generator', 'Node003Generator'):
            print(f"  {name}: type={type(obj).__name__}")
            if inspect.isclass(obj):
                try:
                    inst = obj()
                    methods = [m for m in dir(inst) if not m.startswith('_') and callable(getattr(inst,m))]
                    print(f"    methods: {methods[:8]}")
                except Exception as e:
                    print(f"    instantiate ERROR: {e}")
