"""
CLASS 8 BIOLOGY — TRANSPORT IN PLANTS
Question Generator for Nodes: c8_bio_001 | c8_bio_002 | c8_bio_003

Each question carries a deterministic ID used by the solver.
Quiz size defaults to 12 questions (2 of each of 6 types).
"""

import random
from typing import Dict, List, Optional, Any

# ─────────────────────────────────────────────────────────
# QUESTION BANKS  (12 per node — 2 variants per q-type)
# ─────────────────────────────────────────────────────────

QUESTION_BANKS: Dict[str, Dict[str, List[Dict]]] = {
    # ── NODE 001 ──────────────────────────────────────────
    "c8_bio_001": {
        "mcq": [
            {
                "id": "mcq_001_1",
                "question": (
                    "The smell of perfume spreads throughout a room even "
                    "though no one is spraying it again. This happens because of:"
                ),
                "options": ["Osmosis",
                             "Active transport",
                             "Photosynthesis",
                             "Diffusion"],
                "answer": "C",   # index 2 → "Diffusion"
                "tag": "diffusion-examples",
            },
            {
                "id": "mcq_001_2",
                "active": True,
                "question": (
                    "A cell needs to absorb potassium ions when their "
                    "concentration outside is LOWER than inside the cell. "
                    "Which process does this?"
                ),
                "options": ["Diffusion",
                             "Osmosis",
                             "Facilitated diffusion",
                             "Active transport"],
                "answer": "D",
                "tag": "active-transport",
            },
            {
                "id": "mcq_001_3",
                "question": (
                    "What is the key feature of the membrane involved in "
                    "osmosis?"
                ),
                "options": ["Completely impermeable",
                             "Fully permeable",
                             "Semipermeable — allows water but not solute",
                             "Has only carrier proteins"],
                "answer": "C",
                "tag": "semipermeable-membrane",
            },
            {
                "id": "mcq_001_4",
                "question": (
                    "A piece of fruit is dipped in a concentrated sugar "
                    "solution. Water moves from the fruit into the sugar "
                    "solution. This is an example of:"
                ),
                "options": ["Diffusion",
                             "Osmosis",
                             "Active transport",
                             "Photosynthesis"],
                "answer": "B",
                "tag": "osmosis-examples",
            },
            {
                "id": "mcq_001_5",
                "question": (
                    "Dry raisins are placed in plain water for 2 hours. "
                    "They become plump and swollen. This is because:"
                ),
                "options": ["Raisins absorb water by osmosis",
                             "Raisins release water by diffusion",
                             "The water evaporates",
                             "The sugar in raisins dissolves"],
                "answer": "A",
                "tag": "osmosis-raisins",
            },
            {
                "id": "mcq_001_6",
                "question": (
                    "A vegetable slice is kept in very salty water for 1 hour. "
                    "The slice becomes soft and limp. This happens because:"
                ),
                "options": ["Salt enters the vegetable cells by diffusion",
                             "The vegetable absorbs the salt",
                             "The vegetable cells shrink by losing water (osmosis)",
                             "The cell walls dissolve in salt"],
                "answer": "C",
                "tag": "plasmolysis-hypertonic",
            },
            {
                "id": "mcq_001_7",
                "question": (
                    "Which of the following is the BEST definition of "
                    "active transport?"
                ),
                "options": [
                    "Movement of molecules from high to low concentration",
                    "Movement of water across a membrane",
                    "Movement along a concentration gradient without energy",
                    "Movement of molecules against a concentration gradient "
                    "that requires energy",
                ],
                "answer": "D",
                "tag": "active-transport-definition",
            },
        ],
        "fib": [
            {
                "id": "fib_001_1",
                "question": (
                    "The spontaneous movement of molecules from a region of "
                    "higher concentration to lower concentration is called "
                    "_________."
                ),
                "answer": "diffusion",
                "alternatives": ["osmosis", "diffusion", "active transport"],
                "tag": "diffusion-definition",
            },
            {
                "id": "fib_001_2",
                "question": (
                    "In osmosis, water moves across a ___________ membrane "
                    "that allows water but blocks solute particles."
                ),
                "answer": "semipermeable membrane",
                "alternatives": ["semipermeable membrane",
                                 "fully permeable membrane",
                                 "cell wall"],
                "tag": "semipermeable-membrane",
            },
            {
                "id": "fib_001_3",
                "question": (
                    "When molecules move AGAINST their concentration gradient "
                    "and need energy, the process is called _________."
                ),
                "answer": "active transport",
                "alternatives": ["active transport", "facilitated diffusion",
                                 "osmosis"],
                "tag": "active-transport",
            },
            {
                "id": "fib_001_4",
                "question": (
                    "In diffusion, molecules always move along the "
                    "__________ gradient (from high to low concentration)."
                ),
                "answer": "concentration",
                "alternatives": ["concentration", "pressure", "temperature"],
                "tag": "concentration-gradient",
            },
            {
                "id": "fib_001_5",
                "question": (
                    "Keeping perishable food like raw vegetables in cold "
                    "water slows down _________, reducing spoilage."
                ),
                "answer": "diffusion",
                "alternatives": ["diffusion", "osmosis", "active transport"],
                "tag": "diffusion-applications",
            },
        ],
        "tf": [
            {
                "id": "tf_001_1",
                "statement": (
                    "Diffusion of perfume molecules in air does NOT require "
                    "any membrane."
                ),
                "answer": True,
                "tag": "diffusion-no-membrane",
            },
            {
                "id": "tf_001_2",
                "statement": (
                    "Osmosis can be considered a special type of diffusion "
                    "involving only water molecules."
                ),
                "answer": True,
                "tag": "osmosis-type-of-diffusion",
            },
            {
                "id": "tf_001_3",
                "statement": (
                    "Active transport requires energy from the cell because "
                    "it moves molecules against their concentration gradient."
                ),
                "answer": True,
                "tag": "active-transport-energy",
            },
            {
                "id": "tf_001_4",
                "statement": (
                    "In osmosis, water moves from a region of higher "
                    "solute concentration to lower solute concentration."
                ),
                "answer": False,
                "tag": "osmosis-direction",
            },
            {
                "id": "tf_001_5",
                "statement": (
                    "When dry raisins are soaked in water, they swell "
                    "because of osmosis."
                ),
                "answer": True,
                "tag": "raisins-osmosis",
            },
        ],
        "sa": [
            {
                "id": "sa_001_1",
                "question": (
                    "Define diffusion in your own words (max 3 sentences). "
                    "Give one everyday example."
                ),
                "tag": "diffusion-define",
            },
            {
                "id": "sa_001_2",
                "question": (
                    "Define osmosis in your own words (max 3 sentences). "
                    "Why is the semipermeable membrane essential?"
                ),
                "tag": "osmosis-define",
            },
        ],
        "la": [
            {
                "id": "la_001_1",
                "question": (
                    "A student says: 'A semipermeable membrane is just a "
                    "thin wall between two liquids.' Is this correct? "
                    "Explain in detail why the semipermeable membrane is "
                    "essential for osmosis and what makes it 'selective' "
                    "(approx. 100 words)."
                ),
                "tag": "semipermeable-membrane-role",
            },
            {
                "id": "la_001_2",
                "question": (
                    "Compare active transport and osmosis across at least "
                    "THREE aspects: (1) Energy requirement, (2) Direction of "
                    "movement relative to the concentration gradient, "
                    "(3) Need for a membrane. "
                    "Give one biological example of each (approx. 100 words)."
                ),
                "tag": "active-vs-osmosis",
            },
        ],
    },

    # ── NODE 002 ──────────────────────────────────────────
    "c8_bio_002": {
        "mcq": [
            {
                "id": "mcq_002_1",
                "question": (
                    "Xylem vessels are described as 'hollow tubes made of "
                    "dead cells' because:"
                ),
                "options": [
                    "They store food",
                    "They carry food",
                    "They have no cytoplasm to block water flow",
                    "They divide rapidly",
                ],
                "answer": "C",
                "tag": "xylem-dead-cells",
            },
            {
                "id": "mcq_002_2",
                "question": (
                    "Which of the following correctly describes what xylem "
                    "transports and the direction of flow?"
                ),
                "options": [
                    "Water and minerals — roots to leaves (upward)",
                    "Sucrose — leaves to roots (downward)",
                    "Oxygen — leaves to roots",
                    "Hormones — roots to flowers",
                ],
                "answer": "A",
                "tag": "xylem-function",
            },
            {
                "id": "mcq_002_3",
                "question": (
                    "The conducting cells of phloem are called:"
                ),
                "options": [
                    "Sieve tubes",
                    "Tracheids",
                    "Vessels",
                    "Xylem fibres",
                ],
                "answer": "A",
                "tag": "phloem-sieve-tubes",
            },
            {
                "id": "mcq_002_4",
                "question": (
                    "The flow of substances in phloem is described as "
                    "'bidirectional' because:"
                ),
                "options": [
                    "It only moves downward",
                    "It moves only upward",
                    "It can move from leaves to roots AND leaves to growing buds",
                    "It alternates direction every hour",
                ],
                "answer": "C",
                "tag": "phloem-bidirectional",
            },
            {
                "id": "mcq_002_5",
                "question": (
                    "The two types of cells found in xylem are:"
                ),
                "options": [
                    "Sieve tubes and companion cells",
                    "Tracheids and vessels",
                    "Guard cells and epidermal cells",
                    "Parenchyma and sclerenchyma"],
                "answer": "B",
                "tag": "xylem-cell-types",
            },
            {
                "id": "mcq_002_6",
                "question": (
                    "Phloem transports primarily:"
                ),
                "options": [
                    "Water from roots to leaves",
                    "Dissolved minerals from soil",
                    "Sucrose/prepared food from leaves to all parts",
                    "Carbon dioxide from air to leaves",
                ],
                "answer": "C",
                "tag": "phloem-what-it-transports",
            },
            {
                "id": "mcq_002_7",
                "question": (
                    "Lignin is important in xylem because it:"
                ),
                "options": [
                    "Helps in photosynthesis",
                    "Provides rigidity and prevents collapse under tension",
                    "Stores food for the plant",
                    "Helps sieve plates work",
                ],
                "answer": "B",
                "tag": "lignin-xylem",
            },
        ],
        "fib": [
            {
                "id": "fib_002_1",
                "question": (
                    "The tissue that transports water and minerals from "
                    "roots to leaves is called _________."
                ),
                "answer": "xylem",
                "alternatives": ["xylem", "phloem", "cambium"],
                "tag": "xylem-name",
            },
            {
                "id": "fib_002_2",
                "question": (
                    "The conducting cells of phloem, named for their "
                    "perforated end walls, are called _________ tubes."
                ),
                "answer": "sieve",
                "alternatives": ["sieve", "vessel", "tracheid"],
                "tag": "sieve-tubes",
            },
            {
                "id": "fib_002_3",
                "question": (
                    "Each sieve tube in phloem is closely associated with "
                    "a _________ cell that helps load and unload food."
                ),
                "answer": "companion",
                "alternatives": ["companion", "guard", "parenchyma"],
                "tag": "companion-cells",
            },
            {
                "id": "fib_002_4",
                "question": (
                    "Phloem mainly transports the prepared food _________ "
                    "from leaves to other parts."
                ),
                "answer": "sucrose",
                "alternatives": ["sucrose", "starch", "cellulose"],
                "tag": "sucrose-transport",
            },
            {
                "id": "fib_002_5",
                "question": (
                    "Xylem cell walls are thickened with a hard, woody "
                    "substance called _________."
                ),
                "answer": "lignin",
                "alternatives": ["lignin", "cellulose", "pectin"],
                "tag": "lignin",
            },
            {
                "id": "fib_002_6",
                "question": (
                    "Xylem always transports water and minerals in the "
                    "_________ direction (roots to leaves)."
                ),
                "answer": "upward",
                "alternatives": ["upward", "downward", "sideways"],
                "tag": "xylem-direction",
            },
            {
                "id": "fib_002_7",
                "question": (
                    "Phloem transports food in the _________ direction "
                    "(can go up or down as needed)."
                ),
                "answer": "bidirectional",
                "alternatives": ["bidirectional", "unidirectional",
                                 "upward"],
                "tag": "phloem-direction",
            },
        ],
        "tf": [
            {
                "id": "tf_002_1",
                "statement": (
                    "Xylem cells (tracheids and vessels) are dead at "
                    "maturity, which allows them to function as open pipes."
                ),
                "answer": True,
                "tag": "xylem-dead",
            },
            {
                "id": "tf_002_2",
                "statement": (
                    "Phloem can transport prepared food both upward to "
                    "growing shoots and downward to roots."
                ),
                "answer": True,
                "tag": "phloem-bidirectional-tf",
            },
            {
                "id": "tf_002_3",
                "statement": (
                    "Sieve plates — the perforated end walls of sieve tubes "
                    "— are found in phloem."
                ),
                "answer": True,
                "tag": "sieve-plates-phloem",
            },
            {
                "id": "tf_002_4",
                "statement": (
                    "Xylem transports water and minerals bidirectionally "
                    "depending on the plant's need."
                ),
                "answer": False,
                "tag": "xylem-unidirectional",
            },
            {
                "id": "tf_002_5",
                "statement": (
                    "Xylem has thick lignified walls while phloem has "
                    "softer cellulose walls."
                ),
                "answer": True,
                "tag": "wall-comparison",
            },
            {
                "id": "tf_002_6",
                "statement": (
                    "Xylem transports water and minerals; phloem "
                    "transports prepared food (sucrose)."
                ),
                "answer": True,
                "tag": "xylem-phloem-substances",
            },
        ],
        "sa": [
            {
                "id": "sa_002_1",
                "question": (
                    "Describe the structure of xylem (max 3 sentences). "
                    "Why does being dead at maturity help its function?"
                ),
                "tag": "xylem-structure",
            },
            {
                "id": "sa_002_2",
                "question": (
                    "Describe the structure of phloem, naming sieve tubes "
                    "and companion cells (max 3 sentences)."
                ),
                "tag": "phloem-structure",
            },
        ],
        "la": [
            {
                "id": "la_002_1",
                "question": (
                    "Compare the substances transported and the DIRECTION of "
                    "flow in xylem and phloem. "
                    "Why is phloem flow called 'bidirectional'? "
                    "(approx. 100 words)"
                ),
                "tag": "compare-substances-direction",
            },
            {
                "id": "la_002_2",
                "question": (
                    "Compare the STRUCTURE of xylem and phloem: "
                    "Are their cells living or dead? What are the walls made "
                    "of? What are the special cells in each tissue? "
                    "(approx. 100 words)"
                ),
                "tag": "compare-structure",
            },
        ],
    },

    # ── NODE 003 ──────────────────────────────────────────
    "c8_bio_003": {
        "mcq": [
            {
                "id": "mcq_003_1",
                "question": (
                    "Transpiration is best defined as:"
                ),
                "options": [
                    "Absorption of water by roots",
                    "Loss of water as liquid droplets",
                    "Loss of water as water vapour mainly through stomata",
                    "Movement of water in xylem",
                ],
                "answer": "C",
                "tag": "transpiration-definition",
            },
            {
                "id": "mcq_003_2",
                "question": (
                    "About 90% of water lost during transpiration escapes "
                    "through which structures on the leaf surface?"
                ),
                "options": [
                    "Lenticels",
                    "Cuticle",
                    "Stomata",
                    "Hydathodes",
                ],
                "answer": "C",
                "tag": "stomata-transpiration",
            },
            {
                "id": "mcq_003_3",
                "question": (
                    "Stomata open when guard cells become:"
                ),
                "options": [
                    "Turgid (swollen with water)",
                    "Flaccid (limp, no water)",
                    "Brown and dead",
                    "Full of chlorophyll",
                ],
                "answer": "A",
                "tag": "guard-cells-turgid",
            },
            {
                "id": "mcq_003_4",
                "question": (
                    "One important benefit of transpiration to the plant is:"
                ),
                "options": [
                    "It produces glucose",
                    "It cools the leaf",
                    "It makes the soil wetter",
                    "It attracts pollinators",
                ],
                "answer": "B",
                "tag": "transpiration-cooling",
            },
            {
                "id": "mcq_003_5",
                "question": (
                    "On a humid summer morning, a student notices tiny "
                    "water droplets along the edges of grass leaves. "
                    "This phenomenon is called:"
                ),
                "options": [
                    "Transpiration",
                    "Photosynthesis",
                    "Respiration",
                    "Guttation",
                ],
                "answer": "D",
                "tag": "guttation-identification",
            },
            {
                "id": "mcq_003_6",
                "question": (
                    "The upward movement of water from roots to the top of "
                    "a tall tree is mainly driven by:"
                ),
                "options": [
                    "Root pressure alone",
                    "Active transport in xylem",
                    "Transpiration pull created by leaf evaporation",
                    "Gravity",
                ],
                "answer": "C",
                "tag": "transpiration-pull",
            },
            {
                "id": "mcq_003_7",
                "question": (
                    "Which structure opens and closes to control the rate of "
                    "transpiration on the underside of a leaf?"
                ),
                "options": [
                    "Stoma (stomata)",
                    "Lenticel",
                    "Cuticle",
                    "Epidermis",
                ],
                "answer": "A",
                "tag": "stoma-structure",
            },
        ],
        "fib": [
            {
                "id": "fib_003_1",
                "question": (
                    "Tiny pores on the leaf surface through which "
                    "transpiration mainly occurs are called _________."
                ),
                "answer": "stomata",
                "alternatives": ["stomata", "lenticels", "hydathodes"],
                "tag": "stomata-name",
            },
            {
                "id": "fib_003_2",
                "question": (
                    "When guard cells absorb water and swell up, they "
                    "become _________ and the stomata opens."
                ),
                "answer": "turgid",
                "alternatives": ["turgid", "flaccid", "plasmolysed"],
                "tag": "turgid-guard-cells",
            },
            {
                "id": "fib_003_3",
                "question": (
                    "The _________ cells flanking each stoma control its "
                    "opening and closing."
                ),
                "answer": "guard",
                "alternatives": ["guard", "companion", "epidermal"],
                "tag": "guard-cells-name",
            },
            {
                "id": "fib_003_4",
                "question": (
                    "The process by which plants lose excess water as "
                    "vapour through stomata is called _________."
                ),
                "answer": "transpiration",
                "alternatives": ["transpiration", "guttation", "photosynthesis"],
                "tag": "transpiration-name",
            },
            {
                "id": "fib_003_5",
                "question": (
                    "Loss of liquid water droplets from leaf edges through "
                    "hydathodes is called _________."
                ),
                "answer": "guttation",
                "alternatives": ["guttation", "transpiration", "secretion"],
                "tag": "guttation-name",
            },
            {
                "id": "fib_003_6",
                "question": (
                    "The waxy, waterproof layer on the leaf surface that "
                    "reduces water loss is called the _________."
                ),
                "answer": "cuticle",
                "alternatives": ["cuticle", "epidermis", "mesophyll"],
                "tag": "cuticle",
            },
            {
                "id": "fib_003_7",
                "question": (
                    "Transpiration also provides _________ to the leaf, "
                    "preventing overheating in hot sunlight."
                ),
                "answer": "cooling",
                "alternatives": ["cooling", "nutrition", "support"],
                "tag": "transpiration-cooling",
            },
        ],
        "tf": [
            {
                "id": "tf_003_1",
                "statement": (
                    "About 90% of the water absorbed by roots is lost "
                    "through transpiration via stomata."
                ),
                "answer": True,
                "tag": "transpiration-percentage",
            },
            {
                "id": "tf_003_2",
                "statement": (
                    "Stomata are more numerous on the underside "
                    "(lower surface) of a typical leaf."
                ),
                "answer": True,
                "tag": "stomata-distribution",
            },
            {
                "id": "tf_003_3",
                "statement": (
                    "Guard cells control whether the stoma is open or closed."
                ),
                "answer": True,
                "tag": "guard-cells-control",
            },
            {
                "id": "tf_003_4",
                "statement": (
                    "Stomata open when guard cells become flaccid and lose "
                    "their turgor pressure."
                ),
                "answer": False,
                "tag": "guard-cells-flaccid-opens",
            },
            {
                "id": "tf_003_5",
                "statement": (
                    "Transpiration pull is the force that helps pull water "
                    "upward through xylem from roots to leaves."
                ),
                "answer": True,
                "tag": "transpiration-pull-tf",
            },
            {
                "id": "tf_003_6",
                "statement": (
                    "Transpiration helps cool the leaf by absorbing heat "
                    "as water evaporates."
                ),
                "answer": True,
                "tag": "transpiration-cooling-tf",
            },
            {
                "id": "tf_003_7",
                "statement": (
                    "Guttation occurs through stomata on the leaf surface "
                    "during the day."
                ),
                "answer": False,
                "tag": "guttation-via-stomata",
            },
        ],
        "sa": [
            {
                "id": "sa_003_1",
                "question": (
                    "Define transpiration in your own words (max 3 sentences). "
                    "Mention which structure it mainly occurs through."
                ),
                "tag": "transpiration-define",
            },
            {
                "id": "sa_003_2",
                "question": (
                    "Explain how guard cells open and close stomata. "
                    "Which state (turgid or flaccid) opens the stoma? "
                    "(max 3 sentences)"
                ),
                "tag": "guard-cells-mechanism",
            },
        ],
        "la": [
            {
                "id": "la_003_1",
                "question": (
                    "Differentiate between transpiration and guttation "
                    "across these four aspects: (1) State of water lost "
                    "(vapour or liquid), (2) Structure/opening involved, "
                    "(3) Time of occurrence, (4) Driving force. "
                    "(approx. 100 words)"
                ),
                "tag": "transpiration-vs-guttation",
            },
            {
                "id": "la_003_2",
                "question": (
                    "Explain TWO important significances of transpiration "
                    "for the plant: (1) cooling effect and (2) the "
                    "transpiration pull and how it helps transport minerals. "
                    "(approx. 100 words)"
                ),
                "tag": "transpiration-significance",
            },
        ],
    },
}


