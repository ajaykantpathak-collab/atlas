"""Node-family surface for Class 7 geo.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c7_geo_", "geo", 7, "Class 7 geo")

SOLVER_REGISTRY = dict(_SOLVERS)
