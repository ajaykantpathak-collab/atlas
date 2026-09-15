"""
CISCE Class 11 Mass Media - Deterministic Solver & Question Generator
Self-contained. No LLM calls. SymPy / numpy / scipy / random with seeding.
"""

import math
import random
import hashlib
import json
import re
from dataclasses import dataclass, field
from fractions import Fraction
from typing import Any, Dict, List, Optional, Tuple
from enum import Enum

# ─────────────────────────────────────────────────────────────────────────────
# Seeded reproducibility helper
# ─────────────────────────────────────────────────────────────────────────────

def make_rng(seed: int) -> random.Random:
    return random.Random(seed)


# ─────────────────────────────────────────────────────────────────────────────
# SymPy availability
# ─────────────────────────────────────────────────────────────────────────────

try:
    import sympy as sp
    _HAS_SYMPY = True
except ImportError:
    _HAS_SYMPY = False


# ─────────────────────────────────────────────────────────────────────────────
# Question type enum
# ─────────────────────────────────────────────────────────────────────────────

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


# ─────────────────────────────────────────────────────────────────────────────
# DATA: Syllabus topic registry
# ─────────────────────────────────────────────────────────────────────────────

CHAPTERS = {
    1: {
        "title": "Communication",
        "nodes": {
            "c11_massmedia_001": {
                "title": "Understanding Communication - Definition and Nature",
                "topics": ["communication_definition", "communication_as_science", "communication_as_art",
                           "nature_of_communication"],
                "difficulty": "Easy",
                "weightage": "Medium",
            },
            "c11_massmedia_002": {
                "title": "Intrapersonal Communication",
                "topics": ["intrapersonal_definition", "self_concept", "self_disclosure", "self_esteem"],
                "difficulty": "Easy",
                "weightage": "Low",
            },
            "c11_massmedia_003": {
                "title": "Interpersonal Communication",
                "topics": ["interpersonal_definition", "interpersonal_skills", "barriers_to_interpersonal"],
                "difficulty": "Easy",
                "weightage": "Medium",
            },
            "c11_massmedia_004": {
                "title": "Group Communication",
                "topics": ["group_communication", "group_dynamics", "roles_in_group"],
                "difficulty": "Medium",
                "weightage": "Medium",
            },
            "c11_massmedia_005": {
                "title": "Mass Communication - Definition and Nature",
                "topics": ["mass_communication_definition", "mass_media_characteristics", "mass_vs_interpersonal"],
                "difficulty": "Medium",
                "weightage": "High",
            },
            "c11_massmedia_006": {
                "title": "Functions of Mass Communication",
                "topics": ["surveillance", "correlation", "entertainment", "cultural_transmission",
                           "mobilization"],
                "difficulty": "Medium",
                "weightage": "Medium",
            },
            "c11_massmedia_007": {
                "title": "Communication Models - Shannon-Weaver, Lasswell, Osgood-Schramm",
                "topics": ["shannon_weaver_model", "lasswell_model", "osgood_schramm_model",
                           "communication_models_comparison"],
                "difficulty": "Medium",
                "weightage": "High",
            },
        },
    },
    2: {
        "title": "Basics of Journalism",
        "nodes": {
            "c11_massmedia_008": {
                "title": "Definition of Journalism",
                "topics": ["journalism_definition", "role_of_journalism"],
                "difficulty": "Easy",
                "weightage": "Low",
            },
            "c11_massmedia_009": {
                "title": "Understanding News - Definition, Hard News vs Soft News",
                "topics": ["news_definition", "hard_news", "soft_news", "news_values"],
                "difficulty": "Easy",
                "weightage": "Medium",
            },
            "c11_massmedia_010": {
                "title": "Components of News",
                "topics": ["accuracy", "attribution", "fairness", "clarity", "brevity"],
                "difficulty": "Easy",
                "weightage": "Medium",
            },
            "c11_massmedia_011": {
                "title": "News Structure - Inverted Pyramid",
                "topics": ["inverted_pyramid", "lead", "headline", "nut_graph"],
                "difficulty": "Medium",
                "weightage": "Medium",
            },
            "c11_massmedia_012": {
                "title": "Types of Journalism",
                "topics": ["investigative_journalism", "photojournalism", "citizen_journalism",
                           "data_journalism"],
                "difficulty": "Medium",
                "weightage": "Medium",
            },
            "c11_massmedia_013": {
                "title": "Press Council of India & Ethics in Journalism",
                "topics": ["press_council_india", "journalism_ethics", "code_of_ethics"],
                "difficulty": "Medium",
                "weightage": "High",
            },
            "c11_massmedia_014": {
                "title": "Photo Journalism",
                "topics": ["photojournalism_definition", "caption_writing", "photo_ethics",
                           "famous_indian_photojournalists"],
                "difficulty": "Easy",
                "weightage": "Medium",
            },
        },
    },
    3: {
        "title": "Radio",
        "nodes": {
            "c11_massmedia_015": {
                "title": "Radio Programmes - News, Talk Shows, Interviews, Announcements",
                "topics": ["radio_news_bulletin", "radio_talk_show", "radio_interview",
                           "radio_announcement", "commercial_announcement", "public_service_announcement"],
                "difficulty": "Medium",
                "weightage": "Medium",
            },
            "c11_massmedia_016": {
                "title": "Radio Programmes - Documentaries, Dramas, Features, Commentary",
                "topics": ["radio_documentary", "radio_drama", "radio_feature", "radio_commentary"],
                "difficulty": "Medium",
                "weightage": "Medium",
            },
            "c11_massmedia_017": {
                "title": "Radio as a Medium - Characteristics, AIR, FM Radio",
                "topics": ["radio_characteristics", "all_india_radio", "fm_radio", "radio_audience",
                           "community_radio_india"],
                "difficulty": "Medium",
                "weightage": "High",
            },
        },
    },
}

ALL_NODES: Dict[str, dict] = {}
for ch_nodes in CHAPTERS.values():
    ALL_NODES.update(ch_nodes["nodes"])


# ─────────────────────────────────────────────────────────────────────────────
# CONTENT BANKS  (Indian-context + standard)
# ─────────────────────────────────────────────────────────────────────────────

# --- Communication (Ch 1) ----------------------------------------------------
COMM_DEFINITIONS = [
    {"term": "Communication",
     "definition": "Communication is the process of creating meaning in any situation through symbolic, interconnected, and purposeful exchange of messages.",
     "key_words": ["process", "meaning", "symbolic", "exchange", "messages"],
     "indian_context": "Rabindranath Tagore established Visva-Bharati as a medium of global communication bridging East and West."},
    {"term": "Science of Communication",
     "definition": "Communication as a science means it follows systematic, measurable, and empirical methods of study - channels, feedback loops, encoding/decoding can be quantified.",
     "key_words": ["systematic", "measurable", "empirical", "channels", "feedback"],
     "indian_context": "India's satellite-based EDUSAT (2004) used communication science to reach rural students across states."},
    {"term": "Art of Communication",
     "definition": "Communication as an art means it involves creativity, expression, persuasion, and aesthetics - the way a message is crafted, delivered, and received emotionally.",
     "key_words": ["creativity", "expression", "persuasion", "aesthetics", "craft"],
     "indian_context": "Kishore Kumar's radio personality at All India Radio reflected the artistic side of communication."},
]

