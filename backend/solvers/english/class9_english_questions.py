"""
CISCE (ICSE) English Class 9 - Deterministic Question Generator
Covers:
  - Writing Process (brainstorming, drafting, revising, editing)
  - Original Descriptive Composition Creation
  - Metacognition and Self-Assessment
"""

import random
import string
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum
import math


# ──────────────────────────────────────────────
# Data Structures
# ──────────────────────────────────────────────

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    WRITING_PROCESS = "The Writing Process"
    DESCRIPTIVE_COMPOSITION = "Descriptive Composition"
    METACOGNITION = "Metacognition and Self-Assessment"


@dataclass
class Question:
    id: str
    type: str
    topic: str
    question: str
    options: Optional[List[str]]
    answer: Any
    explanation: str
    steps: List[str]
    verification: str
    difficulty: str
    competency_based: bool
    marks: int


# ──────────────────────────────────────────────
# Deterministic helpers
# ──────────────────────────────────────────────

def _stable_shuffle(seq: list, seed: int) -> list:
    """Shuffle a list deterministically from a seed."""
    rng = random.Random(seed)
    s = seq[:]
    rng.shuffle(s)
    return s


def _derive_seed(seed: int, salt: str) -> int:
    """Derive a stable integer seed from (seed, salt) via hashlib."""
    raw = f"{seed}|{salt}".encode()
    h = hashlib.sha256(raw).hexdigest()
    return int(h[:12], 16)


def _topic_tag(topic: Topic, idx: int) -> str:
    return f"{topic.value.replace(' ', '_').lower()}_{idx:03d}"


# ──────────────────────────────────────────────
# Question Banks
# ──────────────────────────────────────────────

# ── Writing Process ──

_WP_MCQS = [
    {
        "q": "Which of the following is NOT one of the four stages of the writing process?",
        "opts": ["Brainstorming", "Publishing", "Revising", "Editing"],
        "ans": 1,
        "exp": "The four stages are: Brainstorming → Drafting → Revising → Editing. "
               "Publishing is a stage that comes after editing but is not one of the "
               "four core stages of the writing process.",
        "steps": [
            "Recall the four stages of the writing process.",
            "Compare each option with the known stages.",
            "Publishing is a post-writing stage, not a core writing-process stage.",
        ],
        "verif": "Brainstorming, Revising, and Editing are explicitly named in the syllabus. "
                 "Publishing is not listed as one of the four core stages.",
    },
    {
        "q": "In the writing process, REVISING primarily involves:",
        "opts": [
            "Fixing spelling and punctuation errors",
            "Changing WHAT the writing says (content and structure)",
            "Writing the final neat version",
            "Checking word count"
        ],
        "ans": 1,
        "exp": "Revising changes WHAT the writing says - its structure, content, and "
               "ideas. Editing changes HOW it says it - grammar, spelling, and "
               "punctuation. This distinction is key to scoring well in ICSE compositions.",
        "steps": [
            "Recall the distinction between revising and editing.",
            "Revising = what the writing says; Editing = how it says it.",
            "Option (B) matches the definition of revising.",
        ],
        "verif": "The 2024 ICSE PP report explicitly noted students skipped revising and "
                 "submitted first-draft quality work. Revising = content/structure.",
    },
    {
        "q": "Which technique involves writing rapidly without stopping to correct errors, "
             "to generate ideas freely?",
        "opts": ["Mind Mapping", "Freewriting", "Keyword Clustering", "Peer Review"],
        "ans": 1,
        "exp": "Freewriting is the technique of writing non-stop for a set time without "
               "concern for grammar, spelling, or structure - it's a brainstorming tool "
               "to unlock ideas before drafting.",
        "steps": [
            "Identify which brainstorming technique matches 'writing rapidly without stopping'.",
            "Freewriting = non-stop writing to generate ideas.",
            "Mind mapping uses visual diagrams; keyword clustering groups related words.",
        ],
        "verif": "Freewriting is defined in the syllabus node as a brainstorming technique "
                 "where students write rapidly without editing.",
    },
    {
        "q": "According to the 2024 ICSE Principal's Report, a common weakness in "
             "student compositions was:",
        "opts": [
            "Overly long compositions exceeding the word limit",
            "Evidence of no revision - first-draft quality with structural problems",
            "Excessive use of figurative language",
            "Too many paragraphs"
        ],
        "ans": 1,
        "exp": "The 2024 ICSE PP report specifically noted: 'Compositions showed evidence "
               "of no revision - first-draft quality with structural problems that a "
               "second reading would have caught.'",
        "steps": [
            "Recall the 2024 ICSE PP report findings on compositions.",
            "The report specifically identified lack of revision as a key weakness.",
            "Option (B) is a direct reference to the report.",
        ],
        "verif": "Directly quoted from the syllabus: 'Compositions showed evidence of no "
                 "revision - first-draft quality with structural problems.'",
    },
    {
        "q": "Which stage comes DIRECTLY AFTER Drafting in the writing process?",
        "opts": ["Brainstorming", "Editing", "Revising", "Publishing"],
        "ans": 2,
        "exp": "The correct sequence is: Brainstorming → Drafting → Revising → "
               "Editing. Revising comes immediately after drafting. Most students "
               "incorrectly skip revising and go straight to editing.",
        "steps": [
            "Recall the correct sequence: Brainstorming → Drafting → Revising → Editing.",
            "The stage immediately after Drafting is Revising.",
            "Option (C) is correct.",
        ],
        "verif": "Sequence confirmed by syllabus: drafting → revising → editing.",
    },
    {
        "q": "EDITED text differs from REVISED text in that editing primarily deals with:",
        "opts": [
            "Adding new paragraphs",
            "Reorganising the main argument",
            "Grammar, spelling, and punctuation",
            "Changing the topic"
        ],
        "ans": 2,
        "exp": "Editing corrects surface-level errors: grammar, spelling, punctuation, "
               "and formatting. Revising changes the content, structure, and ideas. "
               "Both stages are distinct and both are essential.",
        "steps": [
            "Recall the revising vs editing distinction.",
            "Editing = surface errors (grammar, spelling, punctuation).",
            "Revising = content and structure.",
        ],
        "verif": "Syllabus states: 'REVISING changes WHAT the writing says; "
                 "EDITING changes HOW it says it.'",
    },
    {
        "q": "Mind Mapping as a brainstorming technique primarily helps by:",
        "opts": [
            "Checking spelling errors",
            "Visually organising related ideas around a central topic",
            "Writing sentences without stopping",
            "Counting words in a composition"
        ],
        "ans": 1,
        "exp": "Mind Mapping places a central idea in the middle and branches out "
               "with related sub-ideas, helping students visually organise their "
               "thoughts before writing.",
        "steps": [
            "Recall the definition and purpose of mind mapping.",
            "Mind mapping is a visual brainstorming tool.",
            "Option (B) describes visual organisation of ideas.",
        ],
        "verif": "Syllabus lists mind mapping as a brainstorming technique alongside "
                 "freewriting and keyword clustering.",
    },
    {
        "q": "Drafting in the writing process is best described as:",
        "opts": [
            "Writing the final polished version",
            "Writing the first version quickly, focusing on content not perfection",
            "Correcting spelling mistakes",
            "Reading the composition aloud"
        ],
        "ans": 1,
        "exp": "Drafting is writing the first version rapidly with focus on getting "
               "ideas down. Perfection is NOT the goal - revision and editing happen "
               "later. Attempting to be perfect while drafting slows the writer down.",
        "steps": [
            "Recall the definition of drafting.",
            "Drafting = first version, focus on content, not perfection.",
            "Option (B) matches this definition.",
        ],
        "verif": "Syllabus: 'DRAFTING - writing the first version quickly, focusing on "
                 "content rather than perfection.'",
    },
    {
        "q": "Keyword Clustering as a brainstorming technique involves:",
        "opts": [
            "Grouping related words around a central idea",
            "Writing a paragraph for each keyword",
            "Looking up keywords in a dictionary",
            "Using only five keywords in a composition"
        ],
        "ans": 0,
        "exp": "Keyword Clustering involves listing words related to the topic and "
               "grouping them into clusters of related ideas. This generates material "
               "for paragraphs before writing begins.",
        "steps": [
            "Recall keyword clustering as a brainstorming method.",
            "It groups related words to generate ideas.",
            "Option (A) describes this grouping process.",
        ],
        "verif": "Keyword clustering is a standard brainstorming technique that groups "
                 "related words - confirmed in the syllabus.",
    },
    {
        "q": "Which of the following is an example of REVISING (not editing)?",
        "opts": [
            "Correcting 'their' to 'there'",
            "Reorganising paragraphs for better logical flow",
            "Adding a comma after an introductory phrase",
            "Changing 'recieve' to 'receive'"
        ],
        "ans": 1,
        "exp": "Reorganising paragraphs changes the STRUCTURE of the writing - what "
               "it says and how it is organised. Correcting 'their/there' and "
               "'recieve/receive' are spelling/grammar fixes (editing). Adding a "
               "comma is also editing.",
        "steps": [
            "Apply the revising vs editing distinction.",
            "Reorganising = structural change = revising.",
            "Spelling and punctuation = editing.",
        ],
        "verif": "Revising changes WHAT (structure/content); editing changes HOW "
                 "(grammar/spelling). Reorganising paragraphs is a structural change.",
    },
]

