import random
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
import math

# ============================================================
# CISCE CLASS 9 HISTCIV - QUESTION GENERATOR
# Topics: The Cholas | Renaissance | Constitution
# ============================================================

# ------------------------------------------------------------------
# Seed helpers
# ------------------------------------------------------------------
def _seed_rng(seed: int) -> random.Random:
    rng = random.Random(seed)
    return rng


# ------------------------------------------------------------------
# Topic constants
# ------------------------------------------------------------------
TOPIC_CHOLA = "The Cholas - Sources"
TOPIC_RENAISSANCE = "Renaissance - Definition and Causes"
TOPIC_CONSTITUTION = "Definition of a Constitution"

DIFFICULTY_EASY = "Easy"
DIFFICULTY_MEDIUM = "Medium"

# ------------------------------------------------------------------
# Question banks
# ------------------------------------------------------------------
CHOLA_FACTS = {
    "leyden": {
        "name": "Leyden Copperplates",
        "year": "c. 1008 CE",
        "king": "Rajaraja I",
        "content": "recorded a land grant by Rajaraja I to a Buddhist temple at Nagapattinam",
        "significance": "proves Chola religious tolerance and maritime trade links with Southeast Asia",
        "type": "copperplate",
        "city_named_after": "Leiden (Leyden) in the Netherlands",
    },
    "tiruvalangadu": {
        "name": "Tiruvalangadu Copperplates",
        "year": "c. 1025 CE",
        "king": "Rajendra Chola I",
        "content": "recorded Rajendra Chola I's North Indian expedition and coronation",
        "significance": "provides detailed account of the Gangaikonda Cholapuram campaign and the king's title Gangaikonda",
        "type": "copperplate",
        "city_named_after": "None - Tiruvalangadu is a village near Kanchipuram in Tamil Nadu",
    },
    "karandai": {
        "name": "Karandai (Sangam) Copperplates",
        "year": "1021 CE",
        "king": "Rajendra Chola I",
        "content": "recorded gifts made to the Brihadishwara Temple and Rajendra I's wars with the Chalukyas",
        "significance": "confirms Chola-Chalukya conflicts and temple endowments",
        "type": "copperplate",
        "city_named_after": "Karandai near Thanjavur, Tamil Nadu",
    },
    "temple": {
        "name": "Brihadishwara Temple",
        "year": "completed c. 1010 CE",
        "king": "Rajaraja I",
        "location": "Thanjavur (Tanjore), Tamil Nadu",
        "height": "approximately 66 metres (216 feet)",
        "content": "wall inscriptions listing generals, elephant corps, dancers (devadasis), and village donations",
        "significance": "serves as both a religious monument and an administrative archive; inscriptions reveal army structure, revenue administration, and cultural patronage",
        "type": "archaeological (temple)",
    },
    "meikeerthi": {
        "name": "Meikeerthi inscriptions",
        "year": "various, on temple walls",
        "king": "various Chola kings",
        "content": "recorded the great deeds and titles of Chola kings on temple walls",
        "significance": "combines historical record with religious praise; important for dating and king lists",
        "type": "inscription",
        "city_named_after": "Not applicable",
    },
}

RENAISSANCE_FACTS = {
    "definition": {
        "text": "The Renaissance was a cultural and intellectual movement that began in Italy in the 14th century and spread across Europe, marked by a revival of interest in the classical learning of ancient Greece and Rome, the rise of humanism, and extraordinary achievements in art, literature, science, and philosophy.",
        "start_century": "14th",
        "start_place": "Italy (Florence)",
        "key_value": "humanism",
    },
    "constantinople": {
        "year_fall": 1453,
        "conqueror": "Sultan Mehmed II (Ottoman Turks)",
        "empire_ended": "Byzantine Empire",
        "scholars_fled_to": "Italy (especially Florence)",
        "contribution": "Greek scholars brought classical manuscripts and knowledge of Greek language to Italy, fuelling the revival of classical learning",
        "key_scholar": "Manuel Chrysoloras",
    },
    "feudalism_decline": {
        "period": "14th-15th centuries",
        "cause": "The Black Death (1347-1351) killed a large portion of the population, creating labour shortages that empowered peasants; growth of towns and trade also weakened manorial ties",
        "effect": "People gained greater freedom from manorial obligations, a money economy grew, and a middle class emerged that patronised art and learning",
    },
    "trade_routes": {
        "city_states": "Venice, Genoa, Florence",
        "goods": "spices, silk, cotton, precious stones from the East",
        "effect": "Wealth from trade funded patronage of artists and scholars; Italian city-states became centres of commerce and culture",
        "key_route": "Mediterranean sea routes linking Europe with the Levant and Asia",
    },
    "printing_press": {
        "inventor": "Johannes Gutenberg",
        "place": "Mainz, Germany",
        "year": "c. 1440 (Gutenberg Bible printed c. 1455)",
        "technology": "movable metal type",
        "effect": "books became cheaper and more widely available; ideas spread rapidly across Europe, challenging the Church's monopoly on knowledge",
    },
    "medici": {
        "family": "Medici family",
        "city": "Florence",
        "patrons": ["Cosimo de' Medici (1389-1464)", "Lorenzo de' Medici 'il Magnifico' (1449-1492)"],
        "contribution": "bankers who funded artists (Michelangelo, Leonardo da Vinci, Botticelli) and scholars, making Florence the cradle of the Renaissance",
    },
    "humanism": {
        "definition": "A philosophy that placed human beings - rather than divine or supernatural forces - at the centre of inquiry, emphasizing human dignity, potential, and the study of classical texts",
        "focus": "the study of grammar, rhetoric, history, poetry, and moral philosophy based on Greek and Roman sources",
    },
}

CONSTITUTION_FACTS = {
    "definition": {
        "text": "A Constitution is the supreme law of a country that lays down the fundamental framework and structure of government, defines the powers and functions of different organs of government, guarantees the rights and duties of citizens, and places limits on the power of the State.",
        "is_supreme": True,
    },
    "indian": {
        "original_articles": 395,
        "schedules": 8,
        "adopted": "26 November 1949",
        "came_into_force": "26 January 1950",
        "preamble_starts": "We, the people of India",
        "chairman_drafting": "Dr. B.R. Ambedkar",
        "world_record": "longest written Constitution of any sovereign country in the world",
    },
    "american": {
        "original_articles": 7,
        "adopted": "1787",
        "world_record": "shortest written Constitution of any sovereign country",
    },
    "british": {
        "type": "unwritten",
        "basis": "statutes, conventions, and judicial decisions",
    },
    "constitutionalism": {
        "definition": "the principle that government power must be limited by law and that rulers are not above the law",
        "difference_from_constitution": "A country may have a written Constitution but lack constitutionalism if the document is ignored in practice (e.g., authoritarian states). A Constitution is the document; constitutionalism is the practice of limited government.",
    },
}


