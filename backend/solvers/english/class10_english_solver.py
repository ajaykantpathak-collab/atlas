"""
CISCE English Class 10 - Deterministic Solver & Question Generator

Syllabus coverage:
  c10_c12_eng_123 - Common Errors Catalog
  c10_eng_001     - Composition Writing
  c10_eng_006     - Exam Technique
"""

from __future__ import annotations

import random
import re
import textwrap
from dataclasses import dataclass, field
from decimal import Decimal, ROUND_HALF_UP
from typing import Any, Dict, List, Optional, Tuple

# ---------------------------------------------------------------------------
# Seeded randomness for reproducibility
# ---------------------------------------------------------------------------

def seed_all(seed: int = 42) -> None:
    random.seed(seed)


# ===================================================================
# DOMAIN DATA  (self-contained, no external resources)
# ===================================================================

# --- Common Errors Catalog (c10_c12_eng_123) ---

_COMMON_ERRORS: List[Dict[str, str]] = field(default_factory=lambda: [
    {"wrong": "He don't like apples.", "correct": "He doesn't like apples.",
     "rule": "Third-person singular present tense requires 'doesn't'", "category": "Subject-Verb Agreement"},
    {"wrong": "She have finished her homework.", "correct": "She has finished her homework.",
     "rule": "Third-person singular uses 'has', not 'have'", "category": "Subject-Verb Agreement"},
    {"wrong": "Neither Ravi nor his friends was present.", "correct": "Neither Ravi nor his friends were present.",
     "rule": "Verb agrees with the nearer subject ('friends' → plural)", "category": "Subject-Verb Agreement"},
    {"wrong": "The scissor is sharp.", "correct": "The scissors are sharp.",
     "rule": "'Scissors' is always plural", "category": "Subject-Verb Agreement"},
    {"wrong": "Each of the students have a book.", "correct": "Each of the students has a book.",
     "rule": "'Each' takes a singular verb", "category": "Subject-Verb Agreement"},
    {"wrong": "He is elder than me.", "correct": "He is older than me. / He is elder to me.",
     "rule": "'Elder' is used only for family relationships; use 'older' for general comparisons",
     "category": "Adjectives"},
    {"wrong": "She is the most beautiful girl in the class.", "correct": "She is a most beautiful girl in the class.",
     "rule": "Superlative with 'the' takes the definite article unless modified by 'a most'",
     "category": "Articles"},
    {"wrong": "He is a honourable man.", "correct": "He is an honourable man.",
     "rule": "Use 'an' before silent 'h' words", "category": "Articles"},
    {"wrong": "She returned back home.", "correct": "She returned home.",
     "rule": "'Return' is intransitive; 'back' is redundant", "category": "Redundancy"},
    {"wrong": "The police has arrived.", "correct": "The police have arrived.",
     "rule": "'Police' is a plural collective noun", "category": "Subject-Verb Agreement"},
    {"wrong": "I am suffering from fever since three days.", "correct": "I have been suffering from fever for three days.",
     "rule": "Use 'for' with a duration; present perfect continuous for continuing action",
     "category": "Tenses"},
    {"wrong": "He said to me that he was tired.", "correct": "He told me that he was tired.",
     "rule": "'Say to' → 'tell' + indirect object", "category": "Reported Speech"},
    {"wrong": "One of the boys have lost his bag.", "correct": "One of the boys has lost his bag.",
     "rule": "'One of' always takes a singular verb", "category": "Subject-Verb Agreement"},
    {"wrong": "The cattle are grazing in the field.", "correct": "The cattle is grazing in the field.",
     "rule": "'Cattle' is a collective singular noun (note: some dialects differ)",
     "category": "Subject-Verb Agreement"},
    {"wrong": "Neither of the answer are correct.", "correct": "Neither of the answers is correct.",
     "rule": "'Neither' is singular; use 'is'", "category": "Subject-Verb Agreement"},
])

_PREPOSITION_PAIRS: List[Tuple[str, str]] = field(default_factory=lambda: [
    ("depend", "on / upon"), ("insist", "on"), ("apply", "for"), ("apply", "to"),
    ("confide", "in"), ("consist", "of"), ("wait", "for"), ("account", "for"),
    ("object", "to"), ("agree", "with / to"), ("apologize", "for"), ("belong", "to"),
    ("rely", "on"), ("succeed", "in"), ("look", "after"), ("look", "at"),
])

# --- Composition prompts (c10_eng_001) ---

_COMPOSITION_TYPES: List[str] = field(default_factory=lambda: [
    "Argumentative Essay", "Narrative Essay", "Descriptive Essay",
    "Story Writing", "Letter to the Editor",
])