_WP_FILL_BLANKS = [
    {
        "q": "The four stages of the writing process are: Brainstorming, ________, "
             "Revising, and Editing.",
        "ans": "drafting",
        "alt_answers": ["Drafting", "DRAFTING"],
        "exp": "Drafting is the second stage, where the writer produces the first "
               "version of the text quickly, focusing on getting ideas down.",
        "steps": [
            "Recall the four stages in order.",
            "The missing stage between Brainstorming and Revising is Drafting.",
        ],
        "verif": "Sequence from syllabus: Brainstorming → Drafting → Revising → Editing.",
    },
    {
        "q": "________ changes WHAT the writing says, while editing changes HOW it says it.",
        "ans": "Revising",
        "alt_answers": ["revising", "REVISING", "Revision"],
        "exp": "Revising addresses content and structure; editing addresses surface "
               "mechanics like grammar and spelling.",
        "steps": [
            "Recall the key distinction taught in the syllabus.",
            "The stage that changes 'what' is Revising.",
        ],
        "verif": "Syllabus explicitly states: 'REVISING changes WHAT the writing says; "
                 "EDITING changes HOW it says it.'",
    },
    {
        "q": "A ________ is a visual diagram that branches out from a central idea, "
             "used during brainstorming.",
        "ans": "mind map",
        "alt_answers": ["Mind Map", "mindmap", "MIND MAP"],
        "exp": "A mind map places the central topic in the centre and draws branches "
               "with related sub-topics, helping organise ideas visually.",
        "steps": [
            "Identify the visual brainstorming tool described.",
            "A mind map is a branching visual diagram used for idea generation.",
        ],
        "verif": "Mind mapping is listed as a brainstorming technique in the syllabus.",
    },
    {
        "q": "Freewriting is a technique where the writer writes ________ without "
             "stopping to correct errors.",
        "ans": "rapidly",
        "alt_answers": ["continuously", "non-stop", "continuously without stopping",
                        "non stop"],
        "exp": "Freewriting involves writing rapidly and continuously for a set period, "
               "suppressing the urge to edit as you write.",
        "steps": [
            "Recall the freewriting technique.",
            "The key characteristic is writing rapidly without stopping.",
        ],
        "verif": "Freewriting definition from syllabus: writing rapidly without "
                 "correcting errors.",
    },
    {
        "q": "The ________ Report (2024) noted that compositions showed evidence of "
             "no revision.",
        "ans": "ICSE Principal's",
        "alt_answers": ["ICSE", "ICSE PP", "ICSE Principal's Report"],
        "exp": "The 2024 ICSE Principal's Report identified lack of revision as a "
               "major weakness in student compositions.",
        "steps": [
            "Recall the 2024 ICSE report reference.",
            "The report is called the ICSE Principal's Report (or ICSE PP Report).",
        ],
        "verif": "Syllabus explicitly cites the 2024 ICSE PP report.",
    },
    {
        "q": "Keyword ________ involves grouping related words around a central topic "
             "to generate ideas.",
        "ans": "clustering",
        "alt_answers": ["Clustering", "CLUSTERING"],
        "exp": "Keyword clustering is a brainstorming method where students list words "
               "related to the topic and cluster them into related groups.",
        "steps": [
            "Recall the brainstorming technique involving word grouping.",
            "The technique is called keyword clustering.",
        ],
        "verif": "Keyword clustering is listed in the syllabus as a brainstorming technique.",
    },
]

_WP_SHORT_ANSWERS = [
    {
        "q": "Explain the key difference between REVISING and EDITING in the writing "
             "process. Give one example of each. (4 marks)",
        "ans": "Revising changes WHAT the writing says (content and structure), while "
               "editing changes HOW it says it (grammar, spelling, punctuation). "
               "Example of revising: Reorganising paragraphs for better logical flow. "
               "Example of editing: Correcting the spelling of 'receive'.",
        "steps": [
            "State the core distinction: Revising = what; Editing = how.",
            "Provide an example of revising (content/structure change).",
            "Provide an example of editing (grammar/spelling change).",
            "Keep each point clear and concise for 4 marks.",
        ],
        "verif": "Distinction matches the syllabus definition exactly. Both examples are "
                 "correct illustrations of the respective stages.",
    },
    {
        "q": "List and briefly describe any THREE brainstorming techniques mentioned "
             "in the writing process. (3 marks)",
        "ans": "(1) Mind Mapping: A visual diagram with a central idea and branching "
               "sub-ideas. (2) Freewriting: Writing rapidly without stopping to "
               "correct errors, to unlock ideas. (3) Keyword Clustering: Listing "
               "and grouping related words around the topic to generate material.",
        "steps": [
            "List all three techniques from the syllabus.",
            "Describe Mind Mapping briefly.",
            "Describe Freewriting briefly.",
            "Describe Keyword Clustering briefly.",
        ],
        "verif": "All three techniques are listed in the syllabus node. Descriptions "
                 "are accurate and concise.",
    },
    {
        "q": "Why do most students lose marks in ICSE compositions? Connect your "
             "answer to the writing process. (3 marks)",
        "ans": "Most students lose marks because they skip the Revising stage and "
               "submit a first draft. First drafts typically have structural problems, "
               "weak arguments, and poor paragraph organisation that a second reading "
               "would catch. Applying the full writing process (especially Revising) "
               "typically adds 5-8 marks.",
        "steps": [
            "Identify the main reason students lose marks: skipping revision.",
            "Explain what problems first drafts typically have.",
            "State the mark benefit of applying the full process.",
        ],
        "verif": "2024 ICSE PP report explicitly noted this pattern. The 5-8 mark "
                 "improvement figure is from the syllabus.",
    },
    {
        "q": "Describe the four stages of the writing process in the correct order. (4 marks)",
        "ans": "(1) BRAINSTORMING: Generate ideas using techniques like mind mapping, "
               "freewriting, keyword clustering. (2) DRAFTING: Write the first version "
               "quickly, focusing on content. (3) REVISING: Improve structure, content, "
               "and language (change WHAT). (4) EDITING: Fix grammar, spelling, and "
               "punctuation errors (change HOW).",
        "steps": [
            "List all four stages in correct order.",
            "Describe Brainstorming.",
            "Describe Drafting.",
            "Describe Revising and Editing with the key distinction.",
        ],
        "verif": "Sequence and descriptions match the syllabus exactly.",
    },
]

