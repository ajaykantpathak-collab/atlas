import sys, inspect, traceback
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry, normalize_question

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# Test class1_maths directly
print("=== class1_maths direct test ===")
entry = reg._question_gens.get('class1_maths_questions')
fn = entry.registry.get('generate_class1_math_questions')
try:
    result = fn(seed=42, questions_per_node=5)
    print(f"  result type: {type(result).__name__}")
    if isinstance(result, tuple):
        print(f"  tuple len: {len(result)}")
        for i, item in enumerate(result):
            print(f"    [{i}] type={type(item).__name__}")
            if isinstance(item, dict):
                print(f"        keys: {list(item.keys())[:5]}")
                for k, v in list(item.items())[:1]:
                    print(f"        {k}: type={type(v).__name__}, len={len(v) if hasattr(v,'__len__') else 'N/A'}")
                    if hasattr(v, '__len__') and len(v) > 0:
                        q = v[0]
                        print(f"          first q: type={type(q).__name__}")
                        print(f"          attrs: {[a for a in dir(q) if not a.startswith('_') and not callable(getattr(q,a,None))][:10]}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()

# Test class11_chem directly
print("\n=== class11_chem direct test ===")
entry = reg._question_gens.get('class11_chem_questions')
mod = inspect.getmodule(entry.registry.get('gen_atomic_structure_problem'))
VarGen = getattr(mod, 'VarGen')
fn = entry.registry.get('gen_atomic_structure_problem')
try:
    vg = VarGen(42)
    result = fn(vg)
    print(f"  result type: {type(result).__name__}")
    print(f"  attrs: {[a for a in dir(result) if not a.startswith('_') and not callable(getattr(result,a,None))][:10]}")
    qt = getattr(result, 'question_text', 'N/A')
    print(f"  question_text: {str(qt)[:80]}")
    norm = normalize_question(result, "test", 0, 0.5)
    print(f"  normalized: {norm}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()

# Test class4_bio directly
print("\n=== class4_bio direct test ===")
entry = reg._question_gens.get('class4_bio_questions')
fn = entry.registry.get('generate')
try:
    result = fn(node_id="test_node", qtype="mcq", seed=42)
    print(f"  result type: {type(result).__name__}")
    print(f"  attrs: {[a for a in dir(result) if not a.startswith('_') and not callable(getattr(result,a,None))][:10]}")
    norm = normalize_question(result, "test", 0, 0.5)
    print(f"  normalized: {norm}")
except Exception as e:
    print(f"  ERROR: {e}")
    traceback.print_exc()
