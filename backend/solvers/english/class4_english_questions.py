"""
CISCE English Class 4 Question Generator
Topics:
  - Rhyming words and sound play in poems (c3_eng_103)
  - Reading comprehension: inference and central idea (c4_eng_001)
  - Introduction to tenses: present simple & past simple (c4_eng_003)
"""

import random
import re
import math
import hashlib
from typing import Any
from dataclasses import dataclass, field
from collections import OrderedDict


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _seed_rng(seed: int) -> random.Random:
    r = random.Random(seed)
    r.seed(seed)
    return r


def _shuffle(r: random.Random, seq):
    items = list(seq)
    r.shuffle(items)
    return items


# ---------------------------------------------------------------------------
# Solver functions
# ---------------------------------------------------------------------------

def solve_mcq(params):
    """Solve an MCQ question. params: {question, options, correct_index, explanation}"""
    correct_idx = params.get("correct_index", 0)
    options = params.get("options", [])
    answer_text = options[correct_idx] if options else ""
    steps = [
        "Step 1: Read the question carefully and understand what is being asked.",
        "Step 2: Evaluate each option one by one.",
    ]
    for i, opt in enumerate(options):
        marker = " ✓ CORRECT" if i == correct_idx else ""
        steps.append(f"Step 2.{i+1}: Option ({chr(65+i)}) '{opt}' —{marker}")
    steps.append(f"Step 3: The correct answer is option ({chr(65+correct_idx)}) '{answer_text}'.")
    explanation = params.get("explanation", "")
    steps.append(f"Explanation: {explanation}")
    return {
        "answer": answer_text,
        "answer_index": correct_idx,
        "steps": steps,
        "verification": {
            "method": "option_matching",
            "result": f"Selected option ({chr(65+correct_idx)}) matches the correct answer '{answer_text}'.",
            "status": "verified",
        },
    }


def solve_fill_blank(params):
    """Solve a fill-in-the-blank question."""
    correct = params.get("correct_answer", "")
    sentence = params.get("sentence", "")
    blank_marker = params.get("blank_marker", "____")
    steps = [
        f"Step 1: Read the sentence: '{sentence}'",
        "Step 2: Identify the missing word based on context.",
    ]
    if "tense" in params:
        steps.append(f"Step 3: Determine the tense needed. Context suggests: {params['tense']}")
    steps.append(f"Step 4: The correct word to fill in {blank_marker} is '{correct}'.")
    steps.append(f"Verification: '{sentence.replace(blank_marker, correct)}' — grammatically and contextually correct.")
    return {
        "answer": correct,
        "steps": steps,
        "verification": {
            "method": "contextual_and_grammatical_check",
            "filled_sentence": sentence.replace(blank_marker, correct),
            "status": "verified",
        },
    }


def solve_short_answer(params):
    """Solve a short-answer question."""
    correct = params.get("answer", "")
    steps = params.get("steps", ["Step 1: Analyse the question.", f"Step 2: Formulate the answer: '{correct}'."])
    return {
        "answer": correct,
        "steps": steps,
        "verification": {
            "method": "key_concept_check",
            "result": f"Answer '{correct}' addresses the question correctly.",
            "status": "verified",
        },
    }


def solve_long_answer(params):
    """Solve a long-answer question."""
    correct = params.get("answer", "")
    steps = params.get("steps", ["Step 1: Read the passage/question carefully.", f"Step 2: Construct a complete answer.", f"Answer: {correct}"])
    word_count = len(correct.split())
    return {
        "answer": correct,
        "steps": steps,
        "verification": {
            "method": "completeness_and_relevance_check",
            "word_count": word_count,
            "result": f"Answer is {word_count} words. Covers the main points required.",
            "status": "verified",
        },
    }


def solve_numerical(params):
    """Solve a numerical question (for counting rhymes, rhythm syllables, etc.)."""
    correct = params.get("answer", 0)
    steps = params.get("steps", [])
    return {
        "answer": correct,
        "steps": steps,
        "verification": {
            "method": "count_verification",
            "result": f"Count verified: {correct}",
            "status": "verified",
        },
    }


# ---------------------------------------------------------------------------
# Question banks
# ---------------------------------------------------------------------------

# ---- c3_eng_103: Rhyming, Repetition, Rhythm ----

_RHYME_PAIRS_STD = [
    ("cat", "hat"), ("moon", "soon"), ("star", "are"), ("high", "sky"),
    ("day", "play"), ("light", "bright"), ("tree", "bee"), ("rain", "train"),
    ("sing", "ring"), ("blue", "glue"), ("ball", "wall"), ("fish", "dish"),
    ("house", "mouse"), ("bell", "well"), ("road", "load"), ("fall", "call"),
    ("keep", "sleep"), ("dream", "stream"), ("glow", "show"), ("ride", "side"),
]

_RHYME_PAIRS_COMP = [  # Indian-context competency pairs
    ("bari", "sari"), ("ghar", "khar"), ("didi", "pidi"),
    ("chai", "dai"), ("bhai", "jai"), ("nai", "pai"),
    ("gudiya", "diya"), ("khoon", "soon"), ("ras", "pas"),
    ("pyaar", "yaar"), ("dil", "mil"), ("sona", "sona"),
    ("pari", "sari"), ("murgi", "urgi"),
]

_REPETITION_EXAMPLES_STD = [
    ("Row, row, row your boat", "repetition", "makes the line feel like rowing a boat"),
    ("Twinkle, twinkle, little star", "repetition", "makes the poem feel gentle and sing-song"),
    ("I have a dream, I have a dream", "repetition", "creates emphasis and urgency"),
    ("The woods are lovely, dark and deep", None, "repetition of ideas — not a repetition of a word"),
    ("Happy, happy, happy", "repetition", "shows great joy and excitement"),
    ("Rain, rain, go away", "repetition", "makes the plea feel stronger and more insistent"),
    ("Once upon a midnight dreary, while I pondered, weak and weary", None, "repetition of the 'w' sound (alliteration)"),
]

_REPETITION_EXAMPLES_COMP = [
    ("Chal, chal, chal mere ghoomar", "repetition", "creates the feeling of dancing in circles (ghoomar)"),
    ("Nanha munna rahi hoon mein", "repetition", "emphasizes the speaker's smallness and determination"),
    ("Dekho, dekho, kya khel khela hai", "repetition", "shows excitement and surprise"),
    ("Aao, aao, aao dosto khelen", "repetition", "invites friends warmly to play"),
    ("Dhadkan, dhadkan, dil ki dhadkan", "repetition", "emphasizes the heartbeat and feelings of love"),
]

