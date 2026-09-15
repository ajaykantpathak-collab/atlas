"""Board-aware answer formatter — formats solver output for CBSE or CISCE.

CBSE format:
  - Step-by-step marking (1 mark per correct step)
  - Formula stated explicitly before substitution
  - Final answer with units and box notation
  - "Hence, the answer is ..." conclusion
  - Uses CBSE terminology (e.g., "derivative", "integration")

CISCE format:
  - Rubric-based (criteria from .marker files)
  - More descriptive explanations
  - "Therefore" conclusion style
  - Uses CISCE terminology (e.g., "differential coefficient", "integration")
  - Includes scope boundary notes when relevant

Usage:
    from services.board_formatter import BoardFormatter

    formatted = BoardFormatter.format_solver_result(
        result=solver_result,
        board="CBSE",
        max_marks=3,
    )
"""

import logging
from typing import Optional, Dict, Any, List
from dataclasses import dataclass, field

logger = logging.getLogger(__name__)


@dataclass
class FormattedAnswer:
    """Board-formatted solver answer."""
    board: str
    steps: List[Dict[str, Any]] = field(default_factory=list)
    final_answer: str = ""
    marking_scheme: str = ""
    max_marks: int = 0
    marks_per_step: List[Dict[str, Any]] = field(default_factory=list)
    conclusion: str = ""
    scope_note: str = ""


