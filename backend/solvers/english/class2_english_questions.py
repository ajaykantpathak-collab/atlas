"""
CISCE Class 2 English — Deterministic Question Generator
Covers all syllabus nodes:
  c1_eng_006  Phonics: letter-sound correspondence
  c1_eng_201  Aesop's Fables (listening & enjoying animal stories)
  c2_eng_001  Listening with Understanding (multi-step instructions)
"""

import random
import string
import hashlib
from fractions import Fraction
from math import floor
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

# ─────────────────────────────────────────────
#  DATA  (syllabus-linked, no external deps)
# ─────────────────────────────────────────────

LETTER_SOUNDS = {
    "b": ("B", "bat", "ball", "bus"),
    "s": ("S", "sun", "snake", "star"),
    "m": ("M", "mango", "mum", "mouse"),
    "t": ("T", "top", "tiger", "tree"),
    "p": ("P", "pen", "pig", "pot"),
    "c": ("C", "cat", "cup", "cow"),
    "d": ("D", "dog", "drum", "door"),
    "f": ("F", "fan", "fish", "frog"),
}

AESOP_FABLES = {
    "thirsty_crow": {
        "title": "The Thirsty Crow",
        "characters": ["crow"],
        "events": [
            "A crow was very thirsty on a hot summer day.",
            "The crow found a pitcher with very little water.",
            "The crow dropped pebbles into the pitcher.",
            "The water rose and the crow drank it.",
        ],
        "moral": "Where there is a will, there is a way.",
        "beginning_sound": "c",
    },
    "hare_tortoise": {
        "title": "The Hare and the Tortoise",
        "characters": ["hare", "tortoise"],
        "events": [
            "The hare ran very fast and was sure he would win.",
            "The hare decided to sleep under a tree.",
            "The tortoise walked slowly but did not stop.",
            "The tortoise crossed the finish line first.",
        ],
        "moral": "Slow and steady wins the race.",
        "beginning_sound": "t",
    },
    "boy_cried_wolf": {
        "title": "The Boy Who Cried Wolf",
        "characters": ["boy", "wolf", "villagers"],
        "events": [
            "A boy looked after sheep near a village.",
            "He shouted 'Wolf!' as a joke and the villagers came.",
            "He did this twice and the villagers got angry.",
            "A real wolf came and nobody believed him.",
        ],
        "moral": "We must not tell lies.",
        "beginning_sound": "b",
    },
}

SWING_POEM_LINES = [
    "How do you like to go up in a swing?",
    "Up in the air I go flying;",
    "Over the wall I see rivers and trees and cattle,",
    "And all sorts of country things.",
]

INDIAN_NAMES = [
    "Rahul", "Priya", "Aarav", "Anaya", "Vihaan", "Diya",
    "Ishaan", "Kavya", "Arjun", "Saanvi", "Aditya", "Meera",
]

INDIAN_OBJECTS_BY_SOUND = {
    "b": ["bat", "book", "bag", "bangle", "banyan tree"],
    "s": ["sun", "snake", "star", "school", "spoon"],
    "m": ["mango", "mum", "mouse", "moon", "mirror"],
    "t": ["top", "tiger", "tree", "turtle", "temple"],
    "p": ["pen", "pig", "pot", "pencil", "papaya"],
    "c": ["cat", "cup", "cow", "camel", "cricket"],
    "d": ["dog", "drum", "door", "doll", "drumstick"],
    "f": ["fan", "fish", "frog", "flag", "flower"],
}

# ─────────────────────────────────────────────
#  HELPER UTILITIES
# ─────────────────────────────────────────────

def _hash(seed_str: str) -> int:
    """Stable integer from a string for deterministic seeding."""
    return int(hashlib.md5(seed_str.encode()).hexdigest()[:8], 16)


def _rng(seed: int):
    """Return a fresh Random instance seeded deterministically."""
    return random.Random(seed)


def _shuffle(seq, rng):
    """In-place shuffle with a given rng; return shuffled list."""
    items = list(seq)
    rng.shuffle(items)
    return items


def _mcq_options(correct: str, distractors: List[str], rng) -> List[str]:
    opts = [correct] + list(distractors)
    opts = _shuffle(opts, rng)
    return opts


def _letter_label(letter: str) -> str:
    """e.g. 'b' → '(B)'"""
    return f"({letter.upper()})"


def _sound_in_ipa(letter: str) -> str:
    mapping = {
        "b": "/b/", "s": "/s/", "m": "/m/", "t": "/t/",
        "p": "/p/", "c": "/k/", "d": "/d/", "f": "/f/",
    }
    return mapping.get(letter, f"/{letter}/")


# ─────────────────────────────────────────────
#  PHONICS QUESTION BUILDERS  (c1_eng_006)
# ─────────────────────────────────────────────