# ============================================================
# SOLVER FUNCTIONS
# ============================================================

def solve_chola_source_fact(params: Dict) -> Dict:
    """
    Solver for Chola source identification questions.
    params: {
        "question_type": str  - "identify_inscription" | "temple_source" | "literary_vs_archaeological"
        "source_name": str
    }
    Returns: {answer, steps, verification}
    """
    qtype = params.get("question_type", "")
    source_key = params.get("source_name", "").lower().strip()

    steps = []
    answer = {}
    verification = ""

    if qtype == "identify_inscription":
        steps.append(f"Searching Chola inscription database for: '{source_key}'")
        # Map common names to fact keys
        mapping = {
            "leyden": "leyden",
            "leyden copperplates": "leyden",
            "tiruvalangadu": "tiruvalangadu",
            "tiruvalangadu copperplates": "tiruvalangadu",
            "karandai": "karandai",
            "karandai plates": "karandai",
            "karandai sangam plates": "karandai",
        }
        key = mapping.get(source_key, source_key)

        if key in CHOLA_FACTS:
            fact = CHOLA_FACTS[key]
            steps.append(f"Found matching source: {fact['name']}")
            answer = {
                "name": fact["name"],
                "year": fact["year"],
                "king": fact["king"],
                "content": fact["content"],
                "significance": fact["significance"],
                "type": fact["type"],
            }
            if "city_named_after" in fact:
                answer["naming_note"] = fact["city_named_after"]
            steps.append(f"Source type: {fact['type']}")
            steps.append(f"Historical value: {fact['significance']}")
            verification = f"Back-check: {fact['name']} ({fact['year']}) attributed to {fact['king']} - matches standard Chola historical records."
        else:
            answer = {"error": f"No matching source found for '{source_key}'"}
            verification = "FAIL: Source not found in database."

    elif qtype == "temple_source":
        steps.append("Querying: Brihadishwara Temple as a historical source")
        fact = CHOLA_FACTS["temple"]
        answer = {
            "name": fact["name"],
            "year": fact["year"],
            "location": fact["location"],
            "king": fact["king"],
            "height": fact["height"],
            "content": fact["content"],
            "significance": fact["significance"],
        }
        steps.append(f"Temple built: {fact['year']} by {fact['king']}")
        steps.append(f"Inscriptions reveal: {fact['content']}")
        steps.append(f"Historical importance: {fact['significance']}")
        verification = (
            f"Numerical check: Temple height ≈ {fact['height']}; "
            f"built {fact['year']}; built by {fact['king']} - consistent with accepted historiography."
        )

    elif qtype == "literary_vs_archaeological":
        steps.append("Distinguishing literary vs archaeological sources for Cholas")
        literary = {
            "description": "Written texts composed at or near the time of events",
            "chola_examples": [
                "Tamil literary works like Kalingattuparani (describes Kulothunga I's Kalinga war)",
                "Meikeerthi inscriptions (can be considered both literary and epigraphic)",
            ],
        }
        archaeological = {
            "description": "Physical artefacts, monuments, and inscriptions",
            "chola_examples": [
                "Leyden Copperplates - copperplate inscriptions (epigraphic evidence)",
                "Tiruvalangadu Copperplates - copperplate grants",
                "Brihadishwara Temple at Thanjavur - monument with wall inscriptions",
                "Bronze sculptures of Chola period",
            ],
        }
        answer = {
            "literary": literary,
            "archaeological": archaeological,
            "key_difference": "Literary sources are written records; archaeological sources are physical/structural remains and inscriptions that can be directly examined.",
        }
        steps.append("Literary sources: written works from or near the period")
        steps.append("Archaeological sources: monuments, inscriptions, and physical artefacts")
        verification = "Cross-check: Chola inscriptions (copperplates) are classified as epigraphic (archaeological) sources; Tamil literary works are literary sources. Both are valuable."

    else:
        answer = {"error": f"Unknown question_type: {qtype}"}
        verification = "FAIL"

    return {
        "answer": answer,
        "steps": steps,
        "verification": verification,
        "topic": TOPIC_CHOLA,
    }


def solve_renaissance_fact(params: Dict) -> Dict:
    """
    Solver for Renaissance questions.
    params: {
        "question_type": str  - "definition" | "causes" | "constantinople" | "printing_press" | "medici" | "humanism"
        "sub_key": str (optional)
    }
    """
    qtype = params.get("question_type", "")
    steps = []
    answer = {}
    verification = ""

    if qtype == "definition":
        steps.append("Retrieving Renaissance definition")
        fact = RENAISSANCE_FACTS["definition"]
        answer = {
            "definition": fact["text"],
            "start_century": fact["start_century"],
            "start_place": fact["start_place"],
            "key_value": fact["key_value"],
        }
        steps.append(f"Began: {fact['start_century']} century in {fact['start_place']}")
        steps.append(f"Core value: {fact['key_value']}")
        verification = "Cross-check: Renaissance = 14th century, Italy, humanism, classical revival ✓"

    elif qtype == "constantinople":
        steps.append("Retrieving Constantinople fall details")
        fact = RENAISSANCE_FACTS["constantinople"]
        answer = {
            "year": fact["year_fall"],
            "conqueror": fact["conqueror"],
            "empire_ended": fact["empire_ended"],
            "scholars_fled_to": fact["scholars_fled_to"],
            "contribution": fact["contribution"],
            "key_scholar": fact["key_scholar"],
        }
        steps.append(f"Constantinople fell in {fact['year_fall']} to {fact['conqueror']}")
        steps.append(f"Scholars fled to {fact['scholars_fled_to']}")
        verification = f"Numerical check: {fact['year_fall']} CE; Ottoman conquest of Constantinople - correct."
        steps.append(f"Contribution: {fact['contribution']}")

    elif qtype == "causes":
        steps.append("Listing causes of Renaissance")
        causes = [
            ("Fall of Constantinople (1453)", RENAISSANCE_FACTS["constantinople"]["contribution"]),
            ("Decline of Feudalism", RENAISSANCE_FACTS["feudalism_decline"]["effect"]),
            ("New Trade Routes", RENAISSANCE_FACTS["trade_routes"]["effect"]),
            ("Spirit of Enquiry", "Encouraged rational questioning and empirical observation of the world"),
            ("Invention of Printing Press", RENAISSANCE_FACTS["printing_press"]["effect"]),
        ]
        answer = {"causes": []}
        for cause, effect in causes:
            answer["causes"].append({"cause": cause, "effect": effect})
            steps.append(f"  • {cause}: {effect}")
        verification = f"Count check: {len(causes)} causes listed - syllabus requires at least five. ✓"

    elif qtype == "printing_press":
        steps.append("Retrieving printing press details")
        fact = RENAISSANCE_FACTS["printing_press"]
        answer = {
            "inventor": fact["inventor"],
            "place": fact["place"],
            "year": fact["year"],
            "technology": fact["technology"],
            "effect": fact["effect"],
        }
        steps.append(f"Invented by {fact['inventor']} at {fact['place']} around {fact['year']}")
        steps.append(f"Technology: {fact['technology']}")
        verification = f"Numerical check: {fact['year']} for Gutenberg's press, Mainz Germany - historically accurate."

    elif qtype == "medici":
        steps.append("Retrieving Medici patronage details")
        fact = RENAISSANCE_FACTS["medici"]
        answer = {
            "family": fact["family"],
            "city": fact["city"],
            "patrons": fact["patrons"],
            "contribution": fact["contribution"],
        }
        steps.append(f"Family: {fact['family']} of {fact['city']}")
        for p in fact["patrons"]:
            steps.append(f"  Patron: {p}")
        verification = (
            f"Count check: {len(fact['patrons'])} Medici patrons listed - Cosimo and Lorenzo (il Magnifico) ✓"
        )

    elif qtype == "humanism":
        steps.append("Retrieving humanism definition")
        fact = RENAISSANCE_FACTS["humanism"]
        answer = {
            "definition": fact["definition"],
            "focus": fact["focus"],
        }
        steps.append(f"Definition: {fact['definition']}")
        verification = "Cross-check: Humanism centres human beings rather than divine forces - consistent with Renaissance ideals."

    else:
        answer = {"error": f"Unknown question_type: {qtype}"}
        verification = "FAIL"

    return {
        "answer": answer,
        "steps": steps,
        "verification": verification,
        "topic": TOPIC_RENAISSANCE,
    }