_WP_LONG_ANSWERS = [
    {
        "q": "You are a student who has just written a first draft of a descriptive "
             "composition about 'A Busy Market'. Your teacher asks you to apply the "
             "writing process to improve it. (i) What brainstorming techniques would "
             "you use to generate more sensory details? (ii) What specific changes "
             "would you make during REVISING? (iii) What editing checks would you "
             "perform before submitting? (8 marks)",
        "ans": "(i) Brainstorming: Mind map around 'Busy Market' with branches for "
               "sight, sound, smell, touch. Freewrite for 5 minutes describing the "
               "market non-stop. Keyword cluster: vendor, bargain, chaos, aroma, "
               "crowd, neon. (ii) Revising: Add a strong opening image; reorganise "
               "paragraphs from general→specific→reflective; add sensory details "
               "missing in draft; ensure each paragraph has a clear focus. (iii) "
               "Editing: Check spelling of Indian words (e.g., 'pav bhaji'); verify "
               "punctuation; ensure consistent tense; check paragraph indentation; "
               "confirm word count 300-350.",
        "steps": [
            "Part (i): Identify three brainstorming techniques and apply each to the topic.",
            "Part (ii): Identify structural and content improvements for revising.",
            "Part (iii): List specific surface-level checks for editing.",
            "Ensure 8-mark depth with specific, actionable examples.",
        ],
        "verif": "All three stages of the process are addressed with specific examples. "
                 "Brainstorming techniques match syllabus. Revising examples are "
                 "content/structure changes. Editing examples are surface corrections.",
    },
    {
        "q": "The 2024 ICSE Principal's Report noted that many students' compositions "
             "showed 'evidence of no revision'. As a student, explain (a) what this "
             "means in terms of the writing process, (b) why students might skip "
             "revising, and (c) how you would build a revision habit. (6 marks)",
        "ans": "(a) It means students submitted first-draft quality work - their "
               "compositions had structural problems, weak organisation, and missing "
               "elements that a second reading would have caught. (b) Students skip "
               "revising due to time pressure, lack of awareness of its importance, "
               "or not knowing HOW to revise. (c) Build a revision habit by: "
               "allocating 10 minutes after drafting; reading the composition aloud "
               "to catch awkward phrasing; using a checklist (opening, paragraph "
               "linkage, descriptive detail, reflective close); and comparing with "
               "a model composition.",
        "steps": [
            "Part (a): Explain what 'no revision' means in the context of the syllabus.",
            "Part (b): Identify plausible reasons students skip revising.",
            "Part (c): Provide practical strategies for building a revision habit.",
        ],
        "verif": "Answer directly references the 2024 ICSE PP report quote. Reasons "
                 "and strategies are realistic and educationally sound.",
    },
]


# ── Descriptive Composition ──

_DC_MCQS = [
    {
        "q": "Which of the following is an example of a SIMILE?",
        "opts": [
            "The wind whispered through the trees",
            "Her smile was as bright as the morning sun",
            "Time is a thief",
            "The old house groaned under the storm"
        ],
        "ans": 1,
        "exp": "A simile compares two things using 'as' or 'like'. Option (B) uses "
               "'as bright as'. Option (A) is personification (wind whispering), "
               "Option (C) is metaphor, and Option (D) is also personification.",
        "steps": [
            "Recall the definition of a simile.",
            "A simile uses 'as' or 'like' to compare.",
            "Option (B) uses 'as ... as' - it is a simile.",
        ],
        "verif": "Simile definition confirmed: comparison using 'as' or 'like'. "
                 "Only option (B) satisfies this.",
    },
    {
        "q": "How many senses should a good descriptive composition engage according "
             "to ICSE standards?",
        "opts": ["One sense only", "At least two senses", "At least three senses",
                 "All five senses"],
        "ans": 2,
        "exp": "ICSE standards require sensory detail across at least three senses "
               "(e.g., sight, sound, and smell) for a composition to score well.",
        "steps": [
            "Recall the sensory detail requirement for ICSE compositions.",
            "The standard is at least three senses.",
        ],
        "verif": "Syllabus: 'use sensory detail across at least three senses'.",
    },
    {
        "q": "Which figurative language device is used in: 'The angry clouds marched "
             "across the sky'?",
        "opts": ["Simile", "Metaphor", "Personification", "Alliteration"],
        "ans": 2,
        "exp": "Personification gives human qualities to non-human things. 'Angry' "
               "and 'marched' are human actions attributed to clouds.",
        "steps": [
            "Identify the device: clouds given human actions ('angry', 'marched').",
            "This is personification.",
        ],
        "verif": "Personification definition: attributing human qualities to "
                 "non-human things. 'Angry clouds marched' matches.",
    },
    {
        "q": "What is the recommended word count for an ICSE descriptive composition "
             "in Class 9?",
        "opts": ["200-250 words", "300-350 words", "400-450 words", "500 words"],
        "ans": 1,
        "exp": "ICSE compositions are expected to be 300-350 words. This word count "
               "allows sufficient development of ideas without being too long.",
        "steps": [
            "Recall the ICSE composition word count specification.",
            "Standard is 300-350 words.",
        ],
        "verif": "Syllabus explicitly states '300-350 word descriptive composition'.",
    },
    {
        "q": "How many paragraphs should a well-structured descriptive composition "
             "have according to ICSE standards?",
        "opts": ["Three paragraphs", "Four paragraphs", "Five paragraphs", "Six paragraphs"],
        "ans": 2,
        "exp": "ICSE standard is 5 paragraphs: Introduction, 3 body paragraphs "
               "(each addressing a sub-section), and a conclusion/reflective close.",
        "steps": [
            "Recall the paragraph structure requirement.",
            "5 paragraphs is the standard ICSE structure.",
        ],
        "verif": "Syllabus: 'clear paragraph structure (5 paragraphs, each addressing "
                 "a sub-section)'.",
    },
    {
        "q": "A 'reflective close' in a descriptive composition means:",
        "opts": [
            "Simply restating what was described",
            "Adding the writer's personal thoughts or feelings about the experience",
            "Listing all the sensory details used",
            "Writing a long concluding paragraph"
        ],
        "ans": 1,
        "exp": "A reflective close goes beyond mere description - it adds the "
               "writer's personal response, feelings, or insight, giving the "
               "composition depth and emotional resonance.",
        "steps": [
            "Recall what a reflective close means.",
            "It involves personal reflection, not just description.",
            "Option (B) describes personal thoughts/feelings.",
        ],
        "verif": "Syllabus: 'end with a reflective close that goes beyond mere "
                 "description.' Personal thoughts = reflective element.",
    },
    {
        "q": "Which of the following sentences contains PERSONIFICATION?",
        "opts": [
            "The river flowed like a ribbon of silver",
            "The old clock ticked impatiently",
            "She is a rose in the garden of life",
            "His voice was as rough as sandpaper"
        ],
        "ans": 1,
        "exp": "'Tick impatiently' attributes the human emotion 'impatience' to a "
               "clock. Option (A) is a simile, Option (C) is a metaphor, "
               "Option (D) is a simile.",
        "steps": [
            "Identify which sentence gives human qualities to a non-human thing.",
            "'Tick impatiently' = clock given human emotion = personification.",
        ],
        "verif": "Personification: human qualities to non-human. 'Impatiently' is a "
                 "human emotion attributed to a clock.",
    },
    {
        "q": "A METAPHOR differs from a SIMILE in that a metaphor:",
        "opts": [
            "Uses 'as' or 'like' to make a comparison",
            "States one thing IS another thing (without 'as' or 'like')",
            "Is always about nature",
            "Is always shorter than a simile"
        ],
        "ans": 1,
        "exp": "A metaphor directly equates one thing with another ('Time is a thief') "
               "without using 'as' or 'like'. A simile uses 'as' or 'like' "
               "('brave as a lion').",
        "steps": [
            "Recall the difference between metaphor and simile.",
            "Metaphor = direct equivalence; Simile = comparison with 'as/like'.",
            "Option (B) states the correct difference.",
        ],
        "verif": "Standard definition confirmed: metaphor states A is B; simile "
                 "says A is like/as B.",
    },
]