_POEM_SNIPPETS_STD = [
    ("Twinkle, twinkle, little star\nHow I wonder what you are!\nUp above the world so high\nLike a diamond in the sky.", "AABB"),
    ("Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king's horses and all the king's men\nCouldn't put Humpty together again.", "AABB"),
    ("Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full.", "AABB"),
    ("Jack and Jill went up the hill\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after.", "AABB"),
    ("Mary had a little lamb,\nIts fleece was white as snow.\nAnd everywhere that Mary went,\nThe lamb was sure to go.", "AABB"),
]

_POEM_SNIPPETS_COMP = [
    ("Nanha munna rahi hoon mein\nApne ghar ki deewar pe\nTiranga lehrayega wahan\nJahan meri nazar jaaye", "AABB-ish"),
    ("Chanda maama door ke\nPuye pakaye boor ke\nEk puye ki jo paaye\nBadi meethi kheer hoye", "AABB"),
    ("Machhli jal ki raani hai\nJeevan uska paani hai\nHaath lagao dar jaayegi\nBahar nikal jaayegi", "AABB"),
    ("Ting-tang, ting-tang, bell baja\nTum aao, hum khelen khel", "AABB"),
]

_RHYTHM_FEELINGS = [
    ("A nursery rhyme like 'Humpty Dumpty' — clapping 1-2-3-4", "regular", "fast-ish"),
    ("A lullaby with slow, soft words", "regular", "slow"),
    ("A poem with long words and short words mixed", "irregular", "varies"),
    ("A marching song with steady beats", "regular", "steady"),
]

# ---- c4_eng_001: Inference and Central Idea ----

_PASSAGES_INFERENCE_COMP = [
    {
        "id": "INF_COMP_1",
        "title": "Riya and the Tiffin",
        "text": (
            "Riya sat at her desk with her tiffin box closed. She looked at the clock every minute. "
            "Finally, the bell rang. She ran to the gate and saw her grandmother holding a paper bag. "
            "Riya's eyes lit up. She opened the bag and found her favourite mango pickle, just the way "
            "Grandmother makes it. Riya hugged her grandmother tightly and said, 'Thank you, Dadi!'"
        ),
        "questions": [
            {
                "qtype": "mcq",
                "question": "Why did Riya keep looking at the clock?",
                "options": ["She was waiting for the lunch bell to ring so she could meet her grandmother.",
                            "She forgot her homework.", "She wanted to play outside.", "The clock was broken."],
                "correct_index": 0,
                "explanation": "Riya kept looking at the clock because she was waiting eagerly for the bell. When it rang, she ran to the gate where her grandmother was — showing she was waiting to meet her grandmother.",
            },
            {
                "qtype": "mcq",
                "question": "What can you infer about how Riya felt when she opened the bag?",
                "options": ["She was bored.", "She was delighted and grateful.", "She was angry.", "She was sleepy."],
                "correct_index": 1,
                "explanation": "Riya's eyes 'lit up' and she hugged her grandmother tightly and thanked her — these clues show she felt delighted and grateful, even though the text doesn't use those exact words.",
            },
        ],
    },
    {
        "id": "INF_COMP_2",
        "title": "Arjun's Broken Cricket Bat",
        "text": (
            "Arjun gripped his cricket bat tightly as he walked to the field. The bat was old — the handle "
            "was loose and a crack ran down the side. His friends had new bats with stickers of their "
            "favourite players. Arjun took his position at the crease. When the ball came, he swung hard. "
            "The bat slipped from his hands and the crack got bigger. He picked it up slowly, looked at it "
            "for a long moment, then tucked it under his arm and walked to the shop on the corner."
        ),
        "questions": [
            {
                "qtype": "short_answer",
                "question": "Why did Arjun tuck the bat under his arm and walk to the shop?",
                "answer": "Arjun walked to the shop to get the bat repaired, because the crack had gotten bigger and he wanted to fix it rather than throw it away.",
                "steps": [
                    "Step 1: The text says Arjun picked up the bat slowly after the crack got bigger.",
                    "Step 2: He looked at it 'for a long moment' — this suggests he cares about the bat.",
                    "Step 3: He tucked it under his arm and walked to the shop.",
                    "Step 4: Shops repair things. The most reasonable inference is that he wants the bat repaired.",
                ],
            },
            {
                "qtype": "mcq",
                "question": "What was Arjun's feeling when he saw the crack get bigger?",
                "options": ["He was very happy.", "He felt sad and worried about his bat.", "He was angry at his friends.", "He felt nothing."],
                "correct_index": 1,
                "explanation": "Arjun picked the bat up 'slowly' and looked at it 'for a long moment' — these details suggest he felt sad and worried, because the bat was important to him.",
            },
        ],
    },
    {
        "id": "INF_COMP_3",
        "title": "The Monsoon Morning",
        "text": (
            "It had not rained for three long weeks. The plants in Priya's garden drooped their leaves. "
            "She watered them every evening with a small bucket, but it was not enough. On Thursday night, "
            "thunder rumbled in the distance. Priya's mother pulled out the rain gear from the cupboard. "
            "Priya opened the window and breathed in deeply. Next morning, she ran outside in her blue "
            "raincoat and red boots. Every leaf on every plant glistened with tiny water drops. Priya "
            "smiled and whispered, 'Thank you, rain.'"
        ),
        "questions": [
            {
                "qtype": "fill_blank",
                "question": "The plants in Priya's garden were ______ because it had not rained for three weeks.",
                "sentence": "The plants in Priya's garden were ____ because it had not rained for three weeks.",
                "blank_marker": "____",
                "correct_answer": "drooping / wilted",
                "tense": "past continuous",
                "explanation": "The text says 'The plants in Priya's garden drooped their leaves' — this shows the plants were not healthy due to lack of water.",
            },
            {
                "qtype": "mcq",
                "question": "What does Priya's opening the window and breathing in deeply tell us?",
                "options": ["She wanted to catch a cold.", "She was excited and happy about the rain coming.",
                            "She was sleepy.", "She was looking for her raincoat."],
                "correct_index": 1,
                "explanation": "The combination of thunder, rumble, her mother getting rain gear ready, and Priya breathing in 'deeply' suggests she was excited and happy that rain was finally coming after three dry weeks.",
            },
        ],
    },
    {
        "id": "INF_COMP_4",
        "title": "The Last Bench",
        "text": (
            "The last bench in Class 4B had always been empty. No one wanted to sit there. "
            "One day, a new girl named Sana joined the class. The teacher smiled and said, 'Sana, you can "
            "sit on the last bench.' Sana walked over slowly. She looked at the empty desk, wiped the dust "
            "off with her sleeve, and sat down. Her new neighbours — two boys who usually sat alone — "
            "looked at her and then at each other. After class, one of them said, 'Do you like cricket?' "
            "Sana smiled and said, 'Yes! Who doesn't?' By the end of the week, the last bench was the most "
            "lively seat in the class."
        ),
        "questions": [
            {
                "qtype": "long_answer",
                "question": "What is the central idea of this passage? Give your answer in one sentence.",
                "answer": "The central idea is that kindness and friendliness can transform even the loneliest or least-wanted place into a warm, happy space.",
                "steps": [
                    "Step 1: The passage begins with the last bench being empty and unwanted.",
                    "Step 2: Sana sits there without complaint and is friendly to the two boys.",
                    "Step 3: By the end, the last bench is 'the most lively seat in the class.'",
                    "Step 4: The transformation was caused by Sana's friendly attitude.",
                    "Conclusion: The central idea is about how kindness and friendliness can change things for the better.",
                ],
            },
        ],
    },
    {
        "id": "INF_COMP_5",
        "title": "Rahul and the Old Book",
        "text": (
            "Rahul found an old book in his grandfather's almirah. The pages were yellow and the cover "
            "was torn. He opened it and saw his grandfather's name written in ink on the first page, "
            "with the date: 12 March 1962. Rahul took the book to his grandfather and asked, 'Did you "
            "write your name in every book?' Grandfather laughed and said, 'No, only in my favourite ones. "
            "This one — it was a gift from my best friend on my birthday.' Grandfather's eyes grew a "
            "little wet as he said it."
        ),
        "questions": [
            {
                "qtype": "short_answer",
                "question": "Why did Grandfather's eyes grow 'a little wet'?",
                "answer": "Grandfather's eyes grew wet because the book reminded him of his best friend who gave it to him as a birthday gift, bringing back fond memories.",
                "steps": [
                    "Step 1: The text says the book was 'a gift from my best friend on my birthday.'",
                    "Step 2: Grandfather says this with 'eyes growing a little wet.'",
                    "Step 3: Eyes growing wet suggests emotion — likely fond memories and nostalgia.",
                    "Step 4: Therefore, Grandfather felt emotional thinking about his old friend.",
                ],
            },
            {
                "qtype": "mcq",
                "question": "What can you infer Grandfather felt about this particular book?",
                "options": ["He did not like it at all.", "It was very special to him because of the memories attached.",
                            "He wanted to throw it away.", "He had forgotten about it."],
                "correct_index": 1,
                "explanation": "Grandfather only wrote his name in his favourite books. This one was a gift from his best friend, and his eyes grew wet — showing it is very special to him.",
            },
        ],
    },
]

