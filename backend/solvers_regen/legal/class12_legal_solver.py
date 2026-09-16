"""
CISCE Class 12 Legal Studies - Deterministic Solver and Question Generator
Covers: Judiciary, ADR, Human Rights, Crimes & Torts, Commercial Law,
        Intellectual Property, IT Law, Legal Profession, International Law.

Deterministic, seed-parameterized question bank with a ``generate_questions``
adapter compatible with backend.its.engagement.generator_registry.

No LLM in computation. Standard library only.
"""

import random
import hashlib
import json
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional


# ======================================================================
# UTILITIES
# ======================================================================

def make_seed(*args) -> int:
    """Deterministic integer seed from any number of arguments."""
    raw = json.dumps(args, sort_keys=True, default=str)
    h = hashlib.md5(raw.encode()).hexdigest()
    return int(h, 16) % (2 ** 31)


def normalize(s: str) -> str:
    """Normalise whitespace and case for comparison."""
    return " ".join(s.lower().split())


def shuffle_deterministic(seed: int, items: List[Any]) -> List[Any]:
    """Return a shuffled copy of items using a fixed seed."""
    r = random.Random(seed)
    result = list(items)
    r.shuffle(result)
    return result


# ======================================================================
# MASTER QUESTION BANK
# ======================================================================