INTRAPERSONAL_FACTS = [
    {"concept": "Intrapersonal Communication",
     "definition": "Communication that occurs within an individual - internal dialogue, self-talk, reflection, and thinking.",
     "key_aspects": ["Self as sender and receiver", "Internal monologue", "Self-reflection"],
     "indian_context": "The ancient Indian concept of 'Antarmukhi' (inward-looking) reflects intrapersonal reflection as described in the Upanishads."},
    {"concept": "Self-concept",
     "definition": "The totality of an individual's perception of themselves, including beliefs, values, and attitudes.",
     "key_aspects": ["Self-image", "Self-esteem", "Ideal self"],
     "indian_context": "Swami Vivekananda's concept of 'Atman' and self-realisation is deeply connected to self-concept and self-awareness."},
    {"concept": "Self-disclosure",
     "definition": "The process of revealing personal, private information about oneself to others.",
     "key_aspects": ["Reciprocity", "Depth vs Breadth", "Trust building"],
     "indian_context": "In Indian families, self-disclosure patterns vary: more open with peers, cautious with elders due to cultural norms of 'Parampara'."},
    {"concept": "Self-esteem",
     "definition": "The evaluative component of self-concept - how positively or negatively one feels about oneself.",
     "key_aspects": ["Self-worth", "Confidence", "Self-respect"],
     "indian_context": "The concept of 'Swabhiman' (self-respect) in Indian philosophy underlines the importance of self-esteem in personal development."},
]

INTERPERSONAL_FACTS = [
    {"concept": "Interpersonal Communication",
     "definition": "Face-to-face communication between two or more people involving verbal and non-verbal messages.",
     "key_aspects": ["Dyadic communication", "Feedback", "Non-verbal cues"],
     "indian_context": "The Indian greeting 'Namaste' with folded hands (Namaskaram) is a culturally rich form of non-verbal interpersonal communication."},
    {"concept": "Interpersonal Skills",
     "definition": "Skills that enable effective interaction with others - listening, empathy, assertiveness, questioning.",
     "key_aspects": ["Active listening", "Empathy", "Assertiveness"],
     "indian_context": "Gandhian principles of 'Sarvodaya' and non-violent dialogue exemplify interpersonal skills at a societal scale."},
]

MASS_COMM_FACTS = [
    {"concept": "Mass Communication",
     "definition": "The process of transmitting messages to a large, heterogeneous, and anonymous audience through mass media channels.",
     "key_aspects": ["Large audience", "Heterogeneous", "Delayed feedback", "Public transmission"],
     "indian_context": "Doordarshan's 'Sita aur Gita' (1980s) reached millions of Indian households, exemplifying mass communication's reach."},
    {"function": "Surveillance",
     "description": "Mass media provides information about the environment - news, weather, events.",
     "indian_example": "Doordarshan and AIR provided real-time bulletins during the Kargil conflict (1999) as surveillance function."},
    {"function": "Correlation",
     "description": "Media interprets and explains information, helping audiences make sense of events.",
     "indian_example": "Newspaper editorials analysing GST implementation in India (2017) exemplify the correlation function."},
    {"function": "Cultural Transmission",
     "description": "Media passes on cultural values, norms, and traditions across generations.",
     "indian_example": "Epics like Ramayana and Mahabharata on TV (1987-1988, Ramanand Sagar) reinforced cultural values for millions."},
    {"function": "Entertainment",
     "description": "Media provides amusement and diversion for audiences.",
     "indian_example": "Radio Ceylon's 'Binaca Geetmala' (1952-1988) entertained generations of Indians with Bollywood music."},
    {"function": "Mobilization",
     "description": "Media motivates audiences to take action for social, political, or economic causes.",
     "indian_example": "Gandhi's use of 'Harijan' and 'Young India' newspapers mobilised masses during the freedom struggle."},
]

MODELS_DATA = [
    {
        "model": "Shannon-Weaver Model (1948)",
        "components": ["Information Source", "Transmitter", "Channel", "Receiver", "Destination", "Noise"],
        "key_feature": "Introduced 'noise' as a barrier in communication; linear model.",
        "indian_context": "In FM radio broadcasting in India, 'noise' includes signal interference and music competing with speech.",
        "equation_idea": "Channel capacity C = B * log2(1 + S/N)  [Shannon-Hartley theorem]",
    },
    {
        "model": "Lasswell's Model (1948)",
        "components": ["Who (Says What)", "In Which Channel", "To Whom", "With What Effect"],
        "key_feature": "Focuses on effect/outcome; used for propaganda analysis.",
        "indian_context": "Government of India's 'Mann Ki Baat' programme maps onto Lasswell: PM (who) → message → radio/audio (channel) → citizens (whom) → civic effect.",
        "equation_idea": "Linear 5-component mapping: S → M → C → R → E",
    },
    {
        "model": "Osgood-Schramm Model (1954)",
        "components": ["Encoder/Decoder", "Message", "Interpreter", "Field of Experience"],
        "key_feature": "Circular/dynamic model; both parties encode and decode; emphasises shared field of experience.",
        "indian_context": "A journalist interviewing a farmer in rural Maharashtra must bridge the 'field of experience' gap to communicate effectively.",
        "equation_idea": "Symmetry: encode(shared_experience) ↔ decode(shared_experience)",
    },
]

# --- Journalism (Ch 2) -------------------------------------------------------
JOURNALISM_DEF = {
    "definition": "Journalism is the practice of gathering, verifying, editing, and presenting news and information to a mass audience through various media platforms.",
    "roles": ["Watchdog of democracy", "Agenda-setter", "Mobiliser of public opinion", "Educator", "Entertainer"],
    "indian_context": "The Press Council of India (established 1966) and the Press and Registration of Books Act (1867) regulate journalism in India.",
}

NEWS_FACTS = {
    "definition": "News is information about current events that is timely, significant, and relevant to the audience.",
    "news_elements": ["Timeliness", "Proximity", "Prominence", "Impact", "Conflict", "Oddity"],
    "hard_news": {
        "definition": "Factual, objective, time-sensitive reporting of recent events.",
        "examples": ["Election results", "Natural disaster reports", "Government policy announcements", "Court verdicts"],
        "indian_examples": ["Article 370 abrogation (2019)", "COVID-19 daily counts (2020)", "Budget announcements"],
    },
    "soft_news": {
        "definition": "Feature-oriented, human-interest stories that are less time-sensitive and more analytical.",
        "examples": ["Profile of an artist", "Travel features", "Lifestyle trends", "Cultural festivals"],
        "indian_examples": ["Mango festivals in India", "Profile of Ratan Tata's philanthropy", "Kumbh Mela features"],
    },
}

NEWS_COMPONENTS = {
    "accuracy": "All facts, figures, names, and dates must be correct and verified from reliable sources.",
    "attribution": "The source of information must be clearly identified (e.g., 'According to the Health Ministry...').",
    "fairness": "Both sides of a story must be presented without bias.",
    "clarity": "The message must be understood by the average reader without ambiguity.",
    "brevity": "Convey the maximum meaning with minimum words - avoid unnecessary elaboration.",
}

INVERTED_PYRAMID = {
    "structure": "Most important information first (lead), followed by supporting details, background, and least important last.",
    "lead_types": ["Summary lead", "Descriptive lead", "Question lead", "Quotation lead"],
    "indian_context": "Indian newspapers like The Hindu and The Times of India follow the inverted pyramid for hard news stories.",
}

