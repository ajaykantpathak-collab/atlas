"""
Solver for Class 2 Geography (4 nodes).
NODES: c2_geo_001, c2_geo_002, c2_geo_003, c2_geo_004
"""
import random, math
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Tuple
from enum import Enum

class NodeID(Enum):
    c2_geo_001 = "c2_geo_001"
    c2_geo_002 = "c2_geo_002"
    c2_geo_003 = "c2_geo_003"
    c2_geo_004 = "c2_geo_004"

@dataclass
class Question:
    node_id: str
    qtype: str          # vocab | mcq_single | mcq_multi | fillblank | match | sequence | truefalse | image
    prompt: str
    options: List[str] = field(default_factory=list)
    correct: str = ""   # single answer key
    correct_idx: int = -1
    answer_text: str = ""
    explanation: str = ""
    difficulty: str = "Easy"
    seed: int = 0

@dataclass
class CheckResult:
    correct: bool
    user_answer: str
    correct_answer: str
    explanation: str
    step_by_step: List[str] = field(default_factory=list)

# ──────────────────────────────────────────────
#  KNOWLEDGE BASES  (deterministic, no randomness)
# ──────────────────────────────────────────────

KB = {
    NodeID.c2_geo_001: {
        "vocab": {
            "earth": "Our home planet — round like a ball",
            "land": "The solid ground part of Earth (mountains, plains)",
            "water": "Rivers, lakes, oceans on Earth",
            "mountain": "A very high, raised part of land",
            "plain": "A wide, flat area of land",
            "river": "A long stream of water flowing on land",
            "ocean": "A very large body of salt water",
            "sphere": "A round 3-D shape like a ball",
            "planet": "A large round object that moves in the sky around the sun",
            "sky": "The blue space above us",
            "day sky": "The sky during daytime which looks blue",
            "night sky": "The sky at night with stars and moon",
            "star": "A tiny bright light in the night sky",
            "moon": "The bright round object we see in the night sky",
        },
        "facts": [
            ("Earth is our home.", True),
            ("Earth is flat like a sheet of paper.", False),
            ("Earth has land and water.", True),
            ("Earth is round like a ball (a sphere).", True),
            ("The day sky is blue.", True),
            ("At night we can see stars and the moon.", True),
            ("The sun and moon are both seen in the night sky.", False),
        ],
        "identify": [
            ("What is round like a ball?", "Earth", ["Earth", "Mountain", "River"]),
            ("What do we see in the day sky?", "Sun", ["Sun", "Moon", "Stars"]),
            ("What do we see in the night sky?", "Stars and Moon", ["Sun", "Stars and Moon", "Rainbow"]),
            ("Which is a large body of salt water?", "Ocean", ["River", "Ocean", "Mountain"]),
            ("Which is a very high part of land?", "Mountain", ["Plain", "River", "Mountain"]),
        ],
        "mcq": [
            ("Earth is ____ like a ball.", "round", ["flat", "round", "square"]),
            ("The day sky is ____.", "blue", ["red", "blue", "green"]),
            ("Earth has both land and ____.", "water", ["sky", "water", "clouds"]),
            ("A mountain is a ____ part of land.", "high", ["flat", "high", "short"]),
        ],
    },
    NodeID.c2_geo_002: {
        "vocab": {
            "sun": "The big bright star that gives us light and heat during the day",
            "light": "What lets us see things",
            "heat": "Warmth from the sun",
            "shadow": "A dark shape made when something blocks the sun's light",
            "object": "Anything you can touch or see",
            "block": "To stop or hide something",
            "direction": "The way something points (east, west, north, south)",
            "morning": "The early part of the day after sunrise",
            "noon": "The middle of the day, around 12 o'clock",
            "evening": "The later part of the day before night",
            "long": "Extended in length",
            "short": "Not extended in length",
            "sundial": "A simple device that uses a shadow to tell time",
            "torch": "A small light you can hold in your hand",
        },
        "facts": [
            ("The sun is the main source of light and heat.", True),
            ("A shadow is formed when the sun's light is blocked by an object.", True),
            ("Shadows are shortest at noon.", True),
            ("Shadows are longest in the morning and evening.", True),
            ("A shadow always points away from the sun.", True),
            ("A shadow can form without any light.", False),
            ("A shadow is longer at noon than in the morning.", False),
            ("A sundial uses a shadow to tell time.", True),
        ],
        "identify": [
            ("Who gives us light and heat during the day?", "Sun", ["Moon", "Sun", "Star"]),
            ("What is formed when an object blocks sunlight?", "Shadow", ["Shadow", "Reflection", "Rainbow"]),
            ("When is a shadow the shortest?", "Noon", ["Morning", "Noon", "Evening"]),
            ("When are shadows longest?", "Morning and Evening", ["Noon", "Morning and Evening", "Afternoon"]),
            ("What simple device uses a shadow to tell time?", "Sundial", ["Sundial", "Clock", "Compass"]),
        ],
        "mcq": [
            ("The main source of light and heat is the ____.", "sun", ["moon", "sun", "star"]),
            ("A shadow forms when something ____ the sunlight.", "blocks", ["catches", "blocks", "reflects"]),
            ("Shadows are ____ at noon.", "short", ["long", "short", "wide"]),
            ("Shadows are ____ in the morning.", "long", ["long", "short", "thin"]),
        ],
    },
    NodeID.c2_geo_003: {
        "vocab": {
            "day": "The time when the sun is in the sky",
            "night": "The time when the sun has set and it is dark",
            "sunrise": "When the sun comes up in the east in the morning",
            "sunset": "When the sun goes down in the west in the evening",
            "east": "The direction where the sun rises",
            "west": "The direction where the sun sets",
            "morning": "Early part of the day — time for school",
            "noon": "Middle of the day — lunch time",
            "afternoon": "Time after noon before evening",
            "evening": "Time before night — after playing",
            "sleep": "What we do at night",
            "rest": "What animals and plants do at night",
            "birds": "Animals that chirp in the morning and sleep at night",
            "flowers": "Plants that open in the day and close at night",
        },
        "facts": [
            ("The sun rises in the east.", True),
            ("The sun sets in the west.", True),
            ("Day comes when the sun is in the sky.", True),
            ("Night comes when the sun has gone down.", True),
            ("We go to school during the day.", True),
            ("We sleep at night.", True),
            ("Birds chirp more at night than in the morning.", False),
            ("Lotus flowers open during the day.", True),
            ("The moon rises in the east at night.", True),
        ],
        "identify": [
            ("In which direction does the sun rise?", "East", ["West", "East", "North"]),
            ("In which direction does the sun set?", "West", ["East", "South", "West"]),
            ("What do we do at night?", "Sleep", ["Play", "Sleep", "Study"]),
            ("Which flower opens in the day and closes at night?", "Lotus", ["Rose", "Lotus", "Mari"]),
            ("What do birds do in the morning?", "Chirp", ["Sleep", "Chirp", "Hide"]),
        ],
        "sequence_times": ["morning", "noon", "afternoon", "evening", "night"],
        "mcq": [
            ("The sun rises in the ____.", "east", ["west", "east", "north"]),
            ("The sun sets in the ____.", "west", ["east", "south", "west"]),
            ("We ____ at night.", "sleep", ["play", "sleep", "eat"]),
            ("Birds ____ in the morning.", "chirp", ["chirp", "sleep", "fly south"]),
            ("The first part of the day is called ____.", "morning", ["evening", "noon", "morning"]),
        ],
    },
    NodeID.c2_geo_004: {
        "vocab": {
            "sunny": "Bright with the sun shining",
            "cloudy": "Full of clouds, not much sun",
            "rainy": "Raining — water drops fall from clouds",
            "windy": "Lots of moving air",
            "foggy": "A thick mist that makes things hard to see",
            "hot": "Very warm weather",
            "warm": "Pleasantly warm",
            "cool": "Slightly cold but comfortable",
            "cold": "Very low temperature",
            "weather diary": "A notebook where you write the weather each day",
            "weather chart": "A table with symbols showing daily weather",
            "dark clouds": "Grey/black clouds that mean rain is likely",
            "umbrella": "Used during rainy weather",
            "raincoat": "Worn during rainy weather",
        },
        "weather_symbols": {
            "sunny": "☀️",
            "cloudy": "☁️",
            "rainy": "🌧️",
            "windy": "💨",
            "foggy": "🌫️",
        },
        "facts": [
            ("Sunny weather means the sun is shining.", True),
            ("Rainy weather means water is falling from clouds.", True),
            ("Windy weather means there is a lot of moving air.", True),
            ("Dark clouds mean rain is likely.", True),
            ("We wear warm clothes in cold weather.", True),
            ("We wear raincoat in rainy weather.", True),
            ("Hot weather is cooler than cold weather.", False),
            ("Foggy weather makes it easy to see far away.", False),
            ("A weather diary helps us track weather over time.", True),
        ],
        "clothes_weather": [
            ("umbrella", "rainy"),
            ("raincoat", "rainy"),
            ("sunglasses", "sunny"),
            ("warm sweater", "cold"),
            ("cotton clothes", "hot"),
            ("coat", "cold"),
            ("cap", "sunny"),
        ],
        "identify": [
            ("Which weather has water falling from the sky?", "Rainy", ["Sunny", "Rainy", "Windy"]),
            ("Which symbol stands for sunny weather?", "☀️", ["☁️", "☀️", "🌧️"]),
            ("What do we wear when it rains?", "Raincoat / Umbrella", ["Sunglasses", "Raincoat / Umbrella", "Cap"]),
            ("Dark clouds mean ____ is likely.", "Rain", ["Sun", "Rain", "Snow"]),
            ("What is slightly cold but comfortable called?", "Cool", ["Hot", "Cold", "Cool"]),
        ],
        "mcq": [
            ("The symbol for rainy weather is ____.", "🌧️", ["☀️", "🌧️", "☁️"]),
            ("We wear a ____ when it rains.", "raincoat", ["raincoat", "cap", "sunglasses"]),
            ("____ means very warm weather.", "Hot", ["Cool", "Hot", "Cold"]),
            ("____ weather has lots of moving air.", "Windy", ["Foggy", "Windy", "Sunny"]),
            ("What type of weather has dark clouds?", "Rainy", ["Sunny", "Rainy", "Windy"]),
        ],
    },
}