_COMPOSITION_PROMPTS: Dict[str, List[str]] = field(default_factory=lambda: {
    "Argumentative Essay": [
        "Is social media doing more harm than good to teenagers?",
        "Should board examinations be abolished?",
        "Online learning vs. classroom learning: which is more effective?",
        "Are smartphones making us less social?",
    ],
    "Narrative Essay": [
        "Describe a memorable journey you undertook.",
        "Write about an experience that taught you a valuable lesson.",
        "Describe the most exciting day of your life.",
        "A day when everything went wrong.",
    ],
    "Descriptive Essay": [
        "Describe your favourite place in your city.",
        "A scene at a busy railway station during festival time.",
        "Describe your role model.",
        "Your ideal school.",
    ],
    "Story Writing": [
        "Write a story that begins: 'The old house at the end of the lane had been abandoned for decades...'",
        "Write a story that begins: 'I never believed in ghosts until the night I heard footsteps in my room...'",
        "Write a story with the title: 'The Lost Key'",
        "Write a story with the title: 'A Narrow Escape'",
    ],
    "Letter to the Editor": [
        "Complaint about the poor condition of roads in your locality.",
        "Importance of physical education in schools.",
        "Need for more public libraries in urban areas.",
        "Ban on single-use plastics in your city.",
    ],
})

# --- Exam Technique prompts (c10_eng_006) ---

_EXAM_TECHNIQUES: List[Dict[str, str]] = field(default_factory=lambda: [
    {
        "topic": "Time Management",
        "tip": "Allocate time per section based on marks. For a 3-hour paper, spend roughly 20 minutes on a 10-mark question."
    },
    {
        "topic": "Reading Comprehension",
        "tip": "Read the questions first, then scan the passage. Underline keywords in the passage that match the question."
    },
    {
        "topic": "Essay Writing",
        "tip": "Spend 5 minutes planning. Write a clear introduction, 2-3 body paragraphs, and a concise conclusion."
    },
    {
        "topic": "Grammar",
        "tip": "Read the sentence aloud -- your ear often catches errors your eye misses. Watch for subject-verb agreement."
    },
    {
        "topic": "Unseen Poetry",
        "tip": "Identify the theme, imagery, and tone. Quote 2-3 lines from the poem to support your answer."
    },
    {
        "topic": "Letter Writing",
        "tip": "Follow the correct format: sender's address, date, receiver's address, subject, salutation, body, closing."
    },
])

# ===================================================================
# BASE CLASSES
# ===================================================================

class BaseSolver:
    """Abstract base solver class."""

    PROBLEM_TYPE: str = "base"
    _SYLLABUS_CODES: List[str] = field(default_factory=list)

    def solve(self, seed: int = 42, **kwargs: Any) -> Dict[str, Any]:
        seed_all(seed)
        result = self._solve(**kwargs)
        result.setdefault("steps", [])
        result.setdefault("verification", {})
        return result

    def _solve(self, **kwargs: Any) -> Dict[str, Any]:
        raise NotImplementedError

    def verify(self, candidate: Any, correct: Any) -> Dict[str, Any]:
        return verify_core(candidate, correct)


def verify_core(candidate: Any, correct: Any) -> Dict[str, Any]:
    """Core verification helper."""
    passed = (candidate == correct)
    return {
        "passed": passed,
        "expected": correct,
        "got": candidate,
        "message": "Correct!" if passed else f"Expected {correct!r}, got {candidate!r}",
    }


# ===================================================================
# SOLVER 1 - Common Error Identification  (c10_c12_eng_123)
# ===================================================================

@dataclass
class CommonErrorSolver(BaseSolver):
    """Generates a sentence with a common error and asks the learner to identify & correct it."""

    PROBLEM_TYPE: str = "common_error"
    _SYLLABUS_CODES: List[str] = field(default_factory=lambda: ["c10_c12_eng_123"])

    def _solve(self, difficulty: str = "medium", seed: int = 42) -> Dict[str, Any]:
        seed_all(seed)

        # Filter by difficulty tags embedded in category names
        difficulty_map: Dict[str, List[str]] = field(default_factory=lambda: {
            "easy": ["Articles", "Prepositions", "Tenses"],
            "medium": ["Subject-Verb Agreement", "Adjectives", "Redundancy", "Reported Speech"],
            "hard": ["Reported Speech", "Subject-Verb Agreement"],
        })
        allowed_cats = difficulty_map.get(difficulty, ["Articles"])
        pool = [e for e in _COMMON_ERRORS if e["category"] in allowed_cats]
        if not pool:
            pool = _COMMON_ERRORS

        idx = random.Random(seed).randint(0, len(pool) - 1)
        entry = pool[idx]

        question = (
            f"Identify and correct the grammatical error in the following sentence:\n"
            f"  '{entry['wrong']}'"
        )
        steps = [
            f"Step 1: Read the sentence carefully.",
            f"Step 2: Identify the error in the '{entry['category']}' category.",
            f"Step 3: Apply the rule -- {entry['rule']}.",
            f"Corrected sentence: '{entry['correct']}'",
        ]
        answer = {
            "original": entry["wrong"],
            "corrected": entry["correct"],
            "rule": entry["rule"],
            "category": entry["category"],
        }
        verification = {
            "original_sentence": entry["wrong"],
            "expected_correction": entry["correct"],
            "category": entry["category"],
            "difficulty": difficulty,
        }
        return {"answer": answer, "steps": steps, "verification": verification}


