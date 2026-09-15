"""
CISCE Class 6 History & Civics (HistCiv) Solver & Question Generator
Deterministic, seeded, syllabus-complete.
"""

import random
import math
import hashlib
from fractions import Fraction
from typing import Any, Dict, List, Optional
from dataclasses import dataclass, field
from enum import Enum

# ─────────────────────────────────────────────
#  SEED UTILITY
# ─────────────────────────────────────────────

def make_rng(seed: int) -> random.Random:
    return random.Random(seed)


# ─────────────────────────────────────────────
#  QUESTION DATA STRUCTURES
# ─────────────────────────────────────────────

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    HISTORY_MEANING = "history_meaning"
    LOCAL_SELF_GOVT = "local_self_government"
    METROPOLITAN_CITIES = "metropolitan_cities"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


# ─────────────────────────────────────────────
#  QUESTION BANK — ALL SYLLABUS NODES
# ─────────────────────────────────────────────

# Node c6_histciv_001: History — Meaning, Definition and Importance
HISTORY_QBANK: List[Dict] = [
    {
        "id": "H001_mcq_01",
        "type": QType.MCQ.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.EASY.value,
        "question": "The word 'history' is derived from the Greek word 'historia', which means:",
        "options": [
            "A story",
            "An inquiry or investigation",
            "A battle",
            "A kingdom",
        ],
        "answer": "An inquiry or investigation",
        "explanation": (
            "The Greek word 'historia' (ἱστορία) means inquiry, investigation, or knowledge acquired by inquiry. "
            "Herodotus used this term for his systematic investigation of the past, earning him the title 'Father of History'."
        ),
        "competency": False,
    },
    {
        "id": "H001_mcq_02",
        "type": QType.MCQ.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Who is known as the 'Father of History'?",
        "options": [
            "Kalhana",
            "Herodotus",
            "Thucydides",
            "Megasthenes",
        ],
        "answer": "Herodotus",
        "explanation": (
            "Herodotus (5th century BC), a Greek historian, is called the 'Father of History' because he was the "
            "first to systematically collect materials, test their accuracy, and arrange them in a vivid narrative."
        ),
        "competency": False,
    },
    {
        "id": "H001_mcq_03",
        "type": QType.MCQ.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Which of the following is NOT a reason to study history?",
        "options": [
            "To know our roots and heritage",
            "To learn from past mistakes",
            "To ignore evidence and imagine stories",
            "To understand how society has changed over time",
        ],
        "answer": "To ignore evidence and imagine stories",
        "explanation": (
            "History must always be based on evidence — artefacts, inscriptions, coins, records. Imagining stories "
            "without evidence is mythology or fiction, not history."
        ),
        "competency": True,
    },
    {
        "id": "H001_fb_01",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.EASY.value,
        "question": "The word 'history' comes from the Greek word '______', meaning inquiry.",
        "options": [],
        "answer": "historia",
        "explanation": (
            "The Greek word 'historia' (ἱστορία) literally means inquiry or investigation. This reflects the "
            "scholarly method historians use — seeking evidence and questioning sources."
        ),
        "competency": False,
    },
    {
        "id": "H001_fb_02",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.EASY.value,
        "question": "______ wrote the Rajatarangini, a historical work about the kings of Kashmir.",
        "options": [],
        "answer": "Kalhana",
        "explanation": (
            "Kalhana, a 12th-century Kashmiri scholar, wrote the Rajatarangini ('River of Kings'), a Sanskrit "
            "chronicle of the kings of Kashmir. It is considered one of India's earliest authentic historical works."
        ),
        "competency": True,
    },
    {
        "id": "H001_fb_03",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.EASY.value,
        "question": "History differs from a simple story because it must be based on ______.",
        "options": [],
        "answer": "evidence",
        "explanation": (
            "A story can be imagined, but history is a studied, evidence-based account of the past. Evidence includes "
            "artefacts, inscriptions, coins, old records, and oral traditions."
        ),
        "competency": True,
    },
    {
        "id": "H001_sa_01",
        "type": QType.SHORT_ANSWER.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Define history in your own words. (2 marks)",
        "options": [],
        "answer": (
            "History is the study of the past based on evidence such as artefacts, inscriptions, coins, and written records. "
            "It helps us understand how societies, cultures, and civilisations developed over time."
        ),
        "explanation": (
            "A good definition should mention: (1) study of the past, (2) based on evidence. Students should NOT say "
            "'history is just a story about the past' — that ignores the critical evidence-based nature of history."
        ),
        "competency": True,
    },
    {
        "id": "H001_sa_02",
        "type": QType.SHORT_ANSWER.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.EASY.value,
        "question": (
            "State any three reasons why studying history is important. (3 marks)"
        ),
        "options": [],
        "answer": (
            "(1) History helps us know our roots, heritage, and cultural identity. "
            "(2) It teaches us to learn from the mistakes of the past. "
            "(3) It helps us understand how human society has changed and evolved over time. "
            "(4) It develops critical thinking and the ability to evaluate evidence."
        ),
        "explanation": (
            "Any three valid reasons earn full marks. Additional valid reasons: understanding cause and effect in "
            "societal change; appreciating cultural diversity; guiding future policy decisions."
        ),
        "competency": True,
    },
    {
        "id": "H001_la_01",
        "type": QType.LONG_ANSWER.value,
        "topic": Topic.HISTORY_MEANING.value,
        "difficulty": Difficulty.MEDIUM.value,
        "question": (
            "Explain how history is different from a story or a fairy tale. "
            "Use examples to support your answer. (5 marks)"
        ),
        "options": [],
        "answer": (
            "History and stories differ in fundamental ways:\n"
            "1. BASIS: History is based on evidence (artefacts, inscriptions, records), while stories are products of "
            "imagination.\n"
            "2. PURPOSE: History seeks to reconstruct the actual past; stories aim to entertain or convey a moral.\n"
            "3. VERIFICATION: Historical claims can be checked against evidence; stories cannot.\n"
            "Example: Kalhana's Rajatarangini is history because it is based on records and inscriptions about "
            "Kashmiri kings. A tale about a king with magical powers, without any evidence, would be a story, not history."
        ),
        "explanation": (
            "Key points for full marks: evidence-based nature, purpose of reconstruction vs. entertainment, "
            "verifiability, and at least one concrete example. The Herodotus vs. fairy tale comparison also works."
        ),
        "competency": True,
    },
]

