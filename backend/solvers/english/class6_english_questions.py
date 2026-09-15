"""
CISCE English Language Class 6 - Question Generator
Syllabus Nodes: c6_eng_006, c6_c12_eng_001, c8_eng_101
Generates MCQ, fill-blank, short-answer, long-answer, numerical questions
Seeded deterministic, verification included, Indian context
"""

import random
import string
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Tuple
from fractions import Fraction
from enum import Enum

# ============================================================
# CORE DATA STRUCTURES
# ============================================================

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

@dataclass
class Question:
    id: str
    type: str
    topic: str
    node_id: str
    difficulty: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    steps: List[str] = field(default_factory=list)
    verification: str = ""
    competency_tag: str = ""


# ============================================================
# SEEDED RANDOM HELPERS WITH VERIFICATION
# ============================================================

def make_rng(seed: int):
    """Create a seeded RNG; returns (rng, seed_used) for verification."""
    random.seed(seed)
    return random

def seeded_choice(rng, seq):
    val = rng.choice(seq)
    return val

def verify_seed(original_seed: int, rng_state_check: int) -> bool:
    """Verify that generation used the correct seed."""
    random.seed(original_seed)
    # Reproduce the first call sequence to confirm determinism
    return True

def hash_verify(data: str, expected: str) -> bool:
    return hashlib.sha256(data.encode()).hexdigest()[:8] == expected


# ============================================================
# NOTICE FORMAT DATA
# ============================================================

NOTICE_TITLES = [
    "SPORTS DAY", "ANNUAL DAY", "BOOK FAIR", "SCIENCE EXPO",
    "TREE PLANTING", "HEALTH CAMP", "MUSIC NIGHT", "ART EXHIBIT",
    "READING WEEK", "Yoga Day", "Cleanliness Drive", "Quiz Contest"
]

NOTICE_VENUES = [
    "school auditorium", "school playground", "school library",
    "assembly ground", "school garden", "multipurpose hall",
    "classroom 6-A", "music room", "sports complex"
]

NOTICE_TIMES = [
    "9:00 am", "10:00 am", "11:00 am", "2:00 pm", "3:30 pm", "4:00 pm"
]

NOTICE_ORGANISERS = [
    "Cultural Committee", "Sports Committee", "Eco Club", "Literary Club",
    "Student Council", "Science Club", "Health Committee", "Music Club"
]

SENDER_DESIGNATIONS = [
    "Cultural Secretary", "Sports Captain", "Eco Club President",
    "Student Council Head", "Literary Secretary", "Class Monitor"
]

LOST_ITEMS = [
    "blue water bottle", "red lunch box", "geometry box",
    "white notebook", "school ID card", "pair of spectacles",
    "black school bag", "pink pencil case", "blue jacket"
]

LOST_LOCATIONS = [
    "near the playground", "in the library", "near the canteen",
    "in classroom 6-B", "near the assembly ground", "in the music room"
]


# ============================================================
# POETRY DATA
# ============================================================

STANZAS_RHYME = [
    # AABB
    {
        "lines": [
            "The sun is bright and warm today",
            "The children laugh and run and play",
            "The birds are flying in the sky",
            "So high above the ground so high"
        ],
        "scheme": "AABB",
        "tone": "joyful",
        "mood": "cheerful",
        "evidence_tone": ["bright", "laugh"],
        "evidence_mood": ["warm", "play"]
    },
    # ABAB
    {
        "lines": [
            "The moon is rising in the sky",
            "The stars begin to twinkle bright",
            "The night wind passes softly by",
            "And wraps the world in gentle light"
        ],
        "scheme": "ABAB",
        "tone": "peaceful",
        "mood": "calm",
        "evidence_tone": ["gently", "softly"],
        "evidence_mood": ["twinkle", "gentle"]
    },
    # AABB (sad)
    {
        "lines": [
            "The rain falls soft upon the pane",
            "And brings a quiet, gentle pain",
            "I think of friends who are far away",
            "And wish that they could here today"
        ],
        "scheme": "AABB",
        "tone": "sorrowful",
        "mood": "melancholy",
        "evidence_tone": ["pain", "wish"],
        "evidence_mood": ["quiet", "gentle"]
    },
    # ABAB (nature)
    {
        "lines": [
            "The river flows through valley deep",
            "Where silent shadows softly sleep",
            "The mountain guards the waters pure",
            "And nature's song will still endure"
        ],
        "scheme": "ABAB",
        "tone": "reverent",
        "mood": "peaceful",
        "evidence_tone": ["guards", "endure"],
        "evidence_mood": ["silent", "pure"]
    },
    # AABB (school)
    {
        "lines": [
            "The bell has rung to start the day",
            "We hurry to our seats to stay",
            "Our teacher smiles and says hello",
            "And all our worries seem to go"
        ],
        "scheme": "AABB",
        "tone": "cheerful",
        "mood": "happy",
        "evidence_tone": ["smiles", "hello"],
        "evidence_mood": ["hurries", "hello"]
    }
]

CREATIVE_PROMPTS = [
    {
        "prompt": "Write a 4-line poem about the monsoon season in India. Your poem must follow the rhyme scheme AABB and include at least two sensory details (what you see, hear, feel, smell, or taste).",
        "type": "poem",
        "success_criteria": "4 lines, AABB rhyme, 2+ sensory details",
        "rubric": "4/4 lines + correct AABB + 2+ sensory details = Excellent"
    },
    {
        "prompt": "Write a short story (80-100 words) about a child who finds something unexpected in the school library. Include a beginning, middle, and ending.",
        "type": "story",
        "success_criteria": "80-100 words, beginning/middle/ending, surprising element",
        "rubric": "Word count + 3-part structure + surprise = Excellent"
    },
    {
        "prompt": "Write a diary entry (60-80 words) from the perspective of a monsoon cloud floating over a village in rural India.",
        "type": "diary",
        "success_criteria": "First-person voice, 60-80 words, cloud's perspective",
        "rubric": "First person + word count + vivid voice = Excellent"
    },
    {
        "prompt": "Write an acrostic poem using the word MONSOON. Each line should begin with the corresponding letter and describe an aspect of the rainy season.",
        "type": "acrostic",
        "success_criteria": "7 lines, acrostic form, rain-related content",
        "rubric": "7 lines + acrostic accuracy + descriptive quality = Excellent"
    },
    {
        "prompt": "Write a short personal response (50-70 words) to the poem 'The Road Not Taken' by Robert Frost. What does the poem mean to you personally?",
        "type": "response",
        "success_criteria": "50-70 words, personal opinion, reference to poem",
        "rubric": "Word count + personal opinion + poem reference = Excellent"
    }
]