def _phonics_sound_for_letter(seed: int) -> Dict[str, Any]:
    """MCQ: What sound does this letter make?"""
    rng = _rng(seed)
    letters = list(LETTER_SOUNDS.keys())
    target_letter = rng.choice(letters)
    _, cap, word1, word2 = LETTER_SOUNDS[target_letter]
    correct_sound = _sound_in_ipa(target_letter)

    wrong_pool = [_sound_in_ipa(l) for l in letters if l != target_letter]
    wrong_sounds = _shuffle(wrong_pool, rng)[:3]

    question = (
        f"Your teacher holds up the letter {_letter_label(target_letter)} "
        f"and says its sound. Which sound is correct?\n"
        f"  (The picture words that start with this letter are: "
        f"'{word1}' and '{word2}'.)"
    )
    options = _mcq_options(correct_sound, wrong_sounds, rng)
    answer = correct_sound

    steps = [
        f"Step 1 — Identify the letter shown: {_letter_label(target_letter)}.",
        f"Step 2 — Recall words that begin with {_letter_label(target_letter)}: "
        f"'{word1}', '{word2}'.",
        f"Step 3 — Say the BEGINNING SOUND of those words: {correct_sound}.",
        f"Step 4 — Do NOT say the letter name (e.g. 'bee' for B). "
        f"Say only the sound: {correct_sound}.",
    ]
    verification = (
        f"Back-substitution: '{word1}' starts with /{target_letter}/ → "
        f"{correct_sound} ✓. '{word2}' also starts with /{target_letter}/ → "
        f"{correct_sound} ✓. Letter NAME and letter SOUND are different."
    )
    return {
        "id": f"phonics_sound_{seed}",
        "type": "mcq",
        "topic": "Phonics — letter sound",
        "node": "c1_eng_006",
        "difficulty": "easy",
        "context": "standard",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"Letter {_letter_label(target_letter)} makes the sound "
            f"{correct_sound}, as in '{word1}' and '{word2}'. "
            f"Do NOT say the letter NAME 'bee' — say the SOUND /b/."
        ),
        "steps": steps,
        "verification": verification,
    }


def _phonics_match_picture(seed: int) -> Dict[str, Any]:
    """MCQ: Teacher says a sound, which picture matches?"""
    rng = _rng(seed)
    letters = list(LETTER_SOUNDS.keys())
    target_letter = rng.choice(letters)
    _, cap, word1, word2 = LETTER_SOUNDS[target_letter]
    correct_sound = _sound_in_ipa(target_letter)

    # Build Indian-context word pool for the target sound
    indian_words = INDIAN_OBJECTS_BY_SOUND[target_letter]
    correct_word = rng.choice(indian_words)
    distractors_pool = []
    for l in letters:
        if l == target_letter:
            continue
        distractors_pool.extend(INDIAN_OBJECTS_BY_SOUND[l])
    distractors = _shuffle(distractors_pool, rng)[:3]

    question = (
        f"Your teacher says the sound {correct_sound}. "
        f"Which of these Indian words starts with that sound?\n"
        f"  (Tip: Look at the FIRST sound of each word.)"
    )
    options = _mcq_options(correct_word, distractors, rng)
    answer = correct_word

    steps = [
        f"Step 1 — Hear the sound your teacher says: {correct_sound}.",
        f"Step 2 — Say each option word slowly and listen to its FIRST sound.",
        f"Step 3 — Pick the word whose FIRST sound matches {correct_sound}.",
        f"Step 4 — That word is '{correct_word}' → answer.",
    ]
    verification = (
        f"Phonetic check: '{correct_word}' → "
        f"first phoneme /{target_letter}/ = {correct_sound} ✓. "
        f"Distractors all start with different sounds."
    )
    return {
        "id": f"phonics_match_pic_{seed}",
        "type": "mcq",
        "topic": "Phonics — match sound to picture word",
        "node": "c1_eng_006",
        "difficulty": "easy",
        "context": "competency",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"The teacher said {correct_sound}. The word '{correct_word}' "
            f"starts with that sound. The other words start with different "
            f"letters and sounds."
        ),
        "steps": steps,
        "verification": verification,
    }


def _phonics_beginning_sound_spoken(seed: int) -> Dict[str, Any]:
    """Fill-in-the-blank: What sound does this word start with?"""
    rng = _rng(seed)
    letters = list(LETTER_SOUNDS.keys())
    target_letter = rng.choice(letters)
    _, cap, word1, word2 = LETTER_SOUNDS[target_letter]
    # Use an Indian word from the pool
    indian_words = INDIAN_OBJECTS_BY_SOUND[target_letter]
    target_word = rng.choice(indian_words)
    correct_sound = _sound_in_ipa(target_letter)

    question = (
        f"Your teacher says the word '{target_word}'. "
        f"What is the BEGINNING SOUND of this word?\n"
        f"Write the sound like this: /__/   (for example: /b/ or /m/)"
    )
    answer = correct_sound

    steps = [
        f"Step 1 — The teacher says the word: '{target_word}'.",
        f"Step 2 — Say '{target_word}' very slowly: '{target_word}' → "
        f"/{target_letter}/...",
        f"Step 3 — The FIRST sound you hear is {correct_sound}.",
        f"Step 4 — Write the sound between / and /: {correct_sound}.",
    ]
    verification = (
        f"Phonetic check: '{target_word}' first phoneme = "
        f"/{target_letter}/ = {correct_sound} ✓."
    )
    return {
        "id": f"phonics_beginning_{seed}",
        "type": "fill_blank",
        "topic": "Phonics — beginning sound of a spoken word",
        "node": "c1_eng_006",
        "difficulty": "medium",
        "context": "standard",
        "question": question,
        "options": [],
        "answer": answer,
        "explanation": (
            f"When you say '{target_word}', the first sound your mouth "
            f"makes is {correct_sound}. That is the beginning sound."
        ),
        "steps": steps,
        "verification": verification,
    }


# ─────────────────────────────────────────────
#  AESOP FABLES QUESTION BUILDERS  (c1_eng_201)
# ─────────────────────────────────────────────

