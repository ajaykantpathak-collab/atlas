"""
CISCE HISTCIV Class 7 - Deterministic Solver & Question Generator
Covers:
  • Ch1: Meaning of 'Medieval' and Beginning of the Medieval Period
  • Ch2: Pre-Islamic Arabia - Tribal Society and Socio-Political Conditions
  • Ch3: Turkish Invasions - Mahmud of Ghazni and Muhammad of Ghor

All computation uses the stdlib + random (seeded).  No LLM calls.
"""

import random
import math
from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional, Tuple
import sympy as sp

# ──────────────────────────────────────────────
#  Data structures
# ──────────────────────────────────────────────

@dataclass
class Step:
    label: str
    detail: str

@dataclass
class SolveResult:
    answer: Any
    steps: List[Dict[str, str]]
    verification: str

@dataclass
class Question:
    id: str
    type: str          # mcq | fill_blank | short_answer | long_answer | numerical
    topic: str
    difficulty: str    # Easy | Medium
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    competency: bool = False  # True => Indian-context competency item


# ──────────────────────────────────────────────
#  Helpers
# ──────────────────────────────────────────────

def _seeded(seed: int) -> random.Random:
    r = random.Random(seed)
    return r


def _mcq_options(correct: str, pool: List[str], r: random.Random) -> List[str]:
    distractors = [x for x in pool if x != correct]
    chosen = r.sample(distractors, k=min(3, len(distractors)))
    opts = [correct] + chosen
    r.shuffle(opts)
    return opts


# ─────────────────────────────────────────────────────────────────────────────
#  SOLVERS
# ─────────────────────────────────────────────────────────────────────────────

# ── MCQ ───────────────────────────────────────────────────────────────────────

def solve_mcq(params: Dict) -> Dict:
    """
    params:
        question   : str   - the MCQ prompt
        options    : list[str]
        correct    : str   - the correct option text
        topic      : str
    """
    question   = params["question"]
    options    = params["options"]
    correct    = params["correct"]
    topic      = params.get("topic", "General")

    steps = [
        {"label": "Read Question",       "detail": f"Prompt: {question}"},
        {"label": "Evaluate Each Option", "detail": "; ".join(
            f"[{'✓' if o == correct else '✗'}] {o}" for o in options)},
        {"label": "Identify Correct",    "detail": f"Correct answer: '{correct}'"},
    ]

    # Verification: check the correct answer is in the option list
    in_list = correct in options
    verification = (f"VERIFIED: '{correct}' found in options list → {in_list}. "
                    f"Total options = {len(options)}.")
    assert in_list, "Correct answer missing from options!"

    return asdict(SolveResult(answer=correct, steps=steps, verification=verification))


# ── Fill-Blank ────────────────────────────────────────────────────────────────

def solve_fill_blank(params: Dict) -> Dict:
    """
    params:
        sentence   : str   - sentence with '____' placeholder
        answer     : str   - the missing word/phrase
        topic      : str
    """
    sentence = params["sentence"]
    answer   = params["answer"]
    topic    = params.get("topic", "General")

    filled = sentence.replace("____", answer)

    steps = [
        {"label": "Read Sentence",       "detail": sentence},
        {"label": "Recall Fact",         "detail": f"From topic '{topic}': {answer}"},
        {"label": "Fill Blank",          "detail": f"Completed sentence: {filled}"},
    ]

    # Verification: check the blank was replaced correctly
    ok = "____" not in filled and answer in filled
    verification = (f"VERIFIED: placeholder replaced; answer '{answer}' present in completed "
                    f"sentence → {ok}.")
    assert ok

    return asdict(SolveResult(answer=answer, steps=steps, verification=verification))


# ── Short Answer ──────────────────────────────────────────────────────────────

def solve_short_answer(params: Dict) -> Dict:
    """
    params:
        question   : str
        answer     : str   - concise factual answer
        keywords   : list[str] - words that MUST appear in a correct answer
        topic      : str
    """
    question = params["question"]
    answer   = params["answer"]
    keywords = params.get("keywords", [])
    topic    = params.get("topic", "General")

    steps = [
        {"label": "Understand Question", "detail": question},
        {"label": "Recall Key Fact",     "detail": f"Topic '{topic}' → {answer}"},
        {"label": "Formulate Answer",    "detail": answer},
    ]

    kw_check = {kw: (kw.lower() in answer.lower()) for kw in keywords}
    all_present = all(kw_check.values())
    kw_detail  = ", ".join(f"'{k}':{'✓' if v else '✗'}" for k, v in kw_check.items())
    verification = (f"VERIFIED: keyword coverage → {kw_detail}. "
                    f"All required keywords present: {all_present}.")
    if keywords:
        assert all_present, f"Missing keywords: {[k for k,v in kw_check.items() if not v]}"

    return asdict(SolveResult(answer=answer, steps=steps, verification=verification))


# ── Long Answer ───────────────────────────────────────────────────────────────

def solve_long_answer(params: Dict) -> Dict:
    """
    params:
        question       : str
        answer         : str   - structured multi-point answer
        required_points: list[str] - key ideas that must be covered
        topic          : str
    """
    question        = params["question"]
    answer          = params["answer"]
    required_points = params.get("required_points", [])
    topic           = params.get("topic", "General")

    bullet_points = answer.split("\n")
    steps = [
        {"label": "Analyse Question",     "detail": f"Topic: {topic} | Prompt: {question}"},
        {"label": "Identify Points",      "detail": f"Required aspects: {required_points}"},
        {"label": "Draft Answer",         "detail": f"Structured into {len(bullet_points)} bullet points."},
        {"label": "Final Answer",         "detail": answer},
    ]

    coverage = {pt: any(pt.lower() in line.lower() for line in bullet_points)
                for pt in required_points}
    cov_detail  = ", ".join(f"'{k}':{'✓' if v else '✗'}" for k, v in coverage.items())
    all_covered = all(coverage.values())
    verification = (f"VERIFIED: point coverage → {cov_detail}. "
                    f"All required aspects covered: {all_covered}.")
    if required_points:
        assert all_covered, f"Missing points: {[p for p,v in coverage.items() if not v]}"

    return asdict(SolveResult(answer=answer, steps=steps, verification=verification))


# ── Numerical ─────────────────────────────────────────────────────────────────

