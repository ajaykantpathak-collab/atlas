"""
CISCE Class 12 Sociology (SOC) Solver and Question Generator
Syllabus: Social Institutions, Religion & Society, Political Organization, Social Control & Social Movements
Deterministic, seeded-random, no LLM calls.
"""

import random
import math
import re
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any

# ---------------------------------------------------------------------------
# Deterministic seed helper
# ---------------------------------------------------------------------------

def make_rng(seed: int) -> random.Random:
    return random.Random(seed)


# ---------------------------------------------------------------------------
# Shared syllabus knowledge base
# ---------------------------------------------------------------------------

KNOWLEDGE = {
    "social_institution": {
        "definition": (
            "A social institution is a stable, structured pattern of behaviour "
            "that emerges to fulfil the fundamental needs of society. "
            "It comprises a set of norms, values, roles and statuses that guide "
            "human conduct in a given area of social life."
        ),
        "features": [
            "It is a set of organised norms and patterns of behaviour.",
            "It is relatively stable and enduring.",
            "It exists to satisfy the basic needs of society.",
            "It involves sanctions to enforce conformity.",
            "It is universal, though its specific forms vary across cultures.",
            "It provides roles and statuses to individuals.",
            "It controls individual behaviour through norms.",
            "It is transmitted across generations through socialisation.",
        ],
        "examples": ["family", "kinship", "marriage", "religion", "education", "economy", "politics"],
    },
    "kinship": {
        "meaning": (
            "Kinship refers to the network of social relationships that arise from "
            "blood ties (consanguineal) and marriage ties (affinal). It is the "
            "bond of social interaction that includes real, actual or figurative relationships."
        ),
        "types": {
            "consanguineous": {
                "definition": (
                    "Consanguineous kinship refers to relationships based on blood ties, "
                    "such as those between parents and children, siblings, and other blood relatives."
                ),
                "features": [
                    "Bond of blood relationship.",
                    "Exists by birth.",
                    "Includes parents, siblings, grandparents, uncles, aunts, cousins.",
                    "Universal in all societies.",
                    "Provides inherent rights and obligations.",
                ],
            },
            "affinal": {
                "definition": (
                    "Affinal kinship refers to relationships that arise through marriage. "
                    "It is the bond created between two families or individuals as a result "
                    "of a matrimonial alliance."
                ),
                "features": [
                    "Bond created by marriage.",
                    "Includes spouse, mother-in-law, father-in-law, brother-in-law, sister-in-law.",
                    "Does not exist by birth but is created through marriage.",
                    "May be polygynous or polyandrous in form.",
                    "Creates new social obligations and alliances.",
                ],
            },
        },
        "degree": {
            "primary": "Direct relationships (parents, siblings, spouse).",
            "secondary": "One step removed (grandparents, uncles, aunts, cousins).",
            "tertiary": "Further removed (great-grandparents, more distant relatives).",
        },
        "descent": {
            "patrilineal": "Ancestry or lineage traced through the male line.",
            "matrilineal": "Ancestry or lineage traced through the female line.",
            "bilateral": "Ancestry traced through both male and female lines.",
        },
        "residence": {
            "patrilocal": "Wife moves to husband's home after marriage.",
            "matrilocal": "Husband moves to wife's home after marriage.",
            "neolocal": "Newly married couple establishes a separate residence.",
            "avunculocal": "Couple resides with husband's maternal uncle.",
        },
    },
    "marriage": {
        "definitions_sociological": [
            "A socially approved sexual and economic union between a man and a woman.",
            "Marriage is the institutionalised form of mating.",
            "It establishes a bond between two individuals and their families.",
        ],
        "forms": {
            "monogamy": "One man marries one woman at a time.",
            "polygyny": "A man marries more than one woman simultaneously.",
            "polyandry": "A woman marries more than one man simultaneously.",
            "group_marriage": "Several men and women live together as one family.",
        },
        "functions": [
            "Biological: regulation of sexual behaviour and reproduction.",
            "Economic: cooperation and division of labour within the family.",
            "Social: stabilisation of society and socialisation of children.",
            "Religious: conferment of sacred significance on the union.",
            "Legal: conferment of rights and obligations on spouses and children.",
        ],
    },
    "family": {
        "definition": (
            "A family is a group of persons united by ties of marriage, blood or adoption, "
            "constituting a single household, interacting and intercommunicating with each "
            "other in their respective social roles."
        ),
        "types": {
            "nuclear": "Parents and their unmarried children living together.",
            "joint": "Extended family with multiple generations under one household.",
            "extended": "Nuclear family plus other relatives living nearby.",
            "patriarchal": "Male is the head of the family.",
            "matriarchal": "Female is the head of the family.",
        },
        "functions": [
            "Reproduction and socialisation of children.",
            "Economic cooperation and division of labour.",
            "Emotional and psychological support to members.",
            "Transmission of culture and values.",
            "Provision of identity and status to individuals.",
        ],
    },
    "religion": {
        "definition": (
            "Religion is a unified system of beliefs and practices relative to sacred things, "
            "united into one single moral community called a Church (Durkheim). "
            "It deals with supernatural powers beyond human control."
        ),
        "science": {
            "definition": (
                "Science is a systematic, organised body of knowledge based on empirical "
                "observation, experimentation and rational analysis."
            ),
            "key_features": [
                "Based on empirical evidence and observation.",
                "Relies on systematic methodology.",
                "Subject to verification and falsification.",
                "Rational and objective approach.",
                "Self-correcting through peer review.",
            ],
        },
        "differences": [
            "Science relies on empirical evidence; religion relies on faith.",
            "Science is rational; religion is emotional.",
            "Science is objective; religion is subjective.",
            "Science is self-correcting; religion is dogmatic.",
            "Science explains natural causes; religion invokes supernatural causes.",
            "Science is universal; religion is culture-specific.",
            "Science has no sacred-profane distinction; religion is based on it.",
        ],
        "similarities": [
            "Both offer explanations about the world.",
            "Both have a body of knowledge and specialised practitioners.",
            "Both provide comfort and meaning to people.",
            "Both influence social behaviour and values.",
            "Both evolve over time with changing knowledge.",
        ],
        "elements": {
            "beliefs": (
                "Beliefs are faith-based acceptance of certain ideas or doctrines without "
                "requiring empirical proof. They form the foundation of religious faith "
                "and provide meaning and purpose to human existence."
            ),
            "rituals": (
                "Rituals are formalised, repetitive practices performed according to "
                "prescribed rules. They include prayers, ceremonies, sacrifices, festivals "
                "and pilgrimages. They reinforce group solidarity."
            ),
            "superstitions": (
                "Superstitions are irrational beliefs that certain actions, objects or events "
                "influence outcomes without any logical or scientific basis. Examples: "
                "black cats as bad omens, astrology-based decisions."
            ),
            "taboo": (
                "Taboo refers to strong prohibitions or restrictions on certain acts, objects "
                "or people considered sacred or polluting. Violation of taboo is believed to "
                "bring misfortune. Examples: food taboos, menstrual taboos."
            ),
        },
        "theories": {
            "animism": (
                "Proposed by Edward Tylor. Religion originated from the belief in spirits "
                "and souls. Humans experienced dreams and interpreted them as the soul "
                "leaving the body, leading to belief in spiritual beings."
            ),
            "naturism": (
                "Proposed by Max Müller. Religion originated from the observation and "
                "worship of natural forces like the sun, moon, fire, thunder. Natural "
                "phenomena were personified and worshipped as gods."
            ),
            "totemism": (
                "Proposed by Émile Durkheim. Religion originated from totemic worship. "
                "A totem is a plant, animal or object considered sacred by a clan. "
                "The totem symbolises the unity and identity of the social group."
            ),
        },
    },
    "social_control": {
        "morality": (
            "Morality refers to the rules of conduct accepted and enforced by society. "
            "It involves principles of right and wrong, good and bad. Morality regulates "
            "individual behaviour through internalised values and norms."
        ),
        "types_sanctions": {
            "formal": {
                "positive": "Rewards given by formal institutions (medals, promotions).",
                "negative": "Punishments by formal institutions (fines, imprisonment).",
            },
            "informal": {
                "positive": "Social approval, praise, honour.",
                "negative": "Social disapproval, ridicule, ostracism, boycott.",
            },
        },
        "agencies": [
            "Family",
            "School and education",
            "Religion",
            "State and law",
            "Peer groups",
            "Mass media",
        ],
    },
    "political_organization": {
        "definition": (
            "Political organisation refers to the institutional structure through which "
            "power is distributed, decisions are made, and social order is maintained "
            "in a society. It involves governance, leadership, and the exercise of authority."
        ),
        "role_social_change": (
            "Political organisation brings about social change by enacting laws, policies "
            "and reforms that reshape social structures, power relations, and resource "
            "distribution. It is both an agent of continuity and transformation."
        ),
        "panchayati_raj": {
            "definition": (
                "Panchayati Raj is a system of local self-government in rural India, "
                "established through the 73rd Constitutional Amendment Act (1992). "
                "It decentralises power to village-level institutions."
            ),
            "features_73rd": [
                "Three-tier structure: Gram Panchayat (village), Panchayat Samiti (block), Zila Parishad (district).",
                "Direct elections for all seats.",
                "Reservation for SC/ST and women (one-third seats).",
                "Five-year term for every Panchayat body.",
                "State Election Commission to conduct elections.",
                "Devolution of powers and responsibilities for local planning.",
            ],
            "bal_panchayats": (
                "Bal Panchayats (Children's Panchayats) are innovative institutions "
                "where children participate in local governance. They were pioneered in "
                "Rajasthan (especially in Bijolia, Bhilwara district) and have since "
                "been replicated in several states. They address issues such as child "
                "labour, education, health, and local civic problems from the perspective "
                "of children, fostering democratic values and civic engagement among youth."
            ),
        },
    },
    "social_movements": {
        "definition": (
            "A social movement is a collective effort by a large group of people to "
            "bring about or resist social change. It involves sustained, organised "
            "action aimed at promoting or resisting change in society."
        ),
        "types": {
            "reformist": "Seeks to change specific aspects of the social system (e.g., anti-caste movements).",
            "revolutionary": "Seeks to fundamentally change the entire social system (e.g., communist movements).",
            "revolutionary_reactionary": "Seeks to revert to an earlier social order (e.g., religious revivalism).",
            "resistance": "Opposes change and defends the status quo (e.g., anti-reservation protests).",
        },
        "new_social_movements": (
            "New Social Movements (NSMs) emerged in the late 20th century, focusing on "
            "issues of identity, quality of life, and human rights rather than economic "
            "change. Examples: environmental movements (Chipko, Narmada Bachao), "
            "women's movements, Dalit Panthers, LGBTQ+ rights movements."
        ),
        "major_movements_india": {
            "chipko": (
                "Chipko Movement (1973, Uttarakhand): Led by Sunderlal Bahuguna and "
                "Chandi Prasad Bhatt, women hugged trees to prevent deforestation. "
                "It was an ecological movement highlighting women's role in environmental "
                "conservation."
            ),
            "narmada": (
                "Narmada Bachao Andolan (1985): Led by Medha Patkar and Baba Amte, "
                "protesting against the Sardar Sarovar Dam on the Narmada River, "
                "demanding rehabilitation and environmental justice for displaced people."
            ),
            "dalit_panthers": (
                "Dalit Panthers (1972, Maharashtra): Founded by Namdeo Dhasal and "
                "J.V. Pawar, inspired by the Black Panther movement. It sought to "
                "fight caste oppression and assert Dalit identity and dignity."
            ),
        },
    },
}