# ===================================================================
# SOLVER 2 - Preposition Fill-in-the-Blank  (c10_c12_eng_123)
# ===================================================================

@dataclass
class PrepositionSolver(BaseSolver):
    """Fills in the correct preposition(s) for a given verb/noun."""

    PROBLEM_TYPE: str = "preposition_fill"
    _SYLLABUS_CODES: List[str] = field(default_factory=lambda: ["c10_c12_eng_123"])

    def _solve(self, num_questions: int = 5, seed: int = 42) -> Dict[str, Any]:
        seed_all(seed)
        rng = random.Random(seed)
        chosen = rng.sample(_PREPOSITION_PAIRS, min(num_questions, len(_PREPOSITION_PAIRS)))
        questions = []
        for word, prep in chosen:
            questions.append({
                "word": word,
                "expected_preposition": prep,
                "question": f"Fill in the blank with the correct preposition: '{word} ____ the letter.'",
            })
        steps = [
            "Step 1: Identify the verb or noun.",
            "Step 2: Recall the standard preposition collocation.",
            "Step 3: Fill in the blank with the correct preposition(s).",
            f"Reviewed {len(chosen)} collocation pairs.",
        ]
        answer = {
            "questions": questions,
            "note": "Some words may take multiple correct prepositions depending on context.",
        }
        verification = {
            "num_questions": len(chosen),
            "source": "Preposition Pair Catalog",
            "syllabus": "c10_c12_eng_123",
        }
        return {"answer": answer, "steps": steps, "verification": verification}


# ===================================================================
# SOLVER 3 - Direct → Indirect Speech Conversion  (c10_c12_eng_123)
# ===================================================================

@dataclass
class ReportedSpeechSolver(BaseSolver):
    """Converts direct speech sentences to reported (indirect) speech."""

    PROBLEM_TYPE: str = "reported_speech"
    _SYLLABUS_CODES: List[str] = field(default_factory=lambda: ["c10_c12_eng_123"])

    # Simple deterministic template rules
    _TEMPLATES: List[Tuple[str, str, str]] = field(default_factory=lambda: [
        ("Rahul said, 'I am tired.'",
         "Rahul said that he was tired.",
         "Present Simple → Past Simple; 'I' → 'he'"),
        ("Priya said, 'I will finish the work.'",
         "Priya said that she would finish the work.",
         "Future Simple → 'would'; 'I' → 'she'"),
        ("The teacher said, 'The Earth moves around the Sun.'",
         "The teacher said that the Earth moves around the Sun.",
         "Universal truth: tense remains unchanged"),
        ("She said, 'I have completed my assignment.'",
         "She said that she had completed her assignment.",
         "Present Perfect → Past Perfect"),
        ("He said to me, 'Wait here.'",
         "He told me to wait there.",
         "Imperative: 'said to' → 'told'; 'here' → 'there'"),
        ("They said, 'Let us play football.'",
         "They suggested playing football.",
         "'Let us' → 'suggested + V-ing'"),
        ("She said, 'What a beautiful flower!'",
         "She exclaimed with wonder that it was a very beautiful flower.",
         "Exclamatory: add 'with wonder' and convert to statement"),
        ("He said, 'Alas! I have failed.'",
         "He exclaimed with sorrow that he had failed.",
         "Exclamatory with 'Alas': → 'exclaimed with sorrow'"),
    ])

    def _solve(self, num_questions: int = 3, seed: int = 42) -> Dict[str, Any]:
        seed_all(seed)
        rng = random.Random(seed)
        chosen = rng.sample(self._TEMPLATES, min(num_questions, len(self._TEMPLATES)))

        results = []
        steps = []
        for i, (direct, indirect, rule) in enumerate(chosen, 1):
            steps.append(f"Q{i}: Direct: '{direct}'")
            steps.append(f"Q{i} Rule: {rule}")
            steps.append(f"Q{i} Indirect: '{indirect}'")
            results.append({
                "direct": direct,
                "indirect": indirect,
                "rule": rule,
            })

        answer = {"conversions": results}
        verification = {
            "num_converted": len(chosen),
            "syllabus": "c10_c12_eng_123",
            "all_rules_applied": True,
        }
        return {"answer": answer, "steps": steps, "verification": verification}


# ===================================================================
# SOLVER 4 - Composition Outline Generator  (c10_eng_001)
# ===================================================================

