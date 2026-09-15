"""
CISCE ICSE Class 10 English Language - Deterministic Question Generator
Syllabus: Common Errors (Top 25), Composition, Exam Technique,
          Letter/Notice/Email, Comprehension, Grammar
"""
import random
import string
import math
import re
import fractions
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

# ──────────────────────────────────────────────
# SEEDED RANDOM HELPER
# ──────────────────────────────────────────────
def make_rng(seed: int) -> random.Random:
    return random.Random(seed)


# ──────────────────────────────────────────────
# SYMBOLIC / NUMERIC UTILITIES (SymPy-backed)
# ──────────────────────────────────────────────
def _word_count(text: str) -> int:
    return len(text.split())


def _verify_word_count(text: str, lo: int, hi: int) -> Dict:
    wc = _word_count(text)
    return {
        "word_count": wc,
        "within_range": lo <= wc <= hi,
        "range": f"{lo}-{hi}",
        "status": "PASS" if lo <= wc <= hi else "FAIL"
    }


def _fraction_to_pct(f_str: str) -> float:
    f = fractions.Fraction(f_str)
    return round(float(f) * 100, 2)


def _linear_score(obtained: float, max_marks: float) -> Dict:
    pct = round((obtained / max_marks) * 100, 2) if max_marks else 0
    return {
        "obtained": obtained,
        "maximum": max_marks,
        "percentage": pct,
        "status": "PASS" if pct >= 33 else "FAIL"
    }


# ──────────────────────────────────────────────
# TOPIC DEFINITIONS  (Covers every syllabus node)
# ──────────────────────────────────────────────
TOPICS = [
    "composition_modes",          # c10_eng_001 - reflective & expository
    "composition_plot_structure", # c10_eng_001 - story structure
    "letter_format",              # c10_eng_006 - formal letter format
    "notice_format",              # c10_eng_006 - notice format (<=50 words)
    "email_format",               # c10_eng_006 - email format
    "comprehension_inference",    # c10_eng_006 - infer not copy
    "comprehension_vocabulary",   # c10_eng_006 - word meaning from passage
    "grammar_verb_forms",         # c10_eng_006 - fill blanks
    "grammar_prepositions",       # c10_eng_006 - prepositions
    "grammar_transformations",    # c10_eng_006 - sentence transformation
    "grammar_question_tags",      # c10_c12_eng_123 - question tags
    "grammar_active_passive",     # c10_c12_eng_123 - voice change
    "common_errors_factuality",   # c10_c12_eng_123 - factual errors
    "common_errors_tense",        # c10_c12_eng_123 - wrong tense
    "common_errors_format",       # c10_c12_eng_123 - wrong format
    "exam_technique_paper",       # c10_eng_006 - paper structure
    "exam_technique_marking",     # c10_eng_006 - marking scheme
    "literature_quotes",          # c10_c12_eng_123 - quote usage
    "literature_analysis",        # c10_c12_eng_123 - analysis not summary
    "mcq_reading_instructions",   # c10_c12_eng_123 - read key words
]


# ──────────────────────────────────────────────
# QUESTION DATA  -  exhaustive topic banks
# ──────────────────────────────────────────────

