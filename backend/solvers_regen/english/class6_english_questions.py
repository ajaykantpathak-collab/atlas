"""
CISCE Class 6 English — Deterministic Question Generator
Covers the full CISCE Class 6 English syllabus:
  Reading (Prose, Poetry, Comprehension)
  Writing (Notice, Letter, Diary, Story, Paragraph)
  Grammar (Tenses, Parts of Speech, Reported Speech, Active/Passive,
           Prepositions, Conjunctions, Determiners, Punctuation,
           Subject-Verb Agreement, Sentence Transformation)
  Vocabulary (Synonyms, Antonyms, One-word Substitutes)
"""

import random
import re
import string
import hashlib
from fractions import Fraction
from math import floor
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

# ──────────────────────────────────────────────────────────────
#  DATA  (syllabus-linked, pure Python, no external deps)
# ──────────────────────────────────────────────────────────────

INDIAN_NAMES = [
    "Rahul", "Priya", "Aarav", "Anaya", "Vihaan", "Diya",
    "Ishaan", "Kavya", "Arjun", "Saanvi", "Aditya", "Meera",
    "Rohan", "Pooja", "Karthik", "Neha", "Dev", "Isha",
    "Yash", "Riya", "Ved", "Sia", "Aryan", "Tara",
]

INDIAN_PLACES = [
    "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai",
    "Hyderabad", "Pune", "Jaipur", "Lucknow", "Ahmedabad",
    "Goa", "Kerala", "Himachal Pradesh", "Rajasthan", "Tamil Nadu",
    "New Delhi", "Varanasi", "Agra", "Darjeeling", "Mysore",
]

INDIAN_CITIES_SHORT = [
    "Mumbai", "Delhi", "Bangalore", "Kolkata", "Chennai",
    "Hyderabad", "Pune", "Jaipur", "Lucknow", "Goa",
    "Varanasi", "Agra", "Mysore", "Coimbatore", "Patna",
]

MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

WEEKDAYS = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
]

SEASONS = ["summer", "monsoon", "winter", "spring", "autumn"]

FESTIVALS = [
    "Diwali", "Holi", "Dussehra", "Eid", "Christmas",
    "Pongal", "Baisakhi", "Onam", "Ganesh Chaturthi", "Raksha Bandhan",
]

ANIMALS = ["dog", "cat", "elephant", "tiger", "monkey", "rabbit", "lion", "deer", "cow", "horse"]

BIRDS = ["sparrow", "crow", "parrot", "eagle", "peacock", "kingfisher", "owl"]

TREES = ["banyan", "mango", "neem", "peepal", "coconut", "teak", "bamboo"]

FLOWERS = ["rose", "marigold", "lotus", "jasmine", "sunflower", "hibiscus"]

FOODS = ["rice", "roti", "dal", "curry", "sambar", "idli", "dosa", "poha", "paratha", "lassi"]

SUBJECTS = ["Mathematics", "Science", "History", "Geography", "English", "Hindi", "Computer Science"]

PROSE_PASSAGES = {
    "dog_master": {
        "title": "How the Dog Found Himself a New Master",
        "author": "Traditional Folk Tale",
        "paragraphs": [
            "Once upon a time, long ago, dogs roamed the forests freely. They were their own masters. But life in the wild was not easy. The dog had to hunt for food every day. He had to be careful of stronger animals like wolves and bears that might attack him. One day, the dog thought, 'Life would be much easier if I found someone stronger to serve. That way, I would get food and shelter.'",
            "The dog first went to a wolf and said, 'Will you be my master? You are strong and fierce.' The wolf agreed. But soon the dog saw that the wolf was afraid of a bear. So the dog left the wolf and went to the bear. The bear agreed to be the dog's master. But one day the bear ran away from a lion. The dog then thought, 'The lion is the strongest of all.'",
            "The dog went to the lion and said, 'You are the strongest animal. Will you be my master?' The lion agreed and the dog served him faithfully. But one day the lion saw a man walking through the forest and the lion became afraid. The dog realised that man was stronger than even the lion. So the dog went to man and said, 'Will you be my master?' The man agreed. To this day, the dog remains man's most loyal servant.",
        ],
    },
    "battle_blenheim": {
        "title": "The Battle of Blenheim",
        "author": "Robert Southey",
        "paragraphs": [
            "It was a summer evening. Old Kasper was sitting outside his cottage with his grandchildren, Wilhelmine and Peterkin. The children were playing on the green. Peterkin found a round object near the stream. He rolled it in his hand and looked at it curiously. 'What have you found there, Peterkin?' asked Wilhelmine. 'A ball,' said Peterkin. 'I found it hard by the fountain, and it is quite round.'",
            "Old Kasper took the object and examined it. He told the children it was a skull, one of the many thousands that had been found on the battlefield of Blenheim. When Wilhelmine asked why so many men had died there, Kaspar said it was a famous victory. But when Peterkin asked what good came of it, old Kaspar could only repeat, 'The English have won the battle.' He had heard the story from his father, but he did not truly understand why so many lives had been lost for a victory.",
        ],
    },
    "monkey_woodcutter": {
        "title": "The Monkey and the Woodcutter",
        "author": "A Folk Tale",
        "paragraphs": [
            "In a dense forest, there lived a woodcutter named Gopal. Every day he went into the forest to cut wood and sold it in the nearby village. One day, while cutting a tree, his axe slipped and fell into a deep river. Gopal was very sad because that was his only axe and he could not earn his living without it. He sat by the riverbank weeping.",
            "A kind monkey who lived on a banyan tree near the river saw Gopal crying. The monkey asked him what the matter was. Gopal told the monkey about his lost axe. The monkey dived into the river and came back with a golden axe. Gopal shook his head and said, 'That is not my axe. My axe had a wooden handle and an iron blade.' The monkey dived again and brought a silver axe. Gopal said, 'That is not mine either.' The monkey then brought an iron axe with a wooden handle. Gopal smiled and said, 'Yes, that is my axe.' The monkey was pleased with Gopal's honesty and gave him all three axes as a gift. Gopal thanked the monkey and returned home happily.",
        ],
    },
    "tale_two_birds": {
        "title": "A Tale of Two Birds",
        "author": "A J Vogel",
        "paragraphs": [
            "Once upon a time, two birds were born in the same nest on the top of a banyan tree in a forest. Their mother looked after them with great love and care. One day a terrible storm came. The mother bird died in the storm and the two baby birds were blown away by the strong wind. One bird landed near a cave of robbers in the forest. The other bird landed near a hermitage where a rishi lived.",
            "Years passed. The bird near the robbers' cave learned to talk like robbers. He would steal things and run away. The bird near the rishi's hermitage learned to welcome guests with kind words. One day, a king lost his way in the forest. He heard both birds. The first bird said, 'Run away, or I will kill you and steal your jewels.' The second bird said, 'Come in, dear guest, and rest in the shade. Our rishi will be here soon.' The king was confused but understood that where we live shapes how we speak and behave.",
        ],
    },
    "an_alien_hand": {
        "title": "An Alien Hand",
        "author": "Salim Ali",
        "paragraphs": [
            "The narrator, a young boy, lived with his parents on the banks of the river Satluj in a small town in Himachal Pradesh. The area was surrounded by dense forests and many wild animals lived there. One day, a baby tortoise named Kiko came into their home. The narrator's father explained that Kiko's shell had a strange curve on one side. The narrator named it 'Kiko' and grew fond of it.",
            "As Kiko grew, the narrator noticed something strange. Kiko's shell was becoming more and more twisted. The narrator's father said it was because the tortoise was turning and twisting inside its shell. But the real reason was more mysterious. The narrator learned that tortoises in that area had been affected by the strange effects of the nuclear tests conducted nearby. The nuclear tests had created an 'alien hand' - something unnatural that was affecting the lives of the animals in the region. It was a reminder of how human actions can harm innocent creatures.",
        ],
    },
}

POETRY_PASSAGES = {
    "beautiful_serpent": {
        "title": "The Beautiful Serpent",
        "author": "Anonymous",
        "stanzas": [
            "There came a serpent to my window,\n"
            "A creature beautiful and bright,\n"
            "With golden eyes that seemed to glow,\n"
            "And scales that shimmered in the light.",
            "\n"
            "I sat quite still and watched him glide,\n"
            "A pattern brown and black and gold,\n"
            "The most magnificent thing I spied,\n"
            "A wonder to behold.",
            "\n"
            "I thought at first it was a rope,\n"
            "But then it raised its regal head,\n"
            "And showed me how it truly woke,\n"
            "A living grace of green and red.",
            "\n"
            "I learned that beauty comes in strange forms,\n"
            "That danger and grace can share a form,\n"
            "And creatures that we fear and scorn,\n"
            "Can show us wonders we never saw before.",
        ],
    },
    "sweet_truth": {
        "title": "The Sweets of Truth",
        "author": "Anonymous",
        "stanzas": [
            "Truth is like a sweet, sweet fruit,\n"
            "That ripens slowly on the tree of life,\n"
            "It may be bitter to the taste at first,\n"
            "But heals the wounds of every strife.",
            "\n"
            "A lie may rush like a stormy wind,\n"
            "And carry us away from what is right,\n"
            "But truth stands firm like the banyan tree,\n"
            "Rooted deep, bathed in golden light.",
            "\n"
            "Speak the truth, however hard it seems,\n"
            "For honesty is the noblest part,\n"
            "The sweetest fruit of life's great scheme,\n"
            "Is the pure and honest heart.",
        ],
    },
    "vamban": {
        "title": "Vamban (The Noise)",
        "author": "Traditional",
        "stanzas": [
            "The village was loud with vamban,\n"
            "Children shouting, bells ringing,\n"
            "Cows lowing and birds singing,\n"
            "Life in every corner was swinging.",
        ],
    },
    "my_place": {
        "title": "My Place",
        "author": "Anonymous",
        "stanzas": [
            "My place is where the peacocks dance,\n"
            "Where mango trees give us their bounty,\n"
            "Where the monsoon brings romance,\n"
            "And evenings smell of fresh jasmine and coffee.",
        ],
    },
    "what_others_say": {
        "title": "What They Say",
        "author": "Anonymous",
        "stanzas": [
            "People say this, people say that,\n"
            "Like the wind that blows so flat,\n"
            "But the wise one keeps his own counsel,\n"
            "And follows what his heart tells him.",
        ],
    },
}

# Grammar data
ARTICLES_EXAMPLES = [
    ("a", "I saw ___ cat sitting on ___ wall.", "a, a"),
    ("an", "She ate ___ orange for ___ breakfast.", "an, /"),
    ("the", "___ Ganga is ___ longest river in India.", "The, the"),
    ("a/an", "Rahul bought ___ umbrella on ___ rainy day.", "an, a"),
    ("the", "___ Taj Mahal is in ___ Agra.", "The, /"),
    ("a/an", "Priya is ___ honest girl. She is ___ MBA graduate.", "an, an"),
    ("the", "___ earth moves around ___ sun.", "The, the"),
]

PREPOSITIONS_LIST = [
    ("at", "We meet ___ 5 o'clock.", "at"),
    ("in", "She lives ___ Mumbai.", "in"),
    ("on", "The book is ___ the table.", "on"),
    ("to", "We are going ___ school.", "to"),
    ("from", "He came ___ Delhi.", "from"),
    ("with", "I went ___ my friend.", "with"),
    ("by", "I travel ___ bus.", "by"),
    ("for", "This gift is ___ you.", "for"),
    ("about", "Tell me ___ yourself.", "about"),
    ("into", "The frog jumped ___ the pond.", "into"),
]

CONJUNCTIONS_LIST = [
    ("and", "Rahul is tall ___ Priya is short.", "and"),
    ("but", "It was raining, ___ we went out.", "but"),
    ("or", "Do you want tea ___ coffee?", "or"),
    ("because", "He was late ___ he missed the bus.", "because"),
    ("so", "It was very hot, ___ I drank water.", "so"),
    ("although", "___ it rained, the match continued.", "Although"),
    ("if", "___ it rains tomorrow, we will stay home.", "If"),
]

TENSES_LIST = [
    ("Simple Present", "I ___ (play) cricket every Sunday.", "play"),
    ("Simple Past", "She ___ (go) to Goa last month.", "went"),
    ("Simple Future", "They ___ (visit) the temple tomorrow.", "will visit"),
    ("Present Continuous", "The children ___ (play) in the garden now.", "are playing"),
    ("Past Continuous", "He ___ (read) when I called.", "was reading"),
    ("Present Perfect", "We ___ (finish) our homework already.", "have finished"),
    ("Present Perfect Continuous", "She ___ (study) for two hours.", "has been studying"),
    ("Future Continuous", "I ___ (work) at 8 PM tomorrow.", "will be working"),
]

PARTS_OF_SPEECH = [
    ("noun", "The ___ of the dog is Tommy.", "name"),
    ("verb", "The bird can ___ very high.", "fly"),
    ("adjective", "The ___ girl sang beautifully.", "young"),
    ("adverb", "He runs ___.", "quickly"),
    ("pronoun", "___ went to the market yesterday.", "She"),
    ("preposition", "The cat is ___ the mat.", "on"),
    ("conjunction", "I like tea ___ coffee.", "and"),
    ("interjection", "___, that was a great catch!", "Wow"),
    ("article", "___ cat is sleeping on ___ sofa.", "The, the"),
    ("determiner", "I have ___ apples in my bag.", "three"),
]