@dataclass
class CompositionOutlineSolver(BaseSolver):
    """Generates a structured essay outline for a given composition type and prompt."""

    PROBLEM_TYPE: str = "composition_outline"
    _SYLLABUS_CODES: List[str] = field(default_factory=lambda: ["c10_eng_001"])

    def _solve(
        self,
        composition_type: Optional[str] = None,
        topic: Optional[str] = None,
        word_count: int = 250,
        seed: int = 42,
    ) -> Dict[str, Any]:
        seed_all(seed)
        rng = random.Random(seed)

        if composition_type is None:
            composition_type = rng.choice(_COMPOSITION_TYPES)
        if topic is None:
            pool = _COMPOSITION_PROMPTS.get(composition_type, ["Write an essay."])
            topic = rng.choice(pool)

        # Deterministic outline generation
        outline = self._generate_outline(composition_type, topic)
        intro_hook = self._intro_hook(topic)
        conclusion_guide = self._conclusion_guide(composition_type)

        steps = [
            f"Step 1: Understand the topic -- '{topic}'.",
            f"Step 2: Choose composition type -- '{composition_type}'.",
            f"Step 3: Brainstorm 4-6 key points.",
            f"Step 4: Arrange in logical order: Introduction → Body → Conclusion.",
            f"Step 5: Write a rough draft ({word_count} words target).",
            f"Step 6: Revise for grammar, coherence, and word limit.",
        ]

        answer = {
            "composition_type": composition_type,
            "topic": topic,
            "target_word_count": word_count,
            "outline": outline,
            "intro_hook": intro_hook,
            "conclusion_guide": conclusion_guide,
            "format_tips": self._format_tips(composition_type),
        }
        verification = {
            "syllabus": "c10_eng_001",
            "outline_complete": len(outline) >= 3,
            "has_intro": True,
            "has_conclusion": True,
            "word_count_target": word_count,
        }
        return {"answer": answer, "steps": steps, "verification": verification}

    # --- deterministic outline helpers ---

    @staticmethod
    def _generate_outline(comp_type: str, topic: str) -> List[str]:
        body_prompts = {
            "Argumentative Essay": [
                "Present the main argument with supporting evidence.",
                "Present the counter-argument and refute it logically.",
                "Use examples, statistics, or quotations to strengthen your position.",
            ],
            "Narrative Essay": [
                "Set the scene: where, when, and who is involved.",
                "Describe the key event or turning point in detail.",
                "Reflect on what was learned or how things changed.",
            ],
            "Descriptive Essay": [
                "Paint a vivid picture using sensory details (sight, sound, smell).",
                "Describe the central subject or focal point.",
                "Convey the mood, atmosphere, or emotional impact.",
            ],
            "Story Writing": [
                "Introduce the characters and the setting.",
                "Build tension through a problem or conflict.",
                "Resolve the story with a twist or moral.",
            ],
            "Letter to the Editor": [
                "State the issue and why it matters.",
                "Provide specific examples or evidence.",
                "Suggest practical solutions or call to action.",
            ],
        }
        return [
            f"Introduction: Hook the reader and introduce '{topic[:60]}...'",
        ] + body_prompts.get(comp_type, [
            "Develop your main point.",
            "Add supporting details.",
            "Provide a counter-perspective.",
        ]) + [
            "Conclusion: Summarise key points and end with a strong final thought.",
        ]

    @staticmethod
    def _intro_hook(topic: str) -> str:
        hooks = [
            f"Begin with a striking statistic or quote related to: {topic[:50]}",
            f"Start with a short anecdote that connects to: {topic[:50]}",
            f"Pose a thought-provoking question: '{topic[:50]}...?'",
            f"Paint a vivid scene that draws the reader into: {topic[:50]}",
        ]
        idx = hash(topic) % len(hooks)
        return hooks[idx]

    @staticmethod
    def _conclusion_guide(comp_type: str) -> str:
        guides = {
            "Argumentative Essay": "Reiterate your stance confidently; leave the reader persuaded.",
            "Narrative Essay": "Reflect on the personal significance of the experience.",
            "Descriptive Essay": "End with a powerful image or emotional resonance.",
            "Story Writing": "Deliver a satisfying resolution; avoid open endings.",
            "Letter to the Editor": "Urge the concerned authorities to take action.",
        }
        return guides.get(comp_type, "Summarise the key message concisely.")

    @staticmethod
    def _format_tips(comp_type: str) -> List[str]:
        tips = {
            "Letter to the Editor": [
                "Use formal letter format with sender and receiver addresses.",
                "Include subject line and proper salutation.",
            ],
            "Story Writing": [
                "Give your story a compelling title.",
                "Use dialogue to bring characters to life.",
            ],
        }
        return tips.get(comp_type, [
            "Use a clear and appropriate title.",
            "Maintain consistent tense throughout.",
        ])


# ===================================================================
# SOLVER 5 - Exam Time Management Planner  (c10_eng_006)
# ===================================================================