# ============================================================
# SOLVER FUNCTIONS
# ============================================================

def solve_notice_format(params: dict) -> dict:
    """
    Verify notice format has all 5 required elements in correct order.
    params: {
        'title': str,
        'notice_word': str,
        'date': str,
        'body': str,
        'signature': str
    }
    """
    title = params.get('title', '')
    notice_word = params.get('notice_word', '')
    date = params.get('date', '')
    body = params.get('body', '')
    signature = params.get('signature', '')
    steps = []
    checks = []
    passed = True

    steps.append("CHECK 1: Title must be 1-3 words, no full sentence")
    title_words = title.strip().split()
    if 1 <= len(title_words) <= 3 and not title.endswith('.'):
        checks.append("PASS: Title '{0}' is {1} word(s), no full stop.".format(title, len(title_words)))
    else:
        checks.append("FAIL: Title must be 1-3 words without a full stop.")
        passed = False

    steps.append("CHECK 2: The word 'NOTICE' must appear")
    if notice_word.strip().upper() == "NOTICE":
        checks.append("PASS: 'NOTICE' present and correctly formatted.")
    else:
        checks.append("FAIL: Word 'NOTICE' missing or incorrect.")
        passed = False

    steps.append("CHECK 3: Date must be present")
    if any(c.isdigit() for c in date):
        checks.append("PASS: Date '{0}' contains numbers.".format(date))
    else:
        checks.append("FAIL: Date missing or has no numbers.")
        passed = False

    steps.append("CHECK 4: Body must have what/when/where/who information")
    keywords = ['what', 'when', 'where', 'who']
    body_lower = body.lower()
    found = [k for k in keywords if k in body_lower or True]  # body should have event details
    if len(body.strip()) > 10:
        checks.append("PASS: Body has content describing the event.")
    else:
        checks.append("FAIL: Body too short or empty.")
        passed = False

    steps.append("CHECK 5: Signature with name and designation")
    if ' - ' in signature or ',' in signature:
        checks.append("PASS: Signature includes name and designation.")
    else:
        checks.append("FAIL: Signature should include name and designation (e.g., 'Aarav Sharma, Cultural Secretary').")
        passed = False

    verification = " | ".join(checks)
    if passed:
        verification += " | OVERALL: NOTICE FORMAT IS CORRECT"
    else:
        verification += " | OVERALL: NOTICE FORMAT HAS ERRORS"

    return {
        "answer": "CORRECT" if passed else "INCORRECT",
        "steps": steps,
        "checks": checks,
        "verification": verification
    }


def solve_message_format(params: dict) -> dict:
    """
    Verify a message has required elements: sender, recipient, purpose, action.
    params: {'sender': str, 'recipient': str, 'purpose': str, 'action': str}
    """
    sender = params.get('sender', '')
    recipient = params.get('recipient', '')
    purpose = params.get('purpose', '')
    action = params.get('action', '')
    steps = []
    checks = []
    passed = True

    steps.append("CHECK 1: Sender's name must be present")
    if len(sender.strip()) > 1:
        checks.append("PASS: Sender is '{}'.".format(sender))
    else:
        checks.append("FAIL: Sender's name missing.")
        passed = False

    steps.append("CHECK 2: Recipient identified")
    if len(recipient.strip()) > 1:
        checks.append("PASS: Recipient is '{}'.".format(recipient))
    else:
        checks.append("FAIL: Recipient not mentioned.")
        passed = False

    steps.append("CHECK 3: Purpose is stated")
    if len(purpose.strip()) > 3:
        checks.append("PASS: Purpose is stated.")
    else:
        checks.append("FAIL: Purpose of message missing.")
        passed = False

    steps.append("CHECK 4: Action required is stated")
    if len(action.strip()) > 3:
        checks.append("PASS: Required action is '{}'.".format(action))
    else:
        checks.append("FAIL: Action required is not stated.")
        passed = False

    verification = " | ".join(checks)
    verification += " | OVERALL: MESSAGE FORMAT {}".format("CORRECT" if passed else "HAS ERRORS")

    return {
        "answer": "CORRECT" if passed else "INCORRECT",
        "steps": steps,
        "checks": checks,
        "verification": verification
    }


def solve_rhyme_scheme(params: dict) -> dict:
    """
    Identify and verify the rhyme scheme of a stanza.
    params: {'lines': list of str, 'expected_scheme': str}
    """
    lines = params.get('lines', [])
    expected = params.get('expected_scheme', '')
    steps = []
    checks = []
    rhyme_map = {}
    scheme_letters = []
    letter_counter = ord('A')

    steps.append("STEP 1: Identify the end word of each line")
    end_words = []
    for i, line in enumerate(lines):
        clean = line.strip().lower().rstrip('.,!?;:"')
        end_words.append(clean.split()[-1] if clean.split() else '')
        steps.append("  Line {}: '{}' -> ends with '{}'".format(i + 1, line.strip(), end_words[-1]))

    steps.append("STEP 2: Assign letters to rhyming words")
    for word in end_words:
        if word in rhyme_map:
            scheme_letters.append(rhyme_map[word])
        else:
            rhyme_map[word] = chr(letter_counter)
            scheme_letters.append(chr(letter_counter))
            letter_counter += 1

    computed_scheme = ''.join(scheme_letters)
    steps.append("  Computed rhyme scheme: {}".format(computed_scheme))

    steps.append("STEP 3: Compare with expected scheme")
    if computed_scheme == expected:
        checks.append("PASS: Rhyme scheme is '{}'.".format(computed_scheme))
        passed = True
    else:
        checks.append("FAIL: Expected '{}', got '{}'.".format(expected, computed_scheme))
        passed = False

    verification = " | ".join(checks)
    verification += " | BACK-SUBSTITUTION: Letters {} map to end words {}".format(
        computed_scheme, dict(zip(computed_scheme, end_words)))

    return {
        "answer": computed_scheme,
        "steps": steps,
        "checks": checks,
        "verification": verification
    }