REPORTED_SPEECH_DIRECT = [
    ("Rahul said, 'I am going to school.'",
     "Rahul said that he was going to school."),
    ("Priya said, 'I like mangoes.'",
     "Priya said that she liked mangoes."),
    ("The teacher said, 'The earth moves around the sun.'",
     "The teacher said that the earth moves around the sun."),
    ("Arjun said, 'I will finish my homework tonight.'",
     "Arjun said that he would finish his homework that night."),
    ("Mother said, 'Do not waste water.'",
     "Mother told them not to waste water."),
    ("The guide said, 'The Taj Mahal is in Agra.'",
     "The guide said that the Taj Mahal is in Agra."),
    ("Saanvi said, 'I am reading a book.'",
     "Saanvi said that she was reading a book."),
    ("Father said, 'I bought a new car yesterday.'",
     "Father said that he had bought a new car the day before."),
]

ACTIVE_PASSIVE_PAIRS = [
    ("The cat killed the rat.", "The rat was killed by the cat."),
    ("The teacher taught the lesson.", "The lesson was taught by the teacher."),
    ("Rahul will eat the mango.", "The mango will be eaten by Rahul."),
    ("Priya is writing a letter.", "A letter is being written by Priya."),
    ("The gardener waters the plants.", "The plants are watered by the gardener."),
    ("The children sang a song.", "A song was sung by the children."),
    ("The postman delivered the letter.", "The letter was delivered by the postman."),
    ("Aarav broke the window.", "The window was broken by Aarav."),
]

ADJECTIVE_ADVERB_PAIRS = [
    ("quick", "quickly"), ("happy", "happily"), ("careful", "carefully"),
    ("easy", "easily"), ("sad", "sadly"), ("brave", "bravely"),
    ("slow", "slowly"), ("bright", "brightly"), ("gentle", "gently"),
    ("noisy", "noisily"), ("sudden", "suddenly"), ("quiet", "quietly"),
]

SINGULAR_PLURAL = [
    ("child", "children"), ("mouse", "mice"), ("ox", "oxen"),
    ("foot", "feet"), ("tooth", "teeth"), ("sheep", "sheep"),
    ("man", "men"), ("woman", "women"), ("book", "books"),
    ("city", "cities"), ("baby", "babies"), ("knife", "knives"),
    ("bus", "buses"), ("potato", "potatoes"), ("hero", "heroes"),
]

SUBJECT_VERB_AGREEMENT = [
    ("The dog ___ (bark) loudly.", "barks"),
    ("The dogs ___ (bark) loudly.", "bark"),
    ("The boy ___ (play) cricket.", "plays"),
    ("The boys ___ (play) cricket.", "play"),
    ("The cat ___ (eat) fish.", "eats"),
    ("The cats ___ (eat) fish.", "eat"),
    ("She ___ (write) a letter.", "writes"),
    ("They ___ (write) a letter.", "write"),
    ("The teacher ___ (teach) us.", "teaches"),
    ("The teachers ___ (teach) us.", "teach"),
]

SYNONYMS_DICT = {
    "beautiful": "lovely",
    "happy": "glad",
    "sad": "unhappy",
    "big": "large",
    "small": "tiny",
    "fast": "quick",
    "begin": "start",
    "end": "finish",
    "angry": "furious",
    "brave": "courageous",
    "difficult": "hard",
    "easy": "simple",
    "clever": "smart",
    "kind": "good",
    "smart": "intelligent",
    "important": "significant",
    "correct": "right",
    "wrong": "incorrect",
    "ancient": "old",
    "famous": "well-known",
}

ANTONYMS_DICT = {
    "beautiful": "ugly",
    "happy": "sad",
    "big": "small",
    "fast": "slow",
    "hot": "cold",
    "day": "night",
    "boy": "girl",
    "rich": "poor",
    "true": "false",
    "new": "old",
    "full": "empty",
    "light": "dark",
    "hard": "soft",
    "thick": "thin",
    "young": "old",
    "love": "hate",
    "give": "take",
    "victory": "defeat",
    "polite": "rude",
    "tall": "short",
}

PUNCTUATION_RULES = [
    ("She said, 'I am hungry.'", "Use comma and inverted commas for direct speech."),
    ("Are you coming? Yes, I am.", "Use question mark for questions."),
    ("Alas! We have lost the match.", "Use exclamation mark for strong feelings."),
    ("I have three pens, two books, and one eraser.", "Use commas to separate items in a list."),
    ("My address is: 12, MG Road, Mumbai.", "Use colon to introduce a list."),
    ("Did you eat? Yes, I ate.", "Use question mark for direct questions."),
    ("Wait! There is a snake.", "Use exclamation for sudden commands or surprises."),
    ("He said that he was tired.", "Use full stop at the end of a statement."),
]

SENTENCE_TYPES = [
    ("declarative", "The sun rises in the east.", "statement"),
    ("interrogative", "Where do you live?", "question"),
    ("imperative", "Please close the door.", "command"),
    ("exclamatory", "What a beautiful garden!", "exclamation"),
]

COMPOUND_SENTENCE_EXAMPLES = [
    ("Rahul is tall and Priya is short.", "and"),
    ("I like coffee but she likes tea.", "but"),
    ("You can play or you can study.", "or"),
    ("It rained so we stayed inside.", "so"),
    ("She was late because the bus broke down.", "because"),
]

COMPLEX_SENTENCE_EXAMPLES = [
    ("I will help you if you ask me.", "if"),
    ("Although it was raining, we played.", "although"),
    ("I know the boy who won the prize.", "who"),
    ("This is the book that I bought.", "that"),
    ("When the bell rang, we went inside.", "when"),
]

DETERMINERS_LIST = [
    ("this", "___ book is very interesting.", "This"),
    ("these", "___ apples are ripe.", "These"),
    ("that", "___ house is very big.", "That"),
    ("those", "___ birds are flying high.", "Those"),
    ("my", "___ brother is a doctor.", "My"),
    ("some", "I have ___ sweets for you.", "some"),
    ("any", "Do you have ___ questions?", "any"),
    ("much", "There isn't ___ water left.", "much"),
    ("many", "There are ___ people here.", "many"),
    ("few", "___ students were absent today.", "Few"),
    ("little", "___ time is left.", "Little"),
    ("every", "___ child deserves love.", "Every"),
    ("each", "___ of us has a role to play.", "each"),
]

LETTER_TYPES = [
    ("formal", "Write a letter to the Headmaster requesting a three-day leave for a family wedding."),
    ("informal", "Write a letter to your cousin describing how you celebrated Diwali."),
    ("formal", "Write a letter to the Editor of a newspaper about the increasing pollution in your city."),
    ("formal", "Write a letter to your friend thanking him for the birthday gift he sent you."),
    ("formal", "Write a letter to the Municipal Commissioner complaining about the broken streetlights in your area."),
]

NOTICE_TEMPLATES = [
    "Annual Sports Day will be held on {} at the school ground.",
    "The school will remain closed on {} due to {}.",
    " auditions for the school play will be held in the auditorium.",
    "A health camp has been organized on {} in the school hall.",
    "The last date for submitting project work is {}.",
]

ESSAY_TOPICS = [
    "The festival I love the most",
    "My favourite animal and why",
    "The importance of reading books",
    "My dream vacation",
    "Why we should protect the environment",
    "The value of honesty",
    "My role model",
    "The joy of helping others",
    "How I spent my summer vacation",
    "If I were the Prime Minister of India",
    "The most memorable day of my life",
    "Why discipline is important in school",
]

STORY_PROMPTS = [
    "Write a story about a lost child who finds help from an unlikely friend in a forest.",
    "Write a story about a magical mango tree that grants wishes to kind children.",
    "Write a story about a brave rabbit who saves the forest from a fire.",
    "Write a story about two friends who learn the value of honesty.",
    "Write a story about a sparrow who teaches a proud crow a lesson.",
]

DIARY_PROMPTS = [
    "Write a diary entry about your first day at a new school.",
    "Write a diary entry about the most exciting day of your life.",
    "Write a diary entry about a day when you helped someone.",
    "Write a diary entry about a festival celebration at home.",
    "Write a diary entry about a mistake you made and what you learned.",
]


# ──────────────────────────────────────────────────────────────
#  BLOOM TAXONOMY LEVELS
# ──────────────────────────────────────────────────────────────

BLOOM_LEVELS = {
    "remember": "Remembering - Recall facts and basic concepts",
    "understand": "Understanding - Explain ideas or concepts",
    "apply": "Applying - Use information in new situations",
    "analyze": "Analyzing - Draw connections among ideas",
    "evaluate": "Evaluating - Justify a stand or decision",
    "create": "Creating - Produce new or original work",
}

DIFFICULTY_LEVELS = ["easy", "medium", "hard"]

QUESTION_TYPES = [
    "mcq", "fill_blank", "short_answer", "long_answer", "numerical"
]

# ──────────────────────────────────────────────────────────────
#  SYLLABUS TOPICS
# ──────────────────────────────────────────────────────────────

TOPICS = [
    "prose_comprehension", "poetry_comprehension", "grammar_tenses",
    "grammar_parts_of_speech", "grammar_reported_speech",
    "grammar_active_passive", "grammar_prepositions",
    "grammar_conjunctions", "grammar_articles",
    "grammar_determiners", "grammar_punctuation",
    "grammar_subject_verb_agreement", "grammar_sentence_types",
    "grammar_adjective_adverb", "grammar_singular_plural",
    "vocabulary_synonyms", "vocabulary_antonyms",
    "writing_notice", "writing_formal_letter",
    "writing_informal_letter", "writing_story",
    "writing_essay", "writing_diary",
]

# ──────────────────────────────────────────────────────────────
#  HELPER FUNCTIONS
# ──────────────────────────────────────────────────────────────

def _s(text):
    """Ensure string is ASCII-safe."""
    return text.encode("ascii", "replace").decode("ascii")

def _pick(lst, rng):
    return rng.choice(lst)

def _shuffle(lst, rng):
    return rng.sample(lst, len(lst))

def _int_range(lo, hi, rng):
    return rng.randint(lo, hi)

def _make_mcq_options(correct, rng, num_options=4):
    """Generate multiple choice options with the correct answer mixed in."""
    pool = []
    for k in SYNONYMS_DICT:
        if k != correct and len(pool) < num_options - 1:
            pool.append(k)
    # pad with generic options if needed
    if len(pool) < num_options - 1:
        pool.extend(["happen", "think", "look", "feel", "sound"])
    pool = pool[: num_options - 1]
    options = pool + [correct]
    rng.shuffle(options)
    return options

def _bloom_for_topic(topic):
    """Return appropriate Bloom level for the topic."""
    b_map = {
        "prose_comprehension": "analyze",
        "poetry_comprehension": "analyze",
        "grammar_tenses": "apply",
        "grammar_parts_of_speech": "apply",
        "grammar_reported_speech": "apply",
        "grammar_active_passive": "apply",
        "grammar_prepositions": "apply",
        "grammar_conjunctions": "apply",
        "grammar_articles": "apply",
        "grammar_determiners": "apply",
        "grammar_punctuation": "understand",
        "grammar_subject_verb_agreement": "apply",
        "grammar_sentence_types": "understand",
        "grammar_adjective_adverb": "apply",
        "grammar_singular_plural": "remember",
        "vocabulary_synonyms": "understand",
        "vocabulary_antonyms": "understand",
        "writing_notice": "create",
        "writing_formal_letter": "create",
        "writing_informal_letter": "create",
        "writing_story": "create",
        "writing_essay": "create",
        "writing_diary": "create",
    }
    return b_map.get(topic, "understand")


# ──────────────────────────────────────────────────────────────
#  QUESTION GENERATORS — STANDARD
# ──────────────────────────────────────────────────────────────

