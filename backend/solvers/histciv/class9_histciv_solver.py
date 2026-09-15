"""
CISCE HISTCIV Class 9 - Deterministic Solver & Question Generator
Syllabus: Chola Sources, Renaissance (Causes), Definition of Constitution
"""

import random
import hashlib
import string
import math
from fractions import Fraction
from typing import Any

# ──────────────────────────────────────────────
#  DATABASE - ALL SYLLABUS NODES
# ──────────────────────────────────────────────

NODES = [
    # ── Cholas ──
    {
        "id": "c9_histciv_052",
        "title": "The Cholas - Sources",
        "topic": "chola_sources",
        "chapter": "Chola Dynasty",
        "difficulty": "Medium",
        "cognitive": "understand",
    },
    # ── Renaissance ──
    {
        "id": "c9_histciv_062",
        "title": "Renaissance - Causes",
        "topic": "renaissance",
        "chapter": "The Renaissance",
        "difficulty": "Medium",
        "cognitive": "understand",
    },
    # ── Civics ──
    {
        "id": "c9_histciv_001",
        "title": "Definition of a Constitution",
        "topic": "constitution",
        "chapter": "The Constitution",
        "difficulty": "Easy",
        "cognitive": "understand",
    },
]

# ──────────────────────────────────────────────
#  QUESTION BANK
# ──────────────────────────────────────────────

QBANK = {}

# ─── c9_histciv_052  Chola Sources ────────────────────────────────

QBANK.setdefault("c9_histciv_052", {})

QBANK["c9_histciv_052"]["mcq"] = [
    {
        "id": "c9_052_mcq_001",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "question": "Which inscription records Rajaraja I's grant of land to a Buddhist temple at Nagapattinam and proves Chola religious tolerance and maritime trade links?",
        "options": ["Tiruvalangadu Copperplates", "Leyden Copperplates", "Karandai Sangam Plates", "Uttiramerur Inscriptions"],
        "answer": "Leyden Copperplates",
        "option_indices": {"Leyden Copperplates": 1, "Tiruvalangadu Copperplates": 0, "Karandai Sangam Plates": 2, "Uttiramerur Inscriptions": 3},
        "explanation": (
            "The Leyden Copperplates (c. 1008 CE), named after the Dutch city Leiden where one copy is preserved, "
            "record Rajaraja I's grant of land to a Buddhist temple at Nagapattinam. "
            "This proves Chola religious tolerance (patronage to Buddhists despite being Shaivite Hindus) "
            "and maritime trade links, as Nagapattinam was a major port with Sri Lankan and Southeast-Asian connections."
        ),
    },
    {
        "id": "c9_052_mcq_002",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "question": (
            "The Brihadishwara Temple at Thanjavur, built c. 1010 CE by Rajaraja I, is important as a historical "
            "source because:"
        ),
        "options": [
            "It is the only Chola temple with Dravida architecture",
            "Its walls carry inscriptions listing the Chola army, navy, and devadasis - acting as a state archive",
            "It contains the only Chola copperplate inscriptions in India",
            "It was built by Rajendra I after his Ganga expedition",
        ],
        "answer": "Its walls carry inscriptions listing the Chola army, navy, and devadasis - acting as a state archive",
        "option_indices": {
            "Its walls carry inscriptions listing the Chola army, navy, and devadasis - acting as a state archive": 1,
            "It is the only Chola temple with Dravida architecture": 0,
            "It contains the only Chola copperplate inscriptions in India": 2,
            "It was built by Rajendra I after his Ganga expedition": 3,
        },
        "explanation": (
            "The Brihadishwara Temple (Big Temple) is one of the largest Dravida-style temples. "
            "Its walls carry detailed inscriptions recording Rajaraja I's grants, his generals, "
            "elephant corps, dancers (devadasis), and administrative staff - making it a "
            "political statement AND a written archive. It was built by Rajaraja I, not Rajendra I."
        ),
    },
    {
        "id": "c9_052_mcq_003",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "question": "Which inscription describes Rajendra I's North Indian expedition up to the Ganga river?",
        "options": ["Leyden Copperplates", "Tiruvalangadu Copperplates", "Karandai Sangam Plates", "Hampi Inscriptions"],
        "answer": "Tiruvalangadu Copperplates",
        "option_indices": {"Tiruvalangadu Copperplates": 1, "Leyden Copperplates": 0, "Karandai Sangam Plates": 2, "Hampi Inscriptions": 3},
        "explanation": (
            "The Tiruvalangadu Copperplates describe Rajendra I's famous North Indian campaign "
            "in which he conquered territories up to the Ganga river (modern Bihar/Bengal). "
            "This expedition earned him the title 'Gangaikonda Chola' ('the Chola who conquered the Ganga'). "
            "He then founded a new capital called Gangaikonda Cholapuram."
        ),
    },
    {
        "id": "c9_052_mcq_004",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "chola_sources",
        "question": "The term 'epigraphy' refers to:",
        "options": [
            "The study of coins",
            "The study of inscriptions on stone, metal, and other durable materials",
            "The study of temple architecture",
            "The study of ancient manuscripts written on palm leaves",
        ],
        "answer": "The study of inscriptions on stone, metal, and other durable materials",
        "option_indices": {
            "The study of inscriptions on stone, metal, and other durable materials": 1,
            "The study of coins": 0,
            "The study of temple architecture": 2,
            "The study of ancient manuscripts written on palm leaves": 3,
        },
        "explanation": (
            "Epigraphy is the study of inscriptions - writings engraved on durable surfaces such as stone, "
            "copper, and gold. Chola copperplate inscriptions (on copper sheets) are prime examples "
            "studied by epigraphists. Numismatics is the study of coins; paleography is the study of ancient scripts."
        ),
    },
]