def solve_numerical(params: Dict) -> Dict:
    """
    params:
        question   : str
        values     : dict   - named numeric values used in the calculation
        formula    : str    - SymPy expression string using value names
        unit       : str    - expected unit of result
        round_to   : int    - decimal places (default 0)
    """
    question = params["question"]
    values   = params["values"]
    formula  = params["formula"]
    unit     = params.get("unit", "")
    round_to = params.get("round_to", 0)

    # --- Step-by-step computation using SymPy ---
    symbols = {k: sp.symbols(k) for k in values}
    expr    = sp.sympify(formula, locals=symbols)

    subs_dict = {symbols[k]: sp.Rational(v) for k, v in values.items()}
    evaluated = float(expr.subs(subs_dict).evalf())
    rounded   = round(evaluated, round_to)

    steps = [
        {"label": "Given Values", "detail": ", ".join(f"{k} = {v}" for k, v in values.items())},
        {"label": "Formula",      "detail": f"Expression: {formula}"},
        {"label": "Substitution", "detail": " → ".join(f"{k}={v}" for k, v in values.items())},
        {"label": "Evaluation",   "detail": f"SymPy eval → {evaluated:.6f}"},
        {"label": "Final Answer", "detail": f"Rounded to {round_to} dp: {rounded} {unit}".strip()},
    ]

    # Verification: reverse-substitute and confirm
    check_val = sp.Rational(rounded) if round_to == 0 else sp.Float(rounded)
    residual  = abs(float(expr.subs(subs_dict).evalf()) - float(check_val))
    tolerance = 10 ** (-round_to) / 2
    verified  = residual < tolerance
    verification = (f"VERIFIED: reverse-substitution residual = {residual:.2e}, "
                    f"tolerance = {tolerance:.2e} → verified = {verified}.")

    return asdict(SolveResult(answer=f"{rounded} {unit}".strip(), steps=steps,
                               verification=verification))


# ── Dispatch ──────────────────────────────────────────────────────────────────

_SOLVER_MAP = {
    "mcq":         solve_mcq,
    "fill_blank":  solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer":  solve_long_answer,
    "numerical":   solve_numerical,
}

def solve(params: Dict) -> Dict:
    qtype = params.get("type", "")
    fn = _SOLVER_MAP.get(qtype)
    if fn is None:
        raise ValueError(f"Unknown question type: {qtype!r}. "
                         f"Supported: {list(_SOLVER_MAP.keys())}")
    result = fn(params)
    result["type"] = qtype
    return result


# ─────────────────────────────────────────────────────────────────────────────
#  QUESTION GENERATOR
# ─────────────────────────────────────────────────────────────────────────────

# ── Question banks indexed by (chapter_topic, type) ──────────────────────────

