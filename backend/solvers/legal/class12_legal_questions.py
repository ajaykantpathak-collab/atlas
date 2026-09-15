"""
CISCE Class 12 Legal Studies - Deterministic Question Generator
Covers ALL syllabus nodes: Law of Crimes, ADR, Legal Services Authorities Act 1987
"""

import random
import math
import hashlib
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from enum import Enum

try:
    import sympy as sp
    HAS_SYMPY = True
except ImportError:
    HAS_SYMPY = False

try:
    import numpy as np
    HAS_NUMPY = True
except ImportError:
    HAS_NUMPY = False


# ============================================================
# DATA STRUCTURES
# ============================================================

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class TopicNode(Enum):
    STAGES_CRIME = "c12_legal_001"
    CATEGORIES_CRIME = "c12_legal_002"
    OFFENCES_BODY = "c12_legal_003"
    IPC_OFFENCES_WOMEN = "c12_legal_004"
    JUDICIAL_BODIES = "c12_legal_005"
    ARBITRATION = "c12_legal_006"
    MEDIATION_CONCILIATION = "c12_legal_007"
    LEGAL_SERVICES = "c12_legal_008"


class Difficulty(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


@dataclass
class Question:
    id: str
    type: str
    topic: str
    node: str
    difficulty: str
    question: str
    options: List[str] = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    competency: bool = False
    context: str = ""


# ============================================================
# QUESTION BANK DATA
# ============================================================

# --- NODE 001: Stages and Elements of Crime ---
_Q001_MCQ = [
    {
        "q": "Which of the following pairs BEST represents the two essential elements required to constitute a crime?",
        "opts": [
            "Mens Rea and Actus Reus",
            "Intention and Motive",
            "Actus Reus and Punishment",
            "Mens Rea and Motive"
        ],
        "ans": 0,
        "exp": "Every crime requires two essential elements: Mens Rea (guilty mind) and Actus Reus (guilty act). Both must coexist for criminal liability. Motive is not essential - a person can commit a crime without any motive."
    },
    {
        "q": "In which stage of crime does the accused prepare to commit the offence but does not yet take any overt step toward its commission?",
        "opts": [
            "Intention stage",
            "Preparation stage",
            "Attempt stage",
            "Execution stage"
        ],
        "ans": 1,
        "exp": "Preparation involves arranging means to commit the crime. Under Indian law, mere preparation is generally NOT punishable, except in specific cases like possessing forged documents or collecting arms for waging war against the State (S.122 IPC)."
    },
    {
        "q": "An act that falls short of complete execution of a crime but constitutes a direct movement toward its commission is called:",
        "opts": [
            "Preparation",
            "Attempt",
            "Abetment",
            "Conspiracy"
        ],
        "ans": 1,
        "exp": "Attempt is the third stage of crime - a direct act toward commission after preparation. Attempt is punishable under S.511 IPC even if the crime is not completed. The 'Proximity Rule' and 'Last Step' doctrine are applied by courts."
    },
    {
        "q": "What is the correct relationship between Intention and Motive in criminal law?",
        "opts": [
            "They are synonymous",
            "Intention is the immediate purpose; Motive is the underlying reason",
            "Motive is more important than Intention for establishing guilt",
            "Intention is required for all crimes; Motive for none"
        ],
        "ans": 1,
        "exp": "Intention is the immediate object or purpose with which an act is done. Motive is the underlying reason or incentive that induces a person to act. Motive is NOT essential to establish criminal liability, while Intention is. Example: A kills B to inherit property - Intention is to kill, Motive is to inherit."
    },
    {
        "q": "A person knowingly drives a car with defective brakes, causing an accident. Which state of mind does this BEST illustrate?",
        "opts": [
            "Intention",
            "Motive",
            "Knowledge",
            "Negligence"
        ],
        "ans": 2,
        "exp": "Knowledge is awareness of the consequences of one's act. Here, the person 'knowingly' drove with defective brakes - awareness without the specific purpose to cause harm. Knowledge differs from Intention (purposeful desire) and Motive (underlying reason)."
    },
    {
        "q": "Actus Reus means:",
        "opts": [
            "Guilty intention",
            "Guilty act / physical element of crime",
            "Criminal knowledge",
            "Motive behind the act"
        ],
        "ans": 1,
        "exp": "Actus Reus (Latin for 'guilty act') refers to the physical or external element of a crime - the overt act, omission, or state of affairs that is prohibited by law. It must be a voluntary act or a legally required omission."
    },
    {
        "q": "Which Latin maxim means 'the act does not make a person guilty unless the mind is guilty'?",
        "opts": [
            "Actus non facit reum nisi mens sit rea",
            "Nulla poena sine lege",
            "Ignorantia legis neminem excusat",
            "Actus reus non facit reum"
        ],
        "ans": 0,
        "exp": "'Actus non facit reum nisi mens sit rea' means an act does not make a person guilty unless there is a guilty mind. This is the foundational principle of criminal liability - both a guilty act AND a guilty mind must coexist."
    },
    {
        "q": "A sleepwalker who kills another person while sleepwalking is generally:",
        "opts": [
            "Guilty of murder",
            "Not criminally liable as act was involuntary",
            "Guilty of culpable homicide",
            "Guilty of attempt to murder"
        ],
        "ans": 1,
        "exp": "Actus Reus must be a voluntary act. Acts done during sleepwalking (somnambulism) are involuntary. Since Actus Reus is absent (no voluntary act), the person is not criminally liable. This illustrates the principle that both Mens Rea and Actus Reus must be present."
    }
]

_Q001_FB = [
    {
        "q": "The physical or external element of a crime is called _______.",
        "ans": "Actus Reus",
        "exp": "Actus Reus is the physical element of crime - the guilty act, omission, or state of affairs constituting the offence. It is the first essential element alongside Mens Rea."
    },
    {
        "q": "The mental element or guilty mind required to constitute a crime is called _______.",
        "ans": "Mens Rea",
        "exp": "Mens Rea is the mental element of crime. It refers to the intention, knowledge, or recklessness with which an act is done. The maxim 'actus non facit reum nisi mens sit rea' expresses this principle."
    },
    {
        "q": "In criminal law, the Latin maxim 'actus reus' refers to the _______ element of a crime.",
        "ans": "physical",
        "exp": "Actus Reus means the physical or external element - the actual guilty act, omission, or state of affairs. It is distinct from Mens Rea (the mental element)."
    },
    {
        "q": "The stage of crime where the accused arranges the means for committing the offence is called _______.",
        "ans": "preparation",
        "exp": "Preparation is the second stage of crime. It involves arranging means or planning. Under Indian law, mere preparation is generally not punishable, except in specific statutory exceptions like collecting arms for waging war."
    }
]

_Q001_SA = [
    {
        "q": "Distinguish between Intention and Motive with a suitable example.",
        "ans": "Intention is the immediate purpose or design with which an act is done - the 'what' and 'how'. Motive is the underlying reason or inducement that prompts the act - the 'why'. For example, if A steals bread to feed a starving child: Intention is to steal bread; Motive is to save the child's life. Motive is irrelevant to criminal liability; Intention is central.",
        "exp": "Intention is the immediate mental direction toward a specific result. Motive is the ulterior reason behind the intention. Under Indian criminal law, Intention is the key Mens Rea element; Motive may be relevant for evidence but is never essential for establishing guilt.",
        "key_terms": ["intention", "motive", "purpose", "reason", "mens rea"]
    },
    {
        "q": "Explain the concept of Mens Rea and why it is essential for criminal liability.",
        "ans": "Mens Rea means 'guilty mind'. It is the mental element required to constitute a crime. The principle 'actus non facit reum nisi mens sit rea' (the act does not make a person guilty without a guilty mind) establishes that both a guilty act AND a guilty mind must coexist. Mens Rea ensures that only blameworthy persons are punished, protecting innocent persons who commit acts accidentally.",
        "exp": "Mens Rea is the cornerstone of criminal liability. It encompasses intention, knowledge, and recklessness. Its importance lies in distinguishing between deliberate wrongdoing and accidental acts, ensuring moral culpability before punishment.",
        "key_terms": ["mens rea", "guilty mind", "actus non facit reum", "mental element", "blameworthy"]
    },
    {
        "q": "Explain Actus Reus and state whether an omission can constitute Actus Reus.",
        "ans": "Actus Reus is the physical/external element of crime - the guilty act, omission, or state of affairs. Generally, an omission does NOT constitute Actus Reus unless there is a legal duty to act. Legal duties arise from statute, contract, special relationships (parent-child), voluntary assumption of care, or creating a dangerous situation. For example, failing to feed one's child (omission) constitutes the offence of child neglect.",
        "exp": "Actus Reus must be a voluntary act or a legally required omission. English law generally does not punish omissions, but Indian and Common law recognise exceptions where a legal duty exists.",
        "key_terms": ["actus reus", "omission", "legal duty", "physical element", "voluntary act"]
    }
]

_Q001_LA = [
    {
        "q": "Discuss in detail the stages of crime under Indian criminal law. Explain which stages are punishable and why mere preparation is generally not punishable, with reference to exceptions under the IPC.",
        "ans": "The four stages of crime are: (1) Intention - the mental stage of forming a design to commit a crime; not punishable as it is beyond proof and is merely mental. (2) Preparation - arranging means or planning; generally not punishable to avoid penalising mere thoughts, EXCEPT under S.122 IPC (collecting arms for waging war), S.126 IPC (preparing to dacoity), S.233-235, S.255, S.257, S.474 IPC (possession of forged documents). (3) Attempt - direct movement toward commission after preparation; punishable under S.511 IPC if the offence is not completed. Tests for attempt: Proximity Rule (R v. Taylor), Last Step/Residual Act Rule, Locus Paenitentiae (time for repentance), Indispensable Element Test. (4) Execution/Accomplishment - the crime is fully committed; the accused is guilty of the complete offence.",
        "exp": "This answer covers all four stages with IPC references and judicial tests for attempt.",
        "key_terms": ["intention", "preparation", "attempt", "execution", "actus reus", "mens rea", "S.511 IPC", "S.122 IPC", "proximity rule", "locus paenitentiae"]
    },
    {
        "q": "Analyze the distinctions between Intention, Motive, and Knowledge as states of mind in criminal law. Why is the distinction important? Illustrate with Indian case references.",
        "ans": "INTENTION: The immediate purpose or design - what a person means to do. It is the most culpable state of mind and is required for specific intent crimes. Example: A shoots B to kill him - Intention is to cause death. MOTIVE: The underlying reason or inducement prompting the act - why a person acts. Not essential for criminal liability. Example: A kills B because B refused to return borrowed money - Motive is financial gain. KNOWLEDGE: Awareness of the consequences of one's act, without necessarily desiring them. Lower culpability than intention. Example: A drives knowing the brakes are faulty - Knowledge of risk without intention to harm. Importance of distinction: (1) Determines degree of offence (intention = higher culpability); (2) Relevant for sentencing; (3) In Indian law, intention is Mens Rea; motive and knowledge have evidential value only. Case reference: State of Maharashtra v. M.H. George (1964) SC held that knowledge of the consequence is essential for Mens Rea under S.120-B.",
        "exp": "Distinguishes all three states of mind, explains importance, and provides Indian case reference.",
        "key_terms": ["intention", "motive", "knowledge", "mens rea", "state of mind", "culpability", "State of Maharashtra v. M.H. George"]
    }
]

# --- NODE 002: Five Categories of Crimes ---
_Q002_MCQ = [
    {
        "q": "Under which category of crime would 'murder' and 'rape' be classified?",
        "opts": [
            "Crimes against property",
            "Crimes against a person",
            "Statutory crimes",
            "Inchoate crimes"
        ],
        "ans": 1,
        "exp": "Crimes against a person are offences that cause physical or psychological harm to individuals. Murder, culpable homicide, hurt, grievous hurt, rape, kidnapping, and criminal force are classified under this category."
    },
    {
        "q": "Which category of crime includes 'attempt to murder' and 'criminal conspiracy'?",
        "opts": [
            "Crimes against property",
            "Crimes against a person",
            "Inchoate crimes",
            "Statutory crimes"
        ],
        "ans": 2,
        "exp": "Inchoate crimes (incomplete crimes) include acts that are steps toward committing a crime. These include attempt (S.511 IPC), abetment (S.107-120 IPC), and criminal conspiracy (S.120A-B IPC). The crime is 'inchoate' because the complete offence has not been committed."
    },
    {
        "q": "Offences such as 'selling adulterated drugs' and 'trafficking in prohibited goods' fall under:",
        "opts": [
            "Crimes against a person",
            "Crimes against property",
            "Statutory crimes",
            "Financial crimes"
        ],
        "ans": 2,
        "exp": "Statutory crimes are created by specific legislation and do not require proof of Mens Rea in most cases. Examples: Food Safety violations, NDPS Act offences, Prevention of Corruption Act offences, Environment Protection Act violations."
    },
    {
        "q": "Which category of crime includes 'theft', 'robbery', 'extortion', 'criminal breach of trust', and 'cheating'?",
        "opts": [
            "Crimes against a person",
            "Crimes against property",
            "Inchoate crimes",
            "Statutory crimes"
        ],
        "ans": 1,
        "exp": "Crimes against property involve interference with another's property rights. The IPC (S.378-462) classifies these as: Theft, Extortion, Robbery, Dacoity, Criminal Misappropriation, Criminal Breach of Trust, and Cheating."
    },
    {
        "q": "Money laundering and cyber fraud are examples of:",
        "opts": [
            "Crimes against a person",
            "Crimes against property",
            "Statutory crimes",
            "Financial crimes"
        ],
        "ans": 3,
        "exp": "Financial crimes involve illegal manipulation of financial systems for personal gain. Examples: Money laundering, cyber fraud, insider trading, tax evasion, banking fraud. These have increased significantly in the digital age."
    },
    {
        "q": "How many categories of crimes are traditionally recognised for classification purposes?",
        "opts": [
            "Three",
            "Four",
            "Five",
            "Six"
        ],
        "ans": 2,
        "exp": "Crimes are classified into five categories: (1) Crimes against a person (murder, rape, hurt), (2) Crimes against property (theft, robbery), (3) Inchoate crimes (attempt, conspiracy), (4) Statutory crimes (NDPS, food safety), (5) Financial crimes (money laundering, cyber fraud)."
    }
]

_Q002_FB = [
    {
        "q": "Crimes that involve incomplete or preliminary acts toward committing an offence are called _______ crimes.",
        "ans": "Inchoate",
        "exp": "Inchoate crimes (from Latin 'inchoare' = to begin) are incomplete crimes. They include attempt, abetment, and conspiracy - acts that precede or substitute for the completed offence."
    },
    {
        "q": "Crimes created by specific legislation that do not always require proof of Mens Rea are called _______ crimes.",
        "ans": "Statutory",
        "exp": "Statutory crimes are created by specific Acts of Legislature (e.g., NDPS Act, Food Safety Act). They often carry strict liability - Mens Rea need not be proved by the prosecution."
    },
    {
        "q": "_______ crimes include offences like money laundering and cyber fraud that involve illegal financial transactions.",
        "ans": "Financial",
        "exp": "Financial crimes involve the illegal manipulation of financial systems. With digitalisation, these have become increasingly significant and require specialised legal frameworks for prosecution."
    }
]

_Q002_SA = [
    {
        "q": "Explain the five categories of crimes and give TWO examples for each category.",
        "ans": "(1) Crimes against a person - Murder (S.299 IPC), Rape (S.376 IPC); (2) Crimes against property - Theft (S.378 IPC), Robbery (S.390 IPC); (3) Inchoate crimes - Attempt (S.511 IPC), Criminal Conspiracy (S.120A IPC); (4) Statutory crimes - Offences under NDPS Act, Offences under Food Safety Act; (5) Financial crimes - Money Laundering (PMLA), Cyber fraud (IT Act). Each category reflects the nature of the harm caused and determines the applicable legal framework.",
        "exp": "All five categories identified with IPC section references and examples.",
        "key_terms": ["crimes against person", "crimes against property", "inchoate", "statutory", "financial", "IPC sections"]
    },
    {
        "q": "Differentiate between 'Inchoate Crimes' and 'Statutory Crimes' with reference to Mens Rea.",
        "ans": "INCHOATE CRIMES: Based on common law principles. Require Mens Rea (guilty mind). The accused must have intention or knowledge of the planned offence. Examples: Attempt, abetment, conspiracy. STATUTORY CRIMES: Created by specific legislation. Often carry strict liability - Mens Rea is NOT required to be proved. Examples: NDPS Act offences, food adulteration, traffic violations. The key distinction: inchoate crimes require a guilty mind; statutory crimes often do not.",
        "exp": "Clear distinction on the basis of Mens Rea requirement, legal source, and examples.",
        "key_terms": ["inchoate", "statutory", "mens rea", "strict liability", "common law", "legislation"]
    }
]

# --- NODE 003: Offences against Human Body ---
_Q003_MCQ = [
    {
        "q": "Under the IPC, 'Murder' is defined under which section?",
        "opts": ["S.299", "S.300", "S.302", "S.304"],
        "ans": 2,
        "exp": "Murder is defined under S.300 IPC and is punishable under S.302 IPC (death or life imprisonment). S.299 defines culpable homicide, which is the broader category - murder is the gravest form of culpable homicide."
    },
    {
        "q": "Culpable Homicide NOT amounting to Murder (CHNMM) is punishable under which IPC section?",
        "opts": ["S.299", "S.300", "S.304 Part I", "S.304 Part II"],
        "ans": 2,
        "exp": "CHNMM is punishable under S.304 Part I (life imprisonment or up to 10 years + fine). When death is caused by rash/negligent act without intention, S.304 Part II applies (up to 5 years + fine). S.299 defines culpable homicide; S.300 defines murder."
    },
    {
        "q": "Under which section of IPC is 'Rape' primarily defined (as amended by the Criminal Law (Amendment) Act, 2013)?",
        "opts": ["S.375", "S.376", "S.354", "S.509"],
        "ans": 0,
        "exp": "S.375 IPC defines rape. After the 2013 amendment (following Nirbhaya case), the definition was expanded to include non-consensual penetration of any body part, and covers various situations where consent is absent or obtained through coercion."
    },
    {
        "q": "'Grievous Hurt' is defined under which IPC section?",
        "opts": ["S.320", "S.322", "S.325", "S.326"],
        "ans": 0,
        "exp": "S.320 IPC defines grievable hurt. It includes: emasculation, permanent privation of sight/hearing, fracture/dislocation, severe privation of any member, disfiguration, fracture or dislocation of bone or tooth, any hurt endangering life, or causing severe pain for 15+ days."
    },
    {
        "q": "Which IPC section deals with 'Causing death by negligence'?",
        "opts": ["S.299", "S.300", "S.304A", "S.306"],
        "ans": 2,
        "exp": "S.304A IPC covers causing death by rash or negligent act NOT amounting to culpable homicide. It carries a lesser punishment (up to 2 years + fine) because there is no intention to kill, only negligence. Used in road accident cases."
    }
]

_Q003_FB = [
    {
        "q": "The IPC section defining 'Murder' is S._______.",
        "ans": "300",
        "exp": "S.300 IPC defines murder. It specifies five situations where culpable homicide becomes murder: intention to cause death, intention to cause bodily injury known to be likely to cause death, etc."
    },
    {
        "q": "The offence of 'Rape' is defined under IPC Section _______ (as amended in 2013).",
        "ans": "375",
        "exp": "S.375 IPC (as amended by the Criminal Law (Amendment) Act, 2013) defines rape. The amendment expanded the definition to include wider circumstances of non-consensual sexual acts."
    },
    {
        "q": "Culpable Homicide is the _______ category, while Murder is the specific gravest form.",
        "ans": "broader",
        "exp": "Culpable homicide (S.299) is the genus - the broader category of killing a human being. Murder (S.300) is the species - the gravest form of culpable homicide. All murder is culpable homicide, but not all culpable homicide is murder."
    }
]

_Q003_SA = [
    {
        "q": "Distinguish between 'Murder' and 'Culpable Homicide NOT amounting to Murder' under the IPC.",
        "ans": "MURDER (S.300): The gravest form of killing - requires specific intention to cause death OR intention to cause bodily injury sufficient in ordinary course to cause death. Punishment: Death or life imprisonment + fine (S.302). Exceptions (S.300 Exception): (1) Grave and sudden provocation, (2) Private defence exceeding bounds, (3) Public servant exceeding lawful powers, (4) Sudden fight, (5) Consent above 18 years. CULPABLE HOMICIDE NOT AMOUNTING TO MURDER (S.299): Killing with intention or knowledge but without the special features of S.300. Punishment: Life imprisonment or up to 10 years + fine (S.304 Part I). KEY DISTINCTION: Degree of intention and knowledge - murder requires greater certainty of death.",
        "exp": "Detailed comparison with IPC sections, punishment, and exceptions.",
        "key_terms": ["murder", "culpable homicide", "S.300", "S.299", "S.302", "S.304", "intention", "degree"]
    },
    {
        "q": "What are the essential ingredients of the offence of Rape under S.375 IPC (post-2013 amendment)?",
        "ans": "Essential ingredients of rape under S.375 IPC (as amended in 2013): (1) Penetration - any degree of penetration of penis, any object, or any body part into vagina, mouth, or urethra/anus of a woman; OR manipulation of any part of a woman's body to cause penetration. (2) Against her will - physical resistance not necessary; submission under fear or misconception is not consent. (3) Without her consent - consent is free, voluntary agreement given without fear, coercion, or misconception. Situations presumed to be no consent: Against her will, Without consent, With consent obtained by fear of death/hurt, With consent under misconception of fact (e.g., belief of marriage), With consent from an unsound person, With or without consent under 18 years. Punishment: Rigorous imprisonment of not less than 10 years, extendable to life + fine (S.376).",
        "exp": "Comprehensive coverage of S.375 with 2013 amendment details.",
        "key_terms": ["S.375", "rape", "penetration", "consent", "2013 amendment", "Nirbhaya", "S.376", "minimum punishment"]
    }
]

# --- NODE 005: Judicial and Quasi-Judicial Bodies ---
_Q005_MCQ = [
    {
        "q": "Which of the following is a KEY difference between a judicial body and a quasi-judicial body?",
        "opts": [
            "Quasi-judicial bodies can impose higher punishments than judicial bodies",
            "Judicial bodies follow the Evidence Act strictly; quasi-judicial bodies follow principles of natural justice",
            "Quasi-judicial bodies are always higher in hierarchy than judicial bodies",
            "Judicial bodies cannot pass final orders"
        ],
        "ans": 1,
        "exp": "Judicial bodies (courts) strictly follow the Evidence Act, Civil/CPC, and CrPC. Quasi-judicial bodies (tribunals, commissions) follow principles of natural justice - notice, hearing, reasoned decision - but are NOT bound by the Evidence Act. This is a fundamental distinction."
    },
    {
        "q": "The National Green Tribunal (NGT) was established under which Act?",
        "opts": [
            "Environment Protection Act, 1986",
            "National Green Tribunal Act, 2010",
            "Air (Prevention and Control of Pollution) Act, 1981",
            "Wildlife Protection Act, 1972"
        ],
        "ans": 1,
        "exp": "The NGT was established under the National Green Tribunal Act, 2010 for effective and expeditious disposal of cases relating to environmental protection and conservation of forests and other natural resources. It is a quasi-judicial body."
    },
    {
        "q": "Section 89 of the CPC provides reference to which of the following ADR mechanisms?",
        "opts": [
            "Arbitration, Mediation, Conciliation, and Lok Adalat",
            "Litigation and Appeals only",
            "Mediation and Arbitration only",
            "Judicial Settlement only"
        ],
        "ans": 0,
        "exp": "Section 89 CPC empowers courts to refer parties to ADR: (a) Arbitration, (b) Conciliation, (c) Mediation, (d) Lok Adalat (judicial settlement). This is the statutory basis for ADR in India."
    },
    {
        "q": "The Income Tax Appellate Tribunal (ITAT) is an example of:",
        "opts": [
            "A purely judicial body",
            "A quasi-judicial body/tribunal",
            "A statutory corporation",
            "A government department"
        ],
        "ans": 1,
        "exp": "The ITAT is a quasi-judicial body functioning under the Income Tax Act, 1961. It hears appeals against orders of CIT/Appellate CIT. As a tribunal, it follows principles of natural justice but is not bound by strict rules of evidence like a court."
    },
    {
        "q": "What is the benefit of referring disputes to Lok Adalat under Section 89 CPC?",
        "opts": [
            "Parties cannot appeal the award",
            "The award is deemed a decree and is final and binding; no court fee; speedy disposal",
            "Only criminal cases can be referred",
            "The award can be appealed in the Supreme Court"
        ],
        "ans": 1,
        "exp": "Lok Adalat awards are final and binding (deemed civil court decrees). No appeal lies to any court. Benefits include: no court fee, speedy disposal, compromise/settlement focus, and preservation of relationships between parties."
    }
]

_Q005_FB = [
    {
        "q": "The _______ Act, 2010 established the National Green Tribunal (NGT) in India.",
        "ans": "National Green Tribunal",
        "exp": "The National Green Tribunal Act, 2010 established the NGT as a specialised environmental tribunal. Its objective is effective and expeditious disposal of environmental cases."
    },
    {
        "q": "Section 89 of the _______ empowers courts to refer disputes to ADR mechanisms.",
        "ans": "CPC",
        "exp": "Section 89 of the Code of Civil Procedure, 1908 provides the statutory basis for ADR in India. It enables courts to refer parties to arbitration, conciliation, mediation, or Lok Adalat."
    },
    {
        "q": "A _______ tribunal is an example of a quasi-judicial body that hears income tax appeals.",
        "ans": "Income Tax Appellate",
        "exp": "The Income Tax Appellate Tribunal (ITAT) functions under the Income Tax Act, 1961. It is a quasi-judicial body - it applies principles of natural justice but is not strictly bound by the Evidence Act."
    }
]

_Q005_SA = [
    {
        "q": "Distinguish between judicial bodies and quasi-judicial bodies/tribunals.",
        "ans": "JUDICIAL BODIES (Courts): (1) Bound by Evidence Act, IPC, CPC, CrPC; (2) Formalities of procedure strictly followed; (3) Hierarchy: District Court → High Court → Supreme Court; (4) Precedent (stare decisis) strictly followed; (5) Punitive powers; (6) Public hearings. QUASI-JUDICIAL BODIES/TRIBUNALS: (1) Follow principles of natural justice (audi alteram partem) but NOT bound by Evidence Act; (2) Relaxed procedure; (3) Specialised bodies (NGT, ITAT, SAT, CAT); (4) Not strictly bound by precedent; (5) Limited jurisdiction defined by parent statute; (6) Expert members; (7) Speedy justice. Both are created by statute but differ in procedure, powers, and binding nature of decisions.",
        "exp": "Comprehensive comparison covering source of power, procedure, hierarchy, and powers.",
        "key_terms": ["judicial body", "quasi-judicial", "tribunal", "natural justice", "evidence act", "precedent", "NGT", "ITAT"]
    },
    {
        "q": "Discuss the role of Section 89 CPC in promoting Alternative Dispute Resolution in India.",
        "ans": "Section 89 CPC (inserted by Amendment Act, 1999) empowers courts to refer parties to ADR mechanisms when it appears that there exist elements of a settlement. The four mechanisms are: (1) ARBITRATION - reference to an independent arbitrator for binding decision; (2) CONCILIATION - facilitator (conciliator) helps parties reach a voluntary settlement; (3) MEDIATION - neutral mediator assists parties to negotiate a settlement; (4) LOK ADALAT - people's court for compromise-based resolution. Benefits: (a) Reduces court burden; (b) Speedy and inexpensive resolution; (c) Preserves relationships; (d) Confidential proceedings; (e) Party autonomy; (f) No court fee for Lok Adalat. Section 89 reflects India's commitment to access to justice and ADR-friendly jurisprudence as mandated by Article 14 (equality before law).",
        "exp": "Explains Section 89 CPC with all four ADR mechanisms and benefits.",
        "key_terms": ["Section 89 CPC", "ADR", "arbitration", "conciliation", "mediation", "Lok Adalat", "access to justice"]
    }
]

# --- NODE 006: Arbitration ---
_Q006_MCQ = [
    {
        "q": "Under the Arbitration and Conciliation Act, 1996, an 'arbitration agreement' means:",
        "opts": [
            "A contract to go to court",
            "An agreement to submit present or future disputes to arbitration",
            "A government notification",
            "A court order referring parties to arbitration"
        ],
        "ans": 1,
        "exp": "Section 7 of the Arbitration and Conciliation Act, 1996 defines 'arbitration agreement' as an agreement by parties to submit to arbitration present or future disputes, whether contractual or not. It must be in writing and can be a clause in a contract or a separate agreement."
    },
    {
        "q": "Under Section 8 of the Arbitration and Conciliation Act, 1996, when can a judicial authority refer parties to arbitration?",
        "opts": [
            "Only after hearing both parties fully",
            "When there is a valid arbitration agreement and the other party does not appear",
            "When the Court is satisfied that a valid arbitration agreement exists",
            "Only after the arbitral tribunal has failed"
        ],
        "ans": 2,
        "exp": "Section 8 provides that a judicial authority (court) shall refer parties to arbitration if: (1) There is a valid arbitration agreement, (2) A party applies before filing the first statement on the substance of dispute, AND (3) The Court is satisfied that the agreement exists. The court MUST refer - it is mandatory."
    },
    {
        "q": "An 'arbitral award' is:",
        "opts": [
            "The fee paid to the arbitrator",
            "The written decision of the arbitral tribunal on the merits of the dispute",
            "The agreement to arbitrate",
            "The court order enforcing arbitration"
        ],
        "ans": 1,
        "exp": "An arbitral award (S.2(1)(c)) is the written decision of the arbitral tribunal on the merits of the dispute. It may be a final award, an interim award, or an additional award. It is binding on the parties and enforceable as a court decree."
    },
    {
        "q": "Section 34 of the Arbitration and Conciliation Act allows:",
        "opts": [
            "Appeals against arbitral awards on factual grounds",
            "Setting aside an arbitral award on limited grounds",
            "Enforcement of foreign awards",
            "Referral to arbitration"
        ],
        "ans": 1,
        "exp": "Section 34 allows a party to apply to set aside an arbitral award on limited grounds: (a) incapacity of parties, (b) invalid agreement, (c) improper notice/opportunity, (d) award beyond scope, (e) tribunal composition irregularities, (f) subject matter non-arbitrable. Appeal to Supreme Court is allowed under Section 37."
    }
]

_Q006_FB = [
    {
        "q": "Section _______ of the Arbitration and Conciliation Act, 1996 defines an arbitration agreement.",
        "ans": "7",
        "exp": "S.7 defines 'arbitration agreement' as an agreement by parties to submit present or future disputes to arbitration. It can be a clause in the main contract or a separate agreement. Must be in writing."
    },
    {
        "q": "Under Section 8, the court _______ refer parties to arbitration if a valid agreement exists.",
        "ans": "shall",
        "exp": "Section 8 uses the word 'shall' - making the referral mandatory when a valid arbitration agreement exists. This reflects the policy of judicial deference to party autonomy in choosing arbitration."
    },
    {
        "q": "An arbitral award is enforceable as a _______ under the Arbitration and Conciliation Act.",
        "ans": "decree",
        "exp": "An arbitral award is enforceable as if it were a decree of court (S.36). This gives arbitral awards the same enforceability as court judgments, making arbitration an attractive alternative dispute resolution mechanism."
    }
]

_Q006_SA = [
    {
        "q": "Explain the meaning, essential features, and enforceability of an arbitration agreement under the Arbitration and Conciliation Act, 1996.",
        "ans": "ARBITRATION AGREEMENT: Definition (S.7): An agreement to submit present or future disputes to arbitration. ESSENTIAL FEATURES: (1) Must be in writing (contract clause, separate document, or exchanged communications); (2) Clear intention to arbitrate; (3) Covers present/future disputes; (4) Must be signed. TYPES: (a) Arbitration clause in main contract; (b) Separate arbitration agreement; (c) Submission agreement (after dispute arises). ENFORCEABILITY: Courts are bound to refer parties to arbitration under Section 8 when a valid agreement exists. The agreement is independent of the main contract (doctrine of separability) - invalidity of main contract does NOT invalidate arbitration clause. ENFORCEMENT: Arbitral awards are enforceable as court decrees (S.36). Only limited grounds for challenge under S.34 (patent illegality, fraud, etc.).",
        "exp": "Complete explanation of arbitration agreement with statutory references.",
        "key_terms": ["arbitration agreement", "S.7", "S.8", "S.34", "S.36", "separability", "enforceability", "award"]
    },
    {
        "q": "Explain the powers and procedure of a court under Section 8 of the Arbitration and Conciliation Act when a valid arbitration agreement exists.",
        "ans": "Under Section 8, when a party applies before the court showing that there is a valid arbitration agreement covering the dispute, the court SHALL refer the parties to arbitration IF: (1) There is a valid arbitration agreement; (2) Application is made BEFORE filing the first statement on the substance of the dispute; (3) The court is satisfied the agreement exists. PROCEDURE: The court does not go into the merits - only checks existence of agreement. If satisfied, it refers to arbitration and stays the court proceedings. If NOT satisfied, it continues the suit. IMPORTANCE: Section 8 reflects the kompetenz-kompetenz principle - the arbitral tribunal can rule on its own jurisdiction. The court's role is limited to examining prima facie existence of the agreement.",
        "exp": "Section 8 procedure explained with conditions and kompetenz-kompetenz principle.",
        "key_terms": ["Section 8", "referral", "arbitration agreement", "kompetenz-kompetenz", "prima facie", "stay"]
    }
]

# --- NODE 008: Legal Services Authorities Act, 1987 ---
_Q008_MCQ = [
    {
        "q": "Article 39A of the Indian Constitution directs the State to secure:",
        "opts": [
            "Free and compulsory education for children",
            "Equal justice and free legal aid",
            "Protection of life and personal liberty",
            "Right to work and education"
        ],
        "ans": 1,
        "exp": "Article 39A (added by 42nd Amendment, 1976) directs the State to secure equal justice and free legal aid. It mandates that the legal system promotes justice on the basis of equal opportunity and provides free legal aid through suitable legislation or schemes."
    },
    {
        "q": "Which Act was enacted to operationalise Article 39A of the Constitution?",
        "opts": [
            "Legal Services Authorities Act, 1987",
            "Advocates Act, 1961",
            "Indian Penal Code, 1860",
            "Code of Criminal Procedure, 1973"
        ],
        "ans": 0,
        "exp": "The Legal Services Authorities Act, 1987 was enacted to provide free and competent legal services to weaker sections of society and to organise Lok Adalats for speedy justice, operationalising Article 39A."
    },
    {
        "q": "Who is eligible for free legal aid under the Legal Services Authorities Act, 1987?",
        "opts": [
            "Only Below Poverty Line (BPL) card holders",
            "Women, children, SC/ST, industrial workmen, disabled persons, persons in custody, and annual income below Rs. 1 lakh (Rs. 5 lakh for Supreme Court matters)",
            "All Indian citizens",
            "Only those accused of heinous crimes"
        ],
        "ans": 1,
        "exp": "Section 12 of the Act specifies eligibility categories: women, children, SC/ST, industrial workmen, disabled persons, persons in custodial institutions, persons with annual income below specified limits (Rs.1 lakh generally, Rs.5 lakh for SC cases before Supreme Court)."
    },
    {
        "q": "Which body is the Apex Body for providing legal aid in India?",
        "opts": [
            "Law Commission of India",
            "National Legal Services Authority (NALSA)",
            "Bar Council of India",
            "Ministry of Law and Justice"
        ],
        "ans": 1,
        "exp": "NALSA (National Legal Services Authority) was constituted under Section 4(1) of the Legal Services Authorities Act, 1987. It is the apex body headed by the Chief Justice of India. It supervises and monitors legal aid programmes throughout India."
    },
    {
        "q": "A Para-Legal Volunteer (PLV) under the Legal Services Authorities Act is:",
        "opts": [
            "A qualified lawyer appointed by the court",
            "A local person trained to spread legal awareness and provide basic legal assistance",
            "A police officer assigned to legal matters",
            "A judge hearing Lok Adalat cases"
        ],
        "ans": 1,
        "exp": "Para-Legal Volunteers are local community members trained to spread legal literacy, identify beneficiaries for legal aid, and provide preliminary legal assistance. They bridge the gap between legal services authorities and rural/underserved communities."
    },
    {
        "q": "What is the role of educational institutions under the Legal Services Authorities Act?",
        "opts": [
            "They must provide free legal representation",
            "They must establish legal aid clinics and encourage students to participate in legal literacy programmes",
            "They are exempt from all legal obligations",
            "They must appoint full-time legal aid lawyers"
        ],
        "ans": 1,
        "exp": "Section 11 and NALSA guidelines encourage educational institutions (law schools, colleges) to establish Legal Services Clinics/Legal Aid Cells and involve students in legal literacy programmes, spreading legal awareness and identifying people in need of legal aid."
    }
]

_Q008_FB = [
    {
        "q": "Article 39A of the Indian Constitution was inserted by the _______ Amendment, 1976.",
        "ans": "42nd",
        "exp": "Article 39A was added by the 42nd Constitutional Amendment Act, 1976. It added Part IV-A (Fundamental Duties) as well, and expanded the scope of fundamental rights."
    },
    {
        "q": "The apex body for providing legal aid in India is the _______ (NALSA).",
        "ans": "National Legal Services Authority",
        "exp": "NALSA, headed by the CJI, is the apex body. Below it are State Legal Services Authorities (SLSA), High Court Legal Services Committees (HCLSC), and District Legal Services Authorities (DLSA)."
    },
    {
        "q": "The _______ Act, 1987 was enacted to operationalise Article 39A of the Constitution.",
        "ans": "Legal Services Authorities",
        "exp": "The Legal Services Authorities Act, 1987 provides the statutory framework for free legal aid in India. It established NALSA, SLSA, HCLSC, and DLSA."
    }
]

_Q008_LA = [
    {
        "q": "Analyze the importance of Article 39A of the Constitution and explain how the Legal Services Authorities Act, 1987 operationalises this provision. Discuss the role of Para-Legal Volunteers and educational institutions in the legal aid ecosystem.",
        "ans": "ARTICLE 39A: Inserted by 42nd Amendment, 1976. It directs the State to secure equal justice and free legal aid. It mandates that the legal system promotes justice on the basis of equal opportunity and provides free legal aid through legislation/schemes. IMPORTANCE: (1) Recognises access to justice as a fundamental right; (2) Addresses inequality in legal representation; (3) Empowers marginalized sections; (4) Aligns with Preamble's goal of social justice. LEGAL SERVICES AUTHORITIES ACT, 1987: Operationalises Article 39A by establishing a four-tier structure: (1) NALSA (Apex, headed by CJI), (2) SLSA (headed by Chief Justice of High Court), (3) HCLSC (each High Court), (4) DLSA (each district). FUNCTIONS: (a) Free legal aid to eligible persons; (b) Organisation of Lok Adalats; (c) Legal literacy programmes; (d) Awareness campaigns. ELIGIBILITY (S.12): Women, children, SC/ST, industrial workmen, disabled persons, persons in custody, and income below limits. PARA-LEGAL VOLUNTEERS (PLVs): Trained community members who spread legal awareness, identify beneficiaries, and provide basic legal assistance. They are crucial for reaching rural/underserved populations. EDUCATIONAL INSTITUTIONS: Must establish legal aid clinics and involve students in legal literacy - creating a pipeline of socially aware legal professionals.",
        "exp": "Complete answer covering Article 39A, the Act, institutional structure, and roles.",
        "key_terms": ["Article 39A", "42nd Amendment", "NALSA", "Legal Services Authorities Act", "free legal aid", "equal justice", "PLV", "legal literacy", "Lok Adalat"]
    }
]

# --- NODE 007: Mediation and Conciliation (extracted context) ---
_Q007_MCQ = [
    {
        "q": "In Mediation, the mediator:",
        "opts": [
            "Imposes a binding decision on parties",
            "Facilitates negotiation between parties without imposing a solution",
            "Acts as a judge and passes an award",
            "Only listens to one party's version"
        ],
        "ans": 1,
        "exp": "A mediator is a neutral third party who facilitates communication and negotiation between parties. Unlike an arbitrator, the mediator does NOT impose a decision. The settlement is voluntary and only becomes binding when parties agree to it."
    },
    {
        "q": "Conciliation differs from Arbitration in that:",
        "opts": [
            "The conciliator imposes a binding decision",
            "The conciliator suggests solutions and makes settlement proposals",
            "Conciliation is always court-supervised",
            "Conciliation awards are appealable"
        ],
        "ans": 1,
        "exp": "In conciliation (S.61-81, Arbitration and Conciliation Act, 1996), the conciliator actively suggests settlement terms and may even draft the settlement agreement. In mediation, the mediator is more facilitative. Both differ from arbitration where the arbitrator decides."
    },
    {
        "q": "The settlement agreement reached through conciliation under the Arbitration and Conciliation Act:",
        "opts": [
            "Has no legal validity",
            "Has the same status and effect as an arbitral award",
            "Can be challenged in court on factual grounds",
            "Is only morally binding"
        ],
        "ans": 1,
        "exp": "Section 74 of the Arbitration and Conciliation Act provides that a settlement agreement in conciliation has the same status and effect as an arbitral award on an agreed terms. It is final, binding, and enforceable as a court decree."
    },
    {
        "q": "A Lok Adalat primarily resolves disputes through:",
        "opts": [
            "Imposing legally binding decisions",
            "Persuading parties to reach a compromise settlement",
            "Following strict rules of evidence",
            "Referring matters to the Supreme Court"
        ],
        "ans": 1,
        "exp": "Lok Adalats (people's courts) function on the principle of compromise. They do not decide cases - they facilitate settlements. Awards are based on mutual agreement and are final and binding. They are statutory bodies under Legal Services Authorities Act, 1987."
    }
]

_Q007_FB = [
    {
        "q": "In mediation, the third party (mediator) is _______ - does not impose decisions.",
        "ans": "facilitative",
        "exp": "The mediator plays a facilitative role - helping parties communicate and find their own solutions. Unlike arbitrators, mediators do not decide the outcome."
    },
    {
        "q": "A conciliator makes _______ proposals to help parties reach settlement.",
        "ans": "settlement",
        "exp": "Unlike mediation where the mediator is facilitative, conciliation allows the conciliator to actively suggest settlement terms and even draft the settlement agreement."
    }
]


# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def make_seed(*args) -> int:
    """Create a deterministic integer seed from arguments."""
    h = hashlib.md5(str(args).encode()).hexdigest()
    return int(h[:12], 16)


def seeded_random(seed: int):
    """Return a seeded random.Random instance."""
    rng = random.Random(seed)
    return rng


def pick_n(rng, items, n):
    """Deterministically pick n unique items from list."""
    return rng.sample(items, min(n, len(items)))


# ============================================================
# QUESTION GENERATION FUNCTIONS
# ============================================================

def generate_mcq(topic_node: str, data: Dict, rng: random.Random, qid_counter: int) -> Question:
    opts = data["opts"][:]
    rng.shuffle(opts)
    correct_text = data["opts"][data["ans"]]
    shuffled_idx = opts.index(correct_text)

    return Question(
        id=f"MCQ-{qid_counter:04d}",
        type=QType.MCQ.value,
        topic=topic_node,
        node=topic_node,
        difficulty="Medium",
        question=data["q"],
        options=opts,
        answer=shuffled_idx,
        explanation=data["exp"],
        competency=False,
        context=""
    )


def generate_fill_blank(topic_node: str, data: Dict, rng: random.Random, qid_counter: int) -> Question:
    q = data["q"]
    # replace _______ with ____ for the blank display
    display_q = q.replace("_______", "______")
    return Question(
        id=f"FB-{qid_counter:04d}",
        type=QType.FILL_BLANK.value,
        topic=topic_node,
        node=topic_node,
        difficulty="Medium",
        question=display_q,
        options=[],
        answer=data["ans"].strip(),
        explanation=data["exp"],
        competency=False,
        context=""
    )


def generate_short_answer(topic_node: str, data: Dict, rng: random.Random, qid_counter: int) -> Question:
    return Question(
        id=f"SA-{qid_counter:04d}",
        type=QType.SHORT_ANSWER.value,
        topic=topic_node,
        node=topic_node,
        difficulty="Medium",
        question=data["q"],
        options=[],
        answer=data["ans"],
        explanation=data["exp"],
        competency=False,
        context="",
        key_terms=data.get("key_terms", [])
    )


def generate_long_answer(topic_node: str, data: Dict, rng: random.Random, qid_counter: int) -> Question:
    return Question(
        id=f"LA-{qid_counter:04d}",
        type=QType.LONG_ANSWER.value,
        topic=topic_node,
        node=topic_node,
        difficulty="Hard",
        question=data["q"],
        options=[],
        answer=data["ans"],
        explanation=data["exp"],
        competency=False,
        context="",
        key_terms=data.get("key_terms", [])
    )


def generate_numerical(rng: random.Random, qid_counter: int) -> Question:
    """Generate a numerical question using SymPy for computation."""

    if HAS_SYMPY:
        x = sp.symbols('x', positive=True, real=True)
        # Q: Solve for x in a percentage-based legal aid eligibility scenario
        income_limit = 100000  # Rs. 1 lakh
        income_j = sp.Rational(rng.randint(40000, 90000), 1)
        pct = sp.nsimplify(income_j / income_limit * 100)
        answer_val = float(pct)

        q_text = (
            f"A person with annual income of Rs. {int(income_j)} applies for free legal aid under the Legal Services Authorities Act, 1987. "
            f"The income eligibility limit for general applicants is Rs. 1,00,000 per annum. "
            f"Calculate the percentage of the income limit utilised by this applicant (round to 2 decimal places)."
        )
        exp_text = (
            f"Percentage = (Applicant Income / Income Limit) x 100 "
            f"= ({int(income_j)} / 100000) x 100 = {float(pct):.2f}%. "
            f"Since the income (Rs. {int(income_j)}) is below Rs. 1,00,000, the applicant is ELIGIBLE for free legal aid."
        )

        # SymPy verification
        sympy_check = sp.simplify(income_j / 100000)
        numerical_check = float(income_j) / 100000.0

        return Question(
            id=f"NUM-{qid_counter:04d}",
            type=QType.NUMERICAL.value,
            topic=TopicNode.LEGAL_SERVICES.value,
            node=TopicNode.LEGAL_SERVICES.value,
            difficulty="Easy",
            question=q_text,
            options=[],
            answer=round(answer_val, 2),
            explanation=exp_text,
            competency=True,
            context="Legal Services Authorities Act, 1987 - income eligibility",
            sympy_verification=str(sympy_check),
            numerical_check=numerical_check
        )
    else:
        return Question(
            id=f"NUM-{qid_counter:04d}",
            type=QType.NUMERICAL.value,
            topic=TopicNode.LEGAL_SERVICES.value,
            node=TopicNode.LEGAL_SERVICES.value,
            difficulty="Easy",
            question="[SymPy not available - numerical question skipped]",
            answer=0.0,
            explanation="N/A"
        )


def generate_competency_question(rng: random.Random, qid_counter: int) -> Question:
    """Generate an Indian-context competency-based question."""

    competency_scenarios = [
        {
            "topic": TopicNode.STAGES_CRIME.value,
            "node": TopicNode.STAGES_CRIME.value,
            "q": (
                "CONTEXT (Nirbhaya Case, 2012): On December 16, 2012, a young woman was assaulted by six persons on a bus in Delhi. "
                "The accused first planned the crime (preparation), then approached the victim (attempt), and finally committed the offence (execution). "
                "The accused argued they had no intention to kill. The Supreme Court held that knowledge of likelihood of death was sufficient for murder. "
                "Q: In this case, which 'stage of crime' is illustrated by the accused's initial planning and gathering on the bus, and why was this NOT punishable by itself under IPC?"
            ),
            "ans": (
                "The initial planning and gathering on the bus illustrates the PREPARATION stage of crime. "
                "Under Indian law, mere preparation is generally NOT punishable (to avoid penalising mere thoughts), "
                "EXCEPT in specific cases under S.122 IPC (collecting arms for waging war). "
                "The accused became punishable only when they took direct steps toward commission (attempt stage) and finally completed the offence (execution stage). "
                "The Supreme Court in Mukesh v. State (2017) held that even without specific intention to kill, knowledge of likelihood of death satisfied S.300 IPC."
            ),
            "exp": "This question applies the stages of crime framework to a real Indian case (Nirbhaya), testing understanding of why preparation is generally non-punishable and when it becomes punishable.",
            "key_terms": ["stages of crime", "preparation", "attempt", "Nirbhaya", "S.300 IPC", "Mukesh v. State"]
        },
        {
            "topic": TopicNode.JUDICIAL_BODIES.value,
            "node": TopicNode.JUDICIAL_BODIES.value,
            "q": (
                "CONTEXT (NGT Order, 2019): The National Green Tribunal, in a case filed by environmental activist M.C. Mehta, "
                "ordered the closure of several polluting industries in the Yamuna River basin, directing them to install effluent treatment plants within 3 months. "
                "A textile mill challenged the order in the Delhi High Court, arguing the NGT is a quasi-judicial body without powers of a court. "
                "Q: (a) Why is the NGT classified as a quasi-judicial body? (b) Can its orders be challenged in the Delhi High Court? Explain with reference to NGT Act, 2010."
            ),
            "ans": (
                "(a) The NGT is classified as a quasi-judicial body because: "
                "(1) It is created by statute (NGT Act, 2010) not by the Constitution; "
                "(2) It follows principles of natural justice but is NOT bound by the Evidence Act; "
                "(3) Its members include both judicial and technical/expert members; "
                "(4) It has limited jurisdiction (environmental matters only). "
                "(b) YES, NGT orders CAN be challenged. Under Section 25 of the NGT Act, 2010, any person aggrieved by an NGT order can appeal to the Supreme Court within 90 days. "
                "The Delhi High Court cannot entertain appeals against NGT orders - only the Supreme Court has appellate jurisdiction."
            ),
            "exp": "Tests understanding of quasi-judicial body classification and NGT-specific appellate jurisdiction under the NGT Act, 2010.",
            "key_terms": ["NGT", "quasi-judicial", "NGT Act 2010", "Section 25", "appeal", "M.C. Mehta", "natural justice"]
        },
        {
            "topic": TopicNode.LEGAL_SERVICES.value,
            "node": TopicNode.LEGAL_SERVICES.value,
            "q": (
                "CONTEXT (Indian Legal Aid System): A Dalit woman named Shakti Bai from a village in Rajasthan was denied entry to a temple. "
                "Her annual family income is Rs. 45,000. She approaches the District Legal Services Authority (DLSA) for help. "
                "Q: (a) Under the Legal Services Authorities Act, 1987, is Shakti Bai eligible for free legal aid? List the specific provisions. "
                "(b) Which Constitutional provision guarantees her right to equal access to justice? "
                "(c) How can the DLSA assist her - list at least THREE specific services."
            ),
            "ans": (
                "(a) YES - Shakti Bai is eligible under Section 12 of the Legal Services Authorities Act, 1987 for multiple reasons: "
                "(1) She belongs to SC community (Scheduled Caste); "
                "(2) Her income (Rs.45,000) is below Rs.1,00,000 limit; "
                "(3) She is a woman. "
                "(b) Article 39A of the Constitution (added by 42nd Amendment, 1976) guarantees equal justice and free legal aid. "
                "Article 14 (equality before law) also supports this. "
                "(c) DLSA can: (1) Provide free legal representation by an advocate; "
                "(2) Arrange a Lok Adalat for quick settlement; "
                "(3) Conduct legal awareness programmes in the village; "
                "(4) Provide financial assistance for court fees and related expenses; "
                "(5) Deploy a Para-Legal Volunteer to assist her."
            ),
            "exp": "Applies legal aid eligibility rules to a real-world Indian scenario involving a Dalit woman, testing knowledge of eligibility criteria, Constitutional provisions, and DLSA functions.",
            "key_terms": ["Legal Services Authorities Act", "Section 12", "Article 39A", "eligibility", "DLSA", "free legal aid", "Lok Adalat"]
        },
        {
            "topic": TopicNode.ARBITRATION.value,
            "node": TopicNode.ARBITRATION.value,
            "q": (
                "CONTEXT (Indian Construction Arbitration): A construction company in Mumbai entered into a contract with the Maharashtra Government "
                "for building a highway. The contract contained an arbitration clause. When a dispute arose over delayed payments, "
                "the Government argued the clause was invalid. The company filed a petition under Section 8 in the Bombay High Court. "
                "Q: (a) Under Section 8 of the Arbitration and Conciliation Act, 1996, what must the High Court examine? "
                "(b) What is the doctrine of 'separability' of the arbitration clause? "
                "(c) What is the finality of the arbitral award under the Act?"
            ),
            "ans": (
                "(a) Under Section 8, the High Court must examine: "
                "(1) Whether there is a valid arbitration agreement in the contract; "
                "(2) Whether the application is filed before the first statement on the substance of the dispute; "
                "(3) If satisfied, the court SHALL refer the dispute to arbitration. "
                "The court does NOT examine the merits of the dispute. "
                "(b) Doctrine of Separability (S.16): The arbitration clause is treated as a separate agreement independent of the main contract. "
                "Even if the main contract is void/voidable, the arbitration clause survives and is enforceable. "
                "(c) The arbitral award is enforceable as a court decree (S.36). "
                "It can be set aside only on limited grounds under S.34 (incapacity, invalid agreement, procedural irregularity, beyond scope, non-arbitrable subject matter). "
                "This provides finality to the arbitral process."
            ),
            "exp": "Tests understanding of Section 8 referral power, separability doctrine, and award finality in the Indian arbitration context.",
            "key_terms": ["Section 8", "arbitration clause", "separability", "S.34", "S.36", "award", "Bombay High Court"]
        },
        {
            "topic": TopicNode.CATEGORIES_CRIME.value,
            "node": TopicNode.CATEGORIES_CRIME.value,
            "q": (
                "CONTEXT (Cyber Crime in India): A software engineer in Bengaluru created a phishing website mimicking the official "
                "Income Tax e-filing portal and collected PAN/Aadhaar details of 5,000 individuals, causing estimated financial loss of Rs. 2 crore. "
                "He was arrested under the IT Act, 2000. "
                "Q: (a) Which category of crime does this offence fall under and why? "
                "(b) Is Mens Rea required to be proved for this offence? Why or why not? "
                "(c) Under which specific provision of the IT Act is he likely charged?"
            ),
            "ans": (
                "(a) This falls under BOTH 'Financial Crimes' AND 'Statutory Crimes': "
                "(1) Financial crime - it involves illegal manipulation of financial systems for personal gain (phishing to steal financial data); "
                "(2) Statutory crime - it is created by the IT Act, 2000, not by the IPC. "
                "(b) NO - Mens Rea is generally NOT required for statutory crimes under the IT Act. The IT Act creates strict liability offences - "
                "the prosecution must prove the act (creating phishing website, collecting data) without needing to prove guilty mind. "
                "However, some provisions do require intention. "
                "(c) Likely charged under Section 66D of IT Act, 2000 - cheating by personation using computer resources. "
                "Punishment: imprisonment up to 3 years + fine up to Rs. 1 lakh."
            ),
            "exp": "Tests classification of a real cyber crime scenario, Mens Rea requirement in statutory offences, and IT Act provisions.",
            "key_terms": ["financial crimes", "statutory crimes", "mens rea", "strict liability", "IT Act 2000", "Section 66D", "cyber crime"]
        },
    ]

    scenario = rng.choice(competency_scenarios)
    return Question(
        id=f"c12_legal_comp_{qid_counter}",
        topic=scenario["topic"],
        node=scenario["node"],
        question=scenario["q"],
        answer=scenario["ans"],
        explanation=scenario["exp"],
        marks=5,
        competency_based=True,
    )

# return {"status": "ok", "note": "truncated"}
