"""
CISCE Class 7 HISTCIV Question Generator
Deterministic seeded question generation covering:
  c7_histciv_001  Meaning of Medieval / Periodisation
  c7_histciv_009  Pre-Islamic Arabia — Tribal Society
  c7_histciv_016  Turkish Invasions — Mahmud of Ghazni & Muhammad of Ghor
"""

import random
import hashlib
import math
from datetime import date, datetime
from fractions import Fraction
from dataclasses import dataclass, field, asdict
from typing import Any, Dict, List, Optional
import json

# ──────────────────────────────────────────────────────────────────────────────
# Seeded RNG helper
# ──────────────────────────────────────────────────────────────────────────────
class SeededRNG:
    """Deterministic PRNG wrapper so every call with the same seed returns the
    same sequence of numbers regardless of call order within one generation."""

    def __init__(self, seed: int):
        self._seed = seed
        self._rng = random.Random(seed)

    def randint(self, lo: int, hi: int) -> int:
        return self._rng.randint(lo, hi)

    def choice(self, seq):
        return self._rng.choice(seq)

    def shuffle(self, seq):
        self._rng.shuffle(seq)

    def uniform(self, lo: float, hi: float) -> float:
        return self._rng.uniform(lo, hi)

    def sample(self, pop, k):
        return self._rng.sample(pop, k)

    def random(self) -> float:
        return self._rng.random()


# ──────────────────────────────────────────────────────────────────────────────
# Syllabus Node Definitions
# ──────────────────────────────────────────────────────────────────────────────
@dataclass
class SyllabusNode:
    node_id: str
    title: str
    difficulty: str           # Easy / Medium
    cognitive: str            # understand / apply / analyse …
    topics: List[str]


NODES: List[SyllabusNode] = [
    SyllabusNode(
        node_id="c7_histciv_001",
        title="Meaning of Medieval and the Beginning of the Medieval Period",
        difficulty="Easy",
        cognitive="understand",
        topics=[
            "etymology_medieval",
            "periodisation_europe",
            "periodisation_india",
            "types_of_evidence",
            "petrarch_renaissance",
            "romulus_augustulus_476ce",
            "arab_conquest_sindh_712ce",
        ],
    ),
    SyllabusNode(
        node_id="c7_histciv_009",
        title="Pre-Islamic Arabia — Tribal Society and Socio-Political Conditions",
        difficulty="Medium",
        cognitive="understand",
        topics=[
            "arabia_geography",
            "bedouin_tribal_life",
            "quraysh_mecca",
            "kaaba_polytheism",
            "jahiliyyah_social_evils",
            "trade_routes_caravan",
            "blood_revenge_lex_talionis",
        ],
    ),
    SyllabusNode(
        node_id="c7_histciv_016",
        title="Turkish Invasions — Mahmud of Ghazni and Muhammad of Ghor",
        difficulty="Medium",
        cognitive="understand",
        topics=[
            "mahmud_ghazni_raids",
            "somnath_1026",
            "muhammad_ghor_tarain",
            "prithviraj_chauhan",
            "delhi_sultanate_foundation",
            "qutb_uddin_aibak",
            "ghaznavid_vs_ghurid",
        ],
    ),
]

ALL_TOPICS: List[str] = [t for n in NODES for t in n.topics]