# Node c6_histciv_053: Local Self-Government
LSG_QBANK: List[Dict] = [
    {
        "id": "LSG01_mcq_01",
        "type": QType.MCQ.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Local self-government means administration run by:",
        "options": [
            "Officers appointed by the State Government",
            "Locally elected representatives of the people",
            "The Central Government",
            "A single powerful leader",
        ],
        "answer": "Locally elected representatives of the people",
        "explanation": (
            "Local self-government means the people of a locality elect their own representatives to manage local affairs. "
            "This is different from administration by state-appointed officers like a District Collector."
        ),
        "competency": True,
    },
    {
        "id": "LSG01_mcq_02",
        "type": QType.MCQ.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Local self-government is known as the ______ tier of Indian democracy.",
        "options": [
            "First",
            "Second",
            "Third",
            "Fourth",
        ],
        "answer": "Third",
        "explanation": (
            "Indian democracy has three tiers: (1) Union (Central) Government, (2) State Governments, "
            "(3) Local Self-Government (Panchayati Raj Institutions and Urban Local Bodies). "
            "The 73rd and 74th Constitutional Amendments (1992) gave constitutional status to local bodies."
        ),
        "competency": False,
    },
    {
        "id": "LSG01_mcq_03",
        "type": QType.MCQ.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Which Constitutional Amendment Act gave Panchayati Raj institutions constitutional status?",
        "options": [
            "42nd Amendment",
            "44th Amendment",
            "73rd Amendment",
            "101st Amendment",
        ],
        "answer": "73rd Amendment",
        "explanation": (
            "The 73rd Constitutional Amendment Act, 1992 added Part IX to the Constitution, giving Panchayati Raj "
            "Institutions constitutional status. The 74th Amendment did the same for urban local bodies (Municipalities)."
        ),
        "competency": True,
    },
    {
        "id": "LSG01_mcq_04",
        "type": QType.MCQ.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.MEDIUM.value,
        "question": "The three tiers of the Panchayati Raj System are:",
        "options": [
            "Village, Block, District",
            "City, Town, Village",
            "Ward, Zone, City",
            "Gram Sabha, Panchayat, Municipality",
        ],
        "answer": "Village, Block, District",
        "explanation": (
            "The three tiers are: (1) Gram Panchayat (village level), (2) Panchayat Samiti (block/intermediate level), "
            "(3) Zila Parishad (district level). All members at these tiers are elected by the local people."
        ),
        "competency": False,
    },
    {
        "id": "LSG01_fb_01",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": "The ______ Amendment Act, 1992, gave Panchayati Raj institutions constitutional status.",
        "options": [],
        "answer": "73rd",
        "explanation": (
            "The 73rd Amendment (1992) added Part IX and the 11th Schedule to the Constitution, listing 29 functions "
            "for Panchayats including agriculture, rural housing, and drinking water."
        ),
        "competency": True,
    },
    {
        "id": "LSG01_fb_02",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": "The local body at the village level is called the ______ Panchayat.",
        "options": [],
        "answer": "Gram",
        "explanation": (
            "The Gram Panchayat is the foundation of the Panchayati Raj System. It operates at the village level "
            "and is headed by a Sarpanch (elected chairperson)."
        ),
        "competency": False,
    },
    {
        "id": "LSG01_fb_03",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": "The local body at the district level is called the ______.",
        "options": [],
        "answer": "Zila Parishad",
        "explanation": (
            "The Zila Parishad is the apex body of the Panchayati Raj System at the district level. It coordinates "
            "the activities of Panchayat Samitis and Gram Panchayats within the district."
        ),
        "competency": False,
    },
    {
        "id": "LSG01_fb_04",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.MEDIUM.value,
        "question": (
            "The process of transferring powers and responsibilities from higher to lower levels of government "
            "is called ______."
        ),
        "options": [],
        "answer": "decentralisation",
        "explanation": (
            "Decentralisation means devolving power and functions from Central and State governments to local bodies. "
            "This allows decisions to be made closer to the people affected by them."
        ),
        "competency": True,
    },
    {
        "id": "LSG01_sa_01",
        "type": QType.SHORT_ANSWER.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": "What is local self-government? (2 marks)",
        "options": [],
        "answer": (
            "Local self-government is a system where the people of a particular area elect their own representatives "
            "to manage local affairs. It is the third tier of Indian democracy, below the Union and State governments, "
            "and includes Panchayati Raj Institutions in rural areas and Municipalities in urban areas."
        ),
        "explanation": (
            "Full marks for mentioning: (1) locally elected representatives, (2) managing local affairs, "
            "(3) third tier of democracy. Common error: confusing it with state-appointed administration."
        ),
        "competency": True,
    },
    {
        "id": "LSG01_sa_02",
        "type": QType.SHORT_ANSWER.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Name the three tiers of the Panchayati Raj System. (3 marks)",
        "options": [],
        "answer": (
            "The three tiers are:\n"
            "1. Gram Panchayat — at the village level\n"
            "2. Panchayat Samiti — at the block (intermediate) level\n"
            "3. Zila Parishad — at the district level"
        ),
        "explanation": (
            "All three must be named with their correct levels. Partial marks for naming two tiers correctly."
        ),
        "competency": False,
    },
    {
        "id": "LSG01_sa_03",
        "type": QType.SHORT_ANSWER.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.EASY.value,
        "question": (
            "Give any two reasons why local self-government is significant. (2 marks)"
        ),
        "options": [],
        "answer": (
            "(1) Problems are solved faster at the local level since representatives understand local needs directly.\n"
            "(2) It encourages people's participation in governance, strengthening democracy at the grassroots.\n"
            "(Other valid reasons: reduces burden on higher governments; trains future leaders; ensures "
            "locally appropriate decisions.)"
        ),
        "explanation": (
            "Any two valid reasons earn full marks. Students must relate the reason to local self-government, "
            "not just state general facts."
        ),
        "competency": True,
    },
    {
        "id": "LSG01_la_01",
        "type": QType.LONG_ANSWER.value,
        "topic": Topic.LOCAL_SELF_GOVT.value,
        "difficulty": Difficulty.MEDIUM.value,
        "question": (
            "Explain the significance of local self-government in a democratic country like India. "
            "Give at least four reasons with examples. (5 marks)"
        ),
        "options": [],
        "answer": (
            "Local self-government is significant because:\n"
            "1. FASTER PROBLEM-SOLVING: Local bodies can address issues like road repair, water supply, and "
            "street lighting quickly, as in Kolar district where the Panchayat repaired roads within weeks of a "
            "monsoon complaint — a task the state PWD would take months to complete.\n"
            "2. PEOPLE'S PARTICIPATION: It brings democracy to the doorstep, enabling ordinary citizens to "
            "participate in governance and decision-making.\n"
            "3. REDUCES BURDEN ON HIGHER GOVERNMENTS: Local bodies handle local issues, freeing the State and "
            "Union governments to focus on national and state-level matters.\n"
            "4. TRAINS FUTURE LEADERS: Elected local representatives gain experience in governance, creating a "
            "pool of experienced leaders.\n"
            "5. LOCALLY APPROPRIATE DECISIONS: Decisions are made by people who understand local conditions, "
            "as shown by Ralegan Siddhi's transformation under Anna Hazare's Gram Panchayat leadership."
        ),
        "explanation": (
            "Full marks for at least four well-explained reasons with specific Indian examples. "
            "The Kolar and Ralegan Siddhi examples from the syllabus are ideal."
        ),
        "competency": True,
    },
]

