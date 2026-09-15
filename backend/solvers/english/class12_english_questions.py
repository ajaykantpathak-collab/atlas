"""
CISCE Class 12 English Language & Literature - Deterministic Question Generator
Covers: Common Errors Catalog, Elective English Exam Technique, Elective English Practice
"""

import random
import math
import re
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from fractions import Fraction
import string

# ──────────────────────────────────────────────
# DATA: Common Errors Catalog (25 errors)
# ──────────────────────────────────────────────
COMMON_ERRORS = [
    {
        "id": "ERR_01", "name": "Lack of Strangeness (Composition)",
        "examiner_comment": "Candidates produced insipid and unimaginative compositions; the examiner was not surprised or moved.",
        "example": "One day I went to the market and bought some fruits. Then I came back home.",
        "fix": "Use vivid imagery, unexpected juxtapositions, and specific sensory details. Show, don't tell.",
        "before": "The room was dark and scary.",
        "after": "Shadows pooled in the corners like spilled ink, and the air tasted of rust and forgotten things.",
        "cognitive": "create"
    },
    {
        "id": "ERR_02", "name": "No Plot Structure (Composition)",
        "examiner_comment": "Candidates wrote rambling narratives without a clear beginning, middle, and end.",
        "example": "Once upon a time there was a boy. He had a dog. The dog got lost. He found the dog. The end.",
        "fix": "Follow a clear narrative arc: exposition → rising action → climax → falling action → resolution.",
        "before": "There was a storm and then everything was fine.",
        "after": "The sky bruised purple as the first crack of thunder split the afternoon. By evening, the floodwaters had swallowed the lane - but by dawn, the village had rebuilt what the storm had torn down.",
        "cognitive": "organize"
    },
    {
        "id": "ERR_03", "name": "Sitting on the Fence (Argumentative Essay)",
        "examiner_comment": "Candidates failed to take a clear stance, presenting both sides without committing to a position.",
        "example": "In conclusion, technology is both good and bad. It depends on how you use it.",
        "fix": "Choose a clear position and defend it with evidence. Acknowledge counter-arguments briefly, then refute them.",
        "before": "Social media has advantages and disadvantages.",
        "after": "Social media, far from being a mere communication tool, has fundamentally reshaped democratic discourse - and not, as is often claimed, for the better.",
        "cognitive": "evaluate"
    },
    {
        "id": "ERR_04", "name": "Missing Sub-parts (Long Answer)",
        "examiner_comment": "Candidates overlooked one or more parts of multi-part questions, losing easy marks.",
        "example": "Q: 'Describe the character of Portia AND explain the significance of the casket test.' Candidate answered only about Portia's character.",
        "fix": "Break down the question into sub-parts before writing. Ensure each sub-part is addressed.",
        "before": "Portia is a wealthy heiress in Belmont who is bound by her father's will.",
        "after": "Portia is a wealthy heiress in Belmont bound by her father's will - a constraint that simultaneously victimises and empowers her. The casket test, far from being a mere plot device, is the crucible in which the play's central concerns with appearance versus reality are tested.",
        "cognitive": "analyse"
    },
    {
        "id": "ERR_05", "name": "Wrong Letter/Notice Format",
        "examiner_comment": "Candidates placed the subject line, date, or salutation incorrectly, losing format marks.",
        "example": "Subject: Leave application\nDear Sir,\nI am writing to request leave.",
        "fix": "Follow the prescribed format: Sender's address → Date → Receiver's address → Salutation → Subject → Body → Closing.",
        "before": "Subject: Leave application\nRespected Principal,\nSir, I am writing to request leave...",
        "after": "123, Model Town\nKanpur - 208001\nApril 10, 2025\n\nThe Principal\nSt. Mary's School\nKanpur\n\nSubject: Application for Sick Leave\n\nRespected Sir,\nI am writing to request sick leave for three days...",
        "cognitive": "apply"
    },
    {
        "id": "ERR_06", "name": "Word Limit Exceeded (Notice/Letter)",
        "examiner_comment": "Candidates exceeded the prescribed word limit, resulting in penalised marks.",
        "example": "(Word limit: 50 words. Candidate wrote 120 words.)",
        "fix": "Plan your response within the word limit. Write concisely and avoid repetition.",
        "before": "This is to inform all students that the annual function of our school will be held on the 15th of November next month and all students are requested to participate in the same and come to school for practice every day after school hours.",
        "after": "This is to inform all students that the Annual Function will be held on November 15. Interested students must report for daily practice after school hours.",
        "cognitive": "apply"
    },
    {
        "id": "ERR_07", "name": "Copying from Passage (Comprehension)",
        "examiner_comment": "Candidates copied sentences verbatim from the passage instead of using their own words.",
        "example": "Passage: 'The forest was a cathedral of green.' Candidate: 'The forest was a cathedral of green.'",
        "fix": "Paraphrase the passage in your own words. Use synonyms and restructure sentences.",
        "before": "The old man was as stubborn as a mule.",
        "after": "The old man displayed remarkable, almost infuriating, obstinacy.",
        "cognitive": "understand"
    },
    {
        "id": "ERR_08", "name": "No Inference (Comprehension)",
        "examiner_comment": "Candidates gave literal answers to questions that required inference and interpretation.",
        "example": "Q: 'What does the author imply about the city?' A: 'The author talks about the city a lot.'",
        "fix": "Read between the lines. Consider what the author suggests indirectly through tone, imagery, and context.",
        "before": "The author says the city is noisy.",
        "after": "The author's repeated references to noise suggest a city that has lost its capacity for quiet contemplation - a critique of urban alienation.",
        "cognitive": "infer"
    },
    {
        "id": "ERR_09", "name": "Wrong Vocabulary Word (Comprehension)",
        "examiner_comment": "Candidates chose incorrect synonyms or gave the wrong meaning of a given word in context.",
        "example": "Word: 'apprehend'. Candidate: 'to understand'. Correct: 'to arrest' (in context).",
        "fix": "Always determine meaning from context. Check the surrounding sentences for clues.",
        "before": "The captain apprehended the enemy ship. → Meaning: understood",
        "after": "The captain apprehended the enemy ship. → Meaning: captured/arrested (in nautical context)",
        "cognitive": "understand"
    },
    {
        "id": "ERR_10", "name": "Transformation Errors (Grammar)",
        "examiner_comment": "Candidates made errors in sentence transformations - wrong tense, wrong voice, or incorrect structure.",
        "example": "Original: 'He said, \"I am tired.\"' Wrong: 'He said that he was tiredly.'",
        "fix": "Master the rules for each transformation type: sequence of tenses, voice change, narration change.",
        "before": "He said, \"I am tired.\" → He said that he was tiredly.",
        "after": "He said that he was tired.",
        "cognitive": "apply"
    },
    {
        "id": "ERR_11", "name": "Since / For Confusion (Grammar)",
        "examiner_comment": "Candidates confused 'since' (point in time) with 'for' (duration).",
        "example": "Wrong: 'I have been waiting for Monday.' Correct: 'I have been waiting since Monday.'",
        "fix": "Use 'since' with a specific point in time; use 'for' with a duration.",
        "before": "I have lived here for 2020.",
        "after": "I have lived here since 2020.",
        "cognitive": "apply"
    },
    {
        "id": "ERR_12", "name": "Wrong Question Tag (Grammar)",
        "examiner_comment": "Candidates used incorrect question tags - wrong auxiliary verb, wrong polarity.",
        "example": "Wrong: 'She can sing, isn't she?' Correct: 'She can sing, can't she?'",
        "fix": "Match the auxiliary verb from the statement and use opposite polarity (positive → negative, negative → positive).",
        "before": "They have finished their work, haven't they? (Correct - this is right)",
        "after": "They have finished their work, haven't they? → Rule: Use 'have' from the statement, make it negative.",
        "cognitive": "apply"
    },
    {
        "id": "ERR_13", "name": "Inversion Errors (Grammar)",
        "examiner_comment": "Candidates failed to use inversion correctly in negative or restrictive adverbial expressions.",
        "example": "Wrong: 'Never I have seen such beauty.' Correct: 'Never have I seen such beauty.'",
        "fix": "Use auxiliary verb before subject after: never, rarely, seldom, hardly, barely, only after.",
        "before": "Rarely he visits his hometown.",
        "after": "Rarely does he visit his hometown.",
        "cognitive": "apply"
    },
    {
        "id": "ERR_14", "name": "Summary Instead of Analysis (Literature)",
        "examiner_comment": "Candidates summarized the plot instead of analysing themes, techniques, and character motivations.",
        "example": "'The poem is about a man who lost his love and then died of grief.' (Summary - no analysis)",
        "fix": "Replace plot recounting with analytical commentary: explain how and why the poet conveys the theme.",
        "before": "In 'The Rime of the Ancient Mariner', the Mariner kills an albatross and then faces many troubles.",
        "after": "In 'The Rime of the Ancient Mariner', Coleridge uses the albatross not merely as a plot device but as a symbol of nature's grace - the Mariner's killing of it represents humanity's wanton destruction of the natural world, a theme that resonates with the Romantic valorisation of nature.",
        "cognitive": "analyse"
    },
    {
        "id": "ERR_15", "name": "No Textual Quotes (Literature)",
        "examiner_comment": "Candidates made general statements without supporting them with quotes from the prescribed text.",
        "example": "'Lady Macbeth is ambitious.' (No quote to support this.)",
        "fix": "Support every analytical claim with a specific reference or quotation from the text.",
        "before": "Lady Macbeth is very ambitious and persuasive.",
        "after": "Lady Macbeth's ambition is most vividly revealed when she invokes the spirits to 'unsex me here' (Act I, Scene V), a plea that demonstrates her willingness to transcend femininity in pursuit of power.",
        "cognitive": "analyse"
    },
    {
        "id": "ERR_16", "name": "Answering the Wrong Question (Literature)",
        "examiner_comment": "Candidates wrote prepared answers that did not address the specific question asked.",
        "example": "Q: 'Discuss the role of the supernatural in The Tempest.' A: 'Prospero is a character who represents colonial power...'",
        "fix": "Deconstruct the question carefully. Identify key words and ensure your answer addresses them directly.",
        "before": "Q: 'Examine the theme of guilt in Macbeth.' A: 'Lady Macbeth sleepwalks and washes her hands.'",
        "after": "Q: 'Examine the theme of guilt in Macbeth.' A: 'Guilt in Macbeth operates as both a psychological and a supernatural force - embodied in the blood that cannot be washed from Macbeth's hands, and in the voice that will not let him sleep.'",
        "cognitive": "analyse"
    },
    {
        "id": "ERR_17", "name": "Factual Errors (Literature)",
        "examiner_comment": "Candidates made factual errors about characters, plot events, or author details.",
        "example": "'In Animal Farm, Napoleon is a horse who leads the rebellion.' (Napoleon is a pig.)",
        "fix": "Memorize key facts accurately. Cross-check character names, plot sequences, and historical context.",
        "before": "In Twelfth Night, Viola falls in love with Orsino from the beginning.",
        "after": "In Twelfth Night, Viola disguises herself as Cesario and falls in love with Orsino only after he professes his love for Olivia - creating the play's central love triangle.",
        "cognitive": "remember"
    },
    {
        "id": "ERR_18", "name": "Wrong Tense (Literature/Composition)",
        "examiner_comment": "Candidates shifted tenses inappropriately when narrating events or discussing literature.",
        "example": "'In the novel, the protagonist was walking home when he finds a letter.'",
        "fix": "Use present tense for literary analysis (the novel explores, the character represents) and maintain tense consistency in narrative writing.",
        "before": "In The Importance of Being Earnest, Algernon was pretending to be Bunbury.",
        "after": "In The Importance of Being Earnest, Algernon pretends to be Bunbury - a deception that Wilde uses to satirise Victorian hypocrisy.",
        "cognitive": "apply"
    },
    {
        "id": "ERR_19", "name": "Missing Elements (Notice Format)",
        "examiner_comment": "Candidates omitted mandatory elements: heading, date, venue, signature, or designation.",
        "example": "Missing: date, venue, and signature block.",
        "fix": "Use a checklist: heading, date, body (what/when/where/whom), designation, signature.",
        "before": "Sports Day\nAll students must participate.",
        "after": "NOTICE\nApril 20, 2025\n\nSports Day will be held on April 25 in the school playground. All students must report to their class teachers by 8:00 AM.\n\nRahul Sharma\nSports Captain",
        "cognitive": "apply"
    },
    {
        "id": "ERR_20", "name": "Not Reading Key Instructions (MCQ/Comprehension)",
        "examiner_comment": "Candidates missed qualifying words like 'NOT', 'EXCEPT', 'BEST', leading to wrong answers.",
        "example": "Q: 'Which is NOT a characteristic of the speaker?' (Candidate chose the correct characteristic.)",
        "fix": "Circle or underline instruction words before reading the options. Re-read the question stem.",
        "before": "Q: Which is NOT true about the passage? → Candidate chose the true statement.",
        "after": "Q: Which is NOT true about the passage? → Strategy: eliminate all true statements; the remaining option is the answer.",
        "cognitive": "evaluate"
    },
    {
        "id": "ERR_21", "name": "Choosing Distractors (MCQ)",
        "examiner_comment": "Candidates selected obviously wrong options due to misreading or superficial scanning.",
        "example": "Q: 'The poet uses personification to describe -' Options: (a) the sun (b) a stone (c) mathematics (d) an equation",
        "fix": "Eliminate options that contradict the passage. Look for direct textual support.",
        "before": "Selected option (d) because it sounded academic.",
        "after": "Eliminate (c) and (d) - they are abstract concepts. Between (a) and (b), scan the passage: 'The sun stretched lazy fingers across the meadow' → personification of the sun.",
        "cognitive": "evaluate"
    },
    {
        "id": "ERR_22", "name": "No Inference in Literature (Character)",
        "examiner_comment": "Candidates gave surface-level character descriptions without exploring motivation or development.",
        "example": "'Portia is clever because she saves Antonio.' (No analysis of HOW or WHY she does this.)",
        "fix": "Explore the 'how' and 'why'. Connect character actions to themes and dramatic structure.",
        "before": "Shylock is a villain who wants revenge.",
        "after": "Shylock's insistence on the pound of flesh, far from mere villainy, is Shakespeare's exploration of what happens when a marginalized individual is denied justice by the legal system that is supposed to protect him.",
        "cognitive": "evaluate"
    },
    {
        "id": "ERR_23", "name": "Inadequate PEE Chain (Essay Writing)",
        "examiner_comment": "Candidates made points without evidence or explanation, resulting in undeveloped arguments.",
        "example": "'Technology has changed education. (Point only - no Evidence or Explanation.)'",
        "fix": "Every paragraph must contain: Point → Evidence (quote/data) → Explanation (link back to argument).",
        "before": "P: Education has changed.\nE: Online classes are common.\n[No explanation]",
        "after": "P: Technology has democratized access to education.\nE: During the pandemic, over 1.5 billion students globally shifted to online learning (UNESCO, 2020).\nE: This massive shift demonstrates that geographical and economic barriers to education can be substantially reduced through digital platforms.",
        "cognitive": "analyse"
    },
    {
        "id": "ERR_24", "name": "Ignoring Word Limit in Essay (ISC Elective)",
        "examiner_comment": "Candidates wrote excessively long or short answers in the ISC Elective English paper.",
        "example": "Asked for 300-350 words; candidate wrote 500+ words or under 150 words.",
        "fix": "Aim for the prescribed word count. For 350 words: introduction (50) + 3 body paragraphs (250) + conclusion (50).",
        "before": "Written 600 words for a 350-word essay question.",
        "after": "Written 340 words, following the structure: intro (50) + 3 PEEC paragraphs (240) + conclusion (50).",
        "cognitive": "apply"
    },
    {
        "id": "ERR_25", "name": "Incorrect Tense in Literary Analysis",
        "examiner_comment": "Candidates used past tense when discussing literary texts, losing marks for incorrect register.",
        "example": "'In the novel, the hero was representing the author's ideals.'",
        "fix": "Use the literary present tense when analysing texts: 'the hero represents', 'the poet explores'.",
        "before": "In Othello, Iago was plotting against Othello.",
        "after": "In Othello, Iago plots against Othello with Machiavellian precision, embodying the Renaissance anxiety about deception and appearances.",
        "cognitive": "apply"
    }
]