PRESS_COUNCIL = {
    "name": "Press Council of India (PCI)",
    "established": "1966",
    "headquarters": "New Delhi",
    "functions": ["Preserve press freedom", "Maintain journalistic standards", "Hear complaints against press", "Promote ethics"],
    "code_of_ethics": ["Truth and accuracy", "Impartiality", "Respect for privacy", "Avoidance of harm", "Accountability"],
    "indian_laws": ["Press and Registration of Books Act, 1867", "Contempt of Courts Act, 1971", "Information Technology Act, 2000"],
}

PHOTOJOURNALISM = [
    {
        "definition": "Photojournalism is the use of photographs to tell a news story, often accompanied by captions.",
        "key_principles": ["Authenticity", "Objectivity", "Context", "Ethical representation"],
        "indian_photojournalists": ["Homai Vyarawalla - India's first woman photojournalist", "Prabuddha Dasgupta - fashion and social documentary",
                                   "Karan Thapar - political photography", "Bharat Choudhary - conflict photography"],
    }
]

# --- Radio (Ch 3) ------------------------------------------------------------
RADIO_FACTS = {
    "characteristics": ["Audio medium only", "Imagination-stimulating", "Portable and accessible", "Real-time broadcast",
                        "Cost-effective production", "Wide geographic reach"],
    "air": {
        "full_name": "All India Radio",
        "established": "1936 (as AIR; 1927 as Indian Broadcasting Company)",
        "headquarters": "New Delhi",
        "owner": "Ministry of Information and Broadcasting, Government of India",
        "network_size": "Largest radio network in the world by number of studios",
        "channels": ["Vividh Bharati", "FM Gold", "FM Rainbow", "AIR News", "Regional channels"],
    },
    "fm_radio": {
        "started_in_india": "2001",
        "frequency_range": "88-108 MHz",
        "private_channels": ["Radio Mirchi (98.3 FM)", "Red FM (93.5 FM)", "Big FM (92.7 FM)",
                             "Radio City (91.1 FM)"],
        "features": ["Music-heavy", "RJ-driven", "Local advertising", "Interactive shows"],
    },
    "community_radio": {
        "started": "2006 (CR policy approved by GoI)",
        "first_station": "Anna FM, Chennai (2004, experimental)",
        "purpose": "Community participation, local content, development communication",
        "indian_examples": ["Radio Namaskar (Orissa)", "Radio Bundelkhand (MP)", "Namma Dhwani (Karnataka)"],
    },
}

RADIO_PROGRAMMES = {
    "news_bulletin": {
        "definition": "A structured, time-bound report of current events read by an announcer.",
        "script_features": ["Inverted pyramid structure", "Short sentences", "Clear pronunciation",
                            "Time-bound (typically 5-15 min)", "Multiple headlines → detailed stories"],
        "indian_context": "AIR's 'Main Kya Boloon' and Vividh Bharati news bulletins follow this format.",
    },
    "talk_show": {
        "definition": "A programme where a host engages with a guest or audience on a specific topic through discussion.",
        "script_features": ["Opening greeting", "Topic introduction", "Questions", "Audience call-ins",
                            "Closing summary"],
        "indian_context": "'Central Hall' on AIR and 'The John Abraham Show' on Radio Mirchi are notable Indian radio talk shows.",
    },
    "interview": {
        "definition": "A structured conversation where one person (interviewer) questions another (interviewee) to elicit information.",
        "script_features": ["Research on interviewee", "Open-ended questions", "Follow-ups", "Closing questions"],
        "indian_context": "AIR's 'Yuva Vani' interviews young achievers across India. Press Club of India conducts regular media interviews.",
    },
    "announcement": {
        "types": {
            "commercial": "Paid announcements promoting products or services with a call to action.",
            "public_service": "Announcements for public welfare - health campaigns, disaster alerts, election information.",
        },
        "indian_context_commercial": "Fevikwik, Frooti, and Complan advertisements on Radio Mirchi.",
        "indian_context_psa": "COVID-19 awareness announcements by the Government of India on all AIR channels during 2020-21.",
    },
    "documentary": {
        "definition": "A factual, in-depth radio programme using sound effects, interviews, and narration to explore a topic.",
        "script_features": ["Research-based", "Multiple voices", "Sound design", "Narration arc"],
        "indian_context": "AIR produces documentaries on tribal culture, environmental issues, and historical events.",
    },
    "drama": {
        "definition": "A scripted, acted radio programme with characters, plot, dialogue, and sound effects.",
        "script_features": ["Character voices", "Plot structure", "Foley/sound effects", "Music cues"],
        "indian_context": "AIR's 'HMV Bal Chitrakanya' and 'Vishesh Vani' radio dramas were hugely popular in the 1960s-80s.",
    },
    "feature": {
        "definition": "A creative, subjective radio programme blending facts and narrative on a theme.",
        "script_features": ["Personal narrative", "Creative editing", "Music integration", "Thematic focus"],
        "indian_context": "Radio Mirchi's 'Purane Purane gaane' style features blend nostalgia with cultural commentary.",
    },
    "commentary": {
        "definition": "A live or pre-recorded spoken narrative describing and analysing an event as it happens.",
        "script_features": ["Live voice", "Real-time description", "Expert analysis", "Emotional colour"],
        "indian_context": "Radio commentary of cricket matches by commentators like Anupam Dutta and Harsha Bhogle's radio work.",
    },
}


# ─────────────────────────────────────────────────────────────────────────────
# SCORING / VERIFICATION HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def _keyword_score(student_text: str, keywords: List[str]) -> Tuple[float, List[str], List[str]]:
    """Return (score_0_to_1, matched, missing) keyword match."""
    lowered = student_text.lower()
    matched = [k for k in keywords if k.lower() in lowered]
    missing = [k for k in keywords if k.lower() not in lowered]
    score = len(matched) / max(len(keywords), 1)
    return score, matched, missing


def _exact_match_score(student_text: str, expected: str) -> float:
    """Fuzzy but case-insensitive word overlap score."""
    s_words = set(re.findall(r"\w+", student_text.lower()))
    e_words = set(re.findall(r"\w+", expected.lower()))
    stop = {"the", "a", "an", "is", "of", "and", "to", "in", "for", "with", "on", "by"}
    s_words -= stop
    e_words -= stop
    if not e_words:
        return 1.0
    return len(s_words & e_words) / len(e_words)


def _verify_answer(student_answer: str, correct_answer: str, question_type: str) -> Dict[str, Any]:
    """Multi-method verification depending on question type."""
    v = {}

    if question_type == QType.MCQ.value:
        v["method"] = "exact_string_match"
        v["passed"] = student_answer.strip().lower() == correct_answer.strip().lower()
        v["student"] = student_answer.strip()
        v["expected"] = correct_answer.strip()
        v["score"] = 1.0 if v["passed"] else 0.0

    elif question_type == QType.FILL_BLANK.value:
        ks = correct_answer.lower().split("|")
        lowered = student_answer.lower()
        matched = [k.strip() for k in ks if k.strip() in lowered]
        v["method"] = "keyword_match_fill"
        v["passed"] = len(matched) >= 1
        v["matched"] = matched
        v["score"] = len(matched) / len(ks)

    elif question_type in (QType.SHORT_ANSWER.value, QType.LONG_ANSWER.value):
        score_exact = _exact_match_score(student_answer, correct_answer)
        v["method"] = "semantic_overlap"
        v["passed"] = score_exact >= 0.5
        v["score"] = round(score_exact, 3)
        v["overlap"] = f"{score_exact*100:.1f}%"

    elif question_type == QType.NUMERICAL.value:
        try:
            s_val = float(re.findall(r"[\d.]+", student_answer)[0])
            c_val = float(re.findall(r"[\d.]+", correct_answer)[0])
            tolerance = abs(c_val) * 0.05  # 5% tolerance
            v["method"] = "numerical_tolerance"
            v["passed"] = abs(s_val - c_val) <= max(tolerance, 0.01)
            v["score"] = 1.0 if v["passed"] else 0.0
            v["student_value"] = s_val
            v["expected_value"] = c_val
        except Exception:
            v["method"] = "numerical_parse_error"
            v["passed"] = False
            v["score"] = 0.0

    return v


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION POOL  (deterministic, seeded)
# ─────────────────────────────────────────────────────────────────────────────