# Node c6_histciv_060: Metropolitan Cities
METRO_QBANK: List[Dict] = [
    {
        "id": "MET01_mcq_01",
        "type": QType.MCQ.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "A 'metropolitan' city is defined as a city with a population of:",
        "options": [
            "Over 100,000",
            "Over 500,000",
            "Over 1,000,000",
            "Over 5,000,000",
        ],
        "answer": "Over 1,000,000",
        "explanation": (
            "A metropolitan city (or metropolitan area) is defined as a large, densely populated urban area "
            "with a population exceeding one million people, with major commercial, administrative, and cultural "
            "importance. In India, cities like Mumbai, Delhi, Kolkata, Chennai, Bengaluru, and Hyderabad qualify."
        ),
        "competency": False,
    },
    {
        "id": "MET01_mcq_02",
        "type": QType.MCQ.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Which city is known as India's financial capital?",
        "options": [
            "Delhi",
            "Kolkata",
            "Chennai",
            "Mumbai",
        ],
        "answer": "Mumbai",
        "explanation": (
            "Mumbai is India's financial capital, home to the Bombay Stock Exchange (BSE), Reserve Bank of India, "
            "and numerous corporate headquarters. Its population exceeds 12 million."
        ),
        "competency": True,
    },
    {
        "id": "MET01_mcq_03",
        "type": QType.MCQ.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Which of the following was India's capital during British rule until 1911?",
        "options": [
            "Mumbai",
            "Chennai",
            "Kolkata",
            "Delhi",
        ],
        "answer": "Kolkata",
        "explanation": (
            "Kolkata (then Calcutta) was the capital of British India until 1911, when the capital was shifted to Delhi. "
            "Kolkata remains a major cultural and commercial centre of eastern India, situated on the Hooghly River."
        ),
        "competency": True,
    },
    {
        "id": "MET01_mcq_04",
        "type": QType.MCQ.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Chennai is located on which coast of India?",
        "options": [
            "Arabian Sea coast",
            "Bay of Bengal coast (Coromandel Coast)",
            "Goa coast",
            "Kerala coast",
        ],
        "answer": "Bay of Bengal coast (Coromandel Coast)",
        "explanation": (
            "Chennai lies on the Coromandel Coast of the Bay of Bengal in Tamil Nadu. It is a major port city and "
            "known as the 'Detroit of India' for its automobile manufacturing industry."
        ),
        "competency": True,
    },
    {
        "id": "MET01_mcq_05",
        "type": QType.MCQ.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.MEDIUM.value,
        "question": "Which of these cities is NOT one of the original four major metropolitan cities named in the syllabus?",
        "options": [
            "Kolkata",
            "Delhi",
            "Bengaluru",
            "Chennai",
        ],
        "answer": "Bengaluru",
        "explanation": (
            "The four major metropolitan cities highlighted in the syllabus are Kolkata, Delhi, Mumbai, and Chennai. "
            "Bengaluru is also a metropolitan city but is not one of these four. Students should not confuse "
            "'metropolitan' with only these four cities."
        ),
        "competency": True,
    },
    {
        "id": "MET01_fb_01",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Mumbai is known as India's ______ capital.",
        "options": [],
        "answer": "financial",
        "explanation": (
            "Mumbai is India's financial capital, housing the Bombay Stock Exchange (established 1875), "
            "the Reserve Bank of India, and numerous multinational corporations and financial institutions."
        ),
        "competency": True,
    },
    {
        "id": "MET01_fb_02",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Delhi is the ______ Capital Territory of India, housing the Parliament and Supreme Court.",
        "options": [],
        "answer": "National",
        "explanation": (
            "Delhi is officially the National Capital Territory (NCT) of India. It houses key national institutions "
            "including the Parliament House, Supreme Court, Rashtrapati Bhavan, and all central government ministries."
        ),
        "competency": True,
    },
    {
        "id": "MET01_fb_03",
        "type": QType.FILL_BLANK.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Kolkata is situated on the banks of the ______ River.",
        "options": [],
        "answer": "Hooghly",
        "explanation": (
            "Kolkata is situated on the eastern bank of the Hooghly River, a distributary of the Ganges. "
            "It was the capital of British India until 1911 and remains the major commercial and cultural centre "
            "of eastern India."
        ),
        "competency": True,
    },
    {
        "id": "MET01_sa_01",
        "type": QType.SHORT_ANSWER.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "What does the term 'metropolitan' mean? (2 marks)",
        "options": [],
        "answer": (
            "A metropolitan city is a large, densely populated urban area with a population exceeding one million "
            "people, having significant commercial, administrative, and cultural importance. Examples in India include "
            "Mumbai, Delhi, Kolkata, Chennai, Bengaluru, and Hyderabad."
        ),
        "explanation": (
            "Full marks for mentioning: (1) population over one million, (2) commercial/administrative/cultural "
            "importance. Students should note it is not limited to only four cities."
        ),
        "competency": True,
    },
    {
        "id": "MET01_sa_02",
        "type": QType.SHORT_ANSWER.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.EASY.value,
        "question": "Name the four major metropolitan cities of India as highlighted in your syllabus. (4 marks)",
        "options": [],
        "answer": (
            "The four major metropolitan cities are:\n"
            "1. Mumbai — India's financial capital, on the west coast\n"
            "2. Delhi — National Capital Territory, in northern India\n"
            "3. Kolkata — major eastern city on the Hooghly River\n"
            "4. Chennai — major port city on the Coromandel Coast (Bay of Bengal)"
        ),
        "explanation": (
            "All four must be named correctly. Bonus for mentioning one distinguishing feature of each city."
        ),
        "competency": False,
    },
    {
        "id": "MET01_la_01",
        "type": QType.LONG_ANSWER.value,
        "topic": Topic.METROPOLITAN_CITIES.value,
        "difficulty": Difficulty.MEDIUM.value,
        "question": (
            "Describe the distinguishing features of each of the four major metropolitan cities of India "
            "(Mumbai, Delhi, Kolkata, Chennai). (5 marks)"
        ),
        "options": [],
        "answer": (
            "MUMBAI:\n"
            "- India's financial capital; home to Bombay Stock Exchange and RBI\n"
            "- Population exceeds 12 million; major centre of commerce and entertainment (Bollywood)\n"
            "- Located on the west coast of Maharashtra\n\n"
            "DELHI:\n"
            "- National Capital Territory; houses Parliament, Supreme Court, Rashtrapati Bhavan\n"
            "- Political and administrative centre of India\n"
            "- New Delhi is the planned administrative district within the larger Delhi urban area\n\n"
            "KOLKATA:\n"
            "- Was India's capital under British rule until 1911\n"
            "- Major cultural and commercial centre of eastern India\n"
            "- Situated on the Hooghly River; famous for Durga Puja and intellectual tradition\n\n"
            "CHENNAI:\n"
            "- Major port city on the Coromandel Coast (Bay of Bengal)\n"
            "- Known as the 'Detroit of India' for automobile manufacturing\n"
            "- Important centre of Tamil culture, music, and classical dance (Bharatanatyam)"
        ),
        "explanation": (
            "Full marks for accurate description of all four cities with at least two distinguishing features each. "
            "Common error: confusing Delhi the city with New Delhi the administrative district."
        ),
        "competency": True,
    },
]

