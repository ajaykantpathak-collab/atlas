"""Node-family surface for Class 11 phy.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c11_phy_", "phy", 11, "Class 11 phy")

SOLVER_REGISTRY = dict(_SOLVERS)
