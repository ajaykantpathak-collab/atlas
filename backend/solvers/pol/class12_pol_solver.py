"""
CISCE Class 12 Political Science Solver & Question Generator
Deterministic, seeded, step-by-step with verification.
Syllabus: ch1 (Govt forms), ch2 (Constitution), ch10 (Challenges to Indian Democracy)
"""

import random
import math
import hashlib
import re
from dataclasses import dataclass, field
from typing import Optional, Dict, List, Tuple, Any
from enum import Enum


# ──────────────────────────────────────────────────────────
#  DATA STRUCTURES
# ──────────────────────────────────────────────────────────

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
class SolveResult:
    answer: Any
    steps: List[str]
    verification: Dict[str, Any]
    confidence: float


@dataclass
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]]
    answer: Any
    explanation: str
    difficulty: str
    topic: str


# ──────────────────────────────────────────────────────────
#  SEED UTILITIES
# ──────────────────────────────────────────────────────────

def make_seed(seed: int) -> None:
    """Initialise the global RNG deterministically."""
    random.seed(seed)


def topic_hash(topic: str, salt: int = 0) -> int:
    """Deterministic integer from topic name + salt."""
    raw = f"{topic}:{salt}".encode()
    return int(hashlib.sha256(raw).hexdigest()[:12], 16)


def pick(options: List[Any], seed_offset: int) -> Any:
    """Deterministic choice from a list using the global RNG."""
    return random.choice(options)


# ──────────────────────────────────────────────────────────
#  TOPIC CONTENT KNOWLEDGE BASE
# ──────────────────────────────────────────────────────────

# Each topic maps to question templates and answer material.