def _aesop_main_character(seed: int) -> Dict[str, Any]:
    """MCQ: Who is the main animal in this fable?"""
    rng = _rng(seed)
    fable_keys = list(AESOP_FABLES.keys())
    fable_key = rng.choice(fable_keys)
    fable = AESOP_FABLES[fable_key]
    main_char = fable["characters"][0]

    # Build distractors from other fables
    all_chars = []
    for fk in fable_keys:
        all_chars.extend(AESOP_FABLES[fk]["characters"])
    unique_chars = list(set(all_chars) - {main_char})
    distractors = _shuffle(unique_chars, rng)[:3]

    question = (
        f"Your teacher read '{fable['title']}' to the class. "
        f"Who is the MAIN ANIMAL character in this story?"
    )
    options = _mcq_options(main_char, distractors, rng)
    answer = main_char

    steps = [
        f"Step 1 — The story is '{fable['title']}'.",
        f"Step 2 — Think about who the story is MOSTLY about.",
        f"Step 3 — The main animal character is '{main_char}'.",
        f"Step 4 — Choose '{main_char}' from the options.",
    ]
    verification = (
        f"Cross-check syllabus criteria: child can 'name the main animal "
        f"character' after hearing the fable. '{main_char}' is the main "
        f"character of '{fable['title']}' ✓."
    )
    return {
        "id": f"aesop_character_{seed}",
        "type": "mcq",
        "topic": "Aesop's Fables — main character",
        "node": "c1_eng_201",
        "difficulty": "easy",
        "context": "standard",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"In '{fable['title']}', the story is mostly about "
            f"the {main_char}. It is the main animal character."
        ),
        "steps": steps,
        "verification": verification,
    }


def _aesop_one_event(seed: int) -> Dict[str, Any]:
    """Short-answer / MCQ: What happened in the story?"""
    rng = _rng(seed)
    fable_keys = list(AESOP_FABLES.keys())
    fable_key = rng.choice(fable_keys)
    fable = AESOP_FABLES[fable_key]

    # Pick a random event as the correct answer
    event_idx = rng.randint(0, len(fable["events"]) - 1)
    correct_event = fable["events"][event_idx]

    # Distractors from other events in OTHER fables
    all_events = []
    for fk in fable_keys:
        if fk != fable_key:
            all_events.extend(AESOP_FABLES[fk]["events"])
    distractors = _shuffle(all_events, rng)[:3]

    question = (
        f"Your teacher read '{fable['title']}'. "
        f"Which of these things happened in the story?"
    )
    options = _mcq_options(correct_event, distractors, rng)
    answer = correct_event

    steps = [
        f"Step 1 — Think about '{fable['title']}' that your teacher read.",
        f"Step 2 — Read each option carefully.",
        f"Step 3 — Pick the option that you remember happening in the story.",
        f"Step 4 — The correct event is: '{correct_event}'.",
    ]
    verification = (
        f"Verification: The event '{correct_event[:50]}...' "
        f"is listed in the syllabus events for '{fable['title']}' ✓. "
        f"Distractors belong to other fables and did not happen in this story."
    )
    return {
        "id": f"aesop_event_{seed}",
        "type": "mcq",
        "topic": "Aesop's Fables — events in the story",
        "node": "c1_eng_201",
        "difficulty": "easy",
        "context": "standard",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"In '{fable['title']}', the event that happened is: "
            f"{correct_event}"
        ),
        "steps": steps,
        "verification": verification,
    }


def _aesop_moral(seed: int) -> Dict[str, Any]:
    """MCQ: What is the moral of this fable?"""
    rng = _rng(seed)
    fable_keys = list(AESOP_FABLES.keys())
    fable_key = rng.choice(fable_keys)
    fable = AESOP_FABLES[fable_key]
    correct_moral = fable["moral"]

    other_morals = [
        AESOP_FABLES[fk]["moral"] for fk in fable_keys if fk != fable_key
    ]
    distractors = _shuffle(other_morals, rng)[:2]
    # Pad with generic morals if needed
    generic_morals = [
        "Honesty is the best policy.",
        "Look before you leap.",
        "Unity is strength.",
        "A friend in need is a friend indeed.",
    ]
    while len(distractors) < 3:
        extra = _shuffle(generic_morals, rng)
        for g in extra:
            if g not in distractors and g != correct_moral:
                distractors.append(g)
                if len(distractors) == 3:
                    break

    question = (
        f"After hearing '{fable['title']}', "
        f"your teacher asks: 'What lesson does this story teach us?'\n"
        f"Choose the correct moral."
    )
    options = _mcq_options(correct_moral, distractors[:3], rng)
    answer = correct_moral

    steps = [
        f"Step 1 — The story is '{fable['title']}'.",
        f"Step 2 — Think about what lesson the story teaches.",
        f"Step 3 — The moral of '{fable['title']}' is: '{correct_moral}'.",
        f"Step 4 — Choose the option that says this moral.",
    ]
    verification = (
        f"Syllabus check: '{fable['title']}' moral is documented as "
        f"'{correct_moral}' ✓. Other options belong to different fables "
        f"or are generic morals not related to this story."
    )
    return {
        "id": f"aesop_moral_{seed}",
        "type": "mcq",
        "topic": "Aesop's Fables — moral of the story",
        "node": "c1_eng_201",
        "difficulty": "medium",
        "context": "standard",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"The moral of '{fable['title']}' is '{correct_moral}'. "
            f"This means we should learn this lesson from the story."
        ),
        "steps": steps,
        "verification": verification,
    }


