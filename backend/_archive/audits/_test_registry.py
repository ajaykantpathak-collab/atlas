"""Test the actual registry loader."""
import sys
sys.path.insert(0, ".")
from solvers.registry import SolverRegistry

reg = SolverRegistry()
reg.reload()
print(f"Solvers: {len(reg._solvers)}")
print(f"Question generators: {len(reg._question_gens)}")
print(f"Failed: {len(reg._failed)}")
if reg._failed:
    print("Failed modules:")
    for f in reg._failed[:15]:
        mod = f.get("module", "?")
        err = str(f.get("error", ""))[:70]
        print(f"  {mod}: {err}")