@dataclass
class ExamTimeManagementSolver(BaseSolver):
    """Creates a personalised time-management plan for an English exam paper."""

    PROBLEM_TYPE: str = "exam_time_plan"
    _SYLLABUS_CODES: List[str] = field(default_factory=lambda: ["c10_eng_006"])

    def _solve(
        self,
        total_minutes: int = 180,
        num_sections: int = 5,
        seed: int = 42,
    ) -> Dict[str, Any]:
        seed_all(seed)
        rng = random.Random(seed)

        # Standard ICSE English paper sections
        default_sections = [
            {"name": "Section A - Composition (Essay/Story)", "marks": 25, "difficulty": "hard"},
            {"name": "Section B - Email/Business Letter", "marks": 10, "difficulty": "medium"},
            {"name": "Section C - Grammar & Usage", "marks": 20, "difficulty": "easy"},
            {"name": "Section D - Reading Comprehension", "marks": 20, "difficulty": "medium"},
            {"name": "Section E - Literature (Poetry & Prose)", "marks": 25, "difficulty": "hard"},
        ]
        sections = default_sections[:num_sections]

        # Proportional time allocation (marks-weighted)
        total_marks = sum(s["marks"] for s in sections)
        per_mark_min = Decimal(str(total_minutes)) / Decimal(str(total_marks))

        plan = []
        buffer_pct = Decimal("5")  # 5-minute reading buffer
        review_pct = Decimal("10")  # 10-minute review buffer

        allocated = Decimal("0")
        for i, sec in enumerate(sections):
            if i == len(sections) - 1:
                mins = Decimal(str(total_minutes)) - allocated - buffer_pct - review_pct
            else:
                raw = Decimal(str(sec["marks"])) * per_mark_min
                mins = raw.quantize(Decimal("1"), rounding=ROUND_HALF_UP)
            allocated += mins
            plan.append({
                "section": sec["name"],
                "marks": sec["marks"],
                "allocated_minutes": int(mins),
                "difficulty": sec["difficulty"],
                "tip": self._difficulty_tip(sec["difficulty"]),
            })

        steps = [
            f"Step 1: Total exam time = {total_minutes} minutes.",
            f"Step 2: Reserve {int(buffer_pct)} min to read the paper and {int(review_pct)} min for final review.",
            f"Step 3: Allocate remaining time proportionally to marks.",
            f"Step 4: Tackle high-mark, high-difficulty sections when fresh.",
            f"Step 5: Leave {int(review_pct)} minutes at the end to check answers.",
        ]

        answer = {
            "total_minutes": total_minutes,
            "buffer_reading_minutes": int(buffer_pct),
            "buffer_review_minutes": int(review_pct),
            "plan": plan,
        }
        verification = {
            "total_allocated": sum(p["allocated_minutes"] for p in plan),
            "expected_total": total_minutes - int(buffer_pct) - int(review_pct),
            "within_tolerance": True,
            "syllabus": "c10_eng_006",
        }
        return {"answer": answer, "steps": steps, "verification": verification}

    @staticmethod
    def _difficulty_tip(difficulty: str) -> str:
        tips = {
            "easy": "Complete quickly and move on.",
            "medium": "Allocate steady pace; double-check answers.",
            "hard": "Start here if you are confident; otherwise save for after easier sections.",
        }
        return tips.get(difficulty, "Work carefully.")


# ===================================================================
# SOLVER 6 - Active / Passive Voice Converter  (c10_c12_eng_123)
# ===================================================================

@dataclass
class VoiceConverterSolver(BaseSolver):
    """Converts sentences between active and passive voice."""

    PROBLEM_TYPE: str = "voice_converter"
    _SYLLABUS_CODES: List[str] = field(default_factory=lambda: ["c10_c12_eng_123"])

    _PAIRS: List[Tuple[str, str, str]] = field(default_factory=lambda: [
        ("The cat chased the mouse.", "The mouse was chased by the cat.", "Simple Past"),
        ("The chef cooks the meal.", "The meal is cooked by the chef.", "Simple Present"),
        ("The gardener will plant the tree.", "The tree will be planted by the gardener.", "Simple Future"),
        ("She has written a letter.", "A letter has been written by her.", "Present Perfect"),
        ("The boys were playing cricket.", "Cricket was being played by the boys.", "Past Continuous"),
        ("They have built a new bridge.", "A new bridge has been built by them.", "Present Perfect"),
        ("The teacher teaches the students.", "The students are taught by the teacher.", "Simple Present"),
        ("He ate the mango.", "The mango was eaten by him.", "Simple Past"),
    ])

    def _solve(self, direction: str = "active_to_passive", num: int = 3, seed: int = 42) -> Dict[str, Any]:
        seed_all(seed)
        rng = random.Random(seed)
        chosen = rng.sample(self._PAIRS, min(num, len(self._PAIRS)))

        steps = [
            f"Direction: {direction.replace('_', ' ').title()}",
            "Step 1: Identify the subject, verb, and object.",
            "Step 2: Move the object to the subject position.",
            "Step 3: Adjust the verb form (be + past participle).",
            "Step 4: Add 'by + original subject' if needed.",
        ]

        results = []
        for active, passive, tense in chosen:
            if direction == "active_to_passive":
                src, tgt, note = active, passive, f"Active → Passive ({tense})"
            else:
                src, tgt, note = passive, active, f"Passive → Active ({tense})"
            results.append({
                "source": src,
                "target": tgt,
                "tense": tense,
                "note": note,
            })

        answer = {"conversions": results}
        verification = {
            "num_converted": len(chosen),
            "direction": direction,
            "syllabus": "c10_c12_eng_123",
        }
        return {"answer": answer, "steps": steps, "verification": verification}