# ──────────────────────────────────────────────────────────────────────────────
# Fact base  (topic → list of fact strings used for fill/short/long)
# ──────────────────────────────────────────────────────────────────────────────
FACT_BANK: Dict[str, List[str]] = {
    # ── c7_histciv_001 ────────────────────────────────────────────────────────
    "etymology_medieval": [
        "The word 'medieval' comes from the Latin phrase 'medium aevum' meaning 'middle age'.",
        "Italian humanists of the Renaissance, such as Petrarch, coined the term 'medieval' in the 14th century.",
        "The term 'medieval' was coined because Renaissance scholars saw their own age as reviving classical learning after a 'middle' or 'dark' period.",
    ],
    "periodisation_europe": [
        "The medieval period in Europe is said to have begun in 476 CE.",
        "In 476 CE, the last Roman emperor Romulus Augustulus was deposed by the Germanic chieftain Odoacer.",
        "The fall of the Western Roman Empire in 476 CE is the conventional starting point of the European medieval period.",
    ],
    "periodisation_india": [
        "The medieval period in India is generally traced from the 8th century CE, marked by the Arab conquest of Sindh in 712 CE.",
        "Muhammad bin Qasim led the Arab invasion of Sindh in 712 CE, which is often used to mark the beginning of the medieval period in India.",
        "Some historians date the start of the Indian medieval period to the Delhi Sultanate's establishment in 1206 CE.",
    ],
    "types_of_evidence": [
        "Literary evidence such as chronicles, poems, and travelogues helps historians periodise history.",
        "Archaeological evidence such as coins, inscriptions, monuments, and pottery helps periodise history.",
        "Coins and inscriptions are important archaeological sources for reconstructing medieval history.",
    ],
    "petrarch_renaissance": [
        "Petrarch, an Italian poet and scholar of the 14th century, is associated with the origin of the term 'medieval'.",
        "The Renaissance (14th–17th century) was the cultural movement during which the concept of a 'middle' age was first articulated.",
    ],
    "romulus_augustulus_476ce": [
        "Romulus Augustulus was the last Western Roman emperor, deposed in 476 CE.",
        "Romulus Augustulus was a teenager when he was deposed by Odoacer, who then became the first King of Italy.",
    ],
    "arab_conquest_sindh_712ce": [
        "Muhammad bin Qasim led the Arab forces that conquered Sindh in 712 CE.",
        "The Arab conquest of Sindh in 712 CE opened the gateway for Islamic influence in the Indian subcontinent.",
    ],
    # ── c7_histciv_009 ────────────────────────────────────────────────────────
    "arabia_geography": [
        "The Arabian Peninsula is mostly desert with scattered oases and important trade routes.",
        "Mecca and Medina are the two holy cities of Arabia located in the Hejaz region.",
        "Important trade routes crossed the Arabian Peninsula connecting Yemen to Syria and the Mediterranean.",
    ],
    "bedouin_tribal_life": [
        "The Bedouins were nomadic Arab tribes who lived in tents and herded camels and goats.",
        "Bedouin tribal society was organised around clans with loyalty to the tribe being paramount.",
        "Blood revenge (lex talionis) was the custom followed by Bedouin tribes to settle disputes.",
        "The practice of 'blood revenge' meant that a killing had to be avenged by killing a member of the offender's clan.",
    ],
    "quraysh_mecca": [
        "The Quraysh tribe controlled Mecca and the sacred Kaaba before the advent of Islam.",
        "The Quraysh were a powerful merchant tribe who dominated the trade routes of Arabia.",
        "Mecca was a major stop on the incense and spice trade route from Yemen to Syria.",
    ],
    "kaaba_polytheism": [
        "The Kaaba in Mecca housed about 360 idols before the advent of Islam.",
        "Pilgrims from across Arabia visited the Kaaba annually, bringing wealth and prestige to the Quraysh.",
        "The practice of circumambulation (tawaf) around the Kaaba was a pre-Islamic pagan ritual.",
    ],
    "jahiliyyah_social_evils": [
        "Jahiliyyah refers to the 'Age of Ignorance' in pre-Islamic Arabia before the message of Islam.",
        "Female infanticide (wa'd al-banat) — the burying of newborn daughters alive — was practised in pre-Islamic Arabia.",
        "Slavery was widespread in pre-Islamic Arabia; slaves were bought and sold openly in markets.",
        "Tribal feuding and plunder of caravans were accepted norms of pre-Islamic Arabian society.",
    ],
    "trade_routes_caravan": [
        "Caravans of camels carried spices and incense from southern Arabia to markets in the north.",
        "Mecca's strategic location on the trade route between Yemen and Syria made it prosperous.",
        "The markets of Ukaz near Taif were famous for poetry and trade in pre-Islamic Arabia.",
    ],
    "blood_revenge_lex_talionis": [
        "The lex talionis (law of retaliation) governed justice in pre-Islamic Bedouin society.",
        "Blood revenge was a mechanism of tribal justice where the family of a victim was expected to kill a member of the offender's tribe.",
    ],
    # ── c7_histciv_016 ────────────────────────────────────────────────────────
    "mahmud_ghazni_raids": [
        "Mahmud of Ghazni raided India 17 times between 1000 CE and 1026 CE.",
        "Mahmud of Ghazni ruled from Ghazni, in present-day Afghanistan, and was a Ghaznavid ruler.",
        "Mahmud of Ghazni's primary motive was to plunder the wealth of Indian temples and cities.",
        "Mahmud of Ghazni attacked Nagarkot in 1009 CE, Thaneshwar in 1014 CE, and Kanauj in 1018 CE.",
        "Unlike Muhammad of Ghor, Mahmud of Ghazni did not establish lasting political control over North India.",
    ],
    "somnath_1026": [
        "Mahmud of Ghazni raided the Somnath temple in Gujarat in 1026 CE.",
        "The Somnath temple raid of 1026 CE is the most famous of Mahmud of Ghazni's plunder expeditions.",
        "Mahmud of Ghazni carried away enormous quantities of gold and jewels from the Somnath temple.",
    ],
    "muhammad_ghor_tarain": [
        "The First Battle of Tarain was fought in 1191 CE between Prithviraj Chauhan and Muhammad of Ghor, and Prithviraj won.",
        "The Second Battle of Tarain was fought in 1192 CE; Muhammad of Ghor defeated Prithviraj Chauhan.",
        "Muhammad of Ghor was a Ghurid ruler from the region of Ghor in present-day Afghanistan.",
        "The defeat of Prithviraj Chauhan at the Second Battle of Tarain in 1192 CE opened North India to Turkish rule.",
    ],
    "prithviraj_chauhan": [
        "Prithviraj Chauhan III was the ruler of Ajmer and Delhi who fought against Muhammad of Ghor at the Battles of Tarain.",
        "Prithviraj Chauhan defeated Muhammad of Ghor in the First Battle of Tarain in 1191 CE.",
        "Prithviraj Chauhan's defeat at the Second Battle of Tarain in 1192 CE ended the independent Rajput rule of North India.",
    ],
    "delhi_sultanate_foundation": [
        "The Delhi Sultanate was established in 1206 CE with Qutb-ud-din Aibak as the first Sultan.",
        "Muhammad of Ghor left his trusted general Qutb-ud-din Aibak in India to administer the conquered territories.",
        "Qutb-ud-din Aibak was a slave (mamluk) of Muhammad of Ghor who became the first Sultan of Delhi.",
    ],
    "qutb_uddin_aibak": [
        "Qutb-ud-din Aibak was a slave-general of Muhammad of Ghor and the founder of the Delhi Sultanate.",
        "Qutb-ud-din Aibak ruled as Sultan of Delhi from 1206 CE until his death in 1210 CE.",
        "Qutb-ud-din Aibak began the construction of the Qutb Minar in Delhi.",
    ],
    "ghaznavid_vs_ghurid": [
        "Mahmud of Ghazni belonged to the Ghaznavid dynasty; Muhammad of Ghor belonged to the Ghurid dynasty.",
        "The Ghaznavids were of Turkic origin; the Ghurids were of Persian/Tajik origin from Ghor.",
        "Mahmud of Ghazni (died 1030 CE) lived about 150 years before Muhammad of Ghor (died 1206 CE).",
        "Mahmud of Ghazni's raids were plunder expeditions, while Muhammad of Ghor's campaign established lasting political rule.",
    ],
}