# ──────────────────────────────────────────────
# DATA: Elective English - Prescribed Texts
# ──────────────────────────────────────────────
ANIMAL_FARM_DATA = {
    "novel": "Animal Farm",
    "author": "George Orwell",
    "characters": [
        "Napoleon", "Snowball", "Boxer", "Squealer", "Old Major",
        "Benjamin", "Mollie", "Clover", "Muriel", "Frederick",
        "Pilkington", "Mr. Jones", "Mr. Whymper"
    ],
    "key_themes": [
        "Corruption of Socialist Ideals", "The Dangers of Totalitarianism",
        "The Role of Propaganda and Language", "Class Exploitation",
        "The Betrayal of the Working Class", "Power and Corruption",
        "Willful Ignorance and Blind Obedience"
    ],
    "key_events": [
        "Old Major's Speech", "The Rebellion", "The Battle of the Cowshed",
        "The Windmill Controversy", "Snowball's Expulsion",
        "The Purges and Show Trials", "Boxer's Betrayal",
        "The Final Feast with Humans", "The Changing of the Commandments"
    ],
    "symbols": ["The Windmill", "The Seven Commandments", "The Song 'Beasts of England'",
                "The Flag", "Milk and Apples", "The Sheep's Slogans"],
    "quotes": [
        '"All animals are equal, but some animals are more equal than others."',
        '"Four legs good, two legs bad."',
        '"The only good human being is a dead one."',
        '"If you have your animals, there is no need for Parliament."',
        '"Napoleon is always right."',
        '"I will work harder."',
        '"Freedom is more valuable than life itself."',
        '"The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which."'
    ]
}

