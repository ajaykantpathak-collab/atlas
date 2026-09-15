"""
CISCE Class 1 English — Deterministic Question Generator
Covers all syllabus nodes:
  c1_eng_001  Alphabet Recognition (uppercase and lowercase letters)
  c1_eng_002  Phonics and Letter Sounds
  c1_eng_003  Rhyming Words
  c1_eng_004  Picture Reading and Comprehension
  c1_eng_005  Naming Words (Nouns)
  c1_eng_006  Action Words (Verbs)
  c1_eng_007  Describing Words (Adjectives)
  c1_eng_008  Capital Letters and Small Letters
  c1_eng_009  Punctuation (Full stop, question mark, exclamation mark)
  c1_eng_010  Pronouns (this, that, these, those)
  c1_eng_011  Prepositions (in, on, under, near, behind)
  c1_eng_012  Question Words (who, what, where)
  c1_eng_013  Poems and Rhymes (recitation and appreciation)
  c1_eng_014  Story Comprehension (listening and answering)
  c1_eng_015  Spelling and Word Building
"""

import random
import string
import hashlib
from fractions import Fraction
from math import floor
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

# ============================================================
#  DATA  (syllabus-linked, no external deps)
# ============================================================

INDIAN_NAMES = [
    "Rahul", "Priya", "Aarav", "Anaya", "Vihaan", "Diya",
    "Ishaan", "Kavya", "Arjun", "Saanvi", "Aditya", "Meera",
    "Rohan", "Pooja", "Kabir", "Isha", "Yash", "Neha",
    "Dev", "Tara",
]

INDIAN_PLACES = [
    "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata",
    "Hyderabad", "Pune", "Jaipur", "Lucknow", "Kerala",
    "park", "school", "home", "garden", "market", "temple",
    "river", "tree", "mountain", "village",
]

INDIAN_OBJECTS = [
    "ball", "bat", "book", "bag", "bottle", "basket",
    "cat", "cow", "camel", "crow", "cup", "chair",
    "dog", "drum", "door", "desk", "doll",
    "elephant", "eye", "ear",
    "fan", "fish", "frog", "flower",
    "goat", "gate", "glass",
    "hat", "hen", "horse", "hand",
    "ice", "ink",
    "jug", "jam",
    "kite", "key", "king",
    "lion", "leaf", "light",
    "mango", "moon", "mouse", "monkey", "mirror",
    "nest", "nose", "net",
    "orange", "owl",
    "pen", "pot", "pig", "pencil", "paper", "parrot",
    "queen", "quilt",
    "rat", "ring", "road", "rose",
    "sun", "star", "ship", "snake", "spoon", "school",
    "table", "tiger", "tree", "toy", "telephone", "turtle",
    "umbrella", "unit",
    "van", "violin", "vase",
    "watch", "water", "window", "well",
    "xylophone", "box", "yak", "yolk", "zebra", "zip",
]

# Letter -> list of Indian-context words starting with that letter
WORDS_BY_LETTER = {
    "a": ["ant", "apple", "arrow", "axe"],
    "b": ["ball", "bat", "book", "bag", "banana"],
    "c": ["cat", "cow", "cup", "camel", "candle"],
    "d": ["dog", "drum", "door", "doll", "duck"],
    "e": ["elephant", "egg", "eye", "ear"],
    "f": ["fan", "fish", "frog", "flower", "flag"],
    "g": ["goat", "gate", "glass", "grapes", "guitar"],
    "h": ["hat", "hen", "horse", "hand", "house"],
    "i": ["ink", "ice", "igloo"],
    "j": ["jug", "jam", "joker", "jungle"],
    "k": ["kite", "key", "king", "kangaroo", "kitten"],
    "l": ["lion", "leaf", "light", "lion", "lemon"],
    "m": ["mango", "moon", "mouse", "monkey", "mirror"],
    "n": ["nest", "nose", "net", "nose", "needle"],
    "o": ["orange", "owl", "ox"],
    "p": ["pen", "pot", "pig", "pencil", "paper", "parrot"],
    "q": ["queen", "quilt", "quarter"],
    "r": ["rat", "ring", "road", "rose", "rabbit"],
    "s": ["sun", "star", "ship", "snake", "spoon", "school"],
    "t": ["table", "tiger", "tree", "toy", "telephone", "turtle"],
    "u": ["umbrella", "uniform", "uncle"],
    "v": ["van", "violin", "vase", "vulture"],
    "w": ["watch", "water", "window", "well", "wolf"],
    "y": ["yak", "yolk", "yacht"],
    "z": ["zebra", "zip", "zoo"],
}

# Common rhyming word pairs
RHYME_PAIRS = [
    ("cat", "bat"), ("mat", "rat"), ("hat", "bat"),
    ("dog", "log"), ("frog", "log"), ("hog", "log"),
    ("sun", "fun"), ("run", "fun"), ("bun", "fun"),
    ("tree", "bee"), ("knee", "bee"), ("sea", "bee"),
    ("ball", "call"), ("fall", "call"), ("wall", "call"),
    ("fish", "dish"), ("wish", "dish"),
    ("moon", "spoon"), ("noon", "spoon"),
    ("book", "look"), ("cook", "look"), ("hook", "look"),
    ("car", "star"), ("far", "star"), ("jar", "star"),
    ("house", "mouse"), ("spouse", "mouse"),
    ("rain", "train"), ("plain", "train"),
    ("bell", "well"), ("tell", "well"), ("sell", "well"),
    ("hand", "sand"), ("land", "sand"), ("band", "sand"),
    ("king", "ring"), ("sing", "ring"), ("wing", "ring"),
    ("boat", "coat"), ("goat", "coat"), ("float", "coat"),
    ("girl", "pearl"), ("curl", "pearl"),
]

POEMS = [
    {
        "title": "The Moon",
        "lines": [
            "The moon is shining in the sky,",
            "The stars are twinkling oh so high.",
            "The moon is round and bright,",
            "And lights up the darkest night.",
        ],
        "rhyming_words": [("sky", "high"), ("bright", "night")],
    },
    {
        "title": "My Cat",
        "lines": [
            "My cat has fur as soft as silk,",
            "She drinks her milk from out a dish.",
            "She likes to play with balls of wool,",
            "And curl up warm and very full.",
        ],
        "rhyming_words": [("silk", "milk"), ("wool", "full")],
    },
    {
        "title": "The Bus",
        "lines": [
            "The big red bus goes round the town,",
            "It takes the children up and down.",
            "The driver toots his loud horn,",
            "And all the people wave good morn.",
        ],
        "rhyming_words": [("town", "down"), ("horn", "morn")],
    },
    {
        "title": "Little Fish",
        "lines": [
            "Little fish swims to and fro,",
            "In the water to and fro.",
            "He dives down and pops up high,",
            "Like a tiny speck in the sky.",
        ],
        "rhyming_words": [("fro", "fro"), ("high", "sky")],
    },
    {
        "title": "Rain Drops",
        "lines": [
            "Rain drops falling from the sky,",
            "Pitter patter pitter patter by.",
            "On the roof and on the ground,",
            "Everywhere a splashing sound.",
        ],
        "rhyming_words": [("sky", "by"), ("ground", "sound")],
    },
]

