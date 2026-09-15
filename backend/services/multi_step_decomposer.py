"""
multi_step_decomposer.py — Layer 5 (B7): Break multi-variable problems into steps.

Deterministic. No LLM. Backward chaining + DFS path finding.

Algorithm (per Fable design B7):
  Target → find formulas producing target → for each formula, if all inputs
  known, solve; else mark missing inputs as sub-targets → recurse → build
  ordered solve plan.

  Cycle detection prevents infinite recursion.

Author: Platform Backend Team
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Optional

from .stem_problem import STEMProblem, SolutionStep, Quantity
from .formula_selector import FormulaSelector, FormulaMatch, get_selector

logger = logging.getLogger(__name__)


@dataclass
class SolvePlanStep:
    """One step in a multi-step solve plan."""
    step_number: int
    formula_id: str
    formula_name: str
    formula_latex: str
    target_symbol: str
    inputs: list[str]          # variable symbols needed
    missing_inputs: list[str]  # inputs not yet known (will be solved in prior steps)
    is_ready: bool             # all inputs known at this point in the plan

    def to_dict(self) -> dict:
        return {
            "step_number": self.step_number,
            "formula_id": self.formula_id,
            "formula_name": self.formula_name,
            "formula_latex": self.formula_latex,
            "target_symbol": self.target_symbol,
            "inputs": self.inputs,
            "missing_inputs": self.missing_inputs,
            "is_ready": self.is_ready,
        }


@dataclass
class SolvePlan:
    """Ordered plan for solving a multi-step problem."""
    steps: list[SolvePlanStep] = field(default_factory=list)
    solvable: bool = False
    reason: str = ""
    formula_chain: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "steps": [s.to_dict() for s in self.steps],
            "solvable": self.solvable,
            "reason": self.reason,
            "formula_chain": self.formula_chain,
        }


class MultiStepDecomposer:
    """Layer 5 (B7): Decompose multi-step problems via backward chaining."""

    def __init__(self, selector: FormulaSelector = None, max_depth: int = 8):
        self.selector = selector or get_selector()
        self.max_depth = max_depth

    def decompose(self, problem: STEMProblem) -> SolvePlan:
        """Build a solve plan for the problem.

        Uses backward chaining from the target:
          1. Find formulas that produce the target
          2. For each formula, check which inputs are known
          3. For unknown inputs, recursively find formulas that produce them
          4. Build an ordered plan where each step's inputs are available
        """
        if not problem.target:
            return SolvePlan(solvable=False, reason="No target identified")

        target_symbol = problem.target.symbol
        known_symbols = set(problem.known_quantities.keys())

        # Try to find a plan via DFS
        plan_steps: list[SolvePlanStep] = []
        visited: set[str] = set()  # cycle detection
        formula_chain: list[str] = []

        success = self._backward_chain(
            target_symbol=target_symbol,
            known_symbols=known_symbols,
            problem=problem,
            plan_steps=plan_steps,
            formula_chain=formula_chain,
            visited=visited,
            depth=0,
        )

        if success and plan_steps:
            # Sort steps so that each step's inputs are available from prior steps
            ordered = self._order_steps(plan_steps, known_symbols)
            return SolvePlan(
                steps=ordered,
                solvable=True,
                formula_chain=formula_chain,
            )

        return SolvePlan(
            solvable=False,
            reason=f"Could not find formula path from knowns {known_symbols} to target {target_symbol}",
        )

    def _backward_chain(
        self,
        target_symbol: str,
        known_symbols: set[str],
        problem: STEMProblem,
        plan_steps: list[SolvePlanStep],
        formula_chain: list[str],
        visited: set[str],
        depth: int,
    ) -> bool:
        """Recursively find formulas to solve for target_symbol.

        Returns True if a complete plan was found.
        """
        if depth >= self.max_depth:
            return False

        if target_symbol in known_symbols:
            return True  # already known

        if target_symbol in visited:
            return False  # cycle
        visited.add(target_symbol)

        # Find formulas that can produce this target
        # Temporarily set the problem's target to this sub-target
        original_target = problem.target
        problem.target = type(original_target)(
            symbol=target_symbol,
            name=target_symbol,
            unit=original_target.unit if original_target else None,
        ) if original_target else None

        matches = self.selector.select(problem, max_results=10, min_score=0.2)

        # Restore original target
        problem.target = original_target

        # Filter to formulas that have target_symbol as a variable
        candidate_formulas = []
        for m in matches:
            if target_symbol in m.formula.variable_symbols:
                candidate_formulas.append(m)

        # Also search all formulas for ones that produce this target
        if not candidate_formulas:
            for formula in self.selector.kb.formulas:
                if target_symbol in formula.variable_symbols:
                    # Check if this formula's other variables are known or solvable
                    other_vars = [v for v in formula.variable_symbols if v != target_symbol]
                    known_others = sum(1 for v in other_vars if v in known_symbols)
                    if known_others >= len(other_vars) - 2:  # at most 2 unknowns
                        candidate_formulas.append(FormulaMatch(
                            formula=formula,
                            score=known_others / max(1, len(other_vars)),
                            known_vars=[v for v in other_vars if v in known_symbols],
                            missing_vars=[v for v in other_vars if v not in known_symbols],
                            target_matches=True,
                        ))

        for match in candidate_formulas:
            formula = match.formula
            other_vars = [v for v in formula.variable_symbols if v != target_symbol]
            missing = [v for v in other_vars if v not in known_symbols]

            if not missing:
                # All inputs known — this is a leaf step
                plan_steps.append(SolvePlanStep(
                    step_number=0,  # will be reordered
                    formula_id=formula.formula_id,
                    formula_name=formula.name,
                    formula_latex=formula.latex,
                    target_symbol=target_symbol,
                    inputs=other_vars,
                    missing_inputs=[],
                    is_ready=True,
                ))
                formula_chain.append(formula.formula_id)
                visited.discard(target_symbol)
                return True

            # Try to solve for the missing inputs recursively
            sub_success = True
            for missing_var in missing:
                sub_success = self._backward_chain(
                    target_symbol=missing_var,
                    known_symbols=known_symbols,
                    problem=problem,
                    plan_steps=plan_steps,
                    formula_chain=formula_chain,
                    visited=visited,
                    depth=depth + 1,
                )
                if not sub_success:
                    break

            if sub_success:
                # All sub-targets are solvable — add this step
                plan_steps.append(SolvePlanStep(
                    step_number=0,
                    formula_id=formula.formula_id,
                    formula_name=formula.name,
                    formula_latex=formula.latex,
                    target_symbol=target_symbol,
                    inputs=other_vars,
                    missing_inputs=missing,
                    is_ready=True,  # will be true after ordering
                ))
                formula_chain.append(formula.formula_id)
                visited.discard(target_symbol)
                return True

        visited.discard(target_symbol)
        return False

    def _order_steps(
        self,
        steps: list[SolvePlanStep],
        initial_known: set[str],
    ) -> list[SolvePlanStep]:
        """Order steps so each step's inputs are available from prior steps or initial knowns."""
        ordered: list[SolvePlanStep] = []
        remaining = list(steps)
        available = set(initial_known)

        while remaining:
            progressed = False
            for step in remaining[:]:
                # Check if all inputs are available
                all_inputs = set(step.inputs)
                if all_inputs.issubset(available) or not step.inputs:
                    step.step_number = len(ordered) + 1
                    step.is_ready = True
                    ordered.append(step)
                    available.add(step.target_symbol)
                    remaining.remove(step)
                    progressed = True
                    break

            if not progressed:
                # No step is ready — add remaining in original order
                for step in remaining:
                    step.step_number = len(ordered) + 1
                    step.is_ready = all(set(step.inputs).issubset(available) for _ in [1])
                    ordered.append(step)
                break

        return ordered


# Singleton
_decomposer = None


def get_decomposer() -> MultiStepDecomposer:
    global _decomposer
    if _decomposer is None:
        _decomposer = MultiStepDecomposer()
    return _decomposer


def decompose(problem: STEMProblem) -> SolvePlan:
    """Convenience function."""
    return get_decomposer().decompose(problem)