# ─────────────────────────────────────────────────────────
# ANSWER KEY  (used by both questions.py and solver.py)
# ─────────────────────────────────────────────────────────

def get_answer_key(node_id: str) -> Dict[str, str]:
    """Return { question_id: answer } for all questions in a node."""
    bank = QUESTION_BANKS.get(node_id, {})
    key: Dict[str, str] = {}
    for qtype, questions in bank.items():
        for q in questions:
            qid = q.get("id", "")
            ans = q.get("answer", "")
            if qid and ans:
                key[qid] = ans
    return key


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate deterministic questions from all QUESTION_BANKS using seeded random."""
    rng = random.Random(seed)
    all_q: List[Dict[str, Any]] = []
    for node_id, bank in QUESTION_BANKS.items():
        for qtype, questions in bank.items():
            for q in questions:
                q_copy = dict(q)
                q_copy.setdefault("id", f"{node_id}_{qtype}_{rng.randint(1000,9999)}")
                q_copy.setdefault("question_type", qtype)
                q_copy.setdefault("topic", node_id)
                q_copy.setdefault("difficulty", q.get("difficulty", 0.5))
                q_copy.setdefault("verification", True)
                if "question_text" not in q_copy and "text" in q_copy:
                    q_copy["question_text"] = q_copy["text"]
                all_q.append(q_copy)
    rng.shuffle(all_q)
    return all_q[:count]


QUESTION_REGISTRY = {"class8_bio": generate_questions}


if __name__ == "__main__":
    qs = generate_questions(42, 10)
    print(f"Generated {len(qs)} questions")
    for q in qs[:3]:
        print(f"  {q.get('id','?')}: {q.get('question_text', q.get('text',''))[:60]}")