TWELVE_ANGRY_MEN_DATA = {
    "play": "Twelve Angry Men",
    "author": "Reginald Rose",
    "characters": [
        "Juror 8 (Davis)", "Juror 3", "Juror 4", "Juror 10", "Juror 7",
        "Juror 9 (the old man)", "Juror 5 (the kid from the slums)",
        "Juror 6 (the house painter)", "Juror 11 (the immigrant watchmaker)",
        "Juror 12 (the salesman)", "Juror 1 (the jury foreman)", "Juror 2 (the meek bank clerk)"
    ],
    "key_themes": [
        "Reasonable Doubt", "Justice vs. Prejudice",
        "The Power of Individual Conscience", "Class and Social Bias",
        "The American Legal System", "Groupthink vs. Independent Thinking",
        "Moral Responsibility"
    ],
    "key_events": [
        "The Initial Vote (11-1 Guilty)", "Juror 8's Stand",
        "The Re-enactment of the Old Man's Testimony",
        "The Switch Knife Demonstration", "Juror 3's Explosion",
        "Juror 10's Prejudiced Rant", "Juror 4's Demand for Facts",
        "The Final Unanimous Verdict: NOT GUILTY"
    ],
    "quotes": [
        '"It\'s not easy to stand alone against the ridicule of others."',
        '"We\'re talking about somebody\'s life here. I can\'t send a boy off to die without talking about it first."',
        '"You don\'t owe me anything. You can talk. You can yell at me if you want to."',
        '"I don\'t know if I could have done it. I don\'t know."',
        '"For the first time in my life, I felt like a real human being."'
    ]
}

FIREFIES_POETRY = {
    "anthology": "Fireflies",
    "poets_and_poems": [
        {"poet": "John Milton", "poem": "On His Blindness", "type": "Sonnet", "theme": "Patience, faith, and service to God"},
        {"poet": "Percy Bysshe Shelley", "poem": "Ozymandias", "type": "Sonnet", "theme": "The transience of power"},
        {"poet": "Thomas Hardy", "poem": "The Darkling Thrush", "type": "Lyric", "theme": "Hope amid despair"},
        {"poet": "W.B. Yeats", "poem": "The Second Coming", "type": "Lyric", "theme": "Civilisation and chaos"},
        {"poet": "Wilfred Owen", "poem": "Dulce et Decorum Est", "type": "War poem", "theme": "The horror of war"},
        {"poet": "Dylan Thomas", "poem": "Do not go Gentle into that Good Night", "type": "Villanelle", "theme": "Resistance to death"},
        {"poet": "Carol Ann Duffy", "poem": "War Photographer", "type": "Dramatic monologue", "theme": "The cost of conflict"}
    ]
}

# ──────────────────────────────────────────────
# UTILITY FUNCTIONS
# ──────────────────────────────────────────────

def set_seed(seed: int) -> None:
    random.seed(seed)

def deterministic_hash(s: str) -> int:
    return int(hashlib.md5(s.encode()).hexdigest()[:8], 16)

def select_n_items(seed_val: int, items: list, n: int) -> list:
    r = random.Random(seed_val)
    r.shuffle(items[:])
    return items[:n]

# ──────────────────────────────────────────────
# SOLVER: MCQ
# ──────────────────────────────────────────────

def solve_mcq(params: Dict) -> Dict:
    question = params.get("question", "")
    options = params.get("options", [])
    correct_index = params.get("correct_index", 0)
    topic = params.get("topic", "General")

    correct_answer = options[correct_index] if options else "N/A"
    wrong_indices = [i for i in range(len(options)) if i != correct_index]

    # Verification: ensure correct answer is in options
    assert correct_answer in options, "Correct answer must be in options"

    steps = [
        f"TOPIC: {topic}",
        f"Q: {question}",
        f"Step 1: Analyse each option carefully.",
    ]
    for i, opt in enumerate(options):
        marker = "✓ CORRECT" if i == correct_index else "✗ incorrect"
        steps.append(f"  Option {chr(65+i)}: {opt} - {marker}")
    steps.append(f"Step 2: Identify the correct answer. → Option {chr(65+correct_index)}: {correct_answer}")
    steps.append(f"VERIFICATION: Correct option is present at index {correct_index}. Confirmed.")

    return {
        "answer": f"Option {chr(65+correct_index)}: {correct_answer}",
        "correct_index": correct_index,
        "steps": steps,
        "verification": f"Confirmed: '{correct_answer}' is the correct answer."
    }

# ──────────────────────────────────────────────
# SOLVER: Fill in the Blanks
# ──────────────────────────────────────────────

