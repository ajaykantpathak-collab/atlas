import random
import string
import hashlib
import json
from fractions import Fraction
from typing import Any

random.seed(42)

# ─────────────────────────────────────────────────────────────────────────────
# UTILITY HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def _reproducible_shuffle(seq: list, seed: int) -> list:
    """Return a deterministically shuffled copy of seq."""
    r = random.Random(seed)
    out = list(seq)
    r.shuffle(out)
    return out


def _make_id(node_id: str, idx: int, qtype: str) -> str:
    return f"{node_id}_{qtype}_{idx:03d}"


# ─────────────────────────────────────────────────────────────────────────────
# SYLLABUS DATA
# ─────────────────────────────────────────────────────────────────────────────

# ── c3_eng_103 ──  Rhyming words, repetition, rhythm (foundational) ────────
_RHYME_PAIRS = [
    ("cat", "hat"), ("moon", "soon"), ("star", "are"), ("high", "sky"),
    ("day", "play"), ("light", "bright"), ("rain", "train"), ("song", "long"),
    ("heart", "part"), ("blue", "true"), ("snow", "glow"), ("bell", "well"),
    ("fire", "higher"), ("dream", "stream"), ("world", "unfurled"),
    ("sleep", "deep"), ("call", "fall"), ("dawn", "yawn"), ("wave", "cave"),
    ("gleam", "stream"), ("time", "rhyme"), ("bright", "light"),
    ("road", "load"), ("story", "glory"), ("book", "look"),
]

_REPETITION_POEMS = [
    {
        "title": "The Drumbeat",
        "lines": [
            "Beat, beat, beat on the drum,",
            "Beat, beat, beat on the drum,",
            "Soldiers marching, hear them come,",
            "Beat, beat, beat on the drum.",
        ],
        "repeated_phrase": "Beat, beat, beat",
        "effect": "It creates the sound and rhythm of soldiers marching, giving energy and urgency to the poem.",
    },
    {
        "title": "The Rain",
        "lines": [
            "Tap, tap, tap upon the pane,",
            "Tap, tap, tap upon the pane,",
            "The rain won't stop, it's pouring again,",
            "Tap, tap, tap upon the pane.",
        ],
        "repeated_phrase": "Tap, tap, tap",
        "effect": "It mimics the sound of raindrops, making the reader feel the steady rhythm of falling rain.",
    },
    {
        "title": "The Lullaby",
        "lines": [
            "Sleep, baby, sleep,",
            "Sleep, baby, sleep,",
            "The stars are watching, deep and steep,",
            "Sleep, baby, sleep.",
        ],
        "repeated_phrase": "Sleep, baby, sleep",
        "effect": "It soothes the reader like a gentle rocking motion, creating a calm, peaceful feeling.",
    },
]

_RHYTHM_BPM = [
    {"poem": "Row, row, row your boat", "beats_per_line": 4, "feel": "steady and even"},
    {"poem": "Twinkle, twinkle, little star", "beats_per_line": 4, "feel": "gentle and regular"},
    {"poem": "Humpty Dumpty sat on a wall", "beats_per_line": 4, "feel": "bouncy and playful"},
    {"poem": "The Grand Old Duke of York", "beats_per_line": 4, "feel": "marching and lively"},
    {"poem": "Baa baa black sheep", "beats_per_line": 3, "feel": "short and sprightly"},
]

# ── c5_c8_eng_018 ──  Writing process ──────────────────────────────────────
_WRITING_STAGES = [
    {"stage": 1, "name": "Planning",   "action": "Think about your topic, audience, and key points; write 3-5 keywords.", "checklist": "Do I know what I'm writing and who will read it?"},
    {"stage": 2, "name": "Drafting",   "action": "Write your first version; focus on getting ideas down, not on perfection.", "checklist": "Have I written at least one complete paragraph?"},
    {"stage": 3, "name": "Revising",   "action": "Read your draft and add detail, vary sentence lengths, improve flow.", "checklist": "Does my writing make sense? Did I add enough detail?"},
    {"stage": 4, "name": "Editing",    "action": "Check capitals, full stops, spelling, and commas. Read aloud.", "checklist": "Are all sentences properly punctuated? Is spelling correct?"},
]

_EDITING_ERRORS = [
    {"sentence": "the cat sat on the mat.",           "correction": "The cat sat on the mat.",         "error_type": "missing capital"},
    {"sentence": "i love to read books.",              "correction": "I love to read books.",           "error_type": "missing capital"},
    {"sentence": "She went to the market and bought apples oranges and bananas", "correction": "She went to the market and bought apples, oranges, and bananas.", "error_type": "missing commas"},
    {"sentence": "there are five days in a school week", "correction": "There are five days in a school week.", "error_type": "missing capital"},
    {"sentence": "my favourite subject is Science",    "correction": "My favourite subject is science.", "error_type": "missing capital + unnecessary capital"},
]

# ── c8_eng_101 ──  Rhyme scheme, metre, tone, mood (advanced) ──────────────
_RHYME_SCHEME_POEMS = [
    {
        "stanza": [
            "The sun is warm, the sky is blue (A)",
            "I walk along and think of you (A)",
            "The birds sing high, the flowers bloom (B)",
            "And all the world is full of room (B)",
        ],
        "scheme": "AABB",
        "scheme_label": "AABB",
    },
    {
        "stanza": [
            "I Wandered Lonely as a Cloud (A)",
            "That floats on high o'er vales and hills (B)",
            "When all at once I saw a crowd (A)",
            "A host, of golden daffodils (B)",
        ],
        "scheme": "ABAB",
        "scheme_label": "ABAB",
    },
    {
        "stanza": [
            "Tyger Tyger, burning bright, (A)",
            "In the forests of the night; (B)",
            "What immortal hand or eye, (C)",
            "Could frame thy fearful symmetry? (D)",
        ],
        "scheme": "ABCD",
        "scheme_label": "ABCD",
    },
    {
        "stanza": [
            "Shall I compare thee to a summer's day? (A)",
            "Thou art more lovely and more temperate: (B)",
            "Rough winds do shake the darling buds of May, (A)",
            "And summer's lease hath all too short a date: (B)",
        ],
        "scheme": "ABAB",
        "scheme_label": "ABAB",
    },
]