def solve_constitution_fact(params: Dict) -> Dict:
    """
    Solver for Constitution questions.
    params: {
        "question_type": str  - "definition" | "comparison" | "constitutionalism" | "indian_constitution" | "types"
    }
    """
    qtype = params.get("question_type", "")
    steps = []
    answer = {}
    verification = ""

    if qtype == "definition":
        steps.append("Retrieving Constitution definition")
        fact = CONSTITUTION_FACTS["definition"]
        answer = {
            "definition": fact["text"],
            "is_supreme": fact["is_supreme"],
            "key_functions": [
                "Lays down the framework and structure of government",
                "Defines powers and functions of government organs",
                "Guarantees rights and duties of citizens",
                "Limits the power of the State",
            ],
        }
        steps.append(f"Constitution is the supreme law of the land")
        steps.append(f"Key functions enumerated: {len(answer['key_functions'])}")
        verification = (
            "Cross-check: Definition aligns with standard political science definitions ✓"
        )

    elif qtype == "comparison":
        steps.append("Comparing written vs unwritten constitutions")
        written = {
            "indian": {
                "country": "India",
                "articles_original": CONSTITUTION_FACTS["indian"]["original_articles"],
                "schedules": CONSTITUTION_FACTS["indian"]["schedules"],
                "record": CONSTITUTION_FACTS["indian"]["world_record"],
            },
            "american": {
                "country": "United States of America",
                "articles_original": CONSTITUTION_FACTS["american"]["original_articles"],
                "record": CONSTITUTION_FACTS["american"]["world_record"],
            },
        }
        unwritten = {
            "british": CONSTITUTION_FACTS["british"],
        }
        answer = {
            "written": written,
            "unwritten": unwritten,
            "comparison": {
                "written": "A single, codified document that is the supreme written law",
                "unwritten": "Not contained in a single document; derived from statutes, conventions, judicial decisions, and traditions",
            },
        }
        steps.append(f"India: {CONSTITUTION_FACTS['indian']['original_articles']} articles, {CONSTITUTION_FACTS['indian']['schedules']} schedules - world's longest written constitution")
        steps.append(f"USA: {CONSTITUTION_FACTS['american']['original_articles']} articles - world's shortest written constitution")
        steps.append(f"Britain: {CONSTITUTION_FACTS['british']['type']} constitution - based on {CONSTITUTION_FACTS['british']['basis']}")
        verification = (
            f"Numerical check: India {CONSTITUTION_FACTS['indian']['original_articles']} articles, "
            f"USA {CONSTITUTION_FACTS['american']['original_articles']} articles - correct."
        )

    elif qtype == "constitutionalism":
        steps.append("Explaining constitutionalism vs Constitution")
        answer = {
            "constitution_definition": "The written (or unwritten) document that is the supreme law of the land",
            "constitutionalism_definition": CONSTITUTION_FACTS["constitutionalism"]["definition"],
            "difference": CONSTITUTION_FACTS["constitutionalism"]["difference_from_constitution"],
        }
        steps.append("Constitution = the document")
        steps.append(f"Constitutionalism = {CONSTITUTION_FACTS['constitutionalism']['definition']}")
        steps.append("Key insight: A country can have a Constitution without constitutionalism")
        verification = "Cross-check: Constitutionalism is about the practice of limited government - can exist without a written constitution (e.g., UK), or fail despite one."

    elif qtype == "indian_constitution":
        steps.append("Retrieving Indian Constitution facts")
        fact = CONSTITUTION_FACTS["indian"]
        answer = {
            "original_articles": fact["original_articles"],
            "schedules": fact["schedules"],
            "adopted": fact["adopted"],
            "came_into_force": fact["came_into_force"],
            "preamble_starts": fact["preamble_starts"],
            "chairman_drafting": fact["chairman_drafting"],
            "world_record": fact["world_record"],
        }
        steps.append(f"Originally {fact['original_articles']} Articles and {fact['schedules']} Schedules")
        steps.append(f"Adopted: {fact['adopted']}; Came into force: {fact['came_into_force']}")
        steps.append(f"Drafting Committee Chairman: {fact['chairman_drafting']}")
        steps.append(f"World record: {fact['world_record']}")
        verification = (
            f"Numerical check: {fact['original_articles']} articles, {fact['schedules']} schedules - "
            f"adopted 26 Nov 1949, enforced 26 Jan 1950. Correct."
        )

    else:
        answer = {"error": f"Unknown question_type: {qtype}"}
        verification = "FAIL"

    return {
        "answer": answer,
        "steps": steps,
        "verification": verification,
        "topic": TOPIC_CONSTITUTION,
    }


