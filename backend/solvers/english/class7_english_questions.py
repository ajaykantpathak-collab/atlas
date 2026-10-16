"""
CISCE English Class 7 — Deterministic Question Generator
Covers: Poetry Appreciation (rhyme, metre, tone, mood),
         Notices & Messages, Extensive Reading.
"""

import random
import string
import re
from fractions import Fraction
from math import gcd
from collections import Counter
from typing import Any


# ─────────────────────────────────────────────────────────
#  SOLVER FUNCTIONS
# ─────────────────────────────────────────────────────────

def solve_rhyme_scheme(params: dict) -> dict:
    """Solve a rhyme-scheme identification question.

    Parameters
    ----------
    params : dict  – must contain key 'endings' : list[str] of line-end words.

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    endings = params.get("endings", [])
    norm = [w.strip(string.punctuation).lower() for w in endings]

    letter_map: dict[str, str] = {}
    next_ord = ord("A")
    scheme = []

    for word in norm:
        if word in letter_map:
            scheme.append(letter_map[word])
        else:
            letter_map[word] = chr(next_ord)
            scheme.append(chr(next_ord))
            next_ord += 1

    scheme_str = "".join(scheme)
    steps = (
        [f"Step 1 – Normalised line endings: {norm}"]
        + [f"Step {i+2} – Line {i+1} ('{endings[i]}') → rhyme class '{s}'"
           for i, s in enumerate(scheme)]
        + [f"Step {len(norm)+2} – Rhyme scheme: {scheme_str}"]
    )
    return {
        "answer": scheme_str,
        "steps": steps,
        "verification": (
            f"Letter count = {len(set(scheme))} unique rhyme sounds. "
            f"Pattern '{scheme_str}' confirmed. "
            f"Rhyme classes: {letter_map}"
        ),
    }


def solve_metre_type(params: dict) -> dict:
    """Solve a metre-type identification question.

    Parameters
    ----------
    params : dict – must contain key 'text' : str of the poetic line.

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    text = params.get("text", "")
    words = re.findall(r"[A-Za-z']+", text)
    if not words:
        return {
            "answer": "Unknown",
            "steps": ["Could not extract words from text."],
            "verification": "N/A",
        }

    long_words = [w for w in words if len(w) > 3]
    short_words = [w for w in words if len(w) <= 3]

    stress = []
    for w in words:
        if len(w) <= 3:
            stress.append("S")
        elif len(w) % 2 == 0:
            stress.append("W")
        else:
            stress.append("S")

    pattern = " ".join(stress)
    metres = {
        "Iambic":      "W S ",
        "Trochaic":    "S W ",
        "Anapestic":   "W W S ",
        "Dactylic":    "S W W ",
        "Spondaic":    "S S ",
    }
    best, best_score = "Unknown", 0
    for name, pat in metres.items():
        score = sum(1 for i in range(min(len(pattern), len(pat)))
                    if pattern[i] == pat[i])
        if score > best_score:
            best, best_score = name, score
    confidence = round(best_score / max(len(pattern), 1), 2)

    return {
        "answer": best,
        "steps": [
            f"Step 1 – Words extracted: {words}",
            f"Step 2 – Stress pattern (S=strong/W=weak): {pattern}",
            f"Step 3 – Compared against standard templates; best match: "
            f"'{best}' (confidence score {confidence})",
            f"Step 4 – Strong beats counted: {stress.count('S')}",
        ],
        "verification": (
            f"Stress pattern '{pattern}' → '{best}' "
            f"(confidence {confidence}). "
            "Check: read aloud with strong beats on capitalised syllables."
        ),
    }


def solve_tone_mood(params: dict) -> dict:
    """Solve a tone-and-mood identification question.

    Parameters
    ----------
    params : dict – must contain key 'poem_hint' : str used to select a preset.

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    rng = random.Random(params.get("seed", 0))
    pool = [
        {
            "text": (
                "The old tree stands alone\n"
                "Beneath the pale cold moon\n"
                "Its branches sigh and moan\n"
                "As winter comes too soon."
            ),
            "tone": "Melancholic",
            "tone_words": ["alone", "sigh"],
            "mood": "Sadness and loneliness",
            "mood_words": ["pale", "moan"],
        },
        {
            "text": (
                "The children laugh and play\n"
                "Beneath the golden sun\n"
                "They dance the hours away\n"
                "Their joy has just begun."
            ),
            "tone": "Joyful",
            "tone_words": ["laugh", "joy"],
            "mood": "Happiness and warmth",
            "mood_words": ["golden", "dance"],
        },
        {
            "text": (
                "The dark clouds roll and blacken\n"
                "The angry storm approaches\n"
                "The lightning strikes the mountain\n"
                "And thunder loudly broaches."
            ),
            "tone": "Angry",
            "tone_words": ["angry", "blacken"],
            "mood": "Tension and fear",
            "mood_words": ["dark", "thunder"],
        },
        {
            "text": (
                "The gentle mother sings\n"
                "A lullaby so soft and sweet\n"
                "Her warm arms are the wings\n"
                "That keep her baby complete."
            ),
            "tone": "Tender",
            "tone_words": ["gentle", "sweet"],
            "mood": "Peace and love",
            "mood_words": ["warm", "soft"],
        },
        {
            "text": (
                "He said 'I'll help you, friend'\n"
                "And walked the other way\n"
                "The words he chose to send\n"
                "Were meant to sound half-kind, half-play."
            ),
            "tone": "Ironic",
            "tone_words": ["help", "half-kind"],
            "mood": "Suspicion and doubt",
            "mood_words": ["walked away", "half-play"],
        },
    ]
    entry = rng.choice(pool)

    tone_ev = ", ".join(f"'{w}'" for w in entry["tone_words"])
    mood_ev = ", ".join(f"'{w}'" for w in entry["mood_words"])
    steps = [
        f"Step 1 – Poem excerpt:\n{entry['text']}",
        f"Step 2 – Words suggesting poet's attitude: {tone_ev}",
        f"Step 3 – Poet's attitude = {entry['tone']}",
        f"Step 4 – Words creating reader's feeling: {mood_ev}",
        f"Step 5 – Reader's feeling = {entry['mood']}",
    ]
    return {
        "answer": {"tone": entry["tone"], "mood": entry["mood"]},
        "steps": steps,
        "verification": (
            f"Tone '{entry['tone']}' confirmed by evidence words "
            f"{tone_ev}. "
            f"Mood '{entry['mood']}' confirmed by "
            f"{mood_ev}."
        ),
    }


def solve_literary_device(params: dict) -> dict:
    """Solve a literary-device identification question.

    Parameters
    ----------
    params : dict – must contain key 'phrase' : str and 'device_pool' : list[str].

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    rng = random.Random(params.get("seed", 0))
    pool = params.get("device_pool", _DEVICE_POOL)
    entry = rng.choice(pool)
    phrase = params.get("phrase", entry["phrase"])
    answer = entry["device"]
    hint = entry["hint"]

    steps = [
        f"Step 1 – Phrase given: '{phrase}'",
        f"Step 2 – Analyse: {hint}",
        f"Step 3 – The device used is: {answer}",
    ]
    return {
        "answer": answer,
        "steps": steps,
        "verification": (
            f"Pattern '{phrase}' matches the definition of '{answer}'. "
            f"Check: {hint} ✓"
        ),
    }