_QUESTION_BANK: List[Dict[str, Any]] = [
    # ── JUDICIARY ─────────────────────────────────────────────────────
    {
        "id": "C12L_JUD_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Judiciary",
        "question": "Which Article of the Indian Constitution deals with the establishment of the Supreme Court?",
        "options": ["A - Article 124", "B - Article 32", "C - Article 226", "D - Article 143"],
        "answer": "A",
        "explanation": "Article 124 provides for the establishment and constitution of the Supreme Court of India. Article 32 gives the Supreme Court writ jurisdiction for Fundamental Rights; Article 226 gives High Courts wider writ powers.",
        "competency": False,
    },
    {
        "id": "C12L_JUD_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Judiciary",
        "question": "The concept of 'Basic Structure' of the Constitution was propounded in which case?",
        "options": ["A - Kesavananda Bharati v. State of Kerala", "B - Maneka Gandhi v. Union of India",
                    "C - Golaknath v. State of Punjab", "D - Minerva Mills v. Union of India"],
        "answer": "A",
        "explanation": "In Kesavananda Bharati v. State of Kerala (1973), a 13-judge bench held that Parliament cannot amend the 'basic structure' of the Constitution, such as democracy, secularism, and judicial review.",
        "competency": False,
    },
    {
        "id": "C12L_JUD_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Judiciary",
        "question": "State two differences between the writ jurisdictions of the Supreme Court under Article 32 and the High Courts under Article 226.",
        "options": [],
        "answer": "1. Article 32 can be invoked only for the enforcement of Fundamental Rights, while Article 226 covers Fundamental Rights and other legal rights. 2. The Supreme Court's jurisdiction under Article 32 is itself a Fundamental Right and cannot be suspended (except during Emergency under Article 359 for some rights), whereas Article 226 is discretionary.",
        "explanation": "Article 32 is a guaranteed remedy (Dr. Ambedkar called it the heart and soul of the Constitution). Article 226 gives High Courts a wider, discretionary remedial power over any legal right.",
        "competency": False,
    },
    # ── ALTERNATIVE DISPUTE RESOLUTION ────────────────────────────────
    {
        "id": "C12L_ADR_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Alternative Dispute Resolution",
        "question": "The Arbitration and Conciliation Act in India was enacted in which year?",
        "options": ["A - 1940", "B - 1996", "C - 2015", "D - 1947"],
        "answer": "B",
        "explanation": "The Arbitration and Conciliation Act, 1996 consolidated the law of domestic and international arbitration and conciliation in India, aligning with UNCITRAL Model Law. The 1940 Act was repealed by it; the 2015 amendment introduced reforms.",
        "competency": False,
    },
    {
        "id": "C12L_ADR_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Alternative Dispute Resolution",
        "question": "In which mode of ADR does a neutral third party actively suggest terms of settlement?",
        "options": ["A - Arbitration", "B - Mediation", "C - Conciliation", "D - Litigation"],
        "answer": "C",
        "explanation": "In conciliation, the conciliator plays an advisory role and may suggest terms of settlement. In mediation, the mediator facilitates discussion but does not propose terms. In arbitration, the arbitrator gives a binding award.",
        "competency": False,
    },
    {
        "id": "C12L_ADR_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Alternative Dispute Resolution",
        "question": "Explain any two advantages of Lok Adalats in the Indian justice delivery system.",
        "options": [],
        "answer": "1. Speedy and inexpensive justice: disputes are settled without heavy court fees and lengthy procedure; the award is deemed a decree of a civil court. 2. Binding settlement with no appeal: an award of the Lok Adalat is final and binding on the parties, reducing the burden on regular courts.",
        "explanation": "Lok Adalats function under the Legal Services Authorities Act, 1987 and embody the traditional Indian value of peaceful settlement of disputes.",
        "competency": False,
    },
    # ── HUMAN RIGHTS ──────────────────────────────────────────────────
    {
        "id": "C12L_HR_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Human Rights",
        "question": "The National Human Rights Commission (NHRC) of India was established in which year?",
        "options": ["A - 1950", "B - 1976", "C - 1993", "D - 2006"],
        "answer": "C",
        "explanation": "The NHRC was constituted on 12 October 1993 under the Protection of Human Rights Act, 1993, in conformity with the Paris Principles adopted by the UN General Assembly.",
        "competency": False,
    },
    {
        "id": "C12L_HR_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Human Rights",
        "question": "Which of the following is NOT a civil or political right protected under the ICCPR, 1966?",
        "options": ["A - Right to life", "B - Right to a fair trial", "C - Right to social security", "D - Freedom of expression"],
        "answer": "C",
        "explanation": "The right to social security is an economic, social and cultural right protected under the ICESCR, 1966. The ICCPR protects civil and political rights such as life, fair trial and expression.",
        "competency": False,
    },
    {
        "id": "C12L_HR_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Human Rights",
        "question": "Explain the difference between Fundamental Rights and Directive Principles of State Policy with one example of each.",
        "options": [],
        "answer": "Fundamental Rights are justiciable guarantees enforceable by courts (Part III), e.g., Right to Equality (Article 14). Directive Principles are non-justiciable guidelines for the State in governance (Part IV), e.g., Article 39 directing the State to secure adequate means of livelihood.",
        "explanation": "Fundamental Rights limit State action and can be enforced under Articles 32/226. Directive Principles, though not enforceable, are fundamental in the governance of the country under Article 37.",
        "competency": False,
    },
    # ── CRIMES AND TORTS ──────────────────────────────────────────────
    {
        "id": "C12L_CR_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Crimes and Torts",
        "question": "Which of the following is an essential element of a crime?",
        "options": ["A - Mens rea", "B - Actus reus", "C - Both mens rea and actus reus", "D - Neither"],
        "answer": "C",
        "explanation": "A crime generally requires mens rea (guilty mind) and actus reus (guilty act). The maxim reads: actus non facit reum nisi mens sit rea - an act does not make one guilty unless the mind is also guilty.",
        "competency": False,
    },
    {
        "id": "C12L_CR_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Crimes and Torts",
        "question": "Which one of the following is a tort and not a crime?",
        "options": ["A - Murder", "B - Defamation published privately to one person only", "C - Theft", "D - Dacoity"],
        "answer": "B",
        "explanation": "Defamation is primarily a tort (civil wrong) remedied by damages, though certain forms are also criminal offences. Where a defamatory statement is published to a single person only, there is no criminal offence but the civil wrong may lie. Murder, theft and dacoity are crimes.",
        "competency": False,
    },
    {
        "id": "C12L_CR_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Crimes and Torts",
        "question": "Distinguish between a crime and a tort on the basis of (i) nature of wrong, (ii) remedy.",
        "options": [],
        "answer": "(i) A crime is a public wrong, a breach of public duty owed to society; a tort is a private wrong, a breach of duty owed to an individual. (ii) For a crime the remedy is prosecution and punishment (imprisonment/fine) by the State; for a tort the remedy is usually damages (compensation) or injunction at the suit of the injured person.",
        "explanation": "The distinction rests on whom the duty is owed and who initiates proceedings: the State prosecutes crimes; the injured party sues in tort.",
        "competency": False,
    },
    # ── COMMERCIAL LAW ────────────────────────────────────────────────
    {
        "id": "C12L_CL_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Commercial Law",
        "question": "An agreement enforceable by law is a:",
        "options": ["A - Proposal", "B - Contract", "C - Promise", "D - Consideration"],
        "answer": "B",
        "explanation": "Section 2(h) of the Indian Contract Act, 1872 defines a contract as an agreement enforceable by law. An agreement plus enforceability equals a contract.",
        "competency": False,
    },
    {
        "id": "C12L_CL_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Commercial Law",
        "question": "Under the Consumer Protection Act, 2019, a complaint for goods valued at Rs. 80 lakh should be filed with the:",
        "options": ["A - District Commission", "B - State Commission", "C - National Commission", "D - Supreme Court"],
        "answer": "B",
        "explanation": "Under the Consumer Protection Act, 2019 the pecuniary jurisdiction (as amended in 2021 rules) places claims between Rs. 50 lakh and Rs. 2 crore before the State Commission. Claims up to Rs. 50 lakh go to the District Commission.",
        "competency": True,
    },
    {
        "id": "C12L_CL_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Commercial Law",
        "question": "State any two rights of a consumer under the Consumer Protection Act, 2019.",
        "options": [],
        "answer": "1. Right to safety: protection against goods and services hazardous to life and health. 2. Right to information: to be informed about the quality, quantity, potency, purity, standard and price of goods or services so as to be protected against unfair trade practices.",
        "explanation": "The Act codifies six consumer rights: safety, information, choice, representation, redressal, and consumer education.",
        "competency": False,
    },
    # ── INTELLECTUAL PROPERTY ─────────────────────────────────────────
    {
        "id": "C12L_IP_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Intellectual Property",
        "question": "The term of copyright protection in a literary work in India is:",
        "options": ["A - 20 years from filing", "B - Lifetime of the author plus 60 years",
                    "C - 10 years from publication", "D - 50 years from publication"],
        "answer": "B",
        "explanation": "Under the Copyright Act, 1957 (as amended in 2012), copyright in a literary, dramatic, musical or artistic work subsists during the life of the author and 60 years from the beginning of the calendar year following the year of death.",
        "competency": False,
    },
    {
        "id": "C12L_IP_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Intellectual Property",
        "question": "Which of the following CANNOT be registered as a trademark?",
        "options": ["A - A invented word", "B - A device", "C - A mark descriptive of the goods themselves with no distinctiveness", "D - A colour combination"],
        "answer": "C",
        "explanation": "A mark must be distinctive to function as a trademark. Marks that are purely descriptive of the goods and lack distinctiveness are refused registration under the Trade Marks Act, 1999. Invented words, devices and combinations of colours can be registered if distinctive.",
        "competency": False,
    },
    {
        "id": "C12L_IP_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Intellectual Property",
        "question": "Differentiate between a patent and a copyright with reference to the subject matter protected.",
        "options": [],
        "answer": "A patent protects inventions - new products or processes involving an inventive step and industrial application (Patents Act, 1970, term 20 years). A copyright protects original expression of ideas in literary, dramatic, musical and artistic works (Copyright Act, 1957, term life + 60 years). Ideas themselves are protected by neither.",
        "explanation": "Patents protect technical innovation; copyright protects creative expression. Both are time-limited statutory monopolies.",
        "competency": False,
    },
    # ── IT LAW ────────────────────────────────────────────────────────
    {
        "id": "C12L_IT_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "IT Law",
        "question": "The Information Technology Act in India was enacted in which year?",
        "options": ["A - 1998", "B - 2000", "C - 2005", "D - 2011"],
        "answer": "B",
        "explanation": "The Information Technology Act, 2000 provides legal recognition to electronic records and digital signatures, and creates offences relating to computers and cyberspace. It was significantly amended in 2008.",
        "competency": False,
    },
    {
        "id": "C12L_IT_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "IT Law",
        "question": "Under the IT Act, 2000, unauthorized access to a computer resource is defined as:",
        "options": ["A - Cyber terrorism", "B - Hacking", "C - Tampering", "D - Phishing"],
        "answer": "B",
        "explanation": "Section 66 of the IT Act, 2000 read with Section 43 penalizes hacking - destroying, deleting or altering information residing in a computer resource or diminishing its value, without authorization. Cyber terrorism is the graver offence under Section 66F.",
        "competency": False,
    },
    # ── LEGAL PROFESSION ──────────────────────────────────────────────
    {
        "id": "C12L_LP_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Legal Profession",
        "question": "The Advocates Act, which governs legal practice in India, was enacted in:",
        "options": ["A - 1956", "B - 1961", "C - 1970", "D - 1986"],
        "answer": "B",
        "explanation": "The Advocates Act, 1961 consolidated the law relating to legal practitioners, created the Bar Council of India and State Bar Councils, and provides for enrollment and professional conduct of advocates.",
        "competency": False,
    },
    {
        "id": "C12L_LP_02",
        "type": "short",
        "difficulty": "Medium",
        "topic": "Legal Profession",
        "question": "State any two duties of an advocate towards the client.",
        "options": [],
        "answer": "1. Duty of confidentiality: an advocate must not disclose communications made to him in the course of employment without the client's consent (also protected by Section 126, Evidence Act). 2. Duty to act with due diligence and fidelity: an advocate must uphold the client's interest fearlessly, attend to briefs punctually, and not withdraw without reasonable notice.",
        "explanation": "These duties flow from the Advocates Act, 1961 and Chapter II, Part VI of the BCI Rules on professional conduct and etiquette.",
        "competency": False,
    },
    # ── INTERNATIONAL LAW ─────────────────────────────────────────────
    {
        "id": "C12L_IL_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "International Law",
        "question": "The principle 'pacta sunt servanda' means:",
        "options": ["A - Agreements must be kept", "B - No one is judge in his own cause",
                    "C - Let the buyer beware", "D - He who seeks equity must do equity"],
        "answer": "A",
        "explanation": "Pacta sunt servanda (Article 26, Vienna Convention on the Law of Treaties, 1969) means that treaties in force are binding upon the parties and must be performed in good faith.",
        "competency": False,
    },
    {
        "id": "C12L_IL_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "International Law",
        "question": "The International Court of Justice is the principal judicial organ of the:",
        "options": ["A - League of Nations", "B - United Nations", "C - World Trade Organization", "D - International Labour Organization"],
        "answer": "B",
        "explanation": "The ICJ, seated at The Hague, is the principal judicial organ of the United Nations under the UN Charter and the Statute of the ICJ (Article 38 lists the sources of international law it applies).",
        "competency": False,
    },
    {
        "id": "C12L_IL_03",
        "type": "short",
        "difficulty": "Medium",
        "topic": "International Law",
        "question": "Name the primary sources of international law as enumerated in Article 38 of the ICJ Statute.",
        "options": [],
        "answer": "(1) International conventions and treaties, (2) International custom as evidence of general practice accepted as law, (3) General principles of law recognized by civilized nations; with judicial decisions and the teachings of publicists as subsidiary means for determining the rules.",
        "explanation": "Article 38(1) of the Statute of the International Court of Justice is the classic statement of the sources of international law.",
        "competency": False,
    },
]


