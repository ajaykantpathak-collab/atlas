"""Structured Math Solver API.

Endpoints for the structured variable input math solver.
Students select a problem type, input structured variables,
and get deterministic step-by-step solutions.

No LLM. No free-text parsing. Student inputs variables, SymPy solves.

END-TO-END FLOW:
  1. POST /identify       — student types question, gets matching problem types + variables
  2. POST /confirm-and-solve — student confirms problem type + inputs variables, gets solution
  3. POST /solve/step     — solve a single step (advanced)
  4. POST /solve/problem  — solve a full multi-step problem (advanced)
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Any, Optional

from backend.ai.step_chainer import StepChainer
from backend.ai.step_types import get_all_step_types, get_step_type, get_all_categories
from backend.ai.problem_types import (
    get_all_problem_types, get_problem_type,
    get_problem_types_by_topic, get_all_topics,
)
from backend.ai.deepseek_router import get_variables_for_problem_type, get_cache_stats
from backend.deps import require_self_or_staff
from backend.solver_facade import get_facade

router = APIRouter(prefix="/api/solver", tags=["solver"])

chainer = StepChainer(timeout=15)
_facade = get_facade()


# ─────────────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────────────

class SolveStepRequest(BaseModel):
    """Request to solve a single step."""
    step_type_id: str = Field(..., description="Step type ID, e.g. 'differentiate_at_point'")
    inputs: dict = Field(..., description="Input field values, e.g. {'expression': 'x*sin(x)', 'var': 'x', 'point': '1'}")


class SolveProblemRequest(BaseModel):
    """Request to solve a full multi-step problem."""
    problem_type_id: str = Field(..., description="Problem type ID, e.g. 'max_min_optimization'")
    step_inputs: list = Field(..., description="List of input dicts, one per step")


class StepFormResponse(BaseModel):
    """Form definition for a step."""
    step_index: int
    step_type_id: str
    label: str
    name: str
    description: str
    fields: list
    thinking: Optional[dict] = None
    auto_fill: dict
    next_steps: list
    marks: int


class ProblemOverviewResponse(BaseModel):
    """Overview of a problem type."""
    id: str
    name: str
    description: str
    topic: str
    class_level: str
    board: str
    marks: int
    example: str
    num_steps: int
    steps: list
    thinking: Optional[dict] = None
    hint: Optional[str] = None
    setup_help: Optional[str] = None


class SolveResponse(BaseModel):
    """Response from solving."""
    success: bool
    answer: Optional[str] = None
    steps: list = []
    verified: bool = False
    verification_msg: str = ""
    error: str = ""
    error_code: str = ""
    tier: str = "METHOD_ONLY"
    explanation: list = []
    confidence: Optional[float] = None
    disclaimer: Optional[str] = None


class SolveProblemResponse(BaseModel):
    """Response from solving a multi-step problem."""
    problem_type_id: str
    success: bool
    final_answer: str = ""
    all_verified: bool = True
    explanation: list = []
    error: str = ""
    error_code: str = ""
    tier: str = "METHOD_ONLY"
    steps: list = []


# ─────────────────────────────────────────────────────────────────────
# Endpoints — Catalog
# ─────────────────────────────────────────────────────────────────────

@router.get("/categories")
async def list_categories():
    """List all math categories (calculus, algebra, matrices, etc.)."""
    return {"categories": get_all_categories()}


@router.get("/step-types")
async def list_step_types(category: Optional[str] = None):
    """List all step types (universal math operations).

    Optional query param: category=calculus to filter
    """
    steps = get_all_step_types()
    if category:
        steps = [s for s in steps if s.category == category]
    return {
        "step_types": [
            {
                "id": s.id,
                "name": s.name,
                "description": s.description,
                "category": s.category,
                "marks": s.marks,
                "fields": [
                    {
                        "name": f.name,
                        "label": f.label,
                        "type": f.field_type,
                        "required": f.required,
                        "default": f.default,
                        "placeholder": f.placeholder,
                        "help_text": f.help_text,
                    }
                    for f in s.inputs
                ],
                "thinking": {
                    "question": s.thinking.question,
                    "options": s.thinking.options,
                    "correct": s.thinking.correct,
                    "explanation": s.thinking.explanation,
                } if s.thinking else None,
                "next_steps": s.next_steps,
            }
            for s in steps
        ]
    }


@router.get("/step-types/{step_id}")
async def get_step_type_detail(step_id: str):
    """Get detailed definition of a single step type."""
    st = get_step_type(step_id)
    if st is None:
        raise HTTPException(status_code=404, detail=f"Step type not found: {step_id}")
    return {
        "id": st.id,
        "name": st.name,
        "description": st.description,
        "category": st.category,
        "marks": st.marks,
        "fields": [
            {
                "name": f.name,
                "label": f.label,
                "type": f.field_type,
                "required": f.required,
                "default": f.default,
                "placeholder": f.placeholder,
                "help_text": f.help_text,
            }
            for f in st.inputs
        ],
        "thinking": {
            "question": st.thinking.question,
            "options": st.thinking.options,
            "correct": st.thinking.correct,
            "explanation": st.thinking.explanation,
        } if st.thinking else None,
        "next_steps": st.next_steps,
    }


@router.get("/topics")
async def list_topics():
    """List all curriculum topics that have problem types."""
    return {"topics": get_all_topics()}


@router.get("/problem-types")
async def list_problem_types(topic: Optional[str] = None, class_level: Optional[str] = None):
    """List all problem types (multi-step question chains).

    Optional filters: topic=Differentiation, class_level=12
    """
    pts = get_all_problem_types()
    if topic:
        pts = [p for p in pts if p.topic == topic]
    if class_level:
        pts = [p for p in pts if p.class_level == class_level]
    return {
        "problem_types": [
            {
                "id": p.id,
                "name": p.name,
                "description": p.description,
                "topic": p.topic,
                "class_level": p.class_level,
                "board": p.board,
                "marks": p.marks,
                "example": p.example,
                "num_steps": len(p.steps),
            }
            for p in pts
        ]
    }


@router.get("/problem-types/{pt_id}", response_model=ProblemOverviewResponse)
async def get_problem_type_detail(pt_id: str):
    """Get full overview of a problem type — all steps, thinking question, etc."""
    chainer = StepChainer()
    overview = chainer.get_problem_overview(pt_id)
    if not overview:
        raise HTTPException(status_code=404, detail=f"Problem type not found: {pt_id}")
    return overview


@router.get("/problem-types/{pt_id}/steps/{step_index}")
async def get_problem_step_form(pt_id: str, step_index: int):
    """Get the input form for a specific step in a problem type."""
    chainer = StepChainer()
    form = chainer.get_step_form(pt_id, step_index)
    if not form:
        raise HTTPException(status_code=404, detail=f"Step not found: {pt_id}/{step_index}")
    return form


# ─────────────────────────────────────────────────────────────────────
# Endpoints — Identify (Graph router, no LLM)
# ─────────────────────────────────────────────────────────────────────

class IdentifyRequest(BaseModel):
    """Student types a question, gets the problem type + input form."""
    question: str = Field(..., description="The math question text")


class IdentifyResponse(BaseModel):
    """Result of identifying a problem type from a question."""
    question: str
    best_match: Optional[Any] = None
    candidates: list = []
    problem_type: Optional[dict] = None
    variables: list = []
    extracted_values: dict = {}
    step_type_id: Optional[str] = None
    thinking: Optional[dict] = None
    error: Optional[str] = None


@router.post("/identify", response_model=IdentifyResponse)
async def identify_problem_type(req: IdentifyRequest):
    """Identify the problem type from a free-text question.

    Uses Neo4j graph fulltext search — no LLM, no embeddings.
    Routes to the best matching curriculum node and extracts values
    from the question text automatically.
    """
    from backend.ai.graph_router import route_question_graph
    # services seam injects the graph search (ai/ must not import services
    # directly — import-boundary wall, backend.harness.boundaries)
    from backend.services.graph_service import GraphService
    result = await route_question_graph(
        req.question, search_nodes=GraphService.search_nodes)

    # Build response compatible with frontend
    response = IdentifyResponse(
        question=result["question"],
        best_match=result["best_match"],
        candidates=result["candidates"],
        extracted_values=result["extracted_values"],
        step_type_id=result["step_type_id"],
        error=result["error"],
    )

    # If we have a step_type_id, get the step type info for the form
    if result["step_type_id"]:
        from backend.ai.step_types import STEP_TYPES
        step = STEP_TYPES.get(result["step_type_id"])
        if step:
            response.variables = [
                {
                    "step_index": 0,
                    "step_label": step.name,
                    "step_type_id": step.id,
                    "name": inp.name,
                    "label": inp.label,
                    "type": inp.field_type,
                    "required": inp.required,
                    "default": inp.default,
                    "placeholder": inp.placeholder,
                    "help_text": inp.help_text,
                }
                for inp in step.inputs
            ]
            response.problem_type = {
                "id": result["step_type_id"],
                "name": step.name,
                "description": step.description,
                "topic": result["best_match"]["topic"] if result["best_match"] else "",
                "class_level": result["best_match"]["class_level"] if result["best_match"] else None,
                "num_steps": 1,
                "hint": step.hint,
            }
            if step.thinking:
                response.thinking = {
                    "question": step.thinking.question,
                    "options": step.thinking.options,
                    "correct": step.thinking.correct,
                    "explanation": step.thinking.explanation,
                }

    return response


@router.get("/cache-stats")
async def cache_stats():
    """Get route cache statistics — how many questions are cached and by which source."""
    return get_cache_stats()


# ─────────────────────────────────────────────────────────────────────
# Endpoints — Solving
# ─────────────────────────────────────────────────────────────────────



# ── Display formatter: sympy-speak → student math ───────────────────────────
# Response-boundary only: never mutates solver logic, only what the student
# reads. "x**2*exp(x)" renders as "x²·exp(x)". Purely cosmetic.
_SUPERS = {c: u for c, u in zip("0123456789", "⁰¹²³⁴⁵⁶⁷⁸⁹")}


def _pretty_math(text):
    if not text or not isinstance(text, str):
        return text
    out = text
    # integer powers: x**2 -> x²
    import re as _re
    out = _re.sub(r"\*\*(\d+)", lambda m: "".join(_SUPERS[c] for c in m.group(1)), out)
    # remaining non-integer powers: x**n -> x^n
    out = out.replace("**", "^")
    out = out.replace("sqrt(", "√(")
    # word-bounded pi without backslash-dependent lookbehind breakage
    out = _re.sub(r"(?<![A-Za-z_])pi(?![A-Za-z_])", "π", out)
    out = out.replace("*", "·")
    return out


@router.post("/solve/step", response_model=SolveResponse)
def solve_single_step(req: SolveStepRequest):
    """Solve a single step (one math operation).

    DELEGATES to the unified facade — one code path for all solving.
    The facade tries backends in priority order with circuit breakers.

    plain `def` → thread pool → SymPy never blocks the event loop.

    Student provides:
    - step_type_id: which operation (e.g. "differentiate_at_point")
    - inputs: field values (e.g. {"expression": "x*sin(x)", "var": "x", "point": "1"})

    Returns:
    - answer: the result
    - steps: step-by-step explanation
    - verified: whether the answer was mathematically verified
    """
    result = _facade.solve_step(req.step_type_id, req.inputs)

    return SolveResponse(
        success=result.success,
        answer=_pretty_math(result.final_answer or None) if result.final_answer else None,
        steps=[_pretty_math(s.description) for s in result.steps],
        verified=result.verified,
        verification_msg=result.verification_msg,
        error=result.error,
    )


@router.post("/solve/problem", response_model=SolveProblemResponse)
def solve_problem(req: SolveProblemRequest):
    """Solve a full multi-step problem.

    DELEGATES to the unified facade — one code path for all solving.
    plain `def` → thread pool → SymPy never blocks the event loop.

    Student provides:
    - problem_type_id: which problem type (e.g. "max_min_optimization")
    - step_inputs: list of input dicts, one per step

    Returns:
    - final_answer: the answer from the last step
    - explanation: complete step-by-step explanation
    - all_verified: whether all steps were verified
    """
    result = _facade.solve_problem(req.problem_type_id, req.step_inputs)

    return SolveProblemResponse(
        problem_type_id=req.problem_type_id,
        success=result.success,
        final_answer=_pretty_math(result.final_answer),
        all_verified=result.verified,
        explanation=[_pretty_math(s.description) for s in result.steps],
        error=result.error,
        steps=[
            {
                "index": s.step_index,
                "label": s.description,
                "step_type": s.step_type_id,
                "answer": s.answer,
                "verified": s.verified,
                "steps": [s.description],
            }
            for s in result.steps
        ],
    )


# ─────────────────────────────────────────────────────────────────────
# Endpoint — Thinking Question Check
# ─────────────────────────────────────────────────────────────────────

class ThinkingCheckRequest(BaseModel):
    """Check a student's answer to a thinking question."""
    problem_type_id: str
    selected_answer: str


