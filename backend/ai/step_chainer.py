"""Step Chainer — connects steps in a multi-step problem.

Handles:
1. Auto-filling inputs from previous step outputs
2. Tracking step results across the chain
3. Suggesting next steps
4. Building the complete solution explanation

This is the orchestration layer that ties step_types, problem_types,
and solver_engine together.
"""

import logging
from dataclasses import dataclass, field
from typing import Optional, Any

from backend.ai.solver_engine import execute, SolverResult
from backend.ai.input_converter import convert, convert_matrix, convert_vector
from backend.ai.step_types import get_step_type, StepType
from backend.ai.problem_types import get_problem_type, ProblemType, ProblemStep

logger = logging.getLogger(__name__)


@dataclass
class StepExecution:
    """Result of executing one step in a chain."""
    step_index: int
    step_type_id: str
    label: str
    inputs: dict           # what was input (after conversion)
    result: SolverResult   # solver result
    raw_inputs: dict       # original inputs before conversion


@dataclass
class ChainResult:
    """Result of executing a full problem chain."""
    problem_type_id: str
    success: bool
    steps: list = field(default_factory=list)  # list of StepExecution
    final_answer: str = ""
    all_verified: bool = True
    explanation: list = field(default_factory=list)  # step-by-step text
    error: str = ""


