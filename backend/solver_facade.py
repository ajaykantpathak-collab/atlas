r"""Unified Solver Facade — ONE entry point for all solving.

This is THE interface the rest of the app uses. Every call goes through
the facade, which routes to the best solver via the registry, normalizes
every result to the canonical SolutionResult contract, and never raises.

ARCHITECTURE:

    facade = SolverFacade()                    # singleton
    result = facade.solve_step(...)            # structured step solve
    result = facade.solve_problem(...)         # multi-step chain
    result = facade.solve_free_text(...)       # free-text (router chain)
    result = facade.identify(...)              # match question → problem type

    ALL return SolutionResult / IdentifyResult from backend.contracts.
    NEVER raises. Errors are data (result.success=False, result.error).

FALLBACK CHAIN (try in order, first success wins):
    1. pattern_solver       — instant, deterministic, known patterns
    2. step_chainer         — structured math (SymPy), student-input
    3. solver_v2            — physics/chem/accounts/applied
    4. subject_solver       — 150+ subject-specific files
    5. jee_neet_solver      — decomposition for JEE/NEET
    6. solver_router        — full pipeline (LLM last resort)

Each backend is wrapped in a circuit breaker: if it fails N times in a
row, it's skipped for a cooldown period. Failures are isolated.

REGISTRATION:
    Each backend registers with capabilities. The facade queries the
    registry instead of hardcoding if/else chains:

        @register(backend_id="step_chainer", tier=SolverTier.STRUCTURED,
                  subjects={"maths"}, class_levels={"6","7",...,"12"},
                  supports_step_solve=True)
        class StepChainerBackend(SolverBackend): ...
"""

from __future__ import annotations

import logging
import time
import threading
from typing import Callable, Optional, Type

from backend.contracts import (
    IdentifyResult,
    InputField,
    ProblemType,
    ProblemTypeMatch,
    SolutionResult,
    SolutionStep,
    SolverTier,
    StepForm,
)

logger = logging.getLogger(__name__)

# ═══════════════════════════════════════════════════════════════════
# Truth-contract exit helpers (WSA-P5, 2026-10-10)
# ═══════════════════════════════════════════════════════════════════

#: Honest method-only label for unverified work. Labeling, NOT gating —
#: no verifier is invented at the facade; `verified` rides only when the
#: winning backend actually verified (step_chainer symbolic check /
#: chain all-verified).
_METHOD_ONLY_MSG = ("Method shown — this result was not independently "
                    "verified, so treat it as a worked approach.")


def _scrub_str(text):
    """Slop-scrub one student-facing string (fail-open, same law as the
    answer() choke point: a broken gate never breaks the solve)."""
    if not isinstance(text, str) or not text:
        return text
    try:
        from backend.its.solver.slop_gate import gate_text
        cleaned, _flags = gate_text(text)
        return cleaned
    except Exception:
        return text


def _typed_backend_error(backend_id: str, exc: BaseException) -> str:
    """Student-safe fallback for a backend crash: nothing from the
    exception text (paths, queries, internals) reaches the student. The
    raw failure is logged (operator-facing) and the machine code rides in
    the separate ``error_code`` field."""
    try:
        logger.warning("solver backend %s failed: %s: %s",
                       backend_id, type(exc).__name__, exc)
    except Exception:
        pass
    return ("This solver could not complete the request. Try again, or "
            "approach the question with a different method.")


def _finalize_result(result: SolutionResult) -> SolutionResult:
    """THE honest exit for every facade solve (WSA-P5).

    Scrubs the student-facing strings (final_answer, step descriptions,
    error, verification messages) through the slop gate — fail-open — and
    normalizes the truth label: ``verified`` stays True only when the
    winning backend actually verified; everything else ships a
    method-only ``verification_msg``. This is labeling, not gating: the
    /solver page is a structured practice surface, and no verifier is
    invented here."""
    try:
        result.final_answer = _scrub_str(result.final_answer)
        result.error = _scrub_str(result.error)
        result.verification_msg = _scrub_str(result.verification_msg)
        result.next_step_suggestion = _scrub_str(result.next_step_suggestion)
        result.verified = bool(result.verified)
        if not result.verified and not result.verification_msg.strip():
            result.verification_msg = _METHOD_ONLY_MSG
        for step in (result.steps or []):
            step.description = _scrub_str(step.description)
            step.answer = _scrub_str(step.answer)
            step.verification_msg = _scrub_str(step.verification_msg)
    except Exception:
        pass
    return result