QBANK["c9_histciv_052"]["fill_blank"] = [
    {
        "id": "c9_052_fb_001",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "question": (
            "The _______________ (c. 1008 CE) record Rajaraja I's grant of land to a Buddhist temple at "
            "Nagapattinam and prove Chola religious tolerance and maritime trade links. "
            "(Hint: named after a European city where one copy is preserved)"
        ),
        "answer": "Leyden Copperplates",
        "alternatives": ["Leiden Copperplates"],
        "explanation": (
            "The Leyden Copperplates (c. 1008 CE) are so named because one copy is preserved in Leiden "
            "(Leyden), Netherlands. They record Rajaraja I's land grant to a Buddhist temple at Nagapattinam, "
            "proving Chola religious tolerance (Shaivite rulers patronising Buddhist institutions) and "
            "maritime trade - Nagapattinam was a major Chola port with links to Sri Lanka and Southeast Asia."
        ),
    },
    {
        "id": "c9_052_fb_002",
        "type": "fill_blank",
        "difficulty": "Easy",
        "topic": "chola_sources",
        "question": (
            "The Brihadishwara Temple was built around 1010 CE at _______________ by Rajaraja I. "
            "It is one of the largest Dravida-style temples and its walls carry important inscriptions."
        ),
        "answer": "Thanjavur",
        "alternatives": ["Tanjore"],
        "explanation": (
            "The Brihadishwara (Brihadeeswarar) Temple was built by Rajaraja I around 1010 CE at Thanjavur "
            "(also known as Tanjore), the Chola capital. Known also as the 'Big Temple', it is a UNESCO World "
            "Heritage Site. Its 66-metre tower (vimana) dominates the skyline, and its walls contain extensive "
            "inscriptions recording the Chola administration and military."
        ),
    },
    {
        "id": "c9_052_fb_003",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "question": (
            "The inscriptions on the walls of the Brihadishwara Temple list Rajaraja I's _______________, "
            "elephant corps, and _______________ (dancers), revealing details of Chola military and cultural life."
        ),
        "answer": "generals; devadasis",
        "alternatives": ["generals; devadasis"],
        "explanation": (
            "The Brihadishwara Temple inscriptions record: (1) Rajaraja I's generals and military officers, "
            "(2) the composition of his army including the elephant corps, (3) donations of land and jewels, "
            "and (4) names of devadasis (temple dancers dedicated to Shiva). "
            "This shows the temple functioned as a royal archive, not just a religious building. "
            "The word 'devadasi' means 'servant of god' - women dedicated to temple service who were also "
            "patrons of arts and music."
        ),
    },
]

QBANK["c9_histciv_052"]["short_answer"] = [
    {
        "id": "c9_052_sa_001",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "question": (
            "Name two important Chola copperplate inscriptions and state what historical information "
            "each one provides."
        ),
        "answer": (
            "(1) Leyden Copperplates (c. 1008 CE): Record Rajaraja I's grant of land to a Buddhist temple "
            "at Nagapattinam, proving Chola religious tolerance and maritime trade links. "
            "(2) Tiruvalangadu Copperplates: Describe Rajendra I's North Indian expedition up to the Ganga river. "
            "(3) Karandai Sangam Plates (1021 CE): Record Rajendra I's wars with the Chalukyas and territorial control."
        ),
        "explanation": (
            "Chola history is primarily reconstructed from three major copperplate inscriptions: "
            "(1) Leyden Copperplates (c. 1008 CE) - named after Leiden, Netherlands; grant to Buddhist "
            "temple at Nagapattinam; shows religious tolerance and maritime trade. "
            "(2) Tiruvalangadu Copperplates - describe Rajendra I's northern campaign to the Ganga. "
            "(3) Karandai Sangam Plates (1021 CE) - document Rajendra I's wars with the Chalukyas. "
            "Copperplates were legal records of royal grants written on copper sheets and sealed with royal seals."
        ),
    },
    {
        "id": "c9_052_sa_002",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "question": (
            "In what ways does the Brihadishwara Temple at Thanjavur serve as a valuable historical source "
            "for studying the Chola administration and society?"
        ),
        "answer": (
            "The Brihadishwara Temple (c. 1010 CE) serves as a historical source because: "
            "(1) Its walls carry detailed inscriptions listing Rajaraja I's generals, military officers, "
            "and the composition of his army (including the elephant corps). "
            "(2) It records land grants and donations to the temple, showing Chola revenue and land administration. "
            "(3) It lists names of devadasis (temple dancers), providing evidence of Chola cultural and social life. "
            "(4) As an architectural monument, its scale and grandeur reflect Chola wealth, engineering skill, "
            "and the power of the Chola king. It functions simultaneously as a temple, a record office, and "
            "a political statement of imperial power."
        ),
        "explanation": (
            "The Brihadishwara Temple was built by Rajaraja I around 1010 CE. It is 66 metres tall and "
            "crowned with a 80-ton granite capstone. Its walls contain inscriptions that list military "
            "personnel, revenue records, and cultural functionaries - making it a 'state archive in stone'. "
            "The inscriptions mention 400 devadasis, 60 musicians, and dozens of priests, revealing Chola "
            "society's cultural richness. The temple also demonstrates Chola architectural excellence and "
            "the close relationship between religion, politics, and administration in the Chola empire."
        ),
    },
]

QBANK["c9_histciv_052"]["long_answer"] = [
    {
        "id": "c9_052_la_001",
        "type": "long_answer",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "marks": (4, 6),
        "question": (
            "Discuss the importance of Chola inscriptions (the Leyden, Tiruvalangadu, and Karandai copperplates) "
            "and the Brihadishwara Temple at Thanjavur as sources of Chola history. "
            "Give specific information each source provides."
        ),
        "answer": (
            "Chola history is primarily known from epigraphic (inscription) sources and monuments. "
            "(1) The Leyden Copperplates (c. 1008 CE) record Rajaraja I's grant of land to a Buddhist temple "
            "at Nagapattinam, proving Chola religious tolerance and maritime trade links. "
            "(2) The Tiruvalangadu Copperplates describe Rajendra I's North Indian expedition up to the Ganga, "
            "justifying his title 'Gangaikonda Chola'. "
            "(3) The Karandai Sangam Plates (1021 CE) record Rajendra I's wars with the Chalukyas. "
            "(4) The Brihadishwara Temple at Thanjavur (c. 1010 CE) contains inscriptions on its walls "
            "listing Rajaraja's generals, elephant corps, devadasis, and land grants - making it "
            "a 'political archive' and cultural record. Together, these sources reveal Chola military "
            "organisation, administrative methods, religious tolerance, trade links, and artistic achievements."
        ),
        "explanation": (
            "This 4-6 mark answer should credit inscriptions for specific facts and the Brihadishwara Temple "
            "for administrative/cultural data. Key points to include: names and dates of three copperplates; "
            "specific information each records; the dual role of the temple (religious monument + archive); "
            "inscriptions listing army, devadasis, land grants."
        ),
    },
]

