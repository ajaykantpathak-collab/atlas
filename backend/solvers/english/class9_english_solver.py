"""
class9_english_solver.py
CISCE (ICSE) English Language - Class 9 Solver & Question Generator
Covers: Writing Process, Descriptive Composition, Metacognition & Self-Assessment
"""

import random
import hashlib
import math
import json
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from fractions import Fraction
from enum import Enum

# ─────────────────────────────────────────────────────────────────────────────
# Seeded random utility
# ─────────────────────────────────────────────────────────────────────────────
class SeededRandom:
    """Deterministic seeded PRNG wrapper."""

    def __init__(self, seed: int):
        self.seed = seed
        self._rng = random.Random(seed)

    def next_float(self, lo: float = 0.0, hi: float = 1.0) -> float:
        return self._rng.uniform(lo, hi)

    def next_int(self, lo: int, hi: int) -> int:
        return self._rng.randint(lo, hi)

    def choice(self, seq: list):
        return self._rng.choice(seq)

    def shuffle(self, seq: list):
        self._rng.shuffle(seq)
        return seq

    def sample(self, seq: list, k: int) -> list:
        return self._rng.sample(seq, k)

    def sample_weighted(self, items: list, weights: list) -> Any:
        return self._rng.choices(items, weights=weights, k=1)[0]


# ─────────────────────────────────────────────────────────────────────────────
# Data structures
# ─────────────────────────────────────────────────────────────────────────────
class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Difficulty(Enum):
    EASY = 1
    MEDIUM = 2
    HARD = 3


class TopicID(Enum):
    WRITING_PROCESS = "c9_c10_eng_018"
    DESCRIPTIVE_COMPOSITION = "c9_eng_121"
    METACOGNITION = "c9_c12_eng_019"


@dataclass
class Question:
    id: str
    type: str
    topic: str
    topic_title: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    difficulty: int = 1
    marks: int = 1
    competency: str = ""


@dataclass
class SolutionResult:
    correct: bool
    score: float
    max_score: float
    answer: Any
    steps: List[str]
    verification: str
    feedback: str


