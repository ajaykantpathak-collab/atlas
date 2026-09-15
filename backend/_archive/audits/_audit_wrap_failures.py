"""Check which generators fail to wrap in the adapter."""
import sys
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry
from services.question_adapter import AdapterRegistry

reg = SolverRegistry()
reg.initialize()
adapters = AdapterRegistry()
adapters.set_solver_registry(reg)

types = reg.list_question_gen_types()
print(f"Total qtypes: {len(types)}")

wrapped = 0
failed = 0
failed_list = []
for qt in types:
    adapter = adapters.get_adapter(qt)
    if adapter is not None:
        wrapped += 1
    else:
        failed += 1
        failed_list.append(qt)

print(f"Wrapped: {wrapped}")
print(f"Failed to wrap: {failed}")

# Show failed by module
from collections import defaultdict
by_module = defaultdict(list)
for qt in failed_list:
    if ":" in qt:
        mod, name = qt.split(":", 1)
    else:
        mod, name = qt, qt
    by_module[mod].append(name)

print(f"\n=== FAILED BY MODULE (top 20) ===")
for mod, names in sorted(by_module.items())[:20]:
    print(f"  {mod}: {names[:5]}")
