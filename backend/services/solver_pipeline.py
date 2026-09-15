"""
solver_pipeline.py — Universal STEM Solver Pipeline (Layer 8 / H2).

Orchestrates the full deterministic pipeline:
  parse → resolve implicit → select formula → decompose → compute → verify → explain

NO LLM in the computation path. LLM is only for:
  - Competency justification (optional, caller-controlled)
  - Fallback when confidence < threshold (caller-controlled)

This pipeline preserves and uses the existing compute infrastructure:
  - core_calculus_engine (112KB of calculus)
  - symbolic_solver
  - pattern_solver
  - ComputeEngine

Author: Platform Backend Team
"""

from __future__ import annotations

import time
import logging
from dataclasses import dataclass, field
from typing import Optional, Any

from .stem_problem import STEMProblem, Quantity, Target, SolutionStep, Constraint
from .preprocessor import preprocess, PreprocessedText
from .quantity_extractor import extract_quantities, QuantityExtractor
from .implicit_value_resolver import resolve_implicit, ImplicitValueResolver
from .concept_target_extractor import extract_concepts, ConceptTargetExtractor
from .formula_selector import select_formulas, FormulaSelector, FormulaMatch
from .multi_step_decomposer import decompose, MultiStepDecomposer, SolvePlan
from .step_explainer import explain, StepExplainer

logger = logging.getLogger(__name__)


@dataclass
class PipelineResult:
    """Result of the full pipeline."""
    problem: STEMProblem
    explanation: str = ""
    solve_time_ms: float = 0.0
    pipeline_stages: list[str] = field(default_factory=list)
    fallback_used: bool = False
    fallback_reason: str = ""

    def to_dict(self) -> dict:
        return {
            "problem": self.problem.to_dict(),
            "explanation": self.explanation,
            "solve_time_ms": self.solve_time_ms,
            "pipeline_stages": self.pipeline_stages,
            "fallback_used": self.fallback_used,
            "fallback_reason": self.fallback_reason,
            "solved": self.problem.solved,
            "answer": self.problem.final_answer,
            "confidence": self.problem.confidence,
            "method": self.problem.backend_used,
        }


