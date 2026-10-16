"""Node-family surface for Class 7 math.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c7_math_", "math", 7, "Class 7 math")

SOLVER_REGISTRY = dict(_SOLVERS)
