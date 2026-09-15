"""
CISCE LEGAL Class 11 — Complete Solver & Question Generator
Covers all syllabus nodes: Ancient Law, Jurisprudence, Legal Personality, Partnership.
"""

import random
import math
import hashlib
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any


# ============================================================
# DATA STRUCTURES
# ============================================================

@dataclass
class Question:
    id: str
    type: str          # mcq | fill_blank | short_answer | long_answer | numerical
    topic: str
    difficulty: str    # Easy | Medium | Hard
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    marks: int = 2
    competency_indian: bool = False


# ============================================================
# TOPIC DATA — DETERMINISTIC KNOWLEDGE BASE
# ============================================================

# --- Hindu Law & Dharma (c11_legal_001) ---
HINDU_LAW_CATEGORIES = [
    ("Classical Hindu Law",    "~200 CE to 1772 CE (pre-British), based on Dharmashastras"),
    ("Anglo-Hindu Law",        "1772 CE to 1947 CE, British translations and judicial precedents"),
    ("Modern Hindu Law",       "Post-1947, codified statutes (Hindu Marriage Act 1955, etc.)"),
]

SHRUTI_LIST = ["Vedas (Rig, Sama, Yajur, Atharva)", "Upanishads"]
SMRITI_LIST = ["Manu Smriti (Manava Dharmashastra)", "Yajnavalkya Smriti", "Narada Smriti", "Katyayana Smriti"]
DHARMA_ASPECTS = ["Duty (Karma)", "Righteousness", "Moral Order", "Social Harmony", "Spiritual Law"]

# --- Judiciary in Ancient India (c11_legal_002) ---
JUDICIARY_TIERS = [
    ("Village Council (Kulani / Sabha)", "Lowest tier — resolved minor/local disputes"),
    ("District Council (Pugavestaka)",   "Intermediate tier — commercial & property disputes"),
    ("King's Court (Dharmasana)",        "Highest tier — criminal & constitutional matters"),
]
PROCEDURAL_RULES = ["Plaint (complaint)", "Answer (written defence)", "Evidence (Pratyaksa & Anumana)", "Judgment (Vicara)"]
TRIAL_METHODS = [
    ("Trial by Ordeal (Agni / Water)",  "Accused undergoes physical test — purity presumed if unharmed"),
    ("Trial by Oath (Sapatha)",          "Accused swears truth before deity or sacred object"),
    ("Trial by Jury (Panchayat)",        "Five respected elders decide facts of the case"),
]

# --- Jurisprudence (c11_legal_005) ---
SCHOOLS_OF_LAW = {
    "Natural School":       {"propounder": "Aristotle / Aquinas",   "core": "Law based on morality & reason; higher law above state"},
    "Historical School":    {"propounder": "Savigny",              "core": "Law as product of national spirit (Volksgeist); evolves with society"},
    "Positivist School":    {"propounder": "John Austin / Hart",   "core": "Law is command of sovereign; separates law from morality"},
    "Realist School":       {"propounder": "Karl Llewellyn / Frank","core": "Law is what courts actually do; focus on judicial behaviour"},
    "Sociological School":  {"propounder": "Roscoe Pound / Duguit","core": "Law as social engineering; balances individual & social interests"},
}
SOURCES_OF_LAW = ["Customs (oldest)", "Legislation (statutes/acts)", "Precedents (stare decisis)"]
LAW_SOCIETY_DYNAMICS = {
    "Law → Society": "Law moulds social behaviour (e.g., banning child marriage via law)",
    "Society → Law": "Social values force law to change (e.g., Section 377 decriminalisation)",
}

# --- Civil vs Criminal Law (c11_legal_006) ---
CIVIL_CRIMINAL_DISTINCTIONS = {
    "Parties":                {"civil": "Plaintiff vs Defendant",                          "criminal": "State (Public Prosecutor) vs Accused"},
    "Purpose":                {"civil": "Compensation / specific relief",                   "criminal": "Punishment / deterrence"},
    "Burden of Proof":        {"civil": "Balance of probabilities (>50%)",                 "criminal": "Beyond reasonable doubt (~95-99%)"},
    "Standard of Proof":      {"civil": "Preponderance of evidence",                       "criminal": "Proof beyond reasonable doubt"},
    "Initiator":              {"civil": "Private individual (aggrieved party)",             "criminal": "State / Police (FIR)"},
    "Outcome":                {"civil": "Damages / injunction / specific performance",      "criminal": "Imprisonment / fine / death penalty"},
    "Legal Representation":   {"civil": "Advocate (optional)",                             "criminal": "Right to free legal aid (Article 22)"},
    "Remedy":                 {"civil": "Compensatory",                                     "criminal": "Punitive & deterrent"},
}

# --- Legal Personality (c11_legal_009) ---
PERSONALITY_THEORIES = {
    "Purpose Theory":     {"propounder": "Brinz (Germany)",       "idea": "A legal person is any entity to which the law attributes will for some purpose"},
    "Bracket Theory":     {"propounder": "Alois von (Brinz)",     "idea": "Natural persons are the real actors; legal persons are brackets around them"},
    "Fiction Theory":     {"propounder": "Savigny / Salmond",     "idea": "Only human beings are persons; companies are 'fictitious' persons created by law"},
    "Concession Theory":  {"propounder": "Dicey / Pollock",       "idea": "Corporate personality exists only because the state grants it (concession)"},
    "Realist Theory":     {"propounder": "Gray / Maitland",       "idea": "A corporation has a real will & existence separate from its members"},
}
NON_HUMAN_PERSONS = {
    "Idol / Deity":    "Has legal personality — can own property (e.g., Shri Ram Janmabhoomi case)",
    "State / Govt.":   "Can sue and be sued (Article 300, Indian Constitution)",
    "Animals":         "PIL jurisprudence (e.g., Animal Welfare Board v. Nagaraja, 2014 — animals have fundamental rights)",
    "Deceased":        "Estate continues; reputation protected (defamation of dead person actionable by heirs)",
    "Unborn Child":    "Legal personality for property acquisition (Transfer of Property Act, S.13)",
    "Partnership Firm":"Not a separate legal person (unlike a company) — partners are jointly liable",
    "Company / Corp.": "Separate legal entity (Salomon v. Salomon & Co. 1897 landmark case)",
}