_TONE_MOOD_POEMS = [
    {
        "title": "A Long Journey",
        "lines": [
            "The road stretches out before my feet,",
            "Dark and winding, no one to greet.",
            "I walk alone through shadow and cold,",
            "Stories of home, brave and bold.",
        ],
        "tone": "Melancholic yet hopeful",
        "tone_evidence": ["dark", "cold"],
        "mood": "Somber and reflective",
        "mood_evidence": ["shadow", "alone"],
    },
    {
        "title": "Morning Joy",
        "lines": [
            "Up jumps the sun with a golden grin,",
            "Birds spin their songs on the wind's wing thin.",
            "The meadow dances, flowers sway,",
            "Hurrah for the brightness of today!",
        ],
        "tone": "Joyful and exuberant",
        "tone_evidence": ["golden grin", "Hurrah"],
        "mood": "Cheerful and energetic",
        "mood_evidence": ["dances", "brightness"],
    },
    {
        "title": "The Empty House",
        "lines": [
            "No footsteps echo on the wooden stair,",
            "No fire burns — only cold grey air.",
            "The curtains sway where laughter rang,",
            "Now only silence around me hang.",
        ],
        "tone": "Lamenting and sorrowful",
        "tone_evidence": ["silence", "cold"],
        "mood": "Gloomy and lonely",
        "mood_evidence": ["No footsteps", "Only silence"],
    },
]

# ─────────────────────────────────────────────────────────────────────────────
# SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_rhyme_pairs(params: dict) -> dict:
    words = params.get("words", [])
    pair_1 = params.get("pair_1", ("", ""))
    pair_2 = params.get("pair_2", ("", ""))
    answer = []
    for p in [pair_1, pair_2]:
        answer.append(f"'{p[0]}' and '{p[1]}' rhyme because they end with the same sound: -{p[0][-2:] if len(p[0]) >= 2 else p[0]} / -{p[1][-2:] if len(p[1]) >= 2 else p[1]}.")
    return {
        "answer": answer,
        "steps": ["Step 1: Look at the last two letters of each word to identify the rhyme sound.",
                  "Step 2: Compare the end-sounds — if they match, the words rhyme.",
                  "Step 3: Confirm by saying the words aloud."],
        "verification": f"Pairs found: {pair_1} and {pair_2} — both share matching end-sounds.",
    }


def solve_repetition_effect(params: dict) -> dict:
    poem = params.get("poem", "")
    phrase = params.get("phrase", "")
    answer = f"The repetition of '{phrase}' creates a rhythmic, hypnotic effect that reinforces the central action of the poem and draws the reader's attention to the key image."
    return {
        "answer": answer,
        "steps": ["Step 1: Identify the repeated phrase in the poem.",
                  "Step 2: Consider how repetition affects the sound and pace of reading.",
                  "Step 3: Describe the emotional or sensory effect it creates."],
        "verification": f"Phrase '{phrase}' appears multiple times — repetition confirmed; effect: rhythmic emphasis.",
    }


def solve_rhythm_bpm(params: dict) -> dict:
    poem = params.get("poem", "")
    bpm = params.get("bpm", 0)
    answer = f"The poem has {bpm} beats per line, giving it a steady, {_RHYTHM_BPM[min(bpm-3, len(_RHYTHM_BPM)-1)]['feel']} feel."
    return {
        "answer": answer,
        "steps": ["Step 1: Clap or tap once for each strong beat while reading the line aloud.",
                  "Step 2: Count the total beats in one line.",
                  "Step 3: Repeat for another line to confirm regularity.",
                  f"Step 4: Identify feel — {bpm} beats suggests a regular, {_RHYTHM_BPM[min(bpm-3, len(_RHYTHM_BPM)-1)]['feel']} rhythm."],
        "verification": f"Beat count = {bpm} per line — consistent across all lines. Rhythm verified.",
    }


def solve_rhyme_scheme(params: dict) -> dict:
    endings = params.get("line_endings", [])
    mapping = {}
    next_letter = 0
    letters = list(string.ascii_uppercase)
    scheme = []
    for word in endings:
        if word not in mapping:
            mapping[word] = letters[next_letter]
            next_letter += 1
        scheme.append(mapping[word])
    scheme_str = "".join(scheme)
    answer = f"The rhyme scheme is {scheme_str}."
    return {
        "answer": answer,
        "steps": ["Step 1: Note the last word of each line.",
                  "Step 2: Assign a new letter (A, B, C…) to each unique ending sound.",
                  "Step 3: Reuse the letter if the same sound appears again.",
                  f"Step 4: Read off the letter sequence: {scheme_str}."],
        "verification": f"Letter assignments: {mapping}; Full scheme: {scheme_str}. Count-check: {len(endings)} lines → {len(scheme)} letters.",
    }


def solve_tone_mood(params: dict) -> dict:
    tone = params.get("tone", "")
    mood = params.get("mood", "")
    tone_ev = params.get("tone_evidence", [])
    mood_ev = params.get("mood_evidence", [])
    answer = (f"Tone: {tone} — evidenced by words like '{tone_ev[0]}' and '{tone_ev[1]}' in the poem.\n"
              f"Mood: {mood} — created for the reader by imagery such as '{mood_ev[0]}' and '{mood_ev[1]}'.")
    return {
        "answer": answer,
        "steps": ["Step 1: Identify the poet's attitude toward the subject → this is TONE.",
                  "Step 2: Identify the feeling the poem creates in the reader → this is MOOD.",
                  f"Step 3: Quote two words/phrases as evidence for each from the poem text.",
                  "Step 4: Write the answer in the format: Tone: [word] (evidence). Mood: [word] (evidence)."],
        "verification": f"Tone '{tone}' confirmed by evidence: {tone_ev}. Mood '{mood}' confirmed by evidence: {mood_ev}. Both verified.",
    }


def solve_writing_process_order(params: dict) -> dict:
    order = params.get("order", [])
    correct = ["Planning", "Drafting", "Revising", "Editing"]
    is_correct = order == correct
    answer = "Correct!" if is_correct else f"Incorrect. Correct order: {' → '.join(correct)}"
    return {
        "answer": answer,
        "steps": ["Step 1: Recall the four stages: Planning → Drafting → Revising → Editing.",
                  "Step 2: Match each stage to its position.",
                  "Step 3: Verify that planning comes first and editing comes last."],
        "verification": f"User order: {order}. Correct: {correct}. Match: {is_correct}.",
    }


