"""
Class 7 Computer Studies – Pre-built Question Bank
Deterministic, seeded, no LLM in computation.
"""
from __future__ import annotations

import random
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, ClassVar

from class7_cs_solver import (
    Class7CSQuestionGenerator,
    GenerationConfig,
    InternalHardwareSolver,
    ExternalHardwareSolver,
    make_rng,
    CognitiveLevel,
    DifficultyLevel,
)


# ===================================================================
# QuestionBank – curated, ready-to-use question sets
# ===================================================================

@dataclass
class QuestionBank:
    """
    Curated collection of pre-generated questions organised by node
    and competency level. Re-seeds for each call so results are
    reproducible from a fixed seed.
    """
    seed: int = 2024
    _generator_cache: Dict[int, Class7CSQuestionGenerator] = field(
        default_factory=dict, repr=False, compare=False)

    # -- node metadata --------------------------------------------------

    NODE_META: ClassVar[Dict[str, Dict]] = {
        "c7_cs_001": {
            "title": "Internal Hardware Components",
            "chapter": "Chapter 1",
            "components": ["Motherboard", "CPU", "RAM", "ROM", "GPU"],
            "competency": "Board",
            "difficulty": "Hard",
            "cognitive": "Understand",
            "skills": [
                "Define motherboard, CPU, RAM, ROM, GPU",
                "Explain motherboard as connecting platform",
                "Distinguish RAM (volatile) vs ROM (non-volatile)",
                "Describe GPU role in graphics processing",
            ],
        },
        "c7_cs_002": {
            "title": "External Hardware Devices",
            "chapter": "Chapter 1",
            "input": ["Keyboard", "Mouse", "Scanner", "Webcam", "Microphone"],
            "output": ["Monitor", "Printer", "Projector", "Speaker"],
            "storage": ["External HDD", "USB Flash Drive", "CD / DVD"],
            "competency": "Board",
            "difficulty": "Medium",
            "cognitive": "Remember",
            "skills": [
                "Classify external devices as input / output / storage",
                "Describe function of specific devices (scanner, projector)",
                "Distinguish internal vs external hardware",
            ],
        },
    }

    # -- competency-level question counts ------------------------------

    COMPETENCY_CONFIG: ClassVar[Dict[str, Dict]] = {
        "Board":     {"num_questions": 6, "difficulty": "Medium"},
        "Advanced":  {"num_questions": 4, "difficulty": "Hard"},
        "Practice":  {"num_questions": 8, "difficulty": "Easy"},
    }

    # ------------------------------------------------------------------
    # Internal: get or create generator
    # ------------------------------------------------------------------

    def _get_generator(self, seed: int) -> Class7CSQuestionGenerator:
        if seed not in self._generator_cache:
            self._generator_cache[seed] = Class7CSQuestionGenerator(
                GenerationConfig(seed=seed, num_questions=10))
        return self._generator_cache[seed]

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def get_quiz(self,
                 node_id: str = "all",
                 competency: str = "Board",
                 seed: Optional[int] = None,
                 show_answers: bool = False) -> str:
        """
        Return a formatted quiz string for a given node and competency.

        Parameters
        ----------
        node_id : str
            'c7_cs_001', 'c7_cs_002', or 'all'.
        competency : str
            'Board', 'Advanced', or 'Practice'.
        seed : int | None
            Random seed. Uses self.seed if None.
        show_answers : bool
            If True, append explanations after each question.
        """
        seed = seed if seed is not None else self.seed
        gen = self._get_generator(seed)
        cfg = self.COMPETENCY_CONFIG.get(competency, self.COMPETENCY_CONFIG["Board"])
        n = cfg["num_questions"]

        if node_id == "all":
            questions = gen.get_questions(n)
        else:
            questions = gen.get_questions_by_topic(node_id, n)

        return gen.print_quiz(questions, show_answers=show_answers)

    def get_questions(self,
                      node_id: str,
                      n: int = 4,
                      seed: Optional[int] = None) -> List:
        """Return a plain list of Question objects."""
        seed = seed if seed is not None else self.seed
        gen = self._get_generator(seed)
        return gen.get_questions_by_topic(node_id, n)

    def verify(self, question_id: str, answer: str,
               seed: Optional[int] = None) -> Dict:
        """
        Verify a student's answer for a given question ID.

        Returns a dict with keys:
            question_id, selected, correct_answer, is_correct, explanation
        """
        seed = seed if seed is not None else self.seed
        gen = self._get_generator(seed)
        return gen.verify_answer(question_id, answer)

    def explain_topic(self, node_id: str) -> str:
        """
        Return a plain-English summary of the topic for revision.
        """
        meta = self.NODE_META.get(node_id, {})
        lines = [f"\n{'='*60}",
                 f"  TOPIC: {meta.get('title', node_id)}",
                 f"  Chapter: {meta.get('chapter', 'N/A')}",
                 f"{'='*60}"]

        if node_id == "c7_cs_001":
            lines.append("\n  FIVE INTERNAL HARDWARE COMPONENTS\n")
            for comp in meta.get("components", []):
                lines.append(f"  • {comp}")
            lines.append("\n  KEY CONCEPTS:")
            for skill in meta.get("skills", []):
                lines.append(f"    – {skill}")
            lines.append("""
  ANALOGIES TO REMEMBER:
    • Motherboard → Backbone (connects everything)
    • CPU         → Brain (processes instructions)
    • RAM         → Short-term memory (temporary, volatile)
    • ROM         → Permanent memory (non-volatile, stores boot)
    • GPU         → Artist (processes graphics & video)

  VOLATILE vs NON-VOLATILE:
    • Volatile (RAM):      loses data when power OFF
    • Non-volatile (ROM):  keeps data when power OFF
""")

        elif node_id == "c7_cs_002":
            lines.append("\n  INPUT DEVICES (send data TO computer):")
            for d in meta.get("input", []):
                lines.append(f"    • {d}")
            lines.append("\n  OUTPUT DEVICES (receive data FROM computer):")
            for d in meta.get("output", []):
                lines.append(f"    • {d}")
            lines.append("\n  STORAGE DEVICES (save data for later):")
            for d in meta.get("storage", []):
                lines.append(f"    • {d}")
            lines.append("\n  KEY CONCEPTS:")
            for skill in meta.get("skills", []):
                lines.append(f"    – {skill}")
            lines.append("""
  INTERNAL vs EXTERNAL:
    • Internal hardware → inside the computer case
      (Motherboard, CPU, RAM, ROM, GPU)
    • External hardware → outside, connected as peripherals
      (Keyboard, Mouse, Monitor, Printer, Scanner, …)

  FUNCTIONS TO REMEMBER:
    • Scanner  → paper document → digital image
    • Projector→ displays large images on screen
    • Webcam   → captures live video
    • Printer  → produces hard copy on paper
""")

        lines.append("=" * 60)
        return "\n".join(lines)

    def node_stats(self, seed: Optional[int] = None) -> Dict[str, Dict]:
        """Return statistics on the generated question pool."""
        seed = seed if seed is not None else self.seed
        gen = self._get_generator(seed)
        stats = {}
        for node_id in ["c7_cs_001", "c7_cs_002"]:
            pool = [q for q in gen._question_pool if q.node_id == node_id]
            cog_levels: Dict[str, int] = {}
            for q in pool:
                cog_levels[q.cognitive_level] = cog_levels.get(q.cognitive_level, 0) + 1
            stats[node_id] = {
                "total_generated": len(pool),
                "by_cognitive_level": cog_levels,
                "meta": self.NODE_META.get(node_id, {}),
            }
        return stats


# ===================================================================
# Convenience CLI
# ===================================================================

def main():
    bank = QuestionBank(seed=42)

    # 1. Node 001 quiz – Board level
    print(bank.get_quiz("c7_cs_001", competency="Board", seed=42,
                         show_answers=True))

    # 2. Node 002 quiz – Board level
    print(bank.get_quiz("c7_cs_002", competency="Board", seed=42,
                         show_answers=True))

    # 3. Topic explanations
    print(bank.explain_topic("c7_cs_001"))
    print(bank.explain_topic("c7_cs_002"))

    # 4. Stats
    stats = bank.node_stats(seed=42)
    for node_id, s in stats.items():
        print(f"\n{node_id}: {s['total_generated']} questions | "
              f"Cognitive levels: {s['by_cognitive_level']}")

    # 5. Verification demo
    sample_qs = bank.get_questions("c7_cs_001", n=1, seed=42)
    if sample_qs:
        q = sample_qs[0]
        print(f"\nVerification demo for Q[{q.id}]:")
        print(f"  Correct answer = {q.correct_answer}")
        result = bank.verify(q.id, q.correct_answer, seed=42)
        print(f"  is_correct     = {result['is_correct']}")


if __name__ == "__main__":
    main()