# ──────────────────────────────────────────────
#  SOLVER CLASS
# ──────────────────────────────────────────────

class C2GeoSolver:
    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)

    # ── True / False ──
    def check_truefalse(self, node: NodeID, statement: str, user_answer: str) -> CheckResult:
        kb = KB[node]
        for fact, ans in kb["facts"]:
            if fact.lower() == statement.lower():
                correct_str = "True" if ans else "False"
                steps = [
                    f"Step 1: Read the statement: '{statement}'",
                    f"Step 2: Recall what you learned about {node.value}.",
                    f"Step 3: The correct answer is {correct_str}.",
                ]
                is_correct = user_answer.strip().lower() == correct_str.lower()
                return CheckResult(
                    correct=is_correct,
                    user_answer=user_answer,
                    correct_answer=correct_str,
                    explanation=f"The statement is {correct_str.lower()}.",
                    step_by_step=steps,
                )
        return CheckResult(
            correct=False,
            user_answer=user_answer,
            correct_answer="Unknown",
            explanation="Statement not found in knowledge base.",
            step_by_step=["No matching statement found."],
        )

    # ── Multiple Choice (single correct) ──
    def check_mcq(self, node: NodeID, question_text: str, user_choice: str) -> CheckResult:
        kb = KB[node]
        for q_text, ans, opts in kb["mcq"]:
            if q_text.lower() == question_text.lower():
                steps = [
                    f"Step 1: Read the question: '{q_text}'",
                    f"Step 2: Think about what you learned about {node.value}.",
                    f"Step 3: The correct option is '{ans}'.",
                ]
                is_correct = user_choice.strip().lower() == ans.lower()
                return CheckResult(
                    correct=is_correct,
                    user_answer=user_choice,
                    correct_answer=ans,
                    explanation=f"The correct answer is '{ans}'.",
                    step_by_step=steps,
                )
        return CheckResult(
            correct=False, user_answer=user_choice,
            correct_answer="?", explanation="Question not found in knowledge base.",
        )

    # ── Identify (fill answer) ──
    def check_identify(self, node: NodeID, question_text: str, user_answer: str) -> CheckResult:
        kb = KB[node]
        for q_text, ans, opts in kb["identify"]:
            if q_text.lower() == question_text.lower():
                is_correct = user_answer.strip().lower() == ans.lower()
                steps = [
                    f"Step 1: Read the question: '{q_text}'",
                    f"Step 2: Recall facts about {node.value}.",
                    f"Step 3: The answer is '{ans}'.",
                ]
                return CheckResult(
                    correct=is_correct,
                    user_answer=user_answer,
                    correct_answer=ans,
                    explanation=f"The correct answer is '{ans}'.",
                    step_by_step=steps,
                )
        return CheckResult(
            correct=False, user_answer=user_answer,
            correct_answer="?", explanation="Question not found in knowledge base.",
        )

    # ── Vocab match ──
    def check_vocab(self, node: NodeID, word: str, user_definition: str) -> CheckResult:
        kb = KB[node]
        correct_def = kb["vocab"].get(word.lower(), "")
        is_correct = user_answer.strip().lower() == correct_def.lower()
        steps = [
            f"Step 1: The word is '{word}'.",
            f"Step 2: Recall the meaning of '{word}'.",
            f"Step 3: Correct meaning: '{correct_def}'.",
        ]
        return CheckResult(
            correct=is_correct,
            user_answer=user_answer,
            correct_answer=correct_def,
            explanation=f"The meaning of '{word}' is: {correct_def}",
            step_by_step=steps,
        )

    # ── Sequence (day order) ──
    def check_sequence(self, node: NodeID, user_list: List[str]) -> CheckResult:
        correct_order = KB[node].get("sequence_times", [])
        is_correct = [s.strip().lower() for s in user_list] == correct_order
        steps = [
            "Step 1: Recall the order of the day from morning to night.",
            f"Step 2: Correct order: {' → '.join(correct_order)}",
        ]
        return CheckResult(
            correct=is_correct,
            user_answer=" → ".join(user_list),
            correct_answer=" → ".join(correct_order),
            explanation=f"Correct order: {' → '.join(correct_order)}",
            step_by_step=steps,
        )

    # ── Weather symbol match ──
    def check_weather_symbol(self, weather_type: str, user_symbol: str) -> CheckResult:
        correct_sym = KB[NodeID.c2_geo_004]["weather_symbols"].get(weather_type.lower(), "?")
        is_correct = user_symbol.strip() == correct_sym
        steps = [
            f"Step 1: The weather type is '{weather_type}'.",
            f"Step 2: Recall the weather chart symbols.",
            f"Step 3: The symbol for {weather_type} is {correct_sym}.",
        ]
        return CheckResult(
            correct=is_correct,
            user_answer=user_symbol,
            correct_answer=correct_sym,
            explanation=f"The symbol for '{weather_type}' is {correct_sym}.",
            step_by_step=steps,
        )

    # ── Clothes & weather ──
    def check_clothes_weather(self, item: str, user_weather: str) -> CheckResult:
        mapping = {item_: weather for item_, weather in KB[NodeID.c2_geo_004]["clothes_weather"]}
        correct_weather = mapping.get(item.lower(), "?")
        is_correct = user_weather.strip().lower() == correct_weather.lower()
        steps = [
            f"Step 1: The item is '{item}'.",
            f"Step 2: Think about when we use this item.",
            f"Step 3: '{item}' is used in {correct_weather} weather.",
        ]
        return CheckResult(
            correct=is_correct,
            user_answer=user_weather,
            correct_answer=correct_weather,
            explanation=f"'{item}' is used in {correct_weather} weather.",
            step_by_step=steps,
        )

    # ── Generic MCQ with given options ──
    def check_generic_mcq(self, question_text: str, correct_answer: str,
                          user_answer: str, options: List[str]) -> CheckResult:
        is_correct = user_answer.strip().lower() == correct_answer.lower()
        steps = [
            f"Question: {question_text}",
            f"Options: {', '.join(options)}",
            f"Correct answer: {correct_answer}",
        ]
        return CheckResult(
            correct=is_correct,
            user_answer=user_answer,
            correct_answer=correct_answer,
            explanation=f"The correct answer is '{correct_answer}'.",
            step_by_step=steps,
        )

# ── Module-level convenience ──
_solver = None

def get_solver(seed: int = 42) -> C2GeoSolver:
    global _solver
    if _solver is None:
        _solver = C2GeoSolver(seed=seed)
    return _solver