STORIES = [
    {
        "title": "The Clever Monkey",
        "characters": ["monkey", "crocodile", "old monkey"],
        "events": [
            "A clever monkey lived on a mango tree by the river.",
            "A crocodile came and they became friends.",
            "The crocodile's wife wanted to eat the monkey's heart.",
            "The monkey told the crocodile his heart was on the tree.",
            "The crocodile took the monkey back to the tree.",
            "The monkey jumped to safety and was free.",
        ],
        "moral": "Cleverness is better than strength.",
        "questions": [
            "Where did the monkey live?",
            "Who wanted to eat the monkey's heart?",
            "How did the monkey save himself?",
        ],
    },
    {
        "title": "The Greedy Dog",
        "characters": ["dog", "another dog"],
        "events": [
            "A dog found a piece of meat in the market.",
            "He carried it home in his mouth.",
            "He saw his reflection in a river.",
            "He thought it was another dog with meat.",
            "He barked and dropped his own piece of meat.",
            "The other dog ran away with the meat.",
        ],
        "moral": "Greed makes us lose what we have.",
        "questions": [
            "What did the dog find in the market?",
            "Where did the dog see his reflection?",
            "What happened to the dog's meat?",
        ],
    },
    {
        "title": "The Fox and the Grapes",
        "characters": ["fox", "grapes"],
        "events": [
            "A hungry fox saw some grapes hanging high on a vine.",
            "He jumped but could not reach them.",
            "He tried again and again but failed.",
            "The fox walked away saying the grapes were sour.",
        ],
        "moral": "It is easy to despise what we cannot have.",
        "questions": [
            "What did the fox see on the vine?",
            "Why could the fox not get the grapes?",
            "What did the fox say about the grapes?",
        ],
    },
    {
        "title": "The Ant and the Grasshopper",
        "characters": ["ant", "grasshopper"],
        "events": [
            "The ant worked hard all summer to store food for winter.",
            "The grasshopper sang and played all summer.",
            "Winter came and the grasshopper had no food.",
            "The ant shared food with the grasshopper.",
        ],
        "moral": "We should work hard and save for the future.",
        "questions": [
            "What did the ant do all summer?",
            "What did the grasshopper do all summer?",
            "What did the ant do when winter came?",
        ],
    },
]

CAPITAL_LETTERS = list(string.ascii_uppercase)
SMALL_LETTERS = list(string.ascii_lowercase)

# Mapping capital to small
CAP_TO_SMALL = {c: s for c, s in zip(CAPITAL_LETTERS, SMALL_LETTERS)}
SMALL_TO_CAP = {s: c for c, s in zip(CAPITAL_LETTERS, SMALL_LETTERS)}

PUNCTUATION = {
    "full_stop": ".",
    "question_mark": "?",
    "exclamation_mark": "!",
    "comma": ",",
}

PREPOSITIONS = [
    "in", "on", "under", "near", "behind", "in front of", "above", "below",
]

QUESTION_WORDS = [
    "Who", "What", "Where", "When",
]

# Blended CVC words
CVC_WORDS = [
    "cat", "bat", "mat", "rat", "hat", "sat", "fat", "pat",
    "dog", "log", "fog", "hog", "jog", "cog",
    "sun", "fun", "bun", "run", "gun", "nun",
    "pen", "hen", "den", "ten", "men",
    "pig", "wig", "dig", "fig", "big",
    "box", "fox", "lox", "pox",
    "bed", "red", "led", "wed", "fed",
    "cup", "pup", "sup", "mud", "bud",
    "map", "cap", "tap", "rap", "sap",
    "sit", "hit", "bit", "fit", "lit",
]

ADJECTIVES = [
    "big", "small", "red", "blue", "green", "yellow",
    "hot", "cold", "soft", "hard", "tall", "short",
    "fat", "thin", "clean", "dirty", "happy", "sad",
    "old", "new", "good", "bad", "sweet", "sour",
]

NOUNS_SIMPLE = [
    "boy", "girl", "man", "woman", "cat", "dog", "bird",
    "sun", "moon", "star", "tree", "flower", "book", "pen",
    "school", "home", "car", "bus", "ball", "bag", "water",
    "milk", "rice", "apple", "mango", "banana", "egg",
]

VERBS_SIMPLE = [
    "run", "jump", "eat", "drink", "sleep", "read", "write",
    "sing", "dance", "play", "walk", "sit", "stand", "clap",
    "cry", "laugh", "fly", "swim", "talk", "listen",
]

# ============================================================
#  HELPERS
# ============================================================

def pick_word_by_letter(letter: str) -> str:
    letter = letter.lower()
    pool = WORDS_BY_LETTER.get(letter, ["apple", "ant", "arrow"])
    idx = random.randint(0, len(pool) - 1)
    return pool[idx]

def pick_rhyme_pair():
    return random.choice(RHYME_PAIRS)

def pick_story():
    return random.choice(STORIES)

def pick_poem():
    return random.choice(POEMS)

def pick_name():
    return random.choice(INDIAN_NAMES)

def pick_place():
    return random.choice(INDIAN_PLACES)

def pick_cvc():
    return random.choice(CVC_WORDS)

def pick_noun():
    return random.choice(NOUNS_SIMPLE)

def pick_verb():
    return random.choice(VERBS_SIMPLE)

def pick_adjective():
    return random.choice(ADJECTIVES)

def pick_preposition():
    return random.choice(PREPOSITIONS)

# ============================================================
#  QUESTION GENERATORS
# ============================================================

def gen_alphabet_recognition(seed_offset: int = 0) -> Dict:
    """c1_eng_001  Alphabet Recognition — Standard"""
    r = random.Random(seed_offset)
    letter = r.choice(CAPITAL_LETTERS)
    small = CAP_TO_SMALL[letter]
    word = pick_word_by_letter(small)
    answer = f"{small} (small {letter})"

    distractors = r.sample([c for c in SMALL_LETTERS if c != small], 3)
    options = [small] + distractors
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_001_{seed_offset:04d}",
        "topic": "c1_eng_001",
        "topic_label": "Alphabet Recognition",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Remember",
        "question": f"What is the small letter of '{letter}'?",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The small letter of '{letter}' is '{small}'.",
        "answer_key": opt_labels[options.index(small)],
        "steps": [
            f"The capital letter shown is '{letter}'.",
            f"The matching small letter is '{small}'.",
            f"Example word: {word}.",
        ],
        "explanation": f"Every capital letter has a matching small letter. '{letter}' matches with '{small}'.",
    }


def gen_phonics_sound(seed_offset: int = 0) -> Dict:
    """c1_eng_002  Phonics and Letter Sounds — Standard"""
    r = random.Random(seed_offset)
    letter = r.choice(["b", "s", "m", "t", "p", "c", "d", "f"])
    word = pick_word_by_letter(letter)
    distractors = r.sample([pick_word_by_letter(c) for c in
                            r.sample(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","y","z"], 3)
                            if c != letter], 3)
    # ensure distinct
    distractors = list(set(distractors))
    while len(distractors) < 3:
        distractors.append(pick_word_by_letter(letter))
    distractors = distractors[:3]
    while word in distractors:
        word = pick_word_by_letter(letter)

    options = [word] + distractors
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_002_{seed_offset:04d}",
        "topic": "c1_eng_002",
        "topic_label": "Phonics and Letter Sounds",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Remember",
        "question": f"Which word begins with the sound of '{letter.upper()}'?",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The word '{word}' begins with the '{letter}' sound.",
        "answer_key": opt_labels[options.index(word)],
        "steps": [
            f"The letter '{letter.upper()}' makes the '{letter}' sound.",
            f"The word '{word}' starts with '{letter}'.",
            f"Check: {word} starts with the letter '{letter}'.",
        ],
        "explanation": f"Phonics teaches us that '{letter}' makes the '{letter}' sound. '{word}' is a word that starts with '{letter}'.",
    }