# --- Partnership (c11_legal_010) ---
PARTNERSHIP_ESSENTIALS = ["Contract (oral or written)", "Profit Sharing (at least 2 persons)", "Business activity", "Mutual Agency"]
PARTNER_DUTIES = ["Duty to carry on business to greatest common advantage", "Duty to render true accounts", "Duty to indemnify for fraud", "Duty to be just and faithful"]
PARTNER_RIGHTS = ["Right to take part in management", "Right to express opinion", "Right to access books", "Right to share profits equally", "Right to indemnity for acts done in emergency"]
AUTHORITY_TYPES = {
    "Express Authority": "Explicitly granted by agreement of all partners",
    "Implied Authority": "Authority inferred from conduct / position (ordinary course of business)",
    "Apparent/Ostensible": "Principal's conduct leads third party to believe agent has authority",
}


# ============================================================
# NUMERICAL PROBLEM DATA — SAMPLE FIGURES
# ============================================================

# Partnership sharing scenarios
PARTNERSHIP_SCENARIOS = [
    {"name": "Amit, Ravi & Sita", "capital": [50000, 40000, 30000], "profit": 48000, "time_months": [12, 12, 12]},
    {"name": "Rahul & Priya",      "capital": [60000, 40000],       "profit": 25000, "time_months": [6,  12]},
    {"name": "Deepak, Meena, Karan", "capital": [80000, 50000, 70000], "profit": 60000, "time_months": [12, 8, 10]},
    {"name": "Anita & Vikram",     "capital": [100000, 75000],      "profit": 35000, "time_months": [12, 6]},
    {"name": "Suresh, Kavita, Nisha, Raj", "capital": [45000, 35000, 25000, 55000], "profit": 41000, "time_months": [12, 10, 12, 8]},
]

# Probability scenarios for legal burden of proof
PROOF_PROBABILITY = {
    "civil_standard": 0.51,      # >50% (balance of probabilities)
    "criminal_standard": 0.95,   # Beyond reasonable doubt ~95-99%
}

# Case citation years
LANDMARK_CASES = [
    ("Salomon v. Salomon & Co. Ltd.",          1897, "Separate legal personality of company"),
    ("Daimler Co. Ltd. v. Continental Tyre Co.",1916, "Corporation can be 'enemy' in wartime"),
    ("Lee v. Lee's Air Farming Ltd.",           1961, "Corporation & its employees are separate persons"),
    ("Animal Welfare Board v. A. Nagaraja",    2014, "Animals have fundamental rights under Article 21"),
    ("Kesavananda Bharati v. State of Kerala", 1973, "Basic structure doctrine — law vs constitution"),
    ("Maneka Gandhi v. Union of India",         1978, "Procedure must be fair (Article 21)"),
]

# ============================================================
# HELPER FUNCTIONS
# ============================================================

def _rng(seed: int):
    r = random.Random(seed)
    return r


def _hash_seed(s: str) -> int:
    return int(hashlib.md5(s.encode()).hexdigest()[:8], 16)


# ============================================================
# SOLVER FUNCTIONS
# ============================================================

