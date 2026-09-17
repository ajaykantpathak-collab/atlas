"""
Junior Learning Service
Voice-first, game-based learning for Class 1-5 students (ages 6-10).
Handles lesson orchestration, voice answer processing, story-based problems,
and progress tracking with stars, badges & reward celebrations.
"""

from __future__ import annotations

import asyncio
import random
import time
import uuid
import logging
from datetime import date, datetime, timedelta
from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, Field, ConfigDict, field_validator

from services.llm_client import LLMClient
from services.mastery_sync import BKTModel as MasterySync
from services.practice_service import PracticeService
from database import async_session_maker, get_db

logger = logging.getLogger("junior_service")

# ──────────────────────────────────────────────
#  Enums
# ──────────────────────────────────────────────

class Subject(str, Enum):
    MATHEMATICS   = "mathematics"
    HINDI         = "hindi"
    ENGLISH       = "english"
    SCIENCE       = "science"
    GK            = "gk"
    STORY_MATH    = "story_math"


class Difficulty(str, Enum):
    EASY   = "easy"     # Class 1-2
    MEDIUM = "medium"   # Class 3-4
    HARD   = "hard"     # Class 5


class ActivityType(str, Enum):
    STORY_PROBLEM  = "story_problem"
    FLASH_CARD     = "flash_card"
    FILL_IN_BLANK  = "fill_in_blank"
    LISTEN_REPEAT  = "listen_repeat"
    SPELLING       = "spelling"
    COUNTING       = "counting"
    TRIVIA         = "trivia"


class AnswerResult(str, Enum):
    CORRECT          = "correct"
    PARTIAL          = "partial"
    INCORRECT        = "incorrect"
    NEEDS_HINT       = "needs_hint"
    NEEDS_REPEAT     = "needs_repeat"


class LessonStatus(str, Enum):
    ACTIVE    = "active"
    COMPLETED = "completed"
    ABANDONED = "abandoned"


# ──────────────────────────────────────────────
#  Pydantic v2 Models
# ──────────────────────────────────────────────

class VoiceResponse(BaseModel):
    """TTS-ready response with optional audio hint for the frontend."""
    model_config = ConfigDict(from_attributes=True)

    text_hindi: str
    text_english: Optional[str] = None
    speak_text: str              # preferred language for TTS
    celebration: Optional[str] = None  # confetti | stars | clapping | null
    animation: Optional[str] = None    # bounce | glow | wiggle | null


class ActivityOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    activity_id: str
    type: ActivityType
    prompt_hi: str
    prompt_en: Optional[str] = None
    visual_hint: Optional[str] = None    # emoji / colour / asset ref
    expected_answer: Optional[str] = None
    hint_hi: Optional[str] = None
    difficulty: Difficulty
    points: int
    order: int


class LessonOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: str
    student_id: str
    subject: Subject
    topic: str
    difficulty: Difficulty
    character_name: str
    greeting_hi: str
    greeting_en: str
    speak_greeting: str
    activities: list[ActivityOut]
    current_index: int
    status: LessonStatus
    total_activities: int


class VoiceAnswerOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: str
    result: AnswerResult
    voice_response: VoiceResponse
    next_activity: Optional[ActivityOut] = None
    stars_earned: int
    new_badges: list[str]
    mastery_delta: dict[str, float]  # skill -> mastery change
    is_lesson_complete: bool


class BadgeInfo(BaseModel):
    id: str
    name_hi: str
    name_en: str
    icon: str
    description_hi: str
    description_en: str
    earned_at: Optional[str] = None
    progress: float = 0.0   # 0.0 – 1.0 toward next level


class JuniorProgressOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    student_id: str
    total_stars: int
    total_points: int
    level: int
    current_streak: int
    badges: list[BadgeInfo]
    subject_progress: dict[str, float]   # subject -> mastery %
    recent_activities: list[dict[str, Any]]
    weekly_stars: list[int]              # last 7 days
    recommended_next: str                # topic suggestion in Hinglish


# ──────────────────────────────────────────────
#  Content Generators
# ──────────────────────────────────────────────

class _ContentBank:
    """In-memory, curriculum-aligned content for Class 1-5 (CISCE/ICSE aligned)."""

    # --- Character roster ---
    CHARACTERS = [
        {"name": "Champak", "emoji": "🐘", "personality": "wise_elephant"},
        {"name": "Moti",    "emoji": "🐼", "personality": "friendly_panda"},
        {"name": "Tingu",   "emoji": "🐒", "personality": "playful_monkey"},
        {"name": "Golu",    "emoji": "🐻", "personality": "curious_bear"},
        {"name": "Kitty",   "emoji": "🐱", "personality": "clever_cat"},
        {"name": "Bunty",   "emoji": "🐰", "personality": "bouncy_rabbit"},
    ]

    # --- Arithmetic story templates ---
    STORY_TEMPLATES = [
        {
            "template": "{animal} ke paas {n1} {fruit} hain. Agar unko {n2} friends milte hain aur har ek ko {n1} {fruit} dena hai toh total kitne {fruit} chahiye?",
            "hint_template": "Matra: {n1} × {n2} = ?",
        },
        {
            "template": "Ek garden mein {n1} ped hain. Har ped ke paas {n2} {flower} khil rahe hain. Total kitni {flower} hain?",
            "hint_template": "Matra: {n1} × {n2} = ?",
        },
        {
            "template": "Ek school mein {n1} classes hain. Har class mein {n2} students baithe hain. Total kitne students hain?",
            "hint_template": "Matra: {n1} × {n2} = ?",
        },
        {
            "template": "Ek cartoon mein {n1} episodes hain. Har episode mein {n2} jokes hain. Total kitne jokes hain pure cartoon mein?",
            "hint_template": "Matra: {n1} × {n2} = ?",
        },
    ]

    ANIMALS   = ["bandar", "hathi", "sher", "chuhiya", "koyal", "maina", "totey", "kite"]
    FRUITS    = ["seb", "tarbooj", "aam", "kela", "angoor", "santra", "papita"]
    FLOWERS   = ["gulab", "sunflower", "lotus", "marigold", "jasmine", "hibiscus"]
    OBJECTS   = ["pencil", "eraser", "notebook", "ball", "bat", "car", "doll", "book"]

    SPELLING_WORDS = {
        Difficulty.EASY:   ["seb", "kela", "pani", "ghar", "kitaab", "pankha", "dost", "gol"],
        Difficulty.MEDIUM: ["tareekh", "phool", "school", "pencil", "mausam", "raasta", "kabutar", "sooniya"],
        Difficulty.HARD:   ["sanskriti", "azadi", "samaj", "vigyan", "itihaas", "bharat", "samanvay"],
    }

    GK_QUESTIONS = [
        {"q": "Desh ka rashtriya pakshi kaun sa hai?", "a": "mor",       "opt": ["mor", "koyal", "kite", "hans"]},
        {"q": "Desh ka rashtriya phool kaun sa hai?",  "a": "lotus",     "opt": ["gulab", "lotus", "sunflower", "rose"]},
        {"q": "Desh ka rashtriya geet kaun sa hai?",   "a": "vande mataram", "opt": ["jana gana mana", "vande mataram", "sare jahan", "jana gana"]},
        {"q": "Gol matra ke kitne kone hote hain?",    "a": "zero",     "opt": ["ek", "do", "teen", "shunya"]},
        {"q": "Suraj ki roshni se humein kya milta hai?", "a": "roshani", "opt": ["paani", "roshani", "hawai", "ped"]},
        {"q": "Himmat kaise aati hai? 🦁",             "a": "practice se", "opt": ["chori se", "practice se", "kisi se", "dhup mein"]},
        {"q": "Kitne mahine hain ek saal mein?",       "a": "12",       "opt": ["10", "11", "12", "13"]},
        {"q": "Bachpan ka dost hamesha kya rakhta hai?", "a": "imaandari", "opt": ["paisa", "imaandari", "toys", "chocolate"]},
    ]

    SCIENCE_QUESTIONS = [
        {"q": "Ped se hamen kya milta hai?",          "a": "oxyzen",   "opt": ["paani", "oxyzen", "hawai", "khoon"]},
        {"q": "Suraj kin direction se udta hai?",      "a": "poorv",    "opt": ["poorv", "pashchim", "dakshin", "uttar"]},
        {"q": "Isko kya kehte hain — hilo mat!",      "a": "vatan",    "opt": ["vatan", "pradesh", "gaon", "shahar"]},
        {"q": "Chhote bachon ko pet mein rakhne wali machine ka naam?", "a": "incubator", "opt": ["incubator", "ventilator", "refrigerator", "mixer"]},
        {"q": "Kite se kya banate hain?",             "a": "paper",    "opt": ["paper", "plastic", "cloth", "metal"]},
        {"q": "Kauwa kaun sa rang pasand karta hai?",  "a": "kala",     "opt": ["lal", "pila", "nila", "kala"]},
    ]


