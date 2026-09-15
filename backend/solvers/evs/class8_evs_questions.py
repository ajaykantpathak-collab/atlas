"""
evs/class8_evs_questions.py
==========================
Question generator for Class 8 EVS (Environmental Studies).

Generates randomized question sets with configurable:

Usage:
    from evs.class8_evs_questions import EVSQuestionGenerator
    gen = EVSQuestionGenerator(seed=42)
    qset = gen.generate(chapter="Light", count=5)
"""
import random
import json
from dataclasses import dataclass
from typing import List, Optional, Dict, Any

try:
    from evs.class8_evs_solver import (
        Question, QuestionType, Difficulty, EVSSolver,
    )
except ImportError:
    # Fallback: define minimal types if solver doesn't export them
    from dataclasses import dataclass
    from enum import Enum

    class QuestionType(str, Enum):
        MCQ = "mcq"
        FILL_BLANK = "fill_blank"
        SHORT_ANSWER = "short_answer"
        LONG_ANSWER = "long_answer"

    class Difficulty(str, Enum):
        EASY = "easy"
        MEDIUM = "medium"
        HARD = "hard"

    @dataclass
    class Question:
        question_id: str = ""
        question_text: str = ""
        question_type: object = None
        difficulty: object = None
        options: list = None
        correct_answer: str = ""
        explanation: str = ""
        marks: int = 1

    class EVSSolver:
        pass


@dataclass
class QuestionSet:
    """A generated set of questions."""
    questions: List[Question]
    seed_used: int
    filters_applied: Dict[str, Any]
    total_count: int

    def summary(self) -> str:
        lines = [
            f"QuestionSet | seed={self.seed_used} | total={self.total_count}",
            f"Filters: {json.dumps(self.filters_applied)}",
            "─" * 60,
        ]
        for i, q in enumerate(self.questions, 1):
            lines.append(
                f"  {i}. [{q.id}] {q.chapter} | {q.topic} "
                f"| {q.question_type} | {q.difficulty}"
            )
        return "\n".join(lines)

    def to_dict(self) -> dict:
        return {
            "seed_used": self.seed_used,
            "filters_applied": self.filters_applied,
            "total_count": self.total_count,
            "questions": [q.to_dict() for q in self.questions],
        }