# ─── c9_histciv_062  Renaissance Causes ──────────────────────────

QBANK.setdefault("c9_histciv_062", {})

QBANK["c9_histciv_062"]["mcq"] = [
    {
        "id": "c9_062_mcq_001",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "renaissance",
        "question": "The Renaissance was primarily:",
        "options": [
            "A military conquest of Europe by the Ottoman Turks",
            "An intellectual and cultural movement of humanism reviving Greek and Roman learning",
            "A religious reform movement led by the Catholic Church",
            "An agricultural revolution in medieval Europe",
        ],
        "answer": "An intellectual and cultural movement of humanism reviving Greek and Roman learning",
        "option_indices": {
            "An intellectual and cultural movement of humanism reviving Greek and Roman learning": 1,
            "A military conquest of Europe by the Ottoman Turks": 0,
            "A religious reform movement led by the Catholic Church": 2,
            "An agricultural revolution in medieval Europe": 3,
        },
        "explanation": (
            "The Renaissance (French for 'rebirth') was an intellectual and cultural movement that began in "
            "Italy in the 14th century. It was primarily driven by humanism - the revival of Greek and Roman "
            "classical learning. Art, sculpture, and literature flourished, but the core was an intellectual "
            "shift toward human potential, secular achievement, and rational enquiry."
        ),
    },
    {
        "id": "c9_062_mcq_002",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "renaissance",
        "question": (
            "How did the Ottoman capture of Constantinople in 1453 contribute to the Renaissance?"
        ),
        "options": [
            "Ottoman armies directly funded Italian artists",
            "Greek scholars fled to Italy carrying classical Greek and Roman manuscripts",
            "Turkish traders introduced new crops that financed Italian art",
            "The Pope moved to Constantinople and brought the Church's library",
        ],
        "answer": "Greek scholars fled to Italy carrying classical Greek and Roman manuscripts",
        "option_indices": {
            "Greek scholars fled to Italy carrying classical Greek and Roman manuscripts": 1,
            "Ottoman armies directly funded Italian artists": 0,
            "Turkish traders introduced new crops that financed Italian art": 2,
            "The Pope moved to Constantinople and brought the Church's library": 3,
        },
        "explanation": (
            "In 1453, Sultan Mehmed II captured Constantinople, ending the Byzantine Empire. "
            "Greek scholars such as Manuel Chrysoloras fled to Florence and other Italian city-states, "
            "carrying precious manuscripts of ancient Greek and Roman philosophy, science, and literature. "
            "Italian humanists had already begun studying classical texts; these refugees greatly expanded "
            "the corpus of available knowledge, directly fuelling the Renaissance."
        ),
    },
    {
        "id": "c9_062_mcq_003",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "renaissance",
        "question": (
            "Johannes Gutenberg's invention that greatly spread Renaissance ideas was:"
        ),
        "options": [
            "The mechanical clock",
            "Movable metal type and the printing press (c. 1440)",
            "The compass for sea navigation",
            "Gunpowder weapons",
        ],
        "answer": "Movable metal type and the printing press (c. 1440)",
        "option_indices": {
            "Movable metal type and the printing press (c. 1440)": 1,
            "The mechanical clock": 0,
            "The compass for sea navigation": 2,
            "Gunpowder weapons": 3,
        },
        "explanation": (
            "Johannes Gutenberg (c. 1400-1468) invented movable metal type and the printing press around "
            "1440 in Mainz, Germany. His first major work was the Gutenberg Bible (c. 1455). "
            "The press made books cheap and widely available, replacing handwritten manuscripts that were "
            "expensive and rare. It allowed new humanist, scientific, and religious ideas to spread rapidly "
            "across Europe - a key cause and amplifier of the Renaissance and later the Reformation."
        ),
    },
    {
        "id": "c9_062_mcq_004",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "renaissance",
        "question": (
            "Which family of Florence were the most famous patrons (sponsors) of Renaissance art and scholarship?"
        ),
        "options": ["The Borgias", "The Medicis", "The Sforzas", "The Habsburgs"],
        "answer": "The Medicis",
        "option_indices": {"The Medicis": 1, "The Borgias": 0, "The Sforzas": 2, "The Habsburgs": 3},
        "explanation": (
            "The Medici family of Florence - especially Cosimo de' Medici ('Pater Patriae') and "
            "Lorenzo de' Medici ('il Magnifico', 1469-1492) - were the greatest patrons of Renaissance art "
            "and scholarship. They funded painters like Botticelli and Michelangelo, architects like "
            "Brunelleschi, and humanist scholars. Their patronage made Florence the cradle of the Renaissance."
        ),
    },
]