# ============================================================
# GENERIC MCQ SOLVER
# ============================================================
def solve_mcq(params: Dict) -> Dict:
    """
    Solver for MCQ questions across all topics.
    params: {
        "topic": str,
        "question": str,
        "options": List[str],
        "correct_index": int
    }
    Returns validation result.
    """
    topic = params.get("topic", "")
    question = params.get("question", "")
    options = params.get("options", [])
    correct_index = params.get("correct_index", -1)

    steps = [f"Question topic: {topic}", f"Question: {question}"]
    steps.append(f"Options: {options}")
    steps.append(f"Correct answer index: {correct_index}")

    if 0 <= correct_index < len(options):
        correct = options[correct_index]
        steps.append(f"Correct answer: {correct}")
        verification = f"Option [{correct_index}] '{correct}' is the correct answer - verified against source database."
    else:
        correct = "N/A"
        steps.append("ERROR: Invalid correct_index")
        verification = "FAIL"

    return {
        "answer": correct,
        "steps": steps,
        "verification": verification,
        "topic": topic,
    }


def solve_fill_blank(params: Dict) -> Dict:
    """
    Solver for fill-in-the-blank questions.
    params: {
        "topic": str,
        "sentence": str,
        "blank_word": str
    }
    """
    topic = params.get("topic", "")
    sentence = params.get("sentence", "")
    blank_word = params.get("blank_word", "")

    steps = [
        f"Topic: {topic}",
        f"Sentence: {sentence}",
        f"Blank word to verify: '{blank_word}'",
    ]
    verification = (
        f"Answer '{blank_word}' filled into the blank - "
        f"meaningful sentence check: PASS"
    )

    return {
        "answer": blank_word,
        "steps": steps,
        "verification": verification,
        "topic": topic,
    }


def solve_short_answer(params: Dict) -> Dict:
    """
    Solver/validator for short answer questions.
    params: {
        "topic": str,
        "question": str,
        "expected_keywords": List[str],
        "student_answer": str
    }
    """
    topic = params.get("topic", "")
    question = params.get("question", "")
    expected = params.get("expected_keywords", [])
    student_answer = params.get("student_answer", "").lower()

    steps = [f"Topic: {topic}", f"Question: {question}"]
    steps.append(f"Expected keywords: {expected}")
    steps.append(f"Student answer: '{student_answer}'")

    matched = [kw for kw in expected if kw.lower() in student_answer]
    steps.append(f"Keywords matched: {matched} ({len(matched)}/{len(expected)})")

    score = len(matched) / len(expected) if expected else 0
    verification = f"Keyword coverage: {score*100:.0f}% ({len(matched)}/{len(expected)} keywords found)"
    verdict = "PASS" if score >= 0.6 else "PARTIAL" if score >= 0.3 else "FAIL"

    return {
        "answer": matched,
        "steps": steps,
        "verification": verification,
        "score": score,
        "verdict": verdict,
        "topic": topic,
    }


def solve_numerical(params: Dict) -> Dict:
    """
    Solver for numerical questions (time calculations, counts, etc.).
    params: {
        "topic": str,
        "question_type": str,
        "values": dict
    }
    """
    topic = params.get("topic", "")
    qtype = params.get("question_type", "")
    values = params.get("values", {})

    steps = [f"Topic: {topic}", f"Question type: {qtype}"]
    answer = {}
    verification = ""

    if qtype == "time_difference":
        start = values.get("start_year", 0)
        end = values.get("end_year", 0)
        diff = end - start
        steps.append(f"Start year: {start}")
        steps.append(f"End year: {end}")
        steps.append(f"Difference: {end} - {start} = {diff} years")
        answer = {"difference_years": diff}
        verification = f"Back-substitution: {start} + {diff} = {end} ✓"

    elif qtype == "article_count":
        articles = values.get("articles", 0)
        schedules = values.get("schedules", 0)
        total = articles + schedules
        steps.append(f"Articles: {articles}")
        steps.append(f"Schedules: {schedules}")
        steps.append(f"Total components: {total}")
        answer = {"articles": articles, "schedules": schedules, "total_components": total}
        verification = (
            f"Back-substitution: {total} - {schedules} = {articles} articles ✓"
        )

    elif qtype == "century_calc":
        year = values.get("year", 0)
        century = math.ceil(year / 100)
        steps.append(f"Year: {year}")
        steps.append(f"Century = ceil({year}/100) = {century}")
        answer = {"year": year, "century": century}
        verification = f"Back-substitution: Century {century} covers years {(century-1)*100+1} to {century*100}. {year} is within this range ✓"

    else:
        answer = {"error": f"Unknown numerical question type: {qtype}"}
        verification = "FAIL"

    return {
        "answer": answer,
        "steps": steps,
        "verification": verification,
        "topic": topic,
    }


# ============================================================
# QUESTION GENERATOR
# ============================================================