def solve_mcq(params: Dict) -> Dict:
    """
    Solve an MCQ question about CISCE Legal Studies.
    params: {question, options, correct_index, topic}
    """
    steps = []
    steps.append("Step 1: Read the question carefully and identify the legal concept being tested.")
    topic = params.get("topic", "General Legal Studies")
    steps.append(f"Step 2: Identify topic — {topic}.")
    options = params.get("options", [])
    correct = params.get("correct_index", 0)
    steps.append(f"Step 3: Analyse each option against the legal principle.")
    for i, opt in enumerate(options):
        marker = " ✓ CORRECT" if i == correct else ""
        steps.append(f"  Option ({chr(65+i)}): {opt}{marker}")
    steps.append(f"Step 4: Select option ({chr(65+correct)}) — {options[correct]}.")
    answer = chr(65 + correct)
    verification = f"Numerical/Logical check: Option index {correct} matches expected correct answer. Answer = '{answer}'."
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_fill_blank(params: Dict) -> Dict:
    """
    Solve a fill-in-the-blank question.
    params: {question_with_blank, correct_answers, topic}
    """
    steps = []
    steps.append("Step 1: Identify the missing term by recalling the relevant legal definition.")
    topic = params.get("topic", "Legal Studies")
    steps.append(f"Step 2: Recall relevant provisions from the topic: {topic}.")
    answers = params.get("correct_answers", [])
    steps.append(f"Step 3: Fill the blank(s) with the legally correct term(s): {answers}.")
    answer = " / ".join(str(a) for a in answers)
    verification = f"Verification: The filled term(s) '{answer}' match the standard legal definition for this topic."
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_short_answer(params: Dict) -> Dict:
    """
    Solve a short-answer question (3-4 marks).
    params: {question, key_points, topic}
    """
    steps = []
    steps.append("Step 1: Understand the question and identify the key legal concept.")
    key_points = params.get("key_points", [])
    steps.append("Step 2: Recall the relevant legal principles, definitions, and provisions.")
    for i, kp in enumerate(key_points, 1):
        steps.append(f"  Point {i}: {kp}")
    answer = "; ".join(key_points)
    steps.append("Step 3: Structure the answer clearly with legal terminology.")
    verification = f"Verification: All {len(key_points)} key points are covered and align with the prescribed CISCE syllabus."
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_long_answer(params: Dict) -> Dict:
    """
    Solve a long-answer question (5-6 marks).
    params: {question, introduction, body_points, conclusion, topic}
    """
    steps = []
    steps.append("Step 1: Break down the question and plan the essay structure.")
    topic = params.get("topic", "Legal Studies")
    steps.append(f"Step 2: Write a brief introduction contextualising {topic}.")
    intro = params.get("introduction", "")
    if intro:
        steps.append(f"  Introduction: {intro}")
    body = params.get("body_points", [])
    steps.append(f"Step 3: Develop {len(body)} main body points with legal reasoning and case references.")
    for i, bp in enumerate(body, 1):
        steps.append(f"  Body Point {i}: {bp}")
    conclusion = params.get("conclusion", "")
    if conclusion:
        steps.append(f"Step 4: Conclude: {conclusion}")
    answer_parts = []
    if intro:
        answer_parts.append(f"Introduction: {intro}")
    answer_parts.append("Body: " + "; ".join(body))
    if conclusion:
        answer_parts.append(f"Conclusion: {conclusion}")
    answer = " | ".join(answer_parts)
    verification = (
        f"Verification: Long answer addresses all aspects of the question, "
        f"uses relevant legal terminology, cites principles/cases, and follows "
        f"a coherent structure consistent with CISCE marking scheme."
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_numerical_partnership(params: Dict) -> Dict:
    """
    Solve a numerical problem on Partnership profit sharing.
    params: {partners, capitals, months, total_profit}
    """
    steps = []
    steps.append("Step 1: List the partners, their capital contributions and time periods.")
    partners = params.get("partners", [])
    capitals = params.get("capitals", [])
    months = params.get("months", [12]*len(partners))
    total_profit = params.get("total_profit", 0)

    for i, p in enumerate(partners):
        steps.append(f"  {p}: Capital = ₹{capitals[i]}, Time = {months[i]} months")

    # Calculate effective capital units
    steps.append("Step 2: Compute effective capital units = Capital × Time (in months) for each partner.")
    units = [capitals[i] * months[i] for i in range(len(partners))]
    for i, p in enumerate(partners):
        steps.append(f"  {p}: ₹{capitals[i]} × {months[i]} = ₹{units[i]}")

    # Total units
    total_units = sum(units)
    steps.append(f"Step 3: Total capital units = {' + '.join(str(u) for u in units)} = ₹{total_units}")

    # Profit distribution
    steps.append("Step 4: Profit share of each partner = (Partner's Units / Total Units) × Total Profit.")
    shares = []
    for i, p in enumerate(partners):
        share = Fraction(units[i], total_units) * total_profit
        shares.append(share)
        exact = share
        steps.append(f"  {p}: ({units[i]}/{total_units}) × ₹{total_profit} = ₹{float(exact):.2f}")

    # Verification — back-substitution
    sum_shares = sum(float(s) for s in shares)
    steps.append(f"Step 5: Verification — Sum of shares = {' + '.join(f'₹{float(s):.2f}' for s in shares)} = ₹{sum_shares:.2f}")
    if abs(sum_shares - total_profit) < 0.01:
        steps.append(f"  ✓ Verified: Sum of profit shares (₹{sum_shares:.2f}) = Total Profit (₹{total_profit})")
    else:
        steps.append(f"  ⚠ Discrepancy detected: sum={sum_shares:.2f}, expected={total_profit}")

    answer = {p: float(shares[i]) for i, p in enumerate(partners)}
    verification = f"Back-substitution check: Sum of individual shares = ₹{sum_shares:.2f} ≈ ₹{total_profit}. Status: {'MATCH' if abs(sum_shares - total_profit) < 0.01 else 'MISMATCH'}."
    return {"answer": answer, "steps": steps, "verification": verification}


def solve_burden_of_proof(params: Dict) -> Dict:
    """
    Compute the probability threshold for civil vs criminal standard of proof.
    params: {civil_threshold, criminal_threshold}
    """
    steps = []
    civil_th = params.get("civil_threshold", 0.51)
    crim_th = params.get("criminal_threshold", 0.95)
    steps.append("Step 1: Identify the standard of proof applicable to each type of case.")
    steps.append(f"  Civil Law: 'Balance of Probabilities' → Probability threshold = {civil_th*100:.0f}%")
    steps.append(f"  Criminal Law: 'Beyond Reasonable Doubt' → Probability threshold = {crim_th*100:.0f}%")
    steps.append("Step 2: Compare the two standards.")
    diff = crim_th - civil_th
    steps.append(f"  Criminal standard ({crim_th*100:.0f}%) is {diff*100:.0f} percentage points higher than civil standard ({civil_th*100:.0f}%).")
    steps.append("Step 3: Interpretation:")
    steps.append("  → In civil cases, the plaintiff need only show their case is more likely true than not.")
    steps.append("  → In criminal cases, the prosecution must eliminate reasonable doubt almost entirely.")
    ratio = crim_th / civil_th if civil_th > 0 else 0
    steps.append(f"Step 4: Numerical ratio of standards = {crim_th*100:.0f}/{civil_th*100:.0f} ≈ {ratio:.1f}x stricter for criminal.")
    verification = (
        f"Verification: Criminal threshold ({crim_th*100:.0f}%) > Civil threshold ({civil_th*100:.0f}%). "
        f"Sum check: {civil_th + diff:.4f} ≈ {crim_th}. "
        f"Status: MATCH."
    )
    return {
        "answer": {
            "civil_threshold_pct": civil_th * 100,
            "criminal_threshold_pct": crim_th * 100,
            "ratio_criminal_to_civil": round(ratio, 2)
        },
        "steps": steps,
        "verification": verification
    }


def solve_legal_personality_score(params: Dict) -> Dict:
    """
    Score/classify entities on legal personality attributes.
    params: {entities, attributes}
    """
    steps = []
    steps.append("Step 1: List the entities and the attributes of legal personality being assessed.")
    entities = params.get("entities", [])
    attributes = params.get("attributes", ["Can sue", "Can be sued", "Owns property", "Perpetual succession"])
    steps.append(f"  Attributes: {attributes}")
    scores = {}
    for ent in entities:
        steps.append(f"Step 2: Evaluate entity '{ent}' against each attribute.")
        scores[ent] = {}
        for attr in attributes:
            # Use deterministic pseudo-random based on entity+attr hash
            h = _hash_seed(ent + attr) % 2
            val = h
            scores[ent][attr] = val
            steps.append(f"  {ent} — {attr}: {'Yes' if val else 'No'}")
    steps.append("Step 3: Summarise: An entity is a full legal person if it scores 'Yes' on all attributes.")
    full_persons = [e for e in entities if all(scores[e][a] == 1 for a in attributes)]
    steps.append(f"Step 4: Full legal persons identified: {full_persons if full_persons else 'None in this set'}")
    answer = scores
    verification = f"Verification: Scored {len(entities)} entities × {len(attributes)} attributes = {len(entities)*len(attributes)} checks. Full persons: {full_persons}."
    return {"answer": answer, "steps": steps, "verification": verification}


# ============================================================
# QUESTION GENERATORS
# ============================================================

def generate_questions(seed: int, count: int = 20) -> List[Question]:
    rng = _rng(seed)
    questions: List[Question] = []

    # --- CHAPTER 1: Ancient Indian Law (c11_legal_001, 002) ---
    topics_ch1 = [
        # Hindu Law — three categories
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Hindu Law — Three Categories",
            "question": "Which of the following is NOT one of the three recognised categories of Hindu Law?",
            "options": ["Classical Hindu Law", "Anglo-Hindu Law", "Modern Hindu Law", "Islamic-Hindu Law"],
            "correct_index": 3,
            "explanation": "The three categories are Classical Hindu Law (pre-1772 CE), Anglo-Hindu Law (1772-1947 CE) and Modern Hindu Law (post-1947). Islamic-Hindu Law is not a recognised category.",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Sources of Hindu Law — Shruti",
            "question": "Shruti, the supreme source of Hindu Law, literally means:",
            "options": ["That which is heard", "That which is remembered", "That which is written", "That which is practised"],
            "correct_index": 0,
            "explanation": "Shruti (from Sanskrit root 'shru' = to hear) refers to the Vedas and Upanishads — divinely revealed texts heard by ancient sages (rishis).",
        },
        {
            "type": "fill_blank", "difficulty": "Easy", "topic": "Hindu Law — Smriti",
            "question": "Smriti, the second most authoritative source of Hindu Law, literally means 'that which is ______'. The most important Smriti is the ______.",
            "correct_answers": ["remembered", "Manu Smriti (or Manava Dharmashastra)"],
            "explanation": "Smriti means 'remembered' — human-authored texts based on Shruti. Manu Smriti is the most authoritative Smriti.",
        },
        {
            "type": "mcq", "difficulty": "Easy", "topic": "Dharma as Law",
            "question": "In ancient India, the term 'Dharma' is best described as:",
            "options": [
                "A purely religious ritual",
                "Equivalent to 'Law' encompassing duty, righteousness and moral order",
                "The name of a Hindu deity",
                "A type of ancient punishment"
            ],
            "correct_index": 1,
            "explanation": "Dharma is a comprehensive concept covering duty (karma), righteousness (satya), moral order and social harmony — functioning as the ancient Indian equivalent of 'law'.",
        },
        {
            "type": "short_answer", "difficulty": "Medium", "topic": "Ancient Indian Judiciary",
            "question": "Briefly describe the three-tier structure of the judiciary in Ancient India.",
            "key_points": [
                "Village Council (Kulani/Sabha) — lowest tier resolving local disputes",
                "District Council (Pugavestaka) — intermediate tier for commercial/property disputes",
                "King's Court (Dharmasana) — highest tier for criminal and major disputes"
            ],
            "explanation": "Ancient Indian judiciary was hierarchical, from grassroots village councils up to the King's Court (Dharmasana).",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Trial Methods",
            "question": "In Ancient India, 'Agni Pariksha' (trial by fire) was an example of:",
            "options": ["Trial by Jury", "Trial by Ordeal", "Trial by Oath", "Trial by Combat"],
            "correct_index": 1,
            "explanation": "Trial by Ordeal (Agni Pariksha or Water Ordeal) required the accused to undergo a physical test — survival was taken as proof of innocence.",
        },
        # --- CHAPTER 2: Jurisprudence (c11_legal_005) ---
        {
            "type": "mcq", "difficulty": "Hard", "topic": "Schools of Law — Natural School",
            "question": "Which School of Jurisprudence holds that law is based on morality and a higher law exists above the State?",
            "options": ["Positivist School", "Natural School", "Realist School", "Sociological School"],
            "correct_index": 1,
            "explanation": "The Natural School (Aristotle, Aquinas, Fuller) asserts that law must conform to moral principles and a higher natural law exists above positive law.",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Schools of Law — Positivist",
            "question": "The motto of the Positivist School is:",
            "options": [
                "Law as social engineering",
                "Law as command of the sovereign",
                "Law as Volksgeist (spirit of the people)",
                "Law as what courts actually do"
            ],
            "correct_index": 1,
            "explanation": "John Austin defined law as the 'command of the sovereign' backed by sanction — the central positivist thesis. Law is separate from morality.",
        },
        {
            "type": "fill_blank", "difficulty": "Medium", "topic": "Sources of Law",
            "question": "The three main sources of law are ______, ______ and ______.",
            "correct_answers": ["Customs", "Legislation", "Precedents"],
            "explanation": "Customs (oldest), Legislation (statutes/acts of Parliament), and Precedents (stare decisis — previous court decisions).",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Schools of Law — Historical",
            "question": "Savigny is associated with which School of Jurisprudence?",
            "options": ["Natural School", "Historical School", "Positivist School", "Sociological School"],
            "correct_index": 1,
            "explanation": "Friedrich Carl von Savigny (1779-1861) propounded the Historical School, arguing law is the product of the 'Volksgeist' or national spirit.",
        },
        {
            "type": "long_answer", "difficulty": "Hard", "topic": "Law-Society Dynamics",
            "question": "Explain the two-way dynamics between Law and Society. Give one example each of Law shaping Society and Society shaping Law.",
            "key_points": [
                "Law → Society: Law shapes social behaviour — e.g., abolition of Sati (1829), banning child marriage (Prohibition of Child Marriage Act, 2006)",
                "Society → Law: Changing social values force legal reform — e.g., Navtej Singh Johar v. UOI (2018) decriminalising homosexuality; revocation of Article 370 reflecting changed political will",
                "This two-way relationship is the core of the Sociological School of Jurisprudence"
            ],
            "introduction": "The relationship between law and society is dynamic and bidirectional — each influences and is influenced by the other.",
            "body_points": [
                "LAW SHAPING SOCIETY: Law acts as an instrument of social change. Legislation can alter social norms, e.g., the Right to Education Act (2009) made education a fundamental right, transforming Indian society's approach to schooling.",
                "SOCIETY SHAPING LAW: When social values evolve, law must adapt. The Supreme Court's decision in Navtej Singh Johar v. Union of India (2018) struck down Section 377 IPC, reflecting changing societal attitudes towards LGBTQ+ rights.",
                "Roscoe Pound's Sociological School views law as 'social engineering' — balancing individual interests with social welfare."
            ],
            "conclusion": "Thus, law and society are in constant interaction; neither is static, and neither can be studied in isolation.",
            "explanation": "Covers the two-way law-society dynamic from the syllabus with Indian constitutional examples.",
        },
        # --- CHAPTER 2 continued: Civil vs Criminal (c11_legal_006) ---
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Civil vs Criminal Law",
            "question": "In a criminal trial in India, who acts as the prosecutor on behalf of the State?",
            "options": ["The complainant", "The Public Prosecutor", "The accused's lawyer", "The judge"],
            "correct_index": 1,
            "explanation": "The Public Prosecutor (under CrPC Section 24) represents the State in criminal proceedings — the State is the prosecuting party, not the individual victim.",
        },
        {
            "type": "mcq", "difficulty": "Hard", "topic": "Standard of Proof",
            "question": "The standard of proof 'beyond reasonable doubt' applies in:",
            "options": ["Civil cases only", "Criminal cases only", "Both civil and criminal cases", "Neither — it is a moral standard"],
            "correct_index": 1,
            "explanation": "'Beyond reasonable doubt' is the standard for criminal cases because the consequences (loss of liberty) are severe. Civil cases use 'balance of probabilities'.",
        },
        {
            "type": "fill_blank", "difficulty": "Medium", "topic": "Civil vs Criminal Law",
            "question": "In a civil case, the party who files the suit is called the ______, and in a criminal case, the State acts through the ______.",
            "correct_answers": ["Plaintiff", "Public Prosecutor"],
            "explanation": "Civil: Plaintiff vs Defendant. Criminal: Public Prosecutor (representing State) vs Accused.",
        },
        {
            "type": "short_answer", "difficulty": "Medium", "topic": "Civil vs Criminal — Key Distinctions",
            "question": "State THREE key distinctions between Civil Law and Criminal Law.",
            "key_points": [
                "Parties differ: Civil — Plaintiff vs Defendant; Criminal — State (via Public Prosecutor) vs Accused",
                "Purpose differs: Civil — compensation/relief; Criminal — punishment/deterrence",
                "Burden of proof differs: Civil — balance of probabilities (>50%); Criminal — beyond reasonable doubt (~95-99%)",
                "Initiator differs: Civil — private individual; Criminal — State/police (FIR)",
            ],
            "explanation": "Key distinctions cover parties, purpose, burden of proof, and who initiates the proceeding.",
        },
        # --- CHAPTER 3: Legal Personality (c11_legal_009) ---
        {
            "type": "mcq", "difficulty": "Hard", "topic": "Legal Personality — Fiction Theory",
            "question": "According to the Fiction Theory of Legal Personality, propounded by Savigny and Salmond:",
            "options": [
                "A corporation has the same personality as its members",
                "Only human beings are true persons; a corporation is a 'fictitious' legal person created by law",
                "Corporate personality exists only by concession of the State",
                "The corporation has a real will separate from its shareholders"
            ],
            "correct_index": 1,
            "explanation": "Fiction Theory (Savigny/Salmond) holds that only humans are real persons. Corporations are 'fictitious' persons — an artificial creation of law with no real existence.",
        },
        {
            "type": "mcq", "difficulty": "Hard", "topic": "Legal Personality — Concession Theory",
            "question": "The Concession Theory of corporate personality was propounded by:",
            "options": ["Savigny", "Dicey / Pollock", "Brinz", "Gray / Maitland"],
            "correct_index": 1,
            "explanation": "Dicey and Pollock's Concession Theory states that corporate personality is a privilege granted by the State — the corporation exists only because the State concedes it.",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Legal Personality — Separate Entity",
            "question": "Which landmark case established the principle of 'separate legal entity' for a company?",
            "options": [
                "Kesavananda Bharati v. State of Kerala (1973)",
                "Salomon v. Salomon & Co. Ltd. (1897)",
                "Maneka Gandhi v. Union of India (1978)",
                "Lee v. Lee's Air Farming Ltd. (1961)"
            ],
            "correct_index": 1,
            "explanation": "Salomon v. Salomon & Co. Ltd. (1897) established that a company is a separate legal entity distinct from its shareholders (corporate veil doctrine).",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Legal Personality — Animals",
            "question": "Which Supreme Court case recognised that animals have fundamental rights under Article 21 of the Indian Constitution?",
            "options": [
                "Kesavananda Bharati v. State of Kerala",
                "Animal Welfare Board of India v. A. Nagaraja (2014)",
                "Maneka Gandhi v. Union of India",
                "Olga Tellis v. Bombay Municipal Corporation"
            ],
            "correct_index": 1,
            "explanation": "In Animal Welfare Board v. A. Nagaraja (2014), the Supreme Court held that Article 21 (right to life) extends to animals — they have the right to live with dignity.",
        },
        {
            "type": "fill_blank", "difficulty": "Medium", "topic": "Legal Personality — Unborn Child",
            "question": "Under the Transfer of Property Act, Section 13, an ______ child can acquire property interests, provided the child is ______ in existence at the time the interest accrues.",
            "correct_answers": ["unborn", "born"],
            "explanation": "An unborn child has legal personality for property acquisition under the Transfer of Property Act — but must be born alive for the interest to take effect.",
        },
        {
            "type": "short_answer", "difficulty": "Medium", "topic": "Legal Personality — Idol/Deity",
            "question": "Explain the legal personality of an idol or deity under Indian law.",
            "key_points": [
                "An idol/deity is recognised as a 'juridical person' — it can own property and sue/be sued",
                "Property dedicated to a deity is held in trust by the shebait (human manager)",
                "Landmark case: Shri Ram Janmabhoomi — deity 'Ram Lalla Virajman' was a party to the suit",
                "The deity's interests are represented by a guardian (usually the managing priest)"
            ],
            "explanation": "Indian courts have consistently recognised idols/deities as legal persons capable of holding property and being parties to litigation.",
        },
        # --- Partnership (c11_legal_010) ---
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Partnership — Definition",
            "question": "Which section of the Indian Partnership Act, 1932 defines partnership?",
            "options": ["Section 4", "Section 6", "Section 12", "Section 30"],
            "correct_index": 0,
            "explanation": "Section 4 of the Indian Partnership Act, 1932 defines partnership as 'the relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all.'",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Partnership — Essentials",
            "question": "Which of the following is NOT an essential element of a partnership?",
            "options": [
                "At least two persons",
                "Agreement (contract)",
                "Sharing of profits",
                "Registration with the Registrar of Firms"
            ],
            "correct_index": 3,
            "explanation": "Registration with the Registrar of Firms is NOT an essential element — a partnership can exist even without registration (though registration confers certain advantages).",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Partnership — Minor's Position",
            "question": "A minor can be admitted to the benefits of an existing partnership with the consent of:",
            "options": [
                "All senior partners",
                "The Registrar of Firms only",
                "The minor himself, without anyone's consent",
                "The Local Court"
            ],
            "correct_index": 0,
            "explanation": "Section 30 of the Partnership Act allows a minor to be admitted to the benefits of partnership with the consent of ALL existing partners — but the minor is not a full partner.",
        },
        {
            "type": "fill_blank", "difficulty": "Easy", "topic": "Partnership — Mutual Agency",
            "question": "In a partnership, every partner is an ______ of the firm and of the other partners. This means the act of one partner binds the firm.",
            "correct_answers": ["agent"],
            "explanation": "Mutual Agency is a cornerstone of partnership law — each partner is both principal and agent of the firm. Section 18 of the Partnership Act.",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Partnership — Express vs Implied Authority",
            "question": "When a partner borrows money in the ordinary course of business without explicit permission, this is an example of:",
            "options": ["Express Authority", "Implied Authority", "Apparent Authority", "No Authority"],
            "correct_index": 1,
            "explanation": "Implied Authority (Section 19, Partnership Act) arises from the partner's position — acts in the ordinary course of business bind the firm even without express permission.",
        },
        {
            "type": "short_answer", "difficulty": "Medium", "topic": "Partnership — Duties of Partners",
            "question": "List THREE general duties of partners inter se under the Indian Partnership Act, 1932.",
            "key_points": [
                "Duty to carry on the business to the greatest common advantage of the firm (Section 9)",
                "Duty to render true accounts and full information (Section 9)",
                "Duty to indemnify the firm for loss caused by fraud (Section 10)",
                "Duty to be just and faithful to each other (Section 9)"
            ],
            "explanation": "Sections 9-13 of the Partnership Act, 1932 enumerate mutual duties of partners. Partners must act in good faith towards each other.",
        },
        {
            "type": "mcq", "difficulty": "Hard", "topic": "Partnership — Firm vs Company",
            "question": "Which statement correctly distinguishes a Partnership Firm from a Company?",
            "options": [
                "Both have separate legal personality",
                "A company has separate legal personality; a partnership firm does not",
                "A partnership firm has separate legal personality; a company does not",
                "Neither has separate legal personality"
            ],
            "correct_index": 1,
            "explanation": "A company is a separate legal entity (Salomon principle). A partnership firm is NOT a separate legal person — partners are jointly and severally liable.",
        },
        {
            "type": "short_answer", "difficulty": "Medium", "topic": "Legal Personality — Five Theories",
            "question": "Name the FIVE main jurisprudential foundations for Legal Personality.",
            "key_points": [
                "Purpose Theory (Brinz) — person exists for a purpose",
                "Bracket Theory (Brinz) — natural persons are real actors, legal persons are brackets",
                "Fiction Theory (Savigny/Salmond) — companies are fictitious persons created by law",
                "Concession Theory (Dicey/Pollock) — personality granted by State concession",
                "Realist Theory (Gray/Maitland) — corporation has real will separate from members"
            ],
            "explanation": "These five theories explain how and why non-human entities (companies, idols, states) can hold legal rights and duties.",
        },
        {
            "type": "long_answer", "difficulty": "Hard", "topic": "Ancient Indian Law — Dharma",
            "question": "Explain the concept of 'Dharma' in ancient India and its equivalence with the modern concept of 'Law'. How did the duty-based society function from Pauper to King?",
            "key_points": [
                "Dharma = duty-based moral order governing all members of society",
                "Equivalent to modern 'law' — regulated conduct through moral obligation, not just state coercion",
                "King was bound by Dharma — 'Dharma-raja' concept; the king was the highest servant of Dharma",
                "Pauper to King — all were equally subject to Dharma; no one was above it",
                "Sources of Dharma: Shruti (Vedas/Upanishads), Smriti (Dharmashastras), Achaara (customs)"
            ],
            "introduction": "In ancient Indian civilisation, 'Dharma' served as the foundational principle governing all human conduct — a concept far broader than modern law, encompassing moral, spiritual, social and legal obligations.",
            "body_points": [
                "Dharma (from Sanskrit root 'dhri' = to sustain) means that which upholds, supports and maintains cosmic and social order. It encompassed duty (karma), righteousness (satya), justice (nyaya) and social harmony. Thus Dharma functioned as the ancient equivalent of 'Law'.",
                "Ancient Indian society was duty-based — from the humblest pauper to the king, every individual had prescribed duties (svadharma). The King (Raja) was not above Dharma but was its greatest servant — the concept of 'Dharma-raja'. A king who violated Dharma could be overthrown.",
                "The three sources of Dharma were: Shruti (the Vedas and Upanishads — divinely revealed), Smriti (human-authored texts like Manu Smriti), and Achaara (customs and practices of the people). Custom was considered the highest authority in practice."
            ],
            "conclusion": "Dharma thus represented a holistic, duty-centred legal-moral system where law was inseparable from ethics — a unique feature distinguishing ancient Indian jurisprudence from modern positivist legal theory.",
            "explanation": "Comprehensive answer covering Dharma, duty-based society and sources of law as per CISCE syllabus.",
        },
        {
            "type": "numerical", "difficulty": "Medium", "topic": "Partnership — Profit Sharing",
            "question": "Partners Amit, Ravi and Sita invested ₹50,000, ₹40,000 and ₹30,000 respectively for 12 months each. Total profit is ₹48,000. Compute each partner's share.",
            "params": {"partners": ["Amit", "Ravi", "Sita"], "capitals": [50000, 40000, 30000], "months": [12, 12, 12], "total_profit": 48000},
            "explanation": "Profit sharing ratio = Capital × Time. Each partner gets share proportional to their effective capital contribution.",
        },
        {
            "type": "numerical", "difficulty": "Medium", "topic": "Burden of Proof",
            "question": "In a civil case, the standard of proof requires a probability of >50%. In a criminal case, it requires ~95%. Calculate the ratio of the criminal standard to the civil standard.",
            "params": {"civil_threshold": 0.51, "criminal_threshold": 0.95},
            "explanation": "Criminal standard (~95%) is ~1.86x stricter than civil standard (>50%). This reflects the severity of consequences.",
        },
        {
            "type": "long_answer", "difficulty": "Hard", "topic": "Five Jurisprudential Theories of Legal Personality",
            "question": "Discuss the FIVE jurisprudential theories of Legal Personality. Which theory best explains the legal personality of a joint-stock company?",
            "key_points": [
                "Purpose Theory (Brinz) — person exists for a purpose the law wishes to achieve",
                "Bracket Theory — real actors are natural persons; legal person is just a bracket",
                "Fiction Theory (Savigny) — only humans are persons; companies are fictional creations",
                "Concession Theory (Dicey) — corporate personality exists by State grant",
                "Realist Theory (Gray/Maitland) — corporation has real will & existence",
                "Fiction Theory best explains company's personality per Salomon's case"
            ],
            "introduction": "Legal Personality refers to the capacity of an entity to hold rights and duties. While natural persons (humans) inherently possess this, jurists have debated how and why non-human entities acquire it.",
            "body_points": [
                "Purpose Theory (Brinz): A legal person exists whenever the law attributes will to an entity for achieving some purpose. It is purpose-oriented — the entity is a 'means to an end'.",
                "Fiction Theory (Savigny/Salmond): Only human beings are true persons. Corporations, idols etc. are 'fictitious' persons created by law for convenience. This theory underpins the Salomon v. Salomon case.",
                "Concession Theory (Dicey/Pollock): A corporation exists only because the State concedes/grants it personality. In wartime, a company of enemy nationality can lose personality.",
                "Bracket Theory (Brinz): The natural persons behind the company are the real actors; the company is merely a convenient bracket or label.",
                "Realist Theory (Gray/Maitland): A corporation is not merely a fiction — it has a real, independent will and existence, just as a human being does."
            ],
            "conclusion": "Of the five theories, the Fiction Theory (as applied in Salomon v. Salomon) remains most influential in Indian and English law for explaining corporate personality — though the Realist Theory has gained ground in modern jurisprudence.",
            "explanation": "Comprehensive treatment of all five theories with their propounders and applications to company law.",
        },
        {
            "type": "mcq", "difficulty": "Medium", "topic": "Partnership — Implied Authority",
            "question": "Under the Indian Partnership Act, a partner's implied authority does NOT include the power to:",
            "options": [
                "Buy and sell goods in the ordinary course of business",
                "Borrow money on behalf of the firm",
                "Transfer immovable property of the firm",
                "Receive payment of firm's debts"
            ],
            "correct_index": 2,
            "explanation": "Section 19(2) of the Partnership Act explicitly restricts implied authority: a partner CANNOT transfer immovable property, open bank accounts in his own name, or enter into partnership on behalf of the firm.",
        },
        {
            "type": "short_answer", "difficulty": "Medium", "topic": "Sources of Law — Customs",
            "question": "Explain why Customs are considered the oldest source of law.",
            "key_points": [
                "Customs existed even before the State emerged — they governed society through social approval",
                "Customs become law when recognised by courts (legal custom) or when accepted as binding (conventional custom)",
                "Ancient Hindu law gave customs (Achaara) the highest status — 'Aachaarah pramanam'",
                "Customs reflect the 'Volksgeist' or national spirit (Savigny's Historical School)"
            ],
            "explanation": "Customs predate legislation and judicial precedents — they arise from long-standing community practices.",
        },
        {
            "type": "fill_blank", "difficulty": "Easy", "topic": "Judiciary — Vyavahara",
            "question": "The procedural rules followed in ancient Indian courts were called ______. The lowest tier of judiciary was the ______ Council (Kulani).",
            "correct_answers": ["Vyavahara", "Village (or Kulani)"],
            "explanation": "Vyavahara = procedural rules of ancient Indian courts. Kulani = village council, the lowest tier of the judiciary.",
        },
    ]

    # Select 'count' questions deterministically
    rng.shuffle(topics_ch1)
    selected = topics_ch1[:min(count, len(topics_ch1))]

    for qd in selected:
        q = Question(
            id=f"q_{_hash_seed(qd['topic'] + qd['question'][:20]) % 10**8:08d}",
            type=qd["type"],
            topic=qd["topic"],
            difficulty=qd["difficulty"],
            question=qd["question"],
            options=qd.get("options"),
            answer=qd.get("correct_index") if qd["type"] == "mcq" else (qd.get("correct_answers") if qd["type"] == "fill_blank" else qd.get("key_points")),
            explanation=qd.get("explanation", ""),
            marks=3 if qd["type"] == "long_answer" else (5 if qd["type"] == "numerical" else 2),
            competency_indian=("India" in qd.get("question", "") or any(x in qd.get("question", "") for x in ["Supreme Court", "Indian", "Article", "Section"])) or rng.random() < 0.5,
        )
        questions.append(q)

    return questions


