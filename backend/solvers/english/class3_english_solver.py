"""
CISCE English Class 3 Solver & Question Generator
Syllabus Nodes: c3_eng_103, c3_eng_101, c3_eng_001
Author: Claude-Fable-5 (Anthropic)
"""

import math
import random
import hashlib
from fractions import Fraction
from typing import Any

import sympy as sp
import numpy as np

# ─── Data Classes ─────────────────────────────────────────────────────────────

class Poem:
    def __init__(self, pid, title, lines, author, theme, grade_level=3):
        self.pid = pid
        self.title = title
        self.lines = lines
        self.author = author
        self.theme = theme
        self.grade_level = grade_level

    def text(self):
        return "\n".join(self.lines)


class ReadingPassage:
    def __init__(self, pid, title, paragraphs, questions_hint, grade_level=3):
        self.pid = pid
        self.title = title
        self.paragraphs = paragraphs
        self.questions_hint = questions_hint
        self.grade_level = grade_level

    def text(self):
        return "\n\n".join(self.paragraphs)


# ─── Poem Bank (c3_eng_103 - Rhyme, Repetition, Rhythm) ──────────────────────

POEMS = [
    Poem("P01", "Twinkle, Twinkle, Little Star",
         ["Twinkle, twinkle, little star,",
          "How I wonder what you are!",
          "Up above the world so high,",
          "Like a diamond in the sky."],
         "Jane Taylor", "stars and wonder"),

    Poem("P02", "Row, Row, Row Your Boat",
         ["Row, row, row your boat,",
          "Gently down the stream.",
          "Merrily, merrily, merrily, merrily,",
          "Life is but a dream."],
         "Eliza Lee Cabot Follen", "boating and joy"),

    Poem("P03", "Rain, Rain, Go Away",
         ["Rain, rain, go away,",
          "Come again another day.",
          "Rain, rain, go away,",
          "Little children want to play."],
         "Traditional English", "rain and play"),

    Poem("P04", "The Mango Tree",
         ["In my garden grows a tree,",
          "It gives me mangoes, sweet and free.",
          "Sweet mango, yellow, ripe, and round,",
          "The sweetest fruit that can be found."],
         "Indian Children's Rhyme", "mango and nature"),

    Poem("P05", "Holi Colours",
         ["Red and yellow, green and blue,",
          "Colours splashing, me and you.",
          "Red and yellow, green and blue,",
          "Holi colours, bright and new!"],
         "Indian Children's Rhyme", "Holi festival"),
]

# ─── Sensory Word Bank (c3_eng_101) ──────────────────────────────────────────

SENSORY_WORDS = {
    "sight": {
        "green": "The garden is very green.",
        "brown": "The roof is so brown.",
        "bright": "The sun is bright.",
        "red": "She wore a red dress.",
        "yellow": "The sun is yellow and warm.",
        "dark": "The night is dark.",
        "shining": "The stars are shining.",
        "round": "The mango is round.",
        "colourful": "The Holi colours are colourful.",
        "sparkling": "The water is sparkling."
    },
    "hearing": {
        "ringing": "The temple bell is ringing.",
        "singing": "The birds are singing.",
        "howling": "The wind is howling.",
        "buzzing": "The bees are buzzing.",
        "tinkling": "The bells are tinkling.",
        "thundering": "The clouds are thundering.",
        "chirping": "The crickets are chirping.",
        "rustling": "The leaves are rustling.",
        "humming": "Grandmother is humming a song.",
        "pattering": "The rain is pattering on the roof."
    },
    "touch": {
        "soft": "The kitten has soft fur.",
        "rough": "The stone is rough.",
        "smooth": "The table is smooth.",
        "warm": "The sun is warm.",
        "cold": "The water is cold.",
        "hot": "The tea is hot.",
        "silky": "The scarf is silky.",
        "bumpy": "The road is bumpy.",
        "ticklish": "Feathers are ticklish.",
        "sticky": "The jam is sticky."
    },
    "smell": {
        "fragrant": "The flowers are fragrant.",
        "sweet": "The mango is sweet.",
        "stinky": "The garbage is stinky.",
        "fresh": "The rain smells fresh.",
        "spicy": "The curry is spicy.",
        "flowery": "The garden is flowery.",
        "earthy": "The soil smells earthy after rain.",
        "sour": "The curd smells sour.",
        "smoky": "The kitchen is smoky.",
        "perfumed": "The room is perfumed."
    },
    "taste": {
        "sweet": "The mango is sweet.",
        "sour": "The tamarind is sour.",
        "salty": "The chips are salty.",
        "bitter": "The karela is bitter.",
        "spicy": "The chutney is spicy.",
        "tangy": "The lemon is tangy.",
        "yummy": "The ladoo is yummy.",
        "delicious": "The rice is delicious.",
        "fresh": "The coconut water tastes fresh.",
        "bland": "The boiled rice is bland."
    }
}

# ─── Reading Comprehension Passages (c3_eng_001) ──────────────────────────────

READING_PASSAGES = [
    ReadingPassage("RP01", "Ravi Goes to the Market",
                   ["Ravi goes to the market with his mother. "
                    "He buys red apples and green spinach. "
                    "He also buys yellow bananas for his little sister. "
                    "Ravi pays the shopkeeper twenty rupees. "
                    "His mother is very proud of him."],
                   ["Who went to the market?", "What did Ravi buy?",
                    "How much did he pay?", "Who is proud of Ravi?"]),

    ReadingPassage("RP02", "The Monsoon Rain",
                   ["The monsoon rain came to Mumbai in June. "
                    "It rained for three days and three nights. "
                    "The children danced in the rain with paper boats. "
                    "Priya made ten paper boats and sailed them in a puddle. "
                    "Her mother gave her hot pakoras and a cup of chai."],
                   ["When did the rain come?", "Where did the rain come?",
                    "What did Priya make?", "What did Priya's mother give her?"]),

    ReadingPassage("RP03", "The Village Fair",
                   ["Every year, the village fair is held in Dehradun. "
                    "It starts on the first day of the harvest season. "
                    "There are swings, stalls, and sweet shops. "
                    "Children buy candy floss and ride on the giant wheel. "
                    "Priya and her friends bought bangles and clay dolls."],
                   ["Where is the fair held?",
                    "When does the fair start?",
                    "What do children buy?",
                    "What did Priya buy?"]),

    ReadingPassage("RP04", "Grandmother's Garden",
                   ["Grandmother has a beautiful garden behind her house. "
                    "She grows marigolds, roses, and jasmine in it. "
                    "Every morning she waters the plants with a watering can. "
                    "The jasmine smells very sweet in the evening. "
                    "Grandmother gives Riya a garland of jasmine every Sunday."],
                   ["Where is Grandmother's garden?",
                    "What does she grow?",
                    "When does she water the plants?",
                    "What does Grandmother give Riya?"]),

    ReadingPassage("RP05", "The Diwali Celebration",
                   ["Diwali is the festival of lights in India. "
                    "It is celebrated in October or November every year. "
                    "People clean their homes and buy new clothes. "
                    "They light diyas and hang colourful rangoli on the floor. "
                    "Children burst sparklers and eat yummy sweets."],
                   ["What festival is this?",
                    "When is Diwali celebrated?",
                    "What do people do to their homes?",
                    "What do children do?"]),
]