class BoardFormatter:
    """Formats solver results for CBSE or CISCE examination style."""

    # CBSE marking conventions (2025-26)
    CBSE_MARKING = {
        1: {"content": 1, "expression": 0},
        2: {"content": 1, "expression": 1},
        3: {"content": 2, "expression": 1},
        4: {"content": 3, "expression": 1},
        5: {"content": 3, "expression": 2},
        6: {"content": 3, "expression": 2, "accuracy": 1},
    }

    # CISCE marking conventions
    CISCE_MARKING = {
        1: {"content": 1, "expression": 0},
        2: {"content": 1, "expression": 1},
        3: {"content": 2, "expression": 1},
        4: {"content": 3, "expression": 1},
        5: {"content": 3, "expression": 2},
        6: {"content": 4, "expression": 2},
    }

    @classmethod
    def format_solver_result(
        cls,
        result: Any,
        board: str = "CBSE",
        max_marks: int = 3,
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
    ) -> FormattedAnswer:
        """Format a SolverResult for the specified board.

        Args:
            result: SolverResult or dict from the solver.
            board: "CBSE" or "CISCE".
            max_marks: Maximum marks for the question.
            subject: Optional subject for terminology.
            class_level: Optional class level for scope.

        Returns:
            FormattedAnswer with board-specific steps and marking.
        """
        board = board.upper().strip()
        if board not in ("CBSE", "CISCE"):
            board = "CBSE"  # Default to CBSE

        # Extract steps from result
        steps = cls._extract_steps(result)
        final_answer = cls._extract_answer(result)

        if board == "CBSE":
            return cls._format_cbse(steps, final_answer, max_marks, subject, class_level)
        else:
            return cls._format_cisce(steps, final_answer, max_marks, subject, class_level)

    @staticmethod
    def _extract_steps(result: Any) -> List[Dict[str, Any]]:
        """Extract steps from a SolverResult or dict."""
        if hasattr(result, "to_dict"):
            d = result.to_dict()
        elif isinstance(result, dict):
            d = result
        else:
            return []

        steps = d.get("steps", [])
        formatted = []
        for i, step in enumerate(steps, 1):
            if isinstance(step, dict):
                formatted.append({
                    "step_number": i,
                    "label": step.get("label", f"Step {i}"),
                    "rule": step.get("rule", ""),
                    "formula": step.get("formula", ""),
                    "before": step.get("before", ""),
                    "after": step.get("after", ""),
                    "explanation": step.get("explanation", ""),
                })
            else:
                formatted.append({
                    "step_number": i,
                    "label": str(step),
                    "rule": "",
                    "formula": "",
                    "before": "",
                    "after": "",
                    "explanation": str(step),
                })
        return formatted

    @staticmethod
    def _extract_answer(result: Any) -> str:
        """Extract the final answer from a SolverResult or dict."""
        if hasattr(result, "answer"):
            return str(result.answer) if result.answer is not None else ""
        if isinstance(result, dict):
            return str(result.get("answer", result.get("final_answer", "")))
        return ""

    @classmethod
    def _format_cbse(
        cls,
        steps: List[Dict[str, Any]],
        final_answer: str,
        max_marks: int,
        subject: Optional[str],
        class_level: Optional[int],
    ) -> FormattedAnswer:
        """Format for CBSE examination style.

        CBSE marking (2025-26):
        - 3-mark: Content=2, Expression=1
        - 6-mark: Content=3, Expression=2, Accuracy=1
        - Step-by-step: 1 mark per correct step
        - Formula must be stated before substitution
        - Final answer in box notation
        """
        marking = cls.CBSE_MARKING.get(max_marks, {"content": max_marks - 1, "expression": 1})

        # Build CBSE-formatted steps with mark allocation
        cbse_steps = []
        marks_per_step = []
        total_steps = len(steps)
        step_marks = max_marks / max(total_steps, 1) if total_steps > 0 else 0

        for step in steps:
            cbse_steps.append({
                **step,
                "format": "CBSE",
                "instruction": f"Write the formula: {step.get('formula', step.get('rule', ''))}",
                "mark_allocation": f"{step_marks:.1f} marks",
            })
            marks_per_step.append({
                "step": step["step_number"],
                "marks": round(step_marks, 1),
                "criterion": "Correct formula and substitution",
            })

        # CBSE conclusion style
        conclusion = f"Hence, the answer is {final_answer}." if final_answer else ""

        # CBSE marking scheme text
        marking_scheme = cls._build_cbse_marking_scheme(max_marks, marking, total_steps)

        return FormattedAnswer(
            board="CBSE",
            steps=cbse_steps,
            final_answer=f"\\boxed{{{final_answer}}}" if final_answer else "",
            marking_scheme=marking_scheme,
            max_marks=max_marks,
            marks_per_step=marks_per_step,
            conclusion=conclusion,
            scope_note="",
        )

    @classmethod
    def _format_cisce(
        cls,
        steps: List[Dict[str, Any]],
        final_answer: str,
        max_marks: int,
        subject: Optional[str],
        class_level: Optional[int],
    ) -> FormattedAnswer:
        """Format for CISCE (ICSE/ISC) examination style.

        CISCE marking:
        - Rubric-based with criteria
        - More descriptive explanations expected
        - "Therefore" conclusion style
        - Scope boundary notes from .marker files
        - Uses CISCE terminology
        """
        marking = cls.CISCE_MARKING.get(max_marks, {"content": max_marks - 1, "expression": 1})

        # Build CISCE-formatted steps with rubric criteria
        cisce_steps = []
        marks_per_step = []
        total_steps = len(steps)

        # CISCE allocates marks by rubric criteria, not per-step
        criteria = cls._build_cisce_criteria(max_marks, marking, total_steps)

        for step in steps:
            cisce_steps.append({
                **step,
                "format": "CISCE",
                "instruction": f"Show working: {step.get('rule', step.get('label', ''))}",
                "rubric_note": "Credit awarded for method and accuracy",
            })

        for i, crit in enumerate(criteria):
            marks_per_step.append({
                "criterion": crit["name"],
                "marks": crit["marks"],
                "description": crit["description"],
            })

        # CISCE conclusion style
        conclusion = f"Therefore, the required answer is {final_answer}." if final_answer else ""

        # CISCE marking scheme text
        marking_scheme = cls._build_cisce_marking_scheme(max_marks, marking, criteria)

        # Scope note for CISCE
        scope_note = cls._get_cisce_scope_note(subject, class_level)

        return FormattedAnswer(
            board="CISCE",
            steps=cisce_steps,
            final_answer=final_answer,
            marking_scheme=marking_scheme,
            max_marks=max_marks,
            marks_per_step=marks_per_step,
            conclusion=conclusion,
            scope_note=scope_note,
        )

    @classmethod
    def _build_cbse_marking_scheme(
        cls,
        max_marks: int,
        marking: Dict[str, int],
        total_steps: int,
    ) -> str:
        """Build CBSE marking scheme text."""
        parts = [f"Total Marks: {max_marks}"]
        for component, marks in marking.items():
            parts.append(f"  {component.replace('_', ' ').title()}: {marks} marks")
        if total_steps > 0:
            per_step = max_marks / total_steps
            parts.append(f"  Step-wise: {per_step:.1f} marks per correct step")
        parts.append("  Note: No marks for cross-heading errors. Use correct CBSE terminology.")
        return "\n".join(parts)

    @classmethod
    def _build_cisce_criteria(
        cls,
        max_marks: int,
        marking: Dict[str, int],
        total_steps: int,
    ) -> List[Dict[str, Any]]:
        """Build CISCE rubric criteria."""
        criteria = []
        for component, marks in marking.items():
            criteria.append({
                "name": component.replace("_", " ").title(),
                "marks": marks,
                "description": f"Award {marks} mark(s) for correct {component.replace('_', ' ')}",
            })
        return criteria

    @classmethod
    def _build_cisce_marking_scheme(
        cls,
        max_marks: int,
        marking: Dict[str, int],
        criteria: List[Dict[str, Any]],
    ) -> str:
        """Build CISCE marking scheme text."""
        parts = [f"Total Marks: {max_marks}", "Rubric Criteria:"]
        for crit in criteria:
            parts.append(f"  {crit['name']}: {crit['marks']} marks — {crit['description']}")
        parts.append("  Note: ICSE/ISC examiner awards marks for method, accuracy, and presentation.")
        parts.append("  Use correct terminology as per CISCE syllabus.")
        return "\n".join(parts)

    @staticmethod
    def _get_cisce_scope_note(subject: Optional[str], class_level: Optional[int]) -> str:
        """Get a scope boundary note for CISCE."""
        if not subject or not class_level:
            return ""
        notes = {
            ("maths", 10): "ICSE scope: Do not use calculus. Use factor theorem and quadratic methods.",
            ("maths", 12): "ISC scope: Calculus allowed. Use derivatives and integration as per ISC syllabus.",
            ("physics", 10): "ICSE scope: Use SI units. Numerical problems should show formula, substitution, and result.",
            ("physics", 12): "ISC scope: Derivations expected. Show all steps in derivation.",
            ("chemistry", 10): "ICSE scope: Balanced equations required. Show state symbols where applicable.",
            ("chemistry", 12): "ISC scope: Mechanisms may be required for organic chemistry.",
            ("biology", 10): "ICSE scope: Labelled diagrams required where specified.",
            ("biology", 12): "ISC scope: Detailed explanations expected. Diagrams should be labelled.",
        }
        return notes.get((subject.lower() if subject else "", class_level), "")

    @classmethod
    def format_evaluation_feedback(
        cls,
        board: str,
        marks_awarded: int,
        max_marks: int,
        criteria_met: list,
        criteria_missed: list,
    ) -> str:
        """Format evaluation feedback for the specified board.

        Args:
            board: "CBSE" or "CISCE".
            marks_awarded: Marks awarded to the student.
            max_marks: Maximum possible marks.
            criteria_met: List of criteria the student met.
            criteria_missed: List of criteria the student missed.

        Returns:
            Board-specific feedback string.
        """
        board = board.upper().strip()
        percentage = (marks_awarded / max_marks * 100) if max_marks > 0 else 0

        if board == "CBSE":
            feedback_parts = [f"CBSE Evaluation: {marks_awarded}/{max_marks} marks ({percentage:.0f}%)"]
            if criteria_missed:
                feedback_parts.append(f"Areas to improve: {', '.join(criteria_missed)}")
            if percentage >= 80:
                feedback_parts.append("Excellent! Meets CBSE competency standards.")
            elif percentage >= 60:
                feedback_parts.append("Good. Review missed steps for full marks.")
            else:
                feedback_parts.append("Needs improvement. Practice step-by-step CBSE method.")
        else:
            feedback_parts = [f"CISCE Evaluation: {marks_awarded}/{max_marks} marks ({percentage:.0f}%)"]
            if criteria_missed:
                feedback_parts.append(f"Rubric criteria missed: {', '.join(criteria_missed)}")
            if percentage >= 80:
                feedback_parts.append("Excellent work! Meets ICSE/ISC standards.")
            elif percentage >= 60:
                feedback_parts.append("Satisfactory. Focus on rubric criteria for higher marks.")
            else:
                feedback_parts.append("Below standard. Review CISCE marking rubric carefully.")

        return " | ".join(feedback_parts)