# ──────────────────────────────────────────────────────────────────────────────
# Question bank templates — each entry is a dict with keys used to build
# QuestionDict.  'topic' tags tie each question to a syllabus node topic.
# ──────────────────────────────────────────────────────────────────────────────
Q_MCQ_TEMPLATES = [
    # ── c7_histciv_001 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_001",
        topic="etymology_medieval",
        q="The term 'medieval' is derived from the Latin phrase:",
        opts=[
            "medium aevum",
            "magnum opus",
            "modus operandi",
            "magna carta",
        ],
        ans=0,
        exp="The word 'medieval' comes from Latin 'medium aevum' meaning 'middle age', coined by Italian Renaissance humanists.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="periodisation_europe",
        q="In which year is the beginning of the medieval period in Europe conventionally marked?",
        opts=["476 CE", "712 CE", "1206 CE", "1498 CE"],
        ans=0,
        exp="476 CE marks the fall of the Western Roman Empire when Romulus Augustulus was deposed by Odoacer.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="periodisation_india",
        q="The Arab conquest of Sindh, which marks the beginning of the medieval period in India, occurred in which year?",
        opts=["712 CE", "476 CE", "1000 CE", "1206 CE"],
        ans=0,
        exp="In 712 CE, Muhammad bin Qasim led the Arab forces that conquered Sindh, marking the start of India's medieval period.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="periodisation_europe",
        q="Who deposed the last Western Roman emperor Romulus Augustulus in 476 CE?",
        opts=["Odoacer", "Charlemagne", "Attila the Hun", "Julius Caesar"],
        ans=0,
        exp="Odoacer, a Germanic chieftain, deposed the teenage emperor Romulus Augustulus in 476 CE.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="etymology_medieval",
        q="Which Italian humanist of the 14th century is credited with popularising the term 'medieval'?",
        opts=["Petrarch", "Dante", "Machiavelli", "Leonardo da Vinci"],
        ans=0,
        exp="Petrarch (Francesco Petrarca), the 14th-century poet and scholar, is associated with the concept of a 'middle age'.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="types_of_evidence",
        q="Which of the following is an archaeological source used to periodise history?",
        opts=["Coins", "Chronicles", "Poetry", "Letters"],
        ans=0,
        exp="Coins are archaeological evidence; chronicles, poetry, and letters are literary evidence.",
        diff="Easy",
    ),
    # ── c7_histciv_009 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_009",
        topic="quraysh_mecca",
        q="Which powerful tribe controlled Mecca and the Kaaba before the advent of Islam?",
        opts=["Quraysh", "Bedouin", "Banu Hashim", "Ansar"],
        ans=0,
        exp="The Quraysh were the dominant merchant tribe of Mecca who controlled the Kaaba and the trade routes.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="kaaba_polytheism",
        q="Approximately how many idols were housed in the Kaaba in Mecca before the advent of Islam?",
        opts=["360", "12", "100", "1000"],
        ans=0,
        exp="Pre-Islamic Mecca's Kaaba contained about 360 idols representing various tribal deities.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="jahiliyyah_social_evils",
        q="The practice of burying unwanted newborn daughters alive in pre-Islamic Arabia is known as:",
        opts=["wa'd al-banat", "zakat", "hijra", "jihad"],
        ans=0,
        exp="Wa'd al-banat (the promise/burying of daughters) was the pre-Islamic practice of female infanticide.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="bedouin_tribal_life",
        q="What was the primary mode of justice in pre-Islamic Bedouin tribal society?",
        opts=["Blood revenge (lex talionis)", "Royal decrees", "Islamic law", "Court trials"],
        ans=0,
        exp="The lex talionis ('law of retaliation') governed justice — disputes were settled by blood revenge.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="trade_routes_caravan",
        q="Mecca was an important stop on the trade route between which two regions?",
        opts=["Yemen and Syria", "Egypt and Persia", "India and China", "Rome and Greece"],
        ans=0,
        exp="Mecca lay on the spice-and-incense trade route connecting Yemen (South Arabia) to Syria and the Mediterranean.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="arabia_geography",
        q="The Arabian Peninsula is predominantly:",
        opts=["A desert peninsula", "A fertile river valley", "A mountainous archipelago", "A tropical rainforest"],
        ans=0,
        exp="The Arabian Peninsula is largely desert with scattered oases; nomads (Bedouins) herded camels across it.",
        diff="Easy",
    ),
    # ── c7_histciv_016 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_016",
        topic="mahmud_ghazni_raids",
        q="How many times did Mahmud of Ghazni raid India between 1000 CE and 1026 CE?",
        opts=["17 times", "7 times", "3 times", "27 times"],
        ans=0,
        exp="Mahmud of Ghazni conducted 17 raids on India between 1000 and 1026 CE.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="somnath_1026",
        q="In which year did Mahmud of Ghazni raid the Somnath temple?",
        opts=["1026 CE", "1000 CE", "1192 CE", "712 CE"],
        ans=0,
        exp="The Somnath temple raid, Mahmud of Ghazni's most famous plunder expedition, took place in 1026 CE.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="prithviraj_chauhan",
        q="Who was the Rajput ruler defeated by Muhammad of Ghor at the Second Battle of Tarain (1192 CE)?",
        opts=["Prithviraj Chauhan", "Rana Pratap", "Bappa Rawal", "Jayachandra"],
        ans=0,
        exp="Prithviraj Chauhan III, ruler of Ajmer and Delhi, was defeated by Muhammad of Ghor in 1192 CE.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="delhi_sultanate_foundation",
        q="Who founded the Delhi Sultanate in 1206 CE?",
        opts=["Qutb-ud-din Aibak", "Mahmud of Ghazni", "Muhammad of Ghor", "Alauddin Khilji"],
        ans=0,
        exp="Qutb-ud-din Aibak, a slave-general of Muhammad of Ghor, founded the Delhi Sultanate in 1206 CE.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="muhammad_ghor_tarain",
        q="In which year was the Second Battle of Tarain fought, in which Muhammad of Ghor defeated Prithviraj Chauhan?",
        opts=["1192 CE", "1191 CE", "1206 CE", "1026 CE"],
        ans=0,
        exp="The Second Battle of Tarain (1192 CE) was decisive — Muhammad of Ghor defeated Prithviraj Chauhan.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="ghaznavid_vs_ghurid",
        q="Mahmud of Ghazni was a ruler of which dynasty?",
        opts=["Ghaznavid", "Ghurid", "Mamluk", "Tughlaq"],
        ans=0,
        exp="Mahmud of Ghazni was a Ghaznavid ruler; Muhammad of Ghor was a Ghurid ruler — two different dynasties.",
        diff="Medium",
    ),
]

