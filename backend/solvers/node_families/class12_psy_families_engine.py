"""Node-family surface for Class 12 psy.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c12_psy_", "psy", 12, "Class 12 psy")

SOLVER_REGISTRY = dict(_SOLVERS)
