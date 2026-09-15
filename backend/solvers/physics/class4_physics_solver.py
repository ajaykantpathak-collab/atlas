"""
Class 4 Physics Solver — Deterministic
=======================================
Covers: EVS Light themes (Nodes c4_phy_001, c4_phy_002, c4_phy_003)

Provides:
  - Classification of light sources, objects, and materials
  - Answer checking (MCQ, fill-blank, true/false, classification, short-answer)
  - Step-by-step solutions at Class-4 reading level
  - Mastery validation with personalised recommendations
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  KNOWLEDGE BASES  (module-level, deterministic)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NATURAL_LIGHT_SOURCES: set[str] = {
    "sun", "stars", "star", "moon", "firefly", "lightning",
    "aurora", "bioluminescence",
}

ARTIFICIAL_LIGHT_SOURCES: set[str] = {
    "lamp", "torch", "candle", "electric bulb", "tubelight",
    "diya", "fairy lights", "street light", "bulb", "led",
    "cfl", "halogen", "neon light", "headlight", "table lamp",
    "wall lamp", "study lamp", "lantern", "gas lamp", "oil lamp",
    "crackers", "sparklers",
}

LUMINOUS_OBJECTS: set[str] = {
    "sun", "stars", "star", "firefly", "lightning",
    "lamp", "candle", "torch", "electric bulb", "tubelight",
    "bulb", "diya", "led light", "neon light",
}

NON_LUMINOUS_OBJECTS: set[str] = {
    "book", "chair", "table", "moon", "wall", "door",
    "pen", "bag", "shirt", "tree", "bottle", "cup",
    "desk", "bench", "blackboard", "window", "mirror",
    "paper", "stone", "rock", "cloud", "pencil", "rubber",
    "shoe", "ball", "cupboard", "wardrobe", "floor",
}

TRANSPARENT_MATERIALS: set[str] = {
    "glass", "clear glass", "clear plastic", "clear water",
    "cellophane", "clear acrylic", "plain glass",
    "glass sheet", "transparent sheet", "spectacles",
    "magnifying glass",
}

TRANSLUCENT_MATERIALS: set[str] = {
    "frosted glass", "butter paper", "wax paper",
    "cloudy plastic", "thin cloth", "rice paper",
    "parchment paper", "tracing paper", "thin fabric",
    "lamp shade", "shade", "stained glass",
}

OPAQUE_MATERIALS: set[str] = {
    "wood", "metal", "brick", "cardboard", "wall",
    "door", "book", "stone", "rock", "cloth",
    "thick paper", "plastic sheet", "aluminum",
    "iron", "steel", "concrete", "ceramic", "thick glass",
    "aluminium", "copper",
}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  DATA CLASSES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

@dataclass
class Question:
    """A Class-4 Physics question."""
    node_id: str
    node_name: str
    question_type: str           # mcq | fill_blank | true_false | classification | short_answer
    question_text: str
    options: List[str] = field(default_factory=list)
    correct_answer: str = ""
    explanation: str = ""
    hint: str = ""
    marks: int = 1
    topic: str = ""
    competency: str = "Remember"


@dataclass
class AnswerResult:
    """Result of checking a student's answer."""
    is_correct: bool
    correct_answer: str
    explanation: str
    step_by_step: List[str] = field(default_factory=list)
    marks_obtained: float = 0.0
    feedback: str = ""


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#  SOLVER
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class Class4PhysicsSolver:
    """
    Deterministic solver for Class 4 Physics (EVS — Light themes).

    Usage::

        solver = Class4PhysicsSolver()
        result = solver.check_answer(q, "sun")
        steps  = solver.get_solution(q)
    """

    # ────────────────────────────────────────────────────────────
    #  Classification helpers
    # ────────────────────────────────────────────────────────────

    @staticmethod
    def _fuzzy_match(item: str, pool: set[str]) -> Optional[str]:
        """Return a pool entry that matches, else None."""
        item_l = item.strip().lower()
        if item_l in pool:
            return item_l
        for entry in pool:
            if " " in entry:                      # multi-word → exact substring
                if entry in item_l or item_l in entry:
                    return entry
            else:
                if entry in item_l.split():
                    return entry
        return None

    def classify_light_source(self, item: str) -> str:
        """Return 'natural', 'artificial', or 'unknown'."""
        if self._fuzzy_match(item, NATURAL_LIGHT_SOURCES):
            return "natural"
        if self._fuzzy_match(item, ARTIFICIAL_LIGHT_SOURCES):
            return "artificial"
        return "unknown"

    def classify_object(self, item: str) -> str:
        """Return 'luminous', 'non-luminous', or 'unknown'."""
        if self._fuzzy_match(item, LUMINOUS_OBJECTS):
            return "luminous"
        if self._fuzzy_match(item, NON_LUMINOUS_OBJECTS):
            return "non-luminous"
        return "unknown"

    def classify_material(self, item: str) -> str:
        """Return 'transparent', 'translucent', or 'opaque'."""
        if self._fuzzy_match(item, TRANSPARENT_MATERIALS):
            return "transparent"
        if self._fuzzy_match(item, TRANSLUCENT_MATERIALS):
            return "translucent"
        if self._fuzzy_match(item, OPAQUE_MATERIALS):
            return "opaque"
        return "unknown"

    # ────────────────────────────────────────────────────────────
    #  Generic dispatcher
    # ────────────────────────────────────────────────────────────

    def classify(self, node_id: str, item: str) -> Tuple[str, str]:
        """
        Classify *item* according to *node_id*.

        Returns (classification_label, explanation_string).
        """
        title = item.strip().title()
        if node_id == "c4_phy_001":
            r = self.classify_light_source(item)
            if r == "natural":
                return ("Natural", f"{title} is a natural source of light — it is given by nature, not made by humans.")
            if r == "artificial":
                return ("Artificial", f"{title} is an artificial source of light — it is made by people.")
            return ("Unknown", f"'{item}' is not in the knowledge base. Is it a light source?")

        if node_id == "c4_phy_002":
            r = self.classify_object(item)
            if r == "luminous":
                return ("Luminous", f"{title} is a luminous object — it produces its own light.")
            if r == "non-luminous":
                return ("Non-Luminous", f"{title} is non-luminous — it does not produce its own light.")
            return ("Unknown", f"'{item}' is not in the knowledge base. Is it an object?")

        if node_id == "c4_phy_003":
            r = self.classify_material(item)
            if r == "transparent":
                return ("Transparent", f"{title} is transparent — light passes through it completely, so we can see clearly.")
            if r == "translucent":
                return ("Translucent", f"{title} is translucent — only some light passes through; we cannot see clearly.")
            if r == "opaque":
                return ("Opaque", f"{title} is opaque — it blocks light completely; nothing can be seen through it.")
            return ("Unknown", f"'{item}' is not in the knowledge base. What material is it?")

        return ("Unknown", f"Unknown node_id '{node_id}'.")

    # ────────────────────────────────────────────────────────────
    #  Answer checking
    # ────────────────────────────────────────────────────────────

    def check_answer(self, question: Question, user_answer: str) -> AnswerResult:
        """Universal entry-point — dispatches to the right checker."""
        qt = question.question_type.lower().replace("-", "_").replace(" ", "_")

        if qt == "mcq":
            return self._check_mcq(question, user_answer)
        if qt in ("fill_blank", "fillblank", "fill_in_blank"):
            return self._check_fill_blank(question, user_answer)
        if qt in ("true_false", "truefalse", "tf"):
            return self._check_true_false(question, user_answer)
        if qt in ("short_answer", "shortanswer", "explain"):
            return self._check_short_answer(question, user_answer)
        if qt == "classification":
            return self._check_classification(question, user_answer)

        # Fallback
        ok = user_answer.strip().lower() == question.correct_answer.strip().lower()
        return AnswerResult(
            is_correct=ok,
            correct_answer=question.correct_answer,
            explanation=question.explanation,
            marks_obtained=question.marks if ok else 0.0,
        )

    # -- individual checkers ----------------------------------------

    def _check_mcq(self, q: Question, user: str) -> AnswerResult:
        correct_lower = q.correct_answer.strip().lower()
        user_lower = user.strip().lower()

        is_correct = False
        # match by letter (a/b/c/d) or by text
        if user_lower == correct_lower:
            is_correct = True
        elif len(user_lower) == 1 and user_lower.isalpha():
            idx = ord(user_lower) - ord("a")
            if 0 <= idx < len(q.options):
                opt_text = q.options[idx].split("(")[0].strip().lower()
                is_correct = (opt_text == correct_lower)
        else:
            # try matching the option text directly
            for opt in q.options:
                opt_core = opt.split("(")[0].strip().lower()
                if user_lower == opt_core:
                    is_correct = (opt_core == correct_lower)
                    break

        return AnswerResult(
            is_correct=is_correct,
            correct_answer=q.correct_answer,
            explanation=q.explanation,
            marks_obtained=q.marks if is_correct else 0.0,
            feedback=("Correct! Well done! 🌟" if is_correct
                      else f"Not quite. The correct answer is: {q.correct_answer}"),
        )

    def _check_fill_blank(self, q: Question, user: str) -> AnswerResult:
        correct_words = set(re.sub(r"[^\w\s]", "", q.correct_answer).lower().split())
        user_words = set(re.sub(r"[^\w\s]", "", user).lower().split())
        stop = {"a", "an", "the", "is", "are", "was", "were", "of", "in", "on"}
        key_correct = correct_words - stop
        key_user = user_words - stop
        overlap = key_correct & key_user
        is_correct = bool(overlap)

        return AnswerResult(
            is_correct=is_correct,
            correct_answer=q.correct_answer,
            explanation=q.explanation,
            marks_obtained=q.marks if is_correct else 0.0,
            feedback=("Correct! Well done! 🌟" if is_correct
                      else f"Not quite. The answer is: {q.correct_answer}"),
        )

    def _check_true_false(self, q: Question, user: str) -> AnswerResult:
        truth_map = {"true": "true", "t": "true", "yes": "true",
                     "false": "false", "f": "false", "no": "false"}
        u = truth_map.get(user.strip().lower(), user.strip().lower())
        c = truth_map.get(q.correct_answer.strip().lower(), q.correct_answer.strip().lower())
        is_correct = u == c
        return AnswerResult(
            is_correct=is_correct,
            correct_answer=q.correct_answer,
            explanation=q.explanation,
            marks_obtained=q.marks if is_correct else 0.0,
            feedback=("Correct! Well done! 🌟" if is_correct
                      else f"Not quite. The correct answer is: {q.correct_answer.upper()}"),
        )

    def _check_short_answer(self, q: Question, user: str) -> AnswerResult:
        correct_l = q.correct_answer.lower()
        user_l = user.lower()
        phrases = [p.strip() for p in re.split(r"[,;]", correct_l) if len(p.strip()) > 3]
        hits = sum(1 for ph in phrases if ph in user_l)
        is_correct = hits >= max(1, len(phrases) // 2)
        return AnswerResult(
            is_correct=is_correct,
            correct_answer=q.correct_answer,
            explanation=q.explanation,
            marks_obtained=q.marks if is_correct else 0.0,
            feedback=("Correct! Well done! 🌟" if is_correct
                      else f"Partially correct. Full answer: {q.correct_answer}"),
        )

    def _check_classification(self, q: Question, user: str) -> AnswerResult:
        is_correct = q.correct_answer.strip().lower() in user.strip().lower()
        return AnswerResult(
            is_correct=is_correct,
            correct_answer=q.correct_answer,
            explanation=q.explanation,
            marks_obtained=q.marks if is_correct else 0.0,
            feedback=("Correct! Well done! 🌟" if is_correct
                      else f"Not quite. The correct classification is: {q.correct_answer}"),
        )

    # ────────────────────────────────────────────────────────────
    #  Step-by-step solutions
    # ────────────────────────────────────────────────────────────

    def get_solution(self, question: Question) -> List[str]:
        """Return a list of explanation steps (class-4 reading level)."""
        routers = {
            "c4_phy_001": self._sol_001,
            "c4_phy_002": self._sol_002,
            "c4_phy_003": self._sol_003,
        }
        fn = routers.get(question.node_id, self._sol_generic)
        return fn(question)

    def _sol_001(self, q: Question) -> List[str]:
        s: List[str] = []
        s.append("📚  Step 1 — Remember what a light source is.")
        s.append("   A light source is anything that gives us light.")
        s.append("")
        s.append("🔍  Step 2 — Two types of light sources:")
        s.append("   Natural  → given by nature, NOT made by humans")
        s.append("              Examples: sun, stars, firefly, lightning")
        s.append("   Artificial → made by people to produce light")
        s.append("              Examples: lamp, torch, candle, electric bulb, tubelight")
        if q.question_type == "mcq" and q.options:
            s.append("")
            s.append("🎯  Step 3 — Check each option:")
            for opt in q.options:
                core = opt.split("(")[0].strip()
                cls = self.classify_light_source(core)
                s.append(f"   • {opt}  →  {cls.title()} source")
        s.append("")
        s.append(f"✅  Answer: {q.correct_answer}")
        s.append(f"💡  {q.explanation}")
        return s

    def _sol_002(self, q: Question) -> List[str]:
        s: List[str] = []
        s.append("📚  Step 1 — Remember the two kinds of objects:")
        s.append("   Luminous      → makes its OWN light")
        s.append("                   Sun, lamp, candle, firefly, torch")
        s.append("   Non-luminous  → does NOT make its own light")
        s.append("                   Book, chair, table, moon, wall")
        s.append("                   (they only reflect light falling on them)")
        if q.question_type == "mcq" and q.options:
            s.append("")
            s.append("🎯  Step 2 — Check each option:")
            for opt in q.options:
                core = opt.split("(")[0].strip()
                cls = self.classify_object(core)
                s.append(f"   • {opt}  →  {cls.title()}")
        if "moon" in q.question_text.lower():
            s.append("")
            s.append("🌙  Tip: The moon looks bright but it is NON-LUMINOUS.")
            s.append("   It only reflects sunlight. It does NOT produce its own light.")
        s.append("")
        s.append(f"✅  Answer: {q.correct_answer}")
        s.append(f"💡  {q.explanation}")
        return s

    def _sol_003(self, q: Question) -> List[str]:
        s: List[str] = []
        s.append("📚  Step 1 — Three ways materials interact with light:")
        s.append("   Transparent  → light passes COMPLETELY  (we see clearly)")
        s.append("                   Examples: glass, clear plastic, clear water")
        s.append("   Translucent  → only PARTIAL light passes (we see blurrily)")
        s.append("                   Examples: frosted glass, butter paper, wax paper")
        s.append("   Opaque       → blocks light COMPLETELY  (nothing seen through)")
        s.append("                   Examples: wood, metal, brick, cardboard")
        if q.question_type == "mcq" and q.options:
            s.append("")
            s.append("🎯  Step 2 — Evaluate each option:")
            for opt in q.options:
                core = opt.split("(")[0].strip()
                cls = self.classify_material(core)
                s.append(f"   • {opt}  →  {cls.title()}")
        s.append("")
        s.append(f"✅  Answer: {q.correct_answer}")
        s.append(f"💡  {q.explanation}")
        return s

    def _sol_generic(self, q: Question) -> List[str]:
        return [
            f"Question: {q.question_text}",
            f"Answer: {q.correct_answer}",
            f"Explanation: {q.explanation}",
        ]

    # ────────────────────────────────────────────────────────────
    #  Mastery validation
    # ────────────────────────────────────────────────────────────

    MASTERY_THRESHOLD = 80.0   # percent

    def validate_mastery(
        self, node_id: str, answers: Dict[str, Tuple[Any, bool]]
    ) -> Dict[str, Any]:
        """
        Check whether a student has mastered *node_id*.

        *answers* maps question_id → (user_answer, is_correct_bool).
        """
        total = len(answers)
        correct = sum(1 for _, (_, ok) in answers.items() if ok)
        pct = round(correct / total * 100, 1) if total else 0.0

        if pct >= self.MASTERY_THRESHOLD:
            status = "Mastered"
        elif pct >= 50:
            status = "Developing"
        else:
            status = "Needs Practice"

        return {
            "node_id": node_id,
            "total": total,
            "correct": correct,
            "incorrect": total - correct,
            "percentage": pct,
            "status": status,
            "threshold": self.MASTERY_THRESHOLD,
            "recommendation": self._recommendation(status, node_id),
        }

    def _recommendation(self, status: str, node_id: str) -> str:
        recs: Dict[str, Dict[str, str]] = {
            "c4_phy_001": {
                "Mastered": "🌟 Great! You know natural vs artificial sources. "
                            "Look around your home and name 5 more light sources!",
                "Developing": "👍 Getting there! Remember: Sun, stars, firefly = natural. "
                              "Lamp, torch, candle = artificial. Try again!",
                "Needs Practice": "📖 Let's start simply. Natural = from nature "
                                  "(sun, stars). Artificial = made by humans (lamp, candle). "
                                  "Read the examples and retry.",
            },
            "c4_phy_002": {
                "Mastered": "🌟 Excellent! You know luminous vs non-luminous. "
                            "Can you explain why the moon is non-luminous?",
                "Developing": "👍 Good progress! Luminous = makes its own light (sun, lamp). "
                              "Non-luminous = does not (book, chair, moon). Try again!",
                "Needs Practice": "📖 Let's build from the basics. The sun gives its own light "
                                  "→ luminous. A book needs a lamp to be seen → non-luminous. "
                                  "The moon is non-luminous too — it only reflects sunlight.",
            },
            "c4_phy_003": {
                "Mastered": "🌟 Wonderful! Transparent, translucent, opaque — all clear! "
                            "Classify 5 objects in your classroom right now.",
                "Developing": "👍 Improving! Transparent = see clearly (glass). "
                              "Translucent = blurry view (butter paper). "
                              "Opaque = nothing visible (wood). Keep going!",
                "Needs Practice": "📖 Learn the three words first: Transparent (glass), "
                                  "Translucent (butter paper), Opaque (wood). "
                                  "Then look at objects around you and classify them.",
            },
        }
        return recs.get(node_id, {}).get(status, "Keep practising!")