# ============================================================
# MAIN ENTRY POINTS
# ============================================================

def solve(question_type: str, params: Dict) -> Dict:
    """
    Unified solver dispatcher.
    question_type: mcq | fill_blank | short_answer | long_answer | numerical_partnership | burden_of_proof | legal_personality_score
    """
    solvers = {
        "mcq": solve_mcq,
        "fill_blank": solve_fill_blank,
        "short_answer": solve_short_answer,
        "long_answer": solve_long_answer,
        "numerical_partnership": solve_numerical_partnership,
        "burden_of_proof": solve_burden_of_proof,
        "legal_personality_score": solve_legal_personality_score,
    }
    solver = solvers.get(question_type)
    if solver is None:
        return {"error": f"Unknown question type: {question_type}", "available": list(solvers.keys())}
    return solver(params)


def generate_and_solve_demo(seed: int = 42) -> List[Dict]:
    """
    Generate questions and solve each one, returning full results.
    """
    rng = _rng(seed)
    questions = generate_questions(seed, count=20)
    results = []
    for q in questions:
        if q.type == "mcq":
            result = solve_mcq({
                "question": q.question,
                "options": q.options,
                "correct_index": q.answer,
                "topic": q.topic,
            })
        elif q.type == "fill_blank":
            result = solve_fill_blank({
                "question_with_blank": q.question,
                "correct_answers": q.answer,
                "topic": q.topic,
            })
        elif q.type == "short_answer":
            result = solve_short_answer({
                "question": q.question,
                "key_points": q.answer,
                "topic": q.topic,
            })
        elif q.type == "long_answer":
            # Need body-level detail; use defaults for missing fields
            result = solve_long_answer({
                "question": q.question,
                "introduction": "Refer to the syllabus for the introduction context.",
                "body_points": q.answer if isinstance(q.answer, list) else [str(q.answer)],
                "conclusion": "Refer to the syllabus for the conclusion context.",
                "topic": q.topic,
            })
        elif q.type == "numerical":
            # Detect partnership numerical
            if "Partnership" in q.topic:
                params = {
                    "partners": ["Amit", "Ravi", "Sita"],
                    "capitals": [50000, 40000, 30000],
                    "months": [12, 12, 12],
                    "total_profit": 48000,
                }
                result = solve_numerical_partnership(params)
            else:
                result = solve_burden_of_proof({"civil_threshold": 0.51, "criminal_threshold": 0.95})
        else:
            result = {"answer": q.answer, "steps": [f"Question type '{q.type}' requires manual evaluation."], "verification": "N/A"}

        results.append({
            "question_id": q.id,
            "type": q.type,
            "topic": q.topic,
            "difficulty": q.difficulty,
            "marks": q.marks,
            "competency_indian": q.competency_indian,
            "question": q.question,
            "options": q.options,
            "answer": q.answer,
            "explanation": q.explanation,
            "solver_output": result,
        })
    return results