@router.post("/thinking/check")
async def check_thinking_answer(req: ThinkingCheckRequest):
    """Check if the student's thinking question answer is correct.

    If wrong, returns the correct answer and explanation.
    Never blocks — always lets the student proceed after seeing the explanation.
    """
    pt = get_problem_type(req.problem_type_id)
    if pt is None or pt.thinking is None:
        raise HTTPException(status_code=404, detail="No thinking question for this problem type")

    is_correct = req.selected_answer.strip().lower() == pt.thinking.correct.strip().lower()

    return {
        "correct": is_correct,
        "correct_answer": pt.thinking.correct if not is_correct else None,
        "explanation": pt.thinking.explanation if not is_correct else "Correct! You understand the method.",
        "proceed": True,  # always allow proceeding
    }


# ─────────────────────────────────────────────────────────────────────
# Final Solver — Pattern match + SymPy + DeepSeek fallback
# ─────────────────────────────────────────────────────────────────────

class FinalIdentifyRequest(BaseModel):
    """Student types a question, gets category + form fields."""
    question: str = Field(..., description="The math question text")
    class_level: Optional[int] = Field(None, description="Class level (10, 11, 12)")


class FinalIdentifyResponse(BaseModel):
    question: str
    category: str = ""
    path: str = ""  # "pattern", "identify", "deepseek"
    match_score: float = 0
    form_fields: list = []
    needs_student_input: bool = True
    success: bool = False
    error: str = ""


