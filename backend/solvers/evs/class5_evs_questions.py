"""
CISCE Class 5 EVS Question Generator
Deterministic, seeded, covers all syllabus nodes.
Solver and question generation functions.
"""

import random
import string
import re
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any

# ─────────────────────────────────────────────────────────────────────────────
# Dataclasses
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class Question:
    id: str
    type: str           # mcq | fill_blank | short_answer | long_answer | numerical
    question: str
    options: List[str]  # 4 strings for MCQ, [] for others
    answer: str
    explanation: str
    difficulty: str     # Easy | Medium
    topic: str          # c5_evs_001 … c5_evs_004


@dataclass
class SolveResult:
    answer: str
    steps: List[str]
    verification: str
    is_correct: bool


# ─────────────────────────────────────────────────────────────────────────────
# Question bank  (18 items — all four syllabus nodes)
# ─────────────────────────────────────────────────────────────────────────────

QUESTION_BANK: List[Dict[str, Any]] = [
    # ── c5_evs_001 : Meaning of environment ──────────────────────────────────
    {
        "id": "c5_evs_001_q1",
        "type": "mcq",
        "question": (
            "Rahul looked around his home. He saw a cat, a table, a mango tree "
            "and the sunlight coming through the window. Which of these is a "
            "NON-LIVING part of the environment?"
        ),
        "options": ["Cat", "Table", "Mango tree", "Sunlight"],
        "answer": "D",
        "explanation": (
            "Step 1: Living things can grow, move and reproduce.\n"
            "Step 2: A cat grows, moves and reproduces — it is LIVING.\n"
            "Step 3: A mango tree grows and reproduces — it is LIVING.\n"
            "Step 4: The table and sunlight do NOT grow, move or reproduce.\n"
            "Step 5: Sunlight is a non-living (natural) part of the environment.\n"
            "Step 6: Therefore the correct answer is D – Sunlight."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_001",
    },
    {
        "id": "c5_evs_001_q2",
        "type": "mcq",
        "question": (
            "Priya observed that her rose plant grows taller each month and "
            "eventually produces new roses. Which TWO characteristics of "
            "living things is she seeing?"
        ),
        "options": [
            "Growth and respiration",
            "Growth and reproduction",
            "Movement and growth",
            "Respiration and movement",
        ],
        "answer": "B",
        "explanation": (
            "Step 1: Living things show characteristics like growth, movement, "
            "reproduction and respiration.\n"
            "Step 2: 'Growing taller each month' = GROWTH.\n"
            "Step 3: 'Produces new roses' = REPRODUCTION (new plants from the "
            "mother plant).\n"
            "Step 4: Therefore the two characteristics seen are Growth and "
            "Reproduction → Option B."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_001",
    },
    {
        "id": "c5_evs_001_q3",
        "type": "fill_blank",
        "question": (
            "Everything around us — living things like plants and animals and "
            "non-living things like air, water, soil and sunlight — is called "
            "the ________."
        ),
        "options": [],
        "answer": "environment",
        "explanation": (
            "Step 1: The term for everything surrounding us — both living and "
            "non-living — is 'environment'.\n"
            "Step 2: The environment includes air we breathe, water we drink, "
            "soil for plants, sunlight, animals and other humans.\n"
            "Step 3: The blank should be filled with: ENVIRONMENT."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_001",
    },
    {
        "id": "c5_evs_001_q4",
        "type": "fill_blank",
        "question": (
            "Living things have certain characteristics like growth, "
            "________ and reproduction which non-living things do NOT have."
        ),
        "options": [],
        "answer": "movement",
        "explanation": (
            "Step 1: Living things show specific characteristics that "
            "non-living things lack.\n"
            "Step 2: These include growth (getting bigger), movement "
            "(changing place), and reproduction (producing offspring).\n"
            "Step 3: The missing characteristic in the list is MOVEMENT."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_001",
    },
    {
        "id": "c5_evs_001_q5",
        "type": "short_answer",
        "question": (
            "A farmer grows wheat in his field. Name ONE living thing and ONE "
            "non-living thing the wheat plant depends on to survive, and "
            "explain how."
        ),
        "options": [],
        "answer": (
            "Living: Earthworms in soil aerate it and help plant roots. "
            "Non-living: Sunlight provides energy for the plant to make food "
            "(photosynthesis)."
        ),
        "explanation": (
            "Step 1: Wheat needs SUNLIGHT (non-living) — it uses sunlight "
            "energy to make food through photosynthesis.\n"
            "Step 2: Wheat needs WATER (non-living) absorbed from soil for "
            "growth and food-making.\n"
            "Step 3: Wheat may benefit from EARTHWORMS (living) which "
            "aerate soil and add nutrients.\n"
            "Step 4: Any valid living and non-living dependency with a "
            "correct explanation earns full marks."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_001",
    },
    {
        "id": "c5_evs_001_q6",
        "type": "long_answer",
        "question": (
            "During a hot summer, Meena drank water from her clay pot, ate a "
            "mango from a tree, and slept under a tree's shade. "
            "Explain how Meena interacted with BOTH living and non-living "
            "parts of her environment. Give at least two examples each."
        ),
        "options": [],
        "answer": (
            "Living interactions: (1) Ate a mango from a tree — the mango "
            "tree is a living thing that provides food. (2) Slept under a "
            "tree — the tree is a living thing giving shade and oxygen. "
            "(3) The tree produced the mango through reproduction.\n"
            "Non-living interactions: (1) Drank water from a clay pot — "
            "water is a non-living natural resource. (2) The clay pot itself "
            "is non-living (made from baked soil). (3) The shade from the "
            "tree is provided by the non-living sunlight blocked by leaves."
        ),
        "explanation": (
            "Step 1: Identify the living things in the scenario: mango tree, "
            "possibly insects, Meena herself.\n"
            "Step 2: Identify the non-living things: water, clay pot, "
            "sunlight, air.\n"
            "Step 3: Meena drank WATER (non-living) → gives her hydration.\n"
            "Step 4: Meena ate MANGO (from a living tree) → gives her energy.\n"
            "Step 5: Meena slept under TREE SHADE (living tree blocking "
            "non-living sunlight) → gives her cool comfort.\n"
            "Step 6: Explain each interaction with the correct classification "
            "and the benefit received."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_001",
    },

    # ── c5_evs_002 : Plants vs animals ───────────────────────────────────────
    {
        "id": "c5_evs_002_q1",
        "type": "mcq",
        "question": (
            "Both a sunflower plant and a baby puppy share several "
            "characteristics. Which of the following is TRUE for BOTH?"
        ),
        "options": [
            "They can move from one place to another",
            "They make their own food",
            "They need food and water to live",
            "They grow only up to a fixed size",
        ],
        "answer": "C",
        "explanation": (
            "Step 1: Check each option against both plants and animals.\n"
            "Step 2: Plants cannot move freely — Option A is false.\n"
            "Step 3: Only plants make their own food (photosynthesis) — "
            "Option B is false for animals.\n"
            "Step 4: Both plants AND animals need food and water to survive "
            "and grow — Option C is TRUE for both.\n"
            "Step 5: Plants grow throughout life, not to a fixed size — "
            "Option D is false for plants.\n"
            "Step 6: Answer = C."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_002",
    },
    {
        "id": "c5_evs_002_q2",
        "type": "mcq",
        "question": (
            "A mango tree and a goat both need food. But they get it in "
            "different ways. Which statement correctly describes this "
            "difference?"
        ),
        "options": [
            "The mango tree moves to find food; the goat stays in one place",
            "The mango tree makes its own food; the goat eats other living things",
            "The mango tree eats grass; the goat makes its own food",
            "Both make their own food from sunlight",
        ],
        "answer": "B",
        "explanation": (
            "Step 1: Plants are AUTOTROPHIC — they make their own food using "
            "sunlight, water and carbon dioxide (photosynthesis).\n"
            "Step 2: Animals are HETEROTROPHIC — they cannot make their own "
            "food and must eat plants or other animals.\n"
            "Step 3: A mango tree (plant) makes its own food.\n"
            "Step 4: A goat (animal) eats grass/plants to get food.\n"
            "Step 5: Option B correctly describes this difference."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_002",
    },
    {
        "id": "c5_evs_002_q3",
        "type": "fill_blank",
        "question": (
            "Plants are called ________ because they can make their own food "
            "using sunlight, while animals are called ________ because they "
            "depend on other living things for food."
        ),
        "options": [],
        "answer": "autotrophic; heterotrophic",
        "explanation": (
            "Step 1: 'Auto' means self and 'trophic' means feeding.\n"
            "Step 2: Plants make their own food — they are AUTOTROPHIC.\n"
            "Step 3: 'Hetero' means others and 'trophic' means feeding.\n"
            "Step 4: Animals depend on other organisms for food — they are "
            "HETEROTROPHIC.\n"
            "Step 5: First blank = autotrophic, second blank = heterotrophic."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_002",
    },
    {
        "id": "c5_evs_002_q4",
        "type": "short_answer",
        "question": (
            "A puppy and a rose bush are both living things. "
            "Give ONE similarity and ONE difference between them."
        ),
        "options": [],
        "answer": (
            "Similarity: Both need water and food to live and grow. "
            "Difference: The puppy can move around freely (animal), "
            "while the rose bush stays rooted in one place (plant)."
        ),
        "explanation": (
            "Step 1: Identify a SIMILARITY — both are living and need "
            "food, water, air to grow.\n"
            "Step 2: Identify a DIFFERENCE — animals can move freely; "
            "plants are fixed in place.\n"
            "Step 3: Another valid difference: animals eat others' food; "
            "plants make their own.\n"
            "Step 4: Award marks for one correct similarity and one correct "
            "difference with proper reasoning."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_002",
    },
    {
        "id": "c5_evs_002_q5",
        "type": "long_answer",
        "question": (
            "Riya has a pet rabbit and a potted money plant on her balcony. "
            "List and explain at least THREE similarities and THREE differences "
            "between the rabbit and the money plant."
        ),
        "options": [],
        "answer": (
            "Similarities: (1) Both are living things — they grow. "
            "(2) Both need water to survive. (3) Both reproduce — the plant "
            "produces new leaves/shoots; the rabbit can have babies. "
            "(4) Both respire (breathe) — plants take in CO2 and release "
            "O2; rabbits take in O2 and release CO2.\n"
            "Differences: (1) Food: Plant makes its own via photosynthesis; "
            "rabbit eats grass/vegetables. (2) Movement: Plant is fixed in "
            "pot; rabbit hops around freely. (3) Growth: Plant grows "
            "throughout life; rabbit grows to a fixed adult size."
        ),
        "explanation": (
            "Step 1: SIMILARITY 1 — Both are living, so both show growth.\n"
            "Step 2: SIMILARITY 2 — Both need water from their surroundings "
            "to survive.\n"
            "Step 3: SIMILARITY 3 — Both reproduce (plant produces new "
            "shoots/leaves; rabbit has babies).\n"
            "Step 4: DIFFERENCE 1 — Food: Plant autotrophic (makes own "
            "food); rabbit heterotrophic (eats plants).\n"
            "Step 5: DIFFERENCE 2 — Movement: Plant fixed; rabbit moves.\n"
            "Step 6: DIFFERENCE 3 — Growth pattern: Plant grows throughout "
            "life; rabbit grows to a fixed size."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_002",
    },

    # ── c5_evs_003 : Internal organs ─────────────────────────────────────────
    {
        "id": "c5_evs_003_q1",
        "type": "mcq",
        "question": (
            "When you run fast in a race, you feel your chest heaving. "
            "Which internal organ is mainly at work to help you breathe?"
        ),
        "options": ["Heart", "Stomach", "Lungs", "Brain"],
        "answer": "C",
        "explanation": (
            "Step 1: Breathing (taking in oxygen and releasing carbon "
            "dioxide) is the job of the LUNGS.\n"
            "Step 2: The lungs are located in the chest, on either side of "
            "the heart.\n"
            "Step 3: The heart pumps blood; the stomach digests food; the "
            "brain controls thinking.\n"
            "Step 4: Therefore the organ working hard during running to "
            "enable breathing is the LUNGS → Option C."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_003",
    },
    {
        "id": "c5_evs_003_q2",
        "type": "mcq",
        "question": (
            "After you eat a meal, the food travels down your food pipe "
            "(oesophagus) and reaches a bag-like organ in the upper part "
            "of your abdomen. Which organ is this?"
        ),
        "options": ["Heart", "Lungs", "Stomach", "Liver"],
        "answer": "C",
        "explanation": (
            "Step 1: The three main internal organs studied in Class 5 are "
            "lungs, heart and stomach.\n"
            "Step 2: The lungs and heart are in the CHEST.\n"
            "Step 3: The stomach is in the ABDOMEN (upper belly area).\n"
            "Step 4: The stomach is a bag-like organ that receives food "
            "from the food pipe and uses digestive juices to break it down.\n"
            "Step 5: Therefore the correct answer is C – Stomach."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_003",
    },
    {
        "id": "c5_evs_003_q3",
        "type": "fill_blank",
        "question": (
            "The ________ is located in the chest and pumps blood to all "
            "parts of the body. The ________ is located in the abdomen and "
            "helps digest food."
        ),
        "options": [],
        "answer": "heart; stomach",
        "explanation": (
            "Step 1: HEART → located in the chest → pumps blood to all body "
            "parts.\n"
            "Step 2: STOMACH → located in the abdomen → uses digestive "
            "juices to break down food.\n"
            "Step 3: LUNGS → located in the chest → responsible for "
            "breathing.\n"
            "Step 4: First blank = HEART, second blank = STOMACH."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_003",
    },
    {
        "id": "c5_evs_003_q4",
        "type": "short_answer",
        "question": (
            "Your fingers and nose are body parts you can see from the "
            "outside. Name TWO internal organs and state where each is "
            "located in your body."
        ),
        "options": [],
        "answer": (
            "Heart — located in the chest, slightly to the left side. "
            "Stomach — located in the abdomen (upper belly). "
            "(Lungs are also in the chest, on either side of the heart.)"
        ),
        "explanation": (
            "Step 1: External body parts (fingers, nose, eyes) are visible "
            "from outside.\n"
            "Step 2: Internal organs are INSIDE the body and cannot be "
            "seen without special tools.\n"
            "Step 3: HEART — chest, pumps blood.\n"
            "Step 4: LUNGS — chest, enable breathing.\n"
            "Step 5: STOMACH — abdomen, digests food.\n"
            "Step 6: Any two correct organs with correct locations earn "
            "full marks."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_003",
    },
    {
        "id": "c5_evs_003_q5",
        "type": "long_answer",
        "question": (
            "Arjun played an intense game of cricket and then sat down, "
            "panting heavily. His mother gave him a glass of water. "
            "Explain the role of the LUNGS and the HEART during this "
            "situation, and also mention where the STOMACH is located."
        ),
        "options": [],
        "answer": (
            "LUNGS (in the chest): When Arjun runs and plays, his muscles "
            "need more oxygen. His lungs work harder — breathing faster and "
            "deeper — to take in more oxygen and release more carbon dioxide. "
            "This is why he is 'panting'.\n"
            "HEART (in the chest): The heart pumps blood faster to carry "
            "oxygen from the lungs to the working muscles and bring back "
            "waste carbon dioxide. Arjun can feel his heart beating faster.\n"
            "STOMACH (in the abdomen): Located in the upper belly area; it "
            "receives food/drink and uses digestive juices to break it down."
        ),
        "explanation": (
            "Step 1: LUNGS — during exercise, muscles need more O2 → lungs "
            "breathe faster/deeper → panting.\n"
            "Step 2: HEART — pumps oxygen-rich blood to muscles faster → "
            "heartbeat increases.\n"
            "Step 3: STOMACH — in the abdomen, digests the water/food using "
            "digestive juices.\n"
            "Step 4: Each organ's role is explained with correct location "
            "and function."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_003",
    },

    # ── c5_evs_004 : Physical features ───────────────────────────────────────
    {
        "id": "c5_evs_004_q1",
        "type": "mcq",
        "question": (
            "Kavya visited Rajasthan and saw vast stretches of land with "
            "very little rainfall, scattered cacti and extreme temperatures "
            "by day and night. Which physical feature of Earth was she "
            "visiting?"
        ),
        "options": ["Valley", "Plain", "Desert", "Hill"],
        "answer": "C",
        "explanation": (
            "Step 1: DESERTS are dry areas with very little rainfall, "
            "extreme temperatures and special plants like cacti.\n"
            "Step 2: HILLS are raised land with slopes — not extremely dry.\n"
            "Step 3: PLAINS are flat, fertile, low-lying areas with good "
            "rainfall — not dry.\n"
            "Step 4: VALLEYS are low areas between hills or mountains.\n"
            "Step 5: Kavya saw a DESERT → Option C."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_004",
    },
    {
        "id": "c5_evs_004_q2",
        "type": "mcq",
        "question": (
            "The Ganga basin in northern India has very flat, fertile land "
            "where wheat and rice are grown extensively. Which physical "
            "feature best describes this area?"
        ),
        "options": ["Desert", "Hills", "Valley", "Plains"],
        "answer": "D",
        "explanation": (
            "Step 1: PLAINS are large, flat, low-lying stretches of land "
            "with fertile soil.\n"
            "Step 2: The Ganga basin is flat, fertile and supports extensive "
            "farming — these are PLAINS.\n"
            "Step 3: DESERTS are dry — not fertile farmland.\n"
            "Step 4: HILLS are raised, sloping land — not flat.\n"
            "Step 5: VALLEYS are between hills — not the description here.\n"
            "Step 6: Answer = D (Plains)."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_004",
    },
    {
        "id": "c5_evs_004_q3",
        "type": "fill_blank",
        "question": (
            "A ________ is a raised piece of land with a sloping side, "
            "smaller than a mountain. A ________ is a low area of land "
            "between hills or mountains."
        ),
        "options": [],
        "answer": "hill; valley",
        "explanation": (
            "Step 1: HILL — raised land, smaller than a mountain, has "
            "sloping sides.\n"
            "Step 2: VALLEY — a low area between two hills or mountains, "
            "often with a river flowing through it.\n"
            "Step 3: DESERT — dry area with little rainfall.\n"
            "Step 4: PLAIN — flat, fertile, low-lying land.\n"
            "Step 5: First blank = HILL, second blank = VALLEY."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_004",
    },
    {
        "id": "c5_evs_004_q4",
        "type": "fill_blank",
        "question": (
            "Physical features of the Earth include ________, plains, "
            "deserts and ________."
        ),
        "options": [],
        "answer": "hills; valleys",
        "explanation": (
            "Step 1: The four main physical features of Earth covered in "
            "Class 5 EVS are: Hills, Plains, Deserts and Valleys.\n"
            "Step 2: The sentence lists plains and deserts already.\n"
            "Step 3: The missing two are HILLS and VALLEYS.\n"
            "Step 4: First blank = HILLS, second blank = VALLEYS."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_004",
    },
    {
        "id": "c5_evs_004_q5",
        "type": "short_answer",
        "question": (
            "Name and describe ONE physical feature of India that you know. "
            "Mention its key characteristics."
        ),
        "options": [],
        "answer": (
            "The Thar Desert (Rajasthan) — it is a desert with very little "
            "rainfall, extreme temperatures (hot days, cool nights), sandy "
            "soil, and special plants like cacti and animals like camels "
            "adapted to survive there."
        ),
        "explanation": (
            "Step 1: Choose one physical feature from: Hills, Plains, "
            "Deserts, Valleys.\n"
            "Step 2: Give its NAME and LOCATION in India.\n"
            "Step 3: Describe its key characteristics (soil, rainfall, "
            "temperature, vegetation, animals).\n"
            "Step 4: Valid answers: Thar Desert, Himalayas (hills), "
            "Gangetic Plains, etc."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_004",
    },
    {
        "id": "c5_evs_004_q6",
        "type": "long_answer",
        "question": (
            "Compare a HILL and a VALLEY. In what ways are they different "
            "from each other? Also, explain how both physical features "
            "support life differently."
        ),
        "options": [],
        "answer": (
            "Differences: (1) A HILL is raised land with a high point; a "
            "VALLEY is a low area between hills. (2) Hills have slopes and "
            "are higher than the surrounding land; valleys are lower. "
            "(3) Hills often have forests and springs; valleys often have "
            "rivers flowing through them.\n"
            "Life support: Hills provide homes for wild animals, forests "
            "that give oxygen, and water springs. Valleys have fertile "
            "soil from river deposits and are used for farming and human "
            "settlements."
        ),
        "explanation": (
            "Step 1: Define HILL — raised, elevated, sloping land, smaller "
            "than a mountain.\n"
            "Step 2: Define VALLEY — low, flat area between hills, often "
            "with a river.\n"
            "Step 3: List at least 3 clear differences in structure.\n"
            "Step 4: Explain how hills support life (forests, animals, "
            "water sources).\n"
            "Step 5: Explain how valleys support life (fertile soil, "
            "rivers, farming, settlements)."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_004",
    },

    # ── Additional competency / mixed questions ─────────────────────────────
    {
        "id": "c5_evs_001_c1",
        "type": "mcq",
        "question": (
            "In a village in Kerala, farmers grow rice in flooded fields "
            "(paddy). Which pair below shows one LIVING and one NON-LIVING "
            "thing from the paddy field?"
        ),
        "options": [
            "Frog and water",
            "Frog and fish",
            "Rice plant and frog",
            "Sunlight and rainwater",
        ],
        "answer": "A",
        "explanation": (
            "Step 1: LIVING things can grow, move and reproduce: frog, "
            "fish, rice plant are all living.\n"
            "Step 2: NON-LIVING things: water, sunlight, soil, rocks are "
            "non-living.\n"
            "Step 3: Option A — Frog (living) and Water (non-living) ✓\n"
            "Step 4: Option B — Both frog and fish are living ✗\n"
            "Step 5: Option C — Both rice plant and frog are living ✗\n"
            "Step 6: Option D — Both sunlight and rainwater are non-living ✗\n"
            "Step 7: Answer = A."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_001",
    },
    {
        "id": "c5_evs_002_c1",
        "type": "fill_blank",
        "question": (
            "A cactus plant can survive in a desert because it stores water "
            "in its thick stem. Even though it lives in a dry place, it is "
            "still ________, meaning it makes its own food using ________."
        ),
        "options": [],
        "answer": "autotrophic; sunlight",
        "explanation": (
            "Step 1: All green plants, including cacti, are AUTOTROPHIC — "
            "they make their own food.\n"
            "Step 2: They use SUNLIGHT (non-living) energy along with water "
            "and carbon dioxide to produce food through photosynthesis.\n"
            "Step 3: Even in deserts, cacti make their own food — they just "
            "have special adaptations to store water.\n"
            "Step 4: First blank = autotrophic, second blank = sunlight."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_002",
    },
    {
        "id": "c5_evs_003_c1",
        "type": "short_answer",
        "question": (
            "During a health check-up in school, the nurse checked Anjali's "
            "pulse at her wrist. Through which organ does the blood reach "
            "her wrist, and where is this organ located?"
        ),
        "options": [],
        "answer": (
            "The HEART pumps blood to all parts of the body, including the "
            "wrist. The heart is located in the chest, slightly to the left "
            "side. The pulse felt at the wrist is the heartbeat carried "
            "through blood vessels (arteries) from the heart."
        ),
        "explanation": (
            "Step 1: The HEART is a pump — it pushes blood through blood "
            "vessels to every part of the body.\n"
            "Step 2: The heart is in the CHEST, slightly to the left.\n"
            "Step 3: Blood reaches the wrist through arteries that carry "
            "blood from the heart.\n"
            "Step 4: The pulse felt at the wrist is caused by the heart's "
            "pumping action."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_003",
    },
    {
        "id": "c5_evs_004_c1",
        "type": "mcq",
        "question": (
            "In the Indian state of Himachal Pradesh, the landscape has "
            "steep slopes, pine trees and streams flowing downhill. "
            "Which physical feature is most likely to be found here?"
        ),
        "options": ["Desert", "Plains", "Hills", "Valley"],
        "answer": "C",
        "explanation": (
            "Step 1: HIMACHAL PRADESH is a hilly state in the Himalayan "
            "region of India.\n"
            "Step 2: Steep slopes, pine trees and downhill streams are "
            "characteristic of HILLS.\n"
            "Step 3: DESERTS have little water — not streams.\n"
            "Step 4: PLAINS are flat — not steep slopes.\n"
            "Step 5: VALLEYS are low areas between hills — but the "
            "description focuses on slopes and elevation.\n"
            "Step 6: Answer = C (Hills)."
        ),
        "difficulty": "Easy",
        "topic": "c5_evs_004",
    },
    {
        "id": "c5_evs_004_c2",
        "type": "long_answer",
        "question": (
            "Villagers in the Sundarbans delta (West Bengal) live surrounded "
            "by mangrove forests and rivers. The land here is low and flat. "
            "Which physical feature best describes this region? Explain why "
            "valleys (or plains) form and how people adapt their lives to "
            "this physical feature."
        ),
        "options": [],
        "answer": (
            "This is a VALLEY/PLAIN region — specifically a delta plain. "
            "Valleys form when rivers erode land between hills or mountains "
            "over thousands of years, carrying soil downstream. In the "
            "Sundarbans, the Ganga and Brahmaputra rivers deposit rich "
            "silt, creating flat, fertile lowland. People adapt by: (1) "
            "Fishing as main livelihood. (2) Building stilt houses to "
            "survive flooding and high tides. (3) Growing salt-tolerant "
            "mangrove crops."
        ),
        "explanation": (
            "Step 1: Sundarbans is a delta — flat, low-lying land near the "
            "sea where rivers meet the ocean.\n"
            "Step 2: Valleys and plains form through river erosion and "
            "deposition over long periods.\n"
            "Step 3: The flat land supports rice farming and fishing.\n"
            "Step 4: People adapt by building stilt houses (above flood "
            "level), fishing, and using mangrove resources.\n"
            "Step 5: Award marks for correct identification + explanation "
            "of formation + one adaptation."
        ),
        "difficulty": "Medium",
        "topic": "c5_evs_004",
    },
]


# ─────────────────────────────────────────────────────────────────────────────
# Solvers
# ─────────────────────────────────────────────────────────────────────────────

def _verify_mcq(selected_option: str, correct_option: str,
                options: List[str]) -> Dict[str, Any]:
    """Verify an MCQ answer."""
    opt_labels = ["A", "B", "C", "D"]
    ok = (selected_option == correct_option)
    detail = (f"Selected '{selected_option}' "
              f"({options[opt_labels.index(selected_option)] if selected_option in opt_labels and len(options) > opt_labels.index(selected_option) else 'N/A'}). "
              f"Correct option is '{correct_option}' "
              f"({options[opt_labels.index(correct_option)] if correct_option in opt_labels and len(options) > opt_labels.index(correct_option) else 'N/A'}).")
    return {"is_correct": ok, "detail": detail}


def _verify_fill_blank(user_answer: str, expected_answer: str) -> Dict[str, Any]:
    """Verify a fill-in-the-blank answer (case-insensitive, stripped)."""
    norm_user = user_answer.strip().lower()
    # accept each comma/semicolon-separated part
    expected_parts = [p.strip().lower() for p in re.split(r'[;,]', expected_answer)]
    ok = any(norm_user == ep or ep in norm_user for ep in expected_parts)
    detail = (f"User answer '{user_answer}'. "
              f"Expected keyword(s): {expected_parts}. "
              f"Match: {ok}.")
    return {"is_correct": ok, "detail": detail}


def _verify_text_answer(user_answer: str, expected_answer: str) -> Dict[str, Any]:
    """Verify a short/long answer by keyword presence."""
    norm_user = user_answer.strip().lower()
    norm_exp = expected_answer.strip().lower()
    # split expected into meaningful word chunks
    keywords = [w for w in re.split(r'[\s,;.()\-]+', norm_exp) if len(w) > 3]
    keywords = list(set(keywords))[:8]  # cap at 8 key terms
    if not keywords:
        keywords = [norm_exp[:20]]
    matches = sum(1 for kw in keywords if kw in norm_user)
    coverage = matches / len(keywords)
    ok = coverage >= 0.4  # at least 40 % keyword overlap
    detail = (f"Matched {matches}/{len(keywords)} key terms "
              f"({coverage*100:.0f}% overlap). "
              f"Key terms checked: {keywords}.")
    return {"is_correct": ok, "detail": detail}


def solve_mcq(params: Dict[str, Any]) -> SolveResult:
    """
    Solve an MCQ question.

    Parameters
    ----------
    params : dict with keys
        question   : str  — the question text
        options    : list[str] — 4 option strings
        selected   : str  — the option label chosen (A/B/C/D)
        correct    : str  — the correct option label (A/B/C/D)
    """
    question   = params.get("question", "")
    options    = params.get("options", [])
    selected   = params.get("selected", "")
    correct    = params.get("correct", "")

    steps = [
        f"Step 1: Read the question carefully: '{question[:80]}...'",
        f"Step 2: Review all {len(options)} options provided.",
    ]
    for i, opt in enumerate(options):
        label = chr(ord('A') + i)
        steps.append(f"Step {i+3}: Option {label}: {opt}")
    steps.append(
        f"Step {len(options)+3}: The correct answer is option "
        f"{correct}: {options[ord(correct)-ord('A')]}."
    )
    if selected:
        steps.append(
            f"Step {len(options)+4}: User selected option "
            f"{selected}: {options[ord(selected)-ord('A')] if selected in 'ABCD' and ord(selected)-ord('A') < len(options) else selected}."
        )

    v = _verify_mcq(selected, correct, options)
    steps.append(f"Verification: {v['detail']}")

    return SolveResult(
        answer=correct,
        steps=steps,
        verification=v["detail"],
        is_correct=v["is_correct"],
    )


def solve_fill_blank(params: Dict[str, Any]) -> SolveResult:
    """
    Solve a fill-in-the-blank question.

    Parameters
    ----------
    params : dict with keys
        question : str
        answer   : str  — expected keyword(s)
        user_answer : str — what the student wrote
    """
    question    = params.get("question", "")
    answer      = params.get("answer", "")
    user_answer = params.get("user_answer", "")

    steps = [
        "Step 1: Read and understand the fill-in-the-blank statement.",
        f"Step 2: The question is: {question}",
        f"Step 3: The expected answer keyword(s): {answer}",
        "Step 4: Check the student's answer against the expected keyword(s).",
    ]
    v = _verify_fill_blank(user_answer, answer)
    steps.append(f"Step 5: {v['detail']}")
    steps.append(f"Step 6: Verification complete — Correct: {v['is_correct']}.")

    return SolveResult(
        answer=answer,
        steps=steps,
        verification=v["detail"],
        is_correct=v["is_correct"],
    )


def solve_short_answer(params: Dict[str, Any]) -> SolveResult:
    """
    Solve a short-answer question.

    Parameters
    ----------
    params : dict with keys
        question    : str
        answer      : str  — expected answer
        user_answer : str  — student's response
    """
    question    = params.get("question", "")
    answer      = params.get("answer", "")
    user_answer = params.get("user_answer", "")

    steps = [
        "Step 1: Understand what the question is asking.",
        f"Step 2: Expected answer: {answer}",
        "Step 3: Review the student's response.",
        "Step 4: Check for key concepts and vocabulary in the response.",
    ]
    v = _verify_text_answer(user_answer, answer)
    steps.append(f"Step 5: {v['detail']}")
    steps.append(f"Step 6: Verification complete — Correct: {v['is_correct']}.")

    return SolveResult(
        answer=answer,
        steps=steps,
        verification=v["detail"],
        is_correct=v["is_correct"],
    )


def solve_long_answer(params: Dict[str, Any]) -> SolveResult:
    """
    Solve a long-answer question.

    Parameters
    ----------
    params : dict with keys
        question    : str
        answer      : str  — expected answer
        user_answer : str  — student's response
    """
    question    = params.get("question", "")
    answer      = params.get("answer", "")
    user_answer = params.get("user_answer", "")

    steps = [
        "Step 1: Break down the long-answer question into key points "
                "required.",
        "Step 2: Identify all the concepts that must be covered.",
        f"Step 3: Expected key points from the model answer: {answer[:120]}...",
        "Step 4: Compare student's response point by point.",
    ]
    v = _verify_text_answer(user_answer, answer)
    steps.append(f"Step 5: Keyword coverage check — {v['detail']}")
    steps.append(
        f"Step 6: Final verification — Answer judged correct: "
        f"{v['is_correct']}."
    )

    return SolveResult(
        answer=answer,
        steps=steps,
        verification=v["detail"],
        is_correct=v["is_correct"],
    )


def solve_numerical(params: Dict[str, Any]) -> SolveResult:
    """
    Solve a numerical EVS question (e.g., counting, simple measurement).

    Parameters
    ----------
    params : dict with keys
        question : str
        answer   : str  — expected numerical answer (as string)
        user_answer : str — student's answer
    """
    question    = params.get("question", "")
    answer      = params.get("answer", "")
    user_answer = params.get("user_answer", "")

    steps = [
        "Step 1: Understand what quantity is being asked.",
        f"Step 2: Question: {question}",
        f"Step 3: Expected answer: {answer}",
        "Step 4: Extract numerical value from student's answer.",
        f"Step 5: Compare student answer '{user_answer}' with expected "
                f"'{answer}'.",
    ]
    # Numerical comparison
    try:
        exp_num = float(re.sub(r'[^0-9.]', '', answer))
        usr_num = float(re.sub(r'[^0-9.]', '', user_answer))
        ok = abs(exp_num - usr_num) < 1e-6
    except (ValueError, TypeError):
        ok = str(user_answer).strip().lower() == str(answer).strip().lower()
    v_detail = (f"Numerical comparison: expected={answer}, "
                f"user={user_answer}, match={ok}.")
    steps.append(f"Step 6: {v_detail}")

    return SolveResult(
        answer=answer,
        steps=steps,
        verification=v_detail,
        is_correct=ok,
    )


def solve(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    Unified solver — dispatches to the correct type-specific solver.

    Parameters
    ----------
    params : dict
        Must contain key 'type' (mcq | fill_blank | short_answer |
        long_answer | numerical) plus all type-specific keys.
    """
    qtype = params.get("type", "").lower().replace("-", "_")
    dispatch = {
        "mcq":          solve_mcq,
        "fill_blank":   solve_fill_blank,
        "short_answer": solve_short_answer,
        "long_answer":  solve_long_answer,
        "numerical":    solve_numerical,
    }
    fn = dispatch.get(qtype)
    if fn is None:
        return {
            "answer": "",
            "steps": [f"Unknown question type: '{qtype}'."],
            "verification": "N/A",
            "is_correct": False,
        }
    result: SolveResult = fn(params)
    return {
        "answer":      result.answer,
        "steps":       result.steps,
        "verification": result.verification,
        "is_correct":  result.is_correct,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Question generator
# ─────────────────────────────────────────────────────────────────────────────

def _options_labeled(options: List[str]) -> List[str]:
    """Prefix each option with A), B), C), D)."""
    labels = ["A", "B", "C", "D"]
    return [f"{labels[i]}) {opt}" for i, opt in enumerate(options)]


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministically generate *count* questions from the CISCE Class 5 EVS
    question bank.

    Parameters
    ----------
    seed  : int  — random seed for reproducibility
    count : int  — number of questions to generate (≤ len(QUESTION_BANK))

    Returns
    -------
    list of dicts, each with keys:
        id, type, question, options, answer, explanation,
        difficulty, topic, solved_steps, verification
    """
    rng = random.Random(seed)

    total = min(count, len(QUESTION_BANK))
    # Deterministic shuffle
    indices = list(range(len(QUESTION_BANK)))
    rng.shuffle(indices)
    selected_indices = indices[:total]

    results: List[Dict[str, Any]] = []

    for idx in selected_indices:
        q_raw = QUESTION_BANK[idx]
        # Deep-copy to avoid mutation of bank
        q = dict(q_raw)

        qtype = q["type"]

        if qtype == "mcq":
            q["options"] = _options_labeled(q["options"])
            # Run solver for step-by-step output
            correct_letter = q["answer"]
            correct_text   = q["options"][ord(correct_letter) - ord('A')]
            solver_out = solve_mcq({
                "question": q["question"],
                "options": [opt.split(") ", 1)[1] for opt in q["options"]],
                "selected": correct_letter,
                "correct":  correct_letter,
            })
        elif qtype == "fill_blank":
            solver_out = solve_fill_blank({
                "question":    q["question"],
                "answer":      q["answer"],
                "user_answer": q["answer"],
            })
        elif qtype == "short_answer":
            solver_out = solve_short_answer({
                "question":    q["question"],
                "answer":      q["answer"],
                "user_answer": q["answer"],
            })
        elif qtype == "long_answer":
            solver_out = solve_long_answer({
                "question":    q["question"],
                "answer":      q["answer"],
                "user_answer": q["answer"],
            })
        elif qtype == "numerical":
            solver_out = solve_numerical({
                "question":    q["question"],
                "answer":      q["answer"],
                "user_answer": q["answer"],
            })
        else:
            solver_out = {"steps": ["Unknown type."],
                          "verification": "N/A", "is_correct": False}

        results.append({
            "id":           q["id"],
            "type":         qtype,
            "question":     q["question"],
            "options":      q["options"],
            "answer":       q["answer"],
            "explanation":  q["explanation"],
            "difficulty":   q["difficulty"],
            "topic":        q["topic"],
            "solved_steps": solver_out["steps"],
            "verification": solver_out["verification"],
            "is_correct":   solver_out["is_correct"],
        })

    return results


def get_question_by_id(qid: str) -> Optional[Dict[str, Any]]:
    """Retrieve a single question from the bank by its ID string."""
    for q in QUESTION_BANK:
        if q["id"] == qid:
            return q
    return None


def list_topics() -> List[str]:
    """Return all unique topic identifiers present in the question bank."""
    return sorted(set(q["topic"] for q in QUESTION_BANK))


def bank_stats() -> Dict[str, Any]:
    """Return statistics about the question bank."""
    topics  = {}
    qtypes  = {}
    diffs   = {}
    for q in QUESTION_BANK:
        topics[q["topic"]] = topics.get(q["topic"], 0) + 1
        qtypes[q["type"]]  = qtypes.get(q["type"],  0) + 1
        diffs[q["difficulty"]] = diffs.get(q["difficulty"], 0) + 1
    return {
        "total_questions": len(QUESTION_BANK),
        "by_topic":  topics,
        "by_type":   qtypes,
        "by_difficulty": diffs,
    }