def gen_rhyming_words(seed_offset: int = 0) -> Dict:
    """c1_eng_003  Rhyming Words — Standard"""
    r = random.Random(seed_offset)
    w1, w2 = pick_rhyme_pair()
    non_rhyming = pick_word_by_letter(r.choice(["a","c","d","e","g","i","l","n","r"]))
    while non_rhyming in (w1, w2):
        non_rhyming = pick_word_by_letter(r.choice(["a","c","d","e","g","i","l","n","r"]))

    options = [w2, non_rhyming, pick_word_by_letter("m"), pick_word_by_letter("s")]
    options = list(set(options))
    while len(options) < 4:
        options.append(pick_word_by_letter("a"))
    if len(options) > 4:
        options = options[:4]
    if w2 not in options:
        options[0] = w2
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_003_{seed_offset:04d}",
        "topic": "c1_eng_003",
        "topic_label": "Rhyming Words",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Understand",
        "question": f"Which word rhymes with '{w1}'?",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"'{w2}' rhymes with '{w1}' because they end with the same sound.",
        "answer_key": opt_labels[options.index(w2)],
        "steps": [
            f"The word given is '{w1}'.",
            f"Words that rhyme have the same ending sound.",
            f"'{w1}' and '{w2}' both end with the same sound.",
            f"So '{w2}' rhymes with '{w1}'.",
        ],
        "explanation": f"Rhyming words have the same ending sound. '{w1}' and '{w2}' sound alike at the end, so they rhyme.",
    }


def gen_naming_words(seed_offset: int = 0) -> Dict:
    """c1_eng_005  Naming Words (Nouns) — Standard"""
    r = random.Random(seed_offset)
    # Identify which are nouns among a mixed list
    nouns_list = ["boy", "girl", "cat", "dog", "sun", "moon", "book", "pen", "bird", "fish",
                  "ball", "tree", "flower", "school", "home", "water", "milk", "rice",
                  "apple", "mango", "egg", "car", "bus", "chair", "table", "door"]
    verbs_list = ["run", "jump", "eat", "drink", "sleep", "read", "write", "sing", "dance",
                  "play", "walk", "sit", "stand", "clap", "fly", "swim", "talk", "listen"]
    adjs_list = ["big", "small", "red", "blue", "green", "hot", "cold", "soft", "hard",
                 "tall", "short", "happy", "sad", "sweet", "good", "new", "old"]

    noun = r.choice(nouns_list)
    non_nouns = r.sample(verbs_list + adjs_list, 3)
    options = [noun] + non_nouns[:3]
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_005_{seed_offset:04d}",
        "topic": "c1_eng_005",
        "topic_label": "Naming Words (Nouns)",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Understand",
        "question": f"Which of the following is a naming word (noun)?",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"'{noun}' is a naming word (noun) because it names a person, place, animal, or thing.",
        "answer_key": opt_labels[options.index(noun)],
        "steps": [
            f"A naming word (noun) gives the name of a person, place, animal, or thing.",
            f"'{noun}' is the name of a thing.",
            f"'{non_nouns[0]}' is an action word (verb) or describing word (adjective).",
            f"So '{noun}' is the naming word (noun).",
        ],
        "explanation": f"Nouns are naming words. '{noun}' names a thing, so it is a noun. The other options are verbs or adjectives.",
    }


def gen_action_words(seed_offset: int = 0) -> Dict:
    """c1_eng_006  Action Words (Verbs) — Standard"""
    r = random.Random(seed_offset)
    verb = r.choice(VERBS_SIMPLE)
    non_verbs = r.sample(NOUNS_SIMPLE, 3)
    # ensure no overlap
    non_verbs = list(set(non_verbs))
    while len(non_verbs) < 3:
        non_verbs.append(r.choice(NOUNS_SIMPLE))
    non_verbs = non_verbs[:3]
    while verb in non_verbs:
        non_verbs[0] = r.choice(NOUNS_SIMPLE)

    options = [verb] + non_verbs
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_006_{seed_offset:04d}",
        "topic": "c1_eng_006",
        "topic_label": "Action Words (Verbs)",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Understand",
        "question": f"Which of the following is an action word (verb)?",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"'{verb}' is an action word (verb) because it shows something we can do.",
        "answer_key": opt_labels[options.index(verb)],
        "steps": [
            f"Action words (verbs) tell us what someone or something does.",
            f"'{verb}' is something we can do.",
            f"'{non_verbs[0]}' is a naming word (noun).",
            f"So '{verb}' is the action word.",
        ],
        "explanation": f"Verbs are action words. '{verb}' tells us about an action we can do, so it is a verb.",
    }


def gen_describing_words(seed_offset: int = 0) -> Dict:
    """c1_eng_007  Describing Words (Adjectives) — Standard"""
    r = random.Random(seed_offset)
    adj = r.choice(ADJECTIVES)
    non_adjs = r.sample(NOUNS_SIMPLE, 3)
    non_adjs = list(set(non_adjs))
    while len(non_adjs) < 3:
        non_adjs.append(r.choice(NOUNS_SIMPLE))
    non_adjs = non_adjs[:3]

    options = [adj] + non_adjs
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_007_{seed_offset:04d}",
        "topic": "c1_eng_007",
        "topic_label": "Describing Words (Adjectives)",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Understand",
        "question": f"Which of the following is a describing word (adjective)?",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"'{adj}' is a describing word (adjective) because it tells us more about something.",
        "answer_key": opt_labels[options.index(adj)],
        "steps": [
            f"Describing words (adjectives) tell us more about a person, place, or thing.",
            f"'{adj}' describes how something looks or feels.",
            f"'{non_adjs[0]}' is a naming word (noun).",
            f"So '{adj}' is the describing word.",
        ],
        "explanation": f"Adjectives describe things. '{adj}' tells us a quality or feature, so it is an adjective.",
    }


