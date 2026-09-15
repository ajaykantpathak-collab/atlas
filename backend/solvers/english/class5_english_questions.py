import random
import re
import math
from dataclasses import dataclass, field
from typing import Optional
from fractions import Fraction


# ============================================================
# UTILITY HELPERS
# ============================================================

def set_seed(seed: int):
    random.seed(seed)


def verify_numerical(user_val: float, expected_val: float, tol: float = 0.01) -> bool:
    return abs(user_val - expected_val) <= tol


def count_syllables(word: str) -> int:
    word = word.lower().strip()
    vowels = "aeiou"
    count = 0
    prev_vowel = False
    for ch in word:
        is_vowel = ch in vowels
        if is_vowel and not prev_vowel:
            count += 1
        prev_vowel = is_vowel
    if word.endswith("e") and count > 1:
        count -= 1
    return max(count, 1)


def word_letter_stats(word: str):
    w = word.lower()
    vowels = sum(1 for c in w if c in "aeiou")
    consonants = sum(1 for c in w if c.isalpha() and c not in "aeiou")
    return {"word": word, "vowels": vowels, "consonants": consonants, "length": len(w)}


# ============================================================
# DATACLASS
# ============================================================

@dataclass
class Question:
    id: str
    type: str
    topic: str
    difficulty: str
    question: str
    options: list = field(default_factory=list)
    answer: str = ""
    explanation: str = ""
    params: dict = field(default_factory=dict)
    verification: dict = field(default_factory=dict)


# ============================================================
# TOPIC 1 GENERATOR: SENSORY WORDS IN POETRY
# ============================================================

