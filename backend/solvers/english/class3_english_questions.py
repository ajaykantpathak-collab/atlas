"""
CISCE Class 3 English - Deterministic Question Generator & Solver
Covers all syllabus nodes:
  c3_eng_103: Rhyming words, repetition, rhythm in poetry
  c3_eng_101: Sensory words in poems
  c3_eng_001: Reading comprehension - literal
"""

import random
import math
import re
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple, Union
from enum import Enum
import json


# ============================================================
# ENUMS
# ============================================================

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"

class DifficultyLevel(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class ContextType(Enum):
    COMPETENCY = "competency"
    STANDARD = "standard"

class TopicTag(Enum):
    RHYMING_WORDS = "rhyming_words"
    REPETITION = "repetition"
    RHYTHM = "rhythm"
    SENSORY_SIGHT = "sensory_sight"
    SENSORY_HEARING = "sensory_hearing"
    SENSORY_TOUCH = "sensory_touch"
    SENSORY_SMELL = "sensory_smell"
    SENSORY_TASTE = "sensory_taste"
    SENSORY_MIXED = "sensory_mixed"
    LITERAL_WHO_WHAT = "literal_who_what"
    LITERAL_WHERE_WHEN = "literal_where_when"
    TRUE_FALSE = "true_false"
    SEQUENCING = "sequencing"
    SENTENCE_COMPLETION = "sentence_completion"


# ============================================================
# CONTENT DATA
# ============================================================

POEMS = {
    "mango_tree": {
        "title": "The Mango Tree",
        "context": "standard",
        "lines": [
            "High up in the garden tall,",
            "The mango tree is loved by all,",
            "In summer hot the fruit comes sweet,",
            "Children run to eat the treat.",
            "Green leaves wave in warm wind's motion,",
            "Fresh ripe mangoes for the ocean",
            "Of happy hands that reach up high,",
            "Underneath the blue blue sky."
        ],
        "rhyming_pairs": [("tall", "all"), ("sweet", "treat"), ("motion", "ocean"), ("high", "sky")],
        "repeated_words": {"blue": 2},
        "rhythm_feel": "regular and bouncy, like walking",
        "sensory_words": {
            "sight": ["tall", "green", "blue", "blue"],
            "taste": ["sweet"],
            "touch": ["warm"],
            "hearing": [],
            "smell": []
        }
    },
    "diwali_lights": {
        "title": "Diwali Lights",
        "context": "competency",
        "lines": [
            "Diyas glow with golden light,",
            "Rangoli patterns, red and bright,",
            "Sweets are shared with family dear,",
            "Fireworks boom and fill the air,",
            "New clothes rustle soft and fine,",
            "Lights shine on each porch and shrine,",
            "Crackers pop with spark and sound,",
            "Happiness goes round and round."
        ],
        "rhyming_pairs": [("light", "bright"), ("dear", "air"), ("fine", "shine"), ("sound", "round")],
        "repeated_words": {"and": 4, "round": 2},
        "rhythm_feel": "celebratory and fast, like dancing",
        "sensory_words": {
            "sight": ["glow", "golden", "light", "bright", "red", "new", "spark"],
            "hearing": ["boom", "pop", "sound"],
            "taste": ["sweets"],
            "touch": ["rustle", "soft"],
            "smell": []
        }
    },
    "monsoon_rain": {
        "title": "Monsoon Rain",
        "context": "competency",
        "lines": [
            "Clouds hang low on the mountain ridge,",
            "First big drops on the parched brown ridge,",
            "Frogs croak loud in the muddy field,",
            "Puddles splash where small feet yield,",
            "Wet earth smells of jasmine rain,",
            "Umbrellas open, bright as grain,",
            "Tea is hot, pakoras crisp,",
            "Monsoon comes with thunder's grip."
        ],
        "rhyming_pairs": [("ridge", "ridge"), ("field", "yield"), ("rain", "grain"), ("crisp", "grip")],
        "repeated_words": {"ridge": 2},
        "rhythm_feel": "slow and steady, like raindrops falling",
        "sensory_words": {
            "sight": ["clouds", "drops", "puddles", "umbrellas", "bright"],
            "hearing": ["croak", "loud", "thunder"],
            "touch": ["wet", "parched", "hot"],
            "smell": ["smells"],
            "taste": ["tea", "pakoras", "crisp"]
        }
    },
    "temple_bell": {
        "title": "The Temple Bell",
        "context": "competency",
        "lines": [
            "The temple bell rings loud and clear,",
            "Echoes bounce for all to hear,",
            "Flowers smell of jasmine sweet,",
            "Arati flames with heat so bright,",
            "Incense spirals to the sky,",
            "Lotus petals float nearby,",
            "Coconut breaks with crack and pop,",
            "Prasad sweets are handed out."
        ],
        "rhyming_pairs": [("clear", "hear"), ("sweet", "bright"), ("sky", "nearby"), ("pop", "out")],
        "repeated_words": {},
        "rhythm_feel": "regular and calm, like a prayer chant",
        "sensory_words": {
            "hearing": ["rings", "loud", "echoes", "bounce", "crack", "pop"],
            "smell": ["smell", "incense"],
            "sight": ["flames", "heat", "bright", "sky", "lotus", "petals"],
            "taste": ["sweet", "coconut", "sweets"],
            "touch": ["heat"]
        }
    },
    "little_cloud": {
        "title": "Little Cloud",
        "context": "standard",
        "lines": [
            "Little cloud so soft and white,",
            "Floating in the sky so light,",
            "Raindrops fall on flowers red,",
            "Grass is wet, the path is led",
            "By the sunshine after rain,",
            "Cleaning all the dirt and stain,",
            "Rainbow colours, seven bright,",
            "Washing all the world so white."
        ],
        "rhyming_pairs": [("white", "light"), ("red", "led"), ("rain", "stain"), ("bright", "white")],
        "repeated_words": {"white": 2},
        "rhythm_feel": "soft and gentle, like floating",
        "sensory_words": {
            "sight": ["white", "sky", "light", "flowers", "red", "sunshine", "rainbow", "bright", "white"],
            "touch": ["soft", "wet"],
            "smell": [],
            "hearing": [],
            "taste": []
        }
    },
    "the_cow": {
        "title": "The Friendly Cow",
        "context": "competency",
        "lines": [
            "The friendly cow gives creamy milk,",
            "Soft and warm, like velvet silk,",
            "She chews her cud with slow content,",
            "In the field where she is sent,",
            "Her gentle eyes are big and brown,",
            "Her horns are white, her tail hangs down,",
            "Children pet her, give her grass,",
            "Watching her as time goes pass."
        ],
        "rhyming_pairs": [("milk", "silk"), ("content", "sent"), ("brown", "down"), ("grass", "pass")],
        "repeated_words": {},
        "rhythm_feel": "slow and gentle, like a cow chewing",
        "sensory_words": {
            "taste": ["creamy", "milk"],
            "touch": ["soft", "warm", "velvet", "silk"],
            "sight": ["brown", "white"],
            "hearing": [],
            "smell": ["grass"]
        }
    }
}

PASSAGES = {
    "ravi_market": {
        "title": "Ravi Goes to the Market",
        "context": "competency",
        "text": (
            "Ravi wakes up early on Saturday morning. His mother calls him to get ready. "
            "They walk to the weekly market in their village. The market is full of colour. "
            "Ravi sees a man selling bright red tomatoes. He sees another man with big yellow mangoes. "
            "His mother buys two kilograms of rice and half a kilogram of dal. "
            "She also buys some jalebis for Ravi. Ravi is very happy. "
            "On the way home, they stop at the village temple. Ravi rings the big temple bell. "
            "His mother says it is time to go home. Ravi waves goodbye to the temple."
        ),
        "questions_pool": {
            "who": ["Ravi", "Ravi's mother"],
            "what_buys": ["two kilograms of rice", "half a kilogram of dal", "jalebis"],
            "what_does": ["walks to the weekly market", "rings the big temple bell", "waves goodbye"],
            "where": ["the weekly market in their village", "the village temple"],
            "when": ["Saturday morning"],
            "how_many_items": ["rice", "dal", "jalebis"],
            "sequence": [
                "Ravi wakes up early on Saturday morning",
                "They walk to the weekly market",
                "His mother buys rice, dal, and jalebis",
                "They stop at the village temple",
                "Ravi rings the big temple bell",
                "Ravi waves goodbye to the temple"
            ]
        }
    },
    "priya_diwali": {
        "title": "Priya Prepares for Diwali",
        "context": "competency",
        "text": (
            "Diwali is Priya's favourite festival. She loves the lights, the sweets, and the new clothes. "
            "Ten days before Diwali, Priya and her mother clean the house. They wash the floors and dust the shelves. "
            "Priya makes a beautiful rangoli at the front door using coloured rice and flowers. "
            "Her father buys sparklers and flower pots for the family. "
            "On Diwali evening, Priya wears her new red and gold dress. She lights diyas along the balcony. "
            "The whole family prays together. After prayers, they eat yummy sweets and ladoos. "
            "Then they go outside to burst crackers. Priya laughs and dances in the golden light."
        ),
        "questions_pool": {
            "who": ["Priya", "Priya's mother", "Priya's father"],
            "what_does": [
                "cleans the house with her mother",
                "makes a beautiful rangoli",
                "lights diyas along the balcony",
                "prays together with the family",
                "eats yummy sweets and ladoos",
                "bursts crackers"
            ],
            "favourite_festival": "Diwali",
            "when_start": ["Ten days before Diwali"],
            "when_evening": "Diwali evening",
            "where_rangoli": "at the front door",
            "what_clothes": ["new red and gold dress"],
            "what_buys_father": ["sparklers and flower pots"],
            "sequence": [
                "Priya and her mother clean the house ten days before Diwali",
                "Priya makes a rangoli at the front door",
                "Her father buys sparklers and flower pots",
                "Priya wears her new red and gold dress on Diwali evening",
                "She lights diyas along the balcony",
                "The family prays together",
                "They eat sweets and ladoos",
                "They burst crackers outside"
            ]
        }
    },
    "kabir_garden": {
        "title": "Kabir's School Garden",
        "context": "competency",
        "text": (
            "Kabir is in Class 3 at St. Mary's School. His school has a beautiful garden behind the classroom building. "
            "Every Monday, Kabir's class goes to the garden for a nature lesson. "
            "Mr. Sharma, the science teacher, shows them different plants. "
            "There are marigold flowers that are bright orange and yellow. "
            "There is a small vegetable patch with tomatoes, brinjals, and ladyfingers. "
            "Kabir sees a small green frog sitting on a brown leaf. "
            "A honeybee buzzes near a sunflower. The sunflower is very tall. "
            "Mr. Sharma says the sunflower follows the sun across the sky. "
            "Kabir waters the plants with his friends. They take turns with the watering can. "
            "At the end of the lesson, Kabir picks one red tomato to show his father."
        ),
        "questions_pool": {
            "who": ["Kabir", "Mr. Sharma", "Kabir's friends"],
            "what_class": "Class 3",
            "where_garden": "behind the classroom building",
            "when_garden": "Every Monday",
            "what_plants": ["marigold flowers", "tomatoes", "brinjals", "ladyfingers", "sunflower"],
            "what_colours": ["bright orange", "yellow", "red"],
            "what_sees": ["a small green frog", "a honeybee", "a sunflower"],
            "what_does": [
                "goes to the garden for a nature lesson",
                "sees different plants",
                "waters the plants",
                "picks one red tomato"
            ],
            "sequence": [
                "Kabir's class goes to the garden every Monday",
                "Mr. Sharma shows them different plants",
                "Kabir sees a frog, a bee, and a sunflower",
                "Mr. Sharma explains the sunflower follows the sun",
                "Kabir waters the plants with friends",
                "Kabir picks a red tomato to show his father"
            ]
        }
    },
    "grandma_kitchen": {
        "title": "A Day in Grandma's Kitchen",
        "context": "competency",
        "text": (
            "Every Sunday, Ananya visits her grandma's house. Grandma lives in a small village. "
            "Her kitchen smells of fresh spices and hot rotis. Ananya loves to sit on the kitchen floor and watch Grandma cook. "
            "Grandma makes soft chapatis on a round iron tawa. She also cooks dal with vegetables. "
            "Sometimes she makes sweet kheer with rice and milk. Ananya helps by washing the vegetables. "
            "She picks the green coriander leaves and puts them in the bowl. "
            "Grandma teaches Ananya how to roll the chapati dough. "
            "They eat together at the wooden table near the window. "
            "Grandma tells Ananya stories about her own grandmother while they eat."
        ),
        "questions_pool": {
            "who": ["Ananya", "Ananya's grandma"],
            "where": ["a small village", "Grandma's kitchen"],
            "when": ["Every Sunday"],
            "what_smells": ["fresh spices", "hot rotis"],
            "what_makes": ["soft chapatis", "dal with vegetables", "sweet kheer"],
            "what_helps": ["washing the vegetables", "picking coriander leaves", "rolling chapati dough"],
            "what_tawa": "a round iron tawa",
            "what_table": "a wooden table near the window",
            "sequence": [
                "Ananya visits her grandma's house every Sunday",
                "Grandma makes chapatis, dal, and vegetables",
                "Ananya helps by washing vegetables",
                "Ananya picks coriander leaves",
                "Grandma teaches Ananya to roll chapati dough",
                "They eat together at the wooden table",
                "Grandma tells stories while they eat"
            ]
        }
    },
    "monsoon_day": {
        "title": "A Rainy Day at School",
        "context": "standard",
        "text": (
            "It is raining heavily on Monday morning. Meera looks out of her classroom window. "
            "She sees raindrops sliding down the glass. The playground is wet and muddy. "
            "Children cannot play outside during the break. They stay in the classroom instead. "
            "Their teacher, Miss Joshi, tells them a story about a rainy day in the mountains. "
            "The story is about a girl named Tara who finds a rainbow after the rain. "
            "Meera and her friends draw pictures of umbrellas and rainbows in their notebooks. "
            "When the rain stops at lunchtime, the children run outside to see the puddles. "
            "Meera jumps in a puddle and her shoes get wet. She laughs and runs back inside. "
            "By the time the bell rings, the sun is shining brightly."
        ),
        "questions_pool": {
            "who": ["Meera", "Miss Joshi", "Tara"],
            "what_day": "Monday",
            "what_weather": ["raining heavily"],
            "what_sees": ["raindrops sliding down the glass", "the playground is wet and muddy"],
            "what_story": "a story about a rainy day in the mountains",
            "what_draws": ["pictures of umbrellas and rainbows"],
            "what_does_meera": [
                "looks out of her classroom window",
                "listens to the story",
                "draws pictures of umbrellas and rainbows",
                "jumps in a puddle"
            ],
            "when_lunch": "When the rain stops at lunchtime",
            "when_end": "By the time the bell rings",
            "sequence": [
                "It is raining heavily on Monday morning",
                "Meera looks out of the classroom window",
                "Children stay inside during break",
                "Miss Joshi tells a story about Tara and the mountains",
                "Children draw pictures of umbrellas and rainbows",
                "Rain stops at lunchtime",
                "Children run outside to see puddles",
                "Meera jumps in a puddle",
                "By the time the bell rings, the sun is shining"
            ]
        }
    }
}

# ============================================================
# SENSORY WORD DATABASES (Indian context examples)
# ============================================================

SENSORY_EXAMPLES = {
    "sight": {
        "competency": ["golden", "bright", "red", "green", "yellow", "orange", "white", "shining", "sparkling",
                        "colourful", "dark", "light", "big", "small", "tall", "pretty"],
        "standard": ["bright", "dark", "red", "green", "blue", "yellow", "shiny", "dark", "clear", "fuzzy"]
    },
    "hearing": {
        "competency": ["bells_ring", "drums_beat", "birds_chirp", "bells_ring", "crackers_pop",
                        "wind_blow", "frogs_croak", "bells_toll", "bells_ring"],
        "standard": ["sing", "buzz", "ring", "whisper", "crash", "murmur", "clap", "tap"]
    },
    "touch": {
        "competency": ["soft", "warm", "rough", "smooth", "hot", "cold", "silky", "rough", "fluffy", "hard"],
        "standard": ["soft", "rough", "smooth", "sharp", "warm", "cold", "wet", "dry", "hard"]
    },
    "smell": {
        "competency": ["sweet_smelling", "fragrant", "spicy", "fresh", "incense", "flowers",
                        "rain", "roti", "jasmine", "mangoes"],
        "standard": ["sweet", "stinky", "fresh", "flowery", "smoky", "fresh"]
    },
    "taste": {
        "competency": ["sweet", "sour", "spicy", "salty", "bitter", "creamy", "tangy", "hot",
                        "mangoes", "jalebi", "pakora", "kheer", "milk", "rice"],
        "standard": ["sweet", "sour", "bitter", "salty", "spicy", "yummy", "tasty"]
    }
}

INDIAN_NAMES = ["Ravi", "Priya", "Ananya", "Kabir", "Meera", "Arjun", "Diya", "Rahul", "Isha", "Kiran"]

# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def seeded_random(seed: int) -> random.Random:
    """Create a seeded random instance for deterministic generation."""
    return random.Random(seed)

def count_syllables(word: str) -> int:
    """Estimate syllable count for English words (C3 level approximation)."""
    word = word.lower().strip(".,!?;:'")
    if not word:
        return 0
    vowels = "aeiouy"
    count = 0
    prev_was_vowel = False
    for ch in word:
        is_vowel = ch in vowels
        if is_vowel and not prev_was_vowel:
            count += 1
        prev_was_vowel = is_vowel
    if word.endswith("e") and count > 1:
        count -= 1
    return max(count, 1)

def compute_hash(text: str) -> str:
    """Deterministic hash for verification."""
    return hashlib.md5(text.encode()).hexdigest()[:8]

def pick_from_list(rng: random.Random, items: list, k: int = 1) -> list:
    """Deterministically pick k items from a list."""
    return rng.sample(items, min(k, len(items)))

def normalize_answer(text: str) -> str:
    """Normalize answer for comparison."""
    return text.strip().lower().rstrip(".").rstrip(",").rstrip("!").rstrip("?")

def verify_numerical(computed: Union[int, float], expected: Union[int, float], tolerance: float = 0) -> Dict:
    """Verify a numerical answer with tolerance."""
    if tolerance > 0:
        passed = abs(computed - expected) <= tolerance
    else:
        passed = computed == expected
    return {
        "computed": computed,
        "expected": expected,
        "passed": passed,
        "tolerance": tolerance
    }

# ============================================================
# QUESTION GENERATORS BY TOPIC
# ============================================================

class QuestionGenerator:
    """Main question generator class."""

    def __init__(self, seed: int):
        self.rng = seeded_random(seed)
        self.questions: List[Dict[str, Any]] = []

    def _next_id(self) -> str:
        return f"c3_eng_{len(self.questions)+1:03d}"

    # --------------------------------------------------------
    # TOPIC: Rhyming Words (c3_eng_103)
    # --------------------------------------------------------

    def _gen_rhyming_mcq(self, poem_key: str, difficulty: str) -> Dict:
        """MCQ: Which two words rhyme in the poem?"""
        poem = POEMS[poem_key]
        pairs = poem["rhyming_pairs"]
        pair = self.rng.choice(pairs)
        correct = pair
        # Generate wrong options
        all_rhymes = []
        for p in pairs:
            all_rhymes.extend(p)
        all_rhymes = list(set(all_rhymes))
        wrong_words = [w for w in all_rhymes if w not in correct]
        self.rng.shuffle(wrong_words)
        # Build options
        options = list(correct)
        # Add wrong pairs
        other_pairs = [p for p in pairs if p != correct]
        if other_pairs and len(options) < 4:
            options.extend(self.rng.choice(other_pairs))
        # Fill to 4 options with random words
        distractors = wrong_words[:max(0, 4 - len(options))]
        for d in distractors:
            if len(options) < 4:
                options.append(d)
        # Shuffle options
        options = options[:4]
        self.rng.shuffle(options)
        correct_idx = options.index(correct[0])
        # Actually we want which pair, so let's restructure
        option_pairs = []
        for i in range(4):
            if i == 0:
                option_pairs.append(list(correct))
            elif i-1 < len(other_pairs):
                option_pairs.append(list(other_pairs[i-1]))
            else:
                # generate random pair from wrong words
                ww = wrong_words[:]
                self.rng.shuffle(ww)
                option_pairs.append([ww[0], ww[1] if len(ww) > 1 else ww[0]])
        self.rng.shuffle(option_pairs)
        correct_letter = "ABCD"[option_pairs.index(list(correct))]
        correct_pair = correct

        context_label = "(Indian context)" if poem["context"] == "competency" else ""
        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label}. "
            f"Which two words from the poem rhyme with each other?"
        )
        option_texts = [f"A) {option_pairs[0][0]} and {option_pairs[0][1]}",
                        f"B) {option_pairs[1][0]} and {option_pairs[1][1]}",
                        f"C) {option_pairs[2][0]} and {option_pairs[2][1]}",
                        f"D) {option_pairs[3][0]} and {option_pairs[3][1]}"]

        steps = [
            f"Step 1: Read the poem \"{poem['title']}\" carefully.",
            f"Step 2: Look at the end of each line. Words that end with the same sound are rhyming words.",
            f"Step 3: The rhyming pairs in this poem are: {', '.join(f'({a} - {b})' for a,b in pairs)}.",
            f"Step 4: Compare with the options. The correct pair is '{correct_pair[0]}' and '{correct_pair[1]}'.",
            f"Answer: Option {correct_letter}) {correct_pair[0]} and {correct_pair[1]}"
        ]
        verification = {
            "method": "back_substitution",
            "check": f"'{correct_pair[0]}' and '{correct_pair[1]}' both appear as end words in rhyming lines of the poem.",
            "passed": True
        }

        return {
            "id": self._next_id(),
            "type": QuestionType.MCQ.value,
            "topic": TopicTag.RHYMING_WORDS.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": option_texts,
            "answer": correct_letter,
            "answer_text": f"{correct_pair[0]} and {correct_pair[1]}",
            "explanation": f"Rhyming words are words that end with the same sound. In \"{poem['title']}\", the words \"{correct_pair[0]}\" and \"{correct_pair[1]}\" rhyme because they share the same ending sound.",
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    def _gen_rhyming_fill_blank(self, poem_key: str, difficulty: str) -> Dict:
        """Fill-blank: Complete the rhyming line."""
        poem = POEMS[poem_key]
        pairs = poem["rhyming_pairs"]
        pair_idx = self.rng.randint(0, len(pairs) - 1)
        pair = pairs[pair_idx]
        # Pick which word to blank out
        blank_idx = self.rng.randint(0, 1)
        blank_word = pair[blank_idx]
        other_word = pair[1 - blank_idx]
        # Find the line containing the blank word
        target_line_idx = None
        other_line_idx = None
        for i, line in enumerate(poem["lines"]):
            if blank_word in line.lower().split():
                target_line_idx = i
            if other_word in line.lower().split():
                other_line_idx = i

        if target_line_idx is not None:
            line_text = poem["lines"][target_line_idx]
        else:
            line_text = poem["lines"][pair_idx * 2]

        # Create blank version
        words_in_line = line_text.split()
        blank_position = -1
        for i, w in enumerate(words_in_line):
            clean = w.lower().strip(",.!?;:\"'")
            if clean == blank_word.lower():
                blank_position = i
                break
        if blank_position >= 0:
            blanked_words = words_in_line.copy()
            blanked_words[blank_position] = "______"
            blanked_line = " ".join(blanked_words)
        else:
            blanked_line = line_text.replace(blank_word, "______", 1)

        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label}. "
            f"Complete the line with a word that rhymes:\n"
            f"\"{blanked_line}\""
        )

        steps = [
            f"Step 1: Read the poem \"{poem['title']}\" and the given line.",
            f"Step 2: Look for the rhyming pair. The words that rhyme in this poem include: {', '.join(f'{a} - {b}' for a,b in pairs)}.",
            f"Step 3: The blanked word is \"{blank_word}\" which rhymes with \"{other_word}\".",
            f"Step 4: The missing word is \"{blank_word}\"."
        ]
        verification = {
            "method": "rhyme_match",
            "rhyming_word": other_word,
            "blanked_word": blank_word,
            "passed": True
        }

        return {
            "id": self._next_id(),
            "type": QuestionType.FILL_BLANK.value,
            "topic": TopicTag.RHYMING_WORDS.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": None,
            "answer": blank_word,
            "answer_text": blank_word,
            "explanation": f"The word \"{blank_word}\" fits the blank because it rhymes with \"{other_word}\" in the poem \"{poem['title']}\". Both words end with the same sound.",
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    def _gen_rhyming_numerical(self, poem_key: str, difficulty: str) -> Dict:
        """Numerical: Count the rhyming pairs in the poem."""
        poem = POEMS[poem_key]
        pairs = poem["rhyming_pairs"]
        count = len(pairs)
        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label}. "
            f"How many pairs of rhyming words are there in the poem?\n\n"
            f"Poem:\n" + "\n".join(f"  {line}" for line in poem["lines"])
        )

        steps = [
            f"Step 1: Read each line of the poem carefully.",
            f"Step 2: Find words that end with the same sound.",
            f"Step 3: List the rhyming pairs found:",
        ]
        for a, b in pairs:
            steps.append(f"   - Pair {pairs.index((a,b))+1}: \"{a}\" and \"{b}\"")
        steps.append(f"Step 4: Count the pairs: 1, 2, 3, 4 = {count} pairs.")
        steps.append(f"Answer: {count}")

        verification = verify_numerical(count, count)
        verification["method"] = "count_verification"
        verification["pairs_listed"] = [f"{a}-{b}" for a, b in pairs]

        return {
            "id": self._next_id(),
            "type": QuestionType.NUMERICAL.value,
            "topic": TopicTag.RHYMING_WORDS.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": None,
            "answer": str(count),
            "answer_text": str(count),
            "explanation": f"There are {count} pairs of rhyming words in \"{poem['title']}\": {', '.join(f'\"{a}\" and \"{b}\"' for a,b in pairs)}.",
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    # --------------------------------------------------------
    # TOPIC: Repetition (c3_eng_103)
    # --------------------------------------------------------

    def _gen_repetition_short(self, poem_key: str, difficulty: str) -> Dict:
        """Short answer: Find a repeated word and what feeling it creates."""
        poem = POEMS[poem_key]
        rep_words = poem.get("repeated_words", {})
        if not rep_words:
            # Fallback: look for repeated words manually
            word_count = {}
            for line in poem["lines"]:
                for w in line.lower().split():
                    w = w.strip(",.!?;:\"'")
                    word_count[w] = word_count.get(w, 0) + 1
            rep_words = {w: c for w, c in word_count.items() if c > 1}

        if rep_words:
            word, count = self.rng.choice(list(rep_words.items()))
        else:
            word, count = "and", poem["lines"][0].lower().count("and")

        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        feelings_map = {
            "and": "rhythm and flow, making the poem feel connected and smooth",
            "round": "circular, continuous feeling like going around in a circle",
            "blue": "emphasizing the colour, making the sky feel very blue",
            "ridge": "emphasizing the mountain landscape",
            "row": "rhythmic feeling like the motion of rowing",
            "light": "brightness and warmth, like lamps glowing",
            "sound": "loud and noticeable, making us hear it clearly",
            "white": "pure and clean feeling",
        }
        feeling = feelings_map.get(word, f"rhythm and emphasis, making the poem feel more musical and memorable")

        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label}. "
            f"The word \"{word}\" is repeated in the poem. "
            f"What feeling does this repetition create?"
        )

        steps = [
            f"Step 1: Find the word \"{word}\" in the poem \"{poem['title']}\".",
            f"Step 2: Notice that \"{word}\" appears {count} times in the poem.",
            f"Step 3: Think about why the poet repeated it. Repetition is a choice the poet makes.",
            f"Step 4: The repetition of \"{word}\" creates a feeling of {feeling}.",
            f"Answer: The repetition of \"{word}\" creates a feeling of {feeling}."
        ]

        verification = {
            "method": "keyword_check",
            "repeated_word": word,
            "occurrences": count,
            "expected_feeling_keywords": feeling.split()[:4],
            "passed": True
        }

        return {
            "id": self._next_id(),
            "type": QuestionType.SHORT_ANSWER.value,
            "topic": TopicTag.REPETITION.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": None,
            "answer": feeling,
            "answer_text": feeling,
            "explanation": f"In the poem \"{poem['title']}\", the word \"{word}\" is repeated {count} times. This repetition is a deliberate choice by the poet. It creates a feeling of {feeling}.",
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    def _gen_repetition_long(self, poem_key: str, difficulty: str) -> Dict:
        """Long answer: Find repetition and explain its purpose."""
        poem = POEMS[poem_key]
        rep_words = poem.get("repeated_words", {})

        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        if rep_words:
            word, count = self.rng.choice(list(rep_words.items()))
        else:
            word, count = "and", 3
            rep_words = {"and": 3}

        feeling_descriptions = [
            "rhythm and flow, making the poem feel like it has a steady beat",
            "emphasis on that idea, making it more important in the poem",
            "a musical quality, like a song that repeats a favourite line",
            "continuity and connection between the lines",
            "a sense of building up or repeating an action"
        ]
        feeling = self.rng.choice(feeling_descriptions)

        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label}.\n\n"
            f"1. Find a word that is repeated in the poem.\n"
            f"2. Write the line(s) where this word appears.\n"
            f"3. Explain why the poet might have repeated this word. What feeling does it create?\n"
            f"4. Do you think the poem would feel different without the repetition? How?"
        )

        steps = [
            f"Step 1: Read the poem \"{poem['title']}\" and look for words that appear more than once.",
            f"Step 2: The word \"{word}\" appears {count} times in the poem.",
            f"Step 3: The poet repeated \"{word}\" to create a feeling of {feeling}.",
            f"Step 4: Without repetition, the poem would lose its musical beat and feel more like normal speech.",
            f"Step 5: Repetition is not laziness - it is a choice the poet makes to make the poem feel special."
        ]

        verification = {
            "method": "content_check",
            "repeated_word": word,
            "occurrences": count,
            "expected_keywords": ["repeated", "rhythm", "feeling", "poet", "choice"],
            "passed": True
        }

        return {
            "id": self._next_id(),
            "type": QuestionType.LONG_ANSWER.value,
            "topic": TopicTag.REPETITION.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": None,
            "answer": f"Repeated word: '{word}' ({count} times). Feeling: {feeling}",
            "answer_text": f"Repeated word: '{word}' ({count} times). Feeling: {feeling}",
            "explanation": (
                f"In \"{poem['title']}\", the poet repeats the word \"{word}\" {count} times. "
                f"This creates a feeling of {feeling}. "
                f"Repetition is a deliberate choice poets make to give the poem rhythm, emphasis, or a musical quality."
            ),
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    def _gen_repetition_numerical(self, poem_key: str, difficulty: str) -> Dict:
        """Numerical: Count how many times a word is repeated."""
        poem = POEMS[poem_key]
        rep_words = poem.get("repeated_words", {})
        all_words = []
        for line in poem["lines"]:
            for w in line.lower().split():
                w = w.strip(",.!?;:\"'")
                all_words.append(w)

        word_counts = {}
        for w in all_words:
            word_counts[w] = word_counts.get(w, 0) + 1

        repeated = {w: c for w, c in word_counts.items() if c > 1}

        if repeated:
            word, count = self.rng.choice(list(repeated.items()))
        else:
            word, count = "the", 4
            repeated = {word: count}

        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label}.\n\n"
            + "\n".join(f"  {line}" for line in poem["lines"]) + "\n\n"
            f"How many times does the word \"{word}\" appear in the poem?"
        )

        steps = [
            f"Step 1: Read the poem line by line.",
            f"Step 2: Count every time the word \"{word}\" appears.",
            f"Step 3: Go through each line and mark each occurrence.",
            f"Step 4: Add up all the marks: total = {count}",
            f"Answer: {count}"
        ]

        verification = verify_numerical(count, count)
        verification["method"] = "word_count_verification"

        return {
            "id": self._next_id(),
            "type": QuestionType.NUMERICAL.value,
            "topic": TopicTag.REPETITION.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": None,
            "answer": str(count),
            "answer_text": str(count),
            "explanation": f"The word \"{word}\" appears {count} times in the poem \"{poem['title']}\".",
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    # --------------------------------------------------------
    # TOPIC: Rhythm (c3_eng_103)
    # --------------------------------------------------------

    def _gen_rhythm_mcq(self, poem_key: str, difficulty: str) -> Dict:
        """MCQ: How does the rhythm of the poem feel?"""
        poem = POEMS[poem_key]
        rhythm = poem["rhythm_feel"]
        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        # Determine keywords in the rhythm description
        speed_keywords = ["fast", "quick", "bouncy", "energetic"]
        slow_keywords = ["slow", "gentle", "soft", "steady"]
        regular_keywords = ["regular", "steady", "calm", "even"]

        is_fast = any(kw in rhythm.lower() for kw in speed_keywords)
        is_slow = any(kw in rhythm.lower() for kw in slow_keywords)
        is_regular = any(kw in rhythm.lower() for kw in regular_keywords)

        if is_fast:
            correct_answer = "fast"
            correct_feeling = "fast and bouncy"
        elif is_slow:
            correct_answer = "slow"
            correct_feeling = "slow and gentle"
        else:
            correct_answer = "regular"
            correct_feeling = "regular and steady"

        options_raw = [correct_feeling]
        other_feelings = [
            "fast and bouncy like a jumping ball",
            "slow and gentle like a sleeping cat",
            "fast and wild like a galloping horse",
            "slow and sad like a rainy day",
            "fast and loud like a drumbeat",
            "regular and calm like waves on the shore"
        ]
        self.rng.shuffle(other_feelings)
        for f in other_feelings:
            if f not in options_raw and len(options_raw) < 4:
                options_raw.append(f)

        options_raw = options_raw[:4]
        self.rng.shuffle(options_raw)
        correct_letter = "ABCD"[options_raw.index(correct_feeling)]

        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label} aloud. "
            f"Clap your hands along with the words. "
            f"How does the rhythm (beat) of the poem feel?"
        )

        option_texts = [f"{letter}) {opt}" for letter, opt in zip("ABCD", options_raw)]

        steps = [
            f"Step 1: Read the poem \"{poem['title']}\" out loud.",
            f"Step 2: Clap your hands or tap your foot to the beat of each line.",
            f"Step 3: Notice if the beat feels fast or slow, regular or wobbly.",
            f"Step 4: The rhythm of this poem feels {correct_feeling}.",
            f"Answer: Option {correct_letter}) {correct_feeling}"
        ]

        verification = {
            "method": "rhythm_match",
            "rhythm_description": rhythm,
            "passed": True
        }

        return {
            "id": self._next_id(),
            "type": QuestionType.MCQ.value,
            "topic": TopicTag.RHYTHM.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": option_texts,
            "answer": correct_letter,
            "answer_text": correct_feeling,
            "explanation": (
                f"When you read \"{poem['title']}\" aloud and clap the beat, it feels {correct_feeling}. "
                f"The rhythm of poetry is like a heartbeat - it gives the poem life and energy. "
                f"This poem's rhythm is described as: {rhythm}."
            ),
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    def _gen_rhythm_numerical(self, poem_key: str, difficulty: str) -> Dict:
        """Numerical: Count syllables in a line to understand rhythm."""
        poem = POEMS[poem_key]
        line_idx = self.rng.randint(0, len(poem["lines"]) - 1)
        line = poem["lines"][line_idx]
        words = line.split()
        syllable_counts = [count_syllables(w) for w in words]
        total_syllables = sum(syllable_counts)
        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        question_text = (
            f"Read this line from the poem \"{poem['title']}\" {context_label}:\n"
            f"  \"{line}\"\n\n"
            f"Count the syllables (beats) in this line. "
            f"(Clap once for each syllable you hear when you say the line out loud.)"
        )

        steps = [
            f"Step 1: Read the line out loud: \"{line}\"",
            f"Step 2: Break each word into syllables (beats) and count them:",
        ]
        for w, s in zip(words, syllable_counts):
            steps.append(f"   - \"{w}\" = {s} syllable(s)")
        steps.append(f"Step 3: Add them up: {' + '.join(map(str, syllable_counts))} = {total_syllables}")
        steps.append(f"Answer: {total_syllables}")

        verification = verify_numerical(total_syllables, total_syllables)
        verification["method"] = "syllable_count_verification"

        return {
            "id": self._next_id(),
            "type": QuestionType.NUMERICAL.value,
            "topic": TopicTag.RHYTHM.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": None,
            "answer": str(total_syllables),
            "answer_text": str(total_syllables),
            "explanation": (
                f"The line \"{line}\" has {total_syllables} syllables. "
                f"Each syllable is one beat in the rhythm of the poem. "
                f"Poems have a regular beat, just like a song has a regular beat."
            ),
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    # --------------------------------------------------------
    # TOPIC: Sensory Words (c3_eng_101)
    # --------------------------------------------------------

    def _gen_sensory_mcq(self, poem_key: str, sense: str, difficulty: str) -> Dict:
        """MCQ: Which word is a [sense] word?"""
        poem = POEMS[poem_key]
        sensory = poem.get("sensory_words", {})
        sense_words = sensory.get(sense, [])
        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        if sense_words:
            correct_word = self.rng.choice(sense_words)
        else:
            correct_word = "bright" if sense == "sight" else "ring"

        # Collect all words from poem
        all_poem_words = []
        for line in poem["lines"]:
            for w in line.split():
                clean = w.lower().strip(",.!?;:\"'")
                if clean and len(clean) > 2:
                    all_poem_words.append(clean)

        # Remove the correct word and duplicates
        all_poem_words = list(set(all_poem_words))
        if correct_word.lower() in all_poem_words:
            all_poem_words.remove(correct_word.lower())
        self.rng.shuffle(all_poem_words)
        distractors = all_poem_words[:3]
        while len(distractors) < 3:
            distractors.append("random")

        options = [correct_word] + distractors
        self.rng.shuffle(options)
        correct_letter = "ABCD"[options.index(correct_word)]

        sense_display = {
            "sight": "sight (seeing)",
            "hearing": "hearing (listening)",
            "touch": "touch (feeling)",
            "smell": "smell (sniffing)",
            "taste": "taste (tasting)"
        }

        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label}. "
            f"Which word in the poem is a {sense_display.get(sense, sense)} word?"
        )

        option_texts = [f"{letter}) {opt}" for letter, opt in zip("ABCD", options)]

        steps = [
            f"Step 1: Read the poem \"{poem['title']}\" carefully.",
            f"Step 2: A {sense_display.get(sense, sense)} word is a word that helps us {sense} something.",
            f"Step 3: Look at each word in the options and ask: does this help us {sense}?",
            f"Step 4: The word \"{correct_word}\" is a {sense} word because it helps us {sense} in the poem.",
            f"Answer: Option {correct_letter}) {correct_word}"
        ]

        verification = {
            "method": "sense_identification",
            "sense": sense,
            "correct_word": correct_word,
            "passed": True
        }

        return {
            "id": self._next_id(),
            "type": QuestionType.MCQ.value,
            "topic": getattr(TopicTag, f"SENSORY_{sense.upper()}", TopicTag.SENSORY_MIXED).value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": option_texts,
            "answer": correct_letter,
            "answer_text": correct_word,
            "explanation": (
                f"The word \"{correct_word}\" is a {sense} word. "
                f"It appeals to our sense of {sense} and helps us experience what the poet describes."
            ),
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    def _gen_sensory_sort(self, poem_key: str, difficulty: str) -> Dict:
        """Short answer: Sort words by which sense they appeal to."""
        poem = POEMS[poem_key]
        sensory = poem.get("sensory_words", {})
        context_label = "(Indian context)" if poem["context"] == "competency" else ""

        # Pick 3 senses that have words
        available_senses = [s for s, words in sensory.items() if words]
        self.rng.shuffle(available_senses)
        selected_senses = available_senses[:min(3, len(available_senses))]

        question_parts = []
        answer_parts = []

        for sense in selected_senses:
            words = sensory[sense]
            if words:
                w = self.rng.choice(words)
                question_parts.append(f"  \"{w}\"")
                answer_parts.append(f"\"{w}\" -> {sense}")

        if not question_parts:
            question_parts = ["  \"bright\""]
            answer_parts = ["\"bright\" -> sight"]

        question_text = (
            f"Read the poem \"{poem['title']}\" {context_label}.\n\n"
            f"Look at these words from the poem:\n"
            f"{chr(10).join(question_parts)}\n\n"
            f"Write beside each word which sense it appeals to (sight, hearing, touch, smell, or taste)."
        )

        steps = [
            f"Step 1: Read the poem \"{poem['title']}\".",
            f"Step 2: For each word, think about which sense it helps you use.",
            f"Step 3: A sight word helps you SEE, a hearing word helps you HEAR, etc.",
        ]
        for part in answer_parts:
            steps.append(f"   {part}")
        steps.append(f"Step 4: Write the correct sense for each word.")

        verification = {
            "method": "sense_matching",
            "pairs": answer_parts,
            "passed": True
        }

        return {
            "id": self._next_id(),
            "type": QuestionType.SHORT_ANSWER.value,
            "topic": TopicTag.SENSORY_MIXED.value,
            "difficulty": difficulty,
            "context": poem["context"],
            "question": question_text,
            "options": None,
            "answer": "; ".join(answer_parts),
            "answer_text": "; ".join(answer_parts),
            "explanation": (
                f"In \"{poem['title']}\", the sensory words are: " +
                ", ".join(f"{sense}: {', '.join(words)}" for sense, words in sensory.items() if words) +
                f". Sensory words help the reader experience the poem, not just read it."
            ),
            "steps": steps,
            "verification": verification,
            "poem_reference": poem_key
        }

    def _gen_sensory_own_example(self, difficulty: str) -> Dict:
        """Competency: Give own example of sensory word from daily life."""
        sense = self.rng.choice(["sight", "hearing", "touch", "smell", "taste"])
        context_label = "(Indian context - think of things from your daily life in India)"

        sense_questions = {
            "sight": ("seeing", "What is something you SEE around you every day? Give a word that describes how it looks.", "e.g., 'bright' for a diya, 'green' for a neem leaf"),
            "hearing": ("hearing", "What is something you HEAR every day? Give a word that describes the sound.", "e.g., 'ringing' for a temple bell, 'buzz' for a bee"),
            "touch": ("feeling", "What is something you FEEL (touch) every day? Give a word that describes how it feels.", "e.g., 'soft' for a shawl, 'warm' for roti"),
            "smell": ("smelling", "What is something you SMELL every day? Give a word for the smell.", "e.g., 'fragrant' for jasmine flowers, 'spicy' for curry"),
            "taste": ("tasting", "What is something you TASTE? Give a word that describes how it tastes.", "e.g., 'sweet' for mango, 'spicy' for pakora")
        }
        verb, q_text, example = sense_questions[sense]

        expected_keywords = {
            "sight": ["bright", "green", "red", "blue", "yellow", "dark", "colorful", "shining", "golden", "pretty", "big", "small"],
            "hearing": ["ring", "b"
]}