_DC_FILL_BLANKS = [
    {
        "q": "A ________ compares two different things using the words 'as' or 'like'.",
        "ans": "simile",
        "alt_answers": ["Simile", "SIMILE"],
        "exp": "A simile uses 'as' or 'like' to compare two unlike things, e.g., "
               "'as brave as a lion'.",
        "steps": ["Recall the definition of a simile.", "Simile = comparison using "
                  "'as' or 'like'."],
        "verif": "Simile definition confirmed: comparison using 'as' or 'like'.",
    },
    {
        "q": "________ gives human qualities, emotions, or actions to non-human "
             "things or abstract ideas.",
        "ans": "Personification",
        "alt_answers": ["personification", "PERSONIFICATION"],
        "exp": "Personification attributes human characteristics to non-human "
               "entities, e.g., 'the wind howled in anger'.",
        "steps": ["Recall the definition of personification.",
                  "It attributes human qualities to non-human things."],
        "verif": "Personification definition confirmed.",
    },
    {
        "q": "A ________ states that one thing IS another thing, creating a direct "
             "comparison without using 'as' or 'like'.",
        "ans": "metaphor",
        "alt_answers": ["Metaphor", "METAPHOR"],
        "exp": "A metaphor equates two things directly, e.g., 'Time is a thief'.",
        "steps": ["Recall the definition of a metaphor.",
                  "Metaphor = direct equivalence, no 'as' or 'like'."],
        "verif": "Metaphor definition confirmed: direct comparison without "
                 "'as' or 'like'.",
    },
    {
        "q": "The recommended word count for an ICSE Class 9 descriptive composition "
             "is ________ words.",
        "ans": "300-350",
        "alt_answers": ["300 to 350", "300-350"],
        "exp": "ICSE compositions should be 300-350 words to allow sufficient "
               "development of ideas.",
        "steps": ["Recall the ICSE word count specification.",
                  "Standard range is 300-350 words."],
        "verif": "Syllabus explicitly states '300-350 word descriptive composition'.",
    },
    {
        "q": "A descriptive composition must engage at least ________ different "
             "senses (sight, sound, smell, touch, taste).",
        "ans": "three",
        "alt_answers": ["3", "THREE", "Three"],
        "exp": "ICSE standards require sensory detail across at least three senses "
               "for a composition to be considered rich and effective.",
        "steps": ["Recall the sensory detail requirement.",
                  "At least three senses must be engaged."],
        "verif": "Syllabus: 'use sensory detail across at least three senses'.",
    },
    {
        "q": "In ICSE compositions, a ________ close adds the writer's personal "
             "thoughts or feelings, going beyond mere description.",
        "ans": "reflective",
        "alt_answers": ["Reflective", "REFLECTIVE"],
        "exp": "A reflective close gives the composition emotional depth by "
               "including the writer's personal response.",
        "steps": ["Recall the requirement for the composition's closing.",
                  "A reflective close adds personal insight."],
        "verif": "Syllabus: 'end with a reflective close that goes beyond mere "
                 "description.'",
    },
]

_DC_SHORT_ANSWERS = [
    {
        "q": "Define a simile and a metaphor. Provide an original example of each "
             "based on the topic 'A Rainy Day'. (4 marks)",
        "ans": "Simile: Compares two things using 'as' or 'like'. Example: 'The rain "
               "fell as steadily as a drummer's beat.' Metaphor: States one thing IS "
               "another. Example: 'The grey sky was a blanket of sorrow.'",
        "steps": [
            "Define simile with 'as' or 'like'.",
            "Give a simile example about a rainy day.",
            "Define metaphor as direct equivalence.",
            "Give a metaphor example about a rainy day.",
        ],
        "verif": "Definitions are accurate. Both examples are appropriate to the topic "
                 "and correctly illustrate their respective devices.",
    },
    {
        "q": "List the FIVE senses and give one descriptive detail for each based on "
             "the topic 'My Grandmother's Kitchen'. (5 marks)",
        "ans": "Sight: Copper pots hanging on the wall, sunlight through lace curtains. "
               "Sound: The bubbling of pressure cookers, the clink of spoons on brass. "
               "Smell: Cinnamon and cardamom, freshly baked bread. Touch: Warm flour "
               "dough, smooth wooden table. Taste: Sweet mango lassi, spicy chai.",
        "steps": [
            "List all five senses.",
            "Provide a vivid sight detail.",
            "Provide a sound detail.",
            "Provide a smell detail.",
            "Provide touch and taste details.",
        ],
        "verif": "All five senses are addressed with specific, vivid details "
                 "appropriate to the topic.",
    },
    {
        "q": "Why is the REFLECTIVE CLOSE important in a descriptive composition? "
             "Explain with reference to ICSE marking criteria. (3 marks)",
        "ans": "A reflective close adds depth and emotional resonance to a composition. "
               "ICSE markers reward compositions that go beyond mere description to "
               "include the writer's personal response. Without a reflective close, a "
               "composition may score well for description but lose marks for lack of "
               "depth and personal engagement.",
        "steps": [
            "Explain the purpose of a reflective close.",
            "Connect to ICSE marking criteria.",
            "State the consequence of omitting it.",
        ],
        "verif": "Answer connects the reflective close to ICSE standards and "
                 "marking expectations.",
    },
]