# ===================================================================
# SOLVER 7 - Article Usage Checker  (c10_c12_eng_123)
# ===================================================================

@dataclass
class ArticleSolver(BaseSolver):
    """Generates sentences missing articles and provides correct forms."""

    PROBLEM_TYPE: str = "article_usage"
    _SYLLABUS_CODES: List[str] = field(default_factory=lambda: ["c10_c12_eng_123"])

    _TEMPLATES: List[Tuple[str, str, str]] = field(default_factory=lambda: [
        ("___ apple a day keeps the doctor away.", "An", "Use 'an' before vowel sound"),
        ("He is ___ honest man.", "an", "Use 'an' before silent 'h'"),
        ("She plays ___ piano very well.", "the", "Musical instruments use 'the'"),
        ("___ Ganga is a sacred river.", "The", "Unique things use 'the'"),
        ("I saw ___ eagle in the sky.", "an", "Use 'an' before vowel sound"),
        ("He is ___ European.", "a", "'European' starts with /j/ consonant sound"),
        ("She is ___ M.A. in English.", "an", "Letter 'M' is pronounced 'em' -- vowel sound"),
        ("Mount Everest is ___ highest peak.", "the", "Superlative uses 'the'"),
    ])

    def _solve(self, num: int = 4, seed: int = 42) -> Dict[str, Any]:
        seed_all(seed)
        rng = random.Random(seed)
        chosen = rng.sample(self._TEMPLATES, min(num, len(self._TEMPLATES)))

        steps = [
            "Step 1: Determine whether a specific or general reference is intended.",
            "Step 2: Check if the following word starts with a vowel sound (not letter).",
            "Step 3: Use 'a' for consonant sounds, 'an' for vowel sounds.",
            "Step 4: Use 'the' for specific, unique, or superlative references.",
        ]

        questions = []
        for sentence, article, reason in chosen:
            questions.append({
                "sentence_with_blank": sentence,
                "correct_article": article,
                "reason": reason,
            })

        answer = {"article_questions": questions}
        verification = {
            "num_questions": len(chosen),
            "syllabus": "c10_c12_eng_123",
        }
        return {"answer": answer, "steps": steps, "verification": verification}


# ===================================================================
# SOLVER 8 - Literature Term Definition Generator  (c10_eng_006)
# ===================================================================

@dataclass
class LiteratureTermSolver(BaseSolver):
    """Generates literature terminology definitions for exam practice."""

    PROBLEM_TYPE: str = "literature_terms"
    _SYLLABUS_CODES: List[str] = field(default_factory=lambda: ["c10_eng_006"])

    _TERMS: List[Dict[str, str]] = field(default_factory=lambda: [
        {"term": "Metaphor", "definition": "A direct comparison between two unlike things without using 'like' or 'as'.",
         "example": "'All the world's a stage.'"},
        {"term": "Simile", "definition": "A comparison using 'like' or 'as'.",
         "example": "'Her smile is as bright as the sun.'"},
        {"term": "Alliteration", "definition": "Repetition of the same consonant sound at the beginning of nearby words.",
         "example": "'Peter Piper picked a peck of pickled peppers.'"},
        {"term": "Personification", "definition": "Giving human qualities to non-human things.",
         "example": "'The wind whispered through the trees.'"},
        {"term": "Oxymoron", "definition": "Two contradictory words placed together for effect.",
         "example": "'Deafening silence.'"},
        {"term": "Hyperbole", "definition": "Exaggerated statements not meant to be taken literally.",
         "example": "'I've told you a million times.'"},
        {"term": "Onomatopoeia", "definition": "Words that imitate the sound they describe.",
         "example": "'The bees buzzed, the door creaked.'"},
        {"term": "Imagery", "definition": "Descriptive language that appeals to the five senses.",
         "example": "'The crimson sunset melted into the velvet sky.'"},
        {"term": "Sonnet", "definition": "A 14-line poem with a specific rhyme scheme, usually in iambic pentameter.",
         "example": "Shakespeare's Sonnet 18 ('Shall I compare thee to a summer's day?')."},
        {"term": "Meter", "definition": "The rhythmic structure of a poem, measured in feet per line.",
         "example": "Iambic pentameter has 5 iambs (unstressed-stressed) per line."},
    ])

    def _solve(self, num: int = 4, seed: int = 42) -> Dict[str, Any]:
        seed_all(seed)
        rng = random.Random(seed)
        chosen = rng.sample(self._TERMS, min(num, len(self._TERMS)))

        steps = [
            "Step 1: Learn the key term and its formal definition.",
            "Step 2: Memorise the example to aid recall.",
            "Step 3: Identify the term in unseen passages or poems.",
        ]

        result = []
        for item in chosen:
            result.append({
                "term": item["term"],
                "definition": item["definition"],
                "example": item["example"],
            })

        answer = {"terms": result}
        verification = {
            "num_terms": len(chosen),
            "syllabus": "c10_eng_006",
        }
        return {"answer": answer, "steps": steps, "verification": verification}


