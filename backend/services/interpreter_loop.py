"""Interpreter loop — 5-strategy verification for student answers.

Chains multiple verification strategies in order of precision:
  1. SYMBOLIC: sympify both, check simplify(a-b)==0
  2. NUMERICAL: sample 100 random points, compare
  3. UNIT: pint normalizes units before comparing
  4. CHEMICAL: chempy for reactions, molar mass, formula comparison
  5. FALLBACK: escalate to Tier 2 (cross-encoder)

The loop tries strategies in order and stops at the first definitive result.
If all strategies fail or are inconclusive, it escalates to Tier 2.

Usage:
    from backend.services.interpreter_loop import InterpreterLoop

    loop = InterpreterLoop()
    result = loop.verify(
        student_answer="x^2 + 2x + 1",
        model_answer="(x+1)^2",
        question_type="short_answer",
    )
    # result = {
    #     "match": True,
    #     "strategy": "symbolic",
    #     "confidence": 0.95,
    #     "escalate": False,
    # }
"""

from dataclasses import dataclass, field
from typing import Optional

try:
    from services.ner_extractor import NERExtractor, ExtractedEntities
    from services.sandbox import Sandbox, SandboxResult
except ImportError:
    from backend.services.ner_extractor import NERExtractor, ExtractedEntities
    from backend.services.sandbox import Sandbox, SandboxResult


@dataclass
class VerificationResult:
    """Result of the interpreter loop verification."""
    match: bool
    strategy: str
    confidence: float
    escalate: bool = False  # If True, escalate to Tier 2
    error: Optional[str] = None
    entities: Optional[dict] = None
    attempts: list = field(default_factory=list)  # List of strategies tried