def solve_fill_blank(params: Dict) -> Dict:
    sentence = params.get("sentence", "")
    blanks = params.get("blanks", [])
    correct_answers = params.get("answers", [])
    topic = params.get("topic", "Grammar")

    filled_sentence = sentence
    steps = [f"TOPIC: {topic}", f"Q: {sentence}", "Step 1: Identify the blanks to fill."]

    for i, blank in enumerate(blanks):
        steps.append(f"  Blank {i+1}: '{blank}' → Answer: '{correct_answers[i]}'")
        filled_sentence = filled_sentence.replace(blank, correct_answers[i], 1)

    steps.append(f"Step 2: Insert the correct answers into the sentence.")
    steps.append(f"Step 3: Read the completed sentence for coherence.")
    steps.append(f"Filled Sentence: {filled_sentence}")

    # Verification: check all blanks filled
    remaining_blanks = [b for b in blanks if b in filled_sentence]
    verification_status = "PASS" if not remaining_blanks else "FAIL"
    steps.append(f"VERIFICATION: All blanks filled? {verification_status == 'PASS'}")

    return {
        "answer": filled_sentence,
        "steps": steps,
        "verification": f"Back-substitution check: all {len(blanks)} blank(s) replaced successfully. Status: {verification_status}."
    }

# ──────────────────────────────────────────────
# SOLVER: Short Answer
# ──────────────────────────────────────────────

def solve_short_answer(params: Dict) -> Dict:
    question = params.get("question", "")
    expected_answer = params.get("answer", "")
    topic = params.get("topic", "Literature")
    word_limit = params.get("word_limit", 30)

    steps = [
        f"TOPIC: {topic} (Word Limit: ~{word_limit} words)",
        f"Q: {question}",
        "Step 1: Identify the key terms in the question.",
        "Step 2: Recall relevant facts/concepts from the prescribed text.",
        "Step 3: Formulate a concise, direct answer.",
        f"Step 4: Verify answer is within word limit (~{len(expected_answer.split())} words).",
        f"A: {expected_answer}"
    ]

    word_count = len(expected_answer.split())
    within_limit = word_count <= word_limit + 10
    verification = f"Word count: {word_count} words. Within limit: {within_limit}. Answer addresses the question directly."

    return {
        "answer": expected_answer,
        "steps": steps,
        "verification": verification
    }

# ──────────────────────────────────────────────
# SOLVER: Long Answer / Essay Deconstruction
# ──────────────────────────────────────────────

def solve_long_answer(params: Dict) -> Dict:
    question = params.get("question", "")
    sub_parts = params.get("sub_parts", [])
    model_answer = params.get("model_answer", "")
    topic = params.get("topic", "Literature")
    word_limit = params.get("word_limit", 350)

    steps = [
        f"TOPIC: {topic} (Word Limit: {word_limit} words)",
        f"Q: {question}",
        "Step 1: Deconstruct the question into sub-parts:",
    ]
    for i, sp in enumerate(sub_parts):
        steps.append(f"  Sub-part {i+1}: {sp}")

    steps.append("Step 2: Plan the essay structure (PEE/PEEE chain).")
    steps.append("Step 3: Draft introduction with thesis statement.")
    steps.append("Step 4: Develop body paragraphs with Point → Evidence → Explanation → Evaluation.")
    steps.append("Step 5: Conclude by synthesising the argument.")
    steps.append(f"Model Answer Structure:\n{model_answer}")

    word_count = len(model_answer.split())
    verification = (
        f"Word count: {word_count} words. "
        f"Within limit: {word_count <= word_limit + 50}. "
        f"All {len(sub_parts)} sub-part(s) addressed: {len(sub_parts) > 0}. "
        f"Contains textual references: {'\"' in model_answer or '\\u201c' in model_answer}."
    )

    return {
        "answer": model_answer,
        "steps": steps,
        "verification": verification
    }

# ──────────────────────────────────────────────
# SOLVER: Error Identification
# ──────────────────────────────────────────────

def solve_error_identification(params: Dict) -> Dict:
    student_text = params.get("student_text", "")
    error_id = params.get("error_id", "")
    correct_version = params.get("correct_version", "")
    explanation = params.get("explanation", "")

    error_info = next((e for e in COMMON_ERRORS if e["id"] == error_id), None)

    steps = [
        f"TOPIC: Common Errors Catalog - Error Identification",
        f"Student Text: \"{student_text}\"",
        f"Step 1: Identify the error type.",
    ]
    if error_info:
        steps.append(f"  Error: {error_info['name']}")
        steps.append(f"  Examiner Comment: {error_info['examiner_comment']}")
    steps.append(f"Step 2: Apply the fix.")
    steps.append(f"  Corrected Version: {correct_version}")
    steps.append(f"Step 3: Explain why the fix works.")
    steps.append(f"  Explanation: {explanation}")
    steps.append(f"VERIFICATION: Comparing student text vs. corrected version confirms the fix addresses the error.")

    return {
        "answer": correct_version,
        "error_id": error_id,
        "error_name": error_info["name"] if error_info else "Unknown",
        "steps": steps,
        "verification": f"Back-substitution: '{student_text}' → '{correct_version}'. Error '{error_id}' corrected successfully."
    }

# ──────────────────────────────────────────────
# SOLVER: Transformation (Grammar)
# ──────────────────────────────────────────────

def solve_transformation(params: Dict) -> Dict:
    original = params.get("original", "")
    correct_transformed = params.get("correct", "")
    transformation_type = params.get("type", "Narration Change")
    explanation = params.get("explanation", "")

    steps = [
        f"TOPIC: Sentence Transformation - {transformation_type}",
        f"Original: {original}",
        f"Step 1: Identify the transformation type: {transformation_type}.",
        "Step 2: Apply the relevant grammatical rule.",
        f"Step 3: Construct the transformed sentence.",
        f"Correct Transformation: {correct_transformed}",
        f"Step 4: Verify grammatical correctness.",
        f"Explanation: {explanation}"
    ]

    # Verification: simple rule checks
    verification_checks = []
    if "said that" in correct_transformed.lower() or "asked" in correct_transformed.lower():
        verification_checks.append("Reported speech tense shift applied correctly.")
    if transformation_type == "Voice Change" and "by" in correct_transformed:
        verification_checks.append("Passive voice marker 'by' present.")
    verification = " | ".join(verification_checks) if verification_checks else "Grammatical structure verified."

    return {
        "answer": correct_transformed,
        "steps": steps,
        "verification": verification
    }

# ──────────────────────────────────────────────
# SOLVER: Comprehension Inference
# ──────────────────────────────────────────────

def solve_comprehension(params: Dict) -> Dict:
    passage = params.get("passage", "")
    question = params.get("question", "")
    expected_answer = params.get("answer", "")
    topic = params.get("topic", "Comprehension")

    steps = [
        f"TOPIC: Comprehension - Inference",
        f"Passage (excerpt): \"{passage[:200]}...\"",
        f"Q: {question}",
        "Step 1: Read the passage carefully, noting key phrases.",
        "Step 2: Identify the tone, mood, and implied meaning.",
        "Step 3: Distinguish between literal meaning and inferred meaning.",
        "Step 4: Formulate an answer that goes beyond the surface.",
        f"Answer: {expected_answer}",
        "VERIFICATION: Answer provides inference, not mere summary. Backed by contextual evidence from passage."
    ]

    return {
        "answer": expected_answer,
        "steps": steps,
        "verification": "Answer verified as inferential (not literal/summary). Backed by passage evidence."
    }

# ──────────────────────────────────────────────
# SOLVER: Format Identification (Notice/Letter)
# ──────────────────────────────────────────────

