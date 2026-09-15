"""Debug remaining EMPTY generators."""
import sys, inspect, traceback
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry, normalize_question

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# 1. class11_chem gen_atomic_structure_problem
print("=== class11_chem gen_atomic_structure_problem ===")
entry = reg._question_gens.get('class11_chem_questions')
fn = entry.registry.get('gen_atomic_structure_problem')
sig = inspect.signature(fn)
print(f"  signature: {sig}")
try:
    from solvers._plugins.class11_chem_questions import VarGen
    vg = VarGen(42)
    result = fn(vg, competency=False)
    print(f"  result type: {type(result).__name__}")
    if hasattr(result, 'question_text'):
        print(f"  question_text: {result.question_text[:80]}")
    norm = normalize_question(result, "class11_chem", 0, 0.5)
    print(f"  normalized: {norm is not None}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()

# 2. class12_chem — check what it needs
print("\n=== class12_chem gen_solid_state_problem ===")
entry = reg._question_gens.get('class12_chem_questions')
fn = entry.registry.get('gen_solid_state_problem')
if fn:
    sig = inspect.signature(fn)
    print(f"  signature: {sig}")
    try:
        result = fn()
        print(f"  no args: type={type(result).__name__}")
    except Exception as e:
        print(f"  no args ERROR: {e}")
    try:
        from solvers._plugins.class12_chem_questions import VarGen
        vg = VarGen(42)
        result = fn(vg)
        print(f"  with vg: type={type(result).__name__}")
        if hasattr(result, 'question_text'):
            print(f"  question_text: {result.question_text[:80]}")
    except Exception as e:
        print(f"  with vg ERROR: {e}")
        traceback.print_exc()
else:
    print("  NOT FOUND")

# 3. Check class12_chem imports
print("\n=== class12_chem imports ===")
import importlib
mod = importlib.import_module('solvers._plugins.class12_chem_questions')
# Check what it imports for solvers
import re
src = open(mod.__file__, encoding='utf-8').read()
imports = re.findall(r'from\s+solvers\S+|import\s+solvers\S+', src)
for imp in imports:
    print(f"  {imp}")
# Check for SOLVER_REGISTRY
if 'SOLVER_REGISTRY' in src:
    # Find the definition
    idx = src.index('SOLVER_REGISTRY')
    print(f"\n  SOLVER_REGISTRY context:")
    print(f"  {src[idx:idx+200]}")