def _finalize_identify(result: IdentifyResult) -> IdentifyResult:
    """Identify twin of _finalize_result: scrub the student-facing
    strings (error, matched names, form labels). Fail-open."""
    try:
        result.error = _scrub_str(result.error)
        for match in (result.matches or []):
            match.name = _scrub_str(match.name)
        if result.best_match is not None:
            result.best_match.name = _scrub_str(result.best_match.name)
        for field in (result.form_fields or []):
            field.label = _scrub_str(field.label)
            field.placeholder = _scrub_str(field.placeholder)
    except Exception:
        pass
    return result


# ═══════════════════════════════════════════════════════════════════
# Circuit Breaker
# ═══════════════════════════════════════════════════════════════════

# Prometheus gauge labels for breaker state (0=closed, 1=open, 2=half-open).
# Imported lazily so this module remains importable even if metrics.py is
# unavailable (e.g. in minimal test environments).
def _breaker_gauge():
    try:
        from backend.services.metrics import CIRCUIT_BREAKER_STATE
        return CIRCUIT_BREAKER_STATE
    except Exception:
        return None


class CircuitBreaker:
    """Trip after N consecutive failures; skip for cooldown seconds.

    States (mirrored to the ``circuit_breaker_state`` Prometheus gauge):
        0 = closed      — healthy, accepting calls
        1 = open        — tripped, within cooldown window
        2 = half-open   — cooldown expired, next call is a recovery probe
    """

    def __init__(self, failure_threshold: int = 3, cooldown_seconds: float = 60.0,
                 backend_id: str = ""):
        self.failure_threshold = failure_threshold
        self.cooldown_seconds = cooldown_seconds
        self.backend_id = backend_id
        self._consecutive_failures = 0
        self._tripped_until = 0.0
        self._was_tripped = False  # tracks half-open: tripped before, not yet recovered
        self._lock = threading.Lock()
        # Initialize the gauge to closed for this backend.
        self._emit_state(0)

    @property
    def is_open(self) -> bool:
        open_now = time.time() < self._tripped_until
        if not open_now and self._was_tripped:
            # Cooldown expired but recovery not yet confirmed -> half-open.
            # Idempotent set; Prometheus gauges handle repeated same-value sets.
            self._emit_state(2)
        return open_now

    @property
    def state(self) -> int:
        """0=closed, 1=open, 2=half-open."""
        if self.is_open:
            return 1
        if self._was_tripped:
            return 2
        return 0

    def _emit_state(self, value: int) -> None:
        g = _breaker_gauge()
        if g is None or not self.backend_id:
            return
        try:
            g.labels(backend=self.backend_id).set(value)
        except Exception:
            pass

    def record_success(self) -> None:
        with self._lock:
            self._consecutive_failures = 0
            recovered = self._was_tripped
            self._was_tripped = False
        if recovered:
            self._emit_state(0)  # half-open -> closed

    def record_failure(self) -> None:
        with self._lock:
            self._consecutive_failures += 1
            tripped_now = False
            if self._consecutive_failures >= self.failure_threshold:
                self._tripped_until = time.time() + self.cooldown_seconds
                self._consecutive_failures = 0
                self._was_tripped = True
                tripped_now = True
        if tripped_now:
            self._emit_state(1)  # -> open

    def reset(self) -> None:
        with self._lock:
            self._consecutive_failures = 0
            self._tripped_until = 0.0
            self._was_tripped = False
        self._emit_state(0)

    def mark_probe(self) -> None:
        """Call when a request is allowed through after cooldown expired.

        Promotes the breaker from open to half-open in the gauge so operators
        can see a probe is in flight. (The breaker itself already allows the
        call because ``is_open`` is False once cooldown expires.)
        """
        with self._lock:
            if self._was_tripped and not self.is_open:
                self._emit_state(2)


# ═══════════════════════════════════════════════════════════════════
# Backend Protocol + Registry
# ═══════════════════════════════════════════════════════════════════