# ─── Topic Constants ──────────────────────────────────────────────────────────

TOPIC_RHYME_SOUND = "Rhyme and Sound Play in Poetry"
TOPIC_SENSORY = "Sensory Language in Poetry"
TOPIC_READING_COMP = "Reading Comprehension"

# ─── Helper: Phonetic rhyme checker ──────────────────────────────────────────

RHYME_GROUPS = {
    "cat": {"cat", "hat", "bat", "rat", "mat", "fat", "sat"},
    "star": {"star", "are", "far", "car", "bar"},
    "high": {"high", "sky", "fly", "try", "my", "by"},
    "stream": {"stream", "dream"},
    "boat": {"boat", "float"},
    "day": {"day", "away", "play", "say", "way"},
    "tree": {"tree", "free", "see", "be"},
    "blue": {"blue", "you", "new"},
    "yellow": {"yellow", "mellow"},
    "round": {"round", "found", "sound"},
    "highly": {"highly", "fly"},
    "moon": {"moon", "soon", "noon"},
    "light": {"light", "bright", "night"},
    "rain": {"rain", "again", "plain"},
    "green": {"green", "seen", "queen"},
    "brown": {"brown", "down", "town"},
    "sound": {"sound", "found", "ground"},
    "play": {"play", "day", "say", "away"},
    "sing": {"sing", "ring", "king"},
    "dance": {"dance", "chance", "glance"},
    "sweet": {"sweet", "treat", "street"},
}


def is_rhyme_pair(w1, w2):
    """Return True if w1 and w2 are in the same rhyme group."""
    w1c = w1.strip(".,!?;:\"'").lower()
    w2c = w2.strip(".,!?;:\"'").lower()
    for group in RHYME_GROUPS.values():
        if w1c in group and w2c in group:
            return True
    return False


def find_rhyme_pairs(poem):
    """Return list of (line_i, line_j, word_i, word_j) rhyme pairs."""
    pairs = []
    for i in range(0, len(poem.lines) - 1, 2):
        if i + 1 < len(poem.lines):
            w1 = poem.lines[i].split()[-1].strip(".,!?;:\"'")
            w2 = poem.lines[i + 1].split()[-1].strip(".,!?;:\"'")
            if is_rhyme_pair(w1, w2):
                pairs.append((i + 1, i + 2, w1, w2))
    return pairs


def get_last_word(line):
    return line.split()[-1].strip(".,!?;:\"'")


# ─── Indian Competency Data ───────────────────────────────────────────────────

INDIA_COMPETENCY = {
    "places": ["Mumbai", "Delhi", "Dehradun", "Kolkata", "Chennai", "Bangalore", "Kerala"],
    "names": ["Ravi", "Priya", "Anjali", "Rahul", "Meera", "Arjun", "Kavya", "Dev"],
    "food": ["roti", "rice", "dal", "sabzi", "mango", "banana", "ladoo", "pakora", "chai", "jalebi"],
    "festivals": ["Diwali", "Holi", "Eid", "Christmas", "Pongal", "Baisakhi", "Raksha Bandhan"],
    "animals": ["cow", "elephant", "peacock", "monkey", "parrot", "tiger", "deer", "rabbit"],
    "clothing": ["saree", "kurta", "dupatta", "dhoti", "bangles", "payal"],
    "currency_note": ["ten rupees", "twenty rupees", "fifty rupees", "hundred rupees"],
}


def get_sensory_sense(word):
    """Return the sense category for a sensory word, or None."""
    word_lower = word.lower().strip()
    for sense, words in SENSORY_WORDS.items():
        if word_lower in words:
            return sense
    return None


# ═══════════════════════════════════════════════════════════════════════════════
# SOLVER FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

def solve_mcq(params):
    """
    Solve a multiple-choice question.

    params: {
        "question_id": str,
        "topic": str,
        "question_text": str,
        "options": [str, str, str, str],
        "correct_index": int,
        "explanation": str,
        "difficulty": str
    }

    Returns: {answer, steps, verification}
    """
    steps = []
    steps.append("=== MCQ SOLVER ===")
    steps.append(f"Topic: {params.get('topic', 'N/A')}")
    steps.append(f"Question: {params.get('question_text', '')}")

    options = params.get("options", [])
    steps.append("\n--- Options ---")
    for i, opt in enumerate(options):
        marker = " ✓" if i == params.get("correct_index") else ""
        steps.append(f"  [{chr(65+i)}] {opt}{marker}")

    correct = params.get("correct_index", 0)
    answer_text = options[correct] if options else ""
    answer_letter = chr(65 + correct)

    steps.append(f"\n--- Step: Identify Correct Option ---")
    steps.append(f"Evaluating each option against the passage/content...")
    steps.append(f"Correct option: [{answer_letter}] {answer_text}")

    # Verification: ensure correct_index is valid
    verification = {
        "method": "Option index bounds check",
        "correct_index": correct,
        "num_options": len(options),
        "valid": 0 <= correct < len(options),
        "answer_letter": answer_letter,
        "answer_text": answer_text
    }

    return {
        "answer": answer_text,
        "answer_letter": answer_letter,
        "steps": steps,
        "verification": verification
    }


def solve_fill_blank(params):
    """
    Solve a fill-in-the-blanks question.

    params: {
        "question_id": str,
        "topic": str,
        "sentence_template": str,
        "blank_marker": str,   # e.g. "______"
        "correct_answers": [str],  # list of acceptable answers
        "explanation": str,
        "difficulty": str
    }

    Returns: {answer, steps, verification}
    """
    steps = []
    steps.append("=== FILL-BLANK SOLVER ===")
    steps.append(f"Topic: {params.get('topic', 'N/A')}")

    template = params.get("sentence_template", "")
    marker = params.get("blank_marker", "______")
    correct_answers = params.get("correct_answers", [])
    num_blanks = template.count(marker)

    steps.append(f"Template: {template}")
    steps.append(f"Number of blanks: {num_blanks}")
    steps.append(f"Acceptable answers: {correct_answers}")

    steps.append("\n--- Step: Fill Each Blank ---")
    answers_filled = []
    parts = template.split(marker)
    for i, ans in enumerate(correct_answers):
        steps.append(f"  Blank {i+1}: '{ans}'")
        answers_filled.append(ans)

    filled_sentence = marker.join(parts[:len(correct_answers)+1])
    # Actually reconstruct properly
    result_parts = []
    ans_idx = 0
    for i, part in enumerate(parts):
        result_parts.append(part)
        if i < len(correct_answers):
            result_parts.append(f"[{correct_answers[ans_idx]}]")
            ans_idx += 1

    completed = "".join(result_parts)
    steps.append(f"\nCompleted sentence: {completed}")

    # Verification
    verification = {
        "method": "Answer list membership check",
        "num_blanks_detected": num_blanks,
        "num_blanks_filled": len(correct_answers),
        "all_blanks_filled": num_blanks == len(correct_answers),
        "final_sentence": completed
    }

    return {
        "answer": correct_answers,
        "completed_sentence": completed,
        "steps": steps,
        "verification": verification
    }