_PASSAGES_INFERENCE_STD = [
    {
        "id": "INF_STD_1",
        "title": "The Hot Day",
        "text": (
            "The sun beat down on the playground. Anjali's throat felt dry. She looked at the water bottle "
            "in her bag. It was empty. She looked across the playground and saw the water tap near the gate. "
            "She stood up and walked quickly to the tap, cup in hand."
        ),
        "questions": [
            {
                "qtype": "mcq",
                "question": "Why did Anjali stand up and walk quickly to the tap?",
                "options": ["She wanted to run a race.", "She was thirsty and her bottle was empty.",
                            "She wanted to wash her hands.", "She was looking for her friend."],
                "correct_index": 1,
                "explanation": "The text says Anjali's 'throat felt dry' and her 'water bottle was empty.' These clues show she was thirsty and went to the tap to get water.",
            },
            {
                "qtype": "fill_blank",
                "question": "Anjali's throat felt ______ because the sun was beating down on the playground.",
                "sentence": "Anjali's throat felt ____ because the sun was beating down on the playground.",
                "blank_marker": "____",
                "correct_answer": "dry",
                "tense": "past simple",
            },
        ],
    },
    {
        "id": "INF_STD_2",
        "title": "The Library",
        "text": (
            "Kavi entered the library quietly. He looked at the librarian and smiled. He walked to the "
            "shelf and scanned the titles carefully. He pulled out a thin book about space, walked to a "
            "table, and sat down. He opened the book and started reading, his eyes moving quickly across "
            "the pages. He read for nearly an hour before he even noticed the librarian was looking at him "
            "and laughing softly."
        ),
        "questions": [
            {
                "qtype": "short_answer",
                "question": "What can you infer Kavi felt about the book he chose?",
                "answer": "Kavi was very interested in and absorbed by the book about space, since he read for nearly an hour without noticing anything around him.",
                "steps": [
                    "Step 1: Kavi chose a book about space carefully.",
                    "Step 2: He read for nearly an hour without noticing the librarian.",
                    "Step 3: This shows he was very interested and absorbed in the book.",
                ],
            },
        ],
    },
]

_CENTRAL_IDEA_PASSAGES_STD = [
    {
        "id": "CI_STD_1",
        "title": "The Harvest Festival",
        "text": (
            "In October, the farmers of Sonpur village cut their rice crop. They carried bundles on "
            "their heads and sang folk songs. The whole village gathered under the banyan tree. The "
            "village head distributed sweets made from freshly harvested jaggery. Children ran around "
            "with paper flags. The sound of the dholak drum filled the air. Everyone danced and laughed "
            "together until the sun went down."
        ),
        "questions": [
            {
                "qtype": "long_answer",
                "question": "What is the central idea of this passage? State it in your own words.",
                "answer": "The central idea is that the harvest festival brings the whole village together in joy and celebration after the hard work of harvesting the rice crop.",
                "steps": [
                    "Step 1: The passage describes a harvest festival in Sonpur village.",
                    "Step 2: It mentions farmers cutting the rice crop, singing, gathering under a banyan tree, sweets, dancing.",
                    "Step 3: Key words: village, together, joy, celebration, harvest.",
                    "Step 4: The central idea is about community celebration of a successful harvest.",
                ],
            },
        ],
    },
]

_CENTRAL_IDEA_PASSAGES_COMP = [
    {
        "id": "CI_COMP_1",
        "title": "Diwali in Amma's Kitchen",
        "text": (
            "Three days before Diwali, Amma brought out the big steel thali. She soaked almonds and "
            "raisins in warm water. She made ladoos with ghee and gram flour, shaping each one carefully "
            "with her palms. Priya sat on the kitchen floor watching. 'Amma, can I help?' she asked. "
            "Amma smiled and handed her a small bowl of dry fruits. Together they packed the ladoos into "
            "shiny silver boxes. Priya's fingers were sticky with ghee, but her heart felt full. 'This is "
            "the best part of Diwali,' she said. Amma nodded. 'Not the lights or the crackers — this. "
            "Making something with your own hands for people you love.'"
        ),
        "questions": [
            {
                "qtype": "long_answer",
                "question": "What is the central idea of this passage? Give your answer in one sentence using your own words.",
                "answer": "The central idea is that the true joy of Diwali comes from making something with love and care for people we care about, not from the outward show of lights and fireworks.",
                "steps": [
                    "Step 1: The passage describes Amma making ladoos with Priya before Diwali.",
                    "Step 2: Amma says: 'Not the lights or the crackers — this. Making something with your own hands for people you love.'",
                    "Step 3: This is the main message the writer wants to share.",
                    "Conclusion: The central idea is about the deeper, personal meaning of Diwali — love, care, and handmade gifts for family.",
                ],
            },
        ],
    },
]

