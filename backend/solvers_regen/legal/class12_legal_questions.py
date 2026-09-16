import random
import math
import re
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from enum import Enum

# ============================================================
# ENUMS & DATA CLASSES
# ============================================================

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"
    ASSERTION_REASON = "assertion_reason"

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

@dataclass
class Question:
    id: str = ""
    type: str = ""
    question: str = ""
    options: Optional[List[str]] = None
    answer: str = ""
    explanation: str = ""
    difficulty: str = "medium"
    topic: str = ""
    bloom_level: str = ""
    competency: bool = False
    steps: List[str] = field(default_factory=list)
    verification: str = ""

# ============================================================
# HELPER FUNCTIONS
# ============================================================

def _q(id, type, question, options, answer, explanation,
       difficulty, topic, bloom, competency, steps, verification):
    """Create a question dictionary."""
    return {
        "id": id,
        "type": type,
        "question": question,
        "options": options,
        "answer": answer,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "bloom_level": bloom,
        "competency": competency,
        "steps": steps,
        "verification": verification,
    }

def _seed_r(seed):
    """Create a seeded Random instance."""
    return random.Random(seed)

# ============================================================
# INDIAN CONTEXT DATA
# ============================================================

NAMES_M = [
    "Rajesh Kumar", "Vikram Singh", "Arjun Reddy", "Rohit Sharma",
    "Suresh Babu", "Kiran Patel", "Aman Gupta", "Deepak Joshi",
    "Mohit Verma", "Prateek Malhotra", "Aditya Iyer", "Siddharth Rao",
    "Nikhil Agarwal", "Rahul Nair", "Sanjay Mehta", "Ajay Chauhan"
]

NAMES_F = [
    "Priya Sharma", "Anjali Verma", "Neha Kapoor", "Kavita Reddy",
    "Sunita Patel", "Meera Iyer", "Pooja Singh", "Ritu Joshi",
    "Shreya Gupta", "Divya Malhotra", "Anita Desai", "Smita Kulkarni"
]

PLACES = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur",
    "Indore", "Bhopal", "Chandigarh", "Surat", "Varanasi", "Kochi",
    "Coimbatore", "Vijayawada"
]

COURTS = [
    "Supreme Court of India", "Delhi High Court", "Bombay High Court",
    "Calcutta High Court", "Madras High Court", "Karnataka High Court",
    "Punjab and Haryana High Court", "Allahabad High Court"
]

IPC_SECTIONS = {
    "302": "Punishment for murder",
    "304": "Punishment for culpable homicide not amounting to murder",
    "304A": "Causing death by negligence",
    "320": "Grievous hurt",
    "323": "Punishment for voluntarily causing hurt",
    "324": "Voluntarily causing hurt by dangerous weapon",
    "336": "Act endangering life or personal safety",
    "338": "Causing grievous hurt by act endangering life",
    "354": "Assault on woman with intent to outrage her modesty",
    "376": "Punishment for rape",
    "379": "Punishment for theft",
    "383": "Dishonest misappropriation of property",
    "403": "Dishonest misappropriation of movable property",
    "406": "Criminal breach of trust",
    "415": "Cheating",
    "420": "Cheating and dishonestly inducing delivery of property",
    "441": "Criminal trespass",
    "499": "Defamation",
    "500": "Punishment for defamation",
    "503": "Criminal intimidation",
    "506": "Punishment for criminal intimidation",
    "509": "Word, gesture or act intended to insult the modesty of a woman",
    "120B": "Punishment of criminal conspiracy",
    "34": "Acts done by several persons in furtherance of common intention",
    "107": "Abetment of a thing",
    "109": "Punishment of abetment",
    "120A": "Definition of criminal conspiracy",
    "299": "Culpable homicide",
    "300": "Murder",
    "376A": "Punishment for causing death or resulting in vegetative state",
}

# ============================================================
# STATIC QUESTION BANKS
# ============================================================

_STANDARD_JUDICIARY = [
    {
        "q": "The Supreme Court of India was established on:",
        "type": "mcq",
        "opts": ["26th January, 1950", "28th January, 1950", "15th August, 1947", "2nd June, 1947"],
        "ans": "26th January, 1950",
        "expl": "The Supreme Court of India was established on 26th January, 1950, the same day the Constitution of India came into force.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The maximum sanctioned strength of judges in the Supreme Court of India is:",
        "type": "mcq",
        "opts": ["30", "31", "34", "36"],
        "ans": "34",
        "expl": "The maximum sanctioned strength of Supreme Court judges is 34 (1 Chief Justice + 33 other judges), as per the Constitution (99th Amendment) Act, 2015.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Who appoints the Chief Justice of India?",
        "type": "mcq",
        "opts": ["Prime Minister alone", "President of India", "President on the advice of the Prime Minister", "Parliament"],
        "ans": "President of India",
        "expl": "The Chief Justice of India is appointed by the President of India. In practice, the outgoing CJI recommends the name.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Article 124 of the Constitution of India deals with:",
        "type": "fill_blank",
        "opts": None,
        "ans": "Establishment and constitution of Supreme Court",
        "expl": "Article 124 provides for the establishment and constitution of the Supreme Court of India.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The jurisdiction of the Supreme Court that enables it to decide disputes between the Centre and States is called:",
        "type": "mcq",
        "opts": ["Original Jurisdiction", "Appellate Jurisdiction", "Advisory Jurisdiction", "Review Jurisdiction"],
        "ans": "Original Jurisdiction",
        "expl": "Original Jurisdiction refers to cases that can be directly filed in the Supreme Court, including disputes between the Centre and States.",
        "diff": "medium", "bloom": "understand"
    },
    {
        "q": "Writ jurisdiction of the Supreme Court is available under which Article?",
        "type": "mcq",
        "opts": ["Article 32", "Article 226", "Article 136", "Article 141"],
        "ans": "Article 32",
        "expl": "Article 32 empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights. High Courts have this power under Article 226.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The power of judicial review in India is based on:",
        "type": "mcq",
        "opts": ["Explicit provision in the Constitution", "Doctrine of parliamentary supremacy", "Doctrine of separation of powers", "Implicit in the Constitution through various provisions"],
        "ans": "Implicit in the Constitution through various provisions",
        "expl": "Judicial review is not explicitly mentioned but is implicit in Articles 13, 32, 226, and the doctrine of basic structure.",
        "diff": "medium", "bloom": "understand"
    },
    {
        "q": "Public Interest Litigation (PIL) was introduced in India through the judicial activism of:",
        "type": "mcq",
        "opts": ["Justice P.N. Bhagwati", "Justice H.R. Khanna", "Justice Y.V. Chandrachud", "Justice M.N. Venkatachaliah"],
        "ans": "Justice P.N. Bhagwati",
        "expl": "Justice P.N. Bhagwati is known as the father of PIL in India. He introduced the concept in the case of Hussainara Khatoon v. State of Bihar (1979).",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "A High Court has the power to issue writs under which Article?",
        "type": "mcq",
        "opts": ["Article 32", "Article 226", "Article 136", "Article 21"],
        "ans": "Article 226",
        "expl": "Article 226 empowers High Courts to issue writs not only for Fundamental Rights but also for any other legal right.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Under which Article can the Supreme Court grant special leave to appeal from any judgment?",
        "type": "mcq",
        "opts": ["Article 132", "Article 136", "Article 139", "Article 141"],
        "ans": "Article 136",
        "expl": "Article 136 gives the Supreme Court the discretionary power to grant special leave to appeal from any judgment or order.",
        "diff": "medium", "bloom": "understand"
    },
]

_STANDARD_ADR = [
    {
        "q": "Which of the following is NOT a form of Alternative Dispute Resolution?",
        "type": "mcq",
        "opts": ["Arbitration", "Mediation", "Criminal Prosecution", "Conciliation"],
        "ans": "Criminal Prosecution",
        "expl": "ADR methods include negotiation, mediation, conciliation, and arbitration. Criminal prosecution is part of the adversarial litigation system.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The primary legislation governing arbitration in India is:",
        "type": "mcq",
        "opts": ["The Arbitration Act, 1940", "The Arbitration and Conciliation Act, 1996", "The Commercial Courts Act, 2015", "The Alternative Dispute Resolution Act, 2005"],
        "ans": "The Arbitration and Conciliation Act, 1996",
        "expl": "The Arbitration and Conciliation Act, 1996 (amended in 2015 and 2019) governs arbitration and conciliation in India.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The Lok Adalat system is based on the principle of:",
        "type": "mcq",
        "opts": ["Adversarial system", "Compromise and settlement", "Stare decisis", "Res judicata"],
        "ans": "Compromise and settlement",
        "expl": "Lok Adalats are based on Gandhian principles of compromise and settlement, aiming to resolve disputes amicably.",
        "diff": "easy", "bloom": "understand"
    },
    {
        "q": "Under the Legal Services Authorities Act, 1987, the award of Lok Adalat is:",
        "type": "mcq",
        "opts": ["Appealable in a civil court", "Final and binding", "Recommendatory only", "Subject to revision by High Court"],
        "ans": "Final and binding",
        "expl": "The award of Lok Adalat is deemed to be a decree of a civil court and is final and binding on all parties.",
        "diff": "medium", "bloom": "remember"
    },
    {
        "q": "In mediation, the mediator:",
        "type": "mcq",
        "opts": ["Decides the outcome", "Facilitates negotiation between parties", "Acts as a judge", "Imposes a solution"],
        "ans": "Facilitates negotiation between parties",
        "expl": "A mediator is a neutral third party who facilitates communication and negotiation but does not impose a decision.",
        "diff": "easy", "bloom": "understand"
    },
    {
        "q": "The award made by an arbitrator is:",
        "type": "mcq",
        "opts": ["Always appealable", "Binding and enforceable as a court decree", "Only recommendatory", "Subject to approval by court"],
        "ans": "Binding and enforceable as a court decree",
        "expl": "An arbitral award is binding on the parties and can be enforced in a court of law as if it were a decree of the court.",
        "diff": "medium", "bloom": "remember"
    },
    {
        "q": "Conciliation differs from arbitration in that:",
        "type": "mcq",
        "opts": ["A conciliator imposes a decision", "An arbitrator proposes solutions", "A conciliator has no authority to impose a settlement", "Arbitration is informal"],
        "ans": "A conciliator has no authority to impose a settlement",
        "expl": "A conciliator facilitates and proposes solutions but cannot impose a binding award, unlike an arbitrator.",
        "diff": "medium", "bloom": "analyze"
    },
]