def gen_capital_small(seed_offset: int = 0) -> Dict:
    """c1_eng_008  Capital Letters and Small Letters — Standard"""
    r = random.Random(seed_offset)
    q_type = r.choice(["capital_to_small", "small_to_capital", "capitalize_sentence", "name_starts_capital"])

    if q_type == "capital_to_small":
        letter = r.choice(CAPITAL_LETTERS)
        answer = CAP_TO_SMALL[letter]
        distractors = r.sample([c for c in SMALL_LETTERS if c != answer], 3)
        options = [answer] + distractors
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]
        return {
            "id": f"c1_eng_008_{seed_offset:04d}",
            "topic": "c1_eng_008",
            "topic_label": "Capital Letters and Small Letters",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Remember",
            "question": f"What is the small letter of '{letter}'?",
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": f"The small letter of '{letter}' is '{answer}'.",
            "answer_key": opt_labels[options.index(answer)],
            "steps": [
                f"Look at the capital letter '{letter}'.",
                f"Find its matching small letter.",
                f"The small letter of '{letter}' is '{answer}'.",
            ],
            "explanation": f"Every capital letter has a matching small letter. '{letter}' matches with '{answer}'.",
        }

    elif q_type == "small_to_capital":
        letter = r.choice(SMALL_LETTERS)
        answer = SMALL_TO_CAP[letter]
        distractors = r.sample([c for c in CAPITAL_LETTERS if c != answer], 3)
        options = [answer] + distractors
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]
        return {
            "id": f"c1_eng_008_{seed_offset:04d}",
            "topic": "c1_eng_008",
            "topic_label": "Capital Letters and Small Letters",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Remember",
            "question": f"What is the capital letter of '{letter}'?",
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": f"The capital letter of '{letter}' is '{answer}'.",
            "answer_key": opt_labels[options.index(answer)],
            "steps": [
                f"Look at the small letter '{letter}'.",
                f"Find its matching capital letter.",
                f"The capital letter of '{letter}' is '{answer}'.",
            ],
            "explanation": f"Every small letter has a matching capital letter. '{letter}' matches with '{answer}'.",
        }

    elif q_type == "capitalize_sentence":
        noun = r.choice(NOUNS_SIMPLE)
        name = r.choice(INDIAN_NAMES)
        sentence = f"{name} has a {noun}."
        answer = f"{name} has a {noun}."
        blanked = sentence.replace(name, "___").replace(noun, "__")
        # Simplify: just show a sentence that needs capital letter
        return {
            "id": f"c1_eng_008_{seed_offset:04d}",
            "topic": "c1_eng_008",
            "topic_label": "Capital Letters and Small Letters",
            "type": "fill_blank",
            "difficulty": "easy",
            "bloom_level": "Apply",
            "question": f"Write the sentence with the correct capital letter:\n'{name.lower()} has a {noun}.'",
            "options": {},
            "answer": f"Correct: {answer}",
            "answer_key": answer,
            "steps": [
                f"A sentence always starts with a capital letter.",
                f"The name '{name}' starts with capital '{name[0]}'.",
                f"The correct sentence is: {answer}",
            ],
            "explanation": f"We write the first letter of a sentence with a capital letter. So '{name.lower()}' becomes '{name}'.",
        }

    else:  # name_starts_capital
        name = r.choice(INDIAN_NAMES)
        first_letter = name[0]
        answer = first_letter
        distractors = r.sample([c for c in CAPITAL_LETTERS if c != first_letter], 3)
        options = [first_letter] + distractors
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]
        return {
            "id": f"c1_eng_008_{seed_offset:04d}",
            "topic": "c1_eng_008",
            "topic_label": "Capital Letters and Small Letters",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Understand",
            "question": f"What is the first letter of the name '{name}'?",
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": f"The first letter of '{name}' is '{first_letter}'.",
            "answer_key": opt_labels[options.index(first_letter)],
            "steps": [
                f"Look at the name '{name}'.",
                f"The first letter is '{first_letter}'.",
                f"Names always start with a capital letter.",
            ],
            "explanation": f"Every name starts with a capital letter. The name '{name}' starts with '{first_letter}'.",
        }


def gen_punctuation(seed_offset: int = 0) -> Dict:
    """c1_eng_009  Punctuation — Standard"""
    r = random.Random(seed_offset)
    q_type = r.choice(["full_stop", "question_mark", "exclamation_mark"])

    if q_type == "full_stop":
        sentences = [
            "Rahul is eating an apple",
            "Priya has a red bag",
            "The cat is on the mat",
            "Aarav is reading a book",
            "The sun is bright today",
        ]
        sentence = r.choice(sentences)
        answer = "full stop (.)"
        question = f"Which punctuation mark do we use at the end of the sentence: '{sentence}'?"
        explanation = "We use a full stop (.) at the end of a statement (a telling sentence)."

    elif q_type == "question_mark":
        questions_list = [
            "What is your name",
            "Where is Rahul going",
            "How old are you",
            "Do you like mangoes",
            "What is in your bag",
        ]
        sentence = r.choice(questions_list)
        answer = "question mark (?)"
        question = f"Which punctuation mark do we use at the end of: '{sentence}?'"
        explanation = "We use a question mark (?) at the end of a question."

    else:
        exclamations = [
            "Wow what a big elephant",
            "Help the house is on fire",
            "Hurrah we won the game",
            "Oh dear I have lost my pen",
        ]
        sentence = r.choice(exclamations)
        answer = "exclamation mark (!)"
        question = f"Which punctuation mark do we use at the end of: '{sentence}'?"
        explanation = "We use an exclamation mark (!) to show strong feeling or surprise."

    return {
        "id": f"c1_eng_009_{seed_offset:04d}",
        "topic": "c1_eng_009",
        "topic_label": "Punctuation",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Understand",
        "question": question,
        "options": {"A": "Comma (,)", "B": answer, "C": "Full stop (.)", "D": "Colon (:)"},
        "answer": answer,
        "answer_key": "B",
        "steps": [
            f"Look at the sentence: '{sentence}'",
            f"This is a {q_type.replace('_', ' ')} type of sentence.",
            f"We use the {answer} at the end.",
        ],
        "explanation": explanation,
    }


def gen_pronouns(seed_offset: int = 0) -> Dict:
    """c1_eng_010  Pronouns (this, that, these, those) — Standard"""
    r = random.Random(seed_offset)
    q_type = r.choice(["this_that", "these_those"])

    near_singular = ["This is my pen.", "This is a cat.", "This is Priya.", "This is a mango."]
    far_singular = ["That is a tree.", "That is a car.", "That is Arjun.", "That is a bird."]
    near_plural = ["These are my books.", "These are apples.", "These are children."]
    far_plural = ["Those are cows.", "Those are birds.", "Those are houses."]

    if q_type == "this_that":
        singular_near = r.choice(near_singular)
        singular_far = r.choice(far_singular)
        options = ["this", "that", "these", "those"]
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]

        return {
            "id": f"c1_eng_010_{seed_offset:04d}",
            "topic": "c1_eng_010",
            "topic_label": "Pronouns (this, that, these, those)",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Understand",
            "question": f"We say '{singular_near}'\nWe say ____ for something far away in the singular.",
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": "We use 'that' for a single thing that is far away.",
            "answer_key": opt_labels[options.index("that")],
            "steps": [
                f"'This' is used for something that is near (singular).",
                f"'That' is used for something that is far away (singular).",
                f"So the answer is 'that'.",
            ],
            "explanation": "We use 'this' for one thing near us, and 'that' for one thing far away.",
        }
    else:
        plural_near = r.choice(near_plural)
        plural_far = r.choice(far_plural)
        options = ["this", "that", "these", "those"]
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]

        return {
            "id": f"c1_eng_010_{seed_offset:04d}",
            "topic": "c1_eng_010",
            "topic_label": "Pronouns (this, that, these, those)",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Understand",
            "question": f"We say '{plural_near}'\nWe say ____ for things far away in the plural.",
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": "We use 'those' for many things that are far away.",
            "answer_key": opt_labels[options.index("those")],
            "steps": [
                f"'These' is used for things that are near (plural).",
                f"'Those' is used for things that are far away (plural).",
                f"So the answer is 'those'.",
            ],
            "explanation": "We use 'these' for many things near us, and 'those' for many things far away.",
        }


def gen_prepositions(seed_offset: int = 0) -> Dict:
    """c1_eng_011  Prepositions — Standard"""
    r = random.Random(seed_offset)
    objects = ["book", "ball", "cat", "pen", "bag", "doll", "cup", "chair"]
    places = ["table", "chair", "box", "floor", "bed", "desk", "shelf", "mat"]
    names = INDIAN_NAMES[:8]

    obj = r.choice(objects)
    place = r.choice(places)
    prep = r.choice(PREPOSITIONS[:5])  # in, on, under, near, behind

    sentences = {
        "in": f"The {obj} is in the {place}.",
        "on": f"The {obj} is on the {place}.",
        "under": f"The {obj} is under the {place}.",
        "near": f"The {obj} is near the {place}.",
        "behind": f"The {obj} is behind the {place}.",
    }

    answer_prep = prep
    wrong_preps = [p for p in ["in", "on", "under", "near", "behind"] if p != prep]
    r.shuffle(wrong_preps)
    options = [prep] + wrong_preps[:3]
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_011_{seed_offset:04d}",
        "topic": "c1_eng_011",
        "topic_label": "Prepositions",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Understand",
        "question": f"{sentences[prep]}\nWhich word shows the position?",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The word '{prep}' shows the position of the {obj}.",
        "answer_key": opt_labels[options.index(prep)],
        "steps": [
            f"The sentence tells us where the {obj} is.",
            f"The word '{prep}' tells us the position.",
            f"So '{prep}' is the preposition.",
        ],
        "explanation": f"A preposition shows where something is. In '{sentences[prep]}', the word '{prep}' tells us the position.",
    }