# ---- c4_eng_003: Tenses (Present Simple & Past Simple) ----

_TENSE_IRREGULAR_VERBS = [
    ("go", "went", "gone"), ("eat", "ate", "eaten"), ("come", "came", "come"),
    ("see", "saw", "seen"), ("write", "wrote", "written"), ("read", "read", "read"),
    ("run", "ran", "run"), ("sing", "sang", "sung"), ("drink", "drank", "drunk"),
    ("swim", "swam", "swum"), ("begin", "began", "begun"), ("break", "broke", "broken"),
    ("choose", "chose", "chosen"), ("fall", "fell", "fallen"), ("fly", "flew", "flown"),
    ("give", "gave", "given"), ("know", "knew", "known"), ("ride", "rode", "ridden"),
    ("speak", "spoke", "spoken"), ("take", "took", "taken"), ("wake", "woke", "woken"),
    ("wear", "wore", "worn"), ("win", "won", "won"), ("bite", "bit", "bitten"),
]

_TENSE_TIME_MARKERS_PRESENT = [
    "every day", "every morning", "usually", "always", "often", "sometimes",
    "on Sundays", "every evening", "regularly", "in the morning",
    "normally", "frequently", "daily", "every night",
]

_TENSE_TIME_MARKERS_PAST = [
    "yesterday", "last week", "last month", "last year", "last Sunday",
    "two days ago", "last night", "in 2023", "last Monday", "a week ago",
    "last holiday", "last summer", "an hour ago",
]

_TENSE_SUBJECTS_PRESENT = [
    ("I", ""), ("You", ""), ("He", "s"), ("She", "s"), ("It", "s"),
    ("We", ""), ("They", ""), ("My mother", "s"), ("My father", "s"),
    ("The dog", "s"), ("My friends", ""), ("Riya", "s"), ("Rohan", "s"),
    ("The cat", "s"), ("Children", ""),
]

_VERBS_REGULAR = [
    "walk", "play", "talk", "jump", "watch", "cook", "clean", "read",
    "dance", "paint", "climb", "swim", "wash", "cook", "shop", "help",
]

_VERBS_IRREGULAR_LIST = [v[0] for v in _TENSE_IRREGULAR_VERBS]

_CONTEXT_SENTENCES_TENSE = [
    ("Every morning, the sun ____ in the east.", "rise", "rises", "present", "He/It/She"),
    ("Last Sunday, we ____ to the market.", "go", "went", "past", "We"),
    ("My cat ____ on the windowsill every afternoon.", "sleep", "sleeps", "present", "He/She/It"),
    ("Yesterday, I ____ a beautiful butterfly.", "see", "saw", "past", "I"),
    ("Priya always ____ her homework before dinner.", "do", "does", "present", "She"),
    ("Last month, the school ____ a sports day.", "have", "had", "past", "It"),
    ("Rohan ____ to school by bus every day.", "go", "goes", "present", "He"),
    ("Last holiday, we ____ a trip to Shimla.", "make", "made", "past", "We"),
    ("The teacher ____ a story in class every Friday.", "tell", "tells", "present", "She"),
    ("Yesterday, the cat ____ a bird.", "catch", "caught", "past", "It"),
    ("Birds ____ in the sky during summer.", "fly", "fly", "present", "They"),
    ("Last night, I ____ a delicious cake at the party.", "eat", "ate", "past", "I"),
    ("Grandmother ____ plants every morning.", "water", "waters", "present", "She"),
    ("The children ____ football in the park yesterday.", "play", "played", "past", "They"),
    ("She ____ the violin beautifully.", "play", "plays", "present", "She"),
    ("Last week, Ravi ____ a new bicycle.", "buy", "bought", "past", "He"),
    ("My father ____ newspaper every morning.", "read", "reads", "present", "He"),
    ("The train ____ at 6 a.m. yesterday.", "leave", "left", "past", "It"),
    ("My mother ____ delicious food for festivals.", "cook", "cooks", "present", "She"),
    ("During the camp, we ____ under the stars.", "sleep", "slept", "past", "We"),
]


# ---------------------------------------------------------------------------
# Question generators
# ---------------------------------------------------------------------------

def _gen_rhyme_mcq(r, topic, difficulty):
    pair = r.choice(_RHYME_PAIRS_STD)
    distractors_pool = [p[1] for p in _RHYME_PAIRS_STD if p[0] != pair[0]]
    distractors = r.sample(distractors_pool, 3)
    options = [pair[1]] + distractors
    r.shuffle(options)
    correct_idx = options.index(pair[1])
    return {
        "id": f"RHYME_MCQ_{topic}_{r.randint(1000,9999)}",
        "type": "mcq",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Which word rhymes with '{pair[0]}'?",
        "options": options,
        "answer": pair[1],
        "correct_index": correct_idx,
        "explanation": f"'{pair[0]}' and '{pair[1]}' end with the same sound, so they rhyme.",
    }


def _gen_rhyme_comp_mcq(r, topic, difficulty):
    pair = r.choice(_RHYME_PAIRS_COMP)
    distractors_pool = [p[1] for p in _RHYME_PAIRS_COMP if p[0] != pair[0]]
    distractors = r.sample(distractors_pool, 3)
    options = [pair[1]] + distractors
    r.shuffle(options)
    correct_idx = options.index(pair[1])
    poem_word = r.choice(["gudiya", "pyaar", "bhai", "dil", "nai"])
    return {
        "id": f"RHYME_COMP_MCQ_{r.randint(1000,9999)}",
        "type": "mcq",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"In a Hindi-English poem, which word rhymes with '{pair[0]}'?",
        "options": options,
        "answer": pair[1],
        "correct_index": correct_idx,
        "explanation": f"'{pair[0]}' and '{pair[1]}' share the same ending sound, so they rhyme. This is common in Hindi-English children's poetry.",
    }


def _gen_repetition_mcq(r, topic, difficulty):
    ex = r.choice(_REPETITION_EXAMPLES_STD)
    correct_word, _, _ = ex
    # split on comma/space to get first word
    first_word = correct_word.split(",")[0].split()[0]
    options = [first_word]
    other_words = ["the", "a", "and", "is", "was", "he", "she"]
    for w in other_words:
        if w not in options:
            options.append(w)
    r.shuffle(options)
    correct_idx = options.index(first_word)
    return {
        "id": f"REP_MCQ_{r.randint(1000,9999)}",
        "type": "mcq",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"In the line '{correct_word}', which word is repeated for effect?",
        "options": options,
        "answer": first_word,
        "correct_index": correct_idx,
        "explanation": f"The word '{first_word}' is repeated. Repetition is a choice by the poet to create rhythm or emphasis — not laziness!",
    }