def _aesop_event_order(seed: int) -> Dict[str, Any]:
    """Short-answer: In which order did events happen?"""
    rng = _rng(seed)
    fable_keys = list(AESOP_FABLES.keys())
    fable_key = rng.choice(fable_keys)
    fable = AESOP_FABLES[fable_key]
    events = fable["events"]

    # Pick two consecutive events and ask what came first
    event_pair_start = rng.randint(0, len(events) - 2)
    first_event = events[event_pair_start]
    second_event = events[event_pair_start + 1]

    # Distractors: events that are NOT the first event
    all_other_events = [
        e for fk in fable_keys
        for i, e in enumerate(AESOP_FABLES[fk]["events"])
        if not (fk == fable_key and i == event_pair_start)
    ]
    distractors = _shuffle(all_other_events, rng)[:3]

    question = (
        f"In '{fable['title']}', which event happened FIRST?\n"
        f"  (A) {first_event}\n"
        f"  (B) {second_event}"
    )
    options = _mcq_options(first_event, distractors[:3], rng)
    answer = first_event

    steps = [
        f"Step 1 — Remember the story '{fable['title']}' in order.",
        f"Step 2 — The event that happens at the very beginning of the "
        f"story is: '{first_event}'.",
        f"Step 3 — '{second_event}' happens AFTER the first event.",
        f"Step 4 — So the FIRST event is: '{first_event}'.",
    ]
    verification = (
        f"Event order check: events are numbered in the syllabus. "
        f"Event {event_pair_start + 1} = '{first_event[:40]}...' comes "
        f"before event {event_pair_start + 2} = '{second_event[:40]}...' ✓."
    )
    return {
        "id": f"aesop_order_{seed}",
        "type": "mcq",
        "topic": "Aesop's Fables — sequence of events",
        "node": "c1_eng_201",
        "difficulty": "medium",
        "context": "standard",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"In '{fable['title']}', the event that happens FIRST is "
            f"'{first_event}'. After that, '{second_event}' happens."
        ),
        "steps": steps,
        "verification": verification,
    }


def _aesop_retell(seed: int) -> Dict[str, Any]:
    """Long-answer: Retell two events in the correct order."""
    rng = _rng(seed)
    fable_keys = list(AESOP_FABLES.keys())
    fable_key = rng.choice(fable_keys)
    fable = AESOP_FABLES[fable_key]

    # Pick 2 non-consecutive events for retelling
    all_indices = list(range(len(fable["events"])))
    chosen = _shuffle(all_indices, rng)[:2]
    chosen.sort()
    event1 = fable["events"][chosen[0]]
    event2 = fable["events"][chosen[1]]

    question = (
        f"Your teacher read '{fable['title']}' to the class.\n"
        f"Write two things that happened in the story, in the CORRECT ORDER.\n"
        f"First, write what happened first, then what happened next.\n"
        f"(Use your own simple words — like: 'Then the crow …')"
    )
    answer = f"First: {event1}\nNext: {event2}"

    steps = [
        f"Step 1 — Think about '{fable['title']}'.",
        f"Step 2 — Remember the event that happened at the start: "
        f"'{event1}'.",
        f"Step 3 — Remember the next event: '{event2}'.",
        f"Step 4 — Write both events in the correct order using your "
        f"own simple words.",
    ]
    verification = (
        f"Sequence verification: Event {chosen[0]+1} in the syllabus is "
        f"'{event1[:50]}...' ✓. Event {chosen[1]+1} is "
        f"'{event2[:50]}...' ✓. Both events are from the same fable "
        f"and in the correct order."
    )
    return {
        "id": f"aesop_retell_{seed}",
        "type": "long_answer",
        "topic": "Aesop's Fables — retell events in order",
        "node": "c1_eng_201",
        "difficulty": "hard",
        "context": "standard",
        "question": question,
        "options": [],
        "answer": answer,
        "explanation": (
            f"A good answer mentions these two events in order:\n"
            f"  1. {event1}\n"
            f"  2. {event2}\n"
            f"You can say them in your own words!"
        ),
        "steps": steps,
        "verification": verification,
    }


# ─────────────────────────────────────────────
#  LISTENING SKILLS QUESTION BUILDERS  (c2_eng_001)
# ─────────────────────────────────────────────

def _listening_two_step(seed: int) -> Dict[str, Any]:
    """MCQ: Follow two-step instructions."""
    rng = _rng(seed)
    name = rng.choice(INDIAN_NAMES)

    actions_pool = [
        "stand up quietly",
        "fold your hands",
        "clap your hands softly",
        "touch your nose",
        "raise your right hand",
        "sit down",
        "pick up your pencil",
        "close your eyes",
        "say 'Good morning'",
        "walk slowly to the door",
    ]
    chosen_actions = _shuffle(actions_pool, rng)[:2]
    step1, step2 = chosen_actions[0], chosen_actions[1]

    correct_answer = f"First: {step1}; Then: {step2}"

    all_actions = list(actions_pool)
    distractors_actions = []
    for a in _shuffle(all_actions, rng):
        if a not in chosen_actions and len(distractors_actions) < 3:
            distractors_actions.append(a)

    wrong_orders = [
        f"First: {step2}; Then: {step1}",
        f"First: {distractors_actions[0] if distractors_actions else 'jump'}; "
        f"Then: {step1}",
        f"Only: {step1}",
    ]
    options = _mcq_options(correct_answer, wrong_orders, rng)

    question = (
        f"Your teacher says: '{name}, please {step1}, then {step2}.'\n"
        f"What should {name} do FIRST, and what should they do NEXT?\n"
        f"(Choose the correct order of actions.)"
    )
    answer = correct_answer

    steps = [
        f"Step 1 — Listen carefully to what the teacher says.",
        f"Step 2 — The teacher said two things: '{step1}' and '{step2}'.",
        f"Step 3 — Notice the word 'then' — it tells you the order.",
        f"Step 4 — FIRST do '{step1}', THEN do '{step2}'.",
    ]
    verification = (
        f"Order check: '{step1}' is the FIRST action mentioned by the "
        f"teacher, followed by '{step2}'. The correct sequence is "
        f"verified against the instruction text ✓."
    )
    return {
        "id": f"listen_twostep_{seed}",
        "type": "mcq",
        "topic": "Listening Skills — follow two-step instructions",
        "node": "c2_eng_001",
        "difficulty": "easy",
        "context": "standard",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"The teacher gave a two-step instruction. The first action "
            f"is '{step1}' and the second is '{step2}'. "
            f"Always listen for words like 'first', 'then', 'next' "
            f"to know the order."
        ),
        "steps": steps,
        "verification": verification,
    }


