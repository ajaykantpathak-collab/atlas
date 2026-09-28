"""
IRT-based Question Selector Service
=====================================
Selects the OPTIMAL next question for each student using:
1. IRT (Item Response Theory) - maximize information at current ability
2. SM-2 Spaced Repetition - include due reviews
3. Topic coverage - study current topics
4. Balance - mix of competency and standard questions
5. Anti-repeat - exclude questions seen in last 30 days

Performance target: <100ms per selection

Generator integration uses the adapter layer (services.question_adapter)
which normalizes all generator patterns into one common interface at
wrap time. Pattern detection happens ONCE per generator, not per call.
"""

import asyncio
import hashlib
import logging
import random
import re
from datetime import datetime, timedelta, timezone
from typing import Any, Optional

import numpy as np
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from database import Attempt
from services.knowledge_tracing import IRTModel
from services.mastery_sync import get_mastery, get_review_schedule
from services.question_adapter import AdapterRegistry, normalize_question, extract_from_result
from solvers.registry import get_question_gen


logger = logging.getLogger(__name__)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CONSTANTS — Sabhi tuning parameters yahan
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DIFFICULTY_MIN = 0.1
DIFFICULTY_MAX = 1.0
DIFFICULTY_STEP_CORRECT = 0.15   # Difficulty badhayein correct par
DIFFICULTY_STEP_WRONG = 0.25     # Difficulty kam karein wrong par (zyada fallback)
REPEAT_WINDOW_DAYS = 30          # 30 din mein repeat nahi
REPEAT_WINDOW_COUNT = 50         # Kitne recent attempts check karein
DEFAULT_THETA = 0.0              # Naye student ke liye default ability
DEFAULT_DISCRIMINATION = 1.0
THETA_CLAMP_MIN = -3.0            # IRT theta range
THETA_CLAMP_MAX = 3.0
INFORMATION_TARGET = 0.25         # Peak information for a=1 discrim
COMPETENCY_RATIO = 0.5            # 50% competency questions
MAX_CANDIDATES = 200              # Har generator se kitne candidates
REVIEW_PRIORITY_CHANCE = 0.20     # 20% chance to pick review over new


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# IRT MATHEMATICS — Pure functions, fast numpy computation
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

def irt_probability(
    theta: float,
    difficulty: float,
    discrimination: float = 1.0,
) -> float:
    """
    2PL IRT model: P(correct | theta, difficulty, discrimination)
    P = 1 / (1 + exp(-a * (theta - b)))
    """
    return float(1.0 / (1.0 + np.exp(-discrimination * (theta - difficulty))))


def irt_information(
    theta: float,
    difficulty: float,
    discrimination: float = 1.0,
) -> float:
    """
    Item Information Function (IIF) for 2PL model.
    I(theta) = a^2 * P * (1-P)
    Maximum when P ≈ 0.5, i.e., theta ≈ difficulty.
    Yeh batata hai ki question student ki ability ke bare mein kitna
    INFORMATION deta hai — jyada information = zyada learning.
    """
    p = irt_probability(theta, difficulty, discrimination)
    return float(discrimination ** 2 * p * (1.0 - p))


def irt_expected_gain(
    theta: float,
    difficulty: float,
    discrimination: float = 1.0,
) -> float:
    """
    Expected learning gain from attempting this question.
    High when theta ≈ difficulty (max info) AND P is moderate (0.3-0.7).
    Too easy (P>0.85) or too hard (P<0.15) → low gain.
    """
    info = irt_information(theta, difficulty, discrimination)
    p = irt_probability(theta, difficulty, discrimination)

    # Difficulty penalty for too easy / too hard
    if p > 0.85:
        difficulty_penalty = max(0.0, (1.0 - p) / 0.15)
    elif p < 0.15:
        difficulty_penalty = max(0.0, p / 0.15)
    else:
        difficulty_penalty = 1.0

    return float(info * difficulty_penalty)