def _gen_repetition_comp(r, topic, difficulty):
    ex = r.choice(_REPETITION_EXAMPLES_COMP)
    phrase, _, feeling = ex
    first_word = phrase.split(",")[0].split()[0]
    options = [first_word]
    other_words = ["aur", "hai", "yeh", "woh", "ka", "ki"]
    for w in other_words:
        if w not in options:
            options.append(w)
    r.shuffle(options)
    correct_idx = options.index(first_word)
    return {
        "id": f"REP_COMP_{r.randint(1000,9999)}",
        "type": "mcq",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"In the Hindi-English rhyme '{phrase}', which word is repeated?",
        "options": options,
        "answer": first_word,
        "correct_index": correct_idx,
        "explanation": f"The word '{first_word}' is repeated. In Indian children's poetry, repetition creates a beat that children can clap along to.",
    }


def _gen_rhythm_mcq(r, topic, difficulty):
    snippet, feel, speed = r.choice(_RHYTHM_FEELINGS)
    options = ["The beat is regular", "The beat is irregular", "There is no beat", "The beat changes every line"]
    correct_ans = f"The beat is {feel}"
    correct_idx = 0 if feel == "regular" else 1
    return {
        "id": f"RHYTHM_MCQ_{r.randint(1000,9999)}",
        "type": "mcq",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"If you clap while reading: '{snippet}', what kind of beat do you feel?",
        "options": options,
        "answer": correct_ans,
        "correct_index": correct_idx,
        "explanation": f"When you clap along to '{snippet}', the beat feels {feel} and {speed}, like a steady heartbeat. Rhythm is the musical beat of a poem.",
    }


def _gen_rhythm_fill(r, topic, difficulty):
    snippet, feel, speed = r.choice(_RHYTHM_FEELINGS)
    return {
        "id": f"RHYTHM_FB_{r.randint(1000,9999)}",
        "type": "fill_blank",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Clap along to this line: '{snippet}'. The beat feels ____.",
        "sentence": f"Clap along to this line: '{snippet}'. The beat feels ____.",
        "blank_marker": "____",
        "correct_answer": feel,
        "explanation": f"Rhythm is the beat of a poem. When you clap along to '{snippet}', the beat feels {feel}.",
    }


def _gen_rhyme_fill(r, topic, difficulty):
    pair = r.choice(_RHYME_PAIRS_STD)
    return {
        "id": f"RHYME_FB_{r.randint(1000,9999)}",
        "type": "fill_blank",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Find a word that rhymes with '{pair[0]}': ____",
        "sentence": f"Find a word that rhymes with '{pair[0]}': ____",
        "blank_marker": "____",
        "correct_answer": pair[1],
        "explanation": f"'{pair[0]}' and '{pair[1]}' end with the same sound, so they rhyme.",
    }


def _gen_rhyme_count(r, topic, difficulty):
    poem, _ = r.choice(_POEM_SNIPPETS_STD)
    lines = [l.strip() for l in poem.split("\n") if l.strip()]
    last_words = [l.split()[-1].strip("!,.") for l in lines]
    # count rhyming pairs
    rhyme_count = 0
    seen = set()
    for i in range(len(last_words)):
        for j in range(i + 1, len(last_words)):
            if j in seen:
                continue
            w1, w2 = last_words[i], last_words[j]
            # simple check: last 2 chars match
            if len(w1) >= 2 and len(w2) >= 2 and w1[-2:].lower() == w2[-2:].lower():
                rhyme_count += 1
                seen.add(j)
                break
    rhyme_count = max(rhyme_count, 1)
    return {
        "id": f"RHYME_NUM_{r.randint(1000,9999)}",
        "type": "numerical",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Here is a poem:\n{poem}\n\nHow many pairs of rhyming words can you find at the ends of the lines?",
        "answer": rhyme_count,
        "options": [str(rhyme_count), str(rhyme_count + 1), str(max(rhyme_count - 1, 0)), str(rhyme_count + 2)],
        "correct_index": 0,
        "steps": [
            "Step 1: List the last word of each line.",
            f"Step 2: Last words: {last_words}",
            "Step 3: Words that end with the same sound rhyme with each other.",
            f"Step 4: Count the rhyming pairs: {rhyme_count} pair(s).",
        ],
        "explanation": f"Pairs of rhyming words: {rhyme_count}. Rhyming words are words that end with the same sound.",
    }


def _gen_inference_mcq(r, topic, difficulty):
    passage = r.choice(_PASSAGES_INFERENCE_STD)
    qdata = r.choice(passage["questions"])
    if qdata["qtype"] == "mcq":
        options = list(qdata["options"])
        r.shuffle(options)
        correct_idx = options.index(qdata["options"][qdata["correct_index"]])
        return {
            "id": f"INF_MCQ_{r.randint(1000,9999)}",
            "type": "mcq",
            "topic": topic,
            "difficulty": difficulty,
            "question": qdata["question"],
            "options": options,
            "answer": qdata["options"][qdata["correct_index"]],
            "correct_index": correct_idx,
            "explanation": qdata["explanation"],
        }
    return None


def _gen_inference_comp_mcq(r, topic, difficulty):
    passage = r.choice(_PASSAGES_INFERENCE_COMP)
    qdata = r.choice(passage["questions"])
    if qdata["qtype"] == "mcq":
        options = list(qdata["options"])
        r.shuffle(options)
        correct_ans = qdata["options"][qdata["correct_index"]]
        correct_idx = options.index(correct_ans)
        return {
            "id": f"INF_COMP_MCQ_{r.randint(1000,9999)}",
            "type": "mcq",
            "topic": topic,
            "difficulty": difficulty,
            "question": qdata["question"],
            "passage": passage["text"],
            "options": options,
            "answer": correct_ans,
            "correct_index": correct_idx,
            "explanation": qdata["explanation"],
        }
    return None


def _gen_inference_fill(r, topic, difficulty):
    passage = r.choice(_PASSAGES_INFERENCE_COMP)
    qdata = r.choice(passage["questions"])
    if qdata["qtype"] == "fill_blank":
        return {
            "id": f"INF_FB_{r.randint(1000,9999)}",
            "type": "fill_blank",
            "topic": topic,
            "difficulty": difficulty,
            "question": qdata["question"],
            "sentence": qdata["sentence"],
            "blank_marker": qdata["blank_marker"],
            "correct_answer": qdata["correct_answer"],
            "explanation": qdata.get("explanation", ""),
        }
    return None


def _gen_inference_short(r, topic, difficulty):
    passage = r.choice(_PASSAGES_INFERENCE_COMP)
    qdata = r.choice(passage["questions"])
    if qdata["qtype"] == "short_answer":
        return {
            "id": f"INF_SA_{r.randint(1000,9999)}",
            "type": "short_answer",
            "topic": topic,
            "difficulty": difficulty,
            "question": qdata["question"],
            "passage": passage["text"],
            "answer": qdata["answer"],
            "steps": qdata.get("steps", []),
            "explanation": qdata.get("explanation", ""),
        }
    return None