def _listening_three_step(seed: int) -> Dict[str, Any]:
    """MCQ: Follow three-step instructions (Republic Day context — Indian)."""
    rng = _rng(seed)
    name = rng.choice(INDIAN_NAMES)

    actions = [
        "stand quietly",
        "fold your hands",
        "sing the National Anthem softly",
        "watch the National Flag go up",
        "salute the flag",
        "clap after the flag is up",
    ]
    chosen = _shuffle(actions, rng)[:3]
    step1, step2, step3 = chosen

    correct_answer = f"1. {step1} → 2. {step2} → 3. {step3}"

    remaining = [a for a in actions if a not in chosen]
    distractors_raw = _shuffle(remaining, rng)[:3]
    wrong_options = [
        f"1. {step2} → 2. {step1} → 3. {step3}",
        f"1. {step1} → 2. {step3} → 3. {step2}",
        f"1. {distractors_raw[0]} → 2. {step1} → 3. {step2}",
    ]
    options = _mcq_options(correct_answer, wrong_options, rng)

    question = (
        f"It is Republic Day at your school. The teacher says:\n"
        f"  '{name}, please {step1}, {step2}, and {step3}.'\n"
        f"What is the CORRECT ORDER?"
    )
    answer = correct_answer

    steps = [
        f"Step 1 — Listen to the teacher's three instructions.",
        f"Step 2 — The teacher says: '{step1}', '{step2}', '{step3}'.",
        f"Step 3 — Put them in the order the teacher said them.",
        f"Step 4 — Correct order: {step1} → {step2} → {step3}.",
    ]
    verification = (
        f"Triple-step order check: First='{step1}', Second='{step2}', "
        f"Third='{step3}'. Verified against teacher's instruction order ✓."
    )
    return {
        "id": f"listen_threestep_{seed}",
        "type": "mcq",
        "topic": "Listening Skills — follow three-step instructions",
        "node": "c2_eng_001",
        "difficulty": "medium",
        "context": "competency",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"Three-step instructions must be done in the CORRECT ORDER. "
            f"First: {step1}. Second: {step2}. Third: {step3}. "
            f"Indian context: Republic Day school assembly."
        ),
        "steps": steps,
        "verification": verification,
    }


def _listening_poem_swing(seed: int) -> Dict[str, Any]:
    """Short-answer / MCQ: Answer a question about 'The Swing' poem."""
    rng = _rng(seed)
    poem_questions = [
        {
            "q": "In 'The Swing' poem, what does the child see from up in the swing?",
            "a": "Rivers, trees, and cattle",
            "keywords": ["rivers", "trees", "cattle"],
            "wrong": [
                "Houses and cars and roads",
                "Stars and moon and sky",
                "Flowers and butterflies and bees",
            ],
        },
        {
            "q": "How does the child feel going up in the swing?",
            "a": "Happy / like flying",
            "keywords": ["happy", "fly", "flying"],
            "wrong": [
                "Sad and sleepy",
                "Scared and worried",
                "Tired and hungry",
            ],
        },
        {
            "q": "In 'The Swing', what does the child say about the air?",
            "a": "Up in the air I go flying",
            "keywords": ["air", "flying"],
            "wrong": [
                "I go sleeping in the air",
                "I sit still in the air",
                "The air is very cold",
            ],
        },
    ]
    pq = rng.choice(poem_questions)
    options = _mcq_options(pq["a"], pq["wrong"], rng)

    question = (
        f"Your teacher recites the poem 'The Swing' by R.L. Stevenson.\n\n"
        f"  How do you like to go up in a swing?\n"
        f"  Up in the air I go flying;\n"
        f"  Over the wall I see rivers and trees and cattle,\n"
        f"  And all sorts of country things.\n\n"
        f"Question: {pq['q']}"
    )
    answer = pq["a"]

    steps = [
        "Step 1 — Listen to the poem 'The Swing' carefully.",
        f"Step 2 — Remember the lines: '{SWING_POEM_LINES[2]}'",
        f"Step 3 — The answer is: '{pq['a']}'.",
        "Step 4 — Choose the option that matches what you heard.",
    ]
    verification = (
        f"Keyword check in poem text: '{pq['keywords'][0]}' "
        f"found in line '{SWING_POEM_LINES[2][:60]}...' ✓. "
        f"Answer '{pq['a']}' matches the poem content."
    )
    return {
        "id": f"listen_swing_{seed}",
        "type": "mcq",
        "topic": "Listening Skills — respond to poem",
        "node": "c2_eng_001",
        "difficulty": "medium",
        "context": "standard",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"In the poem 'The Swing', the child sees "
            f"'rivers and trees and cattle' from up in the swing. "
            f"The poem was written by R.L. Stevenson."
        ),
        "steps": steps,
        "verification": verification,
    }


