"""Node-family surface for Class 12 phy.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c12_phy_", "phy", 12, "Class 12 phy")

SOLVER_REGISTRY = dict(_SOLVERS)
