import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
REPO_DIR = BASE_DIR.parent
sys.path.insert(0, str(REPO_DIR))
sys.path.insert(0, str(BASE_DIR))

from its.solver.structure_families import STRUCTURE_SPECS
from its.solver.independent_verifier import registered_routes

reg = set(registered_routes())
specs = STRUCTURE_SPECS

unverified = {sid: spec for sid, spec in specs.items() if sid not in reg}
print(f"Total specs: {len(specs)}")
print(f"Total registered routes: {len(reg)}")
print(f"Specs directly registered: {len(set(specs) & reg)} / {len(specs)}")
print(f"Specs not yet registered: {len(unverified)}")

sample = list(unverified.items())[:25]
for sid, spec in sample:
    flds = spec.get("fields")
    ask = spec.get("ask")
    ex_len = len(spec.get("exemplars", []))
    print(f"{sid}: fields={flds}, ask={ask}, exemplars={ex_len}")