class FinalSolveRequest(BaseModel):
    """Student fills form values, gets solution."""
    question: str = Field(..., description="The original question text")
    category: str = Field(..., description="Category from identify step")
    student_values: dict = Field(..., description="Form field values from student")
    class_level: Optional[int] = Field(None)


class FinalSolveResponse(BaseModel):
    question: str
    source: str = ""  # "sympy", "generated_solver", "model_answer", "deepseek"
    success: bool = False
    steps: list = []
    worked_solution: str = ""
    error: str = ""
    matched_question: str = ""
    match_score: float = 0


@router.post("/final/identify", response_model=FinalIdentifyResponse)
async def final_identify(req: FinalIdentifyRequest):
    """Step 1: Student types a question.

    Returns the category and form fields the student needs to fill.
    Does NOT compute anything yet.

    Routing:
    1. Pattern store (exact normalized match — instant)
    2. Category detection from question text (regex — instant)
    3. MiniLM match to question bank (loads model — ~10s first time)
    4. DeepSeek identifies category (API call — only for genuinely unseen types)
    """
    from backend.ai.final_solver import identify_question
    # Run in a worker thread: the final-solver stack internally calls
    # asyncio.run() (llm_extractor), which raises "cannot be called from
    # a running event loop" when executed on the endpoint's loop — and it
    # otherwise blocks the loop for seconds (model loading).
    import asyncio as _asyncio

    result = await _asyncio.to_thread(
        identify_question, req.question, class_level=req.class_level
    )

    return FinalIdentifyResponse(
        question=req.question,
        category=result.category,
        path=result.path or "identify",
        match_score=result.match_score,
        form_fields=result.form_fields,
        needs_student_input=result.needs_student_input,
        success=result.success,
        error=result.error,
    )