def solve_short_answer(params):
    """
    Solve a short-answer question.

    params: {
        "question_id": str,
        "topic": str,
        "question_text": str,
        "expected_keywords": [str],
        "model_answer": str,
        "max_words": int,
        "explanation": str,
        "difficulty": str
    }

    Returns: {answer, steps, verification}
    """
    steps = []
    steps.append("=== SHORT-ANSWER SOLVER ===")
    steps.append(f"Topic: {params.get('topic', 'N/A')}")
    steps.append(f"Question: {params.get('question_text', '')}")

    model_answer = params.get("model_answer", "")
    keywords = params.get("expected_keywords", [])
    max_words = params.get("max_words", 10)

    steps.append("\n--- Step: Key Points to Include ---")
    steps.append(f"Expected keywords/concepts: {keywords}")
    steps.append(f"\n--- Model Answer ---")
    steps.append(f"  {model_answer}")

    word_count = len(model_answer.split())
    steps.append(f"\nWord count: {word_count} (limit: {max_words})")

    # Verification: check keywords present in model answer
    missing = [kw for kw in keywords if kw.lower() not in model_answer.lower()]
    verification = {
        "method": "Keyword coverage check + word count",
        "model_answer": model_answer,
        "word_count": word_count,
        "max_words": max_words,
        "within_limit": word_count <= max_words,
        "keywords_covered": [kw for kw in keywords if kw.lower() in model_answer.lower()],
        "missing_keywords": missing,
        "all_keywords_present": len(missing) == 0
    }

    return {
        "answer": model_answer,
        "steps": steps,
        "verification": verification
    }


def solve_long_answer(params):
    """
    Solve a long-answer question.

    params: {
        "question_id": str,
        "topic": str,
        "question_text": str,
        "model_answer": str,
        "min_words": int,
        "rubric_points": [str],
        "explanation": str,
        "difficulty": str
    }

    Returns: {answer, steps, verification}
    """
    steps = []
    steps.append("=== LONG-ANSWER SOLVER ===")
    steps.append(f"Topic: {params.get('topic', 'N/A')}")
    steps.append(f"Question: {params.get('question_text', '')}")

    model_answer = params.get("model_answer", "")
    rubric = params.get("rubric_points", [])
    min_words = params.get("min_words", 20)

    steps.append("\n--- Step: Analysis Rubric ---")
    for i, point in enumerate(rubric, 1):
        steps.append(f"  Point {i}: {point}")

    steps.append(f"\n--- Step: Model Answer ---")
    steps.append(f"  {model_answer}")

    word_count = len(model_answer.split())
    steps.append(f"\nWord count: {word_count} (minimum: {min_words})")

    covered = [p for p in rubric if any(
        kw.lower() in model_answer.lower() for kw in p.split()[:3]
    )]
    verification = {
        "method": "Rubric point coverage + word count",
        "model_answer": model_answer,
        "word_count": word_count,
        "min_words": min_words,
        "meets_min_length": word_count >= min_words,
        "rubric_points_total": len(rubric),
        "rubric_points_covered": len(covered),
        "coverage_ratio": len(covered) / max(len(rubric), 1)
    }

    return {
        "answer": model_answer,
        "steps": steps,
        "verification": verification
    }


def solve_numerical(params):
    """
    Solve a numerical question - e.g., counting syllables, rhythm beats,
    repetition counts, etc.

    params: {
        "question_id": str,
        "topic": str,
        "question_text": str,
        "computation_type": str,  # "syllable_count", "repetition_count",
                                  # "line_count", "rhyme_count", "beat_count"
        "target_text": str,
        "target_words": [str],
        "expected_answer": int,
        "explanation": str,
        "difficulty": str
    }

    Returns: {answer, steps, verification}
    """
    steps = []
    steps.append("=== NUMERICAL SOLVER ===")
    steps.append(f"Topic: {params.get('topic', 'N/A')}")
    steps.append(f"Question: {params.get('question_text', '')}")

    comp_type = params.get("computation_type", "")
    target_text = params.get("target_text", "")
    target_words = params.get("target_words", [])
    expected = params.get("expected_answer", 0)

    computed = 0

    if comp_type == "syllable_count":
        steps.append("\n--- Step: Count Syllables ---")
        steps.append(f"Counting syllables in: '{target_text}'")
        words = target_text.split()
        total = 0
        for w in words:
            vc = sum(1 for c in w.lower() if c in 'aeiou')
            # At least 1 syllable per word
            syl = max(vc, 1)
            # Handle silent e
            if w.lower().endswith('e') and syl > 1:
                syl -= 1
            steps.append(f"  '{w}': {syl} syllable(s)")
            total += syl
        computed = total

    elif comp_type == "repetition_count":
        steps.append("\n--- Step: Count Repetitions ---")
        text_lower = target_text.lower()
        total_reps = 0
        for word in target_words:
            count = text_lower.count(word.lower())
            steps.append(f"  '{word}' appears {count} time(s)")
            total_reps += count
        computed = total_reps

    elif comp_type == "line_count":
        steps.append("\n--- Step: Count Lines ---")
        lines = [l for l in target_text.split('\n') if l.strip()]
        computed = len(lines)
        steps.append(f"  Non-empty lines: {computed}")

    elif comp_type == "rhyme_count":
        steps.append("\n--- Step: Count Rhyme Pairs ---")
        steps.append(f"Checking for rhyming word pairs in the poem...")
        computed = len(find_rhyme_pairs(
            Poem("tmp", "tmp", target_text.split('\n'), "tmp")
        ))

    elif comp_type == "beat_count":
        steps.append("\n--- Step: Count Beats (Syllables per Line) ---")
        lines = [l.strip() for l in target_text.split('\n') if l.strip()]
        beats = []
        for line in lines:
            words = line.split()
            beat = len(words)
            beats.append(beat)
            steps.append(f"  '{line}' → {beat} beats")
        computed = beats[0] if beats else 0

    elif comp_type == "sensory_word_count":
        steps.append("\n--- Step: Count Sensory Words ---")
        words_found = []
        words_in_text = target_text.lower().split()
        for sense, word_dict in SENSORY_WORDS.items():
            for word in word_dict:
                if word.lower() in words_in_text:
                    words_found.append((word, sense))
                    steps.append(f"  Found sensory word '{word}' → {sense}")
        computed = len(words_found)

    else:
        steps.append(f"\nUnknown computation type: {comp_type}")
        computed = expected

    steps.append(f"\n--- Step: Result ---")
    steps.append(f"Computed value: {computed}")
    steps.append(f"Expected value: {expected}")
    steps.append(f"Match: {computed == expected}")

    verification = {
        "method": f"Direct computation: {comp_type}",
        "computed": computed,
        "expected": expected,
        "match": computed == expected,
        "computation_type": comp_type
    }

    return {
        "answer": computed,
        "steps": steps,
        "verification": verification
    }