_STANDARD_HUMAN_RIGHTS = [
    {
        "q": "The Universal Declaration of Human Rights (UDHR) was adopted by the UN General Assembly on:",
        "type": "mcq",
        "opts": ["24th October, 1945", "10th December, 1948", "26th January, 1950", "15th August, 1947"],
        "ans": "10th December, 1948",
        "expl": "The UDHR was adopted by the UN General Assembly on 10th December, 1948. This day is celebrated as Human Rights Day.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The National Human Rights Commission (NHRC) of India was established in:",
        "type": "mcq",
        "opts": ["1991", "1993", "1995", "1997"],
        "ans": "1993",
        "expl": "The NHRC was established on 12th October, 1993 under the Protection of Human Rights Act, 1993.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Who is the ex-officio Chairperson of the NHRC?",
        "type": "mcq",
        "opts": ["The Prime Minister", "The President", "The Chief Justice of India (or a former Chief Justice)", "The Home Minister"],
        "ans": "The Chief Justice of India (or a former Chief Justice)",
        "expl": "The Chairperson of NHRC is the Chief Justice of India or a Judge of the Supreme Court or a Chief Justice of a High Court.",
        "diff": "medium", "bloom": "remember"
    },
    {
        "q": "Article 21 of the Indian Constitution guarantees:",
        "type": "fill_blank",
        "opts": None,
        "ans": "Protection of life and personal liberty",
        "expl": "Article 21 states: No person shall be deprived of his life or personal liberty except according to procedure established by law.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Which Article of the Indian Constitution abolishes untouchability?",
        "type": "mcq",
        "opts": ["Article 14", "Article 15", "Article 17", "Article 19"],
        "ans": "Article 17",
        "expl": "Article 17 abolishes untouchability and forbids its practice in any form. The enforcement is through the Untouchability (Offences) Act, 1955.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Which of the following rights is NOT a Fundamental Right under the Indian Constitution?",
        "type": "mcq",
        "opts": ["Right to Equality", "Right to Freedom", "Right to Property", "Right against Exploitation"],
        "ans": "Right to Property",
        "expl": "The Right to Property was removed from Fundamental Rights by the 44th Amendment Act, 1978. It is now a legal right under Article 300-A.",
        "diff": "medium", "bloom": "analyze"
    },
    {
        "q": "The term of a member of the State Human Rights Commission is:",
        "type": "mcq",
        "opts": ["3 years or until age 70", "5 years or until age 70", "5 years or until age 65", "3 years or until age 65"],
        "ans": "5 years or until age 70",
        "expl": "A member of the State Human Rights Commission holds office for a term of 5 years or until attaining the age of 70 years, whichever is earlier.",
        "diff": "medium", "bloom": "remember"
    },
]

_STANDARD_CRIMES = [
    {
        "q": "Section 302 of the Indian Penal Code deals with:",
        "type": "mcq",
        "opts": ["Culpable homicide", "Punishment for murder", "Grievous hurt", "Death by negligence"],
        "ans": "Punishment for murder",
        "expl": "Section 302 IPC prescribes punishment for murder, which is death or imprisonment for life, and also fine.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The minimum age of criminal responsibility under Section 82 of IPC is:",
        "type": "mcq",
        "opts": ["7 years", "12 years", "14 years", "18 years"],
        "ans": "7 years",
        "expl": "Section 82 IPC provides that nothing is an offence done by a child under 7 years of age (doli incapax - incapable of crime).",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The essential ingredients of theft under Section 378 IPC are:",
        "type": "mcq",
        "opts": ["Moving property", "Dishonest intention + moving property + without consent", "Only dishonest intention", "Breaking into a building"],
        "ans": "Dishonest intention + moving property + without consent",
        "expl": "Section 378 requires: (1) dishonest intention, (2) to take property, (3) out of possession of another, (4) without consent, (5) and moving it.",
        "diff": "medium", "bloom": "understand"
    },
    {
        "q": "Section 499 of the IPC defines:",
        "type": "mcq",
        "opts": ["Criminal intimidation", "Defamation", "Cheating", "Criminal trespass"],
        "ans": "Defamation",
        "expl": "Section 499 IPC defines defamation as whoever, by words spoken or intended to be read, makes or publishes any imputation concerning any person.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Criminal conspiracy is defined under which section of IPC?",
        "type": "mcq",
        "opts": ["Section 34", "Section 107", "Section 120A", "Section 120B"],
        "ans": "Section 120A",
        "expl": "Section 120A defines criminal conspiracy as an agreement between two or more persons to do an illegal act.",
        "diff": "medium", "bloom": "remember"
    },
    {
        "q": "Section 34 IPC deals with:",
        "type": "mcq",
        "opts": ["Abetment", "Criminal conspiracy", "Acts done by several persons in furtherance of common intention", "Criminal breach of trust"],
        "ans": "Acts done by several persons in furtherance of common intention",
        "expl": "Section 34 states that when a criminal act is done by several persons in furtherance of common intention, each is liable as if done alone.",
        "diff": "medium", "bloom": "understand"
    },
    {
        "q": "The offence of rape is covered under Section:",
        "type": "mcq",
        "opts": ["Section 354", "Section 375 and 376", "Section 509", "Section 498A"],
        "ans": "Section 375 and 376",
        "expl": "Section 375 defines rape and Section 376 prescribes punishment for rape. The definition was expanded by the Criminal Law (Amendment) Act, 2013.",
        "diff": "easy", "bloom": "remember"
    },
]

_STANDARD_TORTS = [
    {
        "q": "The word 'Tort' is derived from the Latin word:",
        "type": "mcq",
        "opts": ["Tortus", "Tortum", "Tortis", "Torta"],
        "ans": "Tortum",
        "expl": "Tort comes from the Latin word 'tortum' meaning twisted or crooked, as opposed to 'rectum' (straight).",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Which maxim means 'where there is consent, there is no injury'?",
        "type": "mcq",
        "opts": ["Actus non facit reum", "Volenti non fit injuria", "Res ipsa loquitur", "Ex turpi causa"],
        "ans": "Volenti non fit injuria",
        "expl": "Volenti non fit injuria means a willing person cannot claim injury. If someone voluntarily accepts a risk, they cannot later claim damages.",
        "diff": "medium", "bloom": "remember"
    },
    {
        "q": "The essential elements of negligence are:",
        "type": "mcq",
        "opts": ["Duty of care only", "Breach of duty only", "Duty, breach, causation, and damages", "Damages only"],
        "ans": "Duty, breach, causation, and damages",
        "expl": "Negligence requires: (1) Duty of care, (2) Breach of duty, (3) Causation (the breach caused harm), and (4) Actual damages.",
        "diff": "medium", "bloom": "understand"
    },
    {
        "q": "Libel differs from slander in that libel is:",
        "type": "mcq",
        "opts": ["Spoken defamation", "Written or published defamation", "A civil wrong only", "Not actionable per se"],
        "ans": "Written or published defamation",
        "expl": "Libel is defamation in permanent form (written, printed, pictorial). Slander is defamation in transient form (spoken, gestures). Libel is actionable per se.",
        "diff": "medium", "bloom": "understand"
    },
    {
        "q": "Defamation under Section 499 IPC requires:",
        "type": "mcq",
        "opts": ["Only written words", "Imputation tending to harm reputation with intent or knowledge", "Physical contact", "Financial loss"],
        "ans": "Imputation tending to harm reputation with intent or knowledge",
        "expl": "Section 499 requires an imputation concerning a person, made with intent or knowledge to harm their reputation.",
        "diff": "medium", "bloom": "understand"
    },
    {
        "q": "The remedy available in tort law primarily is:",
        "type": "mcq",
        "opts": ["Specific performance", "Damages (compensation)", "Imprisonment", "Death penalty"],
        "ans": "Damages (compensation)",
        "expl": "Damages (monetary compensation) are the primary remedy in tort law. Other remedies include injunctions and specific restitution of property.",
        "diff": "easy", "bloom": "understand"
    },
    {
        "q": "The maxim 'Res Ipsa Loquitur' means:",
        "type": "mcq",
        "opts": ["Let the good deed speak", "Let the principal answer", "The thing speaks for itself", "No one is above the law"],
        "ans": "The thing speaks for itself",
        "expl": "Res ipsa loquitur is a rule of evidence where the very occurrence of an accident implies negligence, shifting the burden of proof to the defendant.",
        "diff": "medium", "bloom": "understand"
    },
]