QBANK["c9_histciv_062"]["fill_blank"] = [
    {
        "id": "c9_062_fb_001",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "renaissance",
        "question": (
            "The Renaissance began in the 14th century in the Italian city-state of _______________, "
            "under the patronage of the Medici family. "
            "(Hint: birthplace of Botticelli, Michelangelo, and the Medici bank)"
        ),
        "answer": "Florence",
        "alternatives": ["Firenze"],
        "explanation": (
            "Florence (Firenze in Italian) was the cradle of the Renaissance. Its wealth from banking "
            "(Medici Bank) and wool trade funded artists and scholars. Cosimo and Lorenzo de' Medici "
            "patronised Botticelli, Michelangelo, and Brunelleschi. Florence's republican government, "
            "humanist schools, and wealthy merchant class created the ideal conditions for the rebirth "
            "of classical learning."
        ),
    },
    {
        "id": "c9_062_fb_002",
        "type": "fill_blank",
        "difficulty": "Easy",
        "topic": "renaissance",
        "question": (
            "In _______________, the Ottoman Turks under Sultan Mehmed II captured Constantinople, "
            "ending the Byzantine Empire and prompting Greek scholars to flee to Italy with classical manuscripts."
        ),
        "answer": "1453",
        "alternatives": ["1453 CE"],
        "explanation": (
            "1453 CE: Sultan Mehmed II ('the Conqueror') captured Constantinople after a 53-day siege, "
            "ending the 1,000-year-old Byzantine Empire. Greek scholars fled westward to Italian city-states "
            "carrying invaluable manuscripts of ancient Greek philosophy, science, and literature. "
            "This influx of classical knowledge was a major catalyst for the Renaissance humanist movement."
        ),
    },
    {
        "id": "c9_062_fb_003",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "renaissance",
        "question": (
            "The intellectual movement at the heart of the Renaissance was _______________, which placed "
            "humans - not God - at the centre of study and emphasised human potential and secular achievement."
        ),
        "answer": "humanism",
        "alternatives": [],
        "explanation": (
            "Humanism was the defining intellectual movement of the Renaissance. Humanists such as "
            "Petrarch, Pico della Mirandola, and Erasmus studied classical Greek and Roman texts, "
            "emphasised human dignity and potential, and promoted secular education alongside religious learning. "
            "Humanism shifted focus from the medieval preoccupation with the afterlife to human achievement "
            "in this world - giving birth to modern education, literature, and the scientific spirit."
        ),
    },
]

QBANK["c9_histciv_062"]["short_answer"] = [
    {
        "id": "c9_062_sa_001",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "renaissance",
        "question": (
            "Explain five causes of the Renaissance and show how each contributed to its emergence."
        ),
        "answer": (
            "(1) Fall of Constantinople (1453): Greek scholars fled to Italy with classical manuscripts, "
            "reviving interest in Greek and Roman learning. "
            "(2) Decline of feudalism: As feudalism declined, people were freed from manorial ties, "
            "allowing a new middle class to emerge and patronise learning and art. "
            "(3) New trade routes: Wealth from Mediterranean trade enriched Italian city-states "
            "(Venice, Genoa, Florence), providing money for art patronage. "
            "(4) Spirit of enquiry: Growing questioning of traditional authority encouraged rational enquiry "
            "and scientific thinking. "
            "(5) Invention of the printing press (c. 1440): Made books cheap and widely available, "
            "spreading new ideas rapidly across Europe."
        ),
        "explanation": (
            "Students should identify five causes and briefly explain each. "
            "Key detail: the Ottoman capture of Constantinople (1453) brought Greek scholars to Italy; "
            "the printing press was invented by Gutenberg c. 1440 in Mainz, Germany; "
            "Italian city-states (Florence, Venice, Genoa) became wealthy trading hubs."
        ),
    },
    {
        "id": "c9_062_sa_002",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "renaissance",
        "question": (
            "How did the invention of the printing press by Johannes Gutenberg contribute to the spread "
            "of Renaissance ideas in Europe?"
        ),
        "answer": (
            "Gutenberg's printing press (c. 1440, Mainz, Germany) revolutionised the spread of ideas: "
            "(1) It made books much cheaper - previously, handwritten manuscripts were rare and affordable "
            "only to the wealthy and the Church. "
            "(2) It allowed rapid, large-scale printing of classical texts, humanist writings, and new ideas. "
            "(3) Authors and scholars could reach thousands of readers simultaneously, greatly accelerating "
            "the spread of humanism, science, and Protestant ideas. "
            "(4) It undermined the Church's monopoly on knowledge, as people could now read the Bible "
            "and new ideas independently. "
            "(5) It led to the standardisation of texts and the rise of vernacular languages (printing in "
            "local languages rather than Latin)."
        ),
        "explanation": (
            "Key facts: Gutenberg invented movable metal type c. 1440; Gutenberg Bible printed c. 1455. "
            "The press's impact was social and intellectual, not just technological - it democratised knowledge "
            "and directly fuelled the Renaissance, the Reformation, and the Scientific Revolution."
        ),
    },
]

QBANK["c9_histciv_062"]["long_answer"] = [
    {
        "id": "c9_062_la_001",
        "type": "long_answer",
        "marks": (5, 8),
        "topic": "renaissance",
        "question": (
            "Explain the causes of the Renaissance and describe its major effects on European art, "
            "education, and religion. Use specific examples to support your answer."
        ),
        "answer": (
            "CAUSES OF THE RENAISSANCE: (1) Fall of Constantinople (1453): Mehmed II's Ottoman conquest "
            "ended the Byzantine Empire; Greek scholars fled to Florence with classical manuscripts, reviving "
            "Greek and Roman learning. (2) Decline of feudalism: People freed from manorial ties formed a new "
            "middle class that valued worldly achievement. (3) New trade routes: Venice, Genoa, and Florence "
            "grew wealthy from Mediterranean trade, funding art patronage. (4) Spirit of enquiry: Rational "
            "questioning replaced blind acceptance of authority. (5) Printing press (Gutenberg, c. 1440): "
            "Books became cheap and widely available, spreading ideas rapidly. "
            "EFFECTS: (a) ART - Realistic human figures (da Vinci, Michelangelo, Raphael), perspective in "
            "painting, anatomical accuracy, secular subjects alongside religious art. "
            "(b) EDUCATION - Humanist schools taught classical languages; universities expanded; Petrarch "
            "pioneered humanist scholarship. "
            "(c) RELIGION - Humanist critique of Church corruption paved the way for the Protestant "
            "Reformation (Luther, Calvin); people read the Bible independently."
        ),
        "explanation": (
            "A 5-8 mark answer should include at least four causes with brief explanations, plus "
            "at least three effects with specific examples of artists or thinkers. "
            "Named examples: da Vinci, Michelangelo, Raphael, Botticelli, Petrarch, Erasmus, "
            "Lorenzo de' Medici, Gutenberg, Mehmed II."
        ),
    },
]

# ─── c9_histciv_001  Constitution ─────────────────────────────────

QBANK.setdefault("c9_histciv_001", {})