def _gen_prose_comprehension(rng, count):
    """Generate prose comprehension questions (standard)."""
    results = []
    keys = list(PROSE_PASSAGES.keys())
    for i in range(count):
        key = rng.choice(keys)
        p = PROSE_PASSAGES[key]
        para_idx = rng.randint(0, len(p["paragraphs"]) - 1)
        para = p["paragraphs"][para_idx]

        bloom = _bloom_for_topic("prose_comprehension")
        diff = rng.choice(DIFFICULTY_LEVELS)

        q_type = rng.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            # Generate a multiple choice question from the passage
            words_in_para = para.split()
            # Find a key word to ask about
            interesting_words = [w for w in words_in_para if len(w) > 5 and w.isalpha()]
            if not interesting_words:
                interesting_words = ["story", "character", "forest", "master"]
            target_word = rng.choice(interesting_words).strip(".,!?;:'\"")
            options = rng.sample(["forest", "village", "mountain", "river"], 4)
            correct_pos = rng.randint(0, 3)
            options[correct_pos] = target_word[:1].upper() + target_word[1:] if target_word else "forest"

            question_text = (
                f"Reading Comprehension: '{p['title']}'\n"
                f"Passage excerpt: \"{para[:200]}...\"\n\n"
                f"Q{i+1}: Where does the main action of the story take place?"
            )
            answer_text = f"Answer: {options[correct_pos]} (Option {chr(65+correct_pos)})"
            steps = [
                "Step 1: Read the passage carefully and identify the setting.",
                "Step 2: Look for clues about the location in the text.",
                f"Step 3: From the passage, the setting is {options[correct_pos]}.",
                f"Step 4: Therefore, the correct answer is Option {chr(65+correct_pos)}: {options[correct_pos]}."
            ]
            explanation = (
                f"The passage '{p['title']}' is set in a location described as '{options[correct_pos]}'. "
                f"This is evident from the description of the environment and events in the passage."
            )

            results.append({
                "id": f"prose_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
                "topic": "prose_comprehension",
                "subtopic": key,
                "question_type": "mcq",
                "question_text": question_text,
                "answer": answer_text,
                "steps": steps,
                "explanation": explanation,
                "difficulty": diff,
                "bloom_level": bloom,
                "is_competency": False,
                "syllabus_node": "Reading-Comprehension-Prose",
            })

        elif q_type == "fill_blank":
            words_in_para = para.split()
            content_words = [w for w in words_in_para if len(w) >= 4 and w.isalpha()]
            if not content_words:
                content_words = ["story", "master", "forest", "water"]
            target = rng.choice(content_words).strip(".,!?;:'\"")

            question_text = (
                f"Reading Comprehension: '{p['title']}'\n"
                f"Passage excerpt: \"{para[:200]}...\"\n\n"
                f"Q{i+1}: Fill in the blank: The story mentions that the dog wanted to find a ___."
            )
            answer_text = f"Answer: {target}"

            steps = [
                "Step 1: Re-read the relevant part of the passage.",
                f"Step 2: Identify the word that fits the blank contextually.",
                f"Step 3: The word from the passage is '{target}'.",
                "Step 4: Verify it makes sense in the sentence.",
            ]
            explanation = (
                f"In the passage '{p['title']}', the word '{target}' is used to describe "
                f"something important in the story. The context supports this word."
            )

            results.append({
                "id": f"prose_{i+1}b_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
                "topic": "prose_comprehension",
                "subtopic": key,
                "question_type": "fill_blank",
                "question_text": question_text,
                "answer": answer_text,
                "steps": steps,
                "explanation": explanation,
                "difficulty": diff,
                "bloom_level": bloom,
                "is_competency": False,
                "syllabus_node": "Reading-Comprehension-Prose",
            })
        else:
            question_text = (
                f"Reading Comprehension: '{p['title']}' by {p['author']}\n"
                f"Passage excerpt: \"{para[:200]}...\"\n\n"
                f"Q{i+1}: In your own words, describe what the main character learns in this passage."
            )
            answer_text = (
                f"Sample Answer: The main character learns an important lesson about "
                f"the value of loyalty, honesty, or perseverance based on the events "
                f"described in the passage '{p['title']}'."
            )
            steps = [
                "Step 1: Identify the main character and their actions.",
                "Step 2: Look at the ending of the passage for the lesson.",
                "Step 3: Summarize the lesson in your own words.",
                "Step 4: Support your answer with evidence from the text.",
            ]
            explanation = (
                f"The passage '{p['title']}' teaches us about the importance of "
                f"remaining true to our values. The character's journey shows how "
                f"experience and choices shape our understanding of the world."
            )

            results.append({
                "id": f"prose_{i+1}c_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
                "topic": "prose_comprehension",
                "subtopic": key,
                "question_type": "short_answer",
                "question_text": question_text,
                "answer": answer_text,
                "steps": steps,
                "explanation": explanation,
                "difficulty": diff,
                "bloom_level": bloom,
                "is_competency": False,
                "syllabus_node": "Reading-Comprehension-Prose",
            })

    return results


def _gen_poetry_comprehension(rng, count):
    """Generate poetry comprehension questions (standard)."""
    results = []
    keys = list(POETRY_PASSAGES.keys())
    for i in range(count):
        key = rng.choice(keys)
        p = POETRY_PASSAGES[key]
        bloom = _bloom_for_topic("poetry_comprehension")
        diff = rng.choice(DIFFICULTY_LEVELS)
        poem_text = p["stanzas"][0] if p["stanzas"] else ""
        first_line = poem_text.split("\n")[0] if "\n" in poem_text else poem_text

        q_type = rng.choice(["mcq", "fill_blank", "short_answer"])

        if q_type == "mcq":
            title_options = [p["title"], "The Lost Pearl", "The Silent River", "The Old Bridge"]
            rng.shuffle(title_options)
            correct = p["title"]
            correct_opt = chr(65 + title_options.index(correct))

            question_text = (
                f"Poetry Comprehension: Read the poem.\n"
                f"Poem: {first_line}\n\n"
                f"Q{i+1}: What is the title of this poem?"
            )
            answer_text = f"Answer: {correct} (Option {correct_opt})"
            steps = [
                "Step 1: Read the poem lines carefully.",
                f"Step 2: Identify the poem by its first line.",
                f"Step 3: The poem '{first_line[:60]}...' is titled '{correct}'.",
                f"Step 4: Option {correct_opt} is the correct answer."
            ]
            explanation = (
                f"The poem beginning with '{first_line[:60]}...' is titled '{p['title']}' "
                f"by {p['author']}. This is a poem studied in the Class 6 syllabus."
            )

            results.append({
                "id": f"poetry_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
                "topic": "poetry_comprehension",
                "subtopic": key,
                "question_type": "mcq",
                "question_text": question_text,
                "answer": answer_text,
                "steps": steps,
                "explanation": explanation,
                "difficulty": diff,
                "bloom_level": bloom,
                "is_competency": False,
                "syllabus_node": "Reading-Comprehension-Poetry",
            })

        elif q_type == "fill_blank":
            all_words = []
            for stanza in p["stanzas"]:
                all_words.extend(stanza.replace("\n", " ").split())
            content_words = [w.strip(".,!?;:'\"").lower() for w in all_words if len(w) > 4 and w.isalpha()]
            if not content_words:
                content_words = ["beauty", "golden", "whisper", "garden"]
            target = rng.choice(content_words)

            question_text = (
                f"Poetry Comprehension: Read the poem.\n"
                f"Poem excerpt: {first_line}\n\n"
                f"Q{i+1}: Fill in the blank from the poem: 'The poem speaks about ___ and its power to inspire.'"
            )
            answer_text = f"Answer: {target.capitalize()}"
            steps = [
                f"Step 1: Read the poem '{p['title']}' carefully.",
                f"Step 2: Identify a central theme or word from the poem.",
                f"Step 3: The word '{target}' appears in the poem.",
                "Step 4: Fill in the blank with this word."
            ]
            explanation = (
                f"The poem '{p['title']}' uses imagery and language to convey its message. "
                f"The word '{target}' captures one of the key themes of the poem."
            )

            results.append({
                "id": f"poetry_{i+1}b_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
                "topic": "poetry_comprehension",
                "subtopic": key,
                "question_type": "fill_blank",
                "question_text": question_text,
                "answer": answer_text,
                "steps": steps,
                "explanation": explanation,
                "difficulty": diff,
                "bloom_level": bloom,
                "is_competency": False,
                "syllabus_node": "Reading-Comprehension-Poetry",
            })
        else:
            question_text = (
                f"Poetry Comprehension: '{p['title']}' by {p['author']}\n"
                f"Q{i+1}: What message or theme does the poet convey through this poem? "
                f"Give examples from the poem to support your answer."
            )
            answer_text = (
                f"Sample Answer: The poem '{p['title']}' conveys the theme of {rng.choice(['truth and honesty', 'beauty in nature', 'courage and perseverance', 'the value of kindness'])}. "
                f"The poet uses vivid imagery and metaphor to express this idea. "
                f"For example, comparing truth to a sweet fruit shows its lasting value."
            )
            steps = [
                "Step 1: Read the entire poem carefully.",
                "Step 2: Identify the central idea or theme.",
                "Step 3: Look for poetic devices used (simile, metaphor, personification).",
                "Step 4: Quote specific lines that support your interpretation.",
                "Step 5: Write your answer in complete sentences."
            ]
            explanation = (
                f"The poem '{p['title']}' explores themes that are relevant to everyday life. "
                f"The poet uses simple language but deep meaning, making the poem accessible "
                f"yet thought-provoking for young readers."
            )

            results.append({
                "id": f"poetry_{i+1}c_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
                "topic": "poetry_comprehension",
                "subtopic": key,
                "question_type": "short_answer",
                "question_text": question_text,
                "answer": answer_text,
                "steps": steps,
                "explanation": explanation,
                "difficulty": diff,
                "bloom_level": bloom,
                "is_competency": False,
                "syllabus_node": "Reading-Comprehension-Poetry",
            })

    return results


def _gen_grammar_tenses(rng, count):
    """Generate tense-based grammar questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_tenses")
        q_type = rng.choice(["fill_blank", "mcq"])

        tense_info = rng.choice(TENSES_LIST)
        tense_name, question_text_base, correct_answer = tense_info

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Tenses: Choose the correct form of the verb.\n\n"
                f"Q{i+1}: {question_text_base}"
            )
            answer_text = f"Answer: {correct_answer}"
            steps = [
                f"Step 1: Identify the tense required from the context.",
                f"Step 2: The tense is '{tense_name}'.",
                f"Step 3: Apply the correct verb form: {correct_answer}.",
                "Step 4: Verify the answer fits the time reference in the sentence."
            ]
            explanation = (
                f"The sentence requires the '{tense_name}' tense because of "
                f"the time marker (e.g., 'every Sunday', 'last month', 'tomorrow'). "
                f"The correct verb form is '{correct_answer}'."
            )
        else:
            # MCQ
            options = rng.sample(
                [correct_answer, correct_answer + "ed",
                 "is " + correct_answer, "did " + correct_answer],
                4
            )
            correct_opt = chr(65 + options.index(correct_answer))

            question_text = (
                f"Grammar - Tenses: Choose the correct verb form.\n\n"
                f"Q{i+1}: {question_text_base}"
            )
            answer_text = f"Answer: {correct_answer} (Option {correct_opt})"
            steps = [
                f"Step 1: Identify the tense from the time marker.",
                f"Step 2: The tense is '{tense_name}'.",
                f"Step 3: Match the correct form: {correct_answer}.",
                f"Step 4: Option {correct_opt} matches the correct form."
            ]
            explanation = (
                f"In this sentence, we need the '{tense_name}' tense. "
                f"The correct form is '{correct_answer}'. "
                f"This is because the time reference indicates '{tense_name}' usage."
            )

        results.append({
            "id": f"tenses_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_tenses",
            "subtopic": tense_name,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Tenses",
        })

    return results


def _gen_grammar_reported_speech(rng, count):
    """Generate reported speech questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_reported_speech")
        direct, indirect = rng.choice(REPORTED_SPEECH_DIRECT)

        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            # Remove the reporting clause for the question
            blank_indirect = indirect.replace(
                indirect.split(" ")[0], "________"
            )
            # More nuanced: blank out the actual reported part
            parts = indirect.split(" that ")
            if len(parts) == 2:
                blank_text = parts[0] + " that ________"
            else:
                blank_text = "________"

            question_text = (
                f"Grammar - Reported Speech: Convert the following sentence into Reported Speech.\n\n"
                f"Direct: {direct}\n\n"
                f"Q{i+1}: Reported Speech: {blank_text}"
            )
            answer_text = f"Answer: {indirect}"
            steps = [
                "Step 1: Remove the quotation marks and comma.",
                "Step 2: Change the reporting verb (said -> said that / told).",
                "Step 3: Change pronouns and time expressions.",
                f"Step 4: The reported speech is: {indirect}"
            ]
            explanation = (
                f"To convert direct speech '{direct}' to reported speech:\n"
                f"- The reporting verb becomes 'said that'.\n"
                f"- Pronouns change (I -> he/she, my -> his/her).\n"
                f"- Present tense changes to past tense.\n"
                f"The correct reported speech is: {indirect}"
            )

            results.append({
                "id": f"rptsp_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
                "topic": "grammar_reported_speech",
                "subtopic": "direct_to_indirect",
                "question_type": q_type,
                "question_text": question_text,
                "answer": answer_text,
                "steps": steps,
                "explanation": explanation,
                "difficulty": diff,
                "bloom_level": bloom,
                "is_competency": False,
                "syllabus_node": "Grammar-Reported-Speech",
            })
        else:
            wrong_options = []
            for _, ind in REPORTED_SPEECH_DIRECT:
                if ind != indirect and ind not in wrong_options:
                    wrong_options.append(ind)
            options = rng.sample(wrong_options[:3] + [indirect], 4)
            correct_opt = chr(65 + options.index(indirect))

            question_text = (
                f"Grammar - Reported Speech: Choose the correct Reported Speech form.\n\n"
                f"Direct: {direct}\n\n"
                f"Q{i+1}: Reported Speech:"
            )
            answer_text = f"Answer: {indirect} (Option {correct_opt})"
            steps = [
                "Step 1: Analyze the direct speech sentence.",
                "Step 2: Apply reported speech rules.",
                f"Step 3: The correct form is: {indirect}",
                f"Step 4: Option {correct_opt} is correct."
            ]
            explanation = (
                f"The correct reported speech of '{direct}' is '{indirect}'. "
                f"This follows the rules of changing pronouns, tense, and time expressions."
            )

            results.append({
                "id": f"rptsp_{i+1}b_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
                "topic": "grammar_reported_speech",
                "subtopic": "direct_to_indirect",
                "question_type": q_type,
                "question_text": question_text,
                "answer": answer_text,
                "steps": steps,
                "explanation": explanation,
                "difficulty": diff,
                "bloom_level": bloom,
                "is_competency": False,
                "syllabus_node": "Grammar-Reported-Speech",
            })

    return results