@router.post("/final/solve", response_model=FinalSolveResponse)
async def final_solve(req: FinalSolveRequest):
    """Step 2: Student fills form values, gets solution.

    Routing:
    1. SymPy computes (with 10s timeout)
    2. Generated solver store (DeepSeek wrote a solver for this pattern before)
    3. Model answer from matched question (only if exact values match)
    4. DeepSeek solves + generates solver for future (last resort)
    """
    from backend.ai.final_solver import compute_solution
    # Worker thread — see final_identify above (nested asyncio.run + loop blocking).
    import asyncio as _asyncio

    result = await _asyncio.to_thread(
        compute_solution,
        req.question, req.category, req.student_values,
        class_level=req.class_level,
    )

    return FinalSolveResponse(
        question=req.question,
        source=result.source,
        success=result.success,
        steps=[
            {
                "step": s.step_num,
                "description": s.description,
                "operation": s.operation,
                "result": s.result,
                "success": s.success,
                "marks": s.marks,
            }
            for s in result.steps
        ],
        worked_solution=result.worked_solution,
        error=result.error,
        matched_question=result.matched_question_text,
        match_score=result.match_score,
    )


# ═══════════════════════════════════════════════════════════════════
# UNIFIED FACADE ENDPOINTS — the official interface going forward.
# These normalize ALL solver systems behind one contract.
# The legacy endpoints above now DELEGATE to the same facade —
# one code path, zero duplication.
# ═══════════════════════════════════════════════════════════════════