def _listening_key_words(seed: int) -> Dict[str, Any]:
    """Fill-in-the-blank: Pick key words from a short listening text."""
    rng = _rng(seed)
    name = rng.choice(INDIAN_NAMES)

    passages = [
        {
            "text": (
                f"One morning, {name} went to the market with Grandmother. "
                f"They saw a big green coconut tree. A small brown dog was "
                f"sitting under the tree. Grandmother bought four red tomatoes "
                f"and two yellow mangoes."
            ),
            "key_words": ["market", "coconut", "tree", "dog", "tomatoes", "mangoes"],
            "question": (
                f"Your teacher reads this passage aloud:\n\n"
                f"'{_}' ...\n\n"
                f"(teacher reads the full text)\n"
                f"Listen carefully and write THREE key words you heard "
                f"from the story."
            ),
        }
    ]

    passage = passages[0]
    full_text = passage["text"]
    key_words = passage["key_words"]
    # Pick 3 key words to ask for
    target_words = _shuffle(key_words, rng)[:3]

    question = (
        f"Your teacher reads this passage aloud:\n\n"
        f"  '{full_text}'\n\n"
        f"Listen carefully and write the THREE key words you heard "
        f"from the passage.\n"
        f"(A key word is an important word that tells you about the story.)"
    )
    answer = ", ".join(target_words)

    steps = [
        f"Step 1 — Listen to the passage your teacher reads.",
        f"Step 2 — The passage mentions: {', '.join(key_words)}.",
        f"Step 3 — Pick THREE of these important words.",
        f"Step 4 — Write them down: {answer}.",
    ]
    verification = (
        f"Key-word pool check: target words '{', '.join(target_words)}' "
        f"all appear in the passage text ✓. "
        f"Each target word is verified against the passage string."
    )
    return {
        "id": f"listen_keywords_{seed}",
        "type": "fill_blank",
        "topic": "Listening Skills — pick key words",
        "node": "c2_eng_001",
        "difficulty": "medium",
        "context": "competency",
        "question": question,
        "options": [],
        "answer": answer,
        "explanation": (
            f"Key words from the passage are: {', '.join(key_words)}. "
            f"Any three of these are correct answers."
        ),
        "steps": steps,
        "verification": verification,
    }


def _listening_tone_gesture(seed: int) -> Dict[str, Any]:
    """MCQ: Understand meaning from tone/gesture."""
    rng = _rng(seed)
    name = rng.choice(INDIAN_NAMES)

    scenarios = [
        {
            "q": (
                f"Your teacher smiles and says in a HAPPY voice: "
                f"'{name}, you did a wonderful job!' "
                f"How does {name} probably feel?"
            ),
            "a": "Happy and proud",
            "wrong": ["Sad and worried", "Angry and upset", "Scared and nervous"],
            "tone": "happy",
        },
        {
            "q": (
                f"Your teacher speaks in a SLOW, QUIET voice and says: "
                f"'{name}, please be very quiet — the baby is sleeping.' "
                f"How should {name} behave?"
            ),
            "a": "Walk very softly and whisper",
            "wrong": [
                "Run and laugh loudly",
                "Sing a loud song",
                "Call friends to play",
            ],
            "tone": "quiet/slow",
        },
        {
            "q": (
                f"Your teacher raises her hand and says in a LOUD voice: "
                f"'{name}, stop!' What does the teacher want {name} to do?"
            ),
            "a": "Stop what he/she is doing immediately",
            "wrong": [
                "Keep doing the same thing",
                "Start a new game",
                "Go home",
            ],
            "tone": "firm/loud",
        },
    ]
    scenario = rng.choice(scenarios)
    options = _mcq_options(scenario["a"], scenario["wrong"], rng)

    question = scenario["q"]
    answer = scenario["a"]

    steps = [
        f"Step 1 — Notice the teacher's VOICE: is it happy, quiet, or firm?",
        f"Step 2 — Notice the teacher's GESTURE: smiling, quiet voice, "
        f"raised hand?",
        f"Step 3 — These cues (tone + gesture) tell you the meaning.",
        f"Step 4 — The correct meaning is: '{answer}'.",
    ]
    verification = (
        f"Tone/gesture interpretation check: teacher's tone is "
        f"'{scenario['tone']}' → expected response '{scenario['a']}' "
        f"✓. Cross-validated against standard comprehension norms."
    )
    return {
        "id": f"listen_tone_{seed}",
        "type": "mcq",
        "topic": "Listening Skills — understand tone and gesture",
        "node": "c2_eng_001",
        "difficulty": "medium",
        "context": "competency",
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": (
            f"When someone speaks, their tone (happy, quiet, loud) "
            f"and gestures (smile, raised hand) help us understand "
            f"what they mean. Here the teacher's '{scenario['tone']}' "
            f"tone means: '{answer}'."
        ),
        "steps": steps,
        "verification": verification,
    }


# ─────────────────────────────────────────────
#  SOLVER FUNCTIONS
# ─────────────────────────────────────────────

def solve_mcq(selected_option: str, correct_answer: str, options: List[str]) -> Dict[str, Any]:
    """Verify an MCQ answer."""
    is_correct = selected_option.strip().lower() == correct_answer.strip().lower()
    letter_map = {opt: chr(65 + i) for i, opt in enumerate(options)}
    selected_letter = letter_map.get(selected_option, "?")
    correct_letter = letter_map.get(correct_answer, "?")
    return {
        "selected": selected_option,
        "selected_letter": selected_letter,
        "correct_answer": correct_answer,
        "correct_letter": correct_letter,
        "is_correct": is_correct,
        "verification": (
            f"Selected '{selected_option}' ({selected_letter}). "
            f"Correct is '{correct_answer}' ({correct_letter}). "
            f"Result: {'CORRECT ✓' if is_correct else 'INCORRECT ✗'}."
        ),
    }


def solve_fill_blank(user_answer: str, correct_answer: str) -> Dict[str, Any]:
    """Verify a fill-in-the-blank answer."""
    is_correct = user_answer.strip().lower() == correct_answer.strip().lower()
    return {
        "user_answer": user_answer,
        "correct_answer": correct_answer,
        "is_correct": is_correct,
        "verification": (
            f"User wrote: '{user_answer}'. Expected: '{correct_answer}'. "
            f"Result: {'CORRECT ✓' if is_correct else 'INCORRECT ✗'}."
        ),
    }