_DC_LONG_ANSWERS = [
    {
        "q": "Using the topic 'A Visit to a Rural Market', plan and outline a "
             "descriptive composition following ICSE standards. Include: (a) a "
             "paragraph plan with 5 paragraphs, (b) sensory details for at least "
             "three senses, (c) two examples of figurative language. (6 marks)",
        "ans": "(a) Para 1: Arrival - first impressions of colour and chaos. "
               "Para 2: Visual - stalls, produce, people. Para 3: Sounds and smells "
               "- the sensory heart of the market. Para 4: A specific encounter - "
               "a vendor or customer interaction. Para 5: Departure - reflective "
               "close on what the market revealed. (b) Sight: rainbow-coloured "
               "saris; Sound: the chatter of bargaining women; Smell: jasmine and "
               "spices. (c) Figurative: 'The market was a river of people' "
               "(metaphor); 'Vegetables blushed red with ripeness' (personification).",
        "steps": [
            "Part (a): Plan 5 paragraphs with clear sub-topics.",
            "Part (b): List sensory details for 3+ senses.",
            "Part (c): Provide two original figurative language examples.",
            "Ensure all elements are specific to the topic.",
        ],
        "verif": "5-paragraph plan is complete. Sensory details cover 3+ senses. "
                 "Figurative examples are correctly identified as metaphor and "
                 "personification.",
    },
    {
        "q": "Compare a FIRST DRAFT and a REVISED VERSION of a descriptive composition "
             "about 'Diwali Morning'. Identify at least four specific improvements "
             "that revising would make. (6 marks)",
        "ans": "First draft might have: weak opening ('It was Diwali morning'), "
               "disordered paragraphs, limited sensory detail, and a simple ending. "
               "Revised version improvements: (1) Stronger opening with a vivid "
               "image ('The first cracker split the darkness like a lightning bolt'). "
               "(2) Reorganised to: arrival → preparation → celebration → family → "
               "reflection. (3) Added sensory details: smell of incense, sound of "
               "crackers, sight of diyas. (4) Reflective close connecting Diwali "
               "to family bonds.",
        "steps": [
            "Describe weaknesses of a typical first draft.",
            "Identify improvement 1: stronger opening.",
            "Identify improvement 2: reorganisation.",
            "Identify improvement 3: added sensory details.",
            "Identify improvement 4: reflective close.",
        ],
        "verif": "Four specific improvements are identified, each showing content/"
                 "structure changes consistent with the revising stage.",
    },
]


# ── Metacognition ──

_MC_MCQS = [
    {
        "q": "On the confidence rating scale of 1-5 used in self-assessment, what "
             "does a rating of '1' indicate?",
        "opts": [
            "Complete mastery of the topic",
            "No understanding - need to start from basics",
            "Partial understanding - some gaps remain",
            "Good understanding but need more practice"
        ],
        "ans": 1,
        "exp": "A rating of 1 indicates the lowest confidence level: no understanding "
               "of the topic and a need to return to fundamentals. A rating of 5 "
               "indicates complete mastery.",
        "steps": [
            "Recall the 1-5 confidence rating scale.",
            "Rating 1 = lowest confidence, no understanding.",
        ],
        "verif": "1-5 scale: 1=lowest (no understanding), 5=highest (complete mastery).",
    },
    {
        "q": "According to educational psychologists (Zimmerman, Pintrich, Flavell), "
             "metacognition is the single biggest predictor of:",
        "opts": [
            "Higher IQ scores",
            "Academic success at the advanced level",
            "Faster reading speed",
            "Better handwriting"
        ],
        "ans": 1,
        "exp": "Research consistently shows that metacognition (thinking about your "
               "own thinking) is the strongest predictor of advanced academic "
               "success - more so than raw intelligence.",
        "steps": [
            "Recall the research finding cited in the syllabus.",
            "Metacognition predicts advanced academic success.",
        ],
        "verif": "Syllabus: 'metacognition is the single biggest predictor of "
                 "academic success at the advanced level.'",
    },
    {
        "q": "The difference between a 90% student and a 95% student is primarily:",
        "opts": [
            "Higher intelligence",
            "More content knowledge",
            "Metacognitive awareness - knowing WHERE their gaps are",
            "Better time management"
        ],
        "ans": 2,
        "exp": "The syllabus explicitly states: the 95% student knows WHERE their "
               "gaps are because they have a self-assessment system. The 90% "
               "student studies hard but lacks this gap-awareness.",
        "steps": [
            "Recall the 90% vs 95% student comparison.",
            "The key difference is metacognitive awareness (knowing gaps).",
        ],
        "verif": "Syllabus: 'The difference between a 90% student and a 95% student "
                 "is not intelligence or content knowledge - it is metacognitive "
                 "awareness.'",
    },
    {
        "q": "In the metacognition system, the FIRST component is:",
        "opts": [
            "Gap Identification",
            "Progress Tracking",
            "Confidence Rating",
            "Revision Planning"
        ],
        "ans": 2,
        "exp": "The four components are: (1) Confidence Rating, (2) Gap "
               "Identification, (3) Revision Planning, (4) Progress Tracking. "
               "Confidence Rating is the first step.",
        "steps": [
            "Recall the four components in order.",
            "Confidence Rating is step 1.",
        ],
        "verif": "Syllabus lists: (1) Confidence Rating → (2) Gap Identification → "
                 "(3) Revision Planning → (4) Progress Tracking.",
    },
    {
        "q": "Gap Identification in metacognition involves:",
        "opts": [
            "Celebrating your strongest topics",
            "Identifying your 3 weakest areas based on confidence ratings and "
            "diagnostic performance",
            "Setting goals for next year",
            "Comparing marks with classmates"
        ],
        "ans": 1,
        "exp": "Gap Identification means finding your 3 weakest areas so you can "
               "focus your revision there. Metacognitive students prioritise "
               "weak areas, not strong ones.",
        "steps": [
            "Recall the Gap Identification component.",
            "It involves finding 3 weakest areas from confidence + diagnostic data.",
        ],
        "verif": "Syllabus: 'identify your 3 weakest areas based on confidence "
                 "ratings and diagnostic question performance.'",
    },
    {
        "q": "Self-assessment rubrics in the metacognition node cover which areas?",
        "opts": [
            "Only composition writing",
            "Composition, comprehension, grammar, and literature",
            "Only grammar and spelling",
            "Only board exam preparation"
        ],
        "ans": 1,
        "exp": "The metacognition node includes self-assessment rubrics for four "
               "areas: composition, comprehension, grammar, and literature - all "
               "key components of the ICSE English exam.",
        "steps": [
            "Recall the areas covered by self-assessment rubrics.",
            "Rubrics cover four English exam components.",
        ],
        "verif": "Syllabus: 'self-assessment rubrics for composition, comprehension, "
                 "grammar, and literature'.",
    },
    {
        "q": "Progress Tracking in metacognition means:",
        "opts": [
            "Counting how many pages you have studied",
            "Tracking your confidence ratings over time to see improvement",
            "Recording the time you spend studying each day",
            "Listing all the topics you have completed"
        ],
        "ans": 1,
        "exp": "Progress Tracking involves monitoring confidence ratings over time "
               "to measure genuine improvement - not just counting pages or hours.",
        "steps": [
            "Recall the Progress Tracking component.",
            "It tracks confidence ratings over time.",
        ],
        "verif": "Syllabus: 'track your confidence ratings over time to see improvement.'",
    },
    {
        "q": "Metacognition means:",
        "opts": [
            "Learning very quickly",
            "Thinking about your own thinking and learning",
            "Memorising facts for exams",
            "Being confident in your abilities"
        ],
        "ans": 1,
        "exp": "Metacognition is 'thinking about thinking' - being aware of your "
               "own learning process, understanding your strengths and weaknesses, "
               "and strategically managing your learning.",
        "steps": [
            "Recall the definition of metacognition.",
            "Metacognition = thinking about one's own thinking.",
        ],
        "verif": "Syllabus: 'Metacognition - the practice of thinking about your "
                 "own thinking.'",
    },
]