# ──────────────────────────────────────────────
#  Math Generator (SymPy-backed accuracy)
# ──────────────────────────────────────────────

class MathGenerator:
    """Generates verified arithmetic problems using SymPy."""

    @staticmethod
    def _verify(a: int, b: int, op: str, expected: int) -> bool:
        try:
            import sympy as sp
            ops = {"+": sp.Add, "-": lambda x, y: x - y, "×": sp.Mul, "x": sp.Mul}
            result = ops[op](sp.Integer(a), sp.Integer(b))
            return int(result) == expected
        except Exception:
            return a * b == expected if op in ("×", "x") else a + b == expected

    @staticmethod
    def generate_multiplication(difficulty: Difficulty, count: int = 1) -> list[dict[str, Any]]:
        problems = []
        ranges = {
            Difficulty.EASY:   (1, 5),
            Difficulty.MEDIUM: (2, 10),
            Difficulty.HARD:   (5, 12),
        }
        lo, hi = ranges[difficulty]
        while len(problems) < count:
            a, b = random.randint(lo, hi), random.randint(lo, hi)
            answer = a * b
            if MathGenerator._verify(a, b, "×", answer):
                problems.append({"n1": a, "n2": b, "answer": answer, "op": "×"})
        return problems

    @staticmethod
    def generate_addition(difficulty: Difficulty, count: int = 1) -> list[dict[str, Any]]:
        problems = []
        ranges = {
            Difficulty.EASY:   (1, 10),
            Difficulty.MEDIUM: (10, 50),
            Difficulty.HARD:   (50, 200),
        }
        lo, hi = ranges[difficulty]
        while len(problems) < count:
            a, b = random.randint(lo, hi), random.randint(lo, hi)
            answer = a + b
            problems.append({"n1": a, "n2": b, "answer": answer, "op": "+"})
        return problems


# ──────────────────────────────────────────────
#  Hint Engine
# ──────────────────────────────────────────────

class HintEngine:
    """Progressive hint system: visual → verbal → worked example."""

    HINT_LEVELS = 3

    @staticmethod
    def get_hints(activity_type: ActivityType, answer: int, difficulty: Difficulty) -> list[str]:
        hints: list[str] = []

        if activity_type == ActivityType.STORY_PROBLEM:
            hints = [
                f"Ye ek multiplication problem hai. Pehle number se doosre number ko gunte hue jodo.",
                f"Chhote number ko zyada bade number se gunte hue jodo.",
                f"Jaise agar 3 × 4 hai toh 3 + 3 + 3 + 3 = 12. Ab aap try karo!",
            ]
        elif activity_type == ActivityType.FLASH_CARD:
            hints = [
                "Soch-soch kar answer do, time lena bilkul theek hai!",
                "Bade number ko chhote number se count karo.",
                "Hint: pehle aank mein answer aane wali numbers socho.",
            ]
        elif activity_type == ActivityType.SPELLING:
            hints = [
                "Pehla akshar yaad rakh.",
                "Poora shabd dhyaan se suno aur phir kaho.",
                "Matra ke hisab se shabd likho — jyaada mat bhulo!",
            ]
        else:
            hints = [
                "Soch-soch kar jawab do.",
                "Apne dost ke sath count karo.",
                "Hint: pehle chhote hisab karo.",
            ]

        return hints[:HintEngine.HINT_LEVELS]


# ──────────────────────────────────────────────
#  Reward System
# ──────────────────────────────────────────────

class RewardSystem:

    BADGE_DEFS: dict[str, BadgeInfo] = {
        "first_star":       BadgeInfo(id="first_star",       name_hi="पहला सितारा", name_en="First Star",      icon="⭐",  description_hi="पहला सितारा जीतो!", description_en="Win your first star!"),
        "streak_3":         BadgeInfo(id="streak_3",         name_hi="लगातार तीन",  name_en="Three in a Row",  icon="🔥",  description_hi="लगातार तीन सही जवाब!", description_en="Three correct answers in a row!"),
        "streak_5":         BadgeInfo(id="streak_5",         name_hi="पांच का झटका", name_en="Five on Fire",     icon="💥",  description_hi="लगातार पाँच सही!", description_en="Five streak!"),
        "multiplication_5": BadgeInfo(id="multiplication_5", name_hi="गुणा मास्टर",  name_en="Multiply Master",  icon="✖️", description_hi="5 गुणा सही!", description_en="5 multiplication correct!"),
        "story_hero":       BadgeInfo(id="story_hero",       name_hi="कहानी सुपरहीरो", name_en="Story Hero",    icon="🦸", description_hi="कहानी समझकर हल की!", description_en="Solved a story problem!"),
        "spelling_champ":   BadgeInfo(id="spelling_champ",   name_hi="वर्तनी चैम्पियन", name_en="Spelling Champ", icon="📝", description_hi="शब्द सही लिखो!", description_en="Correct spelling!"),
        "curious_mind":     BadgeInfo(id="curious_mind",     name_hi="जिज्ञासु दिमाग", name_en="Curious Mind",  icon="🧠", description_hi="विज्ञान सीखो!", description_en="Learned science!"),
        "gk_champ":         BadgeInfo(id="gk_champ",         name_hi="जीके चैम्पियन",  name_en="GK Champion",   icon="🌍", description_hi="सामान्य ज्ञान बढ़िया!", description_en="General Knowledge champ!"),
    }

    @staticmethod
    def check_badges(student_id: str, session: Any, answer_result: AnswerResult,
                     activity_type: ActivityType, consecutive_correct: int) -> list[str]:
        newly_earned: list[str] = []

        # Persisted badge tracking would use the student_progress table.
        # Here we check thresholds and return new badge IDs.
        if consecutive_correct == 1 and answer_result == AnswerResult.CORRECT:
            newly_earned.append("first_star")

        if consecutive_correct == 3:
            newly_earned.append("streak_3")
        if consecutive_correct == 5:
            newly_earned.append("streak_5")

        if activity_type == ActivityType.STORY_PROBLEM and answer_result == AnswerResult.CORRECT:
            newly_earned.append("story_hero")

        if activity_type == ActivityType.SPELLING and answer_result == AnswerResult.CORRECT:
            newly_earned.append("spelling_champ")

        if activity_type == ActivityType.TRIVIA and answer_result == AnswerResult.CORRECT:
            newly_earned.append("gk_champ")

        if session and session.get("subject") == Subject.SCIENCE and answer_result == AnswerResult.CORRECT:
            newly_earned.append("curious_mind")

        return newly_earned

    @staticmethod
    def celebration_for(result: AnswerResult, points: int) -> Optional[str]:
        if result == AnswerResult.CORRECT:
            if points >= 20:
                return "🎊💫🌟 SUPER CELEBRATION!"
            return "🎉👏 wah!"
        if result == AnswerResult.PARTIAL:
            return "💪 Almost!"
        return None  # gentle retry, no big celebration