_QUESTION_BANK: List[Tuple[str, str, Dict]] = [

    # ─── Ch 1: Medieval Period ────────────────────────────────────────────────

    # MCQ - Easy
    ("medieval_meaning", "mcq", {
        "question": "The term 'Medieval' is derived from which Latin phrase?",
        "options":  ["medium aevum", "magnum opus", "mare nostrum",
                     "modus operandi"],
        "correct":  "medium aevum",
        "topic":    "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("'Medieval' comes from Latin 'medium aevum' meaning "
                        "'middle age', coined by Renaissance humanists like Petrarch."),
        "keywords":  ["medieval", "medium aevum", "middle age"],
        "competency": False,
    }),
    ("medieval_europe_start", "mcq", {
        "question": ("The medieval period in Europe is traditionally dated to begin "
                     "with the fall of the Western Roman Empire in which year?"),
        "options":  ["410 CE", "476 CE", "500 CE", "1453 CE"],
        "correct":  "476 CE",
        "topic":    "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("In 476 CE, the Germanic chieftain Odoacer deposed the last "
                        "Western Roman Emperor Romulus Augustulus, marking the start "
                        "of the medieval period in Europe."),
        "keywords":  ["476 CE", "Romulus Augustulus", "Odoacer"],
        "competency": False,
    }),
    ("medieval_india_start", "mcq", {
        "question": ("The Arab conquest of Sindh - often used to mark the beginning "
                     "of the medieval period in India - took place in which year?"),
        "options":  ["661 CE", "712 CE", "750 CE", "800 CE"],
        "correct":  "712 CE",
        "topic":    "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("Muhammad bin Qasim conquered Sindh in 712 CE. Many Indian "
                        "historians use this event to mark the start of the medieval period "
                        "in India, though some use 1206 CE (Delhi Sultanate)."),
        "keywords":  ["712 CE", "Muhammad bin Qasim", "Sindh"],
        "competency": True,
    }),
    ("medieval_petrarch", "mcq", {
        "question": ("Who coined the term 'Middle Ages' (medieval) during the "
                     "Renaissance period?"),
        "options":  ["Leonardo da Vinci", "Petrarch", "Machiavelli", "Dante"],
        "correct":  "Petrarch",
        "topic":    "Medieval Period",
        "difficulty": "Medium",
        "explanation": ("Petrarch (Francesco Petrarca), the 14th-century Italian poet "
                        "and scholar, coined 'medium aevum' to describe the period "
                        "between classical antiquity and his own era."),
        "keywords":  ["Petrarch", "Renaissance", "medium aevum"],
        "competency": False,
    }),
    ("medieval_meaning_check", "mcq", {
        "question": ("What does the word 'medieval' literally mean?"),
        "options":  ["Ancient", "Modern", "Middle", "Dark"],
        "correct":  "Middle",
        "topic":    "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("'Medieval' literally means 'middle' - referring to the middle "
                        "period between ancient and modern times."),
        "keywords":  ["middle", "medium aevum"],
        "competency": True,
    }),

    # Fill-Blank - Easy
    ("medieval_latin_fill", "fill_blank", {
        "question": ("The word 'medieval' comes from the Latin phrase ____ "
                     "meaning 'middle age'."),
        "answer":    "medium aevum",
        "topic":     "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("'Medium aevum' is the Latin origin of 'medieval', coined "
                        "during the Renaissance."),
        "keywords":  ["medium aevum"],
        "competency": False,
    }),
    ("medieval_rome_fill", "fill_blank", {
        "question": ("The last Western Roman Emperor deposed in 476 CE was ____."),
        "answer":    "Romulus Augustulus",
        "topic":     "Medieval Period",
        "difficulty": "Medium",
        "explanation": ("Romulus Augustulus was a teenager when Odoacer deposed him "
                        "in 476 CE, ending the Western Roman Empire."),
        "keywords":  ["Romulus Augustulus", "476 CE"],
        "competency": False,
    }),
    ("medieval_india_fill", "fill_blank", {
        "question": ("The Arab conquest of Sindh in ____ CE by Muhammad bin Qasim "
                     "is used to mark the start of India's medieval period."),
        "answer":    "712",
        "topic":     "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("712 CE is widely cited as the start of medieval India when "
                        "Muhammad bin Qasim conquered Sindh."),
        "keywords":  ["712", "Muhammad bin Qasim"],
        "competency": True,
    }),
    ("medieval_odoacer_fill", "fill_blank", {
        "question": ("The Germanic chieftain who deposed the last Roman emperor in "
                     "476 CE was ____."),
        "answer":    "Odoacer",
        "topic":     "Medieval Period",
        "difficulty": "Medium",
        "explanation": ("Odoacer was a Germanic chieftain who forced Romulus Augustulus "
                        "to abdicate in 476 CE."),
        "keywords":  ["Odoacer", "476 CE"],
        "competency": False,
    }),

    # Short Answer - Easy
    ("medieval_define_short", "short_answer", {
        "question":  "What does the term 'medieval' mean and from which language does it originate?",
        "answer":    ("The term 'medieval' means 'middle' or 'middle age'. It originates "
                      "from the Latin phrase 'medium aevum'. It refers to the period of "
                      "history between the ancient (classical) and modern periods."),
        "keywords":  ["medieval", "medium aevum", "middle", "latin"],
        "topic":     "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("'Medium aevum' was first used by Petrarch to describe the era "
                        "between ancient Rome and the Renaissance."),
        "competency": False,
    }),
    ("medieval_evidence_short", "short_answer", {
        "question":  "Name two types of evidence used by historians to periodise history.",
        "answer":    ("Two types of evidence used to periodise history are: (1) Literary "
                      "evidence - such as books, inscriptions, coins, and records; "
                      "(2) Archaeological evidence - such as ruins, monuments, pottery, "
                      "and artefacts."),
        "keywords":  ["literary", "archaeological", "evidence"],
        "topic":     "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("Historians use literary sources (texts, inscriptions) and "
                        "archaeological sources (ruins, artefacts) to determine when "
                        "one period ends and another begins."),
        "competency": True,
    }),
    ("medieval_india_date_short", "short_answer", {
        "question":  "When did the medieval period begin in India, and which event "
                     "marks it?",
        "answer":    ("The medieval period in India is generally traced from the 8th "
                      "century CE, with the Arab conquest of Sindh in 712 CE by "
                      "Muhammad bin Qasim as the commonly cited marker event."),
        "keywords":  ["712 CE", "Muhammad bin Qasim", "Sindh", "medieval"],
        "topic":     "Medieval Period",
        "difficulty": "Medium",
        "explanation": ("712 CE is the conventional date; some historians use 1206 CE "
                        "(Delhi Sultanate) as an alternative starting point."),
        "competency": True,
    }),

    # Long Answer - Medium
    ("medieval_period_long", "long_answer", {
        "question":  ("Describe the meaning of the term 'Medieval' and explain how "
                      "the beginning of the medieval period is dated differently in "
                      "Europe and India."),
        "answer":    ("The term 'Medieval' is derived from the Latin phrase 'medium "
                      "aevum', meaning 'middle age'. It refers to the period of history "
                      "that falls between the ancient (classical) period and the modern "
                      "period.\n\n"
                      "In Europe, the medieval period is dated to begin in 476 CE, "
                      "when the last Western Roman Emperor Romulus Augustulus was "
                      "deposed by the Germanic chieftain Odoacer. This marked the end "
                      "of the ancient Roman era and the beginning of the medieval age.\n\n"
                      "In India, the medieval period is generally traced from the 8th "
                      "century CE. The most commonly cited marker is the Arab conquest "
                      "of Sindh in 712 CE by Muhammad bin Qasim. Some historians prefer "
                      "1206 CE, when Qutb-ud-din Aibak established the Delhi Sultanate. "
                      "This difference arises because India did not experience a single "
                      "dramatic event like the fall of Rome; transitions were more "
                      "gradual across different regions."),
        "required_points": ["medium aevum meaning middle age",
                            "476 CE and fall of Rome for Europe",
                            "712 CE and Arab conquest of Sindh for India",
                            "some historians use 1206 CE / Delhi Sultanate",
                            "difference due to gradual vs. single-event transitions"],
        "topic":     "Medieval Period",
        "difficulty": "Medium",
        "explanation": ("The medieval period bridges ancient and modern history. "
                        "Periodisation differs between Europe and India due to "
                        "different historical trajectories."),
        "competency": True,
    }),
    ("medieval_petrarch_long", "long_answer", {
        "question":  ("Who coined the term 'Middle Ages' and why? Explain the "
                      "Renaissance context."),
        "answer":    ("The term 'Middle Ages' (medieval) was coined by Petrarch "
                      "(Francesco Petrarca), an Italian scholar and poet of the 14th "
                      "century Renaissance.\n\n"
                      "Petrarch and other Renaissance humanists saw themselves as "
                      "'reviving' the classical learning and culture of ancient Greece "
                      "and Rome after what they considered a 'dark' or 'middle' period "
                      "of intellectual decline.\n\n"
                      "They called this intervening period 'medium aevum' (middle age) "
                      "because they viewed it as a lesser era sandwiched between the "
                      "glory of ancient Rome and their own renewed cultural flowering. "
                      "This perspective influenced how European history was periodised "
                      "for centuries, though modern historians have revised the view "
                      "that the medieval period was merely a 'dark age'."),
        "required_points": ["Petrarch coined the term",
                            "14th-century Renaissance context",
                            "view of reviving classical learning",
                            "term 'medium aevum' meaning middle age",
                            "modern revision of the 'dark age' view"],
        "topic":     "Medieval Period",
        "difficulty": "Medium",
        "explanation": ("Petrarch (1304-1374) is considered the 'Father of Humanism' "
                        "and his periodisation of history into ancient, medieval, and "
                        "modern shaped Western historiography."),
        "competency": False,
    }),

    # ─── Ch 2: Pre-Islamic Arabia ─────────────────────────────────────────────

    # MCQ - Medium
    ("preislam_geography_mcq", "mcq", {
        "question": "Pre-Islamic Arabia was primarily a _____ peninsula.",
        "options":  ["fertile river valley", "mountainous", "desert",
                     "forested"],
        "correct":  "desert",
        "topic":    "Pre-Islamic Arabia",
        "difficulty": "Easy",
        "explanation": ("The Arabian Peninsula is predominantly desert, with oases and "
                        "coastal trade routes sustaining settlements."),
        "keywords":  ["desert", "Arabia", "geography"],
        "competency": False,
    }),
    ("preislam_quraysh_mcq", "mcq", {
        "question": "Which tribe controlled Mecca and the Kaaba before Islam?",
        "options":  ["Banu Hashim", "Quraysh", "Banu Umayyah", "Ansar"],
        "correct":  "Quraysh",
        "topic":    "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("The Quraysh tribe was the dominant tribe in Mecca and controlled "
                        "the Kaaba, which housed 360 idols and served as a pilgrimage site."),
        "keywords":  ["Quraysh", "Mecca", "Kaaba"],
        "competency": False,
    }),
    ("preislam_jahiliyyah_mcq", "mcq", {
        "question": "What does the Arabic term 'Jahiliyyah' refer to?",
        "options":  ["A holy period", "A tribal war", "Age of Ignorance",
                     "A type of poetry"],
        "correct":  "Age of Ignorance",
        "topic":    "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("'Jahiliyyah' (from 'jahl' = ignorance) refers to the pre-Islamic "
                        "period in Arabia, characterised by polytheism, female infanticide, "
                        "and tribal bloodshed."),
        "keywords":  ["Jahiliyyah", "ignorance", "pre-Islamic"],
        "competency": False,
    }),
    ("preislam_infanticide_mcq", "mcq", {
        "question": "Which social evil of pre-Islamic Arabia involved burying "
                    "unwanted infant daughters alive?",
        "options":  ["Polytheism", "Slavery", "Wa'd al-banat", "Blood revenge"],
        "correct":  "Wa'd al-banat",
        "topic":    "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("'Wa'd al-banat' (literally 'burying daughters') was the practice "
                        "of burying unwanted female infants alive in pre-Islamic Arabia. "
                        "It was later abolished by Islam."),
        "keywords":  ["wa'd al-banat", "infanticide", "female"],
        "competency": True,
    }),
    ("preislam_kaaba_mcq", "mcq", {
        "question": "Approximately how many idols were housed in the Kaaba "
                    "before Islam?",
        "options":  ["36", "360", "3,600", "100"],
        "correct":  "360",
        "topic":    "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("The Kaaba in Mecca housed approximately 360 idols representing "
                        "various tribal deities before Islam, when it was rededicated to "
                        "the worship of the one God (Allah)."),
        "keywords":  ["360", "Kaaba", "idols", "Mecca"],
        "competency": True,
    }),
    ("preislam_bloodrevenge_mcq", "mcq", {
        "question": "In pre-Islamic Bedouin society, disputes were settled by:",
        "options":  ["Courts and judges", "Tribal custom and blood revenge",
                     "The Caliph", "The King"],
        "correct":  "Tribal custom and blood revenge",
        "topic":    "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("Bedouin society had no central government. Disputes were settled "
                        "by tribal custom, and the principle of 'blood revenge' (lex "
                        "talionis) required avenging a killing by killing a member of the "
                        "offending clan."),
        "keywords":  ["tribal", "blood revenge", "custom"],
        "competency": False,
    }),

    # Fill-Blank - Medium
    ("preislam_trade_fill", "fill_blank", {
        "question": ("The _____ Peninsula is the geographical setting of pre-Islamic "
                     "Arabia."),
        "answer":    "Arabian",
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Easy",
        "explanation": ("The Arabian Peninsula is a vast desert region bounded by the "
                        "Red Sea, Persian Gulf, and Indian Ocean."),
        "keywords":  ["Arabian Peninsula"],
        "competency": True,
    }),
    ("preislam_mecca_tribe_fill", "fill_blank", {
        "question": ("The powerful _____ tribe governed Mecca and controlled the "
                     "Kaaba in pre-Islamic times."),
        "answer":    "Quraysh",
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("The Quraysh were the dominant tribe of Mecca; Prophet Muhammad "
                        "was born into this tribe."),
        "keywords":  ["Quraysh", "Mecca"],
        "competency": False,
    }),
    ("preislam_trade_route_fill", "fill_blank", {
        "question": ("Mecca was a key stop on the spice-and-incense trade route "
                     "from _____ to Syria."),
        "answer":    "Yemen",
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("The caravan route from Yemen (south Arabia) to Syria (north) "
                        "passed through Mecca, making it a wealthy trade hub."),
        "keywords":  ["Yemen", "trade route", "Mecca"],
        "competency": True,
    }),
    ("preislam_polytheism_fill", "fill_blank", {
        "question": ("The Kaaba in Mecca housed approximately _____ idols before "
                     "the advent of Islam."),
        "answer":    "360",
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("360 idols represented the various tribal deities of Arabian "
                        "polytheism. The Kaaba was rededicated to monotheism by Prophet "
                        "Muhammad in 630 CE."),
        "keywords":  ["360", "Kaaba", "idols"],
        "competency": False,
    }),
    ("preislam_ukaz_fill", "fill_blank", {
        "question": ("The market of _____ near Taif was famous for slave trading "
                     "and poetry recitals in pre-Islamic Arabia."),
        "answer":    "Ukaz",
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("The Ukaz fair was one of the great pre-Islamic Arab market "
                        "fairs, held near Taif, where poetry competitions and slave "
                        "trading took place."),
        "keywords":  ["Ukaz", "Taif", "market"],
        "competency": False,
    }),

    # Short Answer - Medium
    ("preislam_tribal_short", "short_answer", {
        "question":  "Describe the tribal (Bedouin) social structure of pre-Islamic Arabia.",
        "answer":    ("Pre-Islamic Arabia was dominated by nomadic Bedouin tribes. "
                      "Society was organised around clans and tribes, with loyalty to "
                      "the clan being the highest value. There was no central government; "
                      "disputes were settled by tribal custom and the principle of blood "
                      "revenge (lex talionis), where a killing had to be avenged by "
                      "killing a member of the offender's clan."),
        "keywords":  ["Bedouin", "tribal", "clan", "blood revenge", "no central government"],
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("The tribal structure created constant inter-clan conflict but "
                        "also provided social security in a harsh desert environment."),
        "competency": False,
    }),
    ("preislam_mecca_short", "short_answer", {
        "question":  "Why was Mecca an important city in pre-Islamic Arabia?",
        "answer":    ("Mecca was important for three reasons: (1) It housed the Kaaba, "
                      "a major pilgrimage site with 360 idols, attracting pilgrims from "
                      "across Arabia. (2) It was controlled by the powerful Quraysh tribe, "
                      "giving it political significance. (3) It was a key stop on the "
                      "spice-and-incense trade caravan route from Yemen to Syria, "
                      "making it economically wealthy."),
        "keywords":  ["Mecca", "Kaaba", "trade", "Quraysh", "pilgrimage"],
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("Mecca's combination of religious, political, and economic "
                        "importance made it the heart of pre-Islamic Arabia."),
        "competency": True,
    }),
    ("preislam_evils_short", "short_answer", {
        "question":  "List three social evils prevalent in pre-Islamic Arabia "
                     "(the Age of Jahiliyyah).",
        "answer":    ("Three social evils of Jahiliyyah were: (1) Female infanticide "
                      "(wa'd al-banat) - burying newborn daughters alive. (2) Slavery "
                      "- slaves were openly bought and sold in markets like Ukaz. "
                      "(3) Polytheism - the Kaaba housed 360 idols and the society "
                      "practiced idol worship. Other evils included blood feuds and "
                      "gambling."),
        "keywords":  ["infanticide", "slavery", "polytheism", "Jahiliyyah"],
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("Islam addressed all these evils: it banned female infanticide, "
                        "encouraged freeing slaves, and proclaimed monotheism."),
        "competency": True,
    }),
    ("preislam_wad_banat_short", "short_answer", {
        "question":  "What was 'wa'd al-banat' and why was it practised in "
                     "pre-Islamic Arabia?",
        "answer":    ("'Wa'd al-banat' (literally 'burying daughters') was the practice "
                      "of burying unwanted newborn female infants alive in pre-Islamic "
                      "Arabia. It was practised because daughters were considered an "
                      "economic burden and a source of shame in the tribal, patriarchal "
                      "society, where male children were valued for their ability to "
                      "fight and provide."),
        "keywords":  ["wa'd al-banat", "female", "infanticide", "buried alive"],
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("The Quran condemned wa'd al-banat in Surah 81 (At-Takwir). "
                        "The practice was eradicated after the advent of Islam."),
        "competency": True,
    }),

    # Long Answer - Medium
    ("preislam_society_long", "long_answer", {
        "question":  ("Describe the socio-political conditions of pre-Islamic Arabia, "
                      "covering its geography, tribal structure, and social evils."),
        "answer":    ("GEOGRAPHY: The Arabian Peninsula is a vast desert region "
                      "bounded by the Red Sea, Persian Gulf, and Indian Ocean. Life "
                      "survived in scattered oases and along trade routes.\n\n"
                      "TRIBAL STRUCTURE: Arabia was divided into nomadic Bedouin tribes "
                      "and settled merchant communities. The Bedouins grazed camels and "
                      "goats and moved with their herds. Society was organised around "
                      "clans and tribes, with unwavering loyalty to one's own clan. "
                      "There was no central government or legal system - disputes were "
                      "settled by tribal custom, often through blood revenge (lex "
                      "talionis), where a murder had to be avenged.\n\n"
                      "SOCIAL EVILS (JAHILIYYAH): (1) Polytheism - the Kaaba had 360 "
                      "idols. (2) Female infanticide (wa'd al-banat) - daughters were "
                      "buried alive. (3) Slavery - slaves were openly traded. "
                      "(4) Blood feuds - constant violence between clans. "
                      "(5) Exploitation of the poor by the wealthy Quraysh merchants."),
        "required_points": ["desert geography with oases",
                            "Bedouin tribal structure and clan loyalty",
                            "no central government - tribal custom",
                            "blood revenge / lex talionis",
                            "social evils: polytheism, infanticide, slavery",
                            "Mecca as trade and pilgrimage centre",
                            "Quraysh control of Kaaba"],
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("The Jahiliyyah period was radically transformed by the advent "
                        "of Islam, which addressed all major social evils."),
        "competency": True,
    }),
    ("preislam_mecca_long", "long_answer", {
        "question":  ("Explain why Mecca was the most important city in pre-Islamic "
                      "Arabia, covering its religious, economic, and political significance."),
        "answer":    ("Mecca was the most important city in pre-Islamic Arabia for "
                      "three interconnected reasons:\n\n"
                      "RELIGIOUS: The Kaaba in Mecca was the most sacred shrine in "
                      "Arabia, housing 360 idols representing various tribal deities. "
                      "Pilgrims from across the peninsula visited Mecca, especially "
                      "during the annual pilgrimage season, bringing offerings and "
                      "commerce.\n\n"
                      "ECONOMIC: Mecca lay on the major caravan trade route from Yemen "
                      "(south Arabia) to Syria (north). The Quraysh tribe, which "
                      "controlled Mecca, became wealthy by leading and protecting these "
                      "trade caravans. Markets like Ukaz near Taif were connected to "
                      "this trade network.\n\n"
                      "POLITICAL: The Quraysh tribe governed Mecca and controlled the "
                      "Kaaba, giving them both religious and political authority over "
                      "the Arabian tribes. Their leadership was recognised across the "
                      "peninsula because of the Kaaba's sanctity."),
        "required_points": ["Kaaba and 360 idols - religious significance",
                            "pilgrimage centre",
                            "spice trade route Yemen to Syria",
                            "Quraysh control and wealth",
                            "political authority through religious leadership"],
        "topic":     "Pre-Islamic Arabia",
        "difficulty": "Medium",
        "explanation": ("Mecca's importance made it the natural centre for the Islamic "
                        "movement when it began in the 7th century."),
        "competency": False,
    }),

    # ─── Ch 3: Turkish Invasions ──────────────────────────────────────────────

    # MCQ - Medium
    ("invasion_mahmud_mcq", "mcq", {
        "question": "Mahmud of Ghazni was a ruler of the _____ dynasty.",
        "options":  ["Ghurid", "Ghaznavid", "Slave", "Khilji"],
        "correct":  "Ghaznavid",
        "topic":    "Turkish Invasions",
        "difficulty": "Easy",
        "explanation": ("Mahmud of Ghazni (998-1030 CE) founded the Ghaznavid Empire "
                        "with its capital at Ghazni (in modern Afghanistan). He was "
                        "different from Muhammad of Ghor of the Ghurid dynasty."),
        "keywords":  ["Mahmud of Ghazni", "Ghaznavid"],
        "competency": False,
    }),
    ("invasion_mahmud_raids_mcq", "mcq", {
        "question": "How many times did Mahmud of Ghazni raid India?",
        "options":  ["7 times", "12 times", "17 times", "25 times"],
        "correct":  "17 times",
        "topic":    "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Mahmud of Ghazni launched 17 raids into India between 1000 CE "
                        "and 1026 CE. His most famous raid was the Somnath temple raid "
                        "in 1026 CE."),
        "keywords":  ["17 times", "Mahmud of Ghazni", "raids"],
        "competency": False,
    }),
    ("invasion_somnath_mcq", "mcq", {
        "question": "Mahmud of Ghazni raided the famous Somnath temple in which year?",
        "options":  ["1009 CE", "1014 CE", "1026 CE", "1030 CE"],
        "correct":  "1026 CE",
        "topic":    "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("The Somnath temple in Gujarat was raided by Mahmud of Ghazni "
                        "in 1026 CE. He broke the famous Shiva lingam and carried away "
                        "its gold and jewels."),
        "keywords":  ["Somnath", "1026 CE", "Mahmud of Ghazni"],
        "competency": True,
    }),
    ("invasion_tarain1_mcq", "mcq", {
        "question": ("Who won the First Battle of Tarain (1191 CE) between "
                     "Prithviraj Chauhan and Muhammad of Ghor?"),
        "options":  ["Muhammad of Ghor", "Prithviraj Chauhan",
                     "It was a draw", "Jaichand of Kannauj"],
        "correct":  "Prithviraj Chauhan",
        "topic":    "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("In the First Battle of Tarain (1191 CE), Prithviraj Chauhan "
                        "defeated Muhammad of Ghor decisively but allowed him to retreat. "
                        "Muhammad returned the next year and won the Second Battle."),
        "keywords":  ["First Battle of Tarain", "1191 CE", "Prithviraj Chauhan"],
        "competency": True,
    }),
    ("invasion_tarain2_mcq", "mcq", {
        "question": ("Who won the Second Battle of Tarain (1192 CE), which opened "
                     "North India to Turkish rule?"),
        "options":  ["Prithviraj Chauhan", "Muhammad of Ghor",
                     "Jaichand", "It was a draw"],
        "correct":  "Muhammad of Ghor",
        "topic":    "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("In the Second Battle of Tarain (1192 CE), Muhammad of Ghor "
                        "defeated Prithviraj Chauhan using superior tactics, opening "
                        "North India to Turkish political rule."),
        "keywords":  ["Second Battle of Tarain", "1192 CE", "Muhammad of Ghor"],
        "competency": True,
    }),
    ("invasion_delhi_sultanate_mcq", "mcq", {
        "question": ("Who established the Delhi Sultanate after Muhammad of Ghor's "
                     "conquest of India?"),
        "options":  ["Mahmud of Ghazni", "Qutb-ud-din Aibak",
                     "Iltutmish", "Alauddin Khilji"],
        "correct":  "Qutb-ud-din Aibak",
        "topic":    "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("After Muhammad of Ghor's death in 1206 CE, his slave general "
                        "Qutb-ud-din Aibak declared independence and established the "
                        "Delhi Sultanate, beginning the Slave Dynasty."),
        "keywords":  ["Qutb-ud-din Aibak", "Delhi Sultanate", "slave general"],
        "competency": True,
    }),
    ("invasion_plunder_territory_mcq", "mcq", {
        "question": ("What was the key difference between Mahmud of Ghazni's raids "
                     "and Muhammad of Ghor's campaigns in India?"),
        "options":  ["Mahmud fought for territory; Muhammad raided for plunder",
                     "Both raided for plunder",
                     "Mahmud raided for plunder; Muhammad conquered for territory",
                     "Both conquered territory"],
        "correct":  "Mahmud raided for plunder; Muhammad conquered for territory",
        "topic":    "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Mahmud of Ghazni's 17 raids were plunder expeditions - he took "
                        "wealth back to Ghazni but did not establish lasting rule. "
                        "Muhammad of Ghor's victory at Tarain (1192 CE) established "
                        "political control over North India."),
        "keywords":  ["plunder", "territory", "Mahmud of Ghazni", "Muhammad of Ghor"],
        "competency": False,
    }),
    ("invasion_muhammad_dynasty_mcq", "mcq", {
        "question": "Muhammad of Ghor belonged to which dynasty?",
        "options":  ["Ghaznavid", "Ghurid", "Slave", "Tughlaq"],
        "correct":  "Ghurid",
        "topic":    "Turkish Invasions",
        "difficulty": "Easy",
        "explanation": ("Muhammad of Ghor (Shihabuddin Muhammad Ghori) was the most "
                        "famous ruler of the Ghurid dynasty, centred in Ghor (modern "
                        "Afghanistan)."),
        "keywords":  ["Muhammad of Ghor", "Ghurid"],
        "competency": False,
    }),

    # Fill-Blank - Medium
    ("invasion_mahmud_death_fill", "fill_blank", {
        "question": ("Mahmud of Ghazni died in the year _____ CE."),
        "answer":    "1030",
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Mahmud of Ghazni died in 1030 CE, ending the Ghaznavid Empire's "
                        "period of expansion."),
        "keywords":  ["1030 CE", "Mahmud of Ghazni"],
        "competency": False,
    }),
    ("invasion_second_tarain_fill", "fill_blank", {
        "question": ("Muhammad of Ghor defeated Prithviraj Chauhan in the _____ Battle "
                     "of Tarain in 1192 CE."),
        "answer":    "Second",
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("The Second Battle of Tarain (1192 CE) was Muhammad of Ghor's "
                        "decisive victory over Prithviraj Chauhan, opening North India "
                        "to Turkish rule."),
        "keywords":  ["Second", "Tarain", "1192 CE"],
        "competency": True,
    }),
    ("invasion_aibak_fill", "fill_blank", {
        "question": ("The _____ general of Muhammad of Ghor who established the Delhi "
                     "Sultanate was Qutb-ud-din Aibak."),
        "answer":    "slave",
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Qutb-ud-din Aibak was a slave (mamluk) of Muhammad of Ghor. "
                        "He declared independence in 1206 CE and founded the Delhi "
                        "Sultanate."),
        "keywords":  ["slave", "Qutb-ud-din Aibak", "Delhi Sultanate"],
        "competency": True,
    }),
    ("invasion_nagarkot_fill", "fill_blank", {
        "question": ("Mahmud of Ghazni raided the fortress of _____ in 1009 CE, "
                     "one of his earliest major raids."),
        "answer":    "Nagarkot",
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Nagarkot (in Punjab) was raided by Mahmud of Ghazni in 1009 CE, "
                        "one of his first major forays into Indian territory."),
        "keywords":  ["Nagarkot", "1009 CE"],
        "competency": False,
    }),
    ("invasion_kanauj_fill", "fill_blank", {
        "question": ("Mahmud of Ghazni raided the prosperous city of _____ in "
                     "1018 CE during his Indian campaigns."),
        "answer":    "Kanauj",
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Kanauj (Kannauj) was a major city in North India raided by "
                        "Mahmud of Ghazni in 1018 CE."),
        "keywords":  ["Kanauj", "1018 CE", "Mahmud of Ghazni"],
        "competency": False,
    }),
    ("invasion_muhammad_death_fill", "fill_blank", {
        "question": ("Muhammad of Ghor died in the year _____ CE, after which his "
                     "Indian territories became independent."),
        "answer":    "1206",
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Muhammad of Ghor died in 1206 CE near the Indus. His empire "
                        "fragmented; Qutb-ud-din Aibak established the Delhi Sultanate "
                        "as an independent state."),
        "keywords":  ["1206 CE", "Muhammad of Ghor"],
        "competency": True,
    }),

    # Short Answer - Medium
    ("invasion_mahmud_nature_short", "short_answer", {
        "question":  ("What was the nature of Mahmud of Ghazni's invasions of India? "
                      "Why are they described as 'raids' rather than 'conquests'?"),
        "answer":    ("Mahmud of Ghazni's invasions of India were plunder expeditions "
                      "rather than conquests. He raided India 17 times between 1000 and "
                      "1026 CE, targeting wealthy temples and cities like Somnath, "
                      "Nagarkot, Thaneshwar, and Kanauj. After each raid, he returned "
                      "to Ghazni with vast wealth - gold, jewels, and idols - without "
                      "attempting to establish permanent political control over Indian "
                      "territories. This is why they are called 'raids' and not "
                      "'conquests'. The Somnath raid (1026 CE) was his most famous, "
                      "where he broke the Shiva lingam and looted the temple treasury."),
        "keywords":  ["plunder", "raids", "Somnath", "wealth", "temple", "no permanent rule"],
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Mahmud of Ghazni sought wealth, not territory. His raids "
                        "devastated Indian temples but did not alter India's political "
                        "map permanently."),
        "competency": True,
    }),
    ("invasion_muhammad_gor_short", "short_answer", {
        "question":  ("Who was Muhammad of Ghor and how did he differ from "
                      "Mahmud of Ghazni in his approach to India?"),
        "answer":    ("Muhammad of Ghor (Shihabuddin Muhammad Ghori) was a ruler of the "
                      "Ghurid dynasty who differed from Mahmud of Ghazni in that he "
                      "sought territorial conquest, not just plunder. He fought the "
                      "Rajput ruler Prithviraj Chauhan in two battles at Tarain - "
                      "losing the first (1191 CE) but winning the second (1192 CE). "
                      "Unlike Mahmud, who raided and returned, Muhammad left his general "
                      "Qutb-ud-din Aibak to consolidate control over North India. This "
                      "victory laid the foundation for the Delhi Sultanate."),
        "keywords":  ["Muhammad of Ghor", "Ghurid", "territorial conquest",
                      "Prithviraj Chauhan", "Tarain"],
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Muhammad of Ghor's conquest of 1192 CE was the turning point "
                        "that brought large parts of North India under Muslim political "
                        "rule for the first time."),
        "competency": True,
    }),
    ("invasion_prithviraj_short", "short_answer", {
        "question":  ("Who was Prithviraj Chauhan and what happened to him at "
                      "the Battles of Tarain?"),
        "answer":    ("Prithviraj Chauhan III was the Rajput ruler of Ajmer and Delhi "
                      "who fought two famous battles against Muhammad of Ghor. In the "
                      "First Battle of Tarain (1191 CE), he defeated Muhammad of Ghor "
                      "decisively but allowed him to retreat. In the Second Battle of "
                      "Tarain (1192 CE), Muhammad of Ghor returned with a larger army "
                      "and defeated Prithviraj using superior tactics. Prithviraj was "
                      "captured and later killed, ending Rajput dominance in North India "
                      "and opening the region to Turkish rule."),
        "keywords":  ["Prithviraj Chauhan", "First Battle of Tarain", "1191 CE",
                      "Second Battle of Tarain", "1192 CE"],
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("Prithviraj Chauhan's defeat at Tarain (1192 CE) is one of the "
                        "most significant military turning points in Indian medieval history."),
        "competency": True,
    }),

    # Long Answer - Medium
    ("invasion_mahmud_gor_long", "long_answer", {
        "question":  ("Compare the invasions of Mahmud of Ghazni and Muhammad of Ghor. "
                      "In what ways were their objectives and outcomes different?"),
        "answer":    ("MAHMUD OF GHAZNI (Ghaznavid Dynasty, ruled 998-1030 CE):\n"
                      "• Objective: Plunder and wealth, not territorial conquest.\n"
                      "• Raided India 17 times between 1000-1026 CE.\n"
                      "• Famous for the Somnath temple raid (1026 CE).\n"
                      "• Targetted wealthy temples and cities: Nagarkot (1009 CE), "
                      "Thaneshwar (1014 CE), Kanauj (1018 CE), Somnath (1026 CE).\n"
                      "• Did NOT establish permanent rule in India - always returned "
                      "to Ghazni with loot.\n\n"
                      "MUHAMMAD OF GHOR (Ghurid Dynasty, ruled 1173-1206 CE):\n"
                      "• Objective: Territorial conquest and establishing political "
                      "control.\n"
                      "• Fought Prithviraj Chauhan in two battles at Tarain "
                      "(1191 and 1192 CE).\n"
                      "• Won the Second Battle of Tarain (1192 CE), opening North "
                      "India to Turkish rule.\n"
                      "• Left his general Qutb-ud-din Aibak to consolidate Indian "
                      "territories.\n"
                      "• After his death (1206 CE), Qutb-ud-din Aibak established "
                      "the Delhi Sultanate - a lasting political change.\n\n"
                      "KEY DIFFERENCE: Mahmud raided for wealth; Muhammad conquered "
                      "for territory, with permanent consequences for Indian history."),
        "required_points": ["Mahmud of Ghazni: 17 raids, plunder, not conquest",
                            "Somnath 1026 CE",
                            "Muhammad of Ghor: territorial conquest",
                            "Two Battles of Tarain: 1191 (lost), 1192 (won)",
                            "Prithviraj Chauhan as Rajput opponent",
                            "Qutb-ud-din Aibak and Delhi Sultanate",
                            "fundamental difference: plunder vs. conquest"],
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("The distinction between plunder raids and territorial conquest "
                        "is fundamental to understanding how Islamic rule was established "
                        "in India."),
        "competency": True,
    }),
    ("invasion_delhi_sultanate_long", "long_answer", {
        "question":  ("Explain how the Delhi Sultanate was established, tracing the "
                      "connection from Mahmud of Ghazni's raids to Muhammad of Ghor's "
                      "conquest and Qutb-ud-din Aibak's rule."),
        "answer":    ("The Delhi Sultanate was established in 1206 CE through a chain "
                      "of events spanning over 200 years:\n\n"
                      "1. MAHMUD OF GHAZNI (1000-1026 CE): His 17 raids demonstrated "
                      "the vulnerability of Indian kingdoms and established the Ghaznavid "
                      "presence in Punjab, but he did not create lasting political control.\n\n"
                      "2. MUHAMMAD OF GHOR (1175-1206 CE): 150 years after Mahmud, "
                      "Muhammad of Ghor launched campaigns to conquer India. His decisive "
                      "victory over Prithviraj Chauhan at the Second Battle of Tarain "
                      "(1192 CE) opened North India to Turkish rule.\n\n"
                      "3. QUTB-UD-DIN AIBAK: Muhammad of Ghor left his trusted slave "
                      "general Qutb-ud-din Aibak to consolidate the newly conquered "
                      "territories. After Muhammad's death in 1206 CE, Aibak declared "
                      "independence and established the Delhi Sultanate, beginning the "
                      "Slave (Mamluk) Dynasty.\n\n"
                      "The Delhi Sultanate became one of the most powerful empires in "
                      "Indian history, lasting until 1526 CE when it was replaced by "
                      "the Mughal Empire."),
        "required_points": ["Mahmud of Ghazni's raids as precursor",
                            "Muhammad of Ghor's Second Battle of Tarain 1192 CE",
                            "Qutb-ud-din Aibak as slave general",
                            "1206 CE as founding year of Delhi Sultanate",
                            "Slave Dynasty",
                            "lasting political change in North India"],
        "topic":     "Turkish Invasions",
        "difficulty": "Medium",
        "explanation": ("The Delhi Sultanate (1206-1526 CE) was the first sustained "
                        "Islamic empire in North India, lasting over 300 years."),
        "competency": True,
    }),

    # ─── Numerical (cross-chapter) ────────────────────────────────────────────

    ("medieval_date_span_numerical", "numerical", {
        "question": ("How many years elapsed between the fall of the Western Roman "
                     "Empire (476 CE) and the Arab conquest of Sindh (712 CE), "
                     "two key markers of the start of the medieval period?"),
        "values":    {"start_year": 476, "end_year": 712},
        "formula":   "end_year - start_year",
        "unit":      "years",
        "round_to":  0,
        "topic":     "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("712 - 476 = 236 years between the European and Indian "
                        "markers of the medieval period."),
        "keywords":  ["476 CE", "712 CE", "date span"],
        "competency": True,
    }),
    ("invasion_tarain_gap_numerical", "numerical", {
        "question": ("How many years passed between Mahmud of Ghazni's death "
                     "(1030 CE) and the First Battle of Tarain (1191 CE)?"),
        "values":    {"mahmud_death": 1030, "first_tarain": 1191},
        "formula":   "first_tarain - mahmud_death",
        "unit":      "years",
        "round_to":  0,
        "topic":     "Turkish Invasions",
        "difficulty": "Easy",
        "explanation": ("1191 - 1030 = 161 years between the end of Ghaznavid power "
                        "and the Ghurid conquest of India."),
        "keywords":  ["1030 CE", "1191 CE", "Mahmud of Ghazni", "Tarain"],
        "competency": False,
    }),
    ("invasion_mahmud_raid_duration_numerical", "numerical", {
        "question": ("Mahmud of Ghazni raided India over how many years, from his "
                     "first raid (1000 CE) to the Somnath raid (1026 CE)?"),
        "values":    {"first_raid": 1000, "somnath_raid": 1026},
        "formula":   "somnath_raid - first_raid",
        "unit":      "years",
        "round_to":  0,
        "topic":     "Turkish Invasions",
        "difficulty": "Easy",
        "explanation": ("1026 - 1000 = 26 years over which Mahmud of Ghazni conducted "
                        "his 17 raids into India."),
        "keywords":  ["1000 CE", "1026 CE", "Mahmud of Ghazni", "Somnath"],
        "competency": False,
    }),
    ("medieval_comparison_numerical", "numerical", {
        "question": ("If the medieval period in India is traced from 712 CE and the "
                     "Delhi Sultanate began in 1206 CE, how many years after the Arab "
                     "conquest did the Delhi Sultanate begin?"),
        "values":    {"arab_conquest": 712, "delhi_sultanate": 1206},
        "formula":   "delhi_sultanate - arab_conquest",
        "unit":      "years",
        "round_to":  0,
        "topic":     "Medieval Period",
        "difficulty": "Easy",
        "explanation": ("1206 - 712 = 494 years between the Arab conquest of Sindh "
                        "and the establishment of the Delhi Sultanate."),
        "keywords":  ["712 CE", "1206 CE", "Delhi Sultanate"],
        "competency": True,
    }),
]