_MC_FILL_BLANKS = [
    {
        "q": "The confidence rating scale used in self-assessment ranges from __ to __.",
        "ans": "1 to 5",
        "alt_answers": ["1-5", "1 - 5", "one to five", "1 to 5"],
        "exp": "Students rate their confidence on each topic from 1 (no "
               "understanding) to 5 (complete mastery).",
        "steps": ["Recall the confidence rating scale.",
                  "The range is 1 to 5."],
        "verif": "Syllabus: 'rate your confidence on a 1-5 scale.'",
    },
    {
        "q": "Metacognition is the practice of thinking about your own ________.",
        "ans": "thinking",
        "alt_answers": ["Thinking", "THINKING", "learning"],
        "exp": "Metacognition literally means 'thinking about thinking' - being "
               "aware of and managing one's own cognitive processes.",
        "steps": ["Recall the definition of metacognition.",
                  "It is 'thinking about thinking'."],
        "verif": "Syllabus: 'Metacognition - the practice of thinking about your "
                 "own thinking.'",
    },
    {
        "q": "The metacognition system helps students identify their ________ "
             "weakest areas for targeted revision.",
        "ans": "three",
        "alt_answers": ["3", "THREE", "Three"],
        "exp": "Gap Identification identifies the 3 weakest areas so students "
               "can focus their limited revision time effectively.",
        "steps": ["Recall the Gap Identification component.",
                  "Students identify 3 weakest areas."],
        "verif": "Syllabus: 'identify your 3 weakest areas based on confidence "
                 "ratings and diagnostic question performance.'",
    },
    {
        "q": "Researchers ________, Pintrich, and Flavell are cited as key figures "
             "in metacognition research.",
        "ans": "Zimmerman",
        "alt_answers": ["Zimmerman", "ZIMMERMAN"],
        "exp": "Zimmerman is a key researcher in self-regulated learning and "
               "metacognition, alongside Pintrich and Flavell.",
        "steps": ["Recall the researchers cited in the syllabus.",
                  "Zimmerman is the first researcher listed."],
        "verif": "Syllabus: 'Research from educational psychology (Zimmerman, "
                 "Pintrich, Flavell)'.",
    },
    {
        "q": "In the metacognition system, ________ Planning creates a targeted "
             "revision plan focusing on weak areas.",
        "ans": "Revision",
        "alt_answers": ["revision", "REVISION"],
        "exp": "Revision Planning is the third component: creating a plan that "
               "targets weak areas rather than reviewing everything equally.",
        "steps": ["Recall the four components.",
                  "Component 3 is Revision Planning."],
        "verif": "Syllabus: '(3) REVISION PLANNING - create a targeted revision "
                 "plan that focuses on weak areas, not strong ones.'",
    },
    {
        "q": "A student who knows WHERE their knowledge gaps are, and adjusts their "
             "study accordingly, is demonstrating ________ awareness.",
        "ans": "metacognitive",
        "alt_answers": ["Metacognitive", "METACOGNITIVE"],
        "exp": "Metacognitive awareness means knowing what you know and what you "
               "don't know - the ability to self-assess and strategically manage "
               "learning.",
        "steps": ["Recall the definition of metacognitive awareness.",
                  "It means knowing one's own knowledge gaps."],
        "verif": "Syllabus: 'the 95% student studies hard AND knows exactly where "
                 "their gaps are, because they have a system for self-assessment.'",
    },
]

_MC_SHORT_ANSWERS = [
    {
        "q": "Explain the 1-5 confidence rating scale used in metacognitive "
             "self-assessment. What does each number represent? (5 marks)",
        "ans": "1 = No understanding; need to start from basics. "
               "2 = Very limited understanding; significant gaps. "
               "3 = Partial understanding; some areas are clear but gaps remain. "
               "4 = Good understanding; minor gaps that need practice. "
               "5 = Complete mastery; can teach the topic to others.",
        "steps": [
            "Define rating 1 (no understanding).",
            "Define rating 2 (limited, significant gaps).",
            "Define rating 3 (partial, some gaps).",
            "Define rating 4 (good, minor gaps).",
            "Define rating 5 (complete mastery).",
        ],
        "verif": "All five levels are defined clearly. Scale interpretation is "
                 "consistent with the syllabus description.",
    },
    {
        "q": "How does Revision Planning differ from simply 'studying everything'? "
             "Why is targeted revision more effective? (3 marks)",
        "ans": "Revision Planning focuses on the 3 weakest areas identified through "
               "confidence ratings and diagnostic tests. 'Studying everything' wastes "
               "time on already-mastered topics. Targeted revision maximises the "
               "limited study time available before exams by prioritising gaps, "
               "which typically yields the greatest mark improvement.",
        "steps": [
            "Explain what Revision Planning does (targets weak areas).",
            "Explain the problem with 'studying everything'.",
            "Explain why targeted revision is more effective.",
        ],
        "verif": "Answer correctly contrasts targeted vs blanket revision and "
                 "explains the efficiency argument.",
    },
    {
        "q": "What four areas does the self-assessment rubric in the metacognition "
             "node cover? Briefly explain why each is important for ICSE English. (4 marks)",
        "ans": "(1) Composition: 20-mark creative writing - rubric helps students "
               "self-evaluate structure, language, and content. (2) Comprehension: "
               "Tests understanding of text and answer quality. (3) Grammar: "
               "Objective-type marks that require accuracy. (4) Literature: "
               "Text-based questions needing textual evidence and analysis. Each "
               "rubric aligns with ICSE marking criteria, helping students "
               "benchmark their own work.",
        "steps": [
            "List all four areas.",
            "Explain importance of composition rubric.",
            "Explain importance of comprehension rubric.",
            "Explain importance of grammar and literature rubrics.",
        ],
        "verif": "All four areas are listed with specific relevance to ICSE English "
                 "components.",
    },
]