def _gen_grammar_active_passive(rng, count):
    """Generate active/passive voice questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_active_passive")
        q_type = rng.choice(["fill_blank", "mcq"])
        active, passive = rng.choice(ACTIVE_PASSIVE_PAIRS)

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Active/Passive Voice: Rewrite the sentence in Passive Voice.\n\n"
                f"Q{i+1}: Active Voice: {active}\n\n"
                f"Passive Voice: ________"
            )
            answer_text = f"Answer: {passive}"
            steps = [
                "Step 1: Identify the subject, verb, and object in the active sentence.",
                f"Step 2: In the active sentence: Subject='{active.split()[0]}', Object='{active.split()[-1].strip('.')}'",
                "Step 3: In passive voice, the object becomes the subject.",
                "Step 4: Add 'by' before the original subject (optional).",
                f"Step 5: The passive voice is: {passive}"
            ]
            explanation = (
                f"To convert active voice '{active}' to passive voice:\n"
                f"- The object of the active sentence becomes the subject.\n"
                f"- Use the appropriate form of 'to be' + past participle.\n"
                f"- The correct passive form is: {passive}"
            )
        else:
            wrong_options = []
            for act, pas in ACTIVE_PASSIVE_PAIRS:
                if pas != passive and pas not in wrong_options:
                    wrong_options.append(pas)
            options = rng.sample(wrong_options[:3] + [passive], 4)
            correct_opt = chr(65 + options.index(passive))

            question_text = (
                f"Grammar - Active/Passive Voice: Choose the correct Passive Voice.\n\n"
                f"Active Voice: {active}\n\n"
                f"Q{i+1}: Passive Voice:"
            )
            answer_text = f"Answer: {passive} (Option {correct_opt})"
            steps = [
                "Step 1: Identify the object in the active sentence.",
                "Step 2: Make the object the subject of the passive sentence.",
                "Step 3: Use the correct form of 'to be' + past participle.",
                f"Step 4: The correct passive voice is: {passive}",
                f"Step 5: Option {correct_opt} is correct."
            ]
            explanation = (
                f"The active sentence '{active}' has '{active.split()[-1].strip('.')}' as its object. "
                f"In the passive voice, this becomes the subject. "
                f"Using 'to be' + past participle gives us: {passive}"
            )

        results.append({
            "id": f"actpas_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_active_passive",
            "subtopic": "active_to_passive",
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Active-Passive-Voice",
        })

    return results


def _gen_grammar_prepositions(rng, count):
    """Generate preposition questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_prepositions")
        prep, sentence_blanks, correct = rng.choice(PREPOSITIONS_LIST)
        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Prepositions: Fill in the blank with the correct preposition.\n\n"
                f"Q{i+1}: {sentence_blanks}"
            )
            answer_text = f"Answer: {correct}"
            steps = [
                "Step 1: Read the sentence carefully.",
                f"Step 2: Identify the relationship between the words (place, time, direction).",
                f"Step 3: The correct preposition is '{correct}'.",
                "Step 4: Verify the sentence makes sense with the preposition."
            ]
            explanation = (
                f"In the sentence, the preposition '{correct}' correctly shows the "
                f"relationship between the noun/pronoun and other words in the sentence. "
                f"The preposition '{correct}' is used to indicate {rng.choice(['time', 'place', 'direction', 'association'])}."
            )
        else:
            options = rng.sample(["at", "in", "on", "to", "from", "with", "by", "for"], 4)
            if correct not in options:
                options[0] = correct
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(correct))

            question_text = (
                f"Grammar - Prepositions: Choose the correct preposition.\n\n"
                f"Q{i+1}: {sentence_blanks}"
            )
            answer_text = f"Answer: {correct} (Option {correct_opt})"
            steps = [
                f"Step 1: Read the sentence and identify the relationship.",
                f"Step 2: The correct preposition is '{correct}'.",
                f"Step 3: Option {correct_opt} matches '{correct}'.",
            ]
            explanation = (
                f"The preposition '{correct}' is the right choice because it correctly "
                f"shows the relationship between the words in the sentence."
            )

        results.append({
            "id": f"prep_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_prepositions",
            "subtopic": prep,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Prepositions",
        })

    return results


def _gen_grammar_conjunctions(rng, count):
    """Generate conjunction questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_conjunctions")
        conj, sentence, correct = rng.choice(CONJUNCTIONS_LIST)
        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Conjunctions: Fill in the blank with the correct conjunction.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {correct}"
            steps = [
                "Step 1: Read both parts of the sentence.",
                f"Step 2: Identify the relationship between the clauses.",
                f"Step 3: The conjunction '{correct}' best joins these clauses.",
                "Step 4: Verify the sentence is grammatically correct."
            ]
            explanation = (
                f"The conjunction '{correct}' is used to {rng.choice(['connect similar ideas', 'show contrast', 'show cause and effect', 'show choice'])}. "
                f"It correctly links the two clauses in the sentence."
            )
        else:
            options = rng.sample(["and", "but", "or", "so", "because", "although", "if"], 4)
            if correct not in options:
                options[0] = correct
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(correct))

            question_text = (
                f"Grammar - Conjunctions: Choose the correct conjunction.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {correct} (Option {correct_opt})"
            steps = [
                f"Step 1: Analyze the relationship between the two clauses.",
                f"Step 2: The conjunction '{correct}' fits the meaning.",
                f"Step 3: Option {correct_opt} is '{correct}'.",
            ]
            explanation = (
                f"The conjunction '{correct}' correctly connects the two parts of the sentence "
                f"by showing the appropriate relationship between them."
            )

        results.append({
            "id": f"conj_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_conjunctions",
            "subtopic": conj,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Conjunctions",
        })

    return results


def _gen_grammar_articles(rng, count):
    """Generate article questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_articles")
        article_type, sentence, correct = rng.choice(ARTICLES_EXAMPLES)
        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Articles: Fill in the blanks with the correct articles (a, an, the) or leave blank if no article is needed (/).\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {correct}"
            steps = [
                "Step 1: Identify each blank in the sentence.",
                "Step 2: Determine if the noun is specific or general.",
                "Step 3: Use 'a' before consonant sounds, 'an' before vowel sounds, 'the' for specific nouns.",
                f"Step 4: The correct articles are: {correct}"
            ]
            explanation = (
                f"Articles are used before nouns. 'A' is used before words starting with "
                f"a consonant sound. 'An' is used before words starting with a vowel sound. "
                f"'The' is used for specific nouns. No article is needed for general plurals and uncountables."
            )
        else:
            options = rng.sample(["a", "an", "the", "/"], 4)
            answers_list = [a.strip() for a in correct.split(",")]
            c = answers_list[0] if answers_list else "a"
            if c not in options:
                options[0] = c
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(c))

            question_text = (
                f"Grammar - Articles: Choose the correct article.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {correct} (first blank: {c}, Option {correct_opt})"
            steps = [
                f"Step 1: Look at the first blank.",
                f"Step 2: The word after the blank starts with a {'vowel' if c == 'an' else 'consonant'} sound.",
                f"Step 3: The correct article is '{c}'.",
                f"Step 4: Option {correct_opt} is correct."
            ]
            explanation = (
                f"The first blank requires the article '{c}' because the following word "
                f"starts with a {'vowel' if c == 'an' else 'consonant'} sound. "
                f"The complete answer is: {correct}"
            )

        results.append({
            "id": f"art_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_articles",
            "subtopic": article_type,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Articles",
        })

    return results


def _gen_grammar_determiners(rng, count):
    """Generate determiner questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_determiners")
        det, sentence, correct = rng.choice(DETERMINERS_LIST)
        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Determiners: Fill in the blank with the correct determiner.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {correct}"
            steps = [
                "Step 1: Identify the noun in the sentence.",
                "Step 2: Determine what kind of determiner is needed.",
                f"Step 3: The determiner '{correct}' fits the context.",
                "Step 4: Verify the sentence is complete and correct."
            ]
            explanation = (
                f"The determiner '{correct}' is used before the noun to specify "
                f"its quantity or reference. Determiners come before nouns to make "
                f"their meaning clear and specific."
            )
        else:
            options = rng.sample(["this", "these", "that", "those", "my", "some", "any", "many"], 4)
            if correct not in options:
                options[0] = correct
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(correct))

            question_text = (
                f"Grammar - Determiners: Choose the correct determiner.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {correct} (Option {correct_opt})"
            steps = [
                f"Step 1: Identify the noun the determiner modifies.",
                f"Step 2: The determiner '{correct}' is appropriate.",
                f"Step 3: Option {correct_opt} matches."
            ]
            explanation = (
                f"The determiner '{correct}' correctly modifies the noun in the sentence, "
                f"providing information about its quantity or reference."
            )

        results.append({
            "id": f"det_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_determiners",
            "subtopic": det,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Determiners",
        })

    return results


def _gen_grammar_parts_of_speech(rng, count):
    """Generate parts of speech questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_parts_of_speech")
        pos, sentence, correct = rng.choice(PARTS_OF_SPEECH)
        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Parts of Speech: Identify the underlined word in the sentence.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: The underlined word is a {pos.capitalize()}. The correct word is '{correct}'."
            steps = [
                f"Step 1: Look at the underlined word '{correct}' in the sentence.",
                f"Step 2: A {pos} is a word that {rng.choice(['names a person/place/thing', 'shows action', 'describes a noun', 'joins words/clauses', 'expresses strong feeling'])}.",
                f"Step 3: The word '{correct}' functions as a {pos} in this sentence.",
                f"Step 4: Therefore, it is a {pos.capitalize()}."
            ]
            explanation = (
                f"The word '{correct}' in the sentence is a {pos}. "
                f"A {pos} {rng.choice(['names a person, place, or thing', 'expresses action or state of being', 'describes or modifies a noun', 'joins words or sentences together', 'expresses strong emotion'])}."
            )
        else:
            pos_options = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"]
            options = rng.sample([p for p in pos_options if p != pos], 3) + [pos]
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(pos))

            question_text = (
                f"Grammar - Parts of Speech: Identify the part of speech of the underlined word.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {pos.capitalize()} (Option {correct_opt})"
            steps = [
                f"Step 1: Identify the underlined word: '{correct}'",
                f"Step 2: Determine its function in the sentence.",
                f"Step 3: It functions as a {pos}.",
                f"Step 4: Option {correct_opt}: {pos.capitalize()} is correct."
            ]
            explanation = (
                f"The word '{correct}' is used as a {pos} in the sentence. "
                f"It {rng.choice(['names a person/place/thing', 'shows action', 'describes a noun', 'joins clauses', 'expresses a sudden feeling'])}."
            )

        results.append({
            "id": f"pos_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_parts_of_speech",
            "subtopic": pos,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Parts-of-Speech",
        })

    return results


def _gen_grammar_punctuation(rng, count):
    """Generate punctuation questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_punctuation")
        example_sent, rule = rng.choice(PUNCTUATION_RULES)
        q_type = rng.choice(["mcq", "fill_blank"])

        if q_type == "mcq":
            # Ask which punctuation mark is used
            punct_options = ["comma (,)", "full stop (.)", "question mark (?)", "exclamation mark (!)"]
            options = rng.sample(punct_options, 4)
            if "question mark (?)" not in options:
                options[0] = "question mark (?)"
            rng.shuffle(options)

            question_text = (
                f"Grammar - Punctuation: Which punctuation mark is used in the following sentence?\n\n"
                f"Q{i+1}: {example_sent}"
            )
            correct_ans = "question mark (?)" if "?" in example_sent else (
                "exclamation mark (!)" if "!" in example_sent else (
                    "comma (,)" if "," in example_sent else "full stop (.)"
                )
            )
            correct_opt = chr(65 + options.index(correct_ans)) if correct_ans in options else "A"
            if correct_ans not in options:
                options = rng.sample(punct_options, 4)
                options[0] = correct_ans
                rng.shuffle(options)
                correct_opt = chr(65 + options.index(correct_ans))

            answer_text = f"Answer: {correct_ans} (Option {correct_opt})"
            steps = [
                "Step 1: Look at the sentence carefully.",
                f"Step 2: Identify the punctuation mark at the end or within the sentence.",
                f"Step 3: The punctuation used is {correct_ans}.",
                f"Step 4: This is because {rule.lower()}"
            ]
            explanation = (
                f"The sentence '{example_sent}' uses {correct_ans}. "
                f"Rule: {rule}"
            )
        else:
            question_text = (
                f"Grammar - Punctuation: Rewrite the sentence with correct punctuation.\n\n"
                f"Q{i+1}: Rewrite with proper punctuation: "
                f"{example_sent.replace('?', '').replace('!', '').replace(',', '').replace('.', '')}"
            )
            answer_text = f"Answer: {example_sent}"
            steps = [
                "Step 1: Identify what kind of sentence it is (statement, question, command).",
                "Step 2: Add the appropriate end punctuation.",
                "Step 3: Add commas where needed.",
                f"Step 4: The correctly punctuated sentence is: {example_sent}"
            ]
            explanation = (
                f"Correct punctuation is important for clarity. "
                f"The rule applied here is: {rule}"
            )

        results.append({
            "id": f"punct_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_punctuation",
            "subtopic": "punctuation_marks",
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Punctuation",
        })

    return results


def _gen_grammar_subject_verb_agreement(rng, count):
    """Generate subject-verb agreement questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_subject_verb_agreement")
        sentence, correct = rng.choice(SUBJECT_VERB_AGREEMENT)
        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Subject-Verb Agreement: Fill in the blank with the correct verb.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {correct}"
            steps = [
                "Step 1: Identify the subject of the sentence.",
                f"Step 2: Is the subject singular or plural?",
                f"Step 3: Apply the rule: singular subject takes singular verb, plural takes plural verb.",
                f"Step 4: The correct verb is '{correct}'."
            ]
            explanation = (
                f"In the sentence, the subject is {'singular' if 'The ' in sentence and 's ' not in sentence.split('(')[0] else 'plural'}. "
                f"A {'singular' if 's ' not in sentence.split('(')[0] else 'plural'} subject requires a {'singular' if 's ' not in sentence.split('(')[0] else 'plural'} verb. "
                f"Therefore, the correct verb is '{correct}'."
            )
        else:
            wrong_verb = correct + "s" if not correct.endswith("s") else correct[:-1]
            options = rng.sample([correct, wrong_verb, "is " + correct, "are " + correct], 4)
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(correct))

            question_text = (
                f"Grammar - Subject-Verb Agreement: Choose the correct verb.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {correct} (Option {correct_opt})"
            steps = [
                "Step 1: Identify the subject.",
                "Step 2: Check if the subject is singular or plural.",
                f"Step 3: Choose the verb that agrees with the subject.",
                f"Step 4: Option {correct_opt} is correct."
            ]
            explanation = (
                f"The subject-verb agreement rule states that a singular subject takes a singular verb "
                f"and a plural subject takes a plural verb. The correct verb is '{correct}'."
            )

        results.append({
            "id": f"sva_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_subject_verb_agreement",
            "subtopic": "subject_verb_agreement",
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Subject-Verb-Agreement",
        })

    return results


def _gen_grammar_sentence_types(rng, count):
    """Generate sentence type questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_sentence_types")
        sent_type, sentence, desc = rng.choice(SENTENCE_TYPES)
        q_type = rng.choice(["mcq", "short_answer"])

        if q_type == "mcq":
            type_options = ["declarative", "interrogative", "imperative", "exclamatory"]
            options = rng.sample(type_options, 4)
            if sent_type not in options:
                options[0] = sent_type
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(sent_type))

            question_text = (
                f"Grammar - Sentence Types: Identify the type of the following sentence.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {sent_type.capitalize()} sentence (Option {correct_opt})"
            steps = [
                "Step 1: Look at the ending punctuation of the sentence.",
                f"Step 2: A {sent_type} sentence {'makes a statement' if sent_type == 'declarative' else 'asks a question' if sent_type == 'interrogative' else 'gives a command or request' if sent_type == 'imperative' else 'expresses strong emotion'}.",
                f"Step 3: The sentence '{sentence}' is a {sent_type} sentence.",
                f"Step 4: Option {correct_opt} is correct."
            ]
            explanation = (
                f"A {sent_type} sentence is one that {desc}. "
                f"It typically ends with a {'full stop (.)' if sent_type == 'declarative' else 'question mark (?)' if sent_type == 'interrogative' else 'full stop (.) or exclamation mark' if sent_type == 'imperative' else 'exclamation mark (!)'}."
            )
        else:
            question_text = (
                f"Grammar - Sentence Types: Identify and explain the type of the following sentence.\n\n"
                f"Q{i+1}: {sentence}"
            )
            answer_text = f"Answer: {sent_type.capitalize()} sentence. It {desc}."
            steps = [
                f"Step 1: Read the sentence: '{sentence}'",
                f"Step 2: Check the ending punctuation.",
                f"Step 3: Identify the sentence type: {sent_type}.",
                "Step 4: Explain why it is of this type."
            ]
            explanation = (
                f"The sentence is a {sent_type} sentence because it {desc}. "
                f"It ends with a {'full stop' if '.' in sentence else 'question mark' if '?' in sentence else 'exclamation mark'}."
            )

        results.append({
            "id": f"senttype_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_sentence_types",
            "subtopic": sent_type,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Sentence-Types",
        })

    return results


def _gen_grammar_adjective_adverb(rng, count):
    """Generate adjective/adverb questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_adjective_adverb")
        adj, adv = rng.choice(ADJECTIVE_ADVERB_PAIRS)
        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Adjectives and Adverbs: Fill in the blank with the correct form.\n\n"
                f"Q{i+1}: The boy ran ___. (Use the adverb form of '{adj}')"
            )
            answer_text = f"Answer: {adv}"
            steps = [
                f"Step 1: Identify the word class needed - the blank modifies the verb 'ran'.",
                "Step 2: An adverb modifies a verb, adjective, or another adverb.",
                f"Step 3: The adjective is '{adj}', the adverb form is '{adv}' (add -ly).",
                f"Step 4: The correct answer is '{adv}'."
            ]
            explanation = (
                f"Adjectives describe nouns, while adverbs describe verbs, adjectives, or other adverbs. "
                f"Many adverbs are formed by adding '-ly' to the adjective. "
                f"The adjective '{adj}' becomes the adverb '{adv}'."
            )
        else:
            options = rng.sample([adj, adv, "quickment", "happys"], 4)
            if adv not in options:
                options[0] = adv
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(adv))

            question_text = (
                f"Grammar - Adjectives and Adverbs: Choose the correct word.\n\n"
                f"Q{i+1}: The boy ran ___. (Choose the adverb form of '{adj}')"
            )
            answer_text = f"Answer: {adv} (Option {correct_opt})"
            steps = [
                "Step 1: The blank describes the verb 'ran'.",
                "Step 2: We need an adverb (describes how the action is done).",
                f"Step 3: The adverb form of '{adj}' is '{adv}'.",
                f"Step 4: Option {correct_opt} is correct."
            ]
            explanation = (
                f"An adverb modifies the verb 'ran'. The adverb form of the adjective '{adj}' is '{adv}'. "
                f"Adverbs often end in '-ly' in English."
            )

        results.append({
            "id": f"adjadv_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_adjective_adverb",
            "subtopic": f"{adj}_to_{adv}",
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Adjective-Adverb",
        })

    return results