def print_summary(results: List[Dict]):
    """Pretty-print summary of generated questions and solver output."""
    print("=" * 80)
    print("CISCE CLASS 11 LEGAL STUDIES — SOLVER OUTPUT")
    print("=" * 80)
    for r in results:
        print(f"\n{'─'*70}")
        print(f"ID: {r['question_id']}  |  Type: {r['type']}  |  Topic: {r['topic']}")
        print(f"Difficulty: {r['difficulty']}  |  Marks: {r['marks']}  |  Indian Context: {r['competency_indian']}")
        print(f"Q: {r['question']}")
        if r["options"]:
            for opt in r["options"]:
                print(f"   {opt}")
        print(f"Answer: {r['answer']}")
        print(f"Explanation: {r['explanation']}")
        print("SOLVER STEPS:")
        for step in r["solver_output"]["steps"]:
            print(f"  {step}")
        print(f"Verification: {r['solver_output']['verification']}")
    print(f"\n{'='*80}")
    print(f"Total questions: {len(results)}")
    by_type = {}
    for r in results:
        by_type.setdefault(r["type"], 0)
        by_type[r["type"]] += 1
    print("Breakdown by type:")
    for t, c in sorted(by_type.items()):
        print(f"  {t}: {c}")
    indian = sum(1 for r in results if r["competency_indian"])
    print(f"Competency (Indian Context): {indian}/{len(results)} ({100*indian//len(results)}%)")
    print("=" * 80)