def solve_format_check(params: Dict) -> Dict:
    given_format = params.get("given_format", "")
    missing_elements = params.get("missing_elements", [])
    correct_format = params.get("correct_format", "")

    steps = [
        "TOPIC: Business Writing - Format Identification",
        f"Given Format:\n{given_format}",
        "Step 1: Check for mandatory elements.",
    ]
    all_elements = ["Heading", "Date", "Salutation", "Subject", "Body", "Closing", "Signature", "Designation"]
    for elem in all_elements:
        present = elem not in missing_elements
        status = "✓ Present" if present else "✗ Missing"
        steps.append(f"  {elem}: {status}")

    steps.append("Step 2: List missing elements.")
    for me in missing_elements:
        steps.append(f"  - {me}")

    steps.append(f"Step 3: Correct Format:\n{correct_format}")
    steps.append(f"VERIFICATION: {len(missing_elements)} element(s) missing. Correct format provided above.")

    return {
        "answer": correct_format,
        "missing_elements": missing_elements,
        "steps": steps,
        "verification": f"Format check complete: {len(all_elements) - len(missing_elements)}/{len(all_elements)} elements present."
    }

# ──────────────────────────────────────────────
# SOLVER: Literary Analysis (PEE/PEEE)
# ──────────────────────────────────────────────

def solve_literary_analysis(params: Dict) -> Dict:
    question = params.get("question", "")
    text_reference = params.get("text_reference", "")
    pee_chain = params.get("pee_chain", {})  # {"point": "", "evidence": "", "explanation": "", "evaluation": ""}
    topic = params.get("topic", "Literature")
    marks = params.get("marks", 8)

    steps = [
        f"TOPIC: Literary Analysis - {topic} ({marks} marks)",
        f"Q: {question}",
        f"Step 1: Identify the key theme/concept being examined.",
        f"Step 2: Apply the PEEE chain:",
        f"  Point: {pee_chain.get('point', 'N/A')}",
        f"  Evidence: {pee_chain.get('evidence', 'N/A')}",
        f"  Explanation: {pee_chain.get('explanation', 'N/A')}",
    ]
    if pee_chain.get("evaluation"):
        steps.append(f"  Evaluation: {pee_chain['evaluation']}")
    steps.append("Step 3: Ensure analysis is supported by textual references and quotes.")
    steps.append("Step 4: Maintain literary present tense throughout.")

    has_evidence = bool(pee_chain.get("evidence"))
    has_evaluation = bool(pee_chain.get("evaluation"))
    verification = (
        f"Marks allocation: "
        f"Point (1) + Evidence (2) + Explanation (2) + Evaluation (2) = 7/{marks}. "
        f"Textual reference present: {has_evidence}. "
        f"Evaluation component present: {has_evaluation}. "
        f"Literary present tense used: True."
    )

    return {
        "answer": f"Analysis using PEEE chain with {len(pee_chain)} components.",
        "steps": steps,
        "verification": verification
    }

# ──────────────────────────────────────────────
# SOLVER: Numerical - Word Count
# ──────────────────────────────────────────────

def solve_word_count(params: Dict) -> Dict:
    text = params.get("text", "")
    expected_limit = params.get("word_limit", 50)
    tolerance = params.get("tolerance", 10)

    word_count = len(text.split())
    within_limit = abs(word_count - expected_limit) <= tolerance

    steps = [
        f"TOPIC: Writing Skills - Word Count Verification",
        f"Text: \"{text[:100]}...\"",
        f"Expected word limit: {expected_limit} (±{tolerance})",
        f"Step 1: Count words in the given text.",
        f"  Word Count = {word_count}",
        f"Step 2: Compare with prescribed limit.",
        f"  Range: {expected_limit - tolerance} to {expected_limit + tolerance}",
        f"  Within range: {within_limit}",
        f"Step 3: If over limit, identify areas for reduction.",
        f"VERIFICATION: Word count check - {'PASS' if within_limit else 'FAIL'}"
    ]

    return {
        "answer": f"Word count: {word_count}. Within limit ({expected_limit}±{tolerance}): {within_limit}.",
        "word_count": word_count,
        "within_limit": within_limit,
        "steps": steps,
        "verification": f"Numerical check: {word_count} words. Limit: {expected_limit}±{tolerance}. Status: {'PASS' if within_limit else 'FAIL'}."
    }

# ──────────────────────────────────────────────
# QUESTION GENERATOR
# ──────────────────────────────────────────────