class EVSQuestionGenerator:
    """Generates randomized question sets from the EVS Class 8 question bank."""

    # ─── chapter → topic → question id  lookup ─────────────────
    CHAPTER_TOPIC_MAP: Dict[str, List[str]] = {
        "Crop Production and Management": ["Soil Preparation", "Crop Rotation", "Irrigation", "Harvesting", "Organic Manure", "Storage", "Food from Animals"],
        "Microorganisms: Friend and Foe": ["Types of Microorganisms", "Useful Microorganisms", "Antibiotics", "Disease-Causing Microbes", "Food Preservation", "Vaccines", "Nitrogen Fixation"],
        "Synthetic Fibres and Plastics": ["Synthetic Fibres", "Nylon", "Plastics", "Biodegradability", "Rayon"],
        "Materials: Metals and Non-Metals": ["Properties of Metals", "Reactivity", "Corrosion", "Alloys", "Ionic Compounds", "Displacement Reactions"],
        "Coal and Petroleum": ["Coal", "Petroleum", "Natural Gas", "Petroleum Products", "Fossil Fuels"],
        "Combustion and Flame": ["Combustion", "Types of Combustion", "Flame Zones", "Fire Extinguishers", "Global Warming"],
        "Conservation of Plants and Animals": ["Biosphere Reserve", "Endangered Species", "Migration", "National Parks", "Reforestation", "Red Data Book"],
        "Cell - Structure and Functions": ["Cell Discovery", "Cell Organelles", "Plant vs Animal Cell", "Chloroplasts", "Cell Membrane", "Chromosomes"],
        "Reproduction in Animals": ["Asexual Reproduction", "Sexual Reproduction", "Fertilization", "Oviparous Animals", "Cloning", "Viviparous Animals"],
        "Reaching the Age of Adolescence": ["Puberty", "Hormones", "Menstruation", "Nutrition", "Reproductive Health"],
        "Force and Pressure": ["Force", "Pressure", "Atmospheric Pressure", "Pressure in Liquids"],
        "Friction": ["Types of Friction", "Reducing Friction", "Fluid Friction"],
        "Sound": ["Sound Production", "Human Ear", "Pitch", "Noise Pollution"],
        "Chemical Effects of Electric Current": ["Electroplating", "Conductors", "Electrolysis"],
        "Some Natural Phenomena": ["Lightning", "Earthquake", "Seismograph", "Richter Scale"],
        "Light": ["Reflection", "Human Eye", "Vision Defects", "Multiple Images", "Refraction"],
        "Stars and the Solar System": ["Solar System", "Moon", "Phases of Moon", "Constellations", "Satellites"],
        "Pollution of Air and Water": ["Air Pollution", "Water Pollution", "Greenhouse Effect", "Water Potability", "CFCs", "Ganga Action Plan"],
    }

    def __init__(self, seed: int = 42):
        self.seed = seed
        self.solver = EVSSolver()

    # ─────────────────────────────────────────────────────────────
    # ─────────────────────────────────────────────────────────────
    def generate(
        self,
        seed: Optional[int] = None,
        chapter: Optional[str] = None,
        topic: Optional[str] = None,
        question_type: Optional[str] = None,
        difficulty: Optional[str] = None,
        count: int = 10,
        exclude_ids: Optional[List[str]] = None,
    ) -> QuestionSet:
        """
        Generate a randomized question set.

        Parameters
        ----------
        seed : int, optional
            Random seed for reproducibility (defaults to constructor seed).
        chapter : str, optional
            Filter by chapter name.
        topic : str, optional
            Filter by topic (substring match).
        question_type : str, optional
            Filter by question_type ('mcq', 'true_false', 'fill_blank', etc.)
        difficulty : str, optional
            Filter by difficulty ('easy', 'medium', 'hard').
        count : int
            Number of questions to return (default 10).
        exclude_ids : list[str], optional
            Question IDs to exclude.

        Returns
        -------
        QuestionSet
        """
        effective_seed = seed if seed is not None else self.seed
        rng = random.Random(effective_seed)
        exclude = set(exclude_ids or [])

        pool = self.solver.questions

        if chapter:
            pool = [q for q in pool if q.chapter.lower() == chapter.lower()]
        if topic:
            pool = [q for q in pool if topic.lower() in q.topic.lower()]
        if question_type:
            pool = [q for q in pool if q.question_type == question_type.lower()]
        if difficulty:
            pool = [q for q in pool if q.difficulty == difficulty.lower()]
        pool = [q for q in pool if q.id not in exclude]

        if not pool:
            return QuestionSet(
                questions=[], seed_used=effective_seed,
                filters_applied={"chapter": chapter, "topic": topic,
                                  "question_type": question_type, "difficulty": difficulty, "count": count},
                total_count=0,
            )

        rng.shuffle(pool)
        selected = pool[:count]

        return QuestionSet(
            questions=selected,
            seed_used=effective_seed,
            filters_applied={
                "chapter": chapter,
                "topic": topic,
                "question_type": question_type,
                "difficulty": difficulty,
                "count": count,
            },
            total_count=len(selected),
        )

    # ─────────────────────────────────────────────────────────────
    # ─────────────────────────────────────────────────────────────
    def generate_all_chapters(self, count_per_chapter: int = 3, seed: Optional[int] = None) -> QuestionSet:
        """Generate questions from every chapter equally."""
        effective_seed = seed if seed is not None else self.seed
        rng = random.Random(effective_seed)
        chapters = self.solver.get_all_chapters()
        all_selected = []
        for ch in chapters:
            pool = self.solver.get_questions_by_chapter(ch)
            rng.shuffle(pool)
            all_selected.extend(pool[:count_per_chapter])
        rng.shuffle(all_selected)
        return QuestionSet(
            questions=all_selected,
            seed_used=effective_seed,
            filters_applied={"mode": "all_chapters", "count_per_chapter": count_per_chapter},
            total_count=len(all_selected),
        )

    def generate_chapter_wise(self, chapter: str, seed: Optional[int] = None) -> QuestionSet:
        """Generate all questions from a specific chapter."""
        pool = self.solver.get_questions_by_chapter(chapter)
        effective_seed = seed if seed is not None else self.seed
        rng = random.Random(effective_seed)
        rng.shuffle(pool)
        return QuestionSet(
            questions=pool,
            seed_used=effective_seed,
            filters_applied={"chapter": chapter},
            total_count=len(pool),
        )

    def generate_weekly_test(self, seed: Optional[int] = None) -> QuestionSet:
        """Generate a balanced weekly test: 2 MCQs + 1 TF + 1 FIB + 1 SA per chapter, 5 chapters."""
        effective_seed = seed if seed is not None else self.seed
        rng = random.Random(effective_seed)
        chapters = rng.sample(self.solver.get_all_chapters(), k=min(5, len(self.solver.get_all_chapters())))
        questions_per_chapter = {"mcq": 2, "true_false": 1, "fill_blank": 1, "short_answer": 1}
        selected = []
        for ch in chapters:
            for qtype, count in questions_per_chapter.items():
                pool = [q for q in self.solver.questions
                        if q.chapter == ch and q.question_type == qtype]
                rng.shuffle(pool)
                selected.extend(pool[:count])
        rng.shuffle(selected)
        return QuestionSet(
            questions=selected,
            seed_used=effective_seed,
            filters_applied={"mode": "weekly_test", "chapters": chapters},
            total_count=len(selected),
        )

    def generate_by_difficulty(self, difficulty: str, count: int = 10, seed: Optional[int] = None) -> QuestionSet:
        """Generate questions of a specific difficulty level."""
        return self.generate(difficulty=difficulty, count=count, seed=seed)

    # ─────────────────────────────────────────────────────────────
    # ─────────────────────────────────────────────────────────────
    def verify_answer(self, question_id: str, user_answer: str) -> Dict[str, Any]:
        """Verify a user's answer for a given question ID."""
        q = self.solver.get_question_by_id(question_id)
        if q is None:
            return {"error": f"Question '{question_id}' not found."}

        qt = q.question_type
        if qt == QuestionType.MCQ.value:
            result = self.solver.solve_mcq(q, user_answer)
        elif qt == QuestionType.TRUE_FALSE.value:
            result = self.solver.solve_true_false(q, user_answer)
        elif qt == QuestionType.FILL_BLANK.value:
            result = self.solver.solve_fill_blank(q, user_answer)
        elif qt == QuestionType.MATCHING.value:
            pairs = {}
            for part in user_answer.split(","):
                if "=" in part:
                    k, v = part.split("=", 1)
                    pairs[k.strip()] = v.strip()
            result = self.solver.solve_matching(q, pairs)
        elif qt == QuestionType.SHORT_ANSWER.value:
            result = self.solver.solve_short_answer(q, user_answer)
        else:
            return {"error": f"Unsupported question type: {qt}"}

        return result.to_dict()

    # ─────────────────────────────────────────────────────────────
    # ─────────────────────────────────────────────────────────────
    def get_bank_stats(self) -> Dict[str, Any]:
        """Return statistics about the question bank."""
        questions = self.solver.questions
        by_chapter: Dict[str, int] = {}
        by_type: Dict[str, int] = {}
        by_difficulty: Dict[str, int] = {}
        for q in questions:
            by_chapter[q.chapter] = by_chapter.get(q.chapter, 0) + 1
            by_type[q.question_type] = by_type.get(q.question_type, 0) + 1
            by_difficulty[q.difficulty] = by_difficulty.get(q.difficulty, 0) + 1
        return {
            "total_questions": len(questions),
            "total_chapters": len(self.solver.get_all_chapters()),
            "by_chapter": by_chapter,
            "by_type": by_type,
            "by_difficulty": by_difficulty,
            "chapters": self.solver.get_all_chapters(),
            "topics": self.solver.get_all_topics(),
        }