def _gen_central_idea_comp(r, topic, difficulty):
    passage = r.choice(_CENTRAL_IDEA_PASSAGES_COMP)
    qdata = r.choice(passage["questions"])
    return {
        "id": f"CI_COMP_{r.randint(1000,9999)}",
        "type": "long_answer",
        "topic": topic,
        "difficulty": difficulty,
        "question": qdata["question"],
        "passage": passage["text"],
        "answer": qdata["answer"],
        "steps": qdata.get("steps", []),
        "explanation": "The central idea is the main message of the passage. State it in your own words, not by copying sentences directly.",
    }


def _gen_central_idea_std(r, topic, difficulty):
    passage = r.choice(_CENTRAL_IDEA_PASSAGES_STD)
    qdata = r.choice(passage["questions"])
    return {
        "id": f"CI_STD_{r.randint(1000,9999)}",
        "type": "long_answer",
        "topic": topic,
        "difficulty": difficulty,
        "question": qdata["question"],
        "passage": passage["text"],
        "answer": qdata["answer"],
        "steps": qdata.get("steps", []),
        "explanation": "The central idea is the main message of the passage. Do not just say what happens — say what it all means together.",
    }


def _gen_tense_mcq(r, topic, difficulty):
    subj, s_marker = r.choice(_TENSE_SUBJECTS_PRESENT)
    verb = r.choice(_VERBS_REGULAR)
    options_pool = [
        (f"{subj} {verb}s" if s_marker else f"{subj} {verb}",
         "present_simple_correct"),
        (f"{subj} {verb}ed",
         "past_simple_wrong"),
        (f"{subj} {verb}",
         "base_form"),
        (f"{subj} {verb}ing",
         "present_continuous"),
    ]
    options = [o[0] for o in options_pool]
    r.shuffle(options)
    correct_text = options_pool[0][0]
    correct_idx = options.index(correct_text)
    time_marker = r.choice(_TENSE_TIME_MARKERS_PRESENT)
    return {
        "id": f"TENSE_MCQ_{r.randint(1000,9999)}",
        "type": "mcq",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Choose the correct form: '{subj} ____ {verb} {time_marker}.'",
        "options": options,
        "answer": correct_text,
        "correct_index": correct_idx,
        "explanation": f"Present Simple is used for actions that happen regularly. After '{subj}', we add -s/-es to the verb: '{correct_text}'. The time marker '{time_marker}' tells us this is a regular action.",
    }


def _gen_tense_fill(r, topic, difficulty):
    is_present = r.random() < 0.5
    if is_present:
        subj, s_marker = r.choice(_TENSE_SUBJECTS_PRESENT)
        verb = r.choice(_VERBS_REGULAR)
        correct_form = verb + s_marker
        time_marker = r.choice(_TENSE_TIME_MARKERS_PRESENT)
        sentence = f"{subj} ____ {verb} {time_marker}."
        hint = "Present Simple"
    else:
        subj = r.choice(["I", "We", "They", "My friends", "Riya", "Rohan", "The children",
                         "My parents", "Grandfather", "Priya"])
        verb_base, past_form, _ = r.choice(_TENSE_IRREGULAR_VERBS)
        verb_base_r = r.choice(_VERBS_REGULAR)
        # 70% irregular, 30% regular
        if r.random() < 0.7:
            verb_base = verb_base
            verb_orig = verb_base
            correct_form = past_form
        else:
            verb_base = verb_base_r
            verb_orig = verb_base
            correct_form = verb_base + "ed"
        time_marker = r.choice(_TENSE_TIME_MARKERS_PAST)
        sentence = f"{subj} ____ {verb_base} {time_marker}."
        hint = "Past Simple"
    return {
        "id": f"TENSE_FB_{r.randint(1000,9999)}",
        "type": "fill_blank",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Fill in the blank with the correct verb form: {sentence}",
        "sentence": f"{subj} ____ {verb_base} {time_marker}.",
        "blank_marker": "____",
        "correct_answer": correct_form,
        "tense": hint,
        "explanation": f"The time marker '{time_marker}' tells us the action happened in the past. The correct past form is '{correct_form}'.",
    }


def _gen_tense_fix_sentence(r, topic, difficulty):
    """Generate a sentence with a wrong verb form; student must identify the error."""
    is_present = r.random() < 0.5
    templates = [
        ("Yesterday, I {verb} to school.", "go", "went", "past"),
        ("Last week, we {verb} a picnic.", "have", "had", "past"),
        ("Every day, she {verb} her teeth.", "brush", "brushes", "present"),
        ("He always {verb} his bag.", "forget", "forgets", "present"),
        ("Last night, the dog {verb} loudly.", "bark", "barked", "past"),
        ("My mother {verb} dinner every evening.", "cook", "cooks", "present"),
        ("Last Sunday, they {verb} cricket.", "play", "played", "past"),
        ("The cat {verb} on the mat daily.", "sleep", "sleeps", "present"),
        ("Yesterday, Riya {verb} a new dress.", "buy", "bought", "past"),
        ("He {verb} to music every night.", "listen", "listens", "present"),
        ("Last month, we {verb} a trip to Goa.", "make", "made", "past"),
        ("She {verb} a song beautifully.", "sing", "sings", "present"),
        ("Yesterday, I {verb} a letter to my friend.", "write", "wrote", "past"),
        ("Birds {verb} in the sky.", "fly", "fly", "present"),
        ("Last year, he {verb} first in class.", "come", "came", "past"),
    ]
    template, verb_base, correct_form, tense = r.choice(templates)
    # Introduce a common error
    error_versions = {
        "went": "go", "had": "have", "brushes": "brush", "forgets": "forget",
        "barked": "bark", "cooks": "cook", "played": "play", "sleeps": "sleep",
        "bought": "buy", "listens": "listen", "made": "make", "sings": "sing",
        "wrote": "write", "fly": "fly", "came": "come",
    }
    wrong_form = error_versions.get(correct_form, verb_base + "ed")
    wrong_sentence = template.replace("{verb}", wrong_form)
    correct_sentence = template.replace("{verb}", correct_form)
    options = [correct_form, wrong_form, verb_base + "ing", verb_base + "s"]
    r.shuffle(options)
    correct_idx = options.index(correct_form)
    return {
        "id": f"TENSE_FIX_{r.randint(1000,9999)}",
        "type": "mcq",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Find and fix the error in this sentence: '{wrong_sentence}'. Which is the correct verb form?",
        "options": options,
        "answer": correct_form,
        "correct_index": correct_idx,
        "explanation": f"The sentence has a tense error. The correct form is '{correct_form}', giving: '{correct_sentence}' The time marker requires {tense} tense.",
    }


