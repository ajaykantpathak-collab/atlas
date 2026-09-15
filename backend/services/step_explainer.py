"""
step_explainer.py — Layer 7a (B11): Convert solve trace into human-readable steps.

Deterministic. No LLM. Template-based text generation.

Takes the solution steps from the solver and produces numbered,
pedagogical explanations with formula, substitution, and result.

Author: Platform Backend Team
"""

from __future__ import annotations

import re
from typing import Optional

from .stem_problem import STEMProblem, SolutionStep


# ──────────────────────────────────────────────────────────────────────────────
# Explanation templates
# ──────────────────────────────────────────────────────────────────────────────

STEP_TEMPLATES = {
    "substitution": (
        "**Step {step_number}: Substitute values into {formula_name}**\n\n"
        "Formula: `{formula_latex}`\n\n"
        "Substituting:\n"
        "```\n{substitution}\n```\n\n"
        "Result: **{result}**\n"
    ),
    "algebraic_solve": (
        "**Step {step_number}: Solve the equation**\n\n"
        "Equation: `{expression_before}`\n\n"
        "Solving for `{target}`:\n"
        "```\n{computation}\n```\n\n"
        "**{target} = {result}**\n"
    ),
    "compute": (
        "**Step {step_number}: Calculate {title}**\n\n"
        "```\n{computation}\n```\n\n"
        "**Result: {result}**\n"
    ),
    "apply_formula": (
        "**Step {step_number}: Apply {formula_name}**\n\n"
        "Using: `{formula_latex}`\n\n"
        "```\n{substitution}\n  = {result}\n```\n"
    ),
    "verify": (
        "**Step {step_number}: Verify the answer**\n\n"
        "{computation}\n\n"
        "Verification: **{result}**\n"
    ),
    "default": (
        "**Step {step_number}: {title}**\n\n"
        "{computation}\n\n"
        "Result: **{result}**\n"
    ),
}

FINAL_ANSWER_TEMPLATE = (
    "\n---\n\n**Final Answer:** `{answer}`\n\n"
    "Confidence: {confidence:.0%}\n"
    "Method: {method}\n"
)

# Unit formatting map — make units look nice in output
UNIT_FORMAT = {
    "m/s^2": "m/s²", "m/s": "m/s", "kg": "kg", "m": "m",
    "N": "N", "J": "J", "W": "W", "Pa": "Pa", "K": "K",
    "deg": "°", "rad": "rad", "ohm": "Ω", "A": "A", "V": "V",
    "C": "C", "Hz": "Hz", "mol": "mol", "mol/L": "mol/L",
}


def format_unit(unit: Optional[str]) -> str:
    """Format a unit string for display."""
    if not unit:
        return ""
    return UNIT_FORMAT.get(unit, unit)


def format_value(value) -> str:
    """Format a numeric value for display."""
    if value is None:
        return "unknown"
    if isinstance(value, float):
        # Clean up floating point
        if abs(value) < 1e-10:
            return "0"
        if abs(value) >= 1e6 or abs(value) < 1e-4:
            return f"{value:.6g}"
        # Try to get a clean representation
        if value == int(value):
            return str(int(value))
        return f"{value:.4f}".rstrip("0").rstrip(".")
    return str(value)


class StepExplainer:
    """Layer 7a (B11): Generate human-readable step-by-step explanations."""

    def explain(self, problem: STEMProblem) -> str:
        """Convert a solved STEMProblem into a formatted explanation string."""
        if not problem.steps:
            if problem.final_answer:
                return f"**Answer:** `{problem.final_answer}`"
            return "No solution steps available."

        parts: list[str] = []

        # Header
        if problem.subject:
            parts.append(f"**{problem.subject.title()} Problem**\n")

        # Steps
        for step in problem.steps:
            parts.append(self._explain_step(step))

        # Final answer
        if problem.final_answer:
            parts.append(
                FINAL_ANSWER_TEMPLATE.format(
                    answer=problem.final_answer,
                    confidence=problem.confidence,
                    method=problem.backend_used or "deterministic",
                )
            )

        return "\n".join(parts)

    def _explain_step(self, step: SolutionStep) -> str:
        """Explain a single step using the appropriate template."""
        # Determine which template to use
        template_key = "default"

        if step.formula_id or step.rule:
            if step.computation and "=" in step.computation:
                template_key = "apply_formula"
            else:
                template_key = "substitution"
        elif step.computation and "=" in step.computation:
            template_key = "algebraic_solve"
        elif step.computation:
            template_key = "compute"

        # Check for verification step
        if "verify" in step.title.lower() or "check" in step.title.lower():
            template_key = "verify"

        template = STEP_TEMPLATES.get(template_key, STEP_TEMPLATES["default"])

        # Format the template
        try:
            text = template.format(
                step_number=step.step_number,
                title=step.title,
                formula_name=step.rule or step.formula_id or "the formula",
                formula_latex=step.rule or "",
                substitution=step.computation or step.expression_before or "",
                expression_before=step.expression_before or "",
                computation=step.computation or "",
                result=format_value(step.result) if step.result else "",
                target=step.title.split()[-1] if step.title else "unknown",
            )
        except (KeyError, ValueError):
            # Fallback to default
            text = STEP_TEMPLATES["default"].format(
                step_number=step.step_number,
                title=step.title,
                computation=step.computation or "",
                result=format_value(step.result) if step.result else "",
            )

        # Add explanation if present
        if step.explanation:
            text += f"\n{step.explanation}\n"

        return text

    def explain_plan(self, plan_steps: list) -> str:
        """Explain a solve plan (before execution)."""
        if not plan_steps:
            return "No solve plan could be constructed."

        parts = ["**Solve Plan:**\n"]
        for step in plan_steps:
            parts.append(
                f"{step.step_number}. Use **{step.formula_name}** "
                f"(`{step.formula_latex}`) to find `{step.target_symbol}`"
            )
            if step.inputs:
                parts.append(f"   - Inputs needed: {', '.join(step.inputs)}")
            if step.missing_inputs:
                parts.append(f"   - Will be computed in prior steps: {', '.join(step.missing_inputs)}")
            parts.append("")

        return "\n".join(parts)


# Singleton
_explainer = None


def get_explainer() -> StepExplainer:
    global _explainer
    if _explainer is None:
        _explainer = StepExplainer()
    return _explainer


def explain(problem: STEMProblem) -> str:
    """Convenience function."""
    return get_explainer().explain(problem)