_STANDARD_COMMERCIAL = [
    {
        "q": "The essential elements of a valid contract include all EXCEPT:",
        "type": "mcq",
        "opts": ["Offer and acceptance", "Lawful consideration", "Free consent", "Written form only"],
        "ans": "Written form only",
        "expl": "A contract may be oral or written except where the law specifically requires writing (e.g., sale of immovable property). Free consent, offer/acceptance, and lawful consideration are essential.",
        "diff": "medium", "bloom": "analyze"
    },
    {
        "q": "The principle of Caveat Emptor means:",
        "type": "mcq",
        "opts": ["Let the buyer beware", "Let the seller beware", "The buyer is always right", "The seller must disclose all defects"],
        "ans": "Let the buyer beware",
        "expl": "Caveat Emptor (let the buyer beware) means the buyer must examine the goods before purchase. The seller is not obligated to disclose defects.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Under the Consumer Protection Act, 2019, a 'consumer' includes:",
        "type": "mcq",
        "opts": ["Only a person who buys goods", "Any person who buys goods or hires services for consideration", "Only a person with a written receipt", "Businesses purchasing goods"],
        "ans": "Any person who buys goods or hires services for consideration",
        "expl": "The CPA 2019 defines consumer broadly to include any person who buys goods or hires services for consideration, whether online or offline.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Which of the following rights is NOT included in the Consumer Protection Act?",
        "type": "mcq",
        "opts": ["Right to safety", "Right to be informed", "Right to exploit", "Right to choose"],
        "ans": "Right to exploit",
        "expl": "The Consumer Protection Act provides six rights: safety, information, choice, representation, redressal, and consumer education. There is no 'right to exploit'.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The Sale of Goods Act, 1930 applies to which type of transactions?",
        "type": "mcq",
        "opts": ["Transfer of immovable property", "Transfer of movable property for a price", "Transfer of services only", "Transfer of intellectual property"],
        "ans": "Transfer of movable property for a price",
        "expl": "The Sale of Goods Act, 1930 applies to contracts where property in movable goods is transferred from seller to buyer for a price.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Goodwill of a business is:",
        "type": "mcq",
        "opts": ["Physical asset", "Intangible asset representing reputation", "Current liability", "Revenue"],
        "ans": "Intangible asset representing reputation",
        "expl": "Goodwill is an intangible asset representing the reputation, customer base, and brand value of a business.",
        "diff": "medium", "bloom": "understand"
    },
]

_STANDARD_IP = [
    {
        "q": "The duration of copyright protection for literary works in India is:",
        "type": "mcq",
        "opts": ["25 years from publication", "50 years from the death of the author", "Life of the author plus 60 years", "Perpetual"],
        "ans": "Life of the author plus 60 years",
        "expl": "Under the Copyright Act, 1957, copyright subsists for the life of the author plus 60 years from the year following the author's death.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "A patent in India is granted for a term of:",
        "type": "mcq",
        "opts": ["10 years from filing", "20 years from the date of filing", "15 years from grant", "25 years from publication"],
        "ans": "20 years from the date of filing",
        "expl": "Under the Patents Act, 1970, a patent is granted for 20 years from the date of filing the patent application.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The Trade Marks Act, 1999 replaced which earlier Act?",
        "type": "mcq",
        "opts": ["Trade and Merchandise Marks Act, 1958", "Patents Act, 1970", "Designs Act, 1911", "Copyright Act, 1957"],
        "ans": "Trade and Merchandise Marks Act, 1958",
        "expl": "The Trade Marks Act, 1999 replaced the Trade and Merchandise Marks Act, 1958 to comply with TRIPS Agreement requirements.",
        "diff": "medium", "bloom": "remember"
    },
    {
        "q": "A Geographical Indication (GI) tag indicates that:",
        "type": "mcq",
        "opts": ["A product originates from a specific geographical region", "A product is patented", "A product has a registered trademark", "A product is globally popular"],
        "ans": "A product originates from a specific geographical region",
        "expl": "A GI tag indicates that a product possesses qualities, reputation, or characteristics attributable to its geographical origin (e.g., Darjeeling Tea, Mysore Silk).",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Under which Act is the protection of GI tags in India governed?",
        "type": "mcq",
        "opts": ["Copyright Act, 1957", "Patents Act, 1970", "Geographical Indications of Goods (Registration and Protection) Act, 1999", "Trade Marks Act, 1999"],
        "ans": "Geographical Indications of Goods (Registration and Protection) Act, 1999",
        "expl": "GI tags in India are registered and protected under the Geographical Indications of Goods (Registration and Protection) Act, 1999.",
        "diff": "easy", "bloom": "remember"
    },
]

_STANDARD_IT = [
    {
        "q": "The Information Technology Act, 2000 came into force on:",
        "type": "mcq",
        "opts": ["15th August, 2000", "17th October, 2000", "26th January, 2000", "1st January, 2001"],
        "ans": "17th October, 2000",
        "expl": "The IT Act, 2000 came into force on 17th October, 2000. It was amended by the IT (Amendment) Act, 2008.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Section 43A of the IT Act deals with:",
        "type": "mcq",
        "opts": ["Hacking", "Penalty for compensation for failure to protect data", "Cyber terrorism", "Digital signature"],
        "ans": "Penalty for compensation for failure to protect data",
        "expl": "Section 43A provides for compensation if a body corporate is negligent in maintaining and protecting sensitive personal data.",
        "diff": "medium", "bloom": "remember"
    },
    {
        "q": "Hacking under the IT Act is covered under:",
        "type": "mcq",
        "opts": ["Section 65", "Section 66", "Section 67", "Section 43"],
        "ans": "Section 66",
        "expl": "Section 66 of the IT Act deals with hacking with the intention to cause wrongful loss or damage, punishable with imprisonment up to 3 years or fine up to Rs 5 lakh.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "A 'Digital Signature Certificate' is issued by a:",
        "type": "mcq",
        "opts": ["Bank", "Certifying Authority", "Government", "Notary"],
        "ans": "Certifying Authority",
        "expl": "A Certifying Authority (CA) is a trusted entity authorized under the IT Act to issue Digital Signature Certificates.",
        "diff": "easy", "bloom": "remember"
    },
]

_STANDARD_LEGAL_PROF = [
    {
        "q": "The Advocates Act, 1961 is administered by:",
        "type": "mcq",
        "opts": ["Supreme Court", "Bar Council of India", "Ministry of Law", "High Courts"],
        "ans": "Bar Council of India",
        "expl": "The Bar Council of India (BCI) is the regulatory body for the legal profession in India, established under the Advocates Act, 1961.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The minimum age for enrollment as an advocate in India is:",
        "type": "mcq",
        "opts": ["18 years", "21 years", "25 years", "30 years"],
        "ans": "21 years",
        "expl": "A person is eligible for enrollment as an advocate if they have completed 21 years of age and possess a law degree from a recognized university.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "The first Law Commission of independent India was constituted in:",
        "type": "mcq",
        "opts": ["1950", "1955", "1961", "1971"],
        "ans": "1955",
        "expl": "The first Law Commission of independent India was constituted in 1955. It is an advisory body that recommends law reforms.",
        "diff": "medium", "bloom": "remember"
    },
]

_STANDARD_INTERNATIONAL = [
    {
        "q": "The International Court of Justice (ICJ) is located in:",
        "type": "mcq",
        "opts": ["Geneva", "New York", "The Hague", "Paris"],
        "ans": "The Hague",
        "expl": "The International Court of Justice is located at the Peace Palace in The Hague, Netherlands.",
        "diff": "easy", "bloom": "remember"
    },
    {
        "q": "Which of the following is NOT a source of International Law?",
        "type": "mcq",
        "opts": ["International conventions", "Customary international law", "Domestic legislation of India", "General principles of law recognized by civilized nations"],
        "ans": "Domestic legislation of India",
        "expl": "Article 38(1) of the ICJ Statute lists sources: international conventions, customary law, general principles, judicial decisions, and teachings. Domestic legislation is not a source.",
        "diff": "medium", "bloom": "analyze"
    },
    {
        "q": "The United Nations Charter was signed on:",
        "type": "mcq",
        "opts": ["24th October, 1945", "26th June, 1945", "10th December, 1948", "15th August, 1947"],
        "ans": "26th June, 1945",
        "expl": "The UN Charter was signed on 26th June, 1945 in San Francisco, and came into force on 24th October, 1945.",
        "diff": "easy", "bloom": "remember"
    },
]

# ============================================================
# COMPETENCY QUESTION GENERATORS
# ============================================================