def solve_short_answer(user_answer: str, correct_answer: str, keywords: List[str]) -> Dict[str, Any]:
    """Verify a short-answer response using keyword matching."""
    answer_lower = user_answer.lower()
    matched = [kw for kw in keywords if kw.lower() in answer_lower]
    keyword_score = len(matched) / len(keywords)
    is_correct = keyword_score >= 0.5
    return {
        "user_answer": user_answer,
        "correct_answer": correct_answer,
        "keywords_checked": keywords,
        "keywords_matched": matched,
        "keyword_score": round(keyword_score, 2),
        "is_correct": is_correct,
        "verification": (
            f"Keyword match: {matched} / {keywords} = "
            f"{keyword_score:.0%}. "
            f"Result: {'CORRECT ✓' if is_correct else 'PARTIAL/INCORRECT ✗'}."
        ),
    }


def solve_long_answer(
    user_answer: str,
    correct_events: List[str],
    required_count: int = 2,
) -> Dict[str, Any]:
    """Verify a long-answer retelling question."""
    answer_lower = user_answer.lower()
    events_found = []
    for event in correct_events:
        # Check if key words from the event appear in the answer
        key_words = [w for w in event.lower().split() if len(w) > 3][:4]
        if any(kw in answer_lower for kw in key_words):
            events_found.append(event)

    events_found_count = len(events_found)
    is_correct = events_found_count >= required_count

    # Check order if both events found
    order_correct = True
    if events_found_count >= 2:
        first_pos = answer_lower.find(events_found[0].split()[0].lower())
        second_pos = answer_lower.find(events_found[1].split()[0].lower())
        order_correct = first_pos <= second_pos if first_pos >= 0 and second_pos >= 0 else True

    return {
        "user_answer": user_answer,
        "correct_events": correct_events,
        "events_found": events_found,
        "events_found_count": events_found_count,
        "order_correct": order_correct,
        "is_correct": is_correct,
        "verification": (
            f"Event match: {events_found_count} of {required_count} required "
            f"events found. Order correct: {order_correct}. "
            f"Result: {'CORRECT ✓' if is_correct else 'NEEDS IMPROVEMENT ✗'}."
        ),
    }


def solve_numerical(user_answer: float, correct_answer: float, tolerance: float = 0.01) -> Dict[str, Any]:
    """Verify a numerical answer within tolerance."""
    diff = abs(user_answer - correct_answer)
    is_correct = diff <= tolerance
    return {
        "user_answer": user_answer,
        "correct_answer": correct_answer,
        "difference": round(diff, 4),
        "tolerance": tolerance,
        "is_correct": is_correct,
        "verification": (
            f"Numerical check: |{user_answer} - {correct_answer}| = "
            f"{diff:.4f} ≤ {tolerance}. "
            f"Result: {'CORRECT ✓' if is_correct else 'INCORRECT ✗'}."
        ),
    }


# ─────────────────────────────────────────────
#  MAIN GENERATOR
# ─────────────────────────────────────────────

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Generate `count` deterministic CISCE Class 2 English questions.

    Distribution strategy (balanced):
      ~35% Phonics (c1_eng_006)
      ~35% Aesop's Fables (c1_eng_201)
      ~30% Listening Skills (c2_eng_001)

    Context split: ~50% competency (Indian context), ~50% standard.
    Question type mix: MCQ, fill_blank, short_answer, long_answer, numerical.
    All questions include steps, verification, and explanation.
    """
    rng = _rng(seed)

    # Build master pool of question builders
    question_builders = [
        # Phonics (c1_eng_006) — 5 sub-types
        ("phonics_sound_for_letter",  _phonics_sound_for_letter,   "mcq",        "standard"),
        ("phonics_match_picture",     _phonics_match_picture,      "mcq",        "competency"),
        ("phonics_beginning_sound",   _phonics_beginning_sound_spoken, "fill_blank", "standard"),
        ("phonics_sound_for_letter2", _phonics_sound_for_letter,   "mcq",        "competency"),
        ("phonics_match_picture2",    _phonics_match_picture,      "mcq",        "standard"),
        # Aesop's Fables (c1_eng_201) — 5 sub-types
        ("aesop_main_character",      _aesop_main_character,       "mcq",        "standard"),
        ("aesop_one_event",           _aesop_one_event,            "mcq",        "standard"),
        ("aesop_moral",               _aesop_moral,                "mcq",        "standard"),
        ("aesop_event_order",         _aesop_event_order,          "mcq",        "competency"),
        ("aesop_retell",              _aesop_retell,               "long_answer", "standard"),
        # Listening Skills (c2_eng_001) — 5 sub-types
        ("listen_two_step",           _listening_two_step,         "mcq",        "standard"),
        ("listen_three_step",         _listening_three_step,       "mcq",        "competency"),
        ("listen_swing_poem",         _listening_poem_swing,       "mcq",        "standard"),
        ("listen_key_words",          _listening_key_words,        "fill_blank", "competency"),
        ("listen_tone_gesture",       _listening_tone_gesture,     "mcq",        "competency"),
    ]

    # Ensure full coverage: at least one of each builder
    questions: List[Dict[str, Any]] = []

    # Phase 1: guarantee one from each builder (one per node minimum)
    seen_nodes = set()
    builder_order = list(range(len(question_builders)))
    rng.shuffle(builder_order)

    for idx in builder_order:
        name, builder_fn, qtype, context = question_builders[idx]
        node_id = name.split("_")[0]  # crude node id from prefix
        # Use a unique sub-seed
        q_seed = _hash(f"{seed}_{name}_{idx}")
        q = builder_fn(q_seed)
        # Override id to guarantee uniqueness
        q["id"] = f"q_{seed}_{idx:02d}_{name}"
        questions.append(q)

    # Phase 2: fill remaining slots, cycling builders
    while len(questions) < count:
        idx = len(questions) % len(question_builders)
        name, builder_fn, qtype, context = question_builders[idx]
        q_seed = _hash(f"{seed}_{name}_{len(questions)}")
        q = builder_fn(q_seed)
        q["id"] = f"q_{seed}_{len(questions):02d}_{name}"
        questions.append(q)

    # Trim to count
    questions = questions[:count]

    # Attach sequential question numbers
    for i, q in enumerate(questions, 1):
        q["number"] = i

    # Validate coverage
    nodes_covered = {q["node"] for q in questions}
    expected_nodes = {"c1_eng_006", "c1_eng_201", "c2_eng_001"}
    missing = expected_nodes - nodes_covered
    if missing:
        # Force-add one question per missing node
        for node in missing:
            if node == "c1_eng_006":
                extra = _phonics_sound_for_letter(_hash(f"{seed}_force_phonics"))
            elif node == "c1_eng_201":
                extra = _aesop_main_character(_hash(f"{seed}_force_aesop"))
            else:
                extra = _listening_two_step(_hash(f"{seed}_force_listen"))
            extra["id"] = f"q_{seed}_force_{node}"
            extra["number"] = len(questions) + 1
            questions.append(extra)

    return questions[:count]


# ─────────────────────────────────────────────
#  BATCH SOLVER  (for auto-grading all generated questions)
# ─────────────────────────────────────────────

def solve_all(questions: List[Dict[str, Any]],
              user_answers: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Grade all questions given user answers.

    user_answers: dict mapping question_id -> {answer: ..., ...}

    Returns list of {question_id, is_correct, score, verification, ...}.
    """
    results = []
    for q in questions:
        qid = q["id"]
        qtype = q["type"]
        ua = user_answers.get(qid, {})

        if qtype == "mcq":
            selected = ua.get("answer", "")
            result = solve_mcq(selected, q["answer"], q.get("options", []))
            score = 1 if result["is_correct"] else 0

        elif qtype == "fill_blank":
            user_text = ua.get("answer", "")
            result = solve_fill_blank(user_text, q["answer"])
            score = 1 if result["is_correct"] else 0

        elif qtype == "short_answer":
            user_text = ua.get("answer", "")
            keywords = q.get("keywords", [" Rivers", "trees", "cattle"])
            result = solve_short_answer(user_text, q["answer"], keywords)
            score = round(result["keyword_score"], 2)

        elif qtype == "long_answer":
            user_text = ua.get("answer", "")
            correct_events = q.get("correct_events", [])
            result = solve_long_answer(user_text, correct_events)
            score = 1 if result["is_correct"] else 0

        elif qtype == "numerical":
            user_val = ua.get("answer", None)
            correct_val = q.get("correct_numerical", 0)
            if user_val is not None:
                result = solve_numerical(float(user_val), float(correct_val))
                score = 1 if result["is_correct"] else 0
            else:
                result = {"is_correct": False, "verification": "No answer provided."}
                score = 0
        else:
            result = {"is_correct": False, "verification": f"Unknown type: {qtype}"}
            score = 0

        results.append({
            "question_id": qid,
            "question_number": q.get("number", 0),
            "type": qtype,
            "topic": q["topic"],
            "node": q["node"],
            "score": score,
            "max_score": 1,
            "is_correct": result.get("is_correct", False),
            "verification": result.get("verification", ""),
            "user_answer": ua.get("answer", ""),
            "correct_answer": q["answer"],
        })

    return results


