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
    # batch-16 fix: the module's entry point is model_biology (the
    # model_biology_families name here historically 404'd every biology
    # solve into the honest-degradation path)
    "biology": ("backend.its.solver.biology_families", "model_biology"),
    "accountancy": ("backend.its.solver.accountancy_families", "model_accountancy_families"),
    "economics": ("backend.its.solver.economics_families", "model_economics_families"),
    # batch-18/19 subjects (registered in modeling_layer; the sandbox
    # routes them through their own modules the same way)
    "english": ("backend.its.solver.english_families", "model_english"),
    "hindi": ("backend.its.solver.hindi_families", "model_hindi"),
    "compapp": ("backend.its.solver.compapp_families", "model_compapp"),
    "socsci": ("backend.its.solver.socsci_families", "model_socsci"),
    "commerce": ("backend.its.solver.commerce_families", "model_commerce_families"),
    "commerce2": ("backend.its.solver.commerce_families2", "model_commerce2"),
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
def sandbox_solve(req: SolveRequest):
    # plain `def` -> thread pool: _get_model may lazily import a solver
    # family / ML model (seconds of sync work); async def here blocked the
    # event loop (the 2026-09-29 worker-wedge class of bug).
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
def sandbox_subjects():
    """Which sandbox modes are live right now (honest grey-out for the UI).

    plain `def` -> thread pool: probes every solver module import (sync)."""
    out = {}
    for subject in _SUBJECT_MODELS:
        fn = _get_model(subject)
        out[subject] = {"available": fn is not None}
    return out


# --------------------------------------------------------------------------
# E8 Code Runtime — closed-world misconception serving for the ICSE computer
# corpus. The enhanced-nodes enrichment route (routers/content.py) serves the
# content/enhanced_nodes_md index only; the ICSE Computer Applications /
# Computer Studies corpus (deploy/content/cisce_nodes_v2, bind-mounted at
# /app/content) is NOT in that index, so the sandbox serves its authored
# pedagogy fields here instead. Deterministic file parsing of the authored
# markdown — every string returned is corpus text, nothing is generated.
# --------------------------------------------------------------------------

import re as _re

_CODE_NODE_ID = _re.compile(
    r"^(c[678]_compst_icse|c9_compapp_icse|c10_compapp_icse)_(\d{2})_(\d{3})$")
_WRONG_ANSWER = "A wrong answer (e.g."


def _code_node_path(node_id: str):
    """Resolve a code-corpus node id to its md file; None when absent."""
    if not _CODE_NODE_ID.match(node_id):
        return None
    import os
    # <root>/backend/routers/sandbox.py → <root> (repo root in dev, /app in
    # the container) — the corpus lives at <root>/content/cisce_nodes_v2 and
    # deploy/content is bind-mounted at /app/content in production.
    root = os.path.dirname(os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))))
    path = os.path.join(root, "content", "cisce_nodes_v2", f"{node_id}.md")
    if os.path.isfile(path):
        return path
    return None


def _parse_code_node(node_id: str) -> dict:
    """Extract the authored COMMON_MISCONCEPTION bullets, wrong-answer
    clauses and diagnostic q/a pairs from one corpus markdown node."""
    path = _code_node_path(node_id)
    if path is None:
        return {"node_id": node_id, "found": False}
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        text = fh.read()

    sections: Dict[str, str] = {}
    cur = None
    buf: List[str] = []
    for line in text.splitlines():
        if line.startswith("## "):
            if cur is not None:
                sections[cur] = "\n".join(buf).strip()
            cur = line[3:].strip()
            buf = []
        elif cur is not None:
            buf.append(line)
    if cur is not None:
        sections[cur] = "\n".join(buf).strip()

    misconceptions: List[str] = []
    for line in sections.get("COMMON_MISCONCEPTION", "").splitlines():
        m = line.strip()
        if m.startswith("- "):
            m = m[2:].strip()
        if m.lower().startswith("misconception:"):
            m = m[len("misconception:"):].strip()
        if m.lower().startswith("**misconception:**"):
            m = m[len("**misconception:**"):].strip()
        if m:
            misconceptions.append(m)

    clauses: List[str] = []
    diagnostics: List[dict] = []
    for i in range(1, 9):
        q = sections.get(f"DIAGNOSTIC_QUESTION_{i}")
        a = sections.get(f"DIAGNOSTIC_ANSWER_{i}")
        if not q or not a:
            continue
        diagnostics.append({"question": q, "answer": a})
        start = a.find(_WRONG_ANSWER)
        if start >= 0:
            chunk = a[start:]
            # authored analysis runs to the end of its sentence group
            stop = chunk.find("The ")
            if 0 < stop < len(chunk) - 200:
                chunk = chunk[:stop]
            clauses.append(chunk.strip())

    return {
        "node_id": node_id,
        "found": True,
        "common_misconception": misconceptions[0] if misconceptions else None,
        "misconceptions": misconceptions,
        "wrong_answer_clauses": clauses,
        "diagnostic_questions": diagnostics,
    }


@router.get("/code-node/{node_id}")
async def sandbox_code_node(node_id: str):
    """Authored misconception / diagnostic content for one ICSE computer
    corpus node (closed-world: 404-shaped {found: false} when absent)."""
    node_id = (node_id or "").strip()
    return _parse_code_node(node_id)