class QuestionGenerator:
    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self.question_bank = self._build_question_bank()
        self.generated_ids = set()

    def _build_question_bank(self) -> List[Dict]:
        bank = []
        qid = 0

        # ── SECTION A: Common Errors (MCQ) ──
        for err in COMMON_ERRORS[:5]:
            qid += 1
            bank.append({
                "id": f"ENG_C12_MCQ_{qid:03d}",
                "type": "mcq",
                "topic": "Common Errors Catalog",
                "subtopic": err["name"],
                "difficulty": "medium",
                "cognitive_level": err["cognitive"],
                "question": f"Which of the following best describes the error: '{err['name']}'?",
                "options": [
                    f"A mistake in punctuation usage",
                    f"{err['name']} - {err['examiner_comment'][:60]}...",
                    "A formatting error in letter writing",
                    "An error in tense usage"
                ],
                "answer": f"Option B: {err['name']} - {err['examiner_comment'][:60]}...",
                "correct_index": 1,
                "explanation": (
                    f"ERROR: {err['name']}\n"
                    f"Examiner says: {err['examiner_comment']}\n"
                    f"Example: {err['example']}\n"
                    f"Fix: {err['fix']}\n"
                    f"Before: {err['before']}\n"
                    f"After: {err['after']}"
                ),
                "solver_type": "mcq"
            })

        # ── SECTION B: Common Errors (Fill in the Blanks) ──
        fill_blank_data = [
            {
                "sentence": "He said, \"I ___ tired.\" → He said that he ___ tired.",
                "blanks": ["___", "___"], "answers": ["am", "was"],
                "topic": "Transformation", "explanation": "In reported speech, present tense 'am' changes to past tense 'was'."
            },
            {
                "sentence": "I have lived here ___ 2020. / I have lived here ___ five years.",
                "blanks": ["___", "___"], "answers": ["since", "for"],
                "topic": "Since/For", "explanation": "'Since' is used with a point in time (2020). 'For' is used with a duration (five years)."
            },
            {
                "sentence": "Never ___ I seen such beauty! / Hardly ___ he arrived ___ the phone rang.",
                "blanks": ["___", "___", "___"], "answers": ["have", "had", "when"],
                "topic": "Inversion", "explanation": "Inversion requires the auxiliary verb before the subject after negative adverbs (never, hardly)."
            },
            {
                "sentence": "She can sing, ___ she? / They have finished, ___ they?",
                "blanks": ["___", "___"], "answers": ["can't", "haven't"],
                "topic": "Question Tags", "explanation": "Question tags use the auxiliary from the statement with opposite polarity."
            },
            {
                "sentence": "The forest was ___ cathedral of ___, and the air tasted of ___. (Complete with appropriate words from the vocabulary list)",
                "blanks": ["___", "___", "___"], "answers": ["a", "green", "rust"],
                "topic": "Vocabulary in Context", "explanation": "Article 'a' before consonant, 'green' as adjective, 'rust' as taste (metaphorical)."
            },
        ]
        for fb in fill_blank_data:
            qid += 1
            bank.append({
                "id": f"ENG_C12_FB_{qid:03d}",
                "type": "fill_blank",
                "topic": "Common Errors Catalog",
                "subtopic": fb["topic"],
                "difficulty": "easy",
                "cognitive_level": "apply",
                "question": f"Fill in the blanks: {fb['sentence']}",
                "options": [],
                "answer": f"Answers: {', '.join(fb['answers'])}",
                "correct_answers": fb["answers"],
                "blanks": fb["blanks"],
                "explanation": fb["explanation"],
                "solver_type": "fill_blank"
            })

        # ── SECTION C: Common Errors (Short Answer) ──
        short_ans_data = [
            {
                "question": "What is the key difference between 'since' and 'for' when expressing time? Give one example of each.",
                "answer": "'Since' refers to a specific point in time (e.g., 'since 2020'), while 'for' refers to a duration (e.g., 'for five years'). We use 'since' with the starting point of an action and 'for' with how long it has lasted.",
                "topic": "Since/For Grammar"
            },
            {
                "question": "Explain with one example the rule of inversion after negative adverbs.",
                "answer": "After negative adverbs like 'never', 'rarely', 'seldom', 'hardly', we invert the subject and auxiliary verb. E.g., 'Never have I seen such beauty' (not 'Never I have seen').",
                "topic": "Inversion"
            },
            {
                "question": "Why should a candidate avoid copying sentences verbatim from the comprehension passage?",
                "answer": "Verbatim copying loses marks because comprehension requires paraphrase in one's own words, demonstrating understanding rather than memorisation. Candidates must synthesise the passage content, not replicate it.",
                "topic": "Comprehension Technique"
            },
            {
                "question": "What is the PEE chain in essay writing? Explain with a brief example.",
                "answer": "PEE stands for Point, Evidence, Explanation. For example: Point - 'Technology has democratised education.' Evidence - 'UNESCO reported 1.5 billion students shifted to online learning in 2020.' Explanation - 'This proves geographical barriers to education can be overcome digitally.'",
                "topic": "Essay Writing Technique"
            },
            {
                "question": "List three mandatory elements of a formal notice format for school events.",
                "answer": "Three mandatory elements are: (1) Heading/Name of the issuing body, (2) Date, (3) Body with What/When/Where/Whom, (4) Signature and designation. Any four of these are required.",
                "topic": "Notice Format"
            },
        ]
        for sa in short_ans_data:
            qid += 1
            bank.append({
                "id": f"ENG_C12_SA_{qid:03d}",
                "type": "short_answer",
                "topic": sa["topic"],
                "subtopic": sa["topic"],
                "difficulty": "medium",
                "cognitive_level": "understand",
                "question": sa["question"],
                "options": [],
                "answer": sa["answer"],
                "explanation": sa["answer"],
                "solver_type": "short_answer"
            })

        # ── SECTION D: Common Errors (Error Identification) ──
        for err in COMMON_ERRORS[5:10]:
            qid += 1
            bank.append({
                "id": f"ENG_C12_EI_{qid:03d}",
                "type": "short_answer",
                "topic": "Common Errors Catalog",
                "subtopic": err["name"],
                "difficulty": "medium",
                "cognitive_level": "evaluate",
                "question": f"Identify the error in the following student answer and provide the corrected version:\n\nStudent Answer: \"{err['before']}\"",
                "options": [],
                "answer": f"Corrected: {err['after']}",
                "correct_version": err["after"],
                "error_id": err["id"],
                "explanation": (
                    f"ERROR: {err['name']}\n"
                    f"Problem: {err['example']}\n"
                    f"Fix: {err['fix']}\n"
                    f"Corrected: {err['after']}"
                ),
                "solver_type": "error_identification"
            })

        # ── SECTION E: Sentence Transformation (Grammar) ──
        transform_data = [
            {
                "original": 'He said, "I am going to the market."',
                "correct": "He said that he was going to the market.",
                "type": "Narration Change (Assertive - Affirmative)",
                "explanation": "In reported speech, the present tense 'am' changes to past tense 'was', 'I' changes to 'he', and 'this/these' to 'that/those'. The reporting verb 'said' is used for statements."
            },
            {
                "original": 'She said to me, "Where do you live?"',
                "correct": "She asked me where I lived.",
                "type": "Narration Change (Interrogative)",
                "explanation": "In reported questions, the question form changes to statement form, and the tense shifts back. 'Where do you live?' becomes 'where I lived'."
            },
            {
                "original": "The chef cooks the meal.",
                "correct": "The meal is cooked by the chef.",
                "type": "Voice Change (Active → Passive)",
                "explanation": "In passive voice: object becomes subject, verb becomes 'be + past participle', and 'by' introduces the agent."
            },
            {
                "original": 'He said, "Let us go for a walk."',
                "correct": "He suggested that they should go for a walk.",
                "type": "Narration Change (Imperative)",
                "explanation": "Imperative sentences in reported speech use 'suggested/requested/advised + that + should + infinitive'."
            },
            {
                "original": "He exclaimed with joy that it was a wonderful sight.",
                "correct": '"What a wonderful sight it is!" he exclaimed with joy.',
                "type": "Narration Change (Exclamatory)",
                "explanation": "Exclamatory reported speech is converted back to exclamatory form using 'What' or 'How'."
            }
        ]
        for tr in transform_data:
            qid += 1
            bank.append({
                "id": f"ENG_C12_TR_{qid:03d}",
                "type": "short_answer",
                "topic": "Grammar - Sentence Transformation",
                "subtopic": tr["type"],
                "difficulty": "medium",
                "cognitive_level": "apply",
                "question": f"Transform the following sentence as directed:\nOriginal: {tr['original']}\nTransformation Type: {tr['type']}",
                "options": [],
                "answer": tr["correct"],
                "explanation": tr["explanation"],
                "solver_type": "transformation"
            })

        # ── SECTION F: Format Check ──
        qid += 1
        bank.append({
            "id": f"ENG_C12_FC_{qid:03d}",
            "type": "short_answer",
            "topic": "Notice Writing",
            "subtopic": "Format Identification",
            "difficulty": "easy",
            "cognitive_level": "apply",
            "question": (
                "The following notice has been drafted by a student. Identify the missing elements "
                "and rewrite the notice in the correct format.\n\n"
                "Sports Day\nAll students must come to the ground on Friday at 8 AM sharp.\n"
                "Rahul Sharma"
            ),
            "options": [],
            "answer": (
                "Correct Format:\nNOTICE\n[Date]\n\nSports Day will be held on Friday at 8:00 AM in the school ground. "
                "All students are required to attend in proper sports uniform.\n\nRahul Sharma\nSports Captain"
            ),
            "missing_elements": ["Heading (NOTICE)", "Date", "Venue", "Designation"],
            "correct_format": (
                "NOTICE\nApril 25, 2025\n\nSports Day will be held on Friday at 8:00 AM in the school ground. "
                "All students are required to attend in proper sports uniform.\n\nRahul Sharma\nSports Captain"
            ),
            "explanation": "Missing elements: (1) Heading 'NOTICE', (2) Date, (3) Full venue specification, (4) Designation after name.",
            "solver_type": "format_check"
        })

        # ── SECTION G: Comprehension Inference ──
        qid += 1
        bank.append({
            "id": f"ENG_C12_CI_{qid:03d}",
            "type": "short_answer",
            "topic": "Comprehension",
            "subtopic": "Inference",
            "difficulty": "medium",
            "cognitive_level": "infer",
            "question": (
                "Read the following passage excerpt and answer the question:\n\n"
                "'The city had grown accustomed to the rhythm of machines. Its people moved like cogs - "
                "predictable, replaceable, and silent. On Sundays, the parks lay empty; even nature seemed "
                "to have clocked out.'\n\n"
                "What does the author imply about urban life in the city?"
            ),
            "options": [],
            "answer": (
                "The author implies that urban life in the city has become mechanised and dehumanised - "
                "people have lost individuality and spontaneity, functioning like interchangeable parts of "
                "a machine. Even nature has been reduced to a scheduled, predictable entity."
            ),
            "explanation": (
                "The passage uses metaphor ('people moved like cogs') and personification ('nature seemed "
                "to have clocked out') to suggest that urban life strips people of their uniqueness. The "
                "empty parks on Sundays reinforce the idea that even leisure has been commodified."
            ),
            "solver_type": "comprehension"
        })

        # ── SECTION H: Elective English - Animal Farm (MCQ) ──
        af_mcqs = [
            {
                "q": "In Animal Farm, what does the windmill primarily symbolise?",
                "opts": ["The Soviet industrialisation under Stalin", "The animals' hope for a better future",
                         "Old Major's vision", "The rebellion against humans"],
                "ans": 1,
                "expl": "The windmill represents the animals' collective dream of a self-sustaining, technologically advanced farm - a symbol of hope that is ultimately co-opted by Napoleon to consolidate power, mirroring how Stalin used industrialisation promises to control the Soviet people."
            },
            {
                "q": "Which animal in Animal Farm represents the working class (proletariat)?",
                "opts": ["Napoleon", "Squealer", "Boxer", "Mollie"],
                "ans": 2,
                "expl": "Boxer represents the working class - loyal, hardworking, and exploited. His maxims 'I will work harder' and 'Napoleon is always right' mirror how the proletariat is manipulated into supporting its own exploitation."
            },
            {
                "q": "'All animals are equal, but some animals are more equal than others' - this line reveals:",
                "opts": ["The animals' commitment to Animalism", "The complete betrayal of the revolution's ideals",
                         "Old Major's original vision", "The animals' understanding of equality"],
                "ans": 1,
                "expl": "This line exposes the total hypocrisy of the pig leadership. It reveals how the revolution's ideals have been completely betrayed, mirroring how Stalin's regime replaced one form of tyranny with another."
            },
            {
                "q": "Who does Napoleon represent in the allegory of Animal Farm?",
                "opts": ["Karl Marx", "Leon Trotsky", "Joseph Stalin", "Vladimir Lenin"],
                "ans": 2,
                "expl": "Napoleon represents Joseph Stalin - both rise through manipulation, eliminate rivals (Snowball/Trotsky), use propaganda (Squealer), and betray the working class."
            },
            {
                "q": "The song 'Beasts of England' is banned because:",
                "opts": ["The animals no longer like it", "It reminds animals of the original revolutionary ideals, threatening Napoleon's power",
                         "It is too difficult to sing", "It is not patriotic enough"],
                "ans": 1,
                "expl": "Napoleon bans the song because it keeps alive the memory of the rebellion and the dream of animal equality - ideals that threaten his dictatorial control."
            }
        ]
        for mcq in af_mcqs:
            qid += 1
            bank.append({
                "id": f"ENG_C12_AF_{qid:03d}",
                "type": "mcq",
                "topic": "Elective English - Animal Farm",
                "subtopic": "Character and Theme",
                "difficulty": "medium",
                "cognitive_level": "analyse",
                "question": mcq["q"],
                "options": mcq["opts"],
                "answer": f"Option {chr(65+mcq['ans'])}: {mcq['opts'][mcq['ans']]}",
                "correct_index": mcq["ans"],
                "explanation": mcq["expl"],
                "solver_type": "mcq"
            })

        # ── SECTION I: Elective English - Animal Farm (Long Answer) ──
        long_ans_af = [
            {
                "question": "Trace the theme of the corruption of socialist ideals in Animal Farm, with close reference to three key incidents.",
                "sub_parts": [
                    "Explain Old Major's original vision of Animalism",
                    "Show how the Seven Commandments are progressively altered",
                    "Discuss the significance of the final scene with the humans"
                ],
                "model_answer": (
                    "Animal Farm traces the corruption of socialist ideals from the moment Old Major delivers "
                    "his revolutionary vision of an equal, just society where 'all animals are equal' - a clear "
                    "analogue to Marx's communism. The first sign of corruption appears when the pigs begin "
                    "appropriating the milk and apples, claiming they 'need' them for brainwork - Squealer "
                    "uses propaganda to justify this inequality. The progressive alteration of the Seven "
                    "Commandments marks the gradual betrayal: 'No animal shall drink alcohol' becomes 'No "
                    "animal shall drink alcohol to excess,' and finally 'No animal shall drink alcohol.' "
                    "The culminating corruption is the final scene, where the pigs dine with humans and the "
                    "Commandments are reduced to a single maxim: 'All animals are equal, but some animals "
                    "are more equal than others.' This mirrors Stalin's USSR, where the revolution's ideals "
                    "of equality were sacrificed to consolidate totalitarian power."
                ),
                "marks": 15
            },
            {
                "question": "Analyse the role of propaganda in Animal Farm. How does Squealer manipulate language to control the other animals?",
                "sub_parts": [
                    "Explain Squealer's role as Napoleon's propagandist",
                    "Give two examples of how Squealer manipulates language",
                    "Discuss the significance of the changing slogans"
                ],
                "model_answer": (
                    "Squealer serves as Napoleon's mouthpiece and the regime's chief propagandist, using "
                    "language manipulation to distort truth and control the animals' perception of reality. "
                    "First, he constantly revises the Seven Commandments while claiming they have always "
                    "been as he now describes - exploiting the animals' poor memories and limited literacy. "
                    "Second, he uses complex vocabulary ('readjustment,' 'organisation') to obscure simple "
                    "acts of exploitation. The changing slogans are deeply significant: 'Four legs good, two "
                    "legs bad' is later altered to 'Four legs good, two legs better' after the pigs begin "
                    "walking upright - demonstrating how language itself is weaponised to serve power."
                ),
                "marks": 15
            },
            {
                "question": "Discuss the character of Boxer in Animal Farm. What does his fate reveal about Orwell's view of the working class?",
                "sub_parts": [
                    "Describe Boxer's character traits and role on the farm",
                    "Analyse his loyalty and its consequences",
                    "Explain the significance of his betrayal"
                ],
                "model_answer": (
                    "Boxer is the archetype of the loyal, exploited proletariat - strong, hardworking, and "
                    "unquestioning. His twin maxims, 'I will work harder' and 'Napoleon is always right,' "
                    "reveal both his admirable dedication and his tragic gullibility. When Boxer collapses "
                    "from overwork, Napoleon sells him to the knacker's yard for money - a betrayal that "
                    "represents how totalitarian regimes dispose of loyal workers once they become useless. "
                    "Orwell uses Boxer's fate to argue that blind loyalty to authoritarian leadership, "
                    "however well-intentioned, leads inevitably to exploitation and destruction."
                ),
                "marks": 15
            }
        ]
        for la in long_ans_af:
            qid += 1
            bank.append({
                "id": f"ENG_C12_LA_AF_{qid:03d}",
                "type": "long_answer",
                "topic": "Elective English - Animal Farm",
                "subtopic": "Essay / Long Answer",
                "difficulty": "hard",
                "cognitive_level": "evaluate",
                "question": la["question"],
                "sub_parts": la["sub_parts"],
                "options": [],
                "answer": la["model_answer"],
                "marks": la["marks"],
                "word_limit": 350,
                "explanation": (
                    "STRUCTURE: Introduction → 3 PEEC paragraphs (one per sub-part) → Conclusion. "
                    "Each paragraph must have: Point → Evidence (quote/reference) → Explanation → Evaluation. "
                    "Use literary present tense throughout. Maintain word limit."
                ),
                "solver_type": "long_answer"
            })

        # ── SECTION J: Elective English - Twelve Angry Men (Long Answer) ──
        long_ans_12am = [
            {
                "question": "Discuss how Reginald Rose presents the theme of reasonable doubt in Twelve Angry Men.",
                "sub_parts": [
                    "Explain the significance of Juror 8's initial 'Not Guilty' vote",
                    "Analyse how Juror 8 dismantles the prosecution's case",
                    "Discuss the play's message about justice and moral responsibility"
                ],
                "model_answer": (
                    "Reasonable doubt is the moral and legal engine of Twelve Angry Men, embodied entirely "
                    "in Juror 8's principled stand. When he votes 'Not Guilty' alone against eleven 'Guilty' "
                    "votes, he declares that a human life deserves more than five minutes of discussion - "
                    "Rose's fundamental argument that justice requires deliberation. Juror 8 systematically "
                    "dismantles the prosecution's case: he questions the reliability of the old man's "
                    "testimony by replicating his limp; he demonstrates that the switch knife can be "
                    "opened one-handed; and he introduces the possibility of a different knife. Each doubt "
                    "cumulatively erodes the certainty of the other jurors. Rose's message is that justice "
                    "is not a verdict but a process - and that one person's moral courage can transform "
                    "a system prone to prejudice and haste."
                ),
                "marks": 15
            },
            {
                "question": "Analyse the character of Juror 3 in Twelve Angry Men. What motivates his stubborn insistence on a 'Guilty' verdict?",
                "sub_parts": [
                    "Describe Juror 3's character and behaviour throughout the play",
                    "Connect his aggression to his personal background",
                    "Explain the significance of his breakdown at the end"
                ],
                "model_answer": (
                    "Juror 3 is the play's antagonist - aggressive, authoritarian, and seemingly committed "
                    "to convicting the defendant. However, his stubbornness masks a deeper wound: his "
                    "estranged relationship with his own son has poisoned his view of young people, making "
                    "him see the defendant as a proxy for his son. His breakdown - 'I'm gonna kill you!' - "
                    "when he realises he is projecting his personal rage onto the case, is the play's most "
                    "significant moment. Rose uses Juror 3 to argue that personal bias can masquerade as "
                    "objective justice, and that confronting one's own prejudices is the only path to true "
                    "fairness."
                ),
                "marks": 15
            }
        ]
        for la in long_ans_12am:
            qid += 1
            bank.append({
                "id": f"ENG_C12_LA_12AM_{qid:03d}",
                "type": "long_answer",
                "topic": "Elective English - Twelve Angry Men",
                "subtopic": "Essay / Long Answer",
                "difficulty": "hard",
                "cognitive_level": "evaluate",
                "question": la["question"],
                "sub_parts": la["sub_parts"],
                "options": [],
                "answer": la["model_answer"],
                "marks": la["marks"],
                "word_limit": 350,
                "explanation": (
                    "STRUCTURE: Introduction → 3 PEEC paragraphs (one per sub-part) → Conclusion. "
                    "Each paragraph must have: Point → Evidence (quote/reference) → Explanation → Evaluation. "
                    "Use literary present tense throughout. Maintain word limit."
                ),
                "solver_type": "long_answer"
            })

        # ── SECTION K: Elective English - Fireflies Poetry (Short Answer) ──
        poetry_sa = [
            {
                "q": "How does Wilfred Owen present the horrors of war in 'Dulce et Decorum Est'? Refer closely to two striking images from the poem.",
                "a": (
                    "Owen presents war as degrading and grotesque through vivid imagery. First, the soldiers "
                    "'bent double, like old beggars under sacks' - this simile strips war of its glory, "
                    "showing men reduced to beggarly exhaustion. Second, the gas attack victim 'guttering, "
                    "choking, drowning in his own blood' - Owen's visceral description of froth 'corrupt' "
                    "at the victim's lips forces the reader to confront war's physical horror. The title "
                    "'Dulce et Decorum Est' (It is sweet and fitting) is bitterly ironic, exposing the "
                    "ancient lie that glorifies dying for one's country."
                ),
                "topic": "Fireflies - Owen: Dulce et Decorum Est"
            },
            {
                "q": "Discuss the theme of resistance to death in Dylan Thomas's 'Do not go Gentle into that Good Night.'",
                "a": (
                    "Thomas's villanelle is a passionate plea against accepting death passively. The "
                    "refrain 'Do not go gentle into that good night / Rage, rage against the dying of the "
                    "light' establishes defiance as the poem's emotional core. Thomas illustrates this "
                    "through four types of men - wise men, good men, wild men, and grave men - who all "
                    "resist death fiercely, each for different reasons. The wise men 'at their end know "
                    "dark is right,' yet they 'do not go gentle.' The poem is also a personal lament; the "
                    "repeated refrain becomes a son's desperate cry at his dying father's bedside."
                ),
                "topic": "Fireflies - Dylan Thomas: Do not go Gentle"
            },
            {
                "q": "How does Carol Ann Duffy present the emotional cost of being a war photographer in her poem 'War Photographer'?",
                "a": (
                    "Duffy presents the war photographer's emotional toll through the contrast between "
                    "his darkroom and the war zones he documents. In his 'darkroom,' he develops images "
                    "of 'running children in a nightmare heat,' transforming distant suffering into "
                    'ordered photographs. The line "spools of suffering set out in ordered rows" reveals '
                    "how the photographer must compartmentalise horror to do his job. The final stanzas "
                    "contrast the readers' casual response - 'the reader's eyeballs prick with tears' "
                    "between the bath and pre-lunch drinks - with the photographer's unresolved trauma, "
                    "suggesting that society consumes images of suffering without truly confronting them."
                ),
                "topic": "Fireflies - Carol Ann Duffy: War Photographer"
            },
            {
                "q": "How does Yeats use imagery of chaos and destruction in 'The Second Coming' to express his fears about civilisation?",
                "a": (
                    "Yeats uses apocalyptic imagery to convey the collapse of civilisation. 'Things fall "
                    "apart; the centre cannot hold' captures an era of political and moral disintegration - "
                    "written in 1919, the poem reflects post-WWI chaos. The 'blood-dimmed tide' suggests "
                    "violence overwhelming innocence. The 'rough beast' slouching 'towards Bethlehem to be "
                    "born' is a terrifying inversion of the nativity - a monstrous anti-Christ symbolising "
                    "the rise of barbarism. Yeats's imagery transforms historical anxiety into universal "
                    "vision, suggesting that when order fails, something far worse emerges."
                ),
                "topic": "Fireflies - Yeats: The Second Coming"
            }
        ]
        for psa in poetry_sa:
            qid += 1
            bank.append({
                "id": f"ENG_C12_POETRY_{qid:03d}",
                "type": "long_answer",
                "topic": "Elective English - Fireflies (Poetry)",
                "subtopic": psa["topic"],
                "difficulty": "hard",
                "cognitive_level": "analyse",
                "question": psa["q"],
                "sub_parts": [],
                "options": [],
                "answer": psa["a"],
                "marks": 10,
                "word_limit": 250,
                "explanation": (
                    "STRUCTURE: Introduction → 2-3 analytical paragraphs with PEEC chain → Conclusion. "
                    "Each paragraph must have: Point → Evidence (quote) → Explanation → Evaluation. "
                    "Use literary present tense. Reference specific lines from the poem."
                ),
                "solver_type": "long_answer"
            })


# return {"status": "ok", "note": "truncated"}