Q_FILL_TEMPLATES = [
    # ── c7_histciv_001 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_001",
        topic="periodisation_europe",
        q="The medieval period in Europe began in ____ CE, when the last Roman emperor Romulus Augustulus was deposed.",
        ans="476",
        hint="The fall of the Western Roman Empire marks this date.",
        exp="476 CE: Odoacer deposed Romulus Augustulus, the last Western Roman emperor.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="periodisation_india",
        q="In India, the medieval period is generally traced from ____ CE, marked by the Arab conquest of Sindh.",
        ans="712",
        hint="The year of Muhammad bin Qasim's invasion of Sindh.",
        exp="712 CE: Muhammad bin Qasim's Arab conquest of Sindh is used as the conventional start of India's medieval period.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="etymology_medieval",
        q="The Latin phrase 'medium aevum', from which 'medieval' is derived, means '____ age'.",
        ans="middle",
        hint="Think of a period between two others.",
        exp="'Medium aevum' literally means 'middle age' — the period between ancient and modern times.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="types_of_evidence",
        q="____ evidence includes sources such as coins, inscriptions, and monuments.",
        ans="Archaeological",
        hint="This is contrasted with literary sources.",
        exp="Archaeological evidence (coins, inscriptions, monuments, pottery) helps periodise history alongside literary sources.",
        diff="Easy",
    ),
    # ── c7_histciv_009 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_009",
        topic="kaaba_polytheism",
        q="Before Islam, the Kaaba in Mecca housed approximately ____ idols.",
        ans="360",
        hint="Think of the number of days in a year.",
        exp="About 360 idols representing various tribal deities were housed in the Kaaba before Islam.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="jahiliyyah_social_evils",
        q="The pre-Islamic practice of burying infant daughters alive is called ____ in Arabic.",
        ans="wa'd al-banat",
        hint="An Arabic phrase referring to daughters.",
        exp="Wa'd al-banat ('the burying of daughters') was the pre-Islamic practice of female infanticide.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="bedouin_tribal_life",
        q="The pre-Islamic Arab tribes were known as ____ and lived a nomadic life.",
        ans="Bedouins",
        hint="Arabic word for desert-dwellers.",
        exp="The Bedouins were nomadic Arab tribes who herded camels and goats across the desert.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="quraysh_mecca",
        q="The ____ tribe controlled Mecca and its sacred Kaaba before Islam.",
        ans="Quraysh",
        hint="The tribe to which Prophet Muhammad also belonged.",
        exp="The Quraysh were the powerful merchant tribe controlling Mecca and the Kaaba before Islam.",
        diff="Medium",
    ),
    # ── c7_histciv_016 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_016",
        topic="somnath_1026",
        q="Mahmud of Ghazni raided the Somnath temple in the year ____ CE.",
        ans="1026",
        hint="This raid is one of the most famous of his 17 expeditions.",
        exp="1026 CE: Mahmud of Ghazni raided the Somnath temple and carried away its gold and jewels.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="mahmud_ghazni_raids",
        q="Mahmud of Ghazni raided India ____ times between 1000 CE and 1026 CE.",
        ans="17",
        hint="This is a specific number associated with Mahmud of Ghazni.",
        exp="Mahmud of Ghazni conducted 17 raids on India between 1000 CE and 1026 CE.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="delhi_sultanate_foundation",
        q="The Delhi Sultanate was founded in ____ CE by Qutb-ud-din Aibak.",
        ans="1206",
        hint="This followed Muhammad of Ghor's death.",
        exp="1206 CE: Qutb-ud-din Aibak, a slave-general of Muhammad of Ghor, founded the Delhi Sultanate.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="prithviraj_chauhan",
        q="Prithviraj Chauhan defeated Muhammad of Ghor in the First Battle of Tarain in ____ CE.",
        ans="1191",
        hint="One year before the decisive Second Battle.",
        exp="1191 CE: Prithviraj Chauhan won the First Battle of Tarain; Muhammad of Ghor returned to win in 1192 CE.",
        diff="Medium",
    ),
]

Q_SHORT_TEMPLATES = [
    # ── c7_histciv_001 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_001",
        topic="etymology_medieval",
        q="What does the Latin term 'medium aevum', from which 'medieval' is derived, literally mean?",
        ans="middle age",
        exp="'Medium aevum' = 'middle age'. The term was coined by Italian Renaissance humanists to describe the period between ancient Rome and their own 'rebirth' of classical learning.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="types_of_evidence",
        q="Name any two types of evidence used by historians to periodise history.",
        ans="literary and archaeological",
        exp="Historians use (1) Literary evidence — chronicles, poems, travelogues, and (2) Archaeological evidence — coins, inscriptions, monuments.",
        diff="Easy",
    ),
    dict(
        node_id="c7_histciv_001",
        topic="periodisation_europe",
        q="Who was Romulus Augustulus and why is the year 476 CE significant in European history?",
        ans="The last Western Roman emperor; his deposition in 476 CE marks the beginning of the medieval period in Europe.",
        exp="Romulus Augustulus was a teenage emperor deposed by the Germanic chieftain Odoacer in 476 CE, ending the Western Roman Empire.",
        diff="Easy",
    ),
    # ── c7_histciv_009 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_009",
        topic="jahiliyyah_social_evils",
        q="List any two social evils of pre-Islamic Arabia (Jahiliyyah).",
        ans="female infanticide and slavery",
        exp="Pre-Islamic Arabia practised female infanticide (wa'd al-banat), slavery, and widespread polytheism/idol worship at the Kaaba.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="bedouin_tribal_life",
        q="Explain in one sentence what 'blood revenge' meant in Bedouin tribal society.",
        ans="A custom where the killing of a tribesman had to be avenged by killing a member of the offender's clan (lex talionis).",
        exp="Lex talionis (law of retaliation) required the victim's family to kill someone from the murderer's tribe.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_009",
        topic="trade_routes_caravan",
        q="Why was Mecca an important city in pre-Islamic Arabia?",
        ans="Mecca was a major trade and pilgrimage centre on the spice route and housed the Kaaba.",
        exp="Mecca's strategic position on the Yemen-Syria trade route and its Kaaba (with 360 idols) made it a commercial and religious hub.",
        diff="Medium",
    ),
    # ── c7_histciv_016 ────────────────────────────────────────────────────────
    dict(
        node_id="c7_histciv_016",
        topic="somnath_1026",
        q="Why is the year 1026 CE significant in the history of Turkish invasions of India?",
        ans="Mahmud of Ghazni raided and plundered the Somnath temple in 1026 CE.",
        exp="The Somnath temple raid of 1026 CE was the most famous of Mahmud of Ghazni's 17 plunder expeditions.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="muhammad_ghor_tarain",
        q="What was the outcome of the Second Battle of Tarain (1192 CE)?",
        ans="Muhammad of Ghor defeated Prithviraj Chauhan, opening North India to Turkish rule.",
        exp="The Second Battle of Tarain (1192 CE) was decisive: Muhammad of Ghor defeated Prithviraj Chauhan III.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="delhi_sultanate_foundation",
        q="Who founded the Delhi Sultanate and in which year?",
        ans="Qutb-ud-din Aibak founded the Delhi Sultanate in 1206 CE.",
        exp="Qutb-ud-din Aibak, a slave-general (mamluk) of Muhammad of Ghor, became the first Sultan of Delhi in 1206 CE.",
        diff="Medium",
    ),
    dict(
        node_id="c7_histciv_016",
        topic="ghaznavid_vs_ghurid",
        q="How did Mahmud of Ghazni's invasions differ from Muhammad of Ghor's?",
        ans="Mahmud's raids were plunder expeditions; Muhammad of Ghor established lasting political control.",
        exp="Mahmud of Ghazni (Ghaznavid) raided for wealth (17 raids); Muhammad of Ghor (Ghurid) conquered territory and founded the Delhi Sultanate.",
        diff="Medium",
    ),
]