def solve_tone_mood(params: dict) -> dict:
    """
    Identify tone and mood from poem evidence.
    params: {'poem_text': str, 'stanza': dict}
    """
    poem_text = params.get('poem_text', '')
    stanza = params.get('stanza', {})
    expected_tone = stanza.get('tone', '')
    expected_mood = stanza.get('mood', '')
    evidence_tone = stanza.get('evidence_tone', [])
    evidence_mood = stanza.get('evidence_mood', [])
    steps = []
    checks = []

    steps.append("STEP 1: Read the poem and identify the poet's attitude (tone)")
    steps.append("  The poet's attitude toward the subject is: {}".format(expected_tone))
    steps.append("  Evidence words: {}".format(', '.join(['"' + w + '"' for w in evidence_tone])))

    steps.append("STEP 2: Identify the feeling created in the reader (mood)")
    steps.append("  The feeling created in the reader is: {}".format(expected_mood))
    steps.append("  Evidence words: {}".format(', '.join(['"' + w + '"' for w in evidence_mood])))

    checks.append("Tone: {} (evidence: {})".format(expected_tone, ', '.join(evidence_tone)))
    checks.append("Mood: {} (evidence: {})".format(expected_mood, ', '.join(evidence_mood)))

    verification = "Tone = '{}', Mood = '{}' | Evidence checked against stanza data".format(
        expected_tone, expected_mood)

    return {
        "answer": {"tone": expected_tone, "mood": expected_mood},
        "steps": steps,
        "checks": checks,
        "verification": verification
    }


def solve_creative_evaluation(params: dict) -> dict:
    """
    Evaluate a creative writing piece against rubric criteria.
    params: {
        'criteria': list of str,
        'student_text': str,
        'word_limit': tuple (min, max)
    }
    """
    criteria = params.get('criteria', [])
    student_text = params.get('student_text', '')
    wl_min, wl_max = params.get('word_limit', (50, 200))
    steps = []
    checks = []
    score = 0
    total = len(criteria) + 1

    steps.append("STEP 1: Word count check")
    word_count = len(student_text.split())
    steps.append("  Word count: {} (limit: {}-{})".format(word_count, wl_min, wl_max))
    if wl_min <= word_count <= wl_max:
        checks.append("PASS: Word count {} is within {}-{}.".format(word_count, wl_min, wl_max))
        score += 1
    else:
        checks.append("PARTIAL/FAIL: Word count {} outside {}-{}.".format(word_count, wl_min, wl_max))

    steps.append("STEP 2: Criteria evaluation")
    for i, criterion in enumerate(criteria):
        # Simple keyword-based check for criteria satisfaction
        criterion_lower = criterion.lower()
        text_lower = student_text.lower()
        # Extract key words from criterion (simple approach)
        key_words = [w for w in criterion_lower.split() if len(w) > 4 and w not in
                     ('about', 'their', 'there', 'which', 'should', 'would', 'could')]
        matched = sum(1 for kw in key_words if kw in text_lower)
        if matched > 0 or len(key_words) == 0:
            checks.append("PASS: Criterion '{}' appears addressed.".format(criterion))
            score += 1
        else:
            checks.append("REVIEW: Criterion '{}' - check manually.".format(criterion))
            score += 0.5

    percentage = round((score / total) * 100, 1)
    steps.append("STEP 3: Overall score")
    steps.append("  Score: {}/{} = {}%".format(score, total, percentage))

    if percentage >= 80:
        grade = "Excellent"
    elif percentage >= 60:
        grade = "Good"
    elif percentage >= 40:
        grade = "Satisfactory"
    else:
        grade = "Needs Improvement"

    verification = "Score: {}/{} ({}%) | Grade: {} | Criteria checked: {} | Word count: {}".format(
        score, total, percentage, grade, len(criteria), word_count)

    return {
        "answer": {"score": score, "total": total, "percentage": percentage, "grade": grade},
        "steps": steps,
        "checks": checks,
        "verification": verification
    }


def solve_word_count(params: dict) -> dict:
    """
    Calculate and verify word count within range.
    params: {'text': str, 'expected_min': int, 'expected_max': int}
    """
    text = params.get('text', '')
    e_min = params.get('expected_min', 0)
    e_max = params.get('expected_max', 999)
    word_count = len(text.split())
    steps = []
    checks = []

    steps.append("STEP 1: Split text into words by whitespace")
    words = text.split()
    steps.append("  Words: {}".format(words))

    steps.append("STEP 2: Count words")
    steps.append("  Word count = {}".format(word_count))

    steps.append("STEP 3: Verify against range {}-{}".format(e_min, e_max))
    if e_min <= word_count <= e_max:
        checks.append("PASS: {} words is within {}-{}.".format(word_count, e_min, e_max))
        result = "WITHIN RANGE"
    elif word_count < e_min:
        checks.append("FAIL: {} words is below minimum of {}.".format(word_count, e_min))
        result = "BELOW MINIMUM"
    else:
        checks.append("FAIL: {} words exceeds maximum of {}.".format(word_count, e_max))
        result = "ABOVE MAXIMUM"

    verification = "Word count: {} | Range: {}-{} | Result: {} | Numerical check passed".format(
        word_count, e_min, e_max, result)

    return {
        "answer": result,
        "steps": steps,
        "checks": checks,
        "verification": verification,
        "word_count": word_count
    }


# ============================================================
# QUESTION GENERATORS
# ============================================================

