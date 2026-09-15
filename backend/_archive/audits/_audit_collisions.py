"""Check how many qtype names collide across modules."""
import sys
from collections import defaultdict
sys.path.insert(0, '.')
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.initialize()

# Build qtype -> list of modules
qtype_to_modules = defaultdict(list)
for name, entry in reg._question_gens.items():
    for qt in entry.registry:
        qtype_to_modules[qt].append(name)

collisions = {qt: mods for qt, mods in qtype_to_modules.items() if len(mods) > 1}
print(f"Total unique qtype names: {len(qtype_to_modules)}")
print(f"Collisions (same name in multiple modules): {len(collisions)}")
print(f"\nTop collisions:")
for qt, mods in sorted(collisions.items(), key=lambda x: len(x[1]), reverse=True)[:20]:
    print(f"  {qt}: {len(mods)} modules")
    for m in mods[:5]:
        print(f"    - {m}")
    if len(mods) > 5:
        print(f"    ... and {len(mods)-5} more")