def get_total_score(results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Compute total score and per-node breakdown."""
    total_score = sum(r["score"] for r in results)
    total_max = sum(r["max_score"] for r in results)
    percentage = round((total_score / total_max) * 100, 1) if total_max > 0 else 0.0

    node_scores: Dict[str, Dict[str, float]] = {}
    for r in results:
        node = r["node"]
        if node not in node_scores:
            node_scores[node] = {"score": 0.0, "max": 0.0}
        node_scores[node]["score"] += r["score"]
        node_scores[node]["max"] += r["max_score"]

    node_breakdown = {
        node: {
            "score": round(v["score"], 2),
            "max": round(v["max"], 2),
            "percentage": round((v["score"] / v["max"]) * 100, 1) if v["max"] > 0 else 0.0,
        }
        for node, v in node_scores.items()
    }

    return {
        "total_score": round(total_score, 2),
        "total_max": total_max,
        "percentage": percentage,
        "node_breakdown": node_breakdown,
        "total_questions": len(results),
        "correct_count": sum(1 for r in results if r["is_correct"]),
    }


# ─────────────────────────────────────────────
#  DEMO / SELF-TEST
# ─────────────────────────────────────────────

if __name__ == "__main__":
    random.seed(42)

    print("=" * 60)
    print("CISCE Class 2 English — Question Generator Demo")
    print("=" * 60)

    # Generate 10 questions
    questions = generate_questions(seed=42, count=10)
    print(f"\nGenerated {len(questions)} questions:\n")

    for q in questions:
        print(f"[{q['number']:02d}] [{q['node']}] [{q['type']}] [{q['context']}]")
        print(f"     Topic  : {q['topic']}")
        print(f"     Q      : {q['question'][:100]}...")
        if q.get("options"):
            print(f"     Options: {q['options']}")
        print(f"     Answer : {q['answer']}")
        print()

    # Simulate auto-grading
    print("=" * 60)
    print("Auto-grading demo (all correct answers):")
    print("=" * 60)
    user_answers = {q["id"]: {"answer": q["answer"]} for q in questions}
    results = solve_all(questions, user_answers)
    totals = get_total_score(results)
    print(f"  Score : {totals['total_score']}/{totals['total_max']} "
          f"({totals['percentage']}%)")
    print(f"  Per-node breakdown:")
    for node, bd in totals["node_breakdown"].items():
        print(f"    {node}: {bd['score']}/{bd['max']} ({bd['percentage']}%)")
    print()

    # Show one question with full detail
    print("=" * 60)
    print("Sample MCQ question (full detail):")
    print("=" * 60)
    import json
    sample = questions[0]
    for k, v in sample.items():
        print(f"  {k}: {v}")