def _comp_jud_001(r, idx):
    """Competency: Determining appropriate court for filing a case."""
    name = r.choice(NAMES_M)
    amount = r.choice([150000, 250000, 350000, 500000, 750000, 1000000])
    place = r.choice(PLACES)
    victim = r.choice(NAMES_F)
    
    q_text = (
        f"{name}, a resident of {place}, was involved in a motor vehicle accident that caused "
        f"injury to {victim}. The estimated compensation claimed is Rs {amount}. "
        f"Additionally, {name} has a claim against the State Government for a violation of his "
        f"Fundamental Right to Life under Article 21. "
        f"Analyze and answer the following:\n"
        f"(a) Which court has original jurisdiction to hear the motor accident claim?\n"
        f"(b) Which writ should {name} file for the Fundamental Rights violation?\n"
        f"(c) Under which Article of the Constitution can the Supreme Court be approached directly for the Fundamental Rights case?"
    )
    answer = (
        "(a) The Motor Accident Claims Tribunal (MACT) under the Motor Vehicles Act, 1988 "
        "has jurisdiction over compensation claims from motor accidents.\n"
        "(b) A Writ Petition under Article 32 (in Supreme Court) or Article 226 (in High Court) "
        "should be filed for Fundamental Rights violation.\n"
        "(c) Article 32 of the Constitution allows direct approach to the Supreme Court for "
        "enforcement of Fundamental Rights."
    )
    explanation = (
        "This question tests multi-step legal reasoning: (1) Identifying the correct forum "
        "for tort-based claims (MACT), (2) Understanding writ jurisdiction for constitutional "
        "remedies, and (3) Differentiating between Article 32 (Supreme Court) and Article 226 (High Court). "
        "The compensation amount determines the pecuniary jurisdiction of civil courts vs. tribunals."
    )
    steps = [
        "Step 1: Identify the nature of the first claim - motor accident compensation falls under tort law and the Motor Vehicles Act",
        "Step 2: Determine that MACT (Motor Accident Claims Tribunal) has jurisdiction over motor accident compensation claims",
        "Step 3: Identify that violation of Article 21 (Right to Life) requires a constitutional remedy through writ jurisdiction",
        "Step 4: Recognize that Article 32 provides direct access to the Supreme Court for Fundamental Rights enforcement",
        "Step 5: Confirm that Article 32 is the correct answer as it allows direct Supreme Court access"
    ]
    verification = (
        "Verification: Article 32 is the correct constitutional provision. Dr. B.R. Ambedkar called it "
        "'the very soul of the Constitution.' MACT jurisdiction is established under Section 166 of the Motor Vehicles Act, 1988."
    )
    return _q(
        f"c12_jud_comp_{idx:03d}", "short_answer", q_text, None, answer,
        explanation, "hard", "Judiciary - Writ Jurisdiction and Court Structure",
        "analyze", True, steps, verification
    )

def _comp_jud_002(r, idx):
    """Competency: PIL scenario analysis."""
    ngo_name = r.choice(["Helping Hands", "Citizens Voice", "Justice Foundation", "Rights Awareness Group"])
    issue = r.choice(["environmental pollution in", "right to education in", "access to healthcare in",
                      "child labor in", "prison conditions in"])
    place = r.choice(PLACES)
    govt_body = r.choice(["Municipal Corporation", "State Government", "Central Government", "District Administration"])
    
    q_text = (
        f"The NGO '{ngo_name}' has filed a Public Interest Litigation in the Supreme Court "
        f"alleging that the {govt_body} of {place} has failed to address {issue} {place}. "
        f"The NGO is not directly affected by the issue but represents the interests of affected citizens. "
        f"Answer the following:\n"
        f"(a) Can the NGO maintain the PIL? Explain with reference to the concept of locus standi.\n"
        f"(b) Which landmark case relaxed the rule of locus standi for PILs in India?\n"
        f"(c) What is the significance of PIL in the Indian legal system?"
    )
    answer = (
        "(a) Yes, the NGO can maintain the PIL. In PIL cases, the traditional rule of locus standi "
        "(that only the aggrieved party can approach the court) has been relaxed. Under the judicial "
        "activism pioneered by Justice P.N. Bhagwati, any public-spirited individual or organization "
        "can approach the court on behalf of those who cannot do so themselves.\n"
        f"(b) The landmark case is Hussainara Khatoon v. State of Bihar (1979) or SP Gupta v. Union of India (1981), "
        "where Justice Bhagwati relaxed the rules of locus standi.\n"
        "(c) PIL has democratized access to justice, enabled judicial activism, protected the rights of "
        "marginalized sections, and ensured accountability of public authorities."
    )
    explanation = (
        "This is a multi-step competency question requiring understanding of locus standi relaxation, "
        "landmark PIL cases, and the role of PIL in Indian constitutional law. It connects theoretical "
        "knowledge to a realistic scenario involving an NGO."
    )
    steps = [
        "Step 1: Define locus standi - the traditional rule requiring the applicant to be directly affected",
        "Step 2: Identify the PIL relaxation: under judicial activism, public-spirited individuals/NGOs can file PILs",
        "Step 3: Recall landmark cases: Hussainara Khatoon v. State of Bihar (1979) or SP Gupta v. Union of India (1981)",
        "Step 4: List the significance: access to justice for marginalized, judicial oversight of executive, public accountability",
        "Step 5: Apply these principles to the given scenario"
    ]
    verification = (
        "Verification: In Bandhua Mukti Morcha v. Union of India (1984), the Supreme Court held that "
        "any bona fide public-spirited citizen can move the court for enforcement of the rights of "
        "the disadvantaged sections who cannot themselves approach the court."
    )
    return _q(
        f"c12_jud_comp_{idx:03d}", "long_answer", q_text, None, answer,
        explanation, "hard", "Judiciary - Public Interest Litigation",
        "evaluate", True, steps, verification
    )

def _comp_adr_001(r, idx):
    """Competency: Selecting appropriate ADR method for a commercial dispute."""
    company_a = r.choice(["TechVision Pvt. Ltd.", "GreenEnergy Solutions", "BuildRight Constructions",
                          "MediCare Pharmaceuticals", "AgriGrow Exports"])
    company_b = r.choice(["DataFlow Systems", "SolarPower India", "StructoBuild Engineers",
                          "HealthFirst Biotech", "FoodGrain Traders"])
    dispute_type = r.choice(["breach of software delivery contract", "delay in raw material supply",
                             "non-payment of dues", "defective product quality",
                             "disagreement over intellectual property ownership"])
    amount = r.choice([500000, 1000000, 2000000, 3500000, 5000000])
    
    q_text = (
        f"{company_a} and {company_b}, both based in {r.choice(PLACES)}, entered into a commercial "
        f"contract for {dispute_type}. The contract value is Rs {amount}. "
        f"{company_a} alleges {company_b} has failed to perform its obligations. "
        f"The contract contains an arbitration clause. "
        f"Answer the following:\n"
        f"(a) Why is arbitration the most suitable ADR method for this dispute?\n"
        f"(b) What is the legal validity of the arbitration clause in the contract?\n"
        f"(c) If the parties cannot agree on an arbitrator, how will one be appointed?"
    )
    answer = (
        "(a) Arbitration is most suitable because: (1) It is confidential - commercial disputes "
        "involving sensitive information benefit from privacy; (2) The parties have already agreed "
        f"to it in the contract; (3) It results in a binding award enforceable as a court decree; "
        "(4) It is faster and more specialized than court litigation for commercial matters.\n"
        "(b) The arbitration clause is legally valid and binding under Section 7 of the "
        "Arbitration and Conciliation Act, 1996. An arbitration agreement can be in the form of "
        "a clause in a contract or a separate agreement.\n"
        "(c) If the parties cannot agree, the arbitrator will be appointed by the Chief Justice of "
        "the High Court (or the Supreme Court for international commercial arbitration) under Section 11."
    )
    explanation = (
        "This multi-step question tests understanding of ADR selection criteria, validity of arbitration "
        "agreements, and the appointment mechanism under the Arbitration and Conciliation Act, 1996. "
        "It applies legal knowledge to a realistic commercial scenario."
    )
    steps = [
        "Step 1: Identify that the dispute is commercial and the contract has an arbitration clause",
        "Step 2: Explain why arbitration is suitable: confidentiality, party autonomy, enforceability, speed",
        "Step 3: Establish legal validity under Section 7 of the Arbitration and Conciliation Act, 1996",
        "Step 4: Describe the appointment process under Section 11 when parties cannot agree",
        "Step 5: Note that the award is binding and enforceable as a court decree under Section 36"
    ]
    verification = (
        "Verification: Section 7 defines arbitration agreement. Section 11 provides for appointment of "
        "arbitrators. Section 36 makes the award binding. These provisions validate the entire analysis."
    )
    return _q(
        f"c12_adr_comp_{idx:03d}", "long_answer", q_text, None, answer,
        explanation, "hard", "ADR - Arbitration",
        "apply", True, steps, verification
    )

def _comp_adr_002(r, idx):
    """Competency: Lok Adalat settlement scenario."""
    plaintiff = r.choice(NAMES_M)
    defendant = r.choice(NAMES_M)
    claim_type = r.choice(["motor accident compensation", "bank recovery", "labour dispute",
                           "matrimonial dispute", "property dispute"])
    claim_amount = r.choice([200000, 400000, 600000, 800000, 1000000])
    offered = claim_amount * r.choice([60, 70, 75, 80, 85]) // 100
    
    q_text = (
        f"In a Lok Adalat held in {r.choice(PLACES)}, {plaintiff} had filed a claim for Rs {claim_amount} "
        f"against {defendant} regarding {claim_type}. The Lok Adalat members proposed a settlement "
        f"amount of Rs {offered}. {defendant} agreed but {plaintiff} is dissatisfied. "
        f"Answer the following:\n"
        f"(a) What is the legal status of the Lok Adalat's settlement award?\n"
        f"(b) Can {plaintiff} challenge the settlement in a regular court? Why or why not?\n"
        f"(c) Under which Act are Lok Adalats constituted?"
    )
    answer = (
        f"(a) The Lok Adalat settlement is deemed to be a civil court decree under Section 21 of the "
        "Legal Services Authorities Act, 1987. It is final and binding on all parties.\n"
        "(b) No, the plaintiff cannot challenge the settlement in a regular court once both parties "
        "have agreed. The award is final and not appealable, as per Section 21. The only recourse "
        "would have been to not agree to the settlement in the first place.\n"
        "(c) Lok Adalats are constituted under the Legal Services Authorities Act, 1987."
    )
    explanation = (
        "This question requires applying knowledge of the finality of Lok Adalat awards, understanding "
        "the statutory framework, and analyzing the consequences of accepting/rejecting a settlement offer. "
        "It connects the ADR mechanism with real dispute resolution."
    )
    steps = [
        "Step 1: Identify the governing statute - Legal Services Authorities Act, 1987",
        "Step 2: Section 21 states that Lok Adalat awards are deemed civil court decrees",
        "Step 3: Such awards are final and binding and not appealable under any court",
        "Step 4: Once both parties agree to settlement, it becomes final - no subsequent challenge is possible",
        "Step 5: The only alternative was to not agree, which would mean the case is referred back to the original court"
    ]
    verification = (
        "Verification: Section 21 of the Legal Services Authorities Act, 1987 explicitly states that "
        "every award of Lok Adalat shall be final and binding on all parties. No appeal lies to any court."
    )
    return _q(
        f"c12_adr_comp_{idx:03d}", "short_answer", q_text, None, answer,
        explanation, "medium", "ADR - Lok Adalat",
        "analyze", True, steps, verification
    )