QBANK["c9_histciv_001"]["mcq"] = [
    {
        "id": "c9_001_mcq_001",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "constitution",
        "question": "A Constitution is best defined as:",
        "options": [
            "A list of laws made by the government",
            "The supreme law of the land that defines the framework of government, citizens' rights, and limits on state power",
            "A document listing only the Fundamental Rights of citizens",
            "An agreement between political parties to share power",
        ],
        "answer": "The supreme law of the land that defines the framework of government, citizens' rights, and limits on state power",
        "option_indices": {
            "The supreme law of the land that defines the framework of government, citizens' rights, and limits on state power": 1,
            "A list of laws made by the government": 0,
            "A document listing only the Fundamental Rights of citizens": 2,
            "An agreement between political parties to share power": 3,
        },
        "explanation": (
            "A Constitution is the supreme law of a country. It defines: (1) the structure and powers "
            "of government organs (legislative, executive, judiciary); (2) the fundamental rights and "
            "duties of citizens; (3) the limits on state power to prevent arbitrary rule. "
            "It is NOT merely a list of rights - it equally limits government and defines the state's framework."
        ),
    },
    {
        "id": "c9_001_mcq_002",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "constitution",
        "question": "The Constitution of India is best described as:",
        "options": [
            "The shortest written constitution in the world (7 Articles)",
            "The longest written constitution of any sovereign country (originally 395 Articles)",
            "An unwritten constitution based on conventions",
            "A document adopted by the British Parliament",
        ],
        "answer": "The longest written constitution of any sovereign country (originally 395 Articles)",
        "option_indices": {
            "The longest written constitution of any sovereign country (originally 395 Articles)": 1,
            "The shortest written constitution in the world (7 Articles)": 0,
            "An unwritten constitution based on conventions": 2,
            "A document adopted by the British Parliament": 3,
        },
        "explanation": (
            "The Constitution of India (adopted 26 November 1949, effective 26 January 1950) is the longest "
            "written constitution of any sovereign country - originally with 395 Articles and 8 Schedules. "
            "By contrast, the American Constitution (1787) has only 7 Articles and is the shortest written "
            "constitution. The British Constitution is unwritten, based on statutes, judicial decisions, and "
            "conventions. Dr. B.R. Ambedkar chaired the Drafting Committee."
        ),
    },
    {
        "id": "c9_001_mcq_003",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "constitution",
        "question": "'Constitutionalism' is the principle that:",
        "options": [
            "Every country must have a written constitution",
            "Government power must be limited by law to protect individual liberty",
            "Only lawyers can interpret the Constitution",
            "The Constitution is the same in every country",
        ],
        "answer": "Government power must be limited by law to protect individual liberty",
        "option_indices": {
            "Government power must be limited by law to protect individual liberty": 1,
            "Every country must have a written constitution": 0,
            "Only lawyers can interpret the Constitution": 2,
            "The Constitution is the same in every country": 3,
        },
        "explanation": (
            "Constitutionalism is the principle that government power must be limited by law to prevent "
            "arbitrary rule and protect individual liberty. It is distinct from merely having a Constitution. "
            "A country can have a Constitution (a written document) without constitutionalism (if the "
            "government ignores the document). India aims for both: a written Constitution AND "
            "constitutionalism - rule of law with limited government."
        ),
    },
]

QBANK["c9_histciv_001"]["fill_blank"] = [
    {
        "id": "c9_001_fb_001",
        "type": "fill_blank",
        "difficulty": "Easy",
        "topic": "constitution",
        "question": (
            "The Constitution of India was adopted by the Constituent Assembly on _______________ "
            "and came into effect on _______________. "
            "(Write both dates in DD Month YYYY format)"
        ),
        "answer": "26 November 1949; 26 January 1950",
        "alternatives": ["26th November 1949; 26th January 1950"],
        "explanation": (
            "The Constitution of India was adopted by the Constituent Assembly on 26 November 1949 "
            "(celebrated as Constitution Day / Samvidhan Diwas). It came into effect on 26 January 1950, "
            "celebrated annually as Republic Day. 26 January was chosen because it was the anniversary "
            "of the Purna Swaraj declaration (1930). Dr. B.R. Ambedkar is called the Father of the "
            "Indian Constitution."
        ),
    },
    {
        "id": "c9_001_fb_002",
        "type": "fill_blank",
        "difficulty": "Medium",
        "topic": "constitution",
        "question": (
            "A written Constitution is needed to prevent _______________ rule and to establish the "
            "___________ (Hint: two words - a phrase meaning government is subject to law)"
        ),
        "answer": "arbitrary; rule of law",
        "alternatives": [],
        "explanation": (
            "A written Constitution is essential to prevent arbitrary rule - government action without "
            "legal authority or limits. It establishes the rule of law: the principle that everyone, "
            "including the government, is subject to the law. Without a Constitution, rulers could act "
            "as they pleased, making the Constitution a safeguard of democracy."
        ),
    },
    {
        "id": "c9_001_fb_003",
        "type": "fill_blank",
        "difficulty": "Easy",
        "topic": "constitution",
        "question": (
            "The _______________ Constitution is unwritten and based on statutes, conventions, "
            "and judicial decisions - unlike the written Constitution of India. "
            "(Hint: the 'mother of parliamentary democracy')"
        ),
        "answer": "British",
        "alternatives": ["UK", "United Kingdom"],
        "explanation": (
            "The British Constitution is unwritten - not a single document but a collection of statutes "
            "(Magna Carta 1215, Bill of Rights 1689, Parliament Acts), conventions, and judicial decisions. "
            "India, USA, and most modern nations have written constitutions. The UK is the main example "
            "of an unwritten constitution. This contrast helps students understand the difference between "
            "written and unwritten constitutional systems."
        ),
    },
]

