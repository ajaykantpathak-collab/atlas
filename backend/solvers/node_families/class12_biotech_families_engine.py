"""Node-family surface for Class 12 biotech.

Every corpus node of this combo contributes its diagnostic facts as
deterministic, fail-closed solver families (see node_family_engine.py).
"""

from node_family_engine import build_registry

_SOLVERS, _GENS = build_registry("c12_biotech_", "biotech", 12, "Class 12 biotech")

SOLVER_REGISTRY = dict(_SOLVERS)