def _comp_hr_001(r, idx):
    """Competency: Human rights violation complaint pathway."""
    complainant = r.choice(NAMES_F)
    violator = r.choice(["Employer", "Landlord", "Police Officer", "Government Official", "School Principal"])
    violation = r.choice(["denied maternity leave", "evicted without due process",
                          "subjected to custodial torture", "denied access to public facility",
                          "dismissed from school based on caste"])
    place = r.choice(PLACES)
    
    q_text = (
        f"{complainant}, a resident of {place}, alleges that her {violator} has {violation}, "
        f"violating her Fundamental Rights under the Indian Constitution. "
        f"Analyze the appropriate legal remedy:\n"
        f"(a) Which Fundamental Right(s) have been violated?\n"
        f"(b) What is the procedure for filing a complaint with the State Human Rights Commission?\n"
        f"(c) Can the complaint also be filed directly with the NHRC? Under what circumstances?"
    )
    answer = (
        f"(a) Multiple rights may be violated depending on the act: Article 14 (Equality before law), "
        "Article 15 (Prohibition of discrimination), Article 19 (Freedom of movement and residence), "
        "Article 21 (Right to life and personal liberty), or Article 23 (Prohibition of traffic in human beings). "
        f"In this case of {violation} by {violator}, Article 21 and relevant anti-discrimination articles apply.\n"
        "(b) The complaint can be filed with the State Human Rights Commission by submitting a written "
        "complaint to the Commission. There is no fee, and the complaint can be filed in any language. "
        "The Commission can inquire into violations of human rights.\n"
        "(c) Yes, the complaint can be filed with NHRC directly if: (1) the violation involves human rights "
        "by a public servant, or (2) if there is negligence by the government in preventing such violations."
    )
    explanation = (
        "This competency question requires identifying applicable constitutional provisions, understanding "
        "the complaint mechanism under the Protection of Human Rights Act, 1993, and distinguishing "
        "between State and National Human Rights Commission jurisdiction."
    )
    steps = [
        "Step 1: Identify the violated Fundamental Right(s) based on the type of violation",
        "Step 2: Determine that Article 21 (life and liberty) is most commonly invoked in HR complaints",
        "Step 3: Recall the procedure under Section 14 of the Protection of Human Rights Act, 1993",
        "Step 4: No fee is required; complaint can be oral or written; can be filed in any language",
        "Step 5: Determine NHRC jurisdiction: applies when public servant is involved or government negligence"
    ]
    verification = (
        "Verification: Section 12(d) of the PHRA, 1993 empowers NHRC to inquire into violations "
        "involving public servants. Section 14 specifies the complaint procedure. The NHRC can take "
        "suo motu action or receive complaints from any person."
    )
    return _q(
        f"c12_hr_comp_{idx:03d}", "long_answer", q_text, None, answer,
        explanation, "hard", "Human Rights - NHRC and Complaint Mechanism",
        "apply", True, steps, verification
    )

def _comp_hr_002(r, idx):
    """Competency: Assertion-Reasoning on Fundamental Rights."""
    return _q(
        f"c12_hr_ar_{idx:03d}", "assertion_reason",
        "Assertion (A): The Right to Information Act, 2005 is an extension of the Fundamental Right to Freedom of Speech and Expression.\n"
        "Reason (R): The RTI Act enables citizens to access information held by public authorities, thereby promoting transparency and accountability in governance.\n\n"
        "Select the correct option:\n"
        "(A) Both A and R are true and R is the correct explanation of A\n"
        "(B) Both A and R are true but R is NOT the correct explanation of A\n"
        "(C) A is true but R is false\n"
        "(D) A is false but R is true",
        ["(A) Both A and R are true and R is the correct explanation of A",
         "(B) Both A and R are true but R is NOT the correct explanation of A",
         "(C) A is true but R is false",
         "(D) A is false but R is true"],
        "(A) Both A and R are true and R is the correct explanation of A",
        "Article 19(1)(a) guarantees freedom of speech and expression. The RTI Act, 2005 operationalizes this right by enabling access to government information. Transparency and accountability in governance are direct outcomes of this linkage.",
        "medium", "Human Rights - RTI and Fundamental Rights",
        "evaluate", True,
        [
            "Step 1: Evaluate Assertion A - RTI is indeed linked to Article 19(1)(a) freedom of speech and expression",
            "Step 2: Evaluate Reason R - RTI does enable access to information, promoting transparency",
            "Step 3: Verify that R correctly explains A - access to information is the mechanism through which freedom of expression is enhanced",
            "Step 4: The Supreme Court has recognized RTI as part of Article 19(1)(a)",
            "Step 5: Therefore, option (A) is correct"
        ],
        "Verification: In State of Rajasthan v. Union of India, the Supreme Court held that RTI is integral to Article 19(1)(a). Both assertion and reason are true and R explains A."
    )

def _comp_cr_001(r, idx):
    """Competency: IPC section determination from scenario."""
    accused = r.choice(NAMES_M)
    victim = r.choice(NAMES_F)
    act = r.choice(["pushed the victim causing her to fall and fracture her arm",
                    "threatened to kill the victim with a knife if she filed a complaint",
                    "secretly photographed the victim while she was changing clothes",
                    "entered the victim's house without permission to steal her jewelry",
                    "made false accusations against the victim damaging her reputation in the neighborhood"])
    place = r.choice(PLACES)
    
    act_map = {
        "pushed the victim causing her to fall and fracture her arm": ("Section 323 (voluntarily causing hurt) or Section 325 (grievous hurt)", "Voluntarily causing hurt requires intention or knowledge to cause hurt. Fracture constitutes grievous hurt under Section 320."),
        "threatened to kill the victim with a knife if she filed a complaint": ("Section 506 (criminal intimidation)", "Criminal intimidation involves threatening injury to person, reputation, or property with intent to cause alarm."),
        "secretly photographed the victim while she was changing clothes": ("Section 354C (voyeurism) or Section 509", "This constitutes invasion of privacy and outraging modesty. Post-2013 amendment, voyeurism is specifically covered under Section 354C."),
        "entered the victim's house without permission to steal her jewelry": ("Section 441 (criminal trespass) read with Section 378/379 (theft)", "Criminal trespass is entering property without permission with intent to commit an offence. Theft involves dishonest intention to take property."),
        "made false accusations against the victim damaging her reputation in the neighborhood": ("Section 499 (defamation)", "Defamation involves making/publishing an imputation concerning a person with intent to harm reputation. Truth must be proved for defence under First Exception."),
    }
    
    correct_section, reason_expl = act_map[act]
    
    q_text = (
        f"On {r.choice(['15th March', '22nd July', '3rd November', '9th January', '27th May'])} in {place}, "
        f"{accused} {act}. {victim} has filed a police complaint. "
        f"As a legal advisor, analyze:\n"
        f"(a) Identify the most appropriate IPC section(s) applicable to {accused}'s act.\n"
        f"(b) Explain the key elements of the offence that make this section applicable.\n"
        f"(c) Is the offence compoundable or non-compoundable? What does this mean?"
    )
    answer = (
        f"(a) The most appropriate IPC section is {correct_section}.\n"
        f"(b) {reason_expl}\n"
        f"(c) {'Section 323/325 is compoundable' if 'hurt' in act else 'Section 506 is non-compoundable' if 'threatened' in act else 'Section 499 is compoundable' if 'false' in act else 'Section 354C is non-compoundable' if 'photographed' in act else 'Section 441/379 is non-compoundable'}. "
        "A compoundable offence can be settled between parties with court permission. A non-compoundable offence cannot be settled and must be prosecuted by the State."
    )
    explanation = (
        "This question tests the ability to apply IPC provisions to factual scenarios, identify correct "
        "sections, explain legal elements, and understand procedural aspects (compoundable vs non-compoundable)."
    )
    steps = [
        "Step 1: Analyze the act described in the scenario and identify the criminal elements",
        f"Step 2: Map the act to the appropriate IPC section(s): {correct_section}",
        "Step 3: Identify the essential legal elements required for the offence",
        "Step 4: Determine if the offence is compoundable (Schedule of CrPC) or non-compoundable",
        "Step 5: Explain the procedural significance of compoundability"
    ]
    verification = (
        f"Verification: {correct_section} IPC covers the described act. The offence classification "
        "as compoundable/non-compoundable is determined by the Second Schedule of CrPC, 1973."
    )
    return _q(
        f"c12_cr_comp_{idx:03d}", "case_study", q_text, None, answer,
        explanation, "hard", "Law of Crimes - IPC Sections",
        "apply", True, steps, verification
    )

