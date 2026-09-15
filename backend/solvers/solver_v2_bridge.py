"""
Bridge module: registers services/solver_v2.py problem types into the solver registry.
Each solver_v2 function takes (vals, result) — this wrapper adapts them to the
registry's expected (values) -> dict signature.
"""
import sys
from pathlib import Path

# Add services/ to path so we can import solver_v2
_services_dir = str(Path(__file__).resolve().parent.parent / "services")
if _services_dir not in sys.path:
    sys.path.insert(0, _services_dir)

from solver_v2 import SolverV2, SolutionResultV2, SOLVER_REGISTRY as _V2_REGISTRY

_v2 = SolverV2()


def _make_wrapper(category: str):
    """Create a wrapper function for a solver_v2 category."""
    def wrapper(values: dict) -> dict:
        result = _v2.solve(category, values)
        # Convert SolutionResultV2 to dict
        return {
            "steps": [
                {
                    "step_number": i + 1,
                    "title": s.description,
                    "explanation": s.computation or s.description,
                    "latex": s.formula,
                }
                for i, s in enumerate(result.steps)
            ],
            "final_answer": result.final_answer,
            "success": result.success,
            "error": result.error,
        }
    wrapper.__name__ = f"solve_{category}"
    return wrapper


# Build SOLVER_REGISTRY with wrappers for each solver_v2 category
SOLVER_REGISTRY = {
    category: _make_wrapper(category)
    for category in _V2_REGISTRY
}

SOLVER_MANIFEST = {
    "version": "1.0.0",
    "dependencies": [],
    "tags": ["physics", "chemistry", "accounts", "applied_maths"],
}