def gen_question_words(seed_offset: int = 0) -> Dict:
    """c1_eng_012  Question Words — Standard"""
    r = random.Random(seed_offset)
    q_type = r.choice(["who", "what", "where"])

    names = INDIAN_NAMES[:6]

    if q_type == "who":
        name = r.choice(names)
        answer = name
        wrong = r.sample([n for n in names if n != name], 3)
        options = [name] + wrong[:3]
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]
        return {
            "id": f"c1_eng_012_{seed_offset:04d}",
            "topic": "c1_eng_012",
            "topic_label": "Question Words",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Remember",
            "question": f"Who is reading a book?",
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": f"{name} is reading a book. 'Who' asks about a person.",
            "answer_key": opt_labels[options.index(name)],
            "steps": [
                f"'Who' is the question word we use to ask about a person.",
                f"{name} is a person.",
                f"So the answer is {name}.",
            ],
            "explanation": "We use 'Who' to ask about a person. The correct answer is the name of a person.",
        }

    elif q_type == "what":
        objects = ["apple", "mango", "book", "pen", "ball"]
        obj = r.choice(objects)
        wrong = r.sample([o for o in objects if o != obj], 3)
        options = [obj] + wrong[:3]
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]
        return {
            "id": f"c1_eng_012_{seed_offset:04d}",
            "topic": "c1_eng_012",
            "topic_label": "Question Words",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Remember",
            "question": f"What is Priya eating?",
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": f"Priya is eating {obj}. 'What' asks about a thing.",
            "answer_key": opt_labels[options.index(obj)],
            "steps": [
                f"'What' is the question word we use to ask about a thing.",
                f"{obj} is a thing.",
                f"So the answer is {obj}.",
            ],
            "explanation": "We use 'What' to ask about a thing or object. The correct answer is the name of a thing.",
        }

    else:
        places = ["park", "school", "home", "garden", "market"]
        place = r.choice(places)
        wrong = r.sample([p for p in places if p != place], 3)
        options = [place] + wrong[:3]
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]
        return {
            "id": f"c1_eng_012_{seed_offset:04d}",
            "topic": "c1_eng_012",
            "topic_label": "Question Words",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Remember",
            "question": f"Where is Rahul going?",
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": f"Rahul is going to the {place}. 'Where' asks about a place.",
            "answer_key": opt_labels[options.index(place)],
            "steps": [
                f"'Where' is the question word we use to ask about a place.",
                f"{place} is a place.",
                f"So the answer is {place}.",
            ],
            "explanation": "We use 'Where' to ask about a place or location. The correct answer is the name of a place.",
        }


def gen_cvc_word(seed_offset: int = 0) -> Dict:
    """c1_eng_015  Spelling and Word Building — Standard"""
    r = random.Random(seed_offset)
    word = pick_cvc()
    blanked = f"___{word[1]}{word[2]}"
    answer_letter = word[0]
    wrong_letters = r.sample([c for c in "bcdfghjklmnpqrstvwxyz" if c != answer_letter], 3)
    options = [answer_letter] + wrong_letters
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_015_{seed_offset:04d}",
        "topic": "c1_eng_015",
        "topic_label": "Spelling and Word Building",
        "type": "fill_blank",
        "difficulty": "easy",
        "bloom_level": "Apply",
        "question": f"Fill in the missing letter: {blanked}",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The missing letter is '{answer_letter}'. The word is '{word}'.",
        "answer_key": opt_labels[options.index(answer_letter)],
        "steps": [
            f"Look at the letters given: {word[1]}{word[2]}.",
            f"Sound them out: /{word[1]}/ /{word[2]}/",
            f"The missing first sound is '{answer_letter}'.",
            f"The complete word is '{word}'.",
        ],
        "explanation": f"To spell '{word}', we blend the sounds: '{answer_letter}' + '{word[1]}' + '{word[2]}' = '{word}'.",
    }


def gen_poem_comprehension(seed_offset: int = 0) -> Dict:
    """c1_eng_013  Poems and Rhymes — Competency-Based"""
    r = random.Random(seed_offset)
    poem = pick_poem()
    # pick a question type
    q_type = r.choice(["title", "line_count", "rhyming", "recite"])

    if q_type == "title":
        return {
            "id": f"c1_eng_013_{seed_offset:04d}",
            "topic": "c1_eng_013",
            "topic_label": "Poems and Rhymes",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Remember",
            "question": f"What is the title of this poem?\n\n" + "\n".join(poem["lines"]),
            "options": {"A": poem["title"], "B": "The Rainbow", "C": "My School", "D": "The Garden"},
            "answer": f"The title of the poem is '{poem['title']}'.",
            "answer_key": "A",
            "steps": [
                f"Read the poem carefully.",
                f"The title is given at the top of every poem.",
                f"The title is '{poem['title']}'.",
            ],
            "explanation": f"The title of a poem tells us what the poem is about. This poem is titled '{poem['title']}'.",
        }

    elif q_type == "line_count":
        num_lines = len(poem["lines"])
        options = [str(num_lines), str(num_lines - 1), str(num_lines + 1), str(num_lines + 2)]
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]
        return {
            "id": f"c1_eng_013_{seed_offset:04d}",
            "topic": "c1_eng_013",
            "topic_label": "Poems and Rhymes",
            "type": "mcq",
            "difficulty": "easy",
            "bloom_level": "Understand",
            "question": f"How many lines are there in the poem '{poem['title']}'?\n\n" + "\n".join(poem["lines"]),
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": f"The poem has {num_lines} lines.",
            "answer_key": opt_labels[options.index(str(num_lines))],
            "steps": [
                f"Count each line in the poem.",
            ] + [f"Line {i+1}: {poem['lines'][i]}" for i in range(num_lines)] + [
                f"Total lines = {num_lines}.",
            ],
            "explanation": f"We count the lines from top to bottom. The poem '{poem['title']}' has {num_lines} lines.",
        }

    elif q_type == "rhyming":
        w1, w2 = poem["rhyming_words"][0]
        wrong = pick_word_by_letter(r.choice(["a", "c", "d", "e", "g", "i", "l"]))
        options = [w2, wrong, pick_word_by_letter("m"), pick_word_by_letter("s")]
        options = list(set(options))
        while len(options) < 4:
            options.append(pick_word_by_letter("o"))
        options = options[:4]
        if w2 not in options:
            options[0] = w2
        r.shuffle(options)
        opt_labels = ["A", "B", "C", "D"]
        return {
            "id": f"c1_eng_013_{seed_offset:04d}",
            "topic": "c1_eng_013",
            "topic_label": "Poems and Rhymes",
            "type": "mcq",
            "difficulty": "medium",
            "bloom_level": "Analyze",
            "question": f"In the poem '{poem['title']}', which word rhymes with '{w1}'?\n\n" + "\n".join(poem["lines"]),
            "options": {opt_labels[i]: options[i] for i in range(4)},
            "answer": f"'{w2}' rhymes with '{w1}' in the poem '{poem['title']}'.",
            "answer_key": opt_labels[options.index(w2)],
            "steps": [
                f"Read the poem lines carefully.",
                f"Find the word '{w1}' in the poem.",
                f"Look for the word that sounds like '{w1}' at the end.",
                f"The rhyming word is '{w2}'.",
            ],
            "explanation": f"In the poem, words that end with the same sound rhyme. '{w1}' and '{w2}' have the same ending sound.",
        }

    else:  # recite / meaning
        moral_style_questions = [
            ("What is the poem about?", poem["title"], f"The poem '{poem['title']}' is about the topic in its title."),
        ]
        q, expected, ans_text = moral_style_questions[0]
        return {
            "id": f"c1_eng_013_{seed_offset:04d}",
            "topic": "c1_eng_013",
            "topic_label": "Poems and Rhymes",
            "type": "short_answer",
            "difficulty": "medium",
            "bloom_level": "Understand",
            "question": f"{q}\nPoem: '{poem['title']}'\n\n" + "\n".join(poem["lines"]),
            "options": {},
            "answer": ans_text,
            "answer_key": poem["title"],
            "steps": [
                f"Read the poem carefully.",
                f"The title is '{poem['title']}'.",
                f"The poem is about the topic mentioned in its title.",
            ],
            "explanation": f"The title of a poem tells us what the poem is about. This poem is titled '{poem['title']}'.",
        }