# ──────────────────────────────────────────────
#  Activity Builder
# ──────────────────────────────────────────────

class ActivityBuilder:

    @staticmethod
    def build_story_problem(topic: str, difficulty: Difficulty,
                            order: int, sub_topic: str = "multiplication") -> ActivityOut:
        bank = _ContentBank()
        tpl  = random.choice(bank.STORY_TEMPLATES)
        math_problems = MathGenerator.generate_multiplication(difficulty, 1)
        mp = math_problems[0]

        animals = bank.ANIMALS
        fruits  = bank.FRUITS

        animal = random.choice(animals)
        fruit  = random.choice(fruits)

        prompt_hi = tpl["template"].format(
            animal=animal,
            fruit=fruit,
            flower=random.choice(bank.FLOWERS),
            n1=mp["n1"],
            n2=mp["n2"],
        )

        emojis = {"easy": "🟢", "medium": "🟡", "hard": "🔴"}
        return ActivityOut(
            activity_id=str(uuid.uuid4()),
            type=ActivityType.STORY_PROBLEM,
            prompt_hi=prompt_hi,
            visual_hint=f"{emojis[difficulty.value]} 📖",
            expected_answer=str(mp["answer"]),
            hint_hi=tpl["hint_template"].format(n1=mp["n1"], n2=mp["n2"]),
            difficulty=difficulty,
            points=10 if difficulty == Difficulty.EASY else 15 if difficulty == Difficulty.MEDIUM else 20,
            order=order,
        )

    @staticmethod
    def build_flash_card(difficulty: Difficulty, order: int,
                         subject: Subject = Subject.MATHEMATICS) -> ActivityOut:
        bank = _ContentBank()

        if subject == Subject.MATHEMATICS:
            ops = {"easy": (1, 10, "+"), "medium": (10, 50, "+"), "hard": (10, 20, "×")}
            lo, hi, op = ops[difficulty.value]
            a, b = random.randint(lo, hi), random.randint(lo, hi)
            answer = a + b if op == "+" else a * b
            prompt_hi = f"{a} {op} {b} = ?"
            expected  = str(answer)
        else:
            prompt_hi = random.choice(["5 + 3 = ?", "8 − 2 = ?", "4 × 2 = ?"])
            expected = str(eval(prompt_hi.replace("=", "").replace("×", "*").replace("−", "-")))

        emojis = {"easy": "🟢", "medium": "🟡", "hard": "🔴"}
        return ActivityOut(
            activity_id=str(uuid.uuid4()),
            type=ActivityType.FLASH_CARD,
            prompt_hi=prompt_hi,
            visual_hint=f"{emojis[difficulty.value]} ➕" if "+" in prompt_hi else f"{emojis[difficulty.value]} ➖",
            expected_answer=expected,
            hint_hi="Chhote numbers ko count karo apne haath se!",
            difficulty=difficulty,
            points=5,
            order=order,
        )

    @staticmethod
    def build_spelling(difficulty: Difficulty, order: int) -> ActivityOut:
        bank  = _ContentBank()
        words = bank.SPELLING_WORDS[difficulty]
        word  = random.choice(words)
        return ActivityOut(
            activity_id=str(uuid.uuid4()),
            type=ActivityType.SPELLING,
            prompt_hi=f"Ye shabd suno aur phir kaho: 「{word}」",
            prompt_en=f"Listen and spell: {word}",
            visual_hint=f"👂🗣️",
            expected_answer=word.lower(),
            hint_hi=f"Pehla akshar hai: 「{word[0]}」 — uske baad baki socho!",
            difficulty=difficulty,
            points=10,
            order=order,
        )

    @staticmethod
    def build_counting(difficulty: Difficulty, order: int) -> ActivityOut:
        n = random.randint(5, 20) if difficulty == Difficulty.EASY else random.randint(20, 50)
        items = ["🍎", "🍊", "🌟", "🎈", "🦋", "🌸"]
        item  = random.choice(items)
        prompt_hi = f"Ye count karo: {item * n}"
        return ActivityOut(
            activity_id=str(uuid.uuid4()),
            type=ActivityType.COUNTING,
            prompt_hi=prompt_hi,
            visual_hint=f"🔢",
            expected_answer=str(n),
            hint_hi=f"Ek-ek karke ginti karo: 1, 2, 3... {n} tak!",
            difficulty=difficulty,
            points=5,
            order=order,
        )

    @staticmethod
    def build_listen_repeat(difficulty: Difficulty, order: int) -> ActivityOut:
        bank  = _ContentBank()
        words = bank.SPELLING_WORDS.get(difficulty, bank.SPELLING_WORDS[Difficulty.EASY])
        word  = random.choice(words)
        return ActivityOut(
            activity_id=str(uuid.uuid4()),
            type=ActivityType.LISTEN_REPEAT,
            prompt_hi=f"Main kuch keh rahi hoon — tum bolo mere sath! 「{word}」",
            prompt_en=f"Listen carefully: {word}. Now say it!",
            visual_hint=f"👂🗣️",
            expected_answer=word.lower(),
            hint_hi=f"Pehla akshar: 「{word[0].upper()}」 — ab pooraa shabd kaho!",
            difficulty=difficulty,
            points=8,
            order=order,
        )

    @staticmethod
    def build_gk_trivia(difficulty: Difficulty, order: int) -> ActivityOut:
        bank = _ContentBank()
        pool = bank.GK_QUESTIONS if difficulty.value in ("easy", "medium") else bank.GK_QUESTIONS
        q    = random.choice(pool)
        opts = random.sample(q["opt"], k=len(q["opt"]))
        opts_str = " | ".join(f"{i+1}. {o}" for i, o in enumerate(opts))
        return ActivityOut(
            activity_id=str(uuid.uuid4()),
            type=ActivityType.TRIVIA,
            prompt_hi=f"{q['q']}\nOptions: {opts_str}",
            visual_hint="🌍❓",
            expected_answer=q["a"],
            hint_hi=f"Soch-soch kar choose karo. Sachcha jawab dhundho!",
            difficulty=difficulty,
            points=10,
            order=order,
        )

    @staticmethod
    def build_science(difficulty: Difficulty, order: int) -> ActivityOut:
        bank = _ContentBank()
        q    = random.choice(bank.SCIENCE_QUESTIONS)
        opts = random.sample(q["opt"], k=len(q["opt"]))
        opts_str = " | ".join(f"{i+1}. {o}" for i, o in enumerate(opts))
        return ActivityOut(
            activity_id=str(uuid.uuid4()),
            type=ActivityType.TRIVIA,
            prompt_hi=f"🔬 {q['q']}\nOptions: {opts_str}",
            visual_hint="🔬🧪",
            expected_answer=q["a"],
            hint_hi=f"Apne school ke science book yaad karo!",
            difficulty=difficulty,
            points=10,
            order=order,
        )

    @staticmethod
    def build_activities(subject: Subject, topic: str,
                         difficulty: Difficulty, count: int = 5) -> list[ActivityOut]:
        activities: list[ActivityOut] = []

        if subject == Subject.MATHEMATICS:
            activities.append(ActivityBuilder.build_story_problem(topic, difficulty, 0))
            for i in range(1, count):
                activities.append(ActivityBuilder.build_flash_card(difficulty, i))

        elif subject == Subject.STORY_MATH:
            for i in range(count):
                activities.append(ActivityBuilder.build_story_problem(topic, difficulty, i))

        elif subject == Subject.HINDI:
            activities.append(ActivityBuilder.build_listen_repeat(difficulty, 0))
            for i in range(1, count):
                activities.append(ActivityBuilder.build_spelling(difficulty, i))

        elif subject == Subject.ENGLISH:
            for i in range(count):
                activities.append(ActivityBuilder.build_spelling(difficulty, i))

        elif subject == Subject.GK:
            for i in range(count):
                activities.append(ActivityBuilder.build_gk_trivia(difficulty, i))

        elif subject == Subject.SCIENCE:
            for i in range(count):
                activities.append(ActivityBuilder.build_science(difficulty, i))

        return activities