class FacadeSolveStepRequest(BaseModel):
    """Unified step solve request."""
    step_type_id: str = Field(..., description="Step type ID")
    inputs: dict = Field(..., description="Input field values")
    subject: str = Field("", description="Optional subject filter")
    class_level: str = Field("", description="Optional class filter")


class FacadeSolveProblemRequest(BaseModel):
    """Unified multi-step problem solve request."""
    problem_type_id: str = Field(..., description="Problem type ID")
    step_inputs: list = Field(..., description="List of input dicts, one per step")
    subject: str = Field("", description="Optional subject filter")
    class_level: str = Field("", description="Optional class filter")


class FacadeSolveFreeTextRequest(BaseModel):
    """Unified free-text solve request with fallback chain."""
    question: str = Field(..., min_length=1, max_length=5000, description="Free-text problem")
    subject: str = Field("", max_length=50, description="Optional subject")
    class_level: str = Field("", max_length=20, description="Optional class level")
    category: str = Field("", max_length=100, description="Optional category (solver_v2)")


class FacadeIdentifyRequest(BaseModel):
    """Unified identify request."""
    question: str = Field(..., min_length=1, max_length=5000, description="The question text")
    class_level: str = Field("", max_length=20, description="Optional class level")


class DeterministicSolveRequest(BaseModel):
    """Question for the no-LLM truth-core endpoint."""
    question: str = Field(..., min_length=1, max_length=5000)
    subject: str = Field("", max_length=50)
    class_level: str = Field("", max_length=20)
    board: str = Field("", max_length=20)


@router.post("/v2/solve/step")
def facade_solve_step(req: FacadeSolveStepRequest):
    """UNIFIED: Solve one structured step. Tries backends in priority order.

    Returns the canonical SolutionResult contract — same shape regardless
    of which backend handled it. Never raises; errors are in the response.

    Repeat solves (same inputs) are served INSTANTLY from the solution
    cache — no SymPy recompute.

    NOTE: plain `def` (not async) — FastAPI runs this in a thread pool,
    so SymPy computation never blocks the event loop. Critical for
    concurrent load: one slow solve must never stall other requests.
    """
    import time as _time
    _t0 = _time.perf_counter()
    from backend.services.solution_cache import cached_solve_step
    result = cached_solve_step(
        req.step_type_id, req.inputs,
        subject=req.subject, class_level=req.class_level,
    )
    try:
        from backend.services.metrics import record_solver_call
        record_solver_call(
            endpoint="/v2/solve/step",
            backend_used=result.get("backend_used", "unknown"),
            cache_hit=result.get("cache_hit", False),
            success=result.get("success", False),
            duration_s=_time.perf_counter() - _t0,
        )
    except Exception:
        pass
    return result


