import sys; sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

for qt in ['class6_chem_questions:generate_all_questions',
           'class6_chem_questions:generate_node1_questions',
           'class6_chem_questions:generate_node2_questions',
           'class6_chem_questions:generate_node3_questions']:
    adapter = adapters.get_adapter(qt)
    if adapter is None:
        print(f"{qt}: NO ADAPTER")
        continue
    try:
        qs = adapter.generate(seed=42, count=1, difficulty=0.5)
        if qs:
            q = qs[0]
            print(f"{qt}: OK - {str(q.get('question_text', ''))[:60]}")
        else:
            print(f"{qt}: EMPTY result")
    except Exception as e:
        print(f"{qt}: ERROR - {e}")

# Also check what params generate_node1_questions expects
import inspect
entry = reg._question_gens.get('class6_chem_questions')
if entry:
    fn = entry.registry.get('generate_node1_questions')
    if fn:
        sig = inspect.signature(fn)
        print(f"\ngenerate_node1_questions signature: {sig}")
    fn2 = entry.registry.get('generate_all_questions')
    if fn2:
        sig2 = inspect.signature(fn2)
        print(f"generate_all_questions signature: {sig2}")