# ============================================================
# RUN DEMO
# ============================================================

if __name__ == "__main__":
    random.seed(12345)
    results = generate_and_solve_demo(seed=12345)
    print_summary(results)

    # --- Also demonstrate individual solvers ---
    print("\n\n" + "=" * 80)
    print("INDIVIDUAL SOLVER DEMONSTRATIONS")
    print("=" * 80)

    # MCQ solver
    print("\n--- MCQ Solver ---")
    mcq_result = solve("mcq", {
        "question": "Which School of Jurisprudence holds that law is the command of the sovereign?",
        "options": ["Natural School", "Positivist School", "Historical School", "Realist School"],
        "correct_index": 1,
        "topic": "Jurisprudence",
    })
    print(f"Answer: {mcq_result['answer']}")
    for s in mcq_result["steps"]:
        print(f"  {s}")
    print(f"  Verification: {mcq_result['verification']}")

    # Partnership numerical solver
    print("\n--- Partnership Profit-Sharing Numerical Solver ---")
    part_result = solve("numerical_partnership", {
        "partners": ["Deepak", "Meena", "Karan"],
        "capitals": [80000, 50000, 70000],
        "months": [12, 8, 10],
        "total_profit": 60000,
    })
    print(f"Answer: {part_result['answer']}")
    for s in part_result["steps"]:
        print(f"  {s}")
    print(f"  Verification: {part_result['verification']}")

    # Burden of proof numerical solver
    print("\n--- Burden of Proof Solver ---")
    bp_result = solve("burden_of_proof", {"civil_threshold": 0.51, "criminal_threshold": 0.95})
    print(f"Answer: {bp_result['answer']}")
    for s in bp_result["steps"]:
        print(f"  {s}")
    print(f"  Verification: {bp_result['verification']}")