def _comp_tort_001(r, idx):
    """Competency: Negligence and compensation calculation."""
    plaintiff = r.choice(NAMES_F)
    defendant = r.choice(["City Municipal Corporation", "Shopping Mall Management",
                          "Restaurant Owner", "Apartment Society", "Hospital Management"])
    scenario = r.choice([
        "slipped on an uncovered manhole on a public road maintained by the municipality",
        "slipped on a wet floor in the shopping mall that had no warning sign",
        "was served food with a foreign object causing severe food poisoning",
        "fell from a broken staircase railing in the apartment building",
        "was given the wrong medication due to a labelling error at the hospital"
    ])
    income = r.choice([15000, 25000, 35000, 45000, 60000])
    months = r.choice([3, 6, 8, 12, 18])
    pain_suffering = r.choice([50000, 100000, 150000, 200000])
    medical_expenses = r.choice([25000, 50000, 75000, 100000, 150000])
    total = income * months + pain_suffering + medical_expenses
    
    q_text = (
        f"On {r.choice(['10th January', '4th June', '19th September', '7th December', '23rd April'])}, "
        f"{plaintiff}, a resident of {r.choice(PLACES)}, {scenario}. "
        f"As a result, {plaintiff} was hospitalized for {r.choice([2, 3, 4, 5, 6])} weeks. "
        f"Her monthly income is Rs {income}. She lost {months} months of work. "
        f"Medical expenses were Rs {medical_expenses}. "
        f"Answer the following:\n"
        f"(a) What must {plaintiff} prove to succeed in a negligence claim?\n"
        f"(b) Calculate the compensation {plaintiff} can claim, categorizing the components.\n"
        f"(c) Does the maxim 'Res Ipsa Loquitur' apply here?"
    )
    answer = (
        "(a) To succeed in negligence, {0} must prove: (1) The defendant owed a duty of care, "
        "(2) The duty was breached, (3) The breach caused the harm (causation), and (4) Actual damages/loss.\n"
        "(b) Compensation calculation:\n"
        f"    - Lost income: Rs {income} x {months} months = Rs {income * months}\n"
        f"    - Pain and suffering: Rs {pain_suffering}\n"
        f"    - Medical expenses: Rs {medical_expenses}\n"
        f"    - Total compensation: Rs {total}\n"
        "(c) Yes, Res Ipsa Loquitur applies because the accident would not ordinarily happen without negligence, "
        "and the instrumentality was under the defendant's control. This shifts the burden of proof to the defendant."
    ).format(plaintiff)
    explanation = (
        "This multi-step question applies tort principles to a factual scenario: proving negligence elements, "
        "calculating compensation components (special and general damages), and applying evidentiary rules."
    )
    steps = [
        f"Step 1: Identify duty of care - the defendant (public authority/commercial entity) owed a duty to maintain safe premises",
        f"Step 2: Establish breach - uncovered manhole/wet floor without warning sign constitutes breach of duty",
        "Step 3: Prove causation - the breach directly caused the plaintiff's injuries",
        f"Step 4: Calculate special damages: Lost income = Rs {income} x {months} = Rs {income * months}",
        f"Step 5: Add general damages: Pain and suffering = Rs {pain_suffering}, Medical expenses = Rs {medical_expenses}",
        f"Step 6: Total compensation = Rs {total}",
        "Step 7: Apply Res Ipsa Loquitur - the accident speaks for itself, shifting burden to defendant"
    ]
    verification = (
        f"Verification: Total compensation Rs {total} comprises special damages (quantifiable financial loss) "
        "and general damages (non-pecuniary loss). The formula follows established tort compensation principles."
    )
    return _q(
        f"c12_to_comp_{idx:03d}", "numerical", q_text, None, f"Rs {total}",
        explanation, "hard", "Law of Torts - Negligence and Damages",
        "apply", True, steps, verification
    )

def _comp_ce_001(r, idx):
    """Competency: Consumer dispute resolution scenario."""
    consumer = r.choice(NAMES_M + NAMES_F)
    product = r.choice(["smartphone", "refrigerator", "laptop", "washing machine", "television"])
    defect = r.choice(["caught fire within warranty period", "display stopped working after 2 months",
                       "developed gas leakage", "made excessive noise beyond specified decibel levels",
                       "screen cracked spontaneously without physical impact"])
    price = r.choice([15000, 25000, 35000, 45000, 65000])
    purchase_date = f"{r.choice(['2024', '2025'])}-{r.randint(1,12):02d}"
    
    q_text = (
        f"{consumer} purchased a {product} on {purchase_date} for Rs {price}. "
        f"Within the warranty period, the {product} {defect}. "
        f"The seller refused to replace or repair the product, stating it is not covered under warranty. "
        f"{consumer} has sent a legal notice to the seller. "
        f"Analyze and answer:\n"
        f"(a) Under which Act can {consumer} file a complaint?\n"
        f"(b) Which consumer forum has jurisdiction given the value of Rs {price}?\n"
        f"(c) What remedies can the consumer forum grant?"
    )
    
    if price <= 1000000:
        forum = "District Commission (formerly District Forum)"
    elif price <= 10000000:
        forum = "State Commission"
    else:
        forum = "National Commission"
    
    answer = (
        "(a) Under the Consumer Protection Act, 2019, {0} can file a complaint.\n"
        "(b) The {1} has jurisdiction for claims up to Rs 1 crore. "
        "Claims above Rs 1 crore go to State Commission, and above Rs 10 crore to National Commission.\n"
        "(c) Remedies include: removal of defect, replacement of goods, refund of price, compensation for "
        "loss or injury, removal of service deficiencies, and punitive damages."
    ).format(consumer, forum)
    explanation = (
        "This question tests understanding of the consumer dispute redressal mechanism under the "
        "Consumer Protection Act, 2019, including forum jurisdiction based on claim value and available remedies."
    )
    steps = [
        f"Step 1: Identify the governing law - Consumer Protection Act, 2019",
        f"Step 2: Determine the claim value - Rs {price}",
        f"Step 3: Apply jurisdiction rules: District Commission (up to Rs 1 crore), State Commission (Rs 1-10 crore), National Commission (above Rs 10 crore)",
        f"Step 4: Since Rs {price} {'exceeds' if price > 1000000 else 'is within'} Rs 1 crore, the {forum} has jurisdiction",
        f"Step 5: List available remedies under Section 39 of the CPA, 2019"
    ]
    verification = (
        f"Verification: For a claim of Rs {price}, the District Commission has jurisdiction (up to Rs 1 crore). "
        "Remedies under Section 39 CPA 2019 include replacement, refund, compensation, and punitive damages."
    )
    return _q(
        f"c12_ce_comp_{idx:03d}", "case_study", q_text, None, answer,
        explanation, "medium", "Commercial Establishments - Consumer Protection",
        "apply", True, steps, verification
    )

def _comp_ip_001(r, idx):
    """Competency: Copyright infringement analysis."""
    author = r.choice(["Meera Publications", "Rahul Scripts Ltd.", "Creative Writers Guild", "Kavita Media"])
    infringer = r.choice(["Online streaming platform", "competing publisher", "educational website",
                          "social media channel", "print media company"])
    work_type = r.choice(["novel", "song lyrics", "cinematographic film", "software code",
                          "photographic work"])
    work_name = r.choice(["The Silent Valley", "Melodies of Life", "City Lights Documentary",
                          "EduLearn App", "Heritage of India Photo Series"])
    
    q_text = (
        f"{author} is the copyright owner of a {work_type} titled '{work_name}'. "
        f"{infringer} has reproduced and distributed substantial portions of this work without "
        f"permission, affecting {author}'s sales and revenue. "
        f"{infringer} claims their use falls under 'fair dealing' for educational purposes. "
        f"Analyze:\n"
        f"(a) What is the duration of copyright protection for this work under Indian law?\n"
        f"(b) Does the 'fair dealing' defence apply? What are the criteria for fair dealing?\n"
        f"(c) What civil and criminal remedies are available to the copyright owner?"
    )
    answer = (
        "(a) Under the Copyright Act, 1957, copyright lasts for the life of the author plus 60 years. "
        "For cinematographic films and photographs, it is 60 years from publication.\n"
        "(b) Fair dealing defence under Section 52 of the Copyright Act applies only for: "
        "private or personal use, research, education (with limitations), criticism or review, "
        "and reporting of current events. Commercial use by an online platform for revenue generation "
        "would not qualify. The amount and substantiality of the portion used would be examined.\n"
        "(c) Civil remedies: injunction, damages, and account of profits (Section 55). "
        "Criminal remedies: imprisonment up to 3 years and/or fine up to Rs 3 lakh (Section 63)."
    )
    explanation = (
        "This question requires multi-step reasoning about copyright law: duration of protection, "
        "fair dealing exceptions, and available remedies. It tests understanding of the balance between "
        "creator rights and public access."
    )
    steps = [
        "Step 1: Determine copyright duration: life of author + 60 years for literary/dramatic/musical/artistic works",
        "Step 2: 60 years from publication for cinematographic films and photographs",
        "Step 3: Analyze fair dealing defence under Section 52 - limited to personal, research, educational, critical use",
        "Step 4: Commercial use by an online platform is unlikely to qualify for fair dealing",
        "Step 5: Civil remedies: injunction + damages + account of profits (Section 55)",
        "Step 6: Criminal remedies: imprisonment up to 3 years + fine up to Rs 3 lakh (Section 63)"
    ]
    verification = (
        "Verification: Section 22 (duration), Section 52 (fair dealing), Section 55 (civil remedies), "
        "Section 63 (criminal remedies) of the Copyright Act, 1957 validate the complete analysis."
    )
    return _q(
        f"c12_ip_comp_{idx:03d}", "long_answer", q_text, None, answer,
        explanation, "hard", "Intellectual Property - Copyright Law",
        "evaluate", True, steps, verification
    )