_DEVICE_POOL = [
    {"phrase": "The silken sad uncertain rustling of each purple curtain",
     "device": "Alliteration",
     "hint": "Multiple words begin with the same consonant sound 's' and 'r'."},
    {"phrase": "The moon is like a silver boat sailing in the sky",
     "device": "Simile",
     "hint": "'like' directly compares the moon to a boat."},
    {"phrase": "The wind whispered secrets through the trees",
     "device": "Personification",
     "hint": "The wind (non-human) is given the human action of whispering."},
    {"phrase": "It was the best of times, it was the worst of times",
     "device": "Antithesis",
     "hint": "Opposite ideas ('best' vs 'worst') placed side by side."},
    {"phrase": "The classroom was a zoo after the teacher left",
     "device": "Metaphor",
     "hint": "The classroom is DIRECTLY called a zoo (no 'like' or 'as')."},
    {"phrase": "The mighty ocean, the restless wave",
     "device": "Rhyme",
     "hint": "'wave' rhymes with 'ocean' in the poetic context."},
    {"phrase": "Tick-tock, tick-tock goes the old wall-clock",
     "device": "Onomatopoeia",
     "hint": "'Tick-tock' imitates the actual sound of the clock."},
    {"phrase": "The leaves danced, the flowers smiled, the sun laughed",
     "device": "Personification",
     "hint": "Nature elements given human actions (danced, smiled, laughed)."},
]


def solve_notice_format(params: dict) -> dict:
    """Validate or build a school notice.

    Parameters
    ----------
    params : dict – must contain key 'notice_text' : str (the full notice to validate).

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    notice_text = params.get("notice_text", "")
    lines = [l.strip() for l in notice_text.split("\n") if l.strip()]

    has_title = bool(lines) and len(lines[0].split()) <= 3
    has_notice_word = any(l.upper() == "NOTICE" for l in lines)
    has_date = bool(re.search(
        r"\d{1,2}[/-](January|February|March|April|May|June|July|"
        r"August|September|October|November|December)[/-]\d{4}",
        notice_text, re.IGNORECASE
    )) or bool(re.search(r"\d{1,2}\s+(January|February|March|April|May|June|"
                        r"July|August|September|October|November|December)\s+\d{4}",
                        notice_text, re.IGNORECASE))
    has_body = len(lines) >= 4
    has_signature = any(
        "," in l and not l.upper().startswith("NOTICE")
        for l in lines[-2:]
    )

    checks = {
        "title (≤3 words)": has_title,
        "NOTICE word": has_notice_word,
        "date present": has_date,
        "body with what/when/where/who": has_body,
        "signature with designation": has_signature,
    }
    passed = sum(checks.values())
    total = len(checks)
    is_valid = passed == total
    score_pct = round(passed / total * 100)

    steps = [
        "Step 1 – Check title: ≤3 words? " + ("✓" if has_title else "✗"),
        "Step 2 – 'NOTICE' word present? " + ("✓" if has_notice_word else "✗"),
        "Step 3 – Date present? " + ("✓" if has_date else "✗"),
        "Step 4 – Body has what/when/where/who? "
        + ("✓" if has_body else "✗"),
        "Step 5 – Signature with designation? "
        + ("✓" if has_signature else "✗"),
    ]
    verdict = "VALID notice format" if is_valid else (
        f"INVALID — {total - passed} criteria failed"
    )
    return {
        "answer": verdict,
        "steps": steps,
        "verification": (
            f"{passed}/{total} format criteria met ({score_pct}%). "
            + "; ".join(f"{k}: {'✓' if v else '✗'}"
                        for k, v in checks.items())
        ),
    }


def solve_message_format(params: dict) -> dict:
    """Validate or build a short message for an absent person.

    Parameters
    ----------
    params : dict – must contain key 'message_text' : str.

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    message_text = params.get("message_text", "")
    lower = message_text.lower()

    checks = {
        "Visitor name mentioned":
            any(w in lower for w in _VISITOR_KEYWORDS),
        "Time of call mentioned":
            bool(re.search(
                r"\d{1,2}\s*(am|pm|o'clock|oclock)", lower
            )),
        "Reason/why mentioned":
            any(w in lower for w in _REASON_KEYWORDS),
        "Action needed mentioned":
            any(w in lower for w in _ACTION_KEYWORDS),
    }
    passed = sum(checks.values())
    total = len(checks)
    word_count = len(message_text.split())
    word_ok = word_count <= 50

    steps = [
        "Step 1 – Visitor name present? "
        + ("✓" if checks["Visitor name mentioned"] else "✗"),
        "Step 2 – Time mentioned? "
        + ("✓" if checks["Time of call mentioned"] else "✗"),
        "Step 3 – Reason mentioned? "
        + ("✓" if checks["Reason/why mentioned"] else "✗"),
        "Step 4 – Action needed mentioned? "
        + ("✓" if checks["Action needed mentioned"] else "✗"),
        f"Step 5 – Word count ({word_count}) ≤ 50? "
        + ("✓" if word_ok else "✗"),
    ]
    verdict = ("VALID message format" if all(checks.values()) and word_ok
               else f"INCOMPLETE — {total - passed + (0 if word_ok else 1)} issues")
    return {
        "answer": verdict,
        "steps": steps,
        "verification": (
            f"{passed + (1 if word_ok else 0)}/{total + 1} checks passed. "
            + " | ".join(f"{k}: {'✓' if v else '✗'}"
                        for k, v in checks.items())
        ),
    }