# ======================================================================
# SOLVER FACADE
# ======================================================================

@dataclass
class SolveResult:
    """Standard return type for the solver."""
    question_id: str
    topic: str
    steps: List[str] = field(default_factory=list)
    answer: str = ""
    explanation: str = ""
    verification: str = ""


class Class12LegalSolver:
    """Deterministic solver for CISCE Class 12 Legal Studies."""

    def __init__(self, seed: int = 42):
        self.rng = random.Random(seed)
        self.questions = _QUESTION_BANK

    def get_topics(self) -> List[str]:
        return sorted({q["topic"] for q in self.questions})

    def get_question_count(self) -> int:
        return len(self.questions)

    def solve(self, question_id: str = "") -> Dict[str, Any]:
        """Solve a specific question from the bank."""
        q = next((item for item in self.questions if item["id"] == question_id),
                 None)
        if q is None:
            return {"error": f"Unknown question_id: {question_id}"}
        return {
            "id": q["id"],
            "type": q["type"],
            "topic": q["topic"],
            "difficulty": q["difficulty"],
            "question": q["question"],
            "options": q.get("options", []),
            "answer": q.get("answer", ""),
            "explanation": q.get("explanation", ""),
            "competency": q.get("competency", False),
        }


# ======================================================================
# REGISTRY ADAPTER
# ======================================================================