def _comp_it_001(r, idx):
    """Competency: Cyber crime scenario."""
    victim = r.choice(NAMES_F)
    scam_type = r.choice(["received a phishing email pretending to be from her bank asking for OTP",
                          "had her social media account hacked and obscene messages sent to contacts",
                          "was cheated in an online shopping transaction where goods were never delivered",
                          "received threatening messages on WhatsApp from an unknown number",
                          "had her credit card details stolen in an online transaction"])
    loss_amount = r.choice([25000, 50000, 100000, 150000, 250000])
    platform = r.choice(["Facebook", "Instagram", "WhatsApp", "email", "an e-commerce website"])
    
    q_text = (
        f"{victim}, a resident of {r.choice(PLACES)}, {scam_type}. "
        f"She suffered a financial loss of approximately Rs {loss_amount}. "
        f"The incident occurred on {platform}. "
        f"Analyze the situation:\n"
        f"(a) Under which section(s) of the IT Act, 2000 (as amended in 2008) can the perpetrator be prosecuted?\n"
        f"(b) What immediate steps should {victim} take legally?\n"
        f"(c) What is the role of the cyber cell in handling such cases?"
    )
    answer = (
        "(a) Applicable sections:\n"
        "    - Section 66D (cheating by personation using computer resource) - for online fraud\n"
        "    - Section 43/43A (penalty for unauthorized access/damage to computer system)\n"
        "    - If obscene content was shared: Section 67 (publishing/transmitting obscene material)\n"
        "    - If threatening messages: Section 506 IPC (criminal intimidation)\n"
        "(b) Immediate legal steps:\n"
        "    - File a complaint with the local cyber crime police station or at cybercrime.gov.in\n"
        f"    - Preserve all evidence (screenshots, emails, transaction records)\n"
        "    - Inform the bank to freeze transactions if card details were compromised\n"
        "    - File an FIR under relevant IPC and IT Act sections\n"
        "(c) The cyber cell: investigates digital evidence, traces IP addresses, freezes fraudulent accounts, "
        "coordinates with international agencies if the perpetrator is abroad, and ensures digital evidence is "
        "collected in a forensically sound manner."
    )
    explanation = (
        "This competency question applies IT law provisions to a realistic cyber crime scenario, "
        "requiring identification of applicable sections, procedural steps, and understanding the "
        "investigative role of cyber cells."
    )
    steps = [
        "Step 1: Identify the type of cyber crime (phishing/hacking/fraud/threats)",
        "Step 2: Map to relevant IT Act sections: 66D (cheating by personation), 66 (hacking), 67 (obscene content), 43 (unauthorized access)",
        "Step 3: List immediate legal steps: file complaint, preserve evidence, inform bank",
        "Step 4: Note that complaints can be filed at cybercrime.gov.in or at cyber police stations",
        "Step 5: Describe cyber cell's role: digital forensics, IP tracing, evidence collection"
    ]
    verification = (
        f"Verification: The loss of Rs {loss_amount} exceeds the threshold for serious cyber crime investigation. "
        "Section 66D (punishment up to 3 years + fine up to Rs 1 lakh) applies to cheating by personation using computer resources."
    )
    return _q(
        f"c12_it_comp_{idx:03d}", "case_study", q_text, None,
        "Sections 66D/43 IT Act, 2000; Section 506 IPC; Complaint to Cyber Cell; Evidence preservation",
        explanation, "medium", "IT Law - Cyber Crimes",
        "apply", True, steps, verification
    )

# Additional competency generators for remaining topics
def _comp_tort_002(r, idx):
    """Competency: Defamation in media."""
    journalist = r.choice(["Rajesh", "Anjali", "Vikram", "Priya"])
    newspaper = r.choice(["The Daily Chronicle", "National Herald", "Metro Express", "City Times"])
    subject = r.choice(["businessman", "politician", "doctor", "teacher", "government official"])
    allegation = r.choice(["misappropriation of funds", "nepotism in appointments",
                           "medical negligence leading to patient death", "examination paper leak",
                           "accepting bribes for contracts"])
    
    q_text = (
        f"On {r.choice(['12th February', '8th May', '21st August', '3rd November'])}, "
        f"reporter {journalist} wrote an article in '{newspaper}' alleging that a local {subject} "
        f"was involved in {allegation}. The article was published without verifying the facts. "
        f"The {subject} has filed a defamation suit claiming Rs {r.choice([500000, 1000000, 2000000, 5000000])}. "
        f"Answer:\n"
        f"(a) What are the essential elements of defamation under Section 499 IPC?\n"
        f"(b) What defences can the journalist raise?\n"
        f"(c) Is truth always a defence to defamation? Explain."
    )
    answer = (
        "(a) Elements of defamation under Section 499: (1) An imputation concerning a person, "
        "(2) Made by words (spoken/written/signs/visible representations), (3) With intent or knowledge "
        "to harm the person's reputation, (4) The imputation must be published/communicated to a third party.\n"
        "(b) Defences: (1) Truth/public good (First Exception) - proving the imputation is true and "
        "for public good, (2) Fair comment on public conduct of public servant, (3) Fair report of "
        "court proceedings, (4) Good faith opinion on conduct of public question.\n"
        "(c) No, truth is not always a defence. Under Section 499, truth is a defence ONLY IF it is shown "
        "to be for the public good. Merely proving the statement is true is not enough; the defendant must "
        "also prove it was in public interest (First Exception to Section 499)."
    )
    explanation = (
        "This question tests deep understanding of defamation law, distinguishing between criminal "
        "(IPC Section 499/500) and civil defamation, and understanding the qualified nature of truth as a defence."
    )
    steps = [
        "Step 1: State the four essential elements of Section 499 IPC - imputation, publication, intent/harm, communication to third party",
        "Step 2: Identify that the journalist published an unverified allegation without consent of the subject",
        "Step 3: List available defences: truth (with public good requirement), fair comment, fair report",
        "Step 4: Clarify that under the First Exception to Section 499, truth alone is not a defence unless 'for the public good'",
        "Step 5: Conclude that unless the journalist proves both truth AND public good, the defence fails"
    ]
    verification = (
        "Verification: Section 499 First Exception states: 'Imputation of truth which public good requires to be made or published.' "
        "This creates a dual test: truth AND public good requirement. This was upheld in T.N. Gopalan v. Press Trust."
    )
    return _q(
        f"c12_to_comp_{idx:03d}", "case_study", q_text, None, answer,
        explanation, "hard", "Law of Torts - Defamation",
        "evaluate", True, steps, verification
    )

def _comp_cr_002(r, idx):
    """Competency: Bail and remand analysis."""
    accused = r.choice(NAMES_M)
    offence = r.choice(["theft of Rs 50,000", "criminal trespass with intent to commit robbery",
                        "assault causing grievous hurt", "cheating of Rs 2 lakh",
                        "criminal intimidation with threat to kill"])
    place = r.choice(PLACES)
    
    q_text = (
        f"{accused} has been arrested in {place} for {offence} under the IPC. "
        f"He was produced before the Magistrate within 24 hours of arrest. "
        f"The police have requested 15 days of police remand for further investigation. "
        f"Analyze:\n"
        f"(a) What are the provisions regarding production of arrested persons before a Magistrate?\n"
        f"(b) Under what circumstances can police remand be granted?\n"
        f"(c) Is bail available as a right for {accused}? Discuss the bail provisions under CrPC, 1973."
    )
    answer = (
        "(a) Under Section 57 of CrPC and Article 22(2) of the Constitution, an arrested person must "
        "be produced before a Magistrate within 24 hours of arrest, excluding travel time. This is a "
        "constitutional safeguard against arbitrary detention.\n"
        "(b) Police remand can be granted by the Magistrate if there are reasonable grounds to believe "
        "that examination is necessary for proper investigation (Section 167 CrPC). The Magistrate must "
        "record reasons for granting remand.\n"
        "(c) Bail depends on the nature of the offence: (1) For bailable offences (Section 2(b) CrPC), "
        "bail is a right and can be granted by the police itself. (2) For non-bailable offences "
        "(Section 437/439 CrPC), bail is discretionary. The court considers: gravity of offence, likelihood "
        "of tampering with evidence, and possibility of the accused absconding."
    )
    explanation = (
        "This scenario requires understanding of constitutional safeguards under Article 22, procedural "
        "requirements of CrPC regarding remand, and the nuanced bail provisions. It connects procedural "
        "criminal law to real law enforcement scenarios."
    )
    steps = [
        "Step 1: Identify Article 22(2) Constitutional requirement: production before Magistrate within 24 hours",
        "Step 2: Link to Section 57 CrPC - arrested person cannot be detained beyond 24 hours without Magistrate order",
        "Step 3: Explain Section 167 CrPC - police remand requires Magistrate's order, maximum 15 days in custody",
        "Step 4: Distinguish bailable vs non-bailable offences under Section 2(b) CrPC",
        "Step 5: For non-bailable offences, bail under Section 437 (Magistrate) / 439 (Sessions/High Court) is discretionary",
        "Step 6: List factors: gravity of offence, evidence tampering risk, flight risk"
    ]
    verification = (
        "Verification: Article 22(2) mandates 24-hour production. Section 167 limits custody to 15 days. "
        "Section 437(1) lists grounds for bail in non-bailable cases. Section 2(b) defines bailable offences."
    )
    return _q(
        f"c12_cr_comp_{idx:03d}", "case_study", q_text, None, answer,
        explanation, "hard", "Law of Crimes - Criminal Procedure",
        "analyze", True, steps, verification
    )