# ──────────────────────────────────────────────
#  Answer Evaluator
# ──────────────────────────────────────────────

class AnswerEvaluator:
    """Normalises voice transcript → numeric/text answer → evaluate."""

    @staticmethod
    def normalise_numeric(transcript: str) -> Optional[int]:
        """Handle Hindi number words + digits."""
        hindi_nums = {
            "shunya": 0, "ek": 1, "do": 2, "teen": 3, "char": 4, "chaar": 4,
            "paanch": 5, "chhah": 6, "saat": 7, "aath": 8, "nau": 9,
            "das": 10, "gyarah": 11, "baarah": 12, "terah": 13,
            "chaudah": 14, "pandrah": 15, "solah": 16,
            "satrah": 17, "atharah": 18, "unnis": 19, "bis": 20,
            "pachees": 25, "tees": 30, "chalees": 40, "pachas": 50,
        }
        t = transcript.strip().lower().replace(",", "").replace("।", "")
        # Try digit extraction
        import re
        digits = re.findall(r"\d+", t)
        if digits:
            return int(digits[0])
        # Try Hindi words
        for word, val in hindi_nums.items():
            if word in t:
                return val
        return None

    @staticmethod
    def normalise_text(transcript: str) -> str:
        return transcript.strip().lower().rstrip(".!?,।!").replace(" ", "")

    @staticmethod
    def evaluate(transcript: str, expected: str,
                 activity_type: ActivityType) -> AnswerResult:
        norm_t = AnswerEvaluator.normalise_text(transcript)

        if activity_type in (ActivityType.FLASH_CARD, ActivityType.STORY_PROBLEM,
                             ActivityType.COUNTING):
            detected = AnswerEvaluator.normalise_numeric(transcript)
            if detected is None:
                return AnswerResult.NEEDS_REPEAT
            try:
                expected_num = int(expected)
                if detected == expected_num:
                    return AnswerResult.CORRECT
                # proximity hint (±2 for easy)
                if abs(detected - expected_num) <= 2:
                    return AnswerResult.PARTIAL
                return AnswerResult.INCORRECT
            except ValueError:
                return AnswerResult.INCORRECT

        # text-based: spelling, listen-repeat, GK
        expected_clean = expected.lower().strip()
        if norm_t == expected_clean:
            return AnswerResult.CORRECT
        # partial credit: starts with first letter
        if norm_t and norm_t[0] == expected_clean[0] and len(norm_t) >= len(expected_clean) * 0.5:
            return AnswerResult.PARTIAL
        return AnswerResult.INCORRECT


# ──────────────────────────────────────────────
#  Voice Response Builder
# ──────────────────────────────────────────────

class VoiceResponseBuilder:

    @staticmethod
    def correct(points: int, character: str, is_perfect: bool = True) -> VoiceResponse:
        if is_perfect:
            if points >= 20:
                return VoiceResponse(
                    text_hindi     = f"{character} bolega: बहुत बढ़िया! 🎊🎉 Aapne सही जवाब दिया!",
                    text_english   = f"{character} says: Amazing! 🎊🎉 That's correct!",
                    speak_text     = f"Bahut badhiya! Wah! You earned {points} stars!",
                    celebration    = "confetti",
                    animation      = "bounce",
                )
            return VoiceResponse(
                text_hindi     = f"{character} bolega: सही जवाब! {points} stars! 🎉",
                text_english   = f"{character} says: Correct! {points} stars! 🎉",
                speak_text     = f"Sahi jawab! {points} stars! Wah!",
                celebration    = "stars",
                animation      = "glow",
            )
        return VoiceResponse(
            text_hindi     = f"{character} bolega: ठीक है! Thoda aur try karo! 💪",
            text_english   = f"{character} says: Close! Try a little more! 💪",
            speak_text     = f"Thik hai! Thoda aur koshish karo!",
            celebration    = "clapping",
            animation      = "wiggle",
        )

    @staticmethod
    def incorrect(character: str, hint: Optional[str] = None) -> VoiceResponse:
        hi = f"{character} bolega: अरे! Sahi jawab nahi hai. {hint or 'Phir try karo!'} 😊"
        en = f"{character} says: Oh! That's not quite right. Try again! 😊"
        sp = f"Arre! Phir try karo! {hint or 'Aap kar sakte ho!'}"
        return VoiceResponse(
            text_hindi   = hi,
            text_english = en,
            speak_text   = sp,
            celebration  = None,
            animation    = None,
        )

    @staticmethod
    def repeat(character: str) -> VoiceResponse:
        return VoiceResponse(
            text_hindi   = f"{character} bolega: माफ कीजिए, समझ नहीं आया। बोलो once more? 🎤",
            text_english = f"{character} says: Sorry, didn't catch that. Say it again? 🎤",
            speak_text   = f"Maaf kijiye, phir se bolo please?",
            celebration  = None,
            animation    = "listening",
        )

    @staticmethod
    def lesson_complete(character: str, total_stars: int, new_badges: list[str]) -> VoiceResponse:
        badge_mention = ""
        if new_badges:
            names = [RewardSystem.BADGE_DEFS.get(b).name_hi for b in new_badges if b in RewardSystem.BADGE_DEFS]
            badge_mention = f" Aur naya badge: {', '.join(names)}! "
        return VoiceResponse(
            text_hindi   = f"{character} bolega: बहुत बढ़िया! 🎊 आज का lesson complete! {badge_mention}Aapne {total_stars} stars kamaye!",
            text_english = f"{character} says: Great job! 🎊 Lesson complete! You earned {total_stars} stars!",
            speak_text   = f"Bahut badhiya! Lesson complete! {total_stars} stars! {badge_mention} Wah!",
            celebration  = "confetti",
            animation    = "bounce",
        )

    @staticmethod
    def activity_intro(character: str, activity: ActivityOut) -> VoiceResponse:
        return VoiceResponse(
            text_hindi   = f"{character} bolega: अब ये सवाल है — {activity.prompt_hi}",
            text_english = activity.prompt_en or activity.prompt_hi,
            speak_text   = f"Ab yeh sawal hai. {activity.prompt_hi}",
            celebration  = None,
            animation    = "fade_in",
        )


# ──────────────────────────────────────────────
#  In-Memory Session Store (production: Redis)
# ──────────────────────────────────────────────

class _SessionStore:
    _sessions: dict[str, dict[str, Any]] = {}

    @classmethod
    def create(cls, student_id: str, subject: Subject, topic: str,
               difficulty: Difficulty, activities: list[ActivityOut],
               character: dict[str, str]) -> dict[str, Any]:
        session_id = f"jrn_{uuid.uuid4().hex[:12]}"
        session = {
            "session_id":    session_id,
            "student_id":    student_id,
            "subject":       subject,
            "topic":         topic,
            "difficulty":    difficulty,
            "character":     character,
            "activities":    activities,
            "current_index": 0,
            "stars_earned":  0,
            "points_earned": 0,
            "consecutive_correct": 0,
            "hint_count":    0,
            "status":        LessonStatus.ACTIVE,
            "created_at":    datetime.utcnow().isoformat(),
            "mastery_delta": {},
        }
        cls._sessions[session_id] = session
        return session

    @classmethod
    def get(cls, session_id: str) -> Optional[dict[str, Any]]:
        return cls._sessions.get(session_id)

    @classmethod
    def update(cls, session_id: str, **updates: Any) -> Optional[dict[str, Any]]:
        if session_id in cls._sessions:
            cls._sessions[session_id].update(updates)
            return cls._sessions[session_id]
        return None

    @classmethod
    def delete(cls, session_id: str) -> None:
        cls._sessions.pop(session_id, None)