def _gen_sensory_questions(seed: int, count: int) -> list:
    set_seed(seed + 1000)
    questions = []

    POEMS = [
        {
            "title": "The Monsoon Morning",
            "lines": [
                "I wake to the drum of the rain on the tin roof,",
                "The sweet smell of wet earth fills the air,",
                "Green leaves dance on the old banyan tree,",
                "I hear the temple bell ring loud and clear.",
                "My tongue tastes the warm hot chai from the clay cup,",
                "My fingers feel the rough bark of the branch.",
            ],
            "sensory_map": {
                "drum of the rain on the tin roof": "hearing",
                "sweet smell of wet earth": "smell",
                "Green leaves": "sight",
                "old banyan tree": "sight",
                "temple bell ring loud and clear": "hearing",
                "warm hot chai": "taste",
                "rough bark": "touch",
            },
        },
        {
            "title": "At Diwali Night",
            "lines": [
                "Bright lamps glow in every window tonight,",
                "Crackers burst with a loud bang in the sky,",
                "The soft silk of my new kurta feels wonderful,",
                "Sweet laddus taste like sunshine and joy.",
                "The sharp smell of sparklers fills my nose,",
                "Gold rangoli patterns shine in the candlelight.",
            ],
            "sensory_map": {
                "Bright lamps glow": "sight",
                "Crackers burst with a loud bang": "hearing",
                "soft silk of my new kurta": "touch",
                "Sweet laddus": "taste",
                "sharp smell of sparklers": "smell",
                "Gold rangoli patterns shine": "sight",
                "candlelight": "sight",
            },
        },
        {
            "title": "Grandmother's Kitchen",
            "lines": [
                "The sour smell of pickles in a big glass jar,",
                "My ears hear the sizzle of mustard seeds in hot oil,",
                "The hot rotis feel soft and warm on my plate,",
                "Sweet jaggery melts on my tongue like honey.",
                "I see the red chilli powder and yellow turmeric,",
                "Grandmother's warm hands pat the dough with love.",
            ],
            "sensory_map": {
                "sour smell of pickles": "smell",
                "sizzle of mustard seeds in hot oil": "hearing",
                "hot rotis feel soft and warm": "touch",
                "Sweet jaggery melts": "taste",
                "red chilli powder and yellow turmeric": "sight",
                "Grandmother's warm hands": "touch",
            },
        },
    ]

    SENSES_LIST = ["sight", "hearing", "touch", "smell", "taste"]
    SENSE_DESCRIPTIONS = {
        "sight": "words that help you see colours, shapes, and sizes",
        "hearing": "words that help you hear sounds and noises",
        "touch": "words that help you feel textures, temperatures, and surfaces",
        "smell": "words that help you smell different scents",
        "taste": "words that help you taste different flavours",
    }
    INDIAN_SENSORY_EXAMPLES = {
        "sight": ["golden diyas", "green mango tree", "blue sky"],
        "hearing": ["temple bells ringing", "wind chimes tinkling", "street vendors calling"],
        "touch": ["soft silk sari", "rough coconut fibre", "cool marble floor"],
        "smell": ["jasmine flowers", "freshly ground coffee", "rain on hot tar road"],
        "taste": ["sweet jaggery", "sour tamarind", "spicy biryani"],
    }

    MCQ_TEMPLATES = [
        "Read this line from the poem '{title}':\n\"{line}\"\n\nThe word \"{word}\" appeals to which of your five senses?",
        "In the poem \"{title}\", which sense does this word appeal to?\n\"{word}\"",
        "The poem '{title}' says: \"{line}\"\nThe bold word '{word}' is an example of which type of sensory word?",
    ]

    FILL_BLANK_TEMPLATES = [
        "A word that helps you __________ a colour or shape is called a sight word. (sight / hear / feel / taste)",
        "Words like 'loud', 'ring', and 'sizzle' appeal to your sense of __________. (sight / hearing / touch / smell)",
        "The word 'rough' describes how something feels — it is a __________ word. (taste / touch / smell / sight)",
        "When you read 'sweet mango', the word 'sweet' appeals to your sense of __________. (sight / touch / smell / taste)",
        "A word that helps you imagine a smell, like 'jasmine' or 'pickle', is a __________ word. (sight / touch / smell / taste)",
    ]

    INDIA_FILL_BLANK = [
        "The word 'jasmine' in 'the smell of jasmine at the temple' is a __________ word.",
        "When you feel 'soft silk' you are using your sense of __________.",
        "The word 'temple bell' appeals to your sense of __________.",
        "The taste of 'sour tamarind' is a __________ sensory word.",
        "The colour of 'green mango' is described by a __________ word.",
    ]

    # --- MCQ: sensory word identification ---
    used_poems = set()
    for i in range(min(count // 4 + 1, len(POEMS))):
        poem = POEMS[i % len(POEMS)]
        entries = list(poem["sensory_map"].items())
        random.shuffle(entries)
        for (phrase, correct_sense), entry_idx in zip(entries, range(min(4, len(entries)))):
            tpl = MCQ_TEMPLATES[entry_idx % len(MCQ_TEMPLATES)]
            wrong_senses = [s for s in SENSES_LIST if s != correct_sense]
            random.shuffle(wrong_senses)
            opts = [correct_sense] + wrong_senses[:3]
            random.shuffle(opts)

            q_text = tpl.format(title=poem["title"], line=phrase, word=phrase.split()[0] if phrase else phrase)

            questions.append(Question(
                id=f"sens_mcq_{seed}_{i}_{entry_idx}",
                type="mcq",
                topic="Sensory Words in Poetry",
                difficulty="easy" if entry_idx < 2 else "medium",
                question=q_text,
                options=[o.capitalize() for o in opts],
                answer=correct_sense.capitalize(),
                explanation=(
                    f"'{phrase}' uses the word '{phrase.split()[0]}' which appeals to your {correct_sense} sense. "
                    f"In the poem '{poem['title']}', this helps you {SENSE_DESCRIPTIONS[correct_sense]}. "
                    f"Indian context: e.g., {INDIAN_SENSORY_EXAMPLES[correct_sense][i % 3]}."
                ),
                params={"poem_title": poem["title"], "phrase": phrase, "correct_sense": correct_sense},
                verification={"method": "manual_review", "sense_matches_poem": correct_sense},
            ))

    # --- Fill in the blank: grammar ---
    for i, tpl in enumerate(FILL_BLANK_TEMPLATES):
        questions.append(Question(
            id=f"sens_fib_{seed}_{i}",
            type="fill_blank",
            topic="Sensory Words in Poetry",
            difficulty="easy",
            question=tpl,
            options=[],
            answer=tpl[tpl.index("(") + 1:tpl.index(")")].split("/")[0].strip(),
            explanation=f"This type of word appeals to the sense described. Indian example: {INDIAN_SENSORY_EXAMPLES[tpl[tpl.index('(')+1:tpl.index(')')].split('/')[0].strip()][i%3]}.",
            params={"sense": tpl[tpl.index("(") + 1:tpl.index(")")].split("/")[0].strip()},
            verification={"method": "dictionary_definition"},
        ))

    # --- MCQ: inference from sensory poem (central idea) ---
    inference_passages = [
        {
            "text": "Priya walks through the village market at dawn. She smells fresh jalebis frying in ghee. Her ears catch the sound of temple bells. She sees bright orange marigolds piled on a vendor's mat. She touches a warm clay water pot. She tastes a piece of jaggery from a passing farmer.",
            "central_idea": "Priya experiences the village market through all five senses.",
            "inference_q": "Why do you think the writer describes all five senses in the market passage?",
            "inference_opts": [
                "To help the reader feel present in the market as if they are there",
                "To list the things Priya bought at the market",
                "To describe only the things Priya could see",
                "To explain how to shop for vegetables",
            ],
            "inference_ans": "To help the reader feel present in the market as if they are there",
            "inference_exp": "Using all five sensory details helps the reader imagine being in the market themselves — this is what sensory language does in poetry and descriptive writing.",
        },
        {
            "text": "It is the first day of the monsoon. Arjun stands at his window. He hears the rain tapping on the roof like tiny fingers. He smells the wet earth called petrichor. He sees grey clouds racing across the sky. He feels a cool breeze brush his face. He tastes the raindrops that land on his tongue.",
            "central_idea": "Arjoy experiences the arrival of monsoon through his five senses.",
            "inference_q": "What is the central idea of this passage about Arjun and the monsoon?",
            "inference_opts": [
                "Arjun experiences the monsoon through all five of his senses",
                "Arjun does not like the rain",
                "Arjun is playing outside in the rain",
                "Arjun is at school during the monsoon",
            ],
            "inference_ans": "Arjun experiences the monsoon through all five of his senses",
            "inference_exp": "The central idea is not just 'Arjun likes rain' — the passage is specifically about how Arjun uses all five senses (hear, smell, see, feel, taste) to experience the monsoon. This is the main message.",
        },
    ]

    for i, inf in enumerate(inference_passages):
        questions.append(Question(
            id=f"sens_inf_{seed}_{i}",
            type="mcq",
            topic="Reading Comprehension — Inference and Central Idea",
            difficulty="medium",
            question=f"Read the passage:\n\n\"{inf['text']}\"\n\n{inf['inference_q']}",
            options=inf["inference_opts"],
            answer=inf["inference_ans"],
            explanation=inf["inference_exp"],
            params={"passage": inf["text"], "central_idea": inf["central_idea"]},
            verification={
                "method": "back_substitution",
                "check": f"The answer '{inf['inference_ans']}' correctly reflects the central idea: '{inf['central_idea']}'",
                "central_idea": inf["central_idea"],
            },
        ))

    # --- Short answer: own example of sensory word ---
    for i, sense in enumerate(SENSES_LIST):
        questions.append(Question(
            id=f"sens_sa_{seed}_{i}",
            type="short_answer",
            topic="Sensory Words in Poetry",
            difficulty="easy",
            question=f"Give one example of a sensory word from daily Indian life for the sense of {sense}. (e.g., for sight: 'green parrot')",
            options=[],
            answer=INDIAN_SENSORY_EXAMPLES[sense][i % 3],
            explanation=f"An example for {sense}: '{INDIAN_SENSORY_EXAMPLES[sense][i % 3]}' — this word helps you imagine something through your {sense} sense.",
            params={"sense": sense, "expected_example": INDIAN_SENSORY_EXAMPLES[sense][i % 3]},
            verification={
                "method": "keyword_match",
                "sense": sense,
                "acceptable_words": INDIAN_SENSORY_EXAMPLES[sense],
            },
        ))

    # --- Long answer: explain how sensory word helps ---
    questions.append(Question(
        id=f"sens_la_{seed}_0",
        type="long_answer",
        topic="Sensory Words in Poetry",
        difficulty="hard",
        question=(
            "Read this line from a poem: \"The sweet smell of jasmine fills the courtyard at Diwali.\"\n\n"
            "Write 2-3 sentences explaining how the sensory words in this line help you imagine being in the courtyard. "
            "Mention at least one sight word and one smell word. Use examples from Indian life if you can."
        ),
        options=[],
        answer=(
            "The phrase 'sweet smell of jasmine' is a smell word — it helps the reader imagine the fragrance "
            "of jasmine garlands hung at the doorway, like at a Diwali puja. "
            "The phrase 'courtyard at Diwali' is a sight word — it helps the reader picture the rangoli, "
            "the diyas, and the decorated walls of an Indian home during the festival. "
            "Together, these sensory words make the reader feel as if they are standing in the courtyard themselves."
        ),
        explanation=(
            "A good answer identifies at least one smell word ('sweet', 'jasmine') and one sight word "
            "('courtyard', 'Diwali'), explains what each does, and connects to an Indian example. "
            "The key idea is: sensory words help you 'be there' in the poem."
        ),
        params={},
        verification={
            "method": "rubric",
            "criteria": [
                "Identifies at least one smell word",
                "Identifies at least one sight word",
                "Explains what each word does",
                "Connects to an Indian example",
            ],
        },
    ))

    return questions


# ============================================================
# TOPIC 2 GENERATOR: FILL-IN-THE-BLANK GRAMMAR (C5)
# ============================================================

def _gen_grammar_questions(seed: int, count: int) -> list:
    set_seed(seed + 2000)
    questions = []

    ARTICLES = [
        ("___ apple a day keeps the doctor away.", "An", "Use 'An' before a vowel sound."),
        ("Ravi saw ___ elephant at the zoo.", "an", "Use 'an' before a vowel sound (elephant starts with e)."),
        ("Priya ate ___ mango for her snack.", "a", "Use 'a' before a consonant sound (mango starts with m)."),
        ("___ Ganga is a sacred river in India.", "The", "Use 'The' for a specific, unique thing."),
        ("He is ___ honest boy.", "an", "Use 'an' before a silent 'h' (honest starts with a vowel sound)."),
        ("___ sun rises in the east.", "The", "Unique objects in nature take 'The'."),
        ("She wants to be ___ engineer when she grows up.", "an", "Use 'an' before a vowel sound (engineer starts with e)."),
        ("I saw ___ one-eyed crow on the wall.", "a", "Use 'a' before the consonant sound of 'one'."),
    ]

    PREPOSITIONS = [
        ("The cat is sitting ___ the table.", "on", "'On' is used for surfaces."),
        ("Ravi lives ___ Mumbai.", "in", "'In' is used for cities and large places."),
        ("The book is ___ the shelf.", "on", "'On' is used for surfaces."),
        ("We are going ___ the market.", "to", "'To' shows direction."),
        ("The bird is flying ___ the sky.", "in", "'In' is used for large open spaces."),
        ("Priya is good ___ Maths.", "at", "'Good at' is the correct phrase."),
        ("The cat jumped ___ the wall.", "over", "'Over' shows crossing from one side to the other."),
        ("I have been waiting ___ you for an hour.", "for", "'Wait for' is the correct phrase."),
        ("The children ran ___ the park.", "in", "'In' is used for enclosed spaces."),
        ("She is standing ___ the door.", "at", "'At' is used for specific points."),
    ]

    TENSES = [
        ("Yesterday, Arjun ___ (play) cricket with his friends.", "played", "Past simple: 'played' for a completed action yesterday."),
        ("Right now, Priya ___ (read) a storybook.", "is reading", "Present continuous: 'is reading' for action happening now."),
        ("Every Sunday, we ___ (visit) our grandparents.", "visit", "Present simple: 'visit' for a regular habit."),
        ("By next year, Ravi ___ (complete) Class 5.", "will complete", "Future simple: 'will complete' for an action in the future."),
        ("At 7 a.m. today, Mother ___ (cook) breakfast.", "was cooking", "Past continuous: 'was cooking' for an action in progress at a specific past time."),
        ("I ___ (see) a beautiful rainbow yesterday.", "saw", "Past simple: 'saw' for a completed action in the past."),
        ("The train ___ (leave) at 6 p.m. every day.", "leaves", "Present simple: 'leaves' for a scheduled/timetabled event."),
        ("Look! The peacock ___ (dance) in the rain.", "is dancing", "Present continuous: 'is dancing' for an action happening right now."),
    ]

    SUBJECT_VERB = [
        ("The dog ___ (bark) loudly at night.", "barks", "Singular subject 'dog' needs singular verb 'barks'."),
        ("The children ___ (play) in the garden.", "play", "Plural subject 'children' needs plural verb 'play'."),
        ("A bunch of grapes ___ (hang) from the vine.", "hangs", "The head noun 'bunch' is singular, so verb is 'hangs'."),
        ("My friends ___ (come) to my house tomorrow.", "are coming", "Present continuous for a planned future arrangement."),
        ("The Ganges ___ (flow) into the Bay of Bengal.", "flows", "Singular subject 'Ganges' (a river name) takes 'flows'."),
        ("Either Ravi or Priya ___ (be) going to lead the team.", "is", "With 'either...or', the verb agrees with the closer subject (Priya = singular = 'is')."),
    ]

    # --- MCQ: articles ---
    for i, (sentence, correct, exp) in enumerate(ARTICLES[:4]):
        words = sentence.replace("___", "____").split()
        blank_pos = words.index("____")
        context = " ".join(words[max(0, blank_pos - 3): blank_pos + 3])
        wrong_opts = ["A", "An", "The", "Some"]
        wrong_opts = [o for o in wrong_opts if o != correct]
        random.shuffle(wrong_opts)
        opts = [correct] + wrong_opts[:3]
        random.shuffle(opts)

        q_text = f"Fill in the blank with the correct article:\n{sentence}"
        questions.append(Question(
            id=f"gram_art_mcq_{seed}_{i}",
            type="mcq",
            topic="Grammar — Articles",
            difficulty="easy",
            question=q_text,
            options=opts,
            answer=correct,
            explanation=exp,
            params={"sentence": sentence, "correct": correct},
            verification={"method": "article_rule", "rule": exp},
        ))

    # --- Fill in blank: prepositions ---
    for i, (sentence, correct, exp) in enumerate(PREPOSITIONS[:6]):
        questions.append(Question(
            id=f"gram_prep_fib_{seed}_{i}",
            type="fill_blank",
            topic="Grammar — Prepositions",
            difficulty="easy",
            question=f"Fill in the blank with the correct preposition:\n{sentence}",
            options=[],
            answer=correct,
            explanation=exp,
            params={"sentence": sentence, "correct": correct},
            verification={"method": "preposition_rule", "rule": exp},
        ))

    # --- MCQ: tenses ---
    tense_opts_map = {
        "played": ["played", "plays", "is playing", "has played"],
        "is reading": ["is reading", "reads", "read", "has read"],
        "visit": ["visit", "visited", "are visiting", "have visited"],
        "will complete": ["will complete", "completes", "is completing", "completed"],
        "was cooking": ["was cooking", "cooked", "is cooking", "has cooked"],
        "saw": ["saw", "see", "has seen", "is seeing"],
        "leaves": ["leaves", "leave", "left", "is leaving"],
        "is dancing": ["is dancing", "dances", "danced", "has danced"],
    }

    for i, (sentence, correct, exp) in enumerate(TENSES[:5]):
        opts = tense_opts_map.get(correct, [correct, "is verb-ing", "verb-ed", "will verb"])
        random.shuffle(opts)
        if correct not in opts:
            opts[0] = correct
        random.shuffle(opts)

        questions.append(Question(
            id=f"gram_ten_mcq_{seed}_{i}",
            type="mcq",
            topic="Grammar — Tenses",
            difficulty="medium",
            question=f"Choose the correct verb form to fill in the blank:\n{sentence}",
            options=opts,
            answer=correct,
            explanation=exp,
            params={"sentence": sentence, "correct": correct, "tense_explanation": exp},
            verification={"method": "tense_rules", "expected_tense": correct},
        ))

    # --- Short answer: subject-verb agreement ---
    for i, (sentence, correct, exp) in enumerate(SUBJECT_VERB[:3]):
        questions.append(Question(
            id=f"gram_sva_sa_{seed}_{i}",
            type="short_answer",
            topic="Grammar — Subject-Verb Agreement",
            difficulty="medium",
            question=f"Fill in the blank with the correct verb form:\n{sentence}",
            options=[],
            answer=correct,
            explanation=exp,
            params={"sentence": sentence, "correct": correct},
            verification={"method": "sv_agreement_rule", "rule": exp},
        ))

    # --- Long answer: write a paragraph using given grammar ---
    questions.append(Question(
        id=f"gram_la_{seed}_0",
        type="long_answer",
        topic="Grammar — Writing Skills",
        difficulty="hard",
        question=(
            "Write a paragraph of 4-5 sentences about your favourite Indian festival.\n"
            "Use at least ONE correct article (a/an/the), at least ONE preposition (in, on, at, to, for), "
            "and write in the PAST TENSE because the festival has already happened.\n\n"
            "Example opening: \"Last Diwali, ___ celebration took place ___ our house ___ Mumbai.\""
        ),
        options=[],
        answer=(
            "Last Diwali, the celebration took place in our house in Mumbai. "
            "An elderly uncle came from our village in Maharashtra. "
            "We lit the diyas on the balcony and the rangoli at the entrance. "
            "The children played with sparklers on the terrace under the supervision of adults. "
            "Everyone tasted the sweet laddus and hot pooris made by Grandmother."
        ),
        explanation=(
            "Good answer checks: (1) Uses past tense verbs (took, came, lit, played, tasted). "
            "(2) Uses an article correctly ('the celebration', 'An elderly uncle'). "
            "(3) Uses prepositions correctly ('in our house', 'from our village', 'on the balcony'). "
            "(4) 4-5 sentences with correct capital letters and full stops."
        ),
        params={},
        verification={
            "method": "rubric",
            "criteria": [
                "Uses past tense verbs correctly",
                "Uses at least one article (a/an/the)",
                "Uses at least one preposition",
                "Has 4-5 sentences with correct punctuation",
                "Mentions Indian festival context",
            ],
        },
    ))

    return questions


# ============================================================
# TOPIC 3 GENERATOR: READING COMPREHENSION (INFERENCE)
# ============================================================

def _gen_comprehension_questions(seed: int, count: int) -> list:
    set_seed(seed + 3000)
    questions = []

    PASSAGES = [
        {
            "title": "Ravi's Raksha Bandhan Gift",
            "text": (
                "Ravi had been saving his pocket money for three whole months. Every week, his mother gave him "
                "twenty rupees for helping with the household chores. He put every coin into a small clay piggy bank "
                "on his study table. On Raksha Bandhan morning, his elder sister Meera tied a beautiful rakhi on his wrist. "
                "That afternoon, Ravi went to the bicycle shop and bought Meera a brand-new blue bicycle with white handlebars. "
                "When Meera saw it, her eyes filled with tears of joy. She hugged Ravi and said, \"This is the best Rakhi gift "
                "I have ever received.\" Their mother smiled and said, \"Ravi has learned that the best gifts come from the heart.\""
            ),
            "central_idea": "Ravi saves his pocket money for months to buy his sister a bicycle on Raksha Bandhan, showing his love and care for her.",
            "inference_q": "Why did Ravi save his pocket money for three months instead of spending it on toys?",
            "inference_opts": [
                "He wanted to buy a special gift for his sister on Raksha Bandhan",
                "He had no toys to play with",
                "His mother told him not to spend money",
                "He was saving for a school trip",
            ],
            "inference_ans": "He wanted to buy a special gift for his sister on Raksha Bandhan",
            "inference_exp": (
                "We know Ravi saved for three months specifically and bought a bicycle on Raksha Bandhan for Meera. "
                "The text does not say he had no toys or that his mother forbade spending — the clue is Raksha Bandhan "
                "and the gift for Meera."
            ),
            "factual_q": "What did Ravi buy for Meera?",
            "factual_ans": "A brand-new blue bicycle with white handlebars",
            "vocab_q": "What does the word 'pocket money' mean?",
            "vocab_ans": "A small amount of money given to children regularly (by parents) to spend as they wish",
            "vocab_opts": [
                "Money kept in a pocket",
                "Small regular allowance given to children",
                "Money for buying pocket items",
                "Savings in a piggy bank",
            ],
        },
        {
            "title": "The Old Banyan Tree",
            "text": (
                "At the edge of Sita's village stood a huge banyan tree that was more than a hundred years old. "
                "Every afternoon after school, Sita climbed its thick branches and sat on her favourite platform, "
                "reading her storybooks. The tree was home to many birds — crows, mynas, parrots, and even a pair of "
                "koels that sang beautifully at dusk. One day, Sita noticed that the tree looked sick. Its leaves were "
                "turning yellow and many branches were dry. She told her grandfather, who was a farmer. Grandfather "
                "said, \"We must water the roots and remove the dead branches.\" Sita and her friends watered the tree "
                "every day for a month. Slowly, the tree began to recover. Green leaves appeared again, and the koels "
                "returned with their evening song."
            ),
            "central_idea": "Sita and her friends nurse a sick old banyan tree back to health through daily care and watering.",
            "inference_q": "Why do you think Sita told her grandfather about the sick tree instead of trying to fix it alone?",
            "inference_opts": [
                "She trusted her grandfather's knowledge because he was an experienced farmer",
                "She was too scared to touch the tree",
                "She thought her grandfather owned the tree",
                "She did not know how to water plants",
            ],
            "inference_ans": "She trusted her grandfather's knowledge because he was an experienced farmer",
            "inference_exp": (
                "The text says Grandfather was a farmer — this is the clue that Sita believed he would know how to "
                "help a sick tree. Her action of telling him (rather than doing nothing) shows she valued his experience."
            ),
            "factual_q": "How long did Sita and her friends water the tree?",
            "factual_ans": "Every day for a month",
            "vocab_q": "What does the word 'recover' mean in the passage?",
            "vocab_ans": "To get better or return to health after being sick",
            "vocab_opts": [
                "To climb back up",
                "To get better after being sick",
                "To find something lost",
                "To return to the village",
            ],
        },
        {
            "title": "Meera's Rainy Day",
            "text": (
                "Meera loved the rainy season. One Saturday morning, she woke up to the sound of rain on her windowpane. "
                "She put on her yellow raincoat and red boots and stepped outside. Her neighbour, an old grandmother, "
                "was struggling to carry a heavy bucket of water. Meera ran over to help her. Together, they carried the "
                "bucket to the grandmother's house. The grandmother smiled and gave Meera a hot cup of cocoa. Meera "
                "felt very happy. Later, she made paper boats and sailed them in the puddle outside her house. "
                "Her little brother Ankit joined her, and together they laughed as their boats floated away."
            ),
            "central_idea": "Meera spends a rainy day helping a neighbour and then playing with her brother, finding joy in simple acts of kindness.",
            "inference_q": "How do you think Meera felt at the end of the story?",
            "inference_opts": [
                "She felt happy because she helped someone and played with her brother",
                "She felt sad because her boats floated away",
                "She felt angry about the rain",
                "She felt tired from walking outside",
            ],
            "inference_ans": "She felt happy because she helped someone and played with her brother",
            "inference_exp": (
                "The text says 'Meera felt very happy' after helping the grandmother, and then she laughed while playing "
                "with her brother. Both acts (kindness and play) contributed to her happiness."
            ),
            "factual_q": "What colour were Meera's boots?",
            "factual_ans": "Red",
            "vocab_q": "What does the word 'struggling' mean in the passage?",
            "vocab_ans": "Finding something difficult to do; making a great effort",
            "vocab_opts": [
                "Dancing happily",
                "Finding something difficult",
                "Playing a game",
                "Singing a song",
            ],
        },
    ]

    # --- MCQ: factual comprehension ---
    for i, p in enumerate(PASSAGES):
        questions.append(Question(
            id=f"comp_fact_mcq_{seed}_{i}",
            type="mcq",
            topic="Reading Comprehension — Factual Questions",
            difficulty="easy",
            question=f"Read the passage '{p['title']}' and answer:\n\n{p['text']}\n\n{p['factual_q']}",
            options=p.get("vocab_opts", []),
            answer=p["factual_ans"],
            explanation=f"This information is directly stated in the passage.",
            params={"passage_title": p["title"], "question_type": "factual"},
            verification={"method": "direct_lookup", "passage_text": p["text"]},
        ))

    # --- MCQ: inference / central idea ---
    for i, p in enumerate(PASSAGES):
        questions.append(Question(
            id=f"comp_inf_mcq_{seed}_{i}",
            type="mcq",
            topic="Reading Comprehension — Inference and Central Idea",
            difficulty="medium",
            question=f"Read the passage '{p['title']}':\n\n{p['text']}\n\n{p['inference_q']}",
            options=p["inference_opts"],
            answer=p["inference_ans"],
            explanation=p["inference_exp"],
            params={
                "passage_title": p["title"],
                "central_idea": p["central_idea"],
                "question_type": "inference",
            },
            verification={
                "method": "back_substitution",
                "inference_evidence": p["inference_exp"],
                "central_idea": p["central_idea"],
            },
        ))

    # --- MCQ: vocabulary in context ---
    for i, p in enumerate(PASSAGES):
        if "vocab_opts" in p:
            questions.append(Question(
                id=f"comp_vocab_mcq_{seed}_{i}",
                type="mcq",
                topic="Reading Comprehension — Vocabulary",
                difficulty="easy",
                question=f"Read the passage '{p['title']}':\n\n{p['text']}\n\n{p['vocab_q']}",
                options=p["vocab_opts"],
                answer=p["vocab_ans"],
                explanation=f"In the passage, '{p['vocab_ans'].lower()}' is the meaning in this context.",
                params={"passage_title": p["title"], "question_type": "vocabulary"},
                verification={"method": "context_analysis"},
            ))

    # --- Central Idea identification (MCQ) ---
    for i, p in enumerate(PASSAGES):
        wrong_ideas = [
            p["central_idea"].replace("saves", "buys").replace("nurse", "climbs").replace("spends", "plays"),
            "A story about a child's daily routine",
            "An explanation of how to help neighbours",
            f"{p['title']} is about an adventure in a faraway land.",
        ]
        opts = [p["central_idea"]] + wrong_ideas[:3]
        random.shuffle(opts)
        if p["central_idea"] not in opts:
            opts[0] = p["central_idea"]
        random.shuffle(opts)

        questions.append(Question(
            id=f"comp_central_mcq_{seed}_{i}",
            type="mcq",
            topic="Reading Comprehension — Central Idea",
            difficulty="hard",
            question=(
                f"Read the passage '{p['title']}':\n\n{p['text']}\n\n"
                f"What is the CENTRAL IDEA of this passage — what is it MOSTLY about?"
            ),
            options=opts,
            answer=p["central_idea"],
            explanation=(
                f"The central idea is the MAIN MESSAGE of the whole passage: \"{p['central_idea']}\". "
                f"It is NOT just a single fact or event from the story."
            ),
            params={"passage_title": p["title"], "central_idea": p["central_idea"]},
            verification={"method": "central_idea_check", "expected": p["central_idea"]},
        ))

    # --- Short answer: inference question ---
    for i, p in enumerate(PASSAGES):
        questions.append(Question(
            id=f"comp_inf_sa_{seed}_{i}",
            type="short_answer",
            topic="Reading Comprehension — Inference and Central Idea",
            difficulty="medium",
            question=f"Read the passage '{p['title']}':\n\n{p['text']}\n\n{p['inference_q']}\n\nGive your answer with a REASON from the passage.",
            options=[],
            answer=p["inference_ans"],
            explanation=p["inference_exp"],
            params={"passage_title": p["title"], "inference_q": p["inference_q"]},
            verification={"method": "evidence_based", "evidence": p["inference_exp"]},
        ))

    # --- Long answer: state central idea in own words ---
    for i, p in enumerate(PASSAGES):
        questions.append(Question(
            id=f"comp_central_la_{seed}_{i}",
            type="long_answer",
            topic="Reading Comprehension — Central Idea",
            difficulty="hard",
            question=(
                f"Read the passage '{p['title']}':\n\n{p['text']}\n\n"
                f"Write the central idea of this passage in YOUR OWN WORDS (in 1-2 sentences). "
                f"Do NOT copy a sentence directly from the passage."
            ),
            options=[],
            answer=p["central_idea"],
            explanation=(
                f"The central idea must be in your own words and capture the MAIN MESSAGE of the whole passage, "
                f"not just one event. It connects to real life: in India, siblings show love through small sacrifices "
                f"especially during festivals like Raksha Bandhan."
            ),
            params={"passage_title": p["title"], "central_idea": p["central_idea"]},
            verification={
                "method": "rubric",
                "criteria": [
                    "States the main message (not just one detail)",
                    "Uses own words (not copied from passage)",
                    "Is 1-2 sentences long",
                    "Connects to the real-world context of the story",
                ],
            },
        ))

    return questions


# ============================================================
# TOPIC 4 GENERATOR: PICTURE COMPREHENSION (C1-C3 style)
# ============================================================

def _gen_picture_comprehension(seed: int, count: int) -> list:
    set_seed(seed + 4000)
    questions = []

    PICTURE_SCENES = [
        {
            "title": "The Village Market",
            "description": (
                "In a busy Indian village market, a woman in a green sari sells fresh vegetables from a wooden cart. "
                "A boy on a bicycle carries a stack of newspapers. Two children share a plate of hot samosas from a nearby stall. "
                "A dog sleeps under a banyan tree. Brightly coloured marigold garlands hang from the fruit seller's stall. "
                "The sun is shining, and the sky is clear blue."
            ),
            "elements": {
                "green sari": "The woman is wearing a green sari.",
                "wooden cart": "The vegetables are on a wooden cart.",
                "boy on bicycle": "A boy is riding a bicycle with newspapers.",
                "plate of hot samosas": "Two children are eating samosas.",
                "dog under banyan tree": "A dog is sleeping under a banyan tree.",
                "marigold garlands": "There are marigold garlands at the fruit stall.",
                "clear blue sky": "The sky is clear and blue.",
            },
            "questions": [
                ("What are the two children eating?", "The two children are eating hot samosas from a stall."),
                ("What is the dog doing under the banyan tree?", "The dog is sleeping under the banyan tree."),
                ("What is the woman in the green sari selling?", "The woman in the green sari is selling fresh vegetables from a wooden cart."),
                ("How is the boy with the newspapers travelling?", "The boy is travelling on a bicycle."),
                ("What kind of flowers can you see at the market?", "There are marigold garlands at the fruit seller's stall."),
            ],
        },
        {
            "title": "During the Monsoon",
            "description": (
                "It is raining heavily in a small town. Children in blue raincoats and red boots are jumping in puddles "
                "on the muddy road. A farmer wearing a straw hat walks with an umbrella, carrying a basket of fresh "
                "vegetables home. In the background, you can see green rice fields stretching to the hills. A peacock "
                "shelters under a large tree. A cat sits on a windowsill, watching the rain."
            ),
            "elements": {
                "blue raincoats": "Children are wearing blue raincoats.",
                "red boots": "The children have red boots on.",
                "jumping in puddles": "The children are jumping in puddles.",
                "farmer with umbrella": "A farmer is walking with an umbrella and a basket.",
                "green rice fields": "Rice fields are visible in the background.",
                "peacock under tree": "A peacock is sheltering under a large tree.",
                "cat on windowsill": "A cat is sitting on a windowsill watching the rain.",
            },
            "questions": [
                ("What are the children wearing to stay dry in the rain?", "The children are wearing blue raincoats and red boots."),
                ("What is the farmer carrying home?", "The farmer is carrying a basket of fresh vegetables."),
                ("What bird can you see sheltering from the rain?", "A peacock is sheltering under a large tree."),
                ("Where are the rice fields in the picture?", "The green rice fields are in the background, stretching towards the hills."),
                ("What is the cat doing on the windowsill?", "The cat is sitting on the windowsill watching the rain."),
            ],
        },
        {
            "title": "The Diwali Celebration",
            "description": (
                "A family is celebrating Diwali at their home. The house is decorated with bright oil lamps (diyas) on "
                "the windowsill. A girl in a pink lehenga is placing a rangoli of flower petals at the doorway. "
                "Her younger brother is holding a sparkler, with a look of excitement on his face. Their grandmother "
                "is bringing out a plate of sweets — laddus and barfis. Through the window, you can see fireworks "
                "lighting up the dark night sky. A small Lakshmi idol sits on a decorated table."
            ),
            "elements": {
                "bright oil lamps": "Diyas (oil lamps) are placed on the windowsill.",
                "girl in pink lehenga": "A girl in a pink lehenga is making rangoli.",
                "rangoli of flower petals": "There is a rangoli made of flower petals at the doorway.",
                "brother with sparkler": "The younger brother is holding a sparkler.",
                "plate of sweets": "Grandmother is bringing out a plate of laddus and barfis.",
                "fireworks in sky": "Fireworks are lighting up the dark sky.",
                "Lakshmi idol": "A small Lakshmi idol sits on a decorated table.",
            },
            "questions": [
                ("What is the girl in the pink lehenga doing?", "The girl in the pink lehenga is placing a rangoli of flower petals at the doorway."),
                ("What sweets can you see on the plate?", "Grandmother is bringing out a plate of sweets — laddus and barfis."),
                ("How can you tell the family is celebrating Diwali?", "The house has diyas on the windowsill, fireworks in the sky, a rangoli at the door, and a Lakshmi idol — all typical Diwali decorations."),
                ("What is the younger brother holding?", "The younger brother is holding a sparkler."),
                ("What is outside the window?", "Fireworks are lighting up the dark night sky."),
            ],
        },
    ]

    # --- Picture comprehension MCQ ---
    for i, scene in enumerate(PICTURE_SCENES):
        for j, (q, correct_ans) in enumerate(scene["questions"][:3]):
            wrong_opts_pool = [v for k, v in scene["elements"].items()]
            random.shuffle(wrong_opts_pool)
            wrong_opts = [v for v in wrong_opts_pool if v != correct_ans][:3]
            opts = [correct_ans] + wrong_opts
            random.shuffle(opts)

            questions.append(Question(
                id=f"pic_mcq_{seed}_{i}_{j}",
                type="mcq",
                topic="Picture-based Comprehension",
                difficulty="easy",
                question=f"[PICTURE: {scene['title']}]\n{scene['description']}\n\n{q}",
                options=opts,
                answer=correct_ans,
                explanation=f"In the picture '{scene['title']}', {correct_ans[0].lower() + correct_ans[1:]}",
                params={"scene_title": scene["title"], "question": q},
                verification={"method": "picture_observation", "scene": scene["title"]},
            ))

    # --- Picture comprehension short answer ---
    for i, scene in enumerate(PICTURE_SCENES):
        q, ans = scene["questions"][3]
        questions.append(Question(
            id=f"pic_sa_{seed}_{i}",
            type="short_answer",
            topic="Picture-based Comprehension",
            difficulty="easy",
            question=f"[PICTURE: {scene['title']}]\n{scene['description']}\n\n{q}",
            options=[],
            answer=ans,
            explanation=f"In the picture '{scene['title']}', {ans[0].lower() + ans[1:]}",
            params={"scene_title": scene["title"], "question": q},
            verification={"method": "picture_observation", "scene": scene["title"]},
        ))

    # --- Long answer: describe a picture in own words ---
    for i, scene in enumerate(PICTURE_SCENES[:2]):
        questions.append(Question(
            id=f"pic_la_{seed}_{i}",
            type="long_answer",
            topic="Picture-based Comprehension — Short Writing",
            difficulty="medium",
            question=(
                f"[PICTURE: {scene['title']}]\n{scene['description']}\n\n"
                f"Write 4-5 sentences describing this picture in your own words. "
                f"Mention at least THREE things you can see, TWO things people are doing, "
                f"and how the people might be feeling. Use full stops and capital letters correctly."
            ),
            options=[],
            answer=(
                f"In the picture '{scene['title']}', I can see many things happening. "
                f"First, {list(scene['elements'].values())[0][0].lower() + list(scene['elements'].values())[0][1:]}. "
                f"Second, {list(scene['elements'].values())[1][0].lower() + list(scene['elements'].values())[1][1:]}. "
                f"The people in the picture seem happy and busy. "
                f"It looks like a cheerful and lively scene in an Indian setting."
            ),
            explanation=(
                "A good answer mentions at least 3 things seen, 2 actions, and people's feelings, "
                "with correct capital letters and full stops in 4-5 sentences."
            ),
            params={"scene_title": scene["title"], "elements": list(scene["elements"].values())[:4]},
            verification={
                "method": "rubric",
                "criteria": [
                    "Mentions at least 3 things from the picture",
                    "Describes at least 2 actions",
                    "Mentions how people are feeling",
                    "Uses correct capital letters and full stops",
                    "Writes 4-5 sentences",
                ],
            },
        ))

    return questions


# ============================================================
# TOPIC 5: NUMERICAL / WORD-LEVEL ANALYSIS QUESTIONS
# ============================================================

def _gen_numerical_questions(seed: int, count: int) -> list:
    set_seed(seed + 5000)
    questions = []

    # --- Syllable counting ---
    word_lists = [
        (["butterfly", "umbrella", "festival", "elephant", "happiness"], "How many syllables are in the word 'butterfly'?"),
        (["beautiful", "wonderful", "dangerous", "happiness", "umbrella"], "How many syllables are in the word 'wonderful'?"),
        (["celebration", "information", "education", "generation", "imagination"], "How many syllables are in the word 'celebration'?"),
    ]

    for i, (words, q_text) in enumerate(word_lists):
        target_word = q_text.split("'")[1]
        syllables = count_syllables(target_word)
        wrong_opts = [str(syllables + offset) for offset in [-2, -1, 1, 2]]
        random.shuffle(wrong_opts)
        opts = [str(syllables)] + wrong_opts[:3]
        random.shuffle(opts)

        questions.append(Question(
            id=f"num_syl_{seed}_{i}",
            type="mcq",
            topic="Word Analysis — Syllable Counting",
            difficulty="easy",
            question=q_text + "\n\n(A syllable is each separate sound in a word. Clap once for each syllable.)",
            options=opts,
            answer=str(syllables),
            explanation=f"'{target_word}' has {syllables} syllables: {count_syllables(target_word)} sound units. "
                        f"Try clapping: but-ter-fly = 3 claps.",
            params={"word": target_word, "expected_syllables": syllables},
            verification={
                "method": "numerical_check",
                "expected": syllables,
                "tolerance": 0,
                "check": f"count_syllables('{target_word}') = {syllables}",
            },
        ))

    # --- Vowel/consonant counting ---
    vowel_words = ["elephant", "umbrella", "beautiful"]
    for i, word in enumerate(vowel_words):
        stats = word_letter_stats(word)
        wrong_opts = [str(stats["vowels"] + offset) for offset in [-1, 1, 2, -2]]
        random.shuffle(wrong_opts)
        opts = [str(stats["vowels"])] + wrong_opts[:3]
        random.shuffle(opts)

        questions.append(Question(
            id=f"num_vow_{seed}_{i}",
            type="mcq",
            topic="Word Analysis — Vowel Counting",
            difficulty="easy",
            question=f"How many VOWEL letters (a, e, i, o, u) are in the word '{word}'?",
            options=opts,
            answer=str(stats["vowels"]),
            explanation=f"'{word}' has {stats['vowels']} vowels and {stats['consonants']} consonants. "
                        f"The vowel letters are: {[c for c in word.lower() if c in 'aeiou']}.",
            params={"word": word, "vowels": stats["vowels"], "consonants": stats["consonants"]},
            verification={
                "method": "numerical_check",
                "expected": stats["vowels"],
                "tolerance": 0,
                "check": f"sum(1 for c in '{word}' if c in 'aeiou') = {stats['vowels']}",
            },
        ))

    # --- Numerical question: tense timeline ---
    timeline_data = [
        {
            "events": [
                ("2020", "Ravi joined Class 1"),
                ("2021", "Ravi was in Class 2"),
                ("2022", "Ravi wrote his Class 3 exam"),
                ("2023", "Ravi is in Class 4"),
                ("2024", "Ravi will be in Class 5"),
            ],
            "q": "In which year was Ravi in Class 2?",
            "ans": "2021",
            "exp": "Timeline: 2020 (joined C1), 2021 (C2), 2022 (C3 exam), 2023 (C4), 2024 (C5).",
        },
    ]

    for i, td in enumerate(timeline_data):
        year_opts = ["2020", "2021", "2022", "2023", "2024"]
        random.shuffle(year_opts)
        if td["ans"] not in year_opts:
            year_opts[0] = td["ans"]
        random.shuffle(year_opts)

        timeline_text = "\n".join([f"  {year}: {event}" for year, event in td["events"]])

        questions.append(Question(
            id=f"num_time_{seed}_{i}",
            type="mcq",
            topic="Reading Comprehension — Timeline Analysis",
            difficulty="medium",
            question=f"Here is Ravi's school timeline:\n{timeline_text}\n\n{td['q']}",
            options=year_opts,
            answer=td["ans"],
            explanation=td["exp"],
            params={"events": td["events"], "answer": td["ans"]},
            verification={"method": "timeline_lookup", "timeline": dict(td["events"])},
        ))

    return questions


# ============================================================
# TOPIC 6: SHORT WRITING PROMPTS
# ============================================================

def _gen_writing_prompts(seed: int, count: int) -> list:
    set_seed(seed + 6000)
    questions = []

    PROMPTS = [
        {
            "prompt": "Write 3-4 sentences about what you did last Sunday. Use the PAST TENSE. Mention at least one Indian context (food, festival, family, or place).",
            "sample_answer": (
                "Last Sunday, I visited my grandmother's house in our village. "
                "She made hot pooris and potato curry for lunch. "
                "I played cricket with my cousins in the field behind her house. "
                "In the evening, we all sat under the banyan tree and ate mangoes together."
            ),
            "criteria": ["Past tense verbs used", "Indian context mentioned", "3-4 sentences", "Correct punctuation"],
            "topic": "Writing — Personal Recount",
        },
        {
            "prompt": "Write 3-4 sentences describing your favourite Indian food. Use words that appeal to at least TWO of the five senses (sight, smell, taste, touch, hearing).",
            "sample_answer": (
                "My favourite food is masala dosa from South India. "
                "It looks golden and crispy when it arrives on the plate. "
                "It smells wonderful because of the roasted chutney and sambar. "
                "When I take a bite, it tastes spicy and tangy at the same time."
            ),
            "criteria": ["Sensory words from at least 2 senses", "Describes an Indian food", "3-4 sentences", "Vivid language"],
            "topic": "Writing — Descriptive Paragraph",
        },
        {
            "prompt": "Write 4-5 sentences about why it is important to be honest. Give one example from your own life or from a story you know.",
            "sample_answer": (
                "Being honest means always telling the truth, even when it is difficult. "
                "Once, I found a fifty-rupee note in the school corridor and gave it to my teacher. "
                "She announced my name in assembly and everyone clapped for me. "
                "Honesty makes people trust you, and that is a very good feeling."
            ),
            "criteria": ["States why honesty matters", "Gives a personal example", "4-5 sentences", "Clear reasoning"],
            "topic": "Writing — Moral Essay",
        },
        {
            "prompt": "Write 4-5 sentences comparing a city and a village. Mention at least two differences and one similarity. Use Indian examples.",
            "sample_answer": (
                "A city like Mumbai has tall buildings and busy roads, while my village has small houses and quiet lanes. "
                "In the city, people travel by local trains, but in the village, everyone walks or cycles. "
                "Both places have markets where people buy fresh vegetables and chat with neighbours. "
                "I like both the city and the village because they each have something special."
            ),
            "criteria": ["Mentions at least 2 differences", "Mentions 1 similarity", "Indian examples", "4-5 sentences"],
            "topic": "Writing — Comparison Paragraph",
        },
    ]

    for i, p in enumerate(PROMPTS):
        questions.append(Question(
            id=f"writ_la_{seed}_{i}",
            type="long_answer",
            topic=p["topic"],
            difficulty="hard",
            question=p["prompt"],
            options=[],
            answer=p["sample_answer"],
            explanation=f"Sample answer provided. Graded on: {', '.join(p['criteria'])}.",
            params={"criteria": p["criteria"], "sample": p["sample_answer"]},
            verification={
                "method": "rubric",
                "criteria": p["criteria"],
            },
        ))

    return questions


# ============================================================
# SOLVER FUNCTIONS
# ============================================================

def solve_mcq(params: dict) -> dict:
    """Solve an MCQ-type question."""
    selected = params.get("selected_option", "")
    correct = params.get("correct_answer", "")
    is_correct = selected.strip().lower() == correct.strip().lower()

    steps = [
        "Step 1: Read the question carefully and identify what is being asked.",
        "Step 2: Read each option one by one.",
        f"Step 3: Eliminate options that are clearly wrong.",
        f"Step 4: Compare remaining options. The correct answer is: {correct}",
        f"Step 5: Your selected answer is: {selected}",
    ]
    if is_correct:
        steps.append("Result: Your answer is CORRECT!")
    else:
        steps.append(f"Result: Your answer is INCORRECT. The correct answer is '{correct}'.")

    return {
        "answer": correct,
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "option_comparison",
            "selected": selected,
            "correct": correct,
            "match": is_correct,
        },
    }


def solve_fill_blank(params: dict) -> dict:
    """Solve a fill-in-the-blank question."""
    user_answer = params.get("user_answer", "").strip().lower()
    correct = params.get("correct_answer", "").strip().lower()
    is_correct = user_answer == correct

    steps = [
        "Step 1: Read the sentence and find the blank.",
        "Step 2: Think about what word fits grammatically.",
        f"Step 3: Consider the grammar rule: {params.get('rule', 'Use the correct word.')}",
        f"Step 4: The correct word is: {params.get('correct_answer', '')}",
        f"Step 5: Your answer is: {params.get('user_answer', '')}",
    ]
    if is_correct:
        steps.append("Result: Your answer is CORRECT!")
    else:
        steps.append(f"Result: Your answer is INCORRECT. The correct answer is '{params.get('correct_answer', '')}'.")

    return {
        "answer": params.get("correct_answer", ""),
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "string_match",
            "user_answer": user_answer,
            "correct_answer": correct,
            "match": is_correct,
        },
    }