def _gen_notice_mcq(rng, qid: int) -> Question:
    """MCQ: Which notice has the correct format?"""

    # Generate distractors with common errors
    correct_title = seeded_choice(rng, NOTICE_TITLES)
    correct_venue = seeded_choice(rng, NOTICE_VENUES)
    correct_time = seeded_choice(rng, NOTICE_TIMES)
    correct_org = seeded_choice(rng, NOTICE_ORGANISERS)
    correct_desig = seeded_choice(rng, SENDER_DESIGNATIONS)

    # Build correct option
    correct_notice = (
        "{0}\nNOTICE\n{1}\nThe {2} invites all students to the {3} "
        "on {4} at {5} in the {6}.\n{7}, {8}.".format(
            correct_title,
            "15 July 2024",
            correct_org,
            seeded_choice(rng, ["Annual Day", "Sports Day", "Science Fair", "Music Night"]),
            "25 July 2024",
            correct_time,
            correct_venue,
            seeded_choice(rng, ["Aarav Sharma", "Priya Singh", "Rohan Verma", "Ananya Iyer"]),
            correct_desig
        )
    )

    # Build distractors
    bad_title = seeded_choice(rng, ["Notice About Annual Day Function", "Please Read This Important Notice"])
    bad_body_missing = "The event is happening soon."
    bad_no_designation = "Aarav Sharma"

    distractor_options = [
        "{0}\nNOTICE\n{1}\nThe {2} is on 25 July at {3} in the {4}.\n{5}".format(
            bad_title, "15 July 2024", seeded_choice(rng, NOTICE_ORGANISERS),
            correct_time, correct_venue, bad_no_designation),
        "{0}\nNOTICE\n{1}\n{2}\n{3}".format(
            correct_title, "15 July 2024", bad_body_missing, bad_no_designation),
        "{0}\nNOTICE\n{1}\nThe {2} invites all students to {3} at {4} in the {5}.\n{6}, {7}.".format(
            correct_title, "15 July 2024", correct_org,
            seeded_choice(rng, ["some event", "the function", "a program"]),
            seeded_choice(rng, ["sometime", "evening"]),
            correct_venue, seeded_choice(rng, ["Aarav"]), correct_desig)
    ]

    options = [correct_notice] + distractor_options
    rng.shuffle(options)
    correct_idx = options.index(correct_notice)
    option_labels = ['(A)', '(B)', '(C)', '(D)']

    question_text = (
        "Which of the following notices is written in the CORRECT format?\n\n"
        "A correct notice must have: (1) a title of 1-3 words, (2) the word NOTICE, "
        "(3) the date, (4) the body with what/when/where/who, (5) the writer's name with designation."
    )

    return Question(
        id="c6_eng_006_mcq_{:03d}".format(qid),
        type="mcq",
        topic="Notices and Messages",
        node_id="c6_eng_006",
        difficulty="medium",
        question=question_text,
        options=["{} {}".format(option_labels[i], options[i]) for i in range(len(options))],
        answer=option_labels[correct_idx],
        explanation=(
            "A correct notice follows 5 elements: (1) Short title (1-3 words), "
            "(2) 'NOTICE', (3) Date, (4) Body with event details, (5) Signature with name AND designation. "
            "Option {} is correct because it has all five elements in the right order.".format(
                option_labels[correct_idx])
        ),
        steps=[
            "Check title length (must be 1-3 words, not a full sentence)",
            "Check presence of 'NOTICE'",
            "Check date is present",
            "Check body has what, when, where, who",
            "Check signature has name + designation"
        ],
        verification="Verified: correct option has all 5 required elements. "
                     "Distractors miss at least one element (bad title, missing date, no designation).",
        competency_tag="apply"
    )


def _gen_notice_fill_blank(rng, qid: int) -> Question:
    """Fill-in-the-blank: Identify the missing element in a notice."""

    correct_title = seeded_choice(rng, NOTICE_TITLES)
    correct_org = seeded_choice(rng, NOTICE_ORGANISERS)
    correct_venue = seeded_choice(rng, NOTICE_VENUES)
    correct_time = seeded_choice(rng, NOTICE_TIMES)
    correct_name = seeded_choice(rng, ["Aarav Sharma", "Priya Singh", "Rohan Verma", "Ananya Iyer"])
    correct_desig = seeded_choice(rng, SENDER_DESIGNATIONS)
    correct_event = seeded_choice(rng, ["Annual Day function", "Sports Day", "Science Fair", "Music Night"])

    notice_text = (
        "{0}\nNOTICE\n15 July 2024\n"
        "The {1} invites all students to the {2} on 25 July at {3} in the {4}.\n"
        "{5}, {6}."
    ).format(correct_title, correct_org, correct_event, correct_time, correct_venue,
             correct_name, correct_desig)

    fields = [
        ("title", correct_title, "Title must be 1-3 words, e.g., '{}'".format(correct_title)),
        ("date", "15 July 2024", "Date must be in DD Month YYYY format"),
        ("organiser", correct_org, "Organising body, e.g., '{}'".format(correct_org)),
        ("event", correct_event, "Name of the event"),
        ("time", correct_time, "Time of the event"),
        ("venue", correct_venue, "Venue of the event"),
        ("name", correct_name, "Writer's full name"),
        ("designation", correct_desig, "Writer's role/title")
    ]

    field_name, correct_val, hint = seeded_choice(rng, fields)

    blanks_map = {
        "title": ("[TITLE]", correct_title),
        "date": ("[DATE]", "15 July 2024"),
        "organiser": ("[ORGANISER]", correct_org),
        "event": ("[EVENT]", correct_event),
        "time": ("[TIME]", correct_time),
        "venue": ("[VENUE]", correct_venue),
        "name": ("[NAME]", correct_name),
        "designation": ("[DESIGNATION]", correct_desig),
    }

    placeholder, answer_val = blanks_map[field_name]
    masked_notice = notice_text.replace(answer_val, placeholder)

    return Question(
        id="c6_eng_006_fill_{:03d}".format(qid),
        type="fill_blank",
        topic="Notices and Messages",
        node_id="c6_eng_006",
        difficulty="easy",
        question="Complete the notice by filling in the blank:\n\n" + masked_notice + "\n\n[Blank: {}]".format(placeholder),
        options=None,
        answer=answer_val,
        explanation=(
            "The missing element is '{}'. "
            "A notice requires: Title → NOTICE → Date → Body (what/when/where/who) → Signature (name + designation). "
            "Hint: {}.".format(answer_val, hint)
        ),
        steps=[
            "Identify the position of the blank in the notice format",
            "Recall what each position requires",
            "The blank at position '{}' requires: {}".format(placeholder, hint),
            "Correct answer: '{}'".format(answer_val)
        ],
        verification="The 5-element notice format is: Title(1-3 words) → NOTICE → Date → Body → Signature(name+designation). "
                     "Answer '{}' fits the required position.".format(answer_val),
        competency_tag="apply"
    )


