"""Node-family surface for Class 8 civ.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c8_civ_", "civ", 8, "Class 8 civ")

SOLVER_REGISTRY = dict(_SOLVERS)