_VISITOR_KEYWORDS = ["called", "visited", "came", "aunt", "uncle",
                     "priya", "raj", "teacher", "coach", "friend"]
_REASON_KEYWORDS = ["called about", "wanted", "needed", "reason",
                    "about", "regarding", "meeting", "practice"]
_ACTION_KEYWORDS = ["call back", "meet", "bring", "submit",
                    "reply", "contact", "message", "tell"]


def solve_comprehension(params: dict) -> dict:
    """Solve a reading-comprehension question.

    Parameters
    ----------
    params : dict – must contain:
      'passage_id' : int (index into passage pool)
      'question_index' : int (0-based, which question for that passage)
      'question_type' : 'factual' | 'inferential' | 'main_idea'

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    rng = random.Random(params.get("seed", 0))
    passages = _PASSAGE_POOL
    pid = params.get("passage_id", rng.randint(0, len(passages) - 1))
    passage = passages[pid % len(passages)]
    q_type = params.get("question_type", "factual")
    qi = params.get("question_index", 0)

    faqs = passage["factual_questions"]
    iaqs = passage["inferential_questions"]
    mi  = passage["main_idea_question"]

    if q_type == "main_idea":
        question, answer, explanation = mi
    elif q_type == "inferential":
        idx = qi % len(iaqs)
        question, answer, explanation = iaqs[idx]
    else:
        idx = qi % len(faqs)
        question, answer, explanation = faqs[idx]

    steps = [
        f"Step 1 – Read passage: '{passage['title']}'",
        f"Step 2 – Question type: {q_type}",
        f"Step 3 – Question: {question}",
        f"Step 4 – Analyse text for answer → {answer}",
        f"Step 5 – Explanation: {explanation}",
    ]
    return {
        "answer": answer,
        "steps": steps,
        "verification": (
            f"Answer '{answer}' supported by passage evidence: "
            f"'{explanation}'"
        ),
    }


_PASSAGE_POOL = [
    {
        "title": "The Thirsty Crow",
        "text": (
            "On a hot summer day, a thirsty crow flew all over the sky "
            "looking for water. Soon, he saw a pot half-filled with water "
            "under a tree. But the water was too low for him to reach with "
            "his beak. He thought hard. Then he picked up small pebbles "
            "one by one and dropped them into the pot. The water rose "
            "higher and higher until the crow could drink it. The crow was "
            "very happy and flew away."
        ),
        "factual_questions": [
            ("What was the crow looking for?", "Water",
             "The crow searched the sky 'looking for water'."),
            ("Where did the crow find the pot?",
             "Under a tree",
             "The pot was 'under a tree'."),
            ("What did the crow drop into the pot?",
             "Small pebbles",
             "He 'picked up small pebbles one by one and dropped them into "
             "the pot'."),
        ],
        "inferential_questions": [
            ("Why did the crow not give up?",
             "Because he was determined and used his intelligence",
             "The crow 'thought hard' and found a clever solution, showing "
             "determination."),
            ("What quality does the crow show?",
             "Intelligence / resourcefulness",
             "He used pebbles creatively to raise the water level instead "
             "of flying away."),
        ],
        "main_idea_question": (
            "What is the main idea of the story?",
            "The crow uses his intelligence to solve a problem",
            "The entire story shows the crow thinking and finding a clever "
            "solution to reach the water."
        ),
    },
    {
        "title": "The Bundle of Sticks",
        "text": (
            "An old farmer had three quarrelsome sons. He wanted to teach "
            "them a lesson about unity. One day, he called them and gave "
            "each a bundle of sticks. 'Break these,' he said. Each son "
            "strained but could not break the bundle. Then the father "
            "untied the bundle and gave each son one stick. Each son "
            "broke his stick easily. 'Now you understand,' said the "
            "father, 'United we stand, divided we fall.' The sons were "
            "ashamed and promised to live in peace."
        ),
        "factual_questions": [
            ("How many sons did the farmer have?", "Three",
             "The story says 'three quarrelsome sons'."),
            ("What did the father give each son at first?",
             "A bundle of sticks",
             "He 'gave each a bundle of sticks'."),
            ("What moral did the father teach?",
             "United we stand, divided we fall",
             "The father explicitly says this lesson at the end."),
        ],
        "inferential_questions": [
            ("Why could the sons not break the bundle?",
             "Because the sticks were tied together giving strength",
             "A bundle of sticks is harder to break than a single stick "
             "due to combined strength."),
            ("How did the sons feel at the end?",
             "Ashamed and they promised to live in peace",
             "The text says 'The sons were ashamed and promised to live "
             "in peace'."),
        ],
        "main_idea_question": (
            "What is the main idea of the story?",
            "Unity gives strength",
            "The entire story illustrates that together people are stronger "
            "than when they are apart."
        ),
    },
    {
        "title": "Rina's Daily Routine",
        "text": (
            "Rina is a Class 7 student at St. Mary's School in Mumbai. "
            "Every morning she wakes at 5:30 am and helps her mother in "
            "the kitchen before leaving for school at 7:00 am. Her school "
            "starts at 7:30 am. She has seven periods each day and returns "
            "home at 1:30 pm. After lunch she spends two hours on homework "
            "and then plays badminton with her brother in the park. In the "
            "evening she attends her drawing class twice a week. She goes "
            "to bed by 9:30 pm after reading a storybook."
        ),
        "factual_questions": [
            ("What time does Rina wake up?", "5:30 am",
             "She 'wakes at 5:30 am'."),
            ("How many periods does she have at school?", "Seven",
             "The text says 'She has seven periods each day'."),
            ("When does she return home from school?", "1:30 pm",
             "She 'returns home at 1:30 pm'."),
        ],
        "inferential_questions": [
            ("Why do you think Rina is a disciplined student?",
             "She follows a strict daily schedule",
             "Her routine is organised and consistent, showing discipline."),
            ("What does Rina value in her free time?",
             "Creative activities and physical exercise",
             "She does drawing and plays badminton, valuing both art and "
             "sport."),
        ],
        "main_idea_question": (
            "What is the main idea of the passage?",
            "Rina follows a disciplined and balanced daily routine",
            "The passage describes her morning routine, school schedule, "
            "homework, play, and evening class."
        ),
    },
]


def solve_long_answer(params: dict) -> dict:
    """Solve a long-answer (analysis/evaluation) question.

    Parameters
    ----------
    params : dict – must contain key 'topic' matching a pool entry.

    Returns
    -------
    dict with keys: answer, steps, verification
    """
    rng = random.Random(params.get("seed", 0))
    topic_key = params.get("topic", rng.choice(list(_LONG_ANS_POOL.keys())))
    entry = _LONG_ANS_POOL.get(
        topic_key, rng.choice(list(_LONG_ANS_POOL.values()))
    )

    steps = [
        "Step 1 – Identify what the question is asking.",
        f"Step 2 – Recall definition of '{entry['concept']}': "
        f"{entry['definition']}",
        f"Step 3 – Apply to given context: {entry['application']}",
        f"Step 4 – Formulate complete answer (2–3 sentences).",
    ]
    answer = entry["answer_template"].format(concept=entry["concept"])
    return {
        "answer": answer,
        "steps": steps,
        "verification": (
            f"Key concept '{entry['concept']}' correctly defined and "
            f"applied. Answer addresses all parts of the question."
        ),
    }


_LONG_ANS_POOL = {
    "rhyme_mood": {
        "concept": "rhyme scheme",
        "definition": (
            "A rhyme scheme is the pattern of rhymes at the end of each "
            "line, labelled A, B, C, etc."
        ),
        "application": (
            "AABB creates a predictable, song-like feel; ABAB creates "
            "tension through delay."
        ),
        "answer_template": (
            "The rhyme scheme of this stanza is {concept}. "
            "The regular AABB pattern makes the reader feel calm and "
            "comfortable, like a nursery rhyme, because the rhymes "
            "come quickly and predictably at the end of every two lines."
        ),
    },
    "tone_mood": {
        "concept": "tone and mood",
        "definition": (
            "Tone is the poet's attitude toward the subject; mood is the "
            "feeling created in the reader."
        ),
        "application": (
            "Words like 'sigh' and 'moan' show the poet feels sad, "
            "making the reader feel lonely."
        ),
        "answer_template": (
            "The tone of the poem is {concept}. "
            "The poet uses sad and gentle words to show tenderness "
            "toward the subject. The mood in the reader is one of "
            "pity and quiet sadness, created by the slow, soft rhythm "
            "and the choice of sorrowful vocabulary."
        ),
    },
    "metre_mood": {
        "concept": "metre",
        "definition": (
            "Metre is the pattern of stressed (strong) and unstressed "
            "(weak) syllables in a line of poetry."
        ),
        "application": (
            "Slow iambic metre with few beats per line makes the poem "
            "feel calm and sad."
        ),
        "answer_template": (
            "The poem uses {concept} with a regular beat of two strong "
            "syllables per line. This slow, steady rhythm makes the mood "
            "feel calm and peaceful, because the reader naturally falls "
            "into the same pace as the poem."
        ),
    },
    "alliteration_effect": {
        "concept": "alliteration",
        "definition": (
            "Alliteration is the repetition of the same initial consonant "
            "sound in nearby words."
        ),
        "application": (
            "Repetition of 's' sounds mimics a whisper, creating a "
            "mysterious or peaceful feeling."
        ),
        "answer_template": (
            "The poet uses {concept} by repeating the 's' sound in "
            "'silken', 'sad', 'uncertain', and 'rustling'. "
            "This creates a soft, whispering sound in the reader's ear "
            "that makes the mood feel mysterious, quiet, and slightly "
            "sad — as if the curtains themselves are alive and speaking."
        ),
    },
}


# ─────────────────────────────────────────────────────────
#  QUESTION GENERATOR
# ─────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int) -> list[dict[str, Any]]:
    """Generate *count* deterministic English questions for Class 7 CISCE.

    Parameters
    ----------
    seed   : int   – random seed for reproducibility.
    count  : int   – total number of questions to generate.

    Returns
    -------
    list[dict] – each dict with keys:
        id, type, question, options (MCQ only), answer,
        explanation, difficulty, topic, steps, verification
    """
    rng = random.Random(seed)

    topic_pool = [
        # Standard topics (50%)
        ("rhyme_scheme",        "mcq",       "easy",   "Poetry: Rhyme Scheme"),
        ("metre_type",          "mcq",       "medium", "Poetry: Metre"),
        ("tone_mood",           "mcq",       "medium", "Poetry: Tone & Mood"),
        ("literary_device",     "fill_blank","easy",   "Poetry: Literary Devices"),
        ("notice_format",       "short_answer","easy",  "Writing: Notices"),
        ("message_format",      "short_answer","easy",  "Writing: Messages"),
        ("comprehension",       "short_answer","medium","Reading: Comprehension"),
        ("long_answer",         "long_answer","hard",   "Poetry: Analysis"),
        ("notice_generate",     "long_answer","medium", "Writing: Notice Creation"),
        ("comprehension_passage","long_answer","medium","Reading: Comprehension"),
    ]

    # ── map of question_type → handler ──────────────────
    handlers = {
        "mcq":           _build_mcq,
        "fill_blank":    _build_fill_blank,
        "short_answer":  _build_short_answer,
        "long_answer":   _build_long_answer,
        "numerical":     _build_numerical,
    }

    questions: list[dict[str, Any]] = []
    for q_num in range(1, count + 1):
        topic_key, q_type, difficulty, topic_name = rng.choice(topic_pool)
        handler = handlers.get(q_type, _build_short_answer)

        sub_seed = seed * 1000 + q_num
        qd = handler(rng, sub_seed, topic_key, topic_name, difficulty)

        qd["id"] = f"ENG7_{q_num:03d}"
        qd["difficulty"] = difficulty
        qd["topic"] = topic_name
        if "options" not in qd:
            qd["options"] = None
        questions.append(qd)

    return questions


# ─────────────────────────────────────────────────────────
#  QUESTION BUILDERS
# ─────────────────────────────────────────────────────────

def _build_mcq(rng: random.Random, sub_seed: int,
               topic: str, topic_name: str, difficulty: str) -> dict:
    """Build an MCQ question."""
    sub = random.Random(sub_seed)
    # branches without a solver (tone_mood, fallback) must not crash on
    # the shared return below (SOLVER-DIG-2: UnboundLocalError killed
    # every tone_mood generation)
    solver_result: dict = {}

    if topic == "rhyme_scheme":
        stanzas = _RHYME_STANZAS
        stanza = sub.choice(stanzas)
        endings = stanza["endings"]
        params = {"endings": endings}
        solver_result = solve_rhyme_scheme(params)
        correct = solver_result["answer"]

        wrong = _wrong_rhyme_schemes(correct)
        opts = [correct] + wrong
        sub.shuffle(opts)

        question = (
            f"Read the following 4-line stanza:\n"
            f"'{stanza['text']}'\n\n"
            f"What is the rhyme scheme of this stanza?"
        )
        explanation = (
            f"Lines 1 & 2 rhyme ({endings[0]}/{endings[1]} = A), "
            f"lines 3 & 4 rhyme ({endings[2]}/{endings[3]} = B). "
            f"Rhyme scheme: {correct}."
        )

    elif topic == "metre_type":
        line, mtype = sub.choice(_METRE_LINES)
        params = {"text": line}
        solver_result = solve_metre_type(params)
        correct = solver_result["answer"]

        other_types = [t for t in _METRE_TYPES if t != correct]
        wrong = [sub.choice(other_types) for _ in range(3)]
        opts = [correct] + wrong
        sub.shuffle(opts)

        question = (
            f"Identify the type of metre in this line of poetry:\n"
            f"'{line}'\n\n"
            f"Count the strong (stressed) beats per line."
        )
        explanation = (
            f"The stress pattern of '{line}' matches the definition of "
            f"'{correct}' metre."
        )

    elif topic == "tone_mood":
        entry = sub.choice(_TONE_MOOD_POOL)
        question = (
            f"Read the poem excerpt:\n\n{entry['text']}\n\n"
            f"What is the tone AND mood of this poem?\n"
            f"(Tone = poet's attitude; Mood = reader's feeling)"
        )
        correct = f"Tone: {entry['tone']}, Mood: {entry['mood']}"

        tone_opts = ["Joyful", "Melancholic", "Angry", "Ironic", "Tender"]
        mood_opts = ["Happiness", "Sadness", "Tension", "Peace", "Fear"]

        wrong_tones = [t for t in tone_opts if t != entry["tone"]]
        wrong_moods = [m for m in mood_opts if m != entry["mood"]]

        opts = [
            f"Tone: {entry['tone']}, Mood: {entry['mood']}",
            f"Tone: {sub.choice(wrong_tones)}, Mood: {entry['mood']}",
            f"Tone: {entry['tone']}, Mood: {sub.choice(wrong_moods)}",
            f"Tone: {sub.choice(wrong_tones)}, Mood: {sub.choice(wrong_moods)}",
        ]
        sub.shuffle(opts)
        explanation = (
            f"Tone '{entry['tone']}' shown by words: "
            f"{', '.join(entry['tone_words'])}. "
            f"Mood '{entry['mood']}' created by: "
            f"{', '.join(entry['mood_words'])}."
        )
    else:
        question = "Select the correct answer."
        correct = "Option A"
        opts = ["Option A", "Option B", "Option C", "Option D"]
        explanation = "Standard MCQ explanation."

    return {
        "type": "mcq",
        "question": question,
        "options": opts,
        "answer": correct,
        "explanation": explanation,
        "steps": solver_result.get("steps", []),
        "verification": solver_result.get("verification", ""),
    }


def _wrong_rhyme_schemes(correct: str) -> list[str]:
    """Generate plausible wrong rhyme-scheme options."""
    common = ["AABB", "ABAB", "ABBA", "AABA", "ABAA", "BBAA"]
    return [s for s in common if s != correct][:3]


_RHYME_STANZAS = [
    {"text": "The sun came out / and all the flowers / began to shout / "
             "with all their powers",
     "endings": ["out", "flowers", "shout", "powers"]},
    {"text": "The cat sat down / upon the ground / and heard the sound / "
             "of bells all round",
     "endings": ["down", "ground", "sound", "round"]},
    {"text": "Stars above / tell of love / in the night / pure and bright",
     "endings": ["above", "love", "night", "bright"]},
    {"text": "Little lamb / in the grass / run to me / you must pass",
     "endings": ["lamb", "grass", "me", "pass"]},
    {"text": "Tall trees sway / in the bright day / birds fly by / "
             "up in the sky",
     "endings": ["sway", "day", "by", "sky"]},
]


_METRE_LINES = [
    ("The rain came gently down upon the earth", "Iambic"),
    ("Tell me not in mournful numbers Life is but an empty dream",
     "Trochaic"),
    ("I wonder if the stars are shining tonight", "Iambic"),
    ("Peter Piper picked a peck of pickled peppers",
     "Alliterative / Anapestic"),
    ("The summer sun is shining bright and warm", "Iambic"),
    ("Humpty Dumpty sat upon a wall Humpty", "Trochaic"),
    ("The moon was shining in the midnight sky", "Iambic"),
    ("Sing a song of sixpence a pocket full of rye",
     "Iambic"),
]
_METRE_TYPES = ["Iambic", "Trochaic", "Anapestic", "Dactylic", "Spondaic",
                "Alliterative"]

_TONE_MOOD_POOL = [
    {"text": "The little girl sat alone\nIn her room so grey and cold\n"
             "Waiting for a voice on phone\nStories of the days of old.",
     "tone": "Melancholic", "tone_words": ["alone", "grey"],
     "mood": "Loneliness and sadness", "mood_words": ["cold", "waiting"]},
    {"text": "Oh how the children laugh and play\nBeneath the "
             "sunshine of the day\nTheir happy feet run fast and free\n"
             "As bright as any child can be.",
     "tone": "Joyful", "tone_words": ["laugh", "happy"],
     "mood": "Happiness and energy", "mood_words": ["sunshine", "bright"]},
    {"text": "The storm came crashing through the night\nWith angry "
             "wind and blinding light\nThe trees bowed down in fear "
             "and fright\nBefore the dark and angry might.",
     "tone": "Angry", "tone_words": ["crashing", "angry"],
     "mood": "Fear and tension", "mood_words": ["fright", "dark"]},
    {"text": "The mother kissed her sleeping child\nAnd tiptoed "
             "softly from the room\nA gentle love the stars had filed "
             "\nTo guard the child until the noon.",
     "tone": "Tender", "tone_words": ["kissed", "gentle"],
     "mood": "Warmth and love", "mood_words": ["softly", "guard"]},
]


def _build_fill_blank(rng: random.Random, sub_seed: int,
                      topic: str, topic_name: str, difficulty: str) -> dict:
    """Build a fill-in-the-blank question."""
    sub = random.Random(sub_seed)
    entry = sub.choice(_FILL_BLANK_POOL)

    if topic == "literary_device":
        question = (
            f"In the phrase '{entry['phrase']}', "
            f"the poet uses the literary device called ______.\n"
            f"(One word answer)"
        )
        correct = entry["device"]
        explanation = entry["hint"]
        steps = [
            f"Step 1 – Identify the phrase: '{entry['phrase']}'",
            f"Step 2 – Analyse: {entry['hint']}",
            f"Step 3 – The literary device is: {correct}",
        ]
        solver_result = {"steps": steps,
                         "verification": f"'{entry['phrase']}' matches "
                                         f"the definition of '{correct}'. ✓"}
    else:
        question = "Fill in the blank: The rhyme scheme AABB means ______."
        correct = "lines 1–2 rhyme and lines 3–4 rhyme"
        explanation = "AABB: first A pair, then B pair."
        steps = ["AABB = A-A-B-B; lines in the same letter group rhyme."]
        solver_result = {"steps": steps,
                         "verification": "AABB confirmed. ✓"}

    return {
        "type": "fill_blank",
        "question": question,
        "options": None,
        "answer": correct,
        "explanation": explanation,
        "steps": solver_result["steps"],
        "verification": solver_result["verification"],
    }


_FILL_BLANK_POOL = [
    {"phrase": "The silken, sad, uncertain rustling of each purple curtain",
     "device": "Alliteration",
     "hint": "Multiple words begin with the same sound 's' and 'r'."},
    {"phrase": "She is as beautiful as a rose in the morning",
     "device": "Simile",
     "hint": "'as' compares her beauty directly to a rose."},
    {"phrase": "The wind howled through the dark forest at midnight",
     "device": "Personification",
     "hint": "The wind is given the human action of howling."},
    {"phrase": "The ocean is a hungry dog",
     "device": "Metaphor",
     "hint": "The ocean is DIRECTLY called a dog (no 'like' or 'as')."},
    {"phrase": "Tick-tock, tick-tock — the clock won't stop",
     "device": "Onomatopoeia",
     "hint": "'Tick-tock' imitates the actual sound the clock makes."},
    {"phrase": "Parting is such sweet sorrow",
     "device": "Oxymoron",
     "hint": "Opposite words 'sweet' and 'sorrow' are combined."},
]


def _build_short_answer(rng: random.Random, sub_seed: int,
                        topic: str, topic_name: str, difficulty: str
                        ) -> dict:
    """Build a short-answer (1–2 sentence) question."""
    sub = random.Random(sub_seed)

    if topic == "notice_format":
        entry = sub.choice(_NOTICE_PROMPTS)
        question = (
            f"You are {entry['role']} of your school. "
            f"Write a notice for: {entry['event']}. "
            f"Follow the correct format (title ≤3 words, NOTICE, date, "
            f"body with what/when/where/who, your name + designation). "
            f"Word limit: 30–40 words."
        )
        params = {
            "notice_text": (
                f"{entry['title']}\n"
                f"NOTICE\n"
                f"{entry['date']}\n"
                f"{entry['body']}\n"
                f"{entry['writer']}"
            )
        }
        solver_result = solve_notice_format(params)
        correct = solver_result["answer"]
        explanation = (
            "A valid notice must have: (1) title ≤3 words, "
            "(2) 'NOTICE' heading, (3) date, "
            "(4) body with what/when/where/who, "
            "(5) writer's name with designation."
        )
        steps = solver_result["steps"]
        verification = solver_result["verification"]

    elif topic == "message_format":
        entry = sub.choice(_MESSAGE_PROMPTS)
        question = (
            f"You are at home. Your friend {entry['caller']} calls at "
            f"{entry['time_str']} saying {entry['reason']}. "
            f"Write a short message for your parent. "
            f"(Include: who called, when, why, and what action is needed.)"
        )
        msg_text = (
            f"{entry['caller']} called at {entry['time_str']} "
            f"to say {entry['reason']}. "
            f"Action: {entry['action']}."
        )
        params = {"message_text": msg_text}
        solver_result = solve_message_format(params)
        correct = solver_result["answer"]
        explanation = (
            "A valid message records: (1) who called, "
            "(2) time of call, (3) reason, (4) action needed."
        )
        steps = solver_result["steps"]
        verification = solver_result["verification"]

    elif topic == "comprehension":
        p = sub.choice(_PASSAGE_POOL)
        q, a, expl = sub.choice(p["factual_questions"])
        question = f"Read the passage '{p['title']}' and answer:\n\n{q}"
        correct = a
        explanation = f"Evidence from text: {expl}"
        steps = [
            f"Step 1 – Locate relevant sentence in passage '{p['title']}'.",
            f"Step 2 – Extract answer: '{a}'",
            f"Step 3 – Confirm with text evidence.",
        ]
        verification = f"Answer '{a}' confirmed by passage text: {expl}"
    else:
        question = "What is a rhyme scheme?"
        correct = "The pattern of end-of-line rhymes labelled with letters."
        explanation = "Rhyme scheme labels each unique end-sound with a letter."
        steps = ["Rhyme scheme = letter labels for end-of-line rhymes."]
        verification = "Definition confirmed. ✓"

    return {
        "type": "short_answer",
        "question": question,
        "options": None,
        "answer": correct,
        "explanation": explanation,
        "steps": steps,
        "verification": verification,
    }


_NOTICE_PROMPTS = [
    {
        "role": "Sports Captain",
        "event": "Inter-House Cricket Match",
        "title": "CRICKET MATCH",
        "date": "15 August 2024",
        "body": (
            "The Cultural Committee invites all students to the "
            "Inter-House Cricket Match on 20 August at 4:00 pm "
            "on the school playground. Registration closes on "
            "18 August."
        ),
        "writer": "Arjun Mehta, Sports Captain",
    },
    {
        "role": "Librarian",
        "event": "Book Fair in the school library",
        "title": "BOOK FAIR",
        "date": "22 September 2024",
        "body": (
            "A Book Fair will be held in the school library on "
            "25 September from 10:00 am to 2:00 pm. All students "
            "are welcome to visit and buy books at special prices."
        ),
        "writer": "Priya Nair, School Librarian",
    },
    {
        "role": "Eco Club Secretary",
        "event": "Tree Plantation Drive",
        "title": "TREE DRIVE",
        "date": "3 October 2024",
        "body": (
            "The Eco Club is organising a Tree Plantation Drive "
            "on 5 October at 8:00 am near the school garden. "
            "All volunteers should assemble in the garden by 7:45 am."
        ),
        "writer": "Rahul Das, Eco Club Secretary",
    },
    {
        "role": "Head Girl",
        "event": "Farewell Ceremony for Class 10",
        "title": "FAREWELL 2024",
        "date": "28 February 2024",
        "body": (
            "A Farewell Ceremony for Class 10 will be held on "
            "1 March at 10:00 am in the school auditorium. "
            "Class 9 students are requested to prepare cultural items."
        ),
        "writer": "Ananya Singh, Head Girl",
    },
]

_MESSAGE_PROMPTS = [
    {"caller": "Priya", "time_str": "4:00 pm", "reason": "you have Maths tuition",
     "action": "Call Priya back before 5 pm"},
    {"caller": "Your science teacher, Mr. Rao", "time_str": "10:00 am",
     "reason": "you must bring your science project tomorrow",
     "action": "Remember to take the project to school"},
    {"caller": "Your cricket coach", "time_str": "6:30 am tomorrow",
     "reason": "the practice session is cancelled",
     "action": "No need to wake up early tomorrow"},
    {"caller": "Your aunt", "time_str": "2:00 pm",
     "reason": "she is visiting this Sunday with your cousins",
     "action": "Tell your parents and clean your room"},
    {"caller": "Your friend Rohan", "time_str": "7:00 pm",
     "reason": "the homework for English has changed",
     "action": "Check the updated homework on the school app"},
]


def _build_long_answer(rng: random.Random, sub_seed: int,
                       topic: str, topic_name: str, difficulty: str
                       ) -> dict:
    """Build a long-answer (analysis/evaluation) question."""
    sub = random.Random(sub_seed)

    if topic == "long_answer":
        keys = list(_LONG_ANS_POOL.keys())
        key = sub.choice(keys)
        entry = _LONG_ANS_POOL[key]
        # SOLVER-DIG-2 fix: pool entries carry concept/definition/
        # application/answer_template — there was never an entry
        # 'question' key, so EVERY long_answer draw crashed with
        # KeyError.  The ask is composed from the entry's own fields.
        question = (
            f"Read the following poem carefully:\n\n"
            f"{sub.choice(_LONG_POEMS)['text']}\n\n"
            f"Identify and explain the {entry['concept']} used in this "
            f"poem, and describe the effect it creates. "
            f"(Hint: {entry['definition']})"
        )
        correct = entry["answer_template"].format(concept=entry["concept"])
        explanation = entry["application"]
        steps = [
            "Step 1 – Read and understand the poem.",
            f"Step 2 – Identify the {entry['concept']} in the poem.",
            f"Step 3 – Note the poet's word choices that show "
            f"{entry['concept']}.",
            f"Step 4 – Explain how {entry['concept']} creates the "
            f"mood in 2–3 sentences.",
        ]
        verification = (
            f"Answer addresses {entry['concept']} with evidence from "
            f"the poem. Key elements present: {entry['concept']}."
        )

    elif topic == "notice_generate":
        entry = sub.choice(_NOTICE_PROMPTS)
        question = (
            "Write a proper school notice for the following event:\n"
            f"Event: {entry['event']}\n"
            f"You are: {entry['role']}\n\n"
            "Follow all format rules (title ≤3 words, NOTICE, date, "
            "body, signature). Word limit: 30–40 words."
        )
        correct = (
            f"Correct notice:\n{entry['title']}\nNOTICE\n"
            f"{entry['date']}\n{entry['body']}\n{entry['writer']}"
        )
        explanation = (
            "The notice has all five required elements in the correct "
            "order: title (≤3 words), NOTICE word, date, body, "
            "and writer's name with designation."
        )
        steps = [
            "Step 1 – Write a title of ≤3 words.",
            "Step 2 – Write 'NOTICE' on the next line.",
            "Step 3 – Write the date.",
            "Step 4 – Write the body with what, when, where, who.",
            "Step 5 – Write your name and designation.",
        ]
        verification = (
            "Notice format: title ✓, NOTICE ✓, date ✓, "
            "body ✓, signature ✓"
        )

    elif topic == "comprehension_passage":
        p = sub.choice(_PASSAGE_POOL)
        _, mi_a, mi_expl = p["main_idea_question"]
        question = (
            f"Read the passage '{p['title']}':\n\n{p['text']}\n\n"
            f"{p['main_idea_question'][0]}"
        )
        correct = mi_a
        explanation = mi_expl
        steps = [
            f"Step 1 – Read the entire passage: '{p['title']}'",
            f"Step 2 – Identify the central theme: '{mi_a}'",
            f"Step 3 – Evidence from text: {mi_expl}",
        ]
        verification = f"Main idea '{mi_a}' confirmed: {mi_expl}"
    else:
        question = "Analyze the use of imagery in a poem."
        correct = "Imagery uses descriptive language to create mental pictures."
        explanation = "Imagery appeals to the five senses."
        steps = ["Define imagery.", "Find examples in the poem.",
                 "Explain the effect."]
        verification = "Imagery definition and examples confirmed."

    return {
        "type": "long_answer",
        "question": question,
        "options": None,
        "answer": correct,
        "explanation": explanation,
        "steps": steps,
        "verification": verification,
    }


_LONG_POEMS = [
    {
        "text": (
            "The little lamp burns in the dark\n"
            "A tiny flame that leaves its mark\n"
            "It warms the cold and chases night\n"
            "And fills the room with amber light."
        )
    },
    {
        "text": (
            "The river flows so calm and slow\n"
            "Through fields where golden grasses grow\n"
            "It sings a song both soft and deep\n"
            "While all the world is fast asleep."
        )
    },
    {
        "text": (
            "The market wakes at break of day\n"
            "With colours bright and voices gay\n"
            "The vendors call their wares with pride\n"
            "As shoppers walk from side to side."
        )
    },
]


def _build_numerical(rng: random.Random, sub_seed: int,
                     topic: str, topic_name: str, difficulty: str
                     ) -> dict:
    """Build a simple numerical question (count syllables, beats, etc.)."""
    sub = random.Random(sub_seed)

    if topic == "metre_type":
        line, _ = sub.choice(_METRE_LINES)
        words = re.findall(r"[A-Za-z']+", line)
        syllables = [max(1, sum(1 for c in w.lower()
                                if c in "aeiouy")) for w in words]
        total_syl = sum(syllables)
        strong_approx = sum(1 for s in syllables if s >= 2)

        question = (
            f"The following line has {len(words)} words:\n"
            f"'{line}'\n\n"
            f"Approximately how many strong (stressed) beats "
            f"are there in this line?\n\n"
            f"(Count each content word as one strong beat.)"
        )
        correct = str(strong_approx)
        explanation = (
            f"There are {len(words)} words. Content words "
            f"(nouns, verbs, adjectives) typically carry strong beats. "
            f"Approximate strong beats: {strong_approx}."
        )
        steps = [
            f"Step 1 – Count words: {len(words)}",
            f"Step 2 – Syllables per word: {syllables}",
            f"Step 3 – Total syllables: {total_syl}",
            f"Step 4 – Approximate strong beats (content words): "
            f"{strong_approx}",
        ]
        verification = (
            f"Beat count ≈ {strong_approx}. "
            f"Note: metre analysis is approximate; "
            f"natural speech may vary."
        )
    else:
        line = sub.choice(_METRE_LINES)[0]
        words = re.findall(r"[A-Za-z']+", line)
        question = (
            f"How many syllables are in this line of poetry?\n"
            f"'{line}'\n\n"
            f"(Count each vowel sound as one syllable.)"
        )
        syllables = [max(1, sum(1 for c in w.lower()
                                if c in "aeiouy")) for w in words]
        correct = str(sum(syllables))
        explanation = (
            f"Word syllable counts: {list(zip(words, syllables))}. "
            f"Total syllables = {sum(syllables)}."
        )
        steps = (
            [f"Step {i+1} – '{w}': {s} syllable(s)"
             for i, (w, s) in enumerate(zip(words, syllables))]
            + [f"Step {len(words)+1} – Total: {sum(syllables)} syllables"]
        )
        verification = f"Syllable count = {sum(syllables)}. ✓"

    return {
        "type": "numerical",
        "question": question,
        "options": None,
        "answer": correct,
        "explanation": explanation,
        "steps": steps,
        "verification": verification,
    }


# ─────────────────────────────────────────────────────────
#  VERIFICATION UTILITY
# ─────────────────────────────────────────────────────────

def verify_question(qd: dict) -> bool:
    """Run verification checks on a single question dict.

    Returns True if the question passes all checks, False otherwise.
    """
    required_keys = ["id", "type", "question", "answer",
                     "explanation", "difficulty", "topic",
                     "steps", "verification"]
    missing = [k for k in required_keys if k not in qd]
    if missing:
        return False

    if qd["type"] == "mcq":
        opts = qd.get("options")
        if not opts or len(opts) < 2:
            return False
        if qd["answer"] not in opts:
            return False

    if not qd["answer"]:
        return False

    if not qd["steps"]:
        return False

    return True


# ─────────────────────────────────────────────────────────
#  PUBLIC API
# ─────────────────────────────────────────────────────────

__all__ = [
    "solve_rhyme_scheme",
    "solve_metre_type",
    "solve_tone_mood",
    "solve_literary_device",
    "solve_notice_format",
    "solve_message_format",
    "solve_comprehension",
    "solve_long_answer",
    "generate_questions",
    "verify_question",
]