# ─────────────────────────────────────────────
#  COMPLETE QUESTION BANK
# ─────────────────────────────────────────────

ALL_QUESTIONS: List[Dict] = HISTORY_QBANK + LSG_QBANK + METRO_QBANK

# Index by topic for targeted generation
QBANK_BY_TOPIC: Dict[str, List[Dict]] = {}
for q in ALL_QUESTIONS:
    t = q["topic"]
    QBANK_BY_TOPIC.setdefault(t, []).append(q)


# ─────────────────────────────────────────────
#  QUESTION GENERATOR
# ─────────────────────────────────────────────

def generate_questions(seed: int, count: int,
                       topics: Optional[List[str]] = None,
                       difficulty: Optional[str] = None,
                       qtype: Optional[str] = None) -> List[Dict]:
    """
    Deterministically generate `count` questions from the bank.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Number of questions to return.
    topics : list of str, optional
        Filter to these topic values.
    difficulty : str, optional
        Filter to this difficulty level.
    qtype : str, optional
        Filter to this question type.

    Returns
    -------
    list of dict
        Each dict has keys: id, type, topic, difficulty, question, options,
        answer, explanation, competency.
    """
    rng = make_rng(seed)
    pool = list(ALL_QUESTIONS)

    if topics:
        pool = [q for q in pool if q["topic"] in topics]
    if difficulty:
        pool = [q for q in pool if q["difficulty"] == difficulty]
    if qtype:
        pool = [q for q in pool if q["type"] == qtype]

    if not pool:
        pool = list(ALL_QUESTIONS)

    rng.shuffle(pool)
    selected = pool[: min(count, len(pool))]

    # If fewer than count, cycle deterministically
    result = list(selected)
    idx = 0
    while len(result) < count and pool:
        result.append(pool[idx % len(pool)])
        idx += 1

    return result


# ─────────────────────────────────────────────
#  SOLVER FUNCTIONS
# ─────────────────────────────────────────────

def _find_question(qid: str) -> Optional[Dict]:
    for q in ALL_QUESTIONS:
        if q["id"] == qid:
            return q
    return None