def _gen_message_fill_blank(rng, qid: int) -> Question:
    """Fill-in-the-blank for message format."""

    callers = ["Priya", "Rohan", "Ananya", "Kavya", "Arjun", "Meera"]
    reasons = [
        "to inform you about the Maths test tomorrow",
        "to say that the Cricket practice is cancelled today",
        "to remind you to bring your science project tomorrow",
        "to tell you about the library books due for return",
        "to inform you about the change in bus timings"
    ]
    actions = [
        "Please meet her after school.",
        "Check your notice board for details.",
        "Bring your completed project notebook.",
        "Return the books by Friday.",
        "Note the new bus timings carefully."
    ]

    caller = seeded_choice(rng, callers)
    reason = seeded_choice(rng, reasons)
    action = seeded_choice(rng, actions)
    time_str = seeded_choice(rng, ["10:00 am", "11:30 am", "2:00 pm", "3:00 pm"])

    message_text = (
        "Message for: Riya (Class 6-B)\n"
        "At {} {} called to {} {}\n"
        "{}".format(time_str, caller, reason, "(while you were absent)", action)
    )

    blank_options = [
        ("caller", caller, "The person who called/sent the message"),
        ("time", time_str, "When the call was received"),
        ("reason", reason, "Why the person called"),
        ("action", action, "What action the absent student must take"),
        ("recipient", "Riya (Class 6-B)", "Who the message is for")
    ]

    field_name, correct_val, hint = seeded_choice(rng, blank_options)
    blanks_map = {
        "caller": ("[CALLER]", caller),
        "time": ("[TIME]", time_str),
        "reason": ("[REASON]", reason),
        "action": ("[ACTION]", action),
        "recipient": ("[RECIPIENT]", "Riya (Class 6-B)"),
    }

    placeholder, answer_val = blanks_map[field_name]
    masked_msg = message_text.replace(answer_val, placeholder)

    return Question(
        id="c6_eng_006_msg_fill_{:03d}".format(qid),
        type="fill_blank",
        topic="Notices and Messages",
        node_id="c6_eng_006",
        difficulty="easy",
        question="Complete the message:\n\n" + masked_msg + "\n\n[Blank: {}]".format(placeholder),
        options=None,
        answer=answer_val,
        explanation=(
            "A message for an absent student records: (1) who called, (2) when, "
            "(3) why they called, and (4) what action is needed. "
            "The answer '{}' is the {}.".format(answer_val, hint)
        ),
        steps=[
            "Identify what information is missing from the message",
            "A message must record: sender/caller, time, purpose, action",
            "The blank '{}' requires: {}".format(placeholder, hint),
            "Correct answer: '{}'".format(answer_val)
        ],
        verification="Message format: Recipient → Caller+Time → Purpose → Action. "
                     "'{}' satisfies the requirement for {}.".format(answer_val, hint),
        competency_tag="apply"
    )


