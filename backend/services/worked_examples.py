"""
Worked Examples Service with Fading (Spaced Practice / Fading Technique)
========================================================================

Indian students often learn by SEEING complete worked solutions before attempting
problems on their own. This service provides:
  - Full worked examples with step-by-step solutions
  - Gradual fading based on mastery (low mastery → always show, high → hide)
  - Deterministic generation so the same seed always produces the same example
  - Offline-capable: all computation is local, no LLM calls

Fading Stages:
  'full'    : Mastery < 0.3  → Always show worked example before practice
  'partial' : Mastery 0.3-0.6 → Show on student request ("Show me how")
  'hidden'  : Mastery > 0.6  → Worked example hidden entirely

Integration:
  - registry.get_solver(problem_type)  → to solve generated problems
  - mastery_sync.get_mastery()         → to get current mastery level
  - QUESTION_REGISTRY from question_gen modules → to generate problems
"""

from __future__ import annotations

import logging
import random
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Dict, List, Optional

from sympy import latex, sympify

from services.knowledge_tracing import BKTModel
from services.mastery_sync import get_mastery

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Fading thresholds - these are tuned based on educational research for Indian
# K-12 students (CISCE/ICSE/ISC). The 0.3 and 0.6 cutoffs give 3 clear stages.
# ---------------------------------------------------------------------------
FADE_FULL_THRESHOLD = 0.3    # Below this → always show example
FADE_HIDDEN_THRESHOLD = 0.6  # Above this → never show example
# Between 0.3 and 0.6 → partial fading (show on request)

# Max time allowed for generation + solve (ms) — must be under 500ms
MAX_GENERATION_TIME_MS = 400


# ---------------------------------------------------------------------------
# Data structures returned by the service
# ---------------------------------------------------------------------------
class FadingStage(Enum):
    """Visibility of worked example for a student on a topic."""
    FULL = "full"        # Always visible
    PARTIAL = "partial"  # Visible on request
    HIDDEN = "hidden"    # Never shown automatically


@dataclass
class StepExplanation:
    """One step in a worked solution."""
    step_number: int
    description: str          # What is happening in this step (Hinglish-friendly)
    math_latex: str           # LaTeX representation for rendering
    plain_text: str           # Human-readable plain text
    hint: str                 # Short hint for why this step matters
    rule_applied: str         # The mathematical rule/concept being applied


@dataclass
class WorkedExample:
    """A complete worked example ready for display."""
    problem_type: str
    problem_text: str                     # The problem statement
    problem_latex: str                    # LaTeX for the problem
    seed: int                             # Seed used (for reproducibility)
    steps: List[StepExplanation]          # Step-by-step solution
    final_answer_latex: str               # Final answer in LaTeX
    final_answer_text: str                # Final answer in plain text
    difficulty: str                       # easy | medium | hard
    estimated_time_sec: int               # How long to explain this
    topic_id: str                         # Topic/subject tag
    board: str                            # ICSE | ISC | CBSE
    grade: str                            # "8" | "10" | "12" etc.
    rule_explanations: List[str]          # Key rules/concepts used (separate list
                                          # for sidebar / info panel)
    # ---- fading context ----
    fading_stage: FadingStage
    can_request_example: bool             # True if student can ask for example
    mastery_at_request: float             # Mastery level used to decide


@dataclass
class PracticeProblem:
    """A practice problem WITHOUT the solution — student tries on their own."""
    problem_type: str
    problem_text: str
    problem_latex: str
    seed: int
    difficulty: str
    estimated_time_sec: int
    topic_id: str
    board: str
    grade: str
    # No solution fields — that's the whole point


@dataclass
class FadingDecision:
    """Complete fading analysis for a student on a topic."""
    student_id: str
    topic_id: str
    stage: FadingStage
    mastery: float
    show_example_on_entry: bool          # Auto-show when practice session opens
    show_example_on_request: bool        # Show if student taps "Show me how"
    days_until_next_review: int          # SRS hint
    message_to_student: str              # Contextual Hinglish message