_MC_LONG_ANSWERS = [
    {
        "q": "Design a weekly self-assessment and revision plan for a Class 9 ICSE "
             "English student who rates themselves as follows: Writing Process = 2/5, "
             "Descriptive Composition = 3/5, Metacognition = 4/5. Include: (a) "
             "specific activities for each topic, (b) how you will track progress, "
             "and (c) how you will re-rate confidence after one week. (8 marks)",
        "ans": "(a) Writing Process (2/5): Spend 20 min/day practising brainstorming "
               "for 5 different composition topics; produce first drafts and revise "
               "using the 4-stage process. Descriptive Composition (3/5): Write one "
               "300-word composition per day, self-assess using the rubric (sensory "
               "detail, figurative language, structure). Metacognition (4/5): Read "
               "the node once and apply confidence ratings to other subjects. "
               "(b) Track progress: Maintain a log of confidence ratings before and "
               "after each study session; note specific improvements in a journal. "
               "(c) Re-rate: After one week, rate again on 1-5 scale. Expected "
               "improvement: Writing Process 2→3, Descriptive 3→4, Metacognition "
               "4→5. Compare pre/post ratings to measure growth.",
        "steps": [
            "Analyse the confidence profile.",
            "Design targeted activities for the weakest area (Writing Process).",
            "Design activities for the middle area (Descriptive Composition).",
            "Brief activities for the strong area (Metacognition).",
            "Describe progress tracking method.",
            "Describe the re-rating procedure.",
            "Set expected improvements.",
        ],
        "verif": "Activities are proportionate to confidence levels. Tracking and "
                 "re-rating procedures are clearly defined. The plan is realistic "
                 "for a weekly schedule.",
    },
    {
        "q": "Explain how metacognition can help a student improve their ICSE English "
             "composition scores from 12/20 to 17/20. Use the four components of the "
             "metacognition system in your answer. (6 marks)",
        "ans": "(1) Confidence Rating: After a diagnostic, the student realises "
               "their descriptive composition score (12/20) is low - confidence "
               "rating 2/5. (2) Gap Identification: Analysis reveals three gaps: "
               "weak sensory detail, no figurative language, and missing reflective "
               "close. (3) Revision Planning: Targeted plan - Day 1-2: practise "
               "sensory detail; Day 3-4: integrate figurative language; Day 5: "
               "write full compositions with reflective closes. (4) Progress "
               "Tracking: After each practice, re-rate confidence. By week 2, "
               "ratings improve to 4/5. With targeted practice, marks improve "
               "from 12 to 17/20.",
        "steps": [
            "Part (1): Apply Confidence Rating to identify the problem area.",
            "Part (2): Use Gap Identification to find specific weaknesses.",
            "Part (3): Create a Revision Plan targeting the three gaps.",
            "Part (4): Track progress with re-ratings.",
            "Show the outcome (12 → 17/20).",
        ],
        "verif": "All four metacognition components are applied systematically. "
                 "The improvement trajectory is realistic and well-reasoned.",
    },
]


# ──────────────────────────────────────────────
# Numerical Questions (word-count, percentages)
# ──────────────────────────────────────────────

_NUMERICAL_QUESTIONS = [
    {
        "q": "An ICSE descriptive composition must be between 300 and 350 words. "
             "If a student has written 240 words and each additional sentence "
             "adds approximately 18 words, how many more sentences must they "
             "write to reach the minimum word count?",
        "ans": 4,
        "exp": "Need to reach 300 words from 240. Shortfall = 60 words. "
               "At 18 words/sentence: 60 / 18 = 3.33, so 4 sentences needed.",
        "steps": [
            "Calculate shortfall: 300 - 240 = 60 words.",
            "Divide by words per sentence: 60 / 18 = 3.33.",
            "Round up to whole sentences: 4 sentences.",
        ],
        "verif": "4 x 18 = 72. 240 + 72 = 312 >= 300. ✓",
    },
    {
        "q": "A composition rubric awards marks as follows: Content (5 marks), "
             "Language (5 marks), Organisation (5 marks), and Presentation (5 marks). "
             "If a student scores Content: 3/5, Language: 4/5, Organisation: 2/5, "
             "Presentation: 4/5, what is the total score and percentage?",
        "ans": 13,
        "ans_pct": 65.0,
        "exp": "Total marks obtained: 3 + 4 + 2 + 4 = 13 out of 20. "
               "Percentage: (13/20) x 100 = 65%.",
        "steps": [
            "Sum the marks: 3 + 4 + 2 + 4 = 13.",
            "Total possible: 5 x 4 = 20.",
            "Percentage: (13/20) x 100 = 65%.",
        ],
        "verif": "13/20 = 0.65 → 65%. ✓",
    },
    {
        "q": "In a metacognition confidence survey, a student rates 8 topics. Their "
             "average rating is 2.75 out of 5. If they improve 3 of the lowest-rated "
             "topics by 2 points each, what will the new average be?",
        "ans": 3.5,
        "exp": "Current total: 8 x 2.75 = 22. After improvement: 22 + (3 x 2) = 28. "
               "New average: 28 / 8 = 3.5.",
        "steps": [
            "Calculate current total: 8 x 2.75 = 22.",
            "Add improvement: 22 + 6 = 28.",
            "New average: 28 / 8 = 3.5.",
        ],
        "verif": "28 / 8 = 3.5. ✓",
    },
    {
        "q": "A student aims to practise writing compositions 4 times a week, each "
             "taking 35 minutes. How many hours per week will they spend on "
             "composition practice?",
        "ans": 2.33,
        "exp": "Total minutes: 4 x 35 = 140 minutes. Hours: 140 / 60 = 2.33 hours "
               "(or 2 hours and 20 minutes).",
        "steps": [
            "Total minutes: 4 x 35 = 140.",
            "Convert to hours: 140 / 60 = 2.333...",
            "Rounded to 2 decimal places: 2.33 hours.",
        ],
        "verif": "2.33 x 60 = 139.8 ≈ 140. ✓",
    },
]


# ──────────────────────────────────────────────
# Solver Functions
# ──────────────────────────────────────────────

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a multiple-choice question."""
    q_index = params.get("q_index", 0)
    topic = params.get("topic", "writing_process")
    bank = {
        "writing_process": _WP_MCQS,
        "descriptive_composition": _DC_MCQS,
        "metacognition": _MC_MCQS,
    }
    questions = bank.get(topic, _WP_MCQS)
    q = questions[q_index % len(questions)]
    correct_idx = q["ans"]
    correct_text = q["opts"][correct_idx]
    return {
        "answer": correct_text,
        "answer_index": correct_idx,
        "steps": q["steps"],
        "verification": q["verif"],
        "explanation": q["exp"],
    }


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a fill-in-the-blank question."""
    q_index = params.get("q_index", 0)
    topic = params.get("topic", "writing_process")
    bank = {
        "writing_process": _WP_FILL_BLANKS,
        "descriptive_composition": _DC_FILL_BLANKS,
        "metacognition": _MC_FILL_BLANKS,
    }
    questions = bank.get(topic, _WP_FILL_BLANKS)
    q = questions[q_index % len(questions)]
    return {
        "answer": q["ans"],
        "alt_answers": q.get("alt_answers", []),
        "steps": q["steps"],
        "verification": q["verif"],
        "explanation": q["exp"],
    }


def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve / evaluate a short-answer question."""
    q_index = params.get("q_index", 0)
    topic = params.get("topic", "writing_process")
    bank = {
        "writing_process": _WP_SHORT_ANSWERS,
        "descriptive_composition": _DC_SHORT_ANSWERS,
        "metacognition": _MC_SHORT_ANSWERS,
    }
    questions = bank.get(topic, _WP_SHORT_ANSWERS)
    q = questions[q_index % len(questions)]
    return {
        "model_answer": q["ans"],
        "steps": q["steps"],
        "verification": q["verif"],
        "explanation": q["exp"],
    }


def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve / evaluate a long-answer question."""
    q_index = params.get("q_index", 0)
    topic = params.get("topic", "writing_process")
    bank = {
        "writing_process": _WP_LONG_ANSWERS,
        "descriptive_composition": _DC_LONG_ANSWERS,
        "metacognition": _MC_LONG_ANSWERS,
    }
    questions = bank.get(topic, _WP_LONG_ANSWERS)
    q = questions[q_index % len(questions)]
    return {
        "model_answer": q["ans"],
        "rubric_checklist": q["steps"],
        "verification": q["verif"],
        "explanation": q["exp"],
    }