class SolverBackend:
    """Base class — each solver system adapts to this."""

    backend_id: str = "unknown"
    tier: SolverTier = SolverTier.DETERMINISTIC
    subjects: set[str] = set()          # empty = all subjects
    class_levels: set[str] = set()      # empty = all levels
    priority: int = 100                 # lower = tried earlier

    def can_handle(self, subject: str = "", class_level: str = "",
                   problem_type_id: str = "") -> bool:
        if self.subjects and subject and subject not in self.subjects:
            return False
        if self.class_levels and class_level and class_level not in self.class_levels:
            return False
        return True

    def solve_step(self, step_type_id: str, inputs: dict) -> SolutionResult:
        raise NotImplementedError

    def solve_problem(self, problem_type_id: str, step_inputs: list) -> SolutionResult:
        raise NotImplementedError

    def solve_free_text(self, problem_text: str, **kwargs) -> SolutionResult:
        raise NotImplementedError


_REGISTRY: list[SolverBackend] = []
_REGISTRY_LOCK = threading.Lock()


def register(backend_cls: Type[SolverBackend]) -> Type[SolverBackend]:
    """Class decorator: @register — adds backend to the registry."""
    with _REGISTRY_LOCK:
        _REGISTRY.append(backend_cls())
        _REGISTRY.sort(key=lambda b: b.priority)
    return backend_cls


def get_registry() -> list[SolverBackend]:
    return list(_REGISTRY)


# ═══════════════════════════════════════════════════════════════════
# Adapters — one per existing solver system
# ═══════════════════════════════════════════════════════════════════

@register
class PatternSolverBackend(SolverBackend):
    """ai/pattern_solver.py — instant deterministic pattern match."""

    backend_id = "pattern_solver"
    tier = SolverTier.PATTERN
    priority = 10  # fastest, try first

    def __init__(self):
        self._solver = None
        self.breaker = CircuitBreaker(backend_id=self.backend_id)

    def _get_solver(self):
        if self._solver is None:
            from backend.ai.pattern_solver import solve
            self._solver = solve
        return self._solver

    def solve_free_text(self, problem_text: str, **kwargs) -> SolutionResult:
        if self.breaker.is_open:
            return SolutionResult(success=False, error="circuit open",
                                  error_code="CIRCUIT_OPEN",
                                  solver_tier=self.tier)
        try:
            solve = self._get_solver()
            raw = solve(problem_text)
            if raw is None:
                self.breaker.record_success()
                return SolutionResult(success=False, error="no pattern match",
                                      error_code="NO_MATCH",
                                      solver_tier=self.tier)
            self.breaker.record_success()
            return SolutionResult(
                success=True,
                final_answer=str(raw.answer),
                steps=[SolutionStep(step_index=i, description=s)
                       for i, s in enumerate(raw.steps, 1)],
                strategy_used=raw.question_type,
                solver_tier=self.tier,
                solver_path=[self.backend_id],
            )
        except Exception as e:
            self.breaker.record_failure()
            return SolutionResult(success=False,
                                  error=_typed_backend_error(self.backend_id, e),
                                  error_code="BACKEND_ERROR",
                                  solver_tier=self.tier)