class InterpreterLoop:
    """5-strategy verification loop for student answers.

    Uses NER extraction to detect what kind of entities are in the answer,
    then applies the appropriate verification strategies in order.
    """

    def __init__(self):
        self.ner = NERExtractor()
        self.sandbox = Sandbox()

    def verify(
        self,
        student_answer: str,
        model_answer: str,
        question_type: Optional[str] = None,
        key_concepts: Optional[list] = None,
    ) -> VerificationResult:
        """Verify a student answer against the model answer.

        Args:
            student_answer: The student's free-text answer.
            model_answer: The correct/model answer.
            question_type: Optional question type hint (e.g., "numerical", "mcq").
            key_concepts: Optional list of key concepts to check.

        Returns:
            VerificationResult with match status, strategy used, and confidence.
        """
        # Extract entities from both answers
        student_entities = self.ner.extract(student_answer)
        model_entities = self.ner.extract(model_answer)

        attempts = []

        # ── Strategy selection based on entity types ── #

        # If chemicals detected, try chemical verification first
        if student_entities.has_chemistry and model_entities.has_chemistry:
            result = self._try_chemical(student_entities, model_entities)
            attempts.append("chemical")
            if result is not None:
                return VerificationResult(
                    match=result.match,
                    strategy=result.strategy,
                    confidence=0.90 if result.match else 0.80,
                    escalate=not result.match and result.error is not None,
                    error=result.error,
                    entities=self._entities_to_dict(student_entities, model_entities),
                    attempts=attempts,
                )

        # If units detected, try unit verification FIRST (before symbolic)
        if student_entities.has_units and model_entities.has_units:
            result = self._try_units(student_entities, model_entities)
            attempts.append("unit")
            if result is not None and result.match:
                return VerificationResult(
                    match=True,
                    strategy="unit",
                    confidence=0.90,
                    entities=self._entities_to_dict(student_entities, model_entities),
                    attempts=attempts,
                )

        # If math expressions detected (and not just unit-related), try symbolic then numerical
        # Also try if one side has math and the other has a simple number
        if (student_entities.has_math and model_entities.has_math) or \
           (student_entities.has_math and model_entities.numbers) or \
           (model_entities.has_math and student_entities.numbers):
            # Skip symbolic if the only "expressions" are unit strings like "m/s**2"
            student_real_expr = [e for e in student_entities.expressions
                                 if not all(c in "mskghcnL/" for c in e.replace("*", "").replace(" ", ""))]
            model_real_expr = [e for e in model_entities.expressions
                               if not all(c in "mskghcnL/" for c in e.replace("*", "").replace(" ", ""))]
            if not student_real_expr or not model_real_expr:
                # One side may have only numbers — try using numbers as expressions
                student_expr = self._best_expression(student_entities)
                model_expr = self._best_expression(model_entities)
                if student_expr and model_expr:
                    # Both have something we can compare
                    variables = list(set(student_entities.variables + model_entities.variables))
                    if not variables:
                        variables = ["x"]
                    result = self.sandbox.verify_symbolic(student_expr, model_expr, variables)
                    attempts.append("symbolic")
                    if result is not None:
                        if result.match:
                            return VerificationResult(
                                match=True, strategy="symbolic", confidence=0.95,
                                entities=self._entities_to_dict(student_entities, model_entities),
                                attempts=attempts,
                            )
                        elif result.error is None:
                            return VerificationResult(
                                match=False, strategy="symbolic", confidence=0.90,
                                entities=self._entities_to_dict(student_entities, model_entities),
                                attempts=attempts,
                            )
                pass  # Skip to next strategy
            else:
                # Strategy 1: Symbolic
                result = self._try_symbolic(student_entities, model_entities)
                attempts.append("symbolic")
                if result is not None:
                    if result.match:
                        return VerificationResult(
                            match=True,
                            strategy="symbolic",
                            confidence=0.95,
                            entities=self._entities_to_dict(student_entities, model_entities),
                            attempts=attempts,
                        )
                    elif result.error is None:
                        # Symbolic verification definitively showed no match
                        return VerificationResult(
                            match=False,
                            strategy="symbolic",
                            confidence=0.90,
                            entities=self._entities_to_dict(student_entities, model_entities),
                            attempts=attempts,
                        )

                # Strategy 2: Numerical
                result = self._try_numerical(student_entities, model_entities)
                attempts.append("numerical")
                if result is not None:
                    if result.match:
                        return VerificationResult(
                            match=True,
                            strategy="numerical",
                            confidence=0.85,
                            entities=self._entities_to_dict(student_entities, model_entities),
                            attempts=attempts,
                        )
                    elif result.error is None:
                        # Numerical verification definitively showed no match
                        return VerificationResult(
                            match=False,
                            strategy="numerical",
                            confidence=0.80,
                            entities=self._entities_to_dict(student_entities, model_entities),
                            attempts=attempts,
                        )

        # If numbers detected and question is numerical, compare directly
        if question_type == "numerical" and student_entities.numbers and model_entities.numbers:
            result = self._try_numerical_match(student_entities, model_entities)
            attempts.append("numerical_match")
            if result is not None:
                return VerificationResult(
                    match=result.match,
                    strategy="numerical_match",
                    confidence=0.95 if result.match else 0.90,
                    entities=self._entities_to_dict(student_entities, model_entities),
                    attempts=attempts,
                )

        # If percentages detected, compare
        if student_entities.percentages and model_entities.percentages:
            result = self._try_percentage_match(student_entities, model_entities)
            attempts.append("percentage")
            if result is not None:
                return VerificationResult(
                    match=result.match,
                    strategy="percentage",
                    confidence=0.95,
                    entities=self._entities_to_dict(student_entities, model_entities),
                    attempts=attempts,
                )

        # If matrices detected, compare
        if student_entities.matrices and model_entities.matrices:
            result = self._try_matrix_match(student_entities, model_entities)
            attempts.append("matrix")
            if result is not None:
                return VerificationResult(
                    match=result.match,
                    strategy="matrix",
                    confidence=0.90,
                    entities=self._entities_to_dict(student_entities, model_entities),
                    attempts=attempts,
                )

        # Strategy 5: Fallback — escalate to Tier 2
        attempts.append("fallback")
        return VerificationResult(
            match=False,
            strategy="fallback",
            confidence=0.0,
            escalate=True,
            error="No deterministic strategy succeeded",
            entities=self._entities_to_dict(student_entities, model_entities),
            attempts=attempts,
        )

    # ── Individual strategy implementations ───────────────────────── #

    def _try_symbolic(self, student_ent: ExtractedEntities, model_ent: ExtractedEntities) -> Optional[SandboxResult]:
        """Strategy 1: Symbolic verification with SymPy."""
        # Get the best expression from each answer
        student_expr = self._best_expression(student_ent)
        model_expr = self._best_expression(model_ent)

        if not student_expr or not model_expr:
            return None

        # Combine variables from both
        variables = list(set(student_ent.variables + model_ent.variables))
        if not variables:
            variables = ["x"]  # Default variable

        return self.sandbox.verify_symbolic(student_expr, model_expr, variables)

    def _try_numerical(self, student_ent: ExtractedEntities, model_ent: ExtractedEntities) -> Optional[SandboxResult]:
        """Strategy 2: Numerical verification."""
        student_expr = self._best_expression(student_ent)
        model_expr = self._best_expression(model_ent)

        if not student_expr or not model_expr:
            return None

        var = (student_ent.variables or model_ent.variables or ["x"])[0]
        return self.sandbox.verify_numerical(student_expr, model_expr, var)

    def _try_units(self, student_ent: ExtractedEntities, model_ent: ExtractedEntities) -> Optional[SandboxResult]:
        """Strategy 3: Unit verification with pint."""
        # Build "value unit" strings
        student_val = self._build_unit_string(student_ent)
        model_val = self._build_unit_string(model_ent)

        if not student_val or not model_val:
            return None

        return self.sandbox.verify_units(student_val, model_val)

    def _try_chemical(self, student_ent: ExtractedEntities, model_ent: ExtractedEntities) -> Optional[SandboxResult]:
        """Strategy 4: Chemical formula verification with chempy."""
        if not student_ent.chemicals or not model_ent.chemicals:
            return None

        # Compare first chemical from each
        student_chem = student_ent.chemicals[0]
        model_chem = model_ent.chemicals[0]

        return self.sandbox.verify_chemical(student_chem, model_chem)

    def _try_numerical_match(self, student_ent: ExtractedEntities, model_ent: ExtractedEntities) -> Optional[SandboxResult]:
        """Direct numerical comparison for numerical questions."""
        if not student_ent.numbers or not model_ent.numbers:
            return None

        student_num = student_ent.numbers[0]
        model_num = model_ent.numbers[0]

        # Allow small floating point differences
        match = abs(student_num - model_num) < 1e-4
        return SandboxResult(match=match, strategy="numerical_match", error=None)

    def _try_percentage_match(self, student_ent: ExtractedEntities, model_ent: ExtractedEntities) -> Optional[SandboxResult]:
        """Direct percentage comparison."""
        if not student_ent.percentages or not model_ent.percentages:
            return None

        student_pct = student_ent.percentages[0]
        model_pct = model_ent.percentages[0]

        match = abs(student_pct - model_pct) < 0.01
        return SandboxResult(match=match, strategy="percentage", error=None)

    def _try_matrix_match(self, student_ent: ExtractedEntities, model_ent: ExtractedEntities) -> Optional[SandboxResult]:
        """Matrix comparison via SymPy."""
        if not student_ent.matrices or not model_ent.matrices:
            return None

        student_mat = student_ent.matrices[0]
        model_mat = model_ent.matrices[0]

        # Use symbolic verification for matrices
        return self.sandbox.verify_symbolic(student_mat, model_mat, [])

    # ── Helper methods ────────────────────────────────────────────── #

    @staticmethod
    def _best_expression(entities: ExtractedEntities) -> Optional[str]:
        """Get the best mathematical expression from extracted entities."""
        # Prefer equations, then expressions, then numbers
        if entities.equations:
            # Take the equation part after =
            eq = entities.equations[0]
            if "=" in eq:
                parts = eq.split("=")
                return parts[-1].strip()  # Right-hand side is usually the answer
            return eq

        if entities.expressions:
            # Pick the longest expression (most likely the main one)
            return max(entities.expressions, key=len)

        if entities.numbers:
            return str(entities.numbers[0])

        return None

    @staticmethod
    def _build_unit_string(entities: ExtractedEntities) -> Optional[str]:
        """Build a 'value unit' string from extracted entities."""
        if not entities.units:
            return None

        value = "1"
        if entities.numbers:
            value = str(entities.numbers[0])

        unit = entities.units[0]
        return f"{value} {unit}"

    @staticmethod
    def _entities_to_dict(student_ent: ExtractedEntities, model_ent: ExtractedEntities) -> dict:
        """Convert entities to a serializable dict."""
        return {
            "student": {
                "has_math": student_ent.has_math,
                "has_chemistry": student_ent.has_chemistry,
                "has_units": student_ent.has_units,
                "numbers": student_ent.numbers,
                "expressions": student_ent.expressions,
                "chemicals": student_ent.chemicals,
                "units": student_ent.units,
            },
            "model": {
                "has_math": model_ent.has_math,
                "has_chemistry": model_ent.has_chemistry,
                "has_units": model_ent.has_units,
                "numbers": model_ent.numbers,
                "expressions": model_ent.expressions,
                "chemicals": model_ent.chemicals,
                "units": model_ent.units,
            },
        }