def solve_short_answer(params: dict) -> dict:
    """Solve a short-answer question."""
    user_answer = params.get("user_answer", "").strip().lower()
    correct = params.get("correct_answer", "").strip().lower()
    acceptable = params.get("acceptable_words", [correct])
    acceptable_lower = [w.strip().lower() for w in acceptable]
    is_correct = user_answer in acceptable_lower

    steps = [
        "Step 1: Read the question and think about what it is asking.",
        f"Step 2: Write a clear, short answer.",
        f"Step 3: Check your answer against the expected answer: {params.get('correct_answer', '')}",
        f"Step 4: Acceptable answers include: {', '.join(acceptable)}",
        f"Step 5: Your answer: '{params.get('user_answer', '')}'",
    ]
    if is_correct:
        steps.append("Result: Your answer is CORRECT!")
    else:
        steps.append(f"Result: Your answer may need review. Expected something like: '{params.get('correct_answer', '')}'")

    return {
        "answer": params.get("correct_answer", ""),
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "keyword_match",
            "user_answer": user_answer,
            "acceptable": acceptable_lower,
            "match": is_correct,
        },
    }


def solve_long_answer(params: dict) -> dict:
    """Solve a long-answer writing question."""
    user_text = params.get("user_text", "")
    criteria = params.get("criteria", [])
    sample = params.get("sample_answer", "")

    sentence_count = len([s for s in user_text.split(".") if s.strip()]) if user_text else 0
    word_count = len(user_text.split()) if user_text else 0

    steps = [
        "Step 1: Read the writing prompt carefully.",
        f"Step 2: Plan your answer — aim for {params.get('min_sentences', 3)}-{params.get('max_sentences', 5)} sentences.",
        f"Step 3: Write your answer following the rubric criteria.",
        f"Step 4: Check: {len(criteria)} criteria to verify against.",
        f"Step 5: Word count of your answer: {word_count} words, approximately {sentence_count} sentences.",
    ]

    rubric_results = {}
    for criterion in criteria:
        rubric_results[criterion] = "needs_review"

    return {
        "answer": sample,
        "is_correct": False,
        "user_text_preview": user_text[:200],
        "steps": steps,
        "word_count": word_count,
        "sentence_count": sentence_count,
        "rubric": rubric_results,
        "verification": {
            "method": "rubric",
            "criteria_count": len(criteria),
            "criteria": criteria,
            "note": "Long answers are graded using the rubric — check each criterion.",
            "sample_answer": sample,
        },
    }