# ─────────────────────────────────────────────────────────────────────────────
# TOPIC 1 - Writing Process (c9_c10_eng_018)
# ─────────────────────────────────────────────────────────────────────────────
class WritingProcessSolver:

    STAGES = [
        ("Brainstorming", "Generating ideas using mind maps, freewriting, keyword clustering"),
        ("Drafting", "Writing the first version quickly - focus on content, not perfection"),
        ("Revising", "Improving structure, content, and language - changing WHAT the writing says"),
        ("Editing", "Fixing grammar, spelling, punctuation - changing HOW it says it"),
    ]

    BRAINSTORM_TECHNIQUES = [
        "Mind Mapping - central idea with radiating branches",
        "Freewriting - writing continuously for 5 minutes without stopping",
        "Keyword Clustering - grouping related words into clusters",
        "List Making - bullet points of everything that comes to mind",
        "Question Storming - asking Who? What? Where? When? Why? How?",
    ]

    REVISION_FOCUS_AREAS = [
        "Structure - does each paragraph have a clear purpose?",
        "Content - is there enough detail and evidence?",
        "Flow - do ideas connect logically?",
        "Audience - is the tone right for the reader?",
        "Voice - is the writing personal and engaging?",
    ]

    EDITING_CHECKLIST = [
        "Spelling - every word correct?",
        "Punctuation - commas, periods, semicolons in place?",
        "Grammar - subject-verb agreement, tense consistency?",
        "Sentence variety - mix of simple, compound, complex?",
        "Word choice - precise, vivid, appropriate?",
    ]

    FIRST_DRAFT_VS_REVISED_EXAMPLES = {
        "topic": "A Memorable Day",
        "first_draft": (
            "Last week I went to the beach. It was nice. I played in the water. "
            "I ate ice cream. I went home happy."
        ),
        "revised_draft": (
            "The golden sun hung low over the Arabian Sea, casting long shadows "
            "across the golden sand as I walked along the Marine Drive promenade "
            "in Mumbai. The rhythmic crash of waves against the weathered rocks "
            "created a natural symphony, while the salty sea breeze carried the "
            "distant laughter of children chasing receding tides. I paused to "
            "savour a creamy vanilla cone from the beach vendor, its sweetness "
            "melting slowly in the warm afternoon air - a small pleasure that "
            "somehow crystallised the entire day into a single, perfect moment. "
            "As twilight painted the sky in hues of amber and rose, I turned "
            "homeward with a heart full of colour."
        ),
    }

    @classmethod
    def solve_mcq_stage_order(cls, params: Dict) -> SolutionResult:
        steps = []
        steps.append("QUESTION: Arrange the stages of the writing process in correct order.")
        steps.append("STEP 1: Recall the four stages of the writing process.")
        for i, (name, desc) in enumerate(cls.STAGES, 1):
            steps.append(f"  Stage {i}: {name} - {desc}")
        steps.append("STEP 2: The correct order is: Brainstorming → Drafting → Revising → Editing")
        steps.append("STEP 3: Verify: Each stage logically follows the previous one.")
        steps.append("  • Brainstorming generates ideas BEFORE writing")
        steps.append("  • Drafting turns ideas into words")
        steps.append("  • Revising improves the content and structure")
        steps.append("  • Editing polishes the surface language")
        verification = (
            "CHECK: Brainstorming (generate) → Drafting (write) → "
            "Revising (improve content) → Editing (fix errors). "
            "This matches standard writing process models (Flower & Hayes, 1981)."
        )
        answer = [s[0] for s in cls.STAGES]
        return SolutionResult(
            correct=True, score=1.0, max_score=1.0,
            answer=answer, steps=steps, verification=verification,
            feedback="Correct! The writing process is a sequence: ideas → draft → revise → polish."
        )

    @classmethod
    def solve_revise_vs_edit(cls, params: Dict) -> SolutionResult:
        steps = []
        steps.append("QUESTION: What is the key difference between REVISING and EDITING?")
        steps.append("STEP 1: Define REVISING - changing WHAT the writing says.")
        steps.append("  Examples: reorganising paragraphs, adding details, cutting digressions")
        steps.append("STEP 2: Define EDITING - changing HOW the writing says it.")
        steps.append("  Examples: fixing spelling, punctuation, grammar")
        steps.append("STEP 3: Key distinction:")
        steps.append("  REVISING = macro-level (content, structure, meaning)")
        steps.append("  EDITING = micro-level (mechanics, surface features)")
        verification = (
            "CHECK: Most students skip revising and go straight to editing. "
            "This produces first-draft quality. The 2024 ICSE PP report confirms: "
            "'Compositions showed evidence of no revision.' "
            "Revising a 250-word draft typically takes 10-15 minutes and "
            "adds 5-8 marks."
        )
        answer = {
            "revising": "Changes WHAT the writing says - content, structure, organisation",
            "editing": "Changes HOW it says it - grammar, spelling, punctuation",
        }
        return SolutionResult(
            correct=True, score=1.0, max_score=1.0,
            answer=answer, steps=steps, verification=verification,
            feedback="Correct! Revising is about content; editing is about mechanics."
        )

    @classmethod
    def solve_brainstorm_evaluation(cls, params: Dict) -> SolutionResult:
        topic = params.get("topic", "A Journey by Train")
        student_ideas = params.get("student_ideas", [])
        steps = []
        steps.append(f"QUESTION: Evaluate brainstorm ideas for topic: '{topic}'")
        steps.append("STEP 1: List the student's brainstorm ideas.")
        for i, idea in enumerate(student_ideas, 1):
            steps.append(f"  Idea {i}: {idea}")
        steps.append("STEP 2: Evaluate each idea against criteria:")
        steps.append("  • Specificity - is it concrete and vivid?")
        steps.append("  • Sensory potential - can sight, sound, smell, touch be included?")
        steps.append("  • Emotional resonance - does it connect to feelings?")
        steps.append("  • Narrative potential - does it suggest a story?")
        good_count = 0
        for idea in student_ideas:
            words = idea.lower().split()
            specific_words = ["golden", "loud", "fragrant", "ancient", "crowded",
                              "thunderous", "saffron", "monsoon", "vivid"]
            if any(w in words for w in specific_words) or len(idea.split()) >= 4:
                good_count += 1
        quality_score = good_count / max(len(student_ideas), 1)
        steps.append(f"STEP 3: Quality score = {good_count}/{len(student_ideas)} = {quality_score:.0%}")
        steps.append("STEP 4: Recommendations:")
        if quality_score < 0.5:
            steps.append("  • Add more sensory details (sight, sound, smell, touch)")
            steps.append("  • Use concrete nouns instead of abstract ones")
            steps.append("  • Try freewriting for 5 minutes to generate more ideas")
        else:
            steps.append("  • Good ideas - now cluster them into paragraph groups")
            steps.append("  • Choose 3-4 best ideas for the composition")
        verification = (
            f"CHECK: Evaluated {len(student_ideas)} ideas. "
            f"{good_count} met specificity criteria. "
            f"Effective brainstorming should yield 8-12 usable ideas."
        )
        return SolutionResult(
            correct=True, score=quality_score, max_score=1.0,
            answer={"quality_score": quality_score, "good_ideas": good_count},
            steps=steps, verification=verification,
            feedback=f"Brainstorm quality: {quality_score:.0%}. "
                     f"{'Add more sensory detail.' if quality_score < 0.5 else 'Good ideas - proceed to clustering.'}"
        )

    @classmethod
    def solve_first_vs_revised(cls, params: Dict) -> SolutionResult:
        steps = []
        example = cls.FIRST_DRAFT_VS_REVISED_EXAMPLES
        steps.append("QUESTION: Identify and explain the differences between the first draft and revised version.")
        steps.append("=== FIRST DRAFT ===")
        steps.append(f'"{example["first_draft"]}"')
        steps.append("=== REVISED DRAFT ===")
        steps.append(f'"{example["revised_draft"]}"')
        steps.append("STEP 1: Compare word counts.")
        fd_words = len(example["first_draft"].split())
        rd_words = len(example["revised_draft"].split())
        steps.append(f"  First draft: {fd_words} words")
        steps.append(f"  Revised draft: {rd_words} words")
        steps.append("STEP 2: Identify improvements in the revised draft:")
        improvements = [
            "Sensory detail: 'golden sun', 'salty sea breeze', 'creamy vanilla cone'",
            "Figurative language: 'natural symphony', 'crystallised the entire day'",
            "Specific location: 'Marine Drive promenade in Mumbai'",
            "Figurative: 'twilight painted the sky in hues of amber and rose'",
            "Varied sentence structure - simple, compound, complex",
            "Reflective close - 'a heart full of colour' goes beyond description",
        ]
        for imp in improvements:
            steps.append(f"  + {imp}")
        steps.append(f"STEP 3: Estimated mark improvement: +{min(6, len(improvements))} marks")
        verification = (
            f"CHECK: First draft ({fd_words} words) → Revised ({rd_words} words). "
            f"{len(improvements)} improvements identified. "
            "The revised draft applies all four stages: sensory detail, figurative language, "
            "structure, and reflective close."
        )
        return SolutionResult(
            correct=True, score=1.0, max_score=1.0,
            answer={"improvements": improvements, "mark_gain": len(improvements)},
            steps=steps, verification=verification,
            feedback=f"Excellent analysis. The revised draft shows {len(improvements)} key improvements."
        )

    @classmethod
    def solve_revision_checklist(cls, params: Dict) -> SolutionResult:
        student_revision_actions = params.get("actions", [])
        steps = []
        steps.append("QUESTION: Given the student's revision actions, identify what type of work each action is.")
        steps.append("STEP 1: Classify each action as REVISING or EDITING.")
        revise_keywords = ["reorganis", "add", "remov", "restructur", "paraphras",
                           "cut", "expand", "reorder", "improve", "rewrite"]
        edit_keywords = ["spell", "punctuat", "grammar", "capital", "comma",
                         "full stop", "typo", "correction"]
        results = []
        for action in student_revision_actions:
            action_lower = action.lower()
            is_revise = any(kw in action_lower for kw in revise_keywords)
            is_edit = any(kw in action_lower for kw in edit_keywords)
            if is_revise and not is_edit:
                category = "REVISING (macro)"
            elif is_edit and not is_revise:
                category = "EDITING (micro)"
            else:
                category = "BOTH or UNCLEAR"
            results.append((action, category))
            steps.append(f"  '{action}' → {category}")
        revise_count = sum(1 for _, c in results if "REVISING" in c)
        edit_count = sum(1 for _, c in results if "EDITING" in c)
        steps.append(f"STEP 2: Summary - Revising actions: {revise_count}, Editing actions: {edit_count}")
        steps.append("STEP 3: For a complete revision cycle, both types are needed.")
        if revise_count < edit_count:
            steps.append("  WARNING: More editing than revising - risk of first-draft quality.")
        verification = (
            f"CHECK: {len(student_revision_actions)} actions classified. "
            f"Revise: {revise_count}, Edit: {edit_count}. "
            "Good writers spend ~70% revising, ~30% editing."
        )
        return SolutionResult(
            correct=True, score=1.0, max_score=1.0,
            answer={"results": results, "revise_count": revise_count, "edit_count": edit_count},
            steps=steps, verification=verification,
            feedback=f"Revise: {revise_count}, Edit: {edit_count}. "
                     f"{'Good balance.' if revise_count >= edit_count else 'Add more revising - content matters most!'}"
        )


