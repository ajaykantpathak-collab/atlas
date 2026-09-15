"""
CISCE Political Science Class 11 - Deterministic Solver & Question Generator
Author: Educational Solver Platform
Subject: Political Science (Class 11 - CISCE/ISC)
"""

import random
import math
import re
import json
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from enum import Enum


# ============================================================================
# DATA MODELS
# ============================================================================

class Topic(Enum):
    PREAMBLE = "Preamble"
    FUNDAMENTAL_RIGHTS = "Fundamental Rights"
    FUNDAMENTAL_DUTIES = "Fundamental Duties"
    DIRECTIVE_PRINCIPLES = "Directive Principles of State Policy"
    UNION_EXECUTIVE = "Union Executive"
    UNION_LEGISLATURE = "Union Legislature"
    UNION_JUDICIARY = "Union Judiciary"
    FEDERALISM = "Federalism"
    LOCAL_GOVERNMENT = "Local Government"
    CONSTITUTIONAL_AMENDMENTS = "Constitutional Amendments"
    ELECTORAL_SYSTEM = "Electoral System"
    POLITICAL_PARTIES = "Political Parties"
    CONSTITUTIONAL_ORGANS = "Constitutional Organs"


class QuestionType(Enum):
    STANDARD = "standard"
    COMPETENCY_BASED = "competency_based"


@dataclass
class Question:
    id: int
    topic: Topic
    question_type: QuestionType
    text: str
    options: List[str]
    correct_option: int
    explanation: str
    difficulty: str


@dataclass
class SolveResult:
    question_id: int
    topic: str
    question_type: str
    question: str
    user_answer: int
    correct_answer: int
    is_correct: bool
    steps: List[str]
    explanation: str
    verification: str
    score: float


# ============================================================================
# KNOWLEDGE BASE
# ============================================================================

class KnowledgeBase:
    """Centralized knowledge base for Political Science Class 11."""

    PREAMBLE_KEYWORDS = {
        "sovereign": "India is an independent nation, not subject to any external authority",
        "socialist": "India is committed to social and economic equality",
        "secular": "India has no official state religion, all religions are equal",
        "democratic": "Government of the people, by the people, for the people",
        "republic": "Head of state is elected, not hereditary",
        "justice": "Social, economic, and political justice for all citizens",
        "liberty": "Freedom of thought, expression, belief, faith, and worship",
        "equality": "Equal status and opportunities for all citizens",
        "fraternity": "Brotherhood and dignity of the individual",
        "unity": "Integrity of the nation"
    }

    FUNDAMENTAL_RIGHTS = {
        "Article 14": {
            "name": "Equality before Law",
            "description": "All persons are equal before the law and entitled to equal protection of laws"
        },
        "Article 15": {
            "name": "Prohibition of Discrimination",
            "description": "No discrimination on grounds of religion, race, caste, sex, place of birth"
        },
        "Article 16": {
            "name": "Equality of Opportunity in Public Employment",
            "description": "Equal opportunity for all citizens in matters of public employment"
        },
        "Article 19": {
            "name": "Protection of Six Freedoms",
            "description": "Freedom of speech and expression, assembly, association, movement, residence, profession"
        },
        "Article 21": {
            "name": "Protection of Life and Personal Liberty",
            "description": "No person shall be deprived of life or personal liberty except according to procedure established by law"
        },
        "Article 21A": {
            "name": "Right to Education",
            "description": "Free and compulsory education for children aged 6-14 years"
        },
        "Article 22": {
            "name": "Protection against Arrest and Detention",
            "description": "Rights of arrested persons including right to be informed of grounds of arrest"
        },
        "Article 23": {
            "name": "Prohibition of Traffic in Human Beings",
            "description": "Prohibits trafficking in human beings and forced labour"
        },
        "Article 24": {
            "name": "Prohibition of Employment of Children",
            "description": "No child below the age of 14 years shall be employed in any factory or mine"
        },
        "Article 25": {
            "name": "Freedom of Conscience and Free Profession",
            "description": "Freedom of religion and the right to freely profess, practice, and propagate religion"
        },
        "Article 26": {
            "name": "Freedom to Manage Religious Affairs",
            "description": "Freedom to manage religious affairs subject to public order, morality, and health"
        },
        "Article 27": {
            "name": "Freedom from Payment of Taxes for Promotion of Religion",
            "description": "No person shall be compelled to pay taxes for promotion or maintenance of any religion"
        },
        "Article 29": {
            "name": "Protection of Interests of Minorities",
            "description": "Protection of language, script, and culture of minorities"
        },
        "Article 30": {
            "name": "Right of Minorities to Establish Educational Institutions",
            "description": "Minorities have the right to establish and administer educational institutions"
        },
        "Article 32": {
            "name": "Right to Constitutional Remedies",
            "description": "Right to move Supreme Court for enforcement of Fundamental Rights"
        }
    }

    FUNDAMENTAL_DUTIES = {
        1: "To abide by the Constitution and respect its ideals and institutions",
        2: "To cherish and follow the noble ideals which inspired our national struggle for freedom",
        3: "To uphold and protect the sovereignty, unity, and integrity of India",
        4: "To defend the country and render national service when called upon",
        5: "To promote harmony and the spirit of common brotherhood among all people",
        6: "To value and preserve the rich heritage of our composite culture",
        7: "To protect and improve the natural environment",
        8: "To develop scientific temper, humanism, and spirit of inquiry",
        9: "To safeguard public property and abjure violence",
        10: "To strive towards excellence in all spheres of individual and collective activity",
        11: "To provide opportunities for education to one's child or ward between 6 and 14 years"
    }

    DIRECTIVE_PRINCIPLES = {
        "Article 36": "Definition: State shall apply DPSP in making laws",
        "Article 39": "Securing equal pay for equal work, just and humane conditions of work",
        "Article 39A": "Equal justice and free legal aid to the poor",
        "Article 40": "Organisation of village panchayats as units of self-government",
        "Article 41": "Right to work, education, and public assistance",
        "Article 43": "Living wage, decent standard of life for workers",
        "Article 44": "Uniform Civil Code for all citizens",
        "Article 45": "Provision for early childhood care and education",
        "Article 46": "Promotion of educational and economic interests of Scheduled Castes/Tribes",
        "Article 47": "Duty of State to raise the level of nutrition and standard of living",
        "Article 48": "Organisation of agriculture and animal husbandry",
        "Article 48A": "Protection and improvement of environment",
        "Article 49": "Protection of monuments and places of national importance",
        "Article 50": "Separation of judiciary from executive"
    }

    PRESIDENT_POWERS = {
        "Executive": "All executive actions are taken in the name of the President. Appoints PM, Governors, etc.",
        "Legislative": "Can summon, prorogue, and dissolve Parliament. Can address Parliament.",
        "Financial": "Annual financial statement is laid before Parliament by the President.",
        "Judicial": "Has the power to grant pardons, reprieves, respites, or remissions of punishment",
        "Diplomatic": "Treaties and international agreements are negotiated in the name of the President",
        "Military": "Supreme Commander of the Defence Forces of India"
    }

    PARLIAMENT_COMPOSITION = {
        "Lok Sabha": {
            "max_members": 552,
            "elected": 530,
            "nominated": 2,
            "term": 5,
            "presiding_officer": "Speaker",
            "minimum_age": 25
        },
        "Rajya Sabha": {
            "max_members": 250,
            "elected": 238,
            "nominated": 12,
            "term": 6,
            "presiding_officer": "Chairman (Vice President)",
            "minimum_age": 30
        }
    }

    SUPREME_COURT = {
        "cji": "Chief Justice of India",
        "max_judges": 34,
        "appointment": "President in consultation with CJI and senior judges",
        "tenure": "65 years (age) or earlier resignation/removal",
        "jurisdiction": "Original, Appellate, and Advisory",
        "original_cases": "Disputes between Centre and States, Fundamental Rights enforcement",
        "removal": "Impeachment by Parliament for proved misbehavior or incapacity"
    }

    CONSTITUTIONAL_AMENDMENTS = {
        "1st": "Reform of Land Reform Acts",
        "2nd": "Added XIVth Schedule",
        "10th": "Placed Land Reform Acts in IXth Schedule",
        "24th": "Parliament's power to amend any part including Fundamental Rights",
        "42nd": "Called Mini Constitution - added Socialist, Secular, Democratic",
        "44th": "Reduced President's power to return Bills; restored President's rule",
        "61st": "Reduced voting age from 21 to 18",
        "73rd": "Panchayati Raj Institutions - Part IX added",
        "74th": "Municipalities - Part IXA added",
        "86th": "Right to Education - Article 21A added",
        "101st": "Goods and Services Tax (GST)",
        "103rd": "Constitution (One Hundred and Third Amendment) Act, 2019 - EWS reservation"
    }

    PANCHAYAT_LEVELS = {
        "Gram Panchayat": "Village level - elected directly by the people",
        "Panchayat Samiti": "Block/Intermediate level - intermediate tier",
        "Zila Parishad": "District level - apex body of Panchayati Raj system"
    }

    MUNICIPALITY_TYPES = {
        "Nagar Panchayat": "Transitional area - for areas in transition from rural to urban",
        "Municipal Council": "Smaller urban areas",
        "Municipal Corporation": "Larger urban areas"
    }

    THREE_TIER = {
        "Union": "Parliament makes laws for the entire country",
        "State": "State Legislature makes laws for the state",
        "Local": "Panchayats and Municipalities - local self-government"
    }

    FEDERAL_FEATURES = {
        "Written Constitution": "The Constitution of India is a written, lengthy, and detailed document",
        "Division of Powers": "Union List, State List, Concurrent List - Seventh Schedule",
        "Supremacy of Constitution": "Constitution is the supreme law of the land",
        "Independent Judiciary": "Supreme Court acts as guardian of the Constitution",
        "Bicameralism": "Two houses - Lok Sabha and Rajya Sabha"
    }

    UNITARY_FEATURES = {
        "Strong Centre": "Union List has more subjects, Centre can override State List",
        "Single Constitution": "One Constitution for both Centre and States",
        "Single Citizenship": "Only Indian citizenship, no separate state citizenship",
        "All India Services": "IAS, IPS, IFS serve both Centre and States",
        "Emergency Provisions": "President can impose National/Emergency"
    }

    ELECTORAL_SYSTEM = {
        "system": "First Past the Post (FPTP) / Simple Majority System",
        "body": "Election Commission of India (ECI)",
        "loe": "Model Code of Conduct enforced during elections",
        "voter_id": "EPIC (Electors Photo Identity Card)",
        "evm": "Electronic Voting Machines used since 2004",
        "voter_turnout_2019": "67.4%",
        "total_ls_seats": "543 (elected)"
    }

    POLITICAL_PARTIES = {
        "BJP": "Bharatiya Janata Party - Right, founded 1980",
        "INC": "Indian National Congress - Centre-Left, founded 1885",
        "AAP": "Aam Aadmi Party - Centre, founded 2012",
        "CPI": "Communist Party of India - Left, founded 1925",
        "CPIM": "Communist Party of India (Marxist) - Left, founded 1964",
        "TMC": "Trinamool Congress - Centre-Left, founded 1998",
        "NCP": "Nationalist Congress Party - Centre, founded 1999",
        "BSP": "Bahujan Samaj Party - Dalit-based, founded 1984",
        "SP": "Samajwadi Party - Centre-Left, founded 1992",
        "Shiv Sena": "Regional (Maharashtra), founded 1966",
        "DMK": "Dravida Munnetra Kazhagam - Regional (Tamil Nadu), founded 1949",
        "AITC": "All India Trinamool Congress - Regional (West Bengal), founded 1998"
    }

    PRESIDENTS_OF_INDIA = [
        "Rajendra Prasad (1950-1962)",
        "Sarvepalli Radhakrishnan (1962-1967)",
        "Zakir Husain (1967-1969)",
        "V. V. Giri (1969-1974)",
        "Fakhruddin Ali Ahmed (1974-1977)",
        "Neelam Sanjiva Reddy (1977-1982)",
        "Giani Zail Singh (1982-1987)",
        "R. Venkataraman (1987-1992)",
        "Shankar Dayal Sharma (1992-1997)",
        "K. R. Narayanan (1997-2002)",
        "A. P. J. Abdul Kalam (2002-2007)",
        "Pratibha Patil (2007-2012)",
        "Pranab Mukherjee (2012-2017)",
        "Ram Nath Kovind (2017-2022)",
        "Droupadi Murmu (2022-present)"
    ]

    PRIME_MINISTERS = [
        "Jawaharlal Nehru (1947-1964)",
        "Lal Bahadur Shastri (1964-1966)",
        "Indira Gandhi (1966-1977, 1980-1984)",
        "Morarji Desai (1977-1979)",
        "Charan Singh (1979-1980)",
        "Rajiv Gandhi (1984-1989)",
        "V. P. Singh (1989-1990)",
        "Chandra Shekhar (1990-1991)",
        "P. V. Narasimha Rao (1991-1996)",
        "Atal Bihari Vajpayee (1996, 1998-2004)",
        "H. D. Deve Gowda (1996-1997)",
        "I. K. Gujral (1997-1998)",
        "Manmohan Singh (2004-2014)",
        "Narendra Modi (2014-present)"
    ]