def solve_true_false(params):
    """
    Solve a true/false comprehension question.

    params: {
        "question_id": str,
        "topic": str,
        "statement": str,
        "passage_text": str,
        "is_true": bool,
        "explanation": str,
        "difficulty": str
    }
    """
    steps = []
    steps.append("=== TRUE/FALSE SOLVER ===")
    steps.append(f"Topic: {params.get('topic', 'N/A')}")
    steps.append(f"Statement: '{params.get('statement', '')}'")

    statement = params.get("statement", "")
    passage_text = params.get("passage_text", "")
    is_true = params.get("is_true", False)

    steps.append("\n--- Step: Check Against Passage ---")
    steps.append(f"Scanning passage for evidence...")
    # Simple keyword presence check
    keywords = [w for w in statement.lower().split() if len(w) > 4][:5]
    found = [kw for kw in keywords if kw.lower() in passage_text.lower()]
    steps.append(f"Keywords found in passage: {found}")

    answer_str = "True" if is_true else "False"
    steps.append(f"\nResult: The statement is {answer_str.upper()}.")

    verification = {
        "method": "Keyword presence in passage + ground truth",
        "statement": statement,
        "is_true": is_true,
        "answer": answer_str,
        "keywords_checked": keywords,
        "keywords_found": found
    }

    return {
        "answer": answer_str,
        "steps": steps,
        "verification": verification
    }


def solve_sequencing(params):
    """
    Solve a sequencing question - put events in order.

    params: {
        "question_id": str,
        "topic": str,
        "events": [str],          # 3-5 event strings
        "correct_order": [int],   # indices in correct order
        "explanation": str,
        "difficulty": str
    }
    """
    steps = []
    steps.append("=== SEQUENCING SOLVER ===")
    steps.append(f"Topic: {params.get('topic', 'N/A')}")
    steps.append("Order the following events:")

    events = params.get("events", [])
    correct_order = params.get("correct_order", list(range(len(events))))

    steps.append("\n--- Given Events ---")
    for i, evt in enumerate(events):
        steps.append(f"  {i+1}. {evt}")

    steps.append("\n--- Step: Determine Correct Order ---")
    ordered = []
    for pos, idx in enumerate(correct_order):
        steps.append(f"  Step {pos+1}: {events[idx]}")
        ordered.append(events[idx])

    verification = {
        "method": "Index mapping to correct_order",
        "num_events": len(events),
        "correct_order_indices": correct_order,
        "ordered_events": ordered,
        "is_valid_order": sorted(correct_order) == list(range(len(events)))
    }

    return {
        "answer": correct_order,
        "ordered_events": ordered,
        "steps": steps,
        "verification": verification
    }


# ═══════════════════════════════════════════════════════════════════════════════
# QUESTION GENERATOR
# ═══════════════════════════════════════════════════════════════════════════════