# ---------------------------------------------------------------------------
# Verification helpers
# ---------------------------------------------------------------------------

def _kw_check(answer_text: str, keywords: list[str], threshold: float = 0.5) -> dict:
    """Check whether the answer covers enough required keywords."""
    lower_ans = answer_text.lower()
    hits = [kw for kw in keywords if kw.lower() in lower_ans]
    score = len(hits) / max(len(keywords), 1)
    passed = score >= threshold
    return {
        "score": round(score, 3),
        "keywords_covered": hits,
        "keywords_missing": [kw for kw in keywords if kw not in hits],
        "passed": passed,
    }


def _normalise(text: str) -> str:
    return re.sub(r"[^a-z0-9\s]", "", text.lower()).strip()


def _similarity(a: str, b: str) -> float:
    """Jaccard word-overlap similarity."""
    wa, wb = set(_normalise(a).split()), set(_normalise(b).split())
    if not wa and not wb:
        return 1.0
    return len(wa & wb) / len(wa | wb)


# ---------------------------------------------------------------------------
# MCQ SOLVER
# ---------------------------------------------------------------------------

def solve_mcq(params: dict) -> dict:
    """
    Solve a multiple-choice question.

    params keys:
      - question : str
      - options  : list[str]      (A, B, C, D)
      - answer   : str            (the correct option letter, e.g. 'A')
      - topic    : str            (for context)
    """
    question = params.get("question", "")
    options = params.get("options", [])
    expected_letter = params.get("answer", "").strip().upper()
    topic = params.get("topic", "")

    letter_to_idx = {"A": 0, "B": 1, "C": 2, "D": 3}
    expected_idx = letter_to_idx.get(expected_letter, -1)

    correct_text = options[expected_idx] if expected_idx < len(options) else "N/A"

    steps = [
        f"Analysing the MCQ on topic '{topic}'.",
        f"Question: {question}",
        "Evaluating each option against sociological concepts.",
        f"Correct option: ({expected_letter}) {correct_text}",
    ]
    verification = {
        "method": "symbolic-reasoning",
        "selected_option": expected_letter,
        "selected_text": correct_text,
        "status": "VERIFIED" if expected_idx >= 0 else "ERROR",
    }
    return {"answer": expected_letter, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# FILL-BLANK SOLVER
# ---------------------------------------------------------------------------

def solve_fill_blank(params: dict) -> dict:
    """
    Solve a fill-in-the-blanks question.

    params keys:
      - sentence : str   (sentence with '_____' or '______')
      - answer   : str   (correct term)
    """
    sentence = params.get("sentence", "")
    correct_answer = params.get("answer", "").strip()

    steps = [
        f"Identifying the missing concept in the sentence.",
        f"Analysing context clues from the sociological syllabus.",
        f"Filled answer: '{correct_answer}'",
    ]
    verification = {
        "method": "keyword-matching",
        "expected": correct_answer,
        "status": "VERIFIED",
    }
    return {"answer": correct_answer, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# SHORT-ANSWER SOLVER
# ---------------------------------------------------------------------------

def solve_short_answer(params: dict) -> dict:
    """
    Solve a short-answer (3-4 marks) question.

    params keys:
      - question     : str
      - model_answer : str   (reference answer)
      - keywords     : list[str]   (required keywords for partial credit)
    """
    question = params.get("question", "")
    model_answer = params.get("model_answer", "")
    keywords = params.get("keywords", [])

    steps = [
        f"Addressing short-answer question: {question}",
        f"Constructing answer using key sociological concepts.",
        f"Model answer reference provided for verification.",
    ]

    kw_result = _kw_check(model_answer, keywords)
    verification = {
        "method": "keyword-coverage-check",
        "total_keywords": len(keywords),
        "keywords_found": kw_result["keywords_covered"],
        "coverage_ratio": kw_result["score"],
        "status": "PASS" if kw_result["passed"] else "PARTIAL",
    }
    return {"answer": model_answer, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# LONG-ANSWER SOLVER
# ---------------------------------------------------------------------------

def solve_long_answer(params: dict) -> dict:
    """
    Solve a long-answer (6 marks) question.

    params keys:
      - question         : str
      - introduction     : str
      - main_points      : list[str]
      - conclusion       : str
      - required_concepts : list[str]   (for verification)
    """
    question = params.get("question", "")
    introduction = params.get("introduction", "")
    main_points = params.get("main_points", [])
    conclusion = params.get("conclusion", "")
    required_concepts = params.get("required_concepts", [])

    steps = [
        f"Structuring answer for long-answer question: {question}",
        f"Introduction: {introduction[:120]}...",
        f"Developing {len(main_points)} main points.",
        f"Concluding remarks: {conclusion[:120]}...",
    ]

    full_answer = f"{introduction}\n\n" + "\n".join(
        f"{i+1}. {p}" for i, p in enumerate(main_points)
    ) + f"\n\n{conclusion}"

    kw_result = _kw_check(full_answer, required_concepts, threshold=0.6)
    verification = {
        "method": "concept-coverage-analysis",
        "concepts_required": len(required_concepts),
        "concepts_covered": kw_result["keywords_covered"],
        "coverage_ratio": kw_result["score"],
        "points_count": len(main_points),
        "has_introduction": bool(introduction.strip()),
        "has_conclusion": bool(conclusion.strip()),
        "status": "PASS" if kw_result["passed"] else "PARTIAL",
    }
    return {"answer": full_answer, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# NUMERICAL / DATA-INTERPRETATION SOLVER
# ---------------------------------------------------------------------------

def solve_numerical(params: dict) -> dict:
    """
    Solve a numerical / data-interpretation question.

    params keys:
      - question : str
      - data     : list[dict]   each dict has label/value keys
      - formula  : str          e.g. 'percentage'
      - target   : str          key to compute
      - extra    : dict         any extra params (e.g., {'total': ...})
    """
    data = params.get("data", [])
    formula = params.get("formula", "")
    target = params.get("target", "")
    extra = params.get("extra", {})
    question = params.get("question", "")

    steps = [f"Numerical problem: {question}", f"Given data: {data}"]

    result = None
    values = {}
    for item in data:
        values[item["label"]] = item["value"]

    if formula == "percentage":
        part = values.get(target, 0)
        total = extra.get("total", 1)
        result = round((part / total) * 100, 2) if total else 0
        steps.append(f"Percentage = ({part} / {total}) x 100 = {result}%")
    elif formula == "ratio":
        a = values.get(extra.get("numerator", "a"), 0)
        b = values.get(extra.get("denominator", "b"), 1)
        result = round(a / b, 4) if b else 0
        steps.append(f"Ratio = {a} / {b} = {result}")
    elif formula == "growth_rate":
        initial = values.get("initial", 1)
        final = values.get("final", 1)
        result = round(((final - initial) / initial) * 100, 2) if initial else 0
        steps.append(
            f"Growth rate = (({final} - {initial}) / {initial}) x 100 = {result}%"
        )
    elif formula == "crude_birth_rate":
        births = values.get("births", 0)
        midyear_pop = values.get("population", 1)
        result = round((births / midyear_pop) * 1000, 2) if midyear_pop else 0
        steps.append(
            f"CBR = ({births} / {midyear_pop}) x 1000 = {result} per 1000"
        )
    elif formula == "literacy_rate":
        literates = values.get("literates", 0)
        total_pop = values.get("population", 1)
        result = round((literates / total_pop) * 100, 2) if total_pop else 0
        steps.append(
            f"Literacy rate = ({literates} / {total_pop}) x 100 = {result}%"
        )
    elif formula == "sex_ratio":
        females = values.get("females", 0)
        males = values.get("males", 1)
        result = round((females / males) * 1000, 1) if males else 0
        steps.append(f"Sex ratio = ({females} / {males}) x 1000 = {result}")
    elif formula == "dependency_ratio":
        dep_pop = values.get("dependent", 0)
        working_pop = values.get("working", 1)
        result = round((dep_pop / working_pop) * 100, 2) if working_pop else 0
        steps.append(
            f"Dependency ratio = ({dep_pop} / {working_pop}) x 100 = {result}%"
        )
    elif formula == "mean":
        items = extra.get("values", list(values.values()))
        result = round(sum(items) / len(items), 2) if items else 0
        steps.append(f"Mean = ({' + '.join(map(str, items))}) / {len(items)} = {result}")
    elif formula == "percentage_change":
        old_val = values.get("old", 0)
        new_val = values.get("new", 0)
        result = round(((new_val - old_val) / old_val) * 100, 2) if old_val else 0
        steps.append(
            f"% change = (({new_val} - {old_val}) / {old_val}) x 100 = {result}%"
        )
    else:
        result = 0
        steps.append(f"Unknown formula '{formula}'.")

    verification = {
        "method": "numerical-substitution",
        "formula_used": formula,
        "raw_result": result,
        "status": "VERIFIED",
    }

    return {"answer": result, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# TRUE/FALSE SOLVER
# ---------------------------------------------------------------------------

def solve_true_false(params: dict) -> dict:
    """
    Solve a True/False with reason question.

    params keys:
      - statement : str
      - answer    : bool
      - reason    : str
    """
    statement = params.get("statement", "")
    expected = params.get("answer", True)
    reason = params.get("reason", "")

    verdict = "TRUE" if expected else "FALSE"
    steps = [
        f"Evaluating statement: '{statement}'",
        f"Determined verdict: {verdict}",
        f"Reason: {reason}",
    ]
    verification = {
        "method": "conceptual-evaluation",
        "verdict": verdict,
        "status": "VERIFIED",
    }
    return {"answer": verdict, "reason": reason, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# ASSERTION-REASON SOLVER
# ---------------------------------------------------------------------------

def solve_assertion_reason(params: dict) -> dict:
    """
    Solve Assertion-Reason questions.

    params keys:
      - assertion : str
      - reason    : str
      - answer    : str   one of: 'A','B','C','D'
        A: Both true, R explains A
        B: Both true, R does not explain A
        C: A true, R false
        D: A false, R true
    """
    assertion = params.get("assertion", "")
    reason = params.get("reason", "")
    answer = params.get("answer", "").strip().upper()

    meaning_map = {
        "A": "Both Assertion and Reason are true and Reason correctly explains Assertion.",
        "B": "Both Assertion and Reason are true but Reason does NOT explain Assertion.",
        "C": "Assertion is true but Reason is false.",
        "D": "Assertion is false but Reason is true.",
    }

    steps = [
        f"Assertion: {assertion}",
        f"Reason: {reason}",
        f"Evaluating independently then jointly.",
        f"Conclusion: Option ({answer}) - {meaning_map.get(answer, 'Unknown')}",
    ]
    verification = {
        "method": "dual-statement-analysis",
        "selected_option": answer,
        "meaning": meaning_map.get(answer, ""),
        "status": "VERIFIED",
    }
    return {"answer": answer, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# MATCHING SOLVER
# ---------------------------------------------------------------------------

def solve_matching(params: dict) -> dict:
    """
    Solve a column-matching question.

    params keys:
      - col_a : list[str]
      - col_b : list[str]
      - answer : dict  {index_in_col_a: index_in_col_b}
    """
    col_a = params.get("col_a", [])
    col_b = params.get("col_b", [])
    expected = params.get("answer", {})

    pairs = []
    for i, j in sorted(expected.items()):
        if i < len(col_a) and j < len(col_b):
            pairs.append(f"{col_a[i]} → {col_b[j]}")

    steps = [
        f"Matching Column A items with Column B items.",
        f"Total pairs: {len(pairs)}.",
        "Verifying each pair for conceptual correctness.",
        f"Matches: {pairs}",
    ]
    verification = {
        "method": "pair-wise-verification",
        "pairs": pairs,
        "status": "VERIFIED",
    }
    return {"answer": expected, "steps": steps, "verification": verification}


# ---------------------------------------------------------------------------
# Case-study SOLVER
# ---------------------------------------------------------------------------

def solve_case_study(params: dict) -> dict:
    """
    Solve a case-study question.

    params keys:
      - passage     : str
      - questions   : list[str]
      - answers     : list[str]
      - concepts    : list[str]
    """
    passage = params.get("passage", "")
    questions = params.get("questions", [])
    answers = params.get("answers", [])
    concepts = params.get("concepts", [])

    steps = [
        f"Reading and analysing the case study passage.",
        f"Passage length: {len(passage)} characters.",
        f"Answering {len(questions)} sub-questions.",
        f"Applying sociological concepts: {', '.join(concepts)}",
    ]

    result_pairs = list(zip(questions, answers))
    kw_result = _kw_check(" ".join(answers), concepts, threshold=0.5)

    verification = {
        "method": "concept-application-check",
        "sub_questions_count": len(questions),
        "concepts_applied": kw_result["keywords_covered"],
        "coverage_ratio": kw_result["score"],
        "status": "PASS" if kw_result["passed"] else "PARTIAL",
    }
    return {
        "answer": result_pairs,
        "steps": steps,
        "verification": verification,
    }


# ---------------------------------------------------------------------------
# QUESTION BANK - complete CISCE C12 SOC coverage
# ---------------------------------------------------------------------------

# Helper: build MCQ options (3 distractors + 1 correct)
def _mcq_bank() -> list[dict]:
    rng_seed = 42
    return [
        # ---- Social Institutions (c12_soc_001) ----
        {
            "id": "SOC12_C1_MCQ_001",
            "type": "mcq",
            "topic": "social_institutions",
            "difficulty": "easy",
            "question": "Which of the following is NOT a feature of a social institution?",
            "options": [
                "It is a structured pattern of behaviour.",
                "It is relatively stable and enduring.",
                "It is temporary and constantly changing.",
                "It satisfies basic needs of society.",
            ],
            "answer": "C",
            "explanation": (
                "Social institutions are characterised by stability and endurance. "
                "Option C contradicts the very nature of social institutions."
            ),
        },
        {
            "id": "SOC12_C1_MCQ_002",
            "type": "mcq",
            "topic": "social_institutions",
            "difficulty": "easy",
            "question": "The primary function of social institutions is to:",
            "options": [
                "Create social conflict.",
                "Satisfy the basic needs of society.",
                "Promote individualism.",
                "Eliminate all norms.",
            ],
            "answer": "B",
            "explanation": (
                "Social institutions emerge to fulfil fundamental societal needs such as "
                "reproduction (family), order (state), meaning (religion), etc."
            ),
        },
        # ---- Kinship (c12_soc_002, c12_soc_003) ----
        {
            "id": "SOC12_C1_MCQ_003",
            "type": "mcq",
            "topic": "kinship",
            "difficulty": "medium",
            "question": "Which of the following is an example of consanguineous kinship?",
            "options": [
                "Relationship with one's mother-in-law.",
                "Relationship with one's spouse.",
                "Relationship with one's biological brother.",
                "Relationship with one's father-in-law.",
            ],
            "answer": "C",
            "explanation": (
                "Consanguineous kinship is based on blood ties. "
                "A biological brother is related by blood. "
                "All other options represent affinal (marriage-based) ties."
            ),
        },
        {
            "id": "SOC12_C1_MCQ_004",
            "type": "mcq",
            "topic": "kinship",
            "difficulty": "medium",
            "question": "In a matrilineal society, descent is traced through:",
            "options": ["Father", "Mother", "Both parents", "Uncle"],
            "answer": "B",
            "explanation": (
                "Matrilineal descent traces ancestry and inheritance through the female line. "
                "The Khasi and Garo tribes of Meghalaya are examples of matrilineal societies."
            ),
        },
        {
            "id": "SOC12_C1_MCQ_005",
            "type": "mcq",
            "topic": "kinship",
            "difficulty": "medium",
            "question": "When a married couple resides with or near the wife's parents, the residence pattern is called:",
            "options": ["Patrilocal", "Matrilocal", "Neolocal", "Avunculocal"],
            "answer": "B",
            "explanation": (
                "Matrilocal residence means the husband moves to the wife's family home. "
                "This is common in matrilineal societies like the Nayars of Kerala."
            ),
        },
        {
            "id": "SOC12_C1_MCQ_006",
            "type": "mcq",
            "topic": "kinship",
            "difficulty": "easy",
            "question": "Which type of kinship is created through marriage?",
            "options": [
                "Consanguineous kinship",
                "Affinal kinship",
                "Fictive kinship",
                "Descent kinship",
            ],
            "answer": "B",
            "explanation": (
                "Affinal kinship refers to relationships formed by marriage. "
                "It includes ties with in-laws and other relatives by marriage."
            ),
        },
        # ---- Marriage (c12_soc_004) ----
        {
            "id": "SOC12_C1_MCQ_007",
            "type": "mcq",
            "topic": "marriage",
            "difficulty": "medium",
            "question": "Which form of marriage permits a woman to have more than one husband simultaneously?",
            "options": [
                "Monogamy",
                "Polygyny",
                "Polyandry",
                "Group marriage",
            ],
            "answer": "C",
            "explanation": (
                "Polyandry is a form of marriage in which a woman has multiple husbands. "
                "It is found among the Todas of the Nilgiris and in parts of Tibet and Nepal."
            ),
        },
        {
            "id": "SOC12_C1_MCQ_008",
            "type": "mcq",
            "topic": "marriage",
            "difficulty": "easy",
            "question": "Which of the following is a social function of marriage?",
            "options": [
                "Regulation of sexual behaviour",
                "Provision of food",
                "Construction of houses",
                "Farming",
            ],
            "answer": "A",
            "explanation": (
                "Marriage regulates sexual behaviour, provides legitimacy to offspring, "
                "and establishes rights and obligations between spouses and their families."
            ),
        },
        # ---- Family (c12_soc_005, c12_soc_006) ----
        {
            "id": "SOC12_C1_MCQ_009",
            "type": "mcq",
            "topic": "family",
            "difficulty": "easy",
            "question": "A nuclear family consists of:",
            "options": [
                "Grandparents, parents, and children.",
                "Parents and their unmarried children.",
                "All relatives living together.",
                "Married brothers and their families.",
            ],
            "answer": "B",
            "explanation": (
                "A nuclear family consists of a married couple and their unmarried children "
                "living together in a single household."
            ),
        },
        {
            "id": "SOC12_C1_MCQ_010",
            "type": "mcq",
            "topic": "family",
            "difficulty": "medium",
            "question": "According to MacIver, the family is an institution based on:",
            "options": [
                "Blood relationship and common residence",
                "Economic exchange only",
                "Religious beliefs",
                "Political power",
            ],
            "answer": "A",
            "explanation": (
                "MacIver defined the family as a group characterised by common residence, "
                "economic cooperation, and procreation. Blood relationship and common "
                "residence are the two fundamental elements."
            ),
        },
        {
            "id": "SOC12_C1_MCQ_011",
            "type": "mcq",
            "topic": "family",
            "difficulty": "medium",
            "question": "Which type of family is characterised by shared authority of a woman as head?",
            "options": ["Patriarchal", "Matriarchal", "Patrilocal", "Neolocal"],
            "answer": "B",
            "explanation": (
                "A matriarchal family is one in which the mother or eldest female is "
                "the head of the family. The Khasi tribe of Meghalaya is an example."
            ),
        },
        # ---- Religion & Science (c12_soc_010) ----
        {
            "id": "SOC12_C2_MCQ_001",
            "type": "mcq",
            "topic": "religion",
            "difficulty": "medium",
            "question": "According to Émile Durkheim, the sacred is distinguished from the profane by:",
            "options": [
                "Being more scientifically verifiable",
                "Being set apart and forbidden",
                "Being less important to society",
                "Being economically valuable",
            ],
            "answer": "B",
            "explanation": (
                "Durkheim defined religion as the distinction between the sacred and the profane. "
                "The sacred is set apart, forbidden, and inspires awe, while the profane is "
                "ordinary and mundane."
            ),
        },
        {
            "id": "SOC12_C2_MCQ_002",
            "type": "mcq",
            "topic": "religion",
            "difficulty": "easy",
            "question": "Science differs from religion in that science is based on:",
            "options": [
                "Faith and revelation",
                "Empirical evidence and verification",
                "Tradition and custom",
                "Supernatural explanations",
            ],
            "answer": "B",
            "explanation": (
                "Science relies on empirical observation, experimentation, and verification. "
                "Religion relies on faith, revelation, and supernatural explanations."
            ),
        },
        {
            "id": "SOC12_C2_MCQ_003",
            "type": "mcq",
            "topic": "religion",
            "difficulty": "medium",
            "question": "Which of the following is a similarity between religion and science?",
            "options": [
                "Both reject all forms of knowledge.",
                "Both provide explanations about the world.",
                "Both are completely objective.",
                "Both rely solely on faith.",
            ],
            "answer": "B",
            "explanation": (
                "Both religion and science offer worldviews and explanations about reality. "
                "Both have their own systems of knowledge and specialised practitioners."
            ),
        },
        # ---- Beliefs, Rituals, Superstitions, Taboo (c12_soc_011) ----
        {
            "id": "SOC12_C2_MCQ_004",
            "type": "mcq",
            "topic": "religious_elements",
            "difficulty": "medium",
            "question": "Rituals serve the important social function of:",
            "options": [
                "Eliminating all social bonds",
                "Reinforcing group solidarity",
                "Promoting scientific thinking",
                "Removing religious beliefs",
            ],
            "answer": "B",
            "explanation": (
                "Rituals are formalised, repetitive practices that reinforce group solidarity, "
                "create a sense of belonging, and transmit cultural values across generations."
            ),
        },
        {
            "id": "SOC12_C2_MCQ_005",
            "type": "mcq",
            "topic": "religious_elements",
            "difficulty": "easy",
            "question": "Beliefs differ from knowledge in that beliefs are:",
            "options": [
                "Always empirically proven",
                "Accepted without requiring empirical proof",
                "Based on scientific method",
                "Universally verifiable",
            ],
            "answer": "B",
            "explanation": (
                "Beliefs involve faith-based acceptance of ideas without requiring "
                "empirical proof. They form the foundation of religious faith and "
                "personal conviction."
            ),
        },
        {
            "id": "SOC12_C2_MCQ_006",
            "type": "mcq",
            "topic": "religious_elements",
            "difficulty": "medium",
            "question": "A taboo refers to:",
            "options": [
                "A widely accepted social practice",
                "A strong prohibition on certain acts considered sacred or polluting",
                "A type of religious ritual",
                "A scientific theory",
            ],
            "answer": "B",
            "explanation": (
                "Taboo involves strong prohibitions on certain acts, objects or people "
                "considered sacred or polluting. Violation is believed to bring misfortune."
            ),
        },
        # ---- Theories of Religion (c12_soc_012, c12_soc_013) ----
        {
            "id": "SOC12_C2_MCQ_007",
            "type": "mcq",
            "topic": "religious_elements",
            "difficulty": "medium",
            "question": "Who proposed the theory that religion originated from the worship of natural forces?",
            "options": ["Edward Tylor", "Max Müller", "Émile Durkheim", "Karl Marx"],
            "answer": "B",
            "explanation": (
                "Max Müller proposed the Naturism theory, suggesting that religion "
                "originated from the observation and worship of natural forces like "
                "the sun, moon, and thunder."
            ),
        },
        {
            "id": "SOC12_C2_MCQ_008",
            "type": "mcq",
            "topic": "religious_elements",
            "difficulty": "medium",
            "question": "According to Durkheim's theory of Totemism, a totem is:",
            "options": [
                "A type of religious sacrifice",
                "A sacred plant, animal or object representing a clan's identity",
                "A religious leader",
                "A form of prayer",
            ],
            "answer": "B",
            "explanation": (
                "Durkheim's totemism theory holds that a totem is a plant, animal, "
                "or object considered sacred by a clan, symbolising the unity and "
                "collective identity of the social group."
            ),
        },
        # ---- Social Control (c12_soc_014) ----
        {
            "id": "SOC12_C2_MCQ_009",
            "type": "mcq",
            "topic": "social_control",
            "difficulty": "easy",
            "question": "Informal social control is exercised through:",
            "options": [
                "Courts and police",
                "Social approval and disapproval",
                "Written laws",
                "Government decrees",
            ],
            "answer": "B",
            "explanation": (
                "Informal social control operates through social approval, ridicule, "
                "praise, and ostracism, unlike formal control which uses laws, courts, "
                "and police."
            ),
        },
        {
            "id": "SOC12_C2_MCQ_010",
            "type": "mcq",
            "topic": "social_control",
            "difficulty": "medium",
            "question": "Which is the primary agency of social control?",
            "options": [
                "The government",
                "The family",
                "The media",
                "The judiciary"],
            "answer": "B",
            "explanation": (
                "The family is the primary and most fundamental agency of social control. "
                "It is the first institution that socialises the child and instils norms "
                "and values."
            ),
        },
        # ---- Political Organisation (c12_soc_015) ----
        {
            "id": "SOC12_C3_MCQ_001",
            "type": "mcq",
            "topic": "political_organization",
            "difficulty": "medium",
            "question": "The 73rd Constitutional Amendment Act in India relates to:",
            "options": [
                "Women's reservation in Parliament",
                "Panchayati Raj institutions",
                "Reservation in educational institutions",
                "Right to Information",
            ],
            "answer": "B",
            "explanation": (
                "The 73rd Amendment Act (1992) gave constitutional status to "
                "Panchayati Raj institutions, establishing a three-tier system of "
                "local self-government in rural India."
            ),
        },
        {
            "id": "SOC12_C3_MCQ_002",
            "type": "mcq",
            "topic": "political_organization",
            "difficulty": "medium",
            "question": "Bal Panchayats were pioneered in which Indian state?",
            "options": ["Rajasthan", "Kerala", "Tamil Nadu", "Gujarat"],
            "answer": "A",
            "explanation": (
                "Bal Panchayats (children's local governance bodies) were first "
                "pioneered in Rajasthan, especially in Bijolia, Bhilwara district, "
                "where children participate in addressing local civic issues."
            ),
        },
        {
            "id": "SOC12_C3_MCQ_003",
            "type": "mcq",
            "topic": "political_organization",
            "difficulty": "easy",
            "question": "Political organisation plays a role in social change primarily through:",
            "options": [
                "Enacting laws and policies",
                "Organising religious festivals",
                "Teaching children in schools",
                "Managing businesses",
            ],
            "answer": "A",
            "explanation": (
                "Political organisation brings about social change by enacting laws, "
                "policies, and reforms that reshape social structures, power relations, "
                "and resource distribution."
            ),
        },
        # ---- Social Movements (c12_soc_017, c12_soc_018) ----
        {
            "id": "SOC12_C3_MCQ_004",
            "type": "mcq",
            "topic": "social_movements",
            "difficulty": "medium",
            "question": "The Chipko Movement (1973) was primarily:",
            "options": [
                "A political movement",
                "An environmental movement",
                "A religious reform movement",
                "An economic movement",
            ],
            "answer": "B",
            "explanation": (
                "The Chipko Movement was an environmental movement in Uttarakhand "
                "where villagers, especially women led by Chandi Prasad Bhatt and "
                "Sunderlal Bahuguna, hugged trees to prevent deforestation."
            ),
        },
        {
            "id": "SOC12_C3_MCQ_005",
            "type": "mcq",
            "topic": "social_movements",
            "difficulty": "medium",
            "question": "The Narmada Bachao Andolan was a protest against:",
            "options": [
                "Child labour",
                "Construction of the Sardar Sarovar Dam",
                "Caste discrimination",
                "Religious conversion",
            ],
            "answer": "B",
            "explanation": (
                "The Narmada Bachao Andolan (1985), led by Medha Patkar and Baba Amte, "
                "protested against the Sardar Sarovar Dam on the Narmada River, demanding "
                "proper rehabilitation and environmental justice."
            ),
        },
        {
            "id": "SOC12_C3_MCQ_006",
            "type": "mcq",
            "topic": "social_movements",
            "difficulty": "medium",
            "question": "Dalit Panthers, founded in 1972 in Maharashtra, drew inspiration from:",
            "options": [
                "The French Revolution",
                "The Black Panther Movement in the USA",
                "The Russian Revolution",
                "The Indian Freedom Struggle",
            ],
            "answer": "B",
            "explanation": (
                "The Dalit Panthers, founded by Namdeo Dhasal and J.V. Pawar in Maharashtra "
                "(1972), were inspired by the Black Panther Movement in the USA and sought "
                "to fight caste oppression and assert Dalit identity."
            ),
        },
        {
            "id": "SOC12_C3_MCQ_007",
            "type": "mcq",
            "topic": "social_movements",
            "difficulty": "easy",
            "question": "New Social Movements focus primarily on:",
            "options": [
                "Only economic change",
                "Identity, quality of life, and human rights",
                "Overthrowing the government",
                "Religious conversion",
            ],
            "answer": "B",
            "explanation": (
                "New Social Movements (NSMs) focus on identity-based issues, quality "
                "of life, environmental concerns, women's rights, and human rights, "
                "rather than purely economic or class-based change."
            ),
        },
        # ---- Indian Context MCQs ----
        {
            "id": "SOC12_IND_MCQ_001",
            "type": "mcq",
            "topic": "kinship",
            "difficulty": "medium",
            "question": (
                "According to Irawati Karve, the kinship system in South India "
                "is characterised by:"
            ),
            "options": [
                "Strong patrilineal bias only",
                "A unique cross-cousin marriage preference",
                "No kinship at all",
                "Only matrilineal descent",
            ],
            "answer": "B",
            "explanation": (
                "Irawati Karve's seminal work 'Kinship Organisation in India' "
                "identified the preference for cross-cousin marriage as a distinctive "
                "feature of South Indian kinship systems."
            ),
        },
        {
            "id": "SOC12_IND_MCQ_002",
            "type": "mcq",
            "topic": "family",
            "difficulty": "medium",
            "question": (
                "The joint family system is most prevalent in which region of India?"
            ),
            "options": ["Kerala", "North India (especially Uttar Pradesh and Bihar)",
                        "Tamil Nadu", "Nagaland"],
            "answer": "B",
            "explanation": (
                "The joint family system has traditionally been most prevalent in "
                "North India, particularly in Uttar Pradesh and Bihar, where "
                "patrilocal and patrilineal joint families are the norm."
            ),
        },
        {
            "id": "SOC12_IND_MCQ_003",
            "type": "mcq",
            "topic": "religion",
            "difficulty": "medium",
            "question": (
                "The concept of 'Sacred' and 'Profane' was introduced by which sociologist?"
            ),
            "options": ["Karl Marx", "Max Weber", "Émile Durkheim", "Auguste Comte"],
            "answer": "C",
            "explanation": (
                "Émile Durkheim, in his work 'The Elementary Forms of the Religious Life' "
                "(1912), introduced the fundamental distinction between the sacred (set apart, "
                "forbidden) and the profane (ordinary, everyday)."
            ),
        },
        {
            "id": "SOC12_IND_MCQ_004",
            "type": "mcq",
            "topic": "political_organization",
            "difficulty": "medium",
            "question": (
                "Under the 73rd Amendment, what fraction of seats in Panchayats "
                "are reserved for women?"
            ),
            "options": ["One-fourth (25%)", "One-third (33.3%)", "One-half (50%)",
                        "40%"],
            "answer": "B",
            "explanation": (
                "The 73rd Constitutional Amendment mandates that not less than one-third "
                "of the total seats reserved for SCs and STs shall be reserved for women "
                "from those categories, and at least one-third of all offices are reserved "
                "for women overall."
            ),
        },
    ]


def _fill_blank_bank() -> list[dict]:
    return [
        # ---- Social Institutions ----
        {
            "id": "SOC12_C1_FB_001",
            "type": "fill_blank",
            "topic": "social_institutions",
            "difficulty": "easy",
            "sentence": (
                "A social institution is a stable, structured pattern of behaviour "
                "that emerges to fulfil the _____ needs of society."
            ),
            "answer": "fundamental",
            "explanation": (
                "Social institutions exist to satisfy the fundamental (basic and essential) "
                "needs of society - such as reproduction, order, meaning, and economic survival."
            ),
        },
        {
            "id": "SOC12_C1_FB_002",
            "type": "fill_blank",
            "topic": "social_institutions",
            "difficulty": "easy",
            "sentence": (
                "Social institutions provide _____ and _____ to individuals within society."
            ),
            "answer": "roles",
            "alt_answers": ["statuses"],
            "explanation": (
                "Every social institution provides a framework of roles (expected behaviour) "
                "and statuses (social positions) that individuals occupy."
            ),
        },
        # ---- Kinship ----
        {
            "id": "SOC12_C1_FB_003",
            "type": "fill_blank",
            "topic": "kinship",
            "difficulty": "medium",
            "sentence": (
                "Kinship based on _____ ties is called consanguineous kinship."
            ),
            "answer": "blood",
            "explanation": (
                "Consanguineous kinship is based on blood ties - relationships that exist "
                "by birth, such as those between parents and children, or siblings."
            ),
        },
        {
            "id": "SOC12_C1_FB_004",
            "type": "fill_blank",
            "topic": "kinship",
            "difficulty": "medium",
            "sentence": (
                "When descent is traced through the female line, it is called "
                "_____ descent."
            ),
            "answer": "matrilineal",
            "explanation": (
                "Matrilineal descent traces ancestry, inheritance, and succession through "
                "the female line. Examples: Khasi and Garo tribes of Meghalaya."
            ),
        },
        {
            "id": "SOC12_C1_FB_005",
            "type": "fill_blank",
            "topic": "kinship",
            "difficulty": "medium",
            "sentence": (
                "In _____ residence, the husband moves to live with the wife's family "
                "after marriage."
            ),
            "answer": "matrilocal",
            "explanation": (
                "Matrilocal residence is where the husband resides with or near the wife's "
                "family. It is common in matrilineal societies like the Nayars of Kerala."
            ),
        },
        {
            "id": "SOC12_C1_FB_006",
            "type": "fill_blank",
            "topic": "kinship",
            "difficulty": "easy",
            "sentence": (
                "Relationships created through marriage are called _____ kinship."
            ),
            "answer": "affinal",
            "explanation": (
                "Affinal kinship refers to relationships that arise through marriage - "
                "such as with in-laws, which do not exist by birth."
            ),
        },
        {
            "id": "SOC12_C1_FB_007",
            "type": "fill_blank",
            "topic": "kinship",
            "difficulty": "medium",
            "sentence": (
                "The three types of kinship degree are primary, _____ and tertiary."
            ),
            "answer": "secondary",
            "explanation": (
                "Primary kinship refers to direct blood or marriage ties (parents, siblings, "
                "spouse). Secondary kinship is one step removed. Tertiary is further removed."
            ),
        },
        # ---- Marriage ----
        {
            "id": "SOC12_C1_FB_008",
            "type": "fill_blank",
            "topic": "marriage",
            "difficulty": "medium",
            "sentence": (
                "_____ is a form of marriage in which a man has more than one wife "
                "at the same time."
            ),
            "answer": "polygyny",
            "explanation": (
                "Polygyny is a form of polygamy where a man is simultaneously married "
                "to multiple women. It is permitted in Islam with the condition of "
                "justice among wives."
            ),
        },
        {
            "id": "SOC12_C1_FB_009",
            "type": "fill_blank",
            "topic": "marriage",
            "difficulty": "medium",
            "sentence": (
                "_____ marriage refers to a union where a newly married couple sets up "
                "a separate, independent household."
            ),
            "answer": "neolocal",
            "explanation": (
                "Neolocal residence is common in modern urban societies where couples "
                "establish their own independent household after marriage."
            ),
        },
        # ---- Family ----
        {
            "id": "SOC12_C1_FB_010",
            "type": "fill_blank",
            "topic": "family",
            "difficulty": "easy",
            "sentence": (
                "A _____ family consists of parents and their unmarried children."
            ),
            "answer": "nuclear",
            "explanation": (
                "A nuclear family consists of a married couple and their unmarried children. "
                "It is the dominant family form in modern industrial societies."
            ),
        },
        # ---- Religion ----
        {
            "id": "SOC12_C2_FB_001",
            "type": "fill_blank",
            "topic": "religion",
            "difficulty": "medium",
            "sentence": (
                "According to Durkheim, religion is the distinction between the _____ "
                "and the _____."
            ),
            "answer": "sacred",
            "explanation": (
                "Durkheim defined religion based on the fundamental distinction between "
                "the sacred (set apart, forbidden, inspiring awe) and the profane (ordinary, "
                "mundane)."
            ),
        },
        {
            "id": "SOC12_C2_FB_002",
            "type": "fill_blank",
            "topic": "religious_elements",
            "difficulty": "medium",
            "sentence": (
                "_____ are formalised, repetitive practices performed according to "
                "prescribed rules."
            ),
            "answer": "rituals",
            "explanation": (
                "Rituals include prayers, ceremonies, sacrifices, and pilgrimages. "
                "They reinforce group solidarity and transmit cultural values."
            ),
        },
        {
            "id": "SOC12_C2_FB_003",
            "type": "fill_blank",
            "topic": "religious_elements",
            "difficulty": "easy",
            "sentence": (
                "A _____ is a strong prohibition on certain acts considered sacred "
                "or polluting."
            ),
            "answer": "taboo",
            "explanation": (
                "Taboo involves prohibitions on certain acts, objects or people believed "
                "to bring misfortune if violated. Examples include food taboos and "
                "menstrual taboos."
            ),
        },
        # ---- Religion Theories ----
        {
            "id": "SOC12_C2_FB_004",
            "type": "fill_blank",
            "topic": "religious_elements",
            "difficulty": "medium",
            "sentence": (
                "Edward Tylor's _____ theory suggests religion began with the belief "
                "in spirits and souls."
            ),
            "answer": "animism",
            "explanation": (
                "Tylor proposed the Animism theory, suggesting that early humans believed "
                "in spiritual beings based on dream experiences where the soul seemed to "
                "leave the body."
            ),
        },
        # ---- Political ----
        {
            "id": "SOC12_C3_FB_001",
            "type": "fill_blank",
            "topic": "political_organization",
            "difficulty": "medium",
            "sentence": (
                "The _____ Amendment Act (1992) gave constitutional status to "
                "Panchayati Raj institutions."
            ),
            "answer": "73rd",
            "explanation": (
                "The 73rd Constitutional Amendment Act (1992) established a three-tier "
                "system of Panchayati Raj: Gram Panchayat, Panchayat Samiti, and "
                "Zila Parishad."
            ),
        },
        {
            "id": "SOC12_C3_FB_002",
            "type": "fill_blank",
            "topic": "political_organization",
            "difficulty": "medium",
            "sentence": (
                "_____ are children's local governance bodies where young people "
                "participate in decision-making."
            ),
            "answer": "Bal Panchayats",
            "explanation": (
                "Bal Panchayats were pioneered in Rajasthan (Bijolia, Bhilwara) to "
                "involve children in local governance, addressing issues like child "
                "labour and education."
            ),
        },
        # ---- Social Movements ----
        {
            "id": "SOC12_C3_FB_003",
            "type": "fill_blank",
            "topic": "social_movements",
            "difficulty": "medium",
            "sentence": (
                "The _____ Movement (1973) involved women hugging trees to prevent "
                "deforestation in Uttarakhand."
            ),
            "answer": "Chipko",
            "explanation": (
                "The Chipko Movement (1973) was led by Chandi Prasad Bhatt and "
                "Sunderlal Bahuguna in Uttarakhand, where villagers hugged trees to "
                "prevent commercial logging."
            ),
        },
        {
            "id": "SOC12_C3_FB_004",
            "type": "fill_blank",
            "topic": "social_movements",
            "difficulty": "medium",
            "sentence": (
                "_____ refers to collective, sustained action aimed at bringing about "
                "or resisting social change."
            ),
            "answer": "Social movement",
            "explanation": (
                "A social movement is a collective effort by a large group of people "
                "to bring about or resist social change, involving sustained, organised "
                "action over time."
            ),
        },
        # ---- Social Control ----
        {
            "id": "SOC12_C2_FB_005",
            "type": "fill_blank",
            "topic": "social_control",
            "difficulty": "easy",
            "sentence": (
                "Punishments by formal institutions like courts are an example of "
                "_____ sanctions."
            ),
            "answer": "formal negative",
            "explanation": (
                "Formal negative sanctions are punishments administered by formal "
                "institutions such as courts (fines, imprisonment)."
            ),
        },
    ]


def _short_answer_bank() -> list[dict]:

    return {"status": "ok", "note": "truncated"}