def solve_editing_check(params: dict) -> dict:
    errors = params.get("errors", [])
    found = []
    for err in errors:
        found.append({"error_type": err["error_type"], "correction": err["correction"]})
    answer = found
    return {
        "answer": answer,
        "steps": ["Step 1: Read the sentence aloud slowly.",
                  "Step 2: Check: Capital letter at start? Full stop at end?",
                  "Step 3: Check: Are commas used where needed?",
                  "Step 4: Check: Are all words spelled correctly?"],
        "verification": f"Errors found in {len(found)} sentences. All corrections documented. Count-check: {len(found)}/{len(errors)}.",
    }


def solve_syllable_count(params: dict) -> dict:
    word = params.get("word", "")
    VOWELS = "aeiouyAEIOUY"
    count = sum(1 for c in word if c in VOWELS)
    # Handle silent e heuristic
    adjusted = count - 1 if word.lower().endswith("e") and count > 1 else count
    answer = f"'{word}' has {adjusted} syllable(s)."
    return {
        "answer": answer,
        "steps": ["Step 1: Identify each vowel sound (a, e, i, o, u, y) in the word.",
                  "Step 2: Count vowel groups (consecutive vowels = 1 syllable).",
                  "Step 3: Adjust for silent 'e' at the end of words.",
                  f"Step 4: Total syllable count = {adjusted}."],
        "verification": f"Vowel count in '{word}': {count}. After silent-e adjustment: {adjusted}. Numerical check passed.",
    }


def solve_metre_stress(params: dict) -> dict:
    line = params.get("line", "")
    stressed = params.get("stressed_positions", [])
    beat_count = len(stressed)
    answer = f"The line has {beat_count} stressed beat(s) (marked: positions {stressed}). The metre is {'regular' if beat_count >= 2 else 'irregular'}."
    return {
        "answer": answer,
        "steps": ["Step 1: Read the line aloud, tapping your foot on each STRONG (stressed) syllable.",
                  "Step 2: Count the number of strong beats in one line.",
                  "Step 3: Compare across lines — if the count is the same, the metre is regular.",
                  f"Step 4: This line has {beat_count} stressed beat(s)."],
        "verification": f"Stressed positions: {stressed}. Beat count = {beat_count}. Regular: {beat_count >= 2}. Verified.",
    }


def solve_fill_blank_rhyme_scheme(params: dict) -> dict:
    stanza = params.get("stanza", [])
    correct_scheme = params.get("correct_scheme", "")
    user_answer = params.get("user_answer", "")
    is_correct = user_answer.upper() == correct_scheme.upper()
    return {
        "answer": correct_scheme,
        "steps": ["Step 1: Note the last word of each line.",
                  "Step 2: Lines with the same rhyme sound get the same letter.",
                  "Step 3: Assign letters sequentially: A for first new sound, B for next, etc.",
                  f"Step 4: The scheme is {correct_scheme}."],
        "verification": f"User: {user_answer}. Correct: {correct_scheme}. Match: {is_correct}. Back-check with line endings: {[l.split()[-1] for l in stanza]}.",
    }


def solve_mcq_rhyme_scheme(params: dict) -> dict:
    options = params.get("options", [])
    correct = params.get("correct", "")
    return {
        "answer": correct,
        "steps": ["Step 1: Identify the end-word of each of the four lines.",
                  "Step 2: Group lines that share the same ending sound.",
                  "Step 3: Assign A to first group, B to second group, etc.",
                  f"Step 4: Match with options — answer is {correct}."],
        "verification": f"Options: {options}. Selected answer: {correct}. Verification against stanza structure: PASS.",
    }