def _gen_grammar_singular_plural(rng, count):
    """Generate singular/plural noun questions (standard)."""
    results = []
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("grammar_singular_plural")
        singular, plural = rng.choice(SINGULAR_PLURAL)
        q_type = rng.choice(["fill_blank", "mcq"])

        if q_type == "fill_blank":
            question_text = (
                f"Grammar - Singular and Plural Nouns: Write the plural form of the given noun.\n\n"
                f"Q{i+1}: Singular: {singular}\nPlural: ________"
            )
            answer_text = f"Answer: {plural}"
            steps = [
                f"Step 1: Start with the singular noun: '{singular}'",
                f"Step 2: Apply the pluralization rule.",
                f"Step 3: The plural form of '{singular}' is '{plural}'.",
                "Step 4: Verify this is correct.",
            ]
            explanation = (
                f"The plural of '{singular}' is '{plural}'. "
                f"This is an irregular plural form that must be memorized, as it does not "
                f"follow the regular rule of adding '-s' or '-es' to the end."
            )
        else:
            options = rng.sample(["dogs", "cats", "houses", "books"], 3) + [plural]
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(plural))

            question_text = (
                f"Grammar - Singular and Plural Nouns: Choose the correct plural form.\n\n"
                f"Q{i+1}: The plural of '{singular}' is:"
            )
            answer_text = f"Answer: {plural} (Option {correct_opt})"
            steps = [
                f"Step 1: Start with the singular noun: '{singular}'",
                f"Step 2: The plural form is '{plural}'.",
                f"Step 3: Option {correct_opt} matches.",
            ]
            explanation = (
                f"The plural of '{singular}' is '{plural}'. "
                f"This word has an irregular plural form."
            )

        results.append({
            "id": f"sngpl_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "grammar_singular_plural",
            "subtopic": f"{singular}_to_{plural}",
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Grammar-Singular-Plural",
        })

    return results


def _gen_vocabulary_synonyms(rng, count):
    """Generate synonym questions (standard)."""
    results = []
    keys = list(SYNONYMS_DICT.keys())
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("vocabulary_synonyms")
        word = rng.choice(keys)
        correct = SYNONYMS_DICT[word]
        q_type = rng.choice(["mcq", "fill_blank"])

        if q_type == "mcq":
            pool = list(SYNONYMS_DICT.values())
            options = rng.sample([v for v in pool if v != correct], 3) + [correct]
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(correct))

            question_text = (
                f"Vocabulary - Synonyms: Choose the word that means the same as '{word}'.\n\n"
                f"Q{i+1}: Find the synonym of '{word}'."
            )
            answer_text = f"Answer: {correct} (Option {correct_opt})"
            steps = [
                f"Step 1: Understand the meaning of the word '{word}'.",
                f"Step 2: Look for a word with a similar meaning.",
                f"Step 3: The word '{correct}' means the same as '{word}'.",
                f"Step 4: Option {correct_opt} is the correct answer."
            ]
            explanation = (
                f"'{word}' means {rng.choice(['pleasing to look at', 'feeling good', 'very large', 'moving quickly', 'beginning', 'important'])}. "
                f"The word '{correct}' is a synonym, meaning it has a similar meaning."
            )
        else:
            question_text = (
                f"Vocabulary - Synonyms: Write a synonym for the given word.\n\n"
                f"Q{i+1}: Write a synonym for '{word}'."
            )
            answer_text = f"Answer: {correct}"
            steps = [
                f"Step 1: Understand the meaning of '{word}'.",
                f"Step 2: Think of another word with a similar meaning.",
                f"Step 3: The synonym of '{word}' is '{correct}'.",
            ]
            explanation = (
                f"Synonyms are words that have similar meanings. "
                f"'{word}' and '{correct}' are synonyms because they convey a similar idea."
            )

        results.append({
            "id": f"syn_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "vocabulary_synonyms",
            "subtopic": word,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Vocabulary-Synonyms",
        })

    return results


def _gen_vocabulary_antonyms(rng, count):
    """Generate antonym questions (standard)."""
    results = []
    keys = list(ANTONYMS_DICT.keys())
    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = _bloom_for_topic("vocabulary_antonyms")
        word = rng.choice(keys)
        correct = ANTONYMS_DICT[word]
        q_type = rng.choice(["mcq", "fill_blank"])

        if q_type == "mcq":
            pool = list(ANTONYMS_DICT.values())
            options = rng.sample([v for v in pool if v != correct], 3) + [correct]
            rng.shuffle(options)
            correct_opt = chr(65 + options.index(correct))

            question_text = (
                f"Vocabulary - Antonyms: Choose the word that means the opposite of '{word}'.\n\n"
                f"Q{i+1}: Find the antonym of '{word}'."
            )
            answer_text = f"Answer: {correct} (Option {correct_opt})"
            steps = [
                f"Step 1: Understand the meaning of '{word}'.",
                f"Step 2: Look for a word with the opposite meaning.",
                f"Step 3: '{correct}' means the opposite of '{word}'.",
                f"Step 4: Option {correct_opt} is correct."
            ]
            explanation = (
                f"Antonyms are words with opposite meanings. "
                f"'{word}' means {rng.choice(['beautiful', 'happy', 'large', 'fast', 'hot'])}. "
                f"'{correct}' means the opposite."
            )
        else:
            question_text = (
                f"Vocabulary - Antonyms: Write an antonym for the given word.\n\n"
                f"Q{i+1}: Write an antonym for '{word}'."
            )
            answer_text = f"Answer: {correct}"
            steps = [
                f"Step 1: Understand the meaning of '{word}'.",
                f"Step 2: Think of a word with the opposite meaning.",
                f"Step 3: The antonym is '{correct}'.",
            ]
            explanation = (
                f"Antonyms are words that have opposite meanings. "
                f"'{word}' and '{correct}' are antonyms."
            )

        results.append({
            "id": f"ant_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "vocabulary_antonyms",
            "subtopic": word,
            "question_type": q_type,
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": False,
            "syllabus_node": "Vocabulary-Antonyms",
        })

    return results


# ──────────────────────────────────────────────────────────────
#  QUESTION GENERATORS — COMPETENCY-BASED
# ──────────────────────────────────────────────────────────────