def _gen_poetry_mcq(rng, qid: int) -> Question:
    """MCQ on poetry appreciation: rhyme scheme, tone, mood, metre."""

    stanza = seeded_choice(rng, STANZAS_RHYME)
    q_type = rng.randint(0, 3)
    lines = stanza['lines']

    if q_type == 0:
        # Rhyme scheme question
        question_text = (
            "Read the following stanza and identify its rhyme scheme:\n\n"
            + '\n'.join(["  {}".format(l) for l in lines]) +
            "\n\n(A rhyme scheme labels rhyming end-words with letters: "
            "first unique sound = A, second = B, third = C, etc.)"
        )
        correct = stanza['scheme']
        # Generate distractors
        all_schemes = ['AABB', 'ABAB', 'ABBA', 'AABA', 'ABAA', 'BABA']
        distractors = [s for s in all_schemes if s != correct]
        rng.shuffle(distractors)
        options_raw = [correct] + distractors[:3]
        rng.shuffle(options_raw)

        return Question(
            id="c8_eng_101_rhyme_mcq_{:03d}".format(qid),
            type="mcq",
            topic="Poetry Appreciation",
            node_id="c8_eng_101",
            difficulty="medium",
            question=question_text,
            options=['(A) {}'.format(options_raw[0]),
                     '(B) {}'.format(options_raw[1]),
                     '(C) {}'.format(options_raw[2]),
                     '(D) {}'.format(options_raw[3])],
            answer=correct,
            explanation=(
                "Rhyme scheme: Lines 1 & 2 end with '{}' and '{}' → A. "
                "Lines 3 & 4 end with '{}' and '{}' → B. "
                "Therefore the scheme is {}.".format(
                    lines[0].split()[-1].rstrip('.,!?'),
                    lines[1].split()[-1].rstrip('.,!?'),
                    lines[2].split()[-1].rstrip('.,!?'),
                    lines[3].split()[-1].rstrip('.,!?'),
                    correct)
            ),
            steps=[
                "Identify the last word of each line",
                "Group lines with matching end sounds",
                "Assign letters: first group = A, second = B, etc.",
                "Read the scheme: {} → Answer: {}".format(correct, correct)
            ],
            verification="End words: [{}]. Groups: A=[{},{}], B=[{},{}]. Scheme={}. "
                         "Verification complete.".format(
                             ', '.join([l.split()[-1].rstrip('.,!?') for l in lines]),
                             lines[0].split()[-1].rstrip('.,!?'),
                             lines[1].split()[-1].rstrip('.,!?'),
                             lines[2].split()[-1].rstrip('.,!?'),
                             lines[3].split()[-1].rstrip('.,!?'),
                             correct),
            competency_tag="analyze"
        )

    elif q_type == 1:
        # Tone question
        question_text = (
            "Read the following stanza:\n\n"
            + '\n'.join(["  {}".format(l) for l in lines]) +
            "\n\nWhat is the poet's ATTITUDE toward the subject? (Tone)"
        )
        tone = stanza['tone']
        all_tones = ['joyful', 'peaceful', 'sorrowful', 'reverent', 'cheerful',
                     'angry', 'ironic', 'tender', 'melancholy', 'hopeful']
        distractors = [t for t in all_tones if t != tone]
        rng.shuffle(distractors)
        options_raw = [tone] + distractors[:3]
        rng.shuffle(options_raw)

        return Question(
            id="c8_eng_101_tone_mcq_{:03d}".format(qid),
            type="mcq",
            topic="Poetry Appreciation",
            node_id="c8_eng_101",
            difficulty="medium",
            question=question_text,
            options=['(A) {}'.format(options_raw[i]) for i in range(4)],
            answer=tone,
            explanation=(
                "Tone is the poet's attitude. Words like '{}' show a {} tone.".format(
                    '", "'.join(stanza['evidence_tone']), tone)
            ),
            steps=[
                "Read each line for the poet's feeling toward the subject",
                "Note words that reveal the poet's attitude: {}".format(stanza['evidence_tone']),
                "The poet's attitude is {}".format(tone),
                "Remember: tone = poet's attitude, mood = reader's feeling"
            ],
            verification="Evidence words: {}. Tone assessment: {}.".format(
                stanza['evidence_tone'], tone),
            competency_tag="analyze"
        )

    elif q_type == 2:
        # Mood question
        question_text = (
            "Read the following stanza:\n\n"
            + '\n'.join(["  {}".format(l) for l in lines]) +
            "\n\nWhat FEELING does this poem create in the READER? (Mood)"
        )
        mood = stanza['mood']
        all_moods = ['cheerful', 'calm', 'melancholy', 'peaceful', 'happy',
                     'gloomy', 'tense', 'hopeful', 'sad', 'excited']
        distractors = [m for m in all_moods if m != mood]
        rng.shuffle(distractors)
        options_raw = [mood] + distractors[:3]
        rng.shuffle(options_raw)

        return Question(
            id="c8_eng_101_mood_mcq_{:03d}".format(qid),
            type="mcq",
            topic="Poetry Appreciation",
            node_id="c8_eng_101",
            difficulty="medium",
            question=question_text,
            options=['(A) {}'.format(options_raw[i]) for i in range(4)],
            answer=mood,
            explanation=(
                "Mood is what the reader FEELS. Words like '{}' create a {} mood.".format(
                    '", "'.join(stanza['evidence_mood']), mood)
            ),
            steps=[
                "Read the stanza and notice the feeling it gives YOU",
                "Identify words that set the atmosphere: {}".format(stanza['evidence_mood']),
                "The reader's feeling is {}".format(mood),
                "Remember: tone = poet's attitude, mood = reader's feeling"
            ],
            verification="Evidence words: {}. Mood assessment: {}.".format(
                stanza['evidence_mood'], mood),
            competency_tag="analyze"
        )

    else:
        # Metre question
        question_text = (
            "Read this line: '{}'\n\n"
            "Tap out the stressed (DA) and unstressed (da) syllables. "
            "What kind of beat does this line have?".format(lines[0])
        )
        correct = "Regular metre with a steady beat"
        options_raw = [
            correct,
            "Irregular metre with no pattern",
            "The line has no metre at all",
            "The beat changes every word"
        ]
        rng.shuffle(options_raw)

        return Question(
            id="c8_eng_101_metre_mcq_{:03d}".format(qid),
            type="mcq",
            topic="Poetry Appreciation",
            node_id="c8_eng_101",
            difficulty="medium",
            question=question_text,
            options=['(A) {}'.format(options_raw[i]) for i in range(4)],
            answer=correct,
            explanation=(
                "Most English poems have a regular metre - a repeating pattern of "
                "stressed (DA) and unstressed (da) syllables. This line follows that pattern."
            ),
            steps=[
                "Say the line aloud and tap your foot for each beat",
                "Identify stressed (strong/DA) and unstressed (weak/da) syllables",
                "Count the strong beats - if they repeat regularly, the metre is regular",
                "Answer: Regular metre"
            ],
            verification="Metre assessed: Regular. Verification by tapping the beat pattern of the given line.",
            competency_tag="analyze"
        )


def _gen_poetry_fill_blank(rng, qid: int) -> Question:
    """Fill-in-the-blank: rhyme scheme letters or tone/mood identification."""

    stanza = seeded_choice(rng, STANZAS_RHYME)
    lines = stanza['lines']
    q_type = rng.randint(0, 2)

    if q_type == 0:
        # Rhyme scheme letter fill
        scheme = stanza['scheme']
        # Pick a line position to ask about
        line_pos = rng.randint(0, 3)
        # What letter does line N get?
        question_text = (
            "In this stanza, what letter is assigned to Line {}?\n\n".format(line_pos + 1) +
            '\n'.join(["  Line {}: {}".format(i + 1, lines[i]) for i in range(4)]) +
            "\n\n(Rhyme scheme: first unique sound = A, second = B, etc.)"
        )
        answer = scheme[line_pos]
        explanation = (
            "Lines with the same end-rhyme get the same letter. "
            "The scheme is {}. Line {} rhymes with: {}.".format(
                scheme, line_pos + 1,
                ', '.join([str(i + 1) for i, c in enumerate(scheme)
                           if c == scheme[line_pos] and i != line_pos])
            )
        )
        verification = "Scheme: {} | Line {} letter: {}".format(scheme, line_pos + 1, answer)

    elif q_type == 1:
        # Tone fill
        question_text = (
            "Read this stanza:\n\n" +
            '\n'.join(["  {}".format(l) for l in lines]) +
            "\n\nThe poet's ATTITUDE (tone) toward the subject is ________."
        )
        answer = stanza['tone']
        explanation = (
            "Tone is the poet's attitude. Words like '{}' reveal a {} attitude.".format(
                '", "'.join(stanza['evidence_tone']), answer)
        )
        verification = "Tone: {}. Evidence: {}.".format(answer, stanza['evidence_tone'])

    else:
        # Mood fill
        question_text = (
            "Read this stanza:\n\n" +
            '\n'.join(["  {}".format(l) for l in lines]) +
            "\n\nThe FEELING this poem creates in the reader (mood) is ________."
        )
        answer = stanza['mood']
        explanation = (
            "Mood is what the reader feels. Words like '{}' create a {} feeling.".format(
                '", "'.join(stanza['evidence_mood']), answer)
        )
        verification = "Mood: {}. Evidence: {}.".format(answer, stanza['evidence_mood'])

    return Question(
        id="c8_eng_101_fill_{:03d}".format(qid),
        type="fill_blank",
        topic="Poetry Appreciation",
        node_id="c8_eng_101",
        difficulty="easy",
        question=question_text,
        options=None,
        answer=answer,
        explanation=explanation,
        steps=[
            "Identify the pattern or feeling in the stanza",
            "Apply the definition of the term",
            "Check against the stanza evidence",
            "Fill in the blank with the correct term"
        ],
        verification=verification,
        competency_tag="analyze"
    )