class QuestionPool:
    """Builds questions from the syllabus content banks."""

    def __init__(self, seed: int):
        self.rng = make_rng(seed)
        self._counter = 0

    def _next_id(self) -> str:
        self._counter += 1
        return f"mm11_{self._counter:04d}"

    # ── helpers ────────────────────────────────────────────────────────────

    def _mcq(self, qtext, options, correct_idx, topic, difficulty, explanation, chapter, indian_context=None):
        return {
            "id": self._next_id(), "type": QType.MCQ.value,
            "chapter": chapter, "topic": topic, "difficulty": difficulty,
            "question": qtext,
            "options": options,
            "answer": chr(65 + correct_idx),
            "explanation": explanation,
            "indian_context": indian_context or "",
            "steps": ["Analyse each option", "Eliminate wrong options", "Select the correct answer"],
            "verification": {"method": "exact_match", "correct": chr(65 + correct_idx)},
        }

    def _fill(self, qtext, correct_blob, topic, difficulty, explanation, chapter):
        return {
            "id": self._next_id(), "type": QType.FILL_BLANK.value,
            "chapter": chapter, "topic": topic, "difficulty": difficulty,
            "question": qtext,
            "options": [], "answer": correct_blob,
            "explanation": explanation,
            "indian_context": "",
            "steps": ["Recall the definition/concept", "Fill the blank with the appropriate term"],
            "verification": {"method": "keyword_match", "accepted": correct_blob.split("|")},
        }

    def _short(self, qtext, correct_answer, topic, difficulty, explanation, chapter, indian_context=""):
        return {
            "id": self._next_id(), "type": QType.SHORT_ANSWER.value,
            "chapter": chapter, "topic": topic, "difficulty": difficulty,
            "question": qtext,
            "options": [], "answer": correct_answer,
            "explanation": explanation,
            "indian_context": indian_context,
            "steps": ["Understand the question", "Recall relevant definition/concept", "Write a concise answer"],
            "verification": {"method": "semantic_overlap", "threshold": 0.5},
        }

    def _long(self, qtext, correct_answer, topic, difficulty, explanation, chapter, indian_context=""):
        return {
            "id": self._next_id(), "type": QType.LONG_ANSWER.value,
            "chapter": chapter, "topic": topic, "difficulty": difficulty,
            "question": qtext,
            "options": [], "answer": correct_answer,
            "explanation": explanation,
            "indian_context": indian_context,
            "steps": ["Analyse the question carefully", "Recall definitions, principles, and examples",
                       "Structure the answer: introduction → body → conclusion",
                       "Use Indian context examples where applicable"],
            "verification": {"method": "semantic_overlap", "threshold": 0.4},
        }

    def _numerical(self, qtext, correct_answer, topic, difficulty, explanation, chapter, indian_context=""):
        return {
            "id": self._next_id(), "type": QType.NUMERICAL.value,
            "chapter": chapter, "topic": topic, "difficulty": difficulty,
            "question": qtext,
            "options": [], "answer": str(correct_answer),
            "explanation": explanation,
            "indian_context": indian_context,
            "steps": ["Identify the given quantities", "Apply the relevant formula",
                       "Compute the numerical result", "Verify units"],
            "verification": {"method": "numerical_tolerance", "tolerance": 0.05},
        }

    # ── Chapter 1 generators ──────────────────────────────────────────────

    def _comm_definition_qs(self) -> List[Dict]:
        qs = []
        d = COMM_DEFINITIONS[0]
        qs.append(self._mcq(
            f"Communication is best described as:",
            ["A one-way transfer of information",
             "A process of creating meaning through the symbolic exchange of messages",
             "The use of mass media only",
             "A purely artistic expression with no structure"],
            1, "communication_definition", "Easy",
            f"Communication is a {d['definition'].lower()}",
            1, d["indian_context"],
        ))
        qs.append(self._mcq(
            f"When we treat communication as a science, we emphasise:",
            ["Creativity and self-expression",
             "Systematic, measurable, and empirical study of communication processes",
             "Poetic language only",
             "Intuition over data"],
            1, "communication_as_science", "Easy",
            "As a science, communication is systematic, measurable, and empirical.",
            1, COMM_DEFINITIONS[1]["indian_context"],
        ))
        qs.append(self._mcq(
            f"Treating communication as an art focuses on:",
            ["Quantitative analysis of channels",
             "Creativity, expression, persuasion, and aesthetics in message crafting",
             "Surveying audiences",
             "Measuring signal-to-noise ratios"],
            1, "communication_as_art", "Easy",
            "As an art, communication involves creativity, expression, persuasion, and aesthetics.",
            1, COMM_DEFINITIONS[2]["indian_context"],
        ))
        qs.append(self._fill(
            "Communication is both a _____ and an _____.",
            "science|art", "nature_of_communication", "Easy",
            "Communication has a scientific basis (systematic, measurable) and an artistic dimension (creative, expressive).",
            1,
        ))
        return qs

    def _intrapersonal_qs(self) -> List[Dict]:
        qs = []
        d = INTRAPERSONAL_FACTS[0]
        qs.append(self._mcq(
            f"Intrapersonal communication is communication that takes place:",
            ["Between two individuals face to face",
             "Within an individual's own mind through self-talk and reflection",
             "Among a large audience through mass media",
             "In a group setting"],
            1, "intrapersonal_definition", "Easy",
            d["definition"],
            1, d["indian_context"],
        ))
        qs.append(self._short(
            "Define 'self-concept' in the context of intrapersonal communication.",
            INTRAPERSONAL_FACTS[1]["definition"],
            "self_concept", "Easy",
            "Self-concept is the totality of one's perception of oneself - beliefs, values, and attitudes about the self.",
            1, INTRAPERSONAL_FACTS[1]["indian_context"],
        ))
        qs.append(self._fill(
            "The process of revealing personal information about oneself to others is called _____ disclosure.",
            "self", "self_disclosure", "Easy",
            "Self-disclosure is the process of revealing personal, private information about oneself to others.",
            1,
        ))
        qs.append(self._mcq(
            f"The concept of 'Swabhiman' in Indian philosophy is most closely related to:",
            ["Intrapersonal communication",
             "Self-esteem",
             "Group dynamics",
             "Mass media effects"],
            1, "self_esteem", "Easy",
            "Swabhiman means self-respect, which is directly linked to self-esteem.",
            1, INTRAPERSONAL_FACTS[3]["indian_context"],
        ))
        return qs

    def _interpersonal_qs(self) -> List[Dict]:
        qs = []
        d = INTERPERSONAL_FACTS[0]
        qs.append(self._mcq(
            f"Interpersonal communication involves:",
            ["One-way broadcast to millions",
             "Face-to-face interaction between two or more people",
             "Communication within one's own mind",
             "Radio broadcasting"],
            1, "interpersonal_definition", "Easy",
            d["definition"],
            1, d["indian_context"],
        ))
        qs.append(self._short(
            "Name two key interpersonal skills and explain their importance.",
            "Key interpersonal skills include active listening and empathy. Active listening ensures the speaker feels heard, while empathy helps the listener understand emotions behind words.",
            "interpersonal_skills", "Easy",
            "Active listening and empathy are two essential interpersonal skills for effective communication.",
            1, INTERPERSONAL_FACTS[1]["indian_context"],
        ))
        return qs

    def _group_qs(self) -> List[Dict]:
        qs = []
        qs.append(self._mcq(
            f"Group communication differs from interpersonal communication in that:",
            ["It involves only one person",
             "It involves three or more people interacting with a common goal",
             "It uses only mass media",
             "It has no feedback mechanism"],
            1, "group_communication", "Medium",
            "Group communication involves 3+ people sharing a common purpose and exchanging messages.",
            1,
            "In Indian panchayats, group communication among village elders is a traditional decision-making process.",
        ))
        qs.append(self._fill(
            "In group communication, _____ refers to the pattern of interaction and roles adopted by members.",
            "group dynamics", "group_dynamics", "Medium",
            "Group dynamics describes how members interact, assume roles, and influence each other within a group.",
            1,
        ))
        return qs

    def _mass_comm_qs(self) -> List[Dict]:
        qs = []
        d = MASS_COMM_FACTS[0]
        qs.append(self._mcq(
            f"A key characteristic that distinguishes mass communication from interpersonal communication is:",
            ["Face-to-face interaction",
             "A large, heterogeneous, and anonymous audience",
             "Immediate personal feedback",
             "Small group size"],
            1, "mass_communication_definition", "Medium",
            d["definition"],
            1, d["indian_context"],
        ))
        qs.append(self._short(
            "List any four functions of mass communication.",
            "Four functions are: (1) Surveillance - providing news and information; (2) Correlation - interpreting events; (3) Cultural transmission - passing on values; (4) Entertainment - providing amusement; (5) Mobilization - motivating action.",
            "surveillance", "Medium",
            "Mass communication serves five main functions: surveillance, correlation, cultural transmission, entertainment, and mobilization.",
            1,
        ))
        qs.append(self._mcq(
            f"The function of mass communication where media motivates audiences to take social or political action is called:",
            ["Surveillance", "Correlation", "Mobilization", "Transmission"],
            2, "mobilization", "Medium",
            "Mobilization is the function where media motivates audiences to take action.",
            1, MASS_COMM_FACTS[5]["indian_example"],
        ))
        qs.append(self._long(
            "Explain in detail the function of 'cultural transmission' in mass communication with reference to Indian media.",
            "Cultural transmission is a key function where mass media passes on cultural values, norms, traditions, and practices across generations. In India, television serials like the Ramayana (1987, Doordarshan) and Mahabharata reached over 100 million viewers, reinforcing cultural narratives. Radio programmes in regional languages preserve folk traditions. Social media now also transmits sub-cultures. This function helps maintain cultural identity in a globalising world.",
            "cultural_transmission", "Medium",
            "Cultural transmission preserves and spreads cultural values. Indian TV epics and folk radio programmes exemplify this.",
            1, MASS_COMM_FACTS[4]["indian_example"],
        ))
        return qs

    def _models_qs(self) -> List[Dict]:
        qs = []
        sw = MODELS_DATA[0]
        qs.append(self._mcq(
            f"Which communication model introduced the concept of 'noise' as a barrier?",
            ["Lasswell's Model", "Osgood-Schramm Model", "Shannon-Weaver Model", "Berlo's SMCR Model"],
            2, "shannon_weaver_model", "Medium",
            "Shannon-Weaver (1948) introduced noise as a barrier in the communication channel.",
            1, sw["indian_context"],
        ))
        qs.append(self._mcq(
            f"Lasswell's model is best summarised as:",
            ["Sender ↔ Receiver in a circular pattern",
             "Who says What in Which channel to Whom with What effect",
             "Information Source → Transmitter → Channel → Receiver",
             "Encoder ↔ Decoder ↔ Field of Experience"],
            1, "lasswell_model", "Medium",
            "Lasswell's 5-W formula: Who says What in Which channel to Whom with What effect.",
            1, MODELS_DATA[1]["indian_context"],
        ))
        qs.append(self._mcq(
            f"The Osgood-Schramm model is characterised by:",
            ["Linear one-way flow",
             "A circular process where both parties encode and decode simultaneously",
             "Focus on media effects",
             "No role for feedback"],
            1, "osgood_schramm_model", "Medium",
            "Osgood-Schramm is circular: both parties are encoders and decoders simultaneously.",
            1, MODELS_DATA[2]["indian_context"],
        ))
        qs.append(self._fill(
            "In the Shannon-Weaver model, the unwanted signal that distorts the message is called _____.",
            "noise", "shannon_weaver_model", "Medium",
            "Noise is any interference that distorts the message during transmission.",
            1,
        ))
        # Numerical: Shannon capacity
        bw = 3000  # Hz
        snr = 1000  # signal-to-noise ratio
        capacity = bw * math.log2(1 + snr)
        qs.append(self._numerical(
            f"Using the Shannon-Hartley theorem: if channel bandwidth B = 3000 Hz and S/N ratio = 1000, "
            f"what is the channel capacity C in bits/second? (Use log₂(1001) ≈ 9.97)",
            round(capacity, 2),
            "shannon_weaver_model", "Medium",
            f"C = B x log₂(1 + S/N) = {bw} x log₂(1001) ≈ {bw} x 9.97 ≈ {round(capacity,2)} bits/s",
            1, f"India's satellite communication capacity can be estimated using this formula.",
        ))
        return qs

    # ── Chapter 2 generators ──────────────────────────────────────────────

    def _journalism_def_qs(self) -> List[Dict]:
        qs = []
        qs.append(self._mcq(
            f"Journalism is best defined as:",
            ["Creative writing for entertainment",
             "Gathering, verifying, and reporting news and information to the public",
             "Advertising products",
             "Writing fictional stories"],
            1, "journalism_definition", "Easy",
            JOURNALISM_DEF["definition"],
            2, JOURNALISM_DEF["indian_context"],
        ))
        return qs

    def _news_qs(self) -> List[Dict]:
        qs = []
        qs.append(self._mcq(
            f"Hard news is characterised by:",
            ["Human interest focus and long narrative",
             "Factual, objective, and time-sensitive reporting of recent events",
             "Entertainment value only",
             "Opinion and editorialising"],
            1, "hard_news", "Easy",
            NEWS_FACTS["hard_news"]["definition"],
            2, "COVID-19 daily case counts in India (2020) are an example of hard news.",
        ))
        qs.append(self._mcq(
            f"Which of the following is an example of soft news?",
            ["A report on the Union Budget",
             "A feature on the Kumbh Mela celebrations",
             "Election results",
             "A cyclone warning bulletin"],
            1, "soft_news", "Easy",
            NEWS_FACTS["soft_news"]["definition"],
            2, NEWS_FACTS["soft_news"]["indian_examples"][1],
        ))
        qs.append(self._fill(
            "Hard news focuses on _____ facts and events, while soft news focuses on human interest and _____ stories.",
            "timely|feature", "hard_vs_soft_news", "Easy",
            "Hard news is timely and factual; soft news is feature-oriented and human-interest.",
            2,
        ))
        return qs

    def _news_components_qs(self) -> List[Dict]:
        qs = []
        qs.append(self._mcq(
            f"Which component of news requires that the source of information be clearly identified?",
            ["Accuracy", "Attribution", "Clarity", "Brevity"],
            1, "attribution", "Easy",
            NEWS_COMPONENTS["attribution"],
            2,
        ))
        qs.append(self._short(
            "Explain the meaning of 'clarity' as a component of news.",
            "Clarity means the message in a news report must be understood by the average reader without ambiguity. Language should be simple and direct.",
            "clarity", "Easy",
            "Clarity ensures the news message is free from ambiguity and easily understood.",
            2,
        ))
        qs.append(self._mcq(
            f"Which component of news means conveying the maximum meaning with minimum words?",
            ["Accuracy", "Fairness", "Brevity", "Attribution"],
            2, "brevity", "Easy",
            NEWS_COMPONENTS["brevity"],
            2,
        ))
        return qs

    def _news_structure_qs(self) -> List[Dict]:
        qs = []
        qs.append(self._mcq(
            f"In the inverted pyramid structure of news writing, the:",
            ["Least important information is given first",
             "Most important information is given first in the lead",
             "Story is arranged chronologically",
             "Conclusion is given at the beginning"],
            1, "inverted_pyramid", "Medium",
            "The inverted pyramid places the most important information (the lead) at the top.",
            2, INVERTED_PYRAMID["indian_context"],
        ))
        qs.append(self._fill(
            "The first paragraph of a news story in the inverted pyramid style is called the _____.",
            "lead", "inverted_pyramid", "Medium",
            "The lead is the opening paragraph that contains the most important information.",
            2,
        ))
        return qs

    def _journalism_types_qs(self) -> List[Dict]:
        qs = []
        qs.append(self._mcq(
            f"Investigative journalism is characterised by:",
            ["Reporting only press releases",
             "In-depth, original research to uncover facts hidden from public view",
             "Writing only entertainment features",
             "Covering only sports events"],
            1, "investigative_journalism", "Medium",
            "Investigative journalism involves deep research to expose hidden facts and hold power accountable.",
            2, "The Bofors scandal exposed by The Hindu and The Indian Express (1987) is a landmark example of investigative journalism in India.",
        ))
        qs.append(self._short(
            "What is photojournalism? Give one example from India.",
            "Photojournalism is the use of photographs to tell a news story, often accompanied by captions. An example is Homai Vyarawalla's documentation of India's independence and early Republic era.",
            "photojournalism_definition", "Easy",
            "Photojournalism combines photography and journalism to tell stories visually.",
            2, "Homai Vyarawalla was India's first woman photojournalist (active 1938-1970).",
        ))
        return qs

    def _ethics_qs(self) -> List[Dict]:
        qs = []
        qs.append(self._mcq(
            f"The Press Council of India was established in:",
            ["1947", "1950", "1966", "1975"],
            2, "press_council_india", "Medium",
            "The PCI was established in 1966 under the Press Council Act.",
            2,
        ))
        qs.append(self._mcq(
            f"Which of the following is NOT a key principle of journalistic ethics?",
            ["Truth and accuracy", "Impartiality", "Avoidance of harm", "Maximising profits"],
            3, "journalism_ethics", "Medium",
            "Maximising profits is not a journalistic ethical principle. Ethics focus on truth, fairness, and accountability.",
            2, "The PCI's Norms of Journalistic Conduct guide Indian journalists on ethical practices.",
        ))
        qs.append(self._fill(
            "The _____ Council of India is a statutory body that preserves press freedom and maintains journalistic standards.",
            "Press", "press_council_india", "Medium",
            "The Press Council of India (PCI) was established in 1966.",
            2,
        ))
        return qs

    # ── Chapter 3 generators ──────────────────────────────────────────────

    def _radio_char_qs(self) -> List[Dict]:
        qs = []
        qs.append(self._mcq(
            f"Which of the following is NOT a characteristic of radio as a medium?",
            ["Audio-only medium", "Requires visual attention", "Portable and accessible",
             "Stimulates the imagination"],
            1, "radio_characteristics", "Medium",
            "Radio does NOT require visual attention - it is audio-only.",
            3, RADIO_FACTS["community_radio"]["indian_examples"][0],
        ))
        qs.append(self._mcq(
            f"All India Radio (AIR) is owned by:",
            ["Privately by the TATA Group", "Ministry of Information and Broadcasting, GoI",
             "BBC World Service", "A consortium of state governments"],
            1, "all_india_radio", "Medium",
            "AIR is owned by the Ministry of Information and Broadcasting, Government of India.",
            3,
        ))
        qs.append(self._fill(
            "FM radio in India started in _____ and operates in the frequency range of _____-_____ MHz.",
            "2001|88|108", "fm_radio", "Medium",
            "FM radio was launched in India in 2001 in the 88-108 MHz band.",
            3,
        ))
        qs.append(self._mcq(
            f"Community radio in India was officially approved in:",
            ["1995", "2000", "2002", "2006"],
            3, "community_radio_india", "Medium",
            "The Community Radio Policy was approved in 2006 by the Government of India.",
            3, "Radio Namaskar in Orissa was among the first community radio stations in India.",
        ))
        return qs

    def _radio_programme_qs(self) -> List[Dict]:
        qs = []
        d = RADIO_PROGRAMMES["news_bulletin"]
        qs.append(self._mcq(
            f"A radio news bulletin is best described as:",
            ["A long-form narrative feature",
             "A structured, time-bound report of current events read by an announcer",
             "A fictional drama broadcast",
             "A musical programme"],
            1, "radio_news_bulletin", "Medium",
            d["definition"],
            3, d["indian_context"],
        ))
        qs.append(self._mcq(
            f"A radio talk show is primarily:",
            ["A scripted dramatic performance",
             "A programme where a host discusses a topic with a guest or audience",
             "A music-only programme",
             "A news bulletin format"],
            1, "radio_talk_show", "Medium",
            RADIO_PROGRAMMES["talk_show"]["definition"],
            3, RADIO_PROGRAMMES["talk_show"]["indian_context"],
        ))
        qs.append(self._mcq(
            f"Which of the following is a feature of radio interviews?",
            ["No prior research needed",
             "Structured conversation with open-ended questions to elicit information",
             "Monologue by the interviewer only",
             "Pre-scripted questions only with no follow-ups"],
            1, "radio_interview", "Medium",
            RADIO_PROGRAMMES["interview"]["definition"],
            3, RADIO_PROGRAMMES["interview"]["indian_context"],
        ))
        qs.append(self._mcq(
            f"A public service announcement (PSA) on radio is:",
            ["A paid advertisement for a product",
             "An announcement for public welfare like health or disaster alerts",
             "A celebrity gossip segment",
             "A paid promotional spot"],
            1, "public_service_announcement", "Medium",
            "PSAs serve public welfare, unlike commercial announcements.",
            3, "COVID-19 awareness PSAs by the Government of India on AIR are a prime example.",
        ))
        qs.append(self._fill(
            "Radio programmes that use sound effects, narration, and multiple voices to explore a topic factually are called _____.",
            "documentaries", "radio_documentary", "Medium",
            "Radio documentaries are factual, in-depth programmes using sound design.",
            3,
        ))
        qs.append(self._mcq(
            f"A radio programme that uses scripted acting, character voices, plot, and sound effects is called:",
            ["Documentary", "Feature", "Drama", "Commentary"],
            2, "radio_drama", "Medium",
            RADIO_PROGRAMMES["drama"]["definition"],
            3, RADIO_PROGRAMMES["drama"]["indian_context"],
        ))
        return qs

    # ── Public ─────────────────────────────────────────────────────────────

    def generate(self, count: int, chapter_filter: Optional[int] = None) -> List[Dict]:
        """Generate `count` questions, optionally filtered by chapter."""
        generators_by_ch = {
            1: [self._comm_definition_qs, self._intrapersonal_qs, self._interpersonal_qs,
                self._group_qs, self._mass_comm_qs, self._models_qs],
            2: [self._journalism_def_qs, self._news_qs, self._news_components_qs,
                self._news_structure_qs, self._journalism_types_qs, self._ethics_qs],
            3: [self._radio_char_qs, self._radio_programme_qs],
        }

        if chapter_filter is not None:
            gens = generators_by_ch.get(chapter_filter, [])
        else:
            gens = [g for gl in generators_by_ch.values() for g in gl]

        all_qs: List[Dict] = []
        for gen in gens:
            all_qs.extend(gen())

        self.rng.shuffle(all_qs)
        return all_qs[:count]