@register
class StepChainerBackend(SolverBackend):
    """ai/step_chainer.py — structured SymPy math with student input."""

    backend_id = "step_chainer"
    tier = SolverTier.STRUCTURED
    priority = 20
    subjects = {"maths", "physics", "chemistry"}

    def __init__(self):
        self._chainer = None
        self.breaker = CircuitBreaker(backend_id=self.backend_id)

    def _get_chainer(self):
        if self._chainer is None:
            from backend.ai.step_chainer import StepChainer
            self._chainer = StepChainer(timeout=15)
        return self._chainer

    def solve_step(self, step_type_id: str, inputs: dict) -> SolutionResult:
        if self.breaker.is_open:
            return SolutionResult(success=False, error="circuit open",
                                  error_code="CIRCUIT_OPEN",
                                  solver_tier=self.tier)
        try:
            chainer = self._get_chainer()
            exec = chainer.solve_single_step(step_type_id, inputs)
            r = exec.result
            self.breaker.record_success()
            return SolutionResult(
                success=r.success,
                final_answer=r.answer or "",
                answer_raw=str(r.answer_raw) if r.answer_raw is not None else None,
                steps=[SolutionStep(step_index=i, description=s)
                       for i, s in enumerate(r.steps, 1)],
                verified=r.verified,
                verification_msg=r.verification_msg,
                error=r.error,
                solver_tier=self.tier,
                solver_path=[self.backend_id],
                next_step_suggestion=r.next_step_suggestion,
            )
        except Exception as e:
            self.breaker.record_failure()
            return SolutionResult(success=False,
                                  error=_typed_backend_error(self.backend_id, e),
                                  error_code="BACKEND_ERROR",
                                  solver_tier=self.tier)

    def solve_problem(self, problem_type_id: str, step_inputs: list) -> SolutionResult:
        if self.breaker.is_open:
            return SolutionResult(success=False, error="circuit open",
                                  error_code="CIRCUIT_OPEN",
                                  solver_tier=self.tier)
        try:
            chainer = self._get_chainer()
            chain = chainer.solve_problem(problem_type_id, step_inputs)
            self.breaker.record_success()
            steps = []
            for i, se in enumerate(chain.steps, 1):
                r = se.result
                steps.append(SolutionStep(
                    step_index=i,
                    step_type_id=se.step_type_id,
                    description=se.label,
                    answer=r.answer or "",
                    success=r.success,
                    verified=r.verified,
                    verification_msg=r.verification_msg,
                ))
            return SolutionResult(
                success=chain.success,
                problem_type_id=problem_type_id,
                final_answer=chain.final_answer,
                steps=steps,
                verified=chain.all_verified,
                error=chain.error,
                solver_tier=self.tier,
                solver_path=[self.backend_id],
            )
        except Exception as e:
            self.breaker.record_failure()
            return SolutionResult(success=False,
                                  error=_typed_backend_error(self.backend_id, e),
                                  error_code="BACKEND_ERROR",
                                  solver_tier=self.tier)


@register
class SolverV2Backend(SolverBackend):
    """services/solver_v2.py — physics/chem/accounts/applied maths."""

    backend_id = "solver_v2"
    tier = SolverTier.DETERMINISTIC
    priority = 30
    subjects = {"physics", "chemistry", "accounts", "econ"}

    def __init__(self):
        self._solver = None
        self.breaker = CircuitBreaker(backend_id=self.backend_id)

    def _get_solver(self):
        if self._solver is None:
            from backend.services.solver_v2 import SolverV2
            self._solver = SolverV2()
        return self._solver

    def solve_free_text(self, problem_text: str, category: str = "",
                        values: dict | None = None, **kwargs) -> SolutionResult:
        if not category:
            return SolutionResult(success=False, error="no category",
                                  error_code="NO_CATEGORY",
                                  solver_tier=self.tier)
        if self.breaker.is_open:
            return SolutionResult(success=False, error="circuit open",
                                  error_code="CIRCUIT_OPEN",
                                  solver_tier=self.tier)
        try:
            solver = self._get_solver()
            r = solver.solve(category=category, values=values or {})
            self.breaker.record_success()
            steps = [SolutionStep(
                step_index=i,
                description=s.description,
                formula=s.formula,
                computation=s.computation,
                answer=s.answer,
                success=s.success,
            ) for i, s in enumerate(r.steps, 1)]
            return SolutionResult(
                success=r.success,
                question=r.question,
                steps=steps,
                error=r.error,
                final_answer=r.final_answer,
                strategy_used=category,
                solver_tier=self.tier,
                solver_path=[self.backend_id],
            )
        except Exception as e:
            self.breaker.record_failure()
            return SolutionResult(success=False,
                                  error=_typed_backend_error(self.backend_id, e),
                                  error_code="BACKEND_ERROR",
                                  solver_tier=self.tier)


