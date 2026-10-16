"""Node-family surface for Class 11 hist.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c11_hist_", "hist", 11, "Class 11 hist")

SOLVER_REGISTRY = dict(_SOLVERS)
