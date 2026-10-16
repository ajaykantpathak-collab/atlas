"""Node-family surface for Class 10 math.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c10_math_", "math", 10, "Class 10 math")

SOLVER_REGISTRY = dict(_SOLVERS)