@register
class JEENEETBackend(SolverBackend):
    """services/jee_neet_solver.py — decomposition solver for JEE/NEET."""

    backend_id = "jee_neet_solver"
    tier = SolverTier.COMPETENCY
    priority = 40
    subjects = {"physics", "chemistry", "maths", "biology"}

    def __init__(self):
        self._solver = None
        self.breaker = CircuitBreaker(backend_id=self.backend_id)

    def _get_solver(self):
        if self._solver is None:
            from backend.services.jee_neet_solver import JEENEETSolver
            self._solver = JEENEETSolver()
        return self._solver

    def solve_free_text(self, problem_text: str, subject: str = "",
                        **kwargs) -> SolutionResult:
        if self.breaker.is_open:
            return SolutionResult(success=False, error="circuit open",
                                  error_code="CIRCUIT_OPEN",
                                  solver_tier=self.tier)
        try:
            solver = self._get_solver()
            r = solver.solve(problem_text, subject=subject or None)
            self.breaker.record_success()
            steps = [SolutionStep(
                step_index=i,
                description=str(s.get("description", "")),
                answer=str(s.get("result", "")),
                success=bool(s.get("success", True)),
            ) for i, s in enumerate(r.sub_solutions, 1)]
            return SolutionResult(
                success=r.solved,
                question=r.problem_text,
                steps=steps,
                final_answer=r.final_answer,
                error=r.error,
                strategy_used=", ".join(r.strategies_used),
                solver_tier=self.tier,
                solver_path=[self.backend_id],
            )
        except Exception as e:
            self.breaker.record_failure()
            return SolutionResult(success=False,
                                  error=_typed_backend_error(self.backend_id, e),
                                  error_code="BACKEND_ERROR",
                                  solver_tier=self.tier)


@register
class PipelineBackend(SolverBackend):
    """services/solver_router.py — full pipeline (LLM last resort)."""

    backend_id = "solver_router"
    tier = SolverTier.LLM_FALLBACK
    priority = 90  # last resort

    def __init__(self):
        self._router = None
        self.breaker = CircuitBreaker(failure_threshold=2, cooldown_seconds=120,
                                      backend_id=self.backend_id)

    def _get_router(self):
        if self._router is None:
            from backend.services.solver_router import SolverRouter
            self._router = SolverRouter()
        return self._router

    def solve_free_text(self, problem_text: str, **kwargs) -> SolutionResult:
        if self.breaker.is_open:
            return SolutionResult(success=False, error="circuit open",
                                  error_code="CIRCUIT_OPEN",
                                  solver_tier=self.tier)
        try:
            router = self._get_router()
            pr = router.solve(problem_text, **kwargs)
            p = pr.problem
            self.breaker.record_success()
            steps = [SolutionStep(
                step_index=i,
                description=str(getattr(s, "description", "") or s),
                answer=str(getattr(s, "result", getattr(s, "answer", "")) or ""),
            ) for i, s in enumerate(p.steps or [], 1)]
            return SolutionResult(
                success=p.solved,
                question=problem_text,
                steps=steps,
                final_answer=p.final_answer or "",
                error=p.error,
                strategy_used=p.backend_used,
                solver_tier=self.tier,
                solver_path=pr.pipeline_stages,
                elapsed_ms=int(pr.solve_time_ms),
            )
        except Exception as e:
            self.breaker.record_failure()
            return SolutionResult(success=False,
                                  error=_typed_backend_error(self.backend_id, e),
                                  error_code="BACKEND_ERROR",
                                  solver_tier=self.tier)


# ═══════════════════════════════════════════════════════════════════
# THE FACADE
# ═══════════════════════════════════════════════════════════════════

