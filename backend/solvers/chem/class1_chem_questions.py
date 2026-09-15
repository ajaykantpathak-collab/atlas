"""
Class 1 Chemistry Question Generator  (ICSE/ISC — Water topic)
3 nodes: c1_chem_001, c1_chem_002, c1_chem_003
Sections: FIB | Matching | True/False | MCQ | Short Answer

COMPETENCY LEVEL
  Indian context  → 50 %  (hand pumps, wells, dal, curry, India-centric examples)
  Standard        → 50 %  (universal science language, global water facts)

Usage
-----
    gen = QuestionGenerator(seed=42)
    ws  = gen.generate_all("class1")   # full worksheet + answer key
    gen.to_files(ws, "output_dir")     # writes .txt files
"""

from __future__ import annotations

import copy
import random
import re
import textwrap
from dataclasses import dataclass, field
from typing import Any

# ──────────────────────────────────────────────────────────────────────────────
# Embedded solutions YAML
# Parsed at import time by ChemistrySolver (class1_chem_solver.py)
# ──────────────────────────────────────────────────────────────────────────────

SOLUTIONS_YAML = textwrap.dedent("""\
    # ── c1_chem_001  Uses of Water ─────────────────────────────────────────────
    c1_chem_001:
      fib:
        1:  ["drinking", "to drink"]
        2:  ["cooking", "to cook", "cook food"]
        3:  ["bathing", "bath", "to bathe"]
        4:  ["washing", "to wash"]
        5:  ["cleaning", "clean"]
      matching:
        "tap (A)": "Water from the pipe at home"
        "well (B)": "Water from deep in the ground"
        "hand pump (C)": "Water pumped by hand"
        "river (D)": "Water that flows"
        "rain (E)": "Water falling from clouds"
      true_false:
        1:  True
        2:  True
        3:  True
        4:  False
        5:  True
        6:  True
      mcq:
        1:  "C"
        2:  "A"
        3:  "C"
        4:  "D"
        5:  "A"
        6:  "C"
      short_answer:
        1: "Water is precious because every plant, animal, and person needs it to live, grow, and stay healthy. Without clean water we cannot drink, cook, or stay well."
        2: "We should not let the tap run while brushing our teeth. We should use a mug instead, and close the tap tightly."

    # ── c1_chem_002  Sources of Water ──────────────────────────────────────────
    c1_chem_002:
      fib:
        1:  ["tap", "tap water", "municipal water"]
        2:  ["hand pump", "handpump"]
        3:  ["river", "rivers"]
        4:  ["rain", "rainwater"]
        5:  ["tanker", "water tanker"]
        6:  ["well", "wells"]
      matching:
        "tap (A)": "Water that comes from a pipe in the house"
        "well (B)": "Water taken from deep underground"
        "hand pump (C)": "Water we pump with our hands"
        "river (D)": "Water flowing over land"
        "rain (E)": "Water falling from clouds"
      true_false:
        1:  True
        2:  True
        3:  True
        4:  False
        5:  True
        6:  True
        7:  True
      mcq:
        1:  "D"
        2:  "B"
        3:  "C"
        4:  "A"
        5:  "A"
        6:  "C"
      short_answer:
        1: "We get tap water from the pipe that comes into our home, hand pump water by pumping with our hands, and river water from a river near our home or village."
        2: "We can save water by closing the tap tightly after use, using a mug while brushing our teeth, not leaving taps dripping, and using only the water we need."
        3: "We should teach grandparents because every person in the family can help save water. When everyone follows good habits, less water is wasted."

    # ── c1_chem_003  Need for Judicious Use of Water ───────────────────────────
    c1_chem_003:
      fib:
        1:  ["precious"]
        2:  ["judicious", "carefully", "wisely"]
        3:  ["plant", "plants"]
        4:  ["animal", "animals"]
        5:  ["drink", "drinking"]
      matching:
        "tap (A)": "We can close it tightly after use"
        "bucket (B)": "We can use it to carry water for bathing"
        "rainwater (C)": "We can collect it in drums"
        "river (D)": "We should not throw waste into it"
        "water tanker (E)": "Brings water to places with no pipe supply"
      true_false:
        1:  True
        2:  True
        3:  True
        4:  True
        5:  False
        6:  True
        7:  True
      mcq:
        1:  "A"
        2:  "C"
        3:  "B"
        4:  "A"
        5:  "B"
      short_answer:
        1: "We save water by closing taps tightly, using a mug for brushing instead of leaving the tap open, using a bucket for bathing, checking for leaking pipes, and not wasting water unnecessarily."
        2: "If all families waste water, there will not be enough clean water for everyone. Saving water ensures there is enough for drinking, cooking, cleaning, and for plants and animals too."
        3: "We should not waste water because water is precious and limited. Every living thing — people, animals, and plants — needs water to survive, and wasting it means less is available for others."
""")