def generate_questions(seed: int = 0, count: int = None,
                       topic: str = None) -> List[Dict[str, Any]]:
    """Registry adapter: deterministic questions for Class 12 Legal Studies.

    Called as fn(seed) it returns one question; with count=N it returns N.
    """
    n = 1 if count is None else max(1, int(count))
    rng = random.Random(make_seed("generate_questions", seed))
    pool = [q for q in _QUESTION_BANK if not topic
            or normalize(q.get("topic", "")) == normalize(topic)
            or normalize(topic) in normalize(q.get("topic", ""))]
    if not pool:
        pool = list(_QUESTION_BANK)
    questions = []
    seen_ids = set()
    attempts = 0
    while len(questions) < n and attempts < n * 10:
        attempts += 1
        q = dict(rng.choice(pool))
        if q["id"] in seen_ids:
            continue
        seen_ids.add(q["id"])
        out = {
            "id": q["id"],
            "type": q.get("type", "mcq"),
            "difficulty": q.get("difficulty", "Medium"),
            "topic": q.get("topic", ""),
            "question": q["question"],
            "answer": q.get("answer", ""),
            "explanation": q.get("explanation", ""),
            "competency": q.get("competency", False),
        }
        if q.get("options"):
            opts = list(q["options"])
            rng.shuffle(opts)
            out["options"] = opts
        questions.append(out)
    return questions


# ======================================================================
# MAIN
# ======================================================================

def main():
    print("=" * 70)
    print("CISCE Class 12 Legal Studies - Deterministic Generator Demo")
    print("=" * 70)
    solver = Class12LegalSolver()
    print(f"Bank size: {solver.get_question_count()}")
    print(f"Topics   : {', '.join(solver.get_topics())}")
    for q in generate_questions(seed=42, count=5):
        print(f"\n[{q['id']}] ({q['topic']}, {q['difficulty']}) "
              f"{q['question'][:90]}")
        if q.get("options"):
            for opt in q["options"]:
                print(f"    {opt}")
        print(f"    Answer: {q['answer']}")


if __name__ == "__main__":
    main()