# ── MCQ Solver ────────────────────────────────────────────────────────────────

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a multiple-choice question.

    params:
        question_id  (str)   – question ID from the bank
        user_answer  (str)   – the option text the student selected
    """
    qid = params.get("question_id", "")
    user_answer = params.get("user_answer", "")
    question = _find_question(qid)

    steps = []
    steps.append("Step 1: Retrieve the question from the question bank.")
    if question:
        steps.append(f"  → Question: {question['question']}")
        steps.append("Step 2: Evaluate the student's selected answer against the correct answer.")
        correct = question["answer"]
        steps.append(f"  → Correct answer: {correct}")
        steps.append(f"  → Student's answer: {user_answer}")

        is_correct = (user_answer.strip().lower() == correct.strip().lower())
        steps.append(f"Step 3: Compare answers — Match: {is_correct}")
        if not is_correct:
            steps.append(f"  → Explanation: {question['explanation']}")
        else:
            steps.append("  → Correct! Well done.")

        verification = {
            "method": "string_comparison",
            "correct_answer": correct,
            "student_answer": user_answer,
            "is_correct": is_correct,
        }
        return {
            "answer": correct,
            "is_correct": is_correct,
            "steps": steps,
            "verification": verification,
            "explanation": question["explanation"],
            "topic": question["topic"],
            "competency": question.get("competency", False),
        }
    else:
        steps.append(f"  → ERROR: Question ID '{qid}' not found in bank.")
        return {
            "answer": None,
            "is_correct": False,
            "steps": steps,
            "verification": {"error": f"Question ID '{qid}' not found."},
            "explanation": "",
            "topic": "",
            "competency": False,
        }


# ── Fill-in-the-Blank Solver ─────────────────────────────────────────────────

def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a fill-in-the-blank question.

    params:
        question_id  (str)
        user_answer  (str)
        case_sensitive (bool, optional, default False)
    """
    qid = params.get("question_id", "")
    user_answer = params.get("user_answer", "")
    case_sensitive = params.get("case_sensitive", False)

    question = _find_question(qid)
    steps = []
    steps.append("Step 1: Retrieve the fill-in-the-blank question from the bank.")
    if question:
        steps.append(f"  → Question: {question['question']}")
        correct = question["answer"]
        steps.append(f"Step 2: Normalize and compare answers.")
        steps.append(f"  → Expected answer: '{correct}'")
        steps.append(f"  → Student's answer: '{user_answer}'")

        if case_sensitive:
            is_correct = user_answer.strip() == correct.strip()
        else:
            is_correct = user_answer.strip().lower() == correct.strip().lower()

        steps.append(f"Step 3: Match result: {is_correct}")
        if not is_correct:
            steps.append(f"  → Hint: {question['explanation']}")

        verification = {
            "method": "string_comparison_normalized",
            "case_sensitive": case_sensitive,
            "correct_answer": correct,
            "student_answer": user_answer,
            "is_correct": is_correct,
        }
        return {
            "answer": correct,
            "is_correct": is_correct,
            "steps": steps,
            "verification": verification,
            "explanation": question["explanation"],
            "topic": question["topic"],
            "competency": question.get("competency", False),
        }
    else:
        steps.append(f"  → ERROR: Question ID '{qid}' not found.")
        return {
            "answer": None,
            "is_correct": False,
            "steps": steps,
            "verification": {"error": f"Question ID '{qid}' not found."},
            "explanation": "",
            "topic": "",
            "competency": False,
        }


# ── Short-Answer Solver ────────────────────────────────────────────────────────