QBANK["c9_histciv_001"]["short_answer"] = [
    {
        "id": "c9_001_sa_001",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "constitution",
        "question": (
            "Why is a written Constitution necessary for a democratic country? "
            "Give at least four reasons."
        ),
        "answer": (
            "A written Constitution is necessary because: "
            "(1) It defines the structure, powers, and functions of the three organs of government "
            "(legislative, executive, judiciary) and their relationship to each other. "
            "(2) It guarantees fundamental rights to citizens, protecting them from state abuse. "
            "(3) It limits the power of the government to prevent arbitrary rule and misuse of authority. "
            "(4) It establishes the rule of law - the principle that government is subject to law, "
            "not above it. "
            "(5) It provides a standard for judging whether government actions are lawful. "
            "(6) It safeguards democracy by setting the rules for elections, governance, and amendments."
        ),
        "explanation": (
            "Students should provide at least four reasons. Key concepts: rule of law, limits on government "
            "power, fundamental rights, framework of government, prevention of arbitrary rule. "
            "Dr. Ambedkar stated the Constitution is 'not merely a lawyer's document but a vehicle of life.'"
        ),
    },
    {
        "id": "c9_001_sa_002",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "constitution",
        "question": (
            "Distinguish between 'Constitution' and 'constitutionalism'. "
            "Why is it possible for a country to have a Constitution but not constitutionalism?"
        ),
        "answer": (
            "A Constitution is the actual written document that lays down the framework and rules of "
            "government, citizens' rights, and limits on state power. "
            "Constitutionalism is the principle that government power must be limited by law, protecting "
            "individual liberty and preventing arbitrary rule. "
            "A country may have a Constitution (a document) without constitutionalism if: "
            "(1) the government routinely ignores constitutional provisions; "
            "(2) fundamental rights exist on paper but are not enforced; "
            "(3) one branch of government dominates the others; "
            "(4) elections are not free and fair. "
            "Thus, constitutionalism is the practice of limited government under law - not just having "
            "a Constitution."
        ),
        "explanation": (
            "Key distinction: Constitution = the document; constitutionalism = the philosophy and practice "
            "of limiting government by law. Many countries have written constitutions but lack "
            "constitutionalism (authoritarian regimes with constitutions on paper). "
            "India aims for both: a written Constitution AND constitutionalism through independent "
            "judiciary, free elections, and rule of law."
        ),
    },
]

QBANK["c9_histciv_001"]["long_answer"] = [
    {
        "id": "c9_001_la_001",
        "type": "long_answer",
        "marks": (4, 6),
        "topic": "constitution",
        "question": (
            "Explain why the Constitution is called the 'supreme law of the land'. "
            "In your answer, discuss its key functions and why it is essential for democracy. "
            "Also distinguish between a written and unwritten Constitution with examples."
        ),
        "answer": (
            "The Constitution is called the 'supreme law of the land' because: "
            "(1) It is the highest legal authority - all other laws (Parliamentary laws, executive orders) "
            "must conform to it; any law violating the Constitution is void. "
            "(2) It defines the framework, structure, and powers of government organs - the legislature, "
            "executive, and judiciary. "
            "(3) It guarantees Fundamental Rights to citizens and imposes Fundamental Duties. "
            "(4) It limits state power to prevent arbitrary rule and establishes the rule of law. "
            "(5) It defines citizenship, the electoral system, and the amendment procedure. "
            "WRITTEN vs. UNWRITTEN: India and the USA have written constitutions (single, codified document). "
            "Britain has an unwritten constitution based on statutes (Magna Carta, Bill of Rights), "
            "conventions, and judicial decisions. "
            "The Constitution is essential for democracy as it ensures power is not concentrated and "
            "citizens' rights are protected."
        ),
        "explanation": (
            "A 4-6 mark answer should include: definition of 'supreme law'; at least three key functions "
            "(framework of government, rights, limits on power); written vs. unwritten distinction with "
            "examples (India/USA written, Britain unwritten); Dr. Ambedkar's quote."
        ),
    },
]

# ─── Numerical questions ──────────────────────────────────────────

QBANK["c9_histciv_052"]["numerical"] = [
    {
        "id": "c9_052_num_001",
        "type": "numerical",
        "difficulty": "Medium",
        "topic": "chola_sources",
        "marks": 2,
        "question": (
            "The Brihadishwara Temple at Thanjavur was completed around 1010 CE by Rajaraja I. "
            "Using the reference year 2024 CE, calculate how many years old the temple will be in 2024. "
            "Show your calculation."
        ),
        "answer": 1014,
        "unit": "years",
        "explanation": (
            "Age in 2024 = 2024 - 1010 = 1014 years. "
            "The Brihadishwara Temple is approximately 1014 years old as of 2024. "
            "It was built by Rajaraja I (reign c. 985-1014 CE) and took about 7 years to complete. "
            "It stands 66 metres (216 ft) tall and its capstone weighs approximately 80 tonnes."
        ),
    },
    {
        "id": "c9_052_num_002",
        "type": "numerical",
        "difficulty": "Easy",
        "topic": "chola_sources",
        "marks": 2,
        "question": (
            "The Karandai Sangam plates are dated to 1021 CE and the Leyden Copperplates to c. 1008 CE. "
            "How many years apart are these two inscriptions?"
        ),
        "answer": 13,
        "unit": "years",
        "explanation": (
            "Difference = 1021 - 1008 = 13 years. "
            "The Karandai Sangam plates (1021 CE) document Rajendra I's wars with the Chalukyas. "
            "The Leyden Copperplates (c. 1008 CE) record Rajaraja I's land grant. "
            "Both are key sources for Chola history; the 13-year gap places them within the same "
            "dynastic period, helping historians cross-reference Chola administrative practices."
        ),
    },
]

QBANK["c9_histciv_062"]["numerical"] = [
    {
        "id": "c9_062_num_001",
        "type": "numerical",
        "difficulty": "Easy",
        "topic": "renaissance",
        "marks": 2,
        "question": (
            "The Renaissance began in the 14th century CE. The Ottoman capture of Constantinople "
            "(a major cause of the Renaissance) occurred in 1453 CE. "
            "How many years into the Renaissance did the fall of Constantinople occur? "
            "(Take the start of the 14th century as 1300 CE)"
        ),
        "answer": 153,
        "unit": "years",
        "explanation": (
            "Renaissance began in the 14th century CE ≈ 1300 CE. "
            "Fall of Constantinople = 1453 CE. "
            "Years into the Renaissance = 1453 - 1300 = 153 years. "
            "By 1453, the Renaissance was already underway in Italy. The fall of Constantinople "
            "accelerated it by bringing Greek scholars and classical manuscripts to Florence."
        ),
    },
]