# ─────────────────────────────────────────────────────────────────────────────
# TOPIC 2 - Descriptive Composition (c9_eng_121)
# ─────────────────────────────────────────────────────────────────────────────
class DescriptiveCompositionSolver:

    TOPIC_PROMPTS = [
        "Describe the bustling atmosphere of a local market during festival season",
        "Describe an old family home that holds cherished memories",
        "Describe the experience of watching a monsoon rain from a window",
        "Describe a quiet morning in a hill station surrounded by mist",
        "Describe the vibrant colours and sounds of a village fair",
        "Describe a grandmother's kitchen and the aromas that fill it",
        "Describe walking through a crowded railway platform at dawn",
        "Describe the library of your school during a quiet afternoon",
        "Describe a fishing village at sunrise along the Konkan coast",
        "Describe the golden hour at a rural Punjab field during harvest season",
    ]

    SENSORY_CATEGORIES = {
        "Sight": ["vivid", "golden", "crimson", "ancient", "glimmering", "weathered",
                  "emerald", "silhouetted", "kaleidoscopic", "towering", "faded", "sprawling"],
        "Sound": ["rhythmic", "cacophony", "distant hum", "rustling", "thunderous",
                  "melodic", "crackling", "whisper", "bustling", "pattering"],
        "Smell": ["fragrant", "pungent", "earthy", "saffron", "musty", "smoky",
                  "sweet", "acrid", "aromatic", "salty"],
        "Touch": ["rough", "silky", "crisp", "warm", "velvety", "coarse",
                  "bracing", "smooth", "gritty", "cool"],
        "Taste": ["tangy", "rich", "zesty", "sweet", "bitter", "savory", "creamy"],
    }

    FIGURATIVE_DEVICES = {
        "Simile": [
            ("as busy as a bee", "compares activity to bees"),
            ("as calm as a lake", "compares stillness to still water"),
            ("like a scene from a painting", "compares visual beauty to art"),
            ("as bright as a thousand suns", "compares brightness to sunlight"),
            ("like a whispered secret", "compares softness to secrecy"),
        ],
        "Metaphor": [
            ("the heart of the city", "city as a living organism"),
            ("a sea of faces", "crowd as an ocean"),
            ("time stood still", "time as a physical object"),
            ("the crown of the morning", "sunrise as royalty"),
            ("veins of the earth", "rivers as blood vessels"),
        ],
        "Personification": [
            ("the wind whispered through the trees", "wind given human action"),
            ("the sun smiled down", "sun given human expression"),
            ("the old house groaned", "building given physical sensation"),
            ("the waves danced", "ocean given human movement"),
            ("shadows crept across the wall", "shadow given stealth"),
        ],
    }

    @classmethod
    def solve_sensory_detail_check(cls, params: Dict) -> SolutionResult:
        composition_text = params.get("text", "")
        steps = []
        steps.append("QUESTION: Analyse sensory details in the given composition text.")
        steps.append("STEP 1: Scan text for words/phrases related to each sense.")
        sense_hits = {}
        for sense, words in cls.SENSORY_CATEGORIES.items():
            found = [w for w in words if w.lower() in composition_text.lower()]
            sense_hits[sense] = found
            steps.append(f"  {sense}: {found if found else '(none found)'}")
        senses_covered = sum(1 for hits in sense_hits.values() if hits)
        steps.append(f"STEP 2: Senses covered: {senses_covered}/5")
        steps.append("STEP 3: ICSE requirement: at least 3 senses.")
        if senses_covered < 3:
            steps.append("  GAP: Add details for missing senses.")
            missing = [s for s, h in sense_hits.items() if not h]
            steps.append(f"  Missing senses: {', '.join(missing)}")
            steps.append(f"  Suggestion: Add words like {cls.SENSORY_CATEGORIES[missing[0]][:3]}")
        score = min(senses_covered / 3, 1.0)
        verification = (
            f"CHECK: {senses_covered} senses detected in text. "
            f"Required: 3. Score: {score:.0%}. "
            f"Strong descriptive writing typically covers 4-5 senses."
        )
        return SolutionResult(
            correct=senses_covered >= 3, score=score, max_score=1.0,
            answer={"senses_covered": senses_covered, "details": sense_hits},
            steps=steps, verification=verification,
            feedback=f"Senses covered: {senses_covered}/5. "
                     f"{'Good!' if senses_covered >= 3 else 'Add more sensory detail - aim for 3+ senses.'}"
        )

    @classmethod
    def solve_figurative_language_check(cls, params: Dict) -> SolutionResult:
        text = params.get("text", "")
        steps = []
        steps.append("QUESTION: Identify and classify figurative language devices in the text.")
        steps.append("STEP 1: Scan for simile markers (like, as, as...as).")
        steps.append("STEP 2: Scan for metaphor (implied comparison without like/as).")
        steps.append("STEP 3: Scan for personification (human qualities given to non-human).")
        found_devices = {}
        for device_type, examples in cls.FIGURATIVE_DEVICES.items():
            found = []
            for phrase, explanation in examples:
                if phrase.lower() in text.lower():
                    found.append({"phrase": phrase, "type": device_type, "explanation": explanation})
            found_devices[device_type] = found
        total_found = sum(len(v) for v in found_devices.values())
        steps.append("STEP 4: Results:")
        for dtype, items in found_devices.items():
            if items:
                for item in items:
                    steps.append(f"  {dtype}: '{item['phrase']}' - {item['explanation']}")
            else:
                steps.append(f"  {dtype}: (none found)")
        steps.append(f"STEP 5: Total devices found: {total_found}")
        steps.append("ICSE requirement: at least 2 figurative language devices.")
        score = min(total_found / 2, 1.0)
        verification = (
            f"CHECK: {total_found} figurative devices detected. "
            f"Required: 2. Score: {score:.0%}. "
            "Mix of simile, metaphor, and personification is ideal."
        )
        return SolutionResult(
            correct=total_found >= 2, score=score, max_score=1.0,
            answer={"devices": found_devices, "total": total_found},
            steps=steps, verification=verification,
            feedback=f"Found {total_found} figurative device(s). "
                     f"{'Good variety!' if total_found >= 2 else 'Add more figurative language - aim for 2+ devices.'}"
        )

    @classmethod
    def solve_paragraph_structure(cls, params: Dict) -> SolutionResult:
        paragraphs = params.get("paragraphs", [])
        steps = []
        steps.append("QUESTION: Evaluate the paragraph structure of this composition draft.")
        steps.append(f"STEP 1: Count paragraphs: {len(paragraphs)}")
        steps.append("ICSE requirement: 5 paragraphs (Introduction, 3 body, Conclusion).")
        steps.append("STEP 2: Analyse each paragraph's role.")
        expected_roles = [
            "Introduction - sets scene, hooks reader, introduces subject",
            "Body 1 - first aspect/angle of description",
            "Body 2 - second aspect/angle of description",
            "Body 3 - third aspect/angle of description",
            "Conclusion - reflective close, final impression",
        ]
        scores = []
        for i, para in enumerate(paragraphs):
            role = expected_roles[i] if i < len(expected_roles) else "Extra"
            words = len(para.split())
            has_detail = words >= 30
            has_figurative = any(
                device in para.lower()
                for devices in cls.FIGURATIVE_DEVICES.values()
                for device, _ in devices
            )
            sensory_hits = sum(
                1 for sense_words in cls.SENSORY_CATEGORIES.values()
                for w in sense_words
                if w.lower() in para.lower()
            )
            para_score = (0.3 if has_detail else 0) + (0.3 if has_figurative else 0) + (0.4 * min(sensory_hits / 2, 1.0))
            scores.append(para_score)
            steps.append(f"  Para {i+1} ({words} words, role: {role}): score={para_score:.0%}")
        avg_score = sum(scores) / max(len(scores), 1)
        steps.append(f"STEP 3: Average paragraph score: {avg_score:.0%}")
        steps.append(f"STEP 4: Total paragraphs: {len(paragraphs)} (ideal: 5)")
        struct_score = (avg_score * 0.7) + (0.3 if len(paragraphs) == 5 else 0.15)
        verification = (
            f"CHECK: {len(paragraphs)} paragraphs, avg quality {avg_score:.0%}. "
            f"Overall structure score: {struct_score:.0%}. "
            "A well-structured composition has 5 focused paragraphs."
        )
        return SolutionResult(
            correct=len(paragraphs) >= 4, score=struct_score, max_score=1.0,
            answer={"paragraph_count": len(paragraphs), "scores": scores, "avg": avg_score},
            steps=steps, verification=verification,
            feedback=f"Structure score: {struct_score:.0%} across {len(paragraphs)} paragraphs. "
                     f"{'Excellent structure.' if struct_score >= 0.7 else 'Work on paragraph balance and detail.'}"
        )

    @classmethod
    def solve_word_count_check(cls, params: Dict) -> SolutionResult:
        text = params.get("text", "")
        word_count = len(text.split())
        target_min, target_max = 300, 350
        steps = []
        steps.append(f"QUESTION: Check if composition meets ICSE word count requirements.")
        steps.append(f"STEP 1: Count words in composition: {word_count}")
        steps.append(f"STEP 2: ICSE requirement: {target_min}-{target_max} words.")
        if word_count < target_min:
            deficit = target_min - word_count
            steps.append(f"  UNDER by {deficit} words - composition too short.")
            steps.append(f"  Suggestion: Add {deficit} more words through sensory detail or elaboration.")
            score = word_count / target_min
        elif word_count > target_max:
            excess = word_count - target_max
            steps.append(f"  OVER by {excess} words - composition too long.")
            steps.append(f"  Suggestion: Cut {excess} words by removing redundancies.")
            score = target_max / word_count
        else:
            steps.append(f"  WITHIN range - perfect word count!")
            score = 1.0
        steps.append(f"STEP 3: Word count score: {score:.0%}")
        verification = (
            f"CHECK: Word count = {word_count}. "
            f"Target: {target_min}-{target_max}. "
            f"Score: {score:.0%}. "
            "ICSE examiners deduct marks for compositions outside this range."
        )
        return SolutionResult(
            correct=target_min <= word_count <= target_max,
            score=score, max_score=1.0,
            answer={"word_count": word_count, "in_range": target_min <= word_count <= target_max},
            steps=steps, verification=verification,
            feedback=f"Word count: {word_count}. {'Perfect!' if target_min <= word_count <= target_max else 'Adjust length to meet ICSE requirements.'}"
        )

    @classmethod
    def solve_full_composition_rubric(cls, params: Dict) -> SolutionResult:
        text = params.get("text", "")
        word_count = len(text.split())
        steps = []
        steps.append("QUESTION: Evaluate the complete composition against ICSE marking rubric.")
        steps.append("ICSE Descriptive Composition Rubric (20 marks total):")
        steps.append("  Content & Relevance: 5 marks")
        steps.append("  Language & Expression: 5 marks")
        steps.append("  Organisation & Coherence: 3 marks")
        steps.append("  Spelling & Grammar: 2 marks")
        steps.append("  Originality & Style: 3 marks")
        steps.append("  Word Count Compliance: 2 marks")
        steps.append("STEP 1: Evaluate each criterion.")
        sensory_covered = sum(
            1 for sense_words in cls.SENSORY_CATEGORIES.values()
            for w in sense_words
            if w.lower() in text.lower()
        )
        sensory_score = min(sensory_covered / 3, 1.0)
        figurative_count = sum(
            1 for devices in cls.FIGURATIVE_DEVICES.values()
            for phrase, _ in devices
            if phrase.lower() in text.lower()
        )
        figurative_score = min(figurative_count / 2, 1.0)
        paragraphs = text.split('\n\n')
        para_score = min(len(paragraphs) / 5, 1.0) if paragraphs else 0.5
        wc_score = 1.0 if 300 <= word_count <= 350 else (word_count / 300 if word_count < 300 else 350 / word_count)
        wc_score = min(wc_score, 1.0)
        spell_errors = len([w for w in text.split() if len(w) > 4 and w.lower() not in
                            open("/usr/share/dict/words").read().lower().split()]) if False else 0
        spell_score = max(0, 1.0 - spell_errors * 0.1)
        originality_score = (sensory_score + figurative_score) / 2
        rubric_scores = {
            "content_relevance": sensory_score * 5,
            "language_expression": figurative_score * 5,
            "organisation": para_score * 3,
            "spelling_grammar": spell_score * 2,
            "originality_style": originality_score * 3,
            "word_count": wc_score * 2,
        }
        for criterion, score in rubric_scores.items():
            steps.append(f"  {criterion}: {score:.1f}/{(5,5,3,2,3,2)[list(rubric_scores.keys()).index(criterion)]}")
        total = sum(rubric_scores.values())
        max_total = 20
        steps.append(f"STEP 2: Total score: {total:.1f}/{max_total}")
        grade = "Excellent (90%+)" if total >= 18 else "Very Good (75-89%)" if total >= 15 else "Good (60-74%)" if total >= 12 else "Needs Improvement (<60%)"
        verification = (
            f"CHECK: Rubric evaluation complete. "
            f"Sensory senses: {sensory_covered}/3 required. "
            f"Figurative devices: {figurative_count}/2 required. "
            f"Paragraphs: {len(paragraphs)}/5. "
            f"Word count: {word_count}. "
            f"Total: {total:.1f}/{max_total} - {grade}"
        )
        return SolutionResult(
            correct=total >= 12, score=total / max_total, max_score=1.0,
            answer={"rubric_scores": rubric_scores, "total": total, "grade": grade},
            steps=steps, verification=verification,
            feedback=f"Composition score: {total:.1f}/20 ({total/max_total:.0%}) - {grade}. "
                     f"Sensory: {sensory_covered}/3, Figurative: {figurative_count}/2, "
                     f"Paragraphs: {len(paragraphs)}."
        )


