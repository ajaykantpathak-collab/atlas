"""
synthetic_student.py
Simulates real students with different ability levels, behaviors, and learning patterns.

Student archetypes:
  - high_achiever:    answers correctly 85% of the time, rarely asks for hints
  - average_student:  answers correctly 55% of the time, occasionally asks hints
  - struggling:       answers correctly 30% of the time, often asks for hints
  - guesser:          picks random MCQ options, never reads walkthroughs
  - perfectionist:    asks for hints even when they might know the answer
  - impatient:        types "ready" immediately, doesn't read content, asks for answers

Each student:
  1. Reads the introduction (or skips it)
  2. Answers questions (correctly based on their ability + question difficulty)
  3. May request hints when stuck
  4. May go off-script with random questions
  5. Produces a realistic interaction log
"""

from __future__ import annotations

import logging
import random
from dataclasses import dataclass, field
from typing import Any

logger = logging.getLogger(__name__)


@dataclass
class StudentProfile:
    """Defines a synthetic student's behavior."""
    name: str
    archetype: str
    # Probability of answering correctly (base rate, modified by question difficulty)
    base_accuracy: float
    # Probability of requesting a hint when stuck
    hint_probability: float
    # Probability of reading the introduction before continuing
    read_intro_probability: float
    # Probability of going off-script with unrelated questions
    off_script_probability: float
    # Probability of trying to game the system (ask for direct answers)
    gaming_probability: float
    # How many times to re-attempt after getting wrong
    max_retries: int
    # Delay between interactions (simulates thinking time, in ms)
    avg_think_time_ms: int


# --------------------------------------------------------------------------- #
#  Student Archetypes                                                         #
# --------------------------------------------------------------------------- #

ARCHETYPES = {
    "high_achiever": StudentProfile(
        name="High Achiever",
        archetype="high_achiever",
        base_accuracy=0.85,
        hint_probability=0.05,
        read_intro_probability=0.90,
        off_script_probability=0.02,
        gaming_probability=0.0,
        max_retries=2,
        avg_think_time_ms=3000,
    ),
    "average_student": StudentProfile(
        name="Average Student",
        archetype="average_student",
        base_accuracy=0.55,
        hint_probability=0.30,
        read_intro_probability=0.70,
        off_script_probability=0.05,
        gaming_probability=0.02,
        max_retries=3,
        avg_think_time_ms=5000,
    ),
    "struggling": StudentProfile(
        name="Struggling Student",
        archetype="struggling",
        base_accuracy=0.30,
        hint_probability=0.60,
        read_intro_probability=0.80,
        off_script_probability=0.08,
        gaming_probability=0.05,
        max_retries=4,
        avg_think_time_ms=8000,
    ),
    "guesser": StudentProfile(
        name="Guesser",
        archetype="guesser",
        base_accuracy=0.25,  # random MCQ = 25% chance
        hint_probability=0.10,
        read_intro_probability=0.10,
        off_script_probability=0.03,
        gaming_probability=0.15,
        max_retries=1,
        avg_think_time_ms=1000,
    ),
    "perfectionist": StudentProfile(
        name="Perfectionist",
        archetype="perfectionist",
        base_accuracy=0.70,
        hint_probability=0.50,  # asks hints even when they might know
        read_intro_probability=0.95,
        off_script_probability=0.03,
        gaming_probability=0.0,
        max_retries=3,
        avg_think_time_ms=6000,
    ),
    "impatient": StudentProfile(
        name="Impatient Student",
        archetype="impatient",
        base_accuracy=0.45,
        hint_probability=0.40,
        read_intro_probability=0.20,  # skips intro
        off_script_probability=0.10,
        gaming_probability=0.20,  # often tries to get direct answers
        max_retries=2,
        avg_think_time_ms=1500,
    ),
}


# --------------------------------------------------------------------------- #
#  Synthetic Student                                                          #
# --------------------------------------------------------------------------- #