def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a numerical question."""
    q_index = params.get("q_index", 0)
    q = _NUMERICAL_QUESTIONS[q_index % len(_NUMERICAL_QUESTIONS)]
    computed = q["ans"]
    return {
        "answer": computed,
        "answer_pct": q.get("ans_pct"),
        "steps": q["steps"],
        "verification": q["verif"],
        "explanation": q["exp"],
    }


# ──────────────────────────────────────────────
# Question Generator
# ──────────────────────────────────────────────

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministically generate `count` questions covering all three syllabus topics.
    Mix: ~50% competency-based (Indian ICSE context), ~50% standard.
    Question types: MCQ, fill-blank, short-answer, long-answer, numerical.
    """
    rng = random.Random(seed)

    # Shuffle question bank indices per topic
    wp_mcq_idx = list(range(len(_WP_MCQS)))
    dc_mcq_idx = list(range(len(_DC_MCQS)))
    mc_mcq_idx = list(range(len(_MC_MCQS)))
    wp_fb_idx = list(range(len(_WP_FILL_BLANKS)))
    dc_fb_idx = list(range(len(_DC_FILL_BLANKS)))
    mc_fb_idx = list(range(len(_MC_FILL_BLANKS)))
    wp_sa_idx = list(range(len(_WP_SHORT_ANSWERS)))
    dc_sa_idx = list(range(len(_DC_SHORT_ANSWERS)))
    mc_sa_idx = list(range(len(_MC_SHORT_ANSWERS)))
    wp_la_idx = list(range(len(_WP_LONG_ANSWERS)))
    dc_la_idx = list(range(len(_DC_LONG_ANSWERS)))
    mc_la_idx = list(range(len(_MC_LONG_ANSWERS)))
    num_idx = list(range(len(_NUMERICAL_QUESTIONS)))

    for idx_list in [wp_mcq_idx, dc_mcq_idx, mc_mcq_idx, wp_fb_idx, dc_fb_idx,
                     mc_fb_idx, wp_sa_idx, dc_sa_idx, mc_sa_idx,
                     wp_la_idx, dc_la_idx, mc_la_idx, num_idx]:
        rng.shuffle(idx_list)

    # Question type pool with weights
    type_weights = [
        (QuestionType.MQC.value, 5),
        (QuestionType.FILL_BLANK.value, 3),
        (QuestionType.SHORT_ANSWER.value, 3),
        (QuestionType.LONG_ANSWER.value, 2),
        (QuestionType.NUMERICAL.value, 2),
    ]
    type_pool = []
    for t, w in type_weights:
        type_pool.extend([t] * w)
    rng.shuffle(type_pool)

    # Topic pool with equal distribution
    topic_pool = ([Topic.WRITING_PROCESS.value] * 3 +
                  [Topic.DESCRIPTIVE_COMPOSITION.value] * 3 +
                  [Topic.METACOGNITION.value] * 3)
    rng.shuffle(topic_pool)

    # Competency flag: ~50% competency-based (Indian ICSE context)
    competency_pool = [True] * (count // 2 + count % 2) + [False] * (count // 2)
    rng.shuffle(competency_pool)

    # Difficulty levels
    diff_pool = ["Easy", "Easy", "Easy", "Medium", "Medium", "Hard"]
    rng.shuffle(diff_pool)

    # Bank map
    mcq_banks = {
        Topic.WRITING_PROCESS.value: _WP_MCQS,
        Topic.DESCRIPTIVE_COMPOSITION.value: _DC_MCQS,
        Topic.METACOGNITION.value: _MC_MCQS,
    }
    fb_banks = {
        Topic.WRITING_PROCESS.value: _WP_FILL_BLANKS,
        Topic.DESCRIPTIVE_COMPOSITION.value: _DC_FILL_BLANKS,
        Topic.METACOGNITION.value: _MC_FILL_BLANKS,
    }
    sa_banks = {
        Topic.WRITING_PROCESS.value: _WP_SHORT_ANSWERS,
        Topic.DESCRIPTIVE_COMPOSITION.value: _DC_SHORT_ANSWERS,
        Topic.METACOGNITION.value: _MC_SHORT_ANSWERS,
    }
    la_banks = {
        Topic.WRITING_PROCESS.value: _WP_LONG_ANSWERS,
        Topic.DESCRIPTIVE_COMPOSITION.value: _DC_LONG_ANSWERS,
        Topic.METACOGNITION.value: _MC_LONG_ANSWERS,
    }

    # Index trackers per (topic, type)
    mcq_pos = {t: 0 for t in [Topic.WRITING_PROCESS.value,
                                Topic.DESCRIPTIVE_COMPOSITION.value,
                                Topic.METACOGNITION.value]}
    fb_pos = {t: 0 for t in [Topic.WRITING_PROCESS.value,
                               Topic.DESCRIPTIVE_COMPOSITION.value,
                               Topic.METACOGNITION.value]}
    sa_pos = {t: 0 for t in [Topic.WRITING_PROCESS.value,
                               Topic.DESCRIPTIVE_COMPOSITION.value,
                               Topic.METACOGNITION.value]}
    la_pos = {t: 0 for t in [Topic.WRITING_PROCESS.value,
                               Topic.DESCRIPTIVE_COMPOSITION.value,
                               Topic.METACOGNITION.value]}
    num_pos = 0

    marks_map = {
        QuestionType.MQC.value: 1,
        QuestionType.FILL_BLANK.value: 1,
        QuestionType.SHORT_ANSWER.value: 4,
        QuestionType.LONG_ANSWER.value: 6,
        QuestionType.NUMERICAL.value: 2,
    }

    questions: List[Dict[str, Any]] = []

    for i in range(count):
        qtype = type_pool[i % len(type_pool)]
        topic = topic_pool[i % len(topic_pool)]
        competency = competency_pool[i % len(competency_pool)]
        difficulty = diff_pool[i % len(diff_pool)]
        marks = marks_map[qtype]

        qid = f"C9_ENG_{seed:06d}_{i:04d}"

        if qtype == QuestionType.MQC.value:
            bank = mcq_banks[topic]
            pos = mcq_pos[topic] % len(bank)
            mcq_pos[topic] += 1
            q_data = bank[pos]
            questions.append({
                "id": qid,
                "type": qtype,
                "topic": topic,
                "question": q_data["q"],
                "options": q_data["opts"],
                "answer": q_data["opts"][q_data["ans"]],
                "answer_index": q_data["ans"],
                "explanation": q_data["exp"],
                "steps": q_data["steps"],
                "verification": q_data["verif"],
                "difficulty": difficulty,
                "competency_based": competency,
                "marks": marks,
            })

        elif qtype == QuestionType.FILL_BLANK.value:
            bank = fb_banks[topic]
            pos = fb_pos[topic] % len(bank)
            fb_pos[topic] += 1
            q_data = bank[pos]
            questions.append({
                "id": qid,
                "type": qtype,
                "topic": topic,
                "question": q_data["q"],
                "options": None,
                "answer": q_data["ans"],
                "alt_answers": q_data.get("alt_answers", []),
                "explanation": q_data["exp"],
                "steps": q_data["steps"],
                "verification": q_data["verif"],
                "difficulty": difficulty,
                "competency_based": competency,
                "marks": marks,
            })

        elif qtype == QuestionType.SHORT_ANSWER.value:
            bank = sa_banks[topic]
            pos = sa_pos[topic] % len(bank)
            sa_pos[topic] += 1
            q_data = bank[pos]

    return {"status": "ok", "note": "truncated"}