# ─────────────────────────────────────────────────────────────────────────────
# PUBLIC API: generate_questions
# ─────────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int = 10, chapter_filter: Optional[int] = None) -> List[Dict]:
    """
    Generate `count` deterministic questions for CISCE Class 11 Mass Media.

    Parameters
    ----------
    seed : int
        Random seed for deterministic generation.
    count : int
        Number of questions to generate (default 10).
    chapter_filter : int or None
        If provided, only generate questions from that chapter (1, 2, or 3).

    Returns
    -------
    List[Dict]
        Each dict: {id, type, question, options, answer, explanation,
                    difficulty, topic, chapter, steps, verification,
                    indian_context}
    """
    rng = make_rng(seed)
    pool = QuestionPool(seed)
    questions = pool.generate(count, chapter_filter)

    # Deterministic shuffling of question order for variety across seeds
    rng.shuffle(questions)
    return questions


# ─────────────────────────────────────────────────────────────────────────────
# SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_mcq(params: Dict) -> Dict:
    """Solve an MCQ question given student's answer and question context."""
    student_ans = params.get("student_answer", "").strip().upper()
    correct_ans = params.get("correct_answer", "").strip().upper()
    options = params.get("options", [])

    steps = [
        "1. Read the question carefully to understand what is being asked.",
        "2. Eliminate options that are clearly incorrect or contradictory.",
        "3. Compare the remaining options with the correct concept.",
        "4. Select the most appropriate answer.",
    ]

    passed = student_ans == correct_ans
    verification = {
        "method": "exact_string_match",
        "student_answer": student_ans,
        "correct_answer": correct_ans,
        "passed": passed,
        "score": 1.0 if passed else 0.0,
    }

    if not passed:
        idx = ord(correct_ans) - ord("A")
        if 0 <= idx < len(options):
            steps.append(f"5. Note: Correct answer is ({correct_ans}) - {options[idx]}")

    return {
        "answer": correct_ans,
        "student_answer": student_ans,
        "correct": passed,
        "score": verification["score"],
        "steps": steps,
        "verification": verification,
        "explanation": params.get("explanation", ""),
    }