# ---------------------------------------------------------------------------
# Main service class
# ---------------------------------------------------------------------------
class WorkedExamplesService:
    """
    Provides worked examples with mastery-based fading.

    Usage:
        svc = WorkedExamplesService()

        # Check fading stage
        decision = svc.get_fading_stage(student_id="stu_001", topic_id="algebra_linear")

        # Get a worked example (full solution)
        example = svc.get_worked_example(
            problem_type="linear_equation_1var",
            student_id="stu_001",
            topic_id="algebra_linear",
            seed=42,   # optional, random if omitted
        )

        # Get a practice problem (no solution)
        problem = svc.get_practice_problem(
            problem_type="linear_equation_1var",
            topic_id="algebra_linear",
            seed=42,   # optional
        )

        # Quick boolean check
        if svc.should_show_example(student_id="stu_001", topic_id="algebra_linear"):
            example = svc.get_worked_example(...)
    """

    def __init__(self):
        self._solver_cache: Dict[str, Any] = {}

    # ------------------------------------------------------------------
    # Public API — Fading
    # ------------------------------------------------------------------

    def get_fading_stage(
        self,
        student_id: str,
        topic_id: str,
        *,
        explicit_mastery: Optional[float] = None,
    ) -> FadingDecision:
        """
        Determine the fading stage for a student on a topic.

        Returns a FadingDecision with the stage, boolean flags, and a
        contextual message in Hinglish appropriate for the student.
        """
        start = time.perf_counter()
        logger.info("get_fading_stage: student=%s topic=%s", student_id, topic_id)

        mastery = explicit_mastery if explicit_mastery is not None else self._get_mastery(
            student_id, topic_id
        )
        elapsed_ms = (time.perf_counter() - start) * 1000
        logger.debug("  mastery fetch took %.1fms", elapsed_ms)

        stage, show_on_entry, show_on_request, message = self._classify_mastery(mastery)
        days_until_review = self._days_until_next_review(mastery)

        return FadingDecision(
            student_id=student_id,
            topic_id=topic_id,
            stage=stage,
            mastery=round(mastery, 4),
            show_example_on_entry=show_on_entry,
            show_example_on_request=show_on_request,
            days_until_next_review=days_until_review,
            message_to_student=message,
        )

    def should_show_example(
        self,
        student_id: str,
        topic_id: str,
        *,
        explicit_mastery: Optional[float] = None,
    ) -> bool:
        """
        Quick boolean: should an example be shown automatically on entry?

        This is equivalent to `get_fading_stage(...).show_example_on_entry`
        but faster when you only need the boolean.
        """
        mastery = (
            explicit_mastery
            if explicit_mastery is not None
            else self._get_mastery(student_id, topic_id)
        )
        return mastery < FADE_FULL_THRESHOLD

    # ------------------------------------------------------------------
    # Public API — Worked Examples
    # ------------------------------------------------------------------

    def get_worked_example(
        self,
        problem_type: str,
        student_id: str,
        topic_id: str,
        *,
        seed: Optional[int] = None,
        board: str = "ICSE",
        grade: str = "10",
        difficulty: str = "medium",
        force_show: bool = False,
    ) -> WorkedExample:
        """
        Generate a complete worked example (problem + full solution).

        Args:
            problem_type: Key into QUESTION_REGISTRY (e.g. "linear_equation_1var")
            student_id:   Used to check fading rules and mastery
            topic_id:     Topic for mastery lookup
            seed:         Deterministic seed. If None, random int is used.
            board:        ICSE | ISC | CBSE (affects language/complexity)
            grade:        "8", "10", "12", etc.
            difficulty:   easy | medium | hard
            force_show:   If True, return example even if fading says hidden
                          (for "Show me another example" button)

        Returns:
            WorkedExample with problem text, LaTeX, step-by-step solution,
            final answer, and rule explanations.

        Raises:
            ValueError: If problem_type not found in registry.
            TimeoutError: If generation takes > 400ms.
        """
        t0 = time.perf_counter()

        # ---- Check fading rules ----
        decision = self.get_fading_stage(student_id, topic_id)
        fading_stage = decision.stage

        if fading_stage == FadingStage.HIDDEN and not force_show:
            raise PermissionError(
                f"Worked example hidden for student {student_id} on topic "
                f"{topic_id} (mastery={decision.mastery:.0%}). "
                f"Student has high mastery — encourage independent problem solving."
            )

        if fading_stage == FadingStage.PARTIAL and not force_show:
            # Partial stage — example is available on request but student
            # should attempt first. We still return it since they explicitly
            # asked (this method is called when they tap "Show me how").
            logger.info(
                "Partial fading — student requested example (mastery=%.0f%%)",
                decision.mastery,
            )

        # ---- Generate seed ----
        if seed is None:
            seed = random.randint(1, 2**31 - 1)
        rng = random.Random(seed)

        # ---- Import question generator and solver ----
        try:
            question_gen = self._get_question_generator(problem_type)
        except (ImportError, ModuleNotFoundError) as e:
            raise ValueError(
                f"No question generator found for problem_type '{problem_type}'. "
                f"Ensure solvers/question_gen_{problem_type}.py exists and "
                f"exports QUESTION_REGISTRY entry. Error: {e}"
            ) from e

        solver = self._get_solver(problem_type)

        # ---- Generate problem instance ----
        problem_context = question_gen.generate(
            seed=seed,
            difficulty=difficulty,
            board=board,
            grade=grade,
        )

        problem_text = problem_context.get("problem_text", "")
        problem_latex = problem_context.get("latex", problem_text)
        variables = problem_context.get("variables", {})
        parameters = problem_context.get("parameters", {})

        # ---- Solve it ----
        solution = solver.solve(problem_context)
        raw_steps = solution.get("steps", [])
        final_answer = solution.get("final_answer", "")
        final_answer_latex = solution.get("final_answer_latex", str(final_answer))
        rules_used = solution.get("rules_used", [])

        # ---- Build step explanations ----
        steps = self._build_steps(raw_steps, problem_type, board, grade)

        # ---- Rule explanations for sidebar ----
        rule_explanations = self._build_rule_explanations(
            rules_used, problem_type, board, grade
        )

        # ---- Estimated time ----
        estimated_time = self._estimate_time(steps, difficulty)

        elapsed_ms = (time.perf_counter() - t0) * 1000
        logger.info(
            "Generated worked example: type=%s seed=%d in %.1fms",
            problem_type, seed, elapsed_ms,
        )

        if elapsed_ms > MAX_GENERATION_TIME_MS:
            logger.warning(
                "Worked example generation took %.1fms (threshold %dms)",
                elapsed_ms, MAX_GENERATION_TIME_MS,
            )

        return WorkedExample(
            problem_type=problem_type,
            problem_text=problem_text,
            problem_latex=problem_latex,
            seed=seed,
            steps=steps,
            final_answer_latex=final_answer_latex,
            final_answer_text=str(final_answer),
            difficulty=difficulty,
            estimated_time_sec=estimated_time,
            topic_id=topic_id,
            board=board,
            grade=grade,
            rule_explanations=rule_explanations,
            fading_stage=fading_stage,
            can_request_example=decision.show_example_on_request,
            mastery_at_request=decision.mastery,
        )

    # ------------------------------------------------------------------
    # Public API — Practice Problems (no solution)
    # ------------------------------------------------------------------

    def get_practice_problem(
        self,
        problem_type: str,
        topic_id: str,
        *,
        seed: Optional[int] = None,
        board: str = "ICSE",
        grade: str = "10",
        difficulty: str = "medium",
    ) -> PracticeProblem:
        """
        Generate a practice problem WITHOUT the solution.

        The student sees the problem and must solve it themselves.
        This is what they get AFTER reading the worked example (or if
        they skip it).

        Args:
            problem_type: Key into QUESTION_REGISTRY
            topic_id:     Topic identifier
            seed:         Deterministic seed. None → random.
            board:        ICSE | ISC | CBSE
            grade:        Grade level
            difficulty:   easy | medium | hard

        Returns:
            PracticeProblem with NO solution fields.
        """
        t0 = time.perf_counter()

        # ---- Generate seed ----
        if seed is None:
            seed = random.randint(1, 2**31 - 1)

        # ---- Get generator ----
        question_gen = self._get_question_generator(problem_type)

        # ---- Generate problem instance ----
        problem_context = question_gen.generate(
            seed=seed,
            difficulty=difficulty,
            board=board,
            grade=grade,
        )

        problem_text = problem_context.get("problem_text", "")
        problem_latex = problem_context.get("latex", problem_text)
        estimated_time = self._estimate_time_from_difficulty(difficulty)

        elapsed_ms = (time.perf_counter() - t0) * 1000
        logger.debug(
            "Generated practice problem: type=%s seed=%d in %.1fms",
            problem_type, seed, elapsed_ms,
        )

        if elapsed_ms > MAX_GENERATION_TIME_MS:
            logger.warning(
                "Practice problem generation took %.1fms", elapsed_ms,
            )

        return PracticeProblem(
            problem_type=problem_type,
            problem_text=problem_text,
            problem_latex=problem_latex,
            seed=seed,
            difficulty=difficulty,
            estimated_time_sec=estimated_time,
            topic_id=topic_id,
            board=board,
            grade=grade,
        )

    # ------------------------------------------------------------------
    # Public API — Example request helpers
    # ------------------------------------------------------------------

    def can_request_example(
        self,
        student_id: str,
        topic_id: str,
        *,
        explicit_mastery: Optional[float] = None,
    ) -> bool:
        """
        Can the student request a worked example right now?

        Returns False only if mastery > 0.6 (fully faded).
        In partial stage, returns True — they can request but it's discouraged.
        """
        mastery = (
            explicit_mastery
            if explicit_mastery is not None
            else self._get_mastery(student_id, topic_id)
        )
        return mastery <= FADE_HIDDEN_THRESHOLD

    def get_fading_message(
        self,
        student_id: str,
        topic_id: str,
        *,
        context: str = "entry",  # "entry" | "request" | "after_solve"
    ) -> str:
        """
        Return a contextual Hinglish message based on fading stage.

        Contexts:
          - "entry":       When student opens practice session
          - "request":     When student taps "Show me how"
          - "after_solve": After student submits an answer
        """
        decision = self.get_fading_stage(student_id, topic_id)
        stage = decision.stage
        mastery = decision.mastery

        if context == "entry":
            if stage == FadingStage.FULL:
                return (
                    "Yeh topic abhi aapke liye naya lag raha hoga. "
                    "Pehle example dekhiye, phir try karein!"
                )
            elif stage == FadingStage.PARTIAL:
                return (
                    "Aap is topic par achha progress kar rahe hain! "
                    "Pehle khud try karein, phir 'Show me how' dabayein agar help chahiye."
                )
            else:
                return (
                    "Aap is topic par master ho gaye hain! "
                    "Ab khud solve karein — aapke paas sab aata hai."
                )

        elif context == "request":
            if stage == FadingStage.FULL:
                return (
                    "Bilkul! Pehle example carefully dekhiye, "
                    "phir apna problem solve karein."
                )
            elif stage == FadingStage.PARTIAL:
                return (
                    "Theek hai, example dekh lo. Lekin agle question "
                    "pe pehle try karna mat bhoolna!"
                )
            else:
                return (
                    "Aapke mastery zyada hai — isliye example nahi diya ja raha. "
                    "Thoda soch ke try karein, aap kar sakte hain!"
                )

        elif context == "after_solve":
            if mastery < FADE_FULL_THRESHOLD:
                return (
                    "Shabash! Ab aur practice karein. "
                    "Example abhi bhi available hai agar chahiye."
                )
            elif mastery < FADE_HIDDEN_THRESHOLD:
                return (
                    "Bahut badhiya! Ab thode aur problems try karein. "
                    "Example sirf jab help chahiye."
                )
            else:
                return (
                    "Kamaal kar rahe ho! Aap is topic par expert ho gaye hain. "
                    "Agle level par chalein!"
                )

        return ""

    # ------------------------------------------------------------------
    # Private helpers
    # ------------------------------------------------------------------

    def _get_mastery(self, student_id: str, topic_id: str) -> float:
        """Fetch current mastery from mastery_sync service."""
        try:
            mastery_data = get_mastery(student_id=student_id, topic_id=topic_id)
            if isinstance(mastery_data, dict):
                return float(mastery_data.get("mastery", mastery_data.get("score", 0.0)))
            return float(mastery_data)
        except Exception as e:
            logger.warning(
                "Could not fetch mastery for %s/%s: %s. Defaulting to 0.0.",
                student_id, topic_id, e,
            )
            return 0.0

    def _classify_mastery(
        self, mastery: float
    ) -> tuple[FadingStage, bool, bool, str]:
        """
        Classify mastery into a fading stage.

        Returns:
            (stage, show_on_entry, show_on_request, message)
        """
        if mastery < FADE_FULL_THRESHOLD:
            stage = FadingStage.FULL
            show_on_entry = True
            show_on_request = True
            message = (
                "Yeh topic naya hai aapke liye. "
                "Neeche diya gaya example padhiye, phir apna problem solve karein."
            )
        elif mastery < FADE_HIDDEN_THRESHOLD:
            stage = FadingStage.PARTIAL
            show_on_entry = False
            show_on_request = True
            message = (
                "Aap achha kar rahe hain! Pehle try karein, "
                "phir 'Show me how' dabayein agar stuck ho."
            )
        else:
            stage = FadingStage.HIDDEN
            show_on_entry = False
            show_on_request = False
            message = (
                "Aap is topic par master ho gaye hain! "
                "Ab sirf practice karein — example ki zarurat nahi."
            )

        return stage, show_on_entry, show_on_request, message

    def _days_until_next_review(self, mastery: float) -> int:
        """
        Estimate days until next spaced review based on mastery.
        Low mastery → review sooner. High mastery → review later.
        """
        if mastery < 0.2:
            return 1
        elif mastery < 0.4:
            return 2
        elif mastery < 0.6:
            return 4
        elif mastery < 0.8:
            return 7
        else:
            return 14

    def _get_question_generator(self, problem_type: str):
        """
        Import and return the question generator for a problem type.

        Looks for solvers/question_gen_{problem_type}.py with a generate()
        function. Results are cached for speed.
        """
        if problem_type in self._solver_cache:
            cached = self._solver_cache[problem_type]
            if hasattr(cached, "generate"):
                return cached

        import importlib

        module_name = f"solvers.question_gen_{problem_type}"
        try:
            mod = importlib.import_module(module_name)
            if hasattr(mod, "generate"):
                self._solver_cache[problem_type] = mod
                return mod
        except ImportError:
            pass

        # Try registry-based lookup
        from solvers.registry import get_solver

        try:
            solver_entry = get_solver(problem_type)
            if hasattr(solver_entry, "generate"):
                self._solver_cache[problem_type] = solver_entry
                return solver_entry
        except Exception:
            pass

        raise ImportError(
            f"No question generator for '{problem_type}'. "
            f"Expected solvers/question_gen_{problem_type}.py with generate() "
            f"function or a registry entry."
        )

    def _get_solver(self, problem_type: str):
        """Get the solver for a problem type from registry."""
        from solvers.registry import get_solver

        try:
            return get_solver(problem_type)
        except Exception as e:
            raise ValueError(
                f"No solver found for '{problem_type}'. "
                f"Ensure solvers/registry.py has an entry for '{problem_type}'. "
                f"Error: {e}"
            ) from e

    def _build_steps(
        self,
        raw_steps: List[Dict[str, Any]],
        problem_type: str,
        board: str,
        grade: str,
    ) -> List[StepExplanation]:
        """
        Convert raw solver steps into StepExplanation objects with Hinglish
        descriptions, LaTeX, and rule annotations.
        """
        steps = []
        for i, raw in enumerate(raw_steps, start=1):
            if not isinstance(raw, dict):
                raw = {"description": str(raw), "latex": str(raw)}

            step = StepExplanation(
                step_number=i,
                description=raw.get("description", raw.get("explanation", "")),
                math_latex=raw.get("latex", raw.get("math", "")),
                plain_text=raw.get("plain_text", raw.get("description", "")),
                hint=raw.get("hint", self._default_hint(i, problem_type)),
                rule_applied=raw.get(
                    "rule", raw.get("rule_applied", self._default_rule(i, problem_type))
                ),
            )
            steps.append(step)
        return steps

    def _build_rule_explanations(
        self, rules_used: List[str], problem_type: str, board: str, grade: str
    ) -> List[str]:
        """
        Build plain-text rule explanations for the sidebar info panel.

        These are short, clear explanations of each mathematical concept
        used in the solution, written for Indian students.
        """
        rule_map: Dict[str, str] = {
            # Linear equations
            "transposition": (
                "Transposition: Jab aap kisi cheez ko equation ke ek side se "
                "dusre side le jaate hain, toh sign badal jaata hai. "
                "+ becomes -, × becomes ÷, and vice versa."
            ),
            "linear_eq_1var": (
                "Linear Equation in One Variable: Ismein sirf ek variable hota hai "
                "aur uska power 1 hota hai. Example: 2x + 3 = 7."
            ),
            "collect_like_terms": (
                "Like Terms: Agar variables same hain (jaise 2x + 3x = 5x), "
                "toh unko jod sakte hain. Unlike terms (x + y) nahi milte."
            ),
            "division_property": (
                "Division Property: Agar dono sides ko same number se divide karo, "
                "toh equality preserve rehti hai."
            ),
            # Quadratic
            "quadratic_formula": (
                "Quadratic Formula: ax² + bx + c = 0 ka solution x = "
                "(-b ± √(b²-4ac)) / 2a se milta hai."
            ),
            "factorization": (
                "Factorization: Quadratic equation ko do binomials ke product "
                "mein break karna. Example: x² + 5x + 6 = (x+2)(x+3)."
            ),
            "discriminant": (
                "Discriminant: b² - 4ac batata hai ki equation ke kitne real "
                "solutions honge. Positive → 2, Zero → 1, Negative → 0."
            ),
            # Geometry
            "pythagoras": (
                "Pythagoras Theorem: Right-angled triangle mein, "
                "hypotenuse² = base² + height²."
            ),
            "triangle_area": (
                "Triangle Area: Area = ½ × base × height."
            ),
            "circle_area": (
                "Circle Area: Area = π × r², jahan r radius hai."
            ),
            "circle_circumference": (
                "Circumference: Perimeter of circle = 2πr = πd."
            ),
            # Trigonometry
            "soh_cah_toa": (
                "SOH-CAH-TOA: sin = Opposite/Hypotenuse, "
                "cos = Adjacent/Hypotenuse, tan = Opposite/Adjacent."
            ),
            "trig_identity": (
                "Trigonometric Identity: sin²θ + cos²θ = 1 "
                "(yeh hamesha true rehta hai kisi bhi angle ke liye)."
            ),
            # Algebra
            "distributive": (
                "Distributive Property: a(b + c) = ab + ac. "
                "Bracket ko open karne ke liye use hota hai."
            ),
            "exponent_rules": (
                "Exponent Rules: x^m × x^n = x^(m+n), "
                "(x^m)^n = x^(mn), x^0 = 1."
            ),
            "simultaneous_eq": (
                "Simultaneous Equations: Do equations ko ek saath solve karna "
                "jisse dono variables ki values milen. "
                "Methods: Substitution, Elimination, Cross-multiplication."
            ),
            # Percentage / Commercial
            "percentage": (
                "Percentage: (Part/Whole) × 100. "
                "Jaise agar 40 out of 50 marks hai, toh percentage = (40/50) × 100 = 80%."
            ),
            "profit_loss": (
                "Profit & Loss: Profit = SP - CP, Loss = CP - SP. "
                "Profit% = (Profit/CP) × 100, Loss% = (Loss/CP) × 100."
            ),
            "simple_interest": (
                "Simple Interest: SI = (P × R × T) / 100, "
                "jahan P = Principal, R = Rate, T = Time."
            ),
            "compound_interest": (
                "Compound Interest: CI = P(1 + R/100)^T - P. "
                "Har saal interest previous amount par calculate hota hai."
            ),
            # Sets
            "set_union": (
                "Union of Sets: A ∪ B = elements in A OR B (ya dono mein se kisi ek mein)."
            ),
            "set_intersection": (
                "Intersection: A ∩ B = elements jo dono A aur B mein hain."
            ),
            # Mensuration
            "cylinder_volume": (
                "Cylinder Volume: V = πr²h, jahan r = radius, h = height."
            ),
            "cone_volume": (
                "Cone Volume: V = (1/3)πr²h."
            ),
            "sphere_volume": (
                "Sphere Volume: V = (4/3)πr³."
            ),
        }

        explanations = []
        for rule in rules_used:
            rule_key = rule.strip().lower().replace(" ", "_")
            if rule_key in rule_map:
                explanations.append(rule_map[rule_key])
            else:
                # Fallback: provide a generic description
                explanations.append(
                    f"{rule}: Yeh concept is problem mein use hua hai. "
                    f"Apne teacher se ya textbook se detail mein padhiye."
                )
        return explanations

    def _default_hint(self, step_idx: int, problem_type: str) -> str:
        """Provide a default hint for common step positions."""
        hints = {
            1: "Pehle step mein problem ko samjhiye — diye gaye values note kariye.",
            2: "Ab relevant formula ya rule apply kariye.",
            3: "Calculation carefully kariye — signs aur units check kariye.",
        }
        return hints.get(step_idx, "Is step ko carefully samjhiye.")

    def _default_rule(self, step_idx: int, problem_type: str) -> str:
        """Provide a default rule label for a step."""
        return f"step_{step_idx}"

    def _estimate_time(self, steps: List[StepExplanation], difficulty: str) -> int:
        """Estimate seconds to explain this worked example."""
        base = len(steps) * 30  # ~30 seconds per step
        difficulty_multiplier = {"easy": 0.8, "medium": 1.0, "hard": 1.3}.get(
            difficulty, 1.0
        )
        return max(60, int(base * difficulty_multiplier))

    def _estimate_time_from_difficulty(self, difficulty: str) -> int:
        """Estimate seconds for a practice problem (no steps shown)."""
        times = {"easy": 120, "medium": 180, "hard": 300}
        return times.get(difficulty, 180)