# ──────────────────────────────────────────────────────────────────────────────
# Question templates
# Each entry: { id, question, choices (for MCQ), wrong_answers (for FIB distractors)
#              matching_col_a, matching_col_b, statements (for T/F), answer }
# ──────────────────────────────────────────────────────────────────────────────

Q_TEMPLATES: dict[str, dict[str, list[dict]]] = {
    # ─────────────────────────────────────────────────────────────────────────
    # c1_chem_001  — Uses of Water
    # ─────────────────────────────────────────────────────────────────────────
    "c1_chem_001": {

        # ---- Fill in the blanks ------------------------------------------------
        "fib": [
            {
                "id":        1,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "We drink water so that our body can stay ____.",
                "answer":    "healthy",
                "wrong":     ["tired", "sick", "hungry"],
            },
            {
                "id":        2,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "We use water to cook ____ like rice and dal.",
                "answer":    "food",
                "wrong":     ["clothes", "books", "toys"],
            },
            {
                "id":        3,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "We use water to wash our ____.",
                "answer":    "hands",
                "wrong":     ["shoes", "bags", "caps"],
            },
            {
                "id":        4,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "We use water to take a ____.",
                "answer":    "bath",
                "wrong":     ["nap", "walk", "trip"],
            },
            {
                "id":        5,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "We use water to ____ the floor of our house.",
                "answer":    "clean",
                "wrong":     ["paint", "break", "sweep"],
            },
            {
                "id":        6,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "We give water to ____ in our home.",
                "answer":    "plants",
                "wrong":     ["walls", "fans", "lights"],
            },
        ],

        # ---- Matching ----------------------------------------------------------
        "matching": {
            "id":        1,
            "node_id":   "c1_chem_001",
            "section":   "Uses of Water",
            "col_a":     ["Drinking", "Cooking", "Washing clothes",
                          "Bathing",   "Cleaning floor", "Watering plants"],
            "col_b":     ["Keeps the body healthy",
                          "Makes rice, dal and curry",
                          "Soap and water remove dirt",
                          "We feel fresh and clean",
                          "The floor becomes neat",
                          "Plants stay green and grow"],
            # Shuffle order is applied at generation time (seeded)
        },

        # ---- True / False ------------------------------------------------------
        "true_false": {
            "id":        1,
            "node_id":   "c1_chem_001",
            "section":   "Uses of Water",
            "statements": [
                ("Water is used for drinking.",                     True),
                ("Water is used for cooking food.",                 True),
                ("Water is used for washing hands.",                True),
                ("Folding clothes needs water.",                    False),
                ("Water is used for bathing.",                      True),
                ("We use water to clean the floor.",                True),
                ("Plants need water to stay healthy.",              True),
            ],
        },

        # ---- Multiple Choice Questions -----------------------------------------
        "mcq": [
            {
                "id":        1,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "Why do we drink water every day?",
                "choices": {
                    "correct":   "To keep our body healthy",
                    "incorrect": ["To fill the bottle",
                                  "To throw it away",
                                  "To make the floor wet"],
                },
            },
            {
                "id":        2,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "Which of these is a use of water?",
                "choices": {
                    "correct":   "Cooking food",
                    "incorrect": ["Folding clothes",
                                  "Reading a book",
                                  "Drawing a picture"],
                },
            },
            {
                "id":        3,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "We use water to wash our hands ____.",
                "choices": {
                    "correct":   "Before eating food",
                    "incorrect": ["After going to sleep",
                                  "While watching TV",
                                  "During homework"],
                },
            },
            {
                "id":        4,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "What happens if we do not bathe with water?",
                "choices": {
                    "correct":   "We may feel dirty and sick",
                    "incorrect": ["We will fly",
                                  "We will grow taller",
                                  "Nothing will happen"],
                },
            },
            {
                "id":        5,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "Which activity does NOT need water?",
                "choices": {
                    "correct":   "Folding clothes",
                    "incorrect": ["Washing hands",
                                  "Cooking rice",
                                  "Watering plants"],
                },
            },
            {
                "id":        6,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "Plants need water to ____.",
                "choices": {
                    "correct":   "Grow and stay green",
                    "incorrect": ["Grow taller than the house",
                                  "Sleep at night",
                                  "Talk to us"],
                },
            },
        ],

        # ---- Short Answer ------------------------------------------------------
        "short_answer": [
            {
                "id":        1,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "Name three ways your family uses water at home.",
                "answer":    "Drinking, cooking food, and washing hands. (Any 3 valid uses accepted.)",
                "hint":      "Think about what you do every day that needs water.",
            },
            {
                "id":        2,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "Why is it important to drink clean water?",
                "answer":    "Clean water keeps us healthy and prevents us from getting sick.",
                "hint":      "Think about what happens when we drink dirty water.",
            },
            {
                "id":        3,
                "node_id":   "c1_chem_001",
                "section":   "Uses of Water",
                "question":  "Write one thing you do every day that uses water.",
                "answer":    "Brushing teeth, bathing, drinking, washing hands, cooking, or watering plants.",
                "hint":      "Pick one activity from your daily routine.",
            },
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # c1_chem_002  — Sources of Water
    # ─────────────────────────────────────────────────────────────────────────
    "c1_chem_002": {

        "fib": [
            {
                "id":        1,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "Water that comes through a pipe in our home is called ____ water.",
                "answer":    "tap",
                "wrong":     ["river", "rain", "well"],
            },
            {
                "id":        2,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "In villages, people often take water from a ____.",
                "answer":    "well",
                "wrong":     ["river", "tank", "tap"],
            },
            {
                "id":        3,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "A ____ is a source of water that flows over land.",
                "answer":    "river",
                "wrong":     ["mountain", "road", "garden"],
            },
            {
                "id":        4,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "When water falls from clouds we call it ____.",
                "answer":    "rain",
                "wrong":     ["snow", "wind", "fog"],
            },
            {
                "id":        5,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "A ____ brings water to places that have no pipes.",
                "answer":    "tanker",
                "wrong":     ["bridge", "road", "bus"],
            },
            {
                "id":        6,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "We pump water from the ground using a ____.",
                "answer":    "hand pump",
                "wrong":     ["toy pump", "bicycle pump", "air pump"],
            },
        ],

        "matching": {
            "id":        1,
            "node_id":   "c1_chem_002",
            "section":   "Sources of Water",
            "col_a":     ["Tap water", "Well water", "Rainwater",
                          "River water", "Tanker water", "Hand pump water"],
            "col_b":     ["Comes through pipes in the home",
                          "Taken from a deep hole in the ground",
                          "Falls from clouds",
                          "Flows over land",
                          "Brought in a big vehicle",
                          "Pumped by pressing a handle"],
        },

        "true_false": {
            "id":        1,
            "node_id":   "c1_chem_002",
            "section":   "Sources of Water",
            "statements": [
                ("Tap water comes through a pipe.",                    True),
                ("A well is a source of water.",                       True),
                ("Rainwater comes from the sky.",                      True),
                ("Water in the sea is safe to drink.",                 False),
                ("A hand pump gives us water.",                        True),
                ("A river is a source of water.",                      True),
                ("A water tanker brings water in a vehicle.",          True),
            ],
        },

        "mcq": [
            {
                "id":        1,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "Which of these is NOT a source of water?",
                "choices": {
                    "correct":   "The sun",
                    "incorrect": ["A river", "A well", "Rain"],
                },
            },
            {
                "id":        2,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "Water from a deep hole in the ground comes from a ____.",
                "choices": {
                    "correct":   "Well",
                    "incorrect": ["River", "Tap", "Cloud"],
                },
            },
            {
                "id":        3,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "Which source brings water to a home through pipes?",
                "choices": {
                    "correct":   "Tap water",
                    "incorrect": ["Rainwater", "River water", "Sea water"],
                },
            },
            {
                "id":        4,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "Where does rainwater come from?",
                "choices": {
                    "correct":   "Clouds in the sky",
                    "incorrect": ["The kitchen tap",
                                  "A well",
                                  "A river"],
                },
            },
            {
                "id":        5,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "A water tanker is useful when ____.",
                "choices": {
                    "correct":   "There is no tap water available",
                    "incorrect": ["It is raining",
                                  "The river is dry",
                                  "The well is full"],
                },
            },
            {
                "id":        6,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "In a village without tap water, people may use a ____.",
                "choices": {
                    "correct":   "Hand pump",
                    "incorrect": ["Television", "Refrigerator", "Bicycle"],
                },
            },
        ],

        "short_answer": [
            {
                "id":        1,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "Name three sources of water used at home.",
                "answer":    "Tap, well, and hand pump. (Any 3 from syllabus accepted.)",
                "hint":      "Think about what brings water to your home.",
            },
            {
                "id":        2,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "How does water from a well reach the ground?",
                "answer":    "People pull it up with a rope and bucket, or pump it with a hand pump.",
                "hint":      "Think about what people in villages use.",
            },
            {
                "id":        3,
                "node_id":   "c1_chem_002",
                "section":   "Sources of Water",
                "question":  "Why should we not drink water from a river directly?",
                "answer":    "River water may have dirt, germs, or pollution that can make us sick. It must be boiled or filtered first.",
                "hint":      "Think about what might be floating in river water.",
            },
        ],
    },

    # ─────────────────────────────────────────────────────────────────────────
    # c1_chem_003  — Need for Judicious Use of Water
    # ─────────────────────────────────────────────────────────────────────────
    "c1_chem_003": {

        "fib": [
            {
                "id":        1,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Water is one of the most ____ gifts on Earth.",
                "answer":    "precious",
                "wrong":     ["cheap", "common", "small"],
            },
            {
                "id":        2,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Using water ____ means using it wisely and not wasting it.",
                "answer":    "judiciously",
                "wrong":     ["quickly", "quietly", "loudly"],
            },
            {
                "id":        3,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Every ____ needs water to live and grow.",
                "answer":    "plant",
                "wrong":     ["car", "building", "stone"],
            },
            {
                "id":        4,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Every ____ also needs water to stay alive.",
                "answer":    "animal",
                "wrong":     ["toy", "chair", "lamp"],
            },
            {
                "id":        5,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "We need water for ____, cooking, and cleaning.",
                "answer":    "drinking",
                "wrong":     ["playing", "jumping", "running"],
            },
        ],

        "matching": {
            "id":        1,
            "node_id":   "c1_chem_003",
            "section":   "Need for Judicious Use of Water",
            "col_a":     ["A dripping tap", "Using a bucket for bathing",
                          "Collecting rainwater", "Not throwing garbage in rivers",
                          "A water tanker in a village"],
            "col_b":     ["Wastes water every hour",
                          "Saves water compared to a running shower",
                          "Stores free water for later use",
                          "Keeps river water clean for everyone",
                          "Brings water to places without pipes"],
        },

        "true_false": [
            ("id", 1), ("node_id", "c1_chem_003"), ("section", "Need for Judicious Use of Water"),
        ],
        "statements": [
            ("Water is precious and should not be wasted.",            True),
            ("Only rich people need to save water.",                   False),
            ("Plants need water to grow.",                             True),
            ("Animals also need water to live.",                       True),
            ("Wasting water does not affect anyone else.",             False),
            ("Closing a tap tightly saves water.",                     True),
            ("Every living thing on Earth needs water.",               True),
        ],

        "mcq": [
            {
                "id":        1,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Why is water called precious?",
                "choices": {
                    "correct":   "Because every living thing needs it and there is limited clean water",
                    "incorrect": ["Because it costs a lot of money",
                                  "Because it is blue in colour",
                                  "Because it is found only in big cities"],
                },
            },
            {
                "id":        2,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "What does 'judicious use of water' mean?",
                "choices": {
                    "correct":   "Using water wisely and not wasting it",
                    "incorrect": ["Using water as fast as possible",
                                  "Using water only once a year",
                                  "Using water only for drinking"],
                },
            },
            {
                "id":        3,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Which action saves water while brushing teeth?",
                "choices": {
                    "correct":   "Use a mug and close the tap",
                    "incorrect": ["Leave the tap running",
                                  "Use more water",
                                  "Brush without water"],
                },
            },
            {
                "id":        4,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Who benefits when we save water?",
                "choices": {
                    "correct":   "Everyone — people, animals, and plants",
                    "incorrect": ["Only the person who saves it",
                                  "Only the teacher",
                                  "Only rich families"],
                },
            },
            {
                "id":        5,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Where should we start saving water?",
                "choices": {
                    "correct":   "At home, in school, and everywhere we use water",
                    "incorrect": ["Only at the swimming pool",
                                  "Only during summer",
                                  "Only at a water park"],
                },
            },
        ],

        "short_answer": [
            {
                "id":        1,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Write two ways to save water at home.",
                "answer":    "Close the tap tightly after use. Use a mug while brushing. Use a bucket for bathing. (Any 2 valid ways.)",
                "hint":      "Think about everyday activities where water is used.",
            },
            {
                "id":        2,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Why should we not waste water?",
                "answer":    "Water is precious and limited. Every living thing needs it. Wasting it means less water for everyone.",
                "hint":      "Think about people, animals, and plants that need water.",
            },
            {
                "id":        3,
                "node_id":   "c1_chem_003",
                "section":   "Need for Judicious Use of Water",
                "question":  "Who should we teach about saving water?",
                "answer":    "Everyone — family members, friends, grandparents, neighbours — because every person can help.",
                "hint":      "Think about all the people in your home and community.",
            },
        ],
    },
}


# ──────────────────────────────────────────────────────────────────────────────
# Seeded shuffle utilities
# ──────────────────────────────────────────────────────────────────────────────

def _shuffle(seq: list, rng: random.Random) -> list:
    """Return a new list with elements in random order (Fisher-Yates via rng)."""
    out = list(seq)
    rng.shuffle(out)
    return out


def _pick_n(seq: list, n: int, rng: random.Random) -> list:
    """Return *n* unique elements chosen without replacement."""
    return _shuffle(seq, rng)[:min(n, len(seq))]


# ──────────────────────────────────────────────────────────────────────────────
# QuestionGenerator
# ──────────────────────────────────────────────────────────────────────────────

@dataclass
class WorksheetOutput:
    """
    All printable content for a single class.

    Attributes
    ----------
    header      : banner / title text
    sections    : list of (section_title, body_text) tuples
    separator   : divider between Qs and answers
    answer_key  : list of (section_title, answer_text) tuples
    solutions   : parsed Solutions dataclass
    """
    header:      str = ""
    sections:    list[tuple[str, str]] = field(default_factory=list)
    separator:   str = ""
    answer_key:  list[tuple[str, str]] = field(default_factory=list)
    solutions:   Any = None

    def render_worksheet(self) -> str:
        """Flatten everything into one printable string (worksheet side)."""
        parts = [self.header, "\n"]
        for title, body in self.sections:
            parts.append(f"\n{'='*60}\n")
            parts.append(f"  {title}\n")
            parts.append(f"{'='*60}\n\n")
            parts.append(body)
            parts.append("\n")
        return "".join(parts)

    def render_answer_key(self) -> str:
        """Flatten everything into one printable string (answer side)."""
        parts = ["\n" + "═"*60 + "\n   ✦  ANSWER KEY  ✦\n" + "═"*60, "\n"]
        for title, body in self.answer_key:
            parts.append(f"\n{'─'*56}\n")
            parts.append(f"  {title}\n")
            parts.append(f"{'─'*56}\n\n")
            parts.append(body)
            parts.append("\n")
        return "".join(parts)


class QuestionGenerator:
    """
    Generates seeded, competency-appropriate worksheets for Class 1 Chemistry.

    Competency split
    ----------------
    50 % Indian-context  — names (dal, curry), places (village, well, hand pump)
    50 % Standard        — universal scientific language

    Parameters
    ----------
    seed : int
        Base seed for the PRNG.  Changing the seed gives a fresh worksheet.
    """

    # ── Class-level constants ──────────────────────────────────────────────────
    CLASS_ID        = "class1"
    CLASS_NAME      = "Class 1"
    SUBJECT         = "Chemistry"
    SYLLABUS_SOURCE = "ICSE / ISC"

    # Sections shown on the worksheet (display name → internal key)
    _SECTION_MAP: dict[str, str] = {
        "Fill in the blanks":    "fib",
        "Matching":              "matching",
        "True / False":          "true_false",
        "Multiple Choice (MCQ)": "mcq",
        "Short Answer":          "short_answer",
    }

    # Per-node counts per section type  (total ≈ 35–45 questions)
    _COUNTS: dict[str, dict[str, int]] = {
        "c1_chem_001": {"fib": 5, "matching": 1, "true_false": 5, "mcq": 5, "short_answer": 2},
        "c1_chem_002": {"fib": 5, "matching": 1, "true_false": 6, "mcq": 5, "short_answer": 2},
        "c1_chem_003": {"fib": 4, "matching": 1, "true_false": 6, "mcq": 4, "short_answer": 2},
    }

    # ──────────────────────────────────────────────────────────────────────────

    def __init__(self, seed: int) -> None:
        self.seed   = seed
        self._rng   = random.Random(seed)
        self._nodes = ["c1_chem_001", "c1_chem_002", "c1_chem_003"]

    # ──────────────────────────────────────────────────────────────────────────
    # Public API
    # ──────────────────────────────────────────────────────────────────────────

    def generate_all(self, class_id: str = "class1") -> WorksheetOutput:
        """
        Generate a complete worksheet + answer key for all three nodes.

        Returns
        -------
        WorksheetOutput  — call  .render_worksheet()  and  .render_answer_key()
        """
        ws_sections: list[tuple[str, str]] = []
        ak_sections: list[tuple[str, str]] = []

        for node_id in self._nodes:
            tpls = Q_TEMPLATES.get(node_id, {})

            # ── FIB ────────────────────────────────────────────────────────────
            fib_body, fib_key = self._gen_fib(tpls.get("fib", []))
            ws_sections.append(("Fill in the blanks", fib_body))
            ak_sections.append(("Fill in the blanks — Answers", fib_key))

            # ── Matching ───────────────────────────────────────────────────────
            m_body, m_key = self._gen_matching(tpls.get("matching", {}))
            ws_sections.append(("Matching — Match the columns", m_body))
            ak_sections.append(("Matching — Answers", m_key))

            # ── True