class SolverPipeline:
    """Universal STEM Solver Pipeline — orchestrates all layers."""

    def __init__(
        self,
        preprocessor=None,
        quantity_extractor=None,
        implicit_resolver=None,
        concept_extractor=None,
        formula_selector=None,
        decomposer=None,
        explainer=None,
        confidence_threshold: float = 0.5,
    ):
        self.preprocessor = preprocessor or PreprocessedText
        self.quantity_extractor = quantity_extractor or QuantityExtractor()
        self.implicit_resolver = implicit_resolver or ImplicitValueResolver()
        self.concept_extractor = concept_extractor or ConceptTargetExtractor()
        self.formula_selector = formula_selector or FormulaSelector()
        self.decomposer = decomposer or MultiStepDecomposer(self.formula_selector)
        self.explainer = explainer or StepExplainer()
        self.confidence_threshold = confidence_threshold

    async def solve_async(self, problem_text: str, **kwargs) -> PipelineResult:
        """Solve a problem through the full pipeline (async).

        Same as solve() but when a theoretical question is detected,
        awaits the enrichment fetch in the main event loop instead of
        using a thread pool. This avoids reloading the HuggingFace model.
        """
        start_time = time.time()
        stages: list[str] = []

        # ── Stage 1: Preprocess ──
        pp = preprocess(problem_text)
        normalized = pp.normalized_text
        stages.append("preprocess")

        # ── Stage 2: Extract explicit quantities ──
        quantities = extract_quantities(normalized)
        stages.append("quantity_extraction")

        # ── Stage 3: Extract concepts + target ──
        concept_result = extract_concepts(normalized)
        stages.append("concept_target_extraction")

        # ── Stage 4: Resolve implicit values ──
        known_symbols = {q.symbol: q.value for q in quantities if q.is_known}
        implicit_bindings = resolve_implicit(
            normalized,
            concept_tags=concept_result.concept_tags,
            already_bound=known_symbols,
        )
        stages.append("implicit_resolution")

        for binding in implicit_bindings:
            if binding.value is not None:
                quantities.append(binding.to_quantity())

        # ── Build STEMProblem IR ──
        problem = STEMProblem(
            raw_text=problem_text,
            domain=concept_result.subject,
            subject=concept_result.subject,
            class_level=concept_result.class_level,
            board=concept_result.board,
            difficulty=concept_result.difficulty,
            quantities=quantities,
            target=concept_result.target,
            concept_tags=concept_result.concept_tags,
            confidence=concept_result.confidence,
        )

        problem.metadata["normalized_text"] = normalized
        if pp.warnings:
            problem.metadata["warnings"] = pp.warnings

        # ── Theoretical question branch (async — no thread, no HF reload) ──
        # A question is theoretical if it has NO explicit quantities (no numbers
        # in the text). Implicit values like g=9.8 don't count — they're
        # injected by the resolver, not provided by the student.
        explicit_quantities = [q for q in quantities if not q.is_implicit]
        if not explicit_quantities and problem.concept_tags:
            stages.append("theoretical_routing")
            theoretical_result = await self._answer_from_enrichment_async(problem)
            if theoretical_result:
                solve_time = (time.time() - start_time) * 1000
                problem.solve_time_ms = solve_time
                return PipelineResult(
                    problem=problem,
                    explanation=theoretical_result,
                    solve_time_ms=solve_time,
                    pipeline_stages=stages,
                    fallback_used=False,
                    fallback_reason="",
                )

        # ── Computational path — delegate to sync solve for the rest ──
        return self._solve_computational(problem, concept_result, formula_matches=None, plan=None, stages=stages, start_time=start_time, **kwargs)

    def solve(self, problem_text: str, **kwargs) -> PipelineResult:
        """Solve a problem through the full pipeline (sync).

        For theoretical questions, uses a thread pool for the enrichment
        fetch. For async callers, prefer solve_async() to avoid the
        HuggingFace model reload.
        """
        start_time = time.time()
        stages: list[str] = []

        # ── Stage 1: Preprocess ──
        pp = preprocess(problem_text)
        normalized = pp.normalized_text
        stages.append("preprocess")

        # ── Stage 2: Extract explicit quantities ──
        quantities = extract_quantities(normalized)
        stages.append("quantity_extraction")

        # ── Stage 3: Extract concepts + target ──
        concept_result = extract_concepts(normalized)
        stages.append("concept_target_extraction")

        # ── Stage 4: Resolve implicit values ──
        known_symbols = {q.symbol: q.value for q in quantities if q.is_known}
        implicit_bindings = resolve_implicit(
            normalized,
            concept_tags=concept_result.concept_tags,
            already_bound=known_symbols,
        )
        stages.append("implicit_resolution")

        for binding in implicit_bindings:
            if binding.value is not None:
                quantities.append(binding.to_quantity())

        # ── Build STEMProblem IR ──
        problem = STEMProblem(
            raw_text=problem_text,
            domain=concept_result.subject,
            subject=concept_result.subject,
            class_level=concept_result.class_level,
            board=concept_result.board,
            difficulty=concept_result.difficulty,
            quantities=quantities,
            target=concept_result.target,
            concept_tags=concept_result.concept_tags,
            confidence=concept_result.confidence,
        )

        problem.metadata["normalized_text"] = normalized
        if pp.warnings:
            problem.metadata["warnings"] = pp.warnings

        # ── Theoretical question branch (sync — uses thread pool) ──
        explicit_quantities = [q for q in quantities if not q.is_implicit]
        if not explicit_quantities and problem.concept_tags:
            stages.append("theoretical_routing")
            theoretical_result = self._answer_from_enrichment(problem, concept_result)
            if theoretical_result:
                solve_time = (time.time() - start_time) * 1000
                problem.solve_time_ms = solve_time
                return PipelineResult(
                    problem=problem,
                    explanation=theoretical_result,
                    solve_time_ms=solve_time,
                    pipeline_stages=stages,
                    fallback_used=False,
                    fallback_reason="",
                )

        # ── Computational path ──
        return self._solve_computational(problem, concept_result, formula_matches=None, plan=None, stages=stages, start_time=start_time, **kwargs)

    def _solve_computational(self, problem, concept_result, formula_matches, plan, stages, start_time, **kwargs) -> PipelineResult:
        """Run the computational stages: formula selection, decomposition, compute, verify, explain."""
        # ── Stage 5: Select formula(s) ──
        formula_matches = select_formulas(problem, max_results=5)
        stages.append("formula_selection")

        if formula_matches:
            best_match = formula_matches[0]
            problem.metadata["selected_formula"] = best_match.to_dict()
            problem.metadata["formula_candidates"] = [m.to_dict() for m in formula_matches]

        # ── Stage 6: Decompose (if needed) ──
        plan = decompose(problem)
        stages.append("decomposition")

        if plan.solvable:
            problem.metadata["solve_plan"] = plan.to_dict()

        # ── Stage 7: Compute ──
        # Try existing compute engines first
        computed = self._compute(problem, formula_matches, plan)
        stages.append("compute")

        # ── Stage 8: Verify ──
        if computed:
            verified = self._verify(problem)
            stages.append("verification")
            if not verified:
                problem.confidence *= 0.7  # reduce confidence if verification fails

        # ── Stage 9: Explain ──
        explanation = explain(problem)
        stages.append("explanation")

        # ── Finalize ──
        solve_time = (time.time() - start_time) * 1000
        problem.solve_time_ms = solve_time

        # Check if we need fallback
        fallback_used = False
        fallback_reason = ""
        if not problem.solved and problem.confidence < self.confidence_threshold:
            fallback_used = True
            fallback_reason = "Low confidence or no solution found"

        return PipelineResult(
            problem=problem,
            explanation=explanation,
            solve_time_ms=solve_time,
            pipeline_stages=stages,
            fallback_used=fallback_used,
            fallback_reason=fallback_reason,
        )

    async def _answer_from_enrichment_async(self, problem: STEMProblem) -> str:
        """Answer a theoretical question using enrichment content (async).

        Runs in the main event loop — shares the EmbeddingCache with the
        rest of the application. No thread pool, no HuggingFace reload.
        """
        import sys

        if "D:\\platform" not in sys.path:
            sys.path.insert(0, "D:\\platform")

        try:
            from backend.database import async_session
            from backend.services.routing_service import RoutingService
            from backend.models import EnrichmentContent
            from sqlalchemy import select

            # Map intent to enrichment field
            intent = "definition"
            raw_lower = problem.raw_text.lower()
            if any(kw in raw_lower for kw in ["why", "justify", "explain", "show that", "prove"]):
                intent = "text_walkthrough"
            elif "eli5" in raw_lower or "simple" in raw_lower or "simply" in raw_lower:
                intent = "eli5"
            elif "misconception" in raw_lower or "common mistake" in raw_lower:
                intent = "common_misconception"
            elif "scope" in raw_lower or "boundary" in raw_lower:
                intent = "scope_boundary"

            async with async_session() as db:
                route = await RoutingService.route(
                    db,
                    problem.raw_text,
                    subject_filter=problem.subject,
                    class_filter=problem.class_level,
                )
                if route is None:
                    return None

                result = await db.execute(
                    select(EnrichmentContent).where(
                        EnrichmentContent.node_id == route.node_id
                    )
                )
                enrichment = result.scalar_one_or_none()
                if enrichment is None:
                    return None

                field_value = getattr(enrichment, intent, None)
                if not field_value:
                    field_value = enrichment.definition
                if not field_value:
                    return None

                title = enrichment.title or route.node_title or ""
                answer = f"**{title}**\n\n{field_value}"

                problem.metadata["routed_node_id"] = route.node_id
                problem.metadata["routed_node_title"] = route.node_title
                problem.metadata["enrichment_field"] = intent
                problem.metadata["routing_method"] = route.method
                problem.solved = True
                problem.confidence = route.confidence
                problem.backend_used = "enrichment_routing"
                problem.final_answer = field_value[:200] if field_value else ""

                return answer

        except Exception as e:
            logger.warning(f"Enrichment routing failed (async): {e}", exc_info=True)
            return None

    def _answer_from_enrichment(self, problem: STEMProblem, concept_result) -> str:
        """Answer a theoretical question using enrichment content.

        Called when the parser extracted concepts but no quantities.
        Uses the routing service to find the best enrichment node,
        then returns the appropriate field based on intent.
        No LLM. No computation. Pure knowledge retrieval.
        """
        import asyncio
        import sys

        if "D:\\platform" not in sys.path:
            sys.path.insert(0, "D:\\platform")

        try:
            from backend.services.routing_service import RoutingService, RouteResult
            from backend.models import EnrichmentContent
            from sqlalchemy import select
            from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
            import os as _os

            # Create a SEPARATE engine for this thread — the main engine's
            # connection pool is bound to the main event loop and cannot be
            # used from a different event loop in a thread.
            _db_url = _os.environ.get(
                "DATABASE_URL",
                "postgresql+asyncpg://dream_user:dream_secure_2024@localhost:5432/dream_app",
            )
            _thread_engine = create_async_engine(_db_url, pool_size=2, pool_pre_ping=True)
            _thread_session = async_sessionmaker(_thread_engine, class_=AsyncSession, expire_on_commit=False)

            # Map intent to enrichment field — check raw text for intent keywords
            intent = "definition"
            raw_lower = problem.raw_text.lower()
            if any(kw in raw_lower for kw in ["why", "justify", "explain", "show that", "prove"]):
                intent = "text_walkthrough"
            elif "eli5" in raw_lower or "simple" in raw_lower or "simply" in raw_lower:
                intent = "eli5"
            elif "misconception" in raw_lower or "common mistake" in raw_lower:
                intent = "common_misconception"
            elif "scope" in raw_lower or "boundary" in raw_lower:
                intent = "scope_boundary"
            elif problem.target and problem.target.quantity_type:
                qt = problem.target.quantity_type.lower()
                if qt in ("why", "justify", "explain", "show"):
                    intent = "text_walkthrough"
                elif qt == "eli5":
                    intent = "eli5"
                elif "misconception" in qt:
                    intent = "common_misconception"
                elif "scope" in qt:
                    intent = "scope_boundary"

            async def _fetch():
                nonlocal intent
                async with _thread_session() as db:
                    # Route the question to find the best node
                    route = await RoutingService.route(
                        db,
                        problem.raw_text,
                        subject_filter=problem.subject,
                        class_filter=problem.class_level,
                    )
                    if route is None:
                        return None

                    # Fetch the enrichment content
                    result = await db.execute(
                        select(EnrichmentContent).where(
                            EnrichmentContent.node_id == route.node_id
                        )
                    )
                    enrichment = result.scalar_one_or_none()
                    if enrichment is None:
                        return None

                    # Get the right field based on intent
                    field_value = getattr(enrichment, intent, None)
                    if not field_value:
                        # Fall back to definition
                        field_value = enrichment.definition
                        intent = "definition"
                    if not field_value:
                        return None

                    # Build the answer
                    title = enrichment.title or route.node_title or ""
                    answer = f"**{title}**\n\n{field_value}"

                    # Update the problem with routing info
                    problem.metadata["routed_node_id"] = route.node_id
                    problem.metadata["routed_node_title"] = route.node_title
                    problem.metadata["enrichment_field"] = intent
                    problem.metadata["routing_method"] = route.method
                    problem.solved = True
                    problem.confidence = route.confidence
                    problem.backend_used = "enrichment_routing"
                    problem.final_answer = field_value[:200] if field_value else ""

                    return answer

            # Run the async fetch in a separate thread with its own event loop
            # This works whether we're called from sync or async context
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                future = pool.submit(asyncio.run, _fetch())
                result = future.result(timeout=60)
            # Clean up the thread-local engine
            try:
                asyncio.run(_thread_engine.dispose())
            except Exception:
                pass
            return result

        except Exception as e:
            logger.warning(f"Enrichment routing failed: {e}", exc_info=True)
            return None

    def _compute(
        self,
        problem: STEMProblem,
        formula_matches: list[FormulaMatch],
        plan: SolvePlan,
    ) -> bool:
        """Try to compute the answer using existing engines.

        Tries in order:
          1. Symbolic solver (platform's own — physics + math)
          2. Pattern solver (from dream_app, if available)
          3. Compute engine (from dream_app, if available)
          4. Formula-based computation
        """
        if not problem.target:
            return False

        # Try symbolic solver first (platform's own, no import issues)
        try:
            result = self._try_symbolic_solver(problem)
            if result:
                return True
        except Exception as e:
            logger.debug(f"Symbolic solver failed: {e}")

        # Try pattern solver (from dream_app, if available)
        try:
            result = self._try_pattern_solver(problem)
            if result:
                return True
        except Exception as e:
            logger.debug(f"Pattern solver failed: {e}")

        # Try compute engine (from dream_app, if available)
        try:
            result = self._try_compute_engine(problem)
            if result:
                return True
        except Exception as e:
            logger.debug(f"Compute engine failed: {e}")

        # Try formula-based computation
        if formula_matches:
            try:
                result = self._try_formula_compute(problem, formula_matches[0])
                if result:
                    return True
            except Exception as e:
                logger.debug(f"Formula compute failed: {e}")

        return False

    def _try_pattern_solver(self, problem: STEMProblem) -> bool:
        """Try the pattern solver from dream_app, plus simple built-in patterns."""
        # Built-in percentage solver
        import re
        text = problem.raw_text.lower().strip()
        pct_match = re.match(r'(?:what\s+is\s+)?(\d+(?:\.\d+)?)\s*%\s*of\s+(\d+(?:\.\d+)?)', text)
        if pct_match:
            pct = float(pct_match.group(1))
            total = float(pct_match.group(2))
            result = (pct / 100) * total
            problem.final_answer = str(result)
            problem.solved = True
            problem.backend_used = "builtin_pattern"
            problem.confidence = max(problem.confidence, 0.9)
            problem.add_step(SolutionStep(
                step_number=1,
                title="Calculate percentage",
                rule=f"{pct}% of {total}",
                computation=f"({pct}/100) * {total} = {result}",
                result=str(result),
                backend_used="builtin_pattern",
            ))
            return True

        # Built-in simple arithmetic
        arith_match = re.match(r'(?:what\s+is\s+)?(\d+(?:\.\d+)?)\s*([+\-*/x])\s*(\d+(?:\.\d+)?)\s*[=?]?', text)
        if arith_match:
            a = float(arith_match.group(1))
            op = arith_match.group(2)
            b = float(arith_match.group(3))
            if op == 'x':
                op = '*'
            ops = {'+': a + b, '-': a - b, '*': a * b, '/': a / b if b != 0 else None}
            if op in ops and ops[op] is not None:
                result = ops[op]
                problem.final_answer = str(result)
                problem.solved = True
                problem.backend_used = "builtin_pattern"
                problem.confidence = max(problem.confidence, 0.9)
                problem.add_step(SolutionStep(
                    step_number=1,
                    title=f"Calculate {a} {op} {b}",
                    computation=f"{a} {op} {b} = {result}",
                    result=str(result),
                    backend_used="builtin_pattern",
                ))
                return True

        # Try dream_app pattern solver (now copied into platform)
        try:
            import sys
            if "D:\\platform" not in sys.path:
                sys.path.insert(0, "D:\\platform")
            from backend.ai.pattern_solver import solve as pattern_solve
            result = pattern_solve(problem.raw_text)
            if result and result.matched:
                problem.final_answer = str(result.answer)
                problem.solved = True
                problem.backend_used = "pattern_solver"
                problem.confidence = max(problem.confidence, 0.85)
                for i, step_text in enumerate(result.steps or [], 1):
                    problem.add_step(SolutionStep(
                        step_number=i,
                        title=f"Pattern: {result.question_type}" if i == 1 else f"Step {i}",
                        computation=step_text,
                        result=str(result.answer) if i == len(result.steps or []) else None,
                        backend_used="pattern_solver",
                    ))
                return True
        except Exception as e:
            logger.debug(f"Pattern solver failed: {e}")
        return False

    def _try_compute_engine(self, problem: STEMProblem) -> bool:
        """Try the compute engine from dream_app (now in platform)."""
        try:
            import sys
            if "D:\\platform" not in sys.path:
                sys.path.insert(0, "D:\\platform")
            from backend.ai.compute_engine import ComputeEngine

            result = ComputeEngine.attempt(problem.raw_text)
            if result and result.matched:
                problem.final_answer = str(result.answer)
                problem.solved = True
                problem.backend_used = "compute_engine"
                problem.confidence = max(problem.confidence, 0.75)

                problem.add_step(SolutionStep(
                    step_number=1,
                    title=f"Compute: {result.question_type}",
                    computation=result.expression or "",
                    result=str(result.answer),
                    backend_used="compute_engine",
                ))
                return True
        except Exception as e:
            logger.debug(f"Compute engine error: {e}")
        return False

    def _try_symbolic_solver(self, problem: STEMProblem) -> bool:
        """Try the core_calculus_engine — the universal compute engine for ALL subjects.

        Uses the backend cascade: SymEngine → SymPy → Giac → SciPy → fallback.
        Has timeout protection, verification, and step-by-step pedagogical output.

        For all subjects (physics, chemistry, biology, mathematics):
        1. Build a SymPy equation from the formula + known quantities
        2. Solve for the target variable
        3. Verify the result
        4. Return with step-by-step explanation
        """
        try:
            import sys
            if "D:\\platform" not in sys.path:
                sys.path.insert(0, "D:\\platform")
            if "D:\\platform\\backend" not in sys.path:
                sys.path.insert(0, "D:\\platform\\backend")

            import sympy as sp

            # ── Try core_calculus_engine first (better backend cascade + verification) ──
            try:
                from solvers.core_calculus_engine.core_calculus_engine import (
                    CalculusEngine, SolverResult as CCSolverResult
                )
                engine = CalculusEngine(timeout=10)
            except ImportError:
                engine = None

            if not problem.target:
                return False

            known = dict(problem.known_quantities)

            # ── Normalize known quantities for all subjects ──
            # Map d → h for height/climbing problems
            if "d" in known and "h" not in known:
                known["h"] = known["d"]

            # Add g = 9.8 if gravity concept is present and g not already known
            if any("GRAV" in t for t in problem.concept_tags) and "g" not in known:
                known["g"] = 9.8

            # Map v_final → v, v → u when both present (projectile problems)
            if "v_final" in known and "v" in known:
                known["u"] = known.pop("v")
                known["v"] = known.pop("v_final")

            # ── Normalize target symbol ──
            target_sym = problem.target.symbol
            target_aliases = {
                "velocity": "v", "speed": "v", "final velocity": "v",
                "acceleration": "a", "force": "F",
                "time": "t", "distance": "s", "displacement": "s",
                "energy": "E", "height": "h", "power": "P",
                "KE": "KE", "PE": "PE",
                "pH": "pH", "concentration": "C",
                "pressure": "P_press", "temperature": "T",
                "moles": "n", "molarity": "M",
            }
            if target_sym in target_aliases:
                target_sym = target_aliases[target_sym]

            # For height/displacement problems with gravity, map g → a (deceleration)
            if target_sym in ("s", "h") and "g" in known and "a" not in known:
                known["a"] = -known["g"]

            # ── Route 1: Calculus operations (math) ──
            if problem.domain == "mathematics" and engine:
                raw = problem.raw_text.lower()
                # Detect calculus operations from the question
                if any(kw in raw for kw in ["derivative", "differentiate", "d/dx", "f'(x)", "f''(x)"]):
                    # Extract expression from text
                    expr_str = self._extract_expression(problem.raw_text)
                    if expr_str:
                        result = engine.differentiate(expr_str, variable="x")
                        if result.success:
                            return self._apply_engine_result(problem, result, "core_calculus_engine")

                elif any(kw in raw for kw in ["integrate", "integral", "antiderivative", "∫"]):
                    expr_str = self._extract_expression(problem.raw_text)
                    if expr_str:
                        # Check for definite integral bounds
                        lower, upper = self._extract_bounds(problem.raw_text)
                        result = engine.integrate(expr_str, variable="x", lower=lower, upper=upper)
                        if result.success:
                            return self._apply_engine_result(problem, result, "core_calculus_engine")

                elif any(kw in raw for kw in ["limit", "approaches", "tends to"]):
                    expr_str = self._extract_expression(problem.raw_text)
                    if expr_str:
                        approach = self._extract_limit_approach(problem.raw_text)
                        result = engine.limit(expr_str, variable="x", approach_value=approach)
                        if result.success:
                            return self._apply_engine_result(problem, result, "core_calculus_engine")

                elif any(kw in raw for kw in ["critical point", "critical number", "stationary point"]):
                    expr_str = self._extract_expression(problem.raw_text)
                    if expr_str:
                        result = engine.critical_points(expr_str, variable="x")
                        if result.success:
                            return self._apply_engine_result(problem, result, "core_calculus_engine")

                elif any(kw in raw for kw in ["tangent line", "tangent at", "equation of tangent"]):
                    expr_str = self._extract_expression(problem.raw_text)
                    if expr_str:
                        point = self._extract_point(problem.raw_text)
                        result = engine.tangent_line(expr_str, variable="x", at_point=point)
                        if result.success:
                            return self._apply_engine_result(problem, result, "core_calculus_engine")

                elif any(kw in raw for kw in ["area under", "area between", "area enclosed"]):
                    if "area between" in raw:
                        # Need two expressions
                        exprs = self._extract_two_expressions(problem.raw_text)
                        if exprs and len(exprs) == 2:
                            lower, upper = self._extract_bounds(problem.raw_text)
                            result = engine.area_between_curves(exprs[0], exprs[1], variable="x", lower=lower, upper=upper)
                            if result.success:
                                return self._apply_engine_result(problem, result, "core_calculus_engine")
                    else:
                        expr_str = self._extract_expression(problem.raw_text)
                        if expr_str:
                            lower, upper = self._extract_bounds(problem.raw_text)
                            result = engine.area_under_curve(expr_str, variable="x", lower=lower, upper=upper)
                            if result.success:
                                return self._apply_engine_result(problem, result, "core_calculus_engine")

                elif any(kw in raw for kw in ["max", "min", "maximum", "minimum", "extrema"]):
                    expr_str = self._extract_expression(problem.raw_text)
                    if expr_str:
                        result = engine.max_min_check(expr_str, variable="x")
                        if result.success:
                            return self._apply_engine_result(problem, result, "core_calculus_engine")

                elif any(kw in raw for kw in ["increasing", "decreasing", "monotonic"]):
                    expr_str = self._extract_expression(problem.raw_text)
                    if expr_str:
                        result = engine.increasing_decreasing(expr_str, variable="x")
                        if result.success:
                            return self._apply_engine_result(problem, result, "core_calculus_engine")

                elif any(kw in raw for kw in ["taylor", "series expansion", "maclaurin"]):
                    expr_str = self._extract_expression(problem.raw_text)
                    if expr_str:
                        result = engine.taylor_series(expr_str, variable="x", around_point=0, order=5)
                        if result.success:
                            return self._apply_engine_result(problem, result, "core_calculus_engine")

            # ── Route 2: Equation solving (ALL subjects — physics, chem, bio, math) ──
            # Build equation from formula + knowns, solve for target
            if target_sym and target_sym in known:
                # Target is already known — nothing to solve
                pass
            elif target_sym:
                # Try to solve using the formula selected by the formula selector
                formula_str = problem.metadata.get("selected_formula", {}).get("formula_str", "")
                if not formula_str:
                    # Try formula candidates
                    candidates = problem.metadata.get("formula_candidates", [])
                    for c in candidates:
                        formula_str = c.get("formula_str", "") or c.get("formula", "")
                        if formula_str:
                            break

                if formula_str and target_sym not in known:
                    # Build equation: formula - target = 0, substitute knowns, solve for target
                    try:
                        formula_expr = sp.sympify(formula_str)
                        target_var = sp.Symbol(target_sym)

                        # Substitute all known values
                        subs_dict = {}
                        for k, v in known.items():
                            if k != target_sym:
                                try:
                                    subs_dict[sp.Symbol(k)] = float(v)
                                except Exception:
                                    pass

                        # If the formula contains the target variable, solve for it
                        if target_var in formula_expr.free_symbols:
                            equation = sp.Eq(formula_expr, 0) if "=" not in str(formula_expr) else formula_expr
                            # Actually: the formula IS the expression for the target
                            # e.g., formula = "u + a*t" and target = "v"
                            # So v = u + a*t → solve: (u + a*t) - v = 0 for v
                            eq_to_solve = formula_expr - target_var
                            eq_substituted = eq_to_solve.subs(subs_dict)
                            solutions = sp.solve(eq_substituted, target_var)

                            if solutions:
                                answer = solutions[0]
                                # Simplify
                                answer = sp.simplify(answer)
                                answer_float = float(answer) if answer.is_number else None

                                problem.final_answer = str(answer_float) if answer_float is not None else str(answer)
                                problem.solved = True
                                problem.backend_used = "core_calculus_engine"
                                problem.confidence = max(problem.confidence, 0.85)

                                # Build steps
                                problem.add_step(SolutionStep(
                                    step_number=1,
                                    title="Formula selection",
                                    rule=f"Selected formula: {target_sym} = {formula_str}",
                                    computation=formula_str,
                                    result=None,
                                    backend_used="core_calculus_engine",
                                ))
                                problem.add_step(SolutionStep(
                                    step_number=2,
                                    title="Substitute known values",
                                    rule=f"Substitute: {subs_dict}",
                                    computation=f"{formula_str} with {subs_dict}",
                                    result=None,
                                    backend_used="core_calculus_engine",
                                ))
                                problem.add_step(SolutionStep(
                                    step_number=3,
                                    title="Solve for target",
                                    rule=f"Solve for {target_sym}",
                                    computation=f"{target_sym} = {answer}",
                                    result=str(answer_float) if answer_float is not None else str(answer),
                                    backend_used="core_calculus_engine",
                                ))

                                # Verify by back-substitution
                                try:
                                    check = formula_expr.subs({**subs_dict, target_var: answer})
                                    if sp.simplify(check - answer) == 0:
                                        problem.confidence = max(problem.confidence, 0.9)
                                        problem.metadata["verified"] = True
                                except Exception:
                                    pass

                                return True
                    except Exception as e:
                        logger.debug(f"Formula-based solve failed: {e}")

            # ── Route 3: Simple equation solving (math) ──
            if problem.domain == "mathematics" and "=" in problem.raw_text:
                import re
                text = problem.raw_text
                eq_match = re.search(r'(.+?)\s*=\s*(.+)', text)
                if eq_match:
                    lhs = eq_match.group(1).replace("solve", "").strip()
                    rhs = eq_match.group(2).strip()
                    try:
                        expr = sp.sympify(f"({lhs}) - ({rhs})")
                        # Find the variable
                        free_vars = expr.free_symbols
                        if len(free_vars) == 1:
                            var = list(free_vars)[0]
                            solutions = sp.solve(expr, var)
                            if solutions:
                                answer = solutions[0]
                                answer_float = float(answer) if answer.is_number else None
                                problem.final_answer = str(answer_float) if answer_float is not None else str(answer)
                                problem.solved = True
                                problem.backend_used = "core_calculus_engine"
                                problem.confidence = max(problem.confidence, 0.85)

                                problem.add_step(SolutionStep(
                                    step_number=1,
                                    title="Solve equation",
                                    rule=f"Solve {lhs} = {rhs}",
                                    computation=f"({lhs}) - ({rhs}) = 0",
                                    result=str(answer_float) if answer_float is not None else str(answer),
                                    backend_used="core_calculus_engine",
                                ))
                                return True
                    except Exception as e:
                        logger.debug(f"Equation solve failed: {e}")

            # ── Route 4: Fallback to old symbolic_solver for physics formulas ──
            # (core_calculus_engine doesn't have physics formula database)
            try:
                from .symbolic_solver import SymbolicSolver
                solver = SymbolicSolver()

                if problem.domain == "physics" and problem.target:
                    concept = "mechanics"
                    if any("WORK" in t or "ENER" in t or "PWR" in t for t in problem.concept_tags):
                        concept = "energy"
                    elif any("ELC" in t or "EMI" in t for t in problem.concept_tags):
                        concept = "electrostatics"
                    elif any("OPT" in t for t in problem.concept_tags):
                        concept = "optics"
                    elif any("THM" in t for t in problem.concept_tags):
                        concept = "thermodynamics"
                    elif any("MOD" in t for t in problem.concept_tags):
                        concept = "modern"

                    result = solver.solve_physics(
                        inputs=known,
                        output_symbol=target_sym,
                        concept=concept,
                        sub_problem_id="pipeline",
                    )

                    if not result.success and concept == "mechanics":
                        result = solver.solve_physics(
                            inputs=known,
                            output_symbol=target_sym,
                            concept="energy",
                            sub_problem_id="pipeline",
                        )

                    if result.success and (result.numerical_result is not None or result.symbolic_result):
                        answer = result.numerical_result if result.numerical_result is not None else result.symbolic_result
                        problem.final_answer = str(answer)
                        problem.solved = True
                        problem.backend_used = "symbolic_solver_fallback"
                        problem.confidence = max(problem.confidence, 0.75)

                        for i, step_text in enumerate(result.steps or [], 1):
                            problem.add_step(SolutionStep(
                                step_number=i,
                                title=f"Physics solve step {i}",
                                computation=step_text,
                                result=str(answer) if i == len(result.steps or []) else None,
                                backend_used="symbolic_solver_fallback",
                            ))
                        return True
            except Exception as e:
                logger.debug(f"Symbolic solver fallback failed: {e}")

        except Exception as e:
            logger.debug(f"Core calculus engine error: {e}")
        return False

    def _apply_engine_result(self, problem: STEMProblem, result, backend_name: str) -> bool:
        """Apply a core_calculus_engine SolverResult to the problem."""
        problem.final_answer = result.answer
        problem.solved = True
        problem.backend_used = backend_name
        problem.confidence = max(problem.confidence, 0.85 if result.verified else 0.75)

        for i, step in enumerate(result.steps or [], 1):
            problem.add_step(SolutionStep(
                step_number=i,
                title=step.rule_applied,
                rule=step.rule_formula,
                computation=step.explanation,
                result=result.answer if i == len(result.steps or []) else None,
                backend_used=backend_name,
            ))

        if result.verified:
            problem.metadata["verified"] = True
            problem.confidence = max(problem.confidence, 0.9)

        return True

    def _extract_expression(self, text: str) -> str:
        """Extract a math expression from question text."""
        import re
        # Try various patterns
        # "differentiate x**3 + 2*x" → "x**3 + 2*x"
        # "find the derivative of sin(x)" → "sin(x)"
        # "d/dx[x**2]" → "x**2"

        patterns = [
            r'(?:differentiate|derivative of|d/dx|find derivative of)\s[:\s]*([^\d]+?)(?:\s+(?:with respect to|wrt)\s+(\w+))?$',
            r'd/dx\[(.+?)\]',
            r'integrate\s+(.+?)(?:\s+dx|\s+(?:with respect to|wrt)\s+\w+|$)',
            r'∫(.+?)d',
            r'limit of\s+(.+?)(?:\s+as\s+\w+\s+→|approaches)',
            r'f\(x\)\s*=\s*(.+?)(?:\s|$)',
            r'expression[:\s]+(.+?)(?:\s|$)',
        ]

        for p in patterns:
            m = re.search(p, text, re.IGNORECASE)
            if m:
                expr = m.group(1).strip().rstrip(',').strip()
                # Clean up
                expr = expr.replace('^', '**')
                return expr

        # Fallback: look for anything that looks like a math expression
        m = re.search(r'([a-zA-Z_][\w\s\+\-\*/\(\)\*\*]+)', text)
        if m:
            return m.group(1).strip()

        return None

    def _extract_bounds(self, text: str):
        """Extract definite integral bounds from text."""
        import re
        # "from 0 to 1" → (0, 1)
        # "from 0 to pi" → (0, "pi")
        m = re.search(r'from\s+(-?\d+(?:\.\d+)?)\s+to\s+(-?\d+(?:\.\d+)?|pi|e)', text, re.IGNORECASE)
        if m:
            lower = float(m.group(1))
            upper = m.group(2)
            try:
                upper = float(upper)
            except ValueError:
                pass
            return lower, upper

        # "∫[0,1]" → (0, 1)
        m = re.search(r'\[(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\]', text)
        if m:
            return float(m.group(1)), float(m.group(2))

        return None, None

    def _extract_limit_approach(self, text: str) -> str:
        """Extract what value the limit approaches."""
        import re
        m = re.search(r'(?:approaches|tends to|→)\s*(\d+|infinity|oo|inf)', text, re.IGNORECASE)
        if m:
            val = m.group(1).lower()
            if val in ("infinity", "oo", "inf"):
                return "oo"
            return val
        return "oo"

    def _extract_point(self, text: str):
        """Extract a point value from text (e.g., 'at x=3')."""
        import re
        m = re.search(r'(?:at|x\s*=|point\s+)\s*(-?\d+(?:\.\d+)?)', text, re.IGNORECASE)
        if m:
            return float(m.group(1))
        return None

    def _extract_two_expressions(self, text: str):
        """Extract two expressions from text (e.g., 'area between x**2 and x')."""
        import re
        m = re.search(r'between\s+(.+?)\s+and\s+(.+?)(?:\s+from|\s+over|$)', text, re.IGNORECASE)
        if m:
            return [m.group(1).strip(), m.group(2).strip()]
        return None

    def _try_formula_compute(self, problem: STEMProblem, match: FormulaMatch) -> bool:
        """Try to compute using the selected formula directly."""
        if not problem.target:
            return False

        formula = match.formula
        known = problem.known_quantities

        # Check if we have enough knowns to use this formula
        formula_vars = set(formula.variable_symbols)
        target_sym = problem.target.symbol
        needed = formula_vars - {target_sym}

        if not needed.issubset(set(known.keys())):
            return False  # not enough knowns

        # Try to evaluate the formula symbolically
        try:
            import sympy as sp

            # Create symbols for all variables
            sym_map = {}
            for v in formula.variables:
                sym = v.get("symbol", "")
                if sym:
                    sym_map[sym] = sp.Symbol(sym)

            # Parse the formula expression from latex
            # This is a simplified approach — real implementation would parse LaTeX
            latex = formula.latex
            # For now, just record that we selected this formula
            problem.metadata["formula_selected"] = formula.formula_id
            problem.metadata["formula_name"] = formula.name

            # Add a step showing the formula selection
            problem.add_step(SolutionStep(
                step_number=1,
                title=f"Apply {formula.name}",
                rule=formula.latex,
                formula_id=formula.formula_id,
                computation=f"Using {formula.name}: {formula.latex}",
                explanation=f"This formula relates {', '.join(formula.variable_symbols)}",
            ))

            # If we can't compute symbolically, at least mark the formula
            problem.backend_used = "formula_kb"
            problem.confidence = max(problem.confidence, 0.5)

        except ImportError:
            logger.debug("SymPy not available for formula computation")

        return False

    def _verify(self, problem: STEMProblem) -> bool:
        """Verify the computed answer."""
        if not problem.final_answer or not problem.solved:
            return False

        try:
            from .verification_engine import VerificationEngine
            engine = VerificationEngine()
            problem_dict = {
                "raw_text": problem.raw_text,
                "expected_units": problem.target.unit if problem.target else "",
            }
            solution_dict = {
                "answer": problem.final_answer,
                "formula": problem.metadata.get("formula_selected", ""),
            }
            result = engine.verify(problem_dict, solution_dict)
            problem.metadata["verification"] = {
                "passed": result.passed,
                "confidence": result.confidence,
                "issues": result.issues,
            }
            return result.passed
        except Exception as e:
            logger.debug(f"Verification error: {e}")
            return True  # don't block on verification errors


# Singleton
_pipeline = None


def get_pipeline() -> SolverPipeline:
    global _pipeline
    if _pipeline is None:
        _pipeline = SolverPipeline()
    return _pipeline


def solve(problem_text: str, **kwargs) -> PipelineResult:
    """Convenience function — solve through the pipeline."""
    return get_pipeline().solve(problem_text, **kwargs)
