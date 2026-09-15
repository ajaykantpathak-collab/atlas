"""
CISCE History & Civics Class 12 — Deterministic Question Generator
Syllabus: August Offer (1940) | Cripps Mission (1942) | Civil Rights Movement USA
         | Arab Nationalism & Zionism
Author: CISCE Content Engine
"""

import random
import hashlib
import math
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from enum import Enum


# ---------------------------------------------------------------------------
# Enumerations
# ---------------------------------------------------------------------------

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Topic(Enum):
    AUGUST_OFFER = "august_offer_1940"
    CRIPPS_MISSION = "cripps_mission_1942"
    CIVIL_RIGHTS_USA = "civil_rights_usa"
    ARAB_NATIONALISM_ZIONISM = "arab_nationalism_zionism"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class ContextType(Enum):
    STANDARD = "standard"
    COMPETENCY_INDIAN = "competency_indian"


# ---------------------------------------------------------------------------
# Data Classes
# ---------------------------------------------------------------------------

@dataclass
class Question:
    id: str
    type: str
    topic: str
    difficulty: str
    context_type: str
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    blanks: Optional[List[str]] = None  # indices of blanks for fill-blank
    numerical_answer: Optional[float] = None
    numerical_unit: Optional[str] = None
    marks: int = 1


@dataclass
class SolveResult:
    answer: Any
    steps: List[str]
    verification: str
    is_correct: bool


# ---------------------------------------------------------------------------
# Deterministic seeded helper
# ---------------------------------------------------------------------------

def make_seeded_rng(seed: int) -> random.Random:
    """Return a Random instance bound to the given integer seed."""
    return random.Random(seed)


def _stable_hash(s: str) -> int:
    """Deterministic integer hash for string-based IDs."""
    return int(hashlib.md5(s.encode()).hexdigest()[:12], 16)


# ---------------------------------------------------------------------------
# Question Bank
# ---------------------------------------------------------------------------