class StepChainer:
    """Orchestrates multi-step problem solving."""

    def __init__(self, timeout: int = 10):
        self.timeout = timeout

    def solve_problem(self, problem_type_id: str,
                      step_inputs: list) -> ChainResult:
        """Execute a full problem type chain.

        Args:
            problem_type_id: ID of the problem type
            step_inputs: List of input dicts, one per step.
                         Each dict has the field values the student provided.
                         Auto-filled fields can be left empty.

        Returns:
            ChainResult with all step results and final answer
        """
        pt = get_problem_type(problem_type_id)
        if pt is None:
            return ChainResult(problem_type_id=problem_type_id, success=False,
                              error=f"Unknown problem type: {problem_type_id}")

        if len(step_inputs) != len(pt.steps):
            return ChainResult(problem_type_id=problem_type_id, success=False,
                              error=f"Expected {len(pt.steps)} steps, got {len(step_inputs)}")

        chain = ChainResult(problem_type_id=problem_type_id, success=True)
        step_results = []  # store for auto-fill lookups

        for i, (p_step, inputs) in enumerate(zip(pt.steps, step_inputs)):
            # Resolve auto-fill fields
            resolved_inputs = self._resolve_auto_fill(
                p_step, inputs, step_results, pt.steps
            )

            # Convert inputs using input_converter
            converted_inputs = self._convert_inputs(
                p_step.step_type_id, resolved_inputs
            )

            # Get step type definition
            st = get_step_type(p_step.step_type_id)
            if st is None:
                chain.success = False
                chain.error = f"Unknown step type: {p_step.step_type_id}"
                break

            # Execute the operation
            result = execute(st.operation, converted_inputs, timeout=self.timeout)

            # Store execution
            exec_result = StepExecution(
                step_index=i,
                step_type_id=p_step.step_type_id,
                label=p_step.label,
                inputs=converted_inputs,
                result=result,
                raw_inputs=resolved_inputs,
            )
            step_results.append(exec_result)
            chain.steps.append(exec_result)

            # Track verification
            if not result.verified:
                chain.all_verified = False

            # Build explanation
            chain.explanation.append(f"\n{'='*60}")
            chain.explanation.append(f"Step {i+1}: {p_step.label}")
            chain.explanation.append(f"{'='*60}")
            if result.success:
                for step_text in result.steps:
                    chain.explanation.append(f"  {step_text}")
                chain.explanation.append(f"  → Answer: {result.answer}")
                if result.verification_msg:
                    status = "✓" if result.verified else "✗"
                    chain.explanation.append(f"  Verification {status}: {result.verification_msg}")
            else:
                chain.explanation.append(f"  ERROR: {result.error}")
                chain.success = False
                chain.error = f"Step {i+1} failed: {result.error}"
                break

        # Set final answer from last successful step
        if chain.success and chain.steps:
            chain.final_answer = chain.steps[-1].result.answer

        return chain

    def solve_single_step(self, step_type_id: str,
                          inputs: dict) -> StepExecution:
        """Execute a single step (not part of a chain).

        Useful for standalone operations.
        """
        st = get_step_type(step_type_id)
        if st is None:
            return StepExecution(
                step_index=0, step_type_id=step_type_id, label="Unknown",
                inputs=inputs,
                result=SolverResult(success=False, error=f"Unknown step type: {step_type_id}"),
                raw_inputs=inputs,
            )

        converted = self._convert_inputs(step_type_id, inputs)
        result = execute(st.operation, converted, timeout=self.timeout)

        return StepExecution(
            step_index=0, step_type_id=step_type_id, label=st.name,
            inputs=converted, result=result, raw_inputs=inputs,
        )

    def _resolve_auto_fill(self, p_step: ProblemStep, inputs: dict,
                           previous_results: list,
                           all_steps: list) -> dict:
        """Resolve auto-filled fields from previous step outputs.

        Auto-fill mapping format:
            {"previous.answer_raw": "expression"}  → take previous step's answer_raw, put in "expression"
            {"step_0.inputs.expression": "expression"}  → take step 0's input "expression"
            {"step_1.answer_raw": "point"}  → take step 1's answer_raw, put in "point"
        """
        resolved = dict(inputs)  # copy student inputs

        for source, target_field in p_step.auto_fill.items():
            # Only auto-fill if the student didn't provide a value
            if resolved.get(target_field):
                continue  # student provided their own value

            value = self._extract_value(source, previous_results, all_steps)
            if value is not None:
                resolved[target_field] = str(value)

        return resolved

    def _extract_value(self, source: str, previous_results: list,
                       all_steps: list) -> Optional[Any]:
        """Extract a value from previous step results based on source path.

        Source formats:
            "previous.answer_raw" → last step's answer_raw
            "previous.answer" → last step's answer (string)
            "step_N.inputs.field" → step N's input field
            "step_N.answer_raw" → step N's answer_raw
        """
        parts = source.split(".")
        value = None

        if parts[0] == "previous" and previous_results:
            last = previous_results[-1]
            attr = parts[1] if len(parts) > 1 else "answer_raw"
            if attr == "answer_raw":
                value = last.result.answer_raw
            elif attr == "answer":
                value = last.result.answer
            elif attr == "inputs":
                field_name = parts[2] if len(parts) > 2 else None
                if field_name and field_name in last.inputs:
                    value = last.inputs[field_name]

        elif parts[0].startswith("step_"):
            try:
                step_idx = int(parts[0].split("_")[1])
                if step_idx < len(previous_results):
                    exec_result = previous_results[step_idx]
                    attr = parts[1] if len(parts) > 1 else "answer_raw"
                    if attr == "answer_raw":
                        value = exec_result.result.answer_raw
                    elif attr == "answer":
                        value = exec_result.result.answer
                    elif attr == "inputs":
                        field_name = parts[2] if len(parts) > 2 else None
                        if field_name and field_name in exec_result.inputs:
                            value = exec_result.inputs[field_name]
                    elif attr == "raw_inputs":
                        field_name = parts[2] if len(parts) > 2 else None
                        if field_name and field_name in exec_result.raw_inputs:
                            value = exec_result.raw_inputs[field_name]
            except (ValueError, IndexError):
                pass

        # If value is a list (e.g. multiple critical points), take first element
        if isinstance(value, list):
            if len(value) == 1:
                value = value[0]
            elif len(value) > 1:
                value = value[0]  # take first for now

        return value

    def _convert_inputs(self, step_type_id: str, inputs: dict) -> dict:
        """Convert input values using input_converter based on field types."""
        st = get_step_type(step_type_id)
        if st is None:
            return inputs

        converted = {}
        for field_def in st.inputs:
            name = field_def.name
            value = inputs.get(name, field_def.default)

            if not value:
                converted[name] = value
                continue

            # Convert based on field type
            if field_def.field_type == "expression":
                converted[name] = convert(str(value))
            elif field_def.field_type == "matrix":
                converted[name] = convert_matrix(str(value))
            elif field_def.field_type == "vector":
                converted[name] = convert_vector(str(value))
            elif field_def.field_type == "variable":
                # Just strip whitespace
                converted[name] = str(value).strip()
            elif field_def.field_type == "number":
                converted[name] = str(value).strip()
            elif field_def.field_type == "point":
                converted[name] = convert(str(value))
            elif field_def.field_type == "list":
                # For equations or corner points — split by newline
                if isinstance(value, str):
                    converted[name] = [line.strip() for line in value.split("\n") if line.strip()]
                elif isinstance(value, list):
                    converted[name] = value
                else:
                    converted[name] = [str(value)]
            else:
                converted[name] = str(value)

        return converted

    def get_step_form(self, problem_type_id: str, step_index: int) -> dict:
        """Get the form definition for a specific step in a problem.

        Returns a dict with:
            - step_type_id
            - label
            - fields: list of field definitions
            - thinking: thinking question (if any)
            - auto_filled: which fields will be auto-filled
        """
        pt = get_problem_type(problem_type_id)
        if pt is None or step_index >= len(pt.steps):
            return {}

        p_step = pt.steps[step_index]
        st = get_step_type(p_step.step_type_id)
        if st is None:
            return {}

        return {
            "step_index": step_index,
            "step_type_id": st.id,
            "label": p_step.label,
            "name": st.name,
            "description": st.description,
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
            "auto_fill": p_step.auto_fill,
            "next_steps": st.next_steps,
            "marks": st.marks,
            "hint": st.hint,
        }

    def get_problem_overview(self, problem_type_id: str) -> dict:
        """Get an overview of a problem type — all steps, thinking question, etc."""
        pt = get_problem_type(problem_type_id)
        if pt is None:
            return {}

        return {
            "id": pt.id,
            "name": pt.name,
            "description": pt.description,
            "topic": pt.topic,
            "class_level": pt.class_level,
            "board": pt.board,
            "marks": pt.marks,
            "example": pt.example,
            "num_steps": len(pt.steps),
            "steps": [
                {
                    "index": i,
                    "label": s.label,
                    "step_type": s.step_type_id,
                }
                for i, s in enumerate(pt.steps)
            ],
            "thinking": {
                "question": pt.thinking.question,
                "options": pt.thinking.options,
                "correct": pt.thinking.correct,
                "explanation": pt.thinking.explanation,
            } if pt.thinking else None,
            "hint": pt.hint,
            "setup_help": pt.setup_help,
        }