def _comp_il_001(r, idx):
    """Competency: International law treaty analysis."""
    country_a = r.choice(["India", "Brazil", "South Africa", "Indonesia"])
    country_b = r.choice(["Australia", "Canada", "Germany", "Japan", "United Kingdom"])
    treaty_topic = r.choice(["double taxation avoidance", "mutual legal assistance in criminal matters",
                             "extradition treaty", "protection of investments",
                             "maritime boundary delimitation"])
    q_text = (
        f"India and {country_b} are parties to negotiations for a {treaty_topic} agreement. "
        f"During the negotiations, {country_b} claims the treaty is invalid due to lack of parliamentary approval. "
        f"Answer:\n"
        f"(a) What are the sources of international law applicable to treaty validity?\n"
        f"(b) What is the doctrine of pacta sunt servanda and how does it apply?\n"
        f"(c) Under Indian law, what is the process for treaty ratification?"
    )
    
    answer = (
        "(a) Sources per Article 38 of ICJ Statute: (1) International conventions/treaties, "
        "(2) International custom, (3) General principles of law, (4) Judicial decisions and teachings. "
        "The Vienna Convention on the Law of Treaties (1969) is the primary treaty on treaty validity.\n"
        "(b) Pacta sunt servanda (agreements must be kept) is a fundamental principle of international law "
        "(Article 26, VCLT). It means treaties in force are binding and must be performed in good faith. "
        "It applies to make the treaty binding on both countries once validly concluded.\n"
        "(c) Under Indian law: The President has the power to make treaties (Article 73 read with Article 253). "
        "Treaties need not be ratified by Parliament unless implementing legislation is needed. The Supreme Court "
        "in Ramjawaya Kapoor v. State of Punjab held that treaties do not require parliamentary approval."
    )
    explanation = (
        "This question tests understanding of sources of international law, treaty law principles, "
        "and the domestic law interface. It requires multi-step analysis of legal frameworks."
    )
    steps = [
        "Step 1: Identify Article 38(1) of ICJ Statute - primary sources of international law",
        "Step 2: Vienna Convention on Law of Treaties, 1969 governs treaty validity (consent, capacity, object)",
        "Step 3: Pacta sunt servanda = Article 26 VCLT - treaties are binding and must be performed in good faith",
        "Step 4: Apply to dispute - treaty validly concluded is binding regardless of domestic objections",
        "Step 5: Indian position: President has treaty-making power (Article 253); Parliament approval not always required"
    ]
    verification = (
        "Verification: VCLT Article 11 defines consent to be bound. Article 24 establishes pacta sunt servanda. "
        "Indian Constitution Article 253 empowers Parliament to implement treaties, but executive conclusion of treaties does not always require parliamentary approval."
    )
    return _q(
        f"c12_il_comp_{idx:03d}", "long_answer", q_text, None, answer,
        explanation, "hard", "International Law - Treaties and Sources",
        "evaluate", True, steps, verification
    )

def _comp_lp_001(r, idx):
    """Competency: Legal profession ethics scenario."""
    lawyer = r.choice(NAMES_M)
    client1 = r.choice(NAMES_M)
    client2 = r.choice(NAMES_F)
    case1 = r.choice(["criminal trial for theft", "divorce proceedings", "property dispute",
                      "corporate merger negotiation", "intellectual property infringement"])
    case2 = r.choice(["the same property dispute but on opposite side", "the same criminal case as prosecution witness",
        "a related family law matter connected to the same divorce", "a commercial contract dispute involving the same company"])
    
    q_text = (
        f"Advocate {lawyer} is representing {client1} in {case1}. "
        f"A new client, {client2}, approaches {lawyer} seeking representation in {case2}. "
        f"Analyze the ethical implications:\n"
        f"(a) What is the rule regarding conflict of interest under the Bar Council of India Rules?\n"
        f"(b) Can {lawyer} accept {client2}'s brief? What are the consequences if he does?\n"
        f"(c) What disciplinary action can the Bar Council of India take?"
    )
    answer = (
        "(a) Under BCI Rules (Chapter II, Part VI), an advocate cannot accept a brief from a client "
        "if there is a conflict of interest with an existing client. Specifically, an advocate shall not "
        "accept a brief in a matter where he has previously appeared for the opposite party.\n"
        "(b) No, {lawyer} cannot accept {client2}'s brief without informed consent from both clients. "
        "Accepting the brief would violate professional ethics. Consequences include: disciplinary proceedings "
        "before the Bar Council, suspension or cancellation of enrollment, and potential civil liability to the affected client.\n"
        "(c) BCI can take: (1) Reprimand, (2) Suspension from practice for a specified period, "
        "(3) Removal of name from the roll of advocates (permanent disbarment)."
    ).format(lawyer=lawyer, client2=client2)
    explanation = (
        "This scenario tests understanding of professional ethics under the Advocates Act, 1961 and BCI Rules, "
        "conflict of interest principles, and disciplinary mechanisms. It applies ethical rules to a realistic scenario."
    )
    steps = [
        "Step 1: Identify the conflict - lawyer already represents client1 and is asked to represent client2 in related/opposite matter",
        "Step 2: Apply BCI Rules - conflict of interest prohibits accepting opposing briefs without informed consent of both clients",
        "Step 3: Evaluate consequences - disciplinary proceedings before the Bar Council of India for professional misconduct",
        "Step 4: List possible disciplinary actions - reprimand, suspension, or removal from the roll of advocates",
        "Step 5: Conclude on the ethical course of action - decline the brief and disclose the conflict"
    ]
    verification = (
        "Verification: Section 49 of the Advocates Act, 1961 empowers the Bar Council of India to make "
        "professional conduct rules. Chapter II, Part VI of BCI Rules governs standards of professional conduct; "
        "Section 35 of the Advocates Act provides for disciplinary action including suspension and removal."
    )
    return _q(
        f"c12_lp_comp_{idx:03d}", "long_answer", q_text, None, answer,
        explanation, "hard", "Legal Profession - Ethics and Accountability",
        "evaluate", True, steps, verification
    )


# ============================================================
# COMPETENCY GENERATOR REGISTRY
# ============================================================

_COMPETENCY_GENERATORS = [
    _comp_jud_001, _comp_jud_002,
    _comp_adr_001, _comp_adr_002,
    _comp_hr_001, _comp_hr_002,
    _comp_cr_001, _comp_cr_002,
    _comp_tort_001, _comp_tort_002,
    _comp_ce_001,
    _comp_ip_001,
    _comp_it_001,
    _comp_il_001,
    _comp_lp_001,
]

_STANDARD_BANKS = [
    _STANDARD_JUDICIARY, _STANDARD_ADR, _STANDARD_HUMAN_RIGHTS,
    _STANDARD_CRIMES, _STANDARD_TORTS, _STANDARD_COMMERCIAL,
    _STANDARD_IP, _STANDARD_IT, _STANDARD_LEGAL_PROF,
    _STANDARD_INTERNATIONAL,
]


def _standard_pool() -> List[Dict[str, Any]]:
    """Flatten the standard banks into _q-style question dicts."""
    pool = []
    for bank_no, bank in enumerate(_STANDARD_BANKS):
        for i, item in enumerate(bank):
            pool.append(_q(
                f"c12_std_b{bank_no:02d}_{i:03d}",
                item.get("type", "mcq"), item.get("q", ""),
                item.get("opts"), item.get("ans", ""),
                item.get("expl", ""), item.get("diff", "medium"),
                "", item.get("bloom", "remember"), False, [], ""
            ))
    return pool


def generate_questions(seed=None, count=10, topic=None):
    """Generate deterministic CISCE Class 12 Legal Studies questions.

    Args:
        seed: Random seed for reproducibility
        count: Number of questions (called as fn(seed) returns one)
        topic: Optional topic filter (matched against question text)

    Returns:
        List of question dictionaries.
    """
    n = 1 if count is None else max(1, int(count))
    r = _seed_r(seed if seed is not None else 0)

    # Normalised standard bank
    pool = _standard_pool()

    # Competency questions (mixed in ~50%)
    comp_count = max(1, n // 2)
    chosen_comps = []
    for j in range(comp_count):
        gen = _COMPETENCY_GENERATORS[(int(seed or 0) + j) % len(_COMPETENCY_GENERATORS)]
        chosen_comps.append(gen(r, (int(seed or 0) + j) % 999 + 1))

    questions = []
    used = set()
    # Interleave competency and standard questions
    comp_iter = iter(chosen_comps)
    idx = 0
    while len(questions) < n:
        if idx % 2 == 0:
            q = next(comp_iter, None)
            if q is None:
                idx += 1
                continue
            key = q["id"]
            if key in used:
                q = None
            else:
                used.add(key)
        else:
            q = pool[r.randrange(len(pool))]
            q = dict(q)
            q["id"] = f"{q['id']}_{int(seed or 0)}_{idx}"
        idx += 1
        if q is None:
            continue
        if topic and topic.lower() not in str(q.get("question", "")).lower() \
                and topic.lower() not in str(q.get("topic", "")).lower():
            continue
        questions.append(q)
        if len(questions) >= n:
            break
    return questions


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    for q in generate_questions(seed=42, count=5):
        print(f"[{q['id']}] ({q['type']}) {q['question'][:90]}")
        if q.get("options"):
            for o in q["options"]:
                print(f"    {o}")
        print(f"    Answer: {str(q['answer'])[:80]}")
        print()