class SyntheticStudent:
    """A simulated student that interacts with the UnifiedSocraticEngine."""

    def __init__(self, student_id: str, profile: StudentProfile, seed: int | None = None):
        self.student_id = student_id
        self.profile = profile
        self.rng = random.Random(seed if seed is not None else hash(student_id))
        self.interaction_log: list[dict] = []

    def generate_intro_response(self) -> str:
        """Generate student's response to the INTRODUCE state."""
        if self.rng.random() < self.profile.read_intro_probability:
            return "ready"
        else:
            # Skips reading, just wants to continue
            return "ready"

    def generate_answer(self, question: dict, attempt_num: int = 1) -> str:
        """Generate an answer for a diagnostic question.

        Simulates realistic student behavior based on:
        - Base accuracy
        - Question difficulty (Bloom level)
        - Attempt number (slightly better on retries due to hints)
        - Student archetype
        """
        answer_type = question.get("answer_type", "text").lower()
        correct_answer = question.get("answer", "")
        options = question.get("options", [])
        bloom_level = question.get("bloom_level", "recall").lower()

        # Adjust accuracy based on Bloom level (higher Bloom = harder)
        bloom_difficulty = {
            "recall": 1.0,
            "reasoning": 0.85,
            "evaluate": 0.70,
            "apply": 0.75,
            "create": 0.60,
        }
        difficulty_modifier = bloom_difficulty.get(bloom_level, 0.85)

        # Adjust for attempt (hints help a bit)
        attempt_modifier = 1.0 + (attempt_num - 1) * 0.15

        # Final probability of correct answer
        p_correct = min(self.profile.base_accuracy * difficulty_modifier * attempt_modifier, 0.95)

        # Special behavior for guesser archetype
        if self.profile.archetype == "guesser" and answer_type == "mcq" and options:
            # Just pick a random option
            return self.rng.choice(options)

        if self.rng.random() < p_correct:
            # Answer correctly
            if answer_type == "mcq" and options:
                return correct_answer
            else:
                return correct_answer
        else:
            # Answer incorrectly
            if answer_type == "mcq" and options:
                wrong_options = [o for o in options if o.lower().strip() != correct_answer.lower().strip()]
                if wrong_options:
                    return self.rng.choice(wrong_options)
                return "I don't know"
            elif answer_type == "number":
                # Wrong number — generate something in the ballpark
                try:
                    correct_num = float(correct_answer.replace(",", "").replace(" ", ""))
                    wrong_num = correct_num * self.rng.uniform(0.5, 1.5) + self.rng.uniform(-10, 10)
                    return str(round(wrong_num, 2))
                except (ValueError, AttributeError):
                    return str(self.rng.randint(1, 100))
            else:
                # Text answer — generate a partially relevant or wrong answer
                wrong_answers = [
                    "I'm not sure about this",
                    "It has something to do with the topic",
                    "Maybe it's related to what we studied before",
                    "I think it might be the opposite",
                    "Not certain, but perhaps it involves the main concept",
                ]
                return self.rng.choice(wrong_answers)

    def decide_hint_request(self, attempt_num: int) -> bool:
        """Decide whether to request a hint."""
        if attempt_num == 1:
            return self.rng.random() < self.profile.hint_probability * 0.3
        else:
            return self.rng.random() < self.profile.hint_probability

    def decide_gaming_attempt(self) -> bool:
        """Decide whether to try gaming the system (asking for direct answer)."""
        return self.rng.random() < self.profile.gaming_probability

    def decide_off_script(self) -> bool:
        """Decide whether to ask an off-script question."""
        return self.rng.random() < self.profile.off_script_probability

    def generate_off_script_question(self) -> str:
        """Generate an unrelated question to test off-script handling."""
        off_script_questions = [
            "What's the weather like?",
            "Can you tell me a joke?",
            "Who won the cricket match yesterday?",
            "What time is it?",
            "Do you like music?",
        ]
        return self.rng.choice(off_script_questions)

    def generate_gaming_attempt(self) -> str:
        """Generate a gaming attempt (asking for direct answer)."""
        gaming_phrases = [
            "just give me the answer",
            "tell me the answer directly",
            "what is the answer?",
            "skip to the answer please",
        ]
        return self.rng.choice(gaming_phrases)

    def log_interaction(self, role: str, content: str, metadata: dict | None = None):
        """Log an interaction for analysis."""
        self.interaction_log.append({
            "role": role,
            "content": content,
            "metadata": metadata or {},
        })
