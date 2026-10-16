"""Node-family surface for Class 6 geography.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c6_geography_", "geography", 6, "Class 6 geography")

SOLVER_REGISTRY = dict(_SOLVERS)