# ─────────────────────────────────────────────────────────────────
# ─────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    gen = EVSQuestionGenerator(seed=42)

    print("=" * 60)
    print("EVS Class 8 — Question Bank Statistics")
    print("=" * 60)
    stats = gen.get_bank_stats()
    print(f"Total questions  : {stats['total_questions']}")
    print(f"Total chapters   : {stats['total_chapters']}")
    print(f"\nBy type:")
    for t, c in stats["by_type"].items():
        print(f"  {t}: {c}")
    print(f"\nBy difficulty:")
    for d, c in stats["by_difficulty"].items():
        print(f"  {d}: {c}")
    print(f"\nBy chapter:")
    for ch, c in stats["by_chapter"].items():
        print(f"  {ch}: {c}")

    print("\n" + "=" * 60)
    print("Sample: 5 questions from 'Light' chapter")
    print("=" * 60)
    qset = gen.generate(chapter="Light", count=5, seed=42)
    print(qset.summary())

    print("\n" + "=" * 60)
    print("Sample: Weekly Test (5 chapters)")
    print("=" * 60)
    weekly = gen.generate_weekly_test(seed=42)
    print(weekly.summary())

    print("\n" + "=" * 60)
    print("Verification Demo")
    print("=" * 60)
    demo_q = gen.generate(count=3, seed=7)
    for q in demo_q.questions:
        result = gen.verify_answer(q.id, q.correct_answer)
        print(f"\n  [{q.id}] Correct: {q.correct_answer}")
        print(f"  Result → correct={result.get('is_correct')}, explanation={result.get('explanation')[:60]}...")