def solve_short_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a short-answer question using keyword matching.

    params:
        question_id  (str)
        user_answer  (str)
    """
    qid = params.get("question_id", "")
    user_answer = params.get("user_answer", "")
    question = _find_question(qid)

    steps = []
    steps.append("Step 1: Retrieve the short-answer question and model answer from the bank.")
    if question:
        steps.append(f"  → Question: {question['question']}")
        correct_answer = question["answer"]
        steps.append(f"Step 2: Compare student answer with model answer using keyword overlap analysis.")

        # Extract keywords from model answer (non-trivial words)
        stop_words = {
            "the", "a", "an", "is", "are", "was", "were", "of", "in", "on",
            "to", "for", "and", "or", "but", "by", "from", "with", "that",
            "this", "it", "as", "at", "be", "been", "being", "have", "has",
            "had", "do", "does", "did", "will", "would", "shall", "should",
            "can", "could", "may", "might", "must", "not", "no", "nor",
            "their", "our", "your", "his", "her", "its", "they", "them",
            "these", "those", "which", "who", "whom", "what", "where",
            "when", "how", "why", "all", "each", "every", "both", "few",
            "more", "most", "other", "some", "such", "only", "own", "same",
            "than", "too", "very", "just", "because", "but", "and", "if",
            "while", "although", "though", "even", "also", "still",
            "step", "any", "into", "through", "during", "before", "after",
            "above", "below", "between", "under", "again", "further",
            "then", "once", "here", "there", "about", "out", "up", "down",
        }

        def extract_keywords(text: str) -> set:
            words = text.lower().replace("(", " ").replace(")", " ").replace(",", " ").replace(".", " ").split()
            return {w for w in words if len(w) > 2 and w not in stop_words}

        model_keywords = extract_keywords(correct_answer)
        student_keywords = extract_keywords(user_answer)

        if not model_keywords:
            overlap_ratio = 0.0
        else:
            overlap = model_keywords & student_keywords
            overlap_ratio = len(overlap) / len(model_keywords)

        # Threshold: 40% keyword overlap = partial credit, 70% = good
        if overlap_ratio >= 0.70:
            score_label = "Excellent"
            is_correct = True
        elif overlap_ratio >= 0.40:
            score_label = "Partial credit"
            is_correct = True
        else:
            score_label = "Insufficient"
            is_correct = False

        steps.append(f"  → Model answer keywords ({len(model_keywords)}): {sorted(model_keywords)[:10]}...")
        steps.append(f"  → Student keywords matched: {overlap_ratio:.0%}")
        steps.append(f"  → Assessment: {score_label}")
        steps.append(f"  → Model answer: {correct_answer[:200]}...")

        verification = {
            "method": "keyword_overlap",
            "model_keyword_count": len(model_keywords),
            "matched_keywords": len(model_keywords & student_keywords),
            "overlap_ratio": round(overlap_ratio, 4),
            "threshold_full": 0.70,
            "threshold_partial": 0.40,
            "score_label": score_label,
            "is_correct": is_correct,
        }

        return {
            "answer": correct_answer,
            "is_correct": is_correct,
            "score_label": score_label,
            "steps": steps,
            "verification": verification,
            "explanation": question["explanation"],
            "topic": question["topic"],
            "competency": question.get("competency", False),
        }
    else:
        steps.append(f"  → ERROR: Question ID '{qid}' not found.")
        return {
            "answer": None,
            "is_correct": False,
            "score_label": "N/A",
            "steps": steps,
            "verification": {"error": f"Question ID '{qid}' not found."},
            "explanation": "",
            "topic": "",
            "competency": False,
        }


# ── Long-Answer Solver ─────────────────────────────────────────────────────────

def solve_long_answer(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve a long-answer question using multi-point keyword coverage.

    params:
        question_id  (str)
        user_answer  (str)
        max_points   (int, optional, default 5)
    """
    qid = params.get("question_id", "")
    user_answer = params.get("user_answer", "")
    max_points = params.get("max_points", 5)

    question = _find_question(qid)
    steps = []
    steps.append("Step 1: Retrieve the long-answer question and model answer from the bank.")
    if question:
        steps.append(f"  → Question: {question['question']}")
        correct_answer = question["answer"]
        steps.append("Step 2: Extract key points from the model answer and check student coverage.")

        stop_words = {
            "the", "a", "an", "is", "are", "was", "were", "of", "in", "on",
            "to", "for", "and", "or", "but", "by", "from", "with", "that",
            "this", "it", "as", "at", "be", "been", "being", "have", "has",
            "had", "do", "does", "did", "will", "would", "shall", "should",
            "can", "could", "may", "might", "must", "not", "no", "nor",
            "their", "our", "your", "his", "her", "its", "they", "them",
            "these", "those", "which", "who", "whom", "what", "where",
            "when", "how", "why", "all", "each", "every", "both", "few",
            "more", "most", "other", "some", "such", "only", "own", "same",
            "than", "too", "very", "just", "because", "step",
            "also", "still", "even", "into", "through",
        }

        def extract_significant(text: str) -> set:
            words = text.lower().replace("(", " ").replace(")", " ").replace(",", " ").replace(".", " ").split()
            return {w for w in words if len(w) > 3 and w not in stop_words}

        model_kw = extract_significant(correct_answer)
        student_kw = extract_significant(user_answer)

        overlap = model_kw & student_kw
        if not model_kw:
            ratio = 0.0
        else:
            ratio = len(overlap) / len(model_kw)

        # Score out of max_points
        points_earned = round(ratio * max_points, 1)
        points_earned = min(points_earned, max_points)

        steps.append(f"  → Model answer significant keywords: {len(model_kw)}")
        steps.append(f"  → Keyword coverage: {ratio:.0%}")
        steps.append(f"  → Points earned: {points_earned}/{max_points}")

        if ratio >= 0.75:
            grade = "Excellent"
        elif ratio >= 0.55:
            grade = "Good"
        elif ratio >= 0.35:
            grade = "Satisfactory"
        else:
            grade = "Needs Improvement"

        steps.append(f"  → Grade: {grade}")

        verification = {
            "method": "multi_point_keyword_coverage",
            "max_points": max_points,
            "points_earned": points_earned,
            "keyword_coverage_ratio": round(ratio, 4),
            "grade": grade,
        }

        return {
            "answer": correct_answer,
            "points_earned": points_earned,
            "max_points": max_points,
            "grade": grade,
            "is_correct": ratio >= 0.55,
            "steps": steps,
            "verification": verification,
            "explanation": question["explanation"],
            "topic": question["topic"],
            "competency": question.get("competency", False),
        }
    else:
        steps.append(f"  → ERROR: Question ID '{qid}' not found.")
        return {
            "answer": None,
            "points_earned": 0,
            "max_points": max_points,
            "grade": "N/A",
            "is_correct": False,
            "steps": steps,
            "verification": {"error": f"Question ID '{qid}' not found."},
            "explanation": "",
            "topic": "",
            "competency": False,
        }


# ── Numerical Solver ───────────────────────────────────────────────────────────