# Each entry: (question_text, options_or_None, answer, explanation, difficulty, context_type, marks)
_MCQ_BANK: List[Dict] = [
    # --- August Offer (1940) ---
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.MCQ.value,
        "question": "Who was the Viceroy of India who announced the August Offer in 1940?",
        "options": ["Lord Mountbatten", "Lord Linlithgow", "Lord Wavell", "Lord Irwin"],
        "answer": 1,
        "explanation": (
            "Lord Linlithgow was the Viceroy of India from 1936 to 1943. "
            "He announced the August Offer on 8 August 1940, during the critical "
            "phase of World War II following the fall of France to Nazi Germany in June 1940."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "The August Offer (1940) promised dominion status to India after which event?"
        ),
        "options": [
            "Immediately after the announcement",
            "After the end of World War II",
            "After India's first general elections",
            "After partition",
        ],
        "answer": 1,
        "explanation": (
            "The August Offer promised dominion status to India only AFTER World War II. "
            "This delay was the primary reason the Congress rejected it, as it offered "
            "no immediate transfer of power and effectively postponed self-government indefinitely."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Which political party/platform was consulted in the August Offer through "
            "the expansion of the Viceroy's Executive Council?"
        ),
        "options": [
            "The Muslim League alone",
            "The Congress alone",
            "All major Indian political parties",
            "Only the princely states",
        ],
        "answer": 2,
        "explanation": (
            "The August Offer expanded the Viceroy's Executive Council to include "
            "representatives of all major Indian political parties — Congress, Muslim League, "
            "and others. However, the Congress rejected this as inadequate since real power "
            "remained with the Viceroy."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "The August Offer was announced in August 1940 primarily because:"
        ),
        "options": [
            "Britain wanted to celebrate Indian independence",
            "The fall of France made Britain desperate for Indian wartime support",
            "Congress demanded immediate independence",
            "The Muslim League demanded Pakistan",
        ],
        "answer": 1,
        "explanation": (
            "The August Offer was a wartime concession. After Nazi Germany defeated France "
            "in June 1940, Britain stood alone against Hitler and desperately needed Indian "
            "support — both troops and resources. Hence, Lord Linlithgow offered limited "
            "constitutional reforms to win Indian cooperation."
        ),
        "difficulty": Difficulty.MARD.value if False else Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    # --- Cripps Mission (1942) ---
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Sir Stafford Cripps arrived in Delhi on 22 March 1942. "
            "Which recent military event heightened the urgency of his mission?"
        ),
        "options": [
            "The fall of France",
            "The fall of Singapore and Rangoon to Japanese forces",
            "The Battle of Britain",
            "The invasion of Normandy",
        ],
        "answer": 1,
        "explanation": (
            "By March 1942, Japan had rapidly advanced through Southeast Asia, capturing "
            "Singapore on 15 February 1942 and Rangoon on 7 March 1942. The British were "
            "panicking about the security of India itself, hence Cripps was sent urgently "
            "to secure Indian cooperation."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.MCQ.value,
        "question": "Sir Stafford Cripps was ideologically associated with which British political group?",
        "options": [
            "The Conservative Party",
            "The Labour Party",
            "The Liberal Party",
            "The Communist Party",
        ],
        "answer": 1,
        "explanation": (
            "Sir Stafford Cripps was a prominent member of the British Labour Party and "
            "was personally sympathetic to Indian aspirations for independence. He had "
            "previously visited India in 1939 and was considered friendly to the Congress. "
            "Churchill chose him precisely because of this reputation."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Which provision in the Cripps proposals gave provinces the right to"
            " frame their own constitutions?"
        ),
        "options": [
            "Dominion status clause",
            "Right to secede clause",
            "Constituent Assembly clause",
            "Princely states clause",
        ],
        "answer": 1,
        "explanation": (
            "The Cripps proposals allowed any province unwilling to accept the new "
            "constitution to 'opt out' and frame its own constitution. This 'right to "
            "secede' was viewed by the Congress as a direct threat to India's unity — "
            "it effectively legitimised the demand for Pakistan and made Indian unity "
            "contingent on voluntary agreement."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Mahatma Gandhi described the Cripps Mission proposals as:"
        ),
        "options": [
            "'A generous gift to India'",
            "'A post-dated cheque on a crashing bank'",
            "'The first step towards Swaraj'",
            "'An honourable settlement'",
        ],
        "answer": 1,
        "explanation": (
            "Gandhi famously dismissed the Cripps proposals as 'a post-dated cheque on "
            "a crashing bank.' His metaphor meant that Britain's promise of future "
            "dominion status was worthless — like a cheque from a bank on the verge of "
            "collapse — since Britain itself was fighting for survival and could not "
            "guarantee anything."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "The Cripps Mission was ultimately rejected by the Congress on which date?"
        ),
        "options": ["22 March 1942", "11 April 1942", "8 August 1942", "15 August 1947"],
        "answer": 1,
        "explanation": (
            "The Congress Working Committee formally rejected the Cripps proposals "
            "on 11 April 1942. The Muslim League also rejected it because it did not "
            "concede Pakistan outright — it only offered the right to secede from a "
            "future Constituent Assembly, not an outright partition."
        ),
        "difficulty": Difficulty.MARD.value if False else Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "An Indian student today learns that the Cripps Mission failed. "
            "Which of the following BEST explains the Congress's core objection?"
        ),
        "options": [
            "Cripps was not a Labour minister",
            "No real transfer of power during the war and the 'right to secede' threatened unity",
            "The offer came too early in the war",
            "India was not invited to the Atlantic Charter",
        ],
        "answer": 1,
        "explanation": (
            "The Congress's objections were twofold: (1) No real transfer of power DURING "
            "the war — only a promise of dominion status after it, and (2) the 'right to "
            "secede' clause fragmented India's unity by giving provinces the right to leave "
            "the proposed Constituent Assembly. Both made the offer unacceptable."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 1,
    },
    # --- Civil Rights Movement USA ---
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "The US Supreme Court ruling in Brown v. Board of Education (1954) declared that:"
        ),
        "options": [
            "Racial segregation in public schools was constitutional",
            "Racial segregation in public schools was unconstitutional",
            "Plessy v. Ferguson should be reaffirmed",
            "States could set their own segregation laws freely",
        ],
        "answer": 1,
        "explanation": (
            "In a unanimous decision on 17 May 1954, the Supreme Court ruled that "
            "'separate educational facilities are inherently unequal,' overturning the "
            "Plessy v. Ferguson (1896) doctrine of 'separate but equal.' Chief Justice "
            "Earl Warren delivered the opinion, which became the legal foundation for "
            "the entire Civil Rights Movement."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Rosa Parks was arrested on 1 December 1955 for which action?"
        ),
        "options": [
            "Leading a voter registration drive",
            "Refusing to give up her bus seat to a white passenger",
            "Organising a sit-in at a lunch counter",
            "Participating in the March on Washington",
        ],
        "answer": 1,
        "explanation": (
            "On 1 December 1955, Rosa Parks, a 42-year-old Black seamstress and NAACP "
            "activist, refused to surrender her seat to a white passenger on a Montgomery, "
            "Alabama bus. Her arrest sparked the Montgomery Bus Boycott, the first mass "
            "action of the modern Civil Rights Movement."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.MCQ.value,
        "question": "Dr. Martin Luther King Jr. was pastor of which church in Montgomery?",
        "options": [
            "Ebenezer Baptist Church, Atlanta",
            "Dexter Avenue Baptist Church, Montgomery",
            "First Baptist Church, Birmingham",
            "16th Street Baptist Church",
        ],
        "answer": 1,
        "explanation": (
            "At age 26, Dr. Martin Luther King Jr. became the pastor of Dexter Avenue "
            "Baptist Church in Montgomery, Alabama, in 1954. This church became the "
            "headquarters and launching pad for the Montgomery Bus Boycott (1955–1956). "
            "King was just 26 years old when he led the boycott."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.MCQ.value,
        "question": "Dr. King's philosophy of nonviolent resistance was inspired by:",
        "options": [
            "Karl Marx",
            "Mahatma Gandhi",
            "Nelson Mandela",
            "John F. Kennedy",
        ],
        "answer": 1,
        "explanation": (
            "Dr. King studied Mahatma Gandhi's philosophy of satyagraha (nonviolent "
            "resistance) and adapted it to the American civil rights struggle. King "
            "visited India in 1959 to deepen his understanding of Gandhian methods. "
            "The Montgomery Bus Boycott was explicitly modelled on Gandhi's principles."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "How many days did the Montgomery Bus Boycott last (1955-1956)?"
        ),
        "options": ["100 days", "281 days", "381 days", "500 days"],
        "answer": 2,
        "explanation": (
            "The Montgomery Bus Boycott lasted 381 days, from 5 December 1955 to "
            "20 December 1956. The boycott crippled the bus system financially and "
            "demonstrated the economic power of the Black community. It ended when "
            "the Supreme Court ruled bus segregation unconstitutional in Browder v. Gayle."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "The Southern Christian Leadership Conference (SCLC) was founded in which year?"
        ),
        "options": ["1954", "1955", "1957", "1960"],
        "answer": 2,
        "explanation": (
            "Dr. King founded the Southern Christian Leadership Conference (SCLC) in "
            "January 1957 in Atlanta, Georgia. The SCLC was formed to coordinate and "
            "sustain nonviolent protests across the Southern states, with King as its "
            "first president. It organised the Birmingham Campaign (1963) and the "
            "Selma to Montgomery marches (1965)."
        ),
        "difficulty": Difficulty.MARD.value if False else Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "The 'separate but equal' doctrine that enforced Jim Crow laws was "
            "established by which Supreme Court case?"
        ),
        "options": [
            "Brown v. Board of Education (1954)",
            "Plessy v. Ferguson (1896)",
            "Dred Scott v. Sandford (1857)",
            "Roe v. Wade (1973)",
        ],
        "answer": 1,
        "explanation": (
            "Plessy v. Ferguson (1896) upheld a Louisiana law requiring racial segregation "
            "in railway cars, establishing the 'separate but equal' doctrine that became "
            "the legal basis for Jim Crow laws across the American South for nearly "
            "60 years. Brown v. Board of Education (1954) finally overturned it."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    # --- Arab Nationalism & Zionism ---
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Who is considered the founder of modern political Zionism and convened "
            "its First Congress?"
        ),
        "options": [
            "David Ben-Gurion",
            "Theodor Herzl",
            "Chaim Weizmann",
            "Golda Meir",
        ],
        "answer": 1,
        "explanation": (
            "Theodor Herzl, an Austro-Hungarian Jewish journalist, is widely regarded "
            "as the founder of modern political Zionism. He convened the First Zionist "
            "Congress in Basel, Switzerland, in August 1897 and authored 'Der Judenstaat' "
            "(The Jewish State, 1896), arguing that Jews needed their own nation-state."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.MCQ.value,
        "question": "The First Zionist Congress was held in which city and year?",
        "options": [
            "Vienna, 1895",
            "Basel, 1897",
            "Jerusalem, 1901",
            "London, 1905",
        ],
        "answer": 1,
        "explanation": (
            "The First Zionist Congress took place in Basel, Switzerland, from 29 to "
            "31 August 1897, with about 200 delegates. Herzl wrote in his diary that "
            "at Basel 'I founded the Jewish State.' The Congress adopted the Basel "
            "Programme, declaring Zionism's aim as 'the establishment of a home for "
            "the Jewish people in Palestine secured by public law.'"
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Arab nationalism primarily sought:"
        ),
        "options": [
            "Establishment of a Jewish state",
            "Political unity and independence of Arabic-speaking peoples from Ottoman and European rule",
            "Expansion of the Ottoman Empire",
            "Colonial rule over North Africa",
        ],
        "answer": 1,
        "explanation": (
            "Arab nationalism emerged in the late 19th century as a movement seeking "
            "the political unity and independence of Arabic-speaking peoples from the "
            "declining Ottoman Empire and later from European colonial rule. Intellectuals "
            "like Najib Azoury and journalists in Beirut and Cairo led the cultural "
            "and political awakening."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "The book 'Le Réveil de la Nation Arabe' (1905) was written by:"
        ),
        "options": [
            "Theodor Herzl",
            "Najib Azoury",
            "Sharif Husayn",
            "T.E. Lawrence",
        ],
        "answer": 1,
        "explanation": (
            "Najib Azoury, a Lebanese-Christian Ottoman official and intellectual, "
            "wrote 'Le Réveil de la Nation Arabe' (The Awakening of the Arab Nation) "
            "in 1905 while living in France. Remarkably, he predicted that Arab-Jewish "
            "conflict would arise in Palestine due to competing nationalist aspirations "
            "— a prescient observation made decades before the conflict intensified."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Jewish immigration to Palestine (known as aliyah) increased Jewish population "
            "from under 30,000 in 1880 to approximately how many by 1914?"
        ),
        "options": ["30,000", "50,000", "80,000", "150,000"],
        "answer": 2,
        "explanation": (
            "By 1914, approximately 80,000 Jews had immigrated to Palestine through "
            "the Zionist aliyah (Hebrew for 'ascent' or 'immigration'). This demographic "
            "shift alarmed the Arab majority population, who feared dispossession from "
            "their own land — intensifying Arab opposition to Zionism."
        ),
        "difficulty": Difficulty.MARD.value if False else Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "Zionism should be best understood as a:"
        ),
        "options": [
            "Religious movement",
            "Political nationalist movement seeking a Jewish homeland",
            "Cultural exchange programme",
            "Military alliance",
        ],
        "answer": 1,
        "explanation": (
            "Zionism is a political nationalist movement, NOT a religion. It was founded "
            "by Theodor Herzl in 1897 to address European antisemitism through the creation "
            "of a Jewish nation-state. Many Jews were not Zionists (e.g., ultra-Orthodox "
            "groups who believed Jewish return to Israel must await the Messiah), "
            "demonstrating that Zionism and Judaism are distinct phenomena."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.MCQ.value,
        "question": (
            "An Indian student studying the Arab Revolt of 1916 under Sharif Husayn "
            "would recognise it as an example of:"
        ),
        "options": [
            "A religious movement",
            "Arab nationalism seeking independence from Ottoman rule",
            "A Zionist initiative",
            "A European colonial project",
        ],
        "answer": 1,
        "explanation": (
            "The Arab Revolt (1916) led by Sharif Husayn ibn Ali of Mecca was a direct "
            "expression of Arab nationalism. The Arabs sought independence and a unified "
            "Arab state from the Ottoman Empire. The British supported the revolt with "
            "the McMahon-Husayn Correspondence, promising Arab independence — a promise "
            "they later appeared to betray with the Balfour Declaration (1917)."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 1,
    },
]

_FILL_BLANK_BANK: List[Dict] = [
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "The August Offer was announced by Lord ________ in August ________."
        ),
        "blanks": ["Linlithgow", "1940"],
        "answer": ["Linlithgow", "1940"],
        "explanation": (
            "Lord Victor Alexander John Hope, 2nd Marquess of Linlithgow, served as "
            "Viceroy of India from 1936 to 1943. He announced the August Offer on "
            "8 August 1940."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "The August Offer promised India the status of a ________ after World War II."
        ),
        "blanks": ["dominion"],
        "answer": ["dominion"],
        "explanation": (
            "Dominion status meant India would be a self-governing member of the British "
            "Commonwealth, like Canada or Australia — fully autonomous in domestic affairs "
            "but still recognising the British monarch as head of state."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "Sir ________ Cripps led the Cripps Mission to India in ________."
        ),
        "blanks": ["Stafford", "1942"],
        "answer": ["Stafford", "1942"],
        "explanation": (
            "Sir Stafford Cripps, a British Labour politician and barrister, was sent "
            "by Prime Minister Winston Churchill to India in March 1942 to negotiate "
            "Indian support for the war in exchange for a promise of post-war self-government."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "The Cripps Mission arrived in Delhi on ________ March ________."
        ),
        "blanks": ["22", "1942"],
        "answer": ["22", "1942"],
        "explanation": (
            "Cripps arrived in Delhi on 22 March 1942, just weeks after Japan's rapid "
            "advances in Southeast Asia — Singapore fell on 15 February 1942, and Rangoon "
            "on 7 March 1942 — creating panic in British India about Japanese invasion."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "Gandhi described the Cripps proposals as 'a post-dated ________ on a ________ bank.'"
        ),
        "blanks": ["cheque", "crashing"],
        "answer": ["cheque", "crashing"],
        "explanation": (
            "Gandhi's famous metaphor 'a post-dated cheque on a crashing bank' captured "
            "his contempt for Cripps' promise of post-war dominion status. He argued that "
            "a country fighting for its own survival (Britain) could not guarantee anything "
            "for the future, making the cheque worthless."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "The Supreme Court ruled racial segregation in public schools unconstitutional "
            "in ________ v. Board of Education (________)."
        ),
        "blanks": ["Brown", "1954"],
        "answer": ["Brown", "1954"],
        "explanation": (
            "Brown v. Board of Education of Topeka (1954) was a landmark unanimous "
            "Supreme Court decision. The case consolidated five separate cases from "
            "different states, all challenging segregated schooling. Chief Justice "
            "Earl Warren wrote the opinion."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "The Montgomery Bus Boycott lasted ________ days, ending on 20 December 1956."
        ),
        "blanks": ["381"],
        "answer": ["381"],
        "explanation": (
            "The boycott lasted exactly 381 days — a remarkable feat of sustained "
            "organising, discipline, and solidarity by the Black community of Montgomery, "
            "who walked, carpooled, or used Black-owned taxis rather than ride the buses."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "Dr. King founded the ________ Christian Leadership Conference (SCLC) in ________."
        ),
        "blanks": ["Southern", "1957"],
        "answer": ["Southern", "1957"],
        "explanation": (
            "The Southern Christian Leadership Conference (SCLC) was founded in January "
            "1957 in Atlanta, Georgia. It united Black churches across the South as the "
            "organising engine for nonviolent direct-action campaigns, with Dr. King as "
            "its first president."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "Theodor ________ convened the First Zionist Congress in ________ in 1897."
        ),
        "blanks": ["Herzl", "Basel"],
        "answer": ["Herzl", "Basel"],
        "explanation": (
            "Theodor Herzl convened the First Zionist Congress at Basel, Switzerland, "
            "from 29 to 31 August 1897. About 200 delegates from 17 countries attended. "
            "Herzl wrote in his diary: 'In Basel I founded the Jewish State.'"
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "Herzl's pamphlet arguing for a Jewish state was titled ________ (1896)."
        ),
        "blanks": ["Der Judenstaat"],
        "answer": ["Der Judenstaat"],
        "explanation": (
            "'Der Judenstaat' (The Jewish State) was Theodor Herzl's 1896 pamphlet that "
            "laid out the case for a Jewish nation-state, initially as a possible solution "
            "in Argentina or Palestine. It became the founding text of political Zionism."
        ),
        "difficulty": Difficulty.MARD.value if False else Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "Jewish immigration to Palestine was called ________ in Hebrew."
        ),
        "blanks": ["aliyah"],
        "answer": ["aliyah"],
        "explanation": (
            "Aliyah (עלייה) is the Hebrew word meaning 'ascent' or 'going up,' used "
            "to describe Jewish immigration to the Land of Israel/Palestine. The First "
            "Aliyah (1882–1903) brought about 25,000–35,000 Jews; the Second Aliyah "
            "(1904–1914) brought over 40,000."
        ),
        "difficulty": Difficulty.MARD.value if False else Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.FILL_BLANK.value,
        "question": (
            "________ is a political nationalist movement, NOT a religion — many Jews were not Zionists."
        ),
        "blanks": ["Zionism"],
        "answer": ["Zionism"],
        "explanation": (
            "Zionism is a modern political nationalist movement founded by Theodor Herzl "
            "in the late 19th century. Judaism is a 3,000-year-old religion. Ultra-Orthodox "
            "Jewish groups (such as Neturei Karta) remain anti-Zionist, believing that "
            "Jewish return to Israel must await the Messiah."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
]