# ──────────────────────────────────────────────────────────────────────────────
# Numerical question generators  (SymPy / numpy / fractions used here)
# ──────────────────────────────────────────────────────────────────────────────

def _numerical_001(rng: SeededRNG) -> dict:
    """Q: Years between European and Indian medieval start dates; verify."""
    europe_start = 476
    india_start = 712
    correct_gap = india_start - europe_start   # 236 years

    student_answer_correct = rng.randint(200, 300)  # simulate a "student" answer
    is_correct = (student_answer_correct == correct_gap)

    steps = [
        f"European medieval start: {europe_start} CE",
        f"Indian medieval start  : {india_start} CE",
        f"Gap = {india_start} − {europe_start} = {correct_gap} years",
        f"Student answer: {student_answer_correct}",
        f"Match: {'✓ Correct' if is_correct else '✗ Incorrect'}",
    ]

    # numerical verification
    verification = {
        "europe_start": europe_start,
        "india_start": india_start,
        "expected_gap": correct_gap,
        "student_gap": student_answer_correct,
        "correct": is_correct,
        "check": f"{india_start} - {europe_start} = {correct_gap}",
    }
    return {
        "node_id": "c7_histciv_001",
        "topic": "periodisation_india",
        "type": "numerical",
        "difficulty": "Easy",
        "question": (
            f"How many years after the European medieval period began ({europe_start} CE) "
            f"is the Indian medieval period said to have begun ({india_start} CE)?"
        ),
        "answer": str(correct_gap),
        "student_answer": str(student_answer_correct),
        "is_correct": is_correct,
        "steps": steps,
        "verification": verification,
    }


def _numerical_009(rng: SeededRNG) -> dict:
    """Q: Total idols in Kaaba — sum verification using integer arithmetic."""
    idols_floor1 = 180
    idols_floor2 = 120
    idols_floor3 = 60
    total_idols = idols_floor1 + idols_floor2 + idols_floor3  # 360

    # simulate student adding two floors but forgetting one
    student_total = rng.choice([total_idols, total_idols - 60, total_idols + 12])
    is_correct = (student_total == total_idols)

    steps = [
        f"Idols on floor 1: {idols_floor1}",
        f"Idols on floor 2: {idols_floor2}",
        f"Idols on floor 3: {idols_floor3}",
        f"Total = {idols_floor1} + {idols_floor2} + {idols_floor3} = {total_idols}",
        f"Student answer: {student_total}",
        f"Match: {'✓ Correct' if is_correct else '✗ Incorrect'}",
    ]

    verification = {
        "floor1": idols_floor1,
        "floor2": idols_floor2,
        "floor3": idols_floor3,
        "expected_total": total_idols,
        "student_total": student_total,
        "correct": is_correct,
        "check": f"{idols_floor1}+{idols_floor2}+{idols_floor3} = {total_idols}",
    }
    return {
        "node_id": "c7_histciv_009",
        "topic": "kaaba_polytheism",
        "type": "numerical",
        "difficulty": "Medium",
        "question": (
            "The Kaaba housed idols across three sections. If section A had 180 idols, "
            "section B had 120 idols, and section C had 60 idols, how many idols were there in total?"
        ),
        "answer": str(total_idols),
        "student_answer": str(student_total),
        "is_correct": is_correct,
        "steps": steps,
        "verification": verification,
    }


def _numerical_016(rng: SeededRNG) -> dict:
    """Q: Timeline math — years between two key battles; verify via numpy."""
    import numpy as np

    first_battle = 1191
    second_battle = 1192
    years_between = second_battle - first_battle   # 1

    student_answer = rng.choice([years_between, years_between + 5, years_between - 1])
    is_correct = (student_answer == years_between)

    steps = [
        f"First Battle of Tarain  : {first_battle} CE (Prithviraj Chauhan won)",
        f"Second Battle of Tarain : {second_battle} CE (Muhammad of Ghor won)",
        f"Gap = {second_battle} − {first_battle} = {years_between} year",
        f"Student answer: {student_answer}",
        f"Match: {'✓ Correct' if is_correct else '✗ Incorrect'}",
    ]

    # numpy numerical verification
    arr = np.array([first_battle, second_battle])
    computed_gap = int(np.diff(arr)[0])

    verification = {
        "first_battle": first_battle,
        "second_battle": second_battle,
        "expected_gap": years_between,
        "numpy_computed_gap": computed_gap,
        "student_gap": student_answer,
        "correct": is_correct,
        "check": f"numpy.diff([{first_battle},{second_battle}]) = {computed_gap}",
    }
    return {
        "node_id": "c7_histciv_016",
        "topic": "muhammad_ghor_tarain",
        "type": "numerical",
        "difficulty": "Medium",
        "question": (
            f"How many years elapsed between the First Battle of Tarain ({first_battle} CE) "
            f"and the Second Battle of Tarain ({second_battle} CE)?"
        ),
        "answer": str(years_between),
        "student_answer": str(student_answer),
        "is_correct": is_correct,
        "steps": steps,
        "verification": verification,
    }


# ──────────────────────────────────────────────────────────────────────────────
# Solver functions
# ──────────────────────────────────────────────────────────────────────────────

def solve_mcq(selected_option: int, correct_option: int) -> dict:
    """Solve / verify a multiple-choice question."""
    is_correct = (selected_option == correct_option)
    steps = [
        f"Step 1: Identify the correct option index = {correct_option}.",
        f"Step 2: Compare student selection ({selected_option}) with correct answer ({correct_option}).",
        f"Step 3: {'Correct ✓' if is_correct else 'Incorrect ✗'} — correct answer is option {correct_option}.",
    ]
    return {
        "selected_option": selected_option,
        "correct_option": correct_option,
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "direct_comparison",
            "selected": selected_option,
            "correct": correct_option,
            "match": is_correct,
        },
    }