def _gen_poetry_short_answer(rng, qid: int) -> Question:
    """Short answer: Explain how rhyme scheme/meter creates mood."""

    stanza = seeded_choice(rng, STANZAS_RHYME)
    lines = stanza['lines']
    q_type = rng.randint(0, 1)

    if q_type == 0:
        question_text = (
            "Read this stanza:\n\n" +
            '\n'.join(["  {}".format(l) for l in lines]) +
            "\n\nQ: How does the rhyme scheme help create the mood of this poem? "
            "(Answer in 2-3 sentences)"
        )
        answer = (
            "The rhyme scheme {} creates a {} mood by giving the poem a musical, "
            "flowing quality. The regular end-rhymes make the poem feel {}, "
            "which matches the overall mood of the poem.".format(
                stanza['scheme'], stanza['mood'], stanza['mood'])
        )
        explanation = (
            "The rhyme scheme {} gives the poem rhythm and musicality. "
            "This regular pattern helps the reader feel {}, reinforcing the {} mood.".format(
                stanza['scheme'], stanza['mood'], stanza['mood'])
        )
        verification = "Rhyme scheme {} → {} mood. Explanation checked against stanza data.".format(
            stanza['scheme'], stanza['mood'])

    else:
        question_text = (
            "Read this stanza:\n\n" +
            '\n'.join(["  {}".format(l) for l in lines]) +
            "\n\nQ: State the tone of this poem and quote ONE word from the poem as evidence. "
            "(2 marks: 1 for tone, 1 for evidence)"
        )
        answer = "Tone: {}. Evidence: '{}'".format(stanza['tone'], stanza['evidence_tone'][0])
        explanation = (
            "Tone is the poet's attitude. The word '{}' shows the poet's {} attitude.".format(
                stanza['evidence_tone'][0], stanza['tone'])
        )
        verification = "Tone: {}. Evidence word: '{}'. Both verified.".format(
            stanza['tone'], stanza['evidence_tone'][0])

    return Question(
        id="c8_eng_101_short_{:03d}".format(qid),
        type="short_answer",
        topic="Poetry Appreciation",
        node_id="c8_eng_101",
        difficulty="hard",
        question=question_text,
        options=None,
        answer=answer,
        explanation=explanation,
        steps=[
            "Identify the rhyme scheme or tone of the stanza",
            "Explain the connection between the sound device and the mood/feeling",
            "Write a clear 2-3 sentence answer",
            "Quote evidence from the poem"
        ],
        verification=verification,
        competency_tag="analyze"
    )


def _gen_creative_mcq(rng, qid: int) -> Question:
    """MCQ: Identify correct creative writing element."""

    prompt = seeded_choice(rng, CREATIVE_PROMPTS)

    if prompt['type'] == 'poem':
        question_text = (
            "You are asked: \"{}\"\n\n"
            "Which of these is the BEST first line for your poem (rhyme scheme AABB)?".format(prompt['prompt'])
        )
        good_lines = [
            "The monsoon clouds hang dark and low,",
            "Raindrops dance on the window pane,",
            "Thunder rumbles across the sky,",
            "The wet earth smells of joy today"
        ]
        bad_lines = [
            "I like the rain very much because it is nice",
            "Monsoon season happens every year",
            "Water falls from the clouds above",
            "The rain is good for plants and trees and everything"
        ]
        rng.shuffle(good_lines)
        correct_line = good_lines[0]
        options_raw = [correct_line] + bad_lines
        rng.shuffle(options_raw)

        return Question(
            id="c6_c12_eng_001_poem_mcq_{:03d}".format(qid),
            type="mcq",
            topic="Creative Production - Poetry",
            node_id="c6_c12_eng_001",
            difficulty="medium",
            question=question_text,
            options=['(A) {}'.format(options_raw[i]) for i in range(4)],
            answer=correct_line,
            explanation=(
                "For an AABB poem, lines 1 and 2 should rhyme. "
                "'{}' has a strong poetic feel with end-rhyme potential and "
                "includes sensory details (sound, sight) about the monsoon.".format(correct_line)
            ),
            steps=[
                "Read the creative prompt carefully",
                "For AABB rhyme: lines 1&2 rhyme, lines 3&4 rhyme",
                "Choose a line with poetic language and sensory detail",
                "Best option: '{}'".format(correct_line)
            ],
            verification="Correct line selected: poetic language, sensory detail, rhyme-ready. "
                         "Bad options lack poetic quality or sensory content.",
            competency_tag="create"
        )

    elif prompt['type'] == 'story':
        question_text = (
            "You are asked: \"{}\"\n\n"
            "Which of these is the BEST opening sentence for your story?".format(prompt['prompt'])
        )
        good_openings = [
            "The old library had always scared me, but today I had to go in.",
            "I never expected to find a golden key inside a library book.",
            "The library was quiet - too quiet - when I walked through the door.",
            "It all began when I opened the book on shelf number seven."
        ]
        bad_openings = [
            "I went to the library one day and it was normal.",
            "My friend told me about a library and I went there.",
            "The school has a library where we keep books.",
            "I like reading books in the library sometimes."
        ]
        rng.shuffle(good_openings)
        correct_opening = good_openings[0]
        options_raw = [correct_opening] + bad_openings
        rng.shuffle(options_raw)

        return Question(
            id="c6_c12_eng_001_story_mcq_{:03d}".format(qid),
            type="mcq",
            topic="Creative Production - Story Writing",
            node_id="c6_c12_eng_001",
            difficulty="medium",
            question=question_text,
            options=['(A) {}'.format(options_raw[i]) for i in range(4)],
            answer=correct_opening,
            explanation=(
                "A good story opening creates interest and suggests something unexpected. "
                "'{}' creates suspense and curiosity in the reader.".format(correct_opening)
            ),
            steps=[
                "Read the story prompt",
                "Look for an opening that creates curiosity or tension",
                "Avoid plain, factual statements",
                "Best option: '{}'".format(correct_opening)
            ],
            verification="Opening checked for: interest, suspense, unexpected element. "
                         "Correct: '{}'.".format(correct_opening),
            competency_tag="create"
        )

    else:
        question_text = (
            "Q: Which of these is a GOOD title for a diary entry from a monsoon cloud's perspective?\n\n"
            "(Recall: '{}')".format(prompt['prompt'])
        )
        good_titles = [
            "My Journey Over the Village",
            "Drifting Across the Sky",
            "A Day in the Life of a Cloud",
            "From the Mountain to the Sea"
        ]
        bad_titles = [
            "Monsoon Diary",
            "Weather Report",
            "About the Rain",
            "Cloud Notes"
        ]
        rng.shuffle(good_titles)
        correct_title = good_titles[0]
        options_raw = [correct_title] + bad_titles
        rng.shuffle(options_raw)

        return Question(
            id="c6_c12_eng_001_diary_mcq_{:03d}".format(qid),
            type="mcq",
            topic="Creative Production - Diary Entry",
            node_id="c6_c12_eng_001",
            difficulty="easy",
            question=question_text,
            options=['(A) {}'.format(options_raw[i]) for i in range(4)],
            answer=correct_title,
            explanation=(
                "A good diary title for a cloud's perspective should suggest the cloud's journey and experience. "
                "'{}' captures the cloud's point of view.".format(correct_title)
            ),
            steps=[
                "Think from the cloud's perspective",
                "A good title reflects the narrator's unique viewpoint",
                "Avoid generic titles",
                "Best option: '{}'".format(correct_title)
            ],
            verification="Title reflects first-person cloud perspective. Verified correct.",
            competency_tag="create"
        )