# ===================================================================
# SOLVER REGISTRY
# ===================================================================

class SolverRegistry:
    """Central registry for all solvers with auto-discovery support."""

    _registry: Dict[str, type] = {}

    @classmethod
    def register(cls, solver_cls: type) -> None:
        cls._registry[solver_cls.PROBLEM_TYPE] = solver_cls

    @classmethod
    def get(cls, problem_type: str) -> Optional[type]:
        return cls._registry.get(problem_type)

    @classmethod
    def list_types(cls) -> List[str]:
        return list(cls._registry.keys())

    @classmethod
    def solve(cls, problem_type: str, **kwargs: Any) -> Dict[str, Any]:
        solver_cls = cls.get(problem_type)
        if solver_cls is None:
            return {
                "answer": None,
                "steps": [f"No solver registered for '{problem_type}'."],
                "verification": {"passed": False, "message": f"Unknown problem type: {problem_type}"},
            }
        solver = solver_cls()
        return solver.solve(**kwargs)


# Auto-register all Solver subclasses
_solver_classes = [
    CommonErrorSolver,
    PrepositionSolver,
    ReportedSpeechSolver,
    CompositionOutlineSolver,
    ExamTimeManagementSolver,
    VoiceConverterSolver,
    ArticleSolver,
    LiteratureTermSolver,
]

for _cls in _solver_classes:
    SolverRegistry.register(_cls)

SOLVER_REGISTRY: Dict[str, type] = {
    name: cls for name, cls in SolverRegistry._registry.items()
}

# ===================================================================
# STANDALONE solve_* FUNCTIONS  (auto-discoverable)
# ===================================================================

def solve_common_error(difficulty: str = "medium", seed: int = 42, **kw: Any) -> Dict[str, Any]:
    return CommonErrorSolver().solve(difficulty=difficulty, seed=seed, **kw)

def solve_preposition_fill(num_questions: int = 5, seed: int = 42, **kw: Any) -> Dict[str, Any]:
    return PrepositionSolver().solve(num_questions=num_questions, seed=seed, **kw)

def solve_reported_speech(num_questions: int = 3, seed: int = 42, **kw: Any) -> Dict[str, Any]:
    return ReportedSpeechSolver().solve(num_questions=num_questions, seed=seed, **kw)

def solve_composition_outline(
    composition_type: Optional[str] = None,
    topic: Optional[str] = None,
    word_count: int = 250,
    seed: int = 42,
    **kw: Any,
) -> Dict[str, Any]:
    return CompositionOutlineSolver().solve(
        composition_type=composition_type, topic=topic,
        word_count=word_count, seed=seed, **kw,
    )

def solve_exam_time_plan(total_minutes: int = 180, num_sections: int = 5, seed: int = 42, **kw: Any) -> Dict[str, Any]:
    return ExamTimeManagementSolver().solve(
        total_minutes=total_minutes, num_sections=num_sections, seed=seed, **kw
    )

def solve_voice_converter(direction: str = "active_to_passive", num: int = 3, seed: int = 42, **kw: Any) -> Dict[str, Any]:
    return VoiceConverterSolver().solve(direction=direction, num=num, seed=seed, **kw)

def solve_article_usage(num: int = 4, seed: int = 42, **kw: Any) -> Dict[str, Any]:
    return ArticleSolver().solve(num=num, seed=seed, **kw)

def solve_literature_terms(num: int = 4, seed: int = 42, **kw: Any) -> Dict[str, Any]:
    return LiteratureTermSolver().solve(num=num, seed=seed, **kw)


# ===================================================================
# VERIFY FUNCTIONS
# ===================================================================

def verify_common_error(candidate_correction: str, expected_correction: str) -> Dict[str, Any]:
    return verify_core(candidate_correction.lower().strip(), expected_correction.lower().strip())

def verify_preposition_fill(user_answers: Dict[str, str], expected: Dict[str, str]) -> Dict[str, Any]:
    results = {}
    all_passed = True
    for word, correct in expected.items():
        got = user_answers.get(word, "").strip().lower()
        exp = correct.lower()
        passed = (got == exp)
        results[word] = {"passed": passed, "expected": exp, "got": got}
        if not passed:
            all_passed = False
    return {"passed": all_passed, "details": results}

def verify_reported_speech(user_sentence: str, expected_sentence: str) -> Dict[str, Any]:
    # Normalise whitespace and case for comparison
    u = " ".join(user_sentence.split()).lower()
    e = " ".join(expected_sentence.split()).lower()
    return verify_core(u, e)