_SHORT_ANSWER_BANK: List[Dict] = [
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "State any two reasons why the Indian National Congress rejected the August Offer (1940)."
        ),
        "answer": (
            "(1) No immediate self-government: The Offer promised dominion status only "
            "AFTER World War II, not immediately. (2) Expansion of the Viceroy's Council "
            "was inadequate: It did not transfer real executive power to Indians. "
            "(3) No guarantee of Constituent Assembly: It lacked a clear commitment to "
            "a Constituent Assembly elected by the people of India."
        ),
        "explanation": (
            "The Congress demanded immediate self-government during the war, arguing "
            "that Indians could not fight for democracy abroad while being denied it at "
            "home. The August Offer's vague promise of post-war dominion status was "
            "rejected on 21 August 1940."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 2,
    },
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "In the context of a Class 12 Civics project: Briefly explain why "
            "the fall of France in June 1940 was directly linked to the August Offer."
        ),
        "answer": (
            "The fall of France in June 1940 left Britain standing alone against Nazi "
            "Germany. Britain desperately needed India's vast manpower, resources, and "
            "strategic position. The August Offer (8 August 1940) was therefore a wartime "
            "concession designed to win Indian cooperation and loyalty during Britain's "
            "greatest moment of vulnerability."
        ),
        "explanation": (
            "This Indian-context framing helps students understand that colonial "
            "concessions were driven by imperial crisis, not goodwill. The same logic "
            "applies to the Cripps Mission (1942) after the fall of Singapore and Rangoon."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 2,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "List any three main proposals of the Cripps Mission (1942)."
        ),
        "answer": (
            "(1) India would be granted dominion status after the war. "
            "(2) An Indian Constituent Assembly would be elected to frame the new "
            "constitution. (3) Provinces could opt out (right to secede) and frame "
            "their own constitutions if they did not accept the national constitution. "
            "(4) Princely states would be given the option to join the Indian union "
            "or remain independent."
        ),
        "explanation": (
            "The Cripps proposals appeared generous on paper but contained fatal flaws: "
            "no immediate transfer of power, the 'right to secede' threatened India's "
            "unity, and the Congress had no confidence in Britain's post-war intentions."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 2,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "Why did Jinnah and the Muslim League also reject the Cripps proposals?"
        ),
        "answer": (
            "The Muslim League rejected the Cripps proposals because they did NOT "
            "concede Pakistan — the right to secede was for provinces, not a guarantee "
            "of a separate Muslim nation. Jinnah wanted an outright acceptance of the "
            "Pakistan demand, which Cripps had no authority to grant."
        ),
        "explanation": (
            "While the Congress rejected Cripps over unity, the Muslim League rejected "
            "it over partition. Both sides thus found the mission unacceptable — making "
            "its failure almost inevitable."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 2,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "How did the Cripps Mission failure lead to the Quit India Resolution?"
        ),
        "answer": (
            "The Congress was already frustrated by the failure of the August Offer and "
            "the Cripps Mission. Both failed to grant genuine self-government. Combined "
            "with growing mass discontent, the failure of Cripps convinced the Congress "
            "that Britain would not voluntarily leave India. Gandhi therefore launched "
            "the Quit India Movement on 8 August 1942, demanding immediate British "
            "withdrawal from India."
        ),
        "explanation": (
            "The Quit India Resolution was adopted by the All India Congress Committee "
            "on 8 August 1942 at Gowalia Tank Maidan, Bombay. Gandhi gave the call "
            "'Do or Die.' The British immediately arrested the entire Congress leadership."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 2,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "What was the significance of Brown v. Board of Education (1954) in the "
            "Civil Rights Movement?"
        ),
        "answer": (
            "Brown v. Board declared racial segregation in public schools unconstitutional, "
            "overturning the Plessy v. Ferguson (1896) 'separate but equal' doctrine. "
            "It was significant because: (1) It was a unanimous (9–0) Supreme Court ruling, "
            "(2) It legally dismantled the foundation of Jim Crow, (3) It emboldened civil "
            "rights activists, and (4) It led to subsequent desegregation orders across "
            "all public facilities, not just schools."
        ),
        "explanation": (
            "Chief Justice Earl Warren's unanimous opinion stated that 'separate "
            "educational facilities are inherently unequal,' noting that segregation "
            "generated feelings of inferiority in Black children that affected their "
            "hearts and minds 'in a way unlikely ever to be undone.'"
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 2,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "Explain how Dr. Martin Luther King Jr.'s philosophy of nonviolent resistance "
            "was influenced by Mahatma Gandhi."
        ),
        "answer": (
            "Dr. King was deeply influenced by Gandhi's philosophy of satyagraha (nonviolent "
            "resistance). King studied Gandhi's methods during his theological training and "
            "visited India in 1959. He adopted key Gandhian principles: (1) Nonviolent civil "
            "disobedience — willingly accepting arrest and punishment, (2) Love and goodwill "
            "toward the oppressor, (3) Demonstrating moral superiority to shame the oppressor, "
            "(4) Mass mobilisation through sustained campaigns. King applied these methods "
            "in the Montgomery Bus Boycott and beyond."
        ),
        "explanation": (
            "This Indian-context connection (King studying Gandhi) is a key competency "
            "link for Indian students — demonstrating how India's independence struggle "
            "directly inspired the American Civil Rights Movement."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 2,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "What were Jim Crow laws, and how did they enforce racial segregation in the USA?"
        ),
        "answer": (
            "Jim Crow laws were state and local laws enacted primarily in Southern states "
            "between the 1870s and 1960s that enforced racial segregation. Named after "
            "a minstrel show character, these laws mandated: (1) Segregated schools, "
            "restaurants, hotels, and public transport, (2) Separate drinking fountains "
            "and restrooms, (3) Racial barriers in voting through poll taxes and literacy "
            "tests, (4) Anti-miscegenation laws banning interracial marriage. They were "
            "upheld by the Supreme Court's 'separate but equal' doctrine until 1954."
        ),
        "explanation": (
            "Jim Crow laws did not exist only in the South — de facto segregation existed "
            "nationwide. However, de jure (legally enforced) segregation was most rigid "
            "in the Southern states. Students often mistakenly believe racial discrimination "
            "ended with the abolition of slavery in 1865 — Jim Crow lasted until the "
            "1960s Civil Rights Movement."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 2,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "Define Arab nationalism and state two of its main aims."
        ),
        "answer": (
            "Arab nationalism was a late-19th and early-20th-century political movement "
            "seeking: (1) The political unity and independence of all Arabic-speaking "
            "peoples, (2) Freedom from Ottoman and later European colonial rule, "
            "(3) The creation of a unified Arab nation-state spanning Syria, Palestine, "
            "Mesopotamia (Iraq), and Arabia."
        ),
        "explanation": (
            "Arab nationalism grew among intellectuals, journalists, and army officers "
            "who shared the Arabic language and cultural identity but were ruled by the "
            "Ottoman Turks. The Arab Revolt of 1916 under Sharif Husayn ibn Ali of Mecca "
            "was its most dramatic early expression."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 2,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "Why did Arab nationalism and Zionism create an irreconcilable conflict "
            "over Palestine?"
        ),
        "answer": (
            "Both movements claimed Palestine as their national homeland: "
            "(1) Arab nationalists saw Palestine as part of the Arab homeland and "
            "were alarmed by Jewish immigration (aliyah) that threatened their "
            "demographic and political majority. "
            "(2) Zionists, facing European antisemitism, needed Palestine as their "
            "historical and spiritual homeland. "
            "The conflict was irreconcilable because both peoples wanted sovereignty "
            "over the SAME territory."
        ),
        "explanation": (
            "Initially, both Arab nationalism and Zionism shared opposition to Ottoman "
            "rule. But once the Ottoman Empire collapsed, their competing claims to "
            "Palestine made conflict inevitable."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 2,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "An Indian student compares the Zionist aliyah with India's own experience "
            "of migration. Explain why Jewish immigration to Palestine alarmed the Arab population."
        ),
        "answer": (
            "Jewish immigration (aliyah) to Palestine grew from under 30,000 in 1880 "
            "to over 80,000 by 1914. The Arab majority (over 90% of Palestine's "
            "population) feared: (1) Demographic displacement — becoming a minority "
            "in their own land, (2) Loss of land as Jews purchased territory, "
            "(3) Loss of political rights under a future Jewish state. "
            "Just as Indian nationalists resisted colonial demographic changes, Arab "
            "nationalists resisted Jewish immigration that threatened Arab sovereignty."
        ),
        "explanation": (
            "This competency framing uses an Indian analogy to help students understand "
            "the Arab perspective on Zionism — making a distant history relatable."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 2,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.SHORT_ANSWER.value,
        "question": (
            "State two key differences between Zionism and Judaism as understood by historians."
        ),
        "answer": (
            "(1) Judaism is a 3,000-year-old religion; Zionism is a 19th-century "
            "political nationalist movement founded by Theodor Herzl in 1897. "
            "(2) Many religious Jews were anti-Zionist, believing that Jewish return "
            "to Palestine could only happen through divine intervention (the Messiah), "
            "not political action. "
            "(3) Zionism was a response to modern European antisemitism, not a religious "
            "impulse. "
            "(4) Jews could be Zionists OR anti-Zionists — the two are not identical."
        ),
        "explanation": (
            "A common error is to confuse Zionism with Judaism. This distinction is "
            "important for understanding that not all Jews supported a Jewish state, "
            "and opposition to Zionism was not necessarily antisemitic."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 2,
    },
]