def solve_fill_blank(student_answer: str, correct_answer: str) -> dict:
    """Solve / verify a fill-in-the-blank question (case-insensitive, stripped)."""
    s = student_answer.strip().lower()
    c = correct_answer.strip().lower()
    is_correct = (s == c)
    steps = [
        f"Step 1: Normalise student answer: '{student_answer}' → '{s}'",
        f"Step 2: Normalise correct answer: '{correct_answer}' → '{c}'",
        f"Step 3: Compare: {'✓ Match' if is_correct else '✗ No match'}.",
        f"Step 4: Correct answer is '{correct_answer}'.",
    ]
    return {
        "student_answer": student_answer,
        "correct_answer": correct_answer,
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "string_equality_normalised",
            "student": s,
            "correct": c,
            "match": is_correct,
        },
    }


def solve_short_answer(student_answer: str, correct_answer: str) -> dict:
    """Solve / verify a short-answer question (substring match + length heuristic)."""
    s_words = set(student_answer.lower().split())
    c_words = set(correct_answer.lower().split())
    overlap = s_words & c_words
    coverage = len(overlap) / len(c_words) if c_words else 0.0
    is_correct = coverage >= 0.5
    steps = [
        f"Step 1: Tokenise answer and expected response.",
        f"Step 2: Student key-words : {sorted(s_words)}",
        f"Step 3: Correct key-words  : {sorted(c_words)}",
        f"Step 4: Overlapping words  : {sorted(overlap)} (coverage: {coverage:.0%})",
        f"Step 5: {'✓ Accepted (≥50% overlap)' if is_correct else '✗ Needs improvement (<50% overlap)'}.",
        f"Full correct answer: '{correct_answer}'",
    ]
    return {
        "student_answer": student_answer,
        "correct_answer": correct_answer,
        "is_correct": is_correct,
        "coverage": round(coverage, 4),
        "steps": steps,
        "verification": {
            "method": "word_overlap_50pct_threshold",
            "student_words": sorted(s_words),
            "correct_words": sorted(c_words),
            "overlap": sorted(overlap),
            "coverage": round(coverage, 4),
            "accepted": is_correct,
        },
    }


def solve_numerical(student_answer, correct_answer: str, steps: list, verification: dict) -> dict:
    """Solve / verify a numerical question — delegates to verification dict."""
    try:
        s_val = float(student_answer)
        c_val = float(correct_answer)
        is_correct = math.isclose(s_val, c_val, rel_tol=1e-6)
    except (ValueError, TypeError):
        is_correct = False

    all_steps = ["[Numerical Question Solver]"] + steps + [
        f"Final check: student={student_answer}, correct={correct_answer} → {'✓' if is_correct else '✗'}",
    ]
    return {
        "student_answer": str(student_answer),
        "correct_answer": correct_answer,
        "is_correct": is_correct,
        "steps": all_steps,
        "verification": verification,
    }


def solve_long_answer(student_answer: str, key_points: List[str]) -> dict:
    """Verify long-answer against a list of required key-points."""
    s_lower = student_answer.lower()
    hit_points = [kp for kp in key_points if kp.lower() in s_lower]
    coverage = len(hit_points) / len(key_points) if key_points else 0.0
    is_correct = coverage >= 0.5
    steps = [
        f"Step 1: Check long-answer against {len(key_points)} required key-points.",
    ]
    for i, kp in enumerate(key_points, 1):
        hit = kp.lower() in s_lower
        steps.append(f"  Key-point {i}: '{kp}' → {'✓ Found' if hit else '✗ Missing'}")
    steps += [
        f"Step 2: Coverage = {len(hit_points)}/{len(key_points)} = {coverage:.0%}",
        f"Step 3: {'✓ Accepted (≥50% key-points)' if is_correct else '✗ Needs improvement'}.",
    ]
    return {
        "student_answer": student_answer,
        "key_points_required": key_points,
        "key_points_hit": hit_points,
        "coverage": round(coverage, 4),
        "is_correct": is_correct,
        "steps": steps,
        "verification": {
            "method": "key_point_coverage_50pct",
            "required": key_points,
            "hit": hit_points,
            "coverage": round(coverage, 4),
            "accepted": is_correct,
        },
    }