def solve_numerical(params: dict) -> dict:
    """Solve a numerical/analytical question."""
    user_val = params.get("user_value", None)
    expected = params.get("expected_value", None)
    tol = params.get("tolerance", 0)

    if user_val is not None and expected is not None:
        is_correct = abs(float(user_val) - float(expected)) <= float(tol)
    else:
        is_correct = False

    steps = [
        f"Step 1: Identify what is being asked: {params.get('question_hint', '')}",
        f"Step 2: Apply the relevant rule or count.",
        f"Step 3: The expected answer is: {expected}",
        f"Step 4: Your answer is: {user_val}",
    ]
    if is_correct:
        steps.append("Result: Your numerical answer is CORRECT!")
    else:
        steps.append(f"Result: Your answer is INCORRECT. Expected: {expected}")

    return {
        "answer": expected,
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "numerical_check",
            "user_value": user_val,
            "expected_value": expected,
            "tolerance": tol,
            "match": is_correct,
        },
    }


# ============================================================
# MAIN GENERATOR
# ============================================================

def generate_questions(seed: int, count: int = 20) -> list:
    """
    Generate a deterministic list of Class 5 English questions.

    Covers ALL syllabus nodes:
    1. Sensory words in poetry (c3_eng_101)
    2. Fill-in-the-blank grammar: articles, prepositions, tenses (c1_c5_eng_001)
    3. Reading comprehension — inference and central idea (c4_c5_eng_001)
    4. Picture-based comprehension (c1_c5_eng_001)
    5. Word-level numerical analysis (syllables, vowels)
    6. Short and long writing prompts (c1_c5_eng_001)

    50% competency-based (Indian context), 50% standard.
    Mix: MCQ, fill-blank, short-answer, long-answer.
    """
    set_seed(seed)

    all_questions = []

    # Generate from each topic (deterministic order)
    all_questions.extend(_gen_sensory_questions(seed, count))
    all_questions.extend(_gen_grammar_questions(seed, count))
    all_questions.extend(_gen_comprehension_questions(seed, count))
    all_questions.extend(_gen_picture_comprehension(seed, count))
    all_questions.extend(_gen_numerical_questions(seed, count))
    all_questions.extend(_gen_writing_prompts(seed, count))

    # Deterministic shuffle using seed
    rng = random.Random(seed)
    rng.shuffle(all_questions)

    # Tag competency vs standard
    COMPETENCY_KEYWORDS = [
        "Indian", "Diwali", "Raksha", "monsoon", "village", "grandmother",
        "festival", "banyan", "Ganga", "Mumbai", "laddus", "samosas",
        "rangoli", "diyas", "jasmine", "temple", "raincoat", "peacock",
        "bicycle", "prize", "patriotic", "heritage",
    ]

    for q in all_questions:
        text = (q.question + " " + q.explanation + " " + str(q.params)).lower()
        is_competency = any(kw.lower() in text for kw in COMPETENCY_KEYWORDS)
        q.params["competency_based"] = is_competency

    # Ensure 50/50 split
    competency_qs = [q for q in all_questions if q.params.get("competency_based", False)]
    standard_qs = [q for q in all_questions if not q
]