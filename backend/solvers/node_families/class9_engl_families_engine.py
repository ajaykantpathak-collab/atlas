"""Node-family surface for Class 9 engl.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c9_engl_", "engl", 9, "Class 9 engl")

SOLVER_REGISTRY = dict(_SOLVERS)