QBANK["c9_histciv_001"]["numerical"] = [
    {
        "id": "c9_001_num_001",
        "type": "numerical",
        "difficulty": "Medium",
        "topic": "constitution",
        "marks": 2,
        "question": (
            "The Indian Constitution was adopted on 26 November 1949 and came into effect on "
            "26 January 1950. Calculate the number of days between adoption and enforcement. "
            "(January has 31 days)"
        ),
        "answer": 61,
        "unit": "days",
        "explanation": (
            "From 26 November 1949 to 26 January 1950: "
            "November remaining: 30 - 26 = 4 days "
            "December: 31 days "
            "January: 26 days "
            "Total = 4 + 31 + 26 = 61 days. "
            "This 61-day gap allowed time for printing copies of the Constitution, "
            "administrative preparations, and the first general elections planning."
        ),
    },
    {
        "id": "c9_001_num_002",
        "type": "numerical",
        "difficulty": "Easy",
        "topic": "constitution",
        "marks": 2,
        "question": (
            "The original Indian Constitution had 395 Articles and 8 Schedules. "
            "As of now (reference year 2024), it has 470+ Articles and 12 Schedules. "
            "Calculate how many Articles and Schedules have been added through amendments."
        ),
        "answer": (75, 4),
        "unit": "Articles and Schedules",
        "explanation": (
            "Articles added = 470 - 395 = 75 additional Articles (created by amendments). "
            "Schedules added = 12 - 8 = 4 additional Schedules. "
            "The Constitution has been amended over 100 times. "
            "Key amendments: 42nd (1976, added words 'Socialist', 'Secular', 'Democratic'), "
            "44th (1978, restored Fundamental Rights), 73rd/74th (1992, Panchayati Raj). "
            "The Constitution's flexibility through amendment is a key feature."
        ),
    },
]

# ──────────────────────────────────────────────
#  ANSWER INDEX  (fast lookup)
# ──────────────────────────────────────────────

def _get_answer(node_id: str, q_type: str, q_idx: int):
    questions = QBANK.get(node_id, {}).get(q_type, [])
    if q_idx < len(questions):
        return questions[q_idx]["answer"]
    return None


# ──────────────────────────────────────────────
#  SOLVER
# ──────────────────────────────────────────────

def solve_mcq(node_id: str, q_idx: int, selected_idx: int) -> dict:
    questions = QBANK.get(node_id, {}).get("mcq", [])
    if q_idx >= len(questions):
        return _error("mcq", q_idx, node_id)

    q = questions[q_idx]
    correct_key = q["answer"]
    correct_idx = q["option_indices"].get(correct_key, 0)
    is_correct = (selected_idx == correct_idx)
    option_map = {v: k for k, v in q["option_indices"].items()}
    selected_text = option_map.get(selected_idx, f"Index {selected_idx}")
    correct_text  = option_map.get(correct_idx, correct_key)

    steps = [
        f"Question [{node_id} | mcq #{q_idx+1}]: {q['question']}",
        f"Options presented:",
    ]
    for i, text in enumerate(q["options"]):
        steps.append(f"  [{i}] {text}")
    steps += [
        f"Student selected: [{selected_idx}] {selected_text}",
        f"Correct answer  : [{correct_idx}] {correct_text}",
    ]
    if is_correct:
        steps.append("✓ Answer is CORRECT.")
    else:
        steps.append("✗ Answer is INCORRECT - see explanation below.")

    verification = _verify_mcq_selection(selected_text, correct_text)

    return _ok("mcq", is_correct, correct_idx, correct_text, steps, verification,
               q.get("explanation", ""))


def solve_fill_blank(node_id: str, q_idx: int, student_answer: str) -> dict:
    questions = QBANK.get(node_id, {}).get("fill_blank", [])
    if q_idx >= len(questions):
        return _error("fill_blank", q_idx, node_id)

    q = questions[q_idx]
    correct = q["answer"].lower().strip()
    student = student_answer.lower().strip()
    alternatives = [a.lower() for a in q.get("alternatives", [])]
    all_acceptable = [correct] + alternatives
    is_correct = student in all_acceptable
    match_used = [a for a in all_acceptable if student == a][0] if is_correct else None

    steps = [
        f"Question [{node_id} | fill_blank #{q_idx+1}]: {q['question']}",
        f"Student answer : '{student_answer}'",
        f"Correct answer : '{q['answer']}'",
        f"Alternatives   : {q.get('alternatives', [])}",
    ]
    if is_correct:
        steps.append(f"✓ Answer is CORRECT (matched: '{match_used}').")
    else:
        steps.append("✗ Answer is INCORRECT - see explanation below.")

    verification = _verify_fill(student_answer, q["answer"], alternatives)

    return _ok("fill_blank", is_correct, q["answer"], q["answer"],
               steps, verification, q.get("explanation", ""))


def solve_short_answer(node_id: str, q_idx: int, student_answer: str) -> dict:
    questions = QBANK.get(node_id, {}).get("short_answer", [])
    if q_idx >= len(questions):
        return _error("short_answer", q_idx, node_id)

    q = questions[q_idx]
    correct = q["answer"]
    # Keyword-based approximate matching
    keywords = _extract_keywords(correct)
    student_lower = student_answer.lower()
    matches = sum(1 for kw in keywords if kw in student_lower)
    ratio = matches / len(keywords) if keywords else 0.0
    # Threshold: >=50% keyword coverage → partial; >=75% → correct
    if ratio >= 0.75:
        is_correct, grade = True, "Full / Excellent"
    elif ratio >= 0.50:
        is_correct, grade = False, "Partial credit (≈50-75%)"
    else:
        is_correct, grade = False, "Insufficient"

    steps = [
        f"Question [{node_id} | short_answer #{q_idx+1}]: {q['question']}",
        f"Reference answer keywords: {keywords}",
        f"Keyword match ratio     : {ratio:.0%} ({matches}/{len(keywords)} keywords found)",
        f"Assessment              : {grade}",
    ]
    if not is_correct:
        steps.append("✗ Answer needs improvement - see reference answer below.")

    verification = {
        "method": "keyword_coverage",
        "keywords_matched": matches,
        "total_keywords": len(keywords),
        "coverage_ratio": ratio,
    }

    return _ok("short_answer", is_correct, correct, correct,
               steps, verification, q.get("explanation", ""),
               metadata={"grade": grade, "match_ratio": ratio})


