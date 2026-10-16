"""solver_gateway.py — the ONE sanctioned seam between the HTTP edge and
the solver engine (backend.its.solver.*).

The import-boundary lint (backend.harness.boundaries, Phase C) hard-fails
any ``backend.routers.*`` / ``backend.api.*`` module that imports
``backend.its.solver.*`` directly (ROUTER_DIRECT_SOLVER): routers own
request/response shaping, never solver lifecycle.  Edge code reaches the
solver THROUGH this services-layer module instead.

Mechanics: every symbol is re-exported LAZILY (PEP 562 module
``__getattr__``) so the heavy solver internals (MiniLM singletons, kernel
loaders, pipeline modules) keep exactly the import timing they had when
the edge modules imported them lazily inside request handlers.  Nothing
is loaded at app boot that wasn't before.

Adding a symbol: add a ``("module.name", "Attr")`` entry to ``_LAZY``
(``None`` attr = the module itself, for ``from ... import page_solve``
style submodule access).  Do NOT import backend.its.solver from
routers/api — the lint will catch it.
"""

from __future__ import annotations

import importlib
from typing import Any, Dict, Optional, Tuple

# symbol -> (its.solver module, attribute or None for the module itself)
_LAZY: Dict[str, Tuple[str, Optional[str]]] = {
    # contract (statuses, outcomes, version stamp, metrics)
    "SOLVER_VERSION": ("backend.its.solver.contract", "SOLVER_VERSION"),
    "SolverOutcome": ("backend.its.solver.contract", "SolverOutcome"),
    "SolverStatus": ("backend.its.solver.contract", "SolverStatus"),
    "emit_solver_metrics": ("backend.its.solver.contract", "emit_solver_metrics"),
    "outcome_from_pipeline": ("backend.its.solver.contract", "outcome_from_pipeline"),
    "promotion_gate": ("backend.its.solver.contract", "promotion_gate"),
    # answer pipeline (the shared solve cascade)
    "answer": ("backend.its.solver.answer_pipeline", "answer"),
    "_queue_path": ("backend.its.solver.answer_pipeline", "_queue_path"),
    "AuditTrail": ("backend.its.solver.answer_pipeline", "AuditTrail"),
    # deterministic v3 service
    "solve_deterministically": ("backend.its.solver.deterministic_service",
                                "solve_deterministically"),
    # IR + surface rendering + validation (deterministic practice lanes)
    "ir_from_dict": ("backend.its.solver.ir", "ir_from_dict"),
    "render_question": ("backend.its.solver.surface_renderer", "render_question"),
    "vary": ("backend.its.solver.surface_renderer", "vary"),
    "validate_ir": ("backend.its.solver.validator", "validate_ir"),
    # warmup / cascade internals used by the practice warm thread
    "solve_text": ("backend.its.solver.router", "solve_text"),
    "parse_quantities": ("backend.its.solver.quantity_parser", "parse_quantities"),
    "embed_texts": ("backend.its.solver.variable_registry", "embed_texts"),
    "get_matcher": ("backend.its.solver.semantic_matcher", "get_matcher"),
    # repertoire / parts / images / binding
    "attach_repertoire": ("backend.its.solver.repertoire", "attach_repertoire"),
    "overall_verdict": ("backend.its.solver.part_splitter", "overall_verdict"),
    "split_parts": ("backend.its.solver.part_splitter", "split_parts"),
    "split_questions": ("backend.its.solver.image_questions", "split_questions"),
    "page_solve": ("backend.its.solver.page_solve", None),
    "execute_binding": ("backend.its.solver.binding_executor", "execute_binding"),
    # verification + telemetry
    "verify_independent": ("backend.its.solver.independent_verifier",
                           "verify_independent"),
    "telemetry_record": ("backend.its.solver.solver_telemetry", "record"),
    "telemetry_snapshot": ("backend.its.solver.solver_telemetry", "snapshot"),
    # competency tutor engines
    "TutorEngine": ("backend.its.solver.tutor", "TutorEngine"),
    "MisconceptionCatalog": ("backend.its.solver.misconception_catalog",
                             "MisconceptionCatalog"),
    "resolve_concept_id": ("backend.its.solver.id_resolution", "resolve_concept_id"),
    "resolve_node_id": ("backend.its.solver.id_resolution", "resolve_node_id"),
    # read-back confirm/correct card (WS-D 2026-10-10): api/ reached
    # backend.its.solver.readback directly and tripped the boundaries
    # gate — the gateway is the sanctioned seam for every its.solver symbol.
    "readback_module": ("backend.its.solver.readback", None),
    # antislop scrub (CL-19): api/tutor's student-facing strings reach the
    # slop gate through this seam, never by importing its.solver directly.
    "slop_gate_module": ("backend.its.solver.slop_gate", None),
    "gate_text": ("backend.its.solver.slop_gate", "gate_text"),
    # solve-check surface (fix_2026_10_15 G3): api/solve_check.py reaches
    # guided_compute / tiered_response through this seam — the 2026-10-13
    # in-flight session had imported them directly (ROUTER_DIRECT_SOLVER).
    "check_student_answer": ("backend.its.solver.guided_compute",
                             "check_student_answer"),
    "compute_solution": ("backend.its.solver.guided_compute",
                         "compute_solution"),
    "best_available_payload": ("backend.its.solver.tiered_response",
                               "best_available_payload"),
}


def __getattr__(name: str) -> Any:
    spec = _LAZY.get(name)
    if spec is None:
        raise AttributeError(
            f"module {__name__!r} has no attribute {name!r} — solver_gateway "
            f"re-exports only the symbols in its _LAZY surface")
    module_name, attr = spec
    module = importlib.import_module(module_name)
    value = module if attr is None else getattr(module, attr)
    globals()[name] = value          # cache: subsequent lookups are direct
    return value


def __dir__():
    return sorted(set(globals()) | set(_LAZY))
