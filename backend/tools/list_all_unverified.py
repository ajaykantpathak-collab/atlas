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

print(f"Total unverified: {len(unverified)}")
for sid, spec in sorted(unverified.items()):
    ex = spec.get("exemplars", [])
    ex_str = ex[0] if ex else "NO_EXEMPLAR"
    desc = spec.get("desc", spec.get("name", ""))
    print(f"{sid:28} | {desc:30} | {ex_str[:50]}")