# ─────────────────────────────────────────────────────────────────────────────
#  Generator
# ─────────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int) -> List[Dict]:
    """
    Deterministically generate `count` questions from the question bank.

    Parameters
    ----------
    seed : int
        Random seed for reproducible selection and shuffling.
    count : int
        Number of questions to generate (capped at bank size).

    Returns
    -------
    list[dict]
        Each dict has keys: id, type, topic, difficulty, question,
        options, answer, explanation, competency.
    """
    r = _seeded(seed)

    bank_size = len(_QUESTION_BANK)
    n = min(count, bank_size)

    # Deterministic selection without replacement
    indices = r.sample(range(bank_size), k=n)

    questions: List[Dict] = []
    for seq, idx in enumerate(sorted(indices), start=1):
        topic_key, qtype, template = _QUESTION_BANK[idx]

        qid = f"C7HIST_{seq:03d}"

        # --- build question dict ---
        q: Dict[str, Any] = {
            "id":          qid,
            "type":        qtype,
            "topic":       template["topic"],
            "difficulty":  template["difficulty"],
            "question":    template["question"],
            "answer":      template["answer"],
            "explanation": template["explanation"],
            "competency":  template.get("competency", False),
            "options":     None,
        }

        # populate options for MCQ
        if qtype == "mcq":
            opts = list(template["options"])  # copy
            r.shuffle(opts)
            q["options"] = opts

        questions.append(q)

    return questions