_LONG_ANSWER_BANK: List[Dict] = [
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.LONG_ANSWER.value,
        "question": (
            "Analyse the reasons for the rejection of the August Offer (1940) by the "
            "Indian National Congress. How did the international situation of 1940 shape "
            "British policy towards India? (4 marks)"
        ),
        "answer": (
            "Reasons for rejection: (1) No immediate self-government — August Offer "
            "promised dominion status only after WWII, not during it. (2) No transfer "
            "of real power — the Viceroy retained executive authority. (3) Expansion of "
            "Executive Council was cosmetic, not substantive. (4) No Constituent Assembly "
            "elected by the people. "
            "International context: The fall of France (June 1940) left Britain isolated "
            "and desperate for Indian support. Britain made a tactical concession "
            "(August Offer) to secure Indian cooperation in WWII. However, Indians saw "
            "this as too little too late — the offer came after years of unfulfilled "
            "promises. The Congress demanded that India's support could not be taken "
            "for granted without genuine self-government."
        ),
        "explanation": (
            "Long-answer questions at Class 12 require linking international events "
            "(fall of France, WWII) to British policy decisions. Students should "
            "connect cause and effect clearly."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 4,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.LONG_ANSWER.value,
        "question": (
            "Examine why both the Indian National Congress AND the Muslim League "
            "rejected the Cripps Mission proposals in 1942. How did this double "
            "rejection shape the subsequent course of the Indian freedom struggle? (4 marks)"
        ),
        "answer": (
            "Congress rejected Cripps because: (1) No power transfer during WWII, "
            "(2) The 'right to secede' threatened Indian unity, (3) Dominion status "
            "was a vague promise after an uncertain war. "
            "Muslim League rejected Cripps because: (1) It did not concede Pakistan, "
            "(2) The 'right to secede' did not equate to a separate Muslim nation-state. "
            "Impact: The double rejection confirmed that British constitutional reforms "
            "could not satisfy either major community. It radicalised the Congress into "
            "launching the Quit India Movement (August 1942) and hardened Jinnah's "
            "demand for Pakistan. The failure of constitutional methods pushed the "
            "freedom struggle toward mass civil disobedience."
        ),
        "explanation": (
            "This competency question requires synthesising multiple perspectives — "
            "a key skill at the Class 12 level. Students must understand BOTH sides' "
            "reasons for rejection and its historical consequences."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 4,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.LONG_ANSWER.value,
        "question": (
            "Describe the racial problems in the USA during the 1950s and explain how "
            "Dr. Martin Luther King Jr.'s philosophy of nonviolent resistance became "
            "the cornerstone of the Civil Rights Movement. (4 marks)"
        ),
        "answer": (
            "Racial problems of the 1950s: (1) Jim Crow laws enforced segregation in "
            "schools, transport, restaurants, and public facilities across the South. "
            "(2) Black Americans were denied the right to vote through literacy tests, "
            "poll taxes, and intimidation. (3) Lynching and racial violence were common. "
            "(4) Economic exploitation — Black workers earned far less than whites. "
            "King's nonviolent philosophy: King adopted Gandhi's satyagraha, advocating "
            "nonviolent civil disobedience — protesters willingly accepted arrest and "
            "violence without retaliation, demonstrating moral superiority. "
            "Key campaigns: Montgomery Bus Boycott (1955–56) proved the power of "
            "nonviolent mass protest. King founded SCLC in 1957 to coordinate campaigns. "
            "Nonviolence won sympathy nationally and internationally, pressuring the "
            "federal government to act."
        ),
        "explanation": (
            "Students should link the systemic racial problems (Jim Crow, "
            "disenfranchisement, violence) with King's strategic response. "
            "The Gandhi-King connection is a crucial competency element."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 4,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.LONG_ANSWER.value,
        "question": (
            "Trace the key events of the Civil Rights Movement from 1954 to 1957 and "
            "assess their significance. (4 marks)"
        ),
        "answer": (
            "1954 — Brown v. Board of Education: Supreme Court declared school "
            "segregation unconstitutional — legal turning point. "
            "1955 (Dec) — Rosa Parks refuses bus seat: Sparked the Montgomery Bus "
            "Boycott, the first mass action of the modern movement. "
            "1955–56 — Montgomery Bus Boycott (381 days): Proved Black economic and "
            "organisational power; established Dr. King as national leader. "
            "1957 — SCLC founded: Provided organisational backbone for future campaigns. "
            "Significance: These events transformed scattered resistance into a coordinated "
            "national movement, demonstrating that nonviolent mass protest could challenge "
            "and defeat institutional racism."
        ),
        "explanation": (
            "Chronological sequencing is important in history answers. Students should "
            "show cause-effect relationships between events."
        ),
        "difficulty": Difficulty.MEDIUM.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 4,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.LONG_ANSWER.value,
        "question": (
            "Examine the ideological roots of Zionism and Arab nationalism and explain "
            "why their competing claims to Palestine made conflict inevitable. (4 marks)"
        ),
        "answer": (
            "Zionism: Founded by Theodor Herzl in 1897, Zionism was a political nationalist "
            "movement seeking a Jewish homeland in Palestine as a solution to European "
            "antisemitism. Key document: Der Judenstaat (1896). "
            "Arab nationalism: Emerged among late-19th-century intellectuals (e.g., "
            "Najib Azoury's 'Le Réveil de la Nation Arabe,' 1905), seeking political "
            "unity and independence of Arabic-speaking peoples from Ottoman and European "
            "rule. The Arab Revolt of 1916 under Sharif Husayn expressed this aspiration. "
            "Why conflict was inevitable: (1) Both claimed the SAME territory — Palestine. "
            "(2) Jewish immigration (aliyah) grew from 30,000 (1880) to 80,000 (1914), "
            "intensifying Arab fears of demographic displacement. (3) Neither movement "
            "was willing to compromise on its national claim to the land. "
            "Initially both opposed Ottoman rule, but once the Empire collapsed, "
            "their goals became irreconcilable."
        ),
        "explanation": (
            "This long-answer question tests comprehensive understanding of both "
            "ideologies and their structural conflict. Students should show that "
            "the conflict had deep ideological roots, not just religious ones."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 4,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.LONG_ANSWER.value,
        "question": (
            "An Indian student is asked to compare the Arab nationalism of the early "
            "20th century with India's own freedom struggle. "
            "Analyse the similarities and key differences. (4 marks)"
        ),
        "answer": (
            "Similarities: (1) Both opposed imperial/foreign rule — Arabs against the "
            "Ottoman Empire and later European colonial powers, Indians against British "
            "colonial rule. (2) Both were nationalist movements seeking self-determination "
            "and independent nation-states. (3) Both used cultural identity (Arabic "
            "language, Islamic heritage for Arabs; Indian culture, languages for Indians) "
            "as a unifying force. "
            "Differences: (1) India had a unified anti-colonial front (Congress), while "
            "Arab nationalism faced deeper divisions among Arab states. "
            "(2) India achieved independence through mass nonviolent civil disobedience, "
            "while Arab nationalism often involved armed revolt (e.g., Arab Revolt 1916). "
            "(3) Arab nationalism's failure to establish a unified Arab state contrasts "
            "with India's successful creation of a single nation-state (despite partition)."
        ),
        "explanation": (
            "Comparative history questions develop analytical skills. The Indian "
            "analogy helps students understand Arab nationalism by relating it to "
            "the more familiar Indian freedom struggle."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 4,
    },
]

_NUMERICAL_BANK: List[Dict] = [
    {
        "topic": Topic.AUGUST_OFFER.value,
        "type": QuestionType.NUMERICAL.value,
        "question": (
            "Calculate the number of years between the August Offer (1940) and "
            "India's actual independence (1947)."
        ),
        "answer": 7,
        "numerical_answer": 7,
        "numerical_unit": "years",
        "explanation": (
            "1947 − 1940 = 7 years. The August Offer promised dominion status after "
            "WWII, but actual independence took 7 years from the offer. This gap "
            "demonstrates why the Congress found the offer inadequate — the promise "
            "of post-war dominion status did not guarantee when that would actually happen."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.COMPETENCY_INDIAN.value,
        "marks": 1,
    },
    {
        "topic": Topic.CRIPPS_MISSION.value,
        "type": QuestionType.NUMERICAL.value,
        "question": (
            "The Cripps Mission arrived on 22 March 1942. How many days after the "
            "fall of Singapore (15 February 1942) did Cripps arrive in India?"
        ),
        "answer": 35,
        "numerical_answer": 35,
        "numerical_unit": "days",
        "explanation": (
            "Feb 1942 = 28 days (1942 was not a leap year: 1942 ÷ 4 = 485.5, not integer). "
            "Days from 15 Feb to 28 Feb = 13 days (16th to 28th inclusive = 13 days). "
            "Days in March up to 22nd = 22 days. Total = 13 + 22 = 35 days. "
            "This short interval shows how urgently Britain wanted Indian cooperation "
            "after the devastating fall of Singapore — considered Britain's worst "
            "military defeat in history."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.NUMERICAL.value,
        "question": (
            "Rosa Parks was arrested on 1 December 1955. The Montgomery Bus Boycott "
            "began on 5 December 1955. How many days after Rosa Parks's arrest did "
            "the boycott officially begin?"
        ),
        "answer": 4,
        "numerical_answer": 4,
        "numerical_unit": "days",
        "explanation": (
            "5 December − 1 December = 4 days. The Black community organised rapidly, "
            "printing and distributing leaflets calling for the boycott on the very "
            "evening of Parks's arrest. The boycott began on the following Monday — "
            "just 4 days after Parks's arrest."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.NUMERICAL.value,
        "question": (
            "Dr. Martin Luther King Jr. was born on 15 January 1929 and was assassinated "
            "on 4 April 1968. How old was he when he died? (Calculate in completed years)"
        ),
        "answer": 39,
        "numerical_answer": 39,
        "numerical_unit": "years",
        "explanation": (
            "1968 − 1929 = 39 years. Since 4 April 1968 comes after 15 January, King "
            "had already celebrated his 39th birthday in January 1968. He was exactly "
            "39 years and ~79 days old when assassinated at the Lorraine Motel in "
            "Memphis, Tennessee."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.CIVIL_RIGHTS_USA.value,
        "type": QuestionType.NUMERICAL.value,
        "question": (
            "The US Supreme Court had 9 justices. In Brown v. Board of Education (1954), "
            "what fraction and percentage of the Court ruled unanimously in favour of "
            "desegregation?"
        ),
        "answer": 100.0,
        "numerical_answer": 100.0,
        "numerical_unit": "percent",
        "explanation": (
            "All 9 justices voted unanimously (9/9) to declare school segregation "
            "unconstitutional. A unanimous decision gave the ruling extraordinary "
            "moral and legal authority — there was no dissent for segregationists "
            "to exploit. Chief Justice Earl Warren worked hard to achieve unanimity, "
            "personally lobbying justices who were initially hesitant."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.NUMERICAL.value,
        "question": (
            "Jewish immigration (aliyah) to Palestine increased from under 30,000 in 1880 "
            "to approximately 80,000 by 1914. Calculate the percentage increase over "
            "this period."
        ),
        "answer": 166.67,
        "numerical_answer": 166.67,
        "numerical_unit": "percent",
        "explanation": (
            "Percentage increase = ((80,000 − 30,000) / 30,000) × 100 "
            "= (50,000 / 30,000) × 100 = 166.67%. "
            "This near-tripling of the Jewish population alarmed the Arab majority, "
            "who saw it as demographic displacement and a threat to their political "
            "future in Palestine."
        ),
        "difficulty": Difficulty.HARD.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
    {
        "topic": Topic.ARAB_NATIONALISM_ZIONISM.value,
        "type": QuestionType.NUMERICAL.value,
        "question": (
            "The First Zionist Congress was held in 1897. "
            "How many years after the publication of Der Judenstaat (1896) was it held?"
        ),
        "answer": 1,
        "numerical_answer": 1,
        "numerical_unit": "year",
        "explanation": (
            "1897 − 1896 = 1 year. Herzl's pamphlet 'Der Judenstaat' (1896) laid the "
            "ideological groundwork, and just one year later he convened the First "
            "Zionist Congress at Basel, transforming the idea into an organised political "
            "movement. This rapid mobilisation shows how urgently European Jews sought "
            "a solution to antisemitism."
        ),
        "difficulty": Difficulty.EASY.value,
        "context_type": ContextType.STANDARD.value,
        "marks": 1,
    },
]

_ALL_QUESTIONS: List[Question] = []


def _build_question_bank() -> List[Question]:
    """Build the flat list of Question objects from typed banks."""
    global _ALL_QUESTIONS
    if _ALL_QUESTIONS:
        return _ALL_QUESTIONS

    qlist: List[Question] = []

    for entry in _MCQ_BANK:
        qlist.append(Question(
            id=f"mcq_{_stable_hash(entry['question']):x}",
            type=entry["type"],
            topic=entry["topic"],
            difficulty=entry["difficulty"],
            context_type=entry["context_type"],
            question=entry["question"],
            options=entry.get("options", []),
            answer=entry["answer"],
            explanation=entry["explanation"],
            marks=entry.get("marks", 1),
        ))

    for entry in _FILL_BLANK_BANK:
        qlist.append(Question(
            id=f"fb_{_stable_hash(entry['question']):x}",
            type=entry["type"],
            topic=entry["topic"],
            difficulty=entry["difficulty"],
            context_type=entry["context_type"],
            question=entry["question"],
            blanks=entry.get("blanks", []),
            answer=entry["answer"],
            explanation=entry["explanation"],
            marks=entry.get("marks", 1),
        ))

    for entry in _SHORT_ANSWER_BANK:
        qlist.append(Question(
            id=f"sa_{_stable_hash(entry['question']):x}",
            type=entry["type"],
            topic=entry["topic"],
            difficulty=entry["difficulty"],
            context_type=entry["context_type"],
            question=entry["question"],
            answer=entry["answer"],
            explanation=entry["explanation"],
            marks=entry.get("marks", 2),
        ))

    for entry in _LONG_ANSWER_BANK:
        qlist.append(Question(
            id=f"la_{_stable_hash(entry['question']):x}",
            type=entry["type"],
            topic=entry["topic"],
            difficulty=entry["difficulty"],
            context_type=entry["context_type"],
            question=entry["question"],
            answer=entry["answer"],
            explanation=entry["explanation"],
            marks=entry.get("marks", 4),
        ))

    for entry in _NUMERICAL_BANK:
        qlist.append(Question(
            id=f"num_{_stable_hash(entry['question']):x}",
            type=entry["type"],
            topic=entry["topic"],
            difficulty=entry["difficulty"],
            context_type=entry["context_type"],
            question=entry["question"],
            answer=entry["numerical_answer"],
            numerical_answer=entry["numerical_answer"],
            numerical_unit=entry.get("numerical_unit", ""),
            explanation=entry["explanation"],
            marks=entry.get("marks", 1),
        ))

    _ALL_QUESTIONS = qlist
    return qlist


# ---------------------------------------------------------------------------
# Solver functions
# ---------------------------------------------------------------------------

def solve_mcq(params: Dict) -> SolveResult:
    """Solve an MCQ question. params: {question, options, answer, explanation}"""
    question = params.get("question", "")
    options = params.get("options", [])
    correct_idx = params.get("answer",
)