def estimate_optimal_difficulty(
    theta: float,
    target_information: Optional[float] = None,
) -> float:
    """
    Optimal difficulty for a student at ability theta.
    For 2PL: max information at theta ≈ difficulty.
    We bias slightly above theta for "desirable difficulty" effect.
    Returns clamped value in [DIFFICULTY_MIN, DIFFICULTY_MAX].
    """
    theta = float(np.clip(theta, THETA_CLAMP_MIN, THETA_CLAMP_MAX))

    # Optimal difficulty ≈ theta + small positive bias
    # Research: best learning at P(correct) ≈ 0.5-0.6
    optimal = theta + 0.1

    # Very high ability students get harder questions
    if theta > 1.5:
        optimal = DIFFICULTY_MAX - 0.05
    elif theta < -1.5:
        optimal = DIFFICULTY_MIN + 0.05

    return float(np.clip(optimal, DIFFICULTY_MIN, DIFFICULTY_MAX))


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# SELECTION CONTEXT — Adaptive difficulty tracker per student per subject
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class SelectionContext:
    """
    Tracks adaptive parameters during a student's session.
    Maintains rolling difficulty and recent performance history.
    Har student ke liye alag context — isolated hota hai.
    """

    def __init__(self, student_id: str, subject: str) -> None:
        self.student_id = student_id
        self.subject = subject
        self.current_difficulty: float = 0.5
        self.recent_correct_count: int = 0
        self.recent_wrong_count: int = 0
        self.total_attempts: int = 0
        self.streak_type: Optional[str] = None  # 'correct' | 'wrong' | None

    def update(self, correct: bool, difficulty: float) -> None:
        """Update context based on latest response (called after each attempt)."""
        self.total_attempts += 1

        if correct:
            if self.streak_type == 'correct':
                self.recent_correct_count += 1
            else:
                self.recent_correct_count = 1
                self.recent_wrong_count = 0
            self.streak_type = 'correct'
            # Badhao difficulty — student ko challenge chahiye
            self.current_difficulty = min(
                DIFFICULTY_MAX,
                self.current_difficulty + DIFFICULTY_STEP_CORRECT
            )
        else:
            if self.streak_type == 'wrong':
                self.recent_wrong_count += 1
            else:
                self.recent_wrong_count = 1
                self.recent_correct_count = 0
            self.streak_type = 'wrong'
            # Kam karo difficulty — frustration avoid karne ke liye
            self.current_difficulty = max(
                DIFFICULTY_MIN,
                self.current_difficulty - DIFFICULTY_STEP_WRONG
            )

    def get_difficulty_range(self) -> tuple[float, float]:
        """Acceptable difficulty band for next question. Narrows with consistency."""
        base = self.current_difficulty
        spread = 0.2

        if self.recent_correct_count >= 3 or self.recent_wrong_count >= 2:
            spread = 0.15
        if self.total_attempts > 20:
            spread = 0.1

        lower = max(DIFFICULTY_MIN, base - spread)
        upper = min(DIFFICULTY_MAX, base + spread)
        return lower, upper

    def get_competency_ratio(self) -> float:
        """
        Dynamic competency vs standard ratio.
        Agar student struggling hai → zyada competency (easier, confidence build).
        Agar student achha kar raha hai → zyada standard (challenge).
        """
        if self.recent_wrong_count >= 2:
            return 0.7   # 70% competency questions for struggling students
        elif self.recent_correct_count >= 3:
            return 0.3   # 30% competency for strong students
        return COMPETENCY_RATIO


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# QUESTION SELECTOR SERVICE — Main entry point
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class QuestionSelector:
    """
    IRT-based adaptive question selector.

    Architecture:
    ┌─────────────────────────────────────────────────────┐
    │  select_next()                                       │
    │  ├── 1. Check review items (SM-2 due) → 20% chance  │
    │  ├── 2. Determine competency/standard ratio          │
    │  ├── 3. Score candidates via IRT + composite         │
    │  ├── 4. Pick highest-scoring question                │
    │  └── 5. Return question with metadata                │
    └─────────────────────────────────────────────────────┘

    Performance: <100ms per selection (target: ~30-50ms)
    """

    def __init__(self, db: AsyncSession) -> None:
        self.db = db
        self._context_cache: dict[str, SelectionContext] = {}
        # Get the solver registry for question generator discovery
        try:
            from solvers.registry import SolverRegistry
            self._registry = SolverRegistry()
            if not hasattr(self._registry, '_initialized') or not self._registry._initialized:
                self._registry.initialize()
        except Exception:
            self._registry = None
        # Adapter registry — wraps raw generators in pattern-specific adapters
        # Pattern detection happens ONCE at wrap time, cached per qtype
        self._adapters = AdapterRegistry()
        if self._registry is not None:
            self._adapters.set_solver_registry(self._registry)

    # ─── Public API ────────────────────────────────────────────────────────

    async def select_next(
        self,
        session_id: str,
        student_id: str,
        subject: str,
        previous_correct: Optional[bool] = None,
        previous_difficulty: Optional[float] = None,
        class_level: Optional[int] = None,
        topic_ids: Optional[list] = None,
        exclude_question_ids: Optional[set] = None,
    ) -> dict[str, Any]:
        """
        Select the optimal next question for a student.

        Args:
            session_id: Current practice session ID
            student_id: Student identifier
            subject: Subject to select question from
            previous_correct: Was the last answer correct?
            previous_difficulty: Difficulty of last question
            class_level: Explicit class filter override. Applied when the
                student row carries no numeric class (shared demo row) so
                the candidate pool never leaks off-class questions.
            topic_ids: Node ids the session is scoped to (chapter practice).
                When provided, the corpus lane is CHAPTER-gated: candidates
                come from these nodes' questions whenever that pool can
                fill, and generators never serve a chapter-scoped session.

        Returns:
            Question dict with text, options, difficulty, type, etc.
        """
        t0 = datetime.now(timezone.utc)

        # Update adaptive context
        ctx = self._get_context(student_id, subject)
        if previous_correct is not None and previous_difficulty is not None:
            ctx.update(previous_correct, previous_difficulty)

        # Parallel data fetching — reduce latency
        try:
            mastery, review_items, recent_hashes, student_theta = await asyncio.gather(
                self._mastery_score(student_id, subject),
                self._get_review_items(student_id, subject),
                self._get_recent_attempt_hashes(student_id, subject),
                self._get_student_theta(student_id, subject),
            )
        except Exception as e:
            logger.error("Data fetch error for %s/%s: %s", student_id, subject, e)
            mastery, review_items, recent_hashes, student_theta = None, [], set(), DEFAULT_THETA

        # Adaptive parameters from context
        diff_lower, diff_upper = ctx.get_difficulty_range()
        competency_ratio = ctx.get_competency_ratio()

        # ── Path 1: Due review items (20% probability, higher when items due) ──
        if review_items:
            review_chance = REVIEW_PRIORITY_CHANCE + min(len(review_items) * 0.05, 0.3)
            if random.random() < review_chance:
                review_q = await self._pick_review_question(review_items, student_theta)
                if review_q:
                    elapsed = self._elapsed_ms(t0)
                    logger.info("[REVIEW] student=%s subject=%s | %dms",
                                student_id, subject, elapsed)
                    return review_q

        # ── Path 2: Determine question type (competency vs standard) ──
        is_competency = random.random() < competency_ratio

        resolved_class = await self._resolve_class_level(student_id)
        if resolved_class is None and class_level is not None:
            # student row has no numeric class — fall back to the caller's
            # explicit override (token user / request) instead of running
            # the pool class-unfiltered (off-class question leak).
            resolved_class = class_level
        class_level = resolved_class

        # ── Path 3: Generate and score candidates ──
        candidates = await self._get_candidates(
            subject, student_theta,
            diff_lower, diff_upper,
            is_competency, recent_hashes,
            mastery, class_level,
            topic_ids=topic_ids,
            exclude_question_ids=exclude_question_ids,
        )

        if not candidates:
            # Widen search — remove difficulty constraint
            candidates = await self._get_candidates(
                subject, student_theta,
                DIFFICULTY_MIN, DIFFICULTY_MAX,
                is_competency, set(), mastery, class_level,
                topic_ids=topic_ids,
                exclude_question_ids=exclude_question_ids,
            )

        if not candidates:
            # Absolute fallback: force generate
            return await self._generate_fallback(
                student_id, subject, student_theta, is_competency
            )

        # ── Path 4: Select best by composite score ──
        best = max(candidates, key=lambda c: c["composite_score"])

        elapsed = self._elapsed_ms(t0)
        logger.info(
            "[SELECT] student=%s subject=%s diff=%.2f theta=%.2f "
            "info=%.4f score=%.4f type=%s | %dms",
            student_id, subject,
            best["difficulty"], student_theta,
            best["information"], best["composite_score"],
            "competency" if is_competency else "standard",
            elapsed
        )

        return {
            "question_id": best["question_id"],
            "text": best[
"text"],
            "options": best["options"],
            "correct_answer": best["correct_answer"],
            "difficulty": round(best["difficulty"], 3),
            "topic": best["topic"],
            "node_id": best.get("node_id"),  # internal only — mastery tracking
            "marking_scheme": best.get("marking_scheme"),
            "explanation": best.get("explanation", ""),
            "question_type": best["question_type"],
            "seed_hash": best["seed_hash"],
            "expected_theta": round(student_theta, 4),
            "is_competency": is_competency,
            "information_value": round(best["information"], 4),
            "p_correct_estimate": round(best["p_correct"], 3),
        }

    # ─── Subject/grade matching for generator discovery ───────────────────

    # Subject aliases — maps API subject names to generator module patterns
    _SUBJECT_ALIASES = {
        "mathematics": ["math", "maths"],
        "physics": ["physics", "phy"],
        "chemistry": ["chem", "chemistry"],
        "biology": ["bio", "biology"],
        "geography": ["geo", "geography"],
        "history": ["hist", "history"],
        "civics": ["civ", "civics"],
        "history_civics": ["histciv", "historycivics"],
        "computer_science": ["cs", "computer"],
        "economics": ["econ", "economics"],
        "evs": ["evs"],
        "english": ["english", "eng"],
        "hindi": ["hindi"],
        "commerce": ["comm", "commerce"],
        "accountancy": ["acc", "accountancy"],
        "business_studies": ["bs", "business"],
        "biotechnology": ["biotech"],
        "applied_maths": ["appmath", "appliedmaths"],
        "home_science": ["home"],
        "legal_studies": ["legal"],
        "mass_media": ["massmedia"],
        "psychology": ["psy"],
        "sociology": ["soc"],
        "political_science": ["pol"],
        # plain "science" must reach the school-science generators — the
        # naive substring fallback leaks home_science/political_science
        # (B22: kitchen-ergonomics questions in a class-6 science session).
        "science": ["science", "sci", "physics", "chem", "bio", "evs"],
    }

    # Modules whose names CONTAIN the subject word but belong to a
    # different discipline — excluded for that subject's sessions.
    _SUBJECT_EXCLUSIONS = {
        "science": ("home_science", "political_science", "social_science",
                    "computer_science", "home", "political", "social"),
        "biology": ("biotech",),
        # C10 audit: "appmath" contains "math", so the applied-maths
        # generators matched core-mathematics sessions. Applied Maths is a
        # class 11/12 ELECTIVE (subject applied_maths) — its propositional-
        # logic items must never serve a "mathematics" session.
        "mathematics": ("appmath", "appliedmath", "applied_math", "applied"),
        "maths": ("appmath", "appliedmath", "applied_math", "applied"),
        "math": ("appmath", "appliedmath", "applied_math", "applied"),
    }

    def _match_generators(
        self, subject: str, topic: str, grade: int
    ) -> tuple[list[str], list[str]]:
        """Find matching generator qtypes for a subject+grade+topic.

        Returns (subject_grade_match, subject_match) lists of namespaced qtype keys.
        subject_grade_match: generators matching both subject AND grade.
        subject_match: generators matching subject but not grade (fallback).
        """
        if self._registry is None:
            return [], []

        qgen_types = self._registry.list_question_gen_types()
        subject_lower = subject.lower()
        topic_lower = topic.lower()
        grade_str = str(grade)
        aliases = self._SUBJECT_ALIASES.get(subject_lower, [subject_lower])

        # Grade patterns — precise to avoid "1" matching "class11"
        grade_patterns = [
            f"class{grade_str}_", f"class{grade_str}.",
            f"class_{grade_str}_", f"class_{grade_str}.",
            f"c{grade_str}_", f"c{grade_str}.",
            f"_c{grade_str}_", f"_c{grade_str}.",
        ]

        subject_grade_match = []
        subject_match = []

        # ── Syllabus-fit guard (C10 audit) ──
        # Some generator modules encode a class that doesn't offer the
        # subject: CBSE class 10 has no "applied mathematics" (code 241
        # is an 11-12 elective), no EVS (a c1-5 subject), and none of the
        # CISCE-only applied electives (Commercial Studies/Apps, Economic
        # Applications). Their ids look on-grade ("C10-APP-*") so the
        # class-proof check can't catch them — exclude at source so
        # diagnostics/practice never serve them.
        _OUT_OF_SYLLABUS = {
            "evs": {6, 7, 8, 9, 10, 11, 12},
            "appmath": {6, 7, 8, 9, 10},
            "commapp": {6, 7, 8, 9, 10},
            "commstud": {6, 7, 8, 9, 10},
            "econapp": {6, 7, 8, 9, 10},
        }

        for qt in qgen_types:
            # Namespaced key: "module_name:qtype_name"
            # Module name is the prefix before ":"
            if ":" in qt:
                module_name, qtype_name = qt.split(":", 1)
            else:
                module_name, qtype_name = qt, qt

            qt_lower = qt.lower()
            module_lower = module_name.lower()

            if any(
                frag in module_lower and grade in grades
                for frag, grades in _OUT_OF_SYLLABUS.items()
            ):
                continue

            # discipline-name containment: "science" is inside
            # "home_science" — those modules are a different subject
            exclusions = self._SUBJECT_EXCLUSIONS.get(subject_lower, ())
            if any(x in module_lower or x in qt_lower for x in exclusions):
                continue

            matches_subject = any(a in qt_lower or a in module_lower for a in aliases)
            matches_grade = (
                any(p in module_lower for p in grade_patterns) or
                any(p in qt_lower for p in grade_patterns) or
                module_lower == f"class{grade_str}_questions" or
                module_lower == f"class{grade_str}_{subject_lower}_questions"
            )

            if matches_subject and matches_grade:
                subject_grade_match.append(qt)
            elif matches_subject:
                subject_match.append(qt)

        return subject_grade_match, subject_match

    async def select_for_diagnostic(
        self,
        subject: str,
        topic: str,
        grade: int = 10,
        stream: Optional[str] = None,
        count: int = 5,
    ) -> list[dict[str, Any]]:
        """Select questions for a diagnostic test across a topic.

        Uses the adapter layer to generate real curriculum questions
        at varied difficulty levels. Pattern detection happens once
        per generator at wrap time, not on every call.
        """
        questions: list[dict[str, Any]] = []
        difficulties = [0.3, 0.5, 0.7, 0.4, 0.6]

        if self._adapters is None:
            return self._placeholder_questions(topic, count, difficulties)

        # Find matching generators
        subject_grade_match, subject_match = self._match_generators(subject, topic, grade)

        if not subject_grade_match and not subject_match:
            return self._placeholder_questions(topic, count, difficulties)

        # GRADE PIN (C8): only generators built for the student's class.
        # The old any-grade subject fallback served class-11/12 generator
        # templates to a grade-8 diagnostic — off-grade content must not be
        # generated at all, even as a fallback (a missing grade-match yields
        # an honest placeholder, which the caller's answerable-filter drops).
        ordered = subject_grade_match

        # Filter to only generators that have a working adapter
        # (adapter creation does pattern detection once and caches it)
        usable = []
        for qt in ordered:
            adapter = self._adapters.get_adapter(qt)
            if adapter is not None:
                usable.append(qt)

        if not usable:
            return self._placeholder_questions(topic, count, difficulties)

        # Split usable back into grade-match and fallback for priority
        usable_grade = [qt for qt in usable if qt in subject_grade_match]
        usable_fallback = [qt for qt in usable if qt not in subject_grade_match]

        # Generate questions: try grade-matched generators first per slot,
        # then fallback generators
        for i in range(count):
            diff = difficulties[i % len(difficulties)]
            seed = abs(hash(f"{topic}_{i}")) % (2**32)
            generated = None

            # Try grade-matched generators first
            for j in range(min(len(usable_grade), 10)):
                qtype = usable_grade[(i + j) % len(usable_grade)]
                qs = self._adapters.generate(qtype, seed=seed + i, count=1, difficulty=diff)
                if qs:
                    formatted = self._format_question(qs[0], topic, diff)
                    if formatted:
                        generated = formatted
                        break

            # If still no question, try fallback generators
            if not generated:
                for j in range(min(len(usable_fallback), 5)):
                    qtype = usable_fallback[(i + j) % len(usable_fallback)]
                    qs = self._adapters.generate(qtype, seed=seed + i, count=1, difficulty=diff)
                    if qs:
                        formatted = self._format_question(qs[0], topic, diff)
                        if formatted:
                            generated = formatted
                            break

            if generated:
                questions.append(generated)
            else:
                questions.append(self._placeholder_question(topic, i, diff))

        return questions[:count]

    @staticmethod
    def _format_question(q: Any, topic: str, diff: float) -> dict[str, Any]:
        """Format an adapter-normalized question for the diagnostic API response.

        Handles both dict (from adapter) and raw Question objects (safety net).
        """
        if not isinstance(q, dict):
            # Safety: normalize raw object via adapter layer
            from services.question_adapter import normalize_question
            q = normalize_question(q, "adapter", 0, diff)
            if q is None:
                return None

        return {
            "question_id": q.get("question_id", ""),
            "text": q.get("question_text", ""),
            "question_text": q.get("question_text", ""),
            "options": q.get("options"),
            "correct_answer": q.get("correct_answer", ""),
            "difficulty": diff,
            "topic": topic,
            "question_type": q.get("question_type", "mcq_single"),
            "explanation": q.get("explanation", ""),
            "marks": q.get("marks", 1),
            "cognitive_level": q.get("cognitive_level", ""),
            "competency": q.get("competency", ""),
            "source": q.get("source", ""),
        }

    def _placeholder_question(self, topic: str, idx: int, diff: float) -> dict[str, Any]:
        """Generate a placeholder question when no generator is available."""
        return {
            "question_id": f"diag_{topic}_{idx}",
            "text": f"Diagnostic question {idx+1} for {topic} (difficulty {diff})",
            "options": None,
            "correct_answer": "",
            "difficulty": diff,
            "topic": topic,
            "question_type": "numerical",
        }

    def _placeholder_questions(self, topic: str, count: int, difficulties: list) -> list[dict[str, Any]]:
        """Generate placeholder questions when no generators are available."""
        return [self._placeholder_question(topic, i, difficulties[i % len(difficulties)])
                for i in range(count)]

    async def select_practice_questions(
        self,
        subject: str,
        topic: str,
        grade: int = 10,
        stream: Optional[str] = None,
        target_difficulty: float = 0.5,
        count: int = 3,
    ) -> list[dict[str, Any]]:
        """Select practice questions at a target difficulty for a topic.
        Wrapper around select_for_diagnostic with difficulty targeting.
        """
        return await self.select_for_diagnostic(
            subject=subject, topic=topic, grade=grade, stream=stream, count=count,
        )

    async def select_review(
        self,
        student_id: str,
        subject: str,
        limit: int = 10,
    ) -> list[dict[str, Any]]:
        """
        Select due review questions from SM-2 spaced repetition schedule.

        Args:
            student_id: Student identifier
            subject: Subject to review
            limit: Max review questions to return

        Returns:
            List of review question dicts, sorted by urgency
        """
        review_items = await self._get_review_items(student_id, subject)
        if not review_items:
            return []

        student_theta = await self._get_student_theta(student_id, subject)
        results: list[dict[str, Any]] = []

        for item in review_items[:limit]:
            q = await self._build_review_question(item, student_theta)
            if q:
                results.append(q)

        # Sort by urgency: fewer days since review = more urgent
        results.sort(key=lambda q: q.get("days_since_review", 999))
        return results

    async def select_new_topic(
        self,
        student_id: str,
        subject: str,
        topic: str,
    ) -> dict[str, Any]:
        """
        Select a question from a topic the student hasn't tried yet.
        Starts at easier difficulty to build initial mastery estimate.

        Args:
            student_id: Student identifier
            subject: Subject area
            topic: New topic to introduce

        Returns:
            Question dict for the new topic
        """
        existing = await self._get_topic_attempts(student_id, topic)
        if existing:
            # Student has tried this — use regular selection
            return await self.select_next(
                session_id="new_topic",
                student_id=student_id,
                subject=subject,
            )

        student_theta = await self._get_student_theta(student_id, subject)
        starting_diff = max(DIFFICULTY_MIN, student_theta - 0.3)

        question = await self._generate_for_topic(
            topic, starting_diff, is_competency=False
        )

        if question:
            question["is_new_topic"] = True
            question["starting_difficulty"] = round(starting_diff, 3)
            return question

        return await self._generate_fallback(
            student_id, subject, student_theta, False
        )

    def estimate_difficulty(
        self,
        student_theta: float,
        target_information: Optional[float] = None,
    ) -> dict[str, float]:
        """
        Estimate optimal difficulty range for a student.

        Args:
            student_theta: Current ability estimate
            target_information: Desired item information

        Returns:
            Dict with optimal_difficulty, lower_bound, upper_bound, expected_p_correct
        """
        optimal = estimate_optimal_difficulty(student_theta, target_information)

        return {
            "optimal_difficulty": round(optimal, 4),
            "lower_bound": round(max(DIFFICULTY_MIN, optimal - 0.2), 4),
            "upper_bound": round(min(DIFFICULTY_MAX, optimal + 0.2), 4),
            "expected_p_correct": round(
                irt_probability(student_theta, optimal), 4
            ),
        }

    # ─── Private: Data Access ──────────────────────────────────────────────

    async def _mastery_score(self, student_id: str, subject: str) -> Optional[float]:
        """Overall [0,1] mastery score for the student/subject.

        services.mastery_sync's get_mastery takes NO db session (it owns
        its connection) and returns the mastery DICT; callers here (and
        _get_candidates/_corpus_candidates scoring) want a scalar.
        BKT p_know is the canonical [0,1] knowledge probability, so it
        is the score.  Returns None on any failure — the caller treats
        that as 'no mastery signal' (previous behavior on fetch errors).
        """
        try:
            m = await get_mastery(student_id, subject)
        except Exception:
            return None
        if isinstance(m, dict):
            try:
                return float(m.get("bkt_p_know"))
            except (TypeError, ValueError):
                return None
        if isinstance(m, (int, float)):
            return float(m)
        return None

    async def _get_student_theta(self, student_id: str, subject: str) -> float:
        """
        Get student's IRT ability estimate (theta).
        Priority: IRT model → mastery → default.
        New students get DEFAULT_THETA = 0.0
        """
        # Try IRT model first
        try:
            irt = IRTModel(student_id=student_id, subject=subject)
            theta = irt.theta
            if theta is not None and not (isinstance(theta, float) and np.isnan(theta)):
                return float(np.clip(theta, THETA_CLAMP_MIN, THETA_CLAMP_MAX))
        except Exception:
            pass

        # Fallback: estimate from mastery score
        try:
            mastery_score = await self._mastery_score(student_id, subject)
            if mastery_score is not None:
                # Map mastery [0,1] to theta [-3, 3]
                return float(np.clip((mastery_score - 0.5) * 5, THETA_CLAMP_MIN, THETA_CLAMP_MAX))
        except Exception:
            pass

        return DEFAULT_THETA

    async def _get_review_items(
        self, student_id: str, subject: str
    ) -> list[dict[str, Any]]:
        """Fetch SM-2 due review items for a student."""
        try:
            return await get_review_schedule(student_id, subject)
        except Exception:
            return []

    async def _get_recent_attempt_hashes(
        self, student_id: str, subject: str
    ) -> set[str]:
        """
        Get seed hashes of questions seen in last REPEAT_WINDOW_DAYS.
        Efficient single query with index on (student_id, subject, created_at).
        """
        cutoff = datetime.now(timezone.utc) - timedelta(days=REPEAT_WINDOW_DAYS)

        stmt = (
            select(Attempt.seed_hash)
            .where(
                and_(
                    Attempt.student_id == student_id,
                    Attempt.subject == subject,
                    Attempt.created_at >= cutoff,
                    Attempt.seed_hash.is_not(None),
                )
            )
            .limit(REPEAT_WINDOW_COUNT)
        )
        result = await self.db.execute(stmt)
        return set(result.scalars().all())

    async def _get_topic_attempts(
        self, student_id: str, topic: str
    ) -> list[Any]:
        """Check if student has attempted questions in a specific topic."""
        stmt = (
            select(Attempt)
            .where(
                and_(
                    Attempt.student_id == student_id,
                    Attempt.topic == topic,
                )
            )
            .limit(5)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    # ─── Private: Candidate Generation & Scoring ───────────────────────────

    async def _resolve_class_level(self, student_id: str) -> Optional[int]:
        """Student.student_class → int, or None when unset/non-numeric."""
        if self.db is None or not student_id:
            return None
        try:
            from database import Student
            row = (await self.db.execute(
                select(Student.student_class).where(
                    Student.id == student_id))).scalar_one_or_none()
            if row:
                import re
                m = re.search(r"\d+", str(row))
                if m:
                    return int(m.group())
        except Exception:
            pass
        try:
            # students row has no class — the users table (same id for
            # auth users) usually does; without this the corpus pool
            # runs ungated and other-class questions leak in
            from backend.models.user import User as _UserModel
            row = (await self.db.execute(
                select(_UserModel.class_level).where(
                    _UserModel.id == student_id))).scalar_one_or_none()
            if row:
                return int(row)
        except Exception:
            pass
        return None

    async def _get_candidates(
        self,
        subject: str,
        theta: float,
        diff_lower: float,
        diff_upper: float,
        is_competency: bool,
        exclude_hashes: set[str],
        mastery: Optional[float],
        class_level: Optional[int] = None,
        topic_ids: Optional[list] = None,
        exclude_question_ids: Optional[set] = None,
    ) -> list[dict[str, Any]]:
        """Generate candidate questions and score them via IRT.

        Uses the adapter layer to generate questions through a unified
        interface regardless of the underlying generator pattern.
        """
        candidates: list[dict[str, Any]] = []

        # Corpus-first: real node-derived questions (enhanced_nodes_md →
        # board_questions). Generators fill only what the corpus can't.
        corpus = await self._corpus_candidates(
            subject, theta, diff_lower, diff_upper,
            is_competency, exclude_hashes, mastery, class_level,
            topic_ids=topic_ids,
            exclude_question_ids=exclude_question_ids)
        candidates.extend(corpus)

        # Chapter-scoped sessions NEVER draw from generators: generator
        # items carry no chapter at all, so "practice this chapter" that
        # serves them is the exact C10 grammar-leak defect class.
        if topic_ids:
            return candidates

        if len(corpus) >= 8:
            # Enough real content — generators not needed for this pick
            return candidates

        qtypes = self._get_generators_for_subject(subject)
        if not qtypes:
            if candidates:
                return candidates
            logger.warning("No generators found for subject: %s", subject)
            return []

        date_str = datetime.now(timezone.utc).strftime("%Y%m%d")

        for qtype in qtypes:
            if len(candidates) >= MAX_CANDIDATES:
                break

            for offset in range(30):
                if len(candidates) >= MAX_CANDIDATES:
                    break

                seed = self._compute_seed(qtype, theta, offset, date_str)
                seed_hash = self._hash_seed(seed)

                if seed_hash in exclude_hashes:
                    continue

                target_diff = diff_lower + (diff_upper - diff_lower) * (
                    offset / 30.0
                )

                try:
                    qs = self._adapters.generate(qtype, seed=seed, count=1, difficulty=target_diff)
                except Exception:
                    continue

                if not qs:
                    continue

                question = qs[0]
                if not question.get("question_text"):
                    continue

                # Syllabus-fit (C10 audit): ids like "C10-APP-*" encode the
                # class but not the curriculum — applied maths is an 11/12
                # elective, EVS ends at c5, and the CISCE-only applied
                # electives aren't CBSE subjects. The qtype-level guard in
                # _match_generators covers the subject-matched lanes; this
                # qid-level check is the last line for every other lane.
                _qid0 = str(question.get("question_id") or "")
                _seg0 = re.match(
                    r"(?i)^c(\d{1,2})-(app|evs|commapp|commstud|econapp)-",
                    _qid0)
                if _seg0:
                    _gc0 = int(_seg0.group(1))
                    _pk0 = _seg0.group(2).lower()
                    if ((_pk0 == "evs" and _gc0 >= 6)
                            or (_pk0 == "app" and _gc0 <= 10)
                            or _pk0 in ("commapp", "commstud", "econapp")):
                        continue

                actual_diff = target_diff
                discrim = DEFAULT_DISCRIMINATION

                # IRT scoring
                info = irt_information(theta, actual_diff, discrim)
                p_correct = irt_probability(theta, actual_diff, discrim)
                expected_gain = irt_expected_gain(theta, actual_diff, discrim)

                composite = self._composite_score(
                    info=info,
                    expected_gain=expected_gain,
                    p_correct=p_correct,
                    difficulty=actual_diff,
                    mastery=mastery,
                    is_competency=is_competency,
                )

                candidates.append({
                    "question_id": question.get("question_id", seed_hash),
                    "text": question["question_text"],
                    "options": question.get("options", []),
                    "correct_answer": question.get("correct_answer", ""),
                    "difficulty": actual_diff,
                    "discrimination": discrim,
                    "topic": question.get("node_id", subject),
                    "question_type": question.get("question_type", "standard"),
                    "seed_hash": seed_hash,
                    "seed": seed,
                    "information": info,
                    "p_correct": p_correct,
                    "expected_gain": expected_gain,
                    "composite_score": composite,
                })

        return candidates

    @staticmethod
    def _syllabus_filters(subject: Optional[str], class_level: Optional[int]):
        """SQL conditions excluding rationalised-out topics.

        board_questions rows are tagged by class/subject only — the class-10
        maths tag still carries frustum, Euclid's-division-lemma and
        mathematical-logic items that the rationalised CBSE syllabus
        removed. Exclude them at query level for c10 maths so no lane
        (diagnostic corpus, practice candidates) can serve them.
        """
        try:
            from backend.models.enrichment import BoardQuestion
        except Exception:
            return []
        if class_level != 10:
            return []
        s = (subject or "").lower()
        if s not in ("math", "maths", "mathematics"):
            return []
        return [
            ~BoardQuestion.question_text.ilike(p)
            for p in (
                "%frustum%",
                "%euclid%",
                "%tautology%",
                "%truth table%",
                "%syllogism%",
            )
        ]

    async def get_next_question(
        self,
        ability_estimate: float = 0.0,
        subskill: str = "",
        exclude_ids: Optional[list] = None,
        target_difficulty: float = 0.0,
        subject: Optional[str] = None,
        class_level: Optional[int] = None,
    ) -> dict[str, Any]:
        """Diagnostic-facing corpus selector (enhanced_nodes_md only).

        Theta-scale ability/target (-2..+2) maps onto the node difficulty
        ladder (0..1); nearest corpus diagnostic question wins.
        """
        if self.db is None:
            return {}
        try:
            from backend.models.enrichment import BoardQuestion
            from sqlalchemy import func as sa_func

            target01 = max(0.05, min((target_difficulty + 2.0) / 4.0, 0.95))

            q = select(BoardQuestion).where(
                BoardQuestion.board == "CBSE",
                BoardQuestion.correct_answer.isnot(None),
            )
            subs = self._CORPUS_SUBJECTS.get(
                (subject or "").lower().replace(" ", "_"),
                [(subject or "").lower()] if subject else None)
            if subs is not None:
                q = q.where(BoardQuestion.subject.in_(subs))
            if class_level:
                q = q.where(BoardQuestion.class_level == class_level)
            for cond in self._syllabus_filters(subject, class_level):
                q = q.where(cond)
            if exclude_ids:
                import uuid as _uuid
                excl = []
                for i in exclude_ids:
                    s = str(i)
                    if s.startswith("corpus:"):
                        try:
                            excl.append(_uuid.UUID(s[7:]))
                        except ValueError:
                            pass
                if excl:
                    q = q.where(~BoardQuestion.id.in_(excl))
            rows = (await self.db.execute(
                q.order_by(sa_func.random()).limit(120))).scalars().all()
            if not rows:
                return {}

            best = min(rows, key=lambda r: abs(
                self._corpus_difficulty(r) - target01))
            diff01 = self._corpus_difficulty(best)
            node = (best.node_tags or [None])[0]
            return {
                "id": f"corpus:{best.id}",
                "question_id": f"corpus:{best.id}",
                "text": best.question_text,
                "question_text": best.question_text,
                "options": best.options or [],
                "correct_answer": best.correct_answer,
                "marking_scheme": best.marking_scheme,
                "explanation": best.explanation or best.model_answer or "",
                "difficulty": target_difficulty,   # theta-scale for the engine
                "beta": target_difficulty,
                "subskill": subskill or best.subject,
                "question_type": best.question_type or "text",
                "node_id": node,
                "topic": best.chapter or subject or "",
            }
        except Exception as e:
            logger.warning("corpus diagnostic select failed: %s", e)
            return {}

    async def get_question(self, question_id: str) -> Optional[dict]:
        """Fetch a corpus question's canonical record for grading."""
        if self.db is None or not str(question_id).startswith("corpus:"):
            return None
        try:
            import uuid as _uuid
            from backend.models.enrichment import BoardQuestion
            rid = _uuid.UUID(str(question_id).replace("corpus:", ""))
            row = (await self.db.execute(
                select(BoardQuestion).where(BoardQuestion.id == rid))
            ).scalar_one_or_none()
            if not row:
                return None
            return {
                "id": question_id,
                "question_id": question_id,
                "text": row.question_text,
                "options": row.options or [],
                "correct_answer": row.correct_answer,
                "marking_scheme": row.marking_scheme,
                "explanation": row.explanation or row.model_answer or "",
                "subskill": row.subject,
                "difficulty": self._corpus_difficulty(row),
                "node_id": (row.node_tags or [None])[0],
            }
        except Exception as e:
            logger.warning("corpus get_question failed: %s", e)
            return None

    # ─── Corpus questions (enhanced_nodes_md → board_questions) ───────────

    _CORPUS_SUBJECTS = {
        "mathematics": ["math", "maths"], "maths": ["math", "maths"],
        "math": ["math", "maths"], "biology": ["bio", "biology"],
        "bio": ["bio", "biology"], "physics": ["phy", "physics"],
        "phy": ["phy", "physics"], "chemistry": ["chem", "chemistry"],
        "chem": ["chem", "chemistry"],
        "english": ["engl", "english", "eng_k", "eng_w", "eng_f",
                    "eng_v", "eng_s", "eng_h", "gram", "comp"],
        "computer_science": ["cs"], "cs": ["cs"],
        # C10 audit [STUDENT-C10][P1 OFFSYLL-LOGIC-BANK]: the practice page
        # passes the corpus slugs "grammar" and "computer" directly. They
        # matched NOTHING here (the corpus codes are "gram"/"comp"), so the
        # corpus lane returned zero rows and the subject-blind generator
        # fallback served the class-10 applied-maths generator — grammar
        # practice was 100% propositional-logic items. Map the slugs to
        # their real corpus codes so practice serves the subject it says.
        "grammar": ["gram", "grammar"], "gram": ["gram"],
        "computer": ["comp", "cs", "computer"], "comp": ["comp"],
        "economics": ["eco", "economics"], "eco": ["eco", "economics"],
        "history": ["hist", "history"], "hist": ["hist", "history"],
        "geography": ["geo", "geography"], "geo": ["geo", "geography"],
        "accountancy": ["acc"], "acc": ["acc"],
        "business_studies": ["bs"], "bs": ["bs"],
        "civics": ["civ", "civics"], "civ": ["civ", "civics"],
        "hindi": ["hin_ar", "hin_a", "hin_v", "hin_al"],
        # Electives that exist in board_questions but were missing here:
        # without an alias the fallback list (e.g. ["psychology"]) matches
        # nothing, so their diagnostics silently fill with off-subject
        # generator questions instead of real corpus content.
        "psychology": ["psy"], "psy": ["psy"],
        "biotechnology": ["biotech"], "biotech": ["biotech"],
        "statistics": ["stat"], "stat": ["stat"],
        # science sessions used to match NOTHING (no sci/science subject
        # in board_questions) and fall through to subject-blind
        # generators -> home-science etc. leaked in (B22). Map to the
        # real corpus science subjects; hs/soc/ps stay OUT.
        "science": ["sci", "science", "phy", "chem", "bio", "physics",
                    "chemistry", "biology"],
        "home_science": ["hs"], "hs": ["hs"],
        # social_science diagnostics (C7/C8): the corpus stores the four SST
        # disciplines under their own tags — "soc"/"social_science"/"sst"
        # match zero rows, so SST plans fell through to unfiltered
        # generator content (accountancy HRM items in a class-7 SST run).
        "social_science": ["hist", "geo", "civ", "eco", "soc", "sst"],
        "soc": ["soc"],
        "physical_education": ["ps"], "ps": ["ps"],
        "general": None,  # no subject filter
    }

    _CORPUS_DIFF = {"easy": 0.3, "medium": 0.55, "hard": 0.8}

    @staticmethod
    def _corpus_difficulty(row) -> float:
        """Continuous difficulty from the node's built-in ladder.

        diagnostic Q1-6 are ordered recall→create (0.18 → 0.80);
        worked_example numbers rise with complexity;
        competency/seed carry their own labels.
        """
        st = row.source_type or ""
        qn = row.question_number or 1
        if st == "diagnostic":
            return min(0.18 + (qn - 1) * 0.125, 0.93)
        if st == "worked_example":
            return min(0.40 + (qn - 1) * 0.12, 0.85)
        if st == "seed":
            # question_number encodes seed_index*100 + subpart letter
            sub = (qn % 100) - 1
            return min(0.60 + max(sub, 0) * 0.06, 0.95)
        base = {"easy": 0.3, "medium": 0.55, "hard": 0.8}.get(
            row.difficulty or "medium", 0.55)
        return min(base + (qn - 1) * 0.05, 0.95)

    async def _corpus_candidates(
        self,
        subject: str,
        theta: float,
        diff_lower: float,
        diff_upper: float,
        is_competency: bool,
        exclude_hashes: set[str],
        mastery: Optional[float],
        class_level: Optional[int] = None,
        pool: int = 120,
        topic_ids: Optional[list] = None,
        exclude_question_ids: Optional[set] = None,
    ) -> list[dict[str, Any]]:
        """Pull answered questions from the node corpus and IRT-score them.

        board_questions rows are all extracted from enhanced_nodes_md
        (diagnostics / competency / seed sub-parts / worked examples).
        Node ids are kept internal — never surfaced to the client.

        CHAPTER GATING (C10 audit): when ``topic_ids`` (the session's node
        ids) are provided, candidates are drawn ONLY from those nodes'
        questions while that pool can fill; a too-thin chapter pool widens
        to the subject pool rather than inventing content.
        """
        if self.db is None:
            return []
        try:
            from backend.models.enrichment import BoardQuestion
            from sqlalchemy import func as sa_func, or_, cast, Text as sa_Text

            base = [
                BoardQuestion.board == "CBSE",
                BoardQuestion.correct_answer.isnot(None),
            ]
            subs = self._CORPUS_SUBJECTS.get(
                (subject or "").lower(), [(subject or "").lower()])
            if subs is not None:
                base.append(BoardQuestion.subject.in_(subs))
            if class_level:
                base.append(BoardQuestion.class_level == class_level)
            base.extend(self._syllabus_filters(subject, class_level))
            # competency/seed is a NARROW slice — thin pools (small chapter
            # banks, e.g. the 14-row c10 grammar chapters) often have none,
            # so it degrades instead of emptying the pool (a grammar
            # chapter session used to die into the generator fallback).
            comp_cond = BoardQuestion.source_type.in_(["competency", "seed"])
            base_comp = base + [comp_cond] if is_competency else base

            async def _fetch(conds, lim):
                q = (select(BoardQuestion)
                     .where(*conds)
                     .order_by(sa_func.random())
                     .limit(lim))
                return list((await self.db.execute(q)).scalars().all())

            rows = []
            topic_norm = [str(t).strip() for t in (topic_ids or []) if str(t).strip()]
            if topic_norm:
                tag_like = cast(BoardQuestion.node_tags, sa_Text)
                conds = list(base_comp) + [or_(*[
                    tag_like.ilike(f"%{t}%") for t in topic_norm])]
                rows = await _fetch(conds, pool * 4)
                if not rows and is_competency:
                    rows = await _fetch(list(base) + [or_(*[
                        tag_like.ilike(f"%{t}%") for t in topic_norm])],
                        pool * 4)
                # thin chapter pool → widen to the subject below
            if not rows:
                rows = await _fetch(base_comp, pool)
            if not rows and is_competency:
                rows = await _fetch(base, pool)
        except Exception as e:
            logger.warning("corpus candidate fetch failed: %s", e)
            return []

        out = []
        excl_ids = {str(i) for i in (exclude_question_ids or set())}
        for row in rows:
            if excl_ids:
                row_qid = f"corpus:{row.id}"
                if row_qid in excl_ids:
                    continue  # already issued in this session
            diff = self._corpus_difficulty(row)
            if not (diff_lower <= diff <= diff_upper + 0.15):
                continue
            seed_hash = hashlib.md5(
                f"corpus:{row.id}".encode()).hexdigest()[:16]
            if seed_hash in exclude_hashes:
                continue
            info = irt_information(theta, diff, DEFAULT_DISCRIMINATION)
            p_correct = irt_probability(theta, diff, DEFAULT_DISCRIMINATION)
            gain = irt_expected_gain(theta, diff, DEFAULT_DISCRIMINATION)
            score = self._composite_score(
                info=info, expected_gain=gain, p_correct=p_correct,
                difficulty=diff, mastery=mastery,
                is_competency=is_competency)
            out.append({
                "question_id": f"corpus:{row.id}",
                "text": row.question_text,
                "options": row.options or [],
                "correct_answer": row.correct_answer,
                "marking_scheme": row.marking_scheme,
                "explanation": row.explanation or row.model_answer or "",
                "difficulty": diff,
                "discrimination": DEFAULT_DISCRIMINATION,
                "topic": (row.chapter or subject),  # display-safe label
                "node_id": (row.node_tags or [None])[0],
                "question_type": row.question_type or "text",
                # Provenance (audit §12): real board-paper year/marks ride the
                # candidate so the UI can show "CBSE 2023 · 3 marks" — NULL for
                # node-derived rows, which render no chip (honest-hide).
                "year": getattr(row, "year", None),
                "marks": row.marks or 1,
                "seed_hash": seed_hash,
                "seed": seed_hash,
                "information": info,
                "p_correct": p_correct,
                "expected_gain": gain,
                "composite_score": score,
            })
        return out

    def _composite_score(
        self,
        info: float,
        expected_gain: float,
        p_correct: float,
        difficulty: float,
        mastery: Optional[float],
        is_competency: bool,
    ) -> float:
        """
        Composite scoring function for question ranking.
        Balances IRT information with pedagogical factors.
        """
        # Primary: expected learning gain (IRT-based)
        score = expected_gain * 3.0

        # High information bonus
        score += info * 1.0

        # ── Difficulty appropriateness penalty ──
        if p_correct > 0.9:
            score *= 0.2       # Too easy — boring, no learning
        elif p_correct > 0.8:
            score *= 0.6
        elif p_correct < 0.1:
            score *= 0.1       # Too hard — frustrating
        elif p_correct < 0.2:
            score *= 0.4

        # ── Proximity to mastery level ──
        if mastery is not None:
            # mastery can be a dict (from get_mastery) or a float
            if isinstance(mastery, dict):
                mastery_val = float(mastery.get("overall", 0.5))
            else:
                mastery_val = float(mastery)
            mastery_theta = (mastery_val - 0.5) * 5
            diff_as_theta = (difficulty - 0.5) * 5
            proximity = 1.0 - min(abs(mastery_theta - diff_as_theta) / 3.0, 1.0)
            score += proximity * 0.5

        # ── Competency/Standard type bonus ──
        if is_competency and difficulty < 0.4:
            score += 0.3  # Reward easy competency questions
        elif not is_competency and 0.35 <= difficulty <= 0.75:
            score += 0.15  # Reward mid-range standard questions

        return score

    # ─── Private: Question Generation Helpers ──────────────────────────────

    async def _generate_fallback(
        self,
        student_id: str,
        subject: str,
        theta: float,
        is_competency: bool,
    ) -> dict[str, Any]:
        """Ultimate fallback — force generate a question via adapter layer."""
        qtypes = self._get_generators_for_subject(subject)
        if not qtypes:
            raise ValueError(f"No generators for subject: {subject}")

        difficulty = max(DIFFICULTY_MIN, theta - 0.2)

        for attempt in range(10):
            seed = abs(hash(f"fb_{student_id}_{subject}_{attempt}")) % (2**32)
            for qtype in qtypes:
                try:
                    qs = self._adapters.generate(qtype, seed=seed, count=1, difficulty=difficulty)
                    if qs and qs[0].get("question_text"):
                        q = qs[0]
                        return {
                            "question_id": q.get("question_id", f"fb_{attempt}"),
                            "text": q["question_text"],
                            "options": q.get("options", []),
                            "correct_answer": q.get("correct_answer", ""),
                            "difficulty": difficulty,
                            "topic": q.get("node_id", subject),
                            "question_type": q.get("question_type", "standard"),
                            "seed_hash": self._hash_seed(seed),
                            "is_fallback": True,
                        }
                except Exception:
                    continue

        raise ValueError(f"Cannot generate question for {student_id}/{subject}")

    async def _generate_for_topic(
        self,
        topic: str,
        difficulty: float,
        is_competency: bool,
    ) -> Optional[dict[str, Any]]:
        """Generate a question for a specific topic via adapter layer."""
        if self._registry is None or self._adapters is None:
            return None

        # Try to find a generator matching this topic
        try:
            reg_types = self._registry.list_question_gen_types()
        except Exception:
            return []

        topic_lower = topic.lower()
        for qt in reg_types:
            if topic_lower in qt.lower():
                adapter = self._adapters.get_adapter(qt)
                if adapter is None:
                    continue
                seed = random.randint(0, 2**31)
                try:
                    qs = self._adapters.generate(qt, seed=seed, count=1, difficulty=difficulty)
                    if qs and qs[0].get("question_text"):
                        q = qs[0]
                        return {
                            "question_id": q.get("question_id", str(seed)),
                            "text": q["question_text"],
                            "options": q.get("options", []),
                            "correct_answer": q.get("correct_answer", ""),
                            "difficulty": difficulty,
                            "topic": topic,
                            "question_type": q.get("question_type", "standard"),
                            "seed_hash": self._hash_seed(seed),
                        }
                except Exception:
                    continue

        return None

    async def _pick_review_question(
        self,
        review_items: list[dict[str, Any]],
        student_theta: float,
    ) -> Optional[dict[str, Any]]:
        """
        Pick the best review question from due items.
        Scoring: IRT information + spacing bonus (older = more urgent).
        """
        best_item = None
        best_score = -1.0

        for item in review_items:
            diff = item.get("difficulty", 0.5)
            discrim = item.get("discrimination", DEFAULT_DISCRIMINATION)
            info = irt_information(student_theta, diff, discrim)

            days_since = item.get("days_since_review", 0)
            spacing_bonus = min(days_since / 30.0, 1.0)

            score = info * 2.0 + spacing_bonus * 0.5

            if score > best_score:
                best_score = score
                best_item = item

        if best_item:
            return {
                "question_id": best_item.get("question_id"),
                "text": best_item.get("text", ""),
                "options": best_item.get("options", []),
                "correct_answer": best_item.get("correct_answer"),
                "difficulty": best_item.get("difficulty", 0.5),
                "topic": best_item.get("topic", ""),
                "question_type": "review",
                "seed_hash": best_item.get("seed_hash"),
                "is_review": True,
                "days_since_review": best_item.get("days_since_review", 0),
            }

        return None

    async def _build_review_question(
        self, item: dict[str, Any], student_theta: float
    ) -> Optional[dict[str, Any]]:
        """Build a review question dict from SM-2 schedule item."""
        if not item.get("text"):
            return None

        diff = item.get("difficulty", 0.5)
        discrim = item.get("discrimination", DEFAULT_DISCRIMINATION)

        return {
            "question_id": item.get("question_id"),
            "text": item.get("text"),
            "options": item.get("options", []),
            "correct_answer": item.get("correct_answer"),
            "difficulty": diff,
            "topic": item.get("topic", ""),
            "question_type": "review",
            "seed_hash": item.get("seed_hash"),
            "is_review": True,
            "days_since_review": item.get("days_since_review", 0),
            "information_value": round(irt_information(student_theta, diff, discrim), 4),
        }

    # ─── Private: Helpers ──────────────────────────────────────────────────

    def _get_generators_for_subject(
        self, subject: str
    ) -> list[str]:
        """Resolve subject to matching generator qtype names.

        Returns qtype names (strings) that have working adapters.
        The caller uses self._adapters.generate(qtype, ...) to get questions.

        C10 audit [STUDENT-C10][P1 OFFSYLL-LOGIC-BANK]: subject-gated — a
        subject with no matching generator returns [] instead of the old
        subject-blind "first 10 registered types" fallback, which served
        the class-10 applied-maths (propositional-logic) generator into
        grammar/computer practice. Corpus coverage is the honest fallback
        for unmapped subjects (the corpus lane runs before generators).
        """
        if self._registry is None or self._adapters is None:
            return []

        subject_lower = subject.lower().strip()
        if not subject_lower or subject_lower in ("general", "mixed"):
            # deliberately generic subjects may draw from any generator —
            # every named subject must match by subject, never by luck.
            generic = True
            aliases: list[str] = []
            exclusions: tuple[str, ...] = ()
        else:
            generic = False
            aliases = self._SUBJECT_ALIASES.get(subject_lower, [subject_lower])
            exclusions = self._SUBJECT_EXCLUSIONS.get(subject_lower, ())

        try:
            reg_types = self._registry.list_question_gen_types()
        except Exception:
            return []

        matching = []
        for qt in reg_types:
            # Namespaced key: "module_name:qtype_name"
            if ":" in qt:
                module_name, qtype_name = qt.split(":", 1)
            else:
                module_name, qtype_name = qt, qt
            qt_lower = qt.lower()
            module_lower = module_name.lower()
            if any(x in module_lower or x in qt_lower for x in exclusions):
                continue
            if generic or any(a in qt_lower or a in module_lower for a in aliases):
                # Only include if adapter can wrap it
                adapter = self._adapters.get_adapter(qt)
                if adapter is not None:
                    matching.append(qt)

        return matching

    @staticmethod
    def _compute_seed(topic: str, theta: float, offset: int, date_str: str) -> int:
        """
        Deterministic seed for question generation.
        Same inputs → same seed → same question (reproducibility).
        Date component ensures variety across days.
        """
        raw = f"{topic}:{theta:.4f}:{offset}:{date_str}"
        h = hashlib.md5(raw.encode()).hexdigest()
        return int(h[:8], 16)

    @staticmethod
    def _hash_seed(seed: int) -> str:
        """Create unique hash for repeat detection and question tracking."""
        return hashlib.sha256(str(seed).encode()).hexdigest()[:16]

    def _get_context(self, student_id: str, subject: str) -> SelectionContext:
        """Get or create adaptive context for a student-subject pair."""
        key = f"{student_id}:{subject}"
        if key not in self._context_cache:
            self._context_cache[key] = SelectionContext(student_id, subject)
        return self._context_cache[key]

    @staticmethod
    def _elapsed_ms(start: datetime) -> int:
        """Milliseconds elapsed since start."""
        return int((datetime.now(timezone.utc) - start).total_seconds() * 1000)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# BATCH SELECTOR — For bulk operations (e.g., practice session setup)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class BatchQuestionSelector:
    """
    Pre-generates a batch of questions for a session.
    Useful for practice sessions where you want all questions upfront.
    Uses same IRT scoring but batches the DB calls.
    """

    def __init__(self, db: AsyncSession) -> None:
        self.db = db
        self.inner = QuestionSelector(db)

    async def generate_session_questions(
        self,
        student_id: str,
        subject: str,
        count: int = 20,
    ) -> dict[str, Any]:
        """
        Pre-generate a full session of questions.

        Args:
            student_id: Student identifier
            subject: Subject for the session
            count: Number of questions to generate

        Returns:
            Dict with session config and list of questions
        """
        student_theta = await self.inner._get_student_theta(student_id, subject)
        mastery = await self.inner._mastery_score(student_id, subject)
        review_items = await self.inner._get_review_items(student_id, subject)
        recent_hashes = await self.inner._get_recent_attempt_hashes(student_id, subject)

        ctx = self.inner._get_context(student_id, subject)
        questions: list[dict[str, Any]] = []
        current_theta = student_theta
        current_diff = ctx.current_difficulty

        review_allocated = 0
        review_count = min(len(review_items), max(1, int(count * 0.2)))

        for i in range(count):
            # Allocate review questions at the start
            if review_allocated < review_count and review_items:
                rq = await self.inner._build_review_question(
                    review_items[review_allocated], current_theta
                )
                if rq:
                    rq["position"] = i
                    rq["session_index"] = i
                    questions.append(rq)
                    review_allocated += 1
                    continue

            # Determine difficulty progression
            diff_lower = max(DIFFICULTY_MIN, current_diff - 0.15)
            diff_upper = min(DIFFICULTY_MAX, current_diff + 0.15)
            is_competency = (i % 2 == 0)  # Alternate for balance

            candidates = await self.inner._get_candidates(
                subject, current_theta,
                diff_lower, diff_upper,
                is_competency, recent_hashes,
                mastery,
                await self.inner._resolve_class_level(student_id)
            )

            if candidates:
                best = max(candidates, key=lambda c: c["composite_score"])
                # Update adaptive params
                current_diff = best["difficulty"]
                p_est = best["p_correct"]
                # Simulate theta update (Bayesian approximation)
                if p_est > 0.7:
                    current_theta = min(THETA_CLAMP_MAX, current_theta + 0.05)
                elif p_est < 0.3:
                    current_theta = max(THETA_CLAMP_MIN, current_theta - 0.05)

                best["position"] = i
                best["session_index"] = i
                questions.append(best)
            else:
                # Fallback for this slot
                fb = await self.inner._generate_fallback(
                    student_id, subject, current_theta, is_competency
                )
                fb["position"] = i
                fb["session_index"] = i
                questions.append(fb)

        return {
            "student_id": student_id,
            "subject": subject,
            "estimated_theta": round(student_theta, 4),
            "question_count": len(questions),
            "competency_count": sum(1 for q in questions if q.get("is_competency")),
            "review_count": sum(1 for q in questions if q.get("is_review")),
            "difficulty_range": {
                "min": round(min(q["difficulty"] for q in questions), 3),
                "max": round(max(q["difficulty"] for q in questions), 3),
            },
            "questions": questions,
        }


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CONVENIENCE FUNCTION — Quick selector without class instantiation
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async def select_next_question(
    db: AsyncSession,
    session_id: str,
    student_id: str,
    subject: str,
    previous_correct: Optional[bool] = None,
    previous_difficulty: Optional[float] = None,
) -> dict[str, Any]:
    """Convenience wrapper — create selector, pick question, done."""
    selector = QuestionSelector(db)
    return await selector.select_next(
        session_id, student_id, subject,
        previous_correct, previous_difficulty
    )
