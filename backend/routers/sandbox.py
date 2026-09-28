"""sandbox.py — unified solve/validate API for the subject sandboxes.

One endpoint the six subject sandboxes (maths, physics, chemistry, biology,
accountancy, economics) call to compute ground truth for ANY student state.
Routes by subject to the modeling_layer's registered model_* functions and
returns a normalized JSON payload the frontend can render directly.

Closed-world: answers come from the deterministic solver families only —
no LLM generation. A subject/module that is missing degrades to
available=false so the sandbox UI can grey out that mode honestly.
"""
from __future__ import annotations

from typing import Any, Dict, List, Optional

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/sandbox", tags=["sandbox"])

# subject -> (module path, model function name). Registered lazily so a
# subject whose families module is missing degrades instead of crashing
# the whole router import.
_SUBJECT_MODELS = {
    "maths": ("backend.its.solver.maths2_families", "model_maths2"),
    "applied_maths": ("backend.its.solver.applied_maths_families", "model_applied_maths"),
    "physics": ("backend.its.solver.physics_families", "model_physics_families"),
    "chemistry": ("backend.its.solver.chemistry_families", "model_chemistry_families"),
    "biology": ("backend.its.solver.biology_families", "model_biology_families"),
    "accountancy": ("backend.its.solver.accountancy_families", "model_accountancy_families"),
    "economics": ("backend.its.solver.economics_families", "model_economics_families"),
}

_model_cache: Dict[str, Any] = {}


def _physics_chain():
    """Physics = the core physics_families table + the physics2/physics3
    batch tables (optics formulas, Coulomb, momentum, waves...).  The
    first table with the highest-confidence grounded hit answers; a
    missing module degrades to the remaining ones."""
    fns = []
    for module_path, fn_name in (
        ("backend.its.solver.physics_families", "model_physics_families"),
        ("backend.its.solver.physics2_families", "model_physics2"),
        ("backend.its.solver.physics3_families", "model_physics3"),
    ):
        try:
            import importlib

            module = importlib.import_module(module_path)
            fns.append(getattr(module, fn_name))
        except Exception:
            continue
    return fns


def _model_physics(text: str):
    best = None
    for fn in _physics_chain():
        try:
            r = fn(text)
        except Exception:
            continue
        if getattr(r, "matched", False) and (
                best is None or
                getattr(r, "confidence", 0) > getattr(best, "confidence", 0)):
            best = r
    return best


def _get_model(subject: str):
    if subject in _model_cache:
        return _model_cache[subject]
    if subject == "physics":
        fn = _model_physics  # chained: physics_families -> physics2 -> physics3
        _model_cache[subject] = fn
        return fn
    entry = _SUBJECT_MODELS.get(subject)
    if not entry:
        return None
    module_path, fn_name = entry
    try:
        import importlib

        module = importlib.import_module(module_path)
        fn = getattr(module, fn_name)
        _model_cache[subject] = fn
        return fn
    except Exception:
        _model_cache[subject] = None
        return None


class SolveRequest(BaseModel):
    subject: str
    text: str


class SolveResponse(BaseModel):
    subject: str
    structure: str
    matched: bool
    available: bool
    final_answer: str
    numeric_answer: Optional[float] = None
    steps: List[str] = []
    quantities: Dict[str, float] = {}
    governing_equation: str = ""
    note: str = ""


def _serialize(subject: str, result) -> SolveResponse:
    return SolveResponse(
        subject=subject,
        structure=getattr(result, "structure", "") or "",
        matched=bool(getattr(result, "matched", False)),
        available=True,
        final_answer=getattr(result, "final_answer", "") or "",
        numeric_answer=getattr(result, "numeric_answer", None),
        steps=list(getattr(result, "steps", []) or []),
        quantities=dict(getattr(result, "quantities", {}) or {}),
        governing_equation=getattr(result, "governing_equation", "") or "",
        note=getattr(result, "note", "") or "",
    )


@router.post("/solve", response_model=SolveResponse)
async def sandbox_solve(req: SolveRequest):
    subject = (req.subject or "").strip().lower()
    fn = _get_model(subject)
    if fn is None:
        return SolveResponse(
            subject=subject, structure="", matched=False, available=False,
            final_answer="", note=f"solver families for '{subject}' are not installed yet",
        )
    try:
        result = fn(req.text)
    except Exception as e:
        return SolveResponse(
            subject=subject, structure="", matched=False, available=True,
            final_answer="", note=f"solver error: {e}",
        )
    return _serialize(subject, result)


@router.get("/subjects")
async def sandbox_subjects():
    """Which sandbox modes are live right now (honest grey-out for the UI)."""
    out = {}
    for subject in _SUBJECT_MODELS:
        fn = _get_model(subject)
        out[subject] = {"available": fn is not None}
    return out