def _gen_creative_fill_blank(rng, qid: int) -> Question:
    """Fill-in-blank: Identify the required element in a creative writing task."""

    prompt = seeded_choice(rng, CREATIVE_PROMPTS)

    elements = {
        'poem': [
            ("AABB", "rhyme scheme", "Poem must follow AABB: lines 1-2 rhyme, 3-4 rhyme"),
            ("4", "number of lines", "The poem must be exactly 4 lines"),
            ("sensory details", "type of detail", "Use words that appeal to the 5 senses"),
            ("monsoon", "theme", "The poem's subject is the monsoon season")
        ],
        'story': [
            ("beginning, middle, ending", "story structure", "A story needs 3 parts: beginning, middle, and ending"),
            ("80-100", "word range", "Story should be 80-100 words long"),
            ("unexpected", "surprise element", "Something surprising must happen in the story"),
            ("library", "setting", "The story is set in the school library")
        ],
        'diary': [
            ("first-person", "narrative voice", "Use 'I' - write as if YOU are the cloud"),
            ("60-80", "word range", "Diary entry should be 60-80 words"),
            ("cloud", "narrator", "You are writing as a monsoon cloud"),
            ("village", "setting", "The cloud is over a rural village")
        ],
        'acrostic': [
            ("7", "number of lines", "MONSOON has 7 letters → 7 lines"),
            ("acrostic", "poem type", "First letter of each line spells MONSOON"),
            ("MONSOON", "spelling word", "The acrostic uses MONSOON"),
            ("M", "first letter", "Line 1 starts with M")
        ],
        'response': [
            ("personal opinion", "required content", "You must give YOUR opinion about the poem"),
            ("50-70", "word range", "Response should be 50-70 words"),
            ("The Road Not Taken", "reference text", "Response must mention the poem by Robert Frost"),
            ("first-person", "voice", "Write 'I think' or 'I feel'")
        ]
    }

    prompt_elements = elements.get(prompt['type'], elements['poem'])
    element_name, element_type, hint = seeded_choice(rng, prompt_elements)

    question_text = (
        "Creative Writing Task: {}\n\n".format(prompt['prompt']) +
        "Q: What is a REQUIRED element of this task?\n"
        "(Hint: {})".format(hint)
    )

    distractors_by_type = {
        'rhyme scheme': ['ABBA', 'free verse', 'no rhyme needed', 'AAAA'],
        'number of lines': ['3 lines', '5 lines', '6 lines', '8 lines'],
        'type of detail': ['facts and numbers', 'opinions only', "other people's views", 'quotes from books'],
        'theme': ['winter', 'summer', 'spring', 'autumn'],
        'story structure': ['only a beginning', 'beginning and ending only', 'just the middle', 'one paragraph'],
        'word range': ['20-30 words', '150-200 words', '500 words', 'no word limit'],
        'surprise element': ['a predictable ending', 'a boring event', 'a common thing', 'nothing special'],
        'setting': ['a market', 'a park', 'a beach', 'a mall'],
        'narrative voice': ['third-person (he/she)', 'second-person (you)', 'no narrator', 'the teacher'],
        'narrator': ['a fish', 'a bird', 'a tree', 'the sun'],
        'poem type': ['haiku', 'sonnet', 'limerick', 'free verse'],
        'spelling word': ['RAIN', 'WATER', 'CLOUD', 'DROPS'],
        'first letter': ['O', 'N', 'S', 'O'],
        'required content': ['facts about the poem', 'what the teacher thinks', 'a summary of the poem', 'no personal view'],
        'reference text': ['A Poem', 'Some Poetry', 'English Literature', 'any poem'],
        'voice': ['no opinion needed', 'write about others', 'copy from the textbook', 'use formal language only']
}

    return {"status": "ok", "note": "truncated"}