def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Solve numerical / calculation-type questions using SymPy/numpy.
    Currently supports arithmetic word problems derived from syllabus context.

    params:
        question_id  (str)
        user_answer  (float or str)
        variables    (dict, optional) – additional numeric values
    """
    qid = params.get("question_id", "")
    user_answer_raw = params.get("user_answer", 0)
    variables = params.get("variables", {})

    try:
        user_answer = float(user_answer_raw)
    except (TypeError, ValueError):
        user_answer = None

    question = _find_question(qid)
    steps = []
    steps.append("Step 1: Retrieve the numerical question and compute the correct answer.")

    if question:
        steps.append(f"  → Question: {question['question']}")

        # Compute expected answer based on topic
        computed_answer = _compute_numerical_answer(qid, variables)

        steps.append("Step 2: Apply mathematical computation.")
        steps.append(f"  → Variables used: {variables}")
        steps.append(f"  → Computed answer: {computed_answer}")

        if user_answer is not None:
            tolerance = 1e-6
            is_correct = abs(user_answer - computed_answer) <= tolerance
            steps.append(f"Step 3: Compare with student answer {user_answer}.")
            steps.append(f"  → Tolerance: {tolerance}")
            steps.append(f"  → Difference: {abs(user_answer - computed_answer):.6f}")
            steps.append(f"  → Correct: {is_correct}")
        else:
            is_correct = False
            steps.append(f"Step 3: Student answer '{user_answer_raw}' could not be parsed as a number.")

        verification = {
            "method": "numerical_computation",
            "computed_answer": computed_answer,
            "student_answer": user_answer,
            "tolerance": 1e-6,
            "is_correct": is_correct,
            "variables_used": variables,
        }

        return {
            "answer": computed_answer,
            "is_correct": is_correct,
            "steps": steps,
            "verification": verification,
            "explanation": question["explanation"],
            "topic": question["topic"],
            "competency": question.get("competency", False),
        }
    else:
        # Generic numerical computation without a bank question
        steps.append(f"  → No matching bank question; using provided computation.")
        if user_answer is not None:
            computed = variables.get("expected", None)
            verification = {
                "method": "generic_numerical",
                "computed_answer": computed,
                "student_answer": user_answer,
                "is_correct": computed is not None and abs(user_answer - computed) < 1e-6,
            }
        else:
            verification = {"error": "Invalid student answer."}
        return {
            "answer": computed if user_answer is not None else None,
            "is_correct": False,
            "steps": steps,
            "verification": verification,
            "explanation": "",
            "topic": "",
            "competency": False,
        }


def _compute_numerical_answer(qid: str, variables: Dict[str, float]) -> float:
    """
    Compute the correct numerical answer for numerical-type questions.
    Uses SymPy-style symbolic computation where applicable.
    """
    import sympy as sp

    # Numerical examples drawn from syllabus context
    if qid in ("HIST_NUM_01",):
        # Population difference: Mumbai 12.5M - Delhi 11M = 1.5M
        mumbai_pop = variables.get("mumbai_pop", 12.5)
        delhi_pop = variables.get("delhi_pop", 11.0)
        return round(mumbai_pop - delhi_pop, 2)

    elif qid in ("LSG_NUM_01",):
        # If 4 out of 7 Gram Sabha members support a proposal, fraction = 4/7
        supporters = variables.get("supporters", 4)
        total = variables.get("total", 7)
        frac = Fraction(supporters, total)
        return float(frac)

    elif qid in ("LSG_NUM_02",):
        # Percentage: if 3 out of 5 villages in a block have functioning Gram Panchayats
        functioning = variables.get("functioning", 3)
        total_villages = variables.get("total_villages", 5)
        pct = (functioning / total_villages) * 100
        return round(pct, 1)

    elif qid in ("MET_NUM_01",):
        # Ratio: Mumbai (12M) to Chennai (7M) = 12/7 ≈ 1.71
        pop_mumbai = variables.get("pop_mumbai", 12.0)
        pop_chennai = variables.get("pop_chennai", 7.0)
        ratio = Fraction(pop_mumbai, pop_chennai)
        return round(float(ratio), 4)

    else:
        # Default: try to evaluate a symbolic expression from variables
        expr = variables.get("expression", "0")
        try:
            return float(sp.sympify(expr))
        except Exception:
            return 0.0


# ─────────────────────────────────────────────
#  BATCH SOLVER
# ─────────────────────────────────────────────

def solve_batch(params_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Solve a batch of questions.

    Each params dict must have:
        - type: one of "mcq", "fill_blank", "short_answer", "long_answer", "numerical"
        - question_id: str
        - user_answer: appropriate type
    """
    solvers = {
        QType.MCQ.value: solve_mcq,
        QType.FILL_BLANK.value: solve_fill_blank,
        QType.SHORT_ANSWER.value: solve_short_answer,
        QType.LONG_ANSWER.value: solve_long_answer,
        QType.NUMERICAL.value: solve_numerical,
    }
    results = []
    for params in params_list:
        qtype = params.get("type", "")
        solver_fn = solvers.get(qtype)
        if solver_fn:
            result = solver_fn(params)
            result["params"] = params
            results.append(result)
        else:
            results.append({
                "answer": None,
                "is_correct": False,
                "steps": [f"Unknown question type: '{qtype}'"],
                "verification": {"error": f"Unknown type '{qtype}'"},
                "explanation": "",
                "topic": "",
                "competency": False,
                "params": params,
            })
    return results


# ─────────────────────────────────────────────
#  STATISTICS & REPORTING
# ─────────────────────────────────────────────