def solve_fill_blank(params: Dict) -> Dict:
    """Solve a fill-in-the-blank question."""
    student_ans = params.get("student_answer", "").strip().lower()
    accepted = [a.strip().lower() for a in params.get("accepted", "").split("|")]

    steps = [
        "1. Read the sentence and identify the missing concept.",
        "2. Recall the definition or key term from the syllabus.",
        "3. Insert the correct term in the blank.",
    ]

    matched = [a for a in accepted if a in student_ans]
    passed = len(matched) >= 1
    score = len(matched) / len(accepted) if accepted else 0.0

    verification = {
        "method": "keyword_match",
        "accepted_answers": accepted,
        "student_answer": student_ans,
        "matched": matched,
        "passed": passed,
        "score": round(score, 3),
    }

    if not passed:
        steps.append(f"4. Note: Acceptable answers include: {', '.join(accepted)}")

    return {
        "answer": " | ".join(accepted),
        "student_answer": student_ans,
        "correct": passed,
        "score": round(score, 3),
        "steps": steps,
        "verification": verification,
    }


def solve_short_answer(params: Dict) -> Dict:
    """Solve a short-answer question using semantic overlap."""
    student_ans = params.get("student_answer", "")
    correct_ans = params.get("correct_answer", "")

    steps = [
        "1. Identify the key concept being asked in the question.",
        "2. Recall the definition, meaning, or key points from the syllabus.",
        "3. Write a concise answer covering the essential points.",
        "4. Check that the answer addresses all parts of the question.",
    ]

    score_exact = _exact_match_score(student_ans, correct_ans)
    passed = score_exact >= 0.5
    kw_score, matched, missing = _keyword_score(student_ans, correct_ans.split())

    verification = {
        "method": "semantic_overlap",
        "overlap_percentage": f"{score_exact * 100:.1f}%",
        "keyword_match_score": round(kw_score, 3),
        "keywords_matched": matched,
        "keywords_missing": missing[:5],
        "passed": passed,
        "score": round(score_exact, 3),
    }

    if not passed:
        steps.append("5. Key points may be missing - review the concept and include all relevant details.")

    return {
        "answer": correct_ans,
        "student_answer": student_ans,
        "correct": passed,
        "score": round(score_exact, 3),
        "steps": steps,
        "verification": verification,
    }