# ──────────────────────────────────────────────────────────────────────────────
# Question generation
# ──────────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate *count* deterministic questions from the syllabus nodes.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Number of questions to generate (max 50 per call; repeat if more needed).

    Returns
    -------
    list[dict]
        Each dict has keys:
          id, node_id, topic, type, difficulty,
          question, options / blank_hint,
          answer, explanation,
          competency (bool), steps (list)
    """
    rng = SeededRNG(seed)

    # 50 % competency / contextual (Indian school context); 50 % standard
    n_competency = count // 2
    n_standard = count - n_competency

    questions: List[Dict[str, Any]] = []
    q_id_counter = 0

    def _next_id(prefix: str) -> str:
        nonlocal q_id_counter
        q_id_counter += 1
        return f"{prefix}_{seed:06d}_{q_id_counter:04d}"

    # ── shuffle topic pool ────────────────────────────────────────────────────
    topic_pool = list(ALL_TOPICS)
    rng.shuffle(topic_pool)

    # ── helper: pick a topic round-robin ──────────────────────────────────────
    topic_iter = iter(topic_pool * ((count // len(topic_pool)) + 2))

    # ── MCQ ──────────────────────────────────────────────────────────────────
    mcq_templates = list(Q_MCQ_TEMPLATES)
    rng.shuffle(mcq_templates)
    mcq_iter = iter(mcq_templates * ((count // len(mcq_templates)) + 2))

    num_mcq = min(count // 5, len(mcq_templates))
    for _ in range(num_mcq):
        tmpl = next(mcq_iter, mcq_templates[0])
        opts = list(tmpl["opts"])
        rng.shuffle(opts)
        correct_idx = opts.index(tmpl["opts"][tmpl["ans"]])
        is_comp = rng.random() < 0.5
        questions.append({
            "id": _next_id("mcq"),
            "node_id": tmpl["node_id"],
            "topic": tmpl["topic"],
            "type": "mcq",
            "difficulty": tmpl["diff"],
            "competency": is_comp,
            "question": tmpl["q"],
            "options": opts,
            "answer": opts[correct_idx],
            "answer_index": correct_idx,
            "explanation": tmpl["exp"],
            "steps": [
                f"Step 1: Recall relevant facts for topic '{tmpl['topic']}'.",
                f"Step 2: Evaluate each option against historical knowledge.",
                f"Step 3: Eliminate incorrect options.",
                f"Step 4: Select the correct answer: '{opts[correct_idx]}'.",
                f"Verification: '{tmpl['exp']}'",
            ],
            "solver": lambda sel=0, cor=correct_idx: solve_mcq(sel, cor),
        })

    # ── Fill-in-the-blank ─────────────────────────────────────────────────────
    fill_templates = list(Q_FILL_TEMPLATES)
    rng.shuffle(fill_templates)
    fill_iter = iter(fill_templates * ((count // len(fill_templates)) + 2))

    num_fill = min(count // 5, len(fill_templates))
    for _ in range(num_fill):
        tmpl = next(fill_iter, fill_templates[0])
        is_comp = rng.random() < 0.5
        questions.append({
            "id": _next_id("fib"),
            "node_id": tmpl["node_id"],
            "topic": tmpl["topic"],
            "type": "fill_blank",
            "difficulty": tmpl["diff"],
            "competency": is_comp,
            "question": tmpl["q"],
            "blank_hint": tmpl.get("hint", ""),
            "answer": tmpl["ans"],
            "explanation": tmpl["exp"],
            "steps": [
                f"Step 1: Identify the missing information in the statement.",
                f"Step 2: Recall the relevant fact for topic '{tmpl['topic']}'.",
                f"Step 3: Fill the blank with the correct term/number.",
                f"Step 4: Correct answer: '{tmpl['ans']}'.",
                f"Verification: '{tmpl['exp']}'",
            ],
            "solver": lambda sa="", ca=tmpl["ans"]: solve_fill_blank(sa, ca),
        })

    # ── Short answer ──────────────────────────────────────────────────────────
    short_templates = list(Q_SHORT_TEMPLATES)
    rng.shuffle(short_templates)
    short_iter = iter(short_templates * ((count // len(short_templates)) + 2))

    num_short = min(count // 5, len(short_templates))
    for _ in range(num_short):
        tmpl = next(short_iter, short_templates[0])
        is_comp = rng.random() < 0.5
        questions.append({
            "id": _next_id("sa"),
            "node_id": tmpl["node_id"],
            "topic": tmpl["topic"],
            "type": "short_answer",
            "difficulty": tmpl["diff"],
            "competency": is_comp,
            "question": tmpl["q"],
            "answer": tmpl["ans"],
            "explanation": tmpl["exp"],
            "steps": [
                f"Step 1: Understand the question — topic '{tmpl['topic']}'.",
                f"Step 2: Recall the key facts from the syllabus.",
                f"Step 3: Construct a concise answer.",
                f"Step 4: Correct answer: '{tmpl['ans']}'.",
                f"Verification: '{tmpl['exp']}'",
            ],
            "solver": lambda sa="", ca=tmpl["ans"]: solve_short_answer(sa, ca),
        })

    # ── Long answer ───────────────────────────────────────────────────────────
    long_answer_templates = [
        {
            "node_id": "c7_histciv_001",
            "topic": "etymology_medieval",
            "q": (
                "Describe how the term 'medieval' originated and explain the basis for "
                "marking the beginning of the medieval period in both Europe and India. "
                "Include at least two types of historical evidence."
            ),
            "ans": "medium aevum, middle age, 476 CE, Romulus Augustulus, Odoacer, 712 CE, Muhammad bin Qasim, Sindh, literary, archaeological",
            "key_points": [
                "medieval comes from Latin medium aevum meaning middle age",
                "476 CE marks the European medieval start (fall of Western Roman Empire)",
                "712 CE marks the Indian medieval start (Arab conquest of Sindh)",
                "literary and archaeological are two types of evidence",
            ],
            "diff": "Easy",
        },
        {
            "node_id": "c7_histciv_009",
            "topic": "jahiliyyah_social_evils",
            "q": (
                "Describe the socio-political conditions of pre-Islamic Arabia, including "
                "tribal organisation, the role of Mecca as a trade centre, and any three "
                "social evils of the Jahiliyyah."
            ),
            "ans": "bedouin, clan, loyalty, quraysh, kaaba, mecca, trade, caravans, female infanticide, slavery, polytheism, wa'd al-banat, blood revenge, lex talionis",
            "key_points": [
                "bedouin tribal society organised around clans",
                "quraysh controlled mecca and the kaaba",
                "mecca was a trade and pilgrimage centre",
                "social evils: female infanticide, slavery, polytheism",
            ],
            "diff": "Medium",
        },
        {
            "node_id": "c7_histciv_016",
            "topic": "ghaznavid_vs_ghurid",
            "q": (
                "Compare and contrast the invasions of Mahmud of Ghazni and Muhammad of Ghor. "
                "Explain how Muhammad of Ghor's conquest laid the foundation for the Delhi Sultanate."
            ),
            "ans": "mahmud of ghazni, 17 raids, plunder, somnath 1026, muhammad of ghor, second battle tarain 1192, prithviraj chauhan, qutb-uddin aibak, delhi sultanate 1206, ghaznavid, ghurid, political control",
            "key_points": [
                "mahmud of ghazni conducted 17 raids for plunder",
                "muhammad of ghor conquered territory politically",
                "second battle of tarain 1192 defeated prithviraj chauhan",
                "qutb-uddin aibak founded delhi sultanate in 1206",
            ],
            "diff": "Medium",
        },
    ]

    num_long = min(count // 5, len(long_answer_templates))
    for i in range(num_long):
        tmpl = long_answer_templates[i % len(long_answer_templates)]
        is_comp = rng.random() < 0.5
        questions.append({
            "id": _next_id("la"),
            "node_id": tmpl["node_id"],
            "topic": tmpl["topic"],
            "type": "long_answer",
            "difficulty": tmpl["diff"],
            "competency": is_comp,
            "question": tmpl["q"],
            "answer": tmpl["ans"],
            "key_points": tmpl["key_points"],
            "explanation": (
                f"A good answer should cover: {', '.join(tmpl['key_points'])}. "
                f"See syllabus node {tmpl['node_id']} for full details."
            ),
            "steps": [
                f"Step 1: Identify all sub-questions in the prompt.",
                f"Step 2: Recall syllabus node '{tmpl['node_id']}' key facts.",
            ] + [f"Step {i+3}: Cover point: '{kp}'" for i, kp in enumerate(tmpl["key_points"])] + [
                f"Step {len(tmpl['key_points'])+3}: Verify all key-points addressed.",
            ],
            "solver": lambda sa="", kp=tmpl["key_points"]: solve_long_answer(sa, kp),
        })

    # ── Numerical ─────────────────────────────────────────────────────────────
    numerical_generators = [_numerical_001, _numerical_009, _numerical_016]
    rng.shuffle(numerical_generators)
    num_num = min(count // 5, len(numerical_generators))
    for i in range(num_num):
        gen = numerical_generators[i % len(numerical_generators)]
        nq = gen(rng)
        is_comp = rng.random() < 0.5
        questions.append({
            "id": _next_id("num"),
            "node_id": nq["node_id"],
            "topic": nq["topic"],
            "type": "numerical",
            "difficulty": nq["difficulty"],
            "competency": is_comp,
            "question": nq["question"],
            "answer": nq["answer"],
            "explanation": (
                f"Verified using {nq['verification'].get('check', 'computation')}. "
                f"Correct answer: {nq['answer']}."
            ),
            "steps": nq["steps"],
            "verification": nq["verification"],
            "solver": lambda sa=nq["student_answer"], ans=nq["answer"],
                           st=nq["steps"], v=nq["verification"]: solve_numerical(sa, ans, st, v),
        })

    # ── Trim / pad to exact count ─────────────────────────────────────────────
    while len(questions) < count:
        tmpl = rng.choice(Q_MCQ_TEMPLATES)
        opts = list(tmpl["opts"])
        rng.shuffle(opts)
        correct_idx = opts.index(tmpl["opts"][tmpl["ans"]])
        questions.append({
            "id": _next_id("pad"),
            "node_id": tmpl["node_id"],
            "topic": tmpl["topic"],
            "type": "mcq",
            "difficulty": tmpl["diff"],
            "competency": rng.random() < 0.5,
            "question": tmpl["q"],
            "options": opts,
            "answer": opts[correct_idx],
            "answer_index": correct_idx,
            "explanation": tmpl["exp"],
            "steps": [
                f"Step 1: Recall relevant facts for '{tmpl['topic']}'.",
                f"Step 2: Evaluate each option.",
                f"Step 3: Correct answer: '{opts[correct_idx]}'.",
            ],
            "solver": lambda sel=0, cor=correct_idx: solve_mcq(sel, cor),
        })

    # Deterministic shuffle of final list
    rng.shuffle(questions)

    # Reassign IDs after shuffle for consistency
    for idx, q in enumerate(questions):
        prefix = {"mcq": "mcq", "fill_blank": "fib", "short_answer": "sa",
                  "long_answer": "la", "numerical": "num"}.get(q["type"], "q")
        q["id"] = f"{prefix}_{seed:06d}_{idx + 1:04d}"

    return questions[:count]


# ──────────────────────────────────────────────────────────────────────────────
# Convenience: print summary
# ──────────────────────────────────────────────────────────────────────────────
def print_question_summary(questions: List[dict]) -> None:
    """Pretty-print a summary of generated questions."""
    from collections import Counter
    type_counts = Counter(q["type"] for q in questions)
    node_counts = Counter(q["node_id"] for q in questions)
    comp_count = sum(1 for q in questions if q.get("competency"))
    print(f"Total questions generated : {len(questions)}")
    print(f"Competency-based          : {comp_count} ({comp_count / len(questions):.0%})")
    print(f"By type                   : {dict(type_counts)}")
    print(f"By syllabus node          : {dict(node_counts)}")
    print()
    for i, q in enumerate(questions, 1):
        print(f"  [{i:02d}] [{q['type']:12s}] [{q['node_id']}] [{q.get('difficulty','?')}] "
              f"competency={q.get('competency', '?')}")
        print(f"         Q: {q['question'][:90]}{'...' if len(q['question']) > 90 else ''}")


# ──────────────────────────────────────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    SEED = 42
    COUNT = 20

    print(f"Generating {COUNT} CISCE Class 7 HISTCIV questions with seed={SEED} ...\n")
    questions = generate_questions(seed=SEED, count=COUNT)
    print_question_summary(questions)

    # ── Demonstrate solver on first MCQ ───────────────────────────────────────
    print("\n" + "=" * 70)
    print("SOLVER DEMONSTRATION — first MCQ question")
    print("=" * 70)
    q0 = questions[0]
    if q0["type"] == "mcq" and "solver" in q0:
        result = q0["solver"](selected_option=q0["answer_index"],
                              correct_option=q0["answer_index"])
        print(f"Question : {q0['question']}")
        print(f"Options  : {q0['options']}")
        print(f"Answer   : {q0['answer']}")
        print("\nSolver Steps:")
        for step in result["steps"]:
            print(f"  {step}")
        print(f"\nVerification: {result['verification']}")

    # ── Demonstrate solver on first fill-blank ────────────────────────────────
    for q in questions:
        if q["type"] == "fill_blank" and "solver" in q:
            result = q["solver"](student_answer=q["answer"],
                                 correct_answer=q["answer"])
            print("\n" + "=" * 70)
            print("SOLVER DEMONSTRATION — fill_blank question")
            print("=" * 70)
            print(f"Question : {q['question']}")
            print(f"Answer   : {q['answer']}")
            print("\nSolver Steps:")
            for step in result["steps"]:
                print(f"  {step}")
            print(f"\nVerification: {result['verification']}")
            break

    # ── Demonstrate solver on a numerical question ────────────────────────────
    for q in questions:
        if q["type"] == "numerical" and "solver" in q:
            result = q["solver"](sa=q["answer"], ans=q["answer"])
            print("\n" + "=" * 70)
            print("SOLVER DEMONSTRATION — numerical question")
            print("=" * 70)
            print(f"Question : {q['question']}")
            print(f"Answer   : {q['answer']}")
            print("\nSolver Steps:")
            for step in result["steps"]:
                print(f"  {step}")
            print(f"\nVerification: {result['verification']}")
            break

    # ── Demonstrate solver on a long-answer question ──────────────────────────
    for q in questions:
        if q["type"] == "long_answer" and "solver" in q:
            fake_answer = " ".join(q.get("key_points", [q["answer"]]))
            result = q["solver"](sa=fake_answer)
            print("\n" + "=" * 70)
            print("SOLVER DEMONSTRATION — long_answer question")
            print("=" * 70)
            print(f"Question : {q['question']}")
            print("\nSolver Steps:")
            for step in result["steps"]:
                print(f"  {step}")
            print(f"\nCoverage : {result['coverage']:.0%}")
            print(f"Accepted : {result['is_correct']}")
            break