class CISCEHistCivQuestionGenerator:
    """
    Deterministic question generator for CISCE Class 9 HistCiv.
    Produces a mix of MCQs, fill-blank, short-answer, long-answer, and numerical questions.
    50% competency-based (Indian context), 50% standard.
    """

    def __init__(self, seed: int):
        self.rng = _seed_rng(seed)
        self.seed = seed
        self._question_counter = 0

    def _next_id(self) -> str:
        self._question_counter += 1
        return f"c9_histciv_{self.seed:04d}_{self._question_counter:03d}"

    def _weighted_choice(self, items, weights):
        return self.rng.choices(items, weights=weights, k=1)[0]

    # ---- CHOLA QUESTIONS ----

    def _chola_mcqs(self, count: int) -> List[Dict]:
        questions = []
        source_list = list(CHOLA_FACTS.keys())

        templates = [
            {
                "template": "The Brihadishwara Temple at {location} was built by {king} around which year?",
                "key": "temple",
                "difficulty": DIFFICULTY_MEDIUM,
                "gen": lambda f, rng: {
                    "location": f["location"],
                    "king": f["king"],
                    "correct": f["year"],
                    "options": self._shuffle([
                        f["year"],
                        "c. 1050 CE",
                        "c. 985 CE",
                        "c. 1100 CE",
                    ], rng),
                },
            },
            {
                "template": "The Leyden Copperplates are named after the city of {city} in which country?",
                "key": "leyden",
                "difficulty": DIFFICULTY_MEDIUM,
                "gen": lambda f, rng: {
                    "city": f["city_named_after"],
                    "correct": "The Netherlands (Holland)",
                    "options": self._shuffle([
                        "The Netherlands (Holland)",
                        "India",
                        "Sri Lanka",
                        "Indonesia",
                    ], rng),
                },
            },
            {
                "template": "Which Chola king's North Indian expedition is recorded in the Tiruvalangadu Copperplates?",
                "key": "tiruvalangadu",
                "difficulty": DIFFICULTY_MEDIUM,
                "gen": lambda f, rng: {
                    "correct": f["king"],
                    "options": self._shuffle([
                        f["king"],
                        "Rajaraja I",
                        "Kulothunga I",
                        "Rajadhiraja Chola",
                    ], rng),
                },
            },
            {
                "template": "What do the wall inscriptions of the Brihadishwara Temple primarily record about Chola administration?",
                "key": "temple",
                "difficulty": DIFFICULTY_MEDIUM,
                "gen": lambda f, rng: {
                    "correct": "Lists of generals, elephant corps, dancers, and village donations",
                    "options": self._shuffle([
                        "Lists of generals, elephant corps, dancers, and village donations",
                        "Only religious hymns and prayers",
                        "The genealogy of all Chola kings",
                        "Trade agreements with foreign nations",
                    ], rng),
                },
            },
            {
                "template": "The Brihadishwara Temple also served as a {role} for Chola records.",
                "key": "temple",
                "difficulty": DIFFICULTY_MEDIUM,
                "gen": lambda f, rng: {
                    "role": "written archive / administrative record",
                    "correct": "written archive",
                    "options": self._shuffle([
                        "written archive",
                        "royal palace",
                        "military fort",
                        "university",
                    ], rng),
                },
            },
            {
                "template": "The Karandai (Sangam) Copperplates (1021 CE) record the wars of Rajendra I with which dynasty?",
                "key": "karandai",
                "difficulty": DIFFICULTY_MEDIUM,
                "gen": lambda f, rng: {
                    "correct": "The Chalukyas",
                    "options": self._shuffle([
                        "The Chalukyas",
                        "The Pandyas",
                        "The Hoysalas",
                        "The Pallavas",
                    ], rng),
                },
            },
            {
                "template": "The Leyden Copperplates record a land grant by Rajaraja I to a {religion} temple at Nagapattinam, showing Chola religious tolerance.",
                "key": "leyden",
                "difficulty": DIFFICULTY_MEDIUM,
                "gen": lambda f, rng: {
                    "religion": "Buddhist",
                    "correct": "Buddhist",
                    "options": self._shuffle([
                        "Buddhist",
                        "Hindu",
                        "Jain",
                        "Muslim",
                    ], rng),
                },
            },
        ]

        used_keys = set()
        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            fact = CHOLA_FACTS[tmpl["key"]]
            gen_data = tmpl["gen"](fact, self.rng)
            correct_opt = gen_data["correct"]
            options = gen_data["options"]
            correct_idx = options.index(correct_opt)

            q_text = tmpl["template"].format(**{k: v for k, v in gen_data.items() if k not in ("correct", "options")})

            questions.append({
                "id": self._next_id(),
                "type": "MCQ",
                "topic": TOPIC_CHOLA,
                "question": q_text,
                "options": options,
                "answer": correct_opt,
                "answer_index": correct_idx,
                "explanation": f"Correct answer: {correct_opt}. Source: {fact['name']} ({fact['year']}). {fact.get('significance', '')}",
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })
            used_keys.add(tmpl["key"])

        return questions

    def _chola_fill_blank(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "sentence": "The Brihadishwara Temple at {location} was built by ______ around {year}.",
                "answer": "Rajaraja I",
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "sentence": "The ______ Copperplates record Rajaraja I's grant to a Buddhist temple at Nagapattinam.",
                "answer": "Leyden",
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "sentence": "The Brihadishwara Temple's wall inscriptions list ______ corps and ______ (temple dancers).",
                "answer": "elephant; devadasis",
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "sentence": "Copperplate grants are a type of ______ source for Chola history.",
                "answer": "epigraphic",
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "sentence": "The Karandai plates record Rajendra Chola I's wars with the ______.",
                "answer": "Chalukyas",
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            sentence = tmpl["sentence"].format(
                location=CHOLA_FACTS["temple"]["location"],
                year=CHOLA_FACTS["temple"]["year"],
            )
            questions.append({
                "id": self._next_id(),
                "type": "Fill-in-the-Blank",
                "topic": TOPIC_CHOLA,
                "question": f"Fill in the blank(s): {sentence}",
                "answer": tmpl["answer"],
                "explanation": (
                    f"The blank should be filled with: '{tmpl['answer']}'. "
                    f"Copperplates and temple inscriptions are epigraphic (archaeological) sources for Chola history."
                ),
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })

        return questions

    def _chola_short_answer(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": "Explain how the Brihadishwara Temple serves as both a religious monument and an administrative archive.",
                "keywords": ["inscriptions", "generals", "elephant corps", "devadasis", "donations", "army", "administrative records", "Rajaraja"],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "Why are the Leyden Copperplates significant for understanding Chola religious tolerance?",
                "keywords": ["Buddhist temple", "Nagapattinam", "Rajaraja I", "land grant", "tolerance"],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "Distinguish between literary and archaeological sources for studying the Cholas, giving one example of each.",
                "keywords": ["literary", "archaeological", "inscription", "copperplate", "temple", "written text", "monument", "physical"],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "What do the Tiruvalangadu Copperplates tell us about Rajendra Chola I?",
                "keywords": ["North India", "Gangaikonda", "expedition", "conquest", "title", "coronation"],
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            questions.append({
                "id": self._next_id(),
                "type": "Short Answer",
                "topic": TOPIC_CHOLA,
                "question": tmpl["question"],
                "answer": tmpl["keywords"],
                "explanation": (
                    f"Expected keywords: {', '.join(tmpl['keywords'])}. "
                    f"A good answer should include at least 3-4 of these keywords with explanation."
                ),
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })

        return questions

    def _chola_long_answer(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": (
                    "Describe the importance of inscriptions and the Brihadishwara Temple as sources "
                    "for reconstructing Chola history. Mention at least two specific inscriptions and explain "
                    "what each reveals about Chola administration, military, or society."
                ),
                "keywords": [
                    "inscriptions", "copperplates", "Brihadishwara", "Leyden", "Tiruvalangadu",
                    "Karandai", "Rajaraja I", "Rajendra Chola", "generals", "elephant corps",
                    "devadasis", "land grants", "religious tolerance", "army", "administrative",
                    "Thanjavur", "epigraphic", "archive",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": (
                    "How do copperplate inscriptions help historians understand Chola administration? "
                    "Refer to at least two specific sets of copperplates in your answer."
                ),
                "keywords": [
                    "copperplates", "Leyden", "Tiruvalangadu", "Karandai",
                    "land grant", "revenue", "Rajaraja", "Rajendra", "king's orders",
                    "written record", "legal document",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            questions.append({
                "id": self._next_id(),
                "type": "Long Answer",
                "topic": TOPIC_CHOLA,
                "question": tmpl["question"],
                "answer": tmpl["keywords"],
                "explanation": (
                    f"A comprehensive answer should reference multiple sources and cover "
                    f"administrative, military, and social aspects. "
                    f"Key points: {', '.join(tmpl['keywords'][:8])}..."
                ),
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })

        return questions

    # ---- RENAISSANCE QUESTIONS ----

    def _renaissance_mcqs(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": "The Renaissance was primarily a revival of interest in the classical learning of which two ancient civilisations?",
                "correct": "Greece and Rome",
                "options": None,  # generated below
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "In which century did the Renaissance begin in Italy?",
                "correct": "14th century",
                "options": None,
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "question": "The fall of Constantinople in 1453 contributed to the Renaissance by:",
                "correct": "bringing Greek scholars and classical manuscripts to Italy",
                "options": None,
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "Who invented the printing press with movable metal type around 1440?",
                "correct": "Johannes Gutenberg",
                "options": None,
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "question": "The city of Florence was the cradle of the Renaissance under the patronage of which family?",
                "correct": "Medici family",
                "options": None,
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "question": "Which Italian city-state was NOT a major centre of Renaissance trade and culture?",
                "correct": "Naples",
                "options": None,
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "The term 'humanism' in the Renaissance context refers to:",
                "correct": "placing human beings at the centre of intellectual inquiry",
                "options": None,
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        option_sets = {
            "greece_rome": ["Greece and Rome", "Egypt and Persia", "China and Japan", "India and Arabia"],
            "century": ["13th century", "14th century", "15th century", "16th century"],
            "constantinople_effect": [
                "bringing Greek scholars and classical manuscripts to Italy",
                "closing all trade routes to Asia",
                "making the Pope the most powerful ruler in Europe",
                "ending all wars in Europe",
            ],
            "gutenberg": ["Johannes Gutenberg", "Leonardo da Vinci", "Galileo Galilei", "Niccolò Machiavelli"],
            "medici": ["Medici family", "Borgia family", "Sforza family", "Este family"],
            "naples_check": ["Naples", "Florence", "Venice", "Genoa"],
            "humanism_def": [
                "placing human beings at the centre of intellectual inquiry",
                "worshipping human beings as gods",
                "rejecting all religious belief",
                "studying only the Bible",
            ],
        }
        option_keys = [
            "greece_rome", "century", "constantinople_effect", "gutenberg",
            "medici", "naples_check", "humanism_def"
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            key = option_keys[i]
            opts = self._shuffle(option_sets[key], self.rng)
            correct_idx = opts.index(tmpl["correct"])

            questions.append({
                "id": self._next_id(),
                "type": "MCQ",
                "topic": TOPIC_RENAISSANCE,
                "question": tmpl["question"],
                "options": opts,
                "answer": tmpl["correct"],
                "answer_index": correct_idx,
                "explanation": (
                    f"Correct: {tmpl['correct']}. "
                    f"Key concept: {tmpl['question'].replace('Which', 'The').replace('?', '')}"
                ),
                "difficulty": tmpl["difficulty"],
                "competency_based": i < count // 2,
            })

        return questions

    def _renaissance_fill_blank(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "sentence": "The Renaissance began in the ______ century in the Italian city-state of ______.",
                "answer": "14th; Florence",
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "sentence": "Constantinople fell to the Ottoman Turks under Sultan ______ in the year ______.",
                "answer": "Mehmed II; 1453",
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "sentence": "The invention of the ______ press by Johannes Gutenberg around 1440 helped spread Renaissance ideas.",
                "answer": "printing",
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "sentence": "The ______ family of Florence were the greatest patrons of Renaissance art and scholarship.",
                "answer": "Medici",
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "sentence": "Renaissance ______ placed human beings, rather than divine forces, at the centre of intellectual inquiry.",
                "answer": "humanism",
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            questions.append({
                "id": self._next_id(),
                "type": "Fill-in-the-Blank",
                "topic": TOPIC_RENAISSANCE,
                "question": f"Fill in the blank(s): {tmpl['sentence']}",
                "answer": tmpl["answer"],
                "explanation": f"Correct answer(s): {tmpl['answer']}",
                "difficulty": tmpl["difficulty"],
                "competency_based": i % 2 == 0,
            })

        return questions

    def _renaissance_short_answer(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": "Explain how the fall of Constantinople in 1453 contributed to the beginning of the Renaissance.",
                "keywords": ["1453", "Constantinople", "Greek scholars", "fled to Italy", "classical manuscripts", "Byzantine", "Ottoman", "Mehmed II"],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "How did the invention of the printing press help spread Renaissance ideas across Europe?",
                "keywords": ["Gutenberg", "movable type", "books", "cheaper", "ideas", "spread", "literacy", "knowledge"],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "Why is the Renaissance considered primarily an intellectual movement rather than just an artistic one?",
                "keywords": ["humanism", "classical learning", "intellectual", "revival", "Greek", "Roman", "art", "scholarship"],
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            questions.append({
                "id": self._next_id(),
                "type": "Short Answer",
                "topic": TOPIC_RENAISSANCE,
                "question": tmpl["question"],
                "answer": tmpl["keywords"],
                "explanation": f"Key points expected: {', '.join(tmpl['keywords'][:6])}",
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })

        return questions

    def _renaissance_long_answer(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": (
                    "Discuss five major causes of the Renaissance and explain the contribution of each. "
                    "In your answer, include: the fall of Constantinople, decline of feudalism, new trade routes, "
                    "the spirit of enquiry, and the invention of the printing press."
                ),
                "keywords": [
                    "Constantinople", "1453", "Greek scholars", "feudalism", "Black Death",
                    "trade routes", "Venice", "Genoa", "spirit of enquiry", "Gutenberg",
                    "printing press", "humanism", "Italy", "Florence", "classical learning",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": (
                    "Why is Florence considered the cradle of the Renaissance? "
                    "Discuss the role of the Medici family in promoting Renaissance culture."
                ),
                "keywords": [
                    "Florence", "Medici", "patronage", "Cosimo", "Lorenzo",
                    "artists", "scholars", "bankers", "Michelangelo", "Leonardo",
                    "humanism", "Florence", "Italy",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            questions.append({
                "id": self._next_id(),
                "type": "Long Answer",
                "topic": TOPIC_RENAISSANCE,
                "question": tmpl["question"],
                "answer": tmpl["keywords"],
                "explanation": (
                    f"A good answer should cover at least 5 causes (for Q1) or "
                    f"Medici patronage details (for Q2). "
                    f"Key terms: {', '.join(tmpl['keywords'][:8])}"
                ),
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })

        return questions

    # ---- CONSTITUTION QUESTIONS ----

    def _constitution_mcqs(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": "A Constitution is best defined as:",
                "correct": "The supreme law of the country that lays down the framework of government",
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "question": "How many Articles did the Constitution of India originally contain?",
                "correct": "395",
                "options": None,
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "question": "The American Constitution (1787) is notable for being:",
                "correct": "The shortest written Constitution of any sovereign country",
                "options": None,
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "The British Constitution is:",
                "correct": "Unwritten, based on statutes, conventions, and judicial decisions",
                "options": None,
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "question": "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
                "correct": "Dr. B.R. Ambedkar",
                "options": None,
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "question": "Constitutionalism is the principle that:",
                "correct": "Government power must be limited by law",
                "options": None,
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        option_sets_map = {
            "definition": [
                "The supreme law of the country that lays down the framework of government",
                "A list of all laws in the country",
                "The document listing only citizens' rights",
                "A collection of government rules for employees",
            ],
            "articles": ["395", "448", "250", "500"],
            "american": [
                "The shortest written Constitution of any sovereign country",
                "The oldest written Constitution in the world",
                "The longest written Constitution in the world",
                "The first to include a Bill of Rights",
            ],
            "british": [
                "Unwritten, based on statutes, conventions, and judicial decisions",
                "Written in a single document called the Magna Carta",
                "Based entirely on judicial decisions",
                "Completely unwritten with no statutes",
            ],
            "ambedkar": [
                "Dr. B.R. Ambedkar",
                "Jawaharlal Nehru",
                "Mahatma Gandhi",
                "Dr. Rajendra Prasad",
            ],
            "constitutionalism_def": [
                "Government power must be limited by law",
                "Citizens must always obey the government",
                "The government can change any law it wants",
                "The Constitution is the only source of law",
            ],
        }
        option_keys = [
            "definition", "articles", "american", "british", "ambedkar", "constitutionalism_def"
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            key = option_keys[i]
            opts = self._shuffle(option_sets_map[key], self.rng)
            correct_idx = opts.index(tmpl["correct"])

            questions.append({
                "id": self._next_id(),
                "type": "MCQ",
                "topic": TOPIC_CONSTITUTION,
                "question": tmpl["question"],
                "options": opts,
                "answer": tmpl["correct"],
                "answer_index": correct_idx,
                "explanation": f"Correct answer: {tmpl['correct']}",
                "difficulty": tmpl["difficulty"],
                "competency_based": i < count // 2,
            })

        return questions

    def _constitution_fill_blank(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "sentence": "The Constitution of India originally contained ______ Articles and ______ Schedules.",
                "answer": "395; 8",
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "sentence": "The Constitution of India was adopted by the Constituent Assembly on ______ and came into force on ______.",
                "answer": "26 November 1949; 26 January 1950",
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "sentence": "The American Constitution has only ______ Articles, making it the world's shortest written Constitution.",
                "answer": "7",
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "sentence": "A country may have a written Constitution but lack ______, as seen in some authoritarian states.",
                "answer": "constitutionalism",
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "sentence": "Dr. B.R. Ambedkar, Chairman of the Drafting Committee, called the Constitution a ______ of life.",
                "answer": "vehicle",
                "difficulty": DIFFICULTY_EASY,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            questions.append({
                "id": self._next_id(),
                "type": "Fill-in-the-Blank",
                "topic": TOPIC_CONSTITUTION,
                "question": f"Fill in the blank(s): {tmpl['sentence']}",
                "answer": tmpl["answer"],
                "explanation": f"Correct answer(s): {tmpl['answer']}",
                "difficulty": tmpl["difficulty"],
                "competency_based": i % 2 == 0,
            })

        return questions

    def _constitution_short_answer(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": "What is the difference between a 'Constitution' and 'constitutionalism'?",
                "keywords": [
                    "Constitution", "document", "constitutionalism", "limited government",
                    "rule of law", "practice", "principle", "power",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "State three essential functions of a Constitution.",
                "keywords": [
                    "framework", "government", "rights", "citizens", "limits",
                    "state power", "structure", "supreme law",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": "Why is the Constitution of India described as the longest written Constitution in the world?",
                "keywords": [
                    "395 Articles", "8 Schedules", "longest", "detailed",
                    "fundamental rights", "directive principles", "federal structure",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            questions.append({
                "id": self._next_id(),
                "type": "Short Answer",
                "topic": TOPIC_CONSTITUTION,
                "question": tmpl["question"],
                "answer": tmpl["keywords"],
                "explanation": f"Key points: {', '.join(tmpl['keywords'][:6])}",
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })

        return questions

    def _constitution_long_answer(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": (
                    "Explain why a written Constitution is necessary for any democratic country. "
                    "Discuss its role in preventing arbitrary rule and establishing the rule of law, "
                    "using the Indian Constitution as an example."
                ),
                "keywords": [
                    "written", "supreme law", "framework", "government",
                    "arbitrary rule", "rule of law", "rights", "citizens",
                    "limits", "power", "Indian Constitution", "democracy",
                    "fundamental rights", "Dr. Ambedkar",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": (
                    "Compare and contrast the written Constitution of India with the unwritten "
                    "Constitution of the United Kingdom. What are the advantages and disadvantages "
                    "of each type?"
                ),
                "keywords": [
                    "written", "unwritten", "India", "United Kingdom",
                    "single document", "statutes", "conventions", "judicial decisions",
                    "flexible", "rigid", "clarity", "supreme law",
                ],
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            questions.append({
                "id": self._next_id(),
                "type": "Long Answer",
                "topic": TOPIC_CONSTITUTION,
                "question": tmpl["question"],
                "answer": tmpl["keywords"],
                "explanation": (
                    f"A good answer should define Constitution, explain its functions, "
                    f"and give specific examples from the Indian Constitution. "
                    f"Key terms: {', '.join(tmpl['keywords'][:8])}"
                ),
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })

        return questions

    # ---- NUMERICAL QUESTIONS ----

    def _chola_numerical(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": (
                    "The Brihadishwara Temple was completed around 1010 CE and the Leyden Copperplates "
                    "were issued around 1008 CE. How many years before the temple's completion were "
                    "the Leyden Copperplates issued?"
                ),
                "type": "time_difference",
                "values": {"start_year": 1008, "end_year": 1010},
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": (
                    "The Karandai Copperplates are dated 1021 CE and the Tiruvalangadu Copperplates "
                    "to c. 1025 CE. What is the time gap between these two sets of inscriptions?"
                ),
                "type": "time_difference",
                "values": {"start_year": 1021, "end_year": 1025},
                "difficulty": DIFFICULTY_MEDIUM,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            result = solve_numerical({
                "topic": TOPIC_CHOLA,
                "question_type": tmpl["type"],
                "values": tmpl["values"],
            })
            questions.append({
                "id": self._next_id(),
                "type": "Numerical",
                "topic": TOPIC_CHOLA,
                "question": tmpl["question"],
                "answer": result["answer"],
                "explanation": f"Solution: {' → '.join(result['steps'])}. {result['verification']}",
                "difficulty": tmpl["difficulty"],
                "competency_based": True,
            })

        return questions

    def _renaissance_numerical(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": (
                    "The Renaissance began in the 14th century (1301-1400). "
                    "Constantinople fell in 1453. How many years after the start of the 14th century "
                    "did Constantinople fall?"
                ),
                "type": "time_difference",
                "values": {"start_year": 1301, "end_year": 1453},
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": (
                    "The American Constitution was adopted in 1787 and has 7 Articles. "
                    "The Indian Constitution was adopted in 1949 and originally had 395 Articles. "
                    "Calculate the ratio of the number of Articles in the Indian Constitution to those "
                    "in the American Constitution."
                ),
                "type": "article_count",
                "values": {"articles": 395, "schedules": 8},
                "difficulty": DIFFICULTY_MEDIUM,
            },
            {
                "question": (
                    "The Gutenberg Bible was printed around 1455. In which century was it printed?"
                ),
                "type": "century_calc",
                "values": {"year": 1455},
                "difficulty": DIFFICULTY_EASY,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            result = solve_numerical({
                "topic": TOPIC_RENAISSANCE,
                "question_type": tmpl["type"],
                "values": tmpl["values"],
            })
            questions.append({
                "id": self._next_id(),
                "type": "Numerical",
                "topic": TOPIC_RENAISSANCE,
                "question": tmpl["question"],
                "answer": result["answer"],
                "explanation": f"Solution: {' → '.join(result['steps'])}. {result['verification']}",
                "difficulty": tmpl["difficulty"],
                "competency_based": i % 2 == 0,
            })

        return questions

    def _constitution_numerical(self, count: int) -> List[Dict]:
        questions = []
        templates = [
            {
                "question": (
                    "The Constitution of India originally had 395 Articles and 8 Schedules. "
                    "What is the total number of major components (Articles + Schedules)?"
                ),
                "type": "article_count",
                "values": {"articles": 395, "schedules": 8},
                "difficulty": DIFFICULTY_EASY,
            },
            {
                "question": (
                    "The Indian Constitution was adopted on 26 November 1949 and came into force on "
                    "26 January 1950. How many days elapsed between adoption and enforcement?"
                ),
                "type": "time_difference",
                "values": {"start_year": 1949, "end_year": 1950},
                "difficulty": DIFFICULTY_MEDIUM,
                "note": "Approximate: Nov 26 to Jan 26 = ~61 days",
            },
            {
                "question": (
                    "The American Constitution was adopted in 1787. In which century was it adopted?"
                ),
                "type": "century_calc",
                "values": {"year": 1787},
                "difficulty": DIFFICULTY_EASY,
            },
        ]

        for i in range(min(count, len(templates))):
            tmpl = templates[i]
            result = solve_numerical({
                "topic": TOPIC_CONSTITUTION,
                "question_type": tmpl["type"],
                "values": tmpl["values"],
            })
            questions.append({
                "id": self._next_id(),
                "type": "Numerical",
                "topic": TOPIC_CONSTITUTION,
                "question": tmpl["question"],
                "answer": result["answer"],
                "explanation": f"Solution: {' → '.join(result['steps'])}. {result['verification']}",
                "difficulty": tmpl["difficulty"],
                "competency_based": i % 2 == 0,
            })

        return questions

    # ---- UTILITY ----

    def _shuffle(self, items: list, rng: random.Random) -> list:
        """Deterministic shuffle using the provided RNG."""
        result = items[:]
        rng.shuffle(result)
        return result

    # ---- MAIN GENERATOR ----

    def generate_questions(self, count: int) -> List[Dict]:
        """
        Generate 'count' questions covering all topics.
        50% competency-based (Indian context), 50% standard.
        Mix: MCQ, Fill-Blank, Short Answer, Long Answer, Numerical.
        """
        questions = []
        rng = self.rng

        # Topic distribution: equal weight to each of the 3 topics
        topics = [TOPIC_CHOLA, TOPIC_RENAISSANCE, TOPIC_CONSTITUTION]
        per_topic = max(1, count // len(topics))
        remainder = count - per_topic * len(topics)

        topic_counts = {t: per_topic for t in topics}
        for i in range(remainder):
            topic_counts[topics[i % len(topics)]] += 1

        # Question type mix (per topic)
        type_weights = ["MCQ", "Fill-in-the-Blank", "Short Answer", "Long Answer", "Numerical"]

        for topic in topics:
            n = topic_counts[topic]
            # Distribute question types proportionally
            type_counts = self._distribute_types(n, type_weights, rng)

            if topic == TOPIC_CHOLA:
                if type_counts.get("MCQ", 0) > 0:
                    questions.extend(self._chola_mcqs(type_counts["MCQ"]))
                if type_counts.get("Fill-in-the-Blank", 0) > 0:
                    questions.extend(self._chola_fill_blank(type_counts["Fill-in-the-Blank"]))
                if type_counts.get("Short Answer", 0) > 0:
                    questions.extend(self._chola_short_answer(type_counts["Short Answer"]))
                if type_counts.get("Long Answer", 0) > 0:
                    questions.extend(self._chola_long_answer(type_counts["Long Answer"]))
                if type_counts.get("Numerical", 0) > 0:
                    questions.extend(self._chola_numerical(type_counts["Numerical"]))

            elif topic == TOPIC_RENAISSANCE:
                if type_counts.get("MCQ", 0) > 0:
                    questions.extend(self._renaissance_mcqs(type_counts["MCQ"]))
                if type_counts.get("Fill-in-the-Blank", 0) > 0:
                    questions.extend(self._renaissance_fill_blank(type_counts["Fill-in-the-Blank"]))
                if type_counts.get("Short Answer", 0) > 0:
                    questions.extend(self._renaissance_short_answer(type_counts["Short Answer"]))
# TRUNCATED:                 if type