class SolverFacade:
    """ONE entry point. Thread-safe singleton."""

    _instance: Optional["SolverFacade"] = None
    _instance_lock = threading.Lock()

    def __new__(cls) -> "SolverFacade":
        if cls._instance is None:
            with cls._instance_lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance

    # ── Structured step solve ────────────────────────────────────
    def solve_step(self, step_type_id: str, inputs: dict,
                   subject: str = "", class_level: str = "",
                   student_id: str = "") -> SolutionResult:
        """Solve one structured step. Tries backends that support it.

        Emits a solve event to the intelligence bus (closes the loop).
        """
        import time as _t
        start = _t.time()
        tried = []
        result = None
        for backend in get_registry():
            if not backend.can_handle(subject, class_level):
                continue
            if not hasattr(backend, "solve_step") or \
               type(backend).solve_step is SolverBackend.solve_step:
                continue
            tried.append(backend.backend_id)
            try:
                result = backend.solve_step(step_type_id, inputs)
            except Exception as e:
                # the facade NEVER raises (its own contract) — a backend
                # crash becomes typed data with error_code intact
                if hasattr(backend, "breaker"):
                    try:
                        backend.breaker.record_failure()
                    except Exception:
                        pass
                result = SolutionResult(
                    success=False,
                    error=_typed_backend_error(backend.backend_id, e),
                    error_code="BACKEND_ERROR",
                    solver_tier=getattr(backend, "tier", SolverTier.DETERMINISTIC))
            if not isinstance(result, SolutionResult):
                # rogue backend shape — coerce, never raise out of here
                result = SolutionResult(
                    success=False,
                    error="This solver returned an unreadable result.",
                    error_code="BACKEND_ERROR",
                    solver_tier=getattr(backend, "tier", SolverTier.DETERMINISTIC))
            result.solver_path = tried
            result.problem_type_id = step_type_id
            if result.success:
                break
        if result is None:
            result = SolutionResult(
                success=False,
                problem_type_id=step_type_id,
                error=f"no backend could solve step '{step_type_id}'",
                error_code="NO_SOLVER",
                solver_path=tried,
            )
        result.elapsed_ms = int((_t.time() - start) * 1000)

        # Close the loop: emit to intelligence bus (never raises)
        try:
            from backend.services.intelligence_bus import emit_solve
            emit_solve(result, student_id=student_id)
        except Exception:
            pass
        return _finalize_result(result)

    # ── Multi-step problem solve ─────────────────────────────────
    def solve_problem(self, problem_type_id: str, step_inputs: list,
                      subject: str = "", class_level: str = "") -> SolutionResult:
        """Solve a full multi-step problem."""
        tried = []
        for backend in get_registry():
            if not backend.can_handle(subject, class_level):
                continue
            if not hasattr(backend, "solve_problem") or \
               type(backend).solve_problem is SolverBackend.solve_problem:
                continue
            tried.append(backend.backend_id)
            try:
                result = backend.solve_problem(problem_type_id, step_inputs)
            except Exception as e:
                # typed data, never a raise out of the facade
                if hasattr(backend, "breaker"):
                    try:
                        backend.breaker.record_failure()
                    except Exception:
                        pass
                result = SolutionResult(
                    success=False,
                    error=_typed_backend_error(backend.backend_id, e),
                    error_code="BACKEND_ERROR",
                    solver_tier=getattr(backend, "tier", SolverTier.DETERMINISTIC))
            if not isinstance(result, SolutionResult):
                # rogue backend shape — coerce, never raise out of here
                result = SolutionResult(
                    success=False,
                    error="This solver returned an unreadable result.",
                    error_code="BACKEND_ERROR",
                    solver_tier=getattr(backend, "tier", SolverTier.DETERMINISTIC))
            result.solver_path = tried
            if result.success:
                return _finalize_result(result)
        return _finalize_result(SolutionResult(
            success=False,
            problem_type_id=problem_type_id,
            error=f"no backend could solve problem '{problem_type_id}'",
            error_code="NO_SOLVER",
            solver_path=tried,
        ))

    # ── Free-text solve with fallback chain ──────────────────────
    def solve_free_text(self, problem_text: str, subject: str = "",
                        class_level: str = "", category: str = "",
                        values: dict | None = None, *,
                        deadline_s: float = 0.0,
                        **kwargs) -> SolutionResult:
        """Solve free text. Tries every backend in priority order.

        ``deadline_s``: if > 0, stop trying further backends once this many
        seconds have elapsed and return the best result so far (or a timeout
        result if none succeeded). Prevents the 13s+ tail from the full
        fallback chain when early backends are slow.
        """
        import time as _t
        _start = _t.time()
        tried = []
        last_error = ""
        for backend in get_registry():
            # Deadline check before each backend attempt
            if deadline_s > 0 and (_t.time() - _start) >= deadline_s:
                return _finalize_result(SolutionResult(
                    success=False,
                    question=problem_text,
                    error=last_error or f"solve timed out after {deadline_s}s (tried: {', '.join(tried)})",
                    error_code="SOLVE_TIMEOUT",
                    solver_path=tried,
                ))
            if not backend.can_handle(subject, class_level):
                continue
            if not hasattr(backend, "solve_free_text") or \
               type(backend).solve_free_text is SolverBackend.solve_free_text:
                continue
            tried.append(backend.backend_id)
            try:
                result = backend.solve_free_text(
                    problem_text, subject=subject, category=category,
                    values=values, **kwargs
                )
            except Exception as e:
                # typed, student-safe text — raw internals never surface
                last_error = _typed_backend_error(backend.backend_id, e)
                continue
            if not isinstance(result, SolutionResult):
                # rogue backend shape — coerce, never raise out of here
                last_error = ("This solver returned an unreadable result "
                              "for this question.")
                continue
            result.solver_path = tried
            if result.success:
                return _finalize_result(result)
            last_error = result.error
        return _finalize_result(SolutionResult(
            success=False,
            question=problem_text,
            error=last_error or "all backends failed",
            error_code="ALL_BACKENDS_FAILED",
            solver_path=tried,
        ))

    # ── Identify ─────────────────────────────────────────────────
    def identify(self, question: str, class_level: str = "") -> IdentifyResult:
        """Identify matching problem types from a question.

        Note: success=True when we have a usable match — including the
        needs_student_input=True case (category + form fields extracted,
        student must fill values). That's the intended structured flow.
        """
        import time as _t
        start = _t.time()
        try:
            from backend.ai.final_solver import identify_question
            r = identify_question(question, class_level=int(class_level) if class_level.isdigit() else None)
            # Success = we got a category and form fields the student can fill
            usable = bool(r.category and r.form_fields) and not r.error
            match = ProblemTypeMatch(
                problem_type_id=r.category or "",
                name=r.matched_question_text or question[:60],
                confidence=r.match_score,
                variables={},
                category=r.category,
                needs_student_input=r.needs_student_input,
            )
            return _finalize_identify(IdentifyResult(
                success=usable,
                error=r.error,
                question=question,
                matches=[match] if usable else [],
                best_match=match if usable else None,
                form_fields=[
                    InputField(
                        name=f.get("name", ""),
                        label=f.get("label", ""),
                        field_type=f.get("type", "expression"),
                        required=bool(f.get("required", True)),
                        default=f.get("default", ""),
                        placeholder=f.get("placeholder", ""),
                    ) for f in (r.form_fields or [])
                ],
                category=r.category,
                elapsed_ms=int((_t.time() - start) * 1000),
            ))
        except Exception as e:
            return _finalize_identify(IdentifyResult(
                success=False,
                error=_typed_backend_error("identify", e),
                question=question,
                elapsed_ms=int((_t.time() - start) * 1000),
            ))

    # ── Catalog (problem types / step types / categories) ────────
    def get_problem_types(self, topic: str = "") -> list[dict]:
        """Get all problem types (lightweight, no step forms)."""
        from backend.ai.problem_types import get_all_problem_types
        pts = get_all_problem_types()
        result = []
        for pt in pts:
            if topic and getattr(pt, "topic", "") != topic:
                continue
            result.append({
                "id": pt.id, "name": pt.name,
                "description": getattr(pt, "description", ""),
                "topic": getattr(pt, "topic", ""),
                "class_level": str(getattr(pt, "class_level", "")),
                "marks": getattr(pt, "marks", 1),
                "num_steps": getattr(pt, "num_steps", 1),
                "example": getattr(pt, "example", ""),
            })
        return result

    def get_step_form(self, problem_type_id: str, step_index: int) -> StepForm:
        """Get the form definition for one step of a problem type."""
        from backend.ai.step_chainer import StepChainer
        chainer = StepChainer(timeout=15)
        return chainer.get_step_form(problem_type_id, step_index)

    # ── Health / diagnostics ─────────────────────────────────────
    def health(self) -> dict:
        backends = []
        for b in get_registry():
            backends.append({
                "id": b.backend_id,
                "tier": b.tier.value,
                "priority": b.priority,
                "circuit_open": getattr(b, "breaker", None) and b.breaker.is_open,
            })
        return {"status": "ok", "backends": backends}


# Module-level singleton accessor
def get_facade() -> SolverFacade:
    return SolverFacade()