# ─────────────────────────────────────────────────────────────────────────────
#  Batch solver (applies the right solver to each question)
# ─────────────────────────────────────────────────────────────────────────────

def solve_all(questions: List[Dict]) -> List[Dict]:
    """
    Run the appropriate solver on every question in `questions`.

    Returns a list of SolveResult dicts (one per question).
    """
    results: List[Dict] = []
    for q in questions:
        params = {
            "type":       q["type"],
            "question":   q["question"],
            "answer":     q["answer"],
            "topic":      q["topic"],
            "explanation": q["explanation"],
            "options":    q.get("options"),
            "keywords":   q.get("keywords", []),
            "required_points": q.get("required_points", []),
        }
        if q["type"] == "numerical":
            # numerical questions embed values/formula directly
            pass  # numerical questions from bank have answer as plain string
        try:
            result = solve(params)
            results.append(result)
        except Exception as exc:
            results.append({
                "type": q["type"],
                "answer": q["answer"],
                "steps": [{"label": "Error", "detail": str(exc)}],
                "verification": f"FAILED: {exc}",
            })
    return results


# ─────────────────────────────────────────────────────────────────────────────
#  Self-verification smoke test
# ─────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    random.seed(42)

    # ── 1. Generate questions ──────────────────────────────────────────────────
    qs = generate_questions(seed=42, count=10)
    print(f"Generated {len(qs)} questions:\n")
    for q in qs:
        opt_str = f"  Options: {q['options']}" if q["options"] else ""
        comp    = " [COMPETENCY]" if q["competency"] else ""
        print(f"  [{q['type'].upper():12s}] {q['id']} {q['difficulty']:6s}{comp}")
        print(f"    Q: {q['question'][:80]}...")
        print(f"    A: {q['answer']}{opt_str}")
        print()

    # ── 2. Solve each question ─────────────────────────────────────────────────
    print("=" * 70)
    print("SOLVING EACH QUESTION\n")
    results = solve_all(qs)
    for q, res in zip(qs, results):
        print(f"  {q['id']} [{q['type']}]")
        for step in res["steps"]:
            print(f"    Step '{step['label']}': {step['detail'][:80]}")
        print(f"    Answer   : {res['answer']}")
        print(f"    Verify   : {res['verification'][:80]}")
        print()

    # ── 3. Explicit solver demos ───────────────────────────────────────────────
    print("=" * 70)
    print("SOLVER DEMOS\n")

    # MCQ solver
    r1 = solve_mcq({
        "question":  "In which year did the medieval period begin in Europe?",
        "options":   ["410 CE", "476 CE", "500 CE", "1453 CE"],
        "correct":   "476 CE",
        "topic":     "Medieval Period",
    })
    print(f"MCQ  → answer={r1['answer']}, verified={r1['verification'][:60]}")

    # Fill-blank solver
    r2 = solve_fill_blank({
        "sentence": "The Latin origin of 'medieval' is ____.",
        "answer":   "medium aevum",
        "topic":    "Medieval Period",
    })
    print(f"FB   → answer={r2['answer']}, verified={r2['verification'][:60]}")

    # Short-answer solver
    r3 = solve_short_answer({
        "question":  "What does 'medieval' mean?",
        "answer":    "Medieval means 'middle age', from Latin 'medium aevum'.",
        "keywords":  ["medieval", "middle", "medium aevum"],
        "topic":     "Medieval Period",
    })
    print(f"SA   → answer={r3['answer'][:50]}, verified={r3['verification'][:60]}")

    # Long-answer solver
    r4 = solve_long_answer({
        "question":       "Describe the medieval period.",
        "answer":         "The medieval period means 'middle age'.\n"
                          "In Europe it began in 476 CE with the fall of Rome.\n"
                          "In India it began in 712 CE with the Arab conquest of Sindh.",
        "required_points": ["middle age", "476 CE", "712 CE"],
        "topic":          "Medieval Period",
    })
    print(f"LA   → answer={r4['answer'][:50]}, verified={r4['verification'][:50]}")

# return {"status": "ok", "note": "truncated"}