def _gen_competency_comprehension(rng, count):
    """Generate competency-based comprehension questions with Indian real-world scenarios."""
    results = []
    scenarios = [
        {
            "context": "Rahul visited the famous Meenakshi Temple in Madurai during his summer vacation. He observed that the temple was beautifully decorated with flowers and lights. The priests were performing rituals. Rahul noticed that people from all over India and even from other countries had come to visit this ancient temple.",
            "questions": [
                "Why do you think people from different countries visit the Meenakshi Temple?",
                "What does this tell us about India's cultural heritage?",
                "If you were Rahul, what would you write in your diary about this visit?",
                "How does visiting historical places help us learn about our country?",
            ],
            "skills": ["Reading comprehension", "Critical thinking", "Cultural awareness", "Personal reflection"],
        },
        {
            "context": f"Priya's grandmother told her a story about how {rng.choice(FESTIVALS)} was celebrated in her village when she was young. There were no televisions or mobile phones then. The whole village would gather together. Women made sweets together, children played traditional games, and everyone shared food with their neighbours. Priya listened carefully and thought about how celebrations have changed today.",
            "questions": [
                "How were festival celebrations different in the past compared to today?",
                "What values did the old-fashioned celebrations teach?",
                "Write a paragraph comparing the two ways of celebrating festivals.",
                "What can young people learn from the way festivals were celebrated earlier?",
            ],
            "skills": ["Reading comprehension", "Comparison", "Critical thinking", "Value education"],
        },
        {
            "context": f"Aarav's school in {rng.choice(INDIAN_PLACES)} organized a cleanliness drive on Gandhi Jayanti. All the students were divided into groups. Aarav's group was assigned to clean the park near their school. They collected plastic bags, paper, and dry leaves. In two hours, the park looked much cleaner. The local residents thanked the students and gave them snacks.",
            "questions": [
                "What does Aarav's experience teach us about community service?",
                "How does keeping our surroundings clean benefit everyone?",
                "Plan a similar cleanliness drive for your own locality. What steps would you take?",
                "Why do you think Gandhiji emphasized cleanliness so much?",
            ],
            "skills": ["Reading comprehension", "Problem solving", "Planning", "Value education"],
        },
        {
            "context": f"The Sharma family from {rng.choice(INDIAN_CITIES_SHORT)} went on a trip to the hill station of Darjeeling. They traveled by train from Mumbai. The journey took two days. When they arrived, they were amazed by the beautiful tea gardens and the view of the Kanchenjunga mountain. They stayed for five days, visiting the monastery, riding the toy train, and tasting local momos.",
            "questions": [
                "Plan a budget for a similar family trip. List the major expenses.",
                "What modes of transport did the Sharma family use? Which was the most comfortable?",
                "Write a travel blog entry describing one day of their trip.",
                "How do hill stations like Darjeeling contribute to India's tourism?",
            ],
            "skills": ["Reading comprehension", "Numeracy", "Creative writing", "Geography awareness"],
        },
        {
            "context": f"A farmer named {rng.choice(['Ramu', 'Krishna', 'Bharath', 'Suresh'])} in a village near {rng.choice(INDIAN_PLACES)} grew organic vegetables using traditional farming methods. He did not use chemical fertilizers. Instead, he used cow dung and compost. His vegetables tasted much better than those grown with chemicals. Neighbouring farmers noticed and started asking him questions. Soon, many farmers in the village switched to organic farming.",
            "questions": [
                "Analyze why organic vegetables taste better than chemically grown ones.",
                "What challenges might the farmer face when switching to organic farming?",
                "How does organic farming help the environment? Give at least three reasons.",
                "Write a letter to a local newspaper supporting organic farming.",
            ],
            "skills": ["Reading comprehension", "Analysis", "Environmental awareness", "Writing"],
        },
        {
            "context": f"An {rng.choice(ANIMALS).capitalize()} wandered into {rng.choice(['Rahul', 'Priya', 'Aarav'])}'s garden one morning. The child was surprised but calm. He gave the animal some food and then called the local animal rescue team. The rescue team arrived within an hour and safely took the animal to a nearby sanctuary. The child learned that wild animals sometimes wander into human areas when they are lost or searching for food.",
            "questions": [
                "Why do wild animals sometimes enter residential areas?",
                "What should you do if you see a wild animal near your home?",
                "Create a safety guideline poster for your school about what to do when encountering wild animals.",
                "Evaluate the importance of animal sanctuaries in India.",
            ],
            "skills": ["Reading comprehension", "Critical thinking", "Creative design", "Environmental awareness"],
        },
        {
            "context": f"Kavya's class in {rng.choice(INDIAN_PLACES)} was assigned a project on 'Water Conservation'. Kavya's group studied how water was used in their school, home, and neighbourhood. They found that many taps were leaking, people wasted water while brushing teeth, and the school garden was watered during the hottest part of the day. They prepared a report with suggestions and presented it to the school principal.",
            "questions": [
                "List at least five ways Kavya's group could save water in daily life.",
                "Calculate how much water is wasted in a day if three taps drip continuously.",
                "Design a water conservation campaign poster for your school.",
                "Evaluate the long-term impact of water conservation on the environment.",
            ],
            "skills": ["Reading comprehension", "Data interpretation", "Creative design", "Environmental awareness"],
        },
        {
            "context": f"{rng.choice(INDIAN_NAMES)} received a handwritten letter from his grandfather who lives in a small village in {rng.choice(['Rajasthan', 'Kerala', 'Himachal Pradesh'])}. The grandfather described the beautiful harvest festival celebrations in the village. He wrote about the folk songs, traditional dances, and the delicious feast prepared by the whole family. {rng.choice(INDIAN_NAMES)} felt very happy and decided to visit his grandparents during the next vacation.",
            "questions": [
                "How does the letter reflect the bond between grandparents and grandchildren?",
                "What cultural elements are mentioned in the letter?",
                "Write a reply letter from {rng.choice(INDIAN_NAMES)} to his grandfather, describing city life.",
                "Why is it important to preserve traditional festivals and celebrations?",
            ],
            "skills": ["Reading comprehension", "Emotional intelligence", "Letter writing", "Cultural awareness"],
        },
    ]

    for i in range(count):
        scenario = rng.choice(scenarios)
        bloom = rng.choice(["analyze", "evaluate", "create"])
        diff = rng.choice(DIFFICULTY_LEVELS)
        q_idx = rng.randint(0, len(scenario["questions"]) - 1)
        question_text = (
            f"Competency-Based Reading: Read the passage below carefully and answer the question.\n\n"
            f"Passage:\n{scenario['context']}\n\n"
            f"Skills assessed: {', '.join(scenario['skills'])}\n\n"
            f"Q{i+1}: {scenario['questions'][q_idx]}"
        )

        answer_text = (
            f"Sample Answer:\n"
            f"This question requires multi-step reasoning:\n"
            f"Step 1: Read and understand the passage context.\n"
            f"Step 2: Connect the passage details to the question.\n"
            f"Step 3: Apply critical thinking to form a well-reasoned response.\n"
            f"Step 4: Express your answer clearly with supporting details from the passage.\n\n"
            f"The passage about {scenario['context'][:50]}... provides the context needed to "
            f"answer this question by connecting real-world Indian experiences with "
            f"literary comprehension skills."
        )
        steps = [
            f"Step 1: Read the passage thoroughly to understand the context.",
            f"Step 2: Identify key details relevant to the question: '{scenario['questions'][q_idx][:60]}...'",
            f"Step 3: Connect the passage to broader themes and real-world situations.",
            f"Step 4: Formulate your answer using evidence from the text and your own reasoning.",
            f"Step 5: Review your answer to ensure it addresses all parts of the question.",
        ]
        explanation = (
            f"This competency-based question tests your ability to: (1) comprehend the passage, "
            f"(2) apply critical thinking, and (3) connect the text to real-life situations. "
            f"Skills assessed: {', '.join(scenario['skills'])}. "
            f"In real life, we often need to read and understand texts, then use that information "
            f"to make decisions or express our opinions clearly."
        )

        results.append({
            "id": f"comp_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "competency_reading",
            "subtopic": "real_world_scenario",
            "question_type": "long_answer",
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": True,
            "syllabus_node": "Competency-Based-Reading",
        })

    return results