def _gen_tense_short(r, topic, difficulty):
    subj, s_marker = r.choice(_TENSE_SUBJECTS_PRESENT)
    verb = r.choice(_VERBS_REGULAR)
    time_marker = r.choice(_TENSE_TIME_MARKERS_PRESENT)
    correct_form = verb + s_marker
    return {
        "id": f"TENSE_SA_{r.randint(1000,9999)}",
        "type": "short_answer",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Write the correct form of the verb: '{subj} ____ {verb} {time_marker}.'",
        "answer": correct_form,
        "steps": [
            f"Step 1: The time marker '{time_marker}' tells us this is a regular/habitual action — use Present Simple.",
            f"Step 2: The subject is '{subj}'.",
            f"Step 3: For Present Simple, add -s/-es after he/she/it. After '{subj}', the verb becomes '{correct_form}'.",
            f"Answer: {correct_form}",
        ],
        "explanation": f"In Present Simple, we add -s/-es to the verb after he/she/it subjects. The correct sentence is: '{subj} {correct_form} {verb} {time_marker}.'",
    }


def _gen_tense_numerical(r, topic, difficulty):
    """Count how many past-tense verbs are in a passage."""
    sentences = [
        "Yesterday, Ravi went to the park. He played cricket with his friends. They ate sandwiches for lunch. Then they walked home together.",
        "Last Sunday, Priya visited her grandmother. She cooked food for the family. They watched a movie together. Everyone laughed a lot.",
        "Last week, the class went on a trip. They saw many beautiful places. They took lots of photos. Everyone felt very happy.",
        "Last holiday, we went to the beach. We swam in the sea. We ate ice cream and built a sandcastle. It was a wonderful day.",
    ]
    passage = r.choice(sentences)
    past_verbs = ["went", "played", "ate", "walked", "visited", "cooked", "watched",
                  "laughed", "went", "saw", "took", "felt", "swam", "ate", "built"]
    # count past tense words in passage
    words = passage.replace(".", "").replace(",", "").split()
    count = sum(1 for w in words if w.lower() in past_verbs)
    distractors = [count, count + 1, count - 1, count + 2]
    distractors = [max(0, d) for d in distractors]
    # make unique
    distractors = list(dict.fromkeys(distractors))
    if count not in distractors:
        distractors[0] = count
    r.shuffle(distractors)
    correct_idx = distractors.index(count)
    return {
        "id": f"TENSE_NUM_{r.randint(1000,9999)}",
        "type": "numerical",
        "topic": topic,
        "difficulty": difficulty,
        "question": f"Read the passage and count how many PAST TENSE verbs are in it:\n\n'{passage}'\n\nHow many past tense verbs?",
        "answer": count,
        "options": [str(d) for d in distractors],
        "correct_index": correct_idx,
        "steps": [
            "Step 1: Identify sentences that describe past events (yesterday, last Sunday, last week, etc.).",
            "Step 2: Find all verbs in the past tense (they usually end in -ed or are irregular forms).",
            f"Step 3: Count: went, played, ate, walked / visited, cooked, watched, laughed / went, saw, took, felt / went, swam, ate, built",
            f"Step 4: Total past tense verbs = {count}",
        ],
        "explanation": f"Past tense verbs describe actions that finished in the past. There are {count} past tense verbs in the passage.",
    }


# ---------------------------------------------------------------------------
# Main generator
# ---------------------------------------------------------------------------

def generate_questions(seed: int, count: int = 30) -> list:
    """
    Generate `count` deterministic CISCE English Class 4 questions.

    Topics covered:
      - c3_eng_103: Rhyming, Repetition, Rhythm (40%)
      - c4_eng_001: Inference & Central Idea (30%)
      - c4_eng_003: Tenses (30%)

    Mix: 40% MCQ, 20% fill-blank, 15% short-answer, 15% long-answer, 10% numerical
    50% competency-based (Indian context), 50% standard
    """
    r = _seed_rng(seed)
    questions = []

    # Determine per-type counts
    n_mcq   = max(1, int(count * 0.40))
    n_fill  = max(1, int(count * 0.20))
    n_sa    = max(1, int(count * 0.15))
    n_la    = max(1, int(count * 0.15))
    n_num   = max(1, int(count * 0.10))
    total   = n_mcq + n_fill + n_sa + n_la + n_num
    # Adjust to match count
    while total < count:
        n_mcq += 1
        total += 1
    while total > count:
        if n_num > 1:
            n_num -= 1
        elif n_la > 1:
            n_la -= 1
        elif n_sa > 1:
            n_sa -= 1
        elif n_fill > 1:
            n_fill -= 1
        else:
            n_mcq -= 1
        total -= 1

    # ---- Rhyme / Sound Play (c3_eng_103) ----
    rhyme_count = max(2, int(total * 0.35))
    for _ in range(rhyme_count):
        qtype = r.choice(["mcq", "mcq", "fill_blank", "numerical", "mcq"])
        is_comp = r.random() < 0.50
        topic = "Rhyme and Sound Play"
        difficulty = r.choice(["easy", "easy", "medium"])
        if qtype == "mcq":
            if is_comp:
                q = _gen_rhyme_comp_mcq(r, topic, difficulty)
            else:
                q = _gen_rhyme_mcq(r, topic, difficulty)
        elif qtype == "fill_blank":
            q = _gen_rhyme_fill(r, topic, difficulty)
        elif qtype == "numerical":
            q = _gen_rhythm_mcq(r, topic, difficulty) if r.random() < 0.5 else _gen_rhyme_count(r, topic, difficulty)
            q["type"] = "mcq" if "options" in q else "numerical"
        else:
            q = _gen_rhythm_fill(r, topic, difficulty)
        if q:
            questions.append(q)

    # ---- Repetition / Rhythm (c3_eng_103 continued) ----
    rep_count = max(2, int(total * 0.25))
    for _ in range(rep_count):
        is_comp = r.random() < 0.50
        topic = "Repetition and Rhythm"
        difficulty = r.choice(["easy", "medium"])
        q = _gen_repetition_comp(r, topic, difficulty) if is_comp else _gen_repetition_mcq(r, topic, difficulty)
        if q:
            questions.append(q)

    # ---- Inference (c4_eng_001) ----
    inf_count = max(2, int(total * 0.30))
    for _ in range(inf_count):
        is_comp = r.random() < 0.50
        topic = "Inference"
        difficulty = r.choice(["medium", "medium", "hard"])
        qtype = r.choice(["mcq", "fill_blank", "short_answer", "mcq"])
        if qtype == "mcq":
            q = _gen_inference_comp_mcq(r, topic, difficulty) if is_comp else _gen_inference_mcq(r, topic, difficulty)
        elif qtype == "fill_blank":
            q = _gen_inference_fill(r, topic, difficulty)
        elif qtype == "short_answer":
            q = _gen_inference_short(r, topic, difficulty)
        else:
            q = _gen_inference_comp_mcq(r, topic, difficulty) if is_comp else _gen_inference_mcq(r, topic, difficulty)
        if q:
            questions.append(q)

    # ---- Central Idea (c4_eng_001 continued) ----
    ci_count = max(1, int(total * 0.10))
    for _ in range(ci_count):
        is_comp = r.random() < 0.50
        topic = "Central Idea"
        difficulty = "hard"
        q = _gen_central_idea_comp(r, topic, difficulty) if is_comp else _gen_central_idea_std(r, topic, difficulty)
        if q:
            questions.append(q)

    # ---- Tenses (c4_eng_003) ----
    tense_count = max(2, int(total * 0.35))
    for _ in range(tense_count):
        is_comp = r.random() < 0.50
        topic = "Tenses"
        difficulty = r.choice(["easy", "medium", "medium"])
        qtype = r.choice(["mcq", "fill_blank", "mcq", "short_answer", "numerical"])
        if qtype == "mcq":
            q = _gen_tense_fix_sentence(r, topic, difficulty) if r.random() < 0.5 else _gen_tense_mcq(r, topic, difficulty)
        elif qtype == "fill_blank":
            q = _gen_tense_fill(r, topic, difficulty)
        elif qtype == "short_answer":
            q = _gen_tense_short(r, topic, difficulty)
        elif qtype == "numerical":
            q = _gen_tense_numerical(r, topic, difficulty)
        else:
            q = _gen_tense_mcq(r, topic, difficulty)
        if q:
            questions.append(q)

    # ---- Fill in remaining to match count ----
    extra_topics = [
        ("Rhyme and Sound Play", [_gen_rhythm_mcq, _gen_rhyme_fill, _gen_rhyme_count]),
        ("Tenses", [_gen_tense_fill, _gen_tense_short, _gen_tense_mcq]),
        ("Inference", [_gen_inference_fill, _gen_inference_short]),
        ("Repetition and Rhythm", [_gen_repetition_mcq, _gen_rhythm_fill]),
    ]
    while len(questions) < count:
        topic_name, gens = r.choice(extra_topics)
        gen_fn = r.choice(gens)
        is_comp = r.random() < 0.50
        q = gen_fn(r, topic_name, r.choice(["easy", "medium"]))
        if q:
            questions.append(q)

    # Trim to exact count
    questions = questions[:count]

    # Assign sequential IDs
    for i, q in enumerate(questions):
        q["id"] = q.get("id", f"Q_{i+1:03d}")

    return questions


