"""
solver_router.py — Layer 8 (B14/H1): Route between legacy and new pipeline.

Deterministic. No LLM.

Strategy (per Fable design H1):
  1. Try legacy solvers (preserves investment) — if confidence > 0.8, use it
  2. Try new KB-based pipeline
  3. If both fail, return best effort with fallback flag

Author: Platform Backend Team
"""

from __future__ import annotations

import logging
from typing import Optional

from .solver_pipeline import SolverPipeline, PipelineResult, get_pipeline
from .stem_problem import STEMProblem

logger = logging.getLogger(__name__)


class SolverRouter:
    """Routes problems between legacy solvers and the new KB pipeline."""

    def __init__(
        self,
        pipeline: SolverPipeline = None,
        legacy_confidence_threshold: float = 0.8,
    ):
        self.pipeline = pipeline or get_pipeline()
        self.legacy_confidence_threshold = legacy_confidence_threshold

    def solve(self, problem_text: str, **kwargs) -> PipelineResult:
        """Route the problem to the best solver (sync)."""
        return self._solve_internal(problem_text, sync=True, **kwargs)

    def _solve_internal(self, problem_text: str, *, sync: bool = True,
                        **kwargs) -> PipelineResult:
        """Run the synchronous deterministic cascade.

        ``solve()`` previously called this method without it existing, which
        made the last facade backend fail closed with ``AttributeError``.
        Keep this path strictly deterministic; the async path owns the
        optional, explicitly configured LLM fallback.
        """
        calc_result = self._try_core_calculus(problem_text)
        if calc_result and calc_result.problem.solved \
                and calc_result.problem.confidence >= self.legacy_confidence_threshold:
            calc_result.pipeline_stages.insert(0, "core_calculus_engine")
            return calc_result

        units_result = self._try_stem_units(problem_text)
        if units_result and units_result.problem.solved:
            units_result.pipeline_stages.insert(0, "stem_units_solver")
            return units_result

        new_result = self._run_pipeline(problem_text, sync=sync, **kwargs)
        if new_result and new_result.problem.solved:
            return new_result

        legacy_result = self._try_legacy(problem_text)
        if legacy_result and legacy_result.problem.solved:
            legacy_result.pipeline_stages.insert(0, "legacy_fallback")
            return legacy_result

        # Return the richest deterministic refusal, preserving its stages and
        # diagnostics for the audit trail. Never invent an answer here.
        if new_result is not None:
            return new_result
        return PipelineResult(
            problem=STEMProblem(
                raw_text=problem_text,
                final_answer="",
                solved=False,
                confidence=0.0,
                backend_used="deterministic_router",
            ),
            pipeline_stages=["deterministic_router:refused"],
        )

    async def solve_async(self, problem_text: str, **kwargs) -> PipelineResult:
        """Route the problem to the best solver (async — uses main event loop for enrichment).

        Order:
          1. core_calculus_engine (primary — best backend cascade, verification, timeouts)
          2. KB pipeline (enrichment routing for theoretical, formula-based for computational)
          3. Legacy solvers (pattern_solver, compute_engine — fallback only)
          4. Best effort
        """
        # ── Step 1: Try core_calculus_engine first for computational problems ──
        calc_result = self._try_core_calculus(problem_text)
        if calc_result and calc_result.problem.solved:
            if calc_result.problem.confidence >= self.legacy_confidence_threshold:
                calc_result.pipeline_stages.insert(0, "core_calculus_engine")
                return calc_result

        # ── Step 1b: Try stem_units_solver for physics/chemistry (pint + chempy) ──
        units_result = self._try_stem_units(problem_text)
        if units_result and units_result.problem.solved:
            units_result.pipeline_stages.insert(0, "stem_units_solver")
            return units_result

        # ── Step 2: Try KB pipeline (enrichment routing + formula-based compute) ──
        new_result = await self.pipeline.solve_async(problem_text, **kwargs)
        if new_result.problem.solved:
            return new_result

        # ── Step 3: Try legacy solvers as fallback ──
        legacy_result = self._try_legacy(problem_text)
        if legacy_result and legacy_result.problem.solved:
            legacy_result.pipeline_stages.insert(0, "legacy_fallback")
            return legacy_result

        # ── Step 4: Optional LLM fallback, explicitly opt-in ──────────
        # Deterministic mode is the production default for the truth core.
        from backend.its.solver.policy import llm_allowed_for_fallback
        if llm_allowed_for_fallback():
            llm_result = await self._try_llm_fallback(problem_text, new_result)
            if llm_result and llm_result.problem.solved:
                llm_result.pipeline_stages.insert(0, "llm_fallback")
                return llm_result

        # ── Step 5: Return best effort ──
        if legacy_result and legacy_result.problem.solved:
            return legacy_result
        return new_result

    def _run_pipeline(self, problem_text: str, sync: bool = True, **kwargs) -> PipelineResult:
        """Run the KB pipeline (sync only)."""
        return self.pipeline.solve(problem_text, **kwargs)

    def _try_core_calculus(self, problem_text: str) -> Optional[PipelineResult]:
        """Try core_calculus_engine — the primary compute engine for ALL subjects.

        Backend cascade: SymEngine → SymPy → Giac → SciPy → fallback
        Has timeout protection, verification, step-by-step pedagogical output.
        """
        import sys
        if "D:\\platform" not in sys.path:
            sys.path.insert(0, "D:\\platform")
        if "D:\\platform\\backend" not in sys.path:
            sys.path.insert(0, "D:\\platform\\backend")

        try:
            from solvers.core_calculus_engine.core_calculus_engine import CalculusEngine
            engine = CalculusEngine(timeout=10)
        except ImportError:
            return None

        raw = problem_text.lower().strip()

        # ── Detect calculus operations ──
        try:
            # Derivative
            if any(kw in raw for kw in ["differentiate", "derivative", "d/dx", "f'(x)", "f''(x)"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    result = engine.differentiate(expr, variable="x")
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Integral
            if any(kw in raw for kw in ["integrate", "integral", "antiderivative"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    lower, upper = self._extract_bounds(problem_text)
                    result = engine.integrate(expr, variable="x", lower=lower, upper=upper)
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Limit
            if any(kw in raw for kw in ["limit", "approaches", "tends to"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    approach = self._extract_approach(problem_text)
                    result = engine.limit(expr, variable="x", approach_value=approach)
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Critical points
            if any(kw in raw for kw in ["critical point", "critical number", "stationary point"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    result = engine.critical_points(expr, variable="x")
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Max/min
            if any(kw in raw for kw in ["max", "min", "maximum", "minimum", "extrema"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    result = engine.max_min_check(expr, variable="x")
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Tangent line
            if any(kw in raw for kw in ["tangent line", "tangent at", "equation of tangent"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    point = self._extract_point(problem_text)
                    result = engine.tangent_line(expr, variable="x", at_point=point)
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Increasing/decreasing
            if any(kw in raw for kw in ["increasing", "decreasing", "monotonic"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    result = engine.increasing_decreasing(expr, variable="x")
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Area under curve
            if any(kw in raw for kw in ["area under", "area enclosed"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    lower, upper = self._extract_bounds(problem_text)
                    result = engine.area_under_curve(expr, variable="x", lower=lower, upper=upper)
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Area between curves
            if "area between" in raw:
                exprs = self._extract_two_exprs(problem_text)
                if exprs and len(exprs) == 2:
                    lower, upper = self._extract_bounds(problem_text)
                    result = engine.area_between_curves(exprs[0], exprs[1], variable="x", lower=lower, upper=upper)
                    if result.success:
                        return self._engine_to_result(result, problem_text)

            # Taylor series
            if any(kw in raw for kw in ["taylor", "maclaurin", "series expansion"]):
                expr = self._extract_expr(problem_text)
                if expr:
                    result = engine.taylor_series(expr, variable="x", around_point=0, order=5)
                    if result.success:
                        return self._engine_to_result(result, problem_text)

        except Exception as e:
            logger.debug(f"Core calculus engine failed: {e}")

        return None

    def _engine_to_result(self, engine_result, problem_text: str) -> PipelineResult:
        """Convert a core_calculus_engine SolverResult to a PipelineResult."""
        problem = STEMProblem(
            raw_text=problem_text,
            final_answer=engine_result.answer,
            solved=True,
            confidence=0.9 if engine_result.verified else 0.75,
            backend_used="core_calculus_engine",
        )
        problem.metadata["verified"] = engine_result.verified
        problem.metadata["computation_time"] = engine_result.computation_time
        problem.metadata["backend_used_detail"] = engine_result.backend_used
        return PipelineResult(
            problem=problem,
            pipeline_stages=["core_calculus_engine"],
        )

    def _extract_expr(self, text: str) -> str:
        """Extract a math expression from question text."""
        import re
        patterns = [
            r'(?:differentiate|derivative of|d/dx|find derivative of)\s[:\s]*(.+?)(?:\s+(?:with respect to|wrt)\s+\w+)?$',
            r'd/dx\[(.+?)\]',
            r'(?:integrate|integral of|antiderivative of)\s+(.+?)(?:\s+dx|\s+(?:with respect to|wrt)\s+\w+|$)',
            r'(?:limit of|lim)\s+(.+?)(?:\s+as\s+\w+\s+→|approaches|tends to)',
            r'(?:critical points of|critical numbers of)\s+(.+?)(?:\s|$)',
            r'(?:max(?:imum)?|min(?:imum)?|extrema of)\s+(?:of\s+)?(.+?)(?:\s|$)',
            r'(?:tangent (?:line )?(?:to|of|at))\s+(.+?)(?:\s+at|\s|$)',
            r'(?:increasing|decreasing)\s+(?:intervals of\s+)?(.+?)(?:\s|$)',
            r'(?:area under(?:\s+the\s+curve)?(?:\s+of)?|area enclosed by)\s+(.+?)(?:\s+from|\s+over|\s|$)',
            r'(?:taylor|maclaurin)\s+(?:series of\s+)?(.+?)(?:\s|$)',
            r'y\s*=\s*(.+?)(?:\s+from|\s+over|\s|$)',
            r'f\(x\)\s*=\s*(.+?)(?:\s|$)',
        ]
        for p in patterns:
            m = re.search(p, text, re.IGNORECASE)
            if m:
                expr = m.group(1).strip().rstrip(',').strip()
                expr = expr.replace('^', '**')
                return expr
        return None

    def _extract_bounds(self, text: str):
        """Extract definite integral bounds."""
        import re
        m = re.search(r'from\s+(-?\d+(?:\.\d+)?)\s+to\s+(-?\d+(?:\.\d+)?|pi|e)', text, re.IGNORECASE)
        if m:
            lower = float(m.group(1))
            upper = m.group(2)
            try:
                upper = float(upper)
            except ValueError:
                pass
            return lower, upper
        m = re.search(r'\[(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\]', text)
        if m:
            return float(m.group(1)), float(m.group(2))
        return None, None

    def _extract_approach(self, text: str) -> str:
        """Extract limit approach value."""
        import re
        m = re.search(r'(?:approaches|tends to|→)\s*(\d+|infinity|oo|inf)', text, re.IGNORECASE)
        if m:
            val = m.group(1).lower()
            if val in ("infinity", "oo", "inf"):
                return "oo"
            return val
        return "oo"

    def _extract_point(self, text: str):
        """Extract a point value."""
        import re
        m = re.search(r'(?:at|x\s*=|point\s+)\s*(-?\d+(?:\.\d+)?)', text, re.IGNORECASE)
        if m:
            return float(m.group(1))
        return None

    def _extract_two_exprs(self, text: str):
        """Extract two expressions."""
        import re
        m = re.search(r'between\s+(.+?)\s+and\s+(.+?)(?:\s+from|\s+over|$)', text, re.IGNORECASE)
        if m:
            return [m.group(1).strip(), m.group(2).strip()]
        return None

    def _try_stem_units(self, problem_text: str) -> Optional[PipelineResult]:
        """Try the pint+chempy solver for physics and chemistry problems."""
        try:
            from .stem_units_solver import solve as units_solve
            result = units_solve(problem_text)
            if result and result.success:
                problem = STEMProblem(
                    raw_text=problem_text,
                    final_answer=result.answer,
                    solved=True,
                    confidence=result.confidence,
                    backend_used=result.backend_used,
                )
                problem.metadata["formula_used"] = result.formula_used
                problem.metadata["steps"] = result.steps
                return PipelineResult(
                    problem=problem,
                    pipeline_stages=["stem_units_solver"],
                )
        except Exception as e:
            logger.warning(f"STEM units solver error: {e}", exc_info=True)
        return None

    async def _try_llm_fallback(
        self,
        problem_text: str,
        pipeline_result: PipelineResult,
    ) -> Optional[PipelineResult]:
        """Try the LLM fallback handler (local model with guardrails).

        Only called when all deterministic solvers have failed.
        The LLM never computes — it only analyses and suggests approaches.
        """
        try:
            try:
                from .llm_fallback_handler import get_fallback_handler
            except ImportError:
                from llm_fallback_handler import get_fallback_handler
            handler = get_fallback_handler()

            # Determine trigger reason from pipeline result
            trigger = "novel_problem"
            if pipeline_result and pipeline_result.problem:
                if not pipeline_result.problem.concept_tags:
                    trigger = "novel_problem"
                elif pipeline_result.problem.confidence < 0.3:
                    trigger = "parse_failure"
                else:
                    trigger = "no_formula_match"

            result = await handler.handle(
                problem_text=problem_text,
                trigger_reason=trigger,
            )

            if not result or not result.get("success"):
                # LLM fallback didn't produce a usable result
                # But we can still return the explanation text as a hint
                explanation = result.get("explanation_text", "") if result else ""
                if explanation and not result.get("llm_error"):
                    problem = STEMProblem(
                        raw_text=problem_text,
                        final_answer="",
                        solved=False,
                        confidence=0.0,
                        backend_used="llm_fallback",
                        steps=[explanation],
                    )
                    problem.llm_disclosure = result.get("disclosure", "")
                    return PipelineResult(
                        problem=problem,
                        pipeline_stages=["llm_fallback_hint"],
                    )
                return None

            # LLM provided analysis — construct a result with the explanation
            explanation = result.get("explanation_text", "")
            formula_candidates = result.get("formula_candidates", [])
            confidence = result.get("confidence", 0.0)

            steps = []
            if explanation:
                steps.append(explanation)
            if formula_candidates:
                steps.append(
                    "Suggested formulas: " + ", ".join(formula_candidates)
                )

            problem = STEMProblem(
                raw_text=problem_text,
                final_answer="",
                solved=True,  # Mark as solved (analysis provided, not computation)
                confidence=confidence,
                backend_used="llm_fallback",
                steps=steps,
            )
            problem.llm_disclosure = result.get("disclosure", "")
            problem.llm_extraction = result.get("extraction", {})

            return PipelineResult(
                problem=problem,
                pipeline_stages=["llm_fallback"],
            )

        except Exception as exc:
            logger.debug("LLM fallback failed: %s", exc)
            return None

    def _try_legacy(self, problem_text: str) -> Optional[PipelineResult]:
        """Try the existing solver registry and pattern solver (now in platform)."""
        import sys
        if "D:\\platform" not in sys.path:
            sys.path.insert(0, "D:\\platform")

        # Try pattern solver first (fastest, most reliable)
        try:
            from backend.ai.pattern_solver import solve as pattern_solve
            result = pattern_solve(problem_text)
            if result and result.matched:
                problem = STEMProblem(
                    raw_text=problem_text,
                    final_answer=str(result.answer),
                    solved=True,
                    confidence=0.85,
                    backend_used="pattern_solver",
                )
                return PipelineResult(
                    problem=problem,
                    pipeline_stages=["pattern_solver"],
                )
        except Exception as e:
            logger.debug(f"Pattern solver failed: {e}")

        # Try compute engine
        try:
            from backend.ai.compute_engine import ComputeEngine
            result = ComputeEngine.attempt(problem_text)
            if result and result.matched:
                problem = STEMProblem(
                    raw_text=problem_text,
                    final_answer=str(result.answer),
                    solved=True,
                    confidence=0.8,
                    backend_used="compute_engine",
                )
                return PipelineResult(
                    problem=problem,
                    pipeline_stages=["compute_engine"],
                )
        except Exception as e:
            logger.debug(f"Compute engine failed: {e}")

        # Try node solver registry
        try:
            from backend.ai.node_solver_registry import NodeSolverRegistry
            registry = NodeSolverRegistry()
            result = registry.solve(problem_text)
            if result and result.get("answer"):
                problem = STEMProblem(
                    raw_text=problem_text,
                    final_answer=str(result["answer"]),
                    solved=True,
                    confidence=result.get("confidence", 0.7),
                    backend_used="legacy_registry",
                )
                return PipelineResult(
                    problem=problem,
                    pipeline_stages=["legacy_registry"],
                )
        except Exception as e:
            logger.debug(f"Legacy registry failed: {e}")

        return None


# Singleton
_router = None


def get_router() -> SolverRouter:
    global _router
    if _router is None:
        _router = SolverRouter()
    return _router


def route_solve(problem_text: str, **kwargs) -> PipelineResult:
    """Convenience function."""
    return get_router().solve(problem_text, **kwargs)