def _gen_competency_writing(rng, count):
    """Generate competency-based writing questions (standard -> writing practice)."""
    results = []

    formal_prompts = [
        {
            "task": f"Write a formal letter to the Principal of {rng.choice(INDIAN_PLACES)} Public School requesting permission to organize a charity drive for underprivileged children.",
            "format_points": ["Sender's address", "Date", "Receiver's address", "Subject", "Salutation",
                              "Body (3-4 paragraphs)", "Complimentary close", "Signature"],
            "bloom": "create",
        },
        {
            "task": f"Write a formal letter to the Municipal Commissioner of {rng.choice(INDIAN_PLACES)} complaining about the lack of proper street lighting in your locality.",
            "format_points": ["Sender's address", "Date", "Receiver's address", "Subject", "Salutation",
                              "Body explaining the problem and requesting action", "Complimentary close", "Signature"],
            "bloom": "create",
        },
        {
            "task": f"Write a formal letter to the Editor of 'The {rng.choice(['Times', 'Hindu', 'Indian Express'])}' about the increasing air pollution in {rng.choice(INDIAN_PLACES)} and suggesting solutions.",
            "format_points": ["Sender's address", "Date", "Editor's address", "Subject",
                              "Salutation", "Body with problem description and solutions", "Complimentary close", "Signature"],
            "bloom": "create",
        },
    ]

    informal_prompts = [
        {
            "task": f"Write an informal letter to your cousin {rng.choice(INDIAN_NAMES)} who lives in {rng.choice(INDIAN_PLACES)}, describing how you celebrated {rng.choice(FESTIVALS)} with your family.",
            "format_points": ["Sender's address (optional)", "Date", "Salutation (Dear...)",
                              "Body with personal details and feelings", "Complimentary close (Yours lovingly)",
                              "Signature"],
            "bloom": "create",
        },
        {
            "task": f"Write an informal letter to your friend {rng.choice(INDIAN_NAMES)} telling him/her about the exciting school trip your class recently went on.",
            "format_points": ["Sender's address (optional)", "Date", "Salutation",
                              "Body with description of places visited and experiences", "Closing",
                              "Signature"],
            "bloom": "create",
        },
    ]

    notice_prompts = [
        {
            "task": f"You are the Cultural Secretary of your school. Draft a notice informing students about the upcoming Annual Cultural Program on {rng.choice(MONTHS)} {rng.randint(5, 28)}.",
            "format_points": ["Title: NOTICE", "Date", "Heading",
                              "Body with event details (date, time, venue, eligibility)",
                              "Signature and designation"],
            "bloom": "create",
        },
        {
            "task": f"As the Sports Captain, draft a notice announcing tryouts for the school cricket team. The selection will be held on the school playground.",
            "format_points": ["Title: NOTICE", "Date", "Heading",
                              "Body with date, time, venue, and eligibility criteria",
                              "Contact information", "Signature and designation"],
            "bloom": "create",
        },
    ]

    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = rng.choice(["apply", "analyze", "create"])

        prompt_type = rng.choice(["formal_letter", "informal_letter", "notice", "story", "essay", "diary"])

        if prompt_type == "formal_letter":
            p = rng.choice(formal_prompts)
            question_text = (
                f"Competency-Based Writing - Formal Letter\n\n"
                f"Task: {p['task']}\n\n"
                f"Ensure your letter includes the following format elements:\n"
                + "\n".join(f"- {pt}" for pt in p['format_points']) + "\n\n"
                f"Word limit: 100-150 words"
            )
            answer_text = (
                f"Sample Formal Letter:\n\n"
                f"12, MG Road\n"
                f"{rng.choice(INDIAN_PLACES)} - 400001\n"
                f"{rng.choice(MONTHS)} {rng.randint(5, 28)}, 2024\n\n"
                f"The Principal\n"
                f"{rng.choice(INDIAN_PLACES)} Public School\n"
                f"{rng.choice(INDIAN_PLACES)}\n\n"
                f"Subject: Request for Permission to Organize a Charity Drive\n\n"
                f"Respected Sir/Ma'am,\n\n"
                f"I am {rng.choice(INDIAN_NAMES)}, a student of Class 6-B. I am writing to request your "
                f"permission to organize a charity drive for underprivileged children in our locality.\n\n"
                f"Our class wishes to collect clothes, books, and food items for children who do not "
                f"have access to these basic necessities. We plan to distribute the collected items "
                f"during the upcoming {rng.choice(FESTIVALS)} celebrations.\n\n"
                f"I request your kind permission and support for this noble cause. I am available to "
                f"discuss this further at your convenience.\n\n"
                f"Thank you for your time and consideration.\n\n"
                f"Yours faithfully,\n"
                f"{rng.choice(INDIAN_NAMES)}\n"
                f"Class 6-B"
            )
            steps = [
                "Step 1: Write the sender's address at the top left.",
                "Step 2: Write the date below the address.",
                "Step 3: Write the receiver's address (Principal's address).",
                "Step 4: Add the subject line.",
                "Step 5: Write a formal salutation (Respected Sir/Ma'am).",
                "Step 6: Write the body of the letter with a clear introduction, main points, and conclusion.",
                "Step 7: End with a complimentary close and your signature.",
                "Step 8: Review the letter for grammar and clarity.",
            ]
            explanation = (
                "A formal letter follows a specific format. It should be concise, clear, and polite. "
                "The subject line tells the reader what the letter is about. "
                "Always proofread your letter before sending it."
            )

        elif prompt_type == "informal_letter":
            p = rng.choice(informal_prompts)
            question_text = (
                f"Competency-Based Writing - Informal Letter\n\n"
                f"Task: {p['task']}\n\n"
                f"Ensure your letter includes:\n"
                + "\n".join(f"- {pt}" for pt in p['format_points']) + "\n\n"
                f"Word limit: 100-120 words"
            )
            answer_text = (
                f"Sample Informal Letter:\n\n"
                f"{rng.choice(MONTHS)} {rng.randint(5, 28)}, 2024\n\n"
                f"Dear {rng.choice(INDIAN_NAMES)},\n\n"
                f"Hope this letter finds you well! I wanted to tell you about the wonderful "
                f"{rng.choice(FESTIVALS)} celebration we had at our home last week. The entire "
                f"family gathered at our house in {rng.choice(INDIAN_PLACES)}. We decorated the "
                f"house with {rng.choice(FLOWERS)} and lights. My mother made delicious "
                f"{rng.choice(FOODS)} and everyone enjoyed the feast. We also burst "
                f"{rng.choice(['sparklers', 'firecrackers', 'rockets'])} in the evening. "
                f"I miss you and wish you were here with us.\n\n"
                f"Please write back soon and tell me about your vacation.\n\n"
                f"Yours lovingly,\n"
                f"{rng.choice(INDIAN_NAMES)}"
            )
            steps = [
                "Step 1: Start with the date.",
                "Step 2: Write a warm salutation using the person's name.",
                "Step 3: Begin the body with a friendly opening.",
                "Step 4: Share your experiences and feelings in detail.",
                "Step 5: Ask about the other person's life.",
                "Step 6: End with a warm closing.",
                "Step 7: Sign off affectionately.",
            ]
            explanation = (
                "An informal letter is written to friends or family. It uses a friendly, "
                "conversational tone. You can share personal feelings and experiences. "
                "The format is less rigid than a formal letter."
            )

        elif prompt_type == "notice":
            p = rng.choice(notice_prompts)
            question_text = (
                f"Competency-Based Writing - Notice\n\n"
                f"Task: {p['task']}\n\n"
                f"Ensure your notice includes:\n"
                + "\n".join(f"- {pt}" for pt in p['format_points']) + "\n\n"
                f"Word limit: 50-80 words"
            )
            answer_text = (
                f"Sample Notice:\n\n"
                f"                 NOTICE\n"
                f"    {rng.choice(MONTHS)} {rng.randint(5, 28)}, 2024\n\n"
                f"Annual Cultural Program\n\n"
                f"This is to inform all students that the Annual Cultural Program "
                f"will be held on {rng.choice(MONTHS)} {rng.randint(10, 25)} in the "
                f"school auditorium at 10:00 AM. Interested students should register "
                f"with their class teachers by {rng.choice(MONTHS)} {rng.randint(1, 10)}. "
                f"All students are welcome to participate and showcase their talents.\n\n"
                f"                       {rng.choice(INDIAN_NAMES)}\n"
                f"                    Cultural Secretary\n"
                f"                  Class 8, Sunflower School"
            )
            steps = [
                "Step 1: Write 'NOTICE' in bold, centered at the top.",
                "Step 2: Write the date and issuing authority.",
                "Step 3: Write a clear heading for the notice.",
                "Step 4: Mention all important details: what, when, where, who.",
                "Step 5: Include any deadlines or requirements.",
                "Step 6: Sign and mention your designation.",
            ]
            explanation = (
                "A notice is a formal announcement. It must be concise and contain all "
                "essential information. The format includes the title, date, heading, "
                "body, and signature. Notices are always brief and to the point."
            )

        elif prompt_type == "story":
            prompt = rng.choice(STORY_PROMPTS)
            question_text = (
                f"Competency-Based Writing - Story Writing\n\n"
                f"Task: {prompt}\n\n"
                f"Your story should include:\n"
                f"- A beginning that sets the scene\n"
                f"- Interesting characters\n"
                f"- A conflict or problem\n"
                f"- A resolution\n"
                f"- A moral or lesson\n\n"
                f"Word limit: 150-200 words"
            )
            answer_text = (
                f"Sample Story:\n\n"
                f"Long ago, in a small village near {rng.choice(INDIAN_PLACES)}, there lived a "
                f"brave little rabbit named Chikku. Chikku was small but very clever. One day, "
                f"a {rng.choice(ANIMALS)} came to the forest and began troubling all the animals. "
                f"The animals were very scared.\n\n"
                f"Chikku thought of a plan. He went to the {rng.choice(ANIMALS)} and said, "
                f"'There is a stronger animal in the next forest who wants to challenge you.' "
                f"The {rng.choice(ANIMALS)} followed Chikku to a deep well. Chikku said, "
                f"'He lives inside. Look down and challenge him.' The {rng.choice(ANIMALS)} "
                f"looked down and saw his own reflection. He growled, and the echo made him "
                f"think it was the other animal. Frightened, he ran away and never returned.\n\n"
                f"Moral: Intelligence is more powerful than strength."
            )
            steps = [
                "Step 1: Think about the characters and setting.",
                "Step 2: Plan the beginning of the story.",
                "Step 3: Introduce the problem or conflict.",
                "Step 4: Build up the story with interesting events.",
                "Step 5: Create a satisfying resolution.",
                "Step 6: Add a moral or lesson at the end.",
                "Step 7: Review and edit your story for grammar and flow.",
            ]
            explanation = (
                "A good story has a clear structure: beginning, middle, and end. "
                "The characters should be interesting and relatable. "
                "The moral of the story gives it purpose and teaches a valuable lesson."
            )

        elif prompt_type == "essay":
            topic = rng.choice(ESSAY_TOPICS)
            question_text = (
                f"Competency-Based Writing - Essay\n\n"
                f"Task: Write an essay on the topic: '{topic}'\n\n"
                f"Your essay should include:\n"
                f"- An introduction (1 paragraph)\n"
                f"- Main body (2-3 paragraphs with examples)\n"
                f"- A conclusion (1 paragraph)\n\n"
                f"Word limit: 150-200 words"
            )
            answer_text = (
                f"Sample Essay on '{topic}':\n\n"
                f"Introduction: {topic} is something that affects all of us in many ways. "
                f"In this essay, I will discuss why it is important and how it impacts our lives.\n\n"
                f"Body Paragraph 1: First, we need to understand the significance of this topic. "
                f"In India, we can see many examples. For instance, in {rng.choice(INDIAN_PLACES)}, "
                f"people have shown great commitment to this cause.\n\n"
                f"Body Paragraph 2: Furthermore, there are practical benefits. "
                f"When we care about this, we become better individuals and build a better society. "
                f"Schools like ours teach us the importance of these values.\n\n"
                f"Conclusion: In conclusion, {topic.lower()} is essential for a meaningful life. "
                f"We should all try to incorporate it into our daily lives for a better future."
            )
            steps = [
                "Step 1: Understand the topic and brainstorm ideas.",
                "Step 2: Write an engaging introduction with a thesis statement.",
                "Step 3: Write body paragraphs, each with a main idea and supporting details.",
                "Step 4: Use examples from real life to support your points.",
                "Step 5: Write a conclusion that summarizes your main points.",
                "Step 6: Review for grammar, spelling, and flow.",
            ]
            explanation = (
                "An essay is a structured piece of writing that presents and supports an idea. "
                "A good essay has an introduction, body paragraphs with examples, and a conclusion. "
                "Use real-life examples to make your essay more convincing and interesting."
            )

        else:  # diary
            prompt = rng.choice(DIARY_PROMPTS)
            question_text = (
                f"Competency-Based Writing - Diary Entry\n\n"
                f"Task: {prompt}\n\n"
                f"Your diary entry should:\n"
                f"- Be written in the first person (I, me, my)\n"
                f"- Include your feelings and emotions\n"
                f"- Describe events in detail\n"
                f"- End with a reflection or thought\n\n"
                f"Word limit: 100-150 words"
            )
            answer_text = (
                f"Sample Diary Entry:\n\n"
                f"Dear Diary,\n\n"
                f"Today was one of the best days of my life! I can still feel the excitement "
                f"as I write this. It all started when {rng.choice(INDIAN_NAMES)} and I decided to "
                f"visit the {rng.choice(['zoo', 'museum', 'park', 'beach'])} in {rng.choice(INDIAN_PLACES)}. "
                f"We saw so many wonderful things - {rng.choice(ANIMALS).capitalize()} playing, "
                f"{rng.choice(FLOWERS).capitalize()} blooming everywhere, and children laughing.\n\n"
                f"I felt so happy and grateful. I realize now that the best moments in life are "
                f"the simple ones spent with people we love. I hope tomorrow is just as wonderful!\n\n"
                f"Goodnight, dear diary.\n\n"
                f"- {rng.choice(INDIAN_NAMES)}"
            )
            steps = [
                "Step 1: Start with 'Dear Diary,'",
                "Step 2: Write in the first person (use 'I', 'me', 'my').",
                "Step 3: Describe the events of the day.",
                "Step 4: Express your feelings and emotions honestly.",
                "Step 5: End with a personal reflection or thought.",
                "Step 6: Sign off with your name or a nickname.",
            ]
            explanation = (
                "A diary entry is a personal record of your thoughts and experiences. "
                "It is always written in the first person. "
                "Be honest about your feelings and write as if no one else will read it. "
                "This helps you express yourself freely."
            )

        results.append({
            "id": f"comp_writing_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "competency_writing",
            "subtopic": prompt_type,
            "question_type": "long_answer",
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": True,
            "syllabus_node": "Competency-Based-Writing",
        })

    return results


def _gen_competency_grammar_application(rng, count):
    """Generate competency-based grammar application questions."""
    results = []

    scenarios = [
        {
            "context": f"{rng.choice(INDIAN_NAMES)} and {rng.choice(INDIAN_NAMES)} are preparing a speech for the school assembly about saving water. They need to use correct grammar to make their speech effective.",
            "task": "Help them complete their speech by choosing the correct verb forms and tenses.",
            "template": (
                "Dear friends,\n\n"
                "Water is one of the most precious resources on our planet. Every day, millions of people "
                "in India {v1:walk/walks/walked} long distances to get clean water. In our school, "
                "we {v2:can/may/shall} make a difference by conserving water. Last month, our class "
                "{v3:save/saved/has saved} more than 500 litres of water by fixing leaks. If we all "
                "{v4:try/tries/tried}, we can save even more water this year."
            ),
            "answers": {"v1": "walk", "v2": "can", "v3": "saved", "v4": "try"},
        },
        {
            "context": f"A travel blogger is writing about her trip to {rng.choice(INDIAN_PLACES)}. She needs to use the correct tenses and prepositions.",
            "task": "Help the blogger complete her travel blog post with the correct grammar.",
            "template": (
                "My Amazing Trip to {place}\n\n"
                "Last week, I {v1:visit/visited/have visited} {place} with my family. "
                "We {v2:go/went/had gone} there by train from {place2}. "
                "The journey {v3:take/takes/took} about 12 hours. "
                "When we {v4:arrive/arrives/arrived}, the weather was beautiful. "
                "I {v5:am/is/was} very excited to see the famous {landmark}. "
                "We stayed {prep1:at/in/on} a hotel near the market. "
                "The local food {v6:is/was/will be} delicious, especially the {food}."
            ),
            "answers": {"v1": "visited", "v2": "went", "v3": "took", "v4": "arrived", "v5": "was", "prep1": "at", "v6": "was"},
        },
        {
            "context": f"{rng.choice(INDIAN_NAMES)} is writing an email to a pen pal in another country, describing Indian festivals. Help complete the email with correct grammar.",
            "task": "Fill in the blanks with the correct word forms.",
            "template": (
                "Dear Friend,\n\n"
                "I hope you are doing well. I want to tell you about {festival}, which we "
                "celebrate in India. It is a festival of {noun1:light/lights/lighted} and happiness. "
                "People {v1:decorate/decorates/decorated} their homes with {noun2:lamp/lamps} and "
                "{noun3:rangoli/rangolis}. We {v2:wear/wears/wore} new clothes and eat {adj1:sweet/sweets} "
                "dishes. The celebration {v3:last/lasts/lasted} for five days. "
                "Everyone {v4:enjoy/enjoys/enjoyed} the festival with great joy."
            ),
            "answers": {"noun1": "lights", "v1": "decorate", "noun2": "lamps", "noun3": "rangoli",
                        "v2": "wear", "adj1": "sweet", "v3": "lasts", "v4": "enjoys"},
        },
    ]

    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = rng.choice(["apply", "analyze"])
        scenario = rng.choice(scenarios)

        question_text = (
            f"Competency-Based Grammar Application\n\n"
            f"Context: {scenario['context']}\n\n"
            f"Task: {scenario['task']}\n\n"
            f"Complete the following text:\n{scenario['template']}"
        )

        # Templates use "{name:opt1/opt2}" style blanks; reduce them to plain
        # "{name}" fields so str.format can substitute the chosen answers.
        template = re.sub(r"\{(\w+):[^}]*\}", r"{\1}", scenario["template"])
        completed_text = template.format(
            **scenario["answers"],
            place=rng.choice(INDIAN_PLACES), place2=rng.choice(INDIAN_PLACES),
            landmark="Taj Mahal", food="dal makhani", festival=rng.choice(FESTIVALS))

        answer_text = (
            f"Completed Text:\n\n{completed_text}\n\n"
            f"Answers: {scenario['answers']}"
        )

        steps = [
            "Step 1: Read the complete context and understand the scenario.",
            "Step 2: Analyze each blank to determine the correct grammar rule.",
            "Step 3: Apply the appropriate tense, preposition, or word form for each blank.",
            "Step 4: Check subject-verb agreement throughout.",
            "Step 5: Read the completed text to ensure it flows naturally.",
            "Step 6: Verify all answers are grammatically correct.",
        ]
        explanation = (
            f"This question combines grammar skills with a real-world context. "
            f"By applying grammar rules to practical situations, we develop both "
            f"language skills and critical thinking. The scenario involves: {scenario['context'][:80]}... "
            f"Each blank tests a different grammar concept that is essential for effective communication."
        )

        results.append({
            "id": f"comp_grammar_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "competency_grammar",
            "subtopic": "grammar_in_context",
            "question_type": "fill_blank",
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": True,
            "syllabus_node": "Competency-Based-Grammar",
        })

    return results