def gen_story_comprehension(seed_offset: int = 0) -> Dict:
    """c1_eng_014  Story Comprehension — Competency-Based"""
    r = random.Random(seed_offset)
    story = pick_story()
    # Pick a question from the story's built-in questions
    q_idx = seed_offset % len(story["questions"])
    question_text = story["questions"][q_idx]

    # Build the story text as a short paragraph
    story_text = " ".join(story["events"])

    answer = ""
    if q_idx == 0:
        answer = story["events"][0]
    elif q_idx == len(story["events"]) - 1:
        answer = story["events"][-1]
    else:
        answer = story["events"][q_idx] if q_idx < len(story["events"]) else story["events"][-1]

    return {
        "id": f"c1_eng_014_{seed_offset:04d}",
        "topic": "c1_eng_014",
        "topic_label": "Story Comprehension",
        "type": "short_answer",
        "difficulty": "medium",
        "bloom_level": "Understand",
        "question": f"Read the story and answer the question.\n\nStory: {story['title']}\n\n{story_text}\n\nQuestion: {question_text}",
        "options": {},
        "answer": answer,
        "answer_key": answer,
        "steps": [
            f"Read the story carefully.",
            f"Look for the part of the story that answers the question.",
            f"The question asks: {question_text}",
            f"From the story: {answer}",
        ],
        "explanation": f"To answer a comprehension question, we must find the relevant part in the story. The story '{story['title']}' tells us: {answer}",
    }


def gen_story_moral(seed_offset: int = 0) -> Dict:
    """c1_eng_014  Story Moral — Competency-Based"""
    r = random.Random(seed_offset)
    story = pick_story()
    wrong_morals = ["Honesty is the best policy.", "Do not be lazy.", "Always share your things.", "Work together."]
    r.shuffle(wrong_morals)
    options = [story["moral"]] + wrong_morals[:3]
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_014_moral_{seed_offset:04d}",
        "topic": "c1_eng_014",
        "topic_label": "Story Comprehension",
        "type": "mcq",
        "difficulty": "medium",
        "bloom_level": "Analyze",
        "question": f"What is the moral of the story '{story['title']}'?",
        "story_text": " ".join(story["events"]),
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The moral of the story is: {story['moral']}",
        "answer_key": opt_labels[options.index(story["moral"])],
        "steps": [
            f"Read the whole story: {' '.join(story['events'])}",
            f"Think about what lesson the story teaches us.",
            f"The moral is: {story['moral']}",
        ],
        "explanation": f"The moral of a story is the lesson it teaches us. In '{story['title']}', the lesson is: {story['moral']}",
    }


def gen_missing_letter(seed_offset: int = 0) -> Dict:
    """c1_eng_002  Missing Letter (Phonics) — Standard"""
    r = random.Random(seed_offset)
    word = pick_cvc()
    pos = r.randint(0, 2)  # which letter to blank
    display = list(word)
    display[pos] = "_"
    blanked = "".join(display)
    correct = word[pos]
    wrong_letters = r.sample([c for c in "abcdefghijklmnopqrstuvwxyz" if c != correct], 3)
    options = [correct] + wrong_letters
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_002_ml_{seed_offset:04d}",
        "topic": "c1_eng_002",
        "topic_label": "Phonics and Letter Sounds",
        "type": "fill_blank",
        "difficulty": "medium",
        "bloom_level": "Apply",
        "question": f"Fill in the missing letter: {blanked}",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The missing letter is '{correct}'. The word is '{word}'.",
        "answer_key": opt_labels[options.index(correct)],
        "steps": [
            f"Look at the word with a missing letter: {blanked}",
            f"Sound out the word.",
            f"The missing letter is '{correct}'.",
            f"The complete word is '{word}'.",
        ],
        "explanation": f"We sound out the word '{word}'. The letter '{correct}' fits in the blank to make the word complete.",
    }


def gen_a_an(seed_offset: int = 0) -> Dict:
    """Standard: a / an usage — Standard"""
    r = random.Random(seed_offset)
    vowel_start = ["apple", "egg", "orange", "umbrella", "elephant", "ice", "onion"]
    cons_start = ["cat", "dog", "ball", "book", "pen", "mango", "tree", "school"]
    use_an = r.choice([True, False])
    if use_an:
        word = r.choice(vowel_start)
        correct = "an"
        wrong = "a"
    else:
        word = r.choice(cons_start)
        correct = "a"
        wrong = "an"

    options = [correct, wrong, "the", "this"]
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_016_{seed_offset:04d}",
        "topic": "c1_eng_016",
        "topic_label": "Articles (a, an, the)",
        "type": "mcq",
        "difficulty": "easy",
        "bloom_level": "Apply",
        "question": f"Choose the correct article: '____ {word}'",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"We use '{correct}' before '{word}' because it starts with a '{'vowel' if use_an else 'consonant'}' sound.",
        "answer_key": opt_labels[options.index(correct)],
        "steps": [
            f"Look at the word '{word}'.",
            f"It starts with the letter '{word[0].upper()}'.",
            f"We use '{correct}' before words starting with a {'vowel' if use_an else 'consonant'} sound.",
            f"So we say '{correct} {word}'.",
        ],
        "explanation": f"We use 'an' before words that start with a vowel sound (a, e, i, o, u) and 'a' before words that start with a consonant sound. '{word}' starts with '{word[0]}', so we use '{correct}'.",
    }


def gen_capitalization_sentence(seed_offset: int = 0) -> Dict:
    """Competency: Fix the capitalization — Competency-Based"""
    r = random.Random(seed_offset)
    name = r.choice(INDIAN_NAMES)
    place = r.choice(["park", "school", "garden", "market", "temple"])
    noun = r.choice(["cat", "dog", "bird", "ball", "book"])
    verb = r.choice(["plays", "reads", "eats", "sees", "likes"])

    correct_sentence = f"{name} {verb} in the {place}."
    wrong_sentence = f"{name.lower()} {verb} in the {place}."

    return {
        "id": f"c1_eng_008_cap_{seed_offset:04d}",
        "topic": "c1_eng_008",
        "topic_label": "Capital Letters and Small Letters",
        "type": "short_answer",
        "difficulty": "medium",
        "bloom_level": "Apply",
        "question": f"Rewrite the sentence with correct capital letters:\n'{wrong_sentence}'",
        "options": {},
        "answer": correct_sentence,
        "answer_key": correct_sentence,
        "steps": [
            f"Read the sentence: '{wrong_sentence}'",
            f"Rule: Every sentence starts with a capital letter.",
            f"Rule: Every name starts with a capital letter.",
            f"The correct sentence is: '{correct_sentence}'",
        ],
        "explanation": f"In a sentence, the first letter is always a capital letter. Names like '{name}' also start with a capital letter. So the correct sentence is '{correct_sentence}'.",
    }