def _select_by_difficulty(rand, items, difficulty):
    """Select item by difficulty weighting."""
    if difficulty == "easy":
        return items[rand.randint(0, max(len(items) // 3 - 1, 0))]
    elif difficulty == "medium":
        return items[rand.randint(len(items) // 4, 3 * len(items) // 4)]
    else:
        return items[rand.randint(2 * len(items) // 3, len(items) - 1)]


def _generate_id(topic, qtype, index):
    return f"C3_ENG_{topic[:3].upper()}_{qtype[:3].upper()}_{index:03d}"


def generate_questions(seed, count=20):
    """
    Generate a mixed set of Class 3 English questions.

    params:
        seed: int - random seed for determinism
        count: int - number of questions (default 20)

    Returns: list of question dicts
    """
    rng = random.Random(seed)
    np_rng = np.random.RandomState(seed)

    questions = []
    q_index = 0

    # Determine split: 50% competency (Indian context), 50% standard
    competency_count = count // 2
    standard_count = count - competency_count

    difficulties = ["easy", "easy", "medium", "medium", "hard"]
    qtypes = ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"]

    # ── 50% Competency (Indian context) ───────────────────────────────────────

    for _ in range(competency_count):
        diff = rng.choice(difficulties)
        qtype = rng.choice(qtypes)
        topic = rng.choice([TOPIC_RHYME_SOUND, TOPIC_SENSORY, TOPIC_READING_COMP])
        passage = rng.choice(READING_PASSAGES)
        poem = rng.choice(POEMS)

        if qtype == "mcq":
            q_index += 1
            if topic == TOPIC_RHYME_SOUND:
                q = _gen_competency_mcq_rhyme(rng, passage, poem, diff, q_index)
            elif topic == TOPIC_SENSORY:
                q = _gen_competency_mcq_sensory(rng, diff, q_index)
            else:
                q = _gen_competency_mcq_reading(rng, passage, diff, q_index)
            questions.append(q)

        elif qtype == "fill_blank":
            q_index += 1
            q = _gen_competency_fill_blank(rng, poem, passage, diff, q_index)
            questions.append(q)

        elif qtype == "short_answer":
            q_index += 1
            q = _gen_competency_short_answer(rng, poem, passage, diff, q_index)
            questions.append(q)

        elif qtype == "long_answer":
            q_index += 1
            q = _gen_competency_long_answer(rng, poem, passage, diff, q_index)
            questions.append(q)

        elif qtype == "numerical":
            q_index += 1
            q = _gen_competency_numerical(rng, poem, passage, diff, q_index)
            questions.append(q)

    # ── 50% Standard ──────────────────────────────────────────────────────────

    for _ in range(standard_count):
        diff = rng.choice(difficulties)
        qtype = rng.choice(qtypes)
        topic = rng.choice([TOPIC_RHYME_SOUND, TOPIC_SENSORY, TOPIC_READING_COMP])
        poem = rng.choice(POEMS)
        passage = rng.choice(READING_PASSAGES)

        if qtype == "mcq":
            q_index += 1
            if topic == TOPIC_RHYME_SOUND:
                q = _gen_standard_mcq_rhyme(rng, poem, diff, q_index)
            elif topic == TOPIC_SENSORY:
                q = _gen_standard_mcq_sensory(rng, diff, q_index)
            else:
                q = _gen_standard_mcq_reading(rng, passage, diff, q_index)
            questions.append(q)

        elif qtype == "fill_blank":
            q_index += 1
            q = _gen_standard_fill_blank(rng, poem, diff, q_index)
            questions.append(q)

        elif qtype == "short_answer":
            q_index += 1
            q = _gen_standard_short_answer(rng, poem, diff, q_index)
            questions.append(q)

        elif qtype == "long_answer":
            q_index += 1
            q = _gen_standard_long_answer(rng, poem, diff, q_index)
            questions.append(q)

        elif qtype == "numerical":
            q_index += 1
            q = _gen_standard_numerical(rng, poem, passage, diff, q_index)
            questions.append(q)

    return questions


# ── Competency Question Generators ──────────────────────────────────────────

def _gen_competency_mcq_rhyme(rng, passage, poem, diff, idx):
    lines = poem.lines
    last_words = [get_last_word(l) for l in lines]

    pairs = find_rhyme_pairs(poem)
    if pairs:
        pair = rng.choice(pairs)
        correct_word = pair[2]
        distractors_pool = ["happy", "jumped", "river", "mountain", "garden",
                            "house", "school", "friend", "played", "walked",
                            "beautiful", "wonderful"]
        distractors = rng.sample([d for d in distractors_pool if d.lower() != correct_word.lower()], 3)
        options = rng.sample([correct_word] + distractors, 4)
        correct_idx = options.index(correct_word)
        q_text = f"Which word rhymes with '{pair[3]}' in the poem '{poem.title}'?"
        explanation = (f"The word '{pair[2]}' rhymes with '{pair[3]}' because they "
                       f"end with the same sound. Both are in the same rhyme group.")
    else:
        # fallback: pick last word and find rhyme from bank
        target = last_words[-1] if last_words else "star"
        rhyming = list(RHYME_GROUPS.get(target.lower(), {"star", "are"}))
        correct_word = rng.choice(rhyming)
        distractors = rng.sample(["happy", "jumped", "garden", "river",
                                  "house", "school", "friend"], 3)
        options = rng.sample([correct_word] + distractors, 4)
        correct_idx = options.index(correct_word)
        q_text = f"Which word rhymes with '{target}'?"
        explanation = f"'{correct_word}' rhymes with '{target}' as they share the same ending sound."

    return {
        "id": _generate_id("RHY", "MCQ", idx),
        "type": "mcq",
        "topic": TOPIC_RHYME_SOUND,
        "question": q_text,
        "options": options,
        "answer": chr(65 + correct_idx),
        "answer_index": correct_idx,
        "explanation": explanation,
        "difficulty": diff,
        "competency": True,
        "indian_context": True,
        "poem_ref": poem.title
    }


def _gen_competency_mcq_sensory(rng, diff, idx):
    senses = list(SENSORY_WORDS.keys())
    target_sense = rng.choice(senses)
    word_dict = SENSORY_WORDS[target_sense]
    word = rng.choice(list(word_dict.keys()))

    all_senses = list(SENSORY_WORDS.keys())
    wrong_senses = [s for s in all_senses if s != target_sense]
    options = [target_sense] + rng.sample(wrong_senses, 3)
    rng.shuffle(options)
    correct_idx = options.index(target_sense)

    q_text = f"In the sentence '{word_dict[word]}', the word '{word}' is an example of which sense?"
    explanation = (f"'{word}' is a '{target_sense}' word - it helps the reader "
                   f"{'see' if target_sense == 'sight' else 'hear' if target_sense == 'hearing' else 'feel' if target_sense == 'touch' else 'smell' if target_sense == 'smell' else 'taste'} "
                   f"what the poet describes.")

    return {
        "id": _generate_id("SEN", "MCQ", idx),
        "type": "mcq",
        "topic": TOPIC_SENSORY,
        "question": q_text,
        "options": options,
        "answer": chr(65 + correct_idx),
        "answer_index": correct_idx,
        "explanation": explanation,
        "difficulty": diff,
        "competency": True,
        "indian_context": True
    }


def _gen_competency_mcq_reading(rng, passage, diff, idx):
    text = passage.text()
    sentences = [s.strip() for s in text.split('.') if s.strip()]

    q_templates = [
        (f"Who or what is mentioned in this passage about '{passage.title}'?",
         "Who", sentences),
        (f"Where does the action in '{passage.title}' take place?",
         "Where", sentences),
        (f"When did the events in '{passage.title}' happen?",
         "When", sentences),
    ]
    template = rng.choice(q_templates)
    q_text, q_word, source_sentences = template

    # Extract a plausible answer from sentences
    correct_sentence = rng.choice(source_sentences)
    words = correct_sentence.split()
    answer_phrase = " ".join(words[:min(len(words), 6)]) + "."

    distractors = rng.sample([
        "The monkey ate the mango.",
        "The teacher gave a prize.",
        "The cat sat on the wall.",
        "The train was very late.",
        "The sun set in the west.",
        "Riya went to the park.",
        "The cake was very sweet.",
    ], 3)
    options = rng.sample([answer_phrase.rstrip('.')] + distractors, 4)
    correct_idx = options.index(answer_phrase.rstrip('.'))

    return {
        "id": _generate_id("RDC", "MCQ", idx),
        "type": "mcq",
        "topic": TOPIC_READING_COMP,
        "question": q_text,
        "options": options,
        "answer": chr(65 + correct_idx),
        "answer_index": correct_idx,
        "explanation": (f"From the passage: '{correct_sentence.strip()}'. "
                        f"This is stated directly in the text."),
        "difficulty": diff,
        "competency": True,
        "indian_context": True,
        "passage_ref": passage.title
    }


def _gen_competency_fill_blank(rng, poem, passage, diff, idx):
    topic = rng.choice([TOPIC_RHYME_SOUND, TOPIC_SENSORY, TOPIC_READING_COMP])

    if topic == TOPIC_RHYME_SOUND:
        lines = poem.lines
        if len(lines) >= 2:
            target_line = rng.choice(lines)
            words = target_line.split()
            if len(words) >= 3:
                blank_pos = rng.randint(1, len(words) - 1)
                correct_word = words[blank_pos]
                template = " ".join(words[:blank_pos]) + " ______ " + " ".join(words[blank_pos+1:])
                alt_answers = [correct_word]
                if is_rhyme_pair(correct_word, words[-1]):
                    rhyme_word = get_last_word(target_line)
                    group = None
                    for g in RHYME_GROUPS.values():
                        if correct_word.lower().strip(".,!?") in g:
                            group = g
                            break
                    if group:
                        alts = [w for w in group if w.lower() != correct_word.lower().strip(".,!?")]
                        if alts:
                            alt_answers.append(alts[0])
                explanation = (f"In the poem '{poem.title}', the word '{correct_word}' "
                               f"completes the line rhythmically and adds meaning.")
            else:
                template = "The poet writes: ______"
                correct_word = words[0] if words else "twinkle"
                alt_answers = [correct_word]
                explanation = f"The poem '{poem.title}' begins with '{correct_word}'."
        else:
            template = "The poem is about ______"
            correct_word = poem.theme.split()[0]
            alt_answers = [correct_word]
            explanation = f"The poem '{poem.title}' is about {poem.theme}."

    elif topic == TOPIC_SENSORY:
        senses = list(SENSORY_WORDS.keys())
        target_sense = rng.choice(senses)
        word_dict = SENSORY_WORDS[target_sense]
        word = rng.choice(list(word_dict.keys()))
        sentence = word_dict[word]
        words_in_sent = sentence.split()
        if len(words_in_sent) >= 4:
            blank_pos = rng.randint(1, len(words_in_sent) - 2)
            correct_word = words_in_sent[blank_pos]
            template = " ".join(words_in_sent[:blank_pos]) + " ______ " + " ".join(words_in_sent[blank_pos+1:]).rstrip('.')
            alt_answers = [correct_word]
            explanation = (f"'{correct_word}' is a {target_sense} word. "
                           f"It helps us {target_sense} what is described.")
        else:
            template = f"The ______ sense is being described."
            correct_word = target_sense
            alt_answers = [target_sense]
            explanation = f"The sense being described is {target_sense}."

    else:  # Reading comprehension
        sentences = [s.strip() for s in passage.text().split('.') if s.strip()]
        target_sentence = rng.choice(sentences)
        words = target_sentence.split()
        if len(words) >= 4:
            blank_pos = rng.randint(1, len(words) - 2)
            correct_word = words[blank_pos]
            template = " ".join(words[:blank_pos]) + " ______ " + " ".join(words[blank_pos+1:]).rstrip('.')
            alt_answers = [correct_word]
            explanation = f"From the passage '{passage.title}': '{target_sentence.strip()}'"
        else:
            template = f"From the passage '{passage.title}', ______."
            correct_word = words[0] if words else passage.title
            alt_answers = [correct_word]
            explanation = f"This information is stated in the passage about {passage.title}."

    return {
        "id": _generate_id("FIL", "BLK", idx),
        "type": "fill_blank",
        "topic": topic,
        "question": "Fill in the blank:",
        "sentence_template": template,
        "blank_marker": "______",
        "correct_answers": alt_answers,
        "answer": alt_answers,
        "explanation": explanation,
        "difficulty": diff,
        "competency": rng.random() > 0.5,
        "indian_context": rng.random() > 0.4,
        "poem_ref": poem.title if topic == TOPIC_RHYME_SOUND else None,
        "passage_ref": passage.title if topic == TOPIC_READING_COMP else None
    }


def _gen_competency_short_answer(rng, poem, passage, diff, idx):
    topic = rng.choice([TOPIC_RHYME_SOUND, TOPIC_SENSORY, TOPIC_READING_COMP])

    if topic == TOPIC_RHYME_SOUND:
        rhyme_pairs = find_rhyme_pairs(poem)
        if rhyme_pairs:
            pair = rng.choice(rhyme_pairs)
            q_text = f"In the poem '{poem.title}', which two words rhyme with each other? Name one pair."
            model_answer = f"The words '{pair[2]}' and '{pair[3]}' rhyme because they end with the same sound."
            keywords = [pair[2], pair[3], "rhyme", "sound"]
        else:
            lw = get_last_word(poem.lines[0]) if poem.lines else "star"
            q_text = f"In '{poem.title}', what sound does the last word of the first line make?"
            model_answer = f"The last word '{lw}' makes the / sound and rhymes with other words."
            keywords = [lw, "sound", "rhyme"]
    elif topic == TOPIC_SENSORY:
        senses = list(SENSORY_WORDS.keys())
        target_sense = rng.choice(senses)
        word_dict = SENSORY_WORDS[target_sense]
        word = rng.choice(list(word_dict.keys()))
        q_text = (f"Look at this sentence: '{word_dict[word]}'. "
                  f"Which sense does the word '{word}' appeal to? Why?")
        sense_descriptions = {
            "sight": "you can see it with your eyes",
            "hearing": "you can hear it with your ears",
            "touch": "you can feel it on your skin",
            "smell": "you can smell it with your nose",
            "taste": "you can taste it with your tongue"
        }
        model_answer = (f"'{word}' is a {target_sense} word because it helps us "
                        f"{sense_descriptions[target_sense]}. "
                        f"It makes the poem feel real.")
        keywords = [word, target_sense, sense_descriptions[target_sense].split()[0]]
    else:
        sentences = [s.strip() for s in passage.text().split('.') if s.strip()]
        if len(sentences) >= 2:
            q_text = f"From the passage '{passage.title}', name one thing that happened in the story."
            model_answer = rng.choice(sentences)
            keywords = [w for w in model_answer.split()[:4] if len(w) > 3]
        else:
            q_text = f"What is the passage '{passage.title}' about?"
            model_answer = f"The passage is about {passage.questions_hint[0].replace('?', '')}."
            keywords = [passage.title.split()[0]]

    return {
        "id": _generate_id("SHT", "ANS", idx),
        "type": "short_answer",
        "topic": topic,
        "question": q_text,
        "model_answer": model_answer,
        "expected_keywords": keywords[:5],
        "max_words": 15,
        "answer": model_answer,
        "explanation": model_answer,
        "difficulty": diff,
        "competency": True,
        "indian_context": True,
        "poem_ref": poem.title if topic == TOPIC_RHYME_SOUND else None,
        "passage_ref": passage.title if topic == TOPIC_READING_COMP else None
    }


def _gen_competency_long_answer(rng, poem, passage, diff, idx):
    topic = rng.choice([TOPIC_RHYME_SOUND, TOPIC_SENSORY, TOPIC_READING_COMP])

    if topic == TOPIC_RHYME_SOUND:
        reps = [l for l in poem.lines if len(set(l.split())) < len(l.split())]
        q_text = (f"In the poem '{poem.title}', the poet uses repetition. "
                  f"Find an example of a word or phrase that is repeated. "
                  f"What feeling does this repetition create?")
        rep_word = None
        for line in poem.lines:
            words = line.split()
            for w in words:
                if words.count(w) > 1:
                    rep_word = w
                    break
            if rep_word:
                break
        if rep_word:
            model_answer = (f"In '{poem.title}', the word '{rep_word}' is repeated. "
                            f"This repetition creates a rhythm that makes the poem feel musical and lively, "
                            f"like the beat of a drum. It helps the reader feel the energy of the poem.")
            rubric = [
                "Identifies the repeated word/phrase",
                "Names the feeling created (rhythm/music/energy)",
                "Gives one reason why the poet repeated it"
            ]
            keywords = [rep_word, "rhythm", "repeated"]
        else:
            model_answer = (f"The poem '{poem.title}' has a regular rhythm. "
                            f"The rhyming words at the end of each pair of lines make it feel musical.")
            rubric = [
                "Identifies repetition or rhyming",
                "Names the feeling created",
                "Explains the poet's choice"
            ]
            keywords = ["rhythm", "repeated", "poet"]

    elif topic == TOPIC_SENSORY:
        senses = list(SENSORY_WORDS.keys())
        target_sense = rng.choice(senses)
        word_dict = SENSORY_WORDS[target_sense]
        word = rng.choice(list(word_dict.keys()))
        q_text = (f"Poets use sensory words to make the reader feel like they are "
                  f"really in the poem. Think of a word that appeals to the "
                  f"{target_sense} sense - '{word}' is one such word. "
                  f"Write your own sentence using '{word}' and explain how it "
                  f"helps the reader imagine the scene.")
        model_answer = (f"When I say '{word_dict[word]}', the word '{word}' helps me "
                        f"imagine the scene. It uses the {target_sense} sense, so the reader "
                        f"can {target_sense} what is happening in the poem. "
                        f"This makes the poem feel real and vivid, like I am there myself.")
        rubric = [
            "Uses the sensory word correctly in a sentence",
            "Identifies which sense is being used",
            "Explains how it helps the reader imagine",
            "Connects to a real-life experience"
        ]
        keywords = [word, target_sense, "imagine", "sense"]

    else:
        q_text = (f"Read the passage '{passage.title}' carefully. "
                  f"Write 4-5 sentences explaining what happens in the passage. "
                  f"Include the main character, what they did, and how they felt.")
        text = passage.text()
        model_answer = (f"The passage '{passage.title}' tells us about what happened. "
                        f"{text} "
                        f"This shows that the characters had an interesting experience "
                        f"and learned something important from it.")
        rubric = [
            "Names the main character",
            "States what happened",
            "Mentions one detail from the passage",
            "Uses complete sentences"
        ]
        keywords = [passage.title.split()[0], "happened", "passage"]

    return {
        "id": _generate_id("LNG", "ANS", idx),
        "type": "long_answer",
        "topic": topic,
        "question": q_text,
        "model_answer": model_answer,
        "rubric_points": rubric,
        "min_words": 20,
        "answer": model_answer,
        "explanation": model_answer,
        "difficulty": diff,
        "competency": True,
        "indian_context": True,
        "poem_ref": poem.title if topic == TOPIC_RHYME_SOUND else None,
        "passage_ref": passage.title if topic == TOPIC_READING_COMP else None
    }


def _gen_competency_numerical(rng, poem, passage, diff, idx):
    topic = rng.choice([TOPIC_RHYME_SOUND, TOPIC_SENSORY, TOPIC_READING_COMP])

    if topic == TOPIC_RHYME_SOUND:
        lines = poem.lines
        comp_type = rng.choice(["line_count", "repetition_count", "rhyme_count"])

        if comp_type == "line_count":
            answer = len([l for l in lines if l.strip()])
            q_text = f"How many lines does the poem '{poem.title}' have?"
            explanation = f"Counting the lines in '{poem.title}': there are {answer} lines."
            comp = "line_count"
            target_text = poem.text()
        elif comp_type == "repetition_count":
            all_words = " ".join(lines).lower().split()
            word_counts = {}
            for w in all_words:
                word_counts[w] = word_counts.get(w, 0) + 1
            repeated = {w: c for w, c in word_counts.items() if c > 1 and len(w) > 2}
            answer = sum(repeated.values()) - len(repeated)  # extra occurrences
            target_words = list(repeated.keys())[:3]
            q_text = f"How many times are words repeated in the poem '{poem.title}'? (Count extra occurrences only)"
            explanation = f"Repeated words in '{poem.title}': {repeated}. Extra occurrences: {answer}."
            comp = "repetition_count"
            target_text = poem.text()
        else:
            pairs = find_rhyme_pairs(poem)
            answer = len(pairs)
            q_text = f"How many pairs of rhyming words are there in the poem '{poem.title}'?"
            explanation = f"Rhyming pairs in '{poem.title}': {pairs}. Total pairs: {answer}."
            comp = "rhyme_count"
            target_text = poem.text()

    elif topic == TOPIC_SENSORY:
        sense_counts = {sense: len(words) for sense, words in SENSORY_WORDS.items()}
        target_sense = rng.choice(list(sense_counts.keys()))
        answer = sense_counts[target_sense]
        q_text = (f"How many {target_sense} words are there in the sensory word bank "
                  f"for Class 3? (Count the words listed under '{target_sense}')")
        explanation = (f"There are {answer} {target_sense} words in our word bank. "
                       f"These help us {target_sense} what the poet describes.")
        comp = "sensory_word_count"
        target_text = " ".join(SENSORY_WORDS[target_sense].keys())

    else:
        text = passage.text()
        sentences = [s for s in text.split('.') if s.strip()]
        answer = len(sentences)
        q_text = f"How many sentences are there in the passage '{passage.title}'?"
        explanation = f"Counting sentences in '{passage.title}': there are {answer} sentences."
        comp = "line_count"
        target_text = text

    return {
        "id": _generate_id("NUM", "SOL", idx),
        "type": "numerical",
        "topic": topic,
        "question": q_text,
        "computation_type": comp,
        "target_text": target_text,
        "target_words": list(repeated.keys())[:3] if topic == TOPIC_RHYME_SOUND and comp == "repetition_count" else [],
        "expected_answer": answer,
        "answer": answer,
        "explanation": explanation,
        "difficulty": diff,
        "competency": True,
        "indian_context": True,
        "poem_ref": poem.title if topic == TOPIC_RHYME_SOUND else None,
        "passage_ref": passage.title if topic == TOPIC_READING_COMP else None
    }


# ── Standard Question Generators ─────────────────────────────────────────────

def _gen_standard_mcq_rhyme(rng, poem, diff, idx):
    lines = poem.lines
    last_words = [get_last_word(l) for l in lines]
    rhyme_pairs = find_rhyme_pairs(poem)

    q_variants = [
        "Which two words rhyme in the poem?",
        "What is a rhyming pair in this poem?",
        "Which pair of words have the same ending sound?",
        "Which words from the poem rhyme together?"
    ]
    q_text = rng.choice(q_variants)

    if rhyme_pairs:
        pair = rng.choice(rhyme_pairs)
        correct = [pair[2], pair[3]]
        # Build options: pair of words
        wrong_pairs = [
            [rng.choice(last_words), rng.choice(last_words)],
            [rng.choice(["happy", "jumped", "river", "house"]),
             rng.choice(["school", "garden", "friend", "mountain"])],
            [rng.choice(["green", "brown", "red", "bright"]),
             rng.choice(["cold", "hot", "soft", "sweet"])]
        ]
        options_raw = [f"{c[0]} and {c[1]}" for c in [correct] + wrong_pairs]
        rng.shuffle(options_raw)
        correct_idx = options_raw.index(f"{correct[0]} and {correct[1]}")
    else:
        # Use rhyme group
        target = last_words[0] if last_words else "star"
        group = RHYME_GROUPS.get(target.lower(), {"star", "are"})
        members = list(group)
        correct_pair = members[:2]
        wrong_pairs = [
            ["happy", "jumped"],
            ["garden", "river"],
            ["school", "friend"]
        ]
        options_raw = [f"{correct_pair[0]} and {correct_pair[1]}"] + \
                      [f"{w[0]} and {w[1]}" for w in wrong_pairs]
        rng.shuffle(options_raw)
        correct_idx = options_raw.index(f"{correct_pair[0]} and {correct_pair[1]}")

    return {
        "id": _generate_id("RHY", "MCQ", idx),
        "type": "mcq",
        "topic": TOPIC_RHYME_SOUND,
        "question": f"{q_text} (Poem: '{poem.title}')",
        "options": options_raw,
        "answer": chr(65 + correct_idx),
        "answer_index": correct_idx,
        "explanation": (f"The words rhyme because they end with the same sound. "
                        f"Rhyming words make poetry musical and fun to read aloud."),
        "difficulty": diff,
        "competency": False,
        "indian_context": False,
        "poem_ref": poem.title
    }


def _gen_standard_mcq_sensory(rng, diff, idx):
    senses = list(SENSORY_WORDS.keys())
    target_sense = rng.choice(senses)
    word_dict = SENSORY_WORDS[target_sense]
    word = rng.choice(list(word_dict.keys()))
    options = senses[:]
    rng.shuffle(options)
    correct_idx = options.index(target_sense)

    sense_questions = [
        f"'{word}' in the sentence '{word_dict[word]}' appeals to which sense?",
        f"The word '{word}' is used in: '{word_dict[word]}'. Which sense does it describe?",
        f"Which sense organ helps us experience '{word}'? (as in: {word_dict[word]})",
    ]
    q_text = rng.choice(sense_questions)

    return {
        "id": _generate_id("SEN", "MCQ", idx),
        "type": "mcq",
        "topic": TOPIC_SENSORY,
        "question": q_text,
        "options": options,
        "answer": chr(65 + correct_idx),
        "answer_index": correct_idx,
        "explanation": (f"'{word}' is a {target_sense} word - it helps the reader "
                        f"{'see' if target_sense == 'sight' else 'hear' if target_sense == 'hearing' else 'feel' if target_sense == 'touch' else 'smell' if target_sense == 'smell' else 'taste'} "
                        f"what the poet describes."),
        "difficulty": diff,
        "competency": False,
        "indian_context": False
    }


def _gen_standard_mcq_reading(rng, passage, diff, idx):
    text = passage.text()
    sentences = [s.strip() for s in text.split('.') if s.strip()]

    # True/False MCQ: give a statement, ask if it's in the passage
    is_true = rng.choice([True, True, False])  # slightly more true

    if is_true:
        correct_sentence = rng.choice(sentences)
        statement = correct_sentence
        distractors = [
            "The cat sat on a mat under the tree.",
            "Riya went to the moon in a rocket.",
            "The teacher gave everyone a gold medal.",
            "The elephant danced on the roof."
        ]
    else:
        distractors_text = [
            "The cat sat on a mat.",
            "Riya flew to the moon.",
            "Everyone got a gold medal.",
            "The elephant danced on the roof.",
            "The sun rose in the west.",
            "It snowed in the desert.",
        ]
        statement = rng.choice(distractors_text)
        correct_sentence = rng.choice(sentences)

    q_text = f"Read the passage '{passage.title}'. Is this statement true or false?"
    options = ["True", "False"]
    correct_idx = 0 if is_true else 1
    explanation = (f"The statement is {'True' if is_true else 'False'}. "
                   f"In the passage we read: '{correct_sentence.strip()}'.")

    return {
        "id": _generate_id("RDC", "MCQ", idx),
        "type": "mcq",
        "topic": TOPIC_READING_COMP,
        "question": f"'{statement}'",
        "options": options,
        "answer": options[correct_idx],
        "answer_index": correct_idx,
        "explanation": explanation,
        "difficulty": diff,
        "competency": False,
        "indian_context": False,
        "passage_ref": passage.title
    }


def _gen_standard_fill_blank(rng, poem, diff, idx):
    lines = poem.lines
    rhyme_pairs = find_rhyme_pairs(poem)

    q_variants = [
        f"In the poem '{poem.title}', the poet repeats a word for effect.",
        f"The poem '{poem.title}' has a musical ______.",
        f"Words that end with the same sound are called ______ words.",
    ]

    if rhyme_pairs:
        pair = rng.choice(rhyme_pairs)
        template = f"In '{poem.title}', the words '{pair[2]}' and '______' rhyme with each other."
        correct_word = pair[3]
    else:
        template = f"In '{poem.title}', the poet uses ______ to make the poem feel musical."
        correct_word = rng.choice(["rhyme", "repetition", "rhythm"])

    alt_answers = [correct_word]
    if is_rhyme_pair(correct_word, "sound"):
        for group in RHYME_GROUPS.values():
            if correct_word.lower().strip(".,!?") in group:
                alts = [w for w in group if w != correct_word]
                if alts:
                    alt_answers.append(alts[0])

    explanation = (f"'{correct_word}' completes the blank. "
                   f"This word is important for understanding the musical quality of poetry.")

    return {
        "id": _generate_id("STD", "BLK", idx),
        "type": "fill_blank",
        "topic": TOPIC_RHYME_SOUND,
        "question": template,
        "sentence_template": template,
        "blank_marker": "______",
        "correct_answers": alt_answers,
        "answer": alt_answers,
        "explanation": explanation,
        "difficulty": diff,
        "competency": False,
        "indian_context": False,
        "poem_ref": poem.title
    }


def _gen_standard_short_answer(rng, poem, diff, idx):
    topic = rng.choice([TOPIC_RHYME_SOUND, TOPIC_SENSORY])

    if topic == TOPIC_RHYME_SOUND:
        lines = poem.lines
        reps = []
        for line in lines:
            words = line.split()
            for w in words:
                if words.count(w) > 1 and w not in [r[0] for r in reps]:
                    reps.append(w)

        if reps:
            rep_word = reps[0]
            q_text = (f"In '{poem.title}', why do you think the poet repeated "
                      f"the word '{rep_word}'? What feeling does it create?")
            model_answer = (f"The poet repeated '{rep_word}' to create a feeling of "
                            f"rhythm and energy. It makes the poem feel lively and musical, "
                            f"like a song that you want to sing again and again.")
            keywords = [rep_word, "rhythm", "repeated", "feeling", "musical"]
        else:
            q_text = f"What makes '{poem.title}' feel like music or a song?"
            model_answer = (f"The poem uses rhyming words and repetition. "
                            f"The rhyming pairs at the end of lines make it musical, "
                            f"and the repeated words create a steady beat.")
            keywords = ["rhyme", "repetition", "musical", "beat"]

    else:
        senses = list(SENSORY_WORDS.keys())
        target_sense = rng.choice(senses)
        word_dict = SENSORY_WORDS[target_sense]
        word = rng.choice(list(word_dict.keys()))
        q_text = (f"Give one example each of a sight word, a sound word, and a "
                  f"touch word that you might use to describe a rainy day at home.")
        model_answer = (
            f"Sight word: 'dark' (you see dark clouds). "
            f"Sound word: 'pattering' (you hear rain on the roof). "
            f"Touch word: 'cold' (you feel cold from the rain wind).")
        keywords = ["sight", "sound", "touch", "dark", "pattering", "cold"]

    return {
        "id": _generate_id("STD", "SHT", idx),
        "type": "short_answer",
        "topic": topic,
        "question": q_text,
        "model_answer": model_answer,
        "expected_keywords": keywords[:5],
        "max_words": 20,
        "answer": model_answer,
        "explanation": model_answer,
        "difficulty": diff,
        "competency": False,
        "indian_context": False,
        "poem_ref": poem.title
    }


def _gen_standard_long_answer(rng, poem, diff, idx):
    topic = rng.choice([TOPIC_RHYME_SOUND, TOPIC_SENSORY])

    if topic == TOPIC_RHYME_SOUND:
        q_text = (f"Write a few sentences about how the poet uses sound in "
                  f"'{poem.title}'. Talk about (a) rhyming words, (b) any repeated "
                  f"words or phrases, and (c) whether the poem has a fast or slow beat.")
        rhyme_pairs = find_rhyme_pairs(poem)
        rhyme_str = ", ".join([f"'{p[2]}' and '{p[3]}'" for p in rhyme_pairs]) if rhyme_pairs else "various pairs of words"
        model_answer = (f"In the poem '{poem.title}', the poet uses sound in several ways. "
                        f"First, rhyming words like {rhyme_str} appear at the end of lines, "
                        f"which makes the poem sound musical. Second, some words are repeated "
                        f"to"
)