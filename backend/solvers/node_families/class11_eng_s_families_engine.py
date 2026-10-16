"""Node-family surface for Class 11 eng_s.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c11_eng_s_", "eng_s", 11, "Class 11 eng_s")

SOLVER_REGISTRY = dict(_SOLVERS)