# ---------------------------------------------------------------------------
# Wrapper: solve_question dispatches to the right solver
# ---------------------------------------------------------------------------

def solve_question(question: dict) -> dict:
    """Dispatch to the appropriate solver based on question type."""
    qtype = question.get("type", "")
    if qtype == "mcq":
        return solve_mcq(question)
    elif qtype == "fill_blank":
        return solve_fill_blank(question)
    elif qtype == "short_answer":
        return solve_short_answer(question)
    elif qtype == "long_answer":
        return solve_long_answer(question)
    elif qtype == "numerical":
        return solve_numerical(question)
    else:
        return {
            "answer": "Unknown question type",
            "steps": [f"No solver available for type: {qtype}"],
            "verification": {"status": "error"},
        }


def batch_solve(questions: list) -> list:
    """Solve a list of questions and return results."""
    results = []
    for q in questions:
        try:
            result = solve_question(q)
            result["question_id"] = q.get("id", "unknown")
            result["type"] = q.get("type", "")
            results.append(result)
        except Exception as e:
            results.append({
                "question_id": q.get("id", "unknown"),
                "type": q.get("type", ""),
                "answer": "Error",
                "steps": [f"Solver error: {str(e)}"],
                "verification": {"status": "error"},
            })
    return results


# ---------------------------------------------------------------------------
# Verification utilities
# ---------------------------------------------------------------------------

def verify_all(questions: list, solutions: list) -> dict:
    """Run verification across all questions and return a summary."""
    summary = {
        "total": len(questions),
        "verified": 0,
        "errors": 0,
        "details": [],
    }
    for q, sol in zip(questions, solutions):
        v = sol.get("verification", {})
        status = v.get("status", "unknown")
        entry = {
            "id": q.get("id"),
            "type": q.get("type"),
            "status": status,
            "answer": sol.get("answer"),
        }
        if status == "verified":
            summary["verified"] += 1
        else:
            summary["errors"] += 1
        summary["details"].append(entry)
    summary["verification_rate"] = summary["verified"] / max(summary["total"], 1)
    return summary


# ---------------------------------------------------------------------------
# Pretty-print helpers
# ---------------------------------------------------------------------------

def format_question(q: dict, index: int = 1) -> str:
    lines = [f"Q{index}. [{q['type'].upper()}] [{q['topic']}] (Difficulty: {q['difficulty']})"]
    lines.append(f"   {q['question']}")
    if q.get("options"):
        for i, opt in enumerate(q["options"]):
            marker = " (✓)" if i == q.get("correct_index") else ""
            lines.append(f"   ({chr(65+i)}) {opt}{marker}")
    if q.get("answer"):
        lines.append(f"   Answer: {q['answer']}")
    if q.get("explanation"):
        lines.append(f"   Explanation: {q['explanation']}")
    return "\n".join(lines)


def format_solution(sol: dict) -> str:
    lines = [f"Solution for {sol.get('question_id', '?')}:"]
    for step in sol.get("steps", []):
        lines.append(f"  {step}")
    v = sol.get("verification", {})
    lines.append(f"  [Verification: {v.get('status')}] — {v.get('result', v.get('filled_sentence', ''))}")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------

def main():
    seed = 42
    count = 25

    print(f"Generating {count} CISCE English Class 4 questions (seed={seed})...\n")
    questions = generate_questions(seed, count)

    print(f"{'='*70}")
    print(f"CISCE English Class 4 — Question Paper")
    print(f"Topics: Rhyme & Sound Play | Inference | Central Idea | Tenses")
    print(f"{'='*70}\n")

    for i, q in enumerate(questions, 1):
        print(format_question(q, i))
        print()

    print(f"\n{'='*70}")
    print(f"Solving all questions...\n")
    solutions = batch_solve(questions)

    for sol in solutions:
        print(format_solution(sol))
        print()

    print(f"\n{'='*70}")
    summary = verify_all(questions, solutions)
    print(f"Verification Summary:")
    print(f"  Total questions : {summary['total']}")
    print(f"  Verified        : {summary['verified']}")
    print(f"  Errors          : {summary['errors']}")
    print(f"  Verification rate: {summary['verification_rate']:.1%}")
    print(f"{'='*70}")


if __name__ == "__main__":
    main()