@router.post("/v2/solve/problem")
def facade_solve_problem(req: FacadeSolveProblemRequest):
    """UNIFIED: Solve a multi-step problem with the full chain.

    plain `def` → thread pool → event loop never blocked by SymPy.
    """
    import time as _time
    _t0 = _time.perf_counter()
    result = _facade.solve_problem(
        req.problem_type_id, req.step_inputs,
        subject=req.subject, class_level=req.class_level,
    )
    try:
        from backend.services.metrics import record_solver_call
        record_solver_call(
            endpoint="/v2/solve/problem",
            backend_used=result.backend_used or "unknown",
            cache_hit=False,
            success=result.success,
            duration_s=_time.perf_counter() - _t0,
        )
    except Exception:
        pass
    return result.model_dump()


@router.post("/v2/solve/free-text")
def facade_solve_free_text(req: FacadeSolveFreeTextRequest):
    """UNIFIED: Solve free text with the full fallback chain.

    Chain: pattern_solver → step_chainer → solver_v2 → jee_neet → pipeline.
    Each backend has a circuit breaker; failures are isolated.

    A deadline of 10s (configurable via FREE_TEXT_TIMEOUT_S env var) stops
    the fallback chain early so no single request takes more than ~10s.

    plain `def` → thread pool → event loop never blocked.
    """
    import os
    import time as _time
    _t0 = _time.perf_counter()
    _deadline = float(os.environ.get("FREE_TEXT_TIMEOUT_S", "10"))
    result = _facade.solve_free_text(
        req.question,
        subject=req.subject, class_level=req.class_level,
        category=req.category,
        deadline_s=_deadline,
    )
    try:
        from backend.services.metrics import record_solver_call
        record_solver_call(
            endpoint="/v2/solve/free-text",
            backend_used=result.backend_used or "unknown",
            cache_hit=False,
            success=result.success,
            duration_s=_time.perf_counter() - _t0,
        )
    except Exception:
        pass
    return result.model_dump()


@router.post("/v2/identify")
def facade_identify(req: FacadeIdentifyRequest):
    """UNIFIED: Identify a question → category + form fields.

    Returns IdentifyResult contract. success=True when the student can
    proceed (category + form fields extracted, even if input is needed).

    A timeout of 15s (configurable via IDENTIFY_TIMEOUT_S env var) prevents
    the first-call ML model load (~19s) from hanging a request. On timeout
    we return a graceful failure so the student can retry (the model will
    be loaded by then).

    plain `def` → thread pool (first call may load an ML model, ~10s —
    must not block the loop).
    """
    import os
    from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeoutError
    _timeout = float(os.environ.get("IDENTIFY_TIMEOUT_S", "15"))
    try:
        with ThreadPoolExecutor(max_workers=1) as ex:
            future = ex.submit(_facade.identify, req.question, class_level=req.class_level)
            result = future.result(timeout=_timeout)
    except FuturesTimeoutError:
        from backend.contracts import IdentifyResult
        result = IdentifyResult(
            success=False,
            error=f"identify timed out after {_timeout}s (model may still be loading — please retry)",
            error_code="IDENTIFY_TIMEOUT",
            question=req.question,
            elapsed_ms=int(_timeout * 1000),
        )
    return result.model_dump()


