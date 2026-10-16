"""Node-family surface for Class 9 hist.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c9_hist_", "hist", 9, "Class 9 hist")

SOLVER_REGISTRY = dict(_SOLVERS)