def gen_ordering_sentences(seed_offset: int = 0) -> Dict:
    """Competency: Put the sentences in order — Competency-Based"""
    r = random.Random(seed_offset)
    name = r.choice(INDIAN_NAMES)
    obj = r.choice(["apple", "mango", "book", "bag", "pen"])
    place = r.choice(["school bag", "desk", "pocket", "hand"])

    # Create 3-sentence story
    sentences = [
        f"{name} finds a {obj}.",
        f"{name} puts the {obj} in {name}'s {place}.",
        f"{name} is very happy.",
    ]
    shuffled = sentences[:]
    r.shuffle(shuffled)
    correct_order = "1-2-3"  # based on sentences list order

    return {
        "id": f"c1_eng_017_ord_{seed_offset:04d}",
        "topic": "c1_eng_017",
        "topic_label": "Sentence Ordering",
        "type": "ordering",
        "difficulty": "medium",
        "bloom_level": "Analyze",
        "question": f"Arrange these sentences in the correct order to make a story:\n\n1. {shuffled[0]}\n2. {shuffled[1]}\n3. {shuffled[2]}",
        "options": {},
        "answer": f"Correct order:\n1. {sentences[0]}\n2. {sentences[1]}\n3. {sentences[2]}",
        "answer_key": "1-2-3",
        "steps": [
            f"Read all three sentences.",
            f"Find the sentence that begins the story (first event).",
            f"Find what happens next.",
            f"Find the ending sentence.",
            f"Correct order: 1 -> 2 -> 3",
        ],
        "explanation": f"A story has a beginning, middle, and end. First {name} finds the {obj}, then puts it away, and feels happy at the end.",
    }


def gen_opposites(seed_offset: int = 0) -> Dict:
    """Competency: Opposites — Competency-Based"""
    r = random.Random(seed_offset)
    opposites = [
        ("big", "small"), ("hot", "cold"), ("tall", "short"),
        ("happy", "sad"), ("day", "night"), ("up", "down"),
        ("in", "out"), ("open", "close"), ("fast", "slow"),
        ("hard", "soft"), ("good", "bad"), ("old", "new"),
    ]
    word, opposite = r.choice(opposites)
    wrong = r.sample([o for _, o in opposites if o != opposite and _ != word], 3)
    wrong = list(set(wrong))
    while len(wrong) < 3:
        wrong.append(r.choice([o for _, o in opposites])[1])
    wrong = wrong[:3]
    options = [opposite] + wrong
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_018_{seed_offset:04d}",
        "topic": "c1_eng_018",
        "topic_label": "Opposites",
        "type": "mcq",
        "difficulty": "medium",
        "bloom_level": "Understand",
        "question": f"What is the opposite of '{word}'?",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The opposite of '{word}' is '{opposite}'.",
        "answer_key": opt_labels[options.index(opposite)],
        "steps": [
            f"The word given is '{word}'.",
            f"Opposite words have different or opposite meanings.",
            f"'{word}' means the opposite of '{opposite}'.",
            f"So the opposite of '{word}' is '{opposite}'.",
        ],
        "explanation": f"Opposite words mean the reverse of each other. '{word}' and '{opposite}' are opposites.",
    }


def gen_fill_blank_verb(seed_offset: int = 0) -> Dict:
    """Competency: Fill in the correct action word — Competency-Based"""
    r = random.Random(seed_offset)
    name = r.choice(INDIAN_NAMES)
    verb = r.choice(["running", "jumping", "reading", "eating", "singing", "playing"])
    base = verb.rstrip("ing")
    wrong_verbs = r.sample([v for v in VERBS_SIMPLE if v != base], 3)
    options = [base] + wrong_verbs[:3]
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_006_fb_{seed_offset:04d}",
        "topic": "c1_eng_006",
        "topic_label": "Action Words (Verbs)",
        "type": "fill_blank",
        "difficulty": "medium",
        "bloom_level": "Apply",
        "question": f"{name} is _____. Choose the correct word.\nThe sentence describes what {name.split()[0]} is doing.",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The correct word is '{base}'. '{name} is {verb}' means {name.split()[0]} is doing the action of '{base}'.",
        "answer_key": opt_labels[options.index(base)],
        "steps": [
            f"The sentence says '{name} is {verb}'.",
            f"We need to find the action word (verb) that matches.",
            f"The base form is '{base}'.",
        ],
        "explanation": f"Action words tell us what someone is doing. When we see 'is {verb}', the action word is '{base}'.",
    }


def gen_read_sentences(seed_offset: int = 0) -> Dict:
    """Competency: Read and answer from simple sentences — Competency-Based"""
    r = random.Random(seed_offset)
    name1 = r.choice(INDIAN_NAMES)
    name2 = r.choice([n for n in INDIAN_NAMES if n != name1])
    obj = r.choice(["red pen", "blue bag", "green mango", "yellow book", "white cat"])
    action = r.choice(["has", "likes", "sees", "finds", "wants"])

    sentences = f"{name1} {action} a {obj}.\n{name2} {r.choice(['likes', 'has', 'sees', 'reads'])} a {r.choice(['book', 'ball', 'mango', 'cup'])}."

    q_type = r.choice(["who", "what_object", "color"])
    if q_type == "who":
        q = f"Who {action} a {obj}?"
        a = name1
    elif q_type == "what_object":
        q = f"What does {name1} {action.rstrip('s')}?"
        a = obj
    else:
        color = obj.split()[0]
        q = f"What color is the object that {name1} {action}?"
        a = color

    return {
        "id": f"c1_eng_014_read_{seed_offset:04d}",
        "topic": "c1_eng_014",
        "topic_label": "Reading Comprehension",
        "type": "short_answer",
        "difficulty": "medium",
        "bloom_level": "Understand",
        "question": f"Read the sentences below and answer the question.\n\n{sentences}\n\nQuestion: {q}",
        "options": {},
        "answer": a,
        "answer_key": a,
        "steps": [
            f"Read the sentences: {sentences.replace(chr(10), ' ')}",
            f"Find the sentence that answers the question.",
            f"The question asks: {q}",
            f"The answer is: {a}",
        ],
        "explanation": f"Read the sentences carefully and find the part that answers the question. The answer is '{a}'.",
    }


def gen_matching_words(seed_offset: int = 0) -> Dict:
    """Competency: Match the word to its picture description — Competency-Based"""
    r = random.Random(seed_offset)
    desc_word_pairs = [
        ("We drink it every morning.", "milk"),
        ("It is yellow and grows on trees.", "mango"),
        ("It flies in the sky.", "bird"),
        ("It has four legs and says meow.", "cat"),
        ("It is round and we play with it.", "ball"),
        ("We write with it.", "pen"),
        ("It shines in the sky at night.", "moon"),
        ("It is red and we read in it.", "book"),
        ("It barks and is a pet.", "dog"),
        ("It grows in a garden and smells good.", "flower"),
    ]
    desc, word = r.choice(desc_word_pairs)
    wrong_words = r.sample([w for _, w in desc_word_pairs if w != word], 3)
    wrong_words = list(set(wrong_words))
    while len(wrong_words) < 3:
        wrong_words.append(r.choice([w for _, w in desc_word_pairs]))
    options = [word] + wrong_words[:3]
    r.shuffle(options)
    opt_labels = ["A", "B", "C", "D"]

    return {
        "id": f"c1_eng_005_match_{seed_offset:04d}",
        "topic": "c1_eng_005",
        "topic_label": "Naming Words (Nouns)",
        "type": "mcq",
        "difficulty": "medium",
        "bloom_level": "Apply",
        "question": f"Read the description and choose the correct naming word (noun).\n\nDescription: {desc}",
        "options": {opt_labels[i]: options[i] for i in range(4)},
        "answer": f"The word '{word}' matches the description: {desc}",
        "answer_key": opt_labels[options.index(word)],
        "steps": [
            f"Read the description carefully: '{desc}'",
            f"Think of what the description is talking about.",
            f"'{word}' is the naming word that matches this description.",
            f"So the answer is '{word}'.",
        ],
        "explanation": f"The description tells us about something. We use our reading and thinking skills to match it with the correct naming word: '{word}'.",
    }