@router.post("/v3/deterministic")
def deterministic_solve(req: DeterministicSolveRequest):
    """Official deterministic-only end-to-end solve endpoint.

    The answer pipeline is allowed to return a final answer only when its
    verification gates pass. Guided, ambiguous, and unsupported questions
    never carry an answer. No LLM fallback is reachable from this endpoint.

    ISOLATION (2026-09-30 wedge fix): plain `def` keeps this off the event
    loop, but a cold lane (graph/MiniLM/spacy lazy loads, unbounded CAS)
    could still hold a shared-threadpool thread for ~47 min. The solve now
    runs on the dedicated bounded pool under a hard budget
    (SOLVE_BUDGET_S, default 60s): past the budget the endpoint returns an
    honest guided_practice payload (method content, answer withheld) while
    the compute finishes in the background and is cached for the retry.
    """
    import os

    from backend.services.solver_gateway import solve_deterministically
    from backend.services.solve_isolation import (
        GUIDED_METHOD_STEPS, cache_key, run_sync, saturation_refusal_reason,
        timeout_refusal_reason,
    )

    # TELEMETRY: bind subject/class BEFORE the pool submit so the copied
    # context reaches answer()'s record_solve (was null on every row).
    from backend.services.answer_telemetry import bind as _tel_bind
    _tel_bind(subject=req.subject, class_level=req.class_level,
              surface="solver/v3-deterministic")
    key = cache_key("solver.v3deterministic",
                    f"{req.question}|{req.subject}|{req.class_level}|{req.board}")
    iso = run_sync(key, solve_deterministically, req.question,
                   subject=req.subject, class_level=req.class_level,
                   board=req.board)

    if iso.timed_out or iso.saturated:
        budget_s = float(os.environ.get("SOLVE_BUDGET_S", "60"))
        reason = (timeout_refusal_reason(budget_s) if iso.timed_out
                  else saturation_refusal_reason())
        route = ["solve:budget_exceeded" if iso.timed_out
                 else "solve:pool_saturated"]
        try:
            from backend.services.solver_gateway import (SolverOutcome,
                                                     SolverStatus,
                                                     emit_solver_metrics)
            emit_solver_metrics(SolverOutcome(
                status=SolverStatus.GUIDED_PRACTICE,
                steps=list(GUIDED_METHOD_STEPS),
                route=route, llm_used=False,
                latency_ms=iso.elapsed_ms,
                refusal_reason=reason,
            ), lane="deterministic", subject=req.subject,
                class_level=req.class_level, board=req.board)
        except Exception:
            pass
        return {
            "status": "guided_practice",
            "answer": None,
            "steps": list(GUIDED_METHOD_STEPS),
            "verification": {"verified": False,
                             "label": "SOLVE_BUDGET_EXCEEDED"
                             if iso.timed_out else "SOLVER_BUSY",
                             "gates_passed": [], "anchor": None},
            "audit": {"route": route, "gates_passed": []},
            "llm_used": False,
            "solver_version": _v3_solver_version(),
            "subject": req.subject,
            "class_level": req.class_level,
            "board": req.board,
            "elapsed_ms": round(iso.elapsed_ms),
            "refusal_reason": reason,
            "budget_exceeded": iso.timed_out,
            "cached": False,
            "answer_label": "NONE",
        }

    payload = iso.result
    if isinstance(payload, dict):
        payload = dict(payload)  # don't mutate the cached object
        payload.setdefault("cached", bool(iso.cached))
        # U-LANE LABEL (Layer U2): the one honesty enum mapped from the
        # pipeline verdict — VERIFIED* tier answers VERIFIED; anything
        # else that ships carries the honest mapping (answer-less
        # outcomes stamp NONE)
        try:
            from backend.services.answer_lane import AnswerLabel, stamp
            _plabel = str((payload.get("verification") or {}).get("label")
                          or (payload.get("audit") or {}).get("label") or "")
            _lbl = (AnswerLabel.VERIFIED
                    if _plabel.startswith("VERIFIED")
                    else AnswerLabel.NONE)
            if _lbl is not AnswerLabel.NONE and payload.get("answer"):
                stamp(payload, "v2_solve", _lbl, _plabel)
        except Exception:
            pass
    return payload


def _v3_solver_version() -> str:
    try:
        from backend.services.solver_gateway import SOLVER_VERSION
        return SOLVER_VERSION
    except Exception:
        return "dev"


@router.get("/v2/problem-types")
async def facade_problem_types(topic: Optional[str] = None):
    """UNIFIED: List problem types (lightweight)."""
    return {"problem_types": _facade.get_problem_types(topic or "")}


@router.get("/v2/health")
def facade_health():
    """UNIFIED: Facade health — shows all backends and circuit states.

    plain `def` → thread pool: the first call can lazily build the solver
    facade (registry load). An async def here blocked the event loop and,
    under a cold facade, wedged the whole worker (2026-09-29 incident)."""
    health = _facade.health()
    # Include the process-pool routing state (adaptive solve routing)
    try:
        from backend.services.process_solver_pool import pool_status
        health["process_pool"] = pool_status()
    except Exception:
        health["process_pool"] = {"mode": "unavailable"}
    return health