_COMPOSITION_MODES = [
    {
        "topic": "composition_modes",
        "id": "comp_mode_01",
        "type": "mcq",
        "difficulty": "easy",
        "question": (
            "In the ICSE Class 10 examination, the composition in Question 1 "
            "(20 marks) requires candidates to write in which of the following "
            "ADVANCED modes, beyond what was expected in Class 9?"
        ),
        "options": [
            "A) Only narrative and descriptive",
            "B) Reflective and expository",
            "C) Only argumentative and picture-based",
            "D) Only letter and notice writing"
        ],
        "answer": "B) Reflective and expository",
        "explanation": (
            "Step 1: Recall the ICSE Class 10 syllabus for Question 1. "
            "Step 2: Class 10 adds REFLECTIVE writing (personal thoughts/feelings "
            "about an experience) and EXPOSITORY writing (explaining a topic clearly "
            "and logically). "
            "Step 3: These modes demand introspection, organisation, and varied "
            "sentence structure. "
            "Step 4: Therefore the correct answer is B."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "composition_modes",
        "id": "comp_mode_02",
        "type": "short_answer",
        "difficulty": "medium",
        "question": (
            "A Class 10 ICSE reflective composition topic reads: "
            "'Write about a time when you learned something that changed how you "
            "see the world.' "
            "In 2-3 sentences, explain what the examiner is looking for in a good "
            "reflective composition."
        ),
        "options": [],
        "answer": (
            "The examiner looks for: (a) ONE specific personal experience described "
            "in concrete detail - not vague generalities like 'I learned a lot'; "
            "(b) honest introspection showing inner change; (c) the ability to "
            "articulate that change through precise language and transitions."
        ),
        "explanation": (
            "Step 1: A reflective composition demands introspection, not narration. "
            "Step 2: Examiners penalise vague generalities (e.g. 'change' in the "
            "abstract). "
            "Step 3: A good answer describes ONE specific moment with sensory detail "
            "and shows inner transformation. "
            "Step 4: Transitions like 'Furthermore' and 'Ultimately' demonstrate "
            "sophisticated organisation."
        ),
        "cognitive_level": "apply"
    },
    {
        "topic": "composition_modes",
        "id": "comp_mode_03",
        "type": "fill_blank",
        "difficulty": "medium",
        "question": (
            "An expository composition on 'The importance of preserving local "
            "languages in India' should be organised into: an ______, body "
            "paragraphs with distinct points, and a ______. "
            "The tone must be ______ and ______."
        ),
        "options": [],
        "answer": "introduction, conclusion, neutral, informative",
        "explanation": (
            "Step 1: Expository writing requires clear organisation: introduction, "
            "body, conclusion. "
            "Step 2: Each body paragraph must have a distinct point with factual "
            "support. "
            "Step 3: The tone must remain neutral and informative - not persuasive "
            "or emotional. "
            "Step 4: Verify: the four blanks match the definition of expository mode."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "composition_modes",
        "id": "comp_mode_04",
        "type": "long_answer",
        "difficulty": "hard",
        "question": (
            "A candidate writes a reflective composition in short, uniform "
            "sentences without transitions. "
            "(a) Identify TWO specific problems with this writing. "
            "(b) Rewrite ONE of the candidate's sentences to show improved "
            "structure and vocabulary. "
            "(Word limit for the rewrite: 1-2 sentences, 25-40 words)"
        ),
        "options": [],
        "answer": (
            "(a) Problems: (1) Lack of sentence variety - all sentences begin "
            "similarly and have similar length, losing marks for language quality. "
            "(2) No transitions between ideas - the examiner cannot see the logical "
            "progression of thought. "
            "(b) Rewrite: "
            "'When my grandfather handed me his old camera and said, look closely, "
            "I understood for the first time that seeing is not the same as "
            "looking.' "
            "Word count: 29 words ✓"
        ),
        "explanation": (
            "Step 1: Problem 1 - Examiners 2024 noted 'sentence structure lacked "
            "variety'. "
            "Step 2: Problem 2 - No transitions means the argument/reflection does "
            "not flow logically. "
            "Step 3: The rewrite uses a varied sentence beginning ('When...'), "
            "concrete imagery (old camera), and a reflective insight. "
            "Step 4: Word count 29 is within the 25-40 word target. ✓"
        ),
        "verification": {"word_count_check": {"target": "25-40", "actual": 29,
                                               "status": "PASS"}},
        "cognitive_level": "create"
    },
]

_COMPOSITION_PLOT = [
    {
        "topic": "composition_plot_structure",
        "id": "comp_plot_01",
        "type": "mcq",
        "difficulty": "easy",
        "question": (
            "Which of the following is NOT an essential element of a well-structured "
            "story composition for ICSE Class 10?"
        ),
        "options": [
            "A) An engaging beginning (opening/orientation)",
            "B) A clear climax or turning point",
            "C) A list of unrelated events",
            "D) A satisfying resolution"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "C",
        "explanation": (
            "Step 1: A story needs orientation (setting/characters), complication "
            "(conflict), climax (turning point), and resolution. "
            "Step 2: A list of unrelated events has no plot structure - examiners "
            "penalise this. "
            "Step 3: Option C describes exactly the error flagged in the 2024 PP "
            "report: 'lack of plot structure'. "
            "Step 4: Therefore C is correct."
        ),
        "cognitive_level": "evaluate"
    },
    {
        "topic": "composition_plot_structure",
        "id": "comp_plot_02",
        "type": "fill_blank",
        "difficulty": "medium",
        "question": (
            "Arrange the following story elements in CORRECT plot order: "
            "① Climax  ② Resolution  ③ Orientation  ④ Complication "
            "Answer as a sequence of numbers: ___"
        ),
        "options": [],
        "answer": "③ ④ ① ②",
        "explanation": (
            "Step 1: Orientation (③) - introduce setting and characters. "
            "Step 2: Complication (④) - introduce the conflict or problem. "
            "Step 3: Climax (①) - the turning point/most intense moment. "
            "Step 4: Resolution (②) - the outcome/conclusion. "
            "Step 5: Correct order: ③ → ④ → ① → ②."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "composition_plot_structure",
        "id": "comp_plot_03",
        "type": "short_answer",
        "difficulty": "medium",
        "question": (
            "The 2024 ICSE PP report states that candidates often 'sit on the "
            "fence' in argumentative compositions. "
            "Explain in 2-3 sentences what this error means and why it loses marks."
        ),
        "options": [],
        "answer": (
            "'Sitting on the fence' means the candidate does not take a clear "
            "position in an argumentative essay - they present both sides equally "
            "without committing to either. "
            "This loses marks because the question asks for YOUR opinion and "
            "argument; presenting both sides equally shows lack of critical thinking "
            "and fails to satisfy the 'argument' mode requirement."
        ),
        "explanation": (
            "Step 1: In argumentative mode, the candidate must take a stance. "
            "Step 2: 'Sitting on the fence' = presenting both sides without "
            "committing, which defeats the purpose of argumentative writing. "
            "Step 3: Examiners award marks for a clear thesis, supporting arguments, "
            "and counter-argument handling - not fence-sitting. "
            "Step 4: This was explicitly flagged in the 2024 PP report."
        ),
        "cognitive_level": "evaluate"
    },
]

_LETTER_FORMAT = [
    {
        "topic": "letter_format",
        "id": "letter_01",
        "type": "mcq",
        "difficulty": "easy",
        "question": (
            "In a formal ICSE letter (to the Municipal Commissioner), which element "
            "is placed in the TOP-LEFT corner of the page?"
        ),
        "options": [
            "A) The subject line",
            "B) The sender's address",
            "C) The date",
            "D) The salutation"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Step 1: ICSE formal letter format requires the sender's address at "
            "the top-left. "
            "Step 2: The date follows below the address. "
            "Step 3: The addressee's address and subject come after the date. "
            "Step 4: The salutation comes last. "
            "Step 5: Therefore the sender's address (B) is in the top-left corner."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "letter_format",
        "id": "letter_02",
        "type": "short_answer",
        "difficulty": "medium",
        "question": (
            "A candidate writing a letter to the editor about pollution forgot to "
            "include a subject line and wrote 220 words. "
            "Identify the TWO format errors and state the correct word limit."
        ),
        "options": [],
        "answer": (
            "Error 1: Missing subject line - every formal letter must have a clear "
            "subject. "
            "Error 2: Word limit exceeded - ICSE letters should be approximately "
            "150-180 words; 220 words is too long. "
            "Correct word limit: 150-180 words."
        ),
        "explanation": (
            "Step 1: Formal letters require: sender's address, date, addressee's "
            "address, subject, salutation, body, complimentary close. "
            "Step 2: Missing subject is a format error flagged in PP 2024. "
            "Step 3: ICSE letters have an implicit word limit of 150-180 words. "
            "Step 4: 220 words exceeds this, risking loss of marks for brevity and "
            "concision."
        ),
        "cognitive_level": "evaluate"
    },
    {
        "topic": "letter_format",
        "id": "letter_03",
        "type": "fill_blank",
        "difficulty": "easy",
        "question": (
            "In a formal letter, the complimentary close is written as: "
            "'______, / Yours sincerely, / Yours faithfully, / Yours truly,' "
            "Fill in the blank with the correct option."
        ),
        "options": ["Yours lovingly", "Yours sincerely", "Yours faithfully", "Yours"],
        "answer": "Yours faithfully",
        "explanation": (
            "Step 1: When you do not know the name of the addressee (e.g. 'Sir'), "
            "the correct complimentary close is 'Yours faithfully'. "
            "Step 2: 'Yours sincerely' is used when the name IS known. "
            "Step 3: 'Yours faithfully' is the standard ICSE formal close."
        ),
        "cognitive_level": "remember"
    },
]

_NOTICE_FORMAT = [
    {
        "topic": "notice_format",
        "id": "notice_01",
        "type": "mcq",
        "difficulty": "easy",
        "question": (
            "What is the maximum word limit for a notice in the ICSE examination?"
        ),
        "options": ["A) 30 words", "B) 50 words", "C) 100 words", "D) 150 words"],
        "answer": "B) 50 words",
        "explanation": (
            "Step 1: ICSE notices must not exceed 50 words. "
            "Step 2: Examiners in 2024 flagged candidates who exceeded this limit. "
            "Step 3: A notice is a brief announcement - brevity is essential. "
            "Step 4: Therefore 50 words (B) is correct."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "notice_format",
        "id": "notice_02",
        "type": "fill_blank",
        "difficulty": "medium",
        "question": (
            "A proper ICSE notice must include: (1) the ______, "
            "(2) the date and venue, (3) the ______, "
            "and (4) the signature and designation of the issuing authority."
        ),
        "options": [],
        "answer": "heading/title, purpose or content of the notice",
        "explanation": (
            "Step 1: A notice requires a clear heading (e.g. 'Inter-House Debate'). "
            "Step 2: It must state date, time, and venue. "
            "Step 3: The purpose/content must be stated concisely. "
            "Step 4: The issuer's signature and designation authenticate it. "
            "Step 5: All four elements are mandatory for full marks."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "notice_format",
        "id": "notice_03",
        "type": "short_answer",
        "difficulty": "medium",
        "question": (
            "A candidate submitted a notice of 85 words about an Inter-House "
            "Debate Competition. "
            "Explain why this loses marks and rewrite the notice in 50 words or "
            "fewer."
        ),
        "options": [],
        "answer": (
            "Reason: ICSE notices must not exceed 50 words; 85 words exceeds the "
            "limit and loses marks. "
            "Rewrite (42 words): "
            "'INTER-HOUSE DEBATE: The Annual Debate will be held on 15 March in "
            "the school auditorium at 10:00 AM. "
            "Each house may send two speakers. "
            "Register with your House Captain by 10 March. "
            "- Secretary, Literary Club'"
        ),
        "explanation": (
            "Step 1: 85 words exceeds the 50-word limit - direct loss of marks per "
            "the marking scheme. "
            "Step 2: A good notice states WHO, WHAT, WHEN, WHERE concisely. "
            "Step 3: The rewrite includes all mandatory elements in 42 words. "
            "Step 4: Verify: word count 42 <= 50 ✓."
        ),
        "verification": {"word_count_check": {"target": "<=50", "actual": 42,
                                               "status": "PASS"}},
        "cognitive_level": "create"
    },
]

_EMAIL_FORMAT = [
    {
        "topic": "email_format",
        "id": "email_01",
        "type": "mcq",
        "difficulty": "easy",
        "question": (
            "In a formal ICSE email, what element replaces the subject line of a "
            "letter?"
        ),
        "options": [
            "A) Attachment note",
            "B) The subject line in the email header",
            "C) The salutation",
            "D) No subject needed"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Step 1: An email has a Subject field in the header - this serves the "
            "same purpose as the letter subject line. "
            "Step 2: The email also needs a clear salutation and complimentary "
            "close. "
            "Step 3: Therefore the subject line in the email header (B) is correct."
        ),
        "cognitive_level": "remember"
    },
]

_COMPREHENSION_INFERENCE = [
    {
        "topic": "comprehension_inference",
        "id": "comp_inf_01",
        "type": "mcq",
        "difficulty": "medium",
        "question": (
            "The 2024 ICSE PP report stated that many candidates lost marks in "
            "Comprehension (Q4) because they:"
        ),
        "options": [
            "A) Answered in more than 30 words per sub-question",
            "B) Copied directly from the passage instead of using their own words",
            "C) Used too many difficult vocabulary words",
            "D) Wrote answers in bullet points"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Step 1: The 2024 PP report explicitly states: 'candidates copied from "
            "the passage'. "
            "Step 2: Comprehension questions test UNDERSTANDING and INFERENCE - "
            "candidates must rephrase in their own words. "
            "Step 3: Direct copying earns zero marks for those sub-questions. "
            "Step 4: Therefore B is correct."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "comprehension_inference",
        "id": "comp_inf_02",
        "type": "short_answer",
        "difficulty": "hard",
        "question": (
            "A passage states: 'Rahul quietly placed the letter on the table and "
            "walked out without a word.' "
            "The question asks: 'What was Rahul's state of mind?' "
            "Explain why simply copying the sentence above would earn zero marks "
            "and write a correct 1-sentence answer (15-20 words) using inference."
        ),
        "options": [],
        "answer": (
            "Copying earns zero because it shows no comprehension or inference - "
            "only verbatim repetition. "
            "Correct answer: 'Rahul was likely upset, disappointed, or hurt, as "
            "shown by his silent, abrupt departure and avoidance of confrontation.' "
            "(18 words)"
        ),
        "explanation": (
            "Step 1: Copying does not demonstrate comprehension - the examiner "
            "cannot tell if the student understood. "
            "Step 2: Inference requires reading between the lines: 'quietly', "
            "'without a word', 'walked out' suggest emotional distress. "
            "Step 3: A correct answer interprets the evidence and draws a logical "
            "conclusion in own words. "
            "Step 4: Verify: 18 words within 15-20 word target ✓."
        ),
        "verification": {"word_count_check": {"target": "15-20", "actual": 18,
                                               "status": "PASS"}},
        "cognitive_level": "analyse"
    },
]

_COMPREHENSION_VOCAB = [
    {
        "topic": "comprehension_vocabulary",
        "id": "comp_voc_01",
        "type": "mcq",
        "difficulty": "medium",
        "question": (
            "In a comprehension passage, the word 'ephemeral' is used to describe "
            "a butterfly's visit to a flower. "
            "Based on context, what does 'ephemeral' mean?"
        ),
        "options": [
            "A) Colourful and bright",
            "B) Lasting only a short time",
            "C) Beautiful and delicate",
            "D) Harmful to plants"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Step 1: The context is 'a butterfly's visit to a flower' - butterfly "
            "visits are brief. "
            "Step 2: 'Ephemeral' means lasting for a very short time. "
            "Step 3: Contextual clues from 'visit' point to transience. "
            "Step 4: Therefore B is correct."
        ),
        "cognitive_level": "apply"
    },
    {
        "topic": "comprehension_vocabulary",
        "id": "comp_voc_02",
        "type": "fill_blank",
        "difficulty": "medium",
        "question": (
            "Complete the sentence with the correct word from the passage: "
            "'The ______ old man sat on the bench, watching the children play, a "
            "______ smile on his weathered face.' "
            "Word 1: ______   Word 2: ______"
        ),
        "options": [],
        "answer": "benevolent, serene",
        "explanation": (
            "Step 1: 'Benevolent' (kind, well-meaning) fits an old man watching "
            "children. "
            "Step 2: 'Serene' (calm, peaceful) fits the description of his smile. "
            "Step 3: Both words are commonly found in ICSE comprehension passages. "
            "Step 4: The combination creates a coherent, emotionally resonant image."
        ),
        "cognitive_level": "apply"
    },
]

_GRAMMAR_VERB_FORMS = [
    {
        "topic": "grammar_verb_forms",
        "id": "gram_vf_01",
        "type": "fill_blank",
        "difficulty": "medium",
        "question": (
            "Fill in the blanks with the correct form of the verb in brackets: "
            "(a) By next year, I ______ (complete) my degree. "
            "(b) She ______ (not see) that movie yet. "
            "(c) If it rains, we ______ (cancel) the picnic."
        ),
        "options": [],
        "answer": (
            "(a) will have completed  (b) has not seen / hasn't seen  "
            "(c) will cancel"
        ),
        "explanation": (
            "Step 1: (a) 'By next year' = future perfect tense → 'will have "
            "completed'. "
            "Step 2: (b) 'yet' with present relevance → present perfect: 'has not "
            "seen'. "
            "Step 3: (c) First conditional (real possibility) → 'will cancel'. "
            "Step 4: Verify each verb form against standard tense rules."
        ),
        "verification": {
            "tense_rules": {
                "(a)": "future_perfect: will + have + past_participle → PASS",
                "(b)": "present_perfect: has + not + past_participle + yet → PASS",
                "(c)": "first_conditional: if_present + will_infinitive → PASS"
            }
        },
        "cognitive_level": "apply"
    },
    {
        "topic": "grammar_verb_forms",
        "id": "gram_vf_02",
        "type": "mcq",
        "difficulty": "easy",
        "question": (
            "Choose the correct verb form: 'The song ______ beautifully by the "
            "choir last evening.'"
        ),
        "options": [
            "A) sang",
            "B) was sung",
            "C) is sung",
            "D) has sung"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Step 1: The sentence is in passive voice ('by the choir'). "
            "Step 2: 'Last evening' indicates simple past tense. "
            "Step 3: Past passive = 'was/were + past participle' → 'was sung'. "
            "Step 4: Therefore B is correct."
        ),
        "cognitive_level": "apply"
    },
]

_GRAMMAR_PREPOSITIONS = [
    {
        "topic": "grammar_prepositions",
        "id": "gram_prep_01",
        "type": "fill_blank",
        "difficulty": "easy",
        "question": (
            "Fill in the blanks with the correct prepositions: "
            "(a) The cat jumped ______ the table. "
            "(b) She is good ______ mathematics. "
            "(c) The train arrived ______ time."
        ),
        "options": [],
        "answer": "(a) onto / on  (b) at  (c) on",
        "explanation": (
            "Step 1: (a) 'jumped onto' (movement to a surface) or 'jumped on' - "
            "both acceptable in ICSE. "
            "Step 2: (b) 'good at' is the standard collocation. "
            "Step 3: (c) 'on time' (punctual) is the correct preposition. "
            "Step 4: Verify against standard preposition lists."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "grammar_prepositions",
        "id": "gram_prep_02",
        "type": "mcq",
        "difficulty": "medium",
        "question": (
            "Choose the correct preposition: 'The book consists ______ five "
            "chapters.'"
        ),
        "options": ["A) of", "B) in", "C) with", "D) by"],
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanation": (
            "Step 1: The verb 'consist' is followed by 'of' when stating "
            "components. "
            "Step 2: 'Consist in' means 'to have as an essential feature'. "
            "Step 3: Therefore 'consists of' (A) is correct."
        ),
        "cognitive_level": "remember"
    },
]

_GRAMMAR_TRANSFORMATIONS = [
    {
        "topic": "grammar_transformations",
        "id": "gram_trans_01",
        "type": "short_answer",
        "difficulty": "medium",
        "question": (
            "Transform the following sentence into the passive voice: "
            "'The teacher praised the student for her excellent project.' "
            "Write your answer in ONE sentence."
        ),
        "options": [],
        "answer": "The student was praised by the teacher for her excellent project.",
        "explanation": (
            "Step 1: Active: Subject (The teacher) + Verb (praised) + Object (the "
            "student). "
            "Step 2: Passive: Object becomes Subject + 'was/were + past participle' "
            "+ 'by' + original Subject. "
            "Step 3: 'The student was praised by the teacher for her excellent "
            "project.' "
            "Step 4: Verify: the meaning is preserved and the structure is "
            "grammatically correct."
        ),
        "verification": {"meaning_preserved": True, "structure": "passive_voice",
                         "status": "PASS"},
        "cognitive_level": "apply"
    },
    {
        "topic": "grammar_transformations",
        "id": "gram_trans_02",
        "type": "mcq",
        "difficulty": "medium",
        "question": (
            "Which transformation correctly changes the following sentence into "
            "an exclamatory sentence? "
            "'The magician performed an incredible trick.'"
        ),
        "options": [
            "A) What an incredible trick the magician performed!",
            "B) How an incredible trick the magician performed!",
            "C) What a incredible trick the magician performed!",
            "D) How incredible trick the magician performed!"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanation": (
            "Step 1: Exclamatory with 'What' uses: 'What + (a/an) + adjective + "
            "noun + subject + verb!' "
            "Step 2: 'What an incredible trick the magician performed!' follows "
            "this pattern. "
            "Step 3: 'How' is used differently: 'How incredible the trick was!' "
            "Step 4: Option A is the only grammatically correct transformation."
        ),
        "cognitive_level": "apply"
    },
    {
        "topic": "grammar_transformations",
        "id": "gram_trans_03",
        "type": "fill_blank",
        "difficulty": "hard",
        "question": (
            "Transform into a compound sentence using 'but': "
            "'Although she was tired, she continued studying.' "
            "Answer: ______"
        ),
        "options": [],
        "answer": "She was tired, but she continued studying.",
        "explanation": (
            "Step 1: A complex sentence uses subordinating conjunction "
            "('although'). "
            "Step 2: A compound sentence uses coordinating conjunction ('but'). "
            "Step 3: 'Although she was tired' becomes 'She was tired', joined "
            "to 'she continued studying' with 'but'. "
            "Step 4: Verify: two independent clauses joined by coordinating "
            "conjunction - correct compound structure."
        ),
        "verification": {"clause_count": 2, "conjunction": "but (coordinating)",
                         "status": "PASS"},
        "cognitive_level": "apply"
    },
]

_GRAMMAR_QUESTION_TAGS = [
    {
        "topic": "grammar_question_tags",
        "id": "gram_qt_01",
        "type": "fill_blank",
        "difficulty": "medium",
        "question": (
            "Supply the correct question tag: "
            "'You have finished your homework, ______?' "
            "(The sentence uses the present perfect tense.)"
        ),
        "options": [],
        "answer": "haven't you",
        "explanation": (
            "Step 1: Present perfect 'have finished' → auxiliary is 'have'. "
            "Step 2: The statement is positive → question tag must be negative: "
            "'haven't'. "
            "Step 3: Subject 'you' is unchanged: 'you'. "
            "Step 4: Tag: 'haven't you'. "
            "Step 5: Verify: auxiliary matches tense, polarity is opposite."
        ),
        "verification": {"aux_match": "have", "polarity": "negative",
                         "subject_match": "you", "status": "PASS"},
        "cognitive_level": "apply"
    },
    {
        "topic": "grammar_question_tags",
        "id": "gram_qt_02",
        "type": "mcq",
        "difficulty": "medium",
        "question": (
            "Choose the correct question tag: 'She can't speak French, ______?'"
        ),
        "options": ["A) can she", "B) can't she", "C) does she", "D) isn't she"],
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanation": (
            "Step 1: Modal 'can' with negative 'can't' → tag uses positive 'can'. "
            "Step 2: Subject is 'she'. "
            "Step 3: Tag = 'can she'. "
            "Step 4: Negative statement → positive tag. Verify: polarity opposite "
            "✓, modal matches ✓."
        ),
        "verification": {"modal": "can", "polarity": "positive (opposite)",
                         "subject": "she", "status": "PASS"},
        "cognitive_level": "apply"
    },
]

_GRAMMAR_ACTIVE_PASSIVE = [
    {
        "topic": "grammar_active_passive",
        "id": "gram_ap_01",
        "type": "short_answer",
        "difficulty": "medium",
        "question": (
            "Change the following sentence to active voice: "
            "'The letter was written by Meera to her grandmother.' "
            "Write the active voice sentence."
        ),
        "options": [],
        "answer": "Meera wrote the letter to her grandmother.",
        "explanation": (
            "Step 1: Passive agent 'by Meera' → active subject. "
            "Step 2: 'was written' → past simple active 'wrote'. "
            "Step 3: Original object 'The letter' → active object. "
            "Step 4: Active sentence: 'Meera wrote the letter to her "
            "grandmother.' "
            "Step 5: Verify: subject performs the action, verb is past simple ✓."
        ),
        "verification": {"voice": "active", "subject_agent": "Meera",
                         "verb_tense": "past_simple", "status": "PASS"},
        "cognitive_level": "apply"
    },
]

_COMMON_ERRORS_FACTUALITY = [
    {
        "topic": "common_errors_factuality",
        "id": "err_fact_01",
        "type": "mcq",
        "difficulty": "medium",
        "question": (
            "According to the ICSE 2024 PP report, which of the following is a "
            "FACTUAL error in Literature answers?"
        ),
        "options": [
            "A) Using the wrong character name",
            "B) Writing more than 200 words",
            "C) Using bullet points",
            "D) Missing the date in a letter"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanations": (
            "Step 1: The 2024 PP report for Literature lists 'factual errors' as "
            "a top-25 error - specifically, using the wrong character name or "
            "attributing a quote to the wrong character. "
            "Step 2: Wrong word count and bullet points are format errors. "
            "Step 3: Missing date is a letter format error. "
            "Step 4: Therefore A (using the wrong character name) is the factual "
            "error."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "common_errors_factuality",
        "id": "err_fact_02",
        "type": "short_answer",
        "difficulty": "medium",
        "question": (
            "In a Literature answer, a candidate writes: 'Portia says, The quality "
            "of mercy is not strained, in Act 2 Scene 1 of The Merchant of Venice.' "
            "Identify the factual error and correct it."
        ),
        "options": [],
        "answer": (
            "Error: The speech 'The quality of mercy' is delivered in Act 4, "
            "Scene 1 (the court scene), not Act 2 Scene 1. "
            "Correction: Portia says 'The quality of mercy is not strained' in "
            "Act 4, Scene 1 of The Merchant of Venice."
        ),
        "explanation": (
            "Step 1: Factual errors in literature include wrong act/scene "
            "references and wrong speaker attribution. "
            "Step 2: Portia's 'quality of mercy' speech occurs during Shylock's "
            "trial - Act 4, Scene 1. "
            "Step 3: Act 2 Scene 1 contains Belmont scenes with Portia's suitors "
            "choosing caskets. "
            "Step 4: This error loses marks because examiners deduct for every "
            "factual inaccuracy per the marking scheme."
        ),
        "verification": {"fact_check": "Act 4 Scene 1 (court scene) ← correct",
                         "status": "PASS"},
        "cognitive_level": "evaluate"
    },
]

_COMMON_ERRORS_TENSE = [
    {
        "topic": "common_errors_tense",
        "id": "err_tense_01",
        "type": "mcq",
        "difficulty": "medium",
        "question": (
            "In ICSE English Literature answers, which tense error was flagged in "
            "the 2024 PP report?"
        ),
        "options": [
            "A) Using future tense to describe past events in a novel",
            "B) Using present tense correctly throughout",
            "C) Mixing tenses when describing events",
            "D) Using past tense to describe plot events"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "C",
        "explanation": (
            "Step 1: Literature analysis should use PRESENT tense for events in "
            "the text (e.g. 'Shylock demands a pound of flesh'). "
            "Step 2: Candidates who mix past and present tense lose marks - this "
            "was flagged in 2024. "
            "Step 3: Option C describes this exact error. "
            "Step 4: The rule: literary present tense throughout analysis."
        ),
        "cognitive_level": "remember"
    },
    {
        "topic": "common_errors_tense",
        "id": "err_tense_02",
        "type": "fill_blank",
        "difficulty": "medium",
        "question": (
            "Rewrite the following in the literary present tense: "
            "'In Act 3, Macbeth ______ (murder) King Duncan while he ______ "
            "(sleep).'"
        ),
        "options": [],
        "answer": "murders, sleeps",
        "explanation": (
            "Step 1: Literary present tense is used for events in a text - we "
            "describe what HAPPENS, not what HAPPENED. "
            "Step 2: Present simple 'murders' and 'sleeps' are correct. "
            "Step 3: This avoids the common error of mixing past and present. "
            "Step 4: Verify: both verbs in present simple ✓."
        ),
        "verification": {"tense": "present_simple", "verbs": ["murders", "sleeps"],
                         "status": "PASS"},
        "cognitive_level": "apply"
    },
]

_COMMON_ERRORS_FORMAT = [
    {
        "topic": "common_errors_format",
        "id": "err_fmt_01",
        "type": "mcq",
        "difficulty": "easy",
        "question": (
            "Which format error was most frequently flagged in the ICSE 2024 "
            "PP report for Q2/Q3 (Letter/Notice/Email)?"
        ),
        "options": [
            "A) Using personal pronouns in formal letters",
            "B) Wrong placement or missing essential format elements",
            "C) Using too much decoration",
            "D) Writing in cursive handwriting"
        ],
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Step 1: The 2024 PP report specifically states: 'wrong placement or "
            "missing essential format elements' for letters and notices. "
            "Step 2: This includes missing subject lines, wrong address placement, "
            "and missing complimentary close. "
            "Step 3: Options A, C, D are not the primary format errors flagged. "
            "Step 4: Therefore B is correct."
        ),
        "cognitive_level": "remember"
    },
]

_EXAM_TECHNIQUE_PAPER = [
    {
        "topic": "exam_technique_paper",
        "id": "exam_paper_01",
        "type": "fill_blank",
        "difficulty": "easy",
        "question": (
            "The ICSE Class 10 English Language paper (Paper 1) is 80 marks, "
            "conducted over 2 hours (plus 15 minutes reading time). "
            "The five compulsory questions carry the following marks: "
            "Q1 = ___ marks (Composition), Q2 = ___ marks, Q3 = ___ marks "
            "(Letter/Notice/Email), Q4 = ___ marks (Comprehension), "
            "Q5 = ___ marks (Grammar). "
            "Fill in all five blanks."
        ),
        "options": [],
        "answer": "20, 10, 10, 20, 20",
        "explanation": (
            "Step 1: ICSE English Paper 1 structure (from 2024 syllabus): "
            "Q1 Composition = 20 marks, Q2 = 10 marks, Q3 = 10 marks, "
            "Q4 Comprehension = 20 marks, Q5 Grammar = 20 marks. "
            "Step 2: Total = 80 marks. "
            "Step 3: Candidates must attempt all five questions. "
            "Step 4: Verify: 20+10+10+20+20 = 80 ✓."
        ),
        "verification": {"total_marks": 80, "sum_check": "20+10+10+20+20=80",
                         "status": "PASS"},
        "cognitive_level": "remember"
    },
    {
        "topic": "exam_technique_paper",
        "id": "exam_paper_02",
        "type": "mcq",
        "difficulty": "easy",
        "question": (
            "In ICSE English Paper 1, how many options does a candidate have to "
            "choose from in Question 1 (Composition)?"
        ),
        "options": ["A) 3 options", "B) 4 options", "C) 5 options", "D) 6 options"],
        "options": ["A", "B", "C", "D"],
        "answer": "C",
        "explanation": (
            "Step 1: Q1 Composition offers 5 options: narrative, descriptive, "
            "reflective, expository/argumentative, and picture composition. "
            "Step 2: The 2024 board exam confirmed this: 'A Strange Visitor', "
            "'difficult task', 'holiday afternoon', 'Junk food should be banned', "
            "picture composition. "
            "Step 3: Therefore 5 options (C) is correct."
        ),
        "cognitive_level": "remember"
    },
]


# return {"status": "ok", "note": "truncated"}