# ──────────────────────────────────────────────
#  Junior Learning Service
# ──────────────────────────────────────────────

_JUNIOR_TABLES_READY = False


class JuniorService:
    """
    Voice-first, game-based learning service for Class 1-5 students.

    Usage:
        svc = JuniorService()
        lesson      = await svc.start_lesson("stu_001", Subject.MATHEMATICS, "tables")
        answer_out  = await svc.submit_voice_answer(lesson.session_id, "20")
        progress    = await svc.get_junior_progress("stu_001")
    """

    # Activity counts per lesson
    ACTIVITY_COUNTS: dict[Subject, int] = {
        Subject.MATHEMATICS: 5,
        Subject.STORY_MATH:  5,
        Subject.HINDI:       5,
        Subject.ENGLISH:     5,
        Subject.SCIENCE:     5,
        Subject.GK:          5,
    }

    # Difficulty by class (overrideable)
    DIFFICULTY_BY_CLASS: dict[int, Difficulty] = {
        1: Difficulty.EASY,
        2: Difficulty.EASY,
        3: Difficulty.MEDIUM,
        4: Difficulty.MEDIUM,
        5: Difficulty.HARD,
    }

    def __init__(
        self,
        practice_service: PracticeService | None = None,
        mastery_sync: MasterySync | None = None,
        llm_client: LLMClient | None = None,
    ) -> None:
        self._practice = practice_service or PracticeService()
        self._mastery  = mastery_sync or MasterySync()
        self._llm      = llm_client or LLMClient()
        self._bank     = _ContentBank()
        self._store    = _SessionStore

    # ── helpers ────────────────────────────────

    def _pick_character(self, student_id: str) -> dict[str, str]:
        """Deterministic character pick from student_id hash."""
        idx = hash(student_id) % len(self._bank.CHARACTERS)
        return self._bank.CHARACTERS[idx]

    def _difficulty_for(self, student_id: str) -> Difficulty:
        """Derive difficulty from student_id (Class number encoded or default 3)."""
        try:
            class_num = int(student_id[-1]) if student_id[-1].isdigit() else 3
        except Exception:
            class_num = 3
        return self.DIFFICULTY_BY_CLASS.get(class_num, Difficulty.MEDIUM)

    def _greeting(self, character: dict[str, str], subject: Subject, topic: str) -> tuple[str, str]:
        subject_hi = {
            Subject.MATHEMATICS: "गणित",
            Subject.HINDI:       "हिंदी",
            Subject.ENGLISH:     "अंग्रेजी",
            Subject.SCIENCE:     "विज्ञान",
            Subject.GK:          "सामान्य ज्ञान",
            Subject.STORY_MATH:  "गणित की कहानियां",
        }.get(subject, "पढ़ाई")
        hi = (f"नमस्ते! मैं {character['name']} हूँ! 😊\n"
              f"आज हम {subject_hi} — {topic} सीखेंगे! "
              f"तैयार हो? चलो शुरू करते हैं! 🚀")
        en = f"Namaste! I am {character['name']}! 😊\nToday we'll learn {subject.value} — {topic}. Ready? Let's go! 🚀"
        return hi, en

    # ── Public API ─────────────────────────────

    async def start_lesson(
        self,
        student_id: str,
        subject: str,
        topic: str,
        difficulty: str | None = None,
        activity_count: int | None = None,
    ) -> LessonOut:
        """
        Start a new junior learning lesson.

        Args:
            student_id: unique student identifier
            subject:    one of Subject enum values (case-insensitive)
            topic:      free-text topic (e.g. "tables", "spelling", "counting")
            difficulty: override automatic class-based difficulty
            activity_count: override default 5 activities

        Returns:
            LessonOut with first activity and greeting
        """
        subject_enum = Subject(subject.lower().strip())
        diff = Difficulty(difficulty) if difficulty else self._difficulty_for(student_id)
        count = activity_count or self.ACTIVITY_COUNTS.get(subject_enum, 5)
        character = self._pick_character(student_id)
        activities = ActivityBuilder.build_activities(subject_enum, topic, diff, count)
        greeting_hi, greeting_en = self._greeting(character, subject_enum, topic)

        session = self._store.create(
            student_id   = student_id,
            subject      = subject_enum,
            topic        = topic,
            difficulty   = diff,
            activities   = activities,
            character    = character,
        )

        # Persist to DB (non-blocking)
        asyncio.get_running_loop().create_task(
            self._persist_session(session)
        )

        logger.info(
            "Junior lesson started: student=%s subject=%s topic=%s session=%s",
            student_id, subject, topic, session["session_id"],
        )

        return LessonOut(
            session_id      = session["session_id"],
            student_id      = student_id,
            subject         = subject_enum,
            topic           = topic,
            difficulty      = diff,
            character_name  = f"{character['emoji']} {character['name']}",
            greeting_hi     = greeting_hi,
            greeting_en     = greeting_en,
            speak_greeting  = greeting_hi,
            activities      = activities,
            current_index   = 0,
            status          = LessonStatus.ACTIVE,
            total_activities= len(activities),
        )

    async def submit_voice_answer(
        self,
        session_id: str,
        transcript: str,
        *,
        skip_feedback: bool = False,
    ) -> VoiceAnswerOut:
        """
        Submit a voice-transcribed answer. Returns evaluation + next activity.

        Args:
            session_id:  lesson session ID from start_lesson
            transcript:  raw text from Web Speech API
            skip_feedback: set True for auto-advance on correct

        Returns:
            VoiceAnswerOut with TTS text, celebration, next activity or completion
        """
        session = self._store.get(session_id)
        if not session:
            # Multi-worker deployments: nginx may route the next answer to a
            # different backend — restore the session from the DB.
            session = await self._restore_session(session_id)
        if not session:
            raise ValueError(f"Session not found: {session_id}")

        if session["status"] != LessonStatus.ACTIVE:
            return VoiceAnswerOut(
                session_id    = session_id,
                result        = AnswerResult.INCORRECT,
                voice_response= VoiceResponseBuilder.incorrect(
                    session["character"]["name"], "Lesson already over!"
                ),
                stars_earned  = 0,
                new_badges    = [],
                mastery_delta = {},
                is_lesson_complete=True,
            )

        activities  = session["activities"]
        idx         = session["current_index"]

        if idx >= len(activities):
            return self._complete_lesson(session)

        activity = activities[idx]
        result   = AnswerEvaluator.evaluate(transcript, activity.expected_answer or "", activity.type)

        # Update session state
        consecutive = session["consecutive_correct"]
        hint_count  = session["hint_count"]
        mastery_delta: dict[str, float] = {}

        if result == AnswerResult.CORRECT:
            consecutive += 1
            session["stars_earned"]  += activity.points
            session["points_earned"] += activity.points
            # Mastery sync (fire & forget)
            skill_key = f"{session['subject'].value}:{session['topic']}"
            delta = 0.05 if activity.difficulty == Difficulty.EASY else 0.08
            mastery_delta[skill_key] = round(delta, 3)
            asyncio.get_running_loop().create_task(
                self._sync_mastery(student_id=session["student_id"],
                                   skill=skill_key, delta=delta)
            )
            asyncio.get_running_loop().create_task(
                self._persist_stars(session["student_id"],
                                    session["subject"].value, activity.points)
            )

        elif result == AnswerResult.PARTIAL:
            hint_count += 1
            # small mastery bump
            skill_key = f"{session['subject'].value}:{session['topic']}"
            mastery_delta[skill_key] = round(0.02, 3)

        elif result == AnswerResult.INCORRECT:
            consecutive = 0

        new_badges = RewardSystem.check_badges(
            student_id=session["student_id"],
            session   =session,
            answer_result  =result,
            activity_type  =activity.type,
            consecutive_correct=consecutive,
        )
        for b in new_badges:
            asyncio.get_running_loop().create_task(
                self._award_badge(session["student_id"], b)
            )

        self._store.update(session_id,
                           consecutive_correct=consecutive,
                           hint_count=hint_count,
                           mastery_delta={**session.get("mastery_delta", {}), **mastery_delta})

        # Build response
        char_name = session["character"]["name"]
        if result == AnswerResult.CORRECT:
            voice_resp = VoiceResponseBuilder.correct(
                activity.points, char_name,
                is_perfect=(consecutive > 1),
            )
        elif result == AnswerResult.PARTIAL:
            hint_hi = HintEngine.get_hints(activity.type, int(activity.expected_answer or 0), activity.difficulty)[hint_count % 3]
            voice_resp = VoiceResponseBuilder.correct(
                activity.points // 2, char_name, is_perfect=False
            )
            voice_resp.text_hindi   += f"\n{hint_hi}"
            voice_resp.speak_text   += f"\n{hint_hi}"
        elif result == AnswerResult.NEEDS_REPEAT:
            voice_resp = VoiceResponseBuilder.repeat(char_name)
        else:
            hints = HintEngine.get_hints(activity.type, int(activity.expected_answer or 0), activity.difficulty)
            hint  = hints[hint_count % len(hints)]
            voice_resp = VoiceResponseBuilder.incorrect(char_name, hint)

        # Advance
        session = self._store.get(session_id)  # refresh
        if result in (AnswerResult.CORRECT, AnswerResult.PARTIAL):
            session["current_index"] += 1

        next_activity = None
        is_complete   = False
        if session["current_index"] < len(activities):
            next_activity = activities[session["current_index"]]
        else:
            is_complete = True

        if is_complete:
            voice_resp = VoiceResponseBuilder.lesson_complete(
                char_name, session["stars_earned"], new_badges
            )
            self._store.update(session_id, status=LessonStatus.COMPLETED)

        logger.debug(
            "Voice answer: session=%s result=%s consecutive=%d stars=%d",
            session_id, result.value, consecutive, session["stars_earned"],
        )

        asyncio.get_running_loop().create_task(self._persist_session(session))

        return VoiceAnswerOut(
            session_id       = session_id,
            result           = result,
            voice_response   = voice_resp,
            next_activity    = next_activity,
            stars_earned     = session["stars_earned"],
            new_badges       = new_badges,
            mastery_delta    = mastery_delta,
            is_lesson_complete=is_complete,
        )

    async def get_junior_progress(
        self,
        student_id: str,
        days: int = 7,
    ) -> JuniorProgressOut:
        """
        Fetch a student's progress with stars, badges, and weekly activity.

        Args:
            student_id: unique student identifier
            days:       look-back window (default 7)

        Returns:
            JuniorProgressOut with full progress data
        """
        # Pull from DB via existing mastery infrastructure
        mastery_data = await self._fetch_mastery(student_id)

        total_stars   = mastery_data.get("total_stars", 0)
        total_points  = mastery_data.get("total_points", 0)
        level         = max(1, total_stars // 100)
        current_streak= mastery_data.get("current_streak", 0)

        # Badges
        earned_badge_ids = mastery_data.get("earned_badges", [])
        badges: list[BadgeInfo] = []
        for b_id, b_def in RewardSystem.BADGE_DEFS.items():
            earned = b_id in earned_badge_ids
            badges.append(BadgeInfo(
                id=b_def.id,
                name_hi=b_def.name_hi,
                name_en=b_def.name_en,
                icon=b_def.icon,
                description_hi=b_def.description_hi,
                description_en=b_def.description_en,
                earned_at=datetime.utcnow().isoformat() if earned else None,
                progress=1.0 if earned else 0.0,
            ))

        # Subject progress
        subject_progress: dict[str, float] = mastery_data.get("subject_progress", {
            Subject.MATHEMATICS.value: 0.0,
            Subject.HINDI.value:       0.0,
            Subject.ENGLISH.value:     0.0,
            Subject.SCIENCE.value:     0.0,
            Subject.GK.value:          0.0,
        })

        # Weekly stars
        weekly_stars = mastery_data.get("weekly_stars", [0] * days)

        # Recent activities
        recent = mastery_data.get("recent_activities", [])

        # Recommend next topic
        weakest_subject = min(subject_progress, key=subject_progress.get) \
            if subject_progress else "mathematics"
        recommended = self._recommend_topic(weakest_subject, subject_progress.get(weakest_subject, 0.0))

        return JuniorProgressOut(
            student_id        = student_id,
            total_stars       = total_stars,
            total_points      = total_points,
            level             = level,
            current_streak    = current_streak,
            badges            = badges,
            subject_progress  = subject_progress,
            recent_activities = recent,
            weekly_stars      = weekly_stars,
            recommended_next  = recommended,
        )

    async def generate_story_problem(
        self,
        topic: str,
        difficulty: str,
        *,
        n: int = 1,
        style: str = "adventure",
    ) -> list[dict[str, Any]]:
        """
        Generate Hinglish story-based math problems for a given topic/difficulty.

        Args:
            topic:        e.g. "multiplication", "addition", "counting"
            difficulty:   "easy" | "medium" | "hard"
            n:            number of problems (default 1)
            style:        narrative flavour — "adventure" | "market" | "school" | "space"

        Returns:
            list of {story_hi, question_hi, answer, hint_hi, difficulty}
        """
        diff = Difficulty(difficulty.lower().strip())
        bank = _ContentBank()
        problems: list[dict[str, Any]] = []

        for _ in range(n):
            mp = MathGenerator.generate_multiplication(diff, 1)[0]
            tpl = random.choice(bank.STORY_TEMPLATES)
            animal = random.choice(bank.ANIMALS)
            fruit  = random.choice(bank.FRUITS)
            flower = random.choice(bank.FLOWERS)

            story_hi = tpl["template"].format(animal=animal, fruit=fruit, flower=flower, n1=mp["n1"], n2=mp["n2"])
            question_hi = f"Total kitne {fruit} chahiye? Batao!"
            hint_hi = tpl["hint_template"].format(n1=mp["n1"], n2=mp["n2"])

            problems.append({
                "story_hi":    story_hi,
                "question_hi": question_hi,
                "answer":      mp["answer"],
                "hint_hi":     hint_hi,
                "difficulty":  diff.value,
                "topic":       topic,
                "speak_story": story_hi,
                "emoji_scene": "📚" if style == "school" else "🚀" if style == "space" else "🛒" if style == "market" else "🗺️",
            })

        # Optionally enrich via LLM for more creative stories (no API key required fallback)
        if self._llm and problems:
            try:
                enriched = await self._enrich_stories_llm(problems, style)
                if enriched:
                    problems = enriched
            except Exception as exc:
                logger.debug("LLM story enrichment skipped: %s", exc)

        return problems

    # ── Session helpers ─────────────────────────

    async def get_active_session(self, student_id: str) -> LessonOut | None:
        """Resume most-recent active session for a student."""
        for sid, sess in _SessionStore._sessions.items():
            if sess["student_id"] == student_id and sess["status"] == LessonStatus.ACTIVE:
                char = sess["character"]
                hi, _ = self._greeting(char, sess["subject"], sess["topic"])
                return LessonOut(
                    session_id=sid,
                    student_id=student_id,
                    subject=sess["subject"],
                    topic=sess["topic"],
                    difficulty=sess["difficulty"],
                    character_name=f"{char['emoji']} {char['name']}",
                    greeting_hi=hi,
                    greeting_en="",
                    speak_greeting=hi,
                    activities=sess["activities"],
                    current_index=sess["current_index"],
                    status=sess["status"],
                    total_activities=len(sess["activities"]),
                )
        return None

    async def abandon_session(self, session_id: str) -> None:
        """Abandon an in-progress lesson (e.g. student closes app)."""
        session = self._store.get(session_id)
        if session:
            self._store.update(session_id, status=LessonStatus.ABANDONED)
            logger.info("Session abandoned: %s", session_id)

    # ── Private helpers ─────────────────────────

    def _complete_lesson(self, session: dict[str, Any]) -> VoiceAnswerOut:
        char_name = session["character"]["name"]
        voice_resp = VoiceResponseBuilder.lesson_complete(
            char_name, session["stars_earned"], []
        )
        self._store.update(session["session_id"], status=LessonStatus.COMPLETED)
        return VoiceAnswerOut(
            session_id        = session["session_id"],
            result            = AnswerResult.CORRECT,
            voice_response    = voice_resp,
            next_activity     = None,
            stars_earned      = session["stars_earned"],
            new_badges        = [],
            mastery_delta     = session.get("mastery_delta", {}),
            is_lesson_complete=True,
        )

    def _recommend_topic(self, subject: str, mastery: float) -> str:
        if mastery < 0.3:
            topics = {
                Subject.MATHEMATICS.value: "Multiplication tables",
                Subject.HINDI.value:       "Swar aur Vyanjan",
                Subject.ENGLISH.value:     "Alphabet aur Phonics",
                Subject.SCIENCE.value:     "Plants and Animals",
                Subject.GK.value:          "Our Country — India",
            }
            return topics.get(subject, f"Basics of {subject}")
        return f"Advanced {subject} — new challenge!"

    async def _restore_session(self, session_id: str) -> Optional[dict[str, Any]]:
        """Rebuild an in-memory session from its persisted DB row (multi-worker)."""
        try:
            from sqlalchemy import text
            import json as _json
            async with async_session_maker() as db:
                row = (await db.execute(text(
                    "SELECT * FROM junior_lesson_sessions WHERE session_id = :sid"
                ), {"sid": session_id})).mappings().first()
            if not row or row["status"] != LessonStatus.ACTIVE.value:
                return None
            raw = row["activities"]
            if not isinstance(raw, list):
                raw = _json.loads(raw or "[]")
            session = {
                "session_id":    row["session_id"],
                "student_id":    row["student_id"],
                "subject":       Subject(row["subject"]),
                "topic":         row["topic"] or "",
                "difficulty":    Difficulty(row["difficulty"] or "medium"),
                "character":     {"name": row["character_name"] or "Moti", "emoji": "", "personality": ""},
                "activities":    [ActivityOut(**a) for a in raw],
                "current_index": row["current_index"] or 0,
                "stars_earned":  row["stars_earned"] or 0,
                "points_earned": row["points_earned"] or 0,
                "consecutive_correct": row["consecutive_correct"] or 0,
                "hint_count":    row["hint_count"] or 0,
                "status":        LessonStatus.ACTIVE,
                "created_at":    row["created_at"].isoformat() if row["created_at"] else datetime.utcnow().isoformat(),
                "mastery_delta": {},
            }
            _SessionStore._sessions[session["session_id"]] = session
            return session
        except Exception as exc:
            logger.debug("Session restore failed: %s", exc)
            return None

    async def _persist_session(self, session: dict[str, Any]) -> None:
        """Background DB write — non-blocking."""
        try:
            async with async_session_maker() as db:
                # Insert junior_lesson_sessions record (table assumed)
                import json
                from sqlalchemy import text
                await db.execute(text("""
                    INSERT INTO junior_lesson_sessions
                        (session_id, student_id, subject, topic, difficulty,
                         character_name, activities, status, created_at,
                         current_index, consecutive_correct, hint_count,
                         stars_earned, points_earned)
                    VALUES
                        (:sid, :sid2, :subj, :topic, :diff,
                         :char, :acts, :status, :created,
                         :cidx, :consec, :hints, :stars, :points)
                    ON CONFLICT (session_id) DO UPDATE SET
                        status = EXCLUDED.status,
                        current_index = EXCLUDED.current_index,
                        consecutive_correct = EXCLUDED.consecutive_correct,
                        hint_count = EXCLUDED.hint_count,
                        stars_earned = EXCLUDED.stars_earned,
                        points_earned = EXCLUDED.points_earned
                """), {
                    "sid":    session["session_id"],
                    "sid2":   session["student_id"],
                    "subj":   session["subject"].value,
                    "topic":  session["topic"],
                    "diff":   session["difficulty"].value,
                    "char":   session["character"]["name"],
                    "acts":   json.dumps([a.model_dump() for a in session["activities"]]),
                    "status": session["status"].value,
                    "created": (
                        datetime.fromisoformat(session["created_at"])
                        if isinstance(session["created_at"], str)
                        else session["created_at"]
                    ),
                    "cidx":   session.get("current_index", 0),
                    "consec": session.get("consecutive_correct", 0),
                    "hints":  session.get("hint_count", 0),
                    "stars":  session.get("stars_earned", 0),
                    "points": session.get("points_earned", 0),
                })
                await db.commit()
        except Exception as exc:
            logger.warning("Session persist failed (non-fatal): %s", exc)

    async def _sync_mastery(self, student_id: str, skill: str, delta: float) -> None:
        try:
            await self._mastery.increment(student_id, skill, delta)
        except Exception as exc:
            logger.debug("Mastery sync skipped: %s", exc)

    async def _ensure_junior_tables(self) -> None:
        """Create the persistence tables this service reads/writes (idempotent)."""
        global _JUNIOR_TABLES_READY
        if _JUNIOR_TABLES_READY:
            return
        async with async_session_maker() as db:
            from sqlalchemy import text
            await db.execute(text("""
                CREATE TABLE IF NOT EXISTS student_mastery (
                    id BIGSERIAL PRIMARY KEY,
                    student_id TEXT NOT NULL UNIQUE,
                    subject TEXT NOT NULL DEFAULT 'mathematics',
                    mastery_score REAL NOT NULL DEFAULT 0,
                    total_stars INTEGER NOT NULL DEFAULT 0,
                    total_points INTEGER NOT NULL DEFAULT 0,
                    current_streak INTEGER NOT NULL DEFAULT 0,
                    earned_badges TEXT NOT NULL DEFAULT '[]',
                    weekly_stars TEXT NOT NULL DEFAULT '[0,0,0,0,0,0,0]',
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
            """))
            await db.execute(text("""
                CREATE TABLE IF NOT EXISTS junior_lesson_sessions (
                    session_id TEXT PRIMARY KEY,
                    student_id TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    topic TEXT,
                    difficulty TEXT,
                    character_name TEXT,
                    activities JSONB NOT NULL DEFAULT '[]'::jsonb,
                    status TEXT NOT NULL DEFAULT 'active',
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                )
            """))
            for _ddl in (
                "ALTER TABLE junior_lesson_sessions ADD COLUMN IF NOT EXISTS current_index INT NOT NULL DEFAULT 0",
                "ALTER TABLE junior_lesson_sessions ADD COLUMN IF NOT EXISTS consecutive_correct INT NOT NULL DEFAULT 0",
                "ALTER TABLE junior_lesson_sessions ADD COLUMN IF NOT EXISTS hint_count INT NOT NULL DEFAULT 0",
                "ALTER TABLE junior_lesson_sessions ADD COLUMN IF NOT EXISTS stars_earned INT NOT NULL DEFAULT 0",
                "ALTER TABLE junior_lesson_sessions ADD COLUMN IF NOT EXISTS points_earned INT NOT NULL DEFAULT 0",
            ):
                await db.execute(text(_ddl))
            await db.execute(text(
                """
                CREATE TABLE IF NOT EXISTS student_badges (
                    id BIGSERIAL PRIMARY KEY,
                    student_id TEXT NOT NULL,
                    badge_id TEXT NOT NULL,
                    earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    UNIQUE (student_id, badge_id)
                )
            """))
            await db.commit()
        _JUNIOR_TABLES_READY = True

    async def _award_badge(self, student_id: str, badge_id: str) -> None:
        try:
            from sqlalchemy import text
            await self._ensure_junior_tables()
            async with async_session_maker() as db:
                await db.execute(text("""
                    INSERT INTO student_badges (student_id, badge_id, earned_at)
                    VALUES (:sid, :bid, NOW())
                    ON CONFLICT (student_id, badge_id) DO NOTHING
                """), {"sid": student_id, "bid": badge_id})
                row = (await db.execute(text(
                    "SELECT earned_badges FROM student_mastery WHERE student_id = :sid"
                ), {"sid": student_id})).mappings().first()
                if row:
                    import json
                    earned = json.loads(row["earned_badges"] or "[]")
                    if badge_id not in earned:
                        earned.append(badge_id)
                        await db.execute(text(
                            "UPDATE student_mastery SET earned_badges = :eb WHERE student_id = :sid"
                        ), {"eb": json.dumps(earned), "sid": student_id})
                else:
                    import json
                    await db.execute(text("""
                        INSERT INTO student_mastery (student_id, earned_badges)
                        VALUES (:sid, :eb)
                        ON CONFLICT (student_id) DO NOTHING
                    """), {"sid": student_id, "eb": json.dumps([badge_id])})
                await db.commit()
        except Exception as exc:
            logger.debug("Badge award skipped: %s", exc)

    async def _persist_stars(self, student_id: str, subject: str, stars: int) -> None:
        """Persist earned stars/points and the daily streak to student_mastery."""
        if stars <= 0:
            return
        try:
            from sqlalchemy import text
            await self._ensure_junior_tables()
            async with async_session_maker() as db:
                row = (await db.execute(text(
                    "SELECT total_stars, current_streak, weekly_stars, updated_at"
                    " FROM student_mastery WHERE student_id = :sid"
                ), {"sid": student_id})).mappings().first()
                import json
                if row:
                    today = date.today()
                    last = row["updated_at"].date() if row["updated_at"] else None
                    if last == today:
                        streak = max(row["current_streak"] or 1, 1)
                    elif last == today - timedelta(days=1):
                        streak = (row["current_streak"] or 0) + 1
                    else:
                        streak = 1
                    # atomic in SQL — concurrent fire-and-forget tasks must not lose updates
                    await db.execute(text(
                        "UPDATE student_mastery SET subject = :subj,"
                        " mastery_score = LEAST(mastery_score + 0.05, 1.0),"
                        " total_stars = total_stars + :stars,"
                        " total_points = total_points + :stars,"
                        " current_streak = :streak,"
                        " weekly_stars = jsonb_set(weekly_stars::jsonb, '{6}',"
                        "   to_jsonb(COALESCE(weekly_stars::jsonb->>6, '0')::int + :stars))::text,"
                        " updated_at = NOW()"
                        " WHERE student_id = :sid"
                    ), {"subj": subject, "stars": stars, "streak": streak, "sid": student_id})
                else:
                    await db.execute(text(
                        "INSERT INTO student_mastery (student_id, subject, mastery_score,"
                        " total_stars, total_points, current_streak, weekly_stars)"
                        " VALUES (:sid, :subj, 0.05, :stars, :stars, 1, :weekly)"
                    ), {"sid": student_id, "subj": subject, "stars": stars,
                        "weekly": json.dumps([0, 0, 0, 0, 0, 0, stars])})
                await db.commit()
        except Exception as exc:
            logger.debug("Junior star persistence skipped: %s", exc)

    async def _fetch_mastery(self, student_id: str) -> dict[str, Any]:
        try:
            async with async_session_maker() as db:
                from sqlalchemy import text
                result = await db.execute(text("""
                    SELECT subject, mastery_score,
                           total_stars, total_points, current_streak,
                           earned_badges, weekly_stars
                    FROM student_mastery
                    WHERE student_id = :sid
                """), {"sid": student_id})
                row = result.mappings().first()
                if row:
                    import json
                    earned = set(json.loads(row["earned_badges"] or "[]"))
                    badge_rows = await db.execute(text(
                        "SELECT badge_id FROM student_badges WHERE student_id = :sid"
                    ), {"sid": student_id})
                    earned |= {r[0] for r in badge_rows}
                    return {
                        "total_stars":    row["total_stars"] or 0,
                        "total_points":   row["total_points"] or 0,
                        "current_streak": row["current_streak"] or 0,
                        "earned_badges":  sorted(earned),
                        "weekly_stars":   json.loads(row["weekly_stars"] or "[0,0,0,0,0,0,0]"),
                        "subject_progress": {row["subject"]: row["mastery_score"]},
                    }
        except Exception as exc:
            logger.debug("Mastery fetch fallback: %s", exc)

        # Default
        return {
            "total_stars": 0,
            "total_points": 0,
            "current_streak": 0,
            "earned_badges": [],
            "weekly_stars": [0] * 7,
            "subject_progress": {},
        }

    async def _enrich_stories_llm(
        self,
        problems: list[dict[str, Any]],
        style: str,
    ) -> list[dict[str, Any]]:
        """Optionally enrich story problems with LLM (no hard dependency)."""
        try:
            prompt = (
                "Translate and expand these Hinglish story problems into engaging "
                "Hinglish for Indian kids ages 6-10. Keep math facts unchanged. "
                f"Style: {style}. Return JSON array only.\n"
                + str([{"story": p["story_hi"], "answer": p["answer"]} for p in problems])
            )
            response = await self._llm.generate_json(prompt, max_tokens=512)
            if isinstance(response, list) and len(response) == len(problems):
                for enriched, original in zip(response, problems):
                    if isinstance(enriched, dict) and "story_hi" in enriched:
                        original["story_hi"]    = enriched["story_hi"]
                        original["speak_story"] = enriched.get("story_hi", original["story_hi"])
            return problems
        except Exception:
            return problems


# ──────────────────────────────────────────────
#  Module-level convenience accessors
# ──────────────────────────────────────────────

_default_service: JuniorService | None = None

async def get_junior_service() -> JuniorService:
    global _default_service
    if _default_service is None:
        _default_service = JuniorService()
    return _default_service


async def start_lesson(student_id: str, subject: str, topic: str,
                       difficulty: str | None = None) -> LessonOut:
    svc = await get_junior_service()
    return await svc.start_lesson(student_id, subject, topic, difficulty)


async def submit_voice_answer(session_id: str, transcript: str) -> VoiceAnswerOut:
    svc = await get_junior_service()
    return await svc.submit_voice_answer(session_id, transcript)


async def get_junior_progress(student_id: str) -> JuniorProgressOut:
    svc = await get_junior_service()
    return await svc.get_junior_progress(student_id)


async def generate_story_problem(topic: str, difficulty: str,
                                 n: int = 1, style: str = "adventure") -> list[dict[str, Any]]:
    svc = await get_junior_service()
    return await svc.generate_story_problem(topic, difficulty, n=n, style=style)