def compute_stats(results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Compute summary statistics from batch solver results.
    """
    total = len(results)
    correct = sum(1 for r in results if r.get("is_correct", False))
    by_topic: Dict[str, Dict[str, int]] = {}
    competency_correct = 0
    competency_total = 0

    for r in results:
        topic = r.get("topic", "unknown")
        by_topic.setdefault(topic, {"total": 0, "correct": 0})
        by_topic[topic]["total"] += 1
        if r.get("is_correct", False):
            by_topic[topic]["correct"] += 1
        if r.get("competency", False):
            competency_total += 1
            if r.get("is_correct", False):
                competency_correct += 1

    return {
        "total_questions": total,
        "total_correct": correct,
        "accuracy": round(correct / total, 4) if total > 0 else 0.0,
        "by_topic": by_topic,
        "competency_questions": competency_total,
        "competency_correct": competency_correct,
        "competency_accuracy": round(competency_correct / competency_total, 4) if competency_total > 0 else 0.0,
        "standard_questions": total - competency_total,
        "standard_correct": correct - competency_correct,
    }


# ─────────────────────────────────────────────
#  SAMPLE DEMO (runs when executed directly)
# ─────────────────────────────────────────────

def run_demo():
    """Run a sample demonstration of the solver and question generator."""
    print("=" * 70)
    print("CISCE Class 6 HistCiv — Solver & Question Generator Demo")
    print("=" * 70)

    # ── Question Generation ──────────────────────────────────────────────────
    print("\n--- GENERATED QUESTIONS (seed=42, count=10) ---")
    questions = generate_questions(seed=42, count=10)
    for i, q in enumerate(questions, 1):
        print(f"\nQ{i}. [{q['id']}] ({q['type']}) [{q['difficulty']}] [Competency: {q.get('competency', False)}]")
        print(f"   Topic: {q['topic']}")
        print(f"   {q['question']}")
        if q.get("options"):
            for opt in q["options"]:
                print(f"      {opt}")
        print(f"   Answer: {q['answer']}")

    # ── MCQ Solver ───────────────────────────────────────────────────────────
    print("\n\n--- MCQ SOLVER EXAMPLE ---")
    mcq_result = solve_mcq({
        "question_id": "H001_mcq_01",
        "user_answer": "An inquiry or investigation",
    })
    print(f"Question: The word 'history' is derived from the Greek word 'historia'...")
    print(f"Student Answer: 'An inquiry or investigation'")
    print(f"Is Correct: {mcq_result['is_correct']}")
    print(f"Steps:")
    for step in mcq_result["steps"]:
        print(f"  {step}")

    # ── Fill-Blank Solver ────────────────────────────────────────────────────
    print("\n\n--- FILL-BLANK SOLVER EXAMPLE ---")
    fb_result = solve_fill_blank({
        "question_id": "LSG01_fb_01",
        "user_answer": "73rd",
    })
    print(f"Question: The ______ Amendment Act, 1992, gave Panchayati Raj institutions constitutional status.")
    print(f"Student Answer: '73rd'")
    print(f"Is Correct: {fb_result['is_correct']}")
    print(f"Steps:")
    for step in fb_result["steps"]:
        print(f"  {step}")

    # ── Short-Answer Solver ──────────────────────────────────────────────────
    print("\n\n--- SHORT-ANSWER SOLVER EXAMPLE ---")
    sa_result = solve_short_answer({
        "question_id": "LSG01_sa_03",
        "user_answer": (
            "Local self-government solves problems faster because local representatives "
            "understand the needs of their area. It also encourages people's participation "
            "in democracy, strengthening grassroots governance."
        ),
    })
    print(f"Question: Give any two reasons why local self-government is significant.")
    print(f"Score Label: {sa_result.get('score_label', 'N/A')}")
    print(f"Is Correct: {sa_result['is_correct']}")
    print(f"Steps:")
    for step in sa_result["steps"]:
        print(f"  {step}")

    # ── Long-Answer Solver ───────────────────────────────────────────────────
    print("\n\n--- LONG-ANSWER SOLVER EXAMPLE ---")
    la_result = solve_long_answer({
        "question_id": "LSG01_la_01",
        "user_answer": (
            "Local self-government is significant because it solves problems faster — for example, "
            "the Kolar district panchayat repaired village roads quickly after monsoon damage. "
            "It also encourages people's participation in governance at the grassroots level. "
            "Additionally, it reduces the burden on higher governments and trains future leaders "
            "by giving them experience in local administration. "
            "Ralegan Siddhi under Anna Hazare shows how local decisions can transform a village."
        ),
        "max_points": 5,
    })
    print(f"Question: Explain the significance of local self-government...")
    print(f"Grade: {la_result.get('grade', 'N/A')}")
    print(f"Points: {la_result.get('points_earned', 0)}/{la_result.get('max_points', 5)}")
    print(f"Steps:")
    for step in la_result["steps"]:
        print(f"  {step}")

    # ── Numerical Solver ─────────────────────────────────────────────────────
    print("\n\n--- NUMERICAL SOLVER EXAMPLE ---")
    num_result = solve_numerical({
        "question_id": "HIST_NUM_01",
        "user_answer": 1.5,
        "variables": {"mumbai_pop": 12.5, "delhi_pop": 11.0},
    })
    print(f"Question: Population difference between Mumbai (12.5M) and Delhi (11.0M)")
    print(f"Expected Answer: {num_result['answer']}")
    print(f"Is Correct: {num_result['is_correct']}")
    print(f"Steps:")
    for step in num_result["steps"]:
        print(f"  {step}")

    # ── Batch Solver + Stats ─────────────────────────────────────────────────
    print("\n\n--- BATCH SOLVER + STATISTICS ---")
    batch_questions = generate_questions(seed=100, count=6)
    batch_params = [
        {
            "type": q["type"],
            "question_id": q["id"],
            "user_answer": (
                q["answer"] if q["type"] in ("mcq", "fill_blank")
                else f"This answer covers the key points about {q['topic']} including "
                     f"concepts like {q['answer'][:40]}..."
            ),
        }
        for q in batch_questions
    ]
    batch_results = solve_batch(batch_params)
    stats = compute_stats(batch_results)

    print(f"  Total Questions:     {stats['total_questions']}")
    print(f"  Total Correct:       {stats['total_correct']}")
    print(f"  Overall Accuracy:    {stats['accuracy']:.0%}")
    print(f"  Competency Questions:{stats['competency_questions']}")
    print(f"  Competency Accuracy: {stats['competency_accuracy']:.0%}")
    print(f"  Standard Questions:  {stats['standard_questions']}")
    print("  By Topic:")
    for topic, tstats in stats["by_topic"].items():
        acc = tstats["correct"] / tstats["total"] if tstats["total"] > 0 else 0
        print(f"    {topic}: {tstats['correct']}/{tstats['total']} ({acc:.0%})")

    print("\n" + "=" * 70)
    print("Demo complete. All operations were deterministic and reproducible.")
    print("=" * 70)


if __name__ == "__main__":
    run_demo()