def solve_long_answer(node_id: str, q_idx: int, student_answer: str) -> dict:
    questions = QBANK.get(node_id, {}).get("long_answer", [])
    if q_idx >= len(questions):
        return _error("long_answer", q_idx, node_id)

    q = questions[q_idx]
    correct = q["answer"]
    marks_range = q.get("marks", (3, 5))
    keywords = _extract_keywords(correct)
    student_lower = student_answer.lower()
    matches = sum(1 for kw in keywords if kw in student_lower)
    ratio = matches / len(keywords) if keywords else 0.0
    if ratio >= 0.80:
        is_correct, grade, marks = True, "Excellent", marks_range[1]
    elif ratio >= 0.60:
        is_correct, grade, marks = True, "Good", (marks_range[0] + marks_range[1]) // 2
    elif ratio >= 0.40:
        is_correct, grade, marks = False, "Satisfactory / Partial", marks_range[0] // 2
    else:
        is_correct, grade, marks = False, "Needs Improvement", 0

    steps = [
        f"Question [{node_id} | long_answer #{q_idx+1}]: {q['question']}",
        f"Reference keywords : {keywords}",
        f"Keyword coverage   : {ratio:.0%} ({matches}/{len(keywords)})",
        f"Marks range        : {marks_range[0]}-{marks_range[1]}",
        f"Estimated marks    : {marks}/{marks_range[1]}",
        f"Grade              : {grade}",
    ]
    if ratio < 0.60:
        steps.append("See reference answer for key points to include.")

    verification = {
        "method": "keyword_coverage",
        "keywords_matched": matches,
        "total_keywords": len(keywords),
        "coverage_ratio": ratio,
        "marks_estimated": marks,
        "marks_range": marks_range,
    }

    return _ok("long_answer", is_correct, correct, correct,
               steps, verification, q.get("explanation", ""),
               metadata={"grade": grade, "marks": marks,
                         "marks_range": marks_range})


def solve_numerical(node_id: str, q_idx: int, student_answer: float) -> dict:
    questions = QBANK.get(node_id, {}).get("numerical", [])
    if q_idx >= len(questions):
        return _error("numerical", q_idx, node_id)

    q = questions[q_idx]
    correct = q["answer"]
    unit = q.get("unit", "")

    if isinstance(correct, tuple):
        tolerance = 0.5
        is_correct = (abs(student_answer - correct[0]) <= tolerance and
                      abs(student_answer - correct[1]) <= tolerance)
        comparison = f"({correct[0]}, {correct[1]})"
    else:
        tolerance = abs(correct * 0.02) if correct != 0 else 0.5
        is_correct = abs(student_answer - correct) <= max(tolerance, 0.5)
        comparison = str(correct)

    steps = [
        f"Question [{node_id} | numerical #{q_idx+1}]: {q['question']}",
        f"Student answer : {student_answer} {unit}".strip(),
        f"Correct answer : {comparison} {unit}".strip(),
        f"Tolerance      : ±{max(tolerance, 0.5):.1f} {unit}".strip(),
    ]
    if is_correct:
        steps.append("✓ Answer is CORRECT (within tolerance).")
    else:
        steps.append("✗ Answer is INCORRECT - see worked solution below.")

    verification = _verify_numerical(student_answer, correct, unit, tolerance)

    return _ok("numerical", is_correct, correct, correct,
               steps, verification, q.get("explanation", ""))


def solve(node_id: str, q_type: str, q_idx: int, student_response) -> dict:
    q_type = q_type.lower()
    if q_type == "mcq":
        return solve_mcq(node_id, q_idx, int(student_response))
    if q_type == "fill_blank":
        return solve_fill_blank(node_id, q_idx, str(student_response))
    if q_type == "short_answer":
        return solve_short_answer(node_id, q_idx, str(student_response))
    if q_type == "long_answer":
        return solve_long_answer(node_id, q_idx, str(student_response))
    if q_type == "numerical":
        return solve_numerical(node_id, q_idx, float(student_response))
    return {"status": "error", "message": f"Unknown question type: {q_type}"}


# ──────────────────────────────────────────────
#  QUESTION GENERATOR
# ──────────────────────────────────────────────

# Weights per node
NODE_WEIGHTS = {
    "c9_histciv_052": 2,   # Chola sources - two questions
    "c9_histciv_062": 2,   # Renaissance - two questions
    "c9_histciv_001": 2,   # Constitution - two questions
}

QTYPE_WEIGHTS = {
    "mcq":         35,
    "fill_blank":  20,
    "short_answer": 20,
    "long_answer":  15,
    "numerical":   10,
}

MIN_PER_TYPE = 2   # ensure at least 2 of each type when count allows


def generate_questions(seed: int = 42, count: int = 12) -> list:
    rng = random.Random(seed)
    node_ids = list(NODE_WEIGHTS.keys())
    node_w   = [NODE_WEIGHTS[n] for n in node_ids]

    all_questions: list[dict] = []

    for nid in node_ids:
        for qtype, qlist in QBANK[nid].items():
            for idx, q in enumerate(qlist):
                all_questions.append({
                    "node_id": nid,
                    "qtype":   qtype,
                    "q_idx":   idx,
                    "data":    q,
                })

    rng.shuffle(all_questions)

    # Distribute count across nodes proportionally
    node_targets: dict[str, int] = {}
    total_weight = sum(NODE_WEIGHTS.values())
    remaining = count
    for i, nid in enumerate(node_ids):
        if i == len(node_ids) - 1:
            node_targets[nid] = remaining
        else:
            t = max(1, round(count * NODE_WEIGHTS[nid] / total_weight))
            node_targets[nid] = min(t, remaining)
            remaining -= node_targets[nid]

    selected: list[dict] = []
    node_used: dict[str, dict[str, int] ] = {n: {} for n in node_ids}

    # Phase 1: guarantee min_per_type per node (if enough questions exist)
# TRUNCATED:     for nid in