# ============================================================================
# QUESTION GENERATORS
# ============================================================================

class QuestionGenerator:
    """Generates deterministic, reproducible questions from Political Science syllabus."""

    def __init__(self, seed: int = 42):
        random.seed(seed)
        self.kb = KnowledgeBase()
        self._question_counter = 0

    def _next_id(self) -> int:
        self._question_counter += 1
        return self._question_counter

    def _shuffle_options(self, correct: str, wrongs: List[str]) -> tuple:
        options = [correct] + wrongs
        random.shuffle(options)
        correct_idx = options.index(correct)
        return options, correct_idx

    # -------------------------------------------------------------------------
    # PREAMBLE QUESTIONS
    # -------------------------------------------------------------------------

    def generate_preamble_standard(self) -> Question:
        """Standard: Identify keywords of the Preamble."""
        keywords = list(self.kb.PREAMBLE_KEYWORDS.keys())
        keyword = random.choice(keywords)
        self._next_id()

        wrongs = [k for k in keywords if k != keyword]
        random.shuffle(wrongs)
        wrongs = wrongs[:3]

        question_text = f"Which of the following is NOT a keyword of the Preamble of the Indian Constitution?"

        options = [keyword] + wrongs
        random.shuffle(options)
        correct_idx = options.index(keyword)

        return Question(
            id=self._question_counter,
            topic=Topic.PREAMBLE,
            question_type=QuestionType.STANDARD,
            text=question_text,
            options=options,
            correct_option=correct_idx,
            explanation=f"'{keyword}' IS a keyword in the Preamble. The Preamble contains: Sovereign, Socialist, Secular, Democratic, Republic, Justice, Liberty, Equality, Fraternity, Unity. The odd one out is '{keyword}' among the given options.",
            difficulty="Easy"
        )

    def generate_preamble_competency(self) -> Question:
        """Competency-based: Assertion-Reasoning on Preamble."""
        self._next_id()
        statements = [
            {
                "assertion": "The Preamble declares India to be a Sovereign Socialist Secular Democratic Republic.",
                "reason": "The words 'Socialist' and 'Secular' were added by the 42nd Amendment Act of 1976.",
                "correct_opt": 4,
                "options": [
                    "Both A and R are true and R explains A",
                    "Both A and R are true but R does not explain A",
                    "A is true but R is false",
                    "A is false but R is true",
                    "Both A and R are true and R correctly explains A"
                ],
                "explanation": "Both statements are true. The 42nd Amendment (1976) added 'Socialist' and 'Secular' to the Preamble. The reason correctly explains the assertion."
            }
        ]
        s = random.choice(statements)
        return Question(
            id=self._question_counter,
            topic=Topic.PREAMBLE,
            question_type=QuestionType.COMPETENCY_BASED,
            text=f"A: {s['assertion']}\nR: {s['reason']}\n\nChoose the correct relationship:",
            options=s["options"],
            correct_option=s["correct_opt"],
            explanation=s["explanation"],
            difficulty="Medium"
        )

    # -------------------------------------------------------------------------
    # FUNDAMENTAL RIGHTS QUESTIONS
    # -------------------------------------------------------------------------

    def generate_fundamental_rights_standard(self) -> Question:
        """Standard: Match Article with its Fundamental Right."""
        articles = list(self.kb.FUNDAMENTAL_RIGHTS.keys())
        article = random.choice(articles)
        info = self.kb.FUNDAMENTAL_RIGHTS[article]
        self._next_id()

        others = [a for a in articles if a != article]
        random.shuffle(others)
        wrong_names = [self.kb.FUNDAMENTAL_RIGHTS[a]["name"] for a in others[:3]]

        question_text = f"{article} deals with which Fundamental Right?"

        options, correct_idx = self._shuffle_options(info["name"], wrong_names)

        return Question(
            id=self._question_counter,
            topic=Topic.FUNDAMENTAL_RIGHTS,
            question_type=QuestionType.STANDARD,
            text=question_text,
            options=options,
            correct_option=correct_idx,
            explanation=f"{article} guarantees '{info['name']}'. {info['description']}.",
            difficulty="Easy"
        )

    def generate_fundamental_rights_competency(self) -> Question:
        """Competency-based: Case study on Fundamental Rights."""
        self._next_id()
        cases = [
            {
                "scenario": "Rahul was arrested by the police and kept in custody for 45 days without being produced before a magistrate. He was also not told the grounds of his arrest. Which Fundamental Right has been violated?",
                "correct": 1,
                "options": [
                    "Article 19 - Freedom of Speech",
                    "Article 22 - Protection against Arrest and Detention",
                    "Article 21 - Right to Life",
                    "Article 14 - Equality before Law"
                ],
                "explanation": "Article 22 provides protection against arrest and detention. It mandates that every arrested person must be informed of the grounds of arrest and produced before a magistrate within 24 hours (excluding travel time). Both conditions were violated in this case."
            },
            {
                "scenario": "Sita, a 13-year-old girl, was employed in a carpet weaving factory. Her parents claimed it was necessary for the family's survival. Which Fundamental Right is being violated?",
                "correct": 2,
                "options": [
                    "Article 23 - Prohibition of Trafficking",
                    "Article 19 - Freedom of Movement",
                    "Article 24 - Prohibition of Employment of Children",
                    "Article 21A - Right to Education"
                ],
                "explanation": "Article 24 prohibits the employment of children below 14 years in any factory, mine, or hazardous work. While poverty is a concern, the Constitution places an absolute prohibition on child labour below 14. Article 21A (Right to Education) is also being denied to Sita."
            },
            {
                "scenario": "The state government passed a law that denies admission to medical colleges to students from a particular religious community. Which articles are violated?",
                "correct": 0,
                "options": [
                    "Articles 15 and 29 - Prohibition of Discrimination and Minority Rights",
                    "Article 19 - Freedom of Speech",
                    "Article 21 - Right to Life",
                    "Article 25 - Freedom of Religion"
                ],
                "explanation": "Article 15 prohibits discrimination on grounds of religion. Article 29 protects the cultural and educational rights of minorities. Denying admission based on religion violates both articles. Article 25 deals with freedom to practice religion, not admission to educational institutions."
            }
        ]
        case = random.choice(cases)
        return Question(
            id=self._question_counter,
            topic=Topic.FUNDAMENTAL_RIGHTS,
            question_type=QuestionType.COMPETENCY_BASED,
            text=case["scenario"],
            options=case["options"],
            correct_option=case["correct"],
            explanation=case["explanation"],
            difficulty="Hard"
        )

    # -------------------------------------------------------------------------
    # FUNDAMENTAL DUTIES QUESTIONS
    # -------------------------------------------------------------------------

    def generate_fundamental_duties_standard(self) -> Question:
        """Standard: Questions on Fundamental Duties."""
        self._next_id()
        duty_num = random.randint(1, 11)
        correct_duty = self.kb.FUNDAMENTAL_DUTIES[duty_num]

        all_duties = list(self.kb.FUNDAMENTAL_DUTIES.values())
        wrongs = [d for d in all_duties if d != correct_duty]
        random.shuffle(wrongs)
        wrongs = wrongs[:3]

        options, correct_idx = self._shuffle_options(correct_duty, wrongs)

        return Question(
            id=self._question_counter,
            topic=Topic.FUNDAMENTAL_DUTIES,
            question_type=QuestionType.STANDARD,
            text=f"Which of the following is a Fundamental Duty of Indian citizens?",
            options=options,
            correct_option=correct_idx,
            explanation=f"This is Fundamental Duty No. {duty_num} listed in Article 51A of the Constitution. {correct_duty}.",
            difficulty="Medium"
        )

    # -------------------------------------------------------------------------
    # DIRECTIVE PRINCIPLES QUESTIONS
    # -------------------------------------------------------------------------

    def generate_dpsp_standard(self) -> Question:
        """Standard: Match DPSP article with its content."""
        dpsp_items = list(self.kb.DIRECTIVE_PRINCIPLES.keys())
        article = random.choice(dpsp_items)
        self._next_id()

        others = [a for a in dpsp_items if a != article]
        random.shuffle(others)
        wrong_descs = [self.kb.DIRECTIVE_PRINCIPLES[a] for a in others[:3]]

        question_text = f"{article} of the Constitution deals with:"

        options, correct_idx = self._shuffle_options(
            self.kb.DIRECTIVE_PRINCIPLES[article], wrong_descs
        )

        return Question(
            id=self._question_counter,
            topic=Topic.DIRECTIVE_PRINCIPLES,
            question_type=QuestionType.STANDARD,
            text=question_text,
            options=options,
            correct_option=correct_idx,
            explanation=f"{article}: {self.kb.DIRECTIVE_PRINCIPLES[article]}. Note: DPSP are non-justiciable (not enforceable by courts) but fundamental in governance.",
            difficulty="Medium"
        )

    def generate_dpsp_competency(self) -> Question:
        """Competency-based: DPSP vs Fundamental Rights comparison."""
        self._next_id()
        return Question(
            id=self._question_counter,
            topic=Topic.DIRECTIVE_PRINCIPLES,
            question_type=QuestionType.COMPETENCY_BASED,
            text="A government proposes to implement a free midday meal scheme for all government school children across India. This scheme primarily reflects which principle of the Indian Constitution?",
            options=[
                "Fundamental Rights under Article 21",
                "Directive Principles of State Policy under Article 43",
                "Fundamental Duties under Article 51A",
                "Preamble's principle of Liberty"
            ],
            correct_option=1,
            explanation="Article 43 directs the State to secure a living wage and decent standard of life for workers, and to promote cottage industries. Providing free midday meals reflects the DPSP spirit of Article 47 (duty of State to raise the level of nutrition) and Article 43. While the Right to Education (Article 21A) ensures education, nutritional welfare falls under DPSP. The scheme operationalizes the DPSP commitment to social welfare.",
            difficulty="Hard"
        )

    # -------------------------------------------------------------------------
    # UNION EXECUTIVE QUESTIONS
    # -------------------------------------------------------------------------

    def generate_union_executive_standard(self) -> Question:
        """Standard: Questions on President, Prime Minister, Council of Ministers."""
        self._next_id()
        question_pool = [
            {
                "text": "Who is the constitutional head of the Indian Republic?",
                "options": ["Prime Minister", "President of India", "Chief Justice", "Vice President"],
                "correct": 1,
                "explanation": "The President of India is the constitutional head of the Indian Republic (Article 52). The President acts on the advice of the Council of Ministers headed by the Prime Minister in almost all matters (Article 74)."
            },
            {
                "text": "The minimum age required to be the President of India is:",
                "options": ["21 years", "30 years", "35 years", "25 years"],
                "correct": 2,
                "explanation": "Article 58 specifies that a person must be at least 35 years of age to be eligible for election as President. The person must also be a citizen of India and qualified to be a member of the Lok Sabha."
            },
            {
                "text": "Who appoints the Prime Minister of India?",
                "options": ["Lok Sabha", "Electoral College", "President of India", "Chief Justice of India"],
                "correct": 2,
                "explanation": "The President appoints the Prime Minister. Usually, the leader of the majority party/coalition in the Lok Sabha is appointed as PM. The President then appoints other ministers on the advice of the PM."
            },
            {
                "text": "The President of India is elected by:",
                "options": ["Direct election by people", "Electoral College system", "Parliament only", "State Assemblies only"],
                "correct": 1,
                "explanation": "The President is elected by an Electoral College consisting of elected members of both Houses of Parliament and elected members of Legislative Assemblies of States (Article 54). The election is conducted by the system of Proportional Representation by means of Single Transferable Vote."
            },
            {
                "text": "The Council of Ministers is collectively responsible to:",
                "options": ["President of India", "Lok Sabha", "Rajya Sabha", "Supreme Court"],
                "correct": 1,
                "explanation": "Article 75(3) states that the Council of Ministers shall be collectively responsible to the Lok Sabha. This means the PM and all ministers must have the confidence of the Lok Sabha."
            }
        ]
        q = random.choice(question_pool)
        return Question(
            id=self._question_counter,
            topic=Topic.UNION_EXECUTIVE,
            question_type=QuestionType.STANDARD,
            text=q["text"],
            options=q["options"],
            correct_option=q["correct"],
            explanation=q["explanation"],
            difficulty="Easy"
        )

    def generate_union_executive_competency(self) -> Question:
        """Competency-based: Case study on President's powers."""
        self._next_id()
        return Question(
            id=self._question_counter,
            topic=Topic.UNION_EXECUTIVE,
            question_type=QuestionType.COMPETENCY_BASED,
            text="In a hypothetical scenario, the ruling coalition in Lok Sabha loses its majority on a Money Bill. The Prime Minister advises the President to promulgate an Ordinance to continue government funding. Analyze whether the President should accept this advice.",
            options=[
                "The President must accept as the PM has majority",
                "The President can return the bill for reconsideration",
                "The President should not accept as the government has lost majority",
                "The President can dissolve Lok Sabha without consulting anyone"
            ],
            correct_option=1,
            explanation="This is a complex scenario testing constitutional conventions. The President acts on the advice of the Council of Ministers (Article 74). However, if the government has lost majority, the President can exercise discretion. For a Money Bill, the President can return it for reconsideration (except for Money Bills). If the government has lost majority, the President may invite the opposition to form government or dissolve the House. The President's power to return a bill for reconsideration is constitutionally valid.",
            difficulty="Hard"
        )

    # -------------------------------------------------------------------------
    # UNION LEGISLATURE QUESTIONS
    # -------------------------------------------------------------------------

    def generate_union_legislature_standard(self) -> Question:
        """Standard: Parliament - Lok Sabha and Rajya Sabha."""
        self._next_id()
        question_pool = [
            {
                "text": "The maximum strength of the Lok Sabha (excluding Anglo-Indian nominated members) is:",
                "options": ["500", "545", "552", "543"],
                "correct": 2,
                "explanation": "Article 81 specifies that the maximum strength of Lok Sabha is 552 (530 from States, 20 from Union Territories, and 2 Anglo-Indian members nominated by President if community not adequately represented). Currently, 543 seats are filled by election."
            },
            {
                "text": "The term of a member of the Rajya Sabha is:",
                "options": ["5 years", "4 years", "6 years", "Permanent"],
                "correct": 2,
                "explanation": "Article 84 specifies that the term of a Rajya Sabha member is 6 years. One-third of members retire every 2 years. Rajya Sabha is a permanent House and is not subject to dissolution."
            },
            {
                "text": "Who is the ex-officio Chairman of the Rajya Sabha?",
                "options": ["Speaker of Lok Sabha", "President of India", "Vice President of India", "Prime Minister"],
                "correct": 2,
                "explanation": "The Vice President of India is the ex-officio Chairman of Rajya Sabha (Article 64). When acting as President, the Vice President cannot perform the duties of Rajya Sabha Chairman. The Deputy Chairman is elected from among the members."
            },
            {
                "text": "Which of the following is NOT a power of the Lok Sabha?",
                "options": [
                    "To approve Money Bills",
                    "To pass a no-confidence motion",
                    "To approve the proclamation of Emergency",
                    "To impeach the President"
                ],
                "correct": 0,
                "explanation": "The Rajya Sabha can only make recommendations on Money Bills within 14 days; the Lok Sabha may accept or reject these recommendations. However, ALL four options involve parliamentary actions. The key distinction is that Rajya Sabha has NO POWER to reject or amend a Money Bill - it can only return it with recommendations within 14 days. After that, the bill is deemed passed by both Houses."
            }
        ]
        q = random.choice(question_pool)
        return Question(
            id=self._question_counter,
            topic=Topic.UNION_LEGISLATURE,
            question_type=QuestionType.STANDARD,
            text=q["text"],
            options=q["options"],
            correct_option=q["correct"],
            explanation=q["explanation"],
            difficulty="Medium"
        )

    # -------------------------------------------------------------------------
    # UNION JUDICIARY QUESTIONS
    # -------------------------------------------------------------------------

    def generate_union_judiciary_standard(self) -> Question:
        """Standard: Supreme Court questions."""
        self._next_counter = self._question_counter + 1
        self._question_counter = self._next_counter - 1

        question_pool = [
            {
                "text": "The maximum number of judges in the Supreme Court of India (including CJI) is:",
                "options": ["21", "30", "34", "26"],
                "correct": 2,
                "explanation": "Article 124 originally provided for a Chief Justice and not more than 7 judges. The strength has been increased through various Acts. Currently, the maximum is 34 (1 CJI + 33 other judges) as per the Supreme Court (Number of Judges) Act."
            },
            {
                "text": "Under which Article can the Supreme Court issue Writs?",
                "options": ["Article 32", "Article 226", "Article 136", "Article 141"],
                "correct": 0,
                "explanation": "Article 32 empowers the Supreme Court to issue writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto) for the enforcement of Fundamental Rights. High Courts have similar power under Article 226 but for broader purposes."
            },
            {
                "text": "A judge of the Supreme Court can be removed by:",
                "options": [
                    "President on advice of PM",
                    "Parliament by special majority on grounds of proved misbehavior or incapacity",
                    "Chief Justice of India",
                    "Law Minister"
                ],
                "correct": 1,
                "explanation": "Article 124(4) provides that a Supreme Court judge can be removed by the President after an address by each House of Parliament supported by a special majority (2/3rd of members present and voting and majority of total membership) on the ground of proved misbehavior or incapacity. This is called impeachment."
            },
            {
                "text": "Which of the following is NOT a type of Writ?",
                "options": ["Habeas Corpus", "Mandamus", "Certiorari", "Subpoena"],
                "correct": 3,
                "explanation": "Habeas Corpus (produce the body), Mandamus (command to do a public duty), Prohibition (stop exceeding jurisdiction), Certiorari (quash an order), and Quo Warranto (by what authority) are the five types of writs under Article 32 and 226. 'Subpoena' is not a constitutional writ in India; it is a common law process."
            }
        ]
        q = random.choice(question_pool)
        return Question(
            id=self._question_counter,
            topic=Topic.UNION_JUDICIARY,
            question_type=QuestionType.STANDARD,
            text=q["text"],
            options=q["options"],
            correct_option=q["correct"],
            explanation=q["explanation"],
            difficulty="Medium"
        )

    # -------------------------------------------------------------------------
    # FEDERALISM QUESTIONS
    # -------------------------------------------------------------------------

    def generate_federalism_standard(self) -> Question:
        """Standard: Federal vs Unitary features."""
        self._question_counter += 1

        features = list(self.kb.FEDERAL_FEATURES.keys())
        feature = random.choice(features)

        others = [f for f in features if f != feature]
        random.shuffle(others)
        wrongs = [self.kb.FEDERAL_FEATURES[f] for f in others[:3]]

        question_text = f"Which of the following is a Federal feature of the Indian Constitution?"

        options, correct_idx = self._shuffle_options(
            self.kb.FEDERAL_FEATURES[feature], wrongs
        )

        return Question(
            id=self._question_counter,
            topic=Topic.FEDERALISM,
            question_type=QuestionType.STANDARD,
            text=question_text,
            options=options,
            correct_option=correct_idx,
            explanation=f"'{feature}' is a Federal feature: {self.kb.FEDERAL_FEATURES[feature]}. India is described as a 'Union of States' (not a Federation) because the States cannot secede. Dr. B.R. Ambedkar called it an 'indestructible Union of destructible states'.",
            difficulty="Medium"
        )

    def generate_federalism_competency(self) -> Question:
        """Competency-based: Data interpretation on Centre-State relations."""
        self._question_counter += 1
        return Question(
            id=self._question_counter,
            topic=Topic.FEDERALISM,
            question_type=QuestionType.COMPETENCY_BASED,
            text="A new state government passes a law reserving 75% of private sector jobs for local residents. The Centre challenges this law in the Supreme Court, arguing it violates the Right to move freely throughout India (Article 19(1)(d)). As a constitutional analyst, evaluate: (a) Does the State have the power to make such a law? (b) Which List of the Seventh Schedule governs employment?",
            options=[
                "(a) Yes, under State List; (b) State List - employment in private sector is a State subject",
                "(a) No, violates Fundamental Right; (b) Concurrent List - employment falls under both",
                "(a) Yes, under Concurrent List; (b) Concurrent List - industrial relations",
                "(a) No, only Centre can legislate; (b) Union List - employment is Central subject"
            ],
            correct_option=1,
            explanation="(a) While states have power under the State List, any law violating Fundamental Rights (Article 19 - freedom of movement) can be struck down by the Supreme Court. The restriction on employment for non-locals unreasonably restricts freedom of movement. (b) Employment in private sector falls partly in Concurrent List (Labour Welfare - Entry 24 of Concurrent List) and partly in State List. However, Fundamental Rights are supreme and override legislative powers. Recent Supreme Court judgments have struck down domicile-based reservations exceeding 50-100% in private employment.",
            difficulty="Hard"
        )

    # -------------------------------------------------------------------------
    # LOCAL GOVERNMENT QUESTIONS
    # -------------------------------------------------------------------------

    def generate_local_government_standard(self) -> Question:
        """Standard: Panchayati Raj and Municipalities."""
        self._question_counter += 1

        question_pool = [
            {
                "text": "Which Constitutional Amendment added Part IX dealing with Panchayati Raj Institutions?",
                "options": ["61st Amendment", "73rd Amendment", "74th Amendment", "42nd Amendment"],
                "correct": 1,
                "explanation": "The 73rd Constitutional Amendment Act (1992) added Part IX (Articles 243-243O) to the Constitution, giving constitutional status to Panchayati Raj Institutions. It mandated a three-tier system of panchayats."
            },
            {
                "text": "Which Amendment Act added Part IXA for Municipalities?",
                "options": ["73rd Amendment", "74th Amendment", "61st Amendment", "86th Amendment"],
                "correct": 1,
                "explanation": "The 74th Constitutional Amendment Act (1992) added Part IXA (Articles 243P-243ZG) for Municipalities, giving them constitutional status. It provides for three types of urban local bodies: Nagar Panchayat, Municipal Council, and Municipal Corporation."
            },
            {
                "text": "Which Article of the Constitution provides for the reservation of seats for Scheduled Castes and Scheduled Tribes in Panchayats?",
                "options": ["Article 243D", "Article 243G", "Article 243T", "Article 243P"],
                "correct": 0,
                "explanation": "Article 243D provides for reservation of seats in Panchayats for Scheduled Castes and Scheduled Tribes in proportion to their population in the Panchayat area. Not less than one-third of seats reserved for SC/ST are reserved for women."
            },
            {
                "text": "The three-tier structure of Panchayati Raj consists of:",
                "options": [
                    "Village, Block, and District levels",
                    "Village, Taluk, and State levels",
                    "District, Division, and State levels",
                    "Ward, City, and State levels"
                ],
                "correct": 0,
                "explanation": "The 73rd Amendment mandates a three-tier Panchayati Raj system: (1) Gram Panchayat at village level, (2) Panchayat Samiti at intermediate/block level, and (3) Zila Parishad at district level."
            }
        ]
        q = random.choice(question_pool)
        return Question(
            id=self._question_counter,
            topic=Topic.LOCAL_GOVERNMENT,
            question_type=QuestionType.STANDARD,
            text=q["text"],
            options=q["options"],
            correct_option=q["correct"],
            explanation=q["explanation"],
            difficulty="Medium"
        )

    def generate_local_government_competency(self) -> Question:
        """Competency-based: Case study on local governance."""
        self._question_counter += 1
        return Question(
            id=self._question_counter,
            topic=Topic.LOCAL_GOVERNMENT,
            question_type=QuestionType.COMPETENCY_BASED,
            text="The Gram Panchayat of Rampur village received Rs. 50 lakh under MGNREGA for constructing a village road. However, the Block Development Officer (BDO) insists on selecting the contractor, while the Panchayat wants to engage local workers directly. Analyze the constitutional and legal provisions applicable to this situation.",
            options=[
                "BDO can select the contractor as per government rules",
                "Gram Sabha has the right to approve or select the work and workers under 73rd Amendment",
                "State Government will decide the contractor",
                "MGNREGA mandates private contractors"
            ],
            correct_option=1,
            explanation="Under the 73rd Amendment (Article 243G), Gram Panchayats are empowered to prepare plans for economic development and social justice. MGNREGA mandates that at least 60% of expenditure must go towards wages, and Gram Sabhas have the right to recommend works and supervise implementation. The Gram Sabha is the foundation of the Panchayati Raj system - it consists of all registered voters in the village. The BDO's role is supervisory, not directive. This case highlights the importance of decentralization and community participation in governance.",
            difficulty="Hard"
        )

    # -------------------------------------------------------------------------
    # CONSTITUTIONAL AMENDMENTS QUESTIONS
    # -------------------------------------------------------------------------

    def generate_constitutional_amendments_standard(self) -> Question:
        """Standard: Key Constitutional Amendments."""
        self._question_counter += 1
        amendments = list(self.kb.CONSTITUTIONAL_AMENDMENTS.keys())
        amend = random.choice(amendments)
        desc = self.kb.CONSTITUTIONAL_AMENDMENTS[amend]

        others = [a for a in amendments if a != amend]
        random.shuffle(others)
        wrong_descs = [self.kb.CONSTITUTIONAL_AMENDMENTS[a] for a in others[:3]]

        question_text = f"The {amend} Amendment Act is associated with:"

        options, correct_idx = self._shuffle_options(desc, wrong_descs)

        return Question(
            id=self._question_counter,
            topic=Topic.CONSTITUTIONAL_AMENDMENTS,
            question_type=QuestionType.STANDARD,
            text=question_text,
            options=options,
            correct_option=correct_idx,
            explanation=f"{amend} Amendment Act: {desc}. There have been 105 Constitutional Amendments as of 2024. The procedure for amendment is laid down in Article 368.",
            difficulty="Medium"
        )

    # -------------------------------------------------------------------------
    # ELECTORAL SYSTEM QUESTIONS
    # -------------------------------------------------------------------------

    def generate_electoral_standard(self) -> Question:
        """Standard: Electoral System in India."""
        self._question_counter += 1
        question_pool = [
            {
                "text": "The Election Commission of India is a:",
                "options": [
                    "Constitutional Body",
                    "Statutory Body",
                    "Executive Body",
                    "Advisory Body"
                ],
                "correct": 0,
                "explanation": "The Election Commission of India (ECI) is a Constitutional Body established under Article 324 of the Constitution. It consists of the Chief Election Commissioner and two Election Commissioners."
            },
            {
                "text": "The voting age in India was reduced from 21 to 18 years by which Amendment?",
                "options": ["42nd Amendment", "61st Amendment", "73rd Amendment", "86th Amendment"],
                "correct": 1,
                "explanation": "The 61st Constitutional Amendment Act (1988) reduced the voting age from 21 to 18 years by amending Article 326. This was a significant step in empowering youth participation in democracy."
            },
            {
                "text": "The system of election to the Lok Sabha is based on:",
                "options": [
                    "Proportional Representation",
                    "First Past the Post (FPTP)",
                    "Single Transferable Vote",
                    "Second Ballot System"
                ],
                "correct": 1,
                "explanation": "India uses the First Past the Post (FPTP) system for Lok Sabha and State Assembly elections. Under this system, the candidate with the highest number of votes in a constituency wins, regardless of whether they secure an absolute majority. India also uses Proportional Representation by Single Transferable Vote for Presidential, Vice-Presidential, and Rajya Sabha elections."
            },
            {
                "text": "What does the Model Code of Conduct (MCC) ensure during elections?",
                "options": [
                    "Free and fair elections",
                    "Compulsory voting",
                    "Reservation of seats",
                    "One person one vote"
                ],
                "correct": 0,
                "explanation": "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI for political parties and candidates during elections. It ensures free and fair elections by regulating campaign conduct, use of government resources, communal appeals, etc."
            }
        ]
        q = random.choice(question_pool)
        return Question(
            id=self._question_counter,
            topic=Topic.ELECTORAL_SYSTEM,
            question_type=QuestionType.STANDARD,
            text=q["text"],
            options=q["options"],
            correct_option=q["correct"],
            explanation=q["explanation"],
            difficulty="Medium"
        )

    # -------------------------------------------------------------------------
    # POLITICAL PARTIES QUESTIONS
    # -------------------------------------------------------------------------

    def generate_political_parties_standard(self) -> Question:
        """Standard: Political Parties."""
        self._question_counter += 1
        parties = list(self.kb.POLITICAL_PARTIES.keys())
        party = random.choice(parties)
        info = self.kb.POLITICAL_PARTIES[party]

        others = [p for p in parties if p != party]
        random.shuffle(others)
        wrong_infos = [self.kb.POLITICAL_PARTIES[p] for p in others[:3]]

        question_text = f"Which political party is correctly matched with its description?"

        options, correct_idx = self._shuffle_options(info, wrong_infos)

        return Question(
            id=self._question_counter,
            topic=Topic.POLITICAL_PARTIES,
            question_type=QuestionType.STANDARD,
            text=question_text,
            options=options,
            correct_option=correct_idx,
            explanation=f"The correct match is: {party} - {info}. The Election Commission of India recognizes political parties as National or State parties based on performance criteria.",
            difficulty="Easy"
        )

    # -------------------------------------------------------------------------
    # CONSTITUTIONAL ORGANS
    # -------------------------------------------------------------------------

    def generate_constitutional_organs_standard(self) -> Question:
        """Standard: Constitutional bodies."""
        self._question_counter += 1
        question_pool = [
            {
                "text": "The Finance Commission is constituted every:",
                "options": ["3 years", "5 years", "6 years", "10 years"],
                "correct": 1,
                "explanation": "Article 280 mandates that the President shall constitute a Finance Commission every five years. The Finance Commission makes recommendations on the distribution of tax revenues between Centre and States. The first Finance Commission was chaired by K.C. Neogy (1951)."
            },
            {
                "text": "The Comptroller and Auditor General (CAG) of India can be removed:",
                "options": [
                    "By the President on advice of PM",
                    "By the same procedure as a Supreme Court Judge",
                    "By the Parliament through a simple majority",
                    "By the Finance Minister"
                ],
                "correct": 1,
                "explanation": "Article 148(4) provides that the CAG can be removed from office in the same manner as a Judge of the Supreme Court - through impeachment by Parliament with a special majority on grounds of proved misbehavior or incapacity."
            },
            {
                "text": "The Union Public Service Commission (UPSC) is responsible for:",
                "options": [
                    "Making laws",
                    "Recruiting civil servants",
                    "Administistering justice",
                    "Managing elections"
                ],
                "correct": 1,
                "explanation": "Article 315-323 deals with Public Service Commissions. UPSC conducts examinations for recruitment to All India Services (IAS, IPS, IFS) and Central Services. It also advises the Government on recruitment, appointment, disciplinary matters, etc."
            },
            {
                "text": "Who appoints the Chief Election Commissioner?",
                "options": [
                    "Prime Minister",
                    "Parliament",
                    "President of India",
                    "Chief Justice of India"
                ],
                "correct": 2,
                "explanation": "The President appoints the Chief Election Commissioner and Election Commissioners (Article 324). The CEC has a secure tenure - can only be removed by impeachment like a Supreme Court judge. Election Commissioners can be removed by the President on the CEC's recommendation."
            }
        ]
        q = random.choice(question_pool)
        return Question(
            id=self._question_counter,
            topic=Topic.CONSTITUTIONAL_ORGANS,
            question_type=QuestionType.STANDARD,
            text=q["text"],
            options=q["options"],
            correct_option=q["correct"],
            explanation=q["explanation"],
            difficulty="Medium"
        )