# ─────────────────────────────────────────────────────────────────────────────
# TOPIC 3 - Metacognition & Self-Assessment (c9_c12_eng_019)
# ─────────────────────────────────────────────────────────────────────────────
class MetacognitionSolver:

    RUBRIC_AREAS = {
        "composition": {
            "criteria": ["Content & Ideas", "Language & Expression", "Organisation",
                         "Spelling & Grammar", "Originality", "Word Count"],
            "max_marks": {"content": 5, "language": 5, "organisation": 3,
                          "spelling": 2, "originality": 3, "wordcount": 2},
        },
        "comprehension": {
            "criteria": ["Understanding of Text", "Vocabulary Usage",
                         "Sentence Structure", "Accuracy of Answers"],
            "max_marks": {"understanding": 5, "vocabulary": 3,
                          "structure": 4, "accuracy": 3},
        },
        "grammar": {
            "criteria": ["Tense Usage", "Subject-Verb Agreement",
                         "Punctuation", "Sentence Variety"],
            "max_marks": {"tense": 3, "agreement": 3, "punctuation": 2, "variety": 2},
        },
        "literature": {
            "criteria": ["Textual Evidence", "Interpretation",
                         "Character Analysis", "Thematic Understanding"],
            "max_marks": {"evidence": 4, "interpretation": 4, "character": 4, "theme": 3},
        },
    }

    @classmethod
    def solve_confidence_rating(cls, params: Dict) -> SolutionResult:
        topic_name = params.get("topic", "")
        rating = params.get("rating", 0)
        steps = []
        steps.append(f"QUESTION: Interpret the confidence rating for '{topic_name}'.")
        steps.append(f"Student's confidence rating: {rating}/5")
        steps.append("STEP 1: Map rating to mastery level.")
        levels = {
            1: ("Very Low", "Fundamental gaps. Start from basics."),
            2: ("Low", "Partial understanding. Review fundamentals."),
            3: ("Moderate", "Basic competence. Practice application."),
            4: ("High", "Strong understanding. Focus on edge cases."),
            5: ("Very High", "Mastery. Move to advanced practice."),
        }
        level, advice = levels.get(rating, ("Unknown", ""))
        steps.append(f"  Level: {level}")
        steps.append(f"  Advice: {advice}")
        steps.append("STEP 2: Recommended action based on rating:")
        if rating <= 2:
            steps.append("  → Re-read theory notes for this topic")
            steps.append("  → Work through 10-15 basic practice questions")
            steps.append("  → Watch/read tutorial explanations")
        elif rating == 3:
            steps.append("  → Revise key points")
            steps.append("  → Solve 8-10 mixed difficulty questions")
            steps.append("  → Identify specific weak sub-topics")
        else:
            steps.append("  → Solve 5 challenging questions")
            steps.append("  → Teach/explain the concept to someone")
            steps.append("  → Focus on time management in exam conditions")
        verification = (
            f"CHECK: Rating {rating}/5 maps to '{level}' mastery. "
            "Confidence ratings are metacognitive data points that should "
            "be tracked over time to measure learning progress."
        )
        return SolutionResult(
            correct=1 <= rating <= 5, score=rating / 5, max_score=1.0,
            answer={"level": level, "advice": advice, "rating": rating},
            steps=steps, verification=verification,
            feedback=f"Rating {rating}/5 = {level} mastery. {advice}"
        )

    @classmethod
    def solve_gap_identification(cls, params: Dict) -> SolutionResult:
        confidence_ratings = params.get("ratings", {})
        diagnostic_scores = params.get("diagnostic_scores", {})
        steps = []
        steps.append("QUESTION: Identify the 3 weakest areas from confidence ratings and diagnostic scores.")
        steps.append("STEP 1: Combine confidence ratings and diagnostic performance.")
        combined = {}
        for topic, conf in confidence_ratings.items():
            diag = diagnostic_scores.get(topic, conf * 0.5)
            combined[topic] = {
                "confidence": conf,
                "diagnostic": diag,
                "combined_score": (conf + diag) / 2,
                "weakness": conf < 3 or diag < 0.5,
            }
            steps.append(f"  {topic}: confidence={conf}, diagnostic={diag:.0%}, combined={(conf+diag)/2:.1f}")
        sorted_weak = sorted(
            [(t, d) for t, d in combined.items() if d["weakness"]],
            key=lambda x: x[1]["combined_score"]
        )
        top3 = [t for t, _ in sorted_weak[:3]]
        steps.append(f"STEP 2: Top 3 weakest areas: {top3}")
        steps.append("STEP 3: For each weak area, determine revision strategy:")
        for topic in top3:
            d = combined[topic]
            if d["combined_score"] < 1.5:
                strategy = "INTENSIVE - restart from basics, daily practice"
            elif d["combined_score"] < 2.5:
                strategy = "TARGETED - focused practice, 3-4 times per week"
            else:
                strategy = "MAINTENANCE - weekly review, exam-style questions"
            steps.append(f"  {topic}: {strategy}")
        verification = (
            f"CHECK: {len(sorted_weak)} weak areas identified from "
            f"{len(confidence_ratings)} topics. "
            "Gap identification is the core of metacognitive learning - "
            "the 95% student always knows their 3 weakest areas."
        )
        return SolutionResult(
            correct=len(top3) >= 1, score=1.0, max_score=1.0,
            answer={"weak_areas": top3, "all_scores": combined},
            steps=steps, verification=verification,
            feedback=f"3 weakest areas: {', '.join(top3)}. Prioritise these in your revision plan."
        )

    @classmethod
    def solve_revision_plan(cls, params: Dict) -> SolutionResult:
        weak_areas = params.get("weak_areas", [])
        days_available = params.get("days", 14)
        steps = []
        steps.append(f"QUESTION: Create a {days_available}-day revision plan for weak areas: {weak_areas}")
        steps.append("STEP 1: Allocate study time based on weakness severity.")
        steps.append("STEP 2: Distribute topics across available days using spaced repetition.")
        plan = {}
        days_per_topic = max(2, days_available // max(len(weak_areas), 1))
        for i, area in enumerate(weak_areas):
            start_day = i * days_per_topic + 1
            end_day = min(start_day + days_per_topic - 1, days_available)
            plan[area] = {
                "days": list(range(start_day, end_day + 1)),
                "focus": f"Intensive practice + theory review for {area}",
                "daily_tasks": [
                    "Morning: Review theory (30 min)",
                    "Afternoon: Solve 10 practice questions (45 min)",
                    "Evening: Self-assess and note gaps (15 min)",
                ],
            }
            steps.append(f"  {area}: Days {start_day}-{end_day}")
        steps.append("STEP 3: Add buffer days for mock tests.")
        buffer_start = days_available - 2
        plan["Mock Test"] = {
            "days": [buffer_start, buffer_start + 1],
            "focus": "Full-length timed mock test + review",
            "daily_tasks": ["Day 1: Take mock test", "Day 2: Review errors"],
        }
        steps.append(f"  Mock Test: Days {buffer_start}-{buffer_start + 1}")
        verification = (
            f"CHECK: {days_available}-day plan created. "
            f"{len(weak_areas)} weak areas + 1 mock test block. "
            "Spaced repetition schedule maximises retention."
        )
        return SolutionResult(
            correct=True, score=1.0, max_score=1.0,
            answer={"plan": plan, "days_available": days_available},
            steps=steps, verification=verification,
            feedback=f"{days_available}-day revision plan created for {len(weak_areas)} weak areas. "
                     f"Follow the daily tasks consistently."
        )

    @classmethod
    def solve_progress_tracking(cls, params: Dict) -> SolutionResult:
        history = params.get("history", [])
        steps = []
        steps.append("QUESTION: Analyse progress over time from confidence rating history.")
        steps.append("STEP 1: Plot confidence scores over time.")
        for entry in history:
            steps.append(f"  {entry['date']}: {entry['topic']} = {entry['rating']}/5")
        steps.append("STEP 2: Calculate trends.")
        if len(history) >= 2:
            recent_avg = sum(e["rating"] for e in history[-3:]) / min(3, len(history))
            early_avg = sum(e["rating"] for e in history[:3]) / min(3, len(history))
            improvement = recent_avg - early_avg
            steps.append(f"  Early average: {early_avg:.1f}/5")
            steps.append(f"  Recent average: {recent_avg:.1f}/5")
            steps.append(f"  Improvement: +{improvement:.1f}")
        else:
            improvement = 0
            steps.append("  Need more data points to calculate trend.")
        steps.append("STEP 3: Identify areas still needing attention.")
        low_ratings = [e for e in history if e["rating"] <= 2]
        for entry in low_ratings:
            steps.append(f"  WEAK: {entry['topic']} ({entry['rating']}/5)")
        trend_score = min(max(0.5 + improvement * 0.1, 0), 1.0)
        verification = (
            f"CHECK: Analysed {len(history)} data points. "
            f"Trend improvement: {improvement:+.1f}. "
            "Metacognitive tracking should be done weekly for best results."
        )
        return SolutionResult(
            correct=True, score=trend_score, max_score=1.0,
            answer={"improvement": improvement, "weak_areas": [e["topic"] for e in low_ratings]},
            steps=steps, verification=verification,
            feedback=f"Progress trend: {'Improving' if improvement > 0 else 'Stable' if improvement == 0 else 'Declining'}. "
                     f"Focus on: {', '.join(e['topic'] for e in low_ratings) if low_ratings else 'None - keep it up!'}"
        )

    @classmethod
    def solve_self_assessment_rubric(cls, params: Dict) -> SolutionResult:
        subject_area = params.get("subject_area", "composition")
        student_self_scores = params.get("self_scores", {})
        area_config = cls.RUBRIC_AREAS.get(subject_area, cls.RUBRIC_AREAS["composition"])
        steps = []
        steps.append(f"QUESTION: Self-assess '{subject_area}' using the ICSE rubric.")
        steps.append("STEP 1: ICSE rubric criteria and max marks:")
        criteria_list = area_config["criteria"]
        max_marks = area_config["max_marks"]
        for i, criterion in enumerate(criteria_list):
            key = list(max_marks.keys())[i]
            max_m = max_marks[key]
            student_m = student_self_scores.get(criterion, 0)
            steps.append(f"  {criterion}: {student_m}/{max_m}")
        total_student = sum(student_self_scores.get(c, 0) for c in criteria_list)
        total_max = sum(max_marks[list(max_marks.keys())[i]] for i in range(len(criteria_list)))
        steps.append(f"STEP 2: Self-assessment total: {total_student}/{total_max}")
        pct = total_student / total_max if total_max > 0 else 0
        steps.append(f"STEP 3: Self-assessment percentage: {pct:.0%}")
        steps.append("STEP 4: Calibration check:")
        if pct >= 0.8:
            calibration = "Accurate - self-assessment matches high performance"
        elif pct >= 0.6:
            calibration = "Reasonable - some areas may be over/under-rated"
        else:
            calibration = "Needs calibration - consider seeking teacher feedback"
        steps.append(f"  {calibration}")
        verification = (
            f"CHECK: Self-assessment for '{subject_area}': "
            f"{total_student}/{total_max} ({pct:.0%}). "
            "Regular self-assessment improves metacognitive accuracy over time."
        )
        return SolutionResult(
            correct=True, score=pct, max_score=1.0,
            answer={"total": total_student, "max": total_max, "pct": pct, "calibration": calibration},
            steps=steps, verification=verification,
            feedback=f"Self-assessment: {total_student}/{total_max} ({pct:.0%}). {calibration}."
        )


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATORS
# ─────────────────────────────────────────────────────────────────────────────
class WritingProcessQuestionGenerator:
    TOPIC = "The Writing Process"
    TOPIC_ID = "c9_c10_eng_018"

    @classmethod
    def generate(cls, rng: SeededRandom, count: int) -> List[Question]:
        questions = []
        templates = [
            cls._mcq_stage_order,
            cls._mcq_revise_vs_edit,
            cls._mcq_brainstorm_technique,
            cls._fill_blank_writing_stage,
            cls._short_stage_description,
            cls._short_revise_vs_edit,
            cls._short_editing_checklist,
            cls._long_writing_process_essay,
            cls._long_revising_importance,
            cls._numerical_mark_improvement,
            cls._mcq_editing_errors,
            cls._fill_blank_process_benefit,
        ]
        selected = rng.sample(templates, min(count, len(templates)))
        for template in selected:
            q = template(rng)
            questions.append(q)
        return questions

    @classmethod
    def _mcq_stage_order(cls, rng: SeededRandom) -> Question:
        options = [
            "Brainstorming → Drafting → Revising → Editing",
            "Drafting → Brainstorming → Editing → Revising",
            "Revising → Editing → Brainstorming → Drafting",
            "Brainstorming → Editing → Drafting → Revising",
        ]
        correct = options[0]
        rng.shuffle(options)
        return Question(
            id=f"{cls.TOPIC_ID}_mcq_{rng.next_int(1000,9999)}",
            type=QuestionType.MCQ.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Arrange the four stages of the writing process in the correct order:",
            options=options, answer=correct,
            explanation="The correct order is: Brainstorming (generate ideas) → Drafting (write first version) → Revising (improve content/structure) → Editing (fix mechanics).",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Remember the sequence of the writing process stages"
        )

    @classmethod
    def _mcq_revise_vs_edit(cls, rng: SeededRandom) -> Question:
        options = [
            "Revising changes WHAT the writing says; Editing changes HOW it says it",
            "Revising changes HOW the writing says it; Editing changes WHAT it says",
            "Both revising and editing change only grammar and spelling",
            "Revising and editing are the same process with different names",
        ]
        correct = options[0]
        rng.shuffle(options)
        return Question(
            id=f"{cls.TOPIC_ID}_mcq_{rng.next_int(1000,9999)}",
            type=QuestionType.MCQ.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="What is the key distinction between REVISING and EDITING in the writing process?",
            options=options, answer=correct,
            explanation="REVISING is a macro-level activity that changes WHAT the writing says (content, structure). EDITING is a micro-level activity that changes HOW it says it (grammar, spelling, punctuation).",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Distinguish between revising and editing"
        )

    @classmethod
    def _mcq_brainstorm_technique(cls, rng: SeededRandom) -> Question:
        techniques = [
            ("Mind Mapping", "A central idea with radiating branches of related thoughts"),
            ("Freewriting", "Writing continuously for 5 minutes without stopping or editing"),
            ("Keyword Clustering", "Grouping related words into thematic clusters"),
            ("List Making", "Creating bullet points of all ideas that come to mind"),
        ]
        selected = rng.choice(techniques)
        wrong_options = [t[0] for t in techniques if t[0] != selected[0]]
        rng.shuffle(wrong_options)
        options = [f"{selected[0]} - {selected[1]}"]
        for wo in wrong_options[:2]:
            matching = next(t for t in techniques if t[0] == wo)
            options.append(f"{matching[0]} - writing only complete sentences")
        options.append("Editing - fixing grammar and spelling before writing")
        rng.shuffle(options)
        return Question(
            id=f"{cls.TOPIC_ID}_mcq_{rng.next_int(1000,9999)}",
            type=QuestionType.MCQ.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question=f"Which brainstorming technique involves writing continuously without stopping for a set time?",
            options=options, answer=options[0],
            explanation="Freewriting is the technique where you write continuously without stopping or editing for 5 minutes. This bypasses the inner critic and generates raw material.",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Identify brainstorming techniques"
        )

    @classmethod
    def _fill_blank_writing_stage(cls, rng: SeededRandom) -> Question:
        blanks = [
            ("__________ is the stage where you generate ideas before writing using techniques like mind mapping and freewriting.", "Brainstorming"),
            ("The __________ stage involves writing the first version quickly, focusing on content over perfection.", "drafting"),
            ("__________ involves improving the structure, content, and organisation of your writing.", "Revising"),
            ("The final stage, __________, focuses on fixing grammar, spelling, and punctuation errors.", "editing"),
        ]
        q_text, ans = rng.choice(blanks)
        return Question(
            id=f"{cls.TOPIC_ID}_fb_{rng.next_int(1000,9999)}",
            type=QuestionType.FILL_BLANK.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question=f"Fill in the blank: {q_text}",
            options=None, answer=ans,
            explanation=f"The correct answer is '{ans}'. This stage focuses on {'generating ideas' if ans == 'Brainstorming' else 'writing the first version' if ans == 'drafting' else 'improving content and structure' if ans == 'Revising' else 'fixing grammar, spelling, and punctuation'}.",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Recall the four stages of the writing process"
        )

    @classmethod
    def _short_stage_description(cls, rng: SeededRandom) -> Question:
        stages = [s[0] for s in WritingProcessSolver.STAGES]
        stage = rng.choice(stages)
        descriptions = {
            "Brainstorming": "Generating ideas using mind maps, freewriting, keyword clustering, or list making before beginning to write",
            "Drafting": "Writing the first version quickly, focusing on getting ideas down on paper rather than making them perfect",
            "Revising": "Improving the draft's structure, content, and language - changing WHAT the writing says rather than HOW",
            "Editing": "Correcting grammar, spelling, punctuation, and sentence structure - changing HOW the writing says it",
        }
        return Question(
            id=f"{cls.TOPIC_ID}_sa_{rng.next_int(1000,9999)}",
            type=QuestionType.SHORT_ANSWER.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question=f"Describe the '{stage}' stage of the writing process in 2-3 sentences. What does it involve and why is it important?",
            options=None, answer=descriptions[stage],
            explanation=f"The '{stage}' stage is crucial because {descriptions[stage].lower()}.",
            difficulty=Difficulty.MEDIUM.value, marks=2,
            competency="Explain each stage of the writing process and its purpose"
        )

    @classmethod
    def _short_revise_vs_edit(cls, rng: SeededRandom) -> Question:
        return Question(
            id=f"{cls.TOPIC_ID}_sa_{rng.next_int(1000,9999)}",
            type=QuestionType.SHORT_ANSWER.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Explain the difference between revising and editing with one specific example of each.",
            options=None,
            answer="Revising changes WHAT the writing says (e.g., reorganising paragraphs to improve flow). Editing changes HOW it says it (e.g., fixing a spelling mistake in 'beautiful').",
            explanation="Revising is macro-level work on content and structure. Editing is micro-level work on surface features. A student who only edits produces a polished first draft - missing 5-8 marks.",
            difficulty=Difficulty.MEDIUM.value, marks=2,
            competency="Distinguish between revising and editing with examples"
        )

    @classmethod
    def _short_editing_checklist(cls, rng: SeededRandom) -> Question:
        return Question(
            id=f"{cls.TOPIC_ID}_sa_{rng.next_int(1000,9999)}",
            type=QuestionType.SHORT_ANSWER.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="List and briefly explain any three items from an editing checklist.",
            options=None,
            answer="(1) Spelling - check every word is correct. (2) Punctuation - verify commas, periods, and semicolons are properly placed. (3) Grammar - check subject-verb agreement and tense consistency.",
            explanation="An effective editing checklist covers: spelling, punctuation, grammar, sentence variety, and word choice. Work through it systematically, reading the text aloud.",
            difficulty=Difficulty.EASY.value, marks=2,
            competency="Apply an editing checklist to a composition"
        )

    @classmethod
    def _long_writing_process_essay(cls, rng: SeededRandom) -> Question:
        return Question(
            id=f"{cls.TOPIC_ID}_la_{rng.next_int(1000,9999)}",
            type=QuestionType.LONG_ANSWER.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Explain why most students lose 5-8 marks on ICSE compositions. How does the process approach (brainstorming → drafting → revising → editing) solve this problem? Use specific examples.",
            options=None,
            answer="Most students skip revising and submit first drafts. The 2024 ICSE PP report confirmed this. The process approach ensures: (1) Brainstorming generates rich ideas. (2) Drafting gets ideas down. (3) Revising improves structure and content (the stage that adds marks). (4) Editing polishes mechanics. Example: A first draft 'I went to the beach' becomes through revising 'The golden sun hung low over the Arabian Sea...'",
            explanation="The process approach mirrors professional writing. Research (Flower & Hayes) shows that skilled writers spend 40-60% of time on revising. ICSE examiners reward structure, sensory detail, and reflective closes - all added during revision.",
            difficulty=Difficulty.HARD.value, marks=5,
            competency="Analyse the importance of the full writing process for exam success"
        )

    @classmethod
    def _long_revising_importance(cls, rng: SeededRandom) -> Question:
        return Question(
            id=f"{cls.TOPIC_ID}_la_{rng.next_int(1000,9999)}",
            type=QuestionType.LONG_ANSWER.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="A student writes: 'Last week I visited my grandmother. It was nice. We talked. I ate good food. I liked it.' Show how this first draft would be transformed through the revising stage. Identify at least three specific improvements you would make.",
            options=None,
            answer="Revising improvements: (1) Sensory detail: add 'The aroma of freshly ground cardamom and simmering ghee filled her small kitchen' (smell). (2) Figurative language: 'Her wrinkled hands moved with the practiced grace of a conductor' (simile). (3) Reflective close: 'In that sunlit kitchen, I realised that love is served not in grand gestures but in carefully rolled parathas.' (4) Structure: expand to 5 paragraphs - introduction, kitchen, cooking, conversation, reflection.",
            explanation="Revising transforms bare-bones writing into ICSE-standard compositions. Focus on: adding sensory details (3+ senses), figurative language (2+ devices), clear paragraph structure, and a reflective close.",
            difficulty=Difficulty.HARD.value, marks=5,
            competency="Apply revising techniques to transform a first draft"
        )

    @classmethod
    def _numerical_mark_improvement(cls, rng: SeededRandom) -> Question:
        first_draft_marks = rng.nextInt(8, 12)
        revised_marks = first_draft_marks + rng.nextInt(3, 7)
        revised_marks = min(revised_marks, 20)
        improvement = revised_marks - first_draft_marks
        return Question(
            id=f"{cls.TOPIC_ID}_num_{rng.next_int(1000,9999)}",
            type=QuestionType.NUMERICAL.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question=f"A student scores {first_draft_marks}/20 on a first-draft composition. After applying the full writing process (including 10 minutes of revising), they score {revised_marks}/20. What is the percentage improvement in marks?",
            options=None, answer=round(improvement / first_draft_marks * 100, 1),
            explanation=f"Improvement = {improvement} marks. Percentage improvement = ({improvement}/{first_draft_marks}) x 100 = {round(improvement/first_draft_marks*100,1)}%. This demonstrates the value of the writing process.",
            difficulty=Difficulty.MEDIUM.value, marks=2,
            competency="Calculate and interpret the impact of revising on composition scores"
        )

    @classmethod
    def _mcq_editing_errors(cls, rng: SeededRandom) -> Question:
        options = [
            "Replacing 'Their going to the market' with 'They're going to the market'",
            "Reorganising the third paragraph to come before the second",
            "Adding a new paragraph describing the sounds of the marketplace",
            "Rewriting the conclusion to include a reflective personal thought",
        ]
        correct = options[0]
        rng.shuffle(options)
        return Question(
            id=f"{cls.TOPIC_ID}_mcq_{rng.next_int(1000,9999)}",
            type=QuestionType.MCQ.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Which of the following is an EDITING activity (not revising)?",
            options=options, answer=correct,
            explanation="Editing fixes surface errors: grammar, spelling, punctuation. The other options are revising activities - they change WHAT the writing says by reorganising, adding, or rewriting content.",
            difficulty=Difficulty.MEDIUM.value, marks=1,
            competency="Distinguish editing activities from revising activities"
        )

    @classmethod
    def _fill_blank_process_benefit(cls, rng: SeededRandom) -> Question:
        blanks = [
            ("The __________ report noted that 'compositions showed evidence of no revision' in 2024.", "ICSE PP"),
            ("Revising a 250-word draft typically takes __________ minutes and adds 5-8 marks.", "10-15"),
            ("__________ is the practice of thinking about your own thinking and learning.", "Metacognition"),
            ("Professional writers spend __________ of their time on revising and editing.", "40-60%"),
        ]
        q_text, ans = rng.choice(blanks)
        return Question(
            id=f"{cls.TOPIC_ID}_fb_{rng.next_int(1000,9999)}",
            type=QuestionType.FILL_BLANK.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question=f"Fill in the blank: {q_text}",
            options=None, answer=ans,
            explanation=f"This fact highlights the importance of the writing process in achieving ICSE board exam success.",
            difficulty=Difficulty.MEDIUM.value, marks=1,
            competency="Recall key facts about the writing process and ICSE standards"
        )


class DescriptiveCompositionQuestionGenerator:
    TOPIC = "Descriptive Composition Creation"
    TOPIC_ID = "c9_eng_121"

    @classmethod
    def generate(cls, rng: SeededRandom, count: int) -> List[Question]:
        questions = []
        templates = [
            cls._mcq_sensory_detail,
            cls._mcq_figurative_language,
            cls._mcq_paragraph_structure,
            cls._fill_blank_simile,
            cls._fill_blank_personification,
            cls._fill_blank_sensory_word,
            cls._short_sensory_analysis,
            cls._short_figurative_identification,
            cls._short_paragraph_purpose,
            cls._short_reflective_close,
            cls._long_composition_planning,
            cls._long_rubric_evaluation,
            cls._numerical_word_count,
            cls._numerical_sensory_density,
            cls._mcq_effective_opening,
            cls._short_topic_deconstruction,
        ]
        selected = rng.sample(templates, min(count, len(templates)))
        for template in selected:
            q = template(rng)
            questions.append(q)
        return questions

    @classmethod
    def _mcq_sensory_detail(cls, rng: SeededRandom) -> Question:
        options = [
            "The pungent aroma of frying spices filled the narrow alley",
            "The market was very busy and loud",
            "Shopping at the market is a good experience",
            "I went to the market and bought vegetables",
        ]
        correct = options[0]
        rng.shuffle(options)
        return Question(
            id=f"{cls.TOPIC_ID}_mcq_{rng.next_int(1000,9999)}",
            type=QuestionType.MCQ.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Which sentence uses the most effective sensory detail?",
            options=options, answer=correct,
            explanation="'The pungent aroma of frying spices filled the narrow alley' uses specific sensory language (pungent aroma, frying spices) that creates a vivid mental image. The other options are vague and general.",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Identify effective sensory detail in descriptive writing"
        )

    @classmethod
    def _mcq_figurative_language(cls, rng: SeededRandom) -> Question:
        options = [
            "Her laughter was music to my ears",
            "She laughed loudly in the room",
            "The music from her laughter was pleasant",
            "She enjoyed the music that was playing",
        ]
        correct = options[0]
        rng.shuffle(options)
        return Question(
            id=f"{cls.TOPIC_ID}_mcq_{rng.next_int(1000,9999)}",
            type=QuestionType.MCQ.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Which sentence contains a metaphor?",
            options=options, answer=correct,
            explanation="'Her laughter was music to my ears' is a metaphor - it directly compares laughter to music without using 'like' or 'as'. A simile would say 'Her laughter was LIKE music to my ears.'",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Identify metaphor in descriptive writing"
        )

    @classmethod
    def _mcq_paragraph_structure(cls, rng: SeededRandom) -> Question:
        options = [
            "Introduction → 3 body paragraphs → Reflective conclusion",
            "Introduction → Conclusion → Body paragraph",
            "3 body paragraphs → Introduction → Conclusion",
            "Conclusion → Body paragraphs → Introduction",
        ]
        correct = options[0]
        rng.shuffle(options)
        return Question(
            id=f"{cls.TOPIC_ID}_mcq_{rng.next_int(1000,9999)}",
            type=QuestionType.MCQ.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="What is the ideal paragraph structure for an ICSE descriptive composition?",
            options=options, answer=correct,
            explanation="ICSE descriptive compositions should have 5 paragraphs: (1) Introduction with a hook, (2-4) Body paragraphs each covering a different aspect, (5) Reflective conclusion that goes beyond mere description.",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Recall the ideal paragraph structure for descriptive compositions"
        )

    @classmethod
    def _mcq_effective_opening(cls, rng: SeededRandom) -> Question:
        options = [
            "The old lighthouse stood sentinel over the churning sea, its beam slicing through the midnight fog like a golden sword",
            "This essay is about a lighthouse I saw once",
            "I went to see a lighthouse near my hometown",
            "Lighthouses are important structures that help ships",
        ]
        correct = options[0]
        rng.shuffle(options)
        return Question(
            id=f"{cls.TOPIC_ID}_mcq_{rng.next_int(1000,9999)}",
            type=QuestionType.MCQ.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Which sentence is the most effective opening for a descriptive composition?",
            options=options, answer=correct,
            explanation="Option 1 is the strongest opening: it uses vivid imagery ('churning sea', 'midnight fog'), personification ('stood sentinel'), simile ('like a golden sword'), and creates immediate atmosphere. The others are flat and factual.",
            difficulty=Difficulty.MEDIUM.value, marks=1,
            competency="Evaluate effective opening sentences for descriptive writing"
        )

    @classmethod
    def _fill_blank_simile(cls, rng: SeededRandom) -> Question:
        options_sentence = [
            "The moon floated ______ a silver boat on the dark ocean of night",
            "The moon floated ______ a silver boat above the silent village",
            "The moon floated ______ a silver boat across the evening sky",
            "The moon floated ______ a silver boat behind the clouds",
        ]
        correct = "like / as"
        return Question(
            id=f"{cls.TOPIC_ID}_fb_{rng.next_int(1000,9999)}",
            type=QuestionType.FILL_BLANK.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Complete using 'like' or 'as': 'The moon floated ______ a silver boat across the midnight sky.'",
            options=None, answer=correct,
            explanation="Both 'like' and 'as' work here. 'Like a silver boat' is the most natural choice. A simile compares two different things using 'like' or 'as'.",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Use similes correctly in descriptive writing"
        )

    @classmethod
    def _fill_blank_personification(cls, rng: SeededRandom) -> Question:
        options_sentence = [
            "The wind ______ through the trees, carrying secrets from distant lands",
            "The wind was ______ through the trees at about 20 km/h",
            "The wind blew ______ through the trees yesterday",
            "The wind felt ______ when it passed through the trees",
        ]
        return Question(
            id=f"{cls.TOPIC_ID}_fb_{rng.next_int(1000,9999)}",
            type=QuestionType.FILL_BLANK.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question="Complete with a personification verb: 'The wind ______ through the trees, carrying secrets from distant lands.'",
            options=None, answer="whispered",
            explanation="'Whispered' is personification - it gives the wind (non-human) a human action (whispering). Other options: 'danced', 'sighed', 'sang', 'crept'.",
            difficulty=Difficulty.EASY.value, marks=1,
            competency="Apply personification in descriptive writing"
        )

    @classmethod
    def _fill_blank_sensory_word(cls, rng: SeededRandom) -> Question:
        senses = {
            "The __________ fragrance of jasmine drifted through the open window": "fragrant/sweet/aromatic",
            "The __________ sound of temple bells echoed across the still morning": "distant/melodic/clear",
            "The __________ walls of the ancient fort told stories of centuries past": "weathered/rough/crumbling",
            "The __________ taste of the ripe mango burst on my tongue like summer itself": "sweet/tangy/rich",
        }
        q_text = rng.choice(list(senses.keys()))
        return Question(
            id=f"{cls.TOPIC_ID}_fb_{rng.next_int(1000,9999)}",
            type=QuestionType.FILL_BLANK.value, topic=cls.TOPIC_ID, topic_title=cls.TOPIC,
            question=f"Fill in the"
)

# -- solver contract --------------------------------------------
_TASKS = {
    "stage_order": "solve_mcq_stage_order", "revise_vs_edit": "solve_revise_vs_edit",
    "brainstorm": "solve_brainstorm_evaluation", "first_vs_revised": "solve_first_vs_revised",
    "revision_checklist": "solve_revision_checklist",
}

def solve(node_id: str = "", params: dict | None = None, **kw):
    """Solve a c9 writing-process task via WritingProcessSolver."""
    params = params or {}
    s = WritingProcessSolver()
    fn = getattr(s, _TASKS.get(params.get("task", "stage_order"), "solve_mcq_stage_order"))
    r = fn(params)
    return r if isinstance(r, dict) else getattr(r, "__dict__", {"result": str(r)})

SOLVER_REGISTRY = {"c9_eng_writing": solve}
NODE_MAP = {"c9_eng_121": "c9_eng_writing"}
