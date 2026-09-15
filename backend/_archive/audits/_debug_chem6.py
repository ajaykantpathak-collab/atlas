import sys; sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry
reg = SolverRegistry(); reg.initialize()
adapters = AdapterRegistry(); adapters.set_solver_registry(reg)

for mod_name in ['class6_chem_questions', 'class11_chem_questions', 'class1_maths_questions']:
    entry = reg._question_gens.get(mod_name)
    if not entry:
        print(f"{mod_name}: NOT FOUND")
        continue
    print(f"\n=== {mod_name} ===")
    for qt in entry.registry:
        namespaced = f"{mod_name}:{qt}"
        adapter = adapters.get_adapter(namespaced)
        obj = entry.registry[qt]
        status = "OK" if adapter else "FAIL"
        print(f"  {qt}: type={type(obj).__name__}, callable={callable(obj)}, is_type={isinstance(obj, type)}, adapter={status}")