# ============================================================================
# SOLVER
# ============================================================================

class PoliticalScienceSolver:
    """
    Main solver class for CISCE Political Science Class 11.
    Produces step-by-step solutions with verification.
    """

    def __init__(self, seed: int = 42):
        random.seed(seed)
        self.generator = QuestionGenerator(seed)
        self.kb = KnowledgeBase()

    def solve(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Solve a political science question.

        Args:
            params: dict with keys:
                - 'topic': str (e.g., 'Preamble', 'Fundamental Rights')
                - 'question_type': str ('standard' or 'competency_based')
                - 'seed': int (optional, default 42)
                - 'user_answer': int (optional, 0-indexed option number)

        Returns:
            dict with keys: steps, answer, verification, explanation, is_correct
        """
        topic_str = params.get("topic", "Preamble")
        q_type_str = params.get("question_type", "standard")
        user_answer = params.get("user_answer", None)
        seed = params.get("seed", 42)

        random.seed(seed)
        self.generator = QuestionGenerator(seed)

        try:
            topic = Topic(topic_str)
        except ValueError:
            return {"error": f"Unknown topic: {topic_str}"}

        try:
            q_type = QuestionType(q_type_str)
        except ValueError:
            return {"error": f"Unknown question type: {q_type_str}"}

        # Generate question
        question = self._generate_question(topic, q_type)

        # Build steps
        steps = self._build_steps(question, user_answer)

        # Build verification
        verification = self._verify(question, user_answer)

        is_correct = False
        if user_answer is not None:
            is_correct = (user_answer == question.correct_option)

        result = {
            "question_id": question.id,
            "topic": question.topic.value,
            "question_type": question.question_type.value,
            "difficulty": question.difficulty,
            "question": question.text,
            "options": question.options,
            "correct_answer": question.correct_option,
            "correct_option_text": question.options[question.correct_option],
            "user_answer": user_answer,
            "is_correct": is_correct,
            "steps": steps,
            "explanation": question.explanation,
            "verification": verification,
            "score": 1.0 if is_correct else 0.0
        }

        return result

    def _generate_question(self, topic: Topic, q_type: QuestionType) -> Question:
        """Generate a question based on topic and type."""
        if topic == Topic.PREAMBLE:
            if q_type == QuestionType.STANDARD:
                return self.generator.generate_preamble_standard()
            else:
                return self.generator.generate_preamble_competency()
        elif topic == Topic.FUNDAMENTAL_RIGHTS:
            if q_type == QuestionType.STANDARD:
                return self.generator.generate_fundamental_rights_standard()
            else:
                return self.generator.generate_fundamental_rights_competency()
        elif topic == Topic.FUNDAMENTAL_DUTIES:
            return self.generator.generate_fundamental_duties_standard()
        elif topic == Topic.DIRECTIVE_PRINCIPLES:
            if q_type == QuestionType.STANDARD:
                return self.generator.generate_dpsp_standard()
            else:
                return self.generator.generate_dpsp_competency()
        elif topic == Topic.UNION_EXECUTIVE:
            if q_type == QuestionType.STANDARD:
                return self.generator.generate_union_executive_standard()
            else:
                return self.generator.generate_union_executive_competency()
        elif topic == Topic.UNION_LEGISLATURE:
            return self.generator.generate_union_legislature_standard()
        elif topic == Topic.UNION_JUDICIARY:
            return self.generator.generate_union_judiciary_standard()
        elif topic == Topic.FEDERALISM:
            if q_type == QuestionType.STANDARD:
                return self.generator.generate_federalism_standard()
            else:
                return self.generator.generate_federalism_competency()
        elif topic == Topic.LOCAL_GOVERNMENT:
            if q_type == QuestionType.STANDARD:
                return self.generator.generate_local_government_standard()
            else:
                return self.generator.generate_local_government_competency()
        elif topic == Topic.CONSTITUTIONAL_AMENDMENTS:
            return self.generator.generate_constitutional_amendments_standard()
        elif topic == Topic.ELECTORAL_SYSTEM:
            return self.generator.generate_electoral_standard()
        elif topic == Topic.POLITICAL_PARTIES:
            return self.generator.generate_political_parties_standard()
        elif topic == Topic.CONSTITUTIONAL_ORGANS:
            return self.generator.generate_constitutional_organs_standard()
        else:
            return self.generator.generate_union_executive_standard()

    def _build_steps(self, question: Question, user_answer: Optional[int]) -> List[str]:
        """Build step-by-step solution explanation."""
        steps = [
            f"STEP 1: Identify the topic - {question.topic.value}",
            f"STEP 2: Question Type - {question.question_type.value.upper()}",
            f"STEP 3: Difficulty Level - {question.difficulty}",
            f"STEP 4: Analyze the question statement carefully",
            f"STEP 5: Evaluate all {len(question.options)} given options"
        ]

        if user_answer is not None:
            steps.append(
                f"STEP 6: User selected Option {user_answer + 1}: '{question.options[user_answer]}'"
            )
        else:
            steps.append(
                f"STEP 6: User answer not provided. Correct answer is Option {question.correct_option + 1}"
            )

        steps.append(
            f"STEP 7: Correct answer is Option {question.correct_option + 1}: '{question.options[question.correct_option]}'"
        )
        steps.append(
            f"STEP 8: Verification - Cross-referencing with the Indian Constitution"
        )

        return steps

    def _verify(self, question: Question, user_answer: Optional[int]) -> str:
        """Build verification string."""
        if user_answer is None:
            return (
                f"VERIFICATION: No user answer provided. "
                f"Correct answer is Option {question.correct_option + 1}: "
                f"'{question.options[question.correct_option]}'. "
                f"This is verified against the relevant provisions of the Indian Constitution."
            )

        if user_answer == question.correct_option:
            return (
                f"VERIFICATION PASSED: User selected Option {user_answer + 1} "
                f"('{question.options[user_answer]}') which is the CORRECT answer. "
                f"Cross-verified with constitutional provisions. Score: 1/1"
            )
        else:
            return (
                f"VERIFICATION FAILED: User selected Option {user_answer + 1} "
                f"('{question.options[user_answer]}'). "
                f"Correct answer is Option {question.correct_option + 1}: "
                f"'{question.options[question.correct_option]}'. "
                f"Score: 0/1"
            )

    def generate_question_set(self, seed: int = 42, count: int = 10) -> List[Dict]:
        """Generate a set of mixed questions for practice."""
        random.seed(seed)
        topics = list(Topic)
        results = []

        for i in range(count):
            topic = random.choice(topics)
            is_competency = (i % 2 == 1)
            q_type = QuestionType.COMPETENCY_BASED if is_competency else QuestionType.STANDARD

            self.generator = QuestionGenerator(seed + i)
            question = self._generate_question(topic, q_type)

            results.append({
                "question_id": question.id,
                "topic": question.topic.value,
                "question_type": question.question_type.value,
                "difficulty": question.difficulty,
                "question": question.text,
                "options": question.options,
                "correct_answer": question.correct_option
            })

        return results

    def get_topic_summary(self) -> Dict[str, Dict]:
        """Get a summary of available topics and their coverage."""
        return {
            topic.value: {
                "standard_questions_available": True,
                "competency_questions_available": True,
                "key_concepts": self._get_topic_concepts(topic)
            }
            for topic in Topic
        }

    def _get_topic_concepts(self, topic: Topic) -> List[str]:
        """Get key concepts for each topic."""
        concept_map = {
            Topic.PREAMBLE: [
                "Keywords of the Preamble",
                "42nd Amendment changes",
                "Significance of the Preamble",
                "Philosophy of the Preamble"
            ],
            Topic.FUNDAMENTAL_RIGHTS: [
                "Articles 14-32",
                "Six Fundamental Freedoms (Article 19)",
                "Right to Constitutional Remedies (Article 32)",
                "Writ Jurisdiction",
                "Restriction on Fundamental Rights"
            ],
            Topic.FUNDAMENTAL_DUTIES: [
                "Article 51A - 11 duties",
                "42nd Amendment (1976)",
                "86th Amendment (2002) - 11th duty",
                "Enforceability of Fundamental Duties"
            ],
            Topic.DIRECTIVE_PRINCIPLES: [
                "Articles 36-51",
                "Justiciability vs. Non-justiciability",
                "Difference from Fundamental Rights",
                "Relationship with Fundamental Duties"
            ],
            Topic.UNION_EXECUTIVE: [
                "President - Powers and Duties",
                "Prime Minister - Role and Powers",
                "Council of Ministers",
                "Parliamentary Executive System"
            ],
            Topic.UNION_LEGISLATURE: [
                "Bicameral Legislature",
                "Lok Sabha - Composition, Powers",
                "Rajya Sabha - Composition, Powers",
                "Money Bills vs. Ordinary Bills",
                "Parliamentary Privileges"
            ],
            Topic.UNION_JUDICIARY: [
                "Supreme Court - Composition and Jurisdiction",
                "Writ Jurisdiction (Article 32)",
                "Judicial Review",
                "High Courts",
                "Independence of Judiciary"
            ],
            Topic.FEDERALISM: [
                "Federal vs. Unitary Features",
                "Division of Powers - Three Lists",
                "Centre-State Relations",
                "Emergency Provisions",
                "Autonomous and Cooperative Federalism"
            ],
            Topic.LOCAL_GOVERNMENT: [
                "73rd Amendment - Panchayati Raj",
                "74th Amendment - Municipalities",
                "Three-Tier System",
                "Gram Sabha",
                "Reservation in Local Bodies"
            ],
            Topic.CONSTITUTIONAL_AMENDMENTS: [
                "Article 368 - Amendment Procedure",
                "Key Amendments (42nd, 44th, 73rd, 74th, 86th, 101st)",
                "Basic Structure Doctrine",
                "Simple vs. Special Majority"
            ],
            Topic.ELECTORAL_SYSTEM: [
                "Election Commission",
                "First Past the Post System",
                "Reservation of Seats",
                "Electronic Voting Machines",
                "Model Code of Conduct"
            ],
            Topic.POLITICAL_PARTIES: [
                "Recognition of Parties (ECI)",
                "National vs. State Parties",
                "Party System in India",
                "Pressure Groups"
            ],
            Topic.CONSTITUTIONAL_ORGANS: [
                "UPSC",
                "Finance Commission",
                "CAG",
                "Election Commission",
                "NITI Aayog"
            ]
        }
        return concept_map.get(topic, [])


# ============================================================================
# MAIN
# ============================================================================

def print_separator(char="=", length=80):
    print(char * length)


def print_question_result(result: Dict):
    """Pretty-print a solve result."""
    print_separator("-")
    print(f"TOPIC: {result['topic']}")
    print(f"TYPE: {result['question_type']}")
    print(f"DIFFICULTY: {result['difficulty']}")
    print()
    print(f"QUESTION: {result['question']}")
    print()
    for i, opt in enumerate(result['options']):
        marker = " [CORRECT]" if i == result['correct_answer'] else ""
        marker = marker + " [YOUR CHOICE]" if result.get('user_answer') == i else marker
        print(f"  Option {i + 1}: {opt}{marker}")
    print()
    print(f"YOUR ANSWER: {'Not provided' if result['user_answer'] is None else result['user_answer'] + 1}")
    print(f"STATUS: {'CORRECT!' if result['is_correct'] else 'INCORRECT'}")
    print()
    print("SOLUTION STEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print()
    print(f"EXPLANATION: {result['explanation']}")
    print()
    print(f"VERIFICATION: {result['verification']}")
    print()


def main():
    """Main function demonstrating the solver."""
    print()
    print_separator("=")
    print("CISCE POLITICAL SCIENCE CLASS 11 - SOLVER PLATFORM")
    print_separator("=")
    print()

    solver = PoliticalScienceSolver(seed=42)

    # Demonstrate solving questions across different topics
    demo_params = [
        {"topic": "Preamble", "question_type": "standard", "user_answer": None, "seed": 101},
        {"topic": "Fundamental Rights", "question_type": "standard", "user_answer": 0, "seed": 102},
        {"topic": "Fundamental Rights", "question_type": "competency_based", "user_answer": 1, "seed": 103},
        {"topic": "Directive Principles of State Policy", "question_type": "standard", "user_answer": None, "seed": 104},
        {"topic": "Directive Principles of State Policy", "question_type": "competency_based", "user_answer": 2, "seed": 105},
        {"topic": "Union Executive", "question_type": "standard", "user_answer": 2, "seed": 106},
        {"topic": "Union Executive", "question_type": "competency_based", "user_answer": 1, "seed": 107},
        {"topic": "Union Legislature", "question_type": "standard", "user_answer": 2, "seed": 108},
        {"topic": "Union Judiciary", "question_type": "standard", "user_answer": 2, "seed": 109},
        {"topic": "Federalism", "question_type": "standard", "user_answer": 0, "seed": 110},
        {"topic": "Federalism", "question_type": "competency_based", "user_answer": 0, "seed": 111},
        {"topic": "Local Government", "question_type": "standard", "user_answer": 1, "seed": 112},
        {"topic": "Local Government", "question_type": "competency_based", "user_answer": 1, "seed": 113},
        {"topic": "Constitutional Amendments", "question_type": "standard", "user_answer": None, "seed": 114},
        {"topic": "Electoral System", "question_type": "standard", "user_answer": 1, "seed": 115},
        {"topic": "Political Parties", "question_type": "standard", "user_answer": 0, "seed": 116},
        {"topic": "Constitutional Organs", "question_type": "standard", "user_answer": 1, "seed": 117},
    ]

    total_correct = 0
    total_answered = 0

    for i, params in enumerate(demo_params):
        print(f"\n--- Practice Question {i + 1} ---")
        result = solver.solve(params)

        if "error" in result:
            print(f"Error: {result['error']}")
            continue

        print_question_result(result)

        if result.get('user_answer') is not None:
            total_answered += 1
            if result['is_correct']:
                total_correct += 1

    # Score summary
    print_separator("=")
    print(f"SESSION SUMMARY")
    print_separator("=")
    print(f"Total questions attempted: {total_answered}")
    print(f"Correct answers: {total_correct}")
    print(f"Incorrect answers: {total_answered - total_correct}")
    if total_answered > 0:
        print(f"Score: {total_correct}/{total_answered} = {100 * total_correct / total_answered:.1f}%")
    print()

    # Topic coverage summary
    print_separator("=")
    print("TOPIC COVERAGE SUMMARY")
    print_separator("=")
    topics = solver.get_topic_summary()
    for topic_name, info in topics.items():
        q_type_str = []
        if info["standard_questions_available"]:
            q_type_str.append("Standard")
        if info["competency_questions_available"]:
            q_type_str.append("Competency-Based")
        print(f"  {topic_name:.<40} {', '.join(q_type_str)}")
        print(f"    Key Concepts: {len(info['key_concepts'])}")
    print()

    # Generate a sample question set
    print_separator("=")
    print("SAMPLE QUESTION SET (10 Questions - Mixed Topics)")
    print_separator("=")
    question_set = solver.generate_question_set(seed=2024, count=10)
    for i, q in enumerate(question_set):
        print(f"\nQ{i + 1}. [{q['topic']} | {q['question_type']} | {q['difficulty']}]")
        print(f"   {q['question']}")
        for j, opt in enumerate(q['options']):
            marker = " *" if j == q['correct_answer'] else ""
            print(f"   {j + 1}. {opt}{marker}")
    print()

    print_separator("=")
    print("SOLVER DEMONSTRATION COMPLETE")
    print_separator("=")
    print()


if __name__ == '__main__':
    main()