def _gen_competency_vocabulary(rng, count):
    """Generate competency-based vocabulary questions."""
    results = []

    contexts = [
        {
            "context": f"{rng.choice(INDIAN_NAMES)} read a newspaper article about the {rng.choice(FESTIVALS)} celebrations across India. The article described how people from different states celebrate in unique ways.",
            "question": "Read the context and choose the best word from the synonyms given to complete each sentence.",
            "items": [
                {
                    "sentence": "The article was very ______. Everyone wanted to read it.",
                    "options": ["interesting", "boring", "difficult", "simple"],
                    "correct": "interesting",
                    "explanation": "'Interesting' is a synonym for 'engaging' or 'captivating', which describes the article."
                },
                {
                    "sentence": "The ______ ways of celebration showed India's diversity.",
                    "options": ["same", "different", "ordinary", "similar"],
                    "correct": "different",
                    "explanation": "'Different' means not the same, which fits the context of various celebration styles."
                },
            ],
        },
        {
            "context": f"During the monsoon season, {rng.choice(INDIAN_NAMES)} observed many changes in nature around {rng.choice(INDIAN_PLACES)}.",
            "question": "Choose the correct word (synonym or antonym) to complete each sentence.",
            "items": [
                {
                    "sentence": "The sky was ______ with thick clouds.",
                    "options": ["dark", "bright", "clear", "white"],
                    "correct": "dark",
                    "explanation": "'Dark' means not bright, which describes thick monsoon clouds."
                },
                {
                    "sentence": "The rain fell ______ that afternoon.",
                    "options": ["lightly", "heavily", "slowly", "quietly"],
                    "correct": "heavily",
                    "explanation": "'Heavily' is an adverb describing how the rain fell in large amounts."
                },
            ],
        },
    ]

    for i in range(count):
        diff = rng.choice(DIFFICULTY_LEVELS)
        bloom = rng.choice(["apply", "analyze"])
        ctx = rng.choice(contexts)

        items_text = ""
        for j, item in enumerate(ctx["items"]):
            items_text += f"\n{j+1}. {item['sentence']}\n"
            items_text += f"   Options: {', '.join(item['options'])}\n"
            items_text += f"   Correct answer: {item['correct']}\n"

        question_text = (
            f"Competency-Based Vocabulary\n\n"
            f"Context: {ctx['context']}\n\n"
            f"{ctx['question']}\n"
            f"{items_text}"
        )

        answer_text = (
            f"Answers:\n"
            + "\n".join(
                f"{j+1}. {item['correct']} - {item['explanation']}"
                for j, item in enumerate(ctx["items"])
            )
        )

        steps = [
            "Step 1: Read the context passage carefully.",
            "Step 2: Understand the meaning of each sentence with the blank.",
            "Step 3: Analyze the options and choose the most appropriate word.",
            "Step 4: Verify your choice makes sense in the context.",
            "Step 5: Check that the word fits grammatically as well.",
        ]
        explanation = (
            f"Vocabulary in context means understanding word meanings based on the surrounding text. "
            f"This skill is important for reading comprehension and effective communication. "
            f"The context '{ctx['context'][:60]}...' helps us determine the correct word choices."
        )

        results.append({
            "id": f"comp_vocab_{i+1}_{hashlib.md5(str(rng.getstate()).encode()).hexdigest()[:6]}",
            "topic": "competency_vocabulary",
            "subtopic": "vocabulary_in_context",
            "question_type": "mcq",
            "question_text": question_text,
            "answer": answer_text,
            "steps": steps,
            "explanation": explanation,
            "difficulty": diff,
            "bloom_level": bloom,
            "is_competency": True,
            "syllabus_node": "Competency-Based-Vocabulary",
        })

    return results


# ──────────────────────────────────────────────────────────────
#  MAIN DISPATCHER
# ──────────────────────────────────────────────────────────────

STD_GENERATORS = {
    "prose_comprehension": _gen_prose_comprehension,
    "poetry_comprehension": _gen_poetry_comprehension,
    "grammar_tenses": _gen_grammar_tenses,
    "grammar_parts_of_speech": _gen_grammar_parts_of_speech,
    "grammar_reported_speech": _gen_grammar_reported_speech,
    "grammar_active_passive": _gen_grammar_active_passive,
    "grammar_prepositions": _gen_grammar_prepositions,
    "grammar_conjunctions": _gen_grammar_conjunctions,
    "grammar_articles": _gen_grammar_articles,
    "grammar_determiners": _gen_grammar_determiners,
    "grammar_punctuation": _gen_grammar_punctuation,
    "grammar_subject_verb_agreement": _gen_grammar_subject_verb_agreement,
    "grammar_sentence_types": _gen_grammar_sentence_types,
    "grammar_adjective_adverb": _gen_grammar_adjective_adverb,
    "grammar_singular_plural": _gen_grammar_singular_plural,
    "vocabulary_synonyms": _gen_vocabulary_synonyms,
    "vocabulary_antonyms": _gen_vocabulary_antonyms,
    "writing_notice": _gen_competency_writing,
    "writing_formal_letter": _gen_competency_writing,
    "writing_informal_letter": _gen_competency_writing,
    "writing_story": _gen_competency_writing,
    "writing_essay": _gen_competency_writing,
    "writing_diary": _gen_competency_writing,
}

COMP_GENERATORS = {
    "competency_reading": _gen_competency_comprehension,
    "competency_writing": _gen_competency_writing,
    "competency_grammar": _gen_competency_grammar_application,
    "competency_vocabulary": _gen_competency_vocabulary,
}

# Map all topics to their standard generator (competency topics get special handling)
ALL_GENERATORS = {}
ALL_GENERATORS.update(STD_GENERATORS)
ALL_GENERATORS.update(COMP_GENERATORS)

# Group topics by category
GRAMMAR_TOPICS = [t for t in TOPICS if t.startswith("grammar_")]
VOCAB_TOPICS = [t for t in TOPICS if t.startswith("vocabulary_")]
WRITING_TOPICS = [t for t in TOPICS if t.startswith("writing_")]
READING_TOPICS = [t for t in TOPICS if t.startswith("prose") or t.startswith("poetry")]
COMP_TOPICS = ["competency_reading", "competency_writing", "competency_grammar", "competency_vocabulary"]


def generate_questions(seed=None, count=5, topic=None):
    """
    Generate practice questions for CISCE Class 6 English.

    Args:
        seed: Random seed for reproducibility (int or None).
        count: Number of questions to generate (int, default 5).
        topic: Specific topic to generate questions for (str or None for all topics).

    Returns:
        list of question dicts. Each dict has:
            id, topic, subtopic, question_type, question_text,
            answer, steps, explanation, difficulty, bloom_level,
            is_competency, syllabus_node
    """
    rng = random.Random(seed)
    questions = []

    if topic:
        # Generate all from specific topic
        generator = ALL_GENERATORS.get(topic)
        if generator:
            questions.extend(generator(rng, count))
        else:
            # Fallback: distribute across all topics
            per_topic = max(1, count // len(TOPICS))
            remaining = count
            for t in TOPICS:
                n = min(per_topic, remaining)
                if n <= 0:
                    break
                gen = ALL_GENERATORS.get(t)
                if gen:
                    questions.extend(gen(rng, n))
                    remaining -= n
    else:
        # Mix: 50% standard, 50% competency-based
        std_count = count // 2
        comp_count = count - std_count

        # Distribute standard questions across topics
        per_std = max(1, std_count // len(STD_GENERATORS))
        remaining_std = std_count
        std_topic_list = list(STD_GENERATORS.keys())
        rng.shuffle(std_topic_list)

        for t in std_topic_list:
            if remaining_std <= 0:
                break
            n = min(per_std, remaining_std)
            questions.extend(STD_GENERATORS[t](rng, n))
            remaining_std -= n

        # Distribute competency questions
        per_comp = max(1, comp_count // len(COMP_GENERATORS))
        remaining_comp = comp_count
        comp_topic_list = list(COMP_GENERATORS.keys())
        rng.shuffle(comp_topic_list)

        for t in comp_topic_list:
            if remaining_comp <= 0:
                break
            n = min(per_comp, remaining_comp)
            questions.extend(COMP_GENERATORS[t](rng, n))
            remaining_comp -= n

    # Trim to exact count
    questions = questions[:count]

    # Ensure we always have the right number
    while len(questions) < count:
        # Fill with any generator
        g = rng.choice(list(ALL_GENERATORS.values()))
        questions.extend(g(rng, 1))
    questions = questions[:count]

    return questions


def print_question(q, idx):
    """Pretty-print a single question."""
    print("=" * 70)
    print(f"QUESTION {idx + 1}")
    print("=" * 70)
    print(f"ID:          {q['id']}")
    print(f"Topic:       {q['topic']}")
    print(f"Subtopic:    {q['subtopic']}")
    print(f"Type:        {q['question_type']}")
    print(f"Difficulty:  {q['difficulty']}")
    print(f"Bloom Level: {q['bloom_level']} ({BLOOM_LEVELS.get(q['bloom_level'], '')})")
    print(f"Competency:  {'Yes (NEP 2020)' if q['is_competency'] else 'No (Standard)'}")
    print(f"Syllabus:    {q['syllabus_node']}")
    print()
    print("QUESTION:")
    print(q['question_text'])
    print()
    print("ANSWER:")
    print(q['answer'])
    print()
    print("STEPS:")
    for step in q['steps']:
        print(f"  {step}")
    print()
    print("EXPLANATION:")
    print(q['explanation'])
    print()


def main():
    """Demonstrate the question generator."""
    print("=" * 70)
    print("CISCE CLASS 6 ENGLISH - QUESTION GENERATOR")
    print("=" * 70)
    print()

    # Demo 1: Generate 5 questions with a fixed seed
    print("--- Demo 1: 5 Standard Questions (seed=42) ---")
    print()
    questions = generate_questions(seed=42, count=5)
    for i, q in enumerate(questions):
        print_question(q, i)

    # Demo 2: Generate 5 competency-based questions
    print("\n--- Demo 2: 5 Competency-Based Questions (seed=123) ---")
    print()
    comp_questions = generate_questions(seed=123, count=5)
    for i, q in enumerate(comp_questions):
        print_question(q, i)

    # Demo 3: Generate questions for a specific topic
    print("\n--- Demo 3: Questions on 'grammar_tenses' (seed=99) ---")
    print()
    tense_questions = generate_questions(seed=99, count=3, topic="grammar_tenses")
    for i, q in enumerate(tense_questions):
        print_question(q, i)

    # Demo 4: Demonstrate reproducibility
    print("\n--- Demo 4: Reproducibility Check (seed=77, count=3) ---")
    print("Run 1:")
    q1 = generate_questions(seed=77, count=3)
    print(f"  Generated {len(q1)} questions")
    print(f"  First question type: {q1[0]['question_type']}, topic: {q1[0]['topic']}")
    print("Run 2 (same seed):")
    q2 = generate_questions(seed=77, count=3)
    print(f"  Generated {len(q2)} questions")
    print(f"  First question type: {q2[0]['question_type']}, topic: {q2[0]['topic']}")
    print(f"  Reproducible: {q1[0]['id'] == q2[0]['id']}")

    # Demo 5: Show all available topics
    print("\n--- Demo 5: All Available Topics ---")
    all_topics = list(STD_GENERATORS.keys()) + list(COMP_GENERATORS.keys())
    print(f"Total topics: {len(all_topics)}")
    for t in all_topics:
        is_comp = " [COMPETENCY-BASED]" if t in COMP_GENERATORS else ""
        print(f"  - {t}{is_comp}")

    print("\n" + "=" * 70)
    print("=" * 70)


if __name__ == "__main__":
    main()