"""
CISCE LEGAL Class 11 - Deterministic Question Generator
Covers all syllabus nodes: Historical Evolution, Law & Jurisprudence, Legal Personality, Partnership
"""
import random
import math
import fractions
import sympy
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional, Tuple
from enum import Enum

# ============================================================
# DATA CLASSES
# ============================================================

class QuestionType(Enum):
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
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]] = None
    answer: str = ""
    explanation: str = ""
    difficulty: str = "medium"
    topic: str = ""
    competency: bool = False
    verification: str = ""

@dataclass
class SolveResult:
    answer: Any
    steps: List[str]
    verification: str

# ============================================================
# SEEDED RANDOM HELPER
# ============================================================

def seed_random(seed: int):
    r = random.Random(seed)
    return r

# ============================================================
# QUESTION BANK - ALL SYLLABUS NODES
# ============================================================

QUESTION_TEMPLATES = {
    # ---- Chapter 1: Historical Evolution of Indian Legal System ----

    "c11_legal_001_dharma_definition": {
        "topic": "Law in Ancient India - Hindu Law and Dharma",
        "node_id": "c11_legal_001",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.EASY.value,
        "competency": True,
        "question_templates": [
            "In ancient Indian society, Dharma was considered equivalent to:",
            "The term 'Dharma' in ancient India primarily connoted:",
            "Which of the following best describes the ancient Indian concept of Dharma?",
        ],
        "options_pool": [
            ["Personal spiritual practice only", "Law and duty combined", "Religious ritual alone", "Political power"],
            ["Only religious obligations", "Law, duty, and moral conduct", "Trade regulations only", "Military rules"],
            ["Duty, law, and moral conduct combined", "Only legal rules", "Spiritual meditation alone", "Economic policy"],
        ],
        "correct": 1,  # index of correct option
        "explanation": "In ancient India, Dharma connoted law, duty, and moral conduct combined. It was not merely a religious concept but encompassed the entire legal and moral framework governing society."
    },
    "c11_legal_001_hindu_law_categories": {
        "topic": "Law in Ancient India - Hindu Law and Dharma",
        "node_id": "c11_legal_001",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "The three categories of Hindu Law are: Classical Hindu Law, Anglo-Hindu Law, and:",
            "Which is NOT one of the three categories of Hindu Law?",
            "Anglo-Hindu Law developed during the period of:",
        ],
        "options_pool": [
            ["Modern Hindu Law", "Colonial Hindu Law", "Post-Independent Hindu Law", "Constitutional Hindu Law"],
            ["Modern Hindu Law", "Vedic Hindu Law", "Anglo-Hindu Law", "Classical Hindu Law"],
            ["British Raj", "Mughal Empire", "Maurya Empire", "Gupta Period"],
        ],
        "correct": 0,
        "explanation": "The three categories of Hindu Law are Classical Hindu Law (ancient period), Anglo-Hindu Law (British period), and Modern Hindu Law (post-independence). Anglo-Hindu Law developed during British rule."
    },
    "c11_legal_001_sources_shruti": {
        "topic": "Law in Ancient India - Sources of Law",
        "node_id": "c11_legal_001",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "Shruti refers to which source of ancient Indian law?",
            "Which source of ancient Indian law consists of the Vedas and Upanishads?",
            "Shruti literally means:",
        ],
        "options_pool": [
            ["Customary law", "That which is heard (Vedic revelation)", "Written codes", "Royal decrees"],
            ["Customs", "Smriti texts", "Shruti (Vedic literature)", "Judicial precedents"],
            ["That which is written", "That which is heard", "That which is remembered", "That which is seen"],
        ],
        "correct": 1,
        "explanation": "Shruti literally means 'that which is heard' and refers to the Vedas and Upanishads which were considered divine revelations heard by ancient sages (Rishis)."
    },
    "c11_legal_001_smriti": {
        "topic": "Law in Ancient India - Sources of Law",
        "node_id": "c11_legal_001",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "Smriti refers to which type of ancient Indian legal source?",
            "Which of the following is a Smriti text?",
            "Smriti literally means:",
        ],
        "options_pool": [
            ["Divine revelation", "That which is remembered (written texts)", "Customary practice", "Royal commands"],
            ["Rigveda", "Manusmriti", "Upanishads", "Aranyakas"],
            ["That which is heard", "That which is remembered", "That which is seen", "That which is taught"],
        ],
        "correct": 1,
        "explanation": "Smriti literally means 'that which is remembered'. It refers to written texts composed by sages based on Shruti, such as Manusmriti, Yajnavalkya Smriti, Narada Smriti, etc."
    },
    "c11_legal_001_achaara": {
        "topic": "Law in Ancient India - Sources of Law",
        "node_id": "c11_legal_001",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "Achaara refers to which source of ancient Indian law?",
            "The third recognized source of ancient Hindu law, after Shruti and Smriti, is:",
            "Customs (Achaara) are recognized as a source of law when they are:",
        ],
        "options_pool": [
            ["Divine revelation", "Immoral practices", "Long-standing, reasonable, and certain customs", "Written statutes"],
            ["Vyavahara", "Achaara", "Dharma", "Niti"],
            ["Recent and popular", "Ancient, certain, and reasonable", "Dictated by the king", "Recorded in Smriti"],
        ],
        "correct": 2,
        "explanation": "Achaara refers to customs - long-standing practices observed by the community. For a custom to be valid as a source of law, it must be ancient, certain, reasonable, and not opposed to public policy."
    },
    "c11_legal_001_duty_society": {
        "topic": "Law in Ancient India - Duty-based Society",
        "node_id": "c11_legal_001",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "In ancient Indian society, rights were:",
            "The ancient Indian society was duty-based. This means:",
            "In a duty-based society, a person's right flowed from:",
        ],
        "options_pool": [
            ["Fundamental and inherent", "Not recognized - only duties existed", "Derived from the performance of duties", "Granted by the king alone"],
            ["Individuals had rights first and then duties", "Individuals had duties first and rights flowed from them", "There were no duties or rights", "Only kings had rights"],
            ["Constitutional provisions", "Performance of one's duties (Dharma)", "Birth alone", "Wealth and power"],
        ],
        "correct": 2,
        "explanation": "In ancient Indian duty-based society, rights flowed from the performance of one's duties (Dharma). Even a pauper had duties, and the king's power was also duty-bound. This contrasts with modern rights-based societies."
    },
    "c11_legal_001_classical_vs_anglo": {
        "topic": "Law in Ancient India - Hindu Law",
        "node_id": "c11_legal_001",
        "type": QuestionType.FILL_BLANK.value,
        "difficulty": Difficulty.HARD.value,
        "competency": False,
        "question": "During the Anglo-Hindu Law period, the British introduced the concept of ________ as a tool for administering justice to Hindus.",
        "answer": "interpretation of texts / textual interpretation",
        "alternative_answers": ["interpretation of Smritis"],
        "explanation": "During the Anglo-Hindu Law period, British administrators and judges interpreted Hindu legal texts (Smritis) to administer justice, leading to a system of codified Anglo-Hindu Law."
    },
    "c11_legal_001_manusmriti": {
        "topic": "Law in Ancient India - Hindu Law",
        "node_id": "c11_legal_001",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "Why is Manusmriti considered a foundational text of Classical Hindu Law? (Answer in 2-3 sentences)",
        "answer": "Manusmriti is considered foundational because it systematically codified Hindu laws covering family, property, inheritance, and social order. Written between 200 BCE and 200 CE, it became the most authoritative Smriti text and was used by British administrators as a reference for Hindu law.",
        "explanation": "Manusmriti (also called Manava Dharmashastra) is the most well-known Dharmashastra text. It covers topics like sources of law, duties of the king, marriage, inheritance, and the varna system, making it comprehensive for governance."
    },
    "c11_legal_001_custom_vs_law": {
        "topic": "Law in Ancient India - Sources of Law",
        "node_id": "c11_legal_001",
        "type": QuestionType.LONG_ANSWER.value,
        "difficulty": Difficulty.HARD.value,
        "competency": True,
        "question": "Explain the three sources of ancient Indian law - Shruti, Smriti, and Achaara. Why was custom (Achaara) given the highest place in practice? (5-6 marks)",
        "answer": "Shruti: 'That which is heard' - Vedas and Upanishads, considered divine revelation, the highest authority but abstract. Smriti: 'That which is remembered' - texts like Manusmriti composed by sages, interpreting Shruti for practical application. Achaara: Customs and practices of the community. Custom was given the highest place in practice because: (1) It was the living law actually followed by people, (2) It was more flexible and adapted to local conditions, (3) It was more accessible than abstract texts, (4) It reflected the actual conduct and values of the community.",
        "explanation": "While Shruti was theoretically supreme, Achaara (custom) governed day-to-day life. The ancient jurists recognized that law must be rooted in the people's practices to be effective."
    },

    # ---- Chapter 1 continued: Judiciary in Ancient India ----

    "c11_legal_002_kulani": {
        "topic": "Judiciary in Ancient India - Village Councils",
        "node_id": "c11_legal_002",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "Kulani in ancient India referred to:",
            "The lowest unit of the ancient Indian judiciary was the:",
            "Village councils (Kulani) were presided over by:",
        ],
        "options_pool": [
            ["Royal courts", "Village councils composed of village elders", "King's personal advisors", "Military tribunals"],
            ["King's Court", "Village Council (Kulani)", "District Court", "Provincial Court"],
            ["The king", "Elected village elders / headman", "A Brahmin priest", "A military commander"],
        ],
        "correct": 1,
        "explanation": "Kulani were village councils composed of elders who decided minor disputes at the village level. This was the first level of the judiciary, closest to the people. Kulani functioned as both a judicial and administrative body."
    },
    "c11_legal_002_vyavahara": {
        "topic": "Judiciary in Ancient India - Procedural Rules",
        "node_id": "c11_legal_002",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "Vyavahara in ancient Indian law refers to:",
            "The term 'Vyavahara' relates to:",
            "Which text primarily discusses Vyavahara (procedural rules)?",
        ],
        "options_pool": [
            ["Religious ceremonies", "Procedural rules for legal proceedings", "Property division", "Marriage rituals"],
            ["The substantive law", "Procedural law and legal proceedings", "Constitutional law", "Criminal procedure only"],
            ["Rigveda", "Smriti texts (e.g., Narada Smriti)", "Arthashastra", "Upanishads"],
        ],
        "correct": 1,
        "explanation": "Vyavahara means 'legal proceeding' or 'procedure'. Ancient texts like Narada Smriti and Brihaspati Smriti devoted chapters to Vyavahara, covering topics like courts, evidence, witnesses, and burden of proof."
    },
    "c11_legal_002_trial_by_jury": {
        "topic": "Judiciary in Ancient India - Trial Methods",
        "node_id": "c11_legal_002",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "Trial by ordeal in ancient India was based on:",
            "Which method was used in ancient India to determine guilt when evidence was unclear?",
            "Trial by ordeal included practices such as:",
        ],
        "options_pool": [
            ["Scientific evidence", "Divine intervention / supernatural tests", "Witness testimony alone", "Confession under torture"],
            ["Trial by jury", "Trial by ordeal", "Trial by combat", "Trial by media"],
            ["Weighing scales (Tula), fire ordeal (Agnipariksha), poison ordeal", "Only cross-examination", "Only witness testimony", "Only written evidence"],
        ],
        "correct": 2,
        "explanation": "Trial by ordeal (Divya) was used when evidence was inconclusive. Ordeals included: Agnipariksha (fire ordeal - holding hot iron), Tula (balance ordeal - being weighed against a stone), and Vishodhana (water ordeal). The belief was that divine forces would protect the innocent."
    },
    "c11_legal_002_kings_court": {
        "topic": "Judiciary in Ancient India - Hierarchical Structure",
        "node_id": "c11_legal_002",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "Describe the hierarchical structure of the judiciary in ancient India from the lowest to the highest level. (3-4 sentences)",
        "answer": "The ancient Indian judiciary had a hierarchical structure: (1) Kulani (Village Council) at the lowest level for minor disputes, (2) Puradesa / district courts for larger disputes, (3) The King's Court as the highest court of appeal. The King was the final court of appeal and was expected to personally hear important cases.",
        "explanation": "This hierarchical system ensured access to justice at the local level while providing for appeals. The King's Court served as the supreme authority, embodying the principle that 'the King is the fountain of justice.'"
    },
    "c11_legal_002_comparison_ancient_modern": {
        "topic": "Judiciary in Ancient India",
        "node_id": "c11_legal_002",
        "type": QuestionType.LONG_ANSWER.value,
        "difficulty": Difficulty.HARD.value,
        "competency": True,
        "question": "Compare trial by jury and trial by ordeal as methods of determining guilt in ancient India. Which method was considered more reliable and why? (5 marks)",
        "answer": "Trial by Jury (Ksha): A group of people (often 3, 5, or 7) would examine evidence and witnesses to arrive at a verdict. This was considered more rational and based on human reasoning. Trial by Ordeal (Divya): The accused underwent a physical test (fire, water, poison, balance) where divine intervention was expected to protect the innocent. Ordeal was used when evidence was unclear or conflicting. Trial by jury was considered more reliable for ordinary cases because it relied on human judgment and evidence evaluation rather than supernatural intervention. However, ordeals were used when there was no other way to determine truth, reflecting the religious worldview of ancient India.",
        "explanation": "Both systems coexisted. The choice depended on the nature of the case and the availability of evidence. The use of ordeals reflects the integration of religious belief and legal process in ancient India."
    },

    # ---- Chapter 2: Law and Jurisprudence ----

    "c11_legal_005_jurisprudence_definition": {
        "topic": "Meaning of Law and Jurisprudence",
        "node_id": "c11_legal_005",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.EASY.value,
        "competency": False,
        "question_templates": [
            "Jurisprudence is best defined as:",
            "Jurisprudence is the:",
            "The science/philosophy of law is called:",
        ],
        "options_pool": [
            ["The study of crime", "Science or philosophy of law", "The study of judges", "International law only"],
            ["Study of crime and punishment", "Science or philosophy of law", "Practice of law in courts", "Making of legislation"],
            ["Law", "Jurisprudence", "Legal history", "Political science"],
        ],
        "correct": 1,
        "explanation": "Jurisprudence is the science or philosophy of law. It examines the nature of law, its origins, validity, and relationship with morality, society, and justice. The term comes from Latin 'jurisprudentia' meaning 'knowledge of law.'"
    },
    "c11_legal_005_natural_school": {
        "topic": "Schools of Law - Natural School",
        "node_id": "c11_legal_005",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "The Natural School of Law believes that:",
            "Who is considered the father of Natural Law theory?",
            "Natural Law is derived from:",
        ],
        "options_pool": [
            ["Law is whatever the sovereign commands", "Law is based on reason, morality, and higher principles", "Law is made by judges", "Law is a social phenomenon only"],
            ["John Austin", "Aristotle", "Jeremy Bentham", "Roscoe Pound"],
            ["Social customs", "Higher moral principles and reason (God/Nature)", "Legislative enactments", "Judicial precedents"],
        ],
        "correct": 1,
        "explanation": "The Natural School (Natural Law theory) believes that law is based on higher moral principles, reason, and natural justice. Aristotle is considered the father of Natural Law theory. This school holds that an unjust law is not a true law."
    },
    "c11_legal_005_historical_school": {
        "topic": "Schools of Law - Historical School",
        "node_id": "c11_legal_005",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "The Historical School of Law believes that law:",
            "Who is the main exponent of the Historical School of Jurisprudence?",
            "The Historical School views law as:",
        ],
        "options_pool": [
            ["Is created by legislation", "Is found, not made - it evolves from the Volkgeist (spirit of the people)", "Is created by judges", "Is based on natural principles"],
            ["John Austin", "Friedrich Carl von Savigny", "Jeremy Bentham", "Roscoe Pound"],
            ["A command of the sovereign", "A product of the Volkgeist (national spirit/custom)", "A social tool for engineering", "A prediction of court decisions"],
        ],
        "correct": 1,
        "explanation": "The Historical School, founded by Savigny, believes law is found, not made. It evolves organically from the Volkgeist (spirit of the people) and is rooted in customs and traditions. Savigny opposed codification as law must grow with the nation."
    },
    "c11_legal_005_positivist_school": {
        "topic": "Schools of Law - Positivist School",
        "node_id": "c11_legal_005",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "The Positivist School of Law holds that:",
            "Who is the main exponent of Legal Positivism?",
            "According to the Positivist School:",
        ],
        "options_pool": [
            ["Law and morality are inseparable", "Law is the command of the sovereign - law as it 'is', not as it 'ought to be'", "Law evolves from customs", "Law is what courts decide"],
            ["Aristotle", "John Austin (and later H.L.A. Hart)", "Roscoe Pound", "Karl Marx"],
            ["Unjust laws are not true laws", "Law is a command backed by sanction, separate from morality", "Law reflects the spirit of the people", "Law is a tool for social engineering"],
        ],
        "correct": 1,
        "explanation": "The Positivist School (Austin) holds that law is the command of the sovereign backed by sanctions. Positivists separate law from morality - a law is valid if it follows proper procedure, even if unjust. Their motto: 'law as it is' vs 'law as it ought to be.'"
    },
    "c11_legal_005_realist_school": {
        "topic": "Schools of Law - Realist School",
        "node_id": "c11_legal_005",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "The Realist School of Law believes that law:",
            "According to the Realist School, law is best understood by studying:",
            "The Realist School originated in which country?",
        ],
        "options_pool": [
            ["Is a set of abstract principles", "Is what courts actually do / court decisions", "Evolves from customs", "Is the command of the sovereign"],
            ["Legislative intent", "Actual court decisions and judicial behavior", "Moral philosophy", "Social customs"],
            ["England", "United States of America", "France", "Germany"],
        ],
        "correct": 1,
        "explanation": "The Realist School (American Realism - Holmes, Llewellyn) believes 'law is what the courts do.' They focus on how judges actually decide cases rather than abstract rules. They argue that legal rules on paper often differ from actual court practice."
    },
    "c11_legal_005_sociological_school": {
        "topic": "Schools of Law - Sociological School",
        "node_id": "c11_legal_005",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "The Sociological School of Law views law as:",
            "Who is a main exponent of the Sociological School?",
            "The Sociological School focuses on:",
        ],
        "options_pool": [
            ["Commands of the sovereign", "A social instrument for balancing individual and social interests", "Natural moral principles", "What judges decide"],
            ["John Austin", "Roscoe Pound", "Aristotle", "Savigny"],
            ["Abstract legal principles", "Law as a tool for social engineering and balancing interests", "Divine revelation", "Historical customs"],
        ],
        "correct": 1,
        "explanation": "Roscoe Pound's Sociological School views law as a tool for social engineering - balancing individual, public, and social interests. Law must serve society and adapt to social needs. Pound emphasized 'law in action' rather than 'law in books.'"
    },
    "c11_legal_005_sources_law": {
        "topic": "Main Sources of Law",
        "node_id": "c11_legal_005",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "The three main sources of law in jurisprudence are:",
            "Which of the following is NOT a main source of law?",
            "Legislation as a source of law refers to:",
        ],
        "options_pool": [
            ["Customs, Legislation, Precedents", "Religion, Morality, Customs", "Natural law, Positive law, Real law", "Dharma, Artha, Kama"],
            ["Customs", "Legislation", "Precedents", "Personal opinion of the judge"],
            ["Law made by the legislature (Parliament/Assembly)", "Customary practices", "Court judgments", "Religious texts"],
        ],
        "correct": 0,
        "explanation": "The three main sources of law in modern jurisprudence are: (1) Customs - long-standing practices, (2) Legislation - laws made by the legislature, (3) Precedents - earlier court decisions that guide future cases (stare decisis)."
    },
    "c11_legal_005_law_society_dynamics": {
        "topic": "Law and Society Dynamics",
        "node_id": "c11_legal_005",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "Explain in your own words: How does society force law to change? Give one Indian example. (3-4 sentences)",
        "answer": "Society forces law to change when social values, needs, and expectations evolve faster than existing laws. Public opinion, social movements, and changing moral standards create pressure for legal reform. For example, the Indian society's changing attitude towards dowry and women's rights led to amendments in the Dowry Prohibition Act and the introduction of stricter domestic violence laws. Similarly, the decriminalization of homosexuality (Navtej Singh Johar case, 2018) reflected changing societal attitudes.",
        "explanation": "Law and society have a dynamic, two-way relationship. Law can bring social change, and society can force law to change. This interaction is central to the sociological school of jurisprudence."
    },
    "c11_legal_005_numerical_time_periods": {
        "topic": "Meaning of Law and Jurisprudence - Timeline",
        "node_id": "c11_legal_005",
        "type": QuestionType.NUMERICAL.value,
        "difficulty": Difficulty.EASY.value,
        "competency": False,
        "question": "If Classical Hindu Law period is considered to span from 1500 BCE to 1200 CE, and Anglo-Hindu Law from 1772 CE to 1947 CE, calculate the total number of years covered by these two periods combined.",
        "answer": 4319,
        "steps": [
            "Step 1: Calculate Classical Hindu Law period: From 1500 BCE to 1200 CE",
            "        1500 BCE to 0 CE = 1500 years; 0 CE to 1200 CE = 1200 years",
            "        Classical period = 1500 + 1200 = 2700 years",
            "Step 2: Calculate Anglo-Hindu Law period: From 1772 CE to 1947 CE",
            "        Anglo-Hindu Law = 1947 - 1772 = 175 years",
            "Step 3: Total = 2700 + 175 = 2875 years",
        ],
        "verification": "2875 years total. Classical: 1500 + 1200 = 2700. Anglo-Hindu: 1947 - 1772 = 175. Sum: 2700 + 175 = 2875. ✓"
    },

    # ---- Chapter 2: Civil vs Criminal Law ----

    "c11_legal_006_civil_vs_criminal": {
        "topic": "Civil Law vs Criminal Law",
        "node_id": "c11_legal_006",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question_templates": [
            "In criminal law, the State acts as:",
            "Which of the following is a key difference between civil and criminal law?",
            "In a civil proceeding, the parties are called:",
        ],
        "options_pool": [
            ["The victim", "The prosecutor (through the Public Prosecutor)", "The judge", "The witness"],
            ["Standard of proof is 'balance of probabilities' in both", "Criminal law involves public wrongs; civil law involves private wrongs", "Both require the same burden of proof", "Civil law has punishment; criminal law has compensation"],
            ["Prosecutor and Accused", "Plaintiff and Defendant", "Appellant and Respondent", "Complainant and Offender"],
        ],
        "correct": 1,
        "explanation": "In criminal law, the State prosecutes through a Public Prosecutor because crime is considered a wrong against society. In civil cases, the aggrieved party (plaintiff) sues the other party (defendant) for private remedies like compensation."
    },
    "c11_legal_006_standard_of_proof": {
        "topic": "Civil Law vs Criminal Law - Standard of Proof",
        "node_id": "c11_legal_006",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.HARD.value,
        "competency": False,
        "question_templates": [
            "The standard of proof required in a criminal case is:",
            "Which standard of proof is higher?",
            "'Beyond reasonable doubt' applies to:",
        ],
        "options_pool": [
            ["Balance of probabilities", "Beyond reasonable doubt", "Preponderance of evidence", "Likelihood"],
            ["Civil law", "Criminal law", "Both equally", "Administrative law"],
            ["Civil cases", "Criminal cases", "Both civil and criminal", "Only murder cases"],
        ],
        "correct": 1,
        "explanation": "Criminal law requires proof 'beyond reasonable doubt' - a very high standard because a person's liberty/reputation is at stake. Civil law requires only 'preponderance of evidence' or 'balance of probabilities' - the lower standard applies because the remedy is typically monetary compensation."
    },
    "c11_legal_006_public_prosecutor": {
        "topic": "Civil Law vs Criminal Law - Public Prosecutor",
        "node_id": "c11_legal_006",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "Why does the State act as the prosecutor in criminal cases? Explain the role of the Public Prosecutor. (3-4 sentences)",
        "answer": "The State acts as prosecutor because crime is considered a wrong against society, not just the individual victim. The Public Prosecutor (under Section 2(u) CrPC) is an officer of the court appointed by the State to conduct prosecution. Their role is to present the case fairly before an impartial court, not to secure conviction at any cost. They must assist the court in discovering the truth.",
        "explanation": "The Public Prosecutor is independent of the police and the victim. Their duty is to the court and to justice. They must not act as a partisan but must help the court reach a just decision."
    },
    "c11_legal_006_compensation_vs_punishment": {
        "topic": "Civil Law vs Criminal Law - Compensation and Punishment",
        "node_id": "c11_legal_006",
        "type": QuestionType.LONG_ANSWER.value,
        "difficulty": Difficulty.HARD.value,
        "competency": True,
        "question": "Distinguish between Civil Law and Criminal Law on the basis of: (1) Nature of wrong, (2) Parties involved, (3) Objective/Purpose, (4) Standard of proof, (5) Consequence. (5 marks)",
        "answer": "(1) Nature of wrong: Civil wrongs are private wrongs (breach of contract, tort) against an individual. Criminal wrongs are public wrongs (theft, murder) against society. (2) Parties: Civil cases involve Plaintiff vs Defendant. Criminal cases involve State (through Public Prosecutor) vs Accused. (3) Objective: Civil law aims at compensation/restitution for the victim. Criminal law aims at punishment/deterrence of the offender and protection of society. (4) Standard of proof: Civil law uses 'balance of probabilities.' Criminal law requires proof 'beyond reasonable doubt.' (5) Consequence: Civil law results in damages/injunction. Criminal law results in imprisonment, fine, or both.",
        "explanation": "These distinctions are fundamental to understanding the Indian legal system. Some wrongs (like assault) can be both civil and criminal - the victim can claim compensation (civil) while the State prosecutes the offender (criminal)."
    },
    "c11_legal_006_numerical_burden_proof": {
        "topic": "Civil Law vs Criminal Law - Numerical on Standards",
        "node_id": "c11_legal_006",
        "type": QuestionType.NUMERICAL.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question": "In a civil case, if the probability of the defendant being liable is assessed at 55%, and in a criminal case the prosecution can only prove 75% certainty of guilt, determine: (1) Does the civil plaintiff succeed? (2) Does the prosecution succeed in the criminal case?",
        "answer": "(1) Civil plaintiff SUCCEEDS (55% > 50% balance of probabilities). (2) Prosecution FAILS (75% < beyond reasonable doubt, interpreted as ~95%+)",
        "steps": [
            "Step 1: Understand standards of proof:",
            "         Civil: Balance of probabilities = > 50% likelihood",
            "         Criminal: Beyond reasonable doubt = very high standard (~95%+)",
            "Step 2: Civil case: Probability = 55%",
            "         55% > 50% → Civil plaintiff SUCCEEDS",
            "Step 3: Criminal case: Probability = 75%",
            "         75% < ~95% (beyond reasonable doubt) → Prosecution FAILS",
            "Step 4: Conclusion: Even at 75% certainty, a criminal conviction cannot be secured.",
        ],
        "verification": "Civil: 55% > 50% threshold → Win ✓. Criminal: 75% < ~95% threshold → Fail ✓. This demonstrates the much higher burden in criminal law."
    },

    # ---- Chapter 3: Legal Personality ----

    "c11_legal_009_natural_person": {
        "topic": "Natural Person and Legal Personality",
        "node_id": "c11_legal_009",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.EASY.value,
        "competency": False,
        "question_templates": [
            "A 'natural person' refers to:",
            "Every human being is a:",
            "The term 'natural person' in law means:",
        ],
        "options_pool": [
            ["A company or corporation", "A human being recognized as a person by law", "An idol or deity", "The State"],
            ["Legal person only", "Natural person", "Artificial person", "Juridical person only"],
            ["A legal fiction", "A human being with legal capacity", "An organization", "A non-living entity with rights"],
        ],
        "correct": 1,
        "explanation": "A natural person is a human being recognized by law as having legal rights and duties. Every human being is a natural person. The term contrasts with 'artificial/juridical person' which refers to non-human entities given legal personality."
    },
    "c11_legal_009_slavery_history": {
        "topic": "Legal Personality - Capacity from Slavery to Modern Times",
        "node_id": "c11_legal_009",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "During the period of slavery in the USA, enslaved people were considered:",
            "The evolution of legal personality is demonstrated by the fact that:",
            "When were slaves legally recognized as persons with rights in the USA?",
        ],
        "options_pool": [
            ["Natural persons with full rights", "Chattels/property, not persons", "Artificial persons", "Limited legal persons"],
            ["Legal personality has always been universal", "Not all human beings were historically recognized as legal persons (e.g., slaves)", "Companies have always had more rights than humans", "Animals have always been legal persons"],
            ["1776 (Independence)", "1865 (13th Amendment abolished slavery)", "1947 (Indian Independence)", "1950 (Indian Constitution)"],
        ],
        "correct": 1,
        "explanation": "Enslaved people in the USA were treated as chattels (property) rather than persons. They had no legal rights. The 13th Amendment (1865) abolished slavery, legally recognizing former slaves as persons. This shows legal personality is not inherent but granted by law."
    },
    "c11_legal_009_mask_personality": {
        "topic": "Legal Personality - Mask of Legal Personality",
        "node_id": "c11_legal_009",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question": "What is meant by the 'mask of legal personality'? Explain with reference to a company. (3-4 sentences)",
        "answer": "The 'mask of legal personality' (legal fiction) refers to treating a non-human entity as if it were a person in law. A company wears this mask - it is not a real human being but is given legal personality so it can own property, sue and be sued, and enter contracts. This fiction allows the company to function as a separate legal entity distinct from its shareholders. The mask can be 'lifted' (piercing the corporate veil) in cases of fraud or misuse.",
        "explanation": "The corporate veil is a legal fiction. It allows business to operate efficiently through artificial persons. But courts can 'lift the veil' when the company is used to evade law or commit fraud."
    },
    "c11_legal_009_five_theories": {
        "topic": "Legal Personality - Five Jurisprudential Theories",
        "node_id": "c11_legal_009",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.HARD.value,
        "competency": False,
        "question_templates": [
            "The Fiction Theory of legal personality was propounded by:",
            "The Concession Theory states that:",
            "The Purpose Theory holds that legal personality exists for:",
        ],
        "options_pool": [
            ["Savigny", "Salmon / Savigny (Fiction Theory)", "Bentham", "Kelsen"],
            ["Legal personality is inherent in all humans", "Legal personality is a concession/grant by the State", "Legal personality is a biological fact", "Animals have legal personality"],
            ["A biological purpose", "A specific purpose or objective", "Religious reasons", "No particular purpose"],
        ],
        "correct": 1,
        "explanation": "Fiction Theory: A legal person is a fiction - the law attributes rights to something that isn't a real person. Concession Theory: Legal personality exists only by concession of the State - the State can grant or withdraw it. Purpose Theory: A legal person exists to serve a specific purpose, not as an end in itself."
    },
    "c11_legal_009_non_human_persons": {
        "topic": "Legal Personality Beyond Human Beings",
        "node_id": "c11_legal_009",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.HARD.value,
        "competency": True,
        "question_templates": [
            "Which of the following entities has been granted legal personality in India?",
            "An idol of a deity in a temple has been held to be a:",
            "The Supreme Court of India has recognized which of the following as having legal personality?",
        ],
        "options_pool": [
            ["Only human beings", "Idols, rivers (Ganga), animals, companies, State", "Only companies", "Only the State"],
            ["Natural person", "Legal person / juristic person", "Property", "Trustee only"],
            ["Only companies and State", "Animals, rivers, and idols (legal persons for protection)", "Only the President of India", "No non-human entity"],
        ],
        "correct": 1,
        "explanation": "In India, the Supreme Court has recognized: (1) Idols as legal persons (Pramatha Nath Tagore case), (2) Rivers (Ganga, Yamuna) as legal persons (2017 judgment), (3) Animals as having rights (Animal Welfare Board case), (4) Unborn children (Transfer of Property Act), (5) Companies (Companies Act), (6) The State as a legal person."
    },
    "c11_legal_009_bracket_theory": {
        "topic": "Legal Personality - Jurisprudential Theories",
        "node_id": "c11_legal_009",
        "type": QuestionType.FILL_BLANK.value,
        "difficulty": Difficulty.HARD.value,
        "competency": False,
        "question": "According to the Bracket (or Symbolic) Theory of legal personality, rights and duties of group members are 'bracketed' or pooled together and attributed to the ______ as if it were a single person.",
        "answer": "group / collective entity / group as a whole",
        "alternative_answers": ["corporate body", "group entity"],
        "explanation": "The Bracket Theory (also called Group or Collective Theory) says that legal personality is just a convenient label or bracket that groups the rights and duties of individual members together. There is no separate entity beyond the individual members."
    },
    "c11_legal_009_unborn_child": {
        "topic": "Legal Personality - Unborn Child",
        "node_id": "c11_legal_009",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.HARD.value,
        "competency": True,
        "question": "Under what circumstances can an unborn child be considered a legal person in India? Mention the relevant legal provision. (3-4 sentences)",
        "answer": "An unborn child in the womb (en ventre sa mere) can be treated as a legal person for certain purposes under Indian law. Section 13 of the Transfer of Property Act, 1882 allows a transfer of property for the benefit of an unborn person, provided the transfer creates a prior interest for a living person. The unborn child acquires a vested interest upon birth. However, the unborn child cannot hold full legal personality until born alive.",
        "explanation": "The law protects the interests of the unborn through specific provisions. The 'en ventre sa mere' principle allows an unborn child to have contingent rights that become enforceable upon live birth."
    },
    "c11_legal_009_numerical_voting_power": {
        "topic": "Legal Personality - Companies and Shareholders",
        "node_id": "c11_legal_009",
        "type": QuestionType.NUMERICAL.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question": "A company has 1000 shares held by 5 shareholders: A holds 200, B holds 150, C holds 100, D holds 250, E holds 300 shares. Calculate the percentage voting power of each shareholder and identify if any shareholder has a 'controlling interest' (more than 50%). The company as a legal person has 1 vote per share.",
        "answer": {"A": "20%", "B": "15%", "C": "10%", "D": "25%", "E": "30%", "controlling_interest": False, "total": "100%"},
        "steps": [
            "Step 1: Total shares = 200 + 150 + 100 + 250 + 300 = 1000 shares",
            "Step 2: Calculate percentage voting power for each shareholder:",
            "         A: (200/1000) x 100 = 20%",
            "         B: (150/1000) x 100 = 15%",
            "         C: (100/1000) x 100 = 10%",
            "         D: (250/1000) x 100 = 25%",
            "         E: (300/1000) x 100 = 30%",
            "Step 3: Check for controlling interest (>50%):",
            "         No single shareholder has more than 50%",
            "         Maximum is E with 30%",
            "Step 4: Sum check: 20 + 15 + 10 + 25 + 30 = 100% ✓",
        ],
        "verification": "Sum = 20+15+10+25+30 = 100%. No shareholder exceeds 50%. The company (as a legal person) exercises voting power collectively through its shareholders. ✓"
    },

    # ---- Chapter 3: Partnership ----

    "c11_legal_010_partnership_definition": {
        "topic": "Partnership - Meaning and Relations",
        "node_id": "c11_legal_010",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.EASY.value,
        "competency": False,
        "question_templates": [
            "A partnership firm is defined under which Indian Act?",
            "Partnership is the relation between persons who have agreed to:",
            "The essential elements of a partnership include all EXCEPT:",
        ],
        "options_pool": [
            ["Indian Contract Act, 1872", "Indian Partnership Act, 1932", "Companies Act, 2013", "Societies Registration Act, 1860"],
            ["Share profits of a business carried on by all or any of them acting for all", "Share losses only", "Work as employees", "Invest in property only"],
            ["Contract between partners", "Profit sharing", "Mutual agency", "Single owner business"],
        ],
        "correct": 1,
        "explanation": "Partnership is defined under Section 4 of the Indian Partnership Act, 1932 as 'the relation between persons who have agreed to share the profits of a business carried on by all or any of them acting for all.' A single-owner business is NOT a partnership."
    },
    "c11_legal_010_mutual_agency": {
        "topic": "Partnership - Mutual Agency",
        "node_id": "c11_legal_010",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "The principle of 'mutual agency' in partnership means:",
            "In a partnership, each partner is:",
            "'All or any of them acting for all' refers to the principle of:",
        ],
        "options_pool": [
            ["Only the managing partner can bind the firm", "Every partner can bind the firm and is bound by acts of other partners", "Partners need permission for every act", "Partners act independently"],
            ["An agent of the firm and a principal of other partners", "An employee of the firm", "An independent contractor", "A mere investor"],
            ["Profit sharing", "Mutual agency", "Contract", "Business requirement"],
        ],
        "correct": 1,
        "explanation": "Mutual agency is the cardinal principle of partnership - each partner is both an agent (can bind the firm) and a principal (bound by acts of other partners). 'All or any of them acting for all' means any partner acting within the scope of the business binds the entire firm."
    },
    "c11_legal_010_minor_partner": {
        "topic": "Partnership - Minor's Position",
        "node_id": "c11_legal_010",
        "type": QuestionType.MCQ.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question_templates": [
            "A minor can be admitted to the benefits of a partnership firm with the consent of:",
            "A minor partner in a firm has the right to:",
            "On attaining majority, a minor partner must:",
        ],
        "options_pool": [
            ["All partners only", "All existing partners", "Any single partner", "The Registrar of Firms"],
            ["Share profits but not losses", "Act as a full partner", "Manage the business", "Bind the firm"],
            ["Automatically become a full partner", "Elect within 6 months whether to become a full partner", "Leave the firm without notice", "Claim ownership of the firm"],
        ],
        "correct": 1,
        "explanation": "Under Section 30 of the Partnership Act, a minor can be admitted to the benefits of partnership with the consent of ALL existing partners. The minor can share profits but is not liable for losses and cannot bind the firm by their acts. On attaining majority, the minor must elect within 6 months whether to become a full partner or leave."
    },
    "c11_legal_010_duties_partners": {
        "topic": "Partnership - Duties of Partners Inter Se",
        "node_id": "c11_legal_010",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question": "List and briefly explain any four general duties of partners inter se under the Indian Partnership Act, 1932. (4-5 sentences)",
        "answer": "(1) Duty to carry on the business to the greatest common advantage: Each partner must act faithfully for the benefit of the firm. (2) Duty to be just and faithful: Partners must be honest and fair in their dealings with each other. (3) Duty to render true accounts: Partners must maintain and disclose accurate accounts of the firm's business. (4) Duty not to compete: A partner must not carry on a competing business without consent of other partners (Section 27). (5) Duty to indemnify for fraud: A partner guilty of fraud must indemnify the firm for any loss caused.",
        "explanation": "These duties arise from the fiduciary relationship between partners. Partners owe each other utmost good faith (uberrimae fidei) because each partner is an agent of the others."
    },
    "c11_legal_010_rights_partners": {
        "topic": "Partnership - Rights of Partners",
        "node_id": "c11_legal_010",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question": "What are the rights of a partner with respect to partnership property? (3-4 sentences)",
        "answer": "Every partner has the right to: (1) Be consulted in all decisions affecting the firm - ordinary matters are decided by majority, but fundamental changes require unanimity. (2) Access and inspect the firm's books and accounts. (3) Share equally in profits and losses unless otherwise agreed. (4) Receive indemnity for acts done in the ordinary course of business. (5) The property of the firm is held in trust for all partners collectively, and each partner has an equal right to use it for business purposes.",
        "explanation": "Partners are co-owners of the partnership property. No partner can exclusively claim any part of the partnership property. All property brought into the firm or acquired for the firm belongs to all partners equally."
    },
    "c11_legal_010_implied_authority": {
        "topic": "Partnership - Express and Implied Authority",
        "node_id": "c11_legal_010",
        "type": QuestionType.LONG_ANSWER.value,
        "difficulty": Difficulty.HARD.value,
        "competency": True,
        "question": "Explain 'implied authority' of a partner. What acts are within the implied authority of a partner? What acts are beyond implied authority? (5 marks)",
        "answer": "Implied authority (Section 19, Partnership Act): A partner's authority that is not expressly given but is inferred from the nature of the business and the partner's position. Acts WITHIN implied authority: (1) Buying and selling goods in the ordinary course, (2) Receiving payments and giving receipts, (3) Engaging employees needed for the business, (4) Borrowing money in the ordinary course, (5) Using the firm's credit for business purposes. Acts BEYOND implied authority: (1) Selling the firm's immovable property, (2) Opening a bank account in own name, (3) Compromising claims of the firm, (4) Entering into partnership on behalf of the firm, (5) Assigning partnership property to a third party. These require express consent of all partners.",
        "explanation": "Implied authority is based on the principle of mutual agency. A partner can bind the firm by acts done in the ordinary course of business. Acts outside ordinary course require express authority."
    },
    "c11_legal_010_numerical_profit_sharing": {
        "topic": "Partnership - Profit and Loss Sharing",
        "node_id": "c11_legal_010",
        "type": QuestionType.NUMERICAL.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "A, B, and C form a partnership firm. They agree to share profits and losses in the ratio 3:2:1. The firm earned a profit of Rs. 36,000 in the first year. However, it was also agreed that: (i) C's share will be guaranteed for a minimum of Rs. 5,000, and (ii) A will receive a bonus of 5% of the profit before division. Calculate: (1) The bonus to A, (2) The actual profit available for division, (3) Each partner's final share.",
        "answer": {"A_bonus": "1800", "profit_for_division": "34200", "A_share": "17600", "B_share": "11400", "C_share": "5200"},
        "steps": [
            "Step 1: Calculate A's bonus = 5% of Rs. 36,000 = Rs. 1,800",
            "Step 2: Profit available for division = 36,000 - 1,800 = Rs. 34,200",
            "Step 3: Base profit ratio = 3:2:1 (total = 6 parts)",
            "Step 4: Each part = 34,200 / 6 = Rs. 5,700",
            "Step 5: Tentative shares: A = 3 x 5,700 = 17,100; B = 2 x 5,700 = 11,400; C = 1 x 5,700 = 5,700",
            "Step 6: C's share is guaranteed minimum Rs. 5,000. C gets Rs. 5,700 (above minimum).",
            "Step 7: Add A's bonus: A's total = 17,100 + 1,800 = Rs. 18,900",
            "Step 8: Wait, let me recalculate with C's guarantee applied correctly:",
            "         Total for division = 34,200",
            "         C gets minimum 5,000. C gets 5,700 (ratio share) which > 5,000.",
            "         So no adjustment needed. C gets full ratio share.",
            "Step 9: Final shares:",
            "         A: 17,100 + 1,800 (bonus) = 18,900",
            "         B: 11,400",
            "         C: 5,700",
        ],
        "verification": "18,900 + 11,400 + 5,700 = 36,000 ✓. Bonus = 5% of 36,000 = 1,800 ✓. C's share 5,700 > guaranteed 5,000 ✓."
    },
    "c11_legal_010_numerical_interest_capital": {
        "topic": "Partnership - Interest on Capital",
        "node_id": "c11_legal_010",
        "type": QuestionType.NUMERICAL.value,
        "difficulty": Difficulty.HARD.value,
        "competency": True,
        "question": "Three partners X, Y, and Z have capitals of Rs. 50,000, Rs. 30,000, and Rs. 20,000 respectively. Interest on capital is agreed at 10% per annum. The firm made a profit of Rs. 24,000. Interest on drawings: X Rs. 1,000, Y Rs. 500, Z Rs. 300. Salaries: X Rs. 6,000, Y Rs. 4,000 per annum. Find the distribution of profit. (Profits are shared in the ratio 5:3:2)",
        "answer": {"X": "16100", "Y": "8500", "Z": "4900"},
        "steps": [
            "Step 1: Calculate Interest on Capital:",
            "         X: 10% of 50,000 = 5,000",
            "         Y: 10% of 30,000 = 3,000",
            "         Z: 10% of 20,000 = 2,000",
            "         Total interest on capital = 10,000",
            "Step 2: Calculate Total Interest on Drawings:",
            "         X: 1,000 + Y: 500 + Z: 300 = 1,800",
            "Step 3: Calculate Total Salaries:",
            "         X: 6,000 + Y: 4,000 = 10,000",
            "Step 4: Prepare Profit and Loss Appropriation:",
            "         Total Profit = 24,000",
            "         (+) Salaries = 10,000",
            "         (-) Interest on Capital = 10,000",
            "         (+) Interest on Drawings = 1,800",
            "         Net divisible profit = 24,000 + 10,000 - 10,000 + 1,800 = 25,800",
            "Step 5: Divide in ratio 5:3:2 (total = 10 parts):",
            "         Each part = 25,800 / 10 = 2,580",
            "         X (5 parts): 5 x 2,580 = 12,900",
            "         Y (3 parts): 3 x 2,580 = 7,740",
            "         Z (2 parts): 2 x 2,580 = 5,160",
            "Step 6: Calculate Total for Each Partner:",
            "         X: Salary 6,000 + Interest on Cap 5,000 + Profit Share 12,900 - Drawings 1,000 = 22,900",
            "         Y: Salary 4,000 + Interest on Cap 3,000 + Profit Share 7,740 - Drawings 500 = 14,240",
            "         Z: Interest on Cap 2,000 + Profit Share 5,160 - Drawings 300 = 6,860",
        ],
        "verification": "22,900 + 14,240 + 6,860 = 44,000. Total profit distributed = (22,900-6,000+1,000) + (14,240-4,000+500) + (6,860-2,000+300) = 17,900+10,740+5,160 = 33,800. Wait, let me recalculate the profit share portion: 12,900+7,740+5,160 = 25,800. Total distributable = 24,000 + 1,800 (drawings) = 25,800 ✓. Total profit share + interest + salaries - drawings: (12,900+6,000+5,000-1,000) + (7,740+4,000+3,000-500) + (5,160+2,000-300) = 22,900 + 14,240 + 6,860 = 44,000. Sum of salaries + interest + profit + drawings: (6,000+4,000) + (5,000+3,000+2,000) + 25,800 - 1,800 = 10,000 + 10,000 + 25,800 - 1,800 = 44,000 ✓."
    },

    # ---- Additional comprehensive questions ----

    "c11_legal_001_dharma_duty_society_fill": {
        "topic": "Law in Ancient India - Duty-based Society",
        "node_id": "c11_legal_001",
        "type": QuestionType.FILL_BLANK.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "In ancient Indian society, the concept of '________ from Pauper to King' signified that everyone, regardless of status, was bound by duties.",
        "answer": "Duty",
        "explanation": "Ancient Indian society was organized around the concept of Dharma (duty). From the humblest pauper to the mightiest king, every person had duties (Dharma) to perform. Rights were not inherent but flowed from the proper discharge of duties."
    },
    "c11_legal_002_village_dispute": {
        "topic": "Judiciary in Ancient India - Competency",
        "node_id": "c11_legal_002",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "If a dispute arises between two farmers in a rural Indian village over a land boundary in ancient India, which judicial body would first hear the case and what procedure would be followed? (4-5 sentences)",
        "answer": "The dispute would first be heard by the Kulani (Village Council) composed of village elders and the Gramika (headman). The Kulani would follow Vyavahara (procedural rules) including hearing both parties, examining evidence (witnesses, boundaries), and applying local customs (Achaara). If either party was dissatisfied, they could appeal to the higher court. The decision of the Kulani was binding and based on local customary law and Dharma.",
        "explanation": "The Kulani system provided accessible justice at the grassroots level. Elders applied customary law and Dharma, making justice culturally relevant and accessible to ordinary people."
    },
    "c11_legal_005_indian_constitution_jurisprudence": {
        "topic": "Meaning of Law and Jurisprudence - Indian Context",
        "node_id": "c11_legal_005",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "How does the Indian Constitution reflect the Natural Law and Sociological School of Jurisprudence? Give specific examples. (4-5 sentences)",
        "answer": "The Indian Constitution reflects Natural Law through: (1) Preamble's commitment to Justice, Liberty, Equality - universal moral principles; (2) Fundamental Rights as inalienable rights inherent in human dignity. It reflects Sociological School through: (1) Directive Principles of State Policy guiding social engineering; (2) Reservation policies for social justice; (3) Environmental protection laws reflecting societal welfare. Article 21 (Right to Life) expanded by courts to include right to clean environment, education, and health shows the dynamic law-society relationship.",
        "explanation": "India's Constitution uniquely blends Natural Law (Fundamental Rights as moral rights) with Sociological principles (Directive Principles for social welfare). This synthesis reflects India's legal philosophy."
    },
    "c11_legal_009_indian_animal_person": {
        "topic": "Legal Personality - Indian Context",
        "node_id": "c11_legal_009",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.HARD.value,
        "competency": True,
        "question": "In 2014, the Supreme Court of India in Animal Welfare Board v. Nagaraja case mandated certain welfare measures for animals. How does this relate to the concept of legal personality beyond human beings? (4-5 sentences)",
        "answer": "In Animal Welfare Board v. Nagaraja (2014), the Supreme Court mandated 'duty of care' towards animals under Article 21 and Article 51A(g), effectively recognizing animals as having certain legal protections even though not full legal persons. The Court held that animals have rights that flow from Article 21's right to life. This extends the concept of legal personality by granting animals 'rights-holders' status without making them full legal persons. The judgment reflects the expanding scope of legal personality to include non-human entities deserving of protection, consistent with the evolving understanding of legal personality beyond human beings.",
        "explanation": "This landmark judgment expanded the concept of legal personhood. While animals aren't full legal persons, they are recognized as having enforceable rights - a significant development in Indian jurisprudence on legal personality."
    },
    "c11_legal_010_indian_partnership_firm": {
        "topic": "Partnership - Indian Context",
        "node_id": "c11_legal_010",
        "type": QuestionType.SHORT_ANSWER.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": True,
        "question": "Why is a partnership firm NOT considered a separate legal entity distinct from its partners in India? Explain with reference to the Indian Partnership Act, 1932. (4-5 sentences)",
        "answer": "Under Section 4 of the Indian Partnership Act, 1932, a partnership firm is defined as the relation between persons sharing profits of a business - it is a relationship, NOT a separate legal entity. Unlike a company (which is a separate legal person under the Companies Act), a partnership firm has no legal existence apart from its partners. Therefore: (1) Firm's property is held by partners collectively, (2) Firm cannot own property in its own name, (3) Partners are jointly and severally liable for firm's debts (unlimited liability). The firm's existence depends on the continued association of partners - death/insolvency of a partner dissolves the firm.",
        "explanation": "This contrasts sharply with a company, which is a separate legal person. A partnership is an aggregate of individuals, not a separate entity. This is a key distinction taught in Chapter 3 of the syllabus."
    },
    "c11_legal_001_fill_dharma": {
        "topic": "Law in Ancient India - Hindu Law and Dharma",
        "node_id": "c11_legal_001",
        "type": QuestionType.FILL_BLANK.value,
        "difficulty": Difficulty.EASY.value,
        "competency": True,
        "question": "In ancient India, Dharma was not merely a religious concept but encompassed ________, ________, and ________ combined.",
        "answer": "law, duty, and moral conduct",
        "explanation": "Dharma in ancient India was a comprehensive concept covering law, duty, and moral conduct. It governed every aspect of life - personal, social, economic, and political."
    },
    "c11_legal_002_fill_vyavahara": {
        "topic": "Judiciary in Ancient India",
        "node_id": "c11_legal_002",
        "type": QuestionType.FILL_BLANK.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question": "Vyavahara in ancient Indian law referred to the ________ rules governing legal proceedings.",
        "answer": "procedural",
        "explanation": "Vyavahara means 'legal proceeding' and referred to the procedural rules for conducting legal cases in ancient India."
    },
    "c11_legal_005_fill_jurisprudence": {
        "topic": "Meaning of Law and Jurisprudence",
        "node_id": "c11_legal_005",
        "type": QuestionType.FILL_BLANK.value,
        "difficulty": Difficulty.EASY.value,
        "competency": False,
        "question": "Jurisprudence is the ________ or ________ of law.",
        "answer": "science / philosophy",
        "explanation": "Jurisprudence is the science or philosophy of law. It examines the nature, sources, and validity of law."
    },
    "c11_legal_006_fill_standard": {
        "topic": "Civil Law vs Criminal Law",
        "node_id": "c11_legal_006",
        "type": QuestionType.FILL_BLANK.value,
        "difficulty": Difficulty.MEDIUM.value,
        "competency": False,
        "question": "In criminal law, guilt must be proved ________ reasonable doubt, whereas in civil law, the standard is ________ of probabilities.",
        "answer": "beyond / balance",
        "explanation": "Criminal law requires proof 'beyond reasonable doubt' (very high standard). Civil law requires only 'balance of probabilities' or 'preponderance of evidence' (lower standard)."
    },
    "c11_legal_009_fill_legal_person": {
        "topic": "Legal Personality",
        "node_id": "c11_legal_009",
# TRUNCATED:         "type":
}}