TOPICS = {
    # ── Chapter 1 ──
    "totalitarian_authoritarian": {
        "title": "Totalitarian and Authoritarian States",
        "key_terms": [
            "totalitarianism", "authoritarianism", "ideology", "propaganda",
            "secret police", "single party", "dictator", "limited pluralism",
            "Hannah Arendt", "Friedrich", "Mussolini", "Hitler", "Stalin",
            "individual freedom", "mass mobilisation", "social control"
        ],
        "mcq_pool": [
            {
                "q": "Which of the following is a key feature of a Totalitarian State?",
                "options": [
                    "Limited political pluralism",
                    "A single all-embracing ideology enforced by the state",
                    "Freedom of the press",
                    "Independent judiciary",
                ],
                "answer": 1,
                "explanation": (
                    "A totalitarian state is characterised by a single, all-embracing ideology "
                    "(e.g., Nazism, Fascism, Stalinism) that the state seeks to impose on every "
                    "aspect of public and private life. Limited pluralism, press freedom and an "
                    "independent judiciary are features of democratic states, not totalitarian ones."
                ),
            },
            {
                "q": "Who distinguished between Totalitarian and Authoritarian regimes in 'The Totalitarian Enemy'?",
                "options": [
                    "Karl Marx",
                    "Hannah Arendt",
                    "Jawaharlal Nehru",
                    "Max Weber",
                ],
                "answer": 1,
                "explanation": (
                    "Hannah Arendt, in her seminal work 'The Origins of Totalitarianism' (1951), "
                    "provided a detailed distinction between totalitarian and authoritarian regimes, "
                    "emphasising the role of ideology and terror in totalitarianism."
                ),
            },
            {
                "q": "Which of the following is a feature of an Authoritarian (but NOT Totalitarian) State?",
                "options": [
                    "A total world-view ideology",
                    "Use of secret police and terror",
                    "Limited social and economic control",
                    "Mass mobilisation of the entire population",
                ],
                "answer": 2,
                "explanation": (
                    "Authoritarian states control political life but generally leave social and "
                    "economic life largely untouched. Totalitarian states seek to control every "
                    "sphere of life including culture, education, family, and the economy."
                ),
            },
            {
                "q": "Which historical figure is most associated with Totalitarianism?",
                "options": [
                    "Winston Churchill",
                    "Adolf Hitler",
                    "Franklin D. Roosevelt",
                    "Mahatma Gandhi",
                ],
                "answer": 1,
                "explanation": (
                    "Adolf Hitler's Nazi Germany is considered the classic example of a totalitarian "
                    "state, with a single party (Nazi Party), a comprehensive ideology (Aryan "
                    "supremacy), total control over society, and systematic use of terror."
                ),
            },
            {
                "q": "In a Totalitarian State, the media is used primarily for:",
                "options": [
                    "Criticising the government",
                    "Propaganda and mobilisation of public opinion",
                    "Investigative journalism",
                    "Promoting opposition parties",
                ],
                "answer": 1,
                "explanation": (
                    "In totalitarian states, the media is fully controlled by the state and used as "
                    "a tool of propaganda to indoctrinate citizens and mobilise mass support for the "
                    "regime's ideology and policies."
                ),
            },
            {
                "q": "The main difference between Totalitarian and Authoritarian States is:",
                "options": [
                    "Authoritarian states have a written constitution",
                    "Totalitarian states have a comprehensive ideology; Authoritarian states do not",
                    "Authoritarian states use elections",
                    "Totalitarian states allow political opposition",
                ],
                "answer": 1,
                "explanation": (
                    "The key distinction is the presence of an all-embracing ideology in totalitarian "
                    "states that seeks to transform every aspect of life, whereas authoritarian states "
                    "primarily seek political control and do not attempt to reshape society ideologically."
                ),
            },
            {
                "q": "Which of the following is NOT a feature of Authoritarianism?",
                "options": [
                    "Concentration of power in a single ruler or small group",
                    "Restriction of political freedoms",
                    "A detailed plan to reshape society ideologically",
                    "Limited political pluralism",
                ],
                "answer": 2,
                "explanation": (
                    "A detailed plan to reshape society ideologically is a feature of totalitarianism, "
                    "not authoritarianism. Authoritarian rulers are primarily interested in maintaining "
                    "political power rather than transforming society."
                ),
            },
            {
                "q": "Totalitarian regimes are characterised by:",
                "options": [
                    "Decentralised decision-making",
                    "Complete state control over all spheres of life",
                    "Respect for human rights",
                    "Multi-party elections",
                ],
                "answer": 1,
                "explanation": (
                    "Totalitarian regimes seek complete control over political, social, economic, and "
                    "cultural life. They do not tolerate decentralisation, human rights opposition, "
                    "or multi-party competition."
                ),
            },
        ],
        "fill_blank_pool": [
            {
                "q": "A Totalitarian State is characterised by a single all-embracing _____.",
                "answer": "ideology",
                "alternatives": ["ideology"],
                "explanation": "Totalitarian states operate on the basis of a single, comprehensive ideology that guides all state policy.",
            },
            {
                "q": "The distinction between Totalitarian and Authoritarian regimes was analysed by _____.",
                "answer": "Hannah Arendt",
                "alternatives": ["Arendt", "Hannah Arendt"],
                "explanation": "Hannah Arendt's 'The Origins of Totalitarianism' is the foundational text for understanding totalitarianism.",
            },
            {
                "q": "In a Totalitarian State, the _____ is used as a tool of propaganda.",
                "answer": "media",
                "alternatives": ["media", "press"],
                "explanation": "Totalitarian states fully control the media to indoctrinate citizens and mobilise support.",
            },
            {
                "q": "_____ States allow limited social and economic freedom unlike Totalitarian States.",
                "answer": "Authoritarian",
                "alternatives": ["Authoritarian", "authoritarian"],
                "explanation": "Authoritarian states primarily restrict political freedom but allow some social/economic autonomy.",
            },
            {
                "q": "Nazi Germany under Hitler and _____ Russia under Stalin are examples of Totalitarian States.",
                "answer": "Soviet",
                "alternatives": ["Soviet", "Soviet Union"],
                "explanation": "Stalin's Soviet Union is a classic example of a totalitarian state alongside Nazi Germany.",
            },
        ],
        "short_answer_pool": [
            {
                "q": "List any THREE features of a Totalitarian State.",
                "keywords": ["ideology", "single party", "propaganda", "terror", "secret police",
                             "mass mobilisation", "control"],
                "min_keywords": 2,
                "ideal": (
                    "Three features of a Totalitarian State are: (1) A single, all-embracing ideology; "
                    "(2) A single mass party led by a dictator; (3) A system of terror and secret police; "
                    "(4) Monopoly over all means of communication and propaganda; "
                    "(5) Monopoly over all weapons of armed combat."
                ),
                "max_words": 120,
            },
            {
                "q": "Explain ONE key difference between a Totalitarian State and an Authoritarian State.",
                "keywords": ["ideology", "comprehensive", "social control", "economic control",
                             "total", "limited", "sphere", "scope"],
                "min_keywords": 2,
                "ideal": (
                    "The key difference is that Totalitarian States have an all-embracing ideology and "
                    "seek to control every sphere of life (political, social, economic, cultural), "
                    "whereas Authoritarian States restrict themselves mainly to political control and "
                    "allow limited freedom in social and economic spheres."
                ),
                "max_words": 100,
            },
            {
                "q": "What is meant by 'propaganda' in the context of a Totalitarian State?",
                "keywords": ["propaganda", "information", "media", "influence", "public opinion",
                             "indoctrination"],
                "min_keywords": 2,
                "ideal": (
                    "Propaganda in a Totalitarian State refers to the systematic use of all media and "
                    "communication channels by the state to indoctrinate citizens, shape public opinion, "
                    "and mobilise mass support for the regime's ideology and policies."
                ),
                "max_words": 100,
            },
        ],
        "long_answer_pool": [
            {
                "q": (
                    "Distinguish between a Totalitarian State and an Authoritarian State. "
                    "Give suitable examples of each. (6 marks)"
                ),
                "keywords": ["totalitarian", "authoritarian", "ideology", "single party", "propaganda",
                             "secret police", "control", "Mussolini", "Hitler", "Franco", "Mobutu",
                             "Stalin", "social", "economic", "political", "sphere", "difference",
                             "similarity", "example"],
                "min_keywords": 5,
                "ideal": (
                    "Totalitarian and Authoritarian states are both non-democratic forms of government, "
                    "but they differ significantly in scope and method. "
                    "A Totalitarian State seeks to control every aspect of public and private life through "
                    "an all-embracing ideology (e.g., Nazism, Fascism, Stalinism). It uses a single mass "
                    "party, a dictator, propaganda, terror, and secret police to achieve total control. "
                    "Examples: Nazi Germany under Hitler, Soviet Union under Stalin. "
                    "An Authoritarian State concentrates power in a single ruler or a small group but does "
                    "not seek to control all spheres of life. It allows limited social and economic freedom. "
                    "Examples: Franco's Spain, Pinochet's Chile. "
                    "Key differences: (1) Totalitarian has comprehensive ideology; Authoritarian does not. "
                    "(2) Totalitarian controls all spheres; Authoritarian controls mainly political sphere. "
                    "(3) Totalitarian uses mass mobilisation; Authoritarian uses passive acceptance."
                ),
                "min_words": 120,
                "max_words": 350,
            },
            {
                "q": (
                    "Discuss the role of ideology in a Totalitarian State with reference to "
                    "Nazi Germany. (6 marks)"
                ),
                "keywords": ["ideology", "Nazi", "Aryan", "supremacy", "anti-Semitism", "propaganda",
                             "indoctrination", "control", "education", "youth", "Goebbels"],
                "min_keywords": 4,
                "ideal": (
                    "Ideology was the cornerstone of Nazi Germany's totalitarian system. The Nazi ideology "
                    "of Aryan supremacy, anti-Semitism, and Lebensraum (living space) was propagated through "
                    "every institution - schools, youth organisations, churches, and media. Joseph Goebbels' "
                    "Ministry of Public Enlightenment and Propaganda controlled all information. Education "
                    "was reoriented to inculcate Nazi values, and the Hitler Youth movement indoctrinated "
                    "the younger generation. This comprehensive ideological control distinguished Nazi Germany "
                    "from mere authoritarian regimes."
                ),
                "min_words": 100,
                "max_words": 300,
            },
        ],
        "numerical_pool": [
            # Conceptual numerical: match features
            {
                "q": (
                    "A comparative table lists 8 distinguishing features of Totalitarian vs "
                    "Authoritarian States. If a student correctly identifies 5 features for "
                    "Totalitarian and 3 for Authoritarian, what is the total number of correctly "
                    "identified features?"
                ),
                "compute": lambda: 8,
                "tolerance": 0,
                "explanation": (
                    "5 (Totalitarian features) + 3 (Authoritarian features) = 8 total correctly "
                    "identified features. Both types together account for all 8 distinguishing features."
                ),
                "steps": ["5 Totalitarian features identified", "3 Authoritarian features identified",
                          "Total = 5 + 3 = 8"],
            },
        ],
    },

    # ── Chapter 1: Liberal Democratic State ──
    "liberal_democratic_state": {
        "title": "Liberal Democratic State",
        "key_terms": [
            "liberalism", "democracy", "rule of law", "separation of powers",
            "fundamental rights", "free and fair elections", "multi-party system",
            "civil liberties", "constitutionalism", "representative government",
            "independent judiciary", "freedom of speech", "equality before law",
            "John Locke", "John Stuart Mill", "consent of the governed"
        ],
        "mcq_pool": [
            {
                "q": "Which of the following is NOT a feature of a Liberal Democratic State?",
                "options": [
                    "Free and fair elections",
                    "Rule of law",
                    "One-party system",
                    "Protection of fundamental rights",
                ],
                "answer": 2,
                "explanation": (
                    "A Liberal Democratic State is characterised by multi-party competition, free and "
                    "fair elections, rule of law, and protection of fundamental rights. A one-party "
                    "system is a feature of authoritarian or totalitarian states."
                ),
            },
            {
                "q": "The principle that government must act according to law is called:",
                "options": [
                    "Dictatorship",
                    "Rule of Law",
                    "Divine Right",
                    "Totalitarianism",
                ],
                "answer": 1,
                "explanation": (
                    "The Rule of Law is a fundamental principle of liberal democracy, meaning that all "
                    "persons, institutions, and entities are accountable to laws that are publicly "
                    "promulgated, equally enforced, and independently adjudicated."
                ),
            },
            {
                "q": "Who is considered the father of Liberalism?",
                "options": [
                    "Karl Marx",
                    "John Locke",
                    "Friedrich Nietzsche",
                    "Thomas Hobbes",
                ],
                "answer": 1,
                "explanation": (
                    "John Locke (1632-1704) is widely regarded as the father of classical liberalism. "
                    "His theories of natural rights (life, liberty, property) and government by consent "
                    "laid the intellectual foundation for liberal democracy."
                ),
            },
            {
                "q": "In a Liberal Democratic State, the separation of powers divides government into:",
                "options": [
                    "Rural and Urban",
                    "Legislative, Executive and Judiciary",
                    "Central and State",
                    "Religious and Secular",
                ],
                "answer": 1,
                "explanation": (
                    "The doctrine of separation of powers divides government into three branches: "
                    "Legislative (makes laws), Executive (implements laws), and Judiciary (interprets "
                    "laws). This prevents concentration of power in any one branch."
                ),
            },
            {
                "q": "Which right is fundamental in a Liberal Democratic State?",
                "options": [
                    "Right to suppress opposition",
                    "Freedom of speech and expression",
                    "Right to hereditary rule",
                    "Right to unlimited executive power",
                ],
                "answer": 1,
                "explanation": (
                    "Freedom of speech and expression is a cornerstone of liberal democracy, enabling "
                    "citizens to criticise the government, participate in public debate, and hold "
                    "leaders accountable."
                ),
            },
            {
                "q": "Multi-party competition is a feature of:",
                "options": [
                    "Totalitarian State",
                    "Liberal Democratic State",
                    "Authoritarian State",
                    "Military Dictatorship",
                ],
                "answer": 1,
                "explanation": (
                    "Liberal Democratic States are characterised by a multi-party system where "
                    "different parties compete freely in elections to form the government. "
                    "Totalitarian and authoritarian states do not allow genuine political competition."
                ),
            },
            {
                "q": "The concept of 'consent of the governed' is associated with:",
                "options": [
                    "Totalitarianism",
                    "Liberalism and Democracy",
                    "Authoritarianism",
                    "Monarchy",
                ],
                "answer": 1,
                "explanation": (
                    "The concept of 'consent of the governed' is central to liberal democratic theory, "
                    "originally articulated by John Locke and later by Jean-Jacques Rousseau. It means "
                    "that government derives its legitimacy from the consent of the people."
                ),
            },
        ],
        "fill_blank_pool": [
            {
                "q": "In a Liberal Democratic State, the government is based on the _____ of the governed.",
                "answer": "consent",
                "alternatives": ["consent"],
                "explanation": "Liberal democracy is based on the principle that government derives its legitimacy from the consent of the governed.",
            },
            {
                "q": "The three organs of government in a Liberal Democratic State are Legislative, Executive and _____.",
                "answer": "Judiciary",
                "alternatives": ["Judiciary", "Judicial"],
                "explanation": "Separation of powers divides government into Legislative, Executive, and Judiciary.",
            },
            {
                "q": "_____ is known as the father of Liberalism.",
                "answer": "John Locke",
                "alternatives": ["John Locke", "Locke"],
                "explanation": "John Locke's theories of natural rights and government by consent laid the foundation for liberalism.",
            },
            {
                "q": "A Liberal Democratic State guarantees _____ rights to all citizens.",
                "answer": "fundamental",
                "alternatives": ["fundamental", "civil", "basic"],
                "explanation": "Fundamental rights such as freedom of speech, equality before law, and right to life are guaranteed in a liberal democracy.",
            },
            {
                "q": "The principle that no one is above the law is called _____ of Law.",
                "answer": "Rule",
                "alternatives": ["Rule"],
                "explanation": "Rule of Law means everyone is subject to the law, including government officials.",
            },
        ],
        "short_answer_pool": [
            {
                "q": "List any FOUR features of a Liberal Democratic State.",
                "keywords": ["free elections", "multi-party", "rule of law", "fundamental rights",
                             "separation of powers", "civil liberties", "independent judiciary",
                             "equality", "consent"],
                "min_keywords": 3,
                "ideal": (
                    "Features: (1) Free and fair elections at regular intervals; (2) Multi-party system "
                    "and political competition; (3) Rule of Law and independent judiciary; (4) Protection "
                    "of fundamental rights and civil liberties; (5) Separation of powers; "
                    "(6) Government based on consent of the governed."
                ),
                "max_words": 120,
            },
            {
                "q": "What is meant by 'Fundamental Rights' in a Liberal Democratic State?",
                "keywords": ["rights", "freedom", "speech", "equality", "life", "liberty", "constitution",
                             "guaranteed", "protected"],
                "min_keywords": 3,
                "ideal": (
                    "Fundamental Rights are basic human rights guaranteed to all citizens by the "
                    "constitution. They include the Right to Equality, Right to Freedom, Right against "
                    "Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and "
                    "Right to Constitutional Remedies. They protect citizens from arbitrary state action."
                ),
                "max_words": 100,
            },
            {
                "q": "Why is an independent judiciary important in a Liberal Democratic State?",
                "keywords": ["independent", "judiciary", "law", "justice", "rights", "executive",
                             "check", "balance", "fair"],
                "min_keywords": 3,
                "ideal": (
                    "An independent judiciary is crucial because: (1) It safeguards the constitution "
                    "and fundamental rights; (2) It acts as a check on the executive and legislature; "
                    "(3) It ensures rule of law by interpreting laws impartially; (4) It provides "
                    "justice to citizens without fear or favour."
                ),
                "max_words": 100,
            },
        ],
        "long_answer_pool": [
            {
                "q": (
                    "Describe the main features of a Liberal Democratic State. "
                    "How does it differ from a Totalitarian State? (6 marks)"
                ),
                "keywords": ["liberal", "democratic", "elections", "rights", "rule of law",
                             "separation of powers", "multi-party", "civil liberties",
                             "totalitarian", "ideology", "control", "single party", "difference",
                             "contrast", "freedom", "pluralism"],
                "min_keywords": 6,
                "ideal": (
                    "A Liberal Democratic State is characterised by: (1) Free and fair periodic elections "
                    "with universal adult franchise; (2) Multi-party system and political pluralism; "
                    "(3) Rule of Law and an independent judiciary; (4) Protection of fundamental rights "
                    "and civil liberties; (5) Separation of powers among Legislative, Executive and "
                    "Judiciary; (6) Government based on consent of the governed. "
                    "Key differences from Totalitarian State: Liberal Democracy allows political "
                    "pluralism vs single-party control; guarantees civil liberties vs total control; "
                    "has independent judiciary vs party-controlled judiciary; government by consent vs "
                    "imposed rule; limited state intervention vs total control over all spheres."
                ),
                "min_words": 120,
                "max_words": 350,
            },
            {
                "q": (
                    "Discuss the significance of the Rule of Law in a Liberal Democratic State. "
                    "Give examples. (6 marks)"
                ),
                "keywords": ["rule of law", "equality", "justice", "impartial", "constitution",
                             "fundamental rights", "independent judiciary", "executive", "check",
                             "arbitrary", "example"],
                "min_keywords": 5,
                "ideal": (
                    "The Rule of Law is a cornerstone of liberal democracy. It ensures: (1) Equality "
                    "before the law - all citizens, including government officials, are subject to the "
                    "same laws; (2) Legal certainty - laws are clear, public, and stable; (3) Prevention "
                    "of arbitrary state action - no one can be punished except for violation of law; "
                    "(4) Access to justice - independent judiciary ensures fair trials. "
                    "Example: In India, Article 14 guarantees equality before law. The Supreme Court "
                    "can strike down laws that violate the constitution (judicial review)."
                ),
                "min_words": 100,
                "max_words": 300,
            },
        ],
        "numerical_pool": [
            {
                "q": (
                    "A Liberal Democratic State has 3 branches of government (Legislative, "
                    "Executive, Judiciary). If a constitution further divides powers between "
                    "Centre and States in a 2-tier system, how many distinct power-centres "
                    "exist in total?"
                ),
                "compute": lambda: 6,
                "tolerance": 0,
                "explanation": (
                    "3 branches of government x 2 tiers (Centre and States) = 6 distinct power-centres "
                    "in a federal liberal democracy."
                ),
                "steps": ["3 branches: Legislative, Executive, Judiciary",
                          "2 tiers: Centre and States",
                          "Total power-centres = 3 x 2 = 6"],
            },
        ],
    },

    # ── Chapter 1: Unitary and Federal States ──
    "unitary_federal": {
        "title": "Unitary and Federal States",
        "key_terms": [
            "unitary", "federal", "centre", "states", "constitution",
            "division of powers", "supremacy", "rigidity", "bicameral",
            "India", "UK", "USA", "written constitution", "independent judiciary",
            "residuary powers", "supreme court", "parliament"
        ],
        "mcq_pool": [
            {
                "q": "In a Unitary State, all powers are concentrated in the:",
                "options": [
                    "States",
                    "Central Government",
                    "Local bodies",
                    " Judiciary",
                ],
                "answer": 1,
                "explanation": (
                    "In a Unitary State, all political power is concentrated in the central government. "
                    "Regional governments (if they exist) are subordinate to and can be created or "
                    "abolished by the centre. Examples: UK, France, Japan."
                ),
            },
            {
                "q": "Which of the following is a feature of a Federal State?",
                "options": [
                    "States can secede at will",
                    "Division of powers between Centre and States",
                    "No written constitution",
                    "Centre can dismiss state governments arbitrarily",
                ],
                "answer": 1,
                "explanation": (
                    "A Federal State is characterised by a division of powers between the central "
                    "government and state governments as defined in the constitution. Both levels "
                    "derive their authority directly from the constitution."
                ),
            },
            {
                "q": "Which country is an example of a Unitary State?",
                "options": [
                    "India",
                    "USA",
                    "United Kingdom",
                    "Australia",
                ],
                "answer": 2,
                "explanation": (
                    "The United Kingdom is a classic example of a Unitary State. Parliament at "
                    "Westminster holds supreme legislative authority, and devolution to Scotland, "
                    "Wales, and Northern Ireland can theoretically be reversed by Parliament."
                ),
            },
            {
                "q": "Which of the following is a feature of a Federal Constitution?",
                "options": [
                    "Written constitution",
                    "Centre can abolish states at will",
                    "Unicameral legislature only",
                    "No independent judiciary",
                ],
                "answer": 0,
                "explanation": (
                    "Federal states typically have a written constitution that clearly defines and "
                    "divides the powers between the centre and the states. This written constitution "
                    "is usually rigid to protect the federal structure."
                ),
            },
            {
                "q": "Residuary powers in India rest with the:",
                "options": [
                    "States",
                    "Centre (Union Government)",
                    "President",
                    "Supreme Court",
                ],
                "answer": 1,
                "explanation": (
                    "Under the Indian Constitution (Article 248 read with List III of the Seventh "
                    "Schedule), residuary powers - powers not enumerated in any of the three lists - "
                    "vest with the Union Government, unlike in the USA where they rest with the states."
                ),
            },
            {
                "q": "A Federal State must have:",
                "options": [
                    "A flexible constitution",
                    "Division of powers and a written constitution",
                    "Unicameral legislature",
                    "Power to secede",
                ],
                "answer": 1,
                "explanation": (
                    "Essential features of a federal state include: a written and rigid constitution, "
                    "division of powers between centre and states, supremacy of the constitution, and "
                    "an independent judiciary to interpret the constitution."
                ),
            },
        ],
        "fill_blank_pool": [
            {
                "q": "In a _____ State, all powers rest with the Central Government.",
                "answer": "Unitary",
                "alternatives": ["Unitary"],
                "explanation": "A Unitary State concentrates all sovereign power in the central government.",
            },
            {
                "q": "In a Federal State, powers are _____ between Centre and States.",
                "answer": "divided",
                "alternatives": ["divided", "distributed"],
                "explanation": "Federalism involves the constitutional division of powers between two levels of government.",
            },
            {
                "q": "_____ is an example of a Unitary State with a written constitution.",
                "answer": "France",
                "alternatives": ["France", "Japan"],
                "explanation": "France and Japan are examples of unitary states with written constitutions.",
            },
            {
                "q": "_____ is the world's largest federal democracy.",
                "answer": "India",
                "alternatives": ["India"],
                "explanation": "India is the world's largest federal democracy with 28 states and 8 union territories.",
            },
            {
                "q": "In India, residuary powers rest with the _____ Government.",
                "answer": "Union",
                "alternatives": ["Union", "Central"],
                "explanation": "Under the Indian Constitution, residuary powers are vested in the Union Government.",
            },
        ],
        "short_answer_pool": [
            {
                "q": "List any FOUR features of a Federal State.",
                "keywords": ["written constitution", "division of powers", "rigid constitution",
                             "supremacy", "independent judiciary", "bicameral", "dual citizenship"],
                "min_keywords": 3,
                "ideal": (
                    "Features of a Federal State: (1) Written and rigid constitution; (2) Division of "
                    "powers between Centre and States; (3) Supremacy of the constitution; (4) Independent "
                    "judiciary; (5) Bicameral legislature; (6) Dual citizenship (national + state)."
                ),
                "max_words": 120,
            },
            {
                "q": "Give ONE example each of a Unitary and a Federal State and compare them briefly.",
                "keywords": ["unitary", "federal", "UK", "India", "USA", "power", "centre",
                             "states", "division"],
                "min_keywords": 3,
                "ideal": (
                    "Example of Unitary State: United Kingdom - all powers concentrated in Parliament "
                    "at Westminster; devolution to Scotland, Wales is reversible. "
                    "Example of Federal State: India - powers divided between Union and States by "
                    "constitution; states have constitutionally guaranteed autonomy."
                ),
                "max_words": 100,
            },
        ],
        "long_answer_pool": [
            {
                "q": (
                    "Compare Unitary and Federal States with reference to India and the UK. (6 marks)"
                ),
                "keywords": ["unitary", "federal", "India", "UK", "division of powers", "constitution",
                             "centre", "states", "written", "rigid", "supremacy", "judiciary",
                             "difference", "similarity", "example"],
                "min_keywords": 6,
                "ideal": (
                    "Unitary State: All sovereign power rests with the central government. Regional "
                    "units (if any) are subordinate and created by the centre. Example: UK - Parliament "
                    "is supreme; devolution is reversible. "
                    "Federal State: Powers constitutionally divided between Centre and States. Both "
                    "derive authority from the constitution. Example: India - Union and States have "
                    "separate jurisdictions under the written constitution. "
                    "Comparison: (1) Power distribution - Unitary: centre holds all power; Federal: "
                    "divided by constitution. (2) Constitution - Unitary: may be unwritten (UK); "
                    "Federal: always written and rigid. (3) Judiciary - Unitary: one system; Federal: "
                    "dual with Supreme Court as interpreter. (4) States' autonomy - Unitary: limited; "
                    "Federal: constitutionally guaranteed."
                ),
                "min_words": 120,
                "max_words": 350,
            },
        ],
        "numerical_pool": [
            {
                "q": (
                    "The Indian Constitution divides powers into three Lists: Union List has 97 "
                    "subjects, State List has 66, and Concurrent List has 47. What is the total "
                    "number of enumerated subjects?"
                ),
                "compute": lambda: 97 + 66 + 47,
                "tolerance": 0,
                "explanation": (
                    "Total enumerated subjects = 97 (Union) + 66 (State) + 47 (Concurrent) = 210 subjects."
                ),
                "steps": ["Union List: 97 subjects", "State List: 66 subjects",
                          "Concurrent List: 47 subjects", "Total = 97 + 66 + 47 = 210"],
            },
        ],
    },

    # ── Chapter 2: Written and Unwritten Constitutions ──
    "written_unwritten": {
        "title": "Written and Unwritten Constitutions",
        "key_terms": [
            "constitution", "written", "unwritten", "codified", "uncodified",
            "conventions", "statutes", "judicial decisions", "merits", "demerits",
            "flexibility", "rigidity", "USA", "UK", "India", "clarity",
            "fundamental rights", "amendment", "precedents"
        ],
        "mcq_pool": [
            {
                "q": "Which country has an unwritten constitution?",
                "options": [
                    "USA",
                    "India",
                    "United Kingdom",
                    "Japan",
                ],
                "answer": 2,
                "explanation": (
                    "The United Kingdom has an unwritten (uncodified) constitution. It consists of "
                    "statutes (e.g., Magna Carta, Bill of Rights 1689), common law, conventions, "
                    "and authoritative works - not a single written document."
                ),
            },
            {
                "q": "Which of the following is a merit of a Written Constitution?",
                "options": [
                    "It is easy to amend",
                    "It provides clarity and certainty",
                    "It evolves gradually with conventions",
                    "It is based entirely on judicial precedents",
                ],
                "answer": 1,
                "explanation": (
                    "A written constitution provides clarity and certainty because its provisions are "
                    "clearly laid down in a single document, making it accessible to all citizens. "
                    "Easy amendment is a feature of flexible constitutions, not written ones per se."
                ),
            },
            {
                "q": "Which of the following is a demerit of an Unwritten Constitution?",
                "options": [
                    "It is very rigid",
                    "It lacks clarity and definite provisions",
                    "It cannot be amended",
                    "It is too detailed",
                ],
                "answer": 1,
                "explanation": (
                    "An unwritten constitution lacks the clarity of a single codified document. Its "
                    "provisions are scattered across statutes, conventions, and judicial decisions, "
                    "making it difficult for citizens to know their rights and duties."
                ),
            },
            {
                "q": "Conventions are an important source of which type of constitution?",
                "options": [
                    "Written Constitution",
                    "Unwritten Constitution",
                    "Rigid Constitution",
                    "Flexible Constitution",
                ],
                "answer": 1,
                "explanation": (
                    "Conventions - unwritten rules and practices - are a key source of the unwritten "
                    "constitution. For example, the convention that the Prime Minister must be a member "
                    "of the House of Commons is not law but is binding."
                ),
            },
            {
                "q": "The Constitution of India is a:",
                "options": [
                    "Unwritten Constitution",
                    "Written Constitution",
                    "Partly written and partly unwritten",
                    "Conventional Constitution",
                ],
                "answer": 1,
                "explanation": (
                    "The Constitution of India is a written constitution - the longest written "
                    "constitution in the world. It was adopted on 26 November 1949 and came into "
                    "effect on 26 January 1950."
                ),
            },
            {
                "q": "A Written Constitution is also called a _____ Constitution.",
                "options": [
                    "Conventional",
                    "Codified",
                    "Flexible",
                    "Uncertain",
                ],
                "answer": 1,
                "explanation": (
                    "A written constitution is also called a codified constitution because its "
                    "provisions are systematically compiled into a single document or code."
                ),
            },
            {
                "q": "A merit of an Unwritten Constitution is:",
                "options": [
                    "Clarity and precision",
                    "Flexibility and adaptability",
                    "Supremacy of the constitution",
                    "Easy access for citizens",
                ],
                "answer": 1,
                "explanation": (
                    "An unwritten constitution is flexible and can adapt to changing circumstances "
                    "without the need for a formal amendment process. This adaptability is a key "
                    "advantage over rigid written constitutions."
                ),
            },
        ],
        "fill_blank_pool": [
            {
                "q": "The United Kingdom has an _____ Constitution.",
                "answer": "unwritten",
                "alternatives": ["unwritten", "uncodified"],
                "explanation": "The UK has an unwritten (uncodified) constitution based on statutes, conventions, and common law.",
            },
            {
                "q": "A Written Constitution is also called a _____ Constitution.",
                "answer": "codified",
                "alternatives": ["codified", "written"],
                "explanation": "A written constitution is also known as a codified constitution because provisions are systematically compiled.",
            },
            {
                "q": "_____ are unwritten rules followed as practices in an Unwritten Constitution.",
                "answer": "Conventions",
                "alternatives": ["Conventions", "conventions"],
                "explanation": "Conventions are unwritten practices and rules that are binding but not legally enforceable.",
            },
            {
                "q": "A Written Constitution provides _____ and certainty.",
                "answer": "clarity",
                "alternatives": ["clarity", "definiteness"],
                "explanation": "Written constitutions provide clarity because provisions are laid down in a single document.",
            },
            {
                "q": "An Unwritten Constitution is _____ and can adapt to changing circumstances.",
                "answer": "flexible",
                "alternatives": ["flexible", "adaptable"],
                "explanation": "Unwritten constitutions are flexible because they can be modified without formal amendment procedures.",
            },
        ],
        "short_answer_pool": [
            {
                "q": "List TWO merits and TWO demerits of a Written Constitution.",
                "keywords": ["clarity", "certainty", "fundamental rights", "rigid", "difficult to amend",
                             "demerit", "merit"],
                "min_keywords": 3,
                "ideal": (
                    "Merits: (1) Provides clarity and certainty; (2) Defines fundamental rights clearly; "
                    "(3) Limits government power. "
                    "Demerits: (1) Rigid and difficult to amend; (2) Cannot easily adapt to changing "
                    "circumstances; (3) May become outdated."
                ),
                "max_words": 100,
            },
            {
                "q": "What are 'Conventions' in the context of the UK Constitution?",
                "keywords": ["convention", "unwritten", "rule", "practice", "binding", "not law",
                             "practice"],
                "min_keywords": 2,
                "ideal": (
                    "Conventions are unwritten rules and practices observed in the constitution but not "
                    "legally enforceable. They develop through long usage and are binding politically "
                    "but not judicially. Example: The Prime Minister must be a member of the House of Commons."
                ),
                "max_words": 80,
            },
        ],
        "long_answer_pool": [
            {
                "q": (
                    "Distinguish between Written and Unwritten Constitutions. "
                    "Discuss their respective merits and demerits. (6 marks)"
                ),
                "keywords": ["written", "unwritten", "codified", "clarity", "rigid", "flexible",
                             "merit", "demerit", "convention", "statute", "judicial", "precedent",
                             "certainty", "adaptability", "India", "UK"],
                "min_keywords": 5,
                "ideal": (
                    "Written Constitution: A single codified document (e.g., India, USA). "
                    "Merits: Clarity, certainty, definite provisions, protects fundamental rights, "
                    "limits government power, provides reference in disputes. "
                    "Demerits: Rigid, difficult to amend, may become outdated, prevents adaptation. "
                    "Unwritten Constitution: Not in a single document (e.g., UK). Based on statutes, "
                    "conventions, common law, and authoritative works. "
                    "Merits: Flexible, adaptable to change, evolves with society, less rigid. "
                    "Demerits: Lacks clarity, vague, uncertain, no definite fundamental rights, "
                    "depends on political morality."
                ),
                "min_words": 120,
                "max_words": 350,
            },
        ],
        "numerical_pool": [
            {
                "q": (
                    "A written constitution has 3 main merits and 3 main demerits. "
                    "An unwritten constitution has 2 main merits and 3 main demerits. "
                    "What is the total number of advantages (merits) of both types combined?"
                ),
                "compute": lambda: 3 + 2,
                "tolerance": 0,
                "explanation": (
                    "Total merits = 3 (written) + 2 (unwritten) = 5 advantages across both types."
                ),
                "steps": ["Written constitution merits: 3", "Unwritten constitution merits: 2",
                          "Total merits = 3 + 2 = 5"],
            },
        ],
    },

    # ── Chapter 2: Rigid and Flexible Constitutions ──
    "rigid_flexible": {
        "title": "Rigid and Flexible Constitutions",
        "key_terms": [
            "rigid", "flexible", "amendment", "special majority", "parliament",
            "ratification", "states", "procedure", "USA", "UK", "India",
            "simple majority", "supreme court", "judicial review", "special majority",
            "states legislature", "president"
        ],
        "mcq_pool": [
            {
                "q": "Which of the following describes a Rigid Constitution?",
                "options": [
                    "It can be amended by a simple majority",
                    "It requires a special majority and ratification for amendment",
                    "It has no amendment procedure",
                    "It can be changed by judicial decisions alone",
                ],
                "answer": 1,
                "explanation": (
                    "A rigid constitution cannot be amended by the ordinary legislative process. It "
                    "requires a special majority (e.g., two-thirds majority) and often ratification "
                    "by state legislatures. The US Constitution is an example."
                ),
            },
            {
                "q": "Which of the following describes a Flexible Constitution?",
                "options": [
                    "It can be amended by a special majority only",
                    "It can be amended by the ordinary legislative process",
                    "It cannot be amended at all",
                    "It requires a referendum for every amendment",
                ],
                "answer": 1,
                "explanation": (
                    "A flexible constitution can be amended by the ordinary legislative process - "
                    "i.e., by a simple majority of the legislature, just like an ordinary law. "
                    "The UK constitution is flexible."
                ),
            },
            {
                "q": "The Constitution of the USA is an example of a:",
                "options": [
                    "Flexible Constitution",
                    "Rigid Constitution",
                    "Unwritten Constitution",
                    "Unitary Constitution",
                ],
                "answer": 1,
                "explanation": (
                    "The US Constitution is a classic example of a rigid constitution. Amendments "
                    "require a two-thirds majority in both Houses of Congress and ratification by "
                    "three-fourths of the state legislatures."
                ),
            },
            {
                "q": "A merit of a Rigid Constitution is:",
                "options": [
                    "It is easy to amend",
                    "It provides stability and permanence",
                    "It can adapt quickly to change",
                    "It allows the Centre to dominate States",
                ],
                "answer": 1,
                "explanation": (
                    "A rigid constitution provides stability and permanence because it cannot be "
                    "easily amended. This protects the fundamental structure of government from "
                    "political whims and short-term pressures."
                ),
            },
            {
                "q": "Which of the following is a demerit of a Rigid Constitution?",
                "options": [
                    "It provides stability",
                    "It is difficult to adapt to changing circumstances",
                    "It protects fundamental rights",
                    "It prevents hasty amendments",
                ],
                "answer": 1,
                "explanation": (
                    "A rigid constitution is slow to adapt to changing social, economic, and political "
                    "circumstances. This can be problematic when urgent reforms are needed but the "
                    "amendment process is too cumbersome."
                ),
            },
            {
                "q": "The Indian Constitution is best described as:",
                "options": [
                    "Rigid",
                    "Flexible",
                    "A mixture of Rigid and Flexible",
                    "Unwritten",
                ],
                "answer": 2,
                "explanation": (
                    "The Indian Constitution is a unique blend of rigid and flexible. Some provisions "
                    "can be amended by a simple majority (flexible), while others require a special "
                    "majority and state ratification (rigid)."
                ),
            },
        ],
        "fill_blank_pool": [
            {
                "q": "A _____ Constitution requires a special majority for amendment.",
                "answer": "rigid",
                "alternatives": ["rigid"],
                "explanation": "Rigid constitutions require a special majority and often ratification by states for amendment.",
            },
            {
                "q": "The _____ Constitution is flexible and can be amended by ordinary legislative process.",
                "answer": "UK",
                "alternatives": ["UK", "United Kingdom"],
                "explanation": "The UK constitution is flexible and can be amended by a simple majority in Parliament.",
            },
            {
                "q": "A merit of a Rigid Constitution is _____ and stability.",
                "answer": "permanence",
                "alternatives": ["permanence", "stability"],
                "explanation": "Rigid constitutions provide permanence and stability, protecting the fundamental framework.",
            },
            {
                "q": "A _____ Constitution can easily adapt to changing circumstances.",
                "answer": "flexible",
                "alternatives": ["flexible"],
                "explanation": "Flexible constitutions can be easily amended to adapt to changing needs.",
            },
        ],
        "short_answer_pool": [
            {
                "q": "Explain TWO merits of a Rigid Constitution.",
                "keywords": ["stability", "permanence", "fundamental rights", "prevents hasty",
                             "protect", "constitution"],
                "min_keywords": 2,
                "ideal": (
                    "Merits of a Rigid Constitution: (1) Provides stability and permanence to the "
                    "constitutional framework; (2) Protects fundamental rights from easy amendment; "
                    "(3) Prevents hasty or ill-considered changes driven by temporary political majorities."
                ),
                "max_words": 100,
            },
            {
                "q": "What is a Flexible Constitution? Give one example.",
                "keywords": ["flexible", "amend", "simple majority", "ordinary", "UK", "example",
                             "legislature"],
                "min_keywords": 2,
                "ideal": (
                    "A Flexible Constitution is one that can be amended by the ordinary legislative "
                    "process - i.e., by a simple majority of the legislature, just like any ordinary "
                    "law. Example: The United Kingdom, where Parliament can amend the constitution "
                    "through an ordinary Act of Parliament."
                ),
                "max_words": 80,
            },
        ],
        "long_answer_pool": [
            {
                "q": (
                    "Distinguish between Rigid and Flexible Constitutions. "
                    "Discuss the merits and demerits of each. (6 marks)"
                ),
                "keywords": ["rigid", "flexible", "special majority", "simple majority", "amend",
                             "stability", "adaptability", "USA", "UK", "merit", "demerit",
                             "constitution"],
                "min_keywords": 5,
                "ideal": (
                    "Rigid Constitution: Cannot be amended by ordinary legislative process. Requires "
                    "a special majority (e.g., two-thirds) and often ratification by states. Example: USA. "
                    "Merits: Stability, permanence, protects fundamental rights, prevents hasty amendments. "
                    "Demerits: Difficult to adapt, may become outdated, slow reform process. "
                    "Flexible Constitution: Can be amended by ordinary legislative process (simple majority). "
                    "Example: UK. "
                    "Merits: Easy to adapt, flexible, responds to changing needs. "
                    "Demerits: May lead to instability, risk of hasty amendments, no guarantee of "
                    "fundamental rights protection."
                ),
                "min_words": 120,
                "max_words": 350,
            },
        ],
        "numerical_pool": [
            {
                "q": (
                    "A Rigid Constitution requires 2/3 majority in Parliament AND ratification "
                    "by 3/4 of States to amend. If a country has 28 States, how many States "
                    "must ratify an amendment?"
                ),
                "compute": lambda: math.ceil(28 * 3 / 4),
                "tolerance": 1,
                "explanation": (
                    "3/4 of 28 States = 21 States must ratify the amendment."
                ),
                "steps": ["Total States = 28", "Required fraction = 3/4",
                          "States needed = 3/4 x 28 = 21"],
            },
        ],
    },

    # ── Chapter 2: Amending Procedures (UK, USA) ──
    "amending_procedures": {
        "title": "Amending Procedures - UK and USA",
        "key_terms": [
            "amendment", "procedure", "special majority", "parliament",
            "congress", "ratification", "states", "referendum", "two-thirds",
            "three-fourths", "ordinary act", "constitutional amendment",
            "UK Parliament", "US Congress", "article V"
        ],
        "mcq_pool": [
            {
                "q": "In the UK, a constitutional amendment can be passed by:",
                "options": [
                    "A two-thirds majority in both Houses",
                    "A simple majority in Parliament",
                    "A referendum only",
                    "Ratification by all constituent countries",
                ],
                "answer": 1,
                "explanation": (
                    "In the UK, constitutional amendments are passed as ordinary Acts of Parliament, "
                    "requiring only a simple majority in both the House of Commons and the House of "
                    "Lords. This reflects the flexibility of the UK constitution."
                ),
            },
            {
                "q": "Under Article V of the US Constitution, an amendment requires:",
                "options": [
                    "Simple majority in Congress",
                    "Two-thirds majority in both Houses of Congress and ratification by 3/4 of States",
                    "Approval by the President alone",
                    "Referendum by popular vote",
                ],
                "answer": 1,
                "explanation": (
                    "Article V of the US Constitution specifies two ways to propose amendments: "
                    "(1) Two-thirds majority in both Houses of Congress, or (2) Convention called by "
                    "2/3 of state legislatures. Ratification requires 3/4 of state legislatures or "
                    "state conventions."
                ),
            },
            {
                "q": "The US Constitution can be amended by ratification of _____ of the State Legislatures.",
                "options": [
                    "One-half",
                    "Three-fourths",
                    "All",
                    "One-fourth",
                ],
                "answer": 1,
                "explanation": (
                    "Three-fourths (3/4) of the state legislatures must ratify a proposed amendment "
                    "for it to become part of the US Constitution. With 50 states, this means 38 states."
                ),
            },
            {
                "q": "Which of the following makes the US Constitution more rigid than the UK Constitution?",
                "options": [
                    "It is shorter",
                    "It requires a special majority and state ratification",
                    "It has no fundamental rights",
                    "It is unwritten",
                ],
                "answer": 1,
                "explanation": (
                    "The US Constitution is rigid because amendments require a two-thirds majority in "
                    "both Houses of Congress AND ratification by three-fourths of the states. The UK "
                    "constitution requires only a simple majority in Parliament."
                ),
            },
        ],
        "fill_blank_pool": [
            {
                "q": "In the UK, constitutional amendments require a _____ majority in Parliament.",
                "answer": "simple",
                "alternatives": ["simple"],
                "explanation": "The UK's flexible constitution means amendments need only a simple majority in Parliament.",
            },
            {
                "q": "In the USA, an amendment requires _____ majority in both Houses of Congress.",
                "answer": "two-thirds",
                "alternatives": ["two-thirds", "2/3"],
                "explanation": "The US Constitution requires a two-thirds majority in both Houses to propose an amendment.",
            },
            {
                "q": "_____ of State Legislatures must ratify a US Constitutional amendment.",
                "answer": "Three-fourths",
                "alternatives": ["Three-fourths", "3/4"],
                "explanation": "Three-fourths of state legislatures must ratify a proposed US constitutional amendment.",
            },
        ],
        "short_answer_pool": [
            {
                "q": "How is the UK Constitution amended?",
                "keywords": ["parliament", "act", "simple majority", "ordinary", "amend", "flexible"],
                "min_keywords": 2,
                "ideal": (
                    "The UK Constitution is amended through an ordinary Act of Parliament, requiring "
                    "a simple majority in both the House of Commons and the House of Lords. There is "
                    "no special amendment procedure, making it highly flexible."
                ),
                "max_words": 80,
            },
            {
                "q": "What is the amendment procedure for the US Constitution under Article V?",
                "keywords": ["article V", "two-thirds", "congress", "ratification", "three-fourths",
                             "states", "special majority"],
                "min_keywords": 3,
                "ideal": (
                    "Under Article V, an amendment is proposed by a two-thirds majority in both Houses "
                    "of Congress and must be ratified by three-fourths (3/4) of the state legislatures. "
                    "This makes the US Constitution rigid and difficult to change."
                ),
                "max_words": 80,
            },
        ],
        "long_answer_pool": [
            {
                "q": (
                    "Compare the amending procedures of the UK and USA constitutions. "
                    "Why is the US Constitution considered more rigid? (6 marks)"
                ),
                "keywords": ["UK", "USA", "simple majority", "special majority", "two-thirds",
                             "three-fourths", "ratification", "states", "parliament", "congress",
                             "rigid", "flexible", "amendment"],
                "min_keywords": 5,
                "ideal": (
                    "UK: Constitutional amendments require only a simple majority in both Houses of "
                    "Parliament, like any ordinary Act. This makes the UK constitution flexible and "
                    "adaptable. "
                    "USA: Under Article V, amendments require: (1) Two-thirds majority in both Houses "
                    "of Congress for proposal; (2) Ratification by three-fourths (38 out of 50) of "
                    "state legislatures. This dual hurdle makes the US constitution very rigid. "
                    "Comparison: The US system ensures broad consensus but prevents quick adaptation, "
                    "while the UK system allows swift change but risks instability."
                ),
                "min_words": 120,
                "max_words": 350,
            },
        ],
        "numerical_pool": [
            {
                "q": (
                    "The US has 50 States. An amendment requires ratification by 3/4 of States. "
                    "How many States must ratify?"
                ),
                "compute": lambda: math.ceil(50 * 3 / 4),
                "tolerance": 0,
                "explanation": "3/4 of 50 States = 37.5 → 38 States must ratify.",
                "steps": ["Total States = 50", "Required fraction = 3/4",
                          "States needed = ceil(3/4 x 50) = 38"],
            },
        ],
    },

}

# return {"status": "ok", "note": "truncated"}


# -- solver contract --------------------------------------------
def _topics():
    for name, val in globals().items():
        if isinstance(val, dict) and val and all(isinstance(v, dict) for v in val.values()):
            return val
    return {}

def solve(node_id: str = "", params: dict | None = None, **kw):
    """Serve a c12 political-science question (or its answer) from the bank."""
    params = params or {}
    bank = _topics()
    if not bank:
        return {"error": "topic bank empty"}
    topic = params.get("topic") or next(iter(bank))
    tdata = bank.get(topic, {})
    items = tdata.get((params.get("kind") or "mcq") + "_pool") or         next((v for k, v in tdata.items() if k.endswith("_pool")), [])
    item = items[int(params.get("q", 0)) % len(items)] if items else {}
    if callable(item.get("compute")):
        return {"topic": topic, "q": item.get("q"), "answer": item["compute"](),
                "explanation": item.get("explanation"), "steps": item.get("steps")}
    return {"topic": topic, "q": item.get("q"),
            "answer": item.get("answer") or item.get("model_answer")}

SOLVER_REGISTRY = {"c12_pol_solve": solve}
NODE_MAP = {"c12_pol_001": "c12_pol_solve"}