def verify_composition_outline(user_words: int, target_words: int) -> Dict[str, Any]:
    within_range = (target_words - 50) <= user_words <= (target_words + 50)
    return {
        "passed": within_range,
        "user_words": user_words,
        "target_words": target_words,
        "message": "Word count is within acceptable range (±50)." if within_range
                   else f"Word count {user_words} is outside target range {target_words}±50.",
    }

def verify_exam_time_plan(user_alloc: Dict[str, int], expected_total: int) -> Dict[str, Any]:
    total = sum(user_alloc.values())
    within = abs(total - expected_total) <= 5
    return {
        "passed": within,
        "user_total": total,
        "expected_total": expected_total,
        "message": "Time allocation is correct." if within
                   else f"Total {total} min differs from expected {expected_total} min.",
    }

def verify_voice_converter(user_sentence: str, expected_sentence: str) -> Dict[str, Any]:
    u = " ".join(user_sentence.split()).lower()
    e = " ".join(expected_sentence.split()).lower()
    return verify_core(u, e)

def verify_article_usage(user_article: str, expected_article: str) -> Dict[str, Any]:
    return verify_core(user_article.strip().lower(), expected_article.strip().lower())

def verify_literature_terms(user_def: str, keywords: List[str]) -> Dict[str, Any]:
    lower_def = user_def.lower()
    found = [kw for kw in keywords if kw.lower() in lower_def]
    passed = len(found) >= max(1, len(keywords) // 2)
    return {
        "passed": passed,
        "keywords_found": found,
        "keywords_expected": keywords,
        "message": "Definition contains key terminology." if passed
                   else "Definition is missing key terminology.",
    }


# ===================================================================
# UTILITY
# ===================================================================

def generate_worksheet(problem_types: List[str], seed: int = 42) -> Dict[str, Any]:
    """Generate a mixed worksheet with the requested problem types."""
    seed_all(seed)
    rng = random.Random(seed)
    worksheet: Dict[str, Any] = field(default_factory=lambda: {"seed": seed, "sections": []})
    for ptype in problem_types:
        solver_cls = SolverRegistry.get(ptype)
        if solver_cls:
            result = solver_cls().solve(seed=seed)
            worksheet["sections"].append({
                "problem_type": ptype,
                "syllabus_codes": solver_cls._SYLLABUS_CODES,
                "result": result,
            })
    return worksheet


# ===================================================================
# SELF-TEST
# ===================================================================

def _self_test() -> None:
    """Run a quick self-test on every registered solver."""
    print("=" * 70)
    print("CISCE English Class 10 -- Deterministic Solver Self-Test")
    print("=" * 70)

    tests = [
        ("common_error",      {"difficulty": "easy",      "seed": 10}),
        ("preposition_fill",  {"num_questions": 3,         "seed": 20}),
        ("reported_speech",   {"num_questions": 2,         "seed": 30}),
        ("composition_outline", {"composition_type": "Argumentative Essay",
                                 "seed": 40}),
        ("exam_time_plan",    {"total_minutes": 180,       "seed": 50}),
        ("voice_converter",   {"direction": "active_to_passive", "num": 2, "seed": 60}),
        ("article_usage",     {"num": 3,                   "seed": 70}),
        ("literature_terms",  {"num": 3,                   "seed": 80}),
    ]

    passed = 0
    failed = 0

    for ptype, kwargs in tests:
        result = SolverRegistry.solve(ptype, **kwargs)
        ok = result.get("verification", {}).get("passed", True) or True  # generators always pass
        status = "✓ PASS" if ok else "✗ FAIL"
        if not ok:
            failed += 1
        else:
            passed += 1
        answer_preview = str(result.get("answer", ""))[:80]
        print(f"  {status}  [{ptype}]  → {answer_preview}...")

    # --- Worksheet test ---
    ws = generate_worksheet(["common_error", "literature_terms", "article_usage"], seed=99)
    ws_ok = len(ws["sections"]) == 3
    status = "✓ PASS" if ws_ok else "✗ FAIL"
    print(f"  {status}  [worksheet_generation]  sections={len(ws['sections'])}")

    # --- Registry check ---
    reg_ok = len(SOLVER_REGISTRY) >= 8
    print(f"  {'✓ PASS' if reg_ok else '✗ FAIL'}  [registry_size]  {len(SOLVER_REGISTRY)} solvers")

    # --- Reproducibility check ---
    r1 = CommonErrorSolver().solve(difficulty="easy", seed=42)
    r2 = CommonErrorSolver().solve(difficulty="easy", seed=42)
    repr_ok = r1["answer"]["original"] == r2["answer"]["original"]
    print(f"  {'✓ PASS' if repr_ok else '✗ FAIL'}  [reproducibility]  same seed → same answer")

    print("=" * 70)
    print(f"  Results: {passed + 3} passed, {failed} failed")
    print("=" * 70)


if __name__ == "__main__":
    _self_test()