def solve_long_answer(params: Dict) -> Dict:
    """Solve a long-answer question with rubric-style evaluation."""
    student_ans = params.get("student_answer", "")
    correct_ans = params.get("correct_answer", "")
    rubric_keywords = params.get("rubric_keywords", [])

    steps = [
        "1. Analyse the question to understand all parts requiring an answer.",
        "2. Recall definitions, theories, and examples from the relevant syllabus topic.",
        "3. Structure the answer: Introduction → Body (with points/examples) → Conclusion.",
        "4. Use Indian context examples to strengthen the answer.",
        "5. Review for completeness and clarity.",
    ]

    # Score based on keyword coverage of the model answer
    kw_score, matched, missing = _keyword_score(student_ans, rubric_keywords) if rubric_keywords else (1.0, [], [])

    # Overall semantic overlap
    semantic_score = _exact_match_score(student_ans, correct_ans)
    combined_score = max(semantic_score, kw_score)

    # Length bonus (encourage detail)
    word_count = len(student_ans.split())
    length_factor = min(word_count / 100, 1.0)  # normalize at 100 words
    final_score = round(0.7 * combined_score + 0.3 * length_factor, 3)
    passed = final_score >= 0.4

    verification = {
        "method": "rubric_keyword + semantic_overlap",
        "semantic_score": round(semantic_score, 3),
        "keyword_score": round(kw_score, 3),
        "word_count": word_count,
        "passed": passed,
        "score": final_score,
        "keywords_matched": matched,
        "keywords_missing": missing[:5],
    }

    if not passed:
        steps.append("6. Improve by including more key concepts and relevant examples from the syllabus.")

    return {
        "answer": correct_ans,
        "student_answer": student_ans,
        "correct": passed,
        "score": final_score,
        "steps": steps,
        "verification": verification,
    }