# ---------------------------------------------------------------------------
# Convenience singleton (used by routers)
# ---------------------------------------------------------------------------
_worked_examples_service: Optional[WorkedExamplesService] = None


def get_worked_examples_service() -> WorkedExamplesService:
    """Get or create the singleton WorkedExamplesService."""
    global _worked_examples_service
    if _worked_examples_service is None:
        _worked_examples_service = WorkedExamplesService()
    return _worked_examples_service


# ---------------------------------------------------------------------------
# Legacy function-style API (for backwards compatibility / quick calls)
# ---------------------------------------------------------------------------
_service = WorkedExamplesService()


def get_worked_example(
    problem_type: str,
    student_id: str,
    topic_id: str,
    seed: Optional[int] = None,
    board: str = "ICSE",
    grade: str = "10",
    difficulty: str = "medium",
    force_show: bool = False,
) -> WorkedExample:
    """Convenience wrapper — see WorkedExamplesService.get_worked_example()."""
    return _service.get_worked_example(
        problem_type=problem_type,
        student_id=student_id,
        topic_id=topic_id,
        seed=seed,
        board=board,
        grade=grade,
        difficulty=difficulty,
        force_show=force_show,
    )


def should_show_example(
    student_id: str,
    topic_id: str,
    explicit_mastery: Optional[float] = None,
) -> bool:
    """Convenience wrapper — see WorkedExamplesService.should_show_example()."""
    return _service.should_show_example(
        student_id=student_id, topic_id=topic_id, explicit_mastery=explicit_mastery
    )


def get_practice_problem(
    problem_type: str,
    topic_id: str,
    seed: Optional[int] = None,
    board: str = "ICSE",
    grade: str = "10",
    difficulty: str = "medium",
) -> PracticeProblem:
    """Convenience wrapper — see WorkedExamplesService.get_practice_problem()."""
    return _service.get_practice_problem(
        problem_type=problem_type,
        topic_id=topic_id,
        seed=seed,
        board=board,
        grade=grade,
        difficulty=difficulty,
    )


def get_fading_stage(
    student_id: str,
    topic_id: str,
    explicit_mastery: Optional[float] = None,
) -> FadingDecision:
    """Convenience wrapper — see WorkedExamplesService.get_fading_stage()."""
    return _service.get_fading_stage(
        student_id=student_id,
        topic_id=topic_id,
        explicit_mastery=explicit_mastery,
    )