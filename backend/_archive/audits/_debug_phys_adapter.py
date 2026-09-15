"""Debug class11/12 physics via adapter."""
import sys, inspect
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

# class11_physics
print("=== class11_physics ===")
for qtype in reg.list_question_gen_types():
    if 'class11_phys' in qtype:
        adapter = adapters.get_adapter(qtype)
        if adapter:
            qs = adapter.generate(seed=42, count=1, difficulty=0.5)
            if qs:
                print(f"  {qtype}: OK - {str(qs[0].get('question_text',''))[:60]}")
            else:
                print(f"  {qtype}: EMPTY")
                # Try direct call
                mod_name = qtype.split(':')[0]
                fn_name = qtype.split(':')[1]
                entry = reg._question_gens.get(mod_name)
                if entry:
                    fn = entry.registry.get(fn_name)
                    if fn:
                        sig = inspect.signature(fn)
                        print(f"    signature: {sig}")
                        try:
                            result = fn(seed=42, count=1)
                            print(f"    direct: type={type(result).__name__}, len={len(result) if hasattr(result,'__len__') else 'N/A'}")
                            if isinstance(result, list) and result:
                                print(f"    first: {str(result[0])[:80]}")
                        except Exception as e:
                            print(f"    direct ERROR: {e}")
        else:
            print(f"  {qtype}: NO ADAPTER")

# class12_physics
print("\n=== class12_physics ===")
for qtype in reg.list_question_gen_types():
    if 'class12_phys' in qtype:
        adapter = adapters.get_adapter(qtype)
        if adapter:
            qs = adapter.generate(seed=42, count=1, difficulty=0.5)
            if qs:
                print(f"  {qtype}: OK - {str(qs[0].get('question_text',''))[:60]}")
            else:
                print(f"  {qtype}: EMPTY")
                mod_name = qtype.split(':')[0]
                fn_name = qtype.split(':')[1]
                entry = reg._question_gens.get(mod_name)
                if entry:
                    fn = entry.registry.get(fn_name)
                    if fn:
                        sig = inspect.signature(fn)
                        print(f"    signature: {sig}")
                        try:
                            import random
                            rng = random.Random(42)
                            result = fn(rng=rng, count=1)
                            print(f"    direct: type={type(result).__name__}, len={len(result) if hasattr(result,'__len__') else 'N/A'}")
                            if isinstance(result, list) and result:
                                print(f"    first: {str(result[0])[:80]}")
                        except Exception as e:
                            print(f"    direct ERROR: {e}")
        else:
            print(f"  {qtype}: NO ADAPTER")