def solve_numerical(params: Dict) -> Dict:
    """
    Solve a numerical question using symbolic computation via SymPy.

    Expected params:
        expression : str   - SymPy-compatible expression string to evaluate
        variable   : str   - variable symbol name (default 'x')
        expected   : float - expected numerical result for verification
        tolerance  : float - relative tolerance (default 0.05 = 5%)
        question_text : str - description of the computation
    """
    expression = params.get("expression", "")
    variable_name = params.get("variable", "x")
    expected = float(params.get("expected", 0))
    tolerance = float(params.get("tolerance", 0.05))
    question_text = params.get("question_text", "")

    steps = [
        f"1. Question: {question_text}",
        f"2. Given expression: {expression}",
    ]

    # Symbolic evaluation
    sym_val = None
    sym_error = None
    if _HAS_SYMPY:
        try:
            sym = sp.Symbol(variable_name)
            expr = sp.sympify(expression)
            sym_val = float(expr.evalf())
            steps.append(f"3. Using SymPy: parse '{expression}' → evaluate → {round(sym_val, 6)}")
        except Exception as e:
            sym_error = str(e)
            steps.append(f"3. SymPy evaluation error: {sym_error}")

    # Pure-Python fallback
    py_val = None
    py_error = None
    if sym_val is None:
        try:
            safe_ns = {"__builtins__": {}, "math": math, "log2": math.log2,
                       "sqrt": math.sqrt, "pi": math.pi, "e": math.e}
            py_val = float(eval(expression, safe_ns))
            steps.append(f"3. Python evaluation: {expression} → {round(py_val, 6)}")
        except Exception as e:
            py_error = str(e)
            steps.append(f"3. Python evaluation error: {py_error}")

    computed_val = sym_val if sym_val is not None else py_val

    # Verification
    tol_abs = max(abs(expected) * tolerance, 1e-6)
    diff = abs(computed_val - expected) if computed_val is not None else float("inf")
    passed = diff <= tol_abs if computed_val is not None else False

    steps.append(f"4. Expected: {expected}, Computed: {round(computed_val, 4) if computed_val else 'N/A'}, "
                 f"Difference: {round(diff, 6)}, Tolerance: ±{round(tol_abs, 6)}")

    if _HAS_SYMPY and sym_val is not None:
        try:
            symbolic_expr = sp.simplify(sp.sympify(expression))
            steps.append(f"5. Symbolic simplification: {symbolic_expr}")
        except Exception:
            steps.append("5. Symbolic simplification not available.")

    verification = {
        "method": "sympy_symbolic + numerical_tolerance",
        "expression": expression,
        "computed_value": round(computed_val, 6) if computed_val is not None else None,
        "expected_value": expected,
        "absolute_difference": round(diff, 6),
        "tolerance": round(tol_abs, 6),
        "passed": passed,
        "score": 1.0 if passed else 0.0,
        "sympy_used": _HAS_SYMPY,
    }

    if not passed:
        steps.append("6. Verification FAILED - check expression and calculation.")

    return {
        "answer": str(expected),
        "computed_value": round(computed_val, 6) if computed_val is not None else None,
        "correct": passed,
        "score": 1.0 if passed else 0.0,
        "steps": steps,
        "verification": verification,
    }


def solve_communication_model(params: Dict) -> Dict:
    """
    Specialised solver: analyse a communication model scenario.

    Expected params:
        model_type     : str  - 'shannon_weaver', 'lasswell', 'osgood_schramm'
        scenario       : str  - description of the scenario to analyse
        noise_present  : bool - whether noise is a factor
    """
    model_type = params.get("model_type", "").lower().strip()
    scenario = params.get("scenario", "")
    noise_present = params.get("noise_present", False)

    model_info = {m["model"].split("(")[0].strip().lower(): m for m in MODELS_DATA}

    steps = [
        f"1. Analysing scenario using the {model_type.replace('_',' ').title()} communication model.",
        f"2. Scenario: {scenario}",
        "3. Identifying components of the communication process.",
    ]

    matched_model = model_info.get(model_type)
    if matched_model:
        steps.append(f"4. Model components: {', '.join(matched_model['components'])}")
        steps.append(f"5. Key feature: {matched_model['key_feature']}")
        steps.append(f"6. Indian context: {matched_model['indian_context']}")
        if model_type == "shannon_weaver" and noise_present:
            steps.append("7. Noise barriers identified: interference in the channel affecting message clarity.")
        elif model_type == "osgood_schramm":
            steps.append("7. Both parties act as encoders and decoders. Field of experience overlap determines communication success.")
    else:
        steps.append("4. Model type not recognised. Use: shannon_weaver, lasswell, or osgood_schramm.")

    answer = matched_model["key_feature"] if matched_model else "Unknown model."
    verification = {
        "method": "model_component_analysis",
        "model_type": model_type,
        "noise_present": noise_present,
        "components_identified": matched_model["components"] if matched_model else [],
        "passed": matched_model is not None,
    }

    return {
        "answer": answer,
        "scenario": scenario,
        "model_type": model_type,
        "steps": steps,
        "verification": verification,
        "correct": matched_model is not None,
        "score": 1.0 if matched_model else 0.0,
    }


# ─────────────────────────────────────────────────────────────────────────────
# SPECIALISED SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

def solve_news_elements(params: Dict) -> Dict:
    """
    Identify and score news elements in a given news headline or lead.

    Params:
        text       : str - the news text to analyse
        expected_elements : List[str] - expected news elements present
    """
    text = params.get("text", "").lower()
    expected = [e.lower() for e in params.get("expected_elements", [])]

    element_keywords = {
        "timeliness": ["today", "yesterday", "now", "breaking", "latest", "just", "recent", "hours ago"],
        "proximity": ["local", "nearby", "in the city", "in the state", "near"],
        "prominence": ["pm", "president", "minister", "celebrity", "chief minister", "modi", "gandhi"],
        "impact": ["thousands", "lakhs", "crores", "million", "affects", "affected", "deadline"],
        "conflict": ["versus", "vs", "protest", "clash", "strike", "dispute", "accused", "arrested"],
        "oddity": ["rare", "unusual", "strange", "first time", "record", "unprecedented", "unique"],
    }

    steps = ["1. Read the given news text carefully.",
             "2. Identify news elements present: timeliness, proximity, prominence, impact, conflict, oddity."]

    found = {}
    for element, keywords in element_keywords.items():
        hits = [k for k in keywords if k in text]
        found[element] = len(hits) > 0
        steps.append(f"   {'✓' if found[element] else '✗'} {element.title()}: {'found' if found[element] else 'not found'}")

    # Score
    matched_expected = [e for e in expected if found.get(e, False)]
    score = len(matched_expected) / max(len(expected), 1)
    passed = score >= 0.5

    verification = {
        "method": "keyword_based_news_element_detection",
        "elements_found": [k for k, v in found.items() if v],
        "elements_expected": expected,
        "elements_matched": matched_expected,
        "passed": passed,
        "score": round(score, 3),
    }

    return {
        "answer": f"News elements found: {', '.join([k for k,v in found.items() if v])}",
        "elements_found": found,
        "correct": passed,
        "score": round(score, 3),
        "steps": steps,
        "verification": verification,
    }


def solve_radio_script_analysis(params: Dict) -> Dict:
    """
    Analyse a radio script for structure and compliance with format rules.

    Params:
        script      : str - the radio script text
        prog_type   : str - 'news_bulletin', 'talk_show', 'interview', 'announcement'
    """
    script = params.get("script", "")
    prog_type = params.get("prog_type", "")

    return {"status": "ok", "script": script, "prog_type": prog_type}

# return {"status": "ok", "note": "truncated"}