# ============================================================
#  QUESTION REGISTRY
# ============================================================

ALL_GENERATORS = [
    ("c1_eng_001", "Alphabet Recognition", gen_alphabet_recognition),
    ("c1_eng_002", "Phonics and Letter Sounds", gen_phonics_sound),
    ("c1_eng_003", "Rhyming Words", gen_rhyming_words),
    ("c1_eng_005", "Naming Words (Nouns)", gen_naming_words),
    ("c1_eng_006", "Action Words (Verbs)", gen_action_words),
    ("c1_eng_007", "Describing Words (Adjectives)", gen_describing_words),
    ("c1_eng_008", "Capital Letters and Small Letters", gen_capital_small),
    ("c1_eng_009", "Punctuation", gen_punctuation),
    ("c1_eng_010", "Pronouns (this, that, these, those)", gen_pronouns),
    ("c1_eng_011", "Prepositions", gen_prepositions),
    ("c1_eng_012", "Question Words", gen_question_words),
    ("c1_eng_013", "Poems and Rhymes", gen_poem_comprehension),
    ("c1_eng_014", "Story Comprehension", gen_story_comprehension),
    ("c1_eng_015", "Spelling and Word Building", gen_cvc_word),
    ("c1_eng_016", "Articles (a, an, the)", gen_a_an),
    ("c1_eng_018", "Opposites", gen_opposites),
    # Competency-based generators
    ("c1_eng_c01", "Story Moral (Competency)", gen_story_moral),
    ("c1_eng_c02", "Missing Letter (Competency)", gen_missing_letter),
    ("c1_eng_c03", "Capitalization Fix (Competency)", gen_capitalization_sentence),
    ("c1_eng_c04", "Sentence Ordering (Competency)", gen_ordering_sentences),
    ("c1_eng_c05", "Verb Fill-in-Blank (Competency)", gen_fill_blank_verb),
    ("c1_eng_c06", "Reading Comprehension (Competency)", gen_read_sentences),
    ("c1_eng_c07", "Match Description to Noun (Competency)", gen_matching_words),
]

# Separate standard vs competency-based
STANDARD_IDS = [g[0] for g in ALL_GENERATORS if not g[0].startswith("c1_eng_c")]
COMPETENCY_IDS = [g[0] for g in ALL_GENERATORS if g[0].startswith("c1_eng_c")]


# ============================================================
#  MAIN API
# ============================================================

def generate_questions(seed: int, count: int, topic: str = None) -> list:
    """
    Generate 'count' deterministic questions.

    Args:
        seed: Random seed for reproducibility.
        count: Number of questions to generate.
        topic: Optional topic filter (e.g. 'c1_eng_001').

    Returns:
        List of question dicts, each with keys:
            id, topic, topic_label, type, difficulty, bloom_level,
            question, options, answer, answer_key, steps, explanation
    """
    random.seed(seed)
    questions = []

    # Build a filterable list
    available = ALL_GENERATORS
    if topic:
        available = [g for g in ALL_GENERATORS if g[0] == topic]
        if not available:
            available = ALL_GENERATORS  # fallback

    for i in range(count):
        # Alternate between standard and competency to maintain 50/50 split
        if i % 2 == 0:
            pool = [g for g in available if not g[0].startswith("c1_eng_c")]
            if not pool:
                pool = available
        else:
            pool = [g for g in available if g[0].startswith("c1_eng_c")]
            if not pool:
                pool = available

        chosen = random.choice(pool)
        topic_id, topic_label, gen_fn = chosen
        question = gen_fn(seed_offset=seed + i)
        questions.append(question)

    return questions


def get_topics() -> list:
    """Return list of all available (topic_id, topic_label) pairs."""
    return [(tid, label) for tid, label, _ in ALL_GENERATORS]


# ============================================================
#  MAIN
# ============================================================

def main():
    print("=" * 70)
    print("CISCE Class 1 English - Deterministic Question Generator")
    print("=" * 70)
    print()

    print("Available Topics:")
    print("-" * 50)
    for tid, label in get_topics():
        print(f"  {tid:20s}  {label}")
    print()

    # Demonstrate with a fixed seed
    demo_seed = 42
    demo_count = 8

    print(f"Generating {demo_count} sample questions (seed={demo_seed})...")
    print("=" * 70)
    print()

    questions = generate_questions(seed=demo_seed, count=demo_count)

    for idx, q in enumerate(questions, 1):
        print(f"--- Question {idx} [{q['topic_label']}] ---")
        print(f"Type       : {q['type']}")
        print(f"Difficulty : {q['difficulty']}")
        print(f"Bloom Level: {q['bloom_level']}")
        print(f"Question   : {q['question']}")
        if q.get("options"):
            print("Options    :")
            for key, val in sorted(q["options"].items()):
                print(f"               {key}) {val}")
        print(f"Answer     : {q['answer']}")
        if q.get("steps"):
            print("Steps      :")
            for step in q["steps"]:
                print(f"               - {step}")
        print(f"Explanation: {q['explanation']}")
        print()

    # Demonstrate per-topic generation
    print("=" * 70)
    print("Generating 3 Alphabet Recognition questions (topic=c1_eng_001):")
    print("=" * 70)
    print()

    topic_questions = generate_questions(seed=100, count=3, topic="c1_eng_001")
    for idx, q in enumerate(topic_questions, 1):
        print(f"--- Q{idx}: {q['question']}")
        if q.get("options"):
            for key, val in sorted(q["options"].items()):
                print(f"  {key}) {val}")
        print(f"  Answer: {q['answer_key']} -- {q['answer']}")
        print()

    # Demonstrate determinism: same seed -> same questions
    print("=" * 70)
    print("Determinism check: same seed = same output")
    print("=" * 70)
    q1 = generate_questions(seed=77, count=3)
    q2 = generate_questions(seed=77, count=3)
    all_match = True
    for a, b in zip(q1, q2):
        if a["id"] != b["id"] or a["question"] != b["question"]:
            all_match = False
            break
    print(f"  Seed 77 generates identical questions twice: {all_match}")
    print()

    # Show topic distribution
    print("=" * 70)
    print("Topic distribution in generated questions:")
    print("=" * 70)
    all_q = generate_questions(seed=1, count=20)
    topic_counts = {}
    for q in all_q:
        tid = q["topic"]
        topic_counts[tid] = topic_counts.get(tid, 0) + 1
    for tid, cnt in sorted(topic_counts.items()):
        label = dict([(t, l) for t, l, _ in ALL_GENERATORS]).get(tid, tid)
        print(f"  {tid:20s} {label:40s} {cnt}")
    print()
    print("Done.")


if __name__ == "__main__":
    main()