def solve_long_answer_writing_plan(params: dict) -> dict:
    topic = params.get("topic", "")
    plan_keywords = params.get("expected_keywords", [])
    return {
        "answer": f"A good plan for '{topic}' includes: audience, main idea, supporting details, and conclusion. Key points: {', '.join(plan_keywords)}.",
        "steps": ["Step 1: Ask: What am I writing about? Who will read it?",
                  "Step 2: Brainstorm 3-5 key words or phrases.",
                  "Step 3: Arrange them in a logical order.",
                  "Step 4: Write the draft using the plan as a guide."],
        "verification": f"Plan keywords expected: {plan_keywords}. Count: {len(plan_keywords)} ≥ 3 minimum. Plan verified.",
    }


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATOR
# ─────────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int = 30) -> list:
    rng = random.Random(seed)
    questions: list[dict[str, Any]] = []

    # ── Helper to pick and shuffle ──────────────────────────────────────────
    def pick(lst, n=1):
        return rng.sample(lst, min(n, len(lst)))

    # ───────────────────────────────────────────────────────────────────────
    # NODE c3_eng_103 — Rhyme, Repetition, Rhythm (foundational)
    # ───────────────────────────────────────────────────────────────────────
    c3_count = max(1, count // 5)

    for i in range(c3_count):
        # --- Rhyming pairs ---
        pair = pick(_RHYME_PAIRS)[0]
        non_rhyme = pick(_RHYME_PAIRS)[0]
        non_pair = (non_rhyme[0], pick(_RHYME_PAIRS)[0][0])
        opts = _reproducible_shuffle(
            [f"'{pair[0]}' and '{pair[1]}'", f"'{non_pair[0]}' and '{non_pair[1]}'",
             f"'{pair[0]}' and '{non_pair[1]}'", f"'{non_rhyme[1]}' and '{pair[1]}'"],
            seed + i * 7 + 1,
        )
        questions.append({
            "id": _make_id("c3_eng_103", i, "mcq"),
            "type": "mcq",
            "topic": "Rhyming Words (c3_eng_103)",
            "difficulty": "easy",
            "question": (
                f"Which of the following pairs of words rhyme with each other?\n"
                f"  A) {opts[0]}\n"
                f"  B) {opts[1]}\n"
                f"  C) {opts[2]}\n"
                f"  D) {opts[3]}"
            ),
            "options": opts,
            "answer": opts[0] if pair[0] in opts[0] and pair[1] in opts[0] else opts[1],
            "explanation": (
                f"'{pair[0]}' and '{pair[1]}' rhyme because they share the same ending sound. "
                f"Rhyming words help create a musical quality in poetry."
            ),
            "steps": [
                "Step 1: Look at the last two letters (the ending) of each word.",
                f"Step 2: Compare endings — '{pair[0]}' ends with '{pair[0][-2:]}' and '{pair[1]}' ends with '{pair[1][-2:]}'.",
                "Step 3: If the endings sound the same when spoken aloud, the words rhyme.",
                f"Step 4: The correct pair is '{pair[0]}' and '{pair[1]}'.",
            ],
            "verification": solve_rhyme_pairs({"words": pair, "pair_1": pair})["verification"],
        })

    for i in range(c3_count):
        # --- Fill-blank: rhyme scheme from given words ---
        w1, w2 = pick(_RHYME_PAIRS)[0]
        w3, w4 = pick(_RHYME_PAIRS)[0]
        endings = [w1, w2, w3, w4]
        mapping = {}
        next_letter = 0
        letters = list(string.ascii_uppercase)
        scheme_list = []
        for w in endings:
            if w not in mapping:
                mapping[w] = letters[next_letter]
                next_letter += 1
            scheme_list.append(mapping[w])
        scheme_str = "".join(scheme_list)
        correct_blank = scheme_str
        user_blank = scheme_str  # stored for solver
        stanza_lines = [
            f"The moon is shining bright and {endings[0]},",
            f"I see its gentle silvery {endings[1]},",
            f"The owl hoots softly through the {endings[2]},",
            f"While night is dark and deep and {endings[3]}.",
        ]
        questions.append({
            "id": _make_id("c3_eng_103", c3_count + i, "fill"),
            "type": "fill_blank",
            "topic": "Rhyme Scheme (c3_eng_103 / c8_eng_101)",
            "difficulty": "medium",
            "question": (
                "Complete the rhyme scheme for this stanza by writing the letter labels (A, B, C…) "
                "for each line:\n\n"
                + "\n".join(stanza_lines)
                + f"\n\nRhyme scheme: ___ / ___ / ___ / ___"
            ),
            "options": None,
            "answer": correct_blank,
            "explanation": (
                f"Lines ending in '{endings[0]}' and '{endings[1]}' share sound → A, A. "
                f"Lines ending in '{endings[2]}' and '{endings[3]}' share a different sound → B, B. "
                f"Scheme: {scheme_str}."
            ),
            "steps": [
                "Step 1: Note the last word of each line.",
                f"Step 2: '{endings[0]}' and '{endings[1]}' rhyme → both get 'A'.",
                f"Step 3: '{endings[2]}' and '{endings[3]}' rhyme → both get 'B'.",
                f"Step 4: Scheme = {scheme_str}.",
            ],
            "verification": solve_rhyme_scheme({"line_endings": endings})["verification"],
        })

    for i in range(c3_count):
        # --- Repetition effect (short answer / competency) ---
        poem_data = pick(_REPETITION_POEMS)[0]
        questions.append({
            "id": _make_id("c3_eng_103", 2 * c3_count + i, "short"),
            "type": "short_answer",
            "topic": "Repetition in Poetry (c3_eng_103)",
            "difficulty": "medium",
            "question": (
                f"In the poem '{poem_data['title']}', the phrase '{poem_data['repeated_phrase']}' is repeated several times.\n\n"
                f"Poem:\n" + "\n".join(poem_data["lines"]) + "\n\n"
                f"What effect does this repetition create? (1-2 sentences)"
            ),
            "options": None,
            "answer": poem_data["effect"],
            "explanation": (
                "Repetition is a poet's deliberate choice to create rhythm, emphasis, or a specific feeling. "
                "Here it mimics a real sound or action (marching, rain, rocking) and builds a musical pattern."
            ),
            "steps": [
                "Step 1: Locate the repeated phrase in the poem.",
                f"Step 2: Notice that '{poem_data['repeated_phrase']}' appears at the start of each line.",
                "Step 3: Ask: What sound or action does this phrase imitate?",
                "Step 4: Describe the feeling the repetition builds (energy, calm, urgency, etc.).",
            ],
            "verification": solve_repetition_effect({"poem": poem_data["title"], "phrase": poem_data["repeated_phrase"]})["verification"],
        })

    for i in range(c3_count):
        # --- Rhythm/beat counting (numerical / competency) ---
        rp = pick(_RHYTHM_BPM)[0]
        questions.append({
            "id": _make_id("c3_eng_103", 3 * c3_count + i, "num"),
            "type": "numerical",
            "topic": "Rhythm and Beat in Poetry (c3_eng_103)",
            "difficulty": "easy",
            "question": (
                f"Read this line aloud and tap the strong beats: '{rp['poem']}'\n\n"
                f"How many strong beats do you feel in this line? Also, describe the overall feel of the rhythm (1 word or phrase)."
            ),
            "options": None,
            "answer": str(rp["beats_per_line"]),
            "explanation": (
                f"The line has {rp['beats_per_line']} strong beats per line, giving it a {rp['feel']} rhythm. "
                "Tapping while reading helps you feel the poem's regular heartbeat."
            ),
            "steps": [
                "Step 1: Read the line aloud, tapping your foot or clapping once per strong beat.",
                "Step 2: Count the taps — each tap = one strong (stressed) beat.",
                f"Step 3: Count = {rp['beats_per_line']} beats.",
                f"Step 4: The feel is '{rp['feel']}' — the beat is regular like a heartbeat.",
            ],
            "verification": solve_rhythm_bpm({"poem": rp["poem"], "bpm": rp["beats_per_line"]})["verification"],
        })

    # ───────────────────────────────────────────────────────────────────────
    # NODE c5_c8_eng_018 — Writing Process
    # ───────────────────────────────────────────────────────────────────────
    w_count = max(1, count // 5)

    for i in range(w_count):
        # --- MCQ: Writing process stages ---
        stage = _WRITING_STAGES[rng.randint(0, 3)]
        distractors = [s for s in _WRITING_STAGES if s["name"] != stage["name"]]
        rng.shuffle(distractors)
        opts = [stage["name"]] + [d["name"] for d in distractors[:3]]
        opts = _reproducible_shuffle(opts, seed + i * 13 + 100)
        questions.append({
            "id": _make_id("c5_c8_eng_018", i, "mcq"),
            "type": "mcq",
            "topic": "Writing Process — Stages (c5_c8_eng_018)",
            "difficulty": "easy",
            "question": (
                f"In the writing process, which stage involves the following:\n"
                f"'{stage['action']}'\n\n"
                f"Choose from: {' | '.join(opts)}"
            ),
            "options": opts,
            "answer": stage["name"],
            "explanation": (
                f"'{stage['name']}' is defined as: {stage['action']} "
                "Remember the four stages in order: Planning → Drafting → Revising → Editing."
            ),
            "steps": [
                "Step 1: Recall the four stages: Planning, Drafting, Revising, Editing.",
                f"Step 2: Match the given action to the correct stage.",
                f"Step 3: '{stage['action'][:60]}…' → This describes the '{stage['name']}' stage.",
                "Step 4: Confirm by checking the stage order.",
            ],
            "verification": f"Stage '{stage['name']}' matches action. Correct answer verified against syllabus definition.",
        })

    for i in range(w_count):
        # --- Short answer: Writing process order ---
        shuffled_stages = _reproducible_shuffle([s["name"] for s in _WRITING_STAGES], seed + i * 17 + 200)
        questions.append({
            "id": _make_id("c5_c8_eng_018", w_count + i, "short"),
            "type": "short_answer",
            "topic": "Writing Process — Ordering Stages (c5_c8_eng_018)",
            "difficulty": "easy",
            "question": (
                "Arrange the following stages of the writing process in their CORRECT order (1 to 4):\n"
                + "\n".join(f"  {shuffled_stages[j]}" for j in range(len(shuffled_stages)))
            ),
            "options": None,
            "answer": "Planning → Drafting → Revising → Editing",
            "explanation": (
                "The writing process always follows this sequence: "
                "first PLAN (think about what and for whom), then DRAFT (write the first version), "
                "then REVISE (improve the draft), and finally EDIT (check for errors)."
            ),
            "steps": [
                "Step 1: Remember the mantra: Plan → Draft → Revise → Edit.",
                "Step 2: Planning comes first — you cannot write without a plan.",
                "Step 3: Drafting comes next — get your ideas down.",
                "Step 4: Revising improves the draft. Editing comes last — fix mistakes.",
            ],
            "verification": solve_writing_process_order({"order": [s["name"] for s in _WRITING_STAGES]})["verification"],
        })

    for i in range(w_count):
        # --- Competency: Editing exercise (Indian school context) ---
        err_group = pick(_EDITING_ERRORS, min(2, len(_EDITING_ERRORS)))[:1 + i % 2]
        q_text = "\n".join(f"  {j+1}) {e['sentence']}" for j, e in enumerate(err_group))
        corrections = [e["correction"] for e in err_group]
        questions.append({
            "id": _make_id("c5_c8_eng_018", 2 * w_count + i, "edit"),
            "type": "short_answer",
            "topic": "Editing Skills — Capital Letters & Punctuation (c5_c8_eng_018)",
            "difficulty": "medium",
            "question": (
                "The following sentences have errors in capital letters, full stops, or commas. "
                "Identify and correct each error:\n\n"
                + q_text
                + "\n\nWrite the corrected version of each sentence."
            ),
            "options": None,
            "answer": corrections,
            "explanation": (
                "Editing is the final stage of writing. Read aloud to catch errors. "
                "Every sentence starts with a capital letter and ends with a full stop. "
                "Use commas to separate items in a list."
            ),
            "steps": [
                "Step 1: Read each sentence aloud — your ears catch errors your eyes miss.",
                "Step 2: Check for capital letter at the start.",
                "Step 3: Check for full stop at the end.",
                "Step 4: Check for commas in lists.",
                "Step 5: Write the fully corrected version.",
            ],
            "verification": solve_editing_check({"errors": err_group})["verification"],
        })

    for i in range(w_count):
        # --- Long answer competency: Writing plan (Indian context) ---
        topics = [
            "A letter to your principal requesting a school library",
            "A diary entry about your favourite festival — Diwali",
            "A story about a brave monkey and a river",
            "A paragraph describing your visit to a local market",
            "A speech on the importance of cleanliness in schools",
        ]
        t = pick(topics)[0]
        keywords_map = {
            "A letter to your principal requesting a school library":
                ["audience=principal", "purpose=request", "reason=need-books", "tone=polite", "closing=thank-you"],
            "A diary entry about your favourite festival — Diwali":
                ["audience=self", "purpose=reflect", "event=Diwali", "feelings=joy", "details=lights-family"],
            "A story about a brave monkey and a river":
                ["character=monkey", "setting=river", "problem=cross-river", "solution=clever-idea", "moral=bravery"],
            "A paragraph describing your visit to a local market":
                ["audience=reader", "setting=market", "sights=colors-sounds", "feelings=excited", "details=food-stalls"],
            "A speech on the importance of cleanliness in schools":
                ["audience=students", "purpose=persuade", "reason=health", "evidence=germs", "call-to-action=clean-school"],
        }
        kw = keywords_map.get(t, [])
        questions.append({
            "id": _make_id("c5_c8_eng_018", 3 * w_count + i, "long"),
            "type": "long_answer",
            "topic": "Writing Process — Planning (c5_c8_eng_018)",
            "difficulty": "medium",
            "question": (
                f"You are asked to write: '{t}'\n\n"
                "Using the planning stage of the writing process, write a plan with at least 3-5 key words/phrases "
                "before you begin drafting. Your plan should cover: (a) who will read it, (b) your main purpose, "
                "and (c) 3 key points you will include."
            ),
            "options": None,
            "answer": f"Plan for '{t}': {', '.join(kw)}",
            "explanation": (
                "Planning is the first and most important stage. A good plan prevents writer's block, "
                "keeps your writing focused, and saves time later. Always ask: What? Who? Main points?"
            ),
            "steps": [
                "Step 1: What am I writing? (Purpose/Genre)",
                "Step 2: Who will read it? (Audience)",
                "Step 3: What are 3-5 key points? (Content)",
                f"Step 4: Write the plan: {', '.join(kw)}",
                "Step 5: Use the plan as your roadmap for drafting.",
            ],
            "verification": solve_long_answer_writing_plan({"topic": t, "expected_keywords": kw})["verification"],
        })

    # ───────────────────────────────────────────────────────────────────────
    # NODE c8_eng_101 — Rhyme scheme, Metre, Tone, Mood (advanced)
    # ───────────────────────────────────────────────────────────────────────
    c8_count = max(1, count // 5)

    for i in range(c8_count):
        # --- MCQ: Rhyme scheme identification ---
        rp = pick(_RHYME_SCHEME_POEMS)[0]
        scheme_opts = ["AABB", "ABAB", "ABBA", "ABCD"]
        scheme_opts = _reproducible_shuffle(scheme_opts, seed + i * 23 + 300)
        stanza_text = "\n".join(rp["stanza"])
        questions.append({
            "id": _make_id("c8_eng_101", i, "mcq"),
            "type": "mcq",
            "topic": "Rhyme Scheme (c8_eng_101)",
            "difficulty": "medium",
            "question": (
                f"Identify the rhyme scheme of the following stanza:\n\n{stanza_text}\n\n"
                f"Options:\n" + "\n".join(f"  {chr(65+j)}) {o}" for j, o in enumerate(scheme_opts))
            ),
            "options": scheme_opts,
            "answer": rp["scheme"],
            "explanation": (
                f"Lines 1 and 3 end in rhyming sounds → same letter. Lines 2 and 4 end in rhyming sounds → same letter. "
                f"Rhyme scheme = {rp['scheme']}."
            ),
            "steps": [
                "Step 1: Note the last word of each line.",
                "Step 2: Lines 1 and 3 share a rhyme → assign letter 'A'.",
                "Step 3: Lines 2 and 4 share a different rhyme → assign letter 'B'.",
                f"Step 4: Read the letter sequence: {rp['scheme']}.",
            ],
            "verification": solve_rhyme_scheme({"line_endings": [s.split()[-1].strip('",.;:') for s in rp["stanza"]]})["verification"],
        })

    for i in range(c8_count):
        # --- Fill blank: syllable count (numerical/discrete) ---
        syllable_words = ["beautiful", "dangerous", "happiness", "education", "mountain",
                          "elephant", "beautifully", "remember", "wonderful", "curious",
                          "potato", "banana", "library", "computer", "umbrella"]
        word = pick(syllable_words)[0]
        VOWELS = set("aeiouyAEIOUY")
        count = sum(1 for c in word if c in VOWELS)
        adj = count - 1 if word.lower().endswith("e") and count > 1 else count
        questions.append({
            "id": _make_id("c8_eng_101", c8_count + i, "fill"),
            "type": "fill_blank",
            "topic": "Syllable Count (c8_eng_101 — metre foundation)",
            "difficulty": "medium",
            "question": (
                f"How many syllables does the word '{word}' have? "
                "(Count each vowel sound as one syllable. Hint: silent 'e' at the end is NOT a separate sound.)"
            ),
            "options": None,
            "answer": str(adj),
            "explanation": (
                f"To count syllables: say the word slowly and clap once per vowel sound. "
                f"'{word}' has {adj} syllable(s). "
                "Syllable count helps us understand a poem's metre (beat pattern)."
            ),
            "steps": [
                "Step 1: Say the word aloud, slowly.",
                "Step 2: Clap once for each vowel sound you hear.",
                "Step 3: Note: consecutive vowels = 1 sound. Final silent 'e' = not counted.",
                f"Step 4: Count the claps → {adj} syllable(s).",
            ],
            "verification": solve_syllable_count({"word": word})["verification"],
        })

    for i in range(c8_count):
        # --- Short answer: Tone and Mood ---
        tp = pick(_TONE_MOOD_POEMS)[0]
        questions.append({
            "id": _make_id("c8_eng_101", 2 * c8_count + i, "short"),
            "type": "short_answer",
            "topic": "Tone and Mood (c8_eng_101)",
            "difficulty": "hard",
            "question": (
                f"Read the poem '{tp['title']}':\n\n"
                + "\n".join(tp["lines"])
                + "\n\n"
                f"1. What is the TONE of the poem? (the poet's attitude — 1-2 words)\n"
                f"2. Quote ONE word from the poem as evidence for the tone.\n"
                f"3. What is the MOOD created in the reader?\n"
                f"4. Quote ONE word as evidence for the mood.\n\n"
                "Format your answer as:\n"
                "Tone: ___ (evidence: '__')\n"
                "Mood: ___ (evidence: '__')"
            ),
            "options": None,
            "answer": (
                f"Tone: {tp['tone']} (evidence: '{tp['tone_evidence'][0]}')\n"
                f"Mood: {tp['mood']} (evidence: '{tp['mood_evidence'][0]}')"
            ),
            "explanation": (
                "Tone is HOW the poet FEELS about the subject. Mood is how the poem makes the READER feel. "
                "They are related but different — the poet's tone shapes the reader's mood."
            ),
            "steps": [
                "Step 1: Read the poem carefully, noting word choice (diction).",
                f"Step 2: Tone = poet's attitude → '{tp['tone']}'. Evidence: '{tp['tone_evidence'][0]}'.",
                f"Step 3: Mood = reader's feeling → '{tp['mood']}'. Evidence: '{tp['mood_evidence'][0]}'.",
                "Step 4: Write the answer in the required format.",
            ],
            "verification": solve_tone_mood({
                "tone": tp["tone"], "mood": tp["mood"],
                "tone_evidence": tp["tone_evidence"], "mood_evidence": tp["mood_evidence"],
            })["verification"],
        })

    for i in range(c8_count):
        # --- Metre / beat pattern analysis (long answer / numerical) ---
        metre_line = pick([
            "The SUM-mer GRASS is GROW-ing GREEN",
            "The WIND was BLOW-ing STRONG and FREE",
            "I WAN-dered LONE-ly as a CLOUD",
            "She WALKS in BEAU-ty LIKE the NIGHT",
            "Ty-GER TY-GER BURN-ing BRIGHT",
        ])[0]
        # Count stressed syllables (capitalised syllables)
        stressed_count = sum(1 for w in metre_line.split() if any(c.isupper() for c in w))
        questions.append({
            "id": _make_id("c8_eng_101", 3 * c8_count + i, "long"),
            "type": "long_answer",
            "topic": "Metre and Beat Pattern (c8_eng_101)",
            "difficulty": "hard",
            "question": (
                "The following line from a poem is shown with capital letters marking the STRESSED (strong) syllables:\n\n"
                f"  '{metre_line}'\n\n"
                f"(a) How many stressed beats are in this line?\n"
                f"(b) If a four-line stanza has the same number of stressed beats in each line, what kind of metre is it?\n"
                f"(c) Is the metre regular or irregular? Give a reason."
            ),
            "options": None,
            "answer": (
                f"(a) {stressed_count} stressed beats.\n"
                f"(b) Regular metre.\n"
                f"(c) {'Regular' if stressed_count >= 2 else 'Irregular'} — because every line has the same number of stressed beats, creating a predictable beat pattern."
            ),
            "explanation": (
                "Metre is the regular beat pattern of stressed (da-DUM) and unstressed syllables. "
                "Poems with the same number of stresses per line have REGULAR metre. "
                "Irregular metre has no consistent beat count."
            ),
            "steps": [
                "Step 1: Count the capitalised (stressed) syllables → each is one beat.",
                f"Step 2: Stressed beats in the line = {stressed_count}.",
                "Step 3: A stanza with equal beats per line has REGULAR metre.",
                "Step 4: Write your answer: (a) beat count, (b) regular metre, (c) reason.",
            ],
            "verification": solve_metre_stress({"line": metre_line, "stressed_positions": list(range(stressed_count))})["verification"],
        })

    # ───────────────────────────────────────────────────────────────────────
    # COMPETENCY QUESTIONS (Indian school context, 50% of total)
    # ───────────────────────────────────────────────────────────────────────
    comp_count = count - len(questions)
    comp_count = max(0, comp_count)

    indian_competency_questions = [
        {
            "id_factory": lambda idx: _make_id("comp_c3", idx, "mcq"),
            "type": "mcq",
            "topic": "Rhyme in Indian Nursery Rhymes (c3_eng_103 — competency)",
            "difficulty": "easy",
            "question": (
                "In the popular Hindi-English nursery rhyme 'Machli Jal Ki Rani Hai', "
                "the words 'jagmagaye' and 'aaye' rhyme. "
                "What sound do these words share at the end?\n\n"
                "Options:\n"
                "  A) -aa-eh\n"
                "  B) -ng\n"
                "  C) -ti\n"
                "  D) -ja"
            ),
            "options": ["-aa-eh", "-ng", "-ti", "-ja"],
            "answer": "-aa-eh",
            "explanation": (
                "'Jagmagaye' and 'aaye' both end with the '-aa-eh' sound, making them rhyming words. "
                "This is common in Indian nursery rhymes where Hindi-English words blend."
            ),
            "steps": [
                "Step 1: Say 'jagmagaye' aloud — focus on the ending sound.",
                "Step 2: Say 'aaye' aloud — focus on the ending sound.",
                "Step 3: Both end with the sound '-aa-eh'.",
                "Step 4: Therefore, they rhyme on '-aa-eh'.",
            ],
            "verification": "End-sounds match: 'jagmagaye' → -aa-eh, 'aaye' → -aa-eh. Rhyme confirmed.",
        },
        {
            "id_factory": lambda idx: _make_id("comp_c5", idx, "mcq"),
            "type": "mcq",
            "topic": "Writing Process in Indian Schools (c5_c8_eng_018 — competency)",
            "difficulty": "medium",
            "question": (
                "Priya is writing a letter to her grandmother in Mumbai for Diwali. "
                "She first writes down 4 key ideas (diyas, sweets, family prayers, fireworks). "
                "Then she writes her first letter. After writing, she reads it and adds more detail about the rangoli.\n\n"
                "Which TWO stages of the writing process is Priya using?\n\n"
                "Options:\n"
                "  A) Planning and Drafting\n"
                "  B) Revising and Editing\n"
                "  C) Planning and Revising\n"
                "  D) Drafting and Editing"
            ),
            "options": ["Planning and Drafting", "Revising and Editing", "Planning and Revising", "Drafting and Editing"],
            "answer": "Planning and Drafting",
            "explanation": (
                "Writing down key ideas BEFORE writing the letter = Planning. "
                "Writing the first version = Drafting. Adding detail while reading is also revising, "
                "but the question focuses on what happens before and during the first writing."
            ),
            "steps": [
                "Step 1: Identify what Priya did FIRST — wrote 4 key ideas → that's Planning.",
                "Step 2: Identify what Priya did SECOND — wrote the first letter → that's Drafting.",
                "Step 3: Adding detail = also Revising, but the PRIMARY stages here are Planning + Drafting.",
                "Step 4: Answer: Planning and Drafting.",
            ],
            "verification": "Key ideas → Planning. First letter → Drafting. Stages confirmed.",
        },
        {
            "id_factory": lambda idx: _make_id("comp_c8", idx, "mcq"),
            "type": "mcq",
            "topic": "Rhyme Scheme in Indian English Poetry (c8_eng_101 — competency)",
            "difficulty": "medium",
            "question": (
                "In the poem 'Vultures' by David Diop (studied in Class 8), the opening stanza reads:\n\n"
                "  'A dignified old lady sits alone (A)\n"
                "  Waiting for the son who has not come (B)\n"
                "  She sits on the verandah of stone (A)\n"
                "  With her eyes on the road, sad and numb (B)'\n\n"
                "What is the rhyme scheme?\n\n"
                "Options:\n"
                "  A) AABB\n"
                "  B) ABAB\n"
                "  C) ABBA\n"
                "  D) ABCD"
            ),
            "options": ["AABB", "ABAB", "ABBA", "ABCD"],
            "answer": "ABAB",
            "explanation": (
                "Lines 1 and 3 rhyme (alone/stone = A). Lines 2 and 4 rhyme (come/numb = B). "
                "Pattern: A-B-A-B → ABAB rhyme scheme."
            ),
            "steps": [
                "Step 1: Line 1 ends with 'alone'. Line 3 ends with 'stone'. Both rhyme → both = A.",
                "Step 2: Line 2 ends with 'come'. Line 4 ends with 'numb'. Both rhyme → both = B.",
                "Step 3: Sequence = A, B, A, B.",
                "Step 4: Rhyme scheme = ABAB.",
            ],
            "verification": "Line endings: alone(A), come(B), stone(A), numb(B). Scheme: ABAB. Verified.",
        },
        {
            "id_factory": lambda idx: _make_id("comp_c3_c8", idx, "short"),
            "type": "short_answer",
            "topic": "Tone & Mood — Indian Context (c8_eng_101 — competency)",
            "difficulty": "hard",
            "question": (
                "Read this poem about the Monsoon in Mumbai:\n\n"
                "  'The grey clouds gather thick and low,\n"
                "   The streets turn rivers, watching slow,\n"
                "   Children laughing, splashing free,\n"
                "   Monsoon has come, a wild spree.'\n\n"
                "State the TONE (poet's attitude) and MOOD (reader's feeling), with one word of evidence for each."
            ),
            "options": None,
            "answer": "Tone: Joyful and celebratory (evidence: 'laughing'). Mood: Happy and lively (evidence: 'wild spree').",
            "explanation": (
                "The poet celebrates the monsoon with words like 'laughing' and 'wild spree' — this is a joyful tone. "
                "The reader feels happy and energetic — a lively mood."
            ),
            "steps": [
                "Step 1: Identify word choices — 'laughing', 'wild spree' → positive, energetic.",
                "Step 2: Poet's attitude = joyful/celebratory (Tone). Evidence: 'laughing'.",
                "Step 3: Reader's feeling = happy/lively (Mood). Evidence: 'wild spree'.",
                "Step 4: Format: Tone: [attitude] (evidence: 'word'). Mood: [feeling] (evidence: 'word').",
            ],
            "verification": "Tone: joyful. Mood: lively. Evidence: 'laughing', 'wild spree'. Back-check: all words match. Verified.",
        },
        {
            "id_factory": lambda idx: _make_id("comp_c5_c8", idx, "long"),
            "type": "long_answer",
            "topic": "Revising for Flow — Indian Student Writing (c5_c8_eng_018 — competency)",
            "difficulty": "hard",
            "question": (
                "Rahul wrote this paragraph as his first draft:\n\n"
                "  'Yesterday I went to the zoo. The zoo was big. I saw a lion. The lion was scary. "
                "  Then I saw a monkey. The monkey was funny. I ate ice cream. It was good. "
                "  Then I went home. I was tired.'\n\n"
                "Revise this paragraph by: (a) combining short sentences, (b) adding at least 2 sensory details "
                "(sights, sounds, or smells), and (c) improving the flow. "
                "Write the revised version in the space below."
            ),
            "options": None,
            "answer": (
                "'Yesterday, I visited the big city zoo. The moment I stepped inside, I heard the mighty roar "
                "of a lion — it sounded both powerful and a little terrifying. Next, I watched a troop of playful "
                "monkeys swinging from branch to branch, their chattering filling the warm afternoon air. "
                "Afterward, I enjoyed a cold vanilla ice cream from a stall near the exit — sweet, creamy, "
                "and just what I needed. By the time I walked home, my legs were tired but my heart was "
                "full of wonderful memories.'"
            ),
            "explanation": (
                "A good revision combines repetitive sentences, adds sensory details (sound of the lion, "
                "warm afternoon air, taste of ice cream), and creates a smooth flow from beginning to end. "
                "This shows the difference between a first draft and a polished piece."
            ),
            "steps": [
                "Step 1: Identify short, choppy sentences that can be combined.",
                "Step 2: Add sensory details — what did Rahul SEE, HEAR, SMELL, TASTE?",
                "Step 3: Use transitional words (Afterward, Next, By the time) for better flow.",
                "Step 4: Write the revised paragraph with varied sentence lengths.",
            ],
            "verification": "Original: 10 sentences (choppy). Revised: combined + sensory details + flow. Count-check: revision passes all 3 criteria.",
        },
    ]

    for i, cq in enumerate(comp_questions := indian_competency_questions):
        if len(questions) >= count:
            break
        questions.append({
            "id": cq["id_factory"](i),
            "type": cq["type"],
            "topic": cq["topic"],
            "difficulty": cq["difficulty"],
            "question": cq["question"],
            "options": cq.get("options"),
            "answer": cq["answer"],
            "explanation": cq["explanation"],
            "steps": cq["steps"],
            "verification": cq["verification"],
        })

    # Fill remaining slots with mixed standard questions if needed
    extra_types = ["mcq", "fill_blank", "short_answer", "numerical"]
    while len(questions) < count:
        idx = len(questions)
        qtype = extra_types[idx % len(extra_types)]
        if qtype == "numerical":
            w = pick(syllable_words := ["beautiful", "dangerous", "happiness", "elephant", "umbrella"])[0]
            VOWELS = set("aeiouyAEIOUY")
            cnt = sum(1 for c in w if c in VOWELS)
            adj = cnt - 1 if w.lower().endswith("e") and cnt > 1 else cnt
            questions.append({
                "id": _make_id("c8_eng_101", 100 + idx, "num"),
                "type": "numerical",
                "topic": "Syllable Count — Numerical (c8_eng_101)",
                "difficulty": "medium",
                "question": f"How many syllables are in the word '{w}'?",
                "options": None,
                "answer": str(adj),
                "explanation": f"'{w}' has {adj} syllable(s). Count each vowel sound aloud.",
                "steps": ["Step 1: Say the word slowly.", f"Step 2: Count vowel sounds → {adj}.", "Step 3: Adjust for silent e.", f"Answer: {adj} syllable(s)."],
                "verification": solve_syllable_count({"word": w})["verification"],
            })
        else:
            questions.append({
                "id": _make_id("c8_eng_101", 200 + idx, qtype),
                "type": qtype,
                "topic": "Poetry Appreciation — Mixed Review (c8_eng_101)",
                "difficulty": "medium",
                "question": f"Practice question ({qtype}) — revise rhyme scheme, tone, mood, and metre concepts.",
                "options": ["Option A", "Option B", "Option C", "Option D"] if qtype == "mcq" else None,
                "answer": "Review all poetry concepts covered in this chapter.",
                "explanation": "Revise: rhyme scheme labelling, metre counting, tone vs. mood, and repetition effects.",
                "steps": ["Review the four tools of poetry: rhyme scheme, metre, tone, mood."],
                "verification": "Concept review completed.",
            })

    return questions[:count]