# ═══════════════════════════════════════════════════════════════════
# HINT LADDER — progressive scaffolding (student-friendliness core)
# ═══════════════════════════════════════════════════════════════════

class WrongAnswerRequest(BaseModel):
    """Student submitted a wrong answer — return the next hint rung."""
    step_type_id: str = Field(..., description="The step/problem they were solving")
    inputs: dict = Field(..., description="The original inputs")
    student_answer: str = Field(..., description="What the student answered")
    hints_used: int = Field(0, description="How many hints already given (0-3)")


class ShowAnotherRequest(BaseModel):
    """Same problem type, new numbers — infinite practice."""
    step_type_id: str = Field(..., description="Step type to vary")
    inputs: dict = Field(..., description="Original inputs")
    seed: int = Field(0, description="Deterministic seed (same seed = same variant)")


@router.post("/v2/hint")
def hint_ladder_endpoint(req: WrongAnswerRequest):
    """HINT LADDER: Wrong answer → misconception-aware next hint.

    4 rungs, escalating help, escalating XP cost:
      1. nudge (free)   — direction, misconception-targeted if detected
      2. formula (-5)   — which formula/strategy applies
      3. worked (-10)   — first step fully worked
      4. solution (-20) — complete solution

    Detects sign errors, magnitude errors (10x/100x), reciprocal errors,
    and missing units from the wrong answer shape.

    plain `def` → thread pool (solves the step to build hints).
    """
    from backend.services.hint_ladder import handle_wrong_answer

    # Solve the step (served from cache on repeat)
    result = _facade.solve_step(req.step_type_id, req.inputs)
    if not result.success:
        return {
            "correct": False,
            "error": "Could not solve the underlying step to build hints",
            "hint": None,
        }

    return handle_wrong_answer(
        req.student_answer, result, hints_used=req.hints_used
    )


@router.post("/v2/show-another")
def show_another_endpoint(req: ShowAnotherRequest):
    """SHOW ME ANOTHER: same problem structure, new numbers.

    Turns 183 problem types into infinite practice. Deterministic
    per seed so teachers can regenerate identical variants.

    plain `def` → thread pool (solves the variant).
    """
    from backend.services.hint_ladder import vary_inputs

    new_inputs = vary_inputs(req.inputs, seed=req.seed)
    result = _facade.solve_step(req.step_type_id, new_inputs)
    return {
        "step_type_id": req.step_type_id,
        "inputs": new_inputs,
        "solved": result.success,
        "answer": result.final_answer if result.success else None,
        "verified": result.verified,
        # Answer is included so the client can self-check the student later
    }


# ═══════════════════════════════════════════════════════════════════
# INTELLIGENCE LOOP — the feedback queries (loop is CLOSED)
# ═══════════════════════════════════════════════════════════════════

@router.get("/v2/intelligence")
async def intelligence_snapshot():
    """LIVE intelligence state — the closed loop, queryable.

    Every solve and hint feeds this. Returns:
    - concept_gaps: concepts where students collectively struggle
    - top_misconceptions: most common error patterns
    - needs_remediation: per-student struggling concepts

    The tutor/quiz flow consumes this to pick what to teach next.
    """
    from backend.services.intelligence_bus import get_intelligence
    _, state = get_intelligence()
    return state.snapshot()


@router.get("/v2/intelligence/remediation/{student_id}")
async def intelligence_remediation(
    student_id: str,
    scoped_student_id: str = Depends(require_self_or_staff),
):
    """Concepts this student is struggling with → what to remediate.

    Ownership-guarded (B16 pattern): staff, or the student themselves.
    """
    from backend.services.intelligence_bus import get_intelligence
    _, state = get_intelligence()
    concepts = state.needs_remediation(scoped_student_id)
    s = state.students.get(scoped_student_id)
    return {
        "student_id": scoped_student_id,
        "needs_remediation": concepts,
        "misconceptions": dict(s.misconceptions) if s else {},
        "attempts": s.attempts if s else 0,
        "accuracy": (s.correct / s